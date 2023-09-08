# How to get Device Info in Android

In this tutorial we will explore examples of how to obtain device info from your android phone.


## Example 1: Get Android Device Info - Java

This is a java example on how to get the android device info programmatically. Follow the following steps to recreate the project.

### Step 1: Dependencies

No special dependency is needed.

### Step 2: Permissions

No special permissions are needed.

### Step 3: Design Layout

We have and need only one layout, the layout for our MainActivity.

**activity_main.xml**

```xml
<?xml version="1.0" encoding="utf-8"?>
<LinearLayout
    xmlns:android="http://schemas.android.com/apk/res/android"
    xmlns:tools="http://schemas.android.com/tools"
    android:id="@+id/view_container"
    android:layout_width="match_parent"
    android:layout_height="match_parent"
    android:paddingLeft="@dimen/activity_horizontal_margin"
    android:paddingRight="@dimen/activity_horizontal_margin"
    android:paddingTop="@dimen/activity_vertical_margin"
    android:paddingBottom="@dimen/activity_vertical_margin"
    android:orientation="vertical"
    tools:context="com.elyeproj.deviceinfo.MainActivity">

</LinearLayout>
```

### Step 4: Write Code

Here is the full code

**MainActivity.java**

```java
import android.os.Bundle;
import android.support.v7.app.AppCompatActivity;
import android.util.DisplayMetrics;
import android.view.Display;
import android.view.ViewGroup;
import android.widget.TextView;
import android.widget.Toast;

public class MainActivity extends AppCompatActivity {

    private float deviceDensity = 0;
    private ViewGroup containerView = null;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);

        containerView = (ViewGroup)findViewById(R.id.view_container);

        calculateDensity();
        calculateDeviceInfo();
        calculateStatusBar();
    }

    private void calculateDensity() {
        deviceDensity  = getResources().getDisplayMetrics().density;

        String densityStr = "Undefined";

        if (deviceDensity == 0.75) densityStr = "LDPI";
        else if (deviceDensity == 1.0) densityStr = "MDPI";
        else if (deviceDensity == 1.5) densityStr = "HDPI";
        else if (deviceDensity == 2.0) densityStr = "XHDPI";
        else if (deviceDensity == 3.0) densityStr = "XXHDPI";
        else if (deviceDensity == 4.0) densityStr = "XXXHDPI";

        addTextView("Density Value: " + deviceDensity + "(" + densityStr + ")");
    }

    private void calculateDeviceInfo() {
        Display display = getWindowManager().getDefaultDisplay();
        DisplayMetrics outMetrics = new DisplayMetrics();
        display.getMetrics(outMetrics);

        float dpHeight = outMetrics.heightPixels / deviceDensity;
        float dpWidth  = outMetrics.widthPixels / deviceDensity;

        addTextView("Height Resolution(dp): " + dpHeight);
        addTextView("Width Resolution(dp): " + dpWidth);
    }

    private void calculateStatusBar() {
        int resourceId = getResources().getIdentifier("status_bar_height", "dimen", "android");
        if (resourceId > 0) {
            float dpStatusBar = getResources().getDimensionPixelSize(resourceId)/deviceDensity;
            addTextView("Status Bar Resolution(dp)\t: " + dpStatusBar);
        }
    }

    private void addTextView(String text) {
        TextView textView = new TextView(this);
        textView.setText(text);
        containerView.addView(textView);
    }
}
```

### Reference

Download the code below.

| Number | Link |
| --- | --- |
| 1. | [Download](https://github.com/elye/demo_deviceinfo/archive/refs/heads/master.zip) code |
| 2. | [Follow](https://github.com/elye) code author |

## More Examples

Here are more examples

[loop type=example taxonomy=post_tag term=device-info orderby=date order=asc]

## [loop-count]. [field title]

[content]

[Read Individually.]([field url])

* * *

[/loop]
