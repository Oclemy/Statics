# Kotlin Android CheckBox Tutorial and Example

In this tutorial you will learn checkbox usage using step by step android examples in either Kotlin or Java.

A checkbox is a specific type of two-states button that can be either checked or unchecked.

Their primary role is to allow a user to select one or more option from a group of alternatives.

CheckBoxes are a popular way of representing Boolean values in Forms. Not only do they get used in mobile applications but also in desktop as well as online forms.

CheckBoxes, unlike RadioButtons, are managed independently of each other. Therefore each must handle its own events. This is because CheckBoxes, unlike RadioButtons, can be used to select many options, not just one.


A CheckBox is a CompoundButton in that it has two states. Also it does derive from the `android.widget.CompoundButton` class.

The `CompoundButton` is an abstract class defined in the `android.widget` package that acts as the interface definition for a callback to be invoked when the checked state of its child is changed.

The CompoundButton itself is a Button so CheckBox itself will inherit capabilities for Butttons.

## CheckBox API Definition

The CheckBox resides in the `android.widget` namespace.

```java
package android.widget;
```

It derives from `android.widget.CompoundButton`:

```java
public class CheckBox extends android.widget.CompoundButton{}
```

## Important Methods inherited From CompoundButton

Here are some of the important properties of CheckBox

| Property | Return Type | Description |
| --- | --- | --- |
| `boolean isChecked ()` | `Boolean` | Determine if the checkBox is checked or not.Defined in the `CompoundButton` class. |
| `void toggle ()` | `void` | Change the checked state of the view to the inverse of its current state. Also defined in the `CompoundButton` class. |
| `void setChecked (boolean checked)` | `void` | Changes the checked state of this button..Also defined in the `CompoundButton` class. |
| `void setOnCheckedChangeListener (CompoundButton.OnCheckedChangeListener listener)` | `void` | Register a callback to be invoked when the checked state of this button changes..Also defined in the `CompoundButton` class. |

## Definition in XML Layout

CheckBoxes can be defined in the XML layouts like most widgets.

```xml
<?xml version="1.0" encoding="utf-8"?>
<LinearLayout
    android_orientation="vertical"
    android_layout_width="fill_parent"
    android_layout_height="fill_parent">
    <CheckBox android_id="@+id/checkbox_meat"
        android_layout_width="wrap_content"
        android_layout_height="wrap_content"
        android_text="@string/meat"
        android_onClick="onCheckboxClicked"/>
    <CheckBox android_id="@+id/checkbox_cheese"
        android_layout_width="wrap_content"
        android_layout_height="wrap_content"
        android_text="@string/cheese"
        android_onClick="onCheckboxClicked"/>
</LinearLayout>
```

## Manipulation From Java code.

Then CheckBox can be manipulated from the Java code.

```java
public void onCheckboxClicked(View view) {
    // Is the view now checked?
    boolean checked = ((CheckBox) view).isChecked();

    // Check which checkbox was clicked
    switch(view.getId()) {
        case R.id.checkbox_meat:
            if (checked)
                // blah blah
            else
                // blah blah
            break;
        case R.id.checkbox_cheese:
            if (checked)
                // blah blah
            else
                // blah blah
            break;
    }
}
```

Normally when a CheckBox is selected, the `onClick` event is raised. So in the above example, we defined an `android:onClick` attribute of our XML layout then registered it an event handler.

## Example 1: Kotlin Android CheckBox Example

This is a simple checkbox example in kotlin android.

### Step 1: Dependencies

No special dependency is needed for this project. However Kotlin and androidx are used.

### Step2: Add to Layout

Next step is to add checkbox in your main activity layout as follows:

**activity_main.xml**

