# Android Solutions - Reliably get Device Name

Sometimes trying to get a device name using [BUILD.MODEL](http://developer.android.com/reference/android/os/Build.html#MODEL) does returns neither a reliable device name nor a user-friendly name. Some third party solutions have been created to solve this problem. This piece explores these solutions alongside their examples.


## Use AndroidDeviceNames

> This is a small Android library to get the market name(user friendly name) of an Android device.

So how do you use this solution.

### Step 1: Install it

You install by adding the following the implementation statement in your build.gradle file:

```groovy
implementation 'com.jaredrummler:android-device-names:2.0.0'
```

### Step 2: Init the Library

To setup the library `init` it as follows:

```java
DeviceName.init(this);
```

Then simply invoke the `getDeviceName()` method as follows:

```java
String deviceName = DeviceName.getDeviceName();
```

The above code will get the correct device name for the top 600 Android devices. If the device is unrecognized, then [`Build.MODEL`](http://developer.android.com/reference/android/os/Build.html#MODEL) is returned. This can be executed from the UI thread.

To get the name of a device using the device's codename use the following code:

```java
// Retruns "Moto X Style"
DeviceName.getDeviceName("clark", "Unknown device");
```

To get information about the device:

```java
DeviceName.with(context).request(new DeviceName.Callback() {

  @Override public void onFinished(DeviceName.DeviceInfo info, Exception error) {
    String manufacturer = info.manufacturer;  // "Samsung"
    String name = info.marketName;            // "Galaxy S8+"
    String model = info.model;                // "SM-G955W"
    String codename = info.codename;          // "dream2qltecan"
    String deviceName = info.getName();       // "Galaxy S8+"
    // FYI: We are on the UI thread.
  }
});
```

The above code queries a database included in the library based on [Google's maintained list](https://support.google.com/googleplay/answer/1727131?hl=en) . This supports _over 27,000_ devices.

### Full Example

Let's look at a full example. Start by installing the library using steps discussed earlier:

Then design the xml layout:

**content_main.xml**

```xml
<?xml version="1.0" encoding="utf-8"?>
<androidx.core.widget.NestedScrollView
    xmlns:android="http://schemas.android.com/apk/res/android"
    xmlns:app="http://schemas.android.com/apk/res-auto"
    xmlns:tools="http://schemas.android.com/tools"
    android:layout_width="match_parent"
    android:layout_height="match_parent"
    app:layout_behavior="@string/appbar_scrolling_view_behavior"
    tools:context="com.jaredrummler.android.devicenames.MainActivity"
    tools:showIn="@layout/activity_main"
    >

  <LinearLayout
      android:layout_width="match_parent"
      android:layout_height="match_parent"
      android:orientation="vertical"
      android:paddingBottom="@dimen/activity_vertical_margin"
      android:paddingLeft="@dimen/activity_horizontal_margin"
      android:paddingRight="@dimen/activity_horizontal_margin"
      android:paddingTop="@dimen/activity_vertical_margin"
      app:layout_behavior="@string/appbar_scrolling_view_behavior"
      >

    <TextView
        android:id="@+id/my_device"
        android:layout_width="match_parent"
        android:layout_height="wrap_content"
        />

    <com.google.android.material.textfield.TextInputLayout
        android:id="@+id/input_layout_codename"
        android:layout_width="match_parent"
        android:layout_height="wrap_content"
        android:layout_marginTop="12dp"
        >

      <EditText
          android:id="@+id/input_codename"
          android:layout_width="match_parent"
          android:layout_height="wrap_content"
          android:hint="codename"
          />

    </com.google.android.material.textfield.TextInputLayout>

    <com.google.android.material.textfield.TextInputLayout
        android:id="@+id/input_layout_model"
        android:layout_width="match_parent"
        android:layout_height="wrap_content"
        >

      <EditText
          android:id="@+id/input_model"
          android:layout_width="match_parent"
          android:layout_height="wrap_content"
          android:hint="model"
          />

    </com.google.android.material.textfield.TextInputLayout>

    <Button
        android:id="@+id/btn"
        android:layout_width="wrap_content"
        android:layout_height="wrap_content"
        android:text="@android:string/ok"
        />

    <TextView
        android:id="@+id/result"
        android:layout_width="match_parent"
        android:layout_height="wrap_content"
        />

  </LinearLayout>
</androidx.core.widget.NestedScrollView>
```

Then replace your main activity with the following:

**MainActivity.java**

```java
import android.os.Build;
import android.os.Bundle;
import android.text.Html;
import android.text.TextUtils;
import android.view.View;
import android.widget.EditText;
import android.widget.TextView;
import androidx.appcompat.app.AppCompatActivity;
import androidx.appcompat.widget.Toolbar;
import com.google.android.material.snackbar.Snackbar;
import com.jaredrummler.android.device.DeviceName;

public class MainActivity extends AppCompatActivity implements View.OnClickListener {

  private EditText editTextCodename;
  private EditText editTextModel;
  private TextView result;

  @Override protected void onCreate(Bundle savedInstanceState) {
    super.onCreate(savedInstanceState);
    setContentView(R.layout.activity_main);
    Toolbar toolbar = findViewById(R.id.toolbar);
    setSupportActionBar(toolbar);

    setDeviceNameText();

    editTextCodename = findViewById(R.id.input_codename);
    editTextModel = findViewById(R.id.input_model);
    result = findViewById(R.id.result);

    editTextCodename.setText(Build.DEVICE);
    editTextModel.setText(Build.MODEL);

    findViewById(R.id.btn).setOnClickListener(this);
  }

  @Override public void onClick(final View v) {
    String codename = editTextCodename.getText().toString();
    String model = editTextModel.getText().toString();

    if (TextUtils.isEmpty(codename)) {
      Snackbar.make(findViewById(R.id.main), "Please enter a codename", Snackbar.LENGTH_LONG)
          .show();
      return;
    }

    DeviceName.Request request = DeviceName.with(this).setCodename(codename);
    if (!TextUtils.isEmpty(model)) {
      request.setModel(model);
    }

    request.request(new DeviceName.Callback() {

      @Override public void onFinished(DeviceName.DeviceInfo info, Exception error) {
        if (error != null) {
          result.setText(error.getLocalizedMessage());
          return;
        }

        result.setText(Html.fromHtml("<b>Codename</b>: " + info.codename + "<br>"
            + "<b>Model</b>: " + info.model + "<br>"
            + "<b>Manufacturer</b>: " + info.manufacturer + "<br>"
            + "<b>Name</b>: " + info.getName()));
      }
    });
  }

  private void setDeviceNameText() {
    final TextView textView = findViewById(R.id.my_device);

    String deviceName = DeviceName.getDeviceName();
    if (deviceName != null) {
      textView.setText(Html.fromHtml("<b>THIS DEVICE</b>: " + deviceName));
      return;
    }

    // This device is not in the popular device list. Request the device info:
    DeviceName.with(this).request(new DeviceName.Callback() {

      @Override public void onFinished(DeviceName.DeviceInfo info, Exception error) {
        textView.setText(Html.fromHtml("<b>THIS DEVICE</b>: " + info.getName()));
      }
    });
  }

}
```

### Reference

Download the code below:

| No. | Link |
| --- | --- |
| 1. | [Download](https://github.com/jaredrummler/AndroidDeviceNames/archive/refs/heads/master.zip) code |
| 2. | [Read](https://github.com/jaredrummler/AndroidDeviceNames/) more |
| 3. | [Follow](https://github.com/jaredrummler/AndroidDeviceNames/archive/refs/heads/master.zip) code author |
