# Kotlin TakePickture API Android Sample

>  An Android App of how to use` ActivityResultContracts.TakePicture()` API to get a picture from the native camera app.

An Android App of how to use `ActivityResultContracts.TakePicture()` API to get a picture from the native camera app. Learn the following

- Kotlin
-` ActivityResultContracts.TakePicture()` API
- `android.media.ExifInterface`

Steps:

- Open the app
- Marke the checkBox Fix Rotate...
- Click on TAKEPICTURE
- Take a picture from the native camera
- Check if the picture is shown on the activity rotated correctly
- Click on "i" icon to see the ExifInterface TAGS informations

Here are demo screenshots:

![TakePicture API Tutorial](https://github.com/layonmartins/TakePicktureAPIAndroidSample/raw/main/picture1.png)

![TakePicture API Tutorial](https://github.com/layonmartins/TakePicktureAPIAndroidSample/raw/main/picture2.png)


Let us look at a full `TakePicture` API Example:

#### Step 1. Dependencies

We need to add some dependencies in our `app/build.gradle` file as shown below:


**(a). `build.gradle`**

> Our app-level `build.gradle`.

We Prepare our dependencies as shown below. You may use later versions.

We will enable [`view binding`](https://android.camposha.info/en/viewbinding) by setting the `viewBinding` property to true. This will allow us to efficiently reference widgets from layout without explicitly invoking `findViewById()` function or using kotlin synthetics.

We will also enable `Java8` so that we can utilize a myriad of Java8 features.

We then declare our app dependencies under the `dependencies` closure, using the `implementation` statement. We will need the following 6 dependencies:

1. `Core-ktx` - With this we can target the latest platform features and APIs while also supporting older devices.
2. `Appcompat` - Allows us access to new APIs on older API versions of the platform (many using Material Design).
3. `Material` - Collection of Modular and customizable Material Design UI components for Android.
4. `Constraintlayout` - This allows us to Position and size widgets in a flexible way with relative positioning.
5. Our `Lifecycle-runtime-ktx` library.
6. Our `Exifinterface` library.

Here is our full `app/build.gradle`:

```groovy
plugins {
    id 'com.android.application'
    id 'org.jetbrains.kotlin.android'
}

android {
    compileSdk 32

    defaultConfig {
        applicationId "com.example.takepicturesample"
        minSdk 26
        targetSdk 32
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
    viewBinding {
        enabled = true
    }
}

dependencies {

    implementation 'androidx.core:core-ktx:1.7.0'
    implementation 'androidx.appcompat:appcompat:1.4.2'
    implementation 'com.google.android.material:material:1.6.1'
    implementation 'androidx.constraintlayout:constraintlayout:2.1.4'
    testImplementation 'junit:junit:4.13.2'
    androidTestImplementation 'androidx.test.ext:junit:1.1.3'
    androidTestImplementation 'androidx.test.espresso:espresso-core:3.4.0'

    implementation "androidx.lifecycle:lifecycle-runtime-ktx:2.4.1"
    implementation 'androidx.exifinterface:exifinterface:1.3.2'
}
```

#### Step 2. Our Android Manifest

We will need to look at our `AndroidManifest.xml`.


**(a). `AndroidManifest.xml`**

> Our `AndroidManifest` file.

Our project will have only a single [`Activity`](htpps://android.camposha.info/en/activity) but we have to register it right here as shown below: We will be defining a `meta-data` tag where we will refrence our provider paths that we define in an `raw/xml` directory. Here we will add the following permission:

1. Our `CAMERA` permission.
2. Our `WRITE_EXTERNAL_STORAGE` permission.
3. Our `READ_EXTERNAL_STORAGE` permission.

Here is the full Android Manifest file:

```xml
<?xml version="1.0" encoding="utf-8"?>
<manifest xmlns:android="http://schemas.android.com/apk/res/android"
    xmlns:tools="http://schemas.android.com/tools"
    package="com.example.takepicturesample">

    <uses-permission android:name="android.permission.CAMERA"/>
    <uses-permission android:name="android.permission.WRITE_EXTERNAL_STORAGE" />
    <uses-permission android:name="android.permission.READ_EXTERNAL_STORAGE" />

    <application
        android:allowBackup="true"
        android:dataExtractionRules="@xml/data_extraction_rules"
        android:fullBackupContent="@xml/backup_rules"
        android:icon="@mipmap/ic_launcher"
        android:label="@string/app_name"
        android:roundIcon="@mipmap/ic_launcher_round"
        android:supportsRtl="true"
        android:theme="@style/Theme.TakePictureSample"
        tools:targetApi="31">

        <provider
            android:name="androidx.core.content.FileProvider"
            android:authorities="${applicationId}.provider"
            android:exported="false"
            android:grantUriPermissions="true">
            <meta-data
                android:name="android.support.FILE_PROVIDER_PATHS"
                android:resource="@xml/provider_paths" />
        </provider>

        <activity
            android:name=".MainActivity"
            android:exported="true"
            android:screenOrientation="portrait">
            <intent-filter>
                <action android:name="android.intent.action.MAIN" />

                <category android:name="android.intent.category.LAUNCHER" />
            </intent-filter>
        </activity>
    </application>

</manifest>
```
#### Step 3. Create XML

Create a directory known as `xml` inside your `res` directory and add the following xml file:

**(a). `provider_paths.xml`**
```xml
<?xml version="1.0" encoding="utf-8"?>
<paths xmlns:tools="http://schemas.android.com/tools"
    tools:ignore="MissingDefaultResource">
    <external-cache-path
        name="external_files"
        path="take_picture_files/" />
</paths>
```

#### Step 4. Design Layouts

For this project let's create the following layouts:


**(a). `fragment_fullscreen.xml`**

> Our `fragment_fullscreen` layout.

This layout will represent our Fullscreen Fragment's layout. Specify [`ScrollView`](https://android.camposha.info/en/scrollview) as it's root element, then add the following [widgets](https://android.camposha.info/en/view):

1. [`TextView`](https://android.camposha.info/en/textview)

```xml
<?xml version="1.0" encoding="utf-8"?>
<ScrollView xmlns:android="http://schemas.android.com/apk/res/android"
    xmlns:app="http://schemas.android.com/apk/res-auto"
    xmlns:tools="http://schemas.android.com/tools"
    android:layout_width="match_parent"
    android:layout_height="match_parent"
    android:fillViewport="false">
        <TextView
            android:id="@+id/textView"
            android:layout_width="match_parent"
            android:layout_height="wrap_content"
            android:text=""
            android:inputType="textMultiLine"
            android:textSize="12sp" />
</ScrollView>
```

**(b). `activity_main.xml`**

> Our `activity_main` layout.

This layout will represent our Main Activity's layout. Specify [`androidx.constraintlayout.widget.ConstraintLayout`](https://android.camposha.info/en/constraintlayout) as it's root element then inside it place the following [widgets](https://android.camposha.info/en/view):

1. [`ImageView`](https://android.camposha.info/en/imageview)
2. [`Button`](https://android.camposha.info/en/button)
3. [`CheckBox`](https://android.camposha.info/en/checkbox)

```xml
<?xml version="1.0" encoding="utf-8"?>
<androidx.constraintlayout.widget.ConstraintLayout xmlns:android="http://schemas.android.com/apk/res/android"
    xmlns:app="http://schemas.android.com/apk/res-auto"
    xmlns:tools="http://schemas.android.com/tools"
    android:layout_width="match_parent"
    android:layout_height="match_parent"
    tools:context=".MainActivity">

    <ImageView
        android:id="@+id/imageView"
        android:layout_width="wrap_content"
        android:layout_height="wrap_content"
        app:layout_constraintBottom_toBottomOf="parent"
        app:layout_constraintEnd_toEndOf="parent"
        app:layout_constraintStart_toStartOf="parent"
        app:layout_constraintTop_toTopOf="parent"
        tools:srcCompat="@tools:sample/avatars" />

    <Button
        android:id="@+id/button"
        android:layout_width="wrap_content"
        android:layout_height="wrap_content"
        android:layout_marginEnd="8dp"
        android:layout_marginBottom="32dp"
        android:text="TakePicture"
        app:layout_constraintBottom_toBottomOf="parent"
        app:layout_constraintEnd_toEndOf="parent" />

    <CheckBox
        android:id="@+id/checkBox"
        android:layout_width="wrap_content"
        android:layout_height="wrap_content"
        android:layout_marginStart="8dp"
        android:layout_marginBottom="32dp"
        android:text="Fix Rotate if needed"
        app:layout_constraintBottom_toBottomOf="parent"
        app:layout_constraintStart_toStartOf="parent" />

    <ImageView
        android:id="@+id/imageViewExif"
        android:layout_width="32dp"
        android:layout_height="32dp"
        android:layout_marginTop="16dp"
        android:layout_marginEnd="16dp"
        android:visibility="gone"
        app:layout_constraintEnd_toEndOf="parent"
        app:layout_constraintTop_toTopOf="parent"
        app:srcCompat="@drawable/ic_baseline_info_24" />


</androidx.constraintlayout.widget.ConstraintLayout>
```

#### Step 5. Write Code

Finally we need to write our code as follows:

**(a). `Exif.kt`**

> Our `Exif` data class.

Create a Kotlin file named `Exif.kt` .

Here is the full code:

```kotlin
package replace_with_your_package_name

data class Exif(
    var IS_ROTATED: String? = "No need to rotate",
    var TAG_DATETIME: String? = null,
    var TAG_DATETIME_ORIGINAL: String? = null,
    var TAG_IMAGE_DESCRIPTION: String? = null,
    var TAG_IMAGE_LENGTH: String? = null,
    var TAG_IMAGE_WIDTH: String? = null,
    var TAG_JPEG_INTERCHANGE_FORMAT: String? = null,
    var TAG_ORIENTATION: String? = null,
    var TAG_REFERENCE_BLACK_WHITE: String? = null,
    var TAG_RESOLUTION_UNIT: String? = null,
    var TAG_SOFTWARE: String? = null,
    var TAG_BRIGHTNESS_VALUE: String? = null,
    var TAG_CONTRAST: String? = null,
    var TAG_DEVICE_SETTING_DESCRIPTION: String? = null,
    var TAG_DIGITAL_ZOOM_RATIO: String? = null,
    var TAG_EXIF_VERSION: String? = null,
    var TAG_EXPOSURE_PROGRAM: String? = null,
    var TAG_FLASH: String? = null,
    var TAG_FLASH_ENERGY: String? = null,
    var TAG_FOCAL_LENGTH: String? = null,
    var TAG_SATURATION: String? = null,
    var TAG_SCENE_CAPTURE_TYPE: String? = null,
    var TAG_WHITE_BALANCE: String? = null,
    var TAG_GPS_ALTITUDE: String? = null,
    var TAG_GPS_AREA_INFORMATION: String? = null,
    var TAG_GPS_IMG_DIRECTION: String? = null,
    var TAG_GPS_LATITUDE: String? = null,
    var TAG_GPS_LONGITUDE: String? = null,
    var TAG_GPS_SPEED: String? = null,
    var TAG_THUMBNAIL_IMAGE_LENGTH: String? = null,
    var TAG_THUMBNAIL_IMAGE_WIDTH: String? = null,
    var TAG_THUMBNAIL_ORIENTATION: String? = null,
)

```

**(b). `TakePictureViewModel.kt`**

> Our `TakePictureViewModel` class. This our Viewmodel class.

Create a Kotlin file named `TakePictureViewModel.kt` and add the necessary imports. Here are some of the imports we will be using:

1. `Uri` from the `android.net` package.
2. `ViewModel` from the `androidx.lifecycle` package.

Then extend the `ViewModel` to make it a `ViewModel` class and add its contents as follows:

Here is the full code:

```kotlin
package replace_with_your_package_name

import android.net.Uri
import androidx.lifecycle.ViewModel

class TakePictureViewModel : ViewModel() {
    var tempUri: Uri? = null
}

```

**(c). `FullscreenFragment.kt`**

> Our `FullscreenFragment` class.

Create a Kotlin file named `FullscreenFragment.kt` and add the necessary imports. Here are some of the imports we will be using:

1. `Log` from the `android.util` package.
2. `LayoutInflater` from the `android.view` package.
3. `View` from the `android.view` package.
4. `ViewGroup` from the `android.view` package.
5. `DialogFragment` from the `androidx.fragment.app` package.

Then extend the `DialogFragment` and add its contents as follows:

First override these callbacks: 

1. `onCreate(savedInstanceState: Bundle?) `.

Then we will be creating the following functions:

1. `setBinding(parameter)` - Pass to this method a `FragmentFullscreenBinding?` object as a parameter.
2. `binding(inflater: LayoutInflater, container: ViewGroup?): View? `.

**(a). Our `binding()` function**


Write the `binding()` function as follows:
- Pass a `LayoutInflater` object as well as a `ViewGroup` object.
- Inflate the Fragment layout and return the inflated `View`

```kotlin
    fun binding(inflater: LayoutInflater, container: ViewGroup?): View? {
        _binding = FragmentFullscreenBinding.inflate(inflater, container, false)
        return binding.root
    }
```

**(b). Our `setBinding()` function**

Write the `setBinding()` function as follows:
- Receive a `FragmentFullscreenBinding` object.
- Set it to our `_binding` property.

```kotlin
    fun setBinding(binding: FragmentFullscreenBinding?) {
        _binding = binding
    }
```


Here is the full code:

```kotlin
package replace_with_your_package_name

import android.annotation.SuppressLint
import android.os.Bundle
import android.util.Log
import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import androidx.fragment.app.DialogFragment
import com.example.takepicturesample.Exif
import com.example.takepicturesample.R
import com.example.takepicturesample.databinding.FragmentFullscreenBinding


class FullscreenFragmnet(val exif: Exif) : DialogFragment() {

    private var _binding: FragmentFullscreenBinding? = null
    private val binding get() = _binding!!

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
    }

    override fun onCreateView(
        inflater: LayoutInflater,
        container: ViewGroup?,
        savedInstanceState: Bundle?
    ): View? {
        return binding(inflater, container)
    }

    fun setBinding(binding: FragmentFullscreenBinding?) {
        _binding = binding
    }

    fun binding(inflater: LayoutInflater, container: ViewGroup?): View? {
        _binding = FragmentFullscreenBinding.inflate(inflater, container, false)
        return binding.root
    }

    @SuppressLint("SetTextI18n")
    override fun onViewCreated(
        view: View,
        savedInstanceState: Bundle?
    ) {
        binding.apply {
            textView.text =
                "ORIENTATION INFOS: \n" +
                        "\n" + (exif.IS_ROTATED ?: "") +
                        "\nTAG_ORIENTATION: " + (exif.TAG_ORIENTATION ?: "null") +
                        "\n// Constants used for the Orientation Exif tag." +
                        "\npublic static final int ORIENTATION_UNDEFINED = 0;" +
                        "\npublic static final int ORIENTATION_NORMAL = 1;" +
                        "\npublic static final int ORIENTATION_FLIP_HORIZONTAL = 2;  // left right reversed mirror" +
                        "\npublic static final int ORIENTATION_ROTATE_180 = 3;" +
                        "\npublic static final int ORIENTATION_FLIP_VERTICAL = 4;  // upside down mirror" +
                        "\n// flipped about top-left <--> bottom-right axis" +
                        "\npublic static final int ORIENTATION_TRANSPOSE = 5;" +
                        "\npublic static final int ORIENTATION_ROTATE_90 = 6;  // rotate 90 cw to right it" +
                        "\n// flipped about top-right <--> bottom-left axis" +
                        "\npublic static final int ORIENTATION_TRANSVERSE = 7;" +
                        "\npublic static final int ORIENTATION_ROTATE_270 = 8;  // rotate 270 to right it" +
                        "\n// Constants used for white balance" +
                        "\npublic static final int WHITEBALANCE_AUTO = 0;" +
                        "\npublic static final int WHITEBALANCE_MANUAL = 1;" +

                        "\n\nEXIF TAGS INFOS: \n" +
                        "TAG_DATETIME: " + (exif.TAG_DATETIME ?: "null") +
                        "\nTAG_IMAGE_DESCRIPTION: " + (exif.TAG_IMAGE_DESCRIPTION ?: "null") +
                        "\nTAG_IMAGE_LENGTH: " + (exif.TAG_IMAGE_LENGTH ?: "null") +
                        "\nTAG_IMAGE_WIDTH: " + (exif.TAG_IMAGE_WIDTH ?: "null") +
                        "\nTAG_JPEG_INTERCHANGE_FORMAT: " + (exif.TAG_JPEG_INTERCHANGE_FORMAT
                    ?: "null") +
                        "\nTAG_REFERENCE_BLACK_WHITE: " + (exif.TAG_REFERENCE_BLACK_WHITE
                    ?: "null") +
                        "\nTAG_RESOLUTION_UNIT: " + (exif.TAG_RESOLUTION_UNIT ?: "null") +
                        "\nTAG_SOFTWARE: " + (exif.TAG_SOFTWARE ?: "null") +
                        "\nTAG_BRIGHTNESS_VALUE: " + (exif.TAG_BRIGHTNESS_VALUE ?: "null") +
                        "\nTAG_CONTRAST: " + (exif.TAG_CONTRAST ?: "null") +
                        "\nTAG_DEVICE_SETTING_DESCRIPTION: " + (exif.TAG_DEVICE_SETTING_DESCRIPTION
                    ?: "null") +
                        "\nTAG_DIGITAL_ZOOM_RATIO: " + (exif.TAG_DIGITAL_ZOOM_RATIO ?: "null") +
                        "\nTAG_EXIF_VERSION: " + (exif.TAG_EXIF_VERSION ?: "null") +
                        "\nTAG_EXPOSURE_PROGRAM: " + (exif.TAG_EXPOSURE_PROGRAM ?: "null") +
                        "\nTAG_FLASH: " + (exif.TAG_FLASH ?: "null") +
                        "\nTAG_FLASH_ENERGY: " + (exif.TAG_FLASH_ENERGY ?: "null") +
                        "\nTAG_FOCAL_LENGTH: " + (exif.TAG_FOCAL_LENGTH ?: "null") +
                        "\nTAG_SATURATION: " + (exif.TAG_SATURATION ?: "null") +
                        "\nTAG_SCENE_CAPTURE_TYPE: " + (exif.TAG_SCENE_CAPTURE_TYPE ?: "null") +
                        "\nTAG_WHITE_BALANCE: " + (exif.TAG_WHITE_BALANCE ?: "null") +
                        "\nTAG_GPS_ALTITUDE: " + (exif.TAG_GPS_ALTITUDE ?: "null") +
                        "\nTAG_GPS_AREA_INFORMATION: " + (exif.TAG_GPS_AREA_INFORMATION ?: "null") +
                        "\nTAG_GPS_IMG_DIRECTION: " + (exif.TAG_GPS_IMG_DIRECTION ?: "null") +
                        "\nTAG_GPS_LATITUDE: " + (exif.TAG_GPS_LATITUDE ?: "null") +
                        "\nTAG_GPS_LONGITUDE: " + (exif.TAG_GPS_LONGITUDE ?: "null") +
                        "\nTAG_GPS_SPEED: " + (exif.TAG_GPS_SPEED ?: "null") +
                        "\nTAG_THUMBNAIL_IMAGE_LENGTH: " + (exif.TAG_THUMBNAIL_IMAGE_LENGTH
                    ?: "null") +
                        "\nTAG_THUMBNAIL_IMAGE_WIDTH: " + (exif.TAG_THUMBNAIL_IMAGE_WIDTH
                    ?: "null") +
                        "\nTAG_THUMBNAIL_ORIENTATION: " + (exif.TAG_THUMBNAIL_ORIENTATION ?: "null")
        }
    }
}

```

**(d). `MainActivity.kt`**

> Our `MainActivity` class.

Create a Kotlin file named `MainActivity.kt` and add the necessary imports. Here are some of the imports we will be using:

1. `ContextCompat` from the `androidx.core.content` package.
2. `FileProvider` from the `androidx.core.content` package.
3. `FragmentTransaction` from the `androidx.fragment.app` package.
4. `ViewModelProvider` from the `androidx.lifecycle` package.
5. `lifecycleScope` from the `androidx.lifecycle` package.

Then extend the `AppCompatActivity` and add its contents as follows:

First override these callbacks: 

1. `onCreate(savedInstanceState: Bundle?) `.

Then we will be creating the following functions:

1. `requestPermissionToCapturePhotoIfNeeded() `.
2. `capturePhoto() `.
3. `getNewTempFileUri(): Uri `.
4. `getExifInterfaceRotation(parameter)` - We pass a `Uri` object as a parameter.
5. `getSomeExifTags(parameter)` - We pass a `ExifInterface?` object as a parameter.
6. `turnBitmap(bitmap: Bitmap, degrees: Float): Bitmap `.
7. `setupRequestPermissionLauncherResult() `.
8. `hasPermission(context: Context, permission: String): Boolean `.

**(a). Our `requestPermissionIfNeeded()` function**

This function will allow us to request permissions when necessary. We need the permissions we had defined in our `AndroidManifest.xml` file. Write the `requestPermissionIfNeeded()` function as follows:

- Receive the `Context`,`String` and `ActivityResultLauncher` as parameters.
- Check if permission has already been granted, if not launch permission prompt.

```kotlin
        fun requestPermissionIfNeeded(
            context: Context,
            permission: String,
            requestPermissionLauncher: ActivityResultLauncher<String>
        ) {
            if (!hasPermission(context, permission)) {
                // The permission callback will be called inside requestPermissionLauncher object:
                requestPermissionLauncher.launch(permission)
            }
        }
```

**(b). Our `setupRequestPermissionLauncherResult()` function**

This function will allow us to set the permission launch result. Write the `setupRequestPermissionLauncherResult()` function as follows:

```kotlin
    fun setupRequestPermissionLauncherResult() {
        requestPermissionLauncher =
            registerForActivityResult(
                ActivityResultContracts.RequestPermission()
            ) { isGranted: Boolean ->
                if (isGranted) {
                    capturePhoto()
                }
            }
    }
```

**(c). Our `capturePhoto()` function**

This function will allow us to capture photos. Write the `capturePhoto()` function as follows:

```kotlin
    private fun capturePhoto() {
        Log.d("layon.f", "capturePhoto()")
        lifecycleScope.launchWhenStarted {
            getNewTempFileUri().let { uri ->
                Log.d("layon.f", "capturePhoto() tempUri = $uri")
                takePictureViewModel.tempUri = uri
                takeImageResult.launch(uri)
            }
        }
    }
```

**(d). Our `requestPermissionToCapturePhotoIfNeeded()` function**

This function will allow us to request permission to capture a photo if the permission is yet to be granted. Write the `requestPermissionToCapturePhotoIfNeeded()` function as follows:

```kotlin
    fun requestPermissionToCapturePhotoIfNeeded() {
        Log.d("layon.f", "requestPermissionToCapturePhotoIfNeeded()")
        if (!hasPermission(
                this,
                android.Manifest.permission.CAMERA
            )
        ) {
            requestPermissionIfNeeded(
                this,
                android.Manifest.permission.CAMERA,
                requestPermissionLauncher
            )
        } else {
            capturePhoto()
        }
    }
```

**(e). Our `getSomeExifTags()` function**

Write the `getSomeExifTags()` function as follows:

```kotlin
    fun getSomeExifTags(exif: ExifInterface?) {
        exif?.let {
            exifData.apply {
                TAG_DATETIME = it.getAttribute(ExifInterface.TAG_DATETIME)
                TAG_DATETIME_ORIGINAL = it.getAttribute(ExifInterface.TAG_DATETIME_ORIGINAL)
                TAG_IMAGE_DESCRIPTION = it.getAttribute(ExifInterface.TAG_IMAGE_DESCRIPTION)
                TAG_IMAGE_LENGTH = it.getAttribute(ExifInterface.TAG_IMAGE_LENGTH)
                TAG_IMAGE_WIDTH = it.getAttribute(ExifInterface.TAG_IMAGE_WIDTH)
                TAG_JPEG_INTERCHANGE_FORMAT =
                    it.getAttribute(ExifInterface.TAG_JPEG_INTERCHANGE_FORMAT)
                TAG_ORIENTATION = it.getAttribute(ExifInterface.TAG_ORIENTATION)
                TAG_REFERENCE_BLACK_WHITE = it.getAttribute(ExifInterface.TAG_REFERENCE_BLACK_WHITE)
                TAG_RESOLUTION_UNIT = it.getAttribute(ExifInterface.TAG_RESOLUTION_UNIT)
                TAG_SOFTWARE = it.getAttribute(ExifInterface.TAG_SOFTWARE)
                TAG_BRIGHTNESS_VALUE = it.getAttribute(ExifInterface.TAG_BRIGHTNESS_VALUE)
                TAG_CONTRAST = it.getAttribute(ExifInterface.TAG_CONTRAST)
                TAG_DEVICE_SETTING_DESCRIPTION =
                    it.getAttribute(ExifInterface.TAG_DEVICE_SETTING_DESCRIPTION)
                TAG_DIGITAL_ZOOM_RATIO = it.getAttribute(ExifInterface.TAG_DIGITAL_ZOOM_RATIO)
                TAG_EXIF_VERSION = it.getAttribute(ExifInterface.TAG_EXIF_VERSION)
                TAG_EXPOSURE_PROGRAM = it.getAttribute(ExifInterface.TAG_EXPOSURE_PROGRAM)
                TAG_FLASH = it.getAttribute(ExifInterface.TAG_FLASH)
                TAG_FLASH_ENERGY = it.getAttribute(ExifInterface.TAG_FLASH_ENERGY)
                TAG_FOCAL_LENGTH = it.getAttribute(ExifInterface.TAG_FOCAL_LENGTH)
                TAG_SATURATION = it.getAttribute(ExifInterface.TAG_SATURATION)
                TAG_SCENE_CAPTURE_TYPE = it.getAttribute(ExifInterface.TAG_SCENE_CAPTURE_TYPE)
                TAG_WHITE_BALANCE = it.getAttribute(ExifInterface.TAG_WHITE_BALANCE)
                TAG_GPS_ALTITUDE = it.getAttribute(ExifInterface.TAG_GPS_ALTITUDE)
                TAG_GPS_AREA_INFORMATION = it.getAttribute(ExifInterface.TAG_GPS_AREA_INFORMATION)
                TAG_GPS_IMG_DIRECTION = it.getAttribute(ExifInterface.TAG_GPS_IMG_DIRECTION)
                TAG_GPS_LATITUDE = it.getAttribute(ExifInterface.TAG_GPS_LATITUDE)
                TAG_GPS_LONGITUDE = it.getAttribute(ExifInterface.TAG_GPS_LONGITUDE)
                TAG_GPS_SPEED = it.getAttribute(ExifInterface.TAG_GPS_SPEED)
                TAG_THUMBNAIL_IMAGE_LENGTH =
                    it.getAttribute(ExifInterface.TAG_THUMBNAIL_IMAGE_LENGTH)
                TAG_THUMBNAIL_IMAGE_WIDTH = it.getAttribute(ExifInterface.TAG_THUMBNAIL_IMAGE_WIDTH)
                //TAG_THUMBNAIL_ORIENTATION = it.getAttribute(ExifInterface.TAG_THUMBNAIL_ORIENTATION)
            }
        }
    }
```

**(f). Our `getNewTempFileUri()` function**

This function will allow us to get the temporary file `Uri`. Write the `getNewTempFileUri()` function as follows:

```kotlin
    private fun getNewTempFileUri(): Uri {
        Log.d("layon.f", "getNewTempFileUri()")

        val path = File(this.externalCacheDir, "take_picture_files/")
        path.mkdir()

        val tmpFile =
            File.createTempFile("img", ".png", path)
                .apply {
                    createNewFile()
                    deleteOnExit()
                }

        return FileProvider.getUriForFile(
            this,
            this.applicationContext.packageName + ".provider",
            tmpFile
        )
    }
```

**(g). Our `turnBitmap()` function**

Write the `turnBitmap()` function as follows:

```kotlin
    fun turnBitmap(bitmap: Bitmap, degrees: Float): Bitmap {
        Log.d("layon.f", "turnBitmap() degrees: $degrees")
        val matrix = Matrix()
        matrix.postRotate(degrees)
        return Bitmap.createBitmap(
            bitmap,
            0,
            0,
            bitmap.width,
            bitmap.height,
            matrix,
            true
        )
    }
```

**(h). Our `hasPermission()` function**

Write the `hasPermission()` function as follows:

```kotlin
        fun hasPermission(context: Context, permission: String): Boolean {
            return ContextCompat.checkSelfPermission(
                context,
                permission
            ) == PackageManager.PERMISSION_GRANTED
        }
```

**(i). Our `getExifInterfaceRotation()` function**

Write the `getExifInterfaceRotation()` function as follows:

```kotlin
    fun getExifInterfaceRotation(uri: Uri): Int? {
        Log.d("layon.f", "getExifInterfaceRotation(uri: $uri)")
        val inputStream: InputStream? = contentResolver.openInputStream(uri)
        try {
            val exif = inputStream?.let { ExifInterface(it) }
            Log.d("layon.f", "exif: ${exif}")
            getSomeExifTags(exif)
            val TAG_ORIENTATION = exif?.getAttribute(ExifInterface.TAG_ORIENTATION)
            Log.d("layon.f", "ExifInterface.TAG_ORIENTATION: $TAG_ORIENTATION")
            // Constants used for the Orientation Exif tag in ExifInterface.java line 503.
            var orientation: Int? = when (TAG_ORIENTATION?.toInt()) {
                ExifInterface.ORIENTATION_UNDEFINED -> null
                ExifInterface.ORIENTATION_NORMAL -> null
                ExifInterface.ORIENTATION_FLIP_HORIZONTAL -> null // left right reversed mirror
                ExifInterface.ORIENTATION_ROTATE_180 -> 180
                ExifInterface.ORIENTATION_FLIP_VERTICAL -> null
                ExifInterface.ORIENTATION_TRANSPOSE -> null
                ExifInterface.ORIENTATION_ROTATE_90 -> 90 // rotate 90 cw to right it
                ExifInterface.ORIENTATION_TRANSVERSE -> null
                ExifInterface.ORIENTATION_ROTATE_270 -> 270 // rotate 270 to right it
                else -> null
            }
            Log.d("layon.f", "getExifInterfaceRotation() return $orientation")
            return orientation
        } catch (e: IOException) {
            // handler
        } finally {
            if (inputStream != null) {
                try {
                    inputStream.close()
                } catch (e: IOException) {

                }
            }
        }
        return null
    }
```

**(j). Our `showFullDialogInfos()` function**

Write the `showFullDialogInfos()` function as follows:

```kotlin
        fun showFullDialogInfos(
            context: Context,
            # String,
            fragmentTransaction: FragmentTransaction,
            exifData: Exif
        ) {
            val dialog = FullscreenFragmnet(exifData)
            dialog.show(fragmentTransaction, null)
        }
```


Here is the full code:

```kotlin
package replace_with_your_package_name

import android.content.Context
import android.content.pm.PackageManager
import android.graphics.Bitmap
import android.graphics.Matrix
import androidx.exifinterface.media.ExifInterface
import android.net.Uri
import androidx.appcompat.app.AppCompatActivity
import android.os.Bundle
import android.provider.MediaStore
import android.util.Log
import android.view.View
import android.widget.Button
import android.widget.CheckBox
import android.widget.ImageView
import android.widget.Toast
import androidx.activity.result.ActivityResultLauncher
import androidx.activity.result.contract.ActivityResultContracts
import androidx.core.content.ContextCompat
import androidx.core.content.FileProvider
import androidx.fragment.app.FragmentTransaction
import androidx.lifecycle.ViewModelProvider
import androidx.lifecycle.lifecycleScope
import net.weg.wemob.commons.services.dialog.FullscreenFragmnet
import java.io.File
import java.io.IOException
import java.io.InputStream

class MainActivity : AppCompatActivity() {

    private lateinit var takePictureViewModel: TakePictureViewModel
    private lateinit var requestPermissionLauncher: ActivityResultLauncher<String>
    private lateinit var buttonShowTags: ImageView
    private var exifData: Exif = Exif()

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_main)
        setupRequestPermissionLauncherResult()

        takePictureViewModel = ViewModelProvider(this).get(TakePictureViewModel::class.java)

        findViewById<Button>(R.id.button).setOnClickListener {
            requestPermissionToCapturePhotoIfNeeded()
            Log.d("layon.f", "onClick")
        }

        buttonShowTags = findViewById<ImageView>(R.id.imageViewExif)
        buttonShowTags.setOnClickListener {
            Log.d("layon.f", "ShowTags")
            showFullDialogInfos(
                context = this,
                title = "Image Exif",
                fragmentTransaction = supportFragmentManager.beginTransaction(),
                exifData = exifData
            )
        }

    }

    /**  This method will ask for permission if photo capture is required. */
    fun requestPermissionToCapturePhotoIfNeeded() {
        Log.d("layon.f", "requestPermissionToCapturePhotoIfNeeded()")
        if (!hasPermission(
                this,
                android.Manifest.permission.CAMERA
            )
        ) {
            requestPermissionIfNeeded(
                this,
                android.Manifest.permission.CAMERA,
                requestPermissionLauncher
            )
        } else {
            capturePhoto()
        }
    }

    /**  Open the camera to capture photo. */

    private fun capturePhoto() {
        Log.d("layon.f", "capturePhoto()")
        lifecycleScope.launchWhenStarted {
            getNewTempFileUri().let { uri ->
                Log.d("layon.f", "capturePhoto() tempUri = $uri")
                takePictureViewModel.tempUri = uri
                takeImageResult.launch(uri)
            }
        }
    }

    /**  Creates a file temporarily to save the photo in full size. */
    private fun getNewTempFileUri(): Uri {
        Log.d("layon.f", "getNewTempFileUri()")

        val path = File(this.externalCacheDir, "take_picture_files/")
        path.mkdir()

        val tmpFile =
            File.createTempFile("img", ".png", path)
                .apply {
                    createNewFile()
                    deleteOnExit()
                }

        return FileProvider.getUriForFile(
            this,
            this.applicationContext.packageName + ".provider",
            tmpFile
        )
    }

    /**  Note the change result of camera. */
    private val takeImageResult =
        registerForActivityResult(ActivityResultContracts.TakePicture()) { isSuccess ->

            if (isSuccess) {
                Log.d("layon.f", "takeImageResult isSuccess")
                Log.d("layon.f", "takeImageResult tempUri: ${takePictureViewModel.tempUri}")
                takePictureViewModel.tempUri?.let { uri ->
                    var bitmap = MediaStore.Images.Media.getBitmap(
                        this.contentResolver,
                        uri
                    )
                    getExifInterfaceRotation(uri)?.let { rotate ->
                        Log.d("layon.f", "need rotate to $rotate degrees")
                        var textRotate = "Need to rotate $rotate degrees"
                        exifData.IS_ROTATED = textRotate
                        val needRotate = findViewById<CheckBox>(R.id.checkBox).isChecked
                        if (needRotate) {
                            if (rotate > 0) {
                                textRotate = "It was necessary to rotate $rotate degrees"
                                exifData.IS_ROTATED = textRotate
                                Toast.makeText(
                                    applicationContext,
                                    textRotate,
                                    Toast.LENGTH_LONG
                                ).show()
                                bitmap = turnBitmap(bitmap, rotate.toFloat())
                            } else {
                                textRotate = "No need to rotate"
                                exifData.IS_ROTATED = textRotate
                                Toast.makeText(
                                    applicationContext,
                                    textRotate,
                                    Toast.LENGTH_LONG
                                ).show()
                            }
                        }
                    }
                    Log.d("layon.f", "imageView() .setImageBitmap()")
                    findViewById<ImageView>(R.id.imageView).setImageBitmap(
                        bitmap
                    )
                    buttonShowTags.visibility = View.VISIBLE
                }
            }
        }

    fun getExifInterfaceRotation(uri: Uri): Int? {
        Log.d("layon.f", "getExifInterfaceRotation(uri: $uri)")
        val inputStream: InputStream? = contentResolver.openInputStream(uri)
        try {
            val exif = inputStream?.let { ExifInterface(it) }
            Log.d("layon.f", "exif: ${exif}")
            getSomeExifTags(exif)
            val TAG_ORIENTATION = exif?.getAttribute(ExifInterface.TAG_ORIENTATION)
            Log.d("layon.f", "ExifInterface.TAG_ORIENTATION: $TAG_ORIENTATION")
            // Constants used for the Orientation Exif tag in ExifInterface.java line 503.
            var orientation: Int? = when (TAG_ORIENTATION?.toInt()) {
                ExifInterface.ORIENTATION_UNDEFINED -> null
                ExifInterface.ORIENTATION_NORMAL -> null
                ExifInterface.ORIENTATION_FLIP_HORIZONTAL -> null // left right reversed mirror
                ExifInterface.ORIENTATION_ROTATE_180 -> 180
                ExifInterface.ORIENTATION_FLIP_VERTICAL -> null
                ExifInterface.ORIENTATION_TRANSPOSE -> null
                ExifInterface.ORIENTATION_ROTATE_90 -> 90 // rotate 90 cw to right it
                ExifInterface.ORIENTATION_TRANSVERSE -> null
                ExifInterface.ORIENTATION_ROTATE_270 -> 270 // rotate 270 to right it
                else -> null
            }
            Log.d("layon.f", "getExifInterfaceRotation() return $orientation")
            return orientation
        } catch (e: IOException) {
            // handler
        } finally {
            if (inputStream != null) {
                try {
                    inputStream.close()
                } catch (e: IOException) {

                }
            }
        }
        return null
    }

    fun getSomeExifTags(exif: ExifInterface?) {
        exif?.let {
            exifData.apply {
                TAG_DATETIME = it.getAttribute(ExifInterface.TAG_DATETIME)
                TAG_DATETIME_ORIGINAL = it.getAttribute(ExifInterface.TAG_DATETIME_ORIGINAL)
                TAG_IMAGE_DESCRIPTION = it.getAttribute(ExifInterface.TAG_IMAGE_DESCRIPTION)
                TAG_IMAGE_LENGTH = it.getAttribute(ExifInterface.TAG_IMAGE_LENGTH)
                TAG_IMAGE_WIDTH = it.getAttribute(ExifInterface.TAG_IMAGE_WIDTH)
                TAG_JPEG_INTERCHANGE_FORMAT =
                    it.getAttribute(ExifInterface.TAG_JPEG_INTERCHANGE_FORMAT)
                TAG_ORIENTATION = it.getAttribute(ExifInterface.TAG_ORIENTATION)
                TAG_REFERENCE_BLACK_WHITE = it.getAttribute(ExifInterface.TAG_REFERENCE_BLACK_WHITE)
                TAG_RESOLUTION_UNIT = it.getAttribute(ExifInterface.TAG_RESOLUTION_UNIT)
                TAG_SOFTWARE = it.getAttribute(ExifInterface.TAG_SOFTWARE)
                TAG_BRIGHTNESS_VALUE = it.getAttribute(ExifInterface.TAG_BRIGHTNESS_VALUE)
                TAG_CONTRAST = it.getAttribute(ExifInterface.TAG_CONTRAST)
                TAG_DEVICE_SETTING_DESCRIPTION =
                    it.getAttribute(ExifInterface.TAG_DEVICE_SETTING_DESCRIPTION)
                TAG_DIGITAL_ZOOM_RATIO = it.getAttribute(ExifInterface.TAG_DIGITAL_ZOOM_RATIO)
                TAG_EXIF_VERSION = it.getAttribute(ExifInterface.TAG_EXIF_VERSION)
                TAG_EXPOSURE_PROGRAM = it.getAttribute(ExifInterface.TAG_EXPOSURE_PROGRAM)
                TAG_FLASH = it.getAttribute(ExifInterface.TAG_FLASH)
                TAG_FLASH_ENERGY = it.getAttribute(ExifInterface.TAG_FLASH_ENERGY)
                TAG_FOCAL_LENGTH = it.getAttribute(ExifInterface.TAG_FOCAL_LENGTH)
                TAG_SATURATION = it.getAttribute(ExifInterface.TAG_SATURATION)
                TAG_SCENE_CAPTURE_TYPE = it.getAttribute(ExifInterface.TAG_SCENE_CAPTURE_TYPE)
                TAG_WHITE_BALANCE = it.getAttribute(ExifInterface.TAG_WHITE_BALANCE)
                TAG_GPS_ALTITUDE = it.getAttribute(ExifInterface.TAG_GPS_ALTITUDE)
                TAG_GPS_AREA_INFORMATION = it.getAttribute(ExifInterface.TAG_GPS_AREA_INFORMATION)
                TAG_GPS_IMG_DIRECTION = it.getAttribute(ExifInterface.TAG_GPS_IMG_DIRECTION)
                TAG_GPS_LATITUDE = it.getAttribute(ExifInterface.TAG_GPS_LATITUDE)
                TAG_GPS_LONGITUDE = it.getAttribute(ExifInterface.TAG_GPS_LONGITUDE)
                TAG_GPS_SPEED = it.getAttribute(ExifInterface.TAG_GPS_SPEED)
                TAG_THUMBNAIL_IMAGE_LENGTH =
                    it.getAttribute(ExifInterface.TAG_THUMBNAIL_IMAGE_LENGTH)
                TAG_THUMBNAIL_IMAGE_WIDTH = it.getAttribute(ExifInterface.TAG_THUMBNAIL_IMAGE_WIDTH)
                //TAG_THUMBNAIL_ORIENTATION = it.getAttribute(ExifInterface.TAG_THUMBNAIL_ORIENTATION)
            }
        }
    }

    fun turnBitmap(bitmap: Bitmap, degrees: Float): Bitmap {
        Log.d("layon.f", "turnBitmap() degrees: $degrees")
        val matrix = Matrix()
        matrix.postRotate(degrees)
        return Bitmap.createBitmap(
            bitmap,
            0,
            0,
            bitmap.width,
            bitmap.height,
            matrix,
            true
        )
    }

    /** This method will create an object that will receive the user request permission result. */
    fun setupRequestPermissionLauncherResult() {
        requestPermissionLauncher =
            registerForActivityResult(
                ActivityResultContracts.RequestPermission()
            ) { isGranted: Boolean ->
                if (isGranted) {
                    capturePhoto()
                }
            }
    }

    companion object {
        /**
         * Function to check if given permission is granted or not
         */
        fun hasPermission(context: Context, permission: String): Boolean {
            return ContextCompat.checkSelfPermission(
                context,
                permission
            ) == PackageManager.PERMISSION_GRANTED
        }

        /**
         * Function to request the permission if needed
         */
        fun requestPermissionIfNeeded(
            context: Context,
            permission: String,
            requestPermissionLauncher: ActivityResultLauncher<String>
        ) {
            if (!hasPermission(context, permission)) {
                // The permission callback will be called inside requestPermissionLauncher object:
                requestPermissionLauncher.launch(permission)
            }
        }

        /**
         * This method will setup and show a dialog full screen for error handling.
         */
        fun showFullDialogInfos(
            context: Context,
            # String,
            fragmentTransaction: FragmentTransaction,
            exifData: Exif
        ) {
            val dialog = FullscreenFragmnet(exifData)
            dialog.show(fragmentTransaction, null)
        }
    }
}

```

### Reference

Download the code below:

|No.|Link|
|--|---|
|1.|[Download Full Code](https://github.com/layonmartins/TakePicktureAPIAndroidSample/archive/refs/heads/main.zip)|
|2.|Read more [here](https://github.com/layonmartins/TakePicktureAPIAndroidSample).|
|3.|Follow code author [here](https://github.com/layonmartins).|
