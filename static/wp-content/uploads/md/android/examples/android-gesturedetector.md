# Kotlin Android GestureDetector Examples

Learn about GestureDetector in this tutorial.


### What is Gesture Detection?

A gesture detector, speaking broadly, is a software or hardware device that detects gestures made by the user. It can be used to control a computer, smartphone, tablet, or other similar device.

Gesture detectors are often used in conjunction with touchscreens and trackpads to provide users with an alternative way of controlling their devices.

A gesture detector can be used for various purposes. They are often used as a replacement for physical buttons on touchscreen devices and trackpads. Gestures are also sometimes detected by a camera and interpreted by the device's software in order to control it without input from any physical buttons or switches on the device itself.

### What is the `GestureDetector` in android?

It is a class that Detects various gestures and events using the supplied `MotionEvents`. The `OnGestureListener` callback will notify users when a particular motion event has occurred. This class should only be used with `MotionEvents` reported via touch (don't use for trackball events). To use this class:

In this tutorial you will learn:

1. How to swipe activities using GestureDetector API.

Why this tutorial?

1. Examples written in Kotlin.
2. Practical and quick.
3. Step by step.
4. Written and validated to work in android studio.

## (a). Example 1 - How to Swipe one Activity to open another

This example explores how you can swipe an activity to open another activity. Basically you pull down on an activity and this results to opening another activity.

### Step 1: Dependencies

No third party dependency is needed for this project.

### Step 2: Code

We write our code in Kotlin. We will have three classes:

**SwipeToActivity.kt**

```kotlin
package info.camposha.mr_swipeactivity

import android.app.Activity
import android.content.Context
import android.content.Intent
import android.view.GestureDetector.SimpleOnGestureListener
import android.view.MotionEvent

class SwipeToActivity(//the activity where you will change activity from
    var context: Context,
    var firstClass: Class<*>?,
    var left: Boolean,
    var right: Boolean, //these enable sliding to left, right or both directions
    var both: Boolean, //first class is the class you come to when sliding to right, second class when you slide left
    var secondClass: Class<*>?
) : SimpleOnGestureListener() {
    override fun onFling(
        event1: MotionEvent,
        event2: MotionEvent,
        velocityX: Float,
        velocityY: Float
    ): Boolean {
        if (event2.x > event1.x) {
            if (right || both && firstClass != null) {
                //TODO WHEN SWIPING TO RIGHT
                val intent = Intent(context, firstClass)
                (context as Activity).finish()
                context.startActivity(intent)
            }
        } else if (event2.x < event1.x) {
            if (left || both && secondClass != null) {
                //TODO WHEN SWIPING TO LEFT
                val intent = Intent(context, secondClass)
                (context as Activity).finish()
                context.startActivity(intent)
            }
        }
        return true
    }
}
```

**SecondActivity.kt**

```kotlin
package info.camposha.mr_swipeactivity

import android.os.Bundle
import android.view.MotionEvent
import androidx.appcompat.app.AppCompatActivity
import androidx.core.view.GestureDetectorCompat

class SecondActivity : AppCompatActivity() {
    private var gestureObject: GestureDetectorCompat? = null
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_second)
        gestureObject = GestureDetectorCompat(
            this,
            SwipeToActivity(this@SecondActivity, null, true, false, false, MainActivity::class.java)
        )
    }

    override fun onTouchEvent(event: MotionEvent): Boolean {
        gestureObject!!.onTouchEvent(event)
        return super.onTouchEvent(event)
    }
}
```

**MainActivity.kt**

```kt
package info.camposha.mr_swipeactivity

import android.os.Bundle
import android.view.MotionEvent
import androidx.appcompat.app.AppCompatActivity
import androidx.core.view.GestureDetectorCompat
import info.camposha.mr_swipeactivity.MainActivity

class MainActivity : AppCompatActivity() {
    private var gestureObject: GestureDetectorCompat? = null
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_main)
        gestureObject = GestureDetectorCompat(
            this,
            SwipeToActivity(this@MainActivity, SecondActivity::class.java, false, true, false, null)
        )
    }

    override fun onTouchEvent(event: MotionEvent): Boolean {
        gestureObject!!.onTouchEvent(event)
        return super.onTouchEvent(event)
    }
}
```

### Step 3: Layouts

Find layouts in the source code reference.

### Step 4: Run

Run the project and you will get the following:

![Kotlin Android GestureDetector Example](https://github.com/Oclemy/MrSwipeActivity/raw/master/MrSwipeActivity.gif)

### Step 5: Download

Download the code from [here](https://github.com/Oclemy/MrSwipeActivity/archive/refs/heads/master.zip).

## Example 2: Java GestureDetector Example

Here's another simple GestureDetector example but written in Java.

### Step 1: Dependencies

No special or third party dependencies are needed.

### Step 2: Design Layout

Simply place the imageview we will be swiping in our layout. In this case we place it in our main activity layout:

**activity_main.xml**

```xml
<RelativeLayout xmlns:android="http://schemas.android.com/apk/res/android"
    xmlns:tools="http://schemas.android.com/tools" android:layout_width="match_parent"
    android:layout_height="match_parent" android:paddingLeft="@dimen/activity_horizontal_margin"
    android:paddingRight="@dimen/activity_horizontal_margin"
    android:paddingTop="@dimen/activity_vertical_margin"
    android:paddingBottom="@dimen/activity_vertical_margin" tools:context=".MainActivity">

    <ImageView
        android:id="@+id/image"
        android:layout_centerHorizontal="true"
        android:layout_centerVertical="true"
        android:layout_width="wrap_content"
        android:layout_height="wrap_content"
        android:src="@drawable/G"/>

</RelativeLayout>
```

### Step 3: Write Code

Our code in this case is written in java. Simply replace your mainActivity with the following code. You may use androidx.

**MainActivity.kt**

```java

import android.os.Bundle;
import android.support.v7.app.AppCompatActivity;
import android.view.GestureDetector;
import android.view.MotionEvent;
import android.view.View;
import android.widget.ImageView;
import android.widget.Toast;

public class MainActivity extends AppCompatActivity {

    private ImageView imageView;
    GestureDetector myGestureDetector;

    class myGestureListener extends GestureDetector.SimpleOnGestureListener{
        @Override
        public boolean onFling(MotionEvent e1, MotionEvent e2, float velocityX, float velocityY) {
            if ((e1.getX()-e2.getX())>50){
                Toast.makeText(MainActivity.this,"Swipe from right to left",Toast.LENGTH_LONG).show();
            }else if((e2.getX()-e1.getX())>50){
                Toast.makeText(MainActivity.this,"Swipe from left to right",Toast.LENGTH_LONG).show();
            }

            return super.onFling(e1, e2, velocityX, velocityY);
        }
    }
    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);
        myGestureDetector = new GestureDetector(MainActivity.this,new myGestureListener());
        imageView = (ImageView) findViewById(R.id.image);
        imageView.setOnTouchListener(new View.OnTouchListener() {
            @Override//You can get the event event sent by the touch screen
            public boolean onTouch(View v, MotionEvent event) {

                //Forward event
                myGestureDetector.onTouchEvent(event);
                return true;
            }
        });
    }

}
```

### Step 4 : Run

Lastly run the project.

### Reference

Download the code below.

| Number | Link |
| --- | --- |
| 1. | [Download](https://downgit.github.io/#/home?url=https://github.com/jackluo2012/android_study/tree/master/android_GestureDetector) code |
| 2. | [Follow](https://github.com/jackluo2012/) code author |
