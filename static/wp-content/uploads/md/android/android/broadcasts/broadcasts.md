# Broadcasts overview

Android apps can send or receive broadcast messages from the Android system and other Android apps, similar to the publish-subscribe design pattern. These broadcasts are sent when an event of interest occurs. For example, the Android system sends broadcasts when various system events occur, such as when the system boots up or the device starts charging. Apps can also send custom broadcasts, for example, to notify other apps of something that they might be interested in (for example, some new data has been downloaded).

Apps can register to receive specific broadcasts. When a broadcast is sent, the system automatically routes broadcasts to apps that have subscribed to receive that particular type of broadcast.

Generally speaking, broadcasts can be used as a messaging system across apps and outside of the normal user flow. However, you must be careful not to abuse the opportunity to respond to broadcasts and run jobs in the background that can contribute to a slow system performance, as described in the following video.

About system broadcasts
-----------------------

The system automatically sends broadcasts when various system events occur, such as when the system switches in and out of airplane mode. System broadcasts are sent to all apps that are subscribed to receive the event.

The broadcast message itself is wrapped in an `Intent` object whose action string identifies the event that occurred (for example `android.intent.action.AIRPLANE_MODE`). The intent may also include additional information bundled into its extra field. For example, the airplane mode intent includes a boolean extra that indicates whether or not Airplane Mode is on.

For more information about how to read intents and get the action string from an intent, see Intents and Intent Filters.

For a complete list of system broadcast actions, see the `BROADCAST_ACTIONS.TXT` file in the Android SDK. Each broadcast action has a constant field associated with it. For example, the value of the constant `ACTION_AIRPLANE_MODE_CHANGED` is `android.intent.action.AIRPLANE_MODE`. Documentation for each broadcast action is available in its associated constant field.

### Changes to system broadcasts

As the Android platform evolves, it periodically changes how system broadcasts behave. Keep the following changes in mind if your app targets Android 7.0 (API level 24) or higher, or if it's installed on devices running Android 7.0 or higher.

#### Android 9

Beginning with Android 9 (API level 28), The `NETWORK_STATE_CHANGED_ACTION` broadcast doesn't receive information about the user's location or personally identifiable data.

In addition, if your app is installed on a device running Android 9 or higher, system broadcasts from Wi-Fi don't contain SSIDs, BSSIDs, connection information, or scan results. To get this information, call `getConnectionInfo()`) instead.

#### Android 8.0

Beginning with Android 8.0 (API level 26), the system imposes additional restrictions on manifest-declared receivers.

