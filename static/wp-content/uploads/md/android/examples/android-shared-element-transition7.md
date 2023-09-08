# Shared Element Transition Examples


According to android documentation,  **shared elements** transition determines how views that are shared between two activities transition between these activities. For example, if two activities have the same image in different positions and sizes, the _changeImageTransform_ shared element transition translates and scales the image smoothly between these activities.

This thread looks at examples and libraries relating to Shared Transitions in android. Feel free to contribute more examples, links and libraries.


We will look at several examples.

## Example 1: Kotlin Android Shared Element Transition Step by Step

Let's start by looking a at a simple step step shared element transition in Kotlin. We will be using `ActivityOptions.makeSceneTransitionAnimation` to transition using a shared view as the epicenter of the transition.

### Step 1: Create Android Project

Start by creating a Kotlin Android project in android studio.

### Step 2: Dependencies

No third party dependency is needed for this project.

### Step 3: Create Transition Animations

1. In your `res` directory create a folder called `transition`
2. Add the following transition animations.

**move_image.xml**

Transition animation to move image

```xml
<?xml version="1.0" encoding="utf-8"?>
<transitionSet>
  <changeBounds/>
  <changeImageTransform/>
</transitionSet>
```

**explode.xml**

Explode animation:

```xml
<?xml version="1.0" encoding="utf-8"?>
<explode/>
```

### Step 4: Create Custom Theme

In your Styles value resource file, create our custom theme for our activity, known as `ActivityTransitionTheme`.

```xml
    <style name="ActivityTransitionTheme"
        parent="Theme.AppCompat.Light.DarkActionBar"
        tools:targetApi="lollipop">
        <item name="android:windowEnterTransition">@transition/explode</item>
        <item name="android:windowExitTransition">@transition/explode</item>
        <item name="android:windowSharedElementEnterTransition">@transition/move_image</item>
        <item name="android:windowSharedElementExitTransition">@transition/move_image</item>
        <item name="android:windowAllowReturnTransitionOverlap">true</item>
        <item name="android:windowAllowEnterTransitionOverlap">false</item>
    </style>
```

Then in your `AndroidManifest.xml`, apply the theme to our two activities as follows:

```xml
        <activity
            android:name=".animation.ActivityTransition"
            android:enabled="@bool/atLeastLRelease"
            android:label="Animation/Activity Transition"
            android:theme="@style/ActivityTransitionTheme">
            <intent-filter>
                <action android:name="android.intent.action.MAIN" />
                <category android:name="android.intent.category.SAMPLE_CODE" />
            </intent-filter>
        </activity>
```

and for the detail activity:

```xml
  <activity
            android:name=".animation.ActivityTransitionDetails"
            android:enabled="@bool/atLeastLRelease"
            android:label="Animation/Details of a specific thingy"
            android:theme="@style/ActivityTransitionTheme">
            <intent-filter>
                <action android:name="android.intent.action.MAIN" />
            </intent-filter>
        </activity>
```

### Step 5: Design Layouts

In this case we will design two layouts, one for the master activity while the other dor the detail activity.

#### Master Activity Layout

**image_block.xml**

Add several images in a scrollview as follows:

```xml
<?xml version="1.0" encoding="utf-8"?>

<GridLayout xmlns:android="http://schemas.android.com/apk/res/android"
    xmlns:tools="http://schemas.android.com/tools"
    android:layout_width="match_parent"
    android:layout_height="match_parent"
    android:clipChildren="true"
    android:columnCount="2"
    android:rowCount="4"
    tools:ignore="ContentDescription"
    tools:targetApi="lollipop">

    <ImageView
        android:id="@+id/ducky"
        android:layout_width="wrap_content"
        android:layout_height="wrap_content"
        android:layout_column="0"
        android:layout_row="0"
        android:onClick="clicked"
        android:scaleType="centerCrop"
        android:src="@drawable/ducky"
        android:transitionName="ducky" />

    <ImageView
        android:id="@+id/woot"
        android:layout_width="wrap_content"
        android:layout_height="wrap_content"
        android:layout_column="1"
        android:layout_row="0"
        android:onClick="clicked"
        android:scaleType="centerCrop"
        android:src="@drawable/woot"
        android:transitionName="woot" />

    <ImageView
        android:id="@+id/ball"
        android:layout_width="wrap_content"
        android:layout_height="wrap_content"
        android:layout_column="0"
        android:layout_row="1"
        android:onClick="clicked"
        android:scaleType="centerCrop"
        android:src="@drawable/ball"
        android:transitionName="ball" />

    <ImageView
        android:id="@+id/block"
        android:layout_width="wrap_content"
        android:layout_height="wrap_content"
        android:layout_column="1"
        android:layout_row="1"
        android:onClick="clicked"
        android:scaleType="centerCrop"
        android:src="@drawable/block"
        android:transitionName="block" />

    <ImageView
        android:id="@+id/jellies"
        android:layout_width="wrap_content"
        android:layout_height="wrap_content"
        android:layout_column="0"
        android:layout_row="2"
        android:onClick="clicked"
        android:scaleType="centerCrop"
        android:src="@drawable/jellies"
        android:transitionName="jellies" />

    <ImageView
        android:id="@+id/mug"
        android:layout_width="wrap_content"
        android:layout_height="wrap_content"
        android:layout_column="1"
        android:layout_row="2"
        android:onClick="clicked"
        android:scaleType="centerCrop"
        android:src="@drawable/mug"
        android:transitionName="mug" />

    <ImageView
        android:id="@+id/pencil"
        android:layout_width="wrap_content"
        android:layout_height="wrap_content"
        android:layout_column="0"
        android:layout_row="3"
        android:onClick="clicked"
        android:scaleType="centerCrop"
        android:src="@drawable/pencil"
        android:transitionName="pencil" />

    <ImageView
        android:id="@+id/scissors"
        android:layout_width="wrap_content"
        android:layout_height="wrap_content"
        android:layout_column="1"
        android:layout_row="3"
        android:onClick="clicked"
        android:scaleType="centerCrop"
        android:src="@drawable/scissors"
        android:transitionName="scissors" />
</GridLayout>
```

This will be the layout for our master activity.

#### Detail Activity Layout

This will be the layout for our detail activity. This is the activity we will be transitioning to.

**image-detail.xml**

```xml
<?xml version="1.0" encoding="utf-8"?>

<LinearLayout xmlns:android="http://schemas.android.com/apk/res/android"
    xmlns:tools="http://schemas.android.com/tools"
    android:layout_width="match_parent"
    android:layout_height="match_parent"
    android:orientation="vertical"
    tools:ignore="HardcodedText,ContentDescription"
    tools:targetApi="lollipop">

    <ImageView
        android:id="@+id/titleImage"
        android:layout_width="match_parent"
        android:layout_height="0px"
        android:layout_weight="1"
        android:onClick="clicked"
        android:scaleType="centerCrop"
        android:transitionName="hero" />

    <LinearLayout
        android:layout_width="match_parent"
        android:layout_height="0px"
        android:layout_weight="2"
        android:orientation="vertical">

        <View
            android:layout_width="match_parent"
            android:layout_height="2dp"
            android:background="#808080" />

        <TextView
            android:layout_width="match_parent"
            android:layout_height="wrap_content"
            android:text="Ducky"
            android:textColor="#FFF"
            android:textSize="30sp" />

        <View
            android:layout_width="match_parent"
            android:layout_height="2dp"
            android:background="#808080" />

        <TextView
            android:layout_width="match_parent"
            android:layout_height="wrap_content"
            android:text="Woot!"
            android:textColor="#FFF"
            android:textSize="30sp" />

        <View
            android:layout_width="match_parent"
            android:layout_height="2dp"
            android:background="#808080" />

        <TextView
            android:layout_width="match_parent"
            android:layout_height="wrap_content"
            android:text="Ball"
            android:textColor="#FFF"
            android:textSize="30sp" />

        <View
            android:layout_width="match_parent"
            android:layout_height="2dp"
            android:background="#808080" />

        <TextView
            android:layout_width="match_parent"
            android:layout_height="wrap_content"
            android:text="Block"
            android:textColor="#FFF"
            android:textSize="30sp" />

        <View
            android:layout_width="match_parent"
            android:layout_height="2dp"
            android:background="#808080" />

        <TextView
            android:layout_width="match_parent"
            android:layout_height="wrap_content"
            android:text="Jelly Bean"
            android:textColor="#FFF"
            android:textSize="30sp" />

        <View
            android:layout_width="match_parent"
            android:layout_height="2dp"
            android:background="#808080" />

        <TextView
            android:layout_width="match_parent"
            android:layout_height="wrap_content"
            android:text="Mug"
            android:textColor="#FFF"
            android:textSize="30sp" />

        <View
            android:layout_width="match_parent"
            android:layout_height="2dp"
            android:background="#808080" />

        <TextView
            android:layout_width="match_parent"
            android:layout_height="wrap_content"
            android:text="Pencil"
            android:textColor="#FFF"
            android:textSize="30sp" />

        <View
            android:layout_width="match_parent"
            android:layout_height="2dp"
            android:background="#808080" />

        <TextView
            android:layout_width="match_parent"
            android:layout_height="wrap_content"
            android:text="Scissors"
            android:textColor="#FFF"
            android:textSize="30sp" />

    </LinearLayout>
</LinearLayout>
```

### Step 6: Create Master Activity

The master activity is our home activity. The activity from which we will be transitioning.

Start by addding imports:

```java
import android.annotation.TargetApi
import android.app.ActivityOptions
import android.app.SharedElementCallback
import android.content.Intent
import android.graphics.drawable.ColorDrawable
import android.os.Build
import android.os.Bundle
import android.view.View
import android.widget.ImageView
import androidx.appcompat.app.AppCompatActivity
import com.example.android.apis.R
```

Then we cretae our activity by extending the `AppCompatActivity`:

The xml layout file `layout/image_block.xml` sets `android:onClick="clicked"` to use for each thumbnail in the GridLayout and the `clicked()` method creates an intent to launch `ActivityTransitionDetails.class` using a bundle containing an `ActivityOptions.makeSceneTransitionAnimation()` which causes the thumbnail to "expand" into the image detail version. When the ImageView in the image detail version is clicked, the reverse transition to ActivityTransition activity occurs. The animation is set up using `AndroidManifest android:theme="@style/ActivityTransitionTheme"` which contains elements which point to files in `res/transition`.

```kotlin

@Suppress("MemberVisibilityCanBePrivate")
@TargetApi(Build.VERSION_CODES.LOLLIPOP)
class ActivityTransition : AppCompatActivity() {
```

This is the [`ImageView`] in our `GridView` which was clicked, and which we "share" during the transition to [`ActivityTransitionDetails`] and back again.

```kotlin
    private var mHero: ImageView? = null
```

Our `onCreate()` is called when the activity is starting. First we call through to our super's implementation of `onCreate`. Then we set a random background color for our window chosen by our method [randomColor], and set our content view to our layout file `R.layout.image_block`.

Finally we call our method [`setupHero`] which sets up the transition "hero" if the activity was launched by a `clicked()` return from the activity `ActivityTransitionDetails`. (If the back button was pushed instead, `onCreate` is not called again and the background color remains the same.)

- `@param savedInstanceState -` we do not override `onSaveInstanceState` so do not use.

```kotlin
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        window.setBackgroundDrawable(ColorDrawable(randomColor()))
        setContentView(R.layout.image_block)
        setupHero()
    }
```

Our `setupHero()`function sets up the [`SharedElementCallback`] for a `clicked()` return from [`ActivityTransitionDetails`], does nothing on an initial launching. We retrieve the extra stored under the key KEY_ID ("ViewTransitionValues:id") in the [`Intent`] that launched us in order to initialize `String name`. We set our [ImageView] field [mHero] to _null_, then if `name` is not _null_ (the KEY_ID extra was found) we set [mHero] by finding the resource id corresponding to `name` returned by our method [getIdForKey] then finding the [ImageView] in our layout with that id.

Finally we set the shared element callback to an anonymous class using the method `setEnterSharedElementCallback`. That anonymous class adds `mHero` to the `sharedElements` map passed to its override of the `onMapSharedElements` method under the key "hero".

```kotlin
    private fun setupHero() {
        val name = intent.getStringExtra(KEY_ID)
        mHero = null
        if (name != null) {
            mHero = findViewById(getIdForKey(name))
            setEnterSharedElementCallback(object : SharedElementCallback() {
                /**
                 * Lets the [SharedElementCallback] adjust the mapping of shared element names to
                 * [View]'s. We just add our [ImageView] field [mHero] to our argument
                 * `sharedElements` under the key "hero".
                 *
                 * @param names The names of all shared elements transferred from the calling Activity
                 * or Fragment in the order they were provided.
                 * @param sharedElements The mapping of shared element names to Views. The best guess
                 * will be filled into sharedElements based on the transitionNames.
                 */
                override fun onMapSharedElements(names: List<String>,
                                                 sharedElements: MutableMap<String, View>) {
                    sharedElements["hero"] = mHero as View
                }
            })
        }
    }
```

The below `clicked()` function is called by each [ImageView] in `image_block.xml's` GridView using the attribute `android:onClick="clicked"`. First we set our [ImageView] field [`mHero`] to the `View v` that was clicked. Then we create [Intent] `intent` with the activity `ActivityTransitionDetails` as the class that is to be launched by the intent. We initialize `String transitionName` to the transition name of `v` (this is set by the android:transitionName attribute of the view in the layout file).

