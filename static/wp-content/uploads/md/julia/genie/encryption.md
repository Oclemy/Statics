```julia
decrypt(s::String) :: String
```
Decrypts `s` (a `string` previously encrypted by Genie).

[source](https://github.com/GenieFramework/Genie.jl/blob/47e81df11838c6e63aa6bc66cd6f778579412697/src/Encryption.jl#L24-L28)[`Genie.Encryption.encrypt`](#Genie.Encryption.encrypt) — Function
```julia
encrypt{T}(s::T) :: String
```
Encrypts `s`.

[source](https://github.com/GenieFramework/Genie.jl/blob/47e81df11838c6e63aa6bc66cd6f778579412697/src/Encryption.jl#L11-L15)[`Genie.Encryption.encryption_sauce`](#Genie.Encryption.encryption_sauce) — Function
```julia
encryption_sauce() :: Tuple{Vector{UInt8},Vector{UInt8}}
```
Generates a pair of key32 and iv16 with salt for encryption/decryption

[source](https://github.com/GenieFramework/Genie.jl/blob/47e81df11838c6e63aa6bc66cd6f778579412697/src/Encryption.jl#L46-L50)[« Cookies](cookies.html)[Exceptions »](exceptions.html)Powered by [Documenter.jl](https://github.com/JuliaDocs/Documenter.jl) and the [Julia Programming Language](https://julialang.org/).

Settings

Themedocumenter-lightdocumenter-dark



---

This document was generated with [Documenter.jl](https://github.com/JuliaDocs/Documenter.jl) version 0.27.25 on Sunday 27 August 2023. Using Julia version 1.9.3.


