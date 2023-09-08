# Firebase Crash Reporting

This is a Firebase Crash Reporting quickstart example. Here is the screenshot of what is created:

![Firebase Crash Reporting Tutorial](https://github.com/firebase/quickstart-android/raw/master/crash/app/src/screen.png)

#### Step 1. Dependencies

We need to add some dependencies in our `app/build.gradle` file as shown below:

**(a). `build.gradle`**

> Our app-level `build.gradle`.

We Prepare our dependencies as shown below. You may use later versions.

We will enable view binding by setting the `viewBinding` property to true.

We then declare our app dependencies under the `dependencies` closure. We will need the following 8 dependencies:

1. Our `Activity-ktx` library.
2. Our `Firebase-bom` library.
3. Our `Com.google.firebase` library.
4. Our `Com.google.firebase` library.
5. Our `Play-services-base` library.

Here is our full `app/build.gradle`:

```groovy
plugins {
    id 'com.android.application'
    id 'kotlin-android'
    id 'com.google.gms.google-services'
    id 'com.google.firebase.crashlytics'
}

check.dependsOn 'assembleDebugAndroidTest'

android {
    compileSdkVersion 33

    defaultConfig {
        applicationId "com.google.samples.quickstart.crash"
        minSdkVersion 19
        targetSdkVersion 33
        versionCode 1
        versionName "1.0"
        testInstrumentationRunner 'androidx.test.runner.AndroidJUnitRunner'
    }

    buildTypes {
        release {
            minifyEnabled true
            proguardFiles getDefaultProguardFile('proguard-android.txt'), 'proguard-rules.pro'
        }
        debug {
            minifyEnabled true
            testProguardFiles getDefaultProguardFile('proguard-android.txt'), 'test-proguard-rules.pro'
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
    implementation "androidx.activity:activity-ktx:1.6.0"

    // Import the Firebase BoM (see: https://firebase.google.com/docs/android/learn-more#bom)
    implementation platform('com.google.firebase:firebase-bom:30.5.0')

    // Firebase Crashlytics (Kotlin)
    implementation 'com.google.firebase:firebase-crashlytics-ktx'

    // For an optimal experience using Crashlytics, add the Firebase SDK
    // for Google Analytics. This is recommended, but not required.
    implementation 'com.google.firebase:firebase-analytics'

    // For use in the CustomKeySamples -- for testing Google Api Availability.
    implementation 'com.google.android.gms:play-services-base:18.1.0'

    testImplementation 'junit:junit:4.13.2'
    androidTestImplementation 'androidx.test.espresso:espresso-core:3.4.0'
    androidTestImplementation 'androidx.test:rules:1.4.0'
    androidTestImplementation 'androidx.test:runner:1.4.0'
    androidTestImplementation 'androidx.test.ext:junit:1.1.3'
}

```
#### Step 2. Create Firebase App

You will need to create or setup a Firebase app first. [This link](https://firebase.google.com/docs/android/setup) explains how to do so.

#### Step 3. Our Android Manifest

We will need to look at our `AndroidManifest.xml`.

**(a). `AndroidManifest.xml`**

> Our `AndroidManifest` file.

Here we will add the following permission:

1. Our `ACCESS_NETWORK_STATE` permission.

Here is the full Android Manifest file:

```xml
<?xml version="1.0" encoding="utf-8"?>
<manifest xmlns:android="http://schemas.android.com/apk/res/android"
    package="com.google.samples.quickstart.crash">

    <uses-permission android:name="android.permission.ACCESS_NETWORK_STATE" />
    <application
        android:allowBackup="true"
        android:icon="@mipmap/ic_launcher"
        android:label="@string/app_name"
        android:supportsRtl="true"
        android:theme="@style/AppTheme">
        <activity android:name=".EntryChoiceActivity"
            android:exported="true">
            <intent-filter>
                <action android:name="android.intent.action.MAIN" />

                <category android:name="android.intent.category.LAUNCHER" />
            </intent-filter>
        </activity>
        <activity android:name=".java.MainActivity" />
        <activity android:name=".kotlin.MainActivity" />

    </application>

</manifest>

```
#### Step 4. Design Layouts

**(a). `activity_main.xml`**

> Our `activity_main` layout.

Inside your `/res/layout/` directory create an xml layout file named `activity_main.xml` and add the following widgets:

1. [`androidx.constraintlayout.widget.ConstraintLayout`](https://android.camposha.info/en/constraintlayout)
2. [`ImageView`](https://android.camposha.info/en/)
3. [`Button`](https://android.camposha.info/en/button)
4. [`CheckBox`](https://android.camposha.info/en/checkbox)

```xml
<?xml version="1.0" encoding="utf-8"?>

<androidx.constraintlayout.widget.ConstraintLayout xmlns:android="http://schemas.android.com/apk/res/android"
    xmlns:app="http://schemas.android.com/apk/res-auto"
    xmlns:tools="http://schemas.android.com/tools"
    android:layout_width="match_parent"
    android:layout_height="match_parent"
    android:paddingBottom="@dimen/activity_vertical_margin"
    android:paddingLeft="@dimen/activity_horizontal_margin"
    android:paddingRight="@dimen/activity_horizontal_margin"
    android:paddingTop="@dimen/activity_vertical_margin"
    tools:context="com.google.samples.quickstart.crash.java.MainActivity">

    <ImageView
        android:id="@+id/icon"
        android:layout_width="wrap_content"
        android:layout_height="wrap_content"
        android:src="@drawable/firebase_lockup_400"
        app:layout_constraintEnd_toEndOf="parent"
        app:layout_constraintStart_toStartOf="parent"
        app:layout_constraintTop_toTopOf="parent" />

    <Button
        android:id="@+id/crashButton"
        android:layout_width="wrap_content"
        android:layout_height="wrap_content"
        android:text="@string/crash_button_label"
        android:layout_marginTop="16dp"
        app:layout_constraintEnd_toEndOf="@+id/icon"
        app:layout_constraintStart_toStartOf="@+id/icon"
        app:layout_constraintTop_toBottomOf="@+id/icon" />

    <CheckBox
        android:id="@+id/catchCrashCheckBox"
        android:layout_width="wrap_content"
        android:layout_height="wrap_content"
        android:text="@string/catch_crash_checkbox_label"
        android:layout_marginTop="10dp"
        app:layout_constraintEnd_toEndOf="@+id/crashButton"
        app:layout_constraintStart_toStartOf="@+id/crashButton"
        app:layout_constraintTop_toBottomOf="@+id/crashButton" />
</androidx.constraintlayout.widget.ConstraintLayout>

```
#### Step 5. Write Code

Finally we need to write our code as follows:


**(a). `EntryChoiceActivity.kt`**

> Our `EntryChoiceActivity` class.

Create a Kotlin file named `EntryChoiceActivity.kt` and  create a class that derives from `BaseEntryChoiceActivity` and add its contents as follows:

We will be overriding the following functions: 

1. `getChoices(): List<Choice> `.

Here is the full code:

```kotlin
package replace_with_your_package_name

import android.content.Intent
import com.firebase.example.internal.BaseEntryChoiceActivity
import com.firebase.example.internal.Choice
import com.google.samples.quickstart.crash.java.MainActivity

class EntryChoiceActivity : BaseEntryChoiceActivity() {

    override fun getChoices(): List<Choice> {
        return listOf(
                Choice(
                        "Java",
                        "Run the Firebase Crash quickstart written in Java.",
                        Intent(this, MainActivity::class.java)),
                Choice(
                        "Kotlin",
                        "Run the Firebase Crash quickstart written in Kotlin.",
                        Intent(this, com.google.samples.quickstart.crash.kotlin.MainActivity::class.java))
        )
    }
}


```

**(b). `CustomKeySamples.kt`**

> Our `CustomKeySamples` class.

Create a Kotlin file named `CustomKeySamples.kt`.

We will then add imports from android SDK and other packages. Here are some of the imports we will use in this class:

1. `Manifest` from the `android` package.
2. `SuppressLint` from the `android.annotation` package.
3. `Context` from the `android.content` package.
4. `PackageManager` from the `android.content.pm` package.
5. `ConnectivityManager` from the `android.net` package.
6. `NetworkCallback` from the `android.net.ConnectivityManager` package.
7. `Network` from the `android.net` package.
8. `NetworkCapabilities` from the `android.net` package.
9. `Build` from the `android.os` package.
10. `TelephonyManager` from the `android.telephony` package.
11. `View` from the `android.view` package.
12. `ContextCompat` from the `androidx.core.content` package.
13. `synchronized` from the `kotlinx.coroutines.internal` package.

We will be overriding the following functions: 

1. `onCapabilitiesChanged(network: Network, networkCapabilities: NetworkCapabilities) `.

We will be creating the following methods:

1. `setSampleCustomKeys() `.
2. `updateAndTrackNetworkState() `.
3. `stopTrackingNetworkState() `.
4. `updateNetworkCapabilityCustomKeys(parameter)` - Our function will take a `NetworkCapabilities` object as a parameter.
5. `addPhoneStateRequiredNetworkKeys() `.
6. `focusListener(view: View, hasFocus: Boolean) `.

**(a). Our `updateAndTrackNetworkState()` function**

Write the `updateAndTrackNetworkState()` function as follows:

```kotlin
    fun updateAndTrackNetworkState() {
        if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.N) {
            val connectivityManager = context.getSystemService(Context.CONNECTIVITY_SERVICE) as ConnectivityManager
            connectivityManager
                    .getNetworkCapabilities(connectivityManager.activeNetwork)
                    ?.let { updateNetworkCapabilityCustomKeys(it) }

            kotlin.synchronized(this) {
                if (callback == null) {
                    // Set up a callback to match our best-practices around custom keys being up-to-date
                    val newCallback: NetworkCallback = object : NetworkCallback() {
                        override fun onCapabilitiesChanged(network: Network, networkCapabilities: NetworkCapabilities) {
                            updateNetworkCapabilityCustomKeys(networkCapabilities)
                        }
                    }
                    callback = newCallback
                    connectivityManager.registerDefaultNetworkCallback(newCallback)
                }
            }
        }
    }
```

**(b). Our `focusListener()` function**

Write the `focusListener()` function as follows:

```kotlin
    fun focusListener(view: View, hasFocus: Boolean) {
        if (hasFocus) {
            Firebase.crashlytics.setCustomKey("view_focus", view.id)
        }
    }
```

**(c). Our `updateNetworkCapabilityCustomKeys()` function**

Write the `updateNetworkCapabilityCustomKeys()` function as follows:

```kotlin
    private fun updateNetworkCapabilityCustomKeys(networkCapabilities: NetworkCapabilities) {
        if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.LOLLIPOP) {
            Firebase.crashlytics.setCustomKeys {
                key("Network Bandwidth", networkCapabilities.linkDownstreamBandwidthKbps)
                key("Network Upstream", networkCapabilities.linkUpstreamBandwidthKbps)
                key("Network Metered", networkCapabilities
                        .hasCapability(NetworkCapabilities.NET_CAPABILITY_NOT_METERED))
                // This key is long and not as easy to filter by.
                key("Network Capabilities", networkCapabilities.toString())
            }
        }
    }
```

**(d). Our `stopTrackingNetworkState()` function**

Write the `stopTrackingNetworkState()` function as follows:

```kotlin
    fun stopTrackingNetworkState() {
        val connectivityManager = context
                .getSystemService(Context.CONNECTIVITY_SERVICE) as ConnectivityManager
        val oldCallback = callback
        kotlin.synchronized(this) {
            if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.N && oldCallback != null) {
                connectivityManager.unregisterNetworkCallback(oldCallback)
                callback = null
            }
        }
    }
```

**(e). Our `setSampleCustomKeys()` function**

Write the `setSampleCustomKeys()` function as follows:

```kotlin
    fun setSampleCustomKeys() {
        Firebase.crashlytics.setCustomKeys {
            key("Locale", locale)
            key("Screen Density", density)
            key("Google Play Services Availability", googlePlayServicesAvailability)
            key("Os Version", osVersion)
            key("Install Source", installSource)
            key("Preferred ABI", preferredAbi)
        }
    }
```

**(f). Our `addPhoneStateRequiredNetworkKeys()` function**

Write the `addPhoneStateRequiredNetworkKeys()` function as follows:

```kotlin
    fun addPhoneStateRequiredNetworkKeys() {
        val telephonyManager = context
                .getSystemService(Context.TELEPHONY_SERVICE) as TelephonyManager
        if (ContextCompat.checkSelfPermission(context, Manifest.permission.READ_PHONE_STATE)
                != PackageManager.PERMISSION_GRANTED) {
            return
        }

        val networkType: Int = if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.N) {
            telephonyManager.dataNetworkType
        } else {
            telephonyManager.networkType
        }

        Firebase.crashlytics.setCustomKeys {
            key("Network Type", networkType)
            key("Sim Operator", telephonyManager.simOperator)
        }
    }
```


Here is the full code:

```kotlin
package replace_with_your_package_name

import android.Manifest
import android.annotation.SuppressLint
import android.content.Context
import android.content.pm.PackageManager
import android.net.ConnectivityManager
import android.net.ConnectivityManager.NetworkCallback
import android.net.Network
import android.net.NetworkCapabilities
import android.os.Build
import android.telephony.TelephonyManager
import android.view.View
import androidx.core.content.ContextCompat
import com.google.android.gms.common.GoogleApiAvailability
import com.google.firebase.crashlytics.ktx.crashlytics
import com.google.firebase.crashlytics.ktx.setCustomKeys
import com.google.firebase.ktx.Firebase
import kotlinx.coroutines.internal.synchronized

/**
 * The following are samples of custom keys that may be useful to record via Crashlytics prior to a Crash.
 *
 * These utility methods are not meant to be comprehensive, but they are illustrative of the types of things you
 * could track using custom keys in Crashlytics.
 */
class CustomKeySamples(private val context: Context, private var callback: NetworkCallback? = null) {

    /**
     * Set a subset of custom keys simultaneously.
     */
    fun setSampleCustomKeys() {
        Firebase.crashlytics.setCustomKeys {
            key("Locale", locale)
            key("Screen Density", density)
            key("Google Play Services Availability", googlePlayServicesAvailability)
            key("Os Version", osVersion)
            key("Install Source", installSource)
            key("Preferred ABI", preferredAbi)
        }
    }

    /**
     * Update network state and add a hook to update network state going forward.
     *
     * Note: This code is executed above API level N.
     */
    fun updateAndTrackNetworkState() {
        if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.N) {
            val connectivityManager = context.getSystemService(Context.CONNECTIVITY_SERVICE) as ConnectivityManager
            connectivityManager
                    .getNetworkCapabilities(connectivityManager.activeNetwork)
                    ?.let { updateNetworkCapabilityCustomKeys(it) }

            kotlin.synchronized(this) {
                if (callback == null) {
                    // Set up a callback to match our best-practices around custom keys being up-to-date
                    val newCallback: NetworkCallback = object : NetworkCallback() {
                        override fun onCapabilitiesChanged(network: Network, networkCapabilities: NetworkCapabilities) {
                            updateNetworkCapabilityCustomKeys(networkCapabilities)
                        }
                    }
                    callback = newCallback
                    connectivityManager.registerDefaultNetworkCallback(newCallback)
                }
            }
        }
    }

    /**
     * Remove the handler for the network state.
     *
     * Note: This code is executed above API level N.
     */
    fun stopTrackingNetworkState() {
        val connectivityManager = context
                .getSystemService(Context.CONNECTIVITY_SERVICE) as ConnectivityManager
        val oldCallback = callback
        kotlin.synchronized(this) {
            if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.N && oldCallback != null) {
                connectivityManager.unregisterNetworkCallback(oldCallback)
                callback = null
            }
        }
    }

    private fun updateNetworkCapabilityCustomKeys(networkCapabilities: NetworkCapabilities) {
        if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.LOLLIPOP) {
            Firebase.crashlytics.setCustomKeys {
                key("Network Bandwidth", networkCapabilities.linkDownstreamBandwidthKbps)
                key("Network Upstream", networkCapabilities.linkUpstreamBandwidthKbps)
                key("Network Metered", networkCapabilities
                        .hasCapability(NetworkCapabilities.NET_CAPABILITY_NOT_METERED))
                // This key is long and not as easy to filter by.
                key("Network Capabilities", networkCapabilities.toString())
            }
        }
    }

    /**
     * @see {@link com.google.samples.quickstart.crash.java.CustomKeySamples.updateAndTrackNetworkState}, which does not require READ_PHONE_STATE
     * and returns more useful information about bandwidth, metering, and capabilities.
     *
     * Supressed deprecation warning because that code path is only used below API Level N.
     *
     * Supressed Lint warning because READ_PHONE_STATE is a high priority permission and
     * we don't want to enforce needing it for this code example.
     */
    @Suppress("DEPRECATION")
    @Deprecated("Prefer updateAndTrackNetworkState, which does not require READ_PHONE_STATE")
    @SuppressLint("MissingPermission")
    fun addPhoneStateRequiredNetworkKeys() {
        val telephonyManager = context
                .getSystemService(Context.TELEPHONY_SERVICE) as TelephonyManager
        if (ContextCompat.checkSelfPermission(context, Manifest.permission.READ_PHONE_STATE)
                != PackageManager.PERMISSION_GRANTED) {
            return
        }

        val networkType: Int = if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.N) {
            telephonyManager.dataNetworkType
        } else {
            telephonyManager.networkType
        }

        Firebase.crashlytics.setCustomKeys {
            key("Network Type", networkType)
            key("Sim Operator", telephonyManager.simOperator)
        }
    }

    /**
     * Retrieve the locale information for the app.
     *
     * Supressed deprecation warning because that code path is only used below API Level N.
     */
    @Suppress("DEPRECATION")
    val locale: String
        get() = if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.N) {
            context
                    .resources
                    .configuration
                    .locales[0].toString()
        } else {
            context
                    .resources
                    .configuration.locale.toString()
        }

    /**
     * Retrieve the screen density information for the app.
     */
    val density: Float
        get() = context
                .resources
                .displayMetrics.density

    /**
     * Retrieve the locale information for the app.
     */
    val googlePlayServicesAvailability: String
        get() = if (GoogleApiAvailability
                        .getInstance()
                        .isGooglePlayServicesAvailable(context) == 0) "Unavailable" else "Available"

    /**
     * Return the underlying kernel version of the Android device.
     */
    val osVersion: String
        get() = System.getProperty("os.version") ?: "Unknown"

    /**
     * Retrieve the preferred ABI of the device. Some devices can support
     * multiple ABIs and the first one returned in the preferred one.
     *
     * Supressed deprecation warning because that code path is only used below Lollipop.
     */
    @Suppress("DEPRECATION")
    val preferredAbi: String
        get() = if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.LOLLIPOP) {
            Build.SUPPORTED_ABIS[0]
        } else Build.CPU_ABI

    /**
     * Retrieve the install source and return it as a string.
     *
     * Supressed deprecation warning because that code path is only used below API level R.
     */
    @Suppress("DEPRECATION")
    val installSource: String
        get() = if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.R) {
            try {
                val info = context
                        .packageManager
                        .getInstallSourceInfo(context.packageName)

                // This returns all three of the install source, originating source, and initiating
                // source.
                "Originating: ${info.originatingPackageName ?: "None"}, " +
                        "Installing: ${info.installingPackageName ?: "None"}, " +
                        "Initiating: ${info.initiatingPackageName ?: "None"}"
            } catch (e: PackageManager.NameNotFoundException) {
                "Unknown"
            }
        } else {
            context.packageManager.getInstallerPackageName(context.packageName) ?: "None"
        }

    /**
     * Add a focus listener that updates a custom key when this view gains the focus.
     */
    fun focusListener(view: View, hasFocus: Boolean) {
        if (hasFocus) {
            Firebase.crashlytics.setCustomKey("view_focus", view.id)
        }
    }
}


```

**(c). `MainActivity.kt`**

> Our `MainActivity` class.

Create a Kotlin file named `MainActivity.kt`.

We will then add imports from android SDK and other packages. Here are some of the imports we will use in this class:

1. `Bundle` from the `android.os` package.
2. `AppCompatActivity` from the `androidx.appcompat.app` package.

Next create a class that derives from `AppCompatActivity` and add its contents as follows:

We will be overriding the following functions: 

1. `onCreate(savedInstanceState: Bundle?) `.
2. `onDestroy() `.

Here is the full code:

```kotlin
package replace_with_your_package_name

import android.os.Bundle
import androidx.appcompat.app.AppCompatActivity
import com.google.firebase.crashlytics.FirebaseCrashlytics
import com.google.firebase.crashlytics.ktx.crashlytics
import com.google.firebase.crashlytics.ktx.setCustomKeys
import com.google.firebase.ktx.Firebase
import com.google.samples.quickstart.crash.databinding.ActivityMainBinding

/**
 * This Activity shows the different ways of reporting application crashes.
 * - Report non-fatal exceptions that are caught by your app.
 * - Automatically Report uncaught crashes.
 *
 * It also shows how to add log messages to crash reports using log().
 *
 * Check https://console.firebase.google.com to view and analyze your crash reports.
 *
 * Check https://firebase.google.com/docs/crashlytics for more information on Firebase Crashlytics.
 */
class MainActivity : AppCompatActivity() {

    private lateinit var crashlytics: FirebaseCrashlytics
    private lateinit var customKeySamples: CustomKeySamples

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        val binding = ActivityMainBinding.inflate(layoutInflater)
        setContentView(binding.root)

        customKeySamples = CustomKeySamples(applicationContext)
        customKeySamples.setSampleCustomKeys()
        customKeySamples.updateAndTrackNetworkState()

        crashlytics = Firebase.crashlytics

        // Log the onCreate event, this will also be printed in logcat
        crashlytics.log("onCreate")

        // Add some custom values and identifiers to be included in crash reports
        crashlytics.setCustomKeys {
            key("MeaningOfLife", 42)
            key("LastUIAction", "Test value")
        }
        crashlytics.setUserId("123456789")

        // Report a non-fatal exception, for demonstration purposes
        crashlytics.recordException(Exception("Non-fatal exception: something went wrong!"))

        // Button that causes NullPointerException to be thrown.
        binding.crashButton.setOnClickListener {
            // Log that crash button was clicked.
            crashlytics.log("Crash button clicked.")

            // If catchCrashCheckBox is checked catch the exception and report it using
            // logException(), Otherwise throw the exception and let Crashlytics automatically
            // report the crash.
            if (binding.catchCrashCheckBox.isChecked) {
                try {
                    throw NullPointerException()
                } catch (ex: NullPointerException) {
                    // [START crashlytics_log_and_report]
                    crashlytics.log("NPE caught!")
                    crashlytics.recordException(ex)
                    // [END crashlytics_log_and_report]
                }
            } else {
                throw NullPointerException()
            }
        }

        // Log that the Activity was created.
        // [START crashlytics_log_event]
        crashlytics.log("Activity created")
        // [END crashlytics_log_event]
    }

    override fun onDestroy() {
        super.onDestroy()
        customKeySamples.stopTrackingNetworkState()
    }

    companion object {
        private const val TAG = "MainActivity"
    }
}


```

### Reference

Below are the reference links:

|No.|Link|
|--|---|
|2.|Read more [here](https://github.com/firebase/quickstart-android/blob/master/crash/README.md).|
|3.|Follow code author [here](https://github.com/quickstart-android).|
