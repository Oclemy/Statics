# Accelerometer Experimentation

>  Experimentation with how to use the accelerometer to make cool effects on Android in Kotlin.

Below is a full android sample to demonstrate Accelerometer concept.

#### Step 1. Design Layouts

**(a). `activity_main.xml`**

> Our `activity_main` layout.

Design your XML layout using the following 2 UI widgets and ViewGroups:

1. [`RelativeLayout`](https://android.camposha.info/en/relativelayout)
2. [`TextView`](https://android.camposha.info/en/textview)

```xml
<?xml version="1.0" encoding="utf-8"?>
<RelativeLayout xmlns:android="http://schemas.android.com/apk/res/android"
    xmlns:app="http://schemas.android.com/apk/res-auto"
    xmlns:tools="http://schemas.android.com/tools"
    android:layout_width="match_parent"
    android:layout_height="match_parent"
    android:background="#212121"
    tools:context=".MainActivity">

    <TextView
        android:id="@+id/tv_square"
        android:layout_width="200dp"
        android:layout_height="200dp"
        android:layout_centerInParent="true"
        android:background="#EF5350"
        android:gravity="center"
        android:text="Hello"
        android:textColor="@color/white"
        android:textSize="20sp" />


</RelativeLayout>
```
#### Step 2. Write Code

Finally we need to write our code as follows:


**(a). `MainActivity.kt`**

> Our `MainActivity` class.

Create a Kotlin file named `MainActivity.kt`.

We will then add imports from android SDK and other packages. Here are some of the imports we will use in this class:

1. `Color` from the `android.graphics` package.
2. [`Sensor`](https://android.camposha.info/en/category/sensor) from the `android.hardware` package.
3. `SensorEvent` from the `android.hardware` package.
4. `SensorEventListener` from the `android.hardware` package.
5. [`SensorManager`](https://android.camposha.info/en/sensor-manager) from the `android.hardware` package.
6. [`AppCompatActivity`](https://android.camposha.info/en/activity) from the `androidx.appcompat.app` package.
7. [`Bundle`](https://android.camposha.info/en/bundle) from the `android.os` package.
8. [`TextView`](https://android.camposha.info/en/textview) from the `android.widget` package.
9. `AppCompatDelegate` from the `androidx.appcompat.app` package.

Next create a class that derives from `AppCompatActivity` and add its contents as follows:

We will be overriding the following functions: 

1. `onCreate(savedInstanceState: Bundle?) `.
2. `onSensorChanged(event: SensorEvent?) `.
3. `onAccuracyChanged(sensor: Sensor?, accuracy: Int) `.
4. `onDestroy() `.

We will be creating the following methods:

1. `setUpSensorStuff() `.

**(a). Our `setUpSensorStuff()` function**

We`setUpSensorStuff()` as follows:

```kotlin
    private fun setUpSensorStuff() {
        // Create the sensor manager
        sensorManager = getSystemService(SENSOR_SERVICE) as SensorManager

        // Specify the sensor you want to listen to
        sensorManager.getDefaultSensor(Sensor.TYPE_ACCELEROMETER)?.also { accelerometer ->
            sensorManager.registerListener(
                this,
                accelerometer,
                SensorManager.SENSOR_DELAY_FASTEST,
                SensorManager.SENSOR_DELAY_FASTEST
            )
        }
    }
```


Here is the full code:

```kotlin
package replace_with_your_package_name

import android.graphics.Color
import android.hardware.Sensor
import android.hardware.SensorEvent
import android.hardware.SensorEventListener
import android.hardware.SensorManager
import androidx.appcompat.app.AppCompatActivity
import android.os.Bundle
import android.widget.TextView
import androidx.appcompat.app.AppCompatDelegate

class MainActivity : AppCompatActivity(), SensorEventListener {

    private lateinit var sensorManager: SensorManager
    private lateinit var square: TextView

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_main)

        // Keeps phone in light mode
        AppCompatDelegate.setDefaultNightMode(AppCompatDelegate.MODE_NIGHT_NO)

        square = findViewById(R.id.tv_square)

        setUpSensorStuff()
    }

    private fun setUpSensorStuff() {
        // Create the sensor manager
        sensorManager = getSystemService(SENSOR_SERVICE) as SensorManager

        // Specify the sensor you want to listen to
        sensorManager.getDefaultSensor(Sensor.TYPE_ACCELEROMETER)?.also { accelerometer ->
            sensorManager.registerListener(
                this,
                accelerometer,
                SensorManager.SENSOR_DELAY_FASTEST,
                SensorManager.SENSOR_DELAY_FASTEST
            )
        }
    }

    override fun onSensorChanged(event: SensorEvent?) {
        // Checks for the sensor we have registered
        if (event?.sensor?.type == Sensor.TYPE_ACCELEROMETER) {
            //Log.d("Main", "onSensorChanged: sides ${event.values[0]} front/back ${event.values[1]} ")

            // Sides = Tilting phone left(10) and right(-10)
            val sides = event.values[0]

            // Up/Down = Tilting phone up(10), flat (0), upside-down(-10)
            val upDown = event.values[1]

            square.apply {
                rotationX = upDown * 3f
                rotationY = sides * 3f
                rotation = -sides
                translationX = sides * -10
                translationY = upDown * 10
            }

            // Changes the colour of the square if it's completely flat
            val color = if (upDown.toInt() == 0 && sides.toInt() == 0) Color.GREEN else Color.RED
            square.setBackgroundColor(color)

            square.text = "up/down ${upDown.toInt()}\nleft/right ${sides.toInt()}"
        }
    }

    override fun onAccuracyChanged(sensor: Sensor?, accuracy: Int) {
        return
    }

    override fun onDestroy() {
        sensorManager.unregisterListener(this)
        super.onDestroy()
    }
}



```

### Reference

Download the code below:

|No.|Link|
|--|---|
|1.|[Download Full Code](https://github.com/indently/accelerometer/archive/refs/heads/master.zip)|
|2.|Read more [here](https://github.com/indently/accelerometer).|
|3.|Follow code author [here](https://github.com/indently).|
