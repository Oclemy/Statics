# Variant

So far, most of ReScript's data structures might look familiar to you. This section introduces an extremely important, and perhaps unfamiliar, data structure: variant.

Most data structures in most languages are about "this **and** that". A variant allows us to express "this **or** that".


```javascript
type myResponse =
  | Yes
  | No
  | PrettyMuch

let areYouCrushingIt = Yes

```
`myResponse` is a variant type with the cases `Yes`, `No` and `PrettyMuch`, which are called "variant constructors" (or "variant tag"). The `|` bar separates each constructor.

**Note**: a variant's constructors need to be capitalized.

## Variant Needs an Explicit Definition

If the variant you're using is in a different file, bring it into scope like you'd do [for a record](record#record-needs-an-explicit-definition):


```javascript

type animal = Dog | Cat | Bird

```

```javascript

let pet: Zoo.animal = Dog 

let pet2 = Zoo.Dog

```
## Constructor Arguments

A variant's constructors can hold extra data separated by comma.


```javascript
type account =
  | None
  | Instagram(string)
  | Facebook(string, int)

```
Here, `Instagram` holds a `string`, and `Facebook` holds a `string` and an `int`. Usage:


```javascript
let myAccount = Facebook("Josh", 26)
let friendAccount = Instagram("Jenny")

```
### Labeled Variant Payloads (Inline Record)

If a variant payload has multiple fields, you can use a record-like syntax to label them for better readability:


```javascript
type user =
  | Number(int)
  | Id({name: string, password: string})

let me = Id({name: "Joe", password: "123"})

```
This is technically called an "inline record", and only allowed within a variant constructor. You cannot inline a record type declaration anywhere else in ReScript.

Of course, you can just put a regular record type in a variant too:


```javascript
type u = {name: string, password: string}
type user =
  | Number(int)
  | Id(u)

let me = Id({name: "Joe", password: "123"})

```
The output is slightly uglier and less performant than the former.

### Pattern Matching On Variant

See the [Pattern Matching/Destructuring](pattern-matching-destructuring) section later.

## JavaScript Output

A variant value compiles to 3 possible JavaScript outputs depending on its type declaration:

* If the variant value is a constructor with no payload, it compiles to a number.
* If it's a constructor with a payload, it compiles to an object with the field `TAG` and the field `_0` for the first payload, `_1` for the second payload, etc.
* An exception to the above is a variant whose type declaration contains only a single constructor with payload. In that case, the constructor compiles to an object without the `TAG` field.
* Labeled variant payloads (the inline record trick earlier) compile to an object with the label names instead of `_0`, `_1`, etc. The object might or might not have the `TAG` field as per previous rule.

Check the output in these examples:


```javascript
type greeting = Hello | Goodbye
let g1 = Hello
let g2 = Goodbye

type outcome = Good | Error(string)
let o1 = Good
let o2 = Error("oops!")

type family = Child | Mom(int, string) | Dad (int)
let f1 = Child
let f2 = Mom(30, "Jane")
let f3 = Dad(32)

type person = Teacher | Student({gpa: float})
let p1 = Teacher
let p2 = Student({gpa: 99.5})

type s = {score: float}
type adventurer = Warrior(s) | Wizard(string)
let a1 = Warrior({score: 10.5})
let a2 = Wizard("Joe")

```
## Tips & Tricks

**Be careful** not to confuse a constructor carrying 2 arguments with a constructor carrying a single tuple argument:


```javascript
type account =
  | Facebook(string, int) 
type account2 =
  | Instagram((string, int)) 

```
### Variants Must Have Constructors

If you come from an untyped language, you might be tempted to try `type myType = int | string`. This isn't possible in ReScript; you'd have to give each branch a constructor: `type myType = Int(int) | String(string)`. The former looks nice, but causes lots of trouble down the line.

### Interop with JavaScript

*This section assumes knowledge about our JavaScript interop. Skip this if you haven't felt the itch to use variants for wrapping JS functions yet*.

Quite a few JS libraries use functions that can accept many types of arguments. In these cases, it's very tempting to model them as variants. For example, suppose there's a `myLibrary.draw` JS function that takes in either a `number` or a `string`. You might be tempted to bind it like so:


```javascript

@module("myLibrary") external draw : 'a => unit = "draw"

type animal =
  | MyFloat(float)
  | MyString(string)

let betterDraw = (animal) =>
  switch animal {
  | MyFloat(f) => draw(f)
  | MyString(s) => draw(s)
  }

betterDraw(MyFloat(1.5))

```
**Try not to do that**, as this generates extra noisy output. Alternatively, define two `external`s that both compile to the same JS call:


```javascript
@module("myLibrary") external drawFloat: float => unit = "draw"
@module("myLibrary") external drawString: string => unit = "draw"

```
ReScript also provides [a few other ways](bind-to-js-function#modeling-polymorphic-function) to do this.

### Variant Types Are Found By Field Name

Please refer to this [record section](record#tips--tricks). Variants are the same: a function can't accept an arbitrary constructor shared by two different variants. Again, such feature exists; it's called a polymorphic variant. We'll talk about this in the future =).

## Design Decisions

Variants, in their many forms (polymorphic variant, open variant, GADT, etc.), are likely *the* feature of a type system such as ReScript's. The aforementioned `option` variant, for example, obliterates the need for nullable types, a major source of bugs in other languages. Philosophically speaking, a problem is composed of many possible branches/conditions. Mishandling these conditions is the majority of what we call bugs. **A type system doesn't magically eliminate bugs; it points out the unhandled conditions and asks you to cover them***. The ability to model "this or that" correctly is crucial.

For example, some folks wonder how the type system can safely eliminate badly formatted JSON data from propagating into their program. They don't, not by themselves! But if the parser returns the `option` type `None | Some(actualData)`, then you'd have to handle the `None` case explicitly in later call sites. That's all there is.

Performance-wise, a variant can potentially tremendously speed up your program's logic. Here's a piece of JavaScript:


```javascript
JS

`let data = 'dog'
if (data === 'dog') {
 ...
} else if (data === 'cat') {
 ...
} else if (data === 'bird') {
 ...
}`


```
There's a linear amount of branch checking here (`O(n)`). Compare this to using a ReScript variant:


```javascript
type animal = Dog | Cat | Bird
let data = Dog
switch data {
| Dog => Js.log("Wof")
| Cat => Js.log("Meow")
| Bird => Js.log("Kashiiin")
}

```
The compiler sees the variant, then

1. conceptually turns them into `type animal = 0 | 1 | 2`
2. compiles `switch` to a constant-time jump table (`O(1)`).



