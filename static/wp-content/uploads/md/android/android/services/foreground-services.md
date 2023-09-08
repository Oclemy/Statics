# Foreground services

Foreground services perform operations that are noticeable to the user.

Foreground services show a status bar notification, so that users are actively aware that your app is performing a task in the foreground and is consuming system resources.

Devices that run Android 12 (API level 31) or higher provide a streamlined experience for short-running foreground services. On these devices, the system waits 10 seconds before showing the notification associated with a foreground service. There are a few exceptions; several types of services always display a notification immediately.

Examples of apps that would use foreground services include the following:

*   A music player app that plays music in a foreground service. The notification might show the current song that is being played.
*   A fitness app that records a user's run in a foreground service, after receiving permission from the user. The notification might show the distance that the user has traveled during the current fitness session.

You should only use a foreground service when your app needs to perform a task that is noticeable by the user even when they're not directly interacting with the app. If the action is of low enough importance that you want to use a minimum-priority notification, create a background task instead.

This document describes the required permission for using foreground services, how to start a foreground service and remove it from the background, how to associate certain use cases with foreground service types, and the access restrictions that take effect when you start a foreground service from an app that's running in the background.

Starting in Android 13 (API level 33), users can dismiss the notification associated with a foreground service by default. To do so, users perform a swipe gesture on the notification. On previous versions of Android, the notification can't be dismissed unless the foreground service is either stopped or removed from the foreground.

If you would like the notification to be non-dismissable by the user, pass `true` into the `setOngoing()`) method when you create your notification using `Notification.Builder`.

If a foreground service has at least one of the following characteristics, the system shows the associated notification immediately after the service starts, even on devices that run Android 12 or higher:

*   The service is associated with a notification that includes action buttons.
*   The service has a `foregroundServiceType` of `mediaPlayback`, `mediaProjection`, or `phoneCall`.
*   The service provides a use case related to phone calls, navigation, or media playback, as defined in the notification's category attribute.
*   The service has opted out of the behavior change by passing `FOREGROUND_SERVICE_IMMEDIATE` into `setForegroundServiceBehavior()`) when setting up the notification.

On Android 13 (API level 33) or higher, if the user denies the notification permission, they still see notices related to foreground services in the Foreground Services (FGS) Task Manager but don't see them in the notification drawer.

Request the foreground service permission
-----------------------------------------

Apps that target Android 9 (API level 28) or higher and use foreground services must request the `FOREGROUND_SERVICE` permission, as shown in the following code snippet. This is a normal permission, so the system automatically grants it to the requesting app.

```xml
<manifest xmlns:android="http://schemas.android.com/apk/res/android" ...>

    <uses-permission android:name="android.permission.FOREGROUND_SERVICE"/>

    <application ...>
        ...
    </application>
</manifest>
```

Start a foreground service
--------------------------

Before you request the system to run a service as a foreground service, start the service itself:

### Kotlin

```kotlin
val intent = Intent(...) // Build the intent for the service
applicationContext.startForegroundService(intent)
```

### Java

```java
Context context = getApplicationContext();
Intent intent = new Intent(...); // Build the intent for the service
context.startForegroundService(intent);
```

Inside the service, usually in `onStartCommand()`, you can request that your service run in the foreground. To do so, call `startForeground()`. This method takes two parameters: a positive integer that uniquely identifies the notification in the status bar and the `Notification` object itself.

Here is an example:

### Kotlin

```kotlin
// If the notification supports a direct reply action, use
// PendingIntent.FLAG_MUTABLE instead.
val pendingIntent: PendingIntent =
        Intent(this, ExampleActivity::class.java).let { notificationIntent ->
            PendingIntent.getActivity(this, 0, notificationIntent,
                    PendingIntent.FLAG_IMMUTABLE)
        }

val notification: Notification = Notification.Builder(this, CHANNEL_DEFAULT_IMPORTANCE)
        .setContentTitle(getText(R.string.notification_title))
        .setContentText(getText(R.string.notification_message))
        .setSmallIcon(R.drawable.icon)
        .setContentIntent(pendingIntent)
        .setTicker(getText(R.string.ticker_text))
        .build()

// Notification ID cannot be 0.
startForeground(ONGOING_NOTIFICATION_ID, notification)
```

### Java

```java
// If the notification supports a direct reply action, use
// PendingIntent.FLAG_MUTABLE instead.
Intent notificationIntent = new Intent(this, ExampleActivity.class);
PendingIntent pendingIntent =
        PendingIntent.getActivity(this, 0, notificationIntent,
                PendingIntent.FLAG_IMMUTABLE);

Notification notification =
          new Notification.Builder(this, CHANNEL_DEFAULT_IMPORTANCE)
    .setContentTitle(getText(R.string.notification_title))
    .setContentText(getText(R.string.notification_message))
    .setSmallIcon(R.drawable.icon)
    .setContentIntent(pendingIntent)
    .setTicker(getText(R.string.ticker_text))
    .build();

// Notification ID cannot be 0.
startForeground(ONGOING_NOTIFICATION_ID, notification);
```

