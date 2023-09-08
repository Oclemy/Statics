# Reading Types

In the [Core Language](https://guide.elm-lang.org/core_language.html) section of this book, we went through a bunch of interactive examples to get a feeling for the language. Well, we are going to do it again, but with a new question in mind. What **type** of value is that?

## Primitives and Lists

Let's enter some simple expressions and see what happens:

```elm
> "hello"
"hello" : String

> not True
False : Bool

> round 3.1415
3 : Int
```

Click on this black box ⬆️ and the cursor should start blinking. Type in `3.1415` and press the ENTER key. It should print out `3.1415` followed by the type `Float`.

Okay, but what is going on here exactly? Each entry shows value along with what **type** of value it happens to be. You can read these examples out loud like this:

*   The value `"hello"` is a `String`.
*   The value `False` is a `Bool`.
*   The value `3` is an `Int`.
*   The value `3.1415` is a `Float`.

Elm is able to figure out the type of any value you enter! Let's see what happens with lists:

```elm
> [ "Alice", "Bob" ]
["Alice","Bob"] : List String

> [ 1.0, 8.6, 42.1 ]
[1.0,8.6,42.1] : List Float
```

You can read these types as:

1.  We have a `List` filled with `String` values.
2.  We have a `List` filled with `Float` values.

The **type** is a rough description of the particular value we are looking at.

## Functions

Let's see the type of some functions:

```elm
> String.length
<function> : String -> Int

```

Try entering `round` or `sqrt` to see some other function types ⬆️

The `String.length` function has type `String -> Int`. This means it *must* take in a `String` argument, and it will definitely return an `Int` value. So let's try giving it an argument:

```elm
> String.length "Supercalifragilisticexpialidocious"
34 : Int
```

So we start with a `String -> Int` function and give it a `String` argument. This results in an `Int`.

What happens when you do not give a `String` though? Try entering `String.length [1,2,3]` or `String.length True` to see what happens ⬆️

You will find that a `String -> Int` function *must* get a `String` argument!

> **Note:** Functions that take multiple arguments end up having more and more arrows. For example, here is a function that takes two arguments:
>
> `> String.repeat <function> : Int -> String -> String`
>
> \>
>
> Reset
>
> Giving two arguments like `String.repeat 3 "ha"` will produce `"hahaha"`. It works to think of `->` as a weird way to separate arguments, but I explain the real reasoning [here](https://guide.elm-lang.org/appendix/function_types.html). It is pretty neat!

## Type Annotations

So far we have just let Elm figure out the types, but it also lets you write a **type annotation** on the line above a definition. So when you are writing code, you can say things like this:

```shell
half : Float -> Float
half n =
  n / 2

-- half 256 == 128
-- half "3" -- error!

hypotenuse : Float -> Float -> Float
hypotenuse a b =
  sqrt (a^2 + b^2)

-- hypotenuse 3 4  == 5
-- hypotenuse 5 12 == 13

checkPower : Int -> String
checkPower powerLevel =
  if powerLevel > 9000 then "It's over 9000!!!" else "Meh"

-- checkPower 9001 == "It's over 9000!!!"
-- checkPower True -- error!

```

Adding type annotations is not required, but it is definitely recommended! Benefits include:

1.  **Error Message Quality** — When you add a type annotation, it tells the compiler what you are *trying* to do. Your implementation may have mistakes, and now the compiler can compare against your stated intent. “You said argument `powerLevel` was an `Int`, but it is getting used as a `String`!”
2.  **Documentation** — When you revisit code later (or when a colleague visits it for the first time) it can be really helpful to see exactly what is going in and out of the function without having to read the implementation super carefully.

People can make mistakes in type annotations though, so what happens if the annotation does not match the implementation? The compiler figures out all the types on its own, and it checks that your annotation matches the real answer. In other words, the compiler will always verify that all the annotations you add are correct. So you get better error messages *and* documentation always stays up to date!

## Type Variables

As you look through more Elm code, you will start to see type annotations with lower-case letters in them. A common example is the `List.length` function:

```elm
> List.length
<function> : List a -> Int
```
Notice that lower-case `a` in the type? That is called a **type variable**. It can vary depending on how [`List.length`](https://package.elm-lang.org/packages/elm/core/latest/List#length) is used:

```elm
> List.length [1,1,2,3,5,8]
6 : Int

> List.length [ "a", "b", "c" ]
3 : Int

> List.length [ True, False ]
2 : Int
```

We just want the length, so it does not matter what is in the list. So the type variable `a` is saying that we can match any type. Let’s look at another common example:

```elm
> List.reverse
<function> : List a -> List a

> List.reverse [ "a", "b", "c" ]
["c","b","a"] : List String

> List.reverse [ True, False ]
[False,True] : List Bool
```

Again, the type variable `a` can vary depending on how [`List.reverse`](https://package.elm-lang.org/packages/elm/core/latest/List#reverse) is used. But in this case, we have an `a` in the argument and in the result. This means that if you give a `List Int` you must get a `List Int` as well. Once we decide what `a` is, that’s what it is everywhere.

> **Note:** Type variables must start with a lower-case letter, but they can be full words. We could write the type of `List.length` as `List value -> Int` and we could write the type of `List.reverse` as `List element -> List element`. It is fine as long as they start with a lower-case letter. Type variables `a` and `b` are used by convention in many places, but some type annotations benefit from more specific names.

## Constrained Type Variables

There is a special variant of type variables in Elm called **constrained** type variables. The most common example is the `number` type. The [`negate`](https://package.elm-lang.org/packages/elm/core/latest/Basics#negate) function uses it:

```elm
> negate
<function> : number -> number
```

Try expressions like `negate 3.1415` and `negate (round 3.1415)` and `negate "hi"` ⬆️

Normally type variables can get filled in with anything, but `number` can only be filled in by `Int` and `Float` values. It *constrains* the possibilities.

The full list of constrained type variables is:

*   `number` permits `Int` and `Float`
*   `appendable` permits `String` and `List a`
*   `comparable` permits `Int`, `Float`, `Char`, `String`, and lists/tuples of `comparable` values
*   `compappend` permits `String` and `List comparable`

These constrained type variables exist to make operators like `(+)` and `(<)` a bit more flexible.

By now we have covered types for values and functions pretty well, but what does this look like when we start wanting more complex data structures?