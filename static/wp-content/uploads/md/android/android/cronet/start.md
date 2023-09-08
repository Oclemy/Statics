# Send a simple request

Learn how to use the Cronet Library to perform network operations in your Android app. Cronet is the Chromium network stack made available as a library for you to use in your apps. For more information about the library features, see Perform network operations using Cronet.

Set up the library in your project
----------------------------------

Follow these steps to add a dependency to the Cronet Library in your project:

1.  Verify that Android Studio included a reference to Google's Maven Repository in your project's `settings.gradle` file, as shown in the following example:
    
    ### Groovy

```groovy    
    dependencyResolutionManagement {
       ...
       repositories {
           ...
           google()
       }
    }
```

### Kotlin

```kotlin    
    dependencyResolutionManagement {
       ...
       repositories {
           ...
           google()
       }
    }
 ```

2.  Include a reference to the Google Play Services Client Library for Cronet in the `dependencies` section of your app module's `build.gradle` file, as shown in the following example:
    
 ### Groovy

 ```groovy   
    dependencies {
       implementation 'com.google.android.gms:play-services-cronet:18.0.1'
    }
```
### Kotlin

```kotlin    
    dependencies {
       implementation("com.google.android.gms:play-services-cronet:18.0.1")
    }
```

`CronetEngine` objects created once this dependency is added will use Cronet loaded from Google Play services. Call `CronetProviderInstaller.installProvider(Context)` before creating `CronetEngine` objects to prevent unexpected exceptions from being thrown during `CronetEngine` creation due to errors like devices requiring an updated version of Google Play services.

In cases where Cronet cannot be loaded from Google Play services, there is a less performant implementation of Cronet's API that can be used. To use this fall-back implementation, depend on `org.chromium.net:cronet-fallback` and call `new JavaCronetProvider(context).createBuilder()`.

Create a network request
------------------------

This section shows how to create and send a network request using the Cronet Library. After sending the network request, your app should process the network response.

### Create and configure an instance of CronetEngine

The library provides a `CronetEngine.Builder` class that you can use to create an instance of `CronetEngine`. The following example shows how to create a `CronetEngine` object:

### Kotlin

```kotlin
val myBuilder = CronetEngine.Builder(context)
val cronetEngine: CronetEngine = myBuilder.build()
```

### Java

```java
CronetEngine.Builder myBuilder = new CronetEngine.Builder(context);
CronetEngine cronetEngine = myBuilder.build();
```

You can use the `Builder` class to configure a `CronetEngine` object, for example you can provide options like caching and data compression. For more information, see `CronetEngine.Builder`.

### Provide an implementation of the request callback

To provide an implementation of the callback, create a subclass of `UrlRequest.Callback` and implement the required abstract methods, as shown in the following example:

### Kotlin

```kotlin
private const val TAG = "MyUrlRequestCallback"

class MyUrlRequestCallback : UrlRequest.Callback() {
    override fun onRedirectReceived(request: UrlRequest?, info: UrlResponseInfo?, newLocationUrl: String?) {
        Log.i(TAG, "onRedirectReceived method called.")
        // You should call the request.followRedirect() method to continue
        // processing the request.
        request?.followRedirect()
    }

    override fun onResponseStarted(request: UrlRequest?, info: UrlResponseInfo?) {
        Log.i(TAG, "onResponseStarted method called.")
        // You should call the request.read() method before the request can be
        // further processed. The following instruction provides a ByteBuffer object
        // with a capacity of 102400 bytes for the read() method. The same buffer
        // with data is passed to the onReadCompleted() method.
        request?.read(ByteBuffer.allocateDirect(102400))
    }

    override fun onReadCompleted(request: UrlRequest?, info: UrlResponseInfo?, byteBuffer: ByteBuffer?) {
        Log.i(TAG, "onReadCompleted method called.")
        // You should keep reading the request until there's no more data.
        byteBuffer.clear()
        request?.read(byteBuffer)
    }

    override fun onSucceeded(request: UrlRequest?, info: UrlResponseInfo?) {
        Log.i(TAG, "onSucceeded method called.")
    }
}
```

