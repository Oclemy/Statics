There are two main approaches to CPU profiling julia code:

Where profiling is enabled for a given call via the `@profile` macro.


```julia
julia> using Profile

julia> @profile foo()

julia> Profile.print()
Overhead ╎ [+additional indent] Count File:Line; Function
=========================================================
    ╎147  @Base/client.jl:506; _start()
        ╎ 147  @Base/client.jl:318; exec_options(opts::Base.JLOptions)
...
```
Tasks that are already running can also be profiled for a fixed time period at any user-triggered time.

To trigger the profiling:

* MacOS & FreeBSD (BSD-based platforms): Use `ctrl-t` or pass a `SIGINFO` signal to the julia process i.e. `% kill -INFO $julia_pid`
* Linux: Pass a `SIGUSR1` signal to the julia process i.e. `% kill -USR1 $julia_pid`
* Windows: Not currently supported.

First, a single stack trace at the instant that the signal was thrown is shown, then a 1 second profile is collected, followed by the profile report at the next yield point, which may be at task completion for code without yield points e.g. tight loops.


```julia
julia> foo()
##== the user sends a trigger while foo is running ==##
load: 2.53  cmd: julia 88903 running 6.16u 0.97s

======================================================================================
Information request received. A stacktrace will print followed by a 1.0 second profile
======================================================================================

signal (29): Information request: 29
__psynch_cvwait at /usr/lib/system/libsystem_kernel.dylib (unknown line)
_pthread_cond_wait at /usr/lib/system/libsystem_pthread.dylib (unknown line)
...

======================================================================
Profile collected. A report will print if the Profile module is loaded
======================================================================

Overhead ╎ [+additional indent] Count File:Line; Function
=========================================================
Thread 1 Task 0x000000011687c010 Total snapshots: 572. Utilization: 100%
   ╎147 @Base/client.jl:506; _start()
       ╎ 147 @Base/client.jl:318; exec_options(opts::Base.JLOptions)
...

Thread 2 Task 0x0000000116960010 Total snapshots: 572. Utilization: 0%
   ╎572 @Base/task.jl:587; task_done_hook(t::Task)
      ╎ 572 @Base/task.jl:879; wait()
...
```
The duration of the profiling can be adjusted via [`Profile.set_peek_duration`](https://docs.julialang.org/#Profile.set_peek_duration)

The profile report is broken down by thread and task. Pass a no-arg function to `Profile.peek_report[]` to override this. i.e. `Profile.peek_report[] = () -> Profile.print()` to remove any grouping. This could also be overridden by an external profile data consumer.


```julia
@profile
```
`@profile <expression>` runs your expression while taking periodic backtraces. These are appended to an internal buffer of backtraces.

The methods in `Profile` are not exported and need to be called e.g. as `Profile.print()`.


```julia
clear()
```
Clear any existing backtraces from the internal buffer.


```julia
print([io::IO = stdout,] [data::Vector = fetch()], [lidict::Union{LineInfoDict, LineInfoFlatDict} = getdict(data)]; kwargs...)
```
Prints profiling results to `io` (by default, `stdout`). If you do not supply a `data` vector, the internal buffer of accumulated backtraces will be used.

The keyword arguments can be any combination of:

* `format` – Determines whether backtraces are printed with (default, `:tree`) or without (`:flat`) indentation indicating tree structure.
* `C` – If `true`, backtraces from C and Fortran code are shown (normally they are excluded).
* `combine` – If `true` (default), instruction pointers are merged that correspond to the same line of code.
* `maxdepth` – Limits the depth higher than `maxdepth` in the `:tree` format.
* `sortedby` – Controls the order in `:flat` format. `:filefuncline` (default) sorts by the source line, `:count` sorts in order of number of collected samples, and `:overhead` sorts by the number of samples incurred by each function by itself.
* `groupby` – Controls grouping over tasks and threads, or no grouping. Options are `:none` (default), `:thread`, `:task`, `[:thread, :task]`, or `[:task, :thread]` where the last two provide nested grouping.
* `noisefloor` – Limits frames that exceed the heuristic noise floor of the sample (only applies to format `:tree`). A suggested value to try for this is 2.0 (the default is 0). This parameter hides samples for which `n <= noisefloor * √N`, where `n` is the number of samples on this line, and `N` is the number of samples for the callee.
* `mincount` – Limits the printout to only those lines with at least `mincount` occurrences.
* `recur` – Controls the recursion handling in `:tree` format. `:off` (default) prints the tree as normal. `:flat` instead compresses any recursion (by ip), showing the approximate effect of converting any self-recursion into an iterator. `:flatc` does the same but also includes collapsing of C frames (may do odd things around `jl_apply`).
* `threads::Union{Int,AbstractVector{Int}}` – Specify which threads to include snapshots from in the report. Note that this does not control which threads samples are collected on (which may also have been collected on another machine).
* `tasks::Union{Int,AbstractVector{Int}}` – Specify which tasks to include snapshots from in the report. Note that this does not control which tasks samples are collected within.

```julia
print([io::IO = stdout,] data::Vector, lidict::LineInfoDict; kwargs...)
```
Prints profiling results to `io`. This variant is used to examine results exported by a previous call to [`retrieve`](https://docs.julialang.org/#Profile.retrieve). Supply the vector `data` of backtraces and a dictionary `lidict` of line information.

See `Profile.print([io], data)` for an explanation of the valid keyword arguments.


```julia
init(; n::Integer, delay::Real)
```
Configure the `delay` between backtraces (measured in seconds), and the number `n` of instruction pointers that may be stored per thread. Each instruction pointer corresponds to a single line of code; backtraces generally consist of a long list of instruction pointers. Note that 6 spaces for instruction pointers per backtrace are used to store metadata and two NULL end markers. Current settings can be obtained by calling this function with no arguments, and each can be set independently using keywords or in the order `(n, delay)`.

As of Julia 1.8, this function allocates space for `n` instruction pointers per thread being profiled. Previously this was `n` total.


```julia
fetch(;include_meta = true) -> data
```
Returns a copy of the buffer of profile backtraces. Note that the values in `data` have meaning only on this machine in the current session, because it depends on the exact memory addresses used in JIT-compiling. This function is primarily for internal use; [`retrieve`](https://docs.julialang.org/#Profile.retrieve) may be a better choice for most users. By default metadata such as threadid and taskid is included. Set `include_meta` to `false` to strip metadata.


```julia
retrieve(; kwargs...) -> data, lidict
```
"Exports" profiling results in a portable format, returning the set of all backtraces (`data`) and a dictionary that maps the (session-specific) instruction pointers in `data` to `LineInfo` values that store the file name, function name, and line number. This function allows you to save profiling results for future analysis.


```julia
callers(funcname, [data, lidict], [filename=<filename>], [linerange=<start:stop>]) -> Vector{Tuple{count, lineinfo}}
```
Given a previous profiling run, determine who called a particular function. Supplying the filename (and optionally, range of line numbers over which the function is defined) allows you to disambiguate an overloaded method. The returned value is a vector containing a count of the number of calls and line information about the caller. One can optionally supply backtrace `data` obtained from [`retrieve`](https://docs.julialang.org/#Profile.retrieve); otherwise, the current internal profile buffer is used.


```julia
clear_malloc_data()
```
Clears any stored memory allocation data when running julia with `--track-allocation`. Execute the command(s) you want to test (to force JIT-compilation), then call [`clear_malloc_data`](https://docs.julialang.org/#Profile.clear_malloc_data). Then execute your command(s) again, quit Julia, and examine the resulting `*.mem` files.


```julia
get_peek_duration()
```
Get the duration in seconds of the profile "peek" that is triggered via `SIGINFO` or `SIGUSR1`, depending on platform.


```julia
set_peek_duration(t::Float64)
```
Set the duration in seconds of the profile "peek" that is triggered via `SIGINFO` or `SIGUSR1`, depending on platform.


```julia
Profile.Allocs.@profile [sample_rate=0.0001] expr
```
Profile allocations that happen during `expr`, returning both the result and and AllocResults struct.

A sample rate of 1.0 will record everything; 0.0 will record nothing.


```julia
julia> Profile.Allocs.@profile sample_rate=0.01 peakflops()
1.03733270279065e11

julia> results = Profile.Allocs.fetch()

julia> last(sort(results.allocs, by=x->x.size))
Profile.Allocs.Alloc(Vector{Any}, Base.StackTraces.StackFrame[_new_array_ at array.c:127, ...], 5576)
```
The current implementation of the Allocations Profiler does not capture types for all allocations. Allocations for which the profiler could not capture the type are represented as having type `Profile.Allocs.UnknownType`.

You can read more about the missing types and the plan to improve this, here: https://github.com/JuliaLang/julia/issues/43688.

The allocation profiler was added in Julia 1.8.

The methods in `Profile.Allocs` are not exported and need to be called e.g. as `Profile.Allocs.fetch()`.


```julia
Profile.Allocs.clear()
```
Clear all previously profiled allocation information from memory.


```julia
Profile.Allocs.fetch()
```
Retrieve the recorded allocations, and decode them into Julia objects which can be analyzed.


```julia
Profile.Allocs.start(sample_rate::Real)
```
Begin recording allocations with the given sample rate A sample rate of 1.0 will record everything; 0.0 will record nothing.


```julia
Profile.Allocs.stop()
```
Stop recording allocations.




