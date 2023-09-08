# Kotlin Android AnimationDrawable and AnimatedVectorDrawable Examples

This tutorial will teach you about the `AnimationDrawable` and `AnimatedVectorDrawable` class via simple examples.


## Example 1: Kotlin Android AnimatedVectorDrawble Example

In the first example you will learn about `AnimatedVectorDrawable`. Here is the demo screenshot:

![Kotlin Android AnimatedVectorDrawable Example](https://camposha.info/android-examples/wp-content/uploads/sites/9/2021/12/AnimatedVectorDrawableDemo.gif)

### What is a VectorDrawable?

> It is a class that lets you create a drawable based on an XML vector graphic.

### What is AnimatedVectorDrawable?

> This class animates properties of a `VectorDrawable` with animations defined using `ObjectAnimator` or `AnimatorSet`.

Starting from API 25, `AnimatedVectorDrawable` runs on `RenderThread` (as opposed to on UI thread for earlier APIs). This means animations in `AnimatedVectorDrawable` can remain smooth even when there is heavy workload on the UI thread. Note: If the UI thread is unresponsive, RenderThread may continue animating until the UI thread is capable of pushing another frame. Therefore, it is not possible to precisely coordinate a `RenderThread`-enabled `AnimatedVectorDrawable` with UI thread animations. Additionally, `Animatable2.AnimationCallback.onAnimationEnd(Drawable)` will be called the frame after the AnimatedVectorDrawable finishes on the RenderThread.

`AnimatedVectorDrawable` can be defined in either three separate XML files, or one XML.

You can read more [here](https://developer.android.com/reference/android/graphics/drawable/AnimatedVectorDrawable)


### Step 1: Create Project

Start by creating an empty `Android Studio` project.

### Step 2: Dependencies

No external dependency is needed.

### Step : Write Code

Go to the `MainActivity.kt` and add the following imports including the `android.graphics.drawable.Animatable`:

```kotlin
import android.graphics.drawable.Animatable
import androidx.appcompat.app.AppCompatActivity
import android.os.Bundle
import kotlinx.android.synthetic.main.activity_main.*
```

Extend the `AppCompatActivity`:

```kotlin
class MainActivity : AppCompatActivity() {
```

Declare the `Animatable` as a property:

```kotlin
    private lateinit var animatable: Animatable
```

Then initialize the `Animatable` inside the `onCreate()`:

```kotlin
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_main)
        animatable = animatedImageView.drawable as Animatable
    }
```

When the `startButton` is clicked we will start the animation using the `start()` function:

```kotlin
    override fun onStart() {
        super.onStart()
        startButton.setOnClickListener {
            animatable.start()
        }
    }
}
```

Here is the full code:

**MainActivity.kt**

```kotlin
import android.graphics.drawable.Animatable
import androidx.appcompat.app.AppCompatActivity
import android.os.Bundle
import kotlinx.android.synthetic.main.activity_main.*

class MainActivity : AppCompatActivity() {

    private lateinit var animatable: Animatable

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_main)
        animatable = animatedImageView.drawable as Animatable
    }

    override fun onStart() {
        super.onStart()
        startButton.setOnClickListener {
            animatable.start()
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
| 1. | [Download](https://downgit.github.io/#/home?url=https://github.com/amanjeetsingh150/kotlin-android-examples/tree/master/AnimatedVectorDrawble) Example |
| 2. | [Follow](https://github.com/amanjeetsingh150/) code author |
| 3. | Code: [Apache 2.0 License](http://www.apache.org/licenses/LICENSE-2.0.txt) |

Let us look at the second example.

## Example 2: AnimationDrawable

### What is AnimationDrawable

It is an object used to create frame-by-frame animations, defined by a series of Drawable objects, which can be used as a View object's background.

The simplest way to create a frame-by-frame animation is to define the animation in an XML file, placed in the `res/drawable/` folder, and set it as the background to a View object. Then, call `start()` to run the animation.

An AnimationDrawable defined in XML consists of a single element and a series of nested tags. Each item defines a frame of the animation.

For example here is how you would create the animation in xml:

```xml
 <!-- Animation frames are wheel0.png through wheel5.png
     files inside the res/drawable/ folder -->
 <animation-list android:id="@+id/selected" android:oneshot="false">
    <item android:drawable="@drawable/wheel0" android:duration="50" />
    <item android:drawable="@drawable/wheel1" android:duration="50" />
    <item android:drawable="@drawable/wheel2" android:duration="50" />
    <item android:drawable="@drawable/wheel3" android:duration="50" />
    <item android:drawable="@drawable/wheel4" android:duration="50" />
    <item android:drawable="@drawable/wheel5" android:duration="50" />
 </animation-list>
```

Then to load and play the animation you can use the following code:

```java
 // Load the ImageView that will host the animation and
 // set its background to our AnimationDrawable XML resource.
 ImageView img = (ImageView)findViewById(R.id.spinning_wheel_image);
 img.setBackgroundResource(R.drawable.spin_animation);

 // Get the background, which has been compiled to an AnimationDrawable object.
 AnimationDrawable frameAnimation = (AnimationDrawable) img.getBackground();

 // Start the animation (looped playback by default).
 frameAnimation.start();
```

You can read more about this class [here](https://developer.android.com/reference/android/graphics/drawable/AnimationDrawable).

Let us now look at isolated examples.

### Step 1: Create Project

Start by creating an empty `Android Studio` project.

### Step 2: Dependencies

Add ConstraintLayout as a dependency in your `app/build.gradle`.

### Step 3: Design Layout

Go to your `activity_main.xml` and create a TextView inside a constraintLayout:

**activity_main.xml**

```xml
<?xml version="1.0" encoding="utf-8"?>
<androidx.constraintlayout.widget.ConstraintLayout xmlns:android="http://schemas.android.com/apk/res/android"
    xmlns:app="http://schemas.android.com/apk/res-auto"
    xmlns:tools="http://schemas.android.com/tools"
    android:id="@+id/constraintLayout"
    android:layout_width="match_parent"
    android:layout_height="match_parent"
    android:background="@drawable/drawable_gradient_animation_list"
    tools:context=".MainActivity"
    >
  <!-- Your layout here -->
  <TextView
      android:layout_width="368dp"
      android:layout_height="520dp"
      android:layout_marginBottom="8dp"
      android:layout_marginLeft="8dp"
      android:layout_marginRight="8dp"
      android:layout_marginTop="8dp"
      android:gravity="center"
      android:text="@string/app_name"
      android:textAlignment="center"
      android:textColor="@android:color/background_light"
      android:textSize="30sp"
      android:textStyle="bold"
      app:layout_constraintBottom_toBottomOf="parent"
      app:layout_constraintLeft_toLeftOf="parent"
      app:layout_constraintRight_toRightOf="parent"
      app:layout_constraintTop_toTopOf="parent"
      tools:text="@string/app_name"
      />
</androidx.constraintlayout.widget.ConstraintLayout>
```

### Step : Write Code

Go to `MainActivity.java` and add the following code:

```java
import android.graphics.drawable.AnimationDrawable;
import android.os.Bundle;
import androidx.constraintlayout.widget.ConstraintLayout;
import androidx.appcompat.app.AppCompatActivity;
```

Extend the AppCompatActivity:

```java
public class MainActivity extends AppCompatActivity {
```

Declare a ConstraintLayout and AnimationDrawable objects:

```java
  private ConstraintLayout constraintLayout;
  private AnimationDrawable animationDrawable;
```

Override the `onCreate()`:

```java
  @Override
  protected void onCreate(Bundle savedInstanceState) {
    super.onCreate(savedInstanceState);
    setContentView(R.layout.activity_main);
```

Hide the actionBar:

```java
    getSupportActionBar().hide();
```

Reference the ConstraintLayout:

```java
    // init constraintLayout
    constraintLayout = (ConstraintLayout) findViewById(R.id.constraintLayout);
```

Initialize the animation drawable by getting background from constraint layout:

```java
    animationDrawable = (AnimationDrawable) constraintLayout.getBackground();
```

Set the enter fade animation duration to 5 seconds on the `AnimationDrawable`:

```java
    animationDrawable.setEnterFadeDuration(5000);
```

Then set the exit fade animation duration to 2 seconds:

```java
    animationDrawable.setExitFadeDuration(2000);
  }
```

Override our `onResume()` method:

```java
  @Override
  protected void onResume() {
    super.onResume();
```

Check that the `AnimationDrawable` is not null and it is not running, then start the animation:

```java
    if (animationDrawable != null && !animationDrawable.isRunning()) {
      // start the animation
      animationDrawable.start();
    }
  }
```

In the `onPause()` stop the `animationDrawable`:

```java
  @Override
  protected void onPause() {
    super.onPause();
    if (animationDrawable != null && animationDrawable.isRunning()) {
      // stop the animation
      animationDrawable.stop();
    }
  }
}
```

Here is the full code:

**MainActivity.java**

```java
import android.graphics.drawable.AnimationDrawable;
import android.os.Bundle;
import androidx.constraintlayout.widget.ConstraintLayout;
import androidx.appcompat.app.AppCompatActivity;

public class MainActivity extends AppCompatActivity {
  private ConstraintLayout constraintLayout;
  private AnimationDrawable animationDrawable;

  @Override
  protected void onCreate(Bundle savedInstanceState) {
    super.onCreate(savedInstanceState);
    setContentView(R.layout.activity_main);

    getSupportActionBar().hide();

    // init constraintLayout
    constraintLayout = (ConstraintLayout) findViewById(R.id.constraintLayout);

    // initializing animation drawable by getting background from constraint layout
    animationDrawable = (AnimationDrawable) constraintLayout.getBackground();

    // setting enter fade animation duration to 5 seconds
    animationDrawable.setEnterFadeDuration(5000);

    // setting exit fade animation duration to 2 seconds
    animationDrawable.setExitFadeDuration(2000);
  }

  @Override
  protected void onResume() {
    super.onResume();
    if (animationDrawable != null && !animationDrawable.isRunning()) {
      // start the animation
      animationDrawable.start();
    }
  }

  @Override
  protected void onPause() {
    super.onPause();
    if (animationDrawable != null && animationDrawable.isRunning()) {
      // stop the animation
      animationDrawable.stop();
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
| 1. | [Download](https://downgit.github.io/#/home?url=https://github.com/nisrulz/android-examples/tree/develop/AnimatedGradientBackground) Example |
| 2. | [Follow](https://github.com/nisrulz/) code author |
| 3. | Code: [Apache 2.0 License](http://www.apache.org/licenses/LICENSE-2.0.txt) |
