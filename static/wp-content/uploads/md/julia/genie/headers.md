```julia
normalize_header_key(key::String) :: String
```
Brings header keys to standard casing.

[source](https://github.com/GenieFramework/Genie.jl/blob/47e81df11838c6e63aa6bc66cd6f778579412697/src/Headers.jl#L98-L102)[`Genie.Headers.normalize_headers`](#Genie.Headers.normalize_headers) — Function
```julia
normalize_headers(req::HTTP.Request)
```
Makes request headers case insensitive.

[source](https://github.com/GenieFramework/Genie.jl/blob/47e81df11838c6e63aa6bc66cd6f778579412697/src/Headers.jl#L76-L80)Missing docstring.Missing docstring for `set_access_control_allow_headers!`. Check Documenter's build log for details.

Missing docstring.Missing docstring for `set_access_control_allow_origin!`. Check Documenter's build log for details.

`Genie.Headers.set_headers!` — Function
```julia
set_headers!(req::HTTP.Request, res::HTTP.Response, app_response::HTTP.Response) :: HTTP.Response
```
Configures the response headers.

[source](https://github.com/GenieFramework/Genie.jl/blob/47e81df11838c6e63aa6bc66cd6f778579412697/src/Headers.jl#L16-L20)[« Genie](genie.html)[HttpUtils »](httputils.html)Powered by [Documenter.jl](https://github.com/JuliaDocs/Documenter.jl) and the [Julia Programming Language](https://julialang.org/).

Settings

Themedocumenter-lightdocumenter-dark



---

This document was generated with [Documenter.jl](https://github.com/JuliaDocs/Documenter.jl) version 0.27.25 on Sunday 27 August 2023. Using Julia version 1.9.3.


