# Fresco Animate GIF

>  A small example of the Fresco library in use with Kotlin to show an image and animate an animated gif..

A small example of the Fresco library in use with Kotlin to show an image and animate an animated gif.


#### Step 1. Dependencies

We need to add some dependencies in our `app/build.gradle` file as shown below:

**(a). `build.gradle`**

> Our app-level `build.gradle`.

We Prepare our dependencies as shown below. You may use later versions.

At the top of our `app/build.gradle` we will apply the following 3 plugins:

1. Our `com.android.application` plugin.
2. Our `kotlin-android` plugin.
3. Our `kotlin-android-extensions` plugin.

We then declare our app dependencies under the `dependencies` closure. We will need the following 8 dependencies:

1. Our `Kotlin-stdlib-jdk7` library.
2. Our `Appcompat-v7` library.
3. Our `Constraint-layout` library.
4. Our `Fresco` library.
5. Our `Animated-gif` library.
6. Our `Animated-webp` library.
7. Our `Webpsupport` support library.
8. Our `Support-core-utils` support library. Feel free to use newer AndroidX versions.

Here is our full `app/build.gradle`:

```groovy
apply plugin: 'com.android.application'

apply plugin: 'kotlin-android'

apply plugin: 'kotlin-android-extensions'

android {
    compileSdkVersion 28
    defaultConfig {
        applicationId "com.example.frescokotlinexample"
        minSdkVersion 14
        targetSdkVersion 28
        versionCode 1
        versionName "1.0"
        testInstrumentationRunner "android.support.test.runner.AndroidJUnitRunner"
    }
    buildTypes {
        release {
            minifyEnabled false
            proguardFiles getDefaultProguardFile('proguard-android-optimize.txt'), 'proguard-rules.pro'
        }
    }
}

dependencies {
    implementation fileTree(dir: 'libs', include: ['*.jar'])
    implementation"org.jetbrains.kotlin:kotlin-stdlib-jdk7:$kotlin_version"
    implementation 'com.android.support:appcompat-v7:28.0.0'
    implementation 'com.android.support.constraint:constraint-layout:1.1.3'

    implementation 'com.facebook.fresco:fresco:1.13.0'

    implementation 'com.facebook.fresco:animated-gif:1.13.0'

    implementation 'com.facebook.fresco:animated-webp:1.13.0'
    implementation 'com.facebook.fresco:webpsupport:1.13.0'

    implementation 'com.android.support:support-core-utils:28'

    testImplementation 'junit:junit:4.12'
    androidTestImplementation 'com.android.support.test:runner:1.0.2'
    androidTestImplementation 'com.android.support.test.espresso:espresso-core:3.0.2'
}

```
#### Step 2. Our Android Manifest

We will need to look at our `AndroidManifest.xml`.


**(a). `AndroidManifest.xml`**


> Our `AndroidManifest` file.

Here we will add the following permission:

1. Our `INTERNET` permission.

Here is the full Android Manifest file:

```xml
<?xml version="1.0" encoding="utf-8"?>
<manifest xmlns:android="http://schemas.android.com/apk/res/android"
          xmlns:tools="http://schemas.android.com/tools"
          package="com.example.frescokotlinexample"
          tools:ignore="GoogleAppIndexingWarning">

    <uses-permission android:name="android.permission.INTERNET" />

    <application
            android:allowBackup="true"
            android:icon="@mipmap/ic_launcher"
            android:label="@string/app_name"
            android:roundIcon="@mipmap/ic_launcher_round"
            android:supportsRtl="true"
            android:theme="@style/AppTheme" android:fullBackupContent="@xml/backup_descriptor">
        <activity android:name=".MainActivity">
            <intent-filter>
                <action android:name="android.intent.action.MAIN"/>

                <category android:name="android.intent.category.LAUNCHER"/>
            </intent-filter>
        </activity>
    </application>

</manifest>
```
#### Step 3. Design Layouts

In Android we design our UI interfaces using XML. So let's create the following layouts:


**(a). `activity_main.xml`**


> Our `activity_main` layout.

Inside your `/res/layout/` directory create an xml layout file named `activity_main.xml` with the following widgets:

1. `ConstraintLayout`
2. `com.facebook.drawee.view.SimpleDraweeView`

```xml
<?xml version="1.0" encoding="utf-8" ?>
<android.support.constraint.ConstraintLayout
        xmlns:android="http://schemas.android.com/apk/res/android"
        xmlns:tools="http://schemas.android.com/tools"
        xmlns:fresco="http://schemas.android.com/apk/res-auto"
        xmlns:app="http://schemas.android.com/apk/res-auto"
        android:layout_width="match_parent"
        android:layout_height="match_parent"
        tools:context=".MainActivity">


    <com.facebook.drawee.view.SimpleDraweeView
            android:id="@+id/my_image_viewTop"
            android:layout_width="330dp"
            android:layout_height="300dp"
            fresco:placeholderImage="@drawable/placeholderimage"
            android:layout_marginTop="8dp"
            fresco:layout_constraintTop_toTopOf="parent" android:layout_marginBottom="8dp"
            fresco:layout_constraintBottom_toTopOf="@+id/my_image_viewBottom"
            fresco:layout_constraintStart_toStartOf="parent" android:layout_marginLeft="8dp"
            android:layout_marginStart="8dp" fresco:layout_constraintEnd_toEndOf="parent" android:layout_marginEnd="8dp"
            android:layout_marginRight="8dp" fresco:layout_constraintHorizontal_bias="0.43"
            fresco:layout_constraintVertical_bias="0.455"/>


    <com.facebook.drawee.view.SimpleDraweeView
            android:id="@+id/my_image_viewBottom"
            android:layout_width="330dp"
            android:layout_height="300dp"
            fresco:placeholderImage="@drawable/placeholderimage"

            fresco:layout_constraintEnd_toEndOf="@+id/my_image_viewTop"
            android:layout_marginEnd="8dp" android:layout_marginRight="8dp"
            fresco:layout_constraintStart_toStartOf="@+id/my_image_viewTop"
            android:layout_marginBottom="40dp"
            fresco:layout_constraintBottom_toBottomOf="parent" fresco:layout_constraintHorizontal_bias="0.0"/>

</android.support.constraint.ConstraintLayout>
```
#### Step 4. Write Code

Finally we need to write our code as follows:


**(a). `MainActivity.kt`**

> Our `MainActivity` class.

Create a Kotlin file named `MainActivity.kt`.

We will be overriding the following functions: 

1. `onCreate(savedInstanceState: Bundle?) `.

Here is the full code:

```kotlin
package replace_with_your_package_name

import android.support.v7.app.AppCompatActivity
import android.os.Bundle

import com.facebook.drawee.backends.pipeline.Fresco
import com.facebook.drawee.view.SimpleDraweeView


class MainActivity : AppCompatActivity() {

    private val imageUrl = "https://raw.githubusercontent.com/facebook/fresco/master/docs/static/logo.png"
    private val imageUrlAnim = "https://media.giphy.com/media/YWf50NNii3r4k/giphy.gif"


    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)

        // Set up Fresco ready for use
        Fresco.initialize(this)

        setContentView(R.layout.activity_main)

        // Show image from a URL
//
//        findViewById<SimpleDraweeView>(R.id.my_image_viewTop)
//            .setImageURI( imageUrl )


        // Load and animate an animated gif

        findViewById<SimpleDraweeView>(R.id.my_image_viewBottom).controller =
            Fresco.newDraweeControllerBuilder()
                .setUri(imageUrlAnim)
                .setAutoPlayAnimations(true)
                .build();

        // Show image resource Drawable

        findViewById<SimpleDraweeView>(R.id.my_image_viewTop)
            .setActualImageResource( R.drawable.kotlinmeme )

    }

}



```

### Reference

Download the code below:

|No.|Link|
|--|---|
|1.|[Download Full Code](https://github.com/jasonbutwell/Android_KotlinFrescoExample/archive/refs/heads/master.zip)|
|2.|Read more [here](https://github.com/jasonbutwell/Android_KotlinFrescoExample).|
|3.|Follow code author [here](https://github.com/jasonbutwell).|
