# Coroutines + Retrofit - Example


In this tuorial we want to learn Kotlin Coroutines usage with Retrofit in Android Development. We will be looking at various standalone open source examples.


### What is a Coroutine?

> It is a concurrency design pattern that you can use on Android to simplify code that executes asynchronously. [Coroutines](https://kotlinlang.org/docs/reference/coroutines/coroutines-guide.html) were added to Kotlin in version 1.3 and are based on established concepts from other languages.

On Android, coroutines help to manage long-running tasks that might otherwise block the main thread and cause your app to become unresponsive.

### What is Retrofit

Retrofit is a type-safe HTTP client for Android and the JVM. It is the most popular third library of such role.

## Example 1: Kotlin Android Retrofit + Coroutines - API Call

This example involves making HTTP calls via retrofit to a dogs API. This is done asynchronously using Coroutines.

Here is the demo of the project created:

![](https://camo.githubusercontent.com/f555373af4bfdb51576269cc25491a381b0aa80c4daf93d4fa588325a67e93e8/68747470733a2f2f692e706f7374696d672e63632f4a7a50724a6731332f636f726f7574696e652d726574726f6669742d64656d6f2d72616e646f6d2d646f672e6a7067)

### Step 1: Create Project

Start by creating an empty `Android Studio` Kotlin project.

### Step 2: Dependencies

Go to your `app/build.gradle` under the dependencies and add coroutines as dependencies, as follows:

```groovy
    implementation 'org.jetbrains.kotlinx:kotlinx-coroutines-core:1.3.5'
    implementation 'org.jetbrains.kotlinx:kotlinx-coroutines-android:1.3.5'
```

Then we need Retrofit as well as gson-converter:

```groovy
    implementation 'com.squareup.retrofit2:retrofit:2.8.0'
    implementation 'com.squareup.retrofit2:converter-gson:2.1.0'
```

Then we can use Coil as the imageloader:

```groovy
    implementation 'io.coil-kt:coil:0.9.5'
```

Sync.

### Step 3: Design Layouts

Only one layout is needed:

**activity_main.xml**

```xml
<?xml version="1.0" encoding="utf-8"?>
<LinearLayout xmlns:android="http://schemas.android.com/apk/res/android"
    xmlns:app="http://schemas.android.com/apk/res-auto"
    xmlns:tools="http://schemas.android.com/tools"
    android:layout_width="match_parent"
    android:layout_height="match_parent"
    android:orientation="vertical"
    tools:context=".MainActivity">

    <ImageView
        android:id="@+id/iv_dog_image"
        android:layout_width="match_parent"
        android:layout_height="0dp"
        android:layout_weight="1"/>

    <Button
        android:id="@+id/btn_get_image"
        android:layout_width="wrap_content"
        android:layout_height="wrap_content"
        android:layout_margin="48dp"
        android:text="@string/get_random_dog_image"
        android:layout_gravity="center" />

</LinearLayout>
```

### Step 4: Create Model class

Create a Dog model class. The class will represent a single Dog:

```kotlin
import androidx.annotation.Keep

@Keep
class DogImageModel {
    var message: String? = null
}
```

### Step 5: Create the API Client

We will be making a HTTP GET request to the supplied URL path.

**ApiClient.kt**

```kotlin
import retrofit2.Response
import retrofit2.http.GET

interface ApiClient {
    @GET("/api/breeds/image/random")
    suspend fun getRandomDogImage(): Response<DogImageModel>
}
```

### Step 6: Create API Adapter

An object class that will help us instantiate and configure Retrofit:

**ApiAdapter.kt**

```kotlin
import okhttp3.OkHttpClient
import retrofit2.Retrofit
import retrofit2.converter.gson.GsonConverterFactory

object ApiAdapter {
    // Interface to be used as Retrofit service.
    // We're using Dog.ceo public API.
    val apiClient: ApiClient = Retrofit.Builder()
        .baseUrl("https://dog.ceo")
        .client(OkHttpClient())
        .addConverterFactory(GsonConverterFactory.create())
        .build()
        .create(ApiClient::class.java)
}
```

### Step 7: Download and Render the Image

In the MainActivity you can download and render the image when the button is clicked:

**MainActivity.kt**

```kotlin
import android.os.Bundle
import android.widget.Toast
import androidx.appcompat.app.AppCompatActivity
import coil.api.load
import kotlinx.android.synthetic.main.activity_main.*
import kotlinx.coroutines.CoroutineScope
import kotlinx.coroutines.Dispatchers
import kotlinx.coroutines.MainScope
import kotlinx.coroutines.launch

class MainActivity : AppCompatActivity(), CoroutineScope by MainScope() {

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_main)

        btn_get_image.setOnClickListener {
            // Use launch and pass Dispatchers.Main to tell that
            // the result of this Coroutine is expected on the main thread.
            launch(Dispatchers.Main) {
                // Try catch block to handle exceptions when calling the API.
                try {
                    val response = ApiAdapter.apiClient.getRandomDogImage()
                    // Check if response was successful
                    if (response.isSuccessful && response.body() != null) {
                        // Retrieve data.
                        val data = response.body()!!
                        data.message?.let {
                            // Load URL into the ImageView using Coil.
                            iv_dog_image.load(it)
                        }
                    } else {
                        // Show API error.
                        // This is when the server responded with an error.
                        Toast.makeText(
                                this@MainActivity,
                                "Error Occurred: ${response.message()}",
                                Toast.LENGTH_LONG).show()
                    }
                } catch (e: Exception) {
                    // Show API error. This is the error raised by the client.
                    // The API probably wasn't called in this case, so better check before assuming.
                    Toast.makeText(this@MainActivity,
                            "Error Occurred: ${e.message}",
                            Toast.LENGTH_LONG).show()
                }
            }
        }
    }
}
```

### Step 8: Add Permission

Because we are downloading an image from online, we need to request internet permission access. Do that in the `AndroidManifest.xml`:

```xml

    <uses-permission android:name="android.permission.INTERNET" />
```

### Step 9: Run

Copy the code or download it in the link below, build and run.

### Reference

Here are the reference links:

| Number | Link |
| --- | --- |
| 1. | [Download](https://github.com/tatirajurishabh/Coroutines-Retrofit-Demo/archive/refs/heads/master.zip) Example |
| 2. | [Follow](https://github.com/tatirajurishabh/) code author |
