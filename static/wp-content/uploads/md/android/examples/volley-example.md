# Volley StringRequest Example


>  This is an android example of to make a request using Volley.

Follow the following steps:

### Step 1: Install Volley

Start by installing Volley. You can use a later version:

```groovy
implementation 'com.mcxiaoke.volley:library:1.0.19'
```

### Step 2: Add Permissions

In your `AndroidManifest.xml` add the following permissions:

```xml
    <uses-permission android:name="android.permission.ACCESS_NETWORK_STATE"/>
    <uses-permission android:name="android.permission.INTERNET"/>
```

### Step 3: Design Layout

Next design your main layout with a single TextView:

**activity_main.xml**

```xml
<?xml version="1.0" encoding="utf-8"?>
<RelativeLayout
    xmlns:android="http://schemas.android.com/apk/res/android"
    xmlns:tools="http://schemas.android.com/tools"
    android:layout_width="match_parent"
    android:layout_height="match_parent"
    android:paddingBottom="@dimen/activity_vertical_margin"
    android:paddingLeft="@dimen/activity_horizontal_margin"
    android:paddingRight="@dimen/activity_horizontal_margin"
    android:paddingTop="@dimen/activity_vertical_margin"
    tools:context=".activities.MainActivity">

    <TextView
        android:id="@+id/textView"
        android:layout_width="match_parent"
        android:layout_height="match_parent"/>
</RelativeLayout>

```

### Step 4: Initialize RequestQueue

Extend the `android.app.Application` class and inside the `onCreate()` initialize Volley as shownbelow

**(a). VolleyApplication.java**

```java
package fr.esilv.volleyexample;

import android.app.Application;

import com.android.volley.RequestQueue;
import com.android.volley.toolbox.Volley;

public class VolleyApplication extends Application {

    private static RequestQueue requestQueue;

    @Override
    public void onCreate() {
        super.onCreate();
        requestQueue = Volley.newRequestQueue(this);
    }

    public static RequestQueue getRequestQueue() {
        return requestQueue;
    }
}


```


### Step 5: Extend StringRequest

Extend the StringRequest class as shown below:

**ReadMeStringRequest.java**

```java
package fr.esilv.volleyexample.requests;

import com.android.volley.Response;
import com.android.volley.toolbox.StringRequest;

public class ReadMeStringRequest extends StringRequest {

    private static final String URL = "https://raw.githubusercontent.com/nguyen-baylatry-esilv/volley-example/master/README.md";

    public ReadMeStringRequest(Response.Listener<String> listener, Response.ErrorListener errorListener) {
        super(Method.GET, URL, listener, errorListener);
    }
}

```

### Step 6: Make Request

Make the request inside the `MainActivity`:

**MainActivity.java**

```java
package fr.esilv.volleyexample.activities;

import android.os.Bundle;
import android.support.v7.app.AppCompatActivity;
import android.widget.TextView;

import com.android.volley.Response;
import com.android.volley.VolleyError;

import java.lang.ref.WeakReference;

import fr.esilv.volleyexample.R;
import fr.esilv.volleyexample.VolleyApplication;
import fr.esilv.volleyexample.requests.ReadMeStringRequest;

public class MainActivity extends AppCompatActivity {

    private TextView textView;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);
        textView = (TextView) findViewById(R.id.textView);

        //Create and launch a new Request
        ReadMeStringRequest readMeStringRequest = new ReadMeStringRequest(new ReadMeRequestListener(this), new ReadMeErrorListener(this));
        VolleyApplication.getRequestQueue().add(readMeStringRequest);
    }

    private static class ReadMeRequestListener implements Response.Listener<String> {

        private WeakReference<MainActivity> mainActivityWeakReference;

        public ReadMeRequestListener(MainActivity mainActivity) {
            mainActivityWeakReference = new WeakReference<>(mainActivity);
        }

        @Override
        public void onResponse(String response) {
            // We create a WeakReference there because of the Network Operation.
            // When the Response of the operation arrives, the Activity could be destroyed (i.e. if the Application is killed)
            // If the Activity is destroyed, the reference will be null ans no NullPointerException will be thrown.
            MainActivity mainActivity = mainActivityWeakReference.get();
            if (mainActivity != null) {
                mainActivity.textView.setText(response);
            }
        }
    }

    private static class ReadMeErrorListener implements Response.ErrorListener {

        private WeakReference<MainActivity> mainActivityWeakReference;

        public ReadMeErrorListener(MainActivity mainActivity) {
            mainActivityWeakReference = new WeakReference<>(mainActivity);
        }

        @Override
        public void onErrorResponse(VolleyError error) {
            MainActivity mainActivity = mainActivityWeakReference.get();
            if (mainActivity != null) {
                mainActivity.textView.setText(R.string.error);
            }
        }
    }
}

```

### Reference

> Download full code [here](https://github.com/nguyen-baylatry-esilv/volley-example/archive/refs/heads/master.zip).
> Follow code author [here](https://github.com/nguyen-baylatry-esilv/).
