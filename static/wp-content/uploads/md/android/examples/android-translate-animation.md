# Kotlin Android TranslateAnimation Examples


This tutorial is dedicated to learning TranslateAnimation via simple step by step examples.


## Example 1: Kotlin Android TranslateAnimations

This example shows the effect of selecting each of seven different types of [TranslateAnimation] interpolator:

- "Accelerate"
- "Decelerate",
- "Accelerate/Decelerate"
- "Anticipate"
- "Overshoot"
- "Anticipate/Overshoot", and
- "Bounce".

### Step 1: Create Project

Start by creating an empty `Android Studio` project.

### Step 2: Dependencies

No special or third party dependencies are needed.

### Step 3: Design Layout

Create a layout known as `animation_3.xml` and add the following code:

**animation_3.xml**

Add two TextViews and a spinner:

```xml
<?xml version="1.0" encoding="utf-8"?>

<LinearLayout xmlns:android="http://schemas.android.com/apk/res/android"
    android:layout_width="match_parent"
    android:layout_height="wrap_content"
    android:clipToPadding="false"
    android:orientation="vertical"
    android:padding="10dip">

    <TextView
        android:id="@+id/target"
        android:layout_width="wrap_content"
        android:layout_height="wrap_content"
        android:text="@string/animation_3_text"
        android:textSize="26sp" />

    <TextView
        android:layout_width="match_parent"
        android:layout_height="wrap_content"
        android:layout_marginBottom="5dip"
        android:layout_marginTop="20dip"
        android:text="@string/animation_2_instructions" />

    <Spinner
        android:id="@+id/spinner"
        android:layout_width="match_parent"
        android:layout_height="wrap_content" />

</LinearLayout>
```

### Step 4: Write Code

Create a file known as `Animation3.kt` and add the following imports:

```kotlin
import android.os.Bundle
import android.view.View
import android.view.animation.Animation
import android.view.animation.AnimationUtils
import android.view.animation.TranslateAnimation
import android.widget.AdapterView
import android.widget.AdapterView.OnItemSelectedListener
import android.widget.ArrayAdapter
import android.widget.Spinner
import androidx.appcompat.app.AppCompatActivity
```

Extend the AppCompatActivity and implement the `OnItemSelectedListener` as follows:

```kotlin
class Animation3 : AppCompatActivity(), OnItemSelectedListener {
```

Then we override our `onCreate()` function. This function will be called when our activity is starting. First we call through to our super's implementation of `onCreate`, then we set our content view to our layout file `R.layout.animation_3`. We initialize [Spinner] `val s` by locating the spinner with ID R.id.spinner in our layout, then create `ArrayAdapter<String>` `val adapter` using `android.R.layout.simple_spinner_item` as the resource ID for a layout file containing a `TextView` to use when instantiating views, and our array [String] array field [INTERPOLATORS] as the objects to represent in the [Spinner].

We set the layout resource to create the drop down views of `adapter` to the resource file `android.R.layout.simple_spinner_dropdown_item`, and then set `adapter` as the `SpinnerAdapter` for `s`. Finally we set "this" as the [OnItemSelectedListener] for `s`.

```kotlin
    public override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.animation_3)
        val s = findViewById<Spinner>(R.id.spinner)
        val adapter = ArrayAdapter(
                this,
                android.R.layout.simple_spinner_item,
                INTERPOLATORS
        )
        adapter.setDropDownViewResource(android.R.layout.simple_spinner_dropdown_item)
        s.adapter = adapter
        s.onItemSelectedListener = this
    }
```

We then override the `onItemSelected()` callback. This is the Callback method to be invoked when an item in the [Spinner] with ID `R.id.spinner` has been selected. First we locate the [View] `val target` in our layout with ID `R.id.target` (the TextView with the text "Interpolators" which we animate), then we find its parent view [View] `val targetParent` (the main \`LinearLayout holding the entire UI).

We create [Animation] `val a` which is a [TranslateAnimation] with a `fromXDelta` of 0.0, a `toXDelta` which is calculated to be the width of `targetParent` minus the width of `target` minus the left and right padding of `targetParent`, and with 0.0 for both `fromYDelta` and `toYDelta`. We then set the duration of `a` to 1000 milliseconds, its start offset to 300 milliseconds (when the animation should start relative to the start time), its repeat mode to RESTART (when it reaches the end it restarts from the beginning), and its repeat count to INFINITE.

Next we switch based on the parameter [position] to choose the type of interpolator:

- 0 - "Accelerate" we load the interpolator of `a` from the resource with ID android.R.anim.accelerate_interpolator.
    
- 1 - "Decelerate" we load the interpolator of `a` from the resource with ID android.R.anim.decelerate_interpolator
    
- 2 - "Accelerate/Decelerate" we load the interpolator of `a` from the resource with ID android.R.anim.accelerate_decelerate_interpolator
    
- 3 - "Anticipate" we load the interpolator of `a` from the resource with ID android.R.anim.anticipate_interpolator
    
- 4 - "Overshoot" we load the interpolator of `a` from the resource with ID android.R.anim.overshoot_interpolator
    
- 5 - "Anticipate/Overshoot" we load the interpolator of `a` from the resource with ID android.R.anim.anticipate_overshoot_interpolator
    
- 6 - "Bounce" we load the interpolator of `a` from the resource with ID android.R.anim.bounce_interpolator
    
    Finally we instruct `target` to start [Animation] `a` now.
    
- `@param parent` \- The [AdapterView] where the selection happened
    
- `@param v` - The [View] within the [AdapterView] that was clicked
    
- `@param position` - The position of the view in the adapter
    
- `@param id` \- The row id of the item that is selected
    

```kotlin
    override fun onItemSelected(parent: AdapterView<*>?, v: View?, position: Int, id: Long) {
        val target = findViewById<View>(R.id.target)
        val targetParent = target.parent as View
        val a: Animation = TranslateAnimation(0.0f,
                (targetParent.width - target.width - targetParent.paddingLeft -
                        targetParent.paddingRight).toFloat(), 0.0f, 0.0f)
        a.duration = 1000
        a.startOffset = 300
        a.repeatMode = Animation.RESTART
        a.repeatCount = Animation.INFINITE
        when (position) {
            0 -> a.interpolator = AnimationUtils.loadInterpolator(this,
                    android.R.anim.accelerate_interpolator)
            1 -> a.interpolator = AnimationUtils.loadInterpolator(this,
                    android.R.anim.decelerate_interpolator)
            2 -> a.interpolator = AnimationUtils.loadInterpolator(this,
                    android.R.anim.accelerate_decelerate_interpolator)
            3 -> a.interpolator = AnimationUtils.loadInterpolator(this,
                    android.R.anim.anticipate_interpolator)
            4 -> a.interpolator = AnimationUtils.loadInterpolator(this,
                    android.R.anim.overshoot_interpolator)
            5 -> a.interpolator = AnimationUtils.loadInterpolator(this,
                    android.R.anim.anticipate_overshoot_interpolator)
            6 -> a.interpolator = AnimationUtils.loadInterpolator(this,
                    android.R.anim.bounce_interpolator)
        }
        target.startAnimation(a)
    }
```

The followingis a Callback method to be invoked when the selection disappears from this view. We ignore it.

- @param parent The [AdapterView] that now contains no selected item.

```kotlin
    override fun onNothingSelected(parent: AdapterView<*>?) {}

    companion object {
        /**
         * The list of types of interpolators used to create the `Adapter` which is used by the
         * `Spinner` with ID R.id.spinner in our layout file.
         */
        private val INTERPOLATORS = arrayOf(
                "Accelerate", "Decelerate", "Accelerate/Decelerate",
                "Anticipate", "Overshoot", "Anticipate/Overshoot",
                "Bounce"
        )
    }
```

Below is the full code:

**Animation3.kt**

```kotlin
import android.os.Bundle
import android.view.View
import android.view.animation.Animation
import android.view.animation.AnimationUtils
import android.view.animation.TranslateAnimation
import android.widget.AdapterView
import android.widget.AdapterView.OnItemSelectedListener
import android.widget.ArrayAdapter
import android.widget.Spinner
import androidx.appcompat.app.AppCompatActivity

import com.example.android.apis.R

class Animation3 : AppCompatActivity(), OnItemSelectedListener {

    public override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.animation_3)
        val s = findViewById<Spinner>(R.id.spinner)
        val adapter = ArrayAdapter(
                this,
                android.R.layout.simple_spinner_item,
                INTERPOLATORS
        )
        adapter.setDropDownViewResource(android.R.layout.simple_spinner_dropdown_item)
        s.adapter = adapter
        s.onItemSelectedListener = this
    }
    override fun onItemSelected(parent: AdapterView<*>?, v: View?, position: Int, id: Long) {
        val target = findViewById<View>(R.id.target)
        val targetParent = target.parent as View
        val a: Animation = TranslateAnimation(0.0f,
                (targetParent.width - target.width - targetParent.paddingLeft -
                        targetParent.paddingRight).toFloat(), 0.0f, 0.0f)
        a.duration = 1000
        a.startOffset = 300
        a.repeatMode = Animation.RESTART
        a.repeatCount = Animation.INFINITE
        when (position) {
            0 -> a.interpolator = AnimationUtils.loadInterpolator(this,
                    android.R.anim.accelerate_interpolator)
            1 -> a.interpolator = AnimationUtils.loadInterpolator(this,
                    android.R.anim.decelerate_interpolator)
            2 -> a.interpolator = AnimationUtils.loadInterpolator(this,
                    android.R.anim.accelerate_decelerate_interpolator)
            3 -> a.interpolator = AnimationUtils.loadInterpolator(this,
                    android.R.anim.anticipate_interpolator)
            4 -> a.interpolator = AnimationUtils.loadInterpolator(this,
                    android.R.anim.overshoot_interpolator)
            5 -> a.interpolator = AnimationUtils.loadInterpolator(this,
                    android.R.anim.anticipate_overshoot_interpolator)
            6 -> a.interpolator = AnimationUtils.loadInterpolator(this,
                    android.R.anim.bounce_interpolator)
        }
        target.startAnimation(a)
    }

    override fun onNothingSelected(parent: AdapterView<*>?) {}

    companion object {
        /**
         * The list of types of interpolators used to create the `Adapter` which is used by the
         * `Spinner` with ID R.id.spinner in our layout file.
         */
        private val INTERPOLATORS = arrayOf(
                "Accelerate", "Decelerate", "Accelerate/Decelerate",
                "Anticipate", "Overshoot", "Anticipate/Overshoot",
                "Bounce"
        )
    }
}
```

### Run

Copy the code or download it in the link below, build and run.
