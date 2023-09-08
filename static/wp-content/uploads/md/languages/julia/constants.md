
```julia
DEPOT_PATH
```
A stack of "depot" locations where the package manager, as well as Julia's code loading mechanisms, look for package registries, installed packages, named environments, repo clones, cached compiled package images, and configuration files. By default it includes:

1. `~/.julia` where `~` is the user home as appropriate on the system;
2. an architecture-specific shared system directory, e.g. `/usr/local/share/julia`;
3. an architecture-independent shared system directory, e.g. `/usr/share/julia`.

So `DEPOT_PATH` might be:


```julia
[joinpath(homedir(), ".julia"), "/usr/local/share/julia", "/usr/share/julia"]
```
The first entry is the "user depot" and should be writable by and owned by the current user. The user depot is where: registries are cloned, new package versions are installed, named environments are created and updated, package repos are cloned, newly compiled package image files are saved, log files are written, development packages are checked out by default, and global configuration data is saved. Later entries in the depot path are treated as read-only and are appropriate for registries, packages, etc. installed and managed by system administrators.

`DEPOT_PATH` is populated based on the [`JULIA_DEPOT_PATH`](https://docs.julialang.org/../../manual/environment-variables/#JULIA_DEPOT_PATH) environment variable if set.

**DEPOT_PATH contents**

Each entry in `DEPOT_PATH` is a path to a directory which contains subdirectories used by Julia for various purposes. Here is an overview of some of the subdirectories that may exist in a depot:

* `clones`: Contains full clones of package repos. Maintained by `Pkg.jl` and used as a cache.
* `compiled`: Contains precompiled `*.ji` files for packages. Maintained by Julia.
* `dev`: Default directory for `Pkg.develop`. Maintained by `Pkg.jl` and the user.
* `environments`: Default package environments. For instance the global environment for a specific julia version. Maintained by `Pkg.jl`.
* `logs`: Contains logs of `Pkg` and `REPL` operations. Maintained by `Pkg.jl` and `Julia`.
* `packages`: Contains packages, some of which were explicitly installed and some which are implicit dependencies. Maintained by `Pkg.jl`.
* `registries`: Contains package registries. By default only `General`. Maintained by `Pkg.jl`.

See also [`JULIA_DEPOT_PATH`](https://docs.julialang.org/../../manual/environment-variables/#JULIA_DEPOT_PATH), and [Code Loading](https://docs.julialang.org/../../manual/code-loading/#code-loading).




