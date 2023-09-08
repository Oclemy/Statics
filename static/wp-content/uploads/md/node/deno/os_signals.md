# Handle OS Signals


> 
> ⚠️ Windows only supports listening for SIGINT and SIGBREAK as of Deno v1.23.
> 
> 
> 


## Concepts


## Set up an OS signal listener

APIs for handling OS signals are modelled after already familiar
[`addEventListener`](https://developer.mozilla.org/en-US/docs/Web/API/EventTarget/addEventListener)
and
[`removeEventListener`](https://developer.mozilla.org/en-US/docs/Web/API/EventTarget/removeEventListener)
APIs.



> 
> ⚠️ Note that listening for OS signals doesn't prevent event loop from
> finishing, ie. if there are no more pending async operations the process will
> exit.
> 
> 
> 


You can use `Deno.addSignalListener()` function for handling OS signals:



```typescript

console.log("Press Ctrl-C to trigger a SIGINT signal");

Deno.addSignalListener("SIGINT", () => {
  console.log("interrupted!");
  Deno.exit();
});


setTimeout(() => {}, 5000);
```
Run with:



```typescript
deno run add_signal_listener.ts
```
You can use `Deno.removeSignalListener()` function to unregister previously
added signal handler.



```typescript

console.log("Press Ctrl-C to trigger a SIGINT signal");

const sigIntHandler = () => {
  console.log("interrupted!");
  Deno.exit();
};
Deno.addSignalListener("SIGINT", sigIntHandler);


setTimeout(() => {}, 5000);


setTimeout(() => {
  Deno.removeSignalListener("SIGINT", sigIntHandler);
}, 1000);
```
Run with:



```typescript
deno run signal_listeners.ts
```
## Async iterator example

If you prefer to handle signals using an async iterator, you can use
[`signal()`](https://deno.land/std/signal/mod.ts) API available in `deno_std`:



```typescript

import { signal } from "https://deno.land/std@0.181.0/signal/mod.ts";

const sig = signal("SIGUSR1", "SIGINT");


setTimeout(() => {}, 5000);

for await (const _ of sig) {
  console.log("interrupt or usr1 signal received");
}
```
Run with:



```typescript
deno run async_iterator_signal.ts
```



