# Kotlin Android FloatingActionButton Example


In this piece we will explore some floating action button examples for absolute beginners. This tutorial is meant for beginners and teaches you how to use a floating action button. First you render a floating action button on the screen at the right bottom corner of the screen then handle it's click events.


## Example 1: Kotlin Android FloatingActionButton Example

A simple floating action button example for beginners. Here is the demo:

![Kotlin Android FloatingActionButton Example](https://github.com/alirezabashi98/Floating-action-buttons/raw/master/scr001.png)

### Step 1: Dependencies

We do not need any third party dependencies. Instead we will place the material package as a gradle dependency as follows:

```groovy
implementation 'com.google.android.material:material:1.1.0'
```

### Step 2: Design Layout

In your main activity layout simply add the floating action button as below:

```xml
<?xml version="1.0" encoding="utf-8"?>
<RelativeLayout xmlns:android="http://schemas.android.com/apk/res/android"
    xmlns:app="http://schemas.android.com/apk/res-auto"
    xmlns:tools="http://schemas.android.com/tools"
    android:layout_width="match_parent"
    android:layout_height="match_parent"
    tools:context=".MainActivity"
    android:textDirection="ltr"
    android:layoutDirection="ltr">

    <TextView
        android:layout_width="wrap_content"
        android:layout_height="wrap_content"
        android:text="Hello World!"
        android:layout_centerHorizontal="true"
        android:layout_centerVertical="true"/>

    <com.google.android.material.floatingactionbutton.FloatingActionButton
        android:id="@+id/floatingActionButton"
        android:layout_width="wrap_content"
        android:layout_height="wrap_content"
        android:clickable="true"
        app:srcCompat="@android:drawable/sym_action_call"
        tools:layout_editor_absoluteX="339dp"
        tools:layout_editor_absoluteY="636dp"
        android:layout_alignParentBottom="true"
        android:layout_alignParentRight="true"
        android:layout_margin="50dp"
        tools:ignore="MissingConstraints" />

</RelativeLayout>
```

### Step 3: Write Kotlin Code

There is no major code written in the main activity. All we do is reference the floating action button using kotlin synthetics and then handle it's click event:

```kotlin
import androidx.appcompat.app.AppCompatActivity
import android.os.Bundle
import android.widget.Toast
import kotlinx.android.synthetic.main.activity_main.*

class MainActivity : AppCompatActivity() {

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_main)

        floatingActionButton.setOnClickListener {
            Toast.makeText(this,"floatingActionButton",Toast.LENGTH_SHORT).show()
        }
    }
}
```

### Run

Finally run the project.

### Reference

Below are the source code download links:

| No. | Link |
| --- | --- |
| 1. | [Download](https://github.com/alirezabashi98/Floating-action-buttons/archive/refs/heads/master.zip) code |
| 2. | [Browse](https://github.com/alirezabashi98/Floating-action-buttons/) code |
| 3. | [Follow](https://github.com/alirezabashi98) code author |
