# Android MotionLayout Carousel Example


This is MotionLayout Carousel step by step example.

This example will comprise the following files:

- `MainActivity.kt`

### Step 1: Create Project

1. Open your `AndroidStudio` IDE.
2. Go to `File-->New-->Project` to create a new project.

### Step 2: Add Dependencies

No third party dependency is needed for this project.

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
        android:layout_width="match_parent"
        android:layout_height="wrap_content"
        android:theme="@style/Theme.MotionCarouselExample.AppBarOverlay">

        <androidx.appcompat.widget.Toolbar
            android:id="@+id/toolbar"
            android:layout_width="match_parent"
            android:layout_height="?attr/actionBarSize"
            android:background="?attr/colorPrimary"
            app:popupTheme="@style/Theme.MotionCarouselExample.PopupOverlay" />

    </com.google.android.material.appbar.AppBarLayout>

    <androidx.constraintlayout.motion.widget.MotionLayout
        android:id="@+id/constraintLayout"
        android:layout_width="match_parent"
        android:layout_height="match_parent"
        app:layoutDescription="@xml/carousel_scene"
        app:layout_behavior="@string/appbar_scrolling_view_behavior">

        <TextView
            android:id="@+id/textView0"
            android:layout_width="100dp"
            android:layout_height="100dp"
            android:layout_marginEnd="16dp"
            android:text="textView0"
            app:layout_constraintBottom_toBottomOf="parent"
            app:layout_constraintEnd_toStartOf="@+id/textView1"
            app:layout_constraintTop_toTopOf="parent" />

        <TextView
            android:id="@+id/textView1"
            android:layout_width="100dp"
            android:layout_height="100dp"
            android:layout_marginEnd="16dp"
            android:text="textView1"
            app:layout_constraintBottom_toBottomOf="parent"
            app:layout_constraintEnd_toStartOf="@+id/textView2"
            app:layout_constraintTop_toTopOf="parent" />

        <TextView
            android:id="@+id/textView2"
            android:layout_width="150dp"
            android:layout_height="150dp"
            android:text="textView2"
            app:layout_constraintBottom_toBottomOf="parent"
            app:layout_constraintEnd_toEndOf="parent"
            app:layout_constraintHorizontal_bias="0.5"
            app:layout_constraintStart_toStartOf="parent"
            app:layout_constraintTop_toTopOf="parent" />

        <TextView
            android:id="@+id/textView3"
            android:layout_width="100dp"
            android:layout_height="100dp"
            android:layout_marginStart="16dp"
            android:text="textView3"
            app:layout_constraintBottom_toBottomOf="parent"
            app:layout_constraintStart_toEndOf="@+id/textView2"
            app:layout_constraintTop_toTopOf="parent" />

        <TextView
            android:id="@+id/textView4"
            android:layout_width="100dp"
            android:layout_height="100dp"
            android:layout_marginStart="16dp"
            android:text="textView4"
            app:layout_constraintBottom_toBottomOf="parent"
            app:layout_constraintStart_toEndOf="@+id/textView3"
            app:layout_constraintTop_toTopOf="parent" />

        <androidx.constraintlayout.widget.Guideline
            android:id="@+id/guideline"
            android:layout_width="wrap_content"
            android:layout_height="wrap_content"
            android:orientation="vertical"
            app:layout_constraintGuide_begin="100dp" />

        <androidx.constraintlayout.widget.Guideline
            android:id="@+id/guideline2"
            android:layout_width="wrap_content"
            android:layout_height="wrap_content"
            android:orientation="vertical"
            app:layout_constraintGuide_end="100dp" />

        <androidx.constraintlayout.helper.widget.Carousel
            android:id="@+id/carousel"
            android:layout_width="wrap_content"
            android:layout_height="wrap_content"
            app:carousel_infinite="true"
            app:carousel_backwardTransition="@+id/backward"
            app:carousel_firstView="@+id/textView2"
            app:carousel_forwardTransition="@+id/forward"
            app:carousel_nextState="@+id/next"
            app:carousel_emptyViewsBehavior="invisible"
            app:carousel_previousState="@+id/previous"
            app:constraint_referenced_ids="textView0,textView1,textView2,textView3,textView4" />

    </androidx.constraintlayout.motion.widget.MotionLayout>

</androidx.coordinatorlayout.widget.CoordinatorLayout>
```

### Step 4: Write Code

Write Code as follows:

**(a). `MainActivity.kt`**

Create a file named `MainActivity.kt`


Here is the full code

```kotlin
package jp.numero.carousel_example

import android.graphics.Color
import android.os.Bundle
import android.view.View
import android.widget.ImageView
import android.widget.TextView
import androidx.appcompat.app.AppCompatActivity
import androidx.constraintlayout.helper.widget.Carousel
import com.google.android.material.floatingactionbutton.ExtendedFloatingActionButton
import org.w3c.dom.Text

class MainActivity : AppCompatActivity() {

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_main)
        setSupportActionBar(findViewById(R.id.toolbar))

        val list = listOf(
                Color.MAGENTA,
                Color.RED,
                Color.CYAN,
                Color.BLUE,
                Color.GREEN,
                Color.YELLOW,
                Color.LTGRAY
        ).mapIndexed { index, color ->
            Item(index.toString(), color)
        }.toMutableList()

        val carousel = findViewById<Carousel>(R.id.carousel)
        carousel.setAdapter(object : Carousel.Adapter {
            override fun count(): Int = list.size

            override fun populate(view: View, index: Int) {
                if (view !is TextView) return
                val item = list[index]
                //view.text = item.text
                view.setBackgroundColor(item.color)
            }

            override fun onNewItem(index: Int) {
            }
        })
    }
}

data class Item(
        val text: String,
        val color: Int
)
```

### Run

Simply copy the source code into your Android Project,Build and Run. 

### Reference

1. [Download](https://github.com/NUmeroAndDev/MotionLayoutCarouselExample-main/archive/refs/heads/main.zip) code or Browse [here](https://github.com/NUmeroAndDev/MotionLayoutCarouselExample).
2. [Follow](https://github.com/NUmeroAndDev/) code author.


