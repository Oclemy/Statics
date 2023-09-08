# Edge API Routes


Edge API Routes enable you to build high performance APIs with Next.js. Using the [Edge Runtime they are often faster than Node.js-based API Routes. This performance improvement does come with constraints like not having access to native Node.js APIs. Instead, Edge API Routes are built on standard Web APIs.


Any file inside the folder `pages/api` is mapped to `/api/*` and will be treated as an API endpoint instead of a page. They are server-side only bundles and won't increase your client-side bundle size.



```javascript
export const config = {
  runtime: 'edge',
}

export default (req) => new Response('Hello world!')

```


```javascript
import type { NextRequest } from 'next/server'

export const config = {
  runtime: 'edge',
}

export default async function handler(req: NextRequest) {
  return new Response(
    JSON.stringify({
      name: 'Jim Halpert',
    }),
    {
      status: 200,
      headers: {
        'content-type': 'application/json',
      },
    }
  )
}

```


```javascript
import type { NextRequest } from 'next/server'

export const config = {
  runtime: 'edge',
}

export default async function handler(req: NextRequest) {
  return new Response(
    JSON.stringify({
      name: 'Jim Halpert',
    }),
    {
      status: 200,
      headers: {
        'content-type': 'application/json',
        'cache-control': 'public, s-maxage=1200, stale-while-revalidate=600',
      },
    }
  )
}

```


```javascript
import type { NextRequest } from 'next/server'

export const config = {
  runtime: 'edge',
}

export default async function handler(req: NextRequest) {
  const { searchParams } = new URL(req.url)
  const email = searchParams.get('email')
  return new Response(email)
}

```


```javascript
import { type NextRequest } from 'next/server'

export const config = {
  runtime: 'edge',
}

export default async function handler(req: NextRequest) {
  const authorization = req.cookies.get('authorization')?.value
  return fetch('https://backend-api.com/api/protected', {
    method: req.method,
    headers: {
      authorization,
    },
    redirect: 'manual',
  })
}

```

You may want to restrict your edge function to specific regions when deploying so that you can colocate near your data sources ensuring lower response times which can be achieved as shown.


Note: this config is available in `v12.3.2` of Next.js and up.



```javascript
import { NextResponse } from 'next/server'

export const config = {
  regions: ['sfo1', 'iad1'], 
}

export default async function handler(req: NextRequest) {
  const myData = await getNearbyData()
  return NextResponse.json(myData)
}

```

Edge API Routes use the [Edge Runtime whereas API Routes use the [Node.js runtime API Routes can [stream responses from the server and run *after* cached files (e.g. HTML, CSS, JavaScript) have been accessed. Server-side streaming can help improve performance with faster [Time To First Byte (TTFB)](https://web.dev/ttfb/).



> 
> Note: Using [Edge Runtime with `getServerSideProps` does not give you access to the response object. If you need access to `res`, you should use the [Node.js runtime by setting `runtime: 'nodejs'`.
> 
> 
> 


View the [supported APIs and [unsupported APIs for the Edge Runtime.




