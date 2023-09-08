# Language Features Overview | ReScript Language Manual


## Comparison to JS[](https://rescript-lang.org/docs/manual/latest/let-binding#comparison-to-js)

### Semicolon[](https://rescript-lang.org/docs/manual/latest/let-binding#semicolon)

| JavaScript | ReScript |
| --- | --- |
| Rules enforced by linter/formatter | No semicolon needed! |

### Comments[](https://rescript-lang.org/docs/manual/latest/let-binding#comments)

| JavaScript | ReScript |
| --- | --- |
| `// Line comment` | Same |
| `/* Comment */` | Same |
| `/** Doc Comment */` | `/** Before Types/Values */` |
|  | `/*** Standalone Doc Comment */` |

### Variable[](https://rescript-lang.org/docs/manual/latest/let-binding#variable)

| JavaScript | ReScript |
| --- | --- |
| `const x = 5;` | `let x = 5` |
| `var x = y;` | No equivalent (thankfully) |
| `let x = 5; x = x + 1;` | `let x = ref(5); x := x.contents + 1` |

### String & Character[](https://rescript-lang.org/docs/manual/latest/let-binding#string--character)

| JavaScript | ReScript |
| --- | --- |
| `"Hello world!"` | Same |
| `'Hello world!'` | Strings must use `"` |
| `"hello " + "world"` | `"hello " ++ "world"` |
| `` `hello ${message}` `` | Same |

### Boolean[](https://rescript-lang.org/docs/manual/latest/let-binding#boolean)

| JavaScript | ReScript |
| --- | --- |
| `true`, `false` | Same |
| `!true` | Same |
| `||`, `&&`, `<=`, `>=`, `<`, `>` | Same |
| `a === b`, `a !== b` | Same |
| No deep equality (recursive compare) | `a == b`, `a != b` |
| `a == b` | No equality with implicit casting (thankfully) |

### Number[](https://rescript-lang.org/docs/manual/latest/let-binding#number)

| JavaScript | ReScript |
| --- | --- |
| `3` | Same * |
| `3.1415` | Same |
| `3 + 4` | Same |
| `3.0 + 4.5` | `3.0 +. 4.5` |
| `5 % 3` | `mod(5, 3)` |

* JS has no distinction between integer and float.

### Object/Record[](https://rescript-lang.org/docs/manual/latest/let-binding#objectrecord)

| JavaScript | ReScript |
| --- | --- |
| no types | `type point = {x: int, mutable y: int}` |
| `{x: 30, y: 20}` | Same |
| `point.x` | Same |
| `point.y = 30;` | Same |
| `{...point, x: 30}` | Same |

### Array[](https://rescript-lang.org/docs/manual/latest/let-binding#array)

| JavaScript | ReScript |
| --- | --- |
| `[1, 2, 3]` | Same |
| `myArray[1] = 10` | Same |
| `[1, "Bob", true]` | `(1, "Bob", true)` * |

* Heterogenous arrays in JS are disallowed for us. Use tuple instead.

### Null[](https://rescript-lang.org/docs/manual/latest/let-binding#null)

| JavaScript | ReScript |
| --- | --- |
| `null`, `undefined` | `None` * |

* Again, only a spiritual equivalent; we don't have nulls, nor null bugs! But we do have an `option` type for when you actually need nullability.

### Function[](https://rescript-lang.org/docs/manual/latest/let-binding#function)

| JavaScript | ReScript |
| --- | --- |
| `arg => retVal` | Same |
| `function named(arg) {...}` | `let named = (arg) => {...}` |
| `const f = function(arg) {...}` | `let f = (arg) => {...}` |
| `add(4, add(5, 6))` | Same |

### Blocks[](https://rescript-lang.org/docs/manual/latest/let-binding#blocks)

| JavaScript | ReScript |
| --- | --- |
|
```
const myFun = (x, y) => {
  const doubleX = x + x;
  const doubleY = y + y;
  return doubleX + doubleY
};
```

 |

```
let myFun = (x, y) => {
  let doubleX = x + x
  let doubleY = y + y
  doubleX + doubleY
}
```

 |

### If-else[](https://rescript-lang.org/docs/manual/latest/let-binding#if-else)

* Our conditionals are always expressions! You can write `let result = if a {"hello"} else {"bye"}`

### Destructuring[](https://rescript-lang.org/docs/manual/latest/let-binding#destructuring)

| JavaScript | ReScript |
| --- | --- |
| `const {a, b} = data` | `let {a, b} = data` |
| `const [a, b] = data` | `let [a, b] = data` * |
| `const {a: aa, b: bb} = data` | `let {a: aa, b: bb} = data` |

* Gives good compiler warning that `data` might not be of length 2.

### Loop[](https://rescript-lang.org/docs/manual/latest/let-binding#loop)

| JavaScript | ReScript |
| --- | --- |
| `for (let i = 0; i <= 10; i++) {...}` | `for i in 0 to 10 {...}` |
| `for (let i = 10; i >= 0; i--) {...}` | `for i in 10 downto 0 {...}` |
| `while (true) {...}` | `while true {...}` |

### JSX[](https://rescript-lang.org/docs/manual/latest/let-binding#jsx)

| JavaScript | ReScript |
| --- | --- |
| `<Comp message="hi" onClick={handler} />` | Same |
| `<Comp message={message} />` | `<Comp message />` * |
| `<input checked />` | `<input checked=true />` |
| No children spread | `<Comp>...children</Comp>` |

* Argument punning!

### Exception[](https://rescript-lang.org/docs/manual/latest/let-binding#exception)

| JavaScript | ReScript |
| --- | --- |
| `throw new SomeError(...)` | `raise(SomeError(...))` |
| `try {a} catch (Err) {...} finally {...}` | `try a catch { | Err => ...}` * |

* No finally.

### Blocks[](https://rescript-lang.org/docs/manual/latest/let-binding#blocks-1)

The last expression of a block delimited by `{}` implicitly returns (including function body). In JavaScript, this can only be simulated via an immediately-invoked function expression (since function bodies have their own local scope).

| JavaScript | ReScript |
| --- | --- |
|
```
let result = (function() {
  const x = 23;
  const y = 34;
  return x + y;
})();
```

 |

```
let result = {
  let x = 23
  let y = 34
  x + y
}
```

 |

## Common Features' JS Output[](https://rescript-lang.org/docs/manual/latest/let-binding#common-features-js-output)

| Feature | Example | JavaScript Output |
| --- | --- | --- |
| String | `"Hello"` | `"Hello"` |
| String Interpolation | `` `Hello ${message}` `` | `"Hello " + message` |
| Character (disrecommended) | `'x'` | `120` (char code) |
| Integer | `23`, `-23` | `23`, `-23` |
| Float | `23.0`, `-23.0` | `23.0`, `-23.0` |
| Integer Addition | `23 + 1` | `23 + 1` |
| Float Addition | `23.0 +. 1.0` | `23.0 + 1.0` |
| Integer Division/Multiplication | `2 / 23 * 1` | `2 / 23 * 1` |
| Float Division/Multiplication | `2.0 /. 23.0 *. 1.0` | `2.0 / 23.0 * 1.0` |
| Float Exponentiation | `2.0 ** 3.0` | `Math.pow(2.0, 3.0)` |
| String Concatenation | `"Hello " ++ "World"` | `"Hello " + "World"` |
| Comparison | `>`, `<`, `>=`, `<=` | `>`, `<`, `>=`, `<=` |
| Boolean operation | `!`, `&&`, `||` | `!`, `&&`, `||` |
| Shallow and deep Equality | `===`, `==` | `===`, `==` |
| List (disrecommended) | `list{1, 2, 3}` | `{hd: 1, tl: {hd: 2, tl: {hd: 3, tl: 0}}}` |
| List Prepend | `list{a1, a2, ...oldList}` | `{hd: a1, tl: {hd: a2, tl: theRest}}` |
| Array | `[1, 2, 3]` | `[1, 2, 3]` |
| Record | `type t = {b: int}; let a = {b: 10}` | `var a = {b: 10}` |
| Multiline Comment | `/* Comment here */` | Not in output |
| Single line Comment | `// Comment here` | Not in output |

_Note that this is a cleaned-up comparison table; a few examples' JavaScript output are slightly different in reality._

