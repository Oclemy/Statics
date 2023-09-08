# How to render and use a CameraVideoButton in your Android app

Let's say you are creating some kind of a selfie app, you may be interested in launching your camera using a much more modern way. This tutorial presents to you the solutions which you can use to launch the camera.

[lwtoc]

## (a). Use CameraVideoButton

> Instagram like animated button for taking photo or recording video.

![](https://raw.githubusercontent.com/iammert/CameraVideoButton/master/art/art.png)

> This is just a dummy view. All recording or taking picture operation is up to you.

### Step 1: Install it

The first step is to install the camera video button. Register jitpack in your project-level build.gradle as follows:

```groovy
allprojects {
    repositories {
        ...
        maven { url 'https://jitpack.io' }
    }
}
```

Then under the dependencies closure in your app level build.gradle add the implementation statement:

```groovy
 implementation 'com.github.iammert:CameraVideoButton:0.2'
```

### Step 2: Add to Layout

The next step is to add the camera video button to your xml layout:

```xml
<com.iammert.library.cameravideobuttonlib.CameraVideoButton
    android:id="@+id/videoRecordButton"
    android:layout_width="120dp"
    android:layout_height="120dp"
    app:cvb_recording_color="#D438A2"/>
```

### Step 3: Write Code

First reference the CameraVideoButton whether it is by findViewById, data binding, kotlin synthetics or view binding.

Then you can customize its properties:

```kotlin
videoRecordButton.setVideoDuration(10000)
videoRecordButton.enableVideoRecording(true)
videoRecordButton.enablePhotoTaking(true)
```

Then you can now observer different events:

```kotlin
videoRecordButton.actionListener = object : CameraVideoButton.ActionListener{
    override fun onStartRecord() {
        Log.v("TEST", "Start recording video")
    }

    override fun onEndRecord() {
        Log.v("TEST", "Stop recording video")
    }

    override fun onDurationTooShortError() {
        Log.v("TEST", "Toast or notify user")
    }

    override fun onSingleTap() {
        Log.v("TEST", "Take photo here")
    }
}
```

### Example

Let's look at a simple example using the CameraVideoButton.

1. First imstall the library as discussed earlier.
    
2. Then add the camera videobutton to the xml layout:
    

**activity_main.xml**

```xml
<?xml version="1.0" encoding="utf-8"?>
<RelativeLayout xmlns:android="http://schemas.android.com/apk/res/android"
    xmlns:app="http://schemas.android.com/apk/res-auto"
    xmlns:tools="http://schemas.android.com/tools"
    android:layout_width="match_parent"
    android:layout_height="match_parent"
    tools:context=".MainActivity"
    android:background="#232323">

    <com.iammert.library.cameravideobuttonlib.CameraVideoButton
        android:id="@+id/button"
        android:layout_width="120dp"
        android:layout_height="120dp"
        android:layout_centerInParent="true"
        android:layout_marginBottom="16dp"
        android:layout_alignParentBottom="true"
        app:cvb_recording_color="#D438A2"/>

</RelativeLayout>
```

3.Lastly write your kotlin code:

**MainActivity.kt**

```kotlin
package com.iammert.library.cameravideobutton

import android.support.v7.app.AppCompatActivity
import android.os.Bundle
import android.os.Handler
import android.util.Log
import com.iammert.library.cameravideobuttonlib.CameraVideoButton

class MainActivity : AppCompatActivity() {

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_main)

        val videoRecordButton = findViewById<CameraVideoButton>(R.id.button)
        videoRecordButton.setVideoDuration(10000)
        videoRecordButton.actionListener = object : CameraVideoButton.ActionListener {
            override fun onCancelled() {
                Log.v("TEST", "onCancelled")
            }

            override fun onStartRecord() {
                Log.v("TEST", "onStartRecord")
            }

            override fun onEndRecord() {
                Log.v("TEST", "onEndRecord")
            }

            override fun onDurationTooShortError() {
                Log.v("TEST", "onDurationTooShortError")
            }

            override fun onSingleTap() {
                Log.v("TEST", "onSingleTap")
            }

        }

        Handler().postDelayed(Runnable {
            videoRecordButton.cancelRecording()
        }, 5000)
    }
}
```

That's it. You can find the code [here](https://github.com/iammert/CameraVideoButton/tree/master/app).

### Reference

Find reference [here](https://github.com/iammert/CameraVideoButton).
