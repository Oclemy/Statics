# Kotin Android ActionBar Navigation Examples


Let us look at various ActionBar Navigation Examples in Kotlin android in a step by step manner.

[lwtoc]

## Example 1: Kotlin ActionBar Navigation

This example demonstrates implementing common navigation flows with the action bar. It shows how to use "Up" button in Action Bar, new Document is created in a separate activity, so you have to use "recent" to switch to it, and then the "up" button works as "up", otherwise it works as "Back". Uses the attribute `android:taskAffinity=":bar_navigation"` to associate the activities.

### Step 1: Create Project

Start by creating an empty android studio project.

### Step 2: Dependencies

No external dependencies are needed for this project.

### Step 3: Design Layout

Design a layout for the `MainActivity` as follows:

```xml
<?xml version="1.0" encoding="utf-8"?>
<LinearLayout xmlns:android="http://schemas.android.com/apk/res/android"
    android:orientation="vertical" android:padding="4dip"
    android:gravity="center_horizontal"
    android:layout_width="match_parent" android:layout_height="match_parent">

    <TextView
        android:layout_width="match_parent" android:layout_height="wrap_content"
        android:layout_weight="0"
        android:layout_marginTop="16dp" android:layout_marginBottom="16dp"
        android:textAppearance="?android:attr/textAppearanceMedium"
        android:text="@string/action_bar_navigation_msg"/>

    <TextView android:id="@+id/launchedfrom"
        android:layout_width="match_parent" android:layout_height="wrap_content"
        android:layout_weight="0" android:layout_marginBottom="32dp"
        android:textAppearance="?android:attr/textAppearanceMedium"/>

    <Button android:id="@+id/newactivity"
        android:layout_width="wrap_content" android:layout_height="wrap_content"
        android:layout_marginBottom="16dp"
        android:onClick="onNewActivity"
        android:text="@string/btn_newactivity">
        <requestFocus />
    </Button>

    <Button android:id="@+id/newdoc"
        android:layout_width="wrap_content" android:layout_height="wrap_content"
        android:onClick="onNewDocument"
        android:text="@string/btn_newdoc">
        <requestFocus />
    </Button>

</LinearLayout>
```

### Step 4: Write Code

Create `ActionBarNavigation.kt` and add the following imports:

```kotlin
import android.annotation.SuppressLint
import android.annotation.TargetApi
import android.content.Intent
import android.os.Build
import android.os.Bundle
import android.view.View
import android.widget.TextView

import androidx.appcompat.app.AppCompatActivity
import androidx.appcompat.app.ActionBar

import com.example.android.apis.R
```

Extend the AppCompatActivity and target `Lollipop`:

```kotlin
@TargetApi(Build.VERSION_CODES.LOLLIPOP)
@SuppressLint("SetTextI18n")
class ActionBarNavigation : AppCompatActivity() {
```

Here's our `onCreate()` method. It is called when the activity is starting. First we call through to our super's implementation of onCreate. Then we get a reference to this activity's ActionBar and set the display option `DISPLAY_HOME_AS_UP`.

We set the content view to our layout file `R.layout.action_bar_navigation`, locate the TextView text `(R.id.launchedfrom`) for our message, and based on whether the category `Intent.CATEGORY_SAMPLE_CODE` exists in the intent that launched our activity we either set the text of "text" to "This was launched from ApiDemos" if it does or "This was created from up navigation" if it does not.

- `@param savedInstanceState` - we do not override `onSaveInstanceState` so do not use.

```kotlin
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
```

Turn on the up affordance:

```kotlin
        val bar = supportActionBar
```

Then:

```kotlin
        bar!!.setDisplayOptions(ActionBar.DISPLAY_HOME_AS_UP, ActionBar.DISPLAY_HOME_AS_UP)

        setContentView(R.layout.action_bar_navigation)
        val text = findViewById<TextView>(R.id.launchedfrom)
        if (intent.hasCategory(Intent.CATEGORY_SAMPLE_CODE)) {
            text.text = "This was launched from ApiDemos"
        } else {
            text.text = "This was created from up navigation"
        }
    }
```

The following is specified by the "New in-task activity" Button by the xml attribute android:onClick="onNewActivity" and is called if the Button is clicked.

We create an Intent that will launch the Activity ActionBarNavigationTarget, and then we start this activity.

- @param button "New in-task activity" Button

```kotlin
    @Suppress("UNUSED_PARAMETER")
    fun onNewActivity(button: View) {
        val intent = Intent(this, ActionBarNavigationTarget::class.java)
        startActivity(intent)
    }
```

This is specified by the "New document" Button by the xml attribute `android:onClick="onNewDocument"` and is called if the Button is clicked.

We create an Intent that will launch the Activity ActionBarNavigationTarget, add the flag `Intent.FLAG_ACTIVITY_NEW_DOCUMENT` to the Intent and then we start this activity.

- @param button "New document" Button