We add `transitionName` as an extra to `intent` using the key KEY_ID ("ViewTransitionValues:id"). We create `ActivityOptions activityOptions` by calling the method `makeSceneTransitionAnimation` to create an [ActivityOptions] that uses [`mHero`] as the [View] to transition to in the started Activity, and "hero" as the shared element name as used in the target Activity. We then start the activity specified by our `intent` with a "bundled up" `activityOptions` as the bundle (this all causes the transition between our activities to use cross-Activity scene animations with `mHero` as the epicenter of the transition).

- `@param v View` - in the GridView which has been clicked

```kotlin
    @TargetApi(Build.VERSION_CODES.LOLLIPOP)
    fun clicked(v: View) {
        mHero = v as ImageView
        val intent = Intent(this, ActivityTransitionDetails::class.java)
        val transitionName = v.getTransitionName()
        intent.putExtra(KEY_ID, transitionName)
        val activityOptions = ActivityOptions.makeSceneTransitionAnimation(
                this, mHero,
                "hero"
        )
        startActivity(intent, activityOptions.toBundle())
    }
```

Our static constants, and methods.

```kotlin
    companion object {
        /**
         * A TAG that could be used for logging but isn't
         */
        @Suppress("unused")
        private const val TAG = "ActivityTransition"
```

Key used to store the transition name in the extra of the `Intent` that is used to launch both us and `ActivityTransitionDetails`:

```kotlin
        private const val KEY_ID = "ViewTransitionValues:id"
```

This is the list of the jpg drawables which populates our `GridView`:

```kotlin
        val DRAWABLES = intArrayOf(
                R.drawable.ball, R.drawable.block, R.drawable.ducky, R.drawable.jellies,
                R.drawable.mug, R.drawable.pencil, R.drawable.scissors, R.drawable.woot
        )
```

This is the list of the resource ids of the `ImageView`s in our layout file's `GridView` (file `layout/image_block.xml`)

```kotlin
        val IDS = intArrayOf(
                R.id.ball, R.id.block, R.id.ducky, R.id.jellies,
                R.id.mug, R.id.pencil, R.id.scissors, R.id.woot
        )
```

String name of the `ImageView`s in our layout file, used as the `android:transitionName` attribute for the respective `ImageView` in our layout file's `GridView` and passed as an extra to the `Intent` that launches both us and `ActivityTransitionDetails` stored under the key KEY_ID ("ViewTransitionValues:id")

```kotlin
        val NAMES = arrayOf(
                "ball", "block", "ducky", "jellies", "mug", "pencil", "scissors", "woot"
        )
```

Passed a string name of an item returns the R.id.\* for the thumbnail in the layout. We call our method `getIndexForKey(id)` to convert the `String id` to the index in the `String[] NAMES` array which is occupied by an equal string, then use that index to access the corresponding entry in the `int[] IDS` array which we return to our caller.

- @param id String name of item
- @return Resource R.id.\* of that item in layout

```kotlin
        fun getIdForKey(id: String): Int {
            return IDS[getIndexForKey(id)]
        }
```

Passed a string name of an item returns the R.drawable.\* for the image. We call our method `getIndexForKey(id)` to convert the `String id` to the index in the `String[] NAMES` array which is occupied by an equal string, then use that index to access the corresponding entry in the `int[] DRAWABLES` array which we return to our caller.

- `@param id` String name of item
- `@return R.drawable.*` for the image

```kotlin
        fun getDrawableIdForKey(id: String): Int {
            return DRAWABLES[getIndexForKey(id)]
        }
```

Searches the array of names of id string and returns the index number for that string. We loop over `int i` for all of the strings in `String[] NAMES` setting `String name` to the current `NAMES[ i ]` then if `name` is equal to our argument `String id` we return `i` to the caller. If none of the strings in `NAMES` match `id` we return 2 to the caller.

- `@param id` : String name of an item \* `@return` Index in the arrays for it (or "2" if not found)

```kotlin
        fun getIndexForKey(id: String): Int {
            for (i in NAMES.indices) {
                val name = NAMES[i]
                if (name == id) {
                    return i
                }
            }
            return 2
        }
```

Create a random color with maximum alpha and the three RGB colors <=128 intensity.

- `@return` Random color
    
    ```kotlin
        private fun randomColor(): Int {
            val red = (Math.random() * 128).toInt()
            val green = (Math.random() * 128).toInt()
            val blue = (Math.random() * 128).toInt()
            return -0x1000000 or (red shl 16) or (green shl 8) or blue
        }
    }
    }
    ```
    
    Here is the full code:
    

**ActivityTransition.kt**

```kotlin
package com.example.android.apis.animation

import android.annotation.TargetApi
import android.app.ActivityOptions
import android.app.SharedElementCallback
import android.content.Intent
import android.graphics.drawable.ColorDrawable
import android.os.Build
import android.os.Bundle
import android.view.View
import android.widget.ImageView
import androidx.appcompat.app.AppCompatActivity
import com.example.android.apis.R

@Suppress("MemberVisibilityCanBePrivate")
@TargetApi(Build.VERSION_CODES.LOLLIPOP)
class ActivityTransition : AppCompatActivity() {

    private var mHero: ImageView? = null

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        window.setBackgroundDrawable(ColorDrawable(randomColor()))
        setContentView(R.layout.image_block)
        setupHero()
    }

    private fun setupHero() {
        val name = intent.getStringExtra(KEY_ID)
        mHero = null
        if (name != null) {
            mHero = findViewById(getIdForKey(name))
            setEnterSharedElementCallback(object : SharedElementCallback() {

                override fun onMapSharedElements(names: List<String>,
                                                 sharedElements: MutableMap<String, View>) {
                    sharedElements["hero"] = mHero as View
                }
            })
        }
    }

    @TargetApi(Build.VERSION_CODES.LOLLIPOP)
    fun clicked(v: View) {
        mHero = v as ImageView
        val intent = Intent(this, ActivityTransitionDetails::class.java)
        val transitionName = v.getTransitionName()
        intent.putExtra(KEY_ID, transitionName)
        val activityOptions = ActivityOptions.makeSceneTransitionAnimation(
                this, mHero,
                "hero"
        )
        startActivity(intent, activityOptions.toBundle())
    }

    companion object {

        @Suppress("unused")
        private const val TAG = "ActivityTransition"

        private const val KEY_ID = "ViewTransitionValues:id"

        val DRAWABLES = intArrayOf(
                R.drawable.ball, R.drawable.block, R.drawable.ducky, R.drawable.jellies,
                R.drawable.mug, R.drawable.pencil, R.drawable.scissors, R.drawable.woot
        )

        val IDS = intArrayOf(
                R.id.ball, R.id.block, R.id.ducky, R.id.jellies,
                R.id.mug, R.id.pencil, R.id.scissors, R.id.woot
        )

        val NAMES = arrayOf(
                "ball", "block", "ducky", "jellies", "mug", "pencil", "scissors", "woot"
        )

        fun getIdForKey(id: String): Int {
            return IDS[getIndexForKey(id)]
        }

        fun getDrawableIdForKey(id: String): Int {
            return DRAWABLES[getIndexForKey(id)]
        }

        fun getIndexForKey(id: String): Int {
            for (i in NAMES.indices) {
                val name = NAMES[i]
                if (name == id) {
                    return i
                }
            }
            return 2
        }

        private fun randomColor(): Int {
            val red = (Math.random() * 128).toInt()
            val green = (Math.random() * 128).toInt()
            val blue = (Math.random() * 128).toInt()
            return -0x1000000 or (red shl 16) or (green shl 8) or blue
        }
    }
}
```

### Step 7: Create DetailActivity

This is the activity to which we will be transitioning. It is the companion activity for the `ActivityTransition` demo, and displays an enlarged version of an `ImageView` when it is clicked, with fancy activity transition between the two activities.

Start by adding imports:

```kotlin
import android.annotation.SuppressLint
import android.annotation.TargetApi
import android.app.ActivityOptions
import android.content.Intent
import android.graphics.drawable.ColorDrawable
import android.graphics.drawable.Drawable
import android.os.Build
import android.os.Bundle
import android.view.View
import android.widget.ImageView
import androidx.appcompat.app.AppCompatActivity
import com.example.android.apis.R
```

Then extend the `AppCompatActivity`:

```kotlin
class ActivityTransitionDetails : AppCompatActivity() {
```

Resource id of the image we were launched to display, we look it up using the method `ActivityTransition.getDrawableIdForKey` based on the string stored as an extra under the key KEY_ID in the intent that launched us. We default to R.drawable.ducky

```kotlin
    private var mImageResourceId = R.drawable.ducky
```

String stored as an extra under the key KEY_ID in the intent that launched us. We default to "ducky"

```kotlin
    private var mName = "ducky"
```

The following property retrieves a drawable based on the name stored as an extra in the Intent launching the activity under the key KEY_ID. First we initialize `String name` by retrieving the string stored in the intent that launched us under the key KEY_ID ("ViewTransitionValues:id"), if that is not null we set our field `String mName` to it and set our field `int mImageResourceId` to the resource id that the method `ActivityTransition.getDrawableIdForKey` finds for the string `name` (these default to "ducky" and R.drawable.ducky respectively if for some reason the Intent did not contain a KEY_ID name).

We declare `Drawable drawable`, and if the build version is less than or equal to LOLLIPOP we set `drawable` using the old deprecated one argument version of `getDrawable` for the resource id `mImageResourceId`, otherwise we use the new two argument version of `getDrawable` to set it.

Finally we:

- return `drawable` to the caller.
- @return Drawable to be displayed full size

```kotlin
    @Suppress("DEPRECATION")
    private val heroDrawable: Drawable
        @SuppressLint("UseCompatLoadingForDrawables")
        get() {
            val name = intent.getStringExtra(KEY_ID)
            if (name != null) {
                mName = name
                mImageResourceId = ActivityTransition.getDrawableIdForKey(name)
            }

            return if (Build.VERSION.SDK_INT <= Build.VERSION_CODES.LOLLIPOP) {
                resources.getDrawable(mImageResourceId)
            } else {
                resources.getDrawable(mImageResourceId, null)
            }
        }
```

Our `onCreate()` function is called when the activity is starting. First we call through to our super's implementation of `onCreate`. We set the background to a random color, and then we set our content view to our layout file R.layout.image_details.

We initialize `ImageView titleImage` by finding the view with the id R.id.titleImage, then set its drawable to the image that our method `getHeroDrawable` finds that corresponds to the name string stored under the key KEY_ID in the Intent which launched our activity.

- `@param savedInstanceState` - we do not override `onSaveInstanceState` so do not use.

```kotlin
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        window.setBackgroundDrawable(ColorDrawable(randomColor()))
        setContentView(R.layout.image_details)
        val titleImage = findViewById<ImageView>(R.id.titleImage)
        titleImage.setImageDrawable(heroDrawable)
    }
```

This method, the `clicked()`, is specified as the click callback for the full sized ImageView using `android:onClick="clicked"` in the `image_details.xml` layout file. That ImageView contains an android:transitionName element naming the transitionName "hero" and is used to put an `ActivityOptions.makeSceneTransitionAnimation` into the bundle used with the Intent to launch ActivityTransition.class

First we create `Intent intent` with `ActivityTransition` as the target activity to launch. Then we add `mName` as an extra under the key KEY_ID. We create the scene transition animation `ActivityOptions activityOptions` using the shared element name "hero", then start the activity specified in `Intent intent` with a bundled up `activityOptions` as additional options for how the Activity should be started.

- `@param v ImageView` - R.id.titleImage clicked on

```kotlin
    @TargetApi(Build.VERSION_CODES.LOLLIPOP)
    fun clicked(v: View) {
        val intent = Intent(this, ActivityTransition::class.java)
        intent.putExtra(KEY_ID, mName)
        val activityOptions = ActivityOptions.makeSceneTransitionAnimation(
                this,
                v,
                "hero"
        )
        startActivity(intent, activityOptions.toBundle())
    }
```

Contains our static constants and methods:

```
    companion object {

        /**
         * TAG that could be used for logging (but isn't)
         */
        @Suppress("unused")
        private const val TAG = "ActivityTransitionDetails"

        /**
         * Key used to store the transition name in the extra of the `Intent` that is used to
         * launch both us and `ActivityTransition`
         */
        private const val KEY_ID = "ViewTransitionValues:id"
```

Create a random color with maximum alpha and the three RGB colors <=128 intensity

- @return Random color

```kotlin
        private fun randomColor(): Int {
            val red = (Math.random() * 128).toInt()
            val green = (Math.random() * 128).toInt()
            val blue = (Math.random() * 128).toInt()
            return -0x1000000 or (red shl 16) or (green shl 8) or blue
        }
    }
}
```

Here's the full code:

**ActivityTransitionDetails.kt**

