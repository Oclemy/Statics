# Running Android tasks in background threads

All Android apps use a main thread to handle UI operations. Calling long-running operations from this main thread can lead to freezes and unresponsiveness. For example, if your app makes a network request from the main thread, your app's UI is frozen until it receives the network response. You can create additional _background threads_ to handle long-running operations while the main thread continues to handle UI updates.

This guide shows both Kotlin and Java Programming Language developers how to use a _thread pool_ to set up and use multiple threads in an Android app. This guide also shows you how to define code to run on a thread and how to communicate between one of these threads and the main thread.

Examples overview
-----------------

Based on the Guide to app architecture, the examples in this topic make a network request and return the result to the main thread, where the app then might display that result on the screen.

Specifically, the `ViewModel` calls the repository layer on the main thread to trigger the network request. The repository layer is in charge of moving the execution of the network request off the main thread and posting the result back to the main thread using a callback.

To move the execution of the network request off the main thread, we need to create other threads in our app.

Creating multiple threads
-------------------------

A thread pool is a managed collection of threads that runs tasks in parallel from a queue. New tasks are executed on existing threads as those threads become idle. To send a task to a thread pool, use the `ExecutorService` interface. Note that `ExecutorService` has nothing to do with Services, the Android application component.

Creating threads is expensive, so you should create a thread pool only once as your app initializes. Be sure to save the instance of the `ExecutorService` either in your `Application` class or in a dependency injection container. The following example creates a thread pool of four threads that we can use to run background tasks.

### Kotlin

```kotlin
class MyApplication : Application() {
    val executorService: ExecutorService = Executors.newFixedThreadPool(4)
}
```

### Java

```java
public class MyApplication extends Application {
    ExecutorService executorService = Executors.newFixedThreadPool(4);
}
```

There are other ways you can configure a thread pool depending on expected workload. See Configuring a thread pool for more information.

Executing in a background thread
--------------------------------

Making a network request on the main thread causes the thread to wait, or _block_, until it receives a response. Since the thread is blocked, the OS can't call `onDraw()`, and your app freezes, potentially leading to an Application Not Responding (ANR) dialog. Instead, let's run this operation on a background thread.

First, let's take a look at our `Repository` class and see how it's making the network request:

### Kotlin

```kotlin
sealed class Result<out R> {
    data class Success<out T>(val data: T) : Result<T>()
    data class Error(val exception: Exception) : Result<Nothing>()
}

class LoginRepository(private val responseParser: LoginResponseParser) {
    private const val loginUrl = "https://example.com/login"

    // Function that makes the network request, blocking the current thread
    fun makeLoginRequest(
        jsonBody: String
    ): Result<LoginResponse> {
        val url = URL(loginUrl)
        (url.openConnection() as? HttpURLConnection)?.run {
            requestMethod = "POST"
            setRequestProperty("Content-Type", "application/json; charset=utf-8")
            setRequestProperty("Accept", "application/json")
            doOutput = true
            outputStream.write(jsonBody.toByteArray())

            return Result.Success(responseParser.parse(inputStream))
        }
        return Result.Error(Exception("Cannot open HttpURLConnection"))
    }
}
```

### Java

```java
// Result.java
public abstract class Result<T> {
    private Result() {}

    public static final class Success<T> extends Result<T> {
        public T data;

        public Success(T data) {
            this.data = data;
        }
    }

    public static final class Error<T> extends Result<T> {
        public Exception exception;

        public Error(Exception exception) {
            this.exception = exception;
        }
    }
}

// LoginRepository.java
public class LoginRepository {

    private final String loginUrl = "https://example.com/login";
    private final LoginResponseParser responseParser;

    public LoginRepository(LoginResponseParser responseParser) {
        this.responseParser = responseParser;
    }

    public Result<LoginResponse> makeLoginRequest(String jsonBody) {
        try {
            URL url = new URL(loginUrl);
            HttpURLConnection httpConnection = (HttpURLConnection) url.openConnection();
            httpConnection.setRequestMethod("POST");
            httpConnection.setRequestProperty("Content-Type", "application/json; charset=utf-8");
            httpConnection.setRequestProperty("Accept", "application/json");
            httpConnection.setDoOutput(true);
            httpConnection.getOutputStream().write(jsonBody.getBytes("utf-8"));

            LoginResponse loginResponse = responseParser.parse(httpConnection.getInputStream());
            return new Result.Success<LoginResponse>(loginResponse);
        } catch (Exception e) {
            return new Result.Error<LoginResponse>(e);
        }
    }
}
```

`makeLoginRequest()` is synchronous and blocks the calling thread. To model the response of the network request, we have our own `Result` class.

