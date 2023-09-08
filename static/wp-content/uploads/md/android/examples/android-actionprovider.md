# Kotlin Android ActionProvider Examples

Simple stepby step Android ActionProvider Examples.


## Example 1: Kotlin Android ActionProvider - Launch Settings and Add Menu item

This is an example of Settings ActionProvider.

This example shows how to implement an `androidx.core.view.ActionProvider` for adding functionality to the Action Bar. In particular this example creates an `ActionProvider` for launching the system settings and adds a menu item with that provider.

### Step 1: Create Project

Start by creating an android project using Android Studio.

### Step 2: Design Layout

All you need to do is place an ImageButton inside a LinearLayout as follows:

**action_bar_settings_action_provider.xml**

```xml
<?xml version="1.0" encoding="utf-8"?>

<LinearLayout xmlns:android="http://schemas.android.com/apk/res/android"
    xmlns:tools="http://schemas.android.com/tools"
    android:layout_width="wrap_content"
    android:layout_height="match_parent"
    android:layout_gravity="center"
    android:focusable="true"
    android:addStatesFromChildren="true"
    android:background="?android:attr/actionBarItemBackground"
    style="?android:attr/actionButtonStyle"
    tools:targetApi="ice_cream_sandwich">

    <ImageButton android:id="@+id/button"
        android:background="@drawable/ic_launcher_settings"
        android:layout_width="32dip"
        android:layout_height="32dip"
        android:layout_gravity="center"
        android:scaleType="fitCenter"
        android:adjustViewBounds="true"
        tools:ignore="ContentDescription" />

</LinearLayout>
```

### Step 3: Write code

Start by creating a `ActionBarSettingsActionProviderActivity.kt` file.

Then add imports:

```kotlin
import android.annotation.SuppressLint
import android.annotation.TargetApi
import android.content.Context
import android.content.Intent
import android.os.Build
import android.provider.Settings
import android.util.Log
import android.view.LayoutInflater
import android.view.Menu
import android.view.MenuItem
import android.view.View
import android.widget.ImageButton
import android.widget.Toast

import androidx.appcompat.app.AppCompatActivity
import androidx.appcompat.app.ActionBar
import androidx.core.view.ActionProvider
import com.example.android.apis.R
```

Then extend the `AppCompatActivity`

```kotlin
@Suppress("MemberVisibilityCanBePrivate")
@TargetApi(Build.VERSION_CODES.ICE_CREAM_SANDWICH)
class ActionBarSettingsActionProviderActivity : AppCompatActivity() {
```

Declare and initialize an internal ActionBar. This will be the reference to our activity's [ActionBar] for setting its display options.

```kotlin
    internal var mActionBar: ActionBar? = null
```

Then initialize the contents of the Activity's standard options menu. First we call through to our super's implementation of `onCreateOptionsMenu`. Then we fetch a `MenuInflater` and use it to inflate our menu from R.menu.action_bar_settings_action_provider into the `Menu menu` given us. Finally we return true so the menu will be displayed.

- `@param menu` - The options menu in which you place your items.
- `@return` - You must return true for the menu to be displayed; if you return false it will not be shown.

```kotlin
    override fun onCreateOptionsMenu(menu: Menu): Boolean {
        super.onCreateOptionsMenu(menu)
        menuInflater.inflate(R.menu.action_bar_settings_action_provider, menu)
        mActionBar = supportActionBar
        mActionBar!!.setDisplayOptions(0, ActionBar.DISPLAY_SHOW_TITLE)
        return true
    }
```

This hook is called whenever an item in your options menu is selected. We simply toast the message "Handling in onOptionsItemSelected avoided" and return false and the class we specify by the `android:actionProviderClass` in the menu xml is used to call that class's implementation of `onPerformDefaultAction`. This callback is only called from the "Settings" item in the overflow menu, NOT from the icon shown (ifRoom) in the ActionBar, onPerformDefaultAction is just called.

- `@param item` - The menu item that was selected.
- `@return boolean` - Return false to allow normal menu processing to proceed, true to consume it here.

```kotlin
    override fun onOptionsItemSelected(item: MenuItem): Boolean {
        // If this callback does not handle the item click, onPerformDefaultAction
        // of the ActionProvider is invoked. Hence, the provider encapsulates the
        // complete functionality of the menu item.
        Log.i(TAG, "onOptionsItemSelected has been called")
        Toast.makeText(this, R.string.action_bar_settings_action_provider_no_handling,
                Toast.LENGTH_SHORT).show()
        return false
    }
```

This class is specified using the xml attribute `android:actionProviderClass` in our menu xml file. It extends the abstract class `ActionProvider`, implementing the abstract callbacks `onCreateActionView` and `onPerformDefaultAction`

