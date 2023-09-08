# Kotlin Android About Page Examples


Activities are a fundamental and component of android development. An activity encapsulates a screen that the user interacts with. Activities will typically contain components which user shall interact with. These can be buttons, lists, edittexts etc. The activity however has it's own lifecycle and you can listen to the events emitted by the activity through lifecycle methods.


### What is Activity Lifecycle?

Your app's Activity instances experience different stages of their lifecycle as users navigate through, out of, and back into it. An activity can be told when its state has changed through a number of callback methods: when the system is creating, stopping, resuming, or destroying its process.

When a user leaves and re-enters an activity, you can declare what to do within the lifecycle callback methods. Therefore, each callback allows specific actions to be taken in response to changes in state. Performing the right work at the right time and properly handling transitions will improve the performance and robustness of your application. You can avoid the following issues if you properly implement the lifecycle callbacks:

*   A crash that occurs when a user receives a phone call or switches to another app.
*   Utilization of considerable system resources even without the user's active involvement.
*   In cases where the user leaves and returns to your app later, and find they lost their previous app state. For example if they were typing some data, they find that they have to restart typing again.
*   A crash or loss of progress experienced when the screen is rotated between landscape and portrait..

In this tutorial we learn these lifecycle methods practically by writing code that does something when such an event is raised.


## (a). Create an App that Lists Activity Lifecycle Methods in Kotlin

In this example you will learn basic interaction with these methods. We show a simple toast message when such an event is raised.

We use android studio and kotlin

### Step 1: Dependencies

No dependencies are needed for this project.

### Step 2: Kotlin Code

Start by creating a file named `MaiActivity.kt`.

**MainActivity.kt**

Then add imports:

```kt
import android.os.Bundle
import android.util.Log
import androidx.appcompat.app.AppCompatActivity
import kotlinx.android.synthetic.main.activity_main.*
import java.lang.StringBuilder
```

Then extend the AppCompatActivity:

```kt
class MainActivity : AppCompatActivity() {
```

The first lifecycle method we override is the `onCreate()`. This is raised when the activity is first created. We will inflate our xml layout here. The append some text to our textbuilder. Then show the text in a textview.

```kt
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_main)
        sb.append("\n onCreate Called")
        tv.text = sb.toString()
        Log.d("ACTIVITY_LIFECYCLE", "onCreate Called")
    }
```

We then override our `onStart()`. This is raised when the activity is started and becomes visible for use:

```kt

    override fun onStart() {
        super.onStart()
        sb.append("\n onStart Called")
        tv.text = sb.toString()
        Log.d("ACTIVITY_LIFECYCLE", "onStart Called")
    }
```

And so on and so forth.

Here's the full code:

```kotlin
package info.camposha.activitylifecycle

import android.os.Bundle
import android.util.Log
import androidx.appcompat.app.AppCompatActivity
import kotlinx.android.synthetic.main.activity_main.*
import java.lang.StringBuilder

class MainActivity : AppCompatActivity() {
    val sb: StringBuilder = StringBuilder()
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_main)
        sb.append("\n onCreate Called")
        tv.text = sb.toString()
        Log.d("ACTIVITY_LIFECYCLE", "onCreate Called")
    }

    override fun onStart() {
        super.onStart()
        sb.append("\n onStart Called")
        tv.text = sb.toString()
        Log.d("ACTIVITY_LIFECYCLE", "onStart Called")
    }

    override fun onResume() {
        super.onResume()
        sb.append("\n onResume Called")
        tv.text = sb.toString()
        Log.d("ACTIVITY_LIFECYCLE", "onResume Called")
    }

    override fun onPause() {
        super.onPause()
        sb.append("\n onPause Called")
        tv.text = sb.toString()
        Log.d("ACTIVITY_LIFECYCLE", "onPause Called")
    }

    override fun onStop() {
        super.onStop()
        sb.append("\n onStop Called")
        tv.text = sb.toString()
        Log.d("ACTIVITY_LIFECYCLE", "onStop Called")
    }

    override fun onDestroy() {
        super.onDestroy()
        sb.append("\n onDestroy Called")
        tv.text = sb.toString()
        Log.d("ACTIVITY_LIFECYCLE", "onDestroy Called")
    }
}
```

### Step 3: Layouts

**activity_main.xml**

The main thing about our main activity layout is that we will have a textview that will be showing the lifecycle methods as they are raised:

```xml
<?xml version="1.0" encoding="utf-8"?>
<androidx.constraintlayout.widget.ConstraintLayout xmlns:android="http://schemas.android.com/apk/res/android"
    xmlns:app="http://schemas.android.com/apk/res-auto"
    xmlns:tools="http://schemas.android.com/tools"
    android:layout_width="match_parent"
    android:layout_height="match_parent"
    tools:context=".MainActivity">

    <TextView
        android:id="@+id/tv"
        android:layout_width="match_parent"
        android:layout_height="match_parent"
        android:text=""
        android:textAppearance="@style/TextAppearance.AppCompat.Medium"
        app:layout_constraintBottom_toBottomOf="parent"
        app:layout_constraintLeft_toLeftOf="parent"
        app:layout_constraintRight_toRightOf="parent"
        app:layout_constraintTop_toTopOf="parent" />

</androidx.constraintlayout.widget.ConstraintLayout>
```

### Step 4: Run

Run the project and you will get the following:

## Example 2: Kotlin Android Activity Lifecycle

This is a Kotlin Activity lifecycle method. We log out the called lifecycle callback using a Logger.

### Step 1: Create Project

Start by creating an empty `Android Studio` project.

### Step 2: Dependencies

We are writing the example in Kotlin thus we will add the kotlin dependency:

```groovy
    implementation"org.jetbrains.kotlin:kotlin-stdlib-jdk7:$kotlin_version"
```

We will also add the typical appcompat and constraint layout:

```groovy
    implementation "androidx.appcompat:appcompat:$buildToolsVer"
    implementation "androidx.constraintlayout:constraintlayout:$constraintLayoutVersion"
```

Those are our only dependencies.

### Step 3: Design Layout

In this case we will have a simple TextView in our layout:

**activity_main.xml**

```xml
<?xml version="1.0" encoding="utf-8"?>
<androidx.constraintlayout.widget.ConstraintLayout xmlns:android="http://schemas.android.com/apk/res/android"
    xmlns:app="http://schemas.android.com/apk/res-auto"
    xmlns:tools="http://schemas.android.com/tools"
    android:layout_width="match_parent"
    android:layout_height="match_parent"
    tools:context="com.developers.activitylifecycle.MainActivity">

    <TextView
        android:layout_width="wrap_content"
        android:layout_height="wrap_content"
        android:text="Hello World!"
        app:layout_constraintBottom_toBottomOf="parent"
        app:layout_constraintLeft_toLeftOf="parent"
        app:layout_constraintRight_toRightOf="parent"
        app:layout_constraintTop_toTopOf="parent" />

</androidx.constraintlayout.widget.ConstraintLayout>
```

### Step 4: Write Code

Go to your `MainActivity.kt` file and add the following imports:

```kotlin
import androidx.appcompat.app.AppCompatActivity
import android.os.Bundle
import java.util.logging.Logger
```

Extend the `MainActivity`:

```kotlin
class MainActivity : AppCompatActivity() {
```

Create a companion object and define a log inside it. This will log out our lifecycle methods:

```kotlin

    companion object {
        val log = Logger.getLogger(MainActivity::class.java.name)
    }
```

Override the `onCreate()` and log out the `onCreate` message:

```kotlin
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_main)
        log.info("OnCreate Called")
    }
```

Override the `onStart()`, `onRestart()`, `onResume()`, `onPause()`, `onStop()` and `onDestroy()` and log out the appropriate message:

```kotlin
    override fun onStart() {
        super.onStart()
        log.info("onStart Called")
    }

    override fun onRestart() {
        super.onRestart()
        log.info("OnRestart Called")
    }

    override fun onResume() {
        super.onResume()
        log.info("OnResume Called")
    }

    override fun onStop() {
        super.onStop()
        log.info("OnStop Called")
    }

    override fun onPause() {
        super.onPause()
        log.info("OnPause Called")
    }

    override fun onDestroy() {
        super.onDestroy()
        log.info("OnDestroy Called")
    }

}
```

Here is the full code:

**MainActivity.kt**

