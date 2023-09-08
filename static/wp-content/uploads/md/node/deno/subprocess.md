# Creating a Subprocess

## Concepts

* Deno is capable of spawning a subprocess via [Deno.run](https://deno.land/api?s=Deno.run).
* `--allow-run` permission is required to spawn a subprocess.
* Spawned subprocesses do not run in a security sandbox.
* Communicate with the subprocess via the [stdin](https://deno.land/api?s=Deno.stdin),
[stdout](https://deno.land/api?s=Deno.stdout) and [stderr](https://deno.land/api?s=Deno.stderr) streams.
* Use a specific shell by providing its path/name and its string input switch,
e.g. `Deno.run({cmd: ["bash", "-c", "ls -la"]});`


## Simple example

This example is the equivalent of running `'echo hello'` from the command line.



```typescript



const cmd = ["echo", "hello"];


const p = Deno.run({ cmd });


await p.status();
```

> 
> Note: If using Windows, the command above would need to be written differently
> because `echo` is not an executable binary (rather, it is a built-in shell
> command):
> 
> 
> 



```typescript

const cmd = ["cmd", "/c", "echo hello"];
```
Run it:



```typescript
$ deno run --allow-run ./subprocess_simple.ts
hello
```
## Security

The `--allow-run` permission is required for creation of a subprocess. Be aware
that subprocesses are not run in a Deno sandbox and therefore have the same
permissions as if you were to run the command from the command line yourself.


## Communicating with subprocesses

By default when you use `Deno.run()` the subprocess inherits `stdin`, `stdout`
and `stderr` of the parent process. If you want to communicate with started
subprocess you can use `"piped"` option.



```typescript

const fileNames = Deno.args;

const p = Deno.run({
  cmd: [
    "deno",
    "run",
    "--allow-read",
    "https://deno.land/std@0.181.0/examples/cat.ts",
    ...fileNames,
  ],
  stdout: "piped",
  stderr: "piped",
});


const [{ code }, rawOutput, rawError] = await Promise.all([
  p.status(),
  p.output(),
  p.stderrOutput(),
]);

if (code === 0) {
  await Deno.stdout.write(rawOutput);
} else {
  const errorString = new TextDecoder().decode(rawError);
  console.log(errorString);
}

Deno.exit(code);
```
When you run it:



```typescript
$ deno run --allow-run ./subprocess.ts <somefile>
[file content]

$ deno run --allow-run ./subprocess.ts non_existent_file.md

Uncaught NotFound: No such file or directory (os error 2)
    at DenoError (deno/js/errors.ts:22:5)
    at maybeError (deno/js/errors.ts:41:12)
    at handleAsyncMsgFromRust (deno/js/dispatch.ts:27:17)
```
## Piping to files

This example is the equivalent of running `yes &> ./process_output` in bash.



```typescript


import { mergeReadableStreams } from "https://deno.land/std@0.181.0/streams/merge_readable_streams.ts";


const file = await Deno.open("./process_output.txt", {
  read: true,
  write: true,
  create: true,
});


const process = Deno.run({
  cmd: ["yes"],
  stdout: "piped",
  stderr: "piped",
});


const joined = mergeReadableStreams(
  process.stdout.readable,
  process.stderr.readable,
);


joined.pipeTo(file.writable).then(() => console.log("pipe join done"));


setTimeout(() => {
  process.kill("SIGINT");
}, 100);
```
Run it:



```typescript
$ deno run --allow-run ./subprocess_piping_to_file.ts
```



