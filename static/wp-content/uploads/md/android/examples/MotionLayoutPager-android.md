# MotionLayout Pager Example


Let us look at a Android MotionLayoutPager using this example.  Basically we implement a ViewPager using `MotionLayout`.

Here is the demo GIF:

![Android MotionLayoutPager Example](https://github.com/NUmeroAndDev/MotionLayoutPager-android/raw/master/screenshot/example.gif)

This example will comprise the following files:

- `MainActivity.kt`

### Step 1: Create Project

1. Open your `AndroidStudio` IDE.
2. Go to `File-->New-->Project` to create a new project.

### Step 2: Add Dependencies


In your `app/build.gradle` add dependencies as shown below:

First enable Java8:

```groovy
    compileOptions {
        sourceCompatibility JavaVersion.VERSION_1_8
        targetCompatibility JavaVersion.VERSION_1_8
    }
    kotlinOptions {
        jvmTarget = '1.8'
    }

}
```

No third party dependency is needed. We use the standard androidx libraries. Make sure to include `ConstraintLayout`:

```groovy
dependencies {
    implementation fileTree(dir: 'libs', include: ['*.jar'])
    implementation "org.jetbrains.kotlin:kotlin-stdlib-jdk7:$kotlin_version"
    implementation 'androidx.appcompat:appcompat:1.1.0'
    implementation 'androidx.core:core-ktx:1.1.0'
    implementation 'com.google.android.material:material:1.2.0-alpha03'
    implementation 'androidx.constraintlayout:constraintlayout:2.0.0-beta4'
}
```

### Step 3: Design Layouts


**(a). `activity_main.xml`**

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
        style="@style/Widget.MaterialComponents.AppBarLayout.Primary"
        android:layout_width="match_parent"
        android:layout_height="wrap_content">

        <com.google.android.material.appbar.MaterialToolbar
            android:id="@+id/toolbar"
            style="@style/Widget.MaterialComponents.Toolbar.Primary"
            android:layout_width="match_parent"
            android:layout_height="?attr/actionBarSize" />

    </com.google.android.material.appbar.AppBarLayout>

    <androidx.constraintlayout.motion.widget.MotionLayout
        android:id="@+id/motionLayout"
        android:layout_width="match_parent"
        android:layout_height="match_parent"
        app:layoutDescription="@xml/motion_list"
        app:layout_behavior="@string/appbar_scrolling_view_behavior">

        <com.google.android.material.card.MaterialCardView
            android:id="@+id/leftView"
            android:layout_width="match_parent"
            android:layout_height="match_parent"
            app:cardElevation="4dp">

            <TextView
                android:id="@+id/leftTextView"
                android:layout_width="match_parent"
                android:layout_height="match_parent"
                android:layout_gravity="center"
                android:gravity="center"
                android:textAppearance="?attr/textAppearanceHeadline5"
                android:textColor="?attr/colorOnSurface" />

        </com.google.android.material.card.MaterialCardView>

        <com.google.android.material.card.MaterialCardView
            android:id="@+id/rightView"
            android:layout_width="match_parent"
            android:layout_height="match_parent"
            app:cardElevation="4dp">

            <TextView
                android:id="@+id/rightTextView"
                android:layout_width="match_parent"
                android:layout_height="match_parent"
                android:layout_gravity="center"
                android:gravity="center"
                android:textAppearance="?attr/textAppearanceHeadline5"
                android:textColor="?attr/colorOnSurface" />

        </com.google.android.material.card.MaterialCardView>

        <com.google.android.material.card.MaterialCardView
            android:id="@+id/centerView"
            android:layout_width="match_parent"
            android:layout_height="match_parent"
            app:cardElevation="4dp">

            <TextView
                android:id="@+id/centerTextView"
                android:layout_width="match_parent"
                android:layout_height="match_parent"
                android:layout_gravity="center"
                android:gravity="center"
                android:textAppearance="?attr/textAppearanceHeadline5"
                android:textColor="?attr/colorOnSurface" />

        </com.google.android.material.card.MaterialCardView>

    </androidx.constraintlayout.motion.widget.MotionLayout>

</androidx.coordinatorlayout.widget.CoordinatorLayout>
```

### Step 4: Write Code

Write Code as follows:

**(a). `MainActivity.kt`**

Create a file named `MainActivity.kt`


Here is the full code

```kotlin
package com.example.motionlayout_pager_example

import android.annotation.SuppressLint
import android.os.Bundle
import androidx.appcompat.app.AppCompatActivity
import android.view.Menu
import android.view.MenuItem
import androidx.constraintlayout.motion.widget.MotionLayout

import kotlinx.android.synthetic.main.activity_main.*

class MainActivity : AppCompatActivity() {

    private var currentPosition = 0
    private val itemList = listOf(
            1, 2, 3, 4, 5, 6, 7, 8, 9, 10
    )

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_main)
        setSupportActionBar(toolbar)

        setupMotion()
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

    private fun setupMotion() {
        motionLayout.setTransitionListener(object : MotionLayout.TransitionListener {
            override fun onTransitionTrigger(motionLayout: MotionLayout?, triggerId: Int, positive: Boolean, progress: Float) {
            }

            override fun onTransitionStarted(motionLayout: MotionLayout?, startedId: Int, endId: Int) {
            }

            override fun onTransitionChange(motionLayout: MotionLayout?, startId: Int, endId: Int, progress: Float) {
            }

            override fun onTransitionCompleted(motionLayout: MotionLayout?, currentId: Int) {
                when (currentId) {
                    R.id.move_left_to_right -> {
                        if (currentPosition > 0) {
                            currentPosition--
                        } else {
                            currentPosition = itemList.lastIndex
                        }
                        motionLayout?.progress = 0F
                        updateView()
                    }
                    R.id.move_right_to_left -> {
                        if (currentPosition < itemList.lastIndex) {
                            currentPosition++
                        } else {
                            currentPosition = 0
                        }
                        motionLayout?.progress = 0F
                        updateView()
                    }
                }
            }
        })
        updateView()
    }

    @SuppressLint("SetTextI18n")
    private fun updateView() {
        centerTextView.text = "Item\n${itemList[currentPosition]}"

        rightTextView.text = if (currentPosition == itemList.lastIndex) {
            "Item\n${itemList.first()}"
        } else {
            "Item\n${itemList[currentPosition + 1]}"
        }

        leftTextView.text = if (currentPosition == 0) {
            "Item\n${itemList.last()}"
        } else {
            "Item\n${itemList[currentPosition - 1]}"
        }
    }
}
```

### Run

Simply copy the source code into your Android Project,Build and Run. 

### Reference

1. [Download](https://github.com/NUmeroAndDev/MotionLayoutPager-android-master/archive/refs/heads/master.zip) code or Browse [here](https://github.com/NUmeroAndDev/MotionLayoutPager-android).
2. [Follow](https://github.com/NUmeroAndDev/) code author.


