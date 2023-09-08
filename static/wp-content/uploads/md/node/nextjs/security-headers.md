# Security Headers


To improve the security of your application, you can use `headers` in `next.config.js` to apply HTTP response headers to all routes in your application.



```javascript




const securityHeaders = []

module.exports = {
  async headers() {
    return [
      {
        
        source: '/:path*',
        headers: securityHeaders,
      },
    ]
  },
}

```

This header controls DNS prefetching, allowing browsers to proactively perform domain name resolution on external links, images, CSS, JavaScript, and more. This prefetching is performed in the background, so the DNS is more likely to be resolved by the time the referenced items are needed. This reduces latency when the user clicks a link.



```javascript
{
  key: 'X-DNS-Prefetch-Control',
  value: 'on'
}

```

This header informs browsers it should only be accessed using HTTPS, instead of using HTTP. Using the configuration below, all present and future subdomains will use HTTPS for a `max-age` of 2 years. This blocks access to pages or subdomains that can only be served over HTTP.


If you're deploying to [Vercel](https://vercel.com/docs/concepts/edge-network/headers#strict-transport-security?utm_source=next-site&utm_medium=docs&utm_campaign=next-website), this header is not necessary as it's automatically added to all deployments unless you declare `headers` in your `next.config.js`.



```javascript
{
  key: 'Strict-Transport-Security',
  value: 'max-age=63072000; includeSubDomains; preload'
}

```

This header stops pages from loading when they detect reflected cross-site scripting (XSS) attacks. Although this protection is not necessary when sites implement a strong `Content-Security-Policy` disabling the use of inline JavaScript (`'unsafe-inline'`), it can still provide protection for older web browsers that don't support CSP.



```javascript
{
  key: 'X-XSS-Protection',
  value: '1; mode=block'
}

```

This header indicates whether the site should be allowed to be displayed within an `iframe`. This can prevent against clickjacking attacks. This header has been superseded by CSP's `frame-ancestors` option, which has better support in modern browsers.



```javascript
{
  key: 'X-Frame-Options',
  value: 'SAMEORIGIN'
}

```

This header allows you to control which features and APIs can be used in the browser. It was previously named `Feature-Policy`. You can view the full list of permission options [here](https://github.com/w3c/webappsec-permissions-policy/blob/main/features.md).



```javascript
{
  key: 'Permissions-Policy',
  value: 'camera=(), microphone=(), geolocation=(), browsing-topics=()'
}

```

This header prevents the browser from attempting to guess the type of content if the `Content-Type` header is not explicitly set. This can prevent XSS exploits for websites that allow users to upload and share files. For example, a user trying to download an image, but having it treated as a different `Content-Type` like an executable, which could be malicious. This header also applies to downloading browser extensions. The only valid value for this header is `nosniff`.



```javascript
{
  key: 'X-Content-Type-Options',
  value: 'nosniff'
}

```

This header controls how much information the browser includes when navigating from the current website (origin) to another. You can read about the different options [here](https://scotthelme.co.uk/a-new-security-header-referrer-policy/).



```javascript
{
  key: 'Referrer-Policy',
  value: 'origin-when-cross-origin'
}

```

This header helps prevent cross-site scripting (XSS), clickjacking and other code injection attacks. Content Security Policy (CSP) can specify allowed origins for content including scripts, stylesheets, images, fonts, objects, media (audio, video), iframes, and more.


You can read about the many different CSP options [here](https://developer.mozilla.org/en-US/docs/Web/HTTP/CSP).


You can add Content Security Policy directives using a template string.



```javascript



const ContentSecurityPolicy = `
 default-src 'self';
 script-src 'self';
 child-src example.com;
 style-src 'self' example.com;
 font-src 'self'; 
`

```

When a directive uses a keyword such as `self`, wrap it in single quotes `''`.


In the header's value, replace the new line with a space.



```javascript
{
  key: 'Content-Security-Policy',
  value: ContentSecurityPolicy.replace(/s{2,}/g, ' ').trim()
}

```

For more information, we recommend the following sections:





