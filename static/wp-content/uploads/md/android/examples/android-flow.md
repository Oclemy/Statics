# Kotlin Android Flow Example

In this tutorial you will learn about Flow and how to use in Kotlin android via simple step by step examples.


### What is a Flow?

> A _flow_ is a type that can emit multiple values sequentially, as opposed to _suspend functions_ that return only a single value.

For example,A good usage of a Flow for example is an app that needs to receive live updates from a database.

Flows are built on top of coroutines and can provide multiple values. A flow is conceptually a _stream of data_ that can be computed asynchronously. The emitted values must be of the same type. For example, a `Flow<Int>` is a flow that emits integer values.

A flow is very similar to an `Iterator` that produces a sequence of values, but it uses suspend functions to produce and consume values asynchronously. This means, for example, that the flow can safely make a network request to produce the next value without blocking the main thread.

There are three entities involved in streams of data:

- A **producer** produces data that is added to the stream. Thanks to coroutines, flows can also produce data asynchronously.
- **(Optional) Intermediaries** can modify each value emitted into the stream or the stream itself.
- A **consumer** consumes the values from the stream.

Let's look at some examples.

## Example 1: Simple Kotlin Android Flow Example

A simple example to get you started with Flows. This example will teach you:

- Flow
- Kotlin Coroutines
- Viewbinding

### Step 1: Create Project

Start by creating an empty `Android Studio` project.

### Step 2: Dependencies

Add the following statements in your `app/build.gradle`:

```groovy
    // coroutines
    implementation 'org.jetbrains.kotlinx:kotlinx-coroutines-core:1.4.1'
    implementation 'org.jetbrains.kotlinx:kotlinx-coroutines-android:1.4.1'

    // coroutine lifecycle scopes
    implementation "androidx.lifecycle:lifecycle-runtime-ktx:2.2.0"
```

### Step 3: Enable ViewBinding and Java8

Next enable Java8 and ViewBinding in your `android{}` closure:

```groovy
    compileOptions {
        sourceCompatibility JavaVersion.VERSION_1_8
        targetCompatibility JavaVersion.VERSION_1_8
    }

    kotlinOptions {
        jvmTarget = '1.8'
    }

    buildFeatures {
        viewBinding true
    }
```

### Step 4: Layout

Nothing special in our layout:

**activiy_main.xml**

```xml
<?xml version="1.0" encoding="utf-8"?>
<androidx.constraintlayout.widget.ConstraintLayout xmlns:android="http://schemas.android.com/apk/res/android"
    xmlns:app="http://schemas.android.com/apk/res-auto"
    xmlns:tools="http://schemas.android.com/tools"
    android:layout_width="match_parent"
    android:layout_height="match_parent"
    tools:context=".MainActivity">

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

### Step 5: Our MainActivity

Go to your `MainActivity.kt` and add the following imports:

```kotlin
import android.os.Bundle
import androidx.appcompat.app.AppCompatActivity
import androidx.lifecycle.lifecycleScope
import kotlinx.coroutines.delay
import kotlinx.coroutines.flow.*
import kotlinx.coroutines.launch
import xyz.teamgravity.flow.databinding.ActivityMainBinding
```

Extend the `AppCompatActivity` and declare our `ActivityMainBinding` object:

```kotlin
class MainActivity : AppCompatActivity() {

    private lateinit var binding: ActivityMainBinding
```

In the `onCreate()` use the above `ActivityMainBinding` object to reference our layout:

```kotlin
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        binding = ActivityMainBinding.inflate(layoutInflater)
        setContentView(binding.root)
```

Now simulate getting work from the server as our background task:

```kotlin
        val flow = flow<Int> {
            for (i in 1..10) {
                emit(i)
                delay(1000L)
            }
        }
```

Then udpdate the UI:

```kotlin
        lifecycleScope.launch {
            // runs different coroutine from producer
            flow.buffer().filter {
                it % 2 == 0
            }.map {
                it * it
            }.collect {
                println("debug: $it")
                delay(2000L)
            }
        }
    }
}
```

Here's the full code:

**MainActivity.kt**

```kotlin
package xyz.teamgravity.flow

import android.os.Bundle
import androidx.appcompat.app.AppCompatActivity
import androidx.lifecycle.lifecycleScope
import kotlinx.coroutines.delay
import kotlinx.coroutines.flow.*
import kotlinx.coroutines.launch
import xyz.teamgravity.flow.databinding.ActivityMainBinding

class MainActivity : AppCompatActivity() {

    private lateinit var binding: ActivityMainBinding

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        binding = ActivityMainBinding.inflate(layoutInflater)
        setContentView(binding.root)

        // get data from imaginary server -> producer flow
        val flow = flow<Int> {
            for (i in 1..10) {
                emit(i)
                delay(1000L)
            }
        }

        // update ui when data ready -> consumer flow
        lifecycleScope.launch {
            // runs different coroutine from producer
            flow.buffer().filter {
                it % 2 == 0
            }.map {
                it * it
            }.collect {
                println("debug: $it")
                delay(2000L)
            }
        }
    }
}
```

### Run

Copy the code or download it in the link below, build and run.

### Reference

Here are the reference links:

| Number | Link |
| --- | --- |
| 1. | [Download](https://github.com/raheemadamboev/flow-app/archive/refs/heads/master.zip) Example |
| 2. | [Follow](https://github.com/raheemadamboev/) code author |