### Java

```java
class MyUrlRequestCallback extends UrlRequest.Callback {
  private static final String TAG = "MyUrlRequestCallback";

  @Override
  public void onRedirectReceived(UrlRequest request, UrlResponseInfo info, String newLocationUrl) {
    Log.i(TAG, "onRedirectReceived method called.");
    // You should call the request.followRedirect() method to continue
    // processing the request.
    request.followRedirect();
  }

  @Override
  public void onResponseStarted(UrlRequest request, UrlResponseInfo info) {
    Log.i(TAG, "onResponseStarted method called.");
    // You should call the request.read() method before the request can be
    // further processed. The following instruction provides a ByteBuffer object
    // with a capacity of 102400 bytes for the read() method. The same buffer
    // with data is passed to the onReadCompleted() method.
    request.read(ByteBuffer.allocateDirect(102400));
  }

  @Override
  public void onReadCompleted(UrlRequest request, UrlResponseInfo info, ByteBuffer byteBuffer) {
    Log.i(TAG, "onReadCompleted method called.");
    // You should keep reading the request until there's no more data.
    byteBuffer.clear();
    request.read(byteBuffer);
  }

  @Override
  public void onSucceeded(UrlRequest request, UrlResponseInfo info) {
    Log.i(TAG, "onSucceeded method called.");
  }
}
```

### Create an Executor object to manage network tasks

You can use the `Executor` class to execute network tasks. To get an instance of `Executor`, use one of the static methods of the `Executors` class that return an `Executor` object. The following example shows how to create an `Executor` object using the `newSingleThreadExecutor()` method:

### Kotlin

```kotlin
val executor: Executor = Executors.newSingleThreadExecutor()
```

### Java

```java
Executor executor = Executors.newSingleThreadExecutor();
```

### Create and configure a UrlRequest object

To create the network request, call the `newUrlRequestBuilder()`) method of the `CronetEngine` passing the destination URL, an instance of your callback class, and the executor object. The `newUrlRequestBuilder()` method returns a `UrlRequest.Builder` object that you can use to create the `UrlRequest` object, as shown in the following example:

### Kotlin

```kotlin
val requestBuilder = cronetEngine.newUrlRequestBuilder(
        "https://www.example.com",
        MyUrlRequestCallback(),
        executor
)

val request: UrlRequest = requestBuilder.build()
```

### Java

```java
UrlRequest.Builder requestBuilder = cronetEngine.newUrlRequestBuilder(
        "https://www.example.com", new MyUrlRequestCallback(), executor);

UrlRequest request = requestBuilder.build();
```

You can use the `Builder` class to configure the instance of `UrlRequest`. For example, you can specify a priority or the HTTP verb. For more information, see `UrlRequest.Builder`.

To start the network task, call the `start()`) method of the request:

### Kotlin

```kotlin
request.start()
```

### Java

```java
request.start();
```

By following the instructions in this section, you can create and send a network request using Cronet. However, for the sake of simplicity, the example implementation of `UrlRequest.Callback` only prints a message to the log. The following section shows how to provide a callback implementation that supports more useful scenarios, such as extracting data from the response and detecting a failure in the request.

Process the network response
----------------------------

Once you call the `start()`) method, the Cronet request lifecycle is initiated. Your app should manage the request during the lifecycle by specifying a callback. To learn more about the lifecycle, see Cronet request lifecycle. You can specify a callback by creating a subclass of `UrlRequest.Callback` and implementing the following methods:

`onRedirectReceived()`)

Invoked when the server issues an HTTP redirect code in response to the original request. To follow the redirect to the new destination, use the `followRedirect()`) method. Otherwise use the `cancel()`) method. The following example shows how to implement the method:

### Kotlin

```kotlin
override fun onRedirectReceived(request: UrlRequest?, info: UrlResponseInfo?, newLocationUrl: String?) {
  // Determine whether you want to follow the redirect.
  ...

  if (shouldFollow) {
      request?.followRedirect()
  } else {
      request?.cancel()
  }
}
```

