
`**headers**`


HTTP headers to include when sending requests.


`**cookies**`


Cookie values to include when sending requests.


`**params**`


Query parameters to include in the URL when sending requests.


`**auth**`


Authentication class used when none is passed at the request-level.


See also Authentication.


*async* `**request**`(*self*, *method*, *url*, ***, *content=None*, *data=None*, *files=None*, *json=None*, *params=None*, *headers=None*, *cookies=None*, *auth=*, *follow_redirects=*, *timeout=*, *extensions=None*)


Build and send a request.


Equivalent to:



```python
request = client.build_request(...)
response = await client.send(request, ...)

```

See `AsyncClient.build_request()`, `AsyncClient.send()`
and Merging of configuration for how the various parameters
are merged with client-level configuration.


*async* `**get**`(*self*, *url*, ***, *params=None*, *headers=None*, *cookies=None*, *auth=*, *follow_redirects=*, *timeout=*, *extensions=None*)


Send a `GET` request.


**Parameters**: See `httpx.request`.


*async* `**head**`(*self*, *url*, ***, *params=None*, *headers=None*, *cookies=None*, *auth=*, *follow_redirects=*, *timeout=*, *extensions=None*)


Send a `HEAD` request.


**Parameters**: See `httpx.request`.


*async* `**options**`(*self*, *url*, ***, *params=None*, *headers=None*, *cookies=None*, *auth=*, *follow_redirects=*, *timeout=*, *extensions=None*)


Send an `OPTIONS` request.


**Parameters**: See `httpx.request`.


*async* `**post**`(*self*, *url*, ***, *content=None*, *data=None*, *files=None*, *json=None*, *params=None*, *headers=None*, *cookies=None*, *auth=*, *follow_redirects=*, *timeout=*, *extensions=None*)


Send a `POST` request.


**Parameters**: See `httpx.request`.


*async* `**put**`(*self*, *url*, ***, *content=None*, *data=None*, *files=None*, *json=None*, *params=None*, *headers=None*, *cookies=None*, *auth=*, *follow_redirects=*, *timeout=*, *extensions=None*)


Send a `PUT` request.


**Parameters**: See `httpx.request`.


*async* `**patch**`(*self*, *url*, ***, *content=None*, *data=None*, *files=None*, *json=None*, *params=None*, *headers=None*, *cookies=None*, *auth=*, *follow_redirects=*, *timeout=*, *extensions=None*)


Send a `PATCH` request.


**Parameters**: See `httpx.request`.


*async* `**delete**`(*self*, *url*, ***, *params=None*, *headers=None*, *cookies=None*, *auth=*, *follow_redirects=*, *timeout=*, *extensions=None*)


Send a `DELETE` request.


**Parameters**: See `httpx.request`.


`**stream**`(*self*, *method*, *url*, ***, *content=None*, *data=None*, *files=None*, *json=None*, *params=None*, *headers=None*, *cookies=None*, *auth=*, *follow_redirects=*, *timeout=*, *extensions=None*)


Alternative to `httpx.request()` that streams the response body
instead of loading it into memory at once.


**Parameters**: See `httpx.request`.


See also: Streaming Responses


`**build_request**`(*self*, *method*, *url*, ***, *content=None*, *data=None*, *files=None*, *json=None*, *params=None*, *headers=None*, *cookies=None*, *timeout=*, *extensions=None*)


Build and return a request instance.


* The `params`, `headers` and `cookies` arguments
are merged with any values set on the client.
* The `url` argument is merged with any `base_url` set on the client.


See also: Request instances


*async* `**send**`(*self*, *request*, ***, *stream=False*, *auth=*, *follow_redirects=*)


Send a request.


The request is sent as-is, unmodified.


Typically you'll want to build one with `AsyncClient.build_request()`
so that any client-level configuration is merged into the request,
but passing an explicit `httpx.Request()` is supported as well.


See also: Request instances


*async* `**aclose**`(*self*)


Close transport and proxies.



