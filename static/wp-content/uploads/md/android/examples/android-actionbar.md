# Kotlin Android ActionBar Examples

> Various examples of ActionBar usage in Kotlin Android


## Example 1: ActionBar Usage - Simple ActionBar Example

This demonstrates idiomatic usage of the Action Bar. The default Honeycomb theme includes the action bar by default and a menu resource is used to populate the menu data itself.

### Step 1: Create Android Project

Start by creating an android project in android studio.

### Step 2: Dependencies

No external dependencies are needed.

### Step 3: Create Menu

Create a folder inside the `res` known as `menus`. Inside this folder create a `actions.xml` file and add the following code:

**res/actions.xm**

```xml
<?xml version="1.0" encoding="utf-8"?>
<menu xmlns:android="http://schemas.android.com/apk/res/android"
    xmlns:app="http://schemas.android.com/apk/res-auto"
    xmlns:tools="http://schemas.android.com/tools"
    tools:targetApi="honeycomb">
    <item
        android:id="@+id/action_search"
        android:icon="@android:drawable/ic_menu_search"
        android:title="@string/action_bar_search"
        app:actionViewClass="androidx.appcompat.widget.SearchView"
        app:showAsAction="ifRoom" />
    <item
        android:id="@+id/action_add"
        android:icon="@android:drawable/ic_menu_add"
        android:title="@string/action_bar_add" />
    <item
        android:id="@+id/action_edit"
        android:icon="@android:drawable/ic_menu_edit"
        android:title="@string/action_bar_edit"
        app:showAsAction="always" />
    <item
        android:id="@+id/action_share"
        android:icon="@android:drawable/ic_menu_share"
        android:title="@string/action_bar_share"
        app:showAsAction="ifRoom" />
    <item
        android:id="@+id/action_sort"
        android:icon="@android:drawable/ic_menu_sort_by_size"
        android:title="@string/action_bar_sort"
        app:showAsAction="ifRoom">
        <menu>
            <item
                android:id="@+id/action_sort_size"
                android:icon="@android:drawable/ic_menu_sort_by_size"
                android:onClick="onSort"
                android:title="@string/action_bar_sort_size" />
            <item
                android:id="@+id/action_sort_alpha"
                android:icon="@android:drawable/ic_menu_sort_alphabetically"
                android:onClick="onSort"
                android:title="@string/action_bar_sort_alpha" />
        </menu>
    </item>
</menu>
```

### Step 4: Layout

We do not need a layout for this project. We will use a TextView as our ContentView.

### Step 5: Write Code

Create a file called `ActionBarUsage.kt`. Add the following imports:

```kotlin
import android.annotation.TargetApi
import android.os.Build
import android.os.Bundle
import android.util.Log
import android.view.Menu
import android.view.MenuItem
import android.widget.TextView
import android.widget.Toast
import androidx.appcompat.app.AppCompatActivity
import androidx.appcompat.app.ActionBar
import androidx.appcompat.widget.SearchView
import androidx.appcompat.widget.SearchView.OnQueryTextListener

import com.example.android.apis.R
```

Create our Activity by extending the `AppCompatActivity`. We will also implement the `OnQueryTextListener` interface:

```kotlin
@Suppress("MemberVisibilityCanBePrivate")
@TargetApi(Build.VERSION_CODES.HONEYCOMB)
class ActionBarUsage : AppCompatActivity(), OnQueryTextListener {
```

Declare the TextView we use as our content view, we set its text in our `onQueryTextChange` to the new content of the query text, which happens for every key stroke.

```kotlin
    internal lateinit var mSearchText: TextView
```

Menu item id of the last sort submenu item selected, -1 means none have been selected yet, `R.id.action_sort_size` for "By size", or `R.id.ic_menu_sort_alphabetically` for "Alphabetically".

```kotlin
    internal var mSortMode = -1
```

A reference to our activity's `ActionBar` for setting its display options.

```kotlin
    internal var mActionBar: ActionBar? = null
```

The `onCreate()` is called when the activity is starting. First we call through to our super's implementation of `onCreate`, then we set our `TextView` field `mSearchText` to a new instance of TextView and set our content view to this [TextView]. Then we initialize our ActionBar field [mActionBar] to a reference to the ActionBar and use it to disable the `ActionBar.DISPLAY_SHOW_TITLE` display option.

- @param savedInstanceState we do not override `onSaveInstanceState` so do not use.

```kotlin
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        mSearchText = TextView(this)
        setContentView(mSearchText)
        mActionBar = supportActionBar
        mActionBar!!.setDisplayOptions(0, ActionBar.DISPLAY_SHOW_TITLE)
    }
```

Initialize the contents of the Activity's standard options menu. You should place your menu items in the menu passed as a parameter. First we fetch a `MenuInflater` for this context to initialize our variable `val inflater`, and use it to inflate our menu (`R.menu.actions`) into our [Menu] parameter [menu].

We initialize our [MenuItem] variable `val item` by finding the menu item with the id R.id.action_search, and fetch the currently set action view for this menu item to initialize our [SearchView] variable `val searchView`.

We then set the [OnQueryTextListener] of `searchView` to _this_ (our Activity implements the [OnQueryTextListener] interface). Finally we return _true_ so that the menu is displayed.

