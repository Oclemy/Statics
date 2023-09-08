# Android LinearLayout Tutorial and Examples


**LinearLayout** is a viewgroup that arranges its child elements linearly in a descending column from top to bottom or left to right.

Each of these elements can then have `gravity` and `weight` properties. These properties denote how the elements will dynamically grow and shrink to fill space.

[lwtoc]

Elements arrange themselves in a row or column notation based on the `android:orientation` parameter.

```xml
<LinearLayout

        android_orientation="vertical"
        android_layout_width="fill_parent"
        android_layout_height="fill_parent">
    <TextView
        android_layout_width="wrap_content"
        android_layout_height="wrap_content"
        android_text="TextView 1"/>
    <TextView
        android_layout_width="wrap_content"
        android_layout_height="wrap_content"
        android_text="TextView 2"/>
    <TextView
        android_layout_width="wrap_content"
        android_layout_height="wrap_content"
        android_text="TextView 3"/>
</LinearLayout>
```

These three TextViews will be arranged vertically given that we've used the `android:orientation="vertical"` as a layoutParam in our LinearLayout.

## Example 1: Design VIBGYOR Screen with LinearLayout

VIBGYOR (Violet–Indigo–Blue–Green–Yellow–Orange–Red) is a popular mnemonic device used for memorizing the traditional optical spectrum. We want to design a screen that renders those colors. We design the Screen using LinearLayout.

Check the demo below:

![vibgyor_linearlayout](https://camposha.info/android-examples/wp-content/uploads/sites/9/2021/05/vibgyor_linearlayout.jpg)

### Step 1: Create Project

Start by creating an empty `Android Studio` project.

### Step 2: Dependencies

No special dependencies are needed.

### Step 3: Design Layout

Design your main activity layout as follows:

**activity_main.xml**

```xml
<?xml version="1.0" encoding="utf-8"?>
    <LinearLayout
    android:orientation="vertical"
    tools:context=".MainActivity"
    android:layout_height="match_parent"
    android:layout_width="match_parent"
    xmlns:tools="http://schemas.android.com/tools"
    xmlns:android="http://schemas.android.com/apk/res/android">

    <TextView
        android:layout_height="74dp"
        android:layout_width="match_parent"
        android:id="@+id/txtred"
        android:background="@color/red"
        android:text="red"/>

    <TextView
        android:layout_height="74dp"
        android:layout_width="match_parent"
        android:id="@+id/txtorange"
        android:background="@color/orange"
        android:text="orange"/>

    <TextView
        android:layout_height="74dp"
        android:layout_width="match_parent"
        android:id="@+id/txtyellow"
        android:background="@color/yellow"
        android:text="yellow"/>

    <TextView
        android:layout_height="74dp"
        android:layout_width="match_parent"
        android:id="@+id/txtgreen"
        android:background="@color/green"
        android:text="green"/>

    <TextView
        android:layout_height="74dp"
        android:layout_width="match_parent"
        android:id="@+id/txtblue"
        android:background="@color/blue"
        android:text="blue"/>

    <TextView
        android:layout_height="74dp"
        android:layout_width="match_parent"
        android:id="@+id/textindigo"
        android:background="@color/indigo"
        android:text="indigo"/>

    <TextView
        android:layout_height="74dp"
        android:layout_width="match_parent"
        android:id="@+id/textviolet"
        android:background="@color/violet"
        android:text="violet"/>

</LinearLayout>
```

### Step 4: MainActivity

We do not need to do anything in our MainActivity:

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
| 1. | [Download](https://github.com/AnkitKumar111/Android_Assignment3.1/archive/refs/heads/master.zip) Example |
| 3. | [Follow](https://github.com/AnkitKumar111/) code author |

## Example 2: Designing Credit Card UI using LinearLayout

In this example we will design a Credit Card UI using LinearLayout with both horizontal and vertical orientations. We will also use TextViews and Buttons as our UI components, and organize them using LinearLayout.

Here's the screenshot of the project:

![creditcard_linearlayout](https://camposha.info/android-examples/wp-content/uploads/sites/9/2021/05/creditcard_linearlayout.jpg)

### Step 1: Create Project

Start by creating an empty `Android Studio` project.

### Step 2: Dependencies

No special or third party dependency is needed.

### Step 3: Design Layout

Design your MainActivity layout as follows:

**activity_main.xml**

```xml
<?xml version="1.0" encoding="UTF-8"?>

    <LinearLayout
    tools:context=".MainActivity"
    android:background="#000000"
    android:orientation="vertical"
    android:paddingTop="@dimen/activity_vertical_margin"
    android:paddingRight="@dimen/activity_horizontal_margin"
    android:paddingLeft="@dimen/activity_horizontal_margin"
    android:paddingBottom="@dimen/activity_vertical_margin"
    android:layout_height="match_parent"
    android:layout_width="match_parent"
    xmlns:tools="http://schemas.android.com/tools"
    xmlns:android="http://schemas.android.com/apk/res/android">

    <LinearLayout
        android:orientation="horizontal"
        android:layout_height="wrap_content"
        android:layout_width="match_parent"
        android:layout_weight="1">

    <TextView
        android:layout_height="wrap_content"
        android:layout_width="match_parent"
        android:layout_weight="1"
        android:textColor="#ffffff"
        android:text="Enter Card Balance($)"/>

    <EditText
        android:background="#D3D3D3"
        android:layout_height="wrap_content"
        android:layout_width="match_parent"
        android:layout_weight="1"/>

</LinearLayout>

    <LinearLayout
        android:orientation="horizontal"
        android:layout_height="wrap_content"
        android:layout_width="match_parent"
        android:layout_weight="1">

    <TextView
        android:layout_height="wrap_content"
        android:layout_width="match_parent"
        android:layout_weight="1"
        android:textColor="#ffffff"
        android:text="Enter Yearly Interest Rate(%)"/>

    <EditText
        android:background="#D3D3D3"
        android:layout_height="wrap_content"
        android:layout_width="match_parent"
        android:layout_weight="1"/>

</LinearLayout>

    <LinearLayout
        android:orientation="horizontal"
        android:layout_height="wrap_content"
        android:layout_width="match_parent"
        android:layout_weight="2">

    <TextView
        android:layout_height="wrap_content"
        android:layout_width="match_parent"
        android:layout_weight="1"
        android:textColor="#ffffff"
        android:text="Enter Minimum Payment($)"/>

    <EditText
        android:background="#D3D3D3"
        android:layout_height="wrap_content"
        android:layout_width="match_parent"
        android:layout_weight="1"/>

</LinearLayout>

    <LinearLayout
        android:orientation="horizontal"
        android:layout_height="wrap_content"
        android:layout_width="match_parent"
        android:layout_weight="1">

    <TextView
        android:layout_height="wrap_content"
        android:layout_width="match_parent"
        android:layout_weight="1"
        android:textColor="#ffffff"
        android:text="Final Card Balance($)"/>

    <EditText
        android:background="#D3D3D3"
        android:layout_height="wrap_content"
        android:layout_width="match_parent"
        android:layout_weight="1"/>

</LinearLayout>

    <LinearLayout
        android:orientation="horizontal"
        android:layout_height="wrap_content"
        android:layout_width="match_parent"
        android:layout_weight="1">

    <TextView
        android:layout_height="wrap_content"
        android:layout_width="match_parent"
        android:layout_weight="1"
        android:textColor="#ffffff"
        android:text="Months Remaining"/>

    <EditText
        android:background="#D3D3D3"
        android:layout_height="wrap_content"
        android:layout_width="match_parent"
        android:layout_weight="1"/>

</LinearLayout>

    <LinearLayout
        android:orientation="horizontal"
        android:layout_height="wrap_content"
        android:layout_width="match_parent"
        android:layout_weight="2">

    <TextView
        android:layout_height="wrap_content"
        android:layout_width="match_parent"
        android:layout_weight="1"
        android:textColor="#ffffff"
        android:text="Interest Paid Will Be($)"/>

    <EditText
        android:background="#D3D3D3"
        android:layout_height="wrap_content"
        android:layout_width="match_parent"
        android:layout_weight="1"/>

</LinearLayout>

    <LinearLayout
        android:orientation="vertical"
        android:layout_height="wrap_content"
        android:layout_width="match_parent"
        android:layout_weight="1">

    <Button
        android:background="#ffffff"
        android:layout_height="wrap_content"
        android:layout_width="match_parent"
        android:text="Compute"
        android:layout_marginBottom="10dp"/>

    <Button
        android:background="#ffffff"
        android:layout_height="wrap_content"
        android:layout_width="match_parent"
        android:text="Clear"/>

</LinearLayout>

</LinearLayout>
```

### Step 4: MainActivity

Here's the code for MainActivity:

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
| 1. | [Download](https://github.com/AnkitKumar111/Android_Assignment3.2/archive/refs/heads/master.zip) Example |
| 2. | [Follow](https://github.com/AnkitKumar111/) code author |

## Example 3: Simple LinearLayout Example

This is a dead simple linearylayout example to organize buttons linearly in a screen.

### Step 1: Dependenceis

No special dependenices are needed.

### Step 2: Design Layout

Addd buttons inthe screen and arrange them using linearlayout:

```xml
<?xml version="1.0" encoding="utf-8"?>
<LinearLayout xmlns:android="http://schemas.android.com/apk/res/android"
    xmlns:app="http://schemas.android.com/apk/res-auto"
    xmlns:tools="http://schemas.android.com/tools"
    android:layout_width="match_parent"
    android:orientation="vertical"
    android:weightSum="5"
    android:layout_height="match_parent"
    tools:context=".MainActivity">

    <Button
        android:background="@color/btn1"
        android:layout_weight="1"
        android:text="Button1"
        android:layout_width="match_parent"
        android:layout_height="wrap_content"
        />
      <Button
          android:background="@color/btn2"
          android:text="Button2"
          android:layout_weight="2"
          android:layout_width="match_parent"
          android:layout_height="wrap_content"
        />
      <Button
          android:background="@color/btn3"
          android:layout_weight="1"
          android:text="Button3"
          android:layout_width="match_parent"
          android:layout_height="wrap_content"
        />
      <Button
          android:background="@color/btn4"
          android:layout_weight="1"
          android:text="Button4"
          android:layout_width="match_parent"
          android:layout_height="wrap_content"
        />

</LinearLayout>
```

### Step 3: Write Code

Then finish by having your kotlin:

```kotlin
import androidx.appcompat.app.AppCompatActivity
import android.os.Bundle

class MainActivity : AppCompatActivity() {

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_main)
    }
}
```

### Run

Just copy the code and run in your android studio.

#### Designing Registeration Page with LinearLayout and ScrollView

Let's now create a registeration page with LinearLayout helping us arrange our edittexts, imageview, button, spinner and textview.

This is code that you can copy and use as a registeration page in your android project. Clearly you can see the importance and classic application of LinearLayout, it allows us arrange items linearly either vertically or horizontally.

```xml
<?xml version="1.0" encoding="utf-8"?>

<ScrollView

    android_id="@+id/content_main"
    android_layout_width="match_parent"
    android_layout_height="match_parent"
    android_orientation="vertical"
    android_background="@color/colorPrimary"
    app_layout_behavior="@string/appbar_scrolling_view_behavior"
    tools_context=".activities.RegisterActivity">

    <LinearLayout
        android_layout_width="match_parent"
        android_layout_height="wrap_content"
        android_orientation="vertical"
        android_paddingLeft="24dp"
        android_paddingRight="24dp"
        android_paddingTop="56dp">

        <ImageView
            android_src="@drawable/ic_local_taxi_black_24dp"
            android_layout_width="72dp"
            android_layout_height="72dp"
            android_layout_marginBottom="24dp"
            android_layout_gravity="center_horizontal" />

        <!-- Email Label -->
        <android.support.design.widget.TextInputLayout
            android_id="@+id/user_email_wrapper_register"
            android_layout_width="match_parent"
            android_layout_height="wrap_content"
            android_layout_marginBottom="8dp"
            android_layout_marginTop="8dp">

            <EditText
                android_id="@+id/input_email"
                android_layout_width="match_parent"
                android_layout_height="wrap_content"
                android_hint="Email"
                android_inputType="textEmailAddress" />
        </android.support.design.widget.TextInputLayout>

        <!-- Password Label -->
        <android.support.design.widget.TextInputLayout
            android_id="@+id/user_password_wrapper"
            android_layout_width="match_parent"
            android_layout_height="wrap_content"
            android_layout_marginBottom="8dp"
            android_layout_marginTop="8dp">

            <EditText
                android_id="@+id/input_password"
                android_layout_width="match_parent"
                android_layout_height="wrap_content"
                android_hint="Password"
                android_inputType="textPassword" />

        </android.support.design.widget.TextInputLayout>

        <!-- Password Label -->
        <android.support.design.widget.TextInputLayout
            android_id="@+id/password_confirm_wrapper"
            android_layout_width="match_parent"
            android_layout_height="wrap_content"
            android_layout_marginBottom="8dp"
            android_layout_marginTop="8dp">

            <EditText
                android_id="@+id/input_password_confirm"
                android_layout_width="match_parent"
                android_layout_height="wrap_content"
                android_hint="Confirm Password"
                android_inputType="textPassword" />

        </android.support.design.widget.TextInputLayout>
        <!--First name label-->
        <android.support.design.widget.TextInputLayout
            android_id="@+id/user_first_name_wrapper"
            android_layout_width="match_parent"
            android_layout_height="wrap_content"
            android_layout_marginBottom="8dp"
            android_layout_marginTop="8dp">

            <EditText
                android_id="@+id/input_name"
                android_layout_width="match_parent"
                android_layout_height="wrap_content"
                android_hint="First name"
                android_inputType="textPersonName"

                />

        </android.support.design.widget.TextInputLayout>

        <!--Last Name label-->
        <android.support.design.widget.TextInputLayout
            android_id="@+id/user_last_name_wrapper"
            android_layout_width="match_parent"
            android_layout_height="wrap_content"
            android_layout_marginBottom="8dp"
            android_layout_marginTop="8dp">

            <EditText
                android_id="@+id/input_last_name"
                android_layout_width="match_parent"
                android_layout_height="wrap_content"
                android_hint="Last name"
                android_inputType="textPersonName"

                />
        </android.support.design.widget.TextInputLayout>
        <!--Route wrapper-->
        <android.support.design.widget.TextInputLayout
            android_id="@+id/user_route_wrapper"
            android_layout_width="match_parent"
            android_layout_height="wrap_content"
            android_layout_marginBottom="8dp"
            android_layout_marginTop="8dp">

            <TextView
                android_layout_width="wrap_content"
                android_layout_height="wrap_content"
                android_text="Route:"
                android_textSize="20sp"
                />

            <Spinner
                android_id="@+id/SpinnerRoute"
                android_layout_width="fill_parent"
                android_layout_height="wrap_content"
                android_prompt="@string/RouteType"
                android_entries="@array/RouteList"
                >
            </Spinner>

        </android.support.design.widget.TextInputLayout>

        <!--Vehicle Type-->
        <android.support.design.widget.TextInputLayout
            android_id="@+id/vehicle_type_wrapper"
            android_layout_width="match_parent"
            android_layout_height="wrap_content"
            android_layout_marginBottom="8dp"
            android_layout_marginTop="8dp">

            <TextView
                android_layout_width="wrap_content"
                android_layout_height="wrap_content"
                android_text="Vehicle Type:"
                android_textSize="20sp"
                />
            <Spinner
                android_id="@+id/SpinnerVehicleType"
                android_layout_width="fill_parent"
                android_layout_height="wrap_content"
                android_prompt="@string/VehicleType"
                android_entries="@array/VehicleTypeList">

            </Spinner>

        </android.support.design.widget.TextInputLayout>

        <android.support.v7.widget.AppCompatButton
            android_id="@+id/btn_signup"
            android_layout_width="fill_parent"
            android_layout_height="wrap_content"
            android_layout_marginBottom="24dp"
            android_background="@color/colorPrimaryDark"
            android_layout_marginTop="24dp"
            android_padding="12dp"
            android_text="Register" />

        <TextView android_id="@+id/link_login"
            android_layout_width="fill_parent"
            android_layout_height="wrap_content"
            android_layout_marginBottom="24dp"
            android_textColor="#ffffff"
            android_text="Already a member? Login"
            android_gravity="center"
            android_textSize="16dip"/>

    </LinearLayout>
</ScrollView>
```

#### Programmatic Instantiation of LinearLayout

There are two important classes when thinking about working with a LinearLayout programmatically.

First is the `LinearLayout` class itself and secondly the `LayoutParams` class.

So we instantiate both. Take note of the parameters we are passing to our LayoutParams, the first being the width which in our case we get from the `SwipeItem`, secondly is the `LayoutParams.MATCH_PARENT` which specifies that the target view will match that of it's parent.

Then we set the LinearLayout parameters loke id, gravity, orientation,params, background image and even the onClickListener.

```java
private void addItem(SwipeMenuItem item, int id) {
    LayoutParams params = new LayoutParams(item.getWidth(),
            LayoutParams.MATCH_PARENT);
    LinearLayout parent = new LinearLayout(getContext());
    parent.setId(id);
    parent.setGravity(Gravity.CENTER);
    parent.setOrientation(LinearLayout.VERTICAL);
    parent.setLayoutParams(params);
    parent.setBackgroundDrawable(item.getBackground());
    parent.setOnClickListener(this);

    addView(parent);

    if (item.getIcon() != null) {
        parent.addView(createIcon(item));
    }
    if (!TextUtils.isEmpty(item.getTitle())) {
        parent.addView(createTitle(item));
    }

}
```

##### How to create a custom bottom navigation view using a LinearLayout

Let's start by creating a layout, let's call it `nav_bar.xml`.

At the root we have a `LinearLayout` with vertical orientation. We'll have a generic `View` obect. Then below it we define another `LinearLayout` with a nested `RelativeLayout` containing `ImageView` for our left button and a `View` for our divider.

We'll also have another ImageView with a red dot image.

We'll have a button at middle of our navigation bar and lastly an imageview to represent our right button.

```xml
<?xml version="1.0" encoding="utf-8"?>
<LinearLayout

    android_orientation="vertical"
    android_layout_width="match_parent"
    android_layout_height="wrap_content">

    <View
        android_layout_width="match_parent"
        android_layout_height="0dp"
        android_background="@color/colorPrimary"/>

    <LinearLayout
        android_layout_width="match_parent"
        android_layout_height="wrap_content">

        <RelativeLayout
            android_layout_width="0dp"
            android_layout_weight="2"
            android_layout_height="50dp">
            <ImageView
                android_id="@+id/nav_button_left"
                android_layout_width="wrap_content"
                android_layout_height="50dp"
                android_layout_centerInParent="true"
                android_src="@mipmap/icon_order_0"
                android_clickable="true"/>
            <View
                android_id="@+id/nav_divider_1"
                android_layout_width="8dp"
                android_layout_height="match_parent"
                android_layout_centerHorizontal="true"/>

            <ImageView
                android_id="@+id/nav_red_dot"
                android_layout_width="10dp"
                android_layout_height="10dp"
                android_src="@mipmap/icon_red_dot"
                android_layout_toRightOf="@id/nav_divider_1"
                android_layout_marginTop="5dp"
                />
        </RelativeLayout>

        <ImageView
            android_id="@+id/nav_button_middle"
            android_layout_weight="1"
            android_layout_width="0dp"
            android_layout_height="match_parent"
            android_src="@drawable/button_add_order"
            android_clickable="true"/>

        <RelativeLayout
            android_layout_width="0dp"
            android_layout_weight="2"
            android_layout_height="50dp">
            <ImageView
                android_id="@+id/nav_button_right"
                android_layout_width="wrap_content"
                android_layout_height="50dp"
                android_src="@mipmap/icon_me_0"
                android_layout_centerInParent="true"
                android_clickable="true"/>
        </RelativeLayout>

    </LinearLayout>

</LinearLayout>
```

Then we come create our class, in this case we called it `NavigationView`. We'll have it derive from `LinearLayout`.

As instance fields we'll have:

1. Left Button - Imageview.
2. Middle Button - ImageView.
3. Right Button - ImageView.
4. Red Dot - ImageView.

Then our constructor will receive a Context and an `AttributeSet` object. Then pass them to the super class, in this case the `LinearLayout` class, via the `super()` method.

Then next we inflate our `nav_bar.xml` layout using the LayoutInflater class.

Then we reference the imageviews we defined above.

Then set their image resources via the `setImageResource()` method.

Here's the full code:

```java
import android.content.Context;
import android.util.AttributeSet;
import android.view.LayoutInflater;
import android.widget.ImageView;
import android.widget.LinearLayout;

import with . jshaz . daigo . R ;

/**
 * Bottom navigation bar View
 */

public class NavigationView extends LinearLayout {

    private ImageView btnLeft, btnMiddle, btnRight, redDot;

    public NavigationView(Context context, AttributeSet attr) {

        super(context, attr);

        LayoutInflater.from(context).inflate(R.layout.nav_bar, this);

        btnLeft = (ImageView) findViewById(R.id.nav_button_left);
        btnMiddle = (ImageView) findViewById(R.id.nav_button_middle);
        btnRight = (ImageView) findViewById(R.id.nav_button_right);
        redDot = (ImageView) findViewById(R.id.nav_red_dot);

        btnLeft.setImageResource(R.mipmap.icon_order_1);
        btnRight.setImageResource(R.mipmap.icon_me_0);

        setRedDot ( false );

    }

    public void setBtnLeftDown() {
        btnLeft.setImageResource(R.mipmap.icon_order_1);
        btnRight.setImageResource(R.mipmap.icon_me_0);
    }

    public void setBtnRightDown() {
        btnLeft.setImageResource(R.mipmap.icon_order_0);
        btnRight.setImageResource(R.mipmap.icon_me_1);
    }

    public void buttonLeftSetListener(OnClickListener listener) {
        btnLeft.setOnClickListener(listener);
    }

    public void buttonRightSetListener(OnClickListener listener) {
        btnRight.setOnClickListener(listener);
    }

    public void buttonMiddleSetListener(OnClickListener listener) {
        btnMiddle.setOnClickListener(listener);
    }

    public void setButtonMiddleEnabled(boolean b) {
        int state = (b == true) ? VISIBLE : GONE;
        btnMiddle.setVisibility(state);
    }

    public void setAllButtonEnabled(boolean b) {
        btnLeft.setClickable(b);
        btnRight.setClickable(b);
        btnMiddle.setClickable(b);
    }

    public void setRedDot(boolean b) {
        if (b) {
            redDot.setVisibility(VISIBLE);
        } else {
            redDot.setVisibility(GONE);
        }
    }

    public ImageView getBtnLeft() {
        return btnLeft;
    }

    public ImageView getBtnMiddle() {
        return btnMiddle;
    }

    public ImageView getBtnRight() {
        return btnRight;
    }

    public ImageView getRedDot () { return redDot ; }
}
```

Then let's say we want to use our custom `Bottom NavigationView` with a [fragment](https://camposha.info/android/fragment).

First assume you have an `activity_main.xml` layout. And that layout has our `navigationView` defined as an element.

```xml
<LinearLayout
        android_orientation="vertical"
        android_layout_width="match_parent"
        android_layout_height="match_parent">
        ....

        <com.jshaz.daigo.ui.NavigationView
            android_id="@+id/client_main_navbar"
            android_layout_width="match_parent"
            android_layout_height="wrap_content">

        </com.jshaz.daigo.ui.NavigationView>
        ....
    </LinearLayout>
```

Then inside the `onCreate()` method you can start by referencing the `NavigationView`:

```java
    NavigationView navigationView = (NavigationView) findViewById(R.id.client_main_navbar);
```

Then continue:

```java
        /* Turn on the availability of the middle button */
        navigationView . setButtonMiddleEnabled ( true );
```

Then:

```java

        / * Listen for events left button of the navigation bar * /
        navigationView . ButtonLeftSetListener ( new new View . OnClickListener () {
            @Override public void onClick ( View View ) {
                navigationView .SetBtnLeftDown ();
                    //replaceFragment(orderFragment, SLIDE_FROM_LEFT_TO_RIGHT);
            }
        });

        /* Listen for  click event for navigation bar middle button */
        navigationView . ButtonMiddleSetListener ( new new View . OnClickListener () {
            @Override public void onClick ( View View ) {
                //replace fragment
            }
        });

        /*Listening to the click event of the right button of the navigation bar*/
        navigationView.buttonRightSetListener(new View.OnClickListener() {
            @Override
            public void onClick(View view) {
                navigationView.setBtnRightDown();
                // replace fragment

            }
        });
```

## Example 4: Let’s Create a Custom Percentage ProgressBar using LinearLayout

_Android Custom Percentage ProgressBar Creation Tutorial based on LinearLayout_

Sometimes you just want to churn out your own solutions instead of using classes that have been supplied. Those supplied classes are always generic, attempting to cover for everybody. Hence many times you need to be able to create a custom widget yourself.

In this tutorial we see how to do a custom percentage progressbar.

##### Demo

Here's the gif demo of the project:

<iframe width="788" height="443" src="https://www.youtube.com/embed/HIaQOIl3jCk" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>

##### Video Tutorial

Here's the video tutorial. It contains more detailed step by step explanations.:

#### Gradle Scripts

##### (a) Build.gradle

Nothing special. No third party dependency.

```groovy
dependencies {
    implementation fileTree(dir: 'libs', include: ['*.jar'])
    testImplementation 'junit:junit:4.12'
    implementation 'com.android.support:appcompat-v7:28.0.0'

}
```

#### Layouts

Lets start by exploring the layouts in this project.

We have seven layouts:

##### 1\. activity_main.xml

This is our main and only layout.

```xml
<?xml version="1.0" encoding="utf-8"?>
<RelativeLayout

    android_layout_width="match_parent"
    android_layout_height="match_parent"
    tools_context=".MainActivity">

    <info.camposha.creatingpercentageprogressbar.PercentageProgressBar
        android_id="@+id/mPercentageProgressBar"
        android_layout_width="match_parent"
        android_layout_height="wrap_content"
        app_hint="Percentage ProgressBar"
        app_showHint="true"/>

</RelativeLayout>
```

NB/= Remember to Replace `info.camposha.creatingpercentageprogressbar` with your own package name.

##### (b). percentage_progressbar.xml

This is the XML that will define for us our custom percentage progressbar. You can redefine it as you want.

```xml
<?xml version="1.0" encoding="utf-8"?>
<LinearLayout
              android_layout_width="match_parent"
              android_layout_height="match_parent"
              android_orientation="vertical">

    <RelativeLayout
        android_id="@+id/wrap_hint"
        android_visibility="gone"
        android_layout_width="match_parent"
        android_layout_height="wrap_content"
        android_layout_margin="5dp">

        <TextView
            android_id="@+id/text_hint"
            android_layout_width="wrap_content"
            android_layout_height="wrap_content"
            android_text="Percentage"
            android_textColor="@color/colorAccentProgress"
            android_textSize="12sp"/>

        <TextView
            android_id="@+id/text_percent"
            android_layout_width="wrap_content"
            android_layout_height="wrap_content"
            android_layout_alignParentEnd="true"
            android_layout_alignParentRight="true"
            android_text="0%"
            android_textColor="@color/colorAccentProgress"/>
    </RelativeLayout>

    <EditText
        android_id="@+id/percentageTxt"
        android_layout_width="match_parent"
        android_layout_height="wrap_content"
        android_hint="Percentage"
        android_inputType="number"
        android_visibility="visible"/>

    <LinearLayout
        android_id="@+id/wrap_percent"
        android_layout_width="match_parent"
        android_layout_height="5dp"
        android_layout_margin="5dp"
        android_layout_marginTop="10dp"
        android_orientation="horizontal"
        android_visibility="gone"
        android_weightSum="100">

        <LinearLayout
            android_id="@+id/start_percent"
            android_layout_width="0dp"
            android_layout_height="match_parent"
            android_layout_weight="0"
            android_background="@color/colorAccentProgress"
            android_orientation="horizontal"/>

        <LinearLayout
            android_id="@+id/end_percent"
            android_layout_width="0dp"
            android_layout_height="match_parent"
            android_layout_weight="100"
            android_background="@android:color/darker_gray"
            android_orientation="horizontal"/>
    </LinearLayout>

</LinearLayout>
```

#### Styles

##### (a). attrs.xml

Create a value resource file. I named mine `attrs.xml`. Then add the following code. You can see it will contain the attributes for our PercentageProgressBar.

```xml
<?xml version="1.0" encoding="utf-8"?>
<resources>
    <declare-styleable name="PercentageProgressBar">
        <attr name="hint" format="string"/>
        <attr name="showHint" format="boolean"/>
        <attr name="heightPercent" format="dimension"/>
        <attr name="hideInputPercent" format="boolean"/>
        <attr name="percent" format="integer"/>
    </declare-styleable>
</resources>
```

#### Java Code.

We have the following java classes for this project:

1. PercentageProgressBar.java
2. MainActivity.java

##### PercentageProgressBar.java

This is how we create our PercentageProgressBar.

```java
package info.camposha.creatingpercentageprogressbar;

import android.content.Context;
import android.content.res.TypedArray;
import android.os.Handler;
import android.text.Editable;
import android.text.TextWatcher;
import android.util.AttributeSet;
import android.view.LayoutInflater;
import android.widget.EditText;
import android.widget.LinearLayout;
import android.widget.RelativeLayout;
import android.widget.TextView;

import static android.view.Gravity.START;

public class PercentageProgressBar extends LinearLayout {

    private RelativeLayout hintRelativeLayout;
    private TextView hintTV;
    private TextView percentageTV;
    private EditText percentageTxt;

    private LinearLayout mWrapPercent;
    private LinearLayout mStartPercent;
    private LinearLayout mEndPercent;

    private boolean showHint;
    private boolean hide_input_percent;

    /**
     * We have two constructors.
     * @param context
     */
    public PercentageProgressBar(Context context) {
        this(context, null);
    }
    public PercentageProgressBar(Context context, AttributeSet attrs) {
        super(context, attrs);
        setOrientation(VERTICAL);
        setGravity(START);
        init(context, attrs);
        this.isInEditMode();
    }

    /**
     * We reference widgets used in this custom percentageProgressBar we
     * are creating.
     */
    private void referenceWidgets(){
        percentageTxt = findViewById(R.id.percentageTxt);
        hintTV = findViewById(R.id.text_hint);
        percentageTV = findViewById(R.id.text_percent);
        mWrapPercent = findViewById(R.id.wrap_percent);
        mStartPercent = findViewById(R.id.start_percent);
        mEndPercent = findViewById(R.id.end_percent);
        hintRelativeLayout = findViewById(R.id.wrap_hint);
    }

    /**
     * We can now use our LayoutInflater class to inflate our Percentage
     * ProgressBar from a layout.
     * @param context
     */
    private void inflatePercentageProgressBar(Context context){
        LayoutInflater inflater = (LayoutInflater) context
                .getSystemService(Context.LAYOUT_INFLATER_SERVICE);
        inflater.inflate(R.layout.percentage_progressbar, this, true);
    }

    /**
     * Let's obtain our style from attrs.xml, hold it in a typed array,
     * obtain several attributes like height,percent,hint etc from that
     * typedArray before recyc;ing it.
     * @param context
     * @param attrs
     */
    private void resolveAttributes(Context context,AttributeSet attrs){
        TypedArray typedArray = context.obtainStyledAttributes(attrs,
        R.styleable.PercentageProgressBar, 0, 0);

        String hint = typedArray.getString(R.styleable.PercentageProgressBar_hint);
        showHint = typedArray.getBoolean(R.styleable.PercentageProgressBar_showHint,
         false);
        hide_input_percent = typedArray.getBoolean(
            R.styleable.PercentageProgressBar_hideInputPercent, false);

        float height = typedArray.getDimension(
            R.styleable.PercentageProgressBar_heightPercent, 5f);
        int percent = typedArray.getInteger(R.styleable.PercentageProgressBar_percent, 0);

        typedArray.recycle();
        this.referenceWidgets();

        percentageTxt.setHint(hint);
        hintTV.setText(hint);

        if (height > 5) {setHeightPercent(Math.round(height));}
        if (hide_input_percent) {hideInputPercent();}
        if (percent > 0) {setPercent(percent);}
    }

    /**
     * Let's listen to input events to our edittext, thus updating our
     * percentage progressbar
     */
    private void handlePercetTextChangeEvents(){
        percentageTxt.addTextChangedListener(
                new TextWatcher() {
                    @Override public void afterTextChanged(Editable s) {
                        if (s.length() > 0) {
                            showPercent(percentageTxt.getText().toString());
                        } else {
                            showPercent("0");
                        }
                    }
                    @Override public void beforeTextChanged(CharSequence s, int start,
                    int count, int after) {
                    }
                    @Override public void onTextChanged(CharSequence s, int start,
                    int before, int count) {
                    }
                });
    }

    /**
     * Let's invoke the methods we've created above
     * @param context
     * @param attrs
     */
    private void init(Context context, AttributeSet attrs) {
        this.inflatePercentageProgressBar(context);
        this.resolveAttributes(context,attrs);
        this.handlePercetTextChangeEvents();
    }

    /**
     * Let's create a method to set progressbar height. Height as in vertical
     * height, like thickness.
     * @param height
     */
    public void setHeightPercent(int height) {
        //LayoutParams is a static class that holds information associated
        //with a given viewgroup. In this case our viewgroup is LinearLayout
        LayoutParams height_params = (LayoutParams) mWrapPercent.getLayoutParams();
        height_params.height = height;
        mWrapPercent.setLayoutParams(height_params);
    }

    /**
     * Let;s create a method to receive a percentage as a string, convert it
     * to integer then show it.
     * @param percentageString
     */
    private void showPercent(String percentageString) {
        //let's turn percentage string to integer
        int percentage = Integer.parseInt(percentageString);
        if (percentage == 0) {
            mWrapPercent.setVisibility(GONE);
            hintRelativeLayout.setVisibility(GONE);
        } else {
            setAnimatePercent(percentage, 0, mStartPercent);
            LayoutParams percent_end = (LayoutParams) mEndPercent.getLayoutParams();
            percent_end.weight = 100;
            mEndPercent.setLayoutParams(percent_end);
            mWrapPercent.setVisibility(VISIBLE);
            if (showHint) {
                hintRelativeLayout.setVisibility(VISIBLE);
            }
        }
    }

    /**
     * Let's create a method to set our percentage to our edittext
     * @param percent
     */
    public void setPercent(int percent) {
        showPercent("" + percent);
        percentageTxt.setText("" + percent);
    }

    /**
     * Let's create a method to set animated percentage to a textview
     * @param percent
     * @param position
     * @param view
     */
    private void setAnimatePercent(final int percent, final int position,
    final LinearLayout view) {
        final LayoutParams percent_start = (LayoutParams) mStartPercent.getLayoutParams();
        final int index = position + 1;
        new Handler().postDelayed(new Runnable() {
            @Override public void run() {
                if (position < percent) {
                    percent_start.weight = index;
                    view.setLayoutParams(percent_start);
                    percentageTV.setText("" + index + "%");
                    setAnimatePercent(percent, index, view);
                }
            }
        }, 1);
    }

    /**
     * Method to allow us show hint
     */
    public void showHint() {
        this.showHint = true;
    }

    /**
     * Method to allow us hide percent
     */
    public void hideInputPercent() {
        percentageTxt.setVisibility(GONE);
    }
}
//end
```

##### MainActivity.java

Our main activity class. It is here where we use our LoveView we had created.

```java
package info.camposha.creatingpercentageprogressbar;

import android.support.v7.app.AppCompatActivity;
import android.os.Bundle;

public class MainActivity extends AppCompatActivity {

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);

        PercentageProgressBar percentageProgressBar = findViewById(
            R.id.mPercentageProgressBar);
        percentageProgressBar.setPercent(30);
        percentageProgressBar.setHeightPercent(15);

    }
}
```

##### Download

You can download the full source code below or watch the video from the link provided.

| No. | Location | Link |
| --- | --- | --- |
| 1. | GitHub | [Direct Download](https://github.com/Oclemy/CustomPercentageProgressBar/archive/master.zip) |
| 2. | GitHub | [Browse](https://github.com/Oclemy/CustomPercentageProgressBar) |
| 3. | YouTube | [Video Tutorial](https://www.youtube.com/watch?v=HIaQOIl3jCk) |
| 4. | YouTube | [ProgrammingWizards TV Channel](http://www.youtube.com/c/programmingwizards) |
