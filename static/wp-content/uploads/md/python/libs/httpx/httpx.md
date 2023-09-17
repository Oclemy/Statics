# HTTPX

*A next-generation HTTP client for Python.*

HTTPX is a fully featured HTTP client for Python 3, which provides sync and async APIs, and support for both HTTP/1.1 and HTTP/2.

---


Install HTTPX using pip:


Now, let's get started:



```python
>>> import httpx
>>> r = httpx.get('https://www.example.org/')
>>> r
<Response [200 OK]>
>>> r.status_code
200
>>> r.headers['content-type']
'text/html; charset=UTF-8'
>>> r.text
'<!doctype html>\n<html>\n<head>\n<title>Example Domain</title>...'

```

Or, using the command-line client.



```python
# The command line client is an optional dependency.
$ pip install 'httpx[cli]'

```

Which now allows us to use HTTPX directly from the command-line...


![httpx --help](img/httpx-help.png)


Sending a request...


![httpx http://httpbin.org/json](img/httpx-request.png)


## Features


HTTPX builds on the well-established usability of `requests`, and gives you:


Plus all the standard features of `requests`...


* International Domains and URLs
* Keep-Alive & Connection Pooling
* Sessions with Cookie Persistence
* Browser-style SSL Verification
* Basic/Digest Authentication
* Elegant Key/Value Cookies
* Automatic Decompression
* Automatic Content Decoding
* Unicode Response Bodies
* Multipart File Uploads
* HTTP(S) Proxy Support
* Connection Timeouts
* Streaming Downloads
* .netrc Support
* Chunked Requests


## Dependencies


The HTTPX project relies on these excellent libraries:


* `httpcore` - The underlying transport implementation for `httpx`.
* `h11` - HTTP/1.1 support.
* `certifi` - SSL certificates.
* `idna` - Internationalized domain name support.
* `sniffio` - Async library autodetection.


As well as these optional installs:


* `h2` - HTTP/2 support. *(Optional, with `httpx[http2]`)*
* `socksio` - SOCKS proxy support. *(Optional, with `httpx[socks]`)*
* `rich` - Rich terminal support. *(Optional, with `httpx[cli]`)*
* `click` - Command line client support. *(Optional, with `httpx[cli]`)*
* `brotli` or `brotlicffi` - Decoding for "brotli" compressed responses. *(Optional, with `httpx[brotli]`)*


A huge amount of credit is due to `requests` for the API layout that
much of this work follows, as well as to `urllib3` for plenty of design
inspiration around the lower-level networking details.


## Installation


Install with pip:


Or, to include the optional HTTP/2 support, use:



```python
$ pip install httpx[http2]

```

To include the optional brotli decoder support, use:



```python
$ pip install httpx[brotli]

```

HTTPX requires Python 3.7+



