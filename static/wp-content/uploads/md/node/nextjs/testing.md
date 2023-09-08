# Testing



**Examples**

Learn how to set up Next.js with commonly used testing tools: Cypress Playwright and [Jest with React Testing Library is a test runner used for **End-to-End (E2E)** and **Integration Testing**.


You can use `create-next-app` with the [with-cypress example](https://github.com/vercel/next.js/tree/canary/examples/with-cypress) to quickly get started.



```javascript
npx create-next-app@latest --example with-cypress with-cypress-app

```

To get started with Cypress, install the `cypress` package:



```javascript
npm install --save-dev cypress

```

Add Cypress to the `package.json` scripts field:



```javascript
"scripts": {
  "dev": "next dev",
  "build": "next build",
  "start": "next start",
  "cypress": "cypress open",
}

```

Run Cypress for the first time to generate examples that use their recommended folder structure:



```javascript
npm run cypress

```

You can look through the generated examples and the [Writing Your First Test](https://docs.cypress.io/guides/getting-started/writing-your-first-test) section of the Cypress Documentation to help you get familiar with Cypress.


Assuming the following two Next.js pages:



```javascript

import Link from 'next/link'

export default function Home() {
  return (
    <nav>
 <Link href="/about">About</Link>
 </nav>
  )
}

```


```javascript

export default function About() {
  return (
    <div>
 <h1>About Page</h1>
 </div>
  )
}

```

Add a test to check your navigation is working correctly:



```javascript


describe('Navigation', () => {
  it('should navigate to the about page', () => {
    
    cy.visit('http://localhost:3000/')

    
    cy.get('a[href*="about"]').click()

    
    cy.url().should('include', '/about')

    
    cy.get('h1').contains('About Page')
  })
})

```

You can use `cy.visit("/")` instead of `cy.visit("http://localhost:3000/")` if you add `baseUrl: 'http://localhost:3000'` to the `cypress.config.js` configuration file.


Since Cypress is testing a real Next.js application, it requires the Next.js server to be running prior to starting Cypress. We recommend running your tests against your production code to more closely resemble how your application will behave.


Run `npm run build` and `npm run start`, then run `npm run cypress` in another terminal window to start Cypress.



> 
> **Note:** Alternatively, you can install the `start-server-and-test` package and add it to the `package.json` scripts field: `"test": "start-server-and-test start http://localhost:3000 cypress"` to start the Next.js production server in conjunction with Cypress. Remember to rebuild your application after new changes.
> 
> 
> 


You will have noticed that running Cypress so far has opened an interactive browser which is not ideal for CI environments. You can also run Cypress headlessly using the `cypress run` command:



```javascript


"scripts": {
  
  "cypress": "cypress open",
  "cypress:headless": "cypress run",
  "e2e": "start-server-and-test start http://localhost:3000 cypress",
  "e2e:headless": "start-server-and-test start http://localhost:3000 cypress:headless"
}

```

You can learn more about Cypress and Continuous Integration from these resources:


Playwright is a testing framework that lets you automate Chromium, Firefox, and WebKit with a single API. You can use it to write **End-to-End (E2E)** and **Integration** tests across all platforms.


The fastest way to get started is to use `create-next-app` with the [with-playwright example](https://github.com/vercel/next.js/tree/canary/examples/with-playwright). This will create a Next.js project complete with Playwright all set up.



```javascript
npx create-next-app@latest --example with-playwright with-playwright-app

```

You can also use `npm init playwright` to add Playwright to an existing `NPM` project.


To manually get started with Playwright, install the `@playwright/test` package:



```javascript
npm install --save-dev @playwright/test

```

Add Playwright to the `package.json` scripts field:



```javascript
"scripts": {
  "dev": "next dev",
  "build": "next build",
  "start": "next start",
  "test:e2e": "playwright test",
}

```

Assuming the following two Next.js pages:



```javascript

import Link from 'next/link'

export default function Home() {
  return (
    <nav>
 <Link href="/about">About</Link>
 </nav>
  )
}

```


```javascript

export default function About() {
  return (
    <div>
 <h1>About Page</h1>
 </div>
  )
}

```

Add a test to verify that your navigation is working correctly:



```javascript


import { test, expect } from '@playwright/test'

test('should navigate to the about page', async ({ page }) => {
  
  await page.goto('http://localhost:3000/')
  
  await page.click('text=About')
  
  await expect(page).toHaveURL('http://localhost:3000/about')
  
  await expect(page.locator('h1')).toContainText('About Page')
})

```

You can use `page.goto("/")` instead of `page.goto("http://localhost:3000/")`, if you add [`"baseURL": "http://localhost:3000"`](https://playwright.dev/docs/api/class-testoptions#test-options-base-url) to the `playwright.config.ts` configuration file.


Since Playwright is testing a real Next.js application, it requires the Next.js server to be running prior to starting Playwright. It is recommended to run your tests against your production code to more closely resemble how your application will behave.


Run `npm run build` and `npm run start`, then run `npm run test:e2e` in another terminal window to run the Playwright tests.



> 
> **Note:** Alternatively, you can use the `webServer` feature to let Playwright start the development server and wait until it's fully available.
> 
> 
> 


Playwright will by default run your tests in the [headless mode](https://playwright.dev/docs/ci#running-headed). To install all the Playwright dependencies, run `npx playwright install-deps`.


You can learn more about Playwright and Continuous Integration from these resources:


Jest and React Testing Library are frequently used together for **Unit Testing**. There are three ways you can start using Jest within your Next.js application:


1. Using one of our [quickstart examples With the [Next.js Rust Compiler With Babel following sections will go through how you can set up Jest with each of these options:


You can use `create-next-app` with the with-jest example to quickly get started with Jest and React Testing Library:



```javascript
npx create-next-app@latest --example with-jest with-jest-app

```

Since the release of [Next.js 12 Next.js now has built-in configuration for Jest.


To set up Jest, install `jest`, `jest-environment-jsdom`, `@testing-library/react`, `@testing-library/jest-dom`:



```javascript
npm install --save-dev jest jest-environment-jsdom @testing-library/react @testing-library/jest-dom

```

Create a `jest.config.js` file in your project's root directory and add the following:



```javascript

const nextJest = require('next/jest')

const createJestConfig = nextJest({
  
  dir: './',
})



const customJestConfig = {
  
  
  
  moduleDirectories: ['node_modules', '<rootDir>/'],

  
  
  
  

  moduleNameMapper: {
    '@/(.*)$': '<rootDir>/src/$1',
  },
  testEnvironment: 'jest-environment-jsdom',
}


module.exports = createJestConfig(customJestConfig)

```

Under the hood, `next/jest` is automatically configuring Jest for you, including:


* Setting up `transform` using SWC Auto mocking stylesheets (`.css`, `.module.css`, and their scss variants), image imports and `@next/font` Loading `.env` (and all variants) into `process.env`
* Ignoring `node_modules` from test resolving and transforms
* Ignoring `.next` from test resolving
* Loading `next.config.js` for flags that enable SWC transforms



> 
> **Note**: To test environment variables directly, load them manually in a separate setup script or in your `jest.config.js` file. For more information, please see [Test Environment Variables 
> 
> 


If you opt out of the [Rust Compiler you will need to manually configure Jest and install `babel-jest` and `identity-obj-proxy` in addition to the packages above.


Here are the recommended options to configure Jest for Next.js:



```javascript

module.exports = {
  collectCoverage: true,
  
  coverageProvider: 'v8',
  collectCoverageFrom: [
    '**/*.{js,jsx,ts,tsx}',
    '!**/*.d.ts',
    '!**/node_modules/**',
    '!<rootDir>/out/**',
    '!<rootDir>/.next/**',
    '!<rootDir>/*.config.js',
    '!<rootDir>/coverage/**',
  ],
  moduleNameMapper: {
    
    
    '^.+.module.(css|sass|scss)$': 'identity-obj-proxy',

    
    '^.+.(css|sass|scss)$': '<rootDir>/__mocks__/styleMock.js',

    
    
    '^.+.(png|jpg|jpeg|gif|webp|avif|ico|bmp|svg)$/i': `<rootDir>/__mocks__/fileMock.js`,

    
    '^@/components/(.*)$': '<rootDir>/components/$1',
  },
  
  
  testPathIgnorePatterns: ['<rootDir>/node_modules/', '<rootDir>/.next/'],
  testEnvironment: 'jsdom',
  transform: {
    
    
    '^.+.(js|jsx|ts|tsx)$': ['babel-jest', { presets: ['next/babel'] }],
  },
  transformIgnorePatterns: [
    '/node_modules/',
    '^.+.module.(css|sass|scss)$',
  ],
}

```

You can learn more about each configuration option in the [Jest docs](https://jestjs.io/docs/configuration).


**Handling stylesheets and image imports**


Stylesheets and images aren't used in the tests but importing them may cause errors, so they will need to be mocked. Create the mock files referenced in the configuration above - `fileMock.js` and `styleMock.js` - inside a `__mocks__` directory:



```javascript

module.exports = {
  src: '/img.jpg',
  height: 24,
  width: 24,
  blurDataURL: 'data:image/png;base64,imagedata',
}

```


```javascript

module.exports = {}

```

For more information on handling static assets, please refer to the [Jest Docs](https://jestjs.io/docs/webpack#handling-static-assets).


**Optional: Extend Jest with custom matchers**


`@testing-library/jest-dom` includes a set of convenient [custom matchers](https://github.com/testing-library/jest-dom#custom-matchers) such as `.toBeInTheDocument()` making it easier to write tests. You can import the custom matchers for every test by adding the following option to the Jest configuration file:



```javascript

setupFilesAfterEnv: ['<rootDir>/jest.setup.js']

```

Then, inside `jest.setup.js`, add the following import:



```javascript

import '@testing-library/jest-dom/extend-expect'

```

If you need to add more setup options before each test, it's common to add them to the `jest.setup.js` file above.


**Optional: Absolute Imports and Module Path Aliases**


If your project is using [Module Path Aliases you will need to configure Jest to resolve the imports by matching the paths option in the `jsconfig.json` file with the `moduleNameMapper` option in the `jest.config.js` file. For example:



```javascript

{
  "compilerOptions": {
    "baseUrl": ".",
    "paths": {
      "@/components/*": ["components/*"]
    }
  }
}

```


```javascript

moduleNameMapper: {
  '^@/components/(.*)$': '<rootDir>/components/$1',
}

```

**Add a test script to package.json**


Add the Jest executable in watch mode to the `package.json` scripts:



```javascript
"scripts": {
  "dev": "next dev",
  "build": "next build",
  "start": "next start",
  "test": "jest --watch"
}

```

`jest --watch` will re-run tests when a file is changed. For more Jest CLI options, please refer to the [Jest Docs](https://jestjs.io/docs/cli#reference).


**Create your first tests**


Your project is now ready to run tests. Follow Jest's convention by adding tests to the `__tests__` folder in your project's root directory.


For example, we can add a test to check if the `<Home />` component successfully renders a heading:



```javascript


import { render, screen } from '@testing-library/react'
import Home from '../pages/index'
import '@testing-library/jest-dom'

describe('Home', () => {
  it('renders a heading', () => {
    render(<Home />)

    const heading = screen.getByRole('heading', {
      name: /welcome to next.js!/i,
    })

    expect(heading).toBeInTheDocument()
  })
})

```

Optionally, add a [snapshot test](https://jestjs.io/docs/snapshot-testing) to keep track of any unexpected changes to your `<Home />` component:



```javascript


import { render } from '@testing-library/react'
import Home from '../pages/index'

it('renders homepage unchanged', () => {
  const { container } = render(<Home />)
  expect(container).toMatchSnapshot()
})

```


> 
> **Note**: Test files should not be included inside the pages directory because any files inside the pages directory are considered routes.
> 
> 
> 


**Running your test suite**


Run `npm run test` to run your test suite. After your tests pass or fail, you will notice a list of interactive Jest commands that will be helpful as you add more tests.


For further reading, you may find these resources helpful:


The Next.js community has created packages and articles you may find helpful:


For more information on what to read next, we recommend:





