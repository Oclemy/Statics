# Authentication


Authentication verifies who a user is, while authorization controls what a user can access. Next.js supports multiple authentication patterns, each designed for different use cases. This page will go through each case so that you can choose based on your constraints.


The first step to identifying which authentication pattern you need is understanding the [data-fetching strategy you want. We can then determine which authentication providers support this strategy. There are two main patterns:


* Use [static generation to server-render a loading state, followed by fetching user data client-side.
* Fetch user data server-side to eliminate a flash of unauthenticated content.


Next.js automatically determines that a page is static if there are no blocking data requirements. This means the absence of `getServerSideProps` and `getInitialProps` in the page. Instead, your page can render a loading state from the server, followed by fetching the user client-side.


One advantage of this pattern is it allows pages to be served from a global CDN and preloaded using `next/link` In practice, this results in a faster TTI ([Time to Interactive](https://web.dev/interactive/)).


Let's look at an example for a profile page. This will initially render a loading skeleton. Once the request for a user has finished, it will show the user's name:



```javascript


import useUser from '../lib/useUser'
import Layout from '../components/Layout'

const Profile = () => {
  
  const { user } = useUser({ redirectTo: '/login' })

  
  if (!user || user.isLoggedIn === false) {
    return <Layout>Loading...</Layout>
  }

  
  return (
    <Layout>
 <h1>Your Profile</h1>
 <pre>{JSON.stringify(user, null, 2)}</pre>
 </Layout>
  )
}

export default Profile

```

You can view this [example in action](https://iron-session-example.vercel.app/). Check out the `with-iron-session` example to see how it works.


If you export an `async` function called `getServerSideProps` from a page, Next.js will pre-render this page on each request using the data returned by `getServerSideProps`.



```javascript
export async function getServerSideProps(context) {
  return {
    props: {}, 
  }
}

```

Let's transform the profile example to use [server-side rendering If there's a session, return `user` as a prop to the `Profile` component in the page. Notice there is not a loading skeleton in [this example](https://iron-session-example.vercel.app/).



```javascript


import withSession from '../lib/session'
import Layout from '../components/Layout'

export const getServerSideProps = withSession(async function ({ req, res }) {
  const { user } = req.session

  if (!user) {
    return {
      redirect: {
        destination: '/login',
        permanent: false,
      },
    }
  }

  return {
    props: { user },
  }
})

const Profile = ({ user }) => {
  
  return (
    <Layout>
 <h1>Your Profile</h1>
 <pre>{JSON.stringify(user, null, 2)}</pre>
 </Layout>
  )
}

export default Profile

```

An advantage of this pattern is preventing a flash of unauthenticated content before redirecting. It's important to note fetching user data in `getServerSideProps` will block rendering until the request to your authentication provider resolves. To prevent creating a bottleneck and increasing your TTFB ([Time to First Byte](https://web.dev/time-to-first-byte/)), you should ensure your authentication lookup is fast. Otherwise, consider [static generation that we've discussed authentication patterns, let's look at specific providers and explore how they're used with Next.js.



**Examples**

If you have an existing database with user data, you'll likely want to utilize an open-source solution that's provider agnostic.


* If you want a low-level, encrypted, and stateless session utility use [`iron-session`](https://github.com/vercel/next.js/tree/canary/examples/with-iron-session).
* If you want a full-featured authentication system with built-in providers (Google, Facebook, GitHub…), JWT, JWE, email/password, magic links and more… use [`next-auth`](https://github.com/nextauthjs/next-auth-example).


Both of these libraries support either authentication pattern. If you're interested in [Passport](http://www.passportjs.org/), we also have examples for it using secure and encrypted cookies:


To see examples with other authentication providers, check out the [examples folder](https://github.com/vercel/next.js/tree/canary/examples).



**Examples**

For more information on what to do next, we recommend the following sections:





