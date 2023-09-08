TOML.jl is a Julia standard library for parsing and writing [TOML v1.0](https://toml.io/en/) files.


```julia
julia> using TOML

julia> data = """
           [database]
           server = "192.168.1.1"
           ports = [ 8001, 8001, 8002 ]
       """;

julia> TOML.parse(data)
Dict{String, Any} with 1 entry:
  "database" => Dict{String, Any}("server"=>"192.168.1.1", "ports"=>[8001, 8001…
```
To parse a file, use [`TOML.parsefile`](https://docs.julialang.org/#TOML.parsefile). If the file has a syntax error, an exception is thrown:


```julia
julia> using TOML

julia> TOML.parse("""
           value = 0.0.0
       """)
ERROR: TOML Parser error:
none:1:16 error: failed to parse value
      value = 0.0.0
                 ^
[...]
```
There are other versions of the parse functions ([`TOML.tryparse`](https://docs.julialang.org/#TOML.tryparse) and [`TOML.tryparsefile`]) that instead of throwing exceptions on parser error returns a [`TOML.ParserError`](https://docs.julialang.org/#TOML.ParserError) with information:


```julia
julia> using TOML

julia> err = TOML.tryparse("""
           value = 0.0.0
       """);

julia> err.type
ErrGenericValueError::ErrorType = 14

julia> err.line
1

julia> err.column
16
```
The [`TOML.print`](https://docs.julialang.org/#TOML.print) function is used to print (or serialize) data into TOML format.


```julia
julia> using TOML

julia> data = Dict(
          "names" => ["Julia", "Julio"],
          "age" => [10, 20],
       );

julia> TOML.print(data)
names = ["Julia", "Julio"]
age = [10, 20]

julia> fname = tempname();

julia> open(fname, "w") do io
           TOML.print(io, data)
       end

julia> TOML.parsefile(fname)
Dict{String, Any} with 2 entries:
  "names" => ["Julia", "Julio"]
  "age"   => [10, 20]
```
Keys can be sorted according to some value


```julia
julia> using TOML

julia> TOML.print(Dict(
       "abc"  => 1,
       "ab"   => 2,
       "abcd" => 3,
       ); sorted=true, by=length)
ab = 2
abc = 1
abcd = 3
```
For custom structs, pass a function that converts the struct to a supported type


```julia
julia> using TOML

julia> struct MyStruct
           a::Int
           b::String
       end

julia> TOML.print(Dict("foo" => MyStruct(5, "bar"))) do x
           x isa MyStruct && return [x.a, x.b]
           error("unhandled type $(typeof(x))")
       end
foo = [5, "bar"]
```

```julia
parse(x::Union{AbstractString, IO})
parse(p::Parser, x::Union{AbstractString, IO})
```
Parse the string or stream `x`, and return the resulting table (dictionary). Throw a [`ParserError`](https://docs.julialang.org/#TOML.ParserError) upon failure.

See also [`TOML.tryparse`](https://docs.julialang.org/#TOML.tryparse).


```julia
parsefile(f::AbstractString)
parsefile(p::Parser, f::AbstractString)
```
Parse file `f` and return the resulting table (dictionary). Throw a [`ParserError`](https://docs.julialang.org/#TOML.ParserError) upon failure.

See also [`TOML.tryparsefile`](https://docs.julialang.org/#TOML.tryparsefile).


```julia
tryparse(x::Union{AbstractString, IO})
tryparse(p::Parser, x::Union{AbstractString, IO})
```
Parse the string or stream `x`, and return the resulting table (dictionary). Return a [`ParserError`](https://docs.julialang.org/#TOML.ParserError) upon failure.

See also [`TOML.parse`](https://docs.julialang.org/#TOML.parse).


```julia
tryparsefile(f::AbstractString)
tryparsefile(p::Parser, f::AbstractString)
```
Parse file `f` and return the resulting table (dictionary). Return a [`ParserError`](https://docs.julialang.org/#TOML.ParserError) upon failure.

See also [`TOML.parsefile`](https://docs.julialang.org/#TOML.parsefile).


```julia
print([to_toml::Function], io::IO [=stdout], data::AbstractDict; sorted=false, by=identity)
```
Write `data` as TOML syntax to the stream `io`. If the keyword argument `sorted` is set to `true`, sort tables according to the function given by the keyword argument `by`.

The following data types are supported: `AbstractDict`, `Integer`, `AbstractFloat`, `Bool`, `Dates.DateTime`, `Dates.Time`, `Dates.Date`. Note that the integers and floats need to be convertible to `Float64` and `Int64` respectively. For other data types, pass the function `to_toml` that takes the data types and returns a value of a supported type.


```julia
Parser()
```
Constructor for a TOML `Parser`. Note that in most cases one does not need to explicitly create a `Parser` but instead one directly use use [`TOML.parsefile`](https://docs.julialang.org/#TOML.parsefile) or [`TOML.parse`](https://docs.julialang.org/#TOML.parse). Using an explicit parser will however reuse some internal data structures which can be beneficial for performance if a larger number of small files are parsed.


```julia
ParserError
```
Type that is returned from [`tryparse`](https://docs.julialang.org/#TOML.tryparse) and [`tryparsefile`](https://docs.julialang.org/#TOML.tryparsefile) when parsing fails. It contains (among others) the following fields:

* `pos`, the position in the string when the error happened
* `table`, the result that so far was successfully parsed
* `type`, an error type, different for different types of errors



