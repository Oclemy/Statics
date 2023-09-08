# Kotlin Android Zoomable ImageView Tutorial and Examples

In this tutorial we want to look at some cool image zoom capabilities and how to induce them in our apps. We will basically be examining awesome zoomable imageview libraries in android, so let's start.

This tutorial can help you achieve the following:

1. Zoom Images.
2. Show Image in full screen.
3. Implement Pinch to Zoom on Images.
4. Zoom Videos


## (a). Use ZoomableImageView

> An android library for zooming image from any context to full screen.

Here's the demo: ![](https://github.com/RaviKoradiya/ZoomableImageView/raw/master/demo_image/ezgif-2-ccb935fa45.gif?raw=true)

### Step 1: How to Install

This library is available in jitpack so you need to add the following in your project-level build.gradle file:

```groovy
allprojects {
    repositories {
        maven { url "https://jitpack.io" } // add this line
    }
}
```

Then add the implementation statement of the library in your app level build.gradle:

```groovy
implementation 'com.github.RaviKoradiya:ZoomableImageView:1.1.1'
```

### Step 2: How to Use

In your layout add:

```xml
<com.ravikoradiya.zoomableimageview.ZoomableImageView
            android:id="@+id/iv_zoomable"
            android:layout_width="match_parent"
            android:layout_height="300dp"
            android:scaleType="centerCrop"
            android:src="@drawable/test"
            app:background_color="@color/colorPrimaryDark" />
```

Then in the Kotlin/Java code:

```java
        ZoomableImageView zoomableImageView = (ZoomableImageView) findViewById(R.id.iv_zoomable);
        zoomableImageView.setImageUrl("http://...");
```

### Step 3: Example

Here's an example in kotlin

```java
package com.ravikoradiya.zoomableimageviewmaster

import android.support.v7.app.AppCompatActivity
import android.os.Bundle

import com.ravikoradiya.zoomableimageview.ZoomableImageView

class MainActivity : AppCompatActivity() {

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_main)

        val zoomableImageView = findViewById(R.id.iv_zoomable) as ZoomableImageView
        zoomableImageView.setImageUrl("http://...")

    }
}
```

And here's it's layout:

```xml
<?xml version="1.0" encoding="utf-8"?>
<ScrollView xmlns:android="http://schemas.android.com/apk/res/android"
    xmlns:app="http://schemas.android.com/apk/res-auto"
    xmlns:tools="http://schemas.android.com/tools"
    android:layout_width="match_parent"
    android:layout_height="match_parent"
    tools:context="com.ravikoradiya.zoomableimageviewmaster.MainActivity">

    <LinearLayout
        android:layout_width="match_parent"
        android:layout_height="wrap_content"
        android:orientation="vertical">

        <com.ravikoradiya.zoomableimageview.ZoomableImageView
            android:id="@+id/iv_zoomable"
            android:layout_width="match_parent"
            android:layout_height="300dp"
            android:scaleType="centerCrop"
            android:src="@drawable/test"
            app:background_color="@color/colorPrimaryDark" />

        <com.ravikoradiya.zoomableimageview.ZoomableImageView
            android:layout_width="match_parent"
            android:layout_height="300dp"
            android:scaleType="centerCrop"
            android:src="@drawable/test3"
            app:image_url="http://www.natural-beginning.com/wp-content/uploads/2013/09/natural-beginning-home-4.png" />

        <com.ravikoradiya.zoomableimageview.ZoomableImageView
            android:layout_width="200dp"
            android:layout_height="100dp"
            android:layout_gravity="center"
            android:scaleType="centerCrop"
            android:src="@drawable/test2" />

    </LinearLayout>
</ScrollView>
```

Find full example [here](https://github.com/RaviKoradiya/ZoomableImageView/tree/master/app)

### Step 4: Reference

Find full source code reference [here](https://github.com/RaviKoradiya/ZoomableImageView).

## (b). Use ZoonLayout

> ZoomLayout is a 2D zoom and pan behavior for View hierarchies, images, video streams, and much more, written in Kotlin for Android.

It is a collection of flexible Android components that support zooming and panning of View hierarchies, images, video streams, and much more - either programmatically or through touch events.

Here are it's features:

- `ZoomLayout`: a container that supports 2D pan and zoom to a View hierarchy, even supporting clicks.
- `ZoomImageView`: An ImageView that supports 2D pan and zoom.
- `ZoomSurfaceView`: A SurfaceView that supports 2D pan and zoom with OpenGL rendering.
- Powerful zoom APIs
- Powerful pan APIs
- Lightweight, no dependencies
- Works down to API 16

Here is a demo of the project that will be created:

![](https://github.com/natario1/ZoomLayout/raw/master/docs/static/gif-1.gif)

### Step 1: Install it

Start by installing this library using the following implementation statement:

```groovy
implementation 'com.otaliastudios:zoomlayout:1.8.0'
```

### Step 2: Add to Layout

The next step is to add ZoomLayout to your xml layout. ZoomLayout is a flexible container for view hierarchies that can be panned or zoomed. Use it by simply declaring it in your XML layout:

```xml
<com.otaliastudios.zoom.ZoomLayout
    android:layout_width="match_parent"
    android:layout_height="match_parent"
    android:scrollbars="vertical|horizontal"
    app:transformation="centerInside"
    app:transformationGravity="auto"
    app:alignment="center"
    app:overScrollHorizontal="true"
    app:overScrollVertical="true"
    app:overPinchable="true"
    app:horizontalPanEnabled="true"
    app:verticalPanEnabled="true"
    app:zoomEnabled="true"
    app:flingEnabled="true"
    app:scrollEnabled="true"
    app:oneFingerScrollEnabled="true"
    app:twoFingersScrollEnabled="true"
    app:threeFingersScrollEnabled="true"
    app:minZoom="0.7"
    app:minZoomType="zoom"
    app:maxZoom="2.5"
    app:maxZoomType="zoom"
    app:animationDuration="280"
    app:hasClickableChildren="false">

    <!-- Content here. -->

</com.otaliastudios.zoom.ZoomLayout>
```

You can also zoom programmatically as follows:

```java
zoomLayout.panTo(x, y, true); // Shorthand for zoomLayout.getEngine().panTo(x, y, true)
zoomLayout.panBy(deltaX, deltaY, true);
zoomLayout.zoomTo(zoom, true);
zoomLayout.zoomBy(factor, true);
zoomLayout.realZoomTo(realZoom, true);
zoomLayout.moveTo(zoom, x, y, true);
```

### Full Example

1. Create Android Project
2. Install the `ZoomLayout` as has been discussed above.
3. Add to Layout

In your project add ZoomLayout to your `activity_main.xml` layout as follows;

**activity_main.xml**

```xml
<?xml version="1.0" encoding="utf-8"?>
<LinearLayout xmlns:android="http://schemas.android.com/apk/res/android"
    xmlns:app="http://schemas.android.com/apk/res-auto"
    android:layout_width="match_parent"
    android:layout_height="match_parent"
    android:background="@color/background"
    android:orientation="vertical">

    <com.otaliastudios.zoom.ZoomLayout
        android:id="@+id/zoom_layout"
        android:layout_width="match_parent"
        android:layout_height="0dp"
        android:layout_weight="1"
        android:scrollbars="horizontal|vertical"
        app:hasClickableChildren="true"
        app:horizontalPanEnabled="true"
        app:verticalPanEnabled="true"
        app:zoomEnabled="true">

        <com.otaliastudios.zoom.demo.ColorGridView
            android:layout_width="wrap_content"
            android:layout_height="wrap_content" />

    </com.otaliastudios.zoom.ZoomLayout>

    <com.otaliastudios.zoom.ZoomImageView
        android:id="@+id/zoom_image"
        android:layout_width="match_parent"
        android:layout_height="0dp"
        android:layout_weight="1"
        android:scrollbars="horizontal|vertical"
        android:visibility="gone"
        app:horizontalPanEnabled="true"
        app:verticalPanEnabled="true"
        app:zoomEnabled="true" />

    <FrameLayout
        android:id="@+id/zoom_surface"
        android:visibility="gone"
        android:layout_width="match_parent"
        android:layout_height="0dp"
        android:layout_weight="1">

        <com.otaliastudios.zoom.ZoomSurfaceView
            android:id="@+id/surface_view"
            android:layout_width="match_parent"
            android:layout_height="match_parent"
            app:horizontalPanEnabled="true"
            app:verticalPanEnabled="true"
            app:zoomEnabled="true" />

        <com.google.android.exoplayer2.ui.PlayerControlView
            android:id="@+id/player_control_view"
            android:layout_gravity="bottom"
            android:layout_width="match_parent"
            android:layout_height="wrap_content"/>

    </FrameLayout>

    <LinearLayout
        android:layout_width="match_parent"
        android:layout_height="wrap_content"
        android:background="@color/colorAccent"
        android:orientation="horizontal">

        <Button
            android:id="@+id/show_zl"
            android:layout_width="0dp"
            android:layout_height="wrap_content"
            android:layout_weight="0.5"
            android:background="@null"
            android:text="Hierarchy" />

        <Button
            android:id="@+id/show_ziv"
            android:layout_width="0dp"
            android:layout_height="wrap_content"
            android:layout_weight="0.5"
            android:background="@null"
            android:text="Image" />

        <Button
            android:id="@+id/show_zsv"
            android:layout_width="0dp"
            android:layout_height="wrap_content"
            android:layout_weight="0.5"
            android:background="@null"
            android:text="Video" />

    </LinearLayout>

</LinearLayout>
```

Write Code. There are three classes;

1. ColorGridDrawable.java
2. ColorGridView.java
3. MainActivity.java

**MainActivity.java**

Here is the code for the main activity:

```java
public class MainActivity extends AppCompatActivity {

    private SimpleExoPlayer player;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        ZoomLogger.setLogLevel(ZoomLogger.LEVEL_VERBOSE);
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);

        final boolean supportsSurfaceView = Build.VERSION.SDK_INT >= Build.VERSION_CODES.JELLY_BEAN_MR2;
        if (supportsSurfaceView) setUpVideoPlayer();

        final Button buttonZoomLayout = findViewById(R.id.show_zl);
        final Button buttonZoomImage = findViewById(R.id.show_ziv);
        final Button buttonZoomSurface = findViewById(R.id.show_zsv);
        final ZoomLayout zoomLayout = findViewById(R.id.zoom_layout);
        final ZoomImageView zoomImage = findViewById(R.id.zoom_image);
        final View zoomSurface = findViewById(R.id.zoom_surface);
        zoomImage.setImageDrawable(new ColorGridDrawable());

        buttonZoomLayout.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View view) {
                if (supportsSurfaceView) player.setPlayWhenReady(false);
                zoomSurface.setVisibility(View.GONE);
                zoomImage.setVisibility(View.GONE);
                zoomLayout.setVisibility(View.VISIBLE);
                buttonZoomImage.setAlpha(0.65f);
                buttonZoomSurface.setAlpha(0.65f);
                buttonZoomLayout.setAlpha(1f);
            }
        });

        buttonZoomImage.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View view) {
                if (supportsSurfaceView) player.setPlayWhenReady(false);
                zoomSurface.setVisibility(View.GONE);
                zoomLayout.setVisibility(View.GONE);
                zoomImage.setVisibility(View.VISIBLE);
                buttonZoomLayout.setAlpha(0.65f);
                buttonZoomSurface.setAlpha(0.65f);
                buttonZoomImage.setAlpha(1f);
            }
        });
        buttonZoomSurface.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                if (supportsSurfaceView) {
                    player.setPlayWhenReady(true);
                    zoomImage.setVisibility(View.GONE);
                    zoomLayout.setVisibility(View.GONE);
                    zoomSurface.setVisibility(View.VISIBLE);
                    buttonZoomLayout.setAlpha(0.65f);
                    buttonZoomImage.setAlpha(0.65f);
                    buttonZoomSurface.setAlpha(1f);
                } else {
                    Toast.makeText(MainActivity.this,
                            "ZoomSurfaceView requires API 18", Toast.LENGTH_SHORT).show();
                }
            }
        });
        buttonZoomLayout.performClick();
    }

    @Override
    protected void onStop() {
        super.onStop();
        ZoomSurfaceView surface = findViewById(R.id.surface_view);
        surface.onPause();
    }

    @Override
    protected void onStart() {
        super.onStart();
        ZoomSurfaceView surface = findViewById(R.id.surface_view);
        surface.onResume();
    }

    @TargetApi(Build.VERSION_CODES.JELLY_BEAN_MR2)
    private void setUpVideoPlayer() {
        player = ExoPlayerFactory.newSimpleInstance(this);
        PlayerControlView controls = findViewById(R.id.player_control_view);
        final ZoomSurfaceView surface = findViewById(R.id.surface_view);
        player.addVideoListener(new VideoListener() {
            @Override
            public void onVideoSizeChanged(int width, int height, int unappliedRotationDegrees, float pixelWidthHeightRatio) {
                surface.setContentSize(width, height);
            }
        });
        surface.setBackgroundColor(ContextCompat.getColor(this, R.color.background));
        surface.addCallback(new ZoomSurfaceView.Callback() {
            @Override
            public void onZoomSurfaceCreated(@NotNull ZoomSurfaceView view) {
                player.setVideoSurface(view.getSurface());
            }

            @Override
            public void onZoomSurfaceDestroyed(@NotNull ZoomSurfaceView view) { }
        });
        controls.setPlayer(player);
        controls.setShowTimeoutMs(0);
        controls.show();
        DataSource.Factory dataSourceFactory = new DefaultDataSourceFactory(this,
                Util.getUserAgent(this, "ZoomLayoutLib"));
        Uri videoUri = Uri.parse("https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4");
        MediaSource videoSource = new ExtractorMediaSource.Factory(dataSourceFactory)
                .createMediaSource(videoUri);
        player.prepare(videoSource);
    }

    @Override
    protected void onDestroy() {
        super.onDestroy();
        player.release();
    }
}
```

Find the rest of the code in the download link below.

### Reference

Here are the reference links:

| Number | Link |
| --- | --- |
| 1. | [Download](https://downgit.github.io/#/home?url=https://github.com/natario1/ZoomLayout/tree/master/app) Example |
| 2. | [Read More](https://github.com/natario1/ZoomLayout/) Example |

## (c). Use Zoomage

> Zoomage is a simple pinch-to-zoom ImageView library for Android.

You can use this library to implement the pinch to zoom effect on images.

Here's how you use it:

### Step 1: Install it

Start by installing this library. Simply declare it as a dependency in your `app/build.gradle` file:

```groovy
implementation 'com.jsibbold:zoomage:1.3.1'
```

### Step 2: Add to Layout

To use it all you need to do is add a `ZoomageView` as you would any typical `ImageView` in Android. The `scaleType` that you set on your ZoomageView will determine the starting size and position of your `ZoomageView`'s image. This is the inherited `ImageView.ScaleType` from Android. With a `ZoomageView`, the `fitCenter` or `centerInside` scale types usually make the most sense to use, `fitCenter` being Android's default scale type.

```xml
    <RelativeLayout
        xmlns:android="http://schemas.android.com/apk/res/android"
        xmlns:app="http://schemas.android.com/apk/res-auto"
        android:layout_width="match_parent"
        android:layout_height="match_parent">

        <com.jsibbold.zoomage.ZoomageView
            android:id="@+id/myZoomageView"
            android:layout_width="match_parent"
            android:layout_height="match_parent"
            android:src="@drawable/my_zoomable_image"
            app:zoomage_restrictBounds="false"
            app:zoomage_animateOnReset="true"
            app:zoomage_autoResetMode="UNDER"
            app:zoomage_autoCenter="true"
            app:zoomage_zoomable="true"
            app:zoomage_translatable="true"
            app:zoomage_minScale="0.6"
            app:zoomage_maxScale="8"
            />
    </RelativeLayout>
```

If using a ZoomageView with a view pager, it is recommended that [ViewPager2](https://developer.android.com/jetpack/androidx/releases/viewpager2) is used.

### Full Example

Here is a full example demonstrating the pinch to zoom using the `Zoomage` library.

Start by following the following steps:

1. Create an android project.
2. Install Zoomage.
3. Create Layouts

We will have two layouts:

**zoomage_options.xml**

```xml
<?xml version="1.0" encoding="utf-8"?>
<LinearLayout xmlns:android="http://schemas.android.com/apk/res/android"
              xmlns:app="http://schemas.android.com/apk/res-auto"
              android:orientation="vertical"
              android:gravity="right"
              android:background="#fff"
              android:layout_width="wrap_content"
              android:layout_height="wrap_content">

    <androidx.appcompat.widget.SwitchCompat
        android:id="@+id/zoomable"
        android:text="Zoomable"
        android:padding="5dp"
        app:switchPadding="5dp"
        android:layout_width="wrap_content"
        android:layout_height="wrap_content"/>
    <androidx.appcompat.widget.SwitchCompat
        android:id="@+id/translatable"
        android:text="Translatable"
        android:padding="5dp"
        app:switchPadding="5dp"
        android:layout_width="wrap_content"
        android:layout_height="48dp"/>
    <androidx.appcompat.widget.SwitchCompat
        android:id="@+id/restrictBounds"
        android:text="Restrict Bounds"
        android:padding="5dp"
        app:switchPadding="5dp"
        android:layout_width="wrap_content"
        android:layout_height="48dp"/>
    <androidx.appcompat.widget.SwitchCompat
        android:id="@+id/animateOnReset"
        android:text="Animate On Reset"
        android:padding="5dp"
        app:switchPadding="5dp"
        android:layout_width="wrap_content"
        android:layout_height="48dp"/>
    <androidx.appcompat.widget.SwitchCompat
        android:id="@+id/autoCenter"
        android:text="Auto Center"
        android:padding="5dp"
        app:switchPadding="5dp"
        android:layout_width="wrap_content"
        android:layout_height="48dp"/>

    <TextView
        android:id="@+id/reset"
        android:text="Reset"
        android:padding="5dp"
        android:layout_width="wrap_content"
        android:layout_height="48dp"/>

    <TextView
        android:id="@+id/autoReset"
        android:text="Auto Reset Mode"
        android:padding="5dp"
        android:layout_width="wrap_content"
        android:layout_height="48dp"/>

</LinearLayout>
```

**activity_main.xml**

Then in include the `zoomage_options.xml` in your `activity_main.xml` as below:

```xml
<?xml version="1.0" encoding="utf-8"?>
<RelativeLayout
    xmlns:android="http://schemas.android.com/apk/res/android"
    xmlns:app="http://schemas.android.com/apk/res-auto"
    xmlns:tools="http://schemas.android.com/tools"
    android:layout_width="match_parent"
    android:layout_height="match_parent"
    android:padding="2dp"
    tools:context="com.jsibbold.zoomage.example.MainActivity">

    <com.jsibbold.zoomage.ZoomageView
        android:id="@+id/demoView"
        android:layout_width="match_parent"
        android:layout_height="match_parent"
        android:src="@drawable/zoom_demo"
        app:zoomage_restrictBounds="false"
        app:zoomage_animateOnReset="true"
        app:zoomage_autoResetMode="UNDER"
        app:zoomage_autoCenter="true"
        app:zoomage_zoomable="true"
        app:zoomage_translatable="true"
        app:zoomage_minScale="0.6"
        app:zoomage_maxScale="8"
        />
    <include
        android:id="@+id/optionsView"
        android:visibility="gone"
        android:layout_alignParentRight="true"
        android:layout_width="wrap_content"
        android:layout_height="wrap_content"
        layout="@layout/zoomage_options" />
</RelativeLayout>
```

4.Write Code

Lastly write your code.

**MainActivity.java**

```java
public class MainActivity extends AppCompatActivity implements View.OnClickListener, CompoundButton.OnCheckedChangeListener{

    private ZoomageView demoView;
    private View optionsView;
    private AlertDialog optionsDialog;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);
        demoView = findViewById(R.id.demoView);
        prepareOptions();
    }

    private void prepareOptions() {
        optionsView = getLayoutInflater().inflate(R.layout.zoomage_options, null);
        setSwitch(R.id.zoomable, demoView.isZoomable());
        setSwitch(R.id.translatable, demoView.isTranslatable());
        setSwitch(R.id.animateOnReset, demoView.getAnimateOnReset());
        setSwitch(R.id.autoCenter, demoView.getAutoCenter());
        setSwitch(R.id.restrictBounds, demoView.getRestrictBounds());
        optionsView.findViewById(R.id.reset).setOnClickListener(this);
        optionsView.findViewById(R.id.autoReset).setOnClickListener(this);

        optionsDialog = new AlertDialog.Builder(this).setTitle("Zoomage Options")
                .setView(optionsView)
                .setPositiveButton("Close", null)
                .create();
    }

    private void setSwitch(int id, boolean state) {
        final SwitchCompat switchView = optionsView.findViewById(id);
        switchView.setOnCheckedChangeListener(this);
        switchView.setChecked(state);
    }

    @Override
    public boolean onCreateOptionsMenu(final Menu menu) {
        getMenuInflater().inflate(R.menu.options_menu, menu);
        return true;
    }

    @Override
    public boolean onOptionsItemSelected(final MenuItem item) {
        if (!optionsDialog.isShowing()) {
            optionsDialog.show();
        }

        return super.onOptionsItemSelected(item);
    }

    @Override
    public void onCheckedChanged(final CompoundButton buttonView, final boolean isChecked) {
        switch (buttonView.getId()) {
            case R.id.zoomable:
                demoView.setZoomable(isChecked);
                break;
            case R.id.translatable:
                demoView.setTranslatable(isChecked);
                break;
            case R.id.restrictBounds:
                demoView.setRestrictBounds(isChecked);
                break;
            case R.id.animateOnReset:
                demoView.setAnimateOnReset(isChecked);
                break;
            case R.id.autoCenter:
                demoView.setAutoCenter(isChecked);
                break;
        }
    }

    @Override
    public void onClick(final View v) {
        if (v.getId() == R.id.reset) {
            demoView.reset();
        }
        else {
            showResetOptions();
        }
    }

    private void showResetOptions() {
        CharSequence[] options = new CharSequence[]{"Under", "Over", "Always", "Never"};

        AlertDialog.Builder builder = new AlertDialog.Builder(this);

        builder.setItems(options, new DialogInterface.OnClickListener() {
            @Override
            public void onClick(final DialogInterface dialog, final int which) {
                demoView.setAutoResetMode(which);
            }
        });

        builder.create().show();
    }
}
```

### Reference

Find the reference links below:

| Number | Link |
| --- | --- |
| 1. | [Download](https://downgit.github.io/#/home?url=https://github.com/jsibbold/zoomage/tree/master/example) example |
| 2. | [Read](https://github.com/jsibbold/zoomage) more |