```kotlin
    class SettingsActionProvider
    /**
     * Creates a new instance. We first call through to our super's constructor, then save the
     * Context passed us for use in onCreateActionView.
     */
    (
            /** Context for accessing resources.  */
            private val mContext: Context) : ActionProvider(mContext) {
```

The following is a Factory method called by the Android framework to create new action views. First we fetch a LayoutInflater layoutInflater using the Context passed when creating this instance of the SettingsActionProvider Class and use this LayoutInflater to inflate View view from from our layout file `R.layout.action_bar_settings_action_provider`.

We find in this view our ImageButton button (R.id.button) and set the OnClickListener of "button" to a callback which uses mContext to start the activity in the Intent sSettingsIntent (the system settings Activity specified using Settings.ACTION_SETTINGS).

Finally we return our `View`.

- @return A new action view.

```kotlin
        override fun onCreateActionView(): View {
            // Inflate the action view to be shown on the action bar.
            val layoutInflater = LayoutInflater.from(mContext)
            @SuppressLint("InflateParams")
            val view = layoutInflater.inflate(R.layout.action_bar_settings_action_provider, null)
            val button = view.findViewById<ImageButton>(R.id.button)
            // Attach a click listener for launching the system settings.
            button.setOnClickListener {
                mContext.startActivity(sSettingsIntent)
            }
            return view
        }
```

The following is Called only when the `Action` is in the overflow menu, not when it is in the `ActionBar`. We simply use our saved Context `mContext` to start the system settings Activity, then return true to denote that the action has been handled.

- @return true if the Action has been handled.

```kotlin
        override fun onPerformDefaultAction(): Boolean {
            // This is called if the host menu item placed in the overflow menu of the
            // action bar is clicked and the host activity did not handle the click.
            Log.i(TAG, "onPerformDefaultAction has been called")
            mContext.startActivity(sSettingsIntent)
            return true
        }

        companion object {

            /** An intent for launching the system settings.  */
            private val sSettingsIntent = Intent(Settings.ACTION_SETTINGS)
        }
    }

    companion object {

        /**
         * TAG used for logging.
         */
        private const val TAG = "ActionBarSettings"
    }
}
```

Below is the full code:

**ActionBarSettingsActionProviderActivity.kt**

```kotlin
import android.annotation.SuppressLint
import android.annotation.TargetApi
import android.content.Context
import android.content.Intent
import android.os.Build
import android.provider.Settings
import android.util.Log
import android.view.LayoutInflater
import android.view.Menu
import android.view.MenuItem
import android.view.View
import android.widget.ImageButton
import android.widget.Toast

import androidx.appcompat.app.AppCompatActivity
import androidx.appcompat.app.ActionBar
import androidx.core.view.ActionProvider

import com.example.android.apis.R

@Suppress("MemberVisibilityCanBePrivate")
@TargetApi(Build.VERSION_CODES.ICE_CREAM_SANDWICH)
class ActionBarSettingsActionProviderActivity : AppCompatActivity() {

    internal var mActionBar: ActionBar? = null

    override fun onCreateOptionsMenu(menu: Menu): Boolean {
        super.onCreateOptionsMenu(menu)
        menuInflater.inflate(R.menu.action_bar_settings_action_provider, menu)
        mActionBar = supportActionBar
        mActionBar!!.setDisplayOptions(0, ActionBar.DISPLAY_SHOW_TITLE)
        return true
    }

    override fun onOptionsItemSelected(item: MenuItem): Boolean {
        Log.i(TAG, "onOptionsItemSelected has been called")
        Toast.makeText(this, R.string.action_bar_settings_action_provider_no_handling,
                Toast.LENGTH_SHORT).show()
        return false
    }

    class SettingsActionProvider
    (
            private val mContext: Context) : ActionProvider(mContext) {

        override fun onCreateActionView(): View {
            val layoutInflater = LayoutInflater.from(mContext)
            @SuppressLint("InflateParams")
            val view = layoutInflater.inflate(R.layout.action_bar_settings_action_provider, null)
            val button = view.findViewById<ImageButton>(R.id.button)
            button.setOnClickListener {
                mContext.startActivity(sSettingsIntent)
            }
            return view
        }

        override fun onPerformDefaultAction(): Boolean {
            Log.i(TAG, "onPerformDefaultAction has been called")
            return true
        }

        companion object {
            private val sSettingsIntent = Intent(Settings.ACTION_SETTINGS)
        }
    }

    companion object {
        private const val TAG = "ActionBarSettings"
    }
}
```

### Run

1. Create project as has been discussed.
2. Copy layout and kotlin into your project
3. Run

## Example 2: Kotlin Android ShareActionProvider with ActionBar

This example demonstrates how to use an `androidx.core.view.ActionProvider` for adding functionality to the Action Bar. In particular this demo is adding a menu item with `ShareActionProvider` as its action provider. The `ShareActionProvider` is responsible for managing the UI for sharing actions.

### Step 1: Create Project

Create an empty android studio project.

### Step 2: Create Menu

In the `res/menu/` directory, create a menu resource file as with two menu items as follows:

**action_bar_share_action_provider.xml**

```xml
<?xml version="1.0" encoding="utf-8"?>
<menu xmlns:tools="http://schemas.android.com/tools"
    xmlns:android="http://schemas.android.com/apk/res/android"
    xmlns:app="http://schemas.android.com/apk/res-auto"
    tools:targetApi="ice_cream_sandwich">

    <item android:id="@+id/menu_item_share_action_provider_action_bar"
        app:showAsAction="always"
        android:title="@string/action_bar_share_with"
        app:actionProviderClass="androidx.appcompat.widget.ShareActionProvider"
        tools:ignore="AlwaysShowAction" />

    <item android:id="@+id/menu_item_share_action_provider_overflow"
        app:showAsAction="never"
        android:title="@string/action_bar_share_with"
        app:actionProviderClass="androidx.appcompat.widget.ShareActionProvider" />

</menu>
```

### Step 3: Write Code

Start by creating the file `ActionBarShareActionProviderActivity.kt`.

Then add imports:

```kotlin
package com.example.android.apis.app

import android.annotation.TargetApi
import android.content.ClipData
import android.content.Intent
import android.net.Uri
import android.os.Build
import android.os.Bundle
import android.util.TypedValue
import android.view.Menu

import androidx.appcompat.app.AppCompatActivity
import androidx.appcompat.widget.ShareActionProvider
import androidx.core.view.MenuItemCompat

import com.example.android.apis.R
```

```kotlin
@TargetApi(Build.VERSION_CODES.ICE_CREAM_SANDWICH)
class ActionBarShareActionProviderActivity : AppCompatActivity() {
```

The `onCreate()` is Called when the activity is starting. We just call our super's implementation of `onCreate`

```kotlin
    public override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
    }
```

Next initialize the contents of the Activity's standard options menu. You should place your menu items into [menu]. First we get a `MenuInflater` with this context and use it to inflate a menu hierarchy from our menu `R.menu.action_bar_share_action_provider` into the options "menu" passed us. Then we initialize our `MenuItem` variable `val actionItem` to the "Share with..." action found at ID `R.id.menu_item_share_action_provider_action_bar` in our menu.

We use the `MenuItemCompat.getActionProvider` method to fetch the action provider specified for `actionItem` to initialize our `ShareActionProvider` variable `val actionProvider`, set the file name of the file for persisting the share history to `DEFAULT_SHARE_HISTORY_FILE_NAME` (the default name for storing share history: `"share_history.xml"`), then use our method `createShareIntent` to create a sharing `Intent` and set the share `Intent` of `actionProvider` to this `Intent`.

Then we initialize our `MenuItem` variable `overflowItem` to the "Share with..." action in the overflow menu found at `R.id.menu_item_share_action_provider_overflow` in our [menu]. We initialize our `ShareActionProvider` variable `val overflowProvider` by using the `MenuItemCompat.getActionProvider` method to fetch the action provider specified for `overflowItem`, set the file name of the file for persisting the share history to `DEFAULT_SHARE_HISTORY_FILE_NAME`, then use our method `createShareIntent` to create a sharing [Intent] and set the share Intent of `overflowProvider` to this `Intent`.

Finally we return _true_ so that our menu will be displayed.

- `@param menu` - The options menu in which you place your items. \* `@return -` You must return true for the menu to be displayed.

```kotlin
    override fun onCreateOptionsMenu(menu: Menu): Boolean {
        // Inflate your menu.
        menuInflater.inflate(R.menu.action_bar_share_action_provider, menu)

        // Set file with share history to the provider and set the share intent.
        val actionItem = menu.findItem(R.id.menu_item_share_action_provider_action_bar)
        val actionProvider = MenuItemCompat.getActionProvider(actionItem) as ShareActionProvider
        actionProvider.setShareHistoryFileName(ShareActionProvider.DEFAULT_SHARE_HISTORY_FILE_NAME)
        // Note that you can set/change the intent any time,
        // say when the user has selected an image.
        actionProvider.setShareIntent(createShareIntent())

        // Set file with share history to the provider and set the share intent.
        val overflowItem = menu.findItem(R.id.menu_item_share_action_provider_overflow)
        val overflowProvider = MenuItemCompat.getActionProvider(overflowItem) as ShareActionProvider
                overflowProvider.setShareHistoryFileName(
                ShareActionProvider.DEFAULT_SHARE_HISTORY_FILE_NAME)
        // Note that you can set/change the intent any time,
        // say when the user has selected an image.
        overflowProvider.setShareIntent(createShareIntent())

        return true
    }
```

