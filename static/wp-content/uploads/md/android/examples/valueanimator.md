# ValueAnimator Example


This is a simple example where we use the `ValueAnimator` class to animate a simple TextView in Kotlin android.


Here is the demo we create:

![Kotlin Android ValueAnimator Example](https://camposha.info/android-examples/wp-content/uploads/sites/9/2022/01/valueAnimator.gif)

### Step 1: Create Project

Start by creating an empty `Android Studio` project.

### Step 2: Dependencies

Because we are using Kotlin we will add the `kotlin-stdlib` dependency:

```groovy
    implementation"org.jetbrains.kotlin:kotlin-stdlib-jdk7:$kotlin_version"
```

We also add the `AppCompat` and \`ConstraintLayout:

```groovy
    implementation "androidx.appcompat:appcompat:$buildToolsVer"
    implementation "androidx.constraintlayout:constraintlayout:$constraintLayoutVersion"
```

### Step 3: Design Layout

Design your `MainActivity` layout as follows by adding a button to initiate an animation and a textview:

**activity_main.xml**

```xml
<?xml version="1.0" encoding="utf-8"?>
<LinearLayout xmlns:android="http://schemas.android.com/apk/res/android"
    xmlns:app="http://schemas.android.com/apk/res-auto"
    xmlns:tools="http://schemas.android.com/tools"
    android:layout_width="match_parent"
    android:layout_height="match_parent"
    android:orientation="vertical"
    tools:context="com.developers.valueanimator.MainActivity">

    <Button
        android:id="@+id/animate_button"
        android:layout_width="match_parent"
        android:layout_height="wrap_content"
        android:layout_marginBottom="15dp"
        android:layout_marginEnd="15dp"
        android:layout_marginStart="15dp"
        android:text="@string/start_animating_text" />

    <TextView
        android:id="@+id/textView"
        android:layout_width="wrap_content"
        android:layout_height="wrap_content"
        android:layout_gravity="center"
        android:text="Hello World!"
        android:textColor="@android:color/black"
        android:textSize="25sp"
        app:layout_constraintBottom_toBottomOf="parent"
        app:layout_constraintLeft_toLeftOf="parent"
        app:layout_constraintRight_toRightOf="parent"
        app:layout_constraintTop_toTopOf="parent" />

</LinearLayout>
```

### Step 4: Write Code

In your `MainActivity.kt` add imports including the `android.animation.ValueAnimator`:

```kotlin
import android.animation.ValueAnimator
import androidx.appcompat.app.AppCompatActivity
import android.os.Bundle
import kotlinx.android.synthetic.main.activity_main.*
```

Then extend the `AppCompatActivity` and define an instance field containing an end-value integer:

```kotlin
class MainActivity : AppCompatActivity() {

    private val endValue = 20
```

Override the `onCreate()`:

```kotlin
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_main)
```

Listen to our animation-button click:

```kotlin
        animate_button.setOnClickListener {
```

Initialize the `ValueAnimator` as follows:

```kotlin
            val valueAnimator = ValueAnimator.ofFloat(textView.textSize, endValue.toFloat())
```

Then set the duration of the `ValueAnimator`:

```kotlin
            valueAnimator.duration = 600
```

Then apply an update listener to the `ValueAnimator`:

```kotlin
            valueAnimator.addUpdateListener {
```

Obtain the animated value for example and show it:

```kotlin
                val animatedValue = it.animatedValue as Float
                println(animatedValue)
                textView.textSize = animatedValue
            }
```

Then start the `ValueAnimator`:

```kotlin
            valueAnimator.start()
        }
    }
}
```

Here is the full code:

**MainActivity.kt**

```kotlin
import android.animation.ValueAnimator
import androidx.appcompat.app.AppCompatActivity
import android.os.Bundle
import kotlinx.android.synthetic.main.activity_main.*

class MainActivity : AppCompatActivity() {

    private val endValue = 20

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_main)
        animate_button.setOnClickListener {
            val valueAnimator = ValueAnimator.ofFloat(textView.textSize, endValue.toFloat())
            valueAnimator.duration = 600
            valueAnimator.addUpdateListener {
                val animatedValue = it.animatedValue as Float
                println(animatedValue)
                textView.textSize = animatedValue
            }
            valueAnimator.start()
        }
    }
}
```

### Run

Copy the code or download it in the link below, build and run.

### Reference

Here are the reference links:

| Number | Link |
| --- | --- |
| 1. | [Download](https://downgit.github.io/#/home?url=https://github.com/amanjeetsingh150/kotlin-android-examples/tree/master/ValueAnimator) Example |
| 2. | [Follow](https://github.com/amanjeetsingh150/) code author |
| 3. | Code: [Apache 2.0 License](http://www.apache.org/licenses/LICENSE-2.0.txt) |
