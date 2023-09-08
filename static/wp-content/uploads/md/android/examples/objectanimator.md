# ObjectAnimator Examples


Learn about `ObjectAnimator` in this tutorial via simple examples.



### What is ObjectAnimator?

> It is a subclass of `ValueAnimator` that provides support for animating properties on target objects.

Its constructors take parameters to define the target object that will be animated as well as the name of the property that will be animated. Appropriate set/get functions are then determined internally and the animation will call these functions as necessary to animate the property.

Animators can be created from either code or resource files.

Let us look at some examples.

## Example 1: Kotlin Android ObjectAnimator

Learn ObjectAnimator using the following simple example.

Here is the demo screenshot:

![ObjectAnimator Example](https://camposha.info/android-examples/wp-content/uploads/sites/9/2022/01/object.gif)

### Step 1: Create Project

Start by creating an empty `Android Studio` project.

### Step 2: Dependencies

No external dependency is needed for this project.

### Step 3: Design Layout

Design layout as follows:

**activity_main.xml**

```xml
<?xml version="1.0" encoding="utf-8"?>
<LinearLayout xmlns:android="http://schemas.android.com/apk/res/android"
    xmlns:app="http://schemas.android.com/apk/res-auto"
    xmlns:tools="http://schemas.android.com/tools"
    android:layout_width="match_parent"
    android:layout_height="match_parent"
    android:orientation="vertical"
    tools:context="com.developers.objectanimator.MainActivity">

    <Button
        android:id="@+id/animate_button"
        android:layout_width="match_parent"
        android:layout_height="wrap_content"
        android:layout_marginBottom="15dp"
        android:layout_marginEnd="15dp"
        android:layout_marginStart="15dp"
        android:text="@string/start_animating_text" />

    <TextView
        android:id="@+id/textView"
        android:layout_width="wrap_content"
        android:layout_height="wrap_content"
        android:layout_gravity="center"
        android:text="Hello World!"
        android:textColor="@android:color/black"
        android:textSize="25sp"
        app:layout_constraintBottom_toBottomOf="parent"
        app:layout_constraintLeft_toLeftOf="parent"
        app:layout_constraintRight_toRightOf="parent"
        app:layout_constraintTop_toTopOf="parent" />

</LinearLayout>
```

### Step 4: Animate

**MainActivity.kt**

```kotlin
import android.animation.ObjectAnimator
import androidx.appcompat.app.AppCompatActivity
import android.os.Bundle
import kotlinx.android.synthetic.main.activity_main.*

class MainActivity : AppCompatActivity() {

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_main)
        animate_button.setOnClickListener {
            val animator = ObjectAnimator.ofFloat(textView, "textSize", 12f)
            animator.duration = 800
            animator.start()
        }
    }
}
```

### Run

Copy the code or download it in the link below, build and run.

### Reference

Here are the reference links:

| Number | Link |
| --- | --- |
| 1. | [Download](https://downgit.github.io/#/home?url=https://github.com/amanjeetsingh150/kotlin-android-examples/tree/master/ObjectAnimator) Example |
| 2. | [Follow](https://github.com/amanjeetsingh150/) code author |
| 3. | Code: [Apache 2.0 License](http://www.apache.org/licenses/LICENSE-2.0.txt) |

## Example 2: Kotlin Android Animated ImageView Example

This example explores how to programmatically make an animated `ImageView` based on `AppCompatImageView` and using the `ObjectAnimator` to animate its images.

This example will comprise the following files:

- `AnimImageView.kt`
- `MainActivity.kt`

### Step 1: Create Project

1. Open your `AndroidStudio` IDE.
2. Go to `File-->New-->Project` to create a new project.

### Step 2: Dependencies

No external or special dependencies are needed for this project.

### Step 3: Design Layouts

\***(a). `activity_main.xml`**

Create a file named `activity_main.xml` and design it as follows. You can see that we are using the custom ImageView to render an Image:

```xml
<?xml version="1.0" encoding="utf-8"?>
<android.support.constraint.ConstraintLayout xmlns:android="http://schemas.android.com/apk/res/android"
    xmlns:app="http://schemas.android.com/apk/res-auto"
    xmlns:tools="http://schemas.android.com/tools"
    android:layout_width="match_parent"
    android:layout_height="match_parent"
    tools:context="com.numero.anim_example.MainActivity">

    <com.numero.anim_example.AnimImageView
        android:layout_width="50dp"
        android:layout_height="50dp"
        android:src="@drawable/circle"
        app:layout_constraintBottom_toBottomOf="parent"
        app:layout_constraintLeft_toLeftOf="parent"
        app:layout_constraintRight_toRightOf="parent"
        app:layout_constraintTop_toTopOf="parent" />

</android.support.constraint.ConstraintLayout>
```

### Step 4: Write Code

Write Code as follows:

**(a). `AnimImageView.kt`**

Create a file named `AnimImageView.kt` and in it extend the `AppCompatImageView` and write code as follows:

Here is the full code

```kotlin
package com.numero.anim_example

import android.animation.ObjectAnimator
import android.content.Context
import android.support.v7.widget.AppCompatImageView
import android.util.AttributeSet
import android.animation.PropertyValuesHolder

class AnimImageView @JvmOverloads constructor(context: Context, attrs: AttributeSet? = null, defStyleAttr: Int = 0) : AppCompatImageView(context, attrs, defStyleAttr) {

    val holderX = PropertyValuesHolder.ofFloat("alpha", 1f, 0f)
    val scaleX = PropertyValuesHolder.ofFloat("scaleX", 1f, 2f)
    val scaleY = PropertyValuesHolder.ofFloat("scaleY", 1f, 2f)

    val anim = ObjectAnimator.ofPropertyValuesHolder(this, holderX, scaleX, scaleY).apply {
        duration = 700
        repeatMode = ObjectAnimator.RESTART
        repeatCount = ObjectAnimator.INFINITE
    }

    override fun onAttachedToWindow() {
        super.onAttachedToWindow()
        anim.start()
    }

    override fun onDetachedFromWindow() {
        super.onDetachedFromWindow()
        anim.end()
    }
}
```

**(b). `MainActivity.kt`**

Create a file named `MainActivity.kt`.

Here is the full code

```kotlin
package com.numero.anim_example

import android.support.v7.app.AppCompatActivity
import android.os.Bundle

class MainActivity : AppCompatActivity() {

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_main)
    }
}
```

### Run

Simply copy the source code into your Android Project,Build and Run.

### Reference

1. [Download](https://github.com/NUmeroAndDev/AnimExample-android-master/archive/refs/heads/master.zip) code or Browse [here](https://github.com/NUmeroAndDev/AnimExample-android).
2. [Follow](https://github.com/NUmeroAndDev/) code author.
