
# Basic routing


*Routing* refers to determining how an application responds to a client request to a particular endpoint, which is a URI (or path) and a specific HTTP request method (GET, POST, and so on).


Each route can have one or more handler functions, which are executed when the route is matched.


Route definition takes the following structure:



```javascript
app.METHOD(PATH, HANDLER)

```

Where:


* `app` is an instance of `express`.
* `METHOD` is an [HTTP request method](https://en.wikipedia.org/wiki/Hypertext_Transfer_Protocol#Request_methods), in lowercase.
* `PATH` is a path on the server.
* `HANDLER` is the function executed when the route is matched.



This tutorial assumes that an instance of `express` named `app` is created and the server is running. If you are not familiar with creating an app and starting it, see the [Hello world example](/en/starter/hello-world.html).



The following examples illustrate defining simple routes.


Respond with `Hello World!` on the homepage:



```javascript
app.get('/', (req, res) => {
  res.send('Hello World!')
})

```

Respond to POST request on the root route (`/`), the application’s home page:



```javascript
app.post('/', (req, res) => {
  res.send('Got a POST request')
})

```

Respond to a PUT request to the `/user` route:



```javascript
app.put('/user', (req, res) => {
  res.send('Got a PUT request at /user')
})

```

Respond to a DELETE request to the `/user` route:



```javascript
app.delete('/user', (req, res) => {
  res.send('Got a DELETE request at /user')
})

```

For more details about routing, see the [routing guide](/en/guide/routing.html).






