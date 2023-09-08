# ToggleButton - Examples and Libraries


Toggle button is a compound button mostly built from checkbox. It's able to allow you to represent two states: checked or unchecked, toggled or untoggled, true or false, on or off. In this article we will look at it via examples and libraries.


Android SDK does provide a basic toggle button. Let's start by seeing how to use it.

## Example 1: Kotlin Android ToggleButton Example

This is a simple togglebutton written in kotlin. Let's look at it step by step.

### Step 1: Dependenies

No external dependencies are needed.

### Step 2: Add to Layout

Go to your main activity layout and add the toggle button onto it:

**activity_main.xml**

```xml
<?xml version="1.0" encoding="utf-8"?>
<androidx.constraintlayout.widget.ConstraintLayout xmlns:android="http://schemas.android.com/apk/res/android"
    xmlns:app="http://schemas.android.com/apk/res-auto"
    xmlns:tools="http://schemas.android.com/tools"
    android:layout_width="match_parent"
    android:layout_height="match_parent"
    tools:context=".MainActivity"
    android:id="@+id/main">

    <ToggleButton
        android:id="@+id/toggleButton"
        android:layout_width="wrap_content"
        android:layout_height="wrap_content"
        android:text="ToggleButton"
        app:layout_constraintBottom_toBottomOf="parent"
        app:layout_constraintEnd_toEndOf="parent"
        app:layout_constraintStart_toStartOf="parent"
        app:layout_constraintTop_toTopOf="parent" />

</androidx.constraintlayout.widget.ConstraintLayout>
```

### Step 3: Write Code

Next write your kotlin code. Replace your main activity code with the below code:

**MainActivity.kt**

```kotlin
import android.graphics.Color
import androidx.appcompat.app.AppCompatActivity
import android.os.Bundle
import kotlinx.android.synthetic.main.activity_main.*

class MainActivity : AppCompatActivity() {

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_main)

        toggleButton.setOnClickListener {
            if (toggleButton.isChecked) main.setBackgroundColor(Color.DKGRAY)
            else main.setBackgroundColor(Color.WHITE)
        }
    }
}
```

### Reference

Download the code below:

| No | Link |
| --- | --- |
| 1. | [Download](https://github.com/alirezabashi98/Test-ToggleButton/archive/refs/heads/master.zip) Code |
| 2. | [Browse](https://github.com/alirezabashi98/Test-ToggleButton/) Code |
| 3. | [Follow](https://github.com/alirezabashi98) Code author |

## Example 2. Simple ToggleButton in Java

Let's look at a simple togglebutton example without a third party library.

### Step 1: Dependencies

We don't need any third party library.

### Step 2: Layouts

We will have only one layout: our main activity layout.

**activity_main.xml**

Add the the togglebutton widget in your main activity layout as follows:

```xml
<RelativeLayout xmlns:android="http://schemas.android.com/apk/res/android"
    xmlns:tools="http://schemas.android.com/tools"
    android:layout_width="match_parent"
    android:layout_height="match_parent"
    android:paddingBottom="@dimen/activity_vertical_margin"
    android:paddingLeft="@dimen/activity_horizontal_margin"
    android:paddingRight="@dimen/activity_horizontal_margin"
    android:paddingTop="@dimen/activity_vertical_margin"
    tools:context=".MainActivity" >

    <ToggleButton
        android:id="@+id/toggleButton"
        style="@style/toggleButton"
        android:layout_width="wrap_content"
        android:layout_height="wrap_content"
        android:layout_centerInParent="true"
        android:background="@drawable/toggle_button" />

</RelativeLayout>
```

### Step 3: Write Code

The third and last step is to write code be it in java or kotlin. We will have only one class which is the main activity.

**MainActivity.java**

Add the following code in your main activity:

```java
import android.os.Bundle;
import android.app.Activity;
import android.view.Menu;
import android.widget.CompoundButton;
import android.widget.CompoundButton.OnCheckedChangeListener;
import android.widget.Toast;
import android.widget.ToggleButton;

public class MainActivity extends Activity {

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);
        ToggleButton toggleButton=(ToggleButton)findViewById(R.id.toggleButton);
        toggleButton.setOnCheckedChangeListener(new OnCheckedChangeListener() {

            @Override
            public void onCheckedChanged(CompoundButton buttonView, boolean isChecked) {
                // TODO Auto-generated method stub
                if(isChecked==true)
                {
                    Toast.makeText(getApplicationContext(), "Toggle is on.", Toast.LENGTH_LONG).show();
                }
                else
                {
                    Toast.makeText(getApplicationContext(), "Toggle is off.", Toast.LENGTH_LONG).show();
                }
            }
        });
    }

}
```

### Step 4: Run

Copy the above code and run it in your android studio.

## Example 3: Simple ToggleButton in Kotlin

In this case we see examine an example in kotlin. There is a togglebutton and an imageview in a layout. When the user preses the togglebytton, we show a lit or unlit bulb based on choice.

### Step 1: Dependencies

No special dependencies needed. However AndroidX and Kotlin are used.

### Step 2: Create Layout

In your xml layout add an imageview and a togglebutton:

**activity_main.xml**

```xml
<?xml version="1.0" encoding="utf-8"?>
<androidx.constraintlayout.widget.ConstraintLayout xmlns:android="http://schemas.android.com/apk/res/android"
    xmlns:app="http://schemas.android.com/apk/res-auto"
    xmlns:tools="http://schemas.android.com/tools"
    android:layout_width="match_parent"
    android:layout_height="match_parent"
    tools:context=".MainActivity">

    <ImageView
        android:id="@+id/imageView"
        android:layout_width="0dp"
        android:layout_height="323dp"
        android:layout_marginTop="60dp"
        app:layout_constraintEnd_toEndOf="parent"
        app:layout_constraintHorizontal_bias="0.496"
        app:layout_constraintStart_toStartOf="parent"
        app:layout_constraintTop_toTopOf="parent"
        app:srcCompat="@drawable/kapalilamba" />

    <ToggleButton
        android:id="@+id/toggleButton"
        android:layout_width="wrap_content"
        android:layout_height="wrap_content"
        android:layout_marginBottom="193dp"
        android:text="ToggleButton"
        android:textOff="@string/kapali"
        android:textOn="@string/acik"
        app:layout_constraintBottom_toBottomOf="parent"
        app:layout_constraintEnd_toEndOf="parent"
        app:layout_constraintStart_toStartOf="parent"
        app:layout_constraintTop_toBottomOf="@+id/imageView" />
</androidx.constraintlayout.widget.ConstraintLayout>
```

### Step 3: Write kotlin Code

Now come to your main activity and write some kotlin code for handling the toggle change:

**MainActivity.kt**

```kotlin
import androidx.appcompat.app.AppCompatActivity
import android.os.Bundle
import kotlinx.android.synthetic.main.activity_main.*

class MainActivity : AppCompatActivity() {

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_main)
        toggleButton.setOnCheckedChangeListener { buttonView, isChecked ->
            if (isChecked)
                imageView.setImageResource(R.drawable.aciklamba)
            else
                imageView.setImageResource(R.drawable.kapalilamba)
        }

    }
}
```

### Step 4: Run

Copy the code and run. Or you can download the code [here](https://github.com/aytimur/ToggleButton). This code has been written by [@aytimur](https://github.com/aytimur).

# Libraries

Let's also now look at some third party libraries for ToggleButton in android. These add more features as well as being more visually stunning while remaining as easy to use as the SDK widget.

## (a). ToggleButtonLayout

> Easy creation and management of toggle buttons from the Material Design spec.

![Android ToggleButton](https://github.com/savvyapps/ToggleButtonLayout/raw/master/art/segmented.png)

![](https://github.com/savvyapps/ToggleButtonLayout/raw/master/art/multiple.png)

### Step 1: Install it

Start by installing this widget. In your project-level build file, register jitpack as a maven repository:

```groovy
allprojects {
    repositories {
        ...
        maven { url "https://jitpack.io" }
    }
}
```

Then specify the dependency in your app level build file:

```groovy
implementation 'com.github.savvyapps:ToggleButtonLayout:1.3.0'
}
```

Now sync to fetch it.

### Step 2: Create Menu

The menu you are creating will contain the segmented buttons that will compose the togglebuttonlayout:

```xml
<?xml version="1.0" encoding="utf-8"?>
<menu xmlns:android="http://schemas.android.com/apk/res/android">

    <item
        android:id="@+id/toggle_left"
        android:icon="@drawable/ic_format_align_left_black_24dp" />

    <item
        android:id="@+id/toggle_center"
        android:icon="@drawable/ic_format_align_center_black_24dp" />

    <item
        android:id="@+id/toggle_right"
        android:icon="@drawable/ic_format_align_right_black_24dp" />
</menu>
```

### Step 3: Add it to Layout

Now add the togglebuttonlayout to your xml layout:

```xml
<com.savvyapps.togglebuttonlayout.ToggleButtonLayout
    android:id="@+id/toggle_button_layout"
    android:layout_width="wrap_content"
    android:layout_height="wrap_content"
    android:layout_gravity="center_horizontal"
    android:layout_marginBottom="16dp"
    app:menu="@menu/toggles" />
```

### Step 4: Write Code

You can reference the widget in your kotlin code and use it. For example to obtain the selected item:

```kotlin
val selectedToggles = toggleButtonLayout.selectedToggles()
//do what you need to with these selected toggles
```

And to listen to toggle change events:

```kotlin
toggleButtonLayout.onToggledListener = { toggle, selected ->
    Snackbar.make(root, "Toggle " + toggle.id + " selected state " + selected, Snackbar.LENGTH_LONG)
            .show()
}
```

### Example

Here's a full example showing usage of this library:

```kotlin
package com.savvyapps.togglebuttonlayout.sample

import android.graphics.Color
import android.os.Bundle
import com.google.android.material.snackbar.Snackbar
import androidx.core.content.ContextCompat
import androidx.appcompat.app.AppCompatActivity
import kotlinx.android.synthetic.main.activity_toggle_button.*

class ToggleButtonLayoutActivity : AppCompatActivity() {

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_toggle_button)

        toolbar.setTitle(R.string.app_name)

        toggleButtonLayout.onToggledListener = { _, toggle, selected ->
            Snackbar.make(root, "Toggle ${toggle.id} selected state $selected", Snackbar.LENGTH_LONG)
                    .show()
        }

        buttonSetSelectedColor.setOnClickListener {
            val primary = ContextCompat.getColor(this, R.color.colorPrimary)
            val accent = ContextCompat.getColor(this, R.color.colorAccent)
            if (toggleButtonLayoutText.selectedColor == accent) {
                toggleButtonLayoutText.selectedColor = primary
            } else {
                toggleButtonLayoutText.selectedColor = accent
            }
        }

        buttonSetDividerColor.setOnClickListener {
            val gray = Color.GRAY
            val red = Color.RED
            if (toggleButtonLayoutText.dividerColor == gray) {
                toggleButtonLayoutText.dividerColor = red
            } else {
                toggleButtonLayoutText.dividerColor = gray
            }
        }
    }
}
```

You can find the layuts [here](https://github.com/savvyapps/ToggleButtonLayout/tree/master/app).

### Reference

| No. | Name |
| --- | --- |
| 1. | [Download](https://github.com/savvyapps/ToggleButtonLayout) |
| 2. | [Author](https://github.com/savvyapps) |
