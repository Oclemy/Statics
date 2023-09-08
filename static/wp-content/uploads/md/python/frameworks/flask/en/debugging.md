External debuggers, such as those provided by IDEs, can offer a more
powerful debugging experience than the built-in debugger. They can also
be used to step through code during a request before an error is raised,
or if no error is raised. Some even have a remote mode so you can debug
code running on another machine.


When using an external debugger, the app should still be in debug mode,
but it can be useful to disable the built-in debugger and reloader,
which can interfere.



```python
$ flask --app hello run --debug --no-debugger --no-reload

```


Disabling these isn’t required, an external debugger will continue to
work with the following caveats. If the built-in debugger is not
disabled, it will catch unhandled exceptions before the external
debugger can. If the reloader is not disabled, it could cause an
unexpected reload if code changes during debugging.





