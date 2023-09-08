

The following sections will drive you through the basics of
a CherryPy application, introducing some essential concepts.



Contents




The most basic application you can write with CherryPy
involves almost all its core concepts.



```python
1import cherrypy
2
3class Root(object):
4    @cherrypy.expose
5    def index(self):
6        return "Hello World!"
7
8if __name__ == '__main__':
9   cherrypy.quickstart(Root(), '/')

```


First and foremost, for most tasks, you will never need more than
a single import statement as demonstrated in line 1.


Before discussing the meat, letâs jump to line 9 which shows,
how to host your application with the CherryPy application server
and serve it with its builtin HTTP server at the `'/'` path.
All in one single line. Not bad.


Letâs now step back to the actual application. Even though CherryPy
does not mandate it, most of the time your applications
will be written as Python classes. Methods of those classes will
be called by CherryPy to respond to client requests. However,
CherryPy needs to be aware that a method can be used that way, we
say the method needs to be [exposed](https://docs.cherrypy.dev/glossary.html#term-exposed). This is precisely
what the [`cherrypy.expose()`](https://docs.cherrypy.dev/pkg/cherrypy.html#cherrypy.expose "cherrypy.expose") decorator does in line 4.


Save the snippet in a file named `myapp.py` and run your first
CherryPy application:


Then point your browser at <http://127.0.0.1:8080>. Tada!



Note


CherryPy is a small framework that focuses on one single task:
take a HTTP request and locate the most appropriate
Python function or method that match the requestâs URL.
Unlike other well-known frameworks, CherryPy does not
provide a built-in support for database access, HTML
templating or any other middleware nifty features.


In a nutshell, once CherryPy has found and called an
[exposed](https://docs.cherrypy.dev/glossary.html#term-exposed) method, it is up to you, as a developer, to
provide the tools to implement your applicationâs logic.


CherryPy takes the opinion that you, the developer, know best.




Warning


The previous example demonstrated the simplicty of the
CherryPy interface but, your application will likely
contain a few other bits and pieces: static service,
more complex structure, database access, etc.
This will be developed in the tutorial section.



CherryPy is a minimal framework but not a bare one, it comes
with a few basic tools to cover common usages that you would
expect.




A web application needs an HTTP server to be accessed to. CherryPy
provides its own, production ready, HTTP server. There are two
ways to host an application with it. The simple one and the almost-as-simple one.



The most straightforward way is to use [`cherrypy.quickstart()`](https://docs.cherrypy.dev/pkg/cherrypy.html#cherrypy.quickstart "cherrypy.quickstart")
function. It takes at least one argument, the instance of the
application to host. Two other settings are optionals. First, the
base path at which the application will be accessible from. Second,
a config dictionary or file to configure your application.



```python
cherrypy.quickstart(Blog())
cherrypy.quickstart(Blog(), '/blog')
cherrypy.quickstart(Blog(), '/blog', {'/': {'tools.gzip.on': True}})

```


The first one means that your application will be available at
<http://hostname:port/> whereas the other two will make your blog
application available at <http://hostname:port/blog>. In addition,
the last one provides specific settings for the application.



Note


Notice in the third case how the settings are still
relative to the application, not where it is made available at,
hence the `{'/': ... }` rather than a `{'/blog': ... }`





The [`cherrypy.quickstart()`](https://docs.cherrypy.dev/pkg/cherrypy.html#cherrypy.quickstart "cherrypy.quickstart") approach is fine for a single application,
but lacks the capacity to host several applications with the server.
To achieve this, one must use the [`cherrypy.tree.mount`](https://docs.cherrypy.dev/pkg/cherrypy._cptree.html#cherrypy._cptree.Tree.mount "cherrypy._cptree.Tree.mount")
function as follows:



```python
cherrypy.tree.mount(Blog(), '/blog', blog_conf)
cherrypy.tree.mount(Forum(), '/forum', forum_conf)

cherrypy.engine.start()
cherrypy.engine.block()

```


Essentially, [`cherrypy.tree.mount`](https://docs.cherrypy.dev/pkg/cherrypy._cptree.html#cherrypy._cptree.Tree.mount "cherrypy._cptree.Tree.mount")
takes the same parameters as [`cherrypy.quickstart()`](https://docs.cherrypy.dev/pkg/cherrypy.html#cherrypy.quickstart "cherrypy.quickstart"): an [application](https://docs.cherrypy.dev/glossary.html#term-application),
a hosting path segment and a configuration. The last two lines
are simply starting application server.



Important


[`cherrypy.quickstart()`](https://docs.cherrypy.dev/pkg/cherrypy.html#cherrypy.quickstart "cherrypy.quickstart") and [`cherrypy.tree.mount`](https://docs.cherrypy.dev/pkg/cherrypy._cptree.html#cherrypy._cptree.Tree.mount "cherrypy._cptree.Tree.mount")
are not exclusive. For instance, the previous lines can be written as:



```python
cherrypy.tree.mount(Blog(), '/blog', blog_conf)
cherrypy.quickstart(Forum(), '/forum', forum_conf)

```






Logging is an important task in any application. CherryPy will
log all incoming requests as well as protocol errors.


To do so, CherryPy manages two loggers:


Your application may leverage that second logger by calling
[`cherrypy.log()`](https://docs.cherrypy.dev/pkg/cherrypy._cplogging.html#cherrypy._cplogging.LogManager.error "cherrypy._cplogging.LogManager.error").



```python
cherrypy.log("hello there")

```


You can also log an exception:



```python
try:
   ...
except Exception:
   cherrypy.log("kaboom!", traceback=True)

```


Both logs are writing to files identified by the following keys
in your configuration:



See also


Refer to the [`cherrypy._cplogging`](https://docs.cherrypy.dev/pkg/cherrypy._cplogging.html#module-cherrypy._cplogging "cherrypy._cplogging") module for more
details about CherryPyâs logging architecture.




You may be interested in disabling either logs.


To disable file logging, simply set a en empty string to the
`log.access_file` or `log.error_file` keys in your
[global configuration](https://docs.cherrypy.dev/#globalsettings).


To disable, console logging, set `log.screen` to [`False`](https://docs.python.org/3/library/constants.html#False "(in Python v3.11)").



```python
cherrypy.config.update({'log.screen': False,
                        'log.access_file': '',
                        'log.error_file': ''})

```




Your application may obviously already use the [`logging`](https://docs.python.org/3/library/logging.html#module-logging "(in Python v3.11)")
module to trace application level messages. Below is a simple
example on setting it up.



```python
import logging
import logging.config

import cherrypy

logger = logging.getLogger()
db_logger = logging.getLogger('db')

LOG_CONF = {
    'version': 1,

    'formatters': {
        'void': {
            'format': ''
        },
        'standard': {
            'format': '%(asctime)s [%(levelname)s] %(name)s: %(message)s'
        },
    },
    'handlers': {
        'default': {
            'level':'INFO',
            'class':'logging.StreamHandler',
            'formatter': 'standard',
            'stream': 'ext://sys.stdout'
        },
        'cherrypy_console': {
            'level':'INFO',
            'class':'logging.StreamHandler',
            'formatter': 'void',
            'stream': 'ext://sys.stdout'
        },
        'cherrypy_access': {
            'level':'INFO',
            'class': 'logging.handlers.RotatingFileHandler',
            'formatter': 'void',
            'filename': 'access.log',
            'maxBytes': 10485760,
            'backupCount': 20,
            'encoding': 'utf8'
        },
        'cherrypy_error': {
            'level':'INFO',
            'class': 'logging.handlers.RotatingFileHandler',
            'formatter': 'void',
            'filename': 'errors.log',
            'maxBytes': 10485760,
            'backupCount': 20,
            'encoding': 'utf8'
        },
    },
    'loggers': {
        '': {
            'handlers': ['default'],
            'level': 'INFO'
        },
        'db': {
            'handlers': ['default'],
            'level': 'INFO' ,
            'propagate': False
        },
        'cherrypy.access': {
            'handlers': ['cherrypy_access'],
            'level': 'INFO',
            'propagate': False
        },
        'cherrypy.error': {
            'handlers': ['cherrypy_console', 'cherrypy_error'],
            'level': 'INFO',
            'propagate': False
        },
    }
}

class Root(object):
    @cherrypy.expose
    def index(self):

        logger.info("boom")
        db_logger.info("bam")
        cherrypy.log("bang")

        return "hello world"

if __name__ == '__main__':
    cherrypy.config.update({'log.screen': False,
                            'log.access_file': '',
                            'log.error_file': ''})
cherrypy.engine.unsubscribe('graceful', cherrypy.log.reopen_files)
    logging.config.dictConfig(LOG_CONF)
    cherrypy.quickstart(Root())

```


In this snippet, we create a [configuration dictionary](https://docs.python.org/2/library/logging.config.html#logging.config.dictConfig)
that we pass on to the `logging` module to configure
our loggers:



> 
> 


In addition, we re-configure the CherryPy loggers:



> 
> 


We also prevent CherryPy from trying to open its log files when
the autoreloader kicks in. This is not strictly required since we do not
even let CherryPy open them in the first place. But, this avoids
wasting time on something useless.






CherryPy comes with a fine-grained configuration mechanism and
settings can be set at various levels.



See also


Once you have the reviewed the basics, please refer
to the [in-depth discussion](https://docs.cherrypy.dev/config.html#configindepth)
around configuration.





To configure the HTTP and application servers,
use the [`cherrypy.config.update()`](https://docs.cherrypy.dev/pkg/cherrypy._cpconfig.html#cherrypy._cpconfig.Config.update "cherrypy._cpconfig.Config.update")
method.



```python
cherrypy.config.update({'server.socket_port': 9090})

```


The [`cherrypy.config`](https://docs.cherrypy.dev/pkg/cherrypy._cpconfig.html#module-cherrypy._cpconfig "cherrypy._cpconfig") object is a dictionary and the
update method merges the passed dictionary into it.


You can also pass a file instead (assuming a `server.conf`
file):



```python
[global]
server.socket_port: 9090

```



```python
cherrypy.config.update("server.conf")

```



Warning


[`cherrypy.config.update()`](https://docs.cherrypy.dev/pkg/cherrypy._cpconfig.html#cherrypy._cpconfig.Config.update "cherrypy._cpconfig.Config.update")
is not meant to be used to configure the application.
It is a common mistake. It is used to configure the server and engine.






To configure your application, pass in a dictionary or a file
when you associate your application to the server.



```python
cherrypy.quickstart(myapp, '/', {'/': {'tools.gzip.on': True}})

```


or via a file (called `app.conf` for instance):



```python
cherrypy.quickstart(myapp, '/', "app.conf")

```


Although, you can define most of your configuration in a global
fashion, it is sometimes convenient to define them
where they are applied in the code.



```python
class Root(object):
    @cherrypy.expose
    @cherrypy.tools.gzip()
    def index(self):
        return "hello world!"

```


A variant notation to the above:



```python
class Root(object):
    @cherrypy.expose
    def index(self):
        return "hello world!"
    index._cp_config = {'tools.gzip.on': True}

```


Both methods have the same effect so pick the one
that suits your style best.




You can add settings that are not specific to a request URL
and retrieve them from your page handler as follows:



```python
[/]
tools.gzip.on: True

[googleapi]
key = "..."
appid = "..."

```



```python
class Root(object):
    @cherrypy.expose
    def index(self):
        google_appid = cherrypy.request.app.config['googleapi']['appid']
        return "hello world!"

cherrypy.quickstart(Root(), '/', "app.conf")

```





CherryPy uses the `Cookie` module from python and in particular the
`Cookie.SimpleCookie` object type to handle cookies.


* To send a cookie to a browser, set `cherrypy.response.cookie[key] = value`.
* To retrieve a cookie sent by a browser, use `cherrypy.request.cookie[key]`.
* To delete a cookie (on the client side), you must *send* the cookie with its
expiration time set to `0`:



```python
cherrypy.response.cookie[key] = value
cherrypy.response.cookie[key]['expires'] = 0

```


Itâs important to understand that the request cookies are **not** automatically
copied to the response cookies. Clients will send the same cookies on every
request, and therefore `cherrypy.request.cookie` should be populated each
time. But the server doesnât need to send the same cookies with every response;
therefore, `cherrypy.response.cookie` will usually be empty. When you wish
to âdeleteâ (expire) a cookie, therefore, you must set
`cherrypy.response.cookie[key] = value` first, and then set its `expires`
attribute to 0.


Extended example:



```python
import cherrypy

class MyCookieApp(object):
    @cherrypy.expose
    def set(self):
        cookie = cherrypy.response.cookie
        cookie['cookieName'] = 'cookieValue'
        cookie['cookieName']['path'] = '/'
        cookie['cookieName']['max-age'] = 3600
        cookie['cookieName']['version'] = 1
        return "<html><body>Hello, I just sent you a cookie</body></html>"

    @cherrypy.expose
    def read(self):
        cookie = cherrypy.request.cookie
        res = """<html><body>Hi, you sent me %s cookies.<br />
 Here is a list of cookie names/values:<br />""" % len(cookie)
        for name in cookie.keys():
            res += "name: %s, value: %s<br>" % (name, cookie[name].value)
        return res + "</body></html>"

if __name__ == '__main__':
    cherrypy.quickstart(MyCookieApp(), '/cookie')

```





Sessions are one of the most common mechanism used by developers to
identify users and synchronize their activity. By default, CherryPy
does not activate sessions because it is not a mandatory feature
to have, to enable it simply add the following settings in your
configuration:



```python
[/]
tools.sessions.on: True

```



```python
cherrypy.quickstart(myapp, '/', "app.conf")

```


Sessions are, by default, stored in RAM so, if you restart your server
all of your current sessions will be lost. You can store them in memcached
or on the filesystem instead.


Using sessions in your applications is done as follows:



```python
import cherrypy

@cherrypy.expose
def index(self):
    if 'count' not in cherrypy.session:
       cherrypy.session['count'] = 0
    cherrypy.session['count'] += 1

```


In this snippet, everytime the index page handler is called,
the current userâs session has its `'count'` key incremented by `1`.


CherryPy knows which session to use by inspecting the cookie
sent alongside the request. This cookie contains the session
identifier used by CherryPy to load the userâs session from
the storage.



See also


Refer to the [`cherrypy.lib.sessions`](https://docs.cherrypy.dev/pkg/cherrypy.lib.sessions.html#module-cherrypy.lib.sessions "cherrypy.lib.sessions") module for more
details about the session interface and implementation.
Notably you will learn about sessions expiration.




Using a filesystem is a simple to not lose your sessions
between reboots. Each session is saved in its own file within
the given directory.



```python
[/]
tools.sessions.on: True
tools.sessions.storage_class = cherrypy.lib.sessions.FileSession
tools.sessions.storage_path = "/some/directory"

```




[Memcached](http://memcached.org/) is a popular key-store on top of your RAM,
it is distributed and a good choice if you want to
share sessions outside of the process running CherryPy.


Requires that the Python
[memcached package](https://pypi.org/project/memcached)
is installed, which may be indicated by installing
`cherrypy[memcached_session]`.



```python
[/]
tools.sessions.on: True
tools.sessions.storage_class = cherrypy.lib.sessions.MemcachedSession

```





Any other library may implement a session backend. Simply subclass
`cherrypy.lib.sessions.Session` and indicate that subclass as
`tools.sessions.storage_class`.





CherryPy can serve your static content such as images, javascript and
CSS resources, etc.



Note


CherryPy uses the [`mimetypes`](https://docs.python.org/3/library/mimetypes.html#module-mimetypes "(in Python v3.11)") module to determine the
best content-type to serve a particular resource. If the choice
is not valid, you can simply set more media-types as follows:



```python
import mimetypes
mimetypes.types_map['.csv'] = 'text/csv'

```




You can serve a single file as follows:



```python
[/style.css]
tools.staticfile.on = True
tools.staticfile.filename = "/home/site/style.css"

```


CherryPy will automatically respond to URLs such as
`http://hostname/style.css`.




Serving a whole directory is similar to a single file:



```python
[/static]
tools.staticdir.on = True
tools.staticdir.dir = "/home/site/static"

```


Assuming you have a file at `static/js/my.js`,
CherryPy will automatically respond to URLs such as
`http://hostname/static/js/my.js`.



Note


CherryPy always requires the absolute path to the files or directories
it will serve. If you have several static sections to configure
but located in the same root directory, you can use the following
shortcut:



```python
[/]
tools.staticdir.root = "/home/site"

[/static]
tools.staticdir.on = True
tools.staticdir.dir = "static"

```





By default, CherryPy will respond to the root of a static
directory with an 404 error indicating the path â/â was not found.
To specify an index file, you can use the following:



```python
[/static]
tools.staticdir.on = True
tools.staticdir.dir = "/home/site/static"
tools.staticdir.index = "index.html"

```


Assuming you have a file at `static/index.html`,
CherryPy will automatically respond to URLs such as
`http://hostname/static/` by returning its contents.




Using `"application/x-download"` response content-type,
you can tell a browser that a resource should be downloaded
onto the userâs machine rather than displayed.


You could for instance write a page handler as follows:



```python
from cherrypy.lib.static import serve_file

@cherrypy.expose
def download(self, filepath):
    return serve_file(filepath, "application/x-download", "attachment")

```


Assuming the filepath is a valid path on your machine, the
response would be considered as a downloadable content by
the browser.



Warning


The above page handler is a security risk on its own since any file
of the server could be accessed (if the user running the
server had permissions on them).






CherryPy has built-in support for JSON encoding and decoding
of the request and/or response.



To automatically decode the content of a request using JSON:



```python
class Root(object):
    @cherrypy.expose
    @cherrypy.tools.json_in()
    def index(self):
        data = cherrypy.request.json

```


The [`json`](https://docs.python.org/3/library/json.html#module-json "(in Python v3.11)") attribute attached to the request contains
the decoded content.




To automatically encode the content of a response using JSON:



```python
class Root(object):
    @cherrypy.expose
    @cherrypy.tools.json_out()
    def index(self):
        return {'key': 'value'}

```


CherryPy will encode any content returned by your page handler
using JSON. Not all type of objects may natively be
encoded.





CherryPy provides support for two very simple HTTP-based
authentication mechanisms, described in [**RFC 7616**](https://datatracker.ietf.org/doc/html/rfc7616.html) and [**RFC 7617**](https://datatracker.ietf.org/doc/html/rfc7617.html)
(which obsoletes [**RFC 2617**](https://datatracker.ietf.org/doc/html/rfc2617.html)): Basic and Digest. They are most
commonly known to trigger a browserâs popup asking users their name
and password.



Basic authentication is the simplest form of authentication however
it is not a secure one as the userâs credentials are embedded into
the request. We advise against using it unless you are running on
SSL or within a closed network.



```python
from cherrypy.lib import auth_basic

USERS = {'jon': 'secret'}

def validate_password(realm, username, password):
    if username in USERS and USERS[username] == password:
       return True
    return False

conf = {
   '/protected/area': {
       'tools.auth_basic.on': True,
       'tools.auth_basic.realm': 'localhost',
       'tools.auth_basic.checkpassword': validate_password,
       'tools.auth_basic.accept_charset': 'UTF-8',
    }
}

cherrypy.quickstart(myapp, '/', conf)

```


Simply put, you have to provide a function that will
be called by CherryPy passing the username and password
decoded from the request.


The function can read its data from any source it has to: a file,
a database, memory, etc.




Digest authentication differs by the fact the credentials
are not carried on by the request so itâs a little more secure
than basic.


CherryPyâs digest support has a similar interface to the
basic one explained above.



```python
from cherrypy.lib import auth_digest

USERS = {'jon': 'secret'}

conf = {
   '/protected/area': {
        'tools.auth_digest.on': True,
        'tools.auth_digest.realm': 'localhost',
        'tools.auth_digest.get_ha1': auth_digest.get_ha1_dict_plain(USERS),
        'tools.auth_digest.key': 'a565c27146791cfb',
        'tools.auth_digest.accept_charset': 'UTF-8',
   }
}

cherrypy.quickstart(myapp, '/', conf)

```




Thereâs also a low-level authentication for UNIX file and abstract
sockets. This is how you enable it:



```python
[global]
server.peercreds: True
server.peercreds_resolve: True
server.socket_file: /var/run/cherrypy.sock

```


`server.peercreds` enables looking up the connected process ID,
user ID and group ID. Theyâll be accessible as WSGI environment
variables:



> 
> * `X_REMOTE_PID`
> * `X_REMOTE_UID`
> * `X_REMOTE_GID`
> 
> 
> 


`server.peercreds_resolve` resolves that into user name and group
name. Theyâll be accessible as WSGI environment variables:



> 
> 





CherryPy serves its own sweet red cherrypy as the default
[favicon](http://en.wikipedia.org/wiki/Favicon) using the static file
tool. You can serve your own favicon as follows:



```python
import cherrypy

class HelloWorld(object):
   @cherrypy.expose
   def index(self):
       return "Hello World!"

if __name__ == '__main__':
    cherrypy.quickstart(HelloWorld(), '/',
        {
            '/favicon.ico':
            {
                'tools.staticfile.on': True,
                'tools.staticfile.filename': '/path/to/myfavicon.ico'
            }
        }
    )

```


Please refer to the [static serving](https://docs.cherrypy.dev/#staticontent) section
for more details.


You can also use a file to configure it:



```python
[/favicon.ico]
tools.staticfile.on: True
tools.staticfile.filename: "/path/to/myfavicon.ico"

```



```python
import cherrypy

class HelloWorld(object):
   @cherrypy.expose
   def index(self):
       return "Hello World!"

if __name__ == '__main__':
    cherrypy.quickstart(HelloWorld(), '/', "app.conf")

```







