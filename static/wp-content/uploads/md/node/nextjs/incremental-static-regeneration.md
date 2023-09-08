# Incremental Static Regeneration



**Examples**


**Version History**


| Version | Changes |
| --- | --- |
| `v12.2.0` | On-Demand ISR is stable |
| `v12.1.0` | On-Demand ISR added (beta). |
| `v12.0.0` | [Bot-aware ISR fallback added. |
| `v9.5.0` | Base Path added. |



Next.js allows you to create or update static pages *after* you’ve built your site. Incremental Static Regeneration (ISR) enables you to use static-generation on a per-page basis, **without needing to rebuild the entire site**. With ISR, you can retain the benefits of static while scaling to millions of pages.



> 
> Note: The [`experimental-edge` runtime is currently not compatible with ISR, although can leverage `stale-while-revalidate` by setting the `cache-control` header manually.
> 
> 
> 


To use ISR, add the `revalidate` prop to `getStaticProps`:



```javascript
function Blog({ posts }) {
  return (
    <ul>
 {posts.map((post) => (
        <li key={post.id}>{post.title}</li>
      ))}
 </ul>
  )
}




export async function getStaticProps() {
  const res = await fetch('https://.../posts')
  const posts = await res.json()

  return {
    props: {
      posts,
    },
    
    
    
    revalidate: 10, 
  }
}




export async function getStaticPaths() {
  const res = await fetch('https://.../posts')
  const posts = await res.json()

  
  const paths = posts.map((post) => ({
    params: { id: post.id },
  }))

  
  
  
  return { paths, fallback: 'blocking' }
}

export default Blog

```

When a request is made to a page that was pre-rendered at build time, it will initially show the cached page.


* Any requests to the page after the initial request and before 10 seconds are also cached and instantaneous.
* After the 10-second window, the next request will still show the cached (stale) page
* Next.js triggers a regeneration of the page in the background.
* Once the page generates successfully, Next.js will invalidate the cache and show the updated page. If the background regeneration fails, the old page would still be unaltered.


When a request is made to a path that hasn’t been generated, Next.js will server-render the page on the first request. Future requests will serve the static file from the cache. ISR on Vercel [persists the cache globally and handles rollbacks](https://vercel.com/docs/concepts/next.js/incremental-static-regeneration?utm_source=next-site&utm_medium=docs&utm_campaign=next-website).



> 
> Note: Check if your upstream data provider has caching enabled by default. You might need to disable (e.g. `useCdn: false`), otherwise a revalidation won't be able to pull fresh data to update the ISR cache. Caching can occur at a CDN (for an endpoint being requested) when it returns the `Cache-Control` header.
> 
> 
> 


If you set a `revalidate` time of `60`, all visitors will see the same generated version of your site for one minute. The only way to invalidate the cache is from someone visiting that page after the minute has passed.


Starting with `v12.2.0`, Next.js supports On-Demand Incremental Static Regeneration to manually purge the Next.js cache for a specific page. This makes it easier to update your site when:


* Content from your headless CMS is created or updated
* Ecommerce metadata changes (price, description, category, reviews, etc.)


Inside `getStaticProps`, you do not need to specify `revalidate` to use on-demand revalidation. If `revalidate` is omitted, Next.js will use the default value of `false` (no revalidation) and only revalidate the page on-demand when `revalidate()` is called.



> 
> **Note:** Middleware won't be executed for On-Demand ISR requests. Instead, call `revalidate()` on the *exact* path that you want revalidated. For example, if you have `pages/blog/[slug].js` and a rewrite from `/post-1` -> `/blog/post-1`, you would need to call `res.revalidate('/blog/post-1')`.
> 
> 
> 


First, create a secret token only known by your Next.js app. This secret will be used to prevent unauthorized access to the revalidation API Route. You can access the route (either manually or with a webhook) with the following URL structure:



```javascript
https://<your-site.com>/api/revalidate?secret=<token>

```

Next, add the secret as an [Environment Variable to your application. Finally, create the revalidation API Route:



```javascript


export default async function handler(req, res) {
  
  if (req.query.secret !== process.env.MY_SECRET_TOKEN) {
    return res.status(401).json({ message: 'Invalid token' })
  }

  try {
    
    
    await res.revalidate('/path-to-revalidate')
    return res.json({ revalidated: true })
  } catch (err) {
    
    
    return res.status(500).send('Error revalidating')
  }
}

```

[View our demo](https://on-demand-isr.vercel.app) to see on-demand revalidation in action and provide feedback.


When running locally with `next dev`, `getStaticProps` is invoked on every request. To verify your on-demand ISR configuration is correct, you will need to create a [production build and start the [production server next build
$ next start

```

Then, you can confirm that static pages have successfully revalidated.


If there is an error inside `getStaticProps` when handling background regeneration, or you manually throw an error, the last successfully generated page will continue to show. On the next subsequent request, Next.js will retry calling `getStaticProps`.



```javascript
export async function getStaticProps() {
  
  
  
  const res = await fetch('https://.../posts')
  const posts = await res.json()

  if (!res.ok) {
    
    
    
    throw new Error(`Failed to fetch posts, received status ${res.status}`)
  }

  
  
  return {
    props: {
      posts,
    },
    revalidate: 10,
  }
}

```

Incremental Static Regeneration (ISR) works on [self-hosted Next.js sites out of the box when you use `next start`.


You can use this approach when deploying to container orchestrators such as Kubernetes or [HashiCorp Nomad](https://www.nomadproject.io/). By default, generated assets will be stored in-memory on each pod. This means that each pod will have its own copy of the static files. Stale data may be shown until that specific pod is hit by a request.


To ensure consistency across all pods, you can disable in-memory caching. This will inform the Next.js server to only leverage assets generated by ISR in the file system.


You can use a shared network mount in your Kubernetes pods (or similar setup) to reuse the same file-system cache between different containers. By sharing the same mount, the `.next` folder which contains the `next/image` cache will also be shared and re-used.


To disable in-memory caching, set `isrMemoryCacheSize` to `0` in your `next.config.js` file:



```javascript
module.exports = {
  experimental: {
    
    isrMemoryCacheSize: 0,
  },
}

```


> 
> **Note:** You might need to consider a race condition between multiple pods trying to update the cache at the same time, depending on how your shared mount is configured.
> 
> 
> 


For more information on what to do next, we recommend the following sections:





