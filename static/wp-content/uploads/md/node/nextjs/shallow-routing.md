# Shallow Routing



**Examples**

Shallow routing allows you to change the URL without running data fetching methods again, that includes `getServerSideProps` `getStaticProps` and `getInitialProps` receive the updated `pathname` and the `query` via the [`router` object (added by `useRouter` or `withRouter` without losing state.


To enable shallow routing, set the `shallow` option to `true`. Consider the following example:



```javascript
import { useEffect } from 'react'
import { useRouter } from 'next/router'


function Page() {
  const router = useRouter()

  useEffect(() => {
    
    router.push('/?counter=10', undefined, { shallow: true })
  }, [])

  useEffect(() => {
    
  }, [router.query.counter])
}

export default Page

```

The URL will get updated to `/?counter=10`. and the page won't get replaced, only the state of the route is changed.


You can also watch for URL changes via `componentDidUpdate` as shown below:



```javascript
componentDidUpdate(prevProps) {
  const { pathname, query } = this.props.router
  
  if (query.counter !== prevProps.router.query.counter) {
    
  }
}

```

Shallow routing **only** works for URL changes in the current page. For example, let's assume we have another page called `pages/about.js`, and you run this:



```javascript
router.push('/?counter=10', '/about?counter=10', { shallow: true })

```

Since that's a new page, it'll unload the current page, load the new one and wait for data fetching even though we asked to do shallow routing.


When shallow routing is used with middleware it will not ensure the new page matches the current page like previously done without middleware. This is due to middleware being able to rewrite dynamically and can't be verified client-side without a data fetch which is skipped with shallow, so a shallow route change must always be treated as shallow.




