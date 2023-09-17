
# First Steps


The simplest FastAPI file could look like this:



```python
from fastapi import FastAPI

app = FastAPI()


@app.get("/")
async def root():
    return {"message": "Hello World"}

```

Copy that to a file `main.py`.


Run the live server:




```python
$ uvicorn main:app --reload

<span style="color: green;">INFO</span>: Uvicorn running on http://127.0.0.1:8000 (Press CTRL+C to quit)
<span style="color: green;">INFO</span>: Started reloader process [28720]
<span style="color: green;">INFO</span>: Started server process [28722]
<span style="color: green;">INFO</span>: Waiting for application startup.
<span style="color: green;">INFO</span>: Application startup complete.

```



Note


The command `uvicorn main:app` refers to:


* `main`: the file `main.py` (the Python "module").
* `app`: the object created inside of `main.py` with the line `app = FastAPI()`.
* `--reload`: make the server restart after code changes. Only use for development.



In the output, there's a line with something like:



```python
INFO:     Uvicorn running on http://127.0.0.1:8000 (Press CTRL+C to quit)

```

That line shows the URL where your app is being served, in your local machine.


### Check it


Open your browser at <http://127.0.0.1:8000>.


You will see the JSON response as:



```python
{"message": "Hello World"}

```

### Interactive API docs


Now go to <http://127.0.0.1:8000/docs>.


You will see the automatic interactive API documentation (provided by Swagger UI):


![Swagger UI](https://fastapi.tiangolo.com/img/index/index-01-swagger-ui-simple.png)


### Alternative API docs


And now, go to <http://127.0.0.1:8000/redoc>.


You will see the alternative automatic documentation (provided by ReDoc):


![ReDoc](https://fastapi.tiangolo.com/img/index/index-02-redoc-simple.png)


### OpenAPI


**FastAPI** generates a "schema" with all your API using the **OpenAPI** standard for defining APIs.


#### "Schema"


A "schema" is a definition or description of something. Not the code that implements it, but just an abstract description.


#### API "schema"


In this case, OpenAPI is a specification that dictates how to define a schema of your API.


This schema definition includes your API paths, the possible parameters they take, etc.


#### Data "schema"


The term "schema" might also refer to the shape of some data, like a JSON content.


In that case, it would mean the JSON attributes, and data types they have, etc.


#### OpenAPI and JSON Schema


OpenAPI defines an API schema for your API. And that schema includes definitions (or "schemas") of the data sent and received by your API using **JSON Schema**, the standard for JSON data schemas.


#### Check the `openapi.json`


If you are curious about how the raw OpenAPI schema looks like, FastAPI automatically generates a JSON (schema) with the descriptions of all your API.


You can see it directly at: <http://127.0.0.1:8000/openapi.json>.


It will show a JSON starting with something like:



```python
{
 "openapi": "3.1.0",
 "info": {
 "title": "FastAPI",
 "version": "0.1.0"
 },
 "paths": {
 "/items/": {
 "get": {
 "responses": {
 "200": {
 "description": "Successful Response",
 "content": {
 "application/json": {



...

```

#### What is OpenAPI for


The OpenAPI schema is what powers the two interactive documentation systems included.


And there are dozens of alternatives, all based on OpenAPI. You could easily add any of those alternatives to your application built with **FastAPI**.


You could also use it to generate code automatically, for clients that communicate with your API. For example, frontend, mobile or IoT applications.


## Recap, step by step


### Step 1: import `FastAPI`



```python
from fastapi import FastAPI

app = FastAPI()


@app.get("/")
async def root():
    return {"message": "Hello World"}

```

`FastAPI` is a Python class that provides all the functionality for your API.



Technical Details


`FastAPI` is a class that inherits directly from `Starlette`.


You can use all the Starlette functionality with `FastAPI` too.



### Step 2: create a `FastAPI` "instance"



```python
from fastapi import FastAPI

app = FastAPI()


@app.get("/")
async def root():
    return {"message": "Hello World"}

```

Here the `app` variable will be an "instance" of the class `FastAPI`.


This will be the main point of interaction to create all your API.


This `app` is the same one referred by `uvicorn` in the command:




```python
$ uvicorn main:app --reload

<span style="color: green;">INFO</span>: Uvicorn running on http://127.0.0.1:8000 (Press CTRL+C to quit)

```


If you create your app like:



```python
from fastapi import FastAPI

my_awesome_api = FastAPI()


@my_awesome_api.get("/")
async def root():
    return {"message": "Hello World"}

```

And put it in a file `main.py`, then you would call `uvicorn` like:




```python
$ uvicorn main:my_awesome_api --reload

<span style="color: green;">INFO</span>: Uvicorn running on http://127.0.0.1:8000 (Press CTRL+C to quit)

```


### Step 3: create a *path operation*


#### Path


"Path" here refers to the last part of the URL starting from the first `/`.


So, in a URL like:



```python
https://example.com/items/foo

```

...the path would be:



Info


A "path" is also commonly called an "endpoint" or a "route".



While building an API, the "path" is the main way to separate "concerns" and "resources".


#### Operation


"Operation" here refers to one of the HTTP "methods".


One of:


...and the more exotic ones:


In the HTTP protocol, you can communicate to each path using one (or more) of these "methods".




---


When building APIs, you normally use these specific HTTP methods to perform a specific action.


Normally you use:


* `POST`: to create data.
* `GET`: to read data.
* `PUT`: to update data.
* `DELETE`: to delete data.


So, in OpenAPI, each of the HTTP methods is called an "operation".


We are going to call them "**operations**" too.


#### Define a *path operation decorator*



```python
from fastapi import FastAPI

app = FastAPI()


@app.get("/")
async def root():
    return {"message": "Hello World"}

```

The `@app.get("/")` tells **FastAPI** that the function right below is in charge of handling requests that go to:


* the path `/`
* using a `get` operation



`@decorator` Info


That `@something` syntax in Python is called a "decorator".


You put it on top of a function. Like a pretty decorative hat (I guess that's where the term came from).


A "decorator" takes the function below and does something with it.


In our case, this decorator tells **FastAPI** that the function below corresponds to the **path** `/` with an **operation** `get`.


It is the "**path operation decorator**".



You can also use the other operations:


* `@app.post()`
* `@app.put()`
* `@app.delete()`


And the more exotic ones:


* `@app.options()`
* `@app.head()`
* `@app.patch()`
* `@app.trace()`



Tip


You are free to use each operation (HTTP method) as you wish.


**FastAPI** doesn't enforce any specific meaning.


The information here is presented as a guideline, not a requirement.


For example, when using GraphQL you normally perform all the actions using only `POST` operations.



### Step 4: define the **path operation function**


This is our "**path operation function**":


* **path**: is `/`.
* **operation**: is `get`.
* **function**: is the function below the "decorator" (below `@app.get("/")`).



```python
from fastapi import FastAPI

app = FastAPI()


@app.get("/")
async def root():
    return {"message": "Hello World"}

```

This is a Python function.


It will be called by **FastAPI** whenever it receives a request to the URL "`/`" using a `GET` operation.


In this case, it is an `async` function.




---


You could also define it as a normal function instead of `async def`:



```python
from fastapi import FastAPI

app = FastAPI()


@app.get("/")
def root():
    return {"message": "Hello World"}

```

### Step 5: return the content



```python
from fastapi import FastAPI

app = FastAPI()


@app.get("/")
async def root():
 return {"message": "Hello World"}

```

You can return a `dict`, `list`, singular values as `str`, `int`, etc.


You can also return Pydantic models (you'll see more about that later).


There are many other objects and models that will be automatically converted to JSON (including ORMs, etc). Try using your favorite ones, it's highly probable that they are already supported.


## Recap


* Import `FastAPI`.
* Create an `app` instance.
* Write a **path operation decorator** (like `@app.get("/")`).
* Write a **path operation function** (like `def root(): ...` above).
* Run the development server (like `uvicorn main:app --reload`).




# Security - First Steps


Let's imagine that you have your **backend** API in some domain.


And you have a **frontend** in another domain or in a different path of the same domain (or in a mobile application).


And you want to have a way for the frontend to authenticate with the backend, using a **username** and **password**.


We can use **OAuth2** to build that with **FastAPI**.


But let's save you the time of reading the full long specification just to find those little pieces of information you need.


Let's use the tools provided by **FastAPI** to handle security.


## How it looks


Let's first just use the code and see how it works, and then we'll come back to understand what's happening.


## Create `main.py`


Copy the example in a file `main.py`:


## Run it



Info


First install `python-multipart`.


E.g. `pip install python-multipart`.


This is because **OAuth2** uses "form data" for sending the `username` and `password`.



Run the example with:




```python
$ uvicorn main:app --reload

<span style="color: green;">INFO</span>: Uvicorn running on http://127.0.0.1:8000 (Press CTRL+C to quit)

```


## Check it


Go to the interactive docs at: <http://127.0.0.1:8000/docs>.


You will see something like this:


![](/img/tutorial/security/image01.png)



Authorize button!


You already have a shiny new "Authorize" button.


And your *path operation* has a little lock in the top-right corner that you can click.



And if you click it, you have a little authorization form to type a `username` and `password` (and other optional fields):


![](/img/tutorial/security/image02.png)



Note


It doesn't matter what you type in the form, it won't work yet. But we'll get there.



This is of course not the frontend for the final users, but it's a great automatic tool to document interactively all your API.


It can be used by the frontend team (that can also be yourself).


It can be used by third party applications and systems.


And it can also be used by yourself, to debug, check and test the same application.


## The `password` flow


Now let's go back a bit and understand what is all that.


The `password` "flow" is one of the ways ("flows") defined in OAuth2, to handle security and authentication.


OAuth2 was designed so that the backend or API could be independent of the server that authenticates the user.


But in this case, the same **FastAPI** application will handle the API and the authentication.


So, let's review it from that simplified point of view:


* The user types the `username` and `password` in the frontend, and hits `Enter`.
* The frontend (running in the user's browser) sends that `username` and `password` to a specific URL in our API (declared with `tokenUrl="token"`).
* The API checks that `username` and `password`, and responds with a "token" (we haven't implemented any of this yet).
	+ A "token" is just a string with some content that we can use later to verify this user.
	+ Normally, a token is set to expire after some time.
		- So, the user will have to log in again at some point later.
		- And if the token is stolen, the risk is less. It is not like a permanent key that will work forever (in most of the cases).
* The frontend stores that token temporarily somewhere.
* The user clicks in the frontend to go to another section of the frontend web app.
* The frontend needs to fetch some more data from the API.
	+ But it needs authentication for that specific endpoint.
	+ So, to authenticate with our API, it sends a header `Authorization` with a value of `Bearer` plus the token.
	+ If the token contains `foobar`, the content of the `Authorization` header would be: `Bearer foobar`.


## **FastAPI**'s `OAuth2PasswordBearer`


**FastAPI** provides several tools, at different levels of abstraction, to implement these security features.


In this example we are going to use **OAuth2**, with the **Password** flow, using a **Bearer** token. We do that using the `OAuth2PasswordBearer` class.



Info


A "bearer" token is not the only option.


But it's the best one for our use case.


And it might be the best for most use cases, unless you are an OAuth2 expert and know exactly why there's another option that suits better your needs.


In that case, **FastAPI** also provides you with the tools to build it.



When we create an instance of the `OAuth2PasswordBearer` class we pass in the `tokenUrl` parameter. This parameter contains the URL that the client (the frontend running in the user's browser) will use to send the `username` and `password` in order to get a token.



Tip


Here `tokenUrl="token"` refers to a relative URL `token` that we haven't created yet. As it's a relative URL, it's equivalent to `./token`.


Because we are using a relative URL, if your API was located at `https://example.com/`, then it would refer to `https://example.com/token`. But if your API was located at `https://example.com/api/v1/`, then it would refer to `https://example.com/api/v1/token`.


Using a relative URL is important to make sure your application keeps working even in an advanced use case like Behind a Proxy.



This parameter doesn't create that endpoint / *path operation*, but declares that the URL `/token` will be the one that the client should use to get the token. That information is used in OpenAPI, and then in the interactive API documentation systems.


We will soon also create the actual path operation.



Info


If you are a very strict "Pythonista" you might dislike the style of the parameter name `tokenUrl` instead of `token_url`.


That's because it is using the same name as in the OpenAPI spec. So that if you need to investigate more about any of these security schemes you can just copy and paste it to find more information about it.



The `oauth2_scheme` variable is an instance of `OAuth2PasswordBearer`, but it is also a "callable".


It could be called as:



```python
oauth2_scheme(some, parameters)

```

So, it can be used with `Depends`.


### Use it


Now you can pass that `oauth2_scheme` in a dependency with `Depends`.


This dependency will provide a `str` that is assigned to the parameter `token` of the *path operation function*.


**FastAPI** will know that it can use this dependency to define a "security scheme" in the OpenAPI schema (and the automatic API docs).



Technical Details


**FastAPI** will know that it can use the class `OAuth2PasswordBearer` (declared in a dependency) to define the security scheme in OpenAPI because it inherits from `fastapi.security.oauth2.OAuth2`, which in turn inherits from `fastapi.security.base.SecurityBase`.


All the security utilities that integrate with OpenAPI (and the automatic API docs) inherit from `SecurityBase`, that's how **FastAPI** can know how to integrate them in OpenAPI.



## What it does


It will go and look in the request for that `Authorization` header, check if the value is `Bearer` plus some token, and will return the token as a `str`.


If it doesn't see an `Authorization` header, or the value doesn't have a `Bearer` token, it will respond with a 401 status code error (`UNAUTHORIZED`) directly.


You don't even have to check if the token exists to return an error. You can be sure that if your function is executed, it will have a `str` in that token.


You can try it already in the interactive docs:


![](/img/tutorial/security/image03.png)


We are not verifying the validity of the token yet, but that's a start already.


## Recap


So, in just 3 or 4 extra lines, you already have some primitive form of security.



