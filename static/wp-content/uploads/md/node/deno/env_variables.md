# Environment variables

There are a few ways to use environment variables in Deno:


## Built-in `Deno.env`

The Deno runtime offers built-in support for environment variables with
[`Deno.env`](https://deno.land/api@v1.25.3?s=Deno.env).


`Deno.env` has getter and setter methods. Here is example usage:



```typescript
Deno.env.set("FIREBASE_API_KEY", "examplekey123");
Deno.env.set("FIREBASE_AUTH_DOMAIN", "firebasedomain.com");

console.log(Deno.env.get("FIREBASE_API_KEY")); 
console.log(Deno.env.get("FIREBASE_AUTH_DOMAIN")); 
console.log(Deno.env.has("FIREBASE_AUTH_DOMAIN")); 
```
## `.env` file

You can also put environment variables in a `.env` file and retrieve them using
`dotenv` in the standard library.


Let's say you have an `.env` file that looks like this:


To access the environment variables in the `.env` file, import the `load`
function from the standard library. Then, import the configuration using it.



```typescript
import { load } from "https://deno.land/std/dotenv/mod.ts";

const env = await load();
const password = env["PASSWORD"];

console.log(password);

```
## `std/flags`

The Deno standard library has a
[`std/flags` module](https://deno.land/std@0.181.0/flags/README.md?source=)
for parsing command line arguments.





