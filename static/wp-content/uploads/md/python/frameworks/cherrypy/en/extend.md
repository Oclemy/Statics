CherryPy can be considered both as a HTTP library
as much as a web application framework. In that latter case,
its architecture provides mechanisms to support operations
across the whole server instance. This offers a powerful
canvas to perform persistent operations as server-wide
functions live outside the request processing itself. They
are available to the whole process as long as the bus lives.



CherryPyâs backbone consists of a bus system implementing
a simple [publish/subscribe messaging pattern](http://en.wikipedia.org/wiki/Publish%E2%80%93subscribe_pattern).
Simply put, in CherryPy everything is controlled via that bus.
One can easily picture the bus as a sushi restaurantâs belt as in
the picture below.


[![_images/sushibelt.JPG](_images/sushibelt.JPG)](http://en.wikipedia.org/wiki/YO!_Sushi)
You can subscribe and publish to channels on a bus. A channel is
bit like a unique identifier within the bus. When a message is
published to a channel, the bus will dispatch the message to
all subscribers for that channel.


One interesting aspect of a pubsub pattern is that it promotes
decoupling between a caller and the callee. A published message
will eventually generate a response but the publisher does not
know where that response came from.


Thanks to that decoupling, a CherryPy application can easily
access functionalities without having to hold a reference to
the entity providing that functionality. Instead, the
application simply publishes onto the bus and will receive
the appropriate response, which is all that matter.




Letâs take the following dummy application:



```python
import cherrypy

class ECommerce(object):
    def __init__(self, db):
        self.mydb = db

    @cherrypy.expose
    def save_kart(self, cart_data):
        cart = Cart(cart_data)
        self.mydb.save(cart)

if __name__ == '__main__':
   cherrypy.quickstart(ECommerce(), '/')

```


The application has a reference to the database but
this creates a fairly strong coupling between the
database provider and the application.


Another approach to work around the coupling is by
using a pubsub workflow:



```python
import cherrypy

class ECommerce(object):
    @cherrypy.expose
    def save_kart(self, cart_data):
        cart = Cart(cart_data)
        cherrypy.engine.publish('db-save', cart)

if __name__ == '__main__':
   cherrypy.quickstart(ECommerce(), '/')

```


In this example, we publish a `cart` instance to
`db-save` channel. One or many subscribers can then
react to that message and the application doesnât
have to know about them.



Note


This approach is not mandatory and itâs up to you to
decide how to design your entities interaction.





CherryPyâs bus implementation is simplistic as it registers
functions to channels. Whenever a message is published to
a channel, each registered function is applied with that
message passed as a parameter.


The whole behaviour happens synchronously and, in that sense,
if a subscriber takes too long to process a message, the
remaining subscribers will be delayed.


CherryPyâs bus is not an advanced pubsub messaging broker
system such as provided by [zeromq](http://zeromq.org/) or
[RabbitMQ](https://www.rabbitmq.com/).
Use it with the understanding that it may have a cost.





As said earlier, CherryPy is built around a pubsub bus. All
entities that the framework manages at runtime are working on
top of a single bus instance, which is named the `engine`.


The bus implementation therefore provides a set of common
channels which describe the applicationâs lifecycle:



```python
                 O
                 |
                 V
STOPPING --> STOPPED --> EXITING -> X
   A   A         |
   |    ___     |
   |            |
   |         V   V
 STARTED <-- STARTING

```


The statesâ transitions trigger channels to be published
to so that subscribers can react to them.


One good example is the HTTP server which will tranisition
from a `"STOPPED"` stated to a `"STARTED"` state whenever
a message is published to the [`start`](https://docs.cherrypy.dev/pkg/cherrypy._cpmodpy.html#cherrypy._cpmodpy.ModPythonServer.start "cherrypy._cpmodpy.ModPythonServer.start") channel.




In order to support its life-cycle, CherryPy defines a set
of common channels that will be published to at various states:


* **âstartâ**: When the bus is in the `"STARTING"` state
* **âmainâ**: Periodically from the CherryPyâs mainloop
* **âstopâ**: When the bus is in the `"STOPPING"` state
* **âgracefulâ**: When the bus requests a reload of subscribers
* **âexitâ**: When the bus is in the `"EXITING"` state


This channel will be published to by the `engine` automatically.
Register therefore any subscribers that would need to react
to the transition changes of the `engine`.


In addition, a few other channels are also published to during
the request processing.


Also, from the [`cherrypy.process.plugins.ThreadManager`](https://docs.cherrypy.dev/pkg/cherrypy.process.plugins.html#cherrypy.process.plugins.ThreadManager "cherrypy.process.plugins.ThreadManager") plugin:


* **âacquire_threadâ**
* **âstart_threadâ**
* **âstop_threadâ**
* **ârelease_threadâ**




In order to work with the bus, the implementation
provides the following simple API:



> 
> 



> 
> 



> 
> 






Plugins, simply put, are entities that play with the bus, either by
publishing or subscribing to channels, usually both at the same time.



Important


Plugins are extremely useful whenever you have functionalities:


* Available across the whole application server
* Associated to the applicationâs life-cycle
* You want to avoid being strongly coupled to the application




A typical plugin looks like this:



```python
import cherrypy
from cherrypy.process import wspbus, plugins

class DatabasePlugin(plugins.SimplePlugin):
    def __init__(self, bus, db_klass):
        plugins.SimplePlugin.__init__(self, bus)
        self.db = db_klass()

    def start(self):
        self.bus.log('Starting up DB access')
        self.bus.subscribe("db-save", self.save_it)

    def stop(self):
        self.bus.log('Stopping down DB access')
        self.bus.unsubscribe("db-save", self.save_it)

    def save_it(self, entity):
        self.db.save(entity)

```


The [`cherrypy.process.plugins.SimplePlugin`](https://docs.cherrypy.dev/pkg/cherrypy.process.plugins.html#cherrypy.process.plugins.SimplePlugin "cherrypy.process.plugins.SimplePlugin") is a helper
class provided by CherryPy that will automatically subscribe
your [`start`](https://docs.cherrypy.dev/pkg/cherrypy._cpmodpy.html#cherrypy._cpmodpy.ModPythonServer.start "cherrypy._cpmodpy.ModPythonServer.start") and [`stop`](https://docs.cherrypy.dev/pkg/cherrypy._cpmodpy.html#cherrypy._cpmodpy.ModPythonServer.stop "cherrypy._cpmodpy.ModPythonServer.stop") methods to the related channels.


When the [`start`](https://docs.cherrypy.dev/pkg/cherrypy._cpmodpy.html#cherrypy._cpmodpy.ModPythonServer.start "cherrypy._cpmodpy.ModPythonServer.start") and [`stop`](https://docs.cherrypy.dev/pkg/cherrypy._cpmodpy.html#cherrypy._cpmodpy.ModPythonServer.stop "cherrypy._cpmodpy.ModPythonServer.stop") channels are published on, those
methods are called accordingly.


Notice then how our plugin subscribes to the `db-save`
channel so that the bus can dispatch messages to the plugin.




To enable the plugin, it has to be registered to the the
bus as follows:



```python
DatabasePlugin(cherrypy.engine, SQLiteDB).subscribe()

```


The `SQLiteDB` here is a fake class that is used as our
database provider.




You can also unregister a plugin as follows:


This is often used when you want to prevent the default
HTTP server from being started by CherryPy, for instance
if you run on top of a different HTTP server (WSGI capable):



```python
cherrypy.server.unsubscribe()

```


Letâs see an example using this default application:



```python
import cherrypy

class Root(object):
    @cherrypy.expose
    def index(self):
        return "hello world"

if __name__ == '__main__':
    cherrypy.quickstart(Root())

```


For instance, this is what you would see when running
this application:



```python
[27/Apr/2014:13:04:07] ENGINE Listening for SIGHUP.
[27/Apr/2014:13:04:07] ENGINE Listening for SIGTERM.
[27/Apr/2014:13:04:07] ENGINE Listening for SIGUSR1.
[27/Apr/2014:13:04:07] ENGINE Bus STARTING
[27/Apr/2014:13:04:07] ENGINE Started monitor thread 'Autoreloader'.
[27/Apr/2014:13:04:08] ENGINE Serving on http://127.0.0.1:8080
[27/Apr/2014:13:04:08] ENGINE Bus STARTED

```


Now letâs unsubscribe the HTTP server:



```python
import cherrypy

class Root(object):
    @cherrypy.expose
    def index(self):
        return "hello world"

if __name__ == '__main__':
    cherrypy.server.unsubscribe()
    cherrypy.quickstart(Root())

```


This is what we get:



```python
[27/Apr/2014:13:08:06] ENGINE Listening for SIGHUP.
[27/Apr/2014:13:08:06] ENGINE Listening for SIGTERM.
[27/Apr/2014:13:08:06] ENGINE Listening for SIGUSR1.
[27/Apr/2014:13:08:06] ENGINE Bus STARTING
[27/Apr/2014:13:08:06] ENGINE Started monitor thread 'Autoreloader'.
[27/Apr/2014:13:08:06] ENGINE Bus STARTED

```


As you can see, the server is not started. The missing:



```python
[27/Apr/2014:13:04:08] ENGINE Serving on http://127.0.0.1:8080

```







