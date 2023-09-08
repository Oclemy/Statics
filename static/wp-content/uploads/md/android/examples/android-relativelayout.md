# Android RelativeLayout Tutorial and Examples


_RelativeLayout is a viewgroup that arranges it's views relative to each other._

RelativeLayout is very powerful when designing a user interface because it can eliminate nested view groups and keep your layout hierarchy flat, which improves performance.

In RelativeLayout you can define the positions of child views in relation to the each other or to the parent.

Each child element in RelativeLayout is laid out in relation to other child elements.

Relationships within this ViewGroup can be established so that children will start themselves where a previous child ends.

Children can relate only to elements that are listed before them. So, build your dependency from the beginning of the XML file to the end. Note that IDs are required so that widgets can reference each other.

Relative layout resides in the android.widget package:

```java
package android.widget;
```

It's actually a ViewGroup in that it derives from `android.view.ViewGroup` class:

```java
 public class RelativeLayout extends ViewGroup{}
```

#### How do we Position Widgets using RelativeLayout?

`RelativeLayout` allows its child views to define their position relative to the parent view or to each other (specified by ID).

This then allows you to align two elements by right border, or make one below another, centered in the screen, centered left, and so on.

By default, all child views are drawn at the top-left of the layout, so you must define the position of each view using the various layout properties available from `RelativeLayout.LayoutParams`.

#### What are some of the Advantages of RelativeLayout?

RelativeLayout has the following main advantages:

1. It's very flexible and easy to use and can be produce many layout designs as compared to the others.
2. RelativeLayout can eliminate the need to nest different layouts just to achiece a given design.
3. RelativeLayout's flat hierarchy therefore leads to improved performance that would otherwise be negatively affected with nested layouts.

#### Which are the subclasses of RelativeLayout?

RelativeLayout has 3 direct subclasses:

| No. | SubClass | Description |
| --- | --- | --- |
| 1. | SearchBar | SearchBar is a search widget that contains a search orb and a text entry view. |
| 2. | PercentRelatieLayout | This class extends from RelativeLayout and also allows you use percentage-based dimensions and margins. |
| 3. | DialFilter | RelativeLayout child that provides several methods and constants to filter digits, letters etc in the dialing app. |

#### The `RelativeLayout.LayoutParams` class.

To understand and explore the attributes used with relativelayout, it is important we explore this static class.

Why? Well because it is where those attributes are defined.

However note that it's an inner class and is defined inside the `RelativeLayout` class.

`RelativeLayout.LayoutParams` derives from `ViewGroup.MarginLayoutParams`.

```java
public static class RelativeLayout.LayoutParams extends ViewGroup.MarginLayoutParams {...}
```

Here's its API definition:

```java
java.lang.Object
   ↳    android.view.ViewGroup.LayoutParams
       ↳    android.view.ViewGroup.MarginLayoutParams
           ↳    android.widget.RelativeLayout.LayoutParams
```

The main role of the `RelativeLayout.LayoutParams` class is to specify how a view is positioned within a RelativeLayout.

The relative layout containing the view will use the value of these layout parameters to determine where to position the view on the screen. If the view is not contained within a relative layout, these attributes are ignored.

Here are the attributes defined in the`RelativeLayout.LayoutParams`. These attributes can definitely be used in the `RelativeLayout` element.

