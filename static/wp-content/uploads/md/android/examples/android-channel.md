# Kotlin Android Coroutines Channel Example

This tutorial will show you how to use a Kotlin Channel rather than LiveData or StateFlow. This is for purposes where you need to send only a one-time event. If you use LiveData or StateFlow and for example the configuration changes, the event gets raised again. However with Kotlin Channels you can send only a one-time event.

[lwtoc]

### What is a Channel?

> According to Kotlin documentation, a Channel is a non-blocking primitive for communication between a sender (via [SendChannel](https://kotlin.github.io/kotlinx.coroutines/kotlinx-coroutines-core/kotlinx.coroutines.channels/-send-channel/index.html)) and a receiver (via [ReceiveChannel](https://kotlin.github.io/kotlinx.coroutines/kotlinx-coroutines-core/kotlinx.coroutines.channels/-receive-channel/index.html)). Conceptually, a channel is similar to Java's java.util.concurrent.BlockingQueue, but it has suspending operations instead of blocking ones and can be [closed](https://kotlin.github.io/kotlinx.coroutines/kotlinx-coroutines-core/kotlinx.coroutines.channels/-send-channel/close.html).

Read more [here](https://kotlin.github.io/kotlinx.coroutines/kotlinx-coroutines-core/kotlinx.coroutines.channels/-channel/index.html).

Let's look at an example with Android.

## Example 1: Kotlin Android Coroutines Channel Example

A simple beginner friendly example. Here are what you will learn from this example:

- Kotlin Coroutines
- Viewmodel
- Channel
- Flow
- ViewBinding

Here are the demo images of the created project:

![Kotlin Android Channel Example](https://camo.githubusercontent.com/536c90a2b28c8a356a9054bcf23621fadf75e7074e4a0458048a62835230023c/68747470733a2f2f692e696d6775722e636f6d2f447442364344482e6a7067)

![Kotlin Android Channel Example](https://camo.githubusercontent.com/8138a3e8a1155ceb14acae5973e22c7409da1954fec3fa05c5715a68951102d2/68747470733a2f2f692e696d6775722e636f6d2f727a316865614f2e6a7067)

### Step 1: Create Project

Start by creating an empty `Android Studio` project.

### Step 2: Dependencies

In your `app/build.gradle` add the following dependencies:

```groovy
    // coroutines
    implementation 'org.jetbrains.kotlinx:kotlinx-coroutines-core:1.4.1'
    implementation 'org.jetbrains.kotlinx:kotlinx-coroutines-android:1.4.1'

    // viewmodel
    implementation "androidx.lifecycle:lifecycle-viewmodel-ktx:2.2.0"

    // lifecycle
    implementation "androidx.lifecycle:lifecycle-runtime-ktx:2.2.0"

    // activity ktx for viewmodel
    implementation "androidx.activity:activity-ktx:1.1.0"
```

### Step 3: Enable Java8 and ViewBinding

In the same `app/build.gradle` enable Java8 and Viewbinding as follows inside the `android{}` closure:

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

### Step 4: Design Layout

Place a MaterialButton inside your `activity_main.xml` as follows:

```xml
<?xml version="1.0" encoding="utf-8"?>
<androidx.coordinatorlayout.widget.CoordinatorLayout xmlns:android="http://schemas.android.com/apk/res/android"
    xmlns:app="http://schemas.android.com/apk/res-auto"
    xmlns:tools="http://schemas.android.com/tools"
    android:layout_width="match_parent"
    android:id="@+id/parent_layout"
    android:layout_height="match_parent"
    tools:context=".MainActivity">

    <com.google.android.material.button.MaterialButton
        android:id="@+id/show_b"
        android:layout_width="wrap_content"
        android:layout_height="wrap_content"
        android:layout_gravity="center"
        android:text="@string/show_snackbar"
        app:elevation="10dp" />
</androidx.coordinatorlayout.widget.CoordinatorLayout>
```

### Step 5: Create ViewModel

Create the `MainViewModel.kt` and add the following imports:

```kotlin
import android.content.res.Resources
import androidx.lifecycle.ViewModel
import androidx.lifecycle.viewModelScope
import kotlinx.coroutines.channels.Channel
import kotlinx.coroutines.flow.receiveAsFlow
import kotlinx.coroutines.launch
```

Extend the `ViewModel` class:

```kotlin
class MainViewModel : ViewModel() {
```

Create a private event channel:

```kotlin
    private val eventChannel = Channel<MainEvent> { }
```

and event an event flow:

```kotlin
    val eventFlow = eventChannel.receiveAsFlow()
```

Trigger a fake call:

```kotlin
    fun triggerEvent(res: Resources) = viewModelScope.launch {
        eventChannel.send(MainEvent.ErrorEvent(res.getString(R.string.error)))
    }
```

Here is the full code:

**MainViewModel.kt**

```kotlin
import android.content.res.Resources
import androidx.lifecycle.ViewModel
import androidx.lifecycle.viewModelScope
import kotlinx.coroutines.channels.Channel
import kotlinx.coroutines.flow.receiveAsFlow
import kotlinx.coroutines.launch

class MainViewModel : ViewModel() {

    // create channel ! do not expose to fragment or activity
    private val eventChannel = Channel<MainEvent> { }

    // so receive it as flow
    val eventFlow = eventChannel.receiveAsFlow()

    // fake call
    fun triggerEvent(res: Resources) = viewModelScope.launch {
        eventChannel.send(MainEvent.ErrorEvent(res.getString(R.string.error)))
    }

    sealed class MainEvent {
        data class ErrorEvent(val message: String) : MainEvent()
    }
}
```

### Step 5: MainActivity

In the MainActivity, when the MaterialButton is clicked we will trigger the simulated call. Here is the full code:

**MainActivity.kt**

```kotlin
import android.content.res.Resources
import androidx.lifecycle.ViewModel
import androidx.lifecycle.viewModelScope
import kotlinx.coroutines.channels.Channel
import kotlinx.coroutines.flow.receiveAsFlow
import kotlinx.coroutines.launch

class MainViewModel : ViewModel() {

    // create channel ! do not expose to fragment or activity
    private val eventChannel = Channel<MainEvent> { }

    // so receive it as flow
    val eventFlow = eventChannel.receiveAsFlow()

    // fake call
    fun triggerEvent(res: Resources) = viewModelScope.launch {
        eventChannel.send(MainEvent.ErrorEvent(res.getString(R.string.error)))
    }

    sealed class MainEvent {
        data class ErrorEvent(val message: String) : MainEvent()
    }
}
```

### Run

Copy the code or download it in the link below, build and run.

### Reference

Here are the reference links:

| Number | Link |
| --- | --- |
| 1. | [Download](https://github.com/raheemadamboev/channel-app/archive/refs/heads/master.zip) Example |
| 2. | [Follow](https://github.com/raheemadamboev/) code author |
