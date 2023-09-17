```julia
SERVERS
```
ServersCollection constant containing references to the current app's web and websockets servers.

[source](https://github.com/GenieFramework/Genie.jl/blob/47e81df11838c6e63aa6bc66cd6f778579412697/src/Server.jl#L22-L26)[`Genie.Server.ServersCollection`](#Genie.Server.ServersCollection) — Type
```julia
ServersCollection(webserver::Union{Task,Nothing}, websockets::Union{Task,Nothing})
```
Represents a object containing references to Genie's web and websockets servers.

[source](https://github.com/GenieFramework/Genie.jl/blob/47e81df11838c6e63aa6bc66cd6f778579412697/src/Server.jl#L12-L16)[`Genie.Server.down`](#Genie.Server.down) — Function
```julia
down(; webserver::Bool = true, websockets::Bool = true) :: ServersCollection
```
Shuts down the servers optionally indicating which of the `webserver` and `websockets` servers to be stopped. It does not remove the servers from the `SERVERS` collection. Returns the collection.

[source](https://github.com/GenieFramework/Genie.jl/blob/47e81df11838c6e63aa6bc66cd6f778579412697/src/Server.jl#L229-L234)[`Genie.Server.down!`](#Genie.Server.down!) — Function
```julia
function down!(; webserver::Bool = true, websockets::Bool = true) :: Vector{ServersCollection}
```
Shuts down all the servers and empties the `SERVERS` collection. Returns the empty collection.

[source](https://github.com/GenieFramework/Genie.jl/blob/47e81df11838c6e63aa6bc66cd6f778579412697/src/Server.jl#L252-L256)[`Genie.Server.handle_request`](#Genie.Server.handle_request) — Function
```julia
handle_request(req::HTTP.Request, res::HTTP.Response) :: HTTP.Response
```
Http server handler function - invoked when the server gets a request.

[source](https://github.com/GenieFramework/Genie.jl/blob/47e81df11838c6e63aa6bc66cd6f778579412697/src/Server.jl#L265-L269)[`Genie.Server.handle_ws_request`](#Genie.Server.handle_ws_request) — Function
```julia
handle_ws_request(req::HTTP.Request, msg::String, ws_client) :: String
```
Http server handler function - invoked when the server gets a request.

[source](https://github.com/GenieFramework/Genie.jl/blob/47e81df11838c6e63aa6bc66cd6f778579412697/src/Server.jl#L366-L370)Missing docstring.Missing docstring for `isrunning`. Check Documenter's build log for details.

Missing docstring.Missing docstring for `openbrowser`. Check Documenter's build log for details.

Missing docstring.Missing docstring for `print_server_status`. Check Documenter's build log for details.

`Genie.Server.serve` — Function
```julia
serve(path::String = pwd(), params...; kwparams...)
```
Serves a folder of static files located at `path`. Allows Genie to be used as a static files web server. The `params` and `kwparams` arguments are forwarded to `Genie.up()`.

**Arguments**

* `path::String`: the folder of static files to be served by the server
* `params`: additional arguments which are passed to `Genie.up` to control the web server
* `kwparams`: additional keyword arguments which are passed to `Genie.up` to control the web server

**Examples**


```julia
julia> Genie.serve("public", 8888, async = false, verbose = true)
[ Info: Ready!
2019-08-06 16:39:20:DEBUG:Main: Web Server starting at http://127.0.0.1:8888
[ Info: Listening on: 127.0.0.1:8888
[ Info: Accept (1):  🔗    0↑     0↓    1s 127.0.0.1:8888:8888 ≣16
```
[source](https://github.com/GenieFramework/Genie.jl/blob/47e81df11838c6e63aa6bc66cd6f778579412697/src/Server.jl#L173-L192)Missing docstring.Missing docstring for `server_status`. Check Documenter's build log for details.

[`Genie.Server.setup_http_listener`](#Genie.Server.setup_http_listener) — Function
```julia
setup_http_listener(req::HTTP.Request, res::HTTP.Response = HTTP.Response()) :: HTTP.Response
```
Configures the handler for the HTTP Request and handles errors.

[source](https://github.com/GenieFramework/Genie.jl/blob/47e81df11838c6e63aa6bc66cd6f778579412697/src/Server.jl#L298-L302)Missing docstring.Missing docstring for `setup_http_streamer`. Check Documenter's build log for details.

`Genie.Server.setup_ws_handler` — Function
```julia
setup_ws_handler(stream::HTTP.Stream, ws_client) :: Nothing
```
Configures the handler for WebSockets requests.

[source](https://github.com/GenieFramework/Genie.jl/blob/47e81df11838c6e63aa6bc66cd6f778579412697/src/Server.jl#L328-L332)[`Genie.Server.up`](#Genie.Server.up) — Function
```julia
up(port::Int = Genie.config.server_port, host::String = Genie.config.server_host;
    ws_port::Int = Genie.config.websockets_port, async::Bool = ! Genie.config.run_as_server) :: ServersCollection
```
Starts the web server.

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
[source](https://github.com/GenieFramework/Genie.jl/blob/47e81df11838c6e63aa6bc66cd6f778579412697/src/Server.jl#L50-L68)[`Genie.Server.update_config`](#Genie.Server.update_config) — Function
```julia
update_config(port::Int, host::String, ws_port::Int) :: Nothing
```
Updates the corresponding Genie configurations to the corresponding values for `port`, `host`, and `ws_port`, if these are passed as arguments when starting up the server.

[source](https://github.com/GenieFramework/Genie.jl/blob/47e81df11838c6e63aa6bc66cd6f778579412697/src/Server.jl#L209-L214)[« Secrets](secrets.html)[Toolbox »](toolbox.html)Powered by [Documenter.jl](https://github.com/JuliaDocs/Documenter.jl) and the [Julia Programming Language](https://julialang.org/).

Settings

Themedocumenter-lightdocumenter-dark



---

This document was generated with [Documenter.jl](https://github.com/JuliaDocs/Documenter.jl) version 0.27.25 on Sunday 27 August 2023. Using Julia version 1.9.3.


