Deno supports a number of methods on the
[`import.meta`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/import.meta)
API:


* `import.meta.url`: returns the URL of the current module.
* `import.meta.main`: returns whether the current module is the entry point to
your program.
* `import.meta.resolve`: resolve specifiers relative to the current module.



```typescript
const worker = new Worker(import.meta.resolve("./worker.ts"));
```
The `import.meta.resolve` API takes into account the currently applied import
map, which gives you the ability to resolve "bare" specifiers as well.


With such import map loaded...



```typescript
{
  "imports": {
    "fresh": "https://deno.land/x/fresh@1.0.1/dev.ts"
  }
}
```
...you can now resolve:



```typescript

console.log(import.meta.resolve("fresh"));
```

```typescript
$ deno run resolve.js
https://deno.land/x/fresh@1.0.1/dev.ts
```



