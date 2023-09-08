# Support for long-running workers

WorkManager `2.3.0-alpha02` adds built-in support for long running workers. In such cases, WorkManager can provide a signal to the OS that the process should be kept alive if possible while this work is executing. These Workers can run longer than 10 minutes. Example use-cases for this new feature include bulk uploads or downloads (that cannot be chunked), crunching on an ML model locally, or a task that's _important to the user_ of the app.

Under the hood, WorkManager manages and runs a foreground service on your behalf to execute the `WorkRequest`, while also showing a configurable notification.

`ListenableWorker` now supports the `setForegroundAsync()`) API, and `CoroutineWorker` supports a suspending `setForeground()` API. These APIs allow developers to specify that this `WorkRequest` is _important_ (from a user perspective) or _long-running_.

Starting with `2.3.0-alpha03`, WorkManager also allows you to create a `PendingIntent`, which can be used to cancel workers without having to register a new Android component using the `createCancelPendingIntent()`) API. This approach is especially useful when used with the `setForegroundAsync()` or `setForeground()` APIs, which can be used to add a notification action to cancel the `Worker`.

Creating and managing long-running workers
------------------------------------------

You'll use a slightly different approach depending on whether you are coding in Kotlin or Java.

### Kotlin

Kotlin developers should use `CoroutineWorker`. Instead of using `setForegroundAsync()`, you can use the suspending version of that method, `setForeground()`.

```kotlin

    class DownloadWorker(context: Context, parameters: WorkerParameters) :
       CoroutineWorker(context, parameters) {
    
       private val notificationManager =
           context.getSystemService(Context.NOTIFICATION_SERVICE) as
                   NotificationManager
    
       override suspend fun doWork(): Result {
           val inputUrl = inputData.getString(KEY_INPUT_URL)
                          ?: return Result.failure()
           val outputFile = inputData.getString(KEY_OUTPUT_FILE_NAME)
                          ?: return Result.failure()
           // Mark the Worker as important
           val progress = "Starting Download"
           setForeground(createForegroundInfo(progress))
           download(inputUrl, outputFile)
           return Result.success()
       }
    
       private fun download(inputUrl: String, outputFile: String) {
           // Downloads a file and updates bytes read
           // Calls setForeground() periodically when it needs to update
           // the ongoing Notification
       }
       // Creates an instance of ForegroundInfo which can be used to update the
       // ongoing notification.
       private fun createForegroundInfo(progress: String): ForegroundInfo {
           val id = applicationContext.getString(R.string.notification_channel_id)
           val title = applicationContext.getString(R.string.notification_title)
           val cancel = applicationContext.getString(R.string.cancel_download)
           // This PendingIntent can be used to cancel the worker
           val intent = WorkManager.getInstance(applicationContext)
                   .createCancelPendingIntent(getId())
    
           // Create a Notification channel if necessary
           if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.O) {
               createChannel()
           }
    
           val notification = NotificationCompat.Builder(applicationContext, id)
               .setContentTitle(title)
               .setTicker(title)
               .setContentText(progress)
               .setSmallIcon(R.drawable.ic_work_notification)
               .setOngoing(true)
               // Add the cancel action to the notification which can
               // be used to cancel the worker
               .addAction(android.R.drawable.ic_delete, cancel, intent)
               .build()
    
           return ForegroundInfo(notificationId, notification)
       }
    
       @RequiresApi(Build.VERSION_CODES.O)
       private fun createChannel() {
           // Create a Notification channel
       }
    
       companion object {
           const val KEY_INPUT_URL = "KEY_INPUT_URL"
           const val KEY_OUTPUT_FILE_NAME = "KEY_OUTPUT_FILE_NAME"
       }
    }
    
```

### Java

Developers using a `ListenableWorker` or a `Worker` can call the `setForegroundAsync()`) API, which returns a `ListenableFuture<Void>`. You can also call `setForegroundAsync()` to update an ongoing `Notification`.

Here is a simple example of a long running worker that downloads a file. This Worker keeps track of progress to update an ongoing `Notification` which shows the download progress.

