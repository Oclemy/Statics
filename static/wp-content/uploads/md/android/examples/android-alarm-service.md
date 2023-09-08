# Kotlin Android Alarm - Launch Service Example

This example shows how you can schedule an alarm that causes a service to be started. This is useful when you want to schedule alarms that initiate long-running operations, such as retrieving recent e-mails.

> NB/= As of API 19, all repeating alarms are inexact. If your application needs precise delivery times then it must use one-time exact alarms, rescheduling each time. Legacy applications whose `targetSdkVersion` is earlier than API 19 will continue to have all of their alarms, including repeating alarms, treated as exact.


### Step 1: Create Project

Start by creating an empty android studio project.

### Step 2: Dependencies

No special dependencies are needed.

### Step 3: Design Layout

Create a layout and add buttons and an edittext as shown below:

**alarm_service.xml**

```xml
<?xml version="1.0" encoding="utf-8"?>
<LinearLayout xmlns:android="http://schemas.android.com/apk/res/android"
    xmlns:tools="http://schemas.android.com/tools"
    android:layout_width="match_parent"
    android:layout_height="match_parent"
    android:gravity="center_horizontal"
    android:orientation="vertical"
    android:padding="4dip"
    tools:ignore="InefficientWeight">

    <TextView
        android:layout_width="match_parent"
        android:layout_height="wrap_content"
        android:layout_weight="0"
        android:paddingBottom="4dip"
        android:text="@string/alarm_service"
        android:textAppearance="?android:attr/textAppearanceMedium" />

    <Button
        android:id="@+id/start_alarm"
        android:layout_width="wrap_content"
        android:layout_height="wrap_content"
        android:text="@string/start_alarm_service">

        <requestFocus />
    </Button>

    <Button
        android:id="@+id/stop_alarm"
        android:layout_width="wrap_content"
        android:layout_height="wrap_content"
        android:text="@string/stop_alarm_service" />

</LinearLayout>
```

### Step 4: Create a Service

We need to create an application service that will run in response to an alarm, allowing us to move long duration work out of an intent receiver.

Create a file `AlarmServiceService.kt` and add the following imports:

```kotlin
import android.annotation.TargetApi
import android.app.Notification
import android.app.NotificationChannel
import android.app.NotificationManager
import android.app.PendingIntent
import android.app.Service
import android.content.Context
import android.content.Intent
import android.graphics.Color
import android.os.Binder
import android.os.Build
import android.os.IBinder
import android.os.Parcel
import android.os.RemoteException
import android.util.Log
import android.widget.Toast
```

Create the service by extending the `android.app.Service` class:

```kotlin
@Suppress("MemberVisibilityCanBePrivate")
@TargetApi(Build.VERSION_CODES.O)
class AlarmServiceService : Service() {
```

Define a Handle to the `NOTIFICATION_SERVICE` system level service, used to notify the user of events that happen

```kotlin
    internal lateinit var mNM: NotificationManager
```

The function that runs in our worker thread. Starts executing the active part of the class' code. This method is called when a thread is started that has been created with a class which implements `Runnable`.

We set our `Long` variable `val endTime` to the current time in milliseconds plus 15 seconds, then we loop until the current time is greater than or equal to `endTime` (15 seconds have elapsed).

In the loop we call wait to wait that 15 seconds, but the loop is necessary just in case we are interrupted. After the wait is up we stop this service.

```kotlin
    @Suppress("PLATFORM_CLASS_MAPPED_TO_KOTLIN")
    internal var mTask: Runnable = Runnable {
        Log.i(TAG, "Our task has started running")
```

Normally we would do some work here... for our sample, we will just sleep for 30 seconds.

```kotlin
        val endTime = System.currentTimeMillis() + 15 * 1000
        while (System.currentTimeMillis() < endTime) {
            synchronized(mBinder) {
                try {
                    (mBinder as Object).wait(endTime - System.currentTimeMillis())
                } catch (e: Exception) {
                    Log.e("AlarmService: ", e.message, e)
                }

            }
        }
```

Done with our work... stop the service:

```kotlin
        this@AlarmServiceService.stopSelf()
    }
```

This is the object that receives interactions from clients. We just implement `onTransact` to call through to our super's implementation of `onTransact`.

```kotlin
    private val mBinder = object : Binder() {
```

