# Firebase Performance Quickstart

A Firebase Performance example.

### Getting Started

- Add Firebase to your Android Project. [This link](https://firebase.google.com/docs/android/setup) explains how to do so.
- Run the sample on Android device or emulator.

### Result

Here is what will be created:

![Firebase Performance Tutorial](https://github.com/firebase/quickstart-android/raw/master/perf/app/src/screen.png)


#### Step 1. Dependencies

We need to add some dependencies in our `app/build.gradle` file as shown below:

**(a). `build.gradle`**

> Our app-level `build.gradle`.

We Prepare our dependencies as shown below. You may use later versions.

We will enable view binding by setting the `viewBinding` property to true.

We then declare our app dependencies under the `dependencies` closure. We will need the following 9 dependencies:

1. Our `Internal` library.
2. Our `Firebase-bom` library.
3. Our `Com.google.firebase` library.
4. Our `Material` library.
5. Our `Constraintlayout` library.
6. Our `Lifecycle-runtime-ktx` library.
7. Our `Glide` library.

Here is our full `app/build.gradle`:

```groovy
plugins {
    id 'com.android.application'
    id 'kotlin-android'
    id 'com.google.gms.google-services'
    id 'com.google.firebase.firebase-perf'
}

check.dependsOn 'assembleDebugAndroidTest'

android {
    compileSdkVersion 33
    defaultConfig {
        applicationId "com.google.firebase.quickstart.perfmon"
        minSdkVersion 19
        targetSdkVersion 33
        versionCode 1
        versionName "1.0"
        multiDexEnabled true
        testInstrumentationRunner "androidx.test.runner.AndroidJUnitRunner"
    }
    buildTypes {
        release {
            minifyEnabled false
            proguardFiles getDefaultProguardFile('proguard-android.txt'), 'proguard-rules.pro'
        }
        debug {
            FirebasePerformance {
                // Set this flag to 'false' to disable @AddTrace annotation processing and
                // automatic HTTP/S network request monitoring
                // for a specific build variant at compile time.
                instrumentationEnabled true
            }
        }
    }
    buildFeatures {
        viewBinding = true
    }
}

dependencies {
    implementation project(":internal:lintchecks")
    implementation project(":internal:chooserx")

    // Import the Firebase BoM (see: https://firebase.google.com/docs/android/learn-more#bom)
    implementation platform('com.google.firebase:firebase-bom:30.5.0')

    // Firebase Performance Monitoring (Java)
    implementation 'com.google.firebase:firebase-perf'

    // Firebase Performance Monitoring (Kotlin)
    implementation 'com.google.firebase:firebase-perf-ktx'

    implementation 'com.google.android.material:material:1.6.1'
    implementation 'androidx.constraintlayout:constraintlayout:2.1.4'
    implementation 'androidx.lifecycle:lifecycle-runtime-ktx:2.5.1'

    implementation 'com.github.bumptech.glide:glide:4.12.0'

    testImplementation 'junit:junit:4.13.2'
    androidTestImplementation 'androidx.test.espresso:espresso-core:3.4.0'
}

```

#### Step 2. Our Android Manifest

We will need to look at our `AndroidManifest.xml`.

**(a). `AndroidManifest.xml`**

> Our `AndroidManifest` file.

```xml
<?xml version="1.0" encoding="utf-8"?>
<manifest xmlns:android="http://schemas.android.com/apk/res/android"
    package="com.google.firebase.quickstart.perfmon">

    <application
        android:allowBackup="true"
        android:icon="@mipmap/ic_launcher"
        android:label="@string/app_name"
        android:supportsRtl="true"
        android:theme="@style/AppTheme">

        <activity android:name=".java.MainActivity"/>

        <activity android:name=".kotlin.MainActivity"/>

        <activity android:name=".EntryChoiceActivity"
            android:exported="true">
            <intent-filter>
                <action android:name="android.intent.action.MAIN" />

                <category android:name="android.intent.category.DEFAULT" />
                <category android:name="android.intent.category.LAUNCHER" />
            </intent-filter>
        </activity>

    </application>

</manifest>

```
#### Step 4. Add Assets

Create a directory known as `assets` inside your `main` directory and add our asset files. You will find the files in the download.

**(a). `default_content.txt`**

```kotlin
This is the main text content.

Here are some random strings:
x3EIZZm4Z0J0ngq2S3L1jf2wr4DW
H0OnfpDjhRZMAbV9hLFMUTrjqhoV
KUuRv6ulGEme3layWx86qQrzHt1p
J5Qfx737fBhfOAobnt9CxilIgPQ2
```

#### Step 5. Design Layouts

Let's create the following layouts:

**(a). `activity_main.xml`**

> Our `activity_main` layout.

Inside your `/res/layout/` directory create an xml layout file named `activity_main.xml` add the following 5 UI widgets and ViewGroups:

1. `androidx.constraintlayout.widget.ConstraintLayout`
2. `ImageView`
3. `ScrollView`
4. `TextView`
5. `Button`

```xml
<?xml version="1.0" encoding="utf-8"?>
<androidx.constraintlayout.widget.ConstraintLayout xmlns:android="http://schemas.android.com/apk/res/android"
    xmlns:app="http://schemas.android.com/apk/res-auto"
    xmlns:tools="http://schemas.android.com/tools"
    android:layout_width="match_parent"
    android:layout_height="match_parent"
    android:padding="16dp"
    tools:context="com.google.firebase.quickstart.perfmon.java.MainActivity">

    <ImageView
        android:id="@+id/headerIcon"
        android:layout_width="wrap_content"
        android:layout_height="wrap_content"
        android:layout_centerHorizontal="true"
        android:layout_marginStart="8dp"
        android:layout_marginTop="8dp"
        android:layout_marginEnd="8dp"
        android:src="@drawable/firebase_lockup_400"
        app:layout_constraintEnd_toEndOf="parent"
        app:layout_constraintStart_toStartOf="parent"
        app:layout_constraintTop_toTopOf="parent" />

    <ScrollView
        android:layout_width="0dp"
        android:layout_height="0dp"
        android:layout_marginLeft="8dp"
        android:layout_marginTop="8dp"
        android:layout_marginRight="8dp"
        android:layout_marginBottom="8dp"
        android:textAlignment="viewStart"
        app:layout_constraintBottom_toTopOf="@+id/button"
        app:layout_constraintHorizontal_bias="0.0"
        app:layout_constraintLeft_toLeftOf="parent"
        app:layout_constraintRight_toRightOf="parent"
        app:layout_constraintTop_toBottomOf="@+id/headerIcon">

        <TextView
            android:id="@+id/textViewContent"
            android:layout_width="match_parent"
            android:layout_height="wrap_content"
            android:text="Loading text from file..."
            android:textAlignment="viewStart" />

    </ScrollView>

    <Button
        android:id="@+id/button"
        android:layout_width="wrap_content"
        android:layout_height="wrap_content"
        android:layout_marginLeft="8dp"
        android:layout_marginTop="8dp"
        android:layout_marginRight="8dp"
        android:layout_marginBottom="8dp"
        android:text="@string/generate_random_text"
        app:layout_constraintBottom_toBottomOf="parent"
        app:layout_constraintLeft_toLeftOf="parent"
        app:layout_constraintRight_toRightOf="parent" />

</androidx.constraintlayout.widget.ConstraintLayout>

```
#### Step 6. Write Code

Finally we need to write our code as follows:


**(a). `EntryChoiceActivity.kt`**

> Our `EntryChoiceActivity` class.

Create a Kotlin file named `EntryChoiceActivity.kt`.

We will be overriding the following functions: 

1. `getChoices(): List<Choice> `.

Here is the full code:

```kotlin
package replace_with_your_package_name

import android.content.Intent
import com.firebase.example.internal.BaseEntryChoiceActivity
import com.firebase.example.internal.Choice

class EntryChoiceActivity : BaseEntryChoiceActivity() {

    override fun getChoices(): List<Choice> {
        return listOf(
                Choice(
                        "Java",
                        "Run the Firebase Performance Monitoring quickstart written in Java.",
                        Intent(
                            this,
                            com.google.firebase.quickstart.perfmon.java.MainActivity::class.java)),
                Choice(
                        "Kotlin",
                        "Run the Firebase Performance Monitoring quickstart written in Kotlin.",
                        Intent(
                            this,
                            com.google.firebase.quickstart.perfmon.kotlin.MainActivity::class.java))
        )
    }
}


```

**(b). `MainActivity.kt`**

> Our `MainActivity` class.

Create a Kotlin file named `MainActivity.kt`.

We will then add imports from android SDK and other packages. Here are some of the imports we will use in this class:

1. `ColorDrawable` from the `android.graphics.drawable` package.
2. `Drawable` from the `android.graphics.drawable` package.
3. `Bundle` from the `android.os` package.
4. `ContextCompat` from the `androidx.core.content` package.
5. `AppCompatActivity` from the `androidx.appcompat.app` package.
6. `Log` from the `android.util` package.
7. `Toast` from the `android.widget` package.
8. `lifecycleScope` from the `androidx.lifecycle` package.
9. `Dispatchers` from the `kotlinx.coroutines` package.
10. `launch` from the `kotlinx.coroutines` package.
11. `withContext` from the `kotlinx.coroutines` package.

Next create a class that derives from `AppCompatActivity` and add its contents as follows:

We will be overriding the following functions: 

1. `onCreate(savedInstanceState: Bundle?) `.

We will be creating the following methods:

1. `loadImageFromWeb() `.
2. `writeStringToFile(filename: String, content: String): Task<Void> `.
3. `loadStringFromFile(): Task<String> `.
4. `loadFileFromDisk() `.
5. `getRandomString(parameter)` - Let's pass a `Int` object as a parameter.

**(a). Our `loadImageFromWeb()` function**

Write the `loadImageFromWeb()` function as follows:

```kotlin
    private fun loadImageFromWeb() {
        Glide.with(this).load(IMAGE_URL)
            .placeholder(ColorDrawable(ContextCompat.getColor(this, R.color.colorAccent)))
            .listener(object : RequestListener<Drawable> {
                override fun onLoadFailed(
                    e: GlideException?,
                    model: Any?,
                    target: Target<Drawable>?,
                    isFirstResource: Boolean
                ): Boolean {
                    numStartupTasks.countDown() // Signal end of image load task.
                    return false
                }

                override fun onResourceReady(
                    resource: Drawable?,
                    model: Any?,
                    target: Target<Drawable>?,
                    dataSource: DataSource?,
                    isFirstResource: Boolean
                ): Boolean {
                    numStartupTasks.countDown() // Signal end of image load task.
                    return false
                }
            }).into(binding.headerIcon)
    }
```

**(b). Our `writeStringToFile()` function**

Write the `writeStringToFile()` function as follows:

```kotlin
    private fun writeStringToFile(filename: String, content: String): Task<Void> {
        val taskCompletionSource = TaskCompletionSource<Void>()
        lifecycleScope.launch {
            withContext(Dispatchers.IO) {
                val fos = FileOutputStream(filename, true)
                fos.write(content.toByteArray())
                fos.close()
                taskCompletionSource.setResult(null)
            }
        }
        return taskCompletionSource.task
    }
```

**(c). Our `loadStringFromFile()` function**

Write the `loadStringFromFile()` function as follows:

```kotlin
    private fun loadStringFromFile(): Task<String> {
        val taskCompletionSource = TaskCompletionSource<String>()
        lifecycleScope.launch {
            withContext(Dispatchers.IO) {
                val contentFile = File(filesDir, CONTENT_FILE)
                if (contentFile.createNewFile()) {
                    // Content file exist did not exist in internal storage and new file was created.
                    // Copy in the default content.
                    val `is`: InputStream = assets.open(DEFAULT_CONTENT_FILE)
                    val size = `is`.available()
                    val buffer = ByteArray(size)
                    `is`.read(buffer)
                    `is`.close()
                    val fos = FileOutputStream(contentFile)
                    fos.write(buffer)
                    fos.close()
                }
                val fis = FileInputStream(contentFile)
                val content = ByteArray(contentFile.length().toInt())
                fis.read(content)
                taskCompletionSource.setResult(String(content))
            }
        }
        return taskCompletionSource.task
    }
```

**(d). Our `getRandomString()` function**

Write the `getRandomString()` function as follows:

```kotlin
    private fun getRandomString(length: Int): String {
        val chars = "abcdefghijklmnopqrstuvwxyz".toCharArray()
        val sb = StringBuilder()
        val random = Random()
        for (i in 0 until length) {
            val c = chars[random.nextInt(chars.size)]
            sb.append(c)
        }
        return sb.toString()
    }
```

**(e). Our `loadFileFromDisk()` function**

Write the `loadFileFromDisk()` function as follows:

```kotlin
    private fun loadFileFromDisk() {
        loadStringFromFile()
                .addOnCompleteListener(OnCompleteListener { task ->
                    if (!task.isSuccessful) {
                        Log.e(TAG, "Couldn't read text file.")
                        Toast.makeText(
                                this, getString(R.string.text_read_error), Toast.LENGTH_LONG)
                                .show()
                        return@OnCompleteListener
                    }

                    val fileContent = task.result
                    binding.textViewContent.text = task.result
                    // Increment a counter with the file size that was read.
                    Log.d(TAG, "Incrementing file size counter in trace")
                    trace.incrementMetric(
                            FILE_SIZE_COUNTER_NAME,
                            fileContent!!.toByteArray().size.toLong())
                    numStartupTasks.countDown()
                })
    }
```


Here is the full code:

```kotlin
package replace_with_your_package_name

import android.graphics.drawable.ColorDrawable
import android.graphics.drawable.Drawable
import android.os.Bundle
import androidx.core.content.ContextCompat
import androidx.appcompat.app.AppCompatActivity
import android.util.Log
import android.widget.Toast
import androidx.lifecycle.lifecycleScope
import com.bumptech.glide.Glide
import com.bumptech.glide.load.DataSource
import com.bumptech.glide.load.engine.GlideException
import com.bumptech.glide.request.RequestListener
import com.bumptech.glide.request.target.Target
import com.google.android.gms.tasks.OnCompleteListener
import com.google.android.gms.tasks.Task
import com.google.android.gms.tasks.TaskCompletionSource
import com.google.firebase.ktx.Firebase
import com.google.firebase.perf.ktx.performance
import com.google.firebase.perf.metrics.Trace
import com.google.firebase.quickstart.perfmon.R
import com.google.firebase.quickstart.perfmon.databinding.ActivityMainBinding
import kotlinx.coroutines.Dispatchers
import kotlinx.coroutines.launch
import kotlinx.coroutines.withContext
import java.io.File
import java.io.FileInputStream
import java.io.FileOutputStream
import java.io.InputStream
import java.util.Random
import java.util.concurrent.CountDownLatch

class MainActivity : AppCompatActivity() {

    private lateinit var trace: Trace

    private val numStartupTasks = CountDownLatch(2)

    private lateinit var binding: ActivityMainBinding

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        binding = ActivityMainBinding.inflate(layoutInflater)
        setContentView(binding.root)

        binding.button.setOnClickListener {
            // write 40 chars of random text to file
            val contentFile = File(this.filesDir, CONTENT_FILE)

            writeStringToFile(contentFile.absolutePath, "${getRandomString(40)}\n")
                    .addOnCompleteListener { task ->
                        if (!task.isSuccessful) {
                            Log.e(TAG, "Unable to write to file", task.exception)
                            return@addOnCompleteListener
                        }

                        loadFileFromDisk()
                    }
        }

        // Begin tracing app startup tasks.
        trace = Firebase.performance.newTrace(STARTUP_TRACE_NAME)
        Log.d(TAG, "Starting trace")
        trace.start()
        loadImageFromWeb()
        // Increment the counter of number of requests sent in the trace.
        Log.d(TAG, "Incrementing number of requests counter in trace")
        trace.incrementMetric(REQUESTS_COUNTER_NAME, 1)
        loadFileFromDisk()
        // Wait for app startup tasks to complete asynchronously and stop the trace.
        Thread(Runnable {
            try {
                numStartupTasks.await()
            } catch (e: InterruptedException) {
                Log.e(TAG, "Unable to wait for startup task completion.")
            } finally {
                Log.d(TAG, "Stopping trace")
                trace.stop()
                runOnUiThread {
                    Toast.makeText(this, "Trace completed",
                            Toast.LENGTH_SHORT).show()
                }
            }
        }).start()
    }

    private fun loadImageFromWeb() {
        Glide.with(this).load(IMAGE_URL)
            .placeholder(ColorDrawable(ContextCompat.getColor(this, R.color.colorAccent)))
            .listener(object : RequestListener<Drawable> {
                override fun onLoadFailed(
                    e: GlideException?,
                    model: Any?,
                    target: Target<Drawable>?,
                    isFirstResource: Boolean
                ): Boolean {
                    numStartupTasks.countDown() // Signal end of image load task.
                    return false
                }

                override fun onResourceReady(
                    resource: Drawable?,
                    model: Any?,
                    target: Target<Drawable>?,
                    dataSource: DataSource?,
                    isFirstResource: Boolean
                ): Boolean {
                    numStartupTasks.countDown() // Signal end of image load task.
                    return false
                }
            }).into(binding.headerIcon)
    }

    private fun writeStringToFile(filename: String, content: String): Task<Void> {
        val taskCompletionSource = TaskCompletionSource<Void>()
        lifecycleScope.launch {
            withContext(Dispatchers.IO) {
                val fos = FileOutputStream(filename, true)
                fos.write(content.toByteArray())
                fos.close()
                taskCompletionSource.setResult(null)
            }
        }
        return taskCompletionSource.task
    }

    private fun loadStringFromFile(): Task<String> {
        val taskCompletionSource = TaskCompletionSource<String>()
        lifecycleScope.launch {
            withContext(Dispatchers.IO) {
                val contentFile = File(filesDir, CONTENT_FILE)
                if (contentFile.createNewFile()) {
                    // Content file exist did not exist in internal storage and new file was created.
                    // Copy in the default content.
                    val `is`: InputStream = assets.open(DEFAULT_CONTENT_FILE)
                    val size = `is`.available()
                    val buffer = ByteArray(size)
                    `is`.read(buffer)
                    `is`.close()
                    val fos = FileOutputStream(contentFile)
                    fos.write(buffer)
                    fos.close()
                }
                val fis = FileInputStream(contentFile)
                val content = ByteArray(contentFile.length().toInt())
                fis.read(content)
                taskCompletionSource.setResult(String(content))
            }
        }
        return taskCompletionSource.task
    }

    private fun loadFileFromDisk() {
        loadStringFromFile()
                .addOnCompleteListener(OnCompleteListener { task ->
                    if (!task.isSuccessful) {
                        Log.e(TAG, "Couldn't read text file.")
                        Toast.makeText(
                                this, getString(R.string.text_read_error), Toast.LENGTH_LONG)
                                .show()
                        return@OnCompleteListener
                    }

                    val fileContent = task.result
                    binding.textViewContent.text = task.result
                    // Increment a counter with the file size that was read.
                    Log.d(TAG, "Incrementing file size counter in trace")
                    trace.incrementMetric(
                            FILE_SIZE_COUNTER_NAME,
                            fileContent!!.toByteArray().size.toLong())
                    numStartupTasks.countDown()
                })
    }

    private fun getRandomString(length: Int): String {
        val chars = "abcdefghijklmnopqrstuvwxyz".toCharArray()
        val sb = StringBuilder()
        val random = Random()
        for (i in 0 until length) {
            val c = chars[random.nextInt(chars.size)]
            sb.append(c)
        }
        return sb.toString()
    }

    companion object {
        private const val TAG = "MainActivity"

        private const val DEFAULT_CONTENT_FILE = "default_content.txt"
        private const val CONTENT_FILE = "content.txt"
        private const val IMAGE_URL =
                "https://www.google.com/images/branding/googlelogo/2x/googlelogo_color_272x92dp.png"

        private const val STARTUP_TRACE_NAME = "startup_trace"
        private const val REQUESTS_COUNTER_NAME = "requests sent"
        private const val FILE_SIZE_COUNTER_NAME = "file size"
    }
}


```

### Reference

Below are the reference links:

|No.|Link|
|--|---|
|2.|Read more [here](https://github.com/firebase/quickstart-android/blob/master/perf/README.md).|
|3.|Follow code author [here](https://github.com/quickstart-android).|
