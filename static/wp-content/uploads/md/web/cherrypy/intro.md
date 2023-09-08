
## Why CherryPy?


CherryPy is among the oldest web framework available for Python, yet many people arenât aware of its existence.
One of the reason for this is that CherryPy is not a complete stack with built-in support for a multi-tier architecture.
It doesnât provide frontend utilities nor will it tell you how to speak with your storage. Instead, CherryPyâs take
is to let the developer make those decisions. This is a contrasting position compared to other well-known frameworks.


CherryPy has a clean interface and does its best to stay out of your way whilst providing
a reliable scaffolding for you to build from.


Typical use-cases for CherryPy go from regular web application with user frontends
(think blogging, CMS, portals, ecommerce) to web-services only.


Here are some reasons you would want to choose CherryPy:


1. Simplicity


Developing with CherryPy is a simple task. âHello, worldâ is only a few lines long, and does not require the developer to learn the entire (albeit very manageable) framework all at once. The framework is very pythonic; that is, it follows Pythonâs conventions very nicely (code is sparse and clean).


Contrast this with J2EE and Pythonâs most popular and visible web frameworks: Django, Zope, Pylons, and Turbogears. In all of them, the learning curve is massive. In these frameworks, âHello, worldâ requires the programmer to set up a large scaffold which spans multiple files and to type a lot of boilerplate code. CherryPy succeeds because it does not include the bloat of other frameworks, allowing the programmer to write their web application quickly while still maintaining a high level of organization and scalability.


CherryPy is also very modular. The core is fast and clean, and extension features are easy to write and plug in using code or the elegant config system. The primary components (server, engine, request, response, etc.) are all extendable (even replaceable) and well-managed.


In short, CherryPy empowers the developer to work with the framework, not against or around it.
2. Power


CherryPy leverages all of the power of Python. Python is a dynamic language which allows for rapid development of applications. Python also has an extensive built-in API which simplifies web app development. Even more extensive, however, are the third-party libraries available for Python. These range from object-relational mappers to form libraries, to an automatic Python optimizer, a Windows exe generator, imaging libraries, email support, HTML templating engines, etc. CherryPy applications are just like regular Python applications. CherryPy does not stand in your way if you want to use these brilliant tools.


CherryPy also provides [tools](https://docs.cherrypy.dev/extend.html#tools) and [plugins](https://docs.cherrypy.dev/extend.html#busplugins), which are powerful extension points needed to develop world-class web applications.
3. Maturity


Maturity is extremely important when developing a real-world application. Unlike many other web frameworks, CherryPy has had many final, stable releases. It is fully bugtested, optimized, and proven reliable for real-world use. The API will not suddenly change and break backwards compatibility, so your applications are assured to continue working even through subsequent updates in the current version series.


CherryPy is also a â3.0â project: the first edition of CherryPy set the tone, the second edition made it work, and the third edition makes it beautiful. Each version built on lessons learned from the previous, bringing the developer a superior tool for the job.
4. Community


CherryPy has an devoted community that develops deployed CherryPy applications and are willing and ready to assist you on the CherryPy mailing list or Gitter. The developers also frequent the list and often answer questions and implement features requested by the end-users.
5. Deployability


Unlike many other Python web frameworks, there are cost-effective ways to deploy your CherryPy application.


Out of the box, CherryPy includes its own production-ready HTTP server to host your application. CherryPy can also be deployed on any WSGI-compliant gateway (a technology for interfacing numerous types of web servers): mod_wsgi, FastCGI, SCGI, IIS, uwsgi, tornado, etc. Reverse proxying is also a common and easy way to set it up.


In addition, CherryPy is pure-python and is compatible with Python 2.3. This means that CherryPy will run on all major platforms that Python will run on (Windows, MacOSX, Linux, BSD, etc).


[webfaction.com](https://www.webfaction.com), run by the inventor of CherryPy, is a commercial web host that offers CherryPy hosting packages (in addition to several others).
6. Itâs free!


All of CherryPy is licensed under the open-source BSD license, which means CherryPy can be used commercially for ZERO cost.
7. Where to go from here?


Check out the [tutorials](https://docs.cherrypy.dev/tutorials.html#tutorials) to start enjoying the fun!




## Success Stories


You are interested in CherryPy but you would like to hear more from people
using it, or simply check out products or application running it.


If you would like to have your CherryPy powered website or product listed here,
contact us via our [mailing list](http://groups.google.com/group/cherrypy-users)
or [Gitter](https://gitter.im/cherrypy/cherrypy).



### Websites running atop CherryPy


[Hulu Deejay and Hulu Sod](http://tech.hulu.com/blog/2013/03/13/python-and-hulu) - Hulu uses
CherryPy for some projects.
âThe service needs to be very high performance.
Python, together with CherryPy,
[gunicorn](http://gunicorn.org), and gevent more than provides for this.â


[Netflix](http://techblog.netflix.com/2013/03/python-at-netflix.html) - Netflix uses CherryPy as a building block in their infrastructure: âRestful APIs to
large applications with requests, providing web interfaces with CherryPy and Bottle,
and crunching data with scipy.â


[Urbanility](http://urbanility.com) - French website for local neighbourhood assets in Rennes, France.


[MROP Supply](https://www.mropsupply.com) - Webshop for industrial equipment,
developed using CherryPy 3.2.2 utilizing Python 3.2,
with libs: [Jinja2-2.6](http://jinja.pocoo.org/docs), davispuh-MySQL-for-Python-3-3403794,
pyenchant-1.6.5 (for search spelling).
âIâm coming over from .net development and found Python and CherryPy to
be surprisingly minimalistic. No unnecessary overhead - build everything you
need without the extra fluff. Iâm a fan!â


[CherryMusic](http://www.fomori.org/cherrymusic) - A music streaming server written in python:
Stream your own music collection to all your devices! CherryMusic is open source.


[YouGov Global](http://www.yougov.com) - International market research firm, conducts
millions of surveys on CherryPy yearly.


[Aculab Cloud](http://cloud.aculab.com) - Voice and fax applications on the cloud.
A simple telephony API for Python, C#, C++, VB, etcâ¦
The website and all front-end and back-end web services are built with CherryPy,
fronted by nginx (just handling the ssh and reverse-proxy), and running on AWS in two regions.


[Learnit Training](http://www.learnit.nl) - Dutch website for an IT, Management and
Communication training company. Built on CherryPy 3.2.0 and Python 2.7.3, with
[oursql](http://pythonhosted.org/oursql) and
[DBUtils](http://www.webwareforpython.org/DBUtils) libraries, amongst others.


[Linstic](http://linstic.com) - Sticky Notes in your browser (with linking).


[Almadâs Homepage](http://www.almad.net) - Simple homepage with blog.


[Fight.Watch](http://fight.watch) - Twitch.tv web portal for fighting games.
Built on CherryPy 3.3.0 and Python 2.7.3 with Jinja 2.7.2 and SQLAlchemy 0.9.4.




### Products based on CherryPy


[SABnzbd](http://sabnzbd.org) - Open Source Binary Newsreader written in Python.


[Headphones](https://github.com/rembo10/headphones) - Third-party add-on for SABnzbd.


[SickBeard](http://sickbeard.com) - âSick Beard is a PVR for newsgroup users (with limited torrent support). It watches for new episodes of your favorite shows and when they are posted it downloads them, sorts and renames them, and optionally generates metadata for them.â


[TurboGears](http://www.turbogears.org) - The rapid web development megaframework. Turbogears 1.x used Cherrypy. âCherryPy is the underlying application server for TurboGears. It is responsible for taking the requests from the userÃ¢â¬â¢s browser, parses them and turns them into calls into the Python code of the web application. Its role is similar to application servers used in other programming languagesâ.


[Indigo](http://www.perceptiveautomation.com/indigo/index.html) - âAn intelligent home control
server that integrates home control hardware modules to provide control of your home. Indigoâs built-in
Web server and client/server architecture give you control and access to your home remotely from
other Macs, PCs, internet tablets, PDAs, and mobile phones.â


[SlikiWiki](http://www.sf.net/projects/slikiwiki) - Wiki built on CherryPy and featuring WikiWords, automatic backlinking, site map generation, full text search, locking for concurrent edits, RSS feed embedding, per page access control lists, and page formatting using PyTextile markup.â


[read4me](http://sourceforge.net/projects/read4me) - read4me is a Python feed-reading web service.


[Firebird QA tools](http://www.firebirdsql.org/en/quality-assurance) - Firebird QA tools are based on CherryPy.


[salt-api](https://github.com/saltstack/salt-api) - A REST API for Salt, the infrastructure orchestration tool.




### Products inspired by CherryPy


[OOWeb](http://ooweb.sourceforge.net/) - âOOWeb is a lightweight, embedded HTTP server for Java applications that maps objects to URL directories, methods to pages and form/querystring arguments as method parameters. OOWeb was originally inspired by CherryPy.â







