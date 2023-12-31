# Client Utilities



## `invoke`

This is for imperatively invoking queries or mutations from your
components.

### Example


```typescript
import { invoke } from "@blitzjs/rpc"
import getProducts from "src/products/queries/getProducts"

const Page = function ({ products }) {
  return (
    <div>
 <button
 onClick={async () => {
          const products = await invoke(getProducts, {
            where: { orgId: 1 },
          })
        }}
 >
 Get Products
 </button>
 </div>
  )
}
export default Page
```
## API


```typescript
const results = await invoke(resolver, resolverInputArguments)
```
### Arguments

* `resolver:` A Blitz [query resolver](./query-resolvers) or
[mutation resolver](./mutation-resolvers)
	+ **Required**
* `resolverInputArguments`
	+ **Required**
	+ The arguments that will be passed to `resolver`

### Returns

* `results`
	+ The exact results returned from the resolver

## `invalidateQuery`

This allows you to invalidate a specific query. Use `invalidateQuery` if
you know for sure that a query's data is stale and you don't want to wait
for the automatic refetch.

### Example


```typescript
import { invalidateQuery } from "@blitzjs/rpc" 
import getProducts from "src/products/queries/getProducts"

const Page = function ({ products }) {
  return (
    <div>
 <button
 onClick={() => {
 invalidateQuery(getProducts) 
 }}
 >
 Invalidate
 </button>
 </div>
  )
}
export default Page
```
## API


```typescript
const refetchedQueries = await invalidateQuery(resolver, inputArgs?)
```
### Arguments

* `resolver:` A Blitz [query resolver](./query-resolvers) or
[mutation resolver](./mutation-resolvers)
	+ **Required**
* `inputArgs`
	+ Optional
	+ The arguments that will be passed to `resolver`
	+ If you don't provide this, it will invalidate all `resolver` queries
	+ If you do provide this, it will only invalidate queries for `resolver`
	with matching `inputArgs`

### Returns

This function returns a promise that will resolve when all of the queries
are done being refetched.

## `getQueryKey`

This allows you to get the query key for a query. The `queryClient`
manages query based on query keys. For a more detailed explanation, see
the [`React Query`](https://react-query.tanstack.com/guides/query-keys)
documentation.

### Example


```typescript
import { getQueryKey, getQueryClient } from "@blitzjs/rpc"
import getProducts from "src/products/queries/getProducts"

const Page = function ({ products }) {
  return (
    <div>
 <button
 onClick={async () => {
          const queryKey = getQueryKey(getProducts)
          getQueryClient().invalidateQueries(queryKey)

          const queryKey = getQueryKey(getProducts, {
            where: { ordId: 1 },
          })
          getQueryClient().invalidateQueries(queryKey)
        }}
 >
 Invalidate
 </button>
 </div>
  )
}
export default Page
```
## `getInfiniteQueryKey`

This allows you to get the query key for an **infinite** query. The
`queryClient` manages query based on query keys. For a more detailed
explanation, see the
[`React Query`](https://react-query.tanstack.com/guides/query-keys)
documentation.

### Example


```typescript
import { getQueryKey, getQueryClient } from "@blitzjs/rpc"
import getInfiniteProducts from "src/products/queries/getInfiniteProducts"

const Page = function ({ products }) {
  return (
    <div>
 <button
 onClick={async () => {
 const queryKey = getInfiniteQueryKey(getInfiniteProducts)
 getQueryClient().invalidateQueries(queryKey)
 }}
 >
 Invalidate
 </button>
 </div>
  )
}
export default Page
```
## API


```typescript
const queryKey = getQueryKey(resolver, inputArgs?)
```
### Arguments

* `resolver:` A Blitz [query resolver](./query-resolvers) or
[mutation resolver](./mutation-resolvers)
	+ **Required**
* `inputArgs`
	+ Optional
	+ The arguments that will be passed to `resolver`
	+ If you don't provide this, it will return the base query key for all
	`resolver` queries
	+ If you do provide this, it will return the specific query key for the
	`resolver` and `inputArgs` combination

### Returns

* `results`
	+ The exact results returned from the resolver

## `setQueryData`

Works the same as the
[setQueryData returned by useQuery](./use-query#setQueryData). The
difference is that it's not bound to the useQuery and expects the
`resolver` and the `inputArgs` instead. It will also invalidate the query
causing a refetch. Disable refetch by passing an options object
`{refetch: false}` as the `opts` argument.

### Example


```typescript
import { setQueryData } from "@blitzjs/rpc"

export default function (props: { query: { id: number } }) {
  const [product] = useQuery(getProduct, {
    where: { id: props.query.id },
  })
  const [updateProjectMutation] = useMutation(updateProject)

  return (
    <Formik
      initialValues={product}
      onSubmit={async (values) => {
        try {
          const product = await updateProjectMutation(values)
          setQueryData(
            getProduct,
            { where: { id: props.query.id } },
            product
          )
        } catch (error) {
          alert("Error saving product")
        }
      }}
    >
      {/\* ... \*/}
    </Formik>
  )
}
```
## API


```typescript
const promise = setQueryData(resolver, inputArgs, newData, opts?)
```
### Arguments

* `resolver:` A Blitz [query resolver](./query-resolvers).
	+ **Required**
* `inputArgs`
	+ **Required**
	+ The arguments that will be passed to `resolver`
	+ It will set the data for the specified `resolver` and `inputArgs`
	combination
* `newData`
	+ **Required**
	+ If non-function is passed, the data will be updated to this value
	+ If a function is passed, it will receive the old data value and be
	expected to return a new one.
* `opts`
	+ Optional
	+ An object with additional options.
	+ Disable refetch by passing an options object `{refetch: false}`.

### Returns

* `results`
	+ Returns a promise that will be resolved when the new data is
	refetched.


---

