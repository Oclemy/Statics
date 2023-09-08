Starting with Julia 1.6, the artifacts support has moved from `Pkg.jl` to Julia itself. Until proper documentation can be added here, you can learn more about artifacts in the `Pkg.jl` manual at <https://julialang.github.io/Pkg.jl/v1/artifacts/>.

Julia's artifacts API requires at least Julia 1.6. In Julia versions 1.3 to 1.5, you can use `Pkg.Artifacts` instead.


```julia
artifact_meta(name::String, artifacts_toml::String;
              platform::AbstractPlatform = HostPlatform(),
              pkg_uuid::Union{Base.UUID,Nothing}=nothing)
```
Get metadata about a given artifact (identified by name) stored within the given `(Julia)Artifacts.toml` file. If the artifact is platform-specific, use `platform` to choose the most appropriate mapping. If none is found, return `nothing`.

This function requires at least Julia 1.3.


```julia
artifact_hash(name::String, artifacts_toml::String;
              platform::AbstractPlatform = HostPlatform())
```
Thin wrapper around `artifact_meta()` to return the hash of the specified, platform- collapsed artifact. Returns `nothing` if no mapping can be found.

This function requires at least Julia 1.3.


```julia
find_artifacts_toml(path::String)
```
Given the path to a `.jl` file, (such as the one returned by `__source__.file` in a macro context), find the `(Julia)Artifacts.toml` that is contained within the containing project (if it exists), otherwise return `nothing`.

This function requires at least Julia 1.3.


```julia
macro artifact_str(name)
```
Return the on-disk path to an artifact. Automatically looks the artifact up by name in the project's `(Julia)Artifacts.toml` file. Throws an error on if the requested artifact is not present. If run in the REPL, searches for the toml file starting in the current directory, see `find_artifacts_toml()` for more.

If the artifact is marked "lazy" and the package has `using LazyArtifacts` defined, the artifact will be downloaded on-demand with `Pkg` the first time this macro tries to compute the path. The files will then be left installed locally for later.

If `name` contains a forward or backward slash, all elements after the first slash will be taken to be path names indexing into the artifact, allowing for an easy one-liner to access a single file/directory within an artifact. Example:


```julia
ffmpeg_path = @artifact"FFMPEG/bin/ffmpeg"
```
This macro requires at least Julia 1.3.

Slash-indexing requires at least Julia 1.6.




