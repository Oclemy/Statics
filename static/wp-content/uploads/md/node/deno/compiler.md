# Compiling Executables

`deno compile [--output <OUT>] <SRC>` will compile the script into a
self-contained executable.



```typescript
> deno compile https://deno.land/std/examples/welcome.ts
```
If you omit the `OUT` parameter, the name of the executable file will be
inferred.


## Flags

As with [`deno install`](https://deno.land/./script_installer), the runtime flags used to
execute the script must be specified at compilation time. This includes
permission flags.



```typescript
> deno compile --allow-read --allow-net https://deno.land/std/http/file_server.ts
```
[Script arguments](https://deno.land/../getting_started/command_line_interface.md#script-arguments)
can be partially embedded.



```typescript
> deno compile --allow-read --allow-net https://deno.land/std/http/file_server.ts -p 8080
> ./file_server --help
```
## Cross Compilation

You can compile binaries for other platforms by adding the `--target` CLI flag.
Deno currently supports compiling to Windows x64, macOS x64, macOS ARM and Linux
x64. Use `deno compile --help` to list the full values for each compilation
target.


## Unavailable in executables





