# Bind to Global JS Values

**First**, make sure the value you'd like to model doesn't already exist in our [provided API](api/js).

Some JS values, like `setTimeout`, live in the global scope. You can bind to them like so:


```javascript
@val external setTimeout: (unit => unit, int) => float = "setTimeout"
@val external clearTimeout: float => unit = "clearTimeout"

```
(We already provide `setTimeout`, `clearTimeout` and others in the [Js.Global](api/js/global) module).

This binds to the JavaScript [`setTimeout`](https://developer.mozilla.org/en-US/docs/Web/API/WindowOrworkerGlobalScope/setTimeout) methods and the corresponding `clearTimeout`. The `external`'s type annotation specifies that `setTimeout`:

* Takes a function that accepts `unit` and returns `unit` (which on the JS side turns into a function that accepts nothing and returns nothing aka `undefined`),
* and an integer that specifies the duration before calling said function,
* returns a number that is the timeout's ID. This number might be big, so we're modeling it as a float rather than the 32-bit int.

### Tips & Tricks

**The above isn't ideal**. See how `setTimeout` returns a `float` and `clearTimeout` accepts one. There's no guarantee that you're passing the float created by `setTimeout` into `clearTimeout`! For all we know, someone might pass it `Math.random()` into the latter.

We're in a language with a great type system now! Let's leverage a popular feature to solve this problem: abstract types.


```javascript
type timerId
@val external setTimeout: (unit => unit, int) => timerId = "setTimeout"
@val external clearTimeout: timerId => unit = "clearTimeout"

let id = setTimeout(() => Js.log("hello"), 100)
clearTimeout(id)

```
Clearly, `timerId` is a type that can only be created by `setTimeout`! Now we've guaranteed that `clearTimeout` *will* be passed a valid ID. Whether it's a number under the hood is now a mere implementation detail.

Since `external`s are inlined, we end up with JS output as readable as hand-written JS.

## Global Modules

If you want to bind to a value inside a global module, e.g. `Math.random`, attach a `scope` to your `val` external:


```javascript
@scope("Math") @val external random: unit => float = "random"
let someNumber = random()

```
you can bind to an arbitrarily deep object by passing a tuple to `scope`:


```javascript
@val @scope(("window", "location", "ancestorOrigins"))
external length: int = "length"

```
This binds to `window.location.ancestorOrigins.length`.

## Special Global Values

Global values like `__filename` and `__DEV__` don't always exist; you can't even model them as an `option`, since the mere act of referring to them in ReScript (then compiled into JS) would trigger the usual `Uncaught ReferenceError: __filename is not defined` error in e.g. the browser environment.

For these troublesome global values, ReScript provides a special approach: `%external(a_single_identifier)`.


```javascript
switch %external(__DEV__) {
| Some(_) => Js.log("dev mode")
| None => Js.log("production mode")
}

```
That first line's `typeof` check won't trigger a JS ReferenceError.

Another example:


```javascript
switch %external(__filename) {
| Some(f) => Js.log(f)
| None => Js.log("non-node environment")
};

```