### Java

```java
@Override
public void onRedirectReceived(UrlRequest request, UrlResponseInfo info, String newLocationUrl) {
  // Determine whether you want to follow the redirect.
  …

  if (shouldFollow) {
    request.followRedirect();
  } else {
    request.cancel();
  }
}
```

`onResponseStarted()`)

Invoked when the final set of headers is received. The `onResponseStarted()` method is only invoked after all redirects are followed. The following code shows an example implementation of the method:

### Kotlin

```kotlin
override fun onResponseStarted(request: UrlRequest?, info: UrlResponseInfo?) {
  val httpStatusCode = info?.httpStatusCode
  if (httpStatusCode == 200) {
    // The request was fulfilled. Start reading the response.
    request?.read(myBuffer)
  } else if (httpStatusCode == 503) {
    // The service is unavailable. You should still check if the request
    // contains some data.
    request?.read(myBuffer)
  }
  responseHeaders = info?.allHeaders
}
```

### Java

```java
@Override
public void onResponseStarted(UrlRequest request, UrlResponseInfo info) {
  int httpStatusCode = info.getHttpStatusCode();
  if (httpStatusCode == 200) {
    // The request was fulfilled. Start reading the response.
    request.read(myBuffer);
  } else if (httpStatusCode == 503) {
    // The service is unavailable. You should still check if the request
    // contains some data.
    request.read(myBuffer);
  }
  responseHeaders = info.getAllHeaders();
}
```

`onReadCompleted()`)

Invoked whenever part of the response body has been read. The following code example shows how to implement the method and extract the response body:

### Kotlin

```kotlin
override fun onReadCompleted(request: UrlRequest?, info: UrlResponseInfo?, byteBuffer: ByteBuffer?) {
  // The response body is available, process byteBuffer.
  ...

  // Continue reading the response body by reusing the same buffer
  // until the response has been completed.
  byteBuffer?.clear()
  request?.read(myBuffer)
}
```

### Java

```java
@Override
public void onReadCompleted(UrlRequest request, UrlResponseInfo info, ByteBuffer byteBuffer) {
  // The response body is available, process byteBuffer.
  …

  // Continue reading the response body by reusing the same buffer
  // until the response has been completed.
  byteBuffer.clear();
  request.read(myBuffer);
}
```

`onSucceeded()`)

Invoked when the network request is completed successfully. The following example shows how to implement the method:

### Kotlin

```kotlin
override fun onSucceeded(request: UrlRequest?, info: UrlResponseInfo?) {
    // The request has completed successfully.
}
```

### Java

```java
@Override
public void onSucceeded(UrlRequest request, UrlResponseInfo info) {
  // The request has completed successfully.
}
```

`onFailed()`)

Invoked if the request failed for any reason after the `start()`) method was called. The following example shows how to implement the method and get information about the error:

### Kotlin

```kotlin
override fun onFailed(request: UrlRequest?, info: UrlResponseInfo?, error: CronetException?) {
    // The request has failed. If possible, handle the error.
    Log.e(TAG, "The request failed.", error)
}
```

### Java

```java
@Override
public void onFailed(UrlRequest request, UrlResponseInfo info, CronetException error) {
  // The request has failed. If possible, handle the error.
  Log.e(TAG, "The request failed.", error);
}
```

`onCanceled()`)

Invoked if the request was canceled using the `cancel()`) method. Once invoked, no other methods of the `UrlRequest.Callback` class are invoked. You can use this method to free resources allocated to process a request. The following example shows how to implement the method:

### Kotlin

```kotlin
override fun onCanceled(request: UrlRequest?, info: UrlResponseInfo?) {
    // Free resources allocated to process this request.
    ...
}
```

### Java

```java
@Override
public void onCanceled(UrlRequest request, UrlResponseInfo info) {
  // Free resources allocated to process this request.
  …
}
```