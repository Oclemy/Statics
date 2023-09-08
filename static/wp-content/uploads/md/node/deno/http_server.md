# Simple HTTP Web Server

## Concepts

* Use Deno's integrated HTTP server to run your own web server.


## Overview

With just a few lines of code you can run your own HTTP web server with control
over the response status, request headers and more.


## Sample web server

In this example, the user-agent of the client is returned to the client:


**webserver.ts**:



```typescript

const server = Deno.listen({ port: 8080 });
console.log(`HTTP webserver running. Access it at: http://localhost:8080/`);


for await (const conn of server) {
  
  
  serveHttp(conn);
}

async function serveHttp(conn: Deno.Conn) {
  
  const httpConn = Deno.serveHttp(conn);
  
  
  for await (const requestEvent of httpConn) {
    
    
    const body = `Your user-agent is:nn${
 requestEvent.request.headers.get("user-agent") ?? "Unknown"
 }`;
    
    
    requestEvent.respondWith(
      new Response(body, {
        status: 200,
      }),
    );
  }
}
```
Then run this with:



```typescript
deno run --allow-net webserver.ts
```
Then navigate to `http://localhost:8080/` in a browser.


### Using the `std/http` library


> 
> ℹ️ Since
> [the stabilization of *native* HTTP bindings in
> `^1.13.x`](https://deno.com/blog/v1.13#stabilize-native-http-server-api),
> std/http now supports a *native* HTTP server from ^0.107.0. The legacy server
> module was removed in 0.117.0.
> 
> 
> 


**webserver.ts**:



```typescript
import { serve } from "https://deno.land/std@0.181.0/http/server.ts";

const port = 8080;

const handler = (request: Request): Response => {
  const body = `Your user-agent is:nn${
 request.headers.get("user-agent") ?? "Unknown"
 }`;

  return new Response(body, { status: 200 });
};

console.log(`HTTP webserver running. Access it at: http://localhost:8080/`);
await serve(handler, { port });
```
Then run this with:



```typescript
deno run --allow-net webserver.ts
```



