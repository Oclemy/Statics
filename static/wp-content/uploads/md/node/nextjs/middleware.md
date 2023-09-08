# Middleware



**Version History**


| Version | Changes |
| --- | --- |
| `v13.1.0` | Advanced Middleware flags added |
| `v13.0.0` | Middleware can modify request headers, response headers, and send responses |
| `v12.2.0` | Middleware is stable |
| `v12.0.9` | Enforce absolute URLs in Edge Runtime ([PR](https://github.com/vercel/next.js/pull/33410)) |
| `v12.0.0` | Middleware (Beta) added |



Middleware allows you to run code before a request is completed, then based on the incoming request, you can modify the response by rewriting, redirecting, modifying the request or response headers, or responding directly.


Middleware runs *before* cached content, so you can personalize static files and pages. Common examples of Middleware would be authentication, A/B testing, localized pages, bot protection, and more. Regarding localized pages, you can start with [i18n routing and implement Middleware for more advanced use cases.



> 
> **Note:** If you were using Middleware prior to `12.2`, please see the [upgrade guide 
> 
> 


To begin using Middleware, follow the steps below:


1. Install the latest version of Next.js:



```javascript
npm install next@latest

```

2. Create a `middleware.ts` (or `.js`) file at the same level as your `pages` (in the root or `src` directory)
3. Export a middleware function from the `middleware.ts` file:



```javascript

import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'


export function middleware(request: NextRequest) {
  return NextResponse.redirect(new URL('/about-2', request.url))
}


export const config = {
  matcher: '/about/:path*',
}

```

Middleware will be invoked for **every route in your project**. The following is the execution order:


1. `headers` from `next.config.js`
2. `redirects` from `next.config.js`
3. Middleware (`rewrites`, `redirects`, etc.)
4. `beforeFiles` (`rewrites`) from `next.config.js`
5. Filesystem routes (`public/`, `_next/static/`, Pages, etc.)
6. `afterFiles` (`rewrites`) from `next.config.js`
7. Dynamic Routes (`/blog/[slug]`)
8. `fallback` (`rewrites`) from `next.config.js`


There are two ways to define which paths Middleware will run on:


1. Custom matcher config
2. Conditional statements


`matcher` allows you to filter Middleware to run on specific paths.



```javascript
export const config = {
  matcher: '/about/:path*',
}

```

You can match a single path or multiple paths with an array syntax:



```javascript
export const config = {
  matcher: ['/about/:path*', '/dashboard/:path*'],
}

```

The `matcher` config allows full regex so matching like negative lookaheads or character matching is supported. An example of a negative lookahead to match all except specific paths can be seen here:



```javascript
export const config = {
  matcher: [
    
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
  ],
}

```


> 
> **Note:** The `matcher` values need to be constants so they can be statically analyzed at build-time. Dynamic values such as variables will be ignored.
> 
> 
> 


Configured matchers:


1. MUST start with `/`
2. Can include named parameters: `/about/:path` matches `/about/a` and `/about/b` but not `/about/a/c`
3. Can have modifiers on named parameters (starting with `:`): `/about/:path*` matches `/about/a/b/c` because `*` is *zero or more*. `?` is *zero or one* and `+` *one or more*
4. Can use regular expression enclosed in parenthesis: `/about/(.*)` is the same as `/about/:path*`


Read more details on path-to-regexp documentation.



> 
> **Note:** For backward compatibility, Next.js always considers `/public` as `/public/index`. Therefore, a matcher of `/public/:path` will match.
> 
> 
> 



```javascript


import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  if (request.nextUrl.pathname.startsWith('/about')) {
    return NextResponse.rewrite(new URL('/about-2', request.url))
  }

  if (request.nextUrl.pathname.startsWith('/dashboard')) {
    return NextResponse.rewrite(new URL('/dashboard/user', request.url))
  }
}

```

The `NextResponse` API allows you to:


* `redirect` the incoming request to a different URL
* `rewrite` the response by displaying a given URL
* Set request headers for API Routes, `getServerSideProps`, and `rewrite` destinations
* Set response cookies
* Set response headers


To produce a response from Middleware, you should `rewrite` to a route (Page or [Edge API Route that produces a response.


Cookies are regular headers. On a `Request`, they are stored in the `Cookie` header. On a `Response` they are in the `Set-Cookie` header. Next.js provides a convenient way to access and manipulate these cookies through the `cookies` extension on `NextRequest` and `NextResponse`.


1. For incoming requests, `cookies` comes with the following methods: `get`, `getAll`, `set`, and `delete` cookies. You can check for the existence of a cookie with `has` or remove all cookies with `clear`.
2. For outgoing responses, `cookies` have the following methods `get`, `getAll`, `set`, and `delete`.



```javascript

import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  
  
  let cookie = request.cookies.get('nextjs')?.value
  console.log(cookie) 
  const allCookies = request.cookies.getAll()
  console.log(allCookies) 

  request.cookies.has('nextjs') 
  request.cookies.delete('nextjs')
  request.cookies.has('nextjs') 

  
  const response = NextResponse.next()
  response.cookies.set('vercel', 'fast')
  response.cookies.set({
    name: 'vercel',
    value: 'fast',
    path: '/test',
  })
  cookie = response.cookies.get('vercel')
  console.log(cookie) 
  

  return response
}

```

You can set request and response headers using the `NextResponse` API (setting *request* headers is available since Next.js v13.0.0).



```javascript


import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  
  const requestHeaders = new Headers(request.headers)
  requestHeaders.set('x-hello-from-middleware1', 'hello')

  
  const response = NextResponse.next({
    request: {
      
      headers: requestHeaders,
    },
  })

  
  response.headers.set('x-hello-from-middleware2', 'hello')
  return response
}

```


> 
> **Note:** Avoid setting large headers as it might cause [431 Request Header Fields Too Large](https://developer.mozilla.org/en-US/docs/Web/HTTP/Status/431) error depending on your backend web server configuration.
> 
> 
> 


You can respond to middleware directly by returning a `NextResponse` (responding from middleware is available since Next.js v13.1.0).


Once enabled, you can provide a response from middleware using the `Response` or `NextResponse` API:



```javascript

import { NextRequest, NextResponse } from 'next/server'
import { isAuthenticated } from '@lib/auth'


export const config = {
  matcher: '/api/:function*',
}

export function middleware(request: NextRequest) {
  
  if (!isAuthenticated(request)) {
    
    return new NextResponse(
      JSON.stringify({ success: false, message: 'authentication failed' }),
      { status: 401, headers: { 'content-type': 'application/json' } }
    )
  }
}

```

In `v13.1` of Next.js two additional flags were introduced for middleware, `skipMiddlewareUrlNormalize` and `skipTrailingSlashRedirect` to handle advanced use cases.


`skipTrailingSlashRedirect` allows disabling Next.js default redirects for adding or removing trailing slashes allowing custom handling inside middleware which can allow maintaining the trailing slash for some paths but not others allowing easier incremental migrations.



```javascript

module.exports = {
  skipTrailingSlashRedirect: true,
}

```


```javascript


const legacyPrefixes = ['/docs', '/blog']

export default async function middleware(req) {
  const { pathname } = req.nextUrl

  if (legacyPrefixes.some((prefix) => pathname.startsWith(prefix))) {
    return NextResponse.next()
  }

  
  if (
    !pathname.endsWith('/') &&
    !pathname.match(/((?!.well-known(?:/.*)?)(?:[^/]+/)*[^/]+.w+)/)
  ) {
    req.nextUrl.pathname += '/'
    return NextResponse.redirect(req.nextUrl)
  }
}

```

`skipMiddlewareUrlNormalize` allows disabling the URL normalizing Next.js does to make handling direct visits and client-transitions the same. There are some advanced cases where you need full control using the original URL which this unlocks.



```javascript


module.exports = {
  skipMiddlewareUrlNormalize: true,
}

```


```javascript


export default async function middleware(req) {
  const { pathname } = req.nextUrl

  

  console.log(pathname)
  
  
}

```




