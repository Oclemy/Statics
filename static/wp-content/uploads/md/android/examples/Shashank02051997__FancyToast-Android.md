# FancyToast-Android

>  Make your native android `Toasts` Fancy.

A library that takes the standard Android toast to the next level with a variety of styling options. Style your toast from code..


![Toast Library Tutorial](https://camo.githubusercontent.com/c039350d4422d88ba5ded88cc084a880e36314d5e6b4ed863816ee4742ce111c/68747470733a2f2f696d672e736869656c64732e696f2f62616467652f4150492d31352532422d627269676874677265656e2e7376673f7374796c653d706c6173746963)



### Step 1: Declare Repository

Add this in your root `build.gradle` file (not your module `build.gradle` file):

```kotlin
allprojects {
	repositories {
		...
		mavenCentral()
	}
}
```


### Step 2: Add Dependency

This library is available on `MavenCentreal`
Add this to your module's `build.gradle` file (make sure the version matches the `Maven-Central` badge above):

```groovy
dependencies {
	...
	implementation 'io.github.shashank02051997:FancyToast:2.0.2'
}
```


### Step 3: Usage

Each method always returns a `Toast` object, so you can customize the `Toast` much more. DON'T FORGET THE show() METHOD!
`show()`
To display an default `Toast`:

```java
FancyToast.makeText(this,"Hello World !",FancyToast.LENGTH_LONG,FancyToast.DEFAULT,true);
```

To display a success `Toast`:

```java
FancyToast.makeText(this,"Hello World !",FancyToast.LENGTH_LONG,FancyToast.SUCCESS,true);
```

To display an info `Toast`:

```java
FancyToast.makeText(this,"Hello World !",FancyToast.LENGTH_LONG,FancyToast.INFO,true);
```

To display a warning `Toast`:

```java
FancyToast.makeText(this,"Hello World !",FancyToast.LENGTH_LONG,FancyToast.WARNING,true);
```

To display the error `Toast`:

```java
FancyToast.makeText(this,"Hello World !",FancyToast.LENGTH_LONG,FancyToast.ERROR,true);
```

To display the confusing `Toast`:

```java
FancyToast.makeText(this,"Hello World !",FancyToast.LENGTH_LONG,FancyToast.CONFUSING,true);
```

You can also remove the android icon on top-right corner by passing last parameter false.

```java
FancyToast.makeText(yourContext, "I'm a Toast", duration, type, boolean value).show();
```

You can also create your custom `Toasts` with passing your image with or without android icon(top-right corner):

```java
FancyToast.makeText(yourContext, "I'm a custom Toast", duration, type, yourimage, boolean value).show();
```

To display the custom `Toast` with no android icon:

```java
FancyToast.makeText(this, "This is Custom Toast with no android icon", FancyToast.LENGTH_LONG, FancyToast.CONFUSING, R.drawable.ic_android_black_24dp, false);
```


### Screenshots

Please click the image below to enlarge.
![FancyToast-Android Example Tutorial](https://github.com/Shashank02051997/FancyToast-Android/raw/master/fancytoastcollage.png)


### Full Example

Let us look at a full `Fancy Toast` Library Example below.

<!--more-->

#### Step 1. Design Layouts

In Android we design our UI interfaces using XML. So let's create the following layouts:


**(a). activity_main.xml**


> Our `activity_main` layout.

To start inside your `/res/layout/` directory create an xml layout file named `activity_main.xml`.

On top of that design your XML layout using the following 2 UI widgets and ViewGroups:

1. `RelativeLayout`
2. `Button`

```xml
<?xml version="1.0" encoding="utf-8"?>
<RelativeLayout xmlns:android="http://schemas.android.com/apk/res/android"
    xmlns:tools="http://schemas.android.com/tools"
    android:layout_width="match_parent"
    android:layout_height="match_parent"
    tools:context="com.shashank.sony.fancytoastlibrary.MainActivity">

    <Button
        android:id="@+id/button"
        android:layout_width="wrap_content"
        android:layout_height="wrap_content"
        android:layout_alignParentStart="true"
        android:layout_alignParentTop="true"
        android:text="Default" />

    <Button
        android:id="@+id/button2"
        android:layout_width="wrap_content"
        android:layout_height="wrap_content"
        android:layout_alignBottom="@+id/button"
        android:layout_centerHorizontal="true"
        android:text="Success" />

    <Button
        android:id="@+id/button3"
        android:layout_width="wrap_content"
        android:layout_height="wrap_content"
        android:layout_alignParentTop="true"
        android:layout_alignParentEnd="true"
        android:text="Error" />

    <Button
        android:id="@+id/button4"
        android:layout_width="wrap_content"
        android:layout_height="wrap_content"
        android:layout_below="@+id/button"
        android:layout_marginTop="20dp"
        android:text="Warning" />

    <Button
        android:id="@+id/button5"
        android:layout_width="wrap_content"
        android:layout_height="wrap_content"
        android:layout_alignBottom="@+id/button4"
        android:layout_centerHorizontal="true"
        android:text="Info" />

    <Button
        android:id="@+id/button6"
        android:layout_width="wrap_content"
        android:layout_height="wrap_content"
        android:layout_alignBottom="@+id/button5"
        android:layout_alignParentEnd="true"
        android:text="Confusing" />

    <Button
        android:id="@+id/button7"
        android:layout_width="wrap_content"
        android:layout_height="wrap_content"
        android:layout_below="@+id/button4"
        android:layout_alignEnd="@+id/button"
        android:layout_marginTop="23dp"
        android:text="Custom icon" />

    <Button
        android:id="@+id/button8"
        android:layout_width="wrap_content"
        android:layout_height="wrap_content"
        android:layout_below="@+id/button5"
        android:layout_centerHorizontal="true"
        android:layout_marginTop="23dp"
        android:text="Custom \n(No android icon)" />

    <Button
        android:id="@+id/button9"
        android:layout_width="wrap_content"
        android:layout_height="wrap_content"
        android:layout_alignStart="@+id/button6"
        android:layout_alignTop="@+id/button8"
        android:text="Android" />

</RelativeLayout>

```

#### Step 2. Write Code

Finally we need to write our code as follows:


**(a). MainActivity.java**

> Our `MainActivity` class.

Just copy the code below and replace the package with your app's package name.

```java
package replace_with_your_package_name;

import android.os.Bundle;
import android.view.View;
import android.widget.Button;

import androidx.appcompat.app.AppCompatActivity;

import com.shashank.sony.fancytoastlib.FancyToast;

public class MainActivity extends AppCompatActivity implements View.OnClickListener {
    Button b1, b2, b3, b4, b5, b6, b7, b8, b9;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);
        b1 = findViewById(R.id.button);
        b2 = findViewById(R.id.button2);
        b3 = findViewById(R.id.button3);
        b4 = findViewById(R.id.button4);
        b5 = findViewById(R.id.button5);
        b6 = findViewById(R.id.button6);
        b7 = findViewById(R.id.button7);
        b8 = findViewById(R.id.button8);
        b9 = findViewById(R.id.button9);
        b1.setOnClickListener(this);
        b2.setOnClickListener(this);
        b3.setOnClickListener(this);
        b4.setOnClickListener(this);
        b5.setOnClickListener(this);
        b6.setOnClickListener(this);
        b7.setOnClickListener(this);
        b8.setOnClickListener(this);
        b9.setOnClickListener(this);
    }

    @Override
    public void onClick(View v) {
        if (v.getId() == R.id.button)
            FancyToast.makeText(this, "This is Default Toast", FancyToast.LENGTH_LONG, FancyToast.DEFAULT, true).show();
        else if (v.getId() == R.id.button2)
            FancyToast.makeText(this, "Success Toast !", FancyToast.LENGTH_LONG, FancyToast.SUCCESS, true).show();
        else if (v.getId() == R.id.button3)
            FancyToast.makeText(this, "This is an Error Toast", FancyToast.LENGTH_LONG, FancyToast.ERROR, true).show();
        else if (v.getId() == R.id.button4)
            FancyToast.makeText(this, "Beware of dog", FancyToast.LENGTH_LONG, FancyToast.WARNING, true).show();
        else if (v.getId() == R.id.button5)
            FancyToast.makeText(this, "Here is some Info for you", FancyToast.LENGTH_LONG, FancyToast.INFO, true).show();
        else if (v.getId() == R.id.button6)
            FancyToast.makeText(this, "This is Confusing Toast", FancyToast.LENGTH_LONG, FancyToast.CONFUSING, false).show();
        else if (v.getId() == R.id.button7)
            FancyToast.makeText(this, "This is Custom Toast", FancyToast.LENGTH_LONG, FancyToast.CONFUSING, R.drawable.ic_android_black_24dp, true).show();
        else if (v.getId() == R.id.button8)
            FancyToast.makeText(this, "This is Custom Toast with no android icon", FancyToast.LENGTH_LONG, FancyToast.CONFUSING, R.drawable.ic_android_black_24dp, false).show();
        else if (v.getId() == R.id.button9)
            FancyToast.makeText(this, "This is a Success Toast", FancyToast.LENGTH_LONG, FancyToast.SUCCESS, false).show();
    }
}


```

### Reference

Download the code below:

|No.|Link|
|--|---|
|1.|[Download Full Code](https://github.com/Shashank02051997/FancyToast-Android/archive/refs/heads/master.zip)|
|2.|Read more [here](https://github.com/Shashank02051997/FancyToast-Android).|
|3.|Follow code author [here](https://github.com/Shashank02051997).|
