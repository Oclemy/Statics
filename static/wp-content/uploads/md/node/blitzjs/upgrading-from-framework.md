# Upgrading Your Blitz App to Blitz 2.0



If you have an existing Blitz.js app, and would like to upgrade it to the
Blitz 2.0, you can use our `@blitzjs/codemod` package:


```typescript
npx @blitzjs/codemod upgrade-legacy
```
After running the above command, your Blitz app will be upgraded to the
Blitz 2.0. If you face any issues with the codemod — let us know! You can
also check out the manual upgrade guide below.

## Manual Upgrade Steps

Below, we're going to list down the steps performed by the codemod in case
you want to do some of them or all of them manually. Also, in case
something goes wrong with the codemod tool, you can follow these steps to
upgrade your app:

### Rename the `blitz.config.ts` file to `next.config.js`

Inside of the config file, you'll also need to wrap the config with
`withBlitz` function imported from `@blitzjs/next`:


```typescript
// @ts-check
const { withBlitz } = require("@blitzjs/next")

/\*\*
 \* @type {import('@blitzjs/next').BlitzConfig}
 \*\*/
const config = {}

module.exports = withBlitz(config)
```
### Update dependencies in `package.json`

1. Update `react`, `react-dom` to the latest versions.
2. Install `@blitzjs/next`, `@blitzjs/rpc`, `@blitzjs/auth`.
3. Set `blitz` version to `latest`.
4. Upgrade `next` to the latest version.

### Update project's named imports

Now, for most of the things previously imported from `blitz` package,
you'd need to update the import to the new packages. Use the following
list as a reference:



| Import | Source Package |
| --- | --- |
| `NextApiHandler` | `next` |
| `NextApiRequest` | `next` |
| `NextApiResponse` | `next` |
| `GetServerSideProps` | `next` |
| `InferGetServerSidePropsType` | `next` |
| `GetServerSidePropsContext` | `next` |
| `useRouterQuery`: | `next/router` |
| `useRouter` | `next/router` |
| `Router` | `next/router` |
| `Link` | `next/link` |
| `Image` | `next/image` |
| `Script` | `next/script` |
| `Document` | `next/document` |
| `DocumentHead` | `next/document` |
| `Html` | `next/document` |
| `Main` | `next/document` |
| `Head` | `next/head` |
| `App` | `next/app` |
| `dynamic` | `next/dynamic` |
| `noSSR` | `next/dynamic` |
| `getConfig` | `next/config` |
| `setConfig` | `next/config` |
| `ErrorBoundary` | `@blitzjs/next` |
| `ErrorFallbackProps` | `@blitzjs/next` |
| `useParam` | `@blitzjs/next` |
| `Routes` | `@blitzjs/next` |
| `ErrorComponent` | `@blitzjs/next` |
| `AppProps` | `@blitzjs/next` |
| `BlitzPage` | `@blitzjs/next` |
| `BlitzLayout` | `@blitzjs/next` |
| `invokeWithMiddleware` | `@blitzjs/rpc` |
| `resolver` | `@blitzjs/rpc` |
| `useQuery` | `@blitzjs/rpc` |
| `usePaginatedQuery` | `@blitzjs/rpc` |
| `useInfiniteQuery` | `@blitzjs/rpc` |
| `useMutation` | `@blitzjs/rpc` |
| `queryClient` | `@blitzjs/rpc` |
| `getQueryKey` | `@blitzjs/rpc` |
| `getInfiniteQueryKey` | `@blitzjs/rpc` |
| `invalidateQuery` | `@blitzjs/rpc` |
| `setQueryData` | `@blitzjs/rpc` |
| `useQueryErrorResetBoundary` | `@blitzjs/rpc` |
| `QueryClient` | `@blitzjs/rpc` |
| `dehydrate` | `@blitzjs/rpc` |
| `invoke` | `@blitzjs/rpc` |
| `getAntiCSRFToken` | `@blitzjs/auth` |
| `passportAuth` | `@blitzjs/auth` |
| `sessionMiddleware` | `@blitzjs/auth` |
| `simpleRolesIsAuthorized` | `@blitzjs/auth` |
| `getSession` | `@blitzjs/auth` |
| `setPublicDataForUser` | `@blitzjs/auth` |
| `SecurePassword` | `@blitzjs/auth` |
| `hash256` | `@blitzjs/auth` |
| `generateToken` | `@blitzjs/auth` |
| `useAuthenticatedSession` | `@blitzjs/auth` |
| `useRedirectAuthenticated` | `@blitzjs/auth` |
| `useSession` | `@blitzjs/auth` |
| `useAuthorize` | `@blitzjs/auth` |
| `AuthenticatedSessionContext` | `@blitzjs/auth` |

