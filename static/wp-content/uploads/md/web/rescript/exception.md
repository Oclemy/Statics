# Exception

Exceptions are just a special kind of variant, thrown in **exceptional** cases (don't abuse them!).

## Usage


```javascript
let getItem = (item: int) =>
  if (item === 3) {
    
    1
  } else {
    raise(Not_found)
  }

let result =
  try {
    getItem(2)
  } catch {
  | Not_found => 0 
  }

```
Note that the above is just for demonstration purposes; in reality, you'd return an `option<int>` directly from `getItem` and avoid the `try` altogether.

You can directly match on exceptions *while* getting another return value from a function:


```javascript
switch List.find(i => i === 4, list{1, 2, 3}) {
| item => Js.log(item)
| exception Not_found => Js.log("No such item found!")
}

```
You can also make your own exceptions like you'd make a variant (exceptions need to be capitalized too).


```javascript
exception InputClosed(string)

raise(InputClosed("The stream has closed!"))

```
## Catching JS Exceptions

To distinguish between JavaScript exceptions and ReScript exceptions, ReScript namespaces JS exceptions under the `Js.Exn.Error(payload)` variant. To catch an exception thrown from the JS side:

Throw an exception from JS:


```javascript
JS

`exports.someJsFunctionThatThrows = () => {
 throw new Error("A Glitch in the Matrix!");
}`


```
Then catch it from ReScript:


```javascript
RES

`@module("./Example") 
external someJsFunctionThatThrows: () => unit = "someJsFunctionThatThrows"

try {
 
 someJSFunctionThatThrows()
} catch {
| Js.Exn.Error(obj) =>
 switch Js.Exn.message(obj) {
 | Some(m) => Js.log("Caught a JS exception! Message: " ++ m)
 | None => ()
 }
}`


```
The `obj` here is of type `Js.Exn.t`, intentionally opaque to disallow illegal operations. To operate on `obj`, do like the code above by using the standard library's [`Js.Exn`](api/js/exn) module's helpers.

## Raise a JS Exception

`raise(MyException)` raises a ReScript exception. To raise a JavaScript exception (whatever your purpose is), use `Js.Exn.raiseError`:


```javascript
let myTest = () => {
  Js.Exn.raiseError("Hello!")
}

```
Then you can catch it from the JS side:


```javascript
JS

`try {
 myTest()
} catch (e) {
 console.log(e.message) 
}`


```
## Catch ReScript Exceptions from JS

The previous section is less useful than you think; to let your JS code work with your exception-throwing ReScript code, the latter doesn't actually need to throw a JS exception. ReScript exceptions can be used by JS code!


```javascript
exception BadArgument({myMessage: string})

let myTest = () => {
  raise(BadArgument({myMessage: "Oops!"}))
}

```
Then, in your JS:


```javascript
JS

`try {
 myTest()
} catch (e) {
 console.log(e.myMessage) 
 console.log(e.Error.stack) 
}`


```

> Note: `RE_EXN_ID` is an internal field for bookkeeping purposes. Don't use it on the JS side. Use the other fields.
> 
> 

The above `BadArgument` exception takes an inline record type. We special-case compile the exception as `{RE_EXN_ID, myMessage, Error}` for good ergonomics. If the exception instead took ordinary positional arguments, l like the standard library's `Invalid_argument("Oops!")`, which takes a single argument, the argument is compiled to JS as the field `_1` instead. A second positional argument would compile to `_2`, etc.

## Tips & Tricks

When you have ordinary variants, you often don't **need** exceptions. For example, instead of throwing when `item` can't be found in a collection, try to return an `option<item>` (`None` in this case) instead.

### Catch Both ReScript and JS Exceptions in the Same `catch` Clause


```javascript
RES

`try {
 someOtherJSFunctionThatThrows()
} catch {
| Not_found => ... 
| Invalid_argument(_) => ... 
| Js.Exn.Error(obj) => ... 
}`


```
This technically works, but hopefully you don't ever have to work with such code...