The Default implementation is a stub that returns false. You will want to override this to do the appropriate un-marshalling of transactions. We simply return the return value of our super's implementation of `onTransact`.

- `@param code` - The action to perform. This should be a number between FIRST_CALL_TRANSACTION and LAST_CALL_TRANSACTION.
- `@param data` - Marshalled data to send to the target. Must not be null. If you are not sending any data, you must create an empty Parcel that is given here.
- `@param reply` - Marshalled data to be received from the target. May be null if you are not interested in the return value.
- `@param flags` - Additional operation flags. Either 0 for a normal RPC, or FLAG_ONEWAY for a one-way RPC.
- @return Our super's "reaction" to the request: true if code == INTERFACE_TRANSACTION or code == DUMP_TRANSACTION, false otherwise.
- `@throws RemoteException` - if there is a Binder remote-invocation error

```kotlin
        @Throws(RemoteException::class)
        override fun onTransact(code: Int, data: Parcel, reply: Parcel?, flags: Int): Boolean {
            return super.onTransact(code, data, reply, flags)
        }
    }
```

The following is Called by the system when the service is first created. First we initialize our `NotificationManager` field `mNM` with a handle to the `NotificationManager` system service.

We initialize our `NotificationChannel` variable `val chan1` with a new instance whose id and user visible name are both PRIMARY_CHANNEL ("default"), and whose importance is IMPORTANCE_DEFAULT (shows everywhere, makes noise, but does not visually intrude).

We set the notification light color of `chan1` to GREEN, and set its lock screen visibility to VISIBILITY_PRIVATE (shows this notification on all lockscreens, but conceal sensitive or private information on secure lockscreens). We then have [mNM] create notification channel `chan1`. Next we show our icon in the status bar by calling our method `showNotification`.

Then we create a new `Thread` variable `val thr` to run our `Runnable` field `mTask` with the name "AlarmService_Service". Finally we start `thr`.

```kotlin
    override fun onCreate() {
        Log.i(TAG, "onCreate has been called")
        mNM = getSystemService(Context.NOTIFICATION_SERVICE) as NotificationManager
        val chan1 = NotificationChannel(PRIMARY_CHANNEL, PRIMARY_CHANNEL,
                NotificationManager.IMPORTANCE_DEFAULT)
        chan1.lightColor = Color.GREEN
        chan1.lockscreenVisibility = Notification.VISIBILITY_PRIVATE
        mNM.createNotificationChannel(chan1)
```

Show the icon in the status bar:

```kotlin
        showNotification()
```

Start up the thread running the service. Note that we create a separate thread because the service normally runs in the process's main thread, which we don't want to block.

```kotlin
        val thr = Thread(null, mTask, "AlarmService_Service")
        thr.start()
    }
```

The following is Called by the system to notify a Service that it is no longer used and is being removed. The service should clean up any resources it holds (threads, registered receivers, etc) at this point. Upon return, there will be no more calls in to this Service object and it is effectively dead. Do not call this method directly.

We use our `NotificationManager` field `mNM` to cancel our notification using the same identifier we used to start it in the method `showNotification`, then we show a Toast stating: "The alarm service has finished running"

```kotlin
    override fun onDestroy() {
        Log.i(TAG, "onDestroy has been called")
```

Cancel the notification -- we use the same ID that we had used to start it:

```kotlin
        mNM.cancel(R.string.alarm_service_started)

        // Tell the user we stopped.
        Toast.makeText(this, R.string.alarm_service_finished, Toast.LENGTH_SHORT).show()
    }
```

Return the communication channel to the service. We simply return our minimalist `IBinder` field `mBinder`.

- `@param intent` - The Intent that was used to bind to this service, as given to `android.content.Context.bindService`. Note that any extras that were included with the `Intent` at that point will _not_ be seen here.
    
- `@return` Return an `IBinder` through which clients can call on to the service.
    

```kotlin
    override fun onBind(intent: Intent): IBinder? {
        Log.i(TAG, "onBind has been called")
        return mBinder
    }
```

The following will Show a notification while this service is running. First we fetch the resource String `R.string.alarm_service_started` ("The alarm service has started running") into our `CharSequence` variable `val text`, then we create a `PendingIntent` for our variable `val contentIntent` to start the `Activity AlarmService` (the Activity that launched us).

