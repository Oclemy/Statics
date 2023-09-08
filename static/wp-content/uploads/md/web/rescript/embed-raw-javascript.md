# Embed Raw JavaScript

## Paste Raw JS Code

First thing first. If you're ever stuck learning ReScript, remember that you can always just paste raw JavaScript code into our source file:


```javascript
%%raw(`
// look ma, regular JavaScript!
var message = "hello";
function greet(m) {
  console.log(m)
}
`)

```
The `%%raw` special ReScript call takes your code string and pastes it as-is into the output. **You've now technically written your first ReScript file!**

(The back tick syntax is a multiline string, similar to JavaScript's. Except for us, no escaping is needed inside the string. More on string in a later section.)

While `%%raw` lets you embed top-level raw JS code, `%raw` lets you embed expression-level JS code:


```javascript
let add = %raw(`
 function(a, b) {
    console.log("hello from raw JavaScript!");
    return a + b
  }
`)

Js.log(add(1, 2))

```
The above code:

* declared a ReScript variable `add`,
* with the raw JavaScript value of a function declaration,
* then called that function in ReScript.

If your boss is ever worried that your teammates can't adopt ReScript, just let them keep writing JavaScript inside ReScript files =).

## Debugger

You can also drop a `%debugger` expression in a body:


```javascript
let f = (x, y) => {
  %debugger
  x + y
}

```
Output:


```javascript
JS

`function f(x, y) {
 debugger; 
 x + y;
}`


```
## Tips & Tricks

Embedding raw JS snippets isn't the best way to experience ReScript, though it's also highly useful if you're just starting out. As a matter of fact, the first few ReScript projects were converted through:

* pasting raw JS snippets inside a file
* examining the JS output (identical to the old hand-written JS)
* gradually extract a few values and functions and making sure the output still looks OK

At the end, we get a fully safe, converted ReScript file whose JS output is clean enough that we can confidently assert that no new bug has been introduced during the conversion process.

We have a small guide on this iteration [here](converting-from-js). Feel free to peruse it later.




