# Background optimization

Background processes can be memory- and battery-intensive. For example, an implicit broadcast may start many background processes that have registered to listen for it, even if those processes may not do much work. This can have a substantial impact on both device performance and user experience.

To alleviate this issue, Android 7.0 (API level 24) applies the following restrictions:

*   Apps targeting Android 7.0 (API level 24) and higher do not receive `CONNECTIVITY_ACTION` broadcasts if they declare their broadcast receiver in the manifest. Apps will still receive `CONNECTIVITY_ACTION` broadcasts if they register their `BroadcastReceiver` with `Context.registerReceiver()` and that context is still valid.
*   Apps cannot send or receive `ACTION_NEW_PICTURE` or `ACTION_NEW_VIDEO` broadcasts. This optimization affects all apps, not only those targeting Android 7.0 (API level 24).

If your app uses any of these intents, you should remove dependencies on them as soon as possible so that you can properly target devices running Android 7.0 or higher. The Android framework provides several solutions to mitigate the need for these implicit broadcasts. For example, `JobScheduler` and the new WorkManager provide robust mechanisms to schedule network operations when specified conditions, such as a connection to an unmetered network, are met. You can now also use `JobScheduler` to react to changes to content providers. `JobInfo` objects encapsulate the parameters that `JobScheduler` uses to schedule your job. When the conditions of the job are met, the system executes this job on your app's `JobService`.

In this document, we will learn how to use alternative methods, such as `JobScheduler`, to adapt your app to these new restrictions.

User-initiated restrictions
---------------------------

On the **Battery usage** page within system settings, the user can choose from the following options:

*   **Unrestricted:** Allow all background work, which might consume more battery.
*   **Optimized (default):** Optimize an app's ability to perform background work, based on how the user interacts with the app.
*   **Restricted:** Fully prevents an app from running in the background. Apps may not work as expected.

If an app exhibits some of the bad behaviors described in Android vitals, the system might prompt the user to restrict that app's access to system resources.

If the system notices that an app is consuming excessive resources, it notifies the user, and gives the user the option of restricting the app's actions. Behaviors that can trigger the notice include:

*   Excessive wake locks: 1 partial wake lock held for an hour when screen is off
*   Excessive background services: If app targets API levels lower than 26 and has excessive background services

The precise restrictions imposed are determined by the device manufacturer. For example, on AOSP builds that run Android 9 (API level 28) or higher, apps running in the background that are in the "restricted" state have the following limitations:

*   Can't launch foreground services
*   Existing foreground services are removed from the foreground
*   Alarms aren't triggered
*   Jobs aren't executed

Also, if an app targets Android 13 (API level 33) or higher and is in the "restricted" state, the system doesn't deliver the `BOOT_COMPLETED` broadcast or the `LOCKED_BOOT_COMPLETED` broadcast until the app is started for other reasons.

The specific restrictions are listed in Power management restrictions.

Restrictions on receiving network activity broadcasts
-----------------------------------------------------

Apps targeting Android 7.0 (API level 24) do not receive `CONNECTIVITY_ACTION` broadcasts if they register to receive them in their manifest, and processes that depend on this broadcast will not start. This could pose a problem for apps that want to listen for network changes or perform bulk network activities when the device connects to an unmetered network. Several solutions to get around this restriction already exist in the Android framework, but choosing the right one depends on what you want your app to accomplish.

> **Note:** A `BroadcastReceiver` registered with `Context.registerReceiver()` continues to receive these broadcasts while the app is running.

### Schedule network jobs on unmetered connections

When using the `JobInfo.Builder` class to build your `JobInfo` object, apply the `setRequiredNetworkType()` method and pass `JobInfo.NETWORK_TYPE_UNMETERED` as a job parameter. The following code sample schedules a service to run when the device connects to an unmetered network and is charging:

### Kotlin

```kotlin
const val MY_BACKGROUND_JOB = 0
...
fun scheduleJob(context: Context) {
    val jobScheduler = context.getSystemService(Context.JOB_SCHEDULER_SERVICE) as JobScheduler
    val job = JobInfo.Builder(
            MY_BACKGROUND_JOB,
            ComponentName(context, MyJobService::class.java)
    )
            .setRequiredNetworkType(JobInfo.NETWORK_TYPE_UNMETERED)
            .setRequiresCharging(true)
            .build()
    jobScheduler.schedule(job)
}
```

