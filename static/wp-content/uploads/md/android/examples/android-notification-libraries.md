# Best Android Notification Libraries


In android, a notification is a short message normally displayed outside an application's user interface.

We use them to provide reminders, communication with other people or timely information from your app. You can read more about notifications here.


In this top-list piece we will explore some of the best notification libraries out there.

Note that we list these libraries in random order.

### (a). PugNotification

PugNotification is a powerful library for creating notifications in android platform. It does this by abstracting all the notification construction process for you in just a single line of code.

![Android PugNotification](https://github.com/halysongoncalves/Pugnotification/raw/master/art/screenshot.png)

PugNotification also has the Android Wear support. However this is from the release 1.2.0 and above. PugNotification was first created by [Halyson Lima Gonçalves](https://github.com/halysongoncalves) and does receive consistent updates.

Here's a taste of PugNotification:

```java
PugNotification.with(context)
    .load()
    .identifier(identifier)
    .title(title)
    .message(message)
    .bigTextStyle(bigtext)
    .smallIcon(smallIcon)
    .largeIcon(largeIcon)
    .flags(Notification.DEFAULT_ALL)
    .button(icon, title, pendingIntent)
    .click(cctivity, bundle)
    .dismiss(activity, bundle)
    .color(color)
    .ticker(ticker)
    .when(when)
    .vibrate(vibrate)
    .lights(color, ledOnMs, ledOfMs)
    .sound(sound)
    .autoCancel(autoCancel)
    .simple()
    .build();
```

#### Installing PugNotification

There are several ways to install PugNotification. The most common way is obviously via Gradle:

```groovy
implementation 'com.github.halysongoncalves:pugnotification:1.8.1'
```

Alternatively PugNotification can be installed via Maven:

```xml
<dependency>
  <groupId>com.github.halysongoncalves</groupId>
  <artifactId>pugnotification</artifactId>
  <version>1.8.1</version>
</dependency>
```

Lastly we can install PugNotification as an aar file, by downloading it from [here](http://repo1.maven.org/maven2/com/github/halysongoncalves/pugnotification/1.8.1/pugnotification-1.8.1.aar).

#### PugNotification Snippets.

**1\. Showing Simple Notofication**

This is a notification with just text and image:

```java
PugNotification.with(context)
    .load()
    .title(title)
    .message(message)
    .bigTextStyle(bigtext)
    .smallIcon(R.drawable.pugnotification_ic_launcher)
    .largeIcon(R.drawable.pugnotification_ic_launcher)
    .flags(Notification.DEFAULT_ALL)
    .simple()
    .build();
```

**2\. Showing Progress Notofication**

This is a notification with progress bar:

```java
PugNotification.with(context)
    .load()
    .identifier(identifier)
    .smallIcon(R.drawable.pugnotification_ic_launcher)
    .progress()
    .value(progress,max, indeterminate)
    .build();
```

or:

```java
PugNotification.with(context)
    .load()
    .identifier(identifier)
    .smallIcon(R.drawable.pugnotification_ic_launcher)
    .progress()
    .update(identifier,progress,max, indeterminate)
    .build();
```

**3\. Showing Custom Notofication**

```java
PugNotification.with(context)
    .load()
    .title(title)
    .message(message)
    .bigTextStyle(bigtext)
    .smallIcon(R.drawable.pugnotification_ic_launcher)
    .largeIcon(R.drawable.pugnotification_ic_launcher)
    .flags(Notification.DEFAULT_ALL)
    .color(android.R.color.background_dark)
    .custom()
    .background(url)
    .setImageLoader(Callback)
    .setPlaceholder(R.drawable.pugnotification_ic_placeholder)
    .build();
```

#### Full PugNotification Example

Here's a full PugNotification example. We will have an mp3 file in our raw directory under the resources which will be played as the notification sound.

[ui-tabs position="top-left" active="0" theme="default"]

[ui-tab title="SamplePugNotification.java"] This is the main and only activity for this project.

```java
package br.com.goncalves.pugnotification.sample;

import android.app.Notification;
import android.content.Context;
import android.graphics.Bitmap;
import android.graphics.drawable.Drawable;
import android.os.Bundle;
import android.support.v7.app.AppCompatActivity;
import android.text.TextUtils;
import android.view.View;
import android.widget.AdapterView;
import android.widget.ArrayAdapter;
import android.widget.Button;
import android.widget.EditText;
import android.widget.RelativeLayout;
import android.widget.Spinner;
import android.widget.Toast;

import com.squareup.picasso.Picasso;
import com.squareup.picasso.Target;

import br.com.goncalves.pugnotification.interfaces.ImageLoader;
import br.com.goncalves.pugnotification.interfaces.OnImageLoadingCompleted;
import br.com.goncalves.pugnotification.notification.Load;
import br.com.goncalves.pugnotification.notification.PugNotification;

public class SamplePugNotification extends AppCompatActivity implements ImageLoader {
    private EditText mEdtTitle, mEdtMessage, mEdtBigText, mEdtUrl;
    private Button mBtnNotifySimple, mBtnNotifyCustom;
    private Context mContext;
    // Keep a strong reference to keep it from being garbage collected inside into method
    private Target viewTarget;
    private Spinner mSpnType;
    private RelativeLayout mContentBigText;
    private int mPosSelected = 0;

    private static Target getViewTarget(final OnImageLoadingCompleted onCompleted) {
        return new Target() {
            @Override
            public void onBitmapLoaded(Bitmap bitmap, Picasso.LoadedFrom from) {
                onCompleted.imageLoadingCompleted(bitmap);
            }

            @Override
            public void onBitmapFailed(Drawable errorDrawable) {

            }

            @Override
            public void onPrepareLoad(Drawable placeHolderDrawable) {

            }
        };
    }

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        mContext = this;
        setContentView(R.layout.pugnotification_sample_activity);

        loadInfoComponents();
        loadListeners();
    }

    private void loadInfoComponents() {
        this.mEdtTitle = (EditText) findViewById(R.id.edt_title);
        this.mEdtMessage = (EditText) findViewById(R.id.edt_message);
        this.mEdtBigText = (EditText) findViewById(R.id.edt_bigtext);
        this.mEdtUrl = (EditText) findViewById(R.id.edt_url);
        this.mBtnNotifySimple = (Button) findViewById(R.id.btn_notify_simple);
        this.mBtnNotifyCustom = (Button) findViewById(R.id.btn_notify_custom);
        this.mSpnType = (Spinner) findViewById(R.id.spn_notification_type);
        ArrayAdapter<CharSequence> adapter = ArrayAdapter.createFromResource(this,
                R.array.pugnotification_notification_types, android.R.layout.simple_spinner_item);
        adapter.setDropDownViewResource(android.R.layout.simple_spinner_dropdown_item);
        this.mSpnType.setAdapter(adapter);

        this.mContentBigText = (RelativeLayout) findViewById(R.id.content_bigtext);
    }

    private void loadListeners() {
        mSpnType.setOnItemSelectedListener(new AdapterView.OnItemSelectedListener() {
            @Override
            public void onItemSelected(AdapterView<?> parent, View view, int position, long id) {
                mPosSelected = position;
                switch (position) {
                    case 0:
                        mContentBigText.setVisibility(View.GONE);
                        break;
                    case 1:
                        mContentBigText.setVisibility(View.VISIBLE);
                        break;
                    case 2:
                        mContentBigText.setVisibility(View.GONE);
                        break;
                }
            }

            @Override
            public void onNothingSelected(AdapterView<?> parent) {

            }
        });
        mBtnNotifySimple.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                String title = mEdtTitle.getText().toString();
                String message = mEdtMessage.getText().toString();
                String bigtext = mEdtBigText.getText().toString();
                if (title.length() > 0 && message.length() > 0) {
                    Load mLoad = PugNotification.with(mContext).load()
                            .smallIcon(R.drawable.pugnotification_ic_launcher)
                            .autoCancel(true)
                            .largeIcon(R.drawable.pugnotification_ic_launcher)
                            .title(title)
                            .message(message)
                            .flags(Notification.DEFAULT_ALL);

                    switch (mPosSelected) {
                        case 0:
                            mLoad.simple()
                                 .build();
                            break;
                        case 1:
                            if (bigtext.length() > 0) {
                                mLoad.bigTextStyle(bigtext, message)
                                        .simple()
                                        .build();
                            } else {
                                notifyEmptyFields();
                            }
                            break;
                        case 2:
                            mLoad.inboxStyle(getResources().
                                            getStringArray(R.array.pugnotification_notification_inbox_lines),
                                    title,
                                    getResources().getString(R.string.pugnotification_text_summary))
                                    .simple()
                                    .build();
                            break;
                    }
                } else {
                    notifyEmptyFields();
                }
            }
        });

        mBtnNotifyCustom.setOnClickListener(new View.OnClickListener()

        {
            @Override
            public void onClick(View v) {
                String title = mEdtTitle.getText().toString();
                String message = mEdtMessage.getText().toString();
                String bigtext = mEdtBigText.getText().toString();
                String url = mEdtUrl.getText().toString();

                if (TextUtils.isEmpty(title) || TextUtils.isEmpty(message) || TextUtils.isEmpty(bigtext) || TextUtils.isEmpty(url)) {
                    mSpnType.setSelection(1);
                    notifyEmptyFields();
                    return;
                }

                PugNotification.with(mContext).load()
                        .title(title)
                        .message(message)
                        .bigTextStyle(bigtext)
                        .smallIcon(R.drawable.pugnotification_ic_launcher)
                        .largeIcon(R.drawable.pugnotification_ic_launcher)
                        .color(android.R.color.background_dark)
                        .custom()
                        .setImageLoader(SamplePugNotification.this)
                        .background(url)
                        .setPlaceholder(R.drawable.pugnotification_ic_placeholder)
                        .build();
            }
        });
    }

    private void notifyEmptyFields() {
        Toast.makeText(getApplicationContext(),
                R.string.pugnotification_text_empty_fields,
                Toast.LENGTH_SHORT).show();
    }

    @Override
    public void load(String uri, final OnImageLoadingCompleted onCompleted) {
        viewTarget = getViewTarget(onCompleted);
        Picasso.with(this).load(uri).into(viewTarget);
    }

    @Override
    public void load(int imageResId, OnImageLoadingCompleted onCompleted) {
        viewTarget = getViewTarget(onCompleted);
        Picasso.with(this).load(imageResId).into(viewTarget);
    }
}
```

[/ui-tab] [ui-tab title="pugnotification_sample_activity.xml"] This is the layout for the `SamplePugNotification` activity.

```xml
<ScrollView xmlns:android="http://schemas.android.com/apk/res/android"
            android:layout_width="match_parent"
            android:layout_height="match_parent"
            android:layout_margin="@dimen/margin_large">

    <LinearLayout
        android:layout_width="match_parent"
        android:layout_height="0dp"
        android:layout_margin="@dimen/margin_large"
        android:animateLayoutChanges="true"
        android:orientation="vertical">

        <TextView
            android:id="@+id/text_title_simple"
            android:layout_width="wrap_content"
            android:layout_height="wrap_content"
            android:text="@string/pugnotification_text_notification"
            android:textColor="@android:color/black"
            android:layout_marginBottom="@dimen/margin_default"
            android:textSize="@dimen/textSize_large"/>

        <RelativeLayout
            android:id="@+id/content_type"
            android:layout_width="wrap_content"
            android:layout_height="wrap_content">

            <TextView
                android:id="@+id/text_type"
                android:layout_width="wrap_content"
                android:layout_height="wrap_content"
                android:layout_marginTop="@dimen/margin_default"
                android:text="@string/pugnotification_text_type"
                android:layout_centerVertical="true"
                android:textSize="@dimen/textSize_medium"/>

            <Spinner
                android:id="@+id/spn_notification_type"
                android:layout_width="wrap_content"
                android:layout_height="wrap_content"
                android:layout_marginLeft="@dimen/margin_default"
                android:layout_toEndOf="@+id/text_type"
                android:layout_toRightOf="@+id/text_type"
                android:layout_centerVertical="true"
                android:textSize="@dimen/textSize_small"
                />
        </RelativeLayout>

        <RelativeLayout
            android:id="@+id/content_title"
            android:layout_width="wrap_content"
            android:layout_height="wrap_content">

            <TextView
                android:id="@+id/text_title"
                android:layout_width="wrap_content"
                android:layout_height="wrap_content"
                android:layout_marginTop="@dimen/margin_default"
                android:text="@string/pugnotification_text_title"
                android:textSize="@dimen/textSize_medium"/>

            <EditText
                android:id="@+id/edt_title"
                android:layout_width="wrap_content"
                android:layout_height="wrap_content"
                android:layout_marginLeft="@dimen/margin_default"
                android:layout_toEndOf="@+id/text_title"
                android:layout_toRightOf="@+id/text_title"
                android:hint="@string/pugnotification_text_hint_title"
                android:textSize="@dimen/textSize_small"/>

        </RelativeLayout>

        <RelativeLayout
            android:id="@+id/content_message"
            android:layout_width="wrap_content"
            android:layout_height="wrap_content">

            <TextView
                android:id="@+id/text_message"
                android:layout_width="wrap_content"
                android:layout_height="wrap_content"
                android:layout_marginTop="@dimen/margin_default"
                android:text="@string/pugnotification_text_message"
                android:textSize="@dimen/textSize_medium"/>

            <EditText
                android:id="@+id/edt_message"
                android:layout_width="wrap_content"
                android:layout_height="wrap_content"
                android:layout_marginLeft="@dimen/margin_default"
                android:layout_toEndOf="@+id/text_message"
                android:layout_toRightOf="@+id/text_message"
                android:hint="@string/pugnotification_text_hint_message"
                android:textSize="@dimen/textSize_small"/>
        </RelativeLayout>

        <RelativeLayout
            android:id="@+id/content_bigtext"
            android:layout_width="wrap_content"
            android:layout_height="wrap_content"
            android:visibility="gone">

            <TextView
                android:id="@+id/text_bigtext"
                android:layout_width="wrap_content"
                android:layout_height="wrap_content"
                android:layout_marginTop="@dimen/margin_default"
                android:text="@string/pugnotification_text_bigtext"
                android:textSize="@dimen/textSize_medium"/>

            <EditText
                android:id="@+id/edt_bigtext"
                android:layout_width="wrap_content"
                android:layout_height="wrap_content"
                android:layout_marginLeft="@dimen/margin_default"
                android:layout_toEndOf="@+id/text_bigtext"
                android:layout_toRightOf="@+id/text_bigtext"
                android:hint="@string/pugnotification_text_hint_bigtext"
                android:textSize="@dimen/textSize_small"/>
        </RelativeLayout>

        <Button
            android:id="@+id/btn_notify_simple"
            android:layout_width="wrap_content"
            android:layout_height="wrap_content"
            android:text="@string/pugnotification_button_notify_simple"/>

        <TextView
            android:id="@+id/text_title_custom"
            android:layout_width="wrap_content"
            android:layout_height="wrap_content"
            android:layout_marginTop="@dimen/margin_middle"
            android:text="@string/pugnotification_text_notification_custom"
            android:textColor="@android:color/black"
            android:textSize="@dimen/textSize_large"/>

        <RelativeLayout
            android:id="@+id/content_imgbackgrond"
            android:layout_width="wrap_content"
            android:layout_height="wrap_content">

            <TextView
                android:id="@+id/text_url"
                android:layout_width="wrap_content"
                android:layout_height="wrap_content"
                android:layout_marginTop="@dimen/margin_default"
                android:text="@string/pugnotification_text_url"
                android:textSize="@dimen/textSize_medium"/>

            <EditText
                android:id="@+id/edt_url"
                android:layout_width="wrap_content"
                android:layout_height="wrap_content"
                android:layout_marginLeft="@dimen/margin_default"
                android:layout_toEndOf="@+id/text_url"
                android:layout_toRightOf="@+id/text_url"
                android:hint="@string/pugnotification_text_hint_url"
                android:textSize="@dimen/textSize_small"/>
        </RelativeLayout>

        <Button
            android:id="@+id/btn_notify_custom"
            android:layout_width="wrap_content"
            android:layout_height="wrap_content"
            android:text="@string/pugnotification_button_notify_custom"/>
    </LinearLayout>
</ScrollView>
```

[/ui-tab] [ui-tab title="Download"]

| No. | Location | Link |
| --- | --- | --- |
| 1. | GitHub | [Download](https://github.com/halysongoncalves/Pugnotification/tree/master/sample/archive/master.zip) |
| 2. | GitHub | [Browse](https://github.com/halysongoncalves/Pugnotification/tree/master/sample) |
| 2. | GitHub | [Original Creator: @halysongoncalves](https://github.com/halysongoncalves) |

[/ui-tab] [/ui-tabs]

### (b). NotifyMe

_An Android Library for persistent and time based notifications._

Notifyme is an Android Library for simple notifications.It allows you to very easily set a delay or time when you want the notification to popup. Notification will popup even through system reboots.

![Android Notifyme](https://camo.githubusercontent.com/fecba0005ecae1284adaa8c99ab30d9cfe8d55ec/68747470733a2f2f7468756d62732e6766796361742e636f6d2f446973686f6e657374506c757368426c61636b6c61622d73697a655f726573747269637465642e676966)

#### Installing Notifyme

`NotifyMe` is hosted in jitpack, hence to install it we first have to register jitpack as a repository in our root level build.gradle:

```groovy
    allprojects {
        repositories {
            ...
            maven { url 'https://jitpack.io' }
        }
    }
```

Then in the app level build.gradle we can add the dependency:

```groovy
    dependencies {
            implementation 'com.github.jakebonk:NotifyMe:1.0.0'
    }
```

#### NotifyMe usage

First:

```java
NotifyMe.Builder notifyMe = new NotifyMe.Builder(getApplicationContext());
```

Then we can set the appropriate fields:

```java
  notifyMe.title(String title);
  notifyMe.content(String content);
  notifyMe.color(Int red,Int green,Int blue,Int alpha);//Color of notification header
  notifyMe.led_color(Int red,Int green,Int blue,Int alpha);//Color of LED when notification pops up
  notifyMe.time(Calendar time);//The time to popup notification
  notifyMe.delay(Int delay);//Delay in ms
  notifyMe.large_icon(Int resource);
  notifyMe.addAction(Intent intent,String text); //The action will call the intent when pressed
```

Then finally build:

```java
 notifyMe.build();
```

[ui-tabs position="top-left" active="0" theme="default"]

[ui-tab title="MainActivity.java"] This is the main and only activity for this project.

```java
package com.allyants.notificationlibrary;

import android.content.Intent;
import android.os.Bundle;
import android.support.v7.app.AppCompatActivity;
import android.view.View;
import android.widget.Button;
import android.widget.EditText;

import com.allyants.notifyme.NotifyMe;
import com.wdullaer.materialdatetimepicker.date.DatePickerDialog;
import com.wdullaer.materialdatetimepicker.time.TimePickerDialog;

import java.util.Calendar;

public class MainActivity extends AppCompatActivity implements DatePickerDialog.OnDateSetListener, TimePickerDialog.OnTimeSetListener {

    Calendar now = Calendar.getInstance();
    TimePickerDialog tpd;
    DatePickerDialog dpd;
    EditText etTitle,etContent;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);
        Button btnNotify = findViewById(R.id.btnNotify);
        etTitle = findViewById(R.id.etTitle);
        etContent = findViewById(R.id.etContent);

        Button btnCancel = findViewById(R.id.btnCancel);

        dpd = DatePickerDialog.newInstance(
                MainActivity.this,
                now.get(Calendar.YEAR),
                now.get(Calendar.MONTH),
                now.get(Calendar.DAY_OF_MONTH)
        );

        tpd = TimePickerDialog.newInstance(
                MainActivity.this,
                now.get(Calendar.HOUR_OF_DAY),
                now.get(Calendar.MINUTE),
                now.get(Calendar.SECOND),
                false
        );
        btnCancel.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                NotifyMe.cancel(getApplicationContext(),"test");
            }
        });
        btnNotify.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                dpd.show(getFragmentManager(), "Datepickerdialog");
            }
        });
    }

    @Override
    public void onDateSet(DatePickerDialog view, int year, int monthOfYear, int dayOfMonth) {
        now.set(Calendar.YEAR,year);
        now.set(Calendar.MONTH,monthOfYear);
        now.set(Calendar.DAY_OF_MONTH,dayOfMonth);
        tpd.show(getFragmentManager(), "Timepickerdialog");
    }

    @Override
    public void onTimeSet(TimePickerDialog view, int hourOfDay, int minute, int second) {
        now.set(Calendar.HOUR_OF_DAY,hourOfDay);
        now.set(Calendar.MINUTE,minute);
        now.set(Calendar.SECOND,second);
        Intent intent = new Intent(getApplicationContext(),TestActivity.class);
        intent.putExtra("test","I am a String");
        NotifyMe notifyMe = new NotifyMe.Builder(getApplicationContext())
                .title(etTitle.getText().toString())
                .content(etContent.getText().toString())
                .color(255,0,0,255)
                .led_color(255,255,255,255)
                .time(now)
                .addAction(intent,"Snooze",false)
                .key("test")
                .addAction(new Intent(),"Dismiss",true,false)
                .addAction(intent,"Done")
                .large_icon(R.mipmap.ic_launcher_round)
                .build();
    }
}
```

[/ui-tab] [ui-tab title="TestActivity.java"] Our `TestActivity`.

```java
package com.allyants.notificationlibrary;

import android.os.Bundle;
import android.support.v7.app.AppCompatActivity;

public class TestActivity extends AppCompatActivity {

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_test);
    }
}
```

[/ui-tab [ui-tab title="activity_main.xml"] This is the layout for the `MainActivity` activity.

```xml
<?xml version="1.0" encoding="utf-8"?>
<android.support.constraint.ConstraintLayout xmlns:android="http://schemas.android.com/apk/res/android"
    xmlns:app="http://schemas.android.com/apk/res-auto"
    xmlns:tools="http://schemas.android.com/tools"
    android:layout_width="match_parent"
    android:layout_height="match_parent"
    tools:context="com.allyants.notificationlibrary.MainActivity">

    <Button
        android:id="@+id/btnNotify"
        android:layout_width="wrap_content"
        android:layout_height="wrap_content"
        android:layout_marginBottom="56dp"
        android:layout_marginEnd="8dp"
        android:layout_marginStart="8dp"
        android:layout_marginTop="8dp"
        android:text="Notify"
        app:layout_constraintBottom_toBottomOf="parent"
        app:layout_constraintEnd_toEndOf="parent"
        app:layout_constraintStart_toStartOf="parent"
        app:layout_constraintTop_toBottomOf="@+id/etContent" />

    <EditText
        android:id="@+id/etTitle"
        android:layout_width="wrap_content"
        android:layout_height="wrap_content"
        android:layout_marginEnd="8dp"
        android:layout_marginStart="8dp"
        android:layout_marginTop="52dp"
        android:ems="10"
        android:hint="Title..."
        android:inputType="textPersonName"
        android:text="Title"
        app:layout_constraintEnd_toEndOf="parent"
        app:layout_constraintHorizontal_bias="0.503"
        app:layout_constraintStart_toStartOf="parent"
        app:layout_constraintTop_toTopOf="parent" />

    <EditText
        android:id="@+id/etContent"
        android:layout_width="wrap_content"
        android:layout_height="wrap_content"
        android:layout_marginStart="8dp"
        android:layout_marginTop="24dp"
        android:ems="10"
        android:hint="Content..."
        android:inputType="textPersonName"
        android:text="Hello World!"
        app:layout_constraintEnd_toEndOf="@+id/etTitle"
        app:layout_constraintHorizontal_bias="1.0"
        app:layout_constraintStart_toStartOf="@+id/etTitle"
        app:layout_constraintTop_toBottomOf="@+id/etTitle" />

    <Button
        android:id="@+id/btnCancel"
        android:layout_width="wrap_content"
        android:layout_height="wrap_content"
        android:layout_marginBottom="8dp"
        android:layout_marginEnd="8dp"
        android:layout_marginStart="8dp"
        android:layout_marginTop="8dp"
        android:text="Cancel"
        app:layout_constraintBottom_toTopOf="@+id/btnNotify"
        app:layout_constraintEnd_toEndOf="parent"
        app:layout_constraintStart_toStartOf="parent"
        app:layout_constraintTop_toBottomOf="@+id/etContent" />

</android.support.constraint.ConstraintLayout>
```

[/ui-tab] [ui-tab title="activity_test.xml"] This is the layout for the `TestActivity` activity.

```xml
<?xml version="1.0" encoding="utf-8"?>
<android.support.constraint.ConstraintLayout xmlns:android="http://schemas.android.com/apk/res/android"
    xmlns:app="http://schemas.android.com/apk/res-auto"
    xmlns:tools="http://schemas.android.com/tools"
    android:layout_width="match_parent"
    android:layout_height="match_parent"
    tools:context="com.allyants.notificationlibrary.TestActivity">

    <TextView
        android:layout_width="match_parent"
        android:layout_height="match_parent"
        android:gravity="center"
        android:text="Snoozing!" />

</android.support.constraint.ConstraintLayout>
```

[/ui-tab] [ui-tab title="Download"]

| No. | Location | Link |
| --- | --- | --- |
| 1. | GitHub | [Download](https://github.com/jakebonk/NotifyMe/tree/master/sample/archive/master.zip) |
| 2. | GitHub | [Browse](https://github.com/jakebonk/NotifyMe/tree/master/app) |
| 2. | GitHub | [Original Creator: @Jake Bont](https://github.com/jakebonk) |

[/ui-tab] [/ui-tabs]

### (c). Notify

Notify is a notification library witten in Kotlin that provides us with simplified notification delivery for Android. This library is written bu [Karn Saheb](https://github.com/Karn).

#### Installing Notify

Notify (pre-)releases are available via JitPack. Hence in your root level build.gradle you need to add jitpack as a repository:

```groovy
// Project level build.gradle
// ...
repositories {
    maven { url 'https://jitpack.io' }
}
// .
```

Then in your app level build.gradle you can add the dependency:

```groovy
// Module level build.gradle
dependencies {
    // Replace version with release version, e.g. 1.0.0-alpha, -SNAPSHOT
    implementation "io.karn:notify:[VERSION]"
}
```

#### Usage

Here's the simplest notication with title and message in just a single line of code:

```java
Notify
    .with(context)
    .content { // this: Payload.Content.Default
        title = "New dessert menu"
        text = "The Cheesecake Factory has a new dessert for you to try!"
    }
    .show()
```

[ui-tabs position="top-left" active="0" theme="default"]

[ui-tab title="MainActivity.kt"] This is the main and only activity for this project.

```kotlin
package presentation

import android.graphics.BitmapFactory
import android.graphics.Color
import android.os.Bundle
import android.support.v4.app.NotificationCompat
import android.support.v7.app.AppCompatActivity
import android.view.View
import io.karn.notify.Notify
import io.karn.notify.sample.R
import java.util.*

class MainActivity : AppCompatActivity() {

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_main)

        Notify.defaultConfig {
            header {
                color = resources.getColor(R.color.colorPrimaryDark)
            }
            alerting(Notify.CHANNEL_DEFAULT_KEY) {
                lightColor = Color.RED
            }
        }
    }

    fun notifyDefault(view: View) {
        Notify
                .with(this)
                .content {
                    title = "New dessert menu"
                    text = "The Cheesecake Factory has a new dessert for you to try!"
                }
                .stackable {
                    key = "test_key"
                    summaryContent = "test summary content"
                    summaryTitle = { count -> "Summary title" }
                    summaryDescription = { count -> count.toString() + " new notifications." }
                }
                .show()
    }

    fun notifyTextList(view: View) {
        Notify
                .with(this)
                .asTextList {
                    lines = Arrays.asList("New! Fresh Strawberry Cheesecake.",
                            "New! Salted Caramel Cheesecake.",
                            "New! OREO Dream Dessert.")
                    title = "New menu items!"
                    text = lines.size.toString() + " new dessert menu items found."
                }
                .show()

    }

    fun notifyBigText(view: View) {
        Notify
                .with(this)
                .asBigText {
                    title = "Chocolate brownie sundae"
                    text = "Try our newest dessert option!"
                    expandedText = "Mouthwatering deliciousness."
                    bigText = "Our own Fabulous Godiva Chocolate Brownie, Vanilla Ice Cream, Hot Fudge, Whipped Cream and Toasted Almonds.n" +
                            "n" +
                            "Come try this delicious new dessert and get two for the price of one!"
                }
                .show()
    }

    fun notifyBigPicture(view: View) {
        Notify
                .with(this)
                .asBigPicture {
                    title = "Chocolate brownie sundae"
                    text = "Get a look at this amazing dessert!"
                    expandedText = "The delicious brownie sundae now available."
                    image = BitmapFactory.decodeResource(this@MainActivity.resources, R.drawable.chocolate_brownie_sundae)
                }
                .show()
    }

    fun notifyMessage(view: View) {
        Notify
                .with(this)
                .asMessage {
                    userDisplayName = "Karn"
                    conversationTitle = "Sundae chat"
                    messages = Arrays.asList(
                            NotificationCompat.MessagingStyle.Message("Are you guys ready to try the Strawberry sundae?",
                                    System.currentTimeMillis() - (6 * 60 * 1000), // 6 Mins ago
                                    "Karn"),
                            NotificationCompat.MessagingStyle.Message("Yeah! I've heard great things about this place.",
                                    System.currentTimeMillis() - (5 * 60 * 1000), // 5 Mins ago
                                    "Nitish"),
                            NotificationCompat.MessagingStyle.Message("What time are you getting there Karn?",
                                    System.currentTimeMillis() - (1 * 60 * 1000), // 1 Mins ago
                                    "Moez")
                    )
                }
                .show()
    }
}
```

[ui-tab title="activity_main.xml"] This is the main and only activity for this project.

```kotlin
<?xml version="1.0" encoding="utf-8"?>
<LinearLayout xmlns:android="http://schemas.android.com/apk/res/android"
    xmlns:tools="http://schemas.android.com/tools"
    android:layout_width="match_parent"
    android:layout_height="match_parent"
    android:orientation="vertical"
    android:padding="16dp"
    tools:context="presentation.MainActivity">

    <ImageView
        android:layout_width="match_parent"
        android:layout_height="wrap_content"
        android:layout_marginTop="16dp"
        android:layout_marginBottom="16dp"
        android:src="@drawable/ic_notify_logo" />

    <TextView
        style="@style/DefaultTheme.TextButton.Colored"
        android:layout_width="match_parent"
        android:layout_height="wrap_content"
        android:onClick="notifyDefault"
        android:text="Notify default!" />

    <TextView
        style="@style/DefaultTheme.TextButton.Colored"
        android:layout_width="match_parent"
        android:layout_height="wrap_content"
        android:onClick="notifyTextList"
        android:text="Notify text list!" />

    <TextView
        style="@style/DefaultTheme.TextButton.Colored"
        android:layout_width="match_parent"
        android:layout_height="wrap_content"
        android:onClick="notifyBigText"
        android:text="Notify big text!" />

    <TextView
        style="@style/DefaultTheme.TextButton.Colored"
        android:layout_width="match_parent"
        android:layout_height="wrap_content"
        android:onClick="notifyBigPicture"
        android:text="Notify big picture!" />

    <TextView
        style="@style/DefaultTheme.TextButton.Colored"
        android:layout_width="match_parent"
        android:layout_height="wrap_content"
        android:onClick="notifyMessage"
        android:text="Notify messages!" />
</LinearLayout>
```

[/ui-tab] [ui-tab title="Download"]

| No. | Location | Link |
| --- | --- | --- |
| 1. | GitHub | [Download](https://github.com/Karn/notify/tree/master/sample/archive/master.zip) |
| 2. | GitHub | [Browse](https://github.com/Karn/notify/tree/develop/sample) |
| 2. | GitHub | [Original Creator: @Karn Saheb](https://github.com/Karn) |

[/ui-tab] [/ui-tabs]

### (d). NotifyUtil

NotifyUtil is a library that provides you with a Notification tool class with simplified api. It easens for you how to work with Notifications.

![Android NotifyUtil](https://github.com/hss01248/NotifyUtil/raw/master/image/simple-bigpic.jpg)

This library allows you create notifications with text, images, button,progress etc.

#### Installation

NotifyUtil is hosted in jitpack. Hence we need to register jitpack as a repository in the root level `build.gradle`file:

```groovy
    allprojects {
        repositories {
            ...
            maven { url "https://jitpack.io" }
        }
    }
```

Then in your app level build.gradle you add your implementation statement:

```groovy
    dependencies {
            implementation 'com.github.hss01248:NotifyUtil:1.0.1'
    }
```

[ui-tabs position="top-left" active="0" theme="default"]

[ui-tab title="MainActivity.java"] This is the main and only activity for this project.

```java
package com.hss01248.notifyutildemo;

import android.os.Bundle;
import  android.os.Handler ;
import android.support.v7.app.AppCompatActivity;
import android.view.View;
import android.widget.Button;

import com.hss01248.notifyutil.NotifyUtil;

import butterknife.Bind;
import butterknife.ButterKnife;
import butterknife.OnClick;

public  class  MainActivity  extends  AppCompatActivity {

    @Bind(R.id.simple)
    Button simple;
    @Bind(R.id.pic)
    Button pic;
    @Bind(R.id.progress)
    Button progress;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);
        ButterKnife.bind(this);
        NotifyUtil.init(getApplicationContext());
    }

    @OnClick({R.id.simple, R.id.pic, R.id.progress,R.id.bigtext,R.id.mailbox,R.id.media})
    public void onClick(View view) {
        switch (view.getId()) {
            case R.id.simple:
                NotifyUtil.buildSimple(100,R.drawable.timg,"标题标题标题图表题滴滴滴","哈哈哈哈哈哈哈呼呼呼呼呼呼",null)
                        .setHeadup()
                        .addBtn(R.mipmap.ic_launcher,"left", NotifyUtil.buildIntent(MainActivity.class))
                        .addBtn(R.mipmap.ic_launcher,"rightdd", NotifyUtil.buildIntent(MainActivity.class))
                        .show();

                break;
            case R.id.pic:
                NotifyUtil.buildBigPic(101,R.drawable.timg,"title","content","summmaujds")
                        .setPicRes(R.drawable.timg2)
                        .show();
                break;
            case R.id.progress:
                showProgress();
               // NotifyUtil.buildProgress(102,R.mipmap.ic_launcher,"正在下载",5,100,false).show();
                break;
            case R.id.bigtext:
                NotifyUtil.buildBigText(103,R.drawable.timg,"jtitle","我学习最快的方法就是先看效果，" +
                        "再想原理最后，将它实现。效果是最直观的，而且能够有效的判断所学的东西是不是想要的。" +
                        "现在网上的资料实在太杂，很多花了很多时间去研究，最后发现坑爹了，不是想要的。" +
                        "这篇文章首先会介绍能实现的主要功能。然后是解决问题的基本思想，接着是具体的一些实现。" +
                        "本篇文章和以前的风格有所不同，以前都是文章中代码比较少，附上demo,但发现这样可能不方便读者，" +
                        "所以采用了实现效果以及主要代码的形式。这种方式现在还在测试阶段，如果觉得以前的模式比较" +
                        "好或者其他更好的方式的话可以給我留言，以后的文章会做出相应的调整 。").show();

                break;
            case R.id.mailbox:
                NotifyUtil.buildMailBox(104,R.drawable.timg,"title")
                        .addMsg("11111111111")
                        .addMsg("33333333333333")
                        .addMsg("6666666666666666666")
                        .show();
                break;
            case R.id.media://todo failed
                NotifyUtil.buildMedia(105,R.drawable.timg,"title","content")
                        .addBtn(R.mipmap.ic_launcher,"left", NotifyUtil.buildIntent(MainActivity.class))
                        .addBtn(R.mipmap.ic_launcher,"center", NotifyUtil.buildIntent(MainActivity.class))
                        .addBtn(R.mipmap.ic_launcher,"right", NotifyUtil.buildIntent(MainActivity.class))
                        .show();
        }
    }
    int progresses =0;

    private void showProgress() {
        new Handler().postDelayed(new Runnable() {
            @Override
            public void run() {
                if(progresses >=100){
                    return;
                }
                progresses = progresses +10;

                NotifyUtil.buildProgress(102,R.mipmap.ic_launcher,"正在下载",progresses,100,"下载进度:%dkb/%dkb").show();//"下载进度:%d%%"
                showProgress();

            }
        },500);

    }
}
```

[/ui-tab] [ui-tab title="activity_main.xml"] This is the layout for our main activity.

```xml
<?xml version="1.0" encoding="utf-8"?>
<LinearLayout xmlns:android="http://schemas.android.com/apk/res/android"
    xmlns:tools="http://schemas.android.com/tools"
    android:id="@+id/activity_main"
    android:layout_width="match_parent"
    android:layout_height="match_parent"
    android:paddingBottom="@dimen/activity_vertical_margin"
    android:paddingLeft="@dimen/activity_horizontal_margin"
    android:paddingRight="@dimen/activity_horizontal_margin"
    android:paddingTop="@dimen/activity_vertical_margin"
    android:orientation="vertical"
    tools:context="com.hss01248.notifyutildemo.MainActivity">

    <Button
        android:text="simple"
        android:layout_width="match_parent"
        android:layout_height="wrap_content"
        android:id="@+id/simple" />

    <Button
        android:text="pic"
        android:layout_width="match_parent"
        android:layout_height="wrap_content"
        android:id="@+id/pic" />

    <Button
        android:text="progress"
        android:layout_width="match_parent"
        android:layout_height="wrap_content"
        android:id="@+id/progress" />

    <Button
        android:text="multi text"
        android:layout_width="match_parent"
        android:layout_height="wrap_content"
        android:id="@+id/bigtext" />

    <Button
        android:text="mailbox"
        android:layout_width="match_parent"
        android:layout_height="wrap_content"
        android:id="@+id/mailbox" />

    <Button
        android:text="media"
        android:layout_width="match_parent"
        android:layout_height="wrap_content"
        android:id="@+id/media" />
</LinearLayout>
```

[/ui-tab] [ui-tab title="Download"]

| No. | Location | Link |
| --- | --- | --- |
| 1. | GitHub | [Download](https://github.com/hss01248/NotifyUtil/tree/master/sample/archive/master.zip) |
| 2. | GitHub | [Browse](https://github.com/hss01248/NotifyUtil) |
| 2. | GitHub | [Original Creator: @hss01248](https://github.com/hss01248) |
