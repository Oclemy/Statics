
# Exceptions


This page lists exceptions that may be raised when using HTTPX.


For an overview of how to work with HTTPX exceptions, see Exceptions (Quickstart).


## The exception hierarchy


* HTTPError
	+ RequestError
		- TransportError
			* TimeoutException
				+ ConnectTimeout
				+ ReadTimeout
				+ WriteTimeout
				+ PoolTimeout
			* NetworkError
				+ ConnectError
				+ ReadError
				+ WriteError
				+ CloseError
			* ProtocolError
				+ LocalProtocolError
				+ RemoteProtocolError
			* ProxyError
			* UnsupportedProtocol
		- DecodingError
		- TooManyRedirects
	+ HTTPStatusError
* InvalidURL
* CookieConflict
* StreamError
	+ StreamConsumed
	+ ResponseNotRead
	+ RequestNotRead
	+ StreamClosed




---


## Exception classes



*class* `httpx.**HTTPError**`(*message*)


Base class for `RequestError` and `HTTPStatusError`.


Useful for `try...except` blocks when issuing a request,
and then calling `.raise_for_status()`.


For example:



```python
try:
 response = httpx.get("https://www.example.com")
 response.raise_for_status()
except httpx.HTTPError as exc:
 print(f"HTTP Exception for {exc.request.url} - {exc}")

```



*class* `httpx.**RequestError**`(*message*, ***, *request=None*)


Base class for all exceptions that may occur when issuing a `.request()`.




*class* `httpx.**TransportError**`(*message*, ***, *request=None*)


Base class for all exceptions that occur at the level of the Transport API.




*class* `httpx.**TimeoutException**`(*message*, ***, *request=None*)


The base class for timeout errors.


An operation has timed out.




*class* `httpx.**ConnectTimeout**`(*message*, ***, *request=None*)


Timed out while connecting to the host.




*class* `httpx.**ReadTimeout**`(*message*, ***, *request=None*)


Timed out while receiving data from the host.




*class* `httpx.**WriteTimeout**`(*message*, ***, *request=None*)


Timed out while sending data to the host.




*class* `httpx.**PoolTimeout**`(*message*, ***, *request=None*)


Timed out waiting to acquire a connection from the pool.




*class* `httpx.**NetworkError**`(*message*, ***, *request=None*)


The base class for network-related errors.


An error occurred while interacting with the network.




*class* `httpx.**ConnectError**`(*message*, ***, *request=None*)


Failed to establish a connection.




*class* `httpx.**ReadError**`(*message*, ***, *request=None*)


Failed to receive data from the network.




*class* `httpx.**WriteError**`(*message*, ***, *request=None*)


Failed to send data through the network.




*class* `httpx.**CloseError**`(*message*, ***, *request=None*)


Failed to close a connection.




*class* `httpx.**ProtocolError**`(*message*, ***, *request=None*)


The protocol was violated.




*class* `httpx.**LocalProtocolError**`(*message*, ***, *request=None*)


A protocol was violated by the client.


For example if the user instantiated a `Request` instance explicitly,
failed to include the mandatory `Host:` header, and then issued it directly
using `client.send()`.




*class* `httpx.**RemoteProtocolError**`(*message*, ***, *request=None*)


The protocol was violated by the server.


For example, returning malformed HTTP.




*class* `httpx.**ProxyError**`(*message*, ***, *request=None*)


An error occurred while establishing a proxy connection.




*class* `httpx.**UnsupportedProtocol**`(*message*, ***, *request=None*)


Attempted to make a request to an unsupported protocol.


For example issuing a request to `ftp://www.example.com`.




*class* `httpx.**DecodingError**`(*message*, ***, *request=None*)


Decoding of the response failed, due to a malformed encoding.




*class* `httpx.**TooManyRedirects**`(*message*, ***, *request=None*)




*class* `httpx.**HTTPStatusError**`(*message*, ***, *request*, *response*)


The response had an error HTTP status of 4xx or 5xx.


May be raised when calling `response.raise_for_status()`




*class* `httpx.**InvalidURL**`(*message*)


URL is improperly formed or cannot be parsed.




*class* `httpx.**CookieConflict**`(*message*)


Attempted to lookup a cookie by name, but multiple cookies existed.


Can occur when calling `response.cookies.get(...)`.




*class* `httpx.**StreamError**`(*message*)


The base class for stream exceptions.


The developer made an error in accessing the request stream in
an invalid way.




*class* `httpx.**StreamConsumed**`()


Attempted to read or stream content, but the content has already
been streamed.




*class* `httpx.**StreamClosed**`()


Attempted to read or stream response content, but the request has been
closed.




*class* `httpx.**ResponseNotRead**`()


Attempted to access streaming response content, without having called `read()`.




*class* `httpx.**RequestNotRead**`()


Attempted to access streaming request content, without having called `read()`.




