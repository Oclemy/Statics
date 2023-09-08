# Firebase Dynamic Links Quickstart

This is a Firebase Dynamic Links example project.

Here is what will be created:

![Firebase Dynamic Links Tutorial](https://github.com/firebase/quickstart-android/raw/master/dynamiclinks/app/src/screen.png)


### Getting Started

- Add Firebase to your Android Project.
- Run the sample on your Android device or emulator.
- Replace the applicationId in `app/build.gradle` with the package name that matches your app code.
- When the application is started, a deep link will be generated using your app code.
- The application checks if it was launched from a deep link. If so, the link data will be displayed under the Receive heading.
- Try sharing the deep link from the application and use that deep link to re-launch the application.


#### Step 1. Dependencies

We need to add some dependencies in our `app/build.gradle` file as shown below:


**(a). `build.gradle`**


> Our app-level `build.gradle`.

We Prepare our dependencies as shown below. You may use later versions.

We will enable view binding by setting the `viewBinding` property to true.

We then declare our app dependencies under the `dependencies` closure. We will need the following 7 dependencies:

1. Our `Firebase-bom` library.
2. Our `Com.google.firebase` library.
3. Our `Com.google.firebase` library.
4. Our `Com.google.firebase` library.

Here is our full `app/build.gradle`:

```groovy
plugins {
    id 'com.android.application'
    id 'kotlin-android'
    id 'com.google.gms.google-services'
}

check.dependsOn 'assembleMainFlavorDebugAndroidTest'

android {
    compileSdkVersion 33
    flavorDimensions "irrelevant"

    defaultConfig {
        applicationId "com.google.firebase.quickstart.deeplinks"
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

    flavorDimensions "all"

    productFlavors {
        mainFlavor {
            dimension "all"

            // TODO(developer): Replace this with your Dynamic Links URI prefix
            //                  See: https://firebase.google.com/docs/dynamic-links/android/create#set-up-firebase-and-the-dynamic-links-sdk
            resValue "string", "dynamic_links_uri_prefix", "https://YOUR_APP.page.link"
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

    // Firebase Dynamic Links (Java)
    implementation 'com.google.firebase:firebase-dynamic-links'

    // Firebase Dynamic Links (Kotlin)
    implementation 'com.google.firebase:firebase-dynamic-links-ktx'

    // For an optimal experience using Dynamic Links, add the Firebase SDK
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

We will need to look at our `AndroidManifest.xml`.


**(a). `AndroidManifest.xml`**


> Our `AndroidManifest` file.

```xml
<?xml version="1.0" encoding="utf-8"?>
<manifest xmlns:android="http://schemas.android.com/apk/res/android"
    package="com.google.firebase.quickstart.deeplinks" >

    <application
        android:allowBackup="true"
        android:icon="@mipmap/ic_launcher"
        android:label="@string/app_name"
        android:supportsRtl="true"
        android:theme="@style/AppTheme" >

        <activity android:name=".EntryChoiceActivity"
            android:exported="true">
            <intent-filter>
                <action android:name="android.intent.action.MAIN" />

                <category android:name="android.intent.category.LAUNCHER" />
            </intent-filter>
        </activity>

        <activity android:name=".java.MainActivity"
            android:exported="true">
            <!-- [START link_intent_filter] -->
            <intent-filter>
                <action android:name="android.intent.action.VIEW"/>
                <category android:name="android.intent.category.DEFAULT"/>
                <category android:name="android.intent.category.BROWSABLE"/>
                <data
                    android:host="example.com"
                    android:scheme="https"/>
            </intent-filter>
            <!-- [END link_intent_filter] -->
        </activity>

        <activity android:name=".kotlin.MainActivity"
            android:exported="true">
            <intent-filter>
                <action android:name="android.intent.action.VIEW"/>
                <category android:name="android.intent.category.DEFAULT"/>
                <category android:name="android.intent.category.BROWSABLE"/>
                <data
                    android:host="kotlin.example.com"
                    android:scheme="https"/>
            </intent-filter>
        </activity>
    </application>

</manifest>

```
#### Step 4. Design Layouts

So let's create the following layouts:

**(a). `activity_main.xml`**

> Our `activity_main` layout.

Inside your `/res/layout/` directory create an xml layout file named `activity_main.xml` and design your XML layout using the following 4 UI widgets:

1. [`LinearLayout`](https://android.camposha.info/en/linearlayout)
2. [`ImageView`](https://android.camposha.info/en/imageview)
3. [`TextView`](https://android.camposha.info/en/textview)
4. [`Button`](https://android.camposha.info/en/button)

```xml
<?xml version="1.0" encoding="utf-8"?>
<LinearLayout xmlns:android="http://schemas.android.com/apk/res/android"
    xmlns:tools="http://schemas.android.com/tools"
    android:layout_width="match_parent"
    android:layout_height="match_parent"
    android:orientation="vertical"
    android:paddingBottom="@dimen/activity_vertical_margin"
    android:paddingLeft="@dimen/activity_horizontal_margin"
    android:paddingRight="@dimen/activity_horizontal_margin"
    android:paddingTop="@dimen/activity_vertical_margin">

    <ImageView
        android:layout_width="wrap_content"
        android:layout_height="wrap_content"
        android:layout_gravity="center_horizontal"
        android:layout_marginBottom="16dp"
        android:src="@drawable/firebase_lockup_400"/>

    <TextView
        style="@style/TextAppearance.AppCompat.Medium"
        android:layout_width="wrap_content"
        android:layout_height="wrap_content"
        android:layout_marginBottom="8dp"
        android:text="@string/title_receive"/>

    <TextView
        android:id="@+id/linkViewReceive"
        android:layout_width="wrap_content"
        android:layout_height="wrap_content"
        android:autoLink="web"
        android:text="@string/msg_no_deep_link"/>

    <TextView
        style="@style/TextAppearance.AppCompat.Medium"
        android:layout_width="wrap_content"
        android:layout_height="wrap_content"
        android:layout_marginBottom="8dp"
        android:layout_marginTop="24dp"
        android:text="@string/title_send"/>

    <TextView
        android:id="@+id/linkViewSend"
        android:layout_width="wrap_content"
        android:layout_height="wrap_content"
        tools:text="https://abc.xyz/foo"/>

    <Button
        android:id="@+id/buttonShare"
        android:layout_width="@dimen/standard_field_width"
        android:layout_height="wrap_content"
        android:text="@string/share" />
</LinearLayout>

```
#### Step 5. Write Code

Finally we need to write our code as follows:

**(a). `EntryChoiceActivity.kt`**

> Our `EntryChoiceActivity` class.

Create a Kotlin file named `EntryChoiceActivity.kt`, then create a class that derives from `BaseEntryChoiceActivity` and add its contents as follows:

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
                        "Run the Firebase Dynamic Links quickstart written in Java.",
                        Intent(this, com.google.firebase.quickstart.deeplinks.java.MainActivity::class.java)),
                Choice(
                        "Kotlin",
                        "Run the Firebase Dynamic Links quickstart written in Kotlin.",
                        Intent(this, com.google.firebase.quickstart.deeplinks.kotlin.MainActivity::class.java))
        )
    }
}


```

**(b). `MainActivity.kt`**

> Our `MainActivity` class.

Create a Kotlin file named `MainActivity.kt`.

We will then add imports from android SDK and other packages. Here are some of the imports we will use in this class:

1. `Intent` from the `android.content` package.
2. `Uri` from the `android.net` package.
3. `Bundle` from the `android.os` package.
4. `VisibleForTesting` from the `androidx.annotation` package.
5. `AlertDialog` from the `androidx.appcompat.app` package.
6. `AppCompatActivity` from the `androidx.appcompat.app` package.
7. `Log` from the `android.util` package.

Next create a class that derives from `AppCompatActivity` and add its contents as follows:

We will be overriding the following functions: 

1. `onCreate(savedInstanceState: Bundle?) `.

We will be creating the following methods:

1. `buildDeepLink(deepLink: Uri, minVersion: Int): Uri `.
2. `shareDeepLink(parameter)` - Our function will take a `String` object as a parameter.
3. `validateAppCode() `.

**(a). Our `buildDeepLink()` function**

Write the `buildDeepLink()` function as follows:

```kotlin
    fun buildDeepLink(deepLink: Uri, minVersion: Int): Uri {
        val uriPrefix = getString(R.string.dynamic_links_uri_prefix)

        // Set dynamic link parameters:
        //  * URI prefix (required)
        //  * Android Parameters (required)
        //  * Deep link
        // [START build_dynamic_link]
        // Build the dynamic link
        val link = Firebase.dynamicLinks.dynamicLink {
            domainUriPrefix = uriPrefix
            androidParameters {
                minimumVersion = minVersion
            }
            link = deepLink
        }
        // [END build_dynamic_link]

        // Return the dynamic link as a URI
        return link.uri
    }
```

**(b). Our `validateAppCode()` function**

Write the `validateAppCode()` function as follows:

```kotlin
    private fun validateAppCode() {
        val uriPrefix = getString(R.string.dynamic_links_uri_prefix)
        if (uriPrefix.contains("YOUR_APP")) {
            AlertDialog.Builder(this)
                    .setTitle("Invalid Configuration")
                    .setMessage("Please set your Dynamic Links domain in app/build.gradle")
                    .setPositiveButton(android.R.string.ok, null)
                    .create().show()
        }
    }
```

**(c). Our `shareDeepLink()` function**

Write the `shareDeepLink()` function as follows:

```kotlin
    private fun shareDeepLink(deepLink: String) {
        val intent = Intent(Intent.ACTION_SEND)
        intent.type = "text/plain"
        intent.putExtra(Intent.EXTRA_SUBJECT, "Firebase Deep Link")
        intent.putExtra(Intent.EXTRA_TEXT, deepLink)

        startActivity(intent)
    }
```


Here is the full code:

```kotlin
package replace_with_your_package_name

import android.content.Intent
import android.net.Uri
import android.os.Bundle
import androidx.annotation.VisibleForTesting
import com.google.android.material.snackbar.Snackbar
import androidx.appcompat.app.AlertDialog
import androidx.appcompat.app.AppCompatActivity
import android.util.Log
import com.google.firebase.dynamiclinks.PendingDynamicLinkData
import com.google.firebase.dynamiclinks.ktx.androidParameters
import com.google.firebase.dynamiclinks.ktx.dynamicLink
import com.google.firebase.dynamiclinks.ktx.dynamicLinks
import com.google.firebase.ktx.Firebase
import com.google.firebase.quickstart.deeplinks.R
import com.google.firebase.quickstart.deeplinks.databinding.ActivityMainBinding

class MainActivity : AppCompatActivity() {

    // [START on_create]
    override fun onCreate(savedInstanceState: Bundle?) {
        // [START_EXCLUDE]
        super.onCreate(savedInstanceState)
        val binding = ActivityMainBinding.inflate(layoutInflater)
        setContentView(binding.root)

        val linkSendTextView = binding.linkViewSend
        val linkReceiveTextView = binding.linkViewReceive

        // Validate that the developer has set the app code.
        validateAppCode()

        // Create a deep link and display it in the UI
        val newDeepLink = buildDeepLink(Uri.parse(DEEP_LINK_URL), 0)
        linkSendTextView.text = newDeepLink.toString()

        // Share button click listener
        binding.buttonShare.setOnClickListener { shareDeepLink(newDeepLink.toString()) }
        // [END_EXCLUDE]

        // [START get_deep_link]
        Firebase.dynamicLinks
                .getDynamicLink(intent)
                .addOnSuccessListener(this) { pendingDynamicLinkData: PendingDynamicLinkData? ->
                    // Get deep link from result (may be null if no link is found)
                    var deepLink: Uri? = null
                    if (pendingDynamicLinkData != null) {
                        deepLink = pendingDynamicLinkData.link
                    }

                    // Handle the deep link. For example, open the linked
                    // content, or apply promotional credit to the user's
                    // account.
                    // ...

                    // [START_EXCLUDE]
                    // Display deep link in the UI
                    if (deepLink != null) {
                        Snackbar.make(findViewById(android.R.id.content),
                                "Found deep link!", Snackbar.LENGTH_LONG).show()

                        linkReceiveTextView.text = deepLink.toString()
                    } else {
                        Log.d(TAG, "getDynamicLink: no link found")
                    }
                    // [END_EXCLUDE]
                }
                .addOnFailureListener(this) { e -> Log.w(TAG, "getDynamicLink:onFailure", e) }
        // [END get_deep_link]
    }
    // [END on_create]

    /**
     * Build a Firebase Dynamic Link.
     * https://firebase.google.com/docs/dynamic-links/android/create#create-a-dynamic-link-from-parameters
     *
     * @param deepLink the deep link your app will open. This link must be a valid URL and use the
     * HTTP or HTTPS scheme.
     * @param minVersion the `versionCode` of the minimum version of your app that can open
     * the deep link. If the installed app is an older version, the user is taken
     * to the Play store to upgrade the app. Pass 0 if you do not
     * require a minimum version.
     * @return a [Uri] representing a properly formed deep link.
     */
    @VisibleForTesting
    fun buildDeepLink(deepLink: Uri, minVersion: Int): Uri {
        val uriPrefix = getString(R.string.dynamic_links_uri_prefix)

        // Set dynamic link parameters:
        //  * URI prefix (required)
        //  * Android Parameters (required)
        //  * Deep link
        // [START build_dynamic_link]
        // Build the dynamic link
        val link = Firebase.dynamicLinks.dynamicLink {
            domainUriPrefix = uriPrefix
            androidParameters {
                minimumVersion = minVersion
            }
            link = deepLink
        }
        // [END build_dynamic_link]

        // Return the dynamic link as a URI
        return link.uri
    }

    private fun shareDeepLink(deepLink: String) {
        val intent = Intent(Intent.ACTION_SEND)
        intent.type = "text/plain"
        intent.putExtra(Intent.EXTRA_SUBJECT, "Firebase Deep Link")
        intent.putExtra(Intent.EXTRA_TEXT, deepLink)

        startActivity(intent)
    }

    private fun validateAppCode() {
        val uriPrefix = getString(R.string.dynamic_links_uri_prefix)
        if (uriPrefix.contains("YOUR_APP")) {
            AlertDialog.Builder(this)
                    .setTitle("Invalid Configuration")
                    .setMessage("Please set your Dynamic Links domain in app/build.gradle")
                    .setPositiveButton(android.R.string.ok, null)
                    .create().show()
        }
    }

    companion object {

        private const val TAG = "MainActivity"
        private const val DEEP_LINK_URL = "https://kotlin.example.com/deeplinks"
    }
}


```

### Reference

Below are the reference links:

|No.|Link|
|--|---|
|2.|Read more [here](https://github.com/firebase/quickstart-android/blob/master/dynamiclinks/README.md).|
|3.|Follow code author [here](https://github.com/firebase).|
