# Kotlin Android Firebase AdMob Examples

> Step by step Firebase AdMob examples.

Google AdMob allows you monetize mobile apps with targeted, in-app advertising.


### What is AdMob?

Google AdMob is a mobile advertising platform that you can use to generate revenue from your app.  Using Google AdMob, you can monetize your mobile application through in-app advertising. In addition to display a variety of formats, in-app purchase ads can be displayed on Android, allowing users to purchase advertised products directly from your app.

Here are its features:

- Increase your in-app revenue	

AdMob allows you to Display ads from millions of Google advertisers in real-time or use AdMob mediation to earn from over 40 premium networks. Your other ad networks in your mediation stack are automatically repositioned to maximize your revenue with AdMob mediation's ad network optimization.

As one of the largest global ad networks, AdMob can fill your ad requests from anywhere in the world. Maximize the value of every impression across all your networks with the most advanced monetization technology.
    
- High-performing ad formats

It allows Engage and retain your users with our innovative ad formats. You can Customize the user experience and earn more revenue by integrating native, rewarded, banner, video, and interstitial ads seamlessly into your app.
    
- Actionable analytics

AdMob’s robust reporting and measurement features deliver deeper insights into how your users are interacting with your mobile app and ads. You can gain even richer insights by directly integrating Google Analytics for Firebase with AdMob.
    
- Automated tools

It is Easy to set up and integrate, our tools offer everything from state-of-the-art brand safety controls to advanced monetization technology with mediation and bidding.

### How it Works

You can display ads in your app by activating one or more Ad Unit IDs, which are unique identifiers for the areas that display ads in your app if you have an AdMob-registered app that integrates the Google Mobile Ads SDK (iOS | Android).

In order to maximize ad revenue, you need to gain insight into your users, drive in-app purchases, and get more in-app purchases with the Mobile Ads SDK. SDK's default integration collects device information, publisher location data, as well as general in-app purchase data (including currency and item cost).

### AdMob with Firebase

Using AdMob with Firebase provides you with additional app usage data and analytics capabilities.

The perfect combination of AdMob, Firebase, and Google Analytics helps you optimize your app's ad revenue, user experience, and user engagement.

1.  Check your AdMob account for user metrics

You can utilize AdMob's user metrics to find new data and powerful reports, such as the rewarded report, which can help you plan your monetization tactics.

2. Use Firebase to explore and work with your analytics data

 You can increase app monetization and engagement by integrating Firebase with your AdMob app. For instance, you can build custom audiences and even use BigQuery.

3.  You can customize your analytics data more easily

Firebase SDK for Google Analytics allows you to implement customizable analytics (such as custom events), see more detailed user metrics, and start using other Firebase products.

Learn more [here](https://firebase.google.com/docs/admob/analytics-and-firebase?platform=android).

### How to Configure Firebase and Google AdMob

Follow these steps:

1. Configure your app to use Firebase

Add Firebase to your new or existing app in the Firebase console.

2. Create an AdMob account and register your app.
 
[Sign up for an AdMob account](http://www.google.com/admob/?subid=WW-EN-ET-firebase-docs&utm_source=internal&utm_medium=et&utm_campaign=firebase-docs) and register your app as an AdMob app. Before you publish, add to your app any Ad Unit IDs that you've created.

3. Enable user metrics and link your AdMob app to Firebase.

(Optional, but strongly recommended) In your AdMob account, enable user metrics to view curated metrics. Also, link your AdMob app to Firebase to explore and work with your analytics data via the Firebase console.


4. Update project dependencies.

Add the Google Mobile Ads SDK using CocoaPods on iOS or Gradle on Android.

5. Implement your first ad in your app.

Use the Mobile Ads SDK to create space in your app UI for a banner ad (a great place to start!). You can set the layout to just the way you like it or use smart banners that will resize depending on the device size and orientation.


### Result

Here is what is created in this sample:

![Firebase AdMob Tutorial](https://github.com/firebase/quickstart-android/raw/master/admob/app/src/screen.png)

### Note

- The running sample displays a test banner ad and a test interstitial add.

- In `src/main/res/values/strings.xml` change the `admob_app_id` string to your AdMon app id.
- Note that this ID is used in two places: `AndroidManifest.xml` and `MainActivity`


#### Step 1. Dependencies

We need to add some dependencies in our `app/build.gradle` file as shown below:


**(a). `build.gradle`**


> Our app-level `build.gradle`.

We Prepare our dependencies as shown below. You may use later versions.

Inside the android closure we will set the `compileSDKVersion` and `buildToolsVersion`. We will also set the application ID, minimum SDK version, target SDK version, version code and version name inside a `defaultConfig` closure. We will also set the build types: to either debug or release. For each build type you can enable minification of resources, as well as enable proguard.

We will enable view binding by setting the `viewBinding` property to true.

We then declare our app dependencies under the `dependencies` closure. We will need the following 10 dependencies:

1. Our `Material` library.
2. Our `Browser` library.
3. Our `Navigation-fragment-ktx` library.
4. Our `Navigation-ui-ktx` library.
5. Our `Play-services-ads` library.
6. Our `Firebase-bom` library.
7. Our `Com.google.firebase` library.

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
        applicationId "com.google.samples.quickstart.admobexample"
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
    packagingOptions {
        resources {
            excludes += ['LICENSE.txt']
        }
    }


    buildFeatures {
        viewBinding = true
    }
}

dependencies {
    implementation project(":internal:lintchecks")
    implementation project(":internal:chooserx")
    implementation 'androidx.appcompat:appcompat:1.5.1'
    implementation 'com.google.android.material:material:1.6.1'
    implementation 'androidx.browser:browser:1.0.0'
    implementation 'androidx.navigation:navigation-fragment-ktx:2.5.2'
    implementation 'androidx.navigation:navigation-ui-ktx:2.5.2'

    implementation 'com.google.android.gms:play-services-ads:21.2.0'

    // Import the Firebase BoM (see: https://firebase.google.com/docs/android/learn-more#bom)
    implementation platform('com.google.firebase:firebase-bom:30.5.0')

    // For an optimal experience using AdMob, add the Firebase SDK
    // for Google Analytics. This is recommended, but not required.
    implementation 'com.google.firebase:firebase-analytics'

    debugImplementation "androidx.fragment:fragment-testing:1.5.3"
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

1. Our `INTERNET` permission.
2. Our `ACCESS_NETWORK_STATE` permission.

The add the following metadata, supplying your app ID:

```xml
        <meta-data
            android:name="com.google.android.gms.ads.APPLICATION_ID"
            android:value="@string/admob_app_id" />
```

Here is the full Android Manifest file:

```xml
<?xml version="1.0" encoding="utf-8"?>
<manifest xmlns:android="http://schemas.android.com/apk/res/android"
    xmlns:tools="http://schemas.android.com/tools"
    package="com.google.samples.quickstart.admobexample">

    <!-- [SNIPPET modify_app_permissions]
        Include required permissions for Google Mobile Ads to run.
        [START modify_app_permissions] -->
    <uses-permission android:name="android.permission.INTERNET" />
    <uses-permission android:name="android.permission.ACCESS_NETWORK_STATE" />

    <!-- [END modify_app_permissions] -->
    <application
        android:allowBackup="true"
        android:icon="@mipmap/ic_launcher"
        android:label="@string/app_name"
        android:theme="@style/AppTheme"
        tools:ignore="AllowBackup,GoogleAppIndexingWarning">

        <!--
            This metadata is required or your app will crash!
        -->
        <meta-data
            android:name="com.google.android.gms.ads.APPLICATION_ID"
            android:value="@string/admob_app_id" />

        <activity
            android:name=".EntryChoiceActivity"
            android:label="@string/app_name"
            android:exported="true">
            <intent-filter>
                <action android:name="android.intent.action.MAIN" />

                <category android:name="android.intent.category.LAUNCHER" />
            </intent-filter>
        </activity>

        <activity android:name=".java.MainActivity" />
        <activity android:name=".kotlin.MainActivity" />
        <!-- [SNIPPET add_activity_config_changes]
            Include the AdActivity configChanges and theme.
            [START add_activity_config_changes] -->
        <activity
            android:name="com.google.android.gms.ads.AdActivity"
            android:configChanges="keyboard|keyboardHidden|orientation|screenLayout|uiMode|screenSize|smallestScreenSize"
            android:theme="@android:style/Theme.Translucent" />
        <!-- [END add_activity_config_changes] -->
    </application>

</manifest>

```
#### Step 4. Create Navigation Rules

Create a directory known as `navigation` inside your `res` directory and add the following navigation rules:


**(a). `nav_graph_kotlin.xml`**

```xml
<?xml version="1.0" encoding="utf-8"?>
<navigation xmlns:android="http://schemas.android.com/apk/res/android"
    xmlns:app="http://schemas.android.com/apk/res-auto"
    xmlns:tools="http://schemas.android.com/tools"
    android:id="@+id/nav_graph_kotlin"
    app:startDestination="@id/FirstFragment">

    <fragment
        android:id="@+id/FirstFragment"
        android:name="com.google.samples.quickstart.admobexample.kotlin.FirstFragment"
        android:label="@string/first_fragment_title"
        tools:layout="@layout/fragment_first">

        <action
            android:id="@+id/action_FirstFragment_to_SecondFragment"
            app:destination="@id/SecondFragment" />
    </fragment>
    <fragment
        android:id="@+id/SecondFragment"
        android:name="com.google.samples.quickstart.admobexample.kotlin.SecondFragment"
        android:label="@string/second_fragment_title"
        tools:layout="@layout/fragment_second">
    </fragment>
</navigation>
```
#### Step 5. Design Layouts

In Android we design our UI interfaces using XML. So let's create the following layouts:


**(a). `fragment_first.xml`**


> Our `fragment_first` layout.

Inside your `/res/layout/` directory create an xml layout file named `fragment_first.xml`.

Design your XML layout using the following 5 UI widgets and ViewGroups:

1. [`androidx.constraintlayout.widget.ConstraintLayout`](https://android.camposha.info/en/constraintlayout)
2. [`ImageView`](https://android.camposha.info/en/imageview)
3. [`Button`](https://android.camposha.info/en/button)
4. `com.google.android.gms.ads.AdView`
5. `androidx.constraintlayout.widget.Guideline`

```xml
<?xml version="1.0" encoding="utf-8"?>
<androidx.constraintlayout.widget.ConstraintLayout xmlns:android="http://schemas.android.com/apk/res/android"
    xmlns:ads="http://schemas.android.com/apk/res-auto"
    xmlns:app="http://schemas.android.com/apk/res-auto"
    android:layout_width="match_parent"
    android:layout_height="match_parent">

    <ImageView
        android:layout_width="wrap_content"
        android:layout_height="wrap_content"
        android:layout_marginTop="16dp"
        android:src="@drawable/firebase_lockup_400"
        app:layout_constraintEnd_toEndOf="parent"
        app:layout_constraintStart_toStartOf="parent"
        app:layout_constraintTop_toTopOf="parent" />

    <Button
        android:id="@+id/loadInterstitialButton"
        android:layout_width="wrap_content"
        android:layout_height="wrap_content"
        android:text="@string/interstitial_button_text"
        app:layout_constraintBottom_toTopOf="@+id/guideline"
        app:layout_constraintEnd_toEndOf="parent"
        app:layout_constraintStart_toStartOf="parent"
        app:layout_constraintTop_toTopOf="@+id/guideline" />

    <com.google.android.gms.ads.AdView
        android:id="@+id/adView"
        android:layout_width="wrap_content"
        android:layout_height="wrap_content"
        android:layout_alignParentBottom="true"
        android:layout_centerHorizontal="true"
        ads:adSize="BANNER"
        ads:adUnitId="@string/banner_ad_unit_id"
        app:layout_constraintBottom_toBottomOf="parent"
        app:layout_constraintEnd_toEndOf="parent"
        app:layout_constraintStart_toStartOf="parent" />

    <androidx.constraintlayout.widget.Guideline
        android:id="@+id/guideline"
        android:layout_width="wrap_content"
        android:layout_height="wrap_content"
        android:orientation="horizontal"
        app:layout_constraintGuide_percent="0.5" />

</androidx.constraintlayout.widget.ConstraintLayout>

```

**(b). `fragment_second.xml`**


> Our `fragment_second` layout.

Inside your `/res/layout/` directory create an xml layout file named `fragment_second.xml`.

Design your XML layout using the following 4 UI widgets and ViewGroups:


1. [`ConstraintLayout`](https://android.camposha.info/en/constraintlayout)
2. [`ImageView`](https://android.camposha.info/en/imageview)
3. [`TextView`](https://android.camposha.info/en/textview)
4. `androidx.constraintlayout.widget.Guideline`

```xml
<?xml version="1.0" encoding="utf-8"?>
<androidx.constraintlayout.widget.ConstraintLayout xmlns:android="http://schemas.android.com/apk/res/android"
    xmlns:app="http://schemas.android.com/apk/res-auto"
    xmlns:tools="http://schemas.android.com/tools"
    android:layout_width="match_parent"
    android:layout_height="match_parent"
    tools:viewBindingIgnore="true">

    <ImageView
        android:id="@+id/icon"
        android:layout_width="wrap_content"
        android:layout_height="wrap_content"
        android:layout_centerHorizontal="true"
        android:src="@drawable/firebase_lockup_400"
        app:layout_constraintBottom_toTopOf="@+id/guideline"
        app:layout_constraintEnd_toEndOf="parent"
        app:layout_constraintStart_toStartOf="parent" />

    <TextView
        android:layout_width="wrap_content"
        android:layout_height="wrap_content"
        android:layout_below="@+id/icon"
        android:layout_gravity="center_horizontal"
        android:text="@string/second_fragment_content"
        android:textAlignment="center"
        app:layout_constraintEnd_toEndOf="@+id/icon"
        app:layout_constraintStart_toStartOf="@+id/icon"
        app:layout_constraintTop_toBottomOf="@+id/icon" />

    <androidx.constraintlayout.widget.Guideline
        android:id="@+id/guideline"
        android:layout_width="wrap_content"
        android:layout_height="wrap_content"
        android:orientation="horizontal"
        app:layout_constraintGuide_percent="0.5" />

</androidx.constraintlayout.widget.ConstraintLayout>

```

**(c). `activity_main.xml`**


> Our `activity_main` layout.

Inside your `/res/layout/` directory create an xml layout file named `activity_main.xml`.

Design your XML layout using the following 2 UI widgets and ViewGroups:

1. [`ConstraintLayout`](https://android.camposha.info/en/constraintlayout)
2. [`Fragment`](https://android.camposha.info/en/fragment)

```xml
<androidx.constraintlayout.widget.ConstraintLayout xmlns:android="http://schemas.android.com/apk/res/android"
    xmlns:app="http://schemas.android.com/apk/res-auto"
    android:layout_width="match_parent"
    android:layout_height="match_parent"
    xmlns:tools="http://schemas.android.com/tools"
    app:layout_behavior="@string/appbar_scrolling_view_behavior"
    tools:viewBindingIgnore="true">

    <fragment
        android:id="@+id/nav_host_fragment"
        android:name="androidx.navigation.fragment.NavHostFragment"
        android:layout_width="0dp"
        android:layout_height="0dp"
        app:defaultNavHost="true"
        app:layout_constraintBottom_toBottomOf="parent"
        app:layout_constraintLeft_toLeftOf="parent"
        app:layout_constraintRight_toRightOf="parent"
        app:layout_constraintTop_toTopOf="parent" />

</androidx.constraintlayout.widget.ConstraintLayout>

```
#### Step 6. Write Code

Finally we need to write our code as follows:


**(a). `EntryChoiceActivity.kt`**

> Our `EntryChoiceActivity` class.

Create a Kotlin file named `EntryChoiceActivity.kt`.

We will then add imports from android SDK and other packages. Here are some of the imports we will use in this class:

1. `Intent` from the `android.content` package.

Next create a class that derives from `BaseEntryChoiceActivity` and add its contents as follows:

We will be overriding the following functions: 

1. `getChoices(): List<Choice> `.

Here is the full code:

```kotlin
package replace_with_your_package_name

import android.content.Intent
import com.firebase.example.internal.BaseEntryChoiceActivity
import com.firebase.example.internal.Choice
import com.google.samples.quickstart.admobexample.java.MainActivity

class EntryChoiceActivity : BaseEntryChoiceActivity() {

    override fun getChoices(): List<Choice> {
        return listOf(
                Choice(
                        "Java",
                        "Run the Firebase Admob quickstart written in Java.",
                        Intent(this, MainActivity::class.java)),
                Choice(
                        "Kotlin",
                        "Run the Firebase Admob quickstart written in Kotlin.",
                        Intent(this, com.google.samples.quickstart.admobexample.kotlin.MainActivity::class.java))
        )
    }
}


```

**(b). `FirstFragment.kt`**

> Our `FirstFragment` class.

Create a Kotlin file named `FirstFragment.kt`.

Next create a class that derives from `Fragment` and add its contents as follows:

We will be overriding the following functions: 

1. `onViewCreated(view: View, savedInstanceState: Bundle?) `.
2. `onAdLoaded(ad: InterstitialAd) `.
3. `onAdDismissedFullScreenContent() `.
4. `onAdFailedToLoad(error: LoadAdError) `.
5. `onPause() `.
6. `onResume() `.
7. `onDestroy() `.
8. `onDestroyView() `.

We will be creating the following methods:

1. `requestNewInterstitial() `.
2. `goToNextFragment() `.
3. `checkIds() `.

**(a). Our `requestNewInterstitial()` function**

Write the `requestNewInterstitial()` function as follows:

```kotlin
    private fun requestNewInterstitial() {
        // AdMob ad unit IDs are not currently stored inside the google-services.json file.
        // Developers using AdMob can store them as custom values in a string resource file or
        // simply use constants. Note that the ad units used here are configured to return only test
        // ads, and should not be used outside this sample.
        val adRequest = AdRequest.Builder().build()

        adView.loadAd(adRequest)

        InterstitialAd.load(
                requireContext(),
                getString(R.string.interstitial_ad_unit_id),
                adRequest,
                object : InterstitialAdLoadCallback() {
                    override fun onAdLoaded(ad: InterstitialAd) {
                        super.onAdLoaded(ad)
                        interstitialAd = ad
                        // Ad received, ready to display
                        loadInterstitialButton.isEnabled = true

                        interstitialAd?.fullScreenContentCallback = object : FullScreenContentCallback() {
                            override fun onAdDismissedFullScreenContent() {
                                super.onAdDismissedFullScreenContent()
                                goToNextFragment()
                            }
                        }
                    }

                    override fun onAdFailedToLoad(error: LoadAdError) {
                        super.onAdFailedToLoad(error)
                        interstitialAd = null
                        Log.w(TAG, "onAdFailedToLoad:${error.message}")
                    }
                }
        )
    }
```

**(b). Our `goToNextFragment()` function**

Write the `goToNextFragment()` function as follows:

```kotlin
    private fun goToNextFragment() {
        findNavController().navigate(R.id.action_FirstFragment_to_SecondFragment)
    }
```

**(c). Our `checkIds()` function**

Write the `checkIds()` function as follows:

```kotlin
    private fun checkIds() {
        if (TEST_APP_ID == getString(R.string.admob_app_id)) {
            Log.w(TAG, "Your admob_app_id is not configured correctly, please see the README")
        }
    }
```


Here is the full code:

```kotlin
package replace_with_your_package_name

import android.os.Bundle
import android.util.Log
import androidx.fragment.app.Fragment
import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import android.widget.Button
import androidx.navigation.fragment.findNavController
import com.google.android.gms.ads.AdRequest
import com.google.android.gms.ads.AdView
import com.google.android.gms.ads.FullScreenContentCallback
import com.google.android.gms.ads.LoadAdError
import com.google.android.gms.ads.MobileAds
import com.google.android.gms.ads.interstitial.InterstitialAd
import com.google.android.gms.ads.interstitial.InterstitialAdLoadCallback
import com.google.samples.quickstart.admobexample.R
import com.google.samples.quickstart.admobexample.databinding.FragmentFirstBinding

class FirstFragment : Fragment() {

    private var _binding: FragmentFirstBinding? = null
    private val binding get() = _binding!!
    private var interstitialAd: InterstitialAd? = null
    private lateinit var adView: AdView
    private lateinit var loadInterstitialButton: Button

    override fun onCreateView(inflater: LayoutInflater, container: ViewGroup?,
                              savedInstanceState: Bundle?): View {
        _binding = FragmentFirstBinding.inflate(inflater, container, false)
        return binding.root
    }

    override fun onViewCreated(view: View, savedInstanceState: Bundle?) {
        super.onViewCreated(view, savedInstanceState)

        adView = binding.adView
        loadInterstitialButton = binding.loadInterstitialButton

        checkIds()

        // Initialize the Google Mobile Ads SDK
        MobileAds.initialize(requireContext())

        requestNewInterstitial()

        loadInterstitialButton.setOnClickListener {
            if (interstitialAd != null) {
                interstitialAd?.show(requireActivity())
            } else {
                goToNextFragment()
            }
        }

        // Disable button if an interstitial ad is not loaded yet.
        loadInterstitialButton.isEnabled = interstitialAd != null
    }

    /**
     * Load a new interstitial ad asynchronously.
     */
    private fun requestNewInterstitial() {
        // AdMob ad unit IDs are not currently stored inside the google-services.json file.
        // Developers using AdMob can store them as custom values in a string resource file or
        // simply use constants. Note that the ad units used here are configured to return only test
        // ads, and should not be used outside this sample.
        val adRequest = AdRequest.Builder().build()

        adView.loadAd(adRequest)

        InterstitialAd.load(
                requireContext(),
                getString(R.string.interstitial_ad_unit_id),
                adRequest,
                object : InterstitialAdLoadCallback() {
                    override fun onAdLoaded(ad: InterstitialAd) {
                        super.onAdLoaded(ad)
                        interstitialAd = ad
                        // Ad received, ready to display
                        loadInterstitialButton.isEnabled = true

                        interstitialAd?.fullScreenContentCallback = object : FullScreenContentCallback() {
                            override fun onAdDismissedFullScreenContent() {
                                super.onAdDismissedFullScreenContent()
                                goToNextFragment()
                            }
                        }
                    }

                    override fun onAdFailedToLoad(error: LoadAdError) {
                        super.onAdFailedToLoad(error)
                        interstitialAd = null
                        Log.w(TAG, "onAdFailedToLoad:${error.message}")
                    }
                }
        )
    }

    private fun goToNextFragment() {
        findNavController().navigate(R.id.action_FirstFragment_to_SecondFragment)
    }

    /** Called when leaving the activity  */
    override fun onPause() {
        adView.pause()
        super.onPause()
    }

    /** Called when returning to the activity  */
    override fun onResume() {
        super.onResume()
        adView.resume()
        if (interstitialAd == null) {
            requestNewInterstitial()
        }
    }

    /** Called before the activity is destroyed  */
    override fun onDestroy() {
        adView.destroy()
        super.onDestroy()
    }

    private fun checkIds() {
        if (TEST_APP_ID == getString(R.string.admob_app_id)) {
            Log.w(TAG, "Your admob_app_id is not configured correctly, please see the README")
        }
    }

    companion object {
        private const val TAG = "FirstFragment"
        private const val TEST_APP_ID = "ca-app-pub-3940256099942544~3347511713"
    }

    override fun onDestroyView() {
        super.onDestroyView()
        _binding = null
    }
}

```

**(c). `SecondFragment.kt`**

> Our `SecondFragment` class.

Create a Kotlin file named `SecondFragment.kt`.

We will then add imports from android SDK and other packages. Here are some of the imports we will use in this class:

1. `Bundle` from the `android.os` package.
2. `LayoutInflater` from the `android.view` package.
3. `View` from the `android.view` package.
4. `ViewGroup` from the `android.view` package.
5. `Fragment` from the `androidx.fragment.app` package.

Next create a class that derives from `Fragment` and add its contents as follows:

We will be overriding the following functions: 

1. `onCreateView(inflater: LayoutInflater, container: ViewGroup?, savedInstanceState: Bundle?): View? `.

Here is the full code:

```kotlin
package replace_with_your_package_name

import android.os.Bundle
import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import androidx.fragment.app.Fragment
import com.google.samples.quickstart.admobexample.R

class SecondFragment : Fragment() {

    override fun onCreateView(inflater: LayoutInflater, container: ViewGroup?, savedInstanceState: Bundle?): View? {
        return inflater.inflate(R.layout.fragment_second, container, false)
    }

}

```

**(d). `MainActivity.kt`**

> Our `MainActivity` class.

Create a Kotlin file named `MainActivity.kt`.

We will then add imports from android SDK and other packages. Here are some of the imports we will use in this class:

1. `Bundle` from the `android.os` package.
2. `AppCompatActivity` from the `androidx.appcompat.app` package.
3. `findNavController` from the `androidx.navigation` package.

Next create a class that derives from `AppCompatActivity` and add its contents as follows:

We will be overriding the following functions: 

1. `onCreate(savedInstanceState: Bundle?) `.

Here is the full code:

```kotlin
package replace_with_your_package_name

import android.os.Bundle
import androidx.appcompat.app.AppCompatActivity
import androidx.navigation.findNavController
import com.google.samples.quickstart.admobexample.R

class MainActivity : AppCompatActivity() {

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_main)

        findNavController(R.id.nav_host_fragment).setGraph(R.navigation.nav_graph_kotlin)
    }
}


```

### Reference

Below are the reference links:

|No.|Link|
|--|---|
|2.|Read more [here](https://github.com/firebase/quickstart-android/blob/master/admob/README.md).|
|3.|Follow code author [here](https://github.com/quickstart-android).|
