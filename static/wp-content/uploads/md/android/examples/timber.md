# Timber Examples


In this tutorial you will learn how about Timber, the android logger library and how to use it via simple examples.


### What is Timber?

> Timber is a logger with a small, extensible API which provides utility on top of Android's normal `Log` class.

In the library Behavior is added through `Tree` instances. You can install an instance by calling `Timber.plant`. Installation of `Tree`s should be done as early as possible. The `onCreate` of your application is the most logical choice.

The `DebugTree` implementation will automatically figure out from which class it's being called and use that class name as its tag. Since the tags vary, it works really well when coupled with a log reader like [Pidcat](http://github.com/JakeWharton/pidcat/).

There are no `Tree` implementations installed by default because every time you log in production, a puppy dies.

### How to use it

Two easy steps are needed:

1. Install any `Tree` instances you want in the `onCreate` of your application class.
2. Call `Timber`'s static methods everywhere throughout your app.

### How to Install it

You can install it from the maven central:

```groovy
repositories {
  mavenCentral()
}
```

Via the following implementation statement:

```groovy
dependencies {
  implementation 'com.jakewharton.timber:timber:5.0.1'
}
```

## Example 1: Simple examples in Kotlin and Java

Here are some simple samples of how to use it:

### Step 1: Install the library

Install the library as has been discussed.

### Step 2: Design Layouts

Here is a simple layout we use:

**demo_activity.xml**

```xml
<?xml version="1.0" encoding="utf-8"?>

<LinearLayout xmlns:android="http://schemas.android.com/apk/res/android"
    android:layout_width="match_parent"
    android:layout_height="match_parent"
    android:orientation="vertical"
    android:padding="40dp">
  <Button
      android:id="@+id/hello"
      android:layout_width="match_parent"
      android:layout_height="wrap_content"
      android:layout_marginBottom="10dp"
      android:text="@string/hello"
      />
  <Button
      android:id="@+id/hi"
      android:layout_width="match_parent"
      android:layout_height="wrap_content"
      android:layout_marginBottom="10dp"
      android:text="@string/hi"
      />
  <Button
      android:id="@+id/hey"
      android:layout_width="match_parent"
      android:layout_height="wrap_content"
      android:text="@string/hey"
      />
</LinearLayout>
```

### Step 3: Initialize Timber

Initialize Timber in the `App` class:

```java
import static timber.log.Timber.DebugTree;

import android.app.Application;
import android.util.Log;

import androidx.annotation.NonNull;

import timber.log.Timber;

public class ExampleApp extends Application {
  @Override public void onCreate() {
    super.onCreate();

    if (BuildConfig.DEBUG) {
      Timber.plant(new DebugTree());
    } else {
      Timber.plant(new CrashReportingTree());
    }
  }

  /** A tree which logs important information for crash reporting. */
  private static class CrashReportingTree extends Timber.Tree {
    @Override protected void log(int priority, String tag, @NonNull String message, Throwable t) {
      if (priority == Log.VERBOSE || priority == Log.DEBUG) {
        return;
      }

      FakeCrashLibrary.log(priority, tag, message);

      if (t != null) {
        if (priority == Log.ERROR) {
          FakeCrashLibrary.logError(t);
        } else if (priority == Log.WARN) {
          FakeCrashLibrary.logWarning(t);
        }
      }
    }
  }
}
```

### Step 2: Create Lint Activity

Here's a sample LintActivity showing how to use or not use Timber:

**KotlinLintActivity**

```kotlin
package com.example.timber.ui

import android.annotation.SuppressLint
import android.app.Activity
import android.os.Bundle
import android.util.Log
import timber.log.Timber
import java.lang.Exception
import java.lang.String.format

@SuppressLint("Registered")
class KotlinLintActivity : Activity() {
  /**
   * Below are some examples of how NOT to use Timber.
   *
   * To see how a particular lint issue behaves, comment/remove its corresponding id from the set
   * of SuppressLint ids below.
   */
  @SuppressLint(
    "LogNotTimber",
    "StringFormatInTimber",
    "ThrowableNotAtBeginning",
    "BinaryOperationInTimber",
    "TimberArgCount",
    "TimberArgTypes",
    "TimberTagLength",
    "TimberExceptionLogging"
  )
  @Suppress("RemoveRedundantQualifierName")
  override fun onCreate(savedInstanceState: Bundle?) {
    super.onCreate(savedInstanceState)

    // LogNotTimber
    Log.d("TAG", "msg")
    Log.d("TAG", "msg", Exception())
    android.util.Log.d("TAG", "msg")
    android.util.Log.d("TAG", "msg", Exception())

    // StringFormatInTimber
    Timber.w(String.format("%s", getString()))
    Timber.w(format("%s", getString()))

    // ThrowableNotAtBeginning
    Timber.d("%s", Exception())

    // BinaryOperationInTimber
    val foo = "foo"
    val bar = "bar"
    Timber.d("foo" + "bar")
    Timber.d("foo$bar")
    Timber.d("${foo}bar")
    Timber.d("$foo$bar")

    // TimberArgCount
    Timber.d("%s %s", "arg0")
    Timber.d("%s", "arg0", "arg1")
    Timber.tag("tag").d("%s %s", "arg0")
    Timber.tag("tag").d("%s", "arg0", "arg1")

    // TimberArgTypes
    Timber.d("%d", "arg0")
    Timber.tag("tag").d("%d", "arg0")

    // TimberTagLength
    Timber.tag("abcdefghijklmnopqrstuvwx")
    Timber.tag("abcdefghijklmnopqrstuvw" + "x")

    // TimberExceptionLogging
    Timber.d(Exception(), Exception().message)
    Timber.d(Exception(), "")
    Timber.d(Exception(), null)
    Timber.d(Exception().message)
  }

  private fun getString() = "foo"
}
```

