# Polymorphic Variant

Polymorphic variants (or poly variant) are a cousin of <variant>. With these differences:

* They start with a `#` and the constructor name doesn't need to be capitalized.
* They don't require an explicit type definition. The type is inferred from usage.
* Values of different poly variant types can share the constructors they have in common (aka, poly variants are "structurally" typed, as opposed to ["nominally" typed](variant#variant-types-are-found-by-field-name)).

They're a convenient and useful alternative to regular variants, but should **not** be abused. See the drawbacks at the end of this page.

## Creation

We provide 3 syntaxes for a poly variant's constructor:


```javascript
let myColor = #red
let myLabel = #"aria-hidden"
let myNumber = #7

```
**Take a look at the output**. Poly variants are *great* for JavaScript interop. For example, you can use it to model JavaScript string and number enums like TypeScript, but without confusing their accidental usage with regular strings and numbers.

`myColor` uses the common syntax. The second and third syntaxes are to support expressing strings and numbers more conveniently. We allow the second one because otherwise it'd be invalid syntax since symbols like `-` and others are usually reserved.

## Type Declaration

Although **optional**, you can still pre-declare a poly variant type:


```javascript
RES

`type color = [#red | #green | #blue]`


```
These types can also be inlined, unlike for regular variant:


```javascript
let render = (myColor: [#red | #green | #blue]) => {
  switch myColor {
  | #blue => Js.log("Hello blue!")
  | #red
  | #green => Js.log("Hello other colors")
  }
}

```
**Note**: because a poly variant value's type definition is **inferred** and not searched in the scope, the following snippet won't error:


```javascript
type color = [#red | #green | #blue]

let render = myColor => {
  switch myColor {
  | #blue => Js.log("Hello blue!")
  | #green => Js.log("Hello green!")
  
  | #yellow => Js.log("Hello yellow!")
  }
}

```
That `myColor` parameter's type is inferred to be `#red`, `#green` or `#yellow`, and is unrelated to the `color` type. If you intended `myColor` to be of type `color`, annotate it as `myColor: color` in any of the places.

## Constructor Arguments

This is similar to a regular variant's [constructor arguments](variant#constructor-arguments):


```javascript
type account = [
  | #Anonymous
  | #Instagram(string)
  | #Facebook(string, int)
]

let me: account = #Instagram("Jenny")
let him: account = #Facebook("Josh", 26)

```
### Combine Types and Pattern Match

You can use poly variant types within other poly variant types to create a sum of all constructors:


```javascript
type red = [#Ruby | #Redwood | #Rust]
type blue = [#Sapphire | #Neon | #Navy]



type color = [red | blue | #Papayawhip]

let myColor: color = #Ruby

```
There's also some special [pattern matching](./pattern-matching-destructuring) syntax to match on constructors defined in a specific poly variant type:


```javascript


switch myColor {
| #...blue => Js.log("This blue-ish")
| #...red => Js.log("This red-ish")
| other => Js.log2("Other color than red and blue: ", other)
}

```
This is a shorter version of:


```javascript
RES

`switch myColor {
| #Sapphire | #Neon | #Navy => Js.log("This is blue-ish")
| #Ruby | #Redwood | #Rust => Js.log("This is red-ish")
| other => Js.log2("Other color than red and blue: ", other)
}`


```
## Structural Sharing

Since poly variants value don't have a source of truth for their type, you can write such code:


```javascript
type preferredColors = [#white | #blue]

let myColor: preferredColors = #blue

let displayColor = v => {
  switch v {
  | #red => "Hello red"
  | #green => "Hello green"
  | #white => "Hey white!"
  | #blue => "Hey blue!"
  }
}

Js.log(displayColor(myColor))

```
With a regular variant, the line `displayColor(myColor)` would fail, since it'd complain that the type of `myColor` doesn't match the type of `v`. No problem with poly variant.

## JavaScript Output

Poly variants are great for JavaScript interop! You can share their values to JS code, or model incoming JS values as poly variants.

* `#red` and `#"I am red 😃"` compile to JavaScipt `"red"` and `"I am red 😃"`.
* `#1` compiles to JavaScript `1`.
* Poly variant constructor with 1 argument, like `Instagram("Jenny")` compile to a straightforward `{NAME: "Instagram", VAL: "Jenny"}`. 2 or more arguments like `#Facebook("Josh", 26)` compile to a similar object, but with `VAL` being an array of the arguments.

### Bind to Functions

For example, let's assume we want to bind to `Intl.NumberFormat` and want to make sure that our users only pass valid locales, we could define an external binding like this:


```javascript
type t

@scope("Intl") @val
external makeNumberFormat: ([#"de-DE" | #"en-GB" | #"en-US"]) => t = "NumberFormat"

let intl = makeNumberFormat(#"de-DE")

```
The JS output is identical to handwritten JS, but we also get to enjoy type errors if we accidentally write `makeNumberFormat(#"de-DR")`.

More advanced usage examples for poly variant interop can be found in [Bind to JS Function](bind-to-js-function#constrain-arguments-better).

### Bind to String Enums

Let's assume we have a TypeScript module that expresses following enum export:


```javascript
JS

`enum Direction {
 Up = "UP",
 Down = "DOWN",
 Left = "LEFT",
 Right = "RIGHT",
}

export const myDirection = Direction.Up`


```
For this particular example, we can also inline poly variant type definitions to design the type for the imported `myDirection` value:


```javascript
type direction = [ #UP | #DOWN | #LEFT | #RIGHT ]
@module("./direction.js") external myDirection: direction = "myDirection"

```
Again: since we were using poly variants, the JS Output is practically zero-cost and doesn't add any extra code!

## Extra Constraints on Types

The previous poly variant type annotations we've looked at are the regular "closed" kind. However, there's a way to express "I want at least these constructors" (lower bound) and "I want at most these constructors" (upper bound):


```javascript
RES

`let basic: [#Red] = #Red



let foreground: [> #Red] = #Green



let background: [< #Red | #Blue] = #Red`


```
**Note:** We added this info for educational purposes. In most cases you will not want to use any of this stuff, since it makes your APIs pretty unreadable / hard to use.

### Closed `[`

This is the simplest poly variant definition, and also the most practical one. Like a common variant type, this one defines an exact set of constructors.


```javascript
RES

`type rgb = [ #Red | #Green | #Blue ]

let color: rgb = #Green`


```
In the example above, `color` will only allow one of the three constructors that are defined in the `rgb` type. This is usually the way how poly variants should be defined.

In case you want to define a type that is extensible, you'll need to use the lower / upper bound syntax.

### Lower Bound `[>`

A lower bound defines the minimum set of constructors a poly variant type is aware of. It is also considered an "open poly variant type", because it doesn't restrict any additional values.

Here is an example on how to make a minimum set of `basicBlueTones` extensible for a new `color` type:


```javascript
RES

`type basicBlueTone<'a> = [> #Blue | #DeepBlue | #LightBlue ] as 'a
type color = basicBlueTone<[#Blue | #DeepBlue | #LightBlue | #Purple]>

let color: color = #Purple


type notWorking = basicBlueTone<[#Purple]>`


```
Here, the compiler will enforce the user to define `#Blue | #DeepBlue | #LightBlue` as the minimum set of constructors when trying to extend `basicBlueTone<'a>`.

**Note:** Since we want to define an extensible poly variant, we need to provide a type placeholder `<'a>`, and also add `as 'a` after the poly variant declaration, which essentially means: "Given type `'a` is constraint to the minimum set of constructors (`#Blue | #DeepBlue | #LightBlue`) defined in `basicBlueTone`".

### Upper Bound `[<`

The upper bound works in the opposite way than a lower bound: the extending type may only use constructors that are stated in the upper bound constraint.

Here another example, but with red colors:


```javascript
RES

`type validRed<'a> = [< #Fire | #Crimson | #Ash] as 'a
type myReds = validRed<[#Ash]>


type notWorking = validRed<[#Purple]>`


```
## Coercion

You can convert a poly variant to a `string` or `int` at no cost:


```javascript
type company = [#Apple | #Facebook]
let theCompany: company = #Apple

let message = "Hello " ++ (theCompany :> string)

```
**Note**: for the coercion to work, the poly variant type needs to be closed; you'd need to annotate it, since otherwise, `theCompany` would be inferred as `[> #Apple]`.

## Tips & Tricks

### Variant vs Polymorphic Variant

One might think that polymorphic variants are superior to regular [variants](./variant). As always, there are trade-offs:

* Due to their "structural" nature, poly variant's type errors might be more confusing. If you accidentally write `#blur` instead of `#blue`, ReScript will still error but can't indicate the correct source as easily. Regular variants' source of truth is the type definition, so the error can't go wrong.
* It's also harder to refactor poly variants. Consider this:


```javascript
RES

`let myFruit = #Apple
let mySecondFruit = #Apple
let myCompany = #Apple`


```
Refactoring the first one to `#Orange` doesn't mean we should refactor the third one. Therefore, the editor plugin can't touch the second one either. Regular variant doesn't have such problem, as these 2 values presumably come from different variant type definitions.
* You might lose some nice pattern match checks from the compiler:


```javascript
RES

`let myColor = #red

switch myColor {
| #red => Js.log("Hello red!")
| #blue => Js.log("Hello blue!")
}`


```
Because there's no poly variant definition, it's hard to know whether the `#blue` case can be safely removed.

In most scenarios, we'd recommend to use regular variants over polymorphic variants, especially when you are writing plain ReScript code. In case you want to write zero-cost interop bindings or generate clean JS output, poly variants are oftentimes a better option.




