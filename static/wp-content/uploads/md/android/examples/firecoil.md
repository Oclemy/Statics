# Kotlin Android Firecoil Examples

> A step by step Firecoil example.

You can use it to Display images stored in Cloud Storage for Firebase using Coil.


![Firecoil Tutorial](https://camo.githubusercontent.com/9dfdd25ad656174e293e92d494742ae4698d35da0f31d40eac6a47a6fe74e6d4/68747470733a2f2f7472617669732d63692e6f72672f726f736172696f706665726e616e6465732f66697265636f696c2e7376673f6272616e63683d6d6173746572)

![Firecoil Tutorial](https://camo.githubusercontent.com/86b9da63b79dbdb725d4dcbaca19fcee9dd6e1fc0834163dd401691d15ff98c5/68747470733a2f2f6a69747061636b2e696f2f762f726f736172696f706665726e616e6465732f66697265636f696c2e737667)

### Basic Usage


```kotlin
val storageRef: StorageReference = ...
val imageView: ImageView = ...

imageView.load(storageRef)
```


### Custom Requests


```kotlin
val storageRef: StorageReference = ...
val imageView: ImageView = ...

imageView.load(storageRef) {
    crossfade(true)
    placeholder(R.id.placeholder)
}
```


### Full Example

Follow these steps to create a full Firecoil example.

#### Step 1. Our Android Manifest

We will need to look at our `AndroidManifest.xml`.


**(a). AndroidManifest.xml**


> Our `AndroidManifest` file.

Here we can specify permissions if necessary, register our activities, define the package name as well as register any other component like Services, ContentProviders and BroadcastReceivers. We also specify other app properties like app icon, app label and app theme. If we register an `activity` we can specify if it is a launcher activity using intent filters.

```xml
<?xml version="1.0" encoding="utf-8"?>
<manifest xmlns:android="http://schemas.android.com/apk/res/android"
    package="io.github.rosariopfernandes.firecoilsampleapp">

    <application
        android:allowBackup="true"
        android:icon="@mipmap/ic_launcher"
        android:label="@string/app_name"
        android:roundIcon="@mipmap/ic_launcher_round"
        android:supportsRtl="true"
        android:theme="@style/AppTheme">
        <activity
            android:name=".MainActivity"
            android:exported="true"
            android:label="@string/app_name"
            android:theme="@style/AppTheme.NoActionBar">
            <intent-filter>
                <action android:name="android.intent.action.MAIN" />

                <category android:name="android.intent.category.LAUNCHER" />
            </intent-filter>
        </activity>
    </application>

</manifest>
```
#### Step 2. Design Layouts

In Android we design our UI interfaces using XML. So let's create the following layouts:


**(a). activity_main.xml**


> Our `activity_main` layout.

Design your XML layout using the following 7 UI widgets and ViewGroups:

1. `androidx.coordinatorlayout.widget.CoordinatorLayout`
2. `com.google.android.material.appbar.AppBarLayout`
3. `androidx.appcompat.widget.Toolbar`
4. `androidx.constraintlayout.widget.ConstraintLayout`
5. `ImageView`
6. `TextView`
7. `Button`

```xml
<?xml version="1.0" encoding="utf-8"?>
<androidx.coordinatorlayout.widget.CoordinatorLayout xmlns:android="http://schemas.android.com/apk/res/android"
    xmlns:app="http://schemas.android.com/apk/res-auto"
    xmlns:tools="http://schemas.android.com/tools"
    android:layout_width="match_parent"
    android:layout_height="match_parent"
    tools:context="io.github.rosariopfernandes.firecoilsampleapp.MainActivity">

    <com.google.android.material.appbar.AppBarLayout
        android:layout_width="match_parent"
        android:layout_height="wrap_content"
        android:theme="@style/AppTheme.AppBarOverlay">

        <androidx.appcompat.widget.Toolbar
            android:id="@+id/toolbar"
            android:layout_width="match_parent"
            android:layout_height="?attr/actionBarSize"
            android:background="?attr/colorPrimary"
            app:popupTheme="@style/AppTheme.PopupOverlay" />

    </com.google.android.material.appbar.AppBarLayout>

    <androidx.constraintlayout.widget.ConstraintLayout
        android:layout_width="match_parent"
        android:layout_height="match_parent"
        app:layout_behavior="@string/appbar_scrolling_view_behavior">

        <ImageView
            android:id="@+id/imageView"
            android:layout_width="0dp"
            android:layout_height="0dp"
            android:layout_marginStart="16dp"
            android:layout_marginLeft="16dp"
            android:layout_marginTop="16dp"
            android:layout_marginEnd="16dp"
            android:layout_marginRight="16dp"
            android:layout_marginBottom="16dp"
            app:layout_constraintBottom_toBottomOf="parent"
            app:layout_constraintEnd_toEndOf="parent"
            app:layout_constraintHorizontal_bias="0.0"
            app:layout_constraintStart_toStartOf="parent"
            app:layout_constraintTop_toBottomOf="@+id/btnLoad"
            app:srcCompat="@mipmap/ic_launcher" />

        <TextView
            android:id="@+id/tvStatus"
            android:layout_width="0dp"
            android:layout_height="wrap_content"
            android:layout_marginStart="16dp"
            android:layout_marginLeft="16dp"
            android:layout_marginTop="16dp"
            android:layout_marginEnd="16dp"
            android:layout_marginRight="16dp"
            android:text="@string/hint_select_load"
            android:textAlignment="center"
            android:textSize="18sp"
            app:layout_constraintEnd_toEndOf="parent"
            app:layout_constraintStart_toStartOf="parent"
            app:layout_constraintTop_toTopOf="parent"
            android:layout_gravity="center_horizontal" />

        <Button
            android:id="@+id/btnImageViewKtx"
            android:layout_width="0dp"
            android:layout_height="wrap_content"
            android:layout_marginTop="8dp"
            android:text="@string/action_load_imageview_ktx"
            app:layout_constraintEnd_toEndOf="@+id/tvStatus"
            app:layout_constraintStart_toStartOf="@+id/tvStatus"
            app:layout_constraintTop_toBottomOf="@+id/tvStatus" />

        <Button
            android:id="@+id/btnGet"
            android:layout_width="0dp"
            android:layout_height="wrap_content"
            android:text="@string/action_load_imageloader_get"
            app:layout_constraintEnd_toEndOf="@+id/btnImageViewKtx"
            app:layout_constraintStart_toStartOf="@+id/btnImageViewKtx"
            app:layout_constraintTop_toBottomOf="@+id/btnImageViewKtx" />

        <Button
            android:id="@+id/btnLoad"
            android:layout_width="0dp"
            android:layout_height="wrap_content"
            android:text="@string/action_load_imageloader_load"
            app:layout_constraintEnd_toEndOf="@+id/btnGet"
            app:layout_constraintStart_toStartOf="@+id/btnGet"
            app:layout_constraintTop_toBottomOf="@+id/btnGet" />
    </androidx.constraintlayout.widget.ConstraintLayout>

</androidx.coordinatorlayout.widget.CoordinatorLayout>

```
#### Step 3. Write Code

Finally we need to write our code as follows:


**(a). MainActivity.kt**

> Our `MainActivity` class.

We will add imports from android SDK and other packages. Here are some of the imports we will use in this class:

1. `Bundle` from the `android.os` package.
2. `ImageView` from the `android.widget` package.
3. `AppCompatActivity` from the `androidx.appcompat.app` package.
4. `lifecycleScope` from the `androidx.lifecycle` package.
5. `launch` from the `kotlinx.coroutines` package.


```kotlin
package replace_with_your_package_name

import android.os.Bundle
import android.widget.ImageView
import androidx.appcompat.app.AppCompatActivity
import androidx.lifecycle.lifecycleScope
import coil.request.ErrorResult
import coil.request.SuccessResult
import com.google.firebase.ktx.Firebase
import com.google.firebase.storage.ktx.storage
import io.github.rosariopfernandes.firecoil.FireCoil
import io.github.rosariopfernandes.firecoil.load
import io.github.rosariopfernandes.firecoilsampleapp.databinding.ActivityMainBinding
import kotlinx.coroutines.launch

class MainActivity : AppCompatActivity() {

    private lateinit var binding: ActivityMainBinding
    private lateinit var imageView: ImageView

    // TODO(developer): Change this to point to your image's path in Cloud Storage
    private val storageRef = Firebase.storage.reference.child("example.jpg")

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        binding = ActivityMainBinding.inflate(layoutInflater)
        setContentView(binding.root)

        imageView = binding.imageView

        setSupportActionBar(binding.toolbar)

        binding.btnImageViewKtx.setOnClickListener {
            // Basic usage: Simply call the ImageView.load() extension function
            imageView.load(storageRef)

            // For custom requests, you can pass it a lambda function:
            // imageView.load(storageRef) {
            //     crossfade(true)
            // }
            // ...
            binding.tvStatus.text = getString(R.string.message_image_loaded, "the ImageView KTX")
        }

        binding.btnGet.setOnClickListener {
            // Since ImageLoader.get() is a suspend function,
            // it must be called from a Coroutine builder
            lifecycleScope.launch {
                val result = FireCoil.get(this@MainActivity, storageRef) {
                    // Optionally: Add get params here
                }
                when (result) {
                    is SuccessResult -> {
                        val drawable = result.drawable
                        imageView.setImageDrawable(drawable)
                        binding.tvStatus.text = getString(R.string.message_image_loaded,
                            "ImageLoader.get()")
                    }
                    is ErrorResult -> {
                        binding.tvStatus.text = getString(R.string.error_loading_image,
                            result.throwable.message)
                    }
                }
            }
            // ...
        }

        binding.btnLoad.setOnClickListener {
            val request = FireCoil.load(this, storageRef) {
                // Load into the ImageView
                target(imageView)

                // Load into any other target:
                // target { drawable ->
                //     ...
                // }
            }
            // Optionally, you can cancel the request by calling request.dispose()
            // ...
            binding.tvStatus.text = getString(R.string.message_image_loaded, "ImageLoader.load()")
        }
    }

}


```

### Reference

Download the code below:

|No.|Link|
|--|---|
|1.|[Download Full Code](https://github.com/thatfiredev/firecoil/archive/refs/heads/main.zip)|
|2.|Read more [here](https://github.com/thatfiredev/firecoil).|
|3.|Follow code author [here](https://github.com/thatfiredev).|

