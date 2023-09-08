# StateFlow Examples


This tutorial will help you learn about StateFlow usage in Android using simple step by step isolated examples.


### What is Stateflow?

> [`StateFlow`](https://kotlin.github.io/kotlinx.coroutines/kotlinx-coroutines-core/kotlinx.coroutines.flow/-state-flow/) is a state-holder observable flow that emits the current and new state updates to its collectors.

In Android, `StateFlow` is a great fit for classes that need to maintain an observable mutable state.

For example a `StateFlow` can be exposed from the `YourViewModel` so that the `View` can listen for UI state updates and inherently make the screen state survive configuration changes.

Here is code usage example:

```kotlin
class LatestNewsViewModel(
    private val newsRepository: NewsRepository
) : ViewModel() {

    // Backing property to avoid state updates from other classes
    private val _uiState = MutableStateFlow(LatestNewsUiState.Success(emptyList()))
    // The UI collects from this StateFlow to get its state updates
    val uiState: StateFlow<LatestNewsUiState> = _uiState

    init {
        viewModelScope.launch {
            newsRepository.favoriteLatestNews
                // Update View with the latest favorite news
                // Writes to the value property of MutableStateFlow,
                // adding a new element to the flow and updating all
                // of its collectors
                .collect { favoriteNews ->
                    _uiState.value = LatestNewsUiState.Success(favoriteNews)
                }
        }
    }
}

// Represents different states for the LatestNews screen
sealed class LatestNewsUiState {
    data class Success(news: List<ArticleHeadline>): LatestNewsUiState()
    data class Error(exception: Throwable): LatestNewsUiState()
}
```

Let us now look at some full examples.

## Example 1: Kotlin Android Simple Stateflow Example

A simple isolated example to give you an idea about how to use Stateflow in a full app.

The app also helps you learn the following:

- Viewmodel
- Kotlin Coroutines
- StateFlow
- Viewbinding

### Step 1: Create Project

Start by creating an empty `Android Studio` project.

### Step 2: Dependencies

Add the following dependencies in your `app/build.gradle`:

```groovy
    // architectural components
    implementation "androidx.lifecycle:lifecycle-viewmodel-ktx:2.2.0"

    // coroutines
    implementation 'org.jetbrains.kotlinx:kotlinx-coroutines-core:1.4.1'
    implementation 'org.jetbrains.kotlinx:kotlinx-coroutines-android:1.4.1'

    // activity ktx for viewmodel
    implementation "androidx.activity:activity-ktx:1.1.0"

    // coroutine lifecycle scopes
    implementation "androidx.lifecycle:lifecycle-runtime-ktx:2.2.0"
```

### Step 3: Enable Java8 and ViewBinding

In the same `app/build.gradle` go ahead and enable Java8 and ViewBinding inside the `android{}`closure:

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

Design a MainActivity layout with a bunch of edittexts and a button:

**activity_main.xml**

```xml
<?xml version="1.0" encoding="utf-8"?>
<androidx.coordinatorlayout.widget.CoordinatorLayout xmlns:android="http://schemas.android.com/apk/res/android"
    xmlns:app="http://schemas.android.com/apk/res-auto"
    xmlns:tools="http://schemas.android.com/tools"
    android:id="@+id/parent_layout"
    android:layout_width="match_parent"
    android:layout_height="match_parent"
    tools:context=".MainActivity">

    <LinearLayout
        android:layout_width="match_parent"
        android:layout_height="match_parent"
        android:gravity="center"
        android:orientation="vertical">

        <com.google.android.material.textfield.TextInputLayout
            style="@style/Widget.MaterialComponents.TextInputLayout.FilledBox"
            android:layout_width="match_parent"
            android:layout_height="wrap_content"
            android:layout_marginStart="30dp"
            android:layout_marginEnd="30dp"
            android:hint="@string/login">

            <com.google.android.material.textfield.TextInputEditText
                android:id="@+id/login_field"
                android:layout_width="match_parent"
                android:layout_height="match_parent" />
        </com.google.android.material.textfield.TextInputLayout>

        <com.google.android.material.textfield.TextInputLayout
            style="@style/Widget.MaterialComponents.TextInputLayout.FilledBox"
            android:layout_width="match_parent"
            android:layout_height="wrap_content"
            android:layout_marginStart="30dp"
            android:layout_marginTop="10dp"
            android:layout_marginEnd="30dp"
            android:hint="@string/password">

            <com.google.android.material.textfield.TextInputEditText
                android:id="@+id/password_field"
                android:layout_width="match_parent"
                android:layout_height="match_parent" />
        </com.google.android.material.textfield.TextInputLayout>

        <com.google.android.material.button.MaterialButton
            android:id="@+id/login_b"
            android:layout_width="match_parent"
            android:layout_height="wrap_content"
            android:layout_marginStart="30dp"
            android:layout_marginTop="10dp"
            android:layout_marginEnd="30dp"
            android:text="@string/login"
            app:elevation="10dp" />
    </LinearLayout>

    <ProgressBar
        android:id="@+id/progress_bar"
        android:layout_width="wrap_content"
        android:layout_height="wrap_content"
        android:layout_gravity="center"
        android:visibility="gone" />
</androidx.coordinatorlayout.widget.CoordinatorLayout>
```

### Step 5: Create a ViewModel

Create a ViewModel where we will use Stateflow to emit updates to UI:

Create a `MainViewModel.kt` and then Start by adding imports:

```kotlin
import androidx.lifecycle.ViewModel
import androidx.lifecycle.viewModelScope
import kotlinx.coroutines.delay
import kotlinx.coroutines.flow.MutableStateFlow
import kotlinx.coroutines.flow.StateFlow
import kotlinx.coroutines.launch
```

Extend the `androidx.lifecycle.ViewModel` class:

```kotlin
class MainViewModel : ViewModel() {
```

Define two instance fields: a MutableStateFlow and StateFlow objects:

```kotlin
    private val _loginState = MutableStateFlow<LoginUIState>(LoginUIState.Empty)
    val loginUIState: StateFlow<LoginUIState> = _loginState
```

Now cretae a function to simulate login process:

```kotlin
    fun login(username: String, password: String) = viewModelScope.launch {
        _loginState.value = LoginUIState.Loading
        // fake network request time
        delay(2000L)
        if (username == "raheem" && password == "android") {
            _loginState.value = LoginUIState.Success
        } else {
            _loginState.value = LoginUIState.Error("Incorrect password")
        }
    }
```

Create a sealed class to hold the login ui states:

```kotlin
    sealed class LoginUIState {
        object Success : LoginUIState()
        data class Error(val message: String) : LoginUIState()
        object Loading : LoginUIState()
        object Empty : LoginUIState()
    }
}
```

Here is the full code:

**MainViewModel.kt**

```kotlin

import androidx.lifecycle.ViewModel
import androidx.lifecycle.viewModelScope
import kotlinx.coroutines.delay
import kotlinx.coroutines.flow.MutableStateFlow
import kotlinx.coroutines.flow.StateFlow
import kotlinx.coroutines.launch

class MainViewModel : ViewModel() {

    private val _loginState = MutableStateFlow<LoginUIState>(LoginUIState.Empty)
    val loginUIState: StateFlow<LoginUIState> = _loginState

    // simulate login process
    fun login(username: String, password: String) = viewModelScope.launch {
        _loginState.value = LoginUIState.Loading
        // fake network request time
        delay(2000L)
        if (username == "raheem" && password == "android") {
            _loginState.value = LoginUIState.Success
        } else {
            _loginState.value = LoginUIState.Error("Incorrect password")
        }
    }

    // login ui states
    sealed class LoginUIState {
        object Success : LoginUIState()
        data class Error(val message: String) : LoginUIState()
        object Loading : LoginUIState()
        object Empty : LoginUIState()
    }
}
```

### Step 6: Create MainActivity

Here's the full code for the `MainActivity.kt`:

```kotlin
import androidx.appcompat.app.AppCompatActivity
import android.os.Bundle
import android.view.View
import androidx.activity.viewModels
import androidx.lifecycle.lifecycleScope
import com.google.android.material.snackbar.Snackbar
import kotlinx.coroutines.flow.collect
import xyz.teamgravity.stateflow.databinding.ActivityMainBinding

class MainActivity : AppCompatActivity() {

    private lateinit var binding: ActivityMainBinding

    private val viewModel by viewModels<MainViewModel>()

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        binding = ActivityMainBinding.inflate(layoutInflater)
        setContentView(binding.root)

        binding.apply {

            // login button
            loginB.setOnClickListener {
                viewModel.login(loginField.text.toString().trim(), passwordField.text.toString().trim())
            }

            // collect data and respond
            lifecycleScope.launchWhenCreated {
                viewModel.loginUIState.collect {
                    when (it) {
                        is MainViewModel.LoginUIState.Loading -> {
                            progressBar.visibility = View.VISIBLE
                        }

                        is MainViewModel.LoginUIState.Success -> {
                            Snackbar.make(parentLayout, "Successfully logged in", Snackbar.LENGTH_SHORT).show()
                            progressBar.visibility = View.GONE
                        }

                        is MainViewModel.LoginUIState.Error -> {
                            Snackbar.make(parentLayout, it.message, Snackbar.LENGTH_SHORT).show()
                            progressBar.visibility = View.GONE
                        }

                        else -> Unit
                    }
                }
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
| 1. | [Download](https://github.com/raheemadamboev/state-flow-app/archive/refs/heads/master.zip) Example |
| 2. | [Follow](https://github.com/raheemadamboev/) code author |

[loop type=example taxonomy=post_tag term=Stateflow orderby=date order=asc]

## [loop-count]. [field title]

[content]

[Read Individually.]([field url])

* * *

[/loop]
