Usage is very straightforward:


```julia
julia> using SHA

julia> bytes2hex(sha256("test"))
"9f86d081884c7d659a2feaa0c55ad015a3bf4f1b2b0b822cd15d6c15b0f00a08"
```
Each exported function (at the time of this writing, SHA-1, SHA-2 224, 256, 384 and 512, and SHA-3 224, 256, 384 and 512 functions are implemented) takes in either an `AbstractVector{UInt8}`, an `AbstractString` or an `IO` object. This makes it trivial to checksum a file:


```julia
shell> cat /tmp/test.txt
test
julia> using SHA

julia> open("/tmp/test.txt") do f
           sha2_256(f)
       end
32-element Array{UInt8,1}:
 0x9f
 0x86
 0xd0
 0x81
 0x88
 0x4c
 0x7d
 0x65
    ⋮
 0x5d
 0x6c
 0x15
 0xb0
 0xf0
 0x0a
 0x08
```
Due to the colloquial usage of `sha256` to refer to `sha2_256`, convenience functions are provided, mapping `shaxxx()` function calls to `sha2_xxx()`. For SHA-3, no such colloquialisms exist and the user must use the full `sha3_xxx()` names.

`shaxxx()` takes `AbstractString` and array-like objects (`NTuple` and `Array`) with elements of type `UInt8`.

**SHA-1**


