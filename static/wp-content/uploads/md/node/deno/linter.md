# Linter

Deno ships with a built-in code linter for JavaScript and TypeScript.



```typescript

deno lint

deno lint myfile1.ts myfile2.ts

deno lint src/

deno lint --json

cat file.ts | deno lint -
```
For more detail, run `deno lint --help`.


## Available rules

For a complete list of supported rules visit
[the deno_lint rule documentation](https://lint.deno.land).


## Ignore directives

### Files

To ignore whole file `// deno-lint-ignore-file` directive should placed at the
top of the file:


Ignore directive must be placed before first statement or declaration:



```typescript






import { bar } from "./bar.js";

function foo(): any {
  
}
```
You can also ignore certain diagnostics in the whole file


### Diagnostics

To ignore certain diagnostic `// deno-lint-ignore <codes...>` directive should
be placed before offending line. Specifying ignored rule name is required:



```typescript

function foo(): any {
  
}


function bar(a: any) {
  
}
```
## Configuration

Starting with Deno v1.14 a linter can be customized using either
[a configuration file](https://deno.land/../getting_started/configuration_file) or following
CLI flags:


* `--rules-tags` - List of tag names that will be run. Empty list disables all
tags and will only use rules from `include`. Defaults to "recommended".
* `--rules-exclude` - List of rule names that will be excluded from configured
tag sets. Even if the same rule is in `include` it will be excluded; in other
words, `--rules-exclude` has higher precedence over `--rules-include`.
* `--rules-include` - List of rule names that will be run. If the same rule is
in `exclude` it will be excluded.





