# Switch Button Examples


In this tutorial you will learn how to use the switch button provided by the android sdk in your project. You will learn based on simple, easy to understand and beginner friendly examples.

A switch button entails two states: the on and off. In that sense it's also a compound button like the radiobutton and checkbox. Let's look at some examples.


## Example: Kotlin Android Switch Button Example

This is a simple switch button which you can use to change the theme of android app. For example swicth on or off the dark theme.

Check the demo below:

![Kotlin Android Swicth Example](https://github.com/alirezabashi98/Test-Switch-in-android-kotlin/raw/master/Screenshot_2020-05-03-00-10-34.png)

### Step 1: Dependencies

No special dependencies, apart from the kotlin standard library and androidx appcompat, are required for this project.

### Step 2: Add to Layout

Next you need to add the switch button to your main activity's xml layout as follows:

**activity_main.xml**

```xml
<?xml version="1.0" encoding="utf-8"?>
<androidx.constraintlayout.widget.ConstraintLayout xmlns:android="http://schemas.android.com/apk/res/android"
    xmlns:app="http://schemas.android.com/apk/res-auto"
    xmlns:tools="http://schemas.android.com/tools"
    android:layout_width="match_parent"
    android:layout_height="match_parent"
    tools:context=".MainActivity"
    android:id="@+id/main">

    <Switch
        android:id="@+id/switch1"
        android:layout_width="wrap_content"
        android:layout_height="wrap_content"
        android:text="Theme"
        android:textOff="Dark"
        android:textOn="Light"
        app:layout_constraintBottom_toBottomOf="parent"
        app:layout_constraintEnd_toEndOf="parent"
        app:layout_constraintStart_toStartOf="parent"
        app:layout_constraintTop_toTopOf="parent" />

</androidx.constraintlayout.widget.ConstraintLayout>
```

### Step 3: Write Kotlin Code

Next write your kotlin code. Here's the main activity:

**MainActivity.kt**

```kotlin
package arb.test.switchs

import android.graphics.Color
import androidx.appcompat.app.AppCompatActivity
import android.os.Bundle
import kotlinx.android.synthetic.main.activity_main.*

class MainActivity : AppCompatActivity() {

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_main)

        switch1.setOnClickListener {
            if (switch1.isChecked){
                main.setBackgroundColor(Color.DKGRAY)
                switch1.setTextColor(Color.WHITE)
            }
            else{
                main.setBackgroundColor(Color.WHITE)
                switch1.setTextColor(Color.BLACK)
            }
        }
    }
}
```

### Run

Next run the project in your android studio.

### Reference

Download the code below:

| No | Link |
| --- | --- |
| 1. | [Download](https://github.com/alirezabashi98/Test-Switch-in-android-kotlin/archive/refs/heads/master.zip) Code |
| 2. | [Browse](https://github.com/alirezabashi98/Test-Switch-in-android-kotlin/) Code |
| 3. | [Follow](https://github.com/alirezabashi98) Code author |

## Example 2: Kotlin Android Material Switch Button

This example explores how to create a material swicth button and use in your app. A third party library is used.

Here is the demo of the project:

![Kotlin Android material switch button](https://github.com/alirezabashi98/metrial-desing-Switch-v1/raw/master/demo001.gif)

### Step 1: Dependencies

We will use one third party library know as StickySwitch. Add the following implementation statement in your gradle file:

```groovy
    implementation 'com.github.GwonHyeok:StickySwitch:0.0.16'
```

### Step 2: Design Layout

Add the sticky switch to your xml layout;

**activity_main.xml**

```xml
<?xml version="1.0" encoding="utf-8"?>
<RelativeLayout xmlns:android="http://schemas.android.com/apk/res/android"
    xmlns:app="http://schemas.android.com/apk/res-auto"
    xmlns:tools="http://schemas.android.com/tools"
    android:layout_width="match_parent"
    android:layout_height="match_parent"
    tools:context=".MainActivity"
    android:background="@color/colorBackground">

    <io.ghyeok.stickyswitch.widget.StickySwitch
        android:id="@+id/sticky_switch"
        android:layout_width="wrap_content"
        android:layout_height="wrap_content"
        android:layout_centerInParent="true"
        app:ss_animationDuration="600"
        app:ss_iconPadding="18dp"
        app:ss_iconSize="22dp"
        app:ss_leftIcon="@drawable/ic_male"
        app:ss_leftText="Male"
        app:ss_rightIcon="@drawable/ic_female"
        app:ss_rightText="Female"
        app:ss_selectedTextSize="14sp"
        app:ss_sliderBackgroundColor="@color/colorSliderBackground"
        app:ss_switchColor="@color/colorSwitchColor"
        app:ss_textColor="@color/colorTextColor"
        app:ss_textSize="12sp"
        app:ss_animationType="line"/>

</RelativeLayout>
```

### Step 3: Write Code

Next write your kotlin code. Replace your main activity with the following code:

```kotlin
import android.os.Bundle
import android.view.View
import android.widget.Toast
import androidx.appcompat.app.AppCompatActivity
import io.ghyeok.stickyswitch.widget.StickySwitch
import kotlinx.android.synthetic.main.activity_main.*

class MainActivity : AppCompatActivity() {

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_main)

        sticky_switch.setOnClickListener(object : StickySwitch.OnSelectedChangeListener, View.OnClickListener {
            override fun onSelectedChange(direction: StickySwitch.Direction, text: String) {}

            override fun onClick(v: View?) {
                Toast.makeText(this@MainActivity,"${sticky_switch.getText()}",Toast.LENGTH_SHORT).show()
            }

        })

    }
}
```

### Run

Run the project.

### Reference

Download the code below.

| No. | Link |
| --- | --- |
| 1. | [Downlaod](https://github.com/alirezabashi98/metrial-desing-Switch-v1/archive/refs/heads/master.zip) code |
| 2. | [Follow](https://github.com/alirezabashi98/) code author |

# Best Switch Button Libraries

You may not be impressed or satisfied with the native switch button and may wish to use third party libraries. In this piece we look at some of the best android swicth button libraries.

We will not only list these examples but also in a step by step manner show you how to use them via code examples.

> NB/= The order of this listing has nothing to do with the value of the solutions, we are just listing them as we discover them.

## (a). SwicthButton

> This is a beautiful, lightweight and easy to use switch widget for Android.

It supports a minSdkVersion >= 11. Here are it's best features:

1. It does not rely on other third party libraries.
2. It does carry with it drawables and images. It only comprises of a single hava file and a style.
3. It supports drag switch.

The above fetaures make this library light on your project and so feel free to use it without causing inflation of apk size.

Here is the demo of this library in action:

![Android Switch Button demo](https://github.com/zcweng/SwitchButton/raw/master/21879.gif)

### Step 1: Install it

The first step is to install it. You install it from mavenCentral by adding the following implementation statement:

```groovy
implementation 'com.github.zcweng:switch-button:0.0.3@aar'
```

### Step 2: Add it to XML Layout

Next you need to add it to your xml layout:

```xml
    <com.suke.widget.SwitchButton
        android:id="@+id/switch_button"
        android:layout_width="wrap_content"
        android:layout_height="wrap_content"/>
```

### Step 3: Write Code

Reference it from the layout and use it as needed. For example to set checked:

```java
switchButton.setChecked(true);
```

Here is how you check if the switchbutton is checked:

```java
switchButton.isChecked();
```

Here is how you toggle the switch button state:

```java
switchButton.toggle();     //switch state
switchButton.toggle(false);//switch without animation
```

You can set shadow effect as follows:

```java
switchButton.setShadowEffect(true);//disable shadow effect
```

To enable/diable the swicth button:

```java
switchButton.setEnabled(false);//disable button
switchButton.setEnableEffect(false);//disable the switch animation
```

To listen to checkedChangelistener:

```java
switchButton.setOnCheckedChangeListener(new SwitchButton.OnCheckedChangeListener() {
    @Override
    public void onCheckedChanged(SwitchButton view, boolean isChecked) {
        //TODO do your job
    }
});
```

### Full Example

Here is a full example. Start by installing the library as has been discussed above.

Next create a layout as follows;

**activity_main.xml**

```xml
<LinearLayout xmlns:android="http://schemas.android.com/apk/res/android"
              android:layout_width="match_parent"
              android:layout_height="match_parent"
              xmlns:app="http://schemas.android.com/apk/res-auto"
              android:background="#fff"
              android:orientation="vertical"
              android:padding="20dp">

    <com.suke.widget.SwitchButton
        android:id="@+id/switch_button"
        android:layout_width="wrap_content"
        android:layout_height="wrap_content"
        android:layout_marginTop="10dp"/>

    <com.suke.widget.SwitchButton
        android:layout_width="wrap_content"
        android:layout_height="wrap_content"
        android:layout_marginTop="10dp"
        app:sb_checked="true"/>

    <com.suke.widget.SwitchButton
        android:layout_width="wrap_content"
        android:layout_height="wrap_content"
        android:layout_marginTop="10dp"
        app:sb_show_indicator="false"
        app:sb_checked="true"/>

    <com.suke.widget.SwitchButton
        android:layout_width="wrap_content"
        android:layout_height="wrap_content"
        android:layout_marginTop="10dp"
        app:sb_checked_color="#fdc951"
        app:sb_checked="true"/>

    <com.suke.widget.SwitchButton
        android:layout_width="wrap_content"
        android:layout_height="wrap_content"
        android:layout_marginTop="10dp"
        app:sb_button_color="#db99c7"
        app:sb_shadow_color="#A36F95"
        app:sb_background="#FFF"
        app:sb_checkline_color="#a5dc88"
        app:sb_checked_color="#A36F95"
        app:sb_uncheckcircle_color="#A36F95"
        app:sb_uncheckbutton_color="#fdc951"
        app:sb_checkedbutton_color="#61d74f"
        />

    <com.suke.widget.SwitchButton
        android:layout_width="wrap_content"
        android:layout_height="wrap_content"
        android:layout_marginTop="10dp"
        app:sb_enable_effect="false"/>

</LinearLayout>
```

Then write your code as follows;

**MainActivity.java**

```java
package com.suke.widget.sample;
import android.app.Activity;
import android.os.Bundle;

import com.suke.widget.SwitchButton;

public class MainActivity extends Activity {

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);

        SwitchButton switchButton = (SwitchButton) findViewById(R.id.switch_button);

        switchButton.setChecked(true);
        switchButton.isChecked();
        switchButton.toggle();     //switch state
        switchButton.toggle(false);//switch without animation
        switchButton.setShadowEffect(true);//disable shadow effect
        switchButton.setEnabled(false);//disable button
        switchButton.setEnableEffect(false);//disable the switch animation
        switchButton.setOnCheckedChangeListener(new SwitchButton.OnCheckedChangeListener() {
            @Override
            public void onCheckedChanged(SwitchButton view, boolean isChecked) {
                //TODO do your job
            }
        });

    }
}
```

Run the project. Here is what you will get:

![android Switch button example](https://github.com/zcweng/SwitchButton/blob/master/device-capture.png?raw=true)

### Reference

Here are the links

| No. | Link |
| --- | --- |
| 1. | [Download code](https://downgit.github.io/#/home?url=https://github.com/zcweng/SwitchButton/tree/master/sample) |
| 2. | [Browse](https://github.com/zcweng/SwitchButton/tree/master/sample) code |
| 3. | [Read](https://github.com/zcweng/SwitchButton/) more |
| 4. | [Follow](https://github.com/zcweng/) code author |

## (b). switchbutton

> An iOS style swicth button for android.

This library has the following features:

1. Only one class file is involved, which is very easy to integrate into your project.
    
2. It Supports the "delay and rollback" operation of the switch.
    

Here is the demo:

![iOS-like switch button](https://github.com/iielse/SwitchButton/raw/master/previews/a.gif)

![](https://github.com/iielse/SwitchButton/raw/master/previews/b.gif)

### Step 1: Install it

Install this library using the following implementation statement:

```groovy
implementation 'com.github.iielse:switchbutton:1.0.4'
```

### Step 2: Add to Layout

Then add this tag in your xml layout:

```xml
<com.github.iielse.switchbutton.SwitchView
        android:layout_width="wrap_content"
        android:layout_height="wrap_content"/>
```

### Step 3: Write Code

Here is how you listen to click events for the switch button:

```java
switchView.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                boolean isOpened = switchView.isOpened();
            }
        });
```

You can listen to state change like this:

```java
switchView.setOnStateChangedListener(new SwitchView.OnStateChangedListener() {
            @Override
            public void toggleToOn(SwitchView view) {
                view.toggleSwitch(true); // or false
            }

            @Override
            public void toggleToOff(SwitchView view) {
                view.toggleSwitch(false); // or true
            }
        });
```

### Example

Find example [here](https://github.com/iielse/switchbutton/tree/master/app)

### Reference

Find reference links below:

| No. | Link |
| --- | --- |
| 1. | [Browse](https://github.com/iielse/switchbutton/tree/master/app) example |
| 2. | [Read](https://github.com/iielse/switchbutton/) more |
| 3. | [Follow](https://github.com/iielse/) code author |

# Multi-Switch Button

You may need a switch button with more than two states. Such a multi-switch button is called a segmented button. This section will explore segmented button examples.

## KingJA/SwitchButton

> A smart switchable button,supporting multiple tabs. (Multiple selector, switch button).

Here is the demo:

![](https://github.com/KingJA/SwitchButton/raw/master/img/usage.gif)

### Step 1: Dependencies

Add the following implementatinon in your build.gradle:

```groovy
implementation 'lib.kingja.switchbutton:switchbutton:1.1.8'
```

### Step 2: Add to Layout

Add the segmented button to your xml layout:

```xml
<lib.kingja.switchbutton.SwitchMultiButton
        android:layout_width="wrap_content"
        android:layout_height="wrap_content"
        android:padding="8dp"
        app:strokeRadius="5dp"
        app:strokeWidth="1dp"
        app:selectedTab="0"
        app:selectedColor="#eb7b00"
        app:switchTabs="@array/switch_tabs"
        app:typeface="DeVinneTxtBT.ttf"
        app:textSize="14sp" />
```

### Step 3: Write Code

Here is an example usage:

```java
//set switch tabs with ***app:switchTabs*** in xml 

SwitchMultiButton mSwitchMultiButton = (SwitchMultiButton) findViewById(R.id.switchmultibutton);
        mSwitchMultiButton.setOnSwitchListener(new SwitchMultiButton.OnSwitchListener() {
            @Override
            public void onSwitch(int position, String tabText) {
                Toast.makeText(MainActivity.this, tabText, Toast.LENGTH_SHORT).show();
            }
        });

//or set switch tabs in java code

SwitchMultiButton mSwitchMultiButton = (SwitchMultiButton) findViewById(R.id.switchmultibutton);
        mSwitchMultiButton.setText("点个Star", "狠心拒绝").setOnSwitchListener(new SwitchMultiButton.OnSwitchListener() {
            @Override
            public void onSwitch(int position, String tabText) {
                Toast.makeText(MainActivity.this, tabText, Toast.LENGTH_SHORT).show();
            }
        });
```

### Full Example

Start by installing the library as has been discussed.

Then create a layout and add multiple segmented butons like below:

**activity_main.xml**

```xml
<?xml version="1.0" encoding="utf-8"?>
<LinearLayout xmlns:android="http://schemas.android.com/apk/res/android"
              xmlns:app="http://schemas.android.com/apk/res-auto"
              android:layout_width="match_parent"
              android:layout_height="match_parent"
              android:gravity="center_horizontal"
              android:orientation="vertical"
              android:padding="16dp">

    <lib.kingja.switchbutton.SwitchMultiButton
        android:id="@+id/switchmultibutton1"
        android:layout_width="match_parent"
        android:layout_height="wrap_content"
        android:layout_gravity="center_horizontal"
        android:layout_marginTop="14dp"
        android:paddingBottom="4dp"
        android:paddingTop="4dp"
        app:selectedColor="#1c7626"
        app:selectedTab="1"
        app:strokeRadius="0dp"
        app:strokeWidth="1dp"
        app:textSize="14sp"/>

    <lib.kingja.switchbutton.SwitchMultiButton
        android:id="@+id/switchmultibutton2"
        android:layout_width="wrap_content"
        android:layout_height="wrap_content"
        android:layout_gravity="center_horizontal"
        android:layout_marginTop="14dp"
        android:paddingBottom="4dp"
        android:paddingLeft="12dp"
        android:paddingRight="12dp"
        android:paddingTop="4dp"
        app:selectedColor="#eb7b00"
        app:selectedTab="1"
        app:strokeRadius="5dp"
        app:strokeWidth="1dp"
        app:textSize="14sp"/>

    <lib.kingja.switchbutton.SwitchMultiButton
        android:id="@+id/switchmultibutton3"
        android:layout_width="wrap_content"
        android:layout_height="wrap_content"
        android:layout_gravity="center_horizontal"
        android:layout_marginTop="14dp"
        android:padding="8dp"
        app:selectedColor="#86389c"
        app:selectedTab="0"
        app:strokeRadius="5dp"
        app:strokeWidth="1dp"
        app:switchTabs="@array/switch_tabs"
        app:typeface="tielanti.ttf"
        app:textSize="14sp"/>

    <lib.kingja.switchbutton.SwitchMultiButton
        android:id="@+id/switchmultibutton4"
        android:layout_width="match_parent"
        android:layout_height="30dp"
        android:layout_gravity="center_horizontal"
        android:layout_marginTop="14dp"
        app:selectedColor="#e12251"
        app:strokeRadius="14dp"
        app:strokeWidth="2dp"
        app:textSize="14sp"/>

    <lib.kingja.switchbutton.SwitchMultiButton
        android:id="@+id/switchmultibutton5"
        android:layout_width="wrap_content"
        android:layout_height="wrap_content"
        android:layout_marginTop="14dp"
        android:padding="8dp"
        app:selectedColor="#223273"
        app:selectedTab="0"
        app:strokeWidth="1dp"
        app:switchTabs="@array/switch_country"
        app:textSize="14sp"
        app:typeface="DeVinneTxtBT.ttf"/>

    <lib.kingja.switchbutton.SwitchMultiButton
        android:id="@+id/switchmultibutton6"
        android:layout_width="wrap_content"
        android:layout_height="wrap_content"
        android:layout_marginTop="14dp"
        android:padding="8dp"
        app:selectedColor="#cf9c1a"
        app:disableColor="#999999"
        app:selectedTab="0"
        app:strokeWidth="1dp"
        app:switchTabs="@array/switch_yn"
        app:strokeRadius="4dp"
        app:textSize="14sp"/>

</LinearLayout>
```

**MainActivity.java**

Add the following code to your main activity:

```java
public class MainActivity extends AppCompatActivity {

    private  String [] tabTexts1 = { " talent " , " handsome guy " , " big wet " , " brother Meng Jiang " };
    private  String [] tabTexts4 = { " Already " , " At Home " , " Waiting for You " };

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super . onCreate (savedInstanceState);
        setContentView(R.layout.activity_main);
        ((SwitchMultiButton) findViewById(R.id.switchmultibutton1)).setText(tabTexts1).setOnSwitchListener
                (onSwitchListener);
        (( SwitchMultiButton ) the findViewById ( R & lt . ID . Switchmultibutton2)) . The setText ( " point of a Star " , " cruel rejection " ) . SetOnSwitchListener
                (onSwitchListener);
        ((SwitchMultiButton) findViewById(R.id.switchmultibutton3)).setOnSwitchListener(onSwitchListener).setSelectedTab(1);
        ((SwitchMultiButton) findViewById(R.id.switchmultibutton4)).setText(tabTexts4).setOnSwitchListener
                (onSwitchListener);
        ((SwitchMultiButton) findViewById(R.id.switchmultibutton6)).setEnabled(false);
    }

    private SwitchMultiButton.OnSwitchListener onSwitchListener = new SwitchMultiButton.OnSwitchListener() {
        @Override
        public void onSwitch(int position, String tabText) {
            Toast.makeText(MainActivity.this, tabText, Toast.LENGTH_SHORT).show();
        }
    };
```

### Reference

Here are the links

| No. | Link |
| --- | --- |
| 1. | [Download](https://downgit.github.io/#/home?url=https://github.com/KingJA/SwitchButton/tree/master/app) example |
| 2. | [Browse](https://github.com/KingJA/SwitchButton) code |
| 3. | [Follow](https://github.com/KingJA/) code author |
