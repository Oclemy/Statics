# Null, Undefined and Option

ReScript itself doesn't have the notion of `null` or `undefined`. This is a *great* thing, as it wipes out an entire category of bugs. No more `undefined is not a function`, and `cannot access someAttribute of undefined`!

However, the **concept** of a potentially nonexistent value is still useful, and safely exists in our language.

We represent the existence and nonexistence of a value by wrapping it with the `option` type. Here's its definition from the standard library:


```javascript
type option<'a> = None | Some('a)

```
It means "a value of type option is either None (representing nothing) or that actual value wrapped in a Some".

**Note** how the `option` type is just a regular <variant>.

## Example

Here's a normal value:

To represent the concept of "maybe null", you'd turn this into an `option` type by wrapping it. For the sake of a more illustrative example, we'll put a condition around it:


```javascript
let licenseNumber =
  if personHasACar {
    Some(5)
  } else {
    None
  }

```
Later on, when another piece of code receives such value, it'd be forced to handle both cases through [pattern matching](pattern-matching-destructuring):


```javascript
switch licenseNumber {
| None =>
  Js.log("The person doesn't have a car")
| Some(number) =>
  Js.log("The person's license number is " ++ Js.Int.toString(number))
}

```
By turning your ordinary number into an `option` type, and by forcing you to handle the `None` case, the language effectively removed the possibility for you to mishandle, or forget to handle, a conceptual `null` value! **A pure ReScript program doesn't have null errors**.

## Interoperate with JavaScript `undefined` and `null`

The `option` type is common enough that we special-case it when compiling to JavaScript:

simply compiles down to `5`, and

compiles to `undefined`! If you've got e.g. a string in JavaScript that you know might be `undefined`, type it as `option<string>` and you're done! Likewise, you can send a `Some(5)` or `None` to the JS side and expect it to be interpreted correctly =)

### Caveat 1

The option-to-undefined translation isn't perfect, because on our side, `option` values can be composed:


```javascript
let x = Some(Some(Some(5)))

```
This still compiles to `5`, but this gets troublesome:

What's this `Caml_option.some` thing? Why can't this compile to `undefined`? Long story short, when dealing with a polymorphic `option` type (aka `option<'a>`, for any `'a`), many operations become tricky if we don't mark the value with some special annotation. If this doesn't make sense, don't worry; just remember the following rule:

* **Never, EVER, pass a nested `option` value (e.g. `Some(Some(Some(5)))`) into the JS side.**
* **Never, EVER, annotate a value coming from JS as `option<'a>`. Always give the concrete, non-polymorphic type.**

### Caveat 2

Unfortunately, lots of times, your JavaScript value might be *both* `null` or `undefined`. In that case, you unfortunately can't type such value as e.g. `option<int>`, since our `option` type only checks for `undefined` and not `null` when dealing with a `None`.

#### Solution: More Sophisticated `undefined` & `null` Interop

To solve this, we provide access to more elaborate `null` and `undefined` helpers through the [`Js.Nullable`](api/js/nullable) module. This somewhat works like an `option` type, but is different from it.

#### Examples

To create a JS `null`, use the value `Js.Nullable.null`. To create a JS `undefined`, use `Js.Nullable.undefined` (you can naturally use `None` too, but that's not the point here; the `Js.Nullable.*` helpers wouldn't work with it).

If you're receiving, for example, a JS string that can be `null` and `undefined`, type it as:


```javascript
@module("MyConstant") external myId: Js.Nullable.t<string> = "myId"

```
To create such a nullable string from our side (presumably to pass it to the JS side, for interop purpose), do:


```javascript
@module("MyIdValidator") external validate: Js.Nullable.t<string> => bool = "validate"
let personId: Js.Nullable.t<string> = Js.Nullable.return("abc123")

let result = validate(personId)

```
The `return` part "wraps" a string into a nullable string, to make the type system understand and track the fact that, as you pass this value around, it's not just a string, but a string that can be `null` or `undefined`.

#### Convert to/from `option`

`Js.Nullable.fromOption` converts from a `option` to `Js.Nullable.t`. `Js.Nullable.toOption` does the opposite.




