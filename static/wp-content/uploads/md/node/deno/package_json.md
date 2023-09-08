# package.json compatibility

Deno supports resolving dependencies based on a `package.json` file in the
current or ancestor directories. This is similar to how Node.js resolves
dependencies. We recommend using import maps with `deno.json` which is explained
[here](https://deno.land/../basics/import_maps).


**package.json**



```typescript
{
  "name": "@deno/my-example-project",
  "description": "An example app created with Deno",
  "type": "module",
  "scripts": {
    "dev": "deno run --allow-env --allow-sys main.ts"
  },
  "dependencies": {
    "chalk": "^5.2"
  }
}
```
**main.ts**



```typescript
import chalk from "chalk";

console.log(chalk.green("Hello from Deno!"));
```
Then we can run this script:



```typescript
> deno run --allow-env --allow-sys main.ts
Hello from Deno!
```
Or also execute package.json scripts via `deno task`:



```typescript
> deno task dev
Hello from Deno!
```



