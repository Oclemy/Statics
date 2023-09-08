# Kotlin Android Chronometer Example


This is a simple example that allows you create a timer using the standard Chronometer API in android sdk. The example is written in Kotlin.


Here is the demo of what is created:

![Kotlin Android Chronometer](https://github.com/alirezabashi98/Test-Chronometer/raw/master/scr001.png)

### Step 1: Dependencies

No third party dependency is needed or used. However because Kotlin is used you need to add Kotlin sdk. Also androidx is used so add androidx appcompat as opposed to support library appcompat.

### Step 2: Add to Layout

Next you add the chronometer to your xml layout. Also add a togglebutton to be used to toggle between on and off:

**activity_main.xml**

The code is as follows:

```xml
<?xml version="1.0" encoding="utf-8"?>
<LinearLayout xmlns:android="http://schemas.android.com/apk/res/android"
    xmlns:app="http://schemas.android.com/apk/res-auto"
    xmlns:tools="http://schemas.android.com/tools"
    android:layout_width="match_parent"
    android:layout_height="match_parent"
    tools:context=".MainActivity"
    android:orientation="vertical">

    <Chronometer
        android:id="@+id/chr_main_timer"
        android:layout_width="wrap_content"
        android:layout_height="wrap_content"
        android:textSize="35dp"
        android:layout_gravity="center"
        android:gravity="center"
        android:layout_marginTop="60dp"/>

    <ToggleButton
        android:id="@+id/tog_main_on"
        android:layout_width="wrap_content"
        android:layout_height="wrap_content"
        android:layout_gravity="center"
        android:layout_marginTop="50dp"
        android:textOff="on"
        android:textOn="off"/>

    <Button
        android:id="@+id/btn_main_rest"
        android:layout_width="wrap_content"
        android:layout_height="wrap_content"
        android:text="Rest"
        android:layout_gravity="center"
        android:layout_marginTop="20dp"/>

</LinearLayout>
```

### Step 3: Write Kotlin Code

You can start or stop the chronometer using the `start()` and `stop()` functions. Here is the full code for main activity:

**MainActivity.kt**

```kotlin
import androidx.appcompat.app.AppCompatActivity
import android.os.Bundle
import android.os.SystemClock
import android.widget.Toast
import kotlinx.android.synthetic.main.activity_main.*

class MainActivity : AppCompatActivity() {

    var pauseOffset = 0L

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_main)

        tog_main_on.setOnClickListener {
            if (tog_main_on.isChecked) {
                chr_main_timer.base = SystemClock.elapsedRealtime() - pauseOffset
                chr_main_timer.start()
            }
            else {
                pauseOffset = SystemClock.elapsedRealtime() - chr_main_timer.base
                chr_main_timer.stop()
            }
        }

//        on click btn
        btn_main_rest.setOnClickListener {
            pauseOffset = 0L
            chr_main_timer.base = SystemClock.elapsedRealtime()
        }
    }
}
```

### Step 4: Run

Lastly run the project.

### Reference

Download the code below:

| No | Link |
| --- | --- |
| 1. | [Download](https://github.com/alirezabashi98/Test-Chronometer/archive/refs/heads/master.zip) code |
| 2. | [Browse](https://github.com/alirezabashi98/Test-Chronometer/) code |
| 3. | [Follow](https://github.com/alirezabashi98/) code author |
