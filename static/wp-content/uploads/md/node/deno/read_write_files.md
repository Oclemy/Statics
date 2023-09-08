# Read and Write Files

## Concepts


## Overview

Interacting with the filesystem to read and write files is a common requirement.
Deno provides a number of ways to do this via the
[standard library](https://deno.land/std) and the [Deno runtime API](https://deno.land/api).


As highlighted in the [Fetch Data example](https://deno.land/./fetch_data) Deno restricts
access to Input / Output by default for security reasons. Therefore when
interacting with the filesystem the `--allow-read` and `--allow-write` flags
must be used with the `deno run` command.


## Reading a text file

The Deno runtime API makes it possible to read text files via the
`Deno.readTextFile()` method, it just requires a path string or URL object. The
method returns a promise which provides access to the file's text data.


**Command:** `deno run --allow-read read.ts`



```typescript

const text = await Deno.readTextFile("./people.json");
console.log(text);


```
## Writing a text file

The Deno runtime API allows developers to write text to files via the
`Deno.writeTextFile()` method. It just requires a file path and text string. The
method returns a promise which resolves when the file was successfully written.


To run the command the `--allow-write` flag must be supplied to the `deno run`
command.


**Command:** `deno run --allow-write write.ts`



```typescript

await Deno.writeTextFile("./hello.txt", "Hello World!");
console.log("File written to ./hello.txt");


```
You can *append* text to a file like this:



```typescript
await Deno.writeTextFile("./hello.txt", "This text will be appended.", {
  append: true,
});
```
By combining `Deno.writeTextFile` and `JSON.stringify` you can easily write
serialized JSON objects to a file. This example uses synchronous
`Deno.writeTextFileSync`, but this can also be done asynchronously using
`await Deno.writeTextFile`.


To execute the code the `deno run` command needs the write flag.


**Command:** `deno run --allow-write write.ts`



```typescript

function writeJson(path: string, data: object): string {
  try {
    Deno.writeTextFileSync(path, JSON.stringify(data));

    return "Written to " + path;
  } catch (e) {
    return e.message;
  }
}

console.log(writeJson("./data.json", { hello: "World" }));


```



