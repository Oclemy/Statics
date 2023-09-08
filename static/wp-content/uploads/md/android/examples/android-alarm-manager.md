# Alarm Examples



_AlarmManager_ is a class that allows us create alarms. Alarms allow our apps to schedule specific codes to be executed at certain times in the future.

```java
public class AlarmManager extends Object{}
```

It's better and more efficient to use AlarmManager class to create alarms for scheduling than using something like a timer.


_AlarmManager_ provides to us the access to system alarm services, so it's not like we are going to invent our scheduling algorithms.

AlarmManager is mostly used together with _BroadcastReceivers_. Here's how it works:

- First Alarm goes off or rings.
- The system broadcasts an intent. This is the intent which had been registered for it.
- This automatically starts the target application in case it's not already running.
- If the device sleeps, the alarms that are already registered get retained.
- If the alarm goes off while the device is sleeping, then the device is woken up. This is optional.
- If the user turns the device off or reboots it, then the alarms are cleared.

You are guaranteed that the phone will not sleep till you have finished handling your broadcast. Broadcast are handled by the `onReceive()` method of the `android.content.BroadcastReceiver`. This is a method you override after deriving this class.

As long as the The `onReceive()` method is still executing, the AlarmManager will hold a CPU wake lock. So the device won't sleep.

Then the AlarmManager releases the wake lock when the `onReceive()` finishes executing and returns.

But sometimes just as the `onReceive()` method finishes, it's possible that the phone can sleep immediately. Because the device has slept quickly, if you had requested a service using the `Context.startService()` it won't be started. This is because the device has slept before it's called. However, the initial wake lock is no longer in place. It had been released the moment the `onReceive()` had returned. So what's the solution? Well you implement a separate wake lock on your BroadcastReceiver and Service. This wake lock will ensure the device runs until the service becomes available.

So when should you use alarm manager and when should you not? Well use alarm manager for scheduling operations. Don't use it for timing and ticking operations. And don't use timers for scheduling operations. Scheduled code using alarmmanager do not require teh application to be running all the time. If you used a timer then it would have to run throughout. This wastes memory and processing time.

The Android Operating System shifts alarms so us minimize wakeups and battery use. This is starting from Android API 19(KitKat). This the alarms may not be strictly exact. If you need to be strictly exact, then you can use the `setExact()` method.

AlarmManager is not directly instantiated. Instead you use the static `getSystemService()` of the `Context` class. You pass the `Context.ALARM_SERVICE` flag.

```java
Context.getSystemService(Context.ALARM_SERVICE
```

## Example 1: Kotlin Android Build an Alarm Clock

This is an example to teach you usage of Alarms and Broadcastreceiver. In the process you build a simple alarm clock. This example allows you learn these technologies in a practical manner.

### Step 1: Create Kotlin Project

Start by creating an empty Kotlin Project in Android Studio.

### Step 2: Dependencies

No special dependencies are needed. However because Coroutines are used, be sure to use Kotlin.

### Step 3: Permissions

No permissions are needed for this project. However in your in `AndroidManifest.xml`, be sure to register the `receiver` since `BroadcastReceiver` is used in this alarm clock.

```xml
        <receiver
            android:name=".AlarmReceiver"
            android:exported="false" />
```

### Step 4: Design Layout

You only need one layout, the main activity layout. Simply add TextViews and buttons and constraint them using the `ConstraintLayout` as follows:

**activity_main.xml**

```xml
<?xml version="1.0" encoding="utf-8"?>
<androidx.constraintlayout.widget.ConstraintLayout xmlns:android="http://schemas.android.com/apk/res/android"
    xmlns:app="http://schemas.android.com/apk/res-auto"
    xmlns:tools="http://schemas.android.com/tools"
    android:layout_width="match_parent"
    android:layout_height="match_parent"
    android:background="@color/background_black"
    tools:context=".MainActivity">

    <View
        android:layout_width="0dp"
        android:layout_height="0dp"
        android:layout_marginHorizontal="50dp"
        android:background="@drawable/background_white_ring"
        app:layout_constraintBottom_toTopOf="@id/onOffButton"
        app:layout_constraintDimensionRatio="H,1:1"
        app:layout_constraintEnd_toEndOf="parent"
        app:layout_constraintStart_toStartOf="parent"
        app:layout_constraintTop_toTopOf="parent" />

    <TextView
        android:id="@+id/timeTextView"
        android:layout_width="wrap_content"
        android:layout_height="wrap_content"
        android:text="09:30"
        android:textColor="@color/white"
        android:textSize="50sp"
        app:layout_constraintBottom_toTopOf="@id/ampmTextView"
        app:layout_constraintLeft_toLeftOf="parent"
        app:layout_constraintRight_toRightOf="parent"
        app:layout_constraintTop_toTopOf="parent"
        app:layout_constraintVertical_chainStyle="packed" />

    <TextView
        android:id="@+id/ampmTextView"
        android:layout_width="wrap_content"
        android:layout_height="wrap_content"
        android:text="AM"
        android:textColor="@color/white"
        android:textSize="25sp"
        app:layout_constraintBottom_toTopOf="@id/onOffButton"
        app:layout_constraintEnd_toEndOf="parent"
        app:layout_constraintStart_toStartOf="parent"
        app:layout_constraintTop_toBottomOf="@id/timeTextView" />

    <Button
        android:id="@+id/onOffButton"
        android:layout_width="0dp"
        android:layout_height="wrap_content"
        android:text="@string/on_alarm"
        app:layout_constraintBottom_toTopOf="@id/changeAlarmTimeButton"
        app:layout_constraintEnd_toEndOf="parent"
        app:layout_constraintStart_toStartOf="parent" />

    <Button
        android:id="@+id/changeAlarmTimeButton"
        android:layout_width="0dp"
        android:layout_height="wrap_content"
        android:text="@string/change_time"
        app:layout_constraintBottom_toBottomOf="parent"
        app:layout_constraintEnd_toEndOf="parent"
        app:layout_constraintStart_toStartOf="parent" />

</androidx.constraintlayout.widget.ConstraintLayout>
```

