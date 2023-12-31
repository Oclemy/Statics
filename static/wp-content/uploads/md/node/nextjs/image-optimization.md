# Image Component and Image Optimization



**Examples**

The Next.js Image component, `next/image` is an extension of the HTML `<img>` element, evolved for the modern web. It includes a variety of built-in performance optimizations to help you achieve good [Core Web Vitals These scores are an important measurement of user experience on your website, and are [factored into Google's search rankings of the optimizations built into the Image component include:


* **Improved Performance:** Always serve correctly sized image for each device, using modern image formats
* **Visual Stability:** Prevent [Cumulative Layout Shift automatically
* **Faster Page Loads:** Images are only loaded when they enter the viewport, with optional blur-up placeholders
* **Asset Flexibility:** On-demand image resizing, even for images stored on remote servers


To add an image to your application, import the `next/image` component:



```javascript
import Image from 'next/image'

```

Now, you can define the `src` for your image (either local or remote).


To use a local image, `import` your `.jpg`, `.png`, or `.webp` files:



```javascript
import profilePic from '../public/me.png'

```

Dynamic `await import()` or `require()` are *not* supported. The `import` must be static so it can be analyzed at build time.


Next.js will automatically determine the `width` and `height` of your image based on the imported file. These values are used to prevent [Cumulative Layout Shift while your image is loading.



```javascript
import Image from 'next/image'
import profilePic from '../public/me.png'

function Home() {
  return (
    <>
      <h1>My Homepage</h1>
      <Image
        src={profilePic}
        alt="Picture of the author"
        
        
        
        
      />
      <p>Welcome to my homepage!</p>
    </>
  )
}

```

To use a remote image, the `src` property should be a URL string, which can be relative or absolute Because Next.js does not have access to remote files during the build process, you'll need to provide the `width` `height` and optional `blurDataURL` props manually:



```javascript
import Image from 'next/image'

export default function Home() {
  return (
    <>
 <h1>My Homepage</h1>
 <Image
 src="/me.png"
 alt="Picture of the author"
 width={500}
 height={500}
 />
 <p>Welcome to my homepage!</p>
 </>
  )
}

```


> 
> Learn more about the [sizing requirements in `next/image`.
> 
> 
> 


Sometimes you may want to optimize a remote image, but still use the built-in Next.js Image Optimization API. To do this, leave the `loader` at its default setting and enter an absolute URL for the Image `src` prop.


To protect your application from malicious users, you must define a list of remote hostnames you intend to use with the `next/image` component.



> 
> Learn more about `remotePatterns` configuration.
> 
> 
> 


Note that in the [example earlier a partial URL (`"/me.png"`) is provided for a remote image. This is possible because of the loader architecture.


A loader is a function that generates the URLs for your image. It modifies the provided `src`, and generates multiple URLs to request the image at different sizes. These multiple URLs are used in the automatic srcset generation, so that visitors to your site will be served an image that is the right size for their viewport.


The default loader for Next.js applications uses the built-in Image Optimization API, which optimizes images from anywhere on the web, and then serves them directly from the Next.js web server. If you would like to serve your images directly from a CDN or image server, you can write your own loader function with a few lines of JavaScript.


You can define a loader per-image with the [`loader` prop or at the application level with the [`loaderFile` configuration should add the `priority` property to the image that will be the [Largest Contentful Paint (LCP) element](https://web.dev/lcp/#what-elements-are-considered) for each page. Doing so allows Next.js to specially prioritize the image for loading (e.g. through preload tags or priority hints), leading to a meaningful boost in LCP.


The LCP element is typically the largest image or text block visible within the viewport of the page. When you run `next dev`, you'll see a console warning if the LCP element is an `<Image>` without the `priority` property.


Once you've identified the LCP image, you can add the property like this:



```javascript
import Image from 'next/image'

export default function Home() {
  return (
    <>
 <h1>My Homepage</h1>
 <Image
 src="/me.png"
 alt="Picture of the author"
 width={500}
 height={500}
 priority
 />
 <p>Welcome to my homepage!</p>
 </>
  )
}

```

See more about priority in the [`next/image` component documentation of the ways that images most commonly hurt performance is through *layout shift*, where the image pushes other elements around on the page as it loads in. This performance problem is so annoying to users that it has its own Core Web Vital, called [Cumulative Layout Shift](https://web.dev/cls/). The way to avoid image-based layout shifts is to [always size your images](https://web.dev/optimize-cls/#images-without-dimensions). This allows the browser to reserve precisely enough space for the image before it loads.


Because `next/image` is designed to guarantee good performance results, it cannot be used in a way that will contribute to layout shift, and **must** be sized in one of three ways:


1. Automatically, using a [static import Explicitly, by including a `width` and `height` property
3. Implicitly, by using fill which causes the image to expand to fill its parent element.



> 
> If you are accessing images from a source without knowledge of the images' sizes, there are several things you can do:
> 
> 
> **Use `fill`**
> 
> 
> The `fill` prop allows your image to be sized by its parent element. Consider using CSS to give the image's parent element space on the page along `sizes` prop to match any media query break points. You can also use `object-fit` with `fill`, `contain`, or `cover`, and `object-position` to define how the image should occupy that space.
> 
> 
> **Normalize your images**
> 
> 
> If you're serving images from a source that you control, consider modifying your image pipeline to normalize the images to a specific size.
> 
> 
> **Modify your API calls**
> 
> 
> If your application is retrieving image URLs using an API call (such as to a CMS), you may be able to modify the API call to return the image dimensions along with the URL.
> 
> 
> 


If none of the suggested methods works for sizing your images, the `next/image` component is designed to work well on a page alongside standard `<img>` elements.


Styling the Image component is similar to styling a normal `<img>` element, but there are a few guidelines to keep in mind:


**Use `className` or `style`, not `styled-jsx`**


In most cases, we recommend using the `className` prop. This can be an imported [CSS Module a [global stylesheet etc.


You can also use the `style` prop to assign inline styles.


You cannot use styled-jsx because it's scoped to the current component (unless you mark the style as `global`).


**When using `fill`, the parent element must have `position: relative`**


This is necessary for the proper rendering of the image element in that layout mode.


**When using `fill`, the parent element must have `display: block`**


This is the default for `<div>` elements but should be specified otherwise.


[**View all properties available to the `next/image` component.** examples of the Image component used with the various styles, see the [Image Component Demo](https://image-component.nextjs.gallery).


The `next/image` component and Next.js Image Optimization API can be configured in the [`next.config.js` file These configurations allow you to [enable remote images [define custom image breakpoints [change caching behavior and more.


[**Read the full image configuration documentation for more information.** more information on what to do next, we recommend the following sections:





