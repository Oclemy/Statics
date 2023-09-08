# ShimmerLayout Example


`ShimmerLayout` can be used to add shimmer effect (like the one used at Facebook or at LinkedIn) to your Android application. Beside memory efficiency even animating a big layout, you can customize the behaviour and look of the animation. Check out the [**wiki**](https://github.com/team-supercharge/ShimmerLayout/wiki/Home) for attributes!

![ShimmerLayout](https://github.com/team-supercharge/ShimmerLayout/raw/master/shimmerlayout.gif?raw=true) 

### Step 1: Install

Get the latest artifact via gradle

```groovy
implementation 'io.supercharge:shimmerlayout:2.1.0'
```

### Step 2: Add to Layout

Create the layout on which you want to apply the effect and add as a child of a `ShimmerLayout`

```xml
<io.supercharge.shimmerlayout.ShimmerLayout
        android:id="@+id/shimmer_text"
        android:layout_width="wrap_content"
        android:layout_height="40dp"
        android:layout_gravity="center_horizontal"
        android:layout_marginTop="50dp"
        android:paddingLeft="30dp"
        android:paddingRight="30dp"
        app:shimmer_animation_duration="1200">

        <TextView
            android:layout_width="wrap_content"
            android:layout_height="match_parent"
            android:gravity="center"
            android:text="ShimmerLayout"
            android:textColor="@color/shimmer_background_color"
            android:textSize="26sp"/>
    </io.supercharge.shimmerlayout.ShimmerLayout>
```

### Step 3: Start Shimmer Animation

Last, but not least you have to start it from your Java code

```java
ShimmerLayout shimmerText = (ShimmerLayout) findViewById(R.id.shimmer_text);
shimmerText.startShimmerAnimation();
```

### Full Example

Here is a full example showing how to use `ShimmerLayout`:

**(a). activity_main.xml**

```xml
<?xml version="1.0" encoding="utf-8"?>
<LinearLayout
    xmlns:android="http://schemas.android.com/apk/res/android"
    xmlns:app="http://schemas.android.com/apk/res-auto"
    xmlns:tools="http://schemas.android.com/tools"
    android:layout_width="match_parent"
    android:layout_height="match_parent"
    android:orientation="vertical">

    <io.supercharge.shimmerlayout.ShimmerLayout
        android:id="@+id/shimmer_layout"
        android:layout_width="match_parent"
        android:layout_height="wrap_content"
        android:paddingLeft="10dp"
        android:paddingRight="10dp"
        android:paddingTop="30dp"
        tools:context="io.supercharge.shimmeringlayout.MainActivity">

        <RelativeLayout
            android:layout_width="match_parent"
            android:layout_height="wrap_content">

            <View
                android:id="@+id/shimmer_avatar_1"
                android:layout_width="@dimen/monogram_width"
                android:layout_height="@dimen/monogram_width"
                android:layout_marginRight="11dp"
                android:background="@drawable/avatar_background"/>

            <View
                android:layout_width="130dp"
                android:layout_height="19dp"
                android:layout_alignTop="@+id/shimmer_avatar_1"
                android:layout_toRightOf="@+id/shimmer_avatar_1"
                android:background="@color/shimmer_background_color"/>

            <View
                android:id="@+id/shimmer_description_1"
                android:layout_width="39dp"
                android:layout_height="13dp"
                android:layout_alignBottom="@+id/shimmer_avatar_1"
                android:layout_toRightOf="@+id/shimmer_avatar_1"
                android:background="@color/shimmer_background_color"/>

            <View
                android:layout_width="101dp"
                android:layout_height="17dp"
                android:layout_alignBottom="@+id/shimmer_description_1"
                android:layout_alignParentRight="true"
                android:background="@color/shimmer_background_color"/>

            <View
                android:id="@+id/shimmer_divider_1"
                android:layout_width="match_parent"
                android:layout_height="1dp"
                android:layout_below="@+id/shimmer_avatar_1"
                android:layout_marginBottom="11dp"
                android:layout_marginTop="11dp"
                android:background="@color/shimmer_background_color"/>

            <View
                android:id="@+id/shimmer_avatar_2"
                android:layout_width="@dimen/monogram_width"
                android:layout_height="@dimen/monogram_width"
                android:layout_below="@+id/shimmer_divider_1"
                android:layout_marginRight="11dp"
                android:background="@drawable/avatar_background"/>

            <View
                android:layout_width="130dp"
                android:layout_height="19dp"
                android:layout_alignTop="@+id/shimmer_avatar_2"
                android:layout_toRightOf="@+id/shimmer_avatar_2"
                android:background="@color/shimmer_background_color"/>

            <View
                android:id="@+id/shimmer_description_2"
                android:layout_width="39dp"
                android:layout_height="13dp"
                android:layout_alignBottom="@+id/shimmer_avatar_2"
                android:layout_toRightOf="@+id/shimmer_avatar_2"
                android:background="@color/shimmer_background_color"/>

            <View
                android:layout_width="101dp"
                android:layout_height="17dp"
                android:layout_alignBottom="@+id/shimmer_description_2"
                android:layout_alignParentRight="true"
                android:background="@color/shimmer_background_color"/>

            <View
                android:id="@+id/shimmer_divider_2"
                android:layout_width="match_parent"
                android:layout_height="1dp"
                android:layout_below="@+id/shimmer_avatar_2"
                android:layout_marginBottom="11dp"
                android:layout_marginTop="11dp"
                android:background="@color/shimmer_background_color"/>

            <View
                android:id="@+id/shimmer_avatar_3"
                android:layout_width="@dimen/monogram_width"
                android:layout_height="@dimen/monogram_width"
                android:layout_below="@+id/shimmer_divider_2"
                android:layout_marginRight="11dp"
                android:background="@drawable/avatar_background"/>

            <View
                android:layout_width="130dp"
                android:layout_height="19dp"
                android:layout_alignTop="@+id/shimmer_avatar_3"
                android:layout_toRightOf="@+id/shimmer_avatar_3"
                android:background="@color/shimmer_background_color"/>

            <View
                android:id="@+id/shimmer_description_3"
                android:layout_width="39dp"
                android:layout_height="13dp"
                android:layout_alignBottom="@+id/shimmer_avatar_3"
                android:layout_toRightOf="@+id/shimmer_avatar_3"
                android:background="@color/shimmer_background_color"/>

            <View
                android:layout_width="101dp"
                android:layout_height="17dp"
                android:layout_alignBottom="@+id/shimmer_description_3"
                android:layout_alignParentRight="true"
                android:background="@color/shimmer_background_color"/>

            <View
                android:id="@+id/shimmer_divider_3"
                android:layout_width="match_parent"
                android:layout_height="1dp"
                android:layout_below="@+id/shimmer_avatar_3"
                android:layout_marginBottom="11dp"
                android:layout_marginTop="11dp"
                android:background="@color/shimmer_background_color"/>

            <View
                android:id="@+id/shimmer_avatar_4"
                android:layout_width="@dimen/monogram_width"
                android:layout_height="@dimen/monogram_width"
                android:layout_below="@+id/shimmer_divider_3"
                android:layout_marginRight="11dp"
                android:background="@drawable/avatar_background"/>

            <View
                android:layout_width="130dp"
                android:layout_height="19dp"
                android:layout_alignTop="@+id/shimmer_avatar_4"
                android:layout_toRightOf="@+id/shimmer_avatar_4"
                android:background="@color/shimmer_background_color"/>

            <View
                android:id="@+id/shimmer_description_4"
                android:layout_width="39dp"
                android:layout_height="13dp"
                android:layout_alignBottom="@+id/shimmer_avatar_4"
                android:layout_toRightOf="@+id/shimmer_avatar_4"
                android:background="@color/shimmer_background_color"/>

            <View
                android:layout_width="101dp"
                android:layout_height="17dp"
                android:layout_alignBottom="@+id/shimmer_description_4"
                android:layout_alignParentRight="true"
                android:background="@color/shimmer_background_color"/>

        </RelativeLayout>

    </io.supercharge.shimmerlayout.ShimmerLayout>

    <io.supercharge.shimmerlayout.ShimmerLayout
        android:id="@+id/shimmer_text"
        android:layout_width="wrap_content"
        android:layout_height="40dp"
        android:layout_gravity="center_horizontal"
        android:layout_marginTop="50dp"
        android:paddingLeft="30dp"
        android:paddingRight="30dp"
        app:shimmer_animation_duration="1200"
        app:shimmer_auto_start="true">

        <TextView
            android:layout_width="wrap_content"
            android:layout_height="match_parent"
            android:layout_centerInParent="true"
            android:gravity="center"
            android:text="ShimmerLayout"
            android:textColor="@color/shimmer_background_color"
            android:textSize="26sp"/>
    </io.supercharge.shimmerlayout.ShimmerLayout>
</LinearLayout>

```

**(b). MainActivity.java**

```java
package io.supercharge.shimmeringlayout;

import android.os.Bundle;
import android.support.v7.app.AppCompatActivity;

import io.supercharge.shimmerlayout.ShimmerLayout;

public class MainActivity extends AppCompatActivity {

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);

        ShimmerLayout shimmerLayout = findViewById(R.id.shimmer_layout);
        shimmerLayout.startShimmerAnimation();
    }
}

```

### Reference

> Read more [here](https://github.com/team-supercharge/ShimmerLayout/).
> Download code [here](https://github.com/team-supercharge/ShimmerLayout/archive/refs/heads/master.zip).
> Follow code author [here](https://github.com/team-supercharge/).
