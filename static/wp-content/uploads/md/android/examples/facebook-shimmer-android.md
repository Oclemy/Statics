# Shimmer Android by Facebook


> An easy, flexible way to add a shimmering effect to any view in an Android app.

It is useful as an unobtrusive loading indicator, and was originally developed for Facebook Home.

Shimmer for Android is implemented as a layout, which means that you can simply nest any view inside a `ShimmerFrameLayout` tag, and call to start the animation from your code. That's all that is required. The layout will use the values you specify either on the tag (using custom attributes) or programmatically in your code, and generate an animation on the fly. See the [API reference](http://facebook.github.io/shimmer-android/javadoc/index.html) for further details.

Here's an example of a composite view, consisting of an image and some text below it, that shows the effect in action:

![Shimmer](https://github.com/facebook/shimmer-android/raw/main/shimmer.gif?raw=true)

### Install it

To include Shimmer in your project, add the following dependency:

```groovy
// Gradle dependency on Shimmer for Android
dependencies {
  implementation 'com.facebook.shimmer:shimmer:0.5.0'
}
    
```

Or: 

```xml
  <!-- Maven dependency on Shimmer for Android -->
<dependency>
  <groupId>com.facebook.shimmer</groupId>
  <artifactId>shimmer</artifactId>
  <version>0.5.0</version>
</dependency>
    
```

Note that you cannot use the custom attributes on the tag if you use the Jar file. You can instead download the [AAR file](https://github.com/facebook/shimmer-android/releases/latest) and reference that locally in your project.

#### Building

You can use the included Gradle wrapper to build the Shimmer library and sample application locally as well. Check out the code at [github.com/facebook/shimmer-android](http://github.com/facebook/shimmer-android).

```bash
# Install the latest code to your local repository
./gradlew shimmer:installArchives

# Install the sample app
./gradlew sample:installDebug
    
```

### Step 2: Add to Layout

The following snippet shows how you can use `ShimmerFrameLayout`

```xml
<com.facebook.shimmer.ShimmerFrameLayout
     android:id="@+id/shimmer_view_container"
     android:layout_width="wrap_content"
     android:layout_height="wrap_content"
>
     ...(your complex view here)...
</com.facebook.shimmer.ShimmerFrameLayout>
    
```

And thats it! If you specify `auto-start` to be false, then you can start the animation in code:

```java
ShimmerFrameLayout container =
  (ShimmerFrameLayout) findViewById(R.id.shimmer_view_container);
container.startShimmer(); // If auto-start is set to false
    
```

### Attributes

You can control the look and pace of the effect using a number of custom attributes on the `ShimmerFrameLayout` tag. Alternatively, you can set these values on the layout object itself. For a comprehensive list, check out the [API reference](javadoc/index.html)

**Clip to Children** : Whether to clip the shimmering effect to the children, or to opaquely draw the shimmer on top of the children. Use this if your overall layout contains transparency.

**Colored** : Whether you want the shimmer to affect just the alpha or draw colors on-top of the children.

**Base Color** : If colored is specified, the base color of the content.

**Highlight Color** : If colored is specified, the shimmer's highlight color.

**Base Alpha** : If colored is not specified, the alpha used to render the base view i.e. the unhighlighted view over which the highlight is drawn.

**Highlight Alpha**: If colored is not specified, the alpha of the shimmer highlight.

**Auto Start** : Whether to automatically start the animation when the view is shown, or not.

**Duration** : Time it takes for the highlight to move from one end of the layout to the other.

**Repeat Count** : Number of times of the current animation will repeat.

**Repeat Delay** : Delay after which the current animation will repeat.

**Repeat Mode** : What the animation should do after reaching the end, either restart from the beginning or reverse back towards it.

**Direction** : The travel direction of the shimmer highlight: left to right, top to bottom, right to left or bottom to top.

**Dropoff** : Controls the size of the fading edge of the highlight.

**Intensity** : Controls the brightness of the highlight at the center

**Shape** : Shape of the highlight mask, either with a linear or a circular gradient.

**Tilt** : Angle at which the highlight is _tilted_, measured in degrees

**Fixed Width, Height** : Fixed sized highlight mask, if set, overrides the relative size value

**Width, Height ratio** : Size of the highlight mask, relative to the layout it is applied to.

### Full Example

Here is a full example:

**main.xml**

```xml
<?xml version="1.0" encoding="utf-8"?>
<androidx.constraintlayout.widget.ConstraintLayout xmlns:android="http://schemas.android.com/apk/res/android"
  xmlns:app="http://schemas.android.com/apk/res-auto"
  android:layout_width="match_parent"
  android:layout_height="match_parent"
  android:background="@drawable/background"
  android:padding="20dp">

  <com.facebook.shimmer.ShimmerFrameLayout
    android:id="@+id/shimmer_view_container"
    android:layout_width="wrap_content"
    android:layout_height="wrap_content"
    app:layout_constraintBottom_toBottomOf="parent"
    app:layout_constraintEnd_toEndOf="parent"
    app:layout_constraintStart_toStartOf="parent"
    app:layout_constraintTop_toTopOf="parent"
    app:layout_constraintVertical_bias="0.5"
    app:shimmer_duration="1000">

    <LinearLayout
      android:layout_width="wrap_content"
      android:layout_height="wrap_content"
      android:gravity="center"
      android:orientation="vertical">

      <ImageView
        android:layout_width="64dp"
        android:layout_height="64dp"
        android:src="@drawable/fb_logo" />

      <TextView
        style="@style/thin.white.large"
        android:layout_width="wrap_content"
        android:layout_height="wrap_content"
        android:layout_marginTop="20dp"
        android:gravity="center"
        android:text="@string/mission_statement" />
    </LinearLayout>
  </com.facebook.shimmer.ShimmerFrameLayout>

  <TextView
    android:id="@+id/preset"
    style="@style/thin.white.small"
    android:layout_width="wrap_content"
    android:layout_height="wrap_content"
    android:layout_marginEnd="20dp"
    android:layout_marginRight="20dp"
    android:text="@string/presets"
    android:textAllCaps="true"
    app:layout_constraintBottom_toBottomOf="@id/preset_scroll_view"
    app:layout_constraintEnd_toStartOf="@id/preset_scroll_view"
    app:layout_constraintStart_toStartOf="parent"
    app:layout_constraintTop_toTopOf="@id/preset_scroll_view" />

  <HorizontalScrollView
    android:id="@+id/preset_scroll_view"
    android:layout_width="match_parent"
    android:layout_height="wrap_content"
    app:layout_constrainedWidth="true"
    app:layout_constraintBottom_toBottomOf="parent"
    app:layout_constraintEnd_toEndOf="parent"
    app:layout_constraintStart_toEndOf="@id/preset"
    app:layout_constraintTop_toBottomOf="@id/shimmer_view_container">

    <LinearLayout
      android:id="@+id/settings_container"
      android:layout_width="wrap_content"
      android:layout_height="wrap_content"
      android:layout_gravity="bottom"
      android:gravity="center_vertical"
      android:orientation="horizontal">

      <Button
        android:id="@+id/preset_button0"
        style="@style/thin.white.small.button"
        android:gravity="center"
        android:text="1" />

      <Button
        android:id="@+id/preset_button1"
        style="@style/thin.white.small.button"
        android:gravity="center"
        android:text="2" />

      <Button
        android:id="@+id/preset_button2"
        style="@style/thin.white.small.button"
        android:gravity="center"
        android:text="3" />

      <Button
        android:id="@+id/preset_button3"
        style="@style/thin.white.small.button"
        android:gravity="center"
        android:text="4" />

      <Button
        android:id="@+id/preset_button4"
        style="@style/thin.white.small.button"
        android:gravity="center"
        android:text="5" />

      <Button
        android:id="@+id/preset_button5"
        style="@style/thin.white.small.button"
        android:gravity="center"
        android:text="6" />

      <Button
        android:id="@+id/preset_button6"
        style="@style/thin.white.small.button"
        android:gravity="center"
        android:text="Off" />
    </LinearLayout>
  </HorizontalScrollView>
</androidx.constraintlayout.widget.ConstraintLayout>

```

**MainActivity.kt**

```kotlin
package com.facebook.shimmer.sample

import android.animation.ValueAnimator
import android.app.Activity
import android.os.Bundle
import android.view.View
import android.widget.Button
import android.widget.Toast
import com.facebook.shimmer.Shimmer
import com.facebook.shimmer.ShimmerFrameLayout
import kotlinx.android.synthetic.main.main.*

class MainActivity : Activity(), View.OnClickListener {
  private lateinit var shimmerViewContainer: ShimmerFrameLayout
  private lateinit var presetButtons: Array<Button>
  private var currentPreset = -1
  private var toast: Toast? = null

  override fun onCreate(savedInstanceState: Bundle?) {
    super.onCreate(savedInstanceState)
    setContentView(R.layout.main)
    shimmerViewContainer = shimmer_view_container
    presetButtons =
        arrayOf(
            preset_button0,
            preset_button1,
            preset_button2,
            preset_button3,
            preset_button4,
            preset_button5,
            preset_button6)
    presetButtons.forEach { it.setOnClickListener(this@MainActivity) }
    selectPreset(0, false)
  }

  override fun onClick(v: View) {
    selectPreset(presetButtons.indexOf(v as Button), true)
  }

  public override fun onResume() {
    super.onResume()
    shimmerViewContainer.startShimmer()
  }

  public override fun onPause() {
    shimmerViewContainer.stopShimmer()
    super.onPause()
  }

  private fun selectPreset(preset: Int, showToast: Boolean) {
    if (currentPreset == preset) {
      return
    }

    if (currentPreset >= 0) {
      presetButtons[currentPreset].setBackgroundResource(R.color.preset_button_background)
    }
    currentPreset = preset
    presetButtons[currentPreset].setBackgroundResource(R.color.preset_button_background_selected)

    // If a toast is already showing, hide it
    toast?.cancel()

    val shimmerBuilder = Shimmer.AlphaHighlightBuilder()
    shimmerViewContainer.setShimmer(
        when (preset) {
          1 -> {
            // Slow and reverse
            toast = Toast.makeText(this, "Slow and reverse", Toast.LENGTH_SHORT)
            shimmerBuilder.setDuration(5000L).setRepeatMode(ValueAnimator.REVERSE)
          }
          2 -> {
            // Thin, straight and transparent
            toast = Toast.makeText(this, "Thin, straight and transparent", Toast.LENGTH_SHORT)
            shimmerBuilder.setBaseAlpha(0.1f).setDropoff(0.1f).setTilt(0f)
          }
          3 -> {
            // Sweep angle 90
            toast = Toast.makeText(this, "Sweep angle 90", Toast.LENGTH_SHORT)
            shimmerBuilder.setDirection(Shimmer.Direction.TOP_TO_BOTTOM).setTilt(0f)
          }
          4 -> {
            // Spotlight
            toast = Toast.makeText(this, "Spotlight", Toast.LENGTH_SHORT)
            shimmerBuilder
                .setBaseAlpha(0f)
                .setDuration(2000L)
                .setDropoff(0.1f)
                .setIntensity(0.35f)
                .setShape(Shimmer.Shape.RADIAL)
          }
          5 -> {
            // Spotlight angle 45
            toast = Toast.makeText(this, "Spotlight angle 45", Toast.LENGTH_SHORT)
            shimmerBuilder
                .setBaseAlpha(0f)
                .setDuration(2000L)
                .setDropoff(0.1f)
                .setIntensity(0.35f)
                .setTilt(45f)
                .setShape(Shimmer.Shape.RADIAL)
          }
          6 -> {
            // Off
            toast = Toast.makeText(this, "Off", Toast.LENGTH_SHORT)
            null
          }
          else -> {
            toast = Toast.makeText(this, "Default", Toast.LENGTH_SHORT)
            shimmerBuilder
          }
        }?.build())

    // Show toast describing the chosen preset, if necessary
    if (showToast) {
      toast?.show()
    }
  }
}

```

### Reference

> Read more [here](https://github.com/facebook/shimmer-android/archive/refs/heads/main.zip) or [here](http://facebook.github.io/shimmer-android/).
> Download code [here](https://github.com/facebook/shimmer-android/archive/refs/heads/main.zip).
> Follow code author [here](https://github.com/facebook/).
