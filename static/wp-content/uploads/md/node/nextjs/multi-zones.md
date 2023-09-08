# Multi Zones



**Examples**

A zone is a single deployment of a Next.js app. You can have multiple zones and merge them as a single app.


For example, let's say you have the following apps:


* An app for serving `/blog/**`
* Another app for serving all other pages


With multi zones support, you can merge both these apps into a single one allowing your customers to browse it using a single URL, but you can develop and deploy both apps independently.


There are no zone related APIs. You only need to do the following:


* Make sure to keep only the pages you need in your app, meaning that an app can't have pages from another app, if app `A` has `/blog` then app `B` shouldn't have it too.
* Make sure to configure a basePath to avoid conflicts with pages and static files.


You can merge zones using `rewrites` in one of the apps or any HTTP proxy.


For [Next.js on Vercel](https://vercel.com?utm_source=next-site&utm_medium=docs&utm_campaign=next-website) applications, you can use a monorepo to deploy both apps with a single `git push`.




