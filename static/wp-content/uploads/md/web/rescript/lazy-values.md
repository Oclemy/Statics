# Lazy Value

If you have some expensive computations you'd like to **defer and cache** subsequently, you can wrap it with `lazy`:


```javascript

let expensiveFilesRead = lazy({
  Js.log("Reading dir")
  Node.Fs.readdirSync("./pages")
})

```
Check the JS Output tab: that `expensiveFilesRead`'s code isn't executed yet, even though you declared it! You can carry it around without fearing that it'll run the directory read.

**Note**: a lazy value is **not** a [shared data type](shared-data-types). Don't rely on its runtime representation in your JavaScript code.

## Execute The Lazy Computation

To actually run the lazy value's computation, use `Lazy.force` from the globally available `Lazy` module:


```javascript

Js.log(Lazy.force(expensiveFilesRead)) 


Js.log(Lazy.force(expensiveFilesRead)) 

```
The first time `Lazy.force` is called, the expensive computation happens and the result is **cached**. The second time, the cached value is directly used.

**You can't re-trigger the computation after the first `force` call**. Make sure you only use a lazy value with computations whose results don't change (e.g. an expensive server request whose response is always the same).

Instead of using `Lazy.force`, you can also use [pattern matching](pattern-matching-destructuring) to trigger the computation:


```javascript
switch expensiveFilesRead {
| lazy(result) => Js.log(result)
}

```
Since pattern matching also works on a `let` binding, you can also do:


```javascript
let lazy(result) = expensiveFilesRead
Js.log(result)

```
## Exception Handling

For completeness' sake, our files read example might raise an exception because of `readdirSync`. Here's how you'd handle it:


```javascript
let result = try {
  Lazy.force(expensiveFilesRead)
} catch {
| Not_found => [] 
}

```
Though you should probably handle the exception inside the lazy computation itself.




