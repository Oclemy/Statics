# SnackBar Tutorial and Examples

In this tutorial we will explore simple step by step SnackBar examples.


### What is a SnackBar?

> Snackbars are part of the material design android widgets and do provide lightweight feedback about an operation.

They show a brief message at the bottom of the screen on mobile and lower left on larger devices. Snackbars appear above all other elements on screen and only one can be displayed at a time.

They automatically disappear after a timeout or after user interaction elsewhere on the screen, particularly after interactions that summon a new surface or activity. Snackbars can be swiped off screen.

Snackbars can contain an action which is set via `setAction(CharSequence, android.view.View.OnClickListener)`.

To be notified when a snackbar has been shown or dismissed, you can provide a `Snackbar.Callback`.

> If you prefer to use third party libraries then check [here](https://camposha.info/android-examples/android-snackbar-libraries/).

## Example 1: Kotlin Simple SnackBar

This is a simple step by step SnackBar tutorial. Here is what is created:

![Kotlin Android SnackBar Example](https://github.com/alirezabashi98/test-SnackBar/raw/master/scr001.png)

### Step 1: Create Project

Start by creating an android project in AndroidStudio.

### Step 2: Dependencies

To use SnackBar add the following implementation statement in your `app/build.gradle`:

```groovy
    implementation 'com.google.android.material:material:1.1.0'
```

then sync.

### Step 3: Design Layout

In your main layout add a button that when clicked will show us a snackbar:

**activity_main.xml**

```xml
<?xml version="1.0" encoding="utf-8"?>
<LinearLayout xmlns:android="http://schemas.android.com/apk/res/android"
    xmlns:app="http://schemas.android.com/apk/res-auto"
    xmlns:tools="http://schemas.android.com/tools"
    android:layout_width="match_parent"
    android:layout_height="match_parent"
    tools:context=".MainActivity"
    android:orientation="vertical">

    <Button
        android:onClick="showSnackBar"
        android:layout_width="match_parent"
        android:layout_height="wrap_content"
        android:layout_margin="30dp"
        android:text="SnackBar" />

</LinearLayout>
```

### Step 4: Write Code

Here is our MainActivity kotlin code:

**MainActivity.kt**

```kotlin
package arb.test.snackbar

import androidx.appcompat.app.AppCompatActivity
import android.os.Bundle
import android.view.View
import android.widget.TextView
import androidx.core.content.ContextCompat
import com.google.android.material.snackbar.Snackbar

class MainActivity : AppCompatActivity() {

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_main)

    }

    fun showSnackBar(view: View) {
        val snackBar = Snackbar.make(view, "test one", Snackbar.LENGTH_INDEFINITE)
            .setAction("hidden") {
//                on click btn
            }
            .setActionTextColor(ContextCompat.getColor(this, R.color.colorPrimaryDark))
        val snackBarView = snackBar.view
        val txt =
            snackBarView.findViewById(com.google.android.material.R.id.snackbar_text) as TextView
        snackBarView.setBackgroundColor(ContextCompat.getColor(this, R.color.colorAccent))
        txt.setTextColor(ContextCompat.getColor(this, R.color.colorPrimary))

        snackBar.show()
    }
}
```

### Step 5: Run

Copy the code into your project or download it below and run in AndroidStudio.

### References

Find reference links below:

| Number | Link |
| --- | --- |
| 1. | [Download](https://github.com/alirezabashi98/test-SnackBar/archive/refs/heads/master.zip) Example |
| 2. | [Follow](https://github.com/alirezabashi98/) example author |
| 3. | [SnackBar](https://developer.android.com/reference/com/google/android/material/snackbar/Snackbar) Documentation |

## Example 2: Kotlin Android SnackBar with ViewBinding

This is another beginner friendly Kotlin SnackBar example. And we are using ViewBinding rather than Kotlin synthetics and `findViewById`.

### Step 1: Create Project

Create an empty AndroidStudio project.

### Step 2: Dependencies

Add Material dependency in your `app/build.gradle` as follows:

```groovy
    implementation 'com.google.android.material:material:1.3.0'
```

**Enable Viewbinding**

You also need to enable ViewBinding. You do that right here inside the `app/build.gradle` under the `android{}` closure:

```groovy
    buildFeatures {
        viewBinding true
    }
```

### Step 3: Design Layout

Design your MainActivity by adding TextViews, EditText and a button as follows:

**activity_main.xml**

```xml
<?xml version="1.0" encoding="utf-8"?>
<LinearLayout
    xmlns:android="http://schemas.android.com/apk/res/android"
    xmlns:tools="http://schemas.android.com/tools"
    android:layout_width="match_parent"
    android:layout_height="match_parent"
    android:orientation="vertical"
    android:id="@+id/layout"
    tools:context="org.pondar.snackbardemokotlin.MainActivity">

    <TextView
        android:layout_width="match_parent"
        android:layout_height="wrap_content"
        android:textSize="25sp"
        android:text="@string/yourname"
        android:id="@+id/textView"
        />

    <EditText
        android:layout_width="match_parent"
        android:layout_height="wrap_content"
        android:textSize="25sp"
        android:inputType="text"
        android:id="@+id/editText"
        />

    <Button
        android:layout_width="wrap_content"
        android:layout_height="wrap_content"
        android:text="@string/save"
        android:textSize="25sp"
        android:id="@+id/saveButton"/>

    <TextView
        android:layout_width="match_parent"
        android:layout_height="wrap_content"
        android:text="@string/last_thing_entered"
        android:textSize="25sp"
        android:id="@+id/textView2"
        />

    <TextView
        android:layout_width="match_parent"
        android:layout_height="wrap_content"
        android:text=""
        android:textSize="25sp"
        android:id="@+id/lastEntered"
        />

</LinearLayout>
```

### Step 4: Write Code

Replace your MainActivity code with the following:

**MainActivity.kt**

```kotlin
package org.pondar.snackbardemokotlin

import android.content.Context
import androidx.appcompat.app.AppCompatActivity
import android.os.Bundle
import com.google.android.material.snackbar.Snackbar
import android.view.inputmethod.InputMethodManager
import org.pondar.snackbardemokotlin.databinding.ActivityMainBinding

class MainActivity : AppCompatActivity() {

    private var currentName = "" //nothing entered

    //This is the backup where we save the name in case the user hits the undo button
    private var backup  = ""
    lateinit var binding : ActivityMainBinding

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)

        binding = ActivityMainBinding.inflate(layoutInflater)
        val view = binding.root
        setContentView(view)
        val parent = binding.layout
        //setting up the click listener.
        binding.saveButton.setOnClickListener {
            backup = currentName //creating a backup

            //the following two lines hide the keyboard after clicking the button
            //which is what you want!
            val imm = getSystemService(Context.INPUT_METHOD_SERVICE) as InputMethodManager?
            imm!!.hideSoftInputFromWindow(parent.windowToken, 0)

            //save the text entered in the current name field.
            currentName = binding.editText.text.toString()
            binding.lastEntered.text = currentName
            //Now setup our snackbar and show it

            val snackbar = Snackbar
                    .make(parent, "Name saved", Snackbar.LENGTH_LONG)
                    .setAction("UNDO") {
                        //This code will ONLY be executed in case that
                        //the user has hit the UNDO button
                        currentName = backup //get backup
                        binding.lastEntered.text = currentName
                        val snackbar = Snackbar.make(parent, "Old name restored!", Snackbar.LENGTH_SHORT)

                        //Show the user we have restored the name - but here
                        //on this snackbar there is NO UNDO - so no SetAction method is called
                        //if you wanted, you could include a REDO on the second action button
                        //for instance.
                        snackbar.show()
                    }

            snackbar.show()
        }
    }
}
```

### Run

Download the code, build and run.

### References

Find reference links below:

| Number | Link |
| --- | --- |
| 1. | [Download](https://github.com/zaifrun/SnackBarDemoKotlin/archive/refs/heads/master.zip) Example |
| 2. | [Follow](https://github.com/zaifrun/) example author |
| 3. | [SnackBar](https://developer.android.com/reference/com/google/android/material/snackbar/Snackbar) Documentation |

## Example 3: Kotlin Android SnackBar Example

Yet another Kotlin Android snackbar example.

### Step 1: Create Project

Again create an empty android project in androidstudio.

### Step 2: Dependencies

Add Material package as a dependency:

```groovy
    implementation 'com.google.android.material:material:1.0.0'
```

### Step 3: Design layout

Design your main activity layout as follows;

**activity_main.xml**

```xml
<?xml version="1.0" encoding="utf-8"?>
<androidx.coordinatorlayout.widget.CoordinatorLayout xmlns:android="http://schemas.android.com/apk/res/android"
    android:layout_width="match_parent"
    android:id="@+id/coordinatorLayout"
    android:layout_height="match_parent"
    android:padding="20dp">
    <RelativeLayout
        android:layout_width="match_parent"
        android:layout_height="match_parent">
        <Button
            android:id="@+id/button"
            android:layout_width="wrap_content"
            android:layout_height="wrap_content"
            android:layout_alignParentTop="true"
            android:layout_centerHorizontal="true"
            android:text="DEFAULT SNACKBAR" />
        <Button
            android:id="@+id/button2"
            android:layout_width="wrap_content"
            android:layout_height="wrap_content"
            android:layout_below="@+id/button"
            android:layout_centerHorizontal="true"
            android:text="ACTION CALL SNACKBAR" />
        <Button
            android:id="@+id/button3"
            android:layout_width="wrap_content"
            android:layout_height="wrap_content"
            android:layout_below="@+id/button2"
            android:layout_centerHorizontal="true"
            android:text="CUSTOM VIEW SNACKBAR" />
    </RelativeLayout>

</androidx.coordinatorlayout.widget.CoordinatorLayout>
```

### Step 4: Write code

Lastly write your MainActivity code as follows;

**MainActivity.kt**

```kotlin
import android.graphics.Color
import android.os.Bundle
import android.view.View
import android.widget.Button
import android.widget.TextView
import androidx.appcompat.app.AppCompatActivity
import androidx.coordinatorlayout.widget.CoordinatorLayout
import com.google.android.material.snackbar.Snackbar

class MainActivity : AppCompatActivity() {
    var coordinatorLayout: CoordinatorLayout? = null
    private var one: Button? = null
    private var two: Button? = null
    private var three: Button? = null
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_main)
        coordinatorLayout = findViewById(R.id.coordinatorLayout) as CoordinatorLayout
        one = findViewById(R.id.button) as Button
        two = findViewById(R.id.button2) as Button
        three = findViewById(R.id.button3) as Button
        one!!.setOnClickListener(object : View.OnClickListener {
           override fun onClick(v: View) {
                val snackbar = Snackbar
                        .make(coordinatorLayout!!, "Snackbar Tutorial", Snackbar.LENGTH_LONG)
                snackbar.show()
            }
        })

        two!!.setOnClickListener(object : View.OnClickListener {
            override fun onClick(v: View) {
                val snackbar = Snackbar
                        .make(coordinatorLayout!!, "ACTION CALL SNACKBAR with Undo Button", Snackbar.LENGTH_LONG)
                        .setAction("UNDO", object : View.OnClickListener {
                           override fun onClick(view: View) {
                                val snackbar1 = Snackbar.make(coordinatorLayout!!, "Message is restored!", Snackbar.LENGTH_SHORT)
                                snackbar1.show()
                            }
                        })

                snackbar.show()
            }

        })

        three!!.setOnClickListener(object : View.OnClickListener {
            override  fun onClick(v: View) {
                val snackbar = Snackbar
                        .make(coordinatorLayout!!, "CUSTOM VIEW SNACKBAR", Snackbar.LENGTH_LONG)
                        .setAction("RETRY", object : View.OnClickListener {
                          override  fun onClick(view: View) {}
                        })
                snackbar.setActionTextColor(Color.RED)
                val sbView = snackbar.getView()
                val textView = sbView.findViewById(R.id.snackbar_text) as TextView
                textView.setTextColor(Color.YELLOW)
                snackbar.show()
            }
        })
    }
}
```

### Run

Download the code, build and run.

### References

Find reference links below:

| Number | Link |
| --- | --- |
| 1. | [Download](https://github.com/quicklearner4991/Snackbarxample//archive/refs/heads/master.zip) Example |
| 2. | [Follow](https://github.com/quicklearner4991/) example author |
| 3. | [SnackBar](https://developer.android.com/reference/com/google/android/material/snackbar/Snackbar) Documentation |

## Example 4: Kotlin Android SnackBar with Callback, Action item and custom UI changes

This example shows how to implement Snackbar with Callback , Action item and Custom UI Changes.

### Step 1: Create Project

Create an empty androidstudio project.

### Step 2: Dependencies

In your app-level `build.gradle` add Material package:

```groovy
    implementation "com.google.android.material:material:1.1.0-alpha09"
}
```

### Step 3: Design Layout

Add AppCompatTextView and AppCompatButton in your main activity layout as follows:

**activity_main.xml**

```xml
<?xml version="1.0" encoding="utf-8"?>
<LinearLayout
        xmlns:android="http://schemas.android.com/apk/res/android"
        xmlns:tools="http://schemas.android.com/tools"
        android:orientation="vertical"
        android:padding="16dp"
        android:gravity="center_horizontal"
        android:layout_width="match_parent"
        android:layout_height="match_parent"
        tools:context=".MainActivity">

    <androidx.appcompat.widget.AppCompatTextView
            android:id="@+id/textView_snackBar_status"
            android:text="@string/sb_status"
            android:textAppearance="@style/TextAppearance.AppCompat.Large"
            android:layout_width="wrap_content"
            android:layout_height="wrap_content"/>

    <androidx.appcompat.widget.AppCompatButton
            android:id="@+id/button_snackBar_default"
            android:layout_width="wrap_content"
            android:layout_height="wrap_content"
            android:layout_marginTop="16dp"
            android:text="@string/sb_default"/>

    <androidx.appcompat.widget.AppCompatButton
            android:id="@+id/button_snackBar_clicked"
            android:layout_width="wrap_content"
            android:layout_height="wrap_content"
            android:layout_marginTop="16dp"
            android:text="@string/sb_clicked"/>

    <androidx.appcompat.widget.AppCompatButton
            android:id="@+id/button_snackBar_custom"
            android:layout_width="wrap_content"
            android:layout_height="wrap_content"
            android:layout_marginTop="16dp"
            android:text="@string/sb_custom"/>

</LinearLayout>
```

### Step 4: Write Code

The following code shows the default SnackBar with the `Undo` button:

```kotlin
    private fun showDefaultSnackBar(view: View) {
        Snackbar
            .make(view, resources.getString(R.string.sb_default), Snackbar.LENGTH_LONG)
            .setAction("Undo") {
                textView_snackBar_status.text = resources.getString(R.string.sb_clicked)
            }
            .show()
    }
```

The following code shows a snackbar with callback handled:

```kotlin
    private fun showCallBackSnackBar(view: View) {
        Snackbar
            .make(view, resources.getString(R.string.sb_action), Snackbar.LENGTH_LONG)
            .addCallback(object : Snackbar.Callback() {
                override fun onDismissed(transientBottomBar: Snackbar?, event: Int) {
                    super.onDismissed(transientBottomBar, event)
                    textView_snackBar_status.text = resources.getString(R.string.sb_status_dismiss)
                }

                override fun onShown(sb: Snackbar?) {
                    super.onShown(sb)
                    textView_snackBar_status.text = resources.getString(R.string.sb_status_show)
                }
            })
            .show()
    }
```

The following code allows you to create a snackbar with custom UI:

```kotlin
    private fun showCustomChangesSnackBar(view: View) {
        Snackbar
            .make(view, resources.getString(R.string.sb_custom), Snackbar.LENGTH_LONG)
            .setBackgroundTint(ContextCompat.getColor(this@MainActivity, android.R.color.holo_green_dark))
            .setTextColor(ContextCompat.getColor(this@MainActivity, android.R.color.darker_gray))
            .show()
    }
```

Here is the full code:

**MainActivity.kt**

```kotlin
import android.os.Bundle
import android.view.View
import androidx.appcompat.app.AppCompatActivity
import androidx.core.content.ContextCompat
import com.google.android.material.snackbar.Snackbar
import kotlinx.android.synthetic.main.activity_main.*

class MainActivity : AppCompatActivity() {

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_main)

        button_snackBar_default.setOnClickListener {
            showDefaultSnackBar(it)
        }

        button_snackBar_clicked.setOnClickListener {
            showCallBackSnackBar(it)
        }

        button_snackBar_custom.setOnClickListener {
            showCustomChangesSnackBar(it)
        }
    }

    private fun showDefaultSnackBar(view: View) {
        Snackbar
            .make(view, resources.getString(R.string.sb_default), Snackbar.LENGTH_LONG)
            .setAction("Undo") {
                textView_snackBar_status.text = resources.getString(R.string.sb_clicked)
            }
            .show()
    }

    private fun showCallBackSnackBar(view: View) {
        Snackbar
            .make(view, resources.getString(R.string.sb_action), Snackbar.LENGTH_LONG)
            .addCallback(object : Snackbar.Callback() {
                override fun onDismissed(transientBottomBar: Snackbar?, event: Int) {
                    super.onDismissed(transientBottomBar, event)
                    textView_snackBar_status.text = resources.getString(R.string.sb_status_dismiss)
                }

                override fun onShown(sb: Snackbar?) {
                    super.onShown(sb)
                    textView_snackBar_status.text = resources.getString(R.string.sb_status_show)
                }
            })
            .show()
    }

    private fun showCustomChangesSnackBar(view: View) {
        Snackbar
            .make(view, resources.getString(R.string.sb_custom), Snackbar.LENGTH_LONG)
            .setBackgroundTint(ContextCompat.getColor(this@MainActivity, android.R.color.holo_green_dark))
            .setTextColor(ContextCompat.getColor(this@MainActivity, android.R.color.darker_gray))
            .show()
    }
}
```

### Run

Download the code, build and run.

### References

Find reference links below:

| Number | Link |
| --- | --- |
| 1. | [Download](https://github.com/vprabhu/SnackBarDemo/archive/refs/heads/master.zip) Example |
| 2. | [Follow](https://github.com/vprabhu/) example author |
| 3. | [SnackBar](https://developer.android.com/reference/com/google/android/material/snackbar/Snackbar) Documentation |

## Example 5: Kotlin Android Custom Snackbar with BaseTranscientBottomBar

This example explores creation of a custom snackbar using the `BaseTranscientBottomBar` class.

### Step 1: Create Project

Start by creating Android Project.

### Step 2: Dependencies

No external dependency is needed. Just add material package;

```groovy
    implementation "com.google.android.material:material:1.1.0-alpha03"
```

### Step 3: Design layouts

You need to design three layouts:

**(a).view_bottom_banner.xml**

```xml
<?xml version="1.0" encoding="utf-8"?>
<androidx.constraintlayout.widget.ConstraintLayout
        xmlns:android="http://schemas.android.com/apk/res/android"
        xmlns:app="http://schemas.android.com/apk/res-auto"
        xmlns:tools="http://schemas.android.com/tools"
        android:layout_width="match_parent"
        android:layout_height="@dimen/banner_height"
        android:layout_gravity="bottom"
        android:background="@color/blue_ribbon"
>

    <ImageView
            android:id="@+id/banner_icon"
            android:layout_width="wrap_content"
            android:layout_height="wrap_content"
            android:layout_marginStart="@dimen/unit_2"
            android:layout_marginEnd="@dimen/unit_1"
            app:layout_constraintBottom_toBottomOf="parent"
            app:layout_constraintEnd_toStartOf="@id/banner_text"
            app:layout_constraintHorizontal_bias="0.0"
            app:layout_constraintStart_toStartOf="parent"
            app:layout_constraintTop_toTopOf="parent"
            app:layout_goneMarginStart="@dimen/unit_1"
            tools:src="@drawable/ic_thumb_up"
    />

    <TextView
            android:id="@+id/banner_text"
            android:layout_width="0dp"
            android:layout_height="0dp"
            android:layout_marginTop="@dimen/unit_1"
            android:layout_marginBottom="@dimen/unit_1"
            android:paddingStart="@dimen/unit_1"
            android:paddingEnd="@dimen/unit_1"
            android:alpha="@dimen/mtrl_emphasis_high_type"
            android:ellipsize="end"
            android:gravity="center_vertical|start"
            android:maxLines="2"
            android:textAlignment="viewStart"
            android:textAppearance="@style/TextAppearance.MaterialComponents.Body2"
            android:textColor="@color/white"
            app:layout_constraintBottom_toBottomOf="parent"
            app:layout_constraintEnd_toStartOf="@id/banner_action"
            app:layout_constraintStart_toEndOf="@id/banner_icon"
            app:layout_constraintTop_toTopOf="parent"
            tools:text="votre demande d'acompte a bien été validée"
    />

    <Button
            android:id="@+id/banner_action"
            style="@style/Widget.AppCompat.Button.Borderless"
            android:layout_width="wrap_content"
            android:layout_height="wrap_content"
            android:layout_marginStart="@dimen/unit_4"
            android:minWidth="48dp"
            android:textColor="@color/white"
            android:visibility="gone"
            app:layout_constraintBottom_toBottomOf="parent"
            app:layout_constraintEnd_toEndOf="parent"
            app:layout_constraintHorizontal_bias="1.0"
            app:layout_constraintStart_toEndOf="@id/banner_text"
            app:layout_constraintTop_toTopOf="parent"
            tools:text="Fermer"
            tools:visibility="visible"
    />
</androidx.constraintlayout.widget.ConstraintLayout>
```

**(b).view_fullscreen_banner.xml**

```xml
<?xml version="1.0" encoding="utf-8"?>
<LinearLayout
        xmlns:android="http://schemas.android.com/apk/res/android"
        android:layout_width="match_parent"
        android:layout_height="256dp"
        android:layout_gravity="bottom"
        android:orientation="vertical"
        android:background="@drawable/rounded_background"
>

    <TextView
            android:id="@+id/text"
            android:layout_width="match_parent"
            android:layout_height="match_parent"
            android:layout_gravity="center"
            android:gravity="center"
            android:ellipsize="end"
            android:maxLines="2"
            android:text="LARGE BOTTOM BAR"
            android:textAppearance="@style/Base.TextAppearance.AppCompat.Title"
            android:textColor="@color/white"
    />
</LinearLayout>
```

**(c).activity_main.xml**

```xml
<?xml version="1.0" encoding="utf-8"?>
<androidx.constraintlayout.widget.ConstraintLayout
        xmlns:android="http://schemas.android.com/apk/res/android"
        xmlns:tools="http://schemas.android.com/tools"
        xmlns:app="http://schemas.android.com/apk/res-auto"
        android:id="@+id/container"
        android:layout_width="match_parent" android:layout_height="match_parent"
        tools:context=".MainActivity">

    <Button
            android:id="@+id/snackbar"
            android:layout_width="wrap_content"
            android:layout_height="wrap_content"
            app:layout_constraintStart_toStartOf="parent"
            app:layout_constraintEnd_toEndOf="parent"
            app:layout_constraintTop_toTopOf="parent"
            android:text="Snackbar"
            app:layout_constraintHorizontal_bias="0.5" app:layout_constraintBottom_toTopOf="@+id/bottomBar"/>
    <Button
            android:id="@+id/bottomBar"
            android:layout_width="wrap_content"
            android:layout_height="wrap_content"
            app:layout_constraintStart_toStartOf="parent"
            app:layout_constraintEnd_toEndOf="parent"
            android:text="Bottom bar"
            app:layout_constraintTop_toBottomOf="@+id/snackbar" app:layout_constraintHorizontal_bias="0.5"
            app:layout_constraintBottom_toTopOf="@+id/largebanner"/>
    <Button
            android:id="@+id/largebanner"
            android:layout_width="wrap_content"
            android:layout_height="wrap_content"
            app:layout_constraintStart_toStartOf="parent"
            app:layout_constraintEnd_toEndOf="parent"
            android:text="Large banner"
            app:layout_constraintTop_toBottomOf="@+id/bottomBar" app:layout_constraintHorizontal_bias="0.5"
            app:layout_constraintBottom_toBottomOf="parent"/>

</androidx.constraintlayout.widget.ConstraintLayout>
```

### Step 4: Create Bottom Banner

Create a bottom banner using the following code:

**BottomBanner.kt**

```kotlin
import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import android.widget.Button
import android.widget.FrameLayout
import android.widget.ImageView
import android.widget.TextView
import androidx.annotation.DrawableRes
import androidx.annotation.IntDef
import androidx.coordinatorlayout.widget.CoordinatorLayout
import com.google.android.material.snackbar.BaseTransientBottomBar

typealias AnimationContentViewCallback = com.google.android.material.snackbar.ContentViewCallback

class BottomBanner private constructor(
    parent: ViewGroup,
    content: View,
    callback: AnimationContentViewCallback
) : BaseTransientBottomBar<BottomBanner>(parent, content, callback) {
    private val bannerText: TextView by lazy(LazyThreadSafetyMode.NONE) {
        view.findViewById<TextView>(R.id.banner_text)
    }
    private val bannerIcon: ImageView by lazy(LazyThreadSafetyMode.NONE) {
        view.findViewById<ImageView>(R.id.banner_icon)
    }
    private val bannerAction: Button by lazy(LazyThreadSafetyMode.NONE) {
        view.findViewById<Button>(R.id.banner_action)
    }

    fun setText(text: CharSequence): BottomBanner {
        bannerText.text = text
        return this
    }

    fun setIcon(@DrawableRes drawableRes: Int): BottomBanner {
        bannerIcon.setImageResource(drawableRes)
        return this
    }

    fun setAction(text: CharSequence, callback: (View) -> Unit = {}): BottomBanner {
        bannerAction.text = text
        bannerAction.visibility = View.VISIBLE
        bannerAction.setOnClickListener { view ->
            callback(view)
            dismiss()
        }
        return this
    }

    fun setAction(text: CharSequence, listener: View.OnClickListener): BottomBanner {
        bannerAction.text = text
        bannerAction.visibility = View.VISIBLE
        bannerAction.setOnClickListener { view ->
            listener.onClick(view)
            dismiss()
        }
        return this
    }

    companion object {

        const val LENGTH_SHORT = BaseTransientBottomBar.LENGTH_SHORT
        const val LENGTH_LONG = BaseTransientBottomBar.LENGTH_LONG
        const val LENGTH_INDEFINITE = BaseTransientBottomBar.LENGTH_INDEFINITE

        @Retention(AnnotationRetention.SOURCE)
        @IntDef(LENGTH_SHORT, LENGTH_LONG, LENGTH_INDEFINITE)
        annotation class BannerDuration

        private val animationCallback =
            object : AnimationContentViewCallback {
                override fun animateContentIn(delay: Int, duration: Int) {
                    /* no animations */
                }

                override fun animateContentOut(delay: Int, duration: Int) {
                    /* no animations */
                }
            }

        @JvmStatic
        fun make(view: View, text: CharSequence, @BannerDuration duration: Int): BottomBanner {
            val parent = findSuitableParent(view)
            if (parent == null) {
                throw IllegalArgumentException(
                    "No suitable parent found from the given view. Please provide a valid view."
                )
            }
            val inflater = LayoutInflater.from(view.context)
            val content = inflater.inflate(R.layout.view_bottom_banner, parent, false)
            val viewCallback = animationCallback
            val bottomBanner = BottomBanner(parent, content, viewCallback)
            bottomBanner.setText(text)
            bottomBanner.getView().setPadding(0, 0, 0, 0)
            bottomBanner.duration = duration
            return bottomBanner
        }

        private fun findSuitableParent(view: View): ViewGroup? {
            var currentView: View? = view
            var fallback: ViewGroup? = null
            do {
                when (currentView) {
                    is CoordinatorLayout -> return currentView
                    is FrameLayout -> if (currentView.id == android.R.id.content) {
                        return currentView
                    } else {
                        fallback = currentView
                    }
                }
                if (currentView != null) {
                    val parent = currentView.parent
                    currentView = if (parent is View) parent else null
                }
            } while (currentView != null)
            return fallback
        }
    }
}
```

### Step 5: Create Large Banner

Then a large banner using the following code;

**LargeBanner**

```kotlin

import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import android.widget.FrameLayout
import android.widget.TextView
import androidx.annotation.IntDef
import androidx.coordinatorlayout.widget.CoordinatorLayout
import com.google.android.material.snackbar.BaseTransientBottomBar

class LargeBanner private constructor(
    parent: ViewGroup,
    content: View,
    callback: AnimationContentViewCallback
) : BaseTransientBottomBar<LargeBanner>(parent, content, callback) {
    private val text: TextView by lazy(LazyThreadSafetyMode.NONE) {
        view.findViewById<TextView>(R.id.text)
    }

    fun setText(text: CharSequence): LargeBanner {
        this.text.text = text
        return this
    }

    companion object {

        const val LENGTH_SHORT = BaseTransientBottomBar.LENGTH_SHORT
        const val LENGTH_LONG = BaseTransientBottomBar.LENGTH_LONG
        const val LENGTH_INDEFINITE = BaseTransientBottomBar.LENGTH_INDEFINITE

        @Retention(AnnotationRetention.SOURCE)
        @IntDef(LENGTH_SHORT, LENGTH_LONG, LENGTH_INDEFINITE)
        annotation class BannerDuration

        private val animationCallback =
            object : AnimationContentViewCallback {
                override fun animateContentIn(delay: Int, duration: Int) {
                    /* no animations */
                }

                override fun animateContentOut(delay: Int, duration: Int) {
                    /* no animations */
                }
            }

        @JvmStatic
        fun make(view: View, text: CharSequence, @BannerDuration duration: Int): LargeBanner {
            val parent = findSuitableParent(view)
            if (parent == null) {
                throw IllegalArgumentException(
                    "No suitable parent found from the given view. Please provide a valid view."
                )
            }
            val inflater = LayoutInflater.from(view.context)
            val content = inflater.inflate(R.layout.view_fullscreen_banner, parent, false)
            val viewCallback = animationCallback
            val bottomBanner = LargeBanner(parent, content, viewCallback)
            bottomBanner.setText(text)
            bottomBanner.getView().setPadding(0, 0, 0, 0)
            bottomBanner.duration = duration
            return bottomBanner
        }

        internal fun findSuitableParent(view: View): ViewGroup? {
            var currentView: View? = view
            var fallback: ViewGroup? = null
            do {
                when (currentView) {
                    is CoordinatorLayout -> return currentView
                    is FrameLayout -> if (currentView.id == android.R.id.content) {
                        return currentView
                    } else {
                        fallback = currentView
                    }
                }
                if (currentView != null) {
                    val parent = currentView.parent
                    currentView = if (parent is View) parent else null
                }
            } while (currentView != null)
            return fallback
        }
    }
}
```

### Step 6: Create bottom banner

Then the main activity:

**MainActivity.kt**

```kotlin
package com.technologies.fabernovel.bottombanner

import android.os.Bundle
import android.widget.Toast
import androidx.appcompat.app.AppCompatActivity
import com.google.android.material.snackbar.Snackbar
import kotlinx.android.synthetic.main.activity_main.*

class MainActivity : AppCompatActivity() {

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_main)
        snackbar.setOnClickListener {
            Snackbar.make(container, "Ceci est une snackbar", Snackbar.LENGTH_SHORT).show()
        }
        bottomBar.setOnClickListener {
            BottomBanner.make(container, "Ceci est une snackbar custom", BottomBanner.LENGTH_SHORT)
                .setIcon(R.drawable.ic_thumb_up)
                .setAction("Annuler") {
                    Toast.makeText(this, "Cancelled", Toast.LENGTH_SHORT).show()
                }
                .show()
        }

        largebanner.setOnClickListener {
            LargeBanner.make(container, "Ceci est une snackbar LARGE", LargeBanner.LENGTH_SHORT)
                .show()
        }
    }
}
```

### Run

Copy the code or Download it below, build in android studio and run.

### Reference

Here are the reference links:

| Number | Link |
| --- | --- |
| 1. | [Download](https://github.com/sjcqs/custom-snackbar-demo/archive/refs/heads/master.zip) Example |
| 2. | [Follow](https://github.com/sjcqs/) code author |

# Creating Custom SnackBar with Libraries

Having looked at how to create Snackbar using the standard Android SDK APIs, let's also look at how to construct custom, beautiful SnackBars with third party libraries.

## Use EDAlertSnackbar

> EDAlertSnackbar is a library to help you create beautiful alert SnackBars.

The best way to understand it is to look at demo images then code. Here are some demo images of this library:

![EDAlertSnackbar](https://github.com/EunidevStudio/EDAlertSnackbar/raw/master/Image/EDAlertSnackbar.jpg?raw=true)

So how do use `EDAlertSnackbar`?

### Step 1: Install it

To install it:

1. Add the JitPack repository to your root-level `build.gradle` file

```
allprojects {
    repositories {
        ...
        maven { url "https://jitpack.io" }
    }
}
```

2. Add the dependency

```
dependencies {
    implementation 'com.github.EunidevStudio:EDAlertSnackbar:1.0.4'
}
```

### Step 2: Create Snackbar Alerts

This is easy for example to display success alert:

```kotlin
EDAlertSnackbar.success(this@MainActivity, this, "Success Message", Snackbar.LENGTH_LONG).show()
```

To display warning:

```kotlin
EDAlertSnackbar.warning(this@MainActivity, this, "Warning Message", Snackbar.LENGTH_LONG).show()
```

To display Info:

```kotlin
EDAlertSnackbar.info(this@MainActivity, this, "Info Message", Snackbar.LENGTH_LONG).show()
```

To display failure:

```kotlin
EDAlertSnackbar.failed(this@MainActivity, this, "Failed Message", Snackbar.LENGTH_LONG).show()
```

With callback and customizations:

```kotlin
EDAlertSnackbar.success(this@MainActivity, this, "Success", Snackbar.LENGTH_LONG).apply {

        // Add Callback
        addCallback(object : Snackbar.Callback() {
            override fun onDismissed(transientBottomBar: Snackbar?, event: Int) {
                Log.i("EDAlertSnackbar", "Dismissed")
            }

            override fun onShown(sb: Snackbar?) {
                Log.i("EDAlertSnackbar", "Shown")
            }
        })

        // Set action
        setAction("Oke") { Toast.makeText(this@MainActivity, "Oke", Toast.LENGTH_SHORT).show() }

        // Enable or Disable Icon
        iconEnabled(true)

        // Set Your Custom Alert Icon
        setAlertIcon(R.drawable.ic_android)

        // Set Action Text Color
        setActionTextColor(Color.WHITE)

        // Set Message Text Color
        setMessageTextColor(Color.WHITE)

        // Show Snackbar
        show()
}
```

### Full Example

1. Start by creating a project.
2. Install the library as has been discussed.
3. Then:

Create Layout:

**activity_main.xml**

```xml
<?xml version="1.0" encoding="utf-8"?>
<androidx.constraintlayout.widget.ConstraintLayout xmlns:android="http://schemas.android.com/apk/res/android"
    xmlns:app="http://schemas.android.com/apk/res-auto"
    xmlns:tools="http://schemas.android.com/tools"
    android:layout_width="match_parent"
    android:layout_height="match_parent"
    tools:context=".MainActivity">

    <TextView
        android:layout_width="wrap_content"
        android:layout_height="wrap_content"
        android:text="Hello World!"
        app:layout_constraintBottom_toBottomOf="parent"
        app:layout_constraintLeft_toLeftOf="parent"
        app:layout_constraintRight_toRightOf="parent"
        app:layout_constraintTop_toTopOf="parent" />

</androidx.constraintlayout.widget.ConstraintLayout>
```

Write Kotlin code:

**MainActivity.kt**

```kotlin
package com.eunidev.edsnackbar

import androidx.appcompat.app.AppCompatActivity
import android.os.Bundle

class MainActivity : AppCompatActivity() {
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_main)
    }
}
```

That's it. Build and run.

### Reference

Here are the reference links:

| number | link |
| --- | --- |
| 1. | [Download](https://downgit.github.io/#/home?url=https://github.com/anafthdev/EDAlertSnackbar/tree/master/app) Example |
| 2. | [Read](https://github.com/anafthdev/) more |
| 3. | [Follow](https://github.com/anafthdev) library author |
