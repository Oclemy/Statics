Application dispatching is the process of combining multiple Flask
applications on the WSGI level. You can combine not only Flask
applications but any WSGI application. This would allow you to run a
Django and a Flask application in the same interpreter side by side if
you want. The usefulness of this depends on how the applications work
internally.



## Working with this Document


Each of the techniques and examples below results in an `application`
object that can be run with any WSGI server. For production, see
[Deploying to Production](https://flask.palletsprojects.com/../../deploying/). For development, Werkzeug provides a server
through [`werkzeug.serving.run_simple()`](https://werkzeug.palletsprojects.com/en/2.2.x/serving/#werkzeug.serving.run_simple "(in Werkzeug v2.2.x)"):



```python
from werkzeug.serving import run_simple
run_simple('localhost', 5000, application, use_reloader=True)

```


Note that [`run_simple`](https://werkzeug.palletsprojects.com/en/2.2.x/serving/#werkzeug.serving.run_simple "(in Werkzeug v2.2.x)") is not intended for
use in production. Use a production WSGI server. See [Deploying to Production](https://flask.palletsprojects.com/../../deploying/).


In order to use the interactive debugger, debugging must be enabled both on
the application and the simple server. Here is the “hello world” example with
debugging and [`run_simple`](https://werkzeug.palletsprojects.com/en/2.2.x/serving/#werkzeug.serving.run_simple "(in Werkzeug v2.2.x)"):



```python
from flask import Flask
from werkzeug.serving import run_simple

app = Flask(__name__)
app.debug = True

@app.route('/')
def hello_world():
    return 'Hello World!'

if __name__ == '__main__':
    run_simple('localhost', 5000, app,
               use_reloader=True, use_debugger=True, use_evalex=True)

```




## Dispatch by Subdomain


Sometimes you might want to use multiple instances of the same application
with different configurations. Assuming the application is created inside
a function and you can call that function to instantiate it, that is
really easy to implement. In order to develop your application to support
creating new instances in functions have a look at the
[Application Factories](https://flask.palletsprojects.com/../appfactories/) pattern.


A very common example would be creating applications per subdomain. For
instance you configure your webserver to dispatch all requests for all
subdomains to your application and you then use the subdomain information
to create user-specific instances. Once you have your server set up to
listen on all subdomains you can use a very simple WSGI application to do
the dynamic application creation.


The perfect level for abstraction in that regard is the WSGI layer. You
write your own WSGI application that looks at the request that comes and
delegates it to your Flask application. If that application does not
exist yet, it is dynamically created and remembered:



```python
from threading import Lock

class SubdomainDispatcher:

    def __init__(self, domain, create_app):
        self.domain = domain
        self.create_app = create_app
        self.lock = Lock()
        self.instances = {}

    def get_application(self, host):
        host = host.split(':')[0]
        assert host.endswith(self.domain), 'Configuration error'
        subdomain = host[:-len(self.domain)].rstrip('.')
        with self.lock:
            app = self.instances.get(subdomain)
            if app is None:
                app = self.create_app(subdomain)
                self.instances[subdomain] = app
            return app

    def __call__(self, environ, start_response):
        app = self.get_application(environ['HTTP_HOST'])
        return app(environ, start_response)

```


This dispatcher can then be used like this:



```python
from myapplication import create_app, get_user_for_subdomain
from werkzeug.exceptions import NotFound

def make_app(subdomain):
    user = get_user_for_subdomain(subdomain)
    if user is None:
        # if there is no user for that subdomain we still have
        # to return a WSGI application that handles that request.
        # We can then just return the NotFound() exception as
        # application which will render a default 404 page.
        # You might also redirect the user to the main page then
        return NotFound()

    # otherwise create the application for the specific user
    return create_app(user)

application = SubdomainDispatcher('example.com', make_app)

```






