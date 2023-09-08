# Next.js Codemods


Next.js provides Codemod transformations to help upgrade your Next.js codebase when a feature is deprecated.


Codemods are transformations that run on your codebase programmatically. This allows for a large amount of changes to be applied without having to manually go through every file.


`npx @next/codemod@latest <transform> <path>`


* `transform` - name of transform, see available transforms below.
* `path` - files or directory to transform
* `--dry` Do a dry-run, no code will be edited
* `--print` Prints the changed output for comparison


Safely removes `<a>` from `next/link` or adds `legacyBehavior` prop.


For example:



```javascript
export default function Page() {
  return (
    <Link href="/about">
 <a>About Us</a>
 </Link>
  )
}

```

Transforms into:



```javascript
export default function Page() {
  return <Link href="/about">About Us</Link>
}

```

This codemod safely migrates existing Next.js 10, 11, 12 applications importing `next/image` to the renamed `next/legacy/image` import in Next.js 13.


For example:



```javascript
import Image1 from 'next/image'
import Image2 from 'next/future/image'

export default function Home() {
  return (
    <div>
 <Image1 src="/test.jpg" width="200" height="300" />
 <Image2 src="/test.png" width="500" height="400" />
 </div>
  )
}

```

Transforms into:



```javascript
import Image1 from 'next/legacy/image'
import Image2 from 'next/image'

export default function Home() {
  return (
    <div>
 <Image1 src="/test.jpg" width="200" height="300" />
 <Image2 src="/test.png" width="500" height="400" />
 </div>
  )
}

```

This codemod dangerously migrates from `next/legacy/image` to the new `next/image` by adding inline styles and removing unused props. Please note this codemod is experimental and only covers static usage (such as `<Image src={img} layout="responsive" />`) but not dynamic usage (such as `<Image {...props} />`).


* Removes `layout` prop and adds `style`
* Removes `objectFit` prop and adds `style`
* Removes `objectPosition` prop and adds `style`
* Removes `lazyBoundary` prop
* Removes `lazyRoot` prop
* Changes next.config.js `loader` to "custom", removes `path`, and sets `loaderFile` to a new file.



```javascript
import Image from 'next/image'
import img from '../img.png'

function Page() {
  return <Image src={img} />
}

```


```javascript
import Image from 'next/image'
import img from '../img.png'

const css = { maxWidth: '100%', height: 'auto' }
function Page() {
  return <Image src={img} style={css} />
}

```


```javascript
import Image from 'next/image'
import img from '../img.png'

function Page() {
  return <Image src={img} layout="responsive" />
}

```


```javascript
import Image from 'next/image'
import img from '../img.png'

const css = { width: '100%', height: 'auto' }
function Page() {
  return <Image src={img} sizes="100vw" style={css} />
}

```


```javascript
import Image from 'next/image'
import img from '../img.png'

function Page() {
  return <Image src={img} layout="fill" />
}

```


```javascript
import Image from 'next/image'
import img from '../img.png'

function Page() {
  return <Image src={img} sizes="100vw" fill />
}

```


```javascript
import Image from 'next/image'
import img from '../img.png'

function Page() {
  return <Image src={img} layout="fixed" />
}

```


```javascript
import Image from 'next/image'
import img from '../img.png'

function Page() {
  return <Image src={img} />
}

```

Migrates a Create React App project to Next.js; creating a pages directory and necessary config to match behavior. Client-side only rendering is leveraged initially to prevent breaking compatibility due to `window` usage during SSR and can be enabled seamlessly to allow gradual adoption of Next.js specific features.


Please share any feedback related to this transform [in this discussion](https://github.com/vercel/next.js/discussions/25858).


Transforms files that do not import `React` to include the import in order for the new [React JSX transform](https://reactjs.org/blog/2020/09/22/introducing-the-new-jsx-transform.html) to work.


For example:



```javascript

export default class Home extends React.Component {
  render() {
    return <div>Hello World</div>
  }
}

```

Transforms into:



```javascript

import React from 'react'
export default class Home extends React.Component {
  render() {
    return <div>Hello World</div>
  }
}

```

Transforms anonymous components into named components to make sure they work with [Fast Refresh example:



```javascript

export default function () {
  return <div>Hello World</div>
}

```

Transforms into:



```javascript

export default function MyComponent() {
  return <div>Hello World</div>
}

```

The component will have a camel cased name based on the name of the file, and it also works with arrow functions.


Go to your project



```javascript
cd path-to-your-project/

```

Run the codemod:



```javascript
npx @next/codemod@latest name-default-component

```

Transforms the `withAmp` HOC into Next.js 9 page configuration.


For example:



```javascript

import { withAmp } from 'next/amp'

function Home() {
  return <h1>My AMP Page</h1>
}

export default withAmp(Home)

```


```javascript

export default function Home() {
  return <h1>My AMP Page</h1>
}

export const config = {
  amp: true,
}

```

Go to your project



```javascript
cd path-to-your-project/

```

Run the codemod:



```javascript
npx @next/codemod@latest withamp-to-config

```

Transforms the deprecated automatically injected `url` property on top level pages to using `withRouter` and the `router` property it injects. Read more here: https://nextjs.org/docs/messages/url-deprecated example:



```javascript

import React from 'react'
export default class extends React.Component {
  render() {
    const { pathname } = this.props.url
    return <div>Current pathname: {pathname}</div>
  }
}

```


```javascript

import React from 'react'
import { withRouter } from 'next/router'
export default withRouter(
  class extends React.Component {
    render() {
      const { pathname } = this.props.router
      return <div>Current pathname: {pathname}</div>
    }
  }
)

```

This is one case. All the cases that are transformed (and tested) can be found in the [`__testfixtures__` directory](https://github.com/vercel/next.js/tree/canary/packages/next-codemod/transforms/__testfixtures__/url-to-withrouter).


Go to your project



```javascript
cd path-to-your-project/

```

Run the codemod:



```javascript
npx @next/codemod@latest url-to-withrouter

```



