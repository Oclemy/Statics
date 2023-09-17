```julia
called_command(args::Dict, key::String) :: Bool
```
Checks whether or not a certain command was invoked by looking at the command line args.

[source](https://github.com/GenieFramework/Genie.jl/blob/47e81df11838c6e63aa6bc66cd6f778579412697/src/Commands.jl#L106-L110)[`Genie.Commands.execute`](#Genie.Commands.execute) — Function
```julia
execute(config::Settings) :: Nothing
```
Runs the requested Genie app command, based on the `args` passed to the script.

[source](https://github.com/GenieFramework/Genie.jl/blob/47e81df11838c6e63aa6bc66cd6f778579412697/src/Commands.jl#L11-L15)[`Genie.Commands.parse_commandline_args`](#Genie.Commands.parse_commandline_args) — Function
```julia
parse_commandline_args() :: Dict{String,Any}
```
Extracts the command line args passed into the app and returns them as a `Dict`, possibly setting up defaults. Also, it is used by the ArgParse module to populate the command line help for the app `-h`.

[source](https://github.com/GenieFramework/Genie.jl/blob/47e81df11838c6e63aa6bc66cd6f778579412697/src/Commands.jl#L50-L55)[« Assets](assets.html)[Configuration »](configuration.html)Powered by [Documenter.jl](https://github.com/JuliaDocs/Documenter.jl) and the [Julia Programming Language](https://julialang.org/).

Settings

Themedocumenter-lightdocumenter-dark



---

This document was generated with [Documenter.jl](https://github.com/JuliaDocs/Documenter.jl) version 0.27.25 on Sunday 27 August 2023. Using Julia version 1.9.3.


