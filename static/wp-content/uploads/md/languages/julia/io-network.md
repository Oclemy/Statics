
```julia
stdout::IO
```
Global variable referring to the standard out stream.

[source](https://github.com/JuliaLang/julia/blob/17cfb8e65ead377bf1b4598d8a9869144142c84e/base/libuv.jl#L139-L143)
```julia
stderr::IO
```
Global variable referring to the standard error stream.

[source](https://github.com/JuliaLang/julia/blob/17cfb8e65ead377bf1b4598d8a9869144142c84e/base/libuv.jl#L146-L150)
```julia
stdin::IO
```
Global variable referring to the standard input stream.

[source](https://github.com/JuliaLang/julia/blob/17cfb8e65ead377bf1b4598d8a9869144142c84e/base/libuv.jl#L132-L136)
```julia
open(f::Function, args...; kwargs...)
```
Apply the function `f` to the result of `open(args...; kwargs...)` and close the resulting file descriptor upon completion.

**Examples**


```julia
julia> open("myfile.txt", "w") do io
           write(io, "Hello world!")
       end;

julia> open(f->read(f, String), "myfile.txt")
"Hello world!"

julia> rm("myfile.txt")
```
[source](https://github.com/JuliaLang/julia/blob/17cfb8e65ead377bf1b4598d8a9869144142c84e/base/io.jl#L363-L380)
```julia
open(filename::AbstractString; lock = true, keywords...) -> IOStream
```
Open a file in a mode specified by five boolean keyword arguments:



| Keyword | Description | Default |
| --- | --- | --- |
| `read` | open for reading | `!write` |
| `write` | open for writing | `truncate | append` |
| `create` | create if non-existent | `!read & write | truncate | append` |
| `truncate` | truncate to zero size | `!read & write` |
| `append` | seek to end | `false` |

The default when no keywords are passed is to open files for reading only. Returns a stream for accessing the opened file.

The `lock` keyword argument controls whether operations will be locked for safe multi-threaded access.

The `lock` argument is available as of Julia 1.5.

[source](https://github.com/JuliaLang/julia/blob/17cfb8e65ead377bf1b4598d8a9869144142c84e/base/iostream.jl#L253-L274)
```julia
open(filename::AbstractString, [mode::AbstractString]; lock = true) -> IOStream
```
Alternate syntax for open, where a string-based mode specifier is used instead of the five booleans. The values of `mode` correspond to those from `fopen(3)` or Perl `open`, and are equivalent to setting the following boolean groups:



| Mode | Description | Keywords |
| --- | --- | --- |
| `r` | read | none |
| `w` | write, create, truncate | `write = true` |
| `a` | write, create, append | `append = true` |
| `r+` | read, write | `read = true, write = true` |
| `w+` | read, write, create, truncate | `truncate = true, read = true` |
| `a+` | read, write, create, append | `append = true, read = true` |

The `lock` keyword argument controls whether operations will be locked for safe multi-threaded access.

**Examples**


```julia
julia> io = open("myfile.txt", "w");

julia> write(io, "Hello world!");

julia> close(io);

julia> io = open("myfile.txt", "r");

julia> read(io, String)
"Hello world!"

julia> write(io, "This file is read only")
ERROR: ArgumentError: write failed, IOStream is not writeable
[...]

julia> close(io)

julia> io = open("myfile.txt", "a");

julia> write(io, "This stream is not read only")
28

julia> close(io)

julia> rm("myfile.txt")
```
The `lock` argument is available as of Julia 1.5.

[source](https://github.com/JuliaLang/julia/blob/17cfb8e65ead377bf1b4598d8a9869144142c84e/base/iostream.jl#L304-L354)
```julia
open(fd::OS_HANDLE) -> IO
```
Take a raw file descriptor wrap it in a Julia-aware IO type, and take ownership of the fd handle. Call `open(Libc.dup(fd))` to avoid the ownership capture of the original handle.

Do not call this on a handle that's already owned by some other part of the system.

[source](https://github.com/JuliaLang/julia/blob/17cfb8e65ead377bf1b4598d8a9869144142c84e/base/stream.jl#L318-L329)
```julia
open(command, mode::AbstractString, stdio=devnull)
```
Run `command` asynchronously. Like `open(command, stdio; read, write)` except specifying the read and write flags via a mode string instead of keyword arguments. Possible mode strings are:



| Mode | Description | Keywords |
| --- | --- | --- |
| `r` | read | none |
| `w` | write | `write = true` |
| `r+` | read, write | `read = true, write = true` |
| `w+` | read, write | `read = true, write = true` |

[source](https://github.com/JuliaLang/julia/blob/17cfb8e65ead377bf1b4598d8a9869144142c84e/base/process.jl#L346-L359)
```julia
open(command, stdio=devnull; write::Bool = false, read::Bool = !write)
```
Start running `command` asynchronously, and return a `process::IO` object. If `read` is true, then reads from the process come from the process's standard output and `stdio` optionally specifies the process's standard input stream. If `write` is true, then writes go to the process's standard input and `stdio` optionally specifies the process's standard output stream. The process's standard error stream is connected to the current global `stderr`.

[source](https://github.com/JuliaLang/julia/blob/17cfb8e65ead377bf1b4598d8a9869144142c84e/base/process.jl#L373-L382)
```julia
open(f::Function, command, args...; kwargs...)
```
Similar to `open(command, args...; kwargs...)`, but calls `f(stream)` on the resulting process stream, then closes the input stream and waits for the process to complete. Return the value returned by `f` on success. Throw an error if the process failed, or if the process attempts to print anything to stdout.

[source](https://github.com/JuliaLang/julia/blob/17cfb8e65ead377bf1b4598d8a9869144142c84e/base/process.jl#L406-L413)
```julia
IOStream
```
A buffered IO stream wrapping an OS file descriptor. Mostly used to represent files returned by [`open`](#Base.open).

[source](https://github.com/JuliaLang/julia/blob/17cfb8e65ead377bf1b4598d8a9869144142c84e/base/iostream.jl#L7-L12)
```julia
IOBuffer([data::AbstractVector{UInt8}]; keywords...) -> IOBuffer
```
Create an in-memory I/O stream, which may optionally operate on a pre-existing array.

It may take optional keyword arguments:

* `read`, `write`, `append`: restricts operations to the buffer; see `open` for details.
* `truncate`: truncates the buffer size to zero length.
* `maxsize`: specifies a size beyond which the buffer may not be grown.
* `sizehint`: suggests a capacity of the buffer (`data` must implement `sizehint!(data, size)`).

When `data` is not given, the buffer will be both readable and writable by default.

**Examples**


```julia
julia> io = IOBuffer();

julia> write(io, "JuliaLang is a GitHub organization.", " It has many members.")
56

julia> String(take!(io))
"JuliaLang is a GitHub organization. It has many members."

julia> io = IOBuffer(b"JuliaLang is a GitHub organization.")
IOBuffer(data=UInt8[...], readable=true, writable=false, seekable=true, append=false, size=35, maxsize=Inf, ptr=1, mark=-1)

julia> read(io, String)
"JuliaLang is a GitHub organization."

julia> write(io, "This isn't writable.")
ERROR: ArgumentError: ensureroom failed, IOBuffer is not writeable

julia> io = IOBuffer(UInt8[], read=true, write=true, maxsize=34)
IOBuffer(data=UInt8[...], readable=true, writable=true, seekable=true, append=false, size=0, maxsize=34, ptr=1, mark=-1)

julia> write(io, "JuliaLang is a GitHub organization.")
34

julia> String(take!(io))
"JuliaLang is a GitHub organization"

julia> length(read(IOBuffer(b"data", read=true, truncate=false)))
4

julia> length(read(IOBuffer(b"data", read=true, truncate=true)))
0
```
[source](https://github.com/JuliaLang/julia/blob/17cfb8e65ead377bf1b4598d8a9869144142c84e/base/iobuffer.jl#L35-L82)
```julia
IOBuffer(string::String)
```
Create a read-only `IOBuffer` on the data underlying the given string.

**Examples**


```julia
julia> io = IOBuffer("Haho");

julia> String(take!(io))
"Haho"

julia> String(take!(io))
"Haho"
```
[source](https://github.com/JuliaLang/julia/blob/17cfb8e65ead377bf1b4598d8a9869144142c84e/base/strings/io.jl#L288-L303)
```julia
take!(b::IOBuffer)
```
Obtain the contents of an `IOBuffer` as an array. Afterwards, the `IOBuffer` is reset to its initial state.

**Examples**


```julia
julia> io = IOBuffer();

julia> write(io, "JuliaLang is a GitHub organization.", " It has many members.")
56

julia> String(take!(io))
"JuliaLang is a GitHub organization. It has many members."
```
[source](https://github.com/JuliaLang/julia/blob/17cfb8e65ead377bf1b4598d8a9869144142c84e/base/iobuffer.jl#L359-L374)
```julia
fdio([name::AbstractString, ]fd::Integer[, own::Bool=false]) -> IOStream
```
Create an [`IOStream`](https://docs.julialang.org/#Base.IOStream) object from an integer file descriptor. If `own` is `true`, closing this object will close the underlying descriptor. By default, an `IOStream` is closed when it is garbage collected. `name` allows you to associate the descriptor with a named file.

[source](https://github.com/JuliaLang/julia/blob/17cfb8e65ead377bf1b4598d8a9869144142c84e/base/iostream.jl#L238-L244)
```julia
flush(stream)
```
Commit all currently buffered writes to the given stream.

[source](https://github.com/JuliaLang/julia/blob/17cfb8e65ead377bf1b4598d8a9869144142c84e/base/io.jl#L87-L91)
```julia
close(stream)
```
Close an I/O stream. Performs a [`flush`](https://docs.julialang.org/#Base.flush) first.

[source](https://github.com/JuliaLang/julia/blob/17cfb8e65ead377bf1b4598d8a9869144142c84e/base/io.jl#L57-L61)
```julia
closewrite(stream)
```
Shutdown the write half of a full-duplex I/O stream. Performs a [`flush`](https://docs.julialang.org/#Base.flush) first. Notify the other end that no more data will be written to the underlying file. This is not supported by all IO types.

**Examples**


```julia
julia> io = Base.BufferStream(); # this never blocks, so we can read and write on the same Task

julia> write(io, "request");

julia> # calling `read(io)` here would block forever

julia> closewrite(io);

julia> read(io, String)
"request"
```
[source](https://github.com/JuliaLang/julia/blob/17cfb8e65ead377bf1b4598d8a9869144142c84e/base/io.jl#L64-L84)
```julia
write(io::IO, x)
write(filename::AbstractString, x)
```
Write the canonical binary representation of a value to the given I/O stream or file. Return the number of bytes written into the stream. See also [`print`](https://docs.julialang.org/#Base.print) to write a text representation (with an encoding that may depend upon `io`).

The endianness of the written value depends on the endianness of the host system. Convert to/from a fixed endianness when writing/reading (e.g. using [`htol`](https://docs.julialang.org/#Base.htol) and [`ltoh`](https://docs.julialang.org/#Base.ltoh)) to get results that are consistent across platforms.

You can write multiple values with the same `write` call. i.e. the following are equivalent:


```julia
write(io, x, y...)
write(io, x) + write(io, y...)
```
**Examples**

Consistent serialization:


```julia
julia> fname = tempname(); # random temporary filename

julia> open(fname,"w") do f
           # Make sure we write 64bit integer in little-endian byte order
           write(f,htol(Int64(42)))
       end
8

julia> open(fname,"r") do f
           # Convert back to host byte order and host integer type
           Int(ltoh(read(f,Int64)))
       end
42
```
Merging write calls:


```julia
julia> io = IOBuffer();

julia> write(io, "JuliaLang is a GitHub organization.", " It has many members.")
56

julia> String(take!(io))
"JuliaLang is a GitHub organization. It has many members."

julia> write(io, "Sometimes those members") + write(io, " write documentation.")
44

julia> String(take!(io))
"Sometimes those members write documentation."
```
User-defined plain-data types without `write` methods can be written when wrapped in a `Ref`:


```julia
julia> struct MyStruct; x::Float64; end

julia> io = IOBuffer()
IOBuffer(data=UInt8[...], readable=true, writable=true, seekable=true, append=false, size=0, maxsize=Inf, ptr=1, mark=-1)

julia> write(io, Ref(MyStruct(42.0)))
8

julia> seekstart(io); read!(io, Ref(MyStruct(NaN)))
Base.RefValue{MyStruct}(MyStruct(42.0))
```
[source](https://github.com/JuliaLang/julia/blob/17cfb8e65ead377bf1b4598d8a9869144142c84e/base/io.jl#L210-L274)
```julia
read(io::IO, T)
```
Read a single value of type `T` from `io`, in canonical binary representation.

Note that Julia does not convert the endianness for you. Use [`ntoh`](https://docs.julialang.org/#Base.ntoh) or [`ltoh`](https://docs.julialang.org/#Base.ltoh) for this purpose.


```julia
read(io::IO, String)
```
Read the entirety of `io`, as a `String` (see also [`readchomp`](https://docs.julialang.org/#Base.readchomp)).

**Examples**


```julia
julia> io = IOBuffer("JuliaLang is a GitHub organization");

julia> read(io, Char)
'J': ASCII/Unicode U+004A (category Lu: Letter, uppercase)

julia> io = IOBuffer("JuliaLang is a GitHub organization");

julia> read(io, String)
"JuliaLang is a GitHub organization"
```
[source](https://github.com/JuliaLang/julia/blob/17cfb8e65ead377bf1b4598d8a9869144142c84e/base/io.jl#L183-L207)
```julia
read(filename::AbstractString, args...)
```
Open a file and read its contents. `args` is passed to `read`: this is equivalent to `open(io->read(io, args...), filename)`.


```julia
read(filename::AbstractString, String)
```
Read the entire contents of a file as a string.

[source](https://github.com/JuliaLang/julia/blob/17cfb8e65ead377bf1b4598d8a9869144142c84e/base/io.jl#L450-L459)
```julia
read(s::IO, nb=typemax(Int))
```
Read at most `nb` bytes from `s`, returning a `Vector{UInt8}` of the bytes read.

[source](https://github.com/JuliaLang/julia/blob/17cfb8e65ead377bf1b4598d8a9869144142c84e/base/io.jl#L991-L995)
```julia
read(s::IOStream, nb::Integer; all=true)
```
Read at most `nb` bytes from `s`, returning a `Vector{UInt8}` of the bytes read.

If `all` is `true` (the default), this function will block repeatedly trying to read all requested bytes, until an error or end-of-file occurs. If `all` is `false`, at most one `read` call is performed, and the amount of data returned is device-dependent. Note that not all stream types support the `all` option.

[source](https://github.com/JuliaLang/julia/blob/17cfb8e65ead377bf1b4598d8a9869144142c84e/base/iostream.jl#L550-L559)
```julia
read(command::Cmd)
```
Run `command` and return the resulting output as an array of bytes.

[source](https://github.com/JuliaLang/julia/blob/17cfb8e65ead377bf1b4598d8a9869144142c84e/base/process.jl#L441-L445)
```julia
read(command::Cmd, String)
```
Run `command` and return the resulting output as a `String`.

[source](https://github.com/JuliaLang/julia/blob/17cfb8e65ead377bf1b4598d8a9869144142c84e/base/process.jl#L453-L457)
```julia
read!(stream::IO, array::AbstractArray)
read!(filename::AbstractString, array::AbstractArray)
```
Read binary data from an I/O stream or file, filling in `array`.

[source](https://github.com/JuliaLang/julia/blob/17cfb8e65ead377bf1b4598d8a9869144142c84e/base/io.jl#L464-L469)
```julia
readbytes!(stream::IO, b::AbstractVector{UInt8}, nb=length(b))
```
Read at most `nb` bytes from `stream` into `b`, returning the number of bytes read. The size of `b` will be increased if needed (i.e. if `nb` is greater than `length(b)` and enough bytes could be read), but it will never be decreased.

[source](https://github.com/JuliaLang/julia/blob/17cfb8e65ead377bf1b4598d8a9869144142c84e/base/io.jl#L965-L971)
```julia
readbytes!(stream::IOStream, b::AbstractVector{UInt8}, nb=length(b); all::Bool=true)
```
Read at most `nb` bytes from `stream` into `b`, returning the number of bytes read. The size of `b` will be increased if needed (i.e. if `nb` is greater than `length(b)` and enough bytes could be read), but it will never be decreased.

If `all` is `true` (the default), this function will block repeatedly trying to read all requested bytes, until an error or end-of-file occurs. If `all` is `false`, at most one `read` call is performed, and the amount of data returned is device-dependent. Note that not all stream types support the `all` option.

[source](https://github.com/JuliaLang/julia/blob/17cfb8e65ead377bf1b4598d8a9869144142c84e/base/iostream.jl#L500-L511)
```julia
unsafe_read(io::IO, ref, nbytes::UInt)
```
Copy `nbytes` from the `IO` stream object into `ref` (converted to a pointer).

It is recommended that subtypes `T<:IO` override the following method signature to provide more efficient implementations: `unsafe_read(s::T, p::Ptr{UInt8}, n::UInt)`

[source](https://github.com/JuliaLang/julia/blob/17cfb8e65ead377bf1b4598d8a9869144142c84e/base/io.jl#L297-L305)
```julia
unsafe_write(io::IO, ref, nbytes::UInt)
```
Copy `nbytes` from `ref` (converted to a pointer) into the `IO` object.

It is recommended that subtypes `T<:IO` override the following method signature to provide more efficient implementations: `unsafe_write(s::T, p::Ptr{UInt8}, n::UInt)`

[source](https://github.com/JuliaLang/julia/blob/17cfb8e65ead377bf1b4598d8a9869144142c84e/base/io.jl#L280-L288)
```julia
readeach(io::IO, T)
```
Return an iterable object yielding [`read(io, T)`](https://docs.julialang.org/#Base.read).

See also [`skipchars`](https://docs.julialang.org/#Base.skipchars), [`eachline`](https://docs.julialang.org/#Base.eachline), [`readuntil`](https://docs.julialang.org/#Base.readuntil).

`readeach` requires Julia 1.6 or later.

**Examples**


```julia
julia> io = IOBuffer("JuliaLang is a GitHub organization.n It has many members.n");

julia> for c in readeach(io, Char)
           c == 'n' && break
           print(c)
       end
JuliaLang is a GitHub organization.
```
[source](https://github.com/JuliaLang/julia/blob/17cfb8e65ead377bf1b4598d8a9869144142c84e/base/io.jl#L1185-L1205)
```julia
peek(stream[, T=UInt8])
```
Read and return a value of type `T` from a stream without advancing the current position in the stream.

**Examples**


```julia
julia> b = IOBuffer("julia");

julia> peek(b)
0x6a

julia> position(b)
0

julia> peek(b, Char)
'j': ASCII/Unicode U+006A (category Ll: Letter, lowercase)
```
The method which accepts a type requires Julia 1.5 or later.

[source](https://github.com/JuliaLang/julia/blob/17cfb8e65ead377bf1b4598d8a9869144142c84e/base/essentials.jl#L845-L868)
```julia
position(s)
```
Get the current position of a stream.

**Examples**


```julia
julia> io = IOBuffer("JuliaLang is a GitHub organization.");

julia> seek(io, 5);

julia> position(io)
5

julia> skip(io, 10);

julia> position(io)
15

julia> seekend(io);

julia> position(io)
35
```
[source](https://github.com/JuliaLang/julia/blob/17cfb8e65ead377bf1b4598d8a9869144142c84e/base/iostream.jl#L191-L215)
```julia
seek(s, pos)
```
Seek a stream to the given position.

**Examples**


```julia
julia> io = IOBuffer("JuliaLang is a GitHub organization.");

julia> seek(io, 5);

julia> read(io, Char)
'L': ASCII/Unicode U+004C (category Lu: Letter, uppercase)
```
[source](https://github.com/JuliaLang/julia/blob/17cfb8e65ead377bf1b4598d8a9869144142c84e/base/iostream.jl#L112-L126)
```julia
seekstart(s)
```
Seek a stream to its beginning.

**Examples**


```julia
julia> io = IOBuffer("JuliaLang is a GitHub organization.");

julia> seek(io, 5);

julia> read(io, Char)
'L': ASCII/Unicode U+004C (category Lu: Letter, uppercase)

julia> seekstart(io);

julia> read(io, Char)
'J': ASCII/Unicode U+004A (category Lu: Letter, uppercase)
```
[source](https://github.com/JuliaLang/julia/blob/17cfb8e65ead377bf1b4598d8a9869144142c84e/base/iostream.jl#L134-L153)
```julia
seekend(s)
```
Seek a stream to its end.

[source](https://github.com/JuliaLang/julia/blob/17cfb8e65ead377bf1b4598d8a9869144142c84e/base/iostream.jl#L156-L160)
```julia
skip(s, offset)
```
Seek a stream relative to the current position.

**Examples**


```julia
julia> io = IOBuffer("JuliaLang is a GitHub organization.");

julia> seek(io, 5);

julia> skip(io, 10);

julia> read(io, Char)
'G': ASCII/Unicode U+0047 (category Lu: Letter, uppercase)
```
[source](https://github.com/JuliaLang/julia/blob/17cfb8e65ead377bf1b4598d8a9869144142c84e/base/iostream.jl#L167-L183)
```julia
mark(s::IO)
```
Add a mark at the current position of stream `s`. Return the marked position.

See also [`unmark`](https://docs.julialang.org/#Base.unmark), [`reset`](https://docs.julialang.org/#Base.reset-Tuple%7BIO%7D), [`ismarked`](#Base.ismarked).

[source](https://github.com/JuliaLang/julia/blob/17cfb8e65ead377bf1b4598d8a9869144142c84e/base/io.jl#L1222-L1228)
```julia
unmark(s::IO)
```
Remove a mark from stream `s`. Return `true` if the stream was marked, `false` otherwise.

See also [`mark`](https://docs.julialang.org/#Base.mark), [`reset`](https://docs.julialang.org/#Base.reset-Tuple%7BIO%7D), [`ismarked`](#Base.ismarked).

[source](https://github.com/JuliaLang/julia/blob/17cfb8e65ead377bf1b4598d8a9869144142c84e/base/io.jl#L1233-L1239)
```julia
reset(s::IO)
```
Reset a stream `s` to a previously marked position, and remove the mark. Return the previously marked position. Throw an error if the stream is not marked.

See also [`mark`](https://docs.julialang.org/#Base.mark), [`unmark`](https://docs.julialang.org/#Base.unmark), [`ismarked`](#Base.ismarked).

[source](https://github.com/JuliaLang/julia/blob/17cfb8e65ead377bf1b4598d8a9869144142c84e/base/io.jl#L1246-L1253)
```julia
eof(stream) -> Bool
```
Test whether an I/O stream is at end-of-file. If the stream is not yet exhausted, this function will block to wait for more data if necessary, and then return `false`. Therefore it is always safe to read one byte after seeing `eof` return `false`. `eof` will return `false` as long as buffered data is still available, even if the remote end of a connection is closed.

[source](https://github.com/JuliaLang/julia/blob/17cfb8e65ead377bf1b4598d8a9869144142c84e/base/io.jl#L168-L176)
```julia
isreadonly(io) -> Bool
```
Determine whether a stream is read-only.

**Examples**


```julia
julia> io = IOBuffer("JuliaLang is a GitHub organization");

julia> isreadonly(io)
true

julia> io = IOBuffer();

julia> isreadonly(io)
false
```
[source](https://github.com/JuliaLang/julia/blob/17cfb8e65ead377bf1b4598d8a9869144142c84e/base/io.jl#L650-L667)
```julia
iswritable(io) -> Bool
```
Return `false` if the specified IO object is not writable.

**Examples**


```julia
julia> open("myfile.txt", "w") do io
           print(io, "Hello world!");
           iswritable(io)
       end
true

julia> open("myfile.txt", "r") do io
           iswritable(io)
       end
false

julia> rm("myfile.txt")
```
[source](https://github.com/JuliaLang/julia/blob/17cfb8e65ead377bf1b4598d8a9869144142c84e/base/io.jl#L145-L165)
```julia
isreadable(io) -> Bool
```
Return `false` if the specified IO object is not readable.

**Examples**


```julia
julia> open("myfile.txt", "w") do io
           print(io, "Hello world!");
           isreadable(io)
       end
false

julia> open("myfile.txt", "r") do io
           isreadable(io)
       end
true

julia> rm("myfile.txt")
```
[source](https://github.com/JuliaLang/julia/blob/17cfb8e65ead377bf1b4598d8a9869144142c84e/base/io.jl#L122-L142)
```julia
isopen(object) -> Bool
```
Determine whether an object - such as a stream or timer – is not yet closed. Once an object is closed, it will never produce a new event. However, since a closed stream may still have data to read in its buffer, use [`eof`](https://docs.julialang.org/#Base.eof) to check for the ability to read data. Use the `FileWatching` package to be notified when a stream might be writable or readable.

**Examples**


```julia
julia> io = open("my_file.txt", "w+");

julia> isopen(io)
true

julia> close(io)

julia> isopen(io)
false
```
[source](https://github.com/JuliaLang/julia/blob/17cfb8e65ead377bf1b4598d8a9869144142c84e/base/io.jl#L33-L54)
```julia
fd(stream)
```
Return the file descriptor backing the stream or file. Note that this function only applies to synchronous `File`'s and `IOStream`'s not to any of the asynchronous streams.

[source](https://github.com/JuliaLang/julia/blob/17cfb8e65ead377bf1b4598d8a9869144142c84e/base/iostream.jl#L49-L54)
```julia
redirect_stdio(;stdin=stdin, stderr=stderr, stdout=stdout)
```
Redirect a subset of the streams `stdin`, `stderr`, `stdout`. Each argument must be an `IOStream`, `TTY`, `Pipe`, socket, or `devnull`.

`redirect_stdio` requires Julia 1.7 or later.

[source](https://github.com/JuliaLang/julia/blob/17cfb8e65ead377bf1b4598d8a9869144142c84e/base/stream.jl#L1307-L1315)
```julia
redirect_stdio(f; stdin=nothing, stderr=nothing, stdout=nothing)
```
Redirect a subset of the streams `stdin`, `stderr`, `stdout`, call `f()` and restore each stream.

Possible values for each stream are:

* `nothing` indicating the stream should not be redirected.
* `path::AbstractString` redirecting the stream to the file at `path`.
* `io` an `IOStream`, `TTY`, `Pipe`, socket, or `devnull`.

**Examples**


```julia
julia> redirect_stdio(stdout="stdout.txt", stderr="stderr.txt") do
           print("hello stdout")
           print(stderr, "hello stderr")
       end

julia> read("stdout.txt", String)
"hello stdout"

julia> read("stderr.txt", String)
"hello stderr"
```
**Edge cases**

It is possible to pass the same argument to `stdout` and `stderr`:


```julia
julia> redirect_stdio(stdout="log.txt", stderr="log.txt", stdin=devnull) do
    ...
end
```
However it is not supported to pass two distinct descriptors of the same file.


```julia
julia> io1 = open("same/path", "w")

julia> io2 = open("same/path", "w")

julia> redirect_stdio(f, stdout=io1, stderr=io2) # not suppored
```
Also the `stdin` argument may not be the same descriptor as `stdout` or `stderr`.


```julia
julia> io = open(...)

julia> redirect_stdio(f, stdout=io, stdin=io) # not supported
```
`redirect_stdio` requires Julia 1.7 or later.

[source](https://github.com/JuliaLang/julia/blob/17cfb8e65ead377bf1b4598d8a9869144142c84e/base/stream.jl#L1322-L1373)
```julia
redirect_stdout([stream]) -> stream
```
Create a pipe to which all C and Julia level [`stdout`](https://docs.julialang.org/#Base.stdout) output will be redirected. Return a stream representing the pipe ends. Data written to [`stdout`](https://docs.julialang.org/#Base.stdout) may now be read from the `rd` end of the pipe.

`stream` must be a compatible objects, such as an `IOStream`, `TTY`, `Pipe`, socket, or `devnull`.

See also [`redirect_stdio`](#Base.redirect_stdio).

[source](https://github.com/JuliaLang/julia/blob/17cfb8e65ead377bf1b4598d8a9869144142c84e/base/stream.jl#L1264-L1277)
```julia
redirect_stdout(f::Function, stream)
```
Run the function `f` while redirecting [`stdout`](https://docs.julialang.org/#Base.stdout) to `stream`. Upon completion, [`stdout`](https://docs.julialang.org/#Base.stdout) is restored to its prior setting.

[source](https://github.com/JuliaLang/julia/blob/17cfb8e65ead377bf1b4598d8a9869144142c84e/base/stream.jl#L1434-L1439)
```julia
redirect_stderr(f::Function, stream)
```
Run the function `f` while redirecting [`stderr`](https://docs.julialang.org/#Base.stderr) to `stream`. Upon completion, [`stderr`](https://docs.julialang.org/#Base.stderr) is restored to its prior setting.

[source](https://github.com/JuliaLang/julia/blob/17cfb8e65ead377bf1b4598d8a9869144142c84e/base/stream.jl#L1442-L1447)
```julia
redirect_stdin([stream]) -> stream
```
Like [`redirect_stdout`](https://docs.julialang.org/#Base.redirect_stdout), but for [`stdin`](https://docs.julialang.org/#Base.stdin). Note that the direction of the stream is reversed.

`stream` must be a compatible objects, such as an `IOStream`, `TTY`, `Pipe`, socket, or `devnull`.

See also [`redirect_stdio`](#Base.redirect_stdio).

[source](https://github.com/JuliaLang/julia/blob/17cfb8e65ead377bf1b4598d8a9869144142c84e/base/stream.jl#L1293-L1304)
```julia
redirect_stdin(f::Function, stream)
```
Run the function `f` while redirecting [`stdin`](https://docs.julialang.org/#Base.stdin) to `stream`. Upon completion, [`stdin`](https://docs.julialang.org/#Base.stdin) is restored to its prior setting.

[source](https://github.com/JuliaLang/julia/blob/17cfb8e65ead377bf1b4598d8a9869144142c84e/base/stream.jl#L1450-L1455)
```julia
readchomp(x)
```
Read the entirety of `x` as a string and remove a single trailing newline if there is one. Equivalent to `chomp(read(x, String))`.

**Examples**


```julia
julia> open("my_file.txt", "w") do io
           write(io, "JuliaLang is a GitHub organization.nIt has many members.n");
       end;

julia> readchomp("my_file.txt")
"JuliaLang is a GitHub organization.nIt has many members."

julia> rm("my_file.txt");
```
[source](https://github.com/JuliaLang/julia/blob/17cfb8e65ead377bf1b4598d8a9869144142c84e/base/io.jl#L943-L960)
```julia
truncate(file, n)
```
Resize the file or buffer given by the first argument to exactly `n` bytes, filling previously unallocated space with '0' if the file or buffer is grown.

**Examples**


```julia
julia> io = IOBuffer();

julia> write(io, "JuliaLang is a GitHub organization.")
35

julia> truncate(io, 15)
IOBuffer(data=UInt8[...], readable=true, writable=true, seekable=true, append=false, size=15, maxsize=Inf, ptr=16, mark=-1)

julia> String(take!(io))
"JuliaLang is a "

julia> io = IOBuffer();

julia> write(io, "JuliaLang is a GitHub organization.");

julia> truncate(io, 40);

julia> String(take!(io))
"JuliaLang is a GitHub organization.00000"
```
[source](https://github.com/JuliaLang/julia/blob/17cfb8e65ead377bf1b4598d8a9869144142c84e/base/iostream.jl#L77-L105)
```julia
skipchars(predicate, io::IO; linecomment=nothing)
```
Advance the stream `io` such that the next-read character will be the first remaining for which `predicate` returns `false`. If the keyword argument `linecomment` is specified, all characters from that character until the start of the next line are ignored.

**Examples**


```julia
julia> buf = IOBuffer("    text")
IOBuffer(data=UInt8[...], readable=true, writable=false, seekable=true, append=false, size=8, maxsize=Inf, ptr=1, mark=-1)

julia> skipchars(isspace, buf)
IOBuffer(data=UInt8[...], readable=true, writable=false, seekable=true, append=false, size=8, maxsize=Inf, ptr=5, mark=-1)

julia> String(readavailable(buf))
"text"
```
[source](https://github.com/JuliaLang/julia/blob/17cfb8e65ead377bf1b4598d8a9869144142c84e/base/io.jl#L1276-L1294)
```julia
countlines(io::IO; eol::AbstractChar = 'n')
```
Read `io` until the end of the stream/file and count the number of lines. To specify a file pass the filename as the first argument. EOL markers other than `'n'` are supported by passing them as the second argument. The last non-empty line of `io` is counted even if it does not end with the EOL, matching the length returned by [`eachline`](https://docs.julialang.org/#Base.eachline) and [`readlines`](https://docs.julialang.org/#Base.readlines).

To count lines of a `String`, `countlines(IOBuffer(str))` can be used.

**Examples**


```julia
julia> io = IOBuffer("JuliaLang is a GitHub organization.n");

julia> countlines(io)
1

julia> io = IOBuffer("JuliaLang is a GitHub organization.");

julia> countlines(io)
1

julia> eof(io) # counting lines moves the file pointer
true

julia> io = IOBuffer("JuliaLang is a GitHub organization.");

julia> countlines(io, eol = '.')
1
```
[source](https://github.com/JuliaLang/julia/blob/17cfb8e65ead377bf1b4598d8a9869144142c84e/base/io.jl#L1307-L1337)
```julia
PipeBuffer(data::Vector{UInt8}=UInt8[]; maxsize::Integer = typemax(Int))
```
An [`IOBuffer`](https://docs.julialang.org/#Base.IOBuffer) that allows reading and performs writes by appending. Seeking and truncating are not supported. See [`IOBuffer`](https://docs.julialang.org/#Base.IOBuffer) for the available constructors. If `data` is given, creates a `PipeBuffer` to operate on a data vector, optionally specifying a size beyond which the underlying `Array` may not be grown.

[source](https://github.com/JuliaLang/julia/blob/17cfb8e65ead377bf1b4598d8a9869144142c84e/base/iobuffer.jl#L127-L135)
```julia
readavailable(stream)
```
Read available buffered data from a stream. Actual I/O is performed only if no data has already been buffered. The result is a `Vector{UInt8}`.

The amount of data returned is implementation-dependent; for example it can depend on the internal choice of buffer size. Other functions such as [`read`](https://docs.julialang.org/#Base.read) should generally be used instead.

[source](https://github.com/JuliaLang/julia/blob/17cfb8e65ead377bf1b4598d8a9869144142c84e/base/io.jl#L109-L119)
```julia
IOContext
```
`IOContext` provides a mechanism for passing output configuration settings among [`show`](https://docs.julialang.org/#Base.show-Tuple%7BIO,%20Any%7D) methods.

In short, it is an immutable dictionary that is a subclass of `IO`. It supports standard dictionary operations such as [`getindex`](https://docs.julialang.org/../collections/#Base.getindex), and can also be used as an I/O stream.

[source](https://github.com/JuliaLang/julia/blob/17cfb8e65ead377bf1b4598d8a9869144142c84e/base/show.jl#L217-L224)
```julia
IOContext(io::IO, KV::Pair...)
```
Create an `IOContext` that wraps a given stream, adding the specified `key=>value` pairs to the properties of that stream (note that `io` can itself be an `IOContext`).

* use `(key => value) in io` to see if this particular combination is in the properties set
* use `get(io, key, default)` to retrieve the most recent value for a particular key

The following properties are in common use:

* `:compact`: Boolean specifying that values should be printed more compactly, e.g. that numbers should be printed with fewer digits. This is set when printing array elements. `:compact` output should not contain line breaks.
* `:limit`: Boolean specifying that containers should be truncated, e.g. showing `…` in place of most elements.
* `:displaysize`: A `Tuple{Int,Int}` giving the size in rows and columns to use for text output. This can be used to override the display size for called functions, but to get the size of the screen use the `displaysize` function.
* `:typeinfo`: a `Type` characterizing the information already printed concerning the type of the object about to be displayed. This is mainly useful when displaying a collection of objects of the same type, so that redundant type information can be avoided (e.g. `[Float16(0)]` can be shown as "Float16[0.0]" instead of "Float16[Float16(0.0)]" : while displaying the elements of the array, the `:typeinfo` property will be set to `Float16`).
* `:color`: Boolean specifying whether ANSI color/escape codes are supported/expected. By default, this is determined by whether `io` is a compatible terminal and by any `--color` command-line flag when `julia` was launched.

**Examples**


```julia
julia> io = IOBuffer();

julia> printstyled(IOContext(io, :color => true), "string", color=:red)

julia> String(take!(io))
"e[31mstringe[39m"

julia> printstyled(io, "string", color=:red)

julia> String(take!(io))
"string"
```

```julia
julia> print(IOContext(stdout, :compact => false), 1.12341234)
1.12341234
julia> print(IOContext(stdout, :compact => true), 1.12341234)
1.12341
```

```julia
julia> function f(io::IO)
           if get(io, :short, false)
               print(io, "short")
           else
               print(io, "loooooong")
           end
       end
f (generic function with 1 method)

julia> f(stdout)
loooooong
julia> f(IOContext(stdout, :short => true))
short
```
[source](https://github.com/JuliaLang/julia/blob/17cfb8e65ead377bf1b4598d8a9869144142c84e/base/show.jl#L260-L327)
```julia
IOContext(io::IO, context::IOContext)
```
Create an `IOContext` that wraps an alternate `IO` but inherits the properties of `context`.

[source](https://github.com/JuliaLang/julia/blob/17cfb8e65ead377bf1b4598d8a9869144142c84e/base/show.jl#L253-L257)
```julia
show([io::IO = stdout], x)
```
Write a text representation of a value `x` to the output stream `io`. New types `T` should overload `show(io::IO, x::T)`. The representation used by `show` generally includes Julia-specific formatting and type information, and should be parseable Julia code when possible.

[`repr`](https://docs.julialang.org/#Base.repr-Tuple%7BMIME,%20Any%7D) returns the output of `show` as a string.

To customize human-readable text output for objects of type `T`, define `show(io::IO, ::MIME"text/plain", ::T)` instead. Checking the `:compact` [`IOContext`](https://docs.julialang.org/#Base.IOContext) property of `io` in such methods is recommended, since some containers show their elements by calling this method with `:compact => true`.

See also [`print`](https://docs.julialang.org/#Base.print), which writes un-decorated representations.

**Examples**


```julia
julia> show("Hello World!")
"Hello World!"
julia> print("Hello World!")
Hello World!
```
[source](https://github.com/JuliaLang/julia/blob/17cfb8e65ead377bf1b4598d8a9869144142c84e/base/show.jl#L365-L390)
```julia
summary(io::IO, x)
str = summary(x)
```
Print to a stream `io`, or return a string `str`, giving a brief description of a value. By default returns `string(typeof(x))`, e.g. [`Int64`](https://docs.julialang.org/../numbers/#Core.Int64).

For arrays, returns a string of size and type info, e.g. `10-element Array{Int64,1}`.

**Examples**


```julia
julia> summary(1)
"Int64"

julia> summary(zeros(2))
"2-element Vector{Float64}"
```
[source](https://github.com/JuliaLang/julia/blob/17cfb8e65ead377bf1b4598d8a9869144142c84e/base/show.jl#L2777-L2795)
```julia
print([io::IO], xs...)
```
Write to `io` (or to the default output stream [`stdout`](https://docs.julialang.org/#Base.stdout) if `io` is not given) a canonical (un-decorated) text representation. The representation used by `print` includes minimal formatting and tries to avoid Julia-specific details.

`print` falls back to calling `show`, so most types should just define `show`. Define `print` if your type has a separate "plain" representation. For example, `show` displays strings with quotes, and `print` displays strings without quotes.

See also [`println`](https://docs.julialang.org/#Base.println), [`string`](https://docs.julialang.org/../strings/#Base.string), [`printstyled`](https://docs.julialang.org/#Base.printstyled).

**Examples**


```julia
julia> print("Hello World!")
Hello World!
julia> io = IOBuffer();

julia> print(io, "Hello", ' ', :World!)

julia> String(take!(io))
"Hello World!"
```
[source](https://github.com/JuliaLang/julia/blob/17cfb8e65ead377bf1b4598d8a9869144142c84e/base/strings/io.jl#L5-L31)
```julia
println([io::IO], xs...)
```
Print (using [`print`](https://docs.julialang.org/#Base.print)) `xs` to `io` followed by a newline. If `io` is not supplied, prints to the default output stream [`stdout`](https://docs.julialang.org/#Base.stdout).

See also [`printstyled`](https://docs.julialang.org/#Base.printstyled) to add colors etc.

**Examples**


```julia
julia> println("Hello, world")
Hello, world

julia> io = IOBuffer();

julia> println(io, "Hello", ',', " world.")

julia> String(take!(io))
"Hello, world.n"
```
[source](https://github.com/JuliaLang/julia/blob/17cfb8e65ead377bf1b4598d8a9869144142c84e/base/strings/io.jl#L54-L74)
```julia
printstyled([io], xs...; bold::Bool=false, underline::Bool=false, blink::Bool=false, reverse::Bool=false, hidden::Bool=false, color::Union{Symbol,Int}=:normal)
```
Print `xs` in a color specified as a symbol or integer, optionally in bold.

Keyword `color` may take any of the values `:normal`, `:default`, `:bold`, `:black`, `:blink`, `:blue`, `:cyan`, `:green`, `:hidden`, `:light_black`, `:light_blue`, `:light_cyan`, `:light_green`, `:light_magenta`, `:light_red`, `:light_white`, `:light_yellow`, `:magenta`, `:nothing`, `:red`, `:reverse`, `:underline`, `:white`, or `:yellow` or an integer between 0 and 255 inclusive. Note that not all terminals support 256 colors.

Keywords `bold=true`, `underline=true`, `blink=true` are self-explanatory. Keyword `reverse=true` prints with foreground and background colors exchanged, and `hidden=true` should be invisibe in the terminal but can still be copied. These properties can be used in any combination.

See also [`print`](https://docs.julialang.org/#Base.print), [`println`](https://docs.julialang.org/#Base.println), [`show`](https://docs.julialang.org/#Base.show-Tuple%7BIO,%20Any%7D).

Keywords except `color` and `bold` were added in Julia 1.7.

[source](https://github.com/JuliaLang/julia/blob/17cfb8e65ead377bf1b4598d8a9869144142c84e/base/util.jl#L112-L129)
```julia
sprint(f::Function, args...; context=nothing, sizehint=0)
```
Call the given function with an I/O stream and the supplied extra arguments. Everything written to this I/O stream is returned as a string. `context` can be an [`IOContext`](https://docs.julialang.org/#Base.IOContext) whose properties will be used, a `Pair` specifying a property and its value, or a tuple of `Pair` specifying multiple properties and their values. `sizehint` suggests the capacity of the buffer (in bytes).

The optional keyword argument `context` can be set to a `:key=>value` pair, a tuple of `:key=>value` pairs, or an `IO` or [`IOContext`](https://docs.julialang.org/#Base.IOContext) object whose attributes are used for the I/O stream passed to `f`. The optional `sizehint` is a suggested size (in bytes) to allocate for the buffer used to write the string.

Passing a tuple to keyword `context` requires Julia 1.7 or later.

**Examples**


```julia
julia> sprint(show, 66.66666; context=:compact => true)
"66.6667"

julia> sprint(showerror, BoundsError([1], 100))
"BoundsError: attempt to access 1-element Vector{Int64} at index [100]"
```
[source](https://github.com/JuliaLang/julia/blob/17cfb8e65ead377bf1b4598d8a9869144142c84e/base/strings/io.jl#L79-L106)
```julia
showerror(io, e)
```
Show a descriptive representation of an exception object `e`. This method is used to display the exception after a call to [`throw`](https://docs.julialang.org/../base/#Core.throw).

**Examples**


```julia
julia> struct MyException <: Exception
           msg::String
       end

julia> function Base.showerror(io::IO, err::MyException)
           print(io, "MyException: ")
           print(io, err.msg)
       end

julia> err = MyException("test exception")
MyException("test exception")

julia> sprint(showerror, err)
"MyException: test exception"

julia> throw(MyException("test exception"))
ERROR: MyException: test exception
```
[source](https://github.com/JuliaLang/julia/blob/17cfb8e65ead377bf1b4598d8a9869144142c84e/base/errorshow.jl#L3-L29)
```julia
dump(x; maxdepth=8)
```
Show every part of the representation of a value. The depth of the output is truncated at `maxdepth`.

**Examples**


```julia
julia> struct MyStruct
           x
           y
       end

julia> x = MyStruct(1, (2,3));

julia> dump(x)
MyStruct
  x: Int64 1
  y: Tuple{Int64, Int64}
    1: Int64 2
    2: Int64 3

julia> dump(x; maxdepth = 1)
MyStruct
  x: Int64 1
  y: Tuple{Int64, Int64}
```
[source](https://github.com/JuliaLang/julia/blob/17cfb8e65ead377bf1b4598d8a9869144142c84e/base/show.jl#L2684-L2711)
```julia
@dump expr
```
Show every part of the representation of the given expression. Equivalent to [`dump(:(expr))`](#Base.dump).

[source](https://github.com/JuliaLang/julia/blob/17cfb8e65ead377bf1b4598d8a9869144142c84e/base/meta.jl#L147-L152)
```julia
readline(io::IO=stdin; keep::Bool=false)
readline(filename::AbstractString; keep::Bool=false)
```
Read a single line of text from the given I/O stream or file (defaults to `stdin`). When reading from a file, the text is assumed to be encoded in UTF-8. Lines in the input end with `'n'` or `"rn"` or the end of an input stream. When `keep` is false (as it is by default), these trailing newline characters are removed from the line before it is returned. When `keep` is true, they are returned as part of the line.

**Examples**


```julia
julia> open("my_file.txt", "w") do io
           write(io, "JuliaLang is a GitHub organization.nIt has many members.n");
       end
57

julia> readline("my_file.txt")
"JuliaLang is a GitHub organization."

julia> readline("my_file.txt", keep=true)
"JuliaLang is a GitHub organization.n"

julia> rm("my_file.txt")
```

```julia
julia> print("Enter your name: ")
Enter your name:

julia> your_name = readline()
Logan
"Logan"
```
[source](https://github.com/JuliaLang/julia/blob/17cfb8e65ead377bf1b4598d8a9869144142c84e/base/io.jl#L501-L535)
```julia
readuntil(stream::IO, delim; keep::Bool = false)
readuntil(filename::AbstractString, delim; keep::Bool = false)
```
Read a string from an I/O stream or a file, up to the given delimiter. The delimiter can be a `UInt8`, `AbstractChar`, string, or vector. Keyword argument `keep` controls whether the delimiter is included in the result. The text is assumed to be encoded in UTF-8.

**Examples**


```julia
julia> open("my_file.txt", "w") do io
           write(io, "JuliaLang is a GitHub organization.nIt has many members.n");
       end
57

julia> readuntil("my_file.txt", 'L')
"Julia"

julia> readuntil("my_file.txt", '.', keep = true)
"JuliaLang is a GitHub organization."

julia> rm("my_file.txt")
```
[source](https://github.com/JuliaLang/julia/blob/17cfb8e65ead377bf1b4598d8a9869144142c84e/base/io.jl#L474-L498)
```julia
readlines(io::IO=stdin; keep::Bool=false)
readlines(filename::AbstractString; keep::Bool=false)
```
Read all lines of an I/O stream or a file as a vector of strings. Behavior is equivalent to saving the result of reading [`readline`](https://docs.julialang.org/#Base.readline) repeatedly with the same arguments and saving the resulting lines as a vector of strings. See also [`eachline`](https://docs.julialang.org/#Base.eachline) to iterate over the lines without reading them all at once.

**Examples**


```julia
julia> open("my_file.txt", "w") do io
           write(io, "JuliaLang is a GitHub organization.nIt has many members.n");
       end
57

julia> readlines("my_file.txt")
2-element Vector{String}:
 "JuliaLang is a GitHub organization."
 "It has many members."

julia> readlines("my_file.txt", keep=true)
2-element Vector{String}:
 "JuliaLang is a GitHub organization.n"
 "It has many members.n"

julia> rm("my_file.txt")
```
[source](https://github.com/JuliaLang/julia/blob/17cfb8e65ead377bf1b4598d8a9869144142c84e/base/io.jl#L554-L582)
```julia
eachline(io::IO=stdin; keep::Bool=false)
eachline(filename::AbstractString; keep::Bool=false)
```
Create an iterable `EachLine` object that will yield each line from an I/O stream or a file. Iteration calls [`readline`](https://docs.julialang.org/#Base.readline) on the stream argument repeatedly with `keep` passed through, determining whether trailing end-of-line characters are retained. When called with a file name, the file is opened once at the beginning of iteration and closed at the end. If iteration is interrupted, the file will be closed when the `EachLine` object is garbage collected.

To iterate over each line of a `String`, `eachline(IOBuffer(str))` can be used.

[`Iterators.reverse`](https://docs.julialang.org/../iterators/#Base.Iterators.reverse) can be used on an `EachLine` object to read the lines in reverse order (for files, buffers, and other I/O streams supporting [`seek`](https://docs.julialang.org/#Base.seek)), and [`first`](https://docs.julialang.org/../collections/#Base.first) or [`last`](https://docs.julialang.org/../collections/#Base.last) can be used to extract the initial or final lines, respectively.

**Examples**


```julia
julia> open("my_file.txt", "w") do io
           write(io, "JuliaLang is a GitHub organization.n It has many members.n");
       end;

julia> for line in eachline("my_file.txt")
           print(line)
       end
JuliaLang is a GitHub organization. It has many members.

julia> rm("my_file.txt");
```
Julia 1.8 is required to use `Iterators.reverse` or `last` with `eachline` iterators.

[source](https://github.com/JuliaLang/julia/blob/17cfb8e65ead377bf1b4598d8a9869144142c84e/base/io.jl#L1017-L1051)
```julia
displaysize([io::IO]) -> (lines, columns)
```
Return the nominal size of the screen that may be used for rendering output to this `IO` object. If no input is provided, the environment variables `LINES` and `COLUMNS` are read. If those are not set, a default size of `(24, 80)` is returned.

**Examples**


```julia
julia> withenv("LINES" => 30, "COLUMNS" => 100) do
           displaysize()
       end
(30, 100)
```
To get your TTY size,


```julia
julia> displaysize(stdout)
(34, 147)
```
[source](https://github.com/JuliaLang/julia/blob/17cfb8e65ead377bf1b4598d8a9869144142c84e/base/stream.jl#L537-L559)Just as text output is performed by [`print`](https://docs.julialang.org/#Base.print) and user-defined types can indicate their textual representation by overloading [`show`](https://docs.julialang.org/#Base.show-Tuple%7BIO,%20Any%7D), Julia provides a standardized mechanism for rich multimedia output (such as images, formatted text, or even audio and video), consisting of three parts:

* A function [`display(x)`](https://docs.julialang.org/#Base.Multimedia.display) to request the richest available multimedia display of a Julia object `x` (with a plain-text fallback).
* Overloading [`show`](https://docs.julialang.org/#Base.show-Tuple%7BIO,%20Any%7D) allows one to indicate arbitrary multimedia representations (keyed by standard MIME types) of user-defined types.
* Multimedia-capable display backends may be registered by subclassing a generic [`AbstractDisplay`](https://docs.julialang.org/#Base.Multimedia.AbstractDisplay) type and pushing them onto a stack of display backends via [`pushdisplay`](https://docs.julialang.org/#Base.Multimedia.pushdisplay).

The base Julia runtime provides only plain-text display, but richer displays may be enabled by loading external modules or by using graphical Julia environments (such as the IPython-based IJulia notebook).


```julia
AbstractDisplay
```
Abstract supertype for rich display output devices. [`TextDisplay`](https://docs.julialang.org/#Base.Multimedia.TextDisplay) is a subtype of this.

[source](https://github.com/JuliaLang/julia/blob/17cfb8e65ead377bf1b4598d8a9869144142c84e/base/multimedia.jl#L207-L212)
```julia
display(x)
display(d::AbstractDisplay, x)
display(mime, x)
display(d::AbstractDisplay, mime, x)
```
Display `x` using the topmost applicable display in the display stack, typically using the richest supported multimedia output for `x`, with plain-text [`stdout`](https://docs.julialang.org/#Base.stdout) output as a fallback. The `display(d, x)` variant attempts to display `x` on the given display `d` only, throwing a [`MethodError`](https://docs.julialang.org/../base/#Core.MethodError) if `d` cannot display objects of this type.

In general, you cannot assume that `display` output goes to `stdout` (unlike [`print(x)`](https://docs.julialang.org/#Base.print) or [`show(x)`](https://docs.julialang.org/#Base.show-Tuple%7BIO,%20Any%7D)). For example, `display(x)` may open up a separate window with an image. `display(x)` means "show `x` in the best way you can for the current output device(s)." If you want REPL-like text output that is guaranteed to go to `stdout`, use [`show(stdout, "text/plain", x)`](https://docs.julialang.org/#Base.show-Tuple%7BIO,%20Any%7D) instead.

There are also two variants with a `mime` argument (a MIME type string, such as `"image/png"`), which attempt to display `x` using the requested MIME type *only*, throwing a `MethodError` if this type is not supported by either the display(s) or by `x`. With these variants, one can also supply the "raw" data in the requested MIME type by passing `x::AbstractString` (for MIME types with text-based storage, such as text/html or application/postscript) or `x::Vector{UInt8}` (for binary MIME types).

To customize how instances of a type are displayed, overload [`show`](https://docs.julialang.org/#Base.show-Tuple%7BIO,%20Any%7D) rather than `display`, as explained in the manual section on [custom pretty-printing](../../manual/types/#man-custom-pretty-printing).

[source](https://github.com/JuliaLang/julia/blob/17cfb8e65ead377bf1b4598d8a9869144142c84e/base/multimedia.jl#L297-L323)
```julia
redisplay(x)
redisplay(d::AbstractDisplay, x)
redisplay(mime, x)
redisplay(d::AbstractDisplay, mime, x)
```
By default, the `redisplay` functions simply call [`display`](https://docs.julialang.org/#Base.Multimedia.display). However, some display backends may override `redisplay` to modify an existing display of `x` (if any). Using `redisplay` is also a hint to the backend that `x` may be redisplayed several times, and the backend may choose to defer the display until (for example) the next interactive prompt.

[source](https://github.com/JuliaLang/julia/blob/17cfb8e65ead377bf1b4598d8a9869144142c84e/base/multimedia.jl#L370-L382)
```julia
displayable(mime) -> Bool
displayable(d::AbstractDisplay, mime) -> Bool
```
Returns a boolean value indicating whether the given `mime` type (string) is displayable by any of the displays in the current display stack, or specifically by the display `d` in the second variant.

[source](https://github.com/JuliaLang/julia/blob/17cfb8e65ead377bf1b4598d8a9869144142c84e/base/multimedia.jl#L219-L226)
```julia
show(io::IO, mime, x)
```
The [`display`](https://docs.julialang.org/#Base.Multimedia.display) functions ultimately call `show` in order to write an object `x` as a given `mime` type to a given I/O stream `io` (usually a memory buffer), if possible. In order to provide a rich multimedia representation of a user-defined type `T`, it is only necessary to define a new `show` method for `T`, via: `show(io, ::MIME"mime", x::T) = ...`, where `mime` is a MIME-type string and the function body calls [`write`](https://docs.julialang.org/#Base.write) (or similar) to write that representation of `x` to `io`. (Note that the `MIME""` notation only supports literal strings; to construct `MIME` types in a more flexible manner use `MIME{Symbol("")}`.)

For example, if you define a `MyImage` type and know how to write it to a PNG file, you could define a function `show(io, ::MIME"image/png", x::MyImage) = ...` to allow your images to be displayed on any PNG-capable `AbstractDisplay` (such as IJulia). As usual, be sure to `import Base.show` in order to add new methods to the built-in Julia function `show`.

Technically, the `MIME"mime"` macro defines a singleton type for the given `mime` string, which allows us to exploit Julia's dispatch mechanisms in determining how to display objects of any given type.

The default MIME type is `MIME"text/plain"`. There is a fallback definition for `text/plain` output that calls `show` with 2 arguments, so it is not always necessary to add a method for that case. If a type benefits from custom human-readable output though, `show(::IO, ::MIME"text/plain", ::T)` should be defined. For example, the `Day` type uses `1 day` as the output for the `text/plain` MIME type, and `Day(1)` as the output of 2-argument `show`.

Container types generally implement 3-argument `show` by calling `show(io, MIME"text/plain"(), x)` for elements `x`, with `:compact => true` set in an [`IOContext`](https://docs.julialang.org/#Base.IOContext) passed as the first argument.

[source](https://github.com/JuliaLang/julia/blob/17cfb8e65ead377bf1b4598d8a9869144142c84e/base/multimedia.jl#L79-L109)
```julia
showable(mime, x)
```
Returns a boolean value indicating whether or not the object `x` can be written as the given `mime` type.

(By default, this is determined automatically by the existence of the corresponding [`show`](https://docs.julialang.org/#Base.show-Tuple%7BIO,%20Any%7D) method for `typeof(x)`. Some types provide custom `showable` methods; for example, if the available MIME formats depend on the *value* of `x`.)

**Examples**


```julia
julia> showable(MIME("text/plain"), rand(5))
true

julia> showable("image/png", rand(5))
false
```
[source](https://github.com/JuliaLang/julia/blob/17cfb8e65ead377bf1b4598d8a9869144142c84e/base/multimedia.jl#L57-L75)
```julia
repr(mime, x; context=nothing)
```
Returns an `AbstractString` or `Vector{UInt8}` containing the representation of `x` in the requested `mime` type, as written by [`show(io, mime, x)`](https://docs.julialang.org/#Base.show-Tuple%7BIO,%20Any%7D) (throwing a [`MethodError`](https://docs.julialang.org/../base/#Core.MethodError) if no appropriate `show` is available). An `AbstractString` is returned for MIME types with textual representations (such as `"text/html"` or `"application/postscript"`), whereas binary data is returned as `Vector{UInt8}`. (The function `istextmime(mime)` returns whether or not Julia treats a given `mime` type as text.)

The optional keyword argument `context` can be set to `:key=>value` pair or an `IO` or [`IOContext`](https://docs.julialang.org/#Base.IOContext) object whose attributes are used for the I/O stream passed to `show`.

As a special case, if `x` is an `AbstractString` (for textual MIME types) or a `Vector{UInt8}` (for binary MIME types), the `repr` function assumes that `x` is already in the requested `mime` format and simply returns `x`. This special case does not apply to the `"text/plain"` MIME type. This is useful so that raw data can be passed to `display(m::MIME, x)`.

In particular, `repr("text/plain", x)` is typically a "pretty-printed" version of `x` designed for human consumption. See also [`repr(x)`](https://docs.julialang.org/../strings/#Base.repr-Tuple%7BAny%7D) to instead return a string corresponding to [`show(x)`](https://docs.julialang.org/#Base.show-Tuple%7BIO,%20Any%7D) that may be closer to how the value of `x` would be entered in Julia.

**Examples**


```julia
julia> A = [1 2; 3 4];

julia> repr("text/plain", A)
"2×2 Matrix{Int64}:n 1  2n 3  4"
```
[source](https://github.com/JuliaLang/julia/blob/17cfb8e65ead377bf1b4598d8a9869144142c84e/base/multimedia.jl#L113-L146)
```julia
MIME
```
A type representing a standard internet data format. "MIME" stands for "Multipurpose Internet Mail Extensions", since the standard was originally used to describe multimedia attachments to email messages.

A `MIME` object can be passed as the second argument to [`show`](https://docs.julialang.org/#Base.show-Tuple%7BIO,%20Any%7D) to request output in that format.

**Examples**


```julia
julia> show(stdout, MIME("text/plain"), "hi")
"hi"
```
[source](https://github.com/JuliaLang/julia/blob/17cfb8e65ead377bf1b4598d8a9869144142c84e/base/multimedia.jl#L16-L31)
```julia
@MIME_str
```
A convenience macro for writing [`MIME`](https://docs.julialang.org/#Base.Multimedia.MIME) types, typically used when adding methods to [`show`](https://docs.julialang.org/#Base.show-Tuple%7BIO,%20Any%7D). For example the syntax `show(io::IO, ::MIME"text/html", x::MyType) = ...` could be used to define how to write an HTML representation of `MyType`.

[source](https://github.com/JuliaLang/julia/blob/17cfb8e65ead377bf1b4598d8a9869144142c84e/base/multimedia.jl#L34-L41)As mentioned above, one can also define new display backends. For example, a module that can display PNG images in a window can register this capability with Julia, so that calling [`display(x)`](https://docs.julialang.org/#Base.Multimedia.display) on types with PNG representations will automatically display the image using the module's window.

In order to define a new display backend, one should first create a subtype `D` of the abstract class [`AbstractDisplay`](https://docs.julialang.org/#Base.Multimedia.AbstractDisplay). Then, for each MIME type (`mime` string) that can be displayed on `D`, one should define a function `display(d::D, ::MIME"mime", x) = ...` that displays `x` as that MIME type, usually by calling [`show(io, mime, x)`](https://docs.julialang.org/#Base.show-Tuple%7BIO,%20Any%7D) or [`repr(io, mime, x)`](https://docs.julialang.org/#Base.repr-Tuple%7BMIME,%20Any%7D). A [`MethodError`](https://docs.julialang.org/../base/#Core.MethodError) should be thrown if `x` cannot be displayed as that MIME type; this is automatic if one calls `show` or `repr`. Finally, one should define a function `display(d::D, x)` that queries [`showable(mime, x)`](https://docs.julialang.org/#Base.Multimedia.showable) for the `mime` types supported by `D` and displays the "best" one; a `MethodError` should be thrown if no supported MIME types are found for `x`. Similarly, some subtypes may wish to override [`redisplay(d::D, ...)`](https://docs.julialang.org/#Base.Multimedia.redisplay). (Again, one should `import Base.display` to add new methods to `display`.) The return values of these functions are up to the implementation (since in some cases it may be useful to return a display "handle" of some type). The display functions for `D` can then be called directly, but they can also be invoked automatically from [`display(x)`](https://docs.julialang.org/#Base.Multimedia.display) simply by pushing a new display onto the display-backend stack with:


```julia
pushdisplay(d::AbstractDisplay)
```
Pushes a new display `d` on top of the global display-backend stack. Calling `display(x)` or `display(mime, x)` will display `x` on the topmost compatible backend in the stack (i.e., the topmost backend that does not throw a [`MethodError`](../base/#Core.MethodError)).

[source](https://github.com/JuliaLang/julia/blob/17cfb8e65ead377bf1b4598d8a9869144142c84e/base/multimedia.jl#L262-L268)
```julia
popdisplay()
popdisplay(d::AbstractDisplay)
```
Pop the topmost backend off of the display-backend stack, or the topmost copy of `d` in the second variant.

[source](https://github.com/JuliaLang/julia/blob/17cfb8e65ead377bf1b4598d8a9869144142c84e/base/multimedia.jl#L274-L280)
```julia
TextDisplay(io::IO)
```
Returns a `TextDisplay <: AbstractDisplay`, which displays any object as the text/plain MIME type (by default), writing the text representation to the given I/O stream. (This is how objects are printed in the Julia REPL.)

[source](https://github.com/JuliaLang/julia/blob/17cfb8e65ead377bf1b4598d8a9869144142c84e/base/multimedia.jl#L232-L238)
```julia
istextmime(m::MIME)
```
Determine whether a MIME type is text data. MIME types are assumed to be binary data except for a set of types known to be text data (possibly Unicode).

**Examples**


```julia
julia> istextmime(MIME("text/plain"))
true

julia> istextmime(MIME("image/png"))
false
```
[source](https://github.com/JuliaLang/julia/blob/17cfb8e65ead377bf1b4598d8a9869144142c84e/base/multimedia.jl#L168-L182)
```julia
bytesavailable(io)
```
Return the number of bytes available for reading before a read from this stream or buffer will block.

**Examples**


```julia
julia> io = IOBuffer("JuliaLang is a GitHub organization");

julia> bytesavailable(io)
34
```
[source](https://github.com/JuliaLang/julia/blob/17cfb8e65ead377bf1b4598d8a9869144142c84e/base/io.jl#L94-L106)
```julia
ntoh(x)
```
Convert the endianness of a value from Network byte order (big-endian) to that used by the Host.

[source](https://github.com/JuliaLang/julia/blob/17cfb8e65ead377bf1b4598d8a9869144142c84e/base/io.jl#L621-L625)
```julia
hton(x)
```
Convert the endianness of a value from that used by the Host to Network byte order (big-endian).

[source](https://github.com/JuliaLang/julia/blob/17cfb8e65ead377bf1b4598d8a9869144142c84e/base/io.jl#L628-L632)
```julia
ltoh(x)
```
Convert the endianness of a value from Little-endian to that used by the Host.

[source](https://github.com/JuliaLang/julia/blob/17cfb8e65ead377bf1b4598d8a9869144142c84e/base/io.jl#L635-L639)
```julia
htol(x)
```
Convert the endianness of a value from that used by the Host to Little-endian.

[source](https://github.com/JuliaLang/julia/blob/17cfb8e65ead377bf1b4598d8a9869144142c84e/base/io.jl#L642-L646)
```julia
ENDIAN_BOM
```
The 32-bit byte-order-mark indicates the native byte order of the host machine. Little-endian machines will contain the value `0x04030201`. Big-endian machines will contain the value `0x01020304`.

[source](https://github.com/JuliaLang/julia/blob/17cfb8e65ead377bf1b4598d8a9869144142c84e/base/io.jl#L612-L618)