- @param menu The options menu in which you place your items.
- @return You must return true for the menu to be displayed; if you return false it will not be shown.

```kotlin
    override fun onCreateOptionsMenu(menu: Menu): Boolean {
        Log.i(TAG, "onCreateOptionsMenu has been called")
        val inflater = menuInflater
        inflater.inflate(R.menu.actions, menu)
        val item = menu.findItem(R.id.action_search)
        val searchView = item.actionView as SearchView
        searchView.setOnQueryTextListener(this)
        return true
    }
```

Prepare the Screen's standard options menu to be displayed. This is called right before the menu is shown, every time it is shown. You can use this method to efficiently enable/disable items or otherwise dynamically modify the contents.

Our `Int` field `mSortMode` starts out as -1 and has its value set differently only when one of the `R.id.action_sort` submenu items have been clicked -- which causes our method `onSort` to be called due to their use of the `android:onClick="onSort"` attribute. `onSort` will set [`mSortMode`] according to which item in the submenu is selected (defaulting to `R.id.action_sort_size` until one is selected), and finally [`onSort`] calls [`invalidateOptionsMenu`] which causes this callback to be called in order to change the icon of R.id.action_sort to whichever sort mode has been selected (the icon is actually displayed only when there is room in the [ActionBar]).

Finally this callback returns the return value from our super's implementation of `onPrepareOptionsMenu` (which is assumed to be true).

- @param menu The options menu as last shown or first initialized by `onCreateOptionsMenu()`.
- @return You must return true for the menu to be displayed; if you return false it will not be shown.

```kotlin
    override fun onPrepareOptionsMenu(menu: Menu): Boolean {
        if (mSortMode != -1) {
            Log.i(TAG, "mSortMode =$mSortMode")
            val icon = menu.findItem(mSortMode).icon
            menu.findItem(R.id.action_sort).icon = icon
        }
        return super.onPrepareOptionsMenu(menu)
    }
```

This hook is called whenever an item in your options menu is selected. We simply toast a message showing the current title of the item which was selected, then return true so that the item selection is considered to have been consumed.

- @param item The menu item that was selected
- @return boolean Return false to allow normal menu processing to proceed, true to consume it here.

```kotlin
    override fun onOptionsItemSelected(item: MenuItem): Boolean {
        Toast.makeText(this, "Selected Item: " + item.title, Toast.LENGTH_SHORT).show()
        return true
    }
```

The `R.id.action_sort` menu item has been clicked showing the submenu for the sort item, and one of the items (`R.id.action_sort_size` or `R.id.action_sort_alpha`) has been chosen.

If the submenu was dismissed without choosing this method is not called. We set the [Int] field [mSortMode] to the id of the menu item selected, and invalidate the options menu so that [onCreateOptionsMenu] and [onPrepareOptionsMenu] will be called in order to update the menu accordingly.

- @param item The menu item that was selected.

```kotlin
    fun onSort(item: MenuItem) {
        mSortMode = item.itemId
 Request a call to onPrepareOptionsMenu so we can change the sort icon
        invalidateOptionsMenu()
    }
```

The `onQueryTextChange()` function is called when the query text is changed by the user. We produce a String containing the text the user has entered and set the text of our [`TextView`] field [`mSearchText`] (the content View of the Activity which was created in [`onCreate`]) to this String, or the empty String if no search String has been entered. We are called with the empty String when the menu is created and when the search string has been cleared as well as each time a character is added.

- @param newText the new content of the query text field.
- @return _false_ if the [SearchView] should perform the default action of showing any suggestions if available, _true_ if the action was handled by the listener.

```kotlin
    override fun onQueryTextChange(newText: String): Boolean {
        var myNewText = newText
        Log.i(TAG, "onQueryTextChange has been called")
        myNewText = if (myNewText.isEmpty()) "" else "Query so far: $myNewText"
        mSearchText.text = myNewText
        return true
    }
```

The `onQueryTextSubmit()` is called when the user submits the query. This could be due to a key press on the keyboard or due to pressing a submit button. We simply toast the contents of query submitted and return true to indicate we have handled it.

- @param query the query text that is to be submitted
- @return _true_ if the query has been handled by the listener, _false_ to let the SearchView perform the default action.

```kotlin
    override fun onQueryTextSubmit(query: String): Boolean {
        Toast.makeText(this, "Searching for: $query...", Toast.LENGTH_SHORT).show()
        return true
    }
```

Here is the full code:

**actionBarUsage.kt**

