# How to create a RESTful API with Prisma and Oak

[Prisma](https://prisma.io) has been one of our top requested modules to work
with in Deno. The demand is understandable, given that Prisma's developer
experience is top notch and plays well with so many persistent data storage
technologies.


We're excited to show you how to use Prisma with Deno.


In this How To guide, we'll setup a simple RESTful API in Deno using Oak and
Prisma.


Let's get started.


[View source](https://github.com/denoland/examples/tree/main/with-prisma) or
[check out the video guide](https://youtu.be/P8VzA_XSF8w).


## Setup the application

Let's create the folder `rest-api-with-prisma-oak` and navigate there:



```typescript
mkdir rest-api-with-prisma-oak
cd rest-api-with-prisma-oak
```
Then, let's run `prisma init` with Deno:



```typescript
deno run --allow-read --allow-env --allow-write npm:prisma@^4.5 init
```
This will generate
[`prisma/schema.prisma`](https://www.prisma.io/docs/concepts/components/prisma-schema).
Let's update it with the following:



```typescript
generator client {
  provider = "prisma-client-js"
  previewFeatures = ["deno"]
  output = "../generated/client"
}

datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}

model Dinosaur {
  id          Int     @id @default(autoincrement())
  name        String  @unique
  description String
}
```
Prisma should also have generated a `.env` file with `DATABASE_URL`. Let's
assign `DATABASE_URL` to a PostreSQL connection string. In this example, we'll
use a free [PostgreSQL database from Supabase](https://supabase.com/database).


Next, let's create the database schema:



```typescript
deno run -A npm:prisma@^4.5 db push
```
After that's complete, we'll need to generate a Prisma client for Data Proxy:



```typescript
deno run -A --unstable npm:prisma@^4.5 generate --data-proxy
```
## Setup Prisma Data Platform

In order to use Prisma Data Platform, we'll have to create and connect a GitHub
repo. So let's initialize the repository, create a new GitHub repo, add the
remote origin, and push the repo.


Next, sign up for a free
[Prisma Data Platform account](https://cloud.prisma.io/).


Click **New Project** and select **Import a Prisma Repository**.


It'll ask for your PostgreSQL connection string, which you have in your `.env`.
Paste it here. Then click **Create Project**.


You'll receive a new connection string that begins with `prisma://`. Let's grab
that and assign it to `DATABASE_URL` in your `.env` file, replacing your
PostgreSQL string from Supabase.


Next, let's create a seed script to seed the database.


## Seed your Database

Create `./prisma/seed.ts`:


And in `./prisma/seed.ts`:



```typescript
import { Prisma, PrismaClient } from "../generated/client/deno/edge.ts";
import { load } from "https://deno.land/std@0.181.0/dotenv/mod.ts";

const envVars = await load();

const prisma = new PrismaClient({
  datasources: {
    db: {
      url: envVars.DATABASE_URL,
    },
  },
});

const dinosaurData: Prisma.DinosaurCreateInput[] = [
  {
    name: "Aardonyx",
    description: "An early stage in the evolution of sauropods.",
  },
  {
    name: "Abelisaurus",
    description: "Abel's lizard has been reconstructed from a single skull.",
  },
  {
    name: "Acanthopholis",
    description: "No, it's not a city in Greece.",
  },
];



for (const u of dinosaurData) {
  const dinosaur = await prisma.dinosaur.create({
    data: u,
  });
  console.log(`Created dinosaur with id: ${dinosaur.id}`);
}
console.log(`Seeding finished.`);

await prisma.$disconnect();
```
We can now run `seed.ts` with:



```typescript
deno run -A prisma/seed.ts
```
After doing so, your Prisma dashboard should show the new dinosaurs:


![New dinosaurs are in Prisma dashboard](https://cdn.deno.land/manual/versions/v1.32.1/raw/images/how-to/prisma/1-dinosaurs-in-prisma.png)


## Create your API routes

We'll use [`oak`](https://deno.land/x/oak) to create the API routes. Let's keep
them simple for now.


Let's create a `main.ts` file:


Then, in your `main.ts` file:



```typescript
import { PrismaClient } from "./generated/client/deno/edge.ts";
import { Application, Router } from "https://deno.land/x/oak@v11.1.0/mod.ts";
import { load } from "https://deno.land/std@0.181.0/dotenv/mod.ts";

const envVars = await load();



const prisma = new PrismaClient({
  datasources: {
    db: {
      url: envVars.DATABASE_URL,
    },
  },
});
const app = new Application();
const router = new Router();



router
  .get("/", (context) => {
    context.response.body = "Welcome to the Dinosaur API!";
  })
  .get("/dinosaur", async (context) => {
    
    const dinosaurs = await prisma.dinosaur.findMany();
    context.response.body = dinosaurs;
  })
  .get("/dinosaur/:id", async (context) => {
    
    const { id } = context.params;
    const dinosaur = await prisma.dinosaur.findUnique({
      where: {
        id: Number(id),
      },
    });
    context.response.body = dinosaur;
  })
  .post("/dinosaur", async (context) => {
    
    const { name, description } = await context.request.body("json").value;
    const result = await prisma.dinosaur.create({
      data: {
        name,
        description,
      },
    });
    context.response.body = result;
  })
  .delete("/dinosaur/:id", async (context) => {
    
    const { id } = context.params;
    const dinosaur = await prisma.dinosaur.delete({
      where: {
        id: Number(id),
      },
    });
    context.response.body = dinosaur;
  });



app.use(router.routes());
app.use(router.allowedMethods());



await app.listen({ port: 8000 });
```
Now, let's run it:


Let's visit `localhost:8000/dinosaurs`:


![List of all dinosaurs from REST API](https://cdn.deno.land/manual/versions/v1.32.1/raw/images/how-to/prisma/2-dinosaurs-from-api.png)


Next, let's `POST` a new user with this `curl` command:



```typescript
curl -X POST http://localhost:8000/dinosaur -H "Content-Type: application/json" -d '{"name": "Deno", "description":"The fastest, most secure, easiest to use Dinosaur ever to walk the Earth."}'
```
And in your Prisma dashboard, you should see a new row:


![New dinosaur Deno in Prisma](https://cdn.deno.land/manual/versions/v1.32.1/raw/images/how-to/prisma/3-new-dinosaur-in-prisma.png)


Nice!


## What's next?

Building your next app will be more productive and fun with Deno and Prisma,
since both technologies deliver an intuitive developer experience with data
modeling, type-safety, and robust IDE support.


If you're interested in connecting Prisma to Deno Deploy,
[check out this awesome guide](https://www.prisma.io/docs/guides/deployment/deployment-guides/deploying-to-deno-deploy).





