
`Genie.Util.file_name_without_extension` — Function
```julia
file_name_without_extension(file_name, extension = ".jl") :: String
```
Removes the file extension `extension` from `file_name`.

[source](https://github.com/GenieFramework/Genie.jl/blob/47e81df11838c6e63aa6bc66cd6f778579412697/src/Util.jl#L6-L10)[`Genie.Util.walk_dir`](#Genie.Util.walk_dir) — Function
```julia
function walk_dir(dir, paths = String[]; only_extensions = ["jl"], only_files = true, only_dirs = false) :: Vector{String}
```
Recursively walks dir and `produce`s non directories. If `only_files`, directories will be skipped. If `only_dirs`, files will be skipped.

[source](https://github.com/GenieFramework/Genie.jl/blob/47e81df11838c6e63aa6bc66cd6f778579412697/src/Util.jl#L16-L20)Missing docstring.Missing docstring for `time_to_unixtimestamp`. Check Documenter's build log for details.