### Step 5: Create model class

Create a model class, Kotlin data class that receives the two integers and a boolean via the constructor. The integers are the hour and the minute while the boolean is an on-off swicth. These will be used to construct a timer view to be rendered in the alarm clock:

**`AlarmDisplayModel.kt`**

```kotlin
package com.example.alarmclock

data class AlarmDisplayModel(
    val hour: Int,
    val minute: Int,
    var onOff: Boolean
) {

    val timeText: String
        get() {
            val h = "%02d".format(if (hour < 12) hour else hour - 12)
            val m = "%02d".format(minute)

            return "$h:$m"
        }

    val ampmText: String
        get() {
            return if (hour < 12) "AM" else "PM"
        }

    val onOffText: String
        get() {
            return if (onOff) "알람 끄기" else "알람 켜기"
        }

    fun makeDataForDB(): String {
        return "$hour:$minute"
    }

}
```

### Step 5: Create an Alarm Receiver

You do this by extending the broadcast receiver and overriding the `onReceive()` method. Inside the `onReceive()` you will create a notification channel as well as build a notification.

Here is the full code:

**`AlarmReceiver.kt`**

```kotlin
package com.example.alarmclock

import android.app.NotificationChannel
import android.app.NotificationManager
import android.content.BroadcastReceiver
import android.content.Context
import android.content.Intent
import android.os.Build
import androidx.core.app.NotificationCompat
import androidx.core.app.NotificationManagerCompat

class AlarmReceiver: BroadcastReceiver() {

    companion object {
        const val NOTIFICATION_ID = 100
        const val NOTIFICATION_CHANNEL_ID = "1000"
    }

    override fun onReceive(context: Context, intent: Intent) {
        createNotificationChannel(context)
        notifyNotification(context)
    }

    private fun createNotificationChannel(context: Context) {

        if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.O) {
            val notificationChannel = NotificationChannel(
                NOTIFICATION_CHANNEL_ID,
                "기상 알람",
                NotificationManager.IMPORTANCE_HIGH
            )

            NotificationManagerCompat.from(context).createNotificationChannel(notificationChannel)
        }
    }

    private fun notifyNotification(context: Context) {
        with(NotificationManagerCompat.from(context)) {
            val build = NotificationCompat.Builder(context, NOTIFICATION_CHANNEL_ID)
                .setContentTitle("알람")
                .setContentText("일어날 시간입니다.")
                .setSmallIcon(R.drawable.ic_launcher_foreground)
                .setPriority(NotificationCompat.PRIORITY_HIGH)

            notify(NOTIFICATION_ID, build.build())

        }

    }

}
```

### Step 6: Create main Activity

Finally create your main activity as below:

**`MainActivity.kt`**

