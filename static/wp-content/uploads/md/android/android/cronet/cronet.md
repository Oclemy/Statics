# Perform network operations using Cronet

Cronet is the Chromium network stack made available to Android apps as a library. Cronet takes advantage of multiple technologies that reduce the latency and increase the throughput of the network requests that your app needs to work.

The Cronet Library handles the requests of apps used by millions of people on a daily basis, such as YouTube, Google App, Google Photos, and Maps - Navigation & Transit.

Features
--------

**Protocol support**

Cronet natively supports the HTTP, HTTP/2, and HTTP/3 over QUIC protocols.

**Request prioritization**

The library allows you to set a priority tag for the requests. The server can use the priority tag to determine the order in which to handle the requests.

**Resource caching**

Cronet can use an in-memory or disk cache to store resources retrieved in network requests. Subsequent requests are served from the cache automatically.

**Asynchronous requests**

Network requests issued using the Cronet Library are asynchronous by default. Your worker threads aren't blocked while waiting for the request to come back.

**Data compression**

Cronet supports data compression using the Brotli Compressed Data Format.

To learn how to use the Cronet Library in your app for Android, see Send a simple request. You can also browse the Cronet Sample on GitHub.

You can send feedback about the Cronet Library using the Chromium Issue Tracker. Check the list of bugs in the issue tracker to make sure that your issue hasn't already been reported. If your issue hasn't been reported, file a bug with the word _Cronet_ in the summary line.