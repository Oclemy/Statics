
```julia
Threads.@threads [schedule] for ... end
```
A macro to execute a `for` loop in parallel. The iteration space is distributed to coarse-grained tasks. This policy can be specified by the `schedule` argument. The execution of the loop waits for the evaluation of all iterations.

See also: [`@spawn`](https://docs.julialang.org/#Base.Threads.@spawn) and `pmap` in [`Distributed`](https://docs.julialang.org/../../stdlib/Distributed/#man-distributed).

**Extended help**

**Semantics**

Unless stronger guarantees are specified by the scheduling option, the loop executed by `@threads` macro have the following semantics.

The `@threads` macro executes the loop body in an unspecified order and potentially concurrently. It does not specify the exact assignments of the tasks and the worker threads. The assignments can be different for each execution. The loop body code (including any code transitively called from it) must not make any assumptions about the distribution of iterations to tasks or the worker thread in which they are executed. The loop body for each iteration must be able to make forward progress independent of other iterations and be free from data races. As such, invalid synchronizations across iterations may deadlock while unsynchronized memory accesses may result in undefined behavior.

For example, the above conditions imply that:

* The lock taken in an iteration *must* be released within the same iteration.
* Communicating between iterations using blocking primitives like `Channel`s is incorrect.
* Write only to locations not shared across iterations (unless a lock or atomic operation is used).
* The value of [`threadid()`](https://docs.julialang.org/#Base.Threads.threadid) may change even within a single iteration.

**Schedulers**

Without the scheduler argument, the exact scheduling is unspecified and varies across Julia releases. Currently, `:dynamic` is used when the scheduler is not specified.

The `schedule` argument is available as of Julia 1.5.

**`:dynamic` (default)**

`:dynamic` scheduler executes iterations dynamically to available worker threads. Current implementation assumes that the workload for each iteration is uniform. However, this assumption may be removed in the future.

This scheduling option is merely a hint to the underlying execution mechanism. However, a few properties can be expected. The number of `Task`s used by `:dynamic` scheduler is bounded by a small constant multiple of the number of available worker threads ([`nthreads()`](https://docs.julialang.org/#Base.Threads.nthreads)). Each task processes contiguous regions of the iteration space. Thus, `@threads :dynamic for x in xs; f(x); end` is typically more efficient than `@sync for x in xs; @spawn f(x); end` if `length(xs)` is significantly larger than the number of the worker threads and the run-time of `f(x)` is relatively smaller than the cost of spawning and synchronizaing a task (typically less than 10 microseconds).

The `:dynamic` option for the `schedule` argument is available and the default as of Julia 1.8.

**`:static`**

`:static` scheduler creates one task per thread and divides the iterations equally among them, assigning each task specifically to each thread. In particular, the value of [`threadid()`](https://docs.julialang.org/#Base.Threads.threadid) is guranteed to be constant within one iteration. Specifying `:static` is an error if used from inside another `@threads` loop or from a thread other than 1.

`:static` scheduling exists for supporting transition of code written before Julia 1.3. In newly written library functions, `:static` scheduling is discouraged because the functions using this option cannot be called from arbitrary worker threads.

**Example**

To illustrate of the different scheduling strategies, consider the following function `busywait` containing a non-yielding timed loop that runs for a given number of seconds.


```julia
julia> function busywait(seconds)
            tstart = time_ns()
            while (time_ns() - tstart) / 1e9 < seconds
            end
        end

julia> @time begin
            Threads.@spawn busywait(5)
            Threads.@threads :static for i in 1:Threads.nthreads()
                busywait(1)
            end
        end
6.003001 seconds (16.33 k allocations: 899.255 KiB, 0.25% compilation time)

julia> @time begin
            Threads.@spawn busywait(5)
            Threads.@threads :dynamic for i in 1:Threads.nthreads()
                busywait(1)
            end
        end
2.012056 seconds (16.05 k allocations: 883.919 KiB, 0.66% compilation time)
```
The `:dynamic` example takes 2 seconds since one of the non-occupied threads is able to run two of the 1-second iterations to complete the for loop.

[source](https://github.com/JuliaLang/julia/blob/17cfb8e65ead377bf1b4598d8a9869144142c84e/base/threadingconstructs.jl#L99-L205)
```julia
Threads.foreach(f, channel::Channel;
                schedule::Threads.AbstractSchedule=Threads.FairSchedule(),
                ntasks=Threads.nthreads())
```
Similar to `foreach(f, channel)`, but iteration over `channel` and calls to `f` are split across `ntasks` tasks spawned by `Threads.@spawn`. This function will wait for all internally spawned tasks to complete before returning.

If `schedule isa FairSchedule`, `Threads.foreach` will attempt to spawn tasks in a manner that enables Julia's scheduler to more freely load-balance work items across threads. This approach generally has higher per-item overhead, but may perform better than `StaticSchedule` in concurrence with other multithreaded workloads.

If `schedule isa StaticSchedule`, `Threads.foreach` will spawn tasks in a manner that incurs lower per-item overhead than `FairSchedule`, but is less amenable to load-balancing. This approach thus may be more suitable for fine-grained, uniform workloads, but may perform worse than `FairSchedule` in concurrence with other multithreaded workloads.

This function requires Julia 1.6 or later.

[source](https://github.com/JuliaLang/julia/blob/17cfb8e65ead377bf1b4598d8a9869144142c84e/base/threads_overloads.jl#L3-L25)
```julia
Threads.@spawn expr
```
Create a [`Task`](https://docs.julialang.org/../parallel/#Core.Task) and [`schedule`](https://docs.julialang.org/../parallel/#Base.schedule) it to run on any available thread. The task is allocated to a thread after it becomes available. To wait for the task to finish, call [`wait`](https://docs.julialang.org/../parallel/#Base.wait) on the result of this macro, or call [`fetch`](https://docs.julialang.org/../parallel/#Base.fetch-Tuple%7BTask%7D) to wait and then obtain its return value.

Values can be interpolated into `@spawn` via `$`, which copies the value directly into the constructed underlying closure. This allows you to insert the *value* of a variable, isolating the asynchronous code from changes to the variable's value in the current task.

See the manual chapter on threading for important caveats.

This macro is available as of Julia 1.3.

Interpolating values via `$` is available as of Julia 1.4.

[source](https://github.com/JuliaLang/julia/blob/17cfb8e65ead377bf1b4598d8a9869144142c84e/base/threadingconstructs.jl#L234-L254)
```julia
Threads.threadid()
```
Get the ID number of the current thread of execution. The master thread has ID `1`.

[source](https://github.com/JuliaLang/julia/blob/17cfb8e65ead377bf1b4598d8a9869144142c84e/base/threadingconstructs.jl#L5-L9)
```julia
Threads.nthreads()
```
Get the number of threads available to the Julia process. This is the inclusive upper bound on [`threadid()`](https://docs.julialang.org/#Base.Threads.threadid).

See also: `BLAS.get_num_threads` and `BLAS.set_num_threads` in the [`LinearAlgebra`](https://docs.julialang.org/../../stdlib/LinearAlgebra/#man-linalg) standard library, and `nprocs()` in the [`Distributed`](https://docs.julialang.org/../../stdlib/Distributed/#man-distributed) standard library.

[source](https://github.com/JuliaLang/julia/blob/17cfb8e65ead377bf1b4598d8a9869144142c84e/base/threadingconstructs.jl#L13-L22)See also [Multi-Threading](https://docs.julialang.org/../../manual/multi-threading/#man-multithreading).


```julia
@atomic var
@atomic order ex
```
Mark `var` or `ex` as being performed atomically, if `ex` is a supported expression.


```julia
@atomic a.b.x = new
@atomic a.b.x += addend
@atomic :release a.b.x = new
@atomic :acquire_release a.b.x += addend
```
Perform the store operation expressed on the right atomically and return the new value.

With `=`, this operation translates to a `setproperty!(a.b, :x, new)` call. With any operator also, this operation translates to a `modifyproperty!(a.b, :x, +, addend)[2]` call.


```julia
@atomic a.b.x max arg2
@atomic a.b.x + arg2
@atomic max(a.b.x, arg2)
@atomic :acquire_release max(a.b.x, arg2)
@atomic :acquire_release a.b.x + arg2
@atomic :acquire_release a.b.x max arg2
```
Perform the binary operation expressed on the right atomically. Store the result into the field in the first argument and return the values `(old, new)`.

This operation translates to a `modifyproperty!(a.b, :x, func, arg2)` call.

See [Per-field atomics](https://docs.julialang.org/../../manual/multi-threading/#man-atomics) section in the manual for more details.


```julia
julia> mutable struct Atomic{T}; @atomic x::T; end

julia> a = Atomic(1)
Atomic{Int64}(1)

julia> @atomic a.x # fetch field x of a, with sequential consistency
1

julia> @atomic :sequentially_consistent a.x = 2 # set field x of a, with sequential consistency
2

julia> @atomic a.x += 1 # increment field x of a, with sequential consistency
3

julia> @atomic a.x + 1 # increment field x of a, with sequential consistency
3 => 4

julia> @atomic a.x # fetch field x of a, with sequential consistency
4

julia> @atomic max(a.x, 10) # change field x of a to the max value, with sequential consistency
4 => 10

julia> @atomic a.x max 5 # again change field x of a to the max value, with sequential consistency
10 => 10
```
This functionality requires at least Julia 1.7.

[source](https://github.com/JuliaLang/julia/blob/17cfb8e65ead377bf1b4598d8a9869144142c84e/base/expr.jl#L859-L922)
```julia
@atomicswap a.b.x = new
@atomicswap :sequentially_consistent a.b.x = new
```
Stores `new` into `a.b.x` and returns the old value of `a.b.x`.

This operation translates to a `swapproperty!(a.b, :x, new)` call.

See [Per-field atomics](https://docs.julialang.org/../../manual/multi-threading/#man-atomics) section in the manual for more details.


```julia
julia> mutable struct Atomic{T}; @atomic x::T; end

julia> a = Atomic(1)
Atomic{Int64}(1)

julia> @atomicswap a.x = 2+2 # replace field x of a with 4, with sequential consistency
1

julia> @atomic a.x # fetch field x of a, with sequential consistency
4
```
This functionality requires at least Julia 1.7.

[source](https://github.com/JuliaLang/julia/blob/17cfb8e65ead377bf1b4598d8a9869144142c84e/base/expr.jl#L981-L1006)
```julia
@atomicreplace a.b.x expected => desired
@atomicreplace :sequentially_consistent a.b.x expected => desired
@atomicreplace :sequentially_consistent :monotonic a.b.x expected => desired
```
Perform the conditional replacement expressed by the pair atomically, returning the values `(old, success::Bool)`. Where `success` indicates whether the replacement was completed.

This operation translates to a `replaceproperty!(a.b, :x, expected, desired)` call.

See [Per-field atomics](https://docs.julialang.org/../../manual/multi-threading/#man-atomics) section in the manual for more details.


```julia
julia> mutable struct Atomic{T}; @atomic x::T; end

julia> a = Atomic(1)
Atomic{Int64}(1)

julia> @atomicreplace a.x 1 => 2 # replace field x of a with 2 if it was 1, with sequential consistency
(old = 1, success = true)

julia> @atomic a.x # fetch field x of a, with sequential consistency
2

julia> @atomicreplace a.x 1 => 2 # replace field x of a with 2 if it was 1, with sequential consistency
(old = 2, success = false)

julia> xchg = 2 => 0; # replace field x of a with 0 if it was 1, with sequential consistency

julia> @atomicreplace a.x xchg
(old = 2, success = true)

julia> @atomic a.x # fetch field x of a, with sequential consistency
0
```
This functionality requires at least Julia 1.7.

[source](https://github.com/JuliaLang/julia/blob/17cfb8e65ead377bf1b4598d8a9869144142c84e/base/expr.jl#L1024-L1063)The following APIs are fairly primitive, and will likely be exposed through an `unsafe_*`-like wrapper.


```julia
Core.Intrinsics.atomic_pointerref(pointer::Ptr{T}, order::Symbol) --> T
Core.Intrinsics.atomic_pointerset(pointer::Ptr{T}, new::T, order::Symbol) --> pointer
Core.Intrinsics.atomic_pointerswap(pointer::Ptr{T}, new::T, order::Symbol) --> old
Core.Intrinsics.atomic_pointermodify(pointer::Ptr{T}, function::(old::T,arg::S)->T, arg::S, order::Symbol) --> old
Core.Intrinsics.atomic_pointerreplace(pointer::Ptr{T}, expected::Any, new::T, success_order::Symbol, failure_order::Symbol) --> (old, cmp)
```
The following APIs are deprecated, though support for them is likely to remain for several releases.


```julia
Threads.Atomic{T}
```
Holds a reference to an object of type `T`, ensuring that it is only accessed atomically, i.e. in a thread-safe manner.

Only certain "simple" types can be used atomically, namely the primitive boolean, integer, and float-point types. These are `Bool`, `Int8`...`Int128`, `UInt8`...`UInt128`, and `Float16`...`Float64`.

New atomic objects can be created from a non-atomic values; if none is specified, the atomic object is initialized with zero.

Atomic objects can be accessed using the `[]` notation:

**Examples**


```julia
julia> x = Threads.Atomic{Int}(3)
Base.Threads.Atomic{Int64}(3)

julia> x[] = 1
1

julia> x[]
1
```
Atomic operations use an `atomic_` prefix, such as [`atomic_add!`](https://docs.julialang.org/#Base.Threads.atomic_add!), [`atomic_xchg!`](https://docs.julialang.org/#Base.Threads.atomic_xchg!), etc.

[source](https://github.com/JuliaLang/julia/blob/17cfb8e65ead377bf1b4598d8a9869144142c84e/base/atomics.jl#L45-L74)
```julia
Threads.atomic_cas!(x::Atomic{T}, cmp::T, newval::T) where T
```
Atomically compare-and-set `x`

Atomically compares the value in `x` with `cmp`. If equal, write `newval` to `x`. Otherwise, leaves `x` unmodified. Returns the old value in `x`. By comparing the returned value to `cmp` (via `===`) one knows whether `x` was modified and now holds the new value `newval`.

For further details, see LLVM's `cmpxchg` instruction.

This function can be used to implement transactional semantics. Before the transaction, one records the value in `x`. After the transaction, the new value is stored only if `x` has not been modified in the mean time.

**Examples**


```julia
julia> x = Threads.Atomic{Int}(3)
Base.Threads.Atomic{Int64}(3)

julia> Threads.atomic_cas!(x, 4, 2);

julia> x
Base.Threads.Atomic{Int64}(3)

julia> Threads.atomic_cas!(x, 3, 2);

julia> x
Base.Threads.Atomic{Int64}(2)
```
[source](https://github.com/JuliaLang/julia/blob/17cfb8e65ead377bf1b4598d8a9869144142c84e/base/atomics.jl#L83-L115)
```julia
Threads.atomic_xchg!(x::Atomic{T}, newval::T) where T
```
Atomically exchange the value in `x`

Atomically exchanges the value in `x` with `newval`. Returns the **old** value.

For further details, see LLVM's `atomicrmw xchg` instruction.

**Examples**


```julia
julia> x = Threads.Atomic{Int}(3)
Base.Threads.Atomic{Int64}(3)

julia> Threads.atomic_xchg!(x, 2)
3

julia> x[]
2
```
[source](https://github.com/JuliaLang/julia/blob/17cfb8e65ead377bf1b4598d8a9869144142c84e/base/atomics.jl#L118-L139)
```julia
Threads.atomic_add!(x::Atomic{T}, val::T) where T <: ArithmeticTypes
```
Atomically add `val` to `x`

Performs `x[] += val` atomically. Returns the **old** value. Not defined for `Atomic{Bool}`.

For further details, see LLVM's `atomicrmw add` instruction.

**Examples**


```julia
julia> x = Threads.Atomic{Int}(3)
Base.Threads.Atomic{Int64}(3)

julia> Threads.atomic_add!(x, 2)
3

julia> x[]
5
```
[source](https://github.com/JuliaLang/julia/blob/17cfb8e65ead377bf1b4598d8a9869144142c84e/base/atomics.jl#L142-L163)
```julia
Threads.atomic_sub!(x::Atomic{T}, val::T) where T <: ArithmeticTypes
```
Atomically subtract `val` from `x`

Performs `x[] -= val` atomically. Returns the **old** value. Not defined for `Atomic{Bool}`.

For further details, see LLVM's `atomicrmw sub` instruction.

**Examples**


```julia
julia> x = Threads.Atomic{Int}(3)
Base.Threads.Atomic{Int64}(3)

julia> Threads.atomic_sub!(x, 2)
3

julia> x[]
1
```
[source](https://github.com/JuliaLang/julia/blob/17cfb8e65ead377bf1b4598d8a9869144142c84e/base/atomics.jl#L166-L187)
```julia
Threads.atomic_and!(x::Atomic{T}, val::T) where T
```
Atomically bitwise-and `x` with `val`

Performs `x[] &= val` atomically. Returns the **old** value.

For further details, see LLVM's `atomicrmw and` instruction.

**Examples**


```julia
julia> x = Threads.Atomic{Int}(3)
Base.Threads.Atomic{Int64}(3)

julia> Threads.atomic_and!(x, 2)
3

julia> x[]
2
```
[source](https://github.com/JuliaLang/julia/blob/17cfb8e65ead377bf1b4598d8a9869144142c84e/base/atomics.jl#L190-L210)
```julia
Threads.atomic_nand!(x::Atomic{T}, val::T) where T
```
Atomically bitwise-nand (not-and) `x` with `val`

Performs `x[] = ~(x[] & val)` atomically. Returns the **old** value.

For further details, see LLVM's `atomicrmw nand` instruction.

**Examples**


```julia
julia> x = Threads.Atomic{Int}(3)
Base.Threads.Atomic{Int64}(3)

julia> Threads.atomic_nand!(x, 2)
3

julia> x[]
-3
```
[source](https://github.com/JuliaLang/julia/blob/17cfb8e65ead377bf1b4598d8a9869144142c84e/base/atomics.jl#L213-L233)
```julia
Threads.atomic_or!(x::Atomic{T}, val::T) where T
```
Atomically bitwise-or `x` with `val`

Performs `x[] |= val` atomically. Returns the **old** value.

For further details, see LLVM's `atomicrmw or` instruction.

**Examples**


```julia
julia> x = Threads.Atomic{Int}(5)
Base.Threads.Atomic{Int64}(5)

julia> Threads.atomic_or!(x, 7)
5

julia> x[]
7
```
[source](https://github.com/JuliaLang/julia/blob/17cfb8e65ead377bf1b4598d8a9869144142c84e/base/atomics.jl#L236-L256)
```julia
Threads.atomic_xor!(x::Atomic{T}, val::T) where T
```
Atomically bitwise-xor (exclusive-or) `x` with `val`

Performs `x[] $= val` atomically. Returns the **old** value.

For further details, see LLVM's `atomicrmw xor` instruction.

**Examples**


```julia
julia> x = Threads.Atomic{Int}(5)
Base.Threads.Atomic{Int64}(5)

julia> Threads.atomic_xor!(x, 7)
5

julia> x[]
2
```
[source](https://github.com/JuliaLang/julia/blob/17cfb8e65ead377bf1b4598d8a9869144142c84e/base/atomics.jl#L259-L279)
```julia
Threads.atomic_max!(x::Atomic{T}, val::T) where T
```
Atomically store the maximum of `x` and `val` in `x`

Performs `x[] = max(x[], val)` atomically. Returns the **old** value.

For further details, see LLVM's `atomicrmw max` instruction.

**Examples**


```julia
julia> x = Threads.Atomic{Int}(5)
Base.Threads.Atomic{Int64}(5)

julia> Threads.atomic_max!(x, 7)
5

julia> x[]
7
```
[source](https://github.com/JuliaLang/julia/blob/17cfb8e65ead377bf1b4598d8a9869144142c84e/base/atomics.jl#L282-L302)
```julia
Threads.atomic_min!(x::Atomic{T}, val::T) where T
```
Atomically store the minimum of `x` and `val` in `x`

Performs `x[] = min(x[], val)` atomically. Returns the **old** value.

For further details, see LLVM's `atomicrmw min` instruction.

**Examples**


```julia
julia> x = Threads.Atomic{Int}(7)
Base.Threads.Atomic{Int64}(7)

julia> Threads.atomic_min!(x, 5)
7

julia> x[]
5
```
[source](https://github.com/JuliaLang/julia/blob/17cfb8e65ead377bf1b4598d8a9869144142c84e/base/atomics.jl#L305-L325)
```julia
Threads.atomic_fence()
```
Insert a sequential-consistency memory fence

Inserts a memory fence with sequentially-consistent ordering semantics. There are algorithms where this is needed, i.e. where an acquire/release ordering is insufficient.

This is likely a very expensive operation. Given that all other atomic operations in Julia already have acquire/release semantics, explicit fences should not be necessary in most cases.

For further details, see LLVM's `fence` instruction.

[source](https://github.com/JuliaLang/julia/blob/17cfb8e65ead377bf1b4598d8a9869144142c84e/base/atomics.jl#L443-L457)
```julia
@threadcall((cfunc, clib), rettype, (argtypes...), argvals...)
```
The `@threadcall` macro is called in the same way as [`ccall`](https://docs.julialang.org/../c/#ccall) but does the work in a different thread. This is useful when you want to call a blocking C function without causing the main `julia` thread to become blocked. Concurrency is limited by size of the libuv thread pool, which defaults to 4 threads but can be increased by setting the `UV_THREADPOOL_SIZE` environment variable and restarting the `julia` process.

Note that the called function should never call back into Julia.

[source](https://github.com/JuliaLang/julia/blob/17cfb8e65ead377bf1b4598d8a9869144142c84e/base/threadcall.jl#L7-L18)These building blocks are used to create the regular synchronization objects.


```julia
SpinLock()
```
Create a non-reentrant, test-and-test-and-set spin lock. Recursive use will result in a deadlock. This kind of lock should only be used around code that takes little time to execute and does not block (e.g. perform I/O). In general, [`ReentrantLock`](https://docs.julialang.org/../parallel/#Base.ReentrantLock) should be used instead.

Each [`lock`](https://docs.julialang.org/../parallel/#Base.lock) must be matched with an [`unlock`](https://docs.julialang.org/../parallel/#Base.unlock).

Test-and-test-and-set spin locks are quickest up to about 30ish contending threads. If you have more contention than that, different synchronization approaches should be considered.

[source](https://github.com/JuliaLang/julia/blob/17cfb8e65ead377bf1b4598d8a9869144142c84e/base/locks-mt.jl#L14-L28)


