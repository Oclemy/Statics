Applications fail, servers fail. Sooner or later you will see an exception
in production. Even if your code is 100% correct, you will still see
exceptions from time to time. Why? Because everything else involved will
fail. Here are some situations where perfectly fine code can lead to server
errors:


And that’s just a small sample of issues you could be facing. So how do we
deal with that sort of problem? By default if your application runs in
production mode, and an exception is raised Flask will display a very simple
page for you and log the exception to the [`logger`](https://flask.palletsprojects.com/../api/#flask.Flask.logger "flask.Flask.logger").


But there is more you can do, and we will cover some better setups to deal
with errors including custom exceptions and 3rd party tools.



## Error Handlers


When an error occurs in Flask, an appropriate [HTTP status code](https://developer.mozilla.org/en-US/docs/Web/HTTP/Status) will be
returned. 400-499 indicate errors with the client’s request data, or
about the data requested. 500-599 indicate errors with the server or
application itself.


You might want to show custom error pages to the user when an error occurs.
This can be done by registering error handlers.


An error handler is a function that returns a response when a type of error is
raised, similar to how a view is a function that returns a response when a
request URL is matched. It is passed the instance of the error being handled,
which is most likely a [`HTTPException`](https://werkzeug.palletsprojects.com/en/2.2.x/exceptions/#werkzeug.exceptions.HTTPException "(in Werkzeug v2.2.x)").


The status code of the response will not be set to the handler’s code. Make
sure to provide the appropriate HTTP status code when returning a response from
a handler.



### Registering


Register handlers by decorating a function with
[`errorhandler()`](https://flask.palletsprojects.com/../api/#flask.Flask.errorhandler "flask.Flask.errorhandler"). Or use
[`register_error_handler()`](https://flask.palletsprojects.com/../api/#flask.Flask.register_error_handler "flask.Flask.register_error_handler") to register the function later.
Remember to set the error code when returning the response.



```python
@app.errorhandler(werkzeug.exceptions.BadRequest)
def handle_bad_request(e):
    return 'bad request!', 400

# or, without the decorator
app.register_error_handler(400, handle_bad_request)

```


[`werkzeug.exceptions.HTTPException`](https://werkzeug.palletsprojects.com/en/2.2.x/exceptions/#werkzeug.exceptions.HTTPException "(in Werkzeug v2.2.x)") subclasses like
[`BadRequest`](https://werkzeug.palletsprojects.com/en/2.2.x/exceptions/#werkzeug.exceptions.BadRequest "(in Werkzeug v2.2.x)") and their HTTP codes are interchangeable
when registering handlers. (`BadRequest.code == 400`)


Non-standard HTTP codes cannot be registered by code because they are not known
by Werkzeug. Instead, define a subclass of
[`HTTPException`](https://werkzeug.palletsprojects.com/en/2.2.x/exceptions/#werkzeug.exceptions.HTTPException "(in Werkzeug v2.2.x)") with the appropriate code and
register and raise that exception class.



```python
class InsufficientStorage(werkzeug.exceptions.HTTPException):
    code = 507
    description = 'Not enough storage space.'

app.register_error_handler(InsufficientStorage, handle_507)

raise InsufficientStorage()

```


Handlers can be registered for any exception class, not just
[`HTTPException`](https://werkzeug.palletsprojects.com/en/2.2.x/exceptions/#werkzeug.exceptions.HTTPException "(in Werkzeug v2.2.x)") subclasses or HTTP status
codes. Handlers can be registered for a specific class, or for all subclasses
of a parent class.




### Handling


When building a Flask application you *will* run into exceptions. If some part
of your code breaks while handling a request (and you have no error handlers
registered), a “500 Internal Server Error”
([`InternalServerError`](https://werkzeug.palletsprojects.com/en/2.2.x/exceptions/#werkzeug.exceptions.InternalServerError "(in Werkzeug v2.2.x)")) will be returned by default.
Similarly, “404 Not Found”
([`NotFound`](https://werkzeug.palletsprojects.com/en/2.2.x/exceptions/#werkzeug.exceptions.NotFound "(in Werkzeug v2.2.x)")) error will occur if a request is sent to an unregistered route.
If a route receives an unallowed request method, a “405 Method Not Allowed”
([`MethodNotAllowed`](https://werkzeug.palletsprojects.com/en/2.2.x/exceptions/#werkzeug.exceptions.MethodNotAllowed "(in Werkzeug v2.2.x)")) will be raised. These are all
subclasses of [`HTTPException`](https://werkzeug.palletsprojects.com/en/2.2.x/exceptions/#werkzeug.exceptions.HTTPException "(in Werkzeug v2.2.x)") and are provided by
default in Flask.


Flask gives you the ability to raise any HTTP exception registered by
Werkzeug. However, the default HTTP exceptions return simple exception
pages. You might want to show custom error pages to the user when an error occurs.
This can be done by registering error handlers.


When Flask catches an exception while handling a request, it is first looked up by code.
If no handler is registered for the code, Flask looks up the error by its class hierarchy; the most specific handler is chosen.
If no handler is registered, [`HTTPException`](https://werkzeug.palletsprojects.com/en/2.2.x/exceptions/#werkzeug.exceptions.HTTPException "(in Werkzeug v2.2.x)") subclasses show a
generic message about their code, while other exceptions are converted to a
generic “500 Internal Server Error”.


For example, if an instance of [`ConnectionRefusedError`](https://docs.python.org/3/library/exceptions.html#ConnectionRefusedError "(in Python v3.11)") is raised,
and a handler is registered for [`ConnectionError`](https://docs.python.org/3/library/exceptions.html#ConnectionError "(in Python v3.11)") and
[`ConnectionRefusedError`](https://docs.python.org/3/library/exceptions.html#ConnectionRefusedError "(in Python v3.11)"), the more specific [`ConnectionRefusedError`](https://docs.python.org/3/library/exceptions.html#ConnectionRefusedError "(in Python v3.11)")
handler is called with the exception instance to generate the response.


Handlers registered on the blueprint take precedence over those registered
globally on the application, assuming a blueprint is handling the request that
raises the exception. However, the blueprint cannot handle 404 routing errors
because the 404 occurs at the routing level before the blueprint can be
determined.




### Generic Exception Handlers


It is possible to register error handlers for very generic base classes
such as `HTTPException` or even `Exception`. However, be aware that
these will catch more than you might expect.


For example, an error handler for `HTTPException` might be useful for turning
the default HTML errors pages into JSON. However, this
handler will trigger for things you don’t cause directly, such as 404
and 405 errors during routing. Be sure to craft your handler carefully
so you don’t lose information about the HTTP error.



```python
from flask import json
from werkzeug.exceptions import HTTPException

@app.errorhandler(HTTPException)
def handle_exception(e):
 """Return JSON instead of HTML for HTTP errors."""
    # start with the correct headers and status code from the error
    response = e.get_response()
    # replace the body with JSON
    response.data = json.dumps({
        "code": e.code,
        "name": e.name,
        "description": e.description,
    })
    response.content_type = "application/json"
    return response

```


An error handler for `Exception` might seem useful for changing how
all errors, even unhandled ones, are presented to the user. However,
this is similar to doing `except Exception:` in Python, it will
capture *all* otherwise unhandled errors, including all HTTP status
codes.


In most cases it will be safer to register handlers for more
specific exceptions. Since `HTTPException` instances are valid WSGI
responses, you could also pass them through directly.



```python
from werkzeug.exceptions import HTTPException

@app.errorhandler(Exception)
def handle_exception(e):
    # pass through HTTP errors
    if isinstance(e, HTTPException):
        return e

    # now you're handling non-HTTP exceptions only
    return render_template("500_generic.html", e=e), 500

```


Error handlers still respect the exception class hierarchy. If you
register handlers for both `HTTPException` and `Exception`, the
`Exception` handler will not handle `HTTPException` subclasses
because it the `HTTPException` handler is more specific.




### Unhandled Exceptions


When there is no error handler registered for an exception, a 500
Internal Server Error will be returned instead. See
[`flask.Flask.handle_exception()`](https://flask.palletsprojects.com/../api/#flask.Flask.handle_exception "flask.Flask.handle_exception") for information about this
behavior.


If there is an error handler registered for `InternalServerError`,
this will be invoked. As of Flask 1.1.0, this error handler will always
be passed an instance of `InternalServerError`, not the original
unhandled error.


The original error is available as `e.original_exception`.


An error handler for “500 Internal Server Error” will be passed uncaught
exceptions in addition to explicit 500 errors. In debug mode, a handler
for “500 Internal Server Error” will not be used. Instead, the
interactive debugger will be shown.





## Custom Error Pages


Sometimes when building a Flask application, you might want to raise a
[`HTTPException`](https://werkzeug.palletsprojects.com/en/2.2.x/exceptions/#werkzeug.exceptions.HTTPException "(in Werkzeug v2.2.x)") to signal to the user that
something is wrong with the request. Fortunately, Flask comes with a handy
[`abort()`](https://flask.palletsprojects.com/../api/#flask.abort "flask.abort") function that aborts a request with a HTTP error from
werkzeug as desired. It will also provide a plain black and white error page
for you with a basic description, but nothing fancy.


Depending on the error code it is less or more likely for the user to
actually see such an error.


Consider the code below, we might have a user profile route, and if the user
fails to pass a username we can raise a “400 Bad Request”. If the user passes a
username and we can’t find it, we raise a “404 Not Found”.



```python
from flask import abort, render_template, request

# a username needs to be supplied in the query args
# a successful request would be like /profile?username=jack
@app.route("/profile")
def user_profile():
    username = request.arg.get("username")
    # if a username isn't supplied in the request, return a 400 bad request
    if username is None:
        abort(400)

    user = get_user(username=username)
    # if a user can't be found by their username, return 404 not found
    if user is None:
        abort(404)

    return render_template("profile.html", user=user)

```


Here is another example implementation for a “404 Page Not Found” exception:



```python
from flask import render_template

@app.errorhandler(404)
def page_not_found(e):
    # note that we set the 404 status explicitly
    return render_template('404.html'), 404

```


When using [Application Factories](https://flask.palletsprojects.com/../patterns/appfactories/):



```python
from flask import Flask, render_template

def page_not_found(e):
  return render_template('404.html'), 404

def create_app(config_filename):
    app = Flask(__name__)
    app.register_error_handler(404, page_not_found)
    return app

```


An example template might be this:



```python
{% extends "layout.html" %}
{% block title %}Page Not Found{% endblock %}
{% block body %}
  <h1>Page Not Found</h1>
  <p>What you were looking for is just not there.
  <p><a href="{{ url_for('index') }}">go somewhere nice</a>
{% endblock %}

```



### Further Examples


The above examples wouldn’t actually be an improvement on the default
exception pages. We can create a custom 500.html template like this:



```python
{% extends "layout.html" %}
{% block title %}Internal Server Error{% endblock %}
{% block body %}
  <h1>Internal Server Error</h1>
  <p>Oops... we seem to have made a mistake, sorry!</p>
  <p><a href="{{ url_for('index') }}">Go somewhere nice instead</a>
{% endblock %}

```


It can be implemented by rendering the template on “500 Internal Server Error”:



```python
from flask import render_template

@app.errorhandler(500)
def internal_server_error(e):
    # note that we set the 500 status explicitly
    return render_template('500.html'), 500

```


When using [Application Factories](https://flask.palletsprojects.com/../patterns/appfactories/):



```python
from flask import Flask, render_template

def internal_server_error(e):
  return render_template('500.html'), 500

def create_app():
    app = Flask(__name__)
    app.register_error_handler(500, internal_server_error)
    return app

```


When using [Modular Applications with Blueprints](https://flask.palletsprojects.com/../blueprints/):



```python
from flask import Blueprint

blog = Blueprint('blog', __name__)

# as a decorator
@blog.errorhandler(500)
def internal_server_error(e):
    return render_template('500.html'), 500

# or with register_error_handler
blog.register_error_handler(500, internal_server_error)

```





## Blueprint Error Handlers


In [Modular Applications with Blueprints](https://flask.palletsprojects.com/../blueprints/), most error handlers will work as expected.
However, there is a caveat concerning handlers for 404 and 405
exceptions. These error handlers are only invoked from an appropriate
`raise` statement or a call to `abort` in another of the blueprint’s
view functions; they are not invoked by, e.g., an invalid URL access.


This is because the blueprint does not “own” a certain URL space, so
the application instance has no way of knowing which blueprint error
handler it should run if given an invalid URL. If you would like to
execute different handling strategies for these errors based on URL
prefixes, they may be defined at the application level using the
`request` proxy object.



```python
from flask import jsonify, render_template

# at the application level
# not the blueprint level
@app.errorhandler(404)
def page_not_found(e):
    # if a request is in our blog URL space
    if request.path.startswith('/blog/'):
        # we return a custom blog 404 page
        return render_template("blog/404.html"), 404
    else:
        # otherwise we return our generic site-wide 404 page
        return render_template("404.html"), 404

@app.errorhandler(405)
def method_not_allowed(e):
    # if a request has the wrong method to our API
    if request.path.startswith('/api/'):
        # we return a json saying so
        return jsonify(message="Method Not Allowed"), 405
    else:
        # otherwise we return a generic site-wide 405 page
        return render_template("405.html"), 405

```




## Returning API Errors as JSON


When building APIs in Flask, some developers realise that the built-in
exceptions are not expressive enough for APIs and that the content type of
*text/html* they are emitting is not very useful for API consumers.


Using the same techniques as above and [`jsonify()`](https://flask.palletsprojects.com/../api/#flask.json.jsonify "flask.json.jsonify") we can return JSON
responses to API errors. [`abort()`](https://flask.palletsprojects.com/../api/#flask.abort "flask.abort") is called
with a `description` parameter. The error handler will
use that as the JSON error message, and set the status code to 404.



```python
from flask import abort, jsonify

@app.errorhandler(404)
def resource_not_found(e):
    return jsonify(error=str(e)), 404

@app.route("/cheese")
def get_one_cheese():
    resource = get_resource()

    if resource is None:
        abort(404, description="Resource not found")

    return jsonify(resource)

```


We can also create custom exception classes. For instance, we can
introduce a new custom exception for an API that can take a proper human readable message,
a status code for the error and some optional payload to give more context
for the error.


This is a simple example:



```python
from flask import jsonify, request

class InvalidAPIUsage(Exception):
    status_code = 400

    def __init__(self, message, status_code=None, payload=None):
        super().__init__()
        self.message = message
        if status_code is not None:
            self.status_code = status_code
        self.payload = payload

    def to_dict(self):
        rv = dict(self.payload or ())
        rv['message'] = self.message
        return rv

@app.errorhandler(InvalidAPIUsage)
def invalid_api_usage(e):
    return jsonify(e.to_dict()), e.status_code

# an API app route for getting user information
# a correct request might be /api/user?user_id=420
@app.route("/api/user")
def user_api(user_id):
    user_id = request.arg.get("user_id")
    if not user_id:
        raise InvalidAPIUsage("No user id provided!")

    user = get_user(user_id=user_id)
    if not user:
        raise InvalidAPIUsage("No such user!", status_code=404)

    return jsonify(user.to_dict())

```


A view can now raise that exception with an error message. Additionally
some extra payload can be provided as a dictionary through the payload
parameter.






