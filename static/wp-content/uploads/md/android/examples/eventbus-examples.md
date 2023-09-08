# EventBus Example


> Simple step by step eventbus examples for android.

### Step 1: Install EventBus

Start by installing the eventbus as has been discussed above:

```groovy
    implementation "org.greenrobot:eventbus:${versions.eventbus}"
    kapt "org.greenrobot:eventbus-annotation-processor:${versions.eventbusProcessor}"
```

### Step 2: Design Layouts

**(a). activity_empty.xml**

```xml
<?xml version="1.0" encoding="utf-8"?>
<RelativeLayout xmlns:android="http://schemas.android.com/apk/res/android"
    xmlns:tools="http://schemas.android.com/tools"
    android:layout_width="match_parent"
    android:layout_height="match_parent"
    android:paddingLeft="@dimen/activity_horizontal_margin"
    android:paddingRight="@dimen/activity_horizontal_margin"
    android:paddingTop="@dimen/activity_vertical_margin"
    android:paddingBottom="@dimen/activity_vertical_margin"
    tools:context="com.example.eventbuskotlin.EmptyActivity">

    <Button
        android:layout_width="wrap_content"
        android:layout_height="wrap_content"
        android:onClick="onPostStickyButtonClick"
        android:text="@string/action_post_sticky"/>

</RelativeLayout>

```

**(b). fragment_blank.xml**

```xml
<FrameLayout xmlns:android="http://schemas.android.com/apk/res/android"
    xmlns:tools="http://schemas.android.com/tools"
    android:layout_width="match_parent"
    android:layout_height="match_parent"
    tools:context="com.example.eventbuskotlin.BlankFragment">

    <TextView
        android:layout_width="match_parent"
        android:layout_height="match_parent"
        android:text="@string/hello_blank_fragment" />

</FrameLayout>

```

**(c). activity_main.xml**

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
    android:paddingTop="@dimen/activity_vertical_margin"
    tools:context="com.example.eventbuskotlin.MainActivity">

    <Button
        android:layout_width="wrap_content"
        android:layout_height="wrap_content"
        android:onClick="onPostButtonClick"
        android:text="@string/action_post" />

    <Button
        android:layout_width="wrap_content"
        android:layout_height="wrap_content"
        android:onClick="onLaunchButtonClick"
        android:text="@string/action_launch_activity" />

    <FrameLayout
        android:id="@+id/containerFragment"
        android:layout_width="match_parent"
        android:layout_height="250dp" />

</LinearLayout>

```

### Step 3: Initialize EventBus

Initialize it in the `onCreate()` method of the `Application` class:

```kotlin
package com.example.eventbuskotlin

import android.app.Application
import org.greenrobot.eventbus.EventBus

class EventBusApp: Application() {

    override fun onCreate() {
        super.onCreate()

        EventBus.builder()
                // have a look at the index class to see which methods are picked up
                // if not in the index @Subscribe methods will be looked up at runtime (expensive)
                .addIndex(MyEventBusIndex())
                .installDefaultEventBus()
    }

}

```
### Step 4: Create Fragments

Create two fragments:

**(a). BlankBaseFragment.kt**

```kotlin
package com.example.eventbuskotlin

import android.support.v4.app.Fragment
import android.util.Log
import android.widget.Toast
import org.greenrobot.eventbus.EventBus

abstract class BlankBaseFragment : Fragment() {

    override fun onStart() {
        super.onStart()
        EventBus.getDefault().register(this)
    }

    override fun onStop() {
        super.onStop()
        EventBus.getDefault().unregister(this)
    }

    open fun handleEvent(event: SampleEvent) {
        val className = this.javaClass.simpleName
        val message = "#handleEvent: called for " + event.javaClass.simpleName
        Toast.makeText(context, className + message, Toast.LENGTH_SHORT).show()
        Log.d(className, message)
    }

    class SampleEvent
}

```

**(b). BlankFragment.kt**

```kotlin
package com.example.eventbuskotlin

import android.os.Bundle
import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import org.greenrobot.eventbus.Subscribe

class BlankFragment : BlankBaseFragment() {

    override fun onCreateView(inflater: LayoutInflater, container: ViewGroup?,
                              savedInstanceState: Bundle?): View? {
        return inflater.inflate(R.layout.fragment_blank, container, false)
    }

    @Subscribe // subscribe annotation in base class would not be picked up by index
    override fun handleEvent(event: BlankBaseFragment.SampleEvent) {
        super.handleEvent(event)
    }

    class SampleEvent
}

```

### Step 5: Create Activities

We will have two activities:

**(a). EmptyActivity.kt**

```kotlin
package com.example.eventbuskotlin

import android.os.Bundle
import android.support.v7.app.AppCompatActivity
import android.view.View

import org.greenrobot.eventbus.EventBus

class EmptyActivity : AppCompatActivity() {

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_empty)
    }

    fun onPostStickyButtonClick(view: View) {
        EventBus.getDefault().postSticky(BlankBaseFragment.SampleEvent())
        finish()
    }

}

```

**(b). MainActivity.kt**

```kotlin
package com.example.eventbuskotlin

import android.content.Intent
import android.os.Bundle
import android.support.v7.app.AppCompatActivity
import android.util.Log
import android.view.View
import android.widget.Toast
import org.greenrobot.eventbus.EventBus
import org.greenrobot.eventbus.Subscribe

class MainActivity : AppCompatActivity() {

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_main)
    }

    override fun onStart() {
        super.onStart()
        EventBus.getDefault().register(this)
    }

    override fun onStop() {
        super.onStop()
        EventBus.getDefault().unregister(this)
    }

    @Subscribe(sticky = true)
    fun handleEvent(event: BlankBaseFragment.SampleEvent) {
        val className = this.javaClass.simpleName
        val message = "#handleEvent: called for " + event.javaClass.simpleName
        Toast.makeText(this, className + message, Toast.LENGTH_SHORT).show()
        Log.d(className, message)

        // prevent event from re-delivering, like when leaving and coming back to app
        EventBus.getDefault().removeStickyEvent(event)
    }

    fun onPostButtonClick(view: View) {
        EventBus.getDefault().post(BlankBaseFragment.SampleEvent())
    }

    fun onLaunchButtonClick(view: View) {
        startActivity(Intent(this, EmptyActivity::class.java))
    }
}

```

### Reference

> Download all examples [here](https://github.com/greenrobot-team/greenrobot-examples/archive/refs/heads/master.zip.)
> Follow code author [here](https://github.com/greenrobot-team/)
