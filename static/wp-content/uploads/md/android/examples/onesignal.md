# Kotlin Android OneSignal Example

> How to Onesignal push notifications in android via kotlin.


OneSignal is a fast and reliable service to send push notifications, in-app messages, SMS, and emails.

## Android SDK Setup

Instructions for adding the OneSignal Android Mobile App SDK to your Android or Amazon Kindle Fire Apps using Android Studio.


### Step 1. Requirements

- [OneSignal Account](https://onesignal.com/)
- Your OneSignal App Id, available in [Settings > Keys & IDs](https://documentation.onesignal.com/docs/accounts-and-keys).
- [Android Studio](https://developer.android.com/studio)
- An Android 4.0.3+ device or emulator with "Google Play Store (Services)" installed.
- [A Google/Firebase Server API Key](https://documentation.onesignal.com/docs/generate-a-google-server-api-key).
- Project using [AndroidX](https://developer.android.com/jetpack/androidx/migrate).

### Step 2. Add OneSignal Gradle Plugin and SDK

> **2.1** Open your root `build.gradle (Project: name)` file, add the following.

- Under `buildscript` > `repositories` add _**(before jcenter**)_
    - `mavenCentral()`
    - `gradlePluginPortal()`
- Under `buildscript` > `dependencies` add
    - `classpath 'gradle.plugin.com.onesignal:onesignal-gradle-plugin:[0.12.10, 0.99.99]'`
- Under `allprojects` > `repositories` add _**(before jcenter)**_
    - `mavenCentral()`

> Newer versions of Android Studio
> 
> When creating a new project from Android Studio Artic Fox (or newer) the allprojects{...} is no longer added in the project level gradle. You should only copy the buildscript portion of the code below.

**build.gradle**

```groovy
buildscript {
    repositories {
        google()
        mavenCentral()
        gradlePluginPortal()
        jcenter()
    }
    dependencies {
        classpath 'gradle.plugin.com.onesignal:onesignal-gradle-plugin:[0.12.10, 0.99.99]'
    }
}

allprojects {
    repositories {
        google()
        mavenCentral()
        jcenter()
    }
}
```

![](https://files.readme.io/20fdf26-Root_build.gradle_highlights.png)

![](https://files.readme.io/20fdf26-Root_build.gradle_highlights.png)

> **2.2** Open your App `build.gradle (Module: app)` file, add the following **under** `buildscript {...}` and **above** `'com.android.application'`.

**app/build.gradle**

```groovy
plugins {
    id 'com.onesignal.androidsdk.onesignal-gradle-plugin'
    // Other plugins here if pre-existing
}
```

> **2.3** Add the following to your `dependencies` section.

**app/build.gradle**

```groovy
dependencies {
    implementation 'com.onesignal:OneSignal:[4.0.0, 4.99.99]'
}
```

![](https://files.readme.io/b736b81-Screen_Shot_2020-12-14_at_6.14.47_PM.png)

![](https://files.readme.io/b736b81-Screen_Shot_2020-12-14_at_6.14.47_PM.png)

> Sync Gradle
> 
> Make sure to press "Sync Now" on the banner that pops up after saving!

### Step 3. Add Required Code

> **3.1** Add the following to the `onCreate` method in your `Application` class.

If you don't have an Application class follow our [Create Application Class Guide](https://documentation.onesignal.com/docs/create-application-class-android-studio).

Note: The ONESIGNAL\_APP\_ID can be found in the dashboard Settings > [Keys & IDs](https://documentation.onesignal.com/docs/accounts-and-keys)

**Kotlin**

```kotlin
import com.onesignal.OneSignal

const val ONESIGNAL_APP_ID = "########-####-####-####-############"
  
class MainApplication : Application() {
   override fun onCreate() {
      super.onCreate()
        
      // Logging set to help debug issues, remove before releasing your app.
      OneSignal.setLogLevel(OneSignal.LOG_LEVEL.VERBOSE, OneSignal.LOG_LEVEL.NONE)
      
      // OneSignal Initialization
      OneSignal.initWithContext(this)
      OneSignal.setAppId(ONESIGNAL_APP_ID)
   }
}
```

**Java**

```java
import com.onesignal.OneSignal;

public class MainApplication extends Application {
    private static final String ONESIGNAL_APP_ID = "########-####-####-####-############";
  
    @Override
    public void onCreate() {
        super.onCreate();
        
        // Enable verbose OneSignal logging to debug issues if needed.
        OneSignal.setLogLevel(OneSignal.LOG_LEVEL.VERBOSE, OneSignal.LOG_LEVEL.NONE);
        
        // OneSignal Initialization
        OneSignal.initWithContext(this);
        OneSignal.setAppId(ONESIGNAL_APP_ID);
    }
}
```

### Step 4. Customize the default notification icons ( strongly recommended )

By default, notifications will be shown with a small bell icon in the notification shade. Follow the [Customize Notification Icons](https://documentation.onesignal.com/docs/customize-notification-icons) guide to create your own small and large notification icons for your app.

![](https://files.readme.io/2b21f41-3c2fb44-android-notification-preview.png "3c2fb44-android-notification-preview.png")![](https://files.readme.io/2b21f41-3c2fb44-android-notification-preview.png "Click to close...")

### Step 5. Run Your App and Send Yourself a Notification

Run your app on a physical device to make sure it builds correctly.

Your Android device should already be subscribed to push notifications. Check your OneSignal Dashboard **Audience > All Users** to see your [Device Record](https://documentation.onesignal.com/docs/users).

Then head over to **Messages > New Push** to [Send your first Push Notification](https://documentation.onesignal.com/docs/sending-notifications) from OneSignal.

### Step 6. Set Custom User Properties

**Recommended**  
After initialization, OneSignal will automatically collect [common user data](https://documentation.onesignal.com/docs/data-collected-by-the-onesignal-sdk) by default. Use the following methods to set your own custom userIds, emails, phone numbers, and other user-level properties.

### Set External User Id

> **Required if using integrations.**  
> **Recommended for messaging across multiple channels (push, email, sms).**

OneSignal creates channel-level device records under a unique Id called the `player_id`. A single user can have multiple `player_id` records based on how many devices, email addresses, and phone numbers they use to interact with your app.

If your app has its own login system to track users, call `setExternalUserId` at any time to link all channels to a single user. For more details, see [External User Ids](https://documentation.onesignal.com/docs/external-user-ids).


```java
String externalUserId = "123456789"; // You will supply the external user id to the OneSignal SDK
OneSignal.setExternalUserId(externalUserId);
```

Let us now look at simple but full examples.

## Example 1: Kotlin Android OneSignal

Simple Kotlin Onesignal example.

### Step 1: Setup OneSignal

Setup OneSignal as has been described above.

### Step 2: Dependencies

Include the following in your `app/build.gradle` dependencies:

```groovy
    implementation platform('com.google.firebase:firebase-bom:26.4.0')
    implementation 'com.google.firebase:firebase-analytics-ktx'


    implementation 'com.onesignal:OneSignal:[4.0.0, 4.99.99]'
```

### Step 2: Add Permission

Add Internet permission in your `AndroidManifest.xml`

```xml
    <uses-permission android:name="android.permission.INTERNET" />
```

### Step 3: Write Code

Here is the full code:

**MainActivity.kt**

```kotlin
package com.keremturker.kotlin_onesignal

import android.os.Bundle
import androidx.appcompat.app.AppCompatActivity
import com.onesignal.OneSignal

class MainActivity : AppCompatActivity() {

    private val ONESIGNAL_APP_ID = "000b9068-53f6-4210-bc50-ce65b7835c63"

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_main)

        OneSignal.setLogLevel(OneSignal.LOG_LEVEL.VERBOSE,OneSignal.LOG_LEVEL.NONE)

        OneSignal.initWithContext(this)
        OneSignal.setAppId(ONESIGNAL_APP_ID)
    }
}

```

### Reference

- Download code [here](https://github.com/Keremturker/Kotlin-OneSignal/archive/refs/heads/Turker.zip).
- Follow code author [here](https://github.com/Keremturker/).
