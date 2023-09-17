```julia
load(root_dir::String = Genie.config.path_config; context::Union{Module,Nothing} = nothing) :: Nothing
```
Loads (includes) the framework's secrets.jl file into the app's module `context`. The files are set up with `Revise` to be automatically reloaded.

[source](https://github.com/GenieFramework/Genie.jl/blob/47e81df11838c6e63aa6bc66cd6f778579412697/src/Secrets.jl#L58-L63)[`Genie.Secrets.secret`](#Genie.Secrets.secret) — Function
```julia
secret() :: String
```
Generates a random secret token to be used for configuring the call to `Genie.Secrets.secret_token!`.

[source](https://github.com/GenieFramework/Genie.jl/blob/47e81df11838c6e63aa6bc66cd6f778579412697/src/Secrets.jl#L77-L81)[`Genie.Secrets.secret_token`](#Genie.Secrets.secret_token) — Function
```julia
secret_token(generate_if_missing=true) :: String
```
Return the secret token used in the app for encryption and salting.

Usually, this token is defined through `Genie.Secrets.secret_token!` in the `config/secrets.jl` file. Here, a temporary one is generated for the current session if no other token is defined and `generate_if_missing` is true.

[source](https://github.com/GenieFramework/Genie.jl/blob/47e81df11838c6e63aa6bc66cd6f778579412697/src/Secrets.jl#L12-L20)[`Genie.Secrets.secret_token!`](#Genie.Secrets.secret_token!) — Function
```julia
secret_token!(value = secret())
```
Define the secret token used in the app for encryption and salting.

[source](https://github.com/GenieFramework/Genie.jl/blob/47e81df11838c6e63aa6bc66cd6f778579412697/src/Secrets.jl#L46-L50)[« Router](router.html)[Server »](server.html)Powered by [Documenter.jl](https://github.com/JuliaDocs/Documenter.jl) and the [Julia Programming Language](https://julialang.org/).

Settings

Themedocumenter-lightdocumenter-dark



---

This document was generated with [Documenter.jl](https://github.com/JuliaDocs/Documenter.jl) version 0.27.25 on Sunday 27 August 2023. Using Julia version 1.9.3.


