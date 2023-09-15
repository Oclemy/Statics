# Prisma Utilities



### `enhancePrisma(PrismaClient)`

`enhancePrisma` is a little wrapper that makes integration with Blitz apps
a bit nicer.

* It ensures you only have one instance of Prisma Client in your
application to reduce the number of database connections. But in
serverless deployment, you will still have one instance per serverless
function.
* It ensures Prisma client is not used in your client bundle.
* It adds a `db.$reset() => Promise<void>` function for use in tests like
this:
```typescript
beforeEach(async () => {
  await db.$reset()
})
```
* It automatically closes the database connection at the end of your tests
if you are using [the Blitz vitest preset](./testing)

#### Example Usage


```typescript
import { enhancePrisma } from "blitz"
import { PrismaClient } from "@prisma/client"

const EnhancedPrisma = enhancePrisma(PrismaClient)

export \* from "@prisma/client"
export default new EnhancedPrisma()
```


---

