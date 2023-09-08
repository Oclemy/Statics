# Toasty

>  The usual Toast, but with steroids.

### Toasty

![Toast Library Tutorial](https://camo.githubusercontent.com/812ce4294ad3d4fe075cf949f86b6fd889cd59637a521d23c71324e13f455906/68747470733a2f2f696d672e736869656c64732e696f2f62616467652f4150492d31342532422d627269676874677265656e2e7376673f7374796c653d666c6174)

![Toast Library Tutorial](https://camo.githubusercontent.com/66f9ec213e1db18d2ae7113cd5c1640d98fac64305346e4e67d8d76111dad90d/68747470733a2f2f6a69747061636b2e696f2f762f4772656e646572472f546f617374792e737667)

The usual Toast, but with steroids.

### Step 1: Declare Jitpack

Add this in your root ``build.gradle`` file (not your module ``build.gradle`` file):

```groovy
allprojects {
	repositories {
		...
		maven { url "https://jitpack.io" }
	}
}
```


### Step 2: Add Dependency

Add this to your module's `build.gradle` file (make sure the version matches the JitPack badge above):

```groovy
dependencies {
	...
	implementation 'com.github.GrenderG:Toasty:1.5.2'
}
```


### Step 3: Configuration

This step is optional, but if you want you can configure some Toasty parameters. Place this anywhere in your app:

```java
Toasty.Config.getInstance()
    .tintIcon(boolean tintIcon) // optional (apply textColor also to the icon)
    .setToastTypeface(@NonNull Typeface typeface) // optional
    .setTextSize(int sizeInSp) // optional
    .allowQueue(boolean allowQueue) // optional (prevents several Toastys from queuing)
    .setGravity(int gravity, int xOffset, int yOffset) // optional (set toast gravity, offsets are optional)
    .supportDarkTheme(boolean supportDarkTheme) // optional (whether to support dark theme or not)
    .setRTL(boolean isRTL) // optional (icon is on the right)
    .apply(); // required
```

You can reset the configuration by using `reset()` method:

```java
Toasty.Config.reset();
```


### Step 4: Usage

Each method always returns a `Toast` object, so you can customize the `Toast` much more. DON'T FORGET THE show() METHOD!
`show()`
To display an error `Toast`:

```java
Toasty.error(yourContext, "This is an error toast.", Toast.LENGTH_SHORT, true).show();
```

To display a success `Toast`:

```java
Toasty.success(yourContext, "Success!", Toast.LENGTH_SHORT, true).show();
```

To display an info `Toast`:

```java
Toasty.info(yourContext, "Here is some info for you.", Toast.LENGTH_SHORT, true).show();
```

To display a warning `Toast`:

```java
Toasty.warning(yourContext, "Beware of the dog.", Toast.LENGTH_SHORT, true).show();
```

To display the usual `Toast`:

```java
Toasty.normal(yourContext, "Normal toast w/o icon").show();
```

To display the usual `Toast` with icon:

```java
Toasty.normal(yourContext, "Normal toast w/ icon", yourIconDrawable).show();
```

You can also create your custom `Toasts` with the `custom()` method:

```java
Toasty.custom(yourContext, "I'm a custom Toast", yourIconDrawable, tintColor, duration, withIcon, 
shouldTint).show();
```

### Screenshots

Please click the image below to enlarge.
![Toast Library Tutorial](https://raw.githubusercontent.com/GrenderG/Toasty/master/art/collage.png)

### Full Example

Awaiting below is a full android sample to demonstrate this `Toast` Library concept.

<!--more-->

#### Step 1. Write Code

Finally we need to write our code as follows:


**(a). MainActivity.java**

> Our `MainActivity` class.

First Create a java file named `MainActivity.java`.

Then we will be creating the following methods:

1. `getFormattedMessage()` - It will return `CharSequence` object.

Here is the code showing how to use `Toasty`:

```java
package replace_with_your_package_name;

import android.graphics.Typeface;
import android.graphics.drawable.Drawable;
import android.os.Bundle;
import androidx.appcompat.app.AppCompatActivity;
import android.text.Spannable;
import android.text.SpannableStringBuilder;
import android.text.style.StyleSpan;
import android.view.View;

import es.dmoral.toasty.Toasty;

import static android.graphics.Typeface.BOLD_ITALIC;

public class MainActivity extends AppCompatActivity {
    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);

        findViewById(R.id.button_error_toast).setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View view) {
                Toasty.error(MainActivity.this, R.string.error_message, Toasty.LENGTH_SHORT, true).show();
            }
        });
        findViewById(R.id.button_success_toast).setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View view) {
                Toasty.success(MainActivity.this, R.string.success_message, Toasty.LENGTH_SHORT, true).show();
            }
        });
        findViewById(R.id.button_info_toast).setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View view) {
                Toasty.info(MainActivity.this, R.string.info_message, Toasty.LENGTH_SHORT, true).show();
            }
        });
        findViewById(R.id.button_warning_toast).setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View view) {
                Toasty.warning(MainActivity.this, R.string.warning_message, Toasty.LENGTH_SHORT, true).show();
            }
        });
        findViewById(R.id.button_normal_toast_wo_icon).setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View view) {
                Toasty.normal(MainActivity.this, R.string.normal_message_without_icon).show();
            }
        });
        findViewById(R.id.button_normal_toast_w_icon).setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View view) {
                Drawable icon = getResources().getDrawable(R.drawable.ic_pets_white_48dp);
                Toasty.normal(MainActivity.this, R.string.normal_message_with_icon, icon).show();
            }
        });
        findViewById(R.id.button_info_toast_with_formatting).setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View view) {
                Toasty.info(MainActivity.this, getFormattedMessage()).show();
            }
        });
        findViewById(R.id.button_custom_config).setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View view) {
                Toasty.Config.getInstance()
                        .setToastTypeface(Typeface.createFromAsset(getAssets(), "PCap Terminal.otf"))
                        .allowQueue(false)
                        .apply();
                Toasty.custom(MainActivity.this, R.string.custom_message, getResources().getDrawable(R.drawable.laptop512),
                        android.R.color.black, android.R.color.holo_green_light, Toasty.LENGTH_SHORT, true, true).show();
                Toasty.Config.reset(); // Use this if you want to use the configuration above only once
            }
        });
    }

    private CharSequence getFormattedMessage() {
        final String prefix = "Formatted ";
        final String highlight = "bold italic";
        final String suffix = " text";
        SpannableStringBuilder ssb = new SpannableStringBuilder(prefix).append(highlight).append(suffix);
        int prefixLen = prefix.length();
        ssb.setSpan(new StyleSpan(BOLD_ITALIC),
                prefixLen, prefixLen + highlight.length(), Spannable.SPAN_EXCLUSIVE_EXCLUSIVE);
        return ssb;
    }
}


```
#### Step 2. Design Layouts

In Android we design our UI interfaces using XML. So let's create the following layouts:


**(a). activity_main.xml**


> Our `activity_main` layout.

To start inside your `/res/layout/` directory create an xml layout file named `activity_main.xml`.

Subsequently design your XML layout using the following 3 UI widgets and ViewGroups:

1. `ScrollView`
2. `RelativeLayout`
3. `Button`

```xml
<?xml version="1.0" encoding="utf-8"?>
<ScrollView xmlns:android="http://schemas.android.com/apk/res/android"
    xmlns:tools="http://schemas.android.com/tools"
    android:id="@+id/activity_main"
    android:layout_width="match_parent"
    android:layout_height="match_parent"
    tools:context="es.dmoral.toastysample.MainActivity">

    <RelativeLayout
        android:layout_width="match_parent"
        android:layout_height="wrap_content"
        android:paddingBottom="@dimen/activity_vertical_margin"
        android:paddingLeft="@dimen/activity_horizontal_margin"
        android:paddingRight="@dimen/activity_horizontal_margin"
        android:paddingTop="@dimen/activity_vertical_margin">

        <Button
            android:text="@string/error_toast"
            android:layout_width="wrap_content"
            android:layout_height="wrap_content"
            android:layout_alignParentTop="true"
            android:layout_alignParentLeft="true"
            android:layout_alignParentStart="true"
            android:id="@+id/button_error_toast"
            android:layout_alignParentRight="true"
            android:layout_alignParentEnd="true" />

        <Button
            android:text="@string/success_toast"
            android:layout_width="wrap_content"
            android:layout_height="wrap_content"
            android:layout_below="@+id/button_error_toast"
            android:layout_alignParentLeft="true"
            android:layout_alignParentStart="true"
            android:id="@+id/button_success_toast"
            android:layout_alignParentRight="true"
            android:layout_alignParentEnd="true" />

        <Button
            android:text="@string/info_toast"
            android:layout_width="wrap_content"
            android:layout_height="wrap_content"
            android:layout_below="@+id/button_success_toast"
            android:layout_alignParentLeft="true"
            android:layout_alignParentStart="true"
            android:id="@+id/button_info_toast"
            android:layout_alignParentRight="true"
            android:layout_alignParentEnd="true" />

        <Button
            android:text="@string/info_toast_with_formatting"
            android:layout_width="wrap_content"
            android:layout_height="wrap_content"
            android:layout_below="@id/button_info_toast"
            android:layout_alignParentLeft="true"
            android:layout_alignParentStart="true"
            android:id="@+id/button_info_toast_with_formatting"
            android:layout_alignParentRight="true"
            android:layout_alignParentEnd="true" />

        <Button
            android:text="@string/warning_toast"
            android:layout_width="wrap_content"
            android:layout_height="wrap_content"
            android:layout_below="@+id/button_info_toast_with_formatting"
            android:layout_alignParentLeft="true"
            android:layout_alignParentStart="true"
            android:layout_alignParentRight="true"
            android:layout_alignParentEnd="true"
            android:id="@+id/button_warning_toast" />

        <Button
            android:text="@string/normal_toast_without_icon"
            android:layout_width="wrap_content"
            android:layout_height="wrap_content"
            android:layout_below="@+id/button_warning_toast"
            android:layout_alignParentLeft="true"
            android:layout_alignParentStart="true"
            android:id="@+id/button_normal_toast_wo_icon"
            android:layout_alignParentRight="true"
            android:layout_alignParentEnd="true" />

        <Button
            android:text="@string/normal_toast_with_icon"
            android:layout_width="wrap_content"
            android:layout_height="wrap_content"
            android:layout_below="@+id/button_normal_toast_wo_icon"
            android:layout_alignParentLeft="true"
            android:layout_alignParentStart="true"
            android:id="@+id/button_normal_toast_w_icon"
            android:layout_alignParentRight="true"
            android:layout_alignParentEnd="true" />

        <Button
            android:text="@string/custom_configuration"
            android:layout_width="wrap_content"
            android:layout_height="wrap_content"
            android:layout_below="@+id/button_normal_toast_w_icon"
            android:layout_alignParentLeft="true"
            android:layout_alignParentStart="true"
            android:id="@+id/button_custom_config"
            android:layout_alignParentRight="true"
            android:layout_alignParentEnd="true" />

    </RelativeLayout>
</ScrollView>

```

### Reference

Download the code below:

|No.|Link|
|--|---|
|1.|[Download Full Code](https://github.com/GrenderG/Toasty/archive/refs/heads/master.zip)|
|2.|Read more [here](https://github.com/GrenderG/Toasty).|
|3.|Follow code author [here](https://github.com/GrenderG).|