### Restrictions on background starts

Apps that target Android 12 (API level 31) or higher can't start foreground services while running in the background, except for a few special cases. If an app tries to start a foreground service while the app is running in the background, and the foreground service doesn't satisfy one of the exceptional cases, the system throws a `ForegroundServiceStartNotAllowedException`.

#### Check whether your app performs background starts

To better understand when your app attempts to launch a foreground service while running in the background, you can enable notifications that appear each time this behavior occurs. To do so, execute the following ADB command on the development machine connected to your test device or emulator:

```shell
adb shell device_config put activity_manager 
  default_fgs_starts_restriction_notification_enabled true
```

#### Update your app's logic

If you discover that your app starts foreground services while running from the background, update your app's logic to use WorkManager. To view an example of how to update your app, look through the WorkManagerSample on GitHub.

#### Exemptions from background start restrictions

In the following situations, your app can start foreground services even while your app is running in the background:

*   Your app transitions from a user-visible state, such as an activity.
*   Your app can start an activity from the background, except for the case where the app has an activity in the back stack of an existing task.
*   Your app receives a high priority message using Firebase Cloud Messaging.
    
*   The user performs an action on a UI element related to your app. For example, they might interact with a bubble, notification, widget, or activity.
    
*   Your app invokes an exact alarm to complete an action that the user requests.
    
*   Your app is the device's current input method.
    
*   Your app receives an event that's related to geofencing or activity recognition transition.
    
*   After the device reboots and receives the `ACTION_BOOT_COMPLETED`, `ACTION_LOCKED_BOOT_COMPLETED`, or `ACTION_MY_PACKAGE_REPLACED` intent action in a broadcast receiver.
    
*   Your app receives the `ACTION_TIMEZONE_CHANGED`, `ACTION_TIME_CHANGED`, or `ACTION_LOCALE_CHANGED` intent action in a broadcast receiver.
    
*   Your app receives a Bluetooth broadcast that requires the `BLUETOOTH_CONNECT` or `BLUETOOTH_SCAN` permissions.
    
*   Apps with certain system roles or permission, such as device owners and profile owners.
    
*   Your app uses the Companion Device Manager and declares the `REQUEST_COMPANION_START_FOREGROUND_SERVICES_FROM_BACKGROUND` permission or the `REQUEST_COMPANION_RUN_IN_BACKGROUND` permission. Whenever possible, use `REQUEST_COMPANION_START_FOREGROUND_SERVICES_FROM_BACKGROUND`.
    
*   The user turns off battery optimizations for your app. You can help users find this option by sending them to your app's **App info** page in system settings. To do so, invoke an intent that contains the `ACTION_IGNORE_BATTERY_OPTIMIZATION_SETTINGS` intent action.
    

Remove a service from the foreground
------------------------------------

To remove the service from the foreground, call `stopForeground()`). This method takes a boolean, which indicates whether to remove the status bar notification as well. Note that the service continues to run.

If you stop the service while it's running in the foreground, its notification is removed.

![At the bottom of the notification drawer is a button that indicates the
    number of apps that are currently running in the background. When you press
    this button, a dialog appears, which lists the names of different apps. The
    Stop button is to the right of each app](https://developer.android.com/static/images/guide/components/fgs-manager.svg)

**Figure 1.** FGS Task Manager workflow on devices that run Android 13 or higher.

Starting in Android 13 (API level 33), users can complete a workflow from the notification drawer to stop an app that has an ongoing foreground services, regardless of that app's target SDK version. This affordance, called the _Foreground Services (FGS) Task Manager_, shows a list of apps that are currently running a foreground service. This list is labeled **Active apps**. Next to each app is a **Stop** button. Figure 1 illustrates the FGS Task Manager workflow on a device that runs Android 13.

When the user presses the **Stop** button next to your app in the FGS Task Manager, then the following actions occur:

*   The system removes your app from memory. Therefore, your **entire app stops**, not just the running foreground service.
*   The system removes your app's activity back stack.
*   Any media playback is stopped.
*   The notification associated with the foreground service is removed.
*   Your app isn't removed from history.
*   Scheduled jobs are preserved.
*   Alarms are preserved.

To test that your app behaves as expected while and after a user stops your app, run the following ADB command in a terminal window:

adb shell cmd activity stop-app PACKAGE_NAME

### Exemptions

The system provides several levels of exemptions for certain types of apps, which the following sections describe.

Exemptions are per app, not per process. If the system exempts one process in an app, all other processes in that app are also exempt.

#### Exemptions from appearing in the FGS Task Manager at all

The following apps can run a foreground service and not appear in the FGS Task Manager at all:

*   System-level apps
*   Safety apps; that is, apps that have the `ROLE_EMERGENCY` role
*   Devices that are in demo mode

#### Exemptions from being stoppable by users

When the following types of apps run a foreground service, they appear in the FGS Task Manager, but there is no **Stop** button next to the app's name for the user to press:

*   Device owner apps
*   Profile owner apps
*   Persistent apps
*   Apps that have the `ROLE_DIALER` role

Declare foreground service types
--------------------------------

If your app targets Android 10 (API level 29) or higher and accesses location information in a foreground service, declare the `location` foreground service type as an attribute of your `<service>` component.

If your app targets Android 11 (API level 30) or higher and accesses the camera or microphone in a foreground service, declare the `camera` or `microphone` foreground service types, respectively, as attributes of your `<service>` component.

By default, when you call `startForeground()`) at runtime, the system allows access to each of the service types that you declare in the app manifest. You can choose to limit access to a subset of the declared service types, as shown in the code snippets within the following sections.

