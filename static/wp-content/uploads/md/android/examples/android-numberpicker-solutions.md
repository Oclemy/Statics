# Android NumberPicker - Examples and Libraries

You can build an input component for picking numbers using a spinner or a chooser dialog. Or you can use an already existing solution. In this tutorial we want to look at some solutions that can allow us pick numbers in ase we need such a functionality in our android apps.


Here are the solutions:

## (a). NumberSlidingPicker

> It is an Android Number Picker with gestures.

NumberSlidingPicker is a widget that enables the user to select a number from a predefined range. Progress value can be changed using the up and down arrows, click and edit the editable text or swiping up/down or left/right.

Check it below in the demo gif:

![Android numberpicker](https://github.com/sephiroth74/NumberSlidingPicker/raw/master/art/video.gif)

### Step 1: Install it

Start by installing this widget:

Add jitpack in your project level build file:

```groovy
allprojects {
    repositories {
        ...
        maven { url 'https://jitpack.io' }
    }
}
```

Then the implementation statement in app levelbuild file:

```groovy
implementation 'com.github.sephiroth74:NumberSlidingPicker:1.0.3'
```

Now sync for it to be downloaded.

### Step 2: Add it To Layout

You need to add this numberpicker to your xml layout:

```xml
    <it.sephiroth.android.library.numberpicker.NumberPicker
        style="@style/NumberPicker.Filled"
        app:picker_max="100"
        app:picker_min="0"
        android:progress="50"
        app:picker_stepSize="2"
        app:picker_tracker="exponential"
        app:picker_orientation="vertical"
        android:id="@+id/numberPicker"
        android:layout_width="wrap_content"
        android:layout_height="wrap_content"
        ... />
```

### Step 3: Write Code

In your code you can attach a listener to the numberpicker to get when the user selects a given number:

```kotlin
        numberPicker.doOnProgressChanged { numberPicker, progress, formUser ->
            // progress changed
        }

        numberPicker.doOnStartTrackingTouch { numberPicker ->
            // tracking started
        }

        numberPicker.doOnStopTrackingTouch { numberPicker ->
            // tracking ended
        }
```

### Example

Here's an example showing how to use this numberpicker widget:

```kotlin
import android.os.Bundle
import androidx.appcompat.app.AppCompatActivity
import androidx.databinding.DataBindingUtil
import androidx.databinding.ViewDataBinding
import androidx.lifecycle.ViewModelProviders
import it.sephiroth.android.library.numberpicker.NumberPicker
import it.sephiroth.android.numberpicker.demo.databinding.ActivityMainBinding
import timber.log.Timber

class MainActivity : AppCompatActivity() {
    private lateinit var presenter: Presenter
    private lateinit var model: MainViewModel

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)

        model = ViewModelProviders.of(this).get(MainViewModel::class.java)
        presenter = Presenter()

        val binding: ActivityMainBinding =
                DataBindingUtil.setContentView<ViewDataBinding>(this, R.layout.activity_main) as ActivityMainBinding
        binding.lifecycleOwner = this
        binding.model = model
        binding.presenter = presenter

        // regular listener
//        numberPicker.setListener {
//            onProgressChanged { numberPicker, progress, fromUser ->
//                Timber.v("doOnProgressChanged($progress, $fromUser)")
//            }
//
//            onStartTrackingTouch {
//                Timber.v("onStartTrackingTouch")
//            }
//
//            onStopTrackingTouch {
//                Timber.v("onStopTrackingTouch")
//            }
//        }
    }

    inner class Presenter {
        fun onProgressChanged(numberPicker: NumberPicker, progress: Int, fromUser: Boolean) {
            Timber.d("onProgressChanged")
            model.globalProgress.value = progress
        }

        fun onStartTracking(numberPicker: NumberPicker) {
            Timber.d("onStartTracking")
        }

        fun onStopTracking(numberPicker: NumberPicker) {
            Timber.d("onStopTracking")
        }
    }
}
```

You can find the full code [here](https://github.com/sephiroth74/NumberSlidingPicker/tree/master/app).

### Reference

Find code reference[here](https://github.com/sephiroth74/NumberSlidingPicker).

## (b).NumberPicker

> An android library that provides a simple and customizable NumberPicker.

This widget has the following features:

- Customizable fonts(color, size, strikethrough, underline, typeface)
- Customizable dividers(color, distance, length, thickness, type)
- Horizontal and Vertical mode are both supported
- Ascending and Descending order are both supported
- Also supports negative values and multiple lines

Here is demo of the project we will create:

![](https://github.com/ShawnLin013/NumberPicker/raw/master/screenshot/number-picker-theme.png)

Here is how you use this library to create a numberpicker:

### Step 1: Install Library

Install the library by declaring it in your `app/build.gradle` file:

```groovy
implementation 'io.github.ShawnLin013:number-picker:2.4.13'
```

In your project-level register mavenCentral as follows:

```groovy
buildscript {
    repositories {
        mavenCentral()
    }
}
```

### Step 2: Add to Layout

Add the numberpicker widget to your xml layout:

```xml
<com.shawnlin.numberpicker.NumberPicker
    android:id="@+id/number_picker"
    android:layout_width="wrap_content"
    android:layout_height="wrap_content"
    android:layout_centerInParent="true"
    app:np_width="64dp"
    app:np_height="180dp"
    app:np_dividerColor="@color/colorPrimary"
    app:np_formatter="@string/number_picker_formatter"
    app:np_max="59"
    app:np_min="0"
    app:np_selectedTextColor="@color/colorPrimary"
    app:np_selectedTextSize="@dimen/selected_text_size"
    app:np_textColor="@color/colorPrimary"
    app:np_textSize="@dimen/text_size"
    app:np_typeface="@string/roboto_light"
    app:np_value="3" />
```

### Step 3: Write Code

If you are using Java you can reference the numberpicker:

```java
NumberPicker numberPicker = (NumberPicker) findViewById(R.id.number_picker);
```

You can programmatically set the divider color:

```java
// Set divider color
numberPicker.setDividerColor(ContextCompat.getColor(this, R.color.colorPrimary));
numberPicker.setDividerColorResource(R.color.colorPrimary);
```

You can set the formatter:

```java
numberPicker.setFormatter(getString(R.string.number_picker_formatter));
numberPicker.setFormatter(R.string.number_picker_formatter);
```

You can also set the text color or text size:

```java
// Set selected text color
numberPicker.setSelectedTextColor(ContextCompat.getColor(this, R.color.colorPrimary));
numberPicker.setSelectedTextColorResource(R.color.colorPrimary);

// Set selected text size
numberPicker.setSelectedTextSize(getResources().getDimension(R.dimen.selected_text_size));
numberPicker.setSelectedTextSize(R.dimen.selected_text_size);
```

You can also use a custom typeface:

```java
numberPicker.setSelectedTypeface(Typeface.create(getString(R.string.roboto_light), Typeface.NORMAL));
numberPicker.setSelectedTypeface(getString(R.string.roboto_light), Typeface.NORMAL);
numberPicker.setSelectedTypeface(getString(R.string.roboto_light));
numberPicker.setSelectedTypeface(R.string.roboto_light, Typeface.NORMAL);
numberPicker.setSelectedTypeface(R.string.roboto_light);
```

Here is how you can set a value:

```java
numberPicker.setMaxValue(59);
numberPicker.setMinValue(0);
numberPicker.setValue(3);
```

And here is how you can set string values:

```java
// Using string values
// IMPORTANT! setMinValue to 1 and call setDisplayedValues after setMinValue and setMaxValue
String[] data = {"A", "B", "C", "D", "E", "F", "G", "H", "I"};
numberPicker.setMinValue(1);
numberPicker.setMaxValue(data.length);
numberPicker.setDisplayedValues(data);
numberPicker.setValue(7);
```

And here is how you can handle the event listeners:

```java
// OnClickListener
numberPicker.setOnClickListener(new View.OnClickListener() {
    @Override
    public void onClick(View view) {
        Log.d(TAG, "Click on current value");
    }
});

// OnValueChangeListener
numberPicker.setOnValueChangedListener(new NumberPicker.OnValueChangeListener() {
    @Override
    public void onValueChange(NumberPicker picker, int oldVal, int newVal) {
        Log.d(TAG, String.format(Locale.US, "oldVal: %d, newVal: %d", oldVal, newVal));
    }
});

// OnScrollListener
numberPicker.setOnScrollListener(new NumberPicker.OnScrollListener() {
    @Override
    public void onScrollStateChange(NumberPicker picker, int scrollState) {
        if (scrollState == SCROLL_STATE_IDLE) {
            Log.d(TAG, String.format(Locale.US, "newVal: %d", picker.getValue()));
        }
    }
});
```

### Full Example

#### Step 1: Create Project

Create android studio project or download the one provided.

#### Step 2: Install Library

Install the library as has been discussed.

#### Step 3: Add to Layout

Add NumberPicker to your xml layout as shown:

```xml
<?xml version="1.0" encoding="utf-8"?>
<LinearLayout xmlns:android="http://schemas.android.com/apk/res/android"
    xmlns:app="http://schemas.android.com/apk/res-auto"
    xmlns:tools="http://schemas.android.com/tools"
    android:layout_width="match_parent"
    android:layout_height="match_parent"
    android:gravity="center"
    android:orientation="vertical"
    android:paddingBottom="@dimen/activity_vertical_margin"
    android:paddingLeft="@dimen/activity_horizontal_margin"
    android:paddingTop="@dimen/activity_horizontal_margin"
    android:paddingRight="@dimen/activity_vertical_margin"
    app:layout_behavior="@string/appbar_scrolling_view_behavior"
    tools:context="com.shawnlin.numberpicker.sample.MainActivity"
    tools:showIn="@layout/activity_main">

    <com.shawnlin.numberpicker.NumberPicker
        android:id="@+id/number_picker"
        android:layout_width="wrap_content"
        android:layout_height="wrap_content" />

    <com.shawnlin.numberpicker.NumberPicker
        android:id="@+id/horizontal_number_picker"
        android:layout_width="wrap_content"
        android:layout_height="wrap_content"
        android:layout_marginTop="60dp"
        app:np_width="180dp"
        app:np_height="64dp"
        app:np_accessibilityDescriptionEnabled="true"
        app:np_dividerColor="@color/colorAccent"
        app:np_max="10"
        app:np_min="0"
        app:np_order="descending"
        app:np_orientation="horizontal"
        app:np_selectedTextColor="@color/colorAccent"
        app:np_selectedTextSize="@dimen/selected_text_size"
        app:np_selectedTypeface="@string/roboto_light"
        app:np_textColor="@color/colorAccent"
        app:np_textSize="@dimen/text_size"
        app:np_typeface="@string/roboto_light"
        app:np_fadingEdgeEnabled="false"
        app:np_wrapSelectorWheel="true"
        app:np_dividerType="underline" />

</LinearLayout>
```

### Step 4: MainActivity

Replace your MainActivity with the following code:

**MainActivity.java**

```java
import android.graphics.Typeface;
import android.os.Bundle;
import android.util.Log;
import android.view.View;

import androidx.appcompat.app.AppCompatActivity;
import androidx.appcompat.widget.Toolbar;
import androidx.core.content.ContextCompat;

import com.shawnlin.numberpicker.NumberPicker;

import java.util.Locale;

public class MainActivity extends AppCompatActivity {

    private static String TAG = "NumberPicker";

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);
        Toolbar toolbar = findViewById(R.id.toolbar);
        setSupportActionBar(toolbar);

        final NumberPicker numberPicker = findViewById(R.id.number_picker);

        // Set divider color
        numberPicker.setDividerColor(ContextCompat.getColor(this, R.color.colorPrimary));
        numberPicker.setDividerColorResource(R.color.colorPrimary);

        // Set formatter
        numberPicker.setFormatter(getString(R.string.number_picker_formatter));
        numberPicker.setFormatter(R.string.number_picker_formatter);

        // Set selected text color
        numberPicker.setSelectedTextColor(ContextCompat.getColor(this, R.color.colorPrimary));
        numberPicker.setSelectedTextColorResource(R.color.colorPrimary);

        // Set selected text size
        numberPicker.setSelectedTextSize(getResources().getDimension(R.dimen.selected_text_size));
        numberPicker.setSelectedTextSize(R.dimen.selected_text_size);

        // Set selected typeface
        numberPicker.setSelectedTypeface(Typeface.create(getString(R.string.roboto_light), Typeface.NORMAL));
        numberPicker.setSelectedTypeface(getString(R.string.roboto_light), Typeface.NORMAL);
        numberPicker.setSelectedTypeface(getString(R.string.roboto_light));
        numberPicker.setSelectedTypeface(R.string.roboto_light, Typeface.NORMAL);
        numberPicker.setSelectedTypeface(R.string.roboto_light);

        // Set text color
        numberPicker.setTextColor(ContextCompat.getColor(this, R.color.dark_grey));
        numberPicker.setTextColorResource(R.color.dark_grey);

        // Set text size
        numberPicker.setTextSize(getResources().getDimension(R.dimen.text_size));
        numberPicker.setTextSize(R.dimen.text_size);

        // Set typeface
        numberPicker.setTypeface(Typeface.create(getString(R.string.roboto_light), Typeface.NORMAL));
        numberPicker.setTypeface(getString(R.string.roboto_light), Typeface.NORMAL);
        numberPicker.setTypeface(getString(R.string.roboto_light));
        numberPicker.setTypeface(R.string.roboto_light, Typeface.NORMAL);
        numberPicker.setTypeface(R.string.roboto_light);

        // Set value
        numberPicker.setMaxValue(59);
        numberPicker.setMinValue(0);
        numberPicker.setValue(3);

        // Set string values
//        String[] data = {"A", "B", "C", "D", "E", "F", "G", "H", "I"};
//        numberPicker.setMinValue(1);
//        numberPicker.setMaxValue(data.length);
//        numberPicker.setDisplayedValues(data);

        // Set fading edge enabled
        numberPicker.setFadingEdgeEnabled(true);

        // Set scroller enabled
        numberPicker.setScrollerEnabled(true);

        // Set wrap selector wheel
        numberPicker.setWrapSelectorWheel(true);

        // Set accessibility description enabled
        numberPicker.setAccessibilityDescriptionEnabled(true);

        // OnClickListener
        numberPicker.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View view) {
                Log.d(TAG, "Click on current value");
            }
        });

        // OnValueChangeListener
        numberPicker.setOnValueChangedListener(new NumberPicker.OnValueChangeListener() {
            @Override
            public void onValueChange(NumberPicker picker, int oldVal, int newVal) {
                Log.d(TAG, String.format(Locale.US, "oldVal: %d, newVal: %d", oldVal, newVal));
            }
        });

        // OnScrollListener
        numberPicker.setOnScrollListener(new NumberPicker.OnScrollListener() {
            @Override
            public void onScrollStateChange(NumberPicker picker, int scrollState) {
                if (scrollState == SCROLL_STATE_IDLE) {
                    Log.d(TAG, String.format(Locale.US, "newVal: %d", picker.getValue()));
                }
            }
        });
    }

}
```

Proceed to download the code below.

### Reference

Here are the reference links:

| Number | Link |
| --- | --- |
| 1. | [Download](https://downgit.github.io/#/home?url=https://github.com/ShawnLin013/NumberPicker/tree/master/sample) Example |
| 2. | [Follow](https://github.com/ShawnLin013/) code author |