```kotlin

import android.annotation.SuppressLint
import android.annotation.TargetApi
import android.app.ActivityOptions
import android.content.Intent
import android.graphics.drawable.ColorDrawable
import android.graphics.drawable.Drawable
import android.os.Build
import android.os.Bundle
import android.view.View
import android.widget.ImageView
import androidx.appcompat.app.AppCompatActivity
import com.example.android.apis.R

class ActivityTransitionDetails : AppCompatActivity() {

    private var mImageResourceId = R.drawable.ducky

    private var mName = "ducky"

    @Suppress("DEPRECATION")
    private val heroDrawable: Drawable
        @SuppressLint("UseCompatLoadingForDrawables")
        get() {
            val name = intent.getStringExtra(KEY_ID)
            if (name != null) {
                mName = name
                mImageResourceId = ActivityTransition.getDrawableIdForKey(name)
            }

            return if (Build.VERSION.SDK_INT <= Build.VERSION_CODES.LOLLIPOP) {
                resources.getDrawable(mImageResourceId)
            } else {
                resources.getDrawable(mImageResourceId, null)
            }
        }

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        window.setBackgroundDrawable(ColorDrawable(randomColor()))
        setContentView(R.layout.image_details)
        val titleImage = findViewById<ImageView>(R.id.titleImage)
        titleImage.setImageDrawable(heroDrawable)
    }

    @TargetApi(Build.VERSION_CODES.LOLLIPOP)
    fun clicked(v: View) {
        val intent = Intent(this, ActivityTransition::class.java)
        intent.putExtra(KEY_ID, mName)
        val activityOptions = ActivityOptions.makeSceneTransitionAnimation(
                this,
                v,
                "hero"
        )
        startActivity(intent, activityOptions.toBundle())
    }

    companion object {

        @Suppress("unused")
        private const val TAG = "ActivityTransitionDetails"

        private const val KEY_ID = "ViewTransitionValues:id"

        private fun randomColor(): Int {
            val red = (Math.random() * 128).toInt()
            val green = (Math.random() * 128).toInt()
            val blue = (Math.random() * 128).toInt()
            return -0x1000000 or (red shl 16) or (green shl 8) or blue
        }
    }
}
```

### Step 8: Run

1. Copy the code above into your project
2. Run