If your app targets Android 8.0 or higher, you cannot use the manifest to declare a receiver for most implicit broadcasts (broadcasts that don't target your app specifically). You can still use a context-registered receiver when the user is actively using your app.

#### Android 7.0

Android 7.0 (API level 24) and higher don't send the following system broadcasts:

*   `ACTION_NEW_PICTURE`
*   `ACTION_NEW_VIDEO`

Also, apps targeting Android 7.0 and higher must register the `CONNECTIVITY_ACTION` broadcast using `registerReceiver(BroadcastReceiver, IntentFilter)`. Declaring a receiver in the manifest doesn't work.

Receiving broadcasts
--------------------

Apps can receive broadcasts in two ways: through manifest-declared receivers and context-registered receivers.

### Manifest-declared receivers

If you declare a broadcast receiver in your manifest, the system launches your app (if the app is not already running) when the broadcast is sent.

To declare a broadcast receiver in the manifest, perform the following steps:

1.  Specify the `<receiver>` element in your app's manifest.

```xml
    <!-- If this receiver listens for broadcasts sent from the system or from
         other apps, even other apps that you own, set android:exported to "true". -->
    <receiver android:name=".MyBroadcastReceiver" android:exported="false">
        <intent-filter>
            <action android:name="APP_SPECIFIC_BROADCAST" />
        </intent-filter>
    </receiver>
```

    The intent filters specify the broadcast actions your receiver subscribes to.
    
2.  Subclass `BroadcastReceiver` and implement `onReceive(Context, Intent)`. The broadcast receiver in the following example logs and displays the contents of the broadcast:
    
### Kotlin

```kotlin    
    private const val TAG = "MyBroadcastReceiver"
    
    class MyBroadcastReceiver : BroadcastReceiver() {
    
        override fun onReceive(context: Context, intent: Intent) {
            StringBuilder().apply {
                append("Action: ${intent.action}n")
                append("URI: ${intent.toUri(Intent.URI_INTENT_SCHEME)}n")
                toString().also { log ->
                    Log.d(TAG, log)
                    Toast.makeText(context, log, Toast.LENGTH_LONG).show()
                }
            }
        }
    }
```

    ### Java

```java   
    public class MyBroadcastReceiver extends BroadcastReceiver {
            private static final String TAG = "MyBroadcastReceiver";
            @Override
            public void onReceive(Context context, Intent intent) {
                StringBuilder sb = new StringBuilder();
                sb.append("Action: " + intent.getAction() + "n");
                sb.append("URI: " + intent.toUri(Intent.URI_INTENT_SCHEME).toString() + "n");
                String log = sb.toString();
                Log.d(TAG, log);
                Toast.makeText(context, log, Toast.LENGTH_LONG).show();
            }
        }
```

The system package manager registers the receiver when the app is installed. The receiver then becomes a separate entry point into your app which means that the system can start the app and deliver the broadcast if the app is not currently running.

The system creates a new `BroadcastReceiver` component object to handle each broadcast that it receives. This object is valid only for the duration of the call to `onReceive(Context, Intent)`. Once your code returns from this method, the system considers the component no longer active.

### Context-registered receivers

Context-registered receivers receive broadcasts as long as their registering context is valid. For an example, if you register within an `Activity` context, you receive broadcasts as long as the activity is not destroyed. If you register with the Application context, you receive broadcasts as long as the app is running.

To register a receiver with a context, perform the following steps:

1.  In your app's module-level build file, include version 1.9.0 or higher of the AndroidX Core library:
    
### Groovy

```groovy    
    dependencies {
        def core_version = "1.9.0"
    
        // Java language implementation
        implementation "androidx.core:core:$core_version"
        // Kotlin
        implementation "androidx.core:core-ktx:$core_version"
    
        // To use RoleManagerCompat
        implementation "androidx.core:core-role:1.0.0"
    
        // To use the Animator APIs
        implementation "androidx.core:core-animation:1.0.0-beta01"
        // To test the Animator APIs
        androidTestImplementation "androidx.core:core-animation-testing:1.0.0-beta01"
    
        // Optional - To enable APIs that query the performance characteristics of GMS devices.
        implementation "androidx.core:core-performance:1.0.0-alpha02"
    
        // Optional - to use ShortcutManagerCompat to donate shortcuts to be used by Google
        implementation "androidx.core:core-google-shortcuts:1.1.0"
    
        // Optional - to support backwards compatibility of RemoteViews
        implementation "androidx.core:core-remoteviews:1.0.0-beta03"
    
        // Optional - APIs for SplashScreen, including compatiblity helpers on devices prior Android 12
        implementation "androidx.core:core-splashscreen:1.0.0"
    }
```

### Kotlin

```kotlin    
    dependencies {
        val core_version = "1.9.0"
    
        // Java language implementation
        implementation("androidx.core:core:$core_version")
        // Kotlin
        implementation("androidx.core:core-ktx:$core_version")
    
        // To use RoleManagerCompat
        implementation("androidx.core:core-role:1.0.0")
    
        // To use the Animator APIs
        implementation("androidx.core:core-animation:1.0.0-beta01")
        // To test the Animator APIs
        androidTestImplementation("androidx.core:core-animation-testing:1.0.0-beta01")
    
        // Optional - To enable APIs that query the performance characteristics of GMS devices.
        implementation("androidx.core:core-performance:1.0.0-alpha02")
    
        // Optional - to use ShortcutManagerCompat to donate shortcuts to be used by Google
        implementation("androidx.core:core-google-shortcuts:1.1.0")
    
        // Optional - to support backwards compatibility of RemoteViews
        implementation("androidx.core:core-remoteviews:1.0.0-beta03")
    
        // Optional - APIs for SplashScreen, including compatiblity helpers on devices prior Android 12
        implementation("androidx.core:core-splashscreen:1.0.0")
    }
```
2.  Create an instance of `BroadcastReceiver`:
    
### Kotlin

```kotlin   
    val br: BroadcastReceiver = MyBroadcastReceiver()
```
    ### Java
```java 
    BroadcastReceiver br = new MyBroadcastReceiver();
```
3.  Create an instance of `IntentFilter`:
    
### Kotlin

```kotlin    
    val filter = IntentFilter(APP_SPECIFIC_BROADCAST)
```
### Java

```java    
    IntentFilter filter = new IntentFilter(APP_SPECIFIC_BROADCAST);
```

4.  Choose whether the broadcast receiver should be exported and visible to other apps on the device. If this receiver is listening for broadcasts sent from the system or from other apps—even other apps that you own—use the `RECEIVER_EXPORTED` flag. If instead this receiver is listening only for broadcasts sent by your app, use the `RECEIVER_NOT_EXPORTED` flag.
    
### Kotlin

```kotlin    
    val listenToBroadcastsFromOtherApps = false
    val receiverFlags = if (listenToBroadcastsFromOtherApps) {
        ContextCompat.RECEIVER_EXPORTED
    } else {
        ContextCompat.RECEIVER_NOT_EXPORTED
    }
```
### Java
```java    
    boolean listenToBroadcastsFromOtherApps = false;
    if (listenToBroadcastsFromOtherApps) {
        receiverFlags = ContextCompat.RECEIVER_EXPORTED;
    } else {
        receiverFlags = ContextCompat.RECEIVER_NOT_EXPORTED;
    }
```
5.  Register the receiver by calling `registerReceiver()`:
    
### Kotlin
```kotlin 
    ContextCompat.registerReceiver(context, br, filter, receiverFlags)
```

### Java
```java 
    ContextCompat.registerReceiver(context, br, filter, receiverFlags);
```

6.  To stop receiving broadcasts, call `unregisterReceiver(android.content.BroadcastReceiver)`. Be sure to unregister the receiver when you no longer need it or the context is no longer valid.
    
    Be mindful of where you register and unregister the receiver, for example, if you register a receiver in `onCreate(Bundle)` using the activity's context, you should unregister it in `onDestroy()` to prevent leaking the receiver out of the activity context. If you register a receiver in `onResume()`, you should unregister it in `onPause()` to prevent registering it multiple times (If you don't want to receive broadcasts when paused, and this can cut down on unnecessary system overhead). Do not unregister in `onSaveInstanceState(Bundle)`, because this isn't called if the user moves back in the history stack.
    

