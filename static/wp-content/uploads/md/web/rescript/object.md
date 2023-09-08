# Object

ReScript objects are like [records](record), but:

* No type declaration needed.
* Structural and more polymorphic, [unlike records](record#record-types-are-found-by-field-name).
* Doesn't support updates unless the object comes from the JS side.
* Doesn't support [pattern matching](pattern-matching-destructuring).

Although ReScript records compile to clean JavaScript objects, ReScript objects are a better candidate for emulating/binding to JS objects, as you'll see.

## Type Declaration

**Optional**, unlike for records. The type of an object is inferred from the value, so you never really need to write down its type definition. Nevertheless, here's its type declaration syntax:


```javascript
type person = {
  "age": int,
  "name": string
};

```
Visually similar to record type's syntax, with the field names quoted.

## Creation

To create a new object:


```javascript
let me = {
  "age": 5,
  "name": "Big ReScript"
}

```
**Note**: as said above, unlike for record, this `me` value does **not** try to find a conforming type declaration with the field `"age"` and `"name"`; rather, the type of `me` is inferred as `{"age": int, "name": string}`. This is convenient, but also means this code passes type checking without errors:


```javascript
type person = {
  "age": int
};

let me = {
  "age": "hello!" 
}

```
Since the type checker doesn't try to match `me` with the type `person`. If you ever want to force an object value to be of a predeclared object type, just annotate the value:


```javascript
RES

`let me: person = {
 "age": "hello!"
}`


```
Now the type system will error properly.

## Access

## Update

Disallowed unless the object is a binding that comes from the JavaScript side. In that case, use `=`


```javascript
type student = {
  @set "age": int,
  @set "name": string,
}
@module("MyJSFile") external student1: student = "student1"

student1["name"] = "Mary"

```
## Combine Types

You can spread one object type definition into another using `...`:


```javascript
type point2d = {
  "x": float,
  "y": float,
}
type point3d = {
  ...point2d,
  "z": float,
}

let myPoint: point3d = {
  "x": 1.0,
  "y": 2.0,
  "z": 3.0,
}

```
This only works with object types, not object values!

## Tips & Tricks

Since objects don't require type declarations, and since ReScript infers all the types for you, you get to very quickly and easily (and dangerously) bind to any JavaScript API. Check the JS output tab:


```javascript


@val external document: 'a = "document"


document["addEventListener"](. "mouseup", _event => {
  Js.log("clicked!")
})


let loc = document["location"]


document["location"]["href"] = "rescript-lang.org"

```
The `external` feature and the usage of this trick are also documented in the [external](external#tips--tricks) section later. It's an excellent way to start writing some ReScript code without worrying about whether bindings to a particular library exists.




