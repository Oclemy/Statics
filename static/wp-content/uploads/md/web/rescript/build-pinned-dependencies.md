# Pinned Dependencies

**Since 8.4**

Usually we'd recommend to use ReScript in a single-codebase style by using one `bsconfig.json` file for your whole codebase.

There are scenarios where you still want to connect and build multiple independent ReScript packages for one main project though (`npm` workspaces-like "monorepos"). This is where `pinned-dependencies` come into play.

## Package Types

Before we go into detail, let's first explain all the different package types recognized by the build system:

* Toplevel (this is usually the final app you are building, which has dependencies to other packages)
* Pinned dependencies (these are your local packages that should always rebuild when you build your toplevel, those should be listed in `bs-dependencies` and `pinned-dependencies`)
* Normal dependencies (these are packages that are consumed from npm and listed via `bs-dependencies`)

Whenever a package is being built (`rescript build`), the build system will build the toplevel package with its pinned-dependencies. So any changes made in a pinned dependency will automatically be reflected in the final app.

## Build System Package Rules

The build system respects the following rules for each package type:

**Toplevel**

**Pinned dependencies**

**Normal dependencies**

* Warnings, warn-error ignored
* Ignores dev directories
* Ignores pinned dependencies
* Ignores custom generator rules

So with that knowledge in mind, let's dive into some more concrete examples to see our pinned dependencies in action.

## Examples

### Yarn workspaces

Let's assume we have a codebase like this:


```javascript
`myproject/
 app/
 - src/App.res
 - bsconfig.json
 common/
 - src/Header.res
 - bsconfig.json
 myplugin/
 - src/MyPlugin.res
 - bsconfig.json
 package.json`


```
Our `package.json` file within our codebase root would look like this:


```javascript
JSON

`{
 "name": "myproject",
 "private": true,
 "workspaces": {
 "packages": [
 "app",
 "common",
 "myplugin"
 ]
 }
}`


```
Our `app` folder would be our toplevel package, consuming our `common` and `myplugin` packages as `pinned-dependencies`. The configuration for `app/bsconfig.json` looks like this:


```javascript
JSON

`{
 "name": "app",
 "version": "1.0.0",
 "sources": {
 "dir" : "src",
 "subdirs" : true
 },
 
 "bs-dependencies": [
 "common",
 "myplugin"
 ],
 "pinned-dependencies": ["common", "myplugin"],
 
}`


```
Now, whenever we are running `rescript build` within our `app` package, the compiler would always rebuild any changes within its pinned dependencies as well.

**Important:** ReScript will not rebuild any `pinned-dependencies` in watch mode! This is due to the complexity of file watching, so you'd need to set up your own file-watcher process that runs `rescript build` on specific file changes.




