# Build System Overview

ReScript comes with a build system, [`rescript`](https://www.npmjs.com/package/rescript), that's fast, lean and used as the authoritative build system of the community.

Every ReScript project needs a build description file, `bsconfig.json`.

## Options

See `rescript -help`:


```javascript
`❯ rescript -help
Available flags
-v, -version display version number
-h, -help display help
Subcommands:
 build
 clean
 format
 convert
 help
Run rescript subcommand -h for more details,
For example:
 rescript build -h
 rescript format -h
The default `rescript` is equivalent to `rescript build` subcommand`


```
## Build Project

Each build will create build artifacts from your project's source files.

**To build a project (including its dependencies / pinned-dependencies)**, run:

Which is an alias for `rescript build`.

To keep a build watcher, run:

Any new file change will be picked up and the build will re-run.

**Note**: third-party libraries (in `node_modules`, or via `pinned-dependencies`) aren't watched, as doing so may exceed the node.js watcher count limit.

**Note 2**: In case you want to set up a project in a JS-monorepo-esque approach (`npm` and `yarn` workspaces) where changes in your sub packages should be noticed by the build, you will need to define pinned dependencies in your main project's `bsconfig.json`. More details [here](./build-pinned-dependencies).

## Clean Project

If you ever get into a stale build for edge-case reasons, use:

This will clean your own project's build artifacts. To also clean the dependencies' artifacts:


```javascript
SH

`rescript clean -with-deps`


```



