
# Third Party Packages


Starlette has a rapidly growing community of developers, building tools that integrate into Starlette, tools that depend on Starlette, etc.


Here are some of those third party packages:


## Backports


### Python 3.5 port


GitHub


## Plugins


### Authlib


GitHub |
Documentation


The ultimate Python library in building OAuth and OpenID Connect clients and servers. Check out how to integrate with Starlette.


### ChannelBox


GitHub


Another solution for websocket broadcast. Send messages to channel groups from any part of your code.
Checkout MySimpleChat, a simple chat application built using `channel-box` and `starlette`.


### Imia


GitHub


An authentication framework for Starlette with pluggable authenticators and login/logout flow.


### Mangum


GitHub


Serverless ASGI adapter for AWS Lambda & API Gateway.


### Nejma


GitHub


Manage and send messages to groups of channels using websockets.
Checkout nejma-chat, a simple chat application built using `nejma` and `starlette`.


### Scout APM


GitHub


An APM (Application Performance Monitoring) solution that can
instrument your application to find performance bottlenecks.


### SpecTree


GitHub


Generate OpenAPI spec document and validate request & response with Python annotations. Less boilerplate code(no need for YAML).


### Starlette APISpec


GitHub


Simple APISpec integration for Starlette.
Document your REST API built with Starlette by declaring OpenAPI (Swagger)
schemas in YAML format in your endpoint's docstrings.


### Starlette Context


GitHub


Middleware for Starlette that allows you to store and access the context data of a request.
Can be used with logging so logs automatically use request headers such as x-request-id or x-correlation-id.


### Starlette Cramjam


GitHub


A Starlette middleware that allows **brotli**, **gzip** and **deflate** compression algorithm with a minimal requirements.


### Starlette OAuth2 API


GitLab


A starlette middleware to add authentication and authorization through JWTs.
It relies solely on an auth provider to issue access and/or id tokens to clients.


### Starlette Prometheus


GitHub


A plugin for providing an endpoint that exposes Prometheus metrics based on its official python client.


### Starlette WTF


GitHub


A simple tool for integrating Starlette and WTForms. It is modeled on the excellent Flask-WTF library.


### Starlette-Login


GitHub |
Documentation


User session management for Starlette. 
It handles the common tasks of logging in, logging out, and remembering your users' sessions over extended periods of time.


### Starsessions


GitHub


An alternate session support implementation with customizable storage backends.


### webargs-starlette


GitHub


Declarative request parsing and validation for Starlette, built on top
of webargs.


Allows you to parse querystring, JSON, form, headers, and cookies using
type annotations.


### DecoRouter


GitHub


FastAPI style routing for Starlette.


Allows you to use decorators to generate routing tables.


### Starception


GitHub


Beautiful exception page for Starlette apps.


### Starlette-Admin


GitHub |
Documentation


Simple and extensible admin interface framework.


Built with Tabler and Datatables, it allows you 
to quickly generate fully customizable admin interface for your models. You can export your data to many formats (*CSV*, *PDF*,
*Excel*, etc), filter your data with complex query including `AND` and `OR` conditions, upload files, ...


## Starlette Bridge


GitHub |
Documentation


With the deprecation of `on_startup` and `on_shutdown`, Starlette Bridge makes sure you can still
use the old ways of declaring events with a particularity that internally, in fact, creates the
`lifespan` for you. This way backwards compatibility is assured for the existing packages out there
while maintaining the integrity of the newly `lifespan` events of `Starlette`.


## Frameworks


### FastAPI


GitHub |
Documentation


High performance, easy to learn, fast to code, ready for production web API framework.
Inspired by **APIStar**'s previous server system with type declarations for route parameters, based on the OpenAPI specification version 3.0.0+ (with JSON Schema), powered by **Pydantic** for the data handling.


### Esmerald


GitHub |
Documentation


Highly scalable, performant, easy to learn, easy to code and for every application web framework.
Inspired by a lot of frameworks out there, Esmerald provides what every application needs, from the
smallest to complex. Includes, routes, middlewares, permissions, scheduler, interceptors and lot more.


Powered by **Starlette** and **Pydantic** with OpenAPI specification.


### Flama


GitHub |
Documentation


Flama is a **data-science oriented framework** to rapidly build modern and robust **machine learning** (ML) APIs. The main aim of the framework is to make ridiculously simple the deployment of ML APIs. With Flama, data scientists can now quickly turn their ML models into asynchronous, auto-documented APIs with just a single line of code. All in just few seconds! 


Flama comes with an intuitive CLI, and provides an easy-to-learn philosophy to speed up the building of **highly performant** GraphQL, REST, and ML APIs. Besides, it comprises an ideal solution for the development of asynchronous and **production-ready** services, offering **automatic deployment** for ML models. 


### Greppo


GitHub |
Documentation


A Python framework for building geospatial dashboards and web-applications.


Greppo is an open-source Python framework that makes it easy to build geospatial dashboards and web-applications. It provides a toolkit to quickly integrate data, algorithms, visualizations and UI for interactivity. It provides APIs to the update the variables in the backend, recompute the logic, and reflect the changes in the frontend (data mutation hook).


### Responder


GitHub |
Documentation


Async web service framework. Some Features: flask-style route expression,
yaml support, OpenAPI schema generation, background tasks, graphql.


### Starlette-apps


Roll your own framework with a simple app system, like Django-GDAPS or CakePHP.


GitHub


### Dark Star


A simple framework to help minimise the code needed to get HTML to the browser. Changes your file paths into Starlette routes and puts your view code right next to your template. Includes support for htmx to help enhance your frontend.


Docs
GitHub


### Xpresso


A flexible and extendable web framework built on top of Starlette, Pydantic and di.


GitHub |
Documentation


### Ellar


GitHub |
Documentation


Ellar is an ASGI web framework for building fast, efficient and scalable RESTAPIs and server-side applications. It offers a high level of abstraction in building server-side applications and combines elements of OOP (Object Oriented Programming), and FP (Functional Programming) - Inspired by Nestjs.


It is built on 3 core libraries **Starlette**, **Pydantic**, and **injector**.


### Apiman


An extension to integrate Swagger/OpenAPI document easily for Starlette project and provide SwaggerUI and RedocUI.


GitHub


### Starlette-Babel


Provides translations, localization, and timezone support via Babel integration.


GitHub



