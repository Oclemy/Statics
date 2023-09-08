# Libraries for Running Code Repetitively


Here and there, in your android project, you tend to need ways to execute code repetitively or after a certain period. There is the standard way of using Handler class, however this can lead to memory leaks in your app. In this article, we will look at some easy third party solutions to this problem.

**Questions This Article Answers**

1. How do you execute a piece of code repetitively?
2. How do you execute a piece of code after a certain duration?

## (a) Solution 1: Use every-after

> About Android library to run tasks after particular time (optionally repetitively) without worrying about memory leaks!

every-after is an Android library to run a piece of code (optionally repetitively) after certain time interval. It exposes extension functions on LifecycleOwner to achieve this.

# Documentation

| Function | Description |
| --- | --- |
| LifecycleOwner.every(time, unit, action) | Executes `action` after each `time` in `unit` units. Example: `time=2` `unit=seconds` implies every 2 seconds |
| LifecycleOwner.everySecond(action) | Executes `action` every second |
| LifecycleOwner.everyMinute(action) | Executes `action` every minute |
| LifecycleOwner.after(time, unit, action) | Executes `action` _once_ after `time` in `unit` units |

### How to Install

1. In the project-level `build.gradle`:

```groovy
allprojects {
   repositories {
      ...
      maven { url 'https://jitpack.io' }
    }
}
```

2. In app-level `build.gradle`:
    
    ```groovy
    dependencies {
     implementation 'com.github.sidhuparas:every-after:1.1'
    }
    ```
    

### Example

Here's a full example in Kotlin:

**MainActivity.kt**

```kotlin
package com.paras.everysample

import android.os.Bundle
import android.util.Log
import androidx.appcompat.app.AppCompatActivity
import com.paras.every.after.after
import com.paras.every.every
import com.paras.every.everyMinute
import com.paras.every.everySecond
import java.util.concurrent.TimeUnit

class MainActivity : AppCompatActivity() {

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_main)

        val sec = everySecond { time ->
            log("1. $time")
        }

        everyMinute { time ->
            log("2. $time")
        }

        after(1, TimeUnit.MINUTES) {
            sec.cancel()
            log("3. Done")
        }

        every(1, TimeUnit.MINUTES) { time ->
            log("4. $time")
        }
    }

    private fun log(message: Any?) {
        Log.d("Every-After", message.toString())
    }
}
```

### FAQ

1. **I can use `Handler` to replicate `after` function's functionality. Why should I need `after` function or this library?** Ans: Handler is often known to cause memory leaks when used carelessly. With every-after, you don't need to take care of cancelling the task if activity or fragment is destroyed. It is automatically taken care.
    
2. **Can I cancel tasks on my own?** Ans: Yes, each function returns an object which has `Cancellable` interface implemented. Just call `cancel()` function on it to cancel the task.
    
3. **I don't have LifecycleOwner object access. I can cancel the task on my own. Can I use the functions without LifecycleOwner?** Ans: Currently, no. Coming soon.
    

### Reference

Find complete reference [here](https://github.com/sidhuparas/every-after).
