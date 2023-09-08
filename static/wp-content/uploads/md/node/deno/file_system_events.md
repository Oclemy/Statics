# File System Events

## Concepts

* Use [Deno.watchFs](https://deno.land/api?s=Deno.watchFs) to watch for file system events.
* Results may vary between operating systems.


## Example

To poll for file system events in the current directory:



```typescript

const watcher = Deno.watchFs(".");
for await (const event of watcher) {
  console.log(">>>> event", event);
  
}
```
Run with:



```typescript
deno run --allow-read watcher.ts
```
Now try adding, removing and modifying files in the same directory as
`watcher.ts`.


Note that the exact ordering of the events can vary between operating systems.
This feature uses different syscalls depending on the platform:





