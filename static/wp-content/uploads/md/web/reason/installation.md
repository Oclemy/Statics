Reason comes with its own "npm like" package manager called [esy](https://esy.sh):

```shell
npm install -g esy

```

To create your first Reason native CLI program, run the following commands:

```shell
git clone https://github.com/esy-ocaml/hello-reason.git
cd hello-reason

# Install all dependencies (might take a while in the first run)
esy

# Compile and run Hello.exe
esy x Hello

```

Reason native development is essentially OCaml development. From here on, you want to read up following websites to get to understand the ecosystem:

*   **esy**: The `esy` package manager is designed to manage your npm and opam dependencies and efficiently caches & sandboxes your project compiler and dependencies. Check out the [esy website](https://esy.sh) to find out how to install dependencies, setting up package resolutions, and executing compiled programs.
*   **opam**: The [opam package index](https://opam.ocaml.org/packages/) lists all available packages available in the OCaml ecosystem
*   **dune**: [`dune`](https://github.com/ocaml/dune) is the official build system in the OCaml ecosystem. Check out the [manual](https://dune.readthedocs.io/en/latest/) for more details on how to set up your project.

All your packages are managed in your `package.json` file. Usually you will find a `dune` file in each source code directory (such as `bin/` and `lib/`) for all the build system settings as well.

### [](#some-esy-tips)Some `esy` Tips

**Adding dependencies:**

To add Reason / OCaml packages that happen to be hosted on npm, run `esy add npm-package-name`.

```shell
esy add refmterr

```

**Opam integration:**

`esy` treats the npm scope `@opam` specially. `esy` will install any package name with the `@opam` scope directly from [opam](https://opam.ocaml.org/packages/). This is the only scope with special meaning. All other package names are assumed to be hosted on npm.

```shell
esy add @opam/bos

```

**Advanced esy configuration:**

See the [configuration](https://esy.sh/docs/en/configuration.html) section from the complete `esy` docs.

## [](#compiling-to-javascript)Compiling to JavaScript

Reason + OCaml both leverage the [js\_of\_ocaml (JSOO)](https://ocsigen.org/js_of_ocaml/3.7.0/manual/overview) compiler to compile from bytecode to JavaScript.

To get started with Reason + esy + JSOO, check out this [`hello-jsoo-esy`](https://github.com/jchavarri/hello-jsoo-esy) template:

```shell
git clone https://github.com/jchavarri/hello-jsoo-esy.git
cd hello-jsoo-esy
esy

npm install
npm run webpack

```

## [](#whats-next)What's Next?

After you have successfully compiled your first example, it's time to [set up your editor](https://reasonml.github.io/docs/en/editor-plugins) to get access to all the nice features such as auto-completion. Later on you can check out the [language basics](https://reasonml.github.io/docs/en/overview) to get a basic understanding of all the Reason language constructs.