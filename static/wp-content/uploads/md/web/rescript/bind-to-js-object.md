# Bind to JS Object

JavaScript objects are a combination of several use-cases:

ReScript cleanly separates the binding methods for JS object based on these 4 use-cases. This page documents the first three. Binding to JS module objects is described in the [Import from/Export to JS](import-from-export-to-js) section.

## Bind to Record-like JS Objects

### Bind Using ReScript Record

If your JavaScript object has fixed fields, then it's conceptually like a ReScript record. Since a ReScript record compiles to a clean JavaScript object, you can definitely type a JS object as a ReScript record!


```javascript
type person = {
  name: string,
  friends: array<string>,
  age: int,
}

@module("MySchool") external john: person = "john"

let johnName = john.name

```
External is documented [here](external). `@module` is documented [here](import-from-export-to-js).

If you want or need to use different field names on the ReScript and the JavaScript side, you can use the `@as` decorator:


```javascript
type action = {
  @as("type") type_: string
}

let action = {type_: "ADD_USER"}

```
This is useful to map to JavaScript attribute names that cannot be expressed in ReScript (such as keywords).

It is also possible to map a ReScript record to a JavaScript array by passing indices to the `@as` decorator:


```javascript
type t = {
  @as("0") foo: int,
  @as("1") bar: string,
}

let value = {foo: 7, bar: "baz"}

```
### Bind Using ReScript Object

Alternatively, you can use [ReScript object](object) to model a JS object too:


```javascript
type person = {
  "name": string,
  "friends": array<string>,
  "age": int,
}

@module("MySchool") external john: person = "john"

let johnName = john["name"]

```
### Bind Using Special Getter and Setter Attributes

Alternatively, you can use `get` and `set` to bind to individual fields of a JS object:


```javascript
type textarea
@set external setName: (textarea, string) => unit = "name"
@get external getName: textarea => string = "name"

```
You can also use `get_index` and `set_index` to access a dynamic property or an index:


```javascript
type t
@new external create: int => t = "Int32Array"
@get_index external get: (t, int) => int = ""
@set_index external set: (t, int, int) => unit = ""

let i32arr = create(3)
i32arr->set(0, 42)
Js.log(i32arr->get(0))

```
## Bind to Hash Map-like JS Object

If your JavaScript object:

Then it's not really an object, it's a hash map. Use [Js.Dict](api/js/dict), which contains operations like `get`, `set`, etc. and cleanly compiles to a JavaScript object still.

## Bind to a JS Object That's a Class

Use `new` to emulate e.g. `new Date()`:


```javascript
type t
@new external createDate: unit => t = "Date"

let date = createDate()

```
You can chain `new` and `module` if the JS module you're importing is itself a class:


```javascript
type t
@new @module external book: unit => t = "Book"
let myBook = book()

```



