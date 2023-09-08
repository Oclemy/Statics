# Code Formatter

Deno ships with a built-in code formatter that will auto-format the following
files:




| File Type | Extension |
| --- | --- |
| JavaScript | `.js` |
| TypeScript | `.ts` |
| JSX | `.jsx` |
| TSX | `.tsx` |
| Markdown | `.md`, `.markdown` |
| JSON | `.json` |
| JSONC | `.jsonc` |


In addition, `deno fmt` can format code snippets in Markdown files. Snippets
must be enclosed in triple backticks and have a language attribute.



```typescript

deno fmt

deno fmt myfile1.ts myfile2.ts

deno fmt src/

deno fmt --check

cat file.ts | deno fmt -
```
## Ignoring Code

Ignore formatting code by preceding it with a `// deno-fmt-ignore` comment in
TS/JS/JSONC:



```typescript

export const identity = [
    1, 0, 0,
    0, 1, 0,
    0, 0, 1,
];
```
Or ignore an entire file by adding a `// deno-fmt-ignore-file` comment at the
top of the file.


In markdown you may use a `<!-- deno-fmt-ignore -->` comment or ignore a whole
file with a `<!-- deno-fmt-ignore-file -->` comment. To ignore a section of
markdown, surround the code with `<!-- deno-fmt-ignore-start -->` and
`<!-- deno-fmt-ignore-end -->` comments.


## Configuration


> 
> ℹ️ It is recommended to stick with default options.
> 
> 
> 


Starting with Deno v1.14 a formatter can be customized using either
[a configuration file](https://deno.land/../getting_started/configuration_file) or following
CLI flags:


* `--use-tabs` - Whether to use tabs. Defaults to false (using spaces).
* `--line-width` - The width of a line the printer will try to stay under. Note
that the printer may exceed this width in certain cases. Defaults to 80.
* `--indent-width` - The number of characters for an indent. Defaults to 2.
* `--no-semicolons` - To not use semicolons except where necessary.
* `--single-quote` - Whether to use single quote. Defaults to false (using
double quote).
* `--prose-wrap={always,never,preserve}` - Define how prose should be wrapped in
Markdown files. Defaults to "always".


Note: In Deno versions < 1.31 you will have to prefix these flags with
`options-` (ex. `--options-use-tabs`)





