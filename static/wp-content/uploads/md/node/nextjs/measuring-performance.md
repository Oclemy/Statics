# Measuring performance


[Next.js Analytics allows you to analyze and measure the performance of
pages using different metrics.


You can start collecting your [Real Experience Score](https://vercel.com/docs/concepts/analytics/web-vitals?utm_source=next-site&utm_medium=docs&utm_campaign=next-website) with zero-configuration on [Vercel deployments](https://vercel.com/docs/analytics?utm_source=next-site&utm_medium=docs&utm_campaign=next-website). There's also support for Analytics if you're [self-hosting](https://vercel.com/docs/concepts/analytics#self-hosted?utm_source=next-site&utm_medium=docs&utm_campaign=next-website).


The rest of this documentation describes the built-in relayer Next.js Analytics uses.


First, you will need to create a [custom App component and define a `reportWebVitals` function:



```javascript

export function reportWebVitals(metric) {
  console.log(metric)
}

function MyApp({ Component, pageProps }) {
  return <Component {...pageProps} />
}

export default MyApp

```

This function is fired when the final values for any of the metrics have finished calculating on
the page. You can use to log any of the results to the console or send to a particular endpoint.


The `metric` object returned to the function consists of a number of properties:


* `id`: Unique identifier for the metric in the context of the current page load
* `name`: Metric name
* `startTime`: First recorded timestamp of the performance entry in milliseconds (if applicable)
* `value`: Value, or duration in [milliseconds](https://developer.mozilla.org/en-US/docs/Web/API/DOMHighResTimeStamp), of the performance entry
* `label`: Type of metric (`web-vital` or `custom`)


There are two types of metrics that are tracked:


* Web Vitals
* Custom metrics


[Web Vitals](https://web.dev/vitals/) are a set of useful metrics that aim to capture the user
experience of a web page. The following web vitals are all included:


You can handle all the results of these metrics using the `web-vital` label:



```javascript
export function reportWebVitals(metric) {
  if (metric.label === 'web-vital') {
    console.log(metric) 
  }
}

```

There's also the option of handling each of the metrics separately:



```javascript
export function reportWebVitals(metric) {
  switch (metric.name) {
    case 'FCP':
      
      break
    case 'LCP':
      
      break
    case 'CLS':
      
      break
    case 'FID':
      
      break
    case 'TTFB':
      
      break
    case 'INP':
      
      break
    default:
      break
  }
}

```

A third-party library, [web-vitals](https://github.com/GoogleChrome/web-vitals), is used to measure
these metrics. Browser compatibility depends on the particular metric, so refer to the Browser
Support section to find out which
browsers are supported.


In addition to the core metrics listed above, there are some additional custom metrics that
measure the time it takes for the page to hydrate and render:


* `Next.js-hydration`: Length of time it takes for the page to start and finish hydrating (in ms)
* `Next.js-route-change-to-render`: Length of time it takes for a page to start rendering after a
route change (in ms)
* `Next.js-render`: Length of time it takes for a page to finish render after a route change (in ms)


You can handle all the results of these metrics using the `custom` label:



```javascript
export function reportWebVitals(metric) {
  if (metric.label === 'custom') {
    console.log(metric) 
  }
}

```

There's also the option of handling each of the metrics separately:



```javascript
export function reportWebVitals(metric) {
  switch (metric.name) {
    case 'Next.js-hydration':
      
      break
    case 'Next.js-route-change-to-render':
      
      break
    case 'Next.js-render':
      
      break
    default:
      break
  }
}

```

These metrics work in all browsers that support the [User Timing API](https://caniuse.com/#feat=user-timing).


With the relay function, you can send any of results to an analytics endpoint to measure and track
real user performance on your site. For example:



```javascript
export function reportWebVitals(metric) {
  const body = JSON.stringify(metric)
  const url = 'https://example.com/analytics'

  
  if (navigator.sendBeacon) {
    navigator.sendBeacon(url, body)
  } else {
    fetch(url, { body, method: 'POST', keepalive: true })
  }
}

```


> 
> **Note**: If you use [Google Analytics](https://analytics.google.com/analytics/web/), using the
> `id` value can allow you to construct metric distributions manually (to calculate percentiles,
> etc.)
> 
> 
> 
> ```javascript
> export function reportWebVitals({ id, name, label, value }) {
>   
>   
>   window.gtag('event', name, {
>     event_category:
>       label === 'web-vital' ? 'Web Vitals' : 'Next.js custom metric',
>     value: Math.round(name === 'CLS' ? value * 1000 : value), 
>     event_label: id, 
>     non_interaction: true, 
>   })
> }
> 
> ```
> 
> Read more about [sending results to Google Analytics](https://github.com/GoogleChrome/web-vitals#send-the-results-to-google-analytics).
> 
> 
> 


When debugging issues related to Web Vitals, it is often helpful if we can pinpoint the source of the problem.
For example, in the case of Cumulative Layout Shift (CLS), we might want to know the first element that shifted when the single largest layout shift occurred.
Or, in the case of Largest Contentful Paint (LCP), we might want to identify the element corresponding to the LCP for the page.
If the LCP element is an image, knowing the URL of the image resource can help us locate the asset we need to optimize.


Pinpointing the biggest contributor to the Web Vitals score, aka [attribution](https://github.com/GoogleChrome/web-vitals/blob/4ca38ae64b8d1e899028c692f94d4c56acfc996c/README.md#attribution),
allows us to obtain more in-depth information like entries for [PerformanceEventTiming](https://developer.mozilla.org/en-US/docs/Web/API/PerformanceEventTiming), PerformanceNavigationTiming and [PerformanceResourceTiming](https://developer.mozilla.org/en-US/docs/Web/API/PerformanceResourceTiming).


Attribution is disabled by default in Next.js but can be enabled **per metric** by specifying the following in `next.config.js`.



```javascript

experimental: {
  webVitalsAttribution: ['CLS', 'LCP']
}

```

Valid attribution values are all `web-vitals` metrics specified in the `NextWebVitalsMetric` type.


If you are using TypeScript, you can use the built-in type `NextWebVitalsMetric`:



```javascript


import type { AppProps, NextWebVitalsMetric } from 'next/app'

function MyApp({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />
}

export function reportWebVitals(metric: NextWebVitalsMetric) {
  console.log(metric)
}

export default MyApp

```