Next we build our `Notification` variable `val notification` using a method chain starting with a new instance of `Notification.Builder` for `NotificationChannel` `PRIMARY_CHANNEL`. It consists of a small icon R.drawable.stat_sample, [CharSequence] `text` as the "ticker" text which is sent to accessibility services, a timestamp of the current time in milliseconds, a title of `R.string.alarm_service_label` ("Sample Alarm Service"), `text` as the second line of text in the platform notification template, and our `PendingIntent` variable `contentIntent` as the `PendingIntent` to be sent when the notification is clicked.

Finally we post our notification to be shown in the status bar using an `id` consisting of our resource id `R.string.alarm_service_started`.

```kotlin
    private fun showNotification() {
        Log.i(TAG, "showNotification has been called")
```

In this sample, we'll use the same text for the ticker and the expanded notification:

```kotlin
        val text = getText(R.string.alarm_service_started)
```

The PendingIntent to launch our activity if the user selects this notification:

```kotlin
        val contentIntent = PendingIntent.getActivity(this, 0,
                Intent(this, AlarmService::class.java), 0)
```

Set the info for the views that show in the notification panel:

```kotlin
        val notification = Notification.Builder(this, PRIMARY_CHANNEL)
                .setSmallIcon(R.drawable.stat_sample)  // the status icon
                .setTicker(text)  // the status text
                .setWhen(System.currentTimeMillis())  // the time stamp
                .setContentTitle(getText(R.string.alarm_service_label))  // the label of the entry
                .setContentText(text)  // the contents of the entry
                .setContentIntent(contentIntent)  // The intent to send when the entry is clicked
                .build()
```

Send the notification. We use a layout id because it is a unique number. We use it later to cancel.:

```kotlin
        mNM.notify(R.string.alarm_service_started, notification)
    }
    /**
     * Our static constant.
     */
    companion object {
        /**
         * The id of the primary notification channel
         */
        const val PRIMARY_CHANNEL = "default"
        /**
         * TAG used for logging.
         */
        const val TAG = "AlarmServiceService"
    }
}
```

Here's the full code:

**AlarmServiceService.kt**

```kotlin
import com.example.android.apis.R

import android.annotation.TargetApi
import android.app.Notification
import android.app.NotificationChannel
import android.app.NotificationManager
import android.app.PendingIntent
import android.app.Service
import android.content.Context
import android.content.Intent
import android.graphics.Color
import android.os.Binder
import android.os.Build
import android.os.IBinder
import android.os.Parcel
import android.os.RemoteException
import android.util.Log
import android.widget.Toast

@Suppress("MemberVisibilityCanBePrivate")
@TargetApi(Build.VERSION_CODES.O)
class AlarmServiceService : Service() {
    internal lateinit var mNM: NotificationManager

    @Suppress("PLATFORM_CLASS_MAPPED_TO_KOTLIN")
    internal var mTask: Runnable = Runnable {
        Log.i(TAG, "Our task has started running")
        val endTime = System.currentTimeMillis() + 15 * 1000
        while (System.currentTimeMillis() < endTime) {
            synchronized(mBinder) {
                try {
                    (mBinder as Object).wait(endTime - System.currentTimeMillis())
                } catch (e: Exception) {
                    Log.e("AlarmService: ", e.message, e)
                }

            }
        }

        this@AlarmServiceService.stopSelf()
    }

    private val mBinder = object : Binder() {
        @Throws(RemoteException::class)
        override fun onTransact(code: Int, data: Parcel, reply: Parcel?, flags: Int): Boolean {
            return super.onTransact(code, data, reply, flags)
        }
    }
    override fun onCreate() {
        Log.i(TAG, "onCreate has been called")
        mNM = getSystemService(Context.NOTIFICATION_SERVICE) as NotificationManager
        val chan1 = NotificationChannel(PRIMARY_CHANNEL, PRIMARY_CHANNEL,
                NotificationManager.IMPORTANCE_DEFAULT)
        chan1.lightColor = Color.GREEN
        chan1.lockscreenVisibility = Notification.VISIBILITY_PRIVATE
        mNM.createNotificationChannel(chan1)
        // show the icon in the status bar
        showNotification()

        val thr = Thread(null, mTask, "AlarmService_Service")
        thr.start()
    }
    override fun onDestroy() {
        Log.i(TAG, "onDestroy has been called")
        // Cancel the notification -- we use the same ID that we had used to start it
        mNM.cancel(R.string.alarm_service_started)

        // Tell the user we stopped.
        Toast.makeText(this, R.string.alarm_service_finished, Toast.LENGTH_SHORT).show()
    }

    override fun onBind(intent: Intent): IBinder? {
        Log.i(TAG, "onBind has been called")
        return mBinder
    }

    private fun showNotification() {
        Log.i(TAG, "showNotification has been called")

        val text = getText(R.string.alarm_service_started)

        // The PendingIntent to launch our activity if the user selects this notification
        val contentIntent = PendingIntent.getActivity(this, 0,
                Intent(this, AlarmService::class.java), 0)

        // Set the info for the views that show in the notification panel.
        val notification = Notification.Builder(this, PRIMARY_CHANNEL)
                .setSmallIcon(R.drawable.stat_sample)  // the status icon
                .setTicker(text)  // the status text
                .setWhen(System.currentTimeMillis())  // the time stamp
                .setContentTitle(getText(R.string.alarm_service_label))  // the label of the entry
                .setContentText(text)  // the contents of the entry
                .setContentIntent(contentIntent)  // The intent to send when the entry is clicked
                .build()

        // Send the notification.
        // We use a layout id because it is a unique number.  We use it later to cancel.
        mNM.notify(R.string.alarm_service_started, notification)
    }

    /**
     * Our static constant.
     */
    companion object {
        /**
         * The id of the primary notification channel
         */
        const val PRIMARY_CHANNEL = "default"
        /**
         * TAG used for logging.
         */
        const val TAG = "AlarmServiceService"
    }
}
```