```kotlin
import androidx.appcompat.app.AppCompatActivity
import android.os.Bundle
import java.util.logging.Logger

class MainActivity : AppCompatActivity() {

    companion object {
        val log = Logger.getLogger(MainActivity::class.java.name)
    }

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_main)
        log.info("OnCreate Called")
    }

    override fun onStart() {
        super.onStart()
        log.info("onStart Called")
    }

    override fun onRestart() {
        super.onRestart()
        log.info("OnRestart Called")
    }

    override fun onResume() {
        super.onResume()
        log.info("OnResume Called")
    }

    override fun onStop() {
        super.onStop()
        log.info("OnStop Called")
    }

    override fun onPause() {
        super.onPause()
        log.info("OnPause Called")
    }

    override fun onDestroy() {
        super.onDestroy()
        log.info("OnDestroy Called")
    }

}
```

### Run

Copy the code or download it in the link below, build and run.

### Reference

Here are the reference links:

| Number | Link |
| --- | --- |
| 1. | [Download](https://downgit.github.io/#/home?url=https://github.com/amanjeetsingh150/kotlin-android-examples/tree/master/ActivityLifecycle) Example |
| 2. | [Follow](https://github.com/amanjeetsingh150/) code author |
| 3. | Code: [Apache 2.0 License](http://www.apache.org/licenses/LICENSE-2.0.txt) |

## Example 3: Kotlin Android Activity Lifecycle Example

Here is another example of Activity Lifecycle using Kotlin in Android. We log and show Toast messages for each method.

### Step 1: Create Project

Start by creating an empty `Android Studio` project.

### Step 2: Dependencies

No third party dependencies are needed.

### Step 3: Override Methods

You can override the Activity lifecycle methods as follows:

```kotlin
import androidx.appcompat.app.AppCompatActivity
import android.os.Bundle
import android.util.Log
import android.widget.Toast

class MainActivity : AppCompatActivity() {

    var TAG = "Event"

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_main)

        Log.d(TAG, "onCreate")
        Toast.makeText(this,"onCreate",Toast.LENGTH_SHORT).show()
    }

    override fun onRestart() {
        super.onRestart()
        Log.d(TAG, "onRestart")
        Toast.makeText(this,"onRestart",Toast.LENGTH_SHORT).show()
    }

    override fun onStart() {
        super.onStart()
        Log.d(TAG, "onStart")
        Toast.makeText(this,"onStart",Toast.LENGTH_SHORT).show()
    }

    override fun onResume() {
        super.onResume()
        Log.d(TAG, "onResume")
        Toast.makeText(this, "onResume", Toast.LENGTH_SHORT).show()
    }

    override fun onPause() {
        super.onPause()
        Log.d(TAG, "onPause")
        Toast.makeText(this, "onPause", Toast.LENGTH_SHORT).show()
    }

    override fun onStop() {
        super.onStop()
        Log.d(TAG, "onStop")
        Toast.makeText(this, "onStop", Toast.LENGTH_SHORT).show()
    }

    override fun onDestroy() {
        super.onDestroy()
        Log.d(TAG, "onDestroy")
        Toast.makeText(this, "onDestroy", Toast.LENGTH_SHORT).show()
    }

}
```

### Run

Copy the code or download it in the link below, build and run.

### Reference

Here are the reference links:

| Number | Link |
| --- | --- |
| 1. | [Download](https://github.com/Kiran-Bahalaskar/Activity-Life-Cycle-Using-Kotlin/archive/refs/heads/master.zip) Example |
| 2. | [Follow](https://github.com/Kiran-Bahalaskar/) code author |

# Screen Configuration Change

In this piece we look at android solutions related to configuration changes in the android device.

Here's a simple note about handling configuration changes according to android official documentation:

Some device configurations can change during runtime (such as screen orientation, keyboard availability, and when the user enables [multi-window mode](https://developer.android.com/guide/topics/ui/multi-window)). When such a change occurs, Android restarts the running [`Activity`](https://developer.android.com/reference/android/app/Activity) ( [`onDestroy()`](https://developer.android.com/reference/android/app/Activity#ondestroy) is called, followed by [`onCreate()`](https://developer.android.com/reference/android/app/Activity#onCreate(android.os.Bundle))). The restart behavior is designed to help your application adapt to new configurations by automatically reloading your application with alternative resources that match the new device configuration.

To properly handle a restart, it is important that your activity restores its previous state. You can use a combination of [`onSaveInstanceState()`](https://developer.android.com/reference/android/app/Activity#onsaveinstancestate), [`ViewModel`](https://developer.android.com/reference/androidx/lifecycle/ViewModel) objects, and persistent storage to save and restore the UI state of your activity across configuration changes. Read more about it [here](https://developer.android.com/guide/topics/resources/runtime-changes).

How do you listen to configuration changes in android?

### Step 1 - Specify configChanges property in android manifest

Like this:

```xml
<activity android:name=".MyActivity"
          android:configChanges="orientation|screenSize|screenLayout|keyboardHidden"
          android:label="@string/app_name">
```

The code declares an activity that handles both screen orientation changes and keyboard availability change.

- The "orientation" value prevents restarts when the screen orientation changes.
- The "screenSize" value also prevents restarts when orientation changes, but only for Android 3.2 (API level 13) and above.
- The "screenLayout" value is necessary to detect changes that can be triggered by devices such as foldable phones and convertible Chromebooks.
- The "keyboardHidden" value prevents restarts when the keyboard availability changes.

### Step 2: Override onConfigurationChanged method

Like this:

```java
@Override
public void onConfigurationChanged(Configuration newConfig) {
    super.onConfigurationChanged(newConfig);

    int newOrientation = newConfig.orientation;

    if (newOrientation == Configuration.ORIENTATION_LANDSCAPE) {
      // show("Landscape");
    } else if (newOrientation == Configuration.ORIENTATION_PORTRAIT){
    // show("Portrait");
    }
}
```

Or you can use a switch statement:

```java
int orientation=newConfig.orientation;

switch(orientation) {

case Configuration.ORIENTATION_LANDSCAPE:

//to do something
 break;

case Configuration.ORIENTATION_PORTRAIT:

//to do something
 break;

}
```

In Kotlin:

```kt
override fun onConfigurationChanged(newConfig: Configuration) {
    super.onConfigurationChanged(newConfig)

    // Checks the orientation of the screen
    if (newConfig.orientation === Configuration.ORIENTATION_LANDSCAPE) {
        Toast.makeText(this, "landscape", Toast.LENGTH_SHORT).show()
    } else if (newConfig.orientation === Configuration.ORIENTATION_PORTRAIT) {
        Toast.makeText(this, "portrait", Toast.LENGTH_SHORT).show()
    }
}
```

> Note that after before writing your implementation code you need to add `super.onConfigurationChanged(newConfig);` or else an exception may be raised.

### Observations

The onConfigurationCalled() may not be called if you

**1.Set layout to landscape in XML**

```xml
android:screenOrientation="landscape"
```

**2\. Invoke setRequestedOrientation manually**

```java
setRequestedOrientation(ActivityInfo.SCREEN_ORIENTATION_PORTRAIT);
```

**3\. You have both "android:screenOrientation" and "android:configChanges" specified.**

## Example - How to Handle Screen Orientation changes

Let's create a simple example that will observer configuration changes in an android activity and show a toast message based on whether the screen is rotated portrait or landscape.

### Step 1- Create Layout

Add the following code in your xml layout:

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

    <TextView
        android:layout_width="wrap_content"
        android:layout_height="wrap_content"
        android:text="@string/hello_world" />

</RelativeLayout>
```

### Step 2: MainActivity.java

Then add the following code in your main activity:

```java
package com.example.screenorientation;

import android.os.Bundle;
import android.app.Activity;
import android.content.res.Configuration;
import android.view.Menu;
import android.widget.Toast;

public class MainActivity extends Activity {

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);
        onConfigurationChanged(new Configuration());
    }
@Override
public void onConfigurationChanged(Configuration newConfig) {
    // TODO Auto-generated method stub
    super.onConfigurationChanged(newConfig);

    if(getResources().getConfiguration().orientation==Configuration.ORIENTATION_PORTRAIT)
    {
        Toast.makeText(getApplicationContext(), "portrait", Toast.LENGTH_SHORT).show();
        System.out.println("portrait");
    }
    else if (getResources().getConfiguration().orientation==Configuration.ORIENTATION_LANDSCAPE) {
         Toast.makeText(getApplicationContext(), "landscape", Toast.LENGTH_SHORT).show();
            System.out.println("landscape");
    }
    else
    {
         Toast.makeText(getApplicationContext(), "none", Toast.LENGTH_SHORT).show();
            System.out.println("none");
    }
}
    @Override
    public boolean onCreateOptionsMenu(Menu menu) {
        // Inflate the menu; this adds items to the action bar if it is present.
        getMenuInflater().inflate(R.menu.main, menu);
        return true;
    }

}
```

That's it.
