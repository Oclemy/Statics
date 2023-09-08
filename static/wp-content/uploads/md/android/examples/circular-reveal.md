# Circular Reveal using Animator


In this tutorial you will learn how to implement the circular reveal using the `Animator` class.


### What is Animator?

> It is the superclass for classes which provide basic support for animations which can be started, ended, and have AnimatorListeners added to them.


### Step 1: Create Project

Start by creating an empty `Android Studio` project.

### Step 2: Dependencies

No external dependencies are needed for this project.

### Step : Write Code

**MainActivity.kt**

```kotlin
import android.content.res.ColorStateList
import android.opengl.Visibility
import android.os.Build
import androidx.appcompat.app.AppCompatActivity
import android.os.Bundle
import androidx.core.content.res.ResourcesCompat
import android.view.View
import android.view.ViewAnimationUtils
import kotlinx.android.synthetic.main.activity_main.*
import android.animation.Animator
import android.animation.AnimatorListenerAdapter
import kotlin.math.hypot

class MainActivity : AppCompatActivity() {

    var isOpen: Boolean = false

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_main)
        floating_button.setOnClickListener {
            revealMenu()
        }
    }

    private fun revealMenu() {
        if (!isOpen) {
            val x = main_layout.right
            val y = main_layout.bottom

            val startRadius = 0
            val endRadius = hypot(main_layout.width.toDouble(), main_layout.height.toDouble())

            floating_button.backgroundTintList = ColorStateList.valueOf(ResourcesCompat
                    .getColor(applicationContext.resources, android.R.color.white, null))
            floating_button.setImageResource(R.drawable.ic_close_black_24dp)
            if (Build.VERSION.SDK_INT >= 21) {
                val anim = ViewAnimationUtils.createCircularReveal(menu_layout,
                        x, y, startRadius.toFloat(), endRadius.toFloat())
                //duration can be custom according to you even can be left and default value will be taken
                //in ms
                anim.duration=800
                menu_layout.visibility = View.VISIBLE
                anim.start()
                isOpen = true
            } else {
                //When below API 21 for example in Kitkat
                menu_layout.visibility = View.VISIBLE
                isOpen = true
            }
        } else {
            val x = layout_text.left
            val y = layout_text.top

            val startRadius = 0
            val end = hypot(main_layout.width.toDouble(), main_layout.height.toDouble())

            floating_button.backgroundTintList = ColorStateList.valueOf(ResourcesCompat
                    .getColor(applicationContext.resources, R.color.colorPrimary, null))
            floating_button.setImageResource(R.drawable.ic_add_white_24dp)
            if (Build.VERSION.SDK_INT >= 21) {
                val anim = ViewAnimationUtils.createCircularReveal(layout_text,
                        x, y, startRadius.toFloat(), end.toFloat())
                //duration can be custom according to you even can be left and default value will be taken
                //in ms
                anim.duration=800
                anim.addListener(object : AnimatorListenerAdapter(){
                    override fun onAnimationEnd(animation: Animator?) {
                        super.onAnimationEnd(animation)
                        menu_layout.visibility = View.GONE
                    }
                })
                anim.start()
                isOpen = false
            } else {
                //When below API 21 for example in Kitkat
                menu_layout.visibility = View.GONE
                isOpen = false
            }
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
| 1. | [Download](https://downgit.github.io/#/home?url=https://github.com/amanjeetsingh150/kotlin-android-examples/tree/master/CircularReveals) Example |
| 2. | [Follow](https://github.com/amanjeetsingh150/) code author |
| 3. | Code: [Apache 2.0 License](http://www.apache.org/licenses/LICENSE-2.0.txt) |
