# Android Exoplayer Example

This tutorial will explore simple step by step Exoplayer Examples. It will teach you how to use it to play audio and video. We do this via simple isolated examples created for beginners.


### What is Exoplayer?

> ExoPlayer is an application level media player for Android.

It provides an alternative to Android’s MediaPlayer API for playing audio and video both locally and over the Internet. ExoPlayer supports features not currently supported by Android’s MediaPlayer API, including DASH and SmoothStreaming adaptive playbacks. Unlike the MediaPlayer API, ExoPlayer is easy to customize and extend, and can be updated through Play Store application updates.

#### Exoplayer Installation

**Step 1: Add it as a Dependency**

To install Exoplayer declare it as a dependency in your `app/build.gradle`:

```groovy
implementation 'com.google.android.exoplayer:exoplayer:2.X.X'
```

**Step 2: Enable Java8**

Then enable Java8 if it's not already enabled. You do this in the same `app/build.gradle` under the `android{}` closure:

```groovy
compileOptions {
  targetCompatibility JavaVersion.VERSION_1_8
}
```

**Step 3: Enable multidex**

If your Gradle `minSdkVersion` is 20 or lower, you should [enable multidex](https://developer.android.com/studio/build/multidex) in order to prevent build errors.

Let's now look at some examples.

## Example 1: Simple Exoplayer Example

A simple Exoplayer Example project.

### Step 1: Create Project

Start by creating an empty `Android Studio` project.

### Step 2: Dependencies

Add Exoplayer as a dependency in your `app/build.gradle`:

```groovy
    implementation 'com.google.android.exoplayer:exoplayer:2.8.4'
```

If Java8 is not enabled please enable it.

Sync.

### Step 3: Design Layout

Design a layout to represent the media player component, with buttons for starting, stopping etc as shown below:

**activity_main.xml**

```xml
<?xml version="1.0" encoding="utf-8"?>
<androidx.constraintlayout.widget.ConstraintLayout xmlns:android="http://schemas.android.com/apk/res/android"
    xmlns:app="http://schemas.android.com/apk/res-auto"
    xmlns:tools="http://schemas.android.com/tools"
    android:layout_width="match_parent"
    android:layout_height="match_parent"
    tools:context=".MainActivity">

    <LinearLayout
        android:id="@+id/player"
        android:layout_width="match_parent"
        android:layout_height="wrap_content"

        android:layout_alignParentBottom="true"
        android:background="@color/colorPrimaryDark"
        android:orientation="vertical"
        app:layout_constraintBottom_toBottomOf="parent"
        app:layout_constraintEnd_toEndOf="parent"
        app:layout_constraintStart_toStartOf="parent">

        <TextView
            android:id="@+id/tv_audioname"
            android:layout_width="match_parent"
            android:layout_height="wrap_content"
            android:textSize="20sp"
            android:visibility="gone"
            android:gravity="center"
            android:textColor="@android:color/black"/>

        <LinearLayout
            android:layout_width="match_parent"
            android:layout_height="40dp"
            android:orientation="horizontal">

            <!-- <ImageButton-->
            <!-- android:id="@+id/amount"-->
            <!-- android:layout_width="wrap_content"-->
            <!-- android:layout_height="match_parent"-->
            <!-- android:layout_weight="1"-->
            <!-- android:background="@android:color/transparent"-->
            <!-- android:text="Button" />-->

            <TextView
                android:id="@+id/timee"
                android:layout_width="wrap_content"
                android:layout_height="match_parent"
                android:padding="10dp"
                android:text="0:00" />

            <!-- rewind-->
            <ImageButton
                android:id="@+id/btn_prev"
                android:layout_width="wrap_content"
                android:layout_height="match_parent"
                android:layout_weight="1"
                android:background="@android:color/transparent"
                app:srcCompat="@drawable/ic_fast_rewind_black_24dp" />

            <!-- play/pause-->

            <Button
                android:id="@+id/btn_pauseee"
                android:layout_width="wrap_content"
                android:layout_height="match_parent"
                android:layout_weight="1"
                android:background="@android:color/transparent"
                android:text="Play" />

            <!-- fast forward-->
            <ImageButton
                android:id="@+id/btn_ffwddd"
                android:layout_width="wrap_content"
                android:layout_height="match_parent"
                android:layout_weight="1"
                android:background="@android:color/transparent"
                app:srcCompat="@drawable/ic_fast_forward_black_24dp" />

            <!-- <ImageButton-->
            <!-- android:id="@+id/button"-->
            <!-- android:layout_width="wrap_content"-->
            <!-- android:layout_height="match_parent"-->
            <!-- android:layout_weight="1"-->
            <!-- android:background="@android:color/transparent" />-->

            <TextView
                android:id="@+id/durationnn"
                android:layout_width="wrap_content"
                android:layout_height="match_parent"
                android:padding="10dp"
                android:text="0:00" />

        </LinearLayout>

        <SeekBar
            android:id="@+id/seekBar"
            android:layout_width="match_parent"
            android:layout_height="20dp"
            android:layout_marginBottom="10dp"
            android:visibility="visible"/>
    </LinearLayout>

</androidx.constraintlayout.widget.ConstraintLayout>
```

### Step 4: Write Code

Below is the code:

**MainActivity.java**

```java
package com.sarthak.exoplayerdemo;

import androidx.appcompat.app.AppCompatActivity;

import android.net.Uri;
import android.os.Bundle;
import android.os.Handler;
import android.view.View;
import android.widget.Button;
import android.widget.ImageButton;
import android.widget.SeekBar;
import android.widget.TextView;

import com.google.android.exoplayer2.DefaultRenderersFactory;
import com.google.android.exoplayer2.ExoPlayerFactory;
import com.google.android.exoplayer2.SimpleExoPlayer;
import com.google.android.exoplayer2.extractor.DefaultExtractorsFactory;
import com.google.android.exoplayer2.source.ExtractorMediaSource;
import com.google.android.exoplayer2.trackselection.DefaultTrackSelector;
import com.google.android.exoplayer2.trackselection.TrackSelector;
import com.google.android.exoplayer2.upstream.DefaultDataSourceFactory;
import com.google.android.exoplayer2.util.Util;

public class MainActivity extends AppCompatActivity {

    SimpleExoPlayer simpleExoPlayer;
    Boolean isPlaying;
    SeekBar seekBar;
    TextView time,duration;
    Handler handler;
    Runnable runnable;
    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);
        isPlaying = false;

        seekBar = findViewById(R.id.seekBar);
        time = findViewById(R.id.timee);
        duration = findViewById(R.id.durationnn);
        setupPlayer();
        final Button button = findViewById(R.id.btn_pauseee);
        ImageButton button1 = findViewById(R.id.btn_ffwddd);
        ImageButton button2 = findViewById(R.id.btn_prev);

        handler = new Handler();

        button1.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                simpleExoPlayer.seekTo(simpleExoPlayer.getCurrentPosition() + 5000);
                seekBar.setProgress(Integer.parseInt(String.valueOf(simpleExoPlayer.getCurrentPosition() + 5000)));
                seekBar.setMax(Integer.parseInt(String.valueOf(simpleExoPlayer.getDuration())));
                changeSeekBar();
                setTime();
            }
        });

        button2.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                simpleExoPlayer.seekTo(simpleExoPlayer.getCurrentPosition() - 5000);
                seekBar.setProgress(Integer.parseInt(String.valueOf(simpleExoPlayer.getCurrentPosition() - 5000)));
                seekBar.setMax(Integer.parseInt(String.valueOf(simpleExoPlayer.getDuration())));
                changeSeekBar();
                setTime();
            }
        });

        button.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                seekBar.setMax(Integer.parseInt(String.valueOf(simpleExoPlayer.getDuration())));
                changeSeekBar();
                setTime();
                if(!isPlaying){

                    simpleExoPlayer.setPlayWhenReady(true);
                    isPlaying = true;
                    button.setText("Pause");
                    seekBar.setProgress(Integer.parseInt(String.valueOf(simpleExoPlayer.getCurrentPosition())));

                }
                else if(isPlaying){
                    simpleExoPlayer.setPlayWhenReady(false);
                    //simpleExoPlayer.release();
                    button.setText("Play");
                    isPlaying = false;
                    seekBar.setProgress(Integer.parseInt(String.valueOf(simpleExoPlayer.getCurrentPosition())));

                }
            }
        });

        seekBar.setOnSeekBarChangeListener(new SeekBar.OnSeekBarChangeListener() {
            @Override
            public void onProgressChanged(SeekBar seekBar, int progress, boolean fromUser) {
                if(fromUser){
                    simpleExoPlayer.seekTo(progress);
                    setTime();
                }
            }

            @Override
            public void onStartTrackingTouch(SeekBar seekBar) {

            }

            @Override
            public void onStopTrackingTouch(SeekBar seekBar) {

            }
        });

    }

    private void setupPlayer(){

        DefaultRenderersFactory renderersFactory = new DefaultRenderersFactory(this,null,DefaultRenderersFactory.EXTENSION_RENDERER_MODE_OFF);

        //BandwidthMeter bandwidthMeter = new DefaultBandwidthMeter(); //Global

        TrackSelector trackSelector = new DefaultTrackSelector();//(new AdaptiveTrackSelection.Factory(renderersFactory));//global

        simpleExoPlayer = ExoPlayerFactory.newSimpleInstance(renderersFactory,trackSelector); //Global

        //final DefaultHttpDataSourceFactory httpDataSourceFactory = new DefaultHttpDataSourceFactory("exoplayer_audio");//Global
        //final ExtractorsFactory extractorsFactory = new DefaultExtractorsFactory();//Global
        //MediaSource mediaSource = new ExtractorMediaSource(uri, httpDataSourceFactory, extractorsFactory, null, null);//Local

        Uri uri = Uri.parse("http://awscdn.podcasts.com/Max-Weber-Authority-Power-Theory-dc90.mp3");
        String userAgent = Util.getUserAgent(this,"Sunokitaab");
        ExtractorMediaSource mediaSource =new ExtractorMediaSource(uri,
                new DefaultDataSourceFactory(this,userAgent),
                new DefaultExtractorsFactory(),
                null,
                null);

        simpleExoPlayer.prepare(mediaSource);//Local
        //simpleExoPlayer.setPlayWhenReady(true);//Local
        //setTime();
    }

    @Override
    protected void onDestroy() {
        simpleExoPlayer.release();
        super.onDestroy();
    }

    @Override
    protected void onPause() {
       // simpleExoPlayer.setPlayWhenReady(false);
        simpleExoPlayer.release();
        super.onPause();
    }
    private void setTime() {

        if(simpleExoPlayer!=null) {

            long songCurrentTime = simpleExoPlayer.getCurrentPosition();
            long songTotalTime = simpleExoPlayer.getDuration();

            long secondT = (songCurrentTime / 1000) % 60;
            long minuteT = (songCurrentTime / (1000 * 60)) % 60;

            long secondD = (songTotalTime / 1000) % 60;
            long minuteD = (songTotalTime / (1000 * 60)) % 60;

            String timerD = String.format("%02d:%02d", minuteD, secondD);
            String timerT = String.format("%02d:%02d", minuteT, secondT);

            time.setText("" + String.valueOf(timerT));
            duration.setText("" + String.valueOf(timerD));
        }

    }

    private void changeSeekBar() {

        if(simpleExoPlayer!=null){
            seekBar.setProgress(Integer.parseInt(String.valueOf(simpleExoPlayer.getCurrentPosition())));
            runnable = new Runnable() {
                @Override
                public void run() {
                    changeSeekBar();
                    setTime();
                }
            };
            handler.postDelayed(runnable,1000);
        }
    }
}
```

### Run

Copy the code or download it in the link below, build and run.

### Reference

Here are the reference links:

| Number | Link |
| --- | --- |
| 1. | [Download](https://github.com/Sarthak2601/ExoPlayerDemo/archive/refs/heads/master.zip) Example |
| 2. | [Follow](https://github.com/Sarthak2601/) code author |
