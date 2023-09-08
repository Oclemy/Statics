# Optimizing Fonts


**`@next/font`** will automatically optimize your fonts (including custom fonts) and remove external network requests for improved privacy and performance.



> 
> **🎥 Watch:** Learn more about how to use `@next/font` → [YouTube (6 minutes)](https://www.youtube.com/watch?v=L8_98i_bMMA).
> 
> 
> 


`@next/font` includes **built-in automatic self-hosting** for *any* font file. This means you can optimally load web fonts with zero layout shift, thanks to the underlying CSS `size-adjust` property used.


This new font system also allows you to conveniently use all Google Fonts with performance and privacy in mind. CSS and font files are downloaded at build time and self-hosted with the rest of your static assets. **No requests are sent to Google by the browser.**


To get started, install `@next/font`:



```javascript
npm install @next/font

```

Automatically self-host any Google Font. Fonts are included in the deployment and served from the same domain as your deployment. **No requests are sent to Google by the browser.**


Import the font you would like to use from `@next/font/google` as a function. We recommend using [**variable fonts**](https://fonts.google.com/variablefonts) for the best performance and flexibility.


To use the font in all your pages, add it to [`_app.js` file under `/pages` as shown below:



```javascript

import { Inter } from '@next/font/google'


const inter = Inter({ subsets: ['latin'] })

export default function MyApp({ Component, pageProps }) {
  return (
    <main className={inter.className}>
      <Component {...pageProps} />
    </main>
  )
}

```

If you can't use a variable font, you will **need to specify a weight**:



```javascript

import { Roboto } from '@next/font/google'

const roboto = Roboto({
  weight: '400',
  subsets: ['latin'],
})

export default function MyApp({ Component, pageProps }) {
  return (
    <main className={roboto.className}>
      <Component {...pageProps} />
    </main>
  )
}

```

You can specify multiple weights and/or styles by using an array:



```javascript
const roboto = Roboto({
  weight: ['400', '700'],
  style: ['normal', 'italic'],
  subsets: ['latin'],
})

```

You can also use the font without a wrapper and `className` by injecting it inside the `<head>` as follows:



```javascript

import { Inter } from '@next/font/google'

const inter = Inter({ subsets: ['latin'] })

export default function MyApp({ Component, pageProps }) {
  return (
    <>
      <style jsx global>{`
 html {
 font-family: ${inter.style.fontFamily};
 }
 `}</style>
      <Component {...pageProps} />
    </>
  )
}

```

To use the font on a single page, add it to the specific page as shown below:



```javascript

import { Inter } from '@next/font/google'

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  return (
    <div className={inter.className}>
      <p>Hello World</p>
    </div>
  )
}

```

Google Fonts are automatically [subset](https://fonts.google.com/knowledge/glossary/subsetting). This reduces the size of the font file and improves performance. You'll need to define which of these subsets you want to preload. Failing to specify any subsets while `preload` is true will result in a warning.


This can be done in 2 ways:


* On a font per font basis by adding it to the function call



```javascript

const inter = Inter({ subsets: ['latin'] })

```
* Globally for all your fonts in your `next.config.js`



```javascript

module.exports = {
  experimental: {
    fontLoaders: [
      { loader: '@next/font/google', options: { subsets: ['latin'] } },
    ],
  },
}

```

	+ If both are configured, the subset in the function call is used.


View the [Font API Reference for more information.


Import `@next/font/local` and specify the `src` of your local font file. We recommend using [**variable fonts**](https://fonts.google.com/variablefonts) for the best performance and flexibility.



```javascript

import localFont from '@next/font/local'


const myFont = localFont({ src: './my-font.woff2' })

export default function MyApp({ Component, pageProps }) {
  return (
    <main className={myFont.className}>
      <Component {...pageProps} />
    </main>
  )
}

```

If you want to use multiple files for a single font family, `src` can be an array:



```javascript
const roboto = localFont({
  src: [
    {
      path: './Roboto-Regular.woff2',
      weight: '400',
      style: 'normal',
    },
    {
      path: './Roboto-Italic.woff2',
      weight: '400',
      style: 'italic',
    },
    {
      path: './Roboto-Bold.woff2',
      weight: '700',
      style: 'normal',
    },
    {
      path: './Roboto-BoldItalic.woff2',
      weight: '700',
      style: 'italic',
    },
  ],
})

```

View the [Font API Reference for more information.


`@next/font` can be used with Tailwind CSS through a [CSS variable the example below, we use the font `Inter` from `@next/font/google` (You can use any font from Google or Local Fonts). Load your font with the `variable` option to define your CSS variable name and assign it to `inter`. Then, use `inter.variable` to add the CSS variable to your HTML document.



```javascript

import { Inter } from '@next/font/google'

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
})

export default function MyApp({ Component, pageProps }) {
  return (
    <main className={`${inter.variable} font-sans`}>
      <Component {...pageProps} />
    </main>
  )
}

```

Finally, add the CSS variable to your [Tailwind CSS config](https://github.com/vercel/next.js/tree/canary/examples/with-tailwindcss):



```javascript

const { fontFamily } = require('tailwindcss/defaultTheme')


module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['var(--font-inter)', ...fontFamily.sans],
      },
    },
  },
  plugins: [],
}

```

You can now use the `font-sans` utility class to apply the font to your elements.


When a font function is called on a page of your site, it is not globally available and preloaded on all routes. Rather, the font is only preloaded on the related route/s based on the type of file where it is used:


* if it's a [unique page it is preloaded on the unique route for that page
* if it's in the [custom App it is preloaded on all the routes of the site under `/pages`


Every time you call the `localFont` or Google font function, that font is hosted as one instance in your application. Therefore, if you load the same font function in multiple files, multiple instances of the same font are hosted. In this situation, it is recommended to do the following:


* Call the font loader function in one shared file
* Export it as a constant
* Import the constant in each file where you would like to use this font