```julia
sha1(data)
```
Hash data using the `sha1` algorithm and return the resulting digest. See also [`SHA1_CTX`](https://docs.julialang.org/#SHA.SHA1_CTX).


```julia
sha1(io::IO)
```
Hash data from io using `sha1` algorithm.

**SHA-2**


```julia
sha224(data)
```
Hash data using the `sha224` algorithm and return the resulting digest. See also [`SHA2_224_CTX`](https://docs.julialang.org/#SHA.SHA2_224_CTX).


```julia
sha224(io::IO)
```
Hash data from io using `sha224` algorithm.


```julia
sha256(data)
```
Hash data using the `sha256` algorithm and return the resulting digest. See also [`SHA2_256_CTX`](https://docs.julialang.org/#SHA.SHA2_256_CTX).


```julia
sha256(io::IO)
```
Hash data from io using `sha256` algorithm.


```julia
sha384(data)
```
Hash data using the `sha384` algorithm and return the resulting digest. See also [`SHA2_384_CTX`](https://docs.julialang.org/#SHA.SHA2_384_CTX).


```julia
sha384(io::IO)
```
Hash data from io using `sha384` algorithm.


```julia
sha512(data)
```
Hash data using the `sha512` algorithm and return the resulting digest. See also [`SHA2_512_CTX`](https://docs.julialang.org/#SHA.SHA2_512_CTX).


```julia
sha512(io::IO)
```
Hash data from io using `sha512` algorithm.


```julia
sha2_224(data)
```
Hash data using the `sha2_224` algorithm and return the resulting digest. See also [`SHA2_224_CTX`](https://docs.julialang.org/#SHA.SHA2_224_CTX).


```julia
sha2_224(io::IO)
```
Hash data from io using `sha2_224` algorithm.


```julia
sha2_256(data)
```
Hash data using the `sha2_256` algorithm and return the resulting digest. See also [`SHA2_256_CTX`](https://docs.julialang.org/#SHA.SHA2_256_CTX).


```julia
sha2_256(io::IO)
```
Hash data from io using `sha2_256` algorithm.


```julia
sha2_384(data)
```
Hash data using the `sha2_384` algorithm and return the resulting digest. See also [`SHA2_384_CTX`](https://docs.julialang.org/#SHA.SHA2_384_CTX).


```julia
sha2_384(io::IO)
```
Hash data from io using `sha2_384` algorithm.


```julia
sha2_512(data)
```
Hash data using the `sha2_512` algorithm and return the resulting digest. See also [`SHA2_512_CTX`](https://docs.julialang.org/#SHA.SHA2_512_CTX).


```julia
sha2_512(io::IO)
```
Hash data from io using `sha2_512` algorithm.

**SHA-3**


```julia
sha3_224(data)
```
Hash data using the `sha3_224` algorithm and return the resulting digest. See also [`SHA3_224_CTX`](https://docs.julialang.org/#SHA.SHA3_224_CTX).


```julia
sha3_224(io::IO)
```
Hash data from io using `sha3_224` algorithm.


```julia
sha3_256(data)
```
Hash data using the `sha3_256` algorithm and return the resulting digest. See also [`SHA3_256_CTX`](https://docs.julialang.org/#SHA.SHA3_256_CTX).


```julia
sha3_256(io::IO)
```
Hash data from io using `sha3_256` algorithm.


```julia
sha3_384(data)
```
Hash data using the `sha3_384` algorithm and return the resulting digest. See also [`SHA3_384_CTX`](https://docs.julialang.org/#SHA.SHA3_384_CTX).


```julia
sha3_384(io::IO)
```
Hash data from io using `sha3_384` algorithm.


```julia
sha3_512(data)
```
Hash data using the `sha3_512` algorithm and return the resulting digest. See also [`SHA3_512_CTX`](https://docs.julialang.org/#SHA.SHA3_512_CTX).


```julia
sha3_512(io::IO)
```
Hash data from io using `sha3_512` algorithm.

To create a hash from multiple items the `SHAX_XXX_CTX()` types can be used to create a stateful hash object that is updated with `update!` and finalized with `digest!`


```julia
julia> using SHA

julia> ctx = SHA2_256_CTX()
SHA2 256-bit hash state

julia> update!(ctx, b"some data")
0x0000000000000009

julia> update!(ctx, b"some more data")
0x0000000000000017

julia> digest!(ctx)
32-element Vector{UInt8}:
 0xbe
 0xcf
 0x23
 0xda
 0xaf
 0x02
 0xf7
 0xa3
 0x57
 0x92
    ⋮
 0x89
 0x4f
 0x59
 0xd8
 0xb3
 0xb4
 0x81
 0x8b
 0xc5
```
Note that, at the time of this writing, the SHA3 code is not optimized, and as such is roughly an order of magnitude slower than SHA2.


```julia
update!(context, data[, datalen])
```
Update the SHA context with the bytes in data. See also [`digest!`](https://docs.julialang.org/#SHA.digest!) for finalizing the hash.

**Examples**


```julia
julia> ctx = SHA1_CTX()
SHA1 hash state

julia> update!(ctx, b"data to to be hashed")
```

```julia
digest!(context)
```
Finalize the SHA context and return the hash as array of bytes (Array{Uint8, 1}).

**Examples**


```julia
julia> ctx = SHA1_CTX()
SHA1 hash state

julia> update!(ctx, b"data to to be hashed")

julia> digest!(ctx)
20-element Array{UInt8,1}:
 0x83
 0xe4
 ⋮
 0x89
 0xf5
```
**SHA-1**


```julia
SHA1_CTX()
```
Construct an empty SHA1 context.

**SHA-2**

Convenience types are also provided, where `SHAXXX_CTX` is a type alias for `SHA2_XXX_CTX`.


```julia
SHA2_224_CTX()
```
Construct an empty SHA2_224 context.


```julia
SHA2_256_CTX()
```
Construct an empty SHA2_256 context.


```julia
SHA2_384()
```
Construct an empty SHA2_384 context.


```julia
SHA2_512_CTX()
```
Construct an empty SHA2_512 context.


```julia
SHA2_224_CTX()
```
Construct an empty SHA2_224 context.


```julia
SHA2_256_CTX()
```
Construct an empty SHA2_256 context.


```julia
SHA2_384()
```
Construct an empty SHA2_384 context.


```julia
SHA2_512_CTX()
```
Construct an empty SHA2_512 context.

**SHA-3**


```julia
SHA3_224_CTX()
```
Construct an empty SHA3_224 context.


```julia
SHA3_256_CTX()
```
Construct an empty SHA3_256 context.


```julia
SHA3_384_CTX()
```
Construct an empty SHA3_384 context.


```julia
SHA3_512_CTX()
```
Construct an empty SHA3_512 context.


```julia
julia> using SHA

julia> key = collect(codeunits("key_string"))
10-element Vector{UInt8}:
 0x6b
 0x65
 0x79
 0x5f
 0x73
 0x74
 0x72
 0x69
 0x6e
 0x67

julia> bytes2hex(hmac_sha3_256(key, "test-message"))
"bc49a6f2aa29b27ee5ed1e944edd7f3d153e8a01535d98b5e24dac9a589a6248"
```
To create a hash from multiple items, the `HMAC_CTX()` types can be used to create a stateful hash object that is updated with `update!` and finalized with `digest!`.


```julia
julia> using SHA

julia> key = collect(codeunits("key_string"))
10-element Vector{UInt8}:
 0x6b
 0x65
 0x79
 0x5f
 0x73
 0x74
 0x72
 0x69
 0x6e
 0x67

julia> ctx = HMAC_CTX(SHA3_256_CTX(), key);

julia> update!(ctx, b"test-")
0x0000000000000000000000000000008d

julia> update!(ctx, b"message")
0x00000000000000000000000000000094

julia> bytes2hex(digest!(ctx))
"bc49a6f2aa29b27ee5ed1e944edd7f3d153e8a01535d98b5e24dac9a589a6248"
```
**HMAC context type**


```julia
HMAC_CTX(ctx::CTX, key::Vector{UInt8}) where {CTX<:SHA_CTX}
```
Construct an empty HMAC_CTX context.

**SHA-1**


```julia
hmac_sha1(key, data)
```
Hash data using the `sha1` algorithm using the passed key. See also [`HMAC_CTX`](https://docs.julialang.org/#SHA.HMAC_CTX).


```julia
hmac_sha1(key, io::IO)
```
Hash data from `io` with the passed key using `sha1` algorithm.

**SHA-2**


```julia
hmac_sha224(key, data)
```
Hash data using the `sha224` algorithm using the passed key. See also [`HMAC_CTX`](https://docs.julialang.org/#SHA.HMAC_CTX).


```julia
hmac_sha224(key, io::IO)
```
Hash data from `io` with the passed key using `sha224` algorithm.


```julia
hmac_sha256(key, data)
```
Hash data using the `sha256` algorithm using the passed key. See also [`HMAC_CTX`](https://docs.julialang.org/#SHA.HMAC_CTX).


```julia
hmac_sha256(key, io::IO)
```
Hash data from `io` with the passed key using `sha256` algorithm.


```julia
hmac_sha384(key, data)
```
Hash data using the `sha384` algorithm using the passed key. See also [`HMAC_CTX`](https://docs.julialang.org/#SHA.HMAC_CTX).


```julia
hmac_sha384(key, io::IO)
```
Hash data from `io` with the passed key using `sha384` algorithm.


```julia
hmac_sha512(key, data)
```
Hash data using the `sha512` algorithm using the passed key. See also [`HMAC_CTX`](https://docs.julialang.org/#SHA.HMAC_CTX).


```julia
hmac_sha512(key, io::IO)
```
Hash data from `io` with the passed key using `sha512` algorithm.


```julia
hmac_sha2_224(key, data)
```
Hash data using the `sha2_224` algorithm using the passed key. See also [`HMAC_CTX`](https://docs.julialang.org/#SHA.HMAC_CTX).


```julia
hmac_sha2_224(key, io::IO)
```
Hash data from `io` with the passed key using `sha2_224` algorithm.


```julia
hmac_sha2_256(key, data)
```
Hash data using the `sha2_256` algorithm using the passed key. See also [`HMAC_CTX`](https://docs.julialang.org/#SHA.HMAC_CTX).


```julia
hmac_sha2_256(key, io::IO)
```
Hash data from `io` with the passed key using `sha2_256` algorithm.


```julia
hmac_sha2_384(key, data)
```
Hash data using the `sha2_384` algorithm using the passed key. See also [`HMAC_CTX`](https://docs.julialang.org/#SHA.HMAC_CTX).


```julia
hmac_sha2_384(key, io::IO)
```
Hash data from `io` with the passed key using `sha2_384` algorithm.


```julia
hmac_sha2_512(key, data)
```
Hash data using the `sha2_512` algorithm using the passed key. See also [`HMAC_CTX`](https://docs.julialang.org/#SHA.HMAC_CTX).


```julia
hmac_sha2_512(key, io::IO)
```
Hash data from `io` with the passed key using `sha2_512` algorithm.

**SHA-3**


```julia
hmac_sha3_224(key, data)
```
Hash data using the `sha3_224` algorithm using the passed key. See also [`HMAC_CTX`](https://docs.julialang.org/#SHA.HMAC_CTX).


```julia
hmac_sha3_224(key, io::IO)
```
Hash data from `io` with the passed key using `sha3_224` algorithm.


```julia
hmac_sha3_256(key, data)
```
Hash data using the `sha3_256` algorithm using the passed key. See also [`HMAC_CTX`](https://docs.julialang.org/#SHA.HMAC_CTX).


```julia
hmac_sha3_256(key, io::IO)
```
Hash data from `io` with the passed key using `sha3_256` algorithm.


```julia
hmac_sha3_384(key, data)
```
Hash data using the `sha3_384` algorithm using the passed key. See also [`HMAC_CTX`](https://docs.julialang.org/#SHA.HMAC_CTX).


```julia
hmac_sha3_384(key, io::IO)
```
Hash data from `io` with the passed key using `sha3_384` algorithm.


```julia
hmac_sha3_512(key, data)
```
Hash data using the `sha3_512` algorithm using the passed key. See also [`HMAC_CTX`](https://docs.julialang.org/#SHA.HMAC_CTX).


```julia
hmac_sha3_512(key, io::IO)
```
Hash data from `io` with the passed key using `sha3_512` algorithm.




