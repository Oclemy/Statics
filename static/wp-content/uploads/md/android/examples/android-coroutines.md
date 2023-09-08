# Kotlin Android Coroutines - Simple Examples

This is an android tutorial to help understand Coroutines using simple standalone examples.


### What is a Coroutine?

> It is a concurrency design pattern that you can use on Android to simplify code that executes asynchronously. [Coroutines](https://kotlinlang.org/docs/reference/coroutines/coroutines-guide.html) were added to Kotlin in version 1.3 and are based on established concepts from other languages.

On Android, coroutines help to manage long-running tasks that might otherwise block the main thread and cause your app to become unresponsive.

## Example 1: Kotlin Coroutines - Simulate API Data Fetching

A simple example to help you get started with Kotlin Coroutines. This example simulates downloading of data from an API and setting that data on the textview in the main thread.

The demo of what is created looks like this:

![Kotlin Coroutines Demo](https://github.com/sanxy/Kotlin-Coroutine-Basics/raw/master/screenshot/2.png)

### Step 1: Create Project

Start by creating an empty `Android Studio` Kotlin project.

### Step 2: Dependencies

As dendencies in your `app/build.gradle`, add Coroutine and Coroutine-Android inside the dependencies closure:

```kotlin
    implementation 'org.jetbrains.kotlinx:kotlinx-coroutines-core:1.3.7'
    implementation "org.jetbrains.kotlinx:kotlinx-coroutines-android:1.3.7"
```

### Step 3: Design Layout

Add button and a TextView to the xml layout:

**activity_main.xml**

```xml
<?xml version="1.0" encoding="utf-8"?>
<androidx.constraintlayout.widget.ConstraintLayout xmlns:android="http://schemas.android.com/apk/res/android"
    xmlns:app="http://schemas.android.com/apk/res-auto"
    xmlns:tools="http://schemas.android.com/tools"
    android:layout_width="match_parent"
    android:layout_height="match_parent"
    tools:context=".MainActivity">

    <TextView
        android:id="@+id/textView"
        android:layout_width="wrap_content"
        android:layout_height="wrap_content"
        android:text="Hello World!"
        app:layout_constraintBottom_toBottomOf="parent"
        app:layout_constraintLeft_toLeftOf="parent"
        app:layout_constraintRight_toRightOf="parent"
        app:layout_constraintTop_toTopOf="parent"
        app:layout_constraintVertical_bias="0.327" />

    <Button
        android:id="@+id/button"
        android:layout_width="wrap_content"
        android:layout_height="wrap_content"
        android:text="Click Me"
        app:layout_constraintBottom_toBottomOf="parent"
        app:layout_constraintEnd_toEndOf="parent"
        app:layout_constraintHorizontal_bias="0.498"
        app:layout_constraintStart_toStartOf="parent"
        app:layout_constraintTop_toBottomOf="@+id/textView"
        app:layout_constraintVertical_bias="0.176" />

</androidx.constraintlayout.widget.ConstraintLayout>
```

### Step 4: Write Code

Start by adding imports:

```kotlin
import android.os.Bundle
import androidx.appcompat.app.AppCompatActivity
import kotlinx.android.synthetic.main.activity_main.*
import kotlinx.coroutines.CoroutineScope
import kotlinx.coroutines.Dispatchers.IO
import kotlinx.coroutines.Dispatchers.Main
import kotlinx.coroutines.delay
import kotlinx.coroutines.launch
import kotlinx.coroutines.withContext
```

Extend the `AppCompatActivity`:

```kotlin
class MainActivity : AppCompatActivity() {
```

Define two instance fields which will represent the API call result:

```kotlin
    private val RESULT1 = "Result#1"
    private val RESULT2 = "Result#2"
```

This functions will set the downloaded result to textview on the main thread:

```kotlin
    private fun setText(input: String) {
        val newText = textView.text.toString() + "\n$input"
        textView.text = newText
    }
    private suspend fun setTextOnMainThread(input: String) {
        withContext(Main) {
            setText(input)
        }
    }
```

The following function will simulate an API call:

```kotlin
    private suspend fun fakeAPIRequest() {
        val result1 = getResult1FromApi()
        println("debug: $result1")
        setTextOnMainThread(result1)
        val result2 = getResult2FromApi()
        setTextOnMainThread(result2)
    }
```

When the button is clicked we will laucng the API call in the following `onCreate()` method:

```kotlin
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_main)
        button.setOnClickListener {
            CoroutineScope(IO).launch {
                fakeAPIRequest()
            }
        }
    }
```

Here is the full code for the `MainActivity`;

**MainActivity.kt**

```kotlin
import android.os.Bundle
import androidx.appcompat.app.AppCompatActivity
import kotlinx.android.synthetic.main.activity_main.*
import kotlinx.coroutines.CoroutineScope
import kotlinx.coroutines.Dispatchers.IO
import kotlinx.coroutines.Dispatchers.Main
import kotlinx.coroutines.delay
import kotlinx.coroutines.launch
import kotlinx.coroutines.withContext

class MainActivity : AppCompatActivity() {

    private val RESULT1 = "Result#1"
    private val RESULT2 = "Result#2"

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_main)
        button.setOnClickListener {
            CoroutineScope(IO).launch {
                fakeAPIRequest()
            }
        }
    }

    private fun setText(input: String) {
        val newText = textView.text.toString() + "\n$input"
        textView.text = newText
    }

    private suspend fun setTextOnMainThread(input: String) {
        withContext(Main) {
            setText(input)
        }
    }

    private suspend fun fakeAPIRequest() {
        val result1 = getResult1FromApi()
        println("debug: $result1")
        setTextOnMainThread(result1)
        val result2 = getResult2FromApi()
        setTextOnMainThread(result2)
    }

    private suspend fun getResult1FromApi(): String {
        logThread("getResult1FromApi")
        delay(100)
        return RESULT1
    }

    private suspend fun getResult2FromApi(): String {
        logThread("getResult2FromApi")
        delay(50)
        return RESULT2
    }

    private fun logThread(methodName: String) {
        println("debug: ${methodName}: ${Thread.currentThread().name}")
    }
}
```

### Run

Copy the code or download it in the link below, build and run.

### Reference

Here are the reference links:

| Number | Link |
| --- | --- |
| 1. | [Download](https://github.com/Sarthak2601/Simple_Coroutines_Demo/archive/refs/heads/master.zip) Example |
| 2. | [Follow](https://github.com/Sarthak2601/) code author |

## Example 2: Kotlin Coroutines - UI Update Example

This is a simple example showing how to use coroutines to perform background tasks while updating progress to the UI in parallel on main UI Thread.

Here is the demo screenshot of what is created:

![Kotlin coroutines update ui](https://camo.githubusercontent.com/2ef206a854587210d0a89291200077ce6283f6c909bc0535db63238cc96ed894/68747470733a2f2f63646e2d696d616765732d312e6d656469756d2e636f6d2f6d61782f313630302f312a6f51444e714e64764d7674466c4641394e6b5a5748672e676966)

### Step 1: Create Project

Create a Kotlin Project in Android Studio. The project has to be a Kotlin one since we intend to use Coroutines.

### Step 2: Add Dependencies

Then in your `app/build.gradle` add the following dependencies:

```groovy
    implementation 'com.akexorcist:RoundCornerProgressBar:2.0.3'
    implementation "org.jetbrains.kotlinx:kotlinx-coroutines-core:0.21"
    implementation "org.jetbrains.kotlinx:kotlinx-coroutines-android:0.20"
```

The round corner progressbar is a third party library and is subsitutable.

### Step 3: Design layout

The layout is our main activity layout. Add the 3 progressbars as well as a button:

**activity_main.xml**

```xml
<?xml version="1.0" encoding="utf-8"?>
<LinearLayout xmlns:android="http://schemas.android.com/apk/res/android"
    xmlns:tools="http://schemas.android.com/tools"
    android:layout_width="match_parent"
    android:layout_height="match_parent"
    xmlns:app="http://schemas.android.com/apk/res-auto"
    android:orientation="vertical"
    android:padding="16dp"
    tools:context="com.elyeproj.democoroutinesrace.MainActivity">

    <com.akexorcist.roundcornerprogressbar.RoundCornerProgressBar
        android:id="@+id/progressBarRed"
        android:tooltipText="Red"
        android:layout_width="match_parent"
        android:layout_height="50dp"
        app:rcProgress="0.0"
        app:rcMax="1000.0"
        app:rcRadius="10dp"
        app:rcBackgroundPadding="2dp"
        app:rcProgressColor="#f00"/>

    <com.akexorcist.roundcornerprogressbar.RoundCornerProgressBar
        android:id="@+id/progressBarGreen"
        android:tooltipText="Green"
        android:layout_marginTop="16dp"
        android:layout_width="match_parent"
        android:layout_height="50dp"
        app:rcProgress="0.0"
        app:rcMax="1000.0"
        app:rcRadius="10dp"
        app:rcBackgroundPadding="2dp"
        app:rcProgressColor="#0f0" />

    <com.akexorcist.roundcornerprogressbar.RoundCornerProgressBar
        android:id="@+id/progressBarBlue"
        android:tooltipText="Blue"
        android:layout_marginTop="16dp"
        android:layout_width="match_parent"
        android:layout_height="50dp"
        app:rcProgress="0.0"
        app:rcMax="1000.0"
        app:rcRadius="10dp"
        app:rcBackgroundPadding="2dp"
        app:rcProgressColor="#00f" />

    <Button
        android:id="@+id/buttonStart"
        android:layout_marginTop="16dp"
        android:layout_width="match_parent"
        android:layout_height="wrap_content"
        android:text="Start" />

</LinearLayout>
```

### Step 4: Implement a Continuation Interface

Then override the `resume()` and `resumeWithException` functions:

Here is the full class:

**AndroidContinuation.kt**

```kotlin
import android.os.Handler
import android.os.Looper
import kotlin.coroutines.experimental.AbstractCoroutineContextElement
import kotlin.coroutines.experimental.Continuation
import kotlin.coroutines.experimental.ContinuationInterceptor

private class AndroidContinuation<in T>(val cont: Continuation<T>) : Continuation<T> by cont {
    override fun resume(value: T) {
        if (Looper.myLooper() == Looper.getMainLooper()) cont.resume(value)
        else Handler(Looper.getMainLooper()).post { cont.resume(value) }
    }

    override fun resumeWithException(exception: Throwable) {
        if (Looper.myLooper() == Looper.getMainLooper()) cont.resumeWithException(exception)
        else Handler(Looper.getMainLooper()).post { cont.resumeWithException(exception) }
    }
}

/**
 * Android context, provides an AndroidContinuation, executes everything on the UI Thread
 */
object Android : AbstractCoroutineContextElement(ContinuationInterceptor), ContinuationInterceptor {
    override fun <T> interceptContinuation(continuation: Continuation<T>): Continuation<T> =
            AndroidContinuation(continuation)
}
```

### Step 5: Do Work

Last but not least we come to our main activity.

As instance fields define a couple of variables, some to represent the Job tobe performed and a boolean to represent the completion statis of those jobs.

```kotlin
    private var raceEnd = false
    private var greenJob: Job? = null
    private var redJob: Job? = null
    private var blueJob: Job? = null
```

Here is the function to initiate the job:

```kotlin
    private suspend fun startRunning(progressBar: RoundCornerProgressBar) {
        progressBar.progress = 0f
        while (progressBar.progress < 1000 && !raceEnd) {
            delay(10)
            progressBar.progress += (1..10).random()
        }
        if (!raceEnd) {
            raceEnd = true
            Toast.makeText(this, "${progressBar.tooltipText} won!", Toast.LENGTH_SHORT).show()
        }
    }
```

Here is the function to update the progressbars:

```kotlin
    private fun startUpdate() {
        resetRun()

        greenJob = launch(Android) {
            startRunning(progressBarGreen)
        }

        redJob = launch(Android) {
            startRunning(progressBarRed)
        }

        blueJob =launch(Android) {
            startRunning(progressBarBlue)
        }
    }
```

Here is the function to cancel the jobs:

```kotlin
    private fun resetRun() {
        raceEnd = false
        greenJob?.cancel()
        blueJob?.cancel()
        redJob?.cancel()
    }
```

Here is the full code:

**MainActivity.kt**

```kotlin
package com.elyeproj.democoroutinesrace

import android.os.Bundle
import android.support.v7.app.AppCompatActivity
import android.widget.Toast
import com.akexorcist.roundcornerprogressbar.RoundCornerProgressBar
import kotlinx.android.synthetic.main.activity_main.*
import kotlinx.coroutines.experimental.Job
import kotlinx.coroutines.experimental.delay
import kotlinx.coroutines.experimental.launch
import java.util.*

class MainActivity : AppCompatActivity() {

    private var raceEnd = false
    private var greenJob: Job? = null
    private var redJob: Job? = null
    private var blueJob: Job? = null

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_main)

        buttonStart.setOnClickListener {
            startUpdate()
        }
    }

    override fun onDestroy() {
        super.onDestroy()
        resetRun()
    }

    private fun startUpdate() {
        resetRun()

        greenJob = launch(Android) {
            startRunning(progressBarGreen)
        }

        redJob = launch(Android) {
            startRunning(progressBarRed)
        }

        blueJob =launch(Android) {
            startRunning(progressBarBlue)
        }
    }

    private suspend fun startRunning(progressBar: RoundCornerProgressBar) {
        progressBar.progress = 0f
        while (progressBar.progress < 1000 && !raceEnd) {
            delay(10)
            progressBar.progress += (1..10).random()
        }
        if (!raceEnd) {
            raceEnd = true
            Toast.makeText(this, "${progressBar.tooltipText} won!", Toast.LENGTH_SHORT).show()
        }
    }

    fun ClosedRange<Int>.random() =
            Random().nextInt(endInclusive - start) +  start

    private fun resetRun() {
        raceEnd = false
        greenJob?.cancel()
        blueJob?.cancel()
        redJob?.cancel()
    }
}
```

### Step 6: Run

Lastly run the project.

### Reference

Download the code below:

| Number | Link |
| --- | --- |
| 1. | [Download](https://github.com/elye/demo_android_coroutines_race/archive/refs/heads/master.zip) code |
| 2. | [Follow](https://github.com/elye) code author |
