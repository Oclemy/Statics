# Guide to background work

Processing data in the background is an important part of creating an Android application that is both responsive for your users as well as a good citizen on the Android platform. Doing work on the main thread can lead to poor performance and therefore a poor user experience.

This guide explains what qualifies as background work, defines background task categories, provides you with criteria to categorize your tasks, and recommends APIs that you should use to execute them.

Guiding principle
-----------------

In general, you should take any blocking tasks off the UI thread. Common long-running tasks include things like decoding a bitmap, accessing storage, working on a machine learning (ML) model, or performing network requests.

Definition of background work
-----------------------------

An app is running in the _background_ when both the following conditions are satisfied:

*   None of the app's activities are currently visible to the user.
*   The app isn't running any foreground services that started while an activity from the app was visible to the user.

Otherwise, the app is running in the _foreground_.

### Common types of background work

Background work falls into one of three primary categories:

*   **Immediate:** Needs to execute right away and complete soon.
*   **Long Running:** May take some time to complete.
*   **Deferrable:** Does not need to run right away.

Likewise, background work in each of these three categories can be either persistent or impersistent:

*   **Persistent work**: Remains scheduled through app restarts and device reboots.
*   **Impersistent work:** No longer scheduled after the process ends.

![](https://developer.android.com/static/images/guide/background/background.svg)

**Figure 1**: Types of background work.

### Approaches to background work

You should approach impersistent or persistent work differently:

*   **All persistent work**: You should use WorkManager for all forms of persistent work.
*   **Immediate impersistent work**: You should use Kotlin coroutines for immediate impersistent work. For Java programming language users, read the guide on threading for recommended options.
*   **Long-running and deferrable impersistent work**: You should not use long-running and deferrable impersistent work. You should instead complete such tasks through persistent work using WorkManager.

The following table lays out which approach you should take for each type of background work.

**Category**

**Persistent**

**Impersistent**

Immediate

WorkManager

Coroutines

Long running

WorkManager

Not recommended. Instead, perform work persistently using WorkManager.

Deferrable

WorkManager

Not recommended. Instead, perform work persistently using WorkManager.

Immediate work encompasses tasks which need to execute right away. These are tasks which are important to the user or which you otherwise can't schedule for deferred execution at a later time. They are important enough that they might need to remain scheduled for prompt execution even if the app closes or the device restarts.

### Recommended solution

For persistent immediate work, you should use WorkManager with a OneTimeWorkRequest. Expedite a WorkRequest with `setExpedited()`.

For impersistent immediate work, you should you use Kotlin coroutines. If your app uses the Java programming language, you should use RxJava or Guava. You can also use Executors.

### Examples

*   An app needs to load data from a data source. However, making such a request on the main thread will block it and cause UI jank. The app instead makes the request off the main thread in a coroutine.
*   An app needs to send a message in a chat app. The app creates a `Worker` and enqueues the task as a `WorkRequest`. It expedites the `WorkRequest` with `setExpedited()`).

Long-running work
-----------------

Work is long running if it is likely to take more than ten minutes to complete.

### Recommended solution

WorkManager allows you to handle such tasks using a long-running `Worker`.

### Example

An app needs to download a large file which you can not chunk. It creates a long-running `Worker` and enqueues the download. The app then downloads the file in the background over fifteen minutes.

Deferrable work
---------------

Deferrable work is any work that does not need to run right away.

### Recommended solution

Scheduling deferred work through WorkManager is the best way to handle tasks that don't need to run immediately but which ought to remain scheduled when the app closes or the device restarts.

### Example

An app wants to regularly sync data with a backend. The user does not trigger the sync, and the work should take place when the device is idle. The recommended approach is to use a `PeriodicWorkRequest` with a custom `Worker` and constraints for these scenarios.

Alarms
------

Alarms are a special use case that are not a part of background work. You should execute background work through the two solutions outlined above, coroutines and WorkManager.

You should only use AlarmManager **only** for scheduling exact alarms such as alarm clocks or calendar events. When using AlarmManager to schedule background work, it wakes the device from Doze mode and its use can therefore have a negative impact on battery life and overall system health. Your app will be responsible for such impacts.

Replacing foreground services
-----------------------------

Android 12 restricts launching foreground services from the background. For most cases, you should use `setForeground()` from WorkManager rather than handle foreground services yourself. This allows WorkManager to manage the lifecycle of the foregound service, ensuring efficiency.

You still should use foreground services to perform tasks that are long running and need to notify the user that they are ongoing. If you use foreground services directly, ensure you shut down the service correctly to preserve resource efficiency.

Some use cases for using foreground services directly are as follows:

*   Media playback
*   Activity tracking
*   Location sharing
*   Voice or video calls