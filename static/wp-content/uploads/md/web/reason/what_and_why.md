# What & Why

## [](#what-is-reason)What Is Reason?

Reason is a programming language powered by [OCaml](http://ocaml.org)'s strong type system, and has a syntax designed to feel familiar to people coming from JavaScript or C-family languages.

*Note: Reason can be translated back and forth to OCaml using `refmt`. Anything possible in Reason is also possible with OCaml and vice versa.*

## [](#why-use-reason)Why Use Reason?

The powerful typesystem underlying Reason will reduce bugs, increase maintainability, and improve the refactorabilty of your code.

## [](#different-environments)Different Environments

There are several projects that allow Reason (and OCaml) to be used in different environments.

*   **Native Executables**: Using the standard compiler native executables can be built and run directly on your machine.
    *   Tools: [dune](https://dune.build/), [esy](https://github.com/esy/esy)
*   **Browsers**: There are several projects that will compile Reason to equivalent JavaScript code that can be run in the browser.
    *   [ReScript](https://rescript-lang.org/) (formerly BuckleScript)
    *   [Js\_of\_ocaml](https://ocsigen.org/js_of_ocaml/)

## [](#where-do-i-start)Where do I start?

*   For an introduction to most language features check out the [overview](https://reasonml.github.io/docs/en/overview)
*   To start immediately an online REPL is available at [Sketch.sh](https://sketch.sh/)

## [](#alternatives)Alternatives

Here are some alternatives that share similar concepts with Reason:

*   [Rust](http://rust-lang.org). Inspired by the ML family of languages, but not garbage collected. Has excellent parallelism support.
*   [Elm](http://elm-lang.org). Another great language in the ML family. Focuses on building web applications. See the widely praised talk on Elm, [Let's Be Mainstream](https://www.youtube.com/watch?v=oYk8CKH7OhE).
*   [PureScript](http://www.purescript.org). Inspired by Haskell, compiles to the JavaScript.
*   [Fable](http://fable.io/). Based on F#, which is closely related to OCaml.
*   [ClojureScript](https://clojurescript.org). Dynamically typed language that prioritizes simplicity & great interop.
*   [Swift](https://www.apple.com/swift/). Language built by Apple, and interoperates with Objective-C well.
*   [Haxe](https://haxe.org). Compiles to basically anything with a focus on game development.