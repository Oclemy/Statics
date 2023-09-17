
# Applications


Starlette includes an application class `Starlette` that nicely ties together all of
its other functionality.



```python
from starlette.applications import Starlette
from starlette.responses import PlainTextResponse
from starlette.routing import Route, Mount, WebSocketRoute
from starlette.staticfiles import StaticFiles


def homepage(request):
    return PlainTextResponse('Hello, world!')

def user_me(request):
    username = "John Doe"
    return PlainTextResponse('Hello, %s!' % username)

def user(request):
    username = request.path_params['username']
    return PlainTextResponse('Hello, %s!' % username)

async def websocket_endpoint(websocket):
    await websocket.accept()
    await websocket.send_text('Hello, websocket!')
    await websocket.close()

def startup():
    print('Ready to go')


routes = [
    Route('/', homepage),
    Route('/user/me', user_me),
    Route('/user/{username}', user),
    WebSocketRoute('/ws', websocket_endpoint),
    Mount('/static', StaticFiles(directory="static")),
]

app = Starlette(debug=True, routes=routes, on_startup=[startup])

```

### Instantiating the application



*class* `starlette.applications.**Starlette**`(*debug=False*, *routes=None*, *middleware=None*, *exception_handlers=None*, *on_startup=None*, *on_shutdown=None*, *lifespan=None*)


Creates an application instance.


**Parameters:**


* **debug** - Boolean indicating if debug tracebacks should be returned on errors.
* **routes** - A list of routes to serve incoming HTTP and WebSocket requests.
* **middleware** - A list of middleware to run for every request. A starlette
application will always automatically include two middleware classes.
`ServerErrorMiddleware` is added as the very outermost middleware, to handle
any uncaught errors occurring anywhere in the entire stack.
`ExceptionMiddleware` is added as the very innermost middleware, to deal
with handled exception cases occurring in the routing or endpoints.
* **exception_handlers** - A mapping of either integer status codes,
or exception class types onto callables which handle the exceptions.
Exception handler callables should be of the form
`handler(request, exc) -> response` and may be either standard functions, or
async functions.
* **on_startup** - A list of callables to run on application startup.
Startup handler callables do not take any arguments, and may be be either
standard functions, or async functions.
* **on_shutdown** - A list of callables to run on application shutdown.
Shutdown handler callables do not take any arguments, and may be be either
standard functions, or async functions.
* **lifespan** - A lifespan context function, which can be used to perform
startup and shutdown tasks. This is a newer style that replaces the
`on_startup` and `on_shutdown` handlers. Use one or the other, not both.


### Storing state on the app instance


You can store arbitrary extra state on the application instance, using the
generic `app.state` attribute.


For example:



```python
app.state.ADMIN_EMAIL = 'admin@example.org'

```

### Accessing the app instance


Where a `request` is available (i.e. endpoints and middleware), the app is available on `request.app`.



