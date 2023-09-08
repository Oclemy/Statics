# Kotlin Android Firebase Google Analytics Examples

> Step by step Firebase Google Analytics examples.


### What is Google Analytics?

Google Analytics is a free tool for app measurement, which provides insights into app usage and user engagement.

Firebase is based on Google Analytics, a free analytics solution that allows for unlimited data collection and analysis. With the Firebase SDK, you can define up to 500 distinct events that can be reported on by Firebase Analytics, which integrates across Firebase features. By understanding your users' behavior, you can make informed decisions regarding app marketing and performance optimization.

### Features

1. Unlimited Reporting -	Analytics provides unlimited reporting on up to 500 distinct events.
2. Audience Segmentation -	Custom audiences can be defined in the Firebase console based on device data, custom events, or user properties. These audiences can be used with other Firebase features when targeting new features or notification messages.

### How Firebase with Google Analytics Work

You can use Google Analytics to understand how people use your web, iOS, or Android app. You can define your own custom events to measure the things that matter most to your business using the SDK. The SDK captures a variety of events and user properties automatically. Using the Firebase console, you can view the data in a dashboard once it has been captured. You can view detailed data in this dashboard, including user demographics, active users, and items you've most recently purchased.

A number of other Firebase features are also integrated with Analytics. As an example, it logs events associated with notifications sent via the Notifications composer and provides reports on their effectiveness.

By analyzing user behavior, you can make informed decisions about how to market your app. Analyze how your campaigns perform across organic and paid channels to determine which methods produce the best results. Linking your Analytics data to BigQuery allows you to do more complex analysis, such as querying large data sets and joining data from multiple sources, if needed.

### How to integrate Firebase with Google Analytics

1. Connect your app to Firebase. 

Just add the Firebase SDK to your new or existing app, and data collection begins automatically. You can view analytics data in the Firebase console within hours.

2. Log custom data.

You can use Analytics to log custom events that make sense for your app, like E-Commerce purchases or achievements.

3. Create audiences.

You can define the audiences that matter to you in the Firebase console.

4. Target audiences	.
 
Use your custom audiences to target messages, promotions, or new app features using other Firebase features, such as FCM, and Remote Config.

## Full Example

### Result

After running the app you should see a screen like this:
![Firebase Google Analytics Tutorial](https://github.com/firebase/quickstart-android/raw/master/analytics/app/src/screen.png)


#### Step 1. Dependencies

We need to add some dependencies in our `app/build.gradle` file as shown below:


**(a). `build.gradle`**


> Our app-level `build.gradle`.

We Prepare our dependencies as shown below. You may use later versions.

Inside the android closure we will set the `compileSDKVersion` and `buildToolsVersion`. We will also set the application ID, minimum SDK version, target SDK version, version code and version name inside a `defaultConfig` closure. We will also set the build types: to either debug or release. For each build type you can enable minification of resources, as well as enable proguard.

We will enable view binding by setting the `viewBinding` property to true.

We then declare our app dependencies under the `dependencies` closure. We will need the following 9 dependencies:

1. Our `Material` library.
2. Our `Appcompat` library.
3. Our `Preference-ktx` library.
4. Our `Lifecycle-viewmodel-ktx` library.
5. Our `Firebase-bom` library.
6. Our `Com.google.firebase` library.


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
        applicationId "com.google.firebase.quickstart.analytics"
        minSdkVersion 19
        targetSdkVersion 33
        versionCode 1
        versionName "1.0"
        testInstrumentationRunner 'androidx.test.runner.AndroidJUnitRunner'
        multiDexEnabled true
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
    implementation 'androidx.appcompat:appcompat:1.5.1'
    implementation "androidx.preference:preference-ktx:1.2.0"
    // Needed to override the version used by preference-ktx
    implementation "androidx.lifecycle:lifecycle-viewmodel-ktx:2.5.1"

    // Import the Firebase BoM (see: https://firebase.google.com/docs/android/learn-more#bom)
    implementation platform('com.google.firebase:firebase-bom:30.5.0')

    // Firebase Analytics (Java)
    implementation 'com.google.firebase:firebase-analytics'

    // Firebase Analytics (Kotlin)
    implementation 'com.google.firebase:firebase-analytics-ktx'

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
          package="com.google.firebase.quickstart.analytics">

    <application
        android:allowBackup="true"
        android:icon="@mipmap/ic_launcher"
        android:label="@string/app_name"
        android:theme="@style/AppTheme">

        <activity
            android:name="com.google.firebase.quickstart.analytics.java.MainActivity"/>

        <activity
            android:name="com.google.firebase.quickstart.analytics.kotlin.MainActivity"/>

        <activity
            android:name="com.google.firebase.quickstart.analytics.EntryChoiceActivity"
            android:label="@string/app_name"
            android:exported="true">
            <intent-filter>
                <action android:name="android.intent.action.MAIN"/>

                <category android:name="android.intent.category.LAUNCHER"/>
            </intent-filter>
        </activity>

    </application>
</manifest>

```
#### Step 4. Create Menus

Create a directory known as `menu` inside your `res` directory and add the following menu files:


**(a). `main.xml`**


Inside your `/res/menu/` directory create a menu resource file named `main.xml` and add menu items as shown below:

```xml

<menu xmlns:android="http://schemas.android.com/apk/res/android" xmlns:app="http://schemas.android.com/apk/res-auto">
    <item android:id="@+id/menu_share" android:title="@string/menu_share" app:showAsAction="never" />
</menu>

```
#### Step 5. Design Layouts

In Android we design our UI interfaces using XML. So let's create the following layouts:


**(a). `fragment_main.xml`**


> Our `fragment_main` layout.

Inside your `/res/layout/` directory create an xml layout file named `fragment_main.xml`.

Design your XML layout using the following 3 UI widgets and ViewGroups:

1. [`FrameLayout`](https://android.camposha.info/en/framelayout)
2.[ `ImageView`](https://android.camposha.info/en/imageview)

```xml

<FrameLayout xmlns:android="http://schemas.android.com/apk/res/android"
                xmlns:tools="http://schemas.android.com/tools"
                android:layout_width="match_parent"
                android:layout_height="match_parent"
                android:paddingLeft="@dimen/activity_horizontal_margin"
                android:paddingRight="@dimen/activity_horizontal_margin"
                android:paddingTop="@dimen/activity_vertical_margin"
                android:paddingBottom="@dimen/activity_vertical_margin"
                tools:viewBindingIgnore="true"
                tools:context="com.google.firebase.quickstart.analytics.java.ImageFragment">

    <ImageView
        android:layout_width="wrap_content"
        android:layout_height="wrap_content"
        android:id="@+id/imageView"
        android:minHeight="256dp"
        android:minWidth="256dp"
        android:layout_gravity="center"
        android:elevation="2dp"
        android:scaleType="center"
        android:background="@drawable/circle"/>

</FrameLayout>

```

**(b). `activity_main.xml`**


> Our `activity_main` layout.

Inside your `/res/layout/` directory create an xml layout file named `activity_main.xml`.

Design your XML layout using the following 3 UI widgets and ViewGroups:

1. `androidx.viewpager.widget.ViewPager`
2. `androidx.viewpager.widget.PagerTabStrip`

```xml

<androidx.viewpager.widget.ViewPager xmlns:android="http://schemas.android.com/apk/res/android"
    xmlns:tools="http://schemas.android.com/tools"
    android:id="@+id/viewPager"
    android:layout_width="match_parent"
    android:layout_height="match_parent"
    tools:context="com.google.firebase.quickstart.analytics.java.MainActivity">

    <androidx.viewpager.widget.PagerTabStrip
        android:id="@+id/pagerTabStrip"
        android:layout_width="match_parent"
        android:layout_height="wrap_content"
        android:layout_gravity="top" />

</androidx.viewpager.widget.ViewPager>

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

class EntryChoiceActivity : BaseEntryChoiceActivity() {

    override fun getChoices(): List<Choice> {
        return listOf(
                Choice(
                        "Java",
                        "Run the Firebase Analytics quickstart written in Java.",
                        Intent(
                            this,
                            com.google.firebase.quickstart.analytics.java.MainActivity::class.java)),
                Choice(
                        "Kotlin",
                        "Run the Firebase Analytics quickstart written in Kotlin.",
                        Intent(
                            this,
                            com.google.firebase.quickstart.analytics.kotlin.MainActivity::class.java))
        )
    }
}


```

**(b). `ImageInfo.kt`**

> Our `ImageInfo` class.

Create a Kotlin file named `ImageInfo.kt`.


Here is the full code:

```kotlin
package replace_with_your_package_name

/**
 * Pair of resource IDs representing an image and its title.
 */
data class ImageInfo(val image: Int, val title: Int, val id: Int)

```

**(c). `ImageFragment.kt`**

> Our `ImageFragment` class.

Create a Kotlin file named `ImageFragment.kt`.

We will then add imports from android SDK and other packages. Here are some of the imports we will use in this class:

1. `Bundle` from the `android.os` package.
2. `LayoutInflater` from the `android.view` package.
3. `View` from the `android.view` package.
4. `ViewGroup` from the `android.view` package.
5. `ImageView` from the `android.widget` package.
6. `Fragment` from the `androidx.fragment.app` package.

Next create a class that derives from `Fragment` and add its contents as follows:

We will be overriding the following functions: 

1. `onCreate(savedInstanceState: Bundle?) `.

We will be creating the following methods:

1. `newInstance(parameter)` - Let's pass a `Int` object as a parameter.

**(a). Our `newInstance()` function**

Write the `newInstance()` function as follows:

```kotlin
        fun newInstance(resId: Int): ImageFragment {
            val fragment = ImageFragment()
            val args = Bundle()
            args.putInt(ARG_PATTERN, resId)
            fragment.arguments = args
            return fragment
        }
```


Here is the full code:

```kotlin
package replace_with_your_package_name

import android.os.Bundle
import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import android.widget.ImageView
import androidx.fragment.app.Fragment
import com.google.firebase.quickstart.analytics.R

/**
 * This fragment displays a featured, specified image.
 */
class ImageFragment : Fragment() {

    private var resId: Int = 0

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        arguments?.let {
            resId = it.getInt(ARG_PATTERN)
        }
    }

    override fun onCreateView(
        inflater: LayoutInflater,
        container: ViewGroup?,
        savedInstanceState: Bundle?
    ): View? {
        val view = inflater.inflate(R.layout.fragment_main, null)
        val imageView = view.findViewById<ImageView>(R.id.imageView)
        imageView.setImageResource(resId)

        return view
    }

    companion object {
        private const val ARG_PATTERN = "pattern"

        /**
         * Create a [ImageFragment] displaying the given image.
         *
         * @param resId to display as the featured image
         * @return a new instance of [ImageFragment]
         */
        fun newInstance(resId: Int): ImageFragment {
            val fragment = ImageFragment()
            val args = Bundle()
            args.putInt(ARG_PATTERN, resId)
            fragment.arguments = args
            return fragment
        }
    }
}


```

**(d). `MainActivity.kt`**

> Our `MainActivity` class.

Create a Kotlin file named `MainActivity.kt`.

We will then add imports from android SDK and other packages. Here are some of the imports we will use in this class:

1. `Log` from the `android.util` package.
2. [`Menu`](https://android.camposha.info/en/menu) from the `android.view` package.
3. `MenuItem` from the `android.view` package.
4. [`AlertDialog`](https://android.camposha.info/en/dialog) from the `androidx.appcompat.app` package.
5. [`AppCompatActivity`](https://android.camposha.info/en/activity) from the `androidx.appcompat.app` package.
6. [`Fragment`](https://android.camposha.info/en/fragment) from the `androidx.fragment.app` package.
7. `FragmentManager` from the `androidx.fragment.app` package.
8. [`FragmentPagerAdapter`](https://android.camposha.info/en/pageradapter) from the `androidx.fragment.app` package.
9. [`PreferenceManager`](https://android.camposha.info/en/prefrencex) from the `androidx.preference` package.
10. [`ViewPager`](https://android.camposha.info/en/viewpager) from the `androidx.viewpager.widget` package.

Next create a class that derives from `AppCompatActivity` and add its contents as follows:

We will be overriding the following functions: 

1. `onCreate(savedInstanceState: Bundle?) `.
2. `onPageSelected(position: Int) `.
3. `onCreateOptionsMenu(menu: Menu): Boolean `.
4. `onOptionsItemSelected(item: MenuItem): Boolean `.
5. `getItem(position: Int): Fragment `.
6. `getPageTitle(position: Int): CharSequence? `.

We will be creating the following methods:

1. `onResume() ` - When activity is resumed.
2. `askFavoriteFood() ` - Prompt user for favorite food
3. `getUserFavoriteFood(): String? ` -Retrieve a user's favorite food as a `String`.
4. `setUserFavoriteFood(parameter)` - Our function will take a `String` object as a parameter which is the favorite food
5. `getCurrentImageTitle(): String `.
6. `getCurrentImageId(): String `.
7. `recordImageView() `.
8. `recordScreenView() `.

**(a). Our `getCurrentImageId()` function**

Write the `getCurrentImageId()` function as follows:

```kotlin
    private fun getCurrentImageId(): String {
        val position = binding.viewPager.currentItem
        val info = IMAGE_INFOS[position]
        return getString(info.id)
    }
```

**(b). Our `recordScreenView()` function**

Write the `recordScreenView()` function as follows:

```kotlin
    private fun recordScreenView() {
        // This string must be <= 36 characters long.
        val screenName = "${getCurrentImageId()}-${getCurrentImageTitle()}"

        // [START set_current_screen]
        firebaseAnalytics.logEvent(FirebaseAnalytics.Event.SCREEN_VIEW) {
            param(FirebaseAnalytics.Param.SCREEN_NAME, screenName)
            param(FirebaseAnalytics.Param.SCREEN_CLASS, "MainActivity")
        }
        // [END set_current_screen]
    }
```

**(c). Our `onResume()` function**

Write the `onResume()` function as follows:

```kotlin
    public override fun onResume() {
        super.onResume()
        recordScreenView()
    }
```

**(d). Our `getUserFavoriteFood()` function**

Write the `getUserFavoriteFood()` function as follows:

```kotlin
    private fun getUserFavoriteFood(): String? {
        return PreferenceManager.getDefaultSharedPreferences(this)
                .getString(KEY_FAVORITE_FOOD, null)
    }
```

**(e). Our `setUserFavoriteFood()` function**

Write the `setUserFavoriteFood()` function as follows:

```kotlin
    private fun setUserFavoriteFood(food: String) {
        Log.d(TAG, "setFavoriteFood: $food")

        PreferenceManager.getDefaultSharedPreferences(this).edit()
                .putString(KEY_FAVORITE_FOOD, food)
                .apply()

        // [START user_property]
        firebaseAnalytics.setUserProperty("favorite_food", food)
        // [END user_property]
    }
```

**(f). Our `recordImageView()` function**

Write the `recordImageView()` function as follows:

```kotlin
    private fun recordImageView() {
        val id = getCurrentImageId()
        val name = getCurrentImageTitle()

        // [START image_view_event]
        firebaseAnalytics.logEvent(FirebaseAnalytics.Event.SELECT_ITEM) {
            param(FirebaseAnalytics.Param.ITEM_ID, id)
            param(FirebaseAnalytics.Param.ITEM_NAME, name)
            param(FirebaseAnalytics.Param.CONTENT_TYPE, "image")
        }
        // [END image_view_event]
    }
```

**(g). Our `askFavoriteFood()` function**

Write the `askFavoriteFood()` function as follows:

```kotlin
    private fun askFavoriteFood() {
        val choices = resources.getStringArray(R.array.food_items)
        val ad = AlertDialog.Builder(this)
                .setCancelable(false)
                .setTitle(R.string.food_dialog_title)
                .setItems(choices) { _, which ->
                    val food = choices[which]
                    setUserFavoriteFood(food)
                }.create()

        ad.show()
    }
```

**(h). Our `getCurrentImageTitle()` function**

Write the `getCurrentImageTitle()` function as follows:

```kotlin
    private fun getCurrentImageTitle(): String {
        val position = binding.viewPager.currentItem
        val info = IMAGE_INFOS[position]
        return getString(info.title)
    }
```


Here is the full code:

```kotlin
package replace_with_your_package_name

import android.annotation.SuppressLint
import android.content.Intent
import android.os.Bundle
import android.util.Log
import android.view.Menu
import android.view.MenuItem
import androidx.appcompat.app.AlertDialog
import androidx.appcompat.app.AppCompatActivity
import androidx.fragment.app.Fragment
import androidx.fragment.app.FragmentManager
import androidx.fragment.app.FragmentPagerAdapter
import androidx.preference.PreferenceManager
import androidx.viewpager.widget.ViewPager
import com.google.firebase.analytics.FirebaseAnalytics
import com.google.firebase.analytics.ktx.analytics
import com.google.firebase.analytics.ktx.logEvent
import com.google.firebase.ktx.Firebase
import com.google.firebase.quickstart.analytics.R
import com.google.firebase.quickstart.analytics.databinding.ActivityMainBinding
import java.util.Locale

/**
 * Activity which displays numerous background images that may be viewed. These background images
 * are shown via {@link ImageFragment}.
 */
class MainActivity : AppCompatActivity() {
    companion object {
        private const val TAG = "MainActivity"
        private const val KEY_FAVORITE_FOOD = "favorite_food"

        private val IMAGE_INFOS = arrayOf(
            ImageInfo(R.drawable.favorite, R.string.pattern1_title, R.string.pattern1_id),
            ImageInfo(R.drawable.flash, R.string.pattern2_title, R.string.pattern2_id),
            ImageInfo(R.drawable.face, R.string.pattern3_title, R.string.pattern3_id),
            ImageInfo(R.drawable.whitebalance, R.string.pattern4_title, R.string.pattern4_id)
        )
    }

    private lateinit var binding: ActivityMainBinding

    /**
     * The [androidx.viewpager.widget.PagerAdapter] that will provide fragments for each image.
     * This uses a [FragmentPagerAdapter], which keeps every loaded fragment in memory.
     */
    private lateinit var imagePagerAdapter: ImagePagerAdapter

    /**
     * The `FirebaseAnalytics` used to record screen views.
     */
    // [START declare_analytics]
    private lateinit var firebaseAnalytics: FirebaseAnalytics
    // [END declare_analytics]

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        binding = ActivityMainBinding.inflate(layoutInflater)
        setContentView(binding.root)

        // [START shared_app_measurement]
        // Obtain the FirebaseAnalytics instance.
        firebaseAnalytics = Firebase.analytics
        // [END shared_app_measurement]

        // On first app open, ask the user his/her favorite food. Then set this as a user property
        // on all subsequent opens.
        val userFavoriteFood = getUserFavoriteFood()
        if (userFavoriteFood == null) {
            askFavoriteFood()
        } else {
            setUserFavoriteFood(userFavoriteFood)
        }

        // Create the adapter that will return a fragment for each image.
        imagePagerAdapter = ImagePagerAdapter(supportFragmentManager, IMAGE_INFOS)

        // Set up the ViewPager with the pattern adapter.
        binding.viewPager.adapter = imagePagerAdapter

        // Workaround for AppCompat issue not showing ViewPager titles
        val params = binding.pagerTabStrip.layoutParams as ViewPager.LayoutParams
        params.isDecor = true

        // When the visible image changes, send a screen view hit.
        binding.viewPager.addOnPageChangeListener(object : ViewPager.SimpleOnPageChangeListener() {
            override fun onPageSelected(position: Int) {
                recordImageView()
                recordScreenView()
            }
        })

        // Send initial screen screen view hit.
        recordImageView()
    }

    public override fun onResume() {
        super.onResume()
        recordScreenView()
    }

    /**
     * Display a dialog prompting the user to pick a favorite food from a list, then record
     * the answer.
     */
    private fun askFavoriteFood() {
        val choices = resources.getStringArray(R.array.food_items)
        val ad = AlertDialog.Builder(this)
                .setCancelable(false)
                .setTitle(R.string.food_dialog_title)
                .setItems(choices) { _, which ->
                    val food = choices[which]
                    setUserFavoriteFood(food)
                }.create()

        ad.show()
    }

    /**
     * Get the user's favorite food from shared preferences.
     * @return favorite food, as a string.
     */
    private fun getUserFavoriteFood(): String? {
        return PreferenceManager.getDefaultSharedPreferences(this)
                .getString(KEY_FAVORITE_FOOD, null)
    }

    /**
     * Set the user's favorite food as an app measurement user property and in shared preferences.
     * @param food the user's favorite food.
     */
    private fun setUserFavoriteFood(food: String) {
        Log.d(TAG, "setFavoriteFood: $food")

        PreferenceManager.getDefaultSharedPreferences(this).edit()
                .putString(KEY_FAVORITE_FOOD, food)
                .apply()

        // [START user_property]
        firebaseAnalytics.setUserProperty("favorite_food", food)
        // [END user_property]
    }

    override fun onCreateOptionsMenu(menu: Menu): Boolean {
        menuInflater.inflate(R.menu.main, menu)
        return true
    }

    override fun onOptionsItemSelected(item: MenuItem): Boolean {
        val i = item.itemId
        if (i == R.id.menu_share) {
            val name = getCurrentImageTitle()
            val text = "I'd love you to hear about $name"

            val sendIntent = Intent()
            sendIntent.action = Intent.ACTION_SEND
            sendIntent.putExtra(Intent.EXTRA_TEXT, text)
            sendIntent.type = "text/plain"
            startActivity(sendIntent)

            // [START custom_event]
            firebaseAnalytics.logEvent("share_image") {
                param("image_name", name)
                param("full_text", text)
            }
            // [END custom_event]
        }
        return false
    }

    /**
     * Return the title of the currently displayed image.
     *
     * @return title of image
     */
    private fun getCurrentImageTitle(): String {
        val position = binding.viewPager.currentItem
        val info = IMAGE_INFOS[position]
        return getString(info.title)
    }

    /**
     * Return the id of the currently displayed image.
     *
     * @return id of image
     */
    private fun getCurrentImageId(): String {
        val position = binding.viewPager.currentItem
        val info = IMAGE_INFOS[position]
        return getString(info.id)
    }

    /**
     * Record a screen view for the visible [ImageFragment] displayed
     * inside [FragmentPagerAdapter].
     */
    private fun recordImageView() {
        val id = getCurrentImageId()
        val name = getCurrentImageTitle()

        // [START image_view_event]
        firebaseAnalytics.logEvent(FirebaseAnalytics.Event.SELECT_ITEM) {
            param(FirebaseAnalytics.Param.ITEM_ID, id)
            param(FirebaseAnalytics.Param.ITEM_NAME, name)
            param(FirebaseAnalytics.Param.CONTENT_TYPE, "image")
        }
        // [END image_view_event]
    }

    /**
     * This sample has a single Activity, so we need to manually record "screen views" as
     * we change fragments.
     */
    private fun recordScreenView() {
        // This string must be <= 36 characters long.
        val screenName = "${getCurrentImageId()}-${getCurrentImageTitle()}"

        // [START set_current_screen]
        firebaseAnalytics.logEvent(FirebaseAnalytics.Event.SCREEN_VIEW) {
            param(FirebaseAnalytics.Param.SCREEN_NAME, screenName)
            param(FirebaseAnalytics.Param.SCREEN_CLASS, "MainActivity")
        }
        // [END set_current_screen]
    }

    /**
     * A [FragmentPagerAdapter] that returns a fragment corresponding to
     * one of the sections/tabs/pages.
     */
    @SuppressLint("WrongConstant")
    inner class ImagePagerAdapter(
        fm: FragmentManager,
        private val infos: Array<ImageInfo>
    ) : FragmentPagerAdapter(fm, BEHAVIOR_RESUME_ONLY_CURRENT_FRAGMENT) {

        override fun getItem(position: Int): Fragment {
            val info = infos[position]
            return ImageFragment.newInstance(info.image)
        }

        override fun getCount() = infos.size

        override fun getPageTitle(position: Int): CharSequence? {
            if (position < 0 || position >= infos.size) {
                return null
            }
            val l = Locale.getDefault()
            val info = infos[position]
            return getString(info.title).toUpperCase(l)
        }
    }
}


```

### Reference

Below are the reference links:

|No.|Link|
|--|---|
|2.|Read more [here](https://github.com/firebase/quickstart-android/blob/master/analytics/README.md).|
|3.|Follow code author [here](https://github.com/quickstart-android).|
