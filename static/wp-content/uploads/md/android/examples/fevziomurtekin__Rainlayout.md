# Rainlayout

>  [Constraintlayout](https://android.camposha.info/en/constraintlayout) based rain-animation view developed backed by Kotlin Coroutines..

Constraintlayout based rain-animation view developed backed by Kotlin [Coroutines](https://android.camposha.info/en/coroutines).

![Rain Animation Tutorial](https://camo.githubusercontent.com/f80ecfe9b20e7fbecdcda553848dd2db6d88deb803f8fb6f12e9785250a2af2d/68747470733a2f2f6a69747061636b2e696f2f762f6665767a696f6d757274656b696e2f5261696e6c61796f75742e737667)


### Demo

Here is the demo:

![Rain Animation Tutorial](https://camo.githubusercontent.com/3ebebdef28a6a17b145f7b97a0d5957241aefd49ace0061e6702eca595938111/68747470733a2f2f6d656469612e67697068792e636f6d2f6d656469612f5571717769425153333132363873493955552f67697068792e676966)

Follow these steps to use it:

### Step 1: Installation

Declare Jitpack then add the `implementation` statement:

```groovy
allprojects {
  repositories {
    ...
    maven { url 'https://jitpack.io' }
  }
}
  
  .....

dependencies {
      implementation 'com.github.fevziomurtekin:Rainlayout:1.1'
   }
}
```


### Step 2: Add to Layout

Add this to your xml layout:

```xml
<com.fevziomurtekin.widget.RainlayoutView
        android:layout_width="match_parent"
        android:layout_height="match_parent"
        android:id="@+id/rainview"
        xmlns:app="http://schemas.android.com/apk/res-auto"
        android:background="@android:color/holo_orange_light"
        xmlns:android="http://schemas.android.com/apk/res/android"
        app:isColorful="true"
        app:dropPerSecond="1"
        app:durationOfDropTime="500"
        app:dropSrc="@drawable/umbrella"
        app:dropTintColor="@color/colorPrimary">


</com.fevziomurtekin.widget.RainlayoutView>
```


### Attributes

`isColorful`
`dropPerSecond`
`durationOfDropTime`
`dropSrc`
`dropTintColor`

> Warning : To Stop the animation in Activity / Fragment changes!

```kotlin
override fun onStop() {
        super.onStop()
        rainview.animationClear()
    }
```


### Full Example

Let us look at a full Rain Animation Example based on this library:

#### Step 1. Design Layouts

For this project let's create the following layouts:

**(a). `activity_main.xml`**

> Our `activity_main` layout.

This layout will represent our Main Activity's layout. Specify `com.fevziomurtekin.widget.RainlayoutView` as it's root element then inside it place the following [widgets](https://android.camposha.info/en/view):


```xml
<?xml version="1.0" encoding="utf-8"?>
<com.fevziomurtekin.widget.RainlayoutView
        android:layout_width="match_parent"
        android:layout_height="match_parent"
        android:id="@+id/rainview"
        xmlns:app="http://schemas.android.com/apk/res-auto"
        android:background="@android:color/holo_blue_dark"
        xmlns:android="http://schemas.android.com/apk/res/android"
        app:isColorful="true"
        app:dropPerSecond="10"
        app:durationOfDropTime="1000"
        app:dropSrc="@drawable/umbrella"
        app:dropTintColor="@color/colorPrimary"
>


</com.fevziomurtekin.widget.RainlayoutView>


```
#### Step 2. Write Code

Finally we need to write our code as follows:

**(a). `MainActivity.kt`**

> Our `MainActivity` class.

Here is the full code:

```kotlin
package replace_with_your_package_name

import androidx.appcompat.app.AppCompatActivity
import android.os.Bundle
import kotlinx.android.synthetic.main.activity_main.*

class MainActivity : AppCompatActivity() {

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_main)
    }



    override fun onStop() {
        super.onStop()
        rainview.animationClear()
    }
}


```

### Reference

Download the code below:

|No.|Link|
|--|---|
|1.|[Download Full Code](https://github.com/fevziomurtekin/Rainlayout/archive/refs/heads/master.zip)|
|2.|Read more [here](https://github.com/fevziomurtekin/Rainlayout).|
|3.|Follow code author [here](https://github.com/fevziomurtekin).|