The `ViewModel` triggers the network request when the user taps, for example, on a button:

### Kotlin

```kotlin
class LoginViewModel(
    private val loginRepository: LoginRepository
) {
    fun makeLoginRequest(username: String, token: String) {
        val jsonBody = "{ username: "$username", token: "$token"}"
        loginRepository.makeLoginRequest(jsonBody)
    }
}
```

### Java

```java
public class LoginViewModel {

    private final LoginRepository loginRepository;

    public LoginViewModel(LoginRepository loginRepository) {
        this.loginRepository = loginRepository;
    }

    public void makeLoginRequest(String username, String token) {
        String jsonBody = "{ username: "" + username + "", token: "" + token + "" }";
        loginRepository.makeLoginRequest(jsonBody);
    }
}
```

With the previous code, `LoginViewModel` is blocking the main thread when making the network request. We can use the thread pool that we've instantiated to move the execution to a background thread. First, following the principles of dependency injection, `LoginRepository` takes an instance of `Executor` as opposed to `ExecutorService` because it's executing code and not managing threads:

### Kotlin

```kotlin
class LoginRepository(
    private val responseParser: LoginResponseParser
    private val executor: Executor
) { ... }
```

### Java

```java
public class LoginRepository {
    ...
    private final Executor executor;

    public LoginRepository(LoginResponseParser responseParser, Executor executor) {
        this.responseParser = responseParser;
        this.executor = executor;
    }
    ...
}
```

The Executor's `execute()`) method takes a `Runnable`. A `Runnable` is a Single Abstract Method (SAM) interface with a `run()` method that is executed in a thread when invoked.

Let's create another function called `makeLoginRequest()` that moves the execution to the background thread and ignores the response for now:

### Kotlin

```kotlin
class LoginRepository(
    private val responseParser: LoginResponseParser
    private val executor: Executor
) {

    fun makeLoginRequest(jsonBody: String) {
        executor.execute {
            val ignoredResponse = makeSynchronousLoginRequest(url, jsonBody)
        }
    }

    private fun makeSynchronousLoginRequest(
        jsonBody: String
    ): Result<LoginResponse> {
        ... // HttpURLConnection logic
    }
}
```

### Java

```java
public class LoginRepository {
    ...
    public void makeLoginRequest(final String jsonBody) {
        executor.execute(new Runnable() {
            @Override
            public void run() {
                Result<LoginResponse> ignoredResponse = makeSynchronousLoginRequest(jsonBody);
            }
        });
    }

    public Result<LoginResponse> makeSynchronousLoginRequest(String jsonBody) {
        ... // HttpURLConnection logic
    }
    ...
}
```

Inside the `execute()` method, we create a new `Runnable` with the block of code we want to execute in the background thread—in our case, the synchronous network request method. Internally, the `ExecutorService` manages the `Runnable` and executes it in an available thread.

### Considerations

Any thread in your app can run in parallel to other threads, including the main thread, so you should ensure that your code is thread-safe. Notice that in our example that we avoid writing to variables shared between threads, passing immutable data instead. This is a good practice, because each thread works with its own instance of data, and we avoid the complexity of synchronization.

If you need to share state between threads, you must be careful to manage access from threads using synchronization mechanisms such as locks. This is outside of the scope of this guide. In general you should avoid sharing mutable state between threads whenever possible.

Communicating with the main thread
----------------------------------

In the previous step, we ignored the network request response. To display the result on the screen, `LoginViewModel` needs to know about it. We can do that by using _callbacks_.

The function `makeLoginRequest()` should take a callback as a parameter so that it can return a value asynchronously. The callback with the result is called whenever the network request completes or a failure occurs. In Kotlin, we can use a higher-order function. However, in Java, we have to create a new callback interface to have the same functionality:

### Kotlin

```kotlin
class LoginRepository(
    private val responseParser: LoginResponseParser
    private val executor: Executor
) {

    fun makeLoginRequest(
        jsonBody: String,
        callback: (Result<LoginResponse>) -> Unit
    ) {
        executor.execute {
            try {
                val response = makeSynchronousLoginRequest(jsonBody)
                callback(response)
            } catch (e: Exception) {
                val errorResult = Result.Error(e)
                callback(errorResult)
            }
        }
    }
    ...
}
```

### Java

```java
interface RepositoryCallback<T> {
    void onComplete(Result<T> result);
}

public class LoginRepository {
    ...
    public void makeLoginRequest(
        final String jsonBody,
        final RepositoryCallback<LoginResponse> callback
    ) {
        executor.execute(new Runnable() {
            @Override
            public void run() {
                try {
                    Result<LoginResponse> result = makeSynchronousLoginRequest(jsonBody);
                    callback.onComplete(result);
                } catch (Exception e) {
                    Result<LoginResponse> errorResult = new Result.Error<>(e);
                    callback.onComplete(errorResult);
                }
            }
        });
    }
  ...
}
```

The `ViewModel` needs to implement the callback now. It can perform different logic depending on the result:

### Kotlin

```kotlin
class LoginViewModel(
    private val loginRepository: LoginRepository
) {
    fun makeLoginRequest(username: String, token: String) {
        val jsonBody = "{ username: "$username", token: "$token"}"
        loginRepository.makeLoginRequest(jsonBody) { result ->
            when(result) {
                is Result.Success<LoginResponse> -> // Happy path
                else -> // Show error in UI
            }
        }
    }
}
```

### Java

```java
public class LoginViewModel {
    ...
    public void makeLoginRequest(String username, String token) {
        String jsonBody = "{ username: "" + username + "", token: "" + token + "" }";
        loginRepository.makeLoginRequest(jsonBody, new RepositoryCallback<LoginResponse>() {
            @Override
            public void onComplete(Result<LoginResponse> result) {
                if (result instanceof Result.Success) {
                    // Happy path
                } else {
                    // Show error in UI
                }
            }
        });
    }
}
```

In this example, the callback is executed in the calling thread, which is a background thread. This means that you cannot modify or communicate directly with the UI layer until you switch back to the main thread.

Using handlers
--------------

You can use a `Handler` to enqueue an action to be performed on a different thread. To specify the thread on which to run the action, construct the `Handler` using a `Looper` for the thread. A `Looper` is an object that runs the message loop for an associated thread. Once you've created a `Handler`, you can then use the `post(Runnable)`) method to run a block of code in the corresponding thread.

`Looper` includes a helper function, `getMainLooper()`), which retrieves the `Looper` of the main thread. You can run code in the main thread by using this `Looper` to create a `Handler`. As this is something you might do quite often, you can also save an instance of the `Handler` in the same place you saved the `ExecutorService`:

### Kotlin

```kotlin
class MyApplication : Application() {
    val executorService: ExecutorService = Executors.newFixedThreadPool(4)
    val mainThreadHandler: Handler = HandlerCompat.createAsync(Looper.getMainLooper())
}
```

### Java

```java
public class MyApplication extends Application {
    ExecutorService executorService = Executors.newFixedThreadPool(4);
    Handler mainThreadHandler = HandlerCompat.createAsync(Looper.getMainLooper());
}
```

It's a good practice to inject the handler to the `Repository`, as it gives you more flexibility. For example, in the future you might want to pass in a different `Handler` to schedule tasks on a separate thread. If you're always communicating back to the same thread, you can pass the `Handler` into the `Repository` constructor, as shown in the following example.

### Kotlin

```kotlin
class LoginRepository(
    ...
    private val resultHandler: Handler
) {

    fun makeLoginRequest(
        jsonBody: String,
        callback: (Result<LoginResponse>) -> Unit
    ) {
          executor.execute {
              try {
                  val response = makeSynchronousLoginRequest(jsonBody)
                  resultHandler.post { callback(response) }
              } catch (e: Exception) {
                  val errorResult = Result.Error(e)
                  resultHandler.post { callback(errorResult) }
              }
          }
    }
    ...
}
```

### Java

```java
public class LoginRepository {
    ...
    private final Handler resultHandler;

    public LoginRepository(LoginResponseParser responseParser, Executor executor,
            Handler resultHandler) {
        this.responseParser = responseParser;
        this.executor = executor;
        this.resultHandler = resultHandler;
    }

    public void makeLoginRequest(
        final String jsonBody,
        final RepositoryCallback<LoginResponse> callback
    ) {
        executor.execute(new Runnable() {
            @Override
            public void run() {
                try {
                    Result<LoginResponse> result = makeSynchronousLoginRequest(jsonBody);
                    notifyResult(result, callback);
                } catch (Exception e) {
                    Result<LoginResponse> errorResult = new Result.Error<>(e);
                    notifyResult(errorResult, callback);
                }
            }
        });
    }

    private void notifyResult(
        final Result<LoginResponse> result,
        final RepositoryCallback<LoginResponse> callback,
    ) {
        resultHandler.post(new Runnable() {
            @Override
            public void run() {
                callback.onComplete(result);
            }
        });
    }
    ...
}
```

Alternatively, if you want more flexibility, you can pass in a Handler to each function:

### Kotlin

```kotlin
class LoginRepository(...) {
    ...
    fun makeLoginRequest(
        jsonBody: String,
        resultHandler: Handler,
        callback: (Result<LoginResponse>) -> Unit
    ) {
        executor.execute {
            try {
                val response = makeSynchronousLoginRequest(jsonBody)
                resultHandler.post { callback(response) }
            } catch (e: Exception) {
                val errorResult = Result.Error(e)
                resultHandler.post { callback(errorResult) }
            }
        }
    }
}
```

### Java

```java
public class LoginRepository {
    ...

    public void makeLoginRequest(
        final String jsonBody,
        final RepositoryCallback<LoginResponse> callback,
        final Handler resultHandler,
    ) {
        executor.execute(new Runnable() {
            @Override
            public void run() {
                try {
                    Result<LoginResponse> result = makeSynchronousLoginRequest(jsonBody);
                    notifyResult(result, callback, resultHandler);
                } catch (Exception e) {
                    Result<LoginResponse> errorResult = new Result.Error<>(e);
                    notifyResult(errorResult, callback, resultHandler);
                }
            }
        });
    }

    private void notifyResult(
        final Result<LoginResponse> result,
        final RepositoryCallback<LoginResponse> callback,
        final Handler resultHandler
    ) {
        resultHandler.post(new Runnable() {
            @Override
            public void run() {
                callback.onComplete(result);
            }
        });
    }
}
```

In this example, the callback passed into the Repository's `makeLoginRequest` call is executed on the main thread. That means you can directly modify the UI from the callback or use `LiveData.setValue()` to communicate with the UI.

Configuring a thread pool
-------------------------

You can create a thread pool using one of the `Executor` helper functions with predefined settings, as shown in the previous example code. Alternatively, if you want to customize the details of the thread pool, you can create an instance using `ThreadPoolExecutor` directly. You can configure the following details:

*   Initial and maximum pool size.
*   _Keep alive time_ and time unit. Keep alive time is the maximum duration that a thread can remain idle before it shuts down.
*   An input queue that holds `Runnable` tasks. This queue must implement the `BlockingQueue` interface. To match the requirements of your app, you can choose from the available queue implementations. To learn more, see the class overview for `ThreadPoolExecutor`.

Here's an example that specifies thread pool size based on the total number of processor cores, a keep alive time of one second, and an input queue.

### Kotlin

```kotlin
class MyApplication : Application() {
    /*
     * Gets the number of available cores
     * (not always the same as the maximum number of cores)
     */
    private val NUMBER_OF_CORES = Runtime.getRuntime().availableProcessors()

    // Instantiates the queue of Runnables as a LinkedBlockingQueue
    private val workQueue: BlockingQueue<Runnable> =
            LinkedBlockingQueue<Runnable>()

    // Sets the amount of time an idle thread waits before terminating
    private const val KEEP_ALIVE_TIME = 1L
    // Sets the Time Unit to seconds
    private val KEEP_ALIVE_TIME_UNIT = TimeUnit.SECONDS
    // Creates a thread pool manager
    private val threadPoolExecutor: ThreadPoolExecutor = ThreadPoolExecutor(
            NUMBER_OF_CORES,       // Initial pool size
            NUMBER_OF_CORES,       // Max pool size
            KEEP_ALIVE_TIME,
            KEEP_ALIVE_TIME_UNIT,
            workQueue
    )
}
```

### Java

```java
public class MyApplication extends Application {
    /*
     * Gets the number of available cores
     * (not always the same as the maximum number of cores)
     */
    private static int NUMBER_OF_CORES = Runtime.getRuntime().availableProcessors();

    // Instantiates the queue of Runnables as a LinkedBlockingQueue
    private final BlockingQueue<Runnable> workQueue = new LinkedBlockingQueue<Runnable>();

    // Sets the amount of time an idle thread waits before terminating
    private static final int KEEP_ALIVE_TIME = 1;
    // Sets the Time Unit to seconds
    private static final TimeUnit KEEP_ALIVE_TIME_UNIT = TimeUnit.SECONDS;

    // Creates a thread pool manager
    ThreadPoolExecutor threadPoolExecutor = new ThreadPoolExecutor(
            NUMBER_OF_CORES,       // Initial pool size
            NUMBER_OF_CORES,       // Max pool size
            KEEP_ALIVE_TIME,
            KEEP_ALIVE_TIME_UNIT,
            workQueue
    );
    ...
}
```

Concurrency libraries
---------------------

It's important to understand the basics of threading and its underlying mechanisms. There are, however, many popular libraries that offer higher-level abstractions over these concepts and ready-to-use utilities for passing data between threads. These libraries include Guava and RxJava for the Java Programming Language users and coroutines, which we recommend for Kotlin users.

In practice, you should pick the one that works best for your app and your development team, though the rules of threading remain the same.
