# Best Android AppBar and ToolBar Libraries in 2021

A modern activity design is to use an appbar with the coordinatorlayout. With this combination we can further modernize our application by including animations and synchronizing the scroll with the floating action button. Let's look at some of these libraries and examples.


# ToolBar Animation and Title positioning

This sectioning examines libraries that helpby animating the toolbar as well as in positioning toolbar title. A common usage scenario is to center the title in the toolbar.

> You can position title in the toolbar without a library. The important thing to remember is that a toolbar is itself a layout and all you need is to place inside it a textview with gravity set to center. You do this in the XML.

Otherwise you can use the following library:

## (a). Toolbar-Center-Title

> A Library to align title on ActionBar.

![](https://github.com/RaviKoradiya/Toolbar-Center-Title/raw/master/images/Toolbar-Center-Title-1.png?raw=true)

### Step 1: Installation

Install it from jitpack:

```groovy
allprojects {
    repositories {
        maven { url "https://jitpack.io" } // add this line
    }
}
```

Then:

```groovy
implementation 'com.github.RaviKoradiya:Toolbar-Center-Title:1.0.3'
```

### Step 2: How to Use

You can align the toolbar title either declaratively via XML:

```xml
<android.support.v7.widget.Toolbar
    android:id="@+id/toolbar"
    android:layout_width="match_parent"
    android:layout_height="?attr/actionBarSize"
    android:background="?attr/colorPrimary"
    app:popupTheme="@style/AppTheme.PopupOverlay"
    bind:centerTitle='@{true}' />
```

Or as Java or Kotlin code:

```kotlin
CenterTitle.centerTitle(toolbar,true);
```

### Step 3: Example

Here's code for the main activity:

```java
package com.ravikoradiya.toolbarcentertitle

import android.databinding.DataBindingUtil
import android.os.Bundle
import android.support.v7.app.AppCompatActivity
import android.support.v7.widget.LinearLayoutManager
import android.text.Editable
import android.text.TextWatcher
import android.view.Menu
import com.ravikoradiya.toolbarcentertitle.databinding.ActivityMainBinding

class MainActivity : AppCompatActivity() {

    lateinit var binding: ActivityMainBinding

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        binding = DataBindingUtil.setContentView(this, R.layout.activity_main)
        binding.isTitleInCenter = true
        setSupportActionBar(binding.toolbar)
        title = getString(R.string.app_name)
        binding.toolbar.subtitle = getString(R.string.app_description)
        supportActionBar?.setDisplayHomeAsUpEnabled(true)
        supportActionBar?.setDisplayShowHomeEnabled(true)

        binding.switch1.setOnCheckedChangeListener { compoundButton, b -> binding.isTitleInCenter = b }

        binding.editTitle.addTextChangedListener(object : TextWatcher {
            override fun afterTextChanged(p0: Editable?) {

            }

            override fun beforeTextChanged(p0: CharSequence?, p1: Int, p2: Int, p3: Int) {

            }

            override fun onTextChanged(p0: CharSequence?, p1: Int, p2: Int, p3: Int) {
                binding.toolbar.title = p0
            }
        })

        binding.editSubTitle.addTextChangedListener(object : TextWatcher {
            override fun afterTextChanged(p0: Editable?) {

            }

            override fun beforeTextChanged(p0: CharSequence?, p1: Int, p2: Int, p3: Int) {

            }

            override fun onTextChanged(p0: CharSequence?, p1: Int, p2: Int, p3: Int) {
                binding.toolbar.subtitle = p0
            }
        })
    }

    override fun onCreateOptionsMenu(menu: Menu): Boolean {
        // Inflate the menu; this adds items to the action bar if it is present.

        menuInflater.inflate(R.menu.menu_main, menu)
        binding.rvCount.layoutManager = LinearLayoutManager(this)
        binding.rvCount.adapter = CustomAdapter(this, menu, binding.toolbar)

        return true
    }
}
```

And here's code for the layout:

```xml
<?xml version="1.0" encoding="utf-8"?>
<layout xmlns:android="http://schemas.android.com/apk/res/android"
    xmlns:app="http://schemas.android.com/apk/res-auto"
    xmlns:bind="http://schemas.android.com/apk/res-auto"
    xmlns:tools="http://schemas.android.com/tools">

    <data>

        <variable
            name="isTitleInCenter"
            type="Boolean" />

    </data>

    <android.support.design.widget.CoordinatorLayout
        android:layout_width="match_parent"
        android:layout_height="match_parent"
        tools:context=".MainActivity">

        <android.support.design.widget.AppBarLayout
            android:layout_width="match_parent"
            android:layout_height="wrap_content"
            android:theme="@style/AppTheme.AppBarOverlay">

            <android.support.v7.widget.Toolbar
                android:id="@+id/toolbar"
                android:layout_width="match_parent"
                android:layout_height="?attr/actionBarSize"
                android:background="?attr/colorPrimary"
                app:popupTheme="@style/AppTheme.PopupOverlay"
                bind:centerTitle='@{isTitleInCenter}' />

        </android.support.design.widget.AppBarLayout>

        <android.support.constraint.ConstraintLayout
            android:layout_width="match_parent"
            android:layout_height="match_parent"
            app:layout_behavior="@string/appbar_scrolling_view_behavior"
            tools:context=".MainActivity"
            tools:showIn="@layout/activity_main">

            <android.support.v7.widget.RecyclerView
                android:id="@+id/rv_count"
                android:layout_width="0dp"
                android:layout_height="0dp"
                android:layout_marginBottom="8dp"
                android:layout_marginEnd="8dp"
                android:layout_marginStart="8dp"
                android:layout_marginTop="8dp"
                app:layout_constraintBottom_toTopOf="@+id/switch1"
                app:layout_constraintEnd_toEndOf="parent"
                app:layout_constraintStart_toStartOf="parent"
                app:layout_constraintTop_toTopOf="parent" />

            <Switch
                android:id="@+id/switch1"
                android:layout_width="wrap_content"
                android:layout_height="wrap_content"
                android:layout_marginEnd="8dp"
                android:layout_marginStart="8dp"
                android:checked="true"
                android:text="Title In Center"
                app:layout_constraintBottom_toTopOf="@+id/editTitle"
                app:layout_constraintEnd_toEndOf="parent"
                app:layout_constraintStart_toStartOf="parent"
                tools:layout_editor_absoluteY="420dp" />

            <EditText
                android:id="@+id/editTitle"
                android:layout_width="wrap_content"
                android:layout_height="wrap_content"
                android:layout_marginEnd="8dp"
                android:layout_marginStart="8dp"
                android:ems="10"
                android:gravity="center"
                android:hint="Title"
                android:inputType="textPersonName"
                android:lines="1"
                app:layout_constraintBottom_toTopOf="@+id/editSubTitle"
                app:layout_constraintEnd_toEndOf="parent"
                app:layout_constraintStart_toStartOf="parent" />

            <EditText
                android:id="@+id/editSubTitle"
                android:layout_width="wrap_content"
                android:layout_height="wrap_content"
                android:layout_marginEnd="8dp"
                android:layout_marginStart="8dp"
                android:ems="10"
                android:gravity="center"
                android:hint="Sub Title"
                android:inputType="textPersonName"
                android:lines="1"
                app:layout_constraintBottom_toBottomOf="parent"
                app:layout_constraintEnd_toEndOf="parent"
                app:layout_constraintStart_toStartOf="parent" />

        </android.support.constraint.ConstraintLayout>

    </android.support.design.widget.CoordinatorLayout>
</layout>
```

Find complete code [here](https://github.com/RaviKoradiya/Toolbar-Center-Title/tree/master/app)

### Step 4: Reference

Find complete source code reference [here](https://github.com/RaviKoradiya/Toolbar-Center-Title).

## (b). SuperToolbar

> Android native Toolbar on steroids.

- Animate the height of the toolbar as you scroll
- Center the toolbar title horizontally
- Use light title font

Here's the example project we will write:

![SuperToolbar Example](https://github.com/andrefrsousa/SuperToolbar/raw/master/raw/example.gif)

Let's see how to use it.

### Step 1: Install it

This library is hosted in Jitpack. So register jitpack as a maven repository in your root-level `build.gradle`:

```groovy
allprojects {
    repositories {
        ...
        maven { url 'https://jitpack.io' }
    }
}
```

Next declare the library as a dependency in your `app/build.gradle`:

```groovy
dependencies {
    implementation 'com.github.andrefrsousa:SuperToolbar:1.3.0'
}
```

Then sync.

### Step 2: Use

The best way to learn how to use this library is to check the full example provided.

If you want to have the same effect as the one used in Google Messages, for example, add a scroll listener to your _RecyclerView_ or _ScrollView_. Like this:

```kotlin
myRecyclerView.addOnScrollListener(object : RecyclerView.OnScrollListener() {
    override fun onScrolled(recyclerView: RecyclerView, dx: Int, dy: Int) {
        super.onScrolled(recyclerView, dx, dy)
        toolbar.setElevationVisibility(recyclerView.canScrollVertically(-1))
    }
})
```

You can costumize your toolbar with the following attributes:

```xml
// The duration of the elevation animation. By default it is 250 miliseconds.
<attr name="superToolbar_animationDuration" format="integer"/>

// If you want to show the toolbar elevation when created. By default is false.
<attr name="superToolbar_showElevationAtStart" format="boolean"/>

// Center the toolbar title. Is false by default.
<attr name="superToolbar_centerTitle" format="boolean"/>

// Use a light font as the title of the toolbar. The default value is false.
<attr name="superToolbar_useLightFont" format="boolean"/>
```

### Full Example

Let's look at a full example using this library:

1. Create Android Studio project or Download it from below.
2. Install the library as has been discussed above.
3. Modify style.

Go to your `res/styles.xml` and replace your code there with the following:

```xml
<resources>

    <!-- Base application theme. -->
    <style name="AppTheme" parent="Theme.AppCompat.Light.NoActionBar">
        <!-- Customize your theme here. -->
        <item name="colorPrimary">@color/colorPrimary</item>
        <item name="colorPrimaryDark">@color/colorPrimaryDark</item>
        <item name="colorAccent">@color/colorAccent</item>
    </style>

</resources>
```

4. Design Layouts. We have two layouts:

**(a). list_item.xml**

Our List item layout will comprise a TextView inside a FrameLayout:

```xml
<?xml version="1.0" encoding="utf-8"?>
<FrameLayout xmlns:android="http://schemas.android.com/apk/res/android"
    android:layout_width="match_parent"
    android:layout_height="60dp">

    <TextView
        android:id="@+id/text_view"
        android:layout_width="match_parent"
        android:layout_height="?attr/actionBarSize"
        android:padding="8dp"
        android:text="Hello World!" />

</FrameLayout>
```

**(b). activity_main.xml**

We will place a a toolbar on top of our recyclerview in our MainActivity layout:

```xml
<?xml version="1.0" encoding="utf-8"?>
<androidx.constraintlayout.widget.ConstraintLayout xmlns:android="http://schemas.android.com/apk/res/android"
    xmlns:app="http://schemas.android.com/apk/res-auto"
    xmlns:tools="http://schemas.android.com/tools"
    android:layout_width="match_parent"
    android:layout_height="match_parent"
    tools:context=".DemoActivity">

    <com.andrefrsousa.supertoolbar.SuperToolbar
        android:id="@+id/toolbar"
        android:layout_width="match_parent"
        android:layout_height="?attr/actionBarSize"
        android:background="@android:color/white"
        app:layout_constraintLeft_toLeftOf="parent"
        app:layout_constraintTop_toTopOf="parent"
        app:superToolbar_centerTitle="true"
        app:superToolbar_useLightFont="true" />

    <androidx.recyclerview.widget.RecyclerView
        android:id="@+id/items_list"
        android:layout_width="match_parent"
        android:layout_height="0dp"
        android:overScrollMode="never"
        app:layout_constraintBottom_toBottomOf="parent"
        app:layout_constraintTop_toBottomOf="@+id/toolbar" />

</androidx.constraintlayout.widget.ConstraintLayout>
```

5. Write Code

Here's our main and only activity and class:

**DemoActivity.kt**

```kotlin
import android.os.Bundle
import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import android.widget.TextView
import androidx.appcompat.app.AppCompatActivity
import androidx.recyclerview.widget.RecyclerView.OnScrollListener
import kotlinx.android.synthetic.main.activity_demo.*
import kotlinx.android.synthetic.main.list_item.view.*

class DemoActivity : AppCompatActivity() {

    private lateinit var listener: OnScrollListener

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_demo)

        toolbar.title = getString(R.string.app_name)

        listener = object : OnScrollListener() {
            override fun onScrolled(
                recyclerView: androidx.recyclerview.widget.RecyclerView,
                dx: Int,
                dy: Int
            ) {
                super.onScrolled(recyclerView, dx, dy)
                toolbar.setElevationVisibility(recyclerView.canScrollVertically(-1))
            }
        }

        items_list.run {
            layoutManager = androidx.recyclerview.widget.LinearLayoutManager(this@DemoActivity)
            adapter = ItemsAdapter()
        }
    }

    override fun onResume() {
        super.onResume()
        items_list.addOnScrollListener(listener)
    }

    override fun onPause() {
        items_list.removeOnScrollListener(listener)
        super.onPause()
    }
}

// Inner classes

class ItemsAdapter : androidx.recyclerview.widget.RecyclerView.Adapter<ItemsAdapter.ViewHolder>() {

    override fun onCreateViewHolder(parent: ViewGroup, viewType: Int) =
        ViewHolder(parent.inflate(R.layout.list_item))

    override fun onBindViewHolder(p0: ViewHolder, p1: Int) {
    }

    override fun getItemCount() = 15

    class ViewHolder(view: View) : androidx.recyclerview.widget.RecyclerView.ViewHolder(view) {
        val text: TextView = view.text_view
    }
}

private fun ViewGroup.inflate(layoutId: Int) =
    LayoutInflater.from(context).inflate(layoutId, this, false)!!
```

### Run

Copy the code or download it in the link below, build and run.

### Reference

Here are the reference links:

| Number | Link |
| --- | --- |
| 1. | [Download](https://downgit.github.io/#/home?url=https://github.com/andrefrsousa/SuperToolbar/tree/master/demo) Example |
| 2. | [Read](https://github.com/andrefrsousa/SuperToolbar/) more |
| 3. | [Follow](https://github.com/andrefrsousa/) code author |

# AppBar with FAB

Syncing AppBar with Floating Action Button.

## (a). appbarsyncedfab

> An Android library for getting a FAB to slide in and out in sync with a scrolling AppBarLayout.

Here's demo:

![SimpleAppBar](https://cloud.githubusercontent.com/assets/856723/15891088/370d3210-2d73-11e6-866a-69ec9b1fcde1.gif) ![ComplexAppBar](https://cloud.githubusercontent.com/assets/856723/15934370/98bdee78-2e63-11e6-88b9-8669de9ee57a.gif)

### Step 1: Installation

Add as gradle dependency via [jitpack.io](https://jitpack.io/#strooooke/appbarsyncedfab): Add the JitPack repository in your root build.gradle at the end of repositories:

```
    allprojects {
        repositories {
            ...
            maven { url "https://jitpack.io" }
        }
    }
```

Add the dependency in your app build.gradle file:

```groovy
    dependencies {
            implementation 'com.github.strooooke:appbarsyncedfab:v0.5'
    }
```

### Step 2: How to Use

Add either the behavior to your FAB in XML

```
<androidx.coordinatorlayout.widget.CoordinatorLayout
    ...
  >

  <com.google.android.material.appbar.AppBarLayout
    ...
    >
  </com.google.android.material.appbar.AppBarLayoutt>

  ...

  <com.google.android.material.floatingactionbutton.FloatingActionButton
    ...
    app:layout_behavior="@string/appbarsyncedfab_fab_behavior"/>

</androidx.coordinatorlayout.widget.CoordinatorLayout>
```

You can also wire up the listener, the CoordinatorLayout, the AppBarLayout and the FAB by hand:

```java
CoordinatorLayout coordinatorLayout = findViewById(R.id.coordinatorLayout);
AppBarLayout appBarLayout = findViewById(R.id.app_bar);
FloatingActionButton fab = findViewById(R.id.fab);
FabOffsetter fabOffsetter = new FabOffsetter(coordinatorLayout, fab);
appBarLayout.addOnOffsetChangedListener(fabOffsetter);
```

This way is not recommended; you will lose proper interaction with the snackbar.

## (b). Android Toolbar Button Library

The problem with anchoring a floating action button to a collapsing toolbar is that the CTA gets hidden on scroll.

> This library allows you to artificially add a button in the toolbar with an animation as soon as the FAB hides itself.

Works with Android 4.0+ (minSdkVersion 14).

### Step 1: How to Install

Install it as a gradle dependency:

```groovy
implementation 'am.gaut.android.toolbarbutton:toolbarbutton:0.1.0'
```

### Ste 2: How to Use

Add this at the same level where your floating action button is defined in the activity.

```xml
<am.gaut.android.toolbarbutton.ToolbarButton
        android:id="@+id/btn_toolbar_checkin"
        android:layout_width="wrap_content"
        android:layout_height="wrap_content"
        style="?attr/borderlessButtonStyle"
        android:background="@drawable/selector_toolbar_button"
        android:textAppearance="@style/TextAppearance.AppCompat.Widget.Button.Inverse"
        android:paddingLeft="@dimen/toolbar_button_padding"
        android:paddingRight="@dimen/toolbar_button_padding"
        android:drawablePadding="@dimen/toolbar_button_padding"
        android:drawableLeft="@drawable/ic_message_white_18dp"
        android:drawableStart="@drawable/ic_message_white_18dp"
        android:text="@string/checkin"
        app:layout_anchor="@id/appbar"
        app:layout_anchorGravity="right|end" />
```

### Step 3: Reference

Download an example [here](https://github.com/GautamGupta/toolbar-button/tree/master/app). Read more about this library [here](https://github.com/GautamGupta/toolbar-button).

# AppBar Animation

Let's now look at libraries involving animating the AppBar.

## (a). ScalingLayout

> Scale your layout on user interaction.

![](https://raw.githubusercontent.com/iammert/ScalingLayout/master/art/cover_scaling.png)

![](https://github.com/iammert/ScalingLayout/raw/master/art/gif_behavior.gif)

### Step 1: How to Install

Install it from maven:

```groovy
implementation 'com.github.iammert:ScalingLayout:1.2.1'
```

### Step2: How to Use

First define it in the layout:

```xml
<iammert.com.view.scalinglib.ScalingLayout
        android:id="@+id/scalingLayout"
        android:layout_width="300dp"
        android:layout_height="48dp"
        app:radiusFactor="1">

        <!-- Your content here -->

</iammert.com.view.scalinglib.ScalingLayout>
```

> app:radiusFactor value is between 0 and 1 float value. 1 = full rounded corner. 0 = no rounded corner.

Then in your Java code:

```java
scalingLayout.expand(); //use this if you want to expand all
scalingLayout.collapse(); //user this if you want to collapse view to initial state.
scalingLayout.setProgress(float progress); //1 is fully expanded, 0 is initial state.
```

Here's how you attach a listener:

```java
scalingLayout.setListener(new ScalingLayoutListener() {
    @Override
    public void onCollapsed() {}

    @Override
    public void onExpanded() {}

    @Override
    public void onProgress(float progress) {}
});
```

### Step 3: Example

Here's a simple example:

```java
package iammert.com.view.scalinglayout;

import android.os.Bundle;
import android.support.annotation.Nullable;
import android.support.v4.view.ViewCompat;
import android.support.v4.view.ViewPropertyAnimatorListener;
import android.support.v7.app.AppCompatActivity;
import android.view.View;
import android.widget.ImageView;
import android.widget.LinearLayout;

import iammert.com.view.scalinglib.ScalingLayout;
import iammert.com.view.scalinglib.ScalingLayoutListener;
import iammert.com.view.scalinglib.State;

/**
 * Created by mertsimsek on 01/10/2017.
 */

public class FABDemo extends AppCompatActivity {

    @Override
    protected void onCreate(@Nullable Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_fab);

        final ImageView fabIcon = findViewById(R.id.fabIcon);
        final LinearLayout filterLayout = findViewById(R.id.filterLayout);
        final ScalingLayout scalingLayout = findViewById(R.id.scalingLayout);

        scalingLayout.setListener(new ScalingLayoutListener() {
            @Override
            public void onCollapsed() {
                ViewCompat.animate(fabIcon).alpha(1).setDuration(150).start();
                ViewCompat.animate(filterLayout).alpha(0).setDuration(150).setListener(new ViewPropertyAnimatorListener() {
                    @Override
                    public void onAnimationStart(View view) {
                        fabIcon.setVisibility(View.VISIBLE);
                    }

                    @Override
                    public void onAnimationEnd(View view) {
                        filterLayout.setVisibility(View.INVISIBLE);
                    }

                    @Override
                    public void onAnimationCancel(View view) {

                    }
                }).start();
            }

            @Override
            public void onExpanded() {
                ViewCompat.animate(fabIcon).alpha(0).setDuration(200).start();
                ViewCompat.animate(filterLayout).alpha(1).setDuration(200).setListener(new ViewPropertyAnimatorListener() {
                    @Override
                    public void onAnimationStart(View view) {
                        filterLayout.setVisibility(View.VISIBLE);
                    }

                    @Override
                    public void onAnimationEnd(View view) {
                        fabIcon.setVisibility(View.INVISIBLE);
                    }

                    @Override
                    public void onAnimationCancel(View view) {

                    }
                }).start();
            }

            @Override
            public void onProgress(float progress) {
                if (progress > 0) {
                    fabIcon.setVisibility(View.INVISIBLE);
                }

                if(progress < 1){
                    filterLayout.setVisibility(View.INVISIBLE);
                }
            }
        });

        scalingLayout.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View view) {
                if (scalingLayout.getState() == State.COLLAPSED) {
                    scalingLayout.expand();
                }
            }
        });

        findViewById(R.id.rootLayout).setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View view) {
                if (scalingLayout.getState() == State.EXPANDED) {
                    scalingLayout.collapse();
                }
            }
        });

    }
}
```

Find the layout as well as other classes [here](https://github.com/iammert/ScalingLayout/tree/master/app).

### Step4: Reference

Find complete reference including source code [here](https://github.com/iammert/ScalingLayout).

## (b). Navigation ToolBar

> Navigation toolbar is a slide-modeled UI navigation controller.

This library requires:

- Android 5.0 Lollipop (API lvl 21) or greater

### Step 1: How to Install

Install as a dependency:

```groovy
implementation 'com.ramotion.navigationtoolbar:navigation-toolbar:0.1.3'
```

### Step 2: How to Use

NavigationToolBarLayout is the successor to CoordinatorLayout. Therefore, NavigationToolBarLayout must be the root element of your layout. Displayed content must be inside NavigationToolBarLayout, as shown below:

```groovy
<com.ramotion.navigationtoolbar.NavigationToolBarLayout
    android:layout_width="match_parent"
    android:layout_height="match_parent">

    <include layout="@layout/content_layout"/>

    <android.support.design.widget.FloatingActionButton
        android:id="@+id/fab"
        android:layout_width="wrap_content"
        android:layout_height="wrap_content"
        app:layout_anchor="@id/com_ramotion_app_bar"
        app:layout_anchorGravity="bottom|end"
        app:srcCompat="@android:drawable/ic_dialog_email" />

</com.ramotion.navigationtoolbar.NavigationToolBarLayout>
```

Next, you must specify an adapter for NavigationToolBarLayout, from which NavigationToolBarLayout will receive the displayed View.

NavigationToolBarLayout contains `android.support.v7.widget.Toolbar` and `android.support.design.widget.AppBarLayout`, access to which can be obtained through the appropriate identifiers:

```xml
@id/com_ramotion_toolbar <!-- identifier of Toolbar -->
@id/com_ramotion_app_bar <!-- identifier of AppBarLayout -->
```

or through the appropriate properties of the NavigationToolBarLayout class:

```kotlin
val toolBar: Toolbar
val appBarLayout: AppBarLayout
```

Here are the attributes you can specify through XML or related setters:

- `headerOnScreenItemCount` - The maximum number of simultaneously displayed cards (items) in vertical orientation.
- `headerCollapsingBySelectDuration` - Collapsing animation duration of header (HeaderLayout), when you click on the card in vertical orientation.
- `headerTopBorderAtSystemBar` - Align the top card on the systembar or not.
- `headerVerticalItemWidth` - Specifies the width of the vertical card. It can be equal to `match_parent`, then the width of the card will be equal to the width of NavigationToolBarLayout.
- `headerVerticalGravity` - Specifies the alignment of the vertical card. Can take the values: left, center, or right.

### Step 3: Example

Find full example [here](https://github.com/Ramotion/navigation-toolbar-android/tree/master/navigation-toolbar-example)

### Step 4: Reference

Find complete source code reference [here](https://github.com/Ramotion/navigation-toolbar-android).
