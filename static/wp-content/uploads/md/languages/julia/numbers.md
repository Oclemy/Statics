
```julia
Number
```
Abstract supertype for all number types.

[source](https://github.com/JuliaLang/julia/blob/17cfb8e65ead377bf1b4598d8a9869144142c84e/base/docs/basedocs.jl#L1775-L1779)
```julia
Real <: Number
```
Abstract supertype for all real numbers.

[source](https://github.com/JuliaLang/julia/blob/17cfb8e65ead377bf1b4598d8a9869144142c84e/base/docs/basedocs.jl#L1782-L1786)
```julia
AbstractFloat <: Real
```
Abstract supertype for all floating point numbers.

[source](https://github.com/JuliaLang/julia/blob/17cfb8e65ead377bf1b4598d8a9869144142c84e/base/docs/basedocs.jl#L1789-L1793)
```julia
Integer <: Real
```
Abstract supertype for all integers.

[source](https://github.com/JuliaLang/julia/blob/17cfb8e65ead377bf1b4598d8a9869144142c84e/base/docs/basedocs.jl#L1796-L1800)
```julia
Signed <: Integer
```
Abstract supertype for all signed integers.

[source](https://github.com/JuliaLang/julia/blob/17cfb8e65ead377bf1b4598d8a9869144142c84e/base/docs/basedocs.jl#L1803-L1807)
```julia
Unsigned <: Integer
```
Abstract supertype for all unsigned integers.

[source](https://github.com/JuliaLang/julia/blob/17cfb8e65ead377bf1b4598d8a9869144142c84e/base/docs/basedocs.jl#L1810-L1814)
```julia
AbstractIrrational <: Real
```
Number type representing an exact irrational value, which is automatically rounded to the correct precision in arithmetic operations with other numeric quantities.

Subtypes `MyIrrational <: AbstractIrrational` should implement at least `==(::MyIrrational, ::MyIrrational)`, `hash(x::MyIrrational, h::UInt)`, and `convert(::Type{F}, x::MyIrrational) where {F <: Union{BigFloat,Float32,Float64}}`.

If a subtype is used to represent values that may occasionally be rational (e.g. a square-root type that represents `√n` for integers `n` will give a rational result when `n` is a perfect square), then it should also implement `isinteger`, `iszero`, `isone`, and `==` with `Real` values (since all of these default to `false` for `AbstractIrrational` types), as well as defining [`hash`](https://docs.julialang.org/../base/#Base.hash) to equal that of the corresponding `Rational`.

[source](https://github.com/JuliaLang/julia/blob/17cfb8e65ead377bf1b4598d8a9869144142c84e/base/irrationals.jl#L5-L18)
```julia
Float16 <: AbstractFloat
```
16-bit floating point number type (IEEE 754 standard).

Binary format: 1 sign, 5 exponent, 10 fraction bits.

[source](https://github.com/JuliaLang/julia/blob/17cfb8e65ead377bf1b4598d8a9869144142c84e/base/docs/basedocs.jl#L1846-L1852)
```julia
Float32 <: AbstractFloat
```
32-bit floating point number type (IEEE 754 standard).

Binary format: 1 sign, 8 exponent, 23 fraction bits.

[source](https://github.com/JuliaLang/julia/blob/17cfb8e65ead377bf1b4598d8a9869144142c84e/base/docs/basedocs.jl#L1846-L1852)
```julia
Float64 <: AbstractFloat
```
64-bit floating point number type (IEEE 754 standard).

Binary format: 1 sign, 11 exponent, 52 fraction bits.

[source](https://github.com/JuliaLang/julia/blob/17cfb8e65ead377bf1b4598d8a9869144142c84e/base/docs/basedocs.jl#L1846-L1852)
```julia
BigFloat <: AbstractFloat
```
Arbitrary precision floating point number type.

[source](https://github.com/JuliaLang/julia/blob/17cfb8e65ead377bf1b4598d8a9869144142c84e/base/mpfr.jl#L85-L89)
```julia
Bool <: Integer
```
Boolean type, containing the values `true` and `false`.

`Bool` is a kind of number: `false` is numerically equal to `0` and `true` is numerically equal to `1`. Moreover, `false` acts as a multiplicative "strong zero":


```julia
julia> false == 0
true

julia> true == 1
true

julia> 0 * NaN
NaN

julia> false * NaN
0.0
```
See also: [`digits`](https://docs.julialang.org/#Base.digits), [`iszero`](https://docs.julialang.org/#Base.iszero), [`NaN`](#Base.NaN).

[source](https://github.com/JuliaLang/julia/blob/17cfb8e65ead377bf1b4598d8a9869144142c84e/base/docs/basedocs.jl#L1817-L1841)
```julia
Int8 <: Signed
```
8-bit signed integer type.

[source](https://github.com/JuliaLang/julia/blob/17cfb8e65ead377bf1b4598d8a9869144142c84e/base/docs/basedocs.jl#L1859-L1863)
```julia
UInt8 <: Unsigned
```
8-bit unsigned integer type.

[source](https://github.com/JuliaLang/julia/blob/17cfb8e65ead377bf1b4598d8a9869144142c84e/base/docs/basedocs.jl#L1866-L1870)
```julia
Int16 <: Signed
```
16-bit signed integer type.

[source](https://github.com/JuliaLang/julia/blob/17cfb8e65ead377bf1b4598d8a9869144142c84e/base/docs/basedocs.jl#L1859-L1863)
```julia
UInt16 <: Unsigned
```
16-bit unsigned integer type.

[source](https://github.com/JuliaLang/julia/blob/17cfb8e65ead377bf1b4598d8a9869144142c84e/base/docs/basedocs.jl#L1866-L1870)
```julia
Int32 <: Signed
```
32-bit signed integer type.

[source](https://github.com/JuliaLang/julia/blob/17cfb8e65ead377bf1b4598d8a9869144142c84e/base/docs/basedocs.jl#L1859-L1863)
```julia
UInt32 <: Unsigned
```
32-bit unsigned integer type.

[source](https://github.com/JuliaLang/julia/blob/17cfb8e65ead377bf1b4598d8a9869144142c84e/base/docs/basedocs.jl#L1866-L1870)
```julia
Int64 <: Signed
```
64-bit signed integer type.

[source](https://github.com/JuliaLang/julia/blob/17cfb8e65ead377bf1b4598d8a9869144142c84e/base/docs/basedocs.jl#L1859-L1863)
```julia
UInt64 <: Unsigned
```
64-bit unsigned integer type.

[source](https://github.com/JuliaLang/julia/blob/17cfb8e65ead377bf1b4598d8a9869144142c84e/base/docs/basedocs.jl#L1866-L1870)
```julia
Int128 <: Signed
```
128-bit signed integer type.

[source](https://github.com/JuliaLang/julia/blob/17cfb8e65ead377bf1b4598d8a9869144142c84e/base/docs/basedocs.jl#L1859-L1863)
```julia
UInt128 <: Unsigned
```
128-bit unsigned integer type.

[source](https://github.com/JuliaLang/julia/blob/17cfb8e65ead377bf1b4598d8a9869144142c84e/base/docs/basedocs.jl#L1866-L1870)
```julia
BigInt <: Signed
```
Arbitrary precision integer type.

[source](https://github.com/JuliaLang/julia/blob/17cfb8e65ead377bf1b4598d8a9869144142c84e/base/gmp.jl#L45-L49)
```julia
Complex{T<:Real} <: Number
```
Complex number type with real and imaginary part of type `T`.

`ComplexF16`, `ComplexF32` and `ComplexF64` are aliases for `Complex{Float16}`, `Complex{Float32}` and `Complex{Float64}` respectively.

See also: [`Real`](https://docs.julialang.org/#Core.Real), [`complex`](https://docs.julialang.org/#Base.complex-Tuple%7BComplex%7D), [`real`](../math/#Base.real).

[source](https://github.com/JuliaLang/julia/blob/17cfb8e65ead377bf1b4598d8a9869144142c84e/base/complex.jl#L3-L12)
```julia
Rational{T<:Integer} <: Real
```
Rational number type, with numerator and denominator of type `T`. Rationals are checked for overflow.

[source](https://github.com/JuliaLang/julia/blob/17cfb8e65ead377bf1b4598d8a9869144142c84e/base/rational.jl#L3-L8)
```julia
Irrational{sym} <: AbstractIrrational
```
Number type representing an exact irrational value denoted by the symbol `sym`, such as [`π`](https://docs.julialang.org/#Base.MathConstants.pi), [`ℯ`](https://docs.julialang.org/#Base.MathConstants.%E2%84%AF) and [`γ`](https://docs.julialang.org/#Base.MathConstants.eulergamma).

See also [`@irrational`], [`AbstractIrrational`](#Base.AbstractIrrational).

[source](https://github.com/JuliaLang/julia/blob/17cfb8e65ead377bf1b4598d8a9869144142c84e/base/irrationals.jl#L21-L28)
```julia
digits([T<:Integer], n::Integer; base::T = 10, pad::Integer = 1)
```
Return an array with element type `T` (default `Int`) of the digits of `n` in the given base, optionally padded with zeros to a specified size. More significant digits are at higher indices, such that `n == sum(digits[k]*base^(k-1) for k=1:length(digits))`.

See also [`ndigits`](https://docs.julialang.org/../math/#Base.ndigits), [`digits!`](https://docs.julialang.org/#Base.digits!), and for base 2 also [`bitstring`](https://docs.julialang.org/#Base.bitstring), [`count_ones`](https://docs.julialang.org/#Base.count_ones).

**Examples**


```julia
julia> digits(10)
2-element Vector{Int64}:
 0
 1

julia> digits(10, base = 2)
4-element Vector{Int64}:
 0
 1
 0
 1

julia> digits(-256, base = 10, pad = 5)
5-element Vector{Int64}:
 -6
 -5
 -2
  0
  0

julia> n = rand(-999:999);

julia> n == evalpoly(13, digits(n, base = 13))
true
```
[source](https://github.com/JuliaLang/julia/blob/17cfb8e65ead377bf1b4598d8a9869144142c84e/base/intfuncs.jl#L846-L883)
```julia
digits!(array, n::Integer; base::Integer = 10)
```
Fills an array of the digits of `n` in the given base. More significant digits are at higher indices. If the array length is insufficient, the least significant digits are filled up to the array length. If the array length is excessive, the excess portion is filled with zeros.

**Examples**


```julia
julia> digits!([2, 2, 2, 2], 10, base = 2)
4-element Vector{Int64}:
 0
 1
 0
 1

julia> digits!([2, 2, 2, 2, 2, 2], 10, base = 2)
6-element Vector{Int64}:
 0
 1
 0
 1
 0
 0
```
[source](https://github.com/JuliaLang/julia/blob/17cfb8e65ead377bf1b4598d8a9869144142c84e/base/intfuncs.jl#L900-L925)
```julia
bitstring(n)
```
A string giving the literal bit representation of a primitive type.

See also [`count_ones`](https://docs.julialang.org/#Base.count_ones), [`count_zeros`](https://docs.julialang.org/#Base.count_zeros), [`digits`](https://docs.julialang.org/#Base.digits).

**Examples**


```julia
julia> bitstring(Int32(4))
"00000000000000000000000000000100"

julia> bitstring(2.2)
"0100000000000001100110011001100110011001100110011001100110011010"
```
[source](https://github.com/JuliaLang/julia/blob/17cfb8e65ead377bf1b4598d8a9869144142c84e/base/intfuncs.jl#L812-L827)
```julia
parse(::Type{Platform}, triplet::AbstractString)
```
Parses a string platform triplet back into a `Platform` object.

[source](https://github.com/JuliaLang/julia/blob/17cfb8e65ead377bf1b4598d8a9869144142c84e/base/binaryplatforms.jl#L665-L669)
```julia
parse(type, str; base)
```
Parse a string as a number. For `Integer` types, a base can be specified (the default is 10). For floating-point types, the string is parsed as a decimal floating-point number. `Complex` types are parsed from decimal strings of the form `"R±Iim"` as a `Complex(R,I)` of the requested type; `"i"` or `"j"` can also be used instead of `"im"`, and `"R"` or `"Iim"` are also permitted. If the string does not contain a valid number, an error is raised.

`parse(Bool, str)` requires at least Julia 1.1.

**Examples**


```julia
julia> parse(Int, "1234")
1234

julia> parse(Int, "1234", base = 5)
194

julia> parse(Int, "afc", base = 16)
2812

julia> parse(Float64, "1.2e-3")
0.0012

julia> parse(Complex{Float64}, "3.2e-1 + 4.5im")
0.32 + 4.5im
```
[source](https://github.com/JuliaLang/julia/blob/17cfb8e65ead377bf1b4598d8a9869144142c84e/base/parse.jl#L7-L37)
```julia
tryparse(type, str; base)
```
Like [`parse`](https://docs.julialang.org/#Base.parse), but returns either a value of the requested type, or [`nothing`](https://docs.julialang.org/../constants/#Core.nothing) if the string does not contain a valid number.

[source](https://github.com/JuliaLang/julia/blob/17cfb8e65ead377bf1b4598d8a9869144142c84e/base/parse.jl#L229-L234)
```julia
big(x)
```
Convert a number to a maximum precision representation (typically [`BigInt`](https://docs.julialang.org/#Base.GMP.BigInt) or `BigFloat`). See [`BigFloat`](https://docs.julialang.org/#Base.MPFR.BigFloat-Tuple%7BAny,%20RoundingMode%7D) for information about some pitfalls with floating-point numbers.

[source](https://github.com/JuliaLang/julia/blob/17cfb8e65ead377bf1b4598d8a9869144142c84e/base/gmp.jl#L462-L468)
```julia
signed(T::Integer)
```
Convert an integer bitstype to the signed type of the same size.

**Examples**


```julia
julia> signed(UInt16)
Int16
julia> signed(UInt64)
Int64
```
[source](https://github.com/JuliaLang/julia/blob/17cfb8e65ead377bf1b4598d8a9869144142c84e/base/int.jl#L61-L72)
```julia
signed(x)
```
Convert a number to a signed integer. If the argument is unsigned, it is reinterpreted as signed without checking for overflow.

See also: [`unsigned`](https://docs.julialang.org/#Base.unsigned), [`sign`](https://docs.julialang.org/../math/#Base.sign), [`signbit`](../math/#Base.signbit).

[source](https://github.com/JuliaLang/julia/blob/17cfb8e65ead377bf1b4598d8a9869144142c84e/base/int.jl#L211-L218)
```julia
unsigned(T::Integer)
```
Convert an integer bitstype to the unsigned type of the same size.

**Examples**


```julia
julia> unsigned(Int16)
UInt16
julia> unsigned(UInt64)
UInt64
```
[source](https://github.com/JuliaLang/julia/blob/17cfb8e65ead377bf1b4598d8a9869144142c84e/base/int.jl#L48-L59)
```julia
float(x)
```
Convert a number or array to a floating point data type.

See also: [`complex`](https://docs.julialang.org/#Base.complex-Tuple%7BComplex%7D), [`oftype`](https://docs.julialang.org/../base/#Base.oftype), [`convert`](https://docs.julialang.org/../base/#Base.convert).

**Examples**


```julia
julia> float(1:1000)
1.0:1.0:1000.0

julia> float(typemax(Int32))
2.147483647e9
```
[source](https://github.com/JuliaLang/julia/blob/17cfb8e65ead377bf1b4598d8a9869144142c84e/base/float.jl#L253-L268)
```julia
significand(x)
```
Extract the significand (a.k.a. mantissa) of a floating-point number. If `x` is a non-zero finite number, then the result will be a number of the same type and sign as `x`, and whose absolute value is on the interval $[1,2)$. Otherwise `x` is returned.

**Examples**


```julia
julia> significand(15.2)
1.9

julia> significand(-15.2)
-1.9

julia> significand(-15.2) * 2^3
-15.2

julia> significand(-Inf), significand(Inf), significand(NaN)
(-Inf, Inf, NaN)
```
[source](https://github.com/JuliaLang/julia/blob/17cfb8e65ead377bf1b4598d8a9869144142c84e/base/math.jl#L872-L894)
```julia
exponent(x::AbstractFloat) -> Int
```
Get the exponent of a normalized floating-point number. Returns the largest integer `y` such that `2^y ≤ abs(x)`.

**Examples**


```julia
julia> exponent(6.5)
2

julia> exponent(16.0)
4
```
[source](https://github.com/JuliaLang/julia/blob/17cfb8e65ead377bf1b4598d8a9869144142c84e/base/math.jl#L828-L842)
```julia
complex(r, [i])
```
Convert real numbers or arrays to complex. `i` defaults to zero.

**Examples**


```julia
julia> complex(7)
7 + 0im

julia> complex([1, 2, 3])
3-element Vector{Complex{Int64}}:
 1 + 0im
 2 + 0im
 3 + 0im
```
[source](https://github.com/JuliaLang/julia/blob/17cfb8e65ead377bf1b4598d8a9869144142c84e/base/complex.jl#L152-L168)
```julia
bswap(n)
```
Reverse the byte order of `n`.

(See also [`ntoh`](https://docs.julialang.org/../io-network/#Base.ntoh) and [`hton`](https://docs.julialang.org/../io-network/#Base.hton) to convert between the current native byte order and big-endian order.)

**Examples**


```julia
julia> a = bswap(0x10203040)
0x40302010

julia> bswap(a)
0x10203040

julia> string(1, base = 2)
"1"

julia> string(bswap(1), base = 2)
"100000000000000000000000000000000000000000000000000000000"
```
[source](https://github.com/JuliaLang/julia/blob/17cfb8e65ead377bf1b4598d8a9869144142c84e/base/int.jl#L368-L389)
```julia
hex2bytes(itr)
```
Given an iterable `itr` of ASCII codes for a sequence of hexadecimal digits, returns a `Vector{UInt8}` of bytes corresponding to the binary representation: each successive pair of hexadecimal digits in `itr` gives the value of one byte in the return vector.

The length of `itr` must be even, and the returned array has half of the length of `itr`. See also [`hex2bytes!`](https://docs.julialang.org/#Base.hex2bytes!) for an in-place version, and [`bytes2hex`](https://docs.julialang.org/#Base.bytes2hex) for the inverse.

Calling `hex2bytes` with iterators producing `UInt8` values requires Julia 1.7 or later. In earlier versions, you can `collect` the iterator before calling `hex2bytes`.

**Examples**


```julia
julia> s = string(12345, base = 16)
"3039"

julia> hex2bytes(s)
2-element Vector{UInt8}:
 0x30
 0x39

julia> a = b"01abEF"
6-element Base.CodeUnits{UInt8, String}:
 0x30
 0x31
 0x61
 0x62
 0x45
 0x46

julia> hex2bytes(a)
3-element Vector{UInt8}:
 0x01
 0xab
 0xef
```
[source](https://github.com/JuliaLang/julia/blob/17cfb8e65ead377bf1b4598d8a9869144142c84e/base/strings/util.jl#L782-L822)
```julia
hex2bytes!(dest::AbstractVector{UInt8}, itr)
```
Convert an iterable `itr` of bytes representing a hexadecimal string to its binary representation, similar to [`hex2bytes`](https://docs.julialang.org/#Base.hex2bytes) except that the output is written in-place to `dest`. The length of `dest` must be half the length of `itr`.

Calling hex2bytes! with iterators producing UInt8 requires version 1.7. In earlier versions, you can collect the iterable before calling instead.

[source](https://github.com/JuliaLang/julia/blob/17cfb8e65ead377bf1b4598d8a9869144142c84e/base/strings/util.jl#L834-L845)
```julia
bytes2hex(itr) -> String
bytes2hex(io::IO, itr)
```
Convert an iterator `itr` of bytes to its hexadecimal string representation, either returning a `String` via `bytes2hex(itr)` or writing the string to an `io` stream via `bytes2hex(io, itr)`. The hexadecimal characters are all lowercase.

Calling `bytes2hex` with arbitrary iterators producing `UInt8` values requires Julia 1.7 or later. In earlier versions, you can `collect` the iterator before calling `bytes2hex`.

**Examples**


```julia
julia> a = string(12345, base = 16)
"3039"

julia> b = hex2bytes(a)
2-element Vector{UInt8}:
 0x30
 0x39

julia> bytes2hex(b)
"3039"
```
[source](https://github.com/JuliaLang/julia/blob/17cfb8e65ead377bf1b4598d8a9869144142c84e/base/strings/util.jl#L871-L897)
```julia
one(x)
one(T::type)
```
Return a multiplicative identity for `x`: a value such that `one(x)*x == x*one(x) == x`. Alternatively `one(T)` can take a type `T`, in which case `one` returns a multiplicative identity for any `x` of type `T`.

If possible, `one(x)` returns a value of the same type as `x`, and `one(T)` returns a value of type `T`. However, this may not be the case for types representing dimensionful quantities (e.g. time in days), since the multiplicative identity must be dimensionless. In that case, `one(x)` should return an identity value of the same precision (and shape, for matrices) as `x`.

If you want a quantity that is of the same type as `x`, or of type `T`, even if `x` is dimensionful, use [`oneunit`](https://docs.julialang.org/#Base.oneunit) instead.

See also the [`identity`](https://docs.julialang.org/../base/#Base.identity) function, and `I` in [`LinearAlgebra`](https://docs.julialang.org/../../stdlib/LinearAlgebra/#man-linalg) for the identity matrix.

**Examples**


```julia
julia> one(3.7)
1.0

julia> one(Int)
1

julia> import Dates; one(Dates.Day(1))
1
```
[source](https://github.com/JuliaLang/julia/blob/17cfb8e65ead377bf1b4598d8a9869144142c84e/base/number.jl#L299-L333)
```julia
oneunit(x::T)
oneunit(T::Type)
```
Returns `T(one(x))`, where `T` is either the type of the argument or (if a type is passed) the argument. This differs from [`one`](https://docs.julialang.org/#Base.one) for dimensionful quantities: `one` is dimensionless (a multiplicative identity) while `oneunit` is dimensionful (of the same type as `x`, or of type `T`).

**Examples**


```julia
julia> oneunit(3.7)
1.0

julia> import Dates; oneunit(Dates.Day)
1 day
```
[source](https://github.com/JuliaLang/julia/blob/17cfb8e65ead377bf1b4598d8a9869144142c84e/base/number.jl#L339-L356)
```julia
zero(x)
zero(::Type)
```
Get the additive identity element for the type of `x` (`x` can also specify the type itself).

See also [`iszero`](https://docs.julialang.org/#Base.iszero), [`one`](https://docs.julialang.org/#Base.one), [`oneunit`](https://docs.julialang.org/#Base.oneunit), [`oftype`](https://docs.julialang.org/../base/#Base.oftype).

**Examples**


```julia
julia> zero(1)
0

julia> zero(big"2.0")
0.0

julia> zero(rand(2,2))
2×2 Matrix{Float64}:
 0.0  0.0
 0.0  0.0
```
[source](https://github.com/JuliaLang/julia/blob/17cfb8e65ead377bf1b4598d8a9869144142c84e/base/number.jl#L274-L295)
```julia
im
```
The imaginary unit.

See also: [`imag`](https://docs.julialang.org/../math/#Base.imag), [`angle`](https://docs.julialang.org/../math/#Base.angle), [`complex`](https://docs.julialang.org/#Base.complex-Tuple%7BComplex%7D).

**Examples**


```julia
julia> im * im
-1 + 0im

julia> (2.0 + 3im)^2
-5.0 + 12.0im
```
[source](https://github.com/JuliaLang/julia/blob/17cfb8e65ead377bf1b4598d8a9869144142c84e/base/complex.jl#L20-L35)
```julia
π
pi
```
The constant pi.

Unicode `π` can be typed by writing `pi` then pressing tab in the Julia REPL, and in many editors.

See also: [`sinpi`](https://docs.julialang.org/../math/#Base.Math.sinpi), [`sincospi`](https://docs.julialang.org/../math/#Base.Math.sincospi), [`deg2rad`](https://docs.julialang.org/../math/#Base.Math.deg2rad).

**Examples**


```julia
julia> pi
π = 3.1415926535897...

julia> 1/2pi
0.15915494309189535
```
[source](https://github.com/JuliaLang/julia/blob/17cfb8e65ead377bf1b4598d8a9869144142c84e/base/mathconstants.jl#L20-L38)
```julia
ℯ
e
```
The constant ℯ.

Unicode `ℯ` can be typed by writing `euler` and pressing tab in the Julia REPL, and in many editors.

See also: [`exp`](https://docs.julialang.org/../math/#Base.exp-Tuple%7BFloat64%7D), [`cis`](https://docs.julialang.org/../math/#Base.cis), [`cispi`](https://docs.julialang.org/../math/#Base.cispi).

**Examples**


```julia
julia> ℯ
ℯ = 2.7182818284590...

julia> log(ℯ)
1

julia> ℯ^(im)π ≈ -1
true
```
[source](https://github.com/JuliaLang/julia/blob/17cfb8e65ead377bf1b4598d8a9869144142c84e/base/mathconstants.jl#L41-L62)
```julia
catalan
```
Catalan's constant.

**Examples**


```julia
julia> Base.MathConstants.catalan
catalan = 0.9159655941772...

julia> sum(log(x)/(1+x^2) for x in 1:0.01:10^6) * 0.01
0.9159466120554123
```
[source](https://github.com/JuliaLang/julia/blob/17cfb8e65ead377bf1b4598d8a9869144142c84e/base/mathconstants.jl#L101-L114)
```julia
γ
eulergamma
```
Euler's constant.

**Examples**


```julia
julia> Base.MathConstants.eulergamma
γ = 0.5772156649015...

julia> dx = 10^-6;

julia> sum(-exp(-x) * log(x) for x in dx:dx:100) * dx
0.5772078382499133
```
[source](https://github.com/JuliaLang/julia/blob/17cfb8e65ead377bf1b4598d8a9869144142c84e/base/mathconstants.jl#L65-L81)
```julia
φ
golden
```
The golden ratio.

**Examples**


```julia
julia> Base.MathConstants.golden
φ = 1.6180339887498...

julia> (2ans - 1)^2 ≈ 5
true
```
[source](https://github.com/JuliaLang/julia/blob/17cfb8e65ead377bf1b4598d8a9869144142c84e/base/mathconstants.jl#L84-L98)
```julia
NaN, NaN64
```
A not-a-number value of type [`Float64`](https://docs.julialang.org/#Core.Float64).

See also: [`isnan`](https://docs.julialang.org/#Base.isnan), [`missing`](https://docs.julialang.org/../base/#Base.missing), [`NaN32`](https://docs.julialang.org/#Base.NaN32), [`Inf`](https://docs.julialang.org/#Base.Inf).

**Examples**


```julia
julia> 0/0
NaN

julia> Inf - Inf
NaN

julia> NaN == NaN, isequal(NaN, NaN), NaN === NaN
(false, true, true)
```
[source](https://github.com/JuliaLang/julia/blob/17cfb8e65ead377bf1b4598d8a9869144142c84e/base/float.jl#L57-L75)
```julia
issubnormal(f) -> Bool
```
Test whether a floating point number is subnormal.

[source](https://github.com/JuliaLang/julia/blob/17cfb8e65ead377bf1b4598d8a9869144142c84e/base/float.jl#L796-L800)
```julia
isfinite(f) -> Bool
```
Test whether a number is finite.

**Examples**


```julia
julia> isfinite(5)
true

julia> isfinite(NaN32)
false
```
[source](https://github.com/JuliaLang/julia/blob/17cfb8e65ead377bf1b4598d8a9869144142c84e/base/number.jl#L64-L77)
```julia
isnan(f) -> Bool
```
Test whether a number value is a NaN, an indeterminate value which is neither an infinity nor a finite number ("not a number").

See also: [`iszero`](https://docs.julialang.org/#Base.iszero), [`isone`](https://docs.julialang.org/#Base.isone), [`isinf`](https://docs.julialang.org/#Base.isinf), [`ismissing`](../base/#Base.ismissing).

[source](https://github.com/JuliaLang/julia/blob/17cfb8e65ead377bf1b4598d8a9869144142c84e/base/float.jl#L488-L495)
```julia
iszero(x)
```
Return `true` if `x == zero(x)`; if `x` is an array, this checks whether all of the elements of `x` are zero.

See also: [`isone`](https://docs.julialang.org/#Base.isone), [`isinteger`](https://docs.julialang.org/#Base.isinteger), [`isfinite`](https://docs.julialang.org/#Base.isfinite), [`isnan`](https://docs.julialang.org/#Base.isnan).

**Examples**


```julia
julia> iszero(0.0)
true

julia> iszero([1, 9, 0])
false

julia> iszero([false, 0, 0])
true
```
[source](https://github.com/JuliaLang/julia/blob/17cfb8e65ead377bf1b4598d8a9869144142c84e/base/number.jl#L22-L41)
```julia
isone(x)
```
Return `true` if `x == one(x)`; if `x` is an array, this checks whether `x` is an identity matrix.

**Examples**


```julia
julia> isone(1.0)
true

julia> isone([1 0; 0 2])
false

julia> isone([1 0; 0 true])
true
```
[source](https://github.com/JuliaLang/julia/blob/17cfb8e65ead377bf1b4598d8a9869144142c84e/base/number.jl#L44-L61)
```julia
nextfloat(x::AbstractFloat, n::Integer)
```
The result of `n` iterative applications of `nextfloat` to `x` if `n >= 0`, or `-n` applications of [`prevfloat`](https://docs.julialang.org/#Base.prevfloat) if `n < 0`.

[source](https://github.com/JuliaLang/julia/blob/17cfb8e65ead377bf1b4598d8a9869144142c84e/base/float.jl#L679-L684)
```julia
nextfloat(x::AbstractFloat)
```
Return the smallest floating point number `y` of the same type as `x` such `x < y`. If no such `y` exists (e.g. if `x` is `Inf` or `NaN`), then return `x`.

See also: [`prevfloat`](https://docs.julialang.org/#Base.prevfloat), [`eps`](https://docs.julialang.org/../base/#Base.eps-Tuple%7BType%7B<:AbstractFloat%7D%7D), [`issubnormal`](#Base.issubnormal).

[source](https://github.com/JuliaLang/julia/blob/17cfb8e65ead377bf1b4598d8a9869144142c84e/base/float.jl#L723-L730)
```julia
prevfloat(x::AbstractFloat, n::Integer)
```
The result of `n` iterative applications of `prevfloat` to `x` if `n >= 0`, or `-n` applications of [`nextfloat`](https://docs.julialang.org/#Base.nextfloat) if `n < 0`.

[source](https://github.com/JuliaLang/julia/blob/17cfb8e65ead377bf1b4598d8a9869144142c84e/base/float.jl#L733-L738)
```julia
prevfloat(x::AbstractFloat)
```
Return the largest floating point number `y` of the same type as `x` such `y < x`. If no such `y` exists (e.g. if `x` is `-Inf` or `NaN`), then return `x`.

[source](https://github.com/JuliaLang/julia/blob/17cfb8e65ead377bf1b4598d8a9869144142c84e/base/float.jl#L741-L746)
```julia
isinteger(x) -> Bool
```
Test whether `x` is numerically equal to some integer.

**Examples**


```julia
julia> isinteger(4.0)
true
```
[source](https://github.com/JuliaLang/julia/blob/17cfb8e65ead377bf1b4598d8a9869144142c84e/base/number.jl#L9-L19)
```julia
isreal(x) -> Bool
```
Test whether `x` or all its elements are numerically equal to some real number including infinities and NaNs. `isreal(x)` is true if `isequal(x, real(x))` is true.

**Examples**


```julia
julia> isreal(5.)
true

julia> isreal(Inf + 0im)
true

julia> isreal([4.; complex(0,1)])
false
```
[source](https://github.com/JuliaLang/julia/blob/17cfb8e65ead377bf1b4598d8a9869144142c84e/base/complex.jl#L124-L142)
```julia
Float32(x [, mode::RoundingMode])
```
Create a `Float32` from `x`. If `x` is not exactly representable then `mode` determines how `x` is rounded.

**Examples**


```julia
julia> Float32(1/3, RoundDown)
0.3333333f0

julia> Float32(1/3, RoundUp)
0.33333334f0
```
See [`RoundingMode`](https://docs.julialang.org/../math/#Base.Rounding.RoundingMode) for available rounding modes.

[source](https://github.com/JuliaLang/julia/blob/17cfb8e65ead377bf1b4598d8a9869144142c84e/base/docs/basedocs.jl#L1429-L1445)
```julia
Float64(x [, mode::RoundingMode])
```
Create a `Float64` from `x`. If `x` is not exactly representable then `mode` determines how `x` is rounded.

**Examples**


```julia
julia> Float64(pi, RoundDown)
3.141592653589793

julia> Float64(pi, RoundUp)
3.1415926535897936
```
See [`RoundingMode`](https://docs.julialang.org/../math/#Base.Rounding.RoundingMode) for available rounding modes.

[source](https://github.com/JuliaLang/julia/blob/17cfb8e65ead377bf1b4598d8a9869144142c84e/base/docs/basedocs.jl#L1448-L1464)
```julia
rounding(T)
```
Get the current floating point rounding mode for type `T`, controlling the rounding of basic arithmetic functions ([`+`](https://docs.julialang.org/../math/#Base.:+), [`-`](https://docs.julialang.org/../math/#Base.:--Tuple%7BAny%7D), [`*`](https://docs.julialang.org/../math/#Base.:*-Tuple%7BAny,%20Vararg%7BAny%7D%7D), [`/`](https://docs.julialang.org/../math/#Base.:/) and [`sqrt`](https://docs.julialang.org/../math/#Base.sqrt-Tuple%7BNumber%7D)) and type conversion.

See [`RoundingMode`](https://docs.julialang.org/../math/#Base.Rounding.RoundingMode) for available modes.

[source](https://github.com/JuliaLang/julia/blob/17cfb8e65ead377bf1b4598d8a9869144142c84e/base/rounding.jl#L143-L151)
```julia
setrounding(T, mode)
```
Set the rounding mode of floating point type `T`, controlling the rounding of basic arithmetic functions ([`+`](https://docs.julialang.org/../math/#Base.:+), [`-`](https://docs.julialang.org/../math/#Base.:--Tuple%7BAny%7D), [`*`](https://docs.julialang.org/../math/#Base.:*-Tuple%7BAny,%20Vararg%7BAny%7D%7D), [`/`](https://docs.julialang.org/../math/#Base.:/) and [`sqrt`](https://docs.julialang.org/../math/#Base.sqrt-Tuple%7BNumber%7D)) and type conversion. Other numerical functions may give incorrect or invalid values when using rounding modes other than the default [`RoundNearest`](https://docs.julialang.org/../math/#Base.Rounding.RoundNearest).

Note that this is currently only supported for `T == BigFloat`.

This function is not thread-safe. It will affect code running on all threads, but its behavior is undefined if called concurrently with computations that use the setting.

[source](https://github.com/JuliaLang/julia/blob/17cfb8e65ead377bf1b4598d8a9869144142c84e/base/rounding.jl#L124-L140)
```julia
setrounding(f::Function, T, mode)
```
Change the rounding mode of floating point type `T` for the duration of `f`. It is logically equivalent to:


```julia
old = rounding(T)
setrounding(T, mode)
f()
setrounding(T, old)
```
See [`RoundingMode`](https://docs.julialang.org/../math/#Base.Rounding.RoundingMode) for available rounding modes.

[source](https://github.com/JuliaLang/julia/blob/17cfb8e65ead377bf1b4598d8a9869144142c84e/base/rounding.jl#L159-L171)
```julia
get_zero_subnormals() -> Bool
```
Return `false` if operations on subnormal floating-point values ("denormals") obey rules for IEEE arithmetic, and `true` if they might be converted to zeros.

This function only affects the current thread.

[source](https://github.com/JuliaLang/julia/blob/17cfb8e65ead377bf1b4598d8a9869144142c84e/base/rounding.jl#L237-L246)
```julia
set_zero_subnormals(yes::Bool) -> Bool
```
If `yes` is `false`, subsequent floating-point operations follow rules for IEEE arithmetic on subnormal values ("denormals"). Otherwise, floating-point operations are permitted (but not required) to convert subnormal inputs or outputs to zero. Returns `true` unless `yes==true` but the hardware does not support zeroing of subnormal numbers.

`set_zero_subnormals(true)` can speed up some computations on some hardware. However, it can break identities such as `(x-y==0) == (x==y)`.

This function only affects the current thread.

[source](https://github.com/JuliaLang/julia/blob/17cfb8e65ead377bf1b4598d8a9869144142c84e/base/rounding.jl#L220-L234)
```julia
count_ones(x::Integer) -> Integer
```
Number of ones in the binary representation of `x`.

**Examples**


```julia
julia> count_ones(7)
3

julia> count_ones(Int32(-1))
32
```
[source](https://github.com/JuliaLang/julia/blob/17cfb8e65ead377bf1b4598d8a9869144142c84e/base/int.jl#L394-L407)
```julia
count_zeros(x::Integer) -> Integer
```
Number of zeros in the binary representation of `x`.

**Examples**


```julia
julia> count_zeros(Int32(2 ^ 16 - 1))
16

julia> count_zeros(-1)
0
```
[source](https://github.com/JuliaLang/julia/blob/17cfb8e65ead377bf1b4598d8a9869144142c84e/base/int.jl#L436-L449)
```julia
leading_zeros(x::Integer) -> Integer
```
Number of zeros leading the binary representation of `x`.

**Examples**


```julia
julia> leading_zeros(Int32(1))
31
```
[source](https://github.com/JuliaLang/julia/blob/17cfb8e65ead377bf1b4598d8a9869144142c84e/base/int.jl#L410-L420)
```julia
leading_ones(x::Integer) -> Integer
```
Number of ones leading the binary representation of `x`.

**Examples**


```julia
julia> leading_ones(UInt32(2 ^ 32 - 2))
31
```
[source](https://github.com/JuliaLang/julia/blob/17cfb8e65ead377bf1b4598d8a9869144142c84e/base/int.jl#L452-L462)
```julia
trailing_zeros(x::Integer) -> Integer
```
Number of zeros trailing the binary representation of `x`.

**Examples**


```julia
julia> trailing_zeros(2)
1
```
[source](https://github.com/JuliaLang/julia/blob/17cfb8e65ead377bf1b4598d8a9869144142c84e/base/int.jl#L423-L433)
```julia
trailing_ones(x::Integer) -> Integer
```
Number of ones trailing the binary representation of `x`.

**Examples**


```julia
julia> trailing_ones(3)
2
```
[source](https://github.com/JuliaLang/julia/blob/17cfb8e65ead377bf1b4598d8a9869144142c84e/base/int.jl#L465-L475)
```julia
isodd(x::Number) -> Bool
```
Return `true` if `x` is an odd integer (that is, an integer not divisible by 2), and `false` otherwise.

Non-`Integer` arguments require Julia 1.7 or later.

**Examples**


```julia
julia> isodd(9)
true

julia> isodd(10)
false
```
[source](https://github.com/JuliaLang/julia/blob/17cfb8e65ead377bf1b4598d8a9869144142c84e/base/int.jl#L99-L115)
```julia
iseven(x::Number) -> Bool
```
Return `true` if `x` is an even integer (that is, an integer divisible by 2), and `false` otherwise.

Non-`Integer` arguments require Julia 1.7 or later.

**Examples**


```julia
julia> iseven(9)
false

julia> iseven(10)
true
```
[source](https://github.com/JuliaLang/julia/blob/17cfb8e65ead377bf1b4598d8a9869144142c84e/base/int.jl#L119-L135)
```julia
@int128_str str
@int128_str(str)
```
`@int128_str` parses a string into a Int128. Throws an `ArgumentError` if the string is not a valid integer.

[source](https://github.com/JuliaLang/julia/blob/17cfb8e65ead377bf1b4598d8a9869144142c84e/base/int.jl#L656-L662)
```julia
@uint128_str str
@uint128_str(str)
```
`@uint128_str` parses a string into a UInt128. Throws an `ArgumentError` if the string is not a valid integer.

[source](https://github.com/JuliaLang/julia/blob/17cfb8e65ead377bf1b4598d8a9869144142c84e/base/int.jl#L667-L673)The [`BigFloat`](https://docs.julialang.org/#Base.MPFR.BigFloat) and [`BigInt`](https://docs.julialang.org/#Base.GMP.BigInt) types implements arbitrary-precision floating point and integer arithmetic, respectively. For [`BigFloat`](https://docs.julialang.org/#Base.MPFR.BigFloat) the [GNU MPFR library](https://www.mpfr.org/) is used, and for [`BigInt`](https://docs.julialang.org/#Base.GMP.BigInt) the [GNU Multiple Precision Arithmetic Library (GMP)](https://gmplib.org) is used.


```julia
BigFloat(x::Union{Real, AbstractString} [, rounding::RoundingMode=rounding(BigFloat)]; [precision::Integer=precision(BigFloat)])
```
Create an arbitrary precision floating point number from `x`, with precision `precision`. The `rounding` argument specifies the direction in which the result should be rounded if the conversion cannot be done exactly. If not provided, these are set by the current global values.

`BigFloat(x::Real)` is the same as `convert(BigFloat,x)`, except if `x` itself is already `BigFloat`, in which case it will return a value with the precision set to the current global precision; `convert` will always return `x`.

`BigFloat(x::AbstractString)` is identical to [`parse`](https://docs.julialang.org/#Base.parse). This is provided for convenience since decimal literals are converted to `Float64` when parsed, so `BigFloat(2.1)` may not yield what you expect.

See also:

`precision` as a keyword argument requires at least Julia 1.1. In Julia 1.0 `precision` is the second positional argument (`BigFloat(x, precision)`).

**Examples**


```julia
julia> BigFloat(2.1) # 2.1 here is a Float64
2.100000000000000088817841970012523233890533447265625

julia> BigFloat("2.1") # the closest BigFloat to 2.1
2.099999999999999999999999999999999999999999999999999999999999999999999999999986

julia> BigFloat("2.1", RoundUp)
2.100000000000000000000000000000000000000000000000000000000000000000000000000021

julia> BigFloat("2.1", RoundUp, precision=128)
2.100000000000000000000000000000000000007
```
[source](https://github.com/JuliaLang/julia/blob/17cfb8e65ead377bf1b4598d8a9869144142c84e/base/mpfr.jl#L139-L177)
```julia
precision(num::AbstractFloat; base::Integer=2)
precision(T::Type; base::Integer=2)
```
Get the precision of a floating point number, as defined by the effective number of bits in the significand, or the precision of a floating-point type `T` (its current default, if `T` is a variable-precision type like [`BigFloat`](https://docs.julialang.org/#Base.MPFR.BigFloat)).

If `base` is specified, then it returns the maximum corresponding number of significand digits in that base.

The `base` keyword requires at least Julia 1.8.

[source](https://github.com/JuliaLang/julia/blob/17cfb8e65ead377bf1b4598d8a9869144142c84e/base/float.jl#L640-L653)
```julia
setprecision([T=BigFloat,] precision::Int; base=2)
```
Set the precision (in bits, by default) to be used for `T` arithmetic. If `base` is specified, then the precision is the minimum required to give at least `precision` digits in the given `base`.

This function is not thread-safe. It will affect code running on all threads, but its behavior is undefined if called concurrently with computations that use the setting.

The `base` keyword requires at least Julia 1.8.

[source](https://github.com/JuliaLang/julia/blob/17cfb8e65ead377bf1b4598d8a9869144142c84e/base/mpfr.jl#L824-L839)
```julia
setprecision(f::Function, [T=BigFloat,] precision::Integer; base=2)
```
Change the `T` arithmetic precision (in the given `base`) for the duration of `f`. It is logically equivalent to:


```julia
old = precision(BigFloat)
setprecision(BigFloat, precision)
f()
setprecision(BigFloat, old)
```
Often used as `setprecision(T, precision) do ... end`

Note: `nextfloat()`, `prevfloat()` do not use the precision mentioned by `setprecision`.

The `base` keyword requires at least Julia 1.8.

[source](https://github.com/JuliaLang/julia/blob/17cfb8e65ead377bf1b4598d8a9869144142c84e/base/mpfr.jl#L940-L958)
```julia
BigInt(x)
```
Create an arbitrary precision integer. `x` may be an `Int` (or anything that can be converted to an `Int`). The usual mathematical operators are defined for this type, and results are promoted to a [`BigInt`](https://docs.julialang.org/#Base.GMP.BigInt).

Instances can be constructed from strings via [`parse`](https://docs.julialang.org/#Base.parse), or using the `big` string literal.

**Examples**


```julia
julia> parse(BigInt, "42")
42

julia> big"313"
313

julia> BigInt(10)^19
10000000000000000000
```
[source](https://github.com/JuliaLang/julia/blob/17cfb8e65ead377bf1b4598d8a9869144142c84e/base/gmp.jl#L62-L83)
```julia
@big_str str
@big_str(str)
```
Parse a string into a [`BigInt`](https://docs.julialang.org/#Base.GMP.BigInt) or [`BigFloat`](https://docs.julialang.org/#Base.MPFR.BigFloat), and throw an `ArgumentError` if the string is not a valid number. For integers `_` is allowed in the string as a separator.

**Examples**


```julia
julia> big"123_456"
123456

julia> big"7891.5"
7891.5
```
[source](https://github.com/JuliaLang/julia/blob/17cfb8e65ead377bf1b4598d8a9869144142c84e/base/int.jl#L678-L694)


