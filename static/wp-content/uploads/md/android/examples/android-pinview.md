# PinView Tutorial and Example


If you are creating a project where you need to enter a pin, then there is a library providing you with a flexible ready made pin input UI so that you don't have to re-invent the wheel. In fact in this class we are going to see this library's example usage.

Through PinView you can enter pins in the following formats:

1. Numbers Only
2. Text Only
3. Numbers Only but hidden like password
4. Text Only but hidden like password
5. Custom

You can then get listen to events notifying you when the user has typed the complete pin so that you can obtain the typed value.


Let's look at an example.

### Example 1 - Kotlin Android PinView Example

Let's write our first example using Kotlin.

![Kotlin Android PinView](https://camposha.info/wp-content/uploads/2019/12/android-pinview.gif)

Kotlin Android PinView

**Video tutorial**

Watch live video tutorial:

<iframe width="788" height="443" src="https://www.youtube.com/embed/pWbbwE9hlv0" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>

#### (a). build.gradle(project)

Go to your project level build.gradle file and register jitpack as a repository:

```groovy
allprojects {
    repositories {
        google()
        jcenter()
        maven { url 'https://jitpack.io' }
    }
}
```

#### (b). build.gradle(app)

Then in your app level build.gradle add the dependency for the pinview library:

```groovy
dependencies {
    implementation fileTree(dir: 'libs', include: ['*.jar'])
    implementation"org.jetbrains.kotlin:kotlin-stdlib-jdk7:$kotlin_version"
    implementation 'androidx.appcompat:appcompat:1.0.2'
    implementation 'androidx.core:core-ktx:1.0.2'
    implementation 'androidx.constraintlayout:constraintlayout:1.1.3'

    //pinview library dependency
    implementation 'com.github.GoodieBag:Pinview:v1.4'
}
```

#### (c). activity_main.xml

Now come to our main activity's layout and add a bunch of PinViews wrapped in a [LinearLayout](https://camposha.info/android/linearlayout) viewgroup.

```xml
<?xml version="1.0" encoding="utf-8"?>
<LinearLayout xmlns:android="http://schemas.android.com/apk/res/android"
    xmlns:app="http://schemas.android.com/apk/res-auto"
    android:id="@+id/activity_main"
    android:layout_width="match_parent"
    android:layout_height="match_parent"
    android:background="#e1e1e1"
    android:orientation="vertical"
    android:paddingLeft="@dimen/activity_horizontal_margin"
    android:paddingTop="@dimen/activity_vertical_margin"
    android:paddingRight="@dimen/activity_horizontal_margin"
    android:paddingBottom="@dimen/activity_vertical_margin">

    <TextView
        android:layout_width="match_parent"
        android:layout_height="wrap_content"
        android:text="Number"/>

    <com.goodiebag.pinview.Pinview
        android:id="@+id/pinview1"
        android:layout_width="match_parent"
        android:layout_height="wrap_content"
        app:cursorVisible="false"
        app:forceKeyboard="true"
        app:hint=""
        app:inputType="number"
        app:password="false"
        app:pinBackground="@drawable/example_drawable_with_grey_disabled"
        app:pinHeight="40dp"
        app:pinLength="4"
        app:pinWidth="40dp"/>

    <TextView
        android:layout_width="match_parent"
        android:layout_height="wrap_content"
        android:text="Text"/>

    <com.goodiebag.pinview.Pinview
        android:id="@+id/pinview2"
        android:layout_width="match_parent"
        android:layout_height="wrap_content"
        app:cursorVisible="false"
        app:forceKeyboard="true"
        app:hint=""
        app:inputType="text"
        app:password="false"
        app:pinBackground="@drawable/example_drawable"
        app:pinHeight="40dp"
        app:pinLength="4"
        app:pinWidth="40dp"/>

    <TextView
        android:layout_width="match_parent"
        android:layout_height="wrap_content"
        android:text="Number-Password"/>

    <com.goodiebag.pinview.Pinview
        android:id="@+id/pinview3"
        android:layout_width="match_parent"
        android:layout_height="wrap_content"
        app:cursorVisible="false"
        app:hint="0"
        app:inputType="number"
        app:password="true"
        app:pinBackground="@drawable/example_drawable"
        app:pinHeight="40dp"
        app:pinLength="4"
        app:pinWidth="40dp"/>

    <TextView
        android:layout_width="match_parent"
        android:layout_height="wrap_content"
        android:text="Text-Password"/>

    <com.goodiebag.pinview.Pinview
        android:id="@+id/pinview4"
        android:layout_width="match_parent"
        android:layout_height="wrap_content"
        app:cursorVisible="false"
        app:hint="0"
        app:inputType="text"
        app:password="true"
        app:pinBackground="@drawable/example_drawable"
        app:pinHeight="40dp"
        app:pinLength="4"
        app:pinWidth="40dp"/>

    <TextView
        android:layout_width="match_parent"
        android:layout_height="wrap_content"
        android:text="Custom Pin View"/>

    <com.goodiebag.pinview.Pinview
        android:id="@+id/pinview5"
        android:layout_width="match_parent"
        android:layout_height="wrap_content"
        app:inputType="text"
        app:pinHeight="40dp"
        app:pinLength="4"
        app:pinWidth="40dp"/>

</LinearLayout>
```

#### (d). MainActivity.kt

In you MainActivity add imports and extend the AppCompatActivity.

```kotlin
package info.camposha.mrpinview

import android.graphics.Color
import android.os.Bundle
import android.widget.Toast

import androidx.appcompat.app.AppCompatActivity

import com.goodiebag.pinview.Pinview

class MainActivity : AppCompatActivity() {
```

Then initialize our first PinView:

```kotlin
    private fun initializeWidgets() {
        val pinview1 = findViewById<Pinview>(R.id.pinview1)
```

Now listen to its event listener. When user has completed typing the pin, we obtain its value and show it in a Toast message:

```kotlin
        pinview1.setPinViewEventListener { pinview, fromUser ->
            Toast.makeText(
                this@MainActivity,
                pinview.value,
                Toast.LENGTH_SHORT
            ).show()
        }
```

You can also customize several properties of a PineView:

```kotlin
        // pinView Customize
        val pinview5 = findViewById<Pinview>(R.id.pinview5)
        pinview5.setCursorShape(R.drawable.example_cursor)
        pinview5.setTextSize(12)
        pinview5.setTextColor(Color.BLACK)
        pinview5.showCursor(true)
    }
```

Finally override the onCreate() function:

```kotlin
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_main)

        initializeWidgets()

    }
}
//end
```

That's it. Here 's the full code:

```kotlin
package info.camposha.mrpinview

import android.graphics.Color
import android.os.Bundle
import android.widget.Toast

import androidx.appcompat.app.AppCompatActivity

import com.goodiebag.pinview.Pinview

class MainActivity : AppCompatActivity() {
    private fun initializeWidgets() {
        val pinview1 = findViewById<Pinview>(R.id.pinview1)
        pinview1.setPinViewEventListener { pinview, fromUser ->
            Toast.makeText(
                this@MainActivity,
                pinview.value,
                Toast.LENGTH_SHORT
            ).show()
        }

        // pinView Customize
        val pinview5 = findViewById<Pinview>(R.id.pinview5)
        pinview5.setCursorShape(R.drawable.example_cursor)
        pinview5.setTextSize(12)
        pinview5.setTextColor(Color.BLACK)
        pinview5.showCursor(true)
    }
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_main)

        initializeWidgets()

    }
}
//end
```
