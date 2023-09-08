# Kotlin Android ProgressButton Solution and Example


In this tutorial we will look at how to induce ProgressButtons or Loading Buttons in our app. These can be used as an alternative to ProgressDialogs or progressBars. So for example if you want to send some info, you press send button and the button morphs into a progress button and shows the progress of the send operation.


Let's look at some solutions.

## (a). Use LoadingButtonAndroid

> LoadingButtonAndroid is a button to substitute the ProgressDialog.

It is an Android Button that morphs into a loading progress bar. Here are it's features:

- Fully customizable in the XML
- Really simple to use.
- Makes your app looks cooler

Here is a demo:

![Loading Buttons](https://camo.githubusercontent.com/108680a83363520869ceaf96f3023f740f65b6cd37bfdbed10f1b76189b0677f/68747470733a2f2f692e737461636b2e696d6775722e636f6d2f38534852312e676966)

### Step 1: Install it

Start by installing it. Add the following in your `build.gradle` and sync:

```groovy
implementation 'br.com.simplepass:loading-button-android:2.2.0'
```

### Step 2: Add to Layout

After installation, you need to add the loadingButton to your XML layout:

```xml
<br.com.simplepass.loadingbutton.customViews.CircularProgressButton
    android:id="@+id/btn_id"
    android:layout_width="match_parent"
    android:layout_height="wrap_content"
    android:background="@drawable/circular_border_shape" />
    app:spinning_bar_width="4dp" <!-- Optional -->
    app:spinning_bar_color="#FFF" <!-- Optional -->
    app:spinning_bar_padding="6dp" <!-- Optional -->
```

### Step 3: Use in Code

To use it in your Java/Kotlin code simply reference it and invoke the appropriate method:

```kotlin
CircularProgressButton btn = (CircularProgressButton) findViewById(R.id.btn_id)
btn.startAnimation();

//[do some async task. When it finishes]
//You can choose the color and the image after the loading is finished
btn.doneLoadingAnimation(fillColor, bitmap);

//[or just revert de animation]
btn.revertAnimation();
```

If you want to add a callback to initiate an action after the button has finished resizing:

```java
btn.startAnimation {
    <start async task>
}
```

If the animation is finished:

```java
//Choose the color and the image that will be show
circularProgressButton.doneLoadingAnimation(fillColor, bitmap);
```

To revert the loading animation with different text or image:

```java
progressButton.revertAnimation {
    progressButton.text = "Some new text"
}
```

or:

```java
progressImageButton.revertAnimation {
    progressImageButton.setImageResource(R.drawable.image)
}
```

### Full Example

1. Start by creating a project or go ahead and download the one provided.
2. Install the library as has been discussed above.
3. Design two layouts;

**activity_second.xml**

The second activity layout with several edittexts:

```xml
<?xml version="1.0" encoding="utf-8"?>
<FrameLayout
    xmlns:android="http://schemas.android.com/apk/res/android"
    xmlns:tools="http://schemas.android.com/tools"
    android:layout_width="match_parent"
    android:layout_height="match_parent"
    android:transitionName="transition">

    <LinearLayout
        android:layout_width="match_parent"
        android:layout_height="match_parent"
        android:orientation="vertical"
        tools:context="br.com.simplepass.loadingbuttonsample.SecondActivity">

        <EditText
            android:layout_marginTop="30dp"
            android:layout_width="match_parent"
            android:layout_height="wrap_content"
            android:text="Mock edittext"
            android:layout_marginLeft="8dp"
            android:layout_marginRight="8dp"
            android:layout_marginBottom="8dp"
            />

        <EditText
            android:layout_width="match_parent"
            android:layout_height="wrap_content"
            android:text="Mock edittext"
            android:layout_margin="8dp"/>

        <EditText
            android:layout_width="match_parent"
            android:layout_height="wrap_content"
            android:text="Mock edittext"
            android:layout_margin="8dp"/>

        <EditText
            android:layout_width="match_parent"
            android:layout_height="wrap_content"
            android:text="Mock edittext"
            android:layout_margin="8dp"/>

    </LinearLayout>

    <View
        android:id="@+id/mask"
        android:layout_width="match_parent"
        android:layout_height="match_parent"
        android:background="@color/color_button_default"
        />
</FrameLayout>
```

**activity_main.xml**

The main activity layout with our custom progress buttons:

```xml
<?xml version="1.0" encoding="utf-8"?>
<ScrollView xmlns:android="http://schemas.android.com/apk/res/android"
    xmlns:app="http://schemas.android.com/apk/res-auto"
    xmlns:tools="http://schemas.android.com/tools"
    android:layout_width="match_parent"
    android:layout_height="match_parent">

    <LinearLayout
        android:layout_width="match_parent"
        android:layout_height="wrap_content"
        android:gravity="center_horizontal"
        android:orientation="vertical"
        android:paddingLeft="@dimen/activity_horizontal_margin"
        android:paddingTop="40dp"
        android:paddingRight="@dimen/activity_horizontal_margin"
        android:paddingBottom="@dimen/activity_vertical_margin"
        tools:context="br.com.simplepass.loadingbuttonsample.MainActivity">

        <TextView
            android:layout_width="match_parent"
            android:layout_height="wrap_content"
            android:padding="8dp"
            android:text="Test 0" />

        <br.com.simplepass.loadingbutton.customViews.CircularProgressButton
            style="@style/Widget.AppCompat.Button.Colored"
            android:id="@+id/imgBtnTest0"
            android:layout_width="match_parent"
            android:layout_height="50dp"
            android:layout_marginLeft="18dp"
            android:layout_marginRight="18dp"
            android:layout_marginBottom="10dp"
            android:text="Test 0"
            app:finalCornerAngle="50dp"
            app:initialCornerAngle="0dp"
            app:spinning_bar_color="#FFFFFF"
            app:spinning_bar_padding="0dp"
            app:spinning_bar_width="3dp" />

        <TextView
            android:layout_width="match_parent"
            android:layout_height="wrap_content"
            android:padding="8dp"
            android:text="Test 1 - Morph, loading, done and revert" />

        <br.com.simplepass.loadingbutton.customViews.CircularProgressImageButton
            android:id="@+id/imgBtnTest1"
            android:layout_width="match_parent"
            android:layout_height="50dp"
            android:layout_marginLeft="18dp"
            android:layout_marginRight="18dp"
            android:layout_marginBottom="10dp"
            android:background="@color/black"
            android:scaleType="fitCenter"
            android:src="@drawable/ic_cloud_upload_white_24dp"
            android:theme="@style/BluePrimaryButton"
            app:finalCornerAngle="50dp"
            app:initialCornerAngle="0dp"
            app:spinning_bar_color="#FFFFFF"
            app:spinning_bar_padding="0dp"
            app:spinning_bar_width="3dp" />

        <br.com.simplepass.loadingbutton.customViews.CircularProgressButton
            android:id="@+id/buttonTest1"
            android:layout_width="match_parent"
            android:layout_height="50dp"
            android:layout_marginLeft="18dp"
            android:layout_marginRight="18dp"
            android:background="@drawable/button_shape_no_fill"
            android:text="@string/send"
            android:textColor="@android:color/black"
            app:finalCornerAngle="50dp"
            app:initialCornerAngle="0dp"
            app:spinning_bar_color="@android:color/holo_blue_bright"
            app:spinning_bar_padding="8dp"
            app:spinning_bar_width="4dp"
            android:drawableLeft="@android:drawable/arrow_up_float"
            android:drawableRight="@android:drawable/arrow_up_float"
            android:padding="10dp"
            />

        <TextView
            android:layout_width="match_parent"
            android:layout_height="wrap_content"
            android:padding="8dp"
            android:text="Test 2 - Morph, loading and revert" />

        <br.com.simplepass.loadingbutton.customViews.CircularProgressButton
            android:id="@+id/buttonTest2"
            android:layout_width="match_parent"
            android:layout_height="50dp"
            android:layout_marginLeft="18dp"
            android:layout_marginRight="18dp"
            android:layout_marginBottom="20dp"
            android:background="@drawable/button_shape_default"
            android:text="@string/send"
            android:textColor="@android:color/white"
            android:theme="@style/BluePrimaryButton"
            app:finalCornerAngle="50dp"
            app:initialCornerAngle="0dp"
            app:spinning_bar_color="#FFFFFFFF"
            app:spinning_bar_padding="5dp"
            app:spinning_bar_width="5dp" />

        <TextView
            android:layout_width="match_parent"
            android:layout_height="wrap_content"
            android:padding="8dp"
            android:text="Test 3 - Morph, loading and revert very fast " />

        <br.com.simplepass.loadingbutton.customViews.CircularProgressButton
            android:id="@+id/buttonTest3"
            android:layout_width="match_parent"
            android:layout_height="50dp"
            android:layout_marginLeft="18dp"
            android:layout_marginRight="18dp"
            android:layout_marginBottom="20dp"
            android:background="@color/blue"
            android:text="@string/send"
            android:textColor="@android:color/white"
            android:theme="@style/BluePrimaryButton"
            app:finalCornerAngle="50dp"
            app:initialCornerAngle="0dp"
            app:spinning_bar_color="#FFFFFFFF"
            app:spinning_bar_padding="5dp"
            app:spinning_bar_width="5dp" />

        <TextView
            android:layout_width="match_parent"
            android:layout_height="wrap_content"
            android:padding="8dp"
            android:text="Test 4 - Morph, loading, done and revert. Done very fast " />

        <br.com.simplepass.loadingbutton.customViews.CircularProgressButton
            android:id="@+id/buttonTest4"
            android:layout_width="match_parent"
            android:layout_height="50dp"
            android:layout_marginLeft="18dp"
            android:layout_marginRight="18dp"
            android:layout_marginBottom="20dp"
            android:background="@drawable/button_shape_no_fill"
            android:text="@string/send"
            android:textColor="@android:color/black"
            android:theme="@style/BluePrimaryButton"
            app:finalCornerAngle="50dp"
            app:initialCornerAngle="0dp"
            app:spinning_bar_color="#FFFFFFFF"
            app:spinning_bar_padding="5dp"
            app:spinning_bar_width="5dp" />

        <TextView
        android:layout_width="match_parent"
        android:layout_height="wrap_content"
        android:padding="8dp"
        android:text="Test 5 - Morph, loading, done and revert. Done and revert very fast " />

        <br.com.simplepass.loadingbutton.customViews.CircularProgressButton
            android:id="@+id/buttonTest5"
            android:layout_width="match_parent"
            android:layout_height="50dp"
            android:layout_marginLeft="18dp"
            android:layout_marginRight="18dp"
            android:layout_marginBottom="20dp"
            android:background="@drawable/button_shape_default"
            android:text="@string/send"
            android:textColor="@android:color/white"
            android:theme="@style/BluePrimaryButton"
            app:finalCornerAngle="50dp"
            app:initialCornerAngle="0dp"
            app:spinning_bar_color="#FFFFFFFF"
            app:spinning_bar_padding="5dp"
            app:spinning_bar_width="5dp" />

        <TextView
            android:layout_width="match_parent"
            android:layout_height="wrap_content"
            android:padding="8dp"
            android:text="Test 6 - Set Progress " />

        <br.com.simplepass.loadingbutton.customViews.CircularProgressButton
            android:id="@+id/buttonTest6"
            android:layout_width="match_parent"
            android:layout_height="50dp"
            android:layout_marginLeft="18dp"
            android:layout_marginRight="18dp"
            android:layout_marginBottom="20dp"
            android:background="@drawable/button_shape_default"
            android:text="@string/send"
            android:textColor="@android:color/white"
            android:theme="@style/BluePrimaryButton"
            app:finalCornerAngle="50dp"
            app:initialCornerAngle="0dp"
            app:spinning_bar_color="#FFFFFFFF"
            app:spinning_bar_padding="5dp"
            app:spinning_bar_width="5dp" />

        <TextView
            android:layout_width="match_parent"
            android:layout_height="wrap_content"
            android:padding="8dp"
            android:text="Test 7 - Start Animation, then Stop" />

        <br.com.simplepass.loadingbutton.customViews.CircularProgressButton
            android:id="@+id/buttonTest7"
            android:layout_width="match_parent"
            android:layout_height="50dp"
            android:layout_marginLeft="18dp"
            android:layout_marginRight="18dp"
            android:layout_marginBottom="20dp"
            android:background="@drawable/button_shape_default"
            android:text="@string/send"
            android:textColor="@android:color/white"
            android:theme="@style/BluePrimaryButton"
            app:finalCornerAngle="50dp"
            app:initialCornerAngle="0dp"
            app:spinning_bar_color="#FFFFFFFF"
            app:spinning_bar_padding="5dp"
            app:spinning_bar_width="5dp" />

        <TextView
            android:layout_width="match_parent"
            android:layout_height="wrap_content"
            android:padding="8dp"
            android:text="Test 8 - Start Animation, then Stop fast" />

        <br.com.simplepass.loadingbutton.customViews.CircularProgressButton
            android:id="@+id/buttonTest8"
            android:layout_width="match_parent"
            android:layout_height="50dp"
            android:layout_marginLeft="18dp"
            android:layout_marginRight="18dp"
            android:layout_marginBottom="20dp"
            android:background="@drawable/button_shape_default"
            android:text="@string/send"
            android:textColor="@android:color/white"
            android:theme="@style/BluePrimaryButton"
            app:finalCornerAngle="50dp"
            app:initialCornerAngle="0dp"
            app:spinning_bar_color="#FFFFFFFF"
            app:spinning_bar_padding="5dp"
            app:spinning_bar_width="5dp" />

        <TextView
            android:layout_width="match_parent"
            android:layout_height="wrap_content"
            android:padding="8dp"
            android:text="Test 9 - Start Animation with listener, then Revert with listener" />

        <br.com.simplepass.loadingbutton.customViews.CircularProgressButton
            android:id="@+id/buttonTest9"
            android:layout_width="match_parent"
            android:layout_height="50dp"
            android:layout_marginLeft="18dp"
            android:layout_marginRight="18dp"
            android:layout_marginBottom="20dp"
            android:background="@drawable/button_shape_default"
            android:text="@string/send"
            android:textColor="@android:color/white"
            android:theme="@style/BluePrimaryButton"
            app:finalCornerAngle="50dp"
            app:initialCornerAngle="0dp"
            app:spinning_bar_color="#FFFFFFFF"
            app:spinning_bar_padding="5dp"
            app:spinning_bar_width="5dp" />

        <TextView
            android:layout_width="match_parent"
            android:layout_height="wrap_content"
            android:padding="8dp"
            android:text="Test 10 - Use any background(like RippleDrawable) and styles(like material button) like Ripple" />

        <br.com.simplepass.loadingbutton.customViews.CircularProgressButton
            android:id="@+id/buttonTest10"
            style="@style/Widget.AppCompat.Button.Colored"
            android:layout_width="match_parent"
            android:layout_height="50dp"
            android:layout_marginLeft="18dp"
            android:layout_marginRight="18dp"
            android:layout_marginBottom="20dp"
            android:text="@string/send"
            android:textColor="@android:color/white"
            app:spinning_bar_color="#FFFFFFFF"
            app:spinning_bar_padding="5dp"
            app:spinning_bar_width="5dp" />

    </LinearLayout>
</ScrollView>
```

4. Write Code

We will have two activities:

**SecondActivity.kt**

```kotlin
import android.animation.ObjectAnimator
import android.os.Bundle
import androidx.appcompat.app.AppCompatActivity
import kotlinx.android.synthetic.main.activity_second.*

class SecondActivity : AppCompatActivity() {

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_second)

        val animator = ObjectAnimator.ofFloat(mask, "alpha", 0f).setDuration(600)

        animator.startDelay = 400
        animator.start()

//        button.setOnClickListener {
//            startActivity(Intent(this, MainActivity::class.java))
//        }
    }
}
```

**MainActivity.kt**

```kotlin
import android.animation.ValueAnimator
import android.content.Context
import android.content.res.Resources
import android.graphics.Bitmap
import android.graphics.BitmapFactory
import android.os.Bundle
import android.os.Handler
import androidx.appcompat.app.AppCompatActivity
import androidx.core.content.ContextCompat
import br.com.simplepass.loadingbutton.animatedDrawables.ProgressType
import br.com.simplepass.loadingbutton.customViews.ProgressButton
import kotlinx.android.synthetic.main.activity_main.*
import android.widget.Toast

class MainActivity : AppCompatActivity() {

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_main)

        imgBtnTest0.run { setOnClickListener { morphDoneAndRevert(this@MainActivity) } }

        imgBtnTest1.run { setOnClickListener { morphDoneAndRevert(this@MainActivity) } }
        buttonTest1.run { setOnClickListener { morphDoneAndRevert(this@MainActivity) } }

        buttonTest2.run { setOnClickListener { morphAndRevert() } }

        buttonTest3.run { setOnClickListener { morphAndRevert(100) } }

        buttonTest4.run {
            setOnClickListener {
                morphDoneAndRevert(this@MainActivity, doneTime = 100)
            }
        }

        buttonTest5.run {
            setOnClickListener {
                morphDoneAndRevert(this@MainActivity, doneTime = 100, revertTime = 200)
            }
        }

        buttonTest6.run {
            setOnClickListener {
                progressType = ProgressType.INDETERMINATE
                startAnimation()
                progressAnimator(this).start()
                Handler().run {
                    postDelayed({
                        doneLoadingAnimation(defaultColor(context), defaultDoneImage(context.resources))
                    }, 2500)
                    postDelayed({ revertAnimation() }, 3500)
                }
            }
        }

        buttonTest7.run { setOnClickListener { morphStopRevert() } }
        buttonTest8.run { setOnClickListener { morphStopRevert(100, 1000) } }

        buttonTest9.run {
            setOnClickListener {
                morphAndRevert {
                    Toast.makeText(this@MainActivity, getString(R.string.start_done),
                            Toast.LENGTH_SHORT).show()
                }
            }
        }

        buttonTest10.run {
            setOnClickListener {
                morphDoneAndRevert(this@MainActivity)
            }
        }
    }
}

private fun defaultColor(context: Context) = ContextCompat.getColor(context, android.R.color.black)

private fun defaultDoneImage(resources: Resources) =
        BitmapFactory.decodeResource(resources, R.drawable.ic_pregnant_woman_white_48dp)

private fun ProgressButton.morphDoneAndRevert(
    context: Context,
    fillColor: Int = defaultColor(context),
    bitmap: Bitmap = defaultDoneImage(context.resources),
    doneTime: Long = 3000,
    revertTime: Long = 4000
) {
    progressType = ProgressType.INDETERMINATE
    startAnimation()
    Handler().run {
        postDelayed({ doneLoadingAnimation(fillColor, bitmap) }, doneTime)
        postDelayed(::revertAnimation, revertTime)
    }
}

private fun ProgressButton.morphAndRevert(revertTime: Long = 3000, startAnimationCallback: () -> Unit = {}) {
    startAnimation(startAnimationCallback)
    Handler().postDelayed(::revertAnimation, revertTime)
}

private fun ProgressButton.morphStopRevert(stopTime: Long = 1000, revertTime: Long = 2000) {
    startAnimation()
    Handler().postDelayed(::stopAnimation, stopTime)
    Handler().postDelayed(::revertAnimation, revertTime)
}

private fun progressAnimator(progressButton: ProgressButton) = ValueAnimator.ofFloat(0F, 100F).apply {
    duration = 1500
    startDelay = 500
    addUpdateListener { animation ->
        progressButton.setProgress(animation.animatedValue as Float)
    }
}
```

Then run. You can download the code below.

### Reference

Here are the reference links:

| Number | Link |
| --- | --- |
| 1. | [Download](https://downgit.github.io/#/home?url=https://github.com/leandroBorgesFerreira/LoadingButtonAndroid/tree/master/app) Example |
| 2. | [Read more](https://github.com/leandroBorgesFerreira/LoadingButtonAndroid) code author |
| 3. | [Follow](https://github.com/leandroBorgesFerreira/) library author |
