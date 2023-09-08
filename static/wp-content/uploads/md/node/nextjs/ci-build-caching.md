# Continuous Integration (CI) Build Caching


To improve build performance, Next.js saves a cache to `.next/cache` that is shared between builds.


To take advantage of this cache in Continuous Integration (CI) environments, your CI workflow will need to be configured to correctly persist the cache between builds.



> 
> If your CI is not configured to persist `.next/cache` between builds, you may see a [No Cache Detected error.
> 
> 
> 


Here are some example cache configurations for common CI providers:


Next.js caching is automatically configured for you. There's no action required on your part.


Edit your `save_cache` step in `.circleci/config.yml` to include `.next/cache`:



```javascript
steps:
  - save_cache:
      key: dependency-cache-{{ checksum "yarn.lock" }}
      paths:
        - ./node_modules
        - ./.next/cache

```

If you do not have a `save_cache` key, please follow CircleCI's [documentation on setting up build caching](https://circleci.com/docs/2.0/caching/).


Add or merge the following into your `.travis.yml`:



```javascript
cache:
  directories:
    - $HOME/.cache/yarn
    - node_modules
    - .next/cache

```

Add or merge the following into your `.gitlab-ci.yml`:



```javascript
cache:
  key: ${CI_COMMIT_REF_SLUG}
  paths:
    - node_modules/
    - .next/cache/

```

Use [Netlify Plugins](https://www.netlify.com/products/build/plugins/) with [`@netlify/plugin-nextjs`](https://www.npmjs.com/package/@netlify/plugin-nextjs).


Add (or merge in) the following to your `buildspec.yml`:



```javascript
cache:
  paths:
    - 'node_modules/**/*' 
    - '.next/cache/**/*' 

```

Using GitHub's [actions/cache](https://github.com/actions/cache), add the following step in your workflow file:



```javascript
uses: actions/cache@v3
with:
  
  path: |
 ~/.npm
 ${{ github.workspace }}/.next/cache
  
  key: ${{ runner.os }}-nextjs-${{ hashFiles('**/package-lock.json') }}-${{ hashFiles('**.[jt]s', '**.[jt]sx') }}
  
  restore-keys: |
 ${{ runner.os }}-nextjs-${{ hashFiles('**/package-lock.json') }}-

```

Add or merge the following into your `bitbucket-pipelines.yml` at the top level (same level as `pipelines`):



```javascript
definitions:
  caches:
    nextcache: .next/cache

```

Then reference it in the `caches` section of your pipeline's `step`:



```javascript
- step:
    name: your_step_name
    caches:
      - node
      - nextcache

```

Using Heroku's [custom cache](https://devcenter.heroku.com/articles/nodejs-support#custom-caching), add a `cacheDirectories` array in your top-level package.json:



```javascript
"cacheDirectories": [".next/cache"]

```

Using Azure Pipelines' [Cache task](https://docs.microsoft.com/en-us/azure/devops/pipelines/tasks/utility/cache), add the following task to your pipeline yaml file somewhere prior to the task that executes `next build`:



```javascript
- task: Cache@2
  displayName: 'Cache .next/cache'
  inputs:
    key: next | $(Agent.OS) | yarn.lock
    path: '$(System.DefaultWorkingDirectory)/.next/cache'

```



