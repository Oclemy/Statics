# MotionToast

>  🌈 A Beautiful Motion Toast Library for Kotlin Android.


![Toast Library Tutorial](https://camo.githubusercontent.com/e4be58c2eb500c8634ceff111c34f70b52db29ed45acc60eaf229098fddc801c/68747470733a2f2f696d672e736869656c64732e696f2f62616467652f4150492d32312532422d627269676874677265656e2e7376673f7374796c653d666c6174)

A Beautiful Multipurpose Motion Toast Library in Android using Kotlin.

![MotionToast Example Tutorial](https://github.com/Spikeysanju/Video_templates/raw/master/Github%20Card.png)


### Preview - Motion Toast 🌟

![MotionToast Example Tutorial](https://github.com/Spikeysanju/Video_templates/raw/master/Motion%20Toast.gif)


### Preview - Color Motion Toast 🌈

![MotionToast Example Tutorial](https://github.com/Spikeysanju/Video_templates/raw/master/Toast%20Types-5.png)


### Preview - Dark Toast 🌈

![MotionToast Example Tutorial](https://github.com/Spikeysanju/Video_templates/raw/master/Dark%20Toast.png)


### Preview - Dark Color Toast 🌈

![MotionToast Example Tutorial](https://github.com/Spikeysanju/Video_templates/raw/master/Dark%20Color%20Toast.png)


### Types of Toast Style ❤️

![MotionToast Example Tutorial](https://github.com/Spikeysanju/Video_templates/raw/master/Toast%20Types-3.png)

![MotionToast Example Tutorial](https://github.com/Spikeysanju/Video_templates/raw/master/Toast%20Types-5.png)

![MotionToast Example Tutorial](https://github.com/Spikeysanju/Video_templates/raw/master/Dark%20Toast.png)

![MotionToast Example Tutorial](https://github.com/Spikeysanju/Video_templates/raw/master/Dark%20Color%20Toast.png)


### Step 1: Installation

Dependency Project Level

Step 1. Add the JitPack repository to your build file. Add it in your root build.gradle at the end of repositories:

```groovy
allprojects {
		repositories {
			...
			maven { url 'https://jitpack.io' }
		}
	}
```


Dependency App Level:

Add dependency in your app module

```groovy
dependencies {
	        implementation 'com.github.Spikeysanju:MotionToast:1.4' 
	}
```




### Step 2: Usage

#### Five Toast Types

```kotlin
1. TOAST_SUCCESS
        2. TOAST_ERROR
        3. TOAST_WARNING
        4. TOAST_INFO
        5. TOAST_DELETE
```


#### Toast Duration ⌛️

```kotlin
1. LONG_DURATION // 4 Seconds
        2. SHORT_DURATION // 2 Seconds
```


#### Success Toast


```kotlin
MotionToast.createToast(this,
 		"Hurray success 😍"
 		"Upload Completed successfully!",
                MotionToastStyle.SUCCESS,
                MotionToast.GRAVITY_BOTTOM,
                MotionToast.LONG_DURATION,
                ResourcesCompat.getFont(this,R.font.helvetica_regular))
```


#### Error Toast

```kotlin
MotionToast.createToast(this,
 		    "Failed ☹️"
 		    "Profile Update Failed!",
                    MotionToastStyle.ERROR,
                    MotionToast.GRAVITY_BOTTOM,
                    MotionToast.LONG_DURATION,
                    ResourcesCompat.getFont(this,R.font.helvetica_regular))
```


#### Warning Toast

```kotlin
MotionToast.createToast(this,"Please fill all the details!",
                    MotionToastStyle.WARNING,
                    MotionToast.GRAVITY_BOTTOM,
                    MotionToast.LONG_DURATION,
                    ResourcesCompat.getFont(this,R.font.helvetica_regular))
```


#### Info Toast


```kotlin
MotionToast.createToast(this,"This is information toast!",
                    MotionToastStyle.INFO,
                    MotionToast.GRAVITY_BOTTOM,
                    MotionToast.LONG_DURATION,
                    ResourcesCompat.getFont(this,R.font.helvetica_regular))
```


#### Delete Toast

```kotlin
MotionToast.createToast(this,"Delete all history!",
                    MotionToastStyle.DELETE,
                    MotionToast.GRAVITY_BOTTOM,
                    MotionToast.LONG_DURATION,
                    ResourcesCompat.getFont(this,R.font.helvetica_regular))
```


### Sample Code for - Color Motion Toast 🌈


#### Success Toast


```kotlin
MotionToast.createColorToast(this,"Upload Completed!",
                MotionToastStyle.SUCCESS,
                MotionToast.GRAVITY_BOTTOM,
                MotionToast.LONG_DURATION,
                ResourcesCompat.getFont(this,R.font.helvetica_regular))
```


#### Error Toast


```kotlin
MotionToast.createColorToast(this,"Profile Update Failed!",
                    MotionToastStyle.ERROR,
                    MotionToast.GRAVITY_BOTTOM,
                    MotionToast.LONG_DURATION,
                    ResourcesCompat.getFont(this,R.font.helvetica_regular))
```


#### Warning Toast


```kotlin
MotionToast.createColorToast(this,"Please fill all the details!",
                    MotionToastStyle.WARNING,
                    MotionToast.GRAVITY_BOTTOM,
                    MotionToast.LONG_DURATION,
                    ResourcesCompat.getFont(this,R.font.helvetica_regular))
```


#### Info Toast


```kotlin
MotionToast.createColorToast(this,"This is information toast!",
                    MotionToastStyle.INFO,
                    MotionToast.GRAVITY_BOTTOM,
                    MotionToast.LONG_DURATION,
                    ResourcesCompat.getFont(this,R.font.helvetica_regular))
```


#### Delete Toast


```kotlin
MotionToast.createColorToast(this,"Delete all history!",
                    MotionToastStyle.DELETE,
                    MotionToast.GRAVITY_BOTTOM,
                    MotionToast.LONG_DURATION,
                    ResourcesCompat.getFont(this,R.font.helvetica_regular))
```


#### Success Toast


```kotlin
MotionToast.darkToast(this,"Upload Completed!",
                MotionToastStyle.SUCCESS,
                MotionToast.GRAVITY_BOTTOM,
                MotionToast.LONG_DURATION,
                ResourcesCompat.getFont(this,R.font.helvetica_regular))
```


#### Error Toast


```kotlin
MotionToast.darkToast(this,"Profile Update Failed!",
                    MotionToastStyle.ERROR,
                    MotionToast.GRAVITY_BOTTOM,
                    MotionToast.LONG_DURATION,
                    ResourcesCompat.getFont(this,R.font.helvetica_regular))
```


#### Warning Toast


```kotlin
MotionToast.darkToast(this,"Please fill all the details!",
                    MotionToastStyle.WARNING,
                    MotionToast.GRAVITY_BOTTOM,
                    MotionToast.LONG_DURATION,
                    ResourcesCompat.getFont(this,R.font.helvetica_regular))
```


#### Info Toast


```kotlin
MotionToast.darkToast(this,"This is information toast!",
                    MotionToastStyle.INFO,
                    MotionToast.GRAVITY_BOTTOM,
                    MotionToast.LONG_DURATION,
                    ResourcesCompat.getFont(this,R.font.helvetica_regular))
```


#### Delete Toast


```kotlin
MotionToast.darkToast(this,"Delete all history!",
                    MotionToastStyle.DELETE,
                    MotionToast.GRAVITY_BOTTOM,
                    MotionToast.LONG_DURATION,
                    ResourcesCompat.getFont(this,R.font.helvetica_regular))
```


### Sample Code for - Dark Color Toast 🌚🖤🌈


#### Success Toast


```kotlin
MotionToast.darkColorToast(this,"Upload Completed!",
                MotionToastStyle.SUCCESS,
                MotionToast.GRAVITY_BOTTOM,
                MotionToast.LONG_DURATION,
                ResourcesCompat.getFont(this,R.font.helvetica_regular))
```


#### Error Toast


```kotlin
MotionToast.darkColorToast(this,"Profile Update Failed!",
                    MotionToastStyle.ERROR,
                    MotionToast.GRAVITY_BOTTOM,
                    MotionToast.LONG_DURATION,
                    ResourcesCompat.getFont(this,R.font.helvetica_regular))
```


#### Warning Toast


```kotlin
MotionToast.darkColorToast(this,"Please fill all the details!",
                    MotionToastStyle.WARNING,
                    MotionToast.GRAVITY_BOTTOM,
                    MotionToast.LONG_DURATION,
                    ResourcesCompat.getFont(this,R.font.helvetica_regular))
```


#### Info Toast


```kotlin
MotionToast.darkColorToast(this,"This is information toast!",
                    MotionToastStyle.INFO,
                    MotionToast.GRAVITY_BOTTOM,
                    MotionToast.LONG_DURATION,
                    ResourcesCompat.getFont(this,R.font.helvetica_regular))
```


#### Delete Toast


```kotlin
MotionToast.darkColorToast(this,"Delete all history!",
                    MotionToastStyle.DELETE,
                    MotionToast.GRAVITY_BOTTOM,
                    MotionToast.LONG_DURATION,
                    ResourcesCompat.getFont(this,R.font.helvetica_regular))
```



### Full Example

For a full `MotionToast` Toast Library example project follow the following steps.

<!--more-->

#### Step 1. Design Layouts

**(a). activity_main.xml**


> Our `activity_main` layout.

First inside your `/res/layout/` directory create an xml layout file named `activity_main.xml`.

Then design your XML layout using the following 4 UI widgets and ViewGroups:

1. `RelativeLayout`
2. `LinearLayout`
3. `Switch`
4. `Button`

```xml
<?xml version="1.0" encoding="utf-8"?>
<RelativeLayout xmlns:android="http://schemas.android.com/apk/res/android"
    xmlns:tools="http://schemas.android.com/tools"
    android:layout_width="match_parent"
    android:layout_height="match_parent"
    android:background="@android:color/white"
    tools:context=".MainActivity">


    <LinearLayout
        android:layout_width="match_parent"
        android:layout_height="wrap_content"
        android:gravity="center_horizontal"
        android:layout_centerInParent="true"
        android:orientation="vertical">

        <Switch
            android:id="@+id/switch_custom_colors"
            android:layout_width="200dp"
            android:text="Custom toast colors"
            android:layout_height="wrap_content" />

        <Button
            android:id="@+id/successBtn"
            android:layout_width="200dp"
            android:layout_height="wrap_content"
            android:text="Success"
            android:fontFamily="@font/helveticabold"/>
        <Button
            android:id="@+id/errorBtn"
            android:layout_width="200dp"
            android:layout_height="wrap_content"
            android:text="Error"
            android:fontFamily="@font/helveticabold"/>

        <Button
            android:id="@+id/warningBtn"
            android:layout_width="200dp"
            android:layout_height="wrap_content"
            android:text="Warning"
            android:fontFamily="@font/helveticabold"/>
        <Button
            android:id="@+id/infoBtn"
            android:layout_width="200dp"
            android:layout_height="wrap_content"
            android:text="Info"
            android:fontFamily="@font/helveticabold"/>
        <Button
            android:id="@+id/deleteBtn"
            android:layout_width="200dp"
            android:layout_height="wrap_content"
            android:text="Delete"
            android:fontFamily="@font/helveticabold"/>

        <Button
            android:id="@+id/noInternetBtn"
            android:layout_width="200dp"
            android:layout_height="wrap_content"
            android:fontFamily="@font/helveticabold"
            android:text="No Internet" />

    </LinearLayout>




</RelativeLayout>
```

**(b). motion_toast.xml**


> Our `motion_toast` layout.

Moreover design your XML layout using the following 5 UI widgets and ViewGroups:

1. `RelativeLayout`
2. `View`
3. `ImageView`
4. `LinearLayout`
5. `TextView`

```xml
<?xml version="1.0" encoding="utf-8"?>
<RelativeLayout xmlns:android="http://schemas.android.com/apk/res/android"
    xmlns:app="http://schemas.android.com/apk/res-auto"
    android:id="@+id/motion_toast_view"
    android:layout_width="match_parent"
    android:layout_height="100dp"
    android:layout_margin="@dimen/dimen_24"
    android:background="@android:color/white">

    <View
        android:id="@+id/colorView"
        android:layout_width="@dimen/dimen_12"
        android:layout_height="100dp"
        android:layout_alignParentStart="true"
        android:background="@drawable/color_view_background"
        app:layout_constraintBottom_toBottomOf="parent"
        app:layout_constraintStart_toStartOf="parent"
        app:layout_constraintTop_toTopOf="parent" />

    <ImageView
        android:id="@+id/custom_toast_image"
        android:layout_width="40dp"
        android:layout_height="40dp"
        android:layout_marginStart="@dimen/dimen_8"
        android:layout_centerVertical="true"
        android:layout_toEndOf="@id/colorView"
        android:contentDescription="@string/app_name"
        android:src="@drawable/ic_info_yellow" />

    <LinearLayout
        android:id="@+id/custom_text_view"
        android:layout_width="match_parent"
        android:layout_height="wrap_content"
        android:layout_centerVertical="true"
        android:layout_marginStart="@dimen/dimen_8"
        android:layout_marginEnd="@dimen/dimen_8"
        android:layout_toEndOf="@id/custom_toast_image"
        android:gravity="start"
        android:orientation="vertical">

        <TextView
            android:id="@+id/custom_toast_text"
            android:layout_width="wrap_content"
            android:layout_height="wrap_content"
            android:layout_marginStart="@dimen/dimen_12"
            android:layout_marginTop="@dimen/dimen_12"
            android:layout_marginEnd="@dimen/dimen_12"
            android:fontFamily="@font/montserrat_bold"
            android:letterSpacing="0.10"
            android:text="@string/text_warning"
            android:textAllCaps="true"
            android:textAlignment="textStart"
            android:textAppearance="@style/TextAppearance.MaterialComponents.Caption"
            android:textColor="@android:color/black"
            app:layout_constraintEnd_toEndOf="parent"
            app:layout_constraintStart_toEndOf="@id/custom_toast_image"
            app:layout_constraintTop_toTopOf="parent" />

        <TextView
            android:id="@+id/custom_toast_description"
            android:layout_width="wrap_content"
            android:layout_height="wrap_content"
            android:layout_marginStart="@dimen/dimen_12"
            android:layout_marginTop="@dimen/dimen_4"
            android:layout_marginEnd="@dimen/dimen_12"
            android:layout_marginBottom="@dimen/dimen_12"
            android:ellipsize="marquee"
            android:fontFamily="@font/montserrat_regular"
            android:maxLines="2"
            android:text="@string/text_mock_description"
            android:textAlignment="textStart"
            android:textAppearance="@style/TextAppearance.MaterialComponents.Body2"
            android:textColor="@android:color/black"
            app:layout_constraintBottom_toBottomOf="parent"
            app:layout_constraintEnd_toEndOf="parent"
            app:layout_constraintStart_toEndOf="@id/custom_toast_image"
            app:layout_constraintTop_toBottomOf="@id/custom_toast_text" />

    </LinearLayout>

</RelativeLayout>
```

**(c). full_color_toast.xml**


> Our `full_color_toast` layout.

1. `RelativeLayout`
2. `ImageView`
3. `LinearLayout`
4. `TextView`

```xml
<?xml version="1.0" encoding="utf-8"?>
<RelativeLayout xmlns:android="http://schemas.android.com/apk/res/android"
    xmlns:app="http://schemas.android.com/apk/res-auto"
    android:id="@+id/color_toast_view"
    android:layout_width="match_parent"
    android:layout_height="100dp"
    android:layout_margin="@dimen/dimen_24"
    android:background="@drawable/toast_round_background"
    android:backgroundTint="@color/warning_color">


    <ImageView
        android:id="@+id/color_toast_image"
        android:layout_width="40dp"
        android:layout_height="40dp"
        android:layout_centerVertical="true"
        android:layout_marginStart="@dimen/dimen_12"
        android:background="@drawable/color_view_background"
        android:src="@drawable/ic_warning_yellow"
        android:contentDescription="@string/app_name"
        android:padding="@dimen/dimen_8" />

    <LinearLayout
        android:id="@+id/custom_text_view"
        android:layout_width="match_parent"
        android:layout_height="wrap_content"
        android:layout_centerVertical="true"
        android:layout_marginStart="@dimen/dimen_8"
        android:layout_marginEnd="@dimen/dimen_8"
        android:layout_toEndOf="@id/color_toast_image"
        android:gravity="start"
        android:orientation="vertical">

        <TextView
            android:id="@+id/color_toast_text"
            android:layout_width="wrap_content"
            android:layout_height="wrap_content"
            android:layout_marginStart="@dimen/dimen_12"
            android:layout_marginTop="@dimen/dimen_12"
            android:layout_marginEnd="@dimen/dimen_12"
            android:fontFamily="@font/montserrat_bold"
            android:letterSpacing="0.10"
            android:text="@string/text_warning"
            android:textAllCaps="true"
            android:textAlignment="textStart"
            android:textAppearance="@style/TextAppearance.MaterialComponents.Caption"
            android:textColor="@android:color/white"
            app:layout_constraintStart_toEndOf="@id/color_toast_image"
            app:layout_constraintTop_toTopOf="parent" />

        <TextView
            android:id="@+id/color_toast_description"
            android:layout_width="wrap_content"
            android:layout_height="wrap_content"
            android:layout_marginStart="@dimen/dimen_12"
            android:layout_marginTop="@dimen/dimen_4"
            android:layout_marginEnd="@dimen/dimen_12"
            android:layout_marginBottom="@dimen/dimen_12"
            android:ellipsize="marquee"
            android:fontFamily="@font/montserrat_regular"
            android:maxLines="2"
            android:text="@string/text_mock_description"
            android:textAlignment="textStart"
            android:textAppearance="@style/TextAppearance.MaterialComponents.Body2"
            android:textColor="@android:color/white"
            app:layout_constraintBottom_toBottomOf="parent"
            app:layout_constraintStart_toEndOf="@id/color_toast_image"
            app:layout_constraintTop_toBottomOf="@id/color_toast_text" />

    </LinearLayout>

</RelativeLayout>
```
#### Step 2. Write Code

Finally we need to write our code as follows:


**(a). MainActivity.kt**

> Our `MainActivity` class.

Just copy the code below and replace the package with your app's package name.

```kotlin
package replace_with_your_package_name

import android.os.Bundle
import android.view.View
import android.widget.CompoundButton
import androidx.appcompat.app.AppCompatActivity
import androidx.core.content.res.ResourcesCompat
import www.sanju.motiontoast.MotionToast
import www.sanju.motiontoast.MotionToastStyle
import www.sanju.motiontoastapp.databinding.ActivityMainBinding

class MainActivity : AppCompatActivity(), View.OnClickListener, View.OnLongClickListener,
    CompoundButton.OnCheckedChangeListener {

    private lateinit var binding: ActivityMainBinding

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        binding = ActivityMainBinding.inflate(layoutInflater)
        val view = binding.root
        setContentView(view)

        binding.switchCustomColors.setOnCheckedChangeListener(this)
        binding.successBtn.setOnClickListener(this)
        binding.errorBtn.setOnClickListener(this)
        binding.warningBtn.setOnClickListener(this)
        binding.infoBtn.setOnClickListener(this)
        binding.deleteBtn.setOnClickListener(this)
        binding.noInternetBtn.setOnClickListener(this)

        binding.successBtn.setOnLongClickListener(this)
        binding.errorBtn.setOnLongClickListener(this)
        binding.warningBtn.setOnLongClickListener(this)
        binding.infoBtn.setOnLongClickListener(this)
        binding.deleteBtn.setOnLongClickListener(this)
        binding.noInternetBtn.setOnLongClickListener(this)
    }

    private fun setToastColors(newColorsEnabled: Boolean) {
        if (newColorsEnabled) {
            MotionToast.setSuccessColor(R.color.custom_success_color)
            MotionToast.setErrorColor(R.color.custom_error_color)
            MotionToast.setDeleteColor(R.color.custom_delete_color)
            MotionToast.setWarningColor(R.color.custom_warning_color)
            MotionToast.setInfoColor(R.color.custom_info_color)
            MotionToast.setSuccessBackgroundColor(R.color.success_bg_color)
            MotionToast.setErrorBackgroundColor(R.color.error_bg_color)
            MotionToast.setDeleteBackgroundColor(R.color.delete_bg_color)
            MotionToast.setWarningBackgroundColor(R.color.warning_bg_color)
            MotionToast.setInfoBackgroundColor(R.color.info_bg_color)
        } else {
            MotionToast.resetToastColors()
        }
    }

    override fun onClick(v: View?) {
        when (v!!.id) {
            R.id.successBtn -> {
                MotionToast.createToast(
                    this,
                    "Profile saved",
                    "Lorem Ipsum is simply dummy this is very simple text Lorem Ipsum is simply dummy this is very simple text Lorem Ipsum is simply dummy this is very simple text",
                    MotionToastStyle.SUCCESS,
                    MotionToast.GRAVITY_BOTTOM,
                    MotionToast.LONG_DURATION,
                    ResourcesCompat.getFont(this, R.font.montserrat_regular)
                )
            }
            R.id.errorBtn -> {
                MotionToast.createToast(
                    this,
                    "Profile failed",
                    "Profile Update Failed due to this reason",
                    MotionToastStyle.ERROR,
                    MotionToast.GRAVITY_BOTTOM,
                    MotionToast.LONG_DURATION,
                    ResourcesCompat.getFont(this, R.font.helvetica_regular)
                )
            }
            R.id.warningBtn -> {

                MotionToast.createToast(
                    this,
                    "",
                    "Please Fill All The Details!",
                    MotionToastStyle.WARNING,
                    MotionToast.GRAVITY_BOTTOM,
                    MotionToast.LONG_DURATION,
                    ResourcesCompat.getFont(this, R.font.helvetica_regular)
                )
            }
            R.id.infoBtn -> {
                MotionToast.createColorToast(
                    this,
                    "",
                    "Color Toast testing here!",
                    MotionToastStyle.INFO,
                    MotionToast.GRAVITY_BOTTOM,
                    MotionToast.LONG_DURATION,
                    ResourcesCompat.getFont(this, R.font.helvetica_regular)
                )
            }
            R.id.deleteBtn -> {
                MotionToast.createToast(
                    this, "Profile Deleted!",
                    "",
                    MotionToastStyle.DELETE,
                    MotionToast.GRAVITY_BOTTOM,
                    MotionToast.LONG_DURATION,
                    ResourcesCompat.getFont(this, R.font.helvetica_regular)
                )
            }
            R.id.noInternetBtn -> {
                MotionToast.createToast(
                    this, "Please turn on internet connection!",
                    "",
                    MotionToastStyle.NO_INTERNET,
                    MotionToast.GRAVITY_BOTTOM,
                    MotionToast.LONG_DURATION,
                    ResourcesCompat.getFont(this, R.font.helvetica_regular)
                )
            }
        }

    }

    override fun onLongClick(v: View?): Boolean {
        when (v!!.id) {
            R.id.successBtn -> {
                MotionToast.createColorToast(
                    this,
                    "Post create 😍",
                    "Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
                    MotionToastStyle.SUCCESS,
                    MotionToast.GRAVITY_BOTTOM,
                    MotionToast.LONG_DURATION,
                    ResourcesCompat.getFont(this, R.font.montserrat_regular)
                )
            }
            R.id.errorBtn -> {
                MotionToast.darkToast(
                    this,
                    "",
                    "Profile Update Failed!",
                    MotionToastStyle.ERROR,
                    MotionToast.GRAVITY_BOTTOM,
                    MotionToast.LONG_DURATION,
                    ResourcesCompat.getFont(this, R.font.helvetica_regular)
                )
            }
            R.id.warningBtn -> {

                MotionToast.darkColorToast(
                    this,
                    "",
                    "Please Fill All The Details!",
                    MotionToastStyle.WARNING,
                    MotionToast.GRAVITY_BOTTOM,
                    MotionToast.LONG_DURATION,
                    ResourcesCompat.getFont(this, R.font.helvetica_regular)
                )
            }
            R.id.infoBtn -> {

                MotionToast.darkToast(
                    this,
                    "",
                    "Dark ui testing here!",
                    MotionToastStyle.INFO,
                    MotionToast.GRAVITY_BOTTOM,
                    MotionToast.LONG_DURATION,
                    ResourcesCompat.getFont(this, R.font.helvetica_regular)
                )
            }
            R.id.deleteBtn -> {
                MotionToast.darkToast(
                    this,
                    "",
                    "Profile Deleted!",
                    MotionToastStyle.DELETE,
                    MotionToast.GRAVITY_BOTTOM,
                    MotionToast.LONG_DURATION,
                    ResourcesCompat.getFont(this, R.font.helvetica_regular)
                )
            }
            R.id.noInternetBtn -> {
                MotionToast.darkToast(
                    this,
                    "",
                    "Please turn on internet connection!",
                    MotionToastStyle.NO_INTERNET,
                    MotionToast.GRAVITY_BOTTOM,
                    MotionToast.LONG_DURATION,
                    ResourcesCompat.getFont(this, R.font.helvetica_regular)
                )
            }
        }

        return true
    }

    override fun onCheckedChanged(buttonView: CompoundButton?, isChecked: Boolean) {
        setToastColors(isChecked)
    }
}


```

### Reference

Download the code below:

|No.|Link|
|--|---|
|1.|[Download Full Code](https://github.com/Spikeysanju/MotionToast/archive/refs/heads/master.zip)|
|2.|Read more [here](https://github.com/Spikeysanju/MotionToast).|
|3.|Follow code author [here](https://github.com/Spikeysanju).|
