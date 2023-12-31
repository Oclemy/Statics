Julia can be configured with a number of environment variables, set either in the usual way for each operating system, or in a portable way from within Julia. Supposing that you want to set the environment variable `JULIA_EDITOR` to `vim`, you can type `ENV["JULIA_EDITOR"] = "vim"` (for instance, in the REPL) to make this change on a case by case basis, or add the same to the user configuration file `~/.julia/config/startup.jl` in the user's home directory to have a permanent effect. The current value of the same environment variable can be determined by evaluating `ENV["JULIA_EDITOR"]`.

The environment variables that Julia uses generally start with `JULIA`. If [`InteractiveUtils.versioninfo`](https://docs.julialang.org/../../stdlib/InteractiveUtils/#InteractiveUtils.versioninfo) is called with the keyword `verbose=true`, then the output will list any defined environment variables relevant for Julia, including those which include `JULIA` in their names.

Some variables, such as `JULIA_NUM_THREADS` and `JULIA_PROJECT`, need to be set before Julia starts, therefore adding these to `~/.julia/config/startup.jl` is too late in the startup process. In Bash, environment variables can either be set manually by running, e.g., `export JULIA_NUM_THREADS=4` before starting Julia, or by adding the same command to `~/.bashrc` or `~/.bash_profile` to set the variable each time Bash is started.

The absolute path of the directory containing the Julia executable, which sets the global variable [`Sys.BINDIR`](https://docs.julialang.org/../../base/constants/#Base.Sys.BINDIR). If `$JULIA_BINDIR` is not set, then Julia determines the value `Sys.BINDIR` at run-time.

The executable itself is one of


```julia
$JULIA_BINDIR/julia
$JULIA_BINDIR/julia-debug
```
by default.

The global variable `Base.DATAROOTDIR` determines a relative path from `Sys.BINDIR` to the data directory associated with Julia. Then the path


```julia
$JULIA_BINDIR/$DATAROOTDIR/julia/base
```
determines the directory in which Julia initially searches for source files (via `Base.find_source_file()`).

Likewise, the global variable `Base.SYSCONFDIR` determines a relative path to the configuration file directory. Then Julia searches for a `startup.jl` file at


```julia
$JULIA_BINDIR/$SYSCONFDIR/julia/startup.jl
$JULIA_BINDIR/../etc/julia/startup.jl
```
by default (via `Base.load_julia_startup()`).

For example, a Linux installation with a Julia executable located at `/bin/julia`, a `DATAROOTDIR` of `../share`, and a `SYSCONFDIR` of `../etc` will have `JULIA_BINDIR` set to `/bin`, a source-file search path of


```julia
/share/julia/base
```
and a global configuration search path of


```julia
/etc/julia/startup.jl
```
A directory path that indicates which project should be the initial active project. Setting this environment variable has the same effect as specifying the `--project` start-up option, but `--project` has higher precedence. If the variable is set to `@.` then Julia tries to find a project directory that contains `Project.toml` or `JuliaProject.toml` file from the current directory and its parents. See also the chapter on [Code Loading](https://docs.julialang.org/../code-loading/#code-loading).

`JULIA_PROJECT` must be defined before starting julia; defining it in `startup.jl` is too late in the startup process.

The `JULIA_LOAD_PATH` environment variable is used to populate the global Julia [`LOAD_PATH`](https://docs.julialang.org/../../base/constants/#Base.LOAD_PATH) variable, which determines which packages can be loaded via `import` and `using` (see [Code Loading](https://docs.julialang.org/../code-loading/#code-loading)).

Unlike the shell `PATH` variable, empty entries in `JULIA_LOAD_PATH` are expanded to the default value of `LOAD_PATH`, `["@", "@v#.#", "@stdlib"]` when populating `LOAD_PATH`. This allows easy appending, prepending, etc. of the load path value in shell scripts regardless of whether `JULIA_LOAD_PATH` is already set or not. For example, to prepend the directory `/foo/bar` to `LOAD_PATH` just do


```julia
export JULIA_LOAD_PATH="/foo/bar:$JULIA_LOAD_PATH"
```
If the `JULIA_LOAD_PATH` environment variable is already set, its old value will be prepended with `/foo/bar`. On the other hand, if `JULIA_LOAD_PATH` is not set, then it will be set to `/foo/bar:` which will expand to a `LOAD_PATH` value of `["/foo/bar", "@", "@v#.#", "@stdlib"]`. If `JULIA_LOAD_PATH` is set to the empty string, it expands to an empty `LOAD_PATH` array. In other words, the empty string is interpreted as a zero-element array, not a one-element array of the empty string. This behavior was chosen so that it would be possible to set an empty load path via the environment variable. If you want the default load path, either unset the environment variable or if it must have a value, set it to the string `:`.

On Windows, path elements are separated by the `;` character, as is the case with most path lists on Windows. Replace `:` with `;` in the above paragraph.

The `JULIA_DEPOT_PATH` environment variable is used to populate the global Julia [`DEPOT_PATH`](https://docs.julialang.org/../../base/constants/#Base.DEPOT_PATH) variable, which controls where the package manager, as well as Julia's code loading mechanisms, look for package registries, installed packages, named environments, repo clones, cached compiled package images, configuration files, and the default location of the REPL's history file.

Unlike the shell `PATH` variable but similar to `JULIA_LOAD_PATH`, empty entries in `JULIA_DEPOT_PATH` are expanded to the default value of `DEPOT_PATH`. This allows easy appending, prepending, etc. of the depot path value in shell scripts regardless of whether `JULIA_DEPOT_PATH` is already set or not. For example, to prepend the directory `/foo/bar` to `DEPOT_PATH` just do


```julia
export JULIA_DEPOT_PATH="/foo/bar:$JULIA_DEPOT_PATH"
```
If the `JULIA_DEPOT_PATH` environment variable is already set, its old value will be prepended with `/foo/bar`. On the other hand, if `JULIA_DEPOT_PATH` is not set, then it will be set to `/foo/bar:` which will have the effect of prepending `/foo/bar` to the default depot path. If `JULIA_DEPOT_PATH` is set to the empty string, it expands to an empty `DEPOT_PATH` array. In other words, the empty string is interpreted as a zero-element array, not a one-element array of the empty string. This behavior was chosen so that it would be possible to set an empty depot path via the environment variable. If you want the default depot path, either unset the environment variable or if it must have a value, set it to the string `:`.

On Windows, path elements are separated by the `;` character, as is the case with most path lists on Windows. Replace `:` with `;` in the above paragraph.

The absolute path `REPL.find_hist_file()` of the REPL's history file. If `$JULIA_HISTORY` is not set, then `REPL.find_hist_file()` defaults to


```julia
$(DEPOT_PATH[1])/logs/repl_history.jl
```
Sets the maximum number of different instances of a single package that are to be stored in the precompile cache (default = 10).

If set to `true`, this indicates to the package server that any package operations are part of a continuous integration (CI) system for the purposes of gathering package usage statistics.

The number of parallel tasks to use when precompiling packages. See [`Pkg.precompile`](https://pkgdocs.julialang.org/v1/api/#Pkg.precompile).

The default directory used by [`Pkg.develop`](https://pkgdocs.julialang.org/v1/api/#Pkg.develop) for downloading packages.

If set to `1`, this will ignore incorrect hashes in artifacts. This should be used carefully, as it disables verification of downloads, but can resolve issues when moving files across different types of file systems. See [Pkg.jl issue #2317](https://github.com/JuliaLang/Pkg.jl/issues/2317) for more details.

This is only supported in Julia 1.6 and above.

If set to `true`, this will enable offline mode: see [`Pkg.offline`](https://pkgdocs.julialang.org/v1/api/#Pkg.offline).

Pkg's offline mode requires Julia 1.5 or later.

If set to `0`, this will disable automatic precompilation by package actions which change the manifest. See [`Pkg.precompile`](https://pkgdocs.julialang.org/v1/api/#Pkg.precompile).

Specifies the URL of the package registry to use. By default, `Pkg` uses `https://pkg.julialang.org` to fetch Julia packages. In addition, you can disable the use of the PkgServer protocol, and instead access the packages directly from their hosts (GitHub, GitLab, etc.) by setting: `export JULIA_PKG_SERVER=""`

Specifies the preferred registry flavor. Currently supported values are `conservative` (the default), which will only publish resources that have been processed by the storage server (and thereby have a higher probability of being available from the PkgServers), whereas `eager` will publish registries whose resources have not necessarily been processed by the storage servers. Users behind restrictive firewalls that do not allow downloading from arbitrary servers should not use the `eager` flavor.

This only affects Julia 1.7 and above.

If set to `true`, this will unpack the registry instead of storing it as a compressed tarball.

This only affects Julia 1.7 and above. Earlier versions will always unpack the registry.

If set to `true`, Pkg operations which use the git protocol will use an external `git` executable instead of the default libgit2 library.

Use of the `git` executable is only supported on Julia 1.7 and above.

The accuracy of the package resolver. This should be a positive integer, the default is `1`.

Specify hosts whose identity should or should not be verified for specific transport layers. See [`NetworkOptions.verify_host`](https://github.com/JuliaLang/NetworkOptions.jl#verify_host)

Specify the file or directory containing the certificate authority roots. See [`NetworkOptions.ca_roots`](https://github.com/JuliaLang/NetworkOptions.jl#ca_roots)

The absolute path of the shell with which Julia should execute external commands (via `Base.repl_cmd()`). Defaults to the environment variable `$SHELL`, and falls back to `/bin/sh` if `$SHELL` is unset.

On Windows, this environment variable is ignored, and external commands are executed directly.

The editor returned by `InteractiveUtils.editor()` and used in, e.g., [`InteractiveUtils.edit`](https://docs.julialang.org/../../stdlib/InteractiveUtils/#InteractiveUtils.edit-Tuple%7BAbstractString,%20Integer%7D), referring to the command of the preferred editor, for instance `vim`.

`$JULIA_EDITOR` takes precedence over `$VISUAL`, which in turn takes precedence over `$EDITOR`. If none of these environment variables is set, then the editor is taken to be `open` on Windows and OS X, or `/etc/alternatives/editor` if it exists, or `emacs` otherwise.

To use Visual Studio Code on Windows, set `$JULIA_EDITOR` to `code.cmd`.

Overrides the global variable [`Base.Sys.CPU_THREADS`](https://docs.julialang.org/../../base/constants/#Base.Sys.CPU_THREADS), the number of logical CPU cores available.

A [`Float64`](https://docs.julialang.org/../../base/numbers/#Core.Float64) that sets the value of `Distributed.worker_timeout()` (default: `60.0`). This function gives the number of seconds a worker process will wait for a master process to establish a connection before dying.

An unsigned 64-bit integer (`uint64_t`) that sets the maximum number of threads available to Julia. If `$JULIA_NUM_THREADS` is not positive or is not set, or if the number of CPU threads cannot be determined through system calls, then the number of threads is set to `1`.

If `$JULIA_NUM_THREADS` is set to `auto`, then the number of threads will be set to the number of CPU threads.

`JULIA_NUM_THREADS` must be defined before starting julia; defining it in `startup.jl` is too late in the startup process.

In Julia 1.5 and above the number of threads can also be specified on startup using the `-t`/`--threads` command line argument.

The `auto` value for `$JULIA_NUM_THREADS` requires Julia 1.7 or above.

If set to a string that starts with the case-insensitive substring `"infinite"`, then spinning threads never sleep. Otherwise, `$JULIA_THREAD_SLEEP_THRESHOLD` is interpreted as an unsigned 64-bit integer (`uint64_t`) and gives, in nanoseconds, the amount of time after which spinning threads should sleep.

If set to anything besides `0`, then Julia's thread policy is consistent with running on a dedicated machine: the master thread is on proc 0, and threads are affinitized. Otherwise, Julia lets the operating system handle thread policy.

Environment variables that determine how REPL output should be formatted at the terminal. Generally, these variables should be set to [ANSI terminal escape sequences](https://en.wikipedia.org/wiki/ANSI_escape_code). Julia provides a high-level interface with much of the same functionality; see the section on [The Julia REPL](https://docs.julialang.org/../../stdlib/REPL/#The-Julia-REPL).

The formatting `Base.error_color()` (default: light red, `"033[91m"`) that errors should have at the terminal.

The formatting `Base.warn_color()` (default: yellow, `"033[93m"`) that warnings should have at the terminal.

The formatting `Base.info_color()` (default: cyan, `"033[36m"`) that info should have at the terminal.

The formatting `Base.input_color()` (default: normal, `"033[0m"`) that input should have at the terminal.

The formatting `Base.answer_color()` (default: normal, `"033[0m"`) that output should have at the terminal.

Enable debug logging for a file or module, see [`Logging`](https://docs.julialang.org/../../stdlib/Logging/#man-logging) for more information.

If set, these environment variables take strings that optionally start with the character `'r'`, followed by a string interpolation of a colon-separated list of three signed 64-bit integers (`int64_t`). This triple of integers `a:b:c` represents the arithmetic sequence `a`, `a + b`, `a + 2*b`, ... `c`.

* If it's the `n`th time that `jl_gc_pool_alloc()` has been called, and `n` belongs to the arithmetic sequence represented by `$JULIA_GC_ALLOC_POOL`, then garbage collection is forced.
* If it's the `n`th time that `maybe_collect()` has been called, and `n` belongs to the arithmetic sequence represented by `$JULIA_GC_ALLOC_OTHER`, then garbage collection is forced.
* If it's the `n`th time that `jl_gc_collect()` has been called, and `n` belongs to the arithmetic sequence represented by `$JULIA_GC_ALLOC_PRINT`, then counts for the number of calls to `jl_gc_pool_alloc()` and `maybe_collect()` are printed.

If the value of the environment variable begins with the character `'r'`, then the interval between garbage collection events is randomized.

These environment variables only have an effect if Julia was compiled with garbage-collection debugging (that is, if `WITH_GC_DEBUG_ENV` is set to `1` in the build configuration).

If set to anything besides `0`, then the Julia garbage collector never performs "quick sweeps" of memory.

This environment variable only has an effect if Julia was compiled with garbage-collection debugging (that is, if `WITH_GC_DEBUG_ENV` is set to `1` in the build configuration).

If set to anything besides `0`, then the Julia garbage collector will wait for a debugger to attach instead of aborting whenever there's a critical error.

This environment variable only has an effect if Julia was compiled with garbage-collection debugging (that is, if `WITH_GC_DEBUG_ENV` is set to `1` in the build configuration).

If set to anything besides `0`, then the compiler will create and register an event listener for just-in-time (JIT) profiling.

This environment variable only has an effect if Julia was compiled with JIT profiling support, using either

* Intel's [VTune™ Amplifier](https://software.intel.com/en-us/vtune) (`USE_INTEL_JITEVENTS` set to `1` in the build configuration), or
* [OProfile](https://oprofile.sourceforge.io/news/) (`USE_OPROFILE_JITEVENTS` set to `1` in the build configuration).
* [Perf](https://perf.wiki.kernel.org) (`USE_PERF_JITEVENTS` set to `1` in the build configuration). This integration is enabled by default.
If set to anything besides `0` enables GDB registration of Julia code on release builds. On debug builds of Julia this is always enabled. Recommended to use with `-g 2`.

Arguments to be passed to the LLVM backend.




