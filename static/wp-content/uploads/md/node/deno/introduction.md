# Introduction

Deno ([/ˈdiːnoʊ/](http://ipa-reader.xyz/?text=%CB%88di%CB%90no%CA%8A),
pronounced `dee-no`) is a JavaScript, TypeScript, and WebAssembly runtime with
secure defaults and a great developer experience.


It's built on V8, Rust, and Tokio.


## Feature highlights


## Philosophy

Deno aims to be a productive and secure scripting environment for the modern
programmer.


Deno will always be distributed as a single executable. Given a URL to a Deno
program, it is runnable with nothing more than
[the ~31 megabyte zipped executable](https://github.com/denoland/deno/releases).
Deno explicitly takes on the role of both runtime and package manager. It uses a
standard browser-compatible protocol for loading modules: URLs.


Among other things, Deno is a great replacement for utility scripts that may
have been historically written with Bash or Python.


## Goals

* Ship as just a single executable (`deno`).
* Provide secure defaults.
	+ Unless specifically allowed, scripts can't access files, the environment, or
	the network.
* Be browser-compatible.
	+ The subset of Deno programs which are written completely in JavaScript and
	do not use the global `Deno` namespace (or feature test for it), ought to
	also be able to be run in a modern web browser without change.
* Provide built-in tooling to improve developer experience.
	+ E.g. unit testing, code formatting, and linting.
* Keep V8 concepts out of user land.
* Serve HTTP efficiently.


## Other key behaviors

* Fetch and cache remote code upon first execution, and never update it until
the code is run with the `--reload` flag. (So, this will still work on an
airplane.)
* Modules/files loaded from remote URLs are intended to be immutable and
cacheable.





