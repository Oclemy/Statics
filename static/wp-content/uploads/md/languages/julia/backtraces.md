So you managed to break Julia. Congratulations! Collected here are some general procedures you can undergo for common symptoms encountered when something goes awry. Including the information from these debugging steps can greatly help the maintainers when tracking down a segfault or trying to figure out why your script is running slower than expected.

If you've been directed to this page, find the symptom that best matches what you're experiencing and follow the instructions to generate the debugging information requested. Table of symptoms:

No matter the error, we will always need to know what version of Julia you are running. When Julia first starts up, a header is printed out with a version number and date. Please also include the output of `versioninfo()` (exported from the [`InteractiveUtils`](https://docs.julialang.org/../../stdlib/InteractiveUtils/#InteractiveUtils.versioninfo) standard library) in any report you create:


```julia
julia> using InteractiveUtils  
julia> versioninfo()Julia Version 1.8.5
Commit 17cfb8e65ea (2023-01-08 06:45 UTC)
Platform Info:
  OS: Linux (x86_64-linux-gnu)
  CPU: 128 × AMD EPYC 7502 32-Core Processor
  WORD_SIZE: 64
  LIBM: libopenlibm
  LLVM: libLLVM-13.0.1 (ORCJIT, znver2)
  Threads: 1 on 16 virtual cores
Environment:
  JULIA_CPU_THREADS = 16
  JULIA_DEPOT_PATH = /cache/julia-buildkite-plugin/depots/4289a709-b14c-442c-b26e-c1e651a85b69
  JULIA_NUM_THREADS = 1
```
Segfaults toward the end of the `make` process of building Julia are a common symptom of something going wrong while Julia is preparsing the corpus of code in the `base/` folder. Many factors can contribute toward this process dying unexpectedly, however it is as often as not due to an error in the C-code portion of Julia, and as such must typically be debugged with a debug build inside of `gdb`. Explicitly:

Create a debug build of Julia:


```julia
$ cd <julia_root>
$ make debug
```
Note that this process will likely fail with the same error as a normal `make` incantation, however this will create a debug executable that will offer `gdb` the debugging symbols needed to get accurate backtraces. Next, manually run the bootstrap process inside of `gdb`:


```julia
$ cd base/
$ gdb -x ../contrib/debug_bootstrap.gdb
```
This will start `gdb`, attempt to run the bootstrap process using the debug build of Julia, and print out a backtrace if (when) it segfaults. You may need to hit `<enter>` a few times to get the full backtrace. Create a [gist](https://gist.github.com) with the backtrace, the [version info](https://docs.julialang.org/#dev-version-info), and any other pertinent information you can think of and open a new [issue](https://github.com/JuliaLang/julia/issues?q=is%3Aopen) on Github with a link to the gist.

The procedure is very similar to [Segfaults during bootstrap (`sysimg.jl`)](https://docs.julialang.org/#Segfaults-during-bootstrap-(sysimg.jl)). Create a debug build of Julia, and run your script inside of a debugged Julia process:


```julia
$ cd <julia_root>
$ make debug
$ gdb --args usr/bin/julia-debug <path_to_your_script>
```
Note that `gdb` will sit there, waiting for instructions. Type `r` to run the process, and `bt` to generate a backtrace once it segfaults:


```julia
(gdb) r
Starting program: /home/sabae/src/julia/usr/bin/julia-debug ./test.jl
...
(gdb) bt
```
Create a [gist](https://gist.github.com) with the backtrace, the [version info](https://docs.julialang.org/#dev-version-info), and any other pertinent information you can think of and open a new [issue](https://github.com/JuliaLang/julia/issues?q=is%3Aopen) on Github with a link to the gist.

Occasionally errors occur during Julia's startup process (especially when using binary distributions, as opposed to compiling from source) such as the following:


```julia
$ julia
exec: error -5
```
These errors typically indicate something is not getting loaded properly very early on in the bootup phase, and our best bet in determining what's going wrong is to use external tools to audit the disk activity of the `julia` process:

* On Linux, use `strace`:


```julia
$ strace julia
```
* On OSX, use `dtruss`:


```julia
$ dtruss -f julia
```

Create a [gist](https://gist.github.com) with the `strace`/ `dtruss` output, the [version info](https://docs.julialang.org/#dev-version-info), and any other pertinent information and open a new [issue](https://github.com/JuliaLang/julia/issues?q=is%3Aopen) on Github with a link to the gist.

As mentioned elsewhere, `julia` has good integration with `rr` for generating traces; this includes, on Linux, the ability to automatically run `julia` under `rr` and share the trace after a crash. This can be immensely helpful when debugging such crashes and is strongly encouraged when reporting crash issues to the JuliaLang/julia repo. To run `julia` under `rr` automatically, do:


```julia
julia --bug-report=rr
```
To generate the `rr` trace locally, but not share, you can do:


```julia
julia --bug-report=rr-local
```
Note that this is only works on Linux. The blog post on [Time Travelling Bug Reporting](https://julialang.org/blog/2020/05/rr/) has many more details.

A few terms have been used as shorthand in this guide:

* `<julia_root>` refers to the root directory of the Julia source tree; e.g. it should contain folders such as `base`, `deps`, `src`, `test`, etc.....