### Step 5: Create Activity

Start by creating the file `AlarmService.kt`.

Then add the following imports:

```kotlin
import android.annotation.SuppressLint
import android.app.AlarmManager
import android.app.PendingIntent
import android.content.Context
import android.content.Intent
import android.os.Bundle
import android.os.SystemClock
import android.view.View.OnClickListener
import android.widget.Button
import android.widget.Toast
import androidx.appcompat.app.AppCompatActivity
```

Now create an activity `AlarmService` by extending the `AppCompatActivity`:

```kotlin

@SuppressLint("ShortAlarm")
class AlarmService : AppCompatActivity() {
```

Initialize a `IntentSender` used to launch our service:

```kotlin
    private var mAlarmSender: PendingIntent? = null
```

The `OnClickListener` for Button `R.id.start_alarm` ("Start Alarm Service") starts the alarm service.

We first fetch the milliseconds since boot, including time spent in sleep to our Long variable `val firstTime`. Then we get a handle to the `AlarmManager` system service to initialize our `AlarmManager` variable `val am`, and use it to schedule a repeating alarm of type `ELAPSED_REALTIME_WAKEUP` (which will wake up the device when it goes off), with the current milliseconds contained in firstTime `as the time that the alarm should first go off, the interval in milliseconds between subsequent repeats of the alarm set to 30 seconds, and our` PendingIntent `field` mAlarmSender\` as the action to perform when the alarm goes off.

Finally we display a Toast stating: "Repeating alarm will go off in 15 seconds and every 15 seconds after based on the elapsed realtime clock"

```kotlin
    private val mStartAlarmListener = OnClickListener {
```

We want the alarm to go off 30 seconds from now.

```kotlin
        val firstTime = SystemClock.elapsedRealtime()
```

Schedule the alarm:

```kotlin
        val am = getSystemService(Context.ALARM_SERVICE) as AlarmManager

        am.setRepeating(AlarmManager.ELAPSED_REALTIME_WAKEUP,
                firstTime, (30 * 1000).toLong(), mAlarmSender)
```

Then inform the user about what we did:

```kotlin
        Toast.makeText(this@AlarmService, R.string.repeating_scheduled,
                Toast.LENGTH_LONG).show()
    }
