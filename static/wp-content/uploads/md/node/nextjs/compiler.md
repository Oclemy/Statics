# Next.js Compiler



**Version History**


| Version | Changes |
| --- | --- |
| `v13.1.0` | [Module Transpilation and [Modularize Imports stable. |
| `v13.0.0` | SWC Minifier enabled by default. |
| `v12.3.0` | SWC Minifier stable |
| `v12.2.0` | [SWC Plugins experimental support added. |
| `v12.1.0` | Added support for Styled Components, Jest, Relay, Remove React Properties, Legacy Decorators, Remove Console, and jsxImportSource. |
| `v12.0.0` | Next.js Compiler introduced |



The Next.js Compiler, written in Rust using [SWC](http://swc.rs/), allows Next.js to transform and minify your JavaScript code for production. This replaces Babel for individual files and Terser for minifying output bundles.


Compilation using the Next.js Compiler is 17x faster than Babel and enabled by default since Next.js version 12. If you have an existing Babel configuration or are using [unsupported features your application will opt-out of the Next.js Compiler and continue using Babel.


[SWC](http://swc.rs/) is an extensible Rust-based platform for the next generation of fast developer tools.


SWC can be used for compilation, minification, bundling, and more – and is designed to be extended. It's something you can call to perform code transformations (either built-in or custom). Running those transformations happens through higher-level tools like Next.js.


We chose to build on SWC for a few reasons:


* **Extensibility:** SWC can be used as a Crate inside Next.js, without having to fork the library or workaround design constraints.
* **Performance:** We were able to achieve ~3x faster Fast Refresh and ~5x faster builds in Next.js by switching to SWC, with more room for optimization still in progress.
* **WebAssembly:** Rust's support for WASM is essential for supporting all possible platforms and taking Next.js development everywhere.
* **Community:** The Rust community and ecosystem are amazing and still growing.


We're working to port `babel-plugin-styled-components` to the Next.js Compiler.


First, update to the latest version of Next.js: `npm install next@latest`. Then, update your `next.config.js` file:



```javascript
module.exports = {
  compiler: {
    
    styledComponents: boolean | {
      
      
      displayName?: boolean,
      
      ssr?: boolean,
      
      fileName?: boolean,
      
      topLevelImportPaths?: string[],
      
      meaninglessFileNames?: string[],
      
      cssProp?: boolean,
      
      namespace?: string,
      
      minify?: boolean,
      
      transpileTemplateLiterals?: boolean,
      
      pure?: boolean,
    },
  },
}

```

`minify`, `transpileTemplateLiterals` and `pure` are not yet implemented. You can follow the progress [here](https://github.com/vercel/next.js/issues/30802). `ssr` and `displayName` transforms are the main requirement for using `styled-components` in Next.js.


The Next.js Compiler transpiles your tests and simplifies configuring Jest together with Next.js including:


* Auto mocking of `.css`, `.module.css` (and their `.scss` variants), and image imports
* Automatically sets up `transform` using SWC
* Loading `.env` (and all variants) into `process.env`
* Ignores `node_modules` from test resolving and transforms
* Ignoring `.next` from test resolving
* Loads `next.config.js` for flags that enable experimental SWC transforms


First, update to the latest version of Next.js: `npm install next@latest`. Then, update your `jest.config.js` file:



```javascript

const nextJest = require('next/jest')


const createJestConfig = nextJest({ dir: './' })


const customJestConfig = {
  setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],
}


module.exports = createJestConfig(customJestConfig)

```

To enable Relay support:



```javascript

module.exports = {
  compiler: {
    relay: {
      
      src: './',
      artifactDirectory: './__generated__',
      language: 'typescript',
    },
  },
}

```

NOTE: In Next.js all JavaScript files in `pages` directory are considered routes. So, for `relay-compiler` you'll need to specify `artifactDirectory` configuration settings outside of the `pages`, otherwise `relay-compiler` will generate files next to the source file in the `__generated__` directory, and this file will be considered a route, which will break production builds.


Allows to remove JSX properties. This is often used for testing. Similar to `babel-plugin-react-remove-properties`.


To remove properties matching the default regex `^data-test`:



```javascript

module.exports = {
  compiler: {
    reactRemoveProperties: true,
  },
}

```

To remove custom properties:



```javascript

module.exports = {
  compiler: {
    
    
    reactRemoveProperties: { properties: ['^data-custom$'] },
  },
}

```

This transform allows for removing all `console.*` calls in application code (not `node_modules`). Similar to `babel-plugin-transform-remove-console`.


Remove all `console.*` calls:



```javascript

module.exports = {
  compiler: {
    removeConsole: true,
  },
}

```

Remove `console.*` output except `console.error`:



```javascript

module.exports = {
  compiler: {
    removeConsole: {
      exclude: ['error'],
    },
  },
}

```

Next.js will automatically detect `experimentalDecorators` in `jsconfig.json` or `tsconfig.json`. Legacy decorators are commonly used with older versions of libraries like `mobx`.


This flag is only supported for compatibility with existing applications. We do not recommend using legacy decorators in new applications.


First, update to the latest version of Next.js: `npm install next@latest`. Then, update your `jsconfig.json` or `tsconfig.json` file:



```javascript
{
  "compilerOptions": {
    "experimentalDecorators": true
  }
}

```

Next.js will automatically detect `jsxImportSource` in `jsconfig.json` or `tsconfig.json` and apply that. This is commonly used with libraries like [Theme UI](https://theme-ui.com).


First, update to the latest version of Next.js: `npm install next@latest`. Then, update your `jsconfig.json` or `tsconfig.json` file:



```javascript
{
  "compilerOptions": {
    "jsxImportSource": "theme-ui"
  }
}

```

We're working to port `@emotion/babel-plugin` to the Next.js Compiler.


First, update to the latest version of Next.js: `npm install next@latest`. Then, update your `next.config.js` file:



```javascript


module.exports = {
  compiler: {
    emotion: boolean | {
      
      sourceMap?: boolean,
      
      autoLabel?: 'never' | 'dev-only' | 'always',
      
      
      
      
      
      
      labelFormat?: string,
      
      
      
      
      importMap?: {
        [packageName: string]: {
          [exportName: string]: {
            canonicalImport?: [string, string],
            styledBaseImport?: [string, string],
          }
        }
      },
    },
  },
}

```

Next.js' swc compiler is used for minification by default since v13. This is 7x faster than Terser.


If Terser is still needed for any reason this can be configured.



```javascript


module.exports = {
  swcMinify: false,
}

```

Next.js can automatically transpile and bundle dependencies from local packages (like monorepos) or from external dependencies (`node_modules`). This replaces the `next-transpile-modules` package.



```javascript


module.exports = {
  transpilePackages: ['@acme/ui', 'lodash-es'],
}

```


**Examples**

Allows to modularize imports, similar to [babel-plugin-transform-imports](https://www.npmjs.com/package/babel-plugin-transform-imports).


Transforms member style imports of packages that use a “barrel file” (a single file that re-exports other modules):



```javascript
import { Row, Grid as MyGrid } from 'react-bootstrap'
import { merge } from 'lodash'

```

...into default style imports of each module. This prevents compilation of unused modules:



```javascript
import Row from 'react-bootstrap/Row'
import MyGrid from 'react-bootstrap/Grid'
import merge from 'lodash/merge'

```

Config for the above transform:



```javascript

module.exports = {
  modularizeImports: {
    'react-bootstrap': {
      transform: 'react-bootstrap/{{member}}',
    },
    lodash: {
      transform: 'lodash/{{member}}',
    },
  },
}

```

This transform uses handlebars to template the replacement import path in the `transform` field. These variables and helper functions are available:


1. `member`: Has type `string`. The name of the member import.
2. `lowerCase`, `upperCase`, `camelCase`, `kebabCase`: Helper functions to convert a string to lower, upper, camel or kebab cases.
3. `matches`: Has type `string[]`. All groups matched by the regular expression. `matches.[0]` is the full match.


For example, you can use the `kebabCase` helper like this:



```javascript

module.exports = {
  modularizeImports: {
    'my-library': {
      transform: 'my-library/{{ kebabCase member }}',
    },
  },
}

```

The above config will transform your code as follows:



```javascript

import { MyModule } from 'my-library'


import MyModule from 'my-library/my-module'

```

You can also use regular expressions using Rust regex crate’s syntax:



```javascript

module.exports = {
  modularizeImports: {
    'my-library/?(((w*)?/?)*)': {
      transform: 'my-library/{{ matches.[1] }}/{{member}}',
    },
  },
}

```

The above config will transform your code as follows:



```javascript

import { MyModule } from 'my-library'
import { App } from 'my-library/components'
import { Header, Footer } from 'my-library/components/App'


import MyModule from 'my-library/MyModule'
import App from 'my-library/components/App'
import Header from 'my-library/components/App/Header'
import Footer from 'my-library/components/App/Footer'

```

By default, `modularizeImports` assumes that each module uses default exports. However, this may not always be the case — named exports may be used.



```javascript


export const MyModule = {}



export { MyModule } from './MyModule'

```

In this case, you can use the `skipDefaultConversion` option to use named imports instead of default imports:



```javascript

module.exports = {
  modularizeImports: {
    'my-library': {
      transform: 'my-library/{{member}}',
      skipDefaultConversion: true,
    },
  },
}

```

The above config will transform your code as follows:



```javascript

import { MyModule } from 'my-library'


import { MyModule } from 'my-library/MyModule'

```

If you use the `preventFullImport` option, the compiler will throw an error if you import a “barrel file” using default import. If you use the following config:



```javascript

module.exports = {
  modularizeImports: {
    lodash: {
      transform: 'lodash/{{member}}',
      preventFullImport: true,
    },
  },
}

```

The compiler will throw an error if you try to import the full `lodash` library (instead of using named imports):



```javascript

import lodash from 'lodash'

```

While the minifier is experimental, we are making the following options available for debugging purposes. They will not be available once the minifier is made stable.



```javascript


module.exports = {
  experimental: {
    swcMinifyDebugOptions: {
      compress: {
        defaults: true,
        side_effects: false,
      },
    },
  },
}

```

If your app works with the options above, it means `side_effects` is the problematic option.
See [the SWC documentation](https://swc.rs/docs/configuration/minification#jscminifycompress) for detailed options.


You can generate SWC's internal transform traces as chromium's [trace event format](https://docs.google.com/document/d/1CvAClvFfyA5R-PhYUmn5OOQtYMH4h6I0nSsKchNAySU/preview?mode=html#%21=).



```javascript


module.exports = {
  experimental: {
    swcTraceProfiling: true,
  },
}

```

Once enabled, swc will generate trace named as `swc-trace-profile-${timestamp}.json` under `.next/`. Chromium's trace viewer (chrome://tracing/, <https://ui.perfetto.dev/>), or compatible flamegraph viewer (<https://www.speedscope.app/>) can load & visualize generated traces.


You can configure swc's transform to use SWC's experimental plugin support written in wasm to customize transformation behavior.



```javascript


module.exports = {
  experimental: {
    swcPlugins: [
      [
        'plugin',
        {
          ...pluginOptions,
        },
      ],
    ],
  },
}

```

`swcPlugins` accepts an array of tuples for configuring plugins. A tuple for the plugin contains the path to the plugin and an object for plugin configuration. The path to the plugin can be an npm module package name or an absolute path to the `.wasm` binary itself.


When your application has a `.babelrc` file, Next.js will automatically fall back to using Babel for transforming individual files. This ensures backwards compatibility with existing applications that leverage custom Babel plugins.


If you're using a custom Babel setup, [please share your configuration](https://github.com/vercel/next.js/discussions/30174). We're working to port as many commonly used Babel transformations as possible, as well as supporting plugins in the future.




