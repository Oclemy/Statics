# Layouts



The React model allows us to deconstruct a page into a series of components. Many of these components are often reused between pages. For example, you might have the same navigation bar and footer on every page.



```javascript


import Navbar from './navbar'
import Footer from './footer'

export default function Layout({ children }) {
  return (
    <>
 <Navbar />
 <main>{children}</main>
 <Footer />
 </>
  )
}

```

If you only have one layout for your entire application, you can create a [Custom App and wrap your application with the layout. Since the `<Layout />` component is re-used when changing pages, its component state will be preserved (e.g. input values).



```javascript


import Layout from '../components/layout'

export default function MyApp({ Component, pageProps }) {
  return (
    <Layout>
 <Component {...pageProps} />
 </Layout>
  )
}

```

If you need multiple layouts, you can add a property `getLayout` to your page, allowing you to return a React component for the layout. This allows you to define the layout on a *per-page basis*. Since we're returning a function, we can have complex nested layouts if desired.



```javascript


import Layout from '../components/layout'
import NestedLayout from '../components/nested-layout'

export default function Page() {
  return (
    
  )
}

Page.getLayout = function getLayout(page) {
  return (
    <Layout>
 <NestedLayout>{page}</NestedLayout>
 </Layout>
  )
}

```


```javascript


export default function MyApp({ Component, pageProps }) {
  
  const getLayout = Component.getLayout || ((page) => page)

  return getLayout(<Component {...pageProps} />)
}

```

When navigating between pages, we want to *persist* page state (input values, scroll position, etc.) for a Single-Page Application (SPA) experience.


This layout pattern enables state persistence because the React component tree is maintained between page transitions. With the component tree, React can understand which elements have changed to preserve state.



> 
> **Note**: This process is called [reconciliation](https://reactjs.org/docs/reconciliation.html), which is how React understands which elements have changed.
> 
> 
> 


When using TypeScript, you must first create a new type for your pages which includes a `getLayout` function. Then, you must create a new type for your `AppProps` which overrides the `Component` property to use the previously created type.



```javascript


import type { ReactElement } from 'react'
import Layout from '../components/layout'
import NestedLayout from '../components/nested-layout'
import type { NextPageWithLayout } from './_app'

const Page: NextPageWithLayout = () => {
  return <p>hello world</p>
}

Page.getLayout = function getLayout(page: ReactElement) {
  return (
    <Layout>
 <NestedLayout>{page}</NestedLayout>
 </Layout>
  )
}

export default Page

```


```javascript


import type { ReactElement, ReactNode } from 'react'
import type { NextPage } from 'next'
import type { AppProps } from 'next/app'

export type NextPageWithLayout<P = {}, IP = P> = NextPage<P, IP> & {
  getLayout?: (page: ReactElement) => ReactNode
}

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout
}

export default function MyApp({ Component, pageProps }: AppPropsWithLayout) {
  
  const getLayout = Component.getLayout ?? ((page) => page)

  return getLayout(<Component {...pageProps} />)
}

```

Inside your layout, you can fetch data on the client-side using `useEffect` or a library like [SWR](https://swr.vercel.app/). Because this file is not a Page you cannot use `getStaticProps` or `getServerSideProps` currently.



```javascript


import useSWR from 'swr'
import Navbar from './navbar'
import Footer from './footer'

export default function Layout({ children }) {
  const { data, error } = useSWR('/api/navigation', fetcher)

  if (error) return <div>Failed to load</div>
  if (!data) return <div>Loading...</div>

  return (
    <>
 <Navbar links={data.links} />
 <main>{children}</main>
 <Footer />
 </>
  )
}

```

For more information on what to do next, we recommend the following sections:





