# How to Create Custom VideoView


> Step by step example on how to create a videoplayer based on custom videoview.

Here is the demo screenshot:

![https://github.com/ZQiang94/VideoPalyer/raw/master/art/art.png](https://github.com/ZQiang94/VideoPalyer/raw/master/art/art.png)

### Step 1: Dependencies

No external dependencies are needed.

### Step 2: Add Permissions

Add the following permissions in your `AndroidManifest.xml`:

```xml
    <uses-permission android:name="android.permission.WRITE_EXTERNAL_STORAGE" />
    <uses-permission android:name="android.permission.READ_EXTERNAL_STORAGE" />
    <uses-permission android:name="android.permission.INTERNET" />
```

### Step 3: Create Animations

Create a folder inside the `res` directory and called `animator` and add the following two animations:

**(a). enter_from_bottom.xml**

```xml
<?xml version="1.0" encoding="utf-8"?>
<translate xmlns:android="http://schemas.android.com/apk/res/android"
    android:duration="400"
    android:fromYDelta="100%"
    android:toYDelta="0"/>

```

**(b). exit_from_bottom.xml**

```xml
<?xml version="1.0" encoding="utf-8"?>
<translate
    xmlns:android="http://schemas.android.com/apk/res/android"
    android:fromYDelta="0"
    android:toYDelta="100%"
    android:duration="400">
    </translate>

```

### Step 4: Create Custom VideoView

Create a custom videoView as shown below:

**SimpleVideoView.java**

```java
package zqiang94.github.io.videopalyer;


import android.app.Activity;
import android.content.Context;
import android.graphics.Point;
import android.graphics.drawable.Drawable;
import android.media.AudioManager;
import android.media.MediaPlayer;
import android.media.MediaPlayer.OnCompletionListener;
import android.media.MediaPlayer.OnPreparedListener;
import android.net.Uri;
import android.os.Handler;
import android.os.Message;
import android.util.AttributeSet;
import android.view.LayoutInflater;
import android.view.View;
import android.view.View.OnClickListener;
import android.view.ViewGroup;
import android.view.animation.Animation;
import android.view.animation.AnimationUtils;
import android.widget.ImageView;
import android.widget.LinearLayout;
import android.widget.ProgressBar;
import android.widget.RelativeLayout;
import android.widget.SeekBar;
import android.widget.SeekBar.OnSeekBarChangeListener;
import android.widget.TextView;
import android.widget.VideoView;

/**
 * <p>自定义ViewGroup，底部有控制面板的Video</p>
 */
public class SimpleVideoView extends RelativeLayout implements OnClickListener {

    private Context context;
    private View mView;
    private VideoView mVideoView;
    private ImageView mBigPlayBtn;
    private ImageView mPlayBtn;
    private ImageView mMuteImg;
    private SeekBar mPlayProgressBar;
    private TextView mPlayTime;
    private LinearLayout mControlPanel;
    private ProgressBar mLoading;

    private Uri mVideoUri = null;

    private Animation outAnima;
    private Animation inAnima;

    private int mVideoDuration;
    private int mCurrentProgress;

    private Runnable mUpdateTask;
    private Thread mUpdateThread;

    private final int UPDATE_PROGRESS = 0;
    private final int EXIT_CONTROL_PANEL = 1;
    private boolean stopThread = true;

    private Point screenSize = new Point();
    private boolean mIsFullScreen = false;

    private int mWidth;
    private int mHeigth;

    public SimpleVideoView(Context context) {
        super(context);
        init(context, null, 0);
    }

    public SimpleVideoView(Context context, AttributeSet attrs) {
        super(context, attrs);
        init(context, attrs, 0);
    }

    public SimpleVideoView(Context context, AttributeSet attrs, int defStyleAttr) {
        super(context, attrs, defStyleAttr);
        init(context, attrs, defStyleAttr);
    }

    private Handler handler = new Handler() {
        @Override
        public void handleMessage(Message msg) {
            switch (msg.what) {
                case UPDATE_PROGRESS:
                    mPlayProgressBar.setProgress(mCurrentProgress);
                    setPlayTime(mCurrentProgress);
                    break;
                case EXIT_CONTROL_PANEL:
                    //perform exit animation
                    if (mControlPanel.getVisibility() != View.GONE) {
                        mControlPanel.startAnimation(outAnima);
                        mControlPanel.setVisibility(View.GONE);
                    }
                    break;
            }
        }
    };

    //Initialize the control
    private void init(Context context, AttributeSet attrs, int defStyleAttr) {
        this.context = context;
        mView = LayoutInflater.from(context).inflate(R.layout.layout_simple_video, this);
        mBigPlayBtn = (ImageView) mView.findViewById(R.id.big_play_button);
        mPlayBtn = (ImageView) mView.findViewById(R.id.play_button);
        mMuteImg = (ImageView) mView.findViewById(R.id.mute_un);
        mPlayProgressBar = (SeekBar) mView.findViewById(R.id.progress_bar);
        mLoading = (ProgressBar) mView.findViewById(R.id.loading);
        mPlayTime = (TextView) mView.findViewById(R.id.time);
        mControlPanel = (LinearLayout) mView.findViewById(R.id.control_panel);
        mVideoView = (VideoView) mView.findViewById(R.id.video_view);
        //get screen size
        ((Activity) context).getWindowManager().getDefaultDisplay().getSize(screenSize);
        //loading animation
        outAnima = AnimationUtils.loadAnimation(context, R.anim.exit_from_bottom);
        inAnima = AnimationUtils.loadAnimation(context, R.anim.enter_from_bottom);
        //The settings control panel is initially invisible
        mControlPanel.setVisibility(View.GONE);
        //Make the big play button visible
        mBigPlayBtn.setVisibility(View.VISIBLE);
        //Set up the media controller
//		mMediaController = new MediaController(context);
//		mMediaController.setVisibility(View.GONE);
//		mVideoView.setMediaController(mMediaController);
        mVideoView.setOnPreparedListener(new OnPreparedListener() {
            @Override
            public void onPrepared(MediaPlayer mp) {
                //The video duration can only be obtained after the video is loaded
                initVideo();
            }
        });
        //Video playback completion listener
        mVideoView.setOnCompletionListener(new OnCompletionListener() {
            @Override
            public void onCompletion(MediaPlayer mp) {
                mPlayBtn.setImageResource(R.mipmap.player);
                mVideoView.seekTo(0);
                mPlayProgressBar.setProgress(0);
                setPlayTime(0);
                stopThread = true;
                sendHideControlPanelMessage();
            }
        });

        mView.setOnClickListener(this);
    }

    //Initialize the video, set the video time and the maximum value of the progress bar
    private void initVideo() {
        mVideoView.start();
        mVideoView.pause();
        mLoading.setVisibility(GONE);
        //Initialize time and progress bar
        mVideoDuration = mVideoView.getDuration();//milliseconds
        int seconds = mVideoDuration / 1000;
        mPlayTime.setText("00:00/" +
                ((seconds / 60 > 9) ? (seconds / 60) : ("0" + seconds / 60)) + ":" +
                ((seconds % 60 > 9) ? (seconds % 60) : ("0" + seconds % 60)));
        mPlayProgressBar.setMax(mVideoDuration);
        mPlayProgressBar.setProgress(0);
        //Update progress bar and time tasks
        mUpdateTask = new Runnable() {
            @Override
            public void run() {
                while (!stopThread) {
                    mCurrentProgress = mVideoView.getCurrentPosition();
                    handler.sendEmptyMessage(UPDATE_PROGRESS);
                    try {
                        Thread.sleep(500);
                    } catch (InterruptedException e) {
                        e.printStackTrace();
                    }
                }
            }
        };
        mBigPlayBtn.setOnClickListener(this);
        mPlayBtn.setOnClickListener(this);
        mMuteImg.setOnClickListener(this);
        //progress bar progress change listener
        mPlayProgressBar.setOnSeekBarChangeListener(new OnSeekBarChangeListener() {
            @Override
            public void onStopTrackingTouch(SeekBar seekBar) {
                handler.sendEmptyMessageDelayed(EXIT_CONTROL_PANEL, 3000);
            }

            @Override
            public void onStartTrackingTouch(SeekBar seekBar) {
                handler.removeMessages(EXIT_CONTROL_PANEL);
            }

            @Override
            public void onProgressChanged(SeekBar seekBar, int progress,
                                          boolean fromUser) {
                if (fromUser) {
                    mVideoView.seekTo(progress);//set video
                    setPlayTime(progress);//set time
                }
            }
        });
        mWidth = this.getWidth();
        mHeigth = this.getHeight();
    }

    @Override
    public void onClick(View v) {
        if (v == mView) {
            if (mBigPlayBtn.getVisibility() == View.VISIBLE) {
                return;
            }
            if (mControlPanel.getVisibility() == View.VISIBLE) {
                //perform exit animation
                mControlPanel.startAnimation(outAnima);
                mControlPanel.setVisibility(View.GONE);
            } else {
                //Execute entry animation
                mControlPanel.startAnimation(inAnima);
                mControlPanel.setVisibility(View.VISIBLE);
                sendHideControlPanelMessage();
            }
        } else if (v.getId() == R.id.big_play_button) {//Play button in screen
            mBigPlayBtn.setVisibility(View.GONE);
            mVideoView.setBackground(null);
            if (!mVideoView.isPlaying()) {
                mVideoView.start();
                mPlayBtn.setImageResource(R.mipmap.pause);
                //Start update progress thread
                mUpdateThread = new Thread(mUpdateTask);
                stopThread = false;
                mUpdateThread.start();
            }
        } else if (v.getId() == R.id.play_button) {//play/pause button
            if (mVideoView.isPlaying()) {
                mVideoView.pause();
                mPlayBtn.setImageResource(R.mipmap.player);
            } else {
                if (mUpdateThread == null || !mUpdateThread.isAlive()) {
                    //Start update progress thread
                    mUpdateThread = new Thread(mUpdateTask);
                    stopThread = false;
                    mUpdateThread.start();
                }
                mVideoView.start();
                mPlayBtn.setImageResource(R.mipmap.pause);
            }
            sendHideControlPanelMessage();
        } else if (v.getId() == R.id.mute_un) {
            //sound and mute
            boolean tag1 = mMuteImg.getTag() == null ? false : (boolean) mMuteImg.getTag();
            mMuteImg.setImageResource(!tag1 ? R.mipmap.un_mute : R.mipmap.mute);
            mMuteImg.setTag(!tag1);
            AudioManager audioManager = (AudioManager) context.getSystemService(Context.AUDIO_SERVICE);
            audioManager.setStreamVolume(AudioManager.STREAM_MUSIC, !tag1 ? 0 : 5, 0);
            sendHideControlPanelMessage();
        }
    }

    //set current time
    private void setPlayTime(int millisSecond) {
        int currentSecond = millisSecond / 1000;
        String currentTime = ((currentSecond / 60 > 9) ? (currentSecond / 60 + "") : ("0" + currentSecond / 60)) + ":" +
                ((currentSecond % 60 > 9) ? (currentSecond % 60 + "") : ("0" + currentSecond % 60));
        StringBuilder text = new StringBuilder(mPlayTime.getText().toString());
        text.replace(0, text.indexOf("/"), currentTime);
        mPlayTime.setText(text);
    }

    //Set the width and height of the control
    private void setSize() {
        ViewGroup.LayoutParams lp = this.getLayoutParams();
        if (mIsFullScreen) {
            lp.width = screenSize.y;
            lp.height = screenSize.x;
        } else {
            lp.width = mWidth;
            lp.height = mHeigth;
        }
        this.setLayoutParams(lp);
    }

    //Hide the control panel after two seconds
    private void sendHideControlPanelMessage() {
        handler.removeMessages(EXIT_CONTROL_PANEL);
        handler.sendEmptyMessageDelayed(EXIT_CONTROL_PANEL, 3000);
    }

    //set video path
    public void setVideoUri(Uri uri) {
        this.mVideoUri = uri;
        mVideoView.setVideoURI(mVideoUri);
    }


    //set video path
    public void setVideoUrl(String url) {
        mVideoView.setVideoPath(url);
    }

    //get video path
    public Uri getVideoUri() {
        return mVideoUri;
    }

    //Set the video splash screen
    public void setInitPicture(Drawable d) {
        mVideoView.setBackground(d);
    }

    //Suspend Video
    public void suspend() {
        if (mVideoView != null) {
            mVideoView.suspend();
        }
    }

    //Set video progress
    public void setVideoProgress(int millisSecond, boolean isPlaying) {
        mVideoView.setBackground(null);
        mBigPlayBtn.setVisibility(View.GONE);
        mPlayProgressBar.setProgress(millisSecond);
        setPlayTime(millisSecond);
        if (mUpdateThread == null || !mUpdateThread.isAlive()) {
            mUpdateThread = new Thread(mUpdateTask);
            stopThread = false;
            mUpdateThread.start();
        }
        mVideoView.seekTo(millisSecond);
        if (isPlaying) {
            mVideoView.start();
            mPlayBtn.setImageResource(R.mipmap.pause);
        } else {
            mVideoView.pause();
            mPlayBtn.setImageResource(R.mipmap.player);
        }
    }

    //Get video progress
    public int getVideoProgress() {
        return mVideoView.getCurrentPosition();
    }

    //Determine if a video is playing
    public boolean isPlaying() {
        return mVideoView.isPlaying();
    }

}


```

### Step 5: Play Video

Play a video from a URL using the custom VideoView:

**MainActivity.java**

```java
package zqiang94.github.io.videopalyer;

import android.os.Bundle;
import android.support.v7.app.AppCompatActivity;

public class MainActivity extends AppCompatActivity {

    private SimpleVideoView mVideoView;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);
        initView();
    }

    private void initView() {
        mVideoView =  findViewById(R.id.simple_video);
        String url = "http://1255521334.vod2.myqcloud.com/ca2a1ebevodgzp1255521334/36ec9b975285890780567798103/hD68STre3sEA.mp4";
        mVideoView.setVideoUrl(url);
    }
}

```

### Reference

> Download full code [here](https://github.com/ZQiang94/VideoPalyer/archive/refs/heads/master.zip).
> Follow code author [here](https://github.com/ZQiang94/).
