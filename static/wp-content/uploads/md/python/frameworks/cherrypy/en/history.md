
# History



## v18.6.1


03 Jul 2021


* [#1849](https://github.com/cherrypy/cherrypy/issues/1849) via [PR #1879](https://github.com/cherrypy/cherrypy/pull/1879): Fixed XLF flag in gzip header
emitted by gzip compression tool per
[**RFC 1952#section-2.3.1**](https://datatracker.ietf.org/doc/html/rfc1952.html#section-2.3.1) â by [@webknjaz](https://github.com/sponsors/webknjaz).
* [#1874](https://github.com/cherrypy/cherrypy/issues/1874): Restricted depending on pywin32 only under
CPython so that it wonât get pulled-in under PyPy
â by [@webknjaz](https://github.com/sponsors/webknjaz).
* [#1920](https://github.com/cherrypy/cherrypy/issues/1920): Bumped minimum version of PyWin32 to 227.
Block pywin32 install on Python 3.10 and later.




## v18.4.0


03 Nov 2019


* [PR #1715](https://github.com/cherrypy/cherrypy/pull/1715): Fixed issue in cpstats where the `data/` endpoint
would fail with encoding errors on Python 3.
* [PR #1821](https://github.com/cherrypy/cherrypy/pull/1821): Simplify the passthrough of parameters to
`CPWebCase.getPage` to cheroot. CherryPy now requires
cheroot 8.2.1 or later.




## v18.2.0


03 Sep 2019


* File-based sessions no longer attempt to remove the lock files
when releasing locks, instead deferring to the default behavior
of zc.lockfile. Fixes [#1391](https://github.com/cherrypy/cherrypy/issues/1391) and [#1779](https://github.com/cherrypy/cherrypy/issues/1779).
* [PR #1794](https://github.com/cherrypy/cherrypy/pull/1794): Add native support for `308 Permanent Redirect`
usable via `raise cherrypy.HTTPRedirect('/new_uri', 308)`.




## v17.4.0


19 Aug 2018


* [a95e619f](https://github.com/cherrypy/cherrypy/commit/a95e619f): When setting Response Body, reject Unicode
values, making behavior on Python 2 same as on Python 3.
* Other inconsequential refactorings.




## v16.0.2


18 Jun 2018


* [#1716](https://github.com/cherrypy/cherrypy/issues/1716) via [PR #1717](https://github.com/cherrypy/cherrypy/pull/1717): Fixed handling of url-encoded parameters
in digest authentication handling, correcting regression in v14.2.0.
* [#1719](https://github.com/cherrypy/cherrypy/issues/1719) via [1d41828](https://github.com/cherrypy/cherrypy/commit/1d41828): Digest-auth tool will now return
a status code of 401 for when a scheme other than âdigestâ is
indicated.




## v16.0.0


16 Jun 2018


* [#1688](https://github.com/cherrypy/cherrypy/issues/1688) via [38ad1da](https://github.com/cherrypy/cherrypy/commit/38ad1da): Removed `basic_auth` and
`digest_auth` tools and the `httpauth` module, which have been
officially deprecated earlier in v14.0.0.
* Removed deprecated properties:
* [#1377](https://github.com/cherrypy/cherrypy/issues/1377): In _cp_native server, set `req.status` using bytes
(fixed in [PR #1712](https://github.com/cherrypy/cherrypy/pull/1712)).
* [#1697](https://github.com/cherrypy/cherrypy/issues/1697) via [841f795](https://github.com/cherrypy/cherrypy/commit/841f795): Fixed error on Python 3.7 with
AutoReloader when `__file__` is `None`.
* [#1713](https://github.com/cherrypy/cherrypy/issues/1713) via [15aa80d](https://github.com/cherrypy/cherrypy/commit/15aa80d): Fix warning emitted during
test run.
* [#1370](https://github.com/cherrypy/cherrypy/issues/1370) via [38f199c](https://github.com/cherrypy/cherrypy/commit/38f199c): Fail with HTTP 400 for invalid
headers.




## v14.1.0


19 Apr 2018


* [Cheroot PR #37](https://github.com/cherrypy/cheroot/pull/37): Add support for peercreds lookup over UNIX domain socket.
This enables app to automatically identify âwhoâs on the other
end of the wireâ.


This is how you enable it:



```python
server.peercreds: True
server.peercreds_resolve: True

```


The first option will put remote numeric data to WSGI env vars:
appâs PID, userâs id and group.


Second option will resolve that into user and group names.


To prevent expensive syscalls, data is cached on per connection
basis.




## v14.0.0


04 Feb 2018


* [#1688](https://github.com/cherrypy/cherrypy/issues/1688): Officially deprecated `basic_auth` and `digest_auth`
tools and the `httpauth` module, triggering DeprecationWarnings
if theyâre used. Applications should instead adapt to use the
more recent `auth_basic` and `auth_digest` tools.
This deprecated functionality will be removed in a subsequent
release soon.
* Removed `DeprecatedTool` and the long-deprecated and disabled
`tidy` and `nsgmls` tools. See [the rationale](https://github.com/cherrypy/cherrypy/pull/1689#issuecomment-362924962)
for this change.




## v13.1.0


17 Dec 2017


* [#1231](https://github.com/cherrypy/cherrypy/issues/1231) via [PR #1654](https://github.com/cherrypy/cherrypy/pull/1654): CaseInsensitiveDict now re-uses the
generalized functionality from `jaraco.collections` to
provide a more complete interface for a CaseInsensitiveDict
and HeaderMap.


Users are encouraged to use the implementation from
[jaraco.collections](https://pypi.org/project/jaraco.collections)
except when dealing with headers in CherryPy.




## v12.0.0


17 Nov 2017


* Drop support for Python 3.1 and 3.2.
* [#1625](https://github.com/cherrypy/cherrypy/issues/1625): Removed response timeout and timeout monitor and
related exceptions, as it not possible to interrupt a request.
Servers that wish to exit a request prematurely are
recommended to monitor `response.time` and raise an
exception or otherwise act accordingly.


Servers that previously disabled timeouts by invoking
`cherrypy.engine.timeout_monitor.unsubscribe()` will now
crash. For forward-compatibility with this release on older
versions of CherryPy, disable
timeouts using the config option:



```python
'engine.timeout_monitor.on': False,

```


Or test for the presence of the timeout_monitor attribute:



```python
with contextlib2.suppress(AttributeError):
    cherrypy.engine.timeout_monitor.unsubscribe()

```


Additionally, the `TimeoutError` exception has been removed,
as itâs no longer called anywhere. If your application
benefits from this Exception, please comment in the linked
ticket describing the use case, and weâll help devise a
solution or bring the exception back.




## v11.2.0


13 Nov 2017


* `cherrypy.engine.subscribe` now may be called without a
callback, in which case it returns a decorator expecting the
callback.
* [PR #1656](https://github.com/cherrypy/cherrypy/pull/1656): Images are now compressed using lossless compression
and consume less space.




## v11.1.0


28 Oct 2017


* [PR #1611](https://github.com/cherrypy/cherrypy/pull/1611): Expose default status logic for a redirect as
`HTTPRedirect.default_status`.
* [PR #1615](https://github.com/cherrypy/cherrypy/pull/1615): `HTTPRedirect.status` is now an instance property and
derived from the value in `args`. Although it was previously
possible to set the property on an instance, and this change
prevents that possibilty, CherryPy never relied on that behavior
and we presume no applications depend on that interface.
* [#1627](https://github.com/cherrypy/cherrypy/issues/1627): Fixed issue in proxy tool where more than one port would
appear in the `request.base` and thus in `cherrypy.url`.
* [PR #1645](https://github.com/cherrypy/cherrypy/pull/1645): Added new log format markers:


	+ `i` holds a per-request UUID4
	+ `z` outputs UTC time in format of RFC 3339
	+ `cherrypy._cprequest.Request.unique_id.uuid4` now has lazily
	invocable UUID4
* [#1646](https://github.com/cherrypy/cherrypy/issues/1646): Improve http status conversion helper.
* [PR #1638](https://github.com/cherrypy/cherrypy/pull/1638): Always use backslash for path separator when processing
paths in staticdir.
* [#1190](https://github.com/cherrypy/cherrypy/issues/1190): Fix gzip, caching, and staticdir tools integration. Makes
cache of gzipped content valid.
* Requires cheroot 5.8.3 or later.
* Also, many improvements around continuous integration and code
quality checks.


This release contained an unintentional regression in environments that
are hostile to namespace packages, such as Pex, Celery, and py2exe.
See [PR #1671](https://github.com/cherrypy/cherrypy/pull/1671) for details.




## v10.2.0


12 Mar 2017


* [PR #1580](https://github.com/cherrypy/cherrypy/pull/1580): `CPWSGIServer.version` now reported as
`CherryPy/x.y.z Cheroot/x.y.z`. Bump to cheroot 5.2.0.
* The codebase is now [**PEP 8**](https://peps.python.org/pep-0008/) complaint, flake8 linter is [enabled in TravisCI by
default](https://github.com/cherrypy/cherrypy/commit/b6e752b).
* Max line restriction is now set to 120 for flake8 linter.
* [**PEP 257**](https://peps.python.org/pep-0257/) linter runs as separate allowed failure job in Travis CI.
* A few bugs related to undeclared variables have been fixed.
* `pre-commit` testing goes faster due to enabled caching.




## v8.9.0


13 Jan 2017


* [PR #1547](https://github.com/cherrypy/cherrypy/pull/1547): Replaced `cherryd` distutils script with a setuptools
console entry point.


When running CherryPy in daemon mode, the forked process no
longer changes directory to `/`. If that behavior is something
on which your application relied and should rely, please file
a ticket with the project.




## v8.5.0


26 Dec 2016


* The pyOpenSSL support is now included on Python 3 builds,
removing the last disparity between Python 2 and Python 3
in the CherryPy package. This change is one small step
in consideration of [#1399](https://github.com/cherrypy/cherrypy/issues/1399). This change also fixes RPM
builds, as reported in [#1149](https://github.com/cherrypy/cherrypy/issues/1149).




## v8.1.1


27 Sep 2016


* [#1497](https://github.com/cherrypy/cherrypy/issues/1497): Handle errors thrown by `ssl_module: 'builtin'`
when client opens connection to HTTPS port using HTTP.
* [#1350](https://github.com/cherrypy/cherrypy/issues/1350): Fix regression introduced in v6.1.0 where environment
construction for WSGIGateway_u0 was passing one parameter
and not two.
* Other miscellaneous fixes.




## v8.1.0


04 Sep 2016


* [#1473](https://github.com/cherrypy/cherrypy/issues/1473): `HTTPError` now also works as a context manager.
* [#1487](https://github.com/cherrypy/cherrypy/issues/1487): The sessions tool now accepts a `storage_class`
parameter, which supersedes the new deprecated
`storage_type` parameter. The `storage_class` should
be the actual Session subclass to be used.
* Releases now use `setuptools_scm` to track the release
versions. Therefore, releases can be cut by simply tagging
a commit in the repo. Versions numbers are now stored in
exactly one place.




## v8.0.0


02 Sep 2016


* [#1483](https://github.com/cherrypy/cherrypy/issues/1483): Remove Deprecated constructs:


	+ `cherrypy.lib.http` module.
	+ `unrepr`, `modules`, and `attributes` in
	`cherrypy.lib`.
* [PR #1476](https://github.com/cherrypy/cherrypy/pull/1476): Drop support for python-memcached<1.58
* [#1401](https://github.com/cherrypy/cherrypy/issues/1401): Handle NoSSLErrors.
* [#1489](https://github.com/cherrypy/cherrypy/issues/1489): In `wsgiserver.WSGIGateway.respond`, the application
must now yield bytes and not text, as the spec requires.
If text is received, it will now raise a ValueError instead
of silently encoding using ISO-8859-1.
* Removed unicode filename from the package, working around
[pypa/pip#3894](https://github.com/pypa/pip/issues/3894) and [pypa/setuptools#704](https://github.com/pypa/setuptools/issues/704).




## v7.1.0


25 Jul 2016


* [PR #1458](https://github.com/cherrypy/cherrypy/pull/1458): Implement systemdâs socket activation mechanism for
CherryPy servers, based on work sponsored by Endless Computers.


Socket Activation allows one to setup a system so that
systemd will sit on a port and start services
âon demandâ (a little bit like inetd and xinetd
used to do).




## v7.0.0


24 Jul 2016


Removed the long-deprecated backward compatibility for
legacy config keys in the engine. Use the config for the
namespaced-plugins instead:



> 
> * autoreload_on -> autoreload.on
> * autoreload_frequency -> autoreload.frequency
> * autoreload_match -> autoreload.match
> * reload_files -> autoreload.files
> * deadlock_poll_frequency -> timeout_monitor.frequency
> 
> 
> 




## v6.0.0


05 Jun 2016


* Setuptools is now required to build CherryPy. Pure
distutils installs are no longer supported. This change
allows CherryPy to depend on other packages and re-use
code from them. Itâs still possible to install
pre-built CherryPy packages (wheels) using pip without
Setuptools.
* [six](https://pypi.io/project/six) is now a
requirement and subsequent requirements will be
declared in the project metadata.
* [#1440](https://github.com/cherrypy/cherrypy/issues/1440): Back out changes from [PR #1432](https://github.com/cherrypy/cherrypy/pull/1432) attempting to
fix redirects with Unicode URLs, as it also had the
unintended consequence of causing the âLocationâ
to be `bytes` on Python 3.
* `cherrypy.expose` now works on classes.
* `cherrypy.config` decorator is now used throughout
the code internally.




## v5.6.0


05 Jun 2016


* `@cherrypy.expose` now will also set the exposed
attribute on a class.
* Rewrote all tutorials and internal usage to prefer
the decorator usage of `expose` rather than setting
the attribute explicitly.
* Removed test-specific code from tutorials.




## v5.5.0


05 Jun 2016


* [#1397](https://github.com/cherrypy/cherrypy/issues/1397): Fix for filenames with semicolons and quote
characters in filenames found in headers.
* [#1311](https://github.com/cherrypy/cherrypy/issues/1311): Added decorator for registering tools.
* [#1194](https://github.com/cherrypy/cherrypy/issues/1194): Use simpler encoding rules for SCRIPT_NAME
and PATH_INFO environment variables in CherryPy Tree
allowing non-latin characters to pass even when
`wsgi.version` is not `u.0`.
* [#1352](https://github.com/cherrypy/cherrypy/issues/1352): Ensure that multipart fields are decoded even
when cached in a file.




## v5.4.0


10 May 2016


* `cherrypy.test.webtest.WebCase` now honors a
âWEBTEST_INTERACTIVEâ environment variable to disable
interactive tests (still enabled by default). Set to â0â
or âfalseâ or âFalseâ to disable interactive tests.
* [#1408](https://github.com/cherrypy/cherrypy/issues/1408): Fix AttributeError when listiterator was accessed
using the `next` attribute.
* [#748](https://github.com/cherrypy/cherrypy/issues/748): Removed `cherrypy.lib.sessions.PostgresqlSession`.
* [PR #1432](https://github.com/cherrypy/cherrypy/pull/1432): Fix errors with redirects to Unicode URLs.




## v5.3.0


30 Apr 2016


* [#1202](https://github.com/cherrypy/cherrypy/issues/1202): Add support for specifying a certificate authority when
serving SSL using the built-in SSL support.
* Use ssl.create_default_context when available.
* [#1392](https://github.com/cherrypy/cherrypy/issues/1392): Catch platform-specific socket errors on OS X.
* [#1386](https://github.com/cherrypy/cherrypy/issues/1386): Fix parsing of URIs containing `://` in the path part.




## v5.1.0


* Bugfix issue [#1315](https://github.com/cherrypy/cherrypy/issues/1315) for `test_HTTP11_pipelining` test in Python 3.5
* Bugfix issue [#1382](https://github.com/cherrypy/cherrypy/issues/1382) regarding the keyword arguments support for Python 3
on the config file.
* Bugfix issue [#1406](https://github.com/cherrypy/cherrypy/issues/1406) for `test_2_KeyboardInterrupt` test in Python 3.5.
by monkey patching the HTTPRequest given a bug on CPython
that is affecting the testsuite (<https://bugs.python.org/issue23377>).
* Add additional parameter `raise_subcls` to the tests helpers
`openURL` and `CPWebCase.getPage` to have finer control on
which exceptions can be raised.
* Add support for direct keywords on the calls (e.g. `foo=bar`) on
the config file under Python 3.
* Add additional validation to determine if the process is running
as a daemon on `cherrypy.process.plugins.SignalHandler` to allow
the execution of the testsuite under CI tools.




## v5.0.0


* Removed deprecated support for `ssl_certificate` and
`ssl_private_key` attributes and implicit construction
of SSL adapter on Python 2 WSGI servers.
* Default SSL Adapter on Python 2 is the builtin SSL adapter,
matching Python 3 behavior.
* Pull request [#94](https://github.com/cherrypy/cherrypy/issues/94): In proxy tool, defer to Host header for
resolving the base if no base is supplied.




## v3.7.0


* CherryPy daemon may now be invoked with `python -m cherrypy` in
addition to the `cherryd` script.
* Issue [#1298](https://github.com/cherrypy/cherrypy/issues/1298): Fix SSL handling on CPython 2.7 with builtin SSL module
and pyOpenSSL 0.14. This change will break PyPy for now.
* Several documentation fixes.




## v3.6.0


* Fixed HTTP range headers for negative length larger than content size.
* Disabled universal wheel generation as wsgiserver has Python duality.
* Pull Request [#42](https://github.com/cherrypy/cherrypy/issues/42): Correct TypeError in `check_auth` when encrypt is used.
* Pull Request [#59](https://github.com/cherrypy/cherrypy/issues/59): Correct signature of HandlerWrapperTool.
* Pull Request [#60](https://github.com/cherrypy/cherrypy/issues/60): Fix error in SessionAuth where login_screen was
incorrectly used.
* Issue [#1077](https://github.com/cherrypy/cherrypy/issues/1077): Support keyword-only arguments in dispatchers (Python 3).
* Issue [#1019](https://github.com/cherrypy/cherrypy/issues/1019): Allow logging host name in the access log.
* Pull Request [#50](https://github.com/cherrypy/cherrypy/issues/50): Fixed race condition in session cleanup.




## v3.3.0


CherryPy adopts semver.







