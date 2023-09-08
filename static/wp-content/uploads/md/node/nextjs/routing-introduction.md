# Routing


Next.js has a file-system based router built on the [concept of pages a file is added to the `pages` directory, it's automatically available as a route.


The files inside the `pages` directory can be used to define most common patterns.


The router will automatically route files named `index` to the root of the directory.


* `pages/index.js` → `/`
* `pages/blog/index.js` → `/blog`


The router supports nested files. If you create a nested folder structure, files will automatically be routed in the same way still.


* `pages/blog/first-post.js` → `/blog/first-post`
* `pages/dashboard/settings/username.js` → `/dashboard/settings/username`


To match a dynamic segment, you can use the bracket syntax. This allows you to match named parameters.


* `pages/blog/[slug].js` → `/blog/:slug` (`/blog/hello-world`)
* `pages/[username]/settings.js` → `/:username/settings` (`/foo/settings`)
* `pages/post/[...all].js` → `/post/*` (`/post/2020/id/title`)



> 
> Check out the [Dynamic Routes documentation to learn more about how they work.
> 
> 
> 


The Next.js router allows you to do client-side route transitions between pages, similar to a single-page application.


A React component called `Link` is provided to do this client-side route transition.



```javascript
import Link from 'next/link'

function Home() {
  return (
    <ul>
 <li>
 <Link href="/">Home</Link>
 </li>
 <li>
 <Link href="/about">About Us</Link>
 </li>
 <li>
 <Link href="/blog/hello-world">Blog Post</Link>
 </li>
 </ul>
  )
}

export default Home

```

The example above uses multiple links. Each one maps a path (`href`) to a known page:


* `/` → `pages/index.js`
* `/about` → `pages/about.js`
* `/blog/hello-world` → `pages/blog/[slug].js`


Any `<Link />` in the viewport (initially or through scroll) will be prefetched by default (including the corresponding data) for pages using [Static Generation The corresponding data for server-rendered routes is fetched *only when* the `<Link />` is clicked.


You can also use interpolation to create the path, which comes in handy for [dynamic route segments For example, to show a list of posts which have been passed to the component as a prop:



```javascript
import Link from 'next/link'

function Posts({ posts }) {
  return (
    <ul>
 {posts.map((post) => (
        <li key={post.id}>
 <Link href={`/blog/${encodeURIComponent(post.slug)}`}>
 {post.title}
 </Link>
 </li>
      ))}
 </ul>
  )
}

export default Posts

```


> 
> `encodeURIComponent` is used in the example to keep the path utf-8 compatible.
> 
> 
> 


Alternatively, using a URL Object:



```javascript
import Link from 'next/link'

function Posts({ posts }) {
  return (
    <ul>
 {posts.map((post) => (
        <li key={post.id}>
 <Link
 href={{
 pathname: '/blog/[slug]',
 query: { slug: post.slug },
 }}
 >
 {post.title}
 </Link>
 </li>
      ))}
 </ul>
  )
}

export default Posts

```

Now, instead of using interpolation to create the path, we use a URL object in `href` where:


* `pathname` is the name of the page in the `pages` directory. `/blog/[slug]` in this case.
* `query` is an object with the dynamic segment. `slug` in this case.



**Examples**

To access the [`router` object in a React component you can use `useRouter` or `withRouter` general we recommend using `useRouter` router is divided in multiple parts:





