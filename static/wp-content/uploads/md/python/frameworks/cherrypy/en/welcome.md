# CherryPy

> A Minimalist Python Web Framework — CherryPy 18.8.1.dev34+g6e3de374.d20230109 documentation.

[CherryPy](http://www.cherrypy.dev/) is a pythonic, object-oriented web framework.

CherryPy allows developers to build web applications in much the same way they would build any other object-oriented Python program. This results in smaller source code developed in less time.

CherryPy is now more than ten years old and it is has proven to be fast and reliable. It is being used in production by many sites, from the simplest to the most demanding.

A CherryPy application typically looks like this:

```python
import cherrypy

class HelloWorld(object):
    @cherrypy.expose
    def index(self):
        return "Hello World!"

cherrypy.quickstart(HelloWorld())

```

In order to make the most of CherryPy, you should start with the [tutorials](https://docs.cherrypy.dev/en/latest/tutorials.html#tutorials) that will lead you through the most common aspects of the framework. Once done, you will probably want to browse through the [basics](https://docs.cherrypy.dev/en/latest/basics.html#basics) and [advanced](https://docs.cherrypy.dev/en/latest/advanced.html#advanced) sections that will demonstrate how to implement certain operations. Finally, you will want to carefully read the configuration and [extend](https://docs.cherrypy.dev/en/latest/extend.html#extend) sections that go in-depth regarding the powerful features provided by the framework.

Above all, have fun with your application!