```kotlin

import android.annotation.TargetApi
import android.os.Build
import android.os.Bundle
import android.util.Log
import android.view.Menu
import android.view.MenuItem
import android.widget.TextView
import android.widget.Toast

import androidx.appcompat.app.AppCompatActivity
import androidx.appcompat.app.ActionBar
import androidx.appcompat.widget.SearchView
import androidx.appcompat.widget.SearchView.OnQueryTextListener

import com.example.android.apis.R

@Suppress("MemberVisibilityCanBePrivate")
@TargetApi(Build.VERSION_CODES.HONEYCOMB)
class ActionBarUsage : AppCompatActivity(), OnQueryTextListener {

    internal lateinit var mSearchText: TextView

    internal var mSortMode = -1

    internal var mActionBar: ActionBar? = null

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        mSearchText = TextView(this)
        setContentView(mSearchText)
        mActionBar = supportActionBar
        mActionBar!!.setDisplayOptions(0, ActionBar.DISPLAY_SHOW_TITLE)
    }

    override fun onCreateOptionsMenu(menu: Menu): Boolean {
        Log.i(TAG, "onCreateOptionsMenu has been called")
        val inflater = menuInflater
        inflater.inflate(R.menu.actions, menu)
        val item = menu.findItem(R.id.action_search)
        val searchView = item.actionView as SearchView
        searchView.setOnQueryTextListener(this)
        return true
    }

    override fun onPrepareOptionsMenu(menu: Menu): Boolean {
        if (mSortMode != -1) {
            Log.i(TAG, "mSortMode =$mSortMode")
            val icon = menu.findItem(mSortMode).icon
            menu.findItem(R.id.action_sort).icon = icon
        }
        return super.onPrepareOptionsMenu(menu)
    }

    override fun onOptionsItemSelected(item: MenuItem): Boolean {
        Toast.makeText(this, "Selected Item: " + item.title, Toast.LENGTH_SHORT).show()
        return true
    }

    fun onSort(item: MenuItem) {
        mSortMode = item.itemId
 Request a call to onPrepareOptionsMenu so we can change the sort icon
        invalidateOptionsMenu()
    }

    // The following two callbacks are called for the SearchView.OnQueryChangeListener

    override fun onQueryTextChange(newText: String): Boolean {
        var myNewText = newText
        Log.i(TAG, "onQueryTextChange has been called")
        myNewText = if (myNewText.isEmpty()) "" else "Query so far: $myNewText"
        mSearchText.text = myNewText
        return true
    }

    override fun onQueryTextSubmit(query: String): Boolean {
        Toast.makeText(this, "Searching for: $query...", Toast.LENGTH_SHORT).show()
        return true
    }

    companion object {
        /**
     TAG used for logging.
    /
        private const val TAG = "ActionBarUsage"
    }
}
```

### Step 5: Register Activity

Register the activity in your `AndroidManifest.xml`

```xml
        <activity
            android:name=".app.ActionBarUsage"
            android:enabled="@bool/atLeastHoneycomb"
            android:label="@string/action_bar_usage"
            android:theme="@style/Theme.AppCompat.Light.DarkActionBar">
            <intent-filter>
                <action android:name="android.intent.action.MAIN" />
                <category android:name="android.intent.category.SAMPLE_CODE" />
            </intent-filter>
        </activity>
```

### Step 6: Run

1. Copy the kotlin code as well as the menu xml code into your project.
2. Build and Run

## Example 2: ActionBar Mechanics

This example demonstrates the basics of the Action Bar and how it inter-operates with the standard options menu. This demo is for informative purposes only; see ActionBarUsage above for an example of using the Action Bar in a more idiomatic manner.

### Step 1: Create Android Project

Create a Kotlin Android Project.

### Step 2: Dependencies

No external dependencies are needed for this project.

### Step 3: Layouts

No layout is needed for this project.

### Step 4: Write Code

Create `ActionBarMechanics.kt` file and add the following imports:

```kotlin
import android.annotation.TargetApi
import android.os.Build
import android.os.Bundle
import android.view.Menu
import android.view.MenuItem
import android.view.Window
import android.widget.Toast
import androidx.appcompat.app.AppCompatActivity
```

Extend the `AppCompatActivity`:

```kotlin
@TargetApi(Build.VERSION_CODES.HONEYCOMB)
class ActionBarMechanics : AppCompatActivity() {
```

The `onCreate()` is called when the activity is starting. We first call through to our super's implementation of onCreate, then we enable the extended screen feature Window.FEATURE_ACTION_BAR which is the flag for enabling the Action Bar. This is enabled by default for some devices.

The Action Bar replaces the title bar and provides an alternate location for an on-screen menu button on some devices.

- @param savedInstanceState we do not override `onSaveInstanceState` so do not use.

```kotlin
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
```

The Action Bar is a window feature. The feature must be requested before setting a content view. Normally this is set automatically by your Activity's theme in your manifest. The provided system theme `Theme.WithActionBar` enables this for you. Use it as you would use `Theme.NoTitleBar`. You can add an Action Bar to your own themes by adding the element `<item name="android:windowActionBar">true</item>` to your style definition.

```kotlin
        window.requestFeature(Window.FEATURE_ACTION_BAR)
    }
```

Initialize the contents of the Activity's standard options menu. We first add a "Normal Item" to our menu using the default to never show in the action bar (it will instead appear in the Action overflow menu in a cascading menu).

Next we add a "Action Button" to the menu and save the newly added menu item in the MenuItem actionItem returned for later use. We call `setShowAsAction(MenuItem.SHOW_AS_ACTION_IF_ROOM)` on MenuItem actionItem to set how this item should display in the presence of an Action Bar (Shows this item as a button in an Action Bar if the system decides there is room for it). actionItem.setIcon is called to set the icon associated with this item to `android.R.drawable.ic_menu_share` (the standard Android "share" icon.) Finally we return true so that the menu will be shown.

- @param menu The options menu in which you place your items.
- @return You must return true for the menu to be displayed; if you return false it will not be shown.

```kotlin
    override fun onCreateOptionsMenu(menu: Menu): Boolean {
```

Menu items default to never show in the action bar. On most devices this means they will show in the standard options menu panel when the menu button is pressed. On xlarge-screen devices a "More" button will appear in the far right of the Action Bar that will display remaining items in a cascading menu.

```kotlin
        menu.add("Normal item")
        val actionItem = menu.add("Action Button")
```

Items that show as actions should favor the "if room" setting, which will prevent too many buttons from crowding the bar. Extra items will show in the overflow area.

```kotlin
        actionItem.setShowAsAction(MenuItem.SHOW_AS_ACTION_IF_ROOM)
```

Items that show as actions are strongly encouraged to use an icon. These icons are shown without a text description, and therefore should be sufficiently descriptive on their own.

```kotlin
        actionItem.setIcon(android.R.drawable.ic_menu_share)

        return true
    }
```

This hook is called whenever an item in your options menu is selected. Here we simply toast current title of the item, then return true to indicate that we consumed the click.

- @param item The menu item that was selected.
- @return Return false to allow normal menu processing to proceed, true to consume it here.

```kotlin
    override fun onOptionsItemSelected(item: MenuItem): Boolean {
        Toast.makeText(this, "Selected Item: " + item.title, Toast.LENGTH_SHORT).show()
        return true
    }
}
```

**ActionBarMechanics.kt**

```kotlin
import android.annotation.TargetApi
import android.os.Build
import android.os.Bundle
import android.view.Menu
import android.view.MenuItem
import android.view.Window
import android.widget.Toast
import androidx.appcompat.app.AppCompatActivity

@TargetApi(Build.VERSION_CODES.HONEYCOMB)
class ActionBarMechanics : AppCompatActivity() {

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)

        window.requestFeature(Window.FEATURE_ACTION_BAR)
    }

    override fun onCreateOptionsMenu(menu: Menu): Boolean {

        menu.add("Normal item")

        val actionItem = menu.add("Action Button")

        actionItem.setShowAsAction(MenuItem.SHOW_AS_ACTION_IF_ROOM)

        actionItem.setIcon(android.R.drawable.ic_menu_share)

        return true
    }

    override fun onOptionsItemSelected(item: MenuItem): Boolean {
        Toast.makeText(this, "Selected Item: " + item.title, Toast.LENGTH_SHORT).show()
        return true
    }
}
```

### Step 5: Register Activity

In your `AndroidManifest.xml` register the activity:

```xml
        <activity
            android:name=".app.ActionBarMechanics"
            android:enabled="@bool/atLeastHoneycomb"
            android:label="@string/action_bar_mechanics"
            android:theme="@style/Theme.AppCompat.Light">
            <intent-filter>
                <action android:name="android.intent.action.MAIN" />
                <category android:name="android.intent.category.SAMPLE_CODE" />
            </intent-filter>
        </activity>
```

### Step 6: Run

1. Copy the code into your project.
2. Build and Run

## Example 3: ActionBarDisplay options

This example shows how various action bar display option flags can be combined and their effects.

### Step 1: Create Project

Start by creating Android Studio Project.

### Step 2: Dependencies

No third party dependencies are needed.

### Step 3: Create Menu

Create an options menu as below:

**display_options_actions.xml**

```xml
<?xml version="1.0" encoding="utf-8"?>
<menu xmlns:android="http://schemas.android.com/apk/res/android">
    <item android:id="@+id/simple_item"
          android:title="@string/display_options_menu_item" />
</menu>
```

### Step 4: Design Layout

Design a layout as follows:

```xml
<?xml version="1.0" encoding="utf-8"?>
<ScrollView xmlns:android="http://schemas.android.com/apk/res/android"
    android:layout_width="match_parent"
    android:layout_height="match_parent">

    <LinearLayout
        android:layout_width="match_parent"
        android:layout_height="wrap_content"
        android:orientation="vertical">

        <Button
            android:id="@+id/toggle_home_as_up"
            android:layout_width="wrap_content"
            android:layout_height="wrap_content"
            android:text="@string/toggle_home_as_up" />

        <Button
            android:id="@+id/toggle_show_home"
            android:layout_width="wrap_content"
            android:layout_height="wrap_content"
            android:text="@string/toggle_show_home" />

        <Button
            android:id="@+id/toggle_use_logo"
            android:layout_width="wrap_content"
            android:layout_height="wrap_content"
            android:text="@string/toggle_use_logo" />

        <Button
            android:id="@+id/toggle_show_title"
            android:layout_width="wrap_content"
            android:layout_height="wrap_content"
            android:text="@string/toggle_show_title" />

        <Button
            android:id="@+id/toggle_show_custom"
            android:layout_width="wrap_content"
            android:layout_height="wrap_content"
            android:text="@string/toggle_show_custom" />

        <Spinner
            android:id="@+id/toggle_navigation"
            android:layout_width="wrap_content"
            android:layout_height="wrap_content"
            android:entries="@array/navigation_modes"
            android:prompt="@string/toggle_navigation" />

        <Button
            android:id="@+id/cycle_custom_gravity"
            android:layout_width="wrap_content"
            android:layout_height="wrap_content"
            android:text="@string/cycle_custom_gravity" />

        <Button
            android:id="@+id/toggle_visibility"
            android:layout_width="wrap_content"
            android:layout_height="wrap_content"
            android:text="@string/toggle_visibility" />

        <Button
            android:id="@+id/toggle_system_ui"
            android:layout_width="wrap_content"
            android:layout_height="wrap_content"
            android:text="@string/toggle_system_ui" />
    </LinearLayout>
</ScrollView>
```

