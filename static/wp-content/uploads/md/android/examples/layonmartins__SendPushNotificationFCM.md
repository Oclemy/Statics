# Kotlin Android Send Push Notification FCM

>  An Android App Util of how to push a notification using Firebase Cloud Messaging.

- Kotlin
- Push Notification
- Firebase Cloud Messaging - FCM
- Send notification from Firebase console FCM

![FCM Push Notification Tutorial](https://github.com/layonmartins/SendPushNotificationFCM/raw/main/screen1.png)

![FCM Push Notification Tutorial](https://github.com/layonmartins/SendPushNotificationFCM/raw/main/screenvideo.gif)

- To find the server key, go to the Firebase console:

![FCM Push Notification Tutorial](https://github.com/layonmartins/SendPushNotificationFCM/raw/main/screen2.png)

- To access the device fcm registration token, learn more [here](https://firebase.google.com/docs/cloud-messaging/android/client#retrieve-the-current-registration-token) and to monitor it learn more [here](https://firebase.google.com/docs/cloud-messaging/android/client#monitor-token-generation).


Here is the code;

#### Step 1. Dependencies

We need to add some dependencies in our `app/build.gradle` file as shown below:

**(a). `build.gradle`**

> Our app-level `build.gradle`.

We will enable Java8 so that we can utilize a myriad of Java8 features.

We then declare our app dependencies under the `dependencies` closure, using the `implementation` statement. We will need the following 10 dependencies:

1. `Core-ktx` - With this we can target the latest platform features and APIs while also supporting older devices.
2. `Appcompat` - Allows us access to new APIs on older API versions of the platform (many using Material Design).
3. `Material` - Collection of Modular and customizable Material Design UI components for Android.
4. `Constraintlayout` - This allows us to Position and size widgets in a flexible way with relative positioning.
5. Our `Firebase-messaging-ktx` library.
6. Our `Kotlinx-coroutines-core` Kotlin library.
7. Our `Kotlinx-coroutines-android` Kotlin library.
8. Our `Retrofit` library.
9. Our `Converter-gson` library.
10. Our `Logging-interceptor` library.

Here is our full `app/build.gradle`:

```groovy
plugins {
    id 'com.android.application'
    id 'org.jetbrains.kotlin.android'
    id 'com.google.gms.google-services'
}

android {
    compileSdk 31

    defaultConfig {
        applicationId "com.layon.sendpushnotificationfcm"
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

    viewBinding {
        enabled = true
    }
}

dependencies {

    implementation 'androidx.core:core-ktx:1.7.0'
    implementation 'androidx.appcompat:appcompat:1.4.1'
    implementation 'com.google.android.material:material:1.5.0'
    implementation 'androidx.constraintlayout:constraintlayout:2.1.3'
    testImplementation 'junit:junit:4.13.2'
    androidTestImplementation 'androidx.test.ext:junit:1.1.3'
    androidTestImplementation 'androidx.test.espresso:espresso-core:3.4.0'

    //FCM
    implementation 'com.google.firebase:firebase-messaging-ktx:23.0.0'
    // Coroutines
    implementation 'org.jetbrains.kotlinx:kotlinx-coroutines-core:1.3.5'
    implementation 'org.jetbrains.kotlinx:kotlinx-coroutines-android:1.3.5'
    // Retrofit
    implementation 'com.squareup.retrofit2:retrofit:2.6.2'
    implementation 'com.squareup.retrofit2:converter-gson:2.6.0'

    implementation 'com.squareup.okhttp3:logging-interceptor:3.8.0'
}
```

#### Step 2. Our Android Manifest

We will need to look at our `AndroidManifest.xml`.


**(a). `AndroidManifest.xml`**

> Our `AndroidManifest` file.

This project will have 2 [`Activities`](htpps://android.camposha.info/en/activity). For them to be accessible we have to register them. We do that below. We will be creating a single [`Service`](htpps://android.camposha.info/en/service) so we have to register it as well. We will be defining 2 `meta-data` tags as shown below. Here we will add the following permission:

1. Our `INTERNET` permission.

Here is the full Android Manifest file:

```xml
<?xml version="1.0" encoding="utf-8"?>
<manifest xmlns:android="http://schemas.android.com/apk/res/android"
    package="com.layon.sendpushnotificationfcm">

    <uses-permission android:name="android.permission.INTERNET" />
    <uses-permission android:name="com.google.android.c2dm.permission.RECEIVE" />
    <uses-permission android:name="com.google.android.c2dm.permission.SEND" />

    <application
        android:allowBackup="true"
        android:icon="@mipmap/ic_launcher"
        android:label="@string/app_name"
        android:roundIcon="@mipmap/ic_launcher_round"
        android:supportsRtl="true"
        android:theme="@style/Theme.SendPushNotificationFCM">
        <activity
            android:name=".ResultActivity"
            android:exported="false" />
        <activity
            android:name=".MainActivity"
            android:exported="true"
            android:screenOrientation="portrait">
            <intent-filter>
                <action android:name="android.intent.action.MAIN" />

                <category android:name="android.intent.category.LAUNCHER" />
            </intent-filter>
        </activity>

        <service
            android:name=".service.FirebaseMessagingService"
            android:exported="false"
            android:permission="com.google.android.c2dm.permission.SEND">
            <intent-filter>
                <action android:name="com.google.firebase.MESSAGING_EVENT" />
                <action android:name="com.google.android.c2dm.intent.RECEIVE" />
                <action android:name="com.google.android.c2dm.intent.SEND" />
            </intent-filter>
        </service>
        <!--
 Set custom default icon. This is used when no icon is set for incoming notification messages.
     See README(https://goo.gl/l4GJaQ) for more.
        -->
        <meta-data
            android:name="com.google.firebase.messaging.default_notification_icon"
            android:resource="@drawable/ic_baseline_sentiment_very_dissatisfied_24" />
        <meta-data
            android:name="com.google.firebase.messaging.default_notification_channel_id"
            android:value="@string/high_notification_channel_id" />
    </application>

</manifest>
```

#### Step 3. Design Layouts

For this project let's create the following layouts:

**(a). `activity_result.xml`**

> Our `activity_result` layout.

This layout will represent our Result Activity's layout. Specify [`androidx.constraintlayout.widget.ConstraintLayout`](https://android.camposha.info/en/constraintlayout) as it's root element then inside it place the following [widgets](https://android.camposha.info/en/view):

1. [`TextView`](https://android.camposha.info/en/textview)

```xml
<?xml version="1.0" encoding="utf-8"?>
<androidx.constraintlayout.widget.ConstraintLayout xmlns:android="http://schemas.android.com/apk/res/android"
    xmlns:app="http://schemas.android.com/apk/res-auto"
    xmlns:tools="http://schemas.android.com/tools"
    android:layout_width="match_parent"
    android:layout_height="match_parent"
    tools:context=".ResultActivity">

    <TextView
        android:id="@+id/textView"
        android:layout_width="wrap_content"
        android:layout_height="wrap_content"
        android:text="Result Activity"
        app:layout_constraintBottom_toBottomOf="parent"
        app:layout_constraintEnd_toEndOf="parent"
        app:layout_constraintHorizontal_bias="0.5"
        app:layout_constraintStart_toStartOf="parent"
        app:layout_constraintTop_toTopOf="parent" />
</androidx.constraintlayout.widget.ConstraintLayout>
```

**(b). `activity_main.xml`**

> Our `activity_main` layout.

This layout will represent our Main Activity's layout. Specify [`androidx.constraintlayout.widget.ConstraintLayout`](https://android.camposha.info/en/constraintlayout) as it's root element then inside it place the following [widgets](https://android.camposha.info/en/view):

1. [`TextView`](https://android.camposha.info/en/textview)
2. [`EditText`](https://android.camposha.info/en/edittext)
3. [`CheckBox`](https://android.camposha.info/en/checkbox)
4. [`ImageView`](https://android.camposha.info/en/imageview)
5. [`Button`](https://android.camposha.info/en/button)

```xml
<?xml version="1.0" encoding="utf-8"?>
<androidx.constraintlayout.widget.ConstraintLayout xmlns:android="http://schemas.android.com/apk/res/android"
    xmlns:app="http://schemas.android.com/apk/res-auto"
    xmlns:tools="http://schemas.android.com/tools"
    android:layout_width="match_parent"
    android:layout_height="match_parent"
    tools:context=".MainActivity">

    <TextView
        android:id="@+id/textViewTitle"
        android:layout_width="wrap_content"
        android:layout_height="wrap_content"
        android:layout_marginStart="16dp"
        android:text="Title:"
        app:layout_constraintBottom_toBottomOf="@+id/editTextTitle"
        app:layout_constraintStart_toStartOf="parent"
        app:layout_constraintTop_toTopOf="@+id/editTextTitle" />

    <EditText
        android:id="@+id/editTextTitle"
        android:layout_width="wrap_content"
        android:layout_height="wrap_content"
        android:layout_marginStart="16dp"
        android:layout_marginTop="8dp"
        android:ems="12"
        android:inputType="text"
        android:text="Title of notification"
        app:layout_constraintEnd_toEndOf="parent"
        app:layout_constraintStart_toEndOf="@+id/textViewBody"
        app:layout_constraintTop_toTopOf="parent" />

    <TextView
        android:id="@+id/textViewBody"
        android:layout_width="wrap_content"
        android:layout_height="wrap_content"
        android:layout_marginStart="16dp"
        android:text="Body:"
        app:layout_constraintBottom_toBottomOf="@+id/editTextBody"
        app:layout_constraintStart_toStartOf="parent"
        app:layout_constraintTop_toTopOf="@+id/editTextBody" />

    <EditText
        android:id="@+id/editTextBody"
        android:layout_width="wrap_content"
        android:layout_height="wrap_content"
        android:layout_marginStart="16dp"
        android:layout_marginTop="8dp"
        android:ems="12"
        android:inputType="text"
        android:text="Body of notification"
        app:layout_constraintEnd_toEndOf="parent"
        app:layout_constraintStart_toEndOf="@+id/textViewBody"
        app:layout_constraintTop_toBottomOf="@+id/editTextTitle" />

    <TextView
        android:id="@+id/textViewData"
        android:layout_width="wrap_content"
        android:layout_height="wrap_content"
        android:layout_marginStart="16dp"
        android:text="Data:"
        app:layout_constraintBottom_toBottomOf="@+id/editTextData"
        app:layout_constraintStart_toStartOf="parent"
        app:layout_constraintTop_toTopOf="@+id/editTextData" />

    <EditText
        android:id="@+id/editTextData"
        android:layout_width="wrap_content"
        android:layout_height="wrap_content"
        android:layout_marginStart="16dp"
        android:layout_marginTop="8dp"
        android:ems="12"
        android:inputType="text"
        android:text="any data string"
        app:layout_constraintEnd_toEndOf="parent"
        app:layout_constraintStart_toEndOf="@+id/textViewBody"
        app:layout_constraintTop_toBottomOf="@+id/editTextBody" />

    <TextView
        android:id="@+id/textViewShowPopUp"
        android:layout_width="wrap_content"
        android:layout_height="wrap_content"
        android:layout_marginStart="16dp"
        android:text="Data:"
        app:layout_constraintBottom_toBottomOf="@+id/checkBoxShowPopUp"
        app:layout_constraintStart_toStartOf="parent"
        app:layout_constraintTop_toTopOf="@+id/checkBoxShowPopUp" />

    <CheckBox
        android:id="@+id/checkBoxShowPopUp"
        android:layout_width="wrap_content"
        android:layout_height="wrap_content"
        android:layout_marginTop="8dp"
        android:text="show the notification in popUp"
        app:layout_constraintEnd_toEndOf="parent"
        app:layout_constraintStart_toEndOf="@+id/textViewBody"
        app:layout_constraintTop_toBottomOf="@+id/editTextData" />

    <TextView
        android:id="@+id/textViewSendToken"
        android:layout_width="wrap_content"
        android:layout_height="wrap_content"
        android:layout_marginStart="16dp"
        android:text="SendTo Token:"
        app:layout_constraintBottom_toBottomOf="@+id/editTextSendToken"
        app:layout_constraintStart_toStartOf="parent"
        app:layout_constraintTop_toTopOf="@+id/editTextSendToken" />

    <EditText
        android:id="@+id/editTextSendToken"
        android:layout_width="wrap_content"
        android:layout_height="wrap_content"
        android:layout_marginStart="16dp"
        android:layout_marginTop="0dp"
        android:ems="12"
        android:inputType="text"
        app:layout_constraintEnd_toEndOf="parent"
        app:layout_constraintStart_toEndOf="@+id/textViewBody"
        app:layout_constraintTop_toBottomOf="@+id/checkBoxShowPopUp" />

    <TextView
        android:id="@+id/textViewServerKey"
        android:layout_width="wrap_content"
        android:layout_height="wrap_content"
        android:layout_marginStart="16dp"
        android:text="Server Key:"
        app:layout_constraintBottom_toBottomOf="@+id/editTextServerKey"
        app:layout_constraintStart_toStartOf="parent"
        app:layout_constraintTop_toTopOf="@+id/editTextServerKey" />

    <EditText
        android:id="@+id/editTextServerKey"
        android:layout_width="wrap_content"
        android:layout_height="wrap_content"
        android:layout_marginStart="16dp"
        android:layout_marginTop="8dp"
        android:ems="12"
        android:inputType="text"
        app:layout_constraintEnd_toEndOf="parent"
        app:layout_constraintStart_toEndOf="@+id/textViewBody"
        app:layout_constraintTop_toBottomOf="@+id/editTextSendToken" />

    <TextView
        android:id="@+id/textViewMyFCMTokenLabel"
        android:layout_width="0dp"
        android:layout_height="wrap_content"
        android:layout_margin="12dp"
        android:text="My FCM Token:"
        app:layout_constraintBottom_toTopOf="@+id/textViewMyFCMToken"
        app:layout_constraintStart_toStartOf="@+id/textViewMyFCMToken" />

    <ImageView
        android:id="@+id/copyImageView"
        android:layout_width="wrap_content"
        android:layout_height="wrap_content"
        android:layout_margin="5dp"
        app:layout_constraintEnd_toEndOf="@+id/textViewMyFCMToken"
        app:layout_constraintTop_toTopOf="@+id/textViewMyFCMToken"
        app:srcCompat="@drawable/ic_baseline_content_copy_24" />

    <TextView
        android:id="@+id/textViewMyFCMToken"
        android:layout_width="0dp"
        android:layout_height="wrap_content"
        android:layout_margin="12dp"
        app:layout_constraintHeight_min="80dp"
        android:background="@drawable/border"
        android:padding="25dp"
        app:layout_constraintBottom_toTopOf="@+id/button"
        app:layout_constraintEnd_toEndOf="parent"
        app:layout_constraintStart_toStartOf="parent" />

    <Button
        android:id="@+id/button"
        android:layout_width="wrap_content"
        android:layout_height="wrap_content"
        android:layout_marginBottom="16dp"
        android:text="Send Push Notification"
        app:layout_constraintBottom_toBottomOf="parent"
        app:layout_constraintEnd_toEndOf="parent"
        app:layout_constraintStart_toStartOf="parent" />
</androidx.constraintlayout.widget.ConstraintLayout>
```

#### Step 4. Write Code

Finally we need to write our code as follows:

**(a). `Notification.kt`**

> Our `Notification` class.

Create a Kotlin file named `Notification.kt` .

Here is the full code:

```kotlin
package replace_with_your_package_name

//This data class will be received in FirebaseMessagingService::class#onMessageReceived() from RemoteMessage.notification object
data class Notification(
    val title: String,
    val body: String
)

```

**(b). `NotificationData.kt`**

> Our `NotificationData` class.

Create a Kotlin file named `NotificationData.kt` .

Here is the full code:

```kotlin
package replace_with_your_package_name

//This data class will be received in FirebaseMessagingService::class#onMessageReceived() from RemoteMessage.data object
data class NotificationData(
    //to add new notification create new fields here
    val data: String,
    val showPopUp: Boolean = true
)

```

**(c). `PushNotification.kt`**

> Our `PushNotification` class.

Create a Kotlin file named `PushNotification.kt` .

Here is the full code:

```kotlin
package replace_with_your_package_name

data class PushNotification(
    val notification: Notification,
    val data : NotificationData,
    val to : String //fcm token of who will receive the push notification
)

```

**(d). `Constants.kt`**

> Our `Constants` class.

Create a Kotlin file named `Constants.kt` .

Here is the full code:

```kotlin
package replace_with_your_package_name

class Constants {

    companion object {
        const val BASE_URL = "https://fcm.googleapis.com"
        const val CONTENT_TYPE = "application/json"
    }
}

```

**(e). `NotificationUtil.kt`**

> Our `NotificationUtil` class.

Create a Kotlin file named `NotificationUtil.kt` and add the necessary imports. Here are some of the imports we will be using:
1. `Intent` from the `android.content` package.
2. `Color` from the `android.graphics` package.
3. `Log` from the `android.util` package.
4. `NotificationCompat` from the `androidx.core.app` package.
5. `ContextCompat` from the `androidx.core.content` package.

Then we will be creating the following functions:

1. `createNotification(context: Context, title: String, body: String, data: Map<String, String>? = null) `.
2. `createChannels(parameter)` - Let's pass a `Context` object as a parameter.
3. `createNotificationHighPriorityChannel(parameter)` - We pass a `Context` object as a parameter.
4. `createNotificationDefaultPriorityChannel(parameter)` - We pass a `Context` object as a parameter.

**(a). Our `createNotificationDefaultPriorityChannel()` function**

Write the `createNotificationDefaultPriorityChannel()` function as follows:

```kotlin
        private fun createNotificationDefaultPriorityChannel(context: Context) {
            val channelName = context.getString(R.string.default_notification_channel_name)
            val channelId = context.getString(R.string.default_notification_channel_id)
            val channel = NotificationChannel(
                channelId, channelName,
                NotificationManager.IMPORTANCE_DEFAULT
            ).apply {
                description =
                    "This channel the notification does not makes a sound and does not appears as a heads-up notification"
                enableLights(false)
                lightColor = Color.GREEN
            }
            val notificationManager = ContextCompat.getSystemService(
                context,
                NotificationManager::class.java
            ) as NotificationManager
            notificationManager.createNotificationChannel(channel)
        }
```

**(b). Our `createNotification()` function**

Write the `createNotification()` function as follows:

```kotlin
        fun createNotification(context: Context, title: String, body: String, data: Map<String, String>? = null) {

            val intent = Intent(context, MainActivity::class.java)
            val notificationManager =
                context.getSystemService(Context.NOTIFICATION_SERVICE) as NotificationManager
            val notificationID = Random.nextInt()
            Log.d("layon.f", "createNotification: title $title body: $body notificationID: $notificationID")

            intent.addFlags(Intent.FLAG_ACTIVITY_CLEAR_TOP)
            val pendingIntent = PendingIntent.getActivity(context, 0, intent, PendingIntent.FLAG_ONE_SHOT)
            val channel = if (data?.get("showPopUp") == "true") {
                context.getString(R.string.high_notification_channel_id)
            } else {
                context.getString(R.string.default_notification_channel_id)
            }
            val notification =
                NotificationCompat.Builder(context, channel)
                    .setContentTitle(title)
                    .setContentText(body)
                    .setSmallIcon(R.drawable.ic_baseline_add_reaction_24)
                    .setAutoCancel(true)
                    .setContentIntent(pendingIntent)
                    .build()

            notificationManager.notify(notificationID, notification)
        }
```

**(c). Our `createChannels()` function**

Write the `createChannels()` function as follows:

```kotlin
        fun createChannels(context: Context) {
            createNotificationHighPriorityChannel(context)
            createNotificationDefaultPriorityChannel(context)
        }
```

**(d). Our `createNotificationHighPriorityChannel()` function**

Write the `createNotificationHighPriorityChannel()` function as follows:

```kotlin
        private fun createNotificationHighPriorityChannel(context: Context) {
            val channelName = context.getString(R.string.high_notification_channel_name)
            val channelId = context.getString(R.string.high_notification_channel_id)
            val channel = NotificationChannel(
                channelId, channelName,
                NotificationManager.IMPORTANCE_HIGH
            ).apply {
                description =
                    "This channel the notification makes a sound and appears as a heads-up notification"
                enableLights(true)
                lightColor = Color.GREEN
            }
            val notificationManager = ContextCompat.getSystemService(
                context,
                NotificationManager::class.java
            ) as NotificationManager
            notificationManager.createNotificationChannel(channel)
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
import android.graphics.Color
import android.util.Log
import androidx.core.app.NotificationCompat
import androidx.core.content.ContextCompat
import com.layon.sendpushnotificationfcm.MainActivity
import com.layon.sendpushnotificationfcm.R
import kotlin.random.Random

class NotificationUtil {

    companion object {

        fun createNotification(context: Context, title: String, body: String, data: Map<String, String>? = null) {

            val intent = Intent(context, MainActivity::class.java)
            val notificationManager =
                context.getSystemService(Context.NOTIFICATION_SERVICE) as NotificationManager
            val notificationID = Random.nextInt()
            Log.d("layon.f", "createNotification: title $title body: $body notificationID: $notificationID")

            intent.addFlags(Intent.FLAG_ACTIVITY_CLEAR_TOP)
            val pendingIntent = PendingIntent.getActivity(context, 0, intent, PendingIntent.FLAG_ONE_SHOT)
            val channel = if (data?.get("showPopUp") == "true") {
                context.getString(R.string.high_notification_channel_id)
            } else {
                context.getString(R.string.default_notification_channel_id)
            }
            val notification =
                NotificationCompat.Builder(context, channel)
                    .setContentTitle(title)
                    .setContentText(body)
                    .setSmallIcon(R.drawable.ic_baseline_add_reaction_24)
                    .setAutoCancel(true)
                    .setContentIntent(pendingIntent)
                    .build()

            notificationManager.notify(notificationID, notification)
        }

        fun createChannels(context: Context) {
            createNotificationHighPriorityChannel(context)
            createNotificationDefaultPriorityChannel(context)
        }

        private fun createNotificationHighPriorityChannel(context: Context) {
            val channelName = context.getString(R.string.high_notification_channel_name)
            val channelId = context.getString(R.string.high_notification_channel_id)
            val channel = NotificationChannel(
                channelId, channelName,
                NotificationManager.IMPORTANCE_HIGH
            ).apply {
                description =
                    "This channel the notification makes a sound and appears as a heads-up notification"
                enableLights(true)
                lightColor = Color.GREEN
            }
            val notificationManager = ContextCompat.getSystemService(
                context,
                NotificationManager::class.java
            ) as NotificationManager
            notificationManager.createNotificationChannel(channel)
        }

        private fun createNotificationDefaultPriorityChannel(context: Context) {
            val channelName = context.getString(R.string.default_notification_channel_name)
            val channelId = context.getString(R.string.default_notification_channel_id)
            val channel = NotificationChannel(
                channelId, channelName,
                NotificationManager.IMPORTANCE_DEFAULT
            ).apply {
                description =
                    "This channel the notification does not makes a sound and does not appears as a heads-up notification"
                enableLights(false)
                lightColor = Color.GREEN
            }
            val notificationManager = ContextCompat.getSystemService(
                context,
                NotificationManager::class.java
            ) as NotificationManager
            notificationManager.createNotificationChannel(channel)
        }
    }
}

```

**(f). `FirebaseMessagingService.kt`**
> Our `FirebaseMessagingService` class.

Create a Kotlin file named `FirebaseMessagingService.kt` and add the necessary imports. Here are some of the imports we will be using:
1. `Intent` from the `android.content` package.
2. `Log` from the `android.util` package.

Then extend the `FirebaseMessagingService` and add its contents as follows:

First override these callbacks: 

1. `onMessageReceived(remoteMessage: RemoteMessage) `.
2. `onNewToken(newToken: String) `.

Here is the full code:

```kotlin
package replace_with_your_package_name

import android.content.Intent
import android.util.Log
import com.google.firebase.messaging.FirebaseMessagingService
import com.google.firebase.messaging.RemoteMessage
import com.layon.sendpushnotificationfcm.ResultActivity
import com.layon.sendpushnotificationfcm.utils.NotificationUtil

class FirebaseMessagingService : FirebaseMessagingService() {

    override fun onMessageReceived(remoteMessage: RemoteMessage) {
        super.onMessageReceived(remoteMessage)

        Log.d("layon.f", "message: $remoteMessage")
        Log.d("layon.f", "message.from: ${remoteMessage.from}")
        Log.d("layon.f", "message.data: ${remoteMessage.data}")
        Log.d(
            "layon.f",
            "message.notification: ${remoteMessage.notification?.title} ${remoteMessage.notification?.body}"
        )

        remoteMessage.data?.let {
            Log.d("layon.f", "message.data.getdata: ${remoteMessage.data.get("data")}")
            if (it.get("data").toString() == "open result") {
                Log.d("layon.f", "it.contains(\"data\").toString() ${it.contains("data").toString()}")
                val intent = Intent(this, ResultActivity::class.java)
                intent.addFlags(Intent.FLAG_ACTIVITY_NEW_TASK)
                startActivity(intent)
            }
        }


        remoteMessage.notification?.let { notification ->
            NotificationUtil.createNotification(
                context = this,
                title = notification.title.toString(),
                body = notification.body.toString(),
                data = remoteMessage.data
            )
        }
    }

    override fun onNewToken(newToken: String) {
        super.onNewToken(newToken)
        Log.d("layon.f", "onNewToken : $newToken")
    }
}

```

**(g). `NotificationAPI.kt`**
> Our `NotificationAPI` class.

Create a Kotlin file named `NotificationAPI.kt` .

Then we will be creating the following functions:



Here is the full code:

```kotlin
package replace_with_your_package_name


import com.layon.sendpushnotificationfcm.model.PushNotification
import okhttp3.ResponseBody
import retrofit2.Response
import retrofit2.http.Body
import retrofit2.http.Header
import retrofit2.http.POST

interface NotificationAPI {

    @POST("fcm/send")
    suspend fun postNotification(
        @Body notification: PushNotification,
        @Header("Authorization") serverKey: String,
        @Header("Content-Type") contentType: String,
    ) : Response<ResponseBody>
}

```

**(h). `RetrofitInstance.kt`**
> Our `RetrofitInstance` class.

Create a Kotlin file named `RetrofitInstance.kt` .

Then we will be creating the following functions:

1. `setupLog(): OkHttpClient `.

**(a). Our `setupLog()` function**

Write the `setupLog()` function as follows:

```kotlin
        fun setupLog(): OkHttpClient {
            val logging = HttpLoggingInterceptor()
            logging.setLevel(HttpLoggingInterceptor.Level.BODY)
            val httpClient = OkHttpClient.Builder()
            httpClient.addInterceptor(logging)
            return httpClient.build()
        }
```


Here is the full code:

```kotlin
package replace_with_your_package_name

import com.layon.sendpushnotificationfcm.utils.Constants.Companion.BASE_URL
import okhttp3.OkHttpClient
import okhttp3.logging.HttpLoggingInterceptor
import retrofit2.Retrofit
import retrofit2.converter.gson.GsonConverterFactory

class RetrofitInstance {

    companion object {

        fun setupLog(): OkHttpClient {
            val logging = HttpLoggingInterceptor()
            logging.setLevel(HttpLoggingInterceptor.Level.BODY)
            val httpClient = OkHttpClient.Builder()
            httpClient.addInterceptor(logging)
            return httpClient.build()
        }


        private val retrofit by lazy {
            Retrofit.Builder()
                .baseUrl(BASE_URL)
                .client(setupLog())
                .addConverterFactory(GsonConverterFactory.create())
                .build()
        }

        val api by lazy {
            retrofit.create(NotificationAPI::class.java)
        }
    }
}

```

**(i). `ResultActivity.kt`**
> Our `ResultActivity` class.

Create a Kotlin file named `ResultActivity.kt` and add the necessary imports. Here are some of the imports we will be using:
1. `AppCompatActivity` from the `androidx.appcompat.app` package.
2. `Bundle` from the `android.os` package.

Then extend the `AppCompatActivity` and add its contents as follows:

First override these callbacks: 

1. `onCreate(savedInstanceState: Bundle?) `.

Here is the full code:

```kotlin
package replace_with_your_package_name

import androidx.appcompat.app.AppCompatActivity
import android.os.Bundle

class ResultActivity : AppCompatActivity() {
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_result)
    }
}

```

**(j). `MainActivity.kt`**
> Our `MainActivity` class.

Create a Kotlin file named `MainActivity.kt` and add the necessary imports. Here are some of the imports we will be using:
1. `Log` from the `android.util` package.
2. `Toast` from the `android.widget` package.
3. `CoroutineScope` from the `kotlinx.coroutines` package.
4. `Dispatchers` from the `kotlinx.coroutines` package.
5. `launch` from the `kotlinx.coroutines` package.

Then extend the `AppCompatActivity` and add its contents as follows:

First override these callbacks: 

1. `onCreate(savedInstanceState: Bundle?) `.

Then we will be creating the following functions:

1. `copy(parameter)` - We pass a `String` object as a parameter.
2. `showToast(parameter)` - Our function will take a `String` object as a parameter.

**(a). Our `copy()` function**

Write the `copy()` function as follows:

```kotlin
    private fun copy(text: String){
        val clipboard: ClipboardManager =
            getSystemService(Context.CLIPBOARD_SERVICE) as ClipboardManager
        val clip = ClipData.newPlainText("copy", text)
        clipboard.setPrimaryClip(clip)
    }
```

**(b). Our `showToast()` function**

Write the `showToast()` function as follows:

```kotlin
    private fun showToast(text: String){
        Toast.makeText(this, text, Toast.LENGTH_LONG).show()
    }
```


Here is the full code:

```kotlin
package replace_with_your_package_name

import android.content.ClipData
import android.content.ClipboardManager
import android.content.Context
import androidx.appcompat.app.AppCompatActivity
import android.os.Bundle
import android.util.Log
import android.widget.Toast
import com.google.android.gms.tasks.OnCompleteListener
import com.google.firebase.messaging.FirebaseMessaging
import com.google.gson.Gson
import com.layon.sendpushnotificationfcm.utils.Constants.Companion.CONTENT_TYPE
import com.layon.sendpushnotificationfcm.databinding.ActivityMainBinding
import com.layon.sendpushnotificationfcm.model.Notification
import com.layon.sendpushnotificationfcm.model.NotificationData
import com.layon.sendpushnotificationfcm.model.PushNotification
import com.layon.sendpushnotificationfcm.repository.RetrofitInstance
import com.layon.sendpushnotificationfcm.utils.NotificationUtil
import kotlinx.coroutines.CoroutineScope
import kotlinx.coroutines.Dispatchers
import kotlinx.coroutines.launch

const val TAG = "layon.f"
const val TOPIC = "sendpushnotificationfcmtopic"

class MainActivity : AppCompatActivity() {

    private lateinit var binding: ActivityMainBinding

    private var serverKey : String? = null

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        binding = ActivityMainBinding.inflate(layoutInflater)
        val view = binding.root
        setContentView(view)

        //get the actual FCM token
        FirebaseMessaging.getInstance().token.addOnCompleteListener(OnCompleteListener { task ->
            if (!task.isSuccessful) {
                Log.w(TAG, "Fetching FCM registration token failed", task.exception)
                return@OnCompleteListener
            }
            val token = task.result
            binding.textViewMyFCMToken.text = "$token"
        })

        FirebaseMessaging.getInstance().subscribeToTopic(TOPIC)

        binding.button.setOnClickListener {
            val title = binding.editTextTitle.text.toString()
            val message = binding.editTextBody.text.toString()
            val data = binding.editTextData.text.toString()
            val showPopUp = binding.checkBoxShowPopUp.isChecked
            val recipientToken = binding.editTextSendToken.text.toString()
            serverKey = binding.editTextServerKey.text.toString()

            if(title.isNotEmpty() && message.isNotEmpty()) {

                if(serverKey.isNullOrBlank()) {
                    showToast("You was supposed to input the server_key")
                }
                if(recipientToken.isBlank()){
                    showToast("You was supposed to input the fcm token recipient")
                }

                PushNotification(
                    notification = Notification(title = title, body = message),
                    data = NotificationData(data = data, showPopUp = showPopUp),
                    to = recipientToken
                ).also {
                    sendNotification(it)
                    showToast("notification sent")
                }
            }
        }

        binding.copyImageView.setOnClickListener {
            copy(binding.textViewMyFCMToken.text.toString())
            showToast("fcm token copied")
        }

        //create the notification channel if not exists
        NotificationUtil.createChannels(this)
    }

    private fun sendNotification(notification: PushNotification) =
        CoroutineScope(Dispatchers.IO).launch {
            try {
                val response = RetrofitInstance.api.postNotification(
                    notification = notification,
                    serverKey = "key=$serverKey",
                    contentType = CONTENT_TYPE
                )
                if (response.isSuccessful) {
                    Log.d(TAG, "Response: ${Gson().toJson(response)}")
                } else {
                    Log.e(TAG, response.errorBody().toString())
                }
            } catch (e: Exception) {
                Log.e(TAG, e.toString())
            }
        }

    private fun copy(text: String){
        val clipboard: ClipboardManager =
            getSystemService(Context.CLIPBOARD_SERVICE) as ClipboardManager
        val clip = ClipData.newPlainText("copy", text)
        clipboard.setPrimaryClip(clip)
    }

    private fun showToast(text: String){
        Toast.makeText(this, text, Toast.LENGTH_LONG).show()
    }
}

```

### Reference

Download the code below:

|No.|Link|
|--|---|
|1.|[Download Full Code](https://github.com/layonmartins/SendPushNotificationFCM/archive/refs/heads/main.zip)|
|2.|Read more [here](https://github.com/layonmartins/SendPushNotificationFCM).|
|3.|Follow code author [here](https://github.com/layonmartins).|
