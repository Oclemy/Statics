```julia
autoload
```
Automatically and recursively includes files from the indicated `root_dir` into the indicated `context` module, skipping directories from `dir`. The files are set up with `Revise` to be automatically reloaded when changed (in dev environment).

[source](https://github.com/GenieFramework/Genie.jl/blob/47e81df11838c6e63aa6bc66cd6f778579412697/src/Loader.jl#L193-L199)[`Genie.Loader.bootstrap`](#Genie.Loader.bootstrap) — Function
```julia
bootstrap(context::Union{Module,Nothing} = nothing) :: Nothing
```
Kickstarts the loading of a Genie app by loading the environment settings.

[source](https://github.com/GenieFramework/Genie.jl/blob/47e81df11838c6e63aa6bc66cd6f778579412697/src/Loader.jl#L59-L63)[`Genie.Loader.default_context`](#Genie.Loader.default_context) — Function
```julia
default_context(context::Union{Module,Nothing})
```
Sets the module in which the code is loaded (the app's module)

[source](https://github.com/GenieFramework/Genie.jl/blob/47e81df11838c6e63aa6bc66cd6f778579412697/src/Loader.jl#L314-L318)Missing docstring.Missing docstring for `importenv`. Check Documenter's build log for details.

`Genie.Loader.load` — Function
```julia
load(; context::Union{Module,Nothing} = nothing) :: Nothing
```
Main entry point to loading a Genie app.

[source](https://github.com/GenieFramework/Genie.jl/blob/47e81df11838c6e63aa6bc66cd6f778579412697/src/Loader.jl#L281-L285)[`Genie.Loader.load_helpers`](#Genie.Loader.load_helpers) — Function
```julia
load_helpers(root_dir::String = Genie.config.path_helpers) :: Nothing
```
Automatically recursively includes files from `helpers/` and subfolders.

[source](https://github.com/GenieFramework/Genie.jl/blob/47e81df11838c6e63aa6bc66cd6f778579412697/src/Loader.jl#L139-L143)[`Genie.Loader.load_initializers`](#Genie.Loader.load_initializers) — Function
```julia
load_initializers(root_dir::String = Genie.config.path_config; context::Union{Module,Nothing} = nothing) :: Nothing
```
Automatically recursively includes files from `initializers/` and subfolders.

[source](https://github.com/GenieFramework/Genie.jl/blob/47e81df11838c6e63aa6bc66cd6f778579412697/src/Loader.jl#L149-L153)[`Genie.Loader.load_libs`](#Genie.Loader.load_libs) — Function
```julia
load_libs(root_dir::String = Genie.config.path_lib) :: Nothing
```
Recursively includes files from `lib/` and subfolders. The `lib/` folder, if present, is designed to host user code in the form of .jl files.

[source](https://github.com/GenieFramework/Genie.jl/blob/47e81df11838c6e63aa6bc66cd6f778579412697/src/Loader.jl#L109-L114)[`Genie.Loader.load_plugins`](#Genie.Loader.load_plugins) — Function
```julia
load_plugins(root_dir::String = Genie.config.path_plugins; context::Union{Module,Nothing} = nothing) :: Nothing
```
Automatically recursively includes files from `plugins/` and subfolders.

[source](https://github.com/GenieFramework/Genie.jl/blob/47e81df11838c6e63aa6bc66cd6f778579412697/src/Loader.jl#L159-L163)[`Genie.Loader.load_resources`](#Genie.Loader.load_resources) — Function
```julia
load_resources(root_dir::String = Genie.config.path_resources) :: Nothing
```
Automatically recursively includes files from `resources/` and subfolders.

[source](https://github.com/GenieFramework/Genie.jl/blob/47e81df11838c6e63aa6bc66cd6f778579412697/src/Loader.jl#L120-L124)[`Genie.Loader.load_routes`](#Genie.Loader.load_routes) — Function
```julia
load_routes(routes_file::String = Genie.ROUTES_FILE_NAME; context::Union{Module,Nothing} = nothing) :: Nothing
```
Loads the routes file.

[source](https://github.com/GenieFramework/Genie.jl/blob/47e81df11838c6e63aa6bc66cd6f778579412697/src/Loader.jl#L169-L173)[« Input](input.html)[Logger »](logger.html)Powered by [Documenter.jl](https://github.com/JuliaDocs/Documenter.jl) and the [Julia Programming Language](https://julialang.org/).

Settings

Themedocumenter-lightdocumenter-dark



---

This document was generated with [Documenter.jl](https://github.com/JuliaDocs/Documenter.jl) version 0.27.25 on Sunday 27 August 2023. Using Julia version 1.9.3.


