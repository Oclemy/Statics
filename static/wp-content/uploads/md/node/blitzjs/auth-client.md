# Auth Client-Side APIs



## `useSession()`

`useSession(options?) => Partial<PublicData> & {isLoading: boolean}`

##### Note

 Note: `useSession()` uses suspense by default, so you need a `<Suspense>`
component above it in the tree. Or you can set
`useSession({suspense: false})` to disable suspense.

### Example


```typescript
import { useSession } from "@blitzjs/auth"

function SomeComponent() {
  const session = useSession()

  session.userId
  session.role

  return /\*... \*/
}
```
### Arguments

* `options:`
	+ Optional
	+ `initialPublicData: PublicData` - Use this with SSR to set public data
	from the server session
	+ `suspense: boolean` - Defaults to `true`

### Returns

* `session: Partial<PublicData> & {isLoading: boolean}`

## `useAuthenticatedSession()`

`useAuthenticatedSession(options?) => PublicData & {isLoading: boolean}`

This will throw `AuthenticationError` if the user is not logged in

### Example


```typescript
import { useAuthenticatedSession } from "@blitzjs/auth"

const session = useAuthenticatedSession()
```
### Arguments

* `options:`
	+ Optional
	+ `initialPublicData: PublicData` - Use this with SSR to set public data
	from the server session
	+ `suspense: boolean` - Defaults to `true`

### Returns

* `session: PublicData & {isLoading: boolean}`

## `useAuthorize()`

`useAuthorize() => void`

This will throw `AuthenticationError` if the user is not logged in

### Example


```typescript
import { useAuthorize } from "@blitzjs/auth"

useAuthorize()
```
### Arguments

* None

### Returns

* Nothing

## `useRedirectAuthenticated()`

`useRedirectAuthenticated(to: string) => void`

This will redirect a logged in user to the given url path. It does nothing
for logged out users.

### Example


```typescript
import { useRedirectAuthenticated } from "@blitzjs/auth"

useRedirectAuthenticated("/dashboard")
```
### Arguments

* `to: string`
	+ **Required**
	+ The url path to redirect logged in users to

### Returns

* Nothing


