# Pipe

ReScript provides a tiny but surprisingly useful operator `->`, called the "pipe", that allows you to "flip" your code inside-out. `a(b)` becomes `b->a`. It's a simple piece of syntax that doesn't have any runtime cost.

Why would you use it? Imagine you have the following:


```javascript
validateAge(getAge(parseData(person)))

```
This is slightly hard to read, since you need to read the code from the innermost part, to the outer parts. Use pipe to streamline it:


```javascript
person
  ->parseData
  ->getAge
  ->validateAge

```
Basically, `parseData(person)` is transformed into `person->parseData`, and `getAge(person->parseData)` is transformed into `person->parseData->getAge`, etc.

**This works when the function takes more than one argument too**.

is the same as

This also works with labeled arguments.

Pipes are used to emulate object-oriented programming. For example, `myStudent.getName` in other languages like Java would be `myStudent->getName` in ReScript (equivalent to `getName(myStudent)`). This allows us to have the readability of OOP without the downside of dragging in a huge class system just to call a function on a piece of data.

## Tips & Tricks

Do **not** abuse pipes; they're a means to an end. Inexperienced engineers sometimes shape a library's API to take advantage of the pipe. This is backwards.

## JS Method Chaining

*This section requires understanding of [our binding API](bind-to-js-function#object-method)*.

JavaScript's APIs are often attached to objects, and are often chainable, like so:


```javascript
JS

`const result = [1, 2, 3].map(a => a + 1).filter(a => a % 2 === 0);

asyncRequest()
 .setWaitDuration(4000)
 .send();`


```
Assuming we don't need the chaining behavior above, we'd bind to each case this using [`@send`](/syntax-lookup#send-decorator) from the aforementioned binding API page:


```javascript
type request
@val external asyncRequest: unit => request = "asyncRequest"
@send external setWaitDuration: (request, int) => request = "setWaitDuration"
@send external send: request => unit = "send"

```
You'd use them like this:


```javascript
let result = Js.Array2.filter(
  Js.Array2.map([1, 2, 3], a => a + 1),
  a => mod(a, 2) == 0
)

send(setWaitDuration(asyncRequest(), 4000))

```
This looks much worse than the JS counterpart! Clean it up visually with pipe:


```javascript
let result = [1, 2, 3]
  ->Js.Array2.map(a => a + 1)
  ->Js.Array2.filter(a => mod(a, 2) == 0)

asyncRequest()->setWaitDuration(4000)->send

```
## Pipe Into Variants

You can pipe into a variant's constructor as if it was a function:


```javascript
let result = name->preprocess->Some

```
We turn this into:


```javascript
let result = Some(preprocess(name))

```
**Note** that using a variant constructor as a function wouldn't work anywhere else beside here.

## Pipe Placeholders

A placeholder is written as an underscore and it tells ReScript that you want to fill in an argument of a function later. These two have equivalent meaning:


```javascript
RES

`let addTo7 = (x) => add3(3, x, 4)
let addTo7 = add3(3, _, 4)`


```
Sometimes you don't want to pipe the value you have into the first position. In these cases you can mark a placeholder value to show which argument you would like to pipe into.

Let's say you have a function `namePerson`, which takes a `person` then a `name` argument. If you are transforming a person then pipe will work as-is:


```javascript
makePerson(~age=47, ())
  ->namePerson("Jane")

```
If you have a name that you want to apply to a person object, you can use a placeholder:


```javascript
getName(input)
  ->namePerson(personDetails, _)

```
This allows you to pipe into any positional argument. It also works for named arguments:


```javascript
getName(input)
  ->namePerson(~person=personDetails, ~name=_)

```
## Triangle Pipe (Deprecated)

You might see usages of another pipe, `|>`, in some codebases. These are deprecated.

Unlike `->` pipe, the `|>` pipe puts the subject as the last (not first) argument of the function. `a |> f(b)` turns into `f(b, a)`.

For a more thorough discussion on the rationale and differences between the two operators, please refer to the [Data-first and Data-last comparison by Javier Chávarri](https://www.javierchavarri.com/data-first-and-data-last-a-comparison/)