### Update project's default imports

There are also some default imports that you'll need to update. Use the
following list as a reference:



| Default Import | Source Package |
| --- | --- |
| `Link` | `next/link` |
| `Image` | `next/image` |
| `Head` | `next/head` |
| `dynamic` | `next/dynamic` |

### Change `queryClient` import to `getQueryClient`

If you imported `queryClient` from `blitz`, you'd need to change it to the
following code:


```typescript
- import { queryClient } from 'blitz'

+ import { getQueryClient } from '@blitzjs/rpc'
+ const queryClient = getQueryClient()
```
### Update `BlitzApiRequest`, `BlitzApiResponse`, `BlitzApiHandler`

`blitz` no longer exports `BlitzApiRequest`, `BlitzApiResponse`,
`BlitzApiHandler`. You'll need to update your imports to the following:


```typescript
- import { BlitzApiRequest } from 'blitz'
+ import { NextApiRequest } from 'next'

- import { BlitzApiResponse } from 'blitz'
+ import { NextApiResponse } from 'next'

- import { BlitzApiHandler } from 'blitz'
+ import { NextApiHandler } from 'next'
```
### Create `blitz-server.ts` and `blitz-client.ts`

To configure the plugins, you'd need to add the following files to your
project:

1. `blitz-server.ts`:


```typescript
import { setupBlitzServer } from "@blitzjs/next"
import {
  AuthServerPlugin,
  PrismaStorage,
  simpleRolesIsAuthorized,
} from "@blitzjs/auth"
import { db } from "db"

const { gSSP, gSP, api } = setupBlitzServer({
  plugins: [
    AuthServerPlugin({
      cookiePrefix: "blitz-app",
      storage: PrismaStorage(db),
      isAuthorized: simpleRolesIsAuthorized,
    }),
  ],
})

export { gSSP, gSP, api }
```
2. `blitz-client.ts`:


```typescript
import { AuthClientPlugin } from "@blitzjs/auth"
import { setupBlitzClient } from "@blitzjs/next"
import { BlitzRpcPlugin } from "@blitzjs/rpc"

export const { withBlitz } = setupBlitzClient({
  plugins: [
    AuthClientPlugin({
      cookiePrefix: "blitz-app",
    }),
    BlitzRpcPlugin(),
  ],
})
```
### Create API Route for the Zero-API Layer

To setup the Zero-API layer, you'd need to create a
`src/pages/api/rpc/[[...blitz]].ts` file with the following content:


```typescript
import { rpcHandler } from "@blitzjs/rpc"
import { api } from "src/blitz-server"

export default api(rpcHandler())
```
### Remove `babel.config.js`

It's not needed anymore.

### Move all pages to `src/pages` directory

Having pages in separate directories in not supported with Next.js. They
now have to be consolidated in the top level `pages` directory, or we
recommend placing it in the `src` directory.

### Move API Routes to `src/pages/api` directory

All your API Routes have to be inside of the `src/pages/api` directory.

### Wrap your App component with `withBlitz`

To use Blitz on the client, you also have to use the `withBlitz` function
in your App component.


```typescript
import { withBlitz } from "src/blitz-client"

function App({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />
}

export default withBlitz(App)
```
### Convert `useRouterQuery` to `useRouter`

Blitz no longer exports `useRouterQuery`. You'll need to use the
`useRouter` function instead.


```typescript
import { useRouter } from "next/router"
```
### Wrapping `getServerSideProps`, `getStaticProps`, and API Routes

If you want to access the Blitz context inside of the
`getServerSideProps`, `getStaticProps`, and API Routes, you'll need to
wrap them with corresponding functions: `gSSP`, `gSP`, and `api` imported
from `@blitzjs/next`.

To learn more about it, follow the [`@blitzjs/next` docs](./blitzjs-next).

### Replacing `queryClient` with `getQueryClient` function

If you're using `queryClient` in your code, you can replace it with the
following code:


```typescript
import { getQueryClient } from "@blitzjs/rpc"

const queryClient = getQueryClient()
```
### `types.ts` changes

In your `types.ts` file, you'll need to change the module that is being
augmented:


```typescript
- declare module "@blitzjs/auth" {
+ declare module "@blitzjs/auth" {
  export interface Session {
  // ...
  }
  }
```


---

