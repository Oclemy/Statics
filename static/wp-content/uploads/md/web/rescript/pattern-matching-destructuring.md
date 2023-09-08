# Pattern Matching / Destructuring

One of ReScript's **best** feature is our pattern matching. Pattern matching combines 3 brilliant features into one:

We'll dive into each aspect below.

## Destructuring

Even JavaScript has destructuring, which is "opening up" a data structure to extract the parts we want and assign variable names to them:


```javascript
let coordinates = (10, 20, 30)
let (x, _, _) = coordinates
Js.log(x) 

```
Destructuring works with most built-in data structures:


```javascript

type student = {name: string, age: int}
let student1 = {name: "John", age: 10}
let {name} = student1 


type result =
  | Success(string)
let myResult = Success("You did it!")
let Success(message) = myResult 

```
You can also use destructuring anywhere you'd usually put a binding:


```javascript
type result =
  | Success(string)
let displayMessage = (Success(m)) => {
  
  
  Js.log(m)
}
displayMessage(Success("You did it!"))

```
For a record, you can rename the field while destructuring:

You *can* in theory destructure array and list at the top level too:


```javascript
RES

`let myArray = [1, 2, 3]
let [item1, item2, _] = myArray


let myList = list{1, 2, 3}
let list{head, ...tail} = myList`


```
But the array example is **highly disrecommended** (use tuple instead) and the list example will error on you. They're only there for completeness' sake. As you'll see below, the proper way of using destructuring array and list is using `switch`.

## `switch` Based on Shape of Data

While the destructuring aspect of pattern matching is nice, it doesn't really change the way you think about structuring your code. One paradigm-changing way of thinking about your code is to execute some code based on the shape of the data.

Consider a variant:


```javascript
type payload =
  | BadResult(int)
  | GoodResult(string)
  | NoResult

```
We'd like to handle each of the 3 cases differently. For example, print a success message if the value is `GoodResult(...)`, do something else when the value is `NoResult`, etc.

In other languages, you'd end up with a series of if-elses that are hard to read and error-prone. In ReScript, you can instead use the supercharged `switch` pattern matching facility to destructure the value while calling the right code based on what you destructured:


```javascript
let data = GoodResult("Product shipped!")
switch data {
| GoodResult(theMessage) =>
  Js.log("Success! " ++ theMessage)
| BadResult(errorCode) =>
  Js.log("Something's wrong. The error code is: " ++ Js.Int.toString(errorCode))
| NoResult =>
  Js.log("Bah.")
}

```
In this case, `message` will have the value `"Success! Product shipped!"`.

Suddenly, your if-elses that messily checks some structure of the value got turned into a clean, compiler-verified, linear list of code to execute based on exactly the shape of the value.

### Complex Examples

Here's a real-world scenario that'd be a headache to code in other languages. Given this data structure:


```javascript
type status = Vacations(int) | Sabbatical(int) | Sick | Present
type reportCard = {passing: bool, gpa: float}
type person =
  | Teacher({
    name: string,
    age: int,
  })
  | Student({
    name: string,
    status: status,
    reportCard: reportCard,
  })

```
Imagine this requirement:

* Informally greet a person who's a teacher and if his name is Mary or Joe.
* Greet other teachers formally.
* If the person's a student, congratulate him/her score if they passed the semester.
* If the student has a gpa of 0 and is on vacations or sabbatical, display a different message.
* A catch-all message for a student.

ReScript can do this easily!


```javascript
let person1 = Teacher({name: "Jane", age: 35})

let message = switch person1 {
| Teacher({name: "Mary" | "Joe"}) =>
  `Hey, still going to the party on Saturday?`
| Teacher({name}) =>
  
  `Hello ${name}.`
| Student({name, reportCard: {passing: true, gpa}}) =>
  `Congrats ${name}, nice GPA of ${Js.Float.toString(gpa)} you got there!`
| Student({
    reportCard: {gpa: 0.0},
    status: Vacations(daysLeft) | Sabbatical(daysLeft)
  }) =>
  `Come back in ${Js.Int.toString(daysLeft)} days!`
| Student({status: Sick}) =>
  `How are you feeling?`
| Student({name}) =>
  `Good luck next semester ${name}!`
}

```
**Note** how we've:

