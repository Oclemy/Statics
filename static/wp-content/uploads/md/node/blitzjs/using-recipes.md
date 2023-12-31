# Using Recipes



Blitz Recipes allow you to install and configure third-party code with a
single command!

**[View the list of official recipes](https://github.com/blitz-js/blitz/tree/canary/recipes).**

* ✅ One command: `blitz install [recipe name]`
* ✅ Write your own [custom recipes](writing-recipes)

Blitz Recipes are predefined formulas for adding npm dependencies or other
code to your application. We've taken inspiration from
[Gatsby Recipes](https://www.gatsbyjs.org/docs/recipes/) (and are very
appreciative of their help in the ideation phase for our own
implementation) to improve on the existing flow of adding third-party
dependencies to an application.

Installing third-party code can often be very complex with multiple steps
to get setup, and Blitz Recipes help cut down on those extra steps. If you
are familiar with the official Next.js examples, Recipes are our
replacement for that. To integrate a third-party library, run one command
instead of having to look up an example integration.


```typescript
> blitz install tailwind

✅ Installed 2 dependencies
✅ Successfully created postcss.config.js, tailwind.config.js
✅ Successfully created app/styles/button.css, app/styles/index.css
✅ Modified 1 file: app/pages/_app.tsx

🎉 The recipe for Tailwind CSS completed successfully! Its functionality is now fully configured in your Blitz app.
```
### How To Install a Recipe

The full list of Blitz Recipes can be found in the
[GitHub repository](https://github.com/blitz-js/blitz/tree/canary/recipes).
The name of the recipe is the directory that contains the code. Take the
name of the recipe you'd like to install, pass it to
[`blitz install`](cli-install), and the installer will guide you through
the process, providing you with an explanation for the changes along the
way. For example, in the recipes directory today you'll see a recipe for
`tailwind`, which installs [Tailwind CSS](https://tailwindcss.com/).
Executing `blitz install tailwind` is all it takes to get up and running,
and you can let Blitz do the rest.

One of the best parts about recipes is that they're unversioned and pulled
straight from GitHub. As soon as we make an update to a recipe and merge
the changes on GitHub, it's available for you to execute. The same goes
for [custom recipes](writing-recipes).



---

