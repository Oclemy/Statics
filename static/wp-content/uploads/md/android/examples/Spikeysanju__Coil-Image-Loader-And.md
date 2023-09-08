# Coil Image-Loader Android Example

>  A Sample App for Coil Image Loader Library for Android using Kotlin!....

Here is the GIF demo:

![Coil-Image-Loader-And Example Tutorial](https://github.com/Spikeysanju/Coil-Image-Loader-And/raw/master/Screenshots/coil.png)

Let us look at a full android Coil sample project.

#### Step 1. Dependencies

We need to add some dependencies in our `app/build.gradle` file as shown below:


**(a). build.gradle**


> Our app-level `build.gradle`.

We Prepare our dependencies as shown below. You may use later versions.

At the top of our `app/build.gradle` we will apply the following 3 plugins:

1. Our `com.android.application` plugin.
2. Our `kotlin-android` plugin.
3. Our `kotlin-android-extensions` plugin.

Inside the android closure we will set the `compileSDKVersion` and `buildToolsVersion`. We will also set the application ID, minimum SDK version, target SDK version, version code and version name inside a `defaultConfig` closure. We will also set the build types: to either debug or release. For each build type you can enable minification of resources, as well as enable proguard.

After that We will enable Java8 so that we can utilize a myriad of java8 features.

Next we will declare our app dependencies in under the `dependencies` closure. We will need the following 5 dependencies:

1. Our `Kotlin-stdlib-jdk7` library.
2. Our `Appcompat` library.
3. Our `Core-ktx` library.
4. Our `Constraintlayout` library.
5. Our `Coil` library.

Here is our full `app/build.gradle`:

```groovy
apply plugin: 'com.android.application'

apply plugin: 'kotlin-android'

apply plugin: 'kotlin-android-extensions'

android {
    compileSdkVersion 29
    buildToolsVersion "29.0.2"
    defaultConfig {
        applicationId "www.sanju.coilimageloader"
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

    kotlinOptions{
        jvmTarget = "1.8"
    }

}

dependencies {
    implementation fileTree(dir: 'libs', include: ['*.jar'])
    implementation"org.jetbrains.kotlin:kotlin-stdlib-jdk7:$kotlin_version"
    implementation 'androidx.appcompat:appcompat:1.1.0'
    implementation 'androidx.core:core-ktx:1.1.0'
    implementation 'androidx.constraintlayout:constraintlayout:1.1.3'
    testImplementation 'junit:junit:4.12'
    androidTestImplementation 'androidx.test.ext:junit:1.1.1'
    androidTestImplementation 'androidx.test.espresso:espresso-core:3.2.0'


    // Library
    implementation("io.coil-kt:coil:0.9.1")
}

```
#### Step 2. Our Android Manifest

We will need to look at our `AndroidManifest.xml`.


**(a). AndroidManifest.xml**


> Our `AndroidManifest` file.

Here we will add the following permission:

1. Our INTERNET permission.

Here is the full Android Manifest file:

```xml
<?xml version="1.0" encoding="utf-8"?>
<manifest xmlns:android="http://schemas.android.com/apk/res/android"
    package="www.sanju.coilimageloader">

    <uses-permission android:name="android.permission.INTERNET"/>

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
    </application>

</manifest>
```
#### Step 3. Design Layouts

In Android we design our UI interfaces using XML. So let's create the following layouts:


**(a). activity_main.xml**


> Our `activity_main` layout.

Furthermore design your XML layout using the following 2 UI widgets and ViewGroups:

1. `RelativeLayout`
2. `ImageView`

```xml
<?xml version="1.0" encoding="utf-8"?>
<RelativeLayout
    xmlns:android="http://schemas.android.com/apk/res/android"
    xmlns:app="http://schemas.android.com/apk/res-auto"
    xmlns:tools="http://schemas.android.com/tools"
    android:layout_width="match_parent"
    android:layout_height="match_parent"
    tools:context=".MainActivity">

  <ImageView
      android:id="@+id/image1"
      android:layout_width="300dp"
      android:layout_centerInParent="true"
      android:layout_height="300dp"/>


</RelativeLayout>
```
#### Step 4. Write Code

Finally we need to write our code as follows:


**(a). MainActivity.kt**

> Our `MainActivity` class.

First you create a Kotlin file named `MainActivity.kt` and add the following code:


```kotlin
package replace_with_your_package_name

import androidx.appcompat.app.AppCompatActivity
import android.os.Bundle
import coil.api.load
import coil.transform.BlurTransformation
import coil.transform.CircleCropTransformation
import coil.transform.GrayscaleTransformation
import coil.transform.RoundedCornersTransformation
import kotlinx.android.synthetic.main.activity_main.*

class MainActivity : AppCompatActivity() {

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_main)

        // Image Url
        val imageUrl = "https://images.unsplash.com/photo-1517849845537-4d257902454a?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=675&q=80"


        // Simple Loader
        image1.load(imageUrl)

        // Circle Crop Animation
        image1.load("https://images.unsplash.com/photo-1571233954463-3aafee3889d6?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=652&q=80"){
            crossfade(true) // crossfade animation
            crossfade(3000) // animation in seconds ex- 3 seconds
            transformations(CircleCropTransformation()) // circle crop animation
        }

        //Blur Animation
        image1.load("https://images.unsplash.com/photo-1571233954463-3aafee3889d6?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=652&q=80"){
            crossfade(true) // crossFade animation
            crossfade(3000) // animation in seconds ex- 3 seconds
            transformations(BlurTransformation(this@MainActivity,3f, 0.3f)) // Blur  animation
        }


        //Circle Crop Animation with Blur Reveal
        image1.load(imageUrl){
            crossfade(true) // crossFade animation
            crossfade(3000) // animation in seconds ex- 3 seconds
            transformations(CircleCropTransformation(),BlurTransformation(this@MainActivity,3f,0.3f)) // Circle Crop animation with blur reveal
        }

        // Customer Rounded Corners
        image1.load("https://images.unsplash.com/photo-1571233954463-3aafee3889d6?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=652&q=80"){
            crossfade(true) // crossFade animation
            crossfade(3000) // animation in seconds ex- 3 seconds
            transformations(RoundedCornersTransformation(12f,12f,12f,12f)) // Custom corner radius setter
        }

        //Gray Scale Image
        image1.load("https://images.unsplash.com/photo-1571233954463-3aafee3889d6?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=652&q=80") {
            crossfade(true) // crossFade animation
            crossfade(3000) // animation in seconds ex- 3 seconds
            transformations(GrayscaleTransformation()) // Gray Scale Image
        }


        // Load from Drawable
        image1.load(R.drawable.image6)


    }
}




```

### Reference

Download the code below:

|No.|Link|
|--|---|
|1.|[Download Full Code](https://github.com/Spikeysanju/Coil-Image-Loader-And/archive/refs/heads/master.zip)|
|2.|Read more [here](https://github.com/Spikeysanju/Coil-Image-Loader-And).|
|3.|Follow code author [here](https://github.com/Spikeysanju).|
