# Elm

> A delightful language for reliable web applications.

## Testimonials

Some of the testimonials from software engineers:

- *"It is the most productive programming language I have used."*
- *"[My favorite thing] is the feeling of joy and relaxation when writing Elm code."*
- *"Using Elm, I can deploy and go to sleep!"*
- *"You just follow the compiler errors and come out the other end with a working app."*
- *"You can learn it in a day and keep it in your head even if you don’t use it for weeks."*
- *"The language helps steer you towards writing api’s that are simple and clear."*
- *"My favorite thing about Elm is that I don’t have to worry when coding"*
- *"I love how fast Elm is. I make a change and I get an immediate response."*
- *"Everything in core fits together like Lego."*
- *"Thanks to Elm, now I just go and build things in peace. It’s wonderful."*

## No Runtime Exceptions

> Elm uses type inference to detect corner cases and give friendly hints. NoRedInk switched to Elm about four years ago, and 300k+ lines later, they still have not had to scramble to fix a confusing runtime exception in production.

```shell
-- TYPE MISMATCH ---------------------------- Main.elm

The 1st argument to `drop` is not what I expect:

8|   List.drop (String.toInt userInput) [1,2,3,4,5,6]
                ^^^^^^^^^^^^^^^^^^^^^^
This `toInt` call produces:

    Maybe Int

But `drop` needs the 1st argument to be:

    Int

Hint: Use Maybe.withDefault to handle possible errors.
```

## Fearless refactoring

> The compiler guides you safely through your changes, ensuring confidence even through the most widereaching refactorings in unfamiliar codebases.

*"Whether it's renaming a function or a type, or making a drastic change in a core data type, you just follow the compiler errors and come out the other end with a working app."*

## Understand anyone's code

> Including your own, six months later. All Elm programs are written in the same pattern, eliminating doubt and lengthy discussions when deciding how to build new projects and making it easy to navigate old or foreign codebases.

```elm
-- THE ELM ARCHITECTURE

init : ( Model, Cmd Msg )

update : Msg -> Model -> ( Model, Cmd Msg )

subscriptions : Model -> Sub Msg

view : Model -> Html Msg
```

## Fast and friendly feedback

Enjoy Elm's [famously helpful](https://twitter.com/ID_AA_Carmack/status/735197548034412546?s=20) error messages. Even on codebases with hundreds of thousands lines of code, compilation is done in a blink.

> I love how fast Elm is. I make a change and I get an immediate response. It’s like I’m having a conversation with the compiler about how best to build things.

## Great Performance

> Elm has its own virtual DOM implementation, designed for simplicity and speed. All values are immutable in Elm, and the benchmarks show that this helps us generate particularly fast JavaScript code.

## Enforced Semantic Versioning

Elm detects all API changes automatically thanks to its type system. We use that information to guarantee that every single Elm package follows semantic versioning precisely. No surprises in PATCH releases.

```shell
$ elm diff Microsoft/elm-json-tree-view 1.0.0 2.0.0
This is a MAJOR change.

---- JsonTree - MAJOR ----

    Changed:
      - parseString : String -> Result String Node
      + parseString : String -> Result Error Node

      - parseValue : Value -> Result String Node
      + parseValue : Value -> Result Error Node
```

## Small Assets

Smaller assets means faster downloads and faster page loads, so Elm does a bunch of optimizations to make small assets the default. Just compile with the `--optimize` flag and let the compiler do the rest. No complicated set up.

## JavaScript Interop

Elm can take over a single node, so you can try it out on a small part of an existing project. Try it for something small. See if you like it.

```js
var Elm = require('./dist/elm/main.js');

var app = Elm.Main.init({
  node: document.getElementById('elm-app')
});

// set up ports here
```