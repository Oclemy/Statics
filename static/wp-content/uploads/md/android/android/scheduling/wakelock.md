# Keep the device awake

To avoid draining the battery, an Android device that is left idle quickly falls asleep. However, there are times when an application needs to wake up the screen or the CPU and keep it awake to complete some work.

The approach you take depends on the needs of your app. However, a general rule of thumb is that you should use the most lightweight approach possible for your app, to minimize your app's impact on system resources. The following sections describe how to handle the cases where the device's default sleep behavior is incompatible with the requirements of your app.

Alternatives to using wake locks
--------------------------------

Before adding wakelock support to your app, consider whether your app's use cases support one of the following alternative solutions:

*   If your app is performing long-running HTTP downloads, consider using `DownloadManager`.
    
*   If your app is synchronizing data from an external server, consider creating a sync adapter.
    
*   If your app relies on background services, consider using JobScheduler or Firebase Cloud Messaging to trigger these services at specific intervals.
    
*   If you need to keep your companion app running whenever a companion device is within range, use Companion Device Manager.
    

Keep the screen on
------------------

Certain apps need to keep the screen turned on, such as games or movie apps. The best way to do this is to use the `FLAG_KEEP_SCREEN_ON` in your activity (and only in an activity, never in a service or other app component). For example:

### Kotlin

```kotlin
class MainActivity : Activity() {

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_main)
        window.addFlags(WindowManager.LayoutParams.FLAG_KEEP_SCREEN_ON)
    }
}
```

### Java

```java
public class MainActivity extends Activity {
  @Override
  protected void onCreate(Bundle savedInstanceState) {
    super.onCreate(savedInstanceState);
    setContentView(R.layout.activity_main);
    getWindow().addFlags(WindowManager.LayoutParams.FLAG_KEEP_SCREEN_ON);
  }
}
```

The advantage of this approach is that unlike wake locks (discussed in Keep the CPU On), it doesn't require special permission, and the platform correctly manages the user moving between applications, without your app needing to worry about releasing unused resources.

Another way to implement this is in your application's layout XML file, by using the `android:keepScreenOn` attribute:

```xml
<RelativeLayout xmlns:android="http://schemas.android.com/apk/res/android"
    android:layout_width="match_parent"
    android:layout_height="match_parent"
    android:keepScreenOn="true">
    ...
</RelativeLayout>
```

Using `android:keepScreenOn="true"` is equivalent to using `FLAG_KEEP_SCREEN_ON`. You can use whichever approach is best for your app. The advantage of setting the flag programmatically in your activity is that it gives you the option of programmatically clearing the flag later and thereby allowing the screen to turn off.

### Ambient Mode for TV

On TV, `FLAG_KEEP_SCREEN_ON` should be used to prevent the device from going into Ambient Mode during active video playback. When `FLAG_KEEP_SCREEN_ON` is not set by the foreground activity, the device will automatically enter Ambient Mode after a period of inactivity.

Keep the CPU on
---------------

If you need to keep the CPU running in order to complete some work before the device goes to sleep, you can use a `PowerManager` system service feature called wake locks. Wake locks allow your application to control the power state of the host device.

Creating and holding wake locks can have a dramatic impact on the host device's battery life. Thus you should use wake locks only when strictly necessary and hold them for as short a time as possible. For example, you should never need to use a wake lock in an activity. As described above, if you want to keep the screen on in your activity, use `FLAG_KEEP_SCREEN_ON`.

One legitimate case for using a wake lock might be a background service that needs to grab a wake lock to keep the CPU running to do work while the screen is off. Again, though, this practice should be minimized because of its impact on battery life.

To use a wake lock, the first step is to add the `WAKE_LOCK` permission to your application's manifest file:

```xml
    <uses-permission android:name="android.permission.WAKE_LOCK" />
```

If your app includes a broadcast receiver that uses a service to do some work, you can manage your wake lock through a `WakefulBroadcastReceiver`, as described in Use a broadcast receiver that keeps the device awake. This is the preferred approach. If your app doesn't follow that pattern, here is how you set a wake lock directly:

### Kotlin

```kotlin
val wakeLock: PowerManager.WakeLock =
        (getSystemService(Context.POWER_SERVICE) as PowerManager).run {
            newWakeLock(PowerManager.PARTIAL_WAKE_LOCK, "MyApp::MyWakelockTag").apply {
                acquire()
            }
        }
```

### Java

```java
PowerManager powerManager = (PowerManager) getSystemService(POWER_SERVICE);
WakeLock wakeLock = powerManager.newWakeLock(PowerManager.PARTIAL_WAKE_LOCK,
        "MyApp::MyWakelockTag");
wakeLock.acquire();
```

To release the wake lock, call `wakelock.release()`). This releases your claim to the CPU. It's important to release a wake lock as soon as your app is finished using it to avoid draining the battery.

### Use a broadcast receiver that keeps the device awake

Using a broadcast receiver in conjunction with a service lets you manage the life cycle of a background task.

A `WakefulBroadcastReceiver` is a special type of broadcast receiver that takes care of creating and managing a `PARTIAL_WAKE_LOCK` for your app. A `WakefulBroadcastReceiver` passes off the work to a `Service` (typically an `IntentService`), while ensuring that the device does not go back to sleep in the transition. If you don't hold a wake lock while transitioning the work to a service, you are effectively allowing the device to go back to sleep before the work completes. The net result is that the app might not finish doing the work until some arbitrary point in the future, which is not what you want.

The first step in using a `WakefulBroadcastReceiver` is to add it to your manifest, as with any other broadcast receiver:

```xml
    <receiver android:name=".MyWakefulReceiver"></receiver>
```

The following code starts `MyIntentService` with the method `startWakefulService()`). This method is comparable to `startService()`), except that the `WakefulBroadcastReceiver` is holding a wake lock when the service starts. The intent that is passed with `startWakefulService()`) holds an extra identifying the wake lock:

### Kotlin

```kotlin
class MyWakefulReceiver : WakefulBroadcastReceiver() {

    override fun onReceive(context: Context, intent: Intent) {

        // Start the service, keeping the device awake while the service is
        // launching. This is the Intent to deliver to the service.
        Intent(context, MyIntentService::class.java).also { service ->
            WakefulBroadcastReceiver.startWakefulService(context, service)
        }
    }
}
```

### Java

```java
public class MyWakefulReceiver extends WakefulBroadcastReceiver {

    @Override
    public void onReceive(Context context, Intent intent) {

        // Start the service, keeping the device awake while the service is
        // launching. This is the Intent to deliver to the service.
        Intent service = new Intent(context, MyIntentService.class);
        startWakefulService(context, service);
    }
}
```

When the service is finished, it calls `MyWakefulReceiver.completeWakefulIntent()`) to release the wake lock. The `completeWakefulIntent()`) method has as its parameter the same intent that was passed in from the `WakefulBroadcastReceiver`:

### Kotlin

```kotlin
const val NOTIFICATION_ID = 1

class MyIntentService : IntentService("MyIntentService") {

    private val notificationManager: NotificationManager? = null
    internal var builder: NotificationCompat.Builder? = null

    override fun onHandleIntent(intent: Intent) {
        val extras: Bundle = intent.extras
        // Do the work that requires your app to keep the CPU running.
        // ...
        // Release the wake lock provided by the WakefulBroadcastReceiver.
        MyWakefulReceiver.completeWakefulIntent(intent)
    }
}
```

### Java

```java
public class MyIntentService extends IntentService {
    public static final int NOTIFICATION_ID = 1;
    private NotificationManager notificationManager;
    NotificationCompat.Builder builder;
    public MyIntentService() {
        super("MyIntentService");
    }
    @Override
    protected void onHandleIntent(Intent intent) {
        Bundle extras = intent.getExtras();
        // Do the work that requires your app to keep the CPU running.
        // ...
        // Release the wake lock provided by the WakefulBroadcastReceiver.
        MyWakefulReceiver.completeWakefulIntent(intent);
    }
}
```