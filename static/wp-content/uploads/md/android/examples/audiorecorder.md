# Audio Recording example


> Learn how to create a simple audio recorder in this example.

Multi-Media consumption is part and parcel of our modern day life. Be it video or audio, in this generation of ours, content is available in our fingertips. In fact you do not need to even download such content, you can record it yourself.

That's why in this tutorial we will explore examples that let us learn how to create an audio recorder app in android.


## Example 1: Record and Play Audio

This is a simple example written in Java that will allow you record audio in android then play the recorded audio.

### Step 1: Create Project

Start by creating an empty `Android Studio` project.

### Step 2: Dependencies

No third party dependencies are needed:

```groovy
    implementation "androidx.appcompat:appcompat:$appCompat"
    implementation "com.google.android.material:material:$supportLibVer"
```

### Step 3: Add Necessary Permissions

Because we are recording and saving audio in our device we need two permissions: `WRITE_EXTERNAL_STORAGE` and `RECORD_AUDIO`. Add them in your `app/src/main/AndroidManifest.xml`:

```xml
    <uses-permission android:name="android.permission.WRITE_EXTERNAL_STORAGE"/>
    <uses-permission android:name="android.permission.RECORD_AUDIO"/>
```

### Step 4: Design Layout

Create your `activity_main.xml` layout as follows: Add two floating action buttons: one for recording the audio and the other for playing.

```xml
<?xml version="1.0" encoding="utf-8"?>
<androidx.coordinatorlayout.widget.CoordinatorLayout
    xmlns:android="http://schemas.android.com/apk/res/android"
    xmlns:app="http://schemas.android.com/apk/res-auto"
    xmlns:tools="http://schemas.android.com/tools"
    android:layout_width="match_parent"
    android:layout_height="match_parent"
    android:fitsSystemWindows="true"
    tools:context="github.nisrulz.audiorecording.MainActivity">

    <com.google.android.material.appbar.AppBarLayout
        android:layout_width="match_parent"
        android:layout_height="wrap_content"
        android:theme="@style/AppTheme.AppBarOverlay">

        <androidx.appcompat.widget.Toolbar
            android:id="@+id/toolbar"
            android:layout_width="match_parent"
            android:layout_height="?attr/actionBarSize"
            android:background="?attr/colorPrimary"
            app:popupTheme="@style/AppTheme.PopupOverlay"/>

    </com.google.android.material.appbar.AppBarLayout>

    <include layout="@layout/content_main"/>

    <com.google.android.material.floatingactionbutton.FloatingActionButton
        android:id="@+id/fab_play"
        android:layout_width="wrap_content"
        android:layout_height="wrap_content"
        android:layout_gravity="bottom|end"
        android:layout_marginBottom="80dp"
        android:layout_marginRight="24dp"
        android:src="@drawable/ic_play"
        app:fabSize="mini"/>

    <com.google.android.material.floatingactionbutton.FloatingActionButton
        android:id="@+id/fab_rec"
        android:layout_width="wrap_content"
        android:layout_height="wrap_content"
        android:layout_gravity="bottom|end"
        android:layout_margin="16dp"
        android:src="@drawable/ic_mic"/>
</androidx.coordinatorlayout.widget.CoordinatorLayout>
```

### Step 4: Record Audio

We start by writing code that will allow us record audio. Create a file known as `RecordAudio.java` and import `android.media.MediaRecorder`:

```java
import android.media.MediaRecorder;
import android.util.Log;
import java.io.IOException;
```

Create the class:

```java
public class RecordAudio {
```

Define some properties as follows:

```java
    private final String LOGTAG = getClass().getSimpleName().toString();
    MediaRecorder mRecorder = null;
    private boolean isRecording = false;
```

Here is the function to release resources occupied by the MediaRecorder:

```java
    void releaseMediaRecorder() {
        if (mRecorder != null) {
            mRecorder.release();
            mRecorder = null;
            Log.i(LOGTAG, "Recorder Released");
        }
        isRecording = false;
    }
```

Here is the function that will allow us start recording:

