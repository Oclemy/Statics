```julia
genie() :: Union{Nothing,Sockets.TCPServer}
```
[source](https://github.com/GenieFramework/Genie.jl/blob/47e81df11838c6e63aa6bc66cd6f778579412697/src/Genie.jl#L158-L160)[`Genie.down`](#Genie.down) — Function
```julia
down(; webserver::Bool = true, websockets::Bool = true) :: ServersCollection
```
Shuts down the servers optionally indicating which of the `webserver` and `websockets` servers to be stopped. It does not remove the servers from the `SERVERS` collection. Returns the collection.

[source](https://github.com/GenieFramework/Genie.jl/blob/47e81df11838c6e63aa6bc66cd6f778579412697/src/Server.jl#L229-L234)[`Genie.down!`](#Genie.down!) — Function
```julia
function down!(; webserver::Bool = true, websockets::Bool = true) :: Vector{ServersCollection}
```
Shuts down all the servers and empties the `SERVERS` collection. Returns the empty collection.

[source](https://github.com/GenieFramework/Genie.jl/blob/47e81df11838c6e63aa6bc66cd6f778579412697/src/Server.jl#L252-L256)[`Genie.genie`](#Genie.genie) — Function
```julia
genie() :: Union{Nothing,Sockets.TCPServer}
```
[source](https://github.com/GenieFramework/Genie.jl/blob/47e81df11838c6e63aa6bc66cd6f778579412697/src/Genie.jl#L158-L160)[`Genie.go`](#Genie.go) — Function
```julia
loadapp(path::String = "."; autostart::Bool = false) :: Nothing
```
Loads an existing Genie app from the file system, within the current Julia REPL session.

**Arguments**

* `path::String`: the path to the Genie app on the file system.
* `autostart::Bool`: automatically start the app upon loading it.

**Examples**


```julia
shell> tree -L 1
.
├── Manifest.toml
├── Project.toml
├── bin
├── bootstrap.jl
├── config
├── env.jl
├── genie.jl
├── log
├── public
├── routes.jl
└── src

5 directories, 6 files

julia> using Genie

julia> Genie.loadapp(".")
 _____         _
|   __|___ ___|_|___
|  |  | -_|   | | -_|
|_____|___|_|_|_|___|

┌ Info:
│ Starting Genie in >> DEV << mode
└
[ Info: Logging to file at MyGenieApp/log/dev.log
```
[source](https://github.com/GenieFramework/Genie.jl/blob/47e81df11838c6e63aa6bc66cd6f778579412697/src/Genie.jl#L54-L94)Missing docstring.Missing docstring for `isrunning`. Check Documenter's build log for details.

`Genie.loadapp` — Function
```julia
loadapp(path::String = "."; autostart::Bool = false) :: Nothing
```
Loads an existing Genie app from the file system, within the current Julia REPL session.

**Arguments**

* `path::String`: the path to the Genie app on the file system.
* `autostart::Bool`: automatically start the app upon loading it.

**Examples**


```julia
shell> tree -L 1
.
├── Manifest.toml
├── Project.toml
├── bin
├── bootstrap.jl
├── config
├── env.jl
├── genie.jl
├── log
├── public
├── routes.jl
└── src

5 directories, 6 files

julia> using Genie

julia> Genie.loadapp(".")
 _____         _
|   __|___ ___|_|___
|  |  | -_|   | | -_|
|_____|___|_|_|_|___|

┌ Info:
│ Starting Genie in >> DEV << mode
└
[ Info: Logging to file at MyGenieApp/log/dev.log
```
[source](https://github.com/GenieFramework/Genie.jl/blob/47e81df11838c6e63aa6bc66cd6f778579412697/src/Genie.jl#L54-L94)[`Genie.run`](#Genie.run) — Function
```julia
run() :: Nothing
```
Runs the Genie app by parsing the command line args and invoking the corresponding actions. Used internally to parse command line arguments.

[source](https://github.com/GenieFramework/Genie.jl/blob/47e81df11838c6e63aa6bc66cd6f778579412697/src/Genie.jl#L145-L150)[`Genie.up`](#Genie.up) — Function
```julia
up(port::Int = Genie.config.server_port, host::String = Genie.config.server_host;
    ws_port::Int = Genie.config.websockets_port, async::Bool = ! Genie.config.run_as_server) :: Nothing
```
Starts the web server. Alias for `Server.up`

**Arguments**

* `port::Int`: the port used by the web server
* `host::String`: the host used by the web server
* `ws_port::Int`: the port used by the Web Sockets server
* `async::Bool`: run the web server task asynchronously

**Examples**


```julia
julia> up(8000, "127.0.0.1", async = false)
[ Info: Ready!
Web Server starting at http://127.0.0.1:8000
```
[source](https://github.com/GenieFramework/Genie.jl/blob/47e81df11838c6e63aa6bc66cd6f778579412697/src/Genie.jl#L118-L136)[« Generator](generator.html)[Headers »](headers.html)Powered by [Documenter.jl](https://github.com/JuliaDocs/Documenter.jl) and the [Julia Programming Language](https://julialang.org/).

Settings

Themedocumenter-lightdocumenter-dark



---

This document was generated with [Documenter.jl](https://github.com/JuliaDocs/Documenter.jl) version 0.27.25 on Sunday 27 August 2023. Using Julia version 1.9.3.


