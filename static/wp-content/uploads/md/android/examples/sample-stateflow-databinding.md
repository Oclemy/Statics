# Stateflow + DataBinding  Example


Learn android coroutines StateFlow alongside DataBinding in step by step example project. The example is written in Kotlin.

This example will comprise the following files:

- `AppBindingComponent.kt`
- `AppViewBinding.kt`
- `AppViewBindingImpl.kt`
- `MainActivity.kt`
- `MainViewModel.kt`

### Step 1: Create Project

1. Open your `AndroidStudio` IDE.
2. Go to `File-->New-->Project` to create a new project.

### Step 2: Add Dependencies

In your `app/build.gradle` add dependencies as shown below:

Enable DataBinding as shown below, inside the `android{` closure:

```groovy
android {
   //...

    buildFeatures {
        dataBinding true
    }
```

We will also enable Java8:

```groovy
    compileOptions {
        sourceCompatibility JavaVersion.VERSION_1_8
        targetCompatibility JavaVersion.VERSION_1_8
    }

    kotlinOptions {
        jvmTarget = '1.8'
        freeCompilerArgs += "-Xuse-experimental=kotlinx.coroutines.ExperimentalCoroutinesApi"
    }
}
```

Make sure you have `kotlinx-coroutines-android` declared as one of your dependencies:

```groovy
dependencies {

   //..
    implementation "androidx.lifecycle:lifecycle-viewmodel-ktx:2.3.0-alpha05"
    implementation "androidx.lifecycle:lifecycle-livedata-ktx:2.3.0-alpha05"

    implementation 'org.jetbrains.kotlinx:kotlinx-coroutines-android:1.3.7'
}
```

### Step 3: Design Layouts


***(a). `activity_main.xml`**

Create a file named `activity_main.xml` and design it as follows:

```xml
<?xml version="1.0" encoding="utf-8"?>
<layout xmlns:android="http://schemas.android.com/apk/res/android"
    xmlns:app="http://schemas.android.com/apk/res-auto"
    xmlns:tools="http://schemas.android.com/tools">

    <data>

        <variable
            name="viewModel"
            type="com.star_zero.stateflow.databinding.MainViewModel" />
    </data>

    <androidx.constraintlayout.widget.ConstraintLayout
        android:layout_width="match_parent"
        android:layout_height="match_parent"
        tools:context=".MainActivity">

        <Button
            android:id="@+id/button"
            android:layout_width="wrap_content"
            android:layout_height="wrap_content"
            android:layout_marginStart="16dp"
            android:layout_marginTop="16dp"
            android:layout_marginEnd="16dp"
            android:onClick="@{() -> viewModel.onClickButton()}"
            android:text="TEST"
            app:layout_constraintEnd_toEndOf="parent"
            app:layout_constraintStart_toStartOf="parent"
            app:layout_constraintTop_toTopOf="parent" />

        <TextView
            style="@style/TextAppearance.MaterialComponents.Body1"
            android:layout_width="wrap_content"
            android:layout_height="wrap_content"
            android:layout_marginStart="16dp"
            android:layout_marginTop="16dp"
            android:layout_marginEnd="16dp"
            app:layout_constraintLeft_toLeftOf="parent"
            app:layout_constraintRight_toRightOf="parent"
            app:layout_constraintTop_toBottomOf="@+id/button"
            app:textStateFlow="@{viewModel.text}"
            tools:text="Hello World!" />

    </androidx.constraintlayout.widget.ConstraintLayout>
</layout>
```

### Step 4: Write Code

Write Code as follows:

**(a). `AppBindingComponent.kt`**

Create a file named `AppBindingComponent.kt`


Here is the full code

```kotlin
package com.star_zero.stateflow.databinding

import androidx.databinding.DataBindingComponent
import androidx.lifecycle.LifecycleCoroutineScope

class AppBindingComponent(private val scope: LifecycleCoroutineScope) : DataBindingComponent {
    override fun getAppViewBinding(): AppViewBinding {
        return AppViewBindingImpl(scope)
    }
}
```

**(b). `AppViewBinding.kt`**

Create a file named `AppViewBinding.kt`


Here is the full code

```kotlin
package com.star_zero.stateflow.databinding

import android.widget.TextView
import androidx.databinding.BindingAdapter
import kotlinx.coroutines.flow.StateFlow

interface AppViewBinding {
    @BindingAdapter("textStateFlow")
    fun setText(view: TextView, stateFlow: StateFlow<String>)
}
```

**(c). `AppViewBindingImpl.kt`**

Create a file named `AppViewBindingImpl.kt`


Here is the full code

```kotlin
package com.star_zero.stateflow.databinding

import android.widget.TextView
import androidx.lifecycle.LifecycleCoroutineScope
import kotlinx.coroutines.flow.StateFlow
import kotlinx.coroutines.flow.collect

class AppViewBindingImpl(private val scope: LifecycleCoroutineScope) : AppViewBinding {
    override fun setText(view: TextView, stateFlow: StateFlow<String>) {
        scope.launchWhenStarted {
            stateFlow.collect {
                view.text = it
            }
        }
    }
}
```

**(d). `MainActivity.kt`**

Create a file named `MainActivity.kt`


Here is the full code

```kotlin
package com.star_zero.stateflow.databinding

import android.os.Bundle
import androidx.activity.viewModels
import androidx.appcompat.app.AppCompatActivity
import androidx.databinding.DataBindingUtil
import androidx.lifecycle.lifecycleScope
import com.star_zero.stateflow.databinding.databinding.ActivityMainBinding

class MainActivity : AppCompatActivity() {

    private val viewModel by viewModels<MainViewModel>()

    private lateinit var binding: ActivityMainBinding

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        binding = DataBindingUtil.setContentView(
            this,
            R.layout.activity_main,
            AppBindingComponent(lifecycleScope)
        )

        binding.viewModel = viewModel
    }
}
```

**(e). `MainViewModel.kt`**

Create a file named `MainViewModel.kt`


Here is the full code

```kotlin
package com.star_zero.stateflow.databinding

import androidx.lifecycle.ViewModel
import kotlinx.coroutines.flow.MutableStateFlow
import kotlinx.coroutines.flow.StateFlow

class MainViewModel : ViewModel() {

    private val _text = MutableStateFlow("Hello World!")
    val text: StateFlow<String> = _text

    fun onClickButton() {
        _text.value = "Hello StateFlow: ${System.currentTimeMillis()}"
    }
}
```

### Run

Simply copy the source code into your Android Project,Build and Run. 

### Reference

> Download code [here](https://github.com/STAR-ZERO/sample-stateflow-databinding/archive/refs/heads/master.zip).
> Follow code author [here](https://github.com/STAR-ZERO/).


