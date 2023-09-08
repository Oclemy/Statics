# Switch Images with Animation

>  Before After  Image switcher animation library written in Kotlin.

![Image Switcher Tutorial](https://camo.githubusercontent.com/4effe0665b4b2e1371e4542dba870d6a17dfb6e92d302182364cd9179ae0408a/68747470733a2f2f6a69747061636b2e696f2f762f6665767a696f6d757274656b696e2f4265666f72654166746572566965772e737667)

Use this library if you want to switch images with animation. Here is the demo of what this code is about:

![beforeafterview Example Tutorial](https://github.com/fevziomurtekin/BeforeAfterView/raw/master/art/record.gif)


### Step 1: Install it

Install it via gradle:

```groovy
allprojects {
  repositories {
    ...
    maven { url 'https://jitpack.io' }
  }
}
  
  .....

dependencies {
      implementation 'com.github.fevziomurtekin:BeforeAfterView:1.0.0'
   }
}
```


### Step 2: Layout

Then add it to your xml layout:

```xml
<com.fevziomurtekin.beforeafterview.BeforeAfterView
           android:layout_width="match_parent"
           android:layout_height="match_parent"
           app:bgColor="@android:color/black"
           app:sliderTintColor="@android:color/white"
           app:sliderIconTint="@android:color/white"
           app:afterSrc="@drawable/after"
           app:beforeSrc="@drawable/before"
           app:imageHeightPercent="0.5"
           app:sliderWidthPercent="0.75"
   />
```


### Attributes

Here are the attributes:

- `bgColor`
- `sliderTintColor`
- `sliderIconTint`
- `afterSrc`
- `beforeSrc`
- `imageHeightPercent`
- `sliderWidthPercent`


Let us look at a full Image Switcher Example based on this library:

#### Step 1. Design Layouts

For this project let's create the following layouts:

**(a). `activity_main.xml`**

> Our `activity_main` layout.

This layout will represent our Main Activity's layout. Specify [`android.support.constraint.ConstraintLayout`](https://android.camposha.info/en/constraintlayout) as it's root element then inside it place the following [widgets](https://android.camposha.info/en/view):

1. [`BeforeAfterView`](https://android.camposha.info/en/beforeafterview)

```xml
<?xml version="1.0" encoding="utf-8"?>
<android.support.constraint.ConstraintLayout
        android:id="@+id/root"
        android:layout_width="match_parent"
        android:layout_height="match_parent"
        xmlns:app="http://schemas.android.com/apk/res-auto"
        android:background="@android:color/transparent"
        xmlns:android="http://schemas.android.com/apk/res/android">

   <com.fevziomurtekin.beforeafterview.BeforeAfterView
           android:layout_width="match_parent"
           android:layout_height="match_parent"
           app:bgColor="@android:color/black"
           app:sliderTintColor="@android:color/white"
           app:sliderIconTint="@android:color/white"
           app:imageHeightPercent="0.5"
           app:sliderWidthPercent="0.75"
   />

</android.support.constraint.ConstraintLayout>

```

#### Step 2. Write Code

Finally we need to write our code as follows:

**(a). `MainActivity.kt`**

> Our `MainActivity` class.

Here is the full code:

```kotlin
package replace_with_your_package_name

import android.support.v7.app.AppCompatActivity
import android.os.Bundle
import android.util.Log
import kotlinx.android.synthetic.main.activity_main.*
import kotlin.math.roundToInt

class MainActivity : AppCompatActivity(){

    private var rangeWidth=0

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
|1.|[Download Full Code](https://github.com/fevziomurtekin/beforeafterview/archive/refs/heads/master.zip)|
|2.|Read more [here](https://github.com/fevziomurtekin/beforeafterview).|
|3.|Follow code author [here](https://github.com/fevziomurtekin).|
