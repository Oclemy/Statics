# Unboxed

Consider a ReScript variant with a single payload, and a record with a single field:


```javascript
type name = Name(string)
let studentName = Name("Joe")

type greeting = {message: string}
let hi = {message: "hello!"}

```
If you check the JavaScript output, you'll see the `studentName` and `hi` JS object, as expected (see the [variant JS output](variant#javascript-output) and [record JS output](record#javascript-output) sections for details).

For performance and certain JavaScript interop situations, ReScript offers a way to unwrap (aka unbox) the JS object wrappers from the output for records with a single field and variants with a single constructor and single payload. Annotate their type declaration with the attribute `@unboxed`:


```javascript
@unboxed
type name = Name(string)
let studentName = Name("Joe")

@unboxed
type greeting = {message: string}
let hi = {message: "hello!"}

```
Check the new output! Clean.

## Usage

Why would you ever want a variant or a record with a single payload? Why not just... pass the payload? Here's one use-case for variant.

Suppose you have a game with a local/global coordinate system:


```javascript
type coordinates = {x: float, y: float}

let renderDot = (coordinates) => {
  Js.log3("Pretend to draw at:", coordinates.x, coordinates.y)
}

let toWorldCoordinates = (localCoordinates) => {
  {
    x: localCoordinates.x +. 10.,
    y: localCoordinates.x +. 20.,
  }
}

let playerLocalCoordinates = {x: 20.5, y: 30.5}

renderDot(playerLocalCoordinates)

```
Oops, that's wrong! `renderDot` should have taken global coordinates, not local ones... Let's prevent passing the wrong kind of coordinates:


```javascript
type coordinates = {x: float, y: float}
@unboxed type localCoordinates = Local(coordinates)
@unboxed type worldCoordinates = World(coordinates)

let renderDot = (World(coordinates)) => {
  Js.log3("Pretend to draw at:", coordinates.x, coordinates.y)
}

let toWorldCoordinates = (Local(coordinates)) => {
  World({
    x: coordinates.x +. 10.,
    y: coordinates.x +. 20.,
  })
}

let playerLocalCoordinates = Local({x: 20.5, y: 30.5})




renderDot(playerLocalCoordinates->toWorldCoordinates)

```
Now `renderDot` only takes `worldCoordinates`. Through a nice combination of using distinct variant types + argument destructuring, we've achieved better safety **without compromising on performance**: the `unboxed` attribute compiled to clean, variant-wrapper-less JS code! Check the output.

As for a record with a single field, the use-cases are a bit more edgy. We won't mention them here.




