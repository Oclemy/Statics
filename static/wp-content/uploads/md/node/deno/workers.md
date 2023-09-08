# Workers

Deno supports
[`Web Worker API`](https://developer.mozilla.org/en-US/docs/Web/API/Worker/Worker).


Workers can be used to run code on multiple threads. Each instance of `Worker`
is run on a separate thread, dedicated only to that worker.


Currently Deno supports only `module` type workers; thus it's essential to pass
the `type: "module"` option when creating a new worker.


Workers currently do not work in [compiled executables](https://deno.land/../tools/compiler).


Use of relative module specifiers in the main worker are only supported with
`--location <href>` passed on the CLI. This is not recommended for portability.
You can instead use the `URL` constructor and `import.meta.url` to easily create
a specifier for some nearby script. Dedicated workers, however, have a location
and this capability by default.



```typescript

new Worker(new URL("./worker.js", import.meta.url).href, { type: "module" });


new Worker(new URL("./worker.js", import.meta.url).href);
new Worker(new URL("./worker.js", import.meta.url).href, { type: "classic" });
new Worker("./worker.js", { type: "module" });
```
As with regular modules, you can use top-level `await` in worker modules.
However, you should be careful to always register the message handler before the
first `await`, since messages can be lost otherwise. This is not a bug in Deno,
it's just an unfortunate interaction of features, and it also happens in all
browsers that support module workers.



```typescript
import { delay } from "https://deno.land/std@0.181.0/async/delay.ts";


await delay(1000);




self.onmessage = (evt) => {
  console.log(evt.data);
};
```
## Instantiation permissions

Creating a new `Worker` instance is similar to a dynamic import; therefore Deno
requires appropriate permission for this action.


For workers using local modules; `--allow-read` permission is required:


**main.ts**



```typescript
new Worker(new URL("./worker.ts", import.meta.url).href, { type: "module" });
```
**worker.ts**



```typescript
console.log("hello world");
self.close();
```

```typescript
$ deno run main.ts
error: Uncaught PermissionDenied: read access to "./worker.ts", run again with the --allow-read flag

$ deno run --allow-read main.ts
hello world
```
For workers using remote modules; `--allow-net` permission is required:


**main.ts**



```typescript
new Worker("https://example.com/worker.ts", { type: "module" });
```
**worker.ts** (at https://example.com/worker.ts)



```typescript
console.log("hello world");
self.close();
```

```typescript
$ deno run main.ts
error: Uncaught PermissionDenied: net access to "https://example.com/worker.ts", run again with the --allow-net flag

$ deno run --allow-net main.ts
hello world
```
## Using Deno in worker


> 
> Starting in v1.22 the `Deno` namespace is available in worker scope by
> default. To enable the namespace in earlier versions pass
> `deno: { namespace: true }` when creating a new worker.
> 
> 
> 


**main.js**



```typescript
const worker = new Worker(new URL("./worker.js", import.meta.url).href, {
  type: "module",
});

worker.postMessage({ filename: "./log.txt" });
```
**worker.js**



```typescript
self.onmessage = async (e) => {
  const { filename } = e.data;
  const text = await Deno.readTextFile(filename);
  console.log(text);
  self.close();
};
```
**log.txt**



```typescript
hello world
```

```typescript
$ deno run --allow-read main.js
hello world
```

> 
> Starting in v1.23 `Deno.exit()` no longer exits the process with the provided
> exit code. Instead is an alias to `self.close()`, which causes only the worker
> to shutdown. This better aligns with the Web platform, as there is no way in
> the browser for a worker to close the page.
> 
> 
> 


## Specifying worker permissions


> 
> This is an unstable Deno feature. Learn more about
> [unstable features](https://deno.land/./stability).
> 
> 
> 


The permissions available for the worker are analogous to the CLI permission
flags, meaning every permission enabled there can be disabled at the level of
the Worker API. You can find a more detailed description of each of the
permission options [here](https://deno.land/../basics/permissions).


By default a worker will inherit permissions from the thread it was created in,
however in order to allow users to limit the access of this worker we provide
the `deno.permissions` option in the worker API.


* For permissions that support granular access you can pass in a list of the
desired resources the worker will have access to, and for those who only have
the on/off option you can pass true/false respectively.



```typescript
const worker = new Worker(new URL("./worker.js", import.meta.url).href, {
  type: "module",
  deno: {
    permissions: {
      net: [
        "https://deno.land/",
      ],
      read: [
        new URL("./file_1.txt", import.meta.url),
        new URL("./file_2.txt", import.meta.url),
      ],
      write: false,
    },
  },
});
```
* Granular access permissions receive both absolute and relative routes as
arguments, however take into account that relative routes will be resolved
relative to the file the worker is instantiated in, not the path the worker
file is currently in



```typescript
const worker = new Worker(
  new URL("./worker/worker.js", import.meta.url).href,
  {
    type: "module",
    deno: {
      permissions: {
        read: [
          "/home/user/Documents/deno/worker/file_1.txt",
          "./worker/file_2.txt",
        ],
      },
    },
  },
);
```
* Both `deno.permissions` and its children support the option `"inherit"`, which
implies it will borrow its parent permissions.



```typescript

const worker = new Worker(new URL("./worker.js", import.meta.url).href, {
  type: "module",
  deno: {
    permissions: "inherit",
  },
});
```

```typescript

const worker = new Worker(new URL("./worker.js", import.meta.url).href, {
  type: "module",
  deno: {
    permissions: {
      env: false,
      hrtime: false,
      net: "inherit",
      ffi: false,
      read: false,
      run: false,
      write: false,
    },
  },
});
```
* Not specifying the `deno.permissions` option or one of its children will cause
the worker to inherit by default.



```typescript

const worker = new Worker(new URL("./worker.js", import.meta.url).href, {
  type: "module",
});
```

```typescript

const worker = new Worker(new URL("./worker.js", import.meta.url).href, {
  type: "module",
  deno: {
    permissions: {
      net: false,
    },
  },
});
```
* You can disable the permissions of the worker all together by passing `"none"`
to the `deno.permissions` option.



```typescript

const worker = new Worker(new URL("./worker.js", import.meta.url).href, {
  type: "module",
  deno: {
    permissions: "none",
  },
});
```