```xml
<?xml version="1.0" encoding="utf-8"?>
<LinearLayout xmlns:android="http://schemas.android.com/apk/res/android"
    xmlns:app="http://schemas.android.com/apk/res-auto"
    xmlns:tools="http://schemas.android.com/tools"
    android:layout_width="match_parent"
    android:layout_height="match_parent"
    tools:context=".MainActivity"
    android:orientation="vertical"
    android:layoutDirection="ltr"
    android:textDirection="ltr">

    <TextView
        android:layout_width="match_parent"
        android:layout_height="wrap_content"
        android:layout_marginTop="60dp"
        android:layout_marginRight="20dp"
        android:layout_marginLeft="20dp"
        android:text="Which one do you know?"/>

    <CheckBox
        android:id="@+id/chk_main_java"
        android:layout_width="match_parent"
        android:layout_height="wrap_content"
        android:layout_marginTop="40dp"
        android:layout_marginLeft="30dp"
        android:layout_marginRight="30dp"
        android:text="Java"/>

    <CheckBox
        android:id="@+id/chk_main_kotlin"
        android:layout_width="match_parent"
        android:layout_height="wrap_content"
        android:layout_marginTop="10dp"
        android:layout_marginLeft="30dp"
        android:layout_marginRight="30dp"
        android:text="Kotlin"/>

    <Button
        android:id="@+id/btn_main_result"
        android:layout_width="match_parent"
        android:layout_height="wrap_content"
        android:text="Result"
        android:textAllCaps="false"
        android:layout_marginTop="60dp"
        android:layout_marginLeft="20dp"
        android:layout_marginRight="20dp"
        android:padding="10dp"/>

</LinearLayout>
```

### Step 3: Write Kotlin Code

The last step is to write kotlin code. Below is the main activity showing how to do it:

**MainActivity.kt**

```kotlin
import androidx.appcompat.app.AppCompatActivity
import android.os.Bundle
import android.widget.Toast
import kotlinx.android.synthetic.main.activity_main.*

class MainActivity : AppCompatActivity() {

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_main)

        btn_main_result.setOnClickListener {

            var name = ""

            if (chk_main_java.isChecked) name += "Java "

            if (chk_main_kotlin.isChecked) name += "Kotlin "

            if(name.equals("")) Toast.makeText(applicationContext,"No Specialization",Toast.LENGTH_SHORT).show()
            else Toast.makeText(applicationContext,"$name Programmer",Toast.LENGTH_SHORT).show()
        }
    }
}
```

### Reference

Download the code below:

| No | Link |
| --- | --- |
| 1. | [Download](https://github.com/alirezabashi98/Test-Checkbox-in-android-kotlin/archive/refs/heads/master.zip) Code |
| 2. | [Browse](https://github.com/alirezabashi98/Test-Checkbox-in-android-kotlin/) Code |
| 3. | [Follow](https://github.com/alirezabashi98) Code author |

## Example 2

Let's now look at a full example in Java code. Here's the XML layout. We add a checkbox here.

```xml
<?xml version="1.0" encoding="utf-8"?>
<RelativeLayout

    android_layout_width="match_parent"
    android_layout_height="match_parent"
    tools_context="info.camposha.mrcheckbox.MainActivity">

    <TextView
        android_id="@+id/headerLabel"
        android_layout_width="wrap_content"
        android_layout_height="wrap_content"
        android_fontFamily="casual"
        android_layout_alignParentTop="true"
        android_layout_centerHorizontal="true"
        android_text="Mr. CheckBox"
        android_textAllCaps="true"
        android_textSize="24sp"
        android_textStyle="bold" />
    <CheckBox
        android_id="@+id/myCheckbox"
        android_layout_width="wrap_content"
        android_layout_height="wrap_content"
        android_layout_centerInParent="true"
        android_text="CheckBox Unchecked"
        android_padding="5dp" />

</RelativeLayout>
```

Then here's our java code.

```java
package info.camposha.mrcheckbox;

import android.app.Activity;
import android.os.Bundle;
import android.widget.CheckBox;
import android.widget.CompoundButton;

public class MainActivity extends Activity {
    /*
    * When activity is Created.
    */
    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);

        //reference checkbox
        final CheckBox myCheckBox = findViewById(R.id.myCheckbox);
        //register event handler
        myCheckBox.setOnCheckedChangeListener(new CompoundButton.OnCheckedChangeListener() {
            @Override
            public void onCheckedChanged(CompoundButton compoundButton, boolean b) {
                myCheckBox.setText( compoundButton.isChecked() ? "CheckBox Checked" : "CheckBox Unchecked");
            }
        });
    }
}
```

1. First we specify the package name to host our class.
    
2. Then add our imports using the `import` directive.
    
3. Then create a public class we call `MainActivity` that derives from [`android.app.Activity`](https://camposha.info/android/activity).
    
4. We will then override the on `onCreate()` method which is a life cycle callback for android. It gets called when the [activity](https://camposha.info/android/activity) is created.
    
5. Fist we invoke the `onCreate()` method of the super class. That super class is the [Activity](https://camposha.info/android/activity). We pass it a bundle object.
    
6. We invoke the `setContentView()` which is a method inside the `activity` class and will inflate our `R.layout.activity_main.xml` layout and use it as the view for our main activity.
    
7. First we reference the CheckBox using the `findViewById` method, passing in the id from the layout.
    
    ```java
    final CheckBox myCheckBox = findViewById(R.id.myCheckbox);
    ```
    
8. We then attach our `onCheckedChangeListener` to our CheckBox. We override the `onCheckedChange()` callback.
    
    ```java
    myCheckBox.setOnCheckedChangeListener(new CompoundButton.OnCheckedChangeListener() {
            @Override
            public void onCheckedChanged(CompoundButton compoundButton, boolean b) {
            }
        });
    ```
    
9. Inside it we set text depending on whether the checkbox is selected or not.
    
    ```java
    myCheckBox.setText( compoundButton.isChecked() ? "CheckBox Checked" : "CheckBox Unchecked");
    ```
    

## Kotlin Android CheckBox Examples

In this tutorial we introduce CheckBox, how to use it in android. Our programming language is Kotlin and our IDE is android studio.

![Kotlin android checkbox](https://camposha.info/wp-content/uploads/2019/04/demo1-17.gif)

Kotlin android checkbox

### **1\. build.gradle**

In our app level build.gradle we make sure we have the Kotlin plugin in our dependencies closure.

```java
implementation"org.jetbrains.kotlin:kotlin-stdlib-jre7:$kotlin_version"
```

### **2\. activity_main.xml**

We add our CheckBox as well as our header label TextView here.

It is plain old XML for user interfaces even with Kotlin.

```xml
<?xml version="1.0" encoding="utf-8"?>
<RelativeLayout xmlns:android="http://schemas.android.com/apk/res/android"
    xmlns:app="http://schemas.android.com/apk/res-auto"
    xmlns:tools="http://schemas.android.com/tools"
    android:layout_width="match_parent"
    android:layout_height="match_parent"
    tools:context="info.camposha.kotlincheckboxes.MainActivity">

    <TextView
        android:id="@+id/headerLabel"
        android:layout_width="wrap_content"
        android:layout_height="wrap_content"
        android:fontFamily="casual"
        android:layout_alignParentTop="true"
        android:layout_centerHorizontal="true"
        android:text="Mr. CheckBox"
        android:textAllCaps="true"
        android:textSize="24sp"
        android:textStyle="bold" />
    <CheckBox
        android:id="@+id/myCheckbox"
        android:layout_width="wrap_content"
        android:layout_height="wrap_content"
        android:layout_centerInParent="true"
        android:text="CheckBox Unchecked"
        android:padding="5dp" />

</RelativeLayout>
```

### **3\. MainActivity.java**

Here's our MainActivity.kt kotlin code.

```kotlin
package info.camposha.kotlincheckboxes

import android.app.Activity
import android.os.Bundle
import android.widget.CheckBox
import android.widget.CompoundButton

class MainActivity : Activity() {

    /*
    when activity is created
     */
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_main)

        //reference checkbox
        val myCheckBox = findViewById<CheckBox>(R.id.myCheckbox)
        //register event handler
        myCheckBox.setOnCheckedChangeListener(CompoundButton.OnCheckedChangeListener {
            compoundButton, b -> myCheckBox.setText(if (compoundButton.isChecked) "CheckBox Checked" else "CheckBox Unchecked") })
    }
}
```

That's it. Best Regards.
