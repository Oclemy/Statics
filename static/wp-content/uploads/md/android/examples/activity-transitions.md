# Kotlin Android Activity Transition Animation Examples

To create a modern app, you may want to use transition animations in your activity. Android Framework provides the capability to induce sleek animated transitions as you open or exit an activity. In this article we want to look at how to include such transitions.


### What is an Activity Transition?

Material design apps use activity transitions to connect different states through motion and transformations. Custom animations can be specified for enter-exit transitions and transitions between shared elements.

- In an activity, the enter transition determines how views enter the scene. For example, the explode enter transition allows views to fly in from the outside of the screen towards the center.

- Views in an activity exit the scene using exit transitions. For example, in the explode exit transition, views exit the scene away from the center.

- The shared elements transition determines how views between two activities are transitioned between these activities. In the example of two activities that have the same image but in different positions and sizes, the _changeImageTransform_ shared element transition smoothly translates and scales the image.

## Examples

## Example 1: Kotlin Android - Activity Transitions without any library

Let's see an example of how to create animated transitions without using third party library.

### Step 1: Dependencies

No third party dependency is needed.

### Step 2: Animations

The next step is to actually write these animations in XML and include them in a resource directory named `anim`. If such a directory doesn't exist in your app then create it.

After creating the `anim` directory we will add the following animation files in them:

**slide_down.xml**

Then we add the following code:

```xml
<?xml version="1.0" encoding="utf-8"?>
<set xmlns:android="http://schemas.android.com/apk/res/android" >

    <translate
        android:duration="50"
        android:fromYDelta="0%p"
        android:interpolator="@android:anim/accelerate_interpolator"
        android:toYDelta="100%p" />

</set>
```

**slide_in_left.xml**

```xml
<?xml version="1.0" encoding="utf-8"?>

<set xmlns:android="http://schemas.android.com/apk/res/android">
    <translate android:fromXDelta="-100%p" android:toXDelta="0"
        android:duration="@android:integer/config_mediumAnimTime"/>
</set>
```

**slide_in_right.xml**

```xml
<?xml version="1.0" encoding="utf-8"?>

<set xmlns:android="http://schemas.android.com/apk/res/android">
    <translate android:fromXDelta="100%p" android:toXDelta="0"
        android:duration="@android:integer/config_mediumAnimTime"/>
</set>
```

**slide_out_left.xml**

```xml
<?xml version="1.0" encoding="utf-8"?>
<set xmlns:android="http://schemas.android.com/apk/res/android">
    <translate android:fromXDelta="0" android:toXDelta="-100%p"
        android:duration="@android:integer/config_mediumAnimTime"/>
</set>
```

**slide_out_right.xml**

```xml
<?xml version="1.0" encoding="utf-8"?>

<set xmlns:android="http://schemas.android.com/apk/res/android">
    <translate android:fromXDelta="0" android:toXDelta="100%p"
        android:duration="@android:integer/config_mediumAnimTime"/>
</set>
```

**slide_up.xml**

```xml
<?xml version="1.0" encoding="utf-8"?>
<set xmlns:android="http://schemas.android.com/apk/res/android">

    <translate
        android:duration="100"
        android:fromYDelta="100%"
        android:interpolator="@android:anim/accelerate_interpolator"
        android:toXDelta="0" />

</set>
```

### Step 3: Styles

In the third step we need to actually apply the animations to the activities. However, this is done declaratively at the theme level as opposed to the activity level

So in the `styles.xml` file create a style as follows:

```xml
    <style name="CustomActivityAnimation" parent="@android:style/Animation.Activity">
        <item name="android:activityOpenEnterAnimation">@anim/slide_in_right</item>
        <item name="android:activityOpenExitAnimation">@anim/slide_out_left</item>
        <item name="android:activityCloseEnterAnimation">@anim/slide_in_left</item>
        <item name="android:activityCloseExitAnimation">@anim/slide_out_right</item>
    </style>
```

Then apply it to the theme as follows:

```xml
    <!-- Base application theme. -->
    <style name="AppTheme" parent="Theme.AppCompat.Light.DarkActionBar">
        <!-- Customize your theme here. -->
        <item name="colorPrimary">@color/colorPrimary</item>
        <item name="colorPrimaryDark">@color/colorPrimaryDark</item>
        <item name="colorAccent">@color/colorAccent</item>
        <item name="android:windowAnimationStyle">@style/CustomActivityAnimation</item>
    </style>
```

Here's the full styles.xml:

```xml
<resources>

    <!-- Base application theme. -->
    <style name="AppTheme" parent="Theme.AppCompat.Light.DarkActionBar">
        <!-- Customize your theme here. -->
        <item name="colorPrimary">@color/colorPrimary</item>
        <item name="colorPrimaryDark">@color/colorPrimaryDark</item>
        <item name="colorAccent">@color/colorAccent</item>
        <item name="android:windowAnimationStyle">@style/CustomActivityAnimation</item>
    </style>

    <style name="CustomActivityAnimation" parent="@android:style/Animation.Activity">
        <item name="android:activityOpenEnterAnimation">@anim/slide_in_right</item>
        <item name="android:activityOpenExitAnimation">@anim/slide_out_left</item>
        <item name="android:activityCloseEnterAnimation">@anim/slide_in_left</item>
        <item name="android:activityCloseExitAnimation">@anim/slide_out_right</item>
    </style>

</resources>
```

### Step 4: Activities

We will have three activities:

1. ActivityA
2. ActivityB
3. ActivityC

**ActivityA.kt**

```kotlin
package info.camposha.activity_transitions

import android.content.Intent
import android.os.Bundle
import android.view.View
import androidx.appcompat.app.AppCompatActivity

class ActivityA : AppCompatActivity() {
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_a)
    }

    fun intentB(view: View?) {
        startActivity(Intent(this, ActivityB::class.java))
    }

    fun intentC(view: View?) {
        startActivity(Intent(this, ActivityC::class.java))
    }
}
```

**ActivityB**

```kotlin
package info.camposha.activity_transitions

import android.content.Intent
import android.os.Bundle
import android.view.View
import androidx.appcompat.app.AppCompatActivity

class ActivityB : AppCompatActivity() {
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_b)
    }

    fun intentC(view: View?) {
        startActivity(Intent(this, ActivityC::class.java))
    }

    fun intentA(view: View?) {
        startActivity(Intent(this, ActivityA::class.java))
    }
}
```

**ActivityC**

```kotlin
package info.camposha.activity_transitions

import android.content.Intent
import android.os.Bundle
import android.view.View
import androidx.appcompat.app.AppCompatActivity

class ActivityC : AppCompatActivity() {
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_c)
    }

    fun intentA(view: View?) {
        startActivity(Intent(this, ActivityA::class.java))
    }

    fun intentB(view: View?) {
        startActivity(Intent(this, ActivityB::class.java))
    }
}
```

That's all the kotlin code we write.

### Step 5: Layouts

Find the layout codes in the source code download.

### Step 6: Run

Run the project and you will get the following:

![Activity Transitions Example](https://github.com/Oclemy/ActivityTransitions/raw/master/MsActivityTransition.gif)

### Step 7: Download

Download the source code from [here](https://github.com/Oclemy/ActivityTransitions/archive/refs/heads/master.zip).

## Example 2: Kotlin Android Enter Exit Transition Animation

This is also another simple Transition Animation example written in Kotlin. We cover two animations: enter and exit.

Let's start.

### Step 1: Create Project

Start by creating an empty `Android Studio` project.

### Step 2: Dependencies

No special or third party dependencies are needed for this project.

### Step 3: Create Animations

In your `res` directory create a folder known as `anim` and inside it add our enter and exit animations as follows:

**(a). /res/anim/enter_activity.xml**

Add the following code:

```xml
<set android:shareInterpolator="false"
    xmlns:android="http://schemas.android.com/apk/res/android">
    <scale
        android:interpolator="@android:anim/accelerate_decelerate_interpolator"
        android:fromXScale="0.0"
        android:toXScale="1.0"
        android:fromYScale="0.0"
        android:toYScale="1.0"
        android:pivotX="50%"
        android:pivotY="50%"
        android:fillAfter="false"
        android:duration="2000" />
</set>
```

**(b). /res/anim/exit_activity.xml**

Add the following code:

```xml
<set android:shareInterpolator="false"
    xmlns:android="http://schemas.android.com/apk/res/android">
    <scale
        android:interpolator="@android:anim/accelerate_decelerate_interpolator"
        android:fromXScale="1.0"
        android:toXScale="0.0"
        android:fromYScale="1.0"
        android:toYScale="0.0"
        android:pivotX="50%"
        android:pivotY="50%"
        android:fillAfter="false"
        android:duration="2000" />
</set>
```

### Step 4: Apply Animations

You need to apply the animations to your theme. Go to your `styles.xml` and apply them as follows:

First create the folo

**styles.xml**

```xml
<resources>

    <!-- Base application theme. -->
    <style name="AppTheme" parent="Theme.AppCompat.Light.DarkActionBar">
        <!-- Customize your theme here. -->
        <item name="colorPrimary">@color/colorPrimary</item>
        <item name="colorPrimaryDark">@color/colorPrimaryDark</item>
        <item name="colorAccent">@color/colorAccent</item>
        <item name="android:windowAnimationStyle">@style/WindowAnimations</item>
    </style>

    <style name="WindowAnimations">
        <item name="android:activityOpenEnterAnimation">@anim/enter_activity</item>
        <item name="android:activityOpenExitAnimation">@anim/exit_activity</item>
        <item name="android:activityCloseEnterAnimation">@anim/enter_activity</item>
        <item name="android:activityCloseExitAnimation">@anim/exit_activity</item>
    </style>

</resources>
```

### Step 5: Layouts

We will have two layouts for our two activities:

**(a). activity_main.xml**

```xml
<?xml version="1.0" encoding="utf-8"?>
<androidx.constraintlayout.widget.ConstraintLayout xmlns:android="http://schemas.android.com/apk/res/android"
    xmlns:app="http://schemas.android.com/apk/res-auto"
    xmlns:tools="http://schemas.android.com/tools"
    android:layout_width="match_parent"
    android:layout_height="match_parent"
    tools:context=".MainActivity">

    <TextView
        android:id="@+id/my_text"
        android:layout_width="wrap_content"
        android:layout_height="wrap_content"
        android:text="Hello World!"
        app:layout_constraintBottom_toBottomOf="parent"
        app:layout_constraintLeft_toLeftOf="parent"
        app:layout_constraintRight_toRightOf="parent"
        app:layout_constraintTop_toTopOf="parent" />

</androidx.constraintlayout.widget.ConstraintLayout>
```

**(b). activity_main2.xml**

```xml
<?xml version="1.0" encoding="utf-8"?>
<androidx.constraintlayout.widget.ConstraintLayout xmlns:android="http://schemas.android.com/apk/res/android"
    xmlns:app="http://schemas.android.com/apk/res-auto"
    xmlns:tools="http://schemas.android.com/tools"
    android:layout_width="match_parent"
    android:layout_height="match_parent"
    android:background="#AAAAFF"
    tools:context=".Main2Activity">

</androidx.constraintlayout.widget.ConstraintLayout>
```

### Step 6: Create Two Activities

Here are two activities:

**(a). Main2Activity.kt**

```kotlin
import android.os.Bundle
import androidx.appcompat.app.AppCompatActivity

class Main2Activity : AppCompatActivity() {

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_main2)
    }

    override fun finish() {
        super.finish()
    }
}
```

**(b). MainActivity.kt**

```kotlin
import android.content.Intent
import androidx.appcompat.app.AppCompatActivity
import android.os.Bundle
import android.view.animation.AnimationUtils
import android.widget.ImageView
import android.widget.TextView
import kotlinx.android.synthetic.main.activity_main.*

class MainActivity : AppCompatActivity() {

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_main)

        my_text.setOnClickListener {
            val intent = Intent(this, Main2Activity::class.java)
            startActivity(intent)
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
| 1. | [Download](https://github.com/elye/demo_android_activity_transtion_animation/archive/refs/heads/master.zip) Example |
| 2. | [Follow](https://github.com/elye/) code author |

## Examples 3: Kotlin Android Apply Transition Animations Programmatically

This is the third activity transition example using intents and without any third party library. This time round we apply our transition animations programmatically via the `overridePendingTransition()` function, as opposed to declaring the transitions in an `style.xml` resource file.

### Step 1: Create Project

Start by creating an empty `Android Studio` project.

### Step 2: Dependencies

No external dependencies are needed.

### Step 3: Create Animations

Start by creating a folder known as `anim` inside the `res` directory of your app. Then create the following animations inside that `anim` folder:

**(a). slide_in_left.xml**

```xml
<?xml version="1.0" encoding="utf-8"?>
<set xmlns:android="http://schemas.android.com/apk/res/android">

    <translate
        android:duration="@android:integer/config_mediumAnimTime"
        android:fromXDelta="-100%p"
        android:toXDelta="0"/>

</set>
```

**(b). slide_in_right.xml**

```xml
<?xml version="1.0" encoding="utf-8"?>
<set xmlns:android="http://schemas.android.com/apk/res/android">

    <translate
        android:duration="@android:integer/config_mediumAnimTime"
        android:fromXDelta="100%p"
        android:toXDelta="0"/>

</set>
```

**(c). slide_out_left.xml**

```xml
<?xml version="1.0" encoding="utf-8"?>
<set xmlns:android="http://schemas.android.com/apk/res/android">

    <translate
        android:duration="@android:integer/config_mediumAnimTime"
        android:fromXDelta="0"
        android:toXDelta="-100%p"/>

</set>
```

**(d). slide_out_right.xml**

```xml
<?xml version="1.0" encoding="utf-8"?>
<set xmlns:android="http://schemas.android.com/apk/res/android">

    <translate
        android:duration="@android:integer/config_mediumAnimTime"
        android:fromXDelta="0"
        android:toXDelta="100%p"/>

</set>
```

### Step 4: Design Layouts

Now design the layouts for our two activities:

**(a). activity_right.xml**

Add a button that will take us to the previous activity with transitions applied:

```xml
<?xml version="1.0" encoding="utf-8"?>
<androidx.constraintlayout.widget.ConstraintLayout xmlns:android="http://schemas.android.com/apk/res/android"
    xmlns:app="http://schemas.android.com/apk/res-auto"
    xmlns:tools="http://schemas.android.com/tools"
    android:layout_width="match_parent"
    android:layout_height="match_parent"
    tools:context=".Right_Activity">

    <Button
        android:id="@+id/btn_left"
        android:layout_width="wrap_content"
        android:layout_height="wrap_content"
        app:layout_constraintStart_toStartOf="parent"
        app:layout_constraintEnd_toEndOf="parent"
        app:layout_constraintTop_toTopOf="parent"
        app:layout_constraintBottom_toBottomOf="parent"
        android:text="left"
        android:background="@color/colorPrimary"
        android:textColor="@android:color/white"/>

</androidx.constraintlayout.widget.ConstraintLayout>
```

**(b). activity_main.xml**

Add a button that will take us to the next activity:

```xml
<?xml version="1.0" encoding="utf-8"?>
<androidx.constraintlayout.widget.ConstraintLayout xmlns:android="http://schemas.android.com/apk/res/android"
    xmlns:app="http://schemas.android.com/apk/res-auto"
    xmlns:tools="http://schemas.android.com/tools"
    android:layout_width="match_parent"
    android:layout_height="match_parent"
    tools:context=".MainActivity">

    <Button
        android:id="@+id/btn_right"
        android:layout_width="wrap_content"
        android:layout_height="wrap_content"
        app:layout_constraintStart_toStartOf="parent"
        app:layout_constraintEnd_toEndOf="parent"
        app:layout_constraintTop_toTopOf="parent"
        app:layout_constraintBottom_toBottomOf="parent"
        android:text="Right"
        android:background="@color/colorPrimary"
        android:textColor="@android:color/white"/>

</androidx.constraintlayout.widget.ConstraintLayout>
```

### Step 5: Create Activities

We have two activities. Transition animations will be applied when we move to either activities. We will apply transitions using the `overridePendingTransition()` function.

**(a). Right_Activity.kt**

Here is the full code:

```kotlin
import android.content.Intent
import androidx.appcompat.app.AppCompatActivity
import android.os.Bundle
import kotlinx.android.synthetic.main.activity_right_.*

class Right_Activity : AppCompatActivity() {

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_right_)

        btn_left.setOnClickListener {
            startActivity(Intent(this,MainActivity::class.java))
            overridePendingTransition(R.anim.slide_in_left,R.anim.slide_out_right)
        }
    }
}
```

**(b). MainActivity.kt**

Start the activity using the `startActivity()` function then apply transitions using `overridePendingTransition()` function:

```kotlin
package com.example.intentanimationusingkotlin

