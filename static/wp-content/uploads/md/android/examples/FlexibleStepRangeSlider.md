# FlexibleStepRangeSlider Example


Let us look at a Android FlexibleStepRangeSlider example.

RangeSlider in Material Components for range filter is used as below :

![](https://github.com/PRNDcompany/FlexibleStepRangeSlider/raw/main/arts/range_slider.png)

But it has fixed step size so we have to render even if input values are dynamic gap.   `FlexibleStepRangeSlider` has flexible step based on RangeSlider with Material Component

Here are demo screenshots:

![](https://github.com/PRNDcompany/FlexibleStepRangeSlider/raw/main/arts/sample_2.gif)
  

### Step 1: Install it

Install it via gradle:

[![Maven Central](https://camo.githubusercontent.com/a6cc66dd6df95d451b9a8744fb07dbf5a3b93b57141d6f06b092301020b7f2a2/68747470733a2f2f696d672e736869656c64732e696f2f6d6176656e2d63656e7472616c2f762f6b722e636f2e70726e642f666c657869626c65737465702d72616e6765736c696465722e7376673f6c6162656c3d4d6176656e25323043656e7472616c)](https://search.maven.org/search?q=a:flexiblestep-rangeslider)

```groovy
dependencies {
    implementation 'kr.co.prnd:flexiblestep-rangeslider:x.x.x'
}
```

### Step 2: Add to Layout

Add it to your xml layout:

```xml
<kr.co.prnd.slider.FlexibleStepRangeSlider
    android:layout_width="match_parent"
    android:layout_height="wrap_content"
    android:paddingHorizontal="20dp"
    android:paddingVertical="20dp"
    android:valueFrom="float" 
    android:valueTo="float"
    app:thumbColorActive="color"
    app:thumbColorInactive="color"
    app:thumbElevationActive="dimension"
    app:thumbElevationInactive="dimension"
    app:thumbRadiusActive="dimension"
    app:thumbRadiusInactive="dimension"
    app:thumbStrokeColorActive="color"
    app:thumbStrokeColorInactive="color"
    app:thumbStrokeWidthActive="dimension"
    app:thumbStrokeWidthInactive="dimension"
    app:tickColorActive="color"
    app:tickColorInactive="color"
    app:tickVisible="boolean"
    app:trackColorActive="color"
    app:trackColorInactive="color"
    app:trackHeight="dimension"
    app:values="floatArray" />
```

### Functions

*   setters to change attributes
*   `valueFrom`, `valueTo` property is currently actual value on slider
*   `setValues()`: initate range slider. (optional) `ValueFrom` `valueTo` parameters indicate start position.
*   `OnValueChangeListener` notify registered lisetner when value changed.

```kotlin
// smooth slider
slider.setValues(
    values = listOf(0f, 100f), 
    valueFrom = initailValueFrom, 
    valueTo = initialValueTo
)
// flexible slider
slider.setValues(
    valuse = listOf(0f, 10f, 20f, 30f, 50f, 100f, 150f, 200f),
    valueFrom = initialValueFrom,
    valueTo = initialValueTo
)

slider.valueFrom // actual value from range
slider.valueTo // actual value from range

slider.addOnValueChangeListener { from, to state -> 
    when (state) {
        // Called when dragging to thumb
        ValueChangeState.Dragging -> updateValue(from, to)
        // Called when update values or take off thumb
        ValueChangeState.Idle -> {
            updateValue(from, to)
            fetchValueChange(from, to)
        }
    }
}
```

##  Full Example

This example will comprise the following files:

- `MainActivity.kt`

### Step 1: Create Project

1. Open your `AndroidStudio` IDE.
2. Go to `File-->New-->Project` to create a new project.

### Step 2: Add Dependency

Add dependency as has been specified above.

### Step 3: Design Layouts


***(a). `activity_main.xml`**

Create a file named `activity_main.xml` and design it as follows:

```xml
<?xml version="1.0" encoding="utf-8"?>
<LinearLayout xmlns:android="http://schemas.android.com/apk/res/android"
    xmlns:app="http://schemas.android.com/apk/res-auto"
    xmlns:tools="http://schemas.android.com/tools"
    android:layout_width="match_parent"
    android:layout_height="match_parent"
    android:clipChildren="false"
    android:orientation="vertical"
    android:paddingVertical="20dp"
    tools:context=".MainActivity">

    <kr.co.prnd.slider.FlexibleStepRangeSlider
        android:id="@+id/slider_1"
        android:layout_width="match_parent"
        android:layout_height="wrap_content"
        android:valueFrom="60"
        app:layout_constraintBottom_toBottomOf="parent"
        app:layout_constraintTop_toTopOf="parent"
        app:thumbColorActive="#FFFFFF"
        app:thumbColorInactive="#FFFFFF"
        app:thumbElevationActive="2dp"
        app:thumbElevationInactive="4dp"
        app:thumbRadiusActive="16dp"
        app:thumbRadiusInactive="12dp"
        app:thumbStrokeColorActive="?attr/colorPrimary"
        app:thumbStrokeColorInactive="#14272E40"
        app:thumbStrokeWidthActive="1dp"
        app:thumbStrokeWidthInactive="1dp"
        app:tickColorActive="?attr/colorOnSurface"
        app:tickColorInactive="?attr/colorPrimary"
        app:tickVisible="false"
        app:trackColorActive="?attr/colorPrimary"
        app:trackColorInactive="?attr/colorOnSurface"
        app:trackHeight="4dp"
        app:values="@array/initial_slider_values_1" />

    <TextView
        android:id="@+id/text_view_1"
        style="@style/TextAppearance.MaterialComponents.Body2"
        android:layout_width="match_parent"
        android:layout_height="wrap_content"
        android:layout_marginTop="12dp"
        android:gravity="center"
        android:text="[0 ~ 1000]" />

    <kr.co.prnd.slider.FlexibleStepRangeSlider
        android:id="@+id/slider_2"
        android:layout_width="match_parent"
        android:layout_height="wrap_content"
        android:layout_marginTop="20dp"
        android:paddingHorizontal="20dp"
        android:paddingVertical="20dp"
        android:valueFrom="120000"
        app:layout_constraintBottom_toBottomOf="parent"
        app:layout_constraintTop_toTopOf="parent"
        app:thumbColorActive="#FFFFFF"
        app:thumbColorInactive="#FFFFFF"
        app:thumbElevationActive="2dp"
        app:thumbElevationInactive="4dp"
        app:thumbRadiusActive="14dp"
        app:thumbRadiusInactive="12dp"
        app:thumbStrokeColorActive="@android:color/holo_blue_dark"
        app:thumbStrokeColorInactive="#14272E40"
        app:thumbStrokeWidthActive="1dp"
        app:thumbStrokeWidthInactive="1dp"
        app:tickColorActive="?attr/colorOnSurface"
        app:tickColorInactive="?attr/colorPrimary"
        app:tickVisible="true"
        app:trackColorActive="@android:color/holo_blue_light"
        app:trackColorInactive="?attr/colorOnSurface"
        app:trackHeight="4dp"
        app:values="@array/initial_slider_values_2" />

    <TextView
        android:id="@+id/text_view_2"
        style="@style/TextAppearance.MaterialComponents.Body2"
        android:layout_width="match_parent"
        android:layout_height="wrap_content"
        android:layout_marginTop="12dp"
        android:gravity="center"
        android:text="[0 ~ 200000]" />


</LinearLayout>
```

### Step 4: Write Code

Write Code as follows:

**(a). `MainActivity.kt`**

Create a file named `MainActivity.kt`

Reference the `FlexibleStepRangeSlider`:

```kotlin
        val slider1 = findViewById<FlexibleStepRangeSlider>(R.id.slider_1)
        val slider2 = findViewById<FlexibleStepRangeSlider>(R.id.slider_2)
```

Attach the `addOnValueChangeListener` listener to the sliders and update the TextViews based on the new value:

```kotlin
        slider1.addOnValueChangeListener { from, to, state ->
            val text = "[${from.toInt()} ~ ${to.toInt()}]"
            textView1.text = text
        }

        slider2.addOnValueChangeListener { from, to, state ->
            fun setText(from: Float, to: Float) {
                val text = "[${from.toInt()} ~ ${to.toInt()}]"
                textView2.text = text
            }
```


Here is the full code

```kotlin
package kr.co.prnd.slider.sample

import android.os.Bundle
import android.util.Log
import android.widget.TextView
import androidx.appcompat.app.AppCompatActivity
import kr.co.prnd.slider.FlexibleStepRangeSlider

class MainActivity : AppCompatActivity() {

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_main)

        val slider1 = findViewById<FlexibleStepRangeSlider>(R.id.slider_1)
        val slider2 = findViewById<FlexibleStepRangeSlider>(R.id.slider_2)
        val textView1 = findViewById<TextView>(R.id.text_view_1)
        val textView2 = findViewById<TextView>(R.id.text_view_2)

        slider1.addOnValueChangeListener { from, to, state ->
            val text = "[${from.toInt()} ~ ${to.toInt()}]"
            textView1.text = text
        }

        slider2.addOnValueChangeListener { from, to, state ->
            fun setText(from: Float, to: Float) {
                val text = "[${from.toInt()} ~ ${to.toInt()}]"
                textView2.text = text
            }

            when (state) {
                FlexibleStepRangeSlider.ValueChangeState.Dragging -> setText(from, to)
                FlexibleStepRangeSlider.ValueChangeState.Idle -> Log.w(
                    MainActivity::class.java.simpleName,
                    "from: $from to: $to"
                )
            }

        }
    }
}
```

### Run

Simply copy the source code into your Android Project,Build and Run. 

### Reference

1. [Download](https://github.com/PRNDcompany/FlexibleStepRangeSlider/archive/refs/heads/master.zip) code or Browse [here](https://github.com/PRNDcompany/FlexibleStepRangeSlider).
2. [Follow](https://github.com/PRNDcompany/) code author.


