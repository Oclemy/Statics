# Environment Variables



**Examples**

Next.js comes with built-in support for environment variables, which allows you to do the following:


Next.js has built-in support for loading environment variables from `.env.local` into `process.env`.


An example `.env.local`:



```javascript
DB_HOST=localhost
DB_USER=myuser
DB_PASS=mypassword

```

This loads `process.env.DB_HOST`, `process.env.DB_USER`, and `process.env.DB_PASS` into the Node.js environment automatically allowing you to use them in [Next.js data fetching methods and [API routes example, using `getStaticProps` async function getStaticProps() {
  const db = await myDB.connect({
    host: process.env.DB_HOST,
    username: process.env.DB_USER,
    password: process.env.DB_PASS,
  })
  
}

```


> 
> **Note**: In order to keep server-only secrets safe, environment variables are evaluated at build time, so only environment variables *actually* used will be included. This means that `process.env` is not a standard JavaScript object, so you’re not able to
> use [object destructuring](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Destructuring_assignment).
> Environment variables must be referenced as e.g. `process.env.PUBLISHABLE_KEY`, *not* `const { PUBLISHABLE_KEY } = process.env`.
> 
> 
> 



> 
> **Note**: Next.js will automatically expand variables (`$VAR`) inside of your `.env*` files.
> This allows you to reference other secrets, like so:
> 
> 
> 
> ```javascript
> 
> HOSTNAME=localhost
> PORT=8080
> HOST=http://$HOSTNAME:$PORT
> 
> ```
> 
> If you are trying to use a variable with a `$` in the actual value, it needs to be escaped like so: `$`.
> 
> 
> For example:
> 
> 
> 
> ```javascript
> 
> A=abc
> 
> 
> WRONG=pre$A
> 
> 
> CORRECT=pre$A
> 
> ```
> 
> 



> 
> **Note**: If you are using a `/src` folder, please note that Next.js will load the .env files **only** from the parent folder and **not** from the `/src` folder.
> 
> 
> 


By default environment variables are only available in the Node.js environment, meaning they won't be exposed to the browser.


In order to expose a variable to the browser you have to prefix the variable with `NEXT_PUBLIC_`. For example:



```javascript
NEXT_PUBLIC_ANALYTICS_ID=abcdefghijk

```

This loads `process.env.NEXT_PUBLIC_ANALYTICS_ID` into the Node.js environment automatically, allowing you to use it anywhere in your code. The value will be inlined into JavaScript sent to the browser because of the `NEXT_PUBLIC_` prefix. This inlining occurs at build time, so your various `NEXT_PUBLIC_` envs need to be set when the project is built.



```javascript

import setupAnalyticsService from '../lib/my-analytics-service'



setupAnalyticsService(process.env.NEXT_PUBLIC_ANALYTICS_ID)

function HomePage() {
  return <h1>Hello World</h1>
}

export default HomePage

```

Note that dynamic lookups will *not* be inlined, such as:



```javascript

const varName = 'NEXT_PUBLIC_ANALYTICS_ID'
setupAnalyticsService(process.env[varName])


const env = process.env
setupAnalyticsService(env.NEXT_PUBLIC_ANALYTICS_ID)

```

In general only one `.env.local` file is needed. However, sometimes you might want to add some defaults for the `development` (`next dev`) or `production` (`next start`) environment.


Next.js allows you to set defaults in `.env` (all environments), `.env.development` (development environment), and `.env.production` (production environment).


`.env.local` always overrides the defaults set.



> 
> **Note**: `.env`, `.env.development`, and `.env.production` files should be included in your repository as they define defaults. **`.env*.local` should be added to `.gitignore`**, as those files are intended to be ignored. `.env.local` is where secrets can be stored.
> 
> 
> 


When deploying your Next.js application to [Vercel](https://vercel.com), Environment Variables can be configured [in the Project Settings](https://vercel.com/docs/concepts/projects/environment-variables?utm_source=next-site&utm_medium=docs&utm_campaign=next-website).


All types of Environment Variables should be configured there. Even Environment Variables used in Development – which can be [downloaded onto your local device](https://vercel.com/docs/concepts/projects/environment-variables#development-environment-variables?utm_source=next-site&utm_medium=docs&utm_campaign=next-website) afterwards.


If you've configured [Development Environment Variables](https://vercel.com/docs/concepts/projects/environment-variables#development-environment-variables?utm_source=next-site&utm_medium=docs&utm_campaign=next-website) you can pull them into a `.env.local` for usage on your local machine using the following command:



```javascript
vercel env pull .env.local

```

Apart from `development` and `production` environments, there is a 3rd option available: `test`. In the same way you can set defaults for development or production environments, you can do the same with a `.env.test` file for the `testing` environment (though this one is not as common as the previous two). Next.js will not load environment variables from `.env.development` or `.env.production` in the `testing` environment.


This one is useful when running tests with tools like `jest` or `cypress` where you need to set specific environment vars only for testing purposes. Test default values will be loaded if `NODE_ENV` is set to `test`, though you usually don't need to do this manually as testing tools will address it for you.


There is a small difference between `test` environment, and both `development` and `production` that you need to bear in mind: `.env.local` won't be loaded, as you expect tests to produce the same results for everyone. This way every test execution will use the same env defaults across different executions by ignoring your `.env.local` (which is intended to override the default set).



> 
> **Note**: similar to Default Environment Variables, `.env.test` file should be included in your repository, but `.env.test.local` shouldn't, as `.env*.local` are intended to be ignored through `.gitignore`.
> 
> 
> 


While running unit tests you can make sure to load your environment variables the same way Next.js does by leveraging the `loadEnvConfig` function from the `@next/env` package.



```javascript

import { loadEnvConfig } from '@next/env'

export default async () => {
  const projectDir = process.cwd()
  loadEnvConfig(projectDir)
}

```

Environment variables are looked up in the following places, in order, stopping once the variable is found.


1. `process.env`
2. `.env.$(NODE_ENV).local`
3. `.env.local` (Not checked when `NODE_ENV` is `test`.)
4. `.env.$(NODE_ENV)`
5. `.env`


For example, if `NODE_ENV` is `development` and you define a variable in both `.env.development.local` and `.env`, the value in `.env.development.local` will be used.



> 
> **Note:** The allowed values for `NODE_ENV` are `production`, `development` and `test`.
> 
> 
> 




