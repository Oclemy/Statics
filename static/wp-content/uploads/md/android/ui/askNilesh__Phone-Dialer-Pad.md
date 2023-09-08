# Phone-Dialer-Pad

Let us look at the full Dialer Example.

#### Step 1. Dependencies

We need to add some dependencies in our `app/build.gradle` file as shown below:


**(a). `build.gradle`**

> Our app-level `build.gradle`.

We Prepare our dependencies as shown below. You may use later versions.

At the top of our `app/build.gradle` we will apply the following 3 plugins:

1. Our `com.android.application` plugin.
2. Our `kotlin-android` plugin.
3. Our `kotlin-android-extensions` plugin.

We then declare our app dependencies under the `dependencies` closure, using the `implementation` statement. We will need the following 7 dependencies:

1. Our `Kotlin-stdlib-jdk7` library.
2. `Appcompat` - Allows us access to new APIs on older API versions of the platform (many using Material Design).
3. `Material` - Collection of Modular and customizable Material Design UI components for Android.
4. Our `Sdp-android` library.
5. Our `Ssp-android` library.
6. `Core-ktx` - With this we can target the latest platform features and APIs while also supporting older devices.
7. `Constraintlayout` - This allows us to Position and size widgets in a flexible way with relative positioning.

Here is our full `app/build.gradle`:

```groovy
apply plugin: 'com.android.application'

apply plugin: 'kotlin-android'

apply plugin: 'kotlin-android-extensions'

android {
    compileSdkVersion 29
    buildToolsVersion "29.0.2"
    defaultConfig {
        applicationId "com.nilu.numberdialerpad"
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
}

dependencies {
    implementation fileTree(dir: 'libs', include: ['*.jar'])
    implementation"org.jetbrains.kotlin:kotlin-stdlib-jdk7:$kotlin_version"
    implementation 'androidx.appcompat:appcompat:1.0.2'
    implementation 'com.google.android.material:material:1.2.0-alpha02'
    implementation 'com.intuit.sdp:sdp-android:1.0.6'
    implementation 'com.intuit.ssp:ssp-android:1.0.6'
    implementation 'androidx.core:core-ktx:1.0.2'
    implementation 'androidx.constraintlayout:constraintlayout:1.1.3'
    testImplementation 'junit:junit:4.12'
    androidTestImplementation 'androidx.test.ext:junit:1.1.0'
    androidTestImplementation 'androidx.test.espresso:espresso-core:3.1.1'
}

```

#### Step 2. Design Layouts

For this project let's create the following layouts:


**(a). `activity_main.xml`**

> Our `activity_main` layout.

