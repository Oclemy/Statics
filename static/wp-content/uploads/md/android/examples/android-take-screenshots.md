# How to Programmatically Take Screenshots in Android


You may need to want to programmatically take screenshots right from your app. In this piece we examine options that may help you achieve this. We look at awesome libraries and source code examples.

This article helps you learn how to perform the following tasks:

1. Take screenshots programmatically inside an app.
2. Take screenshots that include dialogs, toasts, modals etc.
3. How to take screenshots and save to file.
4. How to take screenshots as bitmap in android.


## (a). Use Falcon

> A library that helps you take Android screenshots that includes dialogs, toasts and all other extra windows in your screenshot.

### Step 1: How to Install

Install from maven central:

```groovy
implementation 'com.jraska:falcon:2.2.0'
```

### Step 2: How to use

Usage is very simple:

```java
// Saving screenshot to file
Falcon.takeScreenshot(activity, file);
// Take bitmap and do whatever you want
Bitmap bitmap = Falcon.takeScreenshotBitmap(activity);
```

### Step 3: Example

Here's the main activity:

```java
package com.jraska.falcon.sample;

import android.content.Context;
import android.content.DialogInterface;
import android.content.Intent;
import android.net.Uri;
import android.os.Bundle;
import android.os.Environment;
import android.os.Looper;
import android.support.design.widget.Snackbar;
import android.support.v7.app.AlertDialog;
import android.support.v7.app.AppCompatActivity;
import android.support.v7.widget.ListPopupWindow;
import android.support.v7.widget.Toolbar;
import android.view.Menu;
import android.view.MenuItem;
import android.view.View;
import android.widget.ArrayAdapter;
import android.widget.TextView;
import android.widget.Toast;
import butterknife.BindView;
import butterknife.ButterKnife;
import butterknife.OnClick;
import butterknife.OnLongClick;
import com.jraska.falcon.Falcon;

import java.io.File;
import java.text.DateFormat;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.Locale;
import java.util.concurrent.Executors;
import java.util.concurrent.ScheduledExecutorService;
import java.util.concurrent.TimeUnit;

public class SampleActivity extends AppCompatActivity {

  //region Fields

  @BindView(R.id.toolbar) Toolbar _toolbar;
  @BindView(R.id.countdown) TextView _countdownText;

  private int _remainingSeconds;
  private ScheduledExecutorService _executorService = Executors.newSingleThreadScheduledExecutor();

  //endregion

  //region Activity overrides

  @Override
  protected void onCreate(Bundle savedInstanceState) {
    super.onCreate(savedInstanceState);

    setContentView(R.layout.activity_sample);
    ButterKnife.bind(this);

    setSupportActionBar(_toolbar);
  }

  @Override
  public boolean onCreateOptionsMenu(Menu menu) {
    getMenuInflater().inflate(R.menu.menu_sample, menu);
    return true;
  }

  @Override
  public boolean onOptionsItemSelected(MenuItem item) {
    if (item.getItemId() == R.id.action_floating) {
      FloatingViewActivity.start(this);
      return true;
    }

    return super.onOptionsItemSelected(item);
  }

  //endregion

  //region Methods

  @OnClick(R.id.show_snack)
  public void showSnackBar(View view) {
    Snackbar.make(view, "Snackbar", Snackbar.LENGTH_LONG)
        .setAction("Screenshot", new View.OnClickListener() {
          @Override
          public void onClick(View v) {
            takeScreenshot();
          }
        }).show();
  }

  @OnClick(R.id.show_toast)
  public void showToast() {
    Toast.makeText(this, "Toast", Toast.LENGTH_LONG).show();
  }

  @OnClick(R.id.show_dialog)
  public void showDialog(View v) {

    //show all to have possibility see it in dialog screenshot
    showToast();
    showSnackBar(v);

    AlertDialog.Builder builder = new AlertDialog.Builder(SampleActivity.this);
    builder.setTitle("Falcon");
    builder.setMessage("Click button below to take screenshot with dialog");
    builder.setPositiveButton("Screenshot", new DialogInterface.OnClickListener() {
      @Override
      public void onClick(DialogInterface dialog, int which) {
        takeScreenshot();
      }
    });
    builder.show();
  }

  @OnClick(R.id.fab_screenshot)
  public void startScreenshotCountDown() {
    if (_remainingSeconds > 0) {
      return;
    }

    _remainingSeconds = 3;
    updateRemainingSeconds();

    Runnable counterCommand = new Runnable() {
      @Override public void run() {
        if (Looper.getMainLooper() != Looper.myLooper()) {
          runOnUiThread(this);
          return;
        }

        _remainingSeconds--;
        updateRemainingSeconds();

        if (_remainingSeconds > 0) {
          scheduleInSecond(this);
        } else {
          // post to see update of screen before screenshot freezes screen
          _countdownText.post(new Runnable() {
            @Override public void run() {
              takeScreenshot();
            }
          });
        }
      }
    };

    scheduleInSecond(counterCommand);
  }

  @OnLongClick(R.id.toolbar)
  public boolean showExtraActivity() {
    startActivity(new Intent(this, SampleActivity.class));
    return true;
  }

  private void scheduleInSecond(Runnable command) {
    _executorService.schedule(command, 1, TimeUnit.SECONDS);
  }

  private void updateRemainingSeconds() {
    if (_remainingSeconds <= 0) {
      _countdownText.setVisibility(View.GONE);
    } else {
      _countdownText.setVisibility(View.VISIBLE);
      String countDownText = getString(R.string.screenshot_in, _remainingSeconds);
      _countdownText.setText(countDownText);
    }
  }

  public void takeScreenshot() {
    File screenshotFile = getScreenshotFile();

    Falcon.takeScreenshot(this, screenshotFile);

    String message = "Screenshot captured to " + screenshotFile.getAbsolutePath();
    Toast.makeText(this, message, Toast.LENGTH_LONG).show();

    Uri uri = Uri.fromFile(screenshotFile);
    Intent scanFileIntent = new Intent(
        Intent.ACTION_MEDIA_SCANNER_SCAN_FILE, uri);
    sendBroadcast(scanFileIntent);
  }

  @OnClick(R.id.show_popup)
  public void showPopup() {
    ListPopupWindow listPopupWindow = new ListPopupWindow(this, null);

    String[] data = {"Item 1", "Item 2", "Item 3"};
    ArrayAdapter<String> adapter = new ArrayAdapter<>(this, android.R.layout.simple_dropdown_item_1line, data);
    listPopupWindow.setAdapter(adapter);

    listPopupWindow.setAnchorView(findViewById(R.id.show_popup));
    listPopupWindow.show();
  }

  protected File getScreenshotFile() {
    File screenshotDirectory;
    try {
      screenshotDirectory = getScreenshotsDirectory(getApplicationContext());
    } catch (IllegalAccessException e) {
      throw new RuntimeException(e);
    }

    DateFormat dateFormat = new SimpleDateFormat("yyyy-MM-dd_HH-mm-ss.SSS", Locale.getDefault());

    String screenshotName = dateFormat.format(new Date()) + ".png";
    return new File(screenshotDirectory, screenshotName);
  }

  private static File getScreenshotsDirectory(Context context) throws IllegalAccessException {
    String dirName = "screenshots_" + context.getPackageName();

    File rootDir;

    if (Environment.MEDIA_MOUNTED.equals(Environment.getExternalStorageState())) {
      rootDir = context.getExternalFilesDir(Environment.DIRECTORY_PICTURES);
    } else {
      rootDir = context.getDir("screens", MODE_PRIVATE);
    }

    File directory = new File(rootDir, dirName);

    if (!directory.exists()) {
      if (!directory.mkdirs()) {
        throw new IllegalAccessException("Unable to create screenshot directory " + directory.getAbsolutePath());
      }
    }

    return directory;
  }

  //endregion
}
```

Find full source code [here](https://github.com/jraska/Falcon/tree/master/falcon-sample).

### Step 4: Reference

Find complete source code reerence [here](https://github.com/jraska/Falcon).
