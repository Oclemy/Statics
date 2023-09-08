# Android - Check for App Updates Example

Once users install your app from Google play, the only way for them to know that there is a newer and better version of your app is for them to use the Google Play App. If they rarely visit it then users will continue missing out on the newer features of your app unknowingly. It thus makes sense to have an easy way of checking forupdates just within your app.

This is the aim of this tutorial, to explore soultions and examples that facilitate this very important process.


## Solution 1: Use UpdateHandler

> It is an Update Checker For Google Play.

Here is a demo app:

![Check for Updates Example](https://github.com/androidmads/UpdateHandler/raw/master/w_o_whatsnew.png?raw=true)

Here is how you use it.

### Step 1: Create an Android Project

Create an empty android project in android studio, be it a kotlin or java one.

### Step 2: Install Update Checker

You need to install this library as a gradle dependency, by adding the following implementation statement in your `build.gradle` file's dependency closure;

```groovy
implementation 'androidmads.updatehandler:updatehandler:1.0.5'
```

### Step 2: Check for Update

This library works in release mode only with the same JKS key used for your Previous Version. Use the following code to check for updates:

```java

new UpdateHandler.Builder(this)
    .setContent("New Version Found")
    .setTitle("Update Found")
    .setUpdateText("Yes")
    .setCancelText("No")
    .showDefaultAlert(true)
    .showWhatsNew(true)
    .setCheckerCount(2)
    .setOnUpdateFoundLister(new UpdateHandler.Builder.UpdateListener() {
        @Override
        public void onUpdateFound(boolean newVersion, String whatsNew) {
            tv.setText(tv.getText() + "\n\nUpdate Found : " + newVersion + "\n\nWhat's New\n" + whatsNew);
        }
    })
    .setOnUpdateClickLister(new UpdateHandler.Builder.UpdateClickListener() {
        @Override
        public void onUpdateClick(boolean newVersion, String whatsNew) {
            Log.v("onUpdateClick", String.valueOf(newVersion));
            Log.v("onUpdateClick", whatsNew);
        }
    })
    .setOnCancelClickLister(new UpdateHandler.Builder.UpdateCancelListener() {
        @Override
        public void onCancelClick() {
            Log.v("onCancelClick", "Cancelled");
        }
    })
    .build();
```

### Full Example

After installing the library. Design a layout as follows:

**`activity_main.xml`**

```xml
<?xml version="1.0" encoding="utf-8"?>
<RelativeLayout xmlns:android="http://schemas.android.com/apk/res/android"
    android:layout_width="match_parent"
    android:layout_height="match_parent"
    android:paddingBottom="@dimen/activity_vertical_margin"
    android:paddingLeft="@dimen/activity_horizontal_margin"
    android:paddingRight="@dimen/activity_horizontal_margin"
    android:paddingTop="@dimen/activity_vertical_margin">

    <TextView
        android:text="@string/update_handler_library_sample"
        android:layout_width="wrap_content"
        android:layout_height="wrap_content"
        android:layout_centerVertical="true"
        android:layout_centerHorizontal="true"
        android:id="@+id/uhlPrompt"
        android:textColor="@color/colorPrimary"/>
</RelativeLayout>
```

Then write your java code as follows:

**`MainActivity.java`**

```java
import android.os.Bundle;
import android.support.v7.app.AppCompatActivity;
import android.util.Log;
import android.widget.TextView;

import androidmads.updatehandler.app.UpdateHandler;

public class MainActivity extends AppCompatActivity {

    TextView tv;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);

        tv = (TextView) findViewById(R.id.uhlPrompt);

        new UpdateHandler.Builder(this)
                .setTitle("Update Found")
                .setContent("New Version Found")
                .setUpdateText("Yes")
                .setCancelText("No")
                .showDefaultAlert(true)
                .showWhatsNew(false)
                .setCheckerCount(2)
                .setOnUpdateFoundLister(new UpdateHandler.Builder.UpdateListener() {
                    @Override
                    public void onUpdateFound(boolean newVersion, String whatsNew) {
                        tv.setText(tv.getText() + "\n\nUpdate Found : " + newVersion + "\n\nWhat's New\n" + whatsNew);
                    }
                })
                .setOnUpdateClickLister(new UpdateHandler.Builder.UpdateClickListener() {
                    @Override
                    public void onUpdateClick(boolean newVersion, String whatsNew) {
                        Log.v("onUpdateClick", String.valueOf(newVersion));
                        Log.v("onUpdateClick", whatsNew);
                    }
                })
                .setOnCancelClickLister(new UpdateHandler.Builder.UpdateCancelListener() {
                    @Override
                    public void onCancelClick() {
                        Log.v("onCancelClick", "Cancelled");
                    }
                })
                .build();

    }
}
```

### Reference

Find the reference links below:

| Number | Link |
| --- | --- |
| 1. | [Download Example](https://downgit.github.io/#/home?url=https://github.com/androidmads/UpdateHandler/tree/master/app) |
| 2. | [Read more](https://github.com/androidmads/UpdateHandler/) |
| 3. | [Follow code author](https://github.com/androidmads/) |