### Step 5: Write Code

Start by adding imports as follows, in your MainActivity:

```kotlin

import android.annotation.TargetApi
import android.os.Build
import android.os.Bundle
import android.view.Gravity
import android.view.Menu
import android.view.View
import android.view.ViewGroup
import android.view.ViewGroup.LayoutParams
import android.widget.AdapterView
import android.widget.ArrayAdapter
import android.widget.Spinner

import androidx.appcompat.app.AppCompatActivity
import androidx.appcompat.app.ActionBar
import androidx.appcompat.app.ActionBar.Tab
import androidx.fragment.app.FragmentTransaction

import com.example.android.apis.R
```

Create MainActivity by extending the `AppCompatActivity`, also implement a couple of interfaces as shown below:

```kotlin
@Suppress("DEPRECATION")
@TargetApi(Build.VERSION_CODES.JELLY_BEAN)
class ActionBarDisplayOptions : AppCompatActivity(), View.OnClickListener, ActionBar.TabListener,
        AdapterView.OnItemSelectedListener, ActionBar.OnNavigationListener {
```

Define a custom view object:

```kotlin
    private var mCustomView: View? = null
```

Then our `onCreate()` method.We set our content view to our layout file `R.layout.action_bar_display_options`.

```kotlin
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.action_bar_display_options)
```

Then we locate all the buttons in our layout file and set their OnClickListener to "this", and we locate the Spinner (`R.id.toggle_navigation`) and set its `OnItemSelectedListener` to "this". We inflate into View `mCustomView` (our custom View) which consists of simply a Button from its layout file `R.layout.action_bar_display_options_custom`.

Then we retrieve a reference to this activity's ActionBar into ActionBar bar. We use "bar" to set the custom view for the ActionBar to View mCustomView with layout parameters WRAP_CONTENT for width and WRAP_CONTENT for height. Then we add three tabs to the ActionBar, setting their ActionBar.TabListener to "this". We create an `ArrayAdapter<String>` adapter using "this" as its context and the system layout android.R.layout.simple_list_item_1 as its layout file which contains a TextView to use when instantiating views. We add three items ("Item 1", "Item 2", and "Item 3") to "adapter" then we the set adapter and navigation callback for list navigation mode to "adapter" and "this" respectively.

```kotlin
     * @param savedInstanceState always null since onSaveInstanceState is not overridden.
     */

        findViewById<View>(R.id.toggle_home_as_up).setOnClickListener(this)
        findViewById<View>(R.id.toggle_show_home).setOnClickListener(this)
        findViewById<View>(R.id.toggle_use_logo).setOnClickListener(this)
        findViewById<View>(R.id.toggle_show_title).setOnClickListener(this)
        findViewById<View>(R.id.toggle_show_custom).setOnClickListener(this)
        findViewById<View>(R.id.cycle_custom_gravity).setOnClickListener(this)
        findViewById<View>(R.id.toggle_visibility).setOnClickListener(this)
        findViewById<View>(R.id.toggle_system_ui).setOnClickListener(this)

        (findViewById<View>(R.id.toggle_navigation) as Spinner).onItemSelectedListener = this

        mCustomView = layoutInflater.inflate(R.layout.action_bar_display_options_custom,
                findViewById<View>(android.R.id.content) as ViewGroup, false)
```

Configure several action bar elements that will be toggled by display options.

```kotlin
        val bar = supportActionBar
        bar!!.setIcon(R.drawable.app_sample_code)
        bar.setDisplayShowHomeEnabled(true)
        bar.setDisplayUseLogoEnabled(false)

        bar.setCustomView(mCustomView,
                ActionBar.LayoutParams(LayoutParams.WRAP_CONTENT, LayoutParams.WRAP_CONTENT))

        bar.addTab(bar.newTab().setText("Tab 1").setTabListener(this))
        bar.addTab(bar.newTab().setText("Tab 2").setTabListener(this))
        bar.addTab(bar.newTab().setText("Tab 3").setTabListener(this))

        val adapter = ArrayAdapter<String>(this, android.R.layout.simple_list_item_1)
        adapter.add("Item 1")
        adapter.add("Item 2")
        adapter.add("Item 3")
        bar.setListNavigationCallbacks(adapter, this)
    }
```

Initialize the contents of the Activity's standard options menu. We simply fetch a `MenuInflater` with this context and use it to inflate our menu `R.menu.display_options_actions` into the options menu "Menu menu" passed to us.

- @param menu The options menu in which you place your items.
    
- @return You must return true for the menu to be displayed; if you return false it will not be shown.
    

```kotlin
    override fun onCreateOptionsMenu(menu: Menu): Boolean {
        menuInflater.inflate(R.menu.display_options_actions, menu)
        return true
    }
```

The followingis Called when a view has been clicked. This is called by all the Button's in our UI which have had their OnClickListener set to "this".

First we fetch a reference to the ActionBar into ActionBar bar, and initialize int flags to zero. Then we switch on the id of the `View v` which has been clicked.

The first five Button's set "int flags" to toggle the appropriate flag at the end of the switch statement: - `R.id.toggle_home_as_up` ("DISPLAY_HOME_AS_UP") flag: ActionBar.DISPLAY_HOME_AS_UP Display the 'home' element such that it appears as an 'up' affordance. e.g. show an arrow to the left indicating the action that will be taken. Set this flag if selecting the 'home' button in the action bar to return up by a single level in your UI rather than back to the top level or front page.

`R.id.toggle_show_home` ("DISPLAY_SHOW_HOME") flag: ActionBar.DISPLAY_SHOW_HOME Show 'home' elements in this action bar, leaving more space for other navigation elements. This includes logo and icon.

`R.id.toggle_use_logo` ("DISPLAY_USE_LOGO") flag: `ActionBar.DISPLAY_USE_LOGO` - Show the logo defined as the attribute android:logo="@drawable/apidemo_androidlogo" in AndroidManifest.xml for the Activity (Shown only if ActionBar.DISPLAY_SHOW_HOME is also set.)

`R.id.toggle_show_title` ("DISPLAY_SHOW_TITLE") flag: ActionBar.DISPLAY_SHOW_TITLE Show the activity title and subtitle, if present.

R.id.toggle_show_custom ("DISPLAY_SHOW_CUSTOM") flag: ActionBar.DISPLAY_SHOW_CUSTOM - Show the custom view if one has been set.

The other Button's perform more complex operations than toggling using int flags and return after doing them rather than fall through to end of the outer switch:

`R.id.cycle_custom_gravity` ("Cycle Custom View Gravity") first fetches the current layout parameters for the View mCustomView to the variable ActionBar.LayoutParams lp, then it switches based on the current value of the field lp.gravity masked with `Gravity.RELATIVE_HORIZONTAL_GRAVITY_MASK` (the Binary mask for horizontal gravity and script specific direction bit), and changes newGravity if the current value is: Gravity.START (Push object to x-axis position at the start of its container, not changing its size) changes to Gravity.CENTER_HORIZONTAL Gravity.CENTER_HORIZONTAL (Place object in the horizontal center of its container, not changing its size) changes to Gravity.END Gravity.END (Push object to x-axis position at the end of its container, not changing its size) changes to Gravity.START

After deciding what newGravity is to be in the switch statement we set the appropriate bit in lp.gravity, then call bar.setCustomView(mCustomView, lp) to install our custom View (mCustomView) with our modified layout parameters "ActionBar.LayoutParams lp" as the the ActionBar's custom View. (The display option DISPLAY_SHOW_CUSTOM must be set for the custom view to be displayed). We then return.

`R.id.toggle_visibility` ("Toggle Visibility") We check if the ActionBar is showing and if it is we call bar.hide() to hide the ActionBar, and if it is not we call bar.`show()` to show the ActionBar. In either case we then return.

`R.id.toggle_system_ui` ("Toggle System UI") If the View.SYSTEM_UI_FLAG_FULLSCREEN bit of the last setSystemUiVisibility(int) that this view has requested is set we clear all bits of the system ui visibility, if it is not set we set the View.SYSTEM_UI_FLAG_FULLSCREEN bit. In either case we then return.

For the five Button's which set "flags" to the flag they wish to toggle and then "break", we retrieve the current set of display options to "int change", toggle the flag in "change" that needs to be toggled, then using flags as the mask to specify which flags to change we set or clear only that bit in the ActionBar's display options by calling `bar.setDisplayOptions(change, flags)`

- @param v Button which was clicked

```kotlin
    override fun onClick(v: View) {
        val bar = supportActionBar
        var flags = 0
        when (v.id) {
            R.id.toggle_home_as_up -> flags = ActionBar.DISPLAY_HOME_AS_UP
            R.id.toggle_show_home -> flags = ActionBar.DISPLAY_SHOW_HOME
            R.id.toggle_use_logo -> {
                flags = ActionBar.DISPLAY_USE_LOGO
                if(flags and bar!!.displayOptions == 0) {
                    bar.setIcon(R.drawable.apidemo_androidlogo)
                } else {
                    bar.setIcon(R.drawable.app_sample_code)
                }

            }
            R.id.toggle_show_title -> flags = ActionBar.DISPLAY_SHOW_TITLE
            R.id.toggle_show_custom -> flags = ActionBar.DISPLAY_SHOW_CUSTOM
            R.id.cycle_custom_gravity -> {
                val lp = mCustomView!!.layoutParams as ActionBar.LayoutParams
                var newGravity = 0
                when (lp.gravity and Gravity.RELATIVE_HORIZONTAL_GRAVITY_MASK) {
                    Gravity.START -> newGravity = Gravity.CENTER_HORIZONTAL
                    Gravity.CENTER_HORIZONTAL -> newGravity = Gravity.END
                    Gravity.END -> newGravity = Gravity.START
                }
                lp.gravity = lp.gravity and Gravity.RELATIVE_HORIZONTAL_GRAVITY_MASK.inv() or newGravity

                bar!!.setCustomView(mCustomView, lp)
                return
            }
            R.id.toggle_visibility -> {

                if (bar!!.isShowing) {
                    bar.hide()
                } else {
                    bar.show()
                }
                return
            }
            R.id.toggle_system_ui -> {
                if (window.decorView.systemUiVisibility and View.SYSTEM_UI_FLAG_FULLSCREEN != 0) {
                    window.decorView.systemUiVisibility = 0
                } else {
                    window.decorView.systemUiVisibility = View.SYSTEM_UI_FLAG_FULLSCREEN
                }
                return
            }
        }

        val change = bar!!.displayOptions xor flags

        bar.setDisplayOptions(change, flags)
    }
```

