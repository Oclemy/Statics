# Firebase ML Kit - Image Recognition

>  Image recognition app build with Firebase..

![Firebase MLKiit Image Recognition Tutorial](https://camo.githubusercontent.com/429fb023d6c4078aa0e5c7009a3f2e9dba7927355d5f9ce27d0d2a9ca7a3e658/68747470733a2f2f63646e2e61757468302e636f6d2f626c6f672f6d6c2d6b69742d73646b2f616e64726f69642d6d6c2d6b69742d6d616368696e652d6c6561726e696e672d73646b2d6c6f676f2e706e67)

![Firebase MLKiit Image Recognition Tutorial](https://github.com/enzoftware/mlkit-image-recognition/raw/master/art/mlkitgif.gif)

Follow these steps to create a full Firebase MLKit Image Recognition example.

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


We then declare our app dependencies under the `dependencies` closure. We will need the following 13 dependencies:

1. Our `Kotlin-stdlib-jdk7` library.
2. Our `Multidex` library.
3. Our `Appcompat-v7` library.
4. Our `Design` library.
5. Our `Support-media-compat` support library. Feel free to use newer AndroidX versions.
6. Our `Constraint-layout` library.
7. Our `Firebase-ml-vision` library.
8. Our `Firebase-ml-vision-image-label-model` library.
9. Our `Firebase-core` library.
10. Our `Fotoapparat` library.
11. Our `Dexter` library.
12. Our `Cardview-v7` library.
13. Our `Firebase-database` library.

Here is our full `app/build.gradle`:

```groovy
apply plugin: 'com.android.application'

apply plugin: 'kotlin-android'

apply plugin: 'kotlin-android-extensions'

apply plugin: 'com.google.gms.google-services'

android {
    compileSdkVersion 27
    defaultConfig {
        applicationId "com.projects.enzoftware.firebasemlkit"
        minSdkVersion 22
        targetSdkVersion 27
        versionCode 1
        versionName "1.0"
        testInstrumentationRunner "android.support.test.runner.AndroidJUnitRunner"
        multiDexEnabled true
    }
    buildTypes {
        release {
            minifyEnabled false
            proguardFiles getDefaultProguardFile('proguard-android.txt'), 'proguard-rules.pro'
        }
    }
}

dependencies {
    implementation fileTree(dir: 'libs', include: ['*.jar'])
    implementation "org.jetbrains.kotlin:kotlin-stdlib-jdk7:$kotlin_version"
    implementation 'com.android.support:multidex:1.0.3'
    implementation 'com.android.support:appcompat-v7:27.1.1'
    implementation 'com.android.support:design:27.1.1'
    implementation 'com.android.support:support-media-compat:27.1.1'
    implementation 'com.android.support.constraint:constraint-layout:1.1.3'
    implementation 'com.google.firebase:firebase-ml-vision:17.0.0'
    implementation 'com.google.firebase:firebase-ml-vision-image-label-model:15.0.0'
    implementation 'com.google.firebase:firebase-core:16.0.3'
    implementation 'io.fotoapparat:fotoapparat:2.3.3'
    implementation('com.karumi:dexter:4.2.0')
    implementation 'com.android.support:cardview-v7:27.1.1'
    implementation 'com.google.firebase:firebase-database:16.0.2'
    testImplementation 'junit:junit:4.12'
    androidTestImplementation 'com.android.support.test:runner:1.0.2'
    androidTestImplementation 'com.android.support.test.espresso:espresso-core:3.0.2'
}

```
#### Step 2. Create Firebase App

You will need to create or setup a Firebase app first. [This link](https://firebase.google.com/docs/android/setup) explains how to do so.

#### Step 3. Our Android Manifest

We will need to look at our `AndroidManifest.xml`.

**(a). `AndroidManifest.xml`**

> Our `AndroidManifest` file.

Here we will add the following permission:

1. Our `CAMERA` permission.
2. Our `INTERNET` permission.

Here is the full Android Manifest file:

```xml
<?xml version="1.0" encoding="utf-8"?>
<manifest xmlns:android="http://schemas.android.com/apk/res/android"
    package="com.projects.enzoftware.firebasemlkit">

    <uses-permission android:name="android.permission.CAMERA" />
    <uses-permission android:name="android.permission.INTERNET" />

    <uses-feature android:name="android.hardware.camera" />
    <uses-feature android:name="android.hardware.camera.autofocus" />

    <application
        android:allowBackup="true"
        android:icon="@mipmap/ic_launcher"
        android:label="@string/app_name"
        android:roundIcon="@mipmap/ic_launcher_round"
        android:supportsRtl="true"
        android:theme="@style/AppTheme">
        <activity android:name=".MainActivity">
            <intent-filter>
                <action android:name="android.intent.action.MAIN" />

                <category android:name="android.intent.category.LAUNCHER" />
            </intent-filter>
        </activity>
        <activity android:name=".ListLabelsActivity"></activity>
    </application>

</manifest>
```
#### Step 4. Design Layouts

In Android we design our UI interfaces using XML. So let's create the following layouts:

**(a). `item_label_image.xml`**

> Our `item_label_image` layout.

Inside your `/res/layout/` directory create an xml layout file named `item_label_image.xml`.

Design your XML layout using the following 3 UI widgets and ViewGroups:

1. `CardView`
2. `ConstraintLayout`
3. `AppCompatTextView`

```xml
<?xml version="1.0" encoding="utf-8"?>
<android.support.v7.widget.CardView
    xmlns:android="http://schemas.android.com/apk/res/android"
    xmlns:tools="http://schemas.android.com/tools"
    android:layout_width="match_parent"
    android:layout_height="wrap_content"
    android:layout_margin="8dp"
    android:id="@+id/item_content">

    <android.support.constraint.ConstraintLayout
        xmlns:android="http://schemas.android.com/apk/res/android"
        xmlns:app="http://schemas.android.com/apk/res-auto"
        android:layout_width="match_parent"
        android:layout_height="wrap_content">

        <android.support.v7.widget.AppCompatTextView
            android:id="@+id/txtLabel"
            android:layout_width="wrap_content"
            android:layout_height="wrap_content"
            android:layout_marginStart="16dp"
            android:layout_marginTop="8dp"
            android:textSize="18sp"
            tools:text = "@string/image_name"
            app:layout_constraintStart_toStartOf="parent"
            app:layout_constraintTop_toTopOf="parent" />

        <android.support.v7.widget.AppCompatTextView
            android:id="@+id/txtConfidence"
            android:layout_width="wrap_content"
            android:layout_height="wrap_content"
            android:layout_marginBottom="8dp"
            android:layout_marginStart="16dp"
            android:textSize="16sp"
            android:layout_marginTop="8dp"
            app:layout_constraintBottom_toBottomOf="parent"
            app:layout_constraintStart_toStartOf="parent"
            app:layout_constraintTop_toBottomOf="@+id/txtLabel"
            tools:text="@string/confidence" />

    </android.support.constraint.ConstraintLayout>



</android.support.v7.widget.CardView>
```

**(b). `activity_list_labels.xml`**

> Our `activity_list_labels` layout.

Inside your `/res/layout/` directory create an xml layout file named `activity_list_labels.xml`and add the following 4 UI widgets:

1. `ConstraintLayout`
2. `AppBarLayout`
3. `Toolbar`
4. `RecyclerView`

```xml
<?xml version="1.0" encoding="utf-8"?>
<android.support.constraint.ConstraintLayout
    xmlns:android="http://schemas.android.com/apk/res/android"
    xmlns:app="http://schemas.android.com/apk/res-auto"
    xmlns:tools="http://schemas.android.com/tools"
    android:layout_width="match_parent"
    android:id="@+id/htab_maincontent"
    android:layout_height="match_parent"
    android:fitsSystemWindows="true"
    tools:context=".ListLabelsActivity">


    <android.support.design.widget.AppBarLayout
        android:id="@+id/appBarLayout"
        android:layout_width="match_parent"
        android:layout_height="?attr/actionBarSize"
        android:theme="@style/ThemeOverlay.AppCompat.Dark.ActionBar"
        app:layout_constraintTop_toTopOf="parent">

        <android.support.v7.widget.Toolbar
            android:id="@+id/toolbar"
            android:layout_width="match_parent"
            android:layout_height="?attr/actionBarSize"
            app:popupTheme="@style/ThemeOverlay.AppCompat.Light"
            app:theme="@style/ThemeOverlay.AppCompat.Dark.ActionBar" />

    </android.support.design.widget.AppBarLayout>

    <android.support.v7.widget.RecyclerView
        android:id="@+id/recyclerView"
        android:layout_width="0dp"
        android:layout_height="0dp"
        android:layout_marginBottom="8dp"
        android:layout_marginEnd="8dp"
        android:layout_marginStart="8dp"
        app:layout_constraintBottom_toBottomOf="parent"
        app:layout_constraintEnd_toEndOf="parent"
        app:layout_constraintStart_toStartOf="parent"
        app:layout_constraintTop_toBottomOf="@+id/appBarLayout" />


</android.support.constraint.ConstraintLayout>
```

**(c). `activity_main.xml`**

> Our `activity_main` layout.

Add the following:

1. `ConstraintLayout`
2. `io.fotoapparat.view.CameraView`
3. `AppCompatTextView`
4. `FloatingActionButton`

```xml
<?xml version="1.0" encoding="utf-8"?>
<android.support.constraint.ConstraintLayout xmlns:android="http://schemas.android.com/apk/res/android"
    xmlns:app="http://schemas.android.com/apk/res-auto"
    xmlns:tools="http://schemas.android.com/tools"
    android:layout_width="match_parent"
    android:layout_height="match_parent"
    tools:context=".MainActivity">


    <io.fotoapparat.view.CameraView
        android:id="@+id/cameraView"
        android:layout_width="match_parent"
        android:layout_height="match_parent"
        app:layout_constraintBottom_toBottomOf="parent"
        app:layout_constraintEnd_toEndOf="parent"
        app:layout_constraintHorizontal_bias="0.0"
        app:layout_constraintStart_toStartOf="parent"
        app:layout_constraintTop_toTopOf="parent"
        app:layout_constraintVertical_bias="0.0" />


    <android.support.v7.widget.AppCompatTextView
        android:layout_width="0dp"
        android:id="@+id/txtLabels"
        android:layout_height="wrap_content"
        android:layout_marginBottom="8dp"
        android:layout_marginEnd="8dp"
        android:layout_marginStart="8dp"
        app:layout_constraintBottom_toBottomOf="parent"
        app:layout_constraintEnd_toEndOf="parent"
        app:layout_constraintStart_toStartOf="parent" />


    <android.support.design.widget.FloatingActionButton
        android:id="@+id/fabTakePicture"
        android:layout_width="wrap_content"
        android:layout_height="wrap_content"
        android:layout_gravity="end|bottom"
        android:layout_margin="16dp"
        android:layout_marginBottom="44dp"
        android:layout_marginEnd="16dp"
        android:src="@drawable/ic_add_photo_24dp"
        app:layout_constraintBottom_toBottomOf="parent"
        app:layout_constraintEnd_toEndOf="parent" />

</android.support.constraint.ConstraintLayout>
```
#### Step 5. Write Code

Finally we need to write our code as follows:


**(a). `ImageLabel.kt`**

> Our `ImageLabel` class.

Create a Kotlin file named `ImageLabel.kt`.

We will then add imports from android SDK and other packages. Here are some of the imports we will use in this class:

1. `Parcel` from the `android.os` package.
2. `Parcelable` from the `android.os` package.

Next create a class that derives from `Parcelable` and add its contents as follows:

We will be overriding the following functions: 

1. `writeToParcel(parcel: Parcel, flags: Int) `.
2. `describeContents(): Int `.
3. `createFromParcel(parcel: Parcel): ImageLabel `.
4. `newArray(size: Int): Array<ImageLabel?> `.

Here is the full code:

```kotlin
package replace_with_your_package_name

import android.os.Parcel
import android.os.Parcelable

class ImageLabel(val label:String, val confidence:Float) : Parcelable {

    constructor(parcel: Parcel) : this(
            parcel.readString(),
            parcel.readFloat())

    override fun writeToParcel(parcel: Parcel, flags: Int) {
        parcel.writeString(label)
        parcel.writeFloat(confidence)
    }

    override fun describeContents(): Int {
        return 0
    }

    companion object CREATOR : Parcelable.Creator<ImageLabel> {
        override fun createFromParcel(parcel: Parcel): ImageLabel {
            return ImageLabel(parcel)
        }

        override fun newArray(size: Int): Array<ImageLabel?> {
            return arrayOfNulls(size)
        }
    }
}

```

**(b). `ImageLabelAdapter.kt`**

> Our `ImageLabelAdapter` class.

Create a Kotlin file named `ImageLabelAdapter.kt`.

We will be overriding the following functions: 

1. `onCreateViewHolder(parent: ViewGroup, viewType: Int): ImageLabelAdapter.ViewHolder `.
2. `onBindViewHolder(holder: ViewHolder, position: Int) `.

Here is the full code:

```kotlin
package replace_with_your_package_name

import android.content.Context
import android.support.v4.content.ContextCompat
import android.support.v7.widget.RecyclerView
import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import com.projects.enzoftware.firebasemlkit.R
import com.projects.enzoftware.firebasemlkit.model.ImageLabel
import kotlinx.android.synthetic.main.item_label_image.view.*

class ImageLabelAdapter(private val labels : ArrayList<ImageLabel>, val context: Context) : RecyclerView.Adapter<ImageLabelAdapter.ViewHolder>(){


    override fun onCreateViewHolder(parent: ViewGroup, viewType: Int): ImageLabelAdapter.ViewHolder {
        val view = LayoutInflater   .from(parent.context)
                                    .inflate(R.layout.item_label_image, parent, false)
        return ViewHolder(view)
    }

    override fun getItemCount(): Int = labels.size

    override fun onBindViewHolder(holder: ViewHolder, position: Int) {
        val imageLabel = labels[position]
        val confidence = imageLabel.confidence * 100.0f
        when(confidence){
            in 0..50    -> holder.view.txtConfidence.setTextColor(ContextCompat.getColor(context,R.color.colorError))
            in 51..69   -> holder.view.txtConfidence.setTextColor(ContextCompat.getColor(context,R.color.colorAlert))
            in 70..100  -> holder.view.txtConfidence.setTextColor(ContextCompat.getColor(context,R.color.colorSuccess))
        }
        holder.view.txtLabel.text = imageLabel.label
        holder.view.txtConfidence.text = "Confidence $confidence %"
    }

    class ViewHolder(val view:View) : RecyclerView.ViewHolder(view)
}


```

**(c). `ListLabelsActivity.kt`**

> Our `ListLabelsActivity` class.

Create a Kotlin file named `ListLabelsActivity.kt`.

Here is the full code:

```kotlin
package replace_with_your_package_name

import android.content.Context
import android.content.Intent
import android.os.Bundle
import android.support.v7.app.AppCompatActivity
import android.support.v7.widget.LinearLayoutManager
import com.projects.enzoftware.firebasemlkit.adapter.ImageLabelAdapter
import com.projects.enzoftware.firebasemlkit.model.ImageLabel
import kotlinx.android.synthetic.main.activity_list_labels.*

class ListLabelsActivity : AppCompatActivity() {

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_list_labels)
        setSupportActionBar(toolbar)
        supportActionBar?.setDisplayHomeAsUpEnabled(true)
        supportActionBar?.setDisplayShowHomeEnabled(true)
        supportActionBar?.title = "Detected items"
        val linearVertical = LinearLayoutManager(this, LinearLayoutManager.VERTICAL, false)
        recyclerView.layoutManager = linearVertical
        recyclerView.adapter = ImageLabelAdapter(intent.getParcelableArrayListExtra<ImageLabel>(KEY_LABELS),this)
    }

    companion object {

        private const val KEY_LABELS = "LABELS"

        fun callingIntent(context: Context, labels : ArrayList<ImageLabel>) : Intent{
            val intent = Intent(context, ListLabelsActivity::class.java)
            intent.putParcelableArrayListExtra(KEY_LABELS, ArrayList(labels))
            return intent
        }
    }
}


```

**(d). `MainActivity.kt`**

> Our `MainActivity` class.

Create a Kotlin file named `MainActivity.kt`.

We will then add imports from android SDK and other packages. Here are some of the imports we will use in this class:

1. `Manifest` from the `android` package.
2. `Context` from the `android.content` package.
3. `Bitmap` from the `android.graphics` package.
4. `AppCompatActivity` from the `android.support.v7.app` package.
5. `Bundle` from the `android.os` package.
6. `Toast` from the `android.widget` package.
7. `*` from the `kotlinx.android.synthetic.main.activity_main` package.

Next create a class that derives from `AppCompatActivity` and add its contents as follows:

We will be overriding the following functions: 

1. `onCreate(savedInstanceState: Bundle?) `.
2. `onNavigateUp(): Boolean `.
3. `onPermissionGranted(response: PermissionGrantedResponse?) `.
4. `onPermissionRationaleShouldBeShown(permission: PermissionRequest?, token: PermissionToken?) `.
5. `onPermissionDenied(response: PermissionDeniedResponse?) `.

We will be creating the following methods:

1. `takePicture() `.
2. `doImageRecognition(parameter)` - Let's pass a `Bitmap` object as a parameter.
3. `navigateToListImageResults(parameter)` - We pass a `List<ImageLabel>` object as a parameter.

**(a). Our `doImageRecognition()` function**

Write the `doImageRecognition()` function as follows:

```kotlin
    private fun doImageRecognition(bitmap: Bitmap){
        val image = FirebaseVisionImage.fromBitmap(bitmap)
        val detector = FirebaseVision.getInstance().visionLabelDetector
        detector.detectInImage(image)
                .addOnSuccessListener { it ->
                    val labels = it.map { ImageLabel(it.label, it.confidence) }.toList()
                    navigateToListImageResults(labels)
                }
                .addOnFailureListener {
                    Toast.makeText(this, this.getString(R.string.operation_dont_success), Toast.LENGTH_SHORT).show()

                }
    }
```

**(b). Our `takePicture()` function**

Write the `takePicture()` function as follows:

```kotlin
    private fun takePicture() {
        val photo = fotoapparat.takePicture()
        photo   .toBitmap()
                .whenAvailable {
                    doImageRecognition(it!!.bitmap)
                }
    }
```

**(c). Our `navigateToListImageResults()` function**

Write the `navigateToListImageResults()` function as follows:

```kotlin
    private fun navigateToListImageResults(labels: List<ImageLabel>) {
        val intent = ListLabelsActivity.callingIntent(this, ArrayList(labels))
        startActivity(intent)
    }
```


Here is the full code:

```kotlin
package replace_with_your_package_name

import android.Manifest
import android.content.Context
import android.graphics.Bitmap
import android.support.v7.app.AppCompatActivity
import android.os.Bundle
import android.widget.Toast
import com.google.firebase.ml.vision.FirebaseVision
import com.google.firebase.ml.vision.common.FirebaseVisionImage
import com.karumi.dexter.Dexter
import com.karumi.dexter.PermissionToken
import com.karumi.dexter.listener.PermissionDeniedResponse
import com.karumi.dexter.listener.PermissionGrantedResponse
import com.karumi.dexter.listener.PermissionRequest
import com.karumi.dexter.listener.single.PermissionListener
import com.projects.enzoftware.firebasemlkit.model.ImageLabel
import com.projects.enzoftware.firebasemlkit.utils.doImageRecognition
import io.fotoapparat.Fotoapparat
import kotlinx.android.synthetic.main.activity_main.*

class MainActivity : AppCompatActivity(), PermissionListener {

    private lateinit var fotoapparat: Fotoapparat
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_main)
        Dexter  .withActivity(this)
                .withPermission(Manifest.permission.CAMERA)
                .withListener(this).check()

        fabTakePicture.setOnClickListener {
            takePicture()
        }

    }

    override fun onNavigateUp(): Boolean {
        onBackPressed()
        return true
    }

    private fun takePicture() {
        val photo = fotoapparat.takePicture()
        photo   .toBitmap()
                .whenAvailable {
                    doImageRecognition(it!!.bitmap)
                }
    }

    private fun doImageRecognition(bitmap: Bitmap){
        val image = FirebaseVisionImage.fromBitmap(bitmap)
        val detector = FirebaseVision.getInstance().visionLabelDetector
        detector.detectInImage(image)
                .addOnSuccessListener { it ->
                    val labels = it.map { ImageLabel(it.label, it.confidence) }.toList()
                    navigateToListImageResults(labels)
                }
                .addOnFailureListener {
                    Toast.makeText(this, this.getString(R.string.operation_dont_success), Toast.LENGTH_SHORT).show()

                }
    }

    private fun navigateToListImageResults(labels: List<ImageLabel>) {
        val intent = ListLabelsActivity.callingIntent(this, ArrayList(labels))
        startActivity(intent)
    }

    override fun onPermissionGranted(response: PermissionGrantedResponse?) {
        fotoapparat = Fotoapparat(this,cameraView)
        fotoapparat.start()
    }

    override fun onPermissionRationaleShouldBeShown(permission: PermissionRequest?, token: PermissionToken?) {

    }

    override fun onPermissionDenied(response: PermissionDeniedResponse?) {
        Toast.makeText(this,getString(R.string.denied_permission), Toast.LENGTH_SHORT).show()
    }
}


```

### Reference

Download the code below:

|No.|Link|
|--|---|
|1.|[Download Full Code](https://github.com/enzoftware/mlkit-image-recognition/archive/refs/heads/master.zip)|
|2.|Read more [here](https://github.com/enzoftware/mlkit-image-recognition).|
|3.|Follow code author [here](https://github.com/enzoftware).|