```java
    public class DownloadWorker extends Worker {
       private static final String KEY_INPUT_URL = "KEY_INPUT_URL";
       private static final String KEY_OUTPUT_FILE_NAME = "KEY_OUTPUT_FILE_NAME";
    
       private NotificationManager notificationManager;
    
       public DownloadWorker(
           @NonNull Context context,
           @NonNull WorkerParameters parameters) {
               super(context, parameters);
               notificationManager = (NotificationManager)
                   context.getSystemService(NOTIFICATION_SERVICE);
       }
    
       @NonNull
       @Override
       public Result doWork() {
           Data inputData = getInputData();
           String inputUrl = inputData.getString(KEY_INPUT_URL);
           String outputFile = inputData.getString(KEY_OUTPUT_FILE_NAME);
           // Mark the Worker as important
           String progress = "Starting Download";
           setForegroundAsync(createForegroundInfo(progress));
           download(inputUrl, outputFile);
           return Result.success();
       }
    
       private void download(String inputUrl, String outputFile) {
           // Downloads a file and updates bytes read
           // Calls setForegroundAsync(createForegroundInfo(myProgress))
           // periodically when it needs to update the ongoing Notification.
       }
    
       @NonNull
       private ForegroundInfo createForegroundInfo(@NonNull String progress) {
           // Build a notification using bytesRead and contentLength
    
           Context context = getApplicationContext();
           String id = context.getString(R.string.notification_channel_id);
           String title = context.getString(R.string.notification_title);
           String cancel = context.getString(R.string.cancel_download);
           // This PendingIntent can be used to cancel the worker
           PendingIntent intent = WorkManager.getInstance(context)
                   .createCancelPendingIntent(getId());
    
           if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.O) {
               createChannel();
           }
    
           Notification notification = new NotificationCompat.Builder(context, id)
                   .setContentTitle(title)
                   .setTicker(title)
                   .setSmallIcon(R.drawable.ic_work_notification)
                   .setOngoing(true)
                   // Add the cancel action to the notification which can
                   // be used to cancel the worker
                   .addAction(android.R.drawable.ic_delete, cancel, intent)
                   .build();
    
           return new ForegroundInfo(notificationId, notification);
       }
    
       @RequiresApi(Build.VERSION_CODES.O)
       private void createChannel() {
           // Create a Notification channel
       }
    }
    
```

Add a foreground service type to a long-running worker
------------------------------------------------------

If your app targets Android 10 (API level 29) or higher and contains a long-running worker that requires access to location, indicate that the worker uses a foreground service type of `location`. Also, if your app targets Android 11 (API level 30) or higher and contains a long-running worker that requires access to camera or microphone, declare the `camera` or `microphone` foreground service types, respectively.

To add these foreground service types, complete the steps described in the following sections.

### Declare foreground service types in app manifest

Declare the worker's foreground service type in your app's manifest. In the following example, the worker requires access to location and microphone:

AndroidManifest.xml

```xml
<service
   android:name="androidx.work.impl.foreground.SystemForegroundService"
   android:foregroundServiceType="location|microphone"
   tools:node="merge" />
```

### Specify foreground service types at runtime

When you call `setForeground()` or `setForegroundAsync()`, specify a foreground service type of `FOREGROUND_SERVICE_TYPE_LOCATION`, `FOREGROUND_SERVICE_TYPE_CAMERA`, or `FOREGROUND_SERVICE_TYPE_MICROPHONE`, as shown in the following code snippet.

MyLocationAndMicrophoneWorker

### Kotlin

```kotlin
private fun createForegroundInfo(progress: String): ForegroundInfo {
   // ...
   return ForegroundInfo(NOTIFICATION_ID, notification,
           FOREGROUND_SERVICE_TYPE_LOCATION or
FOREGROUND_SERVICE_TYPE_MICROPHONE) }
```

### Java

```java
@NonNull
private ForegroundInfo createForegroundInfo(@NonNull String progress) {
   // Build a notification...
   Notification notification = ...;
   return new ForegroundInfo(NOTIFICATION_ID, notification,
           FOREGROUND_SERVICE_TYPE_LOCATION | FOREGROUND_SERVICE_TYPE_MICROPHONE);
}
```