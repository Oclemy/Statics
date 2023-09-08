# Mutable Bindings

*Quick overview: [Refs](https://reasonml.github.io/docs/en/overview#refs)*

Refs allow mutable bindings in your program. They are a thin wrapper around a [record](https://reasonml.github.io/docs/en/record) with a mutable field called `contents`.

```reason
type ref('a) = {
  mutable contents: 'a,
};

```

There is syntax built into the language to work with `ref` structures.

*   `ref(value)` creates a ref with contents as `value`
*   `x^` accesses the contents of the ref `x`
*   `x :=` updates the contents of the ref `x`

```reason
let x = ref(10);
x := x^ + 10;
x := x^ + 3;
/* x^ is 23 */

```

If you prefer to avoid the `ref` syntax the following code is exactly equivalent to the syntax above:

```reason
let x = {contents: 10};
x.contents = x.contents + 10;
x.contents = x.contents + 3;
/* x.contents is 23 */

```

*Note: Make sure you need mutable bindings before using them. The trivial example above should **not** use mutable bindings and instead should use: [Binding Shadowing](https://reasonml.github.io/docs/en/let-binding#binding-shadowing)*