# Dynamic Import



**Examples**

Next.js supports lazy loading external libraries with `import()` and React components with `next/dynamic`. Deferred loading helps improve the initial loading performance by decreasing the amount of JavaScript necessary to render the page. Components or libraries are only imported and included in the JavaScript bundle when they're used.


`next/dynamic` is a composite extension of `React.lazy` and [`Suspense`](https://reactjs.org/docs/react-api.html#reactsuspense), components can delay hydration until the Suspense boundary is resolved.


By using `next/dynamic`, the header component will not be included in the page's initial JavaScript bundle. The page will render the Suspense `fallback` first, followed by the `Header` component when the `Suspense` boundary is resolved.



```javascript
import dynamic from 'next/dynamic'

const DynamicHeader = dynamic(() => import('../components/header'), {
  loading: () => 'Loading...',
})

export default function Home() {
  return <DynamicHeader />
}

```


> 
> **Note**: In `import('path/to/component')`, the path must be explicitly written. It can't be a template string nor a variable. Furthermore the `import()` has to be inside the `dynamic()` call for Next.js to be able to match webpack bundles / module ids to the specific `dynamic()` call and preload them before rendering. `dynamic()` can't be used inside of React rendering as it needs to be marked in the top level of the module for preloading to work, similar to `React.lazy`.
> 
> 
> 


To dynamically import a named export, you can return it from the Promise returned by [`import()`](https://github.com/tc39/proposal-dynamic-import#example):



```javascript

export function Hello() {
  return <p>Hello!</p>
}


import dynamic from 'next/dynamic'

const DynamicComponent = dynamic(() =>
  import('../components/hello').then((mod) => mod.Hello)
)

```

To dynamically load a component on the client side, you can use the `ssr` option to disable server-rendering. This is useful if an external dependency or component relies on browser APIs like `window`.



```javascript
import dynamic from 'next/dynamic'

const DynamicHeader = dynamic(() => import('../components/header'), {
  ssr: false,
})

```

This example uses the external library `fuse.js` for fuzzy search. The module is only loaded in the browser after the user types in the search input.



```javascript
import { useState } from 'react'

const names = ['Tim', 'Joe', 'Bel', 'Lee']

export default function Page() {
  const [results, setResults] = useState()

  return (
    <div>
 <input
 type="text"
 placeholder="Search"
 onChange={async (e) => {
 const { value } = e.currentTarget
 
 const Fuse = (await import('fuse.js')).default
 const fuse = new Fuse(names)

 setResults(fuse.search(value))
 }}
 />
 <pre>Results: {JSON.stringify(results, null, 2)}</pre>
 </div>
  )
}

```



