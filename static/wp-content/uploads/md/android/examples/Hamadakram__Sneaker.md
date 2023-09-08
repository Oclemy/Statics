# Sneaker

>  A lightweight Android library for customizable alerts.

Here are demos:

![Sneaker Example Tutorial](https://github.com/Hamadakram/Sneaker/raw/master/art/Sneaker.png?raw=true)


### Step 1: Install it

Grab via Gradle:

```groovy
implementation 'com.irozon.sneaker:sneaker:2.0.0'
```


### Step 2: Usage

In Sneaker 2.0.0 it's possilbe to show sneaker on Activity, Fragment or any ViewGroup

```kotlin
Sneaker.with(activity) // To show Sneaker on Activity
 Sneaker.with(fragment) // To show Sneaker on Fragment
 Sneaker.with(viewGroup) // To show Sneaker on ViewGroup
```


#### Custom:


```java
Sneaker.with(actvitiy) // Activity, Fragment or ViewGroup
       .setTitle("Title", R.color.white) // Title and title color
       .setMessage("This is the message.", R.color.white) // Message and message color
       .setDuration(4000) // Time duration to show
       .autoHide(true) // Auto hide Sneaker view
       .setHeight(ViewGroup.LayoutParams.WRAP_CONTENT) // Height of the Sneaker layout
       .setIcon(R.drawable.ic_no_connection, R.color.white, false) // Icon, icon tint color and circular icon view
       .setTypeface(Typeface.createFromAsset(this.getAssets(), "font/" + fontName)); // Custom font for title and message
       .setOnSneakerClickListener(this) // Click listener for Sneaker
       .setOnSneakerDismissListener(this) // Dismiss listener for Sneaker. - Version 1.0.2
       .setCornerRadius(radius, margin) // Radius and margin for round corner Sneaker. - Version 1.0.2
       .sneak(R.color.colorAccent) // Sneak with background color
```


#### Error:


```kotlin
Sneaker.with(actvitiy) // Activity, Fragment or ViewGroup
        .setTitle("Error!!")
        .setMessage("This is the error message")
        .sneakError()
```


#### Success:


```kotlin
Sneaker.with(actvitiy) // Activity, Fragment or ViewGroup
        .setTitle("Success!!")
        .setMessage("This is the success message")
        .sneakSuccess()
```


#### Warning:


```kotlin
Sneaker.with(actvitiy) // Activity, Fragment or ViewGroup
        .setTitle("Warning!!")
        .setMessage("This is the warning message")
        .sneakWarning()
```


#### Custom View:


```kotlin
val sneaker = Sneaker.with(actvitiy) // Activity, Fragment or ViewGroup
 val view = LayoutInflater.from(this).inflate(R.layout.custom_view,  sneaker.getView(), false)
 // Your custom view code
 view.findViewById<TextView>(R.id.tvInstall).setOnClickListener{
       Toast.makeText(this, "Clicked", Toast.LENGTH_SHORT).show()
 }
 sneaker.sneakCustom(view)
```

### Full Example

Follow these steps to create a full `Sneaker` Toast Library example.

<!--more-->

#### Step 1. Design Layouts

**(a). custom_view.xml**


> Our `custom_view` layout.

Then design your XML layout using the following 2 UI widgets and ViewGroups:

1. `LinearLayout`
2. `TextView`

```xml
<?xml version="1.0" encoding="utf-8"?>
<LinearLayout xmlns:android="http://schemas.android.com/apk/res/android"
    xmlns:tools="http://schemas.android.com/tools"
    android:layout_width="match_parent"
    android:layout_height="wrap_content"
    android:layout_margin="4dp"
    android:background="@drawable/round_background"
    android:backgroundTint="@android:color/holo_blue_dark"
    android:gravity="center_vertical"
    android:orientation="horizontal">

    <LinearLayout
        android:layout_width="0dp"
        android:layout_height="wrap_content"
        android:layout_weight="1"
        android:orientation="vertical">

        <TextView
            android:id="@+id/textView"
            android:layout_width="wrap_content"
            android:layout_height="wrap_content"
            android:layout_marginStart="8dp"
            android:layout_marginTop="8dp"
            android:layout_marginEnd="8dp"
            android:alpha="0.8"
            android:text="@string/best_of_2018"
            android:textAllCaps="true"
            android:textColor="@android:color/white" />

        <TextView
            android:id="@+id/textView2"
            android:layout_width="wrap_content"
            android:layout_height="wrap_content"
            android:layout_marginStart="8dp"
            android:layout_marginBottom="8dp"
            android:text="@string/game_of_the_year"
            android:textColor="@android:color/white"
            android:textSize="20sp"
            android:textStyle="bold" />
    </LinearLayout>

    <TextView
        android:id="@+id/tvInstall"
        android:layout_width="wrap_content"
        android:layout_height="wrap_content"
        android:layout_marginTop="8dp"
        android:layout_marginEnd="10dp"
        android:layout_marginBottom="8dp"
        android:background="@drawable/round_background"
        android:backgroundTint="@android:color/darker_gray"
        android:paddingStart="10dp"
        android:paddingTop="3dp"
        android:paddingEnd="10dp"
        android:paddingBottom="3dp"
        android:text="@string/textview"
        android:textColor="@android:color/white"
        tools:text="Install" />
</LinearLayout>
```

**(b). activity_main.xml**


> Our `activity_main` layout.

1. `LinearLayout`
2. `RelativeLayout`
3. `TextView`
4. `Button`
5. `View`
6. `FrameLayout`

```xml
<?xml version="1.0" encoding="utf-8"?>
<LinearLayout xmlns:android="http://schemas.android.com/apk/res/android"
    android:layout_width="match_parent"
    android:layout_height="match_parent"
    android:gravity="center"
    android:orientation="vertical"
    android:weightSum="3">

    <RelativeLayout
        android:layout_width="match_parent"
        android:layout_height="0dp"
        android:layout_weight="1"
        android:gravity="center_horizontal"
        android:orientation="vertical">

        <TextView
            android:layout_width="match_parent"
            android:layout_height="wrap_content"
            android:layout_centerInParent="true"
            android:gravity="center"
            android:padding="5dp"
            android:text="@string/activity"
            android:textColor="@android:color/black"
            android:textSize="25sp"
            android:textStyle="bold" />

        <Button
            android:id="@+id/btShowError"
            android:layout_width="wrap_content"
            android:layout_height="wrap_content"
            android:layout_alignParentBottom="true"
            android:layout_centerHorizontal="true"
            android:layout_marginBottom="10dp"
            android:background="@android:drawable/editbox_background_normal"
            android:paddingStart="20dp"
            android:paddingEnd="20dp"
            android:text="@string/show_error" />
    </RelativeLayout>

    <View
        android:layout_width="match_parent"
        android:layout_height="1dp"
        android:alpha="0.5"
        android:background="@android:color/black" />

    <RelativeLayout
        android:id="@+id/viewGroup"
        android:layout_width="match_parent"
        android:layout_height="0dp"
        android:layout_marginBottom="10dp"
        android:layout_weight="1"
        android:animateLayoutChanges="true"
        android:orientation="vertical">

        <TextView
            android:layout_width="match_parent"
            android:layout_height="wrap_content"
            android:layout_centerInParent="true"
            android:gravity="center"
            android:padding="5dp"
            android:text="@string/viewgroup"
            android:textColor="@android:color/black"
            android:textSize="25sp"
            android:textStyle="bold" />

        <Button
            android:id="@+id/btShowSuccess"
            android:layout_width="wrap_content"
            android:layout_height="wrap_content"
            android:layout_alignParentBottom="true"
            android:layout_centerHorizontal="true"
            android:background="@android:drawable/editbox_background_normal"
            android:paddingStart="20dp"
            android:paddingEnd="20dp"
            android:text="@string/show_success" />
    </RelativeLayout>

    <View
        android:layout_width="match_parent"
        android:layout_height="1dp"
        android:alpha="0.5"
        android:background="@android:color/black" />

    <FrameLayout
        android:id="@+id/fragment"
        android:layout_width="match_parent"
        android:layout_height="0dp"
        android:layout_weight="1" />
</LinearLayout>
```
#### Step 2. Write Code

Finally we need to write our code as follows:

**(a). MainFragment.kt**

> Our `MainFragment` class.

To begin create a Kotlin file named `MainFragment.kt`.

Subsequently we will add imports from android SDK and other packages. Here are some of the imports we will use in this class:

1. `Bundle` from the `android.os` package.
2. `Fragment` from the `android.support.v4.app` package.
3. `LayoutInflater` from the `android.view` package.
4. `View` from the `android.view` package.
5. `ViewGroup` from the `android.view` package.
6. `*` from the `kotlinx.android.synthetic.main.fragment_main` package.

Furthermore create a class that derives from `Fragment` and add its contents as follows:

Here is the full code:

```kotlin
package replace_with_your_package_name

import android.os.Bundle
import android.support.v4.app.Fragment
import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import com.irozon.sneaker.Sneaker
import kotlinx.android.synthetic.main.fragment_main.*

class MainFragment : Fragment() {
    override fun onCreateView(
            inflater: LayoutInflater,
            container: ViewGroup?,
            savedInstanceState: Bundle?
    ): View {
        return inflater.inflate(R.layout.fragment_main, container, false)
    }

    override fun onViewCreated(view: View, savedInstanceState: Bundle?) {
        super.onViewCreated(view, savedInstanceState)

        btShowWarning.setOnClickListener {
            Sneaker.with(this)
                    .setTitle("Warning!!")
                    .setCornerRadius(5, 5)
                    .setMessage("This is the warning message")
                    .sneakWarning()
        }
    }
}

```

**(b). MainActivity.kt**

> Our `MainActivity` class.

Here is the full code:

```kotlin
package replace_with_your_package_name

import android.graphics.Typeface
import android.os.Bundle
import android.support.v7.app.AppCompatActivity
import android.view.LayoutInflater
import android.widget.TextView
import android.widget.Toast
import com.irozon.sneaker.Sneaker
import com.irozon.sneaker.interfaces.OnSneakerDismissListener
import kotlinx.android.synthetic.main.activity_main.*

class MainActivity : AppCompatActivity() {

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_main)

        with(supportFragmentManager.beginTransaction()) {
            this.add(R.id.fragment, MainFragment())
            this.commit()
        }

        btShowError.setOnClickListener {
            Sneaker.with(this)
                    .setTitle("Error!!")
                    .setMessage("This is the error message")
                    .setTypeface(Typeface.createFromAsset(this.assets, "font/Slabo27px-Regular.ttf"))
                    .sneakError()
        }
        btShowSuccess.setOnClickListener {
            val sneaker = Sneaker.with(viewGroup)
            val view = LayoutInflater.from(this).inflate(R.layout.custom_view, sneaker.getView(), false)
            view.findViewById<TextView>(R.id.tvInstall).setOnClickListener{
                Toast.makeText(this, "Clicked", Toast.LENGTH_SHORT).show()
            }
            sneaker.sneakCustom(view)
        }
    }
}

```

### Reference

Download the code below:

|No.|Link|
|--|---|
|1.|[Download Full Code](https://github.com/Hamadakram/Sneaker/archive/refs/heads/master.zip)|
|2.|Read more [here](https://github.com/Hamadakram/Sneaker).|
|3.|Follow code author [here](https://github.com/Hamadakram).|
