# Record

Records are like JavaScript objects but:

## Type Declaration

A record needs a mandatory type declaration:


```javascript
type person = {
  age: int,
  name: string,
}

```
## Creation

To create a `person` record (declared above):


```javascript
let me = {
  age: 5,
  name: "Big ReScript"
}

```
When you create a new record value, ReScript tries to find a record type declaration that conforms to the shape of the value. So the `me` value here is inferred as of type `person`.

The type is found by looking above the `me` value. **Note**: if the type instead resides in another file or module, you need to explicitly indicate which file or module it is:


```javascript

type person = {age: int, name: string}

```

```javascript


let me: School.person = {age: 20, name: "Big ReScript"}

let me2 = {School.age: 20, name: "Big ReScript"}

```
In both `me` and `me2` the record definition from `School` is found. The first one, `me` with the regular type annotation, is preferred.

## Access

Use the familiar dot notation:

## Immutable Update

New records can be created from old records with the `...` spread operator. The original record isn't mutated.


```javascript
let meNextYear = {...me, age: me.age + 1}

```
**Note**: spread cannot add new fields to the record value, as a record's shape is fixed by its type.

## Mutable Update

Record fields can optionally be mutable. This allows you to efficiently update those fields in-place with the `=` operator.


```javascript
type person = {
  name: string,
  mutable age: int
}

let baby = {name: "Baby ReScript", age: 5}
baby.age = baby.age + 1 

```
Fields not marked with `mutable` in the type declaration cannot be mutated.

## JavaScript Output

ReScript records compile to straightforward JavaScript objects; see the various JS output tabs above.

## Optional Record Fields

ReScript [`v10`](/blog/release-10-0-0#experimental-optional-record-fields) introduced optional record fields. This means that you can define fields that can be omitted when creating the record. It looks like this:


```javascript
type person = {
  age: int,
  name?: string
}

```
Notice how `name` has a suffixed `?`. That means that the field itself is *optional*.

### Creation

You can omit any optional fields when creating a record. Not setting an optional field will default the field's value to `None`:


```javascript
type person = {
  age: int,
  name?: string
}

let me = {
  age: 5,
  name: "Big ReScript"
}

let friend = {
  age: 7
}

```
This has consequences for pattern matching, which we'll expand a bit on soon.

## Immutable Update

Updating an optional field via an immutable update above lets you set that field value without needing to care whether it's optional or not.


```javascript
type person = {
  age: int,
  name?: string
}

let me = {
  age: 123,
  name: "Hello"
}

let withoutName = {
  ...me,
  name: "New Name"
}

```
However, if you want to set the field to an optional value, you prefix that value with `?`:


```javascript
type person = {
  age: int,
  name?: string
}

let me = {
  age: 123,
  name: "Hello"
}

let maybeName = Some("My Name")

let withoutName = {
  ...me,
  name: ?maybeName
}

```
You can unset an optional field's value via that same mechanism by setting it to `?None`.

### Pattern Matching on Optional Fields

[Pattern matching](pattern-matching-destructuring), one of ReScript's most important features, has two caveats when you deal with optional fields.

When matching on the value directly, it's an `option`. Example:


```javascript
type person = {
  age: int,
  name?: string,
}

let me = {
  age: 123,
  name: "Hello",
}

let isRescript = switch me.name {
| Some("ReScript") => true
| Some(_) | None => false
}

```
But, when matching on the field as part of the general record structure, it's treated as the underlying, non-optional value:


```javascript
type person = {
  age: int,
  name?: string,
}

let me = {
  age: 123,
  name: "Hello",
}

let isRescript = switch me {
| {name: "ReScript"} => true
| _ => false
}


```
Sometimes you *do* want to know whether the field was set or not. You can tell the pattern matching engine about that by prefixing your option match with `?`, like this:


```javascript
type person = {
  age: int,
  name?: string,
}

let me = {
  age: 123,
  name: "Hello",
}

let nameWasSet = switch me {
| {name: ?None} => false
| {name: ?Some(_)} => true
}

```
## Tips & Tricks

### Record Types Are Found By Field Name

With records, you **cannot** say "I'd like this function to take any record type, as long as they have the field `age`". The following **won't work as intended**:


```javascript
type person = {age: int, name: string}
type monster = {age: int, hasTentacles: bool}

let getAge = (entity) => entity.age

```
Instead, `getAge` will infer that the parameter `entity` must be of type `monster`, the closest record type with the field `age`. The following code's last line fails:


```javascript
RES

`let kraken = {age: 9999, hasTentacles: true}
let me = {age: 5, name: "Baby ReScript"}

getAge(kraken)
getAge(me)`


```
The type system will complain that `me` is a `person`, and that `getAge` only works on `monster`. If you need such capability, use ReScript objects, described [here](object).

### Optional Fields in Records Can Be Useful for Bindings

Many JavaScript APIs tend to have large configuration objects that can be a bit annoying to model as records, since you previously always needed to specify all record fields when creating a record. 

Optional record fields, introduced in [`v10`](/blog/release-10-0-0#experimental-optional-record-fields), is intended to help with this. Optional fields will let you avoid having to specify all fields, and let you just specify the one's you care about. A significant improvement in ergonomics for bindings and other APIs with for example large configuration objects.

## Design Decisions

After reading the constraints in the previous sections, and if you're coming from a dynamic language background, you might be wondering why one would bother with record in the first place instead of straight using object, since the former needs explicit typing and doesn't allow different records with the same field name to be passed to the same function, etc.

1. The truth is that most of the times in your app, your data's shape is actually fixed, and if it's not, it can potentially be better represented as a combination of variant (introduced next) + record instead.
2. Since a record type is resolved through finding that single explicit type declaration (we call this "nominal typing"), the type error messages end up better than the counterpart ("structural typing", like for tuples). This makes refactoring easier; changing a record type's fields naturally allows the compiler to know that it's still the same record, just misused in some places. Otherwise, under structural typing, it might get hard to tell whether the definition site or the usage site is wrong.



