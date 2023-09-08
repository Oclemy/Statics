# Android Circular and Shaped ImageView Examples

There are many cases where it may be more appropriate to use a circular or rounded imageview. For example if you want to show the user profiles or list users in a recyclerview. In those cases a circular imageview may be more appropriate.

Thus let's look at libraries and examples of how to render circular imageview natively in android.


## (a). Use hdodenhof/CircleImageView

> CircleImageView is just that, a circular ImageView for Android.

It is fast circular ImageView perfect for profile images. This is based on [RoundedImageView from Vince Mi](https://github.com/vinc3m1/RoundedImageView) which itself is based on [techniques recommended by Romain Guy](http://www.curious-creature.org/2012/12/11/android-recipe-1-image-with-rounded-corners/).

It uses a BitmapShader and **does not**:

- create a copy of the original bitmap
- use a clipPath (which is neither hardware accelerated nor anti-aliased)
- use setXfermode to clip the bitmap (which means drawing twice to the canvas)

As this is just a custom ImageView and not a custom Drawable or a combination of both, it can be used with all kinds of drawables, i.e. a PicassoDrawable from [Picasso](https://github.com/square/picasso) or other non-standard drawables (needs some testing though).

Here is a demo:

![](https://camo.githubusercontent.com/09b77bd11b3f4ae551b08bf0dec47675b958c728916c0c500ee2d1778a82a403/68747470733a2f2f7261772e6769746875622e636f6d2f68646f64656e686f662f436972636c65496d616765566965772f6d61737465722f73637265656e73686f742e706e67)

### Step 2: Use it

All you need is add it to your xml layout;

```xml
<de.hdodenhof.circleimageview.CircleImageView
    xmlns:app="http://schemas.android.com/apk/res-auto"
    android:id="@+id/profile_image"
    android:layout_width="96dp"
    android:layout_height="96dp"
    android:src="@drawable/profile"
    app:civ_border_width="2dp"
    app:civ_border_color="#FF000000"/>
```

### Full Example

1. Create Android Studio Project
2. Install the library.
3. Design Layout

We will have the following layout:

**activity_main,xml**

```xml
<?xml version="1.0" encoding="utf-8"?>
<LinearLayout xmlns:android="http://schemas.android.com/apk/res/android"
              xmlns:app="http://schemas.android.com/apk/res-auto"
              android:layout_width="match_parent"
              android:layout_height="match_parent"
              android:orientation="vertical">

    <RelativeLayout
        android:layout_width="match_parent"
        android:layout_height="0dp"
        android:layout_weight="1"
        android:padding="@dimen/base_padding"
        android:background="@color/light">

        <de.hdodenhof.circleimageview.CircleImageView
            android:layout_width="160dp"
            android:layout_height="160dp"
            android:layout_centerInParent="true"
            android:src="@drawable/hugh"
            app:civ_border_width="2dp"
            app:civ_border_color="@color/dark" />

    </RelativeLayout>

    <RelativeLayout
        android:layout_width="match_parent"
        android:layout_height="0dp"
        android:layout_weight="1"
        android:padding="@dimen/base_padding"
        android:background="@color/dark">

        <de.hdodenhof.circleimageview.CircleImageView
            android:layout_width="160dp"
            android:layout_height="160dp"
            android:layout_centerInParent="true"
            android:src="@drawable/hugh"
            app:civ_border_width="2dp"
            app:civ_border_color="@color/light" />

    </RelativeLayout>

</LinearLayout>
```

**MainActivity.java**

```java
import android.app.Activity;
import android.os.Bundle;

public class MainActivity extends Activity {

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);
    }

}
```

### Reference

Here are the reference links:

| Number | link |
| --- | --- |
| 1. | [Download](https://downgit.github.io/#/home?url=https://github.com/hdodenhof/CircleImageView/tree/master/sample) Example |
| 2. | [Read](https://github.com/hdodenhof/CircleImageView/) more |

# More Examples

Let us look at more libraries and examples:

[loop type=example taxonomy=post_tag term=circular-imageview orderby=date order=asc]
<h2>[loop-count]. [field title-link] </h2>
[content more=true]
<a href="[field url]">Read More.</a>


[/loop]
