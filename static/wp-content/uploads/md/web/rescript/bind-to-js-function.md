# Function

Binding a JS function is like binding any other value:


```javascript

@module("path") external dirname: string => string = "dirname"
let root = dirname("/User/github") 

```
We also expose a few special features, described below.

## Labeled Arguments

ReScript has [labeled arguments](function#labeled-arguments) (that can also be optional). These work on an `external` too! You'd use them to *fix* a JS function's unclear usage. Assuming we're modeling this:


```javascript
JS

`function draw(x, y, border) {
 
}
draw(10, 20)
draw(20, 20, true)`


```
It'd be nice if on ReScript's side, we can bind & call `draw` while labeling things a bit:


```javascript
@module("MyGame")
external draw: (~x: int, ~y: int, ~border: bool=?, unit) => unit = "draw"

draw(~x=10, ~y=20, ~border=true, ())
draw(~x=10, ~y=20, ())

```
We've compiled to the same function, but now the usage is much clearer on the ReScript side thanks to labels!

**Note**: in this particular case, you need a unit, `()` after `border`, since `border` is an [optional argument at the last position](function#optional-labeled-arguments). Not having a unit to indicate you've finished applying the function would generate a warning.

Note that you can freely reorder the labels on the ReScript side; they'll always correctly appear in their declaration order in the JavaScript output:


```javascript
@module("MyGame")
external draw: (~x: int, ~y: int, ~border: bool=?, unit) => unit = "draw"

draw(~x=10, ~y=20, ())
draw(~y=20, ~x=10, ())

```
## Object Method

Functions attached to a JS objects (other than JS modules) require a special way of binding to them, using `send`:


```javascript
type document 
@send external getElementById: (document, string) => Dom.element = "getElementById"
@val external doc: document = "document"

let el = getElementById(doc, "myId")

```
In a `send`, the object is always the first argument. Actual arguments of the method follow (this is a bit what modern OOP objects are really).

### Chaining

Ever used `foo().bar().baz()` chaining ("fluent api") in JS OOP? We can model that in ReScript too, through the [pipe operator](pipe).

## Variadic Function Arguments

You might have JS functions that take an arbitrary amount of arguments. ReScript supports modeling those, under the condition that the arbitrary arguments part is homogenous (aka of the same type). If so, add `variadic` to your `external`.


```javascript
@module("path") @variadic
external join: array<string> => string = "join"

let v = join(["a", "b"])

```
`module` will be explained in [Import from/Export to JS](import-from-export-to-js).

## Modeling Polymorphic Function

Apart from the above special-case, JS function in general are often arbitrary overloaded in terms of argument types and number. How would you bind to those?

### Trick 1: Multiple `external`s

If you can exhaustively enumerate the many forms an overloaded JS function can take, simply bind to each differently:


```javascript
@module("MyGame") external drawCat: unit => unit = "draw"
@module("MyGame") external drawDog: (~giveName: string) => unit = "draw"
@module("MyGame") external draw: (string, ~useRandomAnimal: bool) => unit = "draw"

```
Note how all three externals bind to the same JS function, `draw`.

### Trick 2: Polymorphic Variant + `unwrap`

If you have the irresistible urge of saying "if only this JS function argument was a variant instead of informally being either `string` or `int`", then good news: we do provide such `external` features through annotating a parameter as a polymorphic variant! Assuming you have the following JS function you'd like to bind to:


```javascript
JS

`function padLeft(value, padding) {
 if (typeof padding === "number") {
 return Array(padding + 1).join(" ") + value;
 }
 if (typeof padding === "string") {
 return padding + value;
 }
 throw new Error(`Expected string or number, got '${padding}'.`);
}`


```
Here, `padding` is really conceptually a variant. Let's model it as such.


```javascript
@val
external padLeft: (
  string,
  @unwrap [
    | #Str(string)
    | #Int(int)
  ])
  => string = "padLeft"
padLeft("Hello World", #Int(4))
padLeft("Hello World", #Str("Message from ReScript: "))

```
Obviously, the JS side couldn't have an argument that's a polymorphic variant! But here, we're just piggy backing on poly variants' type checking and syntax. The secret is the `@unwrap` annotation on the type. It strips the variant constructors and compile to just the payload's value. See the output.

## Constrain Arguments Better

Consider the Node `fs.readFileSync`'s second argument. It can take a string, but really only a defined set: `"ascii"`, `"utf8"`, etc. You can still bind it as a string, but we can use poly variants + `string` to ensure that our usage's more correct:


```javascript
@module("fs")
external readFileSync: (
  ~name: string,
  @string [
    | #utf8
    | @as("ascii") #useAscii
  ],
) => string = "readFileSync"

readFileSync(~name="xx.txt", #useAscii)

```
And now, passing something like `"myOwnUnicode"` or other variant constructor names to `readFileSync` would correctly error.

Aside from string, you can also compile an argument to an int, using `int` instead of `string` in a similar way:


```javascript
@val
external testIntType: (
  @int [
    | #onClosed
    | @as(20) #onOpen
    | #inBinary
  ])
  => int = "testIntType"
testIntType(#inBinary)

```
`onClosed` compiles to `0`, `onOpen` to `20` and `inBinary` to **`21`**.

## Special-case: Event Listeners

One last trick with polymorphic variants:


```javascript
type readline

@send
external on: (
    readline,
    @string [
      | #close(unit => unit)
      | #line(string => unit)
    ]
  )
  => readline = "on"

let register = rl =>
  rl
  ->on(#close(event => ()))
  ->on(#line(line => Js.log(line)));

```
## Fixed Arguments

Sometimes it's convenient to bind to a function using an `external`, while passing predetermined argument values to the JS function:


```javascript
@val
external processOnExit: (
  @as("exit") _,
  int => unit
) => unit = "process.on"

processOnExit(exitCode =>
  Js.log("error code: " ++ Js.Int.toString(exitCode))
);

```
The `@as("exit")` and the placeholder `_` argument together indicates that you want the first argument to compile to the string `"exit"`. You can also use any JSON literal with `as`: `@as(json`true`)`, `@as(json`{"name": "John"}`)`, etc.

## Ignore arguments

You can also explicitly "hide" `external` function parameters in the JS output, which may be useful if you want to add type constraints to other parameters without impacting the JS side:


```javascript
@val external doSomething: (@ignore 'a, 'a) => unit = "doSomething"

doSomething("this only shows up in ReScript code", "test")

```
**Note:** It's a pretty niche feature, mostly used to map to polymorphic JS APIs.

## Curry & Uncurry

Curry is a delicious Indian dish. More importantly, in the context of ReScript (and functional programming in general), currying means that function taking multiple arguments can be applied a few arguments at time, until all the arguments are applied.

See the `addFive` intermediate function? `add` takes in 3 arguments but received only 1. It's interpreted as "currying" the argument `5` and waiting for the next 2 arguments to be applied later on. Type signatures:


```javascript
`let add: (int, int, int) => int
let addFive: (int, int) => int
let twelve: int`


```
(In a dynamic language such as JS, currying would be dangerous, since accidentally forgetting to pass an argument doesn't error at compile time).

### Drawback

Unfortunately, due to JS not having currying because of the aforementioned reason, it's hard for ReScript multi-argument functions to map cleanly to JS functions 100% of the time:

1. When all the arguments of a function are supplied (aka no currying), ReScript does its best to to compile e.g. a 3-arguments call into a plain JS call with 3 arguments.
2. If it's too hard to detect whether a function application is complete*, ReScript will use a runtime mechanism (the `Curry` module) to curry as many args as we can and check whether the result is fully applied.
3. Some JS APIs like `throttle`, `debounce` and `promise` might mess with context, aka use the function `bind` mechanism, carry around `this`, etc. Such implementation clashes with the previous currying logic.

* If the call site is typed as having 3 arguments, we sometimes don't know whether it's a function that's being curried, or if the original one indeed has only 3 arguments.

ReScript tries to do #1 as much as it can. Even when it bails and uses #2's currying mechanism, it's usually harmless.

**However**, if you encounter #3, heuristics are not good enough: you need a guaranteed way of fully applying a function, without intermediate currying steps. We provide such guarantee through the use of the ["uncurrying" syntax](./function#uncurried-function) on a function declaration & call site.

### Solution: Use Guaranteed Uncurrying

[Uncurried function](function#uncurried-function) annotation also works on `external`:


```javascript
type timerId
@val external setTimeout: ((. unit) => unit, int) => timerId = "setTimeout"

let id = setTimeout((.) => Js.log("hello"), 1000)

```
#### Extra Solution

The above solution is safe, guaranteed, and performant, but sometimes visually a little burdensome. We provide an alternative solution if:

Then try `@uncurry`:


```javascript
@send external map: (array<'a>, @uncurry ('a => 'b)) => array<'b> = "map"
map([1, 2, 3], x => x + 1)

```
In general, `uncurry` is recommended; the compiler will do lots of optimizations to resolve the currying to uncurrying at compile time. However, there are some cases the compiler can't optimize it. In these cases, it will be converted to a runtime check.

## Modeling `this`-based Callbacks

Many JS libraries have callbacks which rely on this (the source), for example:


```javascript
JS

`x.onload = function(v) {
 console.log(this.response + v)
}`


```
Here, `this` would point to `x` (actually, it depends on how `onload` is called, but we digress). It's not correct to declare `x.onload` of type `(. unit) -> unit`. Instead, we introduced a special attribute, `this`, which allows us to type `x` as so:


```javascript
type x
@val external x: x = "x"
@set external setOnload: (x, @this ((x, int) => unit)) => unit = "onload"
@get external resp: x => int = "response"
setOnload(x, @this ((o, v) => Js.log(resp(o) + v)))

```
`this` has its first parameter is reserved for `this` and for arity of 0, there is no need for a redundant `unit` type.

## Function Nullable Return Value Wrapping

For JS functions that return a value that can also be `undefined` or `null`, we provide `@return(...)`. To automatically convert that value to an `option` type (recall that ReScript `option` type's `None` value only compiles to `undefined` and not `null`).


```javascript
type element
type dom

@send @return(nullable)
external getElementById: (dom, string) => option<element> = "getElementById"

let test = dom => {
  let elem = dom->(getElementById("haha"))
  switch (elem) {
  | None => 1
  | Some(_ui) => 2
  }
}

```
`return(nullable)` attribute will automatically convert `null` and `undefined` to `option` type.

Currently 4 directives are supported: `null_to_opt`, `undefined_to_opt`, `nullable` and `identity`.

`identity` will make sure that compiler will do nothing about the returned value. It is rarely used, but introduced here for debugging purpose.




