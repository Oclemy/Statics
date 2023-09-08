# Primitives

*Quick overview: [Primitives](https://reasonml.github.io/docs/en/overview#built-in-types)*

These are the built in types that can be used to represent information and build more complex types.

## [](#strings)Strings

*Quick overview: [Strings](https://reasonml.github.io/docs/en/overview#strings)*

Create a string using double quotes:

```reason
let s = "Hello World!";

```

Concatenate strings using the `++` operator:

```reason
let s = "Hello " ++ "World!";

```

More String functions can be found in standard libraries:

*   Native: [`module String`](https://reasonml.github.io/api/String.html)
*   BuckleScript: [`module Js.String`](https://bucklescript.github.io/bucklescript/api/Js.String.html)

```reason
let s = String.trim("  extra whitespace\n");
/* "extra whitespace" */

let s = String.concat("\n", ["line 1", "line 2"]);
/* "Line 1\nLine 2" */

let s = String.sub("Hello World!", 6, 5);
/* "World" */

```

### [](#char)Char

Create a char using single quotes:

```reason
let c = 'a';

```

Access the char at an index using `string.[index]`:

```reason
let c = "Hello".[1];
/* 'e' */

```

Convert char to string:

```reason
let s = String.make(1, 'c');
/* "c" */

let charArray = [| 'H', 'e', 'l', 'l', 'o' |];
let s = String.init(5, i => charArray[i]);
/* "Hello" */

```

## [](#integer)Integer

*Quick overview: [Numbers](https://reasonml.github.io/docs/en/overview#numbers)*

Integers are whole numbers. Their bit-size depends on the platform.

```reason
let x = 23;
let x = -23;

```

Standard operations include `+`, `-`, `*`, `/`, `mod`:

```reason
let x = 23 + 1 - 7 * 2 / 5;
let x = 13 mod 2;

```

### [](#integer-literals)Integer literals

Different radix literals can be created using prefixes `0x`, `0o`, `0b`:

```reason
let decimal = 11256099;
let hex = 0xABC123;
let octal = 0o52740443;
let binary = 0b101010111100000100100011;

```

Literals can be broken up using the `_` character which will be ignored:

```reason
let trillion = 1_000_000_000_000;

```

### [](#bitwise-operations)Bitwise operations

Use infix functions: `land`, `lor`, `lxor`, `lnot`, `lsl`, `lsr`, `asr` from [`module Pervasives`](https://reasonml.github.io/api/Pervasives.html#VAL(land))

```reason
let x = 0b1010 lor 0b1100;
/* 0b1110, 14 */

```

Many bit tricks can be found here: [bithacks](http://graphics.stanford.edu/~seander/bithacks.html)

```reason
let isPowerOfTwo = x => {
  x !== 0 && x land (x - 1) === 0
};

```

## [](#float)Float

*Quick overview: [Numbers](https://reasonml.github.io/docs/en/overview#numbers)*

Floats are 64-bit numbers that may have a decimal. They follow the [IEEE 754 standard](https://en.wikipedia.org/wiki/IEEE_754).

```reason
let x = 23.0;
let x = 23.;
let x = -23.0;

```

Standard operations include `+.`, `-.`, `*.`, `/.`, `**`:

```reason
let x = 3.0 +. 1.0 -. 7.0 *. 2.0 /. 5.0;

/* Exponentiation */
let x = 2.0 ** 3.0;

```

## [](#boolean)Boolean

*Quick overview: [Boolean](https://reasonml.github.io/docs/en/overview#boolean-values-and-logical-operations)*

Reason supports a normal set of boolean and logical operations:

*   Boolean operations: `!`, `&&`, `||`
*   Comparison: `>`, `<`, `>=`, `<=`
*   Reference equality: `===`, `!==`
*   Structural equality: `==`, `!=`

```reason
let x = true;
let y = !true;
let z = x && y || false;
```