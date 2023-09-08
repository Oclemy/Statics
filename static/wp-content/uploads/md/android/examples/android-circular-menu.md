# Circular Menu Examples


Android CircularFloatingActionMenu is a custom menu that represents it's menu items in a circular manner.

This menu was written by [Oğuz Bilgener](https://github.com/oguzbilgener) back in the year 2014 and is available in [github](https://github.com/oguzbilgener/CircularFloatingActionMenu).


A downloadable sample is included [here](https://github.com/oguzbilgener/CircularFloatingActionMenu/tree/master/samples).

First a floating action button is shown at the right bottom of the screen or seven other positions within the screen. Here are the positions this button can be shown:

| No. | POSITION |
| --- | --- |
| 1. | Top Left |
| 2. | Top Center |
| 3. | Top Right |
| 4. | Right Center |
| 5. | Left Center |
| 6. | Bottom Left |
| 7. | Bottom Center |
| 8. | Bottom Right |

If the user clicks this button circular menu items' icons popup with nice animations.

The user can then click the menu items and navigate to a different page.

## Advantages of CircularFloatingActionMenu

1. It's easy to use and customize.
2. It confines items in a small space. Only a small circular floating action button gets displayed at first. Then on clicking this button, it's when the menu items' icons get displayed in a popup that gets dismissed oncliking an item. This means that CircularFloatingActionMenu can get used in the smallest of spaces.
3. It's modern and has awesome animations.
4. It's free and open source.

## **Definition of CircularFloatingActionMenu**

This library comprises of two main parts:

| No. | Part | Description |
| --- | --- | --- |
| 1. | FloatingActionButton | The floating action button that gets clicked to display menu items. |
| 2. | FloatingActionMenu | The menu that contains the menu items and get's displayed in an animated popup |
| 3. | SubActionButton | The individual menu items |

It also have two classes that define the animations used:

| No. | Class |
| --- | --- |
| 1. | DefaultAnimationHandler |
| 2. | MenuAnimationHandler |

## **1\. FloatinActionButton**

The FloatinActionButton is a class that resides in the package `com.oguzdev.circularfloatingactionmenu.library`:

```java
package com.oguzdev.circularfloatingactionmenu.library;
```

It derives from FrameLayout:

```java
public class FloatingActionButton extends FrameLayout {}
```

It defines public constants that determine it's placement position within the screen viewport:

```java
    public static final int POSITION_TOP_CENTER = 1;
    public static final int POSITION_TOP_RIGHT = 2;
    public static final int POSITION_RIGHT_CENTER = 3;
    public static final int POSITION_BOTTOM_RIGHT = 4;
    public static final int POSITION_BOTTOM_CENTER = 5;
    public static final int POSITION_BOTTOM_LEFT = 6;
    public static final int POSITION_LEFT_CENTER = 7;
    public static final int POSITION_TOP_LEFT = 8;
```

These constants will be changing the gravity of the FAB.

![FAB Positions](https://camposha.info/wp-content/uploads/android/circularfloatingactionmenu/demo2.png)

### Creating FloatingActionButton

The FloatingActionButton provides a public constructor with the following parameters:

```java
public FloatingActionButton(Context context, ViewGroup.LayoutParams layoutParams, int theme,
                                Drawable backgroundDrawable, int position, View contentView,
                                FrameLayout.LayoutParams contentParams,
                                boolean systemOverlay) {}
```

However, it provides a Java Builder class for easy creation using a fluent interface. The builder class will be returning a new instance of the FloatingActionButton on calling the `build(` method.

```java
 public static class Builder {}
```

### Using FloatingActionButton

FloatingActionButtons are easy to use. The Builder class we mentioned makes this easy to use as we don't have to instantiate the FloatingActionButton directly.

```java
FloatingActionButton fab = new FloatingActionButton.Builder(this)
                                        .setContentView(myIcon)
                                        .build();
```

### Common Methods

Let's look at some public methods that can be used with FloatingActionButton for various purposes:

| No. | Method | Description |
| --- | --- | --- |
| 1. | setPosition(int position, ViewGroup.LayoutParams layoutParams) | This method will set the position of the FAB on the screen by calculating its gravity from the passed position parameter.The parameter is one of the [8 specified constants](https://camposha.info/#positions/). |
| 2. | setContentView(View contentView, FrameLayout.LayoutParams contentParams) | This method will specify the view to be displayed inside this FloatingActionButton |
| 3. | getActivityContentView() | This method returns the main Content view from the activity context. |

# **2\. FloatingActionMenu**

This will be shown in an animated popup when the FloatingActionButton is clicked.

This menu will contain menu items

## Definition of FloatingActionMenu

FloatingActionMenu is a class and belongs to `com.oguzdev.circularfloatingactionmenu.library` package.

```java
package com.oguzdev.circularfloatingactionmenu.library;
```

This class doesn't inherit from any class:

```java
public class FloatingActionMenu {}
```

### Creating FlaotingActionMenu

FloatingActionMenu has one public constructor with several parameters:

```java
public FloatingActionMenu(final View mainActionView,
                              int startAngle,
                              int endAngle,
                              int radius,
                              List<Item> subActionItems,
                              MenuAnimationHandler animationHandler,
                              boolean animated,
                              MenuStateChangeListener stateChangeListener,
                              final boolean systemOverlay) {}
```

However, we don't have to use this constructor directly instead this class defines us an inner static builder class to create our menu in a fluent manner.

```java
public static class Builder {}
```

### Using FloatingActionMenu

It's easy to create and use FloatingActionMenu using the builder pattern:

```java
FloatingActionMenu actionMenu = new FloatingActionMenu.Builder(this)
                                    .addSubActionView(button1)
                                    .addSubActionView(button2)
                                    // ...
                                    .attachTo(actionButton)
                                    .build();
```

# **3\. SubActionButton**

This is basically small button implementation with the look and feel of FloatingActionButton.

Several of these buttons get used as the menu items displayed in the FloatinActionMenu popup.

### Definition of SubActionButton

This class like the others is defined in the package `com.oguzdev.circularfloatingactionmenu.library`.

```java
package com.oguzdev.circularfloatingactionmenu.library;
```

Like the FloatingActionButton, it derives from the `android.widget.FrameLayout`:

```java
public class SubActionButton extends FrameLayout {}
```

### Creating SubActionButton

This class has one public constructor for its creation.

```java
  public SubActionButton(Context context, FrameLayout.LayoutParams layoutParams, int theme, Drawable backgroundDrawable, View contentView, FrameLayout.LayoutParams contentParams) {}
```

However, like the other previous two classes, we would typically want to use the fluent Builder pattern.

```java
public static class Builder {}
```

### Usage of SubActionButtons

Here's a usage example.

```java
SubActionButton.Builder itemBuilder = new SubActionButton.Builder(this);
// repeat many times:
ImageView itemIcon = new ImageView(this);
itemIcon.setImageDrawable( ... );
SubActionButton button1 = itemBuilder.setContentView(itemIcon).build();
```

# 4\. Installation of Android CircularFloatingActionMenu.

### Requirements.

This library does require API levle 15 and above

- API >= 15

You then fetch the Android Archive from Maven Central:

```groovy
dependencies {
    implementation 'com.oguzdev:CircularFloatingActionMenu:1.0.2'
}
```

## Example: Android Circular FloatingActionMenu – Open Activity onClick

Android CircularFloatingActionMenu is a modern looking customizable menu that renders menu items in a circular manner.

It's a third party library written by [Oğuz Bilgener](https://github.com/oguzbilgener).

In this example our aim is to open an activity when each menu item is clicked.

![](https://camposha.info/wp-content/uploads/source/circlemenuopenactivity/demo1.gif)

## **Project Structure**

Here's our project structure. We'll have a total four activities/pages and four layouts.

![](https://camposha.info/wp-content/uploads/android-examples/circlemenuopenactivity/demo1.png)

## **1\. Create Project**

1. First create an empty project in android studio. Go to File --> New Project.
2. Type the application name and choose the company name. ![New Project Dialog](https://camposha.info/wp-content/uploads/android/new_project.png)
3. Choose minimum SDK. ![Choose minimum SDK](https://camposha.info/wp-content/uploads/android/choose_minimum_sdk.png)
4. Choose Empty activity. ![Choose Empty Activity](https://camposha.info/wp-content/uploads/android/empty_activity.png)
5. Click Finish. ![Finish](https://camposha.info/wp-content/uploads/android/finish.png)

This will generate for us a project with the following:

- 1 Activity - MainActivity.java
- 1 Layout - activity_main.xml.

The activity will automatically be registered in the android_manifest.xml. Android Activities are components and normally need to be registered as an application component. If you've created yours manually then register it inside the `<application>...<application>` as following, replacing the `MainActivity` with your activity name:

```xml
        <activity android_name=".MainActivity">
            <intent-filter>
                <action android_name="android.intent.action.MAIN" />
                <category android_name="android.intent.category.LAUNCHER" />
            </intent-filter>
        </activity>
```

You can see that one action and category are specified as intent filters. The category makes our MainActivity as launcher activity. Launcher activities get executed first when th android app is run.

## **2\. Add Dependencies**

Let's then move to our app level build.gradle and add the following:

```groovy
    compile 'com.android.support:appcompat-v7:24.2.0'
    compile 'com.oguzdev:CircularFloatingActionMenu:1.0.2'
```

Add the appcompat dependency only when you intend for your any of your activities to derive from AppCompatActivity as opposded to [Activity](https://camposha.info/android/activity).

The second dependency is the CircularFloatingActionMenu, which we fetch from maven central. This will require internet connectivity to download it into your project.

## **3\. Create Activities/Pages**

We are going to open three activities. These activities are our pages.

We open each of them depending on the clicked menu item.

Right-click your package and add three empty activities.

### **(a). PageOne Activity**

This is our first activity.

Once you've created the activity you'll have an empty activity like this.

```java
 com.tutorials.hp.circlemenuopenactivity.mPages;

public class PageOne extends AppCompatActivity {
}
```

I'll add some imports we'll need:

```java

import android.support.v7.app.AppCompatActivity;
import android.os.Bundle;
import android.widget.TextView;

import com.tutorials.hp.circlemenuopenactivity.R;
```

Then override our onCreate() method:

```java
     @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_page_one);
```

Move over to the generated layout for PageOne.java activity and add a textview.

We then come and reference that textview:

```java
TextView valueTxt= (TextView) findViewById(R.id.oneTxt);
```

We then set the value of the TextView:

```java
valueTxt.setText(getIntent().getExtras().getString("KEY_ADD"));
```

Well in the above line of code first we retrieve an Intent associated with our Activity via the `getIntent()` method.

This method `getIntent()` is defined in the Activity class.

The `getIntent()` method will return us an Intent instance. We then invoke its `getExtras()` method and then `getString()`.

This whole process basically allows us receive data sent from the MainActivity. We pass string key as a parameter to our `getString()` method. We will specify that same key while sending data from our MainActivity.

### **(b). PageTwo Activity**

Same as page one. We basically receive data sent from MainActivity when another menu item is clicked:

```java
package com.tutorials.hp.circlemenuopenactivity.mPages;

import android.support.v7.app.AppCompatActivity;
import android.os.Bundle;
import android.widget.TextView;

import com.tutorials.hp.circlemenuopenactivity.R;

public class PageTwo extends AppCompatActivity {

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_page_two);

        TextView valueTxt= (TextView) findViewById(R.id.twoTxt);
        valueTxt.setText(getIntent().getExtras().getString("KEY_REMOVE"));
    }
}
```

### **(c). PageThree Activity**

This activity will be opened when another menu item is clicked. It has the same concept as the above activities.

```java
package com.tutorials.hp.circlemenuopenactivity.mPages;

import android.content.Intent;
import android.support.v7.app.AppCompatActivity;
import android.os.Bundle;
import android.widget.TextView;

import com.tutorials.hp.circlemenuopenactivity.R;

public class PageThree extends AppCompatActivity {

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_page_three);

        TextView valueTxt= (TextView) findViewById(R.id.threeTxt);
        valueTxt.setText(getIntent().getExtras().getString("KEY_DELETE"));

    }
}
```

## **4\. MainActivity.java**

This is our main activity. It's the laucher activity.

It will get launched when we run the project unlike the other three activities.

This is because we have an IntentFilter that specifies so in our AndroidManifest.xml:

```xml
 <intent-filter>
                <action android_name="android.intent.action.MAIN" />

                <category android_name="android.intent.category.LAUNCHER" />
            </intent-filter>
```

**(a). First we specify the package for our mainactivity.** Java classes get organized using packages.

```java
package com.tutorials.hp.circlemenuopenactivity;
```

**(b). Create the class** Create it if it hasn't been generated.

```java
public class MainActivity{}
```

**(c). Add imports** These are packages we'll need to use within this class.

```java
import android.content.Intent;
import android.support.v7.app.AppCompatActivity;
import android.os.Bundle;
import android.view.View;
import android.widget.ImageView;
import android.widget.Toast;

import com.oguzdev.circularfloatingactionmenu.library.FloatingActionButton;
import com.oguzdev.circularfloatingactionmenu.library.FloatingActionMenu;
import com.oguzdev.circularfloatingactionmenu.library.SubActionButton;
import com.tutorials.hp.circlemenuopenactivity.mPages.PageOne;
import com.tutorials.hp.circlemenuopenactivity.mPages.PageThree;
import com.tutorials.hp.circlemenuopenactivity.mPages.PageTwo;
```

**(d). Make MainActivity derive from Activity/AppCompatActivity**

```java
public class MainActivity extends AppCompatActivity {}
```

**(e). Override OnCreate()** OnCreate() method is a lifecycle method defined in the Activity class.

```java
@Override
    protected void onCreate(Bundle savedInstanceState) {}
```

We have to call the super class's version of this method.

```java
super.onCreate(savedInstanceState);
```

Then set the layout for this activity:

```java
setContentView(R.layout.activity_main);
```

##### FloatingActionButton

We instantiate an ImageView and set it an image using the `setImageResource()` method:

```java
ImageView icon=new ImageView(this);
        icon.setImageResource(R.drawable.add_green);
```

We then create a FloatingActionButton using a Builder class. Then set it the icon:

```java
final FloatingActionButton fab=new FloatingActionButton.Builder(this).setContentView(icon).build();
```

The above button will be place at the bottom right by default, when clicked a popup menu with several menu items will come up.

##### MenuItems

These menu items are SubActionButton instances. They will get displayed when the FloatingActionButton is clicked.

```java
SubActionButton.Builder builder=new SubActionButton.Builder(this);
```

Then build several buttons and set them images.

```java
        ImageView deleteIcon=new ImageView(this);
        deleteIcon.setImageResource(R.drawable.delete_red);
        SubActionButton deleteBtn=builder.setContentView(deleteIcon).build();

        ImageView removeIcon=new ImageView(this);
        removeIcon.setImageResource(R.drawable.remove);
        SubActionButton removeBtn=builder.setContentView(removeIcon).build();

        ImageView addIcon=new ImageView(this);
        addIcon.setImageResource(R.drawable.save);
        SubActionButton addBtn=builder.setContentView(addIcon).build();
```

##### FloatinActionMenu

All the above SubActionButtons need to be displayed inside a CircularFlaotingActionMenu. So we create the menu and add it the buttons:

```java
 final FloatingActionMenu fam=new FloatingActionMenu.Builder(this)
                .addSubActionView(addBtn)
                .addSubActionView(removeBtn)
                .addSubActionView(deleteBtn)
                .attachTo(fab)
                .build();
```

##### Open PageOne Activity and Pass Data.

When the `addBtn` button is clicked:

```java
        addBtn.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View view) {...}
```

First we close the CircularFloatingActionMenu:

```java
                Toast.makeText(MainActivity.this, "Add Clicked", Toast.LENGTH_SHORT).show();
                fam.close(true);
```

Then instantiate the Intent class:

```java
Intent i=new Intent(MainActivity.this, PageOne.class);
```

Put data into our Intent object, and specify the key to identify this data:

```java
i.putExtra("KEY_ADD","add");
```

Then start the Activity:

```java
MainActivity.this.startActivity(i);
```

##### Open PageTwo Activity and Pass Data

Specify a separate key:

```java
 removeBtn.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View view) {
                Toast.makeText(MainActivity.this, "Remove Clicked", Toast.LENGTH_SHORT).show();
                fam.close(true);

                Intent i=new Intent(MainActivity.this, PageTwo.class);
                i.putExtra("KEY_REMOVE","remove");
                MainActivity.this.startActivity(i);
            }
        });
```

##### Open PageThree Activity and Pass data

Also specify a separate key.

```java
deleteBtn.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View view) {
                Toast.makeText(MainActivity.this, "Delete Clicked", Toast.LENGTH_SHORT).show();
                fam.close(true);

                Intent i=new Intent(MainActivity.this, PageThree.class);
                i.putExtra("KEY_DELETE","delete");
                MainActivity.this.startActivity(i);
            }
        });
```

## **LAYOUTS**

Our layouts are pretty simple.

### actiity_main.xml

This layout will get inflated to MainActivity.

```xml
<?xml version="1.0" encoding="utf-8"?>
<RelativeLayout

    android_layout_width="match_parent"
    android_layout_height="match_parent"
    android_paddingBottom="@dimen/activity_vertical_margin"
    android_paddingLeft="@dimen/activity_horizontal_margin"
    android_paddingRight="@dimen/activity_horizontal_margin"
    android_paddingTop="@dimen/activity_vertical_margin"
    tools_context="com.tutorials.hp.circlemenuopenactivity.MainActivity">

</RelativeLayout>
```

## activity_page_one.xml

The layout will get inflate to PageOne activity. We have a basic TextView that will render our text received from MainActivity:

![](https://camposha.info/wp-content/uploads/android-examples/circlemenuopenactivity/demo2.png)

```xml
<?xml version="1.0" encoding="utf-8"?>
<RelativeLayout

    android_layout_width="match_parent"
    android_layout_height="match_parent"
    android_paddingBottom="@dimen/activity_vertical_margin"
    android_paddingLeft="@dimen/activity_horizontal_margin"
    android_paddingRight="@dimen/activity_horizontal_margin"
    android_paddingTop="@dimen/activity_vertical_margin"
    tools_context="com.tutorials.hp.circlemenuopenactivity.mPages.PageOne"
    android_background="#03a9f4">

    <TextView
        android_id="@+id/oneTxt"
        android_layout_width="wrap_content"
        android_layout_height="wrap_content"
        android_text="Hello World!"
        android_textStyle="bold"
        android_textSize="25dp" />

</RelativeLayout>
```

## activity_page_two.xml

This layout will be inflated to PageTwo activity. It also has a textview. Let's give it a different background color.

![](https://camposha.info/wp-content/uploads/android-examples/circlemenuopenactivity/demo3.png)

```xml
<?xml version="1.0" encoding="utf-8"?>
<RelativeLayout

    android_layout_width="match_parent"
    android_layout_height="match_parent"
    android_paddingBottom="@dimen/activity_vertical_margin"
    android_paddingLeft="@dimen/activity_horizontal_margin"
    android_paddingRight="@dimen/activity_horizontal_margin"
    android_paddingTop="@dimen/activity_vertical_margin"
    tools_context="com.tutorials.hp.circlemenuopenactivity.mPages.PageTwo"
    android_background="#f38630">

    <TextView
        android_id="@+id/twoTxt"
        android_layout_width="wrap_content"
        android_layout_height="wrap_content"
        android_text="Hello World!" />

</RelativeLayout>
```

## activity_page_three.xml

This layout will be inflated to PageThree activity. It also has a textview.It also has a different backgroundcolor.

![](https://camposha.info/wp-content/uploads/android-examples/circlemenuopenactivity/demo4.png)

```xml
<?xml version="1.0" encoding="utf-8"?>
<RelativeLayout

    android_layout_width="match_parent"
    android_layout_height="match_parent"
    android_paddingBottom="@dimen/activity_vertical_margin"
    android_paddingLeft="@dimen/activity_horizontal_margin"
    android_paddingRight="@dimen/activity_horizontal_margin"
    android_paddingTop="@dimen/activity_vertical_margin"
    android_background="#009968"
    tools_context="com.tutorials.hp.circlemenuopenactivity.mPages.PageThree">

    <TextView
        android_id="@+id/threeTxt"
        android_layout_width="wrap_content"
        android_layout_height="wrap_content"
        android_text="Hello World!"
        android_textStyle="bold"
        android_textSize="25dp" />

</RelativeLayout>
```

### AndroidManifest.xml

Just make sure your androidmanifest has all the 4 activities registered in our app:

```xml
<?xml version="1.0" encoding="utf-8"?>
<manifest
    package="com.tutorials.hp.circlemenuopenactivity">

    <application
        android_allowBackup="true"
        android_icon="@mipmap/ic_launcher"
        android_label="@string/app_name"
        android_supportsRtl="true"
        android_theme="@style/AppTheme">
        <activity android_name=".MainActivity">
            <intent-filter>
                <action android_name="android.intent.action.MAIN" />

                <category android_name="android.intent.category.LAUNCHER" />
            </intent-filter>
        </activity>
        <activity android_name=".mPages.PageOne" />
        <activity android_name=".mPages.PageTwo" />
        <activity android_name=".mPages.PageThree"></activity>
    </application>

</manifest>
```
