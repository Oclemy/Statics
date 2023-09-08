# Android TimeAnimator Example

Let us look at a Android TimeAnimator example.


## Example 1: TimeAnimator Example

> How to create a TimeAnimation using TimeAnimator and play it using the MedaPlayer.

This example will help you learn the following concepts:

1. How to create a full screen `Activity`.
2. How to play a `TimeAnimation` using MediaPlayer.
3. How to start, pause and resume a MediaPlayer based on the`Activity` state.
4. Learn TimeAnimator via a simple example

Here is the demo screenshot:

![](https://github.com/ziginsider/RevolutionDemo/raw/master/art/capture_revolution.png)

This example will comprise the following files:

- `FullscreenActivity.java`
- `RevolutionAnimationView.java`

### Step 1: Create Project

1. Open your `AndroidStudio` IDE.
2. Go to `File-->New-->Project` to create a new project.

### Step 2: Dependencies

No special dependency is needed.

### Step 3: Design Layouts

***(a). `activity_fullscreen.xml`**

Create a file named `activity_fullscreen.xml` and design it as follows:

```xml
<RelativeLayout xmlns:android="http://schemas.android.com/apk/res/android"
    xmlns:tools="http://schemas.android.com/tools"
    android:layout_width="match_parent"
    android:layout_height="match_parent"
    android:fitsSystemWindows="false"
    tools:context="io.github.ziginsider.revolutiondemo.FullscreenActivity">

    <FrameLayout
        android:id="@+id/animated_view_container"
        android:layout_width="match_parent"
        android:layout_height="match_parent"
        android:background="@color/colorPrimary"
        >

        <io.github.ziginsider.revolutiondemo.RevolutionAnimationView
            android:id="@+id/animated_view"
            android:layout_width="match_parent"
            android:layout_height="match_parent"
            android:layout_gravity="top|center_horizontal"
            android:layout_alignParentTop="true"
            />

        <android.support.v7.widget.AppCompatTextView
            android:layout_width="wrap_content"
            android:layout_height="wrap_content"
            android:layout_gravity="center"
            android:text="Revolution!"
            android:fontFamily="sans-serif-light"
            android:textAppearance="@style/Base.TextAppearance.AppCompat.Display2"
            android:textColor="#66000000"

            />

        <ImageView
            android:layout_width="200dp"
            android:layout_height="300dp"
            android:layout_gravity="bottom|center"
            android:background="@drawable/kremlin_part"
            />

        <LinearLayout
            android:id="@+id/buttons"
            android:layout_width="match_parent"
            android:layout_height="wrap_content"
            android:layout_gravity="bottom|center"
            android:orientation="horizontal"
            android:padding="16dp"
            >

            <android.support.v7.widget.AppCompatButton
                android:id="@+id/btn_pause"
                android:layout_width="0dp"
                android:layout_height="wrap_content"
                android:layout_weight="1"
                android:text="Pause"
                android:textColor="@color/white"
                android:background="@color/colorX"
                />

            <android.support.v4.widget.Space
                android:layout_width="16dp"
                android:layout_height="16dp"
                />

            <android.support.v7.widget.AppCompatButton
                android:id="@+id/btn_resume"
                android:layout_width="0dp"
                android:layout_height="wrap_content"
                android:layout_weight="1"
                android:text="Resume"
                android:textColor="@color/white"
                android:background="@color/colorX"
                />


        </LinearLayout>

    </FrameLayout>

</RelativeLayout>
```

### Step 4: Write Code

Write Code as follows:

***(a). `FullscreenActivity.java`**

Create a file named `FullscreenActivity.java`

Extend the `AppCompatActivity` to create a FullScreenActivity:

```java
public class FullscreenActivity extends AppCompatActivity implements View.OnClickListener {
```

Have our custom `View` object and the MediaPlayer as an instance field:

```java
    private RevolutionAnimationView mAnimationView;

    MediaPlayer mediaPlayer;
```

Override the onCreate callback:

```java
    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
```

Make the current Activity to be a fullscreen one:

```java
        getWindow().getDecorView().setSystemUiVisibility(
                View.SYSTEM_UI_FLAG_LAYOUT_STABLE
                        | View.SYSTEM_UI_FLAG_LAYOUT_FULLSCREEN);
```

Create a mediaplayer to play our animation

```java
        mediaPlayer = MediaPlayer.create(FullscreenActivity.this, R.raw.rodina_shostakovich);
```

Set properties of the MediaPlayer and start it

```java
        mediaPlayer.setLooping(true);
        mediaPlayer.setVolume(1.0f, 1.0f);
        mediaPlayer.start();
```

When the `Activity` is resumed, resume our AnimationView as well and then start the MediaPlayer:

```java
    @Override
    protected void onResume() {
        super.onResume();
        mAnimationView.resume();
        mediaPlayer.start();
    }
```

When our `Activity` is paused.pause the `AnimationView` as well as the MediaPlayer:

```java
    @Override
    protected void onPause() {
        super.onPause();
        mAnimationView.pause();
        mediaPlayer.pause();
    }
```

Handle clicks

```java
    @Override
    public void onClick(View v) {
        switch (v.getId()) {
            case R.id.btn_pause:
                mediaPlayer.pause();
                mAnimationView.pause();
                break;
            case R.id.btn_resume:
                mediaPlayer.start();
                mAnimationView.resume();
                break;
        }
    }
```


Here is the full code

```java
package io.github.ziginsider.revolutiondemo;

import android.media.MediaPlayer;
import android.support.v7.app.AppCompatActivity;
import android.os.Bundle;
import android.view.View;

public class FullscreenActivity extends AppCompatActivity implements View.OnClickListener {
//end
    private RevolutionAnimationView mAnimationView;

    MediaPlayer mediaPlayer;
//end
    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        //end
        getWindow().getDecorView().setSystemUiVisibility(
                View.SYSTEM_UI_FLAG_LAYOUT_STABLE
                        | View.SYSTEM_UI_FLAG_LAYOUT_FULLSCREEN);
        //end
        setContentView(R.layout.activity_fullscreen);

        mAnimationView = (RevolutionAnimationView) findViewById(R.id.animated_view);
        findViewById(R.id.btn_pause).setOnClickListener(this);
        findViewById(R.id.btn_resume).setOnClickListener(this);
        mediaPlayer = MediaPlayer.create(FullscreenActivity.this, R.raw.rodina_shostakovich);
//end
        mediaPlayer.setLooping(true);
        mediaPlayer.setVolume(1.0f, 1.0f);
        mediaPlayer.start();
//end
    }
    @Override
    protected void onResume() {
        super.onResume();
        mAnimationView.resume();
        mediaPlayer.start();
    }
//end
    @Override
    protected void onPause() {
        super.onPause();
        mAnimationView.pause();
        mediaPlayer.pause();
    }
//end
    @Override
    public void onClick(View v) {
        switch (v.getId()) {
            case R.id.btn_pause:
                mediaPlayer.pause();
                mAnimationView.pause();
                break;
            case R.id.btn_resume:
                mediaPlayer.start();
                mAnimationView.resume();
                break;
        }
    }
    //end
}
```

***(c). `RevolutionAnimationView.java`**

Create a file named `RevolutionAnimationView.java`

Import `android.animation.TimeAnimator` among other imports:

```java
import android.animation.TimeAnimator;
import android.content.Context;
import android.graphics.Canvas;
import android.graphics.drawable.Drawable;
import android.os.Build;
import android.support.v4.content.ContextCompat;
import android.util.AttributeSet;
import android.view.View;
import java.util.Random;
```

Extend the `View` class

```java
public class RevolutionAnimationView extends View {
```

Create our `SerpMolot` class and add the following dimensions in `float`:

```java
    private static class SerpMolot {
        private float x;
        private float y;
        private float scale;
        private float alpha;
        private float speed;
    }
```

As instance fields add base speed, base size and play time:

```java
    private float mBaseSpeed;
    private float mBaseSize;
    private long mCurrentPlayTime;
```

Define several constructors for this `View` class

```java
    /** @see View#View(Context) */
    public RevolutionAnimationView(Context context) {
        super(context);
        init();
    }

    /** @see View#View(Context, AttributeSet) */
    public RevolutionAnimationView(Context context, AttributeSet attrs) {
        super(context, attrs);
        init();
    }

    /** @see View#View(Context, AttributeSet, int) */
    public RevolutionAnimationView(Context context, AttributeSet attrs, int defStyle) {
        super(context, attrs, defStyle);
        init();
    }
```

Initialize the Drawable, Base size and base speed inside the `init()` method

```java
    private void init() {
        mDrawable = ContextCompat.getDrawable(getContext(), R.drawable.ic_hammer);
        mBaseSize = Math.max(mDrawable.getIntrinsicWidth(), mDrawable.getIntrinsicHeight()) / 2f;
        mBaseSpeed = BASE_SPEED_DP_PER_S * getResources().getDisplayMetrics().density;
    }
```

Initialize the `SerpMolot`:

```java
    private void initializeSerpMolot(SerpMolot serpMolot, int viewWidth, int viewHeight) {
        // Set the scale based on a min value and a random multiplier
        serpMolot.scale = SCALE_MIN_PART + SCALE_RANDOM_PART * mRnd.nextFloat();

        // Set X to a random value within the width of the view
        serpMolot.x = viewWidth * mRnd.nextFloat();

        // Set Y - start at the bottom of the view
        serpMolot.y = viewHeight;

        // The value Y is in the center of the serpMolot, add the size
        // to make sure it starts outside of the view bound
        serpMolot.y += serpMolot.scale * mBaseSize;

        //Add a random offset to create a small delay before the serpMolot appears again
        serpMolot.y += viewHeight * mRnd.nextFloat() / 4f;

        // The alpha is determined by the scale of the serpMolot and a random multiplier
        serpMolot.alpha = ALPHA_SCALE_PART * serpMolot.scale + ALPHA_RANDOM_PART * mRnd.nextFloat();

        // The bigger and the brighter serpMolot is faster
        serpMolot.speed = mBaseSpeed * serpMolot.alpha * serpMolot.scale;
    }
```

Override the `onDraw()`, passing in the Canvas:

```java
    @Override
    protected void onDraw(Canvas canvas) {
        super.onDraw(canvas);

        final int viewHight = getHeight();
        for( final SerpMolot serpMolot : mSerpMolots) {
            // Ignore the serpMolot if it's outside of the view bounds
            final float serpMolotSize = serpMolot.scale * mBaseSize;
            if (serpMolot.y + serpMolotSize < 0 || serpMolot.y - serpMolotSize > viewHight) {
                continue;
            }

            //Save the current canvas state
            final int save = canvas.save();

            // Move the canvas to the center of the serpMolot
            canvas.translate(serpMolot.x, serpMolot.y);

            //Rotate the canvas based on how far the serpMolot has moved
            final float progress = (serpMolot.y + serpMolotSize) / viewHight;
            canvas.rotate(360 * progress);

            //Prepare the size and alpha of the drawable
            final int size = Math.round(serpMolotSize);
            mDrawable.setBounds(-size, -size, size, size);
            mDrawable.setAlpha(Math.round(255 * serpMolot.alpha));

            // Draw the serpMolot to the canvas
            mDrawable.draw(canvas);

            // Restore the canvas to it's previous position and rotation
            canvas.restoreToCount(save);
        }
    }
```


Here is the full code

```java
package io.github.ziginsider.revolutiondemo;
import android.animation.TimeAnimator;
import android.content.Context;
import android.graphics.Canvas;
import android.graphics.drawable.Drawable;
import android.os.Build;
import android.support.v4.content.ContextCompat;
import android.util.AttributeSet;
import android.view.View;
import java.util.Random;
//end
public class RevolutionAnimationView extends View {
//end
    private static class SerpMolot {
        private float x;
        private float y;
        private float scale;
        private float alpha;
        private float speed;
    }
    //end
    private float mBaseSpeed;
    private float mBaseSize;
    private long mCurrentPlayTime;
//end
    public static final int SEED = 1337;
    public static final int COUNT = 32;
    public static final int BASE_SPEED_DP_PER_S = 200;


    /** The minimum scale of a SerpMolot */
    public static final float SCALE_MIN_PART = 0.45f;
    /** How much of the scale that's based on randomness */
    public static final float SCALE_RANDOM_PART = 0.55f;
    /** How much of the alpha that's based on the scale of the star */
    private static final float ALPHA_SCALE_PART = 0.5f;
    /** How much of the alpha that's based on randomness */
    private static final float ALPHA_RANDOM_PART = 0.5f;

    private final Random mRnd = new Random(SEED);
    private final SerpMolot[] mSerpMolots = new SerpMolot[COUNT];

    private TimeAnimator mTimeAnimator;
    private Drawable mDrawable;

    /** @see View#View(Context) */
    public RevolutionAnimationView(Context context) {
        super(context);
        init();
    }

    /** @see View#View(Context, AttributeSet) */
    public RevolutionAnimationView(Context context, AttributeSet attrs) {
        super(context, attrs);
        init();
    }

    /** @see View#View(Context, AttributeSet, int) */
    public RevolutionAnimationView(Context context, AttributeSet attrs, int defStyle) {
        super(context, attrs, defStyle);
        init();
    }
//end
    private void init() {
        mDrawable = ContextCompat.getDrawable(getContext(), R.drawable.ic_hammer);
        mBaseSize = Math.max(mDrawable.getIntrinsicWidth(), mDrawable.getIntrinsicHeight()) / 2f;
        mBaseSpeed = BASE_SPEED_DP_PER_S * getResources().getDisplayMetrics().density;
    }
//end
    private void initializeSerpMolot(SerpMolot serpMolot, int viewWidth, int viewHeight) {
        // Set the scale based on a min value and a random multiplier
        serpMolot.scale = SCALE_MIN_PART + SCALE_RANDOM_PART * mRnd.nextFloat();

        // Set X to a random value within the width of the view
        serpMolot.x = viewWidth * mRnd.nextFloat();

        // Set Y - start at the bottom of the view
        serpMolot.y = viewHeight;

        // The value Y is in the center of the serpMolot, add the size
        // to make sure it starts outside of the view bound
        serpMolot.y += serpMolot.scale * mBaseSize;

        //Add a random offset to create a small delay before the serpMolot appears again
        serpMolot.y += viewHeight * mRnd.nextFloat() / 4f;

        // The alpha is determined by the scale of the serpMolot and a random multiplier
        serpMolot.alpha = ALPHA_SCALE_PART * serpMolot.scale + ALPHA_RANDOM_PART * mRnd.nextFloat();

        // The bigger and the brighter serpMolot is faster
        serpMolot.speed = mBaseSpeed * serpMolot.alpha * serpMolot.scale;
    }
//end
    @Override
    protected void onDraw(Canvas canvas) {
        super.onDraw(canvas);

        final int viewHight = getHeight();
        for( final SerpMolot serpMolot : mSerpMolots) {
            // Ignore the serpMolot if it's outside of the view bounds
            final float serpMolotSize = serpMolot.scale * mBaseSize;
            if (serpMolot.y + serpMolotSize < 0 || serpMolot.y - serpMolotSize > viewHight) {
                continue;
            }

            //Save the current canvas state
            final int save = canvas.save();

            // Move the canvas to the center of the serpMolot
            canvas.translate(serpMolot.x, serpMolot.y);

            //Rotate the canvas based on how far the serpMolot has moved
            final float progress = (serpMolot.y + serpMolotSize) / viewHight;
            canvas.rotate(360 * progress);

            //Prepare the size and alpha of the drawable
            final int size = Math.round(serpMolotSize);
            mDrawable.setBounds(-size, -size, size, size);
            mDrawable.setAlpha(Math.round(255 * serpMolot.alpha));

            // Draw the serpMolot to the canvas
            mDrawable.draw(canvas);

            // Restore the canvas to it's previous position and rotation
            canvas.restoreToCount(save);
        }
    }
//end
    @Override
    protected void onSizeChanged(int w, int h, int oldw, int oldh) {
        super.onSizeChanged(w, h, oldw, oldh);

        // The starting position is dependent on the size of the view,
        // which is why the model is initialized here, when the view is measured.
        for (int i = 0; i < mSerpMolots.length; i++) {
            final SerpMolot serpMolot = new SerpMolot();
            initializeSerpMolot(serpMolot, w, h);
            mSerpMolots[i] = serpMolot;
        }
    }

    @Override
    protected void onAttachedToWindow() {
        super.onAttachedToWindow();

        mTimeAnimator = new TimeAnimator();
        mTimeAnimator.setTimeListener(new TimeAnimator.TimeListener() {
            @Override
            public void onTimeUpdate(TimeAnimator animation, long totalTime, long deltaTime) {
                if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.KITKAT) {
                    if (!isLaidOut()) {
                        // Ignore all calls before the view has been measured and laid out.
                        return;
                    }
                }
                updateState(deltaTime);
                invalidate();
            }
        });
        mTimeAnimator.start();
    }

    @Override
    protected void onDetachedFromWindow() {
        super.onDetachedFromWindow();

        mTimeAnimator.cancel();
        mTimeAnimator.setTimeListener(null);
        mTimeAnimator.removeAllListeners();
        mTimeAnimator = null;
    }

    /**
     * Progress the animation by moving the stars based on the elapsed time
     * @param deltaMs time delta since the last frame, in millis
     */
    private void updateState(float deltaMs) {
        // Converting to seconds since PX/S constants are easier to understand
        final float deltaSeconds = deltaMs / 1000f;
        final int viewWidth = getWidth();
        final int viewHeight = getHeight();

        for (final SerpMolot serpMolot : mSerpMolots) {
            // Move the serpMolot based on the elapsed time and it's speed
            serpMolot.y -= serpMolot.speed * deltaSeconds;

            // If the serpMolot is completely outside of the view bounds after
            // updating it's position, recycle it.
            final float size = serpMolot.scale * mBaseSize;
            if (serpMolot.y + size < 0) {
                initializeSerpMolot(serpMolot, viewWidth, viewHeight);
            }
        }
    }

    /**
     * Pause the animation if it's running
     */
    public void pause() {
        if (mTimeAnimator != null && mTimeAnimator.isRunning()) {
            // Store the current play time for later.
            mCurrentPlayTime = mTimeAnimator.getCurrentPlayTime();
            if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.KITKAT) {
                mTimeAnimator.pause();
            }
        }
    }

    /**
     * Resume the animation if not already running
     */
    public void resume() {
        if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.KITKAT) {
            if (mTimeAnimator != null && mTimeAnimator.isPaused()) {
                mTimeAnimator.start();
                // Why set the current play time?
                // TimeAnimator uses timestamps internally to determine the delta given
                // in the TimeListener. When resumed, the next delta received will the whole
                // pause duration, which might cause a huge jank in the animation.
                // By setting the current play time, it will pick of where it left off.
                mTimeAnimator.setCurrentPlayTime(mCurrentPlayTime);
            }
        }
    }
}
```


### Run

Simply copy the source code into your Android Project,Build and Run. 

### Reference

> Download code [here](https://github.com/ziginsider/RevolutionDemo).
> Follow code author [here](https://github.com/ziginsider/).


