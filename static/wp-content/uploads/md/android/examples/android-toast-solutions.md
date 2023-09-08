# Toast Examples and Best Libraries


> Android Toast Tutorial, Examples and Best Open source Third party libaries.

This is an android tutorial about the Toast class, how to use it to show short messages and various libraries that allow us to customize or create new unique Toasts.

A toast provides simple feedback about an operation in a small popup.

It only fills the amount of space required for the message and the current activity remains visible and interactive. Toasts automatically disappear after a timeout.


#### Alternatives

You can also use SnackBar. We have several examples of Snackbar [here](https://camposha.info/android-examples/android-snackbar/)

#### What is Toast?

> A toast is a view containing a quick little message for the user. The toast class helps you create and show those.

As a class the `Toast` class resides in the `android.widget` package like many other framework user interface components.

It does derive from the `java.lang.Object` class and was added in API level 1.

#### Why Toast?

Toasts are important because we normally need a way to show notifications to our users. Notifications simply allow us to notify users of certain situations in the application.

For example suppose the user wants to connect to some form of webservice, but there is no connectivity, how do you handle such a sitiation. Well there are several ways to do it. You would show a dialog. However that certainly seems an overkill to host a full dialog window just for such a simple message.

Another way would be to show it in a TextView or an edittext. Still this seems an overkill since you would have to accomodate these components in your user interface plan. Yet the notification you are going to show is just a one time thing and is unpredictable.

Toasts on the hand are simple and we create them in only a single line of code. Moreover we don't need to accommodate them in our user interface design. We just flash them with our message for a few seconds and that's it.

#### How Toasts Appear.

Toasts appear as simple views that float over the application. Thus they don't interfere in any way in your layout design. They don't even receive focus hence they are non-obstructive. This is intentional.

Not only do our individual apps use the Toast class but the android system applications use them interactively. For instance,if we change the volume of the device speakers, we receive Toast notifications. If we send or receive USSD messages to and from our SIM providers, these get shown in Toast messages.

## Example 1: Kotlin Android Toast Example - Show and Customize

This is a simple example which demonstrates how to show the default Toast , Toast at custom position and a Toast with a custom layout.

### Step 1: Create Project

Start by creating an empty AndroidStudio Project.

### Step 2: Dependencies

No special dependency is needed for this project.

### Step 3: Design Layouts

We need two layouts:

**(a). layout_toast.xml**

this is the layout that will be applied to our custom toast. Simply add an `AppCompatImageView` and `AppCompatTextView`:

```xml
<?xml version="1.0" encoding="utf-8"?>
<LinearLayout
        xmlns:android="http://schemas.android.com/apk/res/android" xmlns:app="http://schemas.android.com/apk/res-auto"
        xmlns:tools="http://schemas.android.com/tools"
        android:id="@+id/layout_custom_root"
        android:background="@android:color/holo_green_light"
        android:padding="8dp"
        android:gravity="center"
        android:orientation="vertical"
        android:layout_width="match_parent"
        android:layout_height="wrap_content">

    <androidx.appcompat.widget.AppCompatImageView
            app:srcCompat="@mipmap/ic_launcher"
            android:layout_width="wrap_content"
            android:layout_height="wrap_content"/>

    <androidx.appcompat.widget.AppCompatTextView
            android:textAppearance="@android:style/TextAppearance.DeviceDefault.Large"
            tools:text="Custom Layout"
            android:id="@+id/textView_toast"
            android:layout_marginTop="16dp"
            android:layout_width="wrap_content"
            android:layout_height="wrap_content"/>

</LinearLayout>
```

**(b). activity_main.xml**

This is the layout for the `MainActivity`. Add a couple of `AppCompatButton` objects:

```xml
<?xml version="1.0" encoding="utf-8"?>
<androidx.constraintlayout.widget.ConstraintLayout
        xmlns:android="http://schemas.android.com/apk/res/android"
        xmlns:tools="http://schemas.android.com/tools"
        xmlns:app="http://schemas.android.com/apk/res-auto"
        android:layout_width="match_parent"
        android:layout_height="match_parent"
        tools:context=".MainActivity">

    <androidx.appcompat.widget.AppCompatButton
            android:layout_width="wrap_content"
            android:layout_height="wrap_content"
            android:text="@string/button_toast_default"
            android:layout_marginTop="16dp"
            app:layout_constraintTop_toTopOf="parent"
            app:layout_constraintStart_toStartOf="parent"
            android:layout_marginLeft="16dp"
            android:layout_marginStart="16dp"
            android:id="@+id/appCompatButton_default_toast"/>

    <androidx.appcompat.widget.AppCompatButton
            android:id="@+id/appCompatButton_position"
            android:layout_width="wrap_content"
            android:layout_height="wrap_content"
            android:text="@string/button_toast_custom"
            android:layout_marginTop="8dp"
            app:layout_constraintStart_toStartOf="@+id/appCompatButton_default_toast"
            app:layout_constraintTop_toBottomOf="@+id/appCompatButton_default_toast"/>

    <androidx.appcompat.widget.AppCompatButton
            android:id="@+id/appCompatButton_layout"
            android:layout_width="wrap_content"
            android:layout_height="wrap_content"
            android:text="@string/button_toast_custom"
            android:layout_marginTop="8dp"
            app:layout_constraintStart_toStartOf="@+id/appCompatButton_position"
            app:layout_constraintTop_toBottomOf="@+id/appCompatButton_position"/>

</androidx.constraintlayout.widget.ConstraintLayout>
```

### Step 4: Write Code

Hereis how you show the default Toast:

```kotlin
            Toast.makeText(applicationContext, "Default Toast", Toast.LENGTH_LONG).show()
```

Here is how you show Toast at a custom position:

```kotlin
            val toast = Toast.makeText(applicationContext, "Toast at custom position ", Toast.LENGTH_LONG)
            toast.setGravity(Gravity.TOP or Gravity.RIGHT, 25, 75)
            toast.show()
```

Here is how you show Toast with a custom layout:

```kotlin
            val inflater = layoutInflater
            val layout = inflater.inflate(
                R.layout.layout_toast,
                findViewById<ViewGroup>(R.id.layout_custom_root)
            )
            val textView: TextView = layout.findViewById(R.id.textView_toast)
            textView.text = "This is a custom layout"
            with(Toast(applicationContext)) {
                duration = Toast.LENGTH_SHORT
                setGravity(Gravity.CENTER or Gravity.RIGHT, 25, 0)
                view = layout
                show()
            }
```

Here is the full code:

**MainActivity.kt**

```kotlin
package com.vpdevs.toastdemo

import android.os.Bundle
import android.view.Gravity
import android.view.ViewGroup
import android.widget.TextView
import android.widget.Toast
import androidx.appcompat.app.AppCompatActivity
import kotlinx.android.synthetic.main.activity_main.*

class MainActivity : AppCompatActivity() {

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_main)

        /*
        * launches the toast with default params
        * */
        appCompatButton_default_toast.setOnClickListener {
            Toast.makeText(applicationContext, "Default Toast", Toast.LENGTH_LONG).show()
        }

        /*
        * launches the toast with position
        * */
        appCompatButton_position.setOnClickListener {
            val toast = Toast.makeText(applicationContext, "Toast at custom position ", Toast.LENGTH_LONG)
            toast.setGravity(Gravity.TOP or Gravity.RIGHT, 25, 75)
            toast.show()
        }

        /*
        * launches the toast with custom layout
        * */
        appCompatButton_layout.setOnClickListener {
            /*val container : ViewGroup= findViewById(R.id.layout_custom_root)
            val layout : ViewGroup = layoutInflater.inflate(R.layout.layout_toast , container)*/
            val inflater = layoutInflater
            val layout = inflater.inflate(
                R.layout.layout_toast,
                findViewById<ViewGroup>(R.id.layout_custom_root)
            )
            val textView: TextView = layout.findViewById(R.id.textView_toast)
            textView.text = "This is a custom layout"
            with(Toast(applicationContext)) {
                duration = Toast.LENGTH_SHORT
                setGravity(Gravity.CENTER or Gravity.RIGHT, 25, 0)
                view = layout
                show()
            }
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
| 1. | [Download](https://github.com/vprabhu/ToastDemo/archive/refs/heads/master.zip) Example |
| 2. | [Follow](https://github.com/vprabhu/) code author |

## More Examples

#### Toast Example

Here is an example of how to show Toast messages in application in Java.

```java

import android.content.Context;
import android.os.Handler;
import android.os.Looper;
import android.widget.Toast;
import java.util.Timer;
import java.util.TimerTask;

public class ToastUtils {

    public static void showShortToast(final String msg,final Context context) {
        new Handler(Looper.getMainLooper()).post(new Runnable() {
            @Override
            public void run() {
                Toast.makeText(context, msg, Toast.LENGTH_SHORT).show();
            }
        });
    }

    public static void showShortToast(final Context context, final String msg) {
        new Handler(Looper.getMainLooper()).post(new Runnable() {
            @Override
            public void run() {
                Toast.makeText(context, msg, Toast.LENGTH_SHORT).show();
            }
        });
    }

    public static void showLongToast(final String msg,final Context context) {
        new Handler(Looper.getMainLooper())
                .post(new Runnable() {
                    @Override
                    public void run() {
                        Toast.makeText(context, msg, Toast.LENGTH_LONG).show();
                    }
                });
    }

    public static void showToast(String msg, int duration,final Context context) {
        final Timer timer = new Timer();
        final Toast toast = Toast.makeText(context, msg, Toast.LENGTH_LONG);
        timer.schedule(new TimerTask() {
            @Override
            public void run() {
                toast.show();
            }
        }, 0, 1000);

        new Timer().schedule(new TimerTask() {
            @Override
            public void run() {
                toast.cancel();
                timer.cancel();
            }
        }, duration);

    }

}
```

Let's now explore some of the best Toast libaries you can use to achieve more exciting Toast dialogs.

### (a). StyleableToast

_[StyleableToast](https://github.com/Muddz/StyleableToast) is an Android library that takes the standard toast to the next level with many styling options._

This library allows you to style your toasts either by code or with a style in `styles.xml`.

![StyleableToast](https://github.com/Muddz/StyleableToast/raw/master/cases.png)

#### Installation

In your app level build.gradle add:

```groovy
dependencies {
    implementation 'com.muddzdev:styleabletoast:2.2.3'
}
```

Theer are two ways

**1\. Using Styles**

Go to your styles.xml and add:

```xml
    <style name="mytoast">
        <item name="stTextBold">true</item>
        <item name="stTextColor">#fff</item>
        <item name="stFont">@font/retrofont</item>
        <item name="stTextSize">14sp</item>
        <item name="stColorBackground">#fff</item>
        <item name="stSolidBackground">true</item>
        <item name="stStrokeWidth">3dp</item>
        <item name="stStrokeColor">#fff</item>
        <item name="stIconStart">@drawable/ic</item>
        <item name="stIconEnd">@drawable/ic</item>
        <item name="stLength">LONG</item> LONG or SHORT
        <item name="stGravity">top</item> top or center
        <item name="stRadius">5dp</item>
    </style>
```

Then in your code:

```java
 StyleableToast.makeText(context, "Hello World!", Toast.LENGTH_LONG, R.style.mytoast).show();
```

**2\. Via Builder Pattern**

In your code:

```java
        new StyleableToast
                .Builder(context)
                .text("Hello world!")
                .textColor(Color.WHITE)
                .backgroundColor(Color.BLUE)
                .show();
```

[Here](https://github.com/Muddz/StyleableToast/blob/master/demo/src/main/java/com/muddzdev/styleabletoast/demo/MainActivity.java) is an example code.

### (b). FancyToast-Android

_[FancyToast-Android](https://github.com/Shashank02051997/FancyToast-Android) is a library that allows you to style your Toasts from code_.

Through it you make your native android Toasts Fancy.

![FancyToast-Android](https://raw.githubusercontent.com/Shashank02051997/FancyToast-Android/master/fancytoastcollage.png)

Start by registering the following maven repository in your root level build.gradle:

```groovy
allprojects {
    repositories {
        ...
        maven { url "https://jitpack.io" }
    }
}
```

Then in you app level build.gradle add the following dependency:

```groovy
implementation 'com.github.Shashank02051997:FancyToast-Android:0.1.6'
```

Here are examples:

**1\. Default Toast**

```java
FancyToast.makeText(this,"Hello World !",FancyToast.LENGTH_LONG,FancyToast.DEFAULT,true);
```

**2\. Success Toast**

```java
FancyToast.makeText(this,"Hello World !",FancyToast.LENGTH_LONG,FancyToast.SUCCESS,true);
```

**3\. Error Toast**

```java
FancyToast.makeText(this,"Hello World !",FancyToast.LENGTH_LONG,FancyToast.ERROR,true);
```

**4\. Info Toast**

```java
FancyToast.makeText(this,"Hello World !",FancyToast.LENGTH_LONG,FancyToast.INFO,true);
```

**5\. Warning Toast**

```java
FancyToast.makeText(this,"Hello World !",FancyToast.LENGTH_LONG,FancyToast.WARNING,true);
```

**6\. Confusing Toast**

```java
FancyToast.makeText(this,"Hello World !",FancyToast.LENGTH_LONG,FancyToast.CONFUSING,true);
```

### (c). FB Toast

_[FBToast](https://github.com/NaimishTrivedi/FBToast) is a simple library allows you to create custom toast messages._

You use `FBToast.LENGTH_SHORT` or `FBToast.LENGTH_LONG`for toast displaying the toast with a short or long duration respectively.

To change the position of the Toast message on the screen use `Gravity.BOTTOM`, `Gravity.TOP`, `Gravity.LEFT` or `Gravity.RIGHT` .

#### Examples

**Native Toast**

```java
FBToast.nativeToast(MainActivity.this,"This is Native Toast",FBToast.LENGTH_SHORT);
```

**Success Toast**

```java
FBToast.successToast(MainActivity.this,"This is Success Toast",FBToast.LENGTH_SHORT);
```

![Toast Message](https://github.com/NaimishTrivedi/FBToast/raw/master/successtoast.png)

**Warning Toast**

```java
FBToast.warningToast(MainActivity.this,"This is Warning Toast",FBToast.LENGTH_SHORT);
```

**Error Toast**

```java
  FBToast.errorToast(MainActivity.this,"This is Error Toast",FBToast.LENGTH_SHORT);
```

![Error Toast](https://github.com/NaimishTrivedi/FBToast/raw/master/errortoast.png)

**Info Toast**

```java
FBToast.infoToast(MainActivity.this,"This is Info Toast",FBToast.LENGTH_SHORT);
```

![Info Toast](https://github.com/NaimishTrivedi/FBToast/raw/master/infotoast.png)

**Custom Toast**

```java
  FBCustomToast fbCustomToast = new FBCustomToast(MainActivity.this);
   fbCustomToast.setMsg("This is Custom Toast");
   fbCustomToast.setIcon(ContextCompat.getDrawable(MainActivity.this,R.drawable.ic_android_white_24dp));
   fbCustomToast.setBackgroundDrawable(ContextCompat.getDrawable(MainActivity.this,R.drawable.bg_gradient));
   fbCustomToast.setTypeface(Typeface.createFromAsset(getAssets(),"font/PoppinsBold.ttf"));
   fbCustomToast.show();
```

![Custom Toast](https://github.com/NaimishTrivedi/FBToast/raw/master/customtoast.png)

#### Installation

First go to your project level build.gradle and register the following maven repository:

```java
allprojects {
    repositories {
      maven { url 'https://jitpack.io' }
    }
}
```

Then in your app level build.gradle:

```java
dependencies {
  implementation 'com.github.NaimishTrivedi:FBToast:1.0'
}
```

#### Full Example

```java
import android.graphics.Typeface;
import android.os.Bundle;
import android.support.v4.content.ContextCompat;
import android.support.v7.app.AppCompatActivity;
import android.view.View;
import android.widget.Button;

import com.tfb.fbtoast.FBCustomToast;
import com.tfb.fbtoast.FBToast;

public class MainActivity extends AppCompatActivity {

    Button btnNativeClick,btnSuccessClick,btnInfoClick,btnWarningClick,btnErrorClick,btnCustomClick;
    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);
        btnNativeClick = findViewById(R.id.btnNativeClick);
        btnNativeClick.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                FBToast.nativeToast(MainActivity.this,"This is Native Toast",FBToast.LENGTH_SHORT);
            }
        });

        btnSuccessClick = findViewById(R.id.btnSuccessClick);
        btnSuccessClick.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                FBToast.successToast(MainActivity.this,"This is Success Toast",FBToast.LENGTH_SHORT);
            }
        });

        btnInfoClick = findViewById(R.id.btnInfoClick);
        btnInfoClick.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                FBToast.infoToast(MainActivity.this,"This is Info Toast",FBToast.LENGTH_SHORT);
            }
        });

        btnWarningClick = findViewById(R.id.btnWarningClick);
        btnWarningClick.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                FBToast.warningToast(MainActivity.this,"This is Warning Toast",FBToast.LENGTH_SHORT);
            }
        });

        btnErrorClick = findViewById(R.id.btnErrorClick);
        btnErrorClick.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                FBToast.errorToast(MainActivity.this,"This is Error Toast",FBToast.LENGTH_SHORT);
            }
        });

        btnCustomClick = findViewById(R.id.btnCustomClick);
        btnCustomClick.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                FBCustomToast fbCustomToast = new FBCustomToast(MainActivity.this);
                fbCustomToast.setMsg("This is Custom Toast");
                fbCustomToast.setIcon(ContextCompat.getDrawable(MainActivity.this,R.drawable.ic_android_white_24dp));
                fbCustomToast.setBackgroundDrawable(ContextCompat.getDrawable(MainActivity.this,R.drawable.bg_gradient));
                fbCustomToast.setTypeface(Typeface.createFromAsset(getAssets(),"font/PoppinsBold.ttf"));
                fbCustomToast.show();
            }
        });
    }
}
```

### (d). Toaster

Toaster is an android library for developing Toasts and Dialogs.

The library is written by Alexey Korolov and is available as an open source project under Apache License.

#### Uses of Toaster

Toaster has two main functions:

| No. | Use |
| --- | --- |
| 1. | To show Toasts. |
| 2. | To show Dialogs. |

#### Advantages of Toaster

These are some of the reasons to use Toaster:

| No. | Advantage |
| --- | --- |
| 1. | Ease of use |
| 2. | Simple and Customizable. |
| 3. | Allows us create Toast messages and Dialogs using one class |

#### Programmatic Definition

Toaster like all java classes is defined in a package:

```java
package net.alexandroid.utils.toaster;
```

As a class Toaster implements the `View.OnClicklistener` interface:

```java
public class Toaster implements View.OnClickListener {}
```

#### Toasts

Toasts normally display messages over a small duration of time before disappering automatically.

Here's an example of a Toast with Toaster:

```java
Toaster.showToast(MainActivity.this,"IC1011 is the largest Galaxy ever discovered");
```

#### How the Toast Works under the hood.

`Toaster` class defines two `showToast()` methods with various parameters . These two methods all require us to pass a Context object.

Internally that Context object will be used during the inflation of the layout to be displayed for your Toast.

Inflation is the process of converting an XML layout into a View object. This is done by an abstract class called **LayoutInflater**, that resides in the android.view package.

A layout is defined inside the Toaster library with a TextView inside a FrameLayout. That TextView is what is used to show our messages.

For animation Toaster uses **ObjectAnimator**, a final class defined in the android.animation package.

Apart from the Context object our showToast() method can take other parameters as listed below:

| Method | Parameters |
| --- | --- |
| showToast() | Context ctx; String msg; |
| showToast() | Context cts; String msg; int animationDuration; int visibleDuration; |

Those are the two methods used to show Toast message.

#### How Toasts's Showing and Automatic Disappering Works.

We all know that Toasts show for a small duration then automatically disappear. How does this work?

Well Toaster uses a class called ObjectAnimator for this. This class is basically an animation class.

ObjectAnimator derives from `android.animation.ValueAnimator`.

ObjectAnimator provides the capability to animate properties on target objects.

Toaster will start an animation for the specified duration.

It will will then raise a callback when the animation ends. When this happens we remove the view containing our message from a ContentFrameLayout where we had added it:

```java
 fadeOut.addListener(new AnimatorListenerAdapter() {
            @Override
            public void onAnimationEnd(Animator animation) {
                contentFrameLayout.removeView(layout);
            }
        });
