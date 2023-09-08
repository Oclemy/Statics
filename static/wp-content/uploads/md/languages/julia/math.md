
```julia
-(x)
```
Unary minus operator.

See also: [`abs`](https://docs.julialang.org/#Base.abs), [`flipsign`](https://docs.julialang.org/#Base.flipsign).

**Examples**


```julia
julia> -1
-1

julia> -(2)
-2

julia> -[1 2; 3 4]
2×2 Matrix{Int64}:
 -1  -2
 -3  -4
```
[source](https://github.com/JuliaLang/julia/blob/17cfb8e65ead377bf1b4598d8a9869144142c84e/base/docs/basedocs.jl#L2365-L2385)
```julia
+(x, y...)
```
Addition operator. `x+y+z+...` calls this function with all arguments, i.e. `+(x, y, z, ...)`.

**Examples**


```julia
julia> 1 + 20 + 4
25

julia> +(1, 20, 4)
25
```
[source](https://github.com/JuliaLang/julia/blob/17cfb8e65ead377bf1b4598d8a9869144142c84e/base/docs/basedocs.jl#L2349-L2362)
```julia
dt::Date + t::Time -> DateTime
```
The addition of a `Date` with a `Time` produces a `DateTime`. The hour, minute, second, and millisecond parts of the `Time` are used along with the year, month, and day of the `Date` to create the new `DateTime`. Non-zero microseconds or nanoseconds in the `Time` type will result in an `InexactError` being thrown.


```julia
-(x, y)
```
Subtraction operator.

**Examples**


```julia
julia> 2 - 3
-1

julia> -(2, 4.5)
-2.5
```
[source](https://github.com/JuliaLang/julia/blob/17cfb8e65ead377bf1b4598d8a9869144142c84e/base/docs/basedocs.jl#L2388-L2401)
```julia
*(x, y...)
```
Multiplication operator. `x*y*z*...` calls this function with all arguments, i.e. `*(x, y, z, ...)`.

**Examples**


```julia
julia> 2 * 7 * 8
112

julia> *(2, 7, 8)
112
```
[source](https://github.com/JuliaLang/julia/blob/17cfb8e65ead377bf1b4598d8a9869144142c84e/base/docs/basedocs.jl#L2404-L2417)
```julia
/(x, y)
```
Right division operator: multiplication of `x` by the inverse of `y` on the right. Gives floating-point results for integer arguments.

**Examples**


```julia
julia> 1/2
0.5

julia> 4/2
2.0

julia> 4.5/2
2.25
```
[source](https://github.com/JuliaLang/julia/blob/17cfb8e65ead377bf1b4598d8a9869144142c84e/base/docs/basedocs.jl#L2420-L2437)
```julia
A / B
```
Matrix right-division: `A / B` is equivalent to `(B'  A')'` where [``](https://docs.julialang.org/#Base.:%5C%5C-Tuple%7BAny,%20Any%7D) is the left-division operator. For square matrices, the result `X` is such that `A == X*B`.

See also: [`rdiv!`](https://docs.julialang.org/../../stdlib/LinearAlgebra/#LinearAlgebra.rdiv!).

**Examples**


```julia
julia> A = Float64[1 4 5; 3 9 2]; B = Float64[1 4 2; 3 4 2; 8 7 1];

julia> X = A / B
2×3 Matrix{Float64}:
 -0.65   3.75  -1.2
  3.25  -2.75   1.0

julia> isapprox(A, X*B)
true

julia> isapprox(X, A*pinv(B))
true
```

```julia
(x, y)
```
Left division operator: multiplication of `y` by the inverse of `x` on the left. Gives floating-point results for integer arguments.

**Examples**


```julia
julia> 3  6
2.0

julia> inv(3) * 6
2.0

julia> A = [4 3; 2 1]; x = [5, 6];

julia> A  x
2-element Vector{Float64}:
  6.5
 -7.0

julia> inv(A) * x
2-element Vector{Float64}:
  6.5
 -7.0
```
[source](https://github.com/JuliaLang/julia/blob/17cfb8e65ead377bf1b4598d8a9869144142c84e/base/operators.jl#L602-L628)
```julia
^(x, y)
```
Exponentiation operator. If `x` is a matrix, computes matrix exponentiation.

If `y` is an `Int` literal (e.g. `2` in `x^2` or `-3` in `x^-3`), the Julia code `x^y` is transformed by the compiler to `Base.literal_pow(^, x, Val(y))`, to enable compile-time specialization on the value of the exponent. (As a default fallback we have `Base.literal_pow(^, x, Val(y)) = ^(x,y)`, where usually `^ == Base.^` unless `^` has been defined in the calling namespace.) If `y` is a negative integer literal, then `Base.literal_pow` transforms the operation to `inv(x)^-y` by default, where `-y` is positive.

**Examples**


```julia
julia> 3^5
243

julia> A = [1 2; 3 4]
2×2 Matrix{Int64}:
 1  2
 3  4

julia> A^3
2×2 Matrix{Int64}:
 37   54
 81  118
```
[source](https://github.com/JuliaLang/julia/blob/17cfb8e65ead377bf1b4598d8a9869144142c84e/base/promotion.jl#L393-L421)
```julia
fma(x, y, z)
```
Computes `x*y+z` without rounding the intermediate result `x*y`. On some systems this is significantly more expensive than `x*y+z`. `fma` is used to improve accuracy in certain algorithms. See [`muladd`](#Base.muladd).

[source](https://github.com/JuliaLang/julia/blob/17cfb8e65ead377bf1b4598d8a9869144142c84e/base/floatfuncs.jl#L336-L342)
```julia
muladd(A, y, z)
```
Combined multiply-add, `A*y .+ z`, for matrix-matrix or matrix-vector multiplication. The result is always the same size as `A*y`, but `z` may be smaller, or a scalar.

These methods require Julia 1.6 or later.

**Examples**


```julia
julia> A=[1.0 2.0; 3.0 4.0]; B=[1.0 1.0; 1.0 1.0]; z=[0, 100];

julia> muladd(A, B, z)
2×2 Matrix{Float64}:
   3.0    3.0
 107.0  107.0
```

```julia
muladd(x, y, z)
```
Combined multiply-add: computes `x*y+z`, but allowing the add and multiply to be merged with each other or with surrounding operations for performance. For example, this may be implemented as an [`fma`](https://docs.julialang.org/#Base.fma) if the hardware supports it efficiently. The result can be different on different machines and can also be different on the same machine due to constant propagation or other optimizations. See [`fma`](https://docs.julialang.org/#Base.fma).

**Examples**


```julia
julia> muladd(3, 2, 1)
7

julia> 3 * 2 + 1
7
```
[source](https://github.com/JuliaLang/julia/blob/17cfb8e65ead377bf1b4598d8a9869144142c84e/base/math.jl#L1291-L1310)
```julia
inv(x)
```
Return the multiplicative inverse of `x`, such that `x*inv(x)` or `inv(x)*x` yields [`one(x)`](https://docs.julialang.org/../numbers/#Base.one) (the multiplicative identity) up to roundoff errors.

If `x` is a number, this is essentially the same as `one(x)/x`, but for some types `inv(x)` may be slightly more efficient.

**Examples**


```julia
julia> inv(2)
0.5

julia> inv(1 + 2im)
0.2 - 0.4im

julia> inv(1 + 2im) * (1 + 2im)
1.0 + 0.0im

julia> inv(2//3)
3//2
```
`inv(::Missing)` requires at least Julia 1.2.

[source](https://github.com/JuliaLang/julia/blob/17cfb8e65ead377bf1b4598d8a9869144142c84e/base/number.jl#L216-L242)
```julia
div(x, y)
÷(x, y)
```
The quotient from Euclidean (integer) division. Generally equivalent to a mathematical operation x/y without a fractional part.

See also: [`cld`](https://docs.julialang.org/#Base.cld), [`fld`](https://docs.julialang.org/#Base.fld), [`rem`](https://docs.julialang.org/#Base.rem), [`divrem`](https://docs.julialang.org/#Base.divrem).

**Examples**


```julia
julia> 9 ÷ 4
2

julia> -5 ÷ 3
-1

julia> 5.0 ÷ 2
2.0

julia> div.(-5:5, 3)'
1×11 adjoint(::Vector{Int64}) with eltype Int64:
 -1  -1  -1  0  0  0  0  0  1  1  1
```
[source](https://github.com/JuliaLang/julia/blob/17cfb8e65ead377bf1b4598d8a9869144142c84e/base/operators.jl#L780-L804)
```julia
fld(x, y)
```
Largest integer less than or equal to `x/y`. Equivalent to `div(x, y, RoundDown)`.

See also [`div`](https://docs.julialang.org/#Base.div), [`cld`](https://docs.julialang.org/#Base.cld), [`fld1`](https://docs.julialang.org/#Base.fld1).

**Examples**


```julia
julia> fld(7.3,5.5)
1.0

julia> fld.(-5:5, 3)'
1×11 adjoint(::Vector{Int64}) with eltype Int64:
 -2  -2  -1  -1  -1  0  0  0  1  1  1
```
Because `fld(x, y)` implements strictly correct floored rounding based on the true value of floating-point numbers, unintuitive situations can arise. For example:


```julia
julia> fld(6.0,0.1)
59.0
julia> 6.0/0.1
60.0
julia> 6.0/big(0.1)
59.99999999999999666933092612453056361837965690217069245739573412231113406246995
```
What is happening here is that the true value of the floating-point number written as `0.1` is slightly larger than the numerical value 1/10 while `6.0` represents the number 6 precisely. Therefore the true value of `6.0 / 0.1` is slightly less than 60. When doing division, this is rounded to precisely `60.0`, but `fld(6.0, 0.1)` always takes the floor of the true value, so the result is `59.0`.

[source](https://github.com/JuliaLang/julia/blob/17cfb8e65ead377bf1b4598d8a9869144142c84e/base/div.jl#L89-L120)
```julia
cld(x, y)
```
Smallest integer larger than or equal to `x/y`. Equivalent to `div(x, y, RoundUp)`.

See also [`div`](https://docs.julialang.org/#Base.div), [`fld`](https://docs.julialang.org/#Base.fld).

**Examples**


```julia
julia> cld(5.5,2.2)
3.0

julia> cld.(-5:5, 3)'
1×11 adjoint(::Vector{Int64}) with eltype Int64:
 -1  -1  -1  0  0  0  1  1  1  2  2
```
[source](https://github.com/JuliaLang/julia/blob/17cfb8e65ead377bf1b4598d8a9869144142c84e/base/div.jl#L123-L139)
```julia
mod(x::Integer, r::AbstractUnitRange)
```
Find `y` in the range `r` such that $x ≡ y (mod n)$, where `n = length(r)`, i.e. `y = mod(x - first(r), n) + first(r)`.

See also [`mod1`](https://docs.julialang.org/#Base.mod1).

**Examples**


```julia
julia> mod(0, Base.OneTo(3))  # mod1(0, 3)
3

julia> mod(3, 0:2)  # mod(3, 3)
0
```
This method requires at least Julia 1.3.

[source](https://github.com/JuliaLang/julia/blob/17cfb8e65ead377bf1b4598d8a9869144142c84e/base/range.jl#L1457-L1476)
```julia
mod(x, y)
rem(x, y, RoundDown)
```
The reduction of `x` modulo `y`, or equivalently, the remainder of `x` after floored division by `y`, i.e. `x - y*fld(x,y)` if computed without intermediate rounding.

The result will have the same sign as `y`, and magnitude less than `abs(y)` (with some exceptions, see note below).

When used with floating point values, the exact result may not be representable by the type, and so rounding error may occur. In particular, if the exact result is very close to `y`, then it may be rounded to `y`.

See also: [`rem`](https://docs.julialang.org/#Base.rem), [`div`](https://docs.julialang.org/#Base.div), [`fld`](https://docs.julialang.org/#Base.fld), [`mod1`](https://docs.julialang.org/#Base.mod1), [`invmod`](https://docs.julialang.org/#Base.invmod).


```julia
julia> mod(8, 3)
2

julia> mod(9, 3)
0

julia> mod(8.9, 3)
2.9000000000000004

julia> mod(eps(), 3)
2.220446049250313e-16

julia> mod(-eps(), 3)
3.0

julia> mod.(-5:5, 3)'
1×11 adjoint(::Vector{Int64}) with eltype Int64:
 1  2  0  1  2  0  1  2  0  1  2
```
[source](https://github.com/JuliaLang/julia/blob/17cfb8e65ead377bf1b4598d8a9869144142c84e/base/int.jl#L239-L277)
```julia
rem(x::Integer, T::Type{<:Integer}) -> T
mod(x::Integer, T::Type{<:Integer}) -> T
%(x::Integer, T::Type{<:Integer}) -> T
```
Find `y::T` such that `x` ≡ `y` (mod n), where n is the number of integers representable in `T`, and `y` is an integer in `[typemin(T),typemax(T)]`. If `T` can represent any integer (e.g. `T == BigInt`), then this operation corresponds to a conversion to `T`.

**Examples**


```julia
julia> 129 % Int8
-127
```
[source](https://github.com/JuliaLang/julia/blob/17cfb8e65ead377bf1b4598d8a9869144142c84e/base/int.jl#L562-L577)
```julia
rem(x, y)
%(x, y)
```
Remainder from Euclidean division, returning a value of the same sign as `x`, and smaller in magnitude than `y`. This value is always exact.

See also: [`div`](https://docs.julialang.org/#Base.div), [`mod`](https://docs.julialang.org/#Base.mod), [`mod1`](https://docs.julialang.org/#Base.mod1), [`divrem`](https://docs.julialang.org/#Base.divrem).

**Examples**


```julia
julia> x = 15; y = 4;

julia> x % y
3

julia> x == div(x, y) * y + rem(x, y)
true

julia> rem.(-5:5, 3)'
1×11 adjoint(::Vector{Int64}) with eltype Int64:
 -2  -1  0  -2  -1  0  1  2  0  1  2
```
[source](https://github.com/JuliaLang/julia/blob/17cfb8e65ead377bf1b4598d8a9869144142c84e/base/operators.jl#L753-L776)
```julia
rem2pi(x, r::RoundingMode)
```
Compute the remainder of `x` after integer division by `2π`, with the quotient rounded according to the rounding mode `r`. In other words, the quantity


```julia
x - 2π*round(x/(2π),r)
```
without any intermediate rounding. This internally uses a high precision approximation of 2π, and so will give a more accurate result than `rem(x,2π,r)`

* if `r == RoundNearest`, then the result is in the interval $[-π, π]$. This will generally be the most accurate result. See also [`RoundNearest`](https://docs.julialang.org/#Base.Rounding.RoundNearest).
* if `r == RoundToZero`, then the result is in the interval $[0, 2π]$ if `x` is positive,. or $[-2π, 0]$ otherwise. See also [`RoundToZero`](https://docs.julialang.org/#Base.Rounding.RoundToZero).
* if `r == RoundDown`, then the result is in the interval $[0, 2π]$. See also [`RoundDown`](https://docs.julialang.org/#Base.Rounding.RoundDown).
* if `r == RoundUp`, then the result is in the interval $[-2π, 0]$. See also [`RoundUp`](https://docs.julialang.org/#Base.Rounding.RoundUp).

**Examples**


```julia
julia> rem2pi(7pi/4, RoundNearest)
-0.7853981633974485

julia> rem2pi(7pi/4, RoundDown)
5.497787143782138
```
[source](https://github.com/JuliaLang/julia/blob/17cfb8e65ead377bf1b4598d8a9869144142c84e/base/math.jl#L1110-L1140)
```julia
mod2pi(x)
```
Modulus after division by `2π`, returning in the range $[0,2π)$.

This function computes a floating point representation of the modulus after division by numerically exact `2π`, and is therefore not exactly the same as `mod(x,2π)`, which would compute the modulus of `x` relative to division by the floating-point number `2π`.

Depending on the format of the input value, the closest representable value to 2π may be less than 2π. For example, the expression `mod2pi(2π)` will not return `0`, because the intermediate value of `2*π` is a `Float64` and `2*Float64(π) < 2*big(π)`. See [`rem2pi`](https://docs.julialang.org/#Base.Math.rem2pi) for more refined control of this behavior.

**Examples**


```julia
julia> mod2pi(9*pi/4)
0.7853981633974481
```
[source](https://github.com/JuliaLang/julia/blob/17cfb8e65ead377bf1b4598d8a9869144142c84e/base/math.jl#L1266-L1286)
```julia
divrem(x, y, r::RoundingMode=RoundToZero)
```
The quotient and remainder from Euclidean division. Equivalent to `(div(x,y,r), rem(x,y,r))`. Equivalently, with the default value of `r`, this call is equivalent to `(x÷y, x%y)`.

See also: [`fldmod`](https://docs.julialang.org/#Base.fldmod), [`cld`](https://docs.julialang.org/#Base.cld).

**Examples**


```julia
julia> divrem(3,7)
(0, 3)

julia> divrem(7,3)
(2, 1)
```
[source](https://github.com/JuliaLang/julia/blob/17cfb8e65ead377bf1b4598d8a9869144142c84e/base/div.jl#L143-L160)
```julia
fldmod(x, y)
```
The floored quotient and modulus after division. A convenience wrapper for `divrem(x, y, RoundDown)`. Equivalent to `(fld(x,y), mod(x,y))`.

See also: [`fld`](https://docs.julialang.org/#Base.fld), [`cld`](https://docs.julialang.org/#Base.cld), [`fldmod1`](#Base.fldmod1).

[source](https://github.com/JuliaLang/julia/blob/17cfb8e65ead377bf1b4598d8a9869144142c84e/base/div.jl#L243-L250)
```julia
fld1(x, y)
```
Flooring division, returning a value consistent with `mod1(x,y)`

See also [`mod1`](https://docs.julialang.org/#Base.mod1), [`fldmod1`](https://docs.julialang.org/#Base.fldmod1).

**Examples**


```julia
julia> x = 15; y = 4;

julia> fld1(x, y)
4

julia> x == fld(x, y) * y + mod(x, y)
true

julia> x == (fld1(x, y) - 1) * y + mod1(x, y)
true
```
[source](https://github.com/JuliaLang/julia/blob/17cfb8e65ead377bf1b4598d8a9869144142c84e/base/operators.jl#L837-L857)
```julia
mod1(x, y)
```
Modulus after flooring division, returning a value `r` such that `mod(r, y) == mod(x, y)` in the range $(0, y]$ for positive `y` and in the range $[y,0)$ for negative `y`.

With integer arguments and positive `y`, this is equal to `mod(x, 1:y)`, and hence natural for 1-based indexing. By comparison, `mod(x, y) == mod(x, 0:y-1)` is natural for computations with offsets or strides.

See also [`mod`](https://docs.julialang.org/#Base.mod), [`fld1`](https://docs.julialang.org/#Base.fld1), [`fldmod1`](https://docs.julialang.org/#Base.fldmod1).

**Examples**


```julia
julia> mod1(4, 2)
2

julia> mod1.(-5:5, 3)'
1×11 adjoint(::Vector{Int64}) with eltype Int64:
 1  2  3  1  2  3  1  2  3  1  2

julia> mod1.([-0.1, 0, 0.1, 1, 2, 2.9, 3, 3.1]', 3)
1×8 Matrix{Float64}:
 2.9  3.0  0.1  1.0  2.0  2.9  3.0  0.1
```
[source](https://github.com/JuliaLang/julia/blob/17cfb8e65ead377bf1b4598d8a9869144142c84e/base/operators.jl#L808-L833)
```julia
//(num, den)
```
Divide two integers or rational numbers, giving a [`Rational`](https://docs.julialang.org/../numbers/#Base.Rational) result.

**Examples**


```julia
julia> 3 // 5
3//5

julia> (3 // 5) // (2 // 1)
3//10
```
[source](https://github.com/JuliaLang/julia/blob/17cfb8e65ead377bf1b4598d8a9869144142c84e/base/rational.jl#L48-L61)
```julia
rationalize([T<:Integer=Int,] x; tol::Real=eps(x))
```
Approximate floating point number `x` as a [`Rational`](https://docs.julialang.org/../numbers/#Base.Rational) number with components of the given integer type. The result will differ from `x` by no more than `tol`.

**Examples**


```julia
julia> rationalize(5.6)
28//5

julia> a = rationalize(BigInt, 10.3)
103//10

julia> typeof(numerator(a))
BigInt
```
[source](https://github.com/JuliaLang/julia/blob/17cfb8e65ead377bf1b4598d8a9869144142c84e/base/rational.jl#L139-L156)
```julia
numerator(x)
```
Numerator of the rational representation of `x`.

**Examples**


```julia
julia> numerator(2//3)
2

julia> numerator(4)
4
```
[source](https://github.com/JuliaLang/julia/blob/17cfb8e65ead377bf1b4598d8a9869144142c84e/base/rational.jl#L222-L235)
```julia
denominator(x)
```
Denominator of the rational representation of `x`.

**Examples**


```julia
julia> denominator(2//3)
3

julia> denominator(4)
1
```
[source](https://github.com/JuliaLang/julia/blob/17cfb8e65ead377bf1b4598d8a9869144142c84e/base/rational.jl#L239-L252)
```julia
<<(x, n)
```
Left bit shift operator, `x << n`. For `n >= 0`, the result is `x` shifted left by `n` bits, filling with `0`s. This is equivalent to `x * 2^n`. For `n < 0`, this is equivalent to `x >> -n`.

**Examples**


```julia
julia> Int8(3) << 2
12

julia> bitstring(Int8(3))
"00000011"

julia> bitstring(Int8(12))
"00001100"
```
See also [`>>`](https://docs.julialang.org/#Base.:>>), [`>>>`](https://docs.julialang.org/#Base.:>>>), [`exp2`](https://docs.julialang.org/#Base.exp2), [`ldexp`](#Base.Math.ldexp).

[source](https://github.com/JuliaLang/julia/blob/17cfb8e65ead377bf1b4598d8a9869144142c84e/base/operators.jl#L635-L654)
```julia
<<(B::BitVector, n) -> BitVector
```
Left bit shift operator, `B << n`. For `n >= 0`, the result is `B` with elements shifted `n` positions backwards, filling with `false` values. If `n < 0`, elements are shifted forwards. Equivalent to `B >> -n`.

**Examples**


```julia
julia> B = BitVector([true, false, true, false, false])
5-element BitVector:
 1
 0
 1
 0
 0

julia> B << 1
5-element BitVector:
 0
 1
 0
 0
 0

julia> B << -1
5-element BitVector:
 0
 1
 0
 1
 0
```
[source](https://github.com/JuliaLang/julia/blob/17cfb8e65ead377bf1b4598d8a9869144142c84e/base/bitarray.jl#L1378-L1412)
```julia
>>(x, n)
```
Right bit shift operator, `x >> n`. For `n >= 0`, the result is `x` shifted right by `n` bits, where `n >= 0`, filling with `0`s if `x >= 0`, `1`s if `x < 0`, preserving the sign of `x`. This is equivalent to `fld(x, 2^n)`. For `n < 0`, this is equivalent to `x << -n`.

**Examples**


```julia
julia> Int8(13) >> 2
3

julia> bitstring(Int8(13))
"00001101"

julia> bitstring(Int8(3))
"00000011"

julia> Int8(-14) >> 2
-4

julia> bitstring(Int8(-14))
"11110010"

julia> bitstring(Int8(-4))
"11111100"
```
See also [`>>>`](https://docs.julialang.org/#Base.:>>>), [`<<`](#Base.:<<).

[source](https://github.com/JuliaLang/julia/blob/17cfb8e65ead377bf1b4598d8a9869144142c84e/base/operators.jl#L670-L699)
```julia
>>(B::BitVector, n) -> BitVector
```
Right bit shift operator, `B >> n`. For `n >= 0`, the result is `B` with elements shifted `n` positions forward, filling with `false` values. If `n < 0`, elements are shifted backwards. Equivalent to `B << -n`.

**Examples**


```julia
julia> B = BitVector([true, false, true, false, false])
5-element BitVector:
 1
 0
 1
 0
 0

julia> B >> 1
5-element BitVector:
 0
 1
 0
 1
 0

julia> B >> -1
5-element BitVector:
 0
 1
 0
 0
 0
```
[source](https://github.com/JuliaLang/julia/blob/17cfb8e65ead377bf1b4598d8a9869144142c84e/base/bitarray.jl#L1340-L1374)
```julia
>>>(x, n)
```
Unsigned right bit shift operator, `x >>> n`. For `n >= 0`, the result is `x` shifted right by `n` bits, where `n >= 0`, filling with `0`s. For `n < 0`, this is equivalent to `x << -n`.

For [`Unsigned`](https://docs.julialang.org/../numbers/#Core.Unsigned) integer types, this is equivalent to [`>>`](https://docs.julialang.org/#Base.:>>). For [`Signed`](https://docs.julialang.org/../numbers/#Core.Signed) integer types, this is equivalent to `signed(unsigned(x) >> n)`.

**Examples**


```julia
julia> Int8(-14) >>> 2
60

julia> bitstring(Int8(-14))
"11110010"

julia> bitstring(Int8(60))
"00111100"
```
[`BigInt`](https://docs.julialang.org/../numbers/#Base.GMP.BigInt)s are treated as if having infinite size, so no filling is required and this is equivalent to [`>>`](https://docs.julialang.org/#Base.:>>).

See also [`>>`](https://docs.julialang.org/#Base.:>>), [`<<`](#Base.:<<).

[source](https://github.com/JuliaLang/julia/blob/17cfb8e65ead377bf1b4598d8a9869144142c84e/base/operators.jl#L711-L737)
```julia
>>>(B::BitVector, n) -> BitVector
```
Unsigned right bitshift operator, `B >>> n`. Equivalent to `B >> n`. See [`>>`](https://docs.julialang.org/#Base.:>>) for details and examples.

[source](https://github.com/JuliaLang/julia/blob/17cfb8e65ead377bf1b4598d8a9869144142c84e/base/bitarray.jl#L1415-L1420)
```julia
bitrotate(x::Base.BitInteger, k::Integer)
```
`bitrotate(x, k)` implements bitwise rotation. It returns the value of `x` with its bits rotated left `k` times. A negative value of `k` will rotate to the right instead.

This function requires Julia 1.5 or later.

See also: [`<<`](https://docs.julialang.org/#Base.:<<), [`circshift`](https://docs.julialang.org/../arrays/#Base.circshift), [`BitArray`](https://docs.julialang.org/../arrays/#Base.BitArray).


```julia
julia> bitrotate(UInt8(114), 2)
0xc9

julia> bitstring(bitrotate(0b01110010, 2))
"11001001"

julia> bitstring(bitrotate(0b01110010, -2))
"10011100"

julia> bitstring(bitrotate(0b01110010, 8))
"01110010"
```
[source](https://github.com/JuliaLang/julia/blob/17cfb8e65ead377bf1b4598d8a9869144142c84e/base/int.jl#L528-L553)
```julia
(:)(start::CartesianIndex, [step::CartesianIndex], stop::CartesianIndex)
```
Construct [`CartesianIndices`](https://docs.julialang.org/../arrays/#Base.IteratorsMD.CartesianIndices) from two `CartesianIndex` and an optional step.

This method requires at least Julia 1.1.

The step range method start:step:stop requires at least Julia 1.6.

**Examples**


```julia
julia> I = CartesianIndex(2,1);

julia> J = CartesianIndex(3,3);

julia> I:J
CartesianIndices((2:3, 1:3))

julia> I:CartesianIndex(1, 2):J
CartesianIndices((2:1:3, 1:2:3))
```
[source](https://github.com/JuliaLang/julia/blob/17cfb8e65ead377bf1b4598d8a9869144142c84e/base/multidimensional.jl#L278-L301)
```julia
(:)(start, [step], stop)
```
Range operator. `a:b` constructs a range from `a` to `b` with a step size of 1 (a [`UnitRange`](https://docs.julialang.org/../collections/#Base.UnitRange)) , and `a:s:b` is similar but uses a step size of `s` (a [`StepRange`](https://docs.julialang.org/../collections/#Base.StepRange)).

`:` is also used in indexing to select whole dimensions and for [`Symbol`](https://docs.julialang.org/../base/#Core.Symbol) literals, as in e.g. `:hello`.

[source](https://github.com/JuliaLang/julia/blob/17cfb8e65ead377bf1b4598d8a9869144142c84e/base/range.jl#L31-L39)
```julia
range(start, stop, length)
range(start, stop; length, step)
range(start; length, stop, step)
range(;start, length, stop, step)
```
Construct a specialized array with evenly spaced elements and optimized storage (an [`AbstractRange`](https://docs.julialang.org/../collections/#Base.AbstractRange)) from the arguments. Mathematically a range is uniquely determined by any three of `start`, `step`, `stop` and `length`. Valid invocations of range are:

* Call `range` with any three of `start`, `step`, `stop`, `length`.
* Call `range` with two of `start`, `stop`, `length`. In this case `step` will be assumed to be one. If both arguments are Integers, a [`UnitRange`](https://docs.julialang.org/../collections/#Base.UnitRange) will be returned.
* Call `range` with one of `stop` or `length`. `start` and `step` will be assumed to be one.

See Extended Help for additional details on the returned type.

**Examples**


```julia
julia> range(1, length=100)
1:100

julia> range(1, stop=100)
1:100

julia> range(1, step=5, length=100)
1:5:496

julia> range(1, step=5, stop=100)
1:5:96

julia> range(1, 10, length=101)
1.0:0.09:10.0

julia> range(1, 100, step=5)
1:5:96

julia> range(stop=10, length=5)
6:10

julia> range(stop=10, step=1, length=5)
6:1:10

julia> range(start=1, step=1, stop=10)
1:1:10

julia> range(; length = 10)
Base.OneTo(10)

julia> range(; stop = 6)
Base.OneTo(6)

julia> range(; stop = 6.5)
1.0:1.0:6.0
```
If `length` is not specified and `stop - start` is not an integer multiple of `step`, a range that ends before `stop` will be produced.


```julia
julia> range(1, 3.5, step=2)
1.0:2.0:3.0
```
Special care is taken to ensure intermediate values are computed rationally. To avoid this induced overhead, see the [`LinRange`](https://docs.julialang.org/../collections/#Base.LinRange) constructor.

`stop` as a positional argument requires at least Julia 1.1.

The versions without keyword arguments and `start` as a keyword argument require at least Julia 1.7.

The versions with `stop` as a sole keyword argument, or `length` as a sole keyword argument require at least Julia 1.8.

**Extended Help**

`range` will produce a `Base.OneTo` when the arguments are Integers and

* Only `length` is provided
* Only `stop` is provided

`range` will produce a `UnitRange` when the arguments are Integers and

* Only `start` and `stop` are provided
* Only `length` and `stop` are provided

A `UnitRange` is not produced if `step` is provided even if specified as one.

[source](https://github.com/JuliaLang/julia/blob/17cfb8e65ead377bf1b4598d8a9869144142c84e/base/range.jl#L49-L135)
```julia
Base.OneTo(n)
```
Define an `AbstractUnitRange` that behaves like `1:n`, with the added distinction that the lower limit is guaranteed (by the type system) to be 1.

[source](https://github.com/JuliaLang/julia/blob/17cfb8e65ead377bf1b4598d8a9869144142c84e/base/range.jl#L428-L434)
```julia
StepRangeLen(         ref::R, step::S, len, [offset=1]) where {  R,S}
StepRangeLen{T,R,S}(  ref::R, step::S, len, [offset=1]) where {T,R,S}
StepRangeLen{T,R,S,L}(ref::R, step::S, len, [offset=1]) where {T,R,S,L}
```
A range `r` where `r[i]` produces values of type `T` (in the first form, `T` is deduced automatically), parameterized by a `ref`erence value, a `step`, and the `len`gth. By default `ref` is the starting value `r[1]`, but alternatively you can supply it as the value of `r[offset]` for some other index `1 <= offset <= len`. In conjunction with `TwicePrecision` this can be used to implement ranges that are free of roundoff error.

[source](https://github.com/JuliaLang/julia/blob/17cfb8e65ead377bf1b4598d8a9869144142c84e/base/range.jl#L459-L471)
```julia
==(x, y)
```
Generic equality operator. Falls back to [`===`](https://docs.julialang.org/../base/#Core.:===). Should be implemented for all types with a notion of equality, based on the abstract value that an instance represents. For example, all numeric types are compared by numeric value, ignoring type. Strings are compared as sequences of characters, ignoring encoding. For collections, `==` is generally called recursively on all contents, though other properties (like the shape for arrays) may also be taken into account.

This operator follows IEEE semantics for floating-point numbers: `0.0 == -0.0` and `NaN != NaN`.

The result is of type `Bool`, except when one of the operands is [`missing`](https://docs.julialang.org/../base/#Base.missing), in which case `missing` is returned ([three-valued logic](https://en.wikipedia.org/wiki/Three-valued_logic)). For collections, `missing` is returned if at least one of the operands contains a `missing` value and all non-missing values are equal. Use [`isequal`](https://docs.julialang.org/../base/#Base.isequal) or [`===`](https://docs.julialang.org/../base/#Core.:===) to always get a `Bool` result.

**Implementation**

New numeric types should implement this function for two arguments of the new type, and handle comparison to other types via promotion rules where possible.

[`isequal`](https://docs.julialang.org/../base/#Base.isequal) falls back to `==`, so new methods of `==` will be used by the [`Dict`](https://docs.julialang.org/../collections/#Base.Dict) type to compare keys. If your type will be used as a dictionary key, it should therefore also implement [`hash`](https://docs.julialang.org/../base/#Base.hash).

If some type defines `==`, [`isequal`](https://docs.julialang.org/../base/#Base.isequal), and [`isless`](https://docs.julialang.org/../base/#Base.isless) then it should also implement [`<`](https://docs.julialang.org/#Base.:<) to ensure consistency of comparisons.

[source](https://github.com/JuliaLang/julia/blob/17cfb8e65ead377bf1b4598d8a9869144142c84e/base/operators.jl#L55-L85)
```julia
!=(x, y)
≠(x,y)
```
Not-equals comparison operator. Always gives the opposite answer as [`==`](https://docs.julialang.org/#Base.:==).

**Implementation**

New types should generally not implement this, and rely on the fallback definition `!=(x,y) = !(x==y)` instead.

**Examples**


```julia
julia> 3 != 2
true

julia> "foo" ≠ "foo"
false
```
[source](https://github.com/JuliaLang/julia/blob/17cfb8e65ead377bf1b4598d8a9869144142c84e/base/operators.jl#L263-L281)
```julia
!=(x)
```
Create a function that compares its argument to `x` using [`!=`](https://docs.julialang.org/#Base.:!=), i.e. a function equivalent to `y -> y != x`. The returned function is of type `Base.Fix2{typeof(!=)}`, which can be used to implement specialized methods.

This functionality requires at least Julia 1.2.

[source](https://github.com/JuliaLang/julia/blob/17cfb8e65ead377bf1b4598d8a9869144142c84e/base/operators.jl#L1137-L1147)
```julia
!==(x, y)
≢(x,y)
```
Always gives the opposite answer as [`===`](https://docs.julialang.org/../base/#Core.:===).

**Examples**


```julia
julia> a = [1, 2]; b = [1, 2];

julia> a ≢ b
true

julia> a ≢ a
false
```
[source](https://github.com/JuliaLang/julia/blob/17cfb8e65ead377bf1b4598d8a9869144142c84e/base/operators.jl#L312-L328)
```julia
<(x, y)
```
Less-than comparison operator. Falls back to [`isless`](https://docs.julialang.org/../base/#Base.isless). Because of the behavior of floating-point NaN values, this operator implements a partial order.

**Implementation**

New numeric types with a canonical partial order should implement this function for two arguments of the new type. Types with a canonical total order should implement [`isless`](https://docs.julialang.org/../base/#Base.isless) instead.

**Examples**


```julia
julia> 'a' < 'b'
true

julia> "abc" < "abd"
true

julia> 5 < 3
false
```
[source](https://github.com/JuliaLang/julia/blob/17cfb8e65ead377bf1b4598d8a9869144142c84e/base/operators.jl#L332-L355)
```julia
<(x)
```
Create a function that compares its argument to `x` using [`<`](https://docs.julialang.org/#Base.:<), i.e. a function equivalent to `y -> y < x`. The returned function is of type `Base.Fix2{typeof(<)}`, which can be used to implement specialized methods.

This functionality requires at least Julia 1.2.

[source](https://github.com/JuliaLang/julia/blob/17cfb8e65ead377bf1b4598d8a9869144142c84e/base/operators.jl#L1189-L1199)
```julia
<=(x, y)
≤(x,y)
```
Less-than-or-equals comparison operator. Falls back to `(x < y) | (x == y)`.

**Examples**


```julia
julia> 'a' <= 'b'
true

julia> 7 ≤ 7 ≤ 9
true

julia> "abc" ≤ "abc"
true

julia> 5 <= 3
false
```
[source](https://github.com/JuliaLang/julia/blob/17cfb8e65ead377bf1b4598d8a9869144142c84e/base/operators.jl#L384-L404)
```julia
<=(x)
```
Create a function that compares its argument to `x` using [`<=`](https://docs.julialang.org/#Base.:<=), i.e. a function equivalent to `y -> y <= x`. The returned function is of type `Base.Fix2{typeof(<=)}`, which can be used to implement specialized methods.

This functionality requires at least Julia 1.2.

[source](https://github.com/JuliaLang/julia/blob/17cfb8e65ead377bf1b4598d8a9869144142c84e/base/operators.jl#L1163-L1173)
```julia
>(x, y)
```
Greater-than comparison operator. Falls back to `y < x`.

**Implementation**

Generally, new types should implement [`<`](https://docs.julialang.org/#Base.:<) instead of this function, and rely on the fallback definition `>(x, y) = y < x`.

**Examples**


```julia
julia> 'a' > 'b'
false

julia> 7 > 3 > 1
true

julia> "abc" > "abd"
false

julia> 5 > 3
true
```
[source](https://github.com/JuliaLang/julia/blob/17cfb8e65ead377bf1b4598d8a9869144142c84e/base/operators.jl#L358-L381)
```julia
>(x)
```
Create a function that compares its argument to `x` using [`>`](https://docs.julialang.org/#Base.:>), i.e. a function equivalent to `y -> y > x`. The returned function is of type `Base.Fix2{typeof(>)}`, which can be used to implement specialized methods.

This functionality requires at least Julia 1.2.

[source](https://github.com/JuliaLang/julia/blob/17cfb8e65ead377bf1b4598d8a9869144142c84e/base/operators.jl#L1176-L1186)
```julia
>=(x, y)
≥(x,y)
```
Greater-than-or-equals comparison operator. Falls back to `y <= x`.

**Examples**


```julia
julia> 'a' >= 'b'
false

julia> 7 ≥ 7 ≥ 3
true

julia> "abc" ≥ "abc"
true

julia> 5 >= 3
true
```
[source](https://github.com/JuliaLang/julia/blob/17cfb8e65ead377bf1b4598d8a9869144142c84e/base/operators.jl#L408-L428)
```julia
>=(x)
```
Create a function that compares its argument to `x` using [`>=`](https://docs.julialang.org/#Base.:>=), i.e. a function equivalent to `y -> y >= x`. The returned function is of type `Base.Fix2{typeof(>=)}`, which can be used to implement specialized methods.

This functionality requires at least Julia 1.2.

[source](https://github.com/JuliaLang/julia/blob/17cfb8e65ead377bf1b4598d8a9869144142c84e/base/operators.jl#L1150-L1160)
```julia
cmp(x,y)
```
Return -1, 0, or 1 depending on whether `x` is less than, equal to, or greater than `y`, respectively. Uses the total order implemented by `isless`.

**Examples**


```julia
julia> cmp(1, 2)
-1

julia> cmp(2, 1)
1

julia> cmp(2+im, 3-im)
ERROR: MethodError: no method matching isless(::Complex{Int64}, ::Complex{Int64})
[...]
```
[source](https://github.com/JuliaLang/julia/blob/17cfb8e65ead377bf1b4598d8a9869144142c84e/base/operators.jl#L436-L454)
```julia
cmp(<, x, y)
```
Return -1, 0, or 1 depending on whether `x` is less than, equal to, or greater than `y`, respectively. The first argument specifies a less-than comparison function to use.

[source](https://github.com/JuliaLang/julia/blob/17cfb8e65ead377bf1b4598d8a9869144142c84e/base/operators.jl#L457-L462)
```julia
cmp(a::AbstractString, b::AbstractString) -> Int
```
Compare two strings. Return `0` if both strings have the same length and the character at each index is the same in both strings. Return `-1` if `a` is a prefix of `b`, or if `a` comes before `b` in alphabetical order. Return `1` if `b` is a prefix of `a`, or if `b` comes before `a` in alphabetical order (technically, lexicographical order by Unicode code points).

**Examples**


```julia
julia> cmp("abc", "abc")
0

julia> cmp("ab", "abc")
-1

julia> cmp("abc", "ab")
1

julia> cmp("ab", "ac")
-1

julia> cmp("ac", "ab")
1

julia> cmp("α", "a")
1

julia> cmp("b", "β")
-1
```
[source](https://github.com/JuliaLang/julia/blob/17cfb8e65ead377bf1b4598d8a9869144142c84e/base/strings/basic.jl#L266-L298)
```julia
~(x)
```
Bitwise not.

See also: [`!`](https://docs.julialang.org/#Base.:!), [`&`](https://docs.julialang.org/#Base.:&), [`|`](https://docs.julialang.org/#Base.:%7C).

**Examples**


```julia
julia> ~4
-5

julia> ~10
-11

julia> ~true
false
```
[source](https://github.com/JuliaLang/julia/blob/17cfb8e65ead377bf1b4598d8a9869144142c84e/base/int.jl#L295-L313)
```julia
x & y
```
Bitwise and. Implements [three-valued logic](https://en.wikipedia.org/wiki/Three-valued_logic), returning [`missing`](https://docs.julialang.org/../base/#Base.missing) if one operand is `missing` and the other is `true`. Add parentheses for function application form: `(&)(x, y)`.

See also: [`|`](https://docs.julialang.org/#Base.:%7C), [`xor`](https://docs.julialang.org/#Base.xor), [`&&`](https://docs.julialang.org/#&&).

**Examples**


```julia
julia> 4 & 10
0

julia> 4 & 12
4

julia> true & missing
missing

julia> false & missing
false
```
[source](https://github.com/JuliaLang/julia/blob/17cfb8e65ead377bf1b4598d8a9869144142c84e/base/int.jl#L316-L339)
```julia
x | y
```
Bitwise or. Implements [three-valued logic](https://en.wikipedia.org/wiki/Three-valued_logic), returning [`missing`](https://docs.julialang.org/../base/#Base.missing) if one operand is `missing` and the other is `false`.

See also: [`&`](https://docs.julialang.org/#Base.:&), [`xor`](https://docs.julialang.org/#Base.xor), [`||`](https://docs.julialang.org/#%7C%7C).

**Examples**


```julia
julia> 4 | 10
14

julia> 4 | 1
5

julia> true | missing
true

julia> false | missing
missing
```
[source](https://github.com/JuliaLang/julia/blob/17cfb8e65ead377bf1b4598d8a9869144142c84e/base/int.jl#L342-L364)
```julia
xor(x, y)
⊻(x, y)
```
Bitwise exclusive or of `x` and `y`. Implements [three-valued logic](https://en.wikipedia.org/wiki/Three-valued_logic), returning [`missing`](https://docs.julialang.org/../base/#Base.missing) if one of the arguments is `missing`.

The infix operation `a ⊻ b` is a synonym for `xor(a,b)`, and `⊻` can be typed by tab-completing `xor` or `veebar` in the Julia REPL.

**Examples**


```julia
julia> xor(true, false)
true

julia> xor(true, true)
false

julia> xor(true, missing)
missing

julia> false ⊻ false
false

julia> [true; true; false] .⊻ [true; false; false]
3-element BitVector:
 0
 1
 0
```
[source](https://github.com/JuliaLang/julia/blob/17cfb8e65ead377bf1b4598d8a9869144142c84e/base/bool.jl#L41-L72)
```julia
nand(x, y)
⊼(x, y)
```
Bitwise nand (not and) of `x` and `y`. Implements [three-valued logic](https://en.wikipedia.org/wiki/Three-valued_logic), returning [`missing`](https://docs.julialang.org/../base/#Base.missing) if one of the arguments is `missing`.

The infix operation `a ⊼ b` is a synonym for `nand(a,b)`, and `⊼` can be typed by tab-completing `nand` or `barwedge` in the Julia REPL.

**Examples**


```julia
julia> nand(true, false)
true

julia> nand(true, true)
false

julia> nand(true, missing)
missing

julia> false ⊼ false
true

julia> [true; true; false] .⊼ [true; false; false]
3-element BitVector:
 0
 1
 1
```
[source](https://github.com/JuliaLang/julia/blob/17cfb8e65ead377bf1b4598d8a9869144142c84e/base/bool.jl#L75-L106)
```julia
nor(x, y)
⊽(x, y)
```
Bitwise nor (not or) of `x` and `y`. Implements [three-valued logic](https://en.wikipedia.org/wiki/Three-valued_logic), returning [`missing`](https://docs.julialang.org/../base/#Base.missing) if one of the arguments is `missing`.

The infix operation `a ⊽ b` is a synonym for `nor(a,b)`, and `⊽` can be typed by tab-completing `nor` or `barvee` in the Julia REPL.

**Examples**


```julia
julia> nor(true, false)
false

julia> nor(true, true)
false

julia> nor(true, missing)
false

julia> false ⊽ false
true

julia> [true; true; false] .⊽ [true; false; false]
3-element BitVector:
 0
 0
 1
```
[source](https://github.com/JuliaLang/julia/blob/17cfb8e65ead377bf1b4598d8a9869144142c84e/base/bool.jl#L109-L140)
```julia
!(x)
```
Boolean not. Implements [three-valued logic](https://en.wikipedia.org/wiki/Three-valued_logic), returning [`missing`](https://docs.julialang.org/../base/#Base.missing) if `x` is `missing`.

See also [`~`](https://docs.julialang.org/#Base.:~) for bitwise not.

**Examples**


```julia
julia> !true
false

julia> !false
true

julia> !missing
missing

julia> .![true false true]
1×3 BitMatrix:
 0  1  0
```
[source](https://github.com/JuliaLang/julia/blob/17cfb8e65ead377bf1b4598d8a9869144142c84e/base/bool.jl#L11-L34)
```julia
!f::Function
```
Predicate function negation: when the argument of `!` is a function, it returns a function which computes the boolean negation of `f`.

See also [`∘`](https://docs.julialang.org/../base/#Base.:%E2%88%98).

**Examples**


```julia
julia> str = "∀ ε > 0, ∃ δ > 0: |x-y| < δ ⇒ |f(x)-f(y)| < ε"
"∀ ε > 0, ∃ δ > 0: |x-y| < δ ⇒ |f(x)-f(y)| < ε"

julia> filter(isletter, str)
"εδxyδfxfyε"

julia> filter(!isletter, str)
"∀  > 0, ∃  > 0: |-| <  ⇒ |()-()| < "
```
[source](https://github.com/JuliaLang/julia/blob/17cfb8e65ead377bf1b4598d8a9869144142c84e/base/operators.jl#L1057-L1076)
```julia
x && y
```
Short-circuiting boolean AND.

See also [`&`](https://docs.julialang.org/#Base.:&), the ternary operator `? :`, and the manual section on [control flow](https://docs.julialang.org/../../manual/control-flow/#man-conditional-evaluation).

**Examples**


```julia
julia> x = 3;

julia> x > 1 && x < 10 && x isa Int
true

julia> x < 0 && error("expected positive x")
false
```
[source](https://github.com/JuliaLang/julia/blob/17cfb8e65ead377bf1b4598d8a9869144142c84e/base/docs/basedocs.jl#L1026-L1043)
```julia
x || y
```
Short-circuiting boolean OR.

See also: [`|`](https://docs.julialang.org/#Base.:%7C), [`xor`](https://docs.julialang.org/#Base.xor), [`&&`](https://docs.julialang.org/#&&).

**Examples**


```julia
julia> pi < 3 || ℯ < 3
true

julia> false || true || println("neither is true!")
true
```
[source](https://github.com/JuliaLang/julia/blob/17cfb8e65ead377bf1b4598d8a9869144142c84e/base/docs/basedocs.jl#L1046-L1061)
```julia
isapprox(x, y; atol::Real=0, rtol::Real=atol>0 ? 0 : √eps, nans::Bool=false[, norm::Function])
```
Inexact equality comparison. Two numbers compare equal if their relative distance *or* their absolute distance is within tolerance bounds: `isapprox` returns `true` if `norm(x-y) <= max(atol, rtol*max(norm(x), norm(y)))`. The default `atol` is zero and the default `rtol` depends on the types of `x` and `y`. The keyword argument `nans` determines whether or not NaN values are considered equal (defaults to false).

For real or complex floating-point values, if an `atol > 0` is not specified, `rtol` defaults to the square root of [`eps`](https://docs.julialang.org/../base/#Base.eps-Tuple%7BType%7B<:AbstractFloat%7D%7D) of the type of `x` or `y`, whichever is bigger (least precise). This corresponds to requiring equality of about half of the significant digits. Otherwise, e.g. for integer arguments or if an `atol > 0` is supplied, `rtol` defaults to zero.

The `norm` keyword defaults to `abs` for numeric `(x,y)` and to `LinearAlgebra.norm` for arrays (where an alternative `norm` choice is sometimes useful). When `x` and `y` are arrays, if `norm(x-y)` is not finite (i.e. `±Inf` or `NaN`), the comparison falls back to checking whether all elements of `x` and `y` are approximately equal component-wise.

The binary operator `≈` is equivalent to `isapprox` with the default arguments, and `x ≉ y` is equivalent to `!isapprox(x,y)`.

Note that `x ≈ 0` (i.e., comparing to zero with the default tolerances) is equivalent to `x == 0` since the default `atol` is `0`. In such cases, you should either supply an appropriate `atol` (or use `norm(x) ≤ atol`) or rearrange your code (e.g. use `x ≈ y` rather than `x - y ≈ 0`). It is not possible to pick a nonzero `atol` automatically because it depends on the overall scaling (the "units") of your problem: for example, in `x - y ≈ 0`, `atol=1e-9` is an absurdly small tolerance if `x` is the [radius of the Earth](https://en.wikipedia.org/wiki/Earth_radius) in meters, but an absurdly large tolerance if `x` is the [radius of a Hydrogen atom](https://en.wikipedia.org/wiki/Bohr_radius) in meters.

Passing the `norm` keyword argument when comparing numeric (non-array) arguments requires Julia 1.6 or later.

**Examples**


```julia
julia> isapprox(0.1, 0.15; atol=0.05)
true

julia> isapprox(0.1, 0.15; rtol=0.34)
true

julia> isapprox(0.1, 0.15; rtol=0.33)
false

julia> 0.1 + 1e-10 ≈ 0.1
true

julia> 1e-10 ≈ 0
false

julia> isapprox(1e-10, 0, atol=1e-8)
true

julia> isapprox([10.0^9, 1.0], [10.0^9, 2.0]) # using `norm`
true
```
[source](https://github.com/JuliaLang/julia/blob/17cfb8e65ead377bf1b4598d8a9869144142c84e/base/floatfuncs.jl#L239-L299)
```julia
isapprox(x; kwargs...) / ≈(x; kwargs...)
```
Create a function that compares its argument to `x` using `≈`, i.e. a function equivalent to `y -> y ≈ x`.

The keyword arguments supported here are the same as those in the 2-argument `isapprox`.

This method requires Julia 1.5 or later.

[source](https://github.com/JuliaLang/julia/blob/17cfb8e65ead377bf1b4598d8a9869144142c84e/base/floatfuncs.jl#L306-L315)
```julia
sin(x)
```
Compute sine of `x`, where `x` is in radians.

See also [`sind`], [`sinpi`], [`sincos`], [`cis`].

[source](https://github.com/JuliaLang/julia/blob/17cfb8e65ead377bf1b4598d8a9869144142c84e/base/math.jl#L440-L446)
```julia
cos(x)
```
Compute cosine of `x`, where `x` is in radians.

See also [`cosd`], [`cospi`], [`sincos`], [`cis`].

[source](https://github.com/JuliaLang/julia/blob/17cfb8e65ead377bf1b4598d8a9869144142c84e/base/math.jl#L449-L455)
```julia
sincos(x)
```
Simultaneously compute the sine and cosine of `x`, where `x` is in radians, returning a tuple `(sine, cosine)`.

See also [`cis`](https://docs.julialang.org/#Base.cis), [`sincospi`](https://docs.julialang.org/#Base.Math.sincospi), [`sincosd`](#Base.Math.sincosd).

[source](https://github.com/JuliaLang/julia/blob/17cfb8e65ead377bf1b4598d8a9869144142c84e/base/special/trig.jl#L166-L173)
```julia
tan(x)
```
Compute tangent of `x`, where `x` is in radians.

[source](https://github.com/JuliaLang/julia/blob/17cfb8e65ead377bf1b4598d8a9869144142c84e/base/math.jl#L458-L462)
```julia
sind(x)
```
Compute sine of `x`, where `x` is in degrees. If `x` is a matrix, `x` needs to be a square matrix.

Matrix arguments require Julia 1.7 or later.

[source](https://github.com/JuliaLang/julia/blob/17cfb8e65ead377bf1b4598d8a9869144142c84e/base/special/trig.jl#L1267-L1275)
```julia
cosd(x)
```
Compute cosine of `x`, where `x` is in degrees. If `x` is a matrix, `x` needs to be a square matrix.

Matrix arguments require Julia 1.7 or later.

[source](https://github.com/JuliaLang/julia/blob/17cfb8e65ead377bf1b4598d8a9869144142c84e/base/special/trig.jl#L1267-L1275)
```julia
tand(x)
```
Compute tangent of `x`, where `x` is in degrees. If `x` is a matrix, `x` needs to be a square matrix.

Matrix arguments require Julia 1.7 or later.

[source](https://github.com/JuliaLang/julia/blob/17cfb8e65ead377bf1b4598d8a9869144142c84e/base/special/trig.jl#L1267-L1275)
```julia
sincosd(x)
```
Simultaneously compute the sine and cosine of `x`, where `x` is in degrees.

This function requires at least Julia 1.3.

[source](https://github.com/JuliaLang/julia/blob/17cfb8e65ead377bf1b4598d8a9869144142c84e/base/special/trig.jl#L1249-L1256)
```julia
sinpi(x)
```
Compute $sin(pi x)$ more accurately than `sin(pi*x)`, especially for large `x`.

See also [`sind`](https://docs.julialang.org/#Base.Math.sind), [`cospi`](https://docs.julialang.org/#Base.Math.cospi), [`sincospi`](#Base.Math.sincospi).

[source](https://github.com/JuliaLang/julia/blob/17cfb8e65ead377bf1b4598d8a9869144142c84e/base/special/trig.jl#L743-L749)
```julia
cospi(x)
```
Compute $cos(pi x)$ more accurately than `cos(pi*x)`, especially for large `x`.

[source](https://github.com/JuliaLang/julia/blob/17cfb8e65ead377bf1b4598d8a9869144142c84e/base/special/trig.jl#L808-L812)
```julia
sincospi(x)
```
Simultaneously compute [`sinpi(x)`](https://docs.julialang.org/#Base.Math.sinpi) and [`cospi(x)`](https://docs.julialang.org/#Base.Math.cospi) (the sine and cosine of `π*x`, where `x` is in radians), returning a tuple `(sine, cosine)`.

This function requires Julia 1.6 or later.

See also: [`cispi`](https://docs.julialang.org/#Base.cispi), [`sincosd`](https://docs.julialang.org/#Base.Math.sincosd), [`sinpi`](#Base.Math.sinpi).

[source](https://github.com/JuliaLang/julia/blob/17cfb8e65ead377bf1b4598d8a9869144142c84e/base/special/trig.jl#L862-L872)
```julia
sinh(x)
```
Compute hyperbolic sine of `x`.

[source](https://github.com/JuliaLang/julia/blob/17cfb8e65ead377bf1b4598d8a9869144142c84e/base/math.jl#L389-L393)
```julia
cosh(x)
```
Compute hyperbolic cosine of `x`.

[source](https://github.com/JuliaLang/julia/blob/17cfb8e65ead377bf1b4598d8a9869144142c84e/base/math.jl#L396-L400)
```julia
tanh(x)
```
Compute hyperbolic tangent of `x`.

[source](https://github.com/JuliaLang/julia/blob/17cfb8e65ead377bf1b4598d8a9869144142c84e/base/math.jl#L403-L407)
```julia
asin(x)
```
Compute the inverse sine of `x`, where the output is in radians.

[source](https://github.com/JuliaLang/julia/blob/17cfb8e65ead377bf1b4598d8a9869144142c84e/base/math.jl#L465-L469)
```julia
acos(x)
```
Compute the inverse cosine of `x`, where the output is in radians

[source](https://github.com/JuliaLang/julia/blob/17cfb8e65ead377bf1b4598d8a9869144142c84e/base/math.jl#L472-L476)
```julia
atan(y)
atan(y, x)
```
Compute the inverse tangent of `y` or `y/x`, respectively.

For one argument, this is the angle in radians between the positive *x*-axis and the point (1, *y*), returning a value in the interval $[-pi/2, pi/2]$.

For two arguments, this is the angle in radians between the positive *x*-axis and the point (*x*, *y*), returning a value in the interval $[-pi, pi]$. This corresponds to a standard [`atan2`](https://en.wikipedia.org/wiki/Atan2) function. Note that by convention `atan(0.0,x)` is defined as $pi$ and `atan(-0.0,x)` is defined as $-pi$ when `x < 0`.

[source](https://github.com/JuliaLang/julia/blob/17cfb8e65ead377bf1b4598d8a9869144142c84e/base/math.jl#L410-L423)
```julia
asind(x)
```
Compute the inverse sine of `x`, where the output is in degrees. If `x` is a matrix, `x` needs to be a square matrix.

Matrix arguments require Julia 1.7 or later.

[source](https://github.com/JuliaLang/julia/blob/17cfb8e65ead377bf1b4598d8a9869144142c84e/base/special/trig.jl#L1286-L1294)
```julia
acosd(x)
```
Compute the inverse cosine of `x`, where the output is in degrees. If `x` is a matrix, `x` needs to be a square matrix.

Matrix arguments require Julia 1.7 or later.

[source](https://github.com/JuliaLang/julia/blob/17cfb8e65ead377bf1b4598d8a9869144142c84e/base/special/trig.jl#L1286-L1294)
```julia
atand(y)
atand(y,x)
```
Compute the inverse tangent of `y` or `y/x`, respectively, where the output is in degrees.

The one-argument method supports square matrix arguments as of Julia 1.7.

[source](https://github.com/JuliaLang/julia/blob/17cfb8e65ead377bf1b4598d8a9869144142c84e/base/special/trig.jl#L1299-L1307)
```julia
sec(x)
```
Compute the secant of `x`, where `x` is in radians.

[source](https://github.com/JuliaLang/julia/blob/17cfb8e65ead377bf1b4598d8a9869144142c84e/base/special/trig.jl#L1138-L1142)
```julia
csc(x)
```
Compute the cosecant of `x`, where `x` is in radians.

[source](https://github.com/JuliaLang/julia/blob/17cfb8e65ead377bf1b4598d8a9869144142c84e/base/special/trig.jl#L1138-L1142)
```julia
cot(x)
```
Compute the cotangent of `x`, where `x` is in radians.

[source](https://github.com/JuliaLang/julia/blob/17cfb8e65ead377bf1b4598d8a9869144142c84e/base/special/trig.jl#L1138-L1142)
```julia
secd(x)
```
Compute the secant of `x`, where `x` is in degrees.

[source](https://github.com/JuliaLang/julia/blob/17cfb8e65ead377bf1b4598d8a9869144142c84e/base/special/trig.jl#L1148-L1152)
```julia
cscd(x)
```
Compute the cosecant of `x`, where `x` is in degrees.

[source](https://github.com/JuliaLang/julia/blob/17cfb8e65ead377bf1b4598d8a9869144142c84e/base/special/trig.jl#L1148-L1152)
```julia
cotd(x)
```
Compute the cotangent of `x`, where `x` is in degrees.

[source](https://github.com/JuliaLang/julia/blob/17cfb8e65ead377bf1b4598d8a9869144142c84e/base/special/trig.jl#L1148-L1152)
```julia
asec(x)
```
Compute the inverse secant of `x`, where the output is in radians. 

[source](https://github.com/JuliaLang/julia/blob/17cfb8e65ead377bf1b4598d8a9869144142c84e/base/special/trig.jl#L1162-L1164)
```julia
acsc(x)
```
Compute the inverse cosecant of `x`, where the output is in radians. 

[source](https://github.com/JuliaLang/julia/blob/17cfb8e65ead377bf1b4598d8a9869144142c84e/base/special/trig.jl#L1162-L1164)
```julia
acot(x)
```
Compute the inverse cotangent of `x`, where the output is in radians. 

[source](https://github.com/JuliaLang/julia/blob/17cfb8e65ead377bf1b4598d8a9869144142c84e/base/special/trig.jl#L1162-L1164)
```julia
asecd(x)
```
Compute the inverse secant of `x`, where the output is in degrees. If `x` is a matrix, `x` needs to be a square matrix.

Matrix arguments require Julia 1.7 or later.

[source](https://github.com/JuliaLang/julia/blob/17cfb8e65ead377bf1b4598d8a9869144142c84e/base/special/trig.jl#L1286-L1294)
```julia
acscd(x)
```
Compute the inverse cosecant of `x`, where the output is in degrees. If `x` is a matrix, `x` needs to be a square matrix.

Matrix arguments require Julia 1.7 or later.

[source](https://github.com/JuliaLang/julia/blob/17cfb8e65ead377bf1b4598d8a9869144142c84e/base/special/trig.jl#L1286-L1294)
```julia
acotd(x)
```
Compute the inverse cotangent of `x`, where the output is in degrees. If `x` is a matrix, `x` needs to be a square matrix.

Matrix arguments require Julia 1.7 or later.

[source](https://github.com/JuliaLang/julia/blob/17cfb8e65ead377bf1b4598d8a9869144142c84e/base/special/trig.jl#L1286-L1294)
```julia
sech(x)
```
Compute the hyperbolic secant of `x`.

[source](https://github.com/JuliaLang/julia/blob/17cfb8e65ead377bf1b4598d8a9869144142c84e/base/special/trig.jl#L1143-L1147)
```julia
csch(x)
```
Compute the hyperbolic cosecant of `x`.

[source](https://github.com/JuliaLang/julia/blob/17cfb8e65ead377bf1b4598d8a9869144142c84e/base/special/trig.jl#L1143-L1147)
```julia
coth(x)
```
Compute the hyperbolic cotangent of `x`.

[source](https://github.com/JuliaLang/julia/blob/17cfb8e65ead377bf1b4598d8a9869144142c84e/base/special/trig.jl#L1143-L1147)
```julia
asinh(x)
```
Compute the inverse hyperbolic sine of `x`.

[source](https://github.com/JuliaLang/julia/blob/17cfb8e65ead377bf1b4598d8a9869144142c84e/base/math.jl#L426-L430)
```julia
acosh(x)
```
Compute the inverse hyperbolic cosine of `x`.

[source](https://github.com/JuliaLang/julia/blob/17cfb8e65ead377bf1b4598d8a9869144142c84e/base/math.jl#L479-L483)
```julia
atanh(x)
```
Compute the inverse hyperbolic tangent of `x`.

[source](https://github.com/JuliaLang/julia/blob/17cfb8e65ead377bf1b4598d8a9869144142c84e/base/math.jl#L486-L490)
```julia
asech(x)
```
Compute the inverse hyperbolic secant of `x`. 

[source](https://github.com/JuliaLang/julia/blob/17cfb8e65ead377bf1b4598d8a9869144142c84e/base/special/trig.jl#L1165-L1167)
```julia
acsch(x)
```
Compute the inverse hyperbolic cosecant of `x`. 

[source](https://github.com/JuliaLang/julia/blob/17cfb8e65ead377bf1b4598d8a9869144142c84e/base/special/trig.jl#L1165-L1167)
```julia
acoth(x)
```
Compute the inverse hyperbolic cotangent of `x`. 

[source](https://github.com/JuliaLang/julia/blob/17cfb8e65ead377bf1b4598d8a9869144142c84e/base/special/trig.jl#L1165-L1167)
```julia
sinc(x)
```
Compute $sin(pi x) / (pi x)$ if $x neq 0$, and $1$ if $x = 0$.

See also [`cosc`](https://docs.julialang.org/#Base.Math.cosc), its derivative.

[source](https://github.com/JuliaLang/julia/blob/17cfb8e65ead377bf1b4598d8a9869144142c84e/base/special/trig.jl#L1074-L1080)
```julia
cosc(x)
```
Compute $cos(pi x) / x - sin(pi x) / (pi x^2)$ if $x neq 0$, and $0$ if $x = 0$. This is the derivative of `sinc(x)`.

[source](https://github.com/JuliaLang/julia/blob/17cfb8e65ead377bf1b4598d8a9869144142c84e/base/special/trig.jl#L1091-L1096)
```julia
deg2rad(x)
```
Convert `x` from degrees to radians.

See also: [`rad2deg`](https://docs.julialang.org/#Base.Math.rad2deg), [`sind`](https://docs.julialang.org/#Base.Math.sind).

**Examples**


```julia
julia> deg2rad(90)
1.5707963267948966
```
[source](https://github.com/JuliaLang/julia/blob/17cfb8e65ead377bf1b4598d8a9869144142c84e/base/math.jl#L320-L332)
```julia
rad2deg(x)
```
Convert `x` from radians to degrees.

**Examples**


```julia
julia> rad2deg(pi)
180.0
```
[source](https://github.com/JuliaLang/julia/blob/17cfb8e65ead377bf1b4598d8a9869144142c84e/base/math.jl#L307-L317)
```julia
hypot(x, y)
```
Compute the hypotenuse $sqrt{|x|^2+|y|^2}$ avoiding overflow and underflow.

This code is an implementation of the algorithm described in: An Improved Algorithm for `hypot(a,b)` by Carlos F. Borges The article is available online at ArXiv at the link https://arxiv.org/abs/1904.09481


```julia
hypot(x...)
```
Compute the hypotenuse $sqrt{sum |x_i|^2}$ avoiding overflow and underflow.

See also `norm` in the [`LinearAlgebra`](https://docs.julialang.org/../../stdlib/LinearAlgebra/#man-linalg) standard library.

**Examples**


```julia
julia> a = Int64(10)^10;

julia> hypot(a, a)
1.4142135623730951e10

julia> √(a^2 + a^2) # a^2 overflows
ERROR: DomainError with -2.914184810805068e18:
sqrt will only return a complex result if called with a complex argument. Try sqrt(Complex(x)).
Stacktrace:
[...]

julia> hypot(3, 4im)
5.0

julia> hypot(-5.7)
5.7

julia> hypot(3, 4im, 12.0)
13.0

julia> using LinearAlgebra

julia> norm([a, a, a, a]) == hypot(a, a, a, a)
true
```
[source](https://github.com/JuliaLang/julia/blob/17cfb8e65ead377bf1b4598d8a9869144142c84e/base/math.jl#L628-L672)
```julia
log(x)
```
Compute the natural logarithm of `x`. Throws [`DomainError`](https://docs.julialang.org/../base/#Core.DomainError) for negative [`Real`](https://docs.julialang.org/../numbers/#Core.Real) arguments. Use complex negative arguments to obtain complex results.

See also [`log1p`], [`log2`], [`log10`].

**Examples**


```julia
julia> log(2)
0.6931471805599453

julia> log(-3)
ERROR: DomainError with -3.0:
log will only return a complex result if called with a complex argument. Try log(Complex(x)).
Stacktrace:
 [1] throw_complex_domainerror(::Symbol, ::Float64) at ./math.jl:31
[...]
```
[source](https://github.com/JuliaLang/julia/blob/17cfb8e65ead377bf1b4598d8a9869144142c84e/base/math.jl#L493-L513)
```julia
log(b,x)
```
Compute the base `b` logarithm of `x`. Throws [`DomainError`](https://docs.julialang.org/../base/#Core.DomainError) for negative [`Real`](https://docs.julialang.org/../numbers/#Core.Real) arguments.

**Examples**


```julia
julia> log(4,8)
1.5

julia> log(4,2)
0.5

julia> log(-2, 3)
ERROR: DomainError with -2.0:
log will only return a complex result if called with a complex argument. Try log(Complex(x)).
Stacktrace:
 [1] throw_complex_domainerror(::Symbol, ::Float64) at ./math.jl:31
[...]

julia> log(2, -3)
ERROR: DomainError with -3.0:
log will only return a complex result if called with a complex argument. Try log(Complex(x)).
Stacktrace:
 [1] throw_complex_domainerror(::Symbol, ::Float64) at ./math.jl:31
[...]
```
If `b` is a power of 2 or 10, [`log2`](https://docs.julialang.org/#Base.log2) or [`log10`](https://docs.julialang.org/#Base.log10) should be used, as these will typically be faster and more accurate. For example,


```julia
julia> log(100,1000000)
2.9999999999999996

julia> log10(1000000)/2
3.0
```
[source](https://github.com/JuliaLang/julia/blob/17cfb8e65ead377bf1b4598d8a9869144142c84e/base/math.jl#L341-L381)
```julia
log2(x)
```
Compute the logarithm of `x` to base 2. Throws [`DomainError`](https://docs.julialang.org/../base/#Core.DomainError) for negative [`Real`](https://docs.julialang.org/../numbers/#Core.Real) arguments.

See also: [`exp2`](https://docs.julialang.org/#Base.exp2), [`ldexp`](https://docs.julialang.org/#Base.Math.ldexp), [`ispow2`](https://docs.julialang.org/#Base.ispow2).

**Examples**


```julia
julia> log2(4)
2.0

julia> log2(10)
3.321928094887362

julia> log2(-2)
ERROR: DomainError with -2.0:
log2 will only return a complex result if called with a complex argument. Try log2(Complex(x)).
Stacktrace:
 [1] throw_complex_domainerror(f::Symbol, x::Float64) at ./math.jl:31
[...]
```
[source](https://github.com/JuliaLang/julia/blob/17cfb8e65ead377bf1b4598d8a9869144142c84e/base/math.jl#L516-L539)
```julia
log10(x)
```
Compute the logarithm of `x` to base 10. Throws [`DomainError`](https://docs.julialang.org/../base/#Core.DomainError) for negative [`Real`](https://docs.julialang.org/../numbers/#Core.Real) arguments.

**Examples**


```julia
julia> log10(100)
2.0

julia> log10(2)
0.3010299956639812

julia> log10(-2)
ERROR: DomainError with -2.0:
log10 will only return a complex result if called with a complex argument. Try log10(Complex(x)).
Stacktrace:
 [1] throw_complex_domainerror(f::Symbol, x::Float64) at ./math.jl:31
[...]
```
[source](https://github.com/JuliaLang/julia/blob/17cfb8e65ead377bf1b4598d8a9869144142c84e/base/math.jl#L542-L563)
```julia
log1p(x)
```
Accurate natural logarithm of `1+x`. Throws [`DomainError`](https://docs.julialang.org/../base/#Core.DomainError) for [`Real`](https://docs.julialang.org/../numbers/#Core.Real) arguments less than -1.

**Examples**


```julia
julia> log1p(-0.5)
-0.6931471805599453

julia> log1p(0)
0.0

julia> log1p(-2)
ERROR: DomainError with -2.0:
log1p will only return a complex result if called with a complex argument. Try log1p(Complex(x)).
Stacktrace:
 [1] throw_complex_domainerror(::Symbol, ::Float64) at ./math.jl:31
[...]
```
[source](https://github.com/JuliaLang/julia/blob/17cfb8e65ead377bf1b4598d8a9869144142c84e/base/math.jl#L566-L587)
```julia
frexp(val)
```
Return `(x,exp)` such that `x` has a magnitude in the interval $[1/2, 1)$ or 0, and `val` is equal to $x times 2^{exp}$.

**Examples**


```julia
julia> frexp(12.8)
(0.8, 4)
```
[source](https://github.com/JuliaLang/julia/blob/17cfb8e65ead377bf1b4598d8a9869144142c84e/base/math.jl#L909-L919)
```julia
exp(x)
```
Compute the natural base exponential of `x`, in other words $ℯ^x$.

See also [`exp2`](https://docs.julialang.org/#Base.exp2), [`exp10`](https://docs.julialang.org/#Base.exp10) and [`cis`](https://docs.julialang.org/#Base.cis).

**Examples**


```julia
julia> exp(1.0)
2.718281828459045

julia> exp(im * pi) ≈ cis(pi)
true
```
[source](https://github.com/JuliaLang/julia/blob/17cfb8e65ead377bf1b4598d8a9869144142c84e/base/special/exp.jl#L331-L346)
```julia
exp2(x)
```
Compute the base 2 exponential of `x`, in other words $2^x$.

See also [`ldexp`](https://docs.julialang.org/#Base.Math.ldexp), [`<<`](https://docs.julialang.org/#Base.:<<).

**Examples**


```julia
julia> exp2(5)
32.0

julia> 2^5
32

julia> exp2(63) > typemax(Int)
true
```
[source](https://github.com/JuliaLang/julia/blob/17cfb8e65ead377bf1b4598d8a9869144142c84e/base/special/exp.jl#L348-L366)
```julia
exp10(x)
```
Compute the base 10 exponential of `x`, in other words $10^x$.

**Examples**


```julia
julia> exp10(2)
100.0

julia> 10^2
100
```
[source](https://github.com/JuliaLang/julia/blob/17cfb8e65ead377bf1b4598d8a9869144142c84e/base/special/exp.jl#L369-L382)
```julia
ldexp(x, n)
```
Compute $x times 2^n$.

**Examples**


```julia
julia> ldexp(5., 2)
20.0
```
[source](https://github.com/JuliaLang/julia/blob/17cfb8e65ead377bf1b4598d8a9869144142c84e/base/math.jl#L772-L782)
```julia
modf(x)
```
Return a tuple `(fpart, ipart)` of the fractional and integral parts of a number. Both parts have the same sign as the argument.

**Examples**


```julia
julia> modf(3.5)
(0.5, 3.0)

julia> modf(-3.5)
(-0.5, -3.0)
```
[source](https://github.com/JuliaLang/julia/blob/17cfb8e65ead377bf1b4598d8a9869144142c84e/base/math.jl#L972-L986)
```julia
expm1(x)
```
Accurately compute $e^x-1$. It avoids the loss of precision involved in the direct evaluation of exp(x)-1 for small values of x.

**Examples**


```julia
julia> expm1(1e-16)
1.0e-16

julia> exp(1e-16) - 1
0.0
```
[source](https://github.com/JuliaLang/julia/blob/17cfb8e65ead377bf1b4598d8a9869144142c84e/base/special/exp.jl#L487-L500)
```julia
round([T,] x, [r::RoundingMode])
round(x, [r::RoundingMode]; digits::Integer=0, base = 10)
round(x, [r::RoundingMode]; sigdigits::Integer, base = 10)
```
Rounds the number `x`.

Without keyword arguments, `x` is rounded to an integer value, returning a value of type `T`, or of the same type of `x` if no `T` is provided. An [`InexactError`](https://docs.julialang.org/../base/#Core.InexactError) will be thrown if the value is not representable by `T`, similar to [`convert`](https://docs.julialang.org/../base/#Base.convert).

If the `digits` keyword argument is provided, it rounds to the specified number of digits after the decimal place (or before if negative), in base `base`.

If the `sigdigits` keyword argument is provided, it rounds to the specified number of significant digits, in base `base`.

The [`RoundingMode`](https://docs.julialang.org/#Base.Rounding.RoundingMode) `r` controls the direction of the rounding; the default is [`RoundNearest`](https://docs.julialang.org/#Base.Rounding.RoundNearest), which rounds to the nearest integer, with ties (fractional values of 0.5) being rounded to the nearest even integer. Note that `round` may give incorrect results if the global rounding mode is changed (see [`rounding`](https://docs.julialang.org/../numbers/#Base.Rounding.rounding)).

**Examples**


```julia
julia> round(1.7)
2.0

julia> round(Int, 1.7)
2

julia> round(1.5)
2.0

julia> round(2.5)
2.0

julia> round(pi; digits=2)
3.14

julia> round(pi; digits=3, base=2)
3.125

julia> round(123.456; sigdigits=2)
120.0

julia> round(357.913; sigdigits=4, base=2)
352.0
```
Rounding to specified digits in bases other than 2 can be inexact when operating on binary floating point numbers. For example, the [`Float64`](https://docs.julialang.org/../numbers/#Core.Float64) value represented by `1.15` is actually *less* than 1.15, yet will be rounded to 1.2. For example:


```julia
julia> x = 1.15
1.15

julia> @sprintf "%.20f" x
"1.14999999999999991118"

julia> x < 115//100
true

julia> round(x, digits=1)
1.2
```
**Extensions**

To extend `round` to new numeric types, it is typically sufficient to define `Base.round(x::NewType, r::RoundingMode)`.

[source](https://github.com/JuliaLang/julia/blob/17cfb8e65ead377bf1b4598d8a9869144142c84e/base/floatfuncs.jl#L47-L119)
```julia
RoundingMode
```
A type used for controlling the rounding mode of floating point operations (via [`rounding`](https://docs.julialang.org/../numbers/#Base.Rounding.rounding)/[`setrounding`](https://docs.julialang.org/../numbers/#Base.Rounding.setrounding-Tuple%7BType,%20Any%7D) functions), or as optional arguments for rounding to the nearest integer (via the [`round`](https://docs.julialang.org/#Base.round-Tuple%7BType,%20Any%7D) function).

Currently supported rounding modes are:

[source](https://github.com/JuliaLang/julia/blob/17cfb8e65ead377bf1b4598d8a9869144142c84e/base/rounding.jl#L26-L43)
```julia
RoundNearest
```
The default rounding mode. Rounds to the nearest integer, with ties (fractional values of 0.5) being rounded to the nearest even integer.

[source](https://github.com/JuliaLang/julia/blob/17cfb8e65ead377bf1b4598d8a9869144142c84e/base/rounding.jl#L46-L51)
```julia
RoundNearestTiesAway
```
Rounds to nearest integer, with ties rounded away from zero (C/C++ [`round`](https://docs.julialang.org/#Base.round-Tuple%7BType,%20Any%7D) behaviour).

[source](https://github.com/JuliaLang/julia/blob/17cfb8e65ead377bf1b4598d8a9869144142c84e/base/rounding.jl#L89-L94)
```julia
RoundNearestTiesUp
```
Rounds to nearest integer, with ties rounded toward positive infinity (Java/JavaScript [`round`](https://docs.julialang.org/#Base.round-Tuple%7BType,%20Any%7D) behaviour).

[source](https://github.com/JuliaLang/julia/blob/17cfb8e65ead377bf1b4598d8a9869144142c84e/base/rounding.jl#L97-L102)
```julia
RoundFromZero
```
Rounds away from zero. This rounding mode may only be used with `T == BigFloat` inputs to [`round`](https://docs.julialang.org/#Base.round-Tuple%7BType,%20Any%7D).

**Examples**


```julia
julia> BigFloat("1.0000000000000001", 5, RoundFromZero)
1.06
```
[source](https://github.com/JuliaLang/julia/blob/17cfb8e65ead377bf1b4598d8a9869144142c84e/base/rounding.jl#L75-L86)
```julia
round(z::Complex[, RoundingModeReal, [RoundingModeImaginary]])
round(z::Complex[, RoundingModeReal, [RoundingModeImaginary]]; digits=, base=10)
round(z::Complex[, RoundingModeReal, [RoundingModeImaginary]]; sigdigits=, base=10)
```
Return the nearest integral value of the same type as the complex-valued `z` to `z`, breaking ties using the specified [`RoundingMode`](https://docs.julialang.org/#Base.Rounding.RoundingMode)s. The first [`RoundingMode`](https://docs.julialang.org/#Base.Rounding.RoundingMode) is used for rounding the real components while the second is used for rounding the imaginary components.

**Example**


```julia
julia> round(3.14 + 4.5im)
3.0 + 4.0im
```
[source](https://github.com/JuliaLang/julia/blob/17cfb8e65ead377bf1b4598d8a9869144142c84e/base/complex.jl#L1064-L1079)
```julia
ceil([T,] x)
ceil(x; digits::Integer= [, base = 10])
ceil(x; sigdigits::Integer= [, base = 10])
```
`ceil(x)` returns the nearest integral value of the same type as `x` that is greater than or equal to `x`.

`ceil(T, x)` converts the result to type `T`, throwing an `InexactError` if the value is not representable.

Keywords `digits`, `sigdigits` and `base` work as for [`round`](#Base.round-Tuple%7BType,%20Any%7D).

[source](https://github.com/JuliaLang/julia/blob/17cfb8e65ead377bf1b4598d8a9869144142c84e/base/int.jl#L634-L646)
```julia
floor([T,] x)
floor(x; digits::Integer= [, base = 10])
floor(x; sigdigits::Integer= [, base = 10])
```
`floor(x)` returns the nearest integral value of the same type as `x` that is less than or equal to `x`.

`floor(T, x)` converts the result to type `T`, throwing an `InexactError` if the value is not representable.

Keywords `digits`, `sigdigits` and `base` work as for [`round`](#Base.round-Tuple%7BType,%20Any%7D).

[source](https://github.com/JuliaLang/julia/blob/17cfb8e65ead377bf1b4598d8a9869144142c84e/base/int.jl#L619-L631)
```julia
trunc([T,] x)
trunc(x; digits::Integer= [, base = 10])
trunc(x; sigdigits::Integer= [, base = 10])
```
`trunc(x)` returns the nearest integral value of the same type as `x` whose absolute value is less than or equal to the absolute value of `x`.

`trunc(T, x)` converts the result to type `T`, throwing an `InexactError` if the value is not representable.

Keywords `digits`, `sigdigits` and `base` work as for [`round`](https://docs.julialang.org/#Base.round-Tuple%7BType,%20Any%7D).

See also: [`%`](https://docs.julialang.org/#Base.rem), [`floor`](https://docs.julialang.org/#Base.floor), [`unsigned`](https://docs.julialang.org/../numbers/#Base.unsigned), [`unsafe_trunc`](https://docs.julialang.org/#Base.unsafe_trunc).

**Examples**


```julia
julia> trunc(2.22)
2.0

julia> trunc(-2.22, digits=1)
-2.2

julia> trunc(Int, -2.22)
-2
```
[source](https://github.com/JuliaLang/julia/blob/17cfb8e65ead377bf1b4598d8a9869144142c84e/base/int.jl#L590-L616)
```julia
unsafe_trunc(T, x)
```
Return the nearest integral value of type `T` whose absolute value is less than or equal to the absolute value of `x`. If the value is not representable by `T`, an arbitrary value will be returned. See also [`trunc`](https://docs.julialang.org/#Base.trunc).

**Examples**


```julia
julia> unsafe_trunc(Int, -2.2)
-2

julia> unsafe_trunc(Int, NaN)
-9223372036854775808
```
[source](https://github.com/JuliaLang/julia/blob/17cfb8e65ead377bf1b4598d8a9869144142c84e/base/float.jl#L289-L305)
```julia
min(x, y, ...)
```
Return the minimum of the arguments (with respect to [`isless`](https://docs.julialang.org/../base/#Base.isless)). See also the [`minimum`](https://docs.julialang.org/../collections/#Base.minimum) function to take the minimum element from a collection.

**Examples**


```julia
julia> min(2, 5, 1)
1
```
[source](https://github.com/JuliaLang/julia/blob/17cfb8e65ead377bf1b4598d8a9869144142c84e/base/operators.jl#L482-L493)
```julia
max(x, y, ...)
```
Return the maximum of the arguments (with respect to [`isless`](https://docs.julialang.org/../base/#Base.isless)). See also the [`maximum`](https://docs.julialang.org/../collections/#Base.maximum) function to take the maximum element from a collection.

**Examples**


```julia
julia> max(2, 5, 1)
5
```
[source](https://github.com/JuliaLang/julia/blob/17cfb8e65ead377bf1b4598d8a9869144142c84e/base/operators.jl#L468-L479)
```julia
minmax(x, y)
```
Return `(min(x,y), max(x,y))`.

See also [`extrema`](https://docs.julialang.org/../collections/#Base.extrema) that returns `(minimum(x), maximum(x))`.

**Examples**


```julia
julia> minmax('c','b')
('b', 'c')
```
[source](https://github.com/JuliaLang/julia/blob/17cfb8e65ead377bf1b4598d8a9869144142c84e/base/operators.jl#L496-L508)
```julia
clamp(x, lo, hi)
```
Return `x` if `lo <= x <= hi`. If `x > hi`, return `hi`. If `x < lo`, return `lo`. Arguments are promoted to a common type.

See also [`clamp!`](https://docs.julialang.org/#Base.Math.clamp!), [`min`](https://docs.julialang.org/#Base.min), [`max`](https://docs.julialang.org/#Base.max).

`missing` as the first argument requires at least Julia 1.3.

**Examples**


```julia
julia> clamp.([pi, 1.0, big(10)], 2.0, 9.0)
3-element Vector{BigFloat}:
 3.141592653589793238462643383279502884197169399375105820974944592307816406286198
 2.0
 9.0

julia> clamp.([11, 8, 5], 10, 6)  # an example where lo > hi
3-element Vector{Int64}:
  6
  6
 10
```
[source](https://github.com/JuliaLang/julia/blob/17cfb8e65ead377bf1b4598d8a9869144142c84e/base/math.jl#L63-L88)
```julia
clamp(x, T)::T
```
Clamp `x` between `typemin(T)` and `typemax(T)` and convert the result to type `T`.

See also [`trunc`](https://docs.julialang.org/#Base.trunc).

**Examples**


```julia
julia> clamp(200, Int8)
127

julia> clamp(-200, Int8)
-128

julia> trunc(Int, 4pi^2)
39
```
[source](https://github.com/JuliaLang/julia/blob/17cfb8e65ead377bf1b4598d8a9869144142c84e/base/math.jl#L95-L113)
```julia
clamp(x::Integer, r::AbstractUnitRange)
```
Clamp `x` to lie within range `r`.

This method requires at least Julia 1.6.

[source](https://github.com/JuliaLang/julia/blob/17cfb8e65ead377bf1b4598d8a9869144142c84e/base/math.jl#L146-L153)
```julia
clamp!(array::AbstractArray, lo, hi)
```
Restrict values in `array` to the specified range, in-place. See also [`clamp`](https://docs.julialang.org/#Base.Math.clamp).

`missing` entries in `array` require at least Julia 1.3.

**Examples**


```julia
julia> row = collect(-4:4)';

julia> clamp!(row, 0, Inf)
1×9 adjoint(::Vector{Int64}) with eltype Int64:
 0  0  0  0  0  1  2  3  4

julia> clamp.((-4:4)', 0, Inf)
1×9 Matrix{Float64}:
 0.0  0.0  0.0  0.0  0.0  1.0  2.0  3.0  4.0
```
[source](https://github.com/JuliaLang/julia/blob/17cfb8e65ead377bf1b4598d8a9869144142c84e/base/math.jl#L117-L138)
```julia
abs(x)
```
The absolute value of `x`.

When `abs` is applied to signed integers, overflow may occur, resulting in the return of a negative value. This overflow occurs only when `abs` is applied to the minimum representable value of a signed integer. That is, when `x == typemin(typeof(x))`, `abs(x) == x < 0`, not `-x` as might be expected.

See also: [`abs2`](https://docs.julialang.org/#Base.abs2), [`unsigned`](https://docs.julialang.org/../numbers/#Base.unsigned), [`sign`](https://docs.julialang.org/#Base.sign).

**Examples**


```julia
julia> abs(-3)
3

julia> abs(1 + im)
1.4142135623730951

julia> abs(typemin(Int64))
-9223372036854775808
```
[source](https://github.com/JuliaLang/julia/blob/17cfb8e65ead377bf1b4598d8a9869144142c84e/base/int.jl#L156-L180)
```julia
Base.checked_abs(x)
```
Calculates `abs(x)`, checking for overflow errors where applicable. For example, standard two's complement signed integers (e.g. `Int`) cannot represent `abs(typemin(Int))`, thus leading to an overflow.

The overflow protection may impose a perceptible performance penalty.

[source](https://github.com/JuliaLang/julia/blob/17cfb8e65ead377bf1b4598d8a9869144142c84e/base/checked.jl#L105-L113)
```julia
Base.checked_neg(x)
```
Calculates `-x`, checking for overflow errors where applicable. For example, standard two's complement signed integers (e.g. `Int`) cannot represent `-typemin(Int)`, thus leading to an overflow.

The overflow protection may impose a perceptible performance penalty.

[source](https://github.com/JuliaLang/julia/blob/17cfb8e65ead377bf1b4598d8a9869144142c84e/base/checked.jl#L77-L85)
```julia
Base.checked_add(x, y)
```
Calculates `x+y`, checking for overflow errors where applicable.

The overflow protection may impose a perceptible performance penalty.

[source](https://github.com/JuliaLang/julia/blob/17cfb8e65ead377bf1b4598d8a9869144142c84e/base/checked.jl#L157-L163)
```julia
Base.checked_sub(x, y)
```
Calculates `x-y`, checking for overflow errors where applicable.

The overflow protection may impose a perceptible performance penalty.

[source](https://github.com/JuliaLang/julia/blob/17cfb8e65ead377bf1b4598d8a9869144142c84e/base/checked.jl#L214-L220)
```julia
Base.checked_mul(x, y)
```
Calculates `x*y`, checking for overflow errors where applicable.

The overflow protection may impose a perceptible performance penalty.

[source](https://github.com/JuliaLang/julia/blob/17cfb8e65ead377bf1b4598d8a9869144142c84e/base/checked.jl#L279-L285)
```julia
Base.checked_div(x, y)
```
Calculates `div(x,y)`, checking for overflow errors where applicable.

The overflow protection may impose a perceptible performance penalty.

[source](https://github.com/JuliaLang/julia/blob/17cfb8e65ead377bf1b4598d8a9869144142c84e/base/checked.jl#L308-L314)
```julia
Base.checked_rem(x, y)
```
Calculates `x%y`, checking for overflow errors where applicable.

The overflow protection may impose a perceptible performance penalty.

[source](https://github.com/JuliaLang/julia/blob/17cfb8e65ead377bf1b4598d8a9869144142c84e/base/checked.jl#L317-L323)
```julia
Base.checked_fld(x, y)
```
Calculates `fld(x,y)`, checking for overflow errors where applicable.

The overflow protection may impose a perceptible performance penalty.

[source](https://github.com/JuliaLang/julia/blob/17cfb8e65ead377bf1b4598d8a9869144142c84e/base/checked.jl#L326-L332)
```julia
Base.checked_mod(x, y)
```
Calculates `mod(x,y)`, checking for overflow errors where applicable.

The overflow protection may impose a perceptible performance penalty.

[source](https://github.com/JuliaLang/julia/blob/17cfb8e65ead377bf1b4598d8a9869144142c84e/base/checked.jl#L335-L341)
```julia
Base.checked_cld(x, y)
```
Calculates `cld(x,y)`, checking for overflow errors where applicable.

The overflow protection may impose a perceptible performance penalty.

[source](https://github.com/JuliaLang/julia/blob/17cfb8e65ead377bf1b4598d8a9869144142c84e/base/checked.jl#L344-L350)
```julia
Base.add_with_overflow(x, y) -> (r, f)
```
Calculates `r = x+y`, with the flag `f` indicating whether overflow has occurred.

[source](https://github.com/JuliaLang/julia/blob/17cfb8e65ead377bf1b4598d8a9869144142c84e/base/checked.jl#L127-L131)
```julia
Base.sub_with_overflow(x, y) -> (r, f)
```
Calculates `r = x-y`, with the flag `f` indicating whether overflow has occurred.

[source](https://github.com/JuliaLang/julia/blob/17cfb8e65ead377bf1b4598d8a9869144142c84e/base/checked.jl#L189-L193)
```julia
Base.mul_with_overflow(x, y) -> (r, f)
```
Calculates `r = x*y`, with the flag `f` indicating whether overflow has occurred.

[source](https://github.com/JuliaLang/julia/blob/17cfb8e65ead377bf1b4598d8a9869144142c84e/base/checked.jl#L229-L233)
```julia
abs2(x)
```
Squared absolute value of `x`.

**Examples**


```julia
julia> abs2(-3)
9
```
[source](https://github.com/JuliaLang/julia/blob/17cfb8e65ead377bf1b4598d8a9869144142c84e/base/number.jl#L166-L176)
```julia
copysign(x, y) -> z
```
Return `z` which has the magnitude of `x` and the same sign as `y`.

**Examples**


```julia
julia> copysign(1, -2)
-1

julia> copysign(-1, 2)
1
```
[source](https://github.com/JuliaLang/julia/blob/17cfb8e65ead377bf1b4598d8a9869144142c84e/base/number.jl#L195-L208)
```julia
sign(x)
```
Return zero if `x==0` and $x/|x|$ otherwise (i.e., ±1 for real `x`).

See also [`signbit`](https://docs.julialang.org/#Base.signbit), [`zero`](https://docs.julialang.org/../numbers/#Base.zero), [`copysign`](https://docs.julialang.org/#Base.copysign), [`flipsign`](https://docs.julialang.org/#Base.flipsign).

**Examples**


```julia
julia> sign(-4.0)
-1.0

julia> sign(99)
1

julia> sign(-0.0)
-0.0

julia> sign(0 + im)
0.0 + 1.0im
```
[source](https://github.com/JuliaLang/julia/blob/17cfb8e65ead377bf1b4598d8a9869144142c84e/base/number.jl#L139-L160)
```julia
signbit(x)
```
Returns `true` if the value of the sign of `x` is negative, otherwise `false`.

See also [`sign`](https://docs.julialang.org/#Base.sign) and [`copysign`](https://docs.julialang.org/#Base.copysign).

**Examples**


```julia
julia> signbit(-4)
true

julia> signbit(5)
false

julia> signbit(5.5)
false

julia> signbit(-4.1)
true
```
[source](https://github.com/JuliaLang/julia/blob/17cfb8e65ead377bf1b4598d8a9869144142c84e/base/number.jl#L115-L136)
```julia
flipsign(x, y)
```
Return `x` with its sign flipped if `y` is negative. For example `abs(x) = flipsign(x,x)`.

**Examples**


```julia
julia> flipsign(5, 3)
5

julia> flipsign(5, -3)
-5
```
[source](https://github.com/JuliaLang/julia/blob/17cfb8e65ead377bf1b4598d8a9869144142c84e/base/number.jl#L179-L192)
```julia
sqrt(x)
```
Return $sqrt{x}$. Throws [`DomainError`](https://docs.julialang.org/../base/#Core.DomainError) for negative [`Real`](https://docs.julialang.org/../numbers/#Core.Real) arguments. Use complex negative arguments instead. The prefix operator `√` is equivalent to `sqrt`.

See also: [`hypot`](https://docs.julialang.org/#Base.Math.hypot).

**Examples**


```julia
julia> sqrt(big(81))
9.0

julia> sqrt(big(-81))
ERROR: DomainError with -81.0:
NaN result for non-NaN input.
Stacktrace:
 [1] sqrt(::BigFloat) at ./mpfr.jl:501
[...]

julia> sqrt(big(complex(-81)))
0.0 + 9.0im

julia> .√(1:4)
4-element Vector{Float64}:
 1.0
 1.4142135623730951
 1.7320508075688772
 2.0
```
[source](https://github.com/JuliaLang/julia/blob/17cfb8e65ead377bf1b4598d8a9869144142c84e/base/math.jl#L595-L625)
```julia
isqrt(n::Integer)
```
Integer square root: the largest integer `m` such that `m*m <= n`.


```julia
julia> isqrt(5)
2
```
[source](https://github.com/JuliaLang/julia/blob/17cfb8e65ead377bf1b4598d8a9869144142c84e/base/intfuncs.jl#L960-L969)
```julia
cbrt(x::Real)
```
Return the cube root of `x`, i.e. $x^{1/3}$. Negative values are accepted (returning the negative real root when $x < 0$).

The prefix operator `∛` is equivalent to `cbrt`.

**Examples**


```julia
julia> cbrt(big(27))
3.0

julia> cbrt(big(-27))
-3.0
```
[source](https://github.com/JuliaLang/julia/blob/17cfb8e65ead377bf1b4598d8a9869144142c84e/base/special/cbrt.jl#L17-L33)
```julia
real(T::Type)
```
Return the type that represents the real part of a value of type `T`. e.g: for `T == Complex{R}`, returns `R`. Equivalent to `typeof(real(zero(T)))`.

**Examples**


```julia
julia> real(Complex{Int})
Int64

julia> real(Float64)
Float64
```
[source](https://github.com/JuliaLang/julia/blob/17cfb8e65ead377bf1b4598d8a9869144142c84e/base/complex.jl#L104-L119)
```julia
real(A::AbstractArray)
```
Return an array containing the real part of each entry in array `A`.

Equivalent to `real.(A)`, except that when `eltype(A) <: Real` `A` is returned without copying, and that when `A` has zero dimensions, a 0-dimensional array is returned (rather than a scalar).

**Examples**


```julia
julia> real([1, 2im, 3 + 4im])
3-element Vector{Int64}:
 1
 0
 3

julia> real(fill(2 - im))
0-dimensional Array{Int64, 0}:
2
```
[source](https://github.com/JuliaLang/julia/blob/17cfb8e65ead377bf1b4598d8a9869144142c84e/base/abstractarraymath.jl#L148-L169)
```julia
imag(z)
```
Return the imaginary part of the complex number `z`.

See also: [`conj`](https://docs.julialang.org/#Base.conj), [`reim`](https://docs.julialang.org/#Base.reim), [`adjoint`](https://docs.julialang.org/../../stdlib/LinearAlgebra/#Base.adjoint), [`angle`](https://docs.julialang.org/#Base.angle).

**Examples**


```julia
julia> imag(1 + 3im)
3
```
[source](https://github.com/JuliaLang/julia/blob/17cfb8e65ead377bf1b4598d8a9869144142c84e/base/complex.jl#L74-L86)
```julia
imag(A::AbstractArray)
```
Return an array containing the imaginary part of each entry in array `A`.

Equivalent to `imag.(A)`, except that when `A` has zero dimensions, a 0-dimensional array is returned (rather than a scalar).

**Examples**


```julia
julia> imag([1, 2im, 3 + 4im])
3-element Vector{Int64}:
 0
 2
 4

julia> imag(fill(2 - im))
0-dimensional Array{Int64, 0}:
-1
```
[source](https://github.com/JuliaLang/julia/blob/17cfb8e65ead377bf1b4598d8a9869144142c84e/base/abstractarraymath.jl#L173-L193)
```julia
reim(z)
```
Return a tuple of the real and imaginary parts of the complex number `z`.

**Examples**


```julia
julia> reim(1 + 3im)
(1, 3)
```
[source](https://github.com/JuliaLang/julia/blob/17cfb8e65ead377bf1b4598d8a9869144142c84e/base/complex.jl#L91-L101)
```julia
reim(A::AbstractArray)
```
Return a tuple of two arrays containing respectively the real and the imaginary part of each entry in `A`.

Equivalent to `(real.(A), imag.(A))`, except that when `eltype(A) <: Real` `A` is returned without copying to represent the real part, and that when `A` has zero dimensions, a 0-dimensional array is returned (rather than a scalar).

**Examples**


```julia
julia> reim([1, 2im, 3 + 4im])
([1, 0, 3], [0, 2, 4])

julia> reim(fill(2 - im))
(fill(2), fill(-1))
```
[source](https://github.com/JuliaLang/julia/blob/17cfb8e65ead377bf1b4598d8a9869144142c84e/base/abstractarraymath.jl#L197-L215)
```julia
conj(z)
```
Compute the complex conjugate of a complex number `z`.

See also: [`angle`](https://docs.julialang.org/#Base.angle), [`adjoint`](https://docs.julialang.org/../../stdlib/LinearAlgebra/#Base.adjoint).

**Examples**


```julia
julia> conj(1 + 3im)
1 - 3im
```
[source](https://github.com/JuliaLang/julia/blob/17cfb8e65ead377bf1b4598d8a9869144142c84e/base/complex.jl#L263-L275)
```julia
conj(A::AbstractArray)
```
Return an array containing the complex conjugate of each entry in array `A`.

Equivalent to `conj.(A)`, except that when `eltype(A) <: Real` `A` is returned without copying, and that when `A` has zero dimensions, a 0-dimensional array is returned (rather than a scalar).

**Examples**


```julia
julia> conj([1, 2im, 3 + 4im])
3-element Vector{Complex{Int64}}:
 1 + 0im
 0 - 2im
 3 - 4im

julia> conj(fill(2 - im))
0-dimensional Array{Complex{Int64}, 0}:
2 + 1im
```
[source](https://github.com/JuliaLang/julia/blob/17cfb8e65ead377bf1b4598d8a9869144142c84e/base/abstractarraymath.jl#L123-L144)
```julia
angle(z)
```
Compute the phase angle in radians of a complex number `z`.

See also: [`atan`](https://docs.julialang.org/#Base.atan-Tuple%7BNumber%7D), [`cis`](https://docs.julialang.org/#Base.cis).

**Examples**


```julia
julia> rad2deg(angle(1 + im))
45.0

julia> rad2deg(angle(1 - im))
-45.0

julia> rad2deg(angle(-1 - im))
-135.0
```
[source](https://github.com/JuliaLang/julia/blob/17cfb8e65ead377bf1b4598d8a9869144142c84e/base/complex.jl#L608-L626)
```julia
cis(x)
```
More efficient method for `exp(im*x)` by using Euler's formula: $cos(x) + i sin(x) = exp(i x)$.

See also [`cispi`](https://docs.julialang.org/#Base.cispi), [`sincos`](https://docs.julialang.org/#Base.Math.sincos-Tuple%7BFloat64%7D), [`exp`](https://docs.julialang.org/#Base.exp-Tuple%7BFloat64%7D), [`angle`](https://docs.julialang.org/#Base.angle).

**Examples**


```julia
julia> cis(π) ≈ -1
true
```
[source](https://github.com/JuliaLang/julia/blob/17cfb8e65ead377bf1b4598d8a9869144142c84e/base/complex.jl#L556-L568)
```julia
cispi(x)
```
More accurate method for `cis(pi*x)` (especially for large `x`).

See also [`cis`](https://docs.julialang.org/#Base.cis), [`sincospi`](https://docs.julialang.org/#Base.Math.sincospi), [`exp`](https://docs.julialang.org/#Base.exp-Tuple%7BFloat64%7D), [`angle`](https://docs.julialang.org/#Base.angle).

**Examples**


```julia
julia> cispi(10000)
1.0 + 0.0im

julia> cispi(0.25 + 1im)
0.030556854645952924 + 0.030556854645952924im
```
This function requires Julia 1.6 or later.

[source](https://github.com/JuliaLang/julia/blob/17cfb8e65ead377bf1b4598d8a9869144142c84e/base/complex.jl#L581-L599)
```julia
binomial(n::Integer, k::Integer)
```
The *binomial coefficient* $binom{n}{k}$, being the coefficient of the $k$th term in the polynomial expansion of $(1+x)^n$.

If $n$ is non-negative, then it is the number of ways to choose `k` out of `n` items:

[binom{n}{k} = frac{n!}{k! (n-k)!}]

where $n!$ is the [`factorial`](https://docs.julialang.org/#Base.factorial) function.

If $n$ is negative, then it is defined in terms of the identity

[binom{n}{k} = (-1)^k binom{k-n-1}{k}]

See also [`factorial`](https://docs.julialang.org/#Base.factorial).

**Examples**


```julia
julia> binomial(5, 3)
10

julia> factorial(5) ÷ (factorial(5-3) * factorial(3))
10

julia> binomial(-5, 3)
-35
```
**External links**

[source](https://github.com/JuliaLang/julia/blob/17cfb8e65ead377bf1b4598d8a9869144142c84e/base/intfuncs.jl#L1016-L1049)
```julia
factorial(n::Integer)
```
Factorial of `n`. If `n` is an [`Integer`](https://docs.julialang.org/../numbers/#Core.Integer), the factorial is computed as an integer (promoted to at least 64 bits). Note that this may overflow if `n` is not small, but you can use `factorial(big(n))` to compute the result exactly in arbitrary precision.

See also [`binomial`](https://docs.julialang.org/#Base.binomial).

**Examples**


```julia
julia> factorial(6)
720

julia> factorial(21)
ERROR: OverflowError: 21 is too large to look up in the table; consider using `factorial(big(21))` instead
Stacktrace:
[...]

julia> factorial(big(21))
51090942171709440000
```
**External links**

[source](https://github.com/JuliaLang/julia/blob/17cfb8e65ead377bf1b4598d8a9869144142c84e/base/intfuncs.jl#L981-L1006)
```julia
gcd(x, y...)
```
Greatest common (positive) divisor (or zero if all arguments are zero). The arguments may be integer and rational numbers.

Rational arguments require Julia 1.4 or later.

**Examples**


```julia
julia> gcd(6, 9)
3

julia> gcd(6, -9)
3

julia> gcd(6, 0)
6

julia> gcd(0, 0)
0

julia> gcd(1//3, 2//3)
1//3

julia> gcd(1//3, -2//3)
1//3

julia> gcd(1//3, 2)
1//3

julia> gcd(0, 0, 10, 15)
5
```
[source](https://github.com/JuliaLang/julia/blob/17cfb8e65ead377bf1b4598d8a9869144142c84e/base/intfuncs.jl#L5-L40)
```julia
lcm(x, y...)
```
Least common (positive) multiple (or zero if any argument is zero). The arguments may be integer and rational numbers.

Rational arguments require Julia 1.4 or later.

**Examples**


```julia
julia> lcm(2, 3)
6

julia> lcm(-2, 3)
6

julia> lcm(0, 3)
0

julia> lcm(0, 0)
0

julia> lcm(1//3, 2//3)
2//3

julia> lcm(1//3, -2//3)
2//3

julia> lcm(1//3, 2)
2//1

julia> lcm(1, 3, 5, 7)
105
```
[source](https://github.com/JuliaLang/julia/blob/17cfb8e65ead377bf1b4598d8a9869144142c84e/base/intfuncs.jl#L83-L118)
```julia
gcdx(a, b)
```
Computes the greatest common (positive) divisor of `a` and `b` and their Bézout coefficients, i.e. the integer coefficients `u` and `v` that satisfy $ua+vb = d = gcd(a, b)$. $gcdx(a, b)$ returns $(d, u, v)$.

The arguments may be integer and rational numbers.

Rational arguments require Julia 1.4 or later.

**Examples**


```julia
julia> gcdx(12, 42)
(6, -3, 1)

julia> gcdx(240, 46)
(2, -9, 47)
```
Bézout coefficients are *not* uniquely defined. `gcdx` returns the minimal Bézout coefficients that are computed by the extended Euclidean algorithm. (Ref: D. Knuth, TAoCP, 2/e, p. 325, Algorithm X.) For signed integers, these coefficients `u` and `v` are minimal in the sense that $|u| < |y/d|$ and $|v| < |x/d|$. Furthermore, the signs of `u` and `v` are chosen so that `d` is positive. For unsigned integers, the coefficients `u` and `v` might be near their `typemax`, and the identity then holds only via the unsigned integers' modulo arithmetic.

[source](https://github.com/JuliaLang/julia/blob/17cfb8e65ead377bf1b4598d8a9869144142c84e/base/intfuncs.jl#L156-L187)
```julia
ispow2(n::Number) -> Bool
```
Test whether `n` is an integer power of two.

See also [`count_ones`](https://docs.julialang.org/../numbers/#Base.count_ones), [`prevpow`](https://docs.julialang.org/#Base.prevpow), [`nextpow`](https://docs.julialang.org/#Base.nextpow).

**Examples**


```julia
julia> ispow2(4)
true

julia> ispow2(5)
false

julia> ispow2(4.5)
false

julia> ispow2(0.25)
true

julia> ispow2(1//8)
true
```
Support for non-`Integer` arguments was added in Julia 1.6.

[source](https://github.com/JuliaLang/julia/blob/17cfb8e65ead377bf1b4598d8a9869144142c84e/base/intfuncs.jl#L401-L428)
```julia
nextpow(a, x)
```
The smallest `a^n` not less than `x`, where `n` is a non-negative integer. `a` must be greater than 1, and `x` must be greater than 0.

See also [`prevpow`](https://docs.julialang.org/#Base.prevpow).

**Examples**


```julia
julia> nextpow(2, 7)
8

julia> nextpow(2, 9)
16

julia> nextpow(5, 20)
25

julia> nextpow(4, 16)
16
```
[source](https://github.com/JuliaLang/julia/blob/17cfb8e65ead377bf1b4598d8a9869144142c84e/base/intfuncs.jl#L433-L455)
```julia
prevpow(a, x)
```
The largest `a^n` not greater than `x`, where `n` is a non-negative integer. `a` must be greater than 1, and `x` must not be less than 1.

See also [`nextpow`](https://docs.julialang.org/#Base.nextpow), [`isqrt`](https://docs.julialang.org/#Base.isqrt).

**Examples**


```julia
julia> prevpow(2, 7)
4

julia> prevpow(2, 9)
8

julia> prevpow(5, 20)
5

julia> prevpow(4, 16)
16
```
[source](https://github.com/JuliaLang/julia/blob/17cfb8e65ead377bf1b4598d8a9869144142c84e/base/intfuncs.jl#L470-L492)
```julia
nextprod(factors::Union{Tuple,AbstractVector}, n)
```
Next integer greater than or equal to `n` that can be written as $prod k_i^{p_i}$ for integers $p_1$, $p_2$, etcetera, for factors $k_i$ in `factors`.

**Examples**


```julia
julia> nextprod((2, 3), 105)
108

julia> 2^2 * 3^3
108
```
The method that accepts a tuple requires Julia 1.6 or later.

[source](https://github.com/JuliaLang/julia/blob/17cfb8e65ead377bf1b4598d8a9869144142c84e/base/combinatorics.jl#L311-L328)
```julia
invmod(n, m)
```
Take the inverse of `n` modulo `m`: `y` such that $n y = 1 pmod m$, and $div(y,m) = 0$. This will throw an error if $m = 0$, or if $gcd(n,m) neq 1$.

**Examples**


```julia
julia> invmod(2, 5)
3

julia> invmod(2, 3)
2

julia> invmod(5, 6)
5
```
[source](https://github.com/JuliaLang/julia/blob/17cfb8e65ead377bf1b4598d8a9869144142c84e/base/intfuncs.jl#L209-L227)
```julia
powermod(x::Integer, p::Integer, m)
```
Compute $x^p pmod m$.

**Examples**


```julia
julia> powermod(2, 6, 5)
4

julia> mod(2^6, 5)
4

julia> powermod(5, 2, 20)
5

julia> powermod(5, 2, 19)
6

julia> powermod(5, 3, 19)
11
```
[source](https://github.com/JuliaLang/julia/blob/17cfb8e65ead377bf1b4598d8a9869144142c84e/base/intfuncs.jl#L350-L372)
```julia
ndigits(n::Integer; base::Integer=10, pad::Integer=1)
```
Compute the number of digits in integer `n` written in base `base` (`base` must not be in `[-1, 0, 1]`), optionally padded with zeros to a specified size (the result will never be less than `pad`).

See also [`digits`](https://docs.julialang.org/../numbers/#Base.digits), [`count_ones`](https://docs.julialang.org/../numbers/#Base.count_ones).

**Examples**


```julia
julia> ndigits(12345)
5

julia> ndigits(1022, base=16)
3

julia> string(1022, base=16)
"3fe"

julia> ndigits(123, pad=5)
5

julia> ndigits(-123)
3
```
[source](https://github.com/JuliaLang/julia/blob/17cfb8e65ead377bf1b4598d8a9869144142c84e/base/intfuncs.jl#L631-L657)
```julia
Base.add_sum(x, y)
```
The reduction operator used in `sum`. The main difference from [`+`](https://docs.julialang.org/#Base.:+) is that small integers are promoted to `Int`/`UInt`.

[source](https://github.com/JuliaLang/julia/blob/17cfb8e65ead377bf1b4598d8a9869144142c84e/base/reduce.jl#L18-L23)
```julia
widemul(x, y)
```
Multiply `x` and `y`, giving the result as a larger type.

See also [`promote`](https://docs.julialang.org/../base/#Base.promote), [`Base.add_sum`](https://docs.julialang.org/#Base.add_sum).

**Examples**


```julia
julia> widemul(Float32(3.0), 4.0) isa BigFloat
true

julia> typemax(Int8) * typemax(Int8)
1

julia> widemul(typemax(Int8), typemax(Int8))  # == 127^2
16129
```
[source](https://github.com/JuliaLang/julia/blob/17cfb8e65ead377bf1b4598d8a9869144142c84e/base/number.jl#L246-L264)
```julia
evalpoly(x, p)
```
Evaluate the polynomial $sum_k x^{k-1} p[k]$ for the coefficients `p[1]`, `p[2]`, ...; that is, the coefficients are given in ascending order by power of `x`. Loops are unrolled at compile time if the number of coefficients is statically known, i.e. when `p` is a `Tuple`. This function generates efficient code using Horner's method if `x` is real, or using a Goertzel-like algorithm if `x` is complex.

This function requires Julia 1.4 or later.

**Example**


```julia
julia> evalpoly(2, (1, 2, 3))
17
```
[source](https://github.com/JuliaLang/julia/blob/17cfb8e65ead377bf1b4598d8a9869144142c84e/base/math.jl#L156-L176)
```julia
@evalpoly(z, c...)
```
Evaluate the polynomial $sum_k z^{k-1} c[k]$ for the coefficients `c[1]`, `c[2]`, ...; that is, the coefficients are given in ascending order by power of `z`. This macro expands to efficient inline code that uses either Horner's method or, for complex `z`, a more efficient Goertzel-like algorithm.

See also [`evalpoly`](https://docs.julialang.org/#Base.Math.evalpoly).

**Examples**


```julia
julia> @evalpoly(3, 1, 0, 1)
10

julia> @evalpoly(2, 1, 0, 1)
5

julia> @evalpoly(2, 1, 1, 1)
7
```
[source](https://github.com/JuliaLang/julia/blob/17cfb8e65ead377bf1b4598d8a9869144142c84e/base/math.jl#L267-L288)
```julia
@fastmath expr
```
Execute a transformed version of the expression, which calls functions that may violate strict IEEE semantics. This allows the fastest possible operation, but results are undefined – be careful when doing this, as it may change numerical results.

This sets the [LLVM Fast-Math flags](http://llvm.org/docs/LangRef.html#fast-math-flags), and corresponds to the `-ffast-math` option in clang. See [the notes on performance annotations](https://docs.julialang.org/../../manual/performance-tips/#man-performance-annotations) for more details.

**Examples**


```julia
julia> @fastmath 1+2
3

julia> @fastmath(sin(3))
0.1411200080598672
```
[source](https://github.com/JuliaLang/julia/blob/17cfb8e65ead377bf1b4598d8a9869144142c84e/base/fastmath.jl#L133-L153)Some unicode characters can be used to define new binary operators that support infix notation. For example `⊗(x,y) = kron(x,y)` defines the `⊗` (otimes) function to be the Kronecker product, and one can call it as binary operator using infix syntax: `C = A ⊗ B` as well as with the usual prefix syntax `C = ⊗(A,B)`.

Other characters that support such extensions include odot `⊙` and oplus `⊕`

The complete list is in the parser code: <https://github.com/JuliaLang/julia/blob/master/src/julia-parser.scm>

Those that are parsed like `*` (in terms of precedence) include `* / ÷ % & ⋅ ∘ × || ∩ ∧ ⊗ ⊘ ⊙ ⊚ ⊛ ⊠ ⊡ ⊓ ∗ ∙ ∤ ⅋ ≀ ⊼ ⋄ ⋆ ⋇ ⋉ ⋊ ⋋ ⋌ ⋏ ⋒ ⟑ ⦸ ⦼ ⦾ ⦿ ⧶ ⧷ ⨇ ⨰ ⨱ ⨲ ⨳ ⨴ ⨵ ⨶ ⨷ ⨸ ⨻ ⨼ ⨽ ⩀ ⩃ ⩄ ⩋ ⩍ ⩎ ⩑ ⩓ ⩕ ⩘ ⩚ ⩜ ⩞ ⩟ ⩠ ⫛ ⊍ ▷ ⨝ ⟕ ⟖ ⟗` and those that are parsed like `+` include `+ - ||| ⊕ ⊖ ⊞ ⊟ |++| ∪ ∨ ⊔ ± ∓ ∔ ∸ ≏ ⊎ ⊻ ⊽ ⋎ ⋓ ⧺ ⧻ ⨈ ⨢ ⨣ ⨤ ⨥ ⨦ ⨧ ⨨ ⨩ ⨪ ⨫ ⨬ ⨭ ⨮ ⨹ ⨺ ⩁ ⩂ ⩅ ⩊ ⩌ ⩏ ⩐ ⩒ ⩔ ⩖ ⩗ ⩛ ⩝ ⩡ ⩢ ⩣` There are many others that are related to arrows, comparisons, and powers.




