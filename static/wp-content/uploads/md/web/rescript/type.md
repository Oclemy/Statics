# Type

Types are the highlight of ReScript! They are:

* **Strong**. A type can't change into another type. In JavaScript, your variable's type might change when the code runs (aka at runtime). E.g. a `number` variable might change into a `string` sometimes. This is an anti-feature; it makes the code much harder to understand when reading or debugging.
* **Static**. ReScript types are erased after compilation and don't exist at runtime. Never worry about your types dragging down performance. You don't need type info during runtime; we report all the information (especially all the type errors) during compile time. Catch the bugs earlier!
* **Sound**. This is our biggest differentiator versus many other typed languages that compile to JavaScript. Our type system is guaranteed to **never** be wrong. Most type systems make a guess at the type of a value and show you a type in your editor that's sometimes incorrect. We don't do that. We believe that a type system that is sometimes incorrect can end up dangerous due to expectation mismatches.
* **Fast**. Many developers underestimate how much of their project's build time goes into type checking. Our type checker is one of the fastest around.
* **Inferred**. You don't have to write down the types! ReScript can deduce them from their values. Yes, it might seem magical that we can deduce all of your program's types, without incorrectness, without your manual annotation, and do so quickly. Welcome to ReScript =).

The following sections explore more of our type system.

## Inference

This let-binding doesn't contain any written type:


```javascript
let score = 10
let add = (a, b) => a + b

```
ReScript knows that `score` is an `int`, judging by the value `10`. This is called **inference**. Likewise, it also knows that the `add` function takes 2 `int`s and returns an `int`, judging from the `+` operator, which works on ints.

## Type Annotation

But you can also optionally write down the type, aka annotate your value:

If the type annotation for `score` doesn't correspond to our inferred type for it, we'll show you an error during compilation time. We **won't** silently assume your type annotation is correct, unlike many other languages.

You can also wrap any expression in parentheses and annotate it:


```javascript
let myInt = 5
let myInt: int = 5
let myInt = (5: int) + (4: int)
let add = (x: int, y: int) : int => x + y
let drawCircle = (~radius as r: int): circleType => 

```
Note: in the last line, `(~radius as r: int)` is a labeled argument. More on this in the <function> page.

## Type Alias

You can refer to a type by a different name. They'll be equivalent:


```javascript
type scoreType = int
let x: scoreType = 10

```
## Type Parameter (Aka Generic)

Types can accept parameters, akin to generics in other languages. The parameters' names **need** to start with `'`.

The use-case of a parameterized type is to kill duplications. Before:


```javascript

type intCoordinates = (int, int, int)
type floatCoordinates = (float, float, float)

let a: intCoordinates = (10, 20, 20)
let b: floatCoordinates = (10.5, 20.5, 20.5)

```
After:


```javascript
type coordinates<'a> = ('a, 'a, 'a)

let a: coordinates<int> = (10, 20, 20)
let b: coordinates<float> = (10.5, 20.5, 20.5)

```
Note that the above codes are just contrived examples for illustration purposes. Since the types are inferred, you could have just written:

The type system infers that it's a `(int, int, int)`. Nothing else needed to be written down.

Type arguments appear in many places. Our `array<'a>` type is such a type that requires a type parameter


```javascript

let greetings = ["hello", "world", "how are you"]

```
If types didn't accept parameters, the standard library would need to define the types `arrayOfString`, `arrayOfInt`, `arrayOfTuplesOfInt`, etc. That'd be tedious.

Types can receive many arguments, and be composable.


```javascript
type result<'a, 'b> =
  | Ok('a)
  | Error('b)

type myPayload = {data: string}

type myPayloadResults<'errorType> = array<result<myPayload, 'errorType>>

let payloadResults: myPayloadResults<string> = [
  Ok({data: "hi"}),
  Ok({data: "bye"}),
  Error("Something wrong happened!")
]

```
## Recursive Types

Just like a function, a type can reference itself within itself using `rec`:


```javascript
type rec person = {
  name: string,
  friends: array<person>
}

```
## Mutually Recursive Types

Types can also be *mutually* recursive through `and`:


```javascript
type rec student = {taughtBy: teacher}
and teacher = {students: array<student>}

```
## Type Escape Hatch

ReScript's type system is robust and does not allow dangerous, unsafe stuff like implicit type casting, randomly guessing a value's type, etc. However, out of pragmatism, we expose a single escape hatch for you to "lie" to the type system:


```javascript
external myShadyConversion: myType1 => myType2 = "%identity"

```
This declaration converts a `myType1` of your choice to `myType2` of your choice. You can use it like so:


```javascript
external convertToFloat : int => float = "%identity"
let age = 10
let gpa = 2.1 +. convertToFloat(age)

```
Obviously, do **not** abuse this feature. Use it tastefully when you're working with existing, overly dynamic JS code, for example.

More on externals [here](external).

**Note**: this particular `external` is the only one that isn't preceded by a `@` <attribute>.




