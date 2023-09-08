# Dagger2 Single Module Example


> A simple Dagger2 example involving a single module.

It is a simple application using Dagger2 `@Component`. It just defines a simple one `@Module`.

### Step 1: Install Dagger2

In your dependencies add `Dagger2` and `Timber2` among your dependencies:

```groovy
    implementation 'com.jakewharton.timber:timber:4.7.1'

    implementation 'com.google.dagger:dagger:2.21'
    kapt ' com.google.dagger: dagger-compiler: 2.21 '
```

### Step 2: Design Layout

Design your xml layout as follows:

**activity_main.xml**

```xml
<?xml version="1.0" encoding="utf-8"?>
<androidx.constraintlayout.widget.ConstraintLayout xmlns:android="http://schemas.android.com/apk/res/android"
    xmlns:app="http://schemas.android.com/apk/res-auto"
    xmlns:tools="http://schemas.android.com/tools"
    android:layout_width="match_parent"
    android:layout_height="match_parent"
    tools:context=".ui.MainActivity">

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

### Step 3: Initialize Timber

Timber is our Logging library. Initialize inside our `Application` class:

**App.kt**

```kotlin
package com.star_zero.sample.dagger_tutorial.step1

import android.app.Application
import timber.log.Timber

class App : Application() {

    override fun onCreate() {
        super.onCreate()
        Timber.plant(Timber.DebugTree())
    }
}

```

### Step 4: Create Repository classes

**(a). UserRepository.kt**

Create an `Interface` with one function that returns a `String`:

```kotlin
package com.star_zero.sample.dagger_tutorial.step1.data.repository

interface UserRepository {
    fun getName(): String
}

```

**(b). UserDataRepository.kt**

Implement the `UserRepository` aond override the `getName()` function:

```kotlin
package com.star_zero.sample.dagger_tutorial.step1.data.repository

class UserDataRepository(private val baseURL: String) : UserRepository {
    override fun getName(): String {
        return "Sample Name, baseURL=$baseURL"
    }
}

```

### Step 5: Create App Module and Component:


**(a). AppModule.kt**

```kotlin
package com.star_zero.sample.dagger_tutorial.step1.di

import com.star_zero.sample.dagger_tutorial.step1.data.repository.UserDataRepository
import com.star_zero.sample.dagger_tutorial.step1.data.repository.UserRepository
import dagger.Module
import dagger.Provides

@Module
class AppModule(private val baseURL: String) {
    // (It is recommended to use @BindsInstance explained in step5 rather than the constructor argument of Module.)

    @Provides
    fun provideUserRepository(): UserRepository {
        return UserDataRepository(baseURL)
    }
}

```

**(b). AppComponent.kt**

```kotlin
package com.star_zero.sample.dagger_tutorial.step1.di

import com.star_zero.sample.dagger_tutorial.step1.ui.MainActivity
import dagger.Component

@Component(
    modules = [
        AppModule::class
    ]
)
interface AppComponent {
    // Create a method with the class that has the field you want to inject as an argument
    fun inject(activity: MainActivity)
}

```

### Step 6: Create UI code

**(a). MainViewModel.kt**

```kotlin
package com.star_zero.sample.dagger_tutorial.step1.ui

import com.star_zero.sample.dagger_tutorial.step1.data.repository.UserRepository
import javax.inject.Inject

class MainViewModel @Inject constructor(
    private val userRepository: UserRepository
) {

    fun getName(): String {
        return userRepository.getName()
    }
}

```

**(b). MainActivity.kt**

```kotlin
package com.star_zero.sample.dagger_tutorial.step1.ui

import android.os.Bundle
import androidx.appcompat.app.AppCompatActivity
import com.star_zero.sample.dagger_tutorial.step1.R
import com.star_zero.sample.dagger_tutorial.step1.data.repository.UserRepository
import com.star_zero.sample.dagger_tutorial.step1.di.AppModule
import com.star_zero.sample.dagger_tutorial.step1.di.DaggerAppComponent
import timber.log.Timber
import javax.inject.Inject

class MainActivity : AppCompatActivity() {

    // Field injection
    @Inject
    lateinit var userRepository: UserRepository

    @Inject
    lateinit  var viewModel :  MainViewModel  // Since it is not an AAC ViewModel, you can create an instance normally.

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_main)
        Timber.d("onCreate")

        val appComponent = DaggerAppComponent.builder()
            .appModule ( AppModule ( " https://example.com " )) // If the Module has arguments, you need to create an instance and pass it.
            .build()
        appComponent.inject(this)

        Timber.d("userRepository.getName = ${userRepository.getName()}")
        Timber.d("viewModel.getName = ${viewModel.getName()}")
    }
}

```

### Reference

- Download full code [here](https://downgit.github.io/#/home?url=https://github.com/STAR-ZERO/dagger-tutorial/tree/master/step1).
- Follow code  author[here](https://github.com/STAR-ZERO/).
