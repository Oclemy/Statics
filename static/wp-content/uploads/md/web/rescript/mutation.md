# Mutation

ReScript has great traditional imperative & mutative programming capabilities. You should use these features sparingly, but sometimes they allow your code to be more performant and written in a more familiar pattern.

## Mutate Let-binding

Let-bindings are immutable, but you can wrap it with a `ref`, exposed as a record with a single mutable field in the standard library:

## Usage

You can get the actual value of a `ref` box through accessing its `contents` field:


```javascript
let five = myValue.contents 

```
Assign a new value to `myValue` like so:

We provide a syntax sugar for this:

Note that the previous binding `five` stays `5`, since it got the underlying item on the `ref` box, not the `ref` itself.

**Note**: you might see in the JS output tabs above that `ref` allocates an object. Worry not; local, non-exported `ref`s allocations are optimized away.

## Tip & Tricks

Before reaching for `ref`, know that you can achieve lightweight, local "mutations" through [overriding let bindings](let-binding#binding-shadowing).




