# Use JsonViewer

>  Android json viewer, to convert json strings to a friendly readable format, it supports expend&collapsed json strings..

Android JSON viewer, to convert JSON Strings to a Friendly Readable Format, it supports expend&collapsed JSON strings.

To use it simply follow these steps:

### Step 1: Add Dependencies

Add the following implementation statement in your dependencies section:

```groovy
implementation 'com.yuyh.json:jsonviewer:1.0.6'
```


### Step 2: Add to Layout

Then add the widget to your layout where you want to view the JSON file:

```xml
<HorizontalScrollView
    android:layout_width="match_parent"
    android:layout_height="match_parent"
    android:fillViewport="true"
    android:orientation="vertical">

	<com.yuyh.jsonviewer.library.JsonRecyclerView
	    android:id="@+id/rv_json"
	    android:layout_width="match_parent"
	    android:layout_height="wrap_content" />
</HorizontalScrollView>
```

### Step 3: Bind JSON

Bind JSON to your widget as shown below:

```java
JsonRecyclerView mRecyclewView = findViewById(R.id.rv_json);
// bind json
mRecyclewView.bindJson("your json strings." || JSONObject || JSONArray);
```


### Methods

```kotlin
// Color
mRecyclewView.setKeyColor()
mRecyclewView.setValueTextColor()
mRecyclewView.setValueNumberColor()
mRecyclewView.setValueUrlColor()
mRecyclewView.setValueNullColor()
mRecyclewView.setBracesColor()

// TextSize
mRecyclewView.setTextSize()
```


### Full Example

For a full JSON Viewer example project using this library follow the following steps after installation.

#### Step 1. Design Layouts

In Android we design our UI interfaces using XML. So let's create the following layouts:

**(a). activity_main.xml**


> Our `activity_main` layout.

First inside your `/res/layout/` directory create an xml layout file named `activity_main.xml`.

Moreover design your XML layout using the following 2 UI widgets and ViewGroups:

1. `HorizontalScrollView` - Our root element
2. `com.yuyh.jsonviewer.library.JsonRecyclerView` - This is the widget that shall render our JSON

```xml
<?xml version="1.0" encoding="utf-8"?>
<HorizontalScrollView xmlns:android="http://schemas.android.com/apk/res/android"
    android:id="@+id/hsv"
    android:layout_width="match_parent"
    android:layout_height="match_parent"
    android:fillViewport="true"
    android:orientation="vertical">


    <com.yuyh.jsonviewer.library.JsonRecyclerView
        android:id="@+id/rv_json"
        android:layout_width="match_parent"
        android:layout_height="wrap_content" />

</HorizontalScrollView>
```
#### Step 2. Write Code

Finally we need to write our code as follows:

**(a). MainActivity.java**

> Our `MainActivity` class.

Just copy the code below and replace the package with your app's package name.

```java
package replace_with_your_package_name;

import android.support.v7.app.AppCompatActivity;
import android.os.Bundle;
import android.support.v7.widget.RecyclerView;
import android.view.MotionEvent;
import android.widget.HorizontalScrollView;

import com.yuyh.jsonviewer.library.JsonRecyclerView;

import java.io.IOException;
import java.io.InputStream;

public class MainActivity extends AppCompatActivity {

    private JsonRecyclerView mRecyclewView;
    private HorizontalScrollView mHScrollView;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);

        mHScrollView = findViewById(R.id.hsv);

        mRecyclewView = findViewById(R.id.rv_json);
        mRecyclewView.setScaleEnable(true);
        mRecyclewView.addOnItemTouchListener(new RecyclerView.OnItemTouchListener() { // 避免双指缩放与上下左右滑动冲突
            @Override
            public boolean onInterceptTouchEvent(RecyclerView rv, MotionEvent event) {
                switch (event.getAction() & event.getActionMasked()) {
                    case MotionEvent.ACTION_DOWN:
                        break;
                    case MotionEvent.ACTION_UP:
                        break;
                    case MotionEvent.ACTION_POINTER_UP:
                        mHScrollView.requestDisallowInterceptTouchEvent(false);
                        break;
                    case MotionEvent.ACTION_POINTER_DOWN:
                        mHScrollView.requestDisallowInterceptTouchEvent(true);
                        break;

                    case MotionEvent.ACTION_MOVE:
                        break;
                }
                return false;
            }

            @Override
            public void onTouchEvent(RecyclerView rv, MotionEvent e) {

            }

            @Override
            public void onRequestDisallowInterceptTouchEvent(boolean disallowIntercept) {

            }
        });

        new Thread(new Runnable() {
            @Override
            public void run() {
                InputStream is = null;
                try {
                    is = getAssets().open("demo.json");
                    int lenght = is.available();
                    byte[] buffer = new byte[lenght];
                    is.read(buffer);
                    final String result = new String(buffer, "utf8");
                    is.close();

                    runOnUiThread(new Runnable() {
                        @Override
                        public void run() {
                            mRecyclewView.bindJson(result);
                        }
                    });
                } catch (IOException e) {
                    e.printStackTrace();
                }
            }
        }).start();
    }
}


```

### Reference

Download the code below:

|No.|Link|
|--|---|
|1.|[Download Full Code](https://github.com/smuyyh/JsonViewer/archive/refs/heads/master.zip)|
|2.|Read more [here](https://github.com/smuyyh/JsonViewer).|
|3.|Follow code author [here](https://github.com/smuyyh).|