### Effects on process state

The state of your `BroadcastReceiver` (whether it is running or not) affects the state of its containing process, which can in turn affect its likelihood of being killed by the system. For example, when a process executes a receiver (that is, currently running the code in its `onReceive()` method), it is considered to be a foreground process. The system keeps the process running except under cases of extreme memory pressure.

However, once your code returns from `onReceive()`, the BroadcastReceiver is no longer active. The receiver's host process becomes only as important as the other app components that are running in it. If that process hosts only a manifest-declared receiver (a common case for apps that the user has never or not recently interacted with), then upon returning from `onReceive()`, the system considers its process to be a low-priority process and may kill it to make resources available for other more important processes.

For this reason, you should not start long running background threads from a broadcast receiver. After `onReceive()`, the system can kill the process at any time to reclaim memory, and in doing so, it terminates the spawned thread running in the process. To avoid this, you should either call `goAsync()` (if you want a little more time to process the broadcast in a background thread) or schedule a `JobService` from the receiver using the `JobScheduler`, so the system knows that the process continues to perform active work. For more information, see Processes and Application Life Cycle.

The following snippet shows a `BroadcastReceiver` that uses `goAsync()` to flag that it needs more time to finish after `onReceive()` is complete. This is especially useful if the work you want to complete in your `onReceive()` is long enough to cause the UI thread to miss a frame (>16ms), making it better suited for a background thread.

### Kotlin

```kotlin
class MyBroadcastReceiver : BroadcastReceiver() {
    private val scope = CoroutineScope(SupervisorJob())

    override fun onReceive(context: Context, intent: Intent) {
        val pendingResult: PendingResult = goAsync()

        scope.launch(Dispatchers.Default) {
            try {
                // Do some background work
                buildString {
                    append("Action: ").append(intent.action).append("n")
                    append("URI: ").append(intent.toUri(Intent.URI_INTENT_SCHEME)).append("n")
                }.also { log ->
                    Log.d(TAG, log)
                }
            } finally {
                // Must call finish() so the BroadcastReceiver can be recycled
                pendingResult.finish()
            }
        }
    }

    companion object {
        private const val TAG = "MyBroadcastReceiver"
    }
}
```

### Java

```java
public class MyBroadcastReceiver extends BroadcastReceiver {
    private static final String TAG = "MyBroadcastReceiver";

    private final Executor backgroundExecutor = Executors.newSingleThreadExecutor();

    @Override
    public void onReceive(Context context, Intent intent) {
        final PendingResult pendingResult = goAsync();

        backgroundExecutor.execute(() -> {
            try {
                // Do some background work
                StringBuilder sb = new StringBuilder();
                sb.append("Action: ").append(intent.getAction()).append("n");
                sb.append("URI: ").append(intent.toUri(Intent.URI_INTENT_SCHEME)).append("n");
                String log = sb.toString();
                Log.d(TAG, log);
            } finally {
                // Must call finish() so the BroadcastReceiver can be recycled
                pendingResult.finish();
            }
        });
    }
}
```

Sending broadcasts
------------------

Android provides three ways for apps to send broadcast:

*   The `sendOrderedBroadcast(Intent, String)` method sends broadcasts to one receiver at a time. As each receiver executes in turn, it can propagate a result to the next receiver, or it can completely abort the broadcast so that it won't be passed to other receivers. The order receivers run in can be controlled with the android:priority attribute of the matching intent-filter; receivers with the same priority will be run in an arbitrary order.
*   The `sendBroadcast(Intent)` method sends broadcasts to all receivers in an undefined order. This is called a Normal Broadcast. This is more efficient, but means that receivers cannot read results from other receivers, propagate data received from the broadcast, or abort the broadcast.
*   The `LocalBroadcastManager.sendBroadcast` method sends broadcasts to receivers that are in the same app as the sender. If you don't need to send broadcasts across apps, use local broadcasts. The implementation is much more efficient (no interprocess communication needed) and you don't need to worry about any security issues related to other apps being able to receive or send your broadcasts.

The following code snippet demonstrates how to send a broadcast by creating an Intent and calling `sendBroadcast(Intent)`.

### Kotlin

```kotlin
Intent().also { intent ->
    intent.setAction("com.example.broadcast.MY_NOTIFICATION")
    intent.putExtra("data", "Nothing to see here, move along.")
    sendBroadcast(intent)
}
```

### Java

```java
Intent intent = new Intent();
intent.setAction("com.example.broadcast.MY_NOTIFICATION");
intent.putExtra("data", "Nothing to see here, move along.");
sendBroadcast(intent);
```

The broadcast message is wrapped in an `Intent` object. The intent's action string must provide the app's Java package name syntax and uniquely identify the broadcast event. You can attach additional information to the intent with `putExtra(String, Bundle)`. You can also limit a broadcast to a set of apps in the same organization by calling `setPackage(String)` on the intent.

Restricting broadcasts with permissions
---------------------------------------

Permissions allow you to restrict broadcasts to the set of apps that hold certain permissions. You can enforce restrictions on either the sender or receiver of a broadcast.

### Sending with permissions

When you call `sendBroadcast(Intent, String)` or `sendOrderedBroadcast(Intent, String, BroadcastReceiver, Handler, int, String, Bundle)`, you can specify a permission parameter. Only receivers who have requested that permission with the tag in their manifest (and subsequently been granted the permission if it is dangerous) can receive the broadcast. For example, the following code sends a broadcast:

### Kotlin

```kotlin
sendBroadcast(Intent("com.example.NOTIFY"), Manifest.permission.SEND_SMS)
```

### Java

```java
sendBroadcast(new Intent("com.example.NOTIFY"),
              Manifest.permission.SEND_SMS);
```

To receive the broadcast, the receiving app must request the permission as shown below:

```xml
    <uses-permission android:name="android.permission.SEND_SMS"/>
```

