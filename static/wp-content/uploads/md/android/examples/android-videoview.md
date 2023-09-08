# VideoView Example

In this tutorial we will learn about VideoView. How to use it to stream a video.


### What is a VideoView?

> VideoView is a widget that displays a video file.

The VideoView class can load images from various sources (such as resources or content providers), takes care of computing its measurement from the video so that it can be used in any layout manager, and provides various display options such as scaling and tinting.

You can find VideoView API reference [here](https://developer.android.com/reference/android/widget/VideoView).

Otherwise let's look at sime examples.

## Example 1: Kotlin Android - Stream Video using VideoView

This is a Kotlin ANdroid example on how to stream a video from online using VideoView.

Here is the demo screenshot of the project:

![](https://github.com/Talentica/AndroidWithKotlin/raw/master/gifs/videostreaming.gif)

### Step 1: Create Project

Start by creating an empty `Android Studio` project.

### Step 2: Dependencies

No third party dependency is needed for this project.

### Step 3: Design Layout

Add a VideoView, two ImageViews, a SeekBar as well as a TextView in your MainActivity's layout as follows:

**activity_main.xml**

```xml
<?xml version="1.0" encoding="utf-8"?>
<RelativeLayout xmlns:android="http://schemas.android.com/apk/res/android"
    xmlns:tools="http://schemas.android.com/tools"
    android:layout_width="match_parent"
    android:layout_height="match_parent"
    android:paddingBottom="@dimen/activity_vertical_margin"
    android:paddingLeft="@dimen/activity_horizontal_margin"
    android:paddingRight="@dimen/activity_horizontal_margin"
    android:paddingTop="@dimen/activity_vertical_margin">

    <VideoView
        android:id="@+id/videoView"
        android:layout_width="match_parent"
        android:layout_height="wrap_content"
        android:layout_alignParentLeft="true"
        android:layout_alignParentStart="true"
        android:layout_alignParentTop="true" />

    <ImageView
        android:id="@+id/playPauseButton"
        android:layout_width="40dp"
        android:layout_height="40dp"
        android:layout_alignParentLeft="true"
        android:layout_alignParentStart="true"
        android:layout_below="@+id/videoView"
        android:layout_marginTop="5dp"
        android:src="@mipmap/play_button" />

    <ImageView
        android:id="@+id/stopButton"
        android:layout_width="40dp"
        android:layout_height="40dp"
        android:layout_below="@+id/videoView"
        android:layout_marginLeft="2dp"
        android:layout_marginTop="5dp"
        android:layout_toRightOf="@id/playPauseButton"
        android:src="@mipmap/stop_button" />

    <TextView
        android:id="@+id/runningTime"
        android:layout_width="wrap_content"
        android:layout_height="wrap_content"
        android:layout_below="@+id/videoView"
        android:layout_marginLeft="5dp"
        android:layout_marginTop="15dp"
        android:layout_toRightOf="@id/stopButton"
        android:text="00:00"
        android:textColor="@android:color/black"
        android:textSize="16dp" />

    <SeekBar
        android:id="@+id/seekBar"
        android:layout_width="match_parent"
        android:layout_height="wrap_content"
        android:layout_below="@+id/videoView"
        android:layout_marginTop="10dp"
        android:layout_toRightOf="@id/runningTime" />

</RelativeLayout>
```

### Step 4: Write Code

Replace your `MainActivity` with the following code:

**MainActivity.kt**

```kotlin
import android.app.ProgressDialog
import android.media.MediaPlayer
import android.net.Uri
import android.os.Bundle
import androidx.appcompat.app.AppCompatActivity
import android.util.Log
import android.view.View
import android.widget.*
import kotlin.concurrent.fixedRateTimer

//Always device to run this App
class MainActivity : AppCompatActivity(), MediaPlayer.OnCompletionListener,
        MediaPlayer.OnErrorListener, MediaPlayer.OnPreparedListener, SeekBar.OnSeekBarChangeListener,
        View.OnClickListener {

    private val HLS_STREAMING_SAMPLE = "rtsp://wowzaec2demo.streamlock.net/vod/mp4:BigBuckBunny_115k.mov"
    private var sampleVideoView: VideoView? = null
    private var seekBar: SeekBar? = null
    private var playPauseButton: ImageView? = null
    private var stopButton: ImageView? = null
    private var runningTime: TextView? = null
    private var currentPosition: Int = 0
    private var isRunning = false

    //Always device to run this App
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_main)

        sampleVideoView = findViewById<VideoView>(R.id.videoView)
        sampleVideoView?.setVideoURI(Uri.parse(HLS_STREAMING_SAMPLE))

        playPauseButton = findViewById<ImageView>(R.id.playPauseButton)
        playPauseButton?.setOnClickListener(this)

        stopButton = findViewById<ImageView>(R.id.stopButton)
        stopButton?.setOnClickListener(this)

        seekBar = findViewById<SeekBar>(R.id.seekBar)
        seekBar?.setOnSeekBarChangeListener(this)

        runningTime = findViewById<TextView>(R.id.runningTime)
        runningTime?.setText("00:00")

        Toast.makeText(this, "Buffering...Please wait", Toast.LENGTH_LONG).show()

        //Add the listeners
        sampleVideoView?.setOnCompletionListener(this)
        sampleVideoView?.setOnErrorListener(this)
        sampleVideoView?.setOnPreparedListener(this)
    }

    override fun onCompletion(mp: MediaPlayer?) {
        Toast.makeText(baseContext, "Play finished", Toast.LENGTH_LONG).show()
    }

    override fun onError(mp: MediaPlayer?, what: Int, extra: Int): Boolean {
        Log.e("video", "setOnErrorListener ")
        return true
    }

    override fun onPrepared(mp: MediaPlayer?) {
        seekBar?.setMax(sampleVideoView?.getDuration()!!)
        sampleVideoView?.start()

        val fixedRateTimer = fixedRateTimer(name = "hello-timer",
                initialDelay = 0, period = 1000) {
            refreshSeek()
        }

        playPauseButton?.setImageResource(R.mipmap.pause_button)
    }

    fun refreshSeek() {
        seekBar?.setProgress(sampleVideoView?.getCurrentPosition()!!);

        if (sampleVideoView?.isPlaying()!! == false) {
            return
        }

        var time = sampleVideoView?.getCurrentPosition()!! / 1000;
        var minute = time / 60;
        var second = time % 60;

        runOnUiThread {
            runningTime?.setText(minute.toString() + ":" + second.toString());
        }
    }

    var refreshTime = Runnable() {
        fun run() {

        }
    };

    override fun onProgressChanged(seekBar: SeekBar?, progress: Int, fromUser: Boolean) {
        //do nothing
    }

    override fun onStartTrackingTouch(seekBar: SeekBar?) {
        //do nothing
    }

    override fun onStopTrackingTouch(seekBar: SeekBar?) {
        sampleVideoView?.seekTo(seekBar?.getProgress()!!)
    }

    override fun onClick(v: View?) {
        if (v?.getId() == R.id.playPauseButton) {
            //Play video
            if (!isRunning) {
                isRunning = true
                sampleVideoView?.resume()
                sampleVideoView?.seekTo(currentPosition)
                playPauseButton?.setImageResource(R.mipmap.pause_button)
            } else { //Pause video
                isRunning = false
                sampleVideoView?.pause()
                currentPosition = sampleVideoView?.getCurrentPosition()!!
                playPauseButton?.setImageResource(R.mipmap.play_button)
            }
        } else if (v?.getId() == R.id.stopButton) {
            playPauseButton?.setImageResource(R.mipmap.play_button)
            sampleVideoView?.stopPlayback()
            currentPosition = 0
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
| 1. | [Download](https://downgit.github.io/#/home?url=https://github.com/Talentica/AndroidWithKotlin/tree/master/videostreaming) Example |
| 2. | [Follow](https://github.com/Talentica/) code author |

## Example 2: Kotlin Android VideoView - Play Local mp4 video

Learn VideoView using this simple example written in Kotlin. Learn how to play video files such as mp4 easily without much code. You need a VideoView widget for that and this example shows you how to use it to play mp4 file.

This example will show you how to load and play a video file located in our `raw` folder or directory.

### Step 1: Create Project

Start by creating an empty `Android Studio` project.

### Step 2: Dependencies

No external dependencies are needed for this.

### Step 3: Add Video File

Add an mp4 file to your `raw` directory under the `res` folder. If you do not have such a directory then create it.

You can download a sample video file [here](https://github.com/Kiran-Bahalaskar/Play-Video-Using-Kotlin/blob/master/app/src/main/res/raw/video.mp4)

### Step 4: Design Layout

Simply add `VideoView` to your xml layout as follows:

**activity_main.xml**

```xml
<?xml version="1.0" encoding="utf-8"?>
<LinearLayout xmlns:android="http://schemas.android.com/apk/res/android"
    xmlns:app="http://schemas.android.com/apk/res-auto"
    xmlns:tools="http://schemas.android.com/tools"
    android:layout_width="match_parent"
    android:layout_height="match_parent"
    android:gravity="center"
    tools:context=".MainActivity">

    <VideoView
        android:id="@+id/videoView"
        android:layout_width="match_parent"
        android:layout_height="200dp"
        android:layout_marginEnd="20dp"
        android:layout_marginStart="20dp"/>

</LinearLayout>
```

### Step 5: Play Video

First reference the video file path as follows:

```kotlin
        val filePlace = "android.resource://"+ packageName + "/raw/" + R.raw.video
```

Then set the path to the videoview using the `setVideoUri()` function as follows:

```kotlin
        videoView.setVideoURI(Uri.parse(filePlace))
```

Then set the MediaController then play the video using the `start()` function:

```kotlin

        videoView.setMediaController(MediaController(this))
        videoView.start()
```

Here's the full code:

**MainActivity.kt**

```kotlin
import android.net.Uri
import androidx.appcompat.app.AppCompatActivity
import android.os.Bundle
import android.widget.MediaController
import android.widget.VideoView

class MainActivity : AppCompatActivity() {

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_main)

        val fileName = "video"
        val filePlace = "android.resource://"+ packageName + "/raw/" + R.raw.video
        val videoView = findViewById<VideoView>(R.id.videoView)
        videoView.setVideoURI(Uri.parse(filePlace))

        videoView.setMediaController(MediaController(this))
        videoView.start()
    }
}
```

### Run

Copy the code or download it in the link below, build and run.

### Reference

Here are the reference links:

| Number | Link |
| --- | --- |
| 1. | [Download](https://github.com/Kiran-Bahalaskar/Play-Video-Using-Kotlin/archive/refs/heads/master.zip) Example |
| 2. | [Follow](https://github.com/Kiran-Bahalaskar/) code author |
| 3. | Code: [Apache 2.0 License](http://www.apache.org/licenses/LICENSE-2.0.txt) |

## More Examples

Here are more VideoView examples:

[loop type=example taxonomy=post_tag term=videoview orderby=date order=asc]

## [loop-count]. [field title]

[content]

[Read Individually.]([field url])

* * *

[/loop]
