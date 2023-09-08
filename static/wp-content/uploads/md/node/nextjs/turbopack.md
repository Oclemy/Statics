# Turbopack (alpha)


[Turbopack](https://turbo.build/pack) is an incremental bundler optimized for JavaScript and TypeScript, written in Rust, and built into Next.js 13.


On large applications, Turbopack updates 700x faster than Webpack.


Turbopack can be used in Next.js 13 in both the `pages` and `app` directories:


1. Create a Next.js 13 project with Turbopack



```javascript
npx create-next-app@latest --example with-turbopack

```

2. Start the Next.js development server (with Turbopack)



```javascript
next dev --turbo

```

To learn more about the currently supported features for Turbopack, view the [documentation](https://turbo.build/pack/docs/features).




