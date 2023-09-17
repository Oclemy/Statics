
`Genie.Generator.autostart_app` — Function
```julia
autostart_app(path::String = "."; autostart::Bool = true) :: Nothing
```
If `autostart` is `true`, the newly generated Genie app will be automatically started.

[source](https://github.com/GenieFramework/Genie.jl/blob/47e81df11838c6e63aa6bc66cd6f778579412697/src/Generator.jl#L648-L652)Missing docstring.Missing docstring for `binfolderpath`. Check Documenter's build log for details.

`Genie.Generator.controller_file_name` — Function
```julia
controller_file_name(resource_name::Union{String,Symbol})
```
Computes the controller file name based on the resource name.

[source](https://github.com/GenieFramework/Genie.jl/blob/47e81df11838c6e63aa6bc66cd6f778579412697/src/Generator.jl#L241-L245)Missing docstring.Missing docstring for `db_intializer`. Check Documenter's build log for details.

`Genie.Generator.db_support` — Function
```julia
db_support(app_path::String = ".") :: Nothing
```
Writes files used for interacting with the SearchLight ORM.

[source](https://github.com/GenieFramework/Genie.jl/blob/47e81df11838c6e63aa6bc66cd6f778579412697/src/Generator.jl#L357-L361)[`Genie.Generator.fullstack_app`](#Genie.Generator.fullstack_app) — Function
```julia
fullstack_app(app_name::String) :: Nothing
```
Writes the files necessary to create a full stack Genie app.

[source](https://github.com/GenieFramework/Genie.jl/blob/47e81df11838c6e63aa6bc66cd6f778579412697/src/Generator.jl#L269-L273)[`Genie.Generator.generate_project`](#Genie.Generator.generate_project) — Function
```julia
generate_project(name)
```
Generate the `Project.toml` with a name and a uuid. If this file already exists, generate `Project_sample.toml` as a reference instead.

[source](https://github.com/GenieFramework/Genie.jl/blob/47e81df11838c6e63aa6bc66cd6f778579412697/src/Generator.jl#L485-L490)[`Genie.Generator.install_app_dependencies`](#Genie.Generator.install_app_dependencies) — Function
```julia
install_app_dependencies(app_path::String = ".") :: Nothing
```
Installs the application's dependencies using Julia's Pkg

[source](https://github.com/GenieFramework/Genie.jl/blob/47e81df11838c6e63aa6bc66cd6f778579412697/src/Generator.jl#L447-L451)Missing docstring.Missing docstring for `install_db_dependencies`. Check Documenter's build log for details.

Missing docstring.Missing docstring for `install_searchlight_dependencies`. Check Documenter's build log for details.

`Genie.Generator.microstack_app` — Function
```julia
microstack_app(app_name::String, app_path::String = ".") :: Nothing
```
Writes the file necessary to create a microstack app.

[source](https://github.com/GenieFramework/Genie.jl/blob/47e81df11838c6e63aa6bc66cd6f778579412697/src/Generator.jl#L327-L331)[`Genie.Generator.minimal`](#Genie.Generator.minimal) — Function
```julia
minimal(app_name::String, app_path::String = abspath(app_name), autostart::Bool = true) :: Nothing
```
Creates a minimal Genie app.

[source](https://github.com/GenieFramework/Genie.jl/blob/47e81df11838c6e63aa6bc66cd6f778579412697/src/Generator.jl#L283-L287)[`Genie.Generator.mvc_support`](#Genie.Generator.mvc_support) — Function
```julia
mvc_support(app_path::String = ".") :: Nothing
```
Writes the files used for rendering resources using the MVC stack and the Genie templating system.

[source](https://github.com/GenieFramework/Genie.jl/blob/47e81df11838c6e63aa6bc66cd6f778579412697/src/Generator.jl#L345-L349)[`Genie.Generator.newapp`](#Genie.Generator.newapp) — Function
```julia
newapp(app_name::String; autostart::Bool = true, fullstack::Bool = false, dbsupport::Bool = false, mvcsupport::Bool = false) :: Nothing
```
Scaffolds a new Genie app, setting up the file structure indicated by the various arguments.

**Arguments**

* `app_name::String`: the name of the app (can be the full path where the app should be created).
* `autostart::Bool`: automatically start the app once the file structure is created
* `fullstack::Bool`: the type of app to be bootstrapped. The fullstack app includes MVC structure, DB connection code, and asset pipeline files.
* `dbsupport::Bool`: bootstrap the files needed for DB connection setup via the SearchLight ORM
* `mvcsupport::Bool`: adds the files used for HTML+Julia view templates rendering and working with resources
* `dbadapter::Union{String,Symbol,Nothing} = nothing` : pass the SearchLight database adapter to be used by default

(one of :MySQL, :SQLite, or :PostgreSQL). If `dbadapter` is `nothing`, an adapter will have to be selected interactivel at the REPL, during the app creation process.

**Examples**


```julia
julia> Genie.Generator.newapp("MyGenieApp")
2019-08-06 16:54:15:INFO:Main: Done! New app created at MyGenieApp
2019-08-06 16:54:15:DEBUG:Main: Changing active directory to MyGenieApp
2019-08-06 16:54:15:DEBUG:Main: Installing app dependencies
 Resolving package versions...
  Updating `~/Dropbox/Projects/GenieTests/MyGenieApp/Project.toml`
  [c43c736e] + Genie v0.10.1
  Updating `~/Dropbox/Projects/GenieTests/MyGenieApp/Manifest.toml`

2019-08-06 16:54:27:INFO:Main: Starting your brand new Genie app - hang tight!
 _____         _
|   __|___ ___|_|___
|  |  | -_|   | | -_|
|_____|___|_|_|_|___|

┌ Info:
│ Starting Genie in >> DEV << mode
└
[ Info: Logging to file at MyGenieApp/log/dev.log
[ Info: Ready!
2019-08-06 16:54:32:DEBUG:Main: Web Server starting at http://127.0.0.1:8000
2019-08-06 16:54:32:DEBUG:Main: Web Server running at http://127.0.0.1:8000
```
[source](https://github.com/GenieFramework/Genie.jl/blob/47e81df11838c6e63aa6bc66cd6f778579412697/src/Generator.jl#L679-L719)[`Genie.Generator.newapp_fullstack`](#Genie.Generator.newapp_fullstack) — Function
```julia
newapp_fullstack(name::String; autostart::Bool = true) :: Nothing
```
Template for scaffolding a new Genie app suitable for full stack web applications (includes MVC structure, DB support, and frontend asset pipeline).

**Arguments**

* `name::String`: the name of the app
* `autostart::Bool`: automatically start the app once the file structure is created
* `dbadapter::Union{String,Symbol,Nothing} = nothing` : pass the SearchLight database adapter to be used by default

(one of :MySQL, :SQLite, or :PostgreSQL). If `dbadapter` is `nothing`, an adapter will have to be selected interactivel at the REPL, during the app creation process.

[source](https://github.com/GenieFramework/Genie.jl/blob/47e81df11838c6e63aa6bc66cd6f778579412697/src/Generator.jl#L835-L846)[`Genie.Generator.newapp_mvc`](#Genie.Generator.newapp_mvc) — Function
```julia
newapp_mvc(name::String; autostart::Bool = true) :: Nothing
```
Template for scaffolding a new Genie app suitable for MVC web applications (includes MVC structure and DB support).

**Arguments**

* `name::String`: the name of the app
* `autostart::Bool`: automatically start the app once the file structure is created
* `dbadapter::Union{String,Symbol,Nothing} = nothing` : pass the SearchLight database adapter to be used by default

(one of :MySQL, :SQLite, or :PostgreSQL). If `dbadapter` is `nothing`, an adapter will have to be selected interactivel at the REPL, during the app creation process.

[source](https://github.com/GenieFramework/Genie.jl/blob/47e81df11838c6e63aa6bc66cd6f778579412697/src/Generator.jl#L816-L827)[`Genie.Generator.newapp_webservice`](#Genie.Generator.newapp_webservice) — Function
```julia
newapp_webservice(name::String; autostart::Bool = true, dbsupport::Bool = false) :: Nothing
```
Template for scaffolding a new Genie app suitable for nimble web services.

**Arguments**

* `name::String`: the name of the app
* `autostart::Bool`: automatically start the app once the file structure is created
* `dbsupport::Bool`: bootstrap the files needed for DB connection setup via the SearchLight ORM
* `dbadapter::Union{String,Symbol,Nothing} = nothing` : pass the SearchLight database adapter to be used by default

(one of :MySQL, :SQLite, or :PostgreSQL). If `dbadapter` is `nothing`, an adapter will have to be selected interactivel at the REPL, during the app creation process.

[source](https://github.com/GenieFramework/Genie.jl/blob/47e81df11838c6e63aa6bc66cd6f778579412697/src/Generator.jl#L795-L807)[`Genie.Generator.newcontroller`](#Genie.Generator.newcontroller) — Function
```julia
newcontroller(controller_name::Union{String,Symbol}) :: Nothing
```
Creates a new `controller` file. If `pluralize` is `false`, the name of the controller is not automatically pluralized.

[source](https://github.com/GenieFramework/Genie.jl/blob/47e81df11838c6e63aa6bc66cd6f778579412697/src/Generator.jl#L18-L22)
```julia
newcontroller(resource_name::String) :: Nothing
```
Generates a new Genie controller file and persists it to the resources folder.

[source](https://github.com/GenieFramework/Genie.jl/blob/47e81df11838c6e63aa6bc66cd6f778579412697/src/Generator.jl#L31-L35)[`Genie.Generator.newresource`](#Genie.Generator.newresource) — Function
```julia
newresource(resource_name::Union{String,Symbol}; pluralize::Bool = true, context::Union{Module,Nothing} = nothing) :: Nothing
```
Creates all the files associated with a new resource. If `pluralize` is `false`, the name of the resource is not automatically pluralized.

[source](https://github.com/GenieFramework/Genie.jl/blob/47e81df11838c6e63aa6bc66cd6f778579412697/src/Generator.jl#L51-L56)
```julia
newresource(resource_name::String, config::Settings) :: Nothing
```
Generates all the files associated with a new resource and persists them to the resources folder.

[source](https://github.com/GenieFramework/Genie.jl/blob/47e81df11838c6e63aa6bc66cd6f778579412697/src/Generator.jl#L65-L69)[`Genie.Generator.newtask`](#Genie.Generator.newtask) — Function
```julia
newtask(task_name::Union{String,Symbol}) :: Nothing
```
Creates a new Genie `Task` file.

[source](https://github.com/GenieFramework/Genie.jl/blob/47e81df11838c6e63aa6bc66cd6f778579412697/src/Generator.jl#L88-L92)Missing docstring.Missing docstring for `pkggenfile`. Check Documenter's build log for details.

Missing docstring.Missing docstring for `pkgproject`. Check Documenter's build log for details.

Missing docstring.Missing docstring for `post_create`. Check Documenter's build log for details.

`Genie.Generator.remove_searchlight_initializer` — Function
```julia
remove_searchlight_initializer(app_path::String = ".") :: Nothing
```
Removes the SearchLight initializer file if it's unused

[source](https://github.com/GenieFramework/Genie.jl/blob/47e81df11838c6e63aa6bc66cd6f778579412697/src/Generator.jl#L667-L671)[`Genie.Generator.resource_does_not_exist`](#Genie.Generator.resource_does_not_exist) — Function
```julia
resource_does_not_exist(resource_path::String, file_name::String) :: Bool
```
Returns `true` if the indicated resources does not exists - false otherwise.

[source](https://github.com/GenieFramework/Genie.jl/blob/47e81df11838c6e63aa6bc66cd6f778579412697/src/Generator.jl#L225-L229)[`Genie.Generator.scaffold`](#Genie.Generator.scaffold) — Function
```julia
scaffold(app_name::String, app_path::String = "") :: Nothing
```
Writes the file necessary to scaffold a minimal Genie app.

[source](https://github.com/GenieFramework/Genie.jl/blob/47e81df11838c6e63aa6bc66cd6f778579412697/src/Generator.jl#L300-L304)Missing docstring.Missing docstring for `set_files_mod`. Check Documenter's build log for details.

`Genie.Generator.setup_resource_path` — Function
```julia
setup_resource_path(resource_name::String) :: String
```
Computes and creates the directories structure needed to persist a new resource.

[source](https://github.com/GenieFramework/Genie.jl/blob/47e81df11838c6e63aa6bc66cd6f778579412697/src/Generator.jl#L104-L108)[`Genie.Generator.setup_nix_bin_files`](#Genie.Generator.setup_nix_bin_files) — Function
```julia
setup_nix_bin_files(path::String = ".") :: Nothing
```
Creates the bin/server and bin/repl binaries for *nix systems

[source](https://github.com/GenieFramework/Genie.jl/blob/47e81df11838c6e63aa6bc66cd6f778579412697/src/Generator.jl#L197-L201)[`Genie.Generator.setup_windows_bin_files`](#Genie.Generator.setup_windows_bin_files) — Function
```julia
setup_windows_bin_files(path::String = ".") :: Nothing
```
Creates the bin/server and bin/repl binaries for Windows

[source](https://github.com/GenieFramework/Genie.jl/blob/47e81df11838c6e63aa6bc66cd6f778579412697/src/Generator.jl#L172-L176)Missing docstring.Missing docstring for `validname`. Check Documenter's build log for details.

`Genie.Generator.write_app_custom_files` — Function
```julia
write_app_custom_files(path::String, app_path::String) :: Nothing
```
Writes the Genie app main module file.

[source](https://github.com/GenieFramework/Genie.jl/blob/47e81df11838c6e63aa6bc66cd6f778579412697/src/Generator.jl#L386-L390)Missing docstring.Missing docstring for `write_db_config`. Check Documenter's build log for details.

`Genie.Generator.write_resource_file` — Function
```julia
write_resource_file(resource_path::String, file_name::String, resource_name::String) :: Bool
```
Generates all resource files and persists them to disk.

[source](https://github.com/GenieFramework/Genie.jl/blob/47e81df11838c6e63aa6bc66cd6f778579412697/src/Generator.jl#L123-L127)[`Genie.Generator.write_secrets_file`](#Genie.Generator.write_secrets_file) — Function
```julia
write_secrets_file(app_path=".")
```
Generates a valid `config/secrets.jl` file with a random secret token.

[source](https://github.com/GenieFramework/Genie.jl/blob/47e81df11838c6e63aa6bc66cd6f778579412697/src/Generator.jl#L252-L256)[« FileTemplates](filetemplates.html)[Genie »](genie.html)Powered by [Documenter.jl](https://github.com/JuliaDocs/Documenter.jl) and the [Julia Programming Language](https://julialang.org/).

Settings

Themedocumenter-lightdocumenter-dark



---

This document was generated with [Documenter.jl](https://github.com/JuliaDocs/Documenter.jl) version 0.27.25 on Sunday 27 August 2023. Using Julia version 1.9.3.