```

The `OnClickListener` for Button `R.id.stop_alarm` ("Stop Alarm Service") stops the alarm service.

First we get a handle to the `AlarmManager` system service to initialize our `AlarmManager` variable `val am`, and use it to cancel any alarms with an `Intent` matching our `PendingIntent` field `mAlarmSender`. Finally we show a Toast stating: "Repeating alarm has been unscheduled".

```kotlin
    private val mStopAlarmListener = OnClickListener {
```

Cancel the alarm:

```kotlin
        val am = getSystemService(Context.ALARM_SERVICE) as AlarmManager

        am.cancel(mAlarmSender)

        // Tell the user about what we did.
        Toast.makeText(this@AlarmService, R.string.repeating_unscheduled,
                Toast.LENGTH_LONG).show()
    }
```

The following is Called when the activity is starting. First we call through to our super's implementation of `onCreate`, then we set our content view to our layout file `R.layout.alarm_service`. Next we initialize our `PendingIntent` field `mAlarmSender` to a new instance intended to launch the `Service` `AlarmServiceService` which is declared to be a service in AndroidManifest.xml using the element:

- `<service android:name=".app.AlarmService_Service" android:process=":remote"></service>`

Then we locate Button `R.id.start_alarm` ("Start Alarm Service") and set its `OnClickListener` to our `OnClickListener` field `mStartAlarmListener` which starts the alarm service when the Button is clicked, and locate the Button `R.id.stop_alarm` ("Stop Alarm Service") and set its `OnClickListener` to our `OnClickListener` field `mStopAlarmListener` which stops the alarm service when the Button is clicked.

```kotlin
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.alarm_service)
```

Create an IntentSender that will launch our service, to be scheduled with the alarm manager:

```kotlin
        mAlarmSender = PendingIntent.getService(this@AlarmService,
                0, Intent(this@AlarmService, AlarmServiceService::class.java), 0)
```

Watch for button clicks:

```kotlin
        var button = findViewById<Button>(R.id.start_alarm)
        button.setOnClickListener(mStartAlarmListener)
        button = findViewById(R.id.stop_alarm)
        button.setOnClickListener(mStopAlarmListener)
    }
}
```

Here is the full code:

**AlarmService.kt**

```kotlin

import android.annotation.SuppressLint
import android.app.AlarmManager
import android.app.PendingIntent
import android.content.Context
import android.content.Intent
import android.os.Bundle
import android.os.SystemClock
import android.view.View.OnClickListener
import android.widget.Button
import android.widget.Toast
import androidx.appcompat.app.AppCompatActivity

import com.example.android.apis.R

@SuppressLint("ShortAlarm")
class AlarmService : AppCompatActivity() {
    private var mAlarmSender: PendingIntent? = null

    private val mStartAlarmListener = OnClickListener {
        // We want the alarm to go off 30 seconds from now.
        val firstTime = SystemClock.elapsedRealtime()

        // Schedule the alarm!
        val am = getSystemService(Context.ALARM_SERVICE) as AlarmManager

        am.setRepeating(AlarmManager.ELAPSED_REALTIME_WAKEUP,
                firstTime, (30 * 1000).toLong(), mAlarmSender)

        Toast.makeText(this@AlarmService, R.string.repeating_scheduled,
                Toast.LENGTH_LONG).show()
    }

    private val mStopAlarmListener = OnClickListener {
        val am = getSystemService(Context.ALARM_SERVICE) as AlarmManager

        am.cancel(mAlarmSender)

        Toast.makeText(this@AlarmService, R.string.repeating_unscheduled,
                Toast.LENGTH_LONG).show()
    }

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.alarm_service)
        mAlarmSender = PendingIntent.getService(this@AlarmService,
                0, Intent(this@AlarmService, AlarmServiceService::class.java), 0)

        var button = findViewById<Button>(R.id.start_alarm)
        button.setOnClickListener(mStartAlarmListener)
        button = findViewById(R.id.stop_alarm)
        button.setOnClickListener(mStopAlarmListener)
    }
}
```

### Step 6: Android Manifest

Make sure you register both the `Activity` and the `Service` in your `AndroidManifest.xml`, as follows;

```xml
        <activity
            android:name=".app.AlarmService"
            android:label="@string/activity_alarm_service"
            android:theme="@style/Theme.AppCompat.Light">
            <intent-filter>
                <action android:name="android.intent.action.MAIN" />
                <category android:name="android.intent.category.SAMPLE_CODE" />
            </intent-filter>
        </activity>
                <service
            android:name=".app.AlarmServiceService"
            android:process=":remote" />
```

### Step 7: Run

1. Copy the layout and the kotlin code.
2. Run
