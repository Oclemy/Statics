# RecyclerView with Exoplayer Video Example



This is an example of how to list videos in a recyclerview while using the popular Exoplayer VideoPlayer.


Here is the demo:

![Android RecyclerView with Exoplayer Video Example](https://github.com/quicklearner4991/Exoplayer-VideoPlayer-in-Recyclerview/raw/master/20200607_191355.gif)

### Step 1: Create Project

Start by creating an empty AndroidStudio project.

### Step 2: Dependencies

In this example several third party dependencies are used, including Glide for loading video screenshots, and exoplayer for playing the videos.

Here are the dependencies:

```groovy
dependencies {
    implementation fileTree(dir: 'libs', include: ['*.jar'])
    implementation "org.jetbrains.kotlin:kotlin-stdlib-jdk7:$kotlin_version"
    implementation 'androidx.appcompat:appcompat:1.1.0'
    implementation 'androidx.core:core-ktx:1.2.0'
    implementation 'androidx.constraintlayout:constraintlayout:1.1.3'
    testImplementation 'junit:junit:4.12'
    androidTestImplementation 'androidx.test.ext:junit:1.1.1'
    androidTestImplementation 'androidx.test.espresso:espresso-core:3.2.0'
    implementation 'com.google.android.exoplayer:exoplayer:2.10.8'
    implementation 'org.jsoup:jsoup:1.10.3'

    implementation 'com.github.bumptech.glide:glide:4.9.0'
    annotationProcessor 'com.github.bumptech.glide:compiler:4.9.0'
    implementation 'androidx.recyclerview:recyclerview:1.2.0-alpha03'

}
```

You will also need to enable Java8 within the same `app/build.gradle` file;

```groovy
    compileOptions {
        sourceCompatibility JavaVersion.VERSION_1_8
        targetCompatibility JavaVersion.VERSION_1_8
    }
```

### Step 2: Design Layouts

Two layouts are used in this project, the recyclerview item layout as well as the MainActivity layout.

**(a). layout_media_list_item.xml**

```xml
<?xml version="1.0" encoding="utf-8"?>
<androidx.constraintlayout.widget.ConstraintLayout xmlns:android="http://schemas.android.com/apk/res/android"
    xmlns:app="http://schemas.android.com/apk/res-auto"
    xmlns:tools="http://schemas.android.com/tools"
    android:layout_width="match_parent"
    android:layout_height="wrap_content"
    android:layout_margin="8dp"
    android:background="@color/white"
    >

  <TextView
      android:id="@+id/tvTitle"
      android:layout_width="0dp"
      android:layout_height="wrap_content"
      android:layout_marginEnd="8dp"
      android:layout_marginStart="8dp"
      android:layout_marginTop="8dp"
      android:letterSpacing="-0.02"
      android:lineSpacingExtra="5sp"
      android:textColor="@color/navy"
      android:textSize="18sp"
      android:textStyle="bold"
      app:layout_constraintEnd_toEndOf="parent"
      app:layout_constraintStart_toStartOf="parent"
      app:layout_constraintTop_toTopOf="parent"
      />

  <ImageView
      android:id="@+id/imageView"
      android:layout_width="25dp"
      android:layout_height="25dp"
      android:layout_marginBottom="8dp"
      android:layout_marginStart="8dp"
      android:layout_marginTop="8dp"
      app:layout_constraintBottom_toTopOf="@+id/mediaContainer"
      app:layout_constraintStart_toStartOf="parent"
      app:layout_constraintTop_toBottomOf="@+id/tvTitle"
      app:srcCompat="@drawable/ic_user"
      />

  <TextView
      android:id="@+id/tvUserHandle"
      android:layout_width="wrap_content"
      android:layout_height="wrap_content"
      android:layout_marginStart="8dp"
      android:letterSpacing="-0.02"
      android:textColor="@color/windows_blue"
      android:textSize="10sp"
      app:layout_constraintBottom_toBottomOf="@+id/imageView"
      app:layout_constraintStart_toEndOf="@+id/imageView"
      app:layout_constraintTop_toTopOf="@+id/imageView"
      />

  <FrameLayout
      android:id="@+id/mediaContainer"
      android:layout_width="match_parent"
      android:layout_height="300dp"
      android:layout_marginBottom="8dp"
      android:layout_marginEnd="8dp"
      android:layout_marginStart="8dp"
      android:adjustViewBounds="true"
      android:background="@android:color/black"
      android:gravity="center"
      android:scaleType="center"
      app:layout_constraintBottom_toBottomOf="parent"
      app:layout_constraintEnd_toEndOf="parent"
      app:layout_constraintStart_toStartOf="parent"
      app:layout_constraintTop_toBottomOf="@+id/imageView"
      >

    <ImageView
        android:id="@+id/ivMediaCoverImage"
        android:layout_width="match_parent"
        android:layout_height="match_parent"
        android:background="@android:color/white"
        android:scaleType="centerCrop"
        android:src="@drawable/cover"
        />

    <ProgressBar
        android:id="@+id/progressBar"
        android:layout_width="wrap_content"
        android:layout_height="wrap_content"
        android:layout_gravity="center"
        android:visibility="gone"
        style="?android:attr/progressBarStyle"
        />
    <ImageView
        android:id="@+id/ivVolumeControl"
        android:layout_width="25dp"
        android:layout_height="25dp"
        android:layout_gravity="end|bottom"
        android:layout_marginBottom="15dp"
        android:layout_marginEnd="15dp"
        android:alpha="0"
        android:animateLayoutChanges="true"
        android:scaleType="centerCrop"
        android:src="@drawable/ic_volume_on"
        />
  </FrameLayout>

</androidx.constraintlayout.widget.ConstraintLayout>
```

**(a). activity_main.xml**

Add the custom `ExoPlayerRecyclerView` here:

```xml
<?xml version="1.0" encoding="utf-8"?>
<androidx.constraintlayout.widget.ConstraintLayout xmlns:android="http://schemas.android.com/apk/res/android"
    xmlns:tools="http://schemas.android.com/tools"
    android:layout_width="match_parent"
    android:layout_height="match_parent"
    tools:context=".MainActivity"
    >

  <com.example.exoplayer.utils.ExoPlayerRecyclerView
      android:id="@+id/exoPlayerRecyclerView"
      android:layout_width="match_parent"
      android:layout_height="match_parent"
      android:background="#dedede"
      android:dividerHeight="8dp"
      />

</androidx.constraintlayout.widget.ConstraintLayout>
```

### Step 3: Create model Object

Next create a media item object to represent a single video. Each of theseobjects will occupy a row in our custom `ExoplayerRecyclerView`.

**MediaObject.java**

```java
package com.example.exoplayer.model;

public class MediaObject {
  private int uId;
  private String title;
  private String mediaUrl;
  private String mediaCoverImgUrl;
  private String userHandle;

  public String getUserHandle() {
    return userHandle;
  }

  public void setUserHandle(String mUserHandle) {
    this.userHandle = mUserHandle;
  }

  public int getId() {
    return uId;
  }

  public void setId(int uId) {
    this.uId = uId;
  }

  public String getTitle() {
    return title;
  }

  public void setTitle(String mTitle) {
    this.title = mTitle;
  }

  public String getUrl() {
    return mediaUrl;
  }

  public void setUrl(String mUrl) {
    this.mediaUrl = mUrl;
  }

  public String getCoverUrl() {
    return mediaCoverImgUrl;
  }

  public void setCoverUrl(String mCoverUrl) {
    this.mediaCoverImgUrl = mCoverUrl;
  }
}
```

### Step 4: Create custom Reyclerview

Create a custom `ExoplayerRecyclerView` able to list our videos:

**ExoplayerRecyclerView.java**

```java
package com.example.exoplayer.utils;

import android.content.Context;
import android.graphics.Point;
import android.net.Uri;
import android.util.AttributeSet;
import android.util.Log;
import android.view.Display;
import android.view.View;
import android.view.ViewGroup;
import android.view.WindowManager;
import android.widget.FrameLayout;
import android.widget.ImageView;
import android.widget.ProgressBar;

import androidx.annotation.NonNull;
import androidx.annotation.Nullable;
import androidx.recyclerview.widget.LinearLayoutManager;
import androidx.recyclerview.widget.RecyclerView;

import com.bumptech.glide.RequestManager;
import com.example.exoplayer.R;
import com.example.exoplayer.adapter.PlayerViewHolder;
import com.example.exoplayer.model.MediaObject;
import com.google.android.exoplayer2.ExoPlaybackException;
import com.google.android.exoplayer2.ExoPlayerFactory;
import com.google.android.exoplayer2.PlaybackParameters;
import com.google.android.exoplayer2.Player;
import com.google.android.exoplayer2.SimpleExoPlayer;
import com.google.android.exoplayer2.Timeline;
import com.google.android.exoplayer2.source.ExtractorMediaSource;
import com.google.android.exoplayer2.source.MediaSource;
import com.google.android.exoplayer2.source.TrackGroupArray;
import com.google.android.exoplayer2.trackselection.AdaptiveTrackSelection;
import com.google.android.exoplayer2.trackselection.DefaultTrackSelector;
import com.google.android.exoplayer2.trackselection.TrackSelection;
import com.google.android.exoplayer2.trackselection.TrackSelectionArray;
import com.google.android.exoplayer2.trackselection.TrackSelector;
import com.google.android.exoplayer2.ui.AspectRatioFrameLayout;
import com.google.android.exoplayer2.ui.PlayerView;
import com.google.android.exoplayer2.upstream.BandwidthMeter;
import com.google.android.exoplayer2.upstream.DataSource;
import com.google.android.exoplayer2.upstream.DefaultBandwidthMeter;
import com.google.android.exoplayer2.upstream.DefaultDataSourceFactory;
import com.google.android.exoplayer2.util.Util;

import java.util.ArrayList;
import java.util.Objects;

public class ExoPlayerRecyclerView extends RecyclerView {

  private static final String TAG = "ExoPlayerRecyclerView";
  private static final String AppName = "Android ExoPlayer";
  /**
   * PlayerViewHolder UI component
   * Watch PlayerViewHolder class
   */
  private ImageView mediaCoverImage, volumeControl;
  private ProgressBar progressBar;
  private View viewHolderParent;
  private FrameLayout mediaContainer;
  private PlayerView videoSurfaceView;
  private SimpleExoPlayer videoPlayer;
  /**
   * variable declaration
   */
  // Media List
  private ArrayList<MediaObject> mediaObjects = new ArrayList<>();
  private int videoSurfaceDefaultHeight = 0;
  private int screenDefaultHeight = 0;
  private Context context;
  private int playPosition = -1;
  private boolean isVideoViewAdded;
  private RequestManager requestManager;
  // controlling volume state
  private VolumeState volumeState;
  private View.OnClickListener videoViewClickListener = new View.OnClickListener() {
    @Override
    public void onClick(View v) {
      toggleVolume();
    }
  };

  public ExoPlayerRecyclerView(@NonNull Context context) {
    super(context);
    init(context);
  }

  public ExoPlayerRecyclerView(@NonNull Context context, @Nullable AttributeSet attrs) {
    super(context, attrs);
    init(context);
  }

  private void init(Context context) {
    this.context = context.getApplicationContext();
    Display display = ((WindowManager) Objects.requireNonNull(
        getContext().getSystemService(Context.WINDOW_SERVICE))).getDefaultDisplay();
    Point point = new Point();
    display.getSize(point);

    videoSurfaceDefaultHeight = point.x;
    screenDefaultHeight = point.y;

    videoSurfaceView = new PlayerView(this.context);
    videoSurfaceView.setResizeMode(AspectRatioFrameLayout.RESIZE_MODE_ZOOM);

    BandwidthMeter bandwidthMeter = new DefaultBandwidthMeter();
    TrackSelection.Factory videoTrackSelectionFactory =
        new AdaptiveTrackSelection.Factory(bandwidthMeter);
    TrackSelector trackSelector =
        new DefaultTrackSelector(videoTrackSelectionFactory);

    //Create the player using ExoPlayerFactory
    videoPlayer = ExoPlayerFactory.newSimpleInstance(context, trackSelector);
    // Disable Player Control
    videoSurfaceView.setUseController(false);
    // Bind the player to the view.
    videoSurfaceView.setPlayer(videoPlayer);
    // Turn on Volume
    setVolumeControl(VolumeState.ON);

    addOnScrollListener(new RecyclerView.OnScrollListener() {
      @Override
      public void onScrollStateChanged(@NonNull RecyclerView recyclerView, int newState) {
        super.onScrollStateChanged(recyclerView, newState);

        if (newState == RecyclerView.SCROLL_STATE_IDLE) {
          if (mediaCoverImage != null) {
            // show the old thumbnail
            mediaCoverImage.setVisibility(VISIBLE);
          }

          // There's a special case when the end of the list has been reached.
          // Need to handle that with this bit of logic
          if (!recyclerView.canScrollVertically(1)) {
            playVideo(true);
          } else {
            playVideo(false);
          }
        }
      }

      @Override
      public void onScrolled(@NonNull RecyclerView recyclerView, int dx, int dy) {
        super.onScrolled(recyclerView, dx, dy);
      }
    });

    addOnChildAttachStateChangeListener(new OnChildAttachStateChangeListener() {
      @Override
      public void onChildViewAttachedToWindow(@NonNull View view) {

      }

      @Override
      public void onChildViewDetachedFromWindow(@NonNull View view) {
        if (viewHolderParent != null && viewHolderParent.equals(view)) {
          resetVideoView();
        }
      }
    });

    videoPlayer.addListener(new Player.EventListener() {
      @Override
      public void onTimelineChanged(Timeline timeline, @Nullable Object manifest, int reason) {

      }

      @Override
      public void onTracksChanged(TrackGroupArray trackGroups,
                                  TrackSelectionArray trackSelections) {

      }

      @Override
      public void onLoadingChanged(boolean isLoading) {

      }

      @Override
      public void onPlayerStateChanged(boolean playWhenReady, int playbackState) {
        switch (playbackState) {

          case Player.STATE_BUFFERING:
            Log.e(TAG, "onPlayerStateChanged: Buffering video.");
            if (progressBar != null) {
              progressBar.setVisibility(VISIBLE);
            }

            break;
          case Player.STATE_ENDED:
            Log.d(TAG, "onPlayerStateChanged: Video ended.");
            videoPlayer.seekTo(0);
            break;
          case Player.STATE_IDLE:

            break;
          case Player.STATE_READY:
            Log.e(TAG, "onPlayerStateChanged: Ready to play.");
            if (progressBar != null) {
              progressBar.setVisibility(GONE);
            }
            if (!isVideoViewAdded) {
              addVideoView();
            }
            break;
          default:
            break;
        }
      }

      @Override
      public void onRepeatModeChanged(int repeatMode) {

      }

      @Override
      public void onShuffleModeEnabledChanged(boolean shuffleModeEnabled) {

      }

      @Override
      public void onPlayerError(ExoPlaybackException error) {

      }

      @Override
      public void onPositionDiscontinuity(int reason) {

      }

      @Override
      public void onPlaybackParametersChanged(PlaybackParameters playbackParameters) {

      }

      @Override
      public void onSeekProcessed() {

      }
    });
  }

  public void playVideo(boolean isEndOfList) {

    int targetPosition;

    if (!isEndOfList) {
      int startPosition = ((LinearLayoutManager) getLayoutManager()).findFirstVisibleItemPosition();
      int endPosition = ((LinearLayoutManager) getLayoutManager()).findLastVisibleItemPosition();

      // if there is more than 2 list-items on the screen, set the difference to be 1
      if (endPosition - startPosition > 1) {
        endPosition = startPosition + 1;
      }

      // something is wrong. return.
      if (startPosition < 0 || endPosition < 0) {
        return;
      }

      // if there is more than 1 list-item on the screen
      if (startPosition != endPosition) {
        int startPositionVideoHeight = getVisibleVideoSurfaceHeight(startPosition);
        int endPositionVideoHeight = getVisibleVideoSurfaceHeight(endPosition);

        targetPosition =
            startPositionVideoHeight > endPositionVideoHeight ? startPosition : endPosition;
      } else {
        targetPosition = startPosition;
      }
    } else {
      targetPosition = mediaObjects.size() - 1;
    }

    Log.d(TAG, "playVideo: target position: " + targetPosition);

    // video is already playing so return
    if (targetPosition == playPosition) {
      return;
    }

    // set the position of the list-item that is to be played
    playPosition = targetPosition;
    if (videoSurfaceView == null) {
      return;
    }

    // remove any old surface views from previously playing videos
    videoSurfaceView.setVisibility(INVISIBLE);
    removeVideoView(videoSurfaceView);

    int currentPosition =
        targetPosition - ((LinearLayoutManager) Objects.requireNonNull(
            getLayoutManager())).findFirstVisibleItemPosition();

    View child = getChildAt(currentPosition);
    if (child == null) {
      return;
    }

    PlayerViewHolder holder = (PlayerViewHolder) child.getTag();
    if (holder == null) {
      playPosition = -1;
      return;
    }
    mediaCoverImage = holder.mediaCoverImage;
    progressBar = holder.progressBar;
    volumeControl = holder.volumeControl;
    viewHolderParent = holder.itemView;
    requestManager = holder.requestManager;
    mediaContainer = holder.mediaContainer;

    videoSurfaceView.setPlayer(videoPlayer);
    viewHolderParent.setOnClickListener(videoViewClickListener);

    DataSource.Factory dataSourceFactory = new DefaultDataSourceFactory(
        context, Util.getUserAgent(context, AppName));
    String mediaUrl = mediaObjects.get(targetPosition).getUrl();
    if (mediaUrl != null) {
      MediaSource videoSource = new ExtractorMediaSource.Factory(dataSourceFactory)
          .createMediaSource(Uri.parse(mediaUrl));
      videoPlayer.prepare(videoSource);
      videoPlayer.setPlayWhenReady(true);
    }
  }

  /**
   * Returns the visible region of the video surface on the screen.
   * if some is cut off, it will return less than the @videoSurfaceDefaultHeight
   */
  private int getVisibleVideoSurfaceHeight(int playPosition) {
    int at = playPosition - ((LinearLayoutManager) Objects.requireNonNull(
        getLayoutManager())).findFirstVisibleItemPosition();
    Log.d(TAG, "getVisibleVideoSurfaceHeight: at: " + at);

    View child = getChildAt(at);
    if (child == null) {
      return 0;
    }

    int[] location = new int[2];
    child.getLocationInWindow(location);

    if (location[1] < 0) {
      return location[1] + videoSurfaceDefaultHeight;
    } else {
      return screenDefaultHeight - location[1];
    }
  }

  // Remove the old player
  private void removeVideoView(PlayerView videoView) {
    ViewGroup parent = (ViewGroup) videoView.getParent();
    if (parent == null) {
      return;
    }

    int index = parent.indexOfChild(videoView);
    if (index >= 0) {
      parent.removeViewAt(index);
      isVideoViewAdded = false;
      viewHolderParent.setOnClickListener(null);
    }
  }

  private void addVideoView() {
    mediaContainer.addView(videoSurfaceView);
    isVideoViewAdded = true;
    videoSurfaceView.requestFocus();
    videoSurfaceView.setVisibility(VISIBLE);
    videoSurfaceView.setAlpha(1);
    mediaCoverImage.setVisibility(GONE);
  }

  private void resetVideoView() {
    if (isVideoViewAdded) {
      removeVideoView(videoSurfaceView);
      playPosition = -1;
      videoSurfaceView.setVisibility(INVISIBLE);
      mediaCoverImage.setVisibility(VISIBLE);
    }
  }

  public void releasePlayer() {

    if (videoPlayer != null) {
      videoPlayer.release();
      videoPlayer = null;
    }

    viewHolderParent = null;
  }

  public void onPausePlayer() {
    if (videoPlayer != null) {
      videoPlayer.stop(true);
    }
  }

  private void toggleVolume() {
    if (videoPlayer != null) {
      if (volumeState == VolumeState.OFF) {
        Log.d(TAG, "togglePlaybackState: enabling volume.");
        setVolumeControl(VolumeState.ON);
      } else if (volumeState == VolumeState.ON) {
        Log.d(TAG, "togglePlaybackState: disabling volume.");
        setVolumeControl(VolumeState.OFF);
      }
    }
  }

  //public void onRestartPlayer() {
  //  if (videoPlayer != null) {
  //   playVideo(true);
  //  }
  //}

  private void setVolumeControl(VolumeState state) {
    volumeState = state;
    if (state == VolumeState.OFF) {
      videoPlayer.setVolume(0f);
      animateVolumeControl();
    } else if (state == VolumeState.ON) {
      videoPlayer.setVolume(1f);
      animateVolumeControl();
    }
  }

  private void animateVolumeControl() {
    if (volumeControl != null) {
      volumeControl.bringToFront();
      if (volumeState == VolumeState.OFF) {
        requestManager.load(R.drawable.ic_volume_off)
            .into(volumeControl);
      } else if (volumeState == VolumeState.ON) {
        requestManager.load(R.drawable.ic_volume_on)
            .into(volumeControl);
      }
      volumeControl.animate().cancel();

      volumeControl.setAlpha(1f);

      volumeControl.animate()
          .alpha(0f)
          .setDuration(600).setStartDelay(1000);
    }
  }

  public void setMediaObjects(ArrayList<MediaObject> mediaObjects) {
    this.mediaObjects = mediaObjects;
  }

  /**
   * Volume ENUM
   */
  private enum VolumeState {
    ON, OFF
  }
}
```

### Step 5: Create RecyclerView Adapter

Start by creating the RecyclerView ViewHolder:

**(a). PlayerViewHolder.java**

```java
package com.example.exoplayer.adapter;

import android.view.View;
import android.widget.FrameLayout;
import android.widget.ImageView;
import android.widget.ProgressBar;
import android.widget.TextView;

import androidx.annotation.NonNull;
import androidx.recyclerview.widget.RecyclerView;

import com.bumptech.glide.RequestManager;
import com.example.exoplayer.R;
import com.example.exoplayer.model.MediaObject;

/**
 * Created on : May 24, 2019
 * Author     : AndroidWave
 */
public class PlayerViewHolder extends RecyclerView.ViewHolder {

  /**
   * below view have public modifier because
   * we have access PlayerViewHolder inside the ExoPlayerRecyclerView
   */
  public FrameLayout mediaContainer;
  public ImageView mediaCoverImage, volumeControl;
  public ProgressBar progressBar;
  public RequestManager requestManager;
  private TextView title, userHandle;
  private View parent;

  public PlayerViewHolder(@NonNull View itemView) {
    super(itemView);
    parent = itemView;
    mediaContainer = itemView.findViewById(R.id.mediaContainer);
    mediaCoverImage = itemView.findViewById(R.id.ivMediaCoverImage);
    title = itemView.findViewById(R.id.tvTitle);
    userHandle = itemView.findViewById(R.id.tvUserHandle);
    progressBar = itemView.findViewById(R.id.progressBar);
    volumeControl = itemView.findViewById(R.id.ivVolumeControl);
  }

  void onBind(MediaObject mediaObject, RequestManager requestManager) {
    this.requestManager = requestManager;
    parent.setTag(this);
    title.setText(mediaObject.getTitle());
    userHandle.setText(mediaObject.getUserHandle());
    this.requestManager
        .load(mediaObject.getCoverUrl())
        .into(mediaCoverImage);
  }
}
```

**(b). MediaRecyclerAdapter.java**

```java
package com.example.exoplayer.adapter;

import android.view.LayoutInflater;
import android.view.ViewGroup;

import androidx.annotation.NonNull;
import androidx.recyclerview.widget.RecyclerView;

import com.bumptech.glide.RequestManager;
import com.example.exoplayer.R;
import com.example.exoplayer.model.MediaObject;

import java.util.ArrayList;

public class MediaRecyclerAdapter extends RecyclerView.Adapter<RecyclerView.ViewHolder> {

  private ArrayList<MediaObject> mediaObjects;
  private RequestManager requestManager;

  public MediaRecyclerAdapter(ArrayList<MediaObject> mediaObjects,
                              RequestManager requestManager) {
    this.mediaObjects = mediaObjects;
    this.requestManager = requestManager;
  }

  @NonNull
  @Override
  public RecyclerView.ViewHolder onCreateViewHolder(@NonNull ViewGroup viewGroup, int i) {
    return new PlayerViewHolder(
        LayoutInflater.from(viewGroup.getContext())
            .inflate(R.layout.layout_media_list_item, viewGroup, false));
  }

  @Override
  public void onBindViewHolder(@NonNull RecyclerView.ViewHolder viewHolder, int i) {
    ((PlayerViewHolder) viewHolder).onBind(mediaObjects.get(i), requestManager);
  }

  @Override
  public int getItemCount() {
    return mediaObjects.size();
  }
}
```

### Step 6: Create MainActivity

Put everything together in the `MainActivity` class, including adding the videos to the recyclerview:

**MainActivity.java**

```java
package com.example.exoplayer;

import android.os.Bundle;

import androidx.appcompat.app.AppCompatActivity;
import androidx.recyclerview.widget.LinearLayoutManager;

import com.bumptech.glide.Glide;
import com.bumptech.glide.RequestManager;
import com.bumptech.glide.request.RequestOptions;
import com.example.exoplayer.adapter.MediaRecyclerAdapter;
import com.example.exoplayer.model.MediaObject;
import com.example.exoplayer.utils.ExoPlayerRecyclerView;

import java.util.ArrayList;

import static android.widget.LinearLayout.VERTICAL;

public class MainActivity extends AppCompatActivity {

    ExoPlayerRecyclerView mRecyclerView;

    private ArrayList<MediaObject> mediaObjectList = new ArrayList<>();
    private MediaRecyclerAdapter mAdapter;
    private boolean firstTime = true;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);
        initView();
        // Prepare demo content
        prepareVideoList();

        //set data object
        mRecyclerView.setMediaObjects(mediaObjectList);
        mAdapter = new MediaRecyclerAdapter(mediaObjectList, initGlide());

        //Set Adapter
        mRecyclerView.setAdapter(mAdapter);
        mRecyclerView.smoothScrollToPosition(1);
      //mRecyclerView.smoothScrollToPosition(1);
 /*   if (firstTime) {
      new Handler(Looper.getMainLooper()).post(new Runnable() {
        @Override
        public void run() {
          mRecyclerView.playVideo(false);
        }
      });
      firstTime = false;
    }*/
    }

    private void initView() {
        mRecyclerView = findViewById(R.id.exoPlayerRecyclerView);
        mRecyclerView.setLayoutManager(new LinearLayoutManager(this));
    }

    private RequestManager initGlide() {
        RequestOptions options = new RequestOptions();

        return Glide.with(this)
                .setDefaultRequestOptions(options);
    }

    @Override
    protected void onDestroy() {
        if (mRecyclerView != null) {
            mRecyclerView.releasePlayer();
        }
        super.onDestroy();
    }

    private void prepareVideoList() {
        MediaObject mediaObject = new MediaObject();
        mediaObject.setId(1);
        mediaObject.setUserHandle("User 1");
        mediaObject.setTitle(
                "Item 1");
        mediaObject.setCoverUrl(
                "https://www.muscleandfitness.com/wp-content/uploads/2019/04/7-Demonized-BodyBuilding-Food-Gallery.jpg?w=940&h=529&crop=1");
        mediaObject.setUrl("https://s3.ca-central-1.amazonaws.com/codingwithmitch/media/VideoPlayerRecyclerView/Sending+Data+to+a+New+Activity+with+Intent+Extras.mp4");

        MediaObject mediaObject2 = new MediaObject();
        mediaObject2.setId(2);
        mediaObject2.setUserHandle("user 2");
        mediaObject2.setTitle(
                "Item 2");
        mediaObject2.setCoverUrl(
                "https://www.muscleandfitness.com/wp-content/uploads/2019/04/7-Demonized-BodyBuilding-Food-Gallery.jpg?w=940&h=529&crop=1");
        mediaObject2.setUrl("https://s3.ca-central-1.amazonaws.com/codingwithmitch/media/VideoPlayerRecyclerView/Sending+Data+to+a+New+Activity+with+Intent+Extras.mp4");

        MediaObject mediaObject3 = new MediaObject();
        mediaObject3.setId(3);
        mediaObject3.setUserHandle("User 3");
        mediaObject3.setTitle("Item 3");
        mediaObject3.setCoverUrl(
                "https://www.muscleandfitness.com/wp-content/uploads/2019/04/7-Demonized-BodyBuilding-Food-Gallery.jpg?w=940&h=529&crop=1");
        mediaObject3.setUrl("https://s3.ca-central-1.amazonaws.com/codingwithmitch/media/VideoPlayerRecyclerView/Sending+Data+to+a+New+Activity+with+Intent+Extras.mp4");

        MediaObject mediaObject4 = new MediaObject();
        mediaObject4.setId(4);
        mediaObject4.setUserHandle("User 4");
        mediaObject4.setTitle("Item 4");
        mediaObject4.setCoverUrl(
                "https://www.muscleandfitness.com/wp-content/uploads/2019/04/7-Demonized-BodyBuilding-Food-Gallery.jpg?w=940&h=529&crop=1");
        mediaObject4.setUrl("https://s3.ca-central-1.amazonaws.com/codingwithmitch/media/VideoPlayerRecyclerView/Sending+Data+to+a+New+Activity+with+Intent+Extras.mp4");

        MediaObject mediaObject5 = new MediaObject();
        mediaObject5.setId(5);
        mediaObject5.setUserHandle("User 5");
        mediaObject5.setTitle("Item 5");
        mediaObject5.setCoverUrl(
                "https://www.muscleandfitness.com/wp-content/uploads/2019/04/7-Demonized-BodyBuilding-Food-Gallery.jpg?w=940&h=529&crop=1");
        mediaObject5.setUrl("https://s3.ca-central-1.amazonaws.com/codingwithmitch/media/VideoPlayerRecyclerView/Sending+Data+to+a+New+Activity+with+Intent+Extras.mp4");

        mediaObjectList.add(mediaObject);
        mediaObjectList.add(mediaObject2);
        mediaObjectList.add(mediaObject3);
        mediaObjectList.add(mediaObject4);
        mediaObjectList.add(mediaObject5);
    }
}
```

### Step 7: Add Internet permission

Add internet permission to your `AndroidManifest.xml`:\`

```xml
    <uses-permission android:name="android.permission.INTERNET" />
```

### Run

Copy the code or download it in the link below, build and run.

### Reference

Here are the reference links:

| Number | Link |
| --- | --- |
| 1. | [Download](https://github.com/quicklearner4991/Exoplayer-VideoPlayer-in-Recyclerview/archive/refs/heads/master.zip) Example |
| 2. | [Follow](https://github.com/quicklearner4991/) code author |