### Example using location and camera

If a foreground service in your app needs to access the device's location and camera, declare the service as shown in the following snippet:

AndroidManifest.xml

```xml
<manifest>
    ...
    <service ... android:foregroundServiceType="location|camera" />
</manifest>
```

At runtime, if the foreground service only needs access to a subset of the types declared in the manifest, you can limit the service's access using the logic in the following code snippet:

MyService

### Kotlin

```kotlin
val notification: Notification = ...;
Service.startForeground(notification, FOREGROUND_SERVICE_TYPE_LOCATION)
```

### Java

```java
Notification notification = ...;
Service.startForeground(notification, FOREGROUND_SERVICE_TYPE_LOCATION);
```

### Example using location, camera, and microphone

If a foreground service needs to access location, the camera, and the microphone, declare the service as shown in the following snippet:

AndroidManifest.xml

```xml
<manifest>
    ...
    <service ...
        android:foregroundServiceType="location|camera|microphone" />
</manifest>
```

At runtime, if the foreground service only needs access to a subset of the types declared in the manifest, you can limit the service's access using the logic in the following code snippet:

MyService

### Kotlin

```kotlin
val notification: Notification = ...;
Service.startForeground(notification,
        FOREGROUND_SERVICE_TYPE_LOCATION or FOREGROUND_SERVICE_TYPE_CAMERA)
```

### Java

```java
Notification notification = ...;
Service.startForeground(notification,
        FOREGROUND_SERVICE_TYPE_LOCATION | FOREGROUND_SERVICE_TYPE_CAMERA);
```

### Add foreground service types of Work Manager workers

If your app uses Work Manager and has a long-running worker that requires access to location, camera, or microphone, follow the steps to add a foreground service type to a long-running worker, and specify the additional or alternative foreground service types that your worker uses. You can choose from the following foreground service types:

*   `FOREGROUND_SERVICE_TYPE_LOCATION`
*   `FOREGROUND_SERVICE_TYPE_CAMERA`
*   `FOREGROUND_SERVICE_TYPE_MICROPHONE`

Restricted access to location, camera, and microphone
-----------------------------------------------------

To help protect user privacy, Android 11 (API level 30) introduces limitations to when a foreground service can access the device's location, camera, or microphone. When your app starts a foreground service while the app is running in the background, the foreground service has the following limitations:

*   Unless the user has granted the `ACCESS_BACKGROUND_LOCATION` permission to your app, the foreground service cannot access location.
*   The foreground service cannot access the microphone or camera.

### Exemptions from the restrictions

In some situations, even if a foreground service is started while the app is running in the background, it can still access location, camera, and microphone information while the app is running in the foreground ("while-in-use"). In these same situations, if the service declares a foreground service type of `location` and is started by an app that has the `ACCESS_BACKGROUND_LOCATION` permission, this service can access location information all the time, even when the app is running in the background.

The following list contains these situations:

*   The service is started by a system component.
*   The service is started by interacting with app widgets.
*   The service is started by interacting with a notification.
*   The service is started as a `PendingIntent` that is sent from a different, visible app.
*   The service is started by an app that is a device policy controller that is running in device owner mode.
*   The service is started by an app which provides the `VoiceInteractionService`.
*   The service is started by an app that has the `START_ACTIVITIES_FROM_BACKGROUND` privileged permission.

### Determine which services are affected in your app

When testing your app, start its foreground services. If a started service has restricted access to location, microphone, and camera, the following message appears in Logcat:

Foreground service started from background can not have 
location/camera/microphone access: service SERVICE_NAME