### Java

```java
public static final int MY_BACKGROUND_JOB = 0;
...
public static void scheduleJob(Context context) {
  JobScheduler js =
      (JobScheduler) context.getSystemService(Context.JOB_SCHEDULER_SERVICE);
  JobInfo job = new JobInfo.Builder(
    MY_BACKGROUND_JOB,
    new ComponentName(context, MyJobService.class))
      .setRequiredNetworkType(JobInfo.NETWORK_TYPE_UNMETERED)
      .setRequiresCharging(true)
      .build();
  js.schedule(job);
}
```

When the conditions for your job are met, your app receives a callback to run the `onStartJob()` method in the specified `JobService.class`. To see more examples of `JobScheduler` implementation, see the JobScheduler sample app.

A new alternative to JobScheduler is WorkManager, an API that allows you to schedule background tasks that need guaranteed completion, regardless of whether the app process is around or not. WorkManager chooses the appropriate way to run the work (either directly on a thread in your app process as well as using JobScheduler, FirebaseJobDispatcher, or AlarmManager) based on such factors as the device API level. Additionally, WorkManager does not require Play services and provides several advanced features, such as chaining tasks together or checking a task's status. To learn more, see WorkManager.

### Monitor network connectivity while the app is running

Apps that are running can still listen for `CONNECTIVITY_CHANGE` with a registered `BroadcastReceiver`. However, the `ConnectivityManager` API provides a more robust method to request a callback only when specified network conditions are met.

`NetworkRequest` objects define the parameters of the network callback in terms of `NetworkCapabilities`. You create `NetworkRequest` objects with the `NetworkRequest.Builder` class. `registerNetworkCallback()` then passes the `NetworkRequest` object to the system. When the network conditions are met, the app receives a callback to execute the `onAvailable()` method defined in its `ConnectivityManager.NetworkCallback` class.

The app continues to receive callbacks until either the app exits or it calls `unregisterNetworkCallback()`.

In Android 7.0 (API level 24), apps are not able to send or receive `ACTION_NEW_PICTURE` or `ACTION_NEW_VIDEO` broadcasts. This restriction helps alleviate the performance and user experience impacts when several apps must wake up in order to process a new image or video. Android 7.0 (API level 24) extends `JobInfo` and `JobParameters` to provide an alternative solution.

### Trigger jobs on content URI changes

To trigger jobs on content URI changes, Android 7.0 (API level 24) extends the `JobInfo` API with the following methods:

`JobInfo.TriggerContentUri()`

Encapsulates parameters required to trigger a job on content URI changes.

`JobInfo.Builder.addTriggerContentUri()`

Passes a `TriggerContentUri` object to `JobInfo`. A `ContentObserver` monitors the encapsulated content URI. If there are multiple `TriggerContentUri` objects associated with a job, the system provides a callback even if it reports a change in only one of the content URIs.

Add the `TriggerContentUri.FLAG_NOTIFY_FOR_DESCENDANTS` flag to trigger the job if any descendants of the given URI change. This flag corresponds to the `notifyForDescendants` parameter passed to `registerContentObserver()`.

> **Note:** `TriggerContentUri()` cannot be used in combination with `setPeriodic()` or `setPersisted()`. To continually monitor for content changes, schedule a new `JobInfo` before the app’s `JobService` finishes handling the most recent callback.

The following sample code schedules a job to trigger when the system reports a change to the content URI, `MEDIA_URI`:

### Kotlin

```kotlin
const val MY_BACKGROUND_JOB = 0
...
fun scheduleJob(context: Context) {
    val jobScheduler = context.getSystemService(Context.JOB_SCHEDULER_SERVICE) as JobScheduler
    val job = JobInfo.Builder(
            MY_BACKGROUND_JOB,
            ComponentName(context, MediaContentJob::class.java)
    )
            .addTriggerContentUri(
                    JobInfo.TriggerContentUri(
                            MediaStore.Images.Media.EXTERNAL_CONTENT_URI,
                            JobInfo.TriggerContentUri.FLAG_NOTIFY_FOR_DESCENDANTS
                    )
            )
            .build()
    jobScheduler.schedule(job)
}
```