```java
    void startRecording(String mFileName) {
        if (!isRecording) {
            mRecorder = new MediaRecorder();
            mRecorder.setAudioSource(MediaRecorder.AudioSource.MIC);
            mRecorder.setOutputFormat(MediaRecorder.OutputFormat.THREE_GPP);
            mRecorder.setOutputFile(mFileName);
            mRecorder.setAudioEncoder(MediaRecorder.AudioEncoder.AMR_NB);

            try {
                mRecorder.prepare();
            } catch (IOException e) {
                Log.e(LOGTAG, "prepare() failed");
            }

            mRecorder.start();
            Log.i(LOGTAG, "Recording Started");
            isRecording = true;
        }
    }
```

And here is the function that will allow us stop recording:

```java
    void stopRecording() {
        try {
            if (mRecorder != null) {
                mRecorder.stop();
                Log.i(LOGTAG, "Recording Stopped");
            }
        } catch (Exception e) {
            e.printStackTrace();
        } finally {
            if (mRecorder != null)
                mRecorder.reset();
            releaseMediaRecorder();
        }
    }
```

This function will check if we are currently recording or not:

```java
    boolean isRecording() {
        return isRecording;
    }
}
```

Here is the full code:

**RecordAudio.java**

```java
import android.media.MediaRecorder;
import android.util.Log;

import java.io.IOException;

public class RecordAudio {
    private final String LOGTAG = getClass().getSimpleName().toString();
    MediaRecorder mRecorder = null;
    private boolean isRecording = false;

    void releaseMediaRecorder() {
        if (mRecorder != null) {
            mRecorder.release();
            mRecorder = null;
            Log.i(LOGTAG, "Recorder Released");
        }
        isRecording = false;
    }

    void startRecording(String mFileName) {
        if (!isRecording) {
            mRecorder = new MediaRecorder();
            mRecorder.setAudioSource(MediaRecorder.AudioSource.MIC);
            mRecorder.setOutputFormat(MediaRecorder.OutputFormat.THREE_GPP);
            mRecorder.setOutputFile(mFileName);
            mRecorder.setAudioEncoder(MediaRecorder.AudioEncoder.AMR_NB);

            try {
                mRecorder.prepare();
            } catch (IOException e) {
                Log.e(LOGTAG, "prepare() failed");
            }

            mRecorder.start();
            Log.i(LOGTAG, "Recording Started");
            isRecording = true;
        }
    }

    void stopRecording() {
        try {
            if (mRecorder != null) {
                mRecorder.stop();
                Log.i(LOGTAG, "Recording Stopped");
            }
        } catch (Exception e) {
            e.printStackTrace();
        } finally {
            if (mRecorder != null)
                mRecorder.reset();
            releaseMediaRecorder();
        }
    }

    boolean isRecording() {
        return isRecording;
    }
}
```

### Step 5: Play Audio

Let us now write code to help us play the recorded audio. Create the `PlayAudio.java` file and add `android.media.MediaPlayer` as one of the imports. To play audio we use the `MediaPlayer` class:

```java
import android.media.MediaPlayer;
import android.util.Log;
import java.io.IOException;
```

Now create teh class:

```java
public class PlayAudio {
```

MediaPlayer will be one of the fields in this class:

```java
    private final String LOGTAG = getClass().getSimpleName().toString();
    private boolean isPlaying = false;
    MediaPlayer mPlayer = null;
```

Here is how you release the MediaPlayer:

```java
    void releaseMedidaPalyer() {
        if (mPlayer != null) {
            mPlayer.release();
            mPlayer = null;
            Log.i(LOGTAG, "Audio Player Released");
        }
    }
```

Here is how you play the audio using the MeidaPlayer provided we are passed the file name:

```java
    void startPlaying(String mFileName) {
        if (!isPlaying) {
            mPlayer = new MediaPlayer();
            mPlayer.setOnCompletionListener(new MediaPlayer.OnCompletionListener() {
                @Override
                public void onCompletion(MediaPlayer mediaPlayer) {
                    stopPlaying();
                    isPlaying = false;

                }
            });
            try {
                mPlayer.setDataSource(mFileName);
                mPlayer.prepare();
                if (!mPlayer.isPlaying())
                    mPlayer.start();
                Log.i(LOGTAG, "Audio Player Started");
            } catch (IOException e) {
                Log.e(LOGTAG, "prepare() failed");
            }

            isPlaying = true;

        }
    }
```

And here is how we stop playing the audio using the `stop` function, then invoke the `reset()`:

```java
    void stopPlaying() {
        mPlayer.stop();
        mPlayer.reset();
        Log.i(LOGTAG, "Audio Player Stopped");
        releaseMedidaPalyer();
        isPlaying = false;
    }

    boolean isPlaying() {
        return isPlaying;
    }
}
```

Here is the full code:

**PlayAudio.java**

```java
import android.media.MediaPlayer;
import android.util.Log;

import java.io.IOException;

public class PlayAudio {
    private final String LOGTAG = getClass().getSimpleName().toString();
    private boolean isPlaying = false;
    MediaPlayer mPlayer = null;

    void releaseMedidaPalyer() {
        if (mPlayer != null) {
            mPlayer.release();
            mPlayer = null;
            Log.i(LOGTAG, "Audio Player Released");
        }
    }

    void startPlaying(String mFileName) {
        if (!isPlaying) {
            mPlayer = new MediaPlayer();
            mPlayer.setOnCompletionListener(new MediaPlayer.OnCompletionListener() {
                @Override
                public void onCompletion(MediaPlayer mediaPlayer) {
                    stopPlaying();
                    isPlaying = false;

                }
            });
            try {
                mPlayer.setDataSource(mFileName);
                mPlayer.prepare();
                if (!mPlayer.isPlaying())
                    mPlayer.start();
                Log.i(LOGTAG, "Audio Player Started");
            } catch (IOException e) {
                Log.e(LOGTAG, "prepare() failed");
            }

            isPlaying = true;

        }
    }

    void stopPlaying() {
        mPlayer.stop();
        mPlayer.reset();
        Log.i(LOGTAG, "Audio Player Stopped");
        releaseMedidaPalyer();
        isPlaying = false;
    }

    boolean isPlaying() {
        return isPlaying;
    }
}
```

### Step 6: MainActivity

Here is the MainActivity:

```java
import android.os.Bundle;
import android.os.Environment;
import com.google.android.material.floatingactionbutton.FloatingActionButton;
import androidx.appcompat.app.AppCompatActivity;
import androidx.appcompat.widget.Toolbar;
import android.view.MotionEvent;
import android.view.View;
import android.widget.TextView;

public class MainActivity extends AppCompatActivity {

    private String LOGTAG = getClass().getSimpleName().toString();
    String mFileName = null;

    RecordAudio recordAudio = new RecordAudio();
    PlayAudio playAudio = new PlayAudio();

    TextView txt;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);
        Toolbar toolbar = (Toolbar) findViewById(R.id.toolbar);
        setSupportActionBar(toolbar);

        mFileName = Environment.getExternalStorageDirectory().getAbsolutePath();
        mFileName += "/audiorecord.3gp";

        final FloatingActionButton fab_rec = (FloatingActionButton) findViewById(R.id.fab_rec);
        txt=(TextView)findViewById(R.id.txt);

        txt.setText("Press and hold record button to record");

        fab_rec.setOnTouchListener(new View.OnTouchListener() {
            @Override
            public boolean onTouch(View view, MotionEvent motionEvent) {
                switch (motionEvent.getAction()) {
                    case MotionEvent.ACTION_DOWN:
                        txt.setText("Recording Started");
                        recordAudio.startRecording(mFileName);
                        break;
                    case MotionEvent.ACTION_UP:
                        txt.setText("Press and hold record button to record\nRecording Stopped");
                        recordAudio.stopRecording();
                        break;
                }
                return true;
            }
        });

        FloatingActionButton fab_play = (FloatingActionButton) findViewById(R.id.fab_play);
        fab_play.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View view) {
                if (playAudio.isPlaying()) {
                    txt.setText("Press and hold record button to record\nAudio play stopped");
                    playAudio.stopPlaying();
                } else {
                    txt.setText("Audio play started");
                    playAudio.startPlaying(mFileName);
                }
            }
        });
    }

    @Override
    public void onPause() {
        super.onPause();

        recordAudio.releaseMediaRecorder();
        playAudio.releaseMedidaPalyer();
    }
}
```

### Run

Copy the code or download it in the link below, build and run.

### Reference

Here are the reference links:

| Number | Link |
| --- | --- |
| 1. | [Download](https://downgit.github.io/#/home?url=https://github.com/nisrulz/android-examples/tree/develop/AudioRecording) Example |
| 2. | [Follow](https://github.com/nisrulz/) code author |
| 3. | Code: [Apache 2.0 License](http://www.apache.org/licenses/LICENSE-2.0.txt) |