```kotlin
    @Suppress("UNUSED_PARAMETER")
    fun onNewDocument(button: View) {
        val intent = Intent(this, ActionBarNavigationTarget::class.java)
        intent.addFlags(Intent.FLAG_ACTIVITY_NEW_DOCUMENT)
        startActivity(intent)
    }
}
```

Here is the full code:

**ActionBarNavigation.kt**

```kotlin

import android.annotation.SuppressLint
import android.annotation.TargetApi
import android.content.Intent
import android.os.Build
import android.os.Bundle
import android.view.View
import android.widget.TextView

import androidx.appcompat.app.AppCompatActivity
import androidx.appcompat.app.ActionBar

import com.example.android.apis.R

@TargetApi(Build.VERSION_CODES.LOLLIPOP)
@SuppressLint("SetTextI18n")
class ActionBarNavigation : AppCompatActivity() {

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)

        // Turn on the up affordance.
        val bar = supportActionBar

        bar!!.setDisplayOptions(ActionBar.DISPLAY_HOME_AS_UP, ActionBar.DISPLAY_HOME_AS_UP)

        setContentView(R.layout.action_bar_navigation)
        val text = findViewById<TextView>(R.id.launchedfrom)
        if (intent.hasCategory(Intent.CATEGORY_SAMPLE_CODE)) {
            text.text = "This was launched from ApiDemos"
        } else {
            text.text = "This was created from up navigation"
        }
    }

    @Suppress("UNUSED_PARAMETER")
    fun onNewActivity(button: View) {
        val intent = Intent(this, ActionBarNavigationTarget::class.java)
        startActivity(intent)
    }

    @Suppress("UNUSED_PARAMETER")
    fun onNewDocument(button: View) {
        val intent = Intent(this, ActionBarNavigationTarget::class.java)
        intent.addFlags(Intent.FLAG_ACTIVITY_NEW_DOCUMENT)
        startActivity(intent)
    }
}
```

### Step 5: Run

1. Copy the code into your project
2. Run

## Example 2: Kotlin ActionBar Navigation Target

This example shows how to use "Up" button in Action Bar, new Document is created in a separate activity, so you have to use "recent" to switch to it, and then the "up" button works as "up", otherwise it works as "Back". Uses the attribute `android:taskAffinity=":bar_navigation"` to associate the activities.

### Step 1: Create Project

Create Android Studio Project.

### Step 2: Dependencies

No external dependencies are needed.

### Step 3: Design layout

Design the layout for the activity as follows:

**action_bar_navigation_target.xml**

```xml
<?xml version="1.0" encoding="utf-8"?>
<LinearLayout xmlns:android="http://schemas.android.com/apk/res/android"
    android:orientation="vertical" android:padding="4dip"
    android:gravity="center_horizontal"
    android:layout_width="match_parent" android:layout_height="match_parent">

    <TextView
        android:layout_width="match_parent" android:layout_height="wrap_content"
        android:layout_weight="0"
        android:layout_marginTop="16dp" android:layout_marginBottom="16dp"
        android:textAppearance="?android:attr/textAppearanceMedium"
        android:text="@string/action_bar_navigation_target_msg"/>

</LinearLayout>
```

### Step 4: Write Code

Create a `ActionBarNavigationTarget.kt` and add imports:

```kotlin
import android.annotation.TargetApi
import androidx.appcompat.app.ActionBar
import android.os.Build
import android.os.Bundle
import androidx.appcompat.app.AppCompatActivity
import com.example.android.apis.R
```

Then extend the `AppCompatActivity`:

```kotlin
@TargetApi(Build.VERSION_CODES.HONEYCOMB)
class ActionBarNavigationTarget : AppCompatActivity() {
```

The content view is set to our layout file `R.layout.action_bar_navigation_target`. We fetch a reference to our ActionBar and set the display option DISPLAY_HOME_AS_UP.

- `@param savedInstanceState` always null since onSaveInstanceState is not overridden

```kotlin
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.action_bar_navigation_target)

        // Turn on the up affordance.
        val bar = supportActionBar

        bar!!.setDisplayOptions(ActionBar.DISPLAY_HOME_AS_UP, ActionBar.DISPLAY_HOME_AS_UP)
    }
}
```

Here is the full code:

**ActionBarNavigationTarget.kt**

```kotlin
import android.annotation.TargetApi
import androidx.appcompat.app.ActionBar
import android.os.Build
import android.os.Bundle
import androidx.appcompat.app.AppCompatActivity
import com.example.android.apis.R

@TargetApi(Build.VERSION_CODES.HONEYCOMB)
class ActionBarNavigationTarget : AppCompatActivity() {

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.action_bar_navigation_target)

        // Turn on the up affordance.
        val bar = supportActionBar

        bar!!.setDisplayOptions(ActionBar.DISPLAY_HOME_AS_UP, ActionBar.DISPLAY_HOME_AS_UP)
    }
}
```

### Step 5: Run

1. Copy code into your project.
2. Run
