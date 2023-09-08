# Import from/Export to JS

You've seen how ReScript's idiomatic [Import & Export](import-export) works. This section describes how we work with importing stuff from JavaScript and exporting stuff for JavaScript consumption.

**Note**: due to JS ecosystem's module compatibility issues, our advice of keeping your ReScript file's compiled JS output open in a tab applies here **more than ever**, as you don't want to subtly output the wrong JS module import/export code, on top of having to deal with Babel/Webpack/Jest/Node's CommonJS<->ES6 compatibility shims.

In short: **make sure your bindings below output what you'd have manually written in JS**.

## Output Format

We support 2 JavaScript import/export formats:

The format is [configurable in via `bsconfig.json`](build-configuration#package-specs).

## Import From JavaScript

### Import a JavaScript Module's Named Export

Use the `module` <external>:

ReScriptJS Output (CommonJS)JS Output (ES6)


```javascript

@module("path") external dirname: string => string = "dirname"
let root = dirname("/User/github") 

```
Here's what the `external` does:

* `@module("path")`: pass the name of the JS module; in this case, `"path"`. The string can be anything: `"./src/myJsFile"`, `"@myNpmNamespace/myLib"`, etc.
* `external`: the general keyword for declaring a value that exists on the JS side.
* `dirname`: the binding name you'll use on the ReScript side.
* `string => string`: the type signature of `dirname`. Mandatory for `external`s.
* `= "dirname"`: the name of the variable inside the `path` JS module. There's repetition in writing the first and second `dirname`, because sometime the binding name you want to use on the ReScript side is different than the variable name the JS module exported.

### Import a JavaScript Module As a Single Value

By omitting the string argument to `module`, you bind to the whole JS module:

ReScriptJS Output (CommonJS)JS Output (ES6)


```javascript
@module external leftPad: string => int => string = "./leftPad"
let paddedResult = leftPad("hi", 5)

```
Depending on whether you're compiling ReScript to CommonJS or ES6 module, **this feature will generate subtly different code**. Please check both output tabs to see the difference. The ES6 output here would be wrong!

### Import an ES6 Default Export

Use the value `"default"` on the right hand side:


```javascript
@module("./student") external studentName: string = "default"
Js.log(studentName)

```
## Export To JavaScript

### Export a Named Value

As mentioned in ReScript's idiomatic [Import & Export](import-export), every let binding and module is exported by default to other ReScript modules (unless you use a `.resi` [interface file](module#signatures)). If you open up the compiled JS file, you'll see that these values can also directly be used by a *JavaScript* file too.

### Export an ES6 Default Value

If your JS project uses ES6 modules, you're likely exporting & importing some default values:


```javascript
JS

`export default name = "Al";`


```

```javascript
JS

`import studentName from 'student.js';`


```
A JavaScript default export is really just syntax sugar for a named export implicitly called `default` (now you know!). So to export a default value from ReScript, you can just do:

ReScriptJS Output (CommonJS)JS Output (ES6)

You can then import this default export as usual on the JS side:


```javascript
JS

`import studentName from 'ReScriptStudent.js';`


```
If your JavaScript's ES6 default import is transpiled by Babel/Webpack/Jest into CommonJS `require`s, we've taken care of that too! See the CommonJS output tab for `__esModule`.




