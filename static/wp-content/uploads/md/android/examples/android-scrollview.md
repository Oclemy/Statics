# ScrollView,NestedScrollView,HorizontalScrollView etc


In this piece we want to look at several scrollview variations or subclasses and how they are used. Here are the variations we cover so far:

1. ScrollView - Superclass
2. NestedScrollView - child class
3. HorizontalScrollView - child class
4. StickyScrollView - Child class and third party library.
5. ParallaxScrollView - child class and third party library


### 1\. ScrollView

_Android ScrollView Tutorials and Examples_

A ScrollView is an android layout that permits it's child views to be scrolled vertically. This is important because in many cases you need content to be scrolled. Normally adapterviews like [ListView](https://camposha.info/android/listview) and [recyclerview](https://camposha.info/android/recyclerview) have scrolling capability but not many views. Hence we don't use scrollview with them otherwise we get degraded performance.

With scrollview you only scroll up or down. However if you want horizontal scrolling then you can use the HorizontalScrollView.

Furthermore, ScrollView should only have one direct child. This then means that if you desire to add multiple children then use a ViewGroup like [relativelayout](https://camposha.info/android/relativelayout) or [LinearLayout](https://camposha.info/android/linearlayout). Then add those children to the viewgroup and the viewgroup to Scrollview.

_Android Engineeres are recommending that you use NestedScrollView instead of ScrollView for vertical scrolling._

_This is because the latter offers greater user interface flexibility and support for the material design scrolling patterns._

#### ScrollView API Definition

A scrollview as a class resides in the `android.widget` package and derives from FrameLayout:

```java
public class ScrollView extends FrameLayout
```

Here's the inheritance hierarchy of FrameLayout:

```java
java.lang.Object
   ↳    android.view.View
       ↳    android.view.ViewGroup
           ↳    android.widget.FrameLayout
               ↳    android.widget.ScrollView
```

#### Important ScrollView methods

**(a). scrollTo(int x, int y)**

In this method you pass the scrolled position of your view. This version also clamps the scrolling to the bounds of our child.

```java
    public static void scrollToUp(ScrollView scrollView) {
        scrollView.scrollTo(0, 0);
    }
```

**(b). smoothScrollTo(int x, int y)**

Like `scrollTo(int, int)`, but scroll smoothly instead of immediately.

```java
    public static void smoothScrollToUp(ScrollView scrollView) {
        scrollView.smoothScrollTo(0, 0);
    }
```

**(c). getChildAt(int index)**

This method will return the view at the specified position in the group.

```java
View child = scrollView.getChildAt(0);
```

**(d). getChildCount()**

This method returns the number of children in the group.

```java
int count = scrollView.getChildCount();
```

#### Quick ScrollView Examples

##### 1\. ScrollView - How to Scroll to the Top

Let's see how you can scroll to the top of your scrollview.

```java
    public static void scrollToUp(ScrollView scrollView) {
        scrollView.scrollTo(0, 0);
    }
```

##### 2\. How to Scroll to Down in ScrollView

Then we want to see also how we can scroll down to the bottom of our scrollview programmatically.

It's a static method and we pass `ScrollView` instance as a parameter. First we get the `height` of the scrollview as we as it's child counts.

At the end of the day we are still using the `scrollTo()` method, passing in the `x` and `y` positions.

```java
    public static void scrollToDown(ScrollView scrollView) {
        int y = scrollView.getHeight();
        int count = scrollView.getChildCount();
        if (count > 0) {
            View view = scrollView.getChildAt(count - 1);
            y = view.getBottom() + scrollView.getPaddingBottom();
        }
        scrollView.scrollTo(0, y);
    }
```

##### 3\. How to smooth scroll to up

We use the `smoothScrollTo()` method and pass the positions.

```java
    public static void smoothScrollToUp(ScrollView scrollView) {
        scrollView.smoothScrollTo(0, 0);
    }
```

##### 4\. How to smooth scroll to Down

Here's how we can scroll to down programmatically.

```java
    public static void smoothScrollToDown(ScrollView scrollView) {
        int y = scrollView.getHeight();
        int count = scrollView.getChildCount();
        if (count > 0) {
            View view = scrollView.getChildAt(count - 1);
            y = view.getBottom() + scrollView.getPaddingBottom();
        }
        scrollView.smoothScrollTo(0, y);
    }
```

##### 5\. How to calculate height of ScrollView by Child View

```java
    public static int calculaetHeightByView(ScrollView scrollView, View viewin) {
        int topAll = viewin.getTop();
        ViewParent p = viewin.getParent();
        while (p != null) {
            topAll += ((View) p).getTop();
            if (p instanceof NestedScrollView) {
                break;
            }
            p = p.getParent();
        }
        return topAll;
    }
```

##### 6\. How to create a scrollview with maximum height limit

What if we desire to set the maximum height limit to our scrollview. Well we can simply create a custom scrollview by deriving from the `android.widget.ScrollView` class, override our constructors as well as the `onMeasure()` method.

```java
import android.content.Context;
import android.util.AttributeSet;
import android.widget.ScrollView;

/**
 * ScrollView with maximum height limit
 */
public class MaxHeightScrollView extends ScrollView {

    private final MaxSizeHelper mHelper = new MaxSizeHelper();

    public MaxHeightScrollView(Context context) {
        this(context, null);
    }

    public MaxHeightScrollView(Context context, AttributeSet attrs) {
        super(context, attrs);
        if (isInEditMode()) {
            return;
        }
        mHelper.init(context, attrs);
    }

    @Override
    protected void onMeasure(int widthMeasureSpec, int heightMeasureSpec) {
        heightMeasureSpec = MeasureSpec.makeMeasureSpec(mHelper.getMaxHeight(), MeasureSpec.AT_MOST);
        super.onMeasure(widthMeasureSpec, heightMeasureSpec);
    }

    public void setMaxHeight(int maxHeight) {
        mHelper.setMaxHeight(maxHeight);
    }
}
```

##### 7\. Full ScrollView Example

Let's look a full scrollview example.

**(a). MainActivity.java**

```java

import android.os.Bundle;
import android.support.v7.app.ActionBarActivity;
import android.util.Log;
import android.view.MotionEvent;
import android.view.View;
import android.widget.Button;
import android.widget.ScrollView;
import android.widget.TextView;

public class MainActivity extends ActionBarActivity implements View.OnClickListener {

    private static final String TAG = "Main";
    private ScrollView scrollView;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);
        Final Text View textview = ( Text View ) findViewById ( R . id . txt );
        textView.setText(R.string.content);
        Button btnUp = (Button) findViewById(R.id.btn_up);
        Button btnDown = (Button) findViewById(R.id.btn_down);
        btnUp.setOnClickListener(this);
        btnDown.setOnClickListener(this);

        scrollView = (ScrollView) findViewById(R.id.scroll);
        scrollView.setOnTouchListener(new View.OnTouchListener() {
            @Override
            public boolean onTouch(View v, MotionEvent event) {
                switch (event.getAction()) {
                    case MotionEvent.ACTION_DOWN:
                        Log . d ( TAG , "Finger press, Y coordinate:" + scrollView . getScrollY ());
                        break;

                    case MotionEvent.ACTION_UP:
                        Log . d ( TAG , "Finger raised, Y coordinate:" + scrollView . getScrollY ());
                        break;

                    case MotionEvent.ACTION_MOVE:
                        /**
                         * scrollView.getScrollY(): vertical distance scrolled by ScrollView
                         * scrollView.getHeight(): the height of one screen
                         * scrollView.getChildAt(0).getMeasuredHeight(): the total height of the child tags inside the ScrollView
                         * Here is the total height of the TextView
                         *
                         */
                        Log . d ( TAG , "Finger swipe, Y coordinate:" + scrollView . getScrollY () +
                                "，scrollView.getHeight()：" +
                                scrollView.getHeight() +
                                "，scrollView.getChildAt(0).getMeasuredHeight()：" +
                                scrollView.getChildAt(0).getMeasuredHeight() +
                                "，scrollView.getMeasuredHeight()：" +
                                scrollView.getMeasuredHeight());

                        // Whether to slide to the bottom of the scroll bar: The total height of the TextView <= the height of a screen +
                        // The vertical distance of the ScrollView scroll
                        if (scrollView.getChildAt(0).getMeasuredHeight() <= scrollView.getHeight() +
                                scrollView.getScrollY()) {
                            Log . d ( TAG , "Already to the bottom bird!" );
                            textView.append(getResources().getString(R.string.content));
                        }
                }
                return false;
            }
        });

    }

    @Override
    public void onClick(View v) {

        /**
         * scrollTo: each time the relative distance is scrolled from the starting (X or Y axis) position
         * scrollBy: scroll from the last relative position
         */

        switch (v.getId()) {
            case R.id.btn_up:
                scrollView.scrollBy(0, -30);
                break;
            case R.id.btn_down:
                scrollView.scrollBy(0, 30);
        }
    }
}
```

**(b). activity_main.xml**

```xml
<LinearLayout xmlns:android="http://schemas.android.com/apk/res/android"
    xmlns:tools="http://schemas.android.com/tools"
    android:layout_width="match_parent"
    android:layout_height="match_parent"
    android:orientation="vertical"
    tools:context=".MainActivity">

    <Button
        android:id="@+id/btn_up"
        android:layout_width="wrap_content"
        android:layout_height="wrap_content"
        android:text="@string/up"/>
    <Button
        android:id="@+id/btn_down"
        android:layout_width="wrap_content"
        android:layout_height="wrap_content"
        android:text="@string/down"/>
    <ScrollView
        android:id="@+id/scroll"
        android:layout_width="wrap_content"
        android:layout_height="wrap_content">

        <TextView
            android:id="@+id/txt"
            android:text="@string/hello_world"
            android:layout_width="wrap_content"
            android:layout_height="wrap_content"/>

    </ScrollView>

</LinearLayout>
```

### 2\. NestedScrollView

_Android NestedScrollView Tutorials and Examples._

NestedScrollView is a ScrollView that is able to act as a nested scrolling parent and child on both new and old versions of Android.

Nested scrolling is enabled by default in NestedScrollView.

NestedScrollView is recommended in many cases over ScrollView.

This is due it's ability to offer greater user interface flexibility and support for the material design scrolling patterns.

#### NestedScrollView API Definition

NestedScrollView was added in android `version 22.1.0` and belongs to Maven artifact `com.android.support:support-compat:latest_version`.

Like ScrollView, nested scrollview derives from FrameLayout.

However it goes further and implements three scrolling interfaces:

1. NestedScrollingParent - an interface implemented by [ViewGroups(/android/viewgroup)] that wish to support scrolling operations delegated by a nested child view.
2. NestedScrollingChild2 - an interface implemented by View subclasses that wish to support dispatching nested scrolling operations to a cooperating parent ViewGroup.
3. ScrollingView - An interface that can be implemented by Views to provide scroll related APIs.

```java
public class NestedScrollView extends FrameLayout implements NestedScrollingParent, NestedScrollingChild2, ScrollingView
```

Here's the inheritance hierarchy for nestedscrollview:

```java
java.lang.Object
   ↳    android.view.View
       ↳    android.view.ViewGroup
           ↳    android.widget.FrameLayout
               ↳    android.support.v4.widget.NestedScrollView
```

You can find complete API reference [in android developer documenattion](https://developer.android.com/reference/android/support/v4/widget/NestedScrollView).

#### Quick NestedScrollView Examples

##### 1\. How to Calculate NestedScrollView Height by it's child view

```java
    public static int caculateHeightByView(NestedScrollView scrollView, View viewin) {
        int topAll = viewin.getTop();
        ViewParent p = viewin.getParent();
        while (p != null) {
            topAll += ((View) p).getTop();
            if (p instanceof NestedScrollView) {
                break;
            }
            p = p.getParent();
        }
        return topAll;
    }
```

### HorizontalScrollView

_Android HorizontalScrollView Tutorial and examples._

_A HorizontalScrollView is a Layout container for a view hierarchy that can be scrolled by the user, allowing it to be larger than the physical display._

You use HorizontalScrollView, as the name suggests, to scroll horizontally. If you want to scroll vertically then you can use ScrollView or even better NestedScrollView.

All these "ScrollViews", HorizontalScrollView included, derive from the FrameLayout.

Hence you should strive to place only a single child. Then that child can have multiple other views.

Alot of people love using [LinearLayout](https://camposha.info/android/linearlayout) with horizontal orientation. Thus providing a nice and easy way of showing and then scrolling through views arranged nicely horizontally.

Beware that some views are capable of handling their own scrolling. Such is the textView. So it doesn't require HorizontalScrollView.

#### HorizontalScrollView API Definition

HorizontalScrollView was added in `API level 3` so is actually than you might think.

We said it derives from FrameLayout

```java
public class HorizontalScrollView extends FrameLayout
```

Here's it's inheritance tree:

```java
java.lang.Object
   ↳    android.view.View
       ↳    android.view.ViewGroup
           ↳    android.widget.FrameLayout
               ↳    android.widget.HorizontalScrollView
```

#### HorizontalScrollView Examples

Coming soon.

### 4\. StickyScrollView

StickyScrollView is a library that provides you with a scrollview with a custom header and footer. It is really ideal for showing details, for example product details. As you may know scrollview is a layout that permits its children to be scrolled.

Well StickScrollview provides you with the same capability as scrollview but allows you to add a header and footer.

StickyScrollView is written in Java and extends ScrollView class:

```java
public class StickyScrollView extends ScrollView implements IStickyScrollPresentation {
    //...
```

#### Installation

StickScrollView is hosted in Maven jitpack so to install first go to your root level build/gradle and register jitpack as a repository:

```groovy
    allprojects {
        repositories {
            ...
            maven { url "https://jitpack.io" }
        }
    }
```

Then you add it as a dependency:

```groovy
    dependencies {
            implementation 'com.github.amarjain07:StickyScrollView:1.0.2'
    }
```

#### How to Use it

Well its a layout so its usage is very simple:

```xml
<com.amar.library.ui.StickyScrollView
        xmlns:app="http://schemas.android.com/apk/res-auto"
        android:layout_width="match_parent"
            android:layout_height="match_parent"
        app:stickyHeader="@+id/titleLayout"
            app:stickyFooter="@+id/buttonLayout">
        ...
        <LinearLayout
                    android:id="@+id/titleLayout"
                    android:layout_width="match_parent"
                    android:layout_height="wrap_content">
            ...
            </LinearLayout>
        <LinearLayout
                    android:id="@+id/buttonLayout"
                    android:layout_width="match_parent"
                    android:layout_height="wrap_content">
            ...
            </LinearLayout>
        ...
    </com.amar.library.ui.StickyScrollView>
```

#### Full Example

Well first install as instructed above. Then make sure your minimum API level is API 16 or above.

##### (a). activity_main.xml

```xml
<?xml version="1.0" encoding="utf-8"?>
<com.amar.library.ui.StickyScrollView xmlns:android="http://schemas.android.com/apk/res/android"
    xmlns:app="http://schemas.android.com/apk/res-auto"
    xmlns:tools="http://schemas.android.com/tools"
    android:id="@+id/scrollView"
    android:layout_width="match_parent"
    android:layout_height="match_parent"
    app:stickyFooter="@+id/buttons"
    app:stickyHeader="@+id/title"
    tools:context="com.amar.sample.MainActivity">

    <LinearLayout
        android:layout_width="match_parent"
        android:layout_height="wrap_content"
        android:orientation="vertical">

        <ImageView
            android:layout_width="match_parent"
            android:layout_height="420dp"
            android:src="@drawable/nike" />

        <View
            android:layout_width="match_parent"
            android:layout_height="0.1dp"
            android:background="@android:color/darker_gray" />

        <LinearLayout
            android:id="@+id/title"
            android:layout_width="match_parent"
            android:layout_height="wrap_content"
            android:background="@android:color/white"
            android:orientation="vertical"
            android:padding="15dp">

            <TextView
                android:layout_width="wrap_content"
                android:layout_height="wrap_content"
                android:text="Product Title"
                android:textStyle="bold" />

            <TextView
                android:layout_width="wrap_content"
                android:layout_height="wrap_content"
                android:text="Product Description goes here"
                android:textStyle="italic" />
        </LinearLayout>

        <View
            android:layout_width="match_parent"
            android:layout_height="0.1dp"
            android:background="@android:color/darker_gray" />

        <LinearLayout
            android:id="@+id/offer"
            android:layout_width="match_parent"
            android:layout_height="wrap_content"
            android:orientation="vertical"
            android:padding="15dp">

            <TextView
                android:layout_width="wrap_content"
                android:layout_height="wrap_content"
                android:text="Product Offer"
                android:textStyle="bold" />

            <TextView
                android:layout_width="wrap_content"
                android:layout_height="wrap_content"
                android:text="Product Offer Desc goes here"
                android:textStyle="italic" />
        </LinearLayout>

        <View
            android:layout_width="match_parent"
            android:layout_height="0.1dp"
            android:background="@android:color/darker_gray" />

        <LinearLayout
            android:layout_width="match_parent"
            android:layout_height="wrap_content"
            android:orientation="vertical"
            android:padding="15dp">

            <TextView
                android:layout_width="wrap_content"
                android:layout_height="wrap_content"
                android:text="Product Similar"
                android:textStyle="bold" />

            <TextView
                android:layout_width="wrap_content"
                android:layout_height="wrap_content"
                android:text="Similar goes here"
                android:textStyle="italic" />
        </LinearLayout>

        <LinearLayout
            android:id="@+id/buttons"
            android:layout_width="match_parent"
            android:layout_height="wrap_content">

            <TextView
                android:id="@+id/save"
                android:layout_width="match_parent"
                android:layout_height="match_parent"
                android:layout_weight="1"
                android:background="#535766"
                android:drawableLeft="@mipmap/ic_wishlist"
                android:gravity="center"
                android:padding="15dp"
                android:text="SAVE"
                android:textColor="@android:color/white"
                android:textSize="14sp" />

            <TextView
                android:id="@+id/buy"
                android:layout_width="match_parent"
                android:layout_height="match_parent"
                android:layout_weight="1"
                android:background="#0BC6A0"
                android:drawableLeft="@mipmap/ic_bag"
                android:gravity="center"
                android:maxLines="1"
                android:text="BUY"
                android:textColor="@android:color/white"
                android:textSize="14sp" />
        </LinearLayout>

        <LinearLayout
            android:layout_width="match_parent"
            android:layout_height="wrap_content"
            android:orientation="vertical"
            android:padding="15dp">

            <TextView
                android:layout_width="wrap_content"
                android:layout_height="wrap_content"
                android:text="Other product related info goes here!"
                android:textStyle="bold" />

            <TextView
                android:layout_width="wrap_content"
                android:layout_height="wrap_content"
                android:text="You can add more data here"
                android:textStyle="italic" />
        </LinearLayout>

        <View
            android:layout_width="match_parent"
            android:layout_height="0.1dp"
            android:background="@android:color/darker_gray" />

        <TextView
            android:layout_width="wrap_content"
            android:layout_height="wrap_content"
            android:padding="15dp"
            android:text="More colors"
            android:textStyle="bold" />

        <LinearLayout
            android:layout_width="match_parent"
            android:layout_height="wrap_content"
            android:orientation="horizontal">

            <ImageView
                android:layout_width="0dp"
                android:layout_height="220dp"
                android:layout_weight="1"
                android:src="@drawable/similar_1" />

            <ImageView
                android:layout_width="0dp"
                android:layout_height="620dp"
                android:layout_weight="1"
                android:src="@drawable/similar_2" />
        </LinearLayout>
    </LinearLayout>
</com.amar.library.ui.StickyScrollView>
```

##### (b). MainActivity.java

First add your imports, including the StickyScrollView library:

```java
import android.support.v7.app.AppCompatActivity;
import android.os.Bundle;
import android.view.View;
import android.widget.Toast;

import com.amar.library.ui.StickyScrollView;
```

Then create your activity class:

```java
public class MainActivity extends AppCompatActivity implements View.OnClickListener {
```

Define StickyScrollView as an instance field:

```java
   private StickyScrollView scrollView;
```

Reference views in your onCreate() method:

```java
    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);
        scrollView = (StickyScrollView) findViewById(R.id.scrollView);
        findViewById(R.id.buy).setOnClickListener(this);
        findViewById(R.id.save).setOnClickListener(this);
        findViewById(R.id.title).setOnClickListener(this);
    }
```

Now handle click events:

```java
    @Override
    public void onClick(View v) {
        switch (v.getId()) {
            case R.id.buy:
                Toast.makeText(this, scrollView.isFooterSticky() ? "Footer is Sticky" : "Footer is not sticky", Toast.LENGTH_SHORT).show();
                break;
            case R.id.save:
                Toast.makeText(this, scrollView.isFooterSticky() ? "Footer is Sticky" : "Footer is not sticky", Toast.LENGTH_SHORT).show();
                break;
            case R.id.title:
                Toast.makeText(this, scrollView.isHeaderSticky() ? "Header is Sticky" : "Header is not sticky", Toast.LENGTH_SHORT).show();
                break;
        }
    }
```

Here is the full code:

```java
package com.amar.sample;

import android.support.v7.app.AppCompatActivity;
import android.os.Bundle;
import android.view.View;
import android.widget.Toast;

import com.amar.library.ui.StickyScrollView;

public class MainActivity extends AppCompatActivity implements View.OnClickListener {
    private StickyScrollView scrollView;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);
        scrollView = (StickyScrollView) findViewById(R.id.scrollView);
        findViewById(R.id.buy).setOnClickListener(this);
        findViewById(R.id.save).setOnClickListener(this);
        findViewById(R.id.title).setOnClickListener(this);
    }

    @Override
    public void onClick(View v) {
        switch (v.getId()) {
            case R.id.buy:
                Toast.makeText(this, scrollView.isFooterSticky() ? "Footer is Sticky" : "Footer is not sticky", Toast.LENGTH_SHORT).show();
                break;
            case R.id.save:
                Toast.makeText(this, scrollView.isFooterSticky() ? "Footer is Sticky" : "Footer is not sticky", Toast.LENGTH_SHORT).show();
                break;
            case R.id.title:
                Toast.makeText(this, scrollView.isHeaderSticky() ? "Header is Sticky" : "Header is not sticky", Toast.LENGTH_SHORT).show();
                break;
        }
    }
}
```

Here is the demo:

![Android StickyScrollView](https://github.com/amarjain07/StickyScrollView/raw/master/demo/StickyScroll.gif)

Android StickyScrollView

Special thanks to [@amarjain07](https://github.com/amarjain07/StickyScrollView) for this awesome library and example.

[Download Example](https://github.com/amarjain07/StickyScrollView/archive/master.zip)

### 5\. Parallax Scroll

_Android Paralax Scroll Library Tutorial and Example._

ParallaxScroll is a library that provides us with Parallax ScrollView and [ListView](https://camposha.info/android/listview) for Android.

ParallaxScroll enriches us with these special adapterviews:

1. ParallaxListView.
2. ParallaxExpandableListView.
3. ParallaxScrollView.

This library was created by [Nir Hartmann](https://github.com/nirhart).

The library has existed for more than 5 years and is still actively maintained. It also has examples which we will explore later on.

ParallaxScroll supports `Android 1.6` and above.

#### Demo

![Android Parallax Scroll](https://camposha.info/wp-content/uploads/2019/12/demo1.png)

Android Parallax Scroll

See the demo app at Google Play [here](https://play.google.com/store/apps/details?id=com.nirhart.parallaxscrollexample).

#### ParallaxScrollView internal Details

Let's explore the internal specifics of Parallax before jumping to usage examples. We want to see the several classes from which the library is built so that we can even extend.

##### (a). ParallaxScrollView

This is class that internally derives from ScrollView.

You all know that a scrollview is a Layout container for a view hierarchy that can be scrolled by the user, allowing it to be larger than the physical display.

Like most View resources, `ParallaxScrollView` exposes three public constructors:

```java
    public ParallaxScrollView(Context context, AttributeSet attrs, int defStyle) {
    }

    public ParallaxScrollView(Context context, AttributeSet attrs) {
    }

    public ParallaxScrollView(Context context) {
    }
```

##### (a). ParallaxListView

`ParallaxListView` derives from the [ListView](https://camposha.info/android/listview) class:

```java
public class ParallaxListView extends ListView {..}
```

It also has three constructors we can use to create it's instance:

```java
    public ParallaxListView(Context context, AttributeSet attrs, int defStyle) {
    }

    public ParallaxListView(Context context, AttributeSet attrs) {
    }

    protected void init(Context context, AttributeSet attrs) {
    }
```

It goes ahead and exposes us some methods we can use apart from the normall ListView methods:

```java
    @Override
    public void setOnScrollListener(OnScrollListener l);

    public void addParallaxedHeaderView(View v);
    public void addParallaxedHeaderView(View v, Object data, boolean isSelectable) ;
```

##### (c). ParallaxExpandableListView

`ParallaxExpandableListView` adds parallax scroll to an ExpandableListView from which it derives.

```java
public class ParallaxExpandableListView extends ExpandableListView {..}
```

This class provides us two constructors for object creation:

```java
    public ParallaxExpandableListView(Context context, AttributeSet attrs, int defStyle) {
    }

    public ParallaxExpandableListView(Context context, AttributeSet attrs) {

    }
```

Here are some of the methods we can use apart from those we derive from ExpandableListView.

```java
    @Override
    public void setOnScrollListener(OnScrollListener l) {
    }

    public void addParallaxedHeaderView(View v) {
        super.addHeaderView(v);
    }

    public void addParallaxedHeaderView(View v, Object data, boolean isSelectable) {
    }
```

#### Installing ParallaxScroll

You can install ParallaxScroll from it's maven repository via gradle.

All you need in android 1.6 and above. Then you add the following implementation statement in your app level build.gradle:

```groovy
implementation 'com.github.nirhart:parallaxscroll:1.0'
```

Then you sync the project to add the library files into your project.

#### Using ParallaxScroll

Let's say you want to use a `ScrollView`, then you can add the following in your layout.

```xml
<com.nirhart.parallaxscroll.views.ParallaxScrollView xmlns:android="http://schemas.android.com/apk/res/android"
    xmlns:tools="http://schemas.android.com/tools"
    xmlns:app="http://schemas.android.com/apk/res-auto"
    android:layout_width="match_parent"
    android:layout_height="match_parent"
    app:parallax_factor="1.9"
    tools:context=".MainActivity" >

    <LinearLayout
        android:layout_width="match_parent"
        android:layout_height="wrap_content"
        android:orientation="vertical" >

        <TextView
            android:layout_width="match_parent"
            android:layout_height="200dp"
            android:background="@drawable/item_background"
            android:gravity="center"
            android:text="PARALLAXED"
            android:textSize="50sp"
            tools:ignore="HardcodedText" />

        <TextView
            android:layout_width="match_parent"
            android:layout_height="wrap_content"
            android:text="Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.    Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
            android:textSize="26sp"
            android:background="@android:color/white"
            android:padding="5dp"
            tools:ignore="HardcodedText" />
    </LinearLayout>

</com.nirhart.parallaxscroll.views.ParallaxScrollView>
```

In that case we've used a `ParallaxScrollView` and placed inside it a [LinearLayout](https://camposha.info/android/linearlayout) with Text content that will be scrolled.

Well you can also add a `ParallaxListView` and `ParallaxExpandableListView` in your layout.

#### Full ParallaxScroll Examples.

Here's an example.

##### 1\. Single Parallax ListView example.

Let's start by looking at a our SingleParallaxListView example.

##### (a). CustomListAdapter.java

We start by writing our adapter class. It will derive from BaseAdapter.

```java
package com.nirhart.parallaxscrollexample;

import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.BaseAdapter;
import android.widget.TextView;

public class CustomListAdapter extends BaseAdapter {

    private LayoutInflater inflater;

    public CustomListAdapter(LayoutInflater inflater) {
        this.inflater = inflater;
    }

    @Override
    public int getCount() {
        return 20;
    }

    @Override
    public Object getItem(int position) {
        return null;
    }

    @Override
    public long getItemId(int position) {
        return 0;
    }

    @Override
    public View getView(int position, View convertView, ViewGroup parent) {
        TextView textView = (TextView) convertView;
        if (textView == null)
            textView = (TextView) inflater.inflate(R.layout.item, null);
        textView.setText("Item " + position);
        return textView;
    }
}
```

##### (b). SingleParallaxListView.java

This is our [activity](https://camposha.info/android/activity) class. This activity will contain our ParallaxListView.

```java
package com.nirhart.parallaxscrollexample;

import android.app.Activity;
import android.content.Intent;
import android.net.Uri;
import android.os.Bundle;
import android.view.Gravity;
import android.view.LayoutInflater;
import android.view.Menu;
import android.view.MenuInflater;
import android.view.MenuItem;
import android.widget.TextView;

import com.nirhart.parallaxscroll.views.ParallaxListView;

public class SingleParallaxListView extends Activity {

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.list_one_parallax);
        ParallaxListView listView = (ParallaxListView) findViewById(R.id.list_view);
        CustomListAdapter adapter = new CustomListAdapter(LayoutInflater.from(this));

        TextView v = new TextView(this);
        v.setText("PARALLAXED");
        v.setGravity(Gravity.CENTER);
        v.setTextSize(40);
        v.setHeight(200);
        v.setBackgroundResource(R.drawable.item_background);

        listView.addParallaxedHeaderView(v);
        listView.setAdapter(adapter);
    }

    @Override
    public boolean onCreateOptionsMenu(Menu menu) {
        MenuInflater inflater = getMenuInflater();
        inflater.inflate(R.menu.main, menu);
        return true;
    }

    @Override
    public boolean onOptionsItemSelected(MenuItem item) {
        if (item.getItemId() == R.id.action_github) {
            Intent browserIntent = new Intent(Intent.ACTION_VIEW, Uri.parse("https://github.com/nirhart/ParallaxScroll"));
            startActivity(browserIntent);
        }
        return true;
    }
}
```

##### (c). list_one_parallax.xml

You can see this is the layout that will be inflated into our `SingleParallaxListView`.

```xml
<com.nirhart.parallaxscroll.views.ParallaxListView xmlns:android="http://schemas.android.com/apk/res/android"
    xmlns:tools="http://schemas.android.com/tools"
    xmlns:app="http://schemas.android.com/apk/res-auto"
    android:id="@+id/list_view"
    android:layout_width="match_parent"
    android:layout_height="match_parent"
    app:parallax_factor="1.9"
    tools:context=".MainActivity" />
```

##### 2\. Multi Parallax ListView example.

We are using the `CustomListAdapter` we had already defined.

##### (a). MultipleParallaxListView.java

```java
package com.nirhart.parallaxscrollexample;

import android.app.Activity;
import android.content.Intent;
import android.net.Uri;
import android.os.Bundle;
import android.view.LayoutInflater;
import android.view.Menu;
import android.view.MenuInflater;
import android.view.MenuItem;

import com.nirhart.parallaxscroll.views.ParallaxListView;

public class MultipleParallaxListView extends Activity {

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.list_multiple_parallax);
        ParallaxListView listView = (ParallaxListView) findViewById(R.id.list_view);
        CustomListAdapter adapter = new CustomListAdapter(LayoutInflater.from(this));
        listView.setAdapter(adapter);
    }

    @Override
    public boolean onCreateOptionsMenu(Menu menu) {
        MenuInflater inflater = getMenuInflater();
        inflater.inflate(R.menu.main, menu);
        return true;
    }

    @Override
    public boolean onOptionsItemSelected(MenuItem item) {
        if (item.getItemId() == R.id.action_github) {
            Intent browserIntent = new Intent(Intent.ACTION_VIEW, Uri.parse("https://github.com/nirhart/ParallaxScroll"));
            startActivity(browserIntent);
        }
        return true;
    }
}
```

##### (b) list_multiple_parallax.xml

```xml
<com.nirhart.parallaxscroll.views.ParallaxListView xmlns:android="http://schemas.android.com/apk/res/android"
    xmlns:tools="http://schemas.android.com/tools"
    xmlns:app="http://schemas.android.com/apk/res-auto"
    android:id="@+id/list_view"
    android:layout_width="match_parent"
    android:layout_height="match_parent"
    app:parallax_factor="1.9"
    app:circular_parallax="true"
    tools:context=".MainActivity" />
```

#### Single Parallax ScrollView Example

Let's now look at single parallax scrollview example.

##### (a). SingleParallaxScrollView.java

```java
package com.nirhart.parallaxscrollexample;

import android.app.Activity;
import android.content.Intent;
import android.net.Uri;
import android.os.Bundle;
import android.view.Menu;
import android.view.MenuInflater;
import android.view.MenuItem;

public class SingleParallaxScrollView extends Activity {

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.scroll_one_parallax);
    }

    @Override
    public boolean onCreateOptionsMenu(Menu menu) {
        MenuInflater inflater = getMenuInflater();
        inflater.inflate(R.menu.main, menu);
        return true;
    }

    @Override
    public boolean onOptionsItemSelected(MenuItem item) {
        if (item.getItemId() == R.id.action_github) {
            Intent browserIntent = new Intent(Intent.ACTION_VIEW, Uri.parse("https://github.com/nirhart/ParallaxScroll"));
            startActivity(browserIntent);
        }
        return true;
    }
}
```

##### (b) scroll_one_parallax.xml

```xml
<com.nirhart.parallaxscroll.views.ParallaxScrollView xmlns:android="http://schemas.android.com/apk/res/android"
    xmlns:tools="http://schemas.android.com/tools"
    xmlns:app="http://schemas.android.com/apk/res-auto"
    android:layout_width="match_parent"
    android:layout_height="match_parent"
    app:parallax_factor="1.9"
    tools:context=".MainActivity" >

    <LinearLayout
        android:layout_width="match_parent"
        android:layout_height="wrap_content"
        android:orientation="vertical" >

        <TextView
            android:layout_width="match_parent"
            android:layout_height="200dp"
            android:background="@drawable/item_background"
            android:gravity="center"
            android:text="PARALLAXED"
            android:textSize="50sp"
            tools:ignore="HardcodedText" />

        <TextView
            android:layout_width="match_parent"
            android:layout_height="wrap_content"
            android:text="Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.    Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
            android:textSize="26sp"
            android:background="@android:color/white"
            android:padding="5dp"
            tools:ignore="HardcodedText" />
    </LinearLayout>

</com.nirhart.parallaxscroll.views.ParallaxScrollView>
```

#### 4\. SingleParallaxAlphaScrollView Example

##### (a) SingleParallaxAlphaScrollView.java

```java
package com.nirhart.parallaxscrollexample;

import android.app.Activity;
import android.content.Intent;
import android.net.Uri;
import android.os.Bundle;
import android.view.Menu;
import android.view.MenuInflater;
import android.view.MenuItem;

public class SingleParallaxAlphaScrollView extends Activity {

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.scroll_one_parallax_alpha);
    }

    @Override
    public boolean onCreateOptionsMenu(Menu menu) {
        MenuInflater inflater = getMenuInflater();
        inflater.inflate(R.menu.main, menu);
        return true;
    }

    @Override
    public boolean onOptionsItemSelected(MenuItem item) {
        if (item.getItemId() == R.id.action_github) {
            Intent browserIntent = new Intent(Intent.ACTION_VIEW, Uri.parse("https://github.com/nirhart/ParallaxScroll"));
            startActivity(browserIntent);
        }
        return true;
    }
}
```

##### (b) scroll_one_parallax_alpha.xml

```xml
<com.nirhart.parallaxscroll.views.ParallaxScrollView xmlns:android="http://schemas.android.com/apk/res/android"
    xmlns:tools="http://schemas.android.com/tools"
    xmlns:app="http://schemas.android.com/apk/res-auto"
    android:layout_width="match_parent"
    android:layout_height="match_parent"
    app:parallax_factor="1.9"
    app:alpha_factor="1.9"
    tools:context=".MainActivity" >

    <LinearLayout
        android:layout_width="match_parent"
        android:layout_height="wrap_content"
        android:orientation="vertical" >

        <TextView
            android:layout_width="match_parent"
            android:layout_height="200dp"
            android:background="@drawable/item_background"
            android:gravity="center"
            android:text="PARALLAXED"
            android:textSize="50sp"
            tools:ignore="HardcodedText" />

        <TextView
            android:layout_width="match_parent"
            android:layout_height="wrap_content"
            android:text="Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.    Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
            android:textSize="26sp"
            android:background="@android:color/white"
            android:padding="5dp"
            tools:ignore="HardcodedText" />
    </LinearLayout>

</com.nirhart.parallaxscroll.views.ParallaxScrollView>
```

#### SingleParallax ExpandableListView Example

##### (a) CustomExpandableListAdapter.java

```java
package com.nirhart.parallaxscrollexample;

import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.BaseExpandableListAdapter;
import android.widget.TextView;

public class CustomExpandableListAdapter extends BaseExpandableListAdapter {

    private LayoutInflater inflater;

    public CustomExpandableListAdapter(LayoutInflater inflater) {
        this.inflater = inflater;
    }

    @Override
    public String getChild(int groupPosition, int childPosition) {
        return "Group " + groupPosition + ", child " + childPosition;
    }

    @Override
    public long getChildId(int groupPosition, int childPosition) {
        return 0;
    }

    @Override
    public View getChildView(int groupPosition, int childPosition, boolean isLastChild, View convertView, ViewGroup parent) {
        TextView textView = (TextView) convertView;
        if (textView == null)
            textView = (TextView) inflater.inflate(R.layout.item_child, null);
        textView.setText(getChild(groupPosition, childPosition));
        return textView;
    }

    @Override
    public int getChildrenCount(int groupPosition) {
        return groupPosition*2+1;
    }

    @Override
    public String getGroup(int groupPosition) {
        return "Group " + groupPosition;
    }

    @Override
    public int getGroupCount() {
        return 20;
    }

    @Override
    public long getGroupId(int groupPosition) {
        return 0;
    }

    @Override
    public View getGroupView(int groupPosition, boolean isExpanded, View convertView, ViewGroup parent) {
        TextView textView = (TextView) convertView;
        if (textView == null)
            textView = (TextView) inflater.inflate(R.layout.item, null);
        textView.setText(getGroup(groupPosition));
        return textView;
    }

    @Override
    public boolean hasStableIds() {
        return false;
    }

    @Override
    public boolean isChildSelectable(int groupPosition, int childPosition) {
        return false;
    }
}
```

##### (b) SingleParallaxExpandableListView.java

```java
package com.nirhart.parallaxscrollexample;

import android.app.Activity;
import android.content.Intent;
import android.net.Uri;
import android.os.Bundle;
import android.view.Gravity;
import android.view.LayoutInflater;
import android.view.Menu;
import android.view.MenuInflater;
import android.view.MenuItem;
import android.widget.TextView;

import com.nirhart.parallaxscroll.views.ParallaxExpandableListView;

public class SingleParallaxExpandableListView extends Activity {

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.expand_list_one_parallax);
        ParallaxExpandableListView listView = (ParallaxExpandableListView) findViewById(R.id.list_view);

        TextView v = new TextView(this);
        v.setText("PARALLAXED");
        v.setGravity(Gravity.CENTER);
        v.setTextSize(40);
        v.setHeight(200);
        v.setBackgroundResource(R.drawable.item_background);

        listView.addParallaxedHeaderView(v);
        CustomExpandableListAdapter adapter = new CustomExpandableListAdapter(LayoutInflater.from(this));
        listView.setAdapter(adapter);
    }

    @Override
    public boolean onCreateOptionsMenu(Menu menu) {
        MenuInflater inflater = getMenuInflater();
        inflater.inflate(R.menu.main, menu);
        return true;
    }

    @Override
    public boolean onOptionsItemSelected(MenuItem item) {
        if (item.getItemId() == R.id.action_github) {
            Intent browserIntent = new Intent(Intent.ACTION_VIEW, Uri.parse("https://github.com/nirhart/ParallaxScroll"));
            startActivity(browserIntent);
        }
        return true;
    }
}
```

##### (c) expand_list_one_parallax.xml

```xml
<com.nirhart.parallaxscroll.views.ParallaxExpandableListView xmlns:android="http://schemas.android.com/apk/res/android"
    xmlns:tools="http://schemas.android.com/tools"
    xmlns:app="http://schemas.android.com/apk/res-auto"
    android:id="@+id/list_view"
    android:layout_width="match_parent"
    android:layout_height="match_parent"
    app:parallax_factor="1.9"
    tools:context=".MainActivity" />
```

You can get full source samples below:

#### Download

Also check our video tutorial it's more detailed and explained in step by step.

| No. | Location | Link |
| --- | --- | --- |
| 1. | GitHub | [Direct Download](https://github.com/nirhart/ParallaxScroll/tree/master/ParallaxScrollExample) |
| 2. | GitHub | [Library](https://github.com/nirhart/ParallaxScroll) |
| 3. | Google Play | [Demo App](https://play.google.com/store/apps/details?id=com.nirhart.parallaxscrollexample) |

Credit to the Original Creator [@nirhart](https://github.com/nirhart)

#### How to Run

1. Download the project.
2. Go over to sample folder and edit import it to your android studio.Alternatively you can just copy paste the classes as well as the layouts and maybe other resources into your already created project.
3. Then edit the app level build/gradle to add our dependency as we had stated during the installation.