### Step 4: Create DemoActivity

**DemoActivity**

```java
import android.app.Activity;
import android.os.Bundle;
import android.view.View;
import android.widget.Button;
import android.widget.Toast;

import com.example.timber.databinding.DemoActivityBinding;

import timber.log.Timber;

public class DemoActivity extends Activity implements View.OnClickListener {
  @Override protected void onCreate(Bundle savedInstanceState) {
    super.onCreate(savedInstanceState);
    DemoActivityBinding binding = DemoActivityBinding.inflate(getLayoutInflater());
    setContentView(binding.getRoot());

    Timber.tag("LifeCycles");
    Timber.d("Activity Created");

    binding.hello.setOnClickListener(this);
    binding.hey.setOnClickListener(this);
    binding.hi.setOnClickListener(this);
  }

  @Override public void onClick(View v) {
    Button button = (Button) v;
    Timber.i("A button with ID %s was clicked to say '%s'.", button.getId(), button.getText());
    Toast.makeText(this, "Check logcat for a greeting!", LENGTH_SHORT).show();
  }
}
```

### Run

Download the code below.

### Reference

Here are the reference links:

| Number | Link |
| --- | --- |
| 1. | [Download](https://downgit.github.io/#/home?url=https://github.com/JakeWharton/timber/tree/trunk/timber-sample) Example |
| 2. | [Follow](https://github.com/JakeWharton/) code author |
| 3. | Code: [Apache 2.0 License](http://www.apache.org/licenses/LICENSE-2.0.txt) |

## Example 2: Kotlin Android Timber Example

Here is the second example.

### Step 1: Create Project

Start by creating an empty `Android Studio` project.

### Step 2: Dependencies

Install Timber as shown:

```groovy
    implementation "com.jakewharton.timber:timber:$timberVersion"
```

### Step 3: Design Layout

Design a simple MainActivity layout:

**activity_main.xml**

```xml
<?xml version="1.0" encoding="utf-8"?>
<androidx.constraintlayout.widget.ConstraintLayout xmlns:android="http://schemas.android.com/apk/res/android"
    xmlns:app="http://schemas.android.com/apk/res-auto"
    xmlns:tools="http://schemas.android.com/tools"
    android:layout_width="match_parent"
    android:layout_height="match_parent"
    tools:context="com.developers.timberexample.MainActivity">

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

### Step 4: Initialize Timber

Initialize Timber in the App class:

**InitApp.kt**

```kotlin

import android.app.Application
import timber.log.Timber

class InitApp : Application() {

    override fun onCreate() {
        super.onCreate()
        if (BuildConfig.DEBUG) {
            //Debug Mode
            Timber.plant(Timber.DebugTree())
        } else {
            //Release Mode
            //Init crashlytics here
            Timber.plant(ReleaseTree())
        }
    }
}
```

### Step 5: Log

Log messages:

**ReleaseTree.kt**

```kotlin
import android.util.Log
import timber.log.Timber

class ReleaseTree : Timber.Tree() {

    override fun log(priority: Int, tag: String?, message: String, t: Throwable?) {
        if (priority == Log.ERROR && t != null) {
            //Crashlytics reporting here
        }
    }

}
```

**MainActivity.kt**

Log a Debug message using :

```kotlin
 Timber.d("Timber")
```

or Warning message using:

```kotlin
        Timber.w("Logger")
```

```kotlin
import androidx.appcompat.app.AppCompatActivity
import android.os.Bundle
import timber.log.Timber

class MainActivity : AppCompatActivity() {

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_main)
        Timber.d("Timber")
        Timber.w("Logger")
    }
}
```

### Run

Copy the code or download it in the link below, build and run.

### Reference

Here are the reference links:

| Number | Link |
| --- | --- |
| 1. | [Download](https://downgit.github.io/#/home?url=https://github.com/amanjeetsingh150/kotlin-android-examples/tree/master/) Example |
| 2. | [Follow](https://github.com/amanjeetsingh150/) code author |
| 3. | Code: [Apache 2.0 License](http://www.apache.org/licenses/LICENSE-2.0.txt) |
