# AndroidX Browser Actions Example


This is a simple example to demonstrate AndroidX browser actions using BroadcastReceiver.

This example will comprise the following files:

- `BrowserActionReceiver.kt`
- `MainActivity.kt`

### Step 1: Create Project

1. Open your `AndroidStudio` IDE.
2. Go to `File-->New-->Project` to create a new project.

### Step 2: Add Dependencies


In your `app/build.gradle` add dependencies as shown below:

Add `androidx.browser` as a dependency among your other normal dependencies:

```groovy

dependencies {
//..
    implementation 'androidx.browser:browser:1.0.0-alpha1'
}
```

### Step 3: Design Layouts


***(a). `activity_main.xml`**

Create a file named `activity_main.xml` and design it as follows:

```xml
<?xml version="1.0" encoding="utf-8"?>
<androidx.coordinatorlayout.widget.CoordinatorLayout xmlns:android="http://schemas.android.com/apk/res/android"
    xmlns:app="http://schemas.android.com/apk/res-auto"
    xmlns:tools="http://schemas.android.com/tools"
    android:layout_width="match_parent"
    android:layout_height="match_parent"
    tools:context=".MainActivity">

    <com.google.android.material.appbar.AppBarLayout
        android:layout_width="match_parent"
        android:layout_height="wrap_content"
        android:theme="@style/AppTheme.AppBarOverlay">

        <androidx.appcompat.widget.Toolbar
            android:id="@+id/toolbar"
            android:layout_width="match_parent"
            android:layout_height="?attr/actionBarSize"
            android:background="?attr/colorPrimary"
            app:popupTheme="@style/AppTheme.PopupOverlay" />

    </com.google.android.material.appbar.AppBarLayout>

    <include layout="@layout/content_main" />

</androidx.coordinatorlayout.widget.CoordinatorLayout>
```
***(b). `content_main.xml`**

Create a file named `content_main.xml` and design it as follows:

```xml
<?xml version="1.0" encoding="utf-8"?>
<androidx.constraintlayout.widget.ConstraintLayout xmlns:android="http://schemas.android.com/apk/res/android"
    xmlns:app="http://schemas.android.com/apk/res-auto"
    xmlns:tools="http://schemas.android.com/tools"
    android:layout_width="match_parent"
    android:layout_height="match_parent"
    android:padding="16dp"
    app:layout_behavior="@string/appbar_scrolling_view_behavior"
    tools:context=".MainActivity"
    tools:showIn="@layout/activity_main">

    <com.google.android.material.button.MaterialButton
        android:id="@+id/simpleBrowserActionsButton"
        android:layout_width="0dp"
        android:layout_height="wrap_content"
        android:text="Simple Browser Actions"
        app:layout_constraintEnd_toEndOf="parent"
        app:layout_constraintStart_toStartOf="parent"
        app:layout_constraintTop_toTopOf="parent" />

    <com.google.android.material.button.MaterialButton
        android:id="@+id/browserActionsAndCustomButton"
        android:layout_width="0dp"
        android:layout_height="wrap_content"
        android:text="Browser Actions And Custom Action"
        app:layout_constraintEnd_toEndOf="parent"
        app:layout_constraintStart_toStartOf="parent"
        app:layout_constraintTop_toBottomOf="@+id/simpleBrowserActionsButton" />

    <com.google.android.material.button.MaterialButton
        android:id="@+id/browserActionsAndReceiverButton"
        android:layout_width="0dp"
        android:layout_height="wrap_content"
        android:text="Browser Actions And Receiver"
        app:layout_constraintEnd_toEndOf="parent"
        app:layout_constraintStart_toStartOf="parent"
        app:layout_constraintTop_toBottomOf="@+id/browserActionsAndCustomButton" />

</androidx.constraintlayout.widget.ConstraintLayout>
```

### Step 4: Write Code

Write Code as follows:

**(a). `BrowserActionReceiver.kt`**

Create a file named `BrowserActionReceiver.kt` and create a `BrowserActionReceiver` by extending the `android.content.BroadcastReceiver` then overriding the `onReceive()` callback as shown below:

Here is the full code

```kotlin
package com.numero.browser_actions_example

import android.content.BroadcastReceiver
import android.content.Context
import android.content.Intent
import android.widget.Toast

class BrowserActionReceiver : BroadcastReceiver() {
    override fun onReceive(context: Context?, p1: Intent?) {
        context ?: return
        Toast.makeText(context, "Received", Toast.LENGTH_LONG).show()
    }
}
```

**(b). `MainActivity.kt`**

Create a file named `MainActivity.kt` and add the following code:


Here is the full code

```kotlin
import android.app.PendingIntent
import android.content.Intent
import android.os.Bundle
import android.view.Menu
import android.view.MenuItem
import androidx.appcompat.app.AppCompatActivity
import androidx.browser.browseractions.BrowserActionItem
import androidx.browser.browseractions.BrowserActionsIntent
import androidx.core.net.toUri
import kotlinx.android.synthetic.main.activity_main.*
import kotlinx.android.synthetic.main.content_main.*

class MainActivity : AppCompatActivity() {

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_main)
        setSupportActionBar(toolbar)

        simpleBrowserActionsButton.setOnClickListener {
            showSimpleBrowserActions()
        }
        browserActionsAndCustomButton.setOnClickListener {
            showBrowserActionsAndCustom()
        }
        browserActionsAndReceiverButton.setOnClickListener {
            showBrowserActionsAndReceiver()
        }

    }

    override fun onCreateOptionsMenu(menu: Menu): Boolean {
        menuInflater.inflate(R.menu.menu_main, menu)
        return true
    }

    override fun onOptionsItemSelected(item: MenuItem): Boolean {
        return when (item.itemId) {
            R.id.action_settings -> true
            else -> super.onOptionsItemSelected(item)
        }
    }

    private fun showSimpleBrowserActions() {
        val uri = GOOGLE_URL.toUri()
        BrowserActionsIntent.openBrowserAction(this, uri)
    }

    private fun showBrowserActionsAndCustom() {
        val uri = GOOGLE_URL.toUri()

        val openLinkIntent = Intent(Intent.ACTION_VIEW, GOOGLE_APP_URL.toUri())
        val pendingIntent = PendingIntent.getActivity(this, 0, openLinkIntent, 0)
        val myAction = BrowserActionItem("My Custom Action!", pendingIntent, R.drawable.ic_android)
        val items = arrayListOf(myAction)

        BrowserActionsIntent.openBrowserAction(this, uri, BrowserActionsIntent.URL_TYPE_NONE, items, null)
    }

    private fun showBrowserActionsAndReceiver() {
        val uri = GOOGLE_URL.toUri()

        val defaultIntent = Intent().apply {
            setClass(applicationContext, BrowserActionReceiver::class.java)
        }
        val defaultAction = PendingIntent.getBroadcast(this, 0, defaultIntent, 0)

        BrowserActionsIntent.openBrowserAction(this, uri, BrowserActionsIntent.URL_TYPE_NONE, arrayListOf(), defaultAction)
    }

    companion object {
        private const val GOOGLE_URL = "https://www.google.co.jp/"
        private const val GOOGLE_APP_URL = "market://details?id=com.google.android.googlequicksearchbox"
    }
}
```

### Run

Simply copy the source code into your Android Project,Build and Run. 

### Reference

1. [Download](https://github.com/NUmeroAndDev/BrowserActionsExample-android-master/archive/refs/heads/master.zip) code or Browse [here](https://github.com/NUmeroAndDev/BrowserActionsExample-android).
2. [Follow](https://github.com/NUmeroAndDev/) code author.