### Java

```java
public static final int MY_BACKGROUND_JOB = 0;
...
public static void scheduleJob(Context context) {
  JobScheduler js =
          (JobScheduler) context.getSystemService(Context.JOB_SCHEDULER_SERVICE);
  JobInfo.Builder builder = new JobInfo.Builder(
          MY_BACKGROUND_JOB,
          new ComponentName(context, MediaContentJob.class));
  builder.addTriggerContentUri(
          new JobInfo.TriggerContentUri(MediaStore.Images.Media.EXTERNAL_CONTENT_URI,
          JobInfo.TriggerContentUri.FLAG_NOTIFY_FOR_DESCENDANTS));
  js.schedule(builder.build());
}
```

When the system reports a change in the specified content URI(s), your app receives a callback and a `JobParameters` object is passed to the `onStartJob()` method in `MediaContentJob.class`.

### Determine which content authorities triggered a job

Android 7.0 (API level 24) also extends `JobParameters` to allow your app to receive useful information about what content authorities and URIs triggered the job:

`Uri[] getTriggeredContentUris()`

Returns an array of URIs that have triggered the job. This will be `null` if either no URIs have triggered the job (for example, the job was triggered due to a deadline or some other reason), or the number of changed URIs is greater than 50.

`String[] getTriggeredContentAuthorities()`

Returns a string array of content authorities that have triggered the job. If the returned array is not `null`, use `getTriggeredContentUris()` to retrieve the details of which URIs have changed.

The following sample code overrides the `JobService.onStartJob()` method and records the content authorities and URIs that have triggered the job:

### Kotlin

```kotlin
override fun onStartJob(params: JobParameters): Boolean {
    StringBuilder().apply {
        append("Media content has changed:n")
        params.triggeredContentAuthorities?.also { authorities ->
            append("Authorities: ${authorities.joinToString(", ")}n")
            append(params.triggeredContentUris?.joinToString("n"))
        } ?: append("(No content)")
        Log.i(TAG, toString())
    }
    return true
}
```

### Java

```java
@Override
public boolean onStartJob(JobParameters params) {
  StringBuilder sb = new StringBuilder();
  sb.append("Media content has changed:n");
  if (params.getTriggeredContentAuthorities() != null) {
      sb.append("Authorities: ");
      boolean first = true;
      for (String auth :
          params.getTriggeredContentAuthorities()) {
          if (first) {
              first = false;
          } else {
             sb.append(", ");
          }
           sb.append(auth);
      }
      if (params.getTriggeredContentUris() != null) {
          for (Uri uri : params.getTriggeredContentUris()) {
              sb.append("n");
              sb.append(uri);
          }
      }
  } else {
      sb.append("(No content)");
  }
  Log.i(TAG, sb.toString());
  return true;
}
```

Further optimize your app
-------------------------

Optimizing your apps to run on low-memory devices, or in low-memory conditions, can improve performance and user experience. Removing dependencies on background services and manifest-registered implicit broadcast receivers can help your app run better on such devices. Although Android 7.0 (API level 24) takes steps to reduce some of these issues, it is recommended that you optimize your app to run without the use of these background processes entirely.

The following Android Debug Bridge (ADB) commands can help you test app behavior with background processes disabled:

*   To simulate conditions where implicit broadcasts and background services are unavailable, enter the following command:
```shell
  $ adb shell cmd appops set <package_name> RUN_IN_BACKGROUND ignore
```

*   To re-enable implicit broadcasts and background services, enter the following command:
```shell
       $ adb shell cmd appops set <package_name> RUN_IN_BACKGROUND allow
```
*   You can simulate the user placing your app in the "restricted" state for background battery usage. This setting prevents your app from being able to run in the background. To do so, run the following command in a terminal window:
```shell
       $ adb shell cmd appops set <PACKAGE_NAME> RUN_ANY_IN_BACKGROUND deny
```