# Getting started with WorkManager

To get started using WorkManager, first import the library into your Android project.

Add the following dependencies to your app's `build.gradle` file:

### Groovy

```groovy
dependencies {
    def work_version = "2.7.1"

    // (Java only)
    implementation "androidx.work:work-runtime:$work_version"

    // Kotlin + coroutines
    implementation "androidx.work:work-runtime-ktx:$work_version"

    // optional - RxJava2 support
    implementation "androidx.work:work-rxjava2:$work_version"

    // optional - GCMNetworkManager support
    implementation "androidx.work:work-gcm:$work_version"

    // optional - Test helpers
    androidTestImplementation "androidx.work:work-testing:$work_version"

    // optional - Multiprocess support
    implementation "androidx.work:work-multiprocess:$work_version"
}
```

### Kotlin

```kotlin
dependencies {
    val work_version = "2.7.1"

    // (Java only)
    implementation("androidx.work:work-runtime:$work_version")

    // Kotlin + coroutines
    implementation("androidx.work:work-runtime-ktx:$work_version")

    // optional - RxJava2 support
    implementation("androidx.work:work-rxjava2:$work_version")

    // optional - GCMNetworkManager support
    implementation("androidx.work:work-gcm:$work_version")

    // optional - Test helpers
    androidTestImplementation("androidx.work:work-testing:$work_version")

    // optional - Multiprocess support
    implementation "androidx.work:work-multiprocess:$work_version"
}
```

Once you’ve added the dependencies and synchronized your Gradle project, the next step is to define some work to run.

Define the work
---------------

Work is defined using the `Worker` class. The `doWork()` method runs asynchronously on a background thread provided by WorkManager.

To create some work for WorkManager to run, extend the `Worker` class and override the `doWork()` method. For example, to create a `Worker` that uploads images, you can do the following:

### Kotlin

```kotlin
class UploadWorker(appContext: Context, workerParams: WorkerParameters):
       Worker(appContext, workerParams) {
   override fun doWork(): Result {

       // Do the work here--in this case, upload the images.
       uploadImages()

       // Indicate whether the work finished successfully with the Result
       return Result.success()
   }
}
```

### Java

```java
public class UploadWorker extends Worker {
   public UploadWorker(
       @NonNull Context context,
       @NonNull WorkerParameters params) {
       super(context, params);
   }

   @Override
   public Result doWork() {

     // Do the work here--in this case, upload the images.
     uploadImages();

     // Indicate whether the work finished successfully with the Result
     return Result.success();
   }
}
```

The `Result` returned from `doWork()` informs the WorkManager service whether the work succeeded and, in the case of failure, whether or not the work should be retried.

*   `Result.success()`: The work finished successfully.
*   `Result.failure()`: The work failed.
*   `Result.retry()`: The work failed and should be tried at another time according to its retry policy.

Create a WorkRequest
--------------------

Once your work is defined, it must be scheduled with the WorkManager service in order to run. WorkManager offers a lot of flexibility in how you schedule your work. You can schedule it to run periodically over an interval of time, or you can schedule it to run only one time.

However you choose to schedule the work, you will always use a `WorkRequest`. While a `Worker` defines the unit of work, a `WorkRequest` (and its subclasses) define how and when it should be run. In the simplest case, you can use a `OneTimeWorkRequest`, as shown in the following example.

### Kotlin

```kotlin
val uploadWorkRequest: WorkRequest =
   OneTimeWorkRequestBuilder<UploadWorker>()
       .build()
```

### Java

```java
WorkRequest uploadWorkRequest =
   new OneTimeWorkRequest.Builder(UploadWorker.class)
       .build();
```

Submit the WorkRequest to the system
------------------------------------

Finally, you need to submit your `WorkRequest` to `WorkManager` using the `enqueue()` method.

### Kotlin

```kotlin
WorkManager
    .getInstance(myContext)
    .enqueue(uploadWorkRequest)
```

### Java

```java
WorkManager
    .getInstance(myContext)
    .enqueue(uploadWorkRequest);
```

The exact time that the worker is going to be executed depends on the constraints that are used in your `WorkRequest` and on system optimizations. WorkManager is designed to give the best behavior under these restrictions.

Next steps
----------

This getting started guide only scratches the surface. The `WorkRequest` can also include additional information, such as the constraints under which the work should run, input to the work, a delay, and backoff policy for retrying work. In the next section, Define your work requests, you’ll learn more about these options in greater detail as well as get an understanding of how to schedule unique and reoccurring work.
