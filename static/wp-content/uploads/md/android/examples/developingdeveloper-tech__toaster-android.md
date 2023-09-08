# Toaster-android

>  A simple library to add custom toast to android applications..

![Toast Library Tutorial](https://camo.githubusercontent.com/c851fad69be3497e0c4fede878543eaac2cafbb4e4a04328a517ffe681653877/68747470733a2f2f696d672e736869656c64732e696f2f6769746875622f762f72656c656173652f35416268697368656b536178656e612f546f61737465722d416e64726f69643f696e636c7564655f70726572656c6561736573)

![Toast Library Tutorial](https://camo.githubusercontent.com/bea843cf3bbf3e10bb4727aeef0cf73fdeafcbdd28ae668258a9ef3a1292163d/68747470733a2f2f696d672e736869656c64732e696f2f6769746875622f6c6963656e73652f35416268697368656b536178656e612f546f61737465722d416e64726f6964)

![Toast Library Tutorial](https://camo.githubusercontent.com/4442178fa1a75545d57128d966955f0d3bb33de792b481b920eb987d6f7c5231/68747470733a2f2f696d672e736869656c64732e696f2f6769746875622f72656c656173652d646174652d7072652f35416268697368656b536178656e612f746f61737465722d416e64726f6964)

![Toast Library Tutorial](https://camo.githubusercontent.com/5fb5ea8f0fcf82a1a158d6da4aaa6af9b6ee0bd20763ad010eaecc4decbc98ff/68747470733a2f2f696d672e736869656c64732e696f2f62616467652f4c616e67756167652d4b6f746c696e2d626c75653f7374796c653d666c6174266c6f676f3d6b6f746c696e)

![Toast Library Tutorial](https://camo.githubusercontent.com/28aae05a0fba45679e8e27d90609601e249b64a5fe30dfef05495de4f4e318d4/68747470733a2f2f63646e2e6275796d6561636f666665652e636f6d2f627574746f6e732f76322f64656661756c742d79656c6c6f772e706e67)


#### Step 1: Declare Jitpack

Add the JitPack repository to your `build.gradle(project)`.

```groovy
allprojects {
  repositories {
  	...
  	maven { url 'https://jitpack.io' }
  }
}
```


#### Step 2: Add Dependency

Add the dependency to your `build.gradle(Module: app)`.

```groovy
dependencies {
  	implementation 'tech.developingdeveloper.toaster-android:toaster:2.3.0'
  	implementation 'tech.developingdeveloper.toaster-android:toaster-ktx:2.3.0' //for ktx support
}
```

Please Note: toaster-ktx includes toaster module so, if you are using toaster-ktx version then you don't have to add taoster

### Step 3: Use

Video:

![Toast Library Tutorial](https://camo.githubusercontent.com/ec150f22a3d4615c9d9e3bc04f5e1f6836033ed5bd3fbd6a63ec8b96a5c896ab/68747470733a2f2f696d672e796f75747562652e636f6d2f76692f7155666e5731445a6c6a4d2f302e6a7067)

A simple use case will look like this

```kotlin
Toaster.pop(
             this,
             "A simple toast message"
         ).show()
```

With a custom drawable

```kotlin
Toaster.pop(
              this,
              "A simple toast message with image",
              R.drawable.ic_baseline_cloud_done_24 /* image */
          ).show()
```

![Toast Library Tutorial](https://user-images.githubusercontent.com/19958130/90524897-3dfec800-e18c-11ea-9544-2ab673f10d40.jpeg)


### Code Snippets


#### Using templates


- Success

```kotlin
Toaster.popSuccess(
                  this,
                  "This is a success message",
                  Toaster.LENGTH_SHORT
              ).show()
```

![Toast Library Tutorial](https://user-images.githubusercontent.com/19958130/90525085-7b635580-e18c-11ea-8bbf-5aeffb49bd11.jpeg)


- Warning

```kotlin
Toaster.popWarning(
              this,
              "This is a warning message",
              Toaster.LENGTH_SHORT
          ).show()
```

![Toast Library Tutorial](https://user-images.githubusercontent.com/19958130/90441973-7bfddc80-e0f7-11ea-902c-0944e4499c5d.jpeg)


- Error

```kotlin
Toaster.popError(
              this,
              "This is an error message",
              Toaster.LENGTH_SHORT
          ).show()
```

![Toast Library Tutorial](https://user-images.githubusercontent.com/19958130/90441972-7a341900-e0f7-11ea-87f9-1cd10c912167.jpeg)


#### Custom Toast


```kotlin
val toastBuilder = Toaster.Builder(this)
              .setMessage("File uploaded successfully")
              .setLeftDrawable(R.drawable.ic_baseline_cloud_done_24)
              .setLeftDrawableTint(R.color.blue)
              .setStripTint(R.color.blue)
              .setDuration(Toaster.LENGTH_SHORT)
```


```kotlin
Toaster.pop(toastBuilder.make()).show()
```

![Toast Library Tutorial](https://user-images.githubusercontent.com/19958130/90525146-91711600-e18c-11ea-8e26-3c862a483e95.jpeg)


#### Custom Toast (toaster-ktx)

With the toaster-ktx, you can either make `Taoster` or directly create `Toast` with the provided functions.

- Create `Taoster` usign ktx

```kotlin
val toaster = ToasterBuilderKtx.prepareToaster(this) {
 	message = "File uploaded successfully"
 	leftDrawableRes = R.drawable.ic_baseline_cloud_done_24
 	leftDrawableTint = R.color.blue
 	stripTint = R.color.blue
 	duration = Toaster.LENGTH_SHORT
}
Toaster.pop(toaster).show()
```


- Pop the Toast

```kotlin
Toaster.pop(toaster).show()
```


```kotlin
ToasterBuilderKtx.prepareToast(this) { 
     	message = "File uploaded successfully" 
     	leftDrawableRes = R.drawable.ic_baseline_cloud_done_24
     	leftDrawableTint = R.color.blue
     	stripTint = R.color.blue
     	duration = Toaster.LENGTH_SHORT
}.show()
```

![Toast Library Tutorial](https://user-images.githubusercontent.com/19958130/90525146-91711600-e18c-11ea-8e26-3c862a483e95.jpeg)

### Full Example

For a full `Toaster` Toast Library example project follow the following steps.

<!--more-->

#### Step 1. Design Layouts

In Android we design our UI interfaces using XML. So let's create the following layouts:


**(a). activity_main.xml**


> Our `activity_main` layout.

Design your XML layout using the following 2 UI widgets and ViewGroups:

1. `androidx.constraintlayout.widget.ConstraintLayout`
2. `Button`

```xml
<?xml version="1.0" encoding="utf-8"?>
<androidx.constraintlayout.widget.ConstraintLayout xmlns:android="http://schemas.android.com/apk/res/android"
    xmlns:app="http://schemas.android.com/apk/res-auto"
    xmlns:tools="http://schemas.android.com/tools"
    android:layout_width="match_parent"
    android:layout_height="match_parent"
    tools:context=".MainActivity">

    <Button
        android:id="@+id/button"
        android:layout_width="wrap_content"
        android:layout_height="wrap_content"
        android:layout_marginBottom="@dimen/margin_default"
        android:text="@string/show_toast_label"
        app:layout_constraintBottom_toTopOf="@id/with_image_button"
        app:layout_constraintEnd_toEndOf="parent"
        app:layout_constraintStart_toStartOf="parent"
        app:layout_constraintTop_toTopOf="parent"
        app:layout_constraintVertical_chainStyle="packed" />

    <Button
        android:id="@+id/with_image_button"
        android:layout_width="wrap_content"
        android:layout_height="wrap_content"
        android:layout_marginBottom="@dimen/margin_default"
        android:text="@string/show_toast_with_image_label"
        app:layout_constraintBottom_toTopOf="@id/builder_button"
        app:layout_constraintEnd_toEndOf="parent"
        app:layout_constraintStart_toStartOf="parent"
        app:layout_constraintTop_toBottomOf="@id/button" />

    <Button
        android:id="@+id/builder_button"
        android:layout_width="wrap_content"
        android:layout_height="wrap_content"
        android:layout_marginBottom="@dimen/margin_default"
        android:text="@string/show_toast_using_builder_label"
        app:layout_constraintBottom_toTopOf="@id/success_button"
        app:layout_constraintEnd_toEndOf="parent"
        app:layout_constraintStart_toStartOf="parent"
        app:layout_constraintTop_toBottomOf="@id/with_image_button" />

    <Button
        android:id="@+id/success_button"
        android:layout_width="wrap_content"
        android:layout_height="wrap_content"
        android:layout_marginBottom="@dimen/margin_default"
        android:text="@string/show_success_toast_label"
        app:layout_constraintBottom_toTopOf="@id/warning_button"
        app:layout_constraintEnd_toEndOf="parent"
        app:layout_constraintStart_toStartOf="parent"
        app:layout_constraintTop_toBottomOf="@id/builder_button" />

    <Button
        android:id="@+id/warning_button"
        android:layout_width="wrap_content"
        android:layout_height="wrap_content"
        android:layout_marginBottom="@dimen/margin_default"
        android:text="@string/show_warning_toast_label"
        app:layout_constraintBottom_toTopOf="@id/error_button"
        app:layout_constraintEnd_toEndOf="parent"
        app:layout_constraintStart_toStartOf="parent"
        app:layout_constraintTop_toBottomOf="@id/success_button" />

    <Button
        android:id="@+id/error_button"
        android:layout_width="wrap_content"
        android:layout_height="wrap_content"
        android:text="@string/show_error_toast_label"
        app:layout_constraintBottom_toBottomOf="parent"
        app:layout_constraintEnd_toEndOf="parent"
        app:layout_constraintStart_toStartOf="parent"
        app:layout_constraintTop_toBottomOf="@id/warning_button" />


</androidx.constraintlayout.widget.ConstraintLayout>
```
#### Step 2. Write Code

Finally we need to write our code as follows:


**(a). KtxExampleActivity.kt**

> Our `KtxExampleActivity` class.

Here is the full code:

```kotlin
package replace_with_your_package_name

import android.os.Bundle
import androidx.appcompat.app.AppCompatActivity
import tech.developingdeveloper.toaster.Toaster
import tech.developingdeveloper.toasterexample.databinding.ActivityMainBinding
import tech.developingdeveloper.toasterktx.ToasterBuilderKtx

// This activity won't be visible in the app and it is only for reference.
// The output of this custom toast is same as custom toast using builder in MainActivity
class KtxExampleActivity : AppCompatActivity() {

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        val binding = ActivityMainBinding.inflate(layoutInflater)
        setContentView(binding.root)

        binding.builderButton.setOnClickListener {
            val toaster = ToasterBuilderKtx.prepareToaster(this) {
                message = "File uploaded successfully"
                leftDrawableRes = R.drawable.ic_baseline_cloud_done_24
                leftDrawableTint = R.color.blue
                stripTint = R.color.blue
                duration = Toaster.LENGTH_SHORT
            }

            Toaster.pop(toaster).show()

            // or

            ToasterBuilderKtx.prepareToast(this) {
                message = "File uploaded successfully"
                leftDrawableRes = R.drawable.ic_baseline_cloud_done_24
                leftDrawableTint = R.color.blue
                stripTint = R.color.blue
                duration = Toaster.LENGTH_SHORT
            }.show()
        }
    }
}

```

**(b). MainActivity.kt**

> Our `MainActivity` class.

Here is the code:

```kotlin
package replace_with_your_package_name

import android.os.Bundle
import androidx.appcompat.app.AppCompatActivity
import tech.developingdeveloper.toaster.Toaster
import tech.developingdeveloper.toasterexample.databinding.ActivityMainBinding

class MainActivity : AppCompatActivity() {
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        val binding = ActivityMainBinding.inflate(layoutInflater)
        setContentView(binding.root)


        binding.button.setOnClickListener {
            Toaster.pop(
                this,
                "A simple toast message",
                Toaster.LENGTH_SHORT
            ).show()
        }

        binding.withImageButton.setOnClickListener {
            Toaster.pop(
                this,
                "A simple toast message with image",
                R.drawable.ic_baseline_cloud_done_24,
                Toaster.LENGTH_SHORT
            ).show()
        }

        binding.builderButton.setOnClickListener {
            val toastBuilder = Toaster.Builder(this)
                .setMessage("File uploaded successfully")
                .setLeftDrawable(R.drawable.ic_baseline_cloud_done_24)
                .setLeftDrawableTint(R.color.blue)
                .setStripTint(R.color.blue)
                .setDuration(Toaster.LENGTH_SHORT)
            Toaster.pop(toastBuilder.make()).show()
        }

        binding.errorButton.setOnClickListener {
            Toaster.popError(
                this,
                "This is an error message",
                Toaster.LENGTH_SHORT
            ).show()
        }

        binding.warningButton.setOnClickListener {
            Toaster.popWarning(
                this,
                "This is a warning message",
                Toaster.LENGTH_SHORT
            ).show()
        }

        binding.successButton.setOnClickListener {
            Toaster.popSuccess(
                this,
                "This is a success message",
                Toaster.LENGTH_SHORT
            ).show()
        }
    }
}

```

### Reference

Download the code below:

|No.|Link|
|--|---|
|1.|[Download Full Code](https://github.com/developingdeveloper-tech/toaster-android/archive/refs/heads/main.zip)|
|2.|Read more [here](https://github.com/developingdeveloper-tech/toaster-android).|
|3.|Follow code author [here](https://github.com/developingdeveloper-tech).|
