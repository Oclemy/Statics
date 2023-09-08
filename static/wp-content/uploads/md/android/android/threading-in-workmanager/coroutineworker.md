# Threading in CoroutineWorker

For Kotlin users, WorkManager provides first-class support for coroutines. To get started, include `work-runtime-ktx` in your gradle file. Instead of extending `Worker`, you should extend `CoroutineWorker`, which has a suspending version of `doWork()`. For example, if you wanted to build a simple `CoroutineWorker` to perform some network operations, you would do the following:

```kotlin
    class CoroutineDownloadWorker(
        context: Context,
        params: WorkerParameters
    ) : CoroutineWorker(context, params) {
    
        override suspend fun doWork(): Result {
            val data = downloadSynchronously("https://www.google.com")
            saveData(data)
            return Result.success()
        }
    }
```

Note that `CoroutineWorker.doWork()`) is a _suspending_ function. Unlike `Worker`, this code does _not_ run on the `Executor` specified in your `Configuration`. Instead, it defaults to `Dispatchers.Default`. You can customize this by providing your own `CoroutineContext`. In the above example, you would probably want to do this work on `Dispatchers.IO`, as follows:

```kotlin
    class CoroutineDownloadWorker(
        context: Context,
        params: WorkerParameters
    ) : CoroutineWorker(context, params) {
    
        override suspend fun doWork(): Result {
            withContext(Dispatchers.IO) {
                val data = downloadSynchronously("https://www.google.com")
                saveData(data)
                return Result.success()
            }
        }
    }
```

`CoroutineWorker` handles stoppages automatically by cancelling the coroutine and propagating the cancellation signals. You don't need to do anything special to handle work stoppages.

Running a CoroutineWorker in a different process
------------------------------------------------

You can also bind a worker to a specific process by using `RemoteCoroutineWorker`, an implementation of `ListenableWorker`.

`RemoteCoroutineWorker` binds to a specific process with two extra arguments that you provide as part of the input data when building the work request: `ARGUMENT_CLASS_NAME` and `ARGUMENT_PACKAGE_NAME`.

The following example demonstrates building a work request that is bound to a specific process:

### Kotlin

```kotlin
val PACKAGE_NAME = "com.example.background.multiprocess"

val serviceName = RemoteWorkerService::class.java.name
val componentName = ComponentName(PACKAGE_NAME, serviceName)

val data: Data = Data.Builder()
   .putString(ARGUMENT_PACKAGE_NAME, componentName.packageName)
   .putString(ARGUMENT_CLASS_NAME, componentName.className)
   .build()

return OneTimeWorkRequest.Builder(ExampleRemoteCoroutineWorker::class.java)
   .setInputData(data)
   .build()
```

### Java

```java
String PACKAGE_NAME = "com.example.background.multiprocess";

String serviceName = RemoteWorkerService.class.getName();
ComponentName componentName = new ComponentName(PACKAGE_NAME, serviceName);

Data data = new Data.Builder()
        .putString(ARGUMENT_PACKAGE_NAME, componentName.getPackageName())
        .putString(ARGUMENT_CLASS_NAME, componentName.getClassName())
        .build();

return new OneTimeWorkRequest.Builder(ExampleRemoteCoroutineWorker.class)
        .setInputData(data)
        .build();
```

For each `RemoteWorkerService`, you also need to add a service definition in your `AndroidManifest.xml` file:

```xml
<manifest ... >
    <service
            android:name="androidx.work.multiprocess.RemoteWorkerService"
            android:exported="false"
            android:process=":worker1" />

        <service
            android:name=".RemoteWorkerService2"
            android:exported="false"
            android:process=":worker2" />
    ...
</manifest>
```

