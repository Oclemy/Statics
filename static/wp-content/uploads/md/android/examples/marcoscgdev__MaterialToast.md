# MaterialToast

>  A fully and highly customizable material designed Toast for Android..

Here is a demo:

![Toast Library Tutorial](https://raw.githubusercontent.com/marcoscgdev/MaterialToast/master/device-2018-12-22-164932.png)


### Step 1: Adding the depencency

Add this to your root `build.gradle` file:

```groovy
allprojects {
    repositories {
        ...
        maven { url 'https://jitpack.io' }
    }
}
```

Now add the dependency to your app build.gradle file:

```groovy
implementation 'com.github.marcoscgdev:MaterialToast:1.0.2'
```


### Step 2: Creating a Toast

For Native version:

```java
MaterialToast.makeText(activity, "Hello, I'm a material toast!", Toast.LENGTH_SHORT).show();
```

Also with custom icon:

```java
MaterialToast.makeText(activity, "Hello, I'm a material toast!", R.mipmap.ic_launcher, Toast.LENGTH_SHORT).show();
```

And also with custom background color (text will be automatically colored based on background color):

```java
MaterialToast.makeText(activity, "Hello, I'm a material toast!", R.mipmap.ic_launcher, Toast.LENGTH_SHORT).setBackgroundColor(Color.RED).show();
```

With custom duration (in millis):

```java
MaterialToast.makeText(activity, "Hello, I'm a material toast!", R.mipmap.ic_launcher, 4000).setBackgroundColor(Color.RED).show();
```


Here is a complete code snippet:

```java
new MaterialToast(activity)
       .setMessage("Hello, I'm a material toast!")
       .setIcon(R.mipmap.ic_launcher)
       .setDuration(Toast.LENGTH_SHORT)
       .setBackgroundColor(Color.RED)
       .show();
```

### Full Example

Let us look at a full `MaterialToast` Library Example below.


<!--more-->

#### Step 1. Design Layouts

**(a). activity_main.xml**


> Our `activity_main` layout.

Design your XML layout using the following 3 UI widgets and ViewGroups:

1. `!--`
2. `LinearLayout`
3. `Button`

```xml
<?xml version="1.0" encoding="utf-8"?>

<LinearLayout xmlns:android="http://schemas.android.com/apk/res/android"
    xmlns:tools="http://schemas.android.com/tools"
    android:layout_width="match_parent"
    android:layout_height="match_parent"
    android:orientation="vertical"
    android:gravity="center"
    tools:context=".MainActivity">

    <Button
        android:layout_width="wrap_content"
        android:layout_height="wrap_content"
        android:text="Default toast"
        android:layout_margin="4dp"
        android:onClick="toastDef" />

    <Button
        android:layout_width="wrap_content"
        android:layout_height="wrap_content"
        android:text="Material toast"
        android:layout_margin="4dp"
        android:onClick="toastMat" />

    <Button
        android:layout_width="wrap_content"
        android:layout_height="wrap_content"
        android:text="Colored material toast"
        android:layout_margin="4dp"
        android:onClick="toastMatCol" />

    <Button
        android:layout_width="wrap_content"
        android:layout_height="wrap_content"
        android:text="Material toast in view"
        android:layout_margin="4dp"
        android:onClick="toastMatView" />

    <Button
        android:layout_width="wrap_content"
        android:layout_height="wrap_content"
        android:text="Custom view material toast"
        android:layout_margin="4dp"
        android:onClick="toastMatCustom" />

</LinearLayout>
```
#### Step 2. Write Code

Finally we need to write our code as follows:


**(a). MainActivity.kt**

> Our `MainActivity` class.

Subsequently we will be creating the following methods:

1. `toastDef(parameter)` - Our function will take a `View?` object as a parameter.
2. `toastMat(parameter)` - Let's pass a `View?` object as a parameter.
3. `toastMatCol(parameter)` - Our function will take a `View?` object as a parameter.
4. `toastMatView(parameter)` - We pass a `View?` object as a parameter.
5. `toastMatCustom(parameter)` - Our function will take a `View?` object as a parameter.

Just copy the code below and replace the package with your app's package name.

```kotlin
package replace_with_your_package_name

import android.graphics.Color
import android.os.Bundle
import android.view.View
import android.widget.Toast
import androidx.appcompat.app.AppCompatActivity
import com.marcoscg.materialtoast.MaterialToast

class MainActivity : AppCompatActivity() {
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_main)
    }

    fun toastDef(v: View?) {
        Toast.makeText(this, "Hello, I'm a default toast!", Toast.LENGTH_SHORT).show()
    }

    fun toastMat(v: View?) {
        MaterialToast.makeText(this, "Hello, I'm a material toast!", R.mipmap.ic_launcher, Toast.LENGTH_SHORT).show()
    }

    fun toastMatCol(v: View?) {
//        MaterialToast.makeText(this, "Hello, I'm a material toast!",
//                R.mipmap.ic_launcher, Toast.LENGTH_SHORT).setBackgroundColor(Color.RED).show();
        MaterialToast(this)
                .setMessage("Hello, I'm a material toast!")
                .setIcon(R.mipmap.ic_launcher)
                .setDuration(Toast.LENGTH_SHORT)
                .setBackgroundColor(Color.RED)
                .show()
    }

    fun toastMatView(v: View?) {
        // offsetX and offsetY are optional
        MaterialToast.makeText(this, "Hello, I'm a material toast!", Toast.LENGTH_SHORT).show(v, offsetY = -60)
    }

    fun toastMatCustom(v: View?) {
        MaterialToast(this)
                .setCustomView(View.inflate(this, R.layout.custom_toast_view, null))
                .setDuration(Toast.LENGTH_SHORT)
                .show()
    }
}

```

### Reference

Download the code below:

|No.|Link|
|--|---|
|1.|[Download Full Code](https://github.com/marcoscgdev/MaterialToast/archive/refs/heads/master.zip)|
|2.|Read more [here](https://github.com/marcoscgdev/MaterialToast).|
|3.|Follow code author [here](https://github.com/marcoscgdev).|
