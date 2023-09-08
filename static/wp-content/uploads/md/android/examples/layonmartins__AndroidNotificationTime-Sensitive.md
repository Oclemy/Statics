# Notification Time-Sensitive

>  Android example of how to post a time-sensitive notification in Kotlin.

### Display time-sensitive notifications:

In specific situations, your app might need to get the user's attention urgently, such as an ongoing alarm or incoming call. You might have previously configured your app for this purpose by launching an activity while your app was in the background.

This app show how to use:

- Kotlin
- Service Foreground
- MediaPlayer (Play a sound)
- Vibrator (Vibrator loop)
- FullScreen Activity (Open the screen over the keyguard and screen off)
- ConstraintLayout
- Marquee textView
- Time-sensitive
- Head up
- Actions buttons background colors with Android spannable

Here is the demo GIF:

![Notication with Service Tutorial](https://github.com/layonmartins/AndroidNotificationTime-Sensitive/raw/master/notificationGIFF.gif)



> NB/= The Android may choose to display a heads-up notification, instead of launching your full-screen intent, while the user is using the device.

Android AOSP choose how to display the notification see the flowchart:

![Notication with Service Tutorial](https://github.com/layonmartins/AndroidNotificationTime-Sensitive/raw/master/AndroidNotificationTime-sensitiveFlowChart.png)


Let us look at a full Notication with Service Example based on this project below.

#### Step 1. Dependencies

We need to add some dependencies in our `app/build.gradle` file as shown below:

**(a). `build.gradle`**

> Our app-level `build.gradle`.

We Prepare our dependencies as shown below. You may use later versions.

At the top of our `app/build.gradle` we will apply the following 3 plugins:

1. Our `com.android.application` plugin.
2. Our `kotlin-android` plugin.
3. Our `kotlin-android-extensions` plugin.

We then declare our app dependencies under the `dependencies` closure, using the `implementation` statement. We will need the following 4 dependencies:

1. `Kotlin-stdlib` - So that we can use Kotlin as our programming language.
2. `Core-ktx` - With this we can target the latest platform features and APIs while also supporting older devices.
3. `Appcompat` - Allows us access to new APIs on older API versions of the platform (many using Material Design).
4. `Constraintlayout` - This allows us to Position and size widgets in a flexible way with relative positioning.

Here is our full `app/build.gradle`:

```groovy
apply plugin: 'com.android.application'
apply plugin: 'kotlin-android'
apply plugin: 'kotlin-android-extensions'

android {
    compileSdkVersion 30
    buildToolsVersion "30.0.2"

    defaultConfig {
        applicationId "com.layon.android.androidnotificationtimesentive"
        minSdkVersion 26
        targetSdkVersion 30
        versionCode 1
        versionName "1.0"

        testInstrumentationRunner "androidx.test.runner.AndroidJUnitRunner"
    }

    buildTypes {
        release {
            minifyEnabled false
            proguardFiles getDefaultProguardFile('proguard-android-optimize.txt'), 'proguard-rules.pro'
        }
    }
}

dependencies {
    implementation fileTree(dir: "libs", include: ["*.jar"])
    implementation "org.jetbrains.kotlin:kotlin-stdlib:$kotlin_version"
    implementation 'androidx.core:core-ktx:1.3.1'
    implementation 'androidx.appcompat:appcompat:1.2.0'
    implementation 'androidx.constraintlayout:constraintlayout:2.0.1'
    testImplementation 'junit:junit:4.12'
    androidTestImplementation 'androidx.test.ext:junit:1.1.2'
    androidTestImplementation 'androidx.test.espresso:espresso-core:3.3.0'

}
```

#### Step 2. Our Android Manifest

We will need to look at our `AndroidManifest.xml`.

**(a). `AndroidManifest.xml`**

> Our `AndroidManifest` file.

This project will have 2 [`Activities`](htpps://android.camposha.info/en/activity). For them to be accessible we have to register them. We do that below. We will be creating a single [`Service`](htpps://android.camposha.info/en/service) so we have to register it as well. Here we will add the following permission:

1. Our `FOREGROUND_SERVICE` permission.
2. Our `USE_FULL_SCREEN_INTENT` permission.
3. Our `VIBRATE` permission.

Here is the full Android Manifest file:

```xml
<?xml version="1.0" encoding="utf-8"?>
<manifest xmlns:android="http://schemas.android.com/apk/res/android"
    package="com.layon.android.androidnotificationtimesentive">

    <uses-permission android:name="android.permission.FOREGROUND_SERVICE" />
    <uses-permission android:name="android.permission.USE_FULL_SCREEN_INTENT" />
    <uses-permission android:name="android.permission.VIBRATE" />

    <application
        android:allowBackup="true"
        android:icon="@mipmap/ic_launcher"
        android:label="@string/app_name"
        android:roundIcon="@mipmap/ic_launcher_round"
        android:supportsRtl="true"
        android:theme="@style/AppTheme">
        <activity android:name=".FullScreenActivity"
            android:theme="@style/AppTheme.NoActionBar"></activity>

        <service android:name=".ForegroundService"></service>

        <activity android:name=".MainActivity"
            android:screenOrientation="portrait">
            <intent-filter>
                <action android:name="android.intent.action.MAIN" />

                <category android:name="android.intent.category.LAUNCHER" />
            </intent-filter>
        </activity>
    </application>

</manifest>
```
#### Step 3. Design Layouts

For this project let's create the following layouts:

**(a). `activity_full_screen.xml`**

> Our `activity_full_screen` layout.

This layout will represent our Screen Full Activity's layout. Specify [`androidx.constraintlayout.widget.ConstraintLayout`](https://android.camposha.info/en/constraintlayout) as it's root element then inside it place the following [widgets](https://android.camposha.info/en/view):

1. [`TextView`](https://android.camposha.info/en/textview)

```xml
<?xml version="1.0" encoding="utf-8"?>
<androidx.constraintlayout.widget.ConstraintLayout xmlns:android="http://schemas.android.com/apk/res/android"
    xmlns:app="http://schemas.android.com/apk/res-auto"
    xmlns:tools="http://schemas.android.com/tools"
    android:layout_width="match_parent"
    android:layout_height="match_parent"
    tools:context=".FullScreenActivity"
    android:id="@+id/fullscreenactivity">

    <TextView
        android:id="@+id/textView2"
        android:layout_width="wrap_content"
        android:layout_height="wrap_content"
        android:text="Full Screen Activity"
        android:textStyle="bold"
        android:textSize="50sp"
        android:textAlignment="center"
        app:layout_constraintBottom_toBottomOf="parent"
        app:layout_constraintEnd_toEndOf="parent"
        app:layout_constraintStart_toStartOf="parent"
        app:layout_constraintTop_toTopOf="parent" />
</androidx.constraintlayout.widget.ConstraintLayout>
```

**(b). `activity_main.xml`**

> Our `activity_main` layout.

This layout will represent our Main Activity's layout. Specify [`androidx.constraintlayout.widget.ConstraintLayout`](https://android.camposha.info/en/constraintlayout) as it's root element then inside it place the following [widgets](https://android.camposha.info/en/view):

1. [`TextView`](https://android.camposha.info/en/textview)
2. [`Button`](https://android.camposha.info/en/button)
3. [`CheckBox`](https://android.camposha.info/en/checkbox)

```xml
<?xml version="1.0" encoding="utf-8"?>
<androidx.constraintlayout.widget.ConstraintLayout xmlns:android="http://schemas.android.com/apk/res/android"
    xmlns:app="http://schemas.android.com/apk/res-auto"
    xmlns:tools="http://schemas.android.com/tools"
    android:layout_width="match_parent"
    android:layout_height="match_parent"
    android:padding="20dp"
    tools:context=".MainActivity">

    <TextView
        android:id="@+id/textView"
        android:layout_width="wrap_content"
        android:layout_height="wrap_content"
        android:layout_marginStart="20dp"
        android:layout_marginTop="150dp"
        android:layout_marginBottom="149dp"
        android:ellipsize="marquee"
        android:fadingEdge="horizontal"
        android:marqueeRepeatLimit="marquee_forever"
        android:singleLine="true"
        android:text="Android notification time-sensitive example in Kotlin"
        android:textSize="20sp"
        android:textStyle="bold"
        app:layout_constraintBottom_toTopOf="@+id/checkBox_play_sound"
        app:layout_constraintStart_toStartOf="parent"
        app:layout_constraintTop_toTopOf="parent" />

    <Button
        android:id="@+id/buttonPost"
        android:layout_width="wrap_content"
        android:layout_height="wrap_content"
        android:layout_marginStart="20dp"
        android:layout_marginBottom="50dp"
        android:text="Post"
        android:background="@android:color/holo_green_dark"
        android:textColor="@android:color/white"
        app:layout_constraintBottom_toBottomOf="parent"
        app:layout_constraintEnd_toStartOf="@+id/buttonCancel"
        app:layout_constraintStart_toStartOf="parent" />

    <Button
        android:id="@+id/buttonCancel"
        android:layout_width="wrap_content"
        android:layout_height="wrap_content"
        android:layout_marginEnd="9dp"
        android:layout_marginBottom="50dp"
        android:text="Cancel"
        android:background="@android:color/holo_red_light"
        android:textColor="@android:color/white"
        app:layout_constraintBottom_toBottomOf="parent"
        app:layout_constraintEnd_toEndOf="parent"
        app:layout_constraintStart_toEndOf="@+id/buttonPost" />

    <CheckBox
        android:id="@+id/checkBox_play_sound"
        android:layout_width="wrap_content"
        android:layout_height="wrap_content"
        android:layout_marginTop="12dp"
        android:text="Play sound"
        android:checked="true"
        app:layout_constraintEnd_toEndOf="@+id/textView3"
        app:layout_constraintStart_toEndOf="@+id/textView3"
        app:layout_constraintTop_toBottomOf="@+id/textView3" />

    <CheckBox
        android:id="@+id/checkBox_vibrate"
        android:layout_width="wrap_content"
        android:layout_height="wrap_content"
        android:layout_marginTop="11dp"
        android:text="Vibrate"
        android:checked="true"
        app:layout_constraintStart_toStartOf="@+id/checkBox_play_sound"
        app:layout_constraintTop_toBottomOf="@+id/checkBox_play_sound" />

    <CheckBox
        android:id="@+id/checkBox_delay"
        android:layout_width="wrap_content"
        android:layout_height="wrap_content"
        android:layout_marginTop="11dp"
        android:text="Delay 5s"
        app:layout_constraintStart_toStartOf="@+id/checkBox_vibrate"
        app:layout_constraintTop_toBottomOf="@+id/checkBox_vibrate" />

    <TextView
        android:id="@+id/textView3"
        android:layout_width="wrap_content"
        android:layout_height="wrap_content"
        android:layout_marginStart="20dp"
        android:layout_marginTop="295dp"
        android:text="Options:"
        android:textStyle="bold|italic"
        android:textSize="15sp"
        app:layout_constraintStart_toStartOf="parent"
        app:layout_constraintTop_toTopOf="parent" />

</androidx.constraintlayout.widget.ConstraintLayout>
```
#### Step 4. Write Code

Finally we need to write our code as follows:


**(a). `ForegroundService.kt`**

> Our `ForegroundService` class.

Create a Kotlin file named `ForegroundService.kt` and add the necessary imports. Here are some of the imports we will be using:
1. `ForegroundColorSpan` from the `android.text.style` package.
2. `Log` from the `android.util` package.
3. `Toast` from the `android.widget` package.
4. `NotificationCompat` from the `androidx.core.app` package.
5. `ContextCompat` from the `androidx.core.content` package.

Then extend the `Service` and add its contents as follows:

First override these callbacks: 

1. `onCreate() `.
2. `onStartCommand(intent: Intent?, flags: Int, start: Int): Int `.
3. `onDestroy() `.
4. `onBind(intent: Intent): IBinder? `.

Then we will be creating the following functions:

1. `stopService(context: Context, message: String) `.
2. `playsound(parameter)` - Our function will take a `Boolean` object as a parameter.
3. `createNotificationChannel()`.
4. `postNotification(): Int `.
5. `getActionText(string : String, color : Int): Spannable? `.

**(a). Our `postNotification()` function**

Write the `postNotification()` function as follows:

```kotlin
    private fun postNotification(): Int {
        Log.d("layonf", "postNotification")

        //create the fullScreen Intents
        val fullScreenIntent = Intent(this, FullScreenActivity::class.java)
        val fullScreenPendingIntent = PendingIntent.getActivity(this, 0,
            fullScreenIntent, PendingIntent.FLAG_UPDATE_CURRENT)

        val notification = NotificationCompat.Builder(this, CHANNEL_ID)
            .setContentTitle("Time-Sentive Notification")
            .setContentText("An example of how to show an Android time-sentive notification in kotlin")
            .setSmallIcon(R.drawable.ic_baseline_new_releases_24)
            .setPriority(NotificationCompat.PRIORITY_HIGH)
            .setCategory(NotificationCompat.CATEGORY_CALL)
            .addAction(R.drawable.ic_baseline_phone_enabled_24,
                getActionText("Action1", Color.RED), null)
            .addAction(R.drawable.ic_baseline_phone_disabled_24,
                getActionText("Action2", Color.GREEN), null)
            .setFullScreenIntent(fullScreenPendingIntent, true)
            .build()

        startForeground(NOTIFICATION_ID, notification)
        return START_NOT_STICKY
    }
```

**(b). Our `startService()` function**

Write the `startService()` function as follows:

```kotlin
        fun startService(context: Context, message: String, playsound: Boolean, vibrate: Boolean,
        delay: Int) {
            //startService with a delay
            Handler(Looper.getMainLooper()).postDelayed({
                val startIntent = Intent(context, ForegroundService::class.java)
                startIntent.putExtra("playsound", playsound)
                startIntent.putExtra("vibrate", vibrate)
                Toast.makeText(context, message, Toast.LENGTH_LONG).show()
                ContextCompat.startForegroundService(context, startIntent)
                Log.d("layonf", "startService")
            }, delay.toLong()) // 5s
        }
```

**(c). Our `stopService()` function**

Write the `stopService()` function as follows:

```kotlin
        fun stopService(context: Context, message: String) {
            val stopIntent = Intent(context, ForegroundService::class.java)
            Toast.makeText(context, message, Toast.LENGTH_LONG).show()
            context.stopService(stopIntent)
            Log.d("layonf", "stopService")
        }
```

**(d). Our `getActionText()` function**

Write the `getActionText()` function as follows:

```kotlin
    private fun getActionText(string : String, color : Int): Spannable? {
        val spannable: Spannable = SpannableString(string)
        if (VERSION.SDK_INT >= VERSION_CODES.N_MR1) {
            spannable.setSpan(
                ForegroundColorSpan(color), 0, spannable.length, 0
            )
        }
        return spannable
    }
```

**(e). Our `playsound()` function**

Write the `playsound()` function as follows:

```kotlin
    fun playsound(play: Boolean){
        Log.d("layonf", "playsound")
        mediaPlayer?.setLooping(true)
    }
```

**(f). Our `createNotificationChannel()` function**

Write the `createNotificationChannel()` function as follows:

```kotlin
    private fun createNotificationChannel(){
        if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.O) {
            val serviceChannel = NotificationChannel(CHANNEL_ID, "Time-sentive Notification",
            NotificationManager.IMPORTANCE_HIGH)
            val manager = getSystemService(NotificationManager::class.java)
            manager!!.createNotificationChannel(serviceChannel)
        }
    }
```


Here is the full code:

```kotlin
package replace_with_your_package_name

import android.app.NotificationChannel
import android.app.NotificationManager
import android.app.PendingIntent
import android.app.Service
import android.content.Context
import android.content.Intent
import android.graphics.Color
import android.media.MediaPlayer
import android.os.*
import android.os.Build.VERSION
import android.os.Build.VERSION_CODES
import android.text.Spannable
import android.text.SpannableString
import android.text.style.ForegroundColorSpan
import android.util.Log
import android.widget.Toast
import androidx.core.app.NotificationCompat
import androidx.core.content.ContextCompat


class ForegroundService : Service() {

    private val CHANNEL_ID = "Time-Sentive Notification in Kotlin"
    private val NOTIFICATION_ID = 1
    private var mediaPlayer: MediaPlayer? = null
    private var vibrator: Vibrator? = null

    //function to start and stop the foregroundservice
    companion object {
        fun startService(context: Context, message: String, playsound: Boolean, vibrate: Boolean,
        delay: Int) {
            //startService with a delay
            Handler(Looper.getMainLooper()).postDelayed({
                val startIntent = Intent(context, ForegroundService::class.java)
                startIntent.putExtra("playsound", playsound)
                startIntent.putExtra("vibrate", vibrate)
                Toast.makeText(context, message, Toast.LENGTH_LONG).show()
                ContextCompat.startForegroundService(context, startIntent)
                Log.d("layonf", "startService")
            }, delay.toLong()) // 5s
        }
        fun stopService(context: Context, message: String) {
            val stopIntent = Intent(context, ForegroundService::class.java)
            Toast.makeText(context, message, Toast.LENGTH_LONG).show()
            context.stopService(stopIntent)
            Log.d("layonf", "stopService")
        }
    }

    override fun onCreate() {
        super.onCreate()
        //get media player
        mediaPlayer = MediaPlayer.create(this, R.raw.shapeofyou)
        mediaPlayer?.setOnPreparedListener {
            println("PLAY")
        }
        //get vibrator
        vibrator = getSystemService(Context.VIBRATOR_SERVICE) as Vibrator
    }

    fun playsound(play: Boolean){
        Log.d("layonf", "playsound")
        mediaPlayer?.setLooping(true)
    }

    override fun onStartCommand(intent: Intent?, flags: Int, start: Int): Int {
        Log.d("layonf", "onStartCommand")
        //Do heavy work on a background thread

        //need play sound?
        val playsound = intent?.getBooleanExtra("playsound", false)
        if(playsound!!) {
            Log.d("layonf", "play")
            mediaPlayer?.setLooping(true)
            mediaPlayer?.start()
        }

        //need vibrate?
        val vibrate = intent?.getBooleanExtra("vibrate", false)
        if(vibrate!!) {
            Log.d("layonf", "vibrate")
            
            if (Build.VERSION.SDK_INT >= 26) {
                vibrator?.vibrate(VibrationEffect.createWaveform(
                    longArrayOf(1500L, 800L, 800L), 0))
            } else {
                vibrator?.vibrate(5000)
            }
        }

        //create channel
        createNotificationChannel()

        //return the postNotification to finish
        return postNotification()

    }

    override fun onDestroy() {
        super.onDestroy()
        Log.d("layonf", "onDestroy")
        //stop the play if need
        mediaPlayer?.stop()
        //stop the vibrate if need
        vibrator?.cancel()
    }


    override fun onBind(intent: Intent): IBinder? {
        return null
    }

    private fun createNotificationChannel(){
        if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.O) {
            val serviceChannel = NotificationChannel(CHANNEL_ID, "Time-sentive Notification",
            NotificationManager.IMPORTANCE_HIGH)
            val manager = getSystemService(NotificationManager::class.java)
            manager!!.createNotificationChannel(serviceChannel)
        }
    }

    private fun postNotification(): Int {
        Log.d("layonf", "postNotification")

        //create the fullScreen Intents
        val fullScreenIntent = Intent(this, FullScreenActivity::class.java)
        val fullScreenPendingIntent = PendingIntent.getActivity(this, 0,
            fullScreenIntent, PendingIntent.FLAG_UPDATE_CURRENT)

        val notification = NotificationCompat.Builder(this, CHANNEL_ID)
            .setContentTitle("Time-Sentive Notification")
            .setContentText("An example of how to show an Android time-sentive notification in kotlin")
            .setSmallIcon(R.drawable.ic_baseline_new_releases_24)
            .setPriority(NotificationCompat.PRIORITY_HIGH)
            .setCategory(NotificationCompat.CATEGORY_CALL)
            .addAction(R.drawable.ic_baseline_phone_enabled_24,
                getActionText("Action1", Color.RED), null)
            .addAction(R.drawable.ic_baseline_phone_disabled_24,
                getActionText("Action2", Color.GREEN), null)
            .setFullScreenIntent(fullScreenPendingIntent, true)
            .build()

        startForeground(NOTIFICATION_ID, notification)
        return START_NOT_STICKY
    }

    //this method return a spannable the set background color on action button name
    private fun getActionText(string : String, color : Int): Spannable? {
        val spannable: Spannable = SpannableString(string)
        if (VERSION.SDK_INT >= VERSION_CODES.N_MR1) {
            spannable.setSpan(
                ForegroundColorSpan(color), 0, spannable.length, 0
            )
        }
        return spannable
    }
}

```

**(b). `FullScreenActivity.kt`**
> Our `FullScreenActivity` class.

Create a Kotlin file named `FullScreenActivity.kt` and add the necessary imports. Here are some of the imports we will be using:
1. `Log` from the `android.util` package.
2. `View` from the `android.view` package.
3. `WindowManager` from the `android.view` package.
4. `AppCompatActivity` from the `androidx.appcompat.app` package.
5. `*` from the `kotlinx.android.synthetic.main.activity_full_screen` package.

Then extend the `AppCompatActivity` and add its contents as follows:

First override these callbacks: 

1. `onCreate(savedInstanceState: Bundle?) `.

Here is the full code:

```kotlin
package replace_with_your_package_name

import android.app.KeyguardManager
import android.content.Context
import android.content.Intent
import android.os.Build
import android.os.Bundle
import android.util.Log
import android.view.View
import android.view.WindowManager
import androidx.appcompat.app.AppCompatActivity
import kotlinx.android.synthetic.main.activity_full_screen.*


class FullScreenActivity : AppCompatActivity() {
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_full_screen)

        //start the activity over keyguard and screen off
        if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.O_MR1) {
            setShowWhenLocked(true)
            setTurnScreenOn(true)
            val keyguardManager = getSystemService(Context.KEYGUARD_SERVICE) as KeyguardManager
            keyguardManager.requestDismissKeyguard(this, null)
        }

        //disable navigation and statusbar
        window.decorView.apply{
            systemUiVisibility = View.SYSTEM_UI_FLAG_HIDE_NAVIGATION or
                    View.SYSTEM_UI_FLAG_FULLSCREEN
        }

        Log.i("layonf", "create incoming call")

        //go to start activity when touch in fullscreen activity
        fullscreenactivity.setOnClickListener({
            Log.i("layonf", "touch")
            val i = Intent(this, MainActivity::class.java)
            startActivity(i)
        })
    }
}

```

**(c). `MainActivity.kt`**
> Our `MainActivity` class.

Create a Kotlin file named `MainActivity.kt` and add the necessary imports. Here are some of the imports we will be using:
1. `AppCompatActivity` from the `androidx.appcompat.app` package.
2. `Bundle` from the `android.os` package.
3. `View` from the `android.view` package.
4. `*` from the `kotlinx.android.synthetic.main.activity_main` package.

Then extend the `AppCompatActivity` and add its contents as follows:

First override these callbacks: 

1. `onCreate(savedInstanceState: Bundle?) `.

Here is the full code:

```kotlin
package replace_with_your_package_name

import androidx.appcompat.app.AppCompatActivity
import android.os.Bundle
import android.view.View
import kotlinx.android.synthetic.main.activity_main.*

class MainActivity : AppCompatActivity() {
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_main)

        //enabled the marquee
        textView.setSelected(true)

        buttonPost.setOnClickListener(View.OnClickListener {
            //need play sound?
            var playsound = if(checkBox_play_sound.isChecked) true else false

            //need vibrate?
            var vibrate = if(checkBox_vibrate.isChecked) true else false

            //need vibrate?
            var delay = if(checkBox_delay.isChecked) 5000 else 0

            ForegroundService.startService(this, "Foreground Service is running...",
            playsound, vibrate, delay)
        })
        buttonCancel.setOnClickListener(View.OnClickListener {
            ForegroundService.stopService(this, "Foreground Service is stopping...")
        })
    }
}

```

### Reference

Download the code below:

|No.|Link|
|--|---|
|1.|[Download Full Code](https://github.com/layonmartins/AndroidNotificationTime-Sensitive/archive/refs/heads/master.zip)|
|2.|Read more [here](https://github.com/layonmartins/AndroidNotificationTime-Sensitive).|
|3.|Follow code author [here](https://github.com/layonmartins).|
