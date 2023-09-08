# Array and List

## Array

Arrays are our main ordered data structure. They work the same way as JavaScript arrays: they can be randomly accessed, dynamically resized, updated, etc.


```javascript
let myArray = ["hello", "world", "how are you"]

```
ReScript arrays' items must have the same type, i.e. homogeneous.

### Usage

See the [Js.Array](api/js/array) API.

Access & update an array item like so:


```javascript
let myArray = ["hello", "world", "how are you"]

let firstItem = myArray[0] 

myArray[0] = "hey" 

let pushedValue = Js.Array2.push(myArray, "bye")

```
## List

ReScript provides a singly linked list too. Lists are:

* immutable
* fast at prepending items
* fast at getting the head
* slow at everything else


```javascript
let myList = list{1, 2, 3}

```
Like arrays, lists' items need to be of the same type.

### Usage

You'd use list for its resizability, its fast prepend (adding at the head), and its fast split, all of which are immutable and relatively efficient.

Do **not** use list if you need to randomly access an item or insert at non-head position. Your code would end up obtuse and/or slow.

The standard lib provides a [List module](api/belt/list).

#### Immutable Prepend

Use the spread syntax:


```javascript
let myList = list{1, 2, 3}
let anotherList = list{0, ...myList}

```
`myList` didn't mutate. `anotherList` is now `list{0, 1, 2, 3}`. This is efficient (constant time, not linear). `anotherList`'s last 3 elements are shared with `myList`!

**Note that `list{a, ...b, ...c}` was a syntax error** before compiler v10.1. In general, the pattern should be used with care as its performance and allocation overhead are linear (`O(n)`).

#### Access

`switch` (described in the [pattern matching section](pattern-matching-destructuring)) is usually used to access list items:


```javascript
let message =
  switch myList {
  | list{} => "This list is empty"
  | list{a, ...rest} => "The head of the list is the string " ++ Js.Int.toString(a)
  }

```