* drilled deep down into the value concisely
* using a **nested pattern check** `"Mary" | "Joe"` and `Vacations | Sabbatical`
* while extracting the `daysLeft` number from the latter case
* and assigned the greeting to the binding `message`.

Here's another example of pattern matching, this time on an inline tuple.


```javascript
type animal = Dog | Cat | Bird
let categoryId = switch (isBig, myAnimal) {
| (true, Dog) => 1
| (true, Cat) => 2
| (true, Bird) => 3
| (false, Dog | Cat) => 4
| (false, Bird) => 5
}

```
**Note** how pattern matching on a tuple is equivalent to a 2D table:



| isBig  myAnimal | Dog | Cat | Bird |
| --- | --- | --- | --- |
| true | 1 | 2 | 3 |
| false | 4 | 4 | 5 |

### Fall-Through Patterns

The nested pattern check, demonstrated in the earlier `person` example, also works at the top level of a `switch`:


```javascript
let myStatus = Vacations(10)

switch myStatus {
| Vacations(days)
| Sabbatical(days) => Js.log(`Come back in ${Js.Int.toString(days)} days!`)
| Sick
| Present => Js.log("Hey! How are you?")
}

```
Having multiple cases fall into the same handling can clean up certain types of logic.

### Ignore Part of a Value

If you have a value like `Teacher(payload)` where you just want to pattern match on the `Teacher` part and ignore the `payload` completely, you can use the `_` wildcard like this:


```javascript
switch person1 {
| Teacher(_) => Js.log("Hi teacher")
| Student(_) => Js.log("Hey student")
}

```
`_` also works at the top level of the `switch`, serving as a catch-all condition:


```javascript
switch myStatus {
| Vacations(_) => Js.log("Have fun!")
| _ => Js.log("Ok.")
}

```
**Do not** abuse a top-level catch-all condition. Instead, prefer writing out all the cases:


```javascript
switch myStatus {
| Vacations(_) => Js.log("Have fun!")
| Sabbatical(_) | Sick | Present => Js.log("Ok.")
}

```
Slightly more verbose, but a one-time writing effort. This helps when you add a new variant case e.g. `Quarantined` to the `status` type and need to update the places that pattern match on it. A top-level wildcard here would have accidentally and silently continued working, potentially causing bugs.

### If Clause

Sometime, you want to check more than the shape of a value. You want to also run some arbitrary check on it. You might be tempted to write this:


```javascript
switch person1 {
| Teacher(_) => () 
| Student({reportCard: {gpa}}) =>
  if gpa < 0.5 {
    Js.log("What's happening")
  } else {
    Js.log("Heyo")
  }
}

```
`switch` patterns support a shortcut for the arbitrary `if` check, to keep your pattern linear-looking:


```javascript
switch person1 {
| Teacher(_) => () 
| Student({reportCard: {gpa}}) if gpa < 0.5 =>
  Js.log("What's happening")
| Student(_) =>
  
  Js.log("Heyo")
}

```
**Note:** Rescript versions < 9.0 had a `when` clause, not an `if` clause.  Rescript 9.0 changed `when` to `if`.  (`when` may still work, but is deprecated.)

### Match on Exceptions

If the function throws an exception (covered later), you can also match on *that*, in addition to the function's normally returned values.


```javascript
switch List.find(i => i === theItem, myItems) {
| item => Js.log(item)
| exception Not_found => Js.log("No such item found!")
}

```
### Match on Array


```javascript
let students = ["Jane", "Harvey", "Patrick"]
switch students {
| [] => Js.log("There are no students")
| [student1] =>
  Js.log("There's a single student here: " ++ student1)
| manyStudents =>
  
  Js.log2("The students are: ", manyStudents)
}

```
### Match on List

Pattern matching on list is similar to array, but with the extra feature of extracting the tail of a list (all elements except the first one):


```javascript
let rec printStudents = (students) => {
  switch students {
  | list{} => () 
  | list{student} => Js.log("Last student: " ++ student)
  | list{student1, ...otherStudents} =>
    Js.log(student1)
    printStudents(otherStudents)
  }
}
printStudents(list{"Jane", "Harvey", "Patrick"})

```
### Small Pitfall

