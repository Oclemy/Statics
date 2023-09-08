# getStaticPaths


If a page has [Dynamic Routes and uses `getStaticProps`, it needs to define a list of paths to be statically generated.


When you export a function called `getStaticPaths` (Static Site Generation) from a page that uses dynamic routes, Next.js will statically pre-render all the paths specified by `getStaticPaths`.



```javascript



export async function getStaticPaths() {
  return {
    paths: [{ params: { id: '1' } }, { params: { id: '2' } }],
    fallback: false, 
  }
}


export async function getStaticProps(context) {
  return {
    
    props: { post: {} },
  }
}

export default function Post({ post }) {
  
}

```

The [`getStaticPaths` API reference covers all parameters and props that can be used with `getStaticPaths`.


You should use `getStaticPaths` if you’re statically pre-rendering pages that use dynamic routes and:


* The data comes from a headless CMS
* The data comes from a database
* The data comes from the filesystem
* The data can be publicly cached (not user-specific)
* The page must be pre-rendered (for SEO) and be very fast — `getStaticProps` generates `HTML` and `JSON` files, both of which can be cached by a CDN for performance


`getStaticPaths` will only run during build in production, it will not be called during runtime. You can validate code written inside `getStaticPaths` is removed from the client-side bundle [with this tool](https://next-code-elimination.vercel.app/).


* `getStaticProps` runs during `next build` for any `paths` returned during build
* `getStaticProps` runs in the background when using `fallback: true`
* `getStaticProps` is called before initial render when using `fallback: blocking`


* `getStaticPaths` **must** be used with `getStaticProps`
* You **cannot** use `getStaticPaths` with `getServerSideProps` You can export `getStaticPaths` from a [Dynamic Route that also uses `getStaticProps`
* You **cannot** export `getStaticPaths` from non-page file (e.g. your `components` folder)
* You must export `getStaticPaths` as a standalone function, and not a property of the page component


In development (`next dev`), `getStaticPaths` will be called on every request.


`getStaticPaths` allows you to control which pages are generated during the build instead of on-demand with `fallback` Generating more pages during a build will cause slower builds.


You can defer generating all pages on-demand by returning an empty array for `paths`. This can be especially helpful when deploying your Next.js application to multiple environments. For example, you can have faster builds by generating all pages on-demand for previews (but not production builds). This is helpful for sites with hundreds/thousands of static pages.



```javascript


export async function getStaticPaths() {
  
  
  
  if (process.env.SKIP_BUILD_STATIC_GENERATION) {
    return {
      paths: [],
      fallback: 'blocking',
    }
  }

  
  const res = await fetch('https://.../posts')
  const posts = await res.json()

  
  
  
  const paths = posts.map((post) => ({
    params: { id: post.id },
  }))

  
  return { paths, fallback: false }
}

```

For more information on what to do next, we recommend the following sections:





