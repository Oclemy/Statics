Preact is an excellent choice for [Progressive Web Apps](https://web.dev/learn/pwa/) that wish to load and become interactive quickly. [Preact CLI](https://github.com/preactjs/preact-cli/) codifies this into an instant build tool that gives you a PWA with a 100 [Lighthouse](https://developers.google.com/web/tools/lighthouse/) score right out of the box.

1. ### Loads less script



Preact's [small size](https://preactjs.com/about/project-goals) is valuable when you have a tight loading performance budget. On average mobile hardware, loading large bundles of JS leads to longer load, parse and eval times. This can leave users waiting a long time before they can interact with your app. By trimming down the library code in your bundles, you load quicker by shipping less code to your users.
2. ### Faster time to interactivity



If you're aiming to be [interactive in under 5s](https://infrequently.org/2016/09/what-exactly-makes-something-a-progressive-web-app/), every KB matters. [Switching React for Preact](https://preactjs.com/guide/switching-to-preact) in your projects can shave multiple KBs off and enable you to get interactive in one RTT. This makes it a great fit for Progressive Web Apps trying to trim down as much code as possible for each route.
3. ### A building block that works great with the React ecosystem



Whether you need to use React's [server-side rendering](https://facebook.github.io/react/docs/react-dom-server.html) to get pixels on the screen quickly or use [React Router](https://github.com/ReactTraining/react-router) for navigation, Preact works well with many libraries in the ecosystem.

## This site is a PWA

In fact, the site you're on right now is a Progressive Web App!. Here it is getting interactive in under 5 seconds in a trace from a Nexus 5X over 3G:

![A DevTools Timeline trace of the preactjs.com site on a Nexus 5X](https://preactjs.com/assets/pwa-guide/timeline.jpg)Static site content is stored in the (Service Worker) Cache Storage API enabling instant loading on repeat visits.

## Performance tips

While Preact is a drop-in that should work well for your PWA, it can also be used with a number of other tools and techniques. These include:

1. **[Code-splitting](https://webpack.js.org/guides/code-splitting/)** breaks up your code so you only ship what the user needs for a page. Lazy-loading the rest as needed improves page load times. Supported via webpack or Rollup.
2. **[Service Worker caching](https://developers.google.com/web/fundamentals/getting-started/primers/service-workers)** allows you to offline cache static and dynamic resources in your app, enabling instant loading and faster interactivity on repeat visits. Accomplish this with [Workbox](https://developers.google.com/web/tools/workbox)
3. **[PRPL](https://developers.google.com/web/fundamentals/performance/prpl-pattern/)** encourages preemptively pushing or pre-loading assets to the browser, speeding up the load of subsequent pages. It builds on code-splitting and SW caching.
4. **[Lighthouse](https://github.com/GoogleChrome/lighthouse/)** allows you to audit the performance and best practices of your Progressive Web App so you know how well your app performs.

## Preact CLI

[Preact CLI](https://github.com/preactjs/preact-cli/) is the official build tool for Preact projects. It's a single dependency command line tool that bundles your Preact code into a highly optimized Progressive Web App. It aims to make all of the above recommendations automatic, so you can focus on writing great Components.

Here are a few things Preact CLI bakes in:

* Automatic, seamless code-splitting for your URL routes
* Automatically generates and installs a ServiceWorker
* Generates HTTP2/Push headers (or preload meta tags) based on the URL
* Pre-rendering for a fast Time To First Paint
* Conditionally loads polyfills if needed

Since [Preact CLI](https://github.com/preactjs/preact-cli/) is internally powered by [Webpack](https://webpack.js.org), you can define a `preact.config.js` and customize the build process to suit your needs. Even if you customize things, you still get to take advantage of awesome defaults, and can update as new versions of `preact-cli` are released.




