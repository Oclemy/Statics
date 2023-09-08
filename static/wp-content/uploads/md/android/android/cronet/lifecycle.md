# Cronet request lifecycle

Learn about the lifecycle of requests created using Cronet and how to manage them using the callback methods provided by the library.

Lifecycle overview
------------------

Network requests created using the Cronet Library are represented by the `UrlRequest` class. The following concepts are important to understand the `UrlRequest` lifecycle:

**States**

A state is the particular condition that the request is in at a specific time. UrlRequest objects created using the Cronet Library move through different states in their lifecycle. The request lifecycle includes an initial state, and multiple transitional and final states.

**`UrlRequest` methods**

Clients can call specific methods on `UrlRequest` objects depending on the state. The methods move the request from one state to another.

**`Callback` methods**

By implementing methods of the `UrlRequest.Callback` class, your app can receive updates about the progress of the request. You can implement the callback methods to call methods of the `UrlRequest` object that take the lifecycle from a state to another.

The following list describes the flow of the `UrlRequest` lifecycle:

1.  The lifecycle is in the **Started** state after your app calls the `start()`) method.
2.  The server could send a redirect response, which takes the flow to the `onRedirectReceived()`) method. In this method, you can take one of the following client actions:
    *   Follow the redirect using `followRedirect()`). This method takes the request back to the **Started** state.
    *   Cancel the request using `cancel()`). This method takes the request to the `onCanceled()`) method where the app can perform additional operations before the request is moved to the **Canceled** final state.
3.  After the app follows all the redirects, the server sends the response headers and the `onResponseStarted()`) method is called. The request is in the **Waiting for read()** state. The app should call the `read()`) method to attempt to read part of the response body. After `read()` is called, the request is in the **Reading** state, where there are the following possible outcomes:
    *   The reading action was successful, but there is more data available. The `onReadCompleted()`) is called and the request is in the **Waiting for read()** state again. The app should call the `read()`) method again to continue reading the response body. The app could also stop reading the request by using the `cancel()`) method .
    *   The reading action was successful, and there is no more data available. The `onSucceeded()`) method is called and the request is now in the **Succeeded** final state.
    *   The reading action failed. The `onFailed`) method is called and the final state of the request is now **Failed**.

The following diagram shows the lifecycle of a `UrlRequest` object:

![Cronet request lifecycle
diagram](https://developer.android.com/static/images/guide/topics/connectivity/cronet-lifecycle.svg)  
The Cronet request lifecycle

Legend

initial state

final state

transitional state

callback methods

`UrlRequest` methods