# Installation

CherryPy is a pure Python library. This has various consequences:

> -   It can run anywhere Python runs
>     
> -   It does not require a C compiler
>     
> -   It can run on various implementations of the Python language: [CPython](http://python.org/), [IronPython](http://ironpython.net/), [Jython](http://www.jython.org/) and [PyPy](http://pypy.org/)
>     



## Requirements

CherryPy does not have any mandatory env requirements. Python-based distribution requirements are installed automatically by `pip`. However certain features it comes with will require you install certain packages. To simplify installing additional dependencies CherryPy enables you to specify extras in your requirements (e.g. `cherrypy[json,routes_dispatcher,ssl]`):

-   doc – for documentation related stuff
    
-   json – for custom [JSON processing library](https://github.com/simplejson/simplejson)
    
-   routes_dispatcher – [routes](http://routes.readthedocs.org/en/latest/) for declarative URL mapping dispatcher
    
-   ssl – for [OpenSSL bindings](https://github.com/pyca/pyopenssl), useful in Python environments not having the builtin [`ssl`](https://docs.python.org/3/library/ssl.html#module-ssl "(in Python v3.11)") module
    
-   testing
    
-   memcached_session – enables [memcached](https://github.com/linsomniac/python-memcached) backend session
    
-   xcgi
    

## Supported python version

CherryPy supports Python 3.6 through to 3.11.

## Installing

CherryPy can be easily installed via common Python package managers such as setuptools or pip.

You may also get the latest CherryPy version by grabbing the source code from Github:

```shell
$ git clone https://github.com/cherrypy/cherrypy
$ cd cherrypy
$ python setup.py install

```

### Test your installation

CherryPy comes with a set of simple tutorials that can be executed once you have deployed the package.

```shell
$ python -m cherrypy.tutorial.tut01_helloworld

```

Point your browser at [http://127.0.0.1:8080](http://127.0.0.1:8080/) and enjoy the magic.

Once started the above command shows the following logs:

```shell
[15/Feb/2014:21:51:22] ENGINE Listening for SIGHUP.
[15/Feb/2014:21:51:22] ENGINE Listening for SIGTERM.
[15/Feb/2014:21:51:22] ENGINE Listening for SIGUSR1.
[15/Feb/2014:21:51:22] ENGINE Bus STARTING
[15/Feb/2014:21:51:22] ENGINE Started monitor thread 'Autoreloader'.
[15/Feb/2014:21:51:22] ENGINE Serving on http://127.0.0.1:8080
[15/Feb/2014:21:51:23] ENGINE Bus STARTED

```

We will explain what all those lines mean later on, but suffice to know that once you see the last two lines, your server is listening and ready to receive requests.

## Run it

During development, the easiest path is to run your application as follow:

As long as `myapp.py` defines a `"__main__"` section, it will run just fine.

### cherryd

Another way to run the application is through the `cherryd` script which is installed along side CherryPy.

Note

This utility command will not concern you if you embed your application with another framework.

#### Command-Line Options

-c, --config¶

Specify config file(s)

-d¶

Run the server as a daemon

-e, --environment¶

Apply the given config environment (defaults to None)

-f¶

Start a FastCGI server instead of the default HTTP server

-s¶

Start a SCGI server instead of the default HTTP server

-i, --import¶

Specify modules to import

-p, --pidfile¶

Store the process id in the given file (defaults to None)

-P, --Path¶

Add the given paths to sys.path
