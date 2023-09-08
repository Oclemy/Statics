# Firebase Flow Example

>  A sample android application which demonstrates use of Kotlin Coroutines Flow with Firebase Cloud Firestore..

A sample android application which demonstrates use of Kotlin Coroutines Flow with Firebase Cloud Firestore.

Follow these steps:

#### Step 1. Dependencies

We need to add some dependencies in our `app/build.gradle` file as shown below:

**(a). `build.gradle`**

> Our app-level `build.gradle`.

We Prepare our dependencies as shown below. You may use later versions.

At the top of our `app/build.gradle` we will apply the following 4 plugins:

1. Our `com.android.application` plugin.
2. Our `kotlin-android` plugin.
3. Our `kotlin-android-extensions` plugin.
4. Our `com.google.gms.google-services` plugin.

We then declare our app dependencies under the `dependencies` closure. We will need the following 9 dependencies:

1. Our `Kotlin-stdlib-jdk7` library.
2. Our `Kotlinx-coroutines-core` Kotlin library.
3. Our `Kotlinx-coroutines-android` Kotlin library.
4. Our `Kotlinx-coroutines-play-services` Kotlin library.
5. Our `Appcompat` library.
6. Our `Core-ktx` library.
7. Our `Constraintlayout` library.
8. Our `Lifecycle-viewmodel-ktx` library.
9. Our `Firebase-firestore-ktx` library.

Here is our full `app/build.gradle`:

```groovy
apply plugin: 'com.android.application'
apply plugin: 'kotlin-android'
apply plugin: 'kotlin-android-extensions'
apply plugin: 'com.google.gms.google-services'

android {
    compileSdkVersion 29
    buildToolsVersion "29.0.3"

    defaultConfig {
        applicationId "dev.shreyaspatil.firebase.coroutines"
        minSdkVersion 21
        targetSdkVersion 29
        versionCode 1
        versionName "1.0"

        testInstrumentationRunner "androidx.test.runner.AndroidJUnitRunner"
    }

    buildTypes {
        release {
            minifyEnabled false
            proguardFiles getDefaultProguardFile('proguard-android-optimize.txt'), 'proguard-rules.pro'
        }
    }

    buildFeatures {
        viewBinding {
            enabled = true
        }
    }
}

dependencies {
    implementation fileTree(dir: 'libs', include: ['*.jar'])

    // Kotlin
    implementation "org.jetbrains.kotlin:kotlin-stdlib-jdk7:$kotlin_version"

    // Kotlin Coroutines
    implementation "org.jetbrains.kotlinx:kotlinx-coroutines-core:1.3.5"
    implementation "org.jetbrains.kotlinx:kotlinx-coroutines-android:1.3.5"
    implementation 'org.jetbrains.kotlinx:kotlinx-coroutines-play-services:1.3.5'

    // Android
    implementation 'androidx.appcompat:appcompat:1.1.0'
    implementation 'androidx.core:core-ktx:1.2.0'
    implementation 'androidx.constraintlayout:constraintlayout:1.1.3'

    // ViewModel
    implementation "androidx.lifecycle:lifecycle-viewmodel-ktx:2.2.0"

    // Firebase Cloud Firestore (Kotlin)
    implementation 'com.google.firebase:firebase-firestore-ktx:21.4.2'

    testImplementation 'junit:junit:4.12'
    androidTestImplementation 'androidx.test.ext:junit:1.1.1'
    androidTestImplementation 'androidx.test.espresso:espresso-core:3.2.0'
}

```
#### Step 2. Create Firebase App

You will need to create or setup a Firebase app first.:

- Setup project on Firebase Console.
- Download `google-services.json` and put it in /app directory.

[This link](https://firebase.google.com/docs/android/setup) explains how to do so.

#### Step 3. Our Android Manifest

We will need to look at our `AndroidManifest.xml`.


**(a). `AndroidManifest.xml`**


> Our `AndroidManifest` file.

```xml
<?xml version="1.0" encoding="utf-8"?>
<manifest xmlns:android="http://schemas.android.com/apk/res/android"
    package="dev.shreyaspatil.firebase.coroutines">

    <application
        android:allowBackup="true"
        android:icon="@mipmap/ic_launcher"
        android:label="@string/app_name"
        android:roundIcon="@mipmap/ic_launcher_round"
        android:supportsRtl="true"
        android:theme="@style/AppTheme">
        <activity android:name=".ui.main.MainActivity">
            <intent-filter>
                <action android:name="android.intent.action.MAIN" />

                <category android:name="android.intent.category.LAUNCHER" />
            </intent-filter>
        </activity>
    </application>

</manifest>
```
#### Step 4. Design Layouts

In Android we design our UI interfaces using XML. So let's create the following layouts:


**(a). `activity_main.xml`**


> Our `activity_main` layout.

Inside your `/res/layout/` directory create an xml layout file named `activity_main.xml`.

Design your XML layout using the following 4 UI widgets and ViewGroups:

1. `androidx.constraintlayout.widget.ConstraintLayout`
2. `TextView`
3. `Button`
4. `EditText`

```xml
<?xml version="1.0" encoding="utf-8"?>
<androidx.constraintlayout.widget.ConstraintLayout xmlns:android="http://schemas.android.com/apk/res/android"
    xmlns:app="http://schemas.android.com/apk/res-auto"
    xmlns:tools="http://schemas.android.com/tools"
    android:layout_width="match_parent"
    android:layout_height="match_parent"
    tools:context=".ui.main.MainActivity">

    <TextView
        android:id="@+id/text_post_content"
        android:layout_width="0dp"
        android:layout_height="0dp"
        android:layout_marginStart="16dp"
        android:layout_marginTop="8dp"
        android:layout_marginEnd="16dp"
        android:layout_marginBottom="8dp"
        app:layout_constraintBottom_toTopOf="@+id/field_post_content"
        app:layout_constraintLeft_toLeftOf="parent"
        app:layout_constraintRight_toRightOf="parent"
        app:layout_constraintTop_toBottomOf="@+id/button_load"
        app:layout_constraintVertical_bias="0.0" />

    <Button
        android:id="@+id/button_load"
        android:layout_width="wrap_content"
        android:layout_height="wrap_content"
        android:text="@string/text_load_posts"
        app:layout_constraintEnd_toEndOf="parent"
        app:layout_constraintStart_toStartOf="parent"
        app:layout_constraintTop_toTopOf="parent" />

    <EditText
        android:id="@+id/field_post_content"
        android:layout_width="0dp"
        android:layout_height="wrap_content"
        android:layout_marginStart="8dp"
        android:layout_marginBottom="8dp"
        android:ems="10"
        android:hint="@string/text_post_content"
        android:inputType="textPersonName"
        app:layout_constraintBottom_toBottomOf="parent"
        app:layout_constraintEnd_toStartOf="@+id/button_add"
        app:layout_constraintHorizontal_bias="0.06"
        app:layout_constraintStart_toStartOf="parent"
        tools:ignore="Autofill" />

    <Button
        android:id="@+id/button_add"
        android:layout_width="wrap_content"
        android:layout_height="wrap_content"
        android:layout_marginEnd="8dp"
        android:layout_marginBottom="8dp"
        android:text="@string/text_post"
        app:layout_constraintBottom_toBottomOf="parent"
        app:layout_constraintEnd_toEndOf="parent" />

</androidx.constraintlayout.widget.ConstraintLayout>
```
#### Step 5. Write Code

Finally we need to write our code as follows:


**(a). `Post.kt`**

> Our `Post` class.

Create a Kotlin file named `Post.kt`.


Here is the full code:

```kotlin
package replace_with_your_package_name

data class Post(
    val postContent: String? = null,
    val postAuthor: String? = null
)


```

**(b). `State.kt`**

> Our `State` class.

Create a Kotlin file named `State.kt`.

Here is the full code:

```kotlin
package replace_with_your_package_name

sealed class State<T> {
    class Loading<T> : State<T>()
    data class Success<T>(val data: T) : State<T>()
    data class Failed<T>(val message: String) : State<T>()

    companion object {
        fun <T> loading() = Loading<T>()
        fun <T> success(data: T) = Success(data)
        fun <T> failed(message: String) = Failed<T>(message)
    }
}

```

**(c). `Constants.kt`**

> Our `Constants` class.

Create a Kotlin file named `Constants.kt`.

Here is the full code:

```kotlin
package replace_with_your_package_name

object Constants {
    const val COLLECTION_POST = "posts"
}

```

**(d). `PostsRepository.kt`**

> Our `PostsRepository` class.

Create a Kotlin file named `PostsRepository.kt`.

We will then add imports from android SDK and other packages. Here are some of the imports we will use in this class:

1. `Dispatchers` from the `kotlinx.coroutines` package.
2. `ExperimentalCoroutinesApi` from the `kotlinx.coroutines` package.
3. `catch` from the `kotlinx.coroutines.flow` package.
4. `flow` from the `kotlinx.coroutines.flow` package.
5. `flowOn` from the `kotlinx.coroutines.flow` package.
6. `await` from the `kotlinx.coroutines.tasks` package.

We will be creating the following methods:

1. `getAllPosts() = flow<State<List<Post>>> `.
2. `addPost(parameter)`.


Here is the full code:

```kotlin
package replace_with_your_package_name

import com.google.firebase.firestore.DocumentReference
import com.google.firebase.firestore.FirebaseFirestore
import dev.shreyaspatil.firebase.coroutines.Constants
import dev.shreyaspatil.firebase.coroutines.State
import dev.shreyaspatil.firebase.coroutines.model.Post
import kotlinx.coroutines.Dispatchers
import kotlinx.coroutines.ExperimentalCoroutinesApi
import kotlinx.coroutines.flow.catch
import kotlinx.coroutines.flow.flow
import kotlinx.coroutines.flow.flowOn
import kotlinx.coroutines.tasks.await

/**
 * Repository for the data of posts.
 * This will be a single source of data throughout the application.
 */
@ExperimentalCoroutinesApi
class PostsRepository {

    private val mPostsCollection =
        FirebaseFirestore.getInstance().collection(Constants.COLLECTION_POST)

    /**
     * Returns Flow of [State] which retrieves all posts from cloud firestore collection.
     */
    fun getAllPosts() = flow<State<List<Post>>> {

        // Emit loading state
        emit(State.loading())

        val snapshot = mPostsCollection.get().await()
        val posts = snapshot.toObjects(Post::class.java)

        // Emit success state with data
        emit(State.success(posts))

    }.catch {
        // If exception is thrown, emit failed state along with message.
        emit(State.failed(it.message.toString()))
    }.flowOn(Dispatchers.IO)

    /**
     * Adds post [post] into the cloud firestore collection.
     * @return The Flow of [State] which will store state of current action.
     */
    fun addPost(post: Post) = flow<State<DocumentReference>> {

        // Emit loading state
        emit(State.loading())

        val postRef = mPostsCollection.add(post).await()

        // Emit success state with post reference
        emit(State.success(postRef))

    }.catch {
        // If exception is thrown, emit failed state along with message.
        emit(State.failed(it.message.toString()))
    }.flowOn(Dispatchers.IO)
}


```

**(e). `MainViewModelFactory.kt`**

> Our `MainViewModelFactory` class.

Create a Kotlin file named `MainViewModelFactory.kt`.

We will then add imports from android SDK and other packages. Here are some of the imports we will use in this class:

1. `ViewModel` from the `androidx.lifecycle` package.
2. `ViewModelProvider` from the `androidx.lifecycle` package.
3. `ExperimentalCoroutinesApi` from the `kotlinx.coroutines` package.

Next create a class that derives from `ViewModelProvider.Factory` and add its contents as follows:

We will be overriding the following functions: 

1. `<T : ViewModel?> create(modelClass: Class<T>): T `.

Here is the full code:

```kotlin
package replace_with_your_package_name

import androidx.lifecycle.ViewModel
import androidx.lifecycle.ViewModelProvider
import dev.shreyaspatil.firebase.coroutines.repository.PostsRepository
import kotlinx.coroutines.ExperimentalCoroutinesApi

@ExperimentalCoroutinesApi
class MainViewModelFactory : ViewModelProvider.Factory {

    override fun <T : ViewModel?> create(modelClass: Class<T>): T {
        return modelClass.getConstructor(PostsRepository::class.java)
            .newInstance(PostsRepository())
    }
}

```

**(f). `MainViewModel.kt`**

> Our `MainViewModel` class.

Create a Kotlin file named `MainViewModel.kt`.

We will then add imports from android SDK and other packages. Here are some of the imports we will use in this class:

1. `ViewModel` from the `androidx.lifecycle` package.
2. `ExperimentalCoroutinesApi` from the `kotlinx.coroutines` package.

Next create a class that derives from `ViewModel` and add its contents as follows:

We will be creating the following methods:



Here is the full code:

```kotlin
package replace_with_your_package_name

import androidx.lifecycle.ViewModel
import dev.shreyaspatil.firebase.coroutines.model.Post
import dev.shreyaspatil.firebase.coroutines.repository.PostsRepository
import kotlinx.coroutines.ExperimentalCoroutinesApi

@ExperimentalCoroutinesApi
class MainViewModel(private val repository: PostsRepository) : ViewModel() {

    fun getAllPosts() = repository.getAllPosts()

    fun addPost(post: Post) = repository.addPost(post)
}

```

**(g). `MainActivity.kt`**

> Our `MainActivity` class.

Create a Kotlin file named `MainActivity.kt`.

We will then add imports from android SDK and other packages. Here are some of the imports we will use in this class:

1. `Bundle` from the `android.os` package.
2. `View` from the `android.view` package.
3. `Toast` from the `android.widget` package.
4. `AppCompatActivity` from the `androidx.appcompat.app` package.
5. `ViewModelProvider` from the `androidx.lifecycle` package.
6. `*` from the `kotlinx.coroutines` package.
7. `collect` from the `kotlinx.coroutines.flow` package.

Next create a class that derives from `AppCompatActivity` and add its contents as follows:

We will be overriding the following functions: 

1. `onCreate(savedInstanceState: Bundle?) `.
2. `onClick(v: View?) `.

We will be creating the following methods:

1. `loadPosts() `.
2. `addPost(parameter)` - This function will take a `Post` object as a parameter.
3. `showToast(parameter)` - Our function will take a `String` object as a parameter.

**(a). Our `showToast()` function**

Write the `showToast()` function as follows:

```kotlin
    private fun showToast(message: String) {
        Toast.makeText(applicationContext, message, Toast.LENGTH_SHORT).show()
    }
```

**(b). Our `addPost()` function**

Write the `addPost()` function as follows:

```kotlin
    private suspend fun addPost(post: Post) {
        viewModel.addPost(post).collect { state ->
            when (state) {
                is State.Loading -> {
                    showToast("Loading")
                    binding.buttonAdd.isEnabled = false
                }

                is State.Success -> {
                    showToast("Posted")
                    binding.fieldPostContent.setText("")
                    binding.buttonAdd.isEnabled = true
                }

                is State.Failed -> {
                    showToast("Failed! ${state.message}")
                    binding.buttonAdd.isEnabled = true
                }
            }
        }
    }
```

**(c). Our `loadPosts()` function**

Write the `loadPosts()` function as follows:

```kotlin
    private suspend fun loadPosts() {
        viewModel.getAllPosts().collect { state ->
            when (state) {
                is State.Loading -> {
                    showToast("Loading")
                }

                is State.Success -> {
                    val postText = state.data.joinToString("\n") {
                        "${it.postContent} ~ ${it.postAuthor}"
                    }

                    binding.textPostContent.text = postText
                }

                is State.Failed -> showToast("Failed! ${state.message}")
            }
        }
    }
```


Here is the full code:

```kotlin
package replace_with_your_package_name

import android.os.Bundle
import android.view.View
import android.widget.Toast
import androidx.appcompat.app.AppCompatActivity
import androidx.lifecycle.ViewModelProvider
import dev.shreyaspatil.firebase.coroutines.State
import dev.shreyaspatil.firebase.coroutines.databinding.ActivityMainBinding
import dev.shreyaspatil.firebase.coroutines.model.Post
import kotlinx.coroutines.*
import kotlinx.coroutines.flow.collect

@InternalCoroutinesApi
@ExperimentalCoroutinesApi
class MainActivity : AppCompatActivity(), View.OnClickListener {

    private lateinit var viewModel: MainViewModel

    private lateinit var binding: ActivityMainBinding

    // Coroutine Scope
    private val uiScope = CoroutineScope(Dispatchers.Main)

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)

        binding = ActivityMainBinding.inflate(layoutInflater)
        setContentView(binding.root)

        viewModel = ViewModelProvider(this, MainViewModelFactory())
            .get(MainViewModel::class.java)

        binding.buttonLoad.setOnClickListener(this)
        binding.buttonAdd.setOnClickListener(this)
    }

    private suspend fun loadPosts() {
        viewModel.getAllPosts().collect { state ->
            when (state) {
                is State.Loading -> {
                    showToast("Loading")
                }

                is State.Success -> {
                    val postText = state.data.joinToString("\n") {
                        "${it.postContent} ~ ${it.postAuthor}"
                    }

                    binding.textPostContent.text = postText
                }

                is State.Failed -> showToast("Failed! ${state.message}")
            }
        }
    }

    private suspend fun addPost(post: Post) {
        viewModel.addPost(post).collect { state ->
            when (state) {
                is State.Loading -> {
                    showToast("Loading")
                    binding.buttonAdd.isEnabled = false
                }

                is State.Success -> {
                    showToast("Posted")
                    binding.fieldPostContent.setText("")
                    binding.buttonAdd.isEnabled = true
                }

                is State.Failed -> {
                    showToast("Failed! ${state.message}")
                    binding.buttonAdd.isEnabled = true
                }
            }
        }
    }

    override fun onClick(v: View?) {
        when (v!!.id) {
            binding.buttonLoad.id -> {
                uiScope.launch {
                    loadPosts()
                }
            }

            binding.buttonAdd.id -> {
                uiScope.launch {
                    addPost(
                        Post(
                            postContent = binding.fieldPostContent.text.toString(),
                            postAuthor = "Anonymous"
                        )
                    )
                }
            }
        }
    }

    private fun showToast(message: String) {
        Toast.makeText(applicationContext, message, Toast.LENGTH_SHORT).show()
    }
}


```

### Reference

Download the code below:

|No.|Link|
|--|---|
|1.|[Download Full Code](https://github.com/PatilShreyas/FirebaseFlowExample/archive/refs/heads/master.zip)|
|2.|Read more [here](https://github.com/PatilShreyas/FirebaseFlowExample).|
|3.|Follow code author [here](https://github.com/PatilShreyas).|
