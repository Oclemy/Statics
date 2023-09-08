# Function

*Cheat sheet for the full function syntax at the end*.

ReScript functions are declared with an arrow and return an expression, just like JS functions. They compile to clean JS functions too.


```javascript
let greet = (name) => "Hello " ++ name

```
This declares a function and assigns to it the name `greet`, which you can call like so:

Multi-arguments functions have arguments separated by comma:


```javascript
let add = (x, y, z) => x + y + z
add(1, 2, 3) 

```
For longer functions, you'd surround the body with a block:


```javascript
let greetMore = (name) => {
  let part1 = "Hello"
  part1 ++ " " ++ name
}

```
If your function has no argument, just write `let greetMore = () => {...}`.

## Labeled Arguments

Multi-arguments functions, especially those whose arguments are of the same type, can be confusing to call.


```javascript
let addCoordinates = (x, y) => {
  
}

addCoordinates(5, 6) 

```
You can attach labels to an argument by prefixing the name with the `~` symbol:


```javascript
let addCoordinates = (~x, ~y) => {
  
}

addCoordinates(~x=5, ~y=6)

```
You can provide the arguments in **any order**:


```javascript
addCoordinates(~y=6, ~x=5)

```
The `~x` part in the declaration means the function accepts an argument labeled `x` and can refer to it in the function body by the same name. You can also refer to the arguments inside the function body by a different name for conciseness:


```javascript
let drawCircle = (~radius as r, ~color as c) => {
  setColor(c)
  startAt(r, r)
  
}

drawCircle(~radius=10, ~color="red")

```
As a matter of fact, `(~radius)` is just a shorthand for `(~radius as radius)`.

Here's the syntax for typing the arguments:


```javascript
let drawCircle = (~radius as r: int, ~color as c: string) => {
  
}

```
## Optional Labeled Arguments

Labeled function arguments can be made optional during declaration. You can then omit them when calling the function.


```javascript

let drawCircle = (~color, ~radius=?, ()) => {
  setColor(color)
  switch radius {
  | None => startAt(1, 1)
  | Some(r_) => startAt(r_, r_)
  }
}

```
When given in this syntax, `radius` is **wrapped** in the standard library's `option` type, defaulting to `None`. If provided, it'll be wrapped with a `Some`. So `radius`'s type value is `None | Some(int)` here.

More on `option` type [here](null-undefined-option).

**Note** for the sake of the type system, whenever you have an optional argument, you need to ensure that there's also at least one positional argument (aka non-labeled, non-optional argument) after it. If there's none, provide a dummy `unit` (aka `()`) argument.

### Signatures and Type Annotations

Functions with optional labeled arguments can be confusing when it comes to signature and type annotations. Indeed, the type of an optional labeled argument looks different depending on whether you're calling the function, or working inside the function body. Outside the function, a raw value is either passed in (`int`, for example), or left off entirely. Inside the function, the parameter is always there, but its value is an option (`option<int>`). This means that the type signature is different, depending on whether you're writing out the function type, or the parameter type annotation. The first being a raw value, and the second being an option.

If we get back to our previous example and both add a signature and type annotations to its argument, we get this:


```javascript
let drawCircle: (~color: color, ~radius: int=?, unit) => unit =
  (~color: color, ~radius: option<int>=?, ()) => {
    setColor(color)
    switch radius {
    | None => startAt(1, 1)
    | Some(r_) => startAt(r_, r_)
    }
  }

```
The first line is the function's signature, we would define it like that in an interface file (see [Signatures](module#signatures)). The function's signature describes the types that the **outside world** interacts with, hence the type `int` for `radius` because it indeed expects an `int` when called.

In the second line, we annotate the arguments to help us remember the types of the arguments when we use them **inside** the function's body, here indeed `radius` will be an `option<int>` inside the function.

So if you happen to struggle when writing the signature of a function with optional labeled arguments, try to remember this!

### Explicitly Passed Optional

Sometimes, you might want to forward a value to a function without knowing whether the value is `None` or `Some(a)`. Naively, you'd do:


```javascript
let result =
  switch payloadRadius {
  | None => drawCircle(~color, ())
  | Some(r) => drawCircle(~color, ~radius=r, ())
  }

```
This quickly gets tedious. We provide a shortcut:


```javascript
let result = drawCircle(~color, ~radius=?payloadRadius, ())

```
This means "I understand `radius` is optional, and that when I pass it a value it needs to be an `int`, but I don't know whether the value I'm passing is `None` or `Some(val)`, so I'll pass you the whole `option` wrapper".

### Optional with Default Value

Optional labeled arguments can also be provided a default value. In this case, they aren't wrapped in an `option` type.


```javascript
let drawCircle = (~radius=1, ~color, ()) => {
  setColor(color)
  startAt(radius, radius)
}

```
## Recursive Functions

ReScript chooses the sane default of preventing a function to be called recursively within itself. To make a function recursive, add the `rec` keyword after the `let`:


```javascript
let rec neverTerminate = () => neverTerminate()

```
A simple recursive function may look like this:


```javascript


let rec listHas = (list, item) =>
  switch list {
  | list{} => false
  | list{a, ...rest} => a === item || listHas(rest, item)
  }

```
Recursively calling a function is bad for performance and the call stack. However, ReScript intelligently compiles [tail recursion](https://stackoverflow.com/questions/33923/what-is-tail-recursion) into a fast JavaScript loop. Try checking the JS output of the above code!

### Mutually Recursive Functions

Mutually recursive functions start like a single recursive function using the
`rec` keyword, and then are chained together with `and`:


```javascript
let rec callSecond = () => callFirst()
and callFirst = () => callSecond()

```
## Uncurried Function

ReScript's functions are curried by default, which is one of the few performance penalties we pay in the compiled JS output. The compiler does a best-effort job at removing those currying whenever possible. However, in certain edge cases, you might want guaranteed uncurrying. In those cases, put a dot in the function's parameter list:


```javascript
let add = (. x, y) => x + y

add(. 1, 2)

```
If you write down the uncurried function's type, you'll add a dot there as well.

**Note**: both the declaration site and the call site need to have the uncurry annotation. That's part of the guarantee/requirement.

**This feature seems trivial**, but is actually one of our most important features, as a primarily functional language. We encourage you to use it if you'd like to remove any mention of `Curry` runtime in the JS output.

## Async/Await (from v10.1)

Just as in JS, an async function can be declared by adding `async` before the definition, and `await` can be used in the body of such functions.
The output looks like idiomatic JS:


```javascript
let getUserName = async (userId) => userId

let greetUser = async (userId) => {
  let name = await getUserName(userId)  
  "Hello " ++ name ++ "!"
}

```
The return type of `getUser` is inferred to be `promise<string>`.
Similarly, `await getUserName(userId)` returns a `string` when the function returns `promise<string>`.
Using `await` outside of an `async` function (including in a non-async callback to an async function) is an error.

### Ergonomic error handling

Error handling is done by simply using `try`/`catch`, or a switch with an `exception` case, just as in functions that are not async.
Both JS exceptions and exceptions defined in ReScript can be caught. The compiler takes care of packaging JS exceptions into the builtin `JsError` exception:


```javascript
exception SomeReScriptException

let somethingThatMightThrow = async () => raise(SomeReScriptException)

let someAsyncFn = async () => {
  switch await somethingThatMightThrow() {
  | data => Some(data)
  | exception JsError(_) => None
  | exception SomeReScriptException => None
  }
}

```
## The ignore() Function

Occasionally you may want to ignore the return value of a function. ReScript provides an `ignore()` function that discards the value of its argument and returns `()`:


```javascript
mySideEffect()->Promise.catch(handleError)->ignore

Js.Global.setTimeout(myFunc, 1000)->ignore

```
## Tips & Tricks

Cheat sheet for the function syntaxes:

### Declaration


```javascript
RES

`(x, y) => 1

let add = (x, y) => 1


let add = (~first as x, ~second as y) => x + y

let add = (~first, ~second) => first + second


let add = (~first as x=1, ~second as y=2) => x + y

let add = (~first=1, ~second=2) => first + second


let add = (~first as x=?, ~second as y=?) => switch x {...}

let add = (~first=?, ~second=?) => switch first {...}`


```
#### With Type Annotation


```javascript
RES

`(x: int, y: int): int => 1

let add = (x: int, y: int): int => 1


let add = (~first as x: int, ~second as y: int) : int => x + y

let add = (~first: int, ~second: int) : int => first + second


let add = (~first as x: int=1, ~second as y: int=2) : int => x + y

let add = (~first: int=1, ~second: int=2) : int => first + second


let add = (~first as x: option<int>=?, ~second as y: option<int>=?) : int => switch x {...}



let add = (~first: option<int>=?, ~second: option<int>=?) : int => switch first {...}`


```
### Application


```javascript
RES

`add(x, y)


add(~first=1, ~second=2)

add(~first, ~second)


add(~first=1, ~second=2)


add(~first=?Some(1), ~second=?Some(2))

add(~first?, ~second?)`


```
#### With Type Annotation


```javascript
RES

`add(~first=1: int, ~second=2: int)

add(~first: int, ~second: int)


add(~first=1: int, ~second=2: int)


add(~first=?Some(1): option<int>, ~second=?Some(2): option<int>)`


```
### Standalone Type Signature


```javascript
RES

`type add = (int, int) => int


type add = (~first: int, ~second: int) => int


type add = (~first: int=?, ~second: int=?, unit) => int`


```
#### In Interface Files

To annotate a function from the implementation file (`.res`) in your interface file (`.resi`):


```javascript
`let add: (int, int) => int`


```
The type annotation part is the same as the previous section on With Type Annotation.

**Don't** confuse `let add: myType` with `type add = myType`. When used in `.resi` interface files, the former exports the binding `add` while annotating it as type `myType`. The latter exports the type `add`, whose value is the type `myType`.




