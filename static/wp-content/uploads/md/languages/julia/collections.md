Sequential iteration is implemented by the [`iterate`](https://docs.julialang.org/#Base.iterate) function. The general `for` loop:


```julia
for i in iter   # or  "for i = iter"
    # body
end
```
is translated into:


```julia
next = iterate(iter)
while next !== nothing
    (i, state) = next
    # body
    next = iterate(iter, state)
end
```
The `state` object may be anything, and should be chosen appropriately for each iterable type. See the [manual section on the iteration interface](https://docs.julialang.org/../../manual/interfaces/#man-interface-iteration) for more details about defining a custom iterable type.


```julia
iterate(iter [, state]) -> Union{Nothing, Tuple{Any, Any}}
```
Advance the iterator to obtain the next element. If no elements remain, `nothing` should be returned. Otherwise, a 2-tuple of the next element and the new iteration state should be returned.

[source](https://github.com/JuliaLang/julia/blob/17cfb8e65ead377bf1b4598d8a9869144142c84e/base/essentials.jl#L897-L903)
```julia
IteratorSize(itertype::Type) -> IteratorSize
```
Given the type of an iterator, return one of the following values:

* `SizeUnknown()` if the length (number of elements) cannot be determined in advance.
* `HasLength()` if there is a fixed, finite length.
* `HasShape{N}()` if there is a known length plus a notion of multidimensional shape (as for an array). In this case `N` should give the number of dimensions, and the [`axes`](https://docs.julialang.org/../arrays/#Base.axes-Tuple%7BAny%7D) function is valid for the iterator.
* `IsInfinite()` if the iterator yields values forever.

The default value (for iterators that do not define this function) is `HasLength()`. This means that most iterators are assumed to implement [`length`](https://docs.julialang.org/#Base.length).

This trait is generally used to select between algorithms that pre-allocate space for their result, and algorithms that resize their result incrementally.


```julia
julia> Base.IteratorSize(1:5)
Base.HasShape{1}()

julia> Base.IteratorSize((2,3))
Base.HasLength()
```
[source](https://github.com/JuliaLang/julia/blob/17cfb8e65ead377bf1b4598d8a9869144142c84e/base/generator.jl#L66-L91)
```julia
IteratorEltype(itertype::Type) -> IteratorEltype
```
Given the type of an iterator, return one of the following values:

* `EltypeUnknown()` if the type of elements yielded by the iterator is not known in advance.
* `HasEltype()` if the element type is known, and [`eltype`](https://docs.julialang.org/#Base.eltype) would return a meaningful value.

`HasEltype()` is the default, since iterators are assumed to implement [`eltype`](https://docs.julialang.org/#Base.eltype).

This trait is generally used to select between algorithms that pre-allocate a specific type of result, and algorithms that pick a result type based on the types of yielded values.


```julia
julia> Base.IteratorEltype(1:5)
Base.HasEltype()
```
[source](https://github.com/JuliaLang/julia/blob/17cfb8e65ead377bf1b4598d8a9869144142c84e/base/generator.jl#L107-L125)Fully implemented by:


```julia
AbstractRange{T}
```
Supertype for ranges with elements of type `T`. [`UnitRange`](https://docs.julialang.org/#Base.UnitRange) and other types are subtypes of this.

[source](https://github.com/JuliaLang/julia/blob/17cfb8e65ead377bf1b4598d8a9869144142c84e/base/range.jl#L245-L250)
```julia
OrdinalRange{T, S} <: AbstractRange{T}
```
Supertype for ordinal ranges with elements of type `T` with spacing(s) of type `S`. The steps should be always-exact multiples of [`oneunit`](https://docs.julialang.org/../numbers/#Base.oneunit), and `T` should be a "discrete" type, which cannot have values smaller than `oneunit`. For example, `Integer` or `Date` types would qualify, whereas `Float64` would not (since this type can represent values smaller than `oneunit(Float64)`. [`UnitRange`](https://docs.julialang.org/#Base.UnitRange), [`StepRange`](https://docs.julialang.org/#Base.StepRange), and other types are subtypes of this.

[source](https://github.com/JuliaLang/julia/blob/17cfb8e65ead377bf1b4598d8a9869144142c84e/base/range.jl#L260-L270)
```julia
AbstractUnitRange{T} <: OrdinalRange{T, T}
```
Supertype for ranges with a step size of [`oneunit(T)`](https://docs.julialang.org/../numbers/#Base.oneunit) with elements of type `T`. [`UnitRange`](https://docs.julialang.org/#Base.UnitRange) and other types are subtypes of this.

[source](https://github.com/JuliaLang/julia/blob/17cfb8e65ead377bf1b4598d8a9869144142c84e/base/range.jl#L273-L278)
```julia
StepRange{T, S} <: OrdinalRange{T, S}
```
Ranges with elements of type `T` with spacing of type `S`. The step between each element is constant, and the range is defined in terms of a `start` and `stop` of type `T` and a `step` of type `S`. Neither `T` nor `S` should be floating point types. The syntax `a:b:c` with `b > 1` and `a`, `b`, and `c` all integers creates a `StepRange`.

**Examples**


```julia
julia> collect(StepRange(1, Int8(2), 10))
5-element Vector{Int64}:
 1
 3
 5
 7
 9

julia> typeof(StepRange(1, Int8(2), 10))
StepRange{Int64, Int8}

julia> typeof(1:3:6)
StepRange{Int64, Int64}
```
[source](https://github.com/JuliaLang/julia/blob/17cfb8e65ead377bf1b4598d8a9869144142c84e/base/range.jl#L281-L306)
```julia
UnitRange{T<:Real}
```
A range parameterized by a `start` and `stop` of type `T`, filled with elements spaced by `1` from `start` until `stop` is exceeded. The syntax `a:b` with `a` and `b` both `Integer`s creates a `UnitRange`.

**Examples**


```julia
julia> collect(UnitRange(2.3, 5.2))
3-element Vector{Float64}:
 2.3
 3.3
 4.3

julia> typeof(1:10)
UnitRange{Int64}
```
[source](https://github.com/JuliaLang/julia/blob/17cfb8e65ead377bf1b4598d8a9869144142c84e/base/range.jl#L371-L389)
```julia
LinRange{T,L}
```
A range with `len` linearly spaced elements between its `start` and `stop`. The size of the spacing is controlled by `len`, which must be an `Integer`.

**Examples**


```julia
julia> LinRange(1.5, 5.5, 9)
9-element LinRange{Float64, Int64}:
 1.5,2.0,2.5,3.0,3.5,4.0,4.5,5.0,5.5
```
Compared to using [`range`](https://docs.julialang.org/../math/#Base.range), directly constructing a `LinRange` should have less overhead but won't try to correct for floating point errors:


```julia
julia> collect(range(-0.1, 0.3, length=5))
5-element Vector{Float64}:
 -0.1
  0.0
  0.1
  0.2
  0.3

julia> collect(LinRange(-0.1, 0.3, 5))
5-element Vector{Float64}:
 -0.1
 -1.3877787807814457e-17
  0.09999999999999999
  0.19999999999999998
  0.3
```
[source](https://github.com/JuliaLang/julia/blob/17cfb8e65ead377bf1b4598d8a9869144142c84e/base/range.jl#L500-L533)
```julia
isempty(collection) -> Bool
```
Determine whether a collection is empty (has no elements).

**Examples**


```julia
julia> isempty([])
true

julia> isempty([1 2 3])
false
```
[source](https://github.com/JuliaLang/julia/blob/17cfb8e65ead377bf1b4598d8a9869144142c84e/base/essentials.jl#L771-L784)
```julia
isempty(condition)
```
Return `true` if no tasks are waiting on the condition, `false` otherwise.

[source](https://github.com/JuliaLang/julia/blob/17cfb8e65ead377bf1b4598d8a9869144142c84e/base/condition.jl#L159-L163)
```julia
empty!(collection) -> collection
```
Remove all elements from a `collection`.

**Examples**


```julia
julia> A = Dict("a" => 1, "b" => 2)
Dict{String, Int64} with 2 entries:
  "b" => 2
  "a" => 1

julia> empty!(A);

julia> A
Dict{String, Int64}()
```
[source](https://github.com/JuliaLang/julia/blob/17cfb8e65ead377bf1b4598d8a9869144142c84e/base/dict.jl#L247-L264)
```julia
length(collection) -> Integer
```
Return the number of elements in the collection.

Use [`lastindex`](https://docs.julialang.org/#Base.lastindex) to get the last valid index of an indexable collection.

See also: [`size`](https://docs.julialang.org/../arrays/#Base.size), [`ndims`](https://docs.julialang.org/../arrays/#Base.ndims), [`eachindex`](https://docs.julialang.org/../arrays/#Base.eachindex).

**Examples**


```julia
julia> length(1:5)
5

julia> length([1, 2, 3, 4])
4

julia> length([1 2; 3 4])
4
```
[source](https://github.com/JuliaLang/julia/blob/17cfb8e65ead377bf1b4598d8a9869144142c84e/base/abstractarray.jl#L242-L262)
```julia
Base.checked_length(r)
```
Calculates `length(r)`, but may check for overflow errors where applicable when the result doesn't fit into `Union{Integer(eltype(r)),Int}`.

[source](https://github.com/JuliaLang/julia/blob/17cfb8e65ead377bf1b4598d8a9869144142c84e/base/checked.jl#L353-L358)Fully implemented by:


```julia
in(item, collection) -> Bool
∈(item, collection) -> Bool
```
Determine whether an item is in the given collection, in the sense that it is [`==`](https://docs.julialang.org/../math/#Base.:==) to one of the values generated by iterating over the collection. Returns a `Bool` value, except if `item` is [`missing`](https://docs.julialang.org/../base/#Base.missing) or `collection` contains `missing` but not `item`, in which case `missing` is returned ([three-valued logic](https://en.wikipedia.org/wiki/Three-valued_logic), matching the behavior of [`any`](https://docs.julialang.org/#Base.any-Tuple%7BAny%7D) and [`==`](https://docs.julialang.org/../math/#Base.:==)).

Some collections follow a slightly different definition. For example, [`Set`](https://docs.julialang.org/#Base.Set)s check whether the item [`isequal`](https://docs.julialang.org/../base/#Base.isequal) to one of the elements. [`Dict`](https://docs.julialang.org/#Base.Dict)s look for `key=>value` pairs, and the key is compared using [`isequal`](https://docs.julialang.org/../base/#Base.isequal). To test for the presence of a key in a dictionary, use [`haskey`](https://docs.julialang.org/#Base.haskey) or `k in keys(dict)`. For these collections, the result is always a `Bool` and never `missing`.

To determine whether an item is not in a given collection, see [`:∉`](https://docs.julialang.org/#Base.:%E2%88%89). You may also negate the `in` by doing `!(a in b)` which is logically similar to "not in".

When broadcasting with `in.(items, collection)` or `items .∈ collection`, both `item` and `collection` are broadcasted over, which is often not what is intended. For example, if both arguments are vectors (and the dimensions match), the result is a vector indicating whether each value in collection `items` is `in` the value at the corresponding position in `collection`. To get a vector indicating whether each value in `items` is in `collection`, wrap `collection` in a tuple or a `Ref` like this: `in.(items, Ref(collection))` or `items .∈ Ref(collection)`.

**Examples**


```julia
julia> a = 1:3:20
1:3:19

julia> 4 in a
true

julia> 5 in a
false

julia> missing in [1, 2]
missing

julia> 1 in [2, missing]
missing

julia> 1 in [1, missing]
true

julia> missing in Set([1, 2])
false

julia> !(21 in a)
true

julia> !(19 in a)
false

julia> [1, 2] .∈ [2, 3]
2-element BitVector:
 0
 0

julia> [1, 2] .∈ ([2, 3],)
2-element BitVector:
 0
 1
```
See also: [`insorted`](https://docs.julialang.org/../sort/#Base.Sort.insorted), [`contains`](https://docs.julialang.org/../strings/#Base.contains), [`occursin`](https://docs.julialang.org/../strings/#Base.occursin), [`issubset`](#Base.issubset).

[source](https://github.com/JuliaLang/julia/blob/17cfb8e65ead377bf1b4598d8a9869144142c84e/base/operators.jl#L1279-L1349)
```julia
∉(item, collection) -> Bool
∌(collection, item) -> Bool
```
Negation of `∈` and `∋`, i.e. checks that `item` is not in `collection`.

When broadcasting with `items .∉ collection`, both `item` and `collection` are broadcasted over, which is often not what is intended. For example, if both arguments are vectors (and the dimensions match), the result is a vector indicating whether each value in collection `items` is not in the value at the corresponding position in `collection`. To get a vector indicating whether each value in `items` is not in `collection`, wrap `collection` in a tuple or a `Ref` like this: `items .∉ Ref(collection)`.

**Examples**


```julia
julia> 1 ∉ 2:4
true

julia> 1 ∉ 1:3
false

julia> [1, 2] .∉ [2, 3]
2-element BitVector:
 1
 1

julia> [1, 2] .∉ ([2, 3],)
2-element BitVector:
 1
 0
```
[source](https://github.com/JuliaLang/julia/blob/17cfb8e65ead377bf1b4598d8a9869144142c84e/base/operators.jl#L1352-L1384)
```julia
eltype(type)
```
Determine the type of the elements generated by iterating a collection of the given `type`. For dictionary types, this will be a `Pair{KeyType,ValType}`. The definition `eltype(x) = eltype(typeof(x))` is provided for convenience so that instances can be passed instead of types. However the form that accepts a type argument should be defined for new types.

See also: [`keytype`](https://docs.julialang.org/#Base.keytype), [`typeof`](https://docs.julialang.org/../base/#Core.typeof).

**Examples**


```julia
julia> eltype(fill(1f0, (2,2)))
Float32

julia> eltype(fill(0x1, (2,2)))
UInt8
```
[source](https://github.com/JuliaLang/julia/blob/17cfb8e65ead377bf1b4598d8a9869144142c84e/base/abstractarray.jl#L184-L203)
```julia
indexin(a, b)
```
Return an array containing the first index in `b` for each value in `a` that is a member of `b`. The output array contains `nothing` wherever `a` is not a member of `b`.

See also: [`sortperm`](https://docs.julialang.org/../sort/#Base.sortperm), [`findfirst`](https://docs.julialang.org/../arrays/#Base.findfirst-Tuple%7BAny%7D).

**Examples**


```julia
julia> a = ['a', 'b', 'c', 'b', 'd', 'a'];

julia> b = ['a', 'b', 'c'];

julia> indexin(a, b)
6-element Vector{Union{Nothing, Int64}}:
 1
 2
 3
 2
  nothing
 1

julia> indexin(b, a)
3-element Vector{Union{Nothing, Int64}}:
 1
 2
 3
```
[source](https://github.com/JuliaLang/julia/blob/17cfb8e65ead377bf1b4598d8a9869144142c84e/base/array.jl#L2376-L2406)
```julia
unique(itr)
```
Return an array containing only the unique elements of collection `itr`, as determined by [`isequal`](https://docs.julialang.org/../base/#Base.isequal), in the order that the first of each set of equivalent elements originally appears. The element type of the input is preserved.

See also: [`unique!`](https://docs.julialang.org/#Base.unique!), [`allunique`](https://docs.julialang.org/#Base.allunique), [`allequal`](https://docs.julialang.org/#Base.allequal).

**Examples**


```julia
julia> unique([1, 2, 6, 2])
3-element Vector{Int64}:
 1
 2
 6

julia> unique(Real[1, 1.0, 2])
2-element Vector{Real}:
 1
 2
```
[source](https://github.com/JuliaLang/julia/blob/17cfb8e65ead377bf1b4598d8a9869144142c84e/base/set.jl#L110-L133)
```julia
unique(f, itr)
```
Returns an array containing one value from `itr` for each unique value produced by `f` applied to elements of `itr`.

**Examples**


```julia
julia> unique(x -> x^2, [1, -1, 3, -3, 4])
3-element Vector{Int64}:
 1
 3
 4
```
[source](https://github.com/JuliaLang/julia/blob/17cfb8e65ead377bf1b4598d8a9869144142c84e/base/set.jl#L183-L197)
```julia
unique(A::AbstractArray; dims::Int)
```
Return unique regions of `A` along dimension `dims`.

**Examples**


```julia
julia> A = map(isodd, reshape(Vector(1:8), (2,2,2)))
2×2×2 Array{Bool, 3}:
[:, :, 1] =
 1  1
 0  0

[:, :, 2] =
 1  1
 0  0

julia> unique(A)
2-element Vector{Bool}:
 1
 0

julia> unique(A, dims=2)
2×1×2 Array{Bool, 3}:
[:, :, 1] =
 1
 0

[:, :, 2] =
 1
 0

julia> unique(A, dims=3)
2×2×1 Array{Bool, 3}:
[:, :, 1] =
 1  1
 0  0
```
[source](https://github.com/JuliaLang/julia/blob/17cfb8e65ead377bf1b4598d8a9869144142c84e/base/multidimensional.jl#L1612-L1650)
```julia
unique!(f, A::AbstractVector)
```
Selects one value from `A` for each unique value produced by `f` applied to elements of `A`, then return the modified A.

This method is available as of Julia 1.1.

**Examples**


```julia
julia> unique!(x -> x^2, [1, -1, 3, -3, 4])
3-element Vector{Int64}:
 1
 3
 4

julia> unique!(n -> n%3, [5, 1, 8, 9, 3, 4, 10, 7, 2, 6])
3-element Vector{Int64}:
 5
 1
 9

julia> unique!(iseven, [2, 3, 5, 7, 9])
2-element Vector{Int64}:
 2
 3
```
[source](https://github.com/JuliaLang/julia/blob/17cfb8e65ead377bf1b4598d8a9869144142c84e/base/set.jl#L245-L273)
```julia
unique!(A::AbstractVector)
```
Remove duplicate items as determined by [`isequal`](https://docs.julialang.org/../base/#Base.isequal), then return the modified `A`. `unique!` will return the elements of `A` in the order that they occur. If you do not care about the order of the returned data, then calling `(sort!(A); unique!(A))` will be much more efficient as long as the elements of `A` can be sorted.

**Examples**


```julia
julia> unique!([1, 1, 1])
1-element Vector{Int64}:
 1

julia> A = [7, 3, 2, 3, 7, 5];

julia> unique!(A)
4-element Vector{Int64}:
 7
 3
 2
 5

julia> B = [7, 6, 42, 6, 7, 42];

julia> sort!(B);  # unique! is able to process sorted data much more efficiently.

julia> unique!(B)
3-element Vector{Int64}:
  6
  7
 42
```
[source](https://github.com/JuliaLang/julia/blob/17cfb8e65ead377bf1b4598d8a9869144142c84e/base/set.jl#L337-L370)
```julia
allunique(itr) -> Bool
```
Return `true` if all values from `itr` are distinct when compared with [`isequal`](https://docs.julialang.org/../base/#Base.isequal).

See also: [`unique`](https://docs.julialang.org/#Base.unique), [`issorted`](https://docs.julialang.org/../sort/#Base.issorted), [`allequal`](https://docs.julialang.org/#Base.allequal).

**Examples**


```julia
julia> a = [1; 2; 3]
3-element Vector{Int64}:
 1
 2
 3

julia> allunique(a)
true

julia> allunique([a, a])
false
```
[source](https://github.com/JuliaLang/julia/blob/17cfb8e65ead377bf1b4598d8a9869144142c84e/base/set.jl#L381-L402)
```julia
allequal(itr) -> Bool
```
Return `true` if all values from `itr` are equal when compared with [`isequal`](https://docs.julialang.org/../base/#Base.isequal).

See also: [`unique`](https://docs.julialang.org/#Base.unique), [`allunique`](https://docs.julialang.org/#Base.allunique).

The `allequal` function requires at least Julia 1.8.

**Examples**


```julia
julia> allequal([])
true

julia> allequal([1])
true

julia> allequal([1, 1])
true

julia> allequal([1, 2])
false

julia> allequal(Dict(:a => 1, :b => 1))
false
```
[source](https://github.com/JuliaLang/julia/blob/17cfb8e65ead377bf1b4598d8a9869144142c84e/base/set.jl#L430-L457)
```julia
reduce(op, itr; [init])
```
Reduce the given collection `itr` with the given binary operator `op`. If provided, the initial value `init` must be a neutral element for `op` that will be returned for empty collections. It is unspecified whether `init` is used for non-empty collections.

For empty collections, providing `init` will be necessary, except for some special cases (e.g. when `op` is one of `+`, `*`, `max`, `min`, `&`, `|`) when Julia can determine the neutral element of `op`.

Reductions for certain commonly-used operators may have special implementations, and should be used instead: `maximum(itr)`, `minimum(itr)`, `sum(itr)`, `prod(itr)`, `any(itr)`, `all(itr)`.

The associativity of the reduction is implementation dependent. This means that you can't use non-associative operations like `-` because it is undefined whether `reduce(-,[1,2,3])` should be evaluated as `(1-2)-3` or `1-(2-3)`. Use [`foldl`](https://docs.julialang.org/#Base.foldl-Tuple%7BAny,%20Any%7D) or [`foldr`](https://docs.julialang.org/#Base.foldr-Tuple%7BAny,%20Any%7D) instead for guaranteed left or right associativity.

Some operations accumulate error. Parallelism will be easier if the reduction can be executed in groups. Future versions of Julia might change the algorithm. Note that the elements are not reordered if you use an ordered collection.

**Examples**


```julia
julia> reduce(*, [2; 3; 4])
24

julia> reduce(*, [2; 3; 4]; init=-1)
-24
```
[source](https://github.com/JuliaLang/julia/blob/17cfb8e65ead377bf1b4598d8a9869144142c84e/base/reduce.jl#L450-L482)
```julia
foldl(op, itr; [init])
```
Like [`reduce`](https://docs.julialang.org/#Base.reduce-Tuple%7BAny,%20Any%7D), but with guaranteed left associativity. If provided, the keyword argument `init` will be used exactly once. In general, it will be necessary to provide `init` to work with empty collections.

See also [`mapfoldl`](https://docs.julialang.org/#Base.mapfoldl-Tuple%7BAny,%20Any,%20Any%7D), [`foldr`](https://docs.julialang.org/#Base.foldr-Tuple%7BAny,%20Any%7D), [`accumulate`](https://docs.julialang.org/../arrays/#Base.accumulate).

**Examples**


```julia
julia> foldl(=>, 1:4)
((1 => 2) => 3) => 4

julia> foldl(=>, 1:4; init=0)
(((0 => 1) => 2) => 3) => 4

julia> accumulate(=>, (1,2,3,4))
(1, 1 => 2, (1 => 2) => 3, ((1 => 2) => 3) => 4)
```
[source](https://github.com/JuliaLang/julia/blob/17cfb8e65ead377bf1b4598d8a9869144142c84e/base/reduce.jl#L172-L192)
```julia
foldr(op, itr; [init])
```
Like [`reduce`](https://docs.julialang.org/#Base.reduce-Tuple%7BAny,%20Any%7D), but with guaranteed right associativity. If provided, the keyword argument `init` will be used exactly once. In general, it will be necessary to provide `init` to work with empty collections.

**Examples**


```julia
julia> foldr(=>, 1:4)
1 => (2 => (3 => 4))

julia> foldr(=>, 1:4; init=0)
1 => (2 => (3 => (4 => 0)))
```
[source](https://github.com/JuliaLang/julia/blob/17cfb8e65ead377bf1b4598d8a9869144142c84e/base/reduce.jl#L221-L236)
```julia
maximum(f, itr; [init])
```
Returns the largest result of calling function `f` on each element of `itr`.

The value returned for empty `itr` can be specified by `init`. It must be a neutral element for `max` (i.e. which is less than or equal to any other element) as it is unspecified whether `init` is used for non-empty collections.

Keyword argument `init` requires Julia 1.6 or later.

**Examples**


```julia
julia> maximum(length, ["Julion", "Julia", "Jule"])
6

julia> maximum(length, []; init=-1)
-1

julia> maximum(sin, Real[]; init=-1.0)  # good, since output of sin is >= -1
-1.0
```
[source](https://github.com/JuliaLang/julia/blob/17cfb8e65ead377bf1b4598d8a9869144142c84e/base/reduce.jl#L673-L697)
```julia
maximum(itr; [init])
```
Returns the largest element in a collection.

The value returned for empty `itr` can be specified by `init`. It must be a neutral element for `max` (i.e. which is less than or equal to any other element) as it is unspecified whether `init` is used for non-empty collections.

Keyword argument `init` requires Julia 1.6 or later.

**Examples**


```julia
julia> maximum(-20.5:10)
9.5

julia> maximum([1,2,3])
3

julia> maximum(())
ERROR: MethodError: reducing over an empty collection is not allowed; consider supplying `init` to the reducer
Stacktrace:
[...]

julia> maximum((); init=-Inf)
-Inf
```
[source](https://github.com/JuliaLang/julia/blob/17cfb8e65ead377bf1b4598d8a9869144142c84e/base/reduce.jl#L727-L756)
```julia
maximum(A::AbstractArray; dims)
```
Compute the maximum value of an array over the given dimensions. See also the [`max(a,b)`](https://docs.julialang.org/../math/#Base.max) function to take the maximum of two or more arguments, which can be applied elementwise to arrays via `max.(a,b)`.

See also: [`maximum!`](https://docs.julialang.org/#Base.maximum!), [`extrema`](https://docs.julialang.org/#Base.extrema), [`findmax`](https://docs.julialang.org/#Base.findmax), [`argmax`](https://docs.julialang.org/#Base.argmax).

**Examples**


```julia
julia> A = [1 2; 3 4]
2×2 Matrix{Int64}:
 1  2
 3  4

julia> maximum(A, dims=1)
1×2 Matrix{Int64}:
 3  4

julia> maximum(A, dims=2)
2×1 Matrix{Int64}:
 2
 4
```
[source](https://github.com/JuliaLang/julia/blob/17cfb8e65ead377bf1b4598d8a9869144142c84e/base/reducedim.jl#L621-L646)
```julia
maximum(f, A::AbstractArray; dims)
```
Compute the maximum value by calling the function `f` on each element of an array over the given dimensions.

**Examples**


```julia
julia> A = [1 2; 3 4]
2×2 Matrix{Int64}:
 1  2
 3  4

julia> maximum(abs2, A, dims=1)
1×2 Matrix{Int64}:
 9  16

julia> maximum(abs2, A, dims=2)
2×1 Matrix{Int64}:
  4
 16
```
[source](https://github.com/JuliaLang/julia/blob/17cfb8e65ead377bf1b4598d8a9869144142c84e/base/reducedim.jl#L649-L671)
```julia
maximum!(r, A)
```
Compute the maximum value of `A` over the singleton dimensions of `r`, and write results to `r`.

**Examples**


```julia
julia> A = [1 2; 3 4]
2×2 Matrix{Int64}:
 1  2
 3  4

julia> maximum!([1; 1], A)
2-element Vector{Int64}:
 2
 4

julia> maximum!([1 1], A)
1×2 Matrix{Int64}:
 3  4
```
[source](https://github.com/JuliaLang/julia/blob/17cfb8e65ead377bf1b4598d8a9869144142c84e/base/reducedim.jl#L674-L695)
```julia
minimum(f, itr; [init])
```
Returns the smallest result of calling function `f` on each element of `itr`.

The value returned for empty `itr` can be specified by `init`. It must be a neutral element for `min` (i.e. which is greater than or equal to any other element) as it is unspecified whether `init` is used for non-empty collections.

Keyword argument `init` requires Julia 1.6 or later.

**Examples**


```julia
julia> minimum(length, ["Julion", "Julia", "Jule"])
4

julia> minimum(length, []; init=typemax(Int64))
9223372036854775807

julia> minimum(sin, Real[]; init=1.0)  # good, since output of sin is <= 1
1.0
```
[source](https://github.com/JuliaLang/julia/blob/17cfb8e65ead377bf1b4598d8a9869144142c84e/base/reduce.jl#L700-L724)
```julia
minimum(itr; [init])
```
Returns the smallest element in a collection.

The value returned for empty `itr` can be specified by `init`. It must be a neutral element for `min` (i.e. which is greater than or equal to any other element) as it is unspecified whether `init` is used for non-empty collections.

Keyword argument `init` requires Julia 1.6 or later.

**Examples**


```julia
julia> minimum(-20.5:10)
-20.5

julia> minimum([1,2,3])
1

julia> minimum([])
ERROR: MethodError: reducing over an empty collection is not allowed; consider supplying `init` to the reducer
Stacktrace:
[...]

julia> minimum([]; init=Inf)
Inf
```
[source](https://github.com/JuliaLang/julia/blob/17cfb8e65ead377bf1b4598d8a9869144142c84e/base/reduce.jl#L759-L788)
```julia
minimum(A::AbstractArray; dims)
```
Compute the minimum value of an array over the given dimensions. See also the [`min(a,b)`](https://docs.julialang.org/../math/#Base.min) function to take the minimum of two or more arguments, which can be applied elementwise to arrays via `min.(a,b)`.

See also: [`minimum!`](https://docs.julialang.org/#Base.minimum!), [`extrema`](https://docs.julialang.org/#Base.extrema), [`findmin`](https://docs.julialang.org/#Base.findmin), [`argmin`](https://docs.julialang.org/#Base.argmin).

**Examples**


```julia
julia> A = [1 2; 3 4]
2×2 Matrix{Int64}:
 1  2
 3  4

julia> minimum(A, dims=1)
1×2 Matrix{Int64}:
 1  2

julia> minimum(A, dims=2)
2×1 Matrix{Int64}:
 1
 3
```
[source](https://github.com/JuliaLang/julia/blob/17cfb8e65ead377bf1b4598d8a9869144142c84e/base/reducedim.jl#L698-L723)
```julia
minimum(f, A::AbstractArray; dims)
```
Compute the minimum value by calling the function `f` on each element of an array over the given dimensions.

**Examples**


```julia
julia> A = [1 2; 3 4]
2×2 Matrix{Int64}:
 1  2
 3  4

julia> minimum(abs2, A, dims=1)
1×2 Matrix{Int64}:
 1  4

julia> minimum(abs2, A, dims=2)
2×1 Matrix{Int64}:
 1
 9
```
[source](https://github.com/JuliaLang/julia/blob/17cfb8e65ead377bf1b4598d8a9869144142c84e/base/reducedim.jl#L726-L748)
```julia
minimum!(r, A)
```
Compute the minimum value of `A` over the singleton dimensions of `r`, and write results to `r`.

**Examples**


```julia
julia> A = [1 2; 3 4]
2×2 Matrix{Int64}:
 1  2
 3  4

julia> minimum!([1; 1], A)
2-element Vector{Int64}:
 1
 3

julia> minimum!([1 1], A)
1×2 Matrix{Int64}:
 1  2
```
[source](https://github.com/JuliaLang/julia/blob/17cfb8e65ead377bf1b4598d8a9869144142c84e/base/reducedim.jl#L751-L772)
```julia
extrema(itr; [init]) -> (mn, mx)
```
Compute both the minimum `mn` and maximum `mx` element in a single pass, and return them as a 2-tuple.

The value returned for empty `itr` can be specified by `init`. It must be a 2-tuple whose first and second elements are neutral elements for `min` and `max` respectively (i.e. which are greater/less than or equal to any other element). As a consequence, when `itr` is empty the returned `(mn, mx)` tuple will satisfy `mn ≥ mx`. When `init` is specified it may be used even for non-empty `itr`.

Keyword argument `init` requires Julia 1.8 or later.

**Examples**


```julia
julia> extrema(2:10)
(2, 10)

julia> extrema([9,pi,4.5])
(3.141592653589793, 9.0)

julia> extrema([]; init = (Inf, -Inf))
(Inf, -Inf)
```
[source](https://github.com/JuliaLang/julia/blob/17cfb8e65ead377bf1b4598d8a9869144142c84e/base/reduce.jl#L791-L817)
```julia
extrema(f, itr; [init]) -> (mn, mx)
```
Compute both the minimum `mn` and maximum `mx` of `f` applied to each element in `itr` and return them as a 2-tuple. Only one pass is made over `itr`.

The value returned for empty `itr` can be specified by `init`. It must be a 2-tuple whose first and second elements are neutral elements for `min` and `max` respectively (i.e. which are greater/less than or equal to any other element). It is used for non-empty collections. Note: it implies that, for empty `itr`, the returned value `(mn, mx)` satisfies `mn ≥ mx` even though for non-empty `itr` it satisfies `mn ≤ mx`. This is a "paradoxical" but yet expected result.

This method requires Julia 1.2 or later.

Keyword argument `init` requires Julia 1.8 or later.

**Examples**


```julia
julia> extrema(sin, 0:π)
(0.0, 0.9092974268256817)

julia> extrema(sin, Real[]; init = (1.0, -1.0))  # good, since -1 ≤ sin(::Real) ≤ 1
(1.0, -1.0)
```
[source](https://github.com/JuliaLang/julia/blob/17cfb8e65ead377bf1b4598d8a9869144142c84e/base/reduce.jl#L820-L847)
```julia
extrema(A::AbstractArray; dims) -> Array{Tuple}
```
Compute the minimum and maximum elements of an array over the given dimensions.

See also: [`minimum`](https://docs.julialang.org/#Base.minimum), [`maximum`](https://docs.julialang.org/#Base.maximum), [`extrema!`](https://docs.julialang.org/#Base.extrema!).

**Examples**


```julia
julia> A = reshape(Vector(1:2:16), (2,2,2))
2×2×2 Array{Int64, 3}:
[:, :, 1] =
 1  5
 3  7

[:, :, 2] =
  9  13
 11  15

julia> extrema(A, dims = (1,2))
1×1×2 Array{Tuple{Int64, Int64}, 3}:
[:, :, 1] =
 (1, 7)

[:, :, 2] =
 (9, 15)
```
[source](https://github.com/JuliaLang/julia/blob/17cfb8e65ead377bf1b4598d8a9869144142c84e/base/reducedim.jl#L775-L802)
```julia
extrema(f, A::AbstractArray; dims) -> Array{Tuple}
```
Compute the minimum and maximum of `f` applied to each element in the given dimensions of `A`.

This method requires Julia 1.2 or later.

[source](https://github.com/JuliaLang/julia/blob/17cfb8e65ead377bf1b4598d8a9869144142c84e/base/reducedim.jl#L805-L813)
```julia
extrema!(r, A)
```
Compute the minimum and maximum value of `A` over the singleton dimensions of `r`, and write results to `r`.

This method requires Julia 1.8 or later.

**Examples**


```julia
julia> A = [1 2; 3 4]
2×2 Matrix{Int64}:
 1  2
 3  4

julia> extrema!([(1, 1); (1, 1)], A)
2-element Vector{Tuple{Int64, Int64}}:
 (1, 2)
 (3, 4)

julia> extrema!([(1, 1);; (1, 1)], A)
1×2 Matrix{Tuple{Int64, Int64}}:
 (1, 3)  (2, 4)
```
[source](https://github.com/JuliaLang/julia/blob/17cfb8e65ead377bf1b4598d8a9869144142c84e/base/reducedim.jl#L816-L840)
```julia
argmax(r::AbstractRange)
```
Ranges can have multiple maximal elements. In that case `argmax` will return a maximal index, but not necessarily the first one.

[source](https://github.com/JuliaLang/julia/blob/17cfb8e65ead377bf1b4598d8a9869144142c84e/base/range.jl#L847-L853)
```julia
argmax(f, domain)
```
Return a value `x` in the domain of `f` for which `f(x)` is maximised. If there are multiple maximal values for `f(x)` then the first one will be found.

`domain` must be a non-empty iterable.

Values are compared with `isless`.

This method requires Julia 1.7 or later.

See also [`argmin`](https://docs.julialang.org/#Base.argmin), [`findmax`](https://docs.julialang.org/#Base.findmax).

**Examples**


```julia
julia> argmax(abs, -10:5)
-10

julia> argmax(cos, 0:π/2:2π)
0.0
```
[source](https://github.com/JuliaLang/julia/blob/17cfb8e65ead377bf1b4598d8a9869144142c84e/base/reduce.jl#L980-L1003)
```julia
argmax(itr)
```
Return the index or key of the maximal element in a collection. If there are multiple maximal elements, then the first one will be returned.

The collection must not be empty.

Values are compared with `isless`.

See also: [`argmin`](https://docs.julialang.org/#Base.argmin), [`findmax`](https://docs.julialang.org/#Base.findmax).

**Examples**


```julia
julia> argmax([8, 0.1, -9, pi])
1

julia> argmax([1, 7, 7, 6])
2

julia> argmax([1, 7, 7, NaN])
4
```
[source](https://github.com/JuliaLang/julia/blob/17cfb8e65ead377bf1b4598d8a9869144142c84e/base/reduce.jl#L1006-L1029)
```julia
argmax(A; dims) -> indices
```
For an array input, return the indices of the maximum elements over the given dimensions. `NaN` is treated as greater than all other values except `missing`.

**Examples**


```julia
julia> A = [1.0 2; 3 4]
2×2 Matrix{Float64}:
 1.0  2.0
 3.0  4.0

julia> argmax(A, dims=1)
1×2 Matrix{CartesianIndex{2}}:
 CartesianIndex(2, 1)  CartesianIndex(2, 2)

julia> argmax(A, dims=2)
2×1 Matrix{CartesianIndex{2}}:
 CartesianIndex(1, 2)
 CartesianIndex(2, 2)
```
[source](https://github.com/JuliaLang/julia/blob/17cfb8e65ead377bf1b4598d8a9869144142c84e/base/reducedim.jl#L1201-L1223)
```julia
argmin(r::AbstractRange)
```
Ranges can have multiple minimal elements. In that case `argmin` will return a minimal index, but not necessarily the first one.

[source](https://github.com/JuliaLang/julia/blob/17cfb8e65ead377bf1b4598d8a9869144142c84e/base/range.jl#L830-L836)
```julia
argmin(f, domain)
```
Return a value `x` in the domain of `f` for which `f(x)` is minimised. If there are multiple minimal values for `f(x)` then the first one will be found.

`domain` must be a non-empty iterable.

`NaN` is treated as less than all other values except `missing`.

This method requires Julia 1.7 or later.

See also [`argmax`](https://docs.julialang.org/#Base.argmax), [`findmin`](https://docs.julialang.org/#Base.findmin).

**Examples**


```julia
julia> argmin(sign, -10:5)
-10

julia> argmin(x -> -x^3 + x^2 - 10, -5:5)
5

julia> argmin(acos, 0:0.1:1)
1.0
```
[source](https://github.com/JuliaLang/julia/blob/17cfb8e65ead377bf1b4598d8a9869144142c84e/base/reduce.jl#L1032-L1058)
```julia
argmin(itr)
```
Return the index or key of the minimal element in a collection. If there are multiple minimal elements, then the first one will be returned.

The collection must not be empty.

`NaN` is treated as less than all other values except `missing`.

See also: [`argmax`](https://docs.julialang.org/#Base.argmax), [`findmin`](https://docs.julialang.org/#Base.findmin).

**Examples**


```julia
julia> argmin([8, 0.1, -9, pi])
3

julia> argmin([7, 1, 1, 6])
2

julia> argmin([7, 1, 1, NaN])
4
```
[source](https://github.com/JuliaLang/julia/blob/17cfb8e65ead377bf1b4598d8a9869144142c84e/base/reduce.jl#L1061-L1084)
```julia
argmin(A; dims) -> indices
```
For an array input, return the indices of the minimum elements over the given dimensions. `NaN` is treated as less than all other values except `missing`.

**Examples**


```julia
julia> A = [1.0 2; 3 4]
2×2 Matrix{Float64}:
 1.0  2.0
 3.0  4.0

julia> argmin(A, dims=1)
1×2 Matrix{CartesianIndex{2}}:
 CartesianIndex(1, 1)  CartesianIndex(1, 2)

julia> argmin(A, dims=2)
2×1 Matrix{CartesianIndex{2}}:
 CartesianIndex(1, 1)
 CartesianIndex(2, 1)
```
[source](https://github.com/JuliaLang/julia/blob/17cfb8e65ead377bf1b4598d8a9869144142c84e/base/reducedim.jl#L1176-L1198)
```julia
findmax(f, domain) -> (f(x), index)
```
Returns a pair of a value in the codomain (outputs of `f`) and the index of the corresponding value in the `domain` (inputs to `f`) such that `f(x)` is maximised. If there are multiple maximal points, then the first one will be returned.

`domain` must be a non-empty iterable.

Values are compared with `isless`.

This method requires Julia 1.7 or later.

**Examples**


```julia
julia> findmax(identity, 5:9)
(9, 5)

julia> findmax(-, 1:10)
(-1, 1)

julia> findmax(first, [(1, :a), (3, :b), (3, :c)])
(3, 2)

julia> findmax(cos, 0:π/2:2π)
(1.0, 1)
```
[source](https://github.com/JuliaLang/julia/blob/17cfb8e65ead377bf1b4598d8a9869144142c84e/base/reduce.jl#L863-L892)
```julia
findmax(itr) -> (x, index)
```
Return the maximal element of the collection `itr` and its index or key. If there are multiple maximal elements, then the first one will be returned. Values are compared with `isless`.

See also: [`findmin`](https://docs.julialang.org/#Base.findmin), [`argmax`](https://docs.julialang.org/#Base.argmax), [`maximum`](https://docs.julialang.org/#Base.maximum).

**Examples**


```julia
julia> findmax([8, 0.1, -9, pi])
(8.0, 1)

julia> findmax([1, 7, 7, 6])
(7, 2)

julia> findmax([1, 7, 7, NaN])
(NaN, 4)
```
[source](https://github.com/JuliaLang/julia/blob/17cfb8e65ead377bf1b4598d8a9869144142c84e/base/reduce.jl#L896-L917)
```julia
findmax(A; dims) -> (maxval, index)
```
For an array input, returns the value and index of the maximum over the given dimensions. `NaN` is treated as greater than all other values except `missing`.

**Examples**


```julia
julia> A = [1.0 2; 3 4]
2×2 Matrix{Float64}:
 1.0  2.0
 3.0  4.0

julia> findmax(A, dims=1)
([3.0 4.0], CartesianIndex{2}[CartesianIndex(2, 1) CartesianIndex(2, 2)])

julia> findmax(A, dims=2)
([2.0; 4.0;;], CartesianIndex{2}[CartesianIndex(1, 2); CartesianIndex(2, 2);;])
```
[source](https://github.com/JuliaLang/julia/blob/17cfb8e65ead377bf1b4598d8a9869144142c84e/base/reducedim.jl#L1139-L1158)
```julia
findmin(f, domain) -> (f(x), index)
```
Returns a pair of a value in the codomain (outputs of `f`) and the index of the corresponding value in the `domain` (inputs to `f`) such that `f(x)` is minimised. If there are multiple minimal points, then the first one will be returned.

`domain` must be a non-empty iterable.

`NaN` is treated as less than all other values except `missing`.

This method requires Julia 1.7 or later.

**Examples**


```julia
julia> findmin(identity, 5:9)
(5, 1)

julia> findmin(-, 1:10)
(-10, 10)

julia> findmin(first, [(2, :a), (2, :b), (3, :c)])
(2, 1)

julia> findmin(cos, 0:π/2:2π)
(-1.0, 3)
```
[source](https://github.com/JuliaLang/julia/blob/17cfb8e65ead377bf1b4598d8a9869144142c84e/base/reduce.jl#L921-L951)
```julia
findmin(itr) -> (x, index)
```
Return the minimal element of the collection `itr` and its index or key. If there are multiple minimal elements, then the first one will be returned. `NaN` is treated as less than all other values except `missing`.

See also: [`findmax`](https://docs.julialang.org/#Base.findmax), [`argmin`](https://docs.julialang.org/#Base.argmin), [`minimum`](https://docs.julialang.org/#Base.minimum).

**Examples**


```julia
julia> findmin([8, 0.1, -9, pi])
(-9.0, 3)

julia> findmin([1, 7, 7, 6])
(1, 1)

julia> findmin([1, 7, 7, NaN])
(NaN, 4)
```
[source](https://github.com/JuliaLang/julia/blob/17cfb8e65ead377bf1b4598d8a9869144142c84e/base/reduce.jl#L955-L976)
```julia
findmin(A; dims) -> (minval, index)
```
For an array input, returns the value and index of the minimum over the given dimensions. `NaN` is treated as less than all other values except `missing`.

**Examples**


```julia
julia> A = [1.0 2; 3 4]
2×2 Matrix{Float64}:
 1.0  2.0
 3.0  4.0

julia> findmin(A, dims=1)
([1.0 2.0], CartesianIndex{2}[CartesianIndex(1, 1) CartesianIndex(1, 2)])

julia> findmin(A, dims=2)
([1.0; 3.0;;], CartesianIndex{2}[CartesianIndex(1, 1); CartesianIndex(2, 1);;])
```
[source](https://github.com/JuliaLang/julia/blob/17cfb8e65ead377bf1b4598d8a9869144142c84e/base/reducedim.jl#L1092-L1111)
```julia
findmax!(rval, rind, A) -> (maxval, index)
```
Find the maximum of `A` and the corresponding linear index along singleton dimensions of `rval` and `rind`, and store the results in `rval` and `rind`. `NaN` is treated as greater than all other values except `missing`.

[source](https://github.com/JuliaLang/julia/blob/17cfb8e65ead377bf1b4598d8a9869144142c84e/base/reducedim.jl#L1127-L1133)
```julia
findmin!(rval, rind, A) -> (minval, index)
```
Find the minimum of `A` and the corresponding linear index along singleton dimensions of `rval` and `rind`, and store the results in `rval` and `rind`. `NaN` is treated as less than all other values except `missing`.

[source](https://github.com/JuliaLang/julia/blob/17cfb8e65ead377bf1b4598d8a9869144142c84e/base/reducedim.jl#L1080-L1086)
```julia
sum(f, itr; [init])
```
Sum the results of calling function `f` on each element of `itr`.

The return type is `Int` for signed integers of less than system word size, and `UInt` for unsigned integers of less than system word size. For all other arguments, a common return type is found to which all arguments are promoted.

The value returned for empty `itr` can be specified by `init`. It must be the additive identity (i.e. zero) as it is unspecified whether `init` is used for non-empty collections.

Keyword argument `init` requires Julia 1.6 or later.

**Examples**


```julia
julia> sum(abs2, [2; 3; 4])
29
```
Note the important difference between `sum(A)` and `reduce(+, A)` for arrays with small integer eltype:


```julia
julia> sum(Int8[100, 28])
128

julia> reduce(+, Int8[100, 28])
-128
```
In the former case, the integers are widened to system word size and therefore the result is 128. In the latter case, no such widening happens and integer overflow results in -128.

[source](https://github.com/JuliaLang/julia/blob/17cfb8e65ead377bf1b4598d8a9869144142c84e/base/reduce.jl#L491-L527)
```julia
sum(itr; [init])
```
Returns the sum of all elements in a collection.

The return type is `Int` for signed integers of less than system word size, and `UInt` for unsigned integers of less than system word size. For all other arguments, a common return type is found to which all arguments are promoted.

The value returned for empty `itr` can be specified by `init`. It must be the additive identity (i.e. zero) as it is unspecified whether `init` is used for non-empty collections.

Keyword argument `init` requires Julia 1.6 or later.

See also: [`reduce`](https://docs.julialang.org/#Base.reduce-Tuple%7BAny,%20Any%7D), [`mapreduce`](https://docs.julialang.org/#Base.mapreduce-Tuple%7BAny,%20Any,%20Any%7D), [`count`](https://docs.julialang.org/#Base.count), [`union`](https://docs.julialang.org/#Base.union).

**Examples**


```julia
julia> sum(1:20)
210

julia> sum(1:20; init = 0.0)
210.0
```
[source](https://github.com/JuliaLang/julia/blob/17cfb8e65ead377bf1b4598d8a9869144142c84e/base/reduce.jl#L530-L556)
```julia
sum(A::AbstractArray; dims)
```
Sum elements of an array over the given dimensions.

**Examples**


```julia
julia> A = [1 2; 3 4]
2×2 Matrix{Int64}:
 1  2
 3  4

julia> sum(A, dims=1)
1×2 Matrix{Int64}:
 4  6

julia> sum(A, dims=2)
2×1 Matrix{Int64}:
 3
 7
```
[source](https://github.com/JuliaLang/julia/blob/17cfb8e65ead377bf1b4598d8a9869144142c84e/base/reducedim.jl#L475-L496)
```julia
sum(f, A::AbstractArray; dims)
```
Sum the results of calling function `f` on each element of an array over the given dimensions.

**Examples**


```julia
julia> A = [1 2; 3 4]
2×2 Matrix{Int64}:
 1  2
 3  4

julia> sum(abs2, A, dims=1)
1×2 Matrix{Int64}:
 10  20

julia> sum(abs2, A, dims=2)
2×1 Matrix{Int64}:
  5
 25
```
[source](https://github.com/JuliaLang/julia/blob/17cfb8e65ead377bf1b4598d8a9869144142c84e/base/reducedim.jl#L499-L521)
```julia
sum!(r, A)
```
Sum elements of `A` over the singleton dimensions of `r`, and write results to `r`.

**Examples**


```julia
julia> A = [1 2; 3 4]
2×2 Matrix{Int64}:
 1  2
 3  4

julia> sum!([1; 1], A)
2-element Vector{Int64}:
 3
 7

julia> sum!([1 1], A)
1×2 Matrix{Int64}:
 4  6
```
[source](https://github.com/JuliaLang/julia/blob/17cfb8e65ead377bf1b4598d8a9869144142c84e/base/reducedim.jl#L524-L545)
```julia
prod(f, itr; [init])
```
Returns the product of `f` applied to each element of `itr`.

The return type is `Int` for signed integers of less than system word size, and `UInt` for unsigned integers of less than system word size. For all other arguments, a common return type is found to which all arguments are promoted.

The value returned for empty `itr` can be specified by `init`. It must be the multiplicative identity (i.e. one) as it is unspecified whether `init` is used for non-empty collections.

Keyword argument `init` requires Julia 1.6 or later.

**Examples**


```julia
julia> prod(abs2, [2; 3; 4])
576
```
[source](https://github.com/JuliaLang/julia/blob/17cfb8e65ead377bf1b4598d8a9869144142c84e/base/reduce.jl#L562-L583)
```julia
prod(itr; [init])
```
Returns the product of all elements of a collection.

The return type is `Int` for signed integers of less than system word size, and `UInt` for unsigned integers of less than system word size. For all other arguments, a common return type is found to which all arguments are promoted.

The value returned for empty `itr` can be specified by `init`. It must be the multiplicative identity (i.e. one) as it is unspecified whether `init` is used for non-empty collections.

Keyword argument `init` requires Julia 1.6 or later.

See also: [`reduce`](https://docs.julialang.org/#Base.reduce-Tuple%7BAny,%20Any%7D), [`cumprod`](https://docs.julialang.org/../arrays/#Base.cumprod), [`any`](https://docs.julialang.org/#Base.any-Tuple%7BAny%7D).

**Examples**


```julia
julia> prod(1:5)
120

julia> prod(1:5; init = 1.0)
120.0
```
[source](https://github.com/JuliaLang/julia/blob/17cfb8e65ead377bf1b4598d8a9869144142c84e/base/reduce.jl#L586-L612)
```julia
prod(A::AbstractArray; dims)
```
Multiply elements of an array over the given dimensions.

**Examples**


```julia
julia> A = [1 2; 3 4]
2×2 Matrix{Int64}:
 1  2
 3  4

julia> prod(A, dims=1)
1×2 Matrix{Int64}:
 3  8

julia> prod(A, dims=2)
2×1 Matrix{Int64}:
  2
 12
```
[source](https://github.com/JuliaLang/julia/blob/17cfb8e65ead377bf1b4598d8a9869144142c84e/base/reducedim.jl#L548-L569)
```julia
prod(f, A::AbstractArray; dims)
```
Multiply the results of calling the function `f` on each element of an array over the given dimensions.

**Examples**


```julia
julia> A = [1 2; 3 4]
2×2 Matrix{Int64}:
 1  2
 3  4

julia> prod(abs2, A, dims=1)
1×2 Matrix{Int64}:
 9  64

julia> prod(abs2, A, dims=2)
2×1 Matrix{Int64}:
   4
 144
```
[source](https://github.com/JuliaLang/julia/blob/17cfb8e65ead377bf1b4598d8a9869144142c84e/base/reducedim.jl#L572-L594)
```julia
prod!(r, A)
```
Multiply elements of `A` over the singleton dimensions of `r`, and write results to `r`.

**Examples**


```julia
julia> A = [1 2; 3 4]
2×2 Matrix{Int64}:
 1  2
 3  4

julia> prod!([1; 1], A)
2-element Vector{Int64}:
  2
 12

julia> prod!([1 1], A)
1×2 Matrix{Int64}:
 3  8
```
[source](https://github.com/JuliaLang/julia/blob/17cfb8e65ead377bf1b4598d8a9869144142c84e/base/reducedim.jl#L597-L618)
```julia
any(itr) -> Bool
```
Test whether any elements of a boolean collection are `true`, returning `true` as soon as the first `true` value in `itr` is encountered (short-circuiting). To short-circuit on `false`, use [`all`](https://docs.julialang.org/#Base.all-Tuple%7BAny%7D).

If the input contains [`missing`](https://docs.julialang.org/../base/#Base.missing) values, return `missing` if all non-missing values are `false` (or equivalently, if the input contains no `true` value), following [three-valued logic](https://en.wikipedia.org/wiki/Three-valued_logic).

See also: [`all`](https://docs.julialang.org/#Base.all-Tuple%7BAny%7D), [`count`](https://docs.julialang.org/#Base.count), [`sum`](https://docs.julialang.org/#Base.sum), [`|`](https://docs.julialang.org/../math/#Base.:%7C), , [`||`](https://docs.julialang.org/../math/#%7C%7C).

**Examples**


```julia
julia> a = [true,false,false,true]
4-element Vector{Bool}:
 1
 0
 0
 1

julia> any(a)
true

julia> any((println(i); v) for (i, v) in enumerate(a))
1
true

julia> any([missing, true])
true

julia> any([false, missing])
missing
```
[source](https://github.com/JuliaLang/julia/blob/17cfb8e65ead377bf1b4598d8a9869144142c84e/base/reduce.jl#L1089-L1124)
```julia
any(p, itr) -> Bool
```
Determine whether predicate `p` returns `true` for any elements of `itr`, returning `true` as soon as the first item in `itr` for which `p` returns `true` is encountered (short-circuiting). To short-circuit on `false`, use [`all`](https://docs.julialang.org/#Base.all-Tuple%7BAny%7D).

If the input contains [`missing`](https://docs.julialang.org/../base/#Base.missing) values, return `missing` if all non-missing values are `false` (or equivalently, if the input contains no `true` value), following [three-valued logic](https://en.wikipedia.org/wiki/Three-valued_logic).

**Examples**


```julia
julia> any(i->(4<=i<=6), [3,5,7])
true

julia> any(i -> (println(i); i > 3), 1:10)
1
2
3
4
true

julia> any(i -> i > 0, [1, missing])
true

julia> any(i -> i > 0, [-1, missing])
missing

julia> any(i -> i > 0, [-1, 0])
false
```
[source](https://github.com/JuliaLang/julia/blob/17cfb8e65ead377bf1b4598d8a9869144142c84e/base/reduce.jl#L1166-L1198)
```julia
any!(r, A)
```
Test whether any values in `A` along the singleton dimensions of `r` are `true`, and write results to `r`.

**Examples**


```julia
julia> A = [true false; true false]
2×2 Matrix{Bool}:
 1  0
 1  0

julia> any!([1; 1], A)
2-element Vector{Int64}:
 1
 1

julia> any!([1 1], A)
1×2 Matrix{Int64}:
 1  0
```
[source](https://github.com/JuliaLang/julia/blob/17cfb8e65ead377bf1b4598d8a9869144142c84e/base/reducedim.jl#L963-L985)
```julia
all(itr) -> Bool
```
Test whether all elements of a boolean collection are `true`, returning `false` as soon as the first `false` value in `itr` is encountered (short-circuiting). To short-circuit on `true`, use [`any`](https://docs.julialang.org/#Base.any-Tuple%7BAny%7D).

If the input contains [`missing`](https://docs.julialang.org/../base/#Base.missing) values, return `missing` if all non-missing values are `true` (or equivalently, if the input contains no `false` value), following [three-valued logic](https://en.wikipedia.org/wiki/Three-valued_logic).

See also: [`all!`](https://docs.julialang.org/#Base.all!), [`any`](https://docs.julialang.org/#Base.any-Tuple%7BAny%7D), [`count`](https://docs.julialang.org/#Base.count), [`&`](https://docs.julialang.org/../math/#Base.:&), , [`&&`](https://docs.julialang.org/../math/#&&), [`allunique`](https://docs.julialang.org/#Base.allunique).

**Examples**


```julia
julia> a = [true,false,false,true]
4-element Vector{Bool}:
 1
 0
 0
 1

julia> all(a)
false

julia> all((println(i); v) for (i, v) in enumerate(a))
1
2
false

julia> all([missing, false])
false

julia> all([true, missing])
missing
```
[source](https://github.com/JuliaLang/julia/blob/17cfb8e65ead377bf1b4598d8a9869144142c84e/base/reduce.jl#L1127-L1163)
```julia
all(p, itr) -> Bool
```
Determine whether predicate `p` returns `true` for all elements of `itr`, returning `false` as soon as the first item in `itr` for which `p` returns `false` is encountered (short-circuiting). To short-circuit on `true`, use [`any`](https://docs.julialang.org/#Base.any-Tuple%7BAny%7D).

If the input contains [`missing`](https://docs.julialang.org/../base/#Base.missing) values, return `missing` if all non-missing values are `true` (or equivalently, if the input contains no `false` value), following [three-valued logic](https://en.wikipedia.org/wiki/Three-valued_logic).

**Examples**


```julia
julia> all(i->(4<=i<=6), [4,5,6])
true

julia> all(i -> (println(i); i < 3), 1:10)
1
2
3
false

julia> all(i -> i > 0, [1, missing])
missing

julia> all(i -> i > 0, [-1, missing])
false

julia> all(i -> i > 0, [1, 2])
true
```
[source](https://github.com/JuliaLang/julia/blob/17cfb8e65ead377bf1b4598d8a9869144142c84e/base/reduce.jl#L1214-L1245)
```julia
all!(r, A)
```
Test whether all values in `A` along the singleton dimensions of `r` are `true`, and write results to `r`.

**Examples**


```julia
julia> A = [true false; true false]
2×2 Matrix{Bool}:
 1  0
 1  0

julia> all!([1; 1], A)
2-element Vector{Int64}:
 0
 0

julia> all!([1 1], A)
1×2 Matrix{Int64}:
 1  0
```
[source](https://github.com/JuliaLang/julia/blob/17cfb8e65ead377bf1b4598d8a9869144142c84e/base/reducedim.jl#L891-L912)
```julia
count([f=identity,] itr; init=0) -> Integer
```
Count the number of elements in `itr` for which the function `f` returns `true`. If `f` is omitted, count the number of `true` elements in `itr` (which should be a collection of boolean values). `init` optionally specifies the value to start counting from and therefore also determines the output type.

`init` keyword was added in Julia 1.6.

See also: [`any`](https://docs.julialang.org/#Base.any-Tuple%7BAny%7D), [`sum`](https://docs.julialang.org/#Base.sum).

**Examples**


```julia
julia> count(i->(4<=i<=6), [2,3,4,5,6])
3

julia> count([true, false, true, true])
3

julia> count(>(3), 1:7, init=0x03)
0x07
```
[source](https://github.com/JuliaLang/julia/blob/17cfb8e65ead377bf1b4598d8a9869144142c84e/base/reduce.jl#L1268-L1292)
```julia
count(
    pattern::Union{AbstractChar,AbstractString,AbstractPattern},
    string::AbstractString;
    overlap::Bool = false,
)
```
Return the number of matches for `pattern` in `string`. This is equivalent to calling `length(findall(pattern, string))` but more efficient.

If `overlap=true`, the matching sequences are allowed to overlap indices in the original string, otherwise they must be from disjoint character ranges.

This method requires at least Julia 1.3.

Using a character as the pattern requires at least Julia 1.7.

[source](https://github.com/JuliaLang/julia/blob/17cfb8e65ead377bf1b4598d8a9869144142c84e/base/regex.jl#L506-L524)
```julia
count([f=identity,] A::AbstractArray; dims=:)
```
Count the number of elements in `A` for which `f` returns `true` over the given dimensions.

`dims` keyword was added in Julia 1.5.

`init` keyword was added in Julia 1.6.

**Examples**


```julia
julia> A = [1 2; 3 4]
2×2 Matrix{Int64}:
 1  2
 3  4

julia> count(<=(2), A, dims=1)
1×2 Matrix{Int64}:
 1  1

julia> count(<=(2), A, dims=2)
2×1 Matrix{Int64}:
 2
 0
```
[source](https://github.com/JuliaLang/julia/blob/17cfb8e65ead377bf1b4598d8a9869144142c84e/base/reducedim.jl#L410-L438)
```julia
foreach(f, c...) -> Nothing
```
Call function `f` on each element of iterable `c`. For multiple iterable arguments, `f` is called elementwise, and iteration stops when any iterator is finished.

`foreach` should be used instead of [`map`](https://docs.julialang.org/#Base.map) when the results of `f` are not needed, for example in `foreach(println, array)`.

**Examples**


```julia
julia> tri = 1:3:7; res = Int[];

julia> foreach(x -> push!(res, x^2), tri)

julia> res
3-element Vector{Int64}:
  1
 16
 49

julia> foreach((x, y) -> println(x, " with ", y), tri, 'a':'z')
1 with a
4 with b
7 with c
```
[source](https://github.com/JuliaLang/julia/blob/17cfb8e65ead377bf1b4598d8a9869144142c84e/base/abstractarray.jl#L2745-L2772)
```julia
map(f, c...) -> collection
```
Transform collection `c` by applying `f` to each element. For multiple collection arguments, apply `f` elementwise, and stop when when any of them is exhausted.

See also [`map!`](https://docs.julialang.org/#Base.map!), [`foreach`](https://docs.julialang.org/#Base.foreach), [`mapreduce`](https://docs.julialang.org/#Base.mapreduce-Tuple%7BAny,%20Any,%20Any%7D), [`mapslices`](https://docs.julialang.org/../arrays/#Base.mapslices), [`zip`](https://docs.julialang.org/../iterators/#Base.Iterators.zip), [`Iterators.map`](https://docs.julialang.org/../iterators/#Base.Iterators.map).

**Examples**


```julia
julia> map(x -> x * 2, [1, 2, 3])
3-element Vector{Int64}:
 2
 4
 6

julia> map(+, [1, 2, 3], [10, 20, 30, 400, 5000])
3-element Vector{Int64}:
 11
 22
 33
```
[source](https://github.com/JuliaLang/julia/blob/17cfb8e65ead377bf1b4598d8a9869144142c84e/base/abstractarray.jl#L2938-L2960)
```julia
map(f, A::AbstractArray...) -> N-array
```
When acting on multi-dimensional arrays of the same [`ndims`](https://docs.julialang.org/../arrays/#Base.ndims), they must all have the same [`axes`](https://docs.julialang.org/../arrays/#Base.axes-Tuple%7BAny%7D), and the answer will too.

See also [`broadcast`](https://docs.julialang.org/../arrays/#Base.Broadcast.broadcast), which allows mismatched sizes.

**Examples**


```julia
julia> map(//, [1 2; 3 4], [4 3; 2 1])
2×2 Matrix{Rational{Int64}}:
 1//4  2//3
 3//2  4//1

julia> map(+, [1 2; 3 4], zeros(2,1))
ERROR: DimensionMismatch

julia> map(+, [1 2; 3 4], [1,10,100,1000], zeros(3,1))  # iterates until 3rd is exhausted
3-element Vector{Float64}:
   2.0
  13.0
 102.0
```
[source](https://github.com/JuliaLang/julia/blob/17cfb8e65ead377bf1b4598d8a9869144142c84e/base/abstractarray.jl#L3030-L3054)
```julia
map!(function, destination, collection...)
```
Like [`map`](https://docs.julialang.org/#Base.map), but stores the result in `destination` rather than a new collection. `destination` must be at least as large as the smallest collection.

See also: [`map`](https://docs.julialang.org/#Base.map), [`foreach`](https://docs.julialang.org/#Base.foreach), [`zip`](https://docs.julialang.org/../iterators/#Base.Iterators.zip), [`copyto!`](https://docs.julialang.org/../c/#Base.copyto!).

**Examples**


```julia
julia> a = zeros(3);

julia> map!(x -> x * 2, a, [1, 2, 3]);

julia> a
3-element Vector{Float64}:
 2.0
 4.0
 6.0

julia> map!(+, zeros(Int, 5), 100:999, 1:3)
5-element Vector{Int64}:
 101
 103
 105
   0
   0
```
[source](https://github.com/JuliaLang/julia/blob/17cfb8e65ead377bf1b4598d8a9869144142c84e/base/abstractarray.jl#L2995-L3023)
```julia
map!(f, values(dict::AbstractDict))
```
Modifies `dict` by transforming each value from `val` to `f(val)`. Note that the type of `dict` cannot be changed: if `f(val)` is not an instance of the value type of `dict` then it will be converted to the value type if possible and otherwise raise an error.

`map!(f, values(dict::AbstractDict))` requires Julia 1.2 or later.

**Examples**


```julia
julia> d = Dict(:a => 1, :b => 2)
Dict{Symbol, Int64} with 2 entries:
  :a => 1
  :b => 2

julia> map!(v -> v-1, values(d))
ValueIterator for a Dict{Symbol, Int64} with 2 entries. Values:
  0
  1
```
[source](https://github.com/JuliaLang/julia/blob/17cfb8e65ead377bf1b4598d8a9869144142c84e/base/abstractdict.jl#L587-L609)
```julia
mapreduce(f, op, itrs...; [init])
```
Apply function `f` to each element(s) in `itrs`, and then reduce the result using the binary function `op`. If provided, `init` must be a neutral element for `op` that will be returned for empty collections. It is unspecified whether `init` is used for non-empty collections. In general, it will be necessary to provide `init` to work with empty collections.

[`mapreduce`](https://docs.julialang.org/#Base.mapreduce-Tuple%7BAny,%20Any,%20Any%7D) is functionally equivalent to calling `reduce(op, map(f, itr); init=init)`, but will in general execute faster since no intermediate collection needs to be created. See documentation for [`reduce`](https://docs.julialang.org/#Base.reduce-Tuple%7BAny,%20Any%7D) and [`map`](https://docs.julialang.org/#Base.map).

`mapreduce` with multiple iterators requires Julia 1.2 or later.

**Examples**


```julia
julia> mapreduce(x->x^2, +, [1:3;]) # == 1 + 4 + 9
14
```
The associativity of the reduction is implementation-dependent. Additionally, some implementations may reuse the return value of `f` for elements that appear multiple times in `itr`. Use [`mapfoldl`](https://docs.julialang.org/#Base.mapfoldl-Tuple%7BAny,%20Any,%20Any%7D) or [`mapfoldr`](https://docs.julialang.org/#Base.mapfoldr-Tuple%7BAny,%20Any,%20Any%7D) instead for guaranteed left or right associativity and invocation of `f` for every value.

[source](https://github.com/JuliaLang/julia/blob/17cfb8e65ead377bf1b4598d8a9869144142c84e/base/reduce.jl#L275-L301)
```julia
mapfoldl(f, op, itr; [init])
```
Like [`mapreduce`](https://docs.julialang.org/#Base.mapreduce-Tuple%7BAny,%20Any,%20Any%7D), but with guaranteed left associativity, as in [`foldl`](https://docs.julialang.org/#Base.foldl-Tuple%7BAny,%20Any%7D). If provided, the keyword argument `init` will be used exactly once. In general, it will be necessary to provide `init` to work with empty collections.

[source](https://github.com/JuliaLang/julia/blob/17cfb8e65ead377bf1b4598d8a9869144142c84e/base/reduce.jl#L163-L169)
```julia
mapfoldr(f, op, itr; [init])
```
Like [`mapreduce`](https://docs.julialang.org/#Base.mapreduce-Tuple%7BAny,%20Any,%20Any%7D), but with guaranteed right associativity, as in [`foldr`](https://docs.julialang.org/#Base.foldr-Tuple%7BAny,%20Any%7D). If provided, the keyword argument `init` will be used exactly once. In general, it will be necessary to provide `init` to work with empty collections.

[source](https://github.com/JuliaLang/julia/blob/17cfb8e65ead377bf1b4598d8a9869144142c84e/base/reduce.jl#L211-L217)
```julia
first(coll)
```
Get the first element of an iterable collection. Return the start point of an [`AbstractRange`](https://docs.julialang.org/#Base.AbstractRange) even if it is empty.

See also: [`only`](https://docs.julialang.org/../iterators/#Base.Iterators.only), [`firstindex`](https://docs.julialang.org/#Base.firstindex), [`last`](https://docs.julialang.org/#Base.last).

**Examples**


```julia
julia> first(2:2:10)
2

julia> first([1; 2; 3; 4])
1
```
[source](https://github.com/JuliaLang/julia/blob/17cfb8e65ead377bf1b4598d8a9869144142c84e/base/abstractarray.jl#L406-L422)
```julia
first(itr, n::Integer)
```
Get the first `n` elements of the iterable collection `itr`, or fewer elements if `itr` is not long enough.

See also: [`startswith`](https://docs.julialang.org/../strings/#Base.startswith), [`Iterators.take`](https://docs.julialang.org/../iterators/#Base.Iterators.take).

This method requires at least Julia 1.6.

**Examples**


```julia
julia> first(["foo", "bar", "qux"], 2)
2-element Vector{String}:
 "foo"
 "bar"

julia> first(1:6, 10)
1:6

julia> first(Bool[], 1)
Bool[]
```
[source](https://github.com/JuliaLang/julia/blob/17cfb8e65ead377bf1b4598d8a9869144142c84e/base/abstractarray.jl#L429-L453)
```julia
first(s::AbstractString, n::Integer)
```
Get a string consisting of the first `n` characters of `s`.

**Examples**


```julia
julia> first("∀ϵ≠0: ϵ²>0", 0)
""

julia> first("∀ϵ≠0: ϵ²>0", 1)
"∀"

julia> first("∀ϵ≠0: ϵ²>0", 3)
"∀ϵ≠"
```
[source](https://github.com/JuliaLang/julia/blob/17cfb8e65ead377bf1b4598d8a9869144142c84e/base/strings/basic.jl#L641-L657)
```julia
last(coll)
```
Get the last element of an ordered collection, if it can be computed in O(1) time. This is accomplished by calling [`lastindex`](https://docs.julialang.org/#Base.lastindex) to get the last index. Return the end point of an [`AbstractRange`](https://docs.julialang.org/#Base.AbstractRange) even if it is empty.

See also [`first`](https://docs.julialang.org/#Base.first), [`endswith`](https://docs.julialang.org/../strings/#Base.endswith).

**Examples**


```julia
julia> last(1:2:10)
9

julia> last([1; 2; 3; 4])
4
```
[source](https://github.com/JuliaLang/julia/blob/17cfb8e65ead377bf1b4598d8a9869144142c84e/base/abstractarray.jl#L461-L478)
```julia
last(itr, n::Integer)
```
Get the last `n` elements of the iterable collection `itr`, or fewer elements if `itr` is not long enough.

This method requires at least Julia 1.6.

**Examples**


```julia
julia> last(["foo", "bar", "qux"], 2)
2-element Vector{String}:
 "bar"
 "qux"

julia> last(1:6, 10)
1:6

julia> last(Float64[], 1)
Float64[]
```
[source](https://github.com/JuliaLang/julia/blob/17cfb8e65ead377bf1b4598d8a9869144142c84e/base/abstractarray.jl#L481-L503)
```julia
last(s::AbstractString, n::Integer)
```
Get a string consisting of the last `n` characters of `s`.

**Examples**


```julia
julia> last("∀ϵ≠0: ϵ²>0", 0)
""

julia> last("∀ϵ≠0: ϵ²>0", 1)
"0"

julia> last("∀ϵ≠0: ϵ²>0", 3)
"²>0"
```
[source](https://github.com/JuliaLang/julia/blob/17cfb8e65ead377bf1b4598d8a9869144142c84e/base/strings/basic.jl#L660-L676)
```julia
front(x::Tuple)::Tuple
```
Return a `Tuple` consisting of all but the last component of `x`.

See also: [`first`](https://docs.julialang.org/#Base.first), [`tail`](https://docs.julialang.org/#Base.tail).

**Examples**


```julia
julia> Base.front((1,2,3))
(1, 2)

julia> Base.front(())
ERROR: ArgumentError: Cannot call front on an empty tuple.
```
[source](https://github.com/JuliaLang/julia/blob/17cfb8e65ead377bf1b4598d8a9869144142c84e/base/tuple.jl#L190-L205)
```julia
tail(x::Tuple)::Tuple
```
Return a `Tuple` consisting of all but the first component of `x`.

See also: [`front`](https://docs.julialang.org/#Base.front), [`rest`](https://docs.julialang.org/#Base.rest), [`first`](https://docs.julialang.org/#Base.first), [`Iterators.peel`](https://docs.julialang.org/../iterators/#Base.Iterators.peel).

**Examples**


```julia
julia> Base.tail((1,2,3))
(2, 3)

julia> Base.tail(())
ERROR: ArgumentError: Cannot call tail on an empty tuple.
```
[source](https://github.com/JuliaLang/julia/blob/17cfb8e65ead377bf1b4598d8a9869144142c84e/base/essentials.jl#L235-L250)
```julia
step(r)
```
Get the step size of an [`AbstractRange`](https://docs.julialang.org/#Base.AbstractRange) object.

**Examples**


```julia
julia> step(1:10)
1

julia> step(1:2:10)
2

julia> step(2.5:0.3:10.9)
0.3

julia> step(range(2.5, stop=10.9, length=85))
0.1
```
[source](https://github.com/JuliaLang/julia/blob/17cfb8e65ead377bf1b4598d8a9869144142c84e/base/range.jl#L658-L677)
```julia
collect(collection)
```
Return an `Array` of all items in a collection or iterator. For dictionaries, returns `Pair{KeyType, ValType}`. If the argument is array-like or is an iterator with the [`HasShape`](https://docs.julialang.org/#Base.IteratorSize) trait, the result will have the same shape and number of dimensions as the argument.

Used by comprehensions to turn a generator into an `Array`.

**Examples**


```julia
julia> collect(1:2:13)
7-element Vector{Int64}:
  1
  3
  5
  7
  9
 11
 13

julia> [x^2 for x in 1:8 if isodd(x)]
4-element Vector{Int64}:
  1
  9
 25
 49
```
[source](https://github.com/JuliaLang/julia/blob/17cfb8e65ead377bf1b4598d8a9869144142c84e/base/array.jl#L682-L711)
```julia
collect(element_type, collection)
```
Return an `Array` with the given element type of all items in a collection or iterable. The result has the same shape and number of dimensions as `collection`.

**Examples**


```julia
julia> collect(Float64, 1:2:5)
3-element Vector{Float64}:
 1.0
 3.0
 5.0
```
[source](https://github.com/JuliaLang/julia/blob/17cfb8e65ead377bf1b4598d8a9869144142c84e/base/array.jl#L632-L646)
```julia
filter(f, a)
```
Return a copy of collection `a`, removing elements for which `f` is `false`. The function `f` is passed one argument.

Support for `a` as a tuple requires at least Julia 1.4.

See also: [`filter!`](https://docs.julialang.org/#Base.filter!), [`Iterators.filter`](https://docs.julialang.org/../iterators/#Base.Iterators.filter).

**Examples**


```julia
julia> a = 1:10
1:10

julia> filter(isodd, a)
5-element Vector{Int64}:
 1
 3
 5
 7
 9
```
[source](https://github.com/JuliaLang/julia/blob/17cfb8e65ead377bf1b4598d8a9869144142c84e/base/array.jl#L2509-L2533)
```julia
filter(f, d::AbstractDict)
```
Return a copy of `d`, removing elements for which `f` is `false`. The function `f` is passed `key=>value` pairs.

**Examples**


```julia
julia> d = Dict(1=>"a", 2=>"b")
Dict{Int64, String} with 2 entries:
  2 => "b"
  1 => "a"

julia> filter(p->isodd(p.first), d)
Dict{Int64, String} with 1 entry:
  1 => "a"
```
[source](https://github.com/JuliaLang/julia/blob/17cfb8e65ead377bf1b4598d8a9869144142c84e/base/abstractdict.jl#L450-L467)
```julia
filter(f, itr::SkipMissing{<:AbstractArray})
```
Return a vector similar to the array wrapped by the given `SkipMissing` iterator but with all missing elements and those for which `f` returns `false` removed.

This method requires Julia 1.2 or later.

**Examples**


```julia
julia> x = [1 2; missing 4]
2×2 Matrix{Union{Missing, Int64}}:
 1         2
  missing  4

julia> filter(isodd, skipmissing(x))
1-element Vector{Int64}:
 1
```
[source](https://github.com/JuliaLang/julia/blob/17cfb8e65ead377bf1b4598d8a9869144142c84e/base/missing.jl#L372-L392)
```julia
filter!(f, a)
```
Update collection `a`, removing elements for which `f` is `false`. The function `f` is passed one argument.

**Examples**


```julia
julia> filter!(isodd, Vector(1:10))
5-element Vector{Int64}:
 1
 3
 5
 7
 9
```
[source](https://github.com/JuliaLang/julia/blob/17cfb8e65ead377bf1b4598d8a9869144142c84e/base/array.jl#L2563-L2579)
```julia
filter!(f, d::AbstractDict)
```
Update `d`, removing elements for which `f` is `false`. The function `f` is passed `key=>value` pairs.

**Example**


```julia
julia> d = Dict(1=>"a", 2=>"b", 3=>"c")
Dict{Int64, String} with 3 entries:
  2 => "b"
  3 => "c"
  1 => "a"

julia> filter!(p->isodd(p.first), d)
Dict{Int64, String} with 2 entries:
  3 => "c"
  1 => "a"
```
[source](https://github.com/JuliaLang/julia/blob/17cfb8e65ead377bf1b4598d8a9869144142c84e/base/abstractdict.jl#L408-L427)
```julia
replace(A, old_new::Pair...; [count::Integer])
```
Return a copy of collection `A` where, for each pair `old=>new` in `old_new`, all occurrences of `old` are replaced by `new`. Equality is determined using [`isequal`](https://docs.julialang.org/../base/#Base.isequal). If `count` is specified, then replace at most `count` occurrences in total.

The element type of the result is chosen using promotion (see [`promote_type`](https://docs.julialang.org/../base/#Base.promote_type)) based on the element type of `A` and on the types of the `new` values in pairs. If `count` is omitted and the element type of `A` is a `Union`, the element type of the result will not include singleton types which are replaced with values of a different type: for example, `Union{T,Missing}` will become `T` if `missing` is replaced.

See also [`replace!`](https://docs.julialang.org/#Base.replace!), [`splice!`](https://docs.julialang.org/#Base.splice!), [`delete!`](https://docs.julialang.org/#Base.delete!), [`insert!`](https://docs.julialang.org/#Base.insert!).

Version 1.7 is required to replace elements of a `Tuple`.

**Examples**


```julia
julia> replace([1, 2, 1, 3], 1=>0, 2=>4, count=2)
4-element Vector{Int64}:
 0
 4
 1
 3

julia> replace([1, missing], missing=>0)
2-element Vector{Int64}:
 1
 0
```
[source](https://github.com/JuliaLang/julia/blob/17cfb8e65ead377bf1b4598d8a9869144142c84e/base/set.jl#L576-L610)
```julia
replace(new::Function, A; [count::Integer])
```
Return a copy of `A` where each value `x` in `A` is replaced by `new(x)`. If `count` is specified, then replace at most `count` values in total (replacements being defined as `new(x) !== x`).

Version 1.7 is required to replace elements of a `Tuple`.

**Examples**


```julia
julia> replace(x -> isodd(x) ? 2x : x, [1, 2, 3, 4])
4-element Vector{Int64}:
 2
 2
 6
 4

julia> replace(Dict(1=>2, 3=>4)) do kv
           first(kv) < 3 ? first(kv)=>3 : kv
       end
Dict{Int64, Int64} with 2 entries:
  3 => 4
  1 => 3
```
[source](https://github.com/JuliaLang/julia/blob/17cfb8e65ead377bf1b4598d8a9869144142c84e/base/set.jl#L637-L663)
```julia
replace!(A, old_new::Pair...; [count::Integer])
```
For each pair `old=>new` in `old_new`, replace all occurrences of `old` in collection `A` by `new`. Equality is determined using [`isequal`](https://docs.julialang.org/../base/#Base.isequal). If `count` is specified, then replace at most `count` occurrences in total. See also [`replace`](https://docs.julialang.org/#Base.replace-Tuple%7BAny,%20Vararg%7BPair%7D%7D).

**Examples**


```julia
julia> replace!([1, 2, 1, 3], 1=>0, 2=>4, count=2)
4-element Vector{Int64}:
 0
 4
 1
 3

julia> replace!(Set([1, 2, 3]), 1=>0)
Set{Int64} with 3 elements:
  0
  2
  3
```
[source](https://github.com/JuliaLang/julia/blob/17cfb8e65ead377bf1b4598d8a9869144142c84e/base/set.jl#L506-L530)
```julia
replace!(new::Function, A; [count::Integer])
```
Replace each element `x` in collection `A` by `new(x)`. If `count` is specified, then replace at most `count` values in total (replacements being defined as `new(x) !== x`).

**Examples**


```julia
julia> replace!(x -> isodd(x) ? 2x : x, [1, 2, 3, 4])
4-element Vector{Int64}:
 2
 2
 6
 4

julia> replace!(Dict(1=>2, 3=>4)) do kv
           first(kv) < 3 ? first(kv)=>3 : kv
       end
Dict{Int64, Int64} with 2 entries:
  3 => 4
  1 => 3

julia> replace!(x->2x, Set([3, 6]))
Set{Int64} with 2 elements:
  6
  12
```
[source](https://github.com/JuliaLang/julia/blob/17cfb8e65ead377bf1b4598d8a9869144142c84e/base/set.jl#L544-L572)
```julia
Base.rest(collection[, itr_state])
```
Generic function for taking the tail of `collection`, starting from a specific iteration state `itr_state`. Return a `Tuple`, if `collection` itself is a `Tuple`, a subtype of `AbstractVector`, if `collection` is an `AbstractArray`, a subtype of `AbstractString` if `collection` is an `AbstractString`, and an arbitrary iterator, falling back to `Iterators.rest(collection[, itr_state])`, otherwise.

Can be overloaded for user-defined collection types to customize the behavior of [slurping in assignments](https://docs.julialang.org/../../manual/functions/#destructuring-assignment), like `a, b... = collection`.

`Base.rest` requires at least Julia 1.6.

See also: [`first`](https://docs.julialang.org/#Base.first), [`Iterators.rest`](https://docs.julialang.org/../iterators/#Base.Iterators.rest).

**Examples**


```julia
julia> a = [1 2; 3 4]
2×2 Matrix{Int64}:
 1  2
 3  4

julia> first, state = iterate(a)
(1, 2)

julia> first, Base.rest(a, state)
(1, [3, 2, 4])
```
[source](https://github.com/JuliaLang/julia/blob/17cfb8e65ead377bf1b4598d8a9869144142c84e/base/tuple.jl#L101-L131)
```julia
getindex(collection, key...)
```
Retrieve the value(s) stored at the given key or index within a collection. The syntax `a[i,j,...]` is converted by the compiler to `getindex(a, i, j, ...)`.

See also [`get`](https://docs.julialang.org/#Base.get), [`keys`](https://docs.julialang.org/#Base.keys), [`eachindex`](https://docs.julialang.org/../arrays/#Base.eachindex).

**Examples**


```julia
julia> A = Dict("a" => 1, "b" => 2)
Dict{String, Int64} with 2 entries:
  "b" => 2
  "a" => 1

julia> getindex(A, "a")
1
```
[source](https://github.com/JuliaLang/julia/blob/17cfb8e65ead377bf1b4598d8a9869144142c84e/base/array.jl#L902-L920)
```julia
setindex!(collection, value, key...)
```
Store the given value at the given key or index within a collection. The syntax `a[i,j,...] = x` is converted by the compiler to `(setindex!(a, x, i, j, ...); x)`.

[source](https://github.com/JuliaLang/julia/blob/17cfb8e65ead377bf1b4598d8a9869144142c84e/base/array.jl#L958-L963)
```julia
firstindex(collection) -> Integer
firstindex(collection, d) -> Integer
```
Return the first index of `collection`. If `d` is given, return the first index of `collection` along dimension `d`.

The syntaxes `A[begin]` and `A[1, begin]` lower to `A[firstindex(A)]` and `A[1, firstindex(A, 2)]`, respectively.

See also: [`first`](https://docs.julialang.org/#Base.first), [`axes`](https://docs.julialang.org/../arrays/#Base.axes-Tuple%7BAny%7D), [`lastindex`](https://docs.julialang.org/#Base.lastindex), [`nextind`](https://docs.julialang.org/../strings/#Base.nextind).

**Examples**


```julia
julia> firstindex([1,2,4])
1

julia> firstindex(rand(3,4,5), 2)
1
```
[source](https://github.com/JuliaLang/julia/blob/17cfb8e65ead377bf1b4598d8a9869144142c84e/base/abstractarray.jl#L381-L400)
```julia
lastindex(collection) -> Integer
lastindex(collection, d) -> Integer
```
Return the last index of `collection`. If `d` is given, return the last index of `collection` along dimension `d`.

The syntaxes `A[end]` and `A[end, end]` lower to `A[lastindex(A)]` and `A[lastindex(A, 1), lastindex(A, 2)]`, respectively.

See also: [`axes`](https://docs.julialang.org/../arrays/#Base.axes-Tuple%7BAny%7D), [`firstindex`](https://docs.julialang.org/#Base.firstindex), [`eachindex`](https://docs.julialang.org/../arrays/#Base.eachindex), [`prevind`](https://docs.julialang.org/../strings/#Base.prevind).

**Examples**


```julia
julia> lastindex([1,2,4])
3

julia> lastindex(rand(3,4,5), 2)
4
```
[source](https://github.com/JuliaLang/julia/blob/17cfb8e65ead377bf1b4598d8a9869144142c84e/base/abstractarray.jl#L358-L377)Fully implemented by:

Partially implemented by:

[`Dict`](https://docs.julialang.org/#Base.Dict) is the standard dictionary. Its implementation uses [`hash`](https://docs.julialang.org/../base/#Base.hash) as the hashing function for the key, and [`isequal`](https://docs.julialang.org/../base/#Base.isequal) to determine equality. Define these two functions for custom types to override how they are stored in a hash table.

[`IdDict`](https://docs.julialang.org/#Base.IdDict) is a special hash table where the keys are always object identities.

[`WeakKeyDict`](https://docs.julialang.org/#Base.WeakKeyDict) is a hash table implementation where the keys are weak references to objects, and thus may be garbage collected even when referenced in a hash table. Like `Dict` it uses `hash` for hashing and `isequal` for equality, unlike `Dict` it does not convert keys on insertion.

[`Dict`](https://docs.julialang.org/#Base.Dict)s can be created by passing pair objects constructed with `=>` to a [`Dict`](https://docs.julialang.org/#Base.Dict) constructor: `Dict("A"=>1, "B"=>2)`. This call will attempt to infer type information from the keys and values (i.e. this example creates a `Dict{String, Int64}`). To explicitly specify types use the syntax `Dict{KeyType,ValueType}(...)`. For example, `Dict{String,Int32}("A"=>1, "B"=>2)`.

Dictionaries may also be created with generators. For example, `Dict(i => f(i) for i = 1:10)`.

Given a dictionary `D`, the syntax `D[x]` returns the value of key `x` (if it exists) or throws an error, and `D[x] = y` stores the key-value pair `x => y` in `D` (replacing any existing value for the key `x`). Multiple arguments to `D[...]` are converted to tuples; for example, the syntax `D[x,y]` is equivalent to `D[(x,y)]`, i.e. it refers to the value keyed by the tuple `(x,y)`.


```julia
AbstractDict{K, V}
```
Supertype for dictionary-like types with keys of type `K` and values of type `V`. [`Dict`](https://docs.julialang.org/#Base.Dict), [`IdDict`](https://docs.julialang.org/#Base.IdDict) and other types are subtypes of this. An `AbstractDict{K, V}` should be an iterator of `Pair{K, V}`.

[source](https://github.com/JuliaLang/julia/blob/17cfb8e65ead377bf1b4598d8a9869144142c84e/base/essentials.jl#L17-L23)
```julia
Dict([itr])
```
`Dict{K,V}()` constructs a hash table with keys of type `K` and values of type `V`. Keys are compared with [`isequal`](https://docs.julialang.org/../base/#Base.isequal) and hashed with [`hash`](https://docs.julialang.org/../base/#Base.hash).

Given a single iterable argument, constructs a [`Dict`](https://docs.julialang.org/#Base.Dict) whose key-value pairs are taken from 2-tuples `(key,value)` generated by the argument.

**Examples**


```julia
julia> Dict([("A", 1), ("B", 2)])
Dict{String, Int64} with 2 entries:
  "B" => 2
  "A" => 1
```
Alternatively, a sequence of pair arguments may be passed.


```julia
julia> Dict("A"=>1, "B"=>2)
Dict{String, Int64} with 2 entries:
  "B" => 2
  "A" => 1
```
[source](https://github.com/JuliaLang/julia/blob/17cfb8e65ead377bf1b4598d8a9869144142c84e/base/dict.jl#L52-L77)
```julia
IdDict([itr])
```
`IdDict{K,V}()` constructs a hash table using [`objectid`](https://docs.julialang.org/../base/#Base.objectid) as hash and `===` as equality with keys of type `K` and values of type `V`.

See [`Dict`](https://docs.julialang.org/#Base.Dict) for further help. In the example below, The `Dict` keys are all `isequal` and therefore get hashed the same, so they get overwritten. The `IdDict` hashes by object-id, and thus preserves the 3 different keys.

**Examples**


```julia
julia> Dict(true => "yes", 1 => "no", 1.0 => "maybe")
Dict{Real, String} with 1 entry:
  1.0 => "maybe"

julia> IdDict(true => "yes", 1 => "no", 1.0 => "maybe")
IdDict{Any, String} with 3 entries:
  true => "yes"
  1.0  => "maybe"
  1    => "no"
```
[source](https://github.com/JuliaLang/julia/blob/17cfb8e65ead377bf1b4598d8a9869144142c84e/base/iddict.jl#L3-L25)
```julia
WeakKeyDict([itr])
```
`WeakKeyDict()` constructs a hash table where the keys are weak references to objects which may be garbage collected even when referenced in a hash table.

See [`Dict`](https://docs.julialang.org/#Base.Dict) for further help. Note, unlike [`Dict`](https://docs.julialang.org/#Base.Dict), `WeakKeyDict` does not convert keys on insertion, as this would imply the key object was unreferenced anywhere before insertion.

[source](https://github.com/JuliaLang/julia/blob/17cfb8e65ead377bf1b4598d8a9869144142c84e/base/weakkeydict.jl#L5-L15)
```julia
ImmutableDict
```
`ImmutableDict` is a dictionary implemented as an immutable linked list, which is optimal for small dictionaries that are constructed over many individual insertions. Note that it is not possible to remove a value, although it can be partially overridden and hidden by inserting a new value with the same key.


```julia
ImmutableDict(KV::Pair)
```
Create a new entry in the `ImmutableDict` for a `key => value` pair

* use `(key => value) in dict` to see if this particular combination is in the properties set
* use `get(dict, key, default)` to retrieve the most recent value for a particular key
[source](https://github.com/JuliaLang/julia/blob/17cfb8e65ead377bf1b4598d8a9869144142c84e/base/dict.jl#L772-L787)
```julia
haskey(collection, key) -> Bool
```
Determine whether a collection has a mapping for a given `key`.

**Examples**


```julia
julia> D = Dict('a'=>2, 'b'=>3)
Dict{Char, Int64} with 2 entries:
  'a' => 2
  'b' => 3

julia> haskey(D, 'a')
true

julia> haskey(D, 'c')
false
```
[source](https://github.com/JuliaLang/julia/blob/17cfb8e65ead377bf1b4598d8a9869144142c84e/base/dict.jl#L550-L568)
```julia
get(collection, key, default)
```
Return the value stored for the given key, or the given default value if no mapping for the key is present.

For tuples and numbers, this function requires at least Julia 1.7.

**Examples**


```julia
julia> d = Dict("a"=>1, "b"=>2);

julia> get(d, "a", 3)
1

julia> get(d, "c", 3)
3
```
[source](https://github.com/JuliaLang/julia/blob/17cfb8e65ead377bf1b4598d8a9869144142c84e/base/dict.jl#L501-L520)
```julia
get(f::Function, collection, key)
```
Return the value stored for the given key, or if no mapping for the key is present, return `f()`. Use [`get!`](https://docs.julialang.org/#Base.get!) to also store the default value in the dictionary.

This is intended to be called using `do` block syntax


```julia
get(dict, key) do
    # default value calculated here
    time()
end
```
[source](https://github.com/JuliaLang/julia/blob/17cfb8e65ead377bf1b4598d8a9869144142c84e/base/dict.jl#L528-L542)
```julia
get!(collection, key, default)
```
Return the value stored for the given key, or if no mapping for the key is present, store `key => default`, and return `default`.

**Examples**


```julia
julia> d = Dict("a"=>1, "b"=>2, "c"=>3);

julia> get!(d, "a", 5)
1

julia> get!(d, "d", 4)
4

julia> d
Dict{String, Int64} with 4 entries:
  "c" => 3
  "b" => 2
  "a" => 1
  "d" => 4
```
[source](https://github.com/JuliaLang/julia/blob/17cfb8e65ead377bf1b4598d8a9869144142c84e/base/dict.jl#L412-L435)
```julia
get!(f::Function, collection, key)
```
Return the value stored for the given key, or if no mapping for the key is present, store `key => f()`, and return `f()`.

This is intended to be called using `do` block syntax.

**Examples**


```julia
julia> squares = Dict{Int, Int}();

julia> function get_square!(d, i)
           get!(d, i) do
               i^2
           end
       end
get_square! (generic function with 1 method)

julia> get_square!(squares, 2)
4

julia> squares
Dict{Int64, Int64} with 1 entry:
  2 => 4
```
[source](https://github.com/JuliaLang/julia/blob/17cfb8e65ead377bf1b4598d8a9869144142c84e/base/dict.jl#L438-L464)
```julia
getkey(collection, key, default)
```
Return the key matching argument `key` if one exists in `collection`, otherwise return `default`.

**Examples**


```julia
julia> D = Dict('a'=>2, 'b'=>3)
Dict{Char, Int64} with 2 entries:
  'a' => 2
  'b' => 3

julia> getkey(D, 'a', 1)
'a': ASCII/Unicode U+0061 (category Ll: Letter, lowercase)

julia> getkey(D, 'd', 'a')
'a': ASCII/Unicode U+0061 (category Ll: Letter, lowercase)
```
[source](https://github.com/JuliaLang/julia/blob/17cfb8e65ead377bf1b4598d8a9869144142c84e/base/dict.jl#L572-L590)
```julia
delete!(collection, key)
```
Delete the mapping for the given key in a collection, if any, and return the collection.

**Examples**


```julia
julia> d = Dict("a"=>1, "b"=>2)
Dict{String, Int64} with 2 entries:
  "b" => 2
  "a" => 1

julia> delete!(d, "b")
Dict{String, Int64} with 1 entry:
  "a" => 1

julia> delete!(d, "b") # d is left unchanged
Dict{String, Int64} with 1 entry:
  "a" => 1
```
[source](https://github.com/JuliaLang/julia/blob/17cfb8e65ead377bf1b4598d8a9869144142c84e/base/dict.jl#L655-L675)
```julia
pop!(collection, key[, default])
```
Delete and return the mapping for `key` if it exists in `collection`, otherwise return `default`, or throw an error if `default` is not specified.

**Examples**


```julia
julia> d = Dict("a"=>1, "b"=>2, "c"=>3);

julia> pop!(d, "a")
1

julia> pop!(d, "d")
ERROR: KeyError: key "d" not found
Stacktrace:
[...]

julia> pop!(d, "e", 4)
4
```
[source](https://github.com/JuliaLang/julia/blob/17cfb8e65ead377bf1b4598d8a9869144142c84e/base/dict.jl#L607-L628)
```julia
keys(iterator)
```
For an iterator or collection that has keys and values (e.g. arrays and dictionaries), return an iterator over the keys.

[source](https://github.com/JuliaLang/julia/blob/17cfb8e65ead377bf1b4598d8a9869144142c84e/base/abstractdict.jl#L73-L78)
```julia
values(iterator)
```
For an iterator or collection that has keys and values, return an iterator over the values. This function simply returns its argument by default, since the elements of a general iterator are normally considered its "values".

**Examples**


```julia
julia> d = Dict("a"=>1, "b"=>2);

julia> values(d)
ValueIterator for a Dict{String, Int64} with 2 entries. Values:
  2
  1

julia> values([2])
1-element Vector{Int64}:
 2
```
[source](https://github.com/JuliaLang/julia/blob/17cfb8e65ead377bf1b4598d8a9869144142c84e/base/essentials.jl#L791-L812)
```julia
values(a::AbstractDict)
```
Return an iterator over all values in a collection. `collect(values(a))` returns an array of values. When the values are stored internally in a hash table, as is the case for `Dict`, the order in which they are returned may vary. But `keys(a)` and `values(a)` both iterate `a` and return the elements in the same order.

**Examples**


```julia
julia> D = Dict('a'=>2, 'b'=>3)
Dict{Char, Int64} with 2 entries:
  'a' => 2
  'b' => 3

julia> collect(values(D))
2-element Vector{Int64}:
 2
 3
```
[source](https://github.com/JuliaLang/julia/blob/17cfb8e65ead377bf1b4598d8a9869144142c84e/base/abstractdict.jl#L107-L130)
```julia
pairs(IndexLinear(), A)
pairs(IndexCartesian(), A)
pairs(IndexStyle(A), A)
```
An iterator that accesses each element of the array `A`, returning `i => x`, where `i` is the index for the element and `x = A[i]`. Identical to `pairs(A)`, except that the style of index can be selected. Also similar to `enumerate(A)`, except `i` will be a valid index for `A`, while `enumerate` always counts from 1 regardless of the indices of `A`.

Specifying [`IndexLinear()`](https://docs.julialang.org/../arrays/#Base.IndexLinear) ensures that `i` will be an integer; specifying [`IndexCartesian()`](https://docs.julialang.org/../arrays/#Base.IndexCartesian) ensures that `i` will be a [`CartesianIndex`](https://docs.julialang.org/../arrays/#Base.IteratorsMD.CartesianIndex); specifying `IndexStyle(A)` chooses whichever has been defined as the native indexing style for array `A`.

Mutation of the bounds of the underlying array will invalidate this iterator.

**Examples**


```julia
julia> A = ["a" "d"; "b" "e"; "c" "f"];

julia> for (index, value) in pairs(IndexStyle(A), A)
           println("$index $value")
       end
1 a
2 b
3 c
4 d
5 e
6 f

julia> S = view(A, 1:2, :);

julia> for (index, value) in pairs(IndexStyle(S), S)
           println("$index $value")
       end
CartesianIndex(1, 1) a
CartesianIndex(2, 1) b
CartesianIndex(1, 2) d
CartesianIndex(2, 2) e
```
See also [`IndexStyle`](https://docs.julialang.org/../arrays/#Base.IndexStyle), [`axes`](../arrays/#Base.axes-Tuple%7BAny%7D).

[source](https://github.com/JuliaLang/julia/blob/17cfb8e65ead377bf1b4598d8a9869144142c84e/base/iterators.jl#L189-L234)
```julia
pairs(collection)
```
Return an iterator over `key => value` pairs for any collection that maps a set of keys to a set of values. This includes arrays, where the keys are the array indices.

**Examples**


```julia
julia> a = Dict(zip(["a", "b", "c"], [1, 2, 3]))
Dict{String, Int64} with 3 entries:
  "c" => 3
  "b" => 2
  "a" => 1

julia> pairs(a)
Dict{String, Int64} with 3 entries:
  "c" => 3
  "b" => 2
  "a" => 1

julia> foreach(println, pairs(["a", "b", "c"]))
1 => "a"
2 => "b"
3 => "c"

julia> (;a=1, b=2, c=3) |> pairs |> collect
3-element Vector{Pair{Symbol, Int64}}:
 :a => 1
 :b => 2
 :c => 3

julia> (;a=1, b=2, c=3) |> collect
3-element Vector{Int64}:
 1
 2
 3
```
[source](https://github.com/JuliaLang/julia/blob/17cfb8e65ead377bf1b4598d8a9869144142c84e/base/abstractdict.jl#L133-L171)
```julia
merge(d::AbstractDict, others::AbstractDict...)
```
Construct a merged collection from the given collections. If necessary, the types of the resulting collection will be promoted to accommodate the types of the merged collections. If the same key is present in another collection, the value for that key will be the value it has in the last collection listed. See also [`mergewith`](https://docs.julialang.org/#Base.mergewith) for custom handling of values with the same key.

**Examples**


```julia
julia> a = Dict("foo" => 0.0, "bar" => 42.0)
Dict{String, Float64} with 2 entries:
  "bar" => 42.0
  "foo" => 0.0

julia> b = Dict("baz" => 17, "bar" => 4711)
Dict{String, Int64} with 2 entries:
  "bar" => 4711
  "baz" => 17

julia> merge(a, b)
Dict{String, Float64} with 3 entries:
  "bar" => 4711.0
  "baz" => 17.0
  "foo" => 0.0

julia> merge(b, a)
Dict{String, Float64} with 3 entries:
  "bar" => 42.0
  "baz" => 17.0
  "foo" => 0.0
```
[source](https://github.com/JuliaLang/julia/blob/17cfb8e65ead377bf1b4598d8a9869144142c84e/base/abstractdict.jl#L316-L349)
```julia
merge(a::NamedTuple, bs::NamedTuple...)
```
Construct a new named tuple by merging two or more existing ones, in a left-associative manner. Merging proceeds left-to-right, between pairs of named tuples, and so the order of fields present in both the leftmost and rightmost named tuples take the same position as they are found in the leftmost named tuple. However, values are taken from matching fields in the rightmost named tuple that contains that field. Fields present in only the rightmost named tuple of a pair are appended at the end. A fallback is implemented for when only a single named tuple is supplied, with signature `merge(a::NamedTuple)`.

Merging 3 or more `NamedTuple` requires at least Julia 1.1.

**Examples**


```julia
julia> merge((a=1, b=2, c=3), (b=4, d=5))
(a = 1, b = 4, c = 3, d = 5)
```

```julia
julia> merge((a=1, b=2), (b=3, c=(d=1,)), (c=(d=2,),))
(a = 1, b = 3, c = (d = 2,))
```
[source](https://github.com/JuliaLang/julia/blob/17cfb8e65ead377bf1b4598d8a9869144142c84e/base/namedtuple.jl#L239-L263)
```julia
merge(a::NamedTuple, iterable)
```
Interpret an iterable of key-value pairs as a named tuple, and perform a merge.


```julia
julia> merge((a=1, b=2, c=3), [:b=>4, :d=>5])
(a = 1, b = 4, c = 3, d = 5)
```
[source](https://github.com/JuliaLang/julia/blob/17cfb8e65ead377bf1b4598d8a9869144142c84e/base/namedtuple.jl#L289-L298)
```julia
mergewith(combine, d::AbstractDict, others::AbstractDict...)
mergewith(combine)
merge(combine, d::AbstractDict, others::AbstractDict...)
```
Construct a merged collection from the given collections. If necessary, the types of the resulting collection will be promoted to accommodate the types of the merged collections. Values with the same key will be combined using the combiner function. The curried form `mergewith(combine)` returns the function `(args...) -> mergewith(combine, args...)`.

Method `merge(combine::Union{Function,Type}, args...)` as an alias of `mergewith(combine, args...)` is still available for backward compatibility.

`mergewith` requires Julia 1.5 or later.

**Examples**


```julia
julia> a = Dict("foo" => 0.0, "bar" => 42.0)
Dict{String, Float64} with 2 entries:
  "bar" => 42.0
  "foo" => 0.0

julia> b = Dict("baz" => 17, "bar" => 4711)
Dict{String, Int64} with 2 entries:
  "bar" => 4711
  "baz" => 17

julia> mergewith(+, a, b)
Dict{String, Float64} with 3 entries:
  "bar" => 4753.0
  "baz" => 17.0
  "foo" => 0.0

julia> ans == mergewith(+)(a, b)
true
```
[source](https://github.com/JuliaLang/julia/blob/17cfb8e65ead377bf1b4598d8a9869144142c84e/base/abstractdict.jl#L353-L391)
```julia
merge!(d::AbstractDict, others::AbstractDict...)
```
Update collection with pairs from the other collections. See also [`merge`](https://docs.julialang.org/#Base.merge).

**Examples**


```julia
julia> d1 = Dict(1 => 2, 3 => 4);

julia> d2 = Dict(1 => 4, 4 => 5);

julia> merge!(d1, d2);

julia> d1
Dict{Int64, Int64} with 3 entries:
  4 => 5
  3 => 4
  1 => 4
```
[source](https://github.com/JuliaLang/julia/blob/17cfb8e65ead377bf1b4598d8a9869144142c84e/base/abstractdict.jl#L197-L217)
```julia
mergewith!(combine, d::AbstractDict, others::AbstractDict...) -> d
mergewith!(combine)
merge!(combine, d::AbstractDict, others::AbstractDict...) -> d
```
Update collection with pairs from the other collections. Values with the same key will be combined using the combiner function. The curried form `mergewith!(combine)` returns the function `(args...) -> mergewith!(combine, args...)`.

Method `merge!(combine::Union{Function,Type}, args...)` as an alias of `mergewith!(combine, args...)` is still available for backward compatibility.

`mergewith!` requires Julia 1.5 or later.

**Examples**


```julia
julia> d1 = Dict(1 => 2, 3 => 4);

julia> d2 = Dict(1 => 4, 4 => 5);

julia> mergewith!(+, d1, d2);

julia> d1
Dict{Int64, Int64} with 3 entries:
  4 => 5
  3 => 4
  1 => 6

julia> mergewith!(-, d1, d1);

julia> d1
Dict{Int64, Int64} with 3 entries:
  4 => 0
  3 => 0
  1 => 0

julia> foldl(mergewith!(+), [d1, d2]; init=Dict{Int64, Int64}())
Dict{Int64, Int64} with 3 entries:
  4 => 5
  3 => 0
  1 => 4
```
[source](https://github.com/JuliaLang/julia/blob/17cfb8e65ead377bf1b4598d8a9869144142c84e/base/abstractdict.jl#L227-L272)
```julia
sizehint!(s, n)
```
Suggest that collection `s` reserve capacity for at least `n` elements. This can improve performance.

**Notes on the performance model**

For types that support `sizehint!`,

1. `push!` and `append!` methods generally may (but are not required to) preallocate extra storage. For types implemented in `Base`, they typically do, using a heuristic optimized for a general use case.
2. `sizehint!` may control this preallocation. Again, it typically does this for types in `Base`.
3. `empty!` is nearly costless (and O(1)) for types that support this kind of preallocation.
[source](https://github.com/JuliaLang/julia/blob/17cfb8e65ead377bf1b4598d8a9869144142c84e/base/array.jl#L1246-L1263)
```julia
keytype(T::Type{<:AbstractArray})
keytype(A::AbstractArray)
```
Return the key type of an array. This is equal to the `eltype` of the result of `keys(...)`, and is provided mainly for compatibility with the dictionary interface.

**Examples**


```julia
julia> keytype([1, 2, 3]) == Int
true

julia> keytype([1 2; 3 4])
CartesianIndex{2}
```
For arrays, this function requires at least Julia 1.2.

[source](https://github.com/JuliaLang/julia/blob/17cfb8e65ead377bf1b4598d8a9869144142c84e/base/abstractarray.jl#L135-L154)
```julia
keytype(type)
```
Get the key type of a dictionary type. Behaves similarly to [`eltype`](https://docs.julialang.org/#Base.eltype).

**Examples**


```julia
julia> keytype(Dict(Int32(1) => "foo"))
Int32
```
[source](https://github.com/JuliaLang/julia/blob/17cfb8e65ead377bf1b4598d8a9869144142c84e/base/abstractdict.jl#L288-L298)
```julia
valtype(T::Type{<:AbstractArray})
valtype(A::AbstractArray)
```
Return the value type of an array. This is identical to `eltype` and is provided mainly for compatibility with the dictionary interface.

**Examples**


```julia
julia> valtype(["one", "two", "three"])
String
```
For arrays, this function requires at least Julia 1.2.

[source](https://github.com/JuliaLang/julia/blob/17cfb8e65ead377bf1b4598d8a9869144142c84e/base/abstractarray.jl#L162-L177)
```julia
valtype(type)
```
Get the value type of a dictionary type. Behaves similarly to [`eltype`](https://docs.julialang.org/#Base.eltype).

**Examples**


```julia
julia> valtype(Dict(Int32(1) => "foo"))
String
```
[source](https://github.com/JuliaLang/julia/blob/17cfb8e65ead377bf1b4598d8a9869144142c84e/base/abstractdict.jl#L302-L312)Fully implemented by:

Partially implemented by:


```julia
AbstractSet{T}
```
Supertype for set-like types whose elements are of type `T`. [`Set`](https://docs.julialang.org/#Base.Set), [`BitSet`](https://docs.julialang.org/#Base.BitSet) and other types are subtypes of this.

[source](https://github.com/JuliaLang/julia/blob/17cfb8e65ead377bf1b4598d8a9869144142c84e/base/essentials.jl#L9-L14)
```julia
Set([itr])
```
Construct a [`Set`](https://docs.julialang.org/#Base.Set) of the values generated by the given iterable object, or an empty set. Should be used instead of [`BitSet`](https://docs.julialang.org/#Base.BitSet) for sparse integer sets, or for sets of arbitrary objects.

See also: [`push!`](https://docs.julialang.org/#Base.push!), [`empty!`](https://docs.julialang.org/#Base.empty!), [`union!`](https://docs.julialang.org/#Base.union!), [`in`](#Base.in).

[source](https://github.com/JuliaLang/julia/blob/17cfb8e65ead377bf1b4598d8a9869144142c84e/base/set.jl#L22-L30)
```julia
BitSet([itr])
```
Construct a sorted set of `Int`s generated by the given iterable object, or an empty set. Implemented as a bit string, and therefore designed for dense integer sets. If the set will be sparse (for example, holding a few very large integers), use [`Set`](https://docs.julialang.org/#Base.Set) instead.

[source](https://github.com/JuliaLang/julia/blob/17cfb8e65ead377bf1b4598d8a9869144142c84e/base/bitset.jl#L21-L28)
```julia
union(s, itrs...)
∪(s, itrs...)
```
Construct an object containing all distinct elements from all of the arguments.

The first argument controls what kind of container is returned. If this is an array, it maintains the order in which elements first appear.

Unicode `∪` can be typed by writing `cup` then pressing tab in the Julia REPL, and in many editors. This is an infix operator, allowing `s ∪ itr`.

See also [`unique`](https://docs.julialang.org/#Base.unique), [`intersect`](https://docs.julialang.org/#Base.intersect), [`isdisjoint`](https://docs.julialang.org/#Base.isdisjoint), [`vcat`](https://docs.julialang.org/../arrays/#Base.vcat), [`Iterators.flatten`](https://docs.julialang.org/../iterators/#Base.Iterators.flatten).

**Examples**


```julia
julia> union([1, 2], [3])
3-element Vector{Int64}:
 1
 2
 3

julia> union([4 2 3 4 4], 1:3, 3.0)
4-element Vector{Float64}:
 4.0
 2.0
 3.0
 1.0

julia> (0, 0.0) ∪ (-0.0, NaN)
3-element Vector{Real}:
   0
  -0.0
 NaN

julia> union(Set([1, 2]), 2:3)
Set{Int64} with 3 elements:
  2
  3
  1
```
[source](https://github.com/JuliaLang/julia/blob/17cfb8e65ead377bf1b4598d8a9869144142c84e/base/abstractset.jl#L13-L54)
```julia
union!(s::Union{AbstractSet,AbstractVector}, itrs...)
```
Construct the [`union`](https://docs.julialang.org/#Base.union) of passed in sets and overwrite `s` with the result. Maintain order with arrays.

**Examples**


```julia
julia> a = Set([3, 4, 5]);

julia> union!(a, 1:2:7);

julia> a
Set{Int64} with 5 elements:
  5
  4
  7
  3
  1
```
[source](https://github.com/JuliaLang/julia/blob/17cfb8e65ead377bf1b4598d8a9869144142c84e/base/abstractset.jl#L62-L82)
```julia
intersect(s, itrs...)
∩(s, itrs...)
```
Construct the set containing those elements which appear in all of the arguments.

The first argument controls what kind of container is returned. If this is an array, it maintains the order in which elements first appear.

Unicode `∩` can be typed by writing `cap` then pressing tab in the Julia REPL, and in many editors. This is an infix operator, allowing `s ∩ itr`.

See also [`setdiff`](https://docs.julialang.org/#Base.setdiff), [`isdisjoint`](https://docs.julialang.org/#Base.isdisjoint), [`issubset`](https://docs.julialang.org/#Base.issubset), [`issetequal`](https://docs.julialang.org/#Base.issetequal).

As of Julia 1.8 intersect returns a result with the eltype of the type-promoted eltypes of the two inputs

**Examples**


```julia
julia> intersect([1, 2, 3], [3, 4, 5])
1-element Vector{Int64}:
 3

julia> intersect([1, 4, 4, 5, 6], [6, 4, 6, 7, 8])
2-element Vector{Int64}:
 4
 6

julia> intersect(1:16, 7:99)
7:16

julia> (0, 0.0) ∩ (-0.0, 0)
1-element Vector{Real}:
 0

julia> intersect(Set([1, 2]), BitSet([2, 3]), 1.0:10.0)
Set{Float64} with 1 element:
  2.0
```
[source](https://github.com/JuliaLang/julia/blob/17cfb8e65ead377bf1b4598d8a9869144142c84e/base/abstractset.jl#L110-L150)
```julia
setdiff(s, itrs...)
```
Construct the set of elements in `s` but not in any of the iterables in `itrs`. Maintain order with arrays.

See also [`setdiff!`](https://docs.julialang.org/#Base.setdiff!), [`union`](https://docs.julialang.org/#Base.union) and [`intersect`](https://docs.julialang.org/#Base.intersect).

**Examples**


```julia
julia> setdiff([1,2,3], [3,4,5])
2-element Vector{Int64}:
 1
 2
```
[source](https://github.com/JuliaLang/julia/blob/17cfb8e65ead377bf1b4598d8a9869144142c84e/base/abstractset.jl#L196-L211)
```julia
setdiff!(s, itrs...)
```
Remove from set `s` (in-place) each element of each iterable from `itrs`. Maintain order with arrays.

**Examples**


```julia
julia> a = Set([1, 3, 4, 5]);

julia> setdiff!(a, 1:2:6);

julia> a
Set{Int64} with 1 element:
  4
```
[source](https://github.com/JuliaLang/julia/blob/17cfb8e65ead377bf1b4598d8a9869144142c84e/base/abstractset.jl#L215-L231)
```julia
symdiff(s, itrs...)
```
Construct the symmetric difference of elements in the passed in sets. When `s` is not an `AbstractSet`, the order is maintained. Note that in this case the multiplicity of elements matters.

See also [`symdiff!`](https://docs.julialang.org/#Base.symdiff!), [`setdiff`](https://docs.julialang.org/#Base.setdiff), [`union`](https://docs.julialang.org/#Base.union) and [`intersect`](https://docs.julialang.org/#Base.intersect).

**Examples**


```julia
julia> symdiff([1,2,3], [3,4,5], [4,5,6])
3-element Vector{Int64}:
 1
 2
 6

julia> symdiff([1,2,1], [2, 1, 2])
2-element Vector{Int64}:
 1
 2

julia> symdiff(unique([1,2,1]), unique([2, 1, 2]))
Int64[]
```
[source](https://github.com/JuliaLang/julia/blob/17cfb8e65ead377bf1b4598d8a9869144142c84e/base/abstractset.jl#L246-L271)
```julia
symdiff!(s::Union{AbstractSet,AbstractVector}, itrs...)
```
Construct the symmetric difference of the passed in sets, and overwrite `s` with the result. When `s` is an array, the order is maintained. Note that in this case the multiplicity of elements matters.

[source](https://github.com/JuliaLang/julia/blob/17cfb8e65ead377bf1b4598d8a9869144142c84e/base/abstractset.jl#L275-L281)
```julia
intersect!(s::Union{AbstractSet,AbstractVector}, itrs...)
```
Intersect all passed in sets and overwrite `s` with the result. Maintain order with arrays.

[source](https://github.com/JuliaLang/julia/blob/17cfb8e65ead377bf1b4598d8a9869144142c84e/base/abstractset.jl#L180-L185)
```julia
issubset(a, b) -> Bool
⊆(a, b) -> Bool
⊇(b, a) -> Bool
```
Determine whether every element of `a` is also in `b`, using [`in`](https://docs.julialang.org/#Base.in).

See also [`⊊`](https://docs.julialang.org/#Base.:%E2%8A%8A), [`⊈`](https://docs.julialang.org/#Base.:%E2%8A%88), [`∩`](https://docs.julialang.org/#Base.intersect), [`∪`](https://docs.julialang.org/#Base.union), [`contains`](https://docs.julialang.org/../strings/#Base.contains).

**Examples**


```julia
julia> issubset([1, 2], [1, 2, 3])
true

julia> [1, 2, 3] ⊆ [1, 2]
false

julia> [1, 2, 3] ⊇ [1, 2]
true
```
[source](https://github.com/JuliaLang/julia/blob/17cfb8e65ead377bf1b4598d8a9869144142c84e/base/abstractset.jl#L300-L320)
```julia
⊈(a, b) -> Bool
⊉(b, a) -> Bool
```
Negation of `⊆` and `⊇`, i.e. checks that `a` is not a subset of `b`.

See also [`issubset`](https://docs.julialang.org/#Base.issubset) (`⊆`), [`⊊`](https://docs.julialang.org/#Base.:%E2%8A%8A).

**Examples**


```julia
julia> (1, 2) ⊈ (2, 3)
true

julia> (1, 2) ⊈ (1, 2, 3)
false
```
[source](https://github.com/JuliaLang/julia/blob/17cfb8e65ead377bf1b4598d8a9869144142c84e/base/abstractset.jl#L390-L406)
```julia
⊊(a, b) -> Bool
⊋(b, a) -> Bool
```
Determines if `a` is a subset of, but not equal to, `b`.

See also [`issubset`](https://docs.julialang.org/#Base.issubset) (`⊆`), [`⊈`](https://docs.julialang.org/#Base.:%E2%8A%88).

**Examples**


```julia
julia> (1, 2) ⊊ (1, 2, 3)
true

julia> (1, 2) ⊊ (1, 2)
false
```
[source](https://github.com/JuliaLang/julia/blob/17cfb8e65ead377bf1b4598d8a9869144142c84e/base/abstractset.jl#L363-L379)
```julia
issetequal(a, b) -> Bool
```
Determine whether `a` and `b` have the same elements. Equivalent to `a ⊆ b && b ⊆ a` but more efficient when possible.

See also: [`isdisjoint`](https://docs.julialang.org/#Base.isdisjoint), [`union`](https://docs.julialang.org/#Base.union).

**Examples**


```julia
julia> issetequal([1, 2], [1, 2, 3])
false

julia> issetequal([1, 2], [2, 1])
true
```
[source](https://github.com/JuliaLang/julia/blob/17cfb8e65ead377bf1b4598d8a9869144142c84e/base/abstractset.jl#L414-L430)
```julia
isdisjoint(a, b) -> Bool
```
Determine whether the collections `a` and `b` are disjoint. Equivalent to `isempty(a ∩ b)` but more efficient when possible.

See also: [`intersect`](https://docs.julialang.org/#Base.intersect), [`isempty`](https://docs.julialang.org/#Base.isempty), [`issetequal`](https://docs.julialang.org/#Base.issetequal).

This function requires at least Julia 1.5.

**Examples**


```julia
julia> isdisjoint([1, 2], [2, 3, 4])
false

julia> isdisjoint([3, 1], [2, 4])
true
```
[source](https://github.com/JuliaLang/julia/blob/17cfb8e65ead377bf1b4598d8a9869144142c84e/base/abstractset.jl#L449-L468)Fully implemented by:

Partially implemented by:


```julia
push!(collection, items...) -> collection
```
Insert one or more `items` in `collection`. If `collection` is an ordered container, the items are inserted at the end (in the given order).

**Examples**


```julia
julia> push!([1, 2, 3], 4, 5, 6)
6-element Vector{Int64}:
 1
 2
 3
 4
 5
 6
```
If `collection` is ordered, use [`append!`](https://docs.julialang.org/#Base.append!) to add all the elements of another collection to it. The result of the preceding example is equivalent to `append!([1, 2, 3], [4, 5, 6])`. For `AbstractSet` objects, [`union!`](https://docs.julialang.org/#Base.union!) can be used instead.

See [`sizehint!`](https://docs.julialang.org/#Base.sizehint!) for notes about the performance model.

See also [`pushfirst!`](#Base.pushfirst!).

[source](https://github.com/JuliaLang/julia/blob/17cfb8e65ead377bf1b4598d8a9869144142c84e/base/array.jl#L1027-L1052)
```julia
pop!(collection) -> item
```
Remove an item in `collection` and return it. If `collection` is an ordered container, the last item is returned; for unordered containers, an arbitrary element is returned.

See also: [`popfirst!`](https://docs.julialang.org/#Base.popfirst!), [`popat!`](https://docs.julialang.org/#Base.popat!), [`delete!`](https://docs.julialang.org/#Base.delete!), [`deleteat!`](https://docs.julialang.org/#Base.deleteat!), [`splice!`](https://docs.julialang.org/#Base.splice!), and [`push!`](https://docs.julialang.org/#Base.push!).

**Examples**


```julia
julia> A=[1, 2, 3]
3-element Vector{Int64}:
 1
 2
 3

julia> pop!(A)
3

julia> A
2-element Vector{Int64}:
 1
 2

julia> S = Set([1, 2])
Set{Int64} with 2 elements:
  2
  1

julia> pop!(S)
2

julia> S
Set{Int64} with 1 element:
  1

julia> pop!(Dict(1=>2))
1 => 2
```
[source](https://github.com/JuliaLang/julia/blob/17cfb8e65ead377bf1b4598d8a9869144142c84e/base/array.jl#L1271-L1311)
```julia
pop!(collection, key[, default])
```
Delete and return the mapping for `key` if it exists in `collection`, otherwise return `default`, or throw an error if `default` is not specified.

**Examples**


```julia
julia> d = Dict("a"=>1, "b"=>2, "c"=>3);

julia> pop!(d, "a")
1

julia> pop!(d, "d")
ERROR: KeyError: key "d" not found
Stacktrace:
[...]

julia> pop!(d, "e", 4)
4
```
[source](https://github.com/JuliaLang/julia/blob/17cfb8e65ead377bf1b4598d8a9869144142c84e/base/dict.jl#L607-L628)
```julia
popat!(a::Vector, i::Integer, [default])
```
Remove the item at the given `i` and return it. Subsequent items are shifted to fill the resulting gap. When `i` is not a valid index for `a`, return `default`, or throw an error if `default` is not specified.

See also: [`pop!`](https://docs.julialang.org/#Base.pop!), [`popfirst!`](https://docs.julialang.org/#Base.popfirst!), [`deleteat!`](https://docs.julialang.org/#Base.deleteat!), [`splice!`](https://docs.julialang.org/#Base.splice!).

This function is available as of Julia 1.5.

**Examples**


```julia
julia> a = [4, 3, 2, 1]; popat!(a, 2)
3

julia> a
3-element Vector{Int64}:
 4
 2
 1

julia> popat!(a, 4, missing)
missing

julia> popat!(a, 4)
ERROR: BoundsError: attempt to access 3-element Vector{Int64} at index [4]
[...]
```
[source](https://github.com/JuliaLang/julia/blob/17cfb8e65ead377bf1b4598d8a9869144142c84e/base/array.jl#L1321-L1352)
```julia
pushfirst!(collection, items...) -> collection
```
Insert one or more `items` at the beginning of `collection`.

This function is called `unshift` in many other programming languages.

**Examples**


```julia
julia> pushfirst!([1, 2, 3, 4], 5, 6)
6-element Vector{Int64}:
 5
 6
 1
 2
 3
 4
```
[source](https://github.com/JuliaLang/julia/blob/17cfb8e65ead377bf1b4598d8a9869144142c84e/base/array.jl#L1369-L1387)
```julia
popfirst!(collection) -> item
```
Remove the first `item` from `collection`.

This function is called `shift` in many other programming languages.

See also: [`pop!`](https://docs.julialang.org/#Base.pop!), [`popat!`](https://docs.julialang.org/#Base.popat!), [`delete!`](https://docs.julialang.org/#Base.delete!).

**Examples**


```julia
julia> A = [1, 2, 3, 4, 5, 6]
6-element Vector{Int64}:
 1
 2
 3
 4
 5
 6

julia> popfirst!(A)
1

julia> A
5-element Vector{Int64}:
 2
 3
 4
 5
 6
```
[source](https://github.com/JuliaLang/julia/blob/17cfb8e65ead377bf1b4598d8a9869144142c84e/base/array.jl#L1395-L1426)
```julia
insert!(a::Vector, index::Integer, item)
```
Insert an `item` into `a` at the given `index`. `index` is the index of `item` in the resulting `a`.

See also: [`push!`](https://docs.julialang.org/#Base.push!), [`replace`](https://docs.julialang.org/#Base.replace-Tuple%7BAny,%20Vararg%7BPair%7D%7D), [`popat!`](https://docs.julialang.org/#Base.popat!), [`splice!`](https://docs.julialang.org/#Base.splice!).

**Examples**


```julia
julia> insert!(Any[1:6;], 3, "here")
7-element Vector{Any}:
 1
 2
  "here"
 3
 4
 5
 6
```
[source](https://github.com/JuliaLang/julia/blob/17cfb8e65ead377bf1b4598d8a9869144142c84e/base/array.jl#L1436-L1456)
```julia
deleteat!(a::Vector, i::Integer)
```
Remove the item at the given `i` and return the modified `a`. Subsequent items are shifted to fill the resulting gap.

See also: [`delete!`](https://docs.julialang.org/#Base.delete!), [`popat!`](https://docs.julialang.org/#Base.popat!), [`splice!`](https://docs.julialang.org/#Base.splice!).

**Examples**


```julia
julia> deleteat!([6, 5, 4, 3, 2, 1], 2)
5-element Vector{Int64}:
 6
 4
 3
 2
 1
```
[source](https://github.com/JuliaLang/julia/blob/17cfb8e65ead377bf1b4598d8a9869144142c84e/base/array.jl#L1466-L1484)
```julia
deleteat!(a::Vector, inds)
```
Remove the items at the indices given by `inds`, and return the modified `a`. Subsequent items are shifted to fill the resulting gap.

`inds` can be either an iterator or a collection of sorted and unique integer indices, or a boolean vector of the same length as `a` with `true` indicating entries to delete.

**Examples**


```julia
julia> deleteat!([6, 5, 4, 3, 2, 1], 1:2:5)
3-element Vector{Int64}:
 5
 3
 1

julia> deleteat!([6, 5, 4, 3, 2, 1], [true, false, true, false, true, false])
3-element Vector{Int64}:
 5
 3
 1

julia> deleteat!([6, 5, 4, 3, 2, 1], (2, 2))
ERROR: ArgumentError: indices must be unique and sorted
Stacktrace:
[...]
```
[source](https://github.com/JuliaLang/julia/blob/17cfb8e65ead377bf1b4598d8a9869144142c84e/base/array.jl#L1503-L1531)
```julia
keepat!(a::Vector, inds)
keepat!(a::BitVector, inds)
```
Remove the items at all the indices which are not given by `inds`, and return the modified `a`. Items which are kept are shifted to fill the resulting gaps.

`inds` must be an iterator of sorted and unique integer indices. See also [`deleteat!`](https://docs.julialang.org/#Base.deleteat!).

This function is available as of Julia 1.7.

**Examples**


```julia
julia> keepat!([6, 5, 4, 3, 2, 1], 1:2:5)
3-element Vector{Int64}:
 6
 4
 2
```
[source](https://github.com/JuliaLang/julia/blob/17cfb8e65ead377bf1b4598d8a9869144142c84e/base/array.jl#L2596-L2618)
```julia
keepat!(a::Vector, m::AbstractVector{Bool})
keepat!(a::BitVector, m::AbstractVector{Bool})
```
The in-place version of logical indexing `a = a[m]`. That is, `keepat!(a, m)` on vectors of equal length `a` and `m` will remove all elements from `a` for which `m` at the corresponding index is `false`.

**Examples**


```julia
julia> a = [:a, :b, :c];

julia> keepat!(a, [true, false, true])
2-element Vector{Symbol}:
 :a
 :c

julia> a
2-element Vector{Symbol}:
 :a
 :c
```
[source](https://github.com/JuliaLang/julia/blob/17cfb8e65ead377bf1b4598d8a9869144142c84e/base/array.jl#L2621-L2643)
```julia
splice!(a::Vector, index::Integer, [replacement]) -> item
```
Remove the item at the given index, and return the removed item. Subsequent items are shifted left to fill the resulting gap. If specified, replacement values from an ordered collection will be spliced in place of the removed item.

See also: [`replace`](https://docs.julialang.org/#Base.replace-Tuple%7BAny,%20Vararg%7BPair%7D%7D), [`delete!`](https://docs.julialang.org/#Base.delete!), [`deleteat!`](https://docs.julialang.org/#Base.deleteat!), [`pop!`](https://docs.julialang.org/#Base.pop!), [`popat!`](https://docs.julialang.org/#Base.popat!).

**Examples**


```julia
julia> A = [6, 5, 4, 3, 2, 1]; splice!(A, 5)
2

julia> A
5-element Vector{Int64}:
 6
 5
 4
 3
 1

julia> splice!(A, 5, -1)
1

julia> A
5-element Vector{Int64}:
  6
  5
  4
  3
 -1

julia> splice!(A, 1, [-1, -2, -3])
6

julia> A
7-element Vector{Int64}:
 -1
 -2
 -3
  5
  4
  3
 -1
```
To insert `replacement` before an index `n` without removing any items, use `splice!(collection, n:n-1, replacement)`.

[source](https://github.com/JuliaLang/julia/blob/17cfb8e65ead377bf1b4598d8a9869144142c84e/base/array.jl#L1604-L1654)
```julia
splice!(a::Vector, indices, [replacement]) -> items
```
Remove items at specified indices, and return a collection containing the removed items. Subsequent items are shifted left to fill the resulting gaps. If specified, replacement values from an ordered collection will be spliced in place of the removed items; in this case, `indices` must be a `AbstractUnitRange`.

To insert `replacement` before an index `n` without removing any items, use `splice!(collection, n:n-1, replacement)`.

Prior to Julia 1.5, `indices` must always be a `UnitRange`.

Prior to Julia 1.8, `indices` must be a `UnitRange` if splicing in replacement values.

**Examples**


```julia
julia> A = [-1, -2, -3, 5, 4, 3, -1]; splice!(A, 4:3, 2)
Int64[]

julia> A
8-element Vector{Int64}:
 -1
 -2
 -3
  2
  5
  4
  3
 -1
```
[source](https://github.com/JuliaLang/julia/blob/17cfb8e65ead377bf1b4598d8a9869144142c84e/base/array.jl#L1673-L1707)
```julia
resize!(a::Vector, n::Integer) -> Vector
```
Resize `a` to contain `n` elements. If `n` is smaller than the current collection length, the first `n` elements will be retained. If `n` is larger, the new elements are not guaranteed to be initialized.

**Examples**


```julia
julia> resize!([6, 5, 4, 3, 2, 1], 3)
3-element Vector{Int64}:
 6
 5
 4

julia> a = resize!([6, 5, 4, 3, 2, 1], 8);

julia> length(a)
8

julia> a[1:6]
6-element Vector{Int64}:
 6
 5
 4
 3
 2
 1
```
[source](https://github.com/JuliaLang/julia/blob/17cfb8e65ead377bf1b4598d8a9869144142c84e/base/array.jl#L1203-L1232)
```julia
append!(collection, collections...) -> collection.
```
For an ordered container `collection`, add the elements of each `collections` to the end of it.

Specifying multiple collections to be appended requires at least Julia 1.6.

**Examples**


```julia
julia> append!([1], [2, 3])
3-element Vector{Int64}:
 1
 2
 3

julia> append!([1, 2, 3], [4, 5], [6])
6-element Vector{Int64}:
 1
 2
 3
 4
 5
 6
```
Use [`push!`](https://docs.julialang.org/#Base.push!) to add individual items to `collection` which are not already themselves in another collection. The result of the preceding example is equivalent to `push!([1, 2, 3], 4, 5, 6)`.

See [`sizehint!`](https://docs.julialang.org/#Base.sizehint!) for notes about the performance model.

See also [`vcat`](https://docs.julialang.org/../arrays/#Base.vcat) for vectors, [`union!`](https://docs.julialang.org/#Base.union!) for sets, and [`prepend!`](https://docs.julialang.org/#Base.prepend!) and [`pushfirst!`](https://docs.julialang.org/#Base.pushfirst!) for the opposite order.

[source](https://github.com/JuliaLang/julia/blob/17cfb8e65ead377bf1b4598d8a9869144142c84e/base/array.jl#L1069-L1104)
```julia
prepend!(a::Vector, collections...) -> collection
```
Insert the elements of each `collections` to the beginning of `a`.

When `collections` specifies multiple collections, order is maintained: elements of `collections[1]` will appear leftmost in `a`, and so on.

Specifying multiple collections to be prepended requires at least Julia 1.6.

**Examples**


```julia
julia> prepend!([3], [1, 2])
3-element Vector{Int64}:
 1
 2
 3

julia> prepend!([6], [1, 2], [3, 4, 5])
6-element Vector{Int64}:
 1
 2
 3
 4
 5
 6
```
[source](https://github.com/JuliaLang/julia/blob/17cfb8e65ead377bf1b4598d8a9869144142c84e/base/array.jl#L1135-L1163)Fully implemented by:

* `Vector` (a.k.a. 1-dimensional [`Array`](https://docs.julialang.org/../arrays/#Core.Array))
* `BitVector` (a.k.a. 1-dimensional [`BitArray`](https://docs.julialang.org/../arrays/#Base.BitArray))


```julia
Pair(x, y)
x => y
```
Construct a `Pair` object with type `Pair{typeof(x), typeof(y)}`. The elements are stored in the fields `first` and `second`. They can also be accessed via iteration (but a `Pair` is treated as a single "scalar" for broadcasting operations).

See also [`Dict`](https://docs.julialang.org/#Base.Dict).

**Examples**


```julia
julia> p = "foo" => 7
"foo" => 7

julia> typeof(p)
Pair{String, Int64}

julia> p.first
"foo"

julia> for x in p
           println(x)
       end
foo
7
```
[source](https://github.com/JuliaLang/julia/blob/17cfb8e65ead377bf1b4598d8a9869144142c84e/base/pair.jl#L5-L32)
```julia
Iterators.Pairs(values, keys) <: AbstractDict{eltype(keys), eltype(values)}
```
Transforms an indexable container into a Dictionary-view of the same data. Modifying the key-space of the underlying data may invalidate this object.

[source](https://github.com/JuliaLang/julia/blob/17cfb8e65ead377bf1b4598d8a9869144142c84e/base/essentials.jl#L26-L31)


