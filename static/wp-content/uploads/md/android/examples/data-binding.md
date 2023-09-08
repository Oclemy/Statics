# Data Binding Example


In this tutorial you will about data binding via simple step by step examples.


### What is Data Binding?

> The Data Binding Library is a support library that allows you to bind UI components in your layouts to data sources in your app using a declarative format rather than programmatically.

Layouts are often defined in activities with code that calls UI framework methods. For example, the code below calls [findViewById()](https://developer.android.com/reference/android/app/Activity#findViewById(int)) to find a [TextView](https://developer.android.com/reference/android/widget/TextView) widget and bind it to the `userName` property of the `viewModel` variable:

```kotlin
findViewById<TextView>(R.id.sample_text).apply {
    text = viewModel.userName
}
```

Here is how Data binding can be used in place of the above code:

```xml
<TextView
    android:text="@{viewmodel.userName}" />
```

Binding components in the layout file lets you remove many UI framework calls in your activities, making them simpler and easier to maintain. This can also improve your app's performance and help prevent memory leaks and null pointer exceptions.

You can read more [here](https://developer.android.com/topic/libraries/data-binding).


### Step 1: Create Project

Start by creating an empty `Android Studio` project.

### Step 2: Dependencies

No external library is needed for this project. However we need to enable data binding as follows:

1. Go to your `app/build.gradle`.
2. Go inside the `android{}` closure and enable data binding by adding the following code:

```groovy
android {
    compileSdkVersion compileSdkVer
    defaultConfig {
        applicationId "com.developers.databinding"
        minSdkVersion minSdkVer
        targetSdkVersion targetSdkVer
        versionCode 1
        versionName "1.0"
        testInstrumentationRunner "android.support.test.runner.AndroidJUnitRunner"
    }

    //add the following
    dataBinding {
        enabled = true
    }
```

### Step 3: Design Layout

Design layout as follows:

**activity_main.xml**

```xml
<?xml version="1.0" encoding="utf-8"?>
<layout xmlns:android="http://schemas.android.com/apk/res/android"
    xmlns:app="http://schemas.android.com/apk/res-auto"
    xmlns:tools="http://schemas.android.com/tools">

    <data>

        <variable
            name="user"
            type="com.developers.databinding.User"/>
    </data>

    <LinearLayout
        android:layout_width="match_parent"
        android:layout_height="match_parent"
        android:orientation="vertical"
        tools:context=".MainActivity">

        <TextView
            android:layout_width="wrap_content"
            android:layout_height="wrap_content"
            android:text="@{user.name}"
            android:textColor="@android:color/black"
            android:textSize="18sp"
            android:layout_margin="5dp" />

        <TextView
            android:layout_width="wrap_content"
            android:layout_height="wrap_content"
            android:text="@{String.valueOf(user.age)}"
            android:textColor="@android:color/black"
            android:textSize="18sp"
            android:layout_margin="5dp" />

        <TextView
            android:layout_width="wrap_content"
            android:layout_height="wrap_content"
            android:text="@{user.email}"
            android:textColor="@android:color/black"
            android:textSize="18sp"
            android:layout_margin="5dp" />

    </LinearLayout>

</layout>
```

### Step :4 Create Data class

**User.kt**

```kotlin
data class User(val name: String, val age: Int, val email: String)
```

### Step : Bind data

**MainActivity.kt**

```kotlin
import androidx.appcompat.app.AppCompatActivity
import android.os.Bundle
import androidx.databinding.DataBindingUtil
import com.developers.databinding.databinding.ActivityMainBinding

class MainActivity : AppCompatActivity() {

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        val binding: ActivityMainBinding = DataBindingUtil
                .setContentView(this, R.layout.activity_main)
        val user = User("Amanjeet Singh", 21, "amanjeetsingh150@gmail.com")
        binding.setVariable(BR.user, user)
    }
}
```

### Run

Copy the code or download it in the link below, build and run.

### Reference

Here are the reference links:

| Number | Link |
| --- | --- |
| 1. | [Download](https://downgit.github.io/#/home?url=https://github.com/amanjeetsingh150/kotlin-android-examples/tree/master/DataBinding) Example |
| 2. | [Follow](https://github.com/amanjeetsingh150/) code author |
| 3. | Code: [Apache 2.0 License](http://www.apache.org/licenses/LICENSE-2.0.txt) |
