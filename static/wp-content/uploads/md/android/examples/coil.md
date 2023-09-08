# Kotlin Android Coil Examples

> A step by step Coil  tutorial and examples.


### What  is Coil?

>  Image loading for Android backed by Kotlin Coroutines..

An image loading library for Android backed by Kotlin Coroutines. Coil is:

- Fast: Coil performs a number of optimizations including memory and disk caching, downsampling the image in memory, automatically pausing/cancelling requests, and more.
- Lightweight: Coil adds ~2000 methods to your APK (for apps that already use OkHttp and Coroutines), which is comparable to Picasso and significantly less than Glide and Fresco.
- Easy to use: Coil's API leverages Kotlin's language features for simplicity and minimal boilerplate.
- Modern: Coil is Kotlin-first and uses modern libraries including Coroutines, OkHttp, Okio, and AndroidX Lifecycles.

> Coil is an acronym for: Coroutine Image Loader.



To use coil in your android app follow these steps:

### Step 1: Install it

Coil is available on `mavenCentral()`. Install it via the following command:

```kotlin
implementation("io.coil-kt:coil:2.2.2")
```


### Step 2: Write code

#### ImageViews

To `load` an image into an `ImageView`, use the `load` extension function:

```kotlin
// URL
imageView.load("https://www.example.com/image.jpg")

// File
imageView.load(File("/path/to/image.jpg"))

// And more...
```

Requests can be configured with an optional trailing lambda:

```kotlin
imageView.load("https://www.example.com/image.jpg") {
    crossfade(true)
    placeholder(R.drawable.image)
    transformations(CircleCropTransformation())
}
```


#### Jetpack Compose

Import the Jetpack Compose extension library:

```kotlin
implementation("io.coil-kt:coil-compose:2.2.2")
```

To load an image, use the `AsyncImage` composable:

```kotlin
AsyncImage(
    model = "https://example.com/image.jpg",
    contentDescription = null
)
```


#### Image Loaders

Both `imageView.load` and `AsyncImage` use the singleton ``ImageLoader`` to execute image requests. The singleton ``ImageLoader`` can be accessed using a `Context` extension function:

```kotlin
val imageLoader = context.imageLoader
```

``ImageLoader``s are designed to be shareable and are most efficient when you create a single instance and share it throughout your app. That said, you can also create your own ``ImageLoader`` instance(s):

```kotlin
val imageLoader = ImageLoader(context)
```

If you do not want the singleton `ImageLoader`, depend on ``io.coil-kt:coil`-base` instead of `io.coil-kt:coil`.

#### Requests

To load an image into a custom target, `enqueue` an `ImageRequest`:

```kotlin
val request = ImageRequest.Builder(context)
    .data("https://www.example.com/image.jpg")
    .target { drawable ->
        // Handle the result.
    }
    .build()
val disposable = imageLoader.enqueue(request)
```

To load an image imperatively, `execute` an `ImageRequest`:

```kotlin
val request = ImageRequest.Builder(context)
    .data("https://www.example.com/image.jpg")
    .build()
val drawable = imageLoader.execute(request).drawable
```

Check out Coil's full documentation here.

### Requirements

Coil requires the following:

- Min SDK 21+
- Java 8+

### R8 / Proguard

Coil is fully compatible with R8 out of the box and doesn't require adding any extra rules.
If you use Proguard, you may need to add rules for Coroutines, OkHttp and Okio.

### Full Example

For a full Coil example project follow the following steps.

#### Step 1. Our Android Manifest

We will need to look at our `AndroidManifest.xml`.


**(a). AndroidManifest.xml**


> Our `AndroidManifest` file.

Here we will add the following permission:

1. Our ACCESS_NETWORK_STATE permission.
2. Our INTERNET permission.

Here is the full Android Manifest file:

```xml
<?xml version="1.0" encoding="utf-8"?>
<manifest
    xmlns:android="http://schemas.android.com/apk/res/android"
    xmlns:tools="http://schemas.android.com/tools">

    <uses-permission android:name="android.permission.ACCESS_NETWORK_STATE"/>
    <uses-permission android:name="android.permission.INTERNET"/>

    <application
        android:name=".Application"
        android:icon="@mipmap/ic_launcher"
        android:label="@string/app_name"
        android:roundIcon="@mipmap/ic_launcher_round"
        android:supportsRtl="true"
        android:theme="@style/AppTheme"
        tools:ignore="GoogleAppIndexingWarning">

        <activity
            android:name=".MainActivity"
            android:exported="true">
            <intent-filter>
                <action android:name="android.intent.action.MAIN"/>
                <category android:name="android.intent.category.LAUNCHER"/>
            </intent-filter>
        </activity>
    </application>
</manifest>

```
#### Step 2. Design Layouts

In Android we design our UI interfaces using XML. So let's create the following layouts:


**(a). list_item.xml**


> Our `list_item` layout.

Inside your `/res/layout/` directory create an xml layout file named `list_item.xml`.

After that design your XML layout using the following 1 UI widgets and ViewGroups:

1. `ImageView` - Where we will load our image

```xml
<?xml version="1.0" encoding="utf-8"?>
<ImageView
    xmlns:android="http://schemas.android.com/apk/res/android"
    xmlns:tools="http://schemas.android.com/tools"
    android:layout_width="match_parent"
    android:layout_height="match_parent"
    android:clickable="true"
    android:contentDescription="@null"
    android:focusable="true"
    android:foreground="?attr/selectableItemBackground"
    android:scaleType="centerCrop"
    tools:ignore="UnusedAttribute"
    tools:viewBindingIgnore="true"/>

```

**(b). activity_main.xml**


> Our `activity_main` layout.

Inside your `/res/layout/` directory create an xml layout file named `activity_main.xml`.

Furthermore design your XML layout using the following 5 UI widgets and ViewGroups:

1. `androidx.constraintlayout.widget.ConstraintLayout` - Our root element
2. `com.google.android.material.appbar.AppBarLayout` - Our AppBar layout
3. `com.google.android.material.appbar.MaterialToolbar` - Our toolbar
4. `androidx.recyclerview.widget.RecyclerView` - A recyclerView
5. `ImageView`

```xml
<?xml version="1.0" encoding="utf-8"?>
<androidx.constraintlayout.widget.ConstraintLayout
    xmlns:android="http://schemas.android.com/apk/res/android"
    xmlns:app="http://schemas.android.com/apk/res-auto"
    xmlns:tools="http://schemas.android.com/tools"
    android:layout_width="match_parent"
    android:layout_height="match_parent"
    tools:context=".MainActivity">

    <com.google.android.material.appbar.AppBarLayout
        android:id="@+id/app_bar"
        android:layout_width="0dp"
        android:layout_height="wrap_content"
        android:background="?attr/colorPrimary"
        app:layout_constraintEnd_toEndOf="parent"
        app:layout_constraintStart_toStartOf="parent"
        app:layout_constraintTop_toTopOf="parent">

        <com.google.android.material.appbar.MaterialToolbar
            android:id="@+id/toolbar"
            android:layout_width="match_parent"
            android:layout_height="wrap_content"
            android:minHeight="?attr/actionBarSize"/>
    </com.google.android.material.appbar.AppBarLayout>

    <androidx.recyclerview.widget.RecyclerView
        android:id="@+id/list"
        android:layout_width="0dp"
        android:layout_height="0dp"
        app:layout_constraintBottom_toBottomOf="parent"
        app:layout_constraintEnd_toEndOf="parent"
        app:layout_constraintStart_toStartOf="parent"
        app:layout_constraintTop_toBottomOf="@id/app_bar"/>

    <ImageView
        android:id="@+id/detail"
        android:layout_width="0dp"
        android:layout_height="0dp"
        android:contentDescription="@null"
        app:layout_constraintBottom_toBottomOf="parent"
        app:layout_constraintEnd_toEndOf="parent"
        app:layout_constraintStart_toStartOf="parent"
        app:layout_constraintTop_toBottomOf="@id/app_bar"/>
</androidx.constraintlayout.widget.ConstraintLayout>

```
#### Step 3. Write Code

Finally we need to write our code as follows:


**(a). Utils.kt**

> Our `Utils` class.

Just copy the code below and replace the package with your app's package name.

```kotlin
@file:Suppress("NOTHING_TO_INLINE")

package replace_with_your_package_name

import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import android.view.WindowInsets
import androidx.annotation.LayoutRes
import androidx.core.view.WindowInsetsCompat
import androidx.recyclerview.widget.AsyncDifferConfig
import androidx.recyclerview.widget.DiffUtil
import kotlinx.coroutines.Dispatchers
import kotlinx.coroutines.asExecutor

inline fun <reified V : View> ViewGroup.inflate(
    @LayoutRes layoutRes: Int,
    attachToRoot: Boolean = false
): V = LayoutInflater.from(context).inflate(layoutRes, this, attachToRoot) as V

inline fun WindowInsets.toCompat(): WindowInsetsCompat {
    return WindowInsetsCompat.toWindowInsetsCompat(this)
}

fun <T> DiffUtil.ItemCallback<T>.asConfig(): AsyncDifferConfig<T> {
    return AsyncDifferConfig.Builder(this)
        .setBackgroundThreadExecutor(Dispatchers.IO.asExecutor())
        .build()
}


```

**(b). ImageListAdapter.kt**

> Our `ImageListAdapter` class.

Create a Kotlin file named `ImageListAdapter.kt`.

Add imports from android SDK and other packages. Here are some of the imports we will use in this class:

1. `Color` from the `android.graphics` package.
2. `ColorDrawable` from the `android.graphics.drawable` package.
3. `View` from the `android.view` package.
4. `ViewGroup` from the `android.view` package.
5. `ImageView` from the `android.widget` package.
6. `updateLayoutParams` from the `androidx.core.view` package.
7. `DiffUtil` from the `androidx.recyclerview.widget` package.
8. `ListAdapter` from the `androidx.recyclerview.widget` package.
9. `RecyclerView` from the `androidx.recyclerview.widget` package.

Next create a class that derives from `RecyclerView.ViewHolder(itemView)` and add its contents as follows:

We will be overriding the following functions: 

1. `onCreateViewHolder(parent: ViewGroup, viewType: Int): ViewHolder `.
2. `onBindViewHolder(holder: ViewHolder, position: Int) `.

Just copy the code below and replace the package with your app's package name.

```kotlin
package replace_with_your_package_name

import android.graphics.Color
import android.graphics.drawable.ColorDrawable
import android.view.View
import android.view.ViewGroup
import android.widget.ImageView
import androidx.core.view.updateLayoutParams
import androidx.recyclerview.widget.DiffUtil
import androidx.recyclerview.widget.ListAdapter
import androidx.recyclerview.widget.RecyclerView
import coil.load
import coil.memory.MemoryCache
import coil.sample.ImageListAdapter.ViewHolder

class ImageListAdapter(
    private val numColumns: Int,
    private val setScreen: (Screen) -> Unit
) : ListAdapter<Image, ViewHolder>(Callback.asConfig()) {

    override fun onCreateViewHolder(parent: ViewGroup, viewType: Int): ViewHolder {
        return ViewHolder(parent.inflate(R.layout.list_item))
    }

    override fun onBindViewHolder(holder: ViewHolder, position: Int) {
        holder.image.apply {
            val item = getItem(position)

            updateLayoutParams {
                val size = item.calculateScaledSize(context, numColumns)
                width = size.width
                height = size.height
            }

            var placeholder: MemoryCache.Key? = null

            load(item.uri) {
                placeholder(ColorDrawable(item.color))
                error(ColorDrawable(Color.RED))
                parameters(item.parameters)
                listener { _, result -> placeholder = result.memoryCacheKey }
            }

            setOnClickListener {
                setScreen(Screen.Detail(item, placeholder))
            }
        }
    }

    class ViewHolder(itemView: View) : RecyclerView.ViewHolder(itemView) {
        val image get() = itemView as ImageView
    }

    private object Callback : DiffUtil.ItemCallback<Image>() {
        override fun areItemsTheSame(old: Image, new: Image) = old.uri == new.uri
        override fun areContentsTheSame(old: Image, new: Image) = old == new
    }
}


```

**(c). MainActivity.kt**

> Our `MainActivity` class.

Next create a class that derives from `AppCompatActivity` and add its contents as follows:

We will be overriding the following functions: 

1. `onCreate(savedInstanceState: Bundle?) `.
2. `onCreateOptionsMenu(menu: Menu): Boolean `.
3. `onOptionsItemSelected(item: MenuItem): Boolean `.

Besides we will be creating the following methods:

1. `setScreen(parameter)`- We pass a `Screen` object as a parameter.
2. `setImages(parameter)` - We pass a `List<Image>` object as a parameter.
3. `setAssetType(parameter)` - We pass a `AssetType` object as a parameter.

Just copy the code below and replace the package with your app's package name.

```kotlin
package replace_with_your_package_name

import android.os.Build.VERSION.SDK_INT
import android.os.Bundle
import android.view.Menu
import android.view.MenuItem
import androidx.activity.OnBackPressedCallback
import androidx.activity.addCallback
import androidx.activity.viewModels
import androidx.appcompat.app.AppCompatActivity
import androidx.core.view.WindowCompat
import androidx.core.view.WindowInsetsCompat
import androidx.core.view.isVisible
import androidx.core.view.updatePadding
import androidx.lifecycle.lifecycleScope
import androidx.recyclerview.widget.StaggeredGridLayoutManager
import androidx.recyclerview.widget.StaggeredGridLayoutManager.VERTICAL
import coil.load
import coil.sample.databinding.ActivityMainBinding
import kotlinx.coroutines.launch

class MainActivity : AppCompatActivity() {

    private val viewModel: MainViewModel by viewModels()

    private lateinit var binding: ActivityMainBinding
    private lateinit var listAdapter: ImageListAdapter
    private lateinit var backPressedCallback: OnBackPressedCallback

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        binding = ActivityMainBinding.inflate(layoutInflater)
        setContentView(binding.root)
        setSupportActionBar(binding.toolbar)

        if (SDK_INT >= 29) {
            WindowCompat.setDecorFitsSystemWindows(window, false)
            binding.toolbar.setOnApplyWindowInsetsListener { view, insets ->
                view.updatePadding(
                    top = insets.toCompat().getInsets(WindowInsetsCompat.Type.systemBars()).top
                )
                insets
            }
        }

        val numColumns = numberOfColumns(this)
        listAdapter = ImageListAdapter(numColumns) { viewModel.screen.value = it }
        binding.list.apply {
            setHasFixedSize(true)
            layoutManager = StaggeredGridLayoutManager(numColumns, VERTICAL)
            adapter = listAdapter
        }

        backPressedCallback = onBackPressedDispatcher.addCallback(enabled = false) {
            viewModel.onBackPressed()
        }

        lifecycleScope.apply {
            launch { viewModel.assetType.collect(::setAssetType) }
            launch { viewModel.images.collect(::setImages) }
            launch { viewModel.screen.collect(::setScreen) }
        }
    }

    private fun setScreen(screen: Screen) {
        when (screen) {
            is Screen.List -> {
                backPressedCallback.isEnabled = false
                binding.list.isVisible = true
                binding.detail.isVisible = false
            }
            is Screen.Detail -> {
                backPressedCallback.isEnabled = true
                binding.list.isVisible = false
                binding.detail.isVisible = true
                binding.detail.load(screen.image.uri) {
                    placeholderMemoryCacheKey(screen.placeholder)
                    parameters(screen.image.parameters)
                }
            }
        }
    }

    private fun setImages(images: List<Image>) {
        listAdapter.submitList(images) {
            // Ensure we're at the top of the list when the list items are updated.
            binding.list.scrollToPosition(0)
        }
    }

    @Suppress("UNUSED_PARAMETER")
    private fun setAssetType(assetType: AssetType) {
        invalidateOptionsMenu()
    }

    override fun onCreateOptionsMenu(menu: Menu): Boolean {
        val title = viewModel.assetType.value.name
        val item = menu.add(Menu.NONE, R.id.action_toggle_asset_type, Menu.NONE, title)
        item.setShowAsAction(MenuItem.SHOW_AS_ACTION_IF_ROOM)
        return true
    }

    override fun onOptionsItemSelected(item: MenuItem): Boolean {
        when (item.itemId) {
            R.id.action_toggle_asset_type -> {
                viewModel.assetType.value = viewModel.assetType.value.next()
            }
            else -> return super.onOptionsItemSelected(item)
        }
        return true
    }
}


```

### Reference

Download the code below:

|No.|Link|
|--|---|
|1.|[Download Full Code](https://github.com/coil-kt/coil/archive/refs/heads/main.zip)|
|2.|Read more [here](https://github.com/coil-kt/coil).|
|3.|Follow code author [here](https://github.com/coil-kt).|


[loop type=example taxonomy=post_tag term=coil orderby=rating order=desc]
<h2>[loop-count]. [field title-link] </h2>
[content more=true]
<a href="[field url]">Read More.</a>


[/loop]


##  Coil Extensions and Libraries

Let us now look at libraries and extensions related to Coil. Several open source enhancements have been written to add more functionality to what Coil gives.

[loop type=post taxonomy=chapter term=coil orderby=date order=asc]

<h3>[loop-count]. [field chapter]</h3>

[field chapter_description]

<a href="[field url]">Read More.</a>


### Coil Alternatives

Here are some cool alternatives to this library:

[loop type=post taxonomy=category term=imageloader orderby=date order=asc]
<h2>[loop-count]. [field title-link] </h2>
[content more=true link=false]
<a href="[field url]">Read More.</a>
[/loop]
[else]
[/if]