Callback interface invoked when a tab is focused, unfocused, added, or removed. Part of the `ActionBar.TabListener` interface we must implement to add a tab to the ActionBar.

- @param tab The tab that was selected
- @param ft A [FragmentTransaction] for queuing fragment operations to execute during a tab switch. The previous tab's unselect and this tab's select will be executed in a single transaction. This FragmentTransaction does not support being added to the back stack.

```kotlin
    override fun onTabSelected(tab: Tab, ft: FragmentTransaction) {}
```

The following is Called when a tab exits the selected state. Part of the ActionBar.TabListener interface we must implement to add a tab to the ActionBar.

- @param tab The tab that was unselected
- @param ft A [FragmentTransaction] for queuing fragment operations to execute during a tab switch. This tab's unselect and the newly selected tab's select will be executed in a single transaction. This FragmentTransaction does not support being added to the back stack.

```kotlin
    override fun onTabUnselected(tab: Tab, ft: FragmentTransaction) {}
```

The following is Called when a tab that is already selected is chosen again by the user.

Some applications may use this action to return to the top level of a category. Part of the ActionBar.TabListener interface we must implement to add a tab to the ActionBar.

- @param tab The tab that was reselected.
- @param ft A [FragmentTransaction] for queuing fragment operations to execute once this method returns. This FragmentTransaction does not support being added to the back stack.

```kotlin
    override fun onTabReselected(tab: Tab, ft: FragmentTransaction) {}
```

The following is a Callback method to be invoked when an item in this view has been selected. This callback is invoked only when the newly selected position is different from the previously selected position or if there was no selected item.

Part of the `Spinner.OnItemSelectedListener` interface which is inherited from AbsSpinner, which is inherited from `AdapterView<SpinnerAdapter>`, we set the OnItemSelectedListener of the `R.id.toggle_navigation` Spinner to "this" and get called when an item in the Spinner list has been selected. First fetch a reference to the ActionBar into ActionBar bar, then we perform a switch (which might might as well be an "if") based on the id of the AdapterView which has had an item selected, and if the id is `R.id.toggle_navigation`, we switch on the position of the item in the adapter and set "int mode" to NAVIGATION_MODE_TABS, NAVIGATION_MODE_LIST, or NAVIGATION_MODE_STANDARD. Before returning we call ActionBar.setNavigationMode(mode) to set the current navigation mode to the mode selected.

- `@param parent` - The AdapterView where the selection ha\`ppened
- @param view\` - The view within the AdapterView that was clicked
- `@param position` - The position of the view in the adapter
- `@param id` - The row id of the item that is selected

```kotlin
    override fun onItemSelected(parent: AdapterView<*>, view: View?, position: Int, id: Long) {
        val bar = supportActionBar

        when (parent.id) {
            R.id.toggle_navigation -> {
                val mode: Int = when (position) {
                    1 -> ActionBar.NAVIGATION_MODE_TABS
                    2 -> ActionBar.NAVIGATION_MODE_LIST
                    else -> ActionBar.NAVIGATION_MODE_STANDARD
                }

                bar!!.navigationMode = mode
            }
        }
    }
```

The following Callback method to be invoked when the selection disappears from this view. The selection can disappear for instance when touch is activated or when the adapter becomes empty.

Part of the `Spinner.OnItemSelectedListener` interface which is inherited from AbsSpinner, which is inherited from `AdapterView<SpinnerAdapter>`, there is nothing we need do.

- @param parent The AdapterView that now contains no selected item.

```kotlin
    override fun onNothingSelected(parent: AdapterView<*>) {}
```

This method is called whenever a navigation item in your action bar is selected. Part of the ActionBar.OnNavigationListener interface which we implement, there is nothing we want to do, so we return false.

- `@param itemPosition` Position of the item clicked.
- `@param itemId` ID of the item clicked.
- `@return True` if the event was handled, false otherwise.

```kotlin
    override fun onNavigationItemSelected(itemPosition: Int, itemId: Long): Boolean {
        return false
    }
}
```

Below is the full code:

**MainActivity.kt**

```kotlin
@file:Suppress("DEPRECATION")

package com.example.android.apis.app

import android.annotation.TargetApi
import android.os.Build
import android.os.Bundle
import android.view.Gravity
import android.view.Menu
import android.view.View
import android.view.ViewGroup
import android.view.ViewGroup.LayoutParams
import android.widget.AdapterView
import android.widget.ArrayAdapter
import android.widget.Spinner

import androidx.appcompat.app.AppCompatActivity
import androidx.appcompat.app.ActionBar
import androidx.appcompat.app.ActionBar.Tab
import androidx.fragment.app.FragmentTransaction

import com.example.android.apis.R