**Note**: you can only pass literals (i.e. concrete values) as a pattern, not let-binding names or other things. The following doesn't work as expected:


```javascript
let coordinates = (10, 20, 30)
let centerY = 20
switch coordinates {
| (x, centerY, _) => Js.log(x)
}

```
A first time ReScript user might accidentally write that code, assuming that it's matching on `coordinates` when the second value is of the same value as `centerY`. In reality, this is interpreted as matching on coordinates and assigning the second value of the tuple to the name `centerY`, which isn't what's intended.

## Exhaustiveness Check

As if the above features aren't enough, ReScript also provides arguably the most important pattern matching feature: **compile-time check of missing patterns**.

Let's revisit one of the above examples:


```javascript
let message = switch person1 {
| Teacher({name: "Mary" | "Joe"}) =>
  `Hey, still going to the party on Saturday?`
| Student({name, reportCard: {passing: true, gpa}}) =>
  `Congrats ${name}, nice GPA of ${Js.Float.toString(gpa)} you got there!`
| Student({
    reportCard: {gpa: 0.0},
    status: Vacations(daysLeft) | Sabbatical(daysLeft)
  }) =>
  `Come back in ${Js.Int.toString(daysLeft)} days!`
| Student({status: Sick}) =>
  `How are you feeling?`
| Student({name}) =>
  `Good luck next semester ${name}!`
}

```
Did you see what we removed? This time, we've omitted the handling of the case where `person1` is `Teacher({name})` when `name` isn't Mary or Joe.

Failing to handle every scenario of a value likely constitutes the majority of program bugs out there. This happens very often when you refactor a piece of code someone else wrote. Fortunately for ReScript, the compiler will tell you so:


```javascript
`Warning 8: this pattern-matching is not exhaustive.
Here is an example of a value that is not matched:
Some({name: ""})`


```
**BAM**! You've just erased an entire category of important bugs before you even ran the code. In fact, this is how most of nullable values is handled:


```javascript
let myNullableValue = Some(5)

switch myNullableValue {
| Some(v) => Js.log("value is present")
| None => Js.log("value is absent")
}

```
If you don't handle the `None` case, the compiler warns. No more `undefined` bugs in your code!

## Conclusion & Tips & Tricks

Hopefully you can see how pattern matching is a game changer for writing correct code, through the concise destructuring syntax, the proper conditions handling of `switch`, and the static exhaustiveness check.

Below is some advice:

Avoid using the wildcard `_` unnecessarily. Using the wildcard `_` will bypass the compiler's exhaustiveness check. Consequently, the compiler will not be able to notify you of probable errors when you add a new case to a variant. Try only using `_` against infinite possibilities, e.g. string, int, etc.

Use the `if` clause sparingly.

**Flatten your pattern-match whenever you can**. This is a real bug remover. Here's a series of examples, from worst to best:


```javascript
let optionBoolToBool = opt => {
  if opt == None {
    false
  } else if opt === Some(true) {
    true
  } else {
    false
  }
}

```
Now that's just silly =). Let's turn it into pattern-matching:


```javascript
let optionBoolToBool = opt => {
  switch opt {
  | None => false
  | Some(a) => a ? true : false
  }
}

```
Slightly better, but still nested. Pattern-matching allows you to do this:


```javascript
let optionBoolToBool = opt => {
  switch opt {
  | None => false
  | Some(true) => true
  | Some(false) => false
  }
}

```
Much more linear-looking! Now, you might be tempted to do this:


```javascript
let optionBoolToBool = opt => {
  switch opt {
  | Some(true) => true
  | _ => false
  }
}

```
Which is much more concise, but kills the exhaustiveness check mentioned above; refrain from using that. This is the best:


```javascript
let optionBoolToBool = opt => {
  switch opt {
  | Some(trueOrFalse) => trueOrFalse
  | None => false
  }
}

```
Pretty darn hard to make a mistake in this code at this point! Whenever you'd like to use an if-else with many branches, prefer pattern matching instead. It's more concise and [performant](variant#design-decisions) too.




