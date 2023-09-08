# External Stdlib

**Since 9.0**

Your ReScript project depends on the `rescript` package as a [`devDependency`](https://docs.npmjs.com/specifying-dependencies-and-devdependencies-in-a-package-json-file), which includes our compiler, build system and runtime like `Belt`. However, you had to move it to `dependency` in `package.json` if you publish your code:

In these cases, the size or mere presence of `bs-platform` can be troublesome, since it includes not just our necessary runtime like `Belt`, but also our compiler and build system.

To solve that, we now publish our runtime as a standalone package at [`@rescript/std`](https://www.npmjs.com/package/@rescript/std), whose versions mirror `bs-platform`'s. Now you can keep `bs-platform` as a `devDependency` and have only `@rescript/std` as your runtime `dependency`.

**This is an advanced feature**. Please only use it in the aforementioned scenarios. If you already use a JS bundler with dead code elimination, you might not need this feature.

## Configuration

Say you want to publish a JS-only ReScript 9.0 library. Install the packages like this:


```javascript
SH

`npm install bs-platform@9.0.0 --save-dev
npm install @rescript/std@9.0.0`


```
Then add this to `bsconfig.json`:


```javascript
JSON

`{
 
 "external-stdlib" : "@rescript/std"
}`


```
Now the compiled JS code will import using the path defined by `external-stdlib`. Check the JS output tab:


```javascript
Belt.Array.forEach([1, 2, 3], num => Js.log(num))

```
**Make sure the version number of `bs-platform` and `@rescript/std` match in your `package.json`** to avoid running into runtime issues due to mismatching stdlib assumptions.




