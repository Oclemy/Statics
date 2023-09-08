# Let Bindings

*Quick overview: [Let Bindings](https://reasonml.github.io/docs/en/overview#let-bindings)*

A "let binding" *binds* values to names. In other languages they might be called a "variable declaration". The binding is immutable and can be referenced by code that comes after them.

```reason
let greeting = "hello!";
let score = 10;
let newScore = 10 + score;

```

*Note: If you are coming from JavaScript, these bindings behave like `const`, not like `var` or`let`.*

## [](#bindings-are-immutable)Bindings are Immutable

Reason let bindings are "immutable", they cannot change after they are created.

```reason
let x = 10;
/* Error: Invalid code! */
x = x + 13;

```

## [](#binding-shadowing)Binding Shadowing

Bindings can be shadowed to give the appearance of updating them. This is a common pattern that should be used when it seems like a variable needs to be updated.

```reason
let x = 10;
let x = x + 10;
let x = x + 3;
/* x is 23 */

```

## [](#block-scope)Block Scope

Bindings can be manually scoped using `{}`.

```reason
let message = {
  let part1 = "hello";
  let part2 = "world";
  part1 ++ " " ++ part2
};
/* `part1` and `part2` not accessible here! */

```

The last line of a block is implicitly returned.

## [](#mutable-bindings)Mutable Bindings

If you really need a mutable binding then check out the [`ref` feature](https://reasonml.github.io/docs/en/mutable-bindings).