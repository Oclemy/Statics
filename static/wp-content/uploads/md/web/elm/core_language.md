# Core Language

Let's start by getting a feeling for Elm code!

The goal here is to become familiar with **values** and **functions** so you will be more confident reading Elm code when we get to the larger examples later on.

## Values

The smallest building block in Elm is called a **value**. This includes things like `42`, `True`, and `"Hello!"`.

Let's start by looking at numbers:
```shell
\> 1 + 1
2

\>
```
Reset

All the examples on this page are interactive, so click on this black box ⬆️ and the cursor should start blinking. Type in `2 + 2` and press the ENTER key. It should print out `4`. You should be able to interact with any of the examples on this page the same way!

Try typing in things like `30 * 60 * 1000` and `2 ^ 4`. It should work just like a calculator!

Doing math is fine and all, but it is surprisingly uncommon in most programs! It is much more common to work with **strings** like this:

```shell
> "hello"
 "hello"

> "butter" ++ "fly"
  "butterfly"

>
```

Try putting some strings together with the `(++)` operator ⬆️

These primitive values get more interesting when we start writing functions to transform them!

> **Note:** You can learn more about operators like [`(+)`](https://package.elm-lang.org/packages/elm/core/latest/Basics#+) and [`(/)`](https://package.elm-lang.org/packages/elm/core/latest/Basics#/) and [`(++)`](https://package.elm-lang.org/packages/elm/core/latest/Basics#++) in the documentation for the [`Basics`](https://package.elm-lang.org/packages/elm/core/latest/Basics) module. It is worth reading through all the docs in that package at some point!

## Functions

A **function** is a way to transform values. Take in one value, and produce another.

For example, here is a `greet` function that takes in a name and says hello:

```elm
> greet name =
|   "Hello " ++ name ++ "!"
|
<function>

> greet "Alice"
"Hello Alice!"

> greet "Bob"
"Hello Bob!"


>
```

Try greeting someone else, like `"Stokely"` or `"Kwame"` ⬆️

The values passed in to the function are commonly called **arguments**, so you could say "`greet` is a function that takes one argument."

Okay, now that greetings are out of the way, how about a `madlib` function that takes *two* arguments?

```elm
> madlib animal adjective =
|   "The ostentatious " ++ animal ++ " wears " ++ adjective ++ " shorts."
|
<function>

> madlib "cat" "ergonomic"
"The ostentatious cat wears ergonomic shorts."

> madlib ("butter" ++ "fly") "metallic"
"The ostentatious butterfly wears metallic shorts."


>
```

Try giving two arguments to the `madlib` function ⬆️

Notice how we used parentheses to group `"butter" ++ "fly"` together in the second example. Each argument needs to be a primitive value like `"cat"` or it needs to be in parentheses!

> **Note:** People coming from languages like JavaScript may be surprised that functions look different here:
```elm
madlib "cat" "ergonomic"                  -- Elm
madlib("cat", "ergonomic")                // JavaScript

madlib ("butter" ++ "fly") "metallic"      -- Elm
madlib("butter" + "fly", "metallic")       // JavaScript
```

> This can be surprising at first, but this style ends up using fewer parentheses and commas. It makes the language feel really clean and minimal once you get used to it!

## If Expressions

When you want to have conditional behavior in Elm, you use an if-expression.

Let's make a new `greet` function that is appropriately respectful to president Abraham Lincoln:

```elm
> greet name =
|   if name == "Abraham Lincoln" then
|     "Greetings Mr. President!"
|   else
|     "Hey!"
|
<function>

> greet "Tom"
"Hey!"

> greet "Abraham Lincoln"
"Greetings Mr. President!"


>
```

There are probably other cases to cover, but that will do for now!

## Lists

Lists are one of the most common data structures in Elm. They hold a sequence of related things, similar to arrays in JavaScript.

Lists can hold many values. Those values must all have the same type. Here are a few examples that use functions from the [`List`](https://package.elm-lang.org/packages/elm/core/latest/List) module:

```elm
> names =
|   [ "Alice", "Bob", "Chuck" ]
|
["Alice","Bob","Chuck"]

> List.isEmpty names
False

> List.length names
3

> List.reverse names
["Chuck","Bob","Alice"]

> numbers =
|   [4,3,2,1]
|
[4,3,2,1]

> List.sort numbers
[1,2,3,4]

> increment n =
| n+1
|
<function>

> List.map increment numbers
[5,4,3,2]

>
```

Try making your own list and using functions like `List.length` ⬆️

And remember, all elements of the list must have the same type!

## Tuples

Tuples are another useful data structure. A tuple can hold two or three values, and each value can have any type. A common use is if you need to return more than one value from a function. The following function gets a name and gives a message for the user:

```elm
> isGoodName name =
|   if String.length name <= 20 then
|     (True, "name accepted!")
|   else
|     (False, "name was too long; please limit it to 20 characters")
|
<function>

> isGoodName "Tom"
(True, "name accepted!")
```

This can be quite handy, but when things start becoming more complicated, it is often best to use records instead of tuples.

## Records

A **record** can hold many values, and each value is associated with a name.

Here is a record that represents British economist John A. Hobson:

```elm
> john =
|   { first = "John"
|   , last = "Hobson"
|   , age = 81
|   }
|
{ age = 81, first = "John", last = "Hobson" }

> john.last
"Hobson"
```

We defined a record with three **fields** containing information about John's name and age.

Try accessing other fields like `john.age` ⬆️

You can also access record fields by using a "field access function" like this:

```elm
> john = { first = "John", last = "Hobson", age = 81 }
 { age = 81, first = "John", last = "Hobson" }

 > .last john "Hobson"

 > List.map .last [john,john,john] ["Hobson","Hobson","Hobson"]

```

It is often useful to **update** values in a record:

```elm
> john = { first = "John", last = "Hobson", age = 81 }
 { age = 81, first = "John", last = "Hobson" }

 > { john | last = "Adams" }
 { age = 81, first = "John", last = "Adams" }

 > { john | age = 22 }
  { age = 22, first = "John", last = "Hobson" }

```

If you wanted to say these expressions out loud, you would say something like, "I want a new version of John where his last name is Adams" or "john where the age is 22".

Notice that when we update some fields of `john` we create a whole new record. It does not overwrite the existing one. Elm makes this efficient by sharing as much content as possible. If you update one of ten fields, the new record will share the nine unchanged values.

So a function to update ages might look like this:

```elm
> celebrateBirthday person =
|   { person | age = person.age + 1 }
|
<function>

> john = { first = "John", last = "Hobson", age = 81 }
{ age = 81, first = "John", last = "Hobson" }

> celebrateBirthday john
{ age = 82, first = "John", last = "Hobson" }
```

Updating record fields like this is really common, so we will see a lot more of it in the next section!