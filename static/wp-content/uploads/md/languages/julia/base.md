Julia Base contains a range of functions and macros appropriate for performing scientific and numerical computing, but is also as broad as those of many general purpose programming languages. Additional functionality is available from a growing collection of available packages. Functions are grouped by topic below.

Some general notes:

* To use module functions, use `import Module` to import the module, and `Module.fn(x)` to use the functions.
* Alternatively, `using Module` will import all exported `Module` functions into the current namespace.
* By convention, function names ending with an exclamation point (`!`) modify their arguments. Some functions have both modifying (e.g., `sort!`) and non-modifying (`sort`) versions.

The behaviors of `Base` and standard libraries are stable as defined in [SemVer](https://semver.org/) only if they are documented; i.e., included in the [Julia documentation](https://docs.julialang.org/) and not marked as unstable. See [API FAQ](https://docs.julialang.org/../../manual/faq/#man-api) for more information.


```julia
exit(code=0)
```
Stop the program with an exit code. The default exit code is zero, indicating that the program completed successfully. In an interactive session, `exit()` can be called with the keyboard shortcut `^D`.

[source](https://github.com/JuliaLang/julia/blob/17cfb8e65ead377bf1b4598d8a9869144142c84e/base/initdefs.jl#L21-L27)
```julia
atexit(f)
```
Register a zero-argument function `f()` to be called at process exit. `atexit()` hooks are called in last in first out (LIFO) order and run before object finalizers.

Exit hooks are allowed to call `exit(n)`, in which case Julia will exit with exit code `n` (instead of the original exit code). If more than one exit hook calls `exit(n)`, then Julia will exit with the exit code corresponding to the last called exit hook that calls `exit(n)`. (Because exit hooks are called in LIFO order, "last called" is equivalent to "first registered".)

[source](https://github.com/JuliaLang/julia/blob/17cfb8e65ead377bf1b4598d8a9869144142c84e/base/initdefs.jl#L354-L365)
```julia
isinteractive() -> Bool
```
Determine whether Julia is running an interactive session.

[source](https://github.com/JuliaLang/julia/blob/17cfb8e65ead377bf1b4598d8a9869144142c84e/base/initdefs.jl#L35-L39)
```julia
Base.summarysize(obj; exclude=Union{...}, chargeall=Union{...}) -> Int
```
Compute the amount of memory, in bytes, used by all unique objects reachable from the argument.

**Keyword Arguments**

* `exclude`: specifies the types of objects to exclude from the traversal.
* `chargeall`: specifies the types of objects to always charge the size of all of their fields, even if those fields would normally be excluded.

See also [`sizeof`](https://docs.julialang.org/#Base.sizeof-Tuple%7BType%7D).

**Examples**


```julia
julia> Base.summarysize(1.0)
8

julia> Base.summarysize(Ref(rand(100)))
848

julia> sizeof(Ref(rand(100)))
8
```
[source](https://github.com/JuliaLang/julia/blob/17cfb8e65ead377bf1b4598d8a9869144142c84e/base/summarysize.jl#L11-L34)
```julia
require(into::Module, module::Symbol)
```
This function is part of the implementation of [`using`](https://docs.julialang.org/#using) / [`import`](https://docs.julialang.org/#import), if a module is not already defined in `Main`. It can also be called directly to force reloading a module, regardless of whether it has been loaded before (for example, when interactively developing libraries).

Loads a source file, in the context of the `Main` module, on every active node, searching standard locations for files. `require` is considered a top-level operation, so it sets the current `include` path but does not use it to search for files (see help for [`include`](https://docs.julialang.org/#Base.include)). This function is typically used to load library code, and is implicitly called by `using` to load packages.

When searching for files, `require` first looks for package code in the global array [`LOAD_PATH`](https://docs.julialang.org/../constants/#Base.LOAD_PATH). `require` is case-sensitive on all platforms, including those with case-insensitive filesystems like macOS and Windows.

For more details regarding code loading, see the manual sections on [modules](https://docs.julialang.org/../../manual/modules/#modules) and [parallel computing](../../manual/distributed-computing/#code-availability).

[source](https://github.com/JuliaLang/julia/blob/17cfb8e65ead377bf1b4598d8a9869144142c84e/base/loading.jl#L1122-L1142)
```julia
Base.compilecache(module::PkgId)
```
Creates a precompiled cache file for a module and all of its dependencies. This can be used to reduce package load times. Cache files are stored in `DEPOT_PATH[1]/compiled`. See [Module initialization and precompilation](https://docs.julialang.org/../../manual/modules/#Module-initialization-and-precompilation) for important notes.

[source](https://github.com/JuliaLang/julia/blob/17cfb8e65ead377bf1b4598d8a9869144142c84e/base/loading.jl#L1629-L1636)
```julia
__precompile__(isprecompilable::Bool)
```
Specify whether the file calling this function is precompilable, defaulting to `true`. If a module or file is *not* safely precompilable, it should call `__precompile__(false)` in order to throw an error if Julia attempts to precompile it.

[source](https://github.com/JuliaLang/julia/blob/17cfb8e65ead377bf1b4598d8a9869144142c84e/base/loading.jl#L1105-L1111)
```julia
Base.include([mapexpr::Function,] [m::Module,] path::AbstractString)
```
Evaluate the contents of the input source file in the global scope of module `m`. Every module (except those defined with [`baremodule`](https://docs.julialang.org/#baremodule)) has its own definition of `include` omitting the `m` argument, which evaluates the file in that module. Returns the result of the last evaluated expression of the input file. During including, a task-local include path is set to the directory containing the file. Nested calls to `include` will search relative to that path. This function is typically used to load source interactively, or to combine files in packages that are broken into multiple source files.

The optional first argument `mapexpr` can be used to transform the included code before it is evaluated: for each parsed expression `expr` in `path`, the `include` function actually evaluates `mapexpr(expr)`. If it is omitted, `mapexpr` defaults to [`identity`](https://docs.julialang.org/#Base.identity).

Julia 1.5 is required for passing the `mapexpr` argument.

[source](https://github.com/JuliaLang/julia/blob/17cfb8e65ead377bf1b4598d8a9869144142c84e/base/loading.jl#L1457-L1474)
```julia
include([mapexpr::Function,] path::AbstractString)
```
Evaluate the contents of the input source file in the global scope of the containing module. Every module (except those defined with `baremodule`) has its own definition of `include`, which evaluates the file in that module. Returns the result of the last evaluated expression of the input file. During including, a task-local include path is set to the directory containing the file. Nested calls to `include` will search relative to that path. This function is typically used to load source interactively, or to combine files in packages that are broken into multiple source files. The argument `path` is normalized using [`normpath`](https://docs.julialang.org/../file/#Base.Filesystem.normpath) which will resolve relative path tokens such as `..` and convert `/` to the appropriate path separator.

The optional first argument `mapexpr` can be used to transform the included code before it is evaluated: for each parsed expression `expr` in `path`, the `include` function actually evaluates `mapexpr(expr)`. If it is omitted, `mapexpr` defaults to [`identity`](https://docs.julialang.org/#Base.identity).

Use [`Base.include`](https://docs.julialang.org/#Base.include) to evaluate a file into another module.

Julia 1.5 is required for passing the `mapexpr` argument.

[source](https://github.com/JuliaLang/julia/blob/17cfb8e65ead377bf1b4598d8a9869144142c84e/base/client.jl#L490-L511)
```julia
include_string([mapexpr::Function,] m::Module, code::AbstractString, filename::AbstractString="string")
```
Like [`include`](https://docs.julialang.org/#Base.include), except reads code from the given string rather than from a file.

The optional first argument `mapexpr` can be used to transform the included code before it is evaluated: for each parsed expression `expr` in `code`, the `include_string` function actually evaluates `mapexpr(expr)`. If it is omitted, `mapexpr` defaults to [`identity`](https://docs.julialang.org/#Base.identity).

Julia 1.5 is required for passing the `mapexpr` argument.

[source](https://github.com/JuliaLang/julia/blob/17cfb8e65ead377bf1b4598d8a9869144142c84e/base/loading.jl#L1398-L1409)
```julia
include_dependency(path::AbstractString)
```
In a module, declare that the file specified by `path` (relative or absolute) is a dependency for precompilation; that is, the module will need to be recompiled if this file changes.

This is only needed if your module depends on a file that is not used via [`include`](https://docs.julialang.org/#Base.include). It has no effect outside of compilation.

[source](https://github.com/JuliaLang/julia/blob/17cfb8e65ead377bf1b4598d8a9869144142c84e/base/loading.jl#L1080-L1089)
```julia
which(f, types)
```
Returns the method of `f` (a `Method` object) that would be called for arguments of the given `types`.

If `types` is an abstract type, then the method that would be called by `invoke` is returned.

See also: [`parentmodule`](https://docs.julialang.org/#Base.parentmodule), and `@which` and `@edit` in [`InteractiveUtils`](../../stdlib/InteractiveUtils/#man-interactive-utils).

[source](https://github.com/JuliaLang/julia/blob/17cfb8e65ead377bf1b4598d8a9869144142c84e/base/reflection.jl#L1399-L1407)
```julia
methods(f, [types], [module])
```
Return the method table for `f`.

If `types` is specified, return an array of methods whose types match. If `module` is specified, return an array of methods defined in that module. A list of modules can also be specified as an array.

At least Julia 1.4 is required for specifying a module.

See also: [`which`](https://docs.julialang.org/#Base.which-Tuple%7BAny,%20Any%7D) and `@which`.

[source](https://github.com/JuliaLang/julia/blob/17cfb8e65ead377bf1b4598d8a9869144142c84e/base/reflection.jl#L967-L980)
```julia
@show exs...
```
Prints one or more expressions, and their results, to `stdout`, and returns the last result.

See also: [`show`](https://docs.julialang.org/../io-network/#Base.show-Tuple%7BIO,%20Any%7D), [`@info`](https://docs.julialang.org/../../stdlib/Logging/#man-logging), [`println`](https://docs.julialang.org/../io-network/#Base.println).

**Examples**


```julia
julia> x = @show 1+2
1 + 2 = 3
3

julia> @show x^2 x/2;
x ^ 2 = 9
x / 2 = 1.5
```
[source](https://github.com/JuliaLang/julia/blob/17cfb8e65ead377bf1b4598d8a9869144142c84e/base/show.jl#L1025-L1042)
```julia
ans
```
A variable referring to the last computed value, automatically set at the interactive prompt.

[source](https://github.com/JuliaLang/julia/blob/17cfb8e65ead377bf1b4598d8a9869144142c84e/base/docs/basedocs.jl#L1259-L1263)
```julia
set_active_project(projfile::Union{AbstractString,Nothing})
```
Set the active `Project.toml` file to `projfile`. See also [`Base.active_project`](#Base.active_project).

[source](https://github.com/JuliaLang/julia/blob/17cfb8e65ead377bf1b4598d8a9869144142c84e/base/initdefs.jl#L314-L318)This is the list of reserved keywords in Julia: `baremodule`, `begin`, `break`, `catch`, `const`, `continue`, `do`, `else`, `elseif`, `end`, `export`, `false`, `finally`, `for`, `function`, `global`, `if`, `import`, `let`, `local`, `macro`, `module`, `quote`, `return`, `struct`, `true`, `try`, `using`, `while`. Those keywords are not allowed to be used as variable names.

The following two-word sequences are reserved: `abstract type`, `mutable struct`, `primitive type`. However, you can create variables with names: `abstract`, `mutable`, `primitive` and `type`.

Finally: `where` is parsed as an infix operator for writing parametric method and type definitions; `in` and `isa` are parsed as infix operators; and `outer` is parsed as a keyword when used to modify the scope of a variable in an iteration specification of a `for` loop or `generator` expression. Creation of variables named `where`, `in`, `isa` or `outer` is allowed though.


```julia
module
```
`module` declares a [`Module`](https://docs.julialang.org/#Core.Module), which is a separate global variable workspace. Within a module, you can control which names from other modules are visible (via importing), and specify which of your names are intended to be public (via exporting). Modules allow you to create top-level definitions without worrying about name conflicts when your code is used together with somebody else’s. See the [manual section about modules](https://docs.julialang.org/../../manual/modules/#modules) for more details.

**Examples**


```julia
module Foo
import Base.show
export MyType, foo

struct MyType
    x
end

bar(x) = 2x
foo(a::MyType) = bar(a.x) + 1
show(io::IO, a::MyType) = print(io, "MyType $(a.x)")
end
```
[source](https://github.com/JuliaLang/julia/blob/17cfb8e65ead377bf1b4598d8a9869144142c84e/base/docs/basedocs.jl#L78-L103)
```julia
export
```
`export` is used within modules to tell Julia which functions should be made available to the user. For example: `export foo` makes the name `foo` available when [`using`](https://docs.julialang.org/#using) the module. See the [manual section about modules](https://docs.julialang.org/../../manual/modules/#modules) for details.

[source](https://github.com/JuliaLang/julia/blob/17cfb8e65ead377bf1b4598d8a9869144142c84e/base/docs/basedocs.jl#L52-L59)
```julia
import
```
`import Foo` will load the module or package `Foo`. Names from the imported `Foo` module can be accessed with dot syntax (e.g. `Foo.foo` to access the name `foo`). See the [manual section about modules](https://docs.julialang.org/../../manual/modules/#modules) for details.

[source](https://github.com/JuliaLang/julia/blob/17cfb8e65ead377bf1b4598d8a9869144142c84e/base/docs/basedocs.jl#L42-L49)
```julia
using
```
`using Foo` will load the module or package `Foo` and make its [`export`](https://docs.julialang.org/#export)ed names available for direct use. Names can also be used via dot syntax (e.g. `Foo.foo` to access the name `foo`), whether they are `export`ed or not. See the [manual section about modules](https://docs.julialang.org/../../manual/modules/#modules) for details.

[source](https://github.com/JuliaLang/julia/blob/17cfb8e65ead377bf1b4598d8a9869144142c84e/base/docs/basedocs.jl#L32-L39)
```julia
baremodule
```
`baremodule` declares a module that does not contain `using Base` or local definitions of [`eval`](https://docs.julialang.org/#Base.MainInclude.eval) and [`include`](https://docs.julialang.org/#Base.include). It does still import `Core`. In other words,


```julia
module Mod

...

end
```
is equivalent to


```julia
baremodule Mod

using Base

eval(x) = Core.eval(Mod, x)
include(p) = Base.include(Mod, p)

...

end
```
[source](https://github.com/JuliaLang/julia/blob/17cfb8e65ead377bf1b4598d8a9869144142c84e/base/docs/basedocs.jl#L129-L157)
```julia
function
```
Functions are defined with the `function` keyword:


```julia
function add(a, b)
    return a + b
end
```
Or the short form notation:


```julia
add(a, b) = a + b
```
The use of the [`return`](https://docs.julialang.org/#return) keyword is exactly the same as in other languages, but is often optional. A function without an explicit `return` statement will return the last expression in the function body.

[source](https://github.com/JuliaLang/julia/blob/17cfb8e65ead377bf1b4598d8a9869144142c84e/base/docs/basedocs.jl#L611-L630)
```julia
macro
```
`macro` defines a method for inserting generated code into a program. A macro maps a sequence of argument expressions to a returned expression, and the resulting expression is substituted directly into the program at the point where the macro is invoked. Macros are a way to run generated code without calling [`eval`](https://docs.julialang.org/#Base.MainInclude.eval), since the generated code instead simply becomes part of the surrounding program. Macro arguments may include expressions, literal values, and symbols. Macros can be defined for variable number of arguments (varargs), but do not accept keyword arguments. Every macro also implicitly gets passed the arguments `__source__`, which contains the line number and file name the macro is called from, and `__module__`, which is the module the macro is expanded in.

**Examples**


```julia
julia> macro sayhello(name)
           return :( println("Hello, ", $name, "!") )
       end
@sayhello (macro with 1 method)

julia> @sayhello "Charlie"
Hello, Charlie!

julia> macro saylots(x...)
           return :( println("Say: ", $(x...)) )
       end
@saylots (macro with 1 method)

julia> @saylots "hey " "there " "friend"
Say: hey there friend
```
[source](https://github.com/JuliaLang/julia/blob/17cfb8e65ead377bf1b4598d8a9869144142c84e/base/docs/basedocs.jl#L178-L211)
```julia
return
```
`return x` causes the enclosing function to exit early, passing the given value `x` back to its caller. `return` by itself with no value is equivalent to `return nothing` (see [`nothing`](https://docs.julialang.org/../constants/#Core.nothing)).


```julia
function compare(a, b)
    a == b && return "equal to"
    a < b ? "less than" : "greater than"
end
```
In general you can place a `return` statement anywhere within a function body, including within deeply nested loops or conditionals, but be careful with `do` blocks. For example:


```julia
function test1(xs)
    for x in xs
        iseven(x) && return 2x
    end
end

function test2(xs)
    map(xs) do x
        iseven(x) && return 2x
        x
    end
end
```
In the first example, the return breaks out of `test1` as soon as it hits an even number, so `test1([5,6,7])` returns `12`.

You might expect the second example to behave the same way, but in fact the `return` there only breaks out of the *inner* function (inside the `do` block) and gives a value back to `map`. `test2([5,6,7])` then returns `[5,12,7]`.

When used in a top-level expression (i.e. outside any function), `return` causes the entire current top-level expression to terminate early.

[source](https://github.com/JuliaLang/julia/blob/17cfb8e65ead377bf1b4598d8a9869144142c84e/base/docs/basedocs.jl#L659-L699)
```julia
do
```
Create an anonymous function and pass it as the first argument to a function call. For example:


```julia
map(1:10) do x
    2x
end
```
is equivalent to `map(x->2x, 1:10)`.

Use multiple arguments like so:


```julia
map(1:10, 11:20) do x, y
    x + y
end
```
[source](https://github.com/JuliaLang/julia/blob/17cfb8e65ead377bf1b4598d8a9869144142c84e/base/docs/basedocs.jl#L926-L948)
```julia
begin
```
`begin...end` denotes a block of code.


```julia
begin
    println("Hello, ")
    println("World!")
end
```
Usually `begin` will not be necessary, since keywords such as [`function`](https://docs.julialang.org/#function) and [`let`](https://docs.julialang.org/#let) implicitly begin blocks of code. See also [`;`](https://docs.julialang.org/#;).

`begin` may also be used when indexing to represent the first index of a collection or the first index of a dimension of an array.

**Examples**


```julia
julia> A = [1 2; 3 4]
2×2 Array{Int64,2}:
 1  2
 3  4

julia> A[begin, :]
2-element Array{Int64,1}:
 1
 2
```
[source](https://github.com/JuliaLang/julia/blob/17cfb8e65ead377bf1b4598d8a9869144142c84e/base/docs/basedocs.jl#L1108-L1138)
```julia
end
```
`end` marks the conclusion of a block of expressions, for example [`module`](https://docs.julialang.org/#module), [`struct`](https://docs.julialang.org/#struct), [`mutable struct`](https://docs.julialang.org/#mutable%20struct), [`begin`](https://docs.julialang.org/#begin), [`let`](https://docs.julialang.org/#let), [`for`](https://docs.julialang.org/#for) etc.

`end` may also be used when indexing to represent the last index of a collection or the last index of a dimension of an array.

**Examples**


```julia
julia> A = [1 2; 3 4]
2×2 Array{Int64, 2}:
 1  2
 3  4

julia> A[end, :]
2-element Array{Int64, 1}:
 3
 4
```
[source](https://github.com/JuliaLang/julia/blob/17cfb8e65ead377bf1b4598d8a9869144142c84e/base/docs/basedocs.jl#L797-L819)
```julia
let
```
`let` statements create a new hard scope block and introduce new variable bindings each time they run. Whereas assignments might reassign a new value to an existing value location, `let` always creates a new location. This difference is only detectable in the case of variables that outlive their scope via closures. The `let` syntax accepts a comma-separated series of assignments and variable names:


```julia
let var1 = value1, var2, var3 = value3
    code
end
```
The assignments are evaluated in order, with each right-hand side evaluated in the scope before the new variable on the left-hand side has been introduced. Therefore it makes sense to write something like `let x = x`, since the two `x` variables are distinct and have separate storage.

[source](https://github.com/JuliaLang/julia/blob/17cfb8e65ead377bf1b4598d8a9869144142c84e/base/docs/basedocs.jl#L430-L449)
```julia
if/elseif/else
```
`if`/`elseif`/`else` performs conditional evaluation, which allows portions of code to be evaluated or not evaluated depending on the value of a boolean expression. Here is the anatomy of the `if`/`elseif`/`else` conditional syntax:


```julia
if x < y
    println("x is less than y")
elseif x > y
    println("x is greater than y")
else
    println("x is equal to y")
end
```
If the condition expression `x < y` is true, then the corresponding block is evaluated; otherwise the condition expression `x > y` is evaluated, and if it is true, the corresponding block is evaluated; if neither expression is true, the `else` block is evaluated. The `elseif` and `else` blocks are optional, and as many `elseif` blocks as desired can be used.

In contrast to some other languages conditions must be of type `Bool`. It does not suffice for conditions to be convertible to `Bool`.


```julia
julia> if 1 end
ERROR: TypeError: non-boolean (Int64) used in boolean context
```
[source](https://github.com/JuliaLang/julia/blob/17cfb8e65ead377bf1b4598d8a9869144142c84e/base/docs/basedocs.jl#L702-L730)
```julia
for
```
`for` loops repeatedly evaluate a block of statements while iterating over a sequence of values.

**Examples**


```julia
julia> for i in [1, 4, 0]
           println(i)
       end
1
4
0
```
[source](https://github.com/JuliaLang/julia/blob/17cfb8e65ead377bf1b4598d8a9869144142c84e/base/docs/basedocs.jl#L755-L770)
```julia
while
```
`while` loops repeatedly evaluate a conditional expression, and continue evaluating the body of the while loop as long as the expression remains true. If the condition expression is false when the while loop is first reached, the body is never evaluated.

**Examples**


```julia
julia> i = 1
1

julia> while i < 5
           println(i)
           global i += 1
       end
1
2
3
4
```
[source](https://github.com/JuliaLang/julia/blob/17cfb8e65ead377bf1b4598d8a9869144142c84e/base/docs/basedocs.jl#L773-L794)
```julia
break
```
Break out of a loop immediately.

**Examples**


```julia
julia> i = 0
0

julia> while true
           global i += 1
           i > 5 && break
           println(i)
       end
1
2
3
4
5
```
[source](https://github.com/JuliaLang/julia/blob/17cfb8e65ead377bf1b4598d8a9869144142c84e/base/docs/basedocs.jl#L884-L905)
```julia
continue
```
Skip the rest of the current loop iteration.

**Examples**


```julia
julia> for i = 1:6
           iseven(i) && continue
           println(i)
       end
1
3
5
```
[source](https://github.com/JuliaLang/julia/blob/17cfb8e65ead377bf1b4598d8a9869144142c84e/base/docs/basedocs.jl#L908-L923)
```julia
try/catch
```
A `try`/`catch` statement allows intercepting errors (exceptions) thrown by [`throw`](https://docs.julialang.org/#Core.throw) so that program execution can continue. For example, the following code attempts to write a file, but warns the user and proceeds instead of terminating execution if the file cannot be written:


```julia
try
    open("/danger", "w") do f
        println(f, "Hello")
    end
catch
    @warn "Could not write file."
end
```
or, when the file cannot be read into a variable:


```julia
lines = try
    open("/danger", "r") do f
        readlines(f)
    end
catch
    @warn "File not found."
end
```
The syntax `catch e` (where `e` is any variable) assigns the thrown exception object to the given variable within the `catch` block.

The power of the `try`/`catch` construct lies in the ability to unwind a deeply nested computation immediately to a much higher level in the stack of calling functions.

[source](https://github.com/JuliaLang/julia/blob/17cfb8e65ead377bf1b4598d8a9869144142c84e/base/docs/basedocs.jl#L822-L857)
```julia
finally
```
Run some code when a given block of code exits, regardless of how it exits. For example, here is how we can guarantee that an opened file is closed:


```julia
f = open("file")
try
    operate_on_file(f)
finally
    close(f)
end
```
When control leaves the [`try`](https://docs.julialang.org/#try) block (for example, due to a [`return`](https://docs.julialang.org/#return), or just finishing normally), [`close(f)`](https://docs.julialang.org/../io-network/#Base.close) will be executed. If the `try` block exits due to an exception, the exception will continue propagating. A `catch` block may be combined with `try` and `finally` as well. In this case the `finally` block will run after `catch` has handled the error.

[source](https://github.com/JuliaLang/julia/blob/17cfb8e65ead377bf1b4598d8a9869144142c84e/base/docs/basedocs.jl#L860-L881)
```julia
quote
```
`quote` creates multiple expression objects in a block without using the explicit [`Expr`](https://docs.julialang.org/#Core.Expr) constructor. For example:


```julia
ex = quote
    x = 1
    y = 2
    x + y
end
```
Unlike the other means of quoting, `:( ... )`, this form introduces `QuoteNode` elements to the expression tree, which must be considered when directly manipulating the tree. For other purposes, `:( ... )` and `quote .. end` blocks are treated identically.

[source](https://github.com/JuliaLang/julia/blob/17cfb8e65ead377bf1b4598d8a9869144142c84e/base/docs/basedocs.jl#L452-L468)
```julia
local
```
`local` introduces a new local variable. See the [manual section on variable scoping](https://docs.julialang.org/../../manual/variables-and-scoping/#scope-of-variables) for more information.

**Examples**


```julia
julia> function foo(n)
           x = 0
           for i = 1:n
               local x # introduce a loop-local x
               x = i
           end
           x
       end
foo (generic function with 1 method)

julia> foo(10)
0
```
[source](https://github.com/JuliaLang/julia/blob/17cfb8e65ead377bf1b4598d8a9869144142c84e/base/docs/basedocs.jl#L232-L253)
```julia
global
```
`global x` makes `x` in the current scope and its inner scopes refer to the global variable of that name. See the [manual section on variable scoping](https://docs.julialang.org/../../manual/variables-and-scoping/#scope-of-variables) for more information.

**Examples**


```julia
julia> z = 3
3

julia> function foo()
           global z = 6 # use the z variable defined outside foo
       end
foo (generic function with 1 method)

julia> foo()
6

julia> z
6
```
[source](https://github.com/JuliaLang/julia/blob/17cfb8e65ead377bf1b4598d8a9869144142c84e/base/docs/basedocs.jl#L256-L279)
```julia
const
```
`const` is used to declare global variables whose values will not change. In almost all code (and particularly performance sensitive code) global variables should be declared constant in this way.


```julia
const x = 5
```
Multiple variables can be declared within a single `const`:


```julia
const y, z = 7, 11
```
Note that `const` only applies to one `=` operation, therefore `const x = y = 1` declares `x` to be constant but not `y`. On the other hand, `const x = const y = 1` declares both `x` and `y` constant.

Note that "constant-ness" does not extend into mutable containers; only the association between a variable and its value is constant. If `x` is an array or dictionary (for example) you can still modify, add, or remove elements.

In some cases changing the value of a `const` variable gives a warning instead of an error. However, this can produce unpredictable behavior or corrupt the state of your program, and so should be avoided. This feature is intended only for convenience during interactive use.

[source](https://github.com/JuliaLang/julia/blob/17cfb8e65ead377bf1b4598d8a9869144142c84e/base/docs/basedocs.jl#L579-L608)
```julia
struct
```
The most commonly used kind of type in Julia is a struct, specified as a name and a set of fields.


```julia
struct Point
    x
    y
end
```
Fields can have type restrictions, which may be parameterized:


```julia
struct Point{X}
    x::X
    y::Float64
end
```
A struct can also declare an abstract super type via `<:` syntax:


```julia
struct Point <: AbstractPoint
    x
    y
end
```
`struct`s are immutable by default; an instance of one of these types cannot be modified after construction. Use [`mutable struct`](https://docs.julialang.org/#mutable%20struct) instead to declare a type whose instances can be modified.

See the manual section on [Composite Types](https://docs.julialang.org/../../manual/types/#Composite-Types) for more details, such as how to define constructors.

[source](https://github.com/JuliaLang/julia/blob/17cfb8e65ead377bf1b4598d8a9869144142c84e/base/docs/basedocs.jl#L1141-L1178)
```julia
mutable struct
```
`mutable struct` is similar to [`struct`](https://docs.julialang.org/#struct), but additionally allows the fields of the type to be set after construction. See the manual section on [Composite Types](https://docs.julialang.org/../../manual/types/#Composite-Types) for more information.

[source](https://github.com/JuliaLang/julia/blob/17cfb8e65ead377bf1b4598d8a9869144142c84e/base/docs/basedocs.jl#L1181-L1187)
```julia
abstract type
```
`abstract type` declares a type that cannot be instantiated, and serves only as a node in the type graph, thereby describing sets of related concrete types: those concrete types which are their descendants. Abstract types form the conceptual hierarchy which makes Julia’s type system more than just a collection of object implementations. For example:


```julia
abstract type Number end
abstract type Real <: Number end
```
[`Number`](https://docs.julialang.org/../numbers/#Core.Number) has no supertype, whereas [`Real`](https://docs.julialang.org/../numbers/#Core.Real) is an abstract subtype of `Number`.

[source](https://github.com/JuliaLang/julia/blob/17cfb8e65ead377bf1b4598d8a9869144142c84e/base/docs/basedocs.jl#L62-L75)
```julia
primitive type
```
`primitive type` declares a concrete type whose data consists only of a series of bits. Classic examples of primitive types are integers and floating-point values. Some example built-in primitive type declarations:


```julia
primitive type Char 32 end
primitive type Bool <: Integer 8 end
```
The number after the name indicates how many bits of storage the type requires. Currently, only sizes that are multiples of 8 bits are supported. The [`Bool`](https://docs.julialang.org/../numbers/#Core.Bool) declaration shows how a primitive type can be optionally declared to be a subtype of some supertype.

[source](https://github.com/JuliaLang/julia/blob/17cfb8e65ead377bf1b4598d8a9869144142c84e/base/docs/basedocs.jl#L160-L175)
```julia
where
```
The `where` keyword creates a type that is an iterated union of other types, over all values of some variable. For example `Vector{T} where T<:Real` includes all [`Vector`](https://docs.julialang.org/../arrays/#Base.Vector)s where the element type is some kind of `Real` number.

The variable bound defaults to [`Any`](https://docs.julialang.org/#Core.Any) if it is omitted:


```julia
Vector{T} where T    # short for `where T<:Any`
```
Variables can also have lower bounds:


```julia
Vector{T} where T>:Int
Vector{T} where Int<:T<:Real
```
There is also a concise syntax for nested `where` expressions. For example, this:


```julia
Pair{T, S} where S<:Array{T} where T<:Number
```
can be shortened to:


```julia
Pair{T, S} where {T<:Number, S<:Array{T}}
```
This form is often found on method signatures.

Note that in this form, the variables are listed outermost-first. This matches the order in which variables are substituted when a type is "applied" to parameter values using the syntax `T{p1, p2, ...}`.

[source](https://github.com/JuliaLang/julia/blob/17cfb8e65ead377bf1b4598d8a9869144142c84e/base/docs/basedocs.jl#L1200-L1233)
```julia
...
```
The "splat" operator, `...`, represents a sequence of arguments. `...` can be used in function definitions, to indicate that the function accepts an arbitrary number of arguments. `...` can also be used to apply a function to a sequence of arguments.

**Examples**


```julia
julia> add(xs...) = reduce(+, xs)
add (generic function with 1 method)

julia> add(1, 2, 3, 4, 5)
15

julia> add([1, 2, 3]...)
6

julia> add(7, 1:100..., 1000:1100...)
111107
```
[source](https://github.com/JuliaLang/julia/blob/17cfb8e65ead377bf1b4598d8a9869144142c84e/base/docs/basedocs.jl#L951-L973)
```julia
;
```
`;` has a similar role in Julia as in many C-like languages, and is used to delimit the end of the previous statement.

`;` is not necessary at the end of a line, but can be used to separate statements on a single line or to join statements into a single expression.

Adding `;` at the end of a line in the REPL will suppress printing the result of that expression.

In function declarations, and optionally in calls, `;` separates regular arguments from keywords.

While constructing arrays, if the arguments inside the square brackets are separated by `;` then their contents are vertically concatenated together.

In the standard REPL, typing `;` on an empty line will switch to shell mode.

**Examples**


```julia
julia> function foo()
           x = "Hello, "; x *= "World!"
           return x
       end
foo (generic function with 1 method)

julia> bar() = (x = "Hello, Mars!"; return x)
bar (generic function with 1 method)

julia> foo();

julia> bar()
"Hello, Mars!"

julia> function plot(x, y; style="solid", width=1, color="black")
           ###
       end

julia> [1 2; 3 4]
2×2 Matrix{Int64}:
 1  2
 3  4

julia> ; # upon typing ;, the prompt changes (in place) to: shell>
shell> echo hello
hello
```
[source](https://github.com/JuliaLang/julia/blob/17cfb8e65ead377bf1b4598d8a9869144142c84e/base/docs/basedocs.jl#L976-L1023)
```julia
=
```
`=` is the assignment operator.

* For variable `a` and expression `b`, `a = b` makes `a` refer to the value of `b`.
* For functions `f(x)`, `f(x) = x` defines a new function constant `f`, or adds a new method to `f` if `f` is already defined; this usage is equivalent to `function f(x); x; end`.
* `a[i] = v` calls [`setindex!`](https://docs.julialang.org/../collections/#Base.setindex!)`(a,v,i)`.
* `a.b = c` calls [`setproperty!`](https://docs.julialang.org/#Base.setproperty!)`(a,:b,c)`.
* Inside a function call, `f(a=b)` passes `b` as the value of keyword argument `a`.
* Inside parentheses with commas, `(a=1,)` constructs a [`NamedTuple`](https://docs.julialang.org/#Core.NamedTuple).

**Examples**

Assigning `a` to `b` does not create a copy of `b`; instead use [`copy`](https://docs.julialang.org/#Base.copy) or [`deepcopy`](https://docs.julialang.org/#Base.deepcopy).


```julia
julia> b = [1]; a = b; b[1] = 2; a
1-element Array{Int64, 1}:
 2

julia> b = [1]; a = copy(b); b[1] = 2; a
1-element Array{Int64, 1}:
 1

```
Collections passed to functions are also not copied. Functions can modify (mutate) the contents of the objects their arguments refer to. (The names of functions which do this are conventionally suffixed with '!'.)


```julia
julia> function f!(x); x[:] .+= 1; end
f! (generic function with 1 method)

julia> a = [1]; f!(a); a
1-element Array{Int64, 1}:
 2

```
Assignment can operate on multiple variables in parallel, taking values from an iterable:


```julia
julia> a, b = 4, 5
(4, 5)

julia> a, b = 1:3
1:3

julia> a, b
(1, 2)

```
Assignment can operate on multiple variables in series, and will return the value of the right-hand-most expression:


```julia
julia> a = [1]; b = [2]; c = [3]; a = b = c
1-element Array{Int64, 1}:
 3

julia> b[1] = 2; a, b, c
([2], [2], [2])

```
Assignment at out-of-bounds indices does not grow a collection. If the collection is a [`Vector`](https://docs.julialang.org/../arrays/#Base.Vector) it can instead be grown with [`push!`](https://docs.julialang.org/../collections/#Base.push!) or [`append!`](https://docs.julialang.org/../collections/#Base.append!).


```julia
julia> a = [1, 1]; a[3] = 2
ERROR: BoundsError: attempt to access 2-element Array{Int64, 1} at index [3]
[...]

julia> push!(a, 2, 3)
4-element Array{Int64, 1}:
 1
 1
 2
 3

```
Assigning `[]` does not eliminate elements from a collection; instead use [`filter!`](https://docs.julialang.org/../collections/#Base.filter!).


```julia
julia> a = collect(1:3); a[a .<= 1] = []
ERROR: DimensionMismatch: tried to assign 0 elements to 1 destinations
[...]

julia> filter!(x -> x > 1, a) # in-place & thus more efficient than a = a[a .> 1]
2-element Array{Int64, 1}:
 2
 3

```
[source](https://github.com/JuliaLang/julia/blob/17cfb8e65ead377bf1b4598d8a9869144142c84e/base/docs/basedocs.jl#L295-L377)
```julia
a ? b : c
```
Short form for conditionals; read "if `a`, evaluate `b` otherwise evaluate `c`". Also known as the [ternary operator](https://en.wikipedia.org/wiki/%3F:).

This syntax is equivalent to `if a; b else c end`, but is often used to emphasize the value `b`-or-`c` which is being used as part of a larger expression, rather than the side effects that evaluating `b` or `c` may have.

See the manual section on [control flow](https://docs.julialang.org/../../manual/control-flow/#man-conditional-evaluation) for more details.

**Examples**


```julia
julia> x = 1; y = 2;

julia> x > y ? println("x is larger") : println("y is larger")
y is larger
```
[source](https://github.com/JuliaLang/julia/blob/17cfb8e65ead377bf1b4598d8a9869144142c84e/base/docs/basedocs.jl#L733-L752)
```julia
Main
```
`Main` is the top-level module, and Julia starts with `Main` set as the current module. Variables defined at the prompt go in `Main`, and `varinfo` lists variables in `Main`.


```julia
julia> @__MODULE__
Main
```
[source](https://github.com/JuliaLang/julia/blob/17cfb8e65ead377bf1b4598d8a9869144142c84e/base/docs/basedocs.jl#L2833-L2841)
```julia
Core
```
`Core` is the module that contains all identifiers considered "built in" to the language, i.e. part of the core language and not libraries. Every module implicitly specifies `using Core`, since you can't do anything without those definitions.

[source](https://github.com/JuliaLang/julia/blob/17cfb8e65ead377bf1b4598d8a9869144142c84e/base/docs/basedocs.jl#L2826-L2830)
```julia
Base
```
The base library of Julia. `Base` is a module that contains basic functionality (the contents of `base/`). All modules implicitly contain `using Base`, since this is needed in the vast majority of cases.

[source](https://github.com/JuliaLang/julia/blob/17cfb8e65ead377bf1b4598d8a9869144142c84e/base/docs/basedocs.jl#L2844-L2848)
```julia
Base.Broadcast
```
Module containing the broadcasting implementation.

[source](https://github.com/JuliaLang/julia/blob/17cfb8e65ead377bf1b4598d8a9869144142c84e/base/broadcast.jl#L3-L7)
```julia
Docs
```
The `Docs` module provides the `@doc` macro which can be used to set and retrieve documentation metadata for Julia objects.

Please see the manual section on [documentation](https://docs.julialang.org/../../manual/documentation/#man-documentation) for more information.

[source](https://github.com/JuliaLang/julia/blob/17cfb8e65ead377bf1b4598d8a9869144142c84e/base/docs/Docs.jl#L3-L11)Methods for working with Iterators.

[source](https://github.com/JuliaLang/julia/blob/17cfb8e65ead377bf1b4598d8a9869144142c84e/base/iterators.jl#L3-L5)Interface to libc, the C standard library.

[source](https://github.com/JuliaLang/julia/blob/17cfb8e65ead377bf1b4598d8a9869144142c84e/base/libc.jl#L4-L6)Convenience functions for metaprogramming.

[source](https://github.com/JuliaLang/julia/blob/17cfb8e65ead377bf1b4598d8a9869144142c84e/base/meta.jl#L3-L5)Tools for collecting and manipulating stack traces. Mainly used for building errors.

[source](https://github.com/JuliaLang/julia/blob/17cfb8e65ead377bf1b4598d8a9869144142c84e/base/stacktraces.jl#L3-L5)Provide methods for retrieving information about hardware and the operating system.

[source](https://github.com/JuliaLang/julia/blob/17cfb8e65ead377bf1b4598d8a9869144142c84e/base/sysinfo.jl#L4-L6)
```julia
Base.GC
```
Module with garbage collection utilities.

[source](https://github.com/JuliaLang/julia/blob/17cfb8e65ead377bf1b4598d8a9869144142c84e/base/gcutils.jl#L70-L74)
```julia
===(x,y) -> Bool
≡(x,y) -> Bool
```
Determine whether `x` and `y` are identical, in the sense that no program could distinguish them. First the types of `x` and `y` are compared. If those are identical, mutable objects are compared by address in memory and immutable objects (such as numbers) are compared by contents at the bit level. This function is sometimes called "egal". It always returns a `Bool` value.

**Examples**


```julia
julia> a = [1, 2]; b = [1, 2];

julia> a == b
true

julia> a === b
false

julia> a === a
true
```
[source](https://github.com/JuliaLang/julia/blob/17cfb8e65ead377bf1b4598d8a9869144142c84e/base/operators.jl#L285-L308)
```julia
isa(x, type) -> Bool
```
Determine whether `x` is of the given `type`. Can also be used as an infix operator, e.g. `x isa type`.

**Examples**


```julia
julia> isa(1, Int)
true

julia> isa(1, Matrix)
false

julia> isa(1, Char)
false

julia> isa(1, Number)
true

julia> 1 isa Number
true
```
[source](https://github.com/JuliaLang/julia/blob/17cfb8e65ead377bf1b4598d8a9869144142c84e/base/docs/basedocs.jl#L1731-L1754)
```julia
isequal(x, y)
```
Similar to [`==`](https://docs.julialang.org/../math/#Base.:==), except for the treatment of floating point numbers and of missing values. `isequal` treats all floating-point `NaN` values as equal to each other, treats `-0.0` as unequal to `0.0`, and [`missing`](https://docs.julialang.org/#Base.missing) as equal to `missing`. Always returns a `Bool` value.

`isequal` is an equivalence relation - it is reflexive (`===` implies `isequal`), symmetric (`isequal(a, b)` implies `isequal(b, a)`) and transitive (`isequal(a, b)` and `isequal(b, c)` implies `isequal(a, c)`).

**Implementation**

The default implementation of `isequal` calls `==`, so a type that does not involve floating-point values generally only needs to define `==`.

`isequal` is the comparison function used by hash tables (`Dict`). `isequal(x,y)` must imply that `hash(x) == hash(y)`.

This typically means that types for which a custom `==` or `isequal` method exists must implement a corresponding [`hash`](https://docs.julialang.org/#Base.hash) method (and vice versa). Collections typically implement `isequal` by calling `isequal` recursively on all contents.

Furthermore, `isequal` is linked with [`isless`](https://docs.julialang.org/#Base.isless), and they work together to define a fixed total ordering, where exactly one of `isequal(x, y)`, `isless(x, y)`, or `isless(y, x)` must be `true` (and the other two `false`).

Scalar types generally do not need to implement `isequal` separate from `==`, unless they represent floating-point numbers amenable to a more efficient implementation than that provided as a generic fallback (based on `isnan`, `signbit`, and `==`).

**Examples**


```julia
julia> isequal([1., NaN], [1., NaN])
true

julia> [1., NaN] == [1., NaN]
false

julia> 0.0 == -0.0
true

julia> isequal(0.0, -0.0)
false

julia> missing == missing
missing

julia> isequal(missing, missing)
true
```
[source](https://github.com/JuliaLang/julia/blob/17cfb8e65ead377bf1b4598d8a9869144142c84e/base/operators.jl#L88-L139)
```julia
isequal(x)
```
Create a function that compares its argument to `x` using [`isequal`](https://docs.julialang.org/#Base.isequal), i.e. a function equivalent to `y -> isequal(y, x)`.

The returned function is of type `Base.Fix2{typeof(isequal)}`, which can be used to implement specialized methods.

[source](https://github.com/JuliaLang/julia/blob/17cfb8e65ead377bf1b4598d8a9869144142c84e/base/operators.jl#L1115-L1123)
```julia
isless(x, y)
```
Test whether `x` is less than `y`, according to a fixed total order (defined together with [`isequal`](https://docs.julialang.org/#Base.isequal)). `isless` is not defined on all pairs of values `(x, y)`. However, if it is defined, it is expected to satisfy the following:

* If `isless(x, y)` is defined, then so is `isless(y, x)` and `isequal(x, y)`, and exactly one of those three yields `true`.
* The relation defined by `isless` is transitive, i.e., `isless(x, y) && isless(y, z)` implies `isless(x, z)`.

Values that are normally unordered, such as `NaN`, are ordered after regular values. [`missing`](https://docs.julialang.org/#Base.missing) values are ordered last.

This is the default comparison used by [`sort`](https://docs.julialang.org/../sort/#Base.sort).

**Implementation**

Non-numeric types with a total order should implement this function. Numeric types only need to implement it if they have special values such as `NaN`. Types with a partial order should implement [`<`](https://docs.julialang.org/../math/#Base.:<). See the documentation on [Alternate orderings](https://docs.julialang.org/../sort/#Alternate-orderings) for how to define alternate ordering methods that can be used in sorting and related functions.

**Examples**


```julia
julia> isless(1, 3)
true

julia> isless("Red", "Blue")
false
```
[source](https://github.com/JuliaLang/julia/blob/17cfb8e65ead377bf1b4598d8a9869144142c84e/base/operators.jl#L149-L181)
```julia
ifelse(condition::Bool, x, y)
```
Return `x` if `condition` is `true`, otherwise return `y`. This differs from `?` or `if` in that it is an ordinary function, so all the arguments are evaluated first. In some cases, using `ifelse` instead of an `if` statement can eliminate the branch in generated code and provide higher performance in tight loops.

**Examples**


```julia
julia> ifelse(1 > 2, 1, 2)
2
```
[source](https://github.com/JuliaLang/julia/blob/17cfb8e65ead377bf1b4598d8a9869144142c84e/base/essentials.jl#L475-L488)
```julia
typeassert(x, type)
```
Throw a [`TypeError`](https://docs.julialang.org/#Core.TypeError) unless `x isa type`. The syntax `x::type` calls this function.

**Examples**


```julia
julia> typeassert(2.5, Int)
ERROR: TypeError: in typeassert, expected Int64, got a value of type Float64
Stacktrace:
[...]
```
[source](https://github.com/JuliaLang/julia/blob/17cfb8e65ead377bf1b4598d8a9869144142c84e/base/docs/basedocs.jl#L2673-L2686)
```julia
typeof(x)
```
Get the concrete type of `x`.

See also [`eltype`](https://docs.julialang.org/../collections/#Base.eltype).

**Examples**


```julia
julia> a = 1//2;

julia> typeof(a)
Rational{Int64}

julia> M = [1 2; 3.5 4];

julia> typeof(M)
Matrix{Float64} (alias for Array{Float64, 2})
```
[source](https://github.com/JuliaLang/julia/blob/17cfb8e65ead377bf1b4598d8a9869144142c84e/base/docs/basedocs.jl#L2054-L2073)
```julia
tuple(xs...)
```
Construct a tuple of the given objects.

See also [`Tuple`](https://docs.julialang.org/#Core.Tuple), [`NamedTuple`](https://docs.julialang.org/#Core.NamedTuple).

**Examples**


```julia
julia> tuple(1, 'b', pi)
(1, 'b', π)

julia> ans === (1, 'b', π)
true

julia> Tuple(Real[1, 2, pi])  # takes a collection
(1, 2, π)
```
[source](https://github.com/JuliaLang/julia/blob/17cfb8e65ead377bf1b4598d8a9869144142c84e/base/docs/basedocs.jl#L1922-L1940)
```julia
ntuple(f::Function, n::Integer)
```
Create a tuple of length `n`, computing each element as `f(i)`, where `i` is the index of the element.

**Examples**


```julia
julia> ntuple(i -> 2*i, 4)
(2, 4, 6, 8)
```
[source](https://github.com/JuliaLang/julia/blob/17cfb8e65ead377bf1b4598d8a9869144142c84e/base/ntuple.jl#L5-L16)
```julia
ntuple(f, ::Val{N})
```
Create a tuple of length `N`, computing each element as `f(i)`, where `i` is the index of the element. By taking a `Val(N)` argument, it is possible that this version of ntuple may generate more efficient code than the version taking the length as an integer. But `ntuple(f, N)` is preferable to `ntuple(f, Val(N))` in cases where `N` cannot be determined at compile time.

**Examples**


```julia
julia> ntuple(i -> 2*i, Val(4))
(2, 4, 6, 8)
```
[source](https://github.com/JuliaLang/julia/blob/17cfb8e65ead377bf1b4598d8a9869144142c84e/base/ntuple.jl#L52-L68)
```julia
objectid(x) -> UInt
```
Get a hash value for `x` based on object identity. `objectid(x)==objectid(y)` if `x === y`.

See also [`hash`](https://docs.julialang.org/#Base.hash), [`IdDict`](../collections/#Base.IdDict).

[source](https://github.com/JuliaLang/julia/blob/17cfb8e65ead377bf1b4598d8a9869144142c84e/base/reflection.jl#L333-L339)
```julia
hash(x[, h::UInt]) -> UInt
```
Compute an integer hash code such that `isequal(x,y)` implies `hash(x)==hash(y)`. The optional second argument `h` is a hash code to be mixed with the result.

New types should implement the 2-argument form, typically by calling the 2-argument `hash` method recursively in order to mix hashes of the contents with each other (and with `h`). Typically, any type that implements `hash` should also implement its own [`==`](https://docs.julialang.org/../math/#Base.:==) (hence [`isequal`](https://docs.julialang.org/#Base.isequal)) to guarantee the property mentioned above. Types supporting subtraction (operator `-`) should also implement [`widen`](https://docs.julialang.org/#Base.widen), which is required to hash values inside heterogeneous arrays.

See also: [`objectid`](https://docs.julialang.org/#Base.objectid), [`Dict`](https://docs.julialang.org/../collections/#Base.Dict), [`Set`](../collections/#Base.Set).

[source](https://github.com/JuliaLang/julia/blob/17cfb8e65ead377bf1b4598d8a9869144142c84e/base/hashing.jl#L5-L19)
```julia
finalizer(f, x)
```
Register a function `f(x)` to be called when there are no program-accessible references to `x`, and return `x`. The type of `x` must be a `mutable struct`, otherwise the behavior of this function is unpredictable.

`f` must not cause a task switch, which excludes most I/O operations such as `println`. Using the `@async` macro (to defer context switching to outside of the finalizer) or `ccall` to directly invoke IO functions in C may be helpful for debugging purposes.

**Examples**


```julia
finalizer(my_mutable_struct) do x
    @async println("Finalizing $x.")
end

finalizer(my_mutable_struct) do x
    ccall(:jl_safe_printf, Cvoid, (Cstring, Cstring), "Finalizing %s.", repr(x))
end
```
A finalizer may be registered at object construction. In the following example note that we implicitly rely on the finalizer returning the newly created mutable struct `x`.

**Example**


```julia
mutable struct MyMutableStruct
    bar
    function MyMutableStruct(bar)
        x = new(bar)
        f(t) = @async println("Finalizing $t.")
        finalizer(f, x)
    end
end
```
[source](https://github.com/JuliaLang/julia/blob/17cfb8e65ead377bf1b4598d8a9869144142c84e/base/gcutils.jl#L7-L43)
```julia
finalize(x)
```
Immediately run finalizers registered for object `x`.

[source](https://github.com/JuliaLang/julia/blob/17cfb8e65ead377bf1b4598d8a9869144142c84e/base/gcutils.jl#L62-L66)
```julia
copy(x)
```
Create a shallow copy of `x`: the outer structure is copied, but not all internal values. For example, copying an array produces a new array with identically-same elements as the original.

See also [`copy!`](https://docs.julialang.org/../arrays/#Base.copy!), [`copyto!`](../c/#Base.copyto!).

[source](https://github.com/JuliaLang/julia/blob/17cfb8e65ead377bf1b4598d8a9869144142c84e/base/array.jl#L358-L366)
```julia
deepcopy(x)
```
Create a deep copy of `x`: everything is copied recursively, resulting in a fully independent object. For example, deep-copying an array produces a new array whose elements are deep copies of the original elements. Calling `deepcopy` on an object should generally have the same effect as serializing and then deserializing it.

While it isn't normally necessary, user-defined types can override the default `deepcopy` behavior by defining a specialized version of the function `deepcopy_internal(x::T, dict::IdDict)` (which shouldn't otherwise be used), where `T` is the type to be specialized for, and `dict` keeps track of objects copied so far within the recursion. Within the definition, `deepcopy_internal` should be used in place of `deepcopy`, and the `dict` variable should be updated as appropriate before returning.

[source](https://github.com/JuliaLang/julia/blob/17cfb8e65ead377bf1b4598d8a9869144142c84e/base/deepcopy.jl#L8-L23)
```julia
getproperty(value, name::Symbol)
getproperty(value, name::Symbol, order::Symbol)
```
The syntax `a.b` calls `getproperty(a, :b)`. The syntax `@atomic order a.b` calls `getproperty(a, :b, :order)` and the syntax `@atomic a.b` calls `getproperty(a, :b, :sequentially_consistent)`.

**Examples**


```julia
julia> struct MyType
           x
       end

julia> function Base.getproperty(obj::MyType, sym::Symbol)
           if sym === :special
               return obj.x + 1
           else # fallback to getfield
               return getfield(obj, sym)
           end
       end

julia> obj = MyType(1);

julia> obj.special
2

julia> obj.x
1
```
See also [`getfield`](https://docs.julialang.org/#Core.getfield), [`propertynames`](https://docs.julialang.org/#Base.propertynames) and [`setproperty!`](#Base.setproperty!).

[source](https://github.com/JuliaLang/julia/blob/17cfb8e65ead377bf1b4598d8a9869144142c84e/base/docs/basedocs.jl#L2689-L2723)
```julia
setproperty!(value, name::Symbol, x)
setproperty!(value, name::Symbol, x, order::Symbol)
```
The syntax `a.b = c` calls `setproperty!(a, :b, c)`. The syntax `@atomic order a.b = c` calls `setproperty!(a, :b, c, :order)` and the syntax `@atomic a.b = c` calls `getproperty(a, :b, :sequentially_consistent)`.

See also [`setfield!`](https://docs.julialang.org/#Core.setfield!), [`propertynames`](https://docs.julialang.org/#Base.propertynames) and [`getproperty`](#Base.getproperty).

[source](https://github.com/JuliaLang/julia/blob/17cfb8e65ead377bf1b4598d8a9869144142c84e/base/docs/basedocs.jl#L2726-L2737)
```julia
propertynames(x, private=false)
```
Get a tuple or a vector of the properties (`x.property`) of an object `x`. This is typically the same as [`fieldnames(typeof(x))`](https://docs.julialang.org/#Base.fieldnames), but types that overload [`getproperty`](https://docs.julialang.org/#Base.getproperty) should generally overload `propertynames` as well to get the properties of an instance of the type.

`propertynames(x)` may return only "public" property names that are part of the documented interface of `x`. If you want it to also return "private" fieldnames intended for internal use, pass `true` for the optional second argument. REPL tab completion on `x.` shows only the `private=false` properties.

See also: [`hasproperty`](https://docs.julialang.org/#Base.hasproperty), [`hasfield`](#Base.hasfield).

[source](https://github.com/JuliaLang/julia/blob/17cfb8e65ead377bf1b4598d8a9869144142c84e/base/reflection.jl#L1736-L1750)
```julia
hasproperty(x, s::Symbol)
```
Return a boolean indicating whether the object `x` has `s` as one of its own properties.

This function requires at least Julia 1.2.

See also: [`propertynames`](https://docs.julialang.org/#Base.propertynames), [`hasfield`](#Base.hasfield).

[source](https://github.com/JuliaLang/julia/blob/17cfb8e65ead377bf1b4598d8a9869144142c84e/base/reflection.jl#L1755-L1764)
```julia
getfield(value, name::Symbol, [order::Symbol])
getfield(value, i::Int, [order::Symbol])
```
Extract a field from a composite `value` by name or position. Optionally, an ordering can be defined for the operation. If the field was declared `@atomic`, the specification is strongly recommended to be compatible with the stores to that location. Otherwise, if not declared as `@atomic`, this parameter must be `:not_atomic` if specified. See also [`getproperty`](https://docs.julialang.org/#Base.getproperty) and [`fieldnames`](https://docs.julialang.org/#Base.fieldnames).

**Examples**


```julia
julia> a = 1//2
1//2

julia> getfield(a, :num)
1

julia> a.num
1

julia> getfield(a, 1)
1
```
[source](https://github.com/JuliaLang/julia/blob/17cfb8e65ead377bf1b4598d8a9869144142c84e/base/docs/basedocs.jl#L1943-L1968)
```julia
setfield!(value, name::Symbol, x, [order::Symbol])
setfield!(value, i::Int, x, [order::Symbol])
```
Assign `x` to a named field in `value` of composite type. The `value` must be mutable and `x` must be a subtype of `fieldtype(typeof(value), name)`. Additionally, an ordering can be specified for this operation. If the field was declared `@atomic`, this specification is mandatory. Otherwise, if not declared as `@atomic`, it must be `:not_atomic` if specified. See also [`setproperty!`](https://docs.julialang.org/#Base.setproperty!).

**Examples**


```julia
julia> mutable struct MyMutableStruct
           field::Int
       end

julia> a = MyMutableStruct(1);

julia> setfield!(a, :field, 2);

julia> getfield(a, :field)
2

julia> a = 1//2
1//2

julia> setfield!(a, :num, 3);
ERROR: setfield!: immutable struct of type Rational cannot be changed
```
[source](https://github.com/JuliaLang/julia/blob/17cfb8e65ead377bf1b4598d8a9869144142c84e/base/docs/basedocs.jl#L1971-L2001)
```julia
isdefined(m::Module, s::Symbol, [order::Symbol])
isdefined(object, s::Symbol, [order::Symbol])
isdefined(object, index::Int, [order::Symbol])
```
Tests whether a global variable or object field is defined. The arguments can be a module and a symbol or a composite object and field name (as a symbol) or index. Optionally, an ordering can be defined for the operation. If the field was declared `@atomic`, the specification is strongly recommended to be compatible with the stores to that location. Otherwise, if not declared as `@atomic`, this parameter must be `:not_atomic` if specified.

To test whether an array element is defined, use [`isassigned`](https://docs.julialang.org/../arrays/#Base.isassigned) instead.

See also [`@isdefined`](https://docs.julialang.org/#Base.@isdefined).

**Examples**


```julia
julia> isdefined(Base, :sum)
true

julia> isdefined(Base, :NonExistentMethod)
false

julia> a = 1//2;

julia> isdefined(a, 2)
true

julia> isdefined(a, 3)
false

julia> isdefined(a, :num)
true

julia> isdefined(a, :numerator)
false
```
[source](https://github.com/JuliaLang/julia/blob/17cfb8e65ead377bf1b4598d8a9869144142c84e/base/docs/basedocs.jl#L2076-L2114)
```julia
@isdefined s -> Bool
```
Tests whether variable `s` is defined in the current scope.

See also [`isdefined`](https://docs.julialang.org/#Core.isdefined) for field properties and [`isassigned`](https://docs.julialang.org/../arrays/#Base.isassigned) for array indexes or [`haskey`](https://docs.julialang.org/../collections/#Base.haskey) for other mappings.

**Examples**


```julia
julia> @isdefined newvar
false

julia> newvar = 1
1

julia> @isdefined newvar
true

julia> function f()
           println(@isdefined x)
           x = 3
           println(@isdefined x)
       end
f (generic function with 1 method)

julia> f()
false
true
```
[source](https://github.com/JuliaLang/julia/blob/17cfb8e65ead377bf1b4598d8a9869144142c84e/base/essentials.jl#L119-L149)
```julia
convert(T, x)
```
Convert `x` to a value of type `T`.

If `T` is an [`Integer`](https://docs.julialang.org/../numbers/#Core.Integer) type, an [`InexactError`](https://docs.julialang.org/#Core.InexactError) will be raised if `x` is not representable by `T`, for example if `x` is not integer-valued, or is outside the range supported by `T`.

**Examples**


```julia
julia> convert(Int, 3.0)
3

julia> convert(Int, 3.5)
ERROR: InexactError: Int64(3.5)
Stacktrace:
[...]
```
If `T` is a [`AbstractFloat`](https://docs.julialang.org/../numbers/#Core.AbstractFloat) type, then it will return the closest value to `x` representable by `T`.


```julia
julia> x = 1/3
0.3333333333333333

julia> convert(Float32, x)
0.33333334f0

julia> convert(BigFloat, x)
0.333333333333333314829616256247390992939472198486328125
```
If `T` is a collection type and `x` a collection, the result of `convert(T, x)` may alias all or part of `x`.


```julia
julia> x = Int[1, 2, 3];

julia> y = convert(Vector{Int}, x);

julia> y === x
true
```
See also: [`round`](https://docs.julialang.org/../math/#Base.round-Tuple%7BType,%20Any%7D), [`trunc`](https://docs.julialang.org/../math/#Base.trunc), [`oftype`](https://docs.julialang.org/#Base.oftype), [`reinterpret`](../arrays/#Base.reinterpret).

[source](https://github.com/JuliaLang/julia/blob/17cfb8e65ead377bf1b4598d8a9869144142c84e/base/essentials.jl#L164-L210)
```julia
promote(xs...)
```
Convert all arguments to a common type, and return them all (as a tuple). If no arguments can be converted, an error is raised.

See also: [`promote_type`], [`promote_rule`].

**Examples**


```julia
julia> promote(Int8(1), Float16(4.5), Float32(4.1))
(1.0f0, 4.5f0, 4.1f0)
```
[source](https://github.com/JuliaLang/julia/blob/17cfb8e65ead377bf1b4598d8a9869144142c84e/base/promotion.jl#L317-L330)
```julia
oftype(x, y)
```
Convert `y` to the type of `x` (`convert(typeof(x), y)`).

**Examples**


```julia
julia> x = 4;

julia> y = 3.;

julia> oftype(x, y)
3

julia> oftype(y, x)
4.0
```
[source](https://github.com/JuliaLang/julia/blob/17cfb8e65ead377bf1b4598d8a9869144142c84e/base/essentials.jl#L373-L390)
```julia
widen(x)
```
If `x` is a type, return a "larger" type, defined so that arithmetic operations `+` and `-` are guaranteed not to overflow nor lose precision for any combination of values that type `x` can hold.

For fixed-size integer types less than 128 bits, `widen` will return a type with twice the number of bits.

If `x` is a value, it is converted to `widen(typeof(x))`.

**Examples**


```julia
julia> widen(Int32)
Int64

julia> widen(1.5f0)
1.5
```
[source](https://github.com/JuliaLang/julia/blob/17cfb8e65ead377bf1b4598d8a9869144142c84e/base/operators.jl#L874-L894)
```julia
identity(x)
```
The identity function. Returns its argument.

See also: [`one`](https://docs.julialang.org/../numbers/#Base.one), [`oneunit`](https://docs.julialang.org/../numbers/#Base.oneunit), and [`LinearAlgebra`](https://docs.julialang.org/../../stdlib/LinearAlgebra/#man-linalg)'s `I`.

**Examples**


```julia
julia> identity("Well, what did you expect?")
"Well, what did you expect?"
```
[source](https://github.com/JuliaLang/julia/blob/17cfb8e65ead377bf1b4598d8a9869144142c84e/base/operators.jl#L513-L525)
```julia
supertype(T::DataType)
```
Return the supertype of DataType `T`.

**Examples**


```julia
julia> supertype(Int32)
Signed
```
[source](https://github.com/JuliaLang/julia/blob/17cfb8e65ead377bf1b4598d8a9869144142c84e/base/operators.jl#L32-L42)
```julia
Core.Type{T}
```
`Core.Type` is an abstract type which has all type objects as its instances. The only instance of the singleton type `Core.Type{T}` is the object `T`.

**Examples**


```julia
julia> isa(Type{Float64}, Type)
true

julia> isa(Float64, Type)
true

julia> isa(Real, Type{Float64})
false

julia> isa(Real, Type{Real})
true
```
[source](https://github.com/JuliaLang/julia/blob/17cfb8e65ead377bf1b4598d8a9869144142c84e/base/docs/basedocs.jl#L1306-L1327)
```julia
DataType <: Type{T}
```
`DataType` represents explicitly declared types that have names, explicitly declared supertypes, and, optionally, parameters. Every concrete value in the system is an instance of some `DataType`.

**Examples**


```julia
julia> typeof(Real)
DataType

julia> typeof(Int)
DataType

julia> struct Point
           x::Int
           y
       end

julia> typeof(Point)
DataType
```
[source](https://github.com/JuliaLang/julia/blob/17cfb8e65ead377bf1b4598d8a9869144142c84e/base/docs/basedocs.jl#L1330-L1353)
```julia
<:(T1, T2)
```
Subtype operator: returns `true` if and only if all values of type `T1` are also of type `T2`.

**Examples**


```julia
julia> Float64 <: AbstractFloat
true

julia> Vector{Int} <: AbstractArray
true

julia> Matrix{Float64} <: Matrix{AbstractFloat}
false
```
[source](https://github.com/JuliaLang/julia/blob/17cfb8e65ead377bf1b4598d8a9869144142c84e/base/operators.jl#L5-L22)
```julia
>:(T1, T2)
```
Supertype operator, equivalent to `T2 <: T1`.

[source](https://github.com/JuliaLang/julia/blob/17cfb8e65ead377bf1b4598d8a9869144142c84e/base/operators.jl#L25-L29)
```julia
typejoin(T, S)
```
Return the closest common ancestor of `T` and `S`, i.e. the narrowest type from which they both inherit.

[source](https://github.com/JuliaLang/julia/blob/17cfb8e65ead377bf1b4598d8a9869144142c84e/base/promotion.jl#L5-L10)
```julia
typeintersect(T::Type, S::Type)
```
Compute a type that contains the intersection of `T` and `S`. Usually this will be the smallest such type or one close to it.

[source](https://github.com/JuliaLang/julia/blob/17cfb8e65ead377bf1b4598d8a9869144142c84e/base/reflection.jl#L677-L682)
```julia
promote_type(type1, type2)
```
Promotion refers to converting values of mixed types to a single common type. `promote_type` represents the default promotion behavior in Julia when operators (usually mathematical) are given arguments of differing types. `promote_type` generally tries to return a type which can at least approximate most values of either input type without excessively widening. Some loss is tolerated; for example, `promote_type(Int64, Float64)` returns [`Float64`](https://docs.julialang.org/../numbers/#Core.Float64) even though strictly, not all [`Int64`](https://docs.julialang.org/../numbers/#Core.Int64) values can be represented exactly as `Float64` values.

See also: [`promote`](https://docs.julialang.org/#Base.promote), [`promote_typejoin`](https://docs.julialang.org/#Base.promote_typejoin), [`promote_rule`](https://docs.julialang.org/#Base.promote_rule).

**Examples**


```julia
julia> promote_type(Int64, Float64)
Float64

julia> promote_type(Int32, Int64)
Int64

julia> promote_type(Float32, BigInt)
BigFloat

julia> promote_type(Int16, Float16)
Float16

julia> promote_type(Int64, Float16)
Float16

julia> promote_type(Int8, UInt16)
UInt16
```
To overload promotion for your own types you should overload [`promote_rule`](https://docs.julialang.org/#Base.promote_rule). `promote_type` calls `promote_rule` internally to determine the type. Overloading `promote_type` directly can cause ambiguity errors.

[source](https://github.com/JuliaLang/julia/blob/17cfb8e65ead377bf1b4598d8a9869144142c84e/base/promotion.jl#L240-L279)
```julia
promote_rule(type1, type2)
```
Specifies what type should be used by [`promote`](https://docs.julialang.org/#Base.promote) when given values of types `type1` and `type2`. This function should not be called directly, but should have definitions added to it for new types as appropriate.

[source](https://github.com/JuliaLang/julia/blob/17cfb8e65ead377bf1b4598d8a9869144142c84e/base/promotion.jl#L301-L307)
```julia
promote_typejoin(T, S)
```
Compute a type that contains both `T` and `S`, which could be either a parent of both types, or a `Union` if appropriate. Falls back to [`typejoin`](https://docs.julialang.org/#Base.typejoin).

See instead [`promote`](https://docs.julialang.org/#Base.promote), [`promote_type`](https://docs.julialang.org/#Base.promote_type).

**Examples**


```julia
julia> Base.promote_typejoin(Int, Float64)
Real

julia> Base.promote_type(Int, Float64)
Float64
```
[source](https://github.com/JuliaLang/julia/blob/17cfb8e65ead377bf1b4598d8a9869144142c84e/base/promotion.jl#L143-L160)
```julia
isdispatchtuple(T)
```
Determine whether type `T` is a tuple "leaf type", meaning it could appear as a type signature in dispatch and has no subtypes (or supertypes) which could appear in a call.

[source](https://github.com/JuliaLang/julia/blob/17cfb8e65ead377bf1b4598d8a9869144142c84e/base/reflection.jl#L595-L601)
```julia
ismutable(v) -> Bool
```
Return `true` if and only if value `v` is mutable. See [Mutable Composite Types](https://docs.julialang.org/../../manual/types/#Mutable-Composite-Types) for a discussion of immutability. Note that this function works on values, so if you give it a type, it will tell you that a value of `DataType` is mutable.

See also [`isbits`](https://docs.julialang.org/#Base.isbits), [`isstructtype`](https://docs.julialang.org/#Base.isstructtype).

**Examples**


```julia
julia> ismutable(1)
false

julia> ismutable([1,2])
true
```
This function requires at least Julia 1.5.

[source](https://github.com/JuliaLang/julia/blob/17cfb8e65ead377bf1b4598d8a9869144142c84e/base/reflection.jl#L493-L513)
```julia
isimmutable(v) -> Bool
```
Consider using `!ismutable(v)` instead, as `isimmutable(v)` will be replaced by `!ismutable(v)` in a future release. (Since Julia 1.5)

Return `true` iff value `v` is immutable. See [Mutable Composite Types](https://docs.julialang.org/../../manual/types/#Mutable-Composite-Types) for a discussion of immutability. Note that this function works on values, so if you give it a type, it will tell you that a value of `DataType` is mutable.

**Examples**


```julia
julia> isimmutable(1)
true

julia> isimmutable([1,2])
false
```
[source](https://github.com/JuliaLang/julia/blob/17cfb8e65ead377bf1b4598d8a9869144142c84e/base/deprecated.jl#L188-L204)
```julia
isabstracttype(T)
```
Determine whether type `T` was declared as an abstract type (i.e. using the `abstract` keyword).

**Examples**


```julia
julia> isabstracttype(AbstractArray)
true

julia> isabstracttype(Vector)
false
```
[source](https://github.com/JuliaLang/julia/blob/17cfb8e65ead377bf1b4598d8a9869144142c84e/base/reflection.jl#L647-L661)
```julia
isprimitivetype(T) -> Bool
```
Determine whether type `T` was declared as a primitive type (i.e. using the `primitive` keyword).

[source](https://github.com/JuliaLang/julia/blob/17cfb8e65ead377bf1b4598d8a9869144142c84e/base/reflection.jl#L548-L553)
```julia
Base.issingletontype(T)
```
Determine whether type `T` has exactly one possible instance; for example, a struct type with no fields.

[source](https://github.com/JuliaLang/julia/blob/17cfb8e65ead377bf1b4598d8a9869144142c84e/base/reflection.jl#L669-L674)
```julia
isstructtype(T) -> Bool
```
Determine whether type `T` was declared as a struct type (i.e. using the `struct` or `mutable struct` keyword).

[source](https://github.com/JuliaLang/julia/blob/17cfb8e65ead377bf1b4598d8a9869144142c84e/base/reflection.jl#L533-L538)
```julia
nameof(t::DataType) -> Symbol
```
Get the name of a (potentially `UnionAll`-wrapped) `DataType` (without its parent module) as a symbol.

**Examples**


```julia
julia> module Foo
           struct S{T}
           end
       end
Foo

julia> nameof(Foo.S{T} where T)
:S
```
[source](https://github.com/JuliaLang/julia/blob/17cfb8e65ead377bf1b4598d8a9869144142c84e/base/reflection.jl#L220-L237)
```julia
fieldnames(x::DataType)
```
Get a tuple with the names of the fields of a `DataType`.

See also [`propertynames`](https://docs.julialang.org/#Base.propertynames), [`hasfield`](https://docs.julialang.org/#Base.hasfield).

**Examples**


```julia
julia> fieldnames(Rational)
(:num, :den)

julia> fieldnames(typeof(1+im))
(:re, :im)
```
[source](https://github.com/JuliaLang/julia/blob/17cfb8e65ead377bf1b4598d8a9869144142c84e/base/reflection.jl#L169-L184)
```julia
fieldname(x::DataType, i::Integer)
```
Get the name of field `i` of a `DataType`.

**Examples**


```julia
julia> fieldname(Rational, 1)
:num

julia> fieldname(Rational, 2)
:den
```
[source](https://github.com/JuliaLang/julia/blob/17cfb8e65ead377bf1b4598d8a9869144142c84e/base/reflection.jl#L135-L148)
```julia
fieldtype(T, name::Symbol | index::Int)
```
Determine the declared type of a field (specified by name or index) in a composite DataType `T`.

**Examples**


```julia
julia> struct Foo
           x::Int64
           y::String
       end

julia> fieldtype(Foo, :x)
Int64

julia> fieldtype(Foo, 2)
String
```
[source](https://github.com/JuliaLang/julia/blob/17cfb8e65ead377bf1b4598d8a9869144142c84e/base/reflection.jl#L715-L733)
```julia
fieldtypes(T::Type)
```
The declared types of all fields in a composite DataType `T` as a tuple.

This function requires at least Julia 1.1.

**Examples**


```julia
julia> struct Foo
           x::Int64
           y::String
       end

julia> fieldtypes(Foo)
(Int64, String)
```
[source](https://github.com/JuliaLang/julia/blob/17cfb8e65ead377bf1b4598d8a9869144142c84e/base/reflection.jl#L812-L830)
```julia
fieldcount(t::Type)
```
Get the number of fields that an instance of the given type would have. An error is thrown if the type is too abstract to determine this.

[source](https://github.com/JuliaLang/julia/blob/17cfb8e65ead377bf1b4598d8a9869144142c84e/base/reflection.jl#L772-L777)
```julia
hasfield(T::Type, name::Symbol)
```
Return a boolean indicating whether `T` has `name` as one of its own fields.

See also [`fieldnames`](https://docs.julialang.org/#Base.fieldnames), [`fieldcount`](https://docs.julialang.org/#Base.fieldcount), [`hasproperty`](https://docs.julialang.org/#Base.hasproperty).

This function requires at least Julia 1.2.

**Examples**


```julia
julia> struct Foo
            bar::Int
       end

julia> hasfield(Foo, :bar)
true

julia> hasfield(Foo, :x)
false
```
[source](https://github.com/JuliaLang/julia/blob/17cfb8e65ead377bf1b4598d8a9869144142c84e/base/reflection.jl#L192-L214)
```julia
nfields(x) -> Int
```
Get the number of fields in the given object.

**Examples**


```julia
julia> a = 1//2;

julia> nfields(a)
2

julia> b = 1
1

julia> nfields(b)
0

julia> ex = ErrorException("I've done a bad thing");

julia> nfields(ex)
1
```
In these examples, `a` is a [`Rational`](https://docs.julialang.org/../numbers/#Base.Rational), which has two fields. `b` is an `Int`, which is a primitive bitstype with no fields at all. `ex` is an [`ErrorException`](https://docs.julialang.org/#Core.ErrorException), which has one field.

[source](https://github.com/JuliaLang/julia/blob/17cfb8e65ead377bf1b4598d8a9869144142c84e/base/docs/basedocs.jl#L1559-L1586)
```julia
isconst(m::Module, s::Symbol) -> Bool
```
Determine whether a global is declared `const` in a given module `m`.

[source](https://github.com/JuliaLang/julia/blob/17cfb8e65ead377bf1b4598d8a9869144142c84e/base/reflection.jl#L263-L267)
```julia
isconst(t::DataType, s::Union{Int,Symbol}) -> Bool
```
Determine whether a field `s` is declared `const` in a given type `t`.

[source](https://github.com/JuliaLang/julia/blob/17cfb8e65ead377bf1b4598d8a9869144142c84e/base/reflection.jl#L271-L275)
```julia
sizeof(T::DataType)
sizeof(obj)
```
Size, in bytes, of the canonical binary representation of the given `DataType` `T`, if any. Or the size, in bytes, of object `obj` if it is not a `DataType`.

See also [`summarysize`](https://docs.julialang.org/#Base.summarysize).

**Examples**


```julia
julia> sizeof(Float32)
4

julia> sizeof(ComplexF64)
16

julia> sizeof(1.0)
8

julia> sizeof(collect(1.0:10.0))
80
```
If `DataType` `T` does not have a specific size, an error is thrown.


```julia
julia> sizeof(AbstractArray)
ERROR: Abstract type AbstractArray does not have a definite size.
Stacktrace:
[...]
```
[source](https://github.com/JuliaLang/julia/blob/17cfb8e65ead377bf1b4598d8a9869144142c84e/base/essentials.jl#L440-L472)
```julia
isconcretetype(T)
```
Determine whether type `T` is a concrete type, meaning it could have direct instances (values `x` such that `typeof(x) === T`).

See also: [`isbits`](https://docs.julialang.org/#Base.isbits), [`isabstracttype`](https://docs.julialang.org/#Base.isabstracttype), [`issingletontype`](https://docs.julialang.org/#Base.issingletontype).

**Examples**


```julia
julia> isconcretetype(Complex)
false

julia> isconcretetype(Complex{Float32})
true

julia> isconcretetype(Vector{Complex})
true

julia> isconcretetype(Vector{Complex{Float32}})
true

julia> isconcretetype(Union{})
false

julia> isconcretetype(Union{Int,String})
false
```
[source](https://github.com/JuliaLang/julia/blob/17cfb8e65ead377bf1b4598d8a9869144142c84e/base/reflection.jl#L616-L644)
```julia
isbitstype(T)
```
Return `true` if type `T` is a "plain data" type, meaning it is immutable and contains no references to other values, only `primitive` types and other `isbitstype` types. Typical examples are numeric types such as [`UInt8`](https://docs.julialang.org/../numbers/#Core.UInt8), [`Float64`](https://docs.julialang.org/../numbers/#Core.Float64), and [`Complex{Float64}`](https://docs.julialang.org/../numbers/#Base.Complex). This category of types is significant since they are valid as type parameters, may not track [`isdefined`](https://docs.julialang.org/#Core.isdefined) / [`isassigned`](https://docs.julialang.org/../arrays/#Base.isassigned) status, and have a defined layout that is compatible with C.

See also [`isbits`](https://docs.julialang.org/#Base.isbits), [`isprimitivetype`](https://docs.julialang.org/#Base.isprimitivetype), [`ismutable`](https://docs.julialang.org/#Base.ismutable).

**Examples**


```julia
julia> isbitstype(Complex{Float64})
true

julia> isbitstype(Complex)
false
```
[source](https://github.com/JuliaLang/julia/blob/17cfb8e65ead377bf1b4598d8a9869144142c84e/base/reflection.jl#L563-L585)
```julia
fieldoffset(type, i)
```
The byte offset of field `i` of a type relative to the data start. For example, we could use it in the following manner to summarize information about a struct:


```julia
julia> structinfo(T) = [(fieldoffset(T,i), fieldname(T,i), fieldtype(T,i)) for i = 1:fieldcount(T)];

julia> structinfo(Base.Filesystem.StatStruct)
13-element Vector{Tuple{UInt64, Symbol, Type}}:
 (0x0000000000000000, :desc, Union{RawFD, String})
 (0x0000000000000008, :device, UInt64)
 (0x0000000000000010, :inode, UInt64)
 (0x0000000000000018, :mode, UInt64)
 (0x0000000000000020, :nlink, Int64)
 (0x0000000000000028, :uid, UInt64)
 (0x0000000000000030, :gid, UInt64)
 (0x0000000000000038, :rdev, UInt64)
 (0x0000000000000040, :size, Int64)
 (0x0000000000000048, :blksize, Int64)
 (0x0000000000000050, :blocks, Int64)
 (0x0000000000000058, :mtime, Float64)
 (0x0000000000000060, :ctime, Float64)
```
[source](https://github.com/JuliaLang/julia/blob/17cfb8e65ead377bf1b4598d8a9869144142c84e/base/reflection.jl#L687-L712)
```julia
Base.datatype_alignment(dt::DataType) -> Int
```
Memory allocation minimum alignment for instances of this type. Can be called on any `isconcretetype`.

[source](https://github.com/JuliaLang/julia/blob/17cfb8e65ead377bf1b4598d8a9869144142c84e/base/reflection.jl#L356-L361)
```julia
Base.datatype_haspadding(dt::DataType) -> Bool
```
Return whether the fields of instances of this type are packed in memory, with no intervening padding bytes. Can be called on any `isconcretetype`.

[source](https://github.com/JuliaLang/julia/blob/17cfb8e65ead377bf1b4598d8a9869144142c84e/base/reflection.jl#L395-L401)
```julia
Base.datatype_pointerfree(dt::DataType) -> Bool
```
Return whether instances of this type can contain references to gc-managed memory. Can be called on any `isconcretetype`.

[source](https://github.com/JuliaLang/julia/blob/17cfb8e65ead377bf1b4598d8a9869144142c84e/base/reflection.jl#L421-L426)
```julia
typemin(T)
```
The lowest value representable by the given (real) numeric DataType `T`.

**Examples**


```julia
julia> typemin(Float16)
-Inf16

julia> typemin(Float32)
-Inf32
```
[source](https://github.com/JuliaLang/julia/blob/17cfb8e65ead377bf1b4598d8a9869144142c84e/base/int.jl#L742-L755)
```julia
typemax(T)
```
The highest value representable by the given (real) numeric `DataType`.

See also: [`floatmax`](https://docs.julialang.org/#Base.floatmax), [`typemin`](https://docs.julialang.org/#Base.typemin), [`eps`](https://docs.julialang.org/#Base.eps-Tuple%7BType%7B<:AbstractFloat%7D%7D).

**Examples**


```julia
julia> typemax(Int8)
127

julia> typemax(UInt32)
0xffffffff

julia> typemax(Float64)
Inf

julia> floatmax(Float32)  # largest finite floating point number
3.4028235f38
```
[source](https://github.com/JuliaLang/julia/blob/17cfb8e65ead377bf1b4598d8a9869144142c84e/base/int.jl#L758-L779)
```julia
floatmin(T = Float64)
```
Return the smallest positive normal number representable by the floating-point type `T`.

**Examples**


```julia
julia> floatmin(Float16)
Float16(6.104e-5)

julia> floatmin(Float32)
1.1754944f-38

julia> floatmin()
2.2250738585072014e-308
```
[source](https://github.com/JuliaLang/julia/blob/17cfb8e65ead377bf1b4598d8a9869144142c84e/base/float.jl#L834-L851)
```julia
floatmax(T = Float64)
```
Return the largest finite number representable by the floating-point type `T`.

See also: [`typemax`](https://docs.julialang.org/#Base.typemax), [`floatmin`](https://docs.julialang.org/#Base.floatmin), [`eps`](https://docs.julialang.org/#Base.eps-Tuple%7BType%7B<:AbstractFloat%7D%7D).

**Examples**


```julia
julia> floatmax(Float16)
Float16(6.55e4)

julia> floatmax(Float32)
3.4028235f38

julia> floatmax()
1.7976931348623157e308

julia> typemax(Float64)
Inf
```
[source](https://github.com/JuliaLang/julia/blob/17cfb8e65ead377bf1b4598d8a9869144142c84e/base/float.jl#L854-L875)
```julia
maxintfloat(T=Float64)
```
The largest consecutive integer-valued floating-point number that is exactly represented in the given floating-point type `T` (which defaults to `Float64`).

That is, `maxintfloat` returns the smallest positive integer-valued floating-point number `n` such that `n+1` is *not* exactly representable in the type `T`.

When an `Integer`-type value is needed, use `Integer(maxintfloat(T))`.

[source](https://github.com/JuliaLang/julia/blob/17cfb8e65ead377bf1b4598d8a9869144142c84e/base/floatfuncs.jl#L19-L29)
```julia
maxintfloat(T, S)
```
The largest consecutive integer representable in the given floating-point type `T` that also does not exceed the maximum integer representable by the integer type `S`. Equivalently, it is the minimum of `maxintfloat(T)` and [`typemax(S)`](#Base.typemax).

[source](https://github.com/JuliaLang/julia/blob/17cfb8e65ead377bf1b4598d8a9869144142c84e/base/floatfuncs.jl#L35-L41)
```julia
eps(::Type{T}) where T<:AbstractFloat
eps()
```
Return the *machine epsilon* of the floating point type `T` (`T = Float64` by default). This is defined as the gap between 1 and the next largest value representable by `typeof(one(T))`, and is equivalent to `eps(one(T))`. (Since `eps(T)` is a bound on the *relative error* of `T`, it is a "dimensionless" quantity like [`one`](https://docs.julialang.org/../numbers/#Base.one).)

**Examples**


```julia
julia> eps()
2.220446049250313e-16

julia> eps(Float32)
1.1920929f-7

julia> 1.0 + eps()
1.0000000000000002

julia> 1.0 + eps()/2
1.0
```
[source](https://github.com/JuliaLang/julia/blob/17cfb8e65ead377bf1b4598d8a9869144142c84e/base/float.jl#L881-L904)
```julia
eps(x::AbstractFloat)
```
Return the *unit in last place* (ulp) of `x`. This is the distance between consecutive representable floating point values at `x`. In most cases, if the distance on either side of `x` is different, then the larger of the two is taken, that is


```julia
eps(x) == max(x-prevfloat(x), nextfloat(x)-x)
```
The exceptions to this rule are the smallest and largest finite values (e.g. `nextfloat(-Inf)` and `prevfloat(Inf)` for [`Float64`](https://docs.julialang.org/../numbers/#Core.Float64)), which round to the smaller of the values.

The rationale for this behavior is that `eps` bounds the floating point rounding error. Under the default `RoundNearest` rounding mode, if $y$ is a real number and $x$ is the nearest floating point number to $y$, then

[|y-x| leq operatorname{eps}(x)/2.]

See also: [`nextfloat`](https://docs.julialang.org/../numbers/#Base.nextfloat), [`issubnormal`](https://docs.julialang.org/../numbers/#Base.issubnormal), [`floatmax`](https://docs.julialang.org/#Base.floatmax).

**Examples**


```julia
julia> eps(1.0)
2.220446049250313e-16

julia> eps(prevfloat(2.0))
2.220446049250313e-16

julia> eps(2.0)
4.440892098500626e-16

julia> x = prevfloat(Inf)      # largest finite Float64
1.7976931348623157e308

julia> x + eps(x)/2            # rounds up
Inf

julia> x + prevfloat(eps(x)/2) # rounds down
1.7976931348623157e308
```
[source](https://github.com/JuliaLang/julia/blob/17cfb8e65ead377bf1b4598d8a9869144142c84e/base/float.jl#L907-L950)
```julia
instances(T::Type)
```
Return a collection of all instances of the given type, if applicable. Mostly used for enumerated types (see `@enum`).

**Example**


```julia
julia> @enum Color red blue green

julia> instances(Color)
(red, blue, green)
```
[source](https://github.com/JuliaLang/julia/blob/17cfb8e65ead377bf1b4598d8a9869144142c84e/base/reflection.jl#L835-L848)
```julia
Any::DataType
```
`Any` is the union of all types. It has the defining property `isa(x, Any) == true` for any `x`. `Any` therefore describes the entire universe of possible values. For example `Integer` is a subset of `Any` that includes `Int`, `Int8`, and other integer types.

[source](https://github.com/JuliaLang/julia/blob/17cfb8e65ead377bf1b4598d8a9869144142c84e/base/docs/basedocs.jl#L2491-L2497)
```julia
Union{Types...}
```
A type union is an abstract type which includes all instances of any of its argument types. The empty union [`Union{}`](https://docs.julialang.org/#Union%7B%7D) is the bottom type of Julia.

**Examples**


```julia
julia> IntOrString = Union{Int,AbstractString}
Union{Int64, AbstractString}

julia> 1 :: IntOrString
1

julia> "Hello!" :: IntOrString
"Hello!"

julia> 1.0 :: IntOrString
ERROR: TypeError: in typeassert, expected Union{Int64, AbstractString}, got a value of type Float64
```
[source](https://github.com/JuliaLang/julia/blob/17cfb8e65ead377bf1b4598d8a9869144142c84e/base/docs/basedocs.jl#L2515-L2535)
```julia
Union{}
```
`Union{}`, the empty [`Union`](https://docs.julialang.org/#Core.Union) of types, is the type that has no values. That is, it has the defining property `isa(x, Union{}) == false` for any `x`. `Base.Bottom` is defined as its alias and the type of `Union{}` is `Core.TypeofBottom`.

**Examples**


```julia
julia> isa(nothing, Union{})
false
```
[source](https://github.com/JuliaLang/julia/blob/17cfb8e65ead377bf1b4598d8a9869144142c84e/base/docs/basedocs.jl#L2500-L2512)
```julia
UnionAll
```
A union of types over all values of a type parameter. `UnionAll` is used to describe parametric types where the values of some parameters are not known.

**Examples**


```julia
julia> typeof(Vector)
UnionAll

julia> typeof(Vector{Int})
DataType
```
[source](https://github.com/JuliaLang/julia/blob/17cfb8e65ead377bf1b4598d8a9869144142c84e/base/docs/basedocs.jl#L2539-L2553)
```julia
Tuple{Types...}
```
Tuples are an abstraction of the arguments of a function – without the function itself. The salient aspects of a function's arguments are their order and their types. Therefore a tuple type is similar to a parameterized immutable type where each parameter is the type of one field. Tuple types may have any number of parameters.

Tuple types are covariant in their parameters: `Tuple{Int}` is a subtype of `Tuple{Any}`. Therefore `Tuple{Any}` is considered an abstract type, and tuple types are only concrete if their parameters are. Tuples do not have field names; fields are only accessed by index.

See the manual section on [Tuple Types](https://docs.julialang.org/../../manual/types/#Tuple-Types).

See also [`Vararg`](https://docs.julialang.org/#Core.Vararg), [`NTuple`](https://docs.julialang.org/#Core.NTuple), [`tuple`](https://docs.julialang.org/#Core.tuple), [`NamedTuple`](#Core.NamedTuple).

[source](https://github.com/JuliaLang/julia/blob/17cfb8e65ead377bf1b4598d8a9869144142c84e/base/docs/basedocs.jl#L2622-L2636)
```julia
NTuple{N, T}
```
A compact way of representing the type for a tuple of length `N` where all elements are of type `T`.

**Examples**


```julia
julia> isa((1, 2, 3, 4, 5, 6), NTuple{6, Int})
true
```
[source](https://github.com/JuliaLang/julia/blob/17cfb8e65ead377bf1b4598d8a9869144142c84e/base/tuple.jl#L4-L14)
```julia
NamedTuple
```
`NamedTuple`s are, as their name suggests, named [`Tuple`](https://docs.julialang.org/#Core.Tuple)s. That is, they're a tuple-like collection of values, where each entry has a unique name, represented as a [`Symbol`](https://docs.julialang.org/#Core.Symbol). Like `Tuple`s, `NamedTuple`s are immutable; neither the names nor the values can be modified in place after construction.

Accessing the value associated with a name in a named tuple can be done using field access syntax, e.g. `x.a`, or using [`getindex`](https://docs.julialang.org/../collections/#Base.getindex), e.g. `x[:a]` or `x[(:a, :b)]`. A tuple of the names can be obtained using [`keys`](https://docs.julialang.org/../collections/#Base.keys), and a tuple of the values can be obtained using [`values`](https://docs.julialang.org/../collections/#Base.values).

Iteration over `NamedTuple`s produces the *values* without the names. (See example below.) To iterate over the name-value pairs, use the [`pairs`](https://docs.julialang.org/../collections/#Base.pairs) function.

The [`@NamedTuple`](https://docs.julialang.org/#Base.@NamedTuple) macro can be used for conveniently declaring `NamedTuple` types.

**Examples**


```julia
julia> x = (a=1, b=2)
(a = 1, b = 2)

julia> x.a
1

julia> x[:a]
1

julia> x[(:a,)]
(a = 1,)

julia> keys(x)
(:a, :b)

julia> values(x)
(1, 2)

julia> collect(x)
2-element Vector{Int64}:
 1
 2

julia> collect(pairs(x))
2-element Vector{Pair{Symbol, Int64}}:
 :a => 1
 :b => 2
```
In a similar fashion as to how one can define keyword arguments programmatically, a named tuple can be created by giving a pair `name::Symbol => value` or splatting an iterator yielding such pairs after a semicolon inside a tuple literal:


```julia
julia> (; :a => 1)
(a = 1,)

julia> keys = (:a, :b, :c); values = (1, 2, 3);

julia> (; zip(keys, values)...)
(a = 1, b = 2, c = 3)
```
As in keyword arguments, identifiers and dot expressions imply names:


```julia
julia> x = 0
0

julia> t = (; x)
(x = 0,)

julia> (; t.x)
(x = 0,)
```
Implicit names from identifiers and dot expressions are available as of Julia 1.5.

Use of `getindex` methods with multiple `Symbol`s is available as of Julia 1.7.

[source](https://github.com/JuliaLang/julia/blob/17cfb8e65ead377bf1b4598d8a9869144142c84e/base/namedtuple.jl#L3-L85)
```julia
@NamedTuple{key1::Type1, key2::Type2, ...}
@NamedTuple begin key1::Type1; key2::Type2; ...; end
```
This macro gives a more convenient syntax for declaring `NamedTuple` types. It returns a `NamedTuple` type with the given keys and types, equivalent to `NamedTuple{(:key1, :key2, ...), Tuple{Type1,Type2,...}}`. If the `::Type` declaration is omitted, it is taken to be `Any`. The `begin ... end` form allows the declarations to be split across multiple lines (similar to a `struct` declaration), but is otherwise equivalent.

For example, the tuple `(a=3.1, b="hello")` has a type `NamedTuple{(:a, :b),Tuple{Float64,String}}`, which can also be declared via `@NamedTuple` as:


```julia
julia> @NamedTuple{a::Float64, b::String}
NamedTuple{(:a, :b), Tuple{Float64, String}}

julia> @NamedTuple begin
           a::Float64
           b::String
       end
NamedTuple{(:a, :b), Tuple{Float64, String}}
```
This macro is available as of Julia 1.5.

[source](https://github.com/JuliaLang/julia/blob/17cfb8e65ead377bf1b4598d8a9869144142c84e/base/namedtuple.jl#L382-L408)
```julia
Val(c)
```
Return `Val{c}()`, which contains no run-time data. Types like this can be used to pass the information between functions through the value `c`, which must be an `isbits` value or a `Symbol`. The intent of this construct is to be able to dispatch on constants directly (at compile time) without having to test the value of the constant at run time.

**Examples**


```julia
julia> f(::Val{true}) = "Good"
f (generic function with 1 method)

julia> f(::Val{false}) = "Bad"
f (generic function with 2 methods)

julia> f(Val(true))
"Good"
```
[source](https://github.com/JuliaLang/julia/blob/17cfb8e65ead377bf1b4598d8a9869144142c84e/base/essentials.jl#L691-L710)
```julia
Vararg{T,N}
```
The last parameter of a tuple type [`Tuple`](https://docs.julialang.org/#Core.Tuple) can be the special value `Vararg`, which denotes any number of trailing elements. `Vararg{T,N}` corresponds to exactly `N` elements of type `T`. Finally `Vararg{T}` corresponds to zero or more elements of type `T`. `Vararg` tuple types are used to represent the arguments accepted by varargs methods (see the section on [Varargs Functions](https://docs.julialang.org/../../manual/functions/#Varargs-Functions) in the manual.)

See also [`NTuple`](https://docs.julialang.org/#Core.NTuple).

**Examples**


```julia
julia> mytupletype = Tuple{AbstractString, Vararg{Int}}
Tuple{AbstractString, Vararg{Int64}}

julia> isa(("1",), mytupletype)
true

julia> isa(("1",1), mytupletype)
true

julia> isa(("1",1,2), mytupletype)
true

julia> isa(("1",1,2,3.0), mytupletype)
false
```
[source](https://github.com/JuliaLang/julia/blob/17cfb8e65ead377bf1b4598d8a9869144142c84e/base/docs/basedocs.jl#L2592-L2619)
```julia
notnothing(x)
```
Throw an error if `x === nothing`, and return `x` if not.

[source](https://github.com/JuliaLang/julia/blob/17cfb8e65ead377bf1b4598d8a9869144142c84e/base/some.jl#L52-L56)
```julia
Some{T}
```
A wrapper type used in `Union{Some{T}, Nothing}` to distinguish between the absence of a value ([`nothing`](https://docs.julialang.org/../constants/#Core.nothing)) and the presence of a `nothing` value (i.e. `Some(nothing)`).

Use [`something`](https://docs.julialang.org/#Base.something) to access the value wrapped by a `Some` object.

[source](https://github.com/JuliaLang/julia/blob/17cfb8e65ead377bf1b4598d8a9869144142c84e/base/some.jl#L3-L10)
```julia
something(x...)
```
Return the first value in the arguments which is not equal to [`nothing`](https://docs.julialang.org/../constants/#Core.nothing), if any. Otherwise throw an error. Arguments of type [`Some`](https://docs.julialang.org/#Base.Some) are unwrapped.

See also [`coalesce`](https://docs.julialang.org/#Base.coalesce), [`skipmissing`](https://docs.julialang.org/#Base.skipmissing), [`@something`](https://docs.julialang.org/#Base.@something).

**Examples**


```julia
julia> something(nothing, 1)
1

julia> something(Some(1), nothing)
1

julia> something(missing, nothing)
missing

julia> something(nothing, nothing)
ERROR: ArgumentError: No value arguments present
```
[source](https://github.com/JuliaLang/julia/blob/17cfb8e65ead377bf1b4598d8a9869144142c84e/base/some.jl#L73-L96)
```julia
@something(x...)
```
Short-circuiting version of [`something`](https://docs.julialang.org/#Base.something).

**Examples**


```julia
julia> f(x) = (println("f($x)"); nothing);

julia> a = 1;

julia> a = @something a f(2) f(3) error("Unable to find default for `a`")
1

julia> b = nothing;

julia> b = @something b f(2) f(3) error("Unable to find default for `b`")
f(2)
f(3)
ERROR: Unable to find default for `b`
[...]

julia> b = @something b f(2) f(3) Some(nothing)
f(2)
f(3)

julia> b === nothing
true
```
This macro is available as of Julia 1.7.

[source](https://github.com/JuliaLang/julia/blob/17cfb8e65ead377bf1b4598d8a9869144142c84e/base/some.jl#L105-L137)
```julia
Enum{T<:Integer}
```
The abstract supertype of all enumerated types defined with [`@enum`](#Base.Enums.@enum).

[source](https://github.com/JuliaLang/julia/blob/17cfb8e65ead377bf1b4598d8a9869144142c84e/base/Enums.jl#L10-L14)
```julia
@enum EnumName[::BaseType] value1[=x] value2[=y]
```
Create an `Enum{BaseType}` subtype with name `EnumName` and enum member values of `value1` and `value2` with optional assigned values of `x` and `y`, respectively. `EnumName` can be used just like other types and enum member values as regular values, such as

**Examples**


```julia
julia> @enum Fruit apple=1 orange=2 kiwi=3

julia> f(x::Fruit) = "I'm a Fruit with value: $(Int(x))"
f (generic function with 1 method)

julia> f(apple)
"I'm a Fruit with value: 1"

julia> Fruit(1)
apple::Fruit = 1
```
Values can also be specified inside a `begin` block, e.g.


```julia
@enum EnumName begin
    value1
    value2
end
```
`BaseType`, which defaults to [`Int32`](https://docs.julialang.org/../numbers/#Core.Int32), must be a primitive subtype of `Integer`. Member values can be converted between the enum type and `BaseType`. `read` and `write` perform these conversions automatically. In case the enum is created with a non-default `BaseType`, `Integer(value1)` will return the integer `value1` with the type `BaseType`.

To list all the instances of an enum use `instances`, e.g.


```julia
julia> instances(Fruit)
(apple, orange, kiwi)
```
[source](https://github.com/JuliaLang/julia/blob/17cfb8e65ead377bf1b4598d8a9869144142c84e/base/Enums.jl#L87-L128)
```julia
Expr(head::Symbol, args...)
```
A type representing compound expressions in parsed julia code (ASTs). Each expression consists of a `head` `Symbol` identifying which kind of expression it is (e.g. a call, for loop, conditional statement, etc.), and subexpressions (e.g. the arguments of a call). The subexpressions are stored in a `Vector{Any}` field called `args`.

See the manual chapter on [Metaprogramming](https://docs.julialang.org/../../manual/metaprogramming/#Metaprogramming) and the developer documentation [Julia ASTs](https://docs.julialang.org/../../devdocs/ast/#Julia-ASTs).

**Examples**


```julia
julia> Expr(:call, :+, 1, 2)
:(1 + 2)

julia> dump(:(a ? b : c))
Expr
  head: Symbol if
  args: Array{Any}((3,))
    1: Symbol a
    2: Symbol b
    3: Symbol c
```
[source](https://github.com/JuliaLang/julia/blob/17cfb8e65ead377bf1b4598d8a9869144142c84e/base/docs/basedocs.jl#L534-L559)
```julia
Symbol
```
The type of object used to represent identifiers in parsed julia code (ASTs). Also often used as a name or label to identify an entity (e.g. as a dictionary key). `Symbol`s can be entered using the `:` quote operator:


```julia
julia> :name
:name

julia> typeof(:name)
Symbol

julia> x = 42
42

julia> eval(:x)
42
```
`Symbol`s can also be constructed from strings or other values by calling the constructor `Symbol(x...)`.

`Symbol`s are immutable and should be compared using `===`. The implementation re-uses the same object for all `Symbol`s with the same name, so comparison tends to be efficient (it can just compare pointers).

Unlike strings, `Symbol`s are "atomic" or "scalar" entities that do not support iteration over characters.

[source](https://github.com/JuliaLang/julia/blob/17cfb8e65ead377bf1b4598d8a9869144142c84e/base/docs/basedocs.jl#L1875-L1903)
```julia
Symbol(x...) -> Symbol
```
Create a [`Symbol`](https://docs.julialang.org/#Core.Symbol) by concatenating the string representations of the arguments together.

**Examples**


```julia
julia> Symbol("my", "name")
:myname

julia> Symbol("day", 4)
:day4
```
[source](https://github.com/JuliaLang/julia/blob/17cfb8e65ead377bf1b4598d8a9869144142c84e/base/docs/basedocs.jl#L1906-L1919)
```julia
Module
```
A `Module` is a separate global variable workspace. See [`module`](https://docs.julialang.org/#module) and the [manual section about modules](https://docs.julialang.org/../../manual/modules/#modules) for details.


```julia
Module(name::Symbol=:anonymous, std_imports=true, default_names=true)
```
Return a module with the specified name. A `baremodule` corresponds to `Module(:ModuleName, false)`

An empty module containing no names at all can be created with `Module(:ModuleName, false, false)`. This module will not import `Base` or `Core` and does not contain a reference to itself.

[source](https://github.com/JuliaLang/julia/blob/17cfb8e65ead377bf1b4598d8a9869144142c84e/base/docs/basedocs.jl#L2812-L2823)
```julia
Function
```
Abstract type of all functions.

**Examples**


```julia
julia> isa(+, Function)
true

julia> typeof(sin)
typeof(sin) (singleton type of function sin, subtype of Function)

julia> ans <: Function
true
```
[source](https://github.com/JuliaLang/julia/blob/17cfb8e65ead377bf1b4598d8a9869144142c84e/base/docs/basedocs.jl#L1356-L1372)
```julia
hasmethod(f, t::Type{<:Tuple}[, kwnames]; world=get_world_counter()) -> Bool
```
Determine whether the given generic function has a method matching the given `Tuple` of argument types with the upper bound of world age given by `world`.

If a tuple of keyword argument names `kwnames` is provided, this also checks whether the method of `f` matching `t` has the given keyword argument names. If the matching method accepts a variable number of keyword arguments, e.g. with `kwargs...`, any names given in `kwnames` are considered valid. Otherwise the provided names must be a subset of the method's keyword arguments.

See also [`applicable`](https://docs.julialang.org/#Core.applicable).

Providing keyword argument names requires Julia 1.2 or later.

**Examples**


```julia
julia> hasmethod(length, Tuple{Array})
true

julia> f(; oranges=0) = oranges;

julia> hasmethod(f, Tuple{}, (:oranges,))
true

julia> hasmethod(f, Tuple{}, (:apples, :bananas))
false

julia> g(; xs...) = 4;

julia> hasmethod(g, Tuple{}, (:a, :b, :c, :d))  # g accepts arbitrary kwargs
true
```
[source](https://github.com/JuliaLang/julia/blob/17cfb8e65ead377bf1b4598d8a9869144142c84e/base/reflection.jl#L1480-L1515)
```julia
applicable(f, args...) -> Bool
```
Determine whether the given generic function has a method applicable to the given arguments.

See also [`hasmethod`](https://docs.julialang.org/#Base.hasmethod).

**Examples**


```julia
julia> function f(x, y)
           x + y
       end;

julia> applicable(f, 1)
false

julia> applicable(f, 1, 2)
true
```
[source](https://github.com/JuliaLang/julia/blob/17cfb8e65ead377bf1b4598d8a9869144142c84e/base/docs/basedocs.jl#L1661-L1680)
```julia
Base.isambiguous(m1, m2; ambiguous_bottom=false) -> Bool
```
Determine whether two methods `m1` and `m2` may be ambiguous for some call signature. This test is performed in the context of other methods of the same function; in isolation, `m1` and `m2` might be ambiguous, but if a third method resolving the ambiguity has been defined, this returns `false`. Alternatively, in isolation `m1` and `m2` might be ordered, but if a third method cannot be sorted with them, they may cause an ambiguity together.

For parametric types, the `ambiguous_bottom` keyword argument controls whether `Union{}` counts as an ambiguous intersection of type parameters – when `true`, it is considered ambiguous, when `false` it is not.

**Examples**


```julia
julia> foo(x::Complex{<:Integer}) = 1
foo (generic function with 1 method)

julia> foo(x::Complex{<:Rational}) = 2
foo (generic function with 2 methods)

julia> m1, m2 = collect(methods(foo));

julia> typeintersect(m1.sig, m2.sig)
Tuple{typeof(foo), Complex{Union{}}}

julia> Base.isambiguous(m1, m2, ambiguous_bottom=true)
true

julia> Base.isambiguous(m1, m2, ambiguous_bottom=false)
false
```
[source](https://github.com/JuliaLang/julia/blob/17cfb8e65ead377bf1b4598d8a9869144142c84e/base/reflection.jl#L1579-L1612)
```julia
invoke(f, argtypes::Type, args...; kwargs...)
```
Invoke a method for the given generic function `f` matching the specified types `argtypes` on the specified arguments `args` and passing the keyword arguments `kwargs`. The arguments `args` must conform with the specified types in `argtypes`, i.e. conversion is not automatically performed. This method allows invoking a method other than the most specific matching method, which is useful when the behavior of a more general definition is explicitly needed (often as part of the implementation of a more specific method of the same function).

Be careful when using `invoke` for functions that you don't write. What definition is used for given `argtypes` is an implementation detail unless the function is explicitly states that calling with certain `argtypes` is a part of public API. For example, the change between `f1` and `f2` in the example below is usually considered compatible because the change is invisible by the caller with a normal (non-`invoke`) call. However, the change is visible if you use `invoke`.

**Examples**


```julia
julia> f(x::Real) = x^2;

julia> f(x::Integer) = 1 + invoke(f, Tuple{Real}, x);

julia> f(2)
5

julia> f1(::Integer) = Integer
       f1(::Real) = Real;

julia> f2(x::Real) = _f2(x)
       _f2(::Integer) = Integer
       _f2(_) = Real;

julia> f1(1)
Integer

julia> f2(1)
Integer

julia> invoke(f1, Tuple{Real}, 1)
Real

julia> invoke(f2, Tuple{Real}, 1)
Integer
```
[source](https://github.com/JuliaLang/julia/blob/17cfb8e65ead377bf1b4598d8a9869144142c84e/base/docs/basedocs.jl#L1683-L1728)
```julia
@invoke f(arg::T, ...; kwargs...)
```
Provides a convenient way to call [`invoke`](https://docs.julialang.org/#Core.invoke); `@invoke f(arg1::T1, arg2::T2; kwargs...)` will be expanded into `invoke(f, Tuple{T1,T2}, arg1, arg2; kwargs...)`. When an argument's type annotation is omitted, it's specified as `Any` argument, e.g. `@invoke f(arg1::T, arg2)` will be expanded into `invoke(f, Tuple{T,Any}, arg1, arg2)`.

This macro requires Julia 1.7 or later.

[source](https://github.com/JuliaLang/julia/blob/17cfb8e65ead377bf1b4598d8a9869144142c84e/base/reflection.jl#L1767-L1777)
```julia
invokelatest(f, args...; kwargs...)
```
Calls `f(args...; kwargs...)`, but guarantees that the most recent method of `f` will be executed. This is useful in specialized circumstances, e.g. long-running event loops or callback functions that may call obsolete versions of a function `f`. (The drawback is that `invokelatest` is somewhat slower than calling `f` directly, and the type of the result cannot be inferred by the compiler.)

[source](https://github.com/JuliaLang/julia/blob/17cfb8e65ead377bf1b4598d8a9869144142c84e/base/essentials.jl#L716-L725)
```julia
@invokelatest f(args...; kwargs...)
```
Provides a convenient way to call [`Base.invokelatest`](https://docs.julialang.org/#Base.invokelatest). `@invokelatest f(args...; kwargs...)` will simply be expanded into `Base.invokelatest(f, args...; kwargs...)`.

This macro requires Julia 1.7 or later.

[source](https://github.com/JuliaLang/julia/blob/17cfb8e65ead377bf1b4598d8a9869144142c84e/base/reflection.jl#L1787-L1796)
```julia
new, or new{A,B,...}
```
Special function available to inner constructors which creates a new object of the type. The form new{A,B,...} explicitly specifies values of parameters for parametric types. See the manual section on [Inner Constructor Methods](https://docs.julialang.org/../../manual/constructors/#man-inner-constructor-methods) for more information.

[source](https://github.com/JuliaLang/julia/blob/17cfb8e65ead377bf1b4598d8a9869144142c84e/base/docs/basedocs.jl#L1190-L1197)
```julia
|>(x, f)
```
Applies a function to the preceding argument. This allows for easy function chaining.

**Examples**


```julia
julia> [1:5;] |> (x->x.^2) |> sum |> inv
0.01818181818181818
```
[source](https://github.com/JuliaLang/julia/blob/17cfb8e65ead377bf1b4598d8a9869144142c84e/base/operators.jl#L900-L910)
```julia
f ∘ g
```
Compose functions: i.e. `(f ∘ g)(args...; kwargs...)` means `f(g(args...; kwargs...))`. The `∘` symbol can be entered in the Julia REPL (and most editors, appropriately configured) by typing `circ<tab>`.

Function composition also works in prefix form: `∘(f, g)` is the same as `f ∘ g`. The prefix form supports composition of multiple functions: `∘(f, g, h) = f ∘ g ∘ h` and splatting `∘(fs...)` for composing an iterable collection of functions.

Multiple function composition requires at least Julia 1.4.

Composition of one function ∘(f) requires at least Julia 1.5.

Using keyword arguments requires at least Julia 1.7.

**Examples**


```julia
julia> map(uppercase∘first, ["apple", "banana", "carrot"])
3-element Vector{Char}:
 'A': ASCII/Unicode U+0041 (category Lu: Letter, uppercase)
 'B': ASCII/Unicode U+0042 (category Lu: Letter, uppercase)
 'C': ASCII/Unicode U+0043 (category Lu: Letter, uppercase)

julia> fs = [
           x -> 2x
           x -> x/2
           x -> x-1
           x -> x+1
       ];

julia> ∘(fs...)(3)
3.0
```
See also [`ComposedFunction`](https://docs.julialang.org/#Base.ComposedFunction), [`!f::Function`](../math/#Base.:!).

[source](https://github.com/JuliaLang/julia/blob/17cfb8e65ead377bf1b4598d8a9869144142c84e/base/operators.jl#L954-L992)
```julia
ComposedFunction{Outer,Inner} <: Function
```
Represents the composition of two callable objects `outer::Outer` and `inner::Inner`. That is


```julia
ComposedFunction(outer, inner)(args...; kw...) === outer(inner(args...; kw...))
```
The preferred way to construct instance of `ComposedFunction` is to use the composition operator [`∘`](https://docs.julialang.org/#Base.:%E2%88%98):


```julia
julia> sin ∘ cos === ComposedFunction(sin, cos)
true

julia> typeof(sin∘cos)
ComposedFunction{typeof(sin), typeof(cos)}
```
The composed pieces are stored in the fields of `ComposedFunction` and can be retrieved as follows:


```julia
julia> composition = sin ∘ cos
sin ∘ cos

julia> composition.outer === sin
true

julia> composition.inner === cos
true
```
ComposedFunction requires at least Julia 1.6. In earlier versions `∘` returns an anonymous function instead.

See also [`∘`](#Base.:%E2%88%98).

[source](https://github.com/JuliaLang/julia/blob/17cfb8e65ead377bf1b4598d8a9869144142c84e/base/operators.jl#L995-L1025)
```julia
splat(f)
```
Defined as


```julia
    splat(f) = args->f(args...)
```
i.e. given a function returns a new function that takes one argument and splats its argument into the original function. This is useful as an adaptor to pass a multi-argument function in a context that expects a single argument, but passes a tuple as that single argument.

**Example usage:**


```julia
julia> map(Base.splat(+), zip(1:3,4:6))
3-element Vector{Int64}:
 5
 7
 9
```
[source](https://github.com/JuliaLang/julia/blob/17cfb8e65ead377bf1b4598d8a9869144142c84e/base/operators.jl#L1202-L1222)
```julia
Fix1(f, x)
```
A type representing a partially-applied version of the two-argument function `f`, with the first argument fixed to the value "x". In other words, `Fix1(f, x)` behaves similarly to `y->f(x, y)`.

See also [`Fix2`](#Base.Fix2).

[source](https://github.com/JuliaLang/julia/blob/17cfb8e65ead377bf1b4598d8a9869144142c84e/base/operators.jl#L1079-L1087)
```julia
Fix2(f, x)
```
A type representing a partially-applied version of the two-argument function `f`, with the second argument fixed to the value "x". In other words, `Fix2(f, x)` behaves similarly to `y->f(y, x)`.

[source](https://github.com/JuliaLang/julia/blob/17cfb8e65ead377bf1b4598d8a9869144142c84e/base/operators.jl#L1098-L1104)
```julia
Core.eval(m::Module, expr)
```
Evaluate an expression in the given module and return the result.

[source](https://github.com/JuliaLang/julia/blob/17cfb8e65ead377bf1b4598d8a9869144142c84e/base/expr.jl#L176-L180)
```julia
eval(expr)
```
Evaluate an expression in the global scope of the containing module. Every `Module` (except those defined with `baremodule`) has its own 1-argument definition of `eval`, which evaluates expressions in that module.

[source](https://github.com/JuliaLang/julia/blob/17cfb8e65ead377bf1b4598d8a9869144142c84e/base/client.jl#L481-L487)
```julia
@eval [mod,] ex
```
Evaluate an expression with values interpolated into it using `eval`. If two arguments are provided, the first is the module to evaluate in.

[source](https://github.com/JuliaLang/julia/blob/17cfb8e65ead377bf1b4598d8a9869144142c84e/base/essentials.jl#L220-L225)
```julia
evalfile(path::AbstractString, args::Vector{String}=String[])
```
Load the file using [`include`](https://docs.julialang.org/#Base.include), evaluate all expressions, and return the value of the last one.

[source](https://github.com/JuliaLang/julia/blob/17cfb8e65ead377bf1b4598d8a9869144142c84e/base/loading.jl#L1498-L1503)
```julia
esc(e)
```
Only valid in the context of an [`Expr`](https://docs.julialang.org/#Core.Expr) returned from a macro. Prevents the macro hygiene pass from turning embedded variables into gensym variables. See the [Macros](https://docs.julialang.org/../../manual/metaprogramming/#man-macros) section of the Metaprogramming chapter of the manual for more details and examples.

[source](https://github.com/JuliaLang/julia/blob/17cfb8e65ead377bf1b4598d8a9869144142c84e/base/essentials.jl#L494-L500)
```julia
@inbounds(blk)
```
Eliminates array bounds checking within expressions.

In the example below the in-range check for referencing element `i` of array `A` is skipped to improve performance.


```julia
function sum(A::AbstractArray)
    r = zero(eltype(A))
    for i in eachindex(A)
        @inbounds r += A[i]
    end
    return r
end
```
Using `@inbounds` may return incorrect results/crashes/corruption for out-of-bounds indices. The user is responsible for checking it manually. Only use `@inbounds` when it is certain from the information locally available that all accesses are in bounds.

[source](https://github.com/JuliaLang/julia/blob/17cfb8e65ead377bf1b4598d8a9869144142c84e/base/essentials.jl#L551-L575)
```julia
@boundscheck(blk)
```
Annotates the expression `blk` as a bounds checking block, allowing it to be elided by [`@inbounds`](https://docs.julialang.org/#Base.@inbounds).

The function in which `@boundscheck` is written must be inlined into its caller in order for `@inbounds` to have effect.

**Examples**


```julia
julia> @inline function g(A, i)
           @boundscheck checkbounds(A, i)
           return "accessing ($A)[$i]"
       end;

julia> f1() = return g(1:2, -1);

julia> f2() = @inbounds return g(1:2, -1);

julia> f1()
ERROR: BoundsError: attempt to access 2-element UnitRange{Int64} at index [-1]
Stacktrace:
 [1] throw_boundserror(::UnitRange{Int64}, ::Tuple{Int64}) at ./abstractarray.jl:455
 [2] checkbounds at ./abstractarray.jl:420 [inlined]
 [3] g at ./none:2 [inlined]
 [4] f1() at ./none:1
 [5] top-level scope

julia> f2()
"accessing (1:2)[-1]"
```
The `@boundscheck` annotation allows you, as a library writer, to opt-in to allowing *other code* to remove your bounds checks with [`@inbounds`](https://docs.julialang.org/#Base.@inbounds). As noted there, the caller must verify—using information they can access—that their accesses are valid before using `@inbounds`. For indexing into your [`AbstractArray`](https://docs.julialang.org/../arrays/#Core.AbstractArray) subclasses, for example, this involves checking the indices against its [`axes`](https://docs.julialang.org/../arrays/#Base.axes-Tuple%7BAny%7D). Therefore, `@boundscheck` annotations should only be added to a [`getindex`](https://docs.julialang.org/../collections/#Base.getindex) or [`setindex!`](https://docs.julialang.org/../collections/#Base.setindex!) implementation after you are certain its behavior is correct.

[source](https://github.com/JuliaLang/julia/blob/17cfb8e65ead377bf1b4598d8a9869144142c84e/base/essentials.jl#L503-L546)
```julia
@propagate_inbounds
```
Tells the compiler to inline a function while retaining the caller's inbounds context.

[source](https://github.com/JuliaLang/julia/blob/17cfb8e65ead377bf1b4598d8a9869144142c84e/base/expr.jl#L637-L641)
```julia
@inline
```
Give a hint to the compiler that this function is worth inlining.

Small functions typically do not need the `@inline` annotation, as the compiler does it automatically. By using `@inline` on bigger functions, an extra nudge can be given to the compiler to inline it.

`@inline` can be applied immediately before the definition or in its function body.


```julia
# annotate long-form definition
@inline function longdef(x)
    ...
end

# annotate short-form definition
@inline shortdef(x) = ...

# annotate anonymous function that a `do` block creates
f() do
    @inline
    ...
end
```
The usage within a function body requires at least Julia 1.8.



---


```julia
@inline block
```
Give a hint to the compiler that calls within `block` are worth inlining.


```julia
# The compiler will try to inline `f`
@inline f(...)

# The compiler will try to inline `f`, `g` and `+`
@inline f(...) + g(...)
```
A callsite annotation always has the precedence over the annotation applied to the definition of the called function:


```julia
@noinline function explicit_noinline(args...)
    # body
end

let
    @inline explicit_noinline(args...) # will be inlined
end
```
When there are nested callsite annotations, the innermost annotation has the precedence:


```julia
@noinline let a0, b0 = ...
    a = @inline f(a0)  # the compiler will try to inline this call
    b = f(b0)          # the compiler will NOT try to inline this call
    return a, b
end
```
Although a callsite annotation will try to force inlining in regardless of the cost model, there are still chances it can't succeed in it. Especially, recursive calls can not be inlined even if they are annotated as `@inline`d.

The callsite annotation requires at least Julia 1.8.

[source](https://github.com/JuliaLang/julia/blob/17cfb8e65ead377bf1b4598d8a9869144142c84e/base/expr.jl#L183-L256)
```julia
@noinline
```
Give a hint to the compiler that it should not inline a function.

Small functions are typically inlined automatically. By using `@noinline` on small functions, auto-inlining can be prevented.

`@noinline` can be applied immediately before the definition or in its function body.


```julia
# annotate long-form definition
@noinline function longdef(x)
    ...
end

# annotate short-form definition
@noinline shortdef(x) = ...

# annotate anonymous function that a `do` block creates
f() do
    @noinline
    ...
end
```
The usage within a function body requires at least Julia 1.8.



---


```julia
@noinline block
```
Give a hint to the compiler that it should not inline the calls within `block`.


```julia
# The compiler will try to not inline `f`
@noinline f(...)

# The compiler will try to not inline `f`, `g` and `+`
@noinline f(...) + g(...)
```
A callsite annotation always has the precedence over the annotation applied to the definition of the called function:


```julia
@inline function explicit_inline(args...)
    # body
end

let
    @noinline explicit_inline(args...) # will not be inlined
end
```
When there are nested callsite annotations, the innermost annotation has the precedence:


```julia
@inline let a0, b0 = ...
    a = @noinline f(a0)  # the compiler will NOT try to inline this call
    b = f(b0)            # the compiler will try to inline this call
    return a, b
end
```
The callsite annotation requires at least Julia 1.8.



---

If the function is trivial (for example returning a constant) it might get inlined anyway.

[source](https://github.com/JuliaLang/julia/blob/17cfb8e65ead377bf1b4598d8a9869144142c84e/base/expr.jl#L261-L333)
```julia
@nospecialize
```
Applied to a function argument name, hints to the compiler that the method should not be specialized for different types of that argument, but instead to use precisely the declared type for each argument. This is only a hint for avoiding excess code generation. Can be applied to an argument within a formal argument list, or in the function body. When applied to an argument, the macro must wrap the entire argument expression. When used in a function body, the macro must occur in statement position and before any code.

When used without arguments, it applies to all arguments of the parent scope. In local scope, this means all arguments of the containing function. In global (top-level) scope, this means all methods subsequently defined in the current module.

Specialization can reset back to the default by using [`@specialize`](https://docs.julialang.org/#Base.@specialize).


```julia
function example_function(@nospecialize x)
    ...
end

function example_function(x, @nospecialize(y = 1))
    ...
end

function example_function(x, y, z)
    @nospecialize x y
    ...
end

@nospecialize
f(y) = [x for x in y]
@specialize
```
[source](https://github.com/JuliaLang/julia/blob/17cfb8e65ead377bf1b4598d8a9869144142c84e/base/essentials.jl#L53-L90)
```julia
@specialize
```
Reset the specialization hint for an argument back to the default. For details, see [`@nospecialize`](#Base.@nospecialize).

[source](https://github.com/JuliaLang/julia/blob/17cfb8e65ead377bf1b4598d8a9869144142c84e/base/essentials.jl#L102-L107)
```julia
gensym([tag])
```
Generates a symbol which will not conflict with other variable names.

[source](https://github.com/JuliaLang/julia/blob/17cfb8e65ead377bf1b4598d8a9869144142c84e/base/expr.jl#L5-L9)
```julia
@gensym
```
Generates a gensym symbol for a variable. For example, `@gensym x y` is transformed into `x = gensym("x"); y = gensym("y")`.

[source](https://github.com/JuliaLang/julia/blob/17cfb8e65ead377bf1b4598d8a9869144142c84e/base/expr.jl#L17-L22)
```julia
var
```
The syntax `var"#example#"` refers to a variable named `Symbol("#example#")`, even though `#example#` is not a valid Julia identifier name.

This can be useful for interoperability with programming languages which have different rules for the construction of valid identifiers. For example, to refer to the `R` variable `draw.segments`, you can use `var"draw.segments"` in your Julia code.

It is also used to `show` julia source code which has gone through macro hygiene or otherwise contains variable names which can't be parsed normally.

Note that this syntax requires parser support so it is expanded directly by the parser rather than being implemented as a normal string macro `@var_str`.

This syntax requires at least Julia 1.3.

[source](https://github.com/JuliaLang/julia/blob/17cfb8e65ead377bf1b4598d8a9869144142c84e/base/docs/basedocs.jl#L1236-L1256)
```julia
@goto name
```
`@goto name` unconditionally jumps to the statement at the location [`@label name`](https://docs.julialang.org/#Base.@label).

`@label` and `@goto` cannot create jumps to different top-level statements. Attempts cause an error. To still use `@goto`, enclose the `@label` and `@goto` in a block.

[source](https://github.com/JuliaLang/julia/blob/17cfb8e65ead377bf1b4598d8a9869144142c84e/base/essentials.jl#L594-L601)
```julia
@label name
```
Labels a statement with the symbolic label `name`. The label marks the end-point of an unconditional jump with [`@goto name`](#Base.@goto).

[source](https://github.com/JuliaLang/julia/blob/17cfb8e65ead377bf1b4598d8a9869144142c84e/base/essentials.jl#L584-L589)
```julia
@simd
```
Annotate a `for` loop to allow the compiler to take extra liberties to allow loop re-ordering

This feature is experimental and could change or disappear in future versions of Julia. Incorrect use of the `@simd` macro may cause unexpected results.

The object iterated over in a `@simd for` loop should be a one-dimensional range. By using `@simd`, you are asserting several properties of the loop:

* It is safe to execute iterations in arbitrary or overlapping order, with special consideration for reduction variables.
* Floating-point operations on reduction variables can be reordered, possibly causing different results than without `@simd`.

In many cases, Julia is able to automatically vectorize inner for loops without the use of `@simd`. Using `@simd` gives the compiler a little extra leeway to make it possible in more situations. In either case, your inner loop should have the following properties to allow vectorization:

* The loop must be an innermost loop
* The loop body must be straight-line code. Therefore, [`@inbounds`](https://docs.julialang.org/#Base.@inbounds) is currently needed for all array accesses. The compiler can sometimes turn short `&&`, `||`, and `?:` expressions into straight-line code if it is safe to evaluate all operands unconditionally. Consider using the [`ifelse`](https://docs.julialang.org/#Base.ifelse) function instead of `?:` in the loop if it is safe to do so.
* Accesses must have a stride pattern and cannot be "gathers" (random-index reads) or "scatters" (random-index writes).
* The stride should be unit stride.

The `@simd` does not assert by default that the loop is completely free of loop-carried memory dependencies, which is an assumption that can easily be violated in generic code. If you are writing non-generic code, you can use `@simd ivdep for ... end` to also assert that:

* There exists no loop-carried memory dependencies
* No iteration ever waits on a previous iteration to make forward progress.
[source](https://github.com/JuliaLang/julia/blob/17cfb8e65ead377bf1b4598d8a9869144142c84e/base/simdloop.jl#L90-L126)
```julia
@polly
```
Tells the compiler to apply the polyhedral optimizer Polly to a function.

[source](https://github.com/JuliaLang/julia/blob/17cfb8e65ead377bf1b4598d8a9869144142c84e/base/expr.jl#L650-L654)
```julia
@generated f
```
`@generated` is used to annotate a function which will be generated. In the body of the generated function, only types of arguments can be read (not the values). The function returns a quoted expression evaluated when the function is called. The `@generated` macro should not be used on functions mutating the global scope or depending on mutable elements.

See [Metaprogramming](https://docs.julialang.org/../../manual/metaprogramming/#Metaprogramming) for further details.

**Example:**


```julia
julia> @generated function bar(x)
           if x <: Integer
               return :(x ^ 2)
           else
               return :(x)
           end
       end
bar (generic function with 1 method)

julia> bar(4)
16

julia> bar("baz")
"baz"
```
[source](https://github.com/JuliaLang/julia/blob/17cfb8e65ead377bf1b4598d8a9869144142c84e/base/expr.jl#L807-L835)
```julia
@pure ex
```
`@pure` gives the compiler a hint for the definition of a pure function, helping for type inference.

This macro is intended for internal compiler use and may be subject to changes.

In Julia 1.8 and higher, it is favorable to use [`@assume_effects`](https://docs.julialang.org/#Base.@assume_effects) instead of `@pure`. This is because `@assume_effects` allows a finer grained control over Julia's purity modeling and the effect system enables a wider range of optimizations.

[source](https://github.com/JuliaLang/julia/blob/17cfb8e65ead377bf1b4598d8a9869144142c84e/base/expr.jl#L338-L351)
```julia
@assume_effects setting... ex
```
`@assume_effects` overrides the compiler's effect modeling for the given method. `ex` must be a method definition or `@ccall` expression.

Using `Base.@assume_effects` requires Julia version 1.8.


```julia
julia> Base.@assume_effects :terminates_locally function pow(x)
           # this :terminates_locally allows `pow` to be constant-folded
           res = 1
           1 < x < 20 || error("bad pow")
           while x > 1
               res *= x
               x -= 1
           end
           return res
       end
pow (generic function with 1 method)

julia> code_typed() do
           pow(12)
       end
1-element Vector{Any}:
 CodeInfo(
1 ─     return 479001600
) => Int64

julia> Base.@assume_effects :total !:nothrow @ccall jl_type_intersection(Vector{Int}::Any, Vector{<:Integer}::Any)::Any
Vector{Int64} (alias for Array{Int64, 1})
```
Improper use of this macro causes undefined behavior (including crashes, incorrect answers, or other hard to track bugs). Use with care and only if absolutely required.

In general, each `setting` value makes an assertion about the behavior of the function, without requiring the compiler to prove that this behavior is indeed true. These assertions are made for all world ages. It is thus advisable to limit the use of generic functions that may later be extended to invalidate the assumption (which would cause undefined behavior).

The following `setting`s are supported.

* `:consistent`
* `:effect_free`
* `:nothrow`
* `:terminates_globally`
* `:terminates_locally`
* `:foldable`
* `:total`

**Extended help**



---

**`:consistent`**

The `:consistent` setting asserts that for egal (`===`) inputs:

* The manner of termination (return value, exception, non-termination) will always be the same.
* If the method returns, the results will always be egal.

This in particular implies that the return value of the method must be immutable. Multiple allocations of mutable objects (even with identical contents) are not egal.

The `:consistent`-cy assertion is made world-age wise. More formally, write $fᵢ$ for the evaluation of $f$ in world-age $i$, then we require:

[∀ i, x, y: x ≡ y → fᵢ(x) ≡ fᵢ(y)]

However, for two world ages $i$, $j$ s.t. $i ≠ j$, we may have $fᵢ(x) ≢ fⱼ(y)$.

A further implication is that `:consistent` functions may not make their return value dependent on the state of the heap or any other global state that is not constant for a given world age.

The `:consistent`-cy includes all legal rewrites performed by the optimizer. For example, floating-point fastmath operations are not considered `:consistent`, because the optimizer may rewrite them causing the output to not be `:consistent`, even for the same world age (e.g. because one ran in the interpreter, while the other was optimized).

If `:consistent` functions terminate by throwing an exception, that exception itself is not required to meet the egality requirement specified above.



---

**`:effect_free`**

The `:effect_free` setting asserts that the method is free of externally semantically visible side effects. The following is an incomplete list of externally semantically visible side effects:

* Changing the value of a global variable.
* Mutating the heap (e.g. an array or mutable value), except as noted below
* Changing the method table (e.g. through calls to eval)
* File/Network/etc. I/O
* Task switching

However, the following are explicitly not semantically visible, even if they may be observable:

* Memory allocations (both mutable and immutable)
* Elapsed time
* Garbage collection
* Heap mutations of objects whose lifetime does not exceed the method (i.e. were allocated in the method and do not escape).
* The returned value (which is externally visible, but not a side effect)

The rule of thumb here is that an externally visible side effect is anything that would affect the execution of the remainder of the program if the function were not executed.

The `:effect_free` assertion is made both for the method itself and any code that is executed by the method. Keep in mind that the assertion must be valid for all world ages and limit use of this assertion accordingly.



---

**`:nothrow`**

The `:nothrow` settings asserts that this method does not terminate abnormally (i.e. will either always return a value or never return).

It is permissible for `:nothrow` annotated methods to make use of exception handling internally as long as the exception is not rethrown out of the method itself.

`MethodErrors` and similar exceptions count as abnormal termination.



---

**`:terminates_globally`**

The `:terminates_globally` settings asserts that this method will eventually terminate (either normally or abnormally), i.e. does not loop indefinitely.

This `:terminates_globally` assertion covers any other methods called by the annotated method.

The compiler will consider this a strong indication that the method will terminate relatively *quickly* and may (if otherwise legal), call this method at compile time. I.e. it is a bad idea to annotate this setting on a method that *technically*, but not *practically*, terminates.



---

**`:terminates_locally`**

The `:terminates_locally` setting is like `:terminates_globally`, except that it only applies to syntactic control flow *within* the annotated method. It is thus a much weaker (and thus safer) assertion that allows for the possibility of non-termination if the method calls some other method that does not terminate.

`:terminates_globally` implies `:terminates_locally`.



---

**`:foldable`**

This setting is a convenient shortcut for the set of effects that the compiler requires to be guaranteed to constant fold a call at compile time. It is currently equivalent to the following `setting`s:

* `:consistent`
* `:effect_free`
* `:terminates_globally`

This list in particular does not include `:nothrow`. The compiler will still attempt constant propagation and note any thrown error at compile time. Note however, that by the `:consistent`-cy requirements, any such annotated call must consistently throw given the same argument values.



---

**`:total`**

This `setting` is the maximum possible set of effects. It currently implies the following other `setting`s:

* `:consistent`
* `:effect_free`
* `:nothrow`
* `:terminates_globally`

`:total` is a very strong assertion and will likely gain additional semantics in future versions of Julia (e.g. if additional effects are added and included in the definition of `:total`). As a result, it should be used with care. Whenever possible, prefer to use the minimum possible set of specific effect assertions required for a particular application. In cases where a large number of effect overrides apply to a set of functions, a custom macro is recommended over the use of `:total`.



---

**Negated effects**

Effect names may be prefixed by `!` to indicate that the effect should be removed from an earlier meta effect. For example, `:total !:nothrow` indicates that while the call is generally total, it may however throw.



---

**Comparison to `@pure`**

`@assume_effects :foldable` is similar to [`@pure`](https://docs.julialang.org/#Base.@pure) with the primary distinction that the `:consistent`-cy requirement applies world-age wise rather than globally as described above. However, in particular, a method annotated `@pure` should always be at least `:foldable`. Another advantage is that effects introduced by `@assume_effects` are propagated to callers interprocedurally while a purity defined by `@pure` is not.

[source](https://github.com/JuliaLang/julia/blob/17cfb8e65ead377bf1b4598d8a9869144142c84e/base/expr.jl#L378-L591)
```julia
@deprecate old new [export_old=true]
```
Deprecate method `old` and specify the replacement call `new`. Prevent `@deprecate` from exporting `old` by setting `export_old` to `false`. `@deprecate` defines a new method with the same signature as `old`.

As of Julia 1.5, functions defined by `@deprecate` do not print warning when `julia` is run without the `--depwarn=yes` flag set, as the default value of `--depwarn` option is `no`. The warnings are printed from tests run by `Pkg.test()`.

**Examples**


```julia
julia> @deprecate old(x) new(x)
old (generic function with 1 method)

julia> @deprecate old(x) new(x) false
old (generic function with 1 method)
```
[source](https://github.com/JuliaLang/julia/blob/17cfb8e65ead377bf1b4598d8a9869144142c84e/base/deprecated.jl#L17-L37)
```julia
coalesce(x...)
```
Return the first value in the arguments which is not equal to [`missing`](https://docs.julialang.org/#Base.missing), if any. Otherwise return `missing`.

See also [`skipmissing`](https://docs.julialang.org/#Base.skipmissing), [`something`](https://docs.julialang.org/#Base.something), [`@coalesce`](https://docs.julialang.org/#Base.@coalesce).

**Examples**


```julia
julia> coalesce(missing, 1)
1

julia> coalesce(1, missing)
1

julia> coalesce(nothing, 1)  # returns `nothing`

julia> coalesce(missing, missing)
missing
```
[source](https://github.com/JuliaLang/julia/blob/17cfb8e65ead377bf1b4598d8a9869144142c84e/base/missing.jl#L403-L425)
```julia
@coalesce(x...)
```
Short-circuiting version of [`coalesce`](https://docs.julialang.org/#Base.coalesce).

**Examples**


```julia
julia> f(x) = (println("f($x)"); missing);

julia> a = 1;

julia> a = @coalesce a f(2) f(3) error("`a` is still missing")
1

julia> b = missing;

julia> b = @coalesce b f(2) f(3) error("`b` is still missing")
f(2)
f(3)
ERROR: `b` is still missing
[...]
```
This macro is available as of Julia 1.7.

[source](https://github.com/JuliaLang/julia/blob/17cfb8e65ead377bf1b4598d8a9869144142c84e/base/missing.jl#L433-L458)
```julia
skipmissing(itr)
```
Return an iterator over the elements in `itr` skipping [`missing`](https://docs.julialang.org/#Base.missing) values. The returned object can be indexed using indices of `itr` if the latter is indexable. Indices corresponding to missing values are not valid: they are skipped by [`keys`](https://docs.julialang.org/../collections/#Base.keys) and [`eachindex`](https://docs.julialang.org/../arrays/#Base.eachindex), and a `MissingException` is thrown when trying to use them.

Use [`collect`](https://docs.julialang.org/../collections/#Base.collect-Tuple%7BAny%7D) to obtain an `Array` containing the non-`missing` values in `itr`. Note that even if `itr` is a multidimensional array, the result will always be a `Vector` since it is not possible to remove missings while preserving dimensions of the input.

See also [`coalesce`](https://docs.julialang.org/#Base.coalesce), [`ismissing`](https://docs.julialang.org/#Base.ismissing), [`something`](https://docs.julialang.org/#Base.something).

**Examples**


```julia
julia> x = skipmissing([1, missing, 2])
skipmissing(Union{Missing, Int64}[1, missing, 2])

julia> sum(x)
3

julia> x[1]
1

julia> x[2]
ERROR: MissingException: the value at index (2,) is missing
[...]

julia> argmax(x)
3

julia> collect(keys(x))
2-element Vector{Int64}:
 1
 3

julia> collect(skipmissing([1, missing, 2]))
2-element Vector{Int64}:
 1
 2

julia> collect(skipmissing([1 missing; 2 missing]))
2-element Vector{Int64}:
 1
 2
```
[source](https://github.com/JuliaLang/julia/blob/17cfb8e65ead377bf1b4598d8a9869144142c84e/base/missing.jl#L191-L239)
```julia
nonmissingtype(T::Type)
```
If `T` is a union of types containing `Missing`, return a new type with `Missing` removed.

**Examples**


```julia
julia> nonmissingtype(Union{Int64,Missing})
Int64

julia> nonmissingtype(Any)
Any
```
This function is exported as of Julia 1.3.

[source](https://github.com/JuliaLang/julia/blob/17cfb8e65ead377bf1b4598d8a9869144142c84e/base/missing.jl#L21-L38)
```julia
run(command, args...; wait::Bool = true)
```
Run a command object, constructed with backticks (see the [Running External Programs](https://docs.julialang.org/../../manual/running-external-programs/#Running-External-Programs) section in the manual). Throws an error if anything goes wrong, including the process exiting with a non-zero status (when `wait` is true).

The `args...` allow you to pass through file descriptors to the command, and are ordered like regular unix file descriptors (eg `stdin, stdout, stderr, FD(3), FD(4)...`).

If `wait` is false, the process runs asynchronously. You can later wait for it and check its exit status by calling `success` on the returned process object.

When `wait` is false, the process' I/O streams are directed to `devnull`. When `wait` is true, I/O streams are shared with the parent process. Use [`pipeline`](https://docs.julialang.org/#Base.pipeline-Tuple%7BAny,%20Any,%20Any,%20Vararg%7BAny%7D%7D) to control I/O redirection.

[source](https://github.com/JuliaLang/julia/blob/17cfb8e65ead377bf1b4598d8a9869144142c84e/base/process.jl#L460-L476)
```julia
devnull
```
Used in a stream redirect to discard all data written to it. Essentially equivalent to `/dev/null` on Unix or `NUL` on Windows. Usage:


```julia
run(pipeline(`cat test.txt`, devnull))
```
[source](https://github.com/JuliaLang/julia/blob/17cfb8e65ead377bf1b4598d8a9869144142c84e/base/docs/basedocs.jl#L1266-L1275)
```julia
success(command)
```
Run a command object, constructed with backticks (see the [Running External Programs](https://docs.julialang.org/../../manual/running-external-programs/#Running-External-Programs) section in the manual), and tell whether it was successful (exited with a code of 0). An exception is raised if the process cannot be started.

[source](https://github.com/JuliaLang/julia/blob/17cfb8e65ead377bf1b4598d8a9869144142c84e/base/process.jl#L529-L535)
```julia
process_running(p::Process)
```
Determine whether a process is currently running.

[source](https://github.com/JuliaLang/julia/blob/17cfb8e65ead377bf1b4598d8a9869144142c84e/base/process.jl#L626-L630)
```julia
process_exited(p::Process)
```
Determine whether a process has exited.

[source](https://github.com/JuliaLang/julia/blob/17cfb8e65ead377bf1b4598d8a9869144142c84e/base/process.jl#L635-L639)
```julia
kill(p::Process, signum=Base.SIGTERM)
```
Send a signal to a process. The default is to terminate the process. Returns successfully if the process has already exited, but throws an error if killing the process failed for other reasons (e.g. insufficient permissions).

[source](https://github.com/JuliaLang/julia/blob/17cfb8e65ead377bf1b4598d8a9869144142c84e/base/process.jl#L581-L588)
```julia
Sys.set_process_title(title::AbstractString)
```
Set the process title. No-op on some operating systems.

[source](https://github.com/JuliaLang/julia/blob/17cfb8e65ead377bf1b4598d8a9869144142c84e/base/sysinfo.jl#L302-L306)
```julia
Sys.get_process_title()
```
Get the process title. On some systems, will always return an empty string.

[source](https://github.com/JuliaLang/julia/blob/17cfb8e65ead377bf1b4598d8a9869144142c84e/base/sysinfo.jl#L290-L294)
```julia
ignorestatus(command)
```
Mark a command object so that running it will not throw an error if the result code is non-zero.

[source](https://github.com/JuliaLang/julia/blob/17cfb8e65ead377bf1b4598d8a9869144142c84e/base/cmd.jl#L211-L215)
```julia
detach(command)
```
Mark a command object so that it will be run in a new process group, allowing it to outlive the julia process, and not have Ctrl-C interrupts passed to it.

[source](https://github.com/JuliaLang/julia/blob/17cfb8e65ead377bf1b4598d8a9869144142c84e/base/cmd.jl#L220-L224)
```julia
Cmd(cmd::Cmd; ignorestatus, detach, windows_verbatim, windows_hide, env, dir)
```
Construct a new `Cmd` object, representing an external program and arguments, from `cmd`, while changing the settings of the optional keyword arguments:

* `ignorestatus::Bool`: If `true` (defaults to `false`), then the `Cmd` will not throw an error if the return code is nonzero.
* `detach::Bool`: If `true` (defaults to `false`), then the `Cmd` will be run in a new process group, allowing it to outlive the `julia` process and not have Ctrl-C passed to it.
* `windows_verbatim::Bool`: If `true` (defaults to `false`), then on Windows the `Cmd` will send a command-line string to the process with no quoting or escaping of arguments, even arguments containing spaces. (On Windows, arguments are sent to a program as a single "command-line" string, and programs are responsible for parsing it into arguments. By default, empty arguments and arguments with spaces or tabs are quoted with double quotes `"` in the command line, and `` or `"` are preceded by backslashes. `windows_verbatim=true` is useful for launching programs that parse their command line in nonstandard ways.) Has no effect on non-Windows systems.
* `windows_hide::Bool`: If `true` (defaults to `false`), then on Windows no new console window is displayed when the `Cmd` is executed. This has no effect if a console is already open or on non-Windows systems.
* `env`: Set environment variables to use when running the `Cmd`. `env` is either a dictionary mapping strings to strings, an array of strings of the form `"var=val"`, an array or tuple of `"var"=>val` pairs. In order to modify (rather than replace) the existing environment, initialize `env` with `copy(ENV)` and then set `env["var"]=val` as desired. To add to an environment block within a `Cmd` object without replacing all elements, use [`addenv()`](https://docs.julialang.org/#Base.addenv) which will return a `Cmd` object with the updated environment.
* `dir::AbstractString`: Specify a working directory for the command (instead of the current directory).

For any keywords that are not specified, the current settings from `cmd` are used. Normally, to create a `Cmd` object in the first place, one uses backticks, e.g.


```julia
Cmd(`echo "Hello world"`, ignorestatus=true, detach=false)
```
[source](https://github.com/JuliaLang/julia/blob/17cfb8e65ead377bf1b4598d8a9869144142c84e/base/cmd.jl#L42-L77)
```julia
setenv(command::Cmd, env; dir)
```
Set environment variables to use when running the given `command`. `env` is either a dictionary mapping strings to strings, an array of strings of the form `"var=val"`, or zero or more `"var"=>val` pair arguments. In order to modify (rather than replace) the existing environment, create `env` through `copy(ENV)` and then setting `env["var"]=val` as desired, or use [`addenv`](https://docs.julialang.org/#Base.addenv).

The `dir` keyword argument can be used to specify a working directory for the command. `dir` defaults to the currently set `dir` for `command` (which is the current working directory if not specified already).

See also [`Cmd`](https://docs.julialang.org/#Base.Cmd), [`addenv`](https://docs.julialang.org/#Base.addenv), [`ENV`](https://docs.julialang.org/#Base.ENV), [`pwd`](../file/#Base.Filesystem.pwd).

[source](https://github.com/JuliaLang/julia/blob/17cfb8e65ead377bf1b4598d8a9869144142c84e/base/cmd.jl#L245-L259)
```julia
addenv(command::Cmd, env...; inherit::Bool = true)
```
Merge new environment mappings into the given [`Cmd`](https://docs.julialang.org/#Base.Cmd) object, returning a new `Cmd` object. Duplicate keys are replaced. If `command` does not contain any environment values set already, it inherits the current environment at time of `addenv()` call if `inherit` is `true`. Keys with value `nothing` are deleted from the env.

See also [`Cmd`](https://docs.julialang.org/#Base.Cmd), [`setenv`](https://docs.julialang.org/#Base.setenv), [`ENV`](https://docs.julialang.org/#Base.ENV).

This function requires Julia 1.6 or later.

[source](https://github.com/JuliaLang/julia/blob/17cfb8e65ead377bf1b4598d8a9869144142c84e/base/cmd.jl#L274-L286)
```julia
withenv(f, kv::Pair...)
```
Execute `f` in an environment that is temporarily modified (not replaced as in `setenv`) by zero or more `"var"=>val` arguments `kv`. `withenv` is generally used via the `withenv(kv...) do ... end` syntax. A value of `nothing` can be used to temporarily unset an environment variable (if it is set). When `withenv` returns, the original environment has been restored.

[source](https://github.com/JuliaLang/julia/blob/17cfb8e65ead377bf1b4598d8a9869144142c84e/base/env.jl#L157-L165)
```julia
setcpuaffinity(original_command::Cmd, cpus) -> command::Cmd
```
Set the CPU affinity of the `command` by a list of CPU IDs (1-based) `cpus`. Passing `cpus = nothing` means to unset the CPU affinity if the `original_command` has any.

This function is supported only in Linux and Windows. It is not supported in macOS because libuv does not support affinity setting.

This function requires at least Julia 1.8.

**Examples**

In Linux, the `taskset` command line program can be used to see how `setcpuaffinity` works.


```julia
julia> run(setcpuaffinity(`sh -c 'taskset -p $$'`, [1, 2, 5]));
pid 2273's current affinity mask: 13
```
Note that the mask value `13` reflects that the first, second, and the fifth bits (counting from the least significant position) are turned on:


```julia
julia> 0b010011
0x13
```
[source](https://github.com/JuliaLang/julia/blob/17cfb8e65ead377bf1b4598d8a9869144142c84e/base/cmd.jl#L316-L344)
```julia
pipeline(from, to, ...)
```
Create a pipeline from a data source to a destination. The source and destination can be commands, I/O streams, strings, or results of other `pipeline` calls. At least one argument must be a command. Strings refer to filenames. When called with more than two arguments, they are chained together from left to right. For example, `pipeline(a,b,c)` is equivalent to `pipeline(pipeline(a,b),c)`. This provides a more concise way to specify multi-stage pipelines.

**Examples**:


```julia
run(pipeline(`ls`, `grep xyz`))
run(pipeline(`ls`, "out.txt"))
run(pipeline("out.txt", `grep xyz`))
```
[source](https://github.com/JuliaLang/julia/blob/17cfb8e65ead377bf1b4598d8a9869144142c84e/base/cmd.jl#L400-L417)
```julia
pipeline(command; stdin, stdout, stderr, append=false)
```
Redirect I/O to or from the given `command`. Keyword arguments specify which of the command's streams should be redirected. `append` controls whether file output appends to the file. This is a more general version of the 2-argument `pipeline` function. `pipeline(from, to)` is equivalent to `pipeline(from, stdout=to)` when `from` is a command, and to `pipeline(to, stdin=from)` when `from` is another kind of data source.

**Examples**:


```julia
run(pipeline(`dothings`, stdout="out.txt", stderr="errs.txt"))
run(pipeline(`update`, stdout="log.txt", append=true))
```
[source](https://github.com/JuliaLang/julia/blob/17cfb8e65ead377bf1b4598d8a9869144142c84e/base/cmd.jl#L365-L380)
```julia
gethostname() -> AbstractString
```
Get the local machine's host name.

[source](https://github.com/JuliaLang/julia/blob/17cfb8e65ead377bf1b4598d8a9869144142c84e/base/libc.jl#L262-L266)
```julia
getpid() -> Int32
```
Get Julia's process ID.

[source](https://github.com/JuliaLang/julia/blob/17cfb8e65ead377bf1b4598d8a9869144142c84e/base/libc.jl#L253-L257)
```julia
getpid(process) -> Int32
```
Get the child process ID, if it still exists.

This function requires at least Julia 1.1.

[source](https://github.com/JuliaLang/julia/blob/17cfb8e65ead377bf1b4598d8a9869144142c84e/base/process.jl#L604-L611)
```julia
time()
```
Get the system time in seconds since the epoch, with fairly high (typically, microsecond) resolution.

[source](https://github.com/JuliaLang/julia/blob/17cfb8e65ead377bf1b4598d8a9869144142c84e/base/libc.jl#L244-L248)
```julia
time_ns()
```
Get the time in nanoseconds. The time corresponding to 0 is undefined, and wraps every 5.8 years.

[source](https://github.com/JuliaLang/julia/blob/17cfb8e65ead377bf1b4598d8a9869144142c84e/base/Base.jl#L86-L90)
```julia
@time expr
@time "description" expr
```
A macro to execute an expression, printing the time it took to execute, the number of allocations, and the total number of bytes its execution caused to be allocated, before returning the value of the expression. Any time spent garbage collecting (gc), compiling new code, or recompiling invalidated code is shown as a percentage.

Optionally provide a description string to print before the time report.

In some cases the system will look inside the `@time` expression and compile some of the called code before execution of the top-level expression begins. When that happens, some compilation time will not be counted. To include this time you can run `@time @eval ...`.

See also [`@showtime`](https://docs.julialang.org/#Base.@showtime), [`@timev`](https://docs.julialang.org/#Base.@timev), [`@timed`](https://docs.julialang.org/#Base.@timed), [`@elapsed`](https://docs.julialang.org/#Base.@elapsed), and [`@allocated`](https://docs.julialang.org/#Base.@allocated).

For more serious benchmarking, consider the `@btime` macro from the BenchmarkTools.jl package which among other things evaluates the function multiple times in order to reduce noise.

The option to add a description was introduced in Julia 1.8.

Recompilation time being shown separately from compilation time was introduced in Julia 1.8


```julia
julia> x = rand(10,10);

julia> @time x * x;
  0.606588 seconds (2.19 M allocations: 116.555 MiB, 3.75% gc time, 99.94% compilation time)

julia> @time x * x;
  0.000009 seconds (1 allocation: 896 bytes)

julia> @time begin
           sleep(0.3)
           1+1
       end
  0.301395 seconds (8 allocations: 336 bytes)
2

julia> @time "A one second sleep" sleep(1)
A one second sleep: 1.005750 seconds (5 allocations: 144 bytes)

julia> for loop in 1:3
            @time loop sleep(1)
        end
1: 1.006760 seconds (5 allocations: 144 bytes)
2: 1.001263 seconds (5 allocations: 144 bytes)
3: 1.003676 seconds (5 allocations: 144 bytes)
```
[source](https://github.com/JuliaLang/julia/blob/17cfb8e65ead377bf1b4598d8a9869144142c84e/base/timing.jl#L195-L249)
```julia
@showtime expr
```
Like `@time` but also prints the expression being evaluated for reference.

This macro was added in Julia 1.8.

See also [`@time`](https://docs.julialang.org/#Base.@time).


```julia
julia> @showtime sleep(1)
sleep(1): 1.002164 seconds (4 allocations: 128 bytes)
```
[source](https://github.com/JuliaLang/julia/blob/17cfb8e65ead377bf1b4598d8a9869144142c84e/base/timing.jl#L276-L290)
```julia
@timev expr
@timev "description" expr
```
This is a verbose version of the `@time` macro. It first prints the same information as `@time`, then any non-zero memory allocation counters, and then returns the value of the expression.

Optionally provide a description string to print before the time report.

The option to add a description was introduced in Julia 1.8.

See also [`@time`](https://docs.julialang.org/#Base.@time), [`@timed`](https://docs.julialang.org/#Base.@timed), [`@elapsed`](https://docs.julialang.org/#Base.@elapsed), and [`@allocated`](https://docs.julialang.org/#Base.@allocated).


```julia
julia> x = rand(10,10);

julia> @timev x * x;
  0.546770 seconds (2.20 M allocations: 116.632 MiB, 4.23% gc time, 99.94% compilation time)
elapsed time (ns): 546769547
gc time (ns):      23115606
bytes allocated:   122297811
pool allocs:       2197930
non-pool GC allocs:1327
malloc() calls:    36
realloc() calls:   5
GC pauses:         3

julia> @timev x * x;
  0.000010 seconds (1 allocation: 896 bytes)
elapsed time (ns): 9848
bytes allocated:   896
pool allocs:       1
```
[source](https://github.com/JuliaLang/julia/blob/17cfb8e65ead377bf1b4598d8a9869144142c84e/base/timing.jl#L297-L333)
```julia
@timed
```
A macro to execute an expression, and return the value of the expression, elapsed time, total bytes allocated, garbage collection time, and an object with various memory allocation counters.

In some cases the system will look inside the `@timed` expression and compile some of the called code before execution of the top-level expression begins. When that happens, some compilation time will not be counted. To include this time you can run `@timed @eval ...`.

See also [`@time`](https://docs.julialang.org/#Base.@time), [`@timev`](https://docs.julialang.org/#Base.@timev), [`@elapsed`](https://docs.julialang.org/#Base.@elapsed), and [`@allocated`](https://docs.julialang.org/#Base.@allocated).


```julia
julia> stats = @timed rand(10^6);

julia> stats.time
0.006634834

julia> stats.bytes
8000256

julia> stats.gctime
0.0055765

julia> propertynames(stats.gcstats)
(:allocd, :malloc, :realloc, :poolalloc, :bigalloc, :freecall, :total_time, :pause, :full_sweep)

julia> stats.gcstats.total_time
5576500
```
The return type of this macro was changed from `Tuple` to `NamedTuple` in Julia 1.5.

[source](https://github.com/JuliaLang/julia/blob/17cfb8e65ead377bf1b4598d8a9869144142c84e/base/timing.jl#L422-L457)
```julia
@elapsed
```
A macro to evaluate an expression, discarding the resulting value, instead returning the number of seconds it took to execute as a floating-point number.

In some cases the system will look inside the `@elapsed` expression and compile some of the called code before execution of the top-level expression begins. When that happens, some compilation time will not be counted. To include this time you can run `@elapsed @eval ...`.

See also [`@time`](https://docs.julialang.org/#Base.@time), [`@timev`](https://docs.julialang.org/#Base.@timev), [`@timed`](https://docs.julialang.org/#Base.@timed), and [`@allocated`](https://docs.julialang.org/#Base.@allocated).


```julia
julia> @elapsed sleep(0.3)
0.301391426
```
[source](https://github.com/JuliaLang/julia/blob/17cfb8e65ead377bf1b4598d8a9869144142c84e/base/timing.jl#L360-L377)
```julia
@allocated
```
A macro to evaluate an expression, discarding the resulting value, instead returning the total number of bytes allocated during evaluation of the expression.

See also [`@time`](https://docs.julialang.org/#Base.@time), [`@timev`](https://docs.julialang.org/#Base.@timev), [`@timed`](https://docs.julialang.org/#Base.@timed), and [`@elapsed`](https://docs.julialang.org/#Base.@elapsed).


```julia
julia> @allocated rand(10^6)
8000080
```
[source](https://github.com/JuliaLang/julia/blob/17cfb8e65ead377bf1b4598d8a9869144142c84e/base/timing.jl#L396-L409)
```julia
EnvDict() -> EnvDict
```
A singleton of this type provides a hash table interface to environment variables.

[source](https://github.com/JuliaLang/julia/blob/17cfb8e65ead377bf1b4598d8a9869144142c84e/base/env.jl#L59-L63)
```julia
ENV
```
Reference to the singleton `EnvDict`, providing a dictionary interface to system environment variables.

(On Windows, system environment variables are case-insensitive, and `ENV` correspondingly converts all keys to uppercase for display, iteration, and copying. Portable code should not rely on the ability to distinguish variables by case, and should beware that setting an ostensibly lowercase variable may result in an uppercase `ENV` key.)

[source](https://github.com/JuliaLang/julia/blob/17cfb8e65ead377bf1b4598d8a9869144142c84e/base/env.jl#L66-L76)
```julia
Sys.isbsd([os])
```
Predicate for testing if the OS is a derivative of BSD. See documentation in [Handling Operating System Variation](https://docs.julialang.org/../../manual/handling-operating-system-variation/#Handling-Operating-System-Variation).

The Darwin kernel descends from BSD, which means that `Sys.isbsd()` is `true` on macOS systems. To exclude macOS from a predicate, use `Sys.isbsd() && !Sys.isapple()`.

[source](https://github.com/JuliaLang/julia/blob/17cfb8e65ead377bf1b4598d8a9869144142c84e/base/sysinfo.jl#L352-L362)
```julia
Sys.isfreebsd([os])
```
Predicate for testing if the OS is a derivative of FreeBSD. See documentation in [Handling Operating System Variation](https://docs.julialang.org/../../manual/handling-operating-system-variation/#Handling-Operating-System-Variation).

Not to be confused with `Sys.isbsd()`, which is `true` on FreeBSD but also on other BSD-based systems. `Sys.isfreebsd()` refers only to FreeBSD.

This function requires at least Julia 1.1.

[source](https://github.com/JuliaLang/julia/blob/17cfb8e65ead377bf1b4598d8a9869144142c84e/base/sysinfo.jl#L365-L376)
```julia
Sys.isopenbsd([os])
```
Predicate for testing if the OS is a derivative of OpenBSD. See documentation in [Handling Operating System Variation](https://docs.julialang.org/../../manual/handling-operating-system-variation/#Handling-Operating-System-Variation).

Not to be confused with `Sys.isbsd()`, which is `true` on OpenBSD but also on other BSD-based systems. `Sys.isopenbsd()` refers only to OpenBSD.

This function requires at least Julia 1.1.

[source](https://github.com/JuliaLang/julia/blob/17cfb8e65ead377bf1b4598d8a9869144142c84e/base/sysinfo.jl#L379-L390)
```julia
Sys.isnetbsd([os])
```
Predicate for testing if the OS is a derivative of NetBSD. See documentation in [Handling Operating System Variation](https://docs.julialang.org/../../manual/handling-operating-system-variation/#Handling-Operating-System-Variation).

Not to be confused with `Sys.isbsd()`, which is `true` on NetBSD but also on other BSD-based systems. `Sys.isnetbsd()` refers only to NetBSD.

This function requires at least Julia 1.1.

[source](https://github.com/JuliaLang/julia/blob/17cfb8e65ead377bf1b4598d8a9869144142c84e/base/sysinfo.jl#L393-L404)
```julia
Sys.isdragonfly([os])
```
Predicate for testing if the OS is a derivative of DragonFly BSD. See documentation in [Handling Operating System Variation](https://docs.julialang.org/../../manual/handling-operating-system-variation/#Handling-Operating-System-Variation).

Not to be confused with `Sys.isbsd()`, which is `true` on DragonFly but also on other BSD-based systems. `Sys.isdragonfly()` refers only to DragonFly.

This function requires at least Julia 1.1.

[source](https://github.com/JuliaLang/julia/blob/17cfb8e65ead377bf1b4598d8a9869144142c84e/base/sysinfo.jl#L407-L418)
```julia
Sys.windows_version()
```
Return the version number for the Windows NT Kernel as a `VersionNumber`, i.e. `v"major.minor.build"`, or `v"0.0.0"` if this is not running on Windows.

[source](https://github.com/JuliaLang/julia/blob/17cfb8e65ead377bf1b4598d8a9869144142c84e/base/sysinfo.jl#L461-L466)
```julia
Sys.free_memory()
```
Get the total free memory in RAM in bytes.

[source](https://github.com/JuliaLang/julia/blob/17cfb8e65ead377bf1b4598d8a9869144142c84e/base/sysinfo.jl#L267-L271)
```julia
Sys.total_memory()
```
Get the total memory in RAM (including that which is currently used) in bytes. This amount may be constrained, e.g., by Linux control groups. For the unconstrained amount, see `Sys.physical_memory()`.

[source](https://github.com/JuliaLang/julia/blob/17cfb8e65ead377bf1b4598d8a9869144142c84e/base/sysinfo.jl#L274-L280)
```julia
Sys.free_physical_memory()
```
Get the free memory of the system in bytes. The entire amount may not be available to the current process; use `Sys.free_memory()` for the actually available amount.

[source](https://github.com/JuliaLang/julia/blob/17cfb8e65ead377bf1b4598d8a9869144142c84e/base/sysinfo.jl#L251-L256)
```julia
Sys.total_physical_memory()
```
Get the total memory in RAM (including that which is currently used) in bytes. The entire amount may not be available to the current process; see `Sys.total_memory()`.

[source](https://github.com/JuliaLang/julia/blob/17cfb8e65ead377bf1b4598d8a9869144142c84e/base/sysinfo.jl#L259-L264)
```julia
@static
```
Partially evaluate an expression at parse time.

For example, `@static Sys.iswindows() ? foo : bar` will evaluate `Sys.iswindows()` and insert either `foo` or `bar` into the expression. This is useful in cases where a construct would be invalid on other platforms, such as a `ccall` to a non-existent function. `@static if Sys.isapple() foo end` and `@static foo <&&,||> bar` are also valid syntax.

[source](https://github.com/JuliaLang/julia/blob/17cfb8e65ead377bf1b4598d8a9869144142c84e/base/osutils.jl#L3-L13)
```julia
VersionNumber
```
Version number type which follows the specifications of [semantic versioning (semver)](https://semver.org/), composed of major, minor and patch numeric values, followed by pre-release and build alpha-numeric annotations.

`VersionNumber` objects can be compared with all of the standard comparison operators (`==`, `<`, `<=`, etc.), with the result following semver rules.

See also [`@v_str`](https://docs.julialang.org/#Base.@v_str) to efficiently construct `VersionNumber` objects from semver-format literal strings, [`VERSION`](https://docs.julialang.org/../constants/#Base.VERSION) for the `VersionNumber` of Julia itself, and [Version Number Literals](https://docs.julialang.org/../../manual/strings/#man-version-number-literals) in the manual.

**Examples**


```julia
julia> a = VersionNumber(1, 2, 3)
v"1.2.3"

julia> a >= v"1.2"
true

julia> b = VersionNumber("2.0.1-rc1")
v"2.0.1-rc1"

julia> b >= v"2.0.1"
false
```
[source](https://github.com/JuliaLang/julia/blob/17cfb8e65ead377bf1b4598d8a9869144142c84e/base/version.jl#L8-L38)
```julia
@v_str
```
String macro used to parse a string to a [`VersionNumber`](https://docs.julialang.org/#Base.VersionNumber).

**Examples**


```julia
julia> v"1.2.3"
v"1.2.3"

julia> v"2.0.1-rc1"
v"2.0.1-rc1"
```
[source](https://github.com/JuliaLang/julia/blob/17cfb8e65ead377bf1b4598d8a9869144142c84e/base/version.jl#L146-L159)
```julia
error(message::AbstractString)
```
Raise an `ErrorException` with the given message.

[source](https://github.com/JuliaLang/julia/blob/17cfb8e65ead377bf1b4598d8a9869144142c84e/base/error.jl#L30-L34)
```julia
error(msg...)
```
Raise an `ErrorException` with the given message.

[source](https://github.com/JuliaLang/julia/blob/17cfb8e65ead377bf1b4598d8a9869144142c84e/base/error.jl#L37-L41)
```julia
rethrow()
```
Rethrow the current exception from within a `catch` block. The rethrown exception will continue propagation as if it had not been caught.

The alternative form `rethrow(e)` allows you to associate an alternative exception object `e` with the current backtrace. However this misrepresents the program state at the time of the error so you're encouraged to instead throw a new exception using `throw(e)`. In Julia 1.1 and above, using `throw(e)` will preserve the root cause exception on the stack, as described in [`current_exceptions`](#Base.current_exceptions).

[source](https://github.com/JuliaLang/julia/blob/17cfb8e65ead377bf1b4598d8a9869144142c84e/base/error.jl#L47-L60)
```julia
backtrace()
```
Get a backtrace object for the current program point.

[source](https://github.com/JuliaLang/julia/blob/17cfb8e65ead377bf1b4598d8a9869144142c84e/base/error.jl#L104-L108)
```julia
catch_backtrace()
```
Get the backtrace of the current exception, for use within `catch` blocks.

[source](https://github.com/JuliaLang/julia/blob/17cfb8e65ead377bf1b4598d8a9869144142c84e/base/error.jl#L118-L122)
```julia
current_exceptions(task::Task=current_task(); [backtrace::Bool=true])
```
Get the stack of exceptions currently being handled. For nested catch blocks there may be more than one current exception in which case the most recently thrown exception is last in the stack. The stack is returned as an `ExceptionStack` which is an AbstractVector of named tuples `(exception,backtrace)`. If `backtrace` is false, the backtrace in each pair will be set to `nothing`.

Explicitly passing `task` will return the current exception stack on an arbitrary task. This is useful for inspecting tasks which have failed due to uncaught exceptions.

This function went by the experimental name `catch_stack()` in Julia 1.1–1.6, and had a plain Vector-of-tuples as a return type.

[source](https://github.com/JuliaLang/julia/blob/17cfb8e65ead377bf1b4598d8a9869144142c84e/base/error.jl#L132-L149)
```julia
@assert cond [text]
```
Throw an [`AssertionError`](https://docs.julialang.org/#Core.AssertionError) if `cond` is `false`. Preferred syntax for writing assertions. Message `text` is optionally displayed upon assertion failure.

An assert might be disabled at various optimization levels. Assert should therefore only be used as a debugging tool and not used for authentication verification (e.g., verifying passwords), nor should side effects needed for the function to work correctly be used inside of asserts.

**Examples**


```julia
julia> @assert iseven(3) "3 is an odd number!"
ERROR: AssertionError: 3 is an odd number!

julia> @assert isodd(3) "What even are numbers?"
```
[source](https://github.com/JuliaLang/julia/blob/17cfb8e65ead377bf1b4598d8a9869144142c84e/base/error.jl#L197-L217)
```julia
Experimental.register_error_hint(handler, exceptiontype)
```
Register a "hinting" function `handler(io, exception)` that can suggest potential ways for users to circumvent errors. `handler` should examine `exception` to see whether the conditions appropriate for a hint are met, and if so generate output to `io`. Packages should call `register_error_hint` from within their `__init__` function.

For specific exception types, `handler` is required to accept additional arguments:

* `MethodError`: provide `handler(io, exc::MethodError, argtypes, kwargs)`, which splits the combined arguments into positional and keyword arguments.

When issuing a hint, the output should typically start with `n`.

If you define custom exception types, your `showerror` method can support hints by calling [`Experimental.show_error_hints`](https://docs.julialang.org/#Base.Experimental.show_error_hints).

**Example**


```julia
julia> module Hinter

       only_int(x::Int)      = 1
       any_number(x::Number) = 2

       function __init__()
           Base.Experimental.register_error_hint(MethodError) do io, exc, argtypes, kwargs
               if exc.f == only_int
                    # Color is not necessary, this is just to show it's possible.
                    print(io, "nDid you mean to call ")
                    printstyled(io, "`any_number`?", color=:cyan)
               end
           end
       end

       end
```
Then if you call `Hinter.only_int` on something that isn't an `Int` (thereby triggering a `MethodError`), it issues the hint:


```julia
julia> Hinter.only_int(1.0)
ERROR: MethodError: no method matching only_int(::Float64)
Did you mean to call `any_number`?
Closest candidates are:
    ...
```
Custom error hints are available as of Julia 1.5.

This interface is experimental and subject to change or removal without notice. To insulate yourself against changes, consider putting any registrations inside an `if isdefined(Base.Experimental, :register_error_hint) ... end` block.

[source](https://github.com/JuliaLang/julia/blob/17cfb8e65ead377bf1b4598d8a9869144142c84e/base/experimental.jl#L212-L269)
```julia
Experimental.show_error_hints(io, ex, args...)
```
Invoke all handlers from [`Experimental.register_error_hint`](https://docs.julialang.org/#Base.Experimental.register_error_hint) for the particular exception type `typeof(ex)`. `args` must contain any other arguments expected by the handler for that type.

Custom error hints are available as of Julia 1.5.

This interface is experimental and subject to change or removal without notice.

[source](https://github.com/JuliaLang/julia/blob/17cfb8e65ead377bf1b4598d8a9869144142c84e/base/experimental.jl#L278-L289)
```julia
ArgumentError(msg)
```
The arguments passed to a function are invalid. `msg` is a descriptive error message.

[source](https://github.com/JuliaLang/julia/blob/17cfb8e65ead377bf1b4598d8a9869144142c84e/base/docs/basedocs.jl#L2440-L2445)
```julia
AssertionError([msg])
```
The asserted condition did not evaluate to `true`. Optional argument `msg` is a descriptive error string.

**Examples**


```julia
julia> @assert false "this is not true"
ERROR: AssertionError: this is not true
```
`AssertionError` is usually thrown from [`@assert`](#Base.@assert).

[source](https://github.com/JuliaLang/julia/blob/17cfb8e65ead377bf1b4598d8a9869144142c84e/base/docs/basedocs.jl#L2456-L2469)
```julia
BoundsError([a],[i])
```
An indexing operation into an array, `a`, tried to access an out-of-bounds element at index `i`.

**Examples**


```julia
julia> A = fill(1.0, 7);

julia> A[8]
ERROR: BoundsError: attempt to access 7-element Vector{Float64} at index [8]


julia> B = fill(1.0, (2,3));

julia> B[2, 4]
ERROR: BoundsError: attempt to access 2×3 Matrix{Float64} at index [2, 4]


julia> B[9]
ERROR: BoundsError: attempt to access 2×3 Matrix{Float64} at index [9]

```
[source](https://github.com/JuliaLang/julia/blob/17cfb8e65ead377bf1b4598d8a9869144142c84e/base/docs/basedocs.jl#L1475-L1498)
```julia
CompositeException
```
Wrap a `Vector` of exceptions thrown by a [`Task`](https://docs.julialang.org/../parallel/#Core.Task) (e.g. generated from a remote worker over a channel or an asynchronously executing local I/O write or a remote worker under `pmap`) with information about the series of exceptions. For example, if a group of workers are executing several tasks, and multiple workers fail, the resulting `CompositeException` will contain a "bundle" of information from each worker indicating where and why the exception(s) occurred.

[source](https://github.com/JuliaLang/julia/blob/17cfb8e65ead377bf1b4598d8a9869144142c84e/base/task.jl#L38-L45)
```julia
DimensionMismatch([msg])
```
The objects called do not have matching dimensionality. Optional argument `msg` is a descriptive error string.

[source](https://github.com/JuliaLang/julia/blob/17cfb8e65ead377bf1b4598d8a9869144142c84e/base/array.jl#L5-L10)
```julia
DivideError()
```
Integer division was attempted with a denominator value of 0.

**Examples**


```julia
julia> 2/0
Inf

julia> div(2, 0)
ERROR: DivideError: integer division error
Stacktrace:
[...]
```
[source](https://github.com/JuliaLang/julia/blob/17cfb8e65ead377bf1b4598d8a9869144142c84e/base/docs/basedocs.jl#L1757-L1772)
```julia
DomainError(val)
DomainError(val, msg)
```
The argument `val` to a function or constructor is outside the valid domain.

**Examples**


```julia
julia> sqrt(-1)
ERROR: DomainError with -1.0:
sqrt will only return a complex result if called with a complex argument. Try sqrt(Complex(x)).
Stacktrace:
[...]
```
[source](https://github.com/JuliaLang/julia/blob/17cfb8e65ead377bf1b4598d8a9869144142c84e/base/docs/basedocs.jl#L1516-L1530)
```julia
EOFError()
```
No more data was available to read from a file or stream.

[source](https://github.com/JuliaLang/julia/blob/17cfb8e65ead377bf1b4598d8a9869144142c84e/base/io.jl#L5-L9)
```julia
ErrorException(msg)
```
Generic error type. The error message, in the `.msg` field, may provide more specific details.

**Examples**


```julia
julia> ex = ErrorException("I've done a bad thing");

julia> ex.msg
"I've done a bad thing"
```
[source](https://github.com/JuliaLang/julia/blob/17cfb8e65ead377bf1b4598d8a9869144142c84e/base/docs/basedocs.jl#L1382-L1394)
```julia
InexactError(name::Symbol, T, val)
```
Cannot exactly convert `val` to type `T` in a method of function `name`.

**Examples**


```julia
julia> convert(Float64, 1+2im)
ERROR: InexactError: Float64(1 + 2im)
Stacktrace:
[...]
```
[source](https://github.com/JuliaLang/julia/blob/17cfb8e65ead377bf1b4598d8a9869144142c84e/base/docs/basedocs.jl#L1501-L1513)
```julia
InterruptException()
```
The process was stopped by a terminal interrupt (CTRL+C).

Note that, in Julia script started without `-i` (interactive) option, `InterruptException` is not thrown by default. Calling [`Base.exit_on_sigint(false)`](https://docs.julialang.org/../c/#Base.exit_on_sigint) in the script can recover the behavior of the REPL. Alternatively, a Julia script can be started with


```julia
julia -e "include(popfirst!(ARGS))" script.jl
```
to let `InterruptException` be thrown by CTRL+C during the execution.

[source](https://github.com/JuliaLang/julia/blob/17cfb8e65ead377bf1b4598d8a9869144142c84e/base/docs/basedocs.jl#L1642-L1658)
```julia
KeyError(key)
```
An indexing operation into an `AbstractDict` (`Dict`) or `Set` like object tried to access or delete a non-existent element.

[source](https://github.com/JuliaLang/julia/blob/17cfb8e65ead377bf1b4598d8a9869144142c84e/base/abstractdict.jl#L5-L10)
```julia
LoadError(file::AbstractString, line::Int, error)
```
An error occurred while [`include`](https://docs.julialang.org/#Base.include)ing, [`require`](https://docs.julialang.org/#Base.require)ing, or [`using`](https://docs.julialang.org/#using) a file. The error specifics should be available in the `.error` field.

LoadErrors are no longer emitted by `@macroexpand`, `@macroexpand1`, and `macroexpand` as of Julia 1.7.

[source](https://github.com/JuliaLang/julia/blob/17cfb8e65ead377bf1b4598d8a9869144142c84e/base/docs/basedocs.jl#L2472-L2480)
```julia
MethodError(f, args)
```
A method with the required type signature does not exist in the given generic function. Alternatively, there is no unique most-specific method.

[source](https://github.com/JuliaLang/julia/blob/17cfb8e65ead377bf1b4598d8a9869144142c84e/base/docs/basedocs.jl#L2448-L2453)
```julia
MissingException(msg)
```
Exception thrown when a [`missing`](https://docs.julialang.org/#Base.missing) value is encountered in a situation where it is not supported. The error message, in the `msg` field may provide more specific details.

[source](https://github.com/JuliaLang/julia/blob/17cfb8e65ead377bf1b4598d8a9869144142c84e/base/missing.jl#L7-L13)
```julia
OutOfMemoryError()
```
An operation allocated too much memory for either the system or the garbage collector to handle properly.

[source](https://github.com/JuliaLang/julia/blob/17cfb8e65ead377bf1b4598d8a9869144142c84e/base/docs/basedocs.jl#L1467-L1472)
```julia
ReadOnlyMemoryError()
```
An operation tried to write to memory that is read-only.

[source](https://github.com/JuliaLang/julia/blob/17cfb8e65ead377bf1b4598d8a9869144142c84e/base/docs/basedocs.jl#L1375-L1379)
```julia
OverflowError(msg)
```
The result of an expression is too large for the specified type and will cause a wraparound.

[source](https://github.com/JuliaLang/julia/blob/17cfb8e65ead377bf1b4598d8a9869144142c84e/base/docs/basedocs.jl#L1628-L1632)
```julia
ProcessFailedException
```
Indicates problematic exit status of a process. When running commands or pipelines, this is thrown to indicate a nonzero exit code was returned (i.e. that the invoked process failed).

[source](https://github.com/JuliaLang/julia/blob/17cfb8e65ead377bf1b4598d8a9869144142c84e/base/process.jl#L539-L545)
```julia
StackOverflowError()
```
The function call grew beyond the size of the call stack. This usually happens when a call recurses infinitely.

[source](https://github.com/JuliaLang/julia/blob/17cfb8e65ead377bf1b4598d8a9869144142c84e/base/docs/basedocs.jl#L1551-L1556)
```julia
SystemError(prefix::AbstractString, [errno::Int32])
```
A system call failed with an error code (in the `errno` global variable).

[source](https://github.com/JuliaLang/julia/blob/17cfb8e65ead377bf1b4598d8a9869144142c84e/base/io.jl#L12-L16)
```julia
TypeError(func::Symbol, context::AbstractString, expected::Type, got)
```
A type assertion failure, or calling an intrinsic function with an incorrect argument type.

[source](https://github.com/JuliaLang/julia/blob/17cfb8e65ead377bf1b4598d8a9869144142c84e/base/docs/basedocs.jl#L1635-L1639)
```julia
UndefKeywordError(var::Symbol)
```
The required keyword argument `var` was not assigned in a function call.

**Examples**


```julia
julia> function my_func(;my_arg)
           return my_arg + 1
       end
my_func (generic function with 1 method)

julia> my_func()
ERROR: UndefKeywordError: keyword argument my_arg not assigned
Stacktrace:
 [1] my_func() at ./REPL[1]:2
 [2] top-level scope at REPL[2]:1
```
[source](https://github.com/JuliaLang/julia/blob/17cfb8e65ead377bf1b4598d8a9869144142c84e/base/docs/basedocs.jl#L1607-L1625)
```julia
UndefRefError()
```
The item or field is not defined for the given object.

**Examples**


```julia
julia> struct MyType
           a::Vector{Int}
           MyType() = new()
       end

julia> A = MyType()
MyType(#undef)

julia> A.a
ERROR: UndefRefError: access to undefined reference
Stacktrace:
[...]
```
[source](https://github.com/JuliaLang/julia/blob/17cfb8e65ead377bf1b4598d8a9869144142c84e/base/docs/basedocs.jl#L1406-L1426)
```julia
UndefVarError(var::Symbol)
```
A symbol in the current scope is not defined.

**Examples**


```julia
julia> a
ERROR: UndefVarError: a not defined

julia> a = 1;

julia> a
1
```
[source](https://github.com/JuliaLang/julia/blob/17cfb8e65ead377bf1b4598d8a9869144142c84e/base/docs/basedocs.jl#L1589-L1604)
```julia
StringIndexError(str, i)
```
An error occurred when trying to access `str` at index `i` that is not valid.

[source](https://github.com/JuliaLang/julia/blob/17cfb8e65ead377bf1b4598d8a9869144142c84e/base/strings/string.jl#L3-L7)
```julia
InitError(mod::Symbol, error)
```
An error occurred when running a module's `__init__` function. The actual error thrown is available in the `.error` field.

[source](https://github.com/JuliaLang/julia/blob/17cfb8e65ead377bf1b4598d8a9869144142c84e/base/docs/basedocs.jl#L2483-L2488)
```julia
retry(f;  delays=ExponentialBackOff(), check=nothing) -> Function
```
Return an anonymous function that calls function `f`. If an exception arises, `f` is repeatedly called again, each time `check` returns `true`, after waiting the number of seconds specified in `delays`. `check` should input `delays`'s current state and the `Exception`.

Before Julia 1.2 this signature was restricted to `f::Function`.

**Examples**


```julia
retry(f, delays=fill(5.0, 3))
retry(f, delays=rand(5:10, 2))
retry(f, delays=Base.ExponentialBackOff(n=3, first_delay=5, max_delay=1000))
retry(http_get, check=(s,e)->e.status == "503")(url)
retry(read, check=(s,e)->isa(e, IOError))(io, 128; all=false)
```
[source](https://github.com/JuliaLang/julia/blob/17cfb8e65ead377bf1b4598d8a9869144142c84e/base/error.jl#L270-L289)
```julia
ExponentialBackOff(; n=1, first_delay=0.05, max_delay=10.0, factor=5.0, jitter=0.1)
```
A [`Float64`](https://docs.julialang.org/../numbers/#Core.Float64) iterator of length `n` whose elements exponentially increase at a rate in the interval `factor` * (1 ± `jitter`). The first element is `first_delay` and all elements are clamped to `max_delay`.

[source](https://github.com/JuliaLang/julia/blob/17cfb8e65ead377bf1b4598d8a9869144142c84e/base/error.jl#L251-L257)
```julia
Timer(callback::Function, delay; interval = 0)
```
Create a timer that runs the function `callback` at each timer expiration.

Waiting tasks are woken and the function `callback` is called after an initial delay of `delay` seconds, and then repeating with the given `interval` in seconds. If `interval` is equal to `0`, the callback is only run once. The function `callback` is called with a single argument, the timer itself. Stop a timer by calling `close`. The `cb` may still be run one final time, if the timer has already expired.

**Examples**

Here the first number is printed after a delay of two seconds, then the following numbers are printed quickly.


```julia
julia> begin
           i = 0
           cb(timer) = (global i += 1; println(i))
           t = Timer(cb, 2, interval=0.2)
           wait(t)
           sleep(0.5)
           close(t)
       end
1
2
3
```
[source](https://github.com/JuliaLang/julia/blob/17cfb8e65ead377bf1b4598d8a9869144142c84e/base/asyncevent.jl#L245-L274)
```julia
Timer(delay; interval = 0)
```
Create a timer that wakes up tasks waiting for it (by calling [`wait`](https://docs.julialang.org/../parallel/#Base.wait) on the timer object).

Waiting tasks are woken after an initial delay of at least `delay` seconds, and then repeating after at least `interval` seconds again elapse. If `interval` is equal to `0`, the timer is only triggered once. When the timer is closed (by [`close`](https://docs.julialang.org/../io-network/#Base.close)) waiting tasks are woken with an error. Use [`isopen`](https://docs.julialang.org/../io-network/#Base.isopen) to check whether a timer is still active.

`interval` is subject to accumulating time skew. If you need precise events at a particular absolute time, create a new timer at each expiration with the difference to the next time computed.

A `Timer` requires yield points to update its state. For instance, `isopen(t::Timer)` cannot be used to timeout a non-yielding while loop.

[source](https://github.com/JuliaLang/julia/blob/17cfb8e65ead377bf1b4598d8a9869144142c84e/base/asyncevent.jl#L69-L87)
```julia
AsyncCondition()
```
Create a async condition that wakes up tasks waiting for it (by calling [`wait`](https://docs.julialang.org/../parallel/#Base.wait) on the object) when notified from C by a call to `uv_async_send`. Waiting tasks are woken with an error when the object is closed (by [`close`](https://docs.julialang.org/../io-network/#Base.close)). Use [`isopen`](https://docs.julialang.org/../io-network/#Base.isopen) to check whether it is still active.

This provides an implicit acquire & release memory ordering between the sending and waiting threads.

[source](https://github.com/JuliaLang/julia/blob/17cfb8e65ead377bf1b4598d8a9869144142c84e/base/asyncevent.jl#L5-L15)
```julia
AsyncCondition(callback::Function)
```
Create a async condition that calls the given `callback` function. The `callback` is passed one argument, the async condition object itself.

[source](https://github.com/JuliaLang/julia/blob/17cfb8e65ead377bf1b4598d8a9869144142c84e/base/asyncevent.jl#L40-L45)
```julia
nameof(m::Module) -> Symbol
```
Get the name of a `Module` as a [`Symbol`](https://docs.julialang.org/#Core.Symbol).

**Examples**


```julia
julia> nameof(Base.Broadcast)
:Broadcast
```
[source](https://github.com/JuliaLang/julia/blob/17cfb8e65ead377bf1b4598d8a9869144142c84e/base/reflection.jl#L5-L15)
```julia
parentmodule(m::Module) -> Module
```
Get a module's enclosing `Module`. `Main` is its own parent.

See also: [`names`](https://docs.julialang.org/#Base.names), [`nameof`](https://docs.julialang.org/#Base.nameof-Tuple%7BDataType%7D), [`fullname`](https://docs.julialang.org/#Base.fullname), [`@__MODULE__`](https://docs.julialang.org/#Base.@__MODULE__).

**Examples**


```julia
julia> parentmodule(Main)
Main

julia> parentmodule(Base.Broadcast)
Base
```
[source](https://github.com/JuliaLang/julia/blob/17cfb8e65ead377bf1b4598d8a9869144142c84e/base/reflection.jl#L18-L33)
```julia
parentmodule(t::DataType) -> Module
```
Determine the module containing the definition of a (potentially `UnionAll`-wrapped) `DataType`.

**Examples**


```julia
julia> module Foo
           struct Int end
       end
Foo

julia> parentmodule(Int)
Core

julia> parentmodule(Foo.Int)
Foo
```
[source](https://github.com/JuliaLang/julia/blob/17cfb8e65ead377bf1b4598d8a9869144142c84e/base/reflection.jl#L241-L259)
```julia
parentmodule(f::Function) -> Module
```
Determine the module containing the (first) definition of a generic function.

[source](https://github.com/JuliaLang/julia/blob/17cfb8e65ead377bf1b4598d8a9869144142c84e/base/reflection.jl#L1459-L1464)
```julia
parentmodule(f::Function, types) -> Module
```
Determine the module containing a given definition of a generic function.

[source](https://github.com/JuliaLang/julia/blob/17cfb8e65ead377bf1b4598d8a9869144142c84e/base/reflection.jl#L1467-L1471)
```julia
pathof(m::Module)
```
Return the path of the `m.jl` file that was used to `import` module `m`, or `nothing` if `m` was not imported from a package.

Use [`dirname`](https://docs.julialang.org/../file/#Base.Filesystem.dirname) to get the directory part and [`basename`](https://docs.julialang.org/../file/#Base.Filesystem.basename) to get the file name part of the path.

[source](https://github.com/JuliaLang/julia/blob/17cfb8e65ead377bf1b4598d8a9869144142c84e/base/loading.jl#L362-L370)
```julia
pkgdir(m::Module[, paths::String...])
```
Return the root directory of the package that imported module `m`, or `nothing` if `m` was not imported from a package. Optionally further path component strings can be provided to construct a path within the package root.


```julia
julia> pkgdir(Foo)
"/path/to/Foo.jl"

julia> pkgdir(Foo, "src", "file.jl")
"/path/to/Foo.jl/src/file.jl"
```
The optional argument `paths` requires at least Julia 1.7.

[source](https://github.com/JuliaLang/julia/blob/17cfb8e65ead377bf1b4598d8a9869144142c84e/base/loading.jl#L383-L401)
```julia
moduleroot(m::Module) -> Module
```
Find the root module of a given module. This is the first module in the chain of parent modules of `m` which is either a registered root module or which is its own parent module.

[source](https://github.com/JuliaLang/julia/blob/17cfb8e65ead377bf1b4598d8a9869144142c84e/base/reflection.jl#L36-L42)
```julia
__module__
```
The argument `__module__` is only visible inside the macro, and it provides information (in the form of a `Module` object) about the expansion context of the macro invocation. See the manual section on [Macro invocation](https://docs.julialang.org/../../manual/metaprogramming/#Macro-invocation) for more information.

[source](https://github.com/JuliaLang/julia/blob/17cfb8e65ead377bf1b4598d8a9869144142c84e/base/docs/basedocs.jl#L214-L220)
```julia
__source__
```
The argument `__source__` is only visible inside the macro, and it provides information (in the form of a `LineNumberNode` object) about the parser location of the `@` sign from the macro invocation. See the manual section on [Macro invocation](https://docs.julialang.org/../../manual/metaprogramming/#Macro-invocation) for more information.

[source](https://github.com/JuliaLang/julia/blob/17cfb8e65ead377bf1b4598d8a9869144142c84e/base/docs/basedocs.jl#L223-L229)
```julia
@__MODULE__ -> Module
```
Get the `Module` of the toplevel eval, which is the `Module` code is currently being read from.

[source](https://github.com/JuliaLang/julia/blob/17cfb8e65ead377bf1b4598d8a9869144142c84e/base/reflection.jl#L52-L57)
```julia
@__FILE__ -> AbstractString
```
Expand to a string with the path to the file containing the macrocall, or an empty string if evaluated by `julia -e <expr>`. Return `nothing` if the macro was missing parser source information. Alternatively see [`PROGRAM_FILE`](../constants/#Base.PROGRAM_FILE).

[source](https://github.com/JuliaLang/julia/blob/17cfb8e65ead377bf1b4598d8a9869144142c84e/base/loading.jl#L2178-L2185)
```julia
@__DIR__ -> AbstractString
```
Expand to a string with the absolute path to the directory of the file containing the macrocall. Return the current working directory if run from a REPL or if evaluated by `julia -e <expr>`.

[source](https://github.com/JuliaLang/julia/blob/17cfb8e65ead377bf1b4598d8a9869144142c84e/base/loading.jl#L2191-L2197)
```julia
@__LINE__ -> Int
```
Expand to the line number of the location of the macrocall. Return `0` if the line number could not be determined.

[source](https://github.com/JuliaLang/julia/blob/17cfb8e65ead377bf1b4598d8a9869144142c84e/base/essentials.jl#L871-L876)
```julia
fullname(m::Module)
```
Get the fully-qualified name of a module as a tuple of symbols. For example,

**Examples**


```julia
julia> fullname(Base.Iterators)
(:Base, :Iterators)

julia> fullname(Main)
(:Main,)
```
[source](https://github.com/JuliaLang/julia/blob/17cfb8e65ead377bf1b4598d8a9869144142c84e/base/reflection.jl#L62-L75)
```julia
names(x::Module; all::Bool = false, imported::Bool = false)
```
Get an array of the names exported by a `Module`, excluding deprecated names. If `all` is true, then the list also includes non-exported names defined in the module, deprecated names, and compiler-generated names. If `imported` is true, then names explicitly imported from other modules are also included.

As a special case, all names defined in `Main` are considered "exported", since it is not idiomatic to explicitly export names from `Main`.

See also: [`@locals`](https://docs.julialang.org/#Base.@locals), [`@__MODULE__`](#Base.@__MODULE__).

[source](https://github.com/JuliaLang/julia/blob/17cfb8e65ead377bf1b4598d8a9869144142c84e/base/reflection.jl#L88-L101)
```julia
nameof(f::Function) -> Symbol
```
Get the name of a generic `Function` as a symbol. For anonymous functions, this is a compiler-generated name. For explicitly-declared subtypes of `Function`, it is the name of the function's type.

[source](https://github.com/JuliaLang/julia/blob/17cfb8e65ead377bf1b4598d8a9869144142c84e/base/reflection.jl#L1437-L1443)
```julia
functionloc(f::Function, types)
```
Returns a tuple `(filename,line)` giving the location of a generic `Function` definition.

[source](https://github.com/JuliaLang/julia/blob/17cfb8e65ead377bf1b4598d8a9869144142c84e/base/methodshow.jl#L173-L177)
```julia
functionloc(m::Method)
```
Returns a tuple `(filename,line)` giving the location of a `Method` definition.

[source](https://github.com/JuliaLang/julia/blob/17cfb8e65ead377bf1b4598d8a9869144142c84e/base/methodshow.jl#L160-L164)
```julia
@locals()
```
Construct a dictionary of the names (as symbols) and values of all local variables defined as of the call site.

This macro requires at least Julia 1.1.

**Examples**


```julia
julia> let x = 1, y = 2
           Base.@locals
       end
Dict{Symbol, Any} with 2 entries:
  :y => 2
  :x => 1

julia> function f(x)
           local y
           show(Base.@locals); println()
           for i = 1:1
               show(Base.@locals); println()
           end
           y = 2
           show(Base.@locals); println()
           nothing
       end;

julia> f(42)
Dict{Symbol, Any}(:x => 42)
Dict{Symbol, Any}(:i => 1, :x => 42)
Dict{Symbol, Any}(:y => 2, :x => 42)
```
[source](https://github.com/JuliaLang/julia/blob/17cfb8e65ead377bf1b4598d8a9869144142c84e/base/reflection.jl#L294-L328)
```julia
GC.gc([full=true])
```
Perform garbage collection. The argument `full` determines the kind of collection: A full collection (default) sweeps all objects, which makes the next GC scan much slower, while an incremental collection may only sweep so-called young objects.

Excessive use will likely lead to poor performance.

[source](https://github.com/JuliaLang/julia/blob/17cfb8e65ead377bf1b4598d8a9869144142c84e/base/gcutils.jl#L82-L92)
```julia
GC.enable(on::Bool)
```
Control whether garbage collection is enabled using a boolean argument (`true` for enabled, `false` for disabled). Return previous GC state.

Disabling garbage collection should be used only with caution, as it can cause memory use to grow without bound.

[source](https://github.com/JuliaLang/julia/blob/17cfb8e65ead377bf1b4598d8a9869144142c84e/base/gcutils.jl#L96-L105)
```julia
GC.@preserve x1 x2 ... xn expr
```
Mark the objects `x1, x2, ...` as being *in use* during the evaluation of the expression `expr`. This is only required in unsafe code where `expr` *implicitly uses* memory or other resources owned by one of the `x`s.

*Implicit use* of `x` covers any indirect use of resources logically owned by `x` which the compiler cannot see. Some examples:

* Accessing memory of an object directly via a `Ptr`
* Passing a pointer to `x` to `ccall`
* Using resources of `x` which would be cleaned up in the finalizer.

`@preserve` should generally not have any performance impact in typical use cases where it briefly extends object lifetime. In implementation, `@preserve` has effects such as protecting dynamically allocated objects from garbage collection.

**Examples**

When loading from a pointer with `unsafe_load`, the underlying object is implicitly used, for example `x` is implicitly used by `unsafe_load(p)` in the following:


```julia
julia> let
           x = Ref{Int}(101)
           p = Base.unsafe_convert(Ptr{Int}, x)
           GC.@preserve x unsafe_load(p)
       end
101
```
When passing pointers to `ccall`, the pointed-to object is implicitly used and should be preserved. (Note however that you should normally just pass `x` directly to `ccall` which counts as an explicit use.)


```julia
julia> let
           x = "Hello"
           p = pointer(x)
           Int(GC.@preserve x @ccall strlen(p::Cstring)::Csize_t)
           # Preferred alternative
           Int(@ccall strlen(x::Cstring)::Csize_t)
       end
5
```
[source](https://github.com/JuliaLang/julia/blob/17cfb8e65ead377bf1b4598d8a9869144142c84e/base/gcutils.jl#L129-L176)
```julia
GC.safepoint()
```
Inserts a point in the program where garbage collection may run. This can be useful in rare cases in multi-threaded programs where some threads are allocating memory (and hence may need to run GC) but other threads are doing only simple operations (no allocation, task switches, or I/O). Calling this function periodically in non-allocating threads allows garbage collection to run.

This function is available as of Julia 1.4.

[source](https://github.com/JuliaLang/julia/blob/17cfb8e65ead377bf1b4598d8a9869144142c84e/base/gcutils.jl#L185-L197)
```julia
GC.enable_logging(on::Bool)
```
When turned on, print statistics about each GC to stderr.

[source](https://github.com/JuliaLang/julia/blob/17cfb8e65ead377bf1b4598d8a9869144142c84e/base/gcutils.jl#L200-L204)
```julia
lower(m, x)
```
Takes the expression `x` and returns an equivalent expression in lowered form for executing in module `m`. See also [`code_lowered`](#Base.code_lowered).

[source](https://github.com/JuliaLang/julia/blob/17cfb8e65ead377bf1b4598d8a9869144142c84e/base/meta.jl#L157-L163)
```julia
@lower [m] x
```
Return lowered form of the expression `x` in module `m`. By default `m` is the module in which the macro is called. See also [`lower`](#Base.Meta.lower).

[source](https://github.com/JuliaLang/julia/blob/17cfb8e65ead377bf1b4598d8a9869144142c84e/base/meta.jl#L166-L172)
```julia
parse(str, start; greedy=true, raise=true, depwarn=true)
```
Parse the expression string and return an expression (which could later be passed to eval for execution). `start` is the code unit index into `str` of the first character to start parsing at (as with all string indexing, these are not character indices). If `greedy` is `true` (default), `parse` will try to consume as much input as it can; otherwise, it will stop as soon as it has parsed a valid expression. Incomplete but otherwise syntactically valid expressions will return `Expr(:incomplete, "(error message)")`. If `raise` is `true` (default), syntax errors other than incomplete expressions will raise an error. If `raise` is `false`, `parse` will return an expression that will raise an error upon evaluation. If `depwarn` is `false`, deprecation warnings will be suppressed.


```julia
julia> Meta.parse("(α, β) = 3, 5", 1) # start of string
(:((α, β) = (3, 5)), 16)

julia> Meta.parse("(α, β) = 3, 5", 1, greedy=false)
(:((α, β)), 9)

julia> Meta.parse("(α, β) = 3, 5", 16) # end of string
(nothing, 16)

julia> Meta.parse("(α, β) = 3, 5", 11) # index of 3
(:((3, 5)), 16)

julia> Meta.parse("(α, β) = 3, 5", 11, greedy=false)
(3, 13)
```
[source](https://github.com/JuliaLang/julia/blob/17cfb8e65ead377bf1b4598d8a9869144142c84e/base/meta.jl#L202-L232)
```julia
parse(str; raise=true, depwarn=true)
```
Parse the expression string greedily, returning a single expression. An error is thrown if there are additional characters after the first expression. If `raise` is `true` (default), syntax errors will raise an error; otherwise, `parse` will return an expression that will raise an error upon evaluation. If `depwarn` is `false`, deprecation warnings will be suppressed.


```julia
julia> Meta.parse("x = 3")
:(x = 3)

julia> Meta.parse("x = ")
:($(Expr(:incomplete, "incomplete: premature end of input")))

julia> Meta.parse("1.0.2")
ERROR: Base.Meta.ParseError("invalid numeric constant "1.0."")
Stacktrace:
[...]

julia> Meta.parse("1.0.2"; raise = false)
:($(Expr(:error, "invalid numeric constant "1.0."")))
```
[source](https://github.com/JuliaLang/julia/blob/17cfb8e65ead377bf1b4598d8a9869144142c84e/base/meta.jl#L242-L266)
```julia
ParseError(msg)
```
The expression passed to the [`parse`](https://docs.julialang.org/#Base.Meta.parse-Tuple%7BAbstractString,%20Int64%7D) function could not be interpreted as a valid Julia expression.

[source](https://github.com/JuliaLang/julia/blob/17cfb8e65ead377bf1b4598d8a9869144142c84e/base/meta.jl#L183-L188)
```julia
macroexpand(m::Module, x; recursive=true)
```
Take the expression `x` and return an equivalent expression with all macros removed (expanded) for executing in module `m`. The `recursive` keyword controls whether deeper levels of nested macros are also expanded. This is demonstrated in the example below:


```julia
julia> module M
           macro m1()
               42
           end
           macro m2()
               :(@m1())
           end
       end
M

julia> macroexpand(M, :(@m2()), recursive=true)
42

julia> macroexpand(M, :(@m2()), recursive=false)
:(#= REPL[16]:6 =# M.@m1)
```
[source](https://github.com/JuliaLang/julia/blob/17cfb8e65ead377bf1b4598d8a9869144142c84e/base/expr.jl#L88-L112)
```julia
@macroexpand
```
Return equivalent expression with all macros removed (expanded).

There are differences between `@macroexpand` and [`macroexpand`](https://docs.julialang.org/#Base.macroexpand).

* While [`macroexpand`](https://docs.julialang.org/#Base.macroexpand) takes a keyword argument `recursive`, `@macroexpand` is always recursive. For a non recursive macro version, see [`@macroexpand1`](https://docs.julialang.org/#Base.@macroexpand1).
* While [`macroexpand`](https://docs.julialang.org/#Base.macroexpand) has an explicit `module` argument, `@macroexpand` always expands with respect to the module in which it is called.

This is best seen in the following example:


```julia
julia> module M
           macro m()
               1
           end
           function f()
               (@macroexpand(@m),
                macroexpand(M, :(@m)),
                macroexpand(Main, :(@m))
               )
           end
       end
M

julia> macro m()
           2
       end
@m (macro with 1 method)

julia> M.f()
(1, 1, 2)
```
With `@macroexpand` the expression expands where `@macroexpand` appears in the code (module `M` in the example). With `macroexpand` the expression expands in the module given as the first argument.

[source](https://github.com/JuliaLang/julia/blob/17cfb8e65ead377bf1b4598d8a9869144142c84e/base/expr.jl#L121-L159)
```julia
code_lowered(f, types; generated=true, debuginfo=:default)
```
Return an array of the lowered forms (IR) for the methods matching the given generic function and type signature.

If `generated` is `false`, the returned `CodeInfo` instances will correspond to fallback implementations. An error is thrown if no fallback implementation exists. If `generated` is `true`, these `CodeInfo` instances will correspond to the method bodies yielded by expanding the generators.

The keyword `debuginfo` controls the amount of code metadata present in the output.

Note that an error will be thrown if `types` are not leaf types when `generated` is `true` and any of the corresponding methods are an `@generated` method.

[source](https://github.com/JuliaLang/julia/blob/17cfb8e65ead377bf1b4598d8a9869144142c84e/base/reflection.jl#L880-L895)
```julia
code_typed(f, types; kw...)
```
Returns an array of type-inferred lowered form (IR) for the methods matching the given generic function and type signature.

**Keyword Arguments**

* `optimize=true`: controls whether additional optimizations, such as inlining, are also applied.
* `debuginfo=:default`: controls the amount of code metadata present in the output,

possible options are `:source` or `:none`.

**Internal Keyword Arguments**

This section should be considered internal, and is only for who understands Julia compiler internals.

* `world=Base.get_world_counter()`: optional, controls the world age to use when looking up methods,

use current world age if not specified.

* `interp=Core.Compiler.NativeInterpreter(world)`: optional, controls the interpreter to use,

use the native interpreter Julia uses if not specified.

**Example**

One can put the argument types in a tuple to get the corresponding `code_typed`.


```julia
julia> code_typed(+, (Float64, Float64))
1-element Vector{Any}:
 CodeInfo(
1 ─ %1 = Base.add_float(x, y)::Float64
└──      return %1
) => Float64
```
[source](https://github.com/JuliaLang/julia/blob/17cfb8e65ead377bf1b4598d8a9869144142c84e/base/reflection.jl#L1189-L1223)
```julia
precompile(f, args::Tuple{Vararg{Any}})
```
Compile the given function `f` for the argument tuple (of types) `args`, but do not execute it.

[source](https://github.com/JuliaLang/julia/blob/17cfb8e65ead377bf1b4598d8a9869144142c84e/base/loading.jl#L2204-L2208)
```julia
Base.jit_total_bytes()
```
Return the total amount (in bytes) allocated by the just-in-time compiler for e.g. native code and data.

[source](https://github.com/JuliaLang/julia/blob/17cfb8e65ead377bf1b4598d8a9869144142c84e/base/timing.jl#L90-L95)
```julia
Meta.quot(ex)::Expr
```
Quote expression `ex` to produce an expression with head `quote`. This can for instance be used to represent objects of type `Expr` in the AST. See also the manual section about [QuoteNode](https://docs.julialang.org/../../manual/metaprogramming/#man-quote-node).

**Examples**


```julia
julia> eval(Meta.quot(:x))
:x

julia> dump(Meta.quot(:x))
Expr
  head: Symbol quote
  args: Array{Any}((1,))
    1: Symbol x

julia> eval(Meta.quot(:(1+2)))
:(1 + 2)
```
[source](https://github.com/JuliaLang/julia/blob/17cfb8e65ead377bf1b4598d8a9869144142c84e/base/meta.jl#L24-L45)
```julia
Meta.isexpr(ex, head[, n])::Bool
```
Return true if `ex` is an `Expr` with the given type `head` and optionally that the argument list is of length `n`. `head` may be a `Symbol` or collection of `Symbol`s. For example, to check that a macro was passed a function call expression, you might use `isexpr(ex, :call)`.

**Examples**


```julia
julia> ex = :(f(x))
:(f(x))

julia> Meta.isexpr(ex, :block)
false

julia> Meta.isexpr(ex, :call)
true

julia> Meta.isexpr(ex, [:block, :call]) # multiple possible heads
true

julia> Meta.isexpr(ex, :call, 1)
false

julia> Meta.isexpr(ex, :call, 2)
true
```
[source](https://github.com/JuliaLang/julia/blob/17cfb8e65ead377bf1b4598d8a9869144142c84e/base/meta.jl#L48-L76)
```julia
 isidentifier(s) -> Bool
```
Return whether the symbol or string `s` contains characters that are parsed as a valid ordinary identifier (not a binary/unary operator) in Julia code; see also [`Base.isoperator`](https://docs.julialang.org/#Base.isoperator).

Internally Julia allows any sequence of characters in a `Symbol` (except `0`s), and macros automatically use variable names containing `#` in order to avoid naming collision with the surrounding code. In order for the parser to recognize a variable, it uses a limited set of characters (greatly extended by Unicode). `isidentifier()` makes it possible to query the parser directly whether a symbol contains valid characters.

**Examples**


```julia
julia> Meta.isidentifier(:x), Meta.isidentifier("1x")
(true, false)
```
[source](https://github.com/JuliaLang/julia/blob/17cfb8e65ead377bf1b4598d8a9869144142c84e/base/show.jl#L1335-L1354)
```julia
isoperator(s::Symbol)
```
Return `true` if the symbol can be used as an operator, `false` otherwise.

**Examples**


```julia
julia> Meta.isoperator(:+), Meta.isoperator(:f)
(true, false)
```
[source](https://github.com/JuliaLang/julia/blob/17cfb8e65ead377bf1b4598d8a9869144142c84e/base/show.jl#L1369-L1379)
```julia
isunaryoperator(s::Symbol)
```
Return `true` if the symbol can be used as a unary (prefix) operator, `false` otherwise.

**Examples**


```julia
julia> Meta.isunaryoperator(:-), Meta.isunaryoperator(:√), Meta.isunaryoperator(:f)
(true, true, false)
```
[source](https://github.com/JuliaLang/julia/blob/17cfb8e65ead377bf1b4598d8a9869144142c84e/base/show.jl#L1382-L1392)
```julia
isbinaryoperator(s::Symbol)
```
Return `true` if the symbol can be used as a binary (infix) operator, `false` otherwise.

**Examples**


```julia
julia> Meta.isbinaryoperator(:-), Meta.isbinaryoperator(:√), Meta.isbinaryoperator(:f)
(true, false, false)
```
[source](https://github.com/JuliaLang/julia/blob/17cfb8e65ead377bf1b4598d8a9869144142c84e/base/show.jl#L1397-L1407)
```julia
Meta.show_sexpr([io::IO,], ex)
```
Show expression `ex` as a lisp style S-expression.

**Examples**


```julia
julia> Meta.show_sexpr(:(f(x, g(y,z))))
(:call, :f, :x, (:call, :g, :y, :z))
```
[source](https://github.com/JuliaLang/julia/blob/17cfb8e65ead377bf1b4598d8a9869144142c84e/base/meta.jl#L109-L119)