| No. | Attribute | Description |
| --- | --- | --- |
| 1. | `android:layout_above` | Positions the bottom edge of this view above the given anchor view ID. |
| 2. | `android:layout_alignBaseline` | Positions the baseline of this view on the baseline of the given anchor view ID. |
| 3. | `android:layout_alignBottom` | Makes the bottom edge of this view match the bottom edge of the given anchor view ID. |
| 4. | `android:layout_alignEnd` | Makes the end edge of this view match the end edge of the given anchor view ID. |
| 5. | `android:layout_alignLeft` | Makes the left edge of this view match the left edge of the given anchor view ID. |
| 6. | `android:layout_alignParentBottom` | If true, makes the bottom edge of this view match the bottom edge of the parent. |
| 7. | `android:layout_alignParentEnd` | If true, makes the end edge of this view match the end edge of the parent. |
| 8. | `android:layout_alignParentLeft` | If true, makes the left edge of this view match the left edge of the parent. |
| 9. | `android:layout_alignParentRight` | If true, makes the right edge of this view match the right edge of the parent. |
| 10. | `android:layout_alignParentStart` | If true, makes the start edge of this view match the start edge of the parent. |
| 11. | `android:layout_alignParentTop` | If true, makes the top edge of this view match the top edge of the parent. |
| 12. | `android:layout_alignRight` | Makes the right edge of this view match the right edge of the given anchor view ID. |
| 13. | `android:layout_alignStart` | Makes the start edge of this view match the start edge of the given anchor view ID. |
| 14. | `android:layout_alignTop` | Makes the top edge of this view match the top edge of the given anchor view ID. |
| 15. | `android:layout_alignWithParentIfMissing` | If set to true, the parent will be used as the anchor when the anchor cannot be be found for `layout_toLeftOf`, `layout_toRightOf`, etc. |
| 16. | `android:layout_below` | Positions the top edge of this view below the given anchor view ID. |
| 17. | `android:layout_centerHorizontal` | If true, centers this child horizontally within its parent. |
| 18. | `android:layout_centerInParent` | If true, centers this child horizontally and vertically within its parent. |
| 19. | `android:layout_centerVertical` | If true, centers this child vertically within its parent. |
| 20. | `android:layout_toEndOf` | Positions the start edge of this view to the end of the given anchor view ID. |
| 21. | `android:layout_toLeftOf` | Positions the right edge of this view to the left of the given anchor view ID. |
| 22. | `android:layout_toRightOf` | Positions the left edge of this view to the right of the given anchor view ID. |
| 23. | `android:layout_toStartOf` | Positions the end edge of this view to the start of the given anchor view ID. |

The value for each layout property is either a boolean to enable a layout position relative to the parent RelativeLayout or an ID that references another view in the layout against which the view should be positioned.

Here's a simple relativelayout example:

```xml
<RelativeLayout

    android_layout_width="fill_parent"
    android_layout_height="fill_parent">
    <TextView
        android_id="@+id/textView1"
        android_layout_width="wrap_content"
        android_layout_height="wrap_content"
        android_text="TextView 1"/>
    <TextView
        android_id="@+id/textView2"
        android_layout_width="wrap_content"
        android_layout_height="wrap_content"
        android_text="TextView 2"
        android_layout_below="@id/textView1"/>
    <TextView
        android_id="@+id/textView3"
        android_layout_width="wrap_content"
        android_layout_height="wrap_content"
        android_text="TextView 3"
        android_layout_toRight="@id/textView2"/>
</RelativeLayout>
```

## Example 1: Design a Login Layout using RelativeLayout

This example teaches you how to design a functional login layout using RelativeLayout and widgets such as TextView, EditText and buttons.

Here is the demo screenshot:

![login_relativelayout](https://camposha.info/android-examples/wp-content/uploads/sites/9/2021/05/login_relativelayout.jpg)

### Step 1: Create Project

Start by creating an empty `Android Studio` project.

### Step 2: Dependencies

No special dependency is needed.

### Step 3: Design Layout

Design layout as follows:

**activity_main.xml**

```xml
<?xml version="1.0" encoding="UTF-8"?>

    <RelativeLayout
    android:background="@color/greenplusblue"
    tools:context=".MainActivity"
    android:paddingBottom="@dimen/activity_vertical_margin"
    android:paddingTop="@dimen/activity_vertical_margin"
    android:paddingRight="@dimen/activity_horizontal_margin"
    android:paddingLeft="@dimen/activity_horizontal_margin"
    android:layout_height="match_parent"
    android:layout_width="match_parent"
    android:id="@+id/activity_main"
    xmlns:tools="http://schemas.android.com/tools"
    xmlns:android="http://schemas.android.com/apk/res/android">

    <EditText
        android:background="@android:color/white"
        android:layout_height="30dp"
        android:layout_width="match_parent"
        android:id="@+id/editText2"
        android:layout_alignParentStart="true"
        android:layout_alignParentLeft="true"
        android:textColorHint="@color/lightgrey"
        android:hint="Email"
        android:layout_above="@+id/editText3"
        android:textColor="@android:color/background_dark"
        android:ems="10"
        android:inputType="textEmailAddress"/>

    <EditText
        android:background="@android:color/white"
        android:layout_height="30dp"
        android:layout_width="match_parent"
        android:id="@+id/editText3"
        android:layout_alignParentStart="true"
        android:layout_alignParentLeft="true"
        android:layout_marginTop="10dp"
        android:textColorHint="@color/lightgrey"
        android:hint="Password"
        android:layout_above="@+id/button"
        android:ems="10"
        android:inputType="textPassword"
        android:selectAllOnFocus="false"
        android:layout_marginBottom="22dp"/>

    <Button
        android:background="@color/lightgrey"
        android:layout_height="30dp"
        android:layout_width="match_parent"
        android:id="@+id/button"
        android:layout_centerHorizontal="true"
        android:layout_centerVertical="true"
        android:text="LOGIN"/>

    <TextView
        android:layout_height="wrap_content"
        android:layout_width="match_parent"
        android:id="@+id/textView"
        android:text="Not a member?Sign up now"
        android:layout_marginStart="98dp"
        android:layout_marginLeft="98dp"
        android:layout_alignParentStart="true"
        android:layout_alignParentLeft="true"
        android:layout_below="@+id/button"
        android:layout_marginTop="25dp"/>

</RelativeLayout>
```

### Step 4: MainActivity

Here's the MainActivity:

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
| 1. | [Download](https://github.com/AnkitKumar111/Android_Assignment4.1/archive/refs/heads/master.zip) Example |
| 2. | [Follow](https://github.com/AnkitKumar111/) code author |

#### Quick Relative Layout Examples and HowTo's

##### 1\. How to design a custom toolbar with RelativeLayout

First we will need to create a layout, say `tool_bar.xml`.

We have a `relativelayout` as our root element, the width will match the parent while take note that the height will only be `50dp` since this is a toolbar we are designing.

We will have a back button to the left. Then two textViews aligned vertically with our [LinearLayout](https://camposha.info/android/linearlayout).

Then an imageview to the right of the toolbar.

```xml
<RelativeLayout

    android_background="@color/colorPrimary"
    android_layout_width="match_parent"
    android_layout_height="50dp">

    <Button
        android_id="@+id/title_bar_back"
        android_layout_width="40dp"
        android_layout_height="40dp"
        android_layout_marginLeft="5dp"
        android_layout_centerVertical="true"
        android_layout_alignParentLeft="true"
        style="?borderlessButtonStyle"
        android_foreground="?android:attr/selectableItemBackground"/>

    <LinearLayout
        android_orientation="vertical"
        android_layout_width="wrap_content"
        android_layout_height="match_parent"
        android_layout_centerInParent="true">
        <TextView
            android_id="@+id/title_bar_text"
            android_layout_weight="1"
            android_layout_width="wrap_content"
            android_layout_height="wrap_content"
            android_layout_gravity="center"
            android_gravity="center"
            android_text="TITLE"
            android_textSize="20sp"
            android_textColor="#fff" />
        <TextView
            android_id="@+id/title_bar_campus"
            android_layout_width="wrap_content"
            android_layout_height="wrap_content"
            android_layout_marginBottom="3dp"
            android_textColor="#fff"
            android_textSize="10sp"
            android_layout_gravity="center"
            android_gravity="center"
            android_text="Software Campus"/>
    </LinearLayout>

    <ImageView
        android_id="@+id/title_bar_right_button"
        android_layout_width="40dp"
        android_layout_height="40dp"
        android_layout_marginRight="5dp"
        android_layout_centerVertical="true"
        android_layout_alignParentRight="true"
        android_clickable="true"
        android_foreground="?android:attr/selectableItemBackground"/>

</RelativeLayout>
```

Then we come and create a class, let's call it `ToolBarView`. This class will be deriving from the `relativelayout` class.

First as instance fields we will maintain a Button, TextViews and ImageView as widgets within our class.

Then we will create our constructor. This constructor has to take at least a Context object. In this case we will also pass an `AttributeSet` object.

Both will then be passed to the super class via the special `super()` method. Our super class in this case is the `RelativeLayout` class.

We will inflate our `R.layout.tool_bar` xml layout inside thei constructor. Then reference the widgets we mentioned above.

Here's the full code:

```java
import android.content.Context;
import android.util.AttributeSet;
import android.view.LayoutInflater;
import android.widget.Button;
import android.widget.ImageView;
import android.widget.RelativeLayout;
import android.widget.TextView;

/**
 * Custom controls for the title bar
 */

public class ToolBarView extends RelativeLayout{

    private Button backButton; //Return button
    private TextView titleText; //Title text
    private TextView titleCampus;
    private ImageView rightButton; //Right button

    public ToolBarView(Context context, AttributeSet attr) {

        super(context, attr);

        /**
         * Load the ToolBar layout file
         */
        LayoutInflater.from(context).inflate(R.layout.tool_bar, this);
        titleText = (TextView) findViewById(R.id.title_bar_text);
        backButton = (Button) findViewById(R.id.title_bar_back);
        rightButton = (ImageView) findViewById(R.id.title_bar_right_button);

        titleCampus = (TextView) findViewById(R.id.title_bar_campus);

        setBackButtonVisible(false);

        setTitleCampusVisible(false);

        rightButton.setEnabled(false);

    }

    /**
     * Set headline text
     * @param titleText
     */
    public void setTitleText(String titleText) {

        this.titleText.setText(titleText);

    }

    /**
     * Set the listen event for the back button
     * @param listener
     */
    public void setBackButtonOnClickListener(OnClickListener listener) {

        backButton.setOnClickListener(listener);

    }

    /**
     * Set the left button background image
     * @param resourceId
     */
    public void setBackButtonImage(int resourceId) {

        backButton.setBackgroundResource(resourceId);

    }

    /**
     * Set the right button background image
     * @param resourceId
     */
    public void setRightButtonImage(int resourceId) {

        rightButton.setBackgroundResource(resourceId);

    }

    /**
     * Set the right button to listen for events
     * @param listener
     */
    public void setRightButtonOnClickListener(OnClickListener listener) {

        rightButton.setEnabled(true);

        rightButton.setOnClickListener(listener);

    }

    public void setBackButtonVisible(boolean b) {
        int state;
        if (b) {
            state = VISIBLE;
        } else {
            state = GONE;
        }
        backButton.setVisibility(state);
    }

    public void setTitleCampusVisible(boolean b) {
        int state;
        if (b) {
            state = VISIBLE;
        } else {
            state = GONE;
        }
        titleCampus.setVisibility(state);
    }

    /**
     * Set the title bar name
     * @param campusCode
     */
    public void setTitleCampus(int campusCode) {
        titleCampus.setText(getCampusNameFromSomewhere(campusCode));
    }

    /**
     * Back button click event
     */
    public void callOnBackButtonClick() {
        backButton.callOnClick();
    }
}
```

Lastly let's see how we can use our `ToolBarView` as our toolbar. We need to do this in our activity.

But first you need to create a layout that will have our toolbar for our activity.

Let's say here's our `activity_main.xml` layout:

```xml
<?xml version="1.0" encoding="utf-8"?>
<LinearLayout
    android_orientation="vertical"

    android_layout_width="match_parent"
    android_layout_height="match_parent"
    tools_context="com.jshaz.daigo.EULAActivity">

    <com.jshaz.daigo.ui.ToolBarView
        android_id="@+id/eula_toolbar"
        android_layout_width="match_parent"
        android_layout_height="wrap_content"/>

    <WebView
        android_id="@+id/eula_webview"
        android_layout_width="match_parent"
        android_layout_height="match_parent"/>
</LinearLayout>
```

```java
public class MainActivity extends AppCompatActivity {

    private ToolBarView toolBarView;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);

        toolBarView = (ToolBarView) findViewById(R.id.eula_toolbar);

        toolBarView.setTitleText("Main Activity");
        toolBarView.setBackButtonImage(R.mipmap.icon_back);
        toolBarView.setBackButtonVisible(true);
        toolBarView.setBackButtonOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                finish();
            }
        });
    }
}
```

And that's it. We have created a custom toolbar from Relative layout.

##### 2\. How to create a Square RelativeLayout

First, let's have our `SquareHelper` class:

```java

import android.content.res.TypedArray;
import android.support.annotation.IntDef;
import android.util.AttributeSet;
import android.view.View;

import java.lang.annotation.Retention;
import java.lang.annotation.RetentionPolicy;

import online.sniper.R;

/**
 * Square view helper class
 * Created by wangpeihe on 2016/6/23.
 */
public class SquareHelper {

    publicstaticfinalintBASE_WIDTH=0;
    publicstaticfinalintBASE_HEIGHT=1;
    publicstaticfinalintBASE_MIN_EDGE=2;
    publicstaticfinalintBASE_MAX_EDGE=3;

    @IntDef({BASE_WIDTH, BASE_HEIGHT, BASE_MAX_EDGE, BASE_MIN_EDGE})
    @Retention(RetentionPolicy.SOURCE)
    public @interface SquareViewEdge {

    }

    private View mView;
    private int mBaseEdge = BASE_WIDTH;

    public SquareHelper(View view, AttributeSet attrs) {
        mView = view;
        TypedArray a = view.getContext().obtainStyledAttributes(attrs, R.styleable.SquareView);
        try {
            mBaseEdge = a.getInt(R.styleable.SquareView_baseEdge, BASE_WIDTH);
        } finally {
            a.recycle();
        }
    }

    public void setBaseEdge(@SquareViewEdge int baseEdge) {
        mBaseEdge = baseEdge;
    }

    public int getMeasuredSize() {
        switch (mBaseEdge) {
            caseBASE_WIDTH:
                return mView.getMeasuredWidth();
            caseBASE_HEIGHT:
                return mView.getMeasuredHeight();
            caseBASE_MIN_EDGE:
                return Math.min(mView.getMeasuredWidth(), mView.getMeasuredHeight());
            caseBASE_MAX_EDGE:
                return Math.max(mView.getMeasuredWidth(), mView.getMeasuredHeight());
            default:
                returnmView.getMeasuredWidth();
        }
    }

}
```

Then our `SquareRelativeLayout`

```java
import android.content.Context;
import android.util.AttributeSet;
import android.widget.RelativeLayout;

public class SquareRelativeLayout extends RelativeLayout {

    private final SquareHelper mHelper ;

    public SquareRelativeLayout(Context context) {
        this(context,null);
    }

    public SquareRelativeLayout(Context context, AttributeSet attrs) {
        super(context,attrs);
        mHelper=newSquareHelper(   this,attrs);
    }

    @Override
    protectedvoid onMeasure(intwidthMeasureSpec,intheightMeasureSpec){
        super.onMeasure(widthMeasureSpec,heightMeasureSpec);
        intsize=mHelper.getMeasuredSize();
        int sizeSpec = MeasureSpec.makeMeasureSpec(size, MeasureSpec.EXACTLY);
        super.onMeasure(sizeSpec, sizeSpec);
    }

}
```
