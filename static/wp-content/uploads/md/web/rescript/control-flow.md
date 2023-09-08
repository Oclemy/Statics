# If-Else & Loops

ReScript supports `if`, `else`, ternary expression (`a ? b : c`), `for` and `while`.

ReScript also supports our famous pattern matching, which will be covered in [its own section](pattern-matching-destructuring)

## If-Else & Ternary

Unlike its JavaScript counterpart, ReScript's `if` is an expression; they evaluate to their body's content:


```javascript
let message = if isMorning {
  "Good morning!"
} else {
  "Hello!"
}

```
**Note:** an `if-else` expression without the final `else` branch implicitly gives `()` (aka the `unit` type). So this:


```javascript
if showMenu {
  displayMenu()
}

```
is basically the same as:


```javascript
if showMenu {
  displayMenu()
} else {
  ()
}

```
Here's another way to look at it. This is clearly wrong:


```javascript
RES

`let result = if showMenu {
 1 + 2
}`


```
It'll give a type error, saying basically that the implicit `else` branch has the type `unit` while the `if` branch has type `int`. Intuitively, this makes sense: what would `result`'s value be, if `showMenu` was `false`?

We also have ternary sugar, but **we encourage you to prefer if-else when possible**.


```javascript
let message = isMorning ? "Good morning!" : "Hello!"

```
**`if-else` and ternary are much less used** in ReScript than in other languages; [Pattern-matching](pattern-matching-destructuring) kills a whole category of code that previously required conditionals.

## For Loops

For loops iterate from a starting value up to (and including) the ending value.


```javascript
for i in startValueInclusive to endValueInclusive {
  Js.log(i)
}

```

```javascript

for x in 1 to 3 {
  Js.log(x)
}

```
You can make the `for` loop count in the opposite direction by using `downto`.


```javascript
for i in startValueInclusive downto endValueInclusive {
  Js.log(i)
}

```

```javascript

for x in 3 downto 1 {
  Js.log(x)
}

```
## While Loops

While loops execute its body code block while its condition is true.

### Tips & Tricks

There's no loop-breaking `break` keyword (nor early `return` from functions, for that matter) in ReScript. However, we can break out of a while loop easily through using a [mutable binding](mutation).


```javascript
let break = ref(false)

while !break.contents {
  if Js.Math.random() > 0.3 {
    break := true
  } else {
    Js.log("Still running")
  }
}

```



