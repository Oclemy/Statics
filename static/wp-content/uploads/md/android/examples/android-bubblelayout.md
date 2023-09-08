# Android BubbleLayout Example

This tutorial will show you easy ways of creating bubble layouts in your android app. We will mostly look at how to do this using simple libraries. You may need such layouts for example to show as popups in your android app, with custom arrows to indicate direction.

Let's look at the options.


## (a). Use BubbleLayout

This view has been created by extending the FrameLayout. It's described as a _Bubble View for Android._ It has a custom stroke width and color, arrow size, position and direction.

Here is a demo of the example that will be created:

![Android Bubble view](https://github.com/MasayukiSuda/BubbleLayout/raw/master/art/all.gif)

How do you use it?

### Step 1: Install it

Start by specifying jitpack as a maven repository. You do this in your project-level build.gradle:

```groovy
maven { url 'https://jitpack.io' }
```

Then in your app level build.gradle you add the dependency statement:

```groovy
dependencies {
        implementation 'com.github.MasayukiSuda:BubbleLayout:v1.2.2'
}
```

### Step 2: Turn textView to Bubble View

To use it, the simplest way is to turn an existing textview into a a bubbleview. You do this by wrapping the textview using the bubblelayout:

```xml
<com.daasuu.bl.BubbleLayout
    android:layout_width="wrap_content"
    android:layout_height="wrap_content"
    android:layout_marginTop="12dp"
    android:padding="8dp"
    app:bl_arrowDirection="right"
    app:bl_arrowHeight="8dp"
    app:bl_arrowPosition="16dp"
    app:bl_arrowWidth="8dp"
    app:bl_cornersRadius="6dp"
    app:bl_strokeWidth="1dp">

    <TextView
        android:layout_width="wrap_content"
        android:layout_height="wrap_content"
        android:layout_gravity="center_vertical"
        android:layout_marginRight="4dp"
        android:text="BubbleLayout"
        android:textColor="@android:color/holo_red_dark" />

</com.daasuu.bl.BubbleLayout>
```

That will give you this:

![Bubble Layout](https://github.com/MasayukiSuda/BubbleLayout/raw/master/art/sample3.png)

### Usage Examples

To create a bubble view with both image and text, you use code like the following:

```xml
<com.daasuu.bl.BubbleLayout
    android:layout_width="wrap_content"
    android:layout_height="wrap_content"
    android:layout_marginTop="12dp"
    android:padding="8dp"
    app:bl_arrowDirection="top"
    app:bl_arrowHeight="8dp"
    app:bl_arrowPosition="12dp"
    app:bl_arrowWidth="8dp"
    app:bl_bubbleColor="@android:color/holo_blue_light"
    app:bl_cornersRadius="8dp">

    <LinearLayout
        android:layout_width="wrap_content"
        android:layout_height="wrap_content"
        android:orientation="horizontal">

        <ImageView
            android:layout_width="20dp"
            android:layout_height="20dp"
            android:src="@mipmap/ic_launcher" />

        <TextView
            android:layout_width="wrap_content"
            android:layout_height="wrap_content"
            android:layout_gravity="center_vertical"
            android:layout_marginLeft="4dp"
            android:text="BubbleLayout"
            android:textColor="@android:color/holo_red_dark" />

    </LinearLayout>

</com.daasuu.bl.BubbleLayout>
```

#### How to Programmatically create a popup

For example you may wish to create a popup next to a textview, and show that popup when the textview is clicked. You start by wrapping the textview with the bubble layout as follows:

```xml
<?xml version="1.0" encoding="utf-8"?>
<com.daasuu.bl.BubbleLayout xmlns:android="http://schemas.android.com/apk/res/android"
    xmlns:app="http://schemas.android.com/apk/res-auto"
    android:layout_width="wrap_content"
    android:layout_height="wrap_content"
    android:padding="@dimen/activity_horizontal_margin"
    app:bl_arrowDirection="top"
    app:bl_arrowHeight="12dp"
    app:bl_arrowPosition="16dp"
    app:bl_arrowWidth="8dp"
    app:bl_bubbleColor="@color/colorAccent"
    app:bl_cornersRadius="2dp">

    <TextView
        android:layout_width="wrap_content"
        android:layout_height="wrap_content"
        android:layout_gravity="center_vertical"
        android:layout_marginRight="4dp"
        android:text="BubbleLayout Popup"
        android:textColor="@android:color/white" />
</com.daasuu.bl.BubbleLayout>
```

Then you write your java code as follows:

```java
Button button = (Button) findViewById(R.id.btn_popup);

BubbleLayout bubbleLayout = (BubbleLayout) LayoutInflater.from(this).inflate(R.layout.layout_sample_popup, null);
PopupWindow popupWindow = BubblePopupHelper.create(this, bubbleLayout);
final Random random = new Random();

button.setOnClickListener(new View.OnClickListener() {
    @Override
    public void onClick(View v) {
        int[] location = new int[2];
        v.getLocationInWindow(location);
        if (random.nextBoolean()) {
            bubbleLayout.setArrowDirection(ArrowDirection.TOP);
        } else {
            bubbleLayout.setArrowDirection(ArrowDirection.BOTTOM);
        }
        popupWindow.showAtLocation(v, Gravity.NO_GRAVITY, location[0], v.getHeight() + location[1]);
    }
});
```

### Attributes

Here are the attributes:

There are several attributes you can set:

| attr | description |
| --- | --- |
| bl_arrowWidth | Width of the arrow, default 8dp |
| bl_arrowHeight | Height of the arrow, default 8dp |
| bl_arrowPosition | Position of the arrow, default 12dp |
| bl_cornersRadius | Corner radius of the BubbleLayout, default 0dp |
| bl_bubbleColor | Color of the BubbleLayout, default WHITE |
| bl_strokeWidth | Width of the stroke, default 0dp |
| bl_strokeColor | Color of the stroke, default GLAY |
| bl_arrowDirection | Drawing position of the arrow : 'left' or 'top' or 'right' or 'bottom' or 'left_center' or 'top_center' or 'right_center' or 'bottom_center' default 'left' |

### Full Example

Here is a full example

Start by creating the following two layouts:

**layout_sample_popup.xml**

```xml
<?xml version="1.0" encoding="utf-8"?>
<com.daasuu.bl.BubbleLayout xmlns:android="http://schemas.android.com/apk/res/android"
    xmlns:app="http://schemas.android.com/apk/res-auto"
    android:layout_width="wrap_content"
    android:layout_height="wrap_content"
    android:padding="@dimen/activity_horizontal_margin"
    app:bl_arrowDirection="bottom"
    app:bl_arrowHeight="12dp"
    app:bl_arrowPosition="16dp"
    app:bl_arrowWidth="8dp"
    app:bl_bubbleColor="@color/colorAccent"
    app:bl_cornersRadius="2dp">

    <TextView
        android:layout_width="wrap_content"
        android:layout_height="wrap_content"
        android:layout_gravity="center_vertical"
        android:layout_marginRight="4dp"
        android:text="BubbleLayout Popup"
        android:textColor="@android:color/white" />

</com.daasuu.bl.BubbleLayout>
```

**activity_main.xml**

```xml
<?xml version="1.0" encoding="utf-8"?>
<LinearLayout xmlns:android="http://schemas.android.com/apk/res/android"
    xmlns:app="http://schemas.android.com/apk/res-auto"
    xmlns:tools="http://schemas.android.com/tools"
    android:layout_width="match_parent"
    android:layout_height="match_parent"
    android:orientation="vertical"
    android:paddingBottom="@dimen/activity_vertical_margin"
    android:paddingLeft="@dimen/activity_horizontal_margin"
    android:paddingRight="@dimen/activity_horizontal_margin"
    android:paddingTop="@dimen/activity_vertical_margin"
    tools:context="com.daasuu.bubblelayout.MainActivity">

    <com.daasuu.bl.BubbleLayout
        android:layout_width="wrap_content"
        android:layout_height="wrap_content"
        android:padding="8dp"
        app:bl_arrowDirection="left"
        app:bl_arrowHeight="8dp"
        app:bl_arrowPosition="16dp"
        app:bl_arrowWidth="8dp"
        app:bl_strokeWidth="1dp">

        <TextView
            android:layout_width="wrap_content"
            android:layout_height="wrap_content"
            android:layout_gravity="center_vertical"
            android:layout_marginRight="4dp"
            android:text="BubbleLayout"
            android:textColor="@android:color/holo_red_dark" />

    </com.daasuu.bl.BubbleLayout>

    <com.daasuu.bl.BubbleLayout
        android:layout_width="wrap_content"
        android:layout_height="wrap_content"
        android:padding="8dp"
        app:bl_arrowDirection="left_center"
        app:bl_arrowHeight="8dp"
        app:bl_arrowPosition="16dp"
        app:bl_arrowWidth="8dp"
        app:bl_strokeWidth="1dp">

        <TextView
            android:layout_width="wrap_content"
            android:layout_height="wrap_content"
            android:layout_gravity="center_vertical"
            android:layout_marginRight="4dp"
            android:text="BubbleLayout"
            android:textColor="@android:color/holo_red_dark" />

    </com.daasuu.bl.BubbleLayout>

    <com.daasuu.bl.BubbleLayout
        android:layout_width="wrap_content"
        android:layout_height="wrap_content"
        android:layout_marginTop="12dp"
        android:padding="8dp"
        app:bl_arrowDirection="top"
        app:bl_arrowHeight="8dp"
        app:bl_arrowPosition="12dp"
        app:bl_arrowWidth="8dp"
        app:bl_bubbleColor="@android:color/holo_blue_light"
        app:bl_cornersRadius="8dp">

        <LinearLayout
            android:layout_width="wrap_content"
            android:layout_height="wrap_content"
            android:orientation="horizontal">

            <ImageView
                android:layout_width="20dp"
                android:layout_height="20dp"
                android:src="@mipmap/ic_launcher" />

            <TextView
                android:layout_width="wrap_content"
                android:layout_height="wrap_content"
                android:layout_gravity="center_vertical"
                android:layout_marginLeft="4dp"
                android:text="BubbleLayout"
                android:textColor="@android:color/holo_red_dark" />

        </LinearLayout>

    </com.daasuu.bl.BubbleLayout>

    <com.daasuu.bl.BubbleLayout
        android:layout_width="wrap_content"
        android:layout_height="wrap_content"
        android:layout_marginTop="12dp"
        android:padding="8dp"
        app:bl_arrowDirection="right"
        app:bl_arrowHeight="8dp"
        app:bl_arrowPosition="16dp"
        app:bl_arrowWidth="8dp"
        app:bl_cornersRadius="6dp"
        app:bl_strokeWidth="1dp">

        <TextView
            android:layout_width="wrap_content"
            android:layout_height="wrap_content"
            android:layout_gravity="center_vertical"
            android:layout_marginRight="4dp"
            android:text="BubbleLayout"
            android:textColor="@android:color/holo_red_dark" />

    </com.daasuu.bl.BubbleLayout>

    <com.daasuu.bl.BubbleLayout
        android:layout_width="wrap_content"
        android:layout_height="wrap_content"
        android:layout_marginTop="12dp"
        android:padding="8dp"
        app:bl_arrowDirection="right_center"
        app:bl_arrowHeight="8dp"
        app:bl_arrowPosition="16dp"
        app:bl_arrowWidth="8dp"
        app:bl_cornersRadius="6dp"
        app:bl_strokeWidth="1dp">

        <TextView
            android:layout_width="wrap_content"
            android:layout_height="wrap_content"
            android:layout_gravity="center_vertical"
            android:layout_marginRight="4dp"
            android:text="BubbleLayout"
            android:textColor="@android:color/holo_red_dark" />

    </com.daasuu.bl.BubbleLayout>

    <com.daasuu.bl.BubbleLayout
        android:layout_width="wrap_content"
        android:layout_height="wrap_content"
        android:layout_marginTop="12dp"
        android:padding="8dp"
        app:bl_arrowDirection="bottom"
        app:bl_arrowHeight="8dp"
        app:bl_arrowPosition="16dp"
        app:bl_arrowWidth="8dp"
        app:bl_bubbleColor="@android:color/holo_green_light"
        app:bl_cornersRadius="6dp">

        <TextView
            android:layout_width="wrap_content"
            android:layout_height="wrap_content"
            android:layout_gravity="center_vertical"
            android:layout_marginRight="4dp"
            android:text="BubbleLayout"
            android:textColor="@android:color/white" />

    </com.daasuu.bl.BubbleLayout>

    <com.daasuu.bl.BubbleLayout
        android:layout_width="wrap_content"
        android:layout_height="wrap_content"
        android:layout_marginTop="12dp"
        android:padding="8dp"
        app:bl_arrowDirection="bottom_center"
        app:bl_arrowHeight="8dp"
        app:bl_arrowPosition="16dp"
        app:bl_arrowWidth="8dp"
        app:bl_bubbleColor="@android:color/holo_green_light"
        app:bl_cornersRadius="6dp">

        <TextView
            android:layout_width="wrap_content"
            android:layout_height="wrap_content"
            android:layout_gravity="center_vertical"
            android:layout_marginRight="4dp"
            android:text="BubbleLayout"
            android:textColor="@android:color/white" />

    </com.daasuu.bl.BubbleLayout>

    <com.daasuu.bl.BubbleLayout
        android:layout_width="wrap_content"
        android:layout_height="wrap_content"
        android:layout_marginTop="12dp"
        android:padding="8dp"
        app:bl_arrowDirection="top_center"
        app:bl_arrowHeight="8dp"
        app:bl_arrowPosition="16dp"
        app:bl_arrowWidth="8dp"
        app:bl_bubbleColor="@android:color/holo_green_light"
        app:bl_cornersRadius="6dp">

        <TextView
            android:layout_width="wrap_content"
            android:layout_height="wrap_content"
            android:layout_gravity="center_vertical"
            android:layout_marginRight="4dp"
            android:text="BubbleLayout"
            android:textColor="@android:color/white" />

    </com.daasuu.bl.BubbleLayout>

    <Button
        android:id="@+id/btn_popup"
        android:layout_width="wrap_content"
        android:layout_height="wrap_content"
        android:layout_gravity="center_horizontal"
        android:layout_marginTop="32dp"
        android:text="Bubble Popup" />

</LinearLayout>
```

**MainActivity.java**

Then your java codeas follows:

```java
import android.os.Bundle;

import androidx.appcompat.app.AppCompatActivity;

import android.view.LayoutInflater;
import android.view.View;
import android.widget.*;

import com.daasuu.bl.ArrowDirection;
import com.daasuu.bl.BubbleLayout;
import com.daasuu.bl.BubblePopupHelper;

import java.util.Random;

import static com.daasuu.bl.ArrowDirection.*;

public class MainActivity extends AppCompatActivity {

    private PopupWindow popupWindow;
    private ArrowDirection[] randomArrowDirections = {
        TOP,
        BOTTOM,
        TOP_RIGHT,
        BOTTOM_RIGHT
    };

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);

        Button button = (Button) findViewById(R.id.btn_popup);

        final BubbleLayout bubbleLayout = (BubbleLayout) LayoutInflater.from(this).inflate(R.layout.layout_sample_popup, null);
        bubbleLayout.measure(View.MeasureSpec.UNSPECIFIED, View.MeasureSpec.UNSPECIFIED);
        final int bubbleWidth = bubbleLayout.getMeasuredWidth();

        popupWindow = BubblePopupHelper.create(this, bubbleLayout);
        final Random random = new Random();

        button.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                int xoff = 0;
                int yoff = 0;
                ArrowDirection direction = randomArrowDirections[random.nextInt(randomArrowDirections.length)];
                switch (direction) {
                    case TOP_RIGHT:
                    case BOTTOM_RIGHT:
                        xoff = v.getWidth() - bubbleWidth;
                        break;
                    case TOP:
                    case BOTTOM:
                }
                bubbleLayout.setArrowDirection(direction);
                bubbleLayout.setArrowPosition(v.getWidth() / 2f);
                popupWindow.showAsDropDown(v, xoff, yoff);
            }
        });

    }

}
```

### Reference

Find the download links below

| No. | Link |
| --- | --- |
| 1. | [Browse](https://github.com/MasayukiSuda/BubbleLayout/tree/master/sample) Example |
| 2. | [Read](https://github.com/MasayukiSuda/BubbleLayout/) more |
| 3. | [Follow](https://github.com/MasayukiSuda/) code author |