```

#### Toaster Dialogs

Toaster allows us show dialogs as well.

Here's an example of showing a Dialog using Toaster:

```java
        Toaster toaster=new Toaster.Builder(this)
                .setTitle("Galaxies")
                .setText("The Largest Galaxy in The Universe is IC 1011")
                .setPositive("Got it")
                .setNegative("Cancel")
                .setAnimationDuration(300)
                .setCallBack(new Toaster.DialogCallback() {
                    @Override
                    public void onPositiveClick() {
                        Toaster.showToast(MainActivity.this,"OK Clicked");
                    }

                    @Override
                    public void onNegativeClick() {
                        Toaster.showToast(MainActivity.this,"Cancel Clicked");
                    }
                }).build();
        toaster.show();
```

#### How Toaster Dialogs Work under the Hood

Toaster class defines an inner static Builder class.

```java
public static class Builder {...}
```

Builder classes simplify our work when we need to invoke several methods from a single class.

Each method once, its been invoked and done its job, returns the instance of the class.

Thus this allows us to use that instance to further invoke another method, which also returns the instance and so forth.

Internally this Builder class first maintains a Toaster reference as a private field.Remember The Builder class resides in the Toaster class.

The Builder class has one constructor, a public one where the following take place:

| No. | Description |
| --- | --- |
| 1. | An activity reference is passed via as a parameter. |
| 2. | The Toaster reference gets instantiated here. |
| 3. | A WeakReference defined in the Toaster class is instantiated here, passing in the activity reference. |
| 4. | The dialog animation is set. |

The following Dialog manipulation methods are defined:

| No. | Method | Return Type | Description |
| --- | --- | --- | --- |
| 1. | setTitle(string title) | Builder | Sets dialog title and returns Builder instance |
| 2. | setText(string text) | Builder | Sets dialog text and returns Builder instance |
| 3. | setPositive(string positive) | Builder | Sets dialog's positive button text and returns Builder instance |
| 4. | setNegative(string negative) | Builder | Sets dialog's negative button text and returns Builder instance |
| 5. | setCallback(DialogCallback callback) | Builder | Sets dialog's callback and returns Builder instance |
| 6. | setCustomLayout(int customLayout) | Builder | Sets dialog's custom layout and returns Builder instance |
| 7. | setAnimationDuration(int animationDuration) | Builder | Sets dialog's animation duration and returns Builder instance |
| 8. | build() | Toaster | Builds the dialog and returns Toaster instance |

## **Dialog Callbacks**

Toaster dialogs provide two callbacks, onPositiveClick() and onNegativeClick().

These callbacks are defined in an interface called DialogCallback inside the Toaster class:

```java
    public interface DialogCallback {
        void onPositiveClick();

        void onNegativeClick();
    }
```

## **Showing and Hiding Dialogs**

Toaster defines two method for showing or hiding dialog:

| Method | Role |
| --- | --- |
| show() | Show Dialog |
| hide() | Hide Dialog |

## **What happens to dialog when Back button is pressed**

When a user presses the back button of the device, internally we determine whether the dialog is visible or not.

This is possible because of two reasons:

| No. | Reason |
| --- | --- |
| 1. | First we've overidden the onBackPresed() internally method in our Toaster class. |
| 2. | Our Toaster class maintains a static boolean data member. That variable gets set to true when a dialog is shown and false when the dialog is dismissed. We check it's value inside the onBackPresse() method and if hide the dialog if it's visible. |

Here are more libraries:

[loop type=example taxonomy=post_tag term=material-toast orderby=date order=asc]

## [loop-count]. [field title-link]

[content]

[Read Individually.]([field url])

[/loop]
