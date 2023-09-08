# Using a ListenableFuture

A `ListenableFuture` represents the result of an asynchronous computation: a computation that may or may not have finished producing a result yet. It's a type of `Future` that allows you to register callbacks to be executed once the computation is complete, or if the computation is already complete, immediately.

`ListenableFuture` is not part of the Android framework and is instead provided by Guava. For more information about the implementation of this class, see ListenableFuture explained.

Many existing Jetpack libraries such as CameraX or Health Services have asynchronous methods where the return type is a `ListenableFuture` which represents the status of the execution. In some cases you may need to implement a method that returns a `ListenableFuture`, such as to satisfy the requirements of `TileService`.

Required libraries
------------------

### Groovy

```groovy
dependencies {
    implementation "com.google.guava:guava:31.0.1-android"

    // To use CallbackToFutureAdapter
    implementation "androidx.concurrent:concurrent-futures:1.1.0"

    // Kotlin
    implementation "org.jetbrains.kotlinx:kotlinx-coroutines-guava:1.6.0"
}
```

### Kotlin

```kotlin
dependencies {
    implementation("com.google.guava:guava:31.0.1-android")

    // To use CallbackToFutureAdapter
    implementation("androidx.concurrent:concurrent-futures:1.1.0")

    // Kotlin
    implementation("org.jetbrains.kotlinx:kotlinx-coroutines-guava:1.6.0")
}
```

Getting the result of a `ListenableFuture`
------------------------------------------

### Adding a callback

Use the `Futures.addCallback(...)`) helper method to attach success and failure callbacks onto a `ListenableFuture`.

### Kotlin

```kotlin
val future: ListenableFuture<QueryResult> = ...
Futures.addCallback(
    future,
    object : FutureCallback<QueryResult> {
        override fun onSuccess(result: QueryResult) {
            // handle success
        }

        override fun onFailure(t: Throwable) {
            // handle failure
        }
    },
    // causes the callbacks to be executed on the main (UI) thread
    context.mainExecutor
)
```

### Java

```java
ListenableFuture<QueryResult> future = ...
Futures.addCallback(
    future,
    new FutureCallback<QueryResult>() {
        public void onSuccess(QueryResult result) {
            // handle success
        }

        public void onFailure(@NonNull Throwable thrown) {
            // handle failure
        }
    },
    // causes the callbacks to be executed on the main (UI) thread
    context.getMainExecutor()
);
```

### Suspending in Kotlin

When using Kotlin, the easiest way to wait for the result of a ListenableFuture is to use `await()`.

```kotlin
import kotlinx.coroutines.guava.await

...

val future: ListenableFuture<QueryResult> = ...
val queryResult = future.await() // suspends awaiting success
```

### Interop with RxJava

An RxJava `Single` can be created from a `ListenableFuture` by registering callbacks inside a `SingleEmitter`.

### Kotlin

```kotlin
val future: ListenableFuture<QueryResult> = ...
val single = Single.create<QueryResult> {
    Futures.addCallback(future, object : FutureCallback<QueryResult> {
        override fun onSuccess(result: QueryResult) {
            it.onSuccess(result)
        }

        override fun onFailure(t: Throwable) {
            it.onError(t)
        }
    }, executor)
}
```

### Java

```java
ListenableFuture<QueryResult> future = ...
Single<QueryResult> single = Single.create(
        e -> Futures.addCallback(future, new FutureCallback<QueryResult>() {
            @Override
            public void onSuccess(QueryResult result) {
                e.onSuccess(result);
            }

            @Override
            public void onFailure(@NonNull Throwable thrown) {
                e.onError(thrown);
            }
        }, executor));
```

Creating a `ListenableFuture`
-----------------------------

### Creating an immediate future

If your API is not asynchronous, but you need to wrap the result of a completed operation into a `ListenableFuture`, you can create an `ImmediateFuture`. This can be done using the `Futures.immediateFuture(...)`) factory method.

### Kotlin

```kotlin
fun getResult(): ListenableFuture<QueryResult> {
    try {
        val queryResult = getQueryResult()
        return Futures.immediateFuture(queryResult)
    } catch (e: Exception) {
        return Futures.immediateFailedFuture(e)
    }
}
```

### Java

```java
public ListenableFuture<QueryResult> getResult() {
    try {
        QueryResult queryResult = getQueryResult();
        return Futures.immediateFuture(queryResult);
    } catch (Exception e) {
        return Futures.immediateFailedFuture(e);
    }
}
```

### Using a coroutine

In Kotlin, a `future{ ... }` can be used to convert the result of a suspend function into a `ListenableFuture`.

```kotlin
import kotlinx.coroutines.guava.future

suspend fun getResultAsync(): QueryResult { ... }

fun getResultFuture(): ListenableFuture<QueryResult> {
    return coroutineScope.future{
        getResultAsync()
    }
}
```

### Converting a callback

To convert a callback-based API into one that uses `ListenableFuture`, use `CallbackToFutureAdapter`. This API is provided by the `androidx.concurrent:concurrent-futures` artifact.

See androidx.concurrent for more information.

### Converting from RxJava `Single`

When using RxJava, a `Single` can be converted into a `SettableFuture`, which implements `ListenableFuture`.

### Kotlin

```kotlin
fun getResult(): ListenableFuture<QueryResult> {
    val single: Single<QueryResult> = ...

    val future = SettableFuture.create<QueryResult>()
    single.subscribe(future::set, future::setException)
    return future
}
```

### Java

```java
public ListenableFuture<QueryResult> getResult() {
    Single<QueryResult> single = ...

    SettableFuture<QueryResult> future = SettableFuture.create();
    single.subscribe(future::set, future::setException);
    return future;
}
```