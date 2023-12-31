# Cross-origin Errors


> Note:
>
> The following section applies only to the development mode of React. Error handling in production mode is done with regular try/catch statements.

In [development mode](/docs/optimizing-performance.html), React uses a global `error` event handler to preserve the "pause on exceptions" behavior of browser DevTools. It also logs errors to the developer console.

If an error is thrown from a [different origin](https://developer.mozilla.org/en-US/docs/Web/Security/Same-origin_policy) the browser will mask its details and React will not be able to log the original error message. This is a security precaution taken by browsers to avoid leaking sensitive information.

You can simplify the development/debugging process by ensuring that errors are thrown with a same-origin policy. Below are some common causes of cross-origin errors and ways to address them.

### CDN {#cdn}

When loading React (or other libraries that might throw errors) from a CDN, add the [`crossorigin`](https://developer.mozilla.org/en-US/docs/Web/HTML/CORS_settings_attributes) attribute to your `<script>` tags:

```html
<script crossorigin src="..."></script>
```

Also ensure the CDN responds with the `Access-Control-Allow-Origin: *` HTTP header:

![Access-Control-Allow-Origin: *](../images/docs/cdn-cors-header.png)

### Webpack {#webpack}

#### Source maps {#source-maps}

Some JavaScript bundlers may wrap the application code with `eval` statements in development. (For example Webpack will do this if [`devtool`](https://webpack.js.org/configuration/devtool/) is set to any value containing the word "eval".) This may cause errors to be treated as cross-origin.

If you use Webpack, we recommend using the `cheap-module-source-map` setting in development to avoid this problem.

#### Code splitting {#code-splitting}

If your application is split into multiple bundles, these bundles may be loaded using JSONP. This may cause errors thrown in the code of these bundles to be treated as cross-origin.

To resolve this, use the [`crossOriginLoading`](https://webpack.js.org/configuration/output/#output-crossoriginloading) setting in development to add the `crossorigin` attribute to the `<script>` tags generated for the JSONP requests.
