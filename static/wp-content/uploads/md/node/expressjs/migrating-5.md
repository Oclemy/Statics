
# Moving to Express 5


## Overview


Express 5.0 is still in the beta release stage, but here is a preview of the changes that will be in the release and how to migrate your Express 4 app to Express 5.


To install the latest beta and to preview Express 5, enter the following command in your application root directory:



```javascript
$ npm install "express@>=5.0.0-beta.1" --save

```

You can then run your automated tests to see what fails, and fix problems according to the updates listed below. After addressing test failures, run your app to see what errors occur. You’ll find out right away if the app uses any methods or properties that are not supported.


## Changes in Express 5


**Removed methods and properties**


**Changed**


**Improvements**


### Removed methods and properties


If you use any of these methods or properties in your app, it will crash. So, you’ll need to change your app after you update to version 5.


#### app.del()


Express 5 no longer supports the `app.del()` function. If you use this function an error is thrown. For registering HTTP DELETE routes, use the `app.delete()` function instead.


Initially `del` was used instead of `delete`, because `delete` is a reserved keyword in JavaScript. However, as of ECMAScript 6, `delete` and other reserved keywords can legally be used as property names.


#### app.param(fn)


The `app.param(fn)` signature was used for modifying the behavior of the `app.param(name, fn)` function. It has been deprecated since v4.11.0, and Express 5 no longer supports it at all.


#### Pluralized method names


The following method names have been pluralized. In Express 4, using the old methods resulted in a deprecation warning. Express 5 no longer supports them at all:


`req.acceptsCharset()` is replaced by `req.acceptsCharsets()`.


`req.acceptsEncoding()` is replaced by `req.acceptsEncodings()`.


`req.acceptsLanguage()` is replaced by `req.acceptsLanguages()`.


#### Leading colon (:) in the name for app.param(name, fn)


A leading colon character (:) in the name for the `app.param(name, fn)` function is a remnant of Express 3, and for the sake of backwards compatibility, Express 4 supported it with a deprecation notice. Express 5 will silently ignore it and use the name parameter without prefixing it with a colon.


This should not affect your code if you follow the Express 4 documentation of [app.param](/en/4x/api.html#app.param), as it makes no mention of the leading colon.


#### req.param(name)


This potentially confusing and dangerous method of retrieving form data has been removed. You will now need to specifically look for the submitted parameter name in the `req.params`, `req.body`, or `req.query` object.


#### res.json(obj, status)


Express 5 no longer supports the signature `res.json(obj, status)`. Instead, set the status and then chain it to the `res.json()` method like this: `res.status(status).json(obj)`.


#### res.jsonp(obj, status)


Express 5 no longer supports the signature `res.jsonp(obj, status)`. Instead, set the status and then chain it to the `res.jsonp()` method like this: `res.status(status).jsonp(obj)`.


#### res.send(body, status)


Express 5 no longer supports the signature `res.send(obj, status)`. Instead, set the status and then chain it to the `res.send()` method like this: `res.status(status).send(obj)`.


#### res.send(status)


Express 5 no longer supports the signature `res.send(*status*)`, where *`status`* is a number. Instead, use the `res.sendStatus(statusCode)` function, which sets the HTTP response header status code and sends the text version of the code: “Not Found”, “Internal Server Error”, and so on.
If you need to send a number by using the `res.send()` function, quote the number to convert it to a string, so that Express does not interpret it as an attempt to use the unsupported old signature.


#### res.sendfile()


The `res.sendfile()` function has been replaced by a camel-cased version `res.sendFile()` in Express 5.


### Changed


#### Path route matching syntax


Path route matching syntax is when a string is supplied as the first parameter to the `app.all()`, `app.use()`, `app.METHOD()`, `router.all()`, `router.METHOD()`, and `router.use()` APIs. The following changes have been made to how the path string is matched to an incoming request:


* Add new `?`, `*`, and `+` parameter modifiers.
* Matching group expressions are only RegExp syntax.
	+ `(*)` is no longer valid and must be written as `(.*)`, for example.
* Named matching groups no longer available by position in `req.params`.
	+ `/:foo(.*)` only captures as `req.params.foo` and not available as `req.params[0]`.
* Regular expressions can only be used in a matching group.
	+ `/d+` is no longer valid and must be written as `/(d+)`.
* Special `*` path segment behavior removed.
	+ `/foo/*/bar` will match a literal `*` as the middle segment.


#### Rejected promises handled from middleware and handlers


Request middleware and handlers that return rejected promises are now handled by forwarding the rejected value as an `Error` to the error handling middleware. This means that using `async` functions as middleware and handlers are easier than ever. When an error is thrown in an `async` function or a rejected promise is `await`ed inside an async function, those errors will be passed to the error handler as if calling `next(err)`.


Details of how Express handles errors is covered in the [error handling documentation](/en/guide/error-handling.html).


#### app.router


The `app.router` object, which was removed in Express 4, has made a comeback in Express 5. In the new version, this object is a just a reference to the base Express router, unlike in Express 3, where an app had to explicitly load it.


#### req.host


In Express 4, the `req.host` function incorrectly stripped off the port number if it was present. In Express 5 the port number is maintained.


#### req.query


The `req.query` property is no longer a writable property and is instead a getter. The default query parser has been changed from “extended” to “simple”.


### Improvements


#### res.render()


This method now enforces asynchronous behavior for all view engines, avoiding bugs caused by view engines that had a synchronous implementation and that violated the recommended interface.






