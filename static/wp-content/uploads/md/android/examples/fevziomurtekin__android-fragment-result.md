# Communicate between DialogFragment and Fragment

>  Basic fragment result application..

![android-fragment-result Example Tutorial](https://github.com/fevziomurtekin/android-fragment-result/raw/main/art/post.png)

Learn how to communicate between `BottomSheetDialogFragment` and a `Fragment` in kotlin android.

#### Step 1. Dependencies

We need to add some dependencies in our `app/build.gradle` file as shown below:

**(a). `build.gradle`**

> Our app-level `build.gradle`.

We Prepare our dependencies as shown below. You may use later versions.

We will also enable Java8 so that we can utilize a myriad of Java8 features.

We then declare our app dependencies under the `dependencies` closure, using the `implementation` statement. We will need the following 9 dependencies:

1. `Kotlin-stdlib` - So that we can use Kotlin as our programming language.
2. `Core-ktx` - With this we can target the latest platform features and APIs while also supporting older devices.
3. `Appcompat` - Allows us access to new APIs on older API versions of the platform (many using Material Design).
4. `Material` - Collection of Modular and customizable Material Design UI components for Android.
5. `Constraintlayout` - This allows us to Position and size widgets in a flexible way with relative positioning.
6. Our `Navigation-fragment-ktx` library.
7. Our `Navigation-ui-ktx` library.
8. Our `Legacy-support-v4` support library. Feel free to use newer AndroidX versions.
9. `Fragment-ktx` - Enables us to Segment our app into multiple, independent screens that are hosted within an Activity.

Here is our full `app/build.gradle`:

```groovy
plugins {
  id 'com.android.application'
  id 'kotlin-android'
}

android {
  compileSdkVersion 30
  buildToolsVersion "30.0.2"

  defaultConfig {
    applicationId "com.fevziomurtekin.myapplication"
    minSdkVersion 16
    targetSdkVersion 30
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
}

dependencies {

  implementation "org.jetbrains.kotlin:kotlin-stdlib:$kotlin_version"
  implementation 'androidx.core:core-ktx:1.3.2'
  implementation 'androidx.appcompat:appcompat:1.2.0'
  implementation 'com.google.android.material:material:1.2.1'
  implementation 'androidx.constraintlayout:constraintlayout:2.0.4'
  implementation "androidx.navigation:navigation-fragment-ktx:2.3.2"
  implementation "androidx.navigation:navigation-ui-ktx:2.3.2"
  implementation 'androidx.legacy:legacy-support-v4:1.0.0'

  def fragment_version = "1.3.0-alpha04"
  implementation "androidx.fragment:fragment-ktx:$fragment_version"

  testImplementation 'junit:junit:4.+'
  androidTestImplementation 'androidx.test.ext:junit:1.1.2'
  androidTestImplementation 'androidx.test.espresso:espresso-core:3.3.0'
}
```

#### Step 2. Design Layouts

For this project let's create the following layouts:

**(a). `fragment_home.xml`**

> Our `fragment_home` layout.

This layout will represent our Home Fragment's layout. Specify [`androidx.constraintlayout.widget.ConstraintLayout`](https://android.camposha.info/en/constraintlayout) as it's root element then inside it place the following [widgets](https://android.camposha.info/en/view):

1. [`TextView`](https://android.camposha.info/en/textview)
2. [`Button`](https://android.camposha.info/en/button)

```xml
<?xml version="1.0" encoding="utf-8"?>
<androidx.constraintlayout.widget.ConstraintLayout xmlns:android="http://schemas.android.com/apk/res/android"
    xmlns:tools="http://schemas.android.com/tools"
    android:layout_width="match_parent"
    android:layout_height="match_parent"
    xmlns:app="http://schemas.android.com/apk/res-auto"
    tools:context=".HomeFragment">

    <TextView
        android:id="@+id/tv_result"
        android:layout_width="wrap_content"
        android:layout_height="wrap_content"
        app:layout_constraintTop_toTopOf="parent"
        app:layout_constraintLeft_toLeftOf="parent"
        app:layout_constraintRight_toRightOf="parent"
        app:layout_constraintBottom_toBottomOf="parent"
        android:text="Result : " />

    <Button
        android:id="@+id/btn_show_dialog"
        android:layout_width="wrap_content"
        android:layout_height="wrap_content"
        app:layout_constraintTop_toBottomOf="@+id/tv_result"
        app:layout_constraintLeft_toLeftOf="parent"
        app:layout_constraintRight_toRightOf="parent"
        android:layout_marginTop="10dp"
        android:text="Show Dialog"
        />

</androidx.constraintlayout.widget.ConstraintLayout>
```

**(b). `dialog_home.xml`**

> Our `dialog_home` layout.

This layout will represent our Home Dialog's layout. Specify [`androidx.constraintlayout.widget.ConstraintLayout`](https://android.camposha.info/en/constraintlayout) as it's root element then inside it place the following [widgets](https://android.camposha.info/en/view):

1. [`TextView`](https://android.camposha.info/en/textview)
2. [`LinearLayout`](https://android.camposha.info/en/linearlayout)
3. [`Button`](https://android.camposha.info/en/button)

```xml
<?xml version="1.0" encoding="utf-8"?>
<androidx.constraintlayout.widget.ConstraintLayout xmlns:android="http://schemas.android.com/apk/res/android"
    android:layout_width="match_parent"
    android:layout_height="wrap_content"
    xmlns:app="http://schemas.android.com/apk/res-auto">

    <TextView
        android:id="@+id/tv_bottom_dialog_content"
        android:layout_width="wrap_content"
        android:layout_height="wrap_content"
        app:layout_constraintTop_toTopOf="parent"
        app:layout_constraintLeft_toLeftOf="parent"
        app:layout_constraintRight_toRightOf="parent"
        android:layout_marginTop="10dp"
        android:fontFamily="sans-serif-black"
        android:textSize="20sp"
        android:text="Content"
        />

    <LinearLayout
        android:id="@+id/ll_buttons"
        android:layout_width="match_parent"
        android:layout_height="wrap_content"
        android:orientation="horizontal"
        app:layout_constraintBottom_toBottomOf="parent"
        android:layout_marginTop="10dp"
        app:layout_constraintTop_toBottomOf="@id/tv_bottom_dialog_content">

        <Button
            android:id="@+id/btnAccept"
            android:layout_width="0dp"
            android:layout_height="wrap_content"
            android:backgroundTint="@android:color/holo_green_light"
            android:layout_marginRight="10dp"
            android:layout_marginLeft="10dp"
            android:text="Accept"
            android:layout_weight="1"/>


        <Button
            android:id="@+id/btnReject"
            android:layout_width="0dp"
            android:layout_height="wrap_content"
            android:backgroundTint="@android:color/holo_red_light"
            android:layout_marginLeft="10dp"
            android:layout_marginRight="10dp"
            android:text="reject"
            android:layout_weight="1"
            />

    </LinearLayout>

</androidx.constraintlayout.widget.ConstraintLayout>
```

**(c). `activity_main.xml`**

> Our `activity_main` layout.

This layout will represent our Main Activity's UI. Specify [`androidx.constraintlayout.widget.ConstraintLayout`](https://android.camposha.info/en/constraintlayout) as it's root element then inside it place the following [widgets](https://android.camposha.info/en/view):

1. [`FragmentContainerView`](https://android.camposha.info/en/fragmentcontainerview)

```xml
<?xml version="1.0" encoding="utf-8"?>
<androidx.constraintlayout.widget.ConstraintLayout xmlns:android="http://schemas.android.com/apk/res/android"
  xmlns:app="http://schemas.android.com/apk/res-auto"
  xmlns:tools="http://schemas.android.com/tools"
  android:layout_width="match_parent"
  android:layout_height="match_parent"
  tools:context=".MainActivity">

    <androidx.fragment.app.FragmentContainerView
        android:id="@+id/nav_host_fragment"
        android:name="androidx.navigation.fragment.NavHostFragment"
        android:layout_width="0dp"
        android:layout_height="0dp"
        app:layout_constraintLeft_toLeftOf="parent"
        app:layout_constraintRight_toRightOf="parent"
        app:layout_constraintTop_toTopOf="parent"
        app:layout_constraintBottom_toBottomOf="parent"
        app:defaultNavHost="true"
        app:navGraph="@navigation/nav_graph" />


</androidx.constraintlayout.widget.ConstraintLayout>
```
#### Step 3. Write Code

Finally we need to write our code as follows:


**(a). `HomeDialog.kt`**

> Our `HomeDialog` class.

Create a Kotlin file named `HomeDialog.kt` and add the necessary imports. Here are some of the imports we will be using:
1. `View` from the `android.view` package.
2. `ViewGroup` from the `android.view` package.
3. `Button` from the `android.widget` package.
4. `bundleOf` from the `androidx.core.os` package.
5. `findNavController` from the `androidx.navigation.fragment` package.

Then extend the `BottomSheetDialogFragment` and add its contents as follows:

First override these callbacks: 

1. `onStart() `.
2. `onStateChanged(p0: View, p1: Int) `.
3. `onSlide(p0: View, p1: Float) `.
4. `onViewCreated(view: View, savedInstanceState: Bundle?) `.
5. `onCancel(dialog: DialogInterface) `.

Then we will be creating the following functions:

1. `setListeners() `.
2. `setResult(parameter)` - We pass a `Boolean` object as a parameter.

**(a). Our `setListeners()` function**

Write the `setListeners()` function as follows:

```kotlin
    private fun setListeners() {
        btnAccept?.setOnClickListener { setResult(true) }
        btnReject?.setOnClickListener { setResult(false) }
    }
```

**(b). Our `setResult()` function**

Write the `setResult()` function as follows:

```kotlin
    private fun setResult(isAccept: Boolean) {
        parentFragmentManager.setFragmentResult(REQUEST_KEY, bundleOf("data" to isAccept))
        findNavController().popBackStack()
    }
```


Here is the full code:

```kotlin
package replace_with_your_package_name

import android.content.DialogInterface
import android.os.Bundle
import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import android.widget.Button
import androidx.core.os.bundleOf
import androidx.navigation.fragment.findNavController
import com.google.android.material.bottomsheet.BottomSheetBehavior
import com.google.android.material.bottomsheet.BottomSheetDialogFragment


class HomeDialog : BottomSheetDialogFragment() {

    private var btnAccept: Button? = null
    private var btnReject: Button? = null

    override fun onStart() {
        super.onStart()
        (requireView().parent as? View)?.let { safeView ->
            BottomSheetBehavior.from(safeView).apply {
                state = BottomSheetBehavior.STATE_EXPANDED
                setBottomSheetCallback(object : BottomSheetBehavior.BottomSheetCallback() {
                    override fun onStateChanged(p0: View, p1: Int) {
                        if (p1 == BottomSheetBehavior.STATE_DRAGGING) {
                            state = BottomSheetBehavior.STATE_EXPANDED
                        }
                    }

                    override fun onSlide(p0: View, p1: Float) {}
                })
            }
        }
    }

    override fun onCreateView(
        inflater: LayoutInflater,
        container: ViewGroup?,
        savedInstanceState: Bundle?
    ): View? = inflater.inflate(
        R.layout.dialog_home, container, false
    )

    override fun onViewCreated(view: View, savedInstanceState: Bundle?) {
        super.onViewCreated(view, savedInstanceState)
        btnAccept = view.findViewById(R.id.btnAccept)
        btnReject = view.findViewById(R.id.btnReject)
        setListeners()  
    }

    private fun setListeners() {
        btnAccept?.setOnClickListener { setResult(true) }
        btnReject?.setOnClickListener { setResult(false) }
    }

    private fun setResult(isAccept: Boolean) {
        parentFragmentManager.setFragmentResult(REQUEST_KEY, bundleOf("data" to isAccept))
        findNavController().popBackStack()
    }

    override fun onCancel(dialog: DialogInterface) {
        super.onCancel(dialog)
        setResult(false)
    }

}


```

**(b). `HomeFragment.kt`**

> Our `HomeFragment` class.

Create a Kotlin file named `HomeFragment.kt` and add the necessary imports. Here are some of the imports we will be using:
1. `ViewGroup` from the `android.view` package.
2. `Button` from the `android.widget` package.
3. `TextView` from the `android.widget` package.
4. `Fragment` from the `androidx.fragment.app` package.
5. `findNavController` from the `androidx.navigation.fragment` package.

Then extend the `Fragment` and add its contents as follows:

First override these callbacks: 

1. `onViewCreated(view: View, savedInstanceState: Bundle?) `.

Here is the full code:

```kotlin
package replace_with_your_package_name

import android.os.Bundle
import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import android.widget.Button
import android.widget.TextView
import androidx.fragment.app.Fragment
import androidx.navigation.fragment.findNavController

const val REQUEST_KEY = "request"

class HomeFragment : Fragment() {

    private var tvResult: TextView? = null
    private var btnShowDialog: Button? = null

    override fun onCreateView(
        inflater: LayoutInflater,
        container: ViewGroup?,
        savedInstanceState: Bundle?
    ): View? = inflater.inflate(R.layout.fragment_home,container,false)


    override fun onViewCreated(view: View, savedInstanceState: Bundle?) {
        super.onViewCreated(view, savedInstanceState)

        tvResult = view.findViewById(R.id.tv_result)
        btnShowDialog = view.findViewById(R.id.btn_show_dialog)

        // this listen to result.
        parentFragmentManager.setFragmentResultListener(
            REQUEST_KEY,
            this,
            { key, data ->
                if(key == REQUEST_KEY){
                    val result = data.getBoolean("data").let { isAccept->
                        if(isAccept) "Accepted" else "Rejected"
                    }
                    tvResult?.text = result
                }
            }
        )

        // show bottom dialog
        btnShowDialog?.setOnClickListener {
            findNavController().navigate(R.id.homeDialog)
        }

    }
}

```

**(c). `MainActivity.kt`**

> Our `MainActivity` class.

Here is the full code:

```kotlin
package replace_with_your_package_name

import androidx.appcompat.app.AppCompatActivity
import android.os.Bundle

class MainActivity : AppCompatActivity() {
  override fun onCreate(savedInstanceState: Bundle?) {
    super.onCreate(savedInstanceState)
    setContentView(R.layout.activity_main)
  }
}

```

### Reference

Download the code below:

|No.|Link|
|--|---|
|1.|[Download Full Code](https://github.com/fevziomurtekin/android-fragment-result/archive/refs/heads/main.zip)|
|2.|Read more [here](https://github.com/fevziomurtekin/android-fragment-result).|
|3.|Follow code author [here](https://github.com/fevziomurtekin).|
