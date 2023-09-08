# Android Music Player UI

Some of the best performing android apps in Google Play store are the music player apps. I once did upload some of my first apps as music player and even though they were conceptually simpler, they were surprisingly doing better than I expected.

However music player apps do need an awesome UI and ease of use for them to retain users. In this article we will look at some beautiful music UIs. You can freely use this in your app whether it's written in Kotlin or java.


## (a). Music-Cover-View

> Subclass of ImageView that 'morphs' into a circle shape and can rotates. Useful to be used as album cover in Music apps.

Here's how it looks:

![Android Music Cover View](https://raw.githubusercontent.com/andremion/Music-Cover-View/master/art/sample.gif)

### Step 1: Install it

Start by installing it. Add the following in your dependencies closure in the app-level build.gradle file:

```groovy
implementation 'com.github.andremion:musiccoverview:1.0.0'
```

Then sync.

### Step 2: Add Music Cover Layout

Now go to your xml layout for activity or fragment and add the following:

```xml
<com.andremion.music.MusicCoverView
        android:id="@+id/cover"
        android:layout_width="match_parent"
        android:layout_height="@dimen/cover_height"
        android:src="@drawable/album_cover"/>
```

That's all.

However you can Customize some of the attributes:

**The shape of the View**

**The color of the tracks when the shape is circle**

### Example

Let's look at a full example:

**(a). activity_main.xml**

Add the following code in your activity's layout:

```xml
<?xml version="1.0" encoding="utf-8"?>
<android.support.design.widget.CoordinatorLayout
    xmlns:android="http://schemas.android.com/apk/res/android"
    xmlns:app="http://schemas.android.com/apk/res-auto"
    xmlns:tools="http://schemas.android.com/tools"
    android:layout_width="match_parent"
    android:layout_height="match_parent"
    android:fitsSystemWindows="true"
    tools:context=".MainActivity">

    <android.support.design.widget.AppBarLayout
        android:id="@+id/app_bar"
        android:layout_width="match_parent"
        android:layout_height="wrap_content"
        android:theme="@style/AppTheme.AppBarOverlay">

        <android.support.v7.widget.Toolbar
            android:id="@+id/toolbar"
            android:layout_width="match_parent"
            android:layout_height="?attr/actionBarSize"
            app:popupTheme="@style/AppTheme.PopupOverlay"/>

    </android.support.design.widget.AppBarLayout>

    <com.andremion.music.MusicCoverView
        android:id="@+id/cover"
        android:layout_width="match_parent"
        android:layout_height="@dimen/cover_height"
        android:layout_gravity="center"
        android:src="@drawable/album_cover_fly_by_night"/>

    <android.support.design.widget.FloatingActionButton
        android:id="@+id/fab"
        android:layout_width="wrap_content"
        android:layout_height="wrap_content"
        android:layout_gravity="bottom|end"
        android:layout_margin="@dimen/fab_margin"
        android:src="@drawable/ic_play_arrow_white_24dp"/>

</android.support.design.widget.CoordinatorLayout>
```

**(b). MainActivity.java**

Then your main activity will be like this:

```java
package com.andremion.music.sample;

import android.os.Bundle;
import android.support.design.widget.FloatingActionButton;
import android.support.v7.app.AppCompatActivity;
import android.support.v7.widget.Toolbar;
import android.view.Menu;
import android.view.MenuItem;
import android.view.View;

import com.andremion.music.MusicCoverView;

public class MainActivity extends AppCompatActivity {

    private MusicCoverView mCoverView;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);
        Toolbar toolbar = (Toolbar) findViewById(R.id.toolbar);
        setSupportActionBar(toolbar);

        mCoverView = (MusicCoverView) findViewById(R.id.cover);
        mCoverView.setCallbacks(new MusicCoverView.Callbacks() {
            @Override
            public void onMorphEnd(MusicCoverView coverView) {
                if (MusicCoverView.SHAPE_CIRCLE == coverView.getShape()) {
                    coverView.start();
                }
            }

            @Override
            public void onRotateEnd(MusicCoverView coverView) {
                coverView.morph();
            }
        });

        FloatingActionButton fab = (FloatingActionButton) findViewById(R.id.fab);
        fab.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View view) {
                if (mCoverView.isRunning()) {
                    mCoverView.stop();
                } else {
                    mCoverView.morph();
                }
            }
        });
    }

    @Override
    public boolean onCreateOptionsMenu(Menu menu) {
        // Inflate the menu; this adds items to the action bar if it is present.
        getMenuInflater().inflate(R.menu.menu_main, menu);
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
}
```

Find the sample code [here](https://github.com/andremion/Music-Cover-View/tree/master/sample)

### Reference

Find reference [here](https://github.com/andremion/Music-Cover-View).