This layout will represent our Main Activity's layout. Specify [`androidx.constraintlayout.widget.ConstraintLayout`](https://android.examples.directory/constraintlayout) as it's root element then inside it place the following [widgets](https://android.examples.directory/view):

1. [`TextView`](https://android.examples.directory/textview)
2. [`LinearLayout`](https://android.examples.directory/linearlayout)
3. [`EditText`](https://android.examples.directory/edittext)
4. [`MaterialButton`](https://android.examples.directory/materialbutton)
5. [`FloatingActionButton`](https://android.examples.directory/floatingactionbutton)

```xml
<?xml version="1.0" encoding="utf-8"?>
<androidx.constraintlayout.widget.ConstraintLayout xmlns:android="http://schemas.android.com/apk/res/android"
    xmlns:app="http://schemas.android.com/apk/res-auto"
    android:layout_width="match_parent"
    android:layout_height="match_parent"
    android:background="#FF9800"
    android:padding="40dp">

    <TextView
        android:id="@+id/tvEnterCode"
        android:layout_width="wrap_content"
        android:layout_height="wrap_content"
        android:layout_marginBottom="10dp"
        android:gravity="center"
        android:text="Enter OTP Code"
        android:textAppearance="@style/Base.TextAppearance.AppCompat.Medium"
        android:textColor="#ffffff"
        app:layout_constraintEnd_toEndOf="parent"
        app:layout_constraintStart_toStartOf="parent"
        app:layout_constraintTop_toTopOf="parent" />

    <LinearLayout
        android:id="@+id/tvCode"
        android:layout_width="match_parent"
        android:layout_height="wrap_content"
        android:layout_marginStart="@dimen/_30sdp"
        android:layout_marginEnd="@dimen/_30sdp"
        android:orientation="horizontal"
        app:layout_constraintEnd_toEndOf="parent"
        app:layout_constraintStart_toStartOf="parent"
        app:layout_constraintTop_toBottomOf="@+id/tvEnterCode">

        <EditText
            android:id="@+id/edtOne"
            style="@style/OTPEditTextStyle" />

        <EditText
            android:id="@+id/edtTwo"
            style="@style/OTPEditTextStyle" />

        <EditText
            android:id="@+id/edtThree"
            style="@style/OTPEditTextStyle" />

        <EditText
            android:id="@+id/edtFour"
            style="@style/OTPEditTextStyle"
            android:imeOptions="actionDone" />

    </LinearLayout>


    <com.google.android.material.button.MaterialButton
        android:id="@+id/btnOne"
        style="@style/Widget.MaterialComponents.Button.Icon"
        android:layout_width="70dp"
        android:layout_height="70dp"
        android:layout_marginTop="30dp"
        android:gravity="center"
        android:insetLeft="0dp"
        android:insetTop="0dp"
        android:insetRight="0dp"
        android:insetBottom="0dp"
        android:tag="1"
        android:text="1"
        android:textAppearance="@style/TextAppearance.AppCompat.Large"
        android:textColor="#ffffff"
        app:cornerRadius="@dimen/_50sdp"
        app:layout_constraintEnd_toStartOf="@+id/btnTwo"
        app:layout_constraintHorizontal_bias="0.5"
        app:layout_constraintHorizontal_chainStyle="spread"
        app:layout_constraintHorizontal_weight="1"
        app:layout_constraintStart_toStartOf="parent"
        app:layout_constraintTop_toBottomOf="@+id/tvCode"
        app:shapeAppearanceOverlay="@style/ShapeAppearanceOverlay.MyApp.Button.Rounded" />

    <com.google.android.material.button.MaterialButton
        android:id="@+id/btnTwo"
        style="@style/Widget.MaterialComponents.Button.Icon"
        android:layout_width="70dp"
        android:layout_height="70dp"
        android:gravity="center"
        android:insetLeft="0dp"
        android:insetTop="0dp"
        android:insetRight="0dp"
        android:insetBottom="0dp"
        android:tag="2"
        android:text="2"
        android:textAppearance="@style/TextAppearance.AppCompat.Large"
        android:textColor="#ffffff"
        app:cornerRadius="@dimen/_50sdp"
        app:layout_constraintBottom_toBottomOf="@+id/btnOne"
        app:layout_constraintEnd_toStartOf="@+id/btnThree"
        app:layout_constraintHorizontal_bias="0.5"
        app:layout_constraintHorizontal_chainStyle="spread"
        app:layout_constraintHorizontal_weight="1"
        app:layout_constraintStart_toEndOf="@+id/btnOne"
        app:layout_constraintTop_toTopOf="@+id/btnOne"
        app:shapeAppearanceOverlay="@style/ShapeAppearanceOverlay.MyApp.Button.Rounded" />

    <com.google.android.material.button.MaterialButton
        android:id="@+id/btnThree"
        style="@style/Widget.MaterialComponents.Button.Icon"
        android:layout_width="70dp"
        android:layout_height="70dp"
        android:gravity="center"
        android:insetLeft="0dp"
        android:insetTop="0dp"
        android:insetRight="0dp"
        android:insetBottom="0dp"
        android:tag="3"
        android:text="3"
        android:textAppearance="@style/TextAppearance.AppCompat.Large"
        android:textColor="#ffffff"
        app:cornerRadius="@dimen/_50sdp"
        app:layout_constraintBottom_toBottomOf="@+id/btnOne"
        app:layout_constraintEnd_toEndOf="parent"
        app:layout_constraintHorizontal_bias="0.5"
        app:layout_constraintHorizontal_chainStyle="spread"
        app:layout_constraintHorizontal_weight="1"
        app:layout_constraintStart_toEndOf="@+id/btnTwo"
        app:layout_constraintTop_toTopOf="@+id/btnOne"
        app:shapeAppearanceOverlay="@style/ShapeAppearanceOverlay.MyApp.Button.Rounded" />

    <com.google.android.material.button.MaterialButton
        android:id="@+id/btnFour"
        style="@style/Widget.MaterialComponents.Button.Icon"
        android:layout_width="70dp"
        android:layout_height="70dp"
        android:layout_marginTop="@dimen/_16sdp"
        android:gravity="center"
        android:insetLeft="0dp"
        android:insetTop="0dp"
        android:insetRight="0dp"
        android:insetBottom="0dp"
        android:tag="4"
        android:text="4"
        android:textAppearance="@style/TextAppearance.AppCompat.Large"
        android:textColor="#ffffff"
        app:cornerRadius="@dimen/_50sdp"
        app:layout_constraintEnd_toStartOf="@+id/btnFive"
        app:layout_constraintHorizontal_bias="0.5"
        app:layout_constraintHorizontal_chainStyle="spread"
        app:layout_constraintHorizontal_weight="1"
        app:layout_constraintStart_toStartOf="parent"
        app:layout_constraintTop_toBottomOf="@+id/btnOne"
        app:shapeAppearanceOverlay="@style/ShapeAppearanceOverlay.MyApp.Button.Rounded" />

    <com.google.android.material.button.MaterialButton
        android:id="@+id/btnFive"
        style="@style/Widget.MaterialComponents.Button.Icon"
        android:layout_width="70dp"
        android:layout_height="70dp"
        android:gravity="center"
        android:insetLeft="0dp"
        android:insetTop="0dp"
        android:insetRight="0dp"
        android:insetBottom="0dp"
        android:tag="5"
        android:text="5"
        android:textAppearance="@style/TextAppearance.AppCompat.Large"
        android:textColor="#ffffff"
        app:cornerRadius="@dimen/_50sdp"
        app:layout_constraintBottom_toBottomOf="@+id/btnFour"
        app:layout_constraintEnd_toStartOf="@+id/btnSix"
        app:layout_constraintHorizontal_bias="0.5"
        app:layout_constraintHorizontal_chainStyle="spread"
        app:layout_constraintHorizontal_weight="1"
        app:layout_constraintStart_toEndOf="@+id/btnOne"
        app:layout_constraintTop_toTopOf="@+id/btnFour"
        app:shapeAppearanceOverlay="@style/ShapeAppearanceOverlay.MyApp.Button.Rounded" />

    <com.google.android.material.button.MaterialButton
        android:id="@+id/btnSix"
        style="@style/Widget.MaterialComponents.Button.Icon"
        android:layout_width="70dp"
        android:layout_height="70dp"
        android:gravity="center"
        android:insetLeft="0dp"
        android:insetTop="0dp"
        android:insetRight="0dp"
        android:insetBottom="0dp"
        android:tag="6"
        android:text="6"
        android:textAppearance="@style/TextAppearance.AppCompat.Large"
        android:textColor="#ffffff"
        app:cornerRadius="@dimen/_50sdp"
        app:layout_constraintBottom_toBottomOf="@+id/btnFour"
        app:layout_constraintEnd_toEndOf="parent"
        app:layout_constraintHorizontal_bias="0.5"
        app:layout_constraintHorizontal_chainStyle="spread"
        app:layout_constraintHorizontal_weight="1"
        app:layout_constraintStart_toEndOf="@+id/btnFive"
        app:layout_constraintTop_toTopOf="@+id/btnFour"
        app:shapeAppearanceOverlay="@style/ShapeAppearanceOverlay.MyApp.Button.Rounded" />

    <com.google.android.material.button.MaterialButton
        android:id="@+id/btnSeven"
        style="@style/Widget.MaterialComponents.Button.Icon"
        android:layout_width="70dp"
        android:layout_height="70dp"
        android:layout_marginTop="@dimen/_16sdp"
        android:gravity="center"
        android:insetLeft="0dp"
        android:insetTop="0dp"
        android:insetRight="0dp"
        android:insetBottom="0dp"
        android:tag="7"
        android:text="7"
        android:textAppearance="@style/TextAppearance.AppCompat.Large"
        android:textColor="#ffffff"
        app:cornerRadius="@dimen/_50sdp"
        app:layout_constraintEnd_toStartOf="@+id/btnEight"
        app:layout_constraintHorizontal_bias="0.5"
        app:layout_constraintHorizontal_chainStyle="spread"
        app:layout_constraintHorizontal_weight="1"
        app:layout_constraintStart_toStartOf="parent"
        app:layout_constraintTop_toBottomOf="@+id/btnFour"
        app:shapeAppearanceOverlay="@style/ShapeAppearanceOverlay.MyApp.Button.Rounded" />

    <com.google.android.material.button.MaterialButton
        android:id="@+id/btnEight"
        style="@style/Widget.MaterialComponents.Button.Icon"
        android:layout_width="70dp"
        android:layout_height="70dp"
        android:gravity="center"
        android:insetLeft="0dp"
        android:insetTop="0dp"
        android:insetRight="0dp"
        android:insetBottom="0dp"
        android:tag="8"
        android:text="8"
        android:textAppearance="@style/TextAppearance.AppCompat.Large"
        android:textColor="#ffffff"
        app:cornerRadius="@dimen/_50sdp"
        app:layout_constraintBottom_toBottomOf="@+id/btnSeven"
        app:layout_constraintEnd_toStartOf="@+id/btnNine"
        app:layout_constraintHorizontal_bias="0.5"
        app:layout_constraintHorizontal_chainStyle="spread"
        app:layout_constraintHorizontal_weight="1"
        app:layout_constraintStart_toEndOf="@+id/btnFour"
        app:layout_constraintTop_toTopOf="@+id/btnSeven"
        app:shapeAppearanceOverlay="@style/ShapeAppearanceOverlay.MyApp.Button.Rounded" />

    <com.google.android.material.button.MaterialButton
        android:id="@+id/btnNine"
        style="@style/Widget.MaterialComponents.Button.Icon"
        android:layout_width="70dp"
        android:layout_height="70dp"
        android:gravity="center"
        android:insetLeft="0dp"
        android:insetTop="0dp"
        android:insetRight="0dp"
        android:insetBottom="0dp"
        android:tag="9"
        android:text="9"
        android:textAppearance="@style/TextAppearance.AppCompat.Large"
        android:textColor="#ffffff"
        app:cornerRadius="@dimen/_50sdp"
        app:layout_constraintBottom_toBottomOf="@+id/btnSeven"
        app:layout_constraintEnd_toEndOf="parent"
        app:layout_constraintHorizontal_bias="0.5"
        app:layout_constraintHorizontal_chainStyle="spread"
        app:layout_constraintHorizontal_weight="1"
        app:layout_constraintStart_toEndOf="@+id/btnEight"
        app:layout_constraintTop_toTopOf="@+id/btnSeven"
        app:shapeAppearanceOverlay="@style/ShapeAppearanceOverlay.MyApp.Button.Rounded" />

    <com.google.android.material.button.MaterialButton
        android:id="@+id/btnZero"
        style="@style/Widget.MaterialComponents.Button.Icon"
        android:layout_width="70dp"
        android:layout_height="70dp"
        android:layout_marginTop="@dimen/_16sdp"
        android:gravity="center"
        android:insetLeft="0dp"
        android:insetTop="0dp"
        android:insetRight="0dp"
        android:insetBottom="0dp"
        android:tag="0"
        android:text="0"
        android:textAppearance="@style/TextAppearance.AppCompat.Large"
        android:textColor="#ffffff"
        app:cornerRadius="@dimen/_50sdp"
        app:layout_constraintEnd_toEndOf="@+id/btnEight"
        app:layout_constraintStart_toStartOf="@+id/btnEight"
        app:layout_constraintTop_toBottomOf="@+id/btnEight"
        app:shapeAppearanceOverlay="@style/ShapeAppearanceOverlay.MyApp.Button.Rounded" />

    <com.google.android.material.floatingactionbutton.FloatingActionButton
        android:id="@+id/fabClose"
        style="@style/Widget.MaterialComponents.Button.Icon"
        android:layout_width="wrap_content"
        android:layout_height="wrap_content"
        android:layout_marginTop="20dp"
        android:src="@drawable/ic_close"
        app:fabCustomSize="70dp"
        app:layout_constraintEnd_toEndOf="parent"
        app:layout_constraintStart_toEndOf="@id/btnZero"
        app:layout_constraintTop_toBottomOf="@id/btnNine"
        app:tint="@android:color/white" />

</androidx.constraintlayout.widget.ConstraintLayout>
```
#### Step 3. Write Code

Finally we need to write our code as follows:


**(a). `MainActivity.kt`**

> Our `MainActivity` class.

Create a Kotlin file named `MainActivity.kt` and add the necessary imports. Here are some of the imports we will be using:
1. `TextUtils` from the `android.text` package.
2. `Log` from the `android.util` package.
3. `View` from the `android.view` package.
4. `AppCompatActivity` from the `androidx.appcompat.app` package.
5. `*` from the `kotlinx.android.synthetic.main.activity_main` package.

Then extend the `AppCompatActivity` and add its contents as follows:

First override these callbacks: 

1. `onCreate(savedInstanceState: Bundle?) `.

Then we will be creating the following functions:

1. `writeOTP(parameter)` - This function will take a `View` object as a parameter.
2. `clearOTP() `.

**(a). Our `clearOTP()` function.**

A function to clear o t p:

```kotlin
    private fun clearOTP() {
        when {
            !TextUtils.isEmpty(edtFour.text) -> edtFour.setText("")
            !TextUtils.isEmpty(edtThree.text) -> edtThree.setText("")
            !TextUtils.isEmpty(edtTwo.text) -> edtTwo.setText("")
            !TextUtils.isEmpty(edtOne.text) -> edtOne.setText("")
        }

    }
```

**(b). Our `writeOTP()` function.**

A function to write o t p:

```kotlin
    private fun writeOTP(view: View) {
        Log.e("CURRENT_TEXT :---> ", view.tag.toString())
        when {
            TextUtils.isEmpty(edtOne.text) -> edtOne.setText(view.tag.toString())
            TextUtils.isEmpty(edtTwo.text) -> edtTwo.setText(view.tag.toString())
            TextUtils.isEmpty(edtThree.text) -> edtThree.setText(view.tag.toString())
            TextUtils.isEmpty(edtFour.text) -> edtFour.setText(view.tag.toString())
        }

    }
```


Here is the full code:

```kotlin
package replace_with_your_package_name


import android.os.Bundle
import android.text.TextUtils
import android.util.Log
import android.view.View
import androidx.appcompat.app.AppCompatActivity
import kotlinx.android.synthetic.main.activity_main.*


class MainActivity : AppCompatActivity() {


    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_main)

        btnOne.setOnClickListener { writeOTP(it) }
        btnTwo.setOnClickListener { writeOTP(it) }
        btnThree.setOnClickListener { writeOTP(it) }
        btnFour.setOnClickListener { writeOTP(it) }
        btnFive.setOnClickListener { writeOTP(it) }
        btnSix.setOnClickListener { writeOTP(it) }
        btnSeven.setOnClickListener { writeOTP(it) }
        btnEight.setOnClickListener { writeOTP(it) }
        btnNine.setOnClickListener { writeOTP(it) }
        btnZero.setOnClickListener { writeOTP(it) }

        fabClose.setOnClickListener { clearOTP() }
    }

    private fun writeOTP(view: View) {
        Log.e("CURRENT_TEXT :---> ", view.tag.toString())
        when {
            TextUtils.isEmpty(edtOne.text) -> edtOne.setText(view.tag.toString())
            TextUtils.isEmpty(edtTwo.text) -> edtTwo.setText(view.tag.toString())
            TextUtils.isEmpty(edtThree.text) -> edtThree.setText(view.tag.toString())
            TextUtils.isEmpty(edtFour.text) -> edtFour.setText(view.tag.toString())
        }

    }

    private fun clearOTP() {
        when {
            !TextUtils.isEmpty(edtFour.text) -> edtFour.setText("")
            !TextUtils.isEmpty(edtThree.text) -> edtThree.setText("")
            !TextUtils.isEmpty(edtTwo.text) -> edtTwo.setText("")
            !TextUtils.isEmpty(edtOne.text) -> edtOne.setText("")
        }

    }

}



```


<!--more-->

### Reference

Download the code below:

|No.|Link|
|--|---|
|1.|[Download Full Code](https://github.com/askNilesh/Phone-Dialer-Pad/archive/refs/heads/master.zip)|
|2.|Read more [here](https://github.com/askNilesh/Phone-Dialer-Pad).|
|3.|Follow code author [here](https://github.com/askNilesh).|
