# Custom `Document`



> 
> **Note**: Next.js 13 introduces the `app/` directory (beta). This new directory has support for layouts, nested routes, and uses Server Components by default. Inside `app/`, you can modify the initial `html` and `body` tags using a root layout.
> 
> 
> [Learn more about incrementally adopting `app/` 
> 
> 


A custom `Document` can update the `<html>` and `<body>` tags used to render a Page This file is only rendered on the server, so event handlers like `onClick` cannot be used in `_document`.


To override the default `Document`, create the file `pages/_document.js` as shown below:



```javascript
import { Html, Head, Main, NextScript } from 'next/document'

export default function Document() {
  return (
    <Html>
 <Head />
 <body>
 <Main />
 <NextScript />
 </body>
 </Html>
  )
}

```

The code above is the default `Document` added by Next.js. Custom attributes are allowed as props. For example, we might want to add `lang="en"` to the `<html>` tag:



```javascript
<Html lang="en">

```

Or add a `className` to the `body` tag:



```javascript
<body className="bg-white">

```

`<Html>`, `<Head />`, `<Main />` and `<NextScript />` are required for the page to be properly rendered.


* The `<Head />` component used in `_document` is not the same as `next/head` The `<Head />` component used here should only be used for any `<head>` code that is common for all pages. For all other cases, such as `<title>` tags, we recommend using `next/head` in your pages or components.
* React components outside of `<Main />` will not be initialized by the browser. Do *not* add application logic here or custom CSS (like `styled-jsx`). If you need shared components in all your pages (like a menu or a toolbar), read Layouts instead.
* `Document` currently does not support Next.js [Data Fetching methods like `getStaticProps` or `getServerSideProps` 
> **Note:** This is advanced and only needed for libraries like CSS-in-JS to support server-side rendering. This is not needed for built-in `styled-jsx` support.
> 
> 
> 


For [React 18 support, we recommend avoiding customizing `getInitialProps` and `renderPage`, if possible.


The `ctx` object shown below is equivalent to the one received in `getInitialProps` with the addition of `renderPage`.



```javascript
import Document, { Html, Head, Main, NextScript } from 'next/document'

class MyDocument extends Document {
  static async getInitialProps(ctx) {
    const originalRenderPage = ctx.renderPage

    
    ctx.renderPage = () =>
      originalRenderPage({
        
        enhanceApp: (App) => App,
        
        enhanceComponent: (Component) => Component,
      })

    
    const initialProps = await Document.getInitialProps(ctx)

    return initialProps
  }

  render() {
    return (
      <Html>
 <Head />
 <body>
 <Main />
 <NextScript />
 </body>
 </Html>
    )
  }
}

export default MyDocument

```


> 
> **Note**: `getInitialProps` in `_document` is not called during client-side transitions.
> 
> 
> 


You can use the built-in `DocumentContext` type and change the file name to `./pages/_document.tsx` like so:



```javascript
import Document, { DocumentContext, DocumentInitialProps } from 'next/document'

class MyDocument extends Document {
  static async getInitialProps(
    ctx: DocumentContext
  ): Promise<DocumentInitialProps> {
    const initialProps = await Document.getInitialProps(ctx)

    return initialProps
  }
}

export default MyDocument

```



