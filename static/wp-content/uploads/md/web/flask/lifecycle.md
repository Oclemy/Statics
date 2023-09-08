For us, the interesting part of the steps above is when Flask gets called by the WSGI
server (or middleware). At that point, it will do quite a lot to handle the request and
generate the response. At the most basic, it will match the URL to a view function, call
the view function, and pass the return value back to the server. But there are many more
parts that you can use to customize its behavior.


1. WSGI server calls the Flask object, which calls [`Flask.wsgi_app()`](https://flask.palletsprojects.com/../api/#flask.Flask.wsgi_app "flask.Flask.wsgi_app").
2. A [`RequestContext`](https://flask.palletsprojects.com/../api/#flask.ctx.RequestContext "flask.ctx.RequestContext") object is created. This converts the WSGI `environ`
dict into a [`Request`](https://flask.palletsprojects.com/../api/#flask.Request "flask.Request") object. It also creates an `AppContext` object.
3. The [app context](https://flask.palletsprojects.com/../appcontext/) is pushed, which makes [`current_app`](https://flask.palletsprojects.com/../api/#flask.current_app "flask.current_app") and
[`g`](https://flask.palletsprojects.com/../api/#flask.g "flask.g") available.
4. The [`appcontext_pushed`](https://flask.palletsprojects.com/../api/#flask.appcontext_pushed "flask.appcontext_pushed") signal is sent.
5. The [request context](https://flask.palletsprojects.com/../reqcontext/) is pushed, which makes [`request`](https://flask.palletsprojects.com/../api/#flask.request "flask.request") and
[`session`](https://flask.palletsprojects.com/../api/#flask.session "flask.session") available.
6. The session is opened, loading any existing session data using the app’s
[`session_interface`](https://flask.palletsprojects.com/../api/#flask.Flask.session_interface "flask.Flask.session_interface"), an instance of [`SessionInterface`](https://flask.palletsprojects.com/../api/#flask.sessions.SessionInterface "flask.sessions.SessionInterface").
7. The URL is matched against the URL rules registered with the [`route()`](https://flask.palletsprojects.com/../api/#flask.Flask.route "flask.Flask.route")
decorator during application setup. If there is no match, the error - usually a 404,
405, or redirect - is stored to be handled later.
8. The [`request_started`](https://flask.palletsprojects.com/../api/#flask.request_started "flask.request_started") signal is sent.
9. Any [`url_value_preprocessor()`](https://flask.palletsprojects.com/../api/#flask.Flask.url_value_preprocessor "flask.Flask.url_value_preprocessor") decorated functions are called.
10. Any [`before_request()`](https://flask.palletsprojects.com/../api/#flask.Flask.before_request "flask.Flask.before_request") decorated functions are called. If any of
these function returns a value it is treated as the response immediately.
11. If the URL didn’t match a route a few steps ago, that error is raised now.
12. The [`route()`](https://flask.palletsprojects.com/../api/#flask.Flask.route "flask.Flask.route") decorated view function associated with the matched URL
is called and returns a value to be used as the response.
13. If any step so far raised an exception, and there is an [`errorhandler()`](https://flask.palletsprojects.com/../api/#flask.Flask.errorhandler "flask.Flask.errorhandler")
decorated function that matches the exception class or HTTP error code, it is
called to handle the error and return a response.
14. Whatever returned a response value - a before request function, the view, or an
error handler, that value is converted to a [`Response`](https://flask.palletsprojects.com/../api/#flask.Response "flask.Response") object.
15. Any [`after_this_request()`](https://flask.palletsprojects.com/../api/#flask.after_this_request "flask.after_this_request") decorated functions are called, then cleared.
16. Any [`after_request()`](https://flask.palletsprojects.com/../api/#flask.Flask.after_request "flask.Flask.after_request") decorated functions are called, which can modify
the response object.
17. The session is saved, persisting any modified session data using the app’s
[`session_interface`](https://flask.palletsprojects.com/../api/#flask.Flask.session_interface "flask.Flask.session_interface").
18. The [`request_finished`](https://flask.palletsprojects.com/../api/#flask.request_finished "flask.request_finished") signal is sent.
19. If any step so far raised an exception, and it was not handled by an error handler
function, it is handled now. HTTP exceptions are treated as responses with their
corresponding status code, other exceptions are converted to a generic 500 response.
The [`got_request_exception`](https://flask.palletsprojects.com/../api/#flask.got_request_exception "flask.got_request_exception") signal is sent.
20. The response object’s status, headers, and body are returned to the WSGI server.
21. Any [`teardown_request()`](https://flask.palletsprojects.com/../api/#flask.Flask.teardown_request "flask.Flask.teardown_request") decorated functions are called.
22. The [`request_tearing_down`](https://flask.palletsprojects.com/../api/#flask.request_tearing_down "flask.request_tearing_down") signal is sent.
23. The request context is popped, [`request`](https://flask.palletsprojects.com/../api/#flask.request "flask.request") and [`session`](https://flask.palletsprojects.com/../api/#flask.session "flask.session") are no longer
available.
24. Any [`teardown_appcontext()`](https://flask.palletsprojects.com/../api/#flask.Flask.teardown_appcontext "flask.Flask.teardown_appcontext") decorated functions are called.
25. The [`appcontext_tearing_down`](https://flask.palletsprojects.com/../api/#flask.appcontext_tearing_down "flask.appcontext_tearing_down") signal is sent.
26. The app context is popped, [`current_app`](https://flask.palletsprojects.com/../api/#flask.current_app "flask.current_app") and [`g`](https://flask.palletsprojects.com/../api/#flask.g "flask.g") are no longer
available.
27. The [`appcontext_popped`](https://flask.palletsprojects.com/../api/#flask.appcontext_popped "flask.appcontext_popped") signal is sent.


There are even more decorators and customization points than this, but that aren’t part
of every request lifecycle. They’re more specific to certain things you might use during
a request, such as templates, building URLs, or handling JSON data. See the rest of this
documentation, as well as the [API](https://flask.palletsprojects.com/../api/) to explore further.





