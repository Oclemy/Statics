# Internationalized Routing



**Examples**

Next.js has built-in support for internationalized ([i18n](https://en.wikipedia.org/wiki/Internationalization_and_localization#Naming)) routing since `v10.0.0`. You can provide a list of locales, the default locale, and domain-specific locales and Next.js will automatically handle the routing.


The i18n routing support is currently meant to complement existing i18n library solutions like [`react-intl`](https://formatjs.io/docs/getting-started/installation), [`react-i18next`](https://react.i18next.com/), [`lingui`](https://lingui.js.org/), [`rosetta`](https://github.com/lukeed/rosetta), [`next-intl`](https://github.com/amannn/next-intl), `next-translate` and others by streamlining the routes and locale parsing.


To get started, add the `i18n` config to your `next.config.js` file.


Locales are [UTS Locale Identifiers](https://www.unicode.org/reports/tr35/tr35-59/tr35.html#Identifiers), a standardized format for defining locales.


Generally a Locale Identifier is made up of a language, region, and script separated by a dash: `language-region-script`. The region and script are optional. An example:


* `en-US` - English as spoken in the United States
* `nl-NL` - Dutch as spoken in the Netherlands
* `nl` - Dutch, no specific region


If user locale is `nl-BE` and it is not listed in your configuration, they will be redirected to `nl` if available, or to the default locale otherwise.
If you don't plan to support all regions of a country, it is therefore a good practice to include country locales that will act as fallbacks.



```javascript

module.exports = {
  i18n: {
    
    
    locales: ['en-US', 'fr', 'nl-NL'],
    
    
    defaultLocale: 'en-US',
    
    
    
    domains: [
      {
        domain: 'example.com',
        defaultLocale: 'en-US',
      },
      {
        domain: 'example.nl',
        defaultLocale: 'nl-NL',
      },
      {
        domain: 'example.fr',
        defaultLocale: 'fr',
        
        
        http: true,
      },
    ],
  },
}

```

There are two locale handling strategies: Sub-path Routing and Domain Routing.


Sub-path Routing puts the locale in the url path.



```javascript

module.exports = {
  i18n: {
    locales: ['en-US', 'fr', 'nl-NL'],
    defaultLocale: 'en-US',
  },
}

```

With the above configuration `en-US`, `fr`, and `nl-NL` will be available to be routed to, and `en-US` is the default locale. If you have a `pages/blog.js` the following urls would be available:


* `/blog`
* `/fr/blog`
* `/nl-nl/blog`


The default locale does not have a prefix.


By using domain routing you can configure locales to be served from different domains:



```javascript

module.exports = {
  i18n: {
    locales: ['en-US', 'fr', 'nl-NL', 'nl-BE'],
    defaultLocale: 'en-US',

    domains: [
      {
        
        
        domain: 'example.com',
        defaultLocale: 'en-US',
      },
      {
        domain: 'example.fr',
        defaultLocale: 'fr',
      },
      {
        domain: 'example.nl',
        defaultLocale: 'nl-NL',
        
        
        locales: ['nl-BE'],
      },
    ],
  },
}

```

For example if you have `pages/blog.js` the following urls will be available:


* `example.com/blog`
* `www.example.com/blog`
* `example.fr/blog`
* `example.nl/blog`
* `example.nl/nl-BE/blog`


When a user visits the application root (generally `/`), Next.js will try to automatically detect which locale the user prefers based on the `Accept-Language` header and the current domain.


If a locale other than the default locale is detected, the user will be redirected to either:


* **When using Sub-path Routing:** The locale prefixed path
* **When using Domain Routing:** The domain with that locale specified as the default


When using Domain Routing, if a user with the `Accept-Language` header `fr;q=0.9` visits `example.com`, they will be redirected to `example.fr` since that domain handles the `fr` locale by default.


When using Sub-path Routing, the user would be redirected to `/fr`.


With Next.js 12 and Middleware we can add a prefix to the default locale with a [workaround](https://github.com/vercel/next.js/discussions/18419).


For example, here's a `next.config.js` file with support for a few languages. Note the `"default"` locale has been added intentionally.



```javascript


module.exports = {
  i18n: {
    locales: ['default', 'en', 'de', 'fr'],
    defaultLocale: 'default',
    localeDetection: false,
  },
  trailingSlash: true,
}

```

Next, we can use Middleware to add custom routing rules:



```javascript


import { NextRequest, NextResponse } from 'next/server'

const PUBLIC_FILE = /.(.*)$/

export async function middleware(req: NextRequest) {
  if (
    req.nextUrl.pathname.startsWith('/_next') ||
    req.nextUrl.pathname.includes('/api/') ||
    PUBLIC_FILE.test(req.nextUrl.pathname)
  ) {
    return
  }

  if (req.nextUrl.locale === 'default') {
    const locale = req.cookies.get('NEXT_LOCALE')?.value || 'en'

    return NextResponse.redirect(
      new URL(`/${locale}${req.nextUrl.pathname}${req.nextUrl.search}`, req.url)
    )
  }
}

```

This Middleware skips adding the default prefix to [API Routes and public files like fonts or images. If a request is made to the default locale, we redirect to our prefix `/en`.


The automatic locale detection can be disabled with:



```javascript

module.exports = {
  i18n: {
    localeDetection: false,
  },
}

```

When `localeDetection` is set to `false` Next.js will no longer automatically redirect based on the user's preferred locale and will only provide locale information detected from either the locale based domain or locale path as described above.


You can access the locale information via the Next.js router. For example, using the `useRouter()` hook the following properties are available:


* `locale` contains the currently active locale.
* `locales` contains all configured locales.
* `defaultLocale` contains the configured default locale.


When pre-rendering pages with `getStaticProps` or `getServerSideProps`, the locale information is provided in [the context provided to the function.


When leveraging `getStaticPaths`, the configured locales are provided in the context parameter of the function under `locales` and the configured defaultLocale under `defaultLocale`.


You can use `next/link` or `next/router` to transition between locales.


For `next/link`, a `locale` prop can be provided to transition to a different locale from the currently active one. If no `locale` prop is provided, the currently active `locale` is used during client-transitions. For example:



```javascript
import Link from 'next/link'

export default function IndexPage(props) {
  return (
    <Link href="/another" locale="fr">
 To /fr/another
 </Link>
  )
}

```

When using the `next/router` methods directly, you can specify the `locale` that should be used via the transition options. For example:



```javascript
import { useRouter } from 'next/router'

export default function IndexPage(props) {
  const router = useRouter()

  return (
    <div
 onClick={() => {
 router.push('/another', '/another', { locale: 'fr' })
 }}
 >
 to /fr/another
 </div>
  )
}

```

Note that to handle switching only the `locale` while preserving all routing information such as [dynamic route query values or hidden href query values, you can provide the `href` parameter as an object:



```javascript
import { useRouter } from 'next/router'
const router = useRouter()
const { pathname, asPath, query } = router

router.push({ pathname, query }, asPath, { locale: nextLocale })

```

See here for more information on the object structure for `router.push`.


If you have a `href` that already includes the locale you can opt-out of automatically handling the locale prefixing:



```javascript
import Link from 'next/link'

export default function IndexPage(props) {
  return (
    <Link href="/fr/another" locale={false}>
 To /fr/another
 </Link>
  )
}

```

Next.js supports overriding the accept-language header with a `NEXT_LOCALE=the-locale` cookie. This cookie can be set using a language switcher and then when a user comes back to the site it will leverage the locale specified in the cookie when redirecting from `/` to the correct locale location.


For example, if a user prefers the locale `fr` in their accept-language header but a `NEXT_LOCALE=en` cookie is set the `en` locale when visiting `/` the user will be redirected to the `en` locale location until the cookie is removed or expired.


Since Next.js knows what language the user is visiting it will automatically add the `lang` attribute to the `<html>` tag.


Next.js doesn't know about variants of a page so it's up to you to add the `hreflang` meta tags using `next/head` You can learn more about `hreflang` in the [Google Webmasters documentation](https://support.google.com/webmasters/answer/189077).



> 
> Note that Internationalized Routing does not integrate with [`next export` as `next export` does not leverage the Next.js routing layer. Hybrid Next.js applications that do not use `next export` are fully supported.
> 
> 
> 


For pages using `getStaticProps` with [Dynamic Routes all locale variants of the page desired to be prerendered need to be returned from `getStaticPaths` Along with the `params` object returned for `paths`, you can also return a `locale` field specifying which locale you want to render. For example:



```javascript

export const getStaticPaths = ({ locales }) => {
  return {
    paths: [
      
      { params: { slug: 'post-1' }, locale: 'en-US' },
      { params: { slug: 'post-1' }, locale: 'fr' },
    ],
    fallback: true,
  }
}

```

For [Automatically Statically Optimized and non-dynamic `getStaticProps` pages, **a version of the page will be generated for each locale**. This is important to consider because it can increase build times depending on how many locales are configured inside `getStaticProps`.


For example, if you have 50 locales configured with 10 non-dynamic pages using `getStaticProps`, this means `getStaticProps` will be called 500 times. 50 versions of the 10 pages will be generated during each build.


To decrease the build time of dynamic pages with `getStaticProps`, use a [`fallback` mode This allows you to return only the most popular paths and locales from `getStaticPaths` for prerendering during the build. Then, Next.js will build the remaining pages at runtime as they are requested.


For pages that are [automatically statically optimized a version of the page will be generated for each locale.


For non-dynamic `getStaticProps` pages, a version is generated for each locale like above. `getStaticProps` is called with each `locale` that is being rendered. If you would like to opt-out of a certain locale from being pre-rendered, you can return `notFound: true` from `getStaticProps` and this variant of the page will not be generated.



```javascript
export async function getStaticProps({ locale }) {
  
  
  const res = await fetch(`https://.../posts?locale=${locale}`)
  const posts = await res.json()

  if (posts.length === 0) {
    return {
      notFound: true,
    }
  }

  
  
  return {
    props: {
      posts,
    },
  }
}

```

* `locales`: 100 total locales
* `domains`: 100 total locale domain items



> 
> **Note:** These limits have been added initially to prevent potential [performance issues at build time You can workaround these limits with custom routing using Middleware in Next.js 12.
> 
> 
> 




