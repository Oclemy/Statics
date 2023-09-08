

| symbol | meaning |
| --- | --- |
| `@` | the at-sign marks a [macro](https://docs.julialang.org/../../manual/metaprogramming/#man-macros) invocation; optionally followed by an argument list |
| [`!`](https://docs.julialang.org/../math/#Base.:!) | an exclamation mark is a prefix operator for logical negation ("not") |
| `a!` | function names that end with an exclamation mark modify one or more of their arguments by convention |
| `#` | the number sign (or hash or pound) character begins single line comments |
| `#=` | when followed by an equals sign, it begins a multi-line comment (these are nestable) |
| `=#` | end a multi-line comment by immediately preceding the number sign with an equals sign |
| `$` | the dollar sign is used for [string](https://docs.julialang.org/../../manual/strings/#string-interpolation) and [expression](https://docs.julialang.org/../../manual/metaprogramming/#man-expression-interpolation) interpolation |
| [`%`](https://docs.julialang.org/../math/#Base.rem) | the percent symbol is the remainder operator |
| [`^`](https://docs.julialang.org/../math/#Base.:%5E-Tuple%7BNumber,%20Number%7D) | the caret is the exponentiation operator |
| [`&`](https://docs.julialang.org/../math/#Base.:&) | single ampersand is bitwise and |
| [`&&`](https://docs.julialang.org/../math/#&&) | double ampersands is short-circuiting boolean and |
| [`|`](https://docs.julialang.org/../math/#Base.:%7C) | single pipe character is bitwise or |
| [`||`](https://docs.julialang.org/../math/#%7C%7C) | double pipe characters is short-circuiting boolean or |
| [`⊻`](https://docs.julialang.org/../math/#Base.xor) | the unicode xor character is bitwise exclusive or |
| [`~`](https://docs.julialang.org/../math/#Base.:~) | the tilde is an operator for bitwise not |
| `'` | a trailing apostrophe is the [`adjoint`](https://docs.julialang.org/../../stdlib/LinearAlgebra/#Base.adjoint) (that is, the complex transpose) operator Aᴴ |
| [`*`](https://docs.julialang.org/../math/#Base.:*-Tuple%7BAny,%20Vararg%7BAny%7D%7D) | the asterisk is used for multiplication, including matrix multiplication and [string concatenation](https://docs.julialang.org/../../manual/strings/#man-concatenation) |
| [`/`](https://docs.julialang.org/../math/#Base.:/) | forward slash divides the argument on its left by the one on its right |
| [``](https://docs.julialang.org/../math/#Base.:%5C%5C-Tuple%7BAny,%20Any%7D) | backslash operator divides the argument on its right by the one on its left, commonly used to solve matrix equations |
| `()` | parentheses with no arguments constructs an empty [`Tuple`](https://docs.julialang.org/../base/#Core.Tuple) |
| `(a,...)` | parentheses with comma-separated arguments constructs a tuple containing its arguments |
| `(a=1,...)` | parentheses with comma-separated assignments constructs a [`NamedTuple`](https://docs.julialang.org/../base/#Core.NamedTuple) |
| `(x;y)` | parentheses can also be used to group one or more semicolon separated expressions |
| `a[]` | [array indexing](https://docs.julialang.org/../../manual/arrays/#man-array-indexing) (calling [`getindex`](https://docs.julialang.org/../collections/#Base.getindex) or [`setindex!`](https://docs.julialang.org/../collections/#Base.setindex!)) |
| `[,]` | [vector literal constructor](https://docs.julialang.org/../../manual/arrays/#man-array-literals) (calling [`vect`](https://docs.julialang.org/../arrays/#Base.vect)) |
| `[;]` | [vertical concatenation](https://docs.julialang.org/../../manual/arrays/#man-array-concatenation) (calling [`vcat`](https://docs.julialang.org/../arrays/#Base.vcat) or [`hvcat`](https://docs.julialang.org/../arrays/#Base.hvcat)) |
| `[   ]` | with space-separated expressions, [horizontal concatenation](https://docs.julialang.org/../../manual/strings/#man-concatenation) (calling [`hcat`](https://docs.julialang.org/../arrays/#Base.hcat) or [`hvcat`](https://docs.julialang.org/../arrays/#Base.hvcat)) |
| `T{ }` | curly braces following a type list that type's [parameters](https://docs.julialang.org/../../manual/types/#Parametric-Types) |
| `{}` | curly braces can also be used to group multiple [`where`](https://docs.julialang.org/../base/#where) expressions in function declarations |
| `;` | semicolons separate statements, begin a list of keyword arguments in function declarations or calls, or are used to separate array literals for vertical concatenation |
| `,` | commas separate function arguments or tuple or array components |
| `?` | the question mark delimits the ternary conditional operator (used like: `conditional ? if_true : if_false`) |
| `" "` | the single double-quote character delimits [`String`](https://docs.julialang.org/../strings/#Core.String-Tuple%7BAbstractString%7D) literals |
| `""" """` | three double-quote characters delimits string literals that may contain `"` and ignore leading indentation |
| `' '` | the single-quote character delimits [`Char`](https://docs.julialang.org/../strings/#Core.Char) (that is, character) literals |
| `` `` | the backtick character delimits [external process](https://docs.julialang.org/../../manual/running-external-programs/#Running-External-Programs) ([`Cmd`](https://docs.julialang.org/../base/#Base.Cmd)) literals |
| `A...` | triple periods are a postfix operator that "splat" their arguments' contents into many arguments of a function call or declare a varargs function that "slurps" up many arguments into a single tuple |
| `a.b` | single periods access named fields in objects/modules (calling [`getproperty`](https://docs.julialang.org/../base/#Base.getproperty) or [`setproperty!`](https://docs.julialang.org/../base/#Base.setproperty!)) |
| `f.()` | periods may also prefix parentheses (like `f.(...)`) or infix operators (like `.+`) to perform the function element-wise (calling [`broadcast`](https://docs.julialang.org/../arrays/#Base.Broadcast.broadcast)) |
| `a:b` | colons ([`:`](https://docs.julialang.org/../math/#Base.::)) used as a binary infix operator construct a range from `a` to `b` (inclusive) with fixed step size `1` |
| `a:s:b` | colons ([`:`](https://docs.julialang.org/../math/#Base.::)) used as a ternary infix operator construct a range from `a` to `b` (inclusive) with step size `s` |
| `:` | when used by themselves, [`Colon`](https://docs.julialang.org/../arrays/#Base.Colon)s represent all indices within a dimension, frequently combined with [indexing](https://docs.julialang.org/../../manual/arrays/#man-array-indexing) |
| `::` | double-colons represent a type annotation or [`typeassert`](https://docs.julialang.org/../base/#Core.typeassert), depending on context, frequently used when declaring function arguments |
| `:( )` | quoted expression |
| `:a` | [`Symbol`](https://docs.julialang.org/../base/#Core.Symbol) a |
| [`<:`](https://docs.julialang.org/../base/#Core.:<:) | subtype operator |
| [`>:`](https://docs.julialang.org/../base/#Base.:>:) | supertype operator (reverse of subtype operator) |
| `=` | single equals sign is [assignment](https://docs.julialang.org/../../manual/variables/#man-variables) |
| [`==`](https://docs.julialang.org/../math/#Base.:==) | double equals sign is value equality comparison |
| [`===`](https://docs.julialang.org/../base/#Core.:===) | triple equals sign is programmatically identical equality comparison |
| [`=>`](https://docs.julialang.org/../collections/#Core.Pair) | right arrow using an equals sign defines a [`Pair`](https://docs.julialang.org/../collections/#Core.Pair) typically used to populate [dictionaries](https://docs.julialang.org/../collections/#Dictionaries) |
| `->` | right arrow using a hyphen defines an [anonymous function](https://docs.julialang.org/../../manual/functions/#man-anonymous-functions) on a single line |
| [`|>`](https://docs.julialang.org/../base/#Base.:%7C>) | pipe operator passes output from the left argument to input of the right argument, usually a [function](https://docs.julialang.org/../../manual/functions/#Function-composition-and-piping) |
| `∘` | function composition operator (typed with circ{tab}) combines two functions as though they are a single larger [function](https://docs.julialang.org/../../manual/functions/#Function-composition-and-piping) |