@Suppress("DEPRECATION")
@TargetApi(Build.VERSION_CODES.JELLY_BEAN)
class ActionBarDisplayOptions : AppCompatActivity(), View.OnClickListener, ActionBar.TabListener,
        AdapterView.OnItemSelectedListener, ActionBar.OnNavigationListener {
    private var mCustomView: View? = null

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.action_bar_display_options)

        findViewById<View>(R.id.toggle_home_as_up).setOnClickListener(this)
        findViewById<View>(R.id.toggle_show_home).setOnClickListener(this)
        findViewById<View>(R.id.toggle_use_logo).setOnClickListener(this)
        findViewById<View>(R.id.toggle_show_title).setOnClickListener(this)
        findViewById<View>(R.id.toggle_show_custom).setOnClickListener(this)
        findViewById<View>(R.id.cycle_custom_gravity).setOnClickListener(this)
        findViewById<View>(R.id.toggle_visibility).setOnClickListener(this)
        findViewById<View>(R.id.toggle_system_ui).setOnClickListener(this)

        (findViewById<View>(R.id.toggle_navigation) as Spinner).onItemSelectedListener = this

        mCustomView = layoutInflater.inflate(R.layout.action_bar_display_options_custom,
                findViewById<View>(android.R.id.content) as ViewGroup, false)
        // Configure several action bar elements that will be toggled by display options.
        val bar = supportActionBar
        bar!!.setIcon(R.drawable.app_sample_code)
        bar.setDisplayShowHomeEnabled(true)
        bar.setDisplayUseLogoEnabled(false)

        bar.setCustomView(mCustomView,
                ActionBar.LayoutParams(LayoutParams.WRAP_CONTENT, LayoutParams.WRAP_CONTENT))

        bar.addTab(bar.newTab().setText("Tab 1").setTabListener(this))
        bar.addTab(bar.newTab().setText("Tab 2").setTabListener(this))
        bar.addTab(bar.newTab().setText("Tab 3").setTabListener(this))

        val adapter = ArrayAdapter<String>(this, android.R.layout.simple_list_item_1)
        adapter.add("Item 1")
        adapter.add("Item 2")
        adapter.add("Item 3")
        bar.setListNavigationCallbacks(adapter, this)
    }

    override fun onCreateOptionsMenu(menu: Menu): Boolean {
        menuInflater.inflate(R.menu.display_options_actions, menu)
        return true
    }

    override fun onClick(v: View) {
        val bar = supportActionBar
        var flags = 0
        when (v.id) {
            R.id.toggle_home_as_up -> flags = ActionBar.DISPLAY_HOME_AS_UP
            R.id.toggle_show_home -> flags = ActionBar.DISPLAY_SHOW_HOME
            R.id.toggle_use_logo -> {
                flags = ActionBar.DISPLAY_USE_LOGO
                if(flags and bar!!.displayOptions == 0) {
                    bar.setIcon(R.drawable.apidemo_androidlogo)
                } else {
                    bar.setIcon(R.drawable.app_sample_code)
                }

            }
            R.id.toggle_show_title -> flags = ActionBar.DISPLAY_SHOW_TITLE
            R.id.toggle_show_custom -> flags = ActionBar.DISPLAY_SHOW_CUSTOM
            R.id.cycle_custom_gravity -> {
                val lp = mCustomView!!.layoutParams as ActionBar.LayoutParams
                var newGravity = 0
                when (lp.gravity and Gravity.RELATIVE_HORIZONTAL_GRAVITY_MASK) {
                    Gravity.START -> newGravity = Gravity.CENTER_HORIZONTAL
                    Gravity.CENTER_HORIZONTAL -> newGravity = Gravity.END
                    Gravity.END -> newGravity = Gravity.START
                }
                lp.gravity = lp.gravity and Gravity.RELATIVE_HORIZONTAL_GRAVITY_MASK.inv() or newGravity

                bar!!.setCustomView(mCustomView, lp)
                return
            }
            R.id.toggle_visibility -> {

                if (bar!!.isShowing) {
                    bar.hide()
                } else {
                    bar.show()
                }
                return
            }
            R.id.toggle_system_ui -> {
                if (window.decorView.systemUiVisibility and View.SYSTEM_UI_FLAG_FULLSCREEN != 0) {
                    window.decorView.systemUiVisibility = 0
                } else {
                    window.decorView.systemUiVisibility = View.SYSTEM_UI_FLAG_FULLSCREEN
                }
                return
            }
        }

        val change = bar!!.displayOptions xor flags

        bar.setDisplayOptions(change, flags)
    }

    override fun onTabSelected(tab: Tab, ft: FragmentTransaction) {}

    override fun onTabUnselected(tab: Tab, ft: FragmentTransaction) {}

    override fun onTabReselected(tab: Tab, ft: FragmentTransaction) {}

    override fun onItemSelected(parent: AdapterView<*>, view: View?, position: Int, id: Long) {
        val bar = supportActionBar

        when (parent.id) {
            R.id.toggle_navigation -> {
                val mode: Int = when (position) {
                    1 -> ActionBar.NAVIGATION_MODE_TABS
                    2 -> ActionBar.NAVIGATION_MODE_LIST
                    else -> ActionBar.NAVIGATION_MODE_STANDARD
                }

                bar!!.navigationMode = mode
            }
        }
    }

    override fun onNothingSelected(parent: AdapterView<*>) {}

    override fun onNavigationItemSelected(itemPosition: Int, itemId: Long): Boolean {
        return false
    }
}
```
