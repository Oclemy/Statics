# View Animation Examples



Android is [rich in animations](https://camposha.info/android-examples/android-animation/). There too are libraries out there adding even richer animations. However in this tutorial we want to explore basic animations that can be applied to views or widgets without using any third party libraries.


We look at examples that animate simple views when a button is clicked for example.

## Example 1

Here is the example that is created:

![Kotlin Android Animation Example](https://github.com/alirezabashi98/Animation-v1/raw/master/scr001.png)

### Step 1: Dependencies

This project does not need any special dependency.

### Step 2: Design Layout

First design the layout for the main activity. This layout will have a couple of buttons, each representing an animation and an image that will be animated

**activity_main.xml**

```xml
<?xml version="1.0" encoding="utf-8"?>
<RelativeLayout xmlns:android="http://schemas.android.com/apk/res/android"
    xmlns:app="http://schemas.android.com/apk/res-auto"
    xmlns:tools="http://schemas.android.com/tools"
    android:layout_width="match_parent"
    android:layout_height="match_parent"
    tools:context=".MainActivity"
    android:orientation="vertical">

    <ImageView
        android:id="@+id/img"
        android:layout_width="150dp"
        android:layout_height="150dp"
        android:src="@drawable/ic_android_black_24dp"
        android:layout_gravity="center"
        android:layout_marginTop="150dp"
        android:layout_alignParentTop="true"
        android:layout_centerHorizontal="true"/>

    <LinearLayout
        android:layout_width="match_parent"
        android:layout_height="wrap_content"
        android:layout_alignParentBottom="true"
        android:layout_margin="5dp"
        android:padding="5dp"
        android:gravity="center">

        <Button
            android:id="@+id/btn_alpha"
            android:layout_width="wrap_content"
            android:layout_height="wrap_content"
            android:text="@string/alpha"
            android:layout_margin="5dp"/>

        <Button
            android:id="@+id/btn_rotation"
            android:layout_width="wrap_content"
            android:layout_height="wrap_content"
            android:text="@string/rotation"
            android:layout_margin="5dp"/>

        <Button
            android:id="@+id/btn_ScaleX"
            android:layout_width="wrap_content"
            android:layout_height="wrap_content"
            android:text="@string/scalex"/>

        <Button
            android:id="@+id/btn_ScaleY"
            android:layout_width="wrap_content"
            android:layout_height="wrap_content"
            android:text="@string/scaley"/>

    </LinearLayout>

</RelativeLayout>
```

### Step 3: Write Code

Start by adding imports, including the kotlin synthetics which will import the widgets that can then be used without explicit `findViewById` invocation:

```xml
import androidx.appcompat.app.AppCompatActivity
import android.os.Bundle
import kotlinx.android.synthetic.main.activity_main.*
```

Then create the activity by extending the `AppCompatActivity`:

```kotlin
class MainActivity : AppCompatActivity() {
```

Then override the `onCreate()` method:

```kotlin
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_main)
```

When the aplha button is clicked, apply the alpha animation:

```kotlin
        btn_alpha.setOnClickListener {

            img.alpha = 0f
            img.animate().alpha(1f).duration = 8000

        }
```

When the rotate button is clicked rotate the image by 360:

```kotlin
        btn_rotation.setOnClickListener {

            img.rotation = 0f
            img.animate().rotation(360f).duration = 8000

        }
```

When the scale buttons are clicked, scale the image appropriately, be it by X or Y axis:

```kotlin
        btn_ScaleX.setOnClickListener {

            img.scaleX = 1f
            img.animate().scaleX(0.5f).duration = 8000

        }

        btn_ScaleY.setOnClickListener {

            img.scaleY = 1f
            img.animate().scaleY(0.5f).duration = 8000

        }
```

Here is the full code:

**MainActivity.kt**

```kotlin
import androidx.appcompat.app.AppCompatActivity
import android.os.Bundle
import kotlinx.android.synthetic.main.activity_main.*

class MainActivity : AppCompatActivity() {

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_main)

        btn_alpha.setOnClickListener {

            img.alpha = 0f
            img.animate().alpha(1f).duration = 8000

        }

        btn_rotation.setOnClickListener {

            img.rotation = 0f
            img.animate().rotation(360f).duration = 8000

        }

        btn_ScaleX.setOnClickListener {

            img.scaleX = 1f
            img.animate().scaleX(0.5f).duration = 8000

        }

        btn_ScaleY.setOnClickListener {

            img.scaleY = 1f
            img.animate().scaleY(0.5f).duration = 8000

        }

    }
}
```

### Run

Run the project.

### Reference

Download the code below.

| No. | Link |
| --- | --- |
| 1. | [Download](https://github.com/alirezabashi98/Animation-v1/archive/refs/heads/master.zip) code |
| 2. | [Follow](https://github.com/alirezabashi98/Animation-v1/archive/refs/heads/master.zip) code author |

## Example 2: Android Blinking Animation

We will see how to implement a blinking textview animation using fade animation.

Here's the demo screenshot:

![blink_animation_textview](https://camposha.info/android-examples/wp-content/uploads/sites/9/2021/08/blink_animation_textview.jpg)

### Step 1: Create Project

Start by creating an empty `Android Studio` project.

### Step 2: Dependencies

No special dependency is needed.

### Step 3: Create Animation

Create a folder known as `anim` inside the `res` directory and add the following code:

**res/anim/blink_effect.xml**

```xml
<?xml version="1.0" encoding="utf-8"?>
<set xmlns:android="http://schemas.android.com/apk/res/android">
    <alpha android:fromAlpha="0.0"
        android:toAlpha="1.0"
        android:interpolator="@android:anim/accelerate_interpolator"
        android:duration="600"
        android:repeatMode="reverse"
        android:repeatCount="infinite"/>
</set>
```

### Step 4: Design Layout

Add a Button and a TextView:

**activity_main.xml**

```xml
<?xml version="1.0" encoding="utf-8"?>
<android.support.constraint.ConstraintLayout xmlns:android="http://schemas.android.com/apk/res/android"
    xmlns:app="http://schemas.android.com/apk/res-auto"
    xmlns:tools="http://schemas.android.com/tools"
    android:layout_width="match_parent"
    android:layout_height="match_parent"
    tools:context=".MainActivity">

    <TextView
        android:id="@+id/blink"
        android:layout_width="wrap_content"
        android:layout_height="wrap_content"
        android:text="This is fadein animation"
        android:textSize="25sp"
        android:padding="10dp"
        android:textColor="@color/colorAccent"
        android:background="@color/gray"
        app:layout_constraintBottom_toBottomOf="parent"
        app:layout_constraintLeft_toLeftOf="parent"
        app:layout_constraintRight_toRightOf="parent"
        app:layout_constraintTop_toTopOf="parent" />
    <Button
        android:id="@+id/button"
        android:layout_width="wrap_content"
        android:layout_height="wrap_content"
        android:text="START ANIMATION"
        android:gravity="center"
        app:layout_constraintBottom_toBottomOf="parent"
        app:layout_constraintLeft_toLeftOf="parent"
        app:layout_constraintRight_toRightOf="parent"
        android:layout_marginBottom="30dp"
        />

</android.support.constraint.ConstraintLayout>
```

### Step 5: Load Animation

Load animation when our button is clicked:

**MainActivity.java**

```java
public class MainActivity extends AppCompatActivity {
    Button button;
    TextView t;
    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);
        button = (Button)findViewById(R.id.button);
        t = (TextView)findViewById(R.id.blink);

        //setting clicklistener to handle the event when button is clicked
        button.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {

                    Animation animation1 =
                            AnimationUtils.loadAnimation(getApplicationContext(),
                                    R.anim.blink_effect);
                t.startAnimation(animation1);
                }

        });

    }

}
```

### Run

Copy the code or download it in the link below, build and run.

### Reference

Here are the reference links:

| Number | Link |
| --- | --- |
| 1. | [Download](https://github.com/AnkitKumar111/Android_Assignment5.1/archive/refs/heads/master.zip) Example |
| 2. | [Follow](https://github.com/AnkitKumar111/) code author |

## Example 3: Kotlin Android Shake Animation

This example will teach you how to implement a simple Shake Animation on a TextView. You will learn this in a step by step manner without using any third party library.

The example Shows the use of a translate animation defined in xml to "shake" a TextView. It uses an android:interpolator also defined in xml which consists of a `cycleInterpolator` whose android:cycles="7".

### Step 1: Create Project

Start by creating an empty `Android Studio` project.

### Step 2: Dependencies

No special dependencies are needed.

### Step 3: Define Shake animation

You need to define it as xml file. Create an `anim` folder under the `res` directory of your project and add the following:

**/anim/shake.xml**

```xml
<?xml version="1.0" encoding="utf-8"?>

<translate xmlns:android="http://schemas.android.com/apk/res/android"
    android:duration="1000"
    android:fromXDelta="0"
    android:interpolator="@anim/cycle_7"
    android:toXDelta="10" />
```

We will reference this in our code later. Take note of the `@anim/cylce_7` interpolater that has been referenced above. Here is it's definition:

**/anim/cycle_7.xml**

```xml
<?xml version="1.0" encoding="utf-8"?>
<cycleInterpolator xmlns:android="http://schemas.android.com/apk/res/android"
    android:cycles="7" />
```

### Step 4: Design Layout

Design a layout by adding a TextView, edittext and a button as follows:

**animation_1.xml**

```xml
<?xml version="1.0" encoding="utf-8"?>

<LinearLayout xmlns:android="http://schemas.android.com/apk/res/android"
    xmlns:tools="http://schemas.android.com/tools"
    android:layout_width="match_parent"
    android:layout_height="wrap_content"
    android:orientation="vertical"
    android:padding="10dip">

    <TextView
        android:layout_width="match_parent"
        android:layout_height="wrap_content"
        android:layout_marginBottom="10dip"
        android:text="@string/animation_1_instructions" />

    <EditText
        android:id="@+id/pw"
        android:layout_width="match_parent"
        android:layout_height="wrap_content"
        android:clickable="true"
        android:focusable="true"
        android:password="true"
        android:singleLine="true"
        tools:ignore="Deprecated,TextFields" />

    <Button
        android:id="@+id/login"
        android:layout_width="wrap_content"
        android:layout_height="wrap_content"
        android:text="@string/googlelogin_login" />

</LinearLayout>
```

### Step 5: Write code

Well create an `Animation1.kt` file add the following imports:

```kotlin
import android.os.Bundle
import android.view.View
import android.view.animation.Animation
import android.view.animation.AnimationUtils
import android.widget.TextView
import androidx.appcompat.app.AppCompatActivity
import com.example.android.apis.R
```

Create our Activity by extending the `AppCompatActivity`. Also implement the `View.OnClickListener`:

```kotlin
class Animation1 : AppCompatActivity(), View.OnClickListener {
```

The following will Called when the activity is starting. We set our content view to our layout file `R.layout.animation_1`. Then we locate the view with ID R.id.login to set [View] `val loginButton` and set its [View.OnClickListener] to this.

```kotlin
    public override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.animation_1)
        val loginButton = findViewById<View>(R.id.login)
        loginButton.setOnClickListener(this)
    }
```

The following will be Called when the view with ID R.id.login has been clicked. We load the animation contained in the resource file R.anim.shake to set [Animation] `val shake`. Then we locate the view with ID R.id.pw and have it start running [Animation] `shake`. R.anim.shake contains a `<translate>` element with a `fromXDelta` of 0, a `toXDelta` of 10, a duration of 1000, and uses the interpolator defined in anim/cycle_7.xml, which contains a `<cycleInterpolator>` with android:cycles="7".

- @param v The [View] that was clicked.

```kotlin
    override fun onClick(v: View) {
        val shake: Animation = AnimationUtils.loadAnimation(this, R.anim.shake)
        findViewById<View>(R.id.pw).startAnimation(shake)
    }
}
```

Here is the full code:

**Animation1.kt**

```kotlin
package com.example.android.apis.view

import android.os.Bundle
import android.view.View
import android.view.animation.Animation
import android.view.animation.AnimationUtils
import android.widget.TextView
import androidx.appcompat.app.AppCompatActivity
import com.example.android.apis.R

class Animation1 : AppCompatActivity(), View.OnClickListener {
    public override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.animation_1)
        val loginButton = findViewById<View>(R.id.login)
        loginButton.setOnClickListener(this)
    }

    override fun onClick(v: View) {
        val shake: Animation = AnimationUtils.loadAnimation(this, R.anim.shake)
        findViewById<View>(R.id.pw).startAnimation(shake)
    }
}
```

### Run

Copy the code, build and run.
