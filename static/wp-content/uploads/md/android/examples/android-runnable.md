# Android Runnable Tutorial and Examples


_Android Runnable Tutorial and Examples_

In this class we see the `Runnable` interface and see it's usage examples.


#### What is Runnable?

_In java the interface **Runnable** in basically an abstraction for an executable command._

We talked about the [Thread class](https://camposha.info/android/thread) as a low level concurrency construct for java and android.

Well another building block is the `Runnable`, an interface that comes from the Java API, and meant to specify and encapsulate code that is intended to be executed by a Java thread instance or any other class that handles this `Runnable`.

It's an interface and is defined in the `java.lang` package and has an abstract method called `run()` that we have to implement.

```java
package java.lang;
public interface Runnable{
    public abstract void run();
}
```

#### Usage

The Runnable interface is used extensively to execute code in Threads. The Runnable interface has one abstract method called `run()`:

```java
public abstract void run ()
```

Normally you implement that method whenever your class implements `Runnable` interface. The method will then get called to start executing the active part of the class' code.

Let's say we want to use `Runnable` as our threading mechanism. Well first implement the interface. Then provide the implementation for the `run()` method:

```java
public class MyRunnable implements Runnable {
    public void run(){
        Log.d("Generic","Running in the Thread " +
        Thread.currentThread().getId());
    }
}
```

With that, our `Runnable` subclass can now be passed to `Thread` and is executed independently in the concurrent line of execution:

```java
    Thread thread = new Thread(new MyRunnable());
    thread.start();
```

In the following code, we basically created the Runnable subclass so that it implements the run() method and can be passed and executed by a thread:

#### Runnable Interface Indirect Subclasses

Runnable has alot of them so we list only afew commonly used:

| No. | Class | Description |
| --- | --- | --- |
| 1. | `Thread` | A concurrent unit of execution.This class implements Runnable interface.The Thread class makes use of the Runnable's abstract run() method by calling it's(the Thread's) concrete run() method. That run() method then calls the Runnable's abstract `run()` method internally. |
| 2. | `TimerTask` | An abstract class used to describe a task that should run at a specified time.Maybe once,Maybe recurringly.TimerTask implements Runnable interface.The tasks done by the TimerTask do get specified in the run() method. |
| 3. | `FutureTask<>` | A class that represents a ceancellable asynchronous computation.This class implements the RunnableFuture interface, which implements the Runnable interface. |

Let's now see some examples:

#### Android Runnable Example Step by Step

This is an android example. Android obviously uses Java and Runnable interface has existed since API level 1.

We can use a Runnable with a Service as follows:

```java
public class MyService extends Service implements Runnable{}
```

This will then force us implement the abstract run() method inside that class:

```java
 @Override
    public void run() {
    }
```

And given this is a service we will also have to override another abstract method for Service called `onBind()`

```java
 @Override
    public IBinder onBind(Intent intent) {
        return null;
    }
```

Service is an Android component which has lifecycle callbacks. One of them is the `onCreate()`, a method that get's raised everytime a service is created.

So for us everytime that happens we want to create a thread and start it:

```java
@Override
    public void onCreate() {
        super.onCreate();
        Thread myThead=new Thread(this);
        myThead.start();
    }
```

Then say I want to log some messages every 1 second, add the following code inside the `run()` method:

```java
        while (true)
        {
            try{

                Log.i(MY_TAG,"Distance in Light Years : "+spaceship_distance);
                Thread.sleep(1000);
            } catch (InterruptedException e) {
                e.printStackTrace();
            }
        }
```

Then as instance variables, add the following above your `onCreate()` method:

```java
public static String MY_TAG="MY_SERVICE";
private int spaceship_distance=0;
```

Well that's an example of using Runnable with Android. If you are interested in having the service actually run: then do the following:

1. Register the service in the Manifest:
    
    Make sure you specify your Service name instead of `MyService`.
    
2. Start the service in the MainActivity:
    
    ```java
    Intent i=new Intent(this,MyService.class);
    startService(i);
    ```
    

And that's it, an android Runnable interface example with services.

Note that sometimes people use `Runnable` in this way:

```java
    @Override
    public void onCreate() {
        super.onCreate();

        new Thread(new Runnable() {
            @Override
            public void run() {
                ArrayList<Song> songs = scanSongs(ScanMusicService.this);
                LogUtils.d(songs);
                ToastUtils.showLongToast(songs.toString());
            }
        }).start();

    }
```

#### Runnable Quick Samples

##### (a). How to Perform a HTTP GET with HttpURLConnection and Runnable

HttpURLConnection is our networking class and allows us to perform our HTTP GET request.

On the other hand `Runnable` is our interface that will allow us perform our HTTP GET request in the background thread.

So you start by implementing the `Runnable` interface, forcing you to override the `run()` method.

It is inside that `run()` method where we perform our HTTP GET:

```java
public class UrlRequest implements Runnable {
    ......
 @Override
    public void run() {
        try {
            HttpURLConnection connection = (HttpURLConnection) url.openConnection();
            InputStream stream = connection.getInputStream();
            int responseCode = connection.getResponseCode();
            ByteArrayOutputStream responseBody = new ByteArrayOutputStream();
            byte buffer[] = new byte[1024];
            int bytesRead = 0;
            while ((bytesRead = stream.read(buffer)) > 0) {
                responseBody.write(buffer, 0, bytesRead);
            }
            listener.onReceivedBody(responseCode, responseBody.toByteArray());
        }
        catch (Exception e) {
            listener.onError(e);
        }
    }
}
```

Here's the full class:

```java
import android.support.annotation.NonNull;

import java.io.ByteArrayOutputStream;
import java.io.InputStream;
import java.net.HttpURLConnection;
import java.net.URL;

public class UrlRequest implements Runnable {

    public interface Listener {

        void onReceivedBody(int responseCode, byte body[]);
        void onError(Exception e);
    }

    public interface RequestFactory {

        @NonNull
        UrlRequest makeRequest(URL url, Listener listener);
    }
    private static RequestFactory factory = new RequestFactory() {
        @NonNull
        @Override
        public UrlRequest makeRequest(URL url, Listener listener) {
            return new UrlRequest(url, listener);
        }
    };

    private URL url;
    private Listener listener;

    public static UrlRequest makeRequest(URL url, Listener listener) {
        return factory.makeRequest(url, listener);
    }

    public static void setFactory(RequestFactory newFactory) {
        factory = newFactory;
    }

    public UrlRequest(URL url, Listener listener) {
        this.url = url;
        this.listener = listener;
    }

    @Override
    public void run() {
        try {
            HttpURLConnection connection = (HttpURLConnection) url.openConnection();
            InputStream stream = connection.getInputStream();
            int responseCode = connection.getResponseCode();
            ByteArrayOutputStream responseBody = new ByteArrayOutputStream();
            byte buffer[] = new byte[1024];
            int bytesRead = 0;
            while ((bytesRead = stream.read(buffer)) > 0) {
                responseBody.write(buffer, 0, bytesRead);
            }
            listener.onReceivedBody(responseCode, responseBody.toByteArray());
        }
        catch (Exception e) {
            listener.onError(e);
        }
    }
}
```