The code was written by [@markgray](https://github.com/markgray/)

## Example 2: SharedTransition on Images using Transitional ImageView

You can easily implement shared element transition on images using this library known as Transitional ImageView.

Let's show you how to.

### Step 1 - Install the Library

First register jitpack as a repository in your app level build.gradle:

```groovy
allprojects {
    repositories {
        ...
        maven { url 'https://jitpack.io' }
    }
}
```

```groovy
allprojects {
    repositories {
        ...
        maven { url 'https://jitpack.io' }
    }
}
```

Then install the library:

```groovy
implementation 'com.github.mostafaaryan:transitional-imageview:v0.2.2'
```

```groovy
implementation 'com.github.mostafaaryan:transitional-imageview:v0.2.2'
```

### Step 2

Create Transitional ImageView in your layout by pasting the following code:

```xml
<com.mostafaaryan.transitionalimageview.TransitionalImageView
        android:id="@+id/transitional_image"
        android:layout_width="100dp"
        android:layout_height="wrap_content"
        android:scaleType="fitXY"
        android:adjustViewBounds="true"
        app:res_id="@drawable/sample_image" />
```

```xml
<com.mostafaaryan.transitionalimageview.TransitionalImageView
        android:id="@+id/transitional_image"
        android:layout_width="100dp"
        android:layout_height="wrap_content"
        android:scaleType="fitXY"
        android:adjustViewBounds="true"
        app:res_id="@drawable/sample_image" />
```

### Step 3

Now build a TransitionImageObject and set it to the TransitionalImageView:

```xml
<com.mostafaaryan.transitionalimageview.TransitionalImageView
        android:id="@+id/transitional_image"
        android:layout_width="100dp"
        android:layout_height="wrap_content"
        android:scaleType="fitXY"
        android:adjustViewBounds="true"
        app:res_id="@drawable/sample_image" />
```

Then:

```java
TransitionalImageView transitionalImageView = (TransitionalImageView) findViewById(R.id.transitional_image);
TransitionalImage transitionalImage = new TransitionalImage.Builder()
                                    .duration(500)
                                    .backgroundColor(ContextCompat.getColor(MainActivity.this, R.color.color))
                                    .image(R.drawable.sample_image)
                                    /* or */
                                    .image(bitmap)
                                    .create();
transitionalImageView.setTransitionalImage(transitionalImage);
```

### Full Example

Here is a beautiful example for using this library.

**(a). Shoe.java**

The model class to define a single shoe.

```java
public class Shoe {

    private String Title;
    private String imageUrl;

    public Shoe(String title, String imageUrl) {
        Title = title;
        this.imageUrl = imageUrl;
    }

    public String getTitle() {
        return Title;
    }

    public String getImageUrl() {
        return imageUrl;
    }

}
```

**(b). ShoeAdapter.java**

Then the recyclerview adapter.

```java
import android.app.Activity;
import android.content.Context;
import android.graphics.Bitmap;
import android.os.AsyncTask;
import android.support.v4.content.ContextCompat;
import android.support.v7.widget.RecyclerView;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.ImageView;
import android.widget.LinearLayout;
import android.widget.TextView;

import com.ariannejad.mostafa.transitional_imageview_implementation.R;
import com.ariannejad.mostafa.transitional_imageview_implementation.controller.MainActivity;
import com.ariannejad.mostafa.transitional_imageview_implementation.model.Shoe;
import com.mostafaaryan.transitionalimageview.TransitionalImageView;
import com.mostafaaryan.transitionalimageview.model.TransitionalImage;
import com.squareup.picasso.Picasso;

import java.io.IOException;
import java.util.ArrayList;

/**
 * Created by Mostafa Aryan Nejad on 8/11/17.
 */

public class ShoeAdapter extends RecyclerView.Adapter<ShoeAdapter.ViewHolder> {

    Context mContext;
    ArrayList<Shoe> shoes = new ArrayList<>();

    public ShoeAdapter(Context context, ArrayList<Shoe> shoes) {
        mContext = context;
        this.shoes = shoes;
    }

    @Override
    public ViewHolder onCreateViewHolder(ViewGroup parent, int viewType) {
        View view = LayoutInflater.from(parent.getContext())
                .inflate(R.layout.item_shoe, parent, false);

        return new ViewHolder(view);
    }

    @Override
    public void onBindViewHolder(final ViewHolder holder, final int position) {

        final Shoe shoe = shoes.get(position);

        AsyncTask.execute(new Runnable() {
            @Override
            public void run() {
                try{

                    final Bitmap bitmap = Picasso.with(mContext).load(shoe.getImageUrl()).get();
                    ((Activity) mContext).runOnUiThread(new Runnable() {
                        @Override
                        public void run() {
                            TransitionalImage transitionalImage = new TransitionalImage.Builder()
                                    .duration(500)
                            /*.backgroundColor(ContextCompat.getColor(, R.color.colorAccent))*/
                                    /*.image(R.drawable.sample_image)*/
                                    .image(bitmap)
                                    .create();
                            holder.image.setTransitionalImage(transitionalImage);
                            bitmap.recycle();
                        }
                    });
                } catch (IOException e){e.printStackTrace();}
            }
        });

        holder.title.setText(shoe.getTitle());
        holder.sizes.setText("37,38,39,40");

    }

    @Override
    public int getItemCount() {
        return shoes.size();
    }

    public static class ViewHolder extends RecyclerView.ViewHolder {

        public TextView title;
        public TextView sizes;
        public TransitionalImageView image;

        public ViewHolder(View itemView) {
            super(itemView);

            title = (TextView) itemView.findViewById(R.id.shoe_title);
            sizes = (TextView) itemView.findViewById(R.id.shoe_sizes);
            image = (TransitionalImageView) itemView.findViewById(R.id.shoe_image);

        }

    }

}
```

**(c). ShoeListActivity.java**

The shoe list activity:

```java
import android.support.design.widget.AppBarLayout;
import android.support.design.widget.CollapsingToolbarLayout;
import android.support.design.widget.TabLayout;
import android.support.v7.app.ActionBar;
import android.support.v7.app.AppCompatActivity;
import android.os.Bundle;
import android.support.v7.widget.LinearLayoutManager;
import android.support.v7.widget.RecyclerView;
import android.support.v7.widget.Toolbar;

import com.ariannejad.mostafa.transitional_imageview_implementation.R;
import com.ariannejad.mostafa.transitional_imageview_implementation.adapter.ShoeAdapter;
import com.ariannejad.mostafa.transitional_imageview_implementation.model.Shoe;

import java.util.ArrayList;

public class ShoeListActivity extends AppCompatActivity {

    private RecyclerView shoeRecyclerView;
    private ArrayList<Shoe> shoes = new ArrayList<>();
    private ActionBar actionBar;
    private AppBarLayout appBarLayout;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_shoe_list);

        shoeRecyclerView = (RecyclerView) findViewById(R.id.shoe_recycler_view);
        CollapsingToolbarLayout collapsingToolbar =
                (CollapsingToolbarLayout) findViewById(R.id.collapsing_toolbar);
        appBarLayout = (AppBarLayout) findViewById(R.id.app_bar_layout);
        setOnOffsetChangedListener();
        collapsingToolbar.setTitleEnabled(false);
        Toolbar toolbar = (Toolbar) findViewById(R.id.toolbar);
        setSupportActionBar(toolbar);
        actionBar = getSupportActionBar();
        if(actionBar != null) actionBar.setTitle("");

        populateList();

    }

    private void populateList() {
        shoes.add(new Shoe("Skechers Relaxed Fit Empire Game On Walking Shoe",
                "https://www.shoes.com/pm/skech/skech800828_42965_hd2.jpg"));

        shoes.add(new Shoe("Skechers After Burn Memory Fit Geardo High Top Trainer",
                "https://www.shoes.com//pm/skech/skech798492_42965_hd2.jpg"));

        shoes.add(new Shoe("New Balance Fresh Foam Zante v3 Running Shoe",
                "https://www.shoes.com/pi/newba/hd/newba805216_436896_hd.jpg"));

        for(int i = 0 ; i <= 5 ; i++ ) {
            shoes.addAll(shoes);
        }

        displayList();
    }

    private void displayList() {
        RecyclerView.LayoutManager layoutManager = new LinearLayoutManager(this);
        RecyclerView.Adapter adapter = new ShoeAdapter(this, shoes);
        shoeRecyclerView.setLayoutManager(layoutManager);
        shoeRecyclerView.setAdapter(adapter);
    }

    private void setOnOffsetChangedListener() {

        appBarLayout.addOnOffsetChangedListener(new AppBarLayout.OnOffsetChangedListener() {

            boolean isDisplayed = false;

            @Override
            public void onOffsetChanged(AppBarLayout appBarLayout, int verticalOffset) {
                int totalScroll = appBarLayout.getTotalScrollRange();

                if (totalScroll + verticalOffset == 0) {
                    if (actionBar != null) {
                        actionBar.setTitle("Sneakers");
                    }
                    isDisplayed = true;
                } else if (isDisplayed) {
                    if (actionBar != null)
                        actionBar.setTitle("");
                    isDisplayed = false;
                }
            }

        });

    }

}
```

**(d). MainActivity.java**

And finally the main activity.

```java
import android.content.Intent;
import android.graphics.Bitmap;
import android.os.AsyncTask;
import android.support.v4.content.ContextCompat;
import android.support.v7.app.AppCompatActivity;
import android.os.Bundle;
import android.view.View;

import com.ariannejad.mostafa.transitional_imageview_implementation.R;
import com.mostafaaryan.transitionalimageview.TransitionalImageView;
import com.mostafaaryan.transitionalimageview.model.TransitionalImage;
import com.squareup.picasso.Picasso;

import java.io.IOException;

public class MainActivity extends AppCompatActivity {

    private String imageUrl = "https://image.freepik.com/free-icon/android-logo_318-54237.jpg";
    TransitionalImageView tiv;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);

        tiv = (TransitionalImageView) findViewById(R.id.sample_image);

        loadImage();

    }

    private void loadImage() {

        /*
        ImageLoader imageLoader;
        imageLoader = ImageLoader.getInstance();
        imageLoader.init(ImageLoaderConfiguration.createDefault(this));
        AsyncTask.execute(new Runnable() {
            @Override
            public void run() {
                DisplayImageOptions dio = new DisplayImageOptions.Builder()
                        .cacheInMemory(false).build();
                final Bitmap bmp = imageLoader.loadImageSync(imageUrl, dio);
                runOnUiThread(new Runnable() {
                    @Override
                    public void run() {
                        tiv.setImage(bmp);
                    }
                });
            }
        });*/

        /* Glide.with(this).asBitmap().load(imageUrl).into(new SimpleTarget<Bitmap>() {
            @Override
            public void onResourceReady(Bitmap resource, Transition<? super Bitmap> transition) {
                tiv.setImage(resource);
            }
        }); */

        AsyncTask.execute(new Runnable() {
            @Override
            public void run() {
                try {
                    final Bitmap b = Picasso.with(MainActivity.this).load(imageUrl).get();
                    runOnUiThread(new Runnable() {
                        @Override
                        public void run() {
//                            tiv.setImage(b);
                            TransitionalImage transitionalImage = new TransitionalImage.Builder()
                                    .duration(500)
                                    .backgroundColor(ContextCompat.getColor(MainActivity.this, R.color.colorAccent))
                                    //.image(R.drawable.sample_image)
                                    .image(b)
                                    .create();
                            tiv.setTransitionalImage(transitionalImage);
                        }
                    });

                } catch (IOException e) {e.printStackTrace();}
            }
        });

    }

    public void onClickShoes(View view) {
        startActivity(new Intent(this, ShoeListActivity.class));
    }

}
```

### Demo

Here is the demo of what you get when you run the project.

![Android Shared Element Image Transition Example](https://github.com/MostafaAryan/transitional-imageview/raw/master/app/src/main/res/drawable/shoe_app_demo.gif?raw=true)

### Download

Here are the download links.

1. Direct Download [here](https://github.com/MostafaAryan/transitional-imageview/archive/master.zip).
2. Follow Author [here](https://github.com/MostafaAryan/).

## Example 3: Kotlin Shared Transition RecyclerView and Fragments

This is also a simple shared transitions example written in Kotlin. This time round however a recyclerview is the shared element among two fragments.

**Tools**

Here are the things to keep in mind:

- Programming Language - Kotlin
- Minimum SDK - 21

### 1\. Create Transitions

In  a folder known as transitions under resources add the following:

**(a). change_bounds.xml**

```xml
<?xml version="1.0" encoding="utf-8"?>
<transitionSet>
    <changeBounds />
</transitionSet>
```

**(b). change_image_transform.xml**

Then:

```xml
<?xml version="1.0" encoding="utf-8"?>
<transitionSet>
    <changeImageTransform />
</transitionSet>
```

### 2\. Design Layouts

You will find the layouts in the code.

### 3\. Write Code

Code is written in Kotlin in this case.

**(a). Fragment1.kt**

Here is the code for the first fragment.

```java
import android.os.Bundle
import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import androidx.fragment.app.Fragment
import androidx.recyclerview.widget.LinearLayoutManager
import kotlinx.android.synthetic.main.activity_main.*
import android.transition.ChangeBounds
import android.transition.ChangeImageTransform

class Fragment1: Fragment() {

    private lateinit var lm: LinearLayoutManager

    override fun onCreateView(
        inflater: LayoutInflater,
        container: ViewGroup?,
        savedInstanceState: Bundle?
    ): View? {
        return inflater.inflate(R.layout.activity_main, container, false)
    }

    override fun onViewCreated(view: View, savedInstanceState: Bundle?) {
        super.onViewCreated(view, savedInstanceState)
        lm = LinearLayoutManager(context, LinearLayoutManager.VERTICAL,
            false)
        rv.layoutManager = lm
        val adapter = MainActivity.Adapter()
        rv.adapter = adapter
        btn.setOnClickListener {

//            val changeImageTransform =
//                TransitionInflater.from(context).inflateTransition(R.transition.change_image_transform)
//            val changeBoundsTransform =
//                TransitionInflater.from(context).inflateTransition(R.transition.change_bounds)

            sharedElementReturnTransition = ChangeBounds()
            sharedElementEnterTransition = ChangeImageTransform()
            exitTransition = ChangeBounds()

            val fragment2 = Fragment2()
            // Setup transition on second fragment
            fragment2.sharedElementEnterTransition = ChangeBounds()
            fragment2.enterTransition = ChangeBounds();

            val firstVisiblePosition = lm.findFirstVisibleItemPosition()
            val lastVisiblePosition = lm.findLastVisibleItemPosition()
            val transaction = fragmentManager!!.beginTransaction()
                .replace(R.id.container, fragment2, fragment2::class.java.simpleName)
                .addToBackStack("name")
            for (i in firstVisiblePosition..lastVisiblePosition) {
                val holderForAdapterPosition =
                    rv.findViewHolderForAdapterPosition(i) as MainActivity.Adapter.Holder
                val itemView = holderForAdapterPosition.itemView
                transaction.addSharedElement(itemView, "unique_key_$i")
            }
            transaction.commit()
        }
    }
}
```

**(b). Fragment2.kt**

Add the following code in second fragment.

```java
import android.os.Bundle
import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import androidx.fragment.app.Fragment
import androidx.recyclerview.widget.LinearLayoutManager
import kotlinx.android.synthetic.main.activity_main.*

class Fragment2: Fragment() {

    override fun onCreateView(
        inflater: LayoutInflater,
        container: ViewGroup?,
        savedInstanceState: Bundle?
    ): View? {
        return inflater.inflate(R.layout.activity_main, container, false)
    }

    override fun onViewCreated(view: View, savedInstanceState: Bundle?) {
        super.onViewCreated(view, savedInstanceState)
        val lm = LinearLayoutManager(context, LinearLayoutManager.HORIZONTAL,
            false)
        rv.layoutManager = lm
        val adapter = MainActivity.Adapter()
        rv.adapter = adapter
        btn.setOnClickListener {
        }
        postponeEnterTransition()
    }

    override fun onStart() {
        super.onStart()
        rv.post {
            startPostponedEnterTransition()
        }
    }
}
```

**(c). ScndActivity.kt**

Then the second activity.

```java
import android.os.Bundle
import android.os.PersistableBundle
import androidx.appcompat.app.AppCompatActivity
import androidx.recyclerview.widget.LinearLayoutManager
import kotlinx.android.synthetic.main.activity_main.*

class ScndActivity: AppCompatActivity() {

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_main)
        val lm = LinearLayoutManager(this, LinearLayoutManager.HORIZONTAL,
            false)
        rv.layoutManager = lm
        val adapter = MainActivity.Adapter()
        rv.adapter = adapter
        btn.setOnClickListener {

            //            val currentOrientation = lm.orientation
//            if (currentOrientation == LinearLayoutManager.VERTICAL) {
//                lm.orientation = LinearLayoutManager.HORIZONTAL
//            } else {
//                lm.orientation = LinearLayoutManager.VERTICAL
//            }
//            adapter.notifyItemRangeChanged(1, adapter?.itemCount ?: 0)
        }
        supportPostponeEnterTransition()
        rv.post {
            supportStartPostponedEnterTransition()
        }
    }
}
```

**(d). MainActivity.kt**

And lastly the main activity,

```java
import androidx.appcompat.app.AppCompatActivity
import android.os.Bundle
import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import androidx.recyclerview.widget.LinearLayoutManager
import androidx.recyclerview.widget.RecyclerView

class MainActivity : AppCompatActivity() {

    private lateinit var lm: LinearLayoutManager

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.cont)
        val fragment1 = Fragment1()
        supportFragmentManager.beginTransaction()
            .add(R.id.container, fragment1, Fragment1::class.java.simpleName)
            .commit()
//        lm = LinearLayoutManager(this, LinearLayoutManager.VERTICAL,
//            false)
//        rv.layoutManager = lm
//        val adapter = Adapter()
//        rv.adapter = adapter
//        btn.setOnClickListener {
//            val firstVisiblePosition = lm.findFirstVisibleItemPosition()
//            val lastVisiblePosition = lm.findLastVisibleItemPosition()
//            val pairs = ArrayList<Pair<View, String>>()
//            for (i in firstVisiblePosition..lastVisiblePosition) {
//                val holderForAdapterPosition =
//                    rv.findViewHolderForAdapterPosition(i) as Adapter.Holder
//                val itemView = holderForAdapterPosition.itemView
//                pairs.add(Pair(itemView, "unique_key_$i"))
//            }
//            val bundle = ActivityOptions.makeSceneTransitionAnimation(
//                this,
//                *pairs.toTypedArray()
//            ).toBundle()
//            val fragment1 = Fragment1()
//            supportFragmentManager.beginTransaction()
//                .add(fragment1, Fragment1::class.java.simpleName)
//                .commit()
//            startActivity(Intent(this, ScndActivity::class.java), bundle)
//        }
    }

    override fun onResume() {
        super.onResume()
    }

    class Adapter : RecyclerView.Adapter<Adapter.Holder>() {

        override fun onCreateViewHolder(parent: ViewGroup, viewType: Int): Holder =
            Holder(
                LayoutInflater.from(parent.context).inflate(
                    R.layout.item_item,
                    parent,
                    false
                )
            )

        override fun getItemCount(): Int = 10

        override fun onBindViewHolder(holder: Holder, position: Int) {
            holder.bind(position)
        }

        class Holder(view: View) : RecyclerView.ViewHolder(view) {

            fun bind(position: Int) {
                itemView.transitionName = "unique_key_$position"
            }
        }
    }
}
```

### Demo

Here is what you get when you run the project.

![Android Kotlin Shared Transition Example RecyclerView](https://github.com/CheshenkoVladislav/sharedTransition/raw/master/recyclerDemo.gif)

### Download

1. Direct Download [here](https://github.com/CheshenkoVladislav/sharedTransition/archive/master.zip).
2. Follow Author [here](https://github.com/CheshenkoVladislav/).

## Example 4: Java Shared Transition with Fragments and FloatingActionButton

This is a simple one-class example to utilize a shared element transition within fragments in an android activity. The programming language is Java. While it is not written in androidx, you can easily update it to androidx fragments and it doesn't utilize any third partt library.

### Transitions

These are written in XML.  Tyically you create a transition resource directory and place the XML.

**(a). shared_enter_transition.xml**

Here is the code:

```xml
<?xml version="1.0" encoding="utf-8"?>
<transitionSet xmlns:android="http://schemas.android.com/apk/res/android"
    android:duration="@integer/default_anim_duration">

    <changeTransform/>
    <arcMotion
        android:minimumHorizontalAngle="0"
        android:minimumVerticalAngle="15"
        android:maximumAngle="90" />
    <changeBounds />

</transitionSet>
```

### Activities

Here are the activities

**(a). MainActivity.java**

Here is the main activity:

```java
import android.animation.Animator;
import android.app.Fragment;
import android.os.Bundle;
import android.support.v4.view.ViewCompat;
import android.support.v7.app.ActionBarActivity;
import android.transition.Fade;
import android.transition.Transition;
import android.transition.TransitionInflater;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewAnimationUtils;
import android.view.ViewGroup;
import android.view.animation.AccelerateInterpolator;

public class FabActivity extends ActionBarActivity {
    @Override
    public void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_fab);

        getFragmentManager()
                .beginTransaction()
                .add(R.id.frag_content, TitleFragment.newInstance())
                .commit();
    }

    public static class TitleFragment extends Fragment {
        public static TitleFragment newInstance() {
            return new TitleFragment();
        }

        @Override
        public View onCreateView(LayoutInflater inflater, ViewGroup container, Bundle savedInstanceState) {
            final View view = inflater.inflate(R.layout.fragment_fab_title, container, false);
            final View fabbutton = view.findViewById(R.id.fab);
            fabbutton.setOnClickListener(new View.OnClickListener() {
                @Override
                public void onClick(View v) {
                    final ControlsFragment controlsFragment = ControlsFragment.newInstance();

                    setupSharedElementTransition(controlsFragment);
                    Fade f = new Fade();
                    f.setStartDelay(250);
                    setExitTransition(f);

                    getFragmentManager()
                            .beginTransaction()
                            .replace(R.id.frag_content, controlsFragment)
                            .addToBackStack("controls")
                            .addSharedElement(fabbutton, "pause_button")
                            .commit();
                }
            });
            return view;
        }

        private void setupSharedElementTransition(final ControlsFragment controlsFragment) {
            Transition sharedTransition = TransitionInflater.from(getActivity()).inflateTransition(R.transition.shared_enter_transition);
            controlsFragment.setSharedElementEnterTransition(sharedTransition);
            controlsFragment.setSharedElementReturnTransition(sharedTransition);
            sharedTransition.addListener(new Transition.TransitionListener() {
                @Override
                public void onTransitionEnd(Transition transition) {
                    controlsFragment.revealContent();
                }

                @Override
                public void onTransitionStart(Transition transition) {
                }

                @Override
                public void onTransitionCancel(Transition transition) {
                }

                @Override
                public void onTransitionPause(Transition transition) {
                }

                @Override
                public void onTransitionResume(Transition transition) {
                }
            });

        }

    }

    public static class ControlsFragment extends Fragment {

        public static ControlsFragment newInstance() {
            return new ControlsFragment();
        }

        @Override
        public View onCreateView(LayoutInflater inflater, ViewGroup container, Bundle savedInstanceState) {
            return inflater.inflate(R.layout.fragment_fab_controls, container, false);
        }

        public void revealContent() {
            View layout = getView().findViewById(R.id.controls_layout);
            animateRevealColor(layout);
        }

        private void animateRevealColor(View targetView) {
            int cx = (targetView.getLeft() + targetView.getRight()) / 2;
            int cy = (targetView.getTop() + targetView.getBottom()) / 2;

            cx += targetView.getTranslationX();
            cy += targetView.getTranslationY();
            int finalRadius = Math.max(targetView.getWidth(), targetView.getHeight());

            Animator anim = ViewAnimationUtils.createCircularReveal(targetView, cx, cy, 0, finalRadius);
            targetView.setBackgroundColor(getResources().getColor(R.color.accent_material_light));
            anim.setDuration(getResources().getInteger(R.integer.default_anim_duration));
            anim.setInterpolator(new AccelerateInterpolator());
            anim.addListener(new Animator.AnimatorListener() {
                @Override
                public void onAnimationEnd(Animator animator) {
                    animateScaleButton(getView().findViewById(R.id.ff_button));
                    animateScaleButton(getView().findViewById(R.id.rew_button));
                }

                @Override
                public void onAnimationStart(Animator animator) {
                }

                @Override
                public void onAnimationCancel(Animator animator) {
                }

                @Override
                public void onAnimationRepeat(Animator animator) {
                }
            });
            anim.start();
        }

        private void animateScaleButton(View view) {
            ViewCompat.animate(view)
                    .scaleX(1)
                    .scaleY(1)
                    .setDuration(250)
                    .start();
        }
    }

}
```

### Demo

Here is the demo of what you get when you run the project.

![Fragments Shared Element Transition](https://raw.githubusercontent.com/lgvalle/FragmentSharedFabTransition/master/screenshots/fab-anim.gif)

### Download Links

1. Directly download the code [here](https://github.com/lgvalle/FragmentSharedFabTransition/archive/master.zip). (Please update it to androidx and reshare your code)
2. Follow Author [here](https://github.com/lgvalle/).