The following Creates a sharing [Intent]. We first initalize our [Intent] variable `val shareIntent` with a new instance with the action ACTION_SEND, and add the flag [Intent.FLAG_GRANT_READ_URI_PERMISSION] to it. We initialize our `val b` to a new instance of [Uri.Builder], set the scheme of `b` to "content", and set its authority to our "com.example.android.apis.content.FileProvider" (our content/FileProvider `ContentProvider` which provides access to resources in our apk to other apps).

We initialize our `val tv` to a new instance of `TypedValue`, and use it to hold the resource data for our raw asset png file with id `R.raw.robot`. We then append to our `Uri.Builder` `b` the encoded path of the asset cookie of `tv` for asset R.raw.robot followed by the encoded path of the string value for `R.raw.robot`.

We then initialize our `val uri` to the `Uri` that results from building `b`. We next set the mime type of `shareIntent` to "image/png", add `uri` as an extra under the key `Intent.EXTRA_STREAM`, and set the clip data of `shareIntent` to a new instance of `ClipData` holding a `Uri` whose `ContentResolver` is a `ContentResolver` instance for our application's package, whose user-visible label for the clip data is "image", and whose `Uri` is our `uri`. Finally we return `shareIntent` to the caller.

- @return The sharing intent.

```kotlin
    private fun createShareIntent(): Intent {
        val shareIntent = Intent(Intent.ACTION_SEND)
        shareIntent.addFlags(Intent.FLAG_GRANT_READ_URI_PERMISSION)
        val b: Uri.Builder = Uri.Builder()
        b.scheme("content")
        b.authority("com.example.android.apis.content.FileProvider")
        val tv = TypedValue()
        resources.getValue(R.raw.robot, tv, true)
        b.appendEncodedPath(tv.assetCookie.toString())
        b.appendEncodedPath(tv.string.toString())
        val uri: Uri = b.build()
        shareIntent.type = "image/png"
        shareIntent.putExtra(Intent.EXTRA_STREAM, uri)
        shareIntent.clipData = ClipData.newUri(contentResolver, "image", uri)
        return shareIntent
    }

}
```

Here is the full code:

**ActionBarShareActionProviderActivity.kt**

```kotlin
import android.annotation.TargetApi
import android.content.ClipData
import android.content.Intent
import android.net.Uri
import android.os.Build
import android.os.Bundle
import android.util.TypedValue
import android.view.Menu

import androidx.appcompat.app.AppCompatActivity
import androidx.appcompat.widget.ShareActionProvider
import androidx.core.view.MenuItemCompat

import com.example.android.apis.R

@TargetApi(Build.VERSION_CODES.ICE_CREAM_SANDWICH)
class ActionBarShareActionProviderActivity : AppCompatActivity() {

    public override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
    }

    override fun onCreateOptionsMenu(menu: Menu): Boolean {
        // Inflate your menu.
        menuInflater.inflate(R.menu.action_bar_share_action_provider, menu)

        // Set file with share history to the provider and set the share intent.
        val actionItem = menu.findItem(R.id.menu_item_share_action_provider_action_bar)
        val actionProvider = MenuItemCompat.getActionProvider(actionItem) as ShareActionProvider
        actionProvider.setShareHistoryFileName(ShareActionProvider.DEFAULT_SHARE_HISTORY_FILE_NAME)
        // Note that you can set/change the intent any time,
        // say when the user has selected an image.
        actionProvider.setShareIntent(createShareIntent())

        // Set file with share history to the provider and set the share intent.
        val overflowItem = menu.findItem(R.id.menu_item_share_action_provider_overflow)
        val overflowProvider = MenuItemCompat.getActionProvider(overflowItem) as ShareActionProvider
                overflowProvider.setShareHistoryFileName(
                ShareActionProvider.DEFAULT_SHARE_HISTORY_FILE_NAME)
        // Note that you can set/change the intent any time,
        // say when the user has selected an image.
        overflowProvider.setShareIntent(createShareIntent())

        return true
    }

    private fun createShareIntent(): Intent {
        val shareIntent = Intent(Intent.ACTION_SEND)
        shareIntent.addFlags(Intent.FLAG_GRANT_READ_URI_PERMISSION)
        val b: Uri.Builder = Uri.Builder()
        b.scheme("content")
        b.authority("com.example.android.apis.content.FileProvider")
        val tv = TypedValue()
        resources.getValue(R.raw.robot, tv, true)
        b.appendEncodedPath(tv.assetCookie.toString())
        b.appendEncodedPath(tv.string.toString())
        val uri: Uri = b.build()
        shareIntent.type = "image/png"
        shareIntent.putExtra(Intent.EXTRA_STREAM, uri)
        shareIntent.clipData = ClipData.newUri(contentResolver, "image", uri)
        return shareIntent
    }

}
```

### Run

1. Copy the code into your project
2. Run
