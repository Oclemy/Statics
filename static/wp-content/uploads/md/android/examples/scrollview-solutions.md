# ScrollView Libraries and Examples


This tutorial wants to explore some the alternative as well as enhancements to the native `android.widget.ScrollView`. We will discuss various third party solutins, how to use them as well as full examples.


But first what is a scollview?

> It is a view group that allows the view hierarchy placed within it to be scrolled. When using a ScrollView or any of it's subclasses, you should only place one direct child to it.

To add multiple views within the scroll view, make the direct child you add a view group, for example `[LinearLayout](https://developer.android.com/reference/android/widget/LinearLayout)`, and place additional views within that LinearLayout.

## (a). ScalableScrollView

> This library is a modification of `android.widget.ScrollView` and allows user to resize TextView, placed into it, by two fingers.

Here is a demo showing that:

[![alt text](https://github.com/ArtemBotnev/gifs/raw/master/ssv.gif)](https://github.com/ArtemBotnev/gifs/blob/master/ssv.gif)

So how do you use it?

### Step 1: Install it

You need to register Jitpack as a repository. Do this as shown in the below code. Do it inside `root/build.gradle`:

```groovy
allprojects {
 repositories {
  ...
  maven { url 'https://jitpack.io' }
  }
 }
```

Then in the `app/build.gradle` add the implementation statement:

```groovy
dependencies {
 implementation 'com.github.ArtemBotnev:ScalableScrollView:1.0.1'
}
```

Then sync.

### Step 2: Add to Layout

To use it is straightforward. Simply replace your `ScrollView` with `ScalableScrollView`:

```xml
<?xml version="1.0" encoding="utf-8"?>
<com.artembotnev.view.ScalableScrollView
        xmlns:android="http://schemas.android.com/apk/res/android"
        xmlns:app="http://schemas.android.com/apk/res-auto"
        xmlns:tools="http://schemas.android.com/tools"
        android:layout_width="match_parent"
        android:layout_height="match_parent"
        app:maxScale="2.5"
        tools:context=".MainActivity">

    <TextView
            android:layout_width="wrap_content"
            android:layout_height="wrap_content"
            android:textSize="16sp"
            android:text="@string/android_article" />

</com.artembotnev.view.ScalableScrollView>
```

That's it.

### Reference

Read more [here](https://github.com/ArtemBotnev/ScalableScrollView).

## (b). SnappingScrollView

> A scrollview for Android that follows drag path and snaps to the top or bottom.

Through this library you get an enhanced ScrollView. It adds Bottom Sheet like snapping behaviour to the scrollview.

Here's the demo:

![](https://github.com/abhriyaroy/SnappingScrollView/raw/master/snappingScroll.gif)

- It Extends the scrollview class
- Min sdk 15
- Written in kotlin
- Offers disable scroll helper method

Here's how you use it.

### Step 1: Install it

Start by installing it using the following implementation statmenet:

```groovy
          implementation "com.zebrostudio.snappingscrollview:snappingscrollview:{latest_version}"
```

Check version [here](https://github.com/abhriyaroy/SnappingScrollView).

Alternatively you can just copy [this file](https://github.com/abhriyaroy/SnappingScrollView/blob/master/snappingscrollview/src/main/java/com/zebrostudio/snappingscrollview/SnappingScrollView.kt) into your project.

### Step 2: Add to Layout

Next you need to add it to your xml layout as follows:

```xml
<com.zebrostudio.snappingscrollview.SnappingScrollView
    android:layout_width="match_parent"
    android:layout_height="wrap_content"
    android:id="@+id/snappingScrollView"
    android:fillViewport="true">

    <LinearLayout
        android:orientation="vertical"
        android:layout_width="match_parent"
        android:layout_height="wrap_content">

        <View
            android:layout_width="match_parent"
            android:layout_height="600dp"
            android:background="@color/colorAccent"/>

        <View
            android:layout_width="match_parent"
            android:layout_height="600dp"
            android:id="@+id/view2"
            android:background="@color/colorPrimaryDark"/>

        <View
            android:layout_width="match_parent"
            android:layout_height="600dp"
            android:background="@color/colorPrimary"/>

         <!-- Other views -->

    </LinearLayout>

</com.zebrostudio.snappingscrollview.SnappingScrollView>
```

### Step 3: Write Code

Then in your class:

```kotlin
snappingScrollView.viewTreeObserver.addOnGlobalLayoutListener(object : ViewTreeObserver.OnGlobalLayoutListener {
        override fun onGlobalLayout() {
            // Remove the layout listener
            if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.JELLY_BEAN) {
                snappingScrollView.viewTreeObserver.removeOnGlobalLayoutListener(this)
            } else {
                snappingScrollView.viewTreeObserver.removeGlobalOnLayoutListener(this)
            }
        // Set the view to be snapped on scrolling
            snappingScrollView.setSnappingView(view2)
        }
    })
```

### Full Example

Here's a full example. Start by installing the library as has been discussed above.

Then in replace your main layout with the following code:

**activity_main.xml**

```xml
<?xml version="1.0" encoding="utf-8"?>
<androidx.constraintlayout.widget.ConstraintLayout xmlns:android="http://schemas.android.com/apk/res/android"
    xmlns:app="http://schemas.android.com/apk/res-auto"
    xmlns:tools="http://schemas.android.com/tools"
    android:layout_width="match_parent"
    android:layout_height="match_parent"
    tools:context=".MainActivity">

    <com.zebrostudio.snappingscrollview.SnappingScrollView
        android:layout_width="match_parent"
        android:layout_height="wrap_content"
        android:id="@+id/snappingScrollView"
        app:layout_constraintStart_toStartOf="parent"
        app:layout_constraintTop_toTopOf="parent"
        android:fillViewport="true">

        <LinearLayout
            android:orientation="vertical"
            android:layout_width="match_parent"
            android:layout_height="wrap_content">

            <View
                android:layout_width="match_parent"
                android:layout_height="600dp"
                android:background="@color/colorAccent"/>

            <View
                android:layout_width="match_parent"
                android:layout_height="600dp"
                android:id="@+id/view2"
                android:background="@color/colorPrimaryDark"/>

            <View
                android:layout_width="match_parent"
                android:layout_height="600dp"
                android:background="@color/colorPrimary"/>

        </LinearLayout>

    </com.zebrostudio.snappingscrollview.SnappingScrollView>

</androidx.constraintlayout.widget.ConstraintLayout>
```

And you MainActivity code with the following;

**MainActivity.kt**

```kotlin
package com.zebrostudio.snappingscrollviewexample

import android.os.Build
import android.os.Bundle
import android.view.ViewTreeObserver
import androidx.appcompat.app.AppCompatActivity
import kotlinx.android.synthetic.main.activity_main.*

class MainActivity : AppCompatActivity() {

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_main)
        snappingScrollView.viewTreeObserver.addOnGlobalLayoutListener(object :
            ViewTreeObserver.OnGlobalLayoutListener {
            override fun onGlobalLayout() {
                // Remove the layout listener
                if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.JELLY_BEAN) {
                    snappingScrollView.viewTreeObserver.removeOnGlobalLayoutListener(this)
                } else {
                    snappingScrollView.viewTreeObserver.removeGlobalOnLayoutListener(this)
                }
                // Set the view to be snapped on scrolling
                snappingScrollView.setSnappingView(view2)
            }
        })
    }
}
```

That's it.

### Reference

Below are the reference links:

| Number | Link |
| --- | --- |
| 1. | [Download](https://downgit.github.io/#/home?url=https://github.com/abhriyaroy/SnappingScrollView/tree/master/app) code |
| 2. | [Read](https://github.com/abhriyaroy/SnappingScrollView/) more |
| 3. | [Follow](https://github.com/abhriyaroy/) code author |
