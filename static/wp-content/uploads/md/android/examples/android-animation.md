# Android Animation Tutorial and Examples


_Android Animation Tutorial and Examples._

Generally speaking, an animtion is a dynamic medium in which images or objects are manipulated to appear as moving images.


Android provides us a wealth of APIs we can use for animating various View objects.So whenever the user interface changes in response to user action, we should strive to animate the layout transitions. Animations are important as they provide users with feedback on their actions. This helps keep them oriented to the UI.

To easily animate changes between two view hierarchies, we can use the Android Transitions Framework. This framework animates us the views at runtime. It does this by changing some of the property values of those views over time. We get built-in animations for common effects. Furthermore through this Framework we can create custom animations and transition lifecycle callbacks.

We can visual cues via animations. These then can notify users about what's going on in our app. Especially when the User Interface changes state, such as when new content loads or new actions become available.

Android provides us with various animation APIs.

#### (a). Bitmap Animations

Android provides drawable animation APIs. These APIs are in most cases defined statically with a drawable resource. However we can also define them at runtime. These animation APIs allow us animate bitmaps.

![Android Bitmap Animation](https://developer.android.com/training/animation/videos/drawable-animation.gif)

Find more details [here](https://developer.android.com/guide/topics/graphics/drawable-animation).

#### (b). UI Visibility and Motion Animations

Alot of times you need to manipulate the visibility or position of views within a layout. In that case you should include subtle animations to help the user understand how the UI is changing.

For instance you can:

1. move.
2. reveal.
3. hideviews.For that you can use the property animation system provided by the `android.animation` package. This package is available in `Android 3.0 (API level 11)` and higher. These APIs work by updating the properties of our View objects over a period of time. Thus the views are continuously redrawn as the properties change.

Find more documentation [here](https://developer.android.com/training/animation/layout.html).

#### (c). Physics-based motion

You can create animations by applying real-world physics.This makes those animations natural-looking. For example, they should maintain momentum when their target changes, and make smooth transitions during any changes.

Android Support Library gives us the APIs for creating these animations. Those APIs do actually apply the laws of physics to control how your animations occur.

#### (d). Layout Animations

The Transition Framework allows us to create animations when we swap the layout within the current activity of fragment. However this is only applicable in `Android 4.4(API Level 19)` and above.

To do this you specify the starting and ending layout, and what type of animation you want to use. The system will then figure out and executes an animation between the two layouts. You can use this to swap out the entire UI or to move/replace just some views.

#### (e). Activities Animation

You can also create animations that transition between activities. This is only applicable to `Android 5.0 (API level 21)` and higher. Again this is based on the same transition framework described above to animate layout changes. However in this case it allows us to create animations between layouts in separate activities.

We can apply simple animations such as sliding the new activity in from the side or fading it in. We can also create animations that transition between shared views in each activity.

You call `startActivity()`, but pass it a bundle of options provided by `ActivityOptions.makeSceneTransitionAnimation()`. This bundle of options may include which views are shared between the activities so the transition framework can connect them during the animation.

## ObjectAnimator

_Android ObjectAnimator Tutorial and Examples._

ObjectAnimator is a class that allows properties on target objects. This class derives from `android.animation.ValueAnimator`.

That `ValueAnimator` is responsible for provision a simple timing engine for running animations which calculate animated values and set them on target objects.

Through the constructors of our `ObjectAnimator`, we pass the target object that need to be animated. We also pass the name of the property to be animated.

#### ObjectAnimator API Definition

`ObjectAnimator` derives from the `ValueAnimator` class. Both reside in the `android.animation` package:

```java
public final class ObjectAnimator
extends ValueAnimator
```

Here's it's inheritance tee:

```java
java.lang.Object
   ↳    android.animation.Animator
       ↳    android.animation.ValueAnimator
           ↳    android.animation.ObjectAnimator
```

#### Setting Animations

You can set animations in both code and static xml resource. Here's an example of setting it using xml:

```xml
<objectAnimator
    android_duration="1000"
    android_valueTo="200"
    android_valueType="floatType"
    android_propertyName="y"
    android_repeatCount="1"
    android_repeatMode="reverse"/>
```

To see how to set in code, proceed to the examples below.

#### Quick ObjectAnimator Examples

##### 1\. How to Fade in and Fade Out a View using ObjectAnimator

Our aim is to create methods that allow us fade in and fade out.

First let's create an interface `AnimationListener`:

```java
public interface AnimationListener {

    /**
     * We need to make our View visible
     * before fade in animation starts
     */
    interface OnAnimationStartListener{
        void onAnimationStart();
    }

    /**
     * We need to make View invisible
     * after fade out animation ends.
     */
    interface OnAnimationEndListener{
        void onAnimationEnd();
    }

}
```

You can see that's an interface with two method signatures: `onAnimationStart()` and `onAnimationEnd()`.

Then here's the method that fade in a view:

```java
    /**
     * View will appear on screen with
     * fade in animation. Notifies onAnimationStartListener
     * when fade in animation is about to start.
     *
     * @param view
     * @param duration
     * @param onAnimationStartListener
     */
    public static void animateFadeIn(View view, long duration, final AnimationListener.OnAnimationStartListener onAnimationStartListener) {
        ObjectAnimator objectAnimator = ObjectAnimator.ofFloat(view, "alpha", 0f, 1f);
        objectAnimator.setDuration(duration);
        objectAnimator.addListener(new Animator.AnimatorListener() {
            @Override
            public void onAnimationStart(Animator animation) {
                if (onAnimationStartListener != null)
                    onAnimationStartListener.onAnimationStart();
            }

            @Override
            public void onAnimationEnd(Animator animation) {

            }

            @Override
            public void onAnimationCancel(Animator animation) {

            }

            @Override
            public void onAnimationRepeat(Animator animation) {

            }
        });
        objectAnimator.start();
    }
```

We've initialized the `ObjectAnimator` by invoking the static `ofFloat()` method. We then set the duration, a long which we received via our method as a parameter. To set the duration we've used the `setDuration()` method.

Then added our `AnimatorListener`, where we invoke our custom `AnimationListener.onAnimationStart()` method inside the `onAnimationStart()` method of the `android.animation.Animator` class.

Then what about fading out?

well agan we use `ObjectAnimator` class. The difference is that this time we are invoking the `onAnimationEnd()` from our custom`AnimationListener` interface and do it inside the `Animator.OnAnimationEnd()` from the `android.animation` package.

```java
/**
     * View will disappear from screen with
     * fade out animation. Notifies onAnimationEndListener
     * when fade out animation is ended.
     *
     * @param view
     * @param duration
     * @param onAnimationEndListener
     */
    public static void animateFadeOut(View view, long duration, final AnimationListener.OnAnimationEndListener onAnimationEndListener) {
        ObjectAnimator objectAnimator = ObjectAnimator.ofFloat(view, "alpha", 1, 0);
        objectAnimator.setDuration(duration);
        objectAnimator.addListener(new Animator.AnimatorListener() {
            @Override
            public void onAnimationStart(Animator animation) {

            }

            @Override
            public void onAnimationEnd(Animator animation) {
                if (onAnimationEndListener != null)
                    onAnimationEndListener.onAnimationEnd();
            }

            @Override
            public void onAnimationCancel(Animator animation) {

            }

            @Override
            public void onAnimationRepeat(Animator animation) {

            }
        });
        objectAnimator.start();
    }
```

## Kotlin Android Bouncing Balls Animation Example

> Step by Step Android Bouncing Balls Animation Example

This tutorial uses several different kinds of `ObjectAnimator` to animate bouncing color changing balls. When `onTouchEvent` is called with either a `MotionEvent.ACTION_DOWN` or `MotionEvent.ACTION_MOVE`, a ball of random color is added at the events `event.getX()`, `event.getY()` coordinates.

The ball motion and geometry is animated then an animator of the balls alpha is played fading it out from an alpha of `1.0` to `0.0` in `250` milliseconds The `onAnimationEnd` callback of the fade animation is set to an AnimatorListenerAdapter which removes the ball when the animation is done.

Let's start.

### Step 1: Create Project

Start by creating Android Studio project.

### Step 2: Register Activity

Register the activity we will be creating in `AndroidManifest.xml`. The activity is called `BouncingBalls`, so you register it as follows:

```xml
        <activity
            android:name=".animation.BouncingBalls"
            android:enabled="@bool/atLeastHoneycomb"
            android:label="Animation/Bouncing Balls"
            android:theme="@style/Theme.AppCompat.Light">
            <intent-filter>
                <action android:name="android.intent.action.MAIN" />
                <category android:name="android.intent.category.SAMPLE_CODE" />
            </intent-filter>
        </activity>
```

### Step 3: Design Layout

Here is the layout we will use:

**bouncing_balls.xml**

```xml
<?xml version="1.0" encoding="utf-8"?>
<LinearLayout xmlns:android="http://schemas.android.com/apk/res/android"
    android:orientation="vertical"
    android:layout_width="match_parent"
    android:layout_height="match_parent"
    android:id="@+id/container"
    >
</LinearLayout>
```

### Step 4: Write Code

Create a ShapeHolder:

**ShapeHolder.kt**

```kotlin

import android.graphics.Paint
import android.graphics.RadialGradient
import android.graphics.drawable.ShapeDrawable

/**
 * A data structure that holds a Shape and various properties that can be used to define
 * how the shape is drawn.
 */
class ShapeHolder
/**
 * Constructor which initializes a ShapeHolder instance's Shape shape with a ShapeDrawable s
 *
 * @param shape ShapeDrawable that the ShapeHolder will contain
 */
(
        /**
         * The `ShapeDrawable` object we are holding.
         */
        var shape: ShapeDrawable?) {
    /**
     * Our x coordinate.
     */
    var x = 0f
    /**
     * Our y coordinate.
     */
    var y = 0f
    /**
     * Color of the `ShapeDrawable` object we are holding.
     */
    var color: Int = 0
        set(value) {
            shape!!.paint.color = value
            field = value
        }
    /**
     * `RadialGradient` of the `ShapeDrawable` object we are holding.
     */
    var gradient: RadialGradient? = null
    /**
     * Alpha of the `ShapeDrawable` object we are holding.
     */
    private var alpha = 1f
    /**
     * `Paint` of the `ShapeDrawable` object we are holding.
     */
    var paint: Paint? = null

    /**
     * The width of the Shape contained in the ShapeHolder
     */
    var width: Float
        get() = shape!!.shape.width
        set(width) {
            val s = shape!!.shape
            s.resize(width, s.height)
        }

    /**
     * The height of the Shape contained in the ShapeHolder
     */
    var height: Float
        get() = shape!!.shape.height
        set(height) {
            val s = shape!!.shape
            s.resize(s.width, height)
        }

    /**
     * Set the alpha value of the ShapeHolder and the Shape it contains
     *
     * @param alpha alpha value to use
     */
    fun setAlpha(alpha: Float) {
        this.alpha = alpha
        shape!!.alpha = (alpha * 255f + .5f).toInt()
    }
}
```

Create a file called `BouncingBalls.kt`.

Start by adding imports:

```kotlin
import android.animation.Animator
import android.animation.AnimatorListenerAdapter
import android.animation.AnimatorSet
import android.animation.ArgbEvaluator
import android.animation.ObjectAnimator
import android.animation.ValueAnimator
import android.annotation.SuppressLint
import android.annotation.TargetApi
import android.content.Context
import android.graphics.Canvas
import android.graphics.RadialGradient
import android.graphics.Shader
import android.graphics.drawable.ShapeDrawable
import android.graphics.drawable.shapes.OvalShape
import android.os.Build
import android.os.Bundle
import android.view.MotionEvent
import android.view.View
import android.view.animation.AccelerateInterpolator
import android.view.animation.DecelerateInterpolator
import android.widget.LinearLayout
import androidx.appcompat.app.AppCompatActivity
import com.example.android.apis.R
import java.util.ArrayList
```

Then create the activity by extending the `AppCompatActivity`:

```kotlin
@TargetApi(Build.VERSION_CODES.HONEYCOMB)
class BouncingBalls : AppCompatActivity() {
```

Then create our `onCreate()` function. It wil be called when the activity is starting. First we call our super's implementation of `onCreate`, then we set our content view to the layout file R.layout.bouncing_balls, locate the `LinearLayout` within the layout with id `R.id.container` and add a new instance of `MyAnimationView` to it.

- `@param savedInstanceState` - Always null since `onSaveInstanceState` is never called.

```kotlin
    public override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.bouncing_balls)
        val container = findViewById<LinearLayout>(R.id.container)
        container.addView(MyAnimationView(this))
    }
```

Now create an inner class called `MyAnimationView`. This class does all the work of creating and animating the bouncing balls. The balls are placed inside an .animation.ShapeHolder as they are created and an animation set is used to perform animation operations on that ShapeHolder.

Our constructor. First we call our super's constructor. We initialize `ValueAnimator colorAnim` with an `ObjectAnimator` that animates between int values of the "backgroundColor" property value of this `View` between RED and BLUE. Set its duration to 3000 milliseconds, set the evaluator to be used when calculating its animated values to a new instance of `ArgbEvaluator` (performs type interpolation between integer values that represent ARGB colors), set its repeat count to INFINITE, its repeat mode to REVERSE and then start it running.

- @param context `Context` - to use to access resources, this\* in the `onCreate` override of `BouncingBalls`.

```kotlin
    inner class MyAnimationView(context: Context) : View(context) {
```

`ArrayList` holding all our balls, each inside its own `ShapeHolder` container.

```kotlin
        val balls = ArrayList<ShapeHolder>()
```

Then our init

```kotlin
        init {
```

Animate background color. Note that setting the background color will automatically invalidate the view, so that the animated color, and the bouncing balls, get redisplayed on every frame of the animation. Inside the `init`:

```kotlin
            val colorAnim = ObjectAnimator.ofInt(
                    this,
                    "backgroundColor",
                    RED,
                    BLUE)
            colorAnim.duration = 3000
            colorAnim.setEvaluator(ArgbEvaluator())
            colorAnim.repeatCount = ValueAnimator.INFINITE
            colorAnim.repeatMode = ValueAnimator.REVERSE
            colorAnim.start()
        }
```

When a touch event occurs this routine is called to handle it. It handles only `MotionEvent.ACTION_DOWN` and `MotionEvent.ACTION_MOVE` events, checks for these and returns false (event not handled) if it is a different type of event. Otherwise it spawns a new ball in a ShapeHolder container at the .getX() and .getY() of the event and sets up a complex animation set (animatorSet) to be performed on the ShapeHolder which is then `.start()`'ed before returning 'true' to indicate the event has been handled.

- `@param event` - The motion event.
- `@return True` - if the event was handled, false otherwise.

```kotlin
        @SuppressLint("ClickableViewAccessibility")
        override fun onTouchEvent(event: MotionEvent): Boolean {
            if (event.action != MotionEvent.ACTION_DOWN && event.action != MotionEvent.ACTION_MOVE) {
                return false
            }
            val newBall = addBall(event.x, event.y)
```

Bouncing animation with squash and stretch:

```kotlin
            val startY = newBall.y
            val endY = height - 50f
            val h = height.toFloat()
            val eventY = event.y
            val duration = (500 * ((h - eventY) / h)).toInt()
            val bounceAnim = ObjectAnimator.ofFloat(newBall, "y", startY, endY)
            bounceAnim.duration = duration.toLong()
            bounceAnim.interpolator = AccelerateInterpolator()
            val squashAnim1 = ObjectAnimator.ofFloat(newBall, "x", newBall.x,
                    newBall.x - 25f)
            squashAnim1.duration = (duration / 4).toLong()
            squashAnim1.repeatCount = 1
            squashAnim1.repeatMode = ValueAnimator.REVERSE
            squashAnim1.interpolator = DecelerateInterpolator()
            val squashAnim2 = ObjectAnimator.ofFloat(newBall, "width", newBall.width,
                    newBall.width + 50)
            squashAnim2.duration = (duration / 4).toLong()
            squashAnim2.repeatCount = 1
            squashAnim2.repeatMode = ValueAnimator.REVERSE
            squashAnim2.interpolator = DecelerateInterpolator()
            val stretchAnim1 = ObjectAnimator.ofFloat(newBall, "y", endY,
                    endY + 25f)
            stretchAnim1.duration = (duration / 4).toLong()
            stretchAnim1.repeatCount = 1
            stretchAnim1.interpolator = DecelerateInterpolator()
            stretchAnim1.repeatMode = ValueAnimator.REVERSE
            val stretchAnim2 = ObjectAnimator.ofFloat(newBall, "height",
                    newBall.height, newBall.height - 25)
            stretchAnim2.duration = (duration / 4).toLong()
            stretchAnim2.repeatCount = 1
            stretchAnim2.interpolator = DecelerateInterpolator()
            stretchAnim2.repeatMode = ValueAnimator.REVERSE
            val bounceBackAnim = ObjectAnimator.ofFloat(newBall, "y", endY,
                    startY)
            bounceBackAnim.duration = duration.toLong()
            bounceBackAnim.interpolator = DecelerateInterpolator()
```

Sequence the down/squash&stretch/up animations

```kotlin
            val bouncer = AnimatorSet()
            bouncer.play(bounceAnim).before(squashAnim1)
            bouncer.play(squashAnim1).with(squashAnim2)
            bouncer.play(squashAnim1).with(stretchAnim1)
            bouncer.play(squashAnim1).with(stretchAnim2)
            bouncer.play(bounceBackAnim).after(stretchAnim2)
```

Fading animation - remove the ball when the animation is done:

```kotlin
            val fadeAnim = ObjectAnimator.ofFloat(newBall, "alpha", 1f, 0f)
            fadeAnim.duration = 250
```

Then our FadeAnim Listener:

```kotlin
            fadeAnim.addListener(object : AnimatorListenerAdapter() {
```

Inside the above Listener override the `onAnimationEnd`:

This Notifies the end of the animation. This callback is not invoked for animations with repeat count set to INFINITE. We use the `getTarget` method of our parameter `Animator animation` to retrieve the target object whose property is being animated by this animation, then call the `remove` method of `ArrayList<ShapeHolder> balls` to remove it from the list.

- `@param animation` - The animation which reached its end.

```kotlin
                override fun onAnimationEnd(animation: Animator) {

                    balls.remove((animation as ObjectAnimator).target)

                }
```

Sequence the two animations to play one after the other

```kotlin
            val animatorSet = AnimatorSet()
            animatorSet.play(bouncer).before(fadeAnim)
```

Then start the animation:

```kotlin
            animatorSet.start()

            return true
        }
```

Let's create a function to add a ball to the list of ArrayList balls at location (x, y). First create a `ShapeDrawable` of an `OvalShape .resize()`'d to `50px x 50px`, create a `ShapeHolder` containing this `ShapeDrawable` and configure that `ShapeHolder` to locate it at `(x, y)`, create a `Paint` with a random color, create a `RadialGradient` and install it in the `Paint`, then `setPaint()` the `ShapeHolder` with this paint. When done, add the new ball to the balls list, and return the `ShapeHolder` to the caller.

- @param x x coordinate of the new ball
- @param y y coordinate of the new ball
- @return a `ShapeHolder` containing a ball located at (x, y)

```kotlin
        private fun addBall(x: Float, y: Float): ShapeHolder {
            val circle = OvalShape()
            circle.resize(50f, 50f)
            val drawable = ShapeDrawable(circle)
            val shapeHolder = ShapeHolder(drawable)
            shapeHolder.x = x - 25f
            shapeHolder.y = y - 25f
            val red = (Math.random() * 255).toInt()
            val green = (Math.random() * 255).toInt()
            val blue = (Math.random() * 255).toInt()
            val color = -0x1000000 or (red shl 16) or (green shl 8) or blue
            val paint = drawable.paint //new Paint(Paint.ANTI_ALIAS_FLAG);
            val darkColor = -0x1000000 or (red / 4 shl 16) or (green / 4 shl 8) or blue / 4
            val gradient = RadialGradient(37.5f, 12.5f,
                    50f, color, darkColor, Shader.TileMode.CLAMP)
            paint.shader = gradient
            shapeHolder.paint = paint
            balls.add(shapeHolder)
            return shapeHolder
        }
```

Does the drawing of each of of the balls every time the canvas in invalidated. It does this by first saving the current matrix and clip onto a private stack using canvas.save(), then it moves the canvas to the location of the current ball, calls the .draw(Canvas) of the ball's shape to draw it, and then restores the canvas from the stack (repeat for each ball in `ArrayList<ShapeHolder> balls`.

- @param canvas the canvas on which the background will be drawn

```kotlin
        override fun onDraw(canvas: Canvas) {
            for (i in balls.indices) {
                val shapeHolder = balls[i]
                canvas.save()
                canvas.translate(shapeHolder.x, shapeHolder.y)
                shapeHolder.shape!!.draw(canvas)
                canvas.restore()
            }
        }
    }
```

Create our companion object:

```kotlin
    companion object {
```

The background color property of our `MyAnimationView` is animated between this color and BLUE

```kotlin
        private const val RED = -0x7f80
```

The background color property of our `MyAnimationView` is animated between this color and RED

```kotlin
        private const val BLUE = -0x7f7f01
```

TAG that could be used for logging (but isn't).

```kotlin
        @Suppress("unused")
        private const val TAG = "BouncingBalls"
    }
}
```

Here is the full code

**BouncingBalls.kt**

```kotlin

package com.example.android.apis.animation

import android.animation.Animator
import android.animation.AnimatorListenerAdapter
import android.animation.AnimatorSet
import android.animation.ArgbEvaluator
import android.animation.ObjectAnimator
import android.animation.ValueAnimator
import android.annotation.SuppressLint
import android.annotation.TargetApi
import android.content.Context
import android.graphics.Canvas
import android.graphics.RadialGradient
import android.graphics.Shader
import android.graphics.drawable.ShapeDrawable
import android.graphics.drawable.shapes.OvalShape
import android.os.Build
import android.os.Bundle
import android.view.MotionEvent
import android.view.View
import android.view.animation.AccelerateInterpolator
import android.view.animation.DecelerateInterpolator
import android.widget.LinearLayout
import androidx.appcompat.app.AppCompatActivity
import com.example.android.apis.R
import java.util.ArrayList

@TargetApi(Build.VERSION_CODES.HONEYCOMB)
class BouncingBalls : AppCompatActivity() {

    public override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.bouncing_balls)
        val container = findViewById<LinearLayout>(R.id.container)
        container.addView(MyAnimationView(this))
    }

    inner class MyAnimationView  (context: Context) : View(context) {

        val balls = ArrayList<ShapeHolder>()

        init {

            val colorAnim = ObjectAnimator.ofInt(
                    this,
                    "backgroundColor",
                    RED,
                    BLUE)
            colorAnim.duration = 3000
            colorAnim.setEvaluator(ArgbEvaluator())
            colorAnim.repeatCount = ValueAnimator.INFINITE
            colorAnim.repeatMode = ValueAnimator.REVERSE
            colorAnim.start()
        }

        @SuppressLint("ClickableViewAccessibility")
        override fun onTouchEvent(event: MotionEvent): Boolean {
            if (event.action != MotionEvent.ACTION_DOWN && event.action != MotionEvent.ACTION_MOVE) {
                return false
            }
            val newBall = addBall(event.x, event.y)

            // Bouncing animation with squash and stretch
            val startY = newBall.y
            val endY = height - 50f
            val h = height.toFloat()
            val eventY = event.y
            val duration = (500 * ((h - eventY) / h)).toInt()
            val bounceAnim = ObjectAnimator.ofFloat(newBall, "y", startY, endY)
            bounceAnim.duration = duration.toLong()
            bounceAnim.interpolator = AccelerateInterpolator()
            val squashAnim1 = ObjectAnimator.ofFloat(newBall, "x", newBall.x,
                    newBall.x - 25f)
            squashAnim1.duration = (duration / 4).toLong()
            squashAnim1.repeatCount = 1
            squashAnim1.repeatMode = ValueAnimator.REVERSE
            squashAnim1.interpolator = DecelerateInterpolator()
            val squashAnim2 = ObjectAnimator.ofFloat(newBall, "width", newBall.width,
                    newBall.width + 50)
            squashAnim2.duration = (duration / 4).toLong()
            squashAnim2.repeatCount = 1
            squashAnim2.repeatMode = ValueAnimator.REVERSE
            squashAnim2.interpolator = DecelerateInterpolator()
            val stretchAnim1 = ObjectAnimator.ofFloat(newBall, "y", endY,
                    endY + 25f)
            stretchAnim1.duration = (duration / 4).toLong()
            stretchAnim1.repeatCount = 1
            stretchAnim1.interpolator = DecelerateInterpolator()
            stretchAnim1.repeatMode = ValueAnimator.REVERSE
            val stretchAnim2 = ObjectAnimator.ofFloat(newBall, "height",
                    newBall.height, newBall.height - 25)
            stretchAnim2.duration = (duration / 4).toLong()
            stretchAnim2.repeatCount = 1
            stretchAnim2.interpolator = DecelerateInterpolator()
            stretchAnim2.repeatMode = ValueAnimator.REVERSE
            val bounceBackAnim = ObjectAnimator.ofFloat(newBall, "y", endY,
                    startY)
            bounceBackAnim.duration = duration.toLong()
            bounceBackAnim.interpolator = DecelerateInterpolator()
            // Sequence the down/squash&stretch/up animations
            val bouncer = AnimatorSet()
            bouncer.play(bounceAnim).before(squashAnim1)
            bouncer.play(squashAnim1).with(squashAnim2)
            bouncer.play(squashAnim1).with(stretchAnim1)
            bouncer.play(squashAnim1).with(stretchAnim2)
            bouncer.play(bounceBackAnim).after(stretchAnim2)

            // Fading animation - remove the ball when the animation is done
            val fadeAnim = ObjectAnimator.ofFloat(newBall, "alpha", 1f, 0f)
            fadeAnim.duration = 250
            fadeAnim.addListener(object : AnimatorListenerAdapter() {

                override fun onAnimationEnd(animation: Animator) {

                    balls.remove((animation as ObjectAnimator).target)

                }
            })

            // Sequence the two animations to play one after the other
            val animatorSet = AnimatorSet()
            animatorSet.play(bouncer).before(fadeAnim)

            // Start the animation
            animatorSet.start()

            return true
        }

        private fun addBall(x: Float, y: Float): ShapeHolder {
            val circle = OvalShape()
            circle.resize(50f, 50f)
            val drawable = ShapeDrawable(circle)
            val shapeHolder = ShapeHolder(drawable)
            shapeHolder.x = x - 25f
            shapeHolder.y = y - 25f
            val red = (Math.random() * 255).toInt()
            val green = (Math.random() * 255).toInt()
            val blue = (Math.random() * 255).toInt()
            val color = -0x1000000 or (red shl 16) or (green shl 8) or blue
            val paint = drawable.paint //new Paint(Paint.ANTI_ALIAS_FLAG);
            val darkColor = -0x1000000 or (red / 4 shl 16) or (green / 4 shl 8) or blue / 4
            val gradient = RadialGradient(37.5f, 12.5f,
                    50f, color, darkColor, Shader.TileMode.CLAMP)
            paint.shader = gradient
            shapeHolder.paint = paint
            balls.add(shapeHolder)
            return shapeHolder
        }

        override fun onDraw(canvas: Canvas) {
            for (i in balls.indices) {
                val shapeHolder = balls[i]
                canvas.save()
                canvas.translate(shapeHolder.x, shapeHolder.y)
                shapeHolder.shape!!.draw(canvas)
                canvas.restore()
            }
        }
    }
    companion object {

        private const val RED = -0x7f80

        private const val BLUE = -0x7f7f01

        @Suppress("unused")
        private const val TAG = "BouncingBalls"
    }
}
```

### Step 5: Run

1. Copy the layout and kotlin code into your project.
2. Build and run.

The code was written by [@markgray](https://github.com/markgray/)

## Kotlin Android Animation Cloning Example

Creates an ObjectAnimator to animate the y position of an object from 0 to the bottom of the View, `.clones` it and uses `.setTarget` to set it as the animation of a second View. Then it creates two ObjectAnimator's to: animate the y position of an object down, and a second to animate y position up again and creates an `AnimatorSet` to play them sequentially, clones this `AnimatorSet` and .setTarget's the clone as the AnimatorSet for a second object.

Uses an AnimatorSet play the first two ObjectAnimator's and first AnimatorSet, requesting that they be run at the same time by calling `playTogether(ObjectAnimator1,ObjectAnimator2,AnimatorSet1)`, and the second `AnimatorSet`

### Step 1: Create Project

Create an android project in android studio.

### Step 2: Dependencies

No third party dependencies are needed for this project.

### Step 3: Design Layout

Here is the layout for this project:

```xml
<?xml version="1.0" encoding="utf-8"?>
<LinearLayout xmlns:android="http://schemas.android.com/apk/res/android"
    android:orientation="vertical"
    android:layout_width="match_parent"
    android:layout_height="match_parent"
    android:id="@+id/container"
    >
    <Button
        android:layout_width="wrap_content"
        android:layout_height="wrap_content"
        android:text="@string/run"
        android:id="@+id/startButton"
        />
</LinearLayout>
```

### Step 4: Write Code

Create a ShapeHolder:

```kotlin

import android.graphics.Paint
import android.graphics.RadialGradient
import android.graphics.drawable.ShapeDrawable

/**
 * A data structure that holds a Shape and various properties that can be used to define
 * how the shape is drawn.
 */
class ShapeHolder
/**
 * Constructor which initializes a ShapeHolder instance's Shape shape with a ShapeDrawable s
 *
 * @param shape ShapeDrawable that the ShapeHolder will contain
 */
(
        /**
         * The `ShapeDrawable` object we are holding.
         */
        var shape: ShapeDrawable?) {
    /**
     * Our x coordinate.
     */
    var x = 0f
    /**
     * Our y coordinate.
     */
    var y = 0f
    /**
     * Color of the `ShapeDrawable` object we are holding.
     */
    var color: Int = 0
        set(value) {
            shape!!.paint.color = value
            field = value
        }
    /**
     * `RadialGradient` of the `ShapeDrawable` object we are holding.
     */
    var gradient: RadialGradient? = null
    /**
     * Alpha of the `ShapeDrawable` object we are holding.
     */
    private var alpha = 1f
    /**
     * `Paint` of the `ShapeDrawable` object we are holding.
     */
    var paint: Paint? = null

    /**
     * The width of the Shape contained in the ShapeHolder
     */
    var width: Float
        get() = shape!!.shape.width
        set(width) {
            val s = shape!!.shape
            s.resize(width, s.height)
        }

    /**
     * The height of the Shape contained in the ShapeHolder
     */
    var height: Float
        get() = shape!!.shape.height
        set(height) {
            val s = shape!!.shape
            s.resize(s.width, height)
        }

    /**
     * Set the alpha value of the ShapeHolder and the Shape it contains
     *
     * @param alpha alpha value to use
     */
    fun setAlpha(alpha: Float) {
        this.alpha = alpha
        shape!!.alpha = (alpha * 255f + .5f).toInt()
    }
}
```

Create a file: `AnimationCloning.kt` then add imports:

```kotlin
import android.animation.AnimatorSet
import android.animation.ObjectAnimator
import android.animation.ValueAnimator
import android.annotation.TargetApi
import android.content.Context
import android.graphics.Canvas
import android.graphics.RadialGradient
import android.graphics.Shader
import android.graphics.drawable.ShapeDrawable
import android.graphics.drawable.shapes.OvalShape
import android.os.Build
import android.os.Bundle
import android.view.View
import android.view.animation.AccelerateInterpolator
import android.view.animation.DecelerateInterpolator
import android.widget.Button
import android.widget.LinearLayout
import androidx.appcompat.app.AppCompatActivity
import com.example.android.apis.R
import java.util.ArrayList
```

Extend the AppCompatActivity:

```kotlin
@Suppress("MemberVisibilityCanBePrivate")
@TargetApi(Build.VERSION_CODES.HONEYCOMB)
class AnimationCloning : AppCompatActivity() {
```

The `onCreate()` is called when the activity is starting. First we call through to our super's implementation of `onCreate`, then we set our content view to our layout file `R.layout.animation_cloning`.

```kotlin
    public override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.animation_cloning)
```

We initialize `LinearLayout container` by finding the view with id R.id.container, then we initialize `MyAnimationView animView` with a new instance and add that view to `container`.

```kotlin
        val container = findViewById<LinearLayout>(R.id.container)
        val animView = MyAnimationView(this)
        container.addView(animView)
```

We initialize `Button starter` by finding the view with the id `R.id.startButton` ("Run") and set its `OnClickListener` to a lambda which calls the `startAnimation` method of `animView` which creates the animation if this is the first time it is called then starts the animation running.

```kotlin
        val starter = findViewById<Button>(R.id.startButton)
        starter.setOnClickListener {
            animView.startAnimation()
        }
    }
```

A custom view with 4 animated balls in it.

```kotlin
    inner class MyAnimationView
```

Our constructor. First we call our super's constructor then we initialize our field `float mDensity` with the logical density of the display. Then we create 4 balls and add them to the `ArrayList<ShapeHolder> balls` using our method `addBall`

- `@param context Context` - which in our case is derived from super of Activity

```kotlin
    (context: Context) : View(context), ValueAnimator.AnimatorUpdateListener {
```

List holding our 4 balls.

```kotlin
        val balls = ArrayList<ShapeHolder>()
```

`AnimatorSet` we use to hold the animations for all 4 balls, created in our method `createAnimation` and started by our method `startAnimation`.

```kotlin
        internal var animation: AnimatorSet? = null
```

Logical density of the display.

```kotlin
        private val mDensity: Float = getContext().resources.displayMetrics.density
```

Then in our `init` block:

```kotlin
        init {

            addBall(50f * mDensity, 25f * mDensity)
            addBall(150f * mDensity, 25f * mDensity)
            addBall(250f * mDensity, 25f * mDensity)
            addBall(350f * mDensity, 25f * mDensity)
        }
```

The `createAnimation()` function below creates the `AnimatorSet animation`. First we create `ObjectAnimator anim1` which moves balls{0} y coordinate from 0f to the bottom of the View. We create `ObjectAnimator anim2` as a clone of `anim1` and target it to balls{1}.

We add "this" as an `AnimatorUpdateListener` for `anim1` which causes `this.onAnimationUpdate` to be called for every frame of this animation (it simply calls `invalidate()` to cause redraw of the view).

We initialize `ShapeHolder ball2` with balls{2}, then create `ObjectAnimator animDown` to animate the y coordinate of `ball2` from 0f to the bottom of the View and set its interpolator to an `AccelerateInterpolator`. We create `ObjectAnimator animUp` to animate `ball2` y coordinate from the bottom of the View to 0f and set its interpolator to an `DecelerateInterpolator`.

We create `AnimatorSet s1` and configure it to play sequentially `animDown` followed by `animUp`. We then set the `AnimatorUpdateListener` of both `animDown` and `animUp` to "this" (our override of `onAnimationUpdate` will be called for every frame of these animations. We clone `s1` to initialize `AnimatorSet s2`, and its target to balls{3}.

We create the master `AnimatorSet animation`, and add `anim1`, `anim2`, and `s1` set to play together, and `s1` and `s2` are then added to play sequentially (the first three balls start their animations when the "Run" button is clicked, and the fourth ball starts its animation only after the other three have finished their animations).

```kotlin
        private fun createAnimation() {
            if (animation == null) {
                val anim1 = ObjectAnimator.ofFloat(balls[0], "y",
                        0f, height - balls[0].height).setDuration(500)
                val anim2 = anim1.clone()
                anim2.target = balls[1]
                anim1.addUpdateListener(this)

                val ball2 = balls[2]
                val animDown = ObjectAnimator.ofFloat(ball2, "y",
                        0f, height - ball2.height).setDuration(500)
                animDown.interpolator = AccelerateInterpolator()
                val animUp = ObjectAnimator.ofFloat(ball2, "y",
                        height - ball2.height, 0f).setDuration(500)
                animUp.interpolator = DecelerateInterpolator()
                val s1 = AnimatorSet()
                s1.playSequentially(animDown, animUp)
                animDown.addUpdateListener(this)
                animUp.addUpdateListener(this)
                val s2 = s1.clone()
                s2.setTarget(balls[3])

                animation = AnimatorSet()
                animation!!.playTogether(anim1, anim2, s1)
                animation!!.playSequentially(s1, s2)
            }
        }
```

The `addBall()` function below creates, configures, then adds a randomly colored ball at coordinates `(x,y)` to our field `ArrayList<ShapeHolder> balls`.

First we initialize our variable `OvalShape circle` with a new instance, then we resize it to 50dp x 50dp, place it in a `ShapeDrawable drawable` and use that hapeDrawable `to create` ShapeHolder shapeHolder `to hold it. We set the x and y coordinates of` shapeHolder `to our arguments` x `and` y\` respectively.

We create a random `int red` between 100 and 255, a andom `int green` between 100 and 255, and a random `int blue` between 100 and 255. We then shift them into the appropriate bit positions for a 32 bit color and or the three colors along with a maximum alpha field to form the color `int color`.

We retrieve the `Paint` used to draw `drawable` to initialize `Paint paint`. We create `int darkColor` using our random colors `red`, `green` and `blue` divided by 4 before being shifted into position and or'ed together with a maximum alpha value. `RadialGradient gradient` is then created with 37.5 as the x-coordinate of the center of the radius, 12.5 as the y-coordinate of the center of the radius, 50. as the radius of the circle for the gradient, `color` as the color at the center of the circle, `darkColor` as the color at the edge of the circle, and using CLAMP Shader tiling mode (replicate the edge color if the shader draws outside of its original bounds). We set `gradient` as the shader of `paint`, add `shapeHolder` to `ArrayList<ShapeHolder> balls` and return `shapeHolder` to the caller.

- @param x x coordinate for new ball
- @param y y coordinate for new ball
- @return ShapeHolder containing the new ball

```kotlin
        private fun addBall(x: Float, y: Float): ShapeHolder {
            val circle = OvalShape()
            circle.resize(50f * mDensity, 50f * mDensity)
            val drawable = ShapeDrawable(circle)
            val shapeHolder = ShapeHolder(drawable)
            shapeHolder.x = x - 25f
            shapeHolder.y = y - 25f
            val red = (100 + Math.random() * 155).toInt()
            val green = (100 + Math.random() * 155).toInt()
            val blue = (100 + Math.random() * 155).toInt()
            val color = -0x1000000 or (red shl 16) or (green shl 8) or blue
            val paint = drawable.paint //new Paint(Paint.ANTI_ALIAS_FLAG);
            val darkColor = -0x1000000 or (red / 4 shl 16) or (green / 4 shl 8) or blue / 4
            val gradient = RadialGradient(37.5f, 12.5f,
                    50f, color, darkColor, Shader.TileMode.CLAMP)
            paint.shader = gradient
            shapeHolder.paint = paint
            balls.add(shapeHolder)
            return shapeHolder
        }
```

The `onDraw()` callback below draws its `MyAnimationView` after every `invalidate()` call. We loop over `int i` for all the `ShapeHolder` objects in `ArrayList<ShapeHolder> balls` initializing `ShapeHolder shapeHolder` with the `ShapeHolder` in `balls` at index `i`. We save the current matrix and clip of `canvas` onto a private stack, pre-concatenate the matrix of `canvas` with a translation to the coordinates `(x,y)` of the ShapeHolder, then instruct the ShapeDrawable `in` shapeHolder `to draw itself. We then remove all modifications to the matrix/clip state of` canvas\` and loop around for the next ball.

- @param canvas the canvas on which the background will be drawn

```kotlin
        override fun onDraw(canvas: Canvas) {
            for (i in balls.indices) {
                val shapeHolder = balls[i]
                canvas.save()
                canvas.translate(shapeHolder.x, shapeHolder.y)
                shapeHolder.shape!!.draw(canvas)
                canvas.restore()
            }
        }
```

The `startAnimation()` function is called when the RUN button is clicked, we first call our method `createAnimation` to create the animation `AnimatorSet animation` (if this is the first time the button is clicked), and then start the animation running.

```kotlin
        fun startAnimation() {
            createAnimation()
            animation!!.start()
        }
```

The `onAnimationUpdate()` callback is called on the occurrence of another frame of an animation which has had addUpdateListener(this) called to add "this" as a listener to the set of listeners that are sent update events throughout the life of an animation. This method is called on all listeners for every frame of the animation, after the values for the animation have been calculated. It simply calls `invalidate()` to invalidate the whole view.

If the view is visible, `onDraw(android.graphics.Canvas)` will be called at some point in the future.

- @param animation The animation which has a new frame

```kotlin
        override fun onAnimationUpdate(animation: ValueAnimator) {
            invalidate()
        }
```

Here is the full code:

**AnimationCloning.kt**

```kotlin

import android.animation.AnimatorSet
import android.animation.ObjectAnimator
import android.animation.ValueAnimator
import android.annotation.TargetApi
import android.content.Context
import android.graphics.Canvas
import android.graphics.RadialGradient
import android.graphics.Shader
import android.graphics.drawable.ShapeDrawable
import android.graphics.drawable.shapes.OvalShape
import android.os.Build
import android.os.Bundle
import android.view.View
import android.view.animation.AccelerateInterpolator
import android.view.animation.DecelerateInterpolator
import android.widget.Button
import android.widget.LinearLayout
import androidx.appcompat.app.AppCompatActivity
import com.example.android.apis.R
import java.util.ArrayList

@Suppress("MemberVisibilityCanBePrivate")
@TargetApi(Build.VERSION_CODES.HONEYCOMB)
class AnimationCloning : AppCompatActivity() {

    public override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.animation_cloning)

        val container = findViewById<LinearLayout>(R.id.container)
        val animView = MyAnimationView(this)
        container.addView(animView)

        val starter = findViewById<Button>(R.id.startButton)
        starter.setOnClickListener {
            animView.startAnimation()
        }
    }

    inner class MyAnimationView (context: Context) : View(context), ValueAnimator.AnimatorUpdateListener {

        val balls = ArrayList<ShapeHolder>()

        internal var animation: AnimatorSet? = null

        private val mDensity: Float = getContext().resources.displayMetrics.density

        init {

            addBall(50f * mDensity, 25f * mDensity)
            addBall(150f * mDensity, 25f * mDensity)
            addBall(250f * mDensity, 25f * mDensity)
            addBall(350f * mDensity, 25f * mDensity)
        }

        private fun createAnimation() {
            if (animation == null) {
                val anim1 = ObjectAnimator.ofFloat(balls[0], "y",
                        0f, height - balls[0].height).setDuration(500)
                val anim2 = anim1.clone()
                anim2.target = balls[1]
                anim1.addUpdateListener(this)

                val ball2 = balls[2]
                val animDown = ObjectAnimator.ofFloat(ball2, "y",
                        0f, height - ball2.height).setDuration(500)
                animDown.interpolator = AccelerateInterpolator()
                val animUp = ObjectAnimator.ofFloat(ball2, "y",
                        height - ball2.height, 0f).setDuration(500)
                animUp.interpolator = DecelerateInterpolator()
                val s1 = AnimatorSet()
                s1.playSequentially(animDown, animUp)
                animDown.addUpdateListener(this)
                animUp.addUpdateListener(this)
                val s2 = s1.clone()
                s2.setTarget(balls[3])

                animation = AnimatorSet()
                animation!!.playTogether(anim1, anim2, s1)
                animation!!.playSequentially(s1, s2)
            }
        }

        private fun addBall(x: Float, y: Float): ShapeHolder {
            val circle = OvalShape()
            circle.resize(50f * mDensity, 50f * mDensity)
            val drawable = ShapeDrawable(circle)
            val shapeHolder = ShapeHolder(drawable)
            shapeHolder.x = x - 25f
            shapeHolder.y = y - 25f
            val red = (100 + Math.random() * 155).toInt()
            val green = (100 + Math.random() * 155).toInt()
            val blue = (100 + Math.random() * 155).toInt()
            val color = -0x1000000 or (red shl 16) or (green shl 8) or blue
            val paint = drawable.paint //new Paint(Paint.ANTI_ALIAS_FLAG);
            val darkColor = -0x1000000 or (red / 4 shl 16) or (green / 4 shl 8) or blue / 4
            val gradient = RadialGradient(37.5f, 12.5f,
                    50f, color, darkColor, Shader.TileMode.CLAMP)
            paint.shader = gradient
            shapeHolder.paint = paint
            balls.add(shapeHolder)
            return shapeHolder
        }

        override fun onDraw(canvas: Canvas) {
            for (i in balls.indices) {
                val shapeHolder = balls[i]
                canvas.save()
                canvas.translate(shapeHolder.x, shapeHolder.y)
                shapeHolder.shape!!.draw(canvas)
                canvas.restore()
            }
        }

        fun startAnimation() {
            createAnimation()
            animation!!.start()
        }

        override fun onAnimationUpdate(animation: ValueAnimator) {
            invalidate()
        }

    }
}
```

### Step 5: Register Activity

Register the activity in the `AndroidManifest.xml`:

```xml
        <activity
            android:name=".animation.AnimationCloning"
            android:enabled="@bool/atLeastHoneycomb"
            android:label="Animation/Cloning"
            android:theme="@style/Theme.AppCompat.Light">
            <intent-filter>
                <action android:name="android.intent.action.MAIN" />
                <category android:name="android.intent.category.SAMPLE_CODE" />
            </intent-filter>
        </activity>
```

### Step 6: Run

1. Copy the layout and the kotlin code into your project
2. Build and Run

The code was written by [@markgray](https://github.com/markgray/)
