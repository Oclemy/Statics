# ScratchCard Example


Hello. In this tutorial we will explore everything related to Scratch card creation in android.


## Example 1: Creating Android ScratchCard without any Library

_Android ScratchCard Creation Tutorial using Paint class_

We want to create a cool custom view called ScratchCard. As the name suggests, user scratches the card to reveal a random code/digit in this case. By default that code is hidden and you only view it after scratching the card.

You only need to scratch upto a certain percentage of the ScratchCard. Then automatically the rest gets scratched for you. Of course you can specify the percentage of scratching you want the user to do.

In our case you scratch until the code is visible then the other parts get scratched for you.

Thanks to this [project](https://github.com/myinnos/AndroidScratchCard) as I learnt and adapted code from it.

This ScratchCard is constructed based on the View class and we use Paint and Canvas from the graphics package.

##### Demo

Here's the gif demo of the project:

![ScratchCard View](https://camposha.info/wp-content/uploads/2019/04/demo1-27.gif)

ScratchCard View

##### Video Tutorial(Recommended)

Here's the video tutorial. I recommend you watch the video tutorial as it contains explantions on step by step process of how to create this. For example you need to create an `attrs.xml` in your values resources folder and those are the types of things you see in the video tutorial.

#### Gradle Scripts

##### (a) Build.gradle

Nothing special. No third party dependency. We only add AppCompat support library as our main [activity](https://camposha.info/android/activity) will be deriving from AppCompatActivity.

```groovy
dependencies {
    implementation fileTree(dir: 'libs', include: ['*.jar'])
    testImplementation 'junit:junit:4.12'
    implementation 'com.android.support:appcompat-v7:28.0.0'
}
```

#### Layouts

Lets start by exploring the layouts in this project.

We have seven layouts:

##### (a). activity_main.xml

Our main activity's layout. We will add our scratch card here as well as some TextViews.

```xml
<?xml version="1.0" encoding="utf-8"?>
<RelativeLayout

    android_layout_width="match_parent"
    android_layout_height="match_parent"
    android_gravity="center"
    tools_context=".MainActivity">

        <View
            android_layout_width="240dp"
            android_layout_height="150dp"
            android_layout_centerInParent="true"
            android_background="@color/colorPrimary" />

        <LinearLayout
            android_layout_width="240dp"
            android_layout_height="150dp"
            android_layout_centerInParent="true"
            android_gravity="center"
            android_orientation="vertical">

            <TextView
                android_layout_width="match_parent"
                android_layout_height="wrap_content"
                android_gravity="center"
                android_text="Load below Code"
                android_textColor="#000"
                android_textStyle="bold" />

            <TextView
                android_id="@+id/codeTxt"
                android_layout_width="match_parent"
                android_layout_height="wrap_content"
                android_gravity="center"
                android_text="0000-0000-0000-0000"
                android_textColor="#fff"
                android_textSize="20sp"
                android_textStyle="bold" />

        </LinearLayout>

        <info.camposha.mrscratchcard.ScratchCard
            android_id="@+id/scratchCard"
            android_layout_width="240dp"
            android_layout_height="150dp"
            android_layout_centerInParent="true"
            android_layout_gravity="center"
            android_visibility="visible" />

</RelativeLayout>
```

[notice] Make sure the layout_width and layout_height for the `View` and the `ScratchCard` in the above code are identical. [/notice]

#### Value Resources

Create an `attrs.xml` in your values resource folder:

##### (a). attrs.xml

The attributes specified in the below code will be referenced by our `resolveAttrs()` method in the `ScratchCard.java` file.

```xml
<?xml version="1.0" encoding="utf-8"?>
<resources>

    <declare-styleable name="ScratchCard">
        <attr name="scratchDrawable" format="reference|color" />
        <attr name="scratchWidth" format="dimension" />
    </declare-styleable>

</resources>
```

##### 2\. out.xml

```xml
<?xml version="1.0" encoding="utf-8"?>
<set >
    <translate
        android_duration="@android:integer/config_mediumAnimTime"
        android_fromYDelta="0"
        android_toYDelta="-50%p"/>
    <alpha
        android_duration="@android:integer/config_mediumAnimTime"
        android_fromAlpha="1.0"
        android_toAlpha="0.0"/>
</set>
```

#### Java Code.

We have the following java classes for this project:

1. Utils.java
2. ScratchCard.java
3. MainActivity.java

##### 1\. Utils.java

This file will contain our utility methods. Among them include method for converting density independent pixels to pixels, method for generating a code part and method for returning the whole generated code.

```java
package info.camposha.mrscratchcard;

import android.content.Context;

import java.util.Random;

public class Utils {
    static Random r =new Random();

    /**
     * Let's create a method to convert density independent pixels to
     * pixels.
     * @param context
     * @param dipValue
     * @return
     */
    public static float dipToPx(Context context, float dipValue) {
        float density = context.getResources().getDisplayMetrics().density;
        return dipValue * density;
    }

    /**
     * This method will generate code parts based on the specified
     * min and max values
     * @param min
     * @param max
     * @return
     */
    private static String generateCodePart(int min,int max){
        int temp;
        if(min > max){
            temp = min;
            max = min;
            min = temp;
        }
        return String.valueOf((r.nextInt(max - min) + 1)+min);
    }

    /**
     * Let's create a method that will generate our code and return it
     * @return - code string
     */
    public static String generateNewCode(){
        String firstCodePart = generateCodePart(1000,9999);
        String secondCodePart = generateCodePart(1000,9999);
        String thirdCodePart = generateCodePart(1000,9999);
        String fourthCodePart = generateCodePart(1000,9999);

        return firstCodePart + "-"+secondCodePart+"-"+thirdCodePart+"-"+fourthCodePart;
    }

}
//end
```

##### 2\. ScratchCard.java

This is the meat of this project. Basically it's a custom view we are creating. We use several objects from the `android.graphics` package to draw our `ScratchCard`. Furthermore we create an interface providing us with a method that will allow us listen to `Scratch` events.

Let's go.

```java
package info.camposha.mrscratchcard;

import android.content.Context;
import android.content.res.TypedArray;
import android.graphics.Bitmap;
import android.graphics.Canvas;
import android.graphics.Paint;
import android.graphics.Path;
import android.graphics.PorterDuff;
import android.graphics.PorterDuffXfermode;
import android.graphics.drawable.Drawable;
import android.util.AttributeSet;
import android.view.MotionEvent;
import android.view.View;

public class ScratchCard extends View {

    private Drawable mDrawable;
    private float mScratchWidth;
    private Bitmap mBitmap;
    //A `Canvas` is a class holds the "draw" calls. To draw something, you
    // need 4 basic components: 1. A Bitmap to hold the pixels, 2. a Canvas
    // to host the draw calls (writing into the bitmap), 3. a drawing
    // primitive (e.g. Rect, Path, text, Bitmap), and 4. a paint
    // (to describe the colors and styles for the drawing).
    private Canvas mCanvas;
    //`Path` is a class that encapsulates compound geometric paths
    // comprising straight line segments, quadratic curves, and cubic curves.
    private Path mPath;
    //`Paint` is a class that holds the style and color information about
    // how to draw geometries, text and bitmaps.
    private Paint mInnerPaint;
    private Paint mOuterPaint;
    private OnScratchListener mListener;
    /**
     * We start by defining an OnScratchListener interface. It has a
     * method signature of the method we will implement.
     */
    public interface OnScratchListener {
        void onScratch(ScratchCard scratchCard, float visiblePercent);
    }

    /**
     * Then three constructors both with a super() method.
     * @param context
     * @param attrs
     * @param defStyle
     */
    public ScratchCard(Context context, AttributeSet attrs, int defStyle) {
        super(context, attrs, defStyle);
        resolveAttr(context, attrs);
    }
    public ScratchCard(Context context, AttributeSet attrs) {
        super(context, attrs);
        resolveAttr(context, attrs);
    }
    public ScratchCard(Context context) {
        super(context);
        resolveAttr(context, null);
    }
    /**
     * In our attrs.xml we have defined drawable and scratch width. Let's
     * reference them.
     * @param context
     * @param attrs
     */
    private void resolveAttr(Context context, AttributeSet attrs) {
        TypedArray typedArray = context.obtainStyledAttributes(attrs, R.styleable.ScratchCard);
        mDrawable = typedArray.getDrawable(R.styleable.ScratchCard_scratchDrawable);
        mScratchWidth = typedArray.getDimension(R.styleable.ScratchCard_scratchWidth, Utils.dipToPx(context, 20));
        typedArray.recycle();
    }

    /**
     * Let's now create several public methods that can be used with
     * our ScratchCard
     * @param drawable - Drawable object
     */
    public void setScratchDrawable(Drawable drawable) {
        mDrawable = drawable;
    }
    public void setScratchWidth(float width) {
        mScratchWidth = width;
    }
    public void setOnScratchListener(OnScratchListener listener) {
        mListener = listener;
    }

    /**
     * If the size of our ScratchCard changes.
     * @param width - new width
     * @param height - new height
     * @param oldWidth - oldWidth
     * @param oldHeight - old height
     */
    @Override
    protected void onSizeChanged(int width, int height, int oldWidth, int oldHeight) {
        super.onSizeChanged(width, height, oldWidth, oldHeight);

        if (mBitmap != null)
            mBitmap.recycle();

        mBitmap = Bitmap.createBitmap(width, height, Bitmap.Config.ARGB_8888);
        mCanvas = new Canvas(mBitmap);

        if (mDrawable != null) {
            mDrawable.setBounds(0, 0, mBitmap.getWidth(), mBitmap.getHeight());
            mDrawable.draw(mCanvas);
        } else {
            mCanvas.drawColor(0xFFC0C0C0);
        }

        if (mPath == null) {
            mPath = new Path();
        }

        if (mInnerPaint == null) {
            mInnerPaint = new Paint();
            mInnerPaint.setAntiAlias(true);
            mInnerPaint.setDither(true);
            mInnerPaint.setStyle(Paint.Style.STROKE);
            mInnerPaint.setFilterBitmap(true);
            mInnerPaint.setStrokeJoin(Paint.Join.ROUND);
            mInnerPaint.setStrokeCap(Paint.Cap.ROUND);
            mInnerPaint.setStrokeWidth(mScratchWidth);
            mInnerPaint.setXfermode(new PorterDuffXfermode(PorterDuff.Mode.CLEAR));
        }

        if (mOuterPaint == null) {
            mOuterPaint = new Paint();
        }
    }

    private float mLastTouchX;
    private float mLastTouchY;

    /**
     * Now we need to implement a method to allow us handle touch screen
     * motion events.
     * @param event - MotionEvent, an Object used to report movement
     *             (mouse, pen, finger, trackball) events.
     * @return
     */
    @Override
    public boolean onTouchEvent(MotionEvent event) {
        float currentTouchX = event.getX();
        float currentTouchY = event.getY();

        switch (event.getAction()) {
            case MotionEvent.ACTION_DOWN:
                mPath.reset();
                mPath.moveTo(event.getX(), event.getY());
                break;
            case MotionEvent.ACTION_MOVE:
                float dx = Math.abs(currentTouchX - mLastTouchX);
                float dy = Math.abs(currentTouchY - mLastTouchY);
                if (dx >= 4 || dy >= 4) {
                    float x1 = mLastTouchX;
                    float y1 = mLastTouchY;
                    float x2 = (currentTouchX + mLastTouchX) / 2;
                    float y2 = (currentTouchY + mLastTouchY) / 2;
                    mPath.quadTo(x1, y1, x2, y2);
                }
                break;
            case MotionEvent.ACTION_UP:
                mPath.lineTo(currentTouchX, currentTouchY);
                if (mListener != null) {
                    int width = mBitmap.getWidth();
                    int height = mBitmap.getHeight();
                    int total = width * height;
                    int count = 0;
                    for (int i = 0; i < width; i += 3) {
                        for (int j = 0; j < height; j += 3) {
                            if (mBitmap.getPixel(i, j) == 0x00000000)
                                count++;
                        }
                    }
                    mListener.onScratch(this, ((float) count) / total * 9);
                }
                break;
        }

        mCanvas.drawPath(mPath, mInnerPaint);

        mLastTouchX = currentTouchX;
        mLastTouchY = currentTouchY;

        //Invalidate the whole view.
        invalidate();
        return true;
    }

    /**
     * Now we implement a method allowing us do the drawing.
     * @param canvas - Canvas Object
     */
    @Override
    protected void onDraw(Canvas canvas) {
        canvas.drawBitmap(mBitmap, 0, 0, mOuterPaint);
        super.onDraw(canvas);
    }

    /**
     * Let's override a method to be called when the view is detached from a window.
     */
    @Override
    protected void onDetachedFromWindow() {
        super.onDetachedFromWindow();
        if (mBitmap != null) {
            mBitmap.recycle();
            mBitmap = null;
        }
    }

}
//end
```

##### (c). MainActivity.java

This class will allow us to implement or use the ScratchCard we've just created. When you start the main activity, the scratchcard will be in unscratched mode, then you scratch it to reveal the code:

```java
package info.camposha.mrscratchcard;

import android.os.Bundle;
import android.support.v7.app.AppCompatActivity;
import android.view.View;
import android.widget.TextView;
import android.widget.Toast;

public class MainActivity extends AppCompatActivity {

    private TextView codeTxt;
    private ScratchCard mScratchCard;

    /**
     *  Let's create a method to initialize widgets
     */
    private void initializeWigets(){
        codeTxt = findViewById(R.id.codeTxt);
        mScratchCard = findViewById(R.id.scratchCard);
        codeTxt.setText(Utils.generateNewCode());
    }

    /**
     * Let's create a method to scratch.
     * @param isScratched
     */
    private void scratch(boolean isScratched){
        if(isScratched){
            mScratchCard.setVisibility(View.INVISIBLE);
        }else{
            mScratchCard.setVisibility(View.VISIBLE);
        }
    }

    /**
     * Handle scratch listenes
     */
    private void handleListeners(){
        mScratchCard.setOnScratchListener(new ScratchCard.OnScratchListener() {
            @Override
            public void onScratch(ScratchCard scratchCard, float visiblePercent) {
                if (visiblePercent > 0.3) {
                    scratch(true);
                    Toast.makeText(MainActivity.this, "Code Visible Now", Toast.LENGTH_SHORT).show();
                }
            }
        });

    }

    /**
     * Our onCreate callback
     * @param savedInstanceState
     */
    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);

        this.initializeWigets();
        this.handleListeners();
    }
}
//end
```

##### Download

You can download the full source code below or watch the video from the link provided.