import android.content.Intent
import androidx.appcompat.app.AppCompatActivity
import android.os.Bundle
import kotlinx.android.synthetic.main.activity_main.*

class MainActivity : AppCompatActivity() {

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_main)

        btn_right.setOnClickListener {
            startActivity(Intent(this,Right_Activity::class.java))
            overridePendingTransition(R.anim.slide_in_right, R.anim.slide_out_left)
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
| 1. | [Download](https://github.com/Kiran-Bahalaskar/Intent-Animation-Using-Kotlin/archive/refs/heads/master.zip) Example |
| 2. | [Follow](https://github.com/Kiran-Bahalaskar/) code author |
| 3. | Code: [Apache 2.0 License](http://www.apache.org/licenses/LICENSE-2.0.txt) |

# Examples with Libraries

To make you app more modern, you can include transition animations between activities. There are different ways this can be done and in this piece we want to examine them.

### (a). Use Intent Animation Library

This library is as easy as it gets. You can easily include different type of animations in your activities.

### Step 1: Installation

Start by install the library. It is hosted in jitpack:

```groovy
allprojects {
    repositories {
        ...
        maven { url 'https://jitpack.io' }
    }
}
```

Then add the implementation statement as a dependency:

```groovy
implementation 'com.github.hajiyevelnur92:intentanimation:1.0'
```

### Step 2: Code

Here is the code:

```java
import static maes.tech.intentanim.CustomIntent.customType;
//MainActivity or any activity name
protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);
        //.....//

        //here is library
        customType(MainActivity.this,"here is animation name");
}
   //Here are the animations
*left-to-right
*right-to-left
*bottom-to-up
*up-to-bottom
*fadein-to-fadeout
*rotateout-to-rotatein
```

### Links

Download the full code [here](https://github.com/hajiyevelnur92/intentanimation).

## (b). Transitions with Bungee

> Bungee is a Lightweight Android library for cool activity transition animations.

This solution supports a minimum SDK of 16 (Android Jellybean 4.1).

Bungee has 15 different activity transition animations:

- split
- shrink
- card
- in and out
- swipe left
- swipe right
- slide up
- slide down
- slide left
- slide right
- zoom
- fade
- spin
- diagonal
- windmill

You can download the demo app [here](https://play.google.com/store/apps/details?id=com.spencerstudios.bungeelibrarydemo) to check it in action.

### Step 1: Install it

To install it start by registering jitpack as a maven repositort url in your project folder's build.gradle:

```groovy
allprojects {
        repositories {
            ...
            maven { url 'https://jitpack.io' }
        }
    }
```

Then in your app folder's build.gradle declare the dependency as an implementation statement:

```groovy
dependencies {
            implementation 'com.github.Binary-Finery:Bungee:3.0'
    }
```

### Step 2: Write Code

Only one line code is needed to use Bungee. For example in this case a zoom animation is fired:

```java
startActivity(new Intent(context, TargetActivity.class));
Bungee.zoom(context);  //fire the zoom animation
```

Or let;s say you want to fire the animation when the back button is pressed:

```java
@Override
public void onBackPressed(){
  super.onBackPressed();
  Bungee.slideLeft(context); //fire the slide left animation
}
```

Here are all the available methods:

```java
Bungee.split(context);
Bungee.shrink(content);
Bungee.card(context);
Bungee.inAndOut(context);
Bungee.swipeLeft(context);
Bungee.swiperRight(context);
Bungee.slideLeft(context);
Bungee.slideRight(context);
Bungee.slideDown(context);
Bungee.slideUp(context);
Bungee.fade(context);
Bungee.zoom(context);
Bungee.windmill(context);
Bungee.diagonal(context);
Bungee.spin(context);
```

### Run

Run the project.

### Reference

Here are the reference links:

| No. | Link |
| --- | --- |
| 1. | [Read](https://github.com/Binary-Finery/Bungee/) more |
| 2. | [Follow](https://github.com/Binary-Finery) code author |
