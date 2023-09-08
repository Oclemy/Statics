# Best Android Custom Fonts Libraries with Examples


In this piece we want to explore with examples the best libraries to use if you want to render custom fonts in your android app. Such fonts are useful as they enable you to brand your app as well a render content exactly as you wish. Some libraries allow you to set fonts application-wide in all views while others per view.


## (a). Calligraphy

> A library that provides the capability to use Custom fonts in Android the easy way.

The major advantage of using this library over any other is that it allows you to inject your custom fonts to the whole application, not just a specific view. You can also of course inject the fonts per view.

Here's the screenshot of Calligraphy in use:

![Calligraphy Sample](https://github.com/chrisjenx/Calligraphy/raw/master/screenshot.png)

First:

### Step 1: Install it

Declare the library as a dependency inside in your `app/build.gradle`:

```groovy
dependencies {
    implementation 'uk.co.chrisjenx:calligraphy:2.3.0'
}
```

Alternatively you can download it as an AAR file from [here](http://search.maven.org/remotecontent?filepath=uk/co/chrisjenx/calligraphy/2.3.0/calligraphy-2.3.0.aar).

### Step 2: Add Custom Fonts

You need to add the fonts you plan to use in your assets folder. If you do not have such a folder create it under the `/src/main/` directory. For example in the project sample we use:

```shell
/src/main/assets/fonts/myfont.ttf
```

### Step 3: Specify font path

In your xml layout, in your specific element you can specify the font to be used:

```xml
<TextView fontPath="fonts/MyFont.ttf"/>
```

for example:

```xml
<TextView
    android:text="@string/hello_world"
    android:layout_width="wrap_content"
    android:layout_height="wrap_content"
    fontPath="fonts/Roboto-Bold.ttf"/>
```

> The above allow you to inject fonts per view.

### Step 4: Initialize Calligraphy

You need to initialize Calligraphy preferable in your `App` class:

```java
@Override
public void onCreate() {
    super.onCreate();
    CalligraphyConfig.initDefault(new CalligraphyConfig.Builder()
                            .setDefaultFontPath("fonts/Roboto-RobotoRegular.ttf")
                            .setFontAttrId(R.attr.fontPath)
                            .build()
            );
    //....
}
```

### Step 5: Inject into Context

Wrap the `Activity` Context:

```java
@Override
protected void attachBaseContext(Context newBase) {
    super.attachBaseContext(CalligraphyContextWrapper.wrap(newBase));
}
```

> The above will allow you inject custom fonts to the whole activity, not just a single view.

And that's it.

### Full Example

Find a full example in the reference link below.

### Run

Copy the code or download it in the link below, build and run.

### Reference

Here are the reference links:

| Number | Link |
| --- | --- |
| 1. | [Download](https://downgit.github.io/#/home?url=https://github.com/chrisjenx/Calligraphy/tree/master/CalligraphySample) Example |
| 2. | [Read](https://github.com/chrisjenx/Calligraphy/) more |
| 3. | [Follow](https://github.com/chrisjenx/) code author |

## (b). CustomFontView

> Custom View classes for TextView, EditText & Buttons - to set custom fonts.

This library is available for API 9+.

Here is the demo app we will create:

![CustomFontView Example](https://user-images.githubusercontent.com/22608780/29374593-9d9f71d4-82cf-11e7-915d-dcead8093d40.png)

Here's how you use it:

### Step 1: Install it

Install the library by declaring the following implementation statement in your `app/build.gradle`:

```groovy
   implementation 'com.an.customfontview:customfont:0.1.0'
```

### Step 2: Add Fonts

The next step is to add your custom fonts to `assets/`. If the assets directory does not already exist, you should create it under `src/main/` in your project directory. You might consider creating a `fonts/` subdirectory in the assets directory (as in examples).

Here's an example:

```shell
/src/main/assets/fonts/myfon.ttf
```

### Step 3: Add to Layout

Now add the widget to your xml layout:

For custom font TextView:

```xml
.....
       <com.an.customfontview.CustomTextView
          android:layout_gravity="center"
          android:layout_width="wrap_content"
          android:layout_height="wrap_content"
          app:textFontPath="fonts/gotham_bold.otf"
          android:text="Works for any number of fonts" />
.....
```

For custom font EditText:

```xml
.....
       <com.an.customfontview.CustomEditText
          android:text="Works for edit text too!"
          android:layout_width="match_parent"
          android:layout_height="wrap_content"
          app:editFontPath="fonts/product_sans.ttf" />
.....
```

For custom font Button:

```xml
.....
           <com.an.customfontview.CustomButton
              android:layout_gravity="center"
              android:layout_width="wrap_content"
              android:layout_height="wrap_content"
              app:btnFontPath="fonts/gt_medium.otf"
              android:text="Works for me too!"/>
.....
```

You may be prompted by AndroidStudio to add the following line in your root element in that layout:

```xml
xmlns:app="http://schemas.android.com/apk/res-auto"
```

### Full Example

#### Step 1: Create Project

Create android studio project or download the one provided.

#### Step 2: Install Library

Install the library as has been discussed.

#### Step 3: Add Custom Fonts

Create an assets folder as has been discussed and add custom fonts to it. For example:

```shell
/src/main/assets/fonts/product_sans.ttf
```

#### Step 4: Design Layout

Design your MainActivity layout as follows:

**activity_main.xml**

```xml
<?xml version="1.0" encoding="utf-8"?>
<LinearLayout xmlns:android="http://schemas.android.com/apk/res/android"
    xmlns:app="http://schemas.android.com/apk/res-auto"
    android:orientation="vertical" android:layout_width="match_parent"
    android:layout_height="match_parent">

    <com.an.customfontview.CustomTextView
        android:textSize="20dp"
        android:layout_marginTop="40dp"
        android:layout_gravity="center"
        android:layout_width="wrap_content"
        android:layout_height="wrap_content"
        app:textFontPath="fonts/gotham_bold.otf"
        android:text="Works for any number of fonts" />

    <com.an.customfontview.CustomTextView
        android:textSize="20dp"
        android:layout_marginTop="40dp"
        android:layout_gravity="center"
        android:layout_width="wrap_content"
        android:layout_height="wrap_content"
        app:textFontPath="fonts/circular_medium.otf"
        android:text="What do you think?" />

    <com.an.customfontview.CustomTextView
        android:textSize="20dp"
        android:layout_marginTop="40dp"
        android:layout_gravity="center"
        android:layout_width="wrap_content"
        android:layout_height="wrap_content"
        app:textFontPath="fonts/product_sans.ttf"
        android:text="Pretty simple right?" />

    <com.an.customfontview.CustomEditText
        android:paddingBottom="10dp"
        android:gravity="center"
        android:layout_marginLeft="50dp"
        android:layout_marginRight="50dp"
        android:text="Works for edit text too!"
        android:textSize="20dp"
        android:layout_marginTop="40dp"
        android:layout_gravity="center"
        android:layout_width="match_parent"
        android:layout_height="wrap_content"
        app:editFontPath="fonts/product_sans.ttf" />

    <com.an.customfontview.CustomButton
        android:padding="20dp"
        android:textSize="20dp"
        android:layout_marginTop="40dp"
        android:layout_gravity="center"
        android:layout_width="wrap_content"
        android:layout_height="wrap_content"
        app:btnFontPath="fonts/gt_medium.otf"
        android:text="Works for me too!"/>

</LinearLayout>
```

#### Step 5: MainActivity

We don't need to do anything of note in our MainActivity:

**MainActivity.java**

```java
import android.app.Activity;
import android.os.Bundle;

public class MainActivity extends Activity {

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);
    }
}
```

### Run

Copy the code or download it in the link below, build and run.

### Reference

Here are the reference links:

| Number | Link |
| --- | --- |
| 1. | [Download](https://downgit.github.io/#/home?url=https://github.com/anitaa1990/CustomFontView/tree/master/app) Example |
| 2. | [Read](https://github.com/anitaa1990/CustomFontView/) more |
| 3. | [Follow](https://github.com/anitaa1990/) code author |

## (c). CustomFontLib

> CustomFontLib is an Android Library to help adding custom fonts to Android Views.

Here's the screenshot of the demo project we will create:

![CustomFontLib Example](https://github.com/daniribalbert/CustomFontLib/raw/master/website/static/screenshot.png)

### Step 1: Dependencies

Declare the library as a dependency in your app-level `build.gradle` as below:

```groovy
dependencies {
    implementation 'com.daniribalbert:custom-font-lib:0.9.9'
}
```

### Step 2: Add Custom Fonts

Add custom fonts to your assets as shown in the image below:

![Add Custom Fonts](https://github.com/daniribalbert/CustomFontLib/raw/master/website/static/img_fonts_folder.jpg)

### Step 3: Add to Layout

Add this view to your xml layout:

```xml
<RelativeLayout
    xmlns:android="http://schemas.android.com/apk/res/android"
    xmlns:app="http://schemas.android.com/apk/res-auto"
    ... (Additional attributes) />
    <com.daniribalbert.customfontlib.views.CustomFontTextView
        android:id="@+id/text"
        android:layout_width="wrap_content"
        android:layout_height="wrap_content"
        android:text="Hello Text!"
        app:font="your_font_name"/>
```

> Use the _font_ attribute to add your font name **without extension** ex: `app:font="helvetica"`

### Full Example

#### Step 1: Create Project

Create android studio project or download the one provided.

#### Step 2: Install Library

Install the library as has been discussed.

#### Step 3: Add Fonts

Add custom fonts to your assets as has been described above:

e.g:

```shell
/src/main/assets/fonts/myfont.ttf
```

### Step 4: Design Layout

Add the CustomFontTextView, CustomFontEditText and CustomFontButton to your layout as follows:

**activity_main.xml**

```xml
<?xml version="1.0" encoding="utf-8"?>
<RelativeLayout
    xmlns:android="http://schemas.android.com/apk/res/android"
    xmlns:app="http://schemas.android.com/apk/res-auto"
    xmlns:tools="http://schemas.android.com/tools"
    android:layout_width="match_parent"
    android:layout_height="match_parent"
    android:paddingBottom="@dimen/activity_vertical_margin"
    android:paddingLeft="@dimen/activity_horizontal_margin"
    android:paddingRight="@dimen/activity_horizontal_margin"
    android:paddingTop="@dimen/activity_vertical_margin"
    tools:context="com.example.sample.MainActivity">

    <com.daniribalbert.customfontlib.views.CustomFontEditText
        android:id="@+id/edittext"
        android:layout_width="wrap_content"
        android:layout_height="wrap_content"
        android:padding="5dp"
        android:hint="hint text!"
        android:layout_alignParentTop="true"
        android:textSize="40sp"
        android:textColorHint="@android:color/holo_blue_bright"
        app:font="Android Insomnia Regular"/>

    <com.daniribalbert.customfontlib.views.CustomFontTextView
        android:id="@+id/text"
        android:layout_width="wrap_content"
        android:layout_height="wrap_content"
        android:layout_centerInParent="true"
        android:padding="5dp"
        android:text="Hello Text!"
        android:textSize="40sp"
        app:font="Android Insomnia Regular"/>

    <com.daniribalbert.customfontlib.views.CustomFontButton
        android:id="@+id/button"
        android:layout_width="wrap_content"
        android:layout_height="wrap_content"
        android:layout_below="@id/text"
        android:layout_centerInParent="true"
        android:padding="10dp"
        android:text="Hello Button!"
        android:textSize="40sp"
        android:gravity="center"
        app:font="28 Days Later"/>
</RelativeLayout>
```

#### Step 5: MainActivity

We are not doing anything useful in our MainActivity:

**MainActivity.java**

```java
public class MainActivity extends AppCompatActivity {

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);
    }
}
```

### Run

Copy the code or download it in the link below, build and run.

### Reference

Here are the reference links:

| Number | Link |
| --- | --- |
| 1. | [Download](https://downgit.github.io/#/home?url=https://github.com/daniribalbert/CustomFontLib/tree/master/app) Example |
| 2. | [Download](https://github.com/daniribalbert/CustomFontLib/) Example |
| 3. | [Follow](https://github.com/daniribalbert/) code author |
