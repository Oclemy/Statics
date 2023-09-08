# Firebase InApp Messaging Quickstart

This quickstart demonstrates basic usage of Firebase In-App Messaging.

### Getting Started

- Follow the instructions to add Firebase to your Android app.  [This link](https://firebase.google.com/docs/android/setup) explains how to do so.
- In the Firebase console, navigate to the In-App Messaging section.
- In the Conversion events tab choose the `ecommerce_purchase` conversion event.
- Press the Trigger button to fire the event.

### Result

If you successfully trigger a message, you should see something like this:
![Firebase InApp Messaging Tutorial](https://github.com/firebase/quickstart-android/raw/master/inappmessaging/docs/result.png)

Awaiting below is a full android sample to demonstrate Firebase InApp Messaging concept.

#### Step 1. Dependencies

We need to add some dependencies in our `app/build.gradle` file as shown below:

**(a). `build.gradle`**

> Our app-level `build.gradle`.

We Prepare our dependencies as shown below. You may use later versions.

We will enable view binding by setting the `viewBinding` property to true.

We then declare our app dependencies under the `dependencies` closure. We will need the following 5 dependencies:

1. Our `Constraintlayout` library.
2. Our `Multidex` library.
3. Our `Firebase-bom` library.
4. Our `Com.google.firebase` library.
5. Our `Firebase-installations-ktx` library.

Here is our full `app/build.gradle`:

```groovy
plugins {
    id 'com.android.application'
    id 'kotlin-android'
    id 'com.google.gms.google-services'
}

android {
    compileSdkVersion 33
    defaultConfig {
        applicationId "com.google.firebase.fiamquickstart"
        minSdkVersion 19
        targetSdkVersion 33
        versionCode 1
        versionName "1.0"

        multiDexEnabled true
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
    lint {
        warning 'InvalidPackage'
    }
}

dependencies {
    implementation project(":internal:lintchecks")
    implementation project(":internal:chooserx")

    implementation 'com.google.android.material:material:1.6.1'
    implementation 'androidx.constraintlayout:constraintlayout:2.1.4'
    implementation 'androidx.multidex:multidex:2.0.1'

    // Import the Firebase BoM (see: https://firebase.google.com/docs/android/learn-more#bom)
    implementation platform('com.google.firebase:firebase-bom:30.5.0')

    // FIAM (Java)
    implementation 'com.google.firebase:firebase-inappmessaging-display'

    // FIAM (Kotlin)
    implementation 'com.google.firebase:firebase-inappmessaging-display-ktx'

    // The Firebase SDK for Google Analytics is required to use In-App Messaging
    // Analytics (Java)
    implementation 'com.google.firebase:firebase-analytics'

    // Analytics (Kotlin)
    implementation 'com.google.firebase:firebase-analytics-ktx'

    implementation 'com.google.firebase:firebase-installations-ktx:17.0.3'

    androidTestImplementation 'androidx.test:runner:1.4.0'
    androidTestImplementation 'androidx.test.espresso:espresso-core:3.4.0'
    androidTestImplementation 'androidx.test:rules:1.4.0'
    androidTestImplementation 'androidx.test.uiautomator:uiautomator:2.2.0'
}

```

#### Step 2. Our Android Manifest

We will need to look at our `AndroidManifest.xml`.

**(a). `AndroidManifest.xml`**

> Our `AndroidManifest` file.

```xml
<?xml version="1.0" encoding="utf-8"?>
<manifest xmlns:android="http://schemas.android.com/apk/res/android"
    package="com.google.firebase.fiamquickstart">

    <application
        android:name="androidx.multidex.MultiDexApplication"
        android:allowBackup="true"
        android:icon="@mipmap/ic_launcher"
        android:label="@string/app_name"
        android:supportsRtl="true"
        android:theme="@style/AppTheme">

        <activity
            android:name="com.google.firebase.fiamquickstart.java.MainActivity"
            android:label="@string/app_name"
            android:theme="@style/AppTheme">
        </activity>

        <activity
            android:name="com.google.firebase.fiamquickstart.kotlin.KotlinMainActivity"
            android:label="@string/app_name"
            android:theme="@style/AppTheme">
        </activity>

        <activity android:name="com.google.firebase.fiamquickstart.EntryChoiceActivity"
            android:exported="true">
            <intent-filter>
                <action android:name="android.intent.action.MAIN" />

                <category android:name="android.intent.category.LAUNCHER" />
            </intent-filter>
        </activity>

    </application>

</manifest>

```
#### Step 4. Design Layouts

In Android we design our UI interfaces using XML. So let's create the following layouts:

**(a). `activity_main.xml`**

> Our `activity_main` layout.

Inside your `/res/layout/` directory create an xml layout file named `activity_main.xml` and add the following elements:

1. `androidx.constraintlayout.widget.ConstraintLayout`
2. `ImageView`
3. `TextView`
4. `Button`

```xml
<?xml version="1.0" encoding="utf-8"?>
<androidx.constraintlayout.widget.ConstraintLayout xmlns:android="http://schemas.android.com/apk/res/android"
    xmlns:app="http://schemas.android.com/apk/res-auto"
    xmlns:tools="http://schemas.android.com/tools"
    android:layout_width="match_parent"
    android:layout_height="match_parent"
    android:padding="16dp"
    tools:context=".MainActivity">

    <ImageView
        android:id="@+id/imageView"
        android:layout_width="0dp"
        android:layout_height="wrap_content"
        android:layout_marginEnd="8dp"
        android:layout_marginLeft="8dp"
        android:layout_marginRight="8dp"
        android:layout_marginStart="8dp"
        android:layout_marginTop="8dp"
        android:src="@drawable/firebase_lockup_400"
        app:layout_constraintEnd_toEndOf="parent"
        app:layout_constraintStart_toStartOf="parent"
        app:layout_constraintTop_toTopOf="parent" />

    <TextView
        android:id="@+id/textView"
        android:layout_width="0dp"
        android:layout_height="wrap_content"
        android:layout_marginLeft="8dp"
        android:layout_marginRight="8dp"
        android:layout_marginTop="8dp"
        android:text="@string/textview_text"
        android:textSize="18sp"
        app:layout_constraintLeft_toLeftOf="parent"
        app:layout_constraintRight_toRightOf="parent"
        app:layout_constraintTop_toBottomOf="@+id/imageView" />

    <TextView
        android:id="@+id/textView2"
        android:layout_width="0dp"
        android:layout_height="wrap_content"
        android:layout_marginEnd="8dp"
        android:layout_marginLeft="8dp"
        android:layout_marginRight="8dp"
        android:layout_marginStart="8dp"
        android:layout_marginTop="16dp"
        android:text="@string/warning_fresh_install"
        android:textSize="18sp"
        app:layout_constraintEnd_toEndOf="parent"
        app:layout_constraintStart_toStartOf="parent"
        app:layout_constraintTop_toBottomOf="@+id/textView" />

    <TextView
        android:id="@+id/installationIdText"
        android:layout_width="0dp"
        android:layout_height="wrap_content"
        android:layout_marginEnd="8dp"
        android:layout_marginLeft="8dp"
        android:layout_marginRight="8dp"
        android:layout_marginStart="8dp"
        android:layout_marginTop="16dp"
        android:text="@string/warning_fresh_install"
        android:textSize="18sp"
        app:layout_constraintEnd_toEndOf="parent"
        app:layout_constraintStart_toStartOf="parent"
        app:layout_constraintTop_toBottomOf="@+id/textView2"
        tools:text="Device Instance ID: 1234" />

    <Button
        android:id="@+id/eventTriggerButton"
        android:layout_width="wrap_content"
        android:layout_height="wrap_content"
        android:layout_marginBottom="8dp"
        android:layout_marginEnd="8dp"
        android:layout_marginStart="8dp"
        android:layout_marginTop="8dp"
        android:text="@string/button_text"
        android:theme="@style/ThemeOverlay.MyDarkButton"
        app:layout_constraintBottom_toBottomOf="parent"
        app:layout_constraintEnd_toEndOf="parent"
        app:layout_constraintStart_toStartOf="parent"
        app:layout_constraintTop_toBottomOf="@+id/textView2" />

</androidx.constraintlayout.widget.ConstraintLayout>

```
#### Step 4. Write Code

Finally we need to write our code as follows:


**(a). `EntryChoiceActivity.kt`**

> Our `EntryChoiceActivity` class.

Create a Kotlin file named `EntryChoiceActivity.kt` and override the following function:

1. `getChoices(): List<Choice> `.

Here is the full code:

```kotlin
package replace_with_your_package_name

import android.content.Intent
import com.firebase.example.internal.BaseEntryChoiceActivity
import com.firebase.example.internal.Choice
import com.google.firebase.fiamquickstart.java.MainActivity
import com.google.firebase.fiamquickstart.kotlin.KotlinMainActivity

class EntryChoiceActivity : BaseEntryChoiceActivity() {

    override fun getChoices(): List<Choice> {
        return listOf(
                Choice(
                        "Java",
                        "Run the Firebase In App Messaging quickstart written in Java.",
                        Intent(this, MainActivity::class.java)),
                Choice(
                        "Kotlin",
                        "Run the Firebase In App Messaging quickstart written in Kotlin.",
                        Intent(this, KotlinMainActivity::class.java))
        )
    }
}


```

**(b). `KotlinMainActivity.kt`**

> Our `KotlinMainActivity` class.

Create a Kotlin file named `KotlinMainActivity.kt`.

We will then add imports from android SDK and other packages. Here are some of the imports we will use in this class:

1. `Bundle` from the `android.os` package.
2. `Log` from the `android.util` package.
3. `AppCompatActivity` from the `androidx.appcompat.app` package.

Next create a class that derives from `AppCompatActivity` and add its contents as follows:

We will be overriding the following functions: 

1. `onCreate(savedInstanceState: Bundle?) `.

Here is the full code:

```kotlin
package replace_with_your_package_name

import android.os.Bundle
import android.util.Log
import androidx.appcompat.app.AppCompatActivity
import com.google.android.material.snackbar.Snackbar
import com.google.firebase.analytics.FirebaseAnalytics
import com.google.firebase.analytics.ktx.analytics
import com.google.firebase.fiamquickstart.R
import com.google.firebase.fiamquickstart.databinding.ActivityMainBinding
import com.google.firebase.inappmessaging.FirebaseInAppMessaging
import com.google.firebase.inappmessaging.ktx.inAppMessaging
import com.google.firebase.installations.ktx.installations
import com.google.firebase.ktx.Firebase

class KotlinMainActivity : AppCompatActivity() {

    private lateinit var firebaseAnalytics: FirebaseAnalytics
    private lateinit var firebaseIam: FirebaseInAppMessaging

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        val binding = ActivityMainBinding.inflate(layoutInflater)
        setContentView(binding.root)

        firebaseAnalytics = Firebase.analytics
        firebaseIam = Firebase.inAppMessaging

        firebaseIam.isAutomaticDataCollectionEnabled = true
        firebaseIam.setMessagesSuppressed(false)

        binding.eventTriggerButton.setOnClickListener { view ->
            firebaseAnalytics.logEvent("engagement_party", Bundle())
            Snackbar.make(view, "'engagement_party' event triggered!", Snackbar.LENGTH_LONG)
                    .setAction("Action", null)
                    .show()
        }

        // Get and display/log the installation id
        Firebase.installations.getId()
                .addOnSuccessListener { id ->
                    binding.installationIdText.text = getString(R.string.installation_id_fmt, id)
                    Log.d(TAG, "Installation ID: $id")
                }
    }

    companion object {

        private const val TAG = "FIAM-Quickstart"
    }
}


```

### Reference

Below are the reference links:

|No.|Link|
|--|---|
|2.|Read more [here](https://github.com/firebase/quickstart-android/blob/master/inappmessaging/README.md).|
|3.|Follow code author [here](https://github.com/quickstart-android).|
