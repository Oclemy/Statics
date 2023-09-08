# BlurHashExt

>  Kotlin extensions of BlurHash for ImageView, Glide, Coil, Piccasso, and fast loading BlurHashDrawable optimized for Android..

Kotlin extensions of BlurHash on Android ImageView, Glide, and Picasso.
Based Blurhash implementation is from https://github.com/woltapp/blurhash.
This implementation focus on optimizing BlurHash for Android development.

![BlurHashExt Example Tutorial](https://github.com/KingsMentor/BlurHashExt/raw/master/Media/sample.gif)


### How BlurHash works?

In short, BlurHash takes an image, and gives you a short string (only 20-30 characters!) that represents the placeholder for this image. You do this on the backend of your service, and store the string along with the image. When you send data to your client, you send both the URL to the image, and the BlurHash string. Your client then takes the string, and decodes it into an image that it shows while the real image is loading over the network. The string is short enough that it comfortably fits into whatever data format you use. For instance, it can easily be added as a field in a JSON object.
``BlurHash``Ext implements ``BlurHash`` Algorithm(request to generate bitmap from the blurHash and convert to drawable) using coroutine. This allows image processing to happen on the IO thread. Call `blurHash.clean()` to dispose any pending job operation and other cache bitmap. ``BlurHash`` uses LRU-Cache to cache drawable bitmap in memory. `lruSize` can be defined when initializing ``BlurHash``.

### In summary:


![BlurHash Tutorial](https://github.com/KingsMentor/BlurHashExt/raw/master/Media/HowItWorks1.jpg)

![BlurHash Tutorial](https://github.com/KingsMentor/BlurHashExt/raw/master/Media/HowItWorks2.jpg)

Follow these steps to use this library:

### Step 1: Install it

You can install it via Gradle:

```groovy
dependencies {
  implementation 'xyz.belvi.blurHash:blurHash:1.0.4'
}
```


### Step 2: Usage


#### Step 1 - Initialize BlurHash

`val blurHash: BlurHash = BlurHash(this, lruSize = 20, punch = 1F)`
val blurHash: BlurHash = BlurHash(this, lruSize = 20, punch = 1F)
`lruSize` determines the number of blur drawable that will be cache in memory. The default size is 10

#### Step 2 - Using BlurHash

With Glide

```kotlin
Glide.with(this).load(imgUrl)
    .blurPlaceHolder(blurHashString, imageView, blurHash)
    {
        requestBuilder ->
        requestBuilder.into(imageView)
    }
```

or

```kotlin
Glide.with(this).load(imgUrl)
   .blurPlaceHolder(blurHashString, width = 200, height= 200, blurHash = blurHash)
   {
       requestBuilder ->
       requestBuilder.into(imageView)
   }
```

With Picasso

```kotlin
Picasso.get().load(imgUrl)
    .blurPlaceHolder(blurHashString, imageView, blurHash)
    {
        request ->
        request.into(imageView)
    }
```

or

```kotlin
Picasso.get().load(imgUrl)
   .blurPlaceHolder(blurHashString, width = 200, height= 200, blurHash = blurHash)
   {
       request ->
       request.into(imageView)
   }
```

With Coil

```kotlin
val request = ImageRequest.Builder(context)
    .data("https://www.example.com/image.jpg")
    .target { drawable ->
        // Handle the result.
        
    }.blurPlaceHolder(blurHashString, imageView, blurHash = blurHash)
    {coilImageBuilder ->
      coilImageBuilder.build()
    }
```

or

```kotlin
imageView.load("https://www.example.com/image.jpg") {
   crossfade(true)
   blurPlaceHolder(blurHashString, imageView, blurHash = blurHash)
   {coilImageBuilder ->
     coilImageBuilder.build()
   }
   transformations(CircleCropTransformation())
}
```

In an ImageView
This is useful for loading a placeholder before makeing a call to load the actual Image

```kotlin
imageView.placeHolder(blurHashString, blurHash)
        {
            imageView.setImageURI(imgUrl)
        }
```

Just interested in getting the blurHash Drawabe ?
This is useful for getting blurHasdDrablw asynchronously.

```kotlin
blurHashDrawable(blurHashString, imageView, blurHash)
    {
        drawable ->
        // do something with drawable or use whatver imageloading library you want. blurDrawable is ready to be used as error image or placeholder
    }
```

or

```kotlin
blurHashDrawable(blurHashString, width = 200, height = 200,  blurHash)
   {
       drawable ->
       // do something with drawable or use whatver imageloading library you want. blurDrawable is ready to be used as error image or placeholder
   }
```


#### Step 3 - Finally, Disposing


```kotlin
override fun onDestroy() {
        super.onDestroy()
        blurHash.clean()
    }
```


### Full Example

Follow these steps to create a full BlurHash example using this library:

#### Step 1. Design Layouts

In Android we design our UI interfaces using XML. So let's create the following layouts:

**(a). fields.xml**


> Our `fields` layout.

Inside your `/res/layout/` directory create an xml layout file named `fields.xml`. Design your XML layout using the following 3 UI widgets and ViewGroups:

1. `androidx.constraintlayout.widget.ConstraintLayout`
2. `ImageView`
3. `TextView`

```xml
<?xml version="1.0" encoding="utf-8"?>
<androidx.constraintlayout.widget.ConstraintLayout xmlns:android="http://schemas.android.com/apk/res/android"
    xmlns:app="http://schemas.android.com/apk/res-auto"
    xmlns:tools="http://schemas.android.com/tools"
    android:layout_width="match_parent"
    android:layout_height="wrap_content">

    <ImageView
        android:id="@+id/imageView"
        android:layout_width="match_parent"
        android:layout_height="wrap_content"
        android:background="#dddddd"
        android:minHeight="200dp"
        android:scaleType="centerCrop"
        app:layout_constraintEnd_toEndOf="parent"
        app:layout_constraintStart_toStartOf="parent"
        app:layout_constraintTop_toTopOf="parent"
        tools:srcCompat="@tools:sample/avatars" />

    <TextView
        android:id="@+id/textView"
        android:layout_width="0dp"
        android:layout_height="wrap_content"
        android:layout_marginTop="8dp"
        android:layout_marginBottom="8dp"
        android:gravity="center"
        android:textColor="@color/black"
        app:layout_constraintBottom_toBottomOf="parent"
        app:layout_constraintEnd_toEndOf="parent"
        app:layout_constraintStart_toStartOf="parent"
        app:layout_constraintTop_toBottomOf="@+id/imageView" />
</androidx.constraintlayout.widget.ConstraintLayout>
```

**(b). activity_main.xml**


> Our `activity_main` layout.

Add a recyclerview in our main layout:

1. `androidx.recyclerview.widget.RecyclerView`

```xml
<?xml version="1.0" encoding="utf-8"?>
<androidx.recyclerview.widget.RecyclerView xmlns:android="http://schemas.android.com/apk/res/android"
    xmlns:app="http://schemas.android.com/apk/res-auto"
    xmlns:tools="http://schemas.android.com/tools"
    android:id="@+id/recyclerview"
    android:background="@color/white"
    android:layout_width="match_parent"
    android:layout_height="match_parent"
    tools:context=".blurHashSample.MainActivity">

</androidx.recyclerview.widget.RecyclerView>
```
#### Step 2. Our Android Manifest

We will need to look at our `AndroidManifest.xml`.


**(a). AndroidManifest.xml**

> Our `AndroidManifest` file.

Here we will add the following permission:

1. Our INTERNET permission - needed to fetch online images.

Here is the full Android Manifest file:

```xml
<?xml version="1.0" encoding="utf-8"?>
<manifest xmlns:android="http://schemas.android.com/apk/res/android"
    package="xyx.belvi.blurHashSample">

        <uses-permission android:name="android.permission.INTERNET" />
    <application
        android:allowBackup="true"
        android:icon="@mipmap/ic_launcher"
        android:label="@string/app_name"
        android:roundIcon="@mipmap/ic_launcher_round"
        android:supportsRtl="true"
        android:theme="@style/Theme.BlurHashSample">

        <activity android:name=".MainActivity">
            <intent-filter>
                <action android:name="android.intent.action.MAIN" />

                <category android:name="android.intent.category.LAUNCHER" />
                <category android:name="android.intent.category.DEFAULT" />
            </intent-filter>
        </activity>
    </application>

</manifest>
```
#### Step 3. Write Code

Finally we need to write our code as follows:


**(a). SampleResponse.kt**

> Our `SampleResponse` class.

Basically a data class receiving two strings:

```kotlin
package replace_with_your_package_name

data class SampleResponse(val blur: String, val img: String)

```

**(b). MainActivity.kt**

> Our `MainActivity` class.

Here is the full code:

```kotlin
package replace_with_your_package_name

import android.os.Bundle
import android.util.Log
import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import androidx.appcompat.app.AppCompatActivity
import androidx.recyclerview.widget.LinearLayoutManager
import androidx.recyclerview.widget.RecyclerView
import coil.ImageLoader
import coil.load
import coil.request.ImageRequest
import com.google.gson.Gson
import com.google.gson.reflect.TypeToken
import kotlinx.android.synthetic.main.activity_main.*
import kotlinx.android.synthetic.main.fields.view.*
import xyz.belvi.blurhash.BlurHash
import xyz.belvi.blurhash.blurHashDrawable
import xyz.belvi.blurhash.blurPlaceHolder
import java.lang.Exception

class MainActivity : AppCompatActivity() {

    val blurHash: BlurHash = BlurHash(this, lruSize = 20)
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_main)
        recyclerview.layoutManager = LinearLayoutManager(this, RecyclerView.VERTICAL, false)
        recyclerview.adapter = SampleRecyclerAdapter(sampleResponse())
    }

    private fun sampleResponse(): List<SampleResponse> {
        val response = resources.openRawResource(R.raw.sample).bufferedReader()
            .use { it.readText() }
        return Gson().fromJson(response, object : TypeToken<List<SampleResponse>>() {}.type)
    }

    inner class SampleRecyclerAdapter(private val response: List<SampleResponse>) :
        RecyclerView.Adapter<SampleRecyclerHolder>() {
        override fun onCreateViewHolder(parent: ViewGroup, viewType: Int): SampleRecyclerHolder {
            return SampleRecyclerHolder(
                LayoutInflater.from(parent.context).inflate(R.layout.fields, parent, false)
            )
        }

        override fun onBindViewHolder(holder: SampleRecyclerHolder, position: Int) {
            holder.bindView(response[position])
        }

        override fun getItemCount(): Int {
            return response.size
        }
    }

    inner class SampleRecyclerHolder(itemView: View) : RecyclerView.ViewHolder(itemView) {
        fun bindView(sampleResponse: SampleResponse) {
            with(itemView) {
                textView.text = sampleResponse.blur
                ImageRequest.Builder(context)
                    .data("https://www.example.com/image.jpg")
                    .target { drawable ->
                        // Handle the result.
                    }
                    .placeholder(R.drawable.ic_launcher_background)
                    .error(R.drawable.ic_launcher_background)
                    .build()

            }
        }
    }

    override fun onDestroy() {
        super.onDestroy()
        blurHash.clean()
    }
}

```

### Reference

Download the code below:

|No.|Link|
|--|---|
|1.|[Download Full Code](https://github.com/KingsMentor/BlurHashExt/archive/refs/heads/master.zip)|
|2.|Read more [here](https://github.com/KingsMentor/BlurHashExt).|
|3.|Follow code author [here](https://github.com/KingsMentor).|
