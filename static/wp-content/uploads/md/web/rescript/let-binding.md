# Let Binding

A "let binding", in other languages, might be called a "variable declaration". `let` *binds* values to names. They can be seen and referenced by code that comes *after* them.


```javascript
let greeting = "hello!"
let score = 10
let newScore = 10 + score

```
## Block Scope

Bindings can be scoped through `{}`.


```javascript
let message = {
  let part1 = "hello"
  let part2 = "world"
  part1 ++ " " ++ part2
}


```
The value of the last line of a scope is implicitly returned.

### Design Decisions

ReScript's `if`, `while` and functions all use the same block scoping mechanism. The code below works **not** because of some special "if scope"; but simply because it's the same scope syntax and feature you just saw:


```javascript
if displayGreeting {
  let message = "Enjoying the docs so far?"
  Js.log(message)
}


```
## Bindings Are Immutable

Let bindings are "immutable", aka "cannot change". This helps our type system deduce and optimize much more than other languages (and in turn, help you more).

## Binding Shadowing

The above restriction might sound impractical at first. How would you change a value then? Usually, 2 ways:

The first is to realize that many times, what you want isn't to mutate a variable's value. For example, this JavaScript pattern:


```javascript
JS

`var result = 0;
result = calculate(result);
result = calculateSomeMore(result);`


```
...is really just to comment on intermediate steps. You didn't need to mutate `result` at all! You could have just written this JS:


```javascript
JS

`var result1 = 0;
var result2 = calculate(result1);
var result3 = calculateSomeMore(result2);`


```
In ReScript, this obviously works too:


```javascript
let result1 = 0
let result2 = calculate(result1)
let result3 = calculateSomeMore(result2)

```
Additionally, reusing the same let binding name overshadows the previous bindings with the same name. So you can write this too:


```javascript
let result = 0
let result = calculate(result)
let result = calculateSomeMore(result)

```
(Though for the sake of clarity, we don't recommend this).

As a matter of fact, even this is valid code:


```javascript
let result = "hello"
Js.log(result) 
let result = 1
Js.log(result) 

```
The binding you refer to is whatever's the closest upward. No mutation here!
If you need *real* mutation, e.g. passing a value around, have it modified by many pieces of code, we provide a slightly heavier [mutation feature](mutation).

## Private let bindings

Private let bindings are introduced in the release [7.2](https://rescript-lang.org/blog/bucklescript-release-7-2).

In the module system, everything is public by default,
the only way to hide some values is by providing a separate signature to
list public fields and their types:


```javascript
RES

`module A: {
 let b: int
} = {
 let a = 3
 let b = 4
}`


```
`%%private` gives you an option to mark private fields directly


```javascript
RES

`module A = {
 %%private(let a = 3)
 let b = 4
}`


```
`%%private` also applies to file level modules, so in some cases,
users do not need to provide a separate interface file just to hide some particular values.

Note interface files are still recommended as a general best practice since they give you better
separate compilation units and also they're better for documentation.

Still, `%%private` is useful in the following scenarios:

* **Code generators.** Some code generators want to hide some values but it is sometimes very hard or time consuming for code generators to synthesize the types for public fields.
* **Quick prototyping.** During prototyping, we still want to hide some values, but the interface file is not stable yet, `%%private` provides you such convenience.



