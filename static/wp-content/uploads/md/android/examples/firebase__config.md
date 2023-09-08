# Firebase Remote Config Quickstart

This is a simple Firebase Remote Config example project. Here is the demo screenshot of what is created:

![firebase Example Tutorial](https://github.com/firebase/quickstart-android/raw/master/config/app/src/screen.png)

#### Step 1. Dependencies

We need to add some dependencies in our `app/build.gradle` file as shown below:

**(a). `build.gradle`**

> Our app-level `build.gradle`.

We Prepare our dependencies as shown below. You may use later versions.

We will enable view binding by setting the `viewBinding` property to true.

We then declare our app dependencies under the `dependencies` closure. We will need the following 7 dependencies:

1. Our `Material` library.
2. Our `Firebase-bom` library.
3. Our `Com.google.firebase` library.
4. Our `Com.google.firebase` library.
5. Our `Com.google.firebase` library.

Here is our full `app/build.gradle`:

```groovy
plugins {
    id 'com.android.application'
    id 'kotlin-android'
    id 'com.google.gms.google-services'
}

check.dependsOn 'assembleDebugAndroidTest'

android {
    compileSdkVersion 33

    defaultConfig {
        applicationId "com.google.samples.quickstart.config"
        minSdkVersion 19
        targetSdkVersion 33
        versionCode 1
        versionName "1.0"

        testInstrumentationRunner "androidx.test.runner.AndroidJUnitRunner"
    }

    buildTypes {
        release {
            minifyEnabled true
            proguardFiles getDefaultProguardFile('proguard-android.txt'), 'proguard-rules.pro'
        }
    }

    buildFeatures {
        viewBinding = true
    }
}

dependencies {
    implementation project(":internal:lintchecks")
    implementation project(":internal:chooserx")

    implementation 'com.google.android.material:material:1.6.1'

    // Import the Firebase BoM (see: https://firebase.google.com/docs/android/learn-more#bom)
    implementation platform('com.google.firebase:firebase-bom:30.5.0')

    // Firebase Remote Config (Java)
    implementation 'com.google.firebase:firebase-config'

    // Firebase Remote Config (Kotlin)
    implementation 'com.google.firebase:firebase-config-ktx'

    // For an optimal experience using Remote Config, add the Firebase SDK
    // for Google Analytics. This is recommended, but not required.
    implementation 'com.google.firebase:firebase-analytics'

    androidTestImplementation 'androidx.test.espresso:espresso-core:3.4.0'
    androidTestImplementation 'androidx.test:rules:1.4.0'
    androidTestImplementation 'androidx.test:runner:1.4.0'
    androidTestImplementation 'androidx.test.ext:junit:1.1.3'
}

```
#### Step 2. Create Firebase App

You will need to create or setup a Firebase app first. [This link](https://firebase.google.com/docs/android/setup) explains how to do so.

#### Step 3. Our Android Manifest

**(a). `AndroidManifest.xml`**

> Our `AndroidManifest` file.

```xml
<?xml version="1.0" encoding="utf-8"?>
<manifest xmlns:android="http://schemas.android.com/apk/res/android"
    package="com.google.samples.quickstart.config" >

    <application
        android:allowBackup="true"
        android:icon="@mipmap/ic_launcher"
        android:label="@string/app_name"
        android:theme="@style/AppTheme" >

        <activity
            android:name=".java.MainActivity"
            android:label="@string/app_name" />

        <activity
            android:name=".kotlin.MainActivity"
            android:label="@string/app_name" />

        <activity
            android:name=".EntryChoiceActivity"
            android:label="@string/app_name"
            android:exported="true">
            <intent-filter>
                <action android:name="android.intent.action.MAIN" />

                <category android:name="android.intent.category.LAUNCHER" />
            </intent-filter>
        </activity>
    </application>

</manifest>

```
#### Step 4. Create Remote Config XML

Create a directory known as `xml` inside your `res` directory and add the following xml file:

**(a). `remote_config_defaults.xml`**

```xml
<?xml version="1.0" encoding="utf-8"?>
<!-- START xml_defaults -->
<defaultsMap>
    <entry>
        <key>loading_phrase</key>
        <value>Fetching config…</value>
    </entry>
    <entry>
        <key>welcome_message_caps</key>
        <value>false</value>
    </entry>
    <entry>
        <key>welcome_message</key>
        <value>Welcome to my awesome app!</value>
    </entry>
</defaultsMap>
    <!-- END xml_defaults -->

```
#### Step 5. Design Layouts

**(a). `activity_main.xml`**

> Our `activity_main` layout.

Inside your `/res/layout/` directory create an xml layout file named `activity_main.xml` and add the following widgets:

1. [`androidx.constraintlayout.widget.ConstraintLayout`](https://android.camposha.info/en/constrainlayout)
2. [`ImageView`](https://android.camposha.info/en/textview)
3. [`TextView`](https://android.camposha.info/en/textview)
4. [`Button`](https://android.camposha.info/en/button)

```xml
<androidx.constraintlayout.widget.ConstraintLayout xmlns:android="http://schemas.android.com/apk/res/android"
    xmlns:app="http://schemas.android.com/apk/res-auto"
    xmlns:tools="http://schemas.android.com/tools"
    android:layout_width="match_parent"
    android:layout_height="match_parent"
    android:paddingBottom="@dimen/activity_vertical_margin"
    android:paddingLeft="@dimen/activity_horizontal_margin"
    android:paddingRight="@dimen/activity_horizontal_margin"
    android:paddingTop="@dimen/activity_vertical_margin"
    tools:context=".java.MainActivity">

    <ImageView
        android:id="@+id/icon"
        android:layout_width="wrap_content"
        android:layout_height="wrap_content"
        android:src="@drawable/firebase_lockup_400"
        app:layout_constraintEnd_toEndOf="parent"
        app:layout_constraintStart_toStartOf="parent"
        app:layout_constraintTop_toTopOf="parent" />

    <TextView
        android:id="@+id/welcomeTextView"
        android:layout_width="wrap_content"
        android:layout_height="wrap_content"
        android:layout_below="@+id/icon"
        android:layout_marginTop="16dp"
        android:text="Welcome..."
        app:layout_constraintEnd_toEndOf="@+id/icon"
        app:layout_constraintStart_toStartOf="@+id/icon"
        app:layout_constraintTop_toBottomOf="@+id/icon" />

    <Button
        android:id="@+id/fetchButton"
        android:layout_width="wrap_content"
        android:layout_height="wrap_content"
        android:text="@string/fetch_remote_welcome_message"
        app:layout_constraintBottom_toBottomOf="parent"
        app:layout_constraintEnd_toEndOf="parent"
        app:layout_constraintStart_toStartOf="parent"
        app:layout_constraintTop_toBottomOf="@+id/welcomeTextView" />

</androidx.constraintlayout.widget.ConstraintLayout>

```
#### Step 6. Write Code

Finally we need to write our code as follows:

**(a). `EntryChoiceActivity.kt`**

> Our `EntryChoiceActivity` class.

Create a Kotlin file named `EntryChoiceActivity.kt` and create a class that derives from `BaseEntryChoiceActivity` and add its contents as follows:

We will be overriding the following functions: 

1. `getChoices(): List<Choice> `.

Here is the full code:

```kotlin
package replace_with_your_package_name

import android.content.Intent
import com.firebase.example.internal.BaseEntryChoiceActivity
import com.firebase.example.internal.Choice

class EntryChoiceActivity : BaseEntryChoiceActivity() {

    override fun getChoices(): List<Choice> {
        return listOf(
                Choice(
                        "Java",
                        "Run the Firebase Remote Config quickstart written in Java.",
                        Intent(
                            this,
                            com.google.samples.quickstart.config.java.MainActivity::class.java)),
                Choice(
                        "Kotlin",
                        "Run the Firebase Remote Config quickstart written in Kotlin.",
                        Intent(
                            this,
                            com.google.samples.quickstart.config.kotlin.MainActivity::class.java))
        )
    }
}


```

**(b). `MainActivity.kt`**

> Our `MainActivity` class.

Create a Kotlin file named `MainActivity.kt`. We will be overriding the following functions: 

1. `onCreate(savedInstanceState: Bundle?) `.

We will be creating the following methods:

1. `fetchWelcome() `.
2. `displayWelcomeMessage() `.

**(a). Our `displayWelcomeMessage()` function**

Write the `displayWelcomeMessage()` function as follows:

```kotlin
    private fun displayWelcomeMessage() {
        // [START get_config_values]
        val welcomeMessage = remoteConfig[WELCOME_MESSAGE_KEY].asString()
        // [END get_config_values]
        binding.welcomeTextView.isAllCaps = remoteConfig[WELCOME_MESSAGE_CAPS_KEY].asBoolean()
        binding.welcomeTextView.text = welcomeMessage
    }
```

**(b). Our `fetchWelcome()` function**

Write the `fetchWelcome()` function as follows:

```kotlin
    private fun fetchWelcome() {
        binding.welcomeTextView.text = remoteConfig[LOADING_PHRASE_CONFIG_KEY].asString()

        // [START fetch_config_with_callback]
        remoteConfig.fetchAndActivate()
                .addOnCompleteListener(this) { task ->
                    if (task.isSuccessful) {
                        val updated = task.result
                        Log.d(TAG, "Config params updated: $updated")
                        Toast.makeText(this, "Fetch and activate succeeded",
                                Toast.LENGTH_SHORT).show()
                    } else {
                        Toast.makeText(this, "Fetch failed",
                                Toast.LENGTH_SHORT).show()
                    }
                    displayWelcomeMessage()
                }
        // [END fetch_config_with_callback]
    }
```


Here is the full code:

```kotlin
package replace_with_your_package_name

import android.os.Bundle
import android.util.Log
import android.widget.Toast
import androidx.appcompat.app.AppCompatActivity
import com.google.firebase.ktx.Firebase
import com.google.firebase.remoteconfig.FirebaseRemoteConfig
import com.google.firebase.remoteconfig.ktx.get
import com.google.firebase.remoteconfig.ktx.remoteConfig
import com.google.firebase.remoteconfig.ktx.remoteConfigSettings
import com.google.samples.quickstart.config.R
import com.google.samples.quickstart.config.databinding.ActivityMainBinding

class MainActivity : AppCompatActivity() {

    private lateinit var remoteConfig: FirebaseRemoteConfig
    private lateinit var binding: ActivityMainBinding

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        binding = ActivityMainBinding.inflate(layoutInflater)
        setContentView(binding.root)

        binding.fetchButton.setOnClickListener { fetchWelcome() }

        // Get Remote Config instance.
        // [START get_remote_config_instance]
        remoteConfig = Firebase.remoteConfig
        // [END get_remote_config_instance]

        // Create a Remote Config Setting to enable developer mode, which you can use to increase
        // the number of fetches available per hour during development. Also use Remote Config
        // Setting to set the minimum fetch interval.
        // [START enable_dev_mode]
        val configSettings = remoteConfigSettings {
            minimumFetchIntervalInSeconds = 3600
        }
        remoteConfig.setConfigSettingsAsync(configSettings)
        // [END enable_dev_mode]

        // Set default Remote Config parameter values. An app uses the in-app default values, and
        // when you need to adjust those defaults, you set an updated value for only the values you
        // want to change in the Firebase console. See Best Practices in the README for more
        // information.
        // [START set_default_values]
        remoteConfig.setDefaultsAsync(R.xml.remote_config_defaults)
        // [END set_default_values]

        fetchWelcome()
    }

    /**
     * Fetch a welcome message from the Remote Config service, and then activate it.
     */
    private fun fetchWelcome() {
        binding.welcomeTextView.text = remoteConfig[LOADING_PHRASE_CONFIG_KEY].asString()

        // [START fetch_config_with_callback]
        remoteConfig.fetchAndActivate()
                .addOnCompleteListener(this) { task ->
                    if (task.isSuccessful) {
                        val updated = task.result
                        Log.d(TAG, "Config params updated: $updated")
                        Toast.makeText(this, "Fetch and activate succeeded",
                                Toast.LENGTH_SHORT).show()
                    } else {
                        Toast.makeText(this, "Fetch failed",
                                Toast.LENGTH_SHORT).show()
                    }
                    displayWelcomeMessage()
                }
        // [END fetch_config_with_callback]
    }

    /**
     * Display a welcome message in all caps if welcome_message_caps is set to true. Otherwise,
     * display a welcome message as fetched from welcome_message.
     */
    // [START display_welcome_message]
    private fun displayWelcomeMessage() {
        // [START get_config_values]
        val welcomeMessage = remoteConfig[WELCOME_MESSAGE_KEY].asString()
        // [END get_config_values]
        binding.welcomeTextView.isAllCaps = remoteConfig[WELCOME_MESSAGE_CAPS_KEY].asBoolean()
        binding.welcomeTextView.text = welcomeMessage
    }

    companion object {

        private const val TAG = "MainActivity"

        // Remote Config keys
        private const val LOADING_PHRASE_CONFIG_KEY = "loading_phrase"
        private const val WELCOME_MESSAGE_KEY = "welcome_message"
        private const val WELCOME_MESSAGE_CAPS_KEY = "welcome_message_caps"
    }
    // [END display_welcome_message]
}


```

### Reference

Below are the reference links:

|No.|Link|
|--|---|
|2.|Read more [here](https://github.com/firebase/quickstart-android/blob/master/config/README.md).|
|3.|Follow code author [here](https://github.com/quickstart-android).|
