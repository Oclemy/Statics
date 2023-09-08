# API Routes



**Examples**

API routes provide a solution to build your **API** with Next.js.


Any file inside the folder `pages/api` is mapped to `/api/*` and will be treated as an API endpoint instead of a `page`. They are server-side only bundles and won't increase your client-side bundle size.


For example, the following API route `pages/api/user.js` returns a `json` response with a status code of `200`:



```javascript
export default function handler(req, res) {
  res.status(200).json({ name: 'John Doe' })
}

```


> 
> **Note**: API Routes will be affected by [`pageExtensions` configuration in `next.config.js`.
> 
> 
> 


For an API route to work, you need to export a function as default (a.k.a **request handler**), which then receives the following parameters:


To handle different HTTP methods in an API route, you can use `req.method` in your request handler, like so:



```javascript
export default function handler(req, res) {
  if (req.method === 'POST') {
    
  } else {
    
  }
}

```

To fetch API endpoints, take a look into any of the examples at the start of this section.


For new projects, you can build your entire API with API Routes. If you have an existing API, you do not need to forward calls to the API through an API Route. Some other use cases for API Routes are:


* Masking the URL of an external service (e.g. `/api/secret` instead of `https://company.com/secret-url`)
* Using [Environment Variables on the server to securely access external services.


For more information on what to do next, we recommend the following sections:





