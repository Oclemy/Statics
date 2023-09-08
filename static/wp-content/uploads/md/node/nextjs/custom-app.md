# Custom `App`



> 
> **Note**: Next.js 13 introduces the `app/` directory (beta). This new directory has support for layouts, nested routes, and uses Server Components by default. Inside `app/`, you can fetch data for your entire application inside layouts, including support for more granular nested layouts (with [colocated data fetching 
> 
> [Learn more about incrementally adopting `app/` 
> 
> 


Next.js uses the `App` component to initialize pages. You can override it and control the page initialization and:


* Persist layouts between page changes
* Keeping state when navigating pages
* Inject additional data into pages
* [Add global CSS override the default `App`, create the file `./pages/_app.js` as shown below:



```javascript
export default function MyApp({ Component, pageProps }) {
  return <Component {...pageProps} />
}

```

The `Component` prop is the active `page`, so whenever you navigate between routes, `Component` will change to the new `page`. Therefore, any props you send to `Component` will be received by the `page`.


`pageProps` is an object with the initial props that were preloaded for your page by one of our [data fetching methods otherwise it's an empty object.


The `App.getInitialProps` receives a single argument called `context.ctx`. It's an object with the same set of properties as the [`context` object in `getInitialProps`.


If you’re using TypeScript, take a look at [our TypeScript documentation more information on what to do next, we recommend the following sections:





