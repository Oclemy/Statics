# Firebase Crashlytics Examples - Kotlin and Java


The Firebase suite has a module that allows you get clear and actionable insights and reports into the issues your app may be getting into. This is powerful especially if you are building a production app that is critical to users. Every second wasted digging into log files probably results to users disatisfied or revenue lost.

Thus `Firebase Crashlytics`, a lightweight, realtime crash reporter that helps you track, prioritize, and fix stability issues that erode your app quality is fundamental. It saves you troubleshooting time by intelligently grouping crashes and highlighting the circumstances that lead up to them.



You can find out if a particular crash is impacting a lot of users. You can get alerts when an issue suddenly increases in severity and even pinpoint which lines of code are causing crashes.

Here are it's key features:
6
1. It curates crash reports and provides contextual information while highlighting the severity and prevalence of the crashes.
2. Crashlytics offers Crash Insights, helpful tips that highlight common stability problems and provide resources that make them easier to troubleshoot, triage, and resolve.
3. Integrated with Analytics
4. Realtime alerts

Let's now look at how to setup and use Crashlytics.

### Step 1: Add Firebase to Your Project

Because Crashlytics is one of the products of firebase suite of products, you need to add firebase to your project. We covered in detail how to do that [here](https://camposha.info/android-examples/add-firebase-to-android/).

### Step 2: Enable Crashlytics in the Firebase console

- Go to the [Crashlytics dashboard](https://console.firebase.google.com/project/_/crashlytics) in the Firebase console.
    
- Make sure your app is selected from the dropdown next to **Crashlytics** at the top of the page.
    
- Click **Enable Crashlytics**.
    

### Step 3: Add the Firebase Crashlytics plugin to your app

You do this in the `projects/build.gradle` file. Check the below code to see how:

```groovy
buildscript {
    repositories {
        // Check that you have Google's Maven repository (if not, add it).
        google()
    }

    dependencies {
        // ...

        // Check that you have the Google services Gradle plugin v4.3.2 or later
        // (if not, add it).
        classpath 'com.google.gms:google-services:4.3.10'

        // Add the Crashlytics Gradle plugin
        classpath 'com.google.firebase:firebase-crashlytics-gradle:2.7.1'
    }
}

allprojects {
    repositories {
        // Check that you have Google's Maven repository (if not, add it).
        google()
    }
}
```

After that come over to the `app/build.gradle` and apply the crashlytics plugin, at the top of that file:

```groovy
apply plugin: 'com.android.application'
apply plugin: 'com.google.gms.google-services' // Google services Gradle plugin

// Apply the Crashlytics Gradle plugin
apply plugin: 'com.google.firebase.crashlytics'
```

### Step 4: Add Dependencies

You now need to add the Firebase Crashlytics SDK to your app. You do this inside the `app/build.gradle` file under the `dependencies` closure:

For a Kotlin Project:

```groovy
dependencies {
    // Import the BoM for the Firebase platform
    implementation platform('com.google.firebase:firebase-bom:28.4.1')

    // Declare the dependencies for the Crashlytics and Analytics libraries
    // When using the BoM, you don't specify versions in Firebase library dependencies
    implementation 'com.google.firebase:firebase-crashlytics-ktx'
    implementation 'com.google.firebase:firebase-analytics-ktx'
}
```

For a Java Project:

```groovy
dependencies {
    // Import the BoM for the Firebase platform
    implementation platform('com.google.firebase:firebase-bom:28.4.1')

    // Declare the dependencies for the Crashlytics and Analytics libraries
    // When using the BoM, you don't specify versions in Firebase library dependencies
    implementation 'com.google.firebase:firebase-crashlytics'
    implementation 'com.google.firebase:firebase-analytics'
}
```

### Step 5: Force a test

Yes, you need to force a test to finish setting up `Crashlytics`. This implies we will intentionally force a crash to see the results in our `Crashlytics` dashboard.

To do this for example, we can add a button to our app, then when clicked we crash the app. Here are code examples:

In Kotlin:

```kotlin
val crashButton = Button(this)
crashButton.text = "Test Crash"
crashButton.setOnClickListener {
   throw RuntimeException("Test Crash") // Force a crash
}

addContentView(crashButton, ViewGroup.LayoutParams(
       ViewGroup.LayoutParams.MATCH_PARENT,
       ViewGroup.LayoutParams.WRAP_CONTENT))
```

And in Java:

```java
Button crashButton = new Button(this);
crashButton.setText("Test Crash");
crashButton.setOnClickListener(new View.OnClickListener() {
   public void onClick(View view) {
       throw new RuntimeException("Test Crash"); // Force a crash
   }
});

addContentView(crashButton, new ViewGroup.LayoutParams(
       ViewGroup.LayoutParams.MATCH_PARENT,
       ViewGroup.LayoutParams.WRAP_CONTENT));
```

Now run the app. Then press the the button, the app will crash. Simply navigate over to the [Crashlytics dashboard](https://console.firebase.google.com/project/_/crashlytics) of the Firebase console to see your test crash.

That's it.

Let's now look at some simple isolated examples.

## Example 1: Firebase Crashlytics Example - Kotlin and Java

This is a simple Firebase crashlytics example. There are two `activities`, one written in Kotlin, the other in Java.

### Step 1: Add Firebase to Your project

Add Firebase to your project as detailed [here](https://camposha.info/android-examples/add-firebase-to-android/).

### Step 2: Add Dependencies

We need to add dependencies to our project. We need dependencies for our Crashlytics. In your `app/build.gradle` add dependencies as follows:

```groovy
dependencies {
    implementation 'androidx.legacy:legacy-support-v4:1.0.0'
    implementation 'androidx.appcompat:appcompat:1.3.1'

    implementation 'com.google.firebase:firebase-crashlytics:18.2.0'
    implementation 'com.google.firebase:firebase-crashlytics-ktx:18.2.0'

    // For an optimal experience using Crashlytics, add the Firebase SDK
    // for Google Analytics. This is recommended, but not required.
    implementation 'com.google.firebase:firebase-analytics:19.0.0'
}
```

### Step 3: Add Internet Permission

To connect to Firebase we need internet permission. Add the following permission in your `AndroidManifest.xml` file:

```xml
  <uses-permission android:name="android.permission.INTERNET"/>
```

### Step 4: Create Layout

We really do not need this layout. We do not even use. We however include it here to show you all the code in the project:

**activity_main.xml**

```xml
<?xml version="1.0" encoding="utf-8"?>
<RelativeLayout
        xmlns:android="http://schemas.android.com/apk/res/android"
        xmlns:tools="http://schemas.android.com/tools"
        android:id="@+id/activity_main"
        android:layout_width="match_parent"
        android:layout_height="match_parent"
        android:paddingLeft="@dimen/activity_horizontal_margin"
        android:paddingRight="@dimen/activity_horizontal_margin"
        android:paddingTop="@dimen/activity_vertical_margin"
        android:paddingBottom="@dimen/activity_vertical_margin"
        tools:context=".MainActivity">

    <TextView
            android:layout_width="wrap_content"
            android:layout_height="wrap_content"
            android:text="Hello World!"/>
</RelativeLayout>
```

### Step 5: Write Code

We will have both Kotlin and Java code. Here is the main `activity` for Kotlin:

**`MainActivity.kt`**

```kotlin
import android.os.Bundle
import android.view.ViewGroup
import android.widget.Button
import androidx.appcompat.app.AppCompatActivity
import com.google.firebase.crashlytics.ktx.crashlytics
import com.google.firebase.crashlytics.ktx.setCustomKeys
import com.google.firebase.ktx.Firebase

class MainActivity : AppCompatActivity() {

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
    }

    fun setKeysBasic() {
        // [START crash_set_keys_basic]
        val crashlytics = Firebase.crashlytics
        crashlytics.setCustomKeys {
            key("my_string_key", "foo") // String value
            key("my_bool_key", true)    // boolean value
            key("my_double_key", 1.0)   // double value
            key("my_float_key", 1.0f)   // float value
            key("my_int_key", 1)        // int value
        }
        // [END crash_set_keys_basic]
    }

    fun resetKey() {
        // [START crash_re_set_key]
        val crashlytics = Firebase.crashlytics
        crashlytics.setCustomKeys {
            key("current_level", 3)
            key("last_UI_action", "logged_in")
        }
        // [END crash_re_set_key]
    }

    fun logReportAndPrint() {
        // [START crash_log_report_and_print]
        Firebase.crashlytics.log("message")
        // [END crash_log_report_and_print]
    }

    fun logReportOnly() {
        // [START crash_log_report_only]
        Firebase.crashlytics.log("message")
        // [END crash_log_report_only]
    }

    fun enableAtRuntime() {
        // [START crash_enable_at_runtime]
        Firebase.crashlytics.setCrashlyticsCollectionEnabled(true)
        // [END crash_enable_at_runtime]
    }

    fun setUserId() {
        // [START crash_set_user_id]
        Firebase.crashlytics.setUserId("user123456789")
        // [END crash_set_user_id]
    }

    @Throws(Exception::class)
    fun methodThatThrows() {
        throw Exception()
    }

    fun logCaughtEx() {
        // [START crash_log_caught_ex]
        try {
            methodThatThrows()
        } catch (e: Exception) {
            Firebase.crashlytics.recordException(e)
            // handle your exception here
        }
        // [END crash_log_caught_ex]
    }

    fun forceACrash() {
        // [START crash_force_crash]
        val crashButton = Button(this)
        crashButton.text = "Crash!"
        crashButton.setOnClickListener {
            throw RuntimeException() // Force a crash
        }

        addContentView(crashButton, ViewGroup.LayoutParams(
                ViewGroup.LayoutParams.MATCH_PARENT,
                ViewGroup.LayoutParams.WRAP_CONTENT))
        // [END crash_force_crash]
    }
}
```

And here's the code for java:

**MainActivity.java**

```java
import android.os.Bundle;
import androidx.appcompat.app.AppCompatActivity;
import android.util.Log;
import android.view.View;
import android.view.ViewGroup;
import android.widget.Button;

import com.google.firebase.crashlytics.FirebaseCrashlytics;

public class MainActivity extends AppCompatActivity {

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
    }

    public void setKeysBasic() {
        // [START crash_set_keys_basic]
        FirebaseCrashlytics crashlytics = FirebaseCrashlytics.getInstance();

        crashlytics.setCustomKey("my_string_key", "foo" /* string value */);

        crashlytics.setCustomKey("my_bool_key", true /* boolean value */);

        crashlytics.setCustomKey("my_double_key", 1.0 /* double value */);

        crashlytics.setCustomKey("my_float_key", 1.0f /* float value */);

        crashlytics.setCustomKey("my_int_key", 1 /* int value */);
        // [END crash_set_keys_basic]
    }

    public void resetKey() {
        // [START crash_re_set_key]
        FirebaseCrashlytics crashlytics = FirebaseCrashlytics.getInstance();

        crashlytics.setCustomKey("current_level", 3);
        crashlytics.setCustomKey("last_UI_action", "logged_in");
        // [END crash_re_set_key]
    }

    public void logReportAndPrint() {
        // [START crash_log_report_and_print]
        FirebaseCrashlytics.getInstance().log("message");
        // [END crash_log_report_and_print]
    }

    public void logReportOnly() {
        // [START crash_log_report_only]
        FirebaseCrashlytics.getInstance().log("message");
        // [END crash_log_report_only]
    }

    public void enableAtRuntime() {
        // [START crash_enable_at_runtime]
        FirebaseCrashlytics.getInstance().setCrashlyticsCollectionEnabled(true);
        // [END crash_enable_at_runtime]
    }

    public void setUserId() {
        // [START crash_set_user_id]
        FirebaseCrashlytics.getInstance().setUserId("user123456789");
        // [END crash_set_user_id]
    }

    public void methodThatThrows() throws Exception {
        throw new Exception();
    }

    public void logCaughtEx() {
        // [START crash_log_caught_ex]
        try {
            methodThatThrows();
        } catch (Exception e) {
            FirebaseCrashlytics.getInstance().recordException(e);
            // handle your exception here
        }
        // [END crash_log_caught_ex]
    }

    public void forceACrash() {
        // [START crash_force_crash]
        Button crashButton = new Button(this);
        crashButton.setText("Crash!");
        crashButton.setOnClickListener(new View.OnClickListener() {
            public void onClick(View view) {
                throw new RuntimeException(); // Force a crash
            }
        });

        addContentView(crashButton, new ViewGroup.LayoutParams(
                ViewGroup.LayoutParams.MATCH_PARENT,
                ViewGroup.LayoutParams.WRAP_CONTENT));
        // [END crash_force_crash]
    }
}
```

That's it.

### Download

Download the project below:

| Number | Link |
| --- | --- |
| 1. | [Download code](https://downgit.github.io/#/home?url=https://github.com/firebase/snippets-android/tree/8184cba2c4/crashlytics) |
