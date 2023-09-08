# What is Splash Screen API

Starting in Android 12, the SplashScreen API enables a new app launch animation for all apps when running on a device with Android 12 or higher. This includes an into-app motion at launch, a splash screen showing your app icon, and a transition to your app itself.


Here is an example of splash screen in android:

![](https://developer.android.com/about/versions/12/images/splash-screen-gmail-example.gif)

### How the splash screen works

When a user launches an app while the app's process is not running (a cold start or the Activity has not been created (a warm start), the following events occur. (The splash screen is never shown during a hot start.

1.  The system shows the splash screen using themes and any animations that you've defined.
2.  When the app is ready, the splash screen is dismissed and the app is displayed.

### Keep the splash screen on-screen for longer periods

The splash screen is dismissed as soon as your app draws its first frame. If you need to load a small amount of data such as in-app settings from a local disk asynchronously, you can use `ViewTreeObserver.OnPreDrawListener` to suspend the app to draw its first frame.

If your starting activity finishes before drawing (for example, by not setting the content view and finishing before `onResume`), the pre-draw listener is not needed.

```kotlin
// Create a new event for the activity.
override fun onCreate(savedInstanceState: Bundle?) {
    super.onCreate(savedInstanceState)
    // Set the layout for the content view.
    setContentView(R.layout.main_activity)

    // Set up an OnPreDrawListener to the root view.
    val content: View = findViewById(android.R.id.content)
    content.viewTreeObserver.addOnPreDrawListener(
        object : ViewTreeObserver.OnPreDrawListener {
            override fun onPreDraw(): Boolean {
                // Check if the initial data is ready.
                return if (viewModel.isReady) {
                    // The content is ready; start drawing.
                    content.viewTreeObserver.removeOnPreDrawListener(this)
                    true
                } else {
                    // The content is not ready; suspend.
                    false
                }
            }
        }
    )
}
```

### Customize the animation for dismissing the splash screen

You can further customize the animation of the splash screen through `Activity.getSplashScreen()`.

```kotlin
override fun onCreate(savedInstanceState: Bundle?) {
    super.onCreate(savedInstanceState)
    // ...

    // Add a callback that's called when the splash screen is animating to
    // the app content.
    splashScreen.setOnExitAnimationListener { splashScreenView ->
        // Create your custom animation.
        val slideUp = ObjectAnimator.ofFloat(
            splashScreenView,
            View.TRANSLATION_Y,
            0f,
            -splashScreenView.height.toFloat()
        )
        slideUp.interpolator = AnticipateInterpolator()
        slideUp.duration = 200L

        // Call SplashScreenView.remove at the end of your custom animation.
        slideUp.doOnEnd { splashScreenView.remove() }

        // Run your animation.
        slideUp.start()
    }
}
```

By the start of this callback, the animated vector drawable on the splash screen has begun. Depending on the duration of the app launch, the drawable might be in the middle of its animation. Use `SplashScreenView.getIconAnimationStart` to know when the animation started. You can calculate the remaining duration of the icon animation as follows:

```kotlin
// Get the duration of the animated vector drawable.
val animationDuration = splashScreenView.iconAnimationDuration
// Get the start time of the animation.
val animationStart = splashScreenView.iconAnimationStart
// Calculate the remaining duration of the animation.
val remainingDuration = if (animationDuration != null && animationStart != null) {
    (animationDuration - Duration.between(animationStart, Instant.now()))
        .toMillis()
        .coerceAtLeast(0L)
} else {
    0L
}
```

Let us look at a full example:

## Kotlin Android 12 Splash Screens API Example

Here is a full example demonstrating the Andorid 12 Splash screens API.

Here is the demo GIF:

![https://github.com/STAR-ZERO/sample-splash-screens/raw/main/screenshot.gif](https://github.com/STAR-ZERO/sample-splash-screens/raw/main/screenshot.gif)


### Step 1: Dependencies

No external dependency is needed for this project.

### Step 2: Create Animated Vectors

Create a folder named `drawable` inside the `res` directory and add the following xml vector drawables:

**(a). /drawable/animated_splash.xml**

```xml
<?xml version="1.0" encoding="utf-8"?>
<animated-vector xmlns:android="http://schemas.android.com/apk/res/android"
    android:drawable="@drawable/ic_splash" >
    <target
        android:name="rotationGroup"
        android:animation="@animator/rotation" />
</animated-vector>

```

**(b). /drawable/ic_splash.xml**

```xml
<vector xmlns:android="http://schemas.android.com/apk/res/android"
    android:width="24dp"
    android:height="24dp"
    android:tint="#FFFFFF"
    android:viewportWidth="24"
    android:viewportHeight="24">
    <group android:name="rotationGroup"
        android:scaleX="0.5"
        android:scaleY="0.5"
        android:pivotX="12"
        android:pivotY="12">
        <path
            android:fillColor="@android:color/white"
            android:pathData="M12,17.27L18.18,21l-1.64,-7.03L22,9.24l-7.19,-0.61L12,2 9.19,8.63 2,9.24l5.46,4.73L5.82,21z" />
    </group>
</vector>

```

### Step 3: Create an Object Animator

Create folder named `animator` then inside it create the following rotation animation code:

**/animator/rotation.xml**

```xml
<?xml version="1.0" encoding="utf-8"?>
<objectAnimator xmlns:android="http://schemas.android.com/apk/res/android"
    android:duration="1000"
    android:propertyName="rotation"
    android:valueFrom="0"
    android:valueTo="360" />

```

### Step 4: Design Layout

Here is our simple MainActivity layout:

**activity_main.xml**

```xml
<?xml version="1.0" encoding="utf-8"?>
<androidx.constraintlayout.widget.ConstraintLayout xmlns:android="http://schemas.android.com/apk/res/android"
    xmlns:app="http://schemas.android.com/apk/res-auto"
    xmlns:tools="http://schemas.android.com/tools"
    android:layout_width="match_parent"
    android:layout_height="match_parent"
    tools:context=".MainActivity">

    <TextView
        android:layout_width="wrap_content"
        android:layout_height="wrap_content"
        android:text="Hello World!"
        app:layout_constraintBottom_toBottomOf="parent"
        app:layout_constraintLeft_toLeftOf="parent"
        app:layout_constraintRight_toRightOf="parent"
        app:layout_constraintTop_toTopOf="parent" />

</androidx.constraintlayout.widget.ConstraintLayout>

```

### Step 5: Create ViewModel

Create a ViewModel class as shown below:

**MainViewModel.kt**

```kotlin
package com.star_zero.samplesplashscreens

import androidx.lifecycle.ViewModel
import androidx.lifecycle.viewModelScope
import kotlinx.coroutines.delay
import kotlinx.coroutines.launch

class MainViewModel : ViewModel() {

    var isReady: Boolean = false
        private set

    init {
        viewModelScope.launch {
            delay(1000) // dummy
            isReady = true
        }
    }
}

```

### Step 6: Create MainActivity

Create your `MainActivity.kt` code as follows:

```kotlin
package com.star_zero.samplesplashscreens

import android.animation.AnimatorSet
import android.animation.ObjectAnimator
import android.os.Build
import android.os.Bundle
import android.view.View
import android.view.ViewTreeObserver
import androidx.activity.viewModels
import androidx.annotation.RequiresApi
import androidx.appcompat.app.AppCompatActivity
import androidx.core.animation.doOnEnd

class MainActivity : AppCompatActivity() {

    private val viewModel: MainViewModel by viewModels()

    @RequiresApi(Build.VERSION_CODES.S)
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_main)

        // Wait
        val content: View = findViewById(android.R.id.content)
        content.viewTreeObserver.addOnPreDrawListener(
            object : ViewTreeObserver.OnPreDrawListener {
                override fun onPreDraw(): Boolean {
                    return if (viewModel.isReady) {
                        content.viewTreeObserver.removeOnPreDrawListener(this)
                        true
                    } else {
                        false
                    }
                }
            }
        )

        // Exit Animation
        splashScreen.setOnExitAnimationListener { splashScreenView ->
            val animatorSet = AnimatorSet()
            animatorSet.play(
                ObjectAnimator.ofFloat(
                    splashScreenView,
                    View.SCALE_X,
                    1f,
                    20f,
                )
            ).with(
                ObjectAnimator.ofFloat(
                    splashScreenView,
                    View.SCALE_Y,
                    1f,
                    20f,
                )
            )
            animatorSet.duration = 800L

            animatorSet.doOnEnd { splashScreenView.remove() }

            animatorSet.start()
        }
    }
}

```

### Reference

> Download full code [here](https://github.com/STAR-ZERO/sample-splash-screens/archive/refs/heads/main.zip).
> Follow code author [here](https://github.com/STAR-ZERO/).
