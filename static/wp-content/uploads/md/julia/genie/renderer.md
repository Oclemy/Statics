```julia
mutable struct WebRenderable
```
Represents an object that can be rendered on the web as a HTTP Response

[source](https://github.com/GenieFramework/Genie.jl/blob/47e81df11838c6e63aa6bc66cd6f778579412697/src/Renderer.jl#L72-L76)Missing docstring.Missing docstring for `render`. Check Documenter's build log for details.

`Genie.Renderer.redirect` — FunctionSets redirect headers and prepares the `Response`. It accepts 3 parameters: 1 - Label of a Route (to learn more, see the advanced routes section) 2 - Default HTTP 302 Found Status: indicates that the provided resource will be changed to a URL provided 3 - Tuples (key, value) to define the HTTP request header

Example: julia> Genie.Renderer.redirect(:index, 302, Dict("Content-Type" => "application/json; charset=UTF-8"))

HTTP.Messages.Response: HTTP/1.1 302 Moved Temporarily Content-Type: application/json; charset=UTF-8 Location: /index

Redirecting you to /index

[source](https://github.com/GenieFramework/Genie.jl/blob/47e81df11838c6e63aa6bc66cd6f778579412697/src/Renderer.jl#L179-L196)[`Genie.Renderer.hasrequested`](#Genie.Renderer.hasrequested) — Function
```julia
hasrequested(content_type::Symbol) :: Bool
```
Checks wheter or not the requested content type matches `content_type`.

[source](https://github.com/GenieFramework/Genie.jl/blob/47e81df11838c6e63aa6bc66cd6f778579412697/src/Renderer.jl#L206-L210)[`Genie.Renderer.respond`](#Genie.Renderer.respond) — FunctionConstructs a `Response` corresponding to the Content-Type of the request.

[source](https://github.com/GenieFramework/Genie.jl/blob/47e81df11838c6e63aa6bc66cd6f778579412697/src/Renderer.jl#L219-L221)[`Genie.Renderer.registervars`](#Genie.Renderer.registervars) — Function
```julia
registervars(vs...) :: Nothing
```
Loads the rendering vars into the task's scope

[source](https://github.com/GenieFramework/Genie.jl/blob/47e81df11838c6e63aa6bc66cd6f778579412697/src/Renderer.jl#L264-L268)Missing docstring.Missing docstring for `injectvars`. Check Documenter's build log for details.

`Genie.Renderer.view_file_info` — Function
```julia
view_file_info(path::String, supported_extensions::Vector{String}) :: Tuple{String,String}
```
Extracts path and extension info about a file

[source](https://github.com/GenieFramework/Genie.jl/blob/47e81df11838c6e63aa6bc66cd6f778579412697/src/Renderer.jl#L293-L297)[`Genie.Renderer.vars_signature`](#Genie.Renderer.vars_signature) — Function
```julia
vars_signature() :: String
```
Collects the names of the view vars in order to create a unique hash/salt to identify compiled views with different vars.

[source](https://github.com/GenieFramework/Genie.jl/blob/47e81df11838c6e63aa6bc66cd6f778579412697/src/Renderer.jl#L324-L329)[`Genie.Renderer.function_name`](#Genie.Renderer.function_name) — Function
```julia
function_name(file_path::String)
```
Generates function name for generated HTML+Julia views.

[source](https://github.com/GenieFramework/Genie.jl/blob/47e81df11838c6e63aa6bc66cd6f778579412697/src/Renderer.jl#L335-L339)[`Genie.Renderer.m_name`](#Genie.Renderer.m_name) — Function
```julia
m_name(file_path::String)
```
Generates module name for generated HTML+Julia views.

[source](https://github.com/GenieFramework/Genie.jl/blob/47e81df11838c6e63aa6bc66cd6f778579412697/src/Renderer.jl#L345-L349)[`Genie.Renderer.build_is_stale`](#Genie.Renderer.build_is_stale) — Function
```julia
build_is_stale(file_path::String, build_path::String) :: Bool
```
Checks if the view template has been changed since the last time the template was compiled.

[source](https://github.com/GenieFramework/Genie.jl/blob/47e81df11838c6e63aa6bc66cd6f778579412697/src/Renderer.jl#L355-L359)[`Genie.Renderer.build_module`](#Genie.Renderer.build_module) — Function
```julia
build_module(content::String, path::String, mod_name::String) :: String
```
Persists compiled Julia view data to file and returns the path

[source](https://github.com/GenieFramework/Genie.jl/blob/47e81df11838c6e63aa6bc66cd6f778579412697/src/Renderer.jl#L371-L375)[`Genie.Renderer.preparebuilds`](#Genie.Renderer.preparebuilds) — Function
```julia
preparebuilds() :: Bool
```
Sets up the build folder and the build module file for generating the compiled views.

[source](https://github.com/GenieFramework/Genie.jl/blob/47e81df11838c6e63aa6bc66cd6f778579412697/src/Renderer.jl#L397-L401)[`Genie.Renderer.purgebuilds`](#Genie.Renderer.purgebuilds) — Function
```julia
purgebuilds(subfolder = BUILD_NAME) :: Bool
```
Removes the views builds folders with all the generated views.

[source](https://github.com/GenieFramework/Genie.jl/blob/47e81df11838c6e63aa6bc66cd6f778579412697/src/Renderer.jl#L410-L414)[`Genie.Renderer.changebuilds`](#Genie.Renderer.changebuilds) — Function
```julia
changebuilds(subfolder = BUILD_NAME) :: Bool
```
Changes/creates a new builds folder.

[source](https://github.com/GenieFramework/Genie.jl/blob/47e81df11838c6e63aa6bc66cd6f778579412697/src/Renderer.jl#L422-L426)[`Genie.Renderer.set_negotiated_content`](#Genie.Renderer.set_negotiated_content) — Function
```julia
set_negotiated_content(req::HTTP.Request, res::HTTP.Response, params::Dict{Symbol,Any})
```
Configures the request, response, and params response content type based on the request and defaults.

[source](https://github.com/GenieFramework/Genie.jl/blob/47e81df11838c6e63aa6bc66cd6f778579412697/src/Renderer.jl#L467-L471)[`Genie.Renderer.negotiate_content`](#Genie.Renderer.negotiate_content) — Function
```julia
negotiate_content(req::Request, res::Response, params::Params) :: Response
```
Computes the content-type of the `Response`, based on the information in the `Request`.

[source](https://github.com/GenieFramework/Genie.jl/blob/47e81df11838c6e63aa6bc66cd6f778579412697/src/Renderer.jl#L483-L487)[« Logger](logger.html)[HTML Renderer »](renderer-html.html)Powered by [Documenter.jl](https://github.com/JuliaDocs/Documenter.jl) and the [Julia Programming Language](https://julialang.org/).

Settings

Themedocumenter-lightdocumenter-dark



---

This document was generated with [Documenter.jl](https://github.com/JuliaDocs/Documenter.jl) version 0.27.25 on Sunday 27 August 2023. Using Julia version 1.9.3.