You can specify either an existing system permission like `SEND_SMS` or define a custom permission with the `<permission>` element. For information on permissions and security in general, see the System Permissions.

### Receiving with permissions

If you specify a permission parameter when registering a broadcast receiver (either with `registerReceiver(BroadcastReceiver, IntentFilter, String, Handler)` or in `<receiver>` tag in your manifest), then only broadcasters who have requested the permission with the `<uses-permission>` tag in their manifest (and subsequently been granted the permission if it is dangerous) can send an Intent to the receiver.

For example, assume your receiving app has a manifest-declared receiver as shown below:

```xml
    <receiver android:name=".MyBroadcastReceiver"
              android:permission="android.permission.SEND_SMS">
        <intent-filter>
            <action android:name="android.intent.action.AIRPLANE_MODE"/>
        </intent-filter>
    </receiver>
    
```

Or your receiving app has a context-registered receiver as shown below:

### Kotlin

```kotlin
var filter = IntentFilter(Intent.ACTION_AIRPLANE_MODE_CHANGED)
registerReceiver(receiver, filter, Manifest.permission.SEND_SMS, null )
```

### Java

```java
IntentFilter filter = new IntentFilter(Intent.ACTION_AIRPLANE_MODE_CHANGED);
registerReceiver(receiver, filter, Manifest.permission.SEND_SMS, null );
```

Then, to be able to send broadcasts to those receivers, the sending app must request the permission as shown below:

```xml
    <uses-permission android:name="android.permission.SEND_SMS"/>
```

Security considerations and best practices
------------------------------------------

Here are some security considerations and best practices for sending and receiving broadcasts:

*   If you don't need to send broadcasts to components outside of your app, then send and receive local broadcasts with the `LocalBroadcastManager` which is available in the Support Library. The `LocalBroadcastManager` is much more efficient (no interprocess communication needed) and allows you to avoid thinking about any security issues related to other apps being able to receive or send your broadcasts. Local Broadcasts can be used as a general purpose pub/sub event bus in your app without any overheads of system wide broadcasts.
    
*   If many apps have registered to receive the same broadcast in their manifest, it can cause the system to launch a lot of apps, causing a substantial impact on both device performance and user experience. To avoid this, prefer using context registration over manifest declaration. Sometimes, the Android system itself enforces the use of context-registered receivers. For example, the `CONNECTIVITY_ACTION` broadcast is delivered only to context-registered receivers.
    
*   Do not broadcast sensitive information using an implicit intent. The information can be read by any app that registers to receive the broadcast. There are three ways to control who can receive your broadcasts:
    
    *   You can specify a permission when sending a broadcast.
    *   In Android 4.0 and higher, you can specify a package with `setPackage(String)` when sending a broadcast. The system restricts the broadcast to the set of apps that match the package.
    *   You can send local broadcasts with `LocalBroadcastManager`.
*   When you register a receiver, any app can send potentially malicious broadcasts to your app's receiver. There are three ways to limit the broadcasts that your app receives:
    
    *   You can specify a permission when registering a broadcast receiver.
    *   For manifest-declared receivers, you can set the android:exported attribute to "false" in the manifest. The receiver does not receive broadcasts from sources outside of the app.
    *   You can limit yourself to only local broadcasts with `LocalBroadcastManager`.
*   The namespace for broadcast actions is global. Make sure that action names and other strings are written in a namespace you own, or else you may inadvertently conflict with other apps.
    
*   Because a receiver's `onReceive(Context, Intent)` method runs on the main thread, it should execute and return quickly. If you need to perform long running work, be careful about spawning threads or starting background services because the system can kill the entire process after `onReceive()` returns. For more information, see Effect on process state To perform long running work, we recommend:
    
    *   Calling `goAsync()` in your receiver's `onReceive()` method and passing the `BroadcastReceiver.PendingResult` to a background thread. This keeps the broadcast active after returning from `onReceive()`. However, even with this approach the system expects you to finish with the broadcast very quickly (under 10 seconds). It does allow you to move work to another thread to avoid glitching the main thread.
    *   Scheduling a job with the `JobScheduler`. For more information, see Intelligent Job Scheduling.
*   Do not start activities from broadcast receivers because the user experience is jarring; especially if there is more than one receiver. Instead, consider displaying a notification.