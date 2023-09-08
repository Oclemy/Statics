# How to load an image with Fresco

Let us look at a full Fresco Example below.

#### Step 1. Dependencies

We need to add some dependencies in our `app/build.gradle` file as shown below:


**(a). `build.gradle.kts`**

```kotlin
plugins {
    id("com.android.application")
    kotlin("android")
}

android {
    compileSdk = 31
    defaultConfig {
        applicationId = "demos.${rootProject.name.replace('-', '_')}"
        minSdk = 15
        targetSdk = 28
        versionCode = 1
        versionName = "1.0"
    }
}

dependencies {
    implementation(fileTree(mapOf("dir" to "libs", "include" to listOf("*.jar"))))
    implementation("org.jetbrains.kotlin:kotlin-stdlib:1.6.10")
    implementation("androidx.appcompat:appcompat:1.4.0")
    implementation("androidx.constraintlayout:constraintlayout:2.1.2")
    implementation("com.facebook.fresco:fresco:2.6.0")
    implementation("com.facebook.fresco:animated-webp:0.12.0")
    implementation("com.facebook.fresco:webpsupport:0.12.0")
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
    package="demos">
    <uses-permission android:name="android.permission.INTERNET" />
    <application
        android:name=".MyApplication"
        android:allowBackup="true"
        android:icon="@mipmap/ic_launcher"
        android:label="android-demo"
        android:roundIcon="@mipmap/ic_launcher_round"
        android:supportsRtl="true"
        android:theme="@style/Theme.AppCompat.Light.DarkActionBar">
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


**(a). `activity_main.xml`**


> Our `activity_main` layout.

Inside your `/res/layout/` directory create an xml layout file named `activity_main.xml`.

Design your XML layout using the following 3 UI widgets and ViewGroups:

1. [`LinearLayout`](https://android.camposha.info/en/linearlayout)
2. [`Button`](https://android.camposha.info/en/button)
3. `com.facebook.drawee.view.SimpleDraweeView`

```xml
<?xml version="1.0" encoding="utf-8"?>
<LinearLayout xmlns:android="http://schemas.android.com/apk/res/android"
    xmlns:app="http://schemas.android.com/apk/res-auto"
    xmlns:tools="http://schemas.android.com/tools"
    xmlns:fresco="http://schemas.android.com/apk/res-auto"
    android:layout_width="match_parent"
    android:layout_height="match_parent"
    android:orientation="vertical"
    tools:context=".MainActivity">

    <Button
        android:id="@+id/button"
        android:layout_width="match_parent"
        android:layout_height="wrap_content"
        android:text="Load Image" />

    <com.facebook.drawee.view.SimpleDraweeView
        android:id="@+id/my_image_view"
        android:layout_width="match_parent"
        android:layout_height="match_parent"
        fresco:placeholderImage="@drawable/image_placeholder"
        />

</LinearLayout>
```

#### Step 4. Write Code

Finally we need to write our code as follows:

**(a). `MyApplication.kt`**

> Our `MyApplication` class.

Create a Kotlin file named `MyApplication.kt`.

We will then add imports from android SDK and other packages. Here are some of the imports we will use in this class:

1. `Application` from the `android.app` package.

Next create a class that derives from `Application` and add its contents as follows:

We will be overriding the following functions: 

1. `onCreate() `.

Here is the full code:

```kotlin
package replace_with_your_package_name

import android.app.Application
import com.facebook.drawee.backends.pipeline.Fresco

class MyApplication : Application() {
    override fun onCreate() {
        super.onCreate()
        Fresco.initialize(this)
    }

}

```

**(b). `MainActivity.kt`**

> Our `MainActivity` class.

Create a Kotlin file named `MainActivity.kt`.

Next create a class that derives from `AppCompatActivity` and add its contents as follows:

We will be overriding the following functions: 

1. `onCreate(savedInstanceState: Bundle?) `.

Here is the full code:

```kotlin
package replace_with_your_package_name

import android.os.Bundle
import android.widget.Button
import androidx.appcompat.app.AppCompatActivity
import com.facebook.drawee.view.SimpleDraweeView


class MainActivity : AppCompatActivity() {

    private val imageUri = "https://images.pexels.com/photos/5716513/pexels-photo-5716513.jpeg"

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_main)

        val button = findViewById<Button>(R.id.button)
        button.setOnClickListener {
            val imageView = findViewById<SimpleDraweeView>(R.id.my_image_view)
            imageView.setImageURI(imageUri)
        }
    }

}


```

### Reference

Download the code below:

|No.|Link|
|--|---|
|1.|[Download Full Code](https://github.com/freewind-demos/android-kotlin-fresco-load-image-demo/archive/refs/heads/master.zip)|
|2.|Read more [here](https://github.com/freewind-demos/android-kotlin-fresco-load-image-demo).|
|3.|Follow code author [here](https://github.com/freewind-demos).|
