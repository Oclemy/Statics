# TCP echo Server

## Concepts


## Example

This is an example of a server which accepts connections on port 8080, and
returns to the client anything it sends.



```typescript

const listener = Deno.listen({ port: 8080 });
console.log("listening on 0.0.0.0:8080");
for await (const conn of listener) {
  conn.readable.pipeTo(conn.writable);
}
```
Run with:



```typescript
deno run --allow-net echo_server.ts
```
To test it, try sending data to it with
[netcat](https://en.wikipedia.org/wiki/Netcat) (Linux/MacOS only). Below
`'hello world'` is sent over the connection, which is then echoed back to the
user:



```typescript
$ nc localhost 8080
hello world
hello world
```
Like the [cat.ts example](https://deno.land/./unix_cat), the `pipeTo()` method here also does
not make unnecessary memory copies. It receives a packet from the kernel and
sends back, without further complexity.





