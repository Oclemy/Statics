# Shimmer Effect while Loading Text and Images


Most apps involve loading texts alongside images. Most often these tend to be loaded from online, be it from a cloud storage or a traditional server. When loading content from online, there will be some delay that is to be expected as we download the data. This delay depends on the size of the data being downloaded.

If you are listing data in a recyclerview or listview, it is much more convenient to show a shimmer effect instead of a progress indicator. This is because you are loading more than one item and listing them. Using this technique the user can still see the structure of the list.

In fact more data can simply be appended on the existing list, without having to refresh the whole list.


This tutorial will show you the solutions you can implement in your project to achieve the shimmer effect when loading both images and text in your recyclerview.

## (a). Shimmer effect using LoaderviewLibrary

> LoaderViewlibrary is a Library that enables TextView of ImageView to show loading animation while waiting for the text and image get loaded

It enhances both TextView and ImageView with the ability to show shimmer (animation loader) before any text or image is shown. Useful when waiting for data to be loaded from the network.

Check the demo below:

![](https://camo.githubusercontent.com/870c6e2b3c80e77f89f9e50cc368a14aaece8d63df3a834437a8686781dbfd83/68747470733a2f2f7374617469632e7769787374617469632e636f6d2f6d656469612f6437343863335f32383338316330663131306634646336386663643334306235303366383661327e6d76322e676966)

So how do you use it? Well follow these steps:

### Step 1: Install it

You install from the `mavenCentral`. In your `app/build.gradle` add the dependency as follows:

```groovy
dependencies {
    implementation 'io.github.elye:loaderviewlibrary:3.0.0'
}
```

Be sure to add `mavenCentral()` under the `allProjects` closure in the `project/build.gradle`.

Sync.

### Step 2: Add to Layouts

You need to add the views you need to your xml layout as follows.

Loader View for TextView defined in layout XML

```xml
<com.elyeproj.loaderviewlibrary.LoaderTextView
     android:layout_width="match_parent"
     android:layout_height="wrap_content" />
```

Loader View for ImageView defined in layout XML

```xml
<com.elyeproj.loaderviewlibrary.LoaderImageView
     android:layout_width="100dp"
     android:layout_height="100dp" />
```

Define the % width of the TextView that shows the loading animation with width_weight

```xml
<com.elyeproj.loaderviewlibrary.LoaderTextView
     android:layout_width="match_parent"
     android:layout_height="wrap_content"
     app:width_weight="0.4" />
```

Define the % height of the TextView that shows the loading animation with height_weight

```xml
<com.elyeproj.loaderviewlibrary.LoaderTextView
     android:layout_width="match_parent"
     android:layout_height="wrap_content"
     app:height_weight="0.8" />
```

Define use gradient of the TextView or ImageView that shows the gradient with use_gradient

```xml
<com.elyeproj.loaderviewlibrary.LoaderTextView
     android:layout_width="match_parent"
     android:layout_height="wrap_content"
     app:use_gradient="true" />
```

Define rectangle round radius using corner. The default corner is 0.

```xml
<com.elyeproj.loaderviewlibrary.LoaderTextView
     android:layout_width="match_parent"
     android:layout_height="wrap_content"
     app:corners="16" />
```

Setting the Text Style as BOLD would darken the loading shimmer

Other feature of TextView and ImageView is still applicable.

Use a custom shimmer color (note: if set, point 7 will not apply, your color will be used even if the Text Style is BOLD)

```xml
<com.elyeproj.loaderviewlibrary.LoaderTextView
     android:layout_width="match_parent"
     android:layout_height="wrap_content"
     app:custom_color="@android:color/holo_green_dark" />
```

Reset and show shimmer (animation loader) again by calling the below API

```java
myLoaderTextView.resetLoader();
myLoaderImageView.resetLoader();
```

### Full Example

Lets look at full example. Start by installing the library as we've discussed above.

Then design your layout as follows:

**activity_main.xml**

```xml
<?xml version="1.0" encoding="utf-8"?>
<LinearLayout xmlns:android="http://schemas.android.com/apk/res/android"
    xmlns:app="http://schemas.android.com/apk/res-auto"
    xmlns:tools="http://schemas.android.com/tools"
    android:layout_width="match_parent"
    android:layout_height="wrap_content"
    android:orientation="vertical"
    android:paddingBottom="@dimen/activity_vertical_margin"
    android:paddingLeft="@dimen/activity_horizontal_margin"
    android:paddingRight="@dimen/activity_horizontal_margin"
    android:paddingTop="@dimen/activity_vertical_margin"
    tools:context="com.elyeproj.sampleloaderview.MainActivity">

    <RelativeLayout
        android:layout_width="match_parent"
        android:layout_height="wrap_content">

        <com.elyeproj.loaderviewlibrary.LoaderImageView
            android:id="@+id/image_icon"
            android:layout_width="100dp"
            android:layout_height="100dp"
            android:layout_marginEnd="16dp"
            android:layout_marginRight="16dp"
            app:use_gradient="true"
            app:corners="16" />

        <LinearLayout
            android:id="@+id/container_text"
            android:layout_width="match_parent"
            android:layout_height="wrap_content"
            android:layout_centerVertical="true"
            android:layout_toEndOf="@id/image_icon"
            android:layout_toRightOf="@id/image_icon"
            android:orientation="vertical">

            <com.elyeproj.loaderviewlibrary.LoaderTextView
                android:id="@+id/txt_name"
                android:layout_width="match_parent"
                android:layout_height="wrap_content"
                android:textSize="@dimen/title_font_size"
                android:textStyle="bold"
                app:height_weight="0.8"
                app:use_gradient="true"
                app:width_weight="0.6" />

            <com.elyeproj.loaderviewlibrary.LoaderTextView
                android:id="@+id/txt_title"
                android:layout_width="match_parent"
                android:layout_height="wrap_content"
                android:layout_marginTop="8dp"
                android:textSize="@dimen/standard_font_size"
                app:height_weight="0.8"
                app:width_weight="1.0"
                app:corners="32" />

            <com.elyeproj.loaderviewlibrary.LoaderTextView
                android:id="@+id/txt_phone"
                android:layout_width="match_parent"
                android:layout_height="wrap_content"
                android:layout_marginTop="4dp"
                android:drawableLeft="@drawable/ic_phone_grey_500_18dp"
                android:drawableStart="@drawable/ic_phone_grey_500_18dp"
                android:drawablePadding="8dp"
                android:textSize="@dimen/standard_font_size"
                app:height_weight="0.8"
                app:width_weight="0.4"
                app:corners="16" />

            <com.elyeproj.loaderviewlibrary.LoaderTextView
                android:id="@+id/txt_email"
                android:layout_width="match_parent"
                android:layout_height="wrap_content"
                android:layout_marginTop="4dp"
                android:drawableLeft="@drawable/ic_mail_outline_grey_500_18dp"
                android:drawableStart="@drawable/ic_mail_outline_grey_500_18dp"
                android:drawablePadding="8dp"
                android:textSize="@dimen/standard_font_size"
                app:height_weight="0.8"
                app:width_weight="0.9"
                app:corners="8"
                app:custom_color="@android:color/holo_green_dark"/>

        </LinearLayout>

    </RelativeLayout>

    <Button
        android:id="@+id/btn_reset"
        android:layout_width="match_parent"
        android:layout_height="wrap_content"
        android:layout_margin="@dimen/activity_vertical_margin"
        android:onClick="resetLoader"
        android:text="@string/btn_reset" />
</LinearLayout>
```

Then write your code as follows:

**MainActivity.java**

```java
package com.elyeproj.sampleloaderview;

import android.os.AsyncTask;
import android.os.Bundle;
import android.view.View;
import android.widget.ImageView;
import android.widget.TextView;
import androidx.appcompat.app.AppCompatActivity;
import com.elyeproj.loaderviewlibrary.LoaderImageView;
import com.elyeproj.loaderviewlibrary.LoaderTextView;

public class MainActivity extends AppCompatActivity {

    private int WAIT_DURATION = 5000;
    private DummyWait dummyWait;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);
        loadData();
    }

    private void loadData() {
        if (dummyWait != null) {
            dummyWait.cancel(true);
        }
        dummyWait = new DummyWait();
        dummyWait.execute();
    }

    private void postLoadData() {
        ((TextView)findViewById(R.id.txt_name)).setText("Mr. Donald Trump");
        ((TextView)findViewById(R.id.txt_title)).setText("President of United State (2017 - now)");
        ((TextView)findViewById(R.id.txt_phone)).setText("+001 2345 6789");
        ((TextView)findViewById(R.id.txt_email)).setText("donald.trump@donaldtrump.com");
        ((ImageView)findViewById(R.id.image_icon)).setImageResource(R.drawable.trump);
    }

    public void resetLoader(View view) {
        ((LoaderTextView)findViewById(R.id.txt_name)).resetLoader();
        ((LoaderTextView)findViewById(R.id.txt_title)).resetLoader();
        ((LoaderTextView)findViewById(R.id.txt_phone)).resetLoader();
        ((LoaderTextView)findViewById(R.id.txt_email)).resetLoader();
        ((LoaderImageView)findViewById(R.id.image_icon)).resetLoader();
        loadData();
    }

    class DummyWait extends AsyncTask<Void, Void, Void> {
        @Override
        protected void onPreExecute() {
            super.onPreExecute();
        }

        @Override
        protected Void doInBackground(Void... params) {
            try {
                Thread.sleep(WAIT_DURATION);
            } catch (InterruptedException e) {
                e.printStackTrace();
            }
            return null;
        }

        @Override
        protected void onPostExecute(Void result) {
            super.onPostExecute(result);
            postLoadData();
        }
    }

    @Override
    protected void onDestroy() {
        super.onDestroy();
        if (dummyWait != null) {
            dummyWait.cancel(true);
        }
    }
}
```

### Reference

Below are the reference links

| Number | Link |
| --- | --- |
| 1. | [Download](https://downgit.github.io/#/home?url=https://github.com/elye/loaderviewlibrary/tree/master/app) code |
| 2. | [Read](https://github.com/elye/loaderviewlibrary/) more |
| 3. | [Follow](https://github.com/elye/) code author |