```kotlin
package com.example.alarmclock

import android.app.AlarmManager
import android.app.PendingIntent
import android.app.TimePickerDialog
import android.content.Context
import android.content.Intent
import androidx.appcompat.app.AppCompatActivity
import android.os.Bundle
import android.widget.Button
import android.widget.TextView
import java.util.*

class MainActivity : AppCompatActivity() {

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_main)

        initOnOffButton()
        initChangeAlarmTimeButton()

        val model = fetchDataFromSharedPreferences()
        renderView(model)

    }

    private fun initOnOffButton() {
        val onOffButton = findViewById<Button>(R.id.onOffButton)
        onOffButton.setOnClickListener {

            val model = it.tag as? AlarmDisplayModel ?: return@setOnClickListener
            val newModel = saveAlarmModel(model.hour, model.minute, model.onOff.not())
            renderView(newModel)

            if (newModel.onOff) {
                // 켜진 경우 -> 알람을 등록
                val calendar = Calendar.getInstance().apply {
                    set(Calendar.HOUR_OF_DAY, newModel.hour)
                    set(Calendar.MINUTE, newModel.minute)

                    if (before(Calendar.getInstance())) {
                        add(Calendar.DATE, 1)
                    }
                }

                val alarmManager = getSystemService(Context.ALARM_SERVICE) as AlarmManager
                val intent = Intent(this, AlarmReceiver::class.java)
                val pendingIntent = PendingIntent.getBroadcast(this, ALARM_REQUEST_CODE,
                    intent, PendingIntent.FLAG_UPDATE_CURRENT)

                alarmManager.setInexactRepeating(
                    AlarmManager.RTC_WAKEUP,
                    calendar.timeInMillis,
                    AlarmManager.INTERVAL_DAY,
                    pendingIntent
                )

            } else {
                cancelAlarm()
            }

        }
    }

    private fun initChangeAlarmTimeButton() {
        val changeAlarmButton = findViewById<Button>(R.id.changeAlarmTimeButton)
        changeAlarmButton.setOnClickListener {

            val calendar = Calendar.getInstance()
            TimePickerDialog(this, { picker, hour, minute ->

                val model = saveAlarmModel(hour, minute, false)
                renderView(model)
                cancelAlarm()

            }, calendar.get(Calendar.HOUR_OF_DAY), calendar.get(Calendar.MINUTE), false).show()

        }

    }

    private fun saveAlarmModel(
        hour: Int,
        minute: Int,
        onOff: Boolean
    ): AlarmDisplayModel {
        val model = AlarmDisplayModel(
            hour = hour,
            minute = minute,
            onOff = onOff
        )

        val sharedPreferences = getSharedPreferences(SHARED_PREFERENCES_NAME, Context.MODE_PRIVATE)

        with(sharedPreferences.edit()) {
            putString(ALARM_KEY, model.makeDataForDB())
            putBoolean(ONOFF_KEY, model.onOff)
            commit()
        }

        return model
    }

    private fun fetchDataFromSharedPreferences():AlarmDisplayModel {
        val sharedPreferences = getSharedPreferences(SHARED_PREFERENCES_NAME, Context.MODE_PRIVATE)

        val timeDBValue = sharedPreferences.getString(ALARM_KEY, "9:30") ?: "9:30"
        val onOffDBValue = sharedPreferences.getBoolean(ONOFF_KEY, false)
        val alarmData = timeDBValue.split(":")

        val alarmModel = AlarmDisplayModel(
            hour = alarmData[0].toInt(),
            minute = alarmData[1].toInt(),
            onOff = onOffDBValue
        )

        // 보정 보정 예외처리

        val pendingIntent = PendingIntent.getBroadcast(this, ALARM_REQUEST_CODE, Intent(this, AlarmReceiver::class.java), PendingIntent.FLAG_NO_CREATE)

        if ((pendingIntent == null) and alarmModel.onOff) {
            // 알람은 꺼져있는데, 데이터는 켜저있는 경우
            alarmModel.onOff = false

        } else if ((pendingIntent != null) and alarmModel.onOff.not()){
            // 알람은 켜져있는데, 데이터는 꺼져있는 경우
            // 알람을 취소함
            pendingIntent.cancel()
        }

        return alarmModel

    }

    private fun renderView(model: AlarmDisplayModel) {
        findViewById<TextView>(R.id.ampmTextView).apply {
            text = model.ampmText
        }

        findViewById<TextView>(R.id.timeTextView).apply {
            text = model.timeText
        }

        findViewById<Button>(R.id.onOffButton).apply {
            text = model.onOffText
            tag = model
        }

    }

    private fun cancelAlarm() {
        val pendingIntent = PendingIntent.getBroadcast(this, ALARM_REQUEST_CODE, Intent(this, AlarmReceiver::class.java), PendingIntent.FLAG_NO_CREATE)
        pendingIntent?.cancel()
    }

    companion object {
        private const val SHARED_PREFERENCES_NAME = "time"
        private const val ALARM_KEY = "alarm"
        private const val ONOFF_KEY = "onOff"
        private const val ALARM_REQUEST_CODE = 1000

    }
}
```

### Step 7: Run

Finally run the project.

### Reference

Here are the code reference links:

| Number | Link |
| --- | --- |
| 1. | [Download code](https://github.com/StephenLeeDev/AlarmClock/archive/refs/heads/master.zip) |
| 2. | [Follow code author](https://github.com/StephenLeeDev/) |

## Example 2: How to Start an Alarm

One of those mobile-like software applications is the Alarm. Or any app that can schedule something to happen in the future. This is even more important in mobile devices than in desktop applications.

Because we never leave or power off our mobile devices. They are our personal assistants. So we use them in more personal ways than we would ever do with desktop applications.

So Android provides us a rich class called _AlarmManager_. A class that allows us access system services. The class is obviously public and derives from `java.lang.Object`.

Here's its definition:

```java
    public class AlarmManager extends Object{}
```

### What do we build?

Well let's see a simple android alarm manager example. We see how to start and cancel an alarm in android. We have a basic edittext. The user enters the time in miliseconds for the alarm to ring. The alarm rings by displaying a simple toast message.

### Project Structure

Here's the project structure:

### Step 1 - Create Android Project

- In your android studio go to File -- New -- New Project.
- Type Project Name.
- Choose minimum sdk.
- From templates choose empty activity or bla.

### Step 2. - Let's modify our build.gradle.

This is our second step. Android projets created in android studio have two `buil.gradle` files. We are interested in the app level build.gradle.

Add the followng code under the dependencies section:

```groovy
        compile 'com.android.support:appcompat-v7:24.2.1'
        compile 'com.android.support:design:24.2.1'
```

We've added two dependencies from support library: `AppCompat` and `design`.

### Step 3. Let's prepare our resources.

The only resource we need to prepare in this case is the layouts. I chose the basic activity as my template. So I have two layouts:

- _activity_main.xm_ : template layout
- _content_main.xml_ : this what we modify.

All I need is add one edittext and one button. The edittext where the user will enter the time in seconds and the start button to start the alarm.

```xml
     <?xml version="1.0" encoding="utf-8"?>
    <RelativeLayout

        android_layout_width="match_parent"
        android_layout_height="match_parent"
        android_paddingBottom="@dimen/activity_vertical_margin"
        android_paddingLeft="@dimen/activity_horizontal_margin"
        android_paddingRight="@dimen/activity_horizontal_margin"
        android_paddingTop="@dimen/activity_vertical_margin"
        app_layout_behavior="@string/appbar_scrolling_view_behavior"
        tools_context="com.tutorials.hp.alarmmanagerstarter.MainActivity"
        tools_showIn="@layout/activity_main">

        <EditText
            android_id="@+id/timeTxt"
            android_layout_width="wrap_content"
            android_layout_height="wrap_content"
            android_layout_alignParentLeft="true"
            android_layout_alignParentTop="true"
            android_layout_marginTop="28dp"
            android_ems="10"
            android_hint="Number of seconds"
            android_inputType="numberDecimal" />

        <Button
            android_id="@+id/startBtn"
            android_layout_width="wrap_content"
            android_layout_height="wrap_content"
            android_layout_alignRight="@+id/timeTxt"
            android_layout_below="@+id/timeTxt"
            android_layout_marginRight="60dp"
            android_layout_marginTop="120dp"
            android_text="Start" />
    </RelativeLayout>
```

### Step 4. Let's create our BroadcastReceiver class.

A BroadcastReceiver is one of the android components. Others include Activity, Service and ContentProvider. A BroadcastReceiver listens to System events.

It's actually an abstract class that's obviously public. It derives form `java.lang.Object` :

```java
    public abstract class BroadcastReceiver extends Object{}
```

Intents sent by the `sendBroadcast()` will be received by this base class.

It's an abstract class so we will override the `onReceive()` method.

First create a java class :

```java
    public class MyReceiver{}
```

Add the folowing imports:

```java
    import android.content.BroadcastReceiver;
    import android.content.Context;
    import android.content.Intent;
    import android.widget.Toast;
```

Make it derive from android.content.BroadcastReceiver:

```java
    public class MyReceiver extends BroadcastReceiver {}
```

This will force us to ovveride the `onReceive()` method:

```java
        @Override
        public void onReceive(Context context, Intent intent) {
            Toast.makeText(context, "Alarm Ringing...", Toast.LENGTH_SHORT).show();
        }
```

### Step 5. Let's come to our MainActivity class.

Activities are android components that represent a user interface. We create activities by deriving from an activity. To support more devices we use `AppCompatActivity`.

So let's create an activity:

```java
    public class MainActivity extends AppCompatActivity {}
```

Add the following imports on top of the activity:

```java
    import android.app.AlarmManager;
    import android.app.PendingIntent;
    import android.content.Intent;
    import android.os.Bundle;
    import android.support.design.widget.FloatingActionButton;
    import android.support.design.widget.Snackbar;
    import android.support.v7.app.AppCompatActivity;
    import android.support.v7.widget.Toolbar;
    import android.view.View;
    import android.widget.Button;
    import android.widget.EditText;
    import android.widget.Toast;
```

Our activity will have three methods and two fields:

First we define our two fields: basically a button an edittext. Add them inside the MainActivity class:

```java
        Button startBtn;
        EditText timeTxt;
```

Then we create a method `go()`. This method will be responsible for initializing our alarmmanager and starting the alarm:

```java
        private void go()
        {
            //GET TIME IN SECONDS AND INITIALIZE INTENT
            int time=Integer.parseInt(timeTxt.getText().toString());
            Intent i=new Intent(this,MyReceiver.class);

            //PASS CONTEXT,YOUR PRIVATE REQUEST CODE,INTENT OBJECT AND FLAG
            PendingIntent pi=PendingIntent.getBroadcast(this,0,i,0);

            //INITIALIZE ALARM MANAGER
            AlarmManager alarmManager= (AlarmManager) getSystemService(ALARM_SERVICE);

            //SET THE ALARM
            alarmManager.set(AlarmManager.RTC_WAKEUP, System.currentTimeMillis()+(time*1000),pi);
            Toast.makeText(MainActivity.this, "Alarm set in "+time+" seconds", Toast.LENGTH_SHORT).show();
        }
```

Then we come create another method to initialize our button and edittext and handle the onclick listener of the button:

```java
        private void initializeViews()
        {
            timeTxt= (EditText) findViewById(R.id.timeTxt);
            startBtn= (Button) findViewById(R.id.startBtn);

            startBtn.setOnClickListener(new View.OnClickListener() {
                @Override
                public void onClick(View view) {
                   go();
                }
            });
        }
```

### Step 6. Let's check on the Androidmanifest

Go over the androidmanifest.xml. We want to ensure our BroadcastReceiver class is registered inside our manifest.

You can see that our broadcastreceiver class is registered:

```xml
            <receiver android_name="MyReceiver" >
            </receiver>
```

Here's what I have:

```xml
    <?xml version="1.0" encoding="utf-8"?>
    <manifest
        package="com.tutorials.hp.alarmmanagerstarter">
        <application
            android_allowBackup="true"
            android_icon="@mipmap/ic_launcher"
            android_label="@string/app_name"
            android_supportsRtl="true"
            android_theme="@style/AppTheme">
            <activity
                android_name=".MainActivity"
                android_label="@string/app_name"
                android_theme="@style/AppTheme.NoActionBar">
                <intent-filter>
                    <action android_name="android.intent.action.MAIN" />

                    <category android_name="android.intent.category.LAUNCHER" />
                </intent-filter>
            </activity>
            <receiver android_name="MyReceiver" >
            </receiver>
        </application>

    </manifest>
```

## Example: Android AlarmManager – Schedule Showing of Toast

Android Engineers added AlarmManager class in API level 1, so it's been around since the beginning of android. This class allows for scheduling of operations to be done sometime in the future. With AlarmManager, you can set some code that will be executed in the future.

This is cool given that it's not necessary for your app to be running for that code to be run. Of course your app will be started, but only at the registered time. Alarm Maanager belongs to android.app package and inherits from java.lang.Object.

Even while the device is asleep, alarms are retained as long as they were registered. You can find more details about AlarmManager [here](https://developer.android.com/reference/android/app/AlarmManager.html).

##### Screenshot

- Here's the screenshot of the project.

![](https://camposha.info/wp-content/uploads/source/alarmmanagerstarter/demo1.gif)

### Common Questions this example explores

- How to use android alarmmanager.
- What is AlarmManager?
- How do I schedule work to be done in future in android?
- Easy alarm manager example with a toast.

### Tools Used

This example was written with the following tools:

- Windows 8
- AndroidStudio IDE
- Genymotion Emulator

### Source Code

Lets jump directly to the source code.

#### Build.Gradle

* * *

- Normally in android projects, there are two build.gradle files. One is the app level build.gradle, the other is project level build.gradle. The app level belongs inside the app folder and its where we normally add our dependencies and specify the compile and target sdks.
- Also Add dependencies for AppCompat and Design support libraries.
- Our MainActivity shall derive from AppCompatActivity while we shall also use Floating action button from design support libraries.

```groovy
apply plugin: 'com.android.application'

android {
    compileSdkVersion 24
    buildToolsVersion "25.0.1"

    defaultConfig {
        applicationId "com.tutorials.hp.alarmmanagerstarter"
        minSdkVersion 15
        targetSdkVersion 24
        versionCode 1
        versionName "1.0"
    }
    buildTypes {
        release {
            minifyEnabled false
            proguardFiles getDefaultProguardFile('proguard-android.txt'), 'proguard-rules.pro'
        }
    }
}

dependencies {
    compile fileTree(dir: 'libs', include: ['*.jar'])
    testCompile 'junit:junit:4.12'
    compile 'com.android.support:appcompat-v7:24.2.1'
    compile 'com.android.support:design:24.2.1'
}
```

#### MyReceiver.java"

- Our Broadcast Receiver class.
- Make it extend android.app.content.BroadCastReceiver.
- We then override the OnReceive() method. This is where we write the code to be executed when alarm rings.
- In this case we simply display a toast message.

```java
package com.tutorials.hp.alarmmanagerstarter;

import android.content.BroadcastReceiver;
import android.content.Context;
import android.content.Intent;
import android.widget.Toast;

public class MyReceiver extends BroadcastReceiver {

    /*
    RING ALARM WHEN IN WHEN WE RECEIVE OUR BROADCAST
     */
    @Override
    public void onReceive(Context context, Intent intent) {
        Toast.makeText(context, "Alarm Ringing...", Toast.LENGTH_SHORT).show();
    }
}
```

## MainActivity.java

- Launcher activity.
- ActivityMain.xml inflated as the contentview for this activity.
- We initialize views and widgets inside this activity.
- We also initialize and start our alarm inside here using the alarmmanager object.

```java
package com.tutorials.hp.alarmmanagerstarter;

import android.app.AlarmManager;
import android.app.PendingIntent;
import android.content.Intent;
import android.os.Bundle;
import android.support.design.widget.FloatingActionButton;
import android.support.design.widget.Snackbar;
import android.support.v7.app.AppCompatActivity;
import android.support.v7.widget.Toolbar;
import android.view.View;
import android.widget.Button;
import android.widget.EditText;
import android.widget.Toast;

public class MainActivity extends AppCompatActivity {

    Button startBtn;
    EditText timeTxt;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);
        Toolbar toolbar = (Toolbar) findViewById(R.id.toolbar);
        setSupportActionBar(toolbar);

         initializeViews();

        FloatingActionButton fab = (FloatingActionButton) findViewById(R.id.fab);
        fab.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View view) {
                Snackbar.make(view, "Replace with your own action", Snackbar.LENGTH_LONG)
                        .setAction("Action", null).show();
            }
        });

    }

    /*
    INITIALIZE VIEWS
     */
    private void initializeViews()
    {
        timeTxt= (EditText) findViewById(R.id.timeTxt);
        startBtn= (Button) findViewById(R.id.startBtn);

        startBtn.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View view) {
               go();
            }
        });
    }

    /*
    INITIALIZE AND START OUR ALARM
     */
    private void go()
    {
        //GET TIME IN SECONDS AND INITIALIZE INTENT
        int time=Integer.parseInt(timeTxt.getText().toString());
        Intent i=new Intent(this,MyReceiver.class);

        //PASS CONTEXT,YOUR PRIVATE REQUEST CODE,INTENT OBJECT AND FLAG
        PendingIntent pi=PendingIntent.getBroadcast(this,0,i,0);

        //INITIALIZE ALARM MANAGER
        AlarmManager alarmManager= (AlarmManager) getSystemService(ALARM_SERVICE);

        //SET THE ALARM
        alarmManager.set(AlarmManager.RTC_WAKEUP, System.currentTimeMillis()+(time*1000),pi);
        Toast.makeText(MainActivity.this, "Alarm set in "+time+" seconds", Toast.LENGTH_SHORT).show();
    }

}
```

## ActivityMain.xml

- Template layout.
- Contains our ContentMain.xml.
- Also defines the appbarlayout, toolbar as well as floatingaction buttton.

```xml
<?xml version="1.0" encoding="utf-8"?>
<android.support.design.widget.CoordinatorLayout

    android_layout_width="match_parent"
    android_layout_height="match_parent"
    android_fitsSystemWindows="true"
    tools_context="com.tutorials.hp.alarmmanagerstarter.MainActivity">

    <android.support.design.widget.AppBarLayout
        android_layout_width="match_parent"
        android_layout_height="wrap_content"
        android_theme="@style/AppTheme.AppBarOverlay">

        <android.support.v7.widget.Toolbar
            android_id="@+id/toolbar"
            android_layout_width="match_parent"
            android_layout_height="?attr/actionBarSize"
            android_background="?attr/colorPrimary"
            app_popupTheme="@style/AppTheme.PopupOverlay" />

    </android.support.design.widget.AppBarLayout>

    <include layout="@layout/content_main" />

    <android.support.design.widget.FloatingActionButton
        android_id="@+id/fab"
        android_layout_width="wrap_content"
        android_layout_height="wrap_content"
        android_layout_gravity="bottom|end"
        android_layout_margin="@dimen/fab_margin"
        android_src="@android:drawable/ic_dialog_email" />

</android.support.design.widget.CoordinatorLayout>
```

## ContentMain.xml

- Content Layout.
- Defines the views and widgets to be displayed inside the MainActivity.

```xml
<?xml version="1.0" encoding="utf-8"?>
<RelativeLayout

    android_layout_width="match_parent"
    android_layout_height="match_parent"
    android_paddingBottom="@dimen/activity_vertical_margin"
    android_paddingLeft="@dimen/activity_horizontal_margin"
    android_paddingRight="@dimen/activity_horizontal_margin"
    android_paddingTop="@dimen/activity_vertical_margin"
    app_layout_behavior="@string/appbar_scrolling_view_behavior"
    tools_context="com.tutorials.hp.alarmmanagerstarter.MainActivity"
    tools_showIn="@layout/activity_main">

    <EditText
        android_id="@+id/timeTxt"
        android_layout_width="wrap_content"
        android_layout_height="wrap_content"
        android_layout_alignParentLeft="true"
        android_layout_alignParentTop="true"
        android_layout_marginTop="28dp"
        android_ems="10"
        android_hint="Number of seconds"
        android_inputType="numberDecimal" />

    <Button
        android_id="@+id/startBtn"
        android_layout_width="wrap_content"
        android_layout_height="wrap_content"
        android_layout_alignRight="@+id/timeTxt"
        android_layout_below="@+id/timeTxt"
        android_layout_marginRight="60dp"
        android_layout_marginTop="120dp"
        android_text="Start" />
</RelativeLayout>
```

## More Resources:

[download id="7898" template="pmpro_button"]

### How To Run

1. Download the project above.
2. You'll get a zipped file,extract it.
3. Open the Android Studio.
4. Now close, already open project.
5. From the Menu bar click on File >New> Import Project.
6. Now Choose a Destination Folder, from where you want to import project.
7. Choose an Android Project.
8. Now Click on “OK“.
9. Done, your done importing the project,now edit it.

### Conclusion.

We saw a simple android alarm manager example.

## Example: Android Schedule Repeating/Recurring Alarms

AlarmManager has existed since the beginning of Android. It enables us schedule tasks to be done sometime in the future.

With AlarmManager, you can set some code that will be executed in the future.

Alarm Maanager belongs to android.app package and inherits from java.lang.Object. Even while the device is asleep, alarms are retained as long as they were registered. In this example we will see how to work with a Recurring/repeating alarms.

We will schedule showing of toast messages after a given number of seconds. For example, the user enters 5 in the edittexts and clicks start button, after every 5 seconds the toast message gets shown until the user clicks the cancel button to cancell the alarms. So we see how to start repeating alarms and cancel them. You can find more details about AlarmManager [here](https://developer.android.com/reference/android/app/AlarmManager.html).

### Screenshot

- Here's the screenshot of the project.

Android Recurring Alarms Example

# Common Questions this example explores

- How to use android alarmmanager.
- How to set repeating/recurring alarms in android and cancel them.
- Starting and canceling alarms in android.
- How do I schedule work to be done in future in android?
- Easy recurring alarm manager example with a toast.

# Tools Used

This example was written with the following tools:

- Windows 8
- AndroidStudio IDE
- Genymotion Emulator
- Language : Java
- Topic : Android Recurring Alarms, AlarmManager, Start Cancel Repeating alarms

# Libaries Used

- We don't use any third part library.

# Source Code

Lets jump directly to the source code.

## Build.Gradle

- Normally in android projects, there are two build.gradle files. One is the app level build.gradle, the other is project level build.gradle. The app level belongs inside the app folder and its where we normally add our dependencies and specify the compile and target sdks.
- Also Add dependencies for AppCompat and Design support libraries.
- Our MainActivity shall derive from AppCompatActivity while we shall also use Floating action button from design support libraries.

```groovy
apply plugin: 'com.android.application'

android {
    compileSdkVersion 26
    buildToolsVersion "26.0.0"
    defaultConfig {
        applicationId "com.tutorials.hp.repeatingalarm"
        minSdkVersion 15
        targetSdkVersion 26
        versionCode 1
        versionName "1.0"
        testInstrumentationRunner "android.support.test.runner.AndroidJUnitRunner"
    }
    buildTypes {
        release {
            minifyEnabled false
            proguardFiles getDefaultProguardFile('proguard-android.txt'), 'proguard-rules.pro'
        }
    }
}

dependencies {
    compile fileTree(dir: 'libs', include: ['*.jar'])
    androidTestCompile('com.android.support.test.espresso:espresso-core:2.2.2', {
        exclude group: 'com.android.support', module: 'support-annotations'
    })
    compile 'com.android.support:appcompat-v7:26.+'
    compile 'com.android.support.constraint:constraint-layout:1.0.0-alpha7'
    compile 'com.android.support:design:26.+'
    testCompile 'junit:junit:4.12'
}
```

## MyReceiver.java

- Our MyReceiver class.
- Derives from android.content.BroadcastReceiver.
- We override onReceive() method and perform task to be done when alarm rings here.

```java
package com.tutorials.hp.repeatingalarm;

import android.content.BroadcastReceiver;
import android.content.Context;
import android.content.Intent;
import android.widget.Toast;

public class MyReceiver extends BroadcastReceiver {
    /*
   RING ALARM WHEN IN WHEN WE RECEIVE OUR BROADCAST
    */
    @Override
    public void onReceive(Context context, Intent intent) {
        Toast.makeText(context, "Alarm Ringing...", Toast.LENGTH_SHORT).show();
    }
}
```

## MainActivity.java

- Our MainActivity class.
- Derives from AppCompatActivity which is a Base class for activities that use the support library action bar features.
- Methods: onCreate(),initializeViews(),initializeAlarmManager(),go().
- Inflated From activity_main.xml using the setContentView() method.
- The views we use are EditTexts and buttons.
- Reference them from our layout specification using findViewById().
- Initialize alarm manager.
- Start alarm using the setInExactRepeating().

```java
package com.tutorials.hp.repeatingalarm;

import android.app.AlarmManager;
import android.app.PendingIntent;
import android.content.Intent;
import android.os.Build;
import android.os.Bundle;
import android.support.design.widget.FloatingActionButton;
import android.support.v7.app.AppCompatActivity;
import android.support.v7.widget.Toolbar;
import android.view.View;
import android.widget.Button;
import android.widget.EditText;
import android.widget.Toast;

public class MainActivity extends AppCompatActivity {

    Button startBtn,cancelBtn;
    EditText timeTxt;
    AlarmManager alarmManager;
    PendingIntent pi;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);
        Toolbar toolbar = (Toolbar) findViewById(R.id.toolbar);
        setSupportActionBar(toolbar);

     initializeViews();
     initializeAlarmManager();

        FloatingActionButton fab = (FloatingActionButton) findViewById(R.id.fab);
        fab.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View view) {
                go();
            }
        });

    }

    /*
    INITIALIZE VIEWS
     */
    private void initializeViews()
    {
        timeTxt= (EditText) findViewById(R.id.timeTxt);
        startBtn= (Button) findViewById(R.id.startBtn);
        cancelBtn= (Button) findViewById(R.id.cancelBtn);

        startBtn.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View view) {
                go();
            }
        });
        cancelBtn.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View view) {
                if(alarmManager != null)
                {
                    alarmManager.cancel(pi);
                }
            }
        });
    }
  /*
  INITIALIZE AND START OUR ALARM
  */
  private void initializeAlarmManager()
  {
    // INITIALIZE INTENT
    Intent intent=new Intent(this,MyReceiver.class);

        //PASS CONTEXT,YOUR PRIVATE REQUEST CODE,INTENT OBJECT AND FLAG
        pi= PendingIntent.getBroadcast(this,0,intent,0);

        //INITIALIZE ALARM MANAGER
        alarmManager= (AlarmManager) this.getSystemService(ALARM_SERVICE);
  }

    /*
    START OUR ALARM
     */
    private void go()
    {
        //GET TIME IN SECONDS
        int time=Integer.parseInt(timeTxt.getText().toString());

        //SET THE ALARM
       if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.CUPCAKE) {
            alarmManager.setInexactRepeating(AlarmManager.RTC_WAKEUP,System.currentTimeMillis()+(time*1000),time*1000,pi);
            Toast.makeText(MainActivity.this, "Alarm set in "+time+" seconds", Toast.LENGTH_SHORT).show();

        }else
        {
            alarmManager.setRepeating(AlarmManager.ELAPSED_REALTIME,System.currentTimeMillis()+(time*1000),time*1000,pi);
            Toast.makeText(MainActivity.this, "Yes Alarm set in "+time+" seconds", Toast.LENGTH_SHORT).show();

        }
    }

}
```

## ActivityMain.xml

- ActivityMain.xml.
- This is a template layout for our MainActivity.
- Root layout tag is CoordinatorLayout from design support library.
- CordinatorLayout is viewgroup that is a superpowered on framelayout.
- CoordinatorLayout is intended for two primary use cases: As a top-level application decor or chrome layout As a container for a specific interaction with one or more child views
- Inside our CordinatorLayout we add : AppBarLayout,FloatingActionButton and include content_main.xml.
- AppBarLayout is vertical LinearLayout that implements scrolling features of material design concept.
- It should be a direct child of CordinatorLayout, otherwise alot of features won't work.
- Inside the AppBarLayout we add our toolbar,which we give a blue color.
- We will add our widgets in our content_main.xml, not here as this is a template layout.
- Finally we have a FloatingActionButton, a class that derives from android.support.design.widget.VisibilityAwareImageButton. Its the round button you see in our user interface.

```xml
<?xml version="1.0" encoding="utf-8"?>

<android.support.design.widget.CoordinatorLayout

    android_layout_width="match_parent"
    android_layout_height="match_parent"
    tools_context="com.tutorials.hp.repeatingalarm.MainActivity">

    <android.support.design.widget.AppBarLayout
        android_layout_width="match_parent"
        android_layout_height="wrap_content"
        android_theme="@style/AppTheme.AppBarOverlay">

        <android.support.v7.widget.Toolbar
            android_id="@+id/toolbar"
            android_layout_width="match_parent"
            android_layout_height="?attr/actionBarSize"
            android_background="?attr/colorPrimary"
            app_popupTheme="@style/AppTheme.PopupOverlay" />

    </android.support.design.widget.AppBarLayout>

    <include layout="@layout/content_main" />

    <android.support.design.widget.FloatingActionButton
        android_id="@+id/fab"
        android_layout_width="wrap_content"
        android_layout_height="wrap_content"
        android_layout_gravity="bottom|end"
        android_layout_margin="@dimen/fab_margin"
        app_srcCompat="@android:drawable/ic_dialog_email" />

</android.support.design.widget.CoordinatorLayout>
```

## ContentMain.xml

- Our ContentMain.xml file.
- Shall get inflated to MainActivity.
- Root tag is ConstraintLayout.
- Contains EditTexts and two buttons.
- User will enter the number of seconds after which alarm rings in edittext.
- Then click start button to start alarm.
- And Cancel button to cancel alarm.

```xml
<?xml version="1.0" encoding="utf-8"?>

<android.support.constraint.ConstraintLayout

    android_layout_width="match_parent"
    android_layout_height="match_parent"
    app_layout_behavior="@string/appbar_scrolling_view_behavior"
    tools_context="com.tutorials.hp.repeatingalarm.MainActivity"
    tools_showIn="@layout/activity_main">

    <LinearLayout
        android_layout_width="368dp"
        android_layout_height="327dp"
        android_orientation="vertical"
        app_layout_constraintTop_toTopOf="parent"
        android_layout_marginTop="8dp">
        <EditText
            android_id="@+id/timeTxt"
            android_layout_width="wrap_content"
            android_layout_height="wrap_content"
            android_layout_alignParentLeft="true"
            android_layout_alignParentTop="true"
            android_ems="10"
            android_hint="Number of seconds"
            android_inputType="numberDecimal"
            />

        <Button
            android_id="@+id/startBtn"
            android_layout_width="match_parent"
            android_layout_height="wrap_content"
            android_layout_alignRight="@+id/timeTxt"
            android_layout_below="@+id/timeTxt"
            android_text="Start"
            />
        <Button
            android_id="@+id/cancelBtn"
            android_layout_width="match_parent"
            android_layout_height="wrap_content"
            android_layout_alignRight="@+id/timeTxt"
            android_layout_below="@+id/timeTxt"
            android_text="Cancel"
            />

    </LinearLayout>

</android.support.constraint.ConstraintLayout>
```

## Video/Preview

- We have a [YouTube channel](https://www.youtube.com/c/ProgrammingWizards) with almost a thousand tutorials, this one below being one of them.

[https://www.youtube.com/watch?v=23Gw-11JFqc](https://www.youtube.com/watch?v=23Gw-11JFqc)

## Download

- You can Download the full Project below. Source code is well commented.

[Download](https://github.com/Oclemy/RepeatingAlarm/archive/master.zip)
