```julia
struct ExceptionalResponse <: Exception
```
A type of exception which wraps an HTTP Response object. The thrown exception will propagate until it is caught up the app stack or ultimately by Genie and the wrapped response is sent to the client.

**Example**

If the user is not authenticated, an `ExceptionalResponse` is thrown - if the exception is not caught in the app's stack, Genie will catch it and return the wrapped `Response` object, forcing an HTTP redirect to the login page.


```julia
isauthenticated() || throw(ExceptionalResponse(redirect(:show_login)))
```
[source](https://github.com/GenieFramework/Genie.jl/blob/47e81df11838c6e63aa6bc66cd6f778579412697/src/Exceptions.jl#L9-L23)[`Genie.Exceptions.FileExistsException`](#Genie.Exceptions.FileExistsException) — Type
```julia
struct FileExistsException <: Exception
```
Custom exception type for signaling that the requested file already exists.

[source](https://github.com/GenieFramework/Genie.jl/blob/47e81df11838c6e63aa6bc66cd6f778579412697/src/Exceptions.jl#L156-L160)[`Genie.Exceptions.InternalServerException`](#Genie.Exceptions.InternalServerException) — Type
```julia
struct InternalServerException <: Exception
```
Dedicated exception type for server side exceptions. Results in a 500 error by default.

**Arguments**

* `message::String`
* `info::String`
* `code::Int`
[source](https://github.com/GenieFramework/Genie.jl/blob/47e81df11838c6e63aa6bc66cd6f778579412697/src/Exceptions.jl#L84-L93)[`Genie.Exceptions.NotFoundException`](#Genie.Exceptions.NotFoundException) — Type
```julia
struct NotFoundException <: Exception
```
Specialized exception representing a not found resources. Results in a 404 response being sent to the client.

**Arguments**

* `message::String`
* `info::String`
* `code::Int`
* `resource::String`
[source](https://github.com/GenieFramework/Genie.jl/blob/47e81df11838c6e63aa6bc66cd6f778579412697/src/Exceptions.jl#L119-L129)[`Genie.Exceptions.RuntimeException`](#Genie.Exceptions.RuntimeException) — Type
```julia
RuntimeException
```
Represents an unexpected and unhandled runtime exceptions. An error event will be logged and the exception will be sent to the client, depending on the environment (the error stack is dumped by default in dev mode or an error message is displayed in production).

It allows defining custom error message and info, as well as an error code, in addition to the exception object.

**Arguments**

* `message::String`
* `info::String`
* `code::Int`
* `ex::Union{Nothing,Exception}`
[source](https://github.com/GenieFramework/Genie.jl/blob/47e81df11838c6e63aa6bc66cd6f778579412697/src/Exceptions.jl#L36-L50)[« Encryption](encryption.html)[FileTemplates »](filetemplates.html)Powered by [Documenter.jl](https://github.com/JuliaDocs/Documenter.jl) and the [Julia Programming Language](https://julialang.org/).

Settings

Themedocumenter-lightdocumenter-dark



---

This document was generated with [Documenter.jl](https://github.com/JuliaDocs/Documenter.jl) version 0.27.25 on Sunday 27 August 2023. Using Julia version 1.9.3.


