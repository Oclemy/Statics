# StatusView Examples and Libraries


In this tutorial we want to look at the best android status or alert views. These are views that you can use to either show status of an operation or basic alert messages.


## (a). InfoView

> A simple and easy to use information view for Android.

![](https://raw.githubusercontent.com/marcoscgdev/InfoView/master/device-2017-10-02-183520.gif)

### Step 1: Insatll InfoView

Start by registering jitpack as a repository in the root level build.gradle:

```groovy
allprojects {
    repositories {
        ...
        maven { url 'https://jitpack.io' }
    }
}
```

Now add the dependency to your app build.gradle file:

```
implementation 'com.github.marcoscgdev:InfoView:1.0.1'
```

### Step 2: Use

Start by adding InfoView as XML element:

```xml
<com.marcoscg.infoview.InfoView
    android:id="@+id/info_view"
    android:layout_width="wrap_content"
    android:layout_height="wrap_content"
    android:layout_centerVertical="true"
    app:iv_title="Oops!"
    app:iv_message="That should not have happened."
    app:iv_icon="@drawable/ic_sad_emoji"
    app:iv_buttonText="Try again"
    app:iv_buttonTextColor="@color/colorAccent"
    app:iv_showButton="true"/>
```

Then in Java code:

```java
InfoView infoView = (InfoView) findViewById(R.id.info_view);
infoView.setTitle("Oops!");
infoView.setMessage("That should not have happened.");
infoView.setIconRes(R.drawable.ic_sad_emoji);
infoView.setButtonText("Try again");
infoView.setButtonTextColorRes(R.color.colorAccent);
infoView.setOnTryAgainClickListener(new InfoView.OnTryAgainClickListener() {
    @Override
    public void onTryAgainClick() {
        Toast.makeText(MainActivity.this, "Try again clicked!", Toast.LENGTH_SHORT).show();
    }
});
```

#### Using progressbar

```java
infoView.setProgress(true); // Show the progressbar
infoView.setProgress(false); // Hide the progressbar and show the info content
```

### Step 3: Example

Here's a full InfoView example:

```java
package com.marcoscg.infoviewsample;

import android.os.Handler;
import android.support.v7.app.AppCompatActivity;
import android.os.Bundle;
import android.widget.Toast;

import com.marcoscg.infoview.InfoView;

public class MainActivity extends AppCompatActivity {

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);

        final InfoView infoView = (InfoView) findViewById(R.id.info_view);
        /*
        infoView.setTitle("Oops!");
        infoView.setMessage("That should not have happened.");
        infoView.setButtonText("Try again");
        infoView.setButtonTextColorRes(R.color.colorAccent);
        */
        infoView.setOnTryAgainClickListener(new InfoView.OnTryAgainClickListener() {
            @Override
            public void onTryAgainClick() {
                Toast.makeText(MainActivity.this, "Try again clicked!", Toast.LENGTH_SHORT).show();
                emulateLoading(infoView);
            }
        });

        // This will simulate a 3 seconds loading process
        emulateLoading(infoView);

    }

    private void emulateLoading(final InfoView infoView) {
        infoView.setProgress(true);
        new Handler().postDelayed(new Runnable() {
            @Override
            public void run() {
                infoView.setProgress(false);
            }
        }, 3000);
    }
}
```

Find the full example [here](https://github.com/marcoscgdev/InfoView/tree/master/app).

### Reference

Find the full reference [here](https://github.com/marcoscgdev/InfoView).

## (b). StatusBarAlert

> Telegram X inspired android status bar alert view.

![](https://github.com/fede87/StatusBarAlert/raw/master/status_bar_alert_demo.gif)

This is a small library inspired by Telegram X status bar new alert written in Kotlin. It can show custom message with optional indeterminate progress in status bar area. Optional autohide feature can be tweaked with custom duration. When showing, status bar alert kindly hides status bar's icon with SYSTEM_UI_FLAG_LOW_PROFILE flag mode, if available from os.

### Step 1: Install It

This library supports API 14+.

First register jitpack as a dependency:

```groovy
allprojects {
    repositories {
        ...
        maven { url 'https://jitpack.io' }
    }
}
```

Then add implementation statement:

```groovy
implementation 'com.fede987:status-bar-alert:1.2.1'
```

### Step 2: Use

Show a new status bar alert:

```kotlin
val statusBarAlertview: StatusBarAlertView = StatusBarAlert.Builder(this@MainActivity)
                       .autoHide(true)
                       .withDuration(100)
                       .showProgress(true)
                       .withText("autohide!")
                       .withAlertColor(R.color.colorPrimaryDark)
                       .withTextColor(R.color.colorAccent)
                       .withIndeterminateProgressBarColor(R.color.colorAccent)
                       .withTypeface(typeface)
                       .build()

//update status bar alert view text at any time:
statusBarAlertView.updateText("UPDATED!!")
//or:
statusBarAlertView.updateText(R.string.updated)

// show indeterminate progress:
statusBarAlertView.showIndeterminateProgress()

// hide indeterminate progress:
statusBarAlertView.hideIndeterminateProgress()
```

Hide all status bar alerts for current activity with an optional "on hidden" callback:

```kotlin
StatusBarAlert.hide(this@MainActivity) {
    // onHidden callback
    Toast.makeText(this@MainActivity.applicationContext, "Alert has been hidden.", Toast.LENGHT_SHORT).show()
}

// or just call:

StatusBarAlert.hide(this@MainActivity)
```

### Step 3: Example

Here's a full example in kotlin:

**MainActivity.kt**

```kotlin
package com.fede987.statusbaralert.app

import android.graphics.Typeface
import android.os.Build
import android.os.Bundle
import android.os.Handler
import android.view.View
import android.widget.Toast
import androidx.appcompat.app.AppCompatActivity
import com.fede987.statusbaralert.StatusBarAlert
import com.fede987.statusbaralert.StatusBarAlertView
import kotlinx.android.synthetic.main.activity_main.button1
import kotlinx.android.synthetic.main.activity_main.button2
import kotlinx.android.synthetic.main.activity_main.button3
import kotlinx.android.synthetic.main.activity_main.button4
import kotlinx.android.synthetic.main.activity_main.dark_status_checkbox

class MainActivity : AppCompatActivity() {

    var typeface: Typeface? = null
    val handler: Handler = Handler()
    var alert1: StatusBarAlertView? = null
    var alert2: StatusBarAlertView? = null

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_main)

        createCustomTypeface()

        setupButtons()
    }

    override fun onDestroy() {
        alert1 = null
        alert2 = null
        handler.removeCallbacksAndMessages(null)
        StatusBarAlert.hide(this) {
            Toast.makeText(applicationContext, "hidden alert @onDestroy", Toast.LENGTH_SHORT).show()
        }
        super.onDestroy()
    }

    private fun createCustomTypeface() {
        typeface = Typeface.createFromAsset(assets, "font/Lato-Regular.ttf")
    }

    private fun setupButtons() {
        if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.M) {
            dark_status_checkbox.setOnCheckedChangeListener { button, checked ->
                if (checked) window.decorView.systemUiVisibility = window.decorView.systemUiVisibility or View.SYSTEM_UI_FLAG_LIGHT_STATUS_BAR
                else window.decorView.systemUiVisibility = window.decorView.systemUiVisibility and View.SYSTEM_UI_FLAG_LIGHT_STATUS_BAR.inv()
            }
        } else dark_status_checkbox.visibility = View.GONE

        button1.setOnClickListener {

            alert1 = StatusBarAlert.Builder(this@MainActivity)
                    .autoHide(true)
                    .showProgress(true)
                    .withDuration(10000)
                    .withText("autohide!")
                    .withTypeface(typeface!!)
                    .withAlertColor(R.color.colorAccent)
                    .withIndeterminateProgressBarColor(R.color.colorPrimary)
                    .withTextColor(R.color.colorPrimary)
                    .build()

            handler.postDelayed({
                alert1?.updateText("Phase 1!")
                alert1?.showIndeterminateProgress()
            }, 2000)

            handler.postDelayed({
                alert1?.updateText("Phase 2!")
                alert1?.showIndeterminateProgress()
            }, 4000)

            handler.postDelayed({
                alert1?.updateText("Completed!")
                alert1?.hideIndeterminateProgress()
            }, 7500)

        }

        button2.setOnClickListener {

            alert2 = StatusBarAlert.Builder(this@MainActivity)
                    .autoHide(false)
                    .showProgress(false)
                    .withText("RED ALERT!")
                    .withTypeface(typeface!!)
                    .withAlertColor(R.color.red)
                    .withTextColor(R.color.colorPrimaryDark)
                    .withIndeterminateProgressBarColor(R.color.colorPrimaryDark)
                    .build()

            handler.postDelayed({
                if (alert2?.parent != null)
                    alert2?.updateText("INFO UPDATED!!")
            }, 2000)

        }

        button3.setOnClickListener {

            StatusBarAlert.Builder(
                    this@MainActivity)
                    .autoHide(true)
                    .withDuration(400)
                    .showProgress(false)
                    .withText("BLINK!")
                    .withTypeface(typeface!!)
                    .withAlertColor(R.color.green)
                    .withTextColor(R.color.colorAccent)
                    .withIndeterminateProgressBarColor(R.color.colorAccent)
                    .build()

        }

        button4.setOnClickListener {

            StatusBarAlert.Builder(
                    this@MainActivity)
                    .autoHide(true)
                    .withDuration(2000)
                    .showProgress(false)
                    .withText("transparent alert!")
                    .withAlertColor(android.R.color.transparent)
                    .withTextColor(R.color.colorAccent)
                    .withIndeterminateProgressBarColor(R.color.colorAccent)
                    .withTypeface(typeface!!)
                    .build()
        }
    }
}
```

Find complete source code [here](https://github.com/fede87/StatusBarAlert/tree/master/app).

### Reference

Find complete reference [here](https://github.com/fede87/StatusBarAlert).

[loop type=example taxonomy=post_tag term=statusview orderby=date order=asc]

## [loop-count]. [field title]

[content]

[Read Individually.]([field url])

[/loop]
