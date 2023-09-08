# Android ExoPlayer Video Preview Example

This tutorial will explore how to show video previews in Exoplayer via different open source solutions.


## Solution 1: Use PreviewSeekBar

> PreviewSeekBar is a SeekBar suited for showing a video preview.

Here's the demo screenshot of the project that will be created:

![PreviewSeekBar Example](https://github.com/rubensousa/PreviewSeekBar/raw/master/screenshots/sample.gif)

### Step 1: Install it

In your `app/build.gradle` declare the following dependencies:

```groovy
dependencies {
    // Base implementation with a standard SeekBar
    implementation 'com.github.rubensousa:previewseekbar:3.0.0'

    // ExoPlayer extension that contains a TimeBar.
    // Grab this one if you're going to integrate with ExoPlayer
    implementation 'com.github.rubensousa:previewseekbar-exoplayer:2.11.4.0'
}
```

### Step 2: Add custom Controls

```xml
<com.google.android.exoplayer2.ui.PlayerView
    android:id="@+id/playerView"
    android:layout_width="match_parent"
    android:layout_height="match_parent"
    app:controller_layout_id="@layout/exoplayer_controls"/>
```

### Step 3: Change your TimeBar to a PreviewTimeBar

Place the View you want to use to display the preview in the FrameLayout above. In this example it's an ImageView but you can place any View inside. PreviewTimeBar will animate and show that FrameLayout for you automatically.

```xml
<FrameLayout
    android:id="@+id/previewFrameLayout"
    android:layout_width="@dimen/video_preview_width"
    android:layout_height="@dimen/video_preview_height"
    android:background="@drawable/video_frame">

    <ImageView
        android:id="@+id/imageView"
        android:layout_width="match_parent"
        android:layout_height="match_parent"/>

</FrameLayout>

<com.github.rubensousa.previewseekbar.exoplayer.PreviewTimeBar
    android:id="@+id/exo_progress"
    android:layout_width="match_parent"
    android:layout_height="wrap_content"
    android:layout_marginStart="8dp"
    android:layout_marginEnd="8dp"
    app:previewAnimationEnabled="true"
    app:previewFrameLayout="@id/previewFrameLayout"/>
```

> **The FrameLayout must have the same parent as the PreviewTimeBar if you want the default animations to work**

### Step 4: Create a PreviewLoader and pass it to the PreviewTimeBar

```java
PreviewLoader imagePreviewLoader = ImagePreviewLoader();

previewTimeBar.setPreviewLoader(imagePreviewLoader);
```

> A PreviewLoader is an interface that you need to implement yourself.

Glide is used in the library:

```java
@Override
public void loadPreview(long currentPosition, long max) {
    GlideApp.with(imageView)
            .load(thumbnailsUrl)
            .override(GlideThumbnailTransformation.IMAGE_WIDTH,
                    GlideThumbnailTransformation.IMAGE_HEIGHT)
            .transform(new GlideThumbnailTransformation(currentPosition))
            .into(imageView);
}
```

### Step 5: Listen for scrub events to control playback state

When the user starts scrubbing the PreviewTimeBar, you should pause the video playback After the user is done selecting the new video position, you can resume it.

```java
previewTimeBar.addOnScrubListener(new PreviewBar.OnScrubListener() {
    @Override
    public void onScrubStart(PreviewBar previewBar) {
        player.setPlayWhenReady(false);
    }

    @Override
    public void onScrubMove(PreviewBar previewBar, int progress, boolean fromUser) {

    }

    @Override
    public void onScrubStop(PreviewBar previewBar) {
        player.setPlayWhenReady(true);
    }
});
```

### Customizations

Available XML attributes:

```xml
<attr name="previewAnimationEnabled" format="boolean" />
<attr name="previewEnabled" format="boolean" />
<attr name="previewAutoHide" format="boolean" />
```

```java
// Disables auto hiding the preview.
// Default is true, which means the preview is hidden
// when the user stops scrubbing the PreviewSeekBar
previewTimeBar.setAutoHidePreview(false);

// Shows the preview
previewTimeBar.showPreview();

// Hides the preview
previewTimeBar.hidePreview();

// Disables revealing the preview
previewTimeBar.setPreviewEnabled(false);

// Disables the current animation
previewTimeBar.setPreviewAnimationEnabled(false);

// Change the default animation
previewTimeBar.setPreviewAnimator(new PreviewFadeAnimator());

// Changes the color of the thumb
previewTimeBar.setPreviewThumbTint(Color.RED);

// Listen for scrub touch changes
previewTimeBar.addOnScrubListener(new PreviewBar.OnScrubListener() {
    @Override
    public void onScrubStart(PreviewBar previewBar) {

    }

    @Override
    public void onScrubMove(PreviewBar previewBar, int progress, boolean fromUser) {

    }

    @Override
    public void onScrubStop(PreviewBar previewBar) {

    }
});

// Listen for preview visibility changes
previewTimeBar.addOnPreviewVisibilityListener(new PreviewBar.OnPreviewVisibilityListener() {
    @Override
    public void onVisibilityChanged(PreviewBar previewBar, boolean isPreviewShowing) {

    }
});
```

### Full Example

Let us look at a full example:

#### Step 1: Create Project

Create android studio project or download the one provided.

#### Step 2: Install Library

Install the library as has been discussed.

#### Step 3: Modify style and menu

Replace your `styles.xml` with the following;

```xml
<resources>

    <!-- Base application theme. -->
    <style name="AppTheme" parent="Theme.MaterialComponents.Light.NoActionBar">
        <!-- Customize your theme here. -->
        <item name="colorPrimary">@color/colorPrimary</item>
        <item name="colorPrimaryDark">@color/colorPrimaryDark</item>
        <item name="colorSecondary">@color/colorAccent</item>
        <item name="colorAccent">@color/colorAccent</item>
        <item name="played_color">@color/colorPrimary</item>
        <item name="scrubber_color">@color/colorPrimary</item>
    </style>

    <style name="AppTheme.AppBarOverlay" parent="ThemeOverlay.AppCompat.Dark.ActionBar" />

    <style name="AppTheme.PopupOverlay" parent="ThemeOverlay.AppCompat.Light" />

</resources>
```

Create a menu in the `res/menu/main.xml` and add the following code:

```xml
<?xml version="1.0" encoding="utf-8"?>
<menu xmlns:android="http://schemas.android.com/apk/res/android"
    xmlns:app="http://schemas.android.com/apk/res-auto">

    <item
        android:id="@+id/action_local"
        android:icon="@drawable/ic_sd_card"
        android:title="@string/preview_local_video"
        app:showAsAction="always" />
</menu>
```

### Step 4: Design Layouts

**(a). options.xml**

The options layout:

```xml
<?xml version="1.0" encoding="utf-8"?>
<LinearLayout xmlns:android="http://schemas.android.com/apk/res/android"
    android:layout_width="match_parent"
    android:layout_height="wrap_content"
    android:orientation="vertical">

    <com.google.android.material.button.MaterialButton
        android:id="@+id/previewToggleButton"
        style="@style/Widget.MaterialComponents.Button"
        android:layout_width="wrap_content"
        android:layout_height="wrap_content"
        android:layout_gravity="center"
        android:text="@string/preview_toggle" />

    <com.google.android.material.button.MaterialButton
        android:id="@+id/previewToggleColors"
        style="@style/Widget.MaterialComponents.Button"
        android:layout_width="wrap_content"
        android:layout_height="wrap_content"
        android:layout_gravity="center"
        android:text="@string/preview_change_colors" />

    <androidx.appcompat.widget.SwitchCompat
        android:id="@+id/previewEnabledSwitch"
        android:layout_width="match_parent"
        android:layout_height="wrap_content"
        android:checked="true"
        android:padding="16dp"
        android:text="@string/preview_switch" />

    <androidx.appcompat.widget.SwitchCompat
        android:id="@+id/previewAutoHideSwitch"
        android:layout_width="match_parent"
        android:layout_height="wrap_content"
        android:checked="true"
        android:padding="16dp"
        android:text="@string/preview_auto_hide" />

    <RadioGroup
        android:id="@+id/previewAnimationRadioGroup"
        android:layout_width="match_parent"
        android:layout_height="wrap_content"
        android:checkedButton="@id/morphAnimationRadioButton">

        <RadioButton
            android:id="@+id/morphAnimationRadioButton"
            android:layout_width="match_parent"
            android:layout_height="match_parent"
            android:padding="16dp"
            android:text="@string/preview_animation_morph" />

        <RadioButton
            android:id="@+id/fadeAnimationRadioButton"
            android:layout_width="match_parent"
            android:layout_height="match_parent"
            android:padding="16dp"
            android:text="@string/preview_animation_fade" />

        <RadioButton
            android:id="@+id/noAnimationRadioButton"
            android:layout_width="match_parent"
            android:layout_height="match_parent"
            android:padding="16dp"
            android:text="@string/preview_animation_none" />

    </RadioGroup>

</LinearLayout>
```

**(b). exoplayer_controls.xml**

The exoplayer_controls layout which will be attached to our Exoplayer VideoPlayer:

```xml
<?xml version="1.0" encoding="utf-8"?>
<androidx.constraintlayout.widget.ConstraintLayout xmlns:android="http://schemas.android.com/apk/res/android"
    xmlns:app="http://schemas.android.com/apk/res-auto"
    xmlns:tools="http://schemas.android.com/tools"
    android:layout_width="match_parent"
    android:layout_height="wrap_content"
    android:layout_gravity="bottom"
    android:layoutDirection="ltr"
    android:orientation="vertical">

    <LinearLayout
        android:id="@+id/controlsLayout"
        android:layout_width="match_parent"
        android:layout_height="wrap_content"
        android:background="#CC000000"
        android:gravity="center"
        android:orientation="horizontal"
        app:layout_constraintBottom_toBottomOf="parent">

        <ImageButton
            android:id="@id/exo_prev"
            style="@style/ExoMediaButton.Previous" />

        <ImageButton
            android:id="@id/exo_rew"
            style="@style/ExoMediaButton.Rewind" />

        <ImageButton
            android:id="@id/exo_play"
            style="@style/ExoMediaButton.Play" />

        <ImageButton
            android:id="@id/exo_pause"
            style="@style/ExoMediaButton.Pause" />

        <ImageButton
            android:id="@id/exo_ffwd"
            style="@style/ExoMediaButton.FastForward" />

        <ImageButton
            android:id="@id/exo_next"
            style="@style/ExoMediaButton.Next" />

    </LinearLayout>

    <TextView
        android:id="@id/exo_position"
        android:layout_width="wrap_content"
        android:layout_height="wrap_content"
        android:layout_margin="8dp"
        android:includeFontPadding="false"
        android:textColor="#FFBEBEBE"
        android:textSize="12sp"
        android:textStyle="bold"
        app:layout_constraintBottom_toTopOf="@id/controlsLayout"
        app:layout_constraintStart_toStartOf="parent"
        tools:text="18:20" />

    <com.github.rubensousa.previewseekbar.exoplayer.PreviewTimeBar
        android:id="@+id/exo_progress"
        android:layout_width="0dp"
        android:layout_height="wrap_content"
        android:layout_marginStart="8dp"
        android:layout_marginEnd="8dp"
        app:layout_constraintBottom_toBottomOf="@id/exo_position"
        app:layout_constraintEnd_toStartOf="@id/exo_duration"
        app:layout_constraintStart_toEndOf="@+id/exo_position"
        app:layout_constraintTop_toTopOf="@+id/exo_position"
        app:previewAnimationEnabled="true"
        app:previewFrameLayout="@id/previewFrameLayout"
        app:scrubber_dragged_size="24dp"
        app:scrubber_enabled_size="16dp" />

    <TextView
        android:id="@id/exo_duration"
        android:layout_width="wrap_content"
        android:layout_height="wrap_content"
        android:layout_gravity="bottom"
        android:layout_margin="8dp"
        android:includeFontPadding="false"
        android:textColor="#FFBEBEBE"
        android:textSize="12sp"
        android:textStyle="bold"
        app:layout_constraintBaseline_toBaselineOf="@id/exo_position"
        app:layout_constraintEnd_toEndOf="parent"
        tools:text="25:23" />

    <FrameLayout
        android:id="@+id/previewFrameLayout"
        android:layout_width="0dp"
        android:layout_height="0dp"
        android:layout_marginStart="16dp"
        android:layout_marginEnd="16dp"
        android:layout_marginBottom="16dp"
        android:background="@drawable/video_frame"
        android:visibility="invisible"
        app:layout_constraintBottom_toTopOf="@+id/exo_progress"
        app:layout_constraintDimensionRatio="16:9"
        app:layout_constraintEnd_toEndOf="parent"
        app:layout_constraintHorizontal_bias="0.0"
        app:layout_constraintStart_toStartOf="parent"
        app:layout_constraintWidth_default="percent"
        app:layout_constraintWidth_percent="0.35"
        tools:visibility="visible">

        <ImageView
            android:id="@+id/imageView"
            android:layout_width="match_parent"
            android:layout_height="match_parent"
            android:layout_margin="@dimen/video_frame_width"
            android:scaleType="fitXY" />
    </FrameLayout>

</androidx.constraintlayout.widget.ConstraintLayout>
```

**(c). activity_main.xml**

The MainActivity layout:

```xml
<?xml version="1.0" encoding="utf-8"?>
<androidx.coordinatorlayout.widget.CoordinatorLayout xmlns:android="http://schemas.android.com/apk/res/android"
    xmlns:app="http://schemas.android.com/apk/res-auto"
    xmlns:tools="http://schemas.android.com/tools"
    android:layout_width="match_parent"
    android:layout_height="match_parent"
    android:fitsSystemWindows="true"
    tools:context="com.github.rubensousa.previewseekbar.sample.MainActivity">

    <com.google.android.material.appbar.AppBarLayout
        android:layout_width="match_parent"
        android:layout_height="wrap_content"
        android:theme="@style/AppTheme.AppBarOverlay">

        <androidx.appcompat.widget.Toolbar
            android:id="@+id/toolbar"
            android:layout_width="match_parent"
            android:layout_height="?attr/actionBarSize"
            android:background="?attr/colorPrimary"
            app:popupTheme="@style/AppTheme.PopupOverlay"
            app:title="@string/app_name" />

    </com.google.android.material.appbar.AppBarLayout>

    <androidx.constraintlayout.widget.ConstraintLayout
        android:layout_width="match_parent"
        android:layout_height="match_parent"
        app:layout_behavior="@string/appbar_scrolling_view_behavior">

        <TextView
            android:id="@+id/timeBarSampleTextView"
            android:layout_width="match_parent"
            android:layout_height="wrap_content"
            android:layout_margin="16dp"
            android:gravity="center"
            android:text="@string/preview_timebar"
            app:layout_constraintTop_toTopOf="parent" />

        <com.google.android.exoplayer2.ui.PlayerView
            android:id="@+id/player_view"
            android:layout_width="match_parent"
            android:layout_height="0dp"
            android:layout_marginTop="16dp"
            app:controller_layout_id="@layout/exoplayer_controls"
            app:layout_constraintDimensionRatio="16:9"
            app:layout_constraintTop_toBottomOf="@id/timeBarSampleTextView" />

        <androidx.core.widget.NestedScrollView
            android:layout_width="match_parent"
            android:layout_height="0dp"
            app:layout_constraintBottom_toBottomOf="parent"
            app:layout_constraintTop_toBottomOf="@id/player_view">

            <LinearLayout
                android:layout_width="match_parent"
                android:layout_height="wrap_content"
                android:clipChildren="false"
                android:clipToPadding="false"
                android:orientation="vertical"
                android:padding="16dp">

                <TextView
                    android:layout_width="match_parent"
                    android:layout_height="wrap_content"
                    android:gravity="center"
                    android:text="@string/preview_seekbar" />

                <FrameLayout
                    android:id="@+id/previewFrameLayout"
                    android:layout_width="160dp"
                    android:layout_height="90dp"
                    android:layout_gravity="start"
                    android:layout_marginTop="16dp"
                    android:background="@drawable/video_frame_alternative">

                    <View
                        android:id="@+id/videoView"
                        android:layout_width="match_parent"
                        android:layout_height="match_parent" />

                </FrameLayout>

                <com.github.rubensousa.previewseekbar.PreviewSeekBar
                    android:id="@+id/previewSeekBar"
                    android:layout_width="match_parent"
                    android:layout_height="wrap_content"
                    android:layout_marginTop="24dp"
                    android:max="800"
                    app:previewFrameLayout="@id/previewFrameLayout"
                    app:previewThumbTint="@color/colorAccent" />

                <include
                    layout="@layout/options"
                    android:layout_width="match_parent"
                    android:layout_height="wrap_content"
                    android:layout_marginTop="8dp" />

            </LinearLayout>

        </androidx.core.widget.NestedScrollView>

    </androidx.constraintlayout.widget.ConstraintLayout>

</androidx.coordinatorlayout.widget.CoordinatorLayout>
```

### Step 5: Write Code

**GlideThumbnailTransformation.java**

Create a custom `BitmapTransformation` class to transform and crop our video thumbnails:

```java
import android.graphics.Bitmap;
import androidx.annotation.NonNull;

import com.bumptech.glide.load.engine.bitmap_recycle.BitmapPool;
import com.bumptech.glide.load.resource.bitmap.BitmapTransformation;

import java.nio.ByteBuffer;
import java.security.MessageDigest;

public class GlideThumbnailTransformation extends BitmapTransformation {

    private static final int MAX_LINES = 7;
    private static final int MAX_COLUMNS = 7;
    private static final int THUMBNAILS_EACH = 5000; // milliseconds

    private int x;
    private int y;

    public GlideThumbnailTransformation(long position) {
        int square = (int) position / THUMBNAILS_EACH;
        y = square / MAX_LINES;
        x = square % MAX_COLUMNS;
    }

    private int getX() {
        return x;
    }

    private int getY() {
        return y;
    }

    @Override
    protected Bitmap transform(@NonNull BitmapPool pool, @NonNull Bitmap toTransform,
                               int outWidth, int outHeight) {
        int width = toTransform.getWidth() / MAX_COLUMNS;
        int height = toTransform.getHeight() / MAX_LINES;
        return Bitmap.createBitmap(toTransform, x * width, y * height, width, height);
    }

    @Override
    public void updateDiskCacheKey(MessageDigest messageDigest) {
        byte[] data = ByteBuffer.allocate(8).putInt(x).putInt(y).array();
        messageDigest.update(data);
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;

        GlideThumbnailTransformation that = (GlideThumbnailTransformation) o;

        if (x != that.x) return false;
        return y == that.y;
    }

    @Override
    public int hashCode() {
        int result = x;
        result = 31 * result + y;
        return result;
    }
}
```

**GlideCustomModule.java**

```java
import com.bumptech.glide.annotation.GlideModule;
import com.bumptech.glide.module.AppGlideModule;

@GlideModule
public class GlideCustomModule extends AppGlideModule {

}
```

**ExoPlayerManager.java**

```java

import android.net.Uri;
import android.widget.ImageView;

import com.bumptech.glide.request.target.Target;
import com.github.rubensousa.previewseekbar.PreviewBar;
import com.github.rubensousa.previewseekbar.PreviewLoader;
import com.github.rubensousa.previewseekbar.exoplayer.PreviewTimeBar;
import com.github.rubensousa.previewseekbar.sample.glide.GlideApp;
import com.github.rubensousa.previewseekbar.sample.glide.GlideThumbnailTransformation;
import com.google.android.exoplayer2.Player;
import com.google.android.exoplayer2.SimpleExoPlayer;
import com.google.android.exoplayer2.ui.PlayerView;
import com.google.android.exoplayer2.util.Util;

public class ExoPlayerManager implements PreviewLoader, PreviewBar.OnScrubListener {

    private ExoPlayerMediaSourceBuilder mediaSourceBuilder;
    private PlayerView playerView;
    private SimpleExoPlayer player;
    private PreviewTimeBar previewTimeBar;
    private String thumbnailsUrl;
    private ImageView imageView;
    private boolean resumeVideoOnPreviewStop;
    private Player.EventListener eventListener = new Player.EventListener() {
        @Override
        public void onPlayerStateChanged(boolean playWhenReady, int playbackState) {
            if (playbackState == Player.STATE_READY && playWhenReady) {
                previewTimeBar.hidePreview();
            }
        }
    };

    public ExoPlayerManager(PlayerView playerView,
                            PreviewTimeBar previewTimeBar, ImageView imageView,
                            String thumbnailsUrl) {
        this.playerView = playerView;
        this.imageView = imageView;
        this.previewTimeBar = previewTimeBar;
        this.mediaSourceBuilder = new ExoPlayerMediaSourceBuilder(playerView.getContext());
        this.thumbnailsUrl = thumbnailsUrl;
        this.previewTimeBar.addOnScrubListener(this);
        this.previewTimeBar.setPreviewLoader(this);
        this.resumeVideoOnPreviewStop = true;
    }

    public void play(Uri uri) {
        mediaSourceBuilder.setUri(uri);
    }

    public void onStart() {
        if (Util.SDK_INT > 23) {
            createPlayers();
        }
    }

    public void onResume() {
        if (Util.SDK_INT <= 23) {
            createPlayers();
        }
    }

    public void onPause() {
        if (Util.SDK_INT <= 23) {
            releasePlayers();
        }
    }

    public void onStop() {
        if (Util.SDK_INT > 23) {
            releasePlayers();
        }
    }

    public void setResumeVideoOnPreviewStop(boolean resume) {
        this.resumeVideoOnPreviewStop = resume;
    }

    private void releasePlayers() {
        if (player != null) {
            player.release();
            player = null;
        }
    }

    private void createPlayers() {
        if (player != null) {
            player.release();
        }
        player = createPlayer();
        playerView.setPlayer(player);
        playerView.setControllerShowTimeoutMs(15000);
    }

    private SimpleExoPlayer createPlayer() {
        SimpleExoPlayer player = new SimpleExoPlayer.Builder(playerView.getContext()).build();
        player.setPlayWhenReady(true);
        player.prepare(mediaSourceBuilder.getMediaSource(false));
        player.addListener(eventListener);
        return player;
    }

    @Override
    public void loadPreview(long currentPosition, long max) {
        if (player.isPlaying()) {
            player.setPlayWhenReady(false);
        }
        GlideApp.with(imageView)
                .load(thumbnailsUrl)
                .override(Target.SIZE_ORIGINAL, Target.SIZE_ORIGINAL)
                .transform(new GlideThumbnailTransformation(currentPosition))
                .into(imageView);
    }

    @Override
    public void onScrubStart(PreviewBar previewBar) {
        player.setPlayWhenReady(false);
    }

    @Override
    public void onScrubMove(PreviewBar previewBar, int progress, boolean fromUser) {

    }

    @Override
    public void onScrubStop(PreviewBar previewBar) {
        if (resumeVideoOnPreviewStop) {
            player.setPlayWhenReady(true);
        }
    }

}
```

**ExoPlayerMediaSourceBuilder.java**

```java
import android.content.Context;
import android.net.Uri;

import com.google.android.exoplayer2.C;
import com.google.android.exoplayer2.source.MediaSource;
import com.google.android.exoplayer2.source.ProgressiveMediaSource;
import com.google.android.exoplayer2.source.dash.DashMediaSource;
import com.google.android.exoplayer2.source.hls.HlsMediaSource;
import com.google.android.exoplayer2.source.smoothstreaming.SsMediaSource;
import com.google.android.exoplayer2.upstream.DataSource;
import com.google.android.exoplayer2.upstream.DefaultBandwidthMeter;
import com.google.android.exoplayer2.upstream.DefaultDataSourceFactory;
import com.google.android.exoplayer2.upstream.DefaultHttpDataSourceFactory;
import com.google.android.exoplayer2.util.Util;

public class ExoPlayerMediaSourceBuilder {

    private DefaultBandwidthMeter bandwidthMeter;
    private Context context;
    private Uri uri;
    private int streamType;

    public ExoPlayerMediaSourceBuilder(Context context) {
        this.context = context;
        this.bandwidthMeter = new DefaultBandwidthMeter.Builder(context).build();
    }

    public void setUri(Uri uri) {
        this.uri = uri;
        this.streamType = Util.inferContentType(uri.getLastPathSegment());
    }

    public MediaSource getMediaSource(boolean preview) {
        switch (streamType) {
            case C.TYPE_SS:
                return new SsMediaSource.Factory(new DefaultDataSourceFactory(context, null,
                        getHttpDataSourceFactory(preview))).createMediaSource(uri);
            case C.TYPE_DASH:
                return new DashMediaSource.Factory(new DefaultDataSourceFactory(context, null,
                        getHttpDataSourceFactory(preview))).createMediaSource(uri);
            case C.TYPE_HLS:
                return new HlsMediaSource.Factory(getDataSourceFactory(preview)).createMediaSource(uri);
            case C.TYPE_OTHER:
                return new ProgressiveMediaSource.Factory(getDataSourceFactory(preview)).createMediaSource(uri);
            default: {
                throw new IllegalStateException("Unsupported type: " + streamType);
            }
        }
    }

    private DataSource.Factory getDataSourceFactory(boolean preview) {
        return new DefaultDataSourceFactory(context, preview ? null : bandwidthMeter,
                getHttpDataSourceFactory(preview));
    }

    private DataSource.Factory getHttpDataSourceFactory(boolean preview) {
        return new DefaultHttpDataSourceFactory(Util.getUserAgent(context,
                "ExoPlayerDemo"), preview ? null : bandwidthMeter);
    }
}
```

**MainActivity.java**

```java
import android.net.Uri;
import android.os.Build;
import android.os.Bundle;
import android.util.Log;
import android.view.View;
import android.widget.Button;
import android.widget.RadioGroup;

import androidx.appcompat.app.AppCompatActivity;
import androidx.appcompat.widget.SwitchCompat;

import com.github.rubensousa.previewseekbar.PreviewBar;
import com.github.rubensousa.previewseekbar.PreviewSeekBar;
import com.github.rubensousa.previewseekbar.animator.PreviewFadeAnimator;
import com.github.rubensousa.previewseekbar.animator.PreviewMorphAnimator;
import com.github.rubensousa.previewseekbar.exoplayer.PreviewTimeBar;
import com.github.rubensousa.previewseekbar.sample.exoplayer.ExoPlayerManager;
import com.google.android.exoplayer2.ui.PlayerView;

public class MainActivity extends AppCompatActivity {

    private ExoPlayerManager exoPlayerManager;
    private PreviewTimeBar previewTimeBar;
    private PreviewSeekBar previewSeekBar;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);

        PlayerView playerView = findViewById(R.id.player_view);
        previewTimeBar = playerView.findViewById(R.id.exo_progress);
        previewSeekBar = findViewById(R.id.previewSeekBar);

        previewTimeBar.addOnPreviewVisibilityListener((previewBar, isPreviewShowing) -> {
            Log.d("PreviewShowing", String.valueOf(isPreviewShowing));
        });

        previewTimeBar.addOnScrubListener(new PreviewBar.OnScrubListener() {
            @Override
            public void onScrubStart(PreviewBar previewBar) {
                Log.d("Scrub", "START");
            }

            @Override
            public void onScrubMove(PreviewBar previewBar, int progress, boolean fromUser) {
                Log.d("Scrub", "MOVE to " + progress / 1000 + " FROM USER: " + fromUser);
            }

            @Override
            public void onScrubStop(PreviewBar previewBar) {
                Log.d("Scrub", "STOP");
            }
        });

        exoPlayerManager = new ExoPlayerManager(playerView, previewTimeBar,
                findViewById(R.id.imageView), getString(R.string.url_thumbnails));

        exoPlayerManager.play(Uri.parse(getString(R.string.url_dash)));

        setupOptions();
        requestFullScreenIfLandscape();
    }

    @Override
    public void onWindowFocusChanged(boolean hasFocus) {
        super.onWindowFocusChanged(hasFocus);
        if (hasFocus) {
            requestFullScreenIfLandscape();
        }
    }

    @Override
    public void onStart() {
        super.onStart();
        exoPlayerManager.onStart();
    }

    @Override
    public void onResume() {
        super.onResume();
        exoPlayerManager.onResume();
    }

    @Override
    public void onPause() {
        super.onPause();
        exoPlayerManager.onPause();
    }

    @Override
    public void onStop() {
        super.onStop();
        exoPlayerManager.onStop();
    }

    private void setupOptions() {
        // Enable or disable the previews
        SwitchCompat previewSwitch = findViewById(R.id.previewEnabledSwitch);
        previewSwitch.setOnCheckedChangeListener(
                (buttonView, isChecked) -> {
                    previewTimeBar.setPreviewEnabled(isChecked);
                    previewSeekBar.setPreviewEnabled(isChecked);
                }
        );

        // Enable or disable auto-hide mode of previews
        SwitchCompat previewAutoHideSwitch = findViewById(R.id.previewAutoHideSwitch);
        previewAutoHideSwitch.setOnCheckedChangeListener(
                (buttonView, isChecked) -> {
                    exoPlayerManager.setResumeVideoOnPreviewStop(isChecked);
                    previewTimeBar.setAutoHidePreview(isChecked);
                    previewSeekBar.setAutoHidePreview(isChecked);
                }
        );

        // Change the animations
        RadioGroup animationRadioGroup = findViewById(R.id.previewAnimationRadioGroup);
        animationRadioGroup.setOnCheckedChangeListener((group, checkedId) -> {
            if (checkedId == R.id.noAnimationRadioButton) {
                previewTimeBar.setPreviewAnimationEnabled(false);
                previewSeekBar.setPreviewAnimationEnabled(false);
            } else {
                previewTimeBar.setPreviewAnimationEnabled(true);
                previewSeekBar.setPreviewAnimationEnabled(true);
                if (checkedId == R.id.fadeAnimationRadioButton) {
                    previewTimeBar.setPreviewAnimator(new PreviewFadeAnimator());
                    previewSeekBar.setPreviewAnimator(new PreviewFadeAnimator());
                } else if (Build.VERSION.SDK_INT >= 21) {
                    previewTimeBar.setPreviewAnimator(new PreviewMorphAnimator());
                    previewSeekBar.setPreviewAnimator(new PreviewMorphAnimator());
                }
            }
        });

        // Toggle previews
        Button toggleButton = findViewById(R.id.previewToggleButton);
        toggleButton.setOnClickListener(v -> {
            if (previewTimeBar.isShowingPreview()) {
                previewTimeBar.hidePreview();
            } else {
                previewTimeBar.showPreview();
                exoPlayerManager.loadPreview(previewTimeBar.getProgress(),
                        previewTimeBar.getMax());
            }
            if (previewSeekBar.isShowingPreview()) {
                previewSeekBar.hidePreview();
            } else {
                previewSeekBar.showPreview();
            }
        });

        // Change colors
        Button changeColorsButton = findViewById(R.id.previewToggleColors);
        changeColorsButton.setOnClickListener(v -> {
            final int seekBarColor = previewSeekBar.getScrubberColor();
            final int timeBarColor = previewTimeBar.getScrubberColor();
            previewSeekBar.setPreviewThumbTint(timeBarColor);
            previewSeekBar.setProgressTint(timeBarColor);
            previewTimeBar.setPreviewThumbTint(seekBarColor);
            previewTimeBar.setPlayedColor(seekBarColor);
        });

    }

    private void requestFullScreenIfLandscape() {
        if (getResources().getBoolean(R.bool.landscape)) {
            getWindow().getDecorView().setSystemUiVisibility(
                    View.SYSTEM_UI_FLAG_IMMERSIVE
                            | View.SYSTEM_UI_FLAG_LAYOUT_STABLE
                            | View.SYSTEM_UI_FLAG_LAYOUT_HIDE_NAVIGATION
                            | View.SYSTEM_UI_FLAG_LAYOUT_FULLSCREEN
                            // Hide the nav bar and status bar
                            | View.SYSTEM_UI_FLAG_HIDE_NAVIGATION
                            | View.SYSTEM_UI_FLAG_FULLSCREEN);
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
| 1. | [Download](https://downgit.github.io/#/home?url=https://github.com/rubensousa/PreviewSeekBar/tree/master/sample) Example |
| 2. | [Read](https://github.com/rubensousa/PreviewSeekBar/) more |
| 3. | [Follow](https://github.com/rubensousa/) code author |
