# Spring Animation Example


In this tutorial you will learn about dynamic animations with Spring Animation via simple examples.


### What is SpringAnimation?

> SpringAnimation is an animation that is driven by a [SpringForce](https://developer.android.com/reference/androidx/dynamicanimation/animation/SpringForce).

The spring force defines the spring's stiffness, damping ratio, as well as the rest position. Once the SpringAnimation is started, on each frame the spring force will update the animation's value and velocity. The animation will continue to run until the spring force reaches equilibrium. If the spring used in the animation is undamped, the animation will never reach equilibrium. Instead, it will oscillate forever.

Here is how you create a `SpringAnimation` that uses the default `SpringForce`:

```kotlin
 // Create an animation to animate view's X property, set the rest position of the
 // default spring to 0, and start the animation with a starting velocity of 5000 (pixel/s).
 final SpringAnimation anim = new SpringAnimation(view, DynamicAnimation.X, 0)
         .setStartVelocity(5000);
 anim.start();
```

### What is SpringForce?

> Spring Force defines the characteristics of the spring being used in the animation.

By configuring the stiffness and damping ratio, callers can create a spring with the look and feel suits their use case. Stiffness corresponds to the spring constant. The stiffer the spring is, the harder it is to stretch it, the faster it undergoes dampening.

### What is Dynamic Animation?

> This class is the base class of physics-based animations.

It manages the animation's lifecycle such as `start()` and `cancel()`. This base class also handles the common setup for all the subclass animations. For example, DynamicAnimation supports adding `DynamicAnimation.OnAnimationEndListener` and `DynamicAnimation.OnAnimationUpdateListener` so that the important animation events can be observed through the callbacks. The start conditions for any subclass of DynamicAnimation can be set using `setStartValue(float)` and `setStartVelocity(float)`.

You can read more [here](https://developer.android.com/reference/androidx/dynamicanimation/animation/SpringAnimation?hl=en)

Here is a demo image:

![Kotlin Android Spring Animation Example](https://camposha.info/android-examples/wp-content/uploads/sites/9/2022/01/Spring-Gif.gif)

### Step 1: Create Project

Start by creating an empty `Android Studio` project.

### Step 2: Dependencies

In your `app/build.gradle` add the `dynamic animation` dependency as shown below:

```groovy
    implementation "androidx.dynamicanimation:dynamicanimation:$supportVer"
```

### Create Splash Activity

Create a file called `SplashActivity.kt`.

Start by adding imports including the `SpringAnimation` and `SpringForce`:

```kotlin
import android.animation.Animator
import android.content.Intent
import androidx.appcompat.app.AppCompatActivity
import android.os.Bundle
import android.os.Handler
import android.util.DisplayMetrics
import android.view.animation.DecelerateInterpolator
import androidx.dynamicanimation.animation.DynamicAnimation
import androidx.dynamicanimation.animation.SpringAnimation
import androidx.dynamicanimation.animation.SpringForce
import kotlinx.android.synthetic.main.activity_splash.*
```

Extend the `AppCompatActivity`:

```kotlin
class SplashActivity : AppCompatActivity() {
```

Declare a `SpringForce`:

```kotlin
    private lateinit var springForce: SpringForce
```

Override the `onCreate()` function:

```kotlin
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_splash)
```

We will do our animation inside the `Handler().postDelayed` callback:

```kotlin
        Handler().postDelayed({
```

Instantiate the `SpringForce` passing in a `Float`:

```kotlin
            springForce = SpringForce(0f)
```

Set the pivotX and pivotY properties:

```kotlin
            relative_layout.pivotX = 0f
            relative_layout.pivotY = 0f
```

Instantiate a `SpringAnimation` then apply the `dampingRation` and `stiffness`:

```kotlin
            val springAnim = SpringAnimation(relative_layout, DynamicAnimation.ROTATION).apply {
                springForce.dampingRatio = SpringForce.DAMPING_RATIO_HIGH_BOUNCY
                springForce.stiffness = SpringForce.STIFFNESS_VERY_LOW
            }
```

Then set the `spring` property of the `SpringAnimation` as a `SpringForce`:

```kotlin
            springAnim.spring = springForce
```

Set the start value:

```kotlin
            springAnim.setStartValue(80f)
```

Attach an end listener:

```kotlin
            springAnim.addEndListener { _, _, _, _ ->
                val displayMetrics = DisplayMetrics()
                windowManager.defaultDisplay.getMetrics(displayMetrics)
                val height = displayMetrics.heightPixels.toFloat()
                val width = displayMetrics.widthPixels
                relative_layout.animate()
                        .setStartDelay(1)
                        .translationXBy(width.toFloat() / 2)
                        .translationYBy(height)
                        .setListener(object : Animator.AnimatorListener {
                            override fun onAnimationRepeat(p0: Animator?) {

                            }

                            override fun onAnimationEnd(p0: Animator?) {
                                val intent = Intent(applicationContext, MainActivity::class.java)
                                finish()
                                startActivity(intent)
                                overridePendingTransition(0, 0)
                            }

                            override fun onAnimationCancel(p0: Animator?) {

                            }

                            override fun onAnimationStart(p0: Animator?) {

                            }

                        })
                        .setInterpolator(DecelerateInterpolator(1f))
                        .start()
            }
            springAnim.start()
        }, 4000)
    }
}
```

Here is the full code:

**SplashActivity.kt**

```kotlin
import android.animation.Animator
import android.content.Intent
import androidx.appcompat.app.AppCompatActivity
import android.os.Bundle
import android.os.Handler
import android.util.DisplayMetrics
import android.view.animation.DecelerateInterpolator
import androidx.dynamicanimation.animation.DynamicAnimation
import androidx.dynamicanimation.animation.SpringAnimation
import androidx.dynamicanimation.animation.SpringForce
import kotlinx.android.synthetic.main.activity_splash.*

class SplashActivity : AppCompatActivity() {

    private lateinit var springForce: SpringForce

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_splash)
        Handler().postDelayed({
            //do stuff
            //Like your Background calls and all
            springForce = SpringForce(0f)
            relative_layout.pivotX = 0f
            relative_layout.pivotY = 0f
            val springAnim = SpringAnimation(relative_layout, DynamicAnimation.ROTATION).apply {
                springForce.dampingRatio = SpringForce.DAMPING_RATIO_HIGH_BOUNCY
                springForce.stiffness = SpringForce.STIFFNESS_VERY_LOW
            }
            springAnim.spring = springForce
            springAnim.setStartValue(80f)
            springAnim.addEndListener { _, _, _, _ ->
                val displayMetrics = DisplayMetrics()
                windowManager.defaultDisplay.getMetrics(displayMetrics)
                val height = displayMetrics.heightPixels.toFloat()
                val width = displayMetrics.widthPixels
                relative_layout.animate()
                        .setStartDelay(1)
                        .translationXBy(width.toFloat() / 2)
                        .translationYBy(height)
                        .setListener(object : Animator.AnimatorListener {
                            override fun onAnimationRepeat(p0: Animator?) {

                            }

                            override fun onAnimationEnd(p0: Animator?) {
                                val intent = Intent(applicationContext, MainActivity::class.java)
                                finish()
                                startActivity(intent)
                                overridePendingTransition(0, 0)
                            }

                            override fun onAnimationCancel(p0: Animator?) {

                            }

                            override fun onAnimationStart(p0: Animator?) {

                            }

                        })
                        .setInterpolator(DecelerateInterpolator(1f))
                        .start()
            }
            springAnim.start()
        }, 4000)
    }
}
```

### Create MainActivity

Here is our `MainActivity`

**MainActivity.kt**

```kotlin
import androidx.appcompat.app.AppCompatActivity
import android.os.Bundle
import kotlinx.android.synthetic.main.activity_main.*

class MainActivity : AppCompatActivity() {

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_main)
        setSupportActionBar(toolBar)
    }
}
```

### Run

Copy the code or download it in the link below, build and run.

### Reference

Here are the reference links:

| Number | Link |
| --- | --- |
| 1. | [Download](https://downgit.github.io/#/home?url=https://github.com/amanjeetsingh150/kotlin-android-examples/tree/master/UsingSpringAnimation) Example |
| 2. | [Follow](https://github.com/amanjeetsingh150/) code author |
| 3. | Code: [Apache 2.0 License](http://www.apache.org/licenses/LICENSE-2.0.txt) |
