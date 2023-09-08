# FCM Push Notification

>  An Android App of how to push a notification from Firebase Messaging Console - FCM.

An Android App of how to push a notification from Firebase Messaging Console - FCM

- Kotlin Based.
- Push Notification
- Firebase Cloud Messaging - FCM
- Send notification from Firebase console FCM

Here are demo images:

![FCM Push Notifications Tutorial](https://github.com/layonmartins/FCMPushNotification/raw/main/img1.png)

![FCM Push Notifications Tutorial](https://github.com/layonmartins/FCMPushNotification/raw/main/img2.png)

![FCM Push Notifications Tutorial](https://github.com/layonmartins/FCMPushNotification/raw/main/img3.png)


Let us look at a full FCM Push Notifications Example based on this project below.

#### Step 1. Dependencies

We need to add some dependencies in our `app/build.gradle` file as shown below:

**(a). `build.gradle`**

> Our app-level `build.gradle`.

We Prepare our dependencies as shown below. You may use later versions.

We will also enable Java8 so that we can utilize a myriad of Java8 features.

We then declare our app dependencies under the `dependencies` closure, using the `implementation` statement. We will need the following 6 dependencies:

1. `Core-ktx` - With this we can target the latest platform features and APIs while also supporting older devices.
2. `Appcompat` - Allows us access to new APIs on older API versions of the platform (many using Material Design).
3. `Material` - Collection of Modular and customizable Material Design UI components for Android.
4. `Constraintlayout` - This allows us to Position and size widgets in a flexible way with relative positioning.
5. Our `Firebase-messaging-ktx` library.
6. Our `Firebase-analytics-ktx` library.

Here is our full `app/build.gradle`:

```groovy
plugins {
    id 'com.android.application'
    id 'kotlin-android'
    id 'com.google.gms.google-services'
}

android {
    compileSdk 31

    defaultConfig {
        applicationId "com.layon.fcmpushnotification"
        minSdk 28
        targetSdk 31
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
    compileOptions {
        sourceCompatibility JavaVersion.VERSION_1_8
        targetCompatibility JavaVersion.VERSION_1_8
    }
    kotlinOptions {
        jvmTarget = '1.8'
    }
}


dependencies {

    implementation 'androidx.core:core-ktx:1.7.0'
    implementation 'androidx.appcompat:appcompat:1.4.0'
    implementation 'com.google.android.material:material:1.4.0'
    implementation 'androidx.constraintlayout:constraintlayout:2.1.2'
    implementation 'com.google.firebase:firebase-messaging-ktx:23.0.0'
    implementation 'com.google.firebase:firebase-analytics-ktx:20.0.0'
    testImplementation 'junit:junit:4.+'
    androidTestImplementation 'androidx.test.ext:junit:1.1.3'
    androidTestImplementation 'androidx.test.espresso:espresso-core:3.4.0'
}
```

#### Step 2. Our Android Manifest

We will need to look at our `AndroidManifest.xml`.

**(a). `AndroidManifest.xml`**

> Our `AndroidManifest` file.

Our project will have only a single [`Activity`](htpps://android.camposha.info/en/activity) but we have to register it right here as shown below: We will be creating a single [`Service`](htpps://android.camposha.info/en/service) so we have to register it as well. We will be defining 2 `meta-data` tags as shown below. Here is the full Android Manifest file:

```xml
<?xml version="1.0" encoding="utf-8"?>
<manifest xmlns:android="http://schemas.android.com/apk/res/android"
    xmlns:tools="http://schemas.android.com/tools"
    package="com.layon.fcmpushnotification">

    <application
        android:allowBackup="true"
        android:icon="@mipmap/ic_launcher"
        android:label="@string/app_name"
        android:roundIcon="@mipmap/ic_launcher_round"
        android:supportsRtl="true"
        android:theme="@style/Theme.FCMPushNotification">

        <!-- Set custom default icon. This is used when no icon is set for incoming notification messages.
     See README(https://goo.gl/l4GJaQ) for more. -->
        <meta-data
            android:name="com.google.firebase.messaging.default_notification_icon"
            android:resource="@drawable/ic_baseline_notifications_24" />
        <!-- Set color used with incoming notification messages. This is used when no color is set for the incoming
             notification message. See README(https://goo.gl/6BKBk7) for more. -->
        <meta-data
            android:name="com.google.firebase.messaging.default_notification_color"
            android:resource="@color/purple_700" />

        <activity
            android:name="com.layon.fcmpushnotification.MainActivity"
            android:exported="true">
            <intent-filter>
                <action android:name="android.intent.action.MAIN" />

                <category android:name="android.intent.category.LAUNCHER" />
            </intent-filter>
        </activity>

        <service
            android:name=".MyFirebaseMessagingService"
            android:exported="false"
            tools:ignore="Instantiatable">
            <intent-filter>
                <action android:name="com.google.firebase.MESSAGING_EVENT" />
            </intent-filter>
        </service>

    </application>

</manifest>
```

#### Step 3. Design Layouts

For this project let's create the following layouts:


**(a). `notification.xml`**

> Our `notification` layout.

This layout will represent our Notification's layout. Specify [`RelativeLayout`](https://android.camposha.info/en/relativelayout) as it's root element, then add the following [widgets](https://android.camposha.info/en/view):

1. [`ImageView`](https://android.camposha.info/en/imageview)
2. [`TextView`](https://android.camposha.info/en/textview)

```xml
<?xml version="1.0" encoding="utf-8"?>
<RelativeLayout xmlns:android="http://schemas.android.com/apk/res/android"
    android:layout_width="match_parent"
    android:layout_height="match_parent">

    <RelativeLayout
        android:layout_width="match_parent"
        android:layout_height="wrap_content"
        android:background="#F4E0A3"
        android:padding="10dp">

        <ImageView
            android:id="@+id/app_logo"
            android:layout_width="100dp"
            android:layout_height="80dp"
            android:layout_marginLeft="10dp"
            android:layout_marginTop="10dp"
            android:src="@drawable/geeksforgeeks" />

        <TextView
            android:id="@+id/title"
            android:layout_width="wrap_content"
            android:layout_height="wrap_content"
            android:layout_marginLeft="10dp"
            android:layout_marginTop="10dp"
            android:layout_toRightOf="@id/app_logo"
            android:text="Tittle"
            android:textSize="20dp"
            android:textStyle="bold" />

        <TextView
            android:id="@+id/description"
            android:layout_width="wrap_content"
            android:layout_height="wrap_content"
            android:layout_below="@id/title"
            android:layout_marginLeft="10dp"
            android:layout_marginTop="10dp"
            android:layout_toRightOf="@id/app_logo"
            android:text="Description"
            android:textSize="20dp"
            android:textStyle="bold" />

    </RelativeLayout>

</RelativeLayout>
```

**(b). `activity_main.xml`**

> Our `activity_main` layout.

This layout will represent our Main Activity's layout. Specify [`androidx.constraintlayout.widget.ConstraintLayout`](https://android.camposha.info/en/constraintlayout) as it's root element then inside it place the following [widgets](https://android.camposha.info/en/view):

1. [`TextView`](https://android.camposha.info/en/textview)

```xml
<?xml version="1.0" encoding="utf-8"?>
<androidx.constraintlayout.widget.ConstraintLayout xmlns:android="http://schemas.android.com/apk/res/android"
    xmlns:app="http://schemas.android.com/apk/res-auto"
    xmlns:tools="http://schemas.android.com/tools"
    android:layout_width="match_parent"
    android:layout_height="match_parent"
    tools:context="com.layon.fcmpushnotification.MainActivity">

    <TextView
        android:layout_width="wrap_content"
        android:layout_height="wrap_content"
        android:text="Hello World Push Notification GeeksforGeeks"
        android:textSize="28sp"
        android:gravity="center"
        android:textColor="#4CAF50"
        android:textStyle="bold"
        app:layout_constraintBottom_toBottomOf="parent"
        app:layout_constraintLeft_toLeftOf="parent"
        app:layout_constraintRight_toRightOf="parent"
        app:layout_constraintTop_toTopOf="parent" />

</androidx.constraintlayout.widget.ConstraintLayout>
```
#### Step 4. Write Code

Finally we need to write our code as follows:

**(a). `MyFirebaseMessagingService.kt`**

> Our `MyFirebaseMessagingService` class.

Create a Kotlin file named `MyFirebaseMessagingService.kt` and add the necessary imports. Here are some of the imports we will be using:
1. `Context` from the `android.content` package.
2. `Intent` from the `android.content` package.
3. `Build` from the `android.os` package.
4. `RemoteViews` from the `android.widget` package.
5. `NotificationCompat` from the `androidx.core.app` package.

Then extend the `FirebaseMessagingService` and add its contents as follows:

First override these callbacks: 

1. `onMessageReceived(remoteMessage: RemoteMessage) `.

Then we will be creating the following functions:

1. `getRemoteView(title: String, message: String): RemoteViews `.
2. `generateNotification(title: String, message: String) `.

**(a). Our `getRemoteView()` function**

Write the `getRemoteView()` function as follows:

```kotlin
    fun getRemoteView(title: String, message: String): RemoteViews {
        val remoteView = RemoteViews("com.layon.fcmpushnotification", R.layout.notification)

        remoteView.setTextViewText(R.id.title, title)
        remoteView.setTextViewText(R.id.message, message)
        remoteView.setImageViewResource(R.id.app_logo, R.drawable.geeksforgeeks)

        return remoteView
    }
```

**(b). Our `generateNotification()` function**

Write the `generateNotification()` function as follows:

```kotlin
    fun generateNotification(title: String, message: String) {

        val intent = Intent(this, MainActivity::class.java)
        intent.addFlags(Intent.FLAG_ACTIVITY_CLEAR_TOP)

        val pendingIntent = PendingIntent.getActivity(this, 0, intent, PendingIntent.FLAG_ONE_SHOT)

        //channel id, channel name
        var builder: NotificationCompat.Builder = NotificationCompat.Builder(applicationContext, channelId)
            .setSmallIcon(R.drawable.geeksforgeeks)
            .setAutoCancel(true)
            .setVibrate(longArrayOf(1000, 1000, 1000, 1000))
            .setOnlyAlertOnce(true)
            .setContentIntent(pendingIntent)

        builder = builder.setContent(getRemoteView(title, message))

        val notificationManager = getSystemService(Context.NOTIFICATION_SERVICE) as NotificationManager
        val notificationChannel = NotificationChannel(channelId, channelName, NotificationManager.IMPORTANCE_HIGH)
        notificationManager.createNotificationChannel(notificationChannel)

        //show the notification
        notificationManager.notify(0, builder.build())
    }
```


Here is the full code:

```kotlin
package replace_with_your_package_name

import android.app.NotificationChannel
import android.app.NotificationManager
import android.app.PendingIntent
import android.content.Context
import android.content.Intent
import android.os.Build
import android.widget.RemoteViews
import androidx.core.app.NotificationCompat
import com.google.firebase.messaging.FirebaseMessagingService
import com.google.firebase.messaging.RemoteMessage

const val channelId = "notification_channel"
const val channelName = "com.layon.fcmpushnotification"

class MyFirebaseMessagingService : FirebaseMessagingService() {


    override fun onMessageReceived(remoteMessage: RemoteMessage) {
        if(remoteMessage.notification != null){
            generateNotification(remoteMessage.notification!!.title!!, remoteMessage.notification!!.body!!)
        }
    }

    // attach the notification created with the custom layout
    fun getRemoteView(title: String, message: String): RemoteViews {
        val remoteView = RemoteViews("com.layon.fcmpushnotification", R.layout.notification)

        remoteView.setTextViewText(R.id.title, title)
        remoteView.setTextViewText(R.id.message, message)
        remoteView.setImageViewResource(R.id.app_logo, R.drawable.geeksforgeeks)

        return remoteView
    }

    //generate the notification
    fun generateNotification(title: String, message: String) {

        val intent = Intent(this, MainActivity::class.java)
        intent.addFlags(Intent.FLAG_ACTIVITY_CLEAR_TOP)

        val pendingIntent = PendingIntent.getActivity(this, 0, intent, PendingIntent.FLAG_ONE_SHOT)

        //channel id, channel name
        var builder: NotificationCompat.Builder = NotificationCompat.Builder(applicationContext, channelId)
            .setSmallIcon(R.drawable.geeksforgeeks)
            .setAutoCancel(true)
            .setVibrate(longArrayOf(1000, 1000, 1000, 1000))
            .setOnlyAlertOnce(true)
            .setContentIntent(pendingIntent)

        builder = builder.setContent(getRemoteView(title, message))

        val notificationManager = getSystemService(Context.NOTIFICATION_SERVICE) as NotificationManager
        val notificationChannel = NotificationChannel(channelId, channelName, NotificationManager.IMPORTANCE_HIGH)
        notificationManager.createNotificationChannel(notificationChannel)

        //show the notification
        notificationManager.notify(0, builder.build())
    }

}

```

**(b). `MainActivity.kt`**

> Our `MainActivity` class.

Create a Kotlin file named `MainActivity.kt` and add the code as shown below:

```kotlin
package replace_with_your_package_name

import androidx.appcompat.app.AppCompatActivity
import android.os.Bundle
import com.layon.fcmpushnotification.R

class MainActivity : AppCompatActivity() {
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_main)
    }
}

```

### Reference

Download the code below:

|No.|Link|
|--|---|
|1.|[Download Full Code](https://github.com/layonmartins/FCMPushNotification/archive/refs/heads/main.zip)|
|2.|Read more [here](https://github.com/layonmartins/FCMPushNotification).|
|3.|Follow code author [here](https://github.com/layonmartins).|
