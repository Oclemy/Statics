`Core.Compiler.EscapeAnalysis` is a compiler utility module that aims to analyze escape information of [Julia's SSA-form IR](https://docs.julialang.org/../ssair/#Julia-SSA-form-IR) a.k.a. `IRCode`.

This escape analysis aims to:

* leverage Julia's high-level semantics, especially reason about escapes and aliasing via inter-procedural calls
* be versatile enough to be used for various optimizations including [alias-aware SROA](https://github.com/JuliaLang/julia/pull/43888), [early `finalize` insertion](https://github.com/JuliaLang/julia/pull/44056), [copy-free `ImmutableArray` construction](https://github.com/JuliaLang/julia/pull/42465), stack allocation of mutable objects, and so on.
* achieve a simple implementation based on a fully backward data-flow analysis implementation as well as a new lattice design that combines orthogonal lattice properties

You can give a try to the escape analysis by loading the `EAUtils.jl` utility script that define the convenience entries `code_escapes` and `@code_escapes` for testing and debugging purposes:


```julia
julia> include(normpath(Sys.BINDIR, "..", "share", "julia", "test", "compiler", "EscapeAnalysis", "EAUtils.jl")); using .EAUtils  
julia> mutable struct SafeRef{T}
           x::T
       end  
julia> Base.getindex(x::SafeRef) = x.x;  
julia> Base.setindex!(x::SafeRef, v) = x.x = v;  
julia> Base.isassigned(x::SafeRef) = true;  
julia> get′(x) = isassigned(x) ? x[] : throw(x);  
julia> result = code_escapes((String,String,String,String)) do s1, s2, s3, s4
           r1 = Ref(s1)
           r2 = Ref(s2)
           r3 = SafeRef(s3)
           try
               s1 = get′(r1)
               ret = sizeof(s1)
           catch err
               global GV = err # will definitely escape `r1`
           end
           s2 = get′(r2)       # still `r2` doesn't escape fully
           s3 = get′(r3)       # still `r3` doesn't escape fully
           s4 = sizeof(s4)     # the argument `s4` doesn't escape here
           return s2, s3, s4
       end#1(X _2::String, ↑ _3::String, ↑ _4::String, ✓ _5::String) in Main at REPL[7]:2
X 1 ── %1  = %new(Base.RefValue{String}, _2)::Base.RefValue{String}
*′ │  %2  = %new(Base.RefValue{String}, _3)::Base.RefValue{String}
✓′ └─── %3  = %new(Main.SafeRef{String}, _4)::Main.SafeRef{String}
◌  2 ── %4  = $(Expr(:enter, #8))
✓′ │  %5  = ϒ (%3)::Main.SafeRef{String}
*′ │  %6  = ϒ (%2)::Base.RefValue{String}
✓ └─── %7  = ϒ (_5)::String
◌  3 ── %8  = Base.isdefined(%1, :x)::Bool
◌  └───       goto #5 if not %8
X 4 ──       Base.getfield(%1, :x)::String
◌  └───       goto #6
◌  5 ──       Main.throw(%1)::Union{}
◌  └───       unreachable
◌  6 ──       nothing::Core.Const(Core.sizeof)
◌  │        nothing::Int64
◌  └───       $(Expr(:leave, 1))
◌  7 ──       goto #10
✓′ 8 ── %18 = φᶜ (%5)::Main.SafeRef{String}
*′ │  %19 = φᶜ (%6)::Base.RefValue{String}
✓ │  %20 = φᶜ (%7)::String
◌  └───       $(Expr(:leave, 1))
X 9 ── %22 = $(Expr(:the_exception))::Any
◌  │        (Main.GV = %22)::Any
◌  └───       $(Expr(:pop_exception, :(%4)))::Any
✓′ 10 ┄ %25 = φ (#7 => %3, #9 => %18)::Main.SafeRef{String}
*′ │  %26 = φ (#7 => %2, #9 => %19)::Base.RefValue{String}
✓ │  %27 = φ (#7 => _5, #9 => %20)::String
◌  │  %28 = Base.isdefined(%26, :x)::Bool
◌  └───       goto #12 if not %28
↑ 11 ─ %30 = Base.getfield(%26, :x)::String
◌  └───       goto #13
◌  12 ─       Main.throw(%26)::Union{}
◌  └───       unreachable
↑ 13 ─ %34 = Base.getfield(%25, :x)::String
◌  │  %35 = Core.sizeof::Core.Const(Core.sizeof)
◌  │  %36 = (%35)(%27)::Int64
↑′ │  %37 = Core.tuple(%30, %34, %36)::Tuple{String, String, Int64}
◌  └───       return %37
```
The symbols in the side of each call argument and SSA statements represents the following meaning:

* `◌` (plain): this value is not analyzed because escape information of it won't be used anyway (when the object is `isbitstype` for example)
* `✓` (green or cyan): this value never escapes (`has_no_escape(result.state[x])` holds), colored blue if it has arg escape also (`has_arg_escape(result.state[x])` holds)
* `↑` (blue or yellow): this value can escape to the caller via return (`has_return_escape(result.state[x])` holds), colored yellow if it has unhandled thrown escape also (`has_thrown_escape(result.state[x])` holds)
* `X` (red): this value can escape to somewhere the escape analysis can't reason about like escapes to a global memory (`has_all_escape(result.state[x])` holds)
* `*` (bold): this value's escape state is between the `ReturnEscape` and `AllEscape` in the partial order of [`EscapeInfo`](https://docs.julialang.org/#Core.Compiler.EscapeAnalysis.EscapeInfo), colored yellow if it has unhandled thrown escape also (`has_thrown_escape(result.state[x])` holds)
* `′`: this value has additional object field / array element information in its `AliasInfo` property

Escape information of each call argument and SSA value can be inspected programmatically as like:


```julia
julia> result.state[Core.Argument(3)] # get EscapeInfo of `s2`ReturnEscape  
julia> result.state[Core.SSAValue(3)] # get EscapeInfo of `r3`NoEscape′
```
`EscapeAnalysis` is implemented as a [data-flow analysis](https://en.wikipedia.org/wiki/Data-flow_analysis) that works on a lattice of [`x::EscapeInfo`](https://docs.julialang.org/#Core.Compiler.EscapeAnalysis.EscapeInfo), which is composed of the following properties:

* `x.Analyzed::Bool`: not formally part of the lattice, only indicates `x` has not been analyzed or not
* `x.ReturnEscape::BitSet`: records SSA statements where `x` can escape to the caller via return
* `x.ThrownEscape::BitSet`: records SSA statements where `x` can be thrown as exception (used for the [exception handling](https://docs.julialang.org/#EA-Exception-Handling) described below)
* `x.AliasInfo`: maintains all possible values that can be aliased to fields or array elements of `x` (used for the [alias analysis](https://docs.julialang.org/#EA-Alias-Analysis) described below)
* `x.ArgEscape::Int` (not implemented yet): indicates it will escape to the caller through `setfield!` on argument(s)

These attributes can be combined to create a partial lattice that has a finite height, given the invariant that an input program has a finite number of statements, which is assured by Julia's semantics. The clever part of this lattice design is that it enables a simpler implementation of lattice operations by allowing them to handle each lattice property separately.

This escape analysis implementation is based on the data-flow algorithm described in the paper. The analysis works on the lattice of `EscapeInfo` and transitions lattice elements from the bottom to the top until every lattice element gets converged to a fixed point by maintaining a (conceptual) working set that contains program counters corresponding to remaining SSA statements to be analyzed. The analysis manages a single global state that tracks `EscapeInfo` of each argument and SSA statement, but also note that some flow-sensitivity is encoded as program counters recorded in `EscapeInfo`'s `ReturnEscape` property, which can be combined with domination analysis later to reason about flow-sensitivity if necessary.

One distinctive design of this escape analysis is that it is fully *backward*, i.e. escape information flows *from usages to definitions*. For example, in the code snippet below, EA first analyzes the statement `return %1` and imposes `ReturnEscape` on `%1` (corresponding to `obj`), and then it analyzes `%1 = %new(Base.RefValue{String, _2}))` and propagates the `ReturnEscape` imposed on `%1` to the call argument `_2` (corresponding to `s`):


```julia
julia> code_escapes((String,)) do s
           obj = Ref(s)
           return obj
       end#3(↑ _2::String) in Main at REPL[1]:2
↑′ 1 ─ %1 = %new(Base.RefValue{String}, _2)::Base.RefValue{String}
◌  └──      return %1
```
The key observation here is that this backward analysis allows escape information to flow naturally along the use-def chain rather than control-flow. As a result this scheme enables a simple implementation of escape analysis, e.g. `PhiNode` for example can be handled simply by propagating escape information imposed on a `PhiNode` to its predecessor values:


```julia
julia> code_escapes((Bool, String, String)) do cnd, s, t
           if cnd
               obj = Ref(s)
           else
               obj = Ref(t)
           end
           return obj
       end#5(✓ _2::Bool, ↑ _3::String, ↑ _4::String) in Main at REPL[1]:2
◌  1 ─      goto #3 if not _2
↑′ 2 ─ %2 = %new(Base.RefValue{String}, _3)::Base.RefValue{String}
◌  └──      goto #4
↑′ 3 ─ %4 = %new(Base.RefValue{String}, _4)::Base.RefValue{String}
↑′ 4 ┄ %5 = φ (#2 => %2, #3 => %4)::Base.RefValue{String}
◌  └──      return %5
```
`EscapeAnalysis` implements a backward field analysis in order to reason about escapes imposed on object fields with certain accuracy, and `x::EscapeInfo`'s `x.AliasInfo` property exists for this purpose. It records all possible values that can be aliased to fields of `x` at "usage" sites, and then the escape information of that recorded values are propagated to the actual field values later at "definition" sites. More specifically, the analysis records a value that may be aliased to a field of object by analyzing `getfield` call, and then it propagates its escape information to the field when analyzing `%new(...)` expression or `setfield!` call.


```julia
julia> code_escapes((String,)) do s
           obj = SafeRef("init")
           obj[] = s
           v = obj[]
           return v
       end#7(↑ _2::String) in Main at REPL[1]:2
✓′ 1 ─ %1 = %new(Main.SafeRef{String}, "init")::Main.SafeRef{String}
◌  │       Base.setfield!(%1, :x, _2)::String
↑ │  %3 = Base.getfield(%1, :x)::String
◌  └──      return %3
```
In the example above, `ReturnEscape` imposed on `%3` (corresponding to `v`) is *not* directly propagated to `%1` (corresponding to `obj`) but rather that `ReturnEscape` is only propagated to `_2` (corresponding to `s`). Here `%3` is recorded in `%1`'s `AliasInfo` property as it can be aliased to the first field of `%1`, and then when analyzing `Base.setfield!(%1, :x, _2)::String`, that escape information is propagated to `_2` but not to `%1`.

So `EscapeAnalysis` tracks which IR elements can be aliased across a `getfield`-`%new`/`setfield!` chain in order to analyze escapes of object fields, but actually this alias analysis needs to be generalized to handle other IR elements as well. This is because in Julia IR the same object is sometimes represented by different IR elements and so we should make sure that those different IR elements that actually can represent the same object share the same escape information. IR elements that return the same object as their operand(s), such as `PiNode` and `typeassert`, can cause that IR-level aliasing and thus requires escape information imposed on any of such aliased values to be shared between them. More interestingly, it is also needed for correctly reasoning about mutations on `PhiNode`. Let's consider the following example:


```julia
julia> code_escapes((Bool, String,)) do cond, x
           if cond
               ϕ2 = ϕ1 = SafeRef("foo")
           else
               ϕ2 = ϕ1 = SafeRef("bar")
           end
           ϕ2[] = x
           y = ϕ1[]
           return y
       end#9(✓ _2::Bool, ↑ _3::String) in Main at REPL[1]:2
◌  1 ─      goto #3 if not _2
✓′ 2 ─ %2 = %new(Main.SafeRef{String}, "foo")::Main.SafeRef{String}
◌  └──      goto #4
✓′ 3 ─ %4 = %new(Main.SafeRef{String}, "bar")::Main.SafeRef{String}
✓′ 4 ┄ %5 = φ (#2 => %2, #3 => %4)::Main.SafeRef{String}
✓′ │  %6 = φ (#2 => %2, #3 => %4)::Main.SafeRef{String}
◌  │       Base.setfield!(%5, :x, _3)::String
↑ │  %8 = Base.getfield(%6, :x)::String
◌  └──      return %8
```
`ϕ1 = %5` and `ϕ2 = %6` are aliased and thus `ReturnEscape` imposed on `%8 = Base.getfield(%6, :x)::String` (corresponding to `y = ϕ1[]`) needs to be propagated to `Base.setfield!(%5, :x, _3)::String` (corresponding to `ϕ2[] = x`). In order for such escape information to be propagated correctly, the analysis should recognize that the *predecessors* of `ϕ1` and `ϕ2` can be aliased as well and equalize their escape information.

One interesting property of such aliasing information is that it is not known at "usage" site but can only be derived at "definition" site (as aliasing is conceptually equivalent to assignment), and thus it doesn't naturally fit in a backward analysis. In order to efficiently propagate escape information between related values, EscapeAnalysis.jl uses an approach inspired by the escape analysis algorithm explained in an old JVM paper. That is, in addition to managing escape lattice elements, the analysis also maintains an "equi"-alias set, a disjoint set of aliased arguments and SSA statements. The alias set manages values that can be aliased to each other and allows escape information imposed on any of such aliased values to be equalized between them.

The alias analysis for object fields described above can also be generalized to analyze array operations. `EscapeAnalysis` implements handlings for various primitive array operations so that it can propagate escapes via `arrayref`-`arrayset` use-def chain and does not escape allocated arrays too conservatively:


```julia
julia> code_escapes((String,)) do s
           ary = Any[]
           push!(ary, SafeRef(s))
           return ary[1], length(ary)
       end#11(↑ _2::String) in Main at REPL[1]:2
*′ 1 ── %1  = $(Expr(:foreigncall, :(:jl_alloc_array_1d), Vector{Any}, svec(Any, Int64), 0, :(:ccall), Vector{Any}, 0, 0))::Vector{Any}
↑′ │  %2  = %new(Main.SafeRef{String}, _2)::Main.SafeRef{String}
◌  │  %3  = Core.lshr_int(1, 63)::Int64
◌  │  %4  = Core.trunc_int(Core.UInt8, %3)::UInt8
◌  │  %5  = Core.eq_int(%4, 0x01)::Bool
◌  └───       goto #3 if not %5
X 2 ──       invoke Core.throw_inexacterror(:check_top_bit::Symbol, UInt64::Type{UInt64}, 1::Int64)::Union{}
◌  └───       unreachable
◌  3 ──       goto #4
◌  4 ── %10 = Core.bitcast(Core.UInt64, 1)::UInt64
◌  └───       goto #5
◌  5 ──       goto #6
◌  6 ──       goto #7
◌  7 ──       goto #8
◌  8 ──       $(Expr(:foreigncall, :(:jl_array_grow_end), Nothing, svec(Any, UInt64), 0, :(:ccall), :(%1), :(%10), :(%10)))::Nothing
◌  └───       goto #9
◌  9 ── %17 = Base.arraylen(%1)::Int64
◌  │        Base.arrayset(true, %1, %2, %17)::Vector{Any}
◌  └───       goto #10
↑′ 10 ─ %20 = Base.arrayref(true, %1, 1)::Any
◌  │  %21 = Base.arraylen(%1)::Int64
↑′ │  %22 = Core.tuple(%20, %21)::Tuple{Any, Int64}
◌  └───       return %22
```
In the above example `EscapeAnalysis` understands that `%20` and `%2` (corresponding to the allocated object `SafeRef(s)`) are aliased via the `arrayset`-`arrayref` chain and imposes `ReturnEscape` on them, but not impose it on the allocated array `%1` (corresponding to `ary`). `EscapeAnalysis` still imposes `ThrownEscape` on `ary` since it also needs to account for potential escapes via `BoundsError`, but also note that such unhandled `ThrownEscape` can often be ignored when optimizing the `ary` allocation.

Furthermore, in cases when array index information as well as array dimensions can be known *precisely*, `EscapeAnalysis` is able to even reason about "per-element" aliasing via `arrayref`-`arrayset` chain, as `EscapeAnalysis` does "per-field" alias analysis for objects:


```julia
julia> code_escapes((String,String)) do s, t
           ary = Vector{Any}(undef, 2)
           ary[1] = SafeRef(s)
           ary[2] = SafeRef(t)
           return ary[1], length(ary)
       end#13(↑ _2::String, * _3::String) in Main at REPL[1]:2
*′ 1 ─ %1 = $(Expr(:foreigncall, :(:jl_alloc_array_1d), Vector{Any}, svec(Any, Int64), 0, :(:ccall), Vector{Any}, 2, 2))::Vector{Any}
↑′ │  %2 = %new(Main.SafeRef{String}, _2)::Main.SafeRef{String}
◌  │       Base.arrayset(true, %1, %2, 1)::Vector{Any}
*′ │  %4 = %new(Main.SafeRef{String}, _3)::Main.SafeRef{String}
◌  │       Base.arrayset(true, %1, %4, 2)::Vector{Any}
↑′ │  %6 = Base.arrayref(true, %1, 1)::Any
◌  │  %7 = Base.arraylen(%1)::Int64
↑′ │  %8 = Core.tuple(%6, %7)::Tuple{Any, Int64}
◌  └──      return %8
```
Note that `ReturnEscape` is only imposed on `%2` (corresponding to `SafeRef(s)`) but not on `%4` (corresponding to `SafeRef(t)`). This is because the allocated array's dimension and indices involved with all `arrayref`/`arrayset` operations are available as constant information and `EscapeAnalysis` can understand that `%6` is aliased to `%2` but never be aliased to `%4`. In this kind of case, the succeeding optimization passes will be able to replace `Base.arrayref(true, %1, 1)::Any` with `%2` (a.k.a. "load-forwarding") and eventually eliminate the allocation of array `%1` entirely (a.k.a. "scalar-replacement").

When compared to object field analysis, where an access to object field can be analyzed trivially using type information derived by inference, array dimension isn't encoded as type information and so we need an additional analysis to derive that information. `EscapeAnalysis` at this moment first does an additional simple linear scan to analyze dimensions of allocated arrays before firing up the main analysis routine so that the succeeding escape analysis can precisely analyze operations on those arrays.

However, such precise "per-element" alias analysis is often hard. Essentially, the main difficulty inherit to array is that array dimension and index are often non-constant:

* loop often produces loop-variant, non-constant array indices
* (specific to vectors) array resizing changes array dimension and invalidates its constant-ness

Let's discuss those difficulties with concrete examples.

In the following example, `EscapeAnalysis` fails the precise alias analysis since the index at the `Base.arrayset(false, %4, %8, %6)::Vector{Any}` is not (trivially) constant. Especially `Any[nothing, nothing]` forms a loop and calls that `arrayset` operation in a loop, where `%6` is represented as a ϕ-node value (whose value is control-flow dependent). As a result, `ReturnEscape` ends up imposed on both `%23` (corresponding to `SafeRef(s)`) and `%25` (corresponding to `SafeRef(t)`), although ideally we want it to be imposed only on `%23` but not on `%25`:


```julia
julia> code_escapes((String,String)) do s, t
           ary = Any[nothing, nothing]
           ary[1] = SafeRef(s)
           ary[2] = SafeRef(t)
           return ary[1], length(ary)
       end#15(↑ _2::String, ↑ _3::String) in Main at REPL[1]:2
◌  1 ─ %1  = Main.nothing::Core.Const(nothing)
◌  │  %2  = Main.nothing::Core.Const(nothing)
◌  │  %3  = Core.tuple(%1, %2)::Core.Const((nothing, nothing))
*′ │  %4  = $(Expr(:foreigncall, :(:jl_alloc_array_1d), Vector{Any}, svec(Any, Int64), 0, :(:ccall), Vector{Any}, 2, 2))::Vector{Any}
◌  └──       goto #7 if not true
◌  2 ┄ %6  = φ (#1 => 1, #6 => %16)::Int64
◌  │  %7  = φ (#1 => 1, #6 => %17)::Int64
↑′ │  %8  = Base.getfield(%3, %6, false)::Nothing
◌  │        Base.arrayset(false, %4, %8, %6)::Vector{Any}
◌  │  %10 = (%7 === 2)::Bool
◌  └──       goto #4 if not %10
◌  3 ─       Base.nothing::Core.Const(nothing)
◌  └──       goto #5
◌  4 ─ %14 = Base.add_int(%7, 1)::Int64
◌  └──       goto #5
◌  5 ┄ %16 = φ (#4 => %14)::Int64
◌  │  %17 = φ (#4 => %14)::Int64
◌  │  %18 = φ (#3 => true, #4 => false)::Bool
◌  │  %19 = Base.not_int(%18)::Bool
◌  └──       goto #7 if not %19
◌  6 ─       goto #2
◌  7 ┄       goto #8
↑′ 8 ─ %23 = %new(Main.SafeRef{String}, _2)::Main.SafeRef{String}
◌  │        Base.arrayset(true, %4, %23, 1)::Vector{Any}
↑′ │  %25 = %new(Main.SafeRef{String}, _3)::Main.SafeRef{String}
◌  │        Base.arrayset(true, %4, %25, 2)::Vector{Any}
↑′ │  %27 = Base.arrayref(true, %4, 1)::Any
◌  │  %28 = Base.arraylen(%4)::Int64
↑′ │  %29 = Core.tuple(%27, %28)::Tuple{Any, Int64}
◌  └──       return %29
```
The next example illustrates how vector resizing makes precise alias analysis hard. The essential difficulty is that the dimension of allocated array `%1` is first initialized as `0`, but it changes by the two `:jl_array_grow_end` calls afterwards. `EscapeAnalysis` currently simply gives up precise alias analysis whenever it encounters any array resizing operations and so `ReturnEscape` is imposed on both `%2` (corresponding to `SafeRef(s)`) and `%20` (corresponding to `SafeRef(t)`):


```julia
julia> code_escapes((String,String)) do s, t
           ary = Any[]
           push!(ary, SafeRef(s))
           push!(ary, SafeRef(t))
           ary[1], length(ary)
       end#17(↑ _2::String, ↑ _3::String) in Main at REPL[1]:2
*′ 1 ── %1  = $(Expr(:foreigncall, :(:jl_alloc_array_1d), Vector{Any}, svec(Any, Int64), 0, :(:ccall), Vector{Any}, 0, 0))::Vector{Any}
↑′ │  %2  = %new(Main.SafeRef{String}, _2)::Main.SafeRef{String}
◌  │  %3  = Core.lshr_int(1, 63)::Int64
◌  │  %4  = Core.trunc_int(Core.UInt8, %3)::UInt8
◌  │  %5  = Core.eq_int(%4, 0x01)::Bool
◌  └───       goto #3 if not %5
X 2 ──       invoke Core.throw_inexacterror(:check_top_bit::Symbol, UInt64::Type{UInt64}, 1::Int64)::Union{}
◌  └───       unreachable
◌  3 ──       goto #4
◌  4 ── %10 = Core.bitcast(Core.UInt64, 1)::UInt64
◌  └───       goto #5
◌  5 ──       goto #6
◌  6 ──       goto #7
◌  7 ──       goto #8
◌  8 ──       $(Expr(:foreigncall, :(:jl_array_grow_end), Nothing, svec(Any, UInt64), 0, :(:ccall), :(%1), :(%10), :(%10)))::Nothing
◌  └───       goto #9
◌  9 ── %17 = Base.arraylen(%1)::Int64
◌  │        Base.arrayset(true, %1, %2, %17)::Vector{Any}
◌  └───       goto #10
↑′ 10 ─ %20 = %new(Main.SafeRef{String}, _3)::Main.SafeRef{String}
◌  │  %21 = Core.lshr_int(1, 63)::Int64
◌  │  %22 = Core.trunc_int(Core.UInt8, %21)::UInt8
◌  │  %23 = Core.eq_int(%22, 0x01)::Bool
◌  └───       goto #12 if not %23
X 11 ─       invoke Core.throw_inexacterror(:check_top_bit::Symbol, UInt64::Type{UInt64}, 1::Int64)::Union{}
◌  └───       unreachable
◌  12 ─       goto #13
◌  13 ─ %28 = Core.bitcast(Core.UInt64, 1)::UInt64
◌  └───       goto #14
◌  14 ─       goto #15
◌  15 ─       goto #16
◌  16 ─       goto #17
◌  17 ─       $(Expr(:foreigncall, :(:jl_array_grow_end), Nothing, svec(Any, UInt64), 0, :(:ccall), :(%1), :(%28), :(%28)))::Nothing
◌  └───       goto #18
◌  18 ─ %35 = Base.arraylen(%1)::Int64
◌  │        Base.arrayset(true, %1, %20, %35)::Vector{Any}
◌  └───       goto #19
↑′ 19 ─ %38 = Base.arrayref(true, %1, 1)::Any
◌  │  %39 = Base.arraylen(%1)::Int64
↑′ │  %40 = Core.tuple(%38, %39)::Tuple{Any, Int64}
◌  └───       return %40
```
In order to address these difficulties, we need inference to be aware of array dimensions and propagate array dimensions in a flow-sensitive way, as well as come up with nice representation of loop-variant values.

`EscapeAnalysis` at this moment quickly switches to the more imprecise analysis that doesn't track precise index information in cases when array dimensions or indices are trivially non constant. The switch can naturally be implemented as a lattice join operation of `EscapeInfo.AliasInfo` property in the data-flow analysis framework.

It would be also worth noting how `EscapeAnalysis` handles possible escapes via exceptions. Naively it seems enough to propagate escape information imposed on `:the_exception` object to all values that may be thrown in a corresponding `try` block. But there are actually several other ways to access to the exception object in Julia, such as `Base.current_exceptions` and `rethrow`. For example, escape analysis needs to account for potential escape of `r` in the example below:


```julia
julia> const GR = Ref{Any}();  
julia> @noinline function rethrow_escape!()
           try
               rethrow()
           catch err
               GR[] = err
           end
       end;  
julia> get′(x) = isassigned(x) ? x[] : throw(x);  
julia> code_escapes() do
           r = Ref{String}()
           local t
           try
               t = get′(r)
           catch err
               t = typeof(err)   # `err` (which `r` aliases to) doesn't escape here
               rethrow_escape!() # but `r` escapes here
           end
           return t
       end#19() in Main at REPL[4]:2
X 1 ── %1  = %new(Base.RefValue{String})::Base.RefValue{String}
◌  2 ── %2  = $(Expr(:enter, #8))
◌  3 ── %3  = Base.isdefined(%1, :x)::Bool
◌  └───       goto #5 if not %3
X 4 ── %5  = Base.getfield(%1, :x)::String
◌  └───       goto #6
◌  5 ──       Main.throw(%1)::Union{}
◌  └───       unreachable
◌  6 ──       $(Expr(:leave, 1))
◌  7 ──       goto #10
◌  8 ──       $(Expr(:leave, 1))
✓ 9 ── %12 = $(Expr(:the_exception))::Any
X │  %13 = Main.typeof(%12)::DataType
X │        invoke Main.rethrow_escape!()::Any
◌  └───       $(Expr(:pop_exception, :(%2)))::Any
X 10 ┄ %16 = φ (#7 => %5, #9 => %13)::Union{DataType, String}
◌  └───       return %16
```
It requires a global analysis in order to correctly reason about all possible escapes via existing exception interfaces. For now we always propagate the topmost escape information to all potentially thrown objects conservatively, since such an additional analysis might not be worthwhile to do given that exception handling and error path usually don't need to be very performance sensitive, and also optimizations of error paths might be very ineffective anyway since they are often even "unoptimized" intentionally for latency reasons.

`x::EscapeInfo`'s `x.ThrownEscape` property records SSA statements where `x` can be thrown as an exception. Using this information `EscapeAnalysis` can propagate possible escapes via exceptions limitedly to only those may be thrown in each `try` region:


```julia
julia> result = code_escapes((String,String)) do s1, s2
           r1 = Ref(s1)
           r2 = Ref(s2)
           local ret
           try
               s1 = get′(r1)
               ret = sizeof(s1)
           catch err
               global GV = err # will definitely escape `r1`
           end
           s2 = get′(r2)       # still `r2` doesn't escape fully
           return s2
       end#21(X _2::String, ↑ _3::String) in Main at REPL[1]:2
X 1 ── %1  = %new(Base.RefValue{String}, _2)::Base.RefValue{String}
*′ └─── %2  = %new(Base.RefValue{String}, _3)::Base.RefValue{String}
◌  2 ── %3  = $(Expr(:enter, #8))
*′ └─── %4  = ϒ (%2)::Base.RefValue{String}
◌  3 ── %5  = Base.isdefined(%1, :x)::Bool
◌  └───       goto #5 if not %5
X 4 ──       Base.getfield(%1, :x)::String
◌  └───       goto #6
◌  5 ──       Main.throw(%1)::Union{}
◌  └───       unreachable
◌  6 ──       nothing::Core.Const(Core.sizeof)
◌  │        nothing::Int64
◌  └───       $(Expr(:leave, 1))
◌  7 ──       goto #10
*′ 8 ── %15 = φᶜ (%4)::Base.RefValue{String}
◌  └───       $(Expr(:leave, 1))
X 9 ── %17 = $(Expr(:the_exception))::Any
◌  │        (Main.GV = %17)::Any
◌  └───       $(Expr(:pop_exception, :(%3)))::Any
*′ 10 ┄ %20 = φ (#7 => %2, #9 => %15)::Base.RefValue{String}
◌  │  %21 = Base.isdefined(%20, :x)::Bool
◌  └───       goto #12 if not %21
↑ 11 ─ %23 = Base.getfield(%20, :x)::String
◌  └───       goto #13
◌  12 ─       Main.throw(%20)::Union{}
◌  └───       unreachable
◌  13 ─       return %23
```
`analyze_escapes` is the entry point to analyze escape information of SSA-IR elements.

Most optimizations like SROA (`sroa_pass!`) are more effective when applied to an optimized source that the inlining pass (`ssa_inlining_pass!`) has simplified by resolving inter-procedural calls and expanding callee sources. Accordingly, `analyze_escapes` is also able to analyze post-inlining IR and collect escape information that is useful for certain memory-related optimizations.

However, since certain optimization passes like inlining can change control flows and eliminate dead code, they can break the inter-procedural validity of escape information. In particularity, in order to collect inter-procedurally valid escape information, we need to analyze a pre-inlining IR.

Because of this reason, `analyze_escapes` can analyze `IRCode` at any Julia-level optimization stage, and especially, it is supposed to be used at the following two stages:

* `IPO EA`: analyze pre-inlining IR to generate IPO-valid escape information cache
* `Local EA`: analyze post-inlining IR to collect locally-valid escape information

Escape information derived by `IPO EA` is transformed to the `ArgEscapeCache` data structure and cached globally. By passing an appropriate `get_escape_cache` callback to `analyze_escapes`, the escape analysis can improve analysis accuracy by utilizing cached inter-procedural information of non-inlined callees that has been derived by previous `IPO EA`. More interestingly, it is also valid to use `IPO EA` escape information for type inference, e.g., inference accuracy can be improved by forming `Const`/`PartialStruct`/`MustAlias` of mutable object.

Since the computational cost of `analyze_escapes` is not that cheap, both `IPO EA` and `Local EA` are better to run only when there is any profitability. Currently `EscapeAnalysis` provides the `is_ipo_profitable` heuristic to check a profitability of `IPO EA`.


```julia
analyze_escapes(ir::IRCode, nargs::Int, call_resolved::Bool, get_escape_cache::Callable)
    -> estate::EscapeState
```
Analyzes escape information in `ir`:

* `nargs`: the number of actual arguments of the analyzed call
* `call_resolved`: if interprocedural calls are already resolved by `ssa_inlining_pass!`
* `get_escape_cache(::Union{InferenceResult,MethodInstance}) -> Union{Nothing,ArgEscapeCache}`: retrieves cached argument escape information
[source](https://github.com/JuliaLang/julia/blob/17cfb8e65ead377bf1b4598d8a9869144142c84e/base/compiler/ssair/EscapeAnalysis/EscapeAnalysis.jl#L649-L658)
```julia
estate::EscapeState
```
Extended lattice that maps arguments and SSA values to escape information represented as [`EscapeInfo`](https://docs.julialang.org/#Core.Compiler.EscapeAnalysis.EscapeInfo). Escape information imposed on SSA IR element `x` can be retrieved by `estate[x]`.

[source](https://github.com/JuliaLang/julia/blob/17cfb8e65ead377bf1b4598d8a9869144142c84e/base/compiler/ssair/EscapeAnalysis/EscapeAnalysis.jl#L449-L454)
```julia
x::EscapeInfo
```
A lattice for escape information, which holds the following properties:

* `x.Analyzed::Bool`: not formally part of the lattice, only indicates `x` has not been analyzed or not
* `x.ReturnEscape::Bool`: indicates `x` can escape to the caller via return
* `x.ThrownEscape::BitSet`: records SSA statement numbers where `x` can be thrown as exception:
	+ `isempty(x.ThrownEscape)`: `x` will never be thrown in this call frame (the bottom)
	+ `pc ∈ x.ThrownEscape`: `x` may be thrown at the SSA statement at `pc`
	+ `-1 ∈ x.ThrownEscape`: `x` may be thrown at arbitrary points of this call frame (the top)This information will be used by `escape_exception!` to propagate potential escapes via exception.
* `x.AliasInfo::Union{Bool,IndexableFields,IndexableElements,Unindexable}`: maintains all possible values that can be aliased to fields or array elements of `x`:
	+ `x.AliasInfo === false` indicates the fields/elements of `x` aren't analyzed yet
	+ `x.AliasInfo === true` indicates the fields/elements of `x` can't be analyzed, e.g. the type of `x` is not known or is not concrete and thus its fields/elements can't be known precisely
	+ `x.AliasInfo::IndexableFields` records all the possible values that can be aliased to fields of object `x` with precise index information
	+ `x.AliasInfo::IndexableElements` records all the possible values that can be aliased to elements of array `x` with precise index information
	+ `x.AliasInfo::Unindexable` records all the possible values that can be aliased to fields/elements of `x` without precise index information
* `x.Liveness::BitSet`: records SSA statement numbers where `x` should be live, e.g. to be used as a call argument, to be returned to a caller, or preserved for `:foreigncall`:
	+ `isempty(x.Liveness)`: `x` is never be used in this call frame (the bottom)
	+ `0 ∈ x.Liveness` also has the special meaning that it's a call argument of the currently analyzed call frame (and thus it's visible from the caller immediately).
	+ `pc ∈ x.Liveness`: `x` may be used at the SSA statement at `pc`
	+ `-1 ∈ x.Liveness`: `x` may be used at arbitrary points of this call frame (the top)

There are utility constructors to create common `EscapeInfo`s, e.g.,

* `NoEscape()`: the bottom(-like) element of this lattice, meaning it won't escape to anywhere
* `AllEscape()`: the topmost element of this lattice, meaning it will escape to everywhere

`analyze_escapes` will transition these elements from the bottom to the top, in the same direction as Julia's native type inference routine. An abstract state will be initialized with the bottom(-like) elements:

* the call arguments are initialized as `ArgEscape()`, whose `Liveness` property includes `0` to indicate that it is passed as a call argument and visible from a caller immediately
* the other states are initialized as `NotAnalyzed()`, which is a special lattice element that is slightly lower than `NoEscape`, but at the same time doesn't represent any meaning other than it's not analyzed yet (thus it's not formally part of the lattice)
[source](https://github.com/JuliaLang/julia/blob/17cfb8e65ead377bf1b4598d8a9869144142c84e/base/compiler/ssair/EscapeAnalysis/EscapeAnalysis.jl#L46-L86)
```julia
is_ipo_profitable(ir::IRCode, nargs::Int) -> Bool
```
Heuristically checks if there is any profitability to run the escape analysis on `ir` and generate IPO escape information cache. Specifically, this function examines if any call argument is "interesting" in terms of their escapability.

[source](https://github.com/JuliaLang/julia/blob/17cfb8e65ead377bf1b4598d8a9869144142c84e/base/compiler/ssair/EscapeAnalysis/EscapeAnalysis.jl#L591-L597)

---




