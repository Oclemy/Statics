# Kotlin Android BottomSheetBehaviour Tutorial and Examples


> Android BottomSheetBehavior Examples and Tutorial.

A BottomSheetBehavior is an interaction behavior plugin for a child view of CoordinatorLayout to make it work as a bottom sheet.


#### BottomSheetBehavior API Definition

BottomSheetBehavior was added in version `23.4.0`. It derives from the `Behavior` class of CoordinatorLayout.

```java
public class BottomSheetBehavior extends Behavior<V extends View>
```

Here's it's inheritance tree:

```java
java.lang.Object
   ↳    android.support.design.widget.CoordinatorLayout.Behavior<V extends android.view.View>
       ↳    android.support.design.widget.BottomSheetBehavior<V extends android.view.View>
```

We will now look at several examples that make use of or implement BottomSheetBehavior. These examples will be open source and can be downloaded.

## Example 1: BottomSheet Collapse and Expand using BottomSheetBehaviour

In this simple example you will learn how to create a bottomsheet that can be collapsed and expanded when a button is clicked. We do thise by passing a state to the `setState()` method of the BottomSheetBehavior.

### Step 1: Create Project

Start by creating an empty `Android Studio` project.

### Step 2: Dependencies

No special dependency is needed:

```groovy
    implementation "androidx.appcompat:appcompat:$appCompat"
    implementation "com.google.android.material:material:$supportLibVer"
```

### Step 3: Design Layout

Design our MainActivity layout as follows:

**activity_main.xml**

```xml
<androidx.coordinatorlayout.widget.CoordinatorLayout
    xmlns:android="http://schemas.android.com/apk/res/android"
    xmlns:app="http://schemas.android.com/apk/res-auto"
    android:id="@+id/main_content"
    android:layout_width="match_parent"
    android:layout_height="match_parent"
    android:fitsSystemWindows="true">

    <ScrollView
        android:layout_width="match_parent"
        android:layout_height="match_parent"
        app:layout_behavior="@string/appbar_scrolling_view_behavior">

        <LinearLayout
            android:layout_width="match_parent"
            android:layout_height="match_parent"
            android:orientation="vertical"
            android:paddingTop="24dp">

            <Button
                android:id="@+id/button_1"
                android:layout_width="match_parent"
                android:layout_height="wrap_content"
                android:text="Open Bottom Sheet"
                android:padding="16dp"
                android:layout_margin="8dp"
                android:textColor="@android:color/white"
                android:background="@color/colorAccent"/>

            <Button
                android:id="@+id/button_2"
                android:layout_width="match_parent"
                android:layout_height="wrap_content"
                android:padding="16dp"
                android:layout_margin="8dp"
                android:text="Close Bottom Sheet"
                android:textColor="@android:color/white"
                android:background="@color/colorPrimary"/>

            <Button
                android:id="@+id/button_3"
                android:layout_width="match_parent"
                android:layout_height="wrap_content"
                android:padding="16dp"
                android:layout_margin="8dp"
                android:text="Make Bottom Sheet Peek"
                android:textColor="@android:color/white"
                android:background="@color/colorPrimaryDark"/>

        </LinearLayout>

    </ScrollView>

    <androidx.core.widget.NestedScrollView
        android:id="@+id/bottom_sheet"
        android:layout_width="match_parent"
        android:layout_height="350dp"
        android:clipToPadding="true"
        android:background="@android:color/darker_gray"
        app:layout_behavior="com.google.android.material.bottomsheet.BottomSheetBehavior"
        >

        <TextView
            android:layout_width="match_parent"
            android:layout_height="match_parent"
            android:text="Bottom Sheet Data Here"
            android:padding="16dp"
            android:textColor="@android:color/white"
            android:textSize="16sp"/>

    </androidx.core.widget.NestedScrollView>

</androidx.coordinatorlayout.widget.CoordinatorLayout>
```

### Step : Write Code

Go to your `MainActivity.java` and add the following imports including `material.bottomsheet.BottomSheetBehavior`:

```java
import android.os.Bundle;
import com.google.android.material.bottomsheet.BottomSheetBehavior;
import androidx.appcompat.app.AppCompatActivity;
import android.view.View;
import android.widget.Button;
```

Extend the `AppCompatActivity` and declare the `BottomSheetBehavior` as an instance field:

```java
public class MainActivity extends AppCompatActivity {
  private BottomSheetBehavior mBottomSheetBehavior;
```

Override the `onCreate()`:

```java
  @Override
  protected void onCreate(Bundle savedInstanceState) {
    super.onCreate(savedInstanceState);
    setContentView(R.layout.activity_main);
```

Reference our widgets including a View that will represent the `BottomSheet`:

```java
    View bottomSheet = findViewById(R.id.bottom_sheet);
    Button button1 = (Button) findViewById(R.id.button_1);
    Button button2 = (Button) findViewById(R.id.button_2);
    Button button3 = (Button) findViewById(R.id.button_3);
```

Initialize the `BottomSheetBehavior` by invoking the `from()` function and passing the `BottomSheet`:

```java
    mBottomSheetBehavior = BottomSheetBehavior.from(bottomSheet);
```

Set it as collapsed initially using the `setState()` method and passing the `BottomSheetBehavior.STATE_COLLAPSED`:

```java
    mBottomSheetBehavior.setState(BottomSheetBehavior.STATE_COLLAPSED);
```

However for us when the button 1 is clicked we will expand it by setting the `BottomSheetBehavior.STATE_EXPANDED`:

```java
    button1.setOnClickListener(new View.OnClickListener() {
      @Override
      public void onClick(View view) {
        // Expand
        mBottomSheetBehavior.setState(BottomSheetBehavior.STATE_EXPANDED);
      }
    });
```

When the button2 is however clicked then we will collapse it again:

```java
    button2.setOnClickListener(new View.OnClickListener() {
      @Override
      public void onClick(View view) {
        // Collapse
        mBottomSheetBehavior.setState(BottomSheetBehavior.STATE_COLLAPSED);
      }
    });
```

When button3 is clicked we will change the peek height and collapse it:

```java
    button3.setOnClickListener(new View.OnClickListener() {
      @Override
      public void onClick(View view) {

        // Peek
        mBottomSheetBehavior.setPeekHeight(300);
        mBottomSheetBehavior.setState(BottomSheetBehavior.STATE_COLLAPSED);
      }
    });
```

Here's our MainActivity:

```java
import android.os.Bundle;
import com.google.android.material.bottomsheet.BottomSheetBehavior;
import androidx.appcompat.app.AppCompatActivity;
import android.view.View;
import android.widget.Button;

public class MainActivity extends AppCompatActivity {
  private BottomSheetBehavior mBottomSheetBehavior;

  @Override
  protected void onCreate(Bundle savedInstanceState) {
    super.onCreate(savedInstanceState);
    setContentView(R.layout.activity_main);

    View bottomSheet = findViewById(R.id.bottom_sheet);
    Button button1 = (Button) findViewById(R.id.button_1);
    Button button2 = (Button) findViewById(R.id.button_2);
    Button button3 = (Button) findViewById(R.id.button_3);

    mBottomSheetBehavior = BottomSheetBehavior.from(bottomSheet);
    // Set it as collapsed initially
    mBottomSheetBehavior.setState(BottomSheetBehavior.STATE_COLLAPSED);

    button1.setOnClickListener(new View.OnClickListener() {
      @Override
      public void onClick(View view) {
        // Expand
        mBottomSheetBehavior.setState(BottomSheetBehavior.STATE_EXPANDED);
      }
    });
    button2.setOnClickListener(new View.OnClickListener() {
      @Override
      public void onClick(View view) {
        // Collapse
        mBottomSheetBehavior.setState(BottomSheetBehavior.STATE_COLLAPSED);
      }
    });
    button3.setOnClickListener(new View.OnClickListener() {
      @Override
      public void onClick(View view) {

        // Peek
        mBottomSheetBehavior.setPeekHeight(300);
        mBottomSheetBehavior.setState(BottomSheetBehavior.STATE_COLLAPSED);
      }
    });

    // Make peeking gone when completely collapsed
    mBottomSheetBehavior.setBottomSheetCallback(new BottomSheetBehavior.BottomSheetCallback() {
      @Override
      public void onStateChanged(View bottomSheet, int newState) {
        if (newState == BottomSheetBehavior.STATE_COLLAPSED) {
          mBottomSheetBehavior.setPeekHeight(0);
        }
      }

      @Override
      public void onSlide(View bottomSheet, float slideOffset) {
      }
    });
  }
}
```

### Run

Copy the code or download it in the link below, build and run.

### Reference

Here are the reference links:

| Number | Link |
| --- | --- |
| 1. | [Download](https://downgit.github.io/#/home?url=https://github.com/nisrulz/android-examples/tree/develop/BottomSheet) Example |
| 2. | [Follow](https://github.com/nisrulz/) code author |
| 3. | Code: [Apache 2.0 License](http://www.apache.org/licenses/LICENSE-2.0.txt) |

## Example 2: Hello World BottomSheet Example

Let's look at a simple hello world bottomsheet behavior example. In this example we simply add a View, which can be collapsed:

**Collapsed**

Here's the collapsed state:

![Hello World BottomSheetBehavior Example](https://raw.githubusercontent.com/Plinzen/BottomSheetBehaviorSample/master/image/collapsed.png)

**Expanded**

Here's the expanded state:

![Hello World BottomSheetBehavior Example Expanded](https://raw.githubusercontent.com/Plinzen/BottomSheetBehaviorSample/master/image/expanded.png)

Let's start.

**(a). Build.gradle**

No third party dependency is needed.

**(b). activity_scrolling.xml**

We will have only one layout and one activity. At the root we must have the `CoordinatorLayout` as our element. Inside it we will have an `AppBarLayout`. Inside the AppBarLayout we will have a `CollapsingToolbarLayout`.

It is inside that CollapsingToolbarLayout where we have ToolBar. Then we close the `AppBarLayout`. Then add a simple TextView wrapped inside a FrameLayout. This will be show in our Collapsed state.

Then a [LinearLayout](https://camposha.info/android/linearlayout) with vertical orientation. Here we add more textviews. This will be shown in the expanded state of our BottomSheetBehavior.

So it is this LinearLayout that you can of in this case as our BottomSheet, take note of the id we are assigning it.

```xml
<?xml version="1.0" encoding="utf-8"?>
<android.support.design.widget.CoordinatorLayout

   android_layout_width="match_parent"
   android_layout_height="match_parent"
   android_fitsSystemWindows="true"
   tools_context="sample.com.bottomsheet.ScrollingActivity">

   <android.support.design.widget.AppBarLayout
      android_id="@+id/app_bar"
      android_layout_width="match_parent"
      android_layout_height="@dimen/app_bar_height"
      android_fitsSystemWindows="true"
      android_theme="@style/AppTheme.AppBarOverlay">

      <android.support.design.widget.CollapsingToolbarLayout
         android_id="@+id/toolbar_layout"
         android_layout_width="match_parent"
         android_layout_height="match_parent"
         android_fitsSystemWindows="true"
         app_contentScrim="?attr/colorPrimary"
         app_layout_scrollFlags="scroll|exitUntilCollapsed">

         <android.support.v7.widget.Toolbar
            android_id="@+id/toolbar"
            android_layout_width="match_parent"
            android_layout_height="?attr/actionBarSize"
            app_layout_collapseMode="pin"
            app_popupTheme="@style/AppTheme.PopupOverlay" />

      </android.support.design.widget.CollapsingToolbarLayout>
   </android.support.design.widget.AppBarLayout>

   <FrameLayout

      android_layout_width="match_parent"
      android_layout_height="match_parent"
      android_background="@android:color/holo_red_light">

      <TextView
         android_layout_width="wrap_content"
         android_layout_height="wrap_content"
         android_layout_gravity="center"
         android_text="Main Content"
         android_textAppearance="@style/TextAppearance.AppCompat.Title" />

   </FrameLayout>

   <LinearLayout
      android_id="@+id/design_bottom_sheet"
      android_layout_width="match_parent"
      android_layout_height="wrap_content"
      android_background="@android:color/holo_green_light"
      android_orientation="vertical"
      android_paddingTop="8dp"
      app_behavior_peekHeight="32dp"
      app_layout_behavior="android.support.design.widget.BottomSheetBehavior">

      <TextView
         android_layout_width="match_parent"
         android_layout_height="wrap_content"
         android_layout_marginBottom="8dp"
         android_text="Line 1" />

      <TextView
         android_layout_width="match_parent"
         android_layout_height="wrap_content"
         android_layout_marginBottom="8dp"
         android_text="Line 2" />

      <TextView
         android_layout_width="match_parent"
         android_layout_height="wrap_content"
         android_layout_marginBottom="8dp"
         android_text="Line 3" />

      <TextView
         android_layout_width="match_parent"
         android_layout_height="wrap_content"
         android_layout_marginBottom="8dp"
         android_text="Line 4" />

      <TextView
         android_layout_width="match_parent"
         android_layout_height="wrap_content"
         android_layout_marginBottom="8dp"
         android_text="Line 5" />

      <TextView
         android_layout_width="match_parent"
         android_layout_height="wrap_content"
         android_layout_marginBottom="8dp"
         android_text="Line 6" />

   </LinearLayout>

</android.support.design.widget.CoordinatorLayout>
```

**(c). ScrollingActivity.java**

Create an Activity if it hasn't been created by [android studio](https://camposha.info/android/android-studio) already.

It is our only activity and yours maybe already named `MainActivity`, no problem.

```java
public class ScrollingActivity extends AppCompatActivity {..}
```

Inside our `onCreate()` we will be referencing our `BottomSheet`:

```java
 View bottomSheet = findViewById(R.id.design_bottom_sheet);
```

This will reference that LinearLayout which will be acting as our bottom sheet. Then we initialize the `BottomSheetBehavior` for our `BottomSheet`:

```java
BottomSheetBehavior behavior = BottomSheetBehavior.from(bottomSheet);
```

Then we can override the `BottomSheetCallBacks`:

```java
    behavior.setBottomSheetCallback(new BottomSheetBehavior.BottomSheetCallback() {
         @Override
         public void onSlide(@NonNull View bottomSheet, float slideOffset) {
            // React to dragging events
            Log.d(TAG, "onSlide: " + slideOffset);
         }

         @Override
         public void onStateChanged(@NonNull View bottomSheet, int newState) {
            Log.d(TAG, "onStateChanged: " + newState);
            // React to state change
         }
      });
```

Here's the full code:

```java
import android.os.Bundle;
import android.support.annotation.NonNull;
import android.support.design.widget.BottomSheetBehavior;
import android.support.v7.app.AppCompatActivity;
import android.support.v7.widget.Toolbar;
import android.util.Log;
import android.view.Menu;
import android.view.MenuItem;
import android.view.View;

public class ScrollingActivity extends AppCompatActivity {

   private static final String TAG = ScrollingActivity.class.getSimpleName();

   @Override
   public boolean onCreateOptionsMenu(Menu menu) {
      // Inflate the menu; this adds items to the action bar if it is present.
      getMenuInflater().inflate(R.menu.menu_scrolling, menu);
      return true;
   }

   @Override
   public boolean onOptionsItemSelected(MenuItem item) {
      // Handle action bar item clicks here. The action bar will
      // automatically handle clicks on the Home/Up button, so long
      // as you specify a parent activity in AndroidManifest.xml.
      int id = item.getItemId();

      //noinspection SimplifiableIfStatement
      if (id == R.id.action_settings) {
         return true;
      }
      return super.onOptionsItemSelected(item);
   }

   @Override
   protected void onCreate(Bundle savedInstanceState) {
      super.onCreate(savedInstanceState);
      setContentView(R.layout.activity_scrolling);
      Toolbar toolbar = (Toolbar) findViewById(R.id.toolbar);
      setSupportActionBar(toolbar);

      View bottomSheet = findViewById(R.id.design_bottom_sheet);
      BottomSheetBehavior behavior = BottomSheetBehavior.from(bottomSheet);
      behavior.setBottomSheetCallback(new BottomSheetBehavior.BottomSheetCallback() {
         @Override
         public void onSlide(@NonNull View bottomSheet, float slideOffset) {
            // React to dragging events
            Log.d(TAG, "onSlide: " + slideOffset);
         }

         @Override
         public void onStateChanged(@NonNull View bottomSheet, int newState) {
            Log.d(TAG, "onStateChanged: " + newState);
            // React to state change
         }
      });
   }
}
```

**(d). How to Run.**

We only have one class and one layout in the project. You can copy them or download the full project from here:

| No. | Resource | Action |
| --- | --- | --- |
| 1. | GitHub | [Browse/Download](https://github.com/Plinzen/BottomSheetBehaviorSample/archive/master.zip) |
| 2. | Project Thanks to | [@Plinzen](https://github.com/Plinzen) |

## Example 3: Android GoogleMap-Like BottomSheetBehavior

In this class we will look at yet another BottomSheetBehavior implementation.

We learn from and re-create an open source example of BottomSheetBehavior mimicking Google Map Behavior created by [@miguelhincapie](https://github.com/miguelhincapie).

It makes use of a library called [CustomBottomSheetBehavior](https://github.com/miguelhincapie/CustomBottomSheetBehavior) and is maintained by [@miguelhincapie](https://github.com/miguelhincapie).

#### Demo

Here's the project demo.

![Android CustomBottomSheetBehavior](https://raw.githubusercontent.com/akan44/CustomBottomSheetBehavior/master/CustomBottomSheetBehaviorLikeGoogleMaps3states.gif)

#### 1\. Installation

We start by installing the library as it is third party. We can easily do this via android studio through the gradle build system.

So proceed over to app level build.gradle and add the following under the dependencies closure:

```java
implementation 'com.mahc.custombottomsheetbehavior:googlemaps-like:0.9.1'
```

Sync your project after that.

#### 2\. Create User Interface

Well we will have three layouts.

##### (a). activity_main.xml

In our `activity_main.xml` we will have a CoordinatorLayout. Inside it we include a FrameLayout, a placeholder that can show our dummy map.

Our ToolBar will be placed in our AppBarLayout.

Then followed by a ViewPager for our pages.

We will then have our NestedScrollView, with our BottomSheet content placed inside it.

We then have a FloatingActionButton and lastly a `custombottomsheetbehavior`.

```xml
<?xml version="1.0" encoding="utf-8"?>
<android.support.design.widget.CoordinatorLayout
    android_id="@+id/coordinatorlayout"

    android_layout_width="match_parent"
    android_layout_height="match_parent"
    android_fitsSystemWindows="true"
    tools_context="com.mahc.custombottomsheet.MainActivity">

    <FrameLayout
        android_id="@+id/dummy_framelayout_replacing_map"
        android_layout_width="match_parent"
        android_layout_height="match_parent"
        android_background="@android:color/darker_gray"
        android_fitsSystemWindows="true"/>
    <!--</FrameLayout>-->
    <!--<fragment-->
    <!--android:layout_width="match_parent"-->
    <!--android:layout_height="match_parent"-->
    <!--android:id="@+id/support_map"-->
    <!--android:name="com.google.android.gms.maps.SupportMapFragment"/>-->

    <android.support.design.widget.AppBarLayout
        android_id="@+id/appbarlayout"
        android_layout_width="match_parent"
        android_layout_height="wrap_content"
        android_theme="@style/AppTheme.AppBarOverlay"
        app_layout_behavior="@string/ScrollingAppBarLayoutBehavior">

        <android.support.v7.widget.Toolbar
            android_id="@+id/toolbar"
            android_layout_width="match_parent"
            android_layout_height="?attr/actionBarSize"
            app_popupTheme="@style/AppTheme.PopupOverlay"/>
    </android.support.design.widget.AppBarLayout>

    <android.support.v4.view.ViewPager
        android_id="@+id/pager"
        android_layout_width="match_parent"
        android_layout_height="@dimen/anchor_point"
        android_background="@color/colorAccent"
        app_layout_behavior="@string/BackDropBottomSheetBehavior"
        android_fitsSystemWindows="true">
    </android.support.v4.view.ViewPager>

    <android.support.v4.widget.NestedScrollView
        android_layout_width="match_parent"
        android_layout_height="match_parent"
        android_orientation="vertical"
        app_behavior_peekHeight="@dimen/bottom_sheet_peek_height"
        android_id="@+id/bottom_sheet"
        app_layout_behavior="@string/BottomSheetBehaviorGoogleMapsLike"
        app_anchorPoint="@dimen/anchor_point"
        app_behavior_hideable="true"
        android_fitsSystemWindows="true">

        <include
            layout="@layout/bottom_sheet_content"
            android_layout_width="match_parent"
            android_layout_height="match_parent"
            android_fitsSystemWindows="true"/>
    </android.support.v4.widget.NestedScrollView>

    <android.support.design.widget.FloatingActionButton
        android_layout_height="wrap_content"
        android_layout_width="wrap_content"
        app_layout_anchor="@id/bottom_sheet"
        app_layout_anchorGravity="top|right|end"
        android_src="@drawable/ic_action_go"
        android_layout_margin="@dimen/fab_margin"
        app_layout_behavior="@string/ScrollAwareFABBehavior"
        android_clickable="true"
        android_focusable="true"/>

    <com.mahc.custombottomsheetbehavior.MergedAppBarLayout
        android_id="@+id/mergedappbarlayout"
        android_layout_width="match_parent"
        android_layout_height="wrap_content"
        app_layout_behavior="@string/MergedAppBarLayoutBehavior"/>

</android.support.design.widget.CoordinatorLayout>
```

##### (b). bottom_sheet_content.xml

Next we have the `bottom_sheet_content` layout. At the root we have a [LinearLayout](https://camposha.info/android/linearlayout).

This layout will be displaying our content which will be rendered in TextViews and ImageViews,so we add those widgets as well as ImageButton.

Here are the xml widgets we make use of in this layout.

1. TextView.
2. ImageView.
3. Button.
4. ImageButton

as well as Viewgroups like:

1. [LinearLayout](https://camposha.info/android/linearlayout).
2. [RelativeLayout](https://camposha.info/android/relativelayout).
3. FrameLayout.

```xml
<?xml version="1.0" encoding="utf-8"?>
<LinearLayout

    android_layout_width="match_parent"
    android_layout_height="match_parent"
    android_orientation="vertical"
    android_paddingBottom="16dp"
    android_background="@android:color/white">

    <RelativeLayout
        android_layout_width="match_parent"
        android_layout_height="@dimen/bottom_sheet_peek_height"
        android_background="@color/colorPrimary"
        android_paddingTop="8dp"
        android_paddingStart="16dp"
        android_paddingEnd="16dp"
        android_paddingBottom="8dp">

        <LinearLayout
            android_layout_width="wrap_content"
            android_layout_height="match_parent"
            android_orientation="vertical">

            <TextView
                android_id="@+id/bottom_sheet_title"
                android_layout_width="wrap_content"
                android_layout_height="wrap_content"
                android_text="Title dummy"
                android_textColor="@android:color/white"
                android_textSize="19sp"/>

            <TextView
                android_id="@+id/text_dummy1"
                android_layout_width="wrap_content"
                android_layout_height="wrap_content"
                android_text="Text dummy 1234 1234"
                android_textColor="@android:color/white"
                android_textSize="12sp"
                android_layout_marginTop="5dp"/>

            <TextView
                android_layout_width="wrap_content"
                android_layout_height="wrap_content"
                android_text="Text dummy qwer asdf zxcv"
                android_textColor="@android:color/white"
                android_textSize="12sp"
                android_layout_marginTop="5dp"/>

        </LinearLayout>

        <TextView
            android_layout_width="wrap_content"
            android_layout_height="wrap_content"
            android_text="5 min"
            android_textColor="@android:color/white"
            android_textSize="14sp"
            android_layout_alignParentEnd="true"
            android_layout_centerVertical="true"
            android_paddingTop="8dp"/>

    </RelativeLayout>

    <LinearLayout
        android_layout_width="match_parent"
        android_layout_height="wrap_content"
        android_orientation="horizontal"
        android_gravity="center_horizontal"
        android_paddingStart="16dp"
        android_paddingEnd="16dp"
        android_paddingBottom="12dp"
        android_background="@drawable/border_bottom">

        <RelativeLayout
            android_layout_width="wrap_content"
            android_layout_height="match_parent">

            <ImageButton
                android_id="@+id/button1"
                android_layout_width="70dp"
                android_layout_height="60dp"
                android_src="@android:drawable/ic_dialog_map"
                android_layout_centerHorizontal="true"
                android_background="?attr/selectableItemBackgroundBorderless"/>

            <TextView
                android_layout_width="wrap_content"
                android_layout_height="wrap_content"
                android_text="BUTTON 1"
                android_textColor="@android:color/black"
                android_layout_alignParentBottom="true"/>
        </RelativeLayout>

        <LinearLayout
            android_id="@+id/establecimiento_layout_favoritos_button"
            android_layout_width="wrap_content"
            android_layout_height="wrap_content"
            android_orientation="vertical"
            android_layout_marginEnd="20dp"
            android_layout_marginStart="20dp">

            <ImageButton
                android_id="@+id/button2"
                android_layout_width="70dp"
                android_layout_height="60dp"
                android_src="@android:drawable/ic_dialog_info"
                android_layout_centerHorizontal="true"
                android_background="?attr/selectableItemBackgroundBorderless"/>

            <TextView
                android_layout_width="wrap_content"
                android_layout_height="wrap_content"
                android_text="BUTTON 2"
                android_textColor="@android:color/black"/>
        </LinearLayout>

        <RelativeLayout
            android_layout_width="wrap_content"
            android_layout_height="match_parent">

            <ImageButton
                android_id="@+id/establecimiento_share_button"
                android_layout_width="70dp"
                android_layout_height="60dp"
                android_src="@android:drawable/ic_menu_share"
                android_layout_centerHorizontal="true"
                android_background="?attr/selectableItemBackgroundBorderless"/>

            <TextView
                android_layout_width="wrap_content"
                android_layout_height="wrap_content"
                android_text="BUTTON 3"
                android_textColor="@android:color/black"
                android_layout_alignParentBottom="true"/>
        </RelativeLayout>
    </LinearLayout>

    <RelativeLayout
        android_layout_width="match_parent"
        android_layout_height="wrap_content"
        android_background="@drawable/border_bottom">

        <ImageView
            android_id="@+id/establecimiento_icon_sucursales"
            android_layout_width="wrap_content"
            android_layout_height="wrap_content"
            app_srcCompat="@android:drawable/ic_secure"
            android_layout_marginEnd="16dp"
            android_layout_marginTop="12dp"
            android_layout_marginStart="16dp"
            android_layout_alignParentStart="true"
            android_layout_alignParentTop="true"/>

        <LinearLayout
            android_layout_width="match_parent"
            android_layout_height="wrap_content"
            android_orientation="vertical"
            android_layout_toEndOf="@id/establecimiento_icon_sucursales"
            android_layout_marginStart="16dp"
            android_layout_marginEnd="16dp">

            <FrameLayout
                android_layout_width="match_parent"
                android_layout_height="48dp">

                <Button
                    android_id="@+id/establecimiento_sucursal_row_button"
                    android_layout_width="wrap_content"
                    android_layout_height="wrap_content"
                    android_text="Text dummy 1"
                    android_layout_gravity="center_vertical"
                    android_background="?attr/selectableItemBackgroundBorderless"
                    android_textAllCaps="false"
                    android_textColor="@android:color/black"/>
            </FrameLayout>

            <FrameLayout
                android_layout_width="match_parent"
                android_layout_height="48dp">

                <Button
                    android_layout_width="wrap_content"
                    android_layout_height="wrap_content"
                    android_text="Text dummy 2"
                    android_layout_gravity="center_vertical"
                    android_background="?attr/selectableItemBackgroundBorderless"
                    android_textAllCaps="false"
                    android_textColor="@android:color/black"/>
            </FrameLayout>

            <FrameLayout
                android_layout_width="match_parent"
                android_layout_height="48dp">

                <Button
                    android_layout_width="wrap_content"
                    android_layout_height="wrap_content"
                    android_text="Text dummy 3"
                    android_layout_gravity="center_vertical"
                    android_background="?attr/selectableItemBackgroundBorderless"
                    android_textAllCaps="false"
                    android_textColor="@android:color/black"/>
            </FrameLayout>

        </LinearLayout>

    </RelativeLayout>

    <FrameLayout
        android_layout_width="match_parent"
        android_layout_height="56dp"
        android_layout_marginStart="16dp"
        android_layout_marginEnd="16dp">

        <TextView
            android_layout_width="wrap_content"
            android_layout_height="wrap_content"
            android_text="APACHE LICENSE"
            android_layout_gravity="center_vertical"
            android_textSize="18sp"
            android_textColor="@android:color/darker_gray"/>
    </FrameLayout>

    <TextView
        android_layout_width="wrap_content"
        android_layout_height="wrap_content"
        android_layout_margin="16dp"

        android_text="@string/dummy_text"
        android_textSize="12sp"
        android_textColor="@android:color/black"/>

    <FrameLayout
        android_layout_width="match_parent"
        android_layout_height="620dp"
        android_background="@color/colorAccent"
        android_layout_marginTop="40dp">

        <TextView
            android_layout_width="wrap_content"
            android_layout_height="wrap_content"
            android_layout_gravity="center"
            android_text="Your remaining content here"
            android_textColor="@android:color/white" />

    </FrameLayout>
</LinearLayout>
```

##### (c). pager_item.xml

Then the `pager_item.xml`.

```xml
<?xml version="1.0" encoding="utf-8"?>
<LinearLayout
    android_orientation="vertical" android_layout_width="match_parent"
    android_layout_height="match_parent">
    <ImageView
        android_layout_width="match_parent"
        android_layout_height="match_parent"
        android_id="@+id/imageView"
        android_scaleType="centerCrop"/>
</LinearLayout>
```

#### Our Java Code

##### (a). ItemPagerAdapter.java

First create a new class. Call it a `ItemPagerAdapter` and let's make it derive from `android.support.v4.view.PagerAdapter`.

```java
public class ItemPagerAdapter extends android.support.v4.view.PagerAdapter {..}
```

PagerAdapter acts as the base class for providing the adapter to populate pages inside of that ViewPager.

Add three instance fields in our class:

```java
    Context mContext;
    LayoutInflater mLayoutInflater;
    final int[] mItems;
```

First the Context is an interface to global information about an application environment. Normally Context allows access to application-specific resources and classes, as well as up-calls for application-level operations such as launching activities, broadcasting and receiving intents, etc.

In this case it will allow us inflate our layout into a view.

Then we have a LayoutInflater, a class that allows us instantiates a layout XML file into its corresponding View objects.

The int array will hold us image ids.

Then our constructor is responsible for first receiving a context object which will be required during inflation of our `pager_item` layout and secondly the `int` items which will hold our image ids.

We will also perform the inflation inside that constructor.

```java
    public ItemPagerAdapter(Context context, int[] items) {
        this.mContext = context;
        this.mLayoutInflater = (LayoutInflater) mContext.getSystemService(Context.LAYOUT_INFLATER_SERVICE);
        this.mItems = items;
    }
```

We then override the other methods.

Here's the full code for this class:

```java
package com.mahc.custombottomsheet;

import android.content.Context;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.ImageView;
import android.widget.LinearLayout;

import com.mahc.custombottomsheet.R;

public class ItemPagerAdapter extends android.support.v4.view.PagerAdapter {

    Context mContext;
    LayoutInflater mLayoutInflater;
    final int[] mItems;

    public ItemPagerAdapter(Context context, int[] items) {
        this.mContext = context;
        this.mLayoutInflater = (LayoutInflater) mContext.getSystemService(Context.LAYOUT_INFLATER_SERVICE);
        this.mItems = items;
    }

    @Override
    public int getCount() {
        return mItems.length;
    }

    @Override
    public boolean isViewFromObject(View view, Object object) {
        return view == ((LinearLayout) object);
    }

    @Override
    public Object instantiateItem(ViewGroup container, int position) {
        View itemView = mLayoutInflater.inflate(R.layout.pager_item, container, false);
        ImageView imageView = (ImageView) itemView.findViewById(R.id.imageView);
        imageView.setImageResource(mItems[position]);
        container.addView(itemView);
        return itemView;
    }

    @Override
    public void destroyItem(ViewGroup container, int position, Object object) {
        container.removeView((LinearLayout) object);
    }
}
```

##### (b). MainActivity.java

Finally here's our main activity. Maybe it's been generate to you by [android studio](https://camposha.info/android/android-studio).

So go ahead and as instance fields add an int array to hold our Drawables.

Also we'll have a TextView:

```java
    int[] mDrawables = {
            R.drawable.cheese_3,
            R.drawable.cheese_3,
            R.drawable.cheese_3,
            R.drawable.cheese_3,
            R.drawable.cheese_3,
            R.drawable.cheese_3
    };

    TextView bottomSheetTextView;
```

We start by referencing our widgets CoordinatorLayout as well as View to represent the bottom sheet.

```java
        CoordinatorLayout coordinatorLayout = (CoordinatorLayout) findViewById(R.id.coordinatorlayout);
        View bottomSheet = coordinatorLayout.findViewById(R.id.bottom_sheet);
```

Then we reference the `BottomSheetBehaviorGoogleMapsLike`. This is the library we are using to create a bottom sheet behavior like that in Google maps.

```java
        final BottomSheetBehaviorGoogleMapsLike behavior = BottomSheetBehaviorGoogleMapsLike.from(bottomSheet);
```

Then listen to various callbacks:

```java
        behavior.addBottomSheetCallback(new BottomSheetBehaviorGoogleMapsLike.BottomSheetCallback() {
            @Override
            public void onStateChanged(@NonNull View bottomSheet, int newState) {

                }
            }

            @Override
            public void onSlide(@NonNull View bottomSheet, float slideOffset) {
            }
        });
```

We are interested especially in the state change event where we get various state of our BottomSheetBehaviorGoogleMapsLike.

Here's the code:

```java
package com.mahc.custombottomsheet;

import android.support.annotation.NonNull;
import android.support.design.widget.AppBarLayout;
import android.support.design.widget.CoordinatorLayout;
import android.support.v4.view.ViewPager;
import android.support.v7.app.ActionBar;
import android.support.v7.app.AppCompatActivity;
import android.os.Bundle;
import android.support.v7.widget.Toolbar;
import android.util.Log;
import android.view.View;
import android.widget.TextView;

import com.mahc.custombottomsheetbehavior.BottomSheetBehaviorGoogleMapsLike;
import com.mahc.custombottomsheetbehavior.MergedAppBarLayout;
import com.mahc.custombottomsheetbehavior.MergedAppBarLayoutBehavior;

public class MainActivity extends AppCompatActivity {

    int[] mDrawables = {
            R.drawable.cheese_3,
            R.drawable.cheese_3,
            R.drawable.cheese_3,
            R.drawable.cheese_3,
            R.drawable.cheese_3,
            R.drawable.cheese_3
    };

    TextView bottomSheetTextView;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);

        Toolbar toolbar = (Toolbar) findViewById(R.id.toolbar);
        setSupportActionBar(toolbar);
        ActionBar actionBar = getSupportActionBar();
        if (actionBar != null) {
            actionBar.setDisplayHomeAsUpEnabled(true);
            actionBar.setTitle(" ");
        }

        /**
         * If we want to listen for states callback
         */
        CoordinatorLayout coordinatorLayout = (CoordinatorLayout) findViewById(R.id.coordinatorlayout);
        View bottomSheet = coordinatorLayout.findViewById(R.id.bottom_sheet);
        final BottomSheetBehaviorGoogleMapsLike behavior = BottomSheetBehaviorGoogleMapsLike.from(bottomSheet);
        behavior.addBottomSheetCallback(new BottomSheetBehaviorGoogleMapsLike.BottomSheetCallback() {
            @Override
            public void onStateChanged(@NonNull View bottomSheet, int newState) {
                switch (newState) {
                    case BottomSheetBehaviorGoogleMapsLike.STATE_COLLAPSED:
                        Log.d("bottomsheet-", "STATE_COLLAPSED");
                        break;
                    case BottomSheetBehaviorGoogleMapsLike.STATE_DRAGGING:
                        Log.d("bottomsheet-", "STATE_DRAGGING");
                        break;
                    case BottomSheetBehaviorGoogleMapsLike.STATE_EXPANDED:
                        Log.d("bottomsheet-", "STATE_EXPANDED");
                        break;
                    case BottomSheetBehaviorGoogleMapsLike.STATE_ANCHOR_POINT:
                        Log.d("bottomsheet-", "STATE_ANCHOR_POINT");
                        break;
                    case BottomSheetBehaviorGoogleMapsLike.STATE_HIDDEN:
                        Log.d("bottomsheet-", "STATE_HIDDEN");
                        break;
                    default:
                        Log.d("bottomsheet-", "STATE_SETTLING");
                        break;
                }
            }

            @Override
            public void onSlide(@NonNull View bottomSheet, float slideOffset) {
            }
        });

        MergedAppBarLayout mergedAppBarLayout = findViewById(R.id.mergedappbarlayout);
        MergedAppBarLayoutBehavior mergedAppBarLayoutBehavior = MergedAppBarLayoutBehavior.from(mergedAppBarLayout);
        mergedAppBarLayoutBehavior.setToolbarTitle("Title Dummy");
        mergedAppBarLayoutBehavior.setNavigationOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                behavior.setState(BottomSheetBehaviorGoogleMapsLike.STATE_ANCHOR_POINT);
            }
        });

        bottomSheetTextView = (TextView) bottomSheet.findViewById(R.id.bottom_sheet_title);
        ItemPagerAdapter adapter = new ItemPagerAdapter(this,mDrawables);
        ViewPager viewPager = (ViewPager) findViewById(R.id.pager);
        viewPager.setAdapter(adapter);

        behavior.setState(BottomSheetBehaviorGoogleMapsLike.STATE_ANCHOR_POINT);
        //behavior.setCollapsible(false);
    }
}
```

##### (d). How to Run.

The download contains both a library as well as code. Just go to the [app folder](https://github.com/miguelhincapie/CustomBottomSheetBehavior/tree/master/app) and you find the code for the sample.

Go over to your app level build.gradle and add statement via the implementation statement just as we did in the Installation section.

| No. | Resource | Action |
| --- | --- | --- |
| 1. | GitHub | [Download](https://github.com/miguelhincapie/CustomBottomSheetBehavior/archive/master.zip) |
| 2. | GitHub | [Browse](https://github.com/miguelhincapie/CustomBottomSheetBehavior/tree/master/app) |
| 3. | Project Thanks to | [@miguelhincapie](https://github.com/miguelhincapie) |

## Example 5: Kotlin Android BottomSheetBehavior Example

A BottomSheet exmaple written in Kotlin.

### Step 1: Create Project

Start by creating an empty `Android Studio` project.

### Step 2: Dependencies

No external dependencies are needed for this project.

### Step : Create Menu Adapter

**MenuAdapter.kt**

```kotlin
import android.app.Activity
import android.content.Context
import androidx.recyclerview.widget.RecyclerView
import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import kotlinx.android.synthetic.main.list_recycler_view.view.*

class MenuAdapter(private val context: Context, private val listImages: List<Int>) :
        RecyclerView.Adapter<MenuAdapter.MenuViewHolder>() {

    override fun onBindViewHolder(holder: MenuViewHolder, position: Int) {
        holder.bindItems(listImages[position])
    }

    override fun onCreateViewHolder(parent: ViewGroup, viewType: Int): MenuViewHolder {
        val view = LayoutInflater.from(context).inflate(R.layout.list_recycler_view, parent,
                false)
        return MenuViewHolder(view)
    }

    override fun getItemCount(): Int {
        return 4
    }

    class MenuViewHolder(itemView: View) : RecyclerView.ViewHolder(itemView) {

        fun bindItems(image: Int) {
            itemView.image_card_view.setImageResource(image)
        }
    }
}
```

### Step : Create Menu Fragment

**MenuFragment.kt**

```kotlin
import android.os.Bundle
import androidx.fragment.app.Fragment
import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import androidx.recyclerview.widget.GridLayoutManager
import kotlinx.android.synthetic.main.fragment_menu.view.*

class MenuFragment : Fragment() {

    lateinit var pos: String

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        val bundle = arguments
        val string = bundle?.getString("key")
        when (string) {
            "0" -> {
                pos = "0"
            }
            "1" -> {
                pos = "1"
            }
            "2" -> {
                pos = "2"
            }
        }
    }

    override fun onCreateView(inflater: LayoutInflater, container: ViewGroup?,
                              savedInstanceState: Bundle?): View? {
        // Inflate the layout for this fragment
        val v = inflater.inflate(R.layout.fragment_menu, container, false)
        when (pos) {
            "0" -> {
                val imageList = listOf<Int>(R.drawable.ic_local_gas_station_grey_700_24dp,
                        R.drawable.ic_local_grocery_store_grey_700_24dp,
                        R.drawable.ic_local_atm_grey_700_24dp,
                        R.drawable.ic_local_pharmacy_grey_700_24dp)
                val menuAdapter = MenuAdapter(activity!!.applicationContext, imageList)
                val grid = GridLayoutManager(activity, 2)
                v.recycler_view.layoutManager = grid
                v.recycler_view.adapter = menuAdapter
            }
            "1" -> {

            }
            "2" -> {

            }
        }
        return v
    }

}
```

### Step : Create FragmentPagerAdapter

**ViewPagerAdapter.kt**

```kotlin
import android.os.Bundle
import androidx.fragment.app.Fragment
import androidx.fragment.app.FragmentManager
import androidx.fragment.app.FragmentPagerAdapter

class ViewPagerAdapter(fm: FragmentManager) : FragmentPagerAdapter(fm) {

    override fun getItem(position: Int): Fragment {
        when (position) {
            0 -> {
                val fragment = MenuFragment()
                with(fragment) {
                    val bundle = Bundle()
                    bundle.putString("key", "0")
                    arguments = bundle
                }
                return fragment
            }
            1 -> {
                val fragment = MenuFragment()
                with(fragment) {
                    val bundle = Bundle()
                    bundle.putString("key", "1")
                    arguments = bundle
                }
                return fragment
            }
            2 -> {
                val fragment = MenuFragment()
                with(fragment) {
                    val bundle = Bundle()
                    bundle.putString("key", "2")
                    arguments = bundle
                }
                return fragment
            }
            else -> return MenuFragment()
        }
    }

    override fun getCount(): Int {
        return 3
    }

}
```

### Step : Write MainActivity code

**MainActivity.kt**

```kotlin
import android.graphics.Color
import android.os.Bundle
import com.google.android.material.bottomsheet.BottomSheetBehavior
import com.google.android.material.tabs.TabLayout
import androidx.appcompat.app.AppCompatActivity
import android.view.View
import kotlinx.android.synthetic.main.activity_main.*
import kotlinx.android.synthetic.main.bottom_sheet.*
import java.util.logging.Logger

class MainActivity : AppCompatActivity() {

    var sheetBehavior: BottomSheetBehavior<*>? = null

    companion object {
        val log = Logger.getLogger(MainActivity::class.java.name)
    }

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_main)
        setSupportActionBar(toolbar)
        toolbar.setTitleTextColor(Color.WHITE)
        sheetBehavior = BottomSheetBehavior.from(bottom_sheet_layout)
        sheetBehavior?.setBottomSheetCallback(object : BottomSheetBehavior.BottomSheetCallback() {

            override fun onSlide(bottomSheet: View, slideOffset: Float) {
                log.info("On Slide")
            }

            override fun onStateChanged(bottomSheet: View, newState: Int) {
                log.info("On State changes")
            }

        })
        tab_layout.addTab(tab_layout.newTab()
                .setIcon(R.drawable.ic_location_on_grey_600_24dp))
        tab_layout.addTab(tab_layout.newTab()
                .setIcon(R.drawable.ic_directions_car_grey_700_24dp))
        tab_layout.addTab(tab_layout.newTab().
                setIcon(R.drawable.ic_directions_bus_grey_700_24dp))
        val adapter = ViewPagerAdapter(supportFragmentManager)
        view_pager.adapter = adapter
        view_pager.addOnPageChangeListener(TabLayout
                .TabLayoutOnPageChangeListener(tab_layout))

    }

}
```

### Run

Copy the code or download it in the link below, build and run.

### Reference

Here are the reference links:

| Number | Link |
| --- | --- |
| 1. | [Download](https://downgit.github.io/#/home?url=https://github.com/amanjeetsingh150/kotlin-android-examples/tree/master/BottomSheets) Example |
| 2. | [Follow](https://github.com/amanjeetsingh150/) code author |
| 3. | Code: [Apache 2.0 License](http://www.apache.org/licenses/LICENSE-2.0.txt) |

## AnchorSheetBehaviour

This is a project that adds anchor state to the android BottomSheetBehavior. AnchorBottomSheetBehavior extends the Android's behavior BottomSheetBehavior by adding the following:

1. `STATE_ANCHOR`: push the bottom sheet to an anchor state defined by Anchor offset
2. `STATE_FORCE_HIDE`: force the bottom sheet to hide regardless of hideable flag

Here's the demo for this project:

![Android AnchorBottomSheetBehavior](https://github.com/skimarxall/AnchorSheetBehavior/raw/master/anchorsheetbehavior_demo.gif.gif)

#### Installation

We are using a third party library so we start by adding an implementation statement to fetch for us the library.

First we go to the root level build.gradle and add jitpack maven repository under the repositories closure as follows:

```groovy
allprojects {
    repositories {
        ...
        maven { url 'https://jitpack.io' }
    }
}
```

Then we navigate to the app level build.gradle and add the following under the dependencies:

```groovy
implementation 'com.github.skimarxall:AnchorSheetBehavior:master-SNAPSHOT'
```

#### XML Layouts

##### (a). activity_main.xml

As expected we have CoordinatorLayout defined at the root of xml layout.

Then we have a clickable TextView which when clicked will toggle the state of our AnchorSheetBehavior.

We will use a FrameLayout as our anchor panel. Inside we will have a textView to contain our content.

```xml
<?xml version="1.0" encoding="utf-8"?>
<android.support.design.widget.CoordinatorLayout

    android_layout_width="match_parent"
    android_layout_height="match_parent">

    <TextView
        android_layout_width="match_parent"
        android_layout_height="match_parent"
        android_layout_margin="30dp"
        android_gravity="center_horizontal"
        android_onClick="onTap"
        android_text="Tap me!"
        android_textSize="25sp" />

    <FrameLayout
        android_id="@+id/anchor_panel"
        android_layout_width="match_parent"
        android_layout_height="match_parent"
        android_background="@color/colorPrimaryDark"
        app_layout_behavior="com.hardsoftstudio.widget.AnchorSheetBehavior"
        app_behavior_peekHeight="@dimen/panel_content_height">

        <TextView
            android_id="@+id/panel_content"
            android_layout_width="match_parent"
            android_layout_height="@dimen/panel_content_height"
            android_gravity="center"
            android_textColor="@android:color/white"
            android_text="@string/slide_me_up"
            android_textSize="20sp" />

    </FrameLayout>

</android.support.design.widget.CoordinatorLayout>
```

#### Java Code

##### (a). MainActivity.java

We start by declaring our `AnchorBottomSheetBehavior` and TextView which will hold our data.

Remember we had a clickable textview defined in our layout. When clicked the following method will get invoked:

```java
    public void onTap(View view) {
        switch (anchorBehavior.getState()) {
            case AnchorSheetBehavior.STATE_ANCHOR:
                anchorBehavior.setState(AnchorSheetBehavior.STATE_EXPANDED);
                break;
            case AnchorSheetBehavior.STATE_COLLAPSED:
                anchorBehavior.setState(AnchorSheetBehavior.STATE_ANCHOR);
                break;
            case AnchorSheetBehavior.STATE_HIDDEN:
                anchorBehavior.setState(AnchorSheetBehavior.STATE_COLLAPSED);
                break;
            case AnchorSheetBehavior.STATE_EXPANDED:
                anchorBehavior.setState(AnchorSheetBehavior.STATE_ANCHOR);
                break;
            default:
                break;
        }
    }
```

There you can see we have used a switch statement to switch through the various `AnchorSheetBehavior` states, setting the appropriate states in the process.

Here's the full code:

```java
package com.hardsoftstudio.anchorbottomsheet;

import android.os.Bundle;
import android.support.annotation.NonNull;
import android.support.v7.app.AppCompatActivity;
import android.view.View;
import android.widget.TextView;

import com.hardsoftstudio.widget.AnchorSheetBehavior;

public class MainActivity extends AppCompatActivity {

    private AnchorSheetBehavior<View> anchorBehavior;
    private TextView content;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);

        content = findViewById(R.id.panel_content);

        anchorBehavior = AnchorSheetBehavior.from(findViewById(R.id.anchor_panel));
        anchorBehavior.setHideable(true);
        anchorBehavior.setState(AnchorSheetBehavior.STATE_HIDDEN);
        anchorBehavior.setAnchorSheetCallback(new AnchorSheetBehavior.AnchorSheetCallback() {
            @Override
            public void onStateChanged(@NonNull View bottomSheet, @AnchorSheetBehavior.State int newState) {
                content.setText(newState == AnchorSheetBehavior.STATE_EXPANDED ? R.string.slide_me_down : R.string.slide_me_up);
            }

            @Override
            public void onSlide(@NonNull View bottomSheet, float slideOffset) {

            }
        });
    }

    @Override
    public void onBackPressed() {
        int state = anchorBehavior.getState();
        if (state == AnchorSheetBehavior.STATE_COLLAPSED || state == AnchorSheetBehavior.STATE_HIDDEN) {
            super.onBackPressed();
        } else {
            anchorBehavior.setState(AnchorSheetBehavior.STATE_COLLAPSED);
        }
    }

    public void onTap(View view) {
        switch (anchorBehavior.getState()) {
            case AnchorSheetBehavior.STATE_ANCHOR:
                anchorBehavior.setState(AnchorSheetBehavior.STATE_EXPANDED);
                break;
            case AnchorSheetBehavior.STATE_COLLAPSED:
                anchorBehavior.setState(AnchorSheetBehavior.STATE_ANCHOR);
                break;
            case AnchorSheetBehavior.STATE_HIDDEN:
                anchorBehavior.setState(AnchorSheetBehavior.STATE_COLLAPSED);
                break;
            case AnchorSheetBehavior.STATE_EXPANDED:
                anchorBehavior.setState(AnchorSheetBehavior.STATE_ANCHOR);
                break;
            default:
                break;
        }
    }
}
```

#### How to Download and Run

First download the project below.

The download contains both a library as well as code. Just go to the [app folder](https://github.com/skimarxall/AnchorSheetBehavior/tree/master/app) and you find the code for the sample.

Go over to your app level build.gradle and add our implementation statement just as we did in the Installation section.

| No. | Resource | Action |
| --- | --- | --- |
| 1. | GitHub | [Download](https://github.com/skimarxall/AnchorSheetBehavior/archive/master.zip) |
| 2. | GitHub | [Browse](https://github.com/skimarxall/AnchorSheetBehavior/tree/master/app) |
| 3. | Credit | [@miguelhincapie](https://github.com/skimarxall) |
