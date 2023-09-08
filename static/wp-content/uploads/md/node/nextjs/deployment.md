# Deployment


Congratulations, you are ready to deploy your Next.js application to production. This document will show how to deploy either managed or self-hosted using the [Next.js Build API build` generates an optimized version of your application for production. This standard output includes:


* HTML files for pages using `getStaticProps` or [Automatic Static Optimization CSS files for global styles or for individually scoped styles
* JavaScript for pre-rendering dynamic content from the Next.js server
* JavaScript for interactivity on the client-side through React


This output is generated inside the `.next` folder:


* `.next/static/chunks/pages` – Each JavaScript file inside this folder relates to the route with the same name. For example, `.next/static/chunks/pages/about.js` would be the JavaScript file loaded when viewing the `/about` route in your application
* `.next/static/media` – Statically imported images from `next/image` are hashed and copied here
* `.next/static/css` – Global CSS files for all pages in your application
* `.next/server/pages` – The HTML and JavaScript entry points prerendered from the server. The `.nft.json` files are created when [Output File Tracing is enabled and contain all the file paths that depend on a given page.
* `.next/server/chunks` – Shared JavaScript chunks used in multiple places throughout your application
* `.next/cache` – Output for the build cache and cached images, responses, and pages from the Next.js server. Using a cache helps decrease build times and improve performance of loading images


All JavaScript code inside `.next` has been **compiled** and browser bundles have been **minified** to help achieve the best performance and support [all modern browsers](/docs/basic-features/supported-browsers-features).


[Vercel](https://vercel.com?utm_source=next-site&utm_medium=docs&utm_campaign=next-website) is the fastest way to deploy your Next.js application with zero configuration.


When deploying to Vercel, the platform [automatically detects Next.js](https://vercel.com/solutions/nextjs?utm_source=next-site&utm_medium=docs&utm_campaign=next-website), runs `next build`, and optimizes the build output for you, including:


In addition, Vercel provides features like:


[Deploy a Next.js application to Vercel](https://vercel.com/new/git/external?repository-url=https://github.com/vercel/next.js/tree/canary/examples/hello-world&project-name=hello-world&repository-name=hello-world&utm_source=next-site&utm_medium=docs&utm_campaign=next-website) for free to try it out.


You can self-host Next.js with support for all features using Node.js or Docker. You can also do a Static HTML Export, which [has some limitations can be deployed to any hosting provider that supports Node.js. For example, [AWS EC2](https://aws.amazon.com/ec2/) or a [DigitalOcean Droplet](https://www.digitalocean.com/products/droplets/).


First, ensure your `package.json` has the `"build"` and `"start"` scripts:



```javascript
{
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "start": "next start"
  }
}

```

Then, run `next build` to build your application. Finally, run `next start` to start the Node.js server. This server supports all features of Next.js.



> 
> If you are using `next/image` consider adding `sharp` for more performant [Image Optimization in your production environment by running `npm install sharp` in your project directory. On Linux platforms, `sharp` may require [additional configuration](https://sharp.pixelplumbing.com/install#linux-memory-allocator) to prevent excessive memory usage.
> 
> 
> 


Next.js can be deployed to any hosting provider that supports Docker containers. You can use this approach when deploying to container orchestrators such as Kubernetes or [HashiCorp Nomad](https://www.nomadproject.io/), or when running inside a single node in any cloud provider.


1. [Install Docker](https://docs.docker.com/get-docker/) on your machine
2. Clone the with-docker example
3. Build your container: `docker build -t nextjs-docker .`
4. Run your container: `docker run -p 3000:3000 nextjs-docker`


If you need to use different Environment Variables across multiple environments, check out our with-docker-multi-env example.


If you’d like to do a static HTML export of your Next.js app, follow the directions on our [Static HTML Export documentation following services support Next.js `v12+`. Below, you’ll find examples or guides to deploy Next.js to each service.



> 
> **Note:** There are also managed platforms that allow you to use a Dockerfile as shown in the [example above 
> 
> 


The following services only support deploying Next.js using [`next export` can also manually deploy the [`next export` output to any static hosting provider, often through your CI/CD pipeline like GitHub Actions, Jenkins, AWS CodeBuild, Circle CI, Azure Pipelines, and more.



> 
> **Note:** Not all serverless providers implement the [Next.js Build API from `next start`. Please check with the provider to see what features are supported.
> 
> 
> 


When you deploy your Next.js application, you want to see the latest version without needing to reload.


Next.js will automatically load the latest version of your application in the background when routing. For client-side navigations, `next/link` will temporarily function as a normal `<a>` tag.


**Note:** If a new page (with an old version) has already been prefetched by `next/link`, Next.js will use the old version. Navigating to a page that has *not* been prefetched (and is not cached at the CDN level) will load the latest version.


Sometimes you might want to run some cleanup code on process signals like `SIGTERM` or `SIGINT`.


You can do that by setting the env variable `NEXT_MANUAL_SIG_HANDLE` to `true` and then register a handler for that signal inside your `_document.js` file. Please note that you need to register env variable directly in the system env variable, not in the `.env` file.



```javascript

{
  "scripts": {
    "dev": "NEXT_MANUAL_SIG_HANDLE=true next dev",
    "build": "next build",
    "start": "NEXT_MANUAL_SIG_HANDLE=true next start"
  }
}

```


```javascript


if (process.env.NEXT_MANUAL_SIG_HANDLE) {
  
  process.on('SIGTERM', () => {
    console.log('Received SIGTERM: ', 'cleaning up')
    process.exit(0)
  })

  process.on('SIGINT', () => {
    console.log('Received SIGINT: ', 'cleaning up')
    process.exit(0)
  })
}

```

For more information on what to do next, we recommend the following sections:





