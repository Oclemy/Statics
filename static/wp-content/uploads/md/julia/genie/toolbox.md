
`Genie.Toolbox.validtaskname` — Function
```julia
validtaskname(task_name::String) :: String
```
Attempts to convert a potentially invalid (partial) `task_name` into a valid one.

[source](https://github.com/GenieFramework/Genie.jl/blob/47e81df11838c6e63aa6bc66cd6f778579412697/src/Toolbox.jl#L60-L64)[`Genie.Toolbox.taskdocs`](#Genie.Toolbox.taskdocs) — Function
```julia
task_docs(module_name::Module) :: String
```
Retrieves the docstring of the runtask method and returns it as a string.

[source](https://github.com/GenieFramework/Genie.jl/blob/47e81df11838c6e63aa6bc66cd6f778579412697/src/Toolbox.jl#L89-L93)[`Genie.Toolbox.loadtasks`](#Genie.Toolbox.loadtasks) — Function
```julia
loadtasks(; filter_type_name = Symbol()) :: Vector{TaskInfo}
```
Returns a vector of all registered Genie tasks.

[source](https://github.com/GenieFramework/Genie.jl/blob/47e81df11838c6e63aa6bc66cd6f778579412697/src/Toolbox.jl#L28-L32)[`Genie.Toolbox.printtasks`](#Genie.Toolbox.printtasks) — FunctionPrints a list of all the registered Genie tasks to the standard output.

[source](https://github.com/GenieFramework/Genie.jl/blob/47e81df11838c6e63aa6bc66cd6f778579412697/src/Toolbox.jl#L74-L76)[`new`](#new) — Keyword
```julia
new, or new{A,B,...}
```
Special function available to inner constructors which creates a new object of the type. The form new{A,B,...} explicitly specifies values of parameters for parametric types. See the manual section on Inner Constructor Methods for more information.

[source](https://github.com/JuliaLang/julia/blob/bed2cd540a11544ed4be381d471bbf590f0b745e/base/docs/basedocs.jl#L1345-L1352)[`Genie.Toolbox.taskfilename`](#Genie.Toolbox.taskfilename) — Function
```julia
task_file_name(cmd_args::Dict{String,Any}, config::Settings) :: String
```
Computes the name of a Genie task based on the command line input.

[source](https://github.com/GenieFramework/Genie.jl/blob/47e81df11838c6e63aa6bc66cd6f778579412697/src/Toolbox.jl#L129-L133)[`Genie.Toolbox.taskmodulename`](#Genie.Toolbox.taskmodulename) — Function
```julia
task_module_name(underscored_task_name::String) :: String
```
Computes the name of a Genie task based on the command line input.

[source](https://github.com/GenieFramework/Genie.jl/blob/47e81df11838c6e63aa6bc66cd6f778579412697/src/Toolbox.jl#L139-L143)[`Genie.Toolbox.isvalidtask!`](#Genie.Toolbox.isvalidtask!) — Function
```julia
isvalidtask!(parsed_args::Dict{String,Any}) :: Dict{String,Any}
```
Checks if the name of the task passed as the command line arg is valid task identifier – if not, attempts to address it, by appending the TASK*SUFFIX suffix. Returns the potentially modified `parsed*argsDict`.

[source](https://github.com/GenieFramework/Genie.jl/blob/47e81df11838c6e63aa6bc66cd6f778579412697/src/Toolbox.jl#L149-L154)[« Server](server.html)[Util »](util.html)Powered by [Documenter.jl](https://github.com/JuliaDocs/Documenter.jl) and the [Julia Programming Language](https://julialang.org/).

Settings

Themedocumenter-lightdocumenter-dark



---

This document was generated with [Documenter.jl](https://github.com/JuliaDocs/Documenter.jl) version 0.27.25 on Sunday 27 August 2023. Using Julia version 1.9.3.


