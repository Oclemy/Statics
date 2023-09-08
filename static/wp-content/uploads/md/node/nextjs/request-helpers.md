# API Routes Request Helpers



**Examples**

API Routes provide built-in request helpers which parse the incoming request (`req`):


* `req.cookies` - An object containing the cookies sent by the request. Defaults to `{}`
* `req.query` - An object containing the [query string](https://en.wikipedia.org/wiki/Query_string). Defaults to `{}`
* `req.body` - An object containing the body parsed by `content-type`, or `null` if no body was sent


Every API Route can export a `config` object to change the default configuration, which is the following:



```javascript
export const config = {
  api: {
    bodyParser: {
      sizeLimit: '1mb',
    },
  },
}

```

The `api` object includes all config options available for API Routes.


`bodyParser` is automatically enabled. If you want to consume the body as a `Stream` or with [`raw-body`](https://www.npmjs.com/package/raw-body), you can set this to `false`.


One use case for disabling the automatic `bodyParsing` is to allow you to verify the raw body of a **webhook** request, for example [from GitHub](https://docs.github.com/en/developers/webhooks-and-events/webhooks/securing-your-webhooks#validating-payloads-from-github).



```javascript
export const config = {
  api: {
    bodyParser: false,
  },
}

```

`bodyParser.sizeLimit` is the maximum size allowed for the parsed body, in any format supported by [bytes](https://github.com/visionmedia/bytes.js), like so:



```javascript
export const config = {
  api: {
    bodyParser: {
      sizeLimit: '500kb',
    },
  },
}

```

`externalResolver` is an explicit flag that tells the server that this route is being handled by an external resolver like *express* or *connect*. Enabling this option disables warnings for unresolved requests.



```javascript
export const config = {
  api: {
    externalResolver: true,
  },
}

```

`responseLimit` is automatically enabled, warning when an API Routes' response body is over 4MB.


If you are not using Next.js in a serverless environment, and understand the performance implications of not using a CDN or dedicated media host, you can set this limit to `false`.



```javascript
export const config = {
  api: {
    responseLimit: false,
  },
}

```

`responseLimit` can also take the number of bytes or any string format supported by `bytes`, for example `1000`, `'500kb'` or `'3mb'`.
This value will be the maximum response size before a warning is displayed. Default is 4MB. (see above)



```javascript
export const config = {
  api: {
    responseLimit: '8mb',
  },
}

```

For better type-safety, it is not recommended to extend the `req` and `res` objects. Instead, use functions to work with them:



```javascript


import { serialize, CookieSerializeOptions } from 'cookie'
import { NextApiResponse } from 'next'



export const setCookie = (
  res: NextApiResponse,
  name: string,
  value: unknown,
  options: CookieSerializeOptions = {}
) => {
  const stringValue =
    typeof value === 'object' ? 'j:' + JSON.stringify(value) : String(value)

  if (typeof options.maxAge === 'number') {
    options.expires = new Date(Date.now() + options.maxAge * 1000)
  }

  res.setHeader('Set-Cookie', serialize(name, stringValue, options))
}



import { NextApiRequest, NextApiResponse } from 'next'
import { setCookie } from '../../utils/cookies'

const handler = (req: NextApiRequest, res: NextApiResponse) => {
  
  
  setCookie(res, 'Next.js', 'api-middleware!', { path: '/', maxAge: 2592000 })
  
  res.end(res.getHeader('Set-Cookie'))
}

export default handler

```

If you can't avoid these objects from being extended, you have to create your own type to include the extra properties:



```javascript


import { NextApiRequest, NextApiResponse } from 'next'
import { withFoo } from 'external-lib-foo'

type NextApiRequestWithFoo = NextApiRequest & {
  foo: (bar: string) => void
}

const handler = (req: NextApiRequestWithFoo, res: NextApiResponse) => {
  req.foo('bar') 
  res.end('ok')
}

export default withFoo(handler)

```

Keep in mind this is not safe since the code will still compile even if you remove `withFoo()` from the export.




