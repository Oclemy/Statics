Julia provides a complete collection of basic arithmetic and bitwise operators across all of its numeric primitive types, as well as providing portable, efficient implementations of a comprehensive collection of standard mathematical functions.

The following [arithmetic operators](https://en.wikipedia.org/wiki/Arithmetic#Arithmetic_operations) are supported on all primitive numeric types:



| Expression | Name | Description |
| --- | --- | --- |
| `+x` | unary plus | the identity operation |
| `-x` | unary minus | maps values to their additive inverses |
| `x + y` | binary plus | performs addition |
| `x - y` | binary minus | performs subtraction |
| `x * y` | times | performs multiplication |
| `x / y` | divide | performs division |
| `x ÷ y` | integer divide | x / y, truncated to an integer |
| `x  y` | inverse divide | equivalent to `y / x` |
| `x ^ y` | power | raises `x` to the `y`th power |
| `x % y` | remainder | equivalent to `rem(x,y)` |

A numeric literal placed directly before an identifier or parentheses, e.g. `2x` or `2(x+y)`, is treated as a multiplication, except with higher precedence than other binary operations. See [Numeric Literal Coefficients](https://docs.julialang.org/../integers-and-floating-point-numbers/#man-numeric-literal-coefficients) for details.

Julia's promotion system makes arithmetic operations on mixtures of argument types "just work" naturally and automatically. See [Conversion and Promotion](https://docs.julialang.org/../conversion-and-promotion/#conversion-and-promotion) for details of the promotion system.

The ÷ sign can be conveniently typed by writing `div<tab>` to the REPL or Julia IDE. See the [manual section on Unicode input](https://docs.julialang.org/../unicode-input/#Unicode-Input) for more information.

Here are some simple examples using arithmetic operators:


```julia
julia> 1 + 2 + 3
6

julia> 1 - 2
-1

julia> 3*2/12
0.5
```
(By convention, we tend to space operators more tightly if they get applied before other nearby operators. For instance, we would generally write `-x + 2` to reflect that first `x` gets negated, and then `2` is added to that result.)

When used in multiplication, `false` acts as a *strong zero*:


```julia
julia> NaN * false
0.0

julia> false * Inf
0.0
```
This is useful for preventing the propagation of `NaN` values in quantities that are known to be zero. See [Knuth (1992)](https://arxiv.org/abs/math/9205211) for motivation.

The following [Boolean operators](https://en.wikipedia.org/wiki/Boolean_algebra#Operations) are supported on [`Bool`](https://docs.julialang.org/../../base/numbers/#Core.Bool) types:

Negation changes `true` to `false` and vice versa. The short-circuiting operations are explained on the linked page.

Note that `Bool` is an integer type and all the usual promotion rules and numeric operators are also defined on it.

The following [bitwise operators](https://en.wikipedia.org/wiki/Bitwise_operation#Bitwise_operators) are supported on all primitive integer types:



| Expression | Name |
| --- | --- |
| `~x` | bitwise not |
| `x & y` | bitwise and |
| `x | y` | bitwise or |
| `x ⊻ y` | bitwise xor (exclusive or) |
| `x ⊼ y` | bitwise nand (not and) |
| `x ⊽ y` | bitwise nor (not or) |
| `x >>> y` | [logical shift](https://en.wikipedia.org/wiki/Logical_shift) right |
| `x >> y` | [arithmetic shift](https://en.wikipedia.org/wiki/Arithmetic_shift) right |
| `x << y` | logical/arithmetic shift left |

Here are some examples with bitwise operators:


```julia
julia> ~123
-124

julia> 123 & 234
106

julia> 123 | 234
251

julia> 123 ⊻ 234
145

julia> xor(123, 234)
145

julia> nand(123, 123)
-124

julia> 123 ⊼ 123
-124

julia> nor(123, 124)
-128

julia> 123 ⊽ 124
-128

julia> ~UInt32(123)
0xffffff84

julia> ~UInt8(123)
0x84
```
Every binary arithmetic and bitwise operator also has an updating version that assigns the result of the operation back into its left operand. The updating version of the binary operator is formed by placing a `=` immediately after the operator. For example, writing `x += 3` is equivalent to writing `x = x + 3`:


```julia
julia> x = 1
1

julia> x += 3
4

julia> x
4
```
The updating versions of all the binary arithmetic and bitwise operators are:


```julia
+=  -=  *=  /=  =  ÷=  %=  ^=  &=  |=  ⊻=  >>>=  >>=  <<=
```
An updating operator rebinds the variable on the left-hand side. As a result, the type of the variable may change.


```julia
julia> x = 0x01; typeof(x)
UInt8

julia> x *= 2 # Same as x = x * 2
2

julia> typeof(x)
Int64
```
For *every* binary operation like `^`, there is a corresponding "dot" operation `.^` that is *automatically* defined to perform `^` element-by-element on arrays. For example, `[1,2,3] ^ 3` is not defined, since there is no standard mathematical meaning to "cubing" a (non-square) array, but `[1,2,3] .^ 3` is defined as computing the elementwise (or "vectorized") result `[1^3, 2^3, 3^3]`. Similarly for unary operators like `!` or `√`, there is a corresponding `.√` that applies the operator elementwise.


```julia
julia> [1,2,3] .^ 3
3-element Vector{Int64}:
  1
  8
 27
```
More specifically, `a .^ b` is parsed as the ["dot" call](https://docs.julialang.org/../functions/#man-vectorized) `(^).(a,b)`, which performs a [broadcast](https://docs.julialang.org/../arrays/#Broadcasting) operation: it can combine arrays and scalars, arrays of the same size (performing the operation elementwise), and even arrays of different shapes (e.g. combining row and column vectors to produce a matrix). Moreover, like all vectorized "dot calls," these "dot operators" are *fusing*. For example, if you compute `2 .* A.^2 .+ sin.(A)` (or equivalently `@. 2A^2 + sin(A)`, using the [`@.`](https://docs.julialang.org/../../base/arrays/#Base.Broadcast.@__dot__) macro) for an array `A`, it performs a *single* loop over `A`, computing `2a^2 + sin(a)` for each element `a` of `A`. In particular, nested dot calls like `f.(g.(x))` are fused, and "adjacent" binary operators like `x .+ 3 .* x.^2` are equivalent to nested dot calls `(+).(x, (*).(3, (^).(x, 2)))`.

Furthermore, "dotted" updating operators like `a .+= b` (or `@. a += b`) are parsed as `a .= a .+ b`, where `.=` is a fused *in-place* assignment operation (see the [dot syntax documentation](https://docs.julialang.org/../functions/#man-vectorized)).

Note the dot syntax is also applicable to user-defined operators. For example, if you define `⊗(A,B) = kron(A,B)` to give a convenient infix syntax `A ⊗ B` for Kronecker products ([`kron`](https://docs.julialang.org/../../stdlib/LinearAlgebra/#Base.kron)), then `[A,B] .⊗ [C,D]` will compute `[A⊗C, B⊗D]` with no additional coding.

Combining dot operators with numeric literals can be ambiguous. For example, it is not clear whether `1.+x` means `1. + x` or `1 .+ x`. Therefore this syntax is disallowed, and spaces must be used around the operator in such cases.

Standard comparison operations are defined for all the primitive numeric types:



| Operator | Name |
| --- | --- |
| [`==`](https://docs.julialang.org/../../base/math/#Base.:==) | equality |
| [`!=`](https://docs.julialang.org/../../base/math/#Base.:!=), [`≠`](https://docs.julialang.org/../../base/math/#Base.:!=) | inequality |
| [`<`](https://docs.julialang.org/../../base/math/#Base.:<) | less than |
| [`<=`](https://docs.julialang.org/../../base/math/#Base.:<=), [`≤`](https://docs.julialang.org/../../base/math/#Base.:<=) | less than or equal to |
| [`>`](https://docs.julialang.org/../../base/math/#Base.:>) | greater than |
| [`>=`](https://docs.julialang.org/../../base/math/#Base.:>=), [`≥`](https://docs.julialang.org/../../base/math/#Base.:>=) | greater than or equal to |

Here are some simple examples:


```julia
julia> 1 == 1
true

julia> 1 == 2
false

julia> 1 != 2
true

julia> 1 == 1.0
true

julia> 1 < 2
true

julia> 1.0 > 3
false

julia> 1 >= 1.0
true

julia> -1 <= 1
true

julia> -1 <= -1
true

julia> -1 <= -2
false

julia> 3 < -0.5
false
```
Integers are compared in the standard manner – by comparison of bits. Floating-point numbers are compared according to the [IEEE 754 standard](https://en.wikipedia.org/wiki/IEEE_754-2008):

* Finite numbers are ordered in the usual manner.
* Positive zero is equal but not greater than negative zero.
* `Inf` is equal to itself and greater than everything else except `NaN`.
* `-Inf` is equal to itself and less than everything else except `NaN`.
* `NaN` is not equal to, not less than, and not greater than anything, including itself.

The last point is potentially surprising and thus worth noting:


```julia
julia> NaN == NaN
false

julia> NaN != NaN
true

julia> NaN < NaN
false

julia> NaN > NaN
false
```
and can cause headaches when working with [arrays](https://docs.julialang.org/../arrays/#man-multi-dim-arrays):


```julia
julia> [1 NaN] == [1 NaN]
false
```
Julia provides additional functions to test numbers for special values, which can be useful in situations like hash key comparisons:

[`isequal`](https://docs.julialang.org/../../base/base/#Base.isequal) considers `NaN`s equal to each other:


```julia
julia> isequal(NaN, NaN)
true

julia> isequal([1 NaN], [1 NaN])
true

julia> isequal(NaN, NaN32)
true
```
`isequal` can also be used to distinguish signed zeros:


```julia
julia> -0.0 == 0.0
true

julia> isequal(-0.0, 0.0)
false
```
Mixed-type comparisons between signed integers, unsigned integers, and floats can be tricky. A great deal of care has been taken to ensure that Julia does them correctly.

For other types, `isequal` defaults to calling [`==`](https://docs.julialang.org/../../base/math/#Base.:==), so if you want to define equality for your own types then you only need to add a [`==`](https://docs.julialang.org/../../base/math/#Base.:==) method. If you define your own equality function, you should probably define a corresponding [`hash`](https://docs.julialang.org/../../base/base/#Base.hash) method to ensure that `isequal(x,y)` implies `hash(x) == hash(y)`.

Unlike most languages, with the [notable exception of Python](https://en.wikipedia.org/wiki/Python_syntax_and_semantics#Comparison_operators), comparisons can be arbitrarily chained:


```julia
julia> 1 < 2 <= 2 < 3 == 3 > 2 >= 1 == 1 < 3 != 5
true
```
Chaining comparisons is often quite convenient in numerical code. Chained comparisons use the `&&` operator for scalar comparisons, and the [`&`](https://docs.julialang.org/../../base/math/#Base.:&) operator for elementwise comparisons, which allows them to work on arrays. For example, `0 .< A .< 1` gives a boolean array whose entries are true where the corresponding elements of `A` are between 0 and 1.

Note the evaluation behavior of chained comparisons:


```julia
julia> v(x) = (println(x); x)
v (generic function with 1 method)

julia> v(1) < v(2) <= v(3)
2
1
3
true

julia> v(1) > v(2) <= v(3)
2
1
false
```
The middle expression is only evaluated once, rather than twice as it would be if the expression were written as `v(1) < v(2) && v(2) <= v(3)`. However, the order of evaluations in a chained comparison is undefined. It is strongly recommended not to use expressions with side effects (such as printing) in chained comparisons. If side effects are required, the short-circuit `&&` operator should be used explicitly (see [Short-Circuit Evaluation](https://docs.julialang.org/../control-flow/#Short-Circuit-Evaluation)).

Julia provides a comprehensive collection of mathematical functions and operators. These mathematical operations are defined over as broad a class of numerical values as permit sensible definitions, including integers, floating-point numbers, rationals, and complex numbers, wherever such definitions make sense.

Moreover, these functions (like any Julia function) can be applied in "vectorized" fashion to arrays and other collections with the [dot syntax](https://docs.julialang.org/../functions/#man-vectorized) `f.(A)`, e.g. `sin.(A)` will compute the sine of each element of an array `A`.

Julia applies the following order and associativity of operations, from highest precedence to lowest:



| Category | Operators | Associativity |
| --- | --- | --- |
| Syntax | `.` followed by `::` | Left |
| Exponentiation | `^` | Right |
| Unary | `+ - √` | Right |
| Bitshifts | `<< >> >>>` | Left |
| Fractions | `//` | Left |
| Multiplication | `* / % &  ÷` | Left |
| Addition | `+ - | ⊻` | Left |
| Syntax | `: ..` | Left |
| Syntax | `|>` | Left |
| Syntax | `<|` | Right |
| Comparisons | `> < >= <= == === != !== <:` | Non-associative |
| Control flow | `&&` followed by `||` followed by `?` | Right |
| Pair | `=>` | Right |
| Assignments | `= += -= *= /= //= = ^= ÷= %= |= &= ⊻= <<= >>= >>>=` | Right |

For a complete list of *every* Julia operator's precedence, see the top of this file: [`src/julia-parser.scm`](https://github.com/JuliaLang/julia/blob/master/src/julia-parser.scm). Note that some of the operators there are not defined in the `Base` module but may be given definitions by standard libraries, packages or user code.

You can also find the numerical precedence for any given operator via the built-in function `Base.operator_precedence`, where higher numbers take precedence:


```julia
julia> Base.operator_precedence(:+), Base.operator_precedence(:*), Base.operator_precedence(:.)
(11, 12, 17)

julia> Base.operator_precedence(:sin), Base.operator_precedence(:+=), Base.operator_precedence(:(=))  # (Note the necessary parens on `:(=)`)
(0, 1, 1)
```
A symbol representing the operator associativity can also be found by calling the built-in function `Base.operator_associativity`:


```julia
julia> Base.operator_associativity(:-), Base.operator_associativity(:+), Base.operator_associativity(:^)
(:left, :none, :right)

julia> Base.operator_associativity(:⊗), Base.operator_associativity(:sin), Base.operator_associativity(:→)
(:left, :none, :right)
```
Note that symbols such as `:sin` return precedence `0`. This value represents invalid operators and not operators of lowest precedence. Similarly, such operators are assigned associativity `:none`.

[Numeric literal coefficients](https://docs.julialang.org/../integers-and-floating-point-numbers/#man-numeric-literal-coefficients), e.g. `2x`, are treated as multiplications with higher precedence than any other binary operation, with the exception of `^` where they have higher precedence only as the exponent.


```julia
julia> x = 3; 2x^2
18

julia> x = 3; 2^2x
64
```
Juxtaposition parses like a unary operator, which has the same natural asymmetry around exponents: `-x^y` and `2x^y` parse as `-(x^y)` and `2(x^y)` whereas `x^-y` and `x^2y` parse as `x^(-y)` and `x^(2y)`.

Julia supports three forms of numerical conversion, which differ in their handling of inexact conversions.

* The notation `T(x)` or `convert(T,x)` converts `x` to a value of type `T`.


	+ If `T` is a floating-point type, the result is the nearest representable value, which could be positive or negative infinity.
	+ If `T` is an integer type, an `InexactError` is raised if `x` is not representable by `T`.
* `x % T` converts an integer `x` to a value of integer type `T` congruent to `x` modulo `2^n`, where `n` is the number of bits in `T`. In other words, the binary representation is truncated to fit.
* The [Rounding functions](https://docs.julialang.org/#Rounding-functions) take a type `T` as an optional argument. For example, `round(Int,x)` is a shorthand for `Int(round(x))`.

The following examples show the different forms.


```julia
julia> Int8(127)
127

julia> Int8(128)
ERROR: InexactError: trunc(Int8, 128)
Stacktrace:
[...]

julia> Int8(127.0)
127

julia> Int8(3.14)
ERROR: InexactError: Int8(3.14)
Stacktrace:
[...]

julia> Int8(128.0)
ERROR: InexactError: Int8(128.0)
Stacktrace:
[...]

julia> 127 % Int8
127

julia> 128 % Int8
-128

julia> round(Int8,127.4)
127

julia> round(Int8,127.6)
ERROR: InexactError: trunc(Int8, 128.0)
Stacktrace:
[...]
```
See [Conversion and Promotion](https://docs.julialang.org/../conversion-and-promotion/#conversion-and-promotion) for how to define your own conversions and promotions.



| Function | Description |
| --- | --- |
| [`div(x,y)`](https://docs.julialang.org/../../base/math/#Base.div), `x÷y` | truncated division; quotient rounded towards zero |
| [`fld(x,y)`](https://docs.julialang.org/../../base/math/#Base.fld) | floored division; quotient rounded towards `-Inf` |
| [`cld(x,y)`](https://docs.julialang.org/../../base/math/#Base.cld) | ceiling division; quotient rounded towards `+Inf` |
| [`rem(x,y)`](https://docs.julialang.org/../../base/math/#Base.rem), `x%y` | remainder; satisfies `x == div(x,y)*y + rem(x,y)`; sign matches `x` |
| [`mod(x,y)`](https://docs.julialang.org/../../base/math/#Base.mod) | modulus; satisfies `x == fld(x,y)*y + mod(x,y)`; sign matches `y` |
| [`mod1(x,y)`](https://docs.julialang.org/../../base/math/#Base.mod1) | `mod` with offset 1; returns `r∈(0,y]` for `y>0` or `r∈[y,0)` for `y<0`, where `mod(r, y) == mod(x, y)` |
| [`mod2pi(x)`](https://docs.julialang.org/../../base/math/#Base.Math.mod2pi) | modulus with respect to 2pi; `0 <= mod2pi(x) < 2pi` |
| [`divrem(x,y)`](https://docs.julialang.org/../../base/math/#Base.divrem) | returns `(div(x,y),rem(x,y))` |
| [`fldmod(x,y)`](https://docs.julialang.org/../../base/math/#Base.fldmod) | returns `(fld(x,y),mod(x,y))` |
| [`gcd(x,y...)`](https://docs.julialang.org/../../base/math/#Base.gcd) | greatest positive common divisor of `x`, `y`,... |
| [`lcm(x,y...)`](https://docs.julialang.org/../../base/math/#Base.lcm) | least positive common multiple of `x`, `y`,... |



| Function | Description |
| --- | --- |
| [`abs(x)`](https://docs.julialang.org/../../base/math/#Base.abs) | a positive value with the magnitude of `x` |
| [`abs2(x)`](https://docs.julialang.org/../../base/math/#Base.abs2) | the squared magnitude of `x` |
| [`sign(x)`](https://docs.julialang.org/../../base/math/#Base.sign) | indicates the sign of `x`, returning -1, 0, or +1 |
| [`signbit(x)`](https://docs.julialang.org/../../base/math/#Base.signbit) | indicates whether the sign bit is on (true) or off (false) |
| [`copysign(x,y)`](https://docs.julialang.org/../../base/math/#Base.copysign) | a value with the magnitude of `x` and the sign of `y` |
| [`flipsign(x,y)`](https://docs.julialang.org/../../base/math/#Base.flipsign) | a value with the magnitude of `x` and the sign of `x*y` |



| Function | Description |
| --- | --- |
| [`sqrt(x)`](https://docs.julialang.org/../../base/math/#Base.sqrt-Tuple%7BNumber%7D), `√x` | square root of `x` |
| [`cbrt(x)`](https://docs.julialang.org/../../base/math/#Base.Math.cbrt), `∛x` | cube root of `x` |
| [`hypot(x,y)`](https://docs.julialang.org/../../base/math/#Base.Math.hypot) | hypotenuse of right-angled triangle with other sides of length `x` and `y` |
| [`exp(x)`](https://docs.julialang.org/../../base/math/#Base.exp-Tuple%7BFloat64%7D) | natural exponential function at `x` |
| [`expm1(x)`](https://docs.julialang.org/../../base/math/#Base.expm1) | accurate `exp(x)-1` for `x` near zero |
| [`ldexp(x,n)`](https://docs.julialang.org/../../base/math/#Base.Math.ldexp) | `x*2^n` computed efficiently for integer values of `n` |
| [`log(x)`](https://docs.julialang.org/../../base/math/#Base.log-Tuple%7BNumber%7D) | natural logarithm of `x` |
| [`log(b,x)`](https://docs.julialang.org/../../base/math/#Base.log-Tuple%7BNumber%7D) | base `b` logarithm of `x` |
| [`log2(x)`](https://docs.julialang.org/../../base/math/#Base.log2) | base 2 logarithm of `x` |
| [`log10(x)`](https://docs.julialang.org/../../base/math/#Base.log10) | base 10 logarithm of `x` |
| [`log1p(x)`](https://docs.julialang.org/../../base/math/#Base.log1p) | accurate `log(1+x)` for `x` near zero |
| [`exponent(x)`](https://docs.julialang.org/../../base/numbers/#Base.Math.exponent) | binary exponent of `x` |
| [`significand(x)`](https://docs.julialang.org/../../base/numbers/#Base.Math.significand) | binary significand (a.k.a. mantissa) of a floating-point number `x` |

For an overview of why functions like [`hypot`](https://docs.julialang.org/../../base/math/#Base.Math.hypot), [`expm1`](https://docs.julialang.org/../../base/math/#Base.expm1), and [`log1p`](https://docs.julialang.org/../../base/math/#Base.log1p) are necessary and useful, see John D. Cook's excellent pair of blog posts on the subject: [expm1, log1p, erfc](https://www.johndcook.com/blog/2010/06/07/math-library-functions-that-seem-unnecessary/), and [hypot](https://www.johndcook.com/blog/2010/06/02/whats-so-hard-about-finding-a-hypotenuse/).

All the standard trigonometric and hyperbolic functions are also defined:


```julia
sin    cos    tan    cot    sec    csc
sinh   cosh   tanh   coth   sech   csch
asin   acos   atan   acot   asec   acsc
asinh  acosh  atanh  acoth  asech  acsch
sinc   cosc
```
These are all single-argument functions, with [`atan`](https://docs.julialang.org/../../base/math/#Base.atan-Tuple%7BNumber%7D) also accepting two arguments corresponding to a traditional [`atan2`](https://en.wikipedia.org/wiki/Atan2) function.

Additionally, [`sinpi(x)`](https://docs.julialang.org/../../base/math/#Base.Math.sinpi) and [`cospi(x)`](https://docs.julialang.org/../../base/math/#Base.Math.cospi) are provided for more accurate computations of [`sin(pi*x)`](https://docs.julialang.org/../../base/math/#Base.sin-Tuple%7BNumber%7D) and [`cos(pi*x)`](https://docs.julialang.org/../../base/math/#Base.cos-Tuple%7BNumber%7D) respectively.

In order to compute trigonometric functions with degrees instead of radians, suffix the function with `d`. For example, [`sind(x)`](https://docs.julialang.org/../../base/math/#Base.Math.sind) computes the sine of `x` where `x` is specified in degrees. The complete list of trigonometric functions with degree variants is:


```julia
sind   cosd   tand   cotd   secd   cscd
asind  acosd  atand  acotd  asecd  acscd
```
Many other special mathematical functions are provided by the package [SpecialFunctions.jl](https://github.com/JuliaMath/SpecialFunctions.jl).




