# How to show Animations while Loading Images - Android Solutions

The web is littered with web images that we can incorporate into our app every now. Typically we load such imahes using image loading libraries like glide and picasso.Those libraries normally allow you render some sort of place holder image while the online version is being downloaded. We can go further by rendering animated placeholders using the libraries that we will cover in this article.


## (a).

> Android Image loading animation. The images are dynamic and changing.

A picture is worth a thousand words:

![](https://raw.githubusercontent.com/Cutta/LoadingImagesAnimation/master/gifs/ezgif-1-5f0618240d.gif)

Here are the properties that you will configure:

- imagesArray
- duration
- dividerColor
- backgroundColor

### Step 1: Install it

You start by installing the library. It's hosted in jitpack so move to your root-level build.gradle file and add register jitpack as a repository:

```groovy
allprojects {
        repositories {
            ...
            maven { url 'https://jitpack.io' }
        }
    }
```

Then in your app-level build.gradle specify the implementation statement:

```groovy
implementation 'com.github.Cutta:LoadingImagesAnimation:1.1'
```

### Step 2: Add to Layout

Then all you need to do is add the view to your item layout:

```xml
 <com.cunoraz.loadingimages.LoadingImagesView
        android:layout_width="wrap_content"
        android:layout_height="wrap_content"
        app:imagesArray="@array/your_image_array" />
```

You can see that you specify the array containing the images.

### Example

Let's look at a full example.

1. Install the library as we had discussed.
    
2. Create two layouts;
    

**(a). dialog_layout.xml**

This is where the `LoadingImagesView` is added:

```xml
<?xml version="1.0" encoding="utf-8"?>
<LinearLayout xmlns:android="http://schemas.android.com/apk/res/android"
    xmlns:app="http://schemas.android.com/apk/res-auto"
    android:layout_width="match_parent"
    android:layout_height="wrap_content"
    android:gravity="center"
    android:orientation="vertical"
    android:padding="4dp">

    <com.example.loadingimages.LoadingImagesView
        android:layout_width="wrap_content"
        android:layout_height="wrap_content"
        app:imagesArray="@array/loading_car_images" />

    <TextView
        android:layout_width="match_parent"
        android:layout_height="wrap_content"
        android:layout_margin="4dp"
        android:gravity="center"
        android:text="Loading.." />

</LinearLayout>
```

**(b). activity_main.xml**

Now create the main layout file:

```xml
<?xml version="1.0" encoding="utf-8"?>
<LinearLayout xmlns:android="http://schemas.android.com/apk/res/android"
    xmlns:app="http://schemas.android.com/apk/res-auto"
    xmlns:tools="http://schemas.android.com/tools"
    android:layout_width="match_parent"
    android:layout_height="match_parent"
    android:orientation="vertical"
    tools:context=".MainActivity">

    <LinearLayout
        android:layout_width="match_parent"
        android:layout_height="wrap_content"
        android:orientation="horizontal">

        <com.example.loadingimages.LoadingImagesView
            android:id="@+id/loadingView2"
            android:layout_width="wrap_content"
            android:layout_height="wrap_content"
            android:layout_centerInParent="true"
            android:layout_marginTop="30dp"
            app:imagesArray="@array/loading_car_images" />

        <LinearLayout
            android:layout_width="0dp"
            android:layout_height="match_parent"
            android:layout_weight="1"
            android:gravity="center_vertical"
            android:orientation="vertical"
            android:padding="16dp">

            <TextView
                android:layout_width="match_parent"
                android:layout_height="wrap_content"
                android:text="Default properties"
                android:textAppearance="@style/Base.TextAppearance.AppCompat.Medium"
                android:textStyle="bold" />

            <TextView
                android:layout_width="match_parent"
                android:layout_height="wrap_content"
                android:text="Duration: 1500" />

            <TextView
                android:layout_width="match_parent"
                android:layout_height="wrap_content"
                android:text="Divider color: #999999" />

            <TextView
                android:layout_width="match_parent"
                android:layout_height="wrap_content"
                android:text="Background color: #FFFFFF" />
        </LinearLayout>
    </LinearLayout>

    <LinearLayout
        android:layout_width="match_parent"
        android:layout_height="wrap_content"
        android:layout_marginTop="4dp"
        android:orientation="horizontal">

        <com.example.loadingimages.LoadingImagesView
            android:id="@+id/loadingView1"
            android:layout_width="wrap_content"
            android:layout_height="wrap_content"
            android:layout_centerInParent="true"
            app:backgroundColor="#669900"
            app:dividerColor="#FF0000"
            app:duration="1250"
            app:imagesArray="@array/emojies" />

        <LinearLayout
            android:layout_width="0dp"
            android:layout_height="match_parent"
            android:layout_weight="1"
            android:gravity="center_vertical"
            android:orientation="vertical"
            android:padding="16dp">

            <TextView
                android:layout_width="match_parent"
                android:layout_height="wrap_content"
                android:text="Custom properties"
                android:textAppearance="@style/Base.TextAppearance.AppCompat.Medium"
                android:textStyle="bold" />

            <TextView
                android:layout_width="match_parent"
                android:layout_height="wrap_content"
                android:text="Duration: 1250" />

            <TextView
                android:layout_width="match_parent"
                android:layout_height="wrap_content"
                android:text="Divider color: #FF0000" />

            <TextView
                android:layout_width="match_parent"
                android:layout_height="wrap_content"
                android:text="Background color: #669900" />
        </LinearLayout>
    </LinearLayout>

    <LinearLayout
        android:layout_width="match_parent"
        android:layout_height="wrap_content"
        android:layout_marginTop="4dp"
        android:orientation="horizontal">

        <com.example.loadingimages.LoadingImagesView
            android:id="@+id/loadingView3"
            android:layout_width="wrap_content"
            android:layout_height="wrap_content"
            android:layout_centerInParent="true"
            app:backgroundColor="#BBBBBB"
            app:dividerColor="#000000"
            app:duration="1000"
            app:imagesArray="@array/person" />

        <LinearLayout
            android:layout_width="0dp"
            android:layout_height="match_parent"
            android:layout_weight="1"
            android:gravity="center_vertical"
            android:orientation="vertical"
            android:padding="16dp">

            <TextView
                android:layout_width="match_parent"
                android:layout_height="wrap_content"
                android:text="Custom properties"
                android:textAppearance="@style/Base.TextAppearance.AppCompat.Medium"
                android:textStyle="bold" />

            <TextView
                android:layout_width="match_parent"
                android:layout_height="wrap_content"
                android:text="Duration: 1000" />

            <TextView
                android:layout_width="match_parent"
                android:layout_height="wrap_content"
                android:text="Divider color: #000000" />

            <TextView
                android:layout_width="match_parent"
                android:layout_height="wrap_content"
                android:text="Background color: #BBBBBB" />
        </LinearLayout>
    </LinearLayout>

</LinearLayout>
```

3. Write code

Write code for the main activity:

**MainActivity.java**

```java
package com.example.cuneytcarikci.loadingview;

import android.os.Bundle;
import android.support.annotation.Nullable;
import android.support.v7.app.AlertDialog;
import android.support.v7.app.AppCompatActivity;

public class MainActivity extends AppCompatActivity {
    @Override
    protected void onCreate(@Nullable Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);
        showDialog();
    }

    private void showDialog() {
        AlertDialog.Builder alertDialogBuilder = new AlertDialog.Builder(
                this);
        alertDialogBuilder.setView(getLayoutInflater().inflate(R.layout.dialog_layout, null, false));
        alertDialogBuilder.create().show();
    }
}
```

Find the source code [here](https://github.com/Cutta/LoadingImagesAnimation/tree/master/app)

### Reference

Find reference [here](https://github.com/Cutta/LoadingImagesAnimation)
