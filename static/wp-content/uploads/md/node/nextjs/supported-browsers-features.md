# Supported Browsers and Features


Next.js supports **modern browsers** with zero configuration.


* Chrome 64+
* Edge 79+
* Firefox 67+
* Opera 51+
* Safari 12+


If you would like to target specific browsers or features, Next.js supports Browserslist configuration in your `package.json` file. Next.js uses the following Browserslist configuration by default:



```javascript
{
  "browserslist": [
    "chrome 64",
    "edge 79",
    "firefox 67",
    "opera 51",
    "safari 12"
  ]
}

```

We inject [widely used polyfills](https://github.com/vercel/next.js/blob/canary/packages/next-polyfill-nomodule/src/index.js), including:


If any of your dependencies includes these polyfills, they’ll be eliminated automatically from the production build to avoid duplication.


In addition, to reduce bundle size, Next.js will only load these polyfills for browsers that require them. The majority of the web traffic globally will not download these polyfills.


If your own code or any external npm dependencies require features not supported by your target browsers (such as IE 11), you need to add polyfills yourself.


In this case, you should add a top-level import for the **specific polyfill** you need in your [Custom `<App>` or the individual component.


Next.js allows you to use the latest JavaScript features out of the box. In addition to [ES6 features](https://github.com/lukehoban/es6features), Next.js also supports:


In addition to `fetch()` on the client-side, Next.js polyfills `fetch()` in the Node.js environment. You can use `fetch()` in your server code (such as `getStaticProps`/`getServerSideProps`) without using polyfills such as `isomorphic-unfetch` or `node-fetch`.


Next.js has built-in TypeScript support. [Learn more here can customize babel configuration. [Learn more here


