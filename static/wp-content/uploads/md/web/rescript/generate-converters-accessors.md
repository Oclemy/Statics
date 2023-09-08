# Generate Converters & Helpers

**Note**: if you're looking for:

* `@deriving(jsConverter)` for records
* `@deriving({jsConverter: newType})` for records
* `@deriving(jsConverter)` for polymorphic variants

These particular ones are no longer needed. Select a doc version lower than `9.0` in the sidebar to see their old docs.

When using ReScript, you will sometimes come into situations where you want to

* Automatically generate functions that convert between ReScript's internal and JS runtime values (e.g. variants).
* Convert a record type into an abstract type with generated creation, accessor and method functions.
* Generate some other helper functions, such as functions from record attribute names.

You can use the `@deriving` decorator for different code generation scenarios. All different options and configurations will be discussed on this page.

**Note:** Please be aware that extensive use of code generation might make it harder to understand your programs (since the code being generated is not visible in the source code, and you just need to know what kind of functions / values a decorator generates).

## Generate Functions & Plain Values for Variants

Use `@deriving(accessors)` on a variant type to create accessor functions for its constructors.


```javascript
@deriving(accessors)
type action =
  | Click
  | Submit(string)
  | Cancel;

```
Variants constructors with payloads generate functions, payload-less constructors generate plain integers (the internal representation of variants).

**Note**:

### Usage


```javascript
RES

`let s = submit("hello");`


```
This is useful:

* When you're passing the accessor function as a higher-order function (which plain variant constructors aren't).
* When you'd like the JS side to use these values & functions opaquely and pass you back a variant constructor (since JS has no such thing).

Please note that in case you just want to *pipe a payload into a constructor*, you don't need to generate functions for that. Use the `->` syntax instead, e.g. `"test"->Submit`.

## Generate Field Accessors for Records

Use `@deriving(accessors)` on a record type to create accessors for its record field names.


```javascript
@deriving(accessors)
type pet = {name: string}

let pets = [{name: "bob"}, {name: "bob2"}]

pets
 ->Belt.Array.map(name)
 ->Js.Array2.joinWith("&")
 ->Js.log

```
## Generate Converters for JS Integer Enums and Variants

Use `@deriving(jsConverter)` on a variant type to create converter functions that allow back and forth conversion between JS integer enum and ReScript variant values.


```javascript
RES

`@deriving(jsConverter)
type fruit =
 | Apple
 | Orange
 | Kiwi
 | Watermelon;`


```
This option causes `jsConverter` to, again, generate functions of the following types:


```javascript
RESI

`let fruitToJs: fruit => int;

let fruitFromJs: int => option(fruit);`


```
For `fruitToJs`, each fruit variant constructor would map into an integer, starting at 0, in the order they're declared.

For `fruitFromJs`, the return value is an `option`, because not every int maps to a constructor.

You can also attach a `@as(1234)` to each constructor to customize their output.

### Usage


```javascript
RES

`@deriving(jsConverter)
type fruit =
 | Apple
 | @as(10) Orange
 | @as(100) Kiwi
 | Watermelon

let zero = fruitToJs(Apple) 

switch fruitFromJs(100) {
| Some(Kiwi) => Js.log("this is Kiwi")
| _ => Js.log("received something wrong from the JS side")
}`


```
**Note**: by using `@as` here, all subsequent number encoding changes. `Apple` is still `0`, `Orange` is `10`, `Kiwi` is `100` and `Watermelon` is **`101`**!

### More Safety

Similar to the JS object <-> record deriving, you can hide the fact that the JS enum are ints by using the same `newType` option with `@deriving(jsConverter)`:


```javascript
RES

`@deriving({jsConverter: newType})
type fruit =
 | Apple
 | @as(100) Kiwi
 | Watermelon;`


```
This option causes `@deriving(jsConverter)` to generate functions of the following types:


```javascript
RESI

`let fruitToJs: fruit => abs_fruit;

let fruitFromJs: abs_fruit => fruit;`


```
For `fruitFromJs`, the return value, unlike the previous non-abstract type case, doesn't contain an `option`, because there's no way a bad value can be passed into it; the only creator of `abs_fruit` values is `fruitToJs`!

#### Usage


```javascript
RES

`@deriving({jsConverter: newType})
type fruit =
 | Apple
 | @as(100) Kiwi
 | Watermelon

let opaqueValue = fruitToJs(Apple)

@module("myJSFruits") external jsKiwi: abs_fruit = "iSwearThisIsAKiwi"
let kiwi = fruitFromJs(jsKiwi)

let error = fruitFromJs(100)`


```
## Convert Record Type to Abstract Record

Use `@deriving(abstract)` on a record type to expand the type into a creation, and a set of getter / setter functions for fields and methods.

Usually you'd just use ReScript records to compile to JS objects of the same shape. There is still one particular use-case left where the `@deriving(abstract)` convertion is still useful: Whenever you need compile a record with an optional field where the JS object attribute shouldn't show up in the resulting JS when undefined (e.g. `{name: "Carl", age: undefined}` vs `{name: "Carl"}`). Check the [Optional Labels](#optional-labels) section for more infos on this particular scenario.

### Usage Example


```javascript
RES

`@deriving(abstract)
type person = {
 name: string,
 age: int,
 job: string,
};

@val external john : person = "john";`


```
**Note**: the `person` type is **not** a record! It's a record-looking type that uses the record's syntax and type-checking. The `@deriving(abstract)` decorator turns it into an "abstract type" (aka you don't know what the actual value's shape).

### Creation

You don't have to bind to an existing `person` object from the JS side. You can also create such `person` JS object from ReScript's side.

Since `@deriving(abstract)` turns the above `person` record into an abstract type, you can't directly create a person record as you would usually. This doesn't work: `{name: "Joe", age: 20, job: "teacher"}`.

Instead, you'd use the **creation function** of the same name as the record type, implicitly generated by the `@deriving(abstract)` annotation:


```javascript
let joe = person(~name="Joe", ~age=20, ~job="teacher")

```
Note how in the example above there is no JS runtime overhead.

#### Rename Fields

Sometimes you might be binding to a JS object with field names that are invalid in ReScript. Two examples would be `{type: "foo"}` (reserved keyword in ReScript) and `{"aria-checked": true}`. Choose a valid field name then use `@as` to circumvent this:


```javascript
@deriving(abstract)
type data = {
  @as("type") type_: string,
  @as("aria-label") ariaLabel: string,
};

let d = data(~type_="message", ~ariaLabel="hello");

```
#### Optional Labels

You can omit fields during the creation of the object:


```javascript
@deriving(abstract)
type person = {
  @optional name: string,
  age: int,
  job: string,
};

let joe = person(~age=20, ~job="teacher", ());

```
Optional values that are not defined, will not show up as an attribute in the resulting JS object. In the example above, you will see that `name` was omitted.

**Note** that the `@optional` tag turned the `name` field optional. Merely typing `name` as `option<string>` wouldn't work.

**Note**: now that your creation function contains optional fields, we mandate an unlabeled `()` at the end to indicate that [you've finished applying the function](function#optional-labeled-arguments).

### Accessors

Again, since `@deriving(abstract)` hides the actual record shape, you can't access a field using e.g. `joe.age`. We remediate this by generating getter and setters.

#### Read

One getter function is generated per `@deriving(abstract)` record type field. In the above example, you'd get 3 functions: `nameGet`, `ageGet`, `jobGet`. They take in a `person` value and return `string`, `int`, `string` respectively:


```javascript
RES

`let twenty = ageGet(joe)`


```
Alternatively, you can use the [Pipe](pipe) operator (`->`) for a nicer-looking access syntax:


```javascript
RES

`let twenty = joe->ageGet`


```
If you prefer shorter names for the getter functions, we also support a `light` setting:


```javascript
RES

`@deriving({abstract: light})
type person = {
 name: string,
 age: int,
}

let joe = person(~name="Joe", ~age=20)
let joeName = name(joe)`


```
The getter functions will now have the same names as the object fields themselves.

#### Write

A `@deriving(abstract)` value is immutable by default. To mutate such value, you need to first mark one of the abstract record field as `mutable`, the same way you'd mark a normal record as mutable:


```javascript
RES

`@deriving(abstract)
type person = {
 name: string,
 mutable age: int,
 job: string,
}`


```
Then, a setter of the name `ageSet` will be generated. Use it like so:


```javascript
RES

`let joe = person(~name="Joe", ~age=20, ~job="teacher");
ageSet(joe, 21);`


```
Alternatively, with the Pipe First syntax:

### Methods

You can attach arbitrary methods onto a type (*any* type, as a matter of fact. Not just `@deriving(abstract)` record types). See [Object Method](bind-to-js-function#object-method) in the "Bind to JS Function" section for more infos.

### Tips & Tricks

You can leverage `@deriving(abstract)` for finer-grained access control.

#### Mutability

You can mark a field as mutable in the implementation (`.res`) file, while *hiding* such mutability in the interface file:


```javascript
RES

`@deriving(abstract)
type cord = {
 @optional mutable x: int,
 y: int,
};`


```

```javascript
RESI

`@deriving(abstract)
type cord = {
 @optional x: int,
 y: int,
};`


```
Tada! Now you can mutate inside your own file as much as you want, and prevent others from doing so!

#### Hide the Creation Function

Mark the record as `private` to disable the creation function:


```javascript
RES

`@deriving(abstract)
type cord = private {
 @optional x: int,
 y: int,
}`


```
The accessors are still there, but you can no longer create such data structure. Great for binding to a JS object while preventing others from creating more such object!

#### Use submodules to prevent naming collisions and binding shadowing

Oftentimes you will have multiple abstract types with similar attributes. Since
ReScript will expand all abstract getter, setter and creation functions in the
same scope where the type is defined, you will eventually run into value shadowing problems.

**For example:**


```javascript
RES

`@deriving(abstract)
type person = {name: string}

@deriving(abstract)
type cat = {
 name: string,
 isLazy: bool,
};

let person = person(~name="Alice")


person->nameGet()`


```
To get around this issue, you can use modules to group a type with its related
functions and later use them via local open statements:


```javascript
RES

`module Person = {
 @deriving(abstract)
 type t = {name: string}
}

module Cat = {
 @deriving(abstract)
 type t = {
 name: string,
 isLazy: bool,
 }
}

let person = Person.t(~name="Alice")
let cat = Cat.t(~name="Snowball", ~isLazy=true)


let shoutPersonName = {
 open Person
 person->nameGet->Js.String.toUpperCase
}


let whisperCatName = {
 open Cat
 cat->nameGet->Js.String.toLowerCase
}`


```
## Convert External into JS Object Creation Function

Use `@obj` on an `external` binding to create a function that, when called, will evaluate to a JS object with fields corresponding to the function's parameter labels.

This is very handy because you can make some of those labelled parameters optional and if you don't pass them in, the output object won't include the corresponding fields. Thus you can use it to dynamically create objects with the subset of fields you need at runtime.

For example, suppose you need a JavaScript object like this:


```javascript
JS

`var homeRoute = {
 type: "GET",
 path: "/",
 action: () => console.log("Home"),
 
};`


```
But only the first three fields are required; the options field is optional. You can declare the binding function like so:


```javascript
RES

`@obj
external route: (
 ~"type": string,
 ~path: string,
 ~action: list<string> => unit,
 ~options: {..}=?,
 unit,
) => _ = ""`


```
**Note**: the  `= ""` part at the end is just a dummy placeholder, due to syntactic limitations. It serves no purpose currently.

This function has four labelled parameters (the fourth one optional), one unlabelled parameter at the end (which we mandate for functions with [optional parameters](function#optional-labeled-arguments), and one parameter (`"type"`) that required quoting to [avoid clashing](use-illegal-identifier-names) with the reserved `type` keyword.

Also of interest is the return type: `_`, which tells ReScript to automatically infer the full type of the JS object, sparing you the hassle of writing down the type manually!

The function is called like so:


```javascript
RES

`let homeRoute = route(
 ~"type"="GET",
 ~path="/",
 ~action=_ => Js.log("Home"),
 (),
)`


```


