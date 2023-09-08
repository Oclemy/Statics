# Tutorials — CherryPy 18.8.1.dev34+g6e3de374.d20230109 documentation


This tutorial will walk you through basic but complete CherryPy applications that will show you common concepts as well as slightly more advanced ones.


## Tutorial 1: A basic web application

The following example demonstrates the most basic application you could write with CherryPy. It starts a server and hosts an application that will be served at request reaching [http://127.0.0.1:8080/](http://127.0.0.1:8080/)

```python
 1import cherrypy
 2
 3
 4class HelloWorld(object):
 5    @cherrypy.expose
 6    def index(self):
 7        return "Hello world!"
 8
 9
10if __name__ == '__main__':
11    cherrypy.quickstart(HelloWorld())

```

Store this code snippet into a file named `tut01.py` and execute it as follows:

This will display something along the following:

```shell
 1[24/Feb/2014:21:01:46] ENGINE Listening for SIGHUP.
 2[24/Feb/2014:21:01:46] ENGINE Listening for SIGTERM.
 3[24/Feb/2014:21:01:46] ENGINE Listening for SIGUSR1.
 4[24/Feb/2014:21:01:46] ENGINE Bus STARTING
 5CherryPy Checker:
 6The Application mounted at '' has an empty config.
 7
 8[24/Feb/2014:21:01:46] ENGINE Started monitor thread 'Autoreloader'.
 9[24/Feb/2014:21:01:46] ENGINE Serving on http://127.0.0.1:8080
10[24/Feb/2014:21:01:46] ENGINE Bus STARTED

```

This tells you several things. The first three lines indicate the server will handle [`signal`](https://docs.python.org/3/library/signal.html#module-signal "(in Python v3.11)") for you. The next line tells you the current state of the server, as that point it is in `STARTING` stage. Then, you are notified your application has no specific configuration set to it. Next, the server starts a couple of internal utilities that we will explain later. Finally, the server indicates it is now ready to accept incoming communications as it listens on the address `127.0.0.1:8080`. In other words, at that stage your application is ready to be used.

Before moving on, let’s discuss the message regarding the lack of configuration. By default, CherryPy has a feature which will review the syntax correctness of settings you could provide to configure the application. When none are provided, a warning message is thus displayed in the logs. That log is harmless and will not prevent CherryPy from working. You can refer to [the documentation above](https://docs.cherrypy.dev/en/latest/basics.html#perappconf) to understand how to set the configuration.

## Tutorial 2: Different URLs lead to different functions

Your applications will obviously handle more than a single URL. Let’s imagine you have an application that generates a random string each time it is called:

```python
 1import random
 2import string
 3
 4import cherrypy
 5
 6
 7class StringGenerator(object):
 8    @cherrypy.expose
 9    def index(self):
10        return "Hello world!"
11
12    @cherrypy.expose
13    def generate(self):
14        return ''.join(random.sample(string.hexdigits, 8))
15
16
17if __name__ == '__main__':
18    cherrypy.quickstart(StringGenerator())

```

Save this into a file named `tut02.py` and run it as follows:

Go now to http://localhost:8080/generate and your browser will display a random string.

Let’s take a minute to decompose what’s happening here. This is the URL that you have typed into your browser: [http://localhost:8080/generate](http://localhost:8080/generate)

This URL contains various parts:

-   `http://` which roughly indicates it’s a URL using the HTTP protocol (see [**RFC 2616**](https://datatracker.ietf.org/doc/html/rfc2616.html)).

-   `localhost:8080` is the server’s address. It’s made of a hostname and a port.

-   `/generate` which is the path segment of the URL. This is what CherryPy uses to locate an [exposed](https://docs.cherrypy.dev/en/latest/glossary.html#term-exposed) function or method to respond.


Here CherryPy uses the [`index()`](https://docs.cherrypy.dev/en/latest/pkg/cherrypy.lib.covercp.html#cherrypy.lib.covercp.CoverStats.index "cherrypy.lib.covercp.CoverStats.index") method to handle `/` and the `generate()` method to handle `/generate`

## Tutorial 3: My URLs have parameters

In the previous tutorial, we have seen how to create an application that could generate a random string. Let’s now assume you wish to indicate the length of that string dynamically.

```python
 1import random
 2import string
 3
 4import cherrypy
 5
 6
 7class StringGenerator(object):
 8    @cherrypy.expose
 9    def index(self):
10        return "Hello world!"
11
12    @cherrypy.expose
13    def generate(self, length=8):
14        return ''.join(random.sample(string.hexdigits, int(length)))
15
16
17if __name__ == '__main__':
18    cherrypy.quickstart(StringGenerator())

```

Save this into a file named `tut03.py` and run it as follows:

Go now to [http://localhost:8080/generate?length=16](http://localhost:8080/generate?length=16) and your browser will display a generated string of length 16. Notice how we benefit from Python’s default arguments’ values to support URLs such as [http://localhost:8080/generate](http://localhost:8080/generate) still.

In a URL such as this one, the section after `?` is called a query-string. Traditionally, the query-string is used to contextualize the URL by passing a set of (key, value) pairs. The format for those pairs is `key=value`. Each pair being separated by a `&` character.

Notice how we have to convert the given [`length`](https://docs.cherrypy.dev/en/latest/pkg/cherrypy._cpreqbody.html#cherrypy._cpreqbody.Entity.length "cherrypy._cpreqbody.Entity.length") value to an integer. Indeed, values are sent out from the client to our server as strings.

Much like CherryPy maps URL path segments to exposed functions, query-string keys are mapped to those exposed function parameters.

## Tutorial 4: Submit this form

CherryPy is a web framework upon which you build web applications. The most traditional shape taken by applications is through an HTML user-interface speaking to your CherryPy server.

Let’s see how to handle HTML forms via the following example.

```python
 1import random
 2import string
 3
 4import cherrypy
 5
 6
 7class StringGenerator(object):
 8    @cherrypy.expose
 9    def index(self):
10        return """<html>
11          <head></head>
12          <body>
13            <form method="get" action="generate">
14              <input type="text" value="8" name="length" />
15              <button type="submit">Give it now!</button>
16            </form>
17          </body>
18        </html>"""
19
20    @cherrypy.expose
21    def generate(self, length=8):
22        return ''.join(random.sample(string.hexdigits, int(length)))
23
24
25if __name__ == '__main__':
26    cherrypy.quickstart(StringGenerator())

```

Save this into a file named `tut04.py` and run it as follows:

Go now to [http://localhost:8080/](http://localhost:8080/) and your browser and this will display a simple input field to indicate the length of the string you want to generate.

Notice that in this example, the form uses the `GET` method and when you pressed the `Give it now!` button, the form is sent using the same URL as in the [previous](https://docs.cherrypy.dev/en/latest/tutorials.html#tut03) tutorial. HTML forms also support the `POST` method, in that case the query-string is not appended to the URL but it sent as the body of the client’s request to the server. However, this would not change your application’s exposed method because CherryPy handles both the same way and uses the exposed’s handler parameters to deal with the query-string (key, value) pairs.

## Tutorial 5: Track my end-user’s activity

It’s not uncommon that an application needs to follow the user’s activity for a while. The usual mechanism is to use a [session identifier](http://en.wikipedia.org/wiki/Session_(computer_science)#HTTP_session_token) that is carried during the conversation between the user and your application.

```python
 1import random
 2import string
 3
 4import cherrypy
 5
 6
 7class StringGenerator(object):
 8    @cherrypy.expose
 9    def index(self):
10        return """<html>
11          <head></head>
12          <body>
13            <form method="get" action="generate">
14              <input type="text" value="8" name="length" />
15              <button type="submit">Give it now!</button>
16            </form>
17          </body>
18        </html>"""
19
20    @cherrypy.expose
21    def generate(self, length=8):
22        some_string = ''.join(random.sample(string.hexdigits, int(length)))
23        cherrypy.session['mystring'] = some_string
24        return some_string
25
26    @cherrypy.expose
27    def display(self):
28        return cherrypy.session['mystring']
29
30
31if __name__ == '__main__':
32    conf = {
33        '/': {
34            'tools.sessions.on': True
35        }
36    }
37    cherrypy.quickstart(StringGenerator(), '/', conf)

```

Save this into a file named `tut05.py` and run it as follows:

In this example, we generate the string as in the [previous](https://docs.cherrypy.dev/en/latest/tutorials.html#tut04) tutorial but also store it in the current session. If you go to [http://localhost:8080/](http://localhost:8080/), generate a random string, then go to [http://localhost:8080/display](http://localhost:8080/display), you will see the string you just generated.

The lines 30-34 show you how to enable the session support in your CherryPy application. By default, CherryPy will save sessions in the process’s memory. It supports more persistent [backends](https://docs.cherrypy.dev/en/latest/basics.html#basicsession) as well.

## Tutorial 6: What about my javascripts, CSS and images?

Web applications are usually also made of static content such as javascript, CSS files or images. CherryPy provides support to serve static content to end-users.

Let’s assume, you want to associate a stylesheet with your application to display a blue background color (why not?).

First, save the following stylesheet into a file named `style.css` and stored into a local directory `public/css`.

```css
1body {
2  background-color: blue;
3}

```

Now let’s update the HTML code so that we link to the stylesheet using the [http://localhost:8080/static/css/style.css](http://localhost:8080/static/css/style.css) URL.

```python
 1import os, os.path
 2import random
 3import string
 4
 5import cherrypy
 6
 7
 8class StringGenerator(object):
 9    @cherrypy.expose
10    def index(self):
11        return """<html>
12          <head>
13            <link href="/static/css/style.css" rel="stylesheet">
14          </head>
15          <body>
16            <form method="get" action="generate">
17              <input type="text" value="8" name="length" />
18              <button type="submit">Give it now!</button>
19            </form>
20          </body>
21        </html>"""
22
23    @cherrypy.expose
24    def generate(self, length=8):
25        some_string = ''.join(random.sample(string.hexdigits, int(length)))
26        cherrypy.session['mystring'] = some_string
27        return some_string
28
29    @cherrypy.expose
30    def display(self):
31        return cherrypy.session['mystring']
32
33
34if __name__ == '__main__':
35    conf = {
36        '/': {
37            'tools.sessions.on': True,
38            'tools.staticdir.root': os.path.abspath(os.getcwd())
39        },
40        '/static': {
41            'tools.staticdir.on': True,
42            'tools.staticdir.dir': './public'
43        }
44    }
45    cherrypy.quickstart(StringGenerator(), '/', conf)

```

Save this into a file named `tut06.py` and run it as follows:

Going to [http://localhost:8080/](http://localhost:8080/), you should be greeted by a flashy blue color.

CherryPy provides support to serve a single file or a complete directory structure. Most of the time, this is what you’ll end up doing so this is what the code above demonstrates. First, we indicate the [`root`](https://docs.cherrypy.dev/en/latest/pkg/cherrypy.html#cherrypy.Application.root "cherrypy.Application.root") directory of all of our static content. This must be an absolute path for security reason. CherryPy will complain if you provide only relative paths when looking for a match to your URLs.

Then we indicate that all URLs which path segment starts with `/static` will be served as static content. We map that URL to the `public` directory, a direct child of the [`root`](https://docs.cherrypy.dev/en/latest/pkg/cherrypy.html#cherrypy.Application.root "cherrypy.Application.root") directory. The entire sub-tree of the `public` directory will be served as static content. CherryPy will map URLs to path within that directory. This is why `/static/css/style.css` is found in `public/css/style.css`.

## Tutorial 7: Give us a REST

It’s not unusual nowadays that web applications expose some sort of datamodel or computation functions. Without going into its details, one strategy is to follow the [REST principles edicted by Roy T. Fielding](http://www.ibm.com/developerworks/library/ws-restful/index.html).

Roughly speaking, it assumes that you can identify a resource and that you can address that resource through that identifier.

“What for?” you may ask. Well, mostly, these principles are there to ensure that you decouple, as best as you can, the entities your application expose from the way they are manipulated or consumed. To embrace this point of view, developers will usually design a web API that expose pairs of `(URL, HTTP method, data, constraints)`.

Note

You will often hear REST and web API together. The former is one strategy to provide the latter. This tutorial will not go deeper in that whole web API concept as it’s a much more engaging subject, but you ought to read more about it online.

Lets go through a small example of a very basic web API mildly following REST principles.

```python
 1import random
 2import string
 3
 4import cherrypy
 5
 6
 7@cherrypy.expose
 8class StringGeneratorWebService(object):
 9
10    @cherrypy.tools.accept(media='text/plain')
11    def GET(self):
12        return cherrypy.session['mystring']
13
14    def POST(self, length=8):
15        some_string = ''.join(random.sample(string.hexdigits, int(length)))
16        cherrypy.session['mystring'] = some_string
17        return some_string
18
19    def PUT(self, another_string):
20        cherrypy.session['mystring'] = another_string
21
22    def DELETE(self):
23        cherrypy.session.pop('mystring', None)
24
25
26if __name__ == '__main__':
27    conf = {
28        '/': {
29            'request.dispatch': cherrypy.dispatch.MethodDispatcher(),
30            'tools.sessions.on': True,
31            'tools.response_headers.on': True,
32            'tools.response_headers.headers': [('Content-Type', 'text/plain')],
33        }
34    }
35    cherrypy.quickstart(StringGeneratorWebService(), '/', conf)

```

Save this into a file named `tut07.py` and run it as follows:

Before we see it in action, let’s explain a few things. Until now, CherryPy was creating a tree of exposed methods that were used to match URLs. In the case of our web API, we want to stress the role played by the actual requests’ HTTP methods. So we created methods that are named after them and they are all exposed at once by decorating the class itself with [`cherrypy.expose`](https://docs.cherrypy.dev/en/latest/pkg/cherrypy.html#cherrypy.expose "cherrypy.expose").

However, we must then switch from the default mechanism of matching URLs to method for one that is aware of the whole HTTP method shenanigan. This is what goes on line 27 where we create a `MethodDispatcher` instance.

Then we force the responses `content-type` to be `text/plain` and we finally ensure that `GET` requests will only be responded to clients that accept that `content-type` by having a `Accept: text/plain` header set in their request. However, we do this only for that HTTP method as it wouldn’t have much meaning on the other methods.

For the purpose of this tutorial, we will be using a Python client rather than your browser as we wouldn’t be able to actually try our web API otherwise.

Please install [requests](http://www.python-requests.org/en/latest/) through the following command:

Then fire up a Python terminal and try the following commands:

```python
 1>>> import requests
 2>>> s = requests.Session()
 3>>> r = s.get('http://127.0.0.1:8080/')
 4>>> r.status_code
 5500
 6>>> r = s.post('http://127.0.0.1:8080/')
 7>>> r.status_code, r.text
 8(200, u'04A92138')
 9>>> r = s.get('http://127.0.0.1:8080/')
10>>> r.status_code, r.text
11(200, u'04A92138')
12>>> r = s.get('http://127.0.0.1:8080/', headers={'Accept': 'application/json'})
13>>> r.status_code
14406
15>>> r = s.put('http://127.0.0.1:8080/', params={'another_string': 'hello'})
16>>> r = s.get('http://127.0.0.1:8080/')
17>>> r.status_code, r.text
18(200, u'hello')
19>>> r = s.delete('http://127.0.0.1:8080/')
20>>> r = s.get('http://127.0.0.1:8080/')
21>>> r.status_code
22500

```

The first and last `500` responses stem from the fact that, in the first case, we haven’t yet generated a string through `POST` and, on the latter case, that it doesn’t exist after we’ve deleted it.

Lines 12-14 show you how the application reacted when our client requested the generated string as a JSON format. Since we configured the web API to only support plain text, it returns the appropriate [HTTP error code](http://www.w3.org/Protocols/rfc2616/rfc2616-sec10.html#sec10.4.7).

Note

We use the [Session](http://www.python-requests.org/en/latest/user/advanced/#session-objects) interface of `requests` so that it takes care of carrying the session id stored in the request cookie in each subsequent request. That is handy.

Important

It’s all about RESTful URLs these days, isn’t it?

It is likely your URL will be made of dynamic parts that you will not be able to match to page handlers. For example, `/library/12/book/15` cannot be directly handled by the default CherryPy dispatcher since the segments `12` and `15` will not be matched to any Python callable.

This can be easily workaround with two handy CherryPy features explained in the [advanced section](https://docs.cherrypy.dev/en/latest/advanced.html#restful).

## Tutorial 8: Make it smoother with Ajax

In the recent years, web applications have moved away from the simple pattern of “HTML forms + refresh the whole page”. This traditional scheme still works very well but users have become used to web applications that don’t refresh the entire page. Broadly speaking, web applications carry code performed client-side that can speak with the backend without having to refresh the whole page.

This tutorial will involve a little more code this time around. First, let’s see our CSS stylesheet located in `public/css/style.css`.

```css
1body {
2  background-color: blue;
3}
4
5#the-string {
6  display: none;
7}

```

We’re adding a simple rule about the element that will display the generated string. By default, let’s not show it up. Save the following HTML code into a file named `index.html`.

```html
 1<!DOCTYPE html>
 2<html>
 3  <head>
 4    <link href="/static/css/style.css" rel="stylesheet">
 5    <script src="http://code.jquery.com/jquery-2.0.3.min.js"></script>
 6    <script type="text/javascript">
 7      $(document).ready(function() {
 8
 9        $("#generate-string").click(function(e) {
10          $.post("/generator", {"length": $("input[name='length']").val()})
11           .done(function(string) {
12            $("#the-string").show();
13            $("#the-string input").val(string);
14          });
15          e.preventDefault();
16        });
17
18        $("#replace-string").click(function(e) {
19          $.ajax({
20            type: "PUT",
21            url: "/generator",
22            data: {"another_string": $("#the-string input").val()}
23          })
24          .done(function() {
25            alert("Replaced!");
26          });
27          e.preventDefault();
28        });
29
30        $("#delete-string").click(function(e) {
31          $.ajax({
32            type: "DELETE",
33            url: "/generator"
34          })
35          .done(function() {
36            $("#the-string").hide();
37          });
38          e.preventDefault();
39        });
40
41      });
42    </script>
43  </head>
44  <body>
45    <input type="text" value="8" name="length"/>
46    <button id="generate-string">Give it now!</button>
47    <div id="the-string">
48      <input type="text" />
49      <button id="replace-string">Replace</button>
50      <button id="delete-string">Delete it</button>
51    </div>
52  </body>
53</html>

```

We’ll be using the [jQuery framework](http://jquery.com/) out of simplicity but feel free to replace it with your favourite tool. The page is composed of simple HTML elements to get user input and display the generated string. It also contains client-side code to talk to the backend API that actually performs the hard work.

Finally, here’s the application’s code that serves the HTML page above and responds to requests to generate strings. Both are hosted by the same application server.

```python
 1import os, os.path
 2import random
 3import string
 4
 5import cherrypy
 6
 7
 8class StringGenerator(object):
 9    @cherrypy.expose
10    def index(self):
11        return open('index.html')
12
13
14@cherrypy.expose
15class StringGeneratorWebService(object):
16
17    @cherrypy.tools.accept(media='text/plain')
18    def GET(self):
19        return cherrypy.session['mystring']
20
21    def POST(self, length=8):
22        some_string = ''.join(random.sample(string.hexdigits, int(length)))
23        cherrypy.session['mystring'] = some_string
24        return some_string
25
26    def PUT(self, another_string):
27        cherrypy.session['mystring'] = another_string
28
29    def DELETE(self):
30        cherrypy.session.pop('mystring', None)
31
32
33if __name__ == '__main__':
34    conf = {
35        '/': {
36            'tools.sessions.on': True,
37            'tools.staticdir.root': os.path.abspath(os.getcwd())
38        },
39        '/generator': {
40            'request.dispatch': cherrypy.dispatch.MethodDispatcher(),
41            'tools.response_headers.on': True,
42            'tools.response_headers.headers': [('Content-Type', 'text/plain')],
43        },
44        '/static': {
45            'tools.staticdir.on': True,
46            'tools.staticdir.dir': './public'
47        }
48    }
49    webapp = StringGenerator()
50    webapp.generator = StringGeneratorWebService()
51    cherrypy.quickstart(webapp, '/', conf)

```

Save this into a file named `tut08.py` and run it as follows:

Go to [http://127.0.0.1:8080/](http://127.0.0.1:8080/) and play with the input and buttons to generate, replace or delete the strings. Notice how the page isn’t refreshed, simply part of its content.

Notice as well how your frontend converses with the backend using a straightfoward, yet clean, web service API. That same API could easily be used by non-HTML clients.

## Tutorial 9: Data is all my life

Until now, all the generated strings were saved in the session, which by default is stored in the process memory. Though, you can persist sessions on disk or in a distributed memory store, this is not the right way of keeping your data on the long run. Sessions are there to identify your user and carry as little amount of data as necessary for the operation carried by the user.

To store, persist and query data you need a proper database server. There exist many to choose from with various paradigm support:

-   relational: PostgreSQL, SQLite, MariaDB, Firebird

-   column-oriented: HBase, Cassandra

-   key-store: redis, memcached

-   document oriented: Couchdb, MongoDB

-   graph-oriented: neo4j


Let’s focus on the relational ones since they are the most common and probably what you will want to learn first.

For the sake of reducing the number of dependencies for these tutorials, we will go for the `sqlite` database which is directly supported by Python.

Our application will replace the storage of the generated string from the session to a SQLite database. The application will have the same HTML code as [tutorial 08](https://docs.cherrypy.dev/en/latest/tutorials.html#tut08). So let’s simply focus on the application code itself:

```python
 1import os, os.path
 2import random
 3import sqlite3
 4import string
 5import time
 6
 7import cherrypy
 8
 9DB_STRING = "my.db"
10
11
12class StringGenerator(object):
13    @cherrypy.expose
14    def index(self):
15        return open('index.html')
16
17
18@cherrypy.expose
19class StringGeneratorWebService(object):
20
21    @cherrypy.tools.accept(media='text/plain')
22    def GET(self):
23        with sqlite3.connect(DB_STRING) as c:
24            cherrypy.session['ts'] = time.time()
25            r = c.execute("SELECT value FROM user_string WHERE session_id=?",
26                          [cherrypy.session.id])
27            return r.fetchone()
28
29    def POST(self, length=8):
30        some_string = ''.join(random.sample(string.hexdigits, int(length)))
31        with sqlite3.connect(DB_STRING) as c:
32            cherrypy.session['ts'] = time.time()
33            c.execute("INSERT INTO user_string VALUES (?, ?)",
34                      [cherrypy.session.id, some_string])
35        return some_string
36
37    def PUT(self, another_string):
38        with sqlite3.connect(DB_STRING) as c:
39            cherrypy.session['ts'] = time.time()
40            c.execute("UPDATE user_string SET value=? WHERE session_id=?",
41                      [another_string, cherrypy.session.id])
42
43    def DELETE(self):
44        cherrypy.session.pop('ts', None)
45        with sqlite3.connect(DB_STRING) as c:
46            c.execute("DELETE FROM user_string WHERE session_id=?",
47                      [cherrypy.session.id])
48
49
50def setup_database():
51    """
52    Create the `user_string` table in the database
53    on server startup
54    """
55    with sqlite3.connect(DB_STRING) as con:
56        con.execute("CREATE TABLE user_string (session_id, value)")
57
58
59def cleanup_database():
60    """
61    Destroy the `user_string` table from the database
62    on server shutdown.
63    """
64    with sqlite3.connect(DB_STRING) as con:
65        con.execute("DROP TABLE user_string")
66
67
68if __name__ == '__main__':
69    conf = {
70        '/': {
71            'tools.sessions.on': True,
72            'tools.staticdir.root': os.path.abspath(os.getcwd())
73        },
74        '/generator': {
75            'request.dispatch': cherrypy.dispatch.MethodDispatcher(),
76            'tools.response_headers.on': True,
77            'tools.response_headers.headers': [('Content-Type', 'text/plain')],
78        },
79        '/static': {
80            'tools.staticdir.on': True,
81            'tools.staticdir.dir': './public'
82        }
83    }
84
85    cherrypy.engine.subscribe('start', setup_database)
86    cherrypy.engine.subscribe('stop', cleanup_database)
87
88    webapp = StringGenerator()
89    webapp.generator = StringGeneratorWebService()
90    cherrypy.quickstart(webapp, '/', conf)

```

Save this into a file named `tut09.py` and run it as follows:

Let’s first see how we create two functions that create and destroy the table within our database. These functions are registered to the CherryPy’s server on lines 85-86, so that they are called when the server starts and stops.

Next, notice how we replaced all the session code with calls to the database. We use the session id to identify the user’s string within our database. Since the session will go away after a while, it’s probably not the right approach. A better idea would be to associate the user’s login or more resilient unique identifier. For the sake of our demo, this should do.

Important

In this example, we must still set the session to a dummy value so that the session is not [discarded](https://cherrypy.readthedocs.org/en/latest/pkg/cherrypy.lib.html?highlight=fixation#session-fixation-protection) on each request by CherryPy. Since we now use the database to store the generated string, we simply store a dummy timestamp inside the session.

Note

Unfortunately, sqlite in Python forbids us to share a connection between threads. Since CherryPy is a multi-threaded server, this would be an issue. This is the reason why we open and close a connection to the database on each call. This is clearly not really production friendly, and it is probably advisable to either use a more capable database engine or a higher level library, such as [SQLAlchemy](http://sqlalchemy.readthedocs.org/), to better support your application’s needs.

## Tutorial 10: Make it a modern single-page application with React.js

In the recent years, client-side single-page applications (SPA) have gradually eaten server-side generated content web applications’s lunch.

This tutorial demonstrates how to integrate with [React.js](https://facebook.github.io/react/), a Javascript library for SPA released by Facebook in 2013. Please refer to React.js documentation to learn more about it.

To demonstrate it, let’s use the code from [tutorial 09](https://docs.cherrypy.dev/en/latest/tutorials.html#tut09). However, we will be replacing the HTML and Javascript code.

First, let’s see how our HTML code has changed:

```html
 1 <!DOCTYPE html>
 2 <html>
 3    <head>
 4      <link href="/static/css/style.css" rel="stylesheet">
 5      <script src="https://cdnjs.cloudflare.com/ajax/libs/react/0.13.3/react.js"></script>
 6      <script src="http://code.jquery.com/jquery-2.1.1.min.js"></script>
 7      <script src="https://cdnjs.cloudflare.com/ajax/libs/babel-core/5.8.23/browser.min.js"></script>
 8    </head>
 9    <body>
10      <div id="generator"></div>
11      <script type="text/babel" src="static/js/gen.js"></script>
12    </body>
13 </html>

```

Basically, we have removed the entire Javascript code that was using jQuery. Instead, we load the React.js library as well as a new, local, Javascript module, named `gen.js` and located in the `public/js` directory:

```javascript
  1var StringGeneratorBox = React.createClass({
  2  handleGenerate: function() {
  3    var length = this.state.length;
  4    this.setState(function() {
  5      $.ajax({
  6        url: this.props.url,
  7        dataType: 'text',
  8        type: 'POST',
  9        data: {
 10          "length": length
 11        },
 12        success: function(data) {
 13          this.setState({
 14            length: length,
 15            string: data,
 16            mode: "edit"
 17          });
 18        }.bind(this),
 19        error: function(xhr, status, err) {
 20          console.error(this.props.url,
 21            status, err.toString()
 22          );
 23        }.bind(this)
 24      });
 25    });
 26  },
 27  handleEdit: function() {
 28    var new_string = this.state.string;
 29    this.setState(function() {
 30      $.ajax({
 31        url: this.props.url,
 32        type: 'PUT',
 33        data: {
 34          "another_string": new_string
 35        },
 36        success: function() {
 37          this.setState({
 38            length: new_string.length,
 39            string: new_string,
 40            mode: "edit"
 41          });
 42        }.bind(this),
 43        error: function(xhr, status, err) {
 44          console.error(this.props.url,
 45            status, err.toString()
 46          );
 47        }.bind(this)
 48      });
 49    });
 50  },
 51  handleDelete: function() {
 52    this.setState(function() {
 53      $.ajax({
 54        url: this.props.url,
 55        type: 'DELETE',
 56        success: function() {
 57          this.setState({
 58            length: "8",
 59            string: "",
 60            mode: "create"
 61          });
 62        }.bind(this),
 63        error: function(xhr, status, err) {
 64          console.error(this.props.url,
 65            status, err.toString()
 66          );
 67        }.bind(this)
 68      });
 69    });
 70  },
 71  handleLengthChange: function(length) {
 72    this.setState({
 73      length: length,
 74      string: "",
 75      mode: "create"
 76    });
 77  },
 78  handleStringChange: function(new_string) {
 79    this.setState({
 80      length: new_string.length,
 81      string: new_string,
 82      mode: "edit"
 83    });
 84  },
 85  getInitialState: function() {
 86    return {
 87      length: "8",
 88      string: "",
 89      mode: "create"
 90    };
 91  },
 92  render: function() {
 93    return (
 94      <div className="stringGenBox">
 95            <StringGeneratorForm onCreateString={this.handleGenerate}
 96                                 onReplaceString={this.handleEdit}
 97                                 onDeleteString={this.handleDelete}
 98                                 onLengthChange={this.handleLengthChange}
 99                                 onStringChange={this.handleStringChange}
100                                 mode={this.state.mode}
101                                 length={this.state.length}
102                                 string={this.state.string}/>
103      </div>
104    );
105  }
106});
107
108var StringGeneratorForm = React.createClass({
109  handleCreate: function(e) {
110    e.preventDefault();
111    this.props.onCreateString();
112  },
113  handleReplace: function(e) {
114    e.preventDefault();
115    this.props.onReplaceString();
116  },
117  handleDelete: function(e) {
118    e.preventDefault();
119    this.props.onDeleteString();
120  },
121  handleLengthChange: function(e) {
122    e.preventDefault();
123    var length = React.findDOMNode(this.refs.length).value.trim();
124    this.props.onLengthChange(length);
125  },
126  handleStringChange: function(e) {
127    e.preventDefault();
128    var string = React.findDOMNode(this.refs.string).value.trim();
129    this.props.onStringChange(string);
130  },
131  render: function() {
132    if (this.props.mode == "create") {
133      return (
134        <div>
135           <input  type="text" ref="length" defaultValue="8" value={this.props.length} onChange={this.handleLengthChange} />
136           <button onClick={this.handleCreate}>Give it now!</button>
137        </div>
138      );
139    } else if (this.props.mode == "edit") {
140      return (
141        <div>
142           <input type="text" ref="string" value={this.props.string} onChange={this.handleStringChange} />
143           <button onClick={this.handleReplace}>Replace</button>
144           <button onClick={this.handleDelete}>Delete it</button>
145        </div>
146      );
147    }
148
149    return null;
150  }
151});
152
153React.render(
154  <StringGeneratorBox url="/generator" />,
155  document.getElementById('generator')
156);

```

Wow! What a lot of code for something so simple, isn’t it? The entry point is the last few lines where we indicate that we want to render the HTML code of the `StringGeneratorBox` React.js class inside the `generator` div.

When the page is rendered, so is that component. Notice how it is also made of another component that renders the form itself.

This might be a little over the top for such a simple example but hopefully will get you started with React.js in the process.

There is not much to say and, hopefully, the meaning of that code is rather clear. The component has an internal [state](https://facebook.github.io/react/docs/interactivity-and-dynamic-uis.html) in which we store the current string as generated/modified by the user.

When the user [changes the content of the input boxes](https://facebook.github.io/react/docs/forms.html), the state is updated on the client side. Then, when a button is clicked, that state is sent out to the backend server using the API endpoint and the appropriate action takes places. Then, the state is updated and so is the view.

## Tutorial 11: Organize my code

CherryPy comes with a powerful architecture that helps you organizing your code in a way that should make it easier to maintain and more flexible.

Several mechanisms are at your disposal, this tutorial will focus on the three main ones:

-   [dispatchers](https://docs.cherrypy.dev/en/latest/extend.html#dispatchers)

-   [tools](https://docs.cherrypy.dev/en/latest/extend.html#tools)

-   [plugins](https://docs.cherrypy.dev/en/latest/extend.html#busplugins)


In order to understand them, let’s imagine you are at a superstore:

-   You have several tills and people queuing for each of them (those are your requests)

-   You have various sections with food and other stuff (these are your data)

-   Finally you have the superstore people and their daily tasks to make sure sections are always in order (this is your backend)


In spite of being really simplistic, this is not far from how your application behaves. CherryPy helps you structure your application in a way that mirrors these high-level ideas.

### Dispatchers

Coming back to the superstore example, it is likely that you will want to perform operations based on the till:

-   Have a till for baskets with less than ten items

-   Have a till for disabled people

-   Have a till for pregnant women

-   Have a till where you can only using the store card


To support these use-cases, CherryPy provides a mechanism called a [dispatcher](https://docs.cherrypy.dev/en/latest/extend.html#dispatchers). A dispatcher is executed early during the request processing in order to determine which piece of code of your application will handle the incoming request. Or, to continue on the store analogy, a dispatcher will decide which till to lead a customer to.

### Tools

Let’s assume your store has decided to operate a discount spree but, only for a specific category of customers. CherryPy will deal with such use case via a mechanism called a [tool](https://docs.cherrypy.dev/en/latest/extend.html#tools).

A tool is a piece of code that runs on a per-request basis in order to perform additional work. Usually a tool is a simple Python function that is executed at a given point during the process of the request by CherryPy.

### Plugins

As we have seen, the store has a crew of people dedicated to manage the stock and deal with any customers’ expectation.

In the CherryPy world, this translates into having functions that run outside of any request life-cycle. These functions should take care of background tasks, long lived connections (such as those to a database for instance), etc.

[Plugins](https://docs.cherrypy.dev/en/latest/extend.html#busplugins) are called that way because they work along with the CherryPy [engine](https://docs.cherrypy.dev/en/latest/extend.html#cpengine) and extend it with your operations.

## Tutorial 12: Using pytest and code coverage

### [Pytest](https://docs.cherrypy.dev/en/latest/tutorials.html#id19)[¶](https://docs.cherrypy.dev/en/latest/tutorials.html#pytest "Permalink to this heading")

Let’s revisit [Tutorial 2](https://docs.cherrypy.dev/en/latest/tutorials.html#tut02).

```python
 1import random
 2import string
 3
 4import cherrypy
 5
 6
 7class StringGenerator(object):
 8    @cherrypy.expose
 9    def index(self):
10        return "Hello world!"
11
12    @cherrypy.expose
13    def generate(self):
14        return ''.join(random.sample(string.hexdigits, 8))
15
16
17if __name__ == '__main__':
18    cherrypy.quickstart(StringGenerator())

```

Save this into a file named `tut12.py`.

Now make the test file:

```python
 1import cherrypy
 2from cherrypy.test import helper
 3
 4from tut12 import StringGenerator
 5
 6class SimpleCPTest(helper.CPWebCase):
 7    @staticmethod
 8    def setup_server():
 9        cherrypy.tree.mount(StringGenerator(), '/', {})
10
11    def test_index(self):
12        self.getPage("/")
13        self.assertStatus('200 OK')
14    def test_generate(self):
15        self.getPage("/generate")
16        self.assertStatus('200 OK')

```

Save this into a file named `test_tut12.py` and run

```shell
$ pytest -v test_tut12.py

```

Note

If you don’t have [pytest](https://pytest.org/) installed, you’ll need to install it by `pip install pytest`

We now have a neat way that we can exercise our application making tests.

### Adding Code Coverage]

To get code coverage, simply run

```shell
$ pytest --cov=tut12 --cov-report term-missing test_tut12.py

```

This tells us that one line is missing. Of course it is because that is only executed when the python program is started directly. We can simply change the following lines in `tut12.py`:

```shell
17if __name__ == '__main__':  # pragma: no cover
18    cherrypy.quickstart(StringGenerator())

```

When you rerun the code coverage, it should show 100% now.

Note

When using in CI, you might want to integrate [Codecov](https://codecov.io/), [Landscape](https://landscape.io/) or [Coveralls](https://coveralls.io/) into your project to store and track coverage data over time.
