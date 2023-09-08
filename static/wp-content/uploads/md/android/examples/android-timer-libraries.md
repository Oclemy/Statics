# CountDownTimer Examples


You can create a timer easily using classes like the Thread class and Handler class. Or if you want one with ready made UI then you can use a couple of libraries to inject a complete customizable timer. In this article, we want to look at how to create a timer using the aforementioned classes. We will also look at some ready made libraries to easen our work.

**Questions this article helps answer**

1. How to create a timer easily in android.
2. How to create a timer using handler.
3. Best android timer libraries

# Timer Examples

We will start by looking at examples of how to programmatically create a timer in android.

## Eample 1: Kotlin Android - Create a timer using CoundownTimer class

This is an example written in Kotlin. A simple timer with features lik start, pause, reset is created. No special library is used. The `CountDownTimer` class defined in the `android.os` package is used.

Here is the demo of what is created:

![Kotlin Android CountDownTimer Example](https://github.com/alirezabashi98/Test-CountDownTimer-in-android-kotlin/raw/master/scr001.png)

### Step 1: Dependencies

No special depdnency is needed for this project.

### Step 2: Design Layout

The next step is to design your XML layout. In this example only a basic layout is designed. Simple widgets like textviews and buttons are what make up our timer.

**activity_main.xml**

Here is the layout:

```xml
<?xml version="1.0" encoding="utf-8"?>
<LinearLayout xmlns:android="http://schemas.android.com/apk/res/android"
    xmlns:app="http://schemas.android.com/apk/res-auto"
    xmlns:tools="http://schemas.android.com/tools"
    android:layout_width="match_parent"
    android:layout_height="match_parent"
    tools:context=".MainActivity"
    android:layout_gravity="center|top"
    android:orientation="vertical">

    <TextView
        android:id="@+id/tv_main_timer"
        android:layout_width="wrap_content"
        android:layout_height="wrap_content"
        tools:text="timer"
        android:textSize="30dp"
        android:layout_gravity="center"
        android:layout_marginTop="60dp"
        android:layout_marginBottom="20dp"/>

    <Button
        android:onClick="on"
        android:id="@+id/btn_main_start"
        android:layout_width="match_parent"
        android:layout_height="wrap_content"
        android:layout_margin="20dp"
        android:textSize="20dp"
        android:text="start"/>

    <Button
        android:onClick="on"
        android:id="@+id/btn_main_pause"
        android:layout_width="match_parent"
        android:layout_height="wrap_content"
        android:layout_margin="20dp"
        android:textSize="20dp"
        android:text="pause"/>

    <Button
        android:onClick="on"
        android:id="@+id/btn_main_rest"
        android:layout_width="match_parent"
        android:layout_height="wrap_content"
        android:layout_margin="20dp"
        android:textSize="20dp"
        android:text="restart"/>

</LinearLayout>
```

### Step 3: Write Code

The code is written in kotlin. For example the following function will define the Timer format:

```kotlin
    fun setTextTimer() {
        var m = (timer / 1000) / 60
        var s = (timer / 1000) % 60

        var format = String.format("%02d:%02d", m, s)

        tv_main_timer.setText(format)
    }
```

This function on the other hand will reset the timer:

```kotlin
    private fun restTimer() {
        countDownTimer.cancel()
        timer = start
        setTextTimer()
    }
```

This other function will pause the timer:

```kotlin
    private fun pauseTimer() {
        countDownTimer.cancel()
    }
```

While this function will start the timer:

```kotlin
    private fun startTimer() {
        countDownTimer = object : CountDownTimer(timer,1000){
//            end of timer
            override fun onFinish() {
                Toast.makeText(this@MainActivity,"end timer",Toast.LENGTH_SHORT).show()
            }

            override fun onTick(millisUntilFinished: Long) {
                timer = millisUntilFinished
                setTextTimer()
            }

        }.start()
    }
```

Here is the full code:

```kotlin
import androidx.appcompat.app.AppCompatActivity
import android.os.Bundle
import android.os.CountDownTimer
import android.view.View
import android.widget.Toast
import kotlinx.android.synthetic.main.activity_main.*

class MainActivity : AppCompatActivity() {

    val start = 600_000L
    var timer = start
    lateinit var countDownTimer: CountDownTimer

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_main)
//      yhe first value
        setTextTimer()

    }

    fun on(view: View) {
        when(view.id){
            R.id.btn_main_start -> startTimer()
            R.id.btn_main_pause -> pauseTimer()
            R.id.btn_main_rest -> restTimer()
        }
    }

//    btn start
    private fun startTimer() {
        countDownTimer = object : CountDownTimer(timer,1000){
//            end of timer
            override fun onFinish() {
                Toast.makeText(this@MainActivity,"end timer",Toast.LENGTH_SHORT).show()
            }

            override fun onTick(millisUntilFinished: Long) {
                timer = millisUntilFinished
                setTextTimer()
            }

        }.start()
    }

//    btn pause
    private fun pauseTimer() {
        countDownTimer.cancel()
    }

//    btn restart
    private fun restTimer() {
        countDownTimer.cancel()
        timer = start
        setTextTimer()
    }

//  timer format
    fun setTextTimer() {
        var m = (timer / 1000) / 60
        var s = (timer / 1000) % 60

        var format = String.format("%02d:%02d", m, s)

        tv_main_timer.setText(format)
    }
}
```

### Run

Finally run the project.

### Reference

Here is the code reference

| No. | Link |
| --- | --- |
| 1. | [Download](https://github.com/alirezabashi98/Test-CountDownTimer-in-android-kotlin/archive/refs/heads/master.zip) code |
| 2. | [Browse](https://github.com/alirezabashi98/Test-CountDownTimer-in-android-kotlin/) code |
| 3. | [Follow](https://github.com/alirezabashi98) code author |

## Example 2: Create a timer using the Handler class

Let's look at how to create a timer using Handler class and textViews.

### Step 1: Dependencies

No special dependency is needed.

### Step 2: Create Layout

That layout will have a bunch of textviews to show various sections of our timer:

**activity_main.xml**

```xml
<?xml version="1.0" encoding="utf-8"?>
<RelativeLayout xmlns:android="http://schemas.android.com/apk/res/android"
    xmlns:app="http://schemas.android.com/apk/res-auto"
    xmlns:tools="http://schemas.android.com/tools"
    android:layout_width="match_parent"
    android:layout_height="match_parent"
    tools:context="com.parag.handlers.MainActivity">

    <TextView
        android:id="@+id/txt_view"
        android:layout_width="wrap_content"
        android:layout_height="wrap_content"
        android:text="0"
        app:layout_constraintBottom_toBottomOf="parent"
        app:layout_constraintLeft_toLeftOf="parent"
        app:layout_constraintRight_toRightOf="parent"
        app:layout_constraintTop_toTopOf="parent"
        android:layout_margin="10dp"
        android:layout_centerHorizontal="true"
        android:textStyle="bold"
        android:textSize="20sp"
        />

    <LinearLayout
        android:layout_below="@+id/txt_view"
        android:orientation="horizontal"
        android:layout_width="match_parent"
        android:layout_height="wrap_content">

        <Button
            android:id="@+id/btn_start"
            android:layout_width="0dp"
            android:layout_height="wrap_content"
            android:layout_weight="1"
            android:text="Start"
            android:layout_margin="10dp"
            style="?android:attr/buttonBarButtonStyle"
            />

        <Button
            android:id="@+id/btn_stop"
            android:layout_width="0dp"
            android:layout_height="wrap_content"
            android:layout_weight="1"
            android:text="stop"
            android:layout_margin="10dp"
            style="?android:attr/buttonBarButtonStyle"
            />

    </LinearLayout>

</RelativeLayout>
```

### Step 3: Write Code

Next write java code;

```java
package com.parag.handlers;

import android.support.v7.app.AppCompatActivity;
import android.os.Bundle;
import android.view.View;
import android.widget.Button;
import android.widget.TextView;
import java.util.Timer;
import java.util.TimerTask;

public class MainActivity extends AppCompatActivity {

    Button btnStart, btnStop;
    TextView textView;
    int counter = 0;
    Timer timer;
    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);

        btnStart = (Button)findViewById(R.id.btn_start);
        btnStop = (Button)findViewById(R.id.btn_stop);
        textView = (TextView)findViewById(R.id.txt_view);

        btnStart.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View view) {
                timer = new Timer();
                TimerTask timerTask = new TimerTask() {
                    @Override
                    public void run() {
                        counter += 1;
                        textView.post(new Runnable() {
                            @Override
                            public void run() {
                                textView.setText(""+counter);
                            }
                        });
                    }
                };

                timer.schedule(timerTask, 1000L, 1000L);

            }
        });

        btnStop.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View view) {
                timer.cancel();
                counter = 0;
                textView.setText("0");
            }
        });

    }
}
```

### Run

Copy the above code and run it in android studio. Or download it form [here](https://github.com/ParagKadam101/TimerDemo/archive/refs/heads/master.zip). The code is written by [this author](https://github.com/ParagKadam101).

## Example 3: How to create a recyclerveiw with multiple CountDownTimers

This example has been created by the author as a solution for appropriately handling multiple countdown timers in a recyclerview in android. It is a solution that has been inspired by several questions in StackOverflow.Below are some of those questions;

[Recyclerview with multiple countdown timers causes flickering](https://stackoverflow.com/questions/35860780/recyclerview-with-multiple-countdown-timers-causes-flickering)

[Multiple count down timers in RecyclerView flickering when scrolled](https://stackoverflow.com/questions/38890863/multiple-count-down-timers-in-recyclerview-flickering-when-scrolled)

[How to handle multiple countdown timers in RecyclerView?](https://stackoverflow.com/questions/32257586/how-to-handle-multiple-countdown-timers-in-recyclerview)

and [Handling countdown timers in recyclerview - android](https://stackoverflow.com/questions/38241539/handling-countdown-timers-in-recyclerview-android)

**Demo**

Here are the demo screenshots of the final project:

![phone image](https://github.com/Manikkumar1988/TimerInRecyclerView/raw/master/art/device-2017-09-05-062715.png)

![phone image](https://github.com/Manikkumar1988/TimerInRecyclerView/raw/master/art/device-2017-09-05-062727.png)

### Step 1: Create Project

Create an empty project in android studio.

### Step 2: Dependencies

In this project butterknife is used for view binding. However this is not mandatory to the concept being taught and the library can be replaced or removed.

```groovy
  implementation 'com.jakewharton:butterknife:8.8.1'
  annotationProcessor 'com.jakewharton:butterknife-compiler:8.8.1'
```

### Step 3: Design Layouts

The two layouts needed are the recyclerview item layout and the main activity layout. The recyclerview item layout will contain an imageview and a textview next to it:

**`recycler_item.xml`**

```xml
<?xml version="1.0" encoding="utf-8"?>
<RelativeLayout xmlns:android="http://schemas.android.com/apk/res/android"
    android:orientation="vertical"
    android:layout_width="match_parent"
    android:layout_height="100dp">
  <ImageView
      android:id="@+id/bck"
      android:layout_width="wrap_content"
      android:layout_height="wrap_content"
      android:src="@mipmap/ic_launcher"
      android:visibility="gone"></ImageView>
<TextView

    android:layout_width="match_parent"
    android:layout_height="wrap_content"
    android:id="@+id/timestamp"
    android:layout_centerInParent="true"
    android:text="10"/>
</RelativeLayout>
```

The the main activity layout will contain the recyclerview.

**`activity_main.xml`**

```xml
<?xml version="1.0" encoding="utf-8"?>
<RelativeLayout
    xmlns:android="http://schemas.android.com/apk/res/android"
    xmlns:app="http://schemas.android.com/apk/res-auto"
    xmlns:tools="http://schemas.android.com/tools"
    android:layout_width="match_parent"
    android:layout_height="match_parent">

<!-- <TextView
      android:layout_width="wrap_content"
      android:layout_height="wrap_content"
      android:id="@+id/timestamp"
      android:text="nodata"/>
  <TextView
      android:layout_width="wrap_content"
      android:layout_height="wrap_content"
      android:id="@+id/timestamp_one"
      android:layout_below="@id/timestamp"
      android:text="nodata"/>
  <TextView
      android:layout_width="wrap_content"
      android:layout_height="wrap_content"
      android:id="@+id/timestamp_two"
      android:layout_below="@id/timestamp_one"
      android:text="nodata"/>-->

  <android.support.v7.widget.RecyclerView
      android:id="@+id/recycler"
      android:layout_width="match_parent"
      android:layout_height="match_parent"
      app:layoutManager="android.support.v7.widget.LinearLayoutManager"></android.support.v7.widget.RecyclerView>

</RelativeLayout>
```

### Step 4: Create a Custom Runnable

Create a public class that implements the `Runnable` interface:

```java
public class CustomRunnable implements Runnable {
```

Define the instance properties of this class:

```java

  public long millisUntilFinished = 40000;
  public TextView holder;
  Handler handler;
  ImageView imageView;
```

Define the constructor of this class, making it receive parameters values and assign them to the above instance properties:

```java
  public CustomRunnable(Handler handler,TextView holder,long millisUntilFinished,ImageView imageView) {
    this.handler = handler;
    this.holder = holder;
    this.millisUntilFinished = millisUntilFinished;
    this.imageView = imageView;
  }
```

Override the `run()` method and construct a timer with seconds,minutes, hours and days, and set the resultant string to the textview:

```java
  @Override
  public void run() {
      /* do what you need to do */
    long seconds = millisUntilFinished / 1000;
    long minutes = seconds / 60;
    long hours = minutes / 60;
    long days = hours / 24;
    String time = days+" "+"days" +" :" +hours % 24 + ":" + minutes % 60 + ":" + seconds % 60;
    holder.setText(time);

    millisUntilFinished -= 1000;

    Log.d("DEV123",time);
    imageView.setX(imageView.getX()+seconds);
      /* and here comes the "trick" */
    handler.postDelayed(this, 1000);
  }

}
```

Here is the full code:

**`CustomRunnable.java`**

```java
package com.mani.rc;

import android.os.Handler;
import android.util.Log;
import android.widget.ImageView;
import android.widget.TextView;

public class CustomRunnable implements Runnable {

  public long millisUntilFinished = 40000;
  public TextView holder;
  Handler handler;
  ImageView imageView;

  public CustomRunnable(Handler handler,TextView holder,long millisUntilFinished,ImageView imageView) {
    this.handler = handler;
    this.holder = holder;
    this.millisUntilFinished = millisUntilFinished;
    this.imageView = imageView;
  }

  @Override
  public void run() {
      /* do what you need to do */
    long seconds = millisUntilFinished / 1000;
    long minutes = seconds / 60;
    long hours = minutes / 60;
    long days = hours / 24;
    String time = days+" "+"days" +" :" +hours % 24 + ":" + minutes % 60 + ":" + seconds % 60;
    holder.setText(time);

    millisUntilFinished -= 1000;

    Log.d("DEV123",time);
    imageView.setX(imageView.getX()+seconds);
      /* and here comes the "trick" */
    handler.postDelayed(this, 1000);
  }

}
```

### Step 5: Create a Custom Timer

It is a simple class with one `Long` property:

```java
class CustomTimer {
  public long startTime;
}
```

### Step 6: Create a RecyclerView Adapter

A reyclerview needs an adapter to inflate the model layout into a `View` object and bind data to the inflated widgets. Here is the adapter able to handle the countdown timer;

**`RecyclerViewAdapter.java`**

```java
public class RecyclerViewAdapter extends RecyclerView.Adapter<RecyclerViewAdapter.ViewHolder> {

  private static final String TAG = RecyclerViewAdapter.class.getSimpleName();

  private Context context;
  private List<CustomTimer> list;
  private OnItemClickListener onItemClickListener;
  private Handler handler = new Handler();

  public RecyclerViewAdapter(Context context, List<CustomTimer> list,
      OnItemClickListener onItemClickListener) {
    this.context = context;
    this.list = list;
    this.onItemClickListener = onItemClickListener;
  }

  public void clearAll() {
    handler.removeCallbacksAndMessages(null);
  }

  public class ViewHolder extends RecyclerView.ViewHolder {
    // Todo Butterknife bindings
    @BindView(R.id.timestamp) TextView timeStamp;
    @BindView(R.id.bck) ImageView imageView;
    CustomRunnable customRunnable;

    public ViewHolder(View itemView) {
      super(itemView);
      ButterKnife.bind(this, itemView);
      customRunnable = new CustomRunnable(handler,timeStamp,10000,imageView);
    }

    public void bind(final CustomTimer model, final OnItemClickListener listener) {
      /*itemView.setOnClickListener(new View.OnClickListener() {
        @Override public void onClick(View v) {
          listener.onItemClick(getLayoutPosition());
        }
      });*/

      handler.removeCallbacks(customRunnable);
      customRunnable.holder = timeStamp;
      customRunnable.millisUntilFinished = 10000 * getAdapterPosition(); //Current time - received time
      handler.postDelayed(customRunnable, 100);

    }
  }

  @Override public ViewHolder onCreateViewHolder(ViewGroup parent, int viewType) {
    Context context = parent.getContext();
    LayoutInflater inflater = LayoutInflater.from(context);

    View view = inflater.inflate(R.layout.recycler_item, parent, false);
    ButterKnife.bind(this, view);

    ViewHolder viewHolder = new ViewHolder(view);

    return viewHolder;
  }

  @Override public void onBindViewHolder(ViewHolder holder, int position) {
    //CustomTimer item = list.get(position);

    //Todo: Setup viewholder for item
    holder.bind(null, onItemClickListener);
  }

  @Override public int getItemCount() {
    return 100;//list.size();
  }

  public interface OnItemClickListener {
    void onItemClick(int position);
  }
}
```

### Step 7: Create main activity

Finally put everything together in the only and launcher activity of this project:

**`MainActivity.java`**

```java
public class MainActivity extends AppCompatActivity {

  TextView holder,holderOne,holderTwo;
  //CountDownTimer countDownTimer;

  @BindView(R.id.recycler) RecyclerView recyclerView;
  RecyclerViewAdapter recyclerViewAdapter;
  @Override protected void onCreate(Bundle savedInstanceState) {
    super.onCreate(savedInstanceState);
    setContentView(R.layout.activity_main);
    ButterKnife.bind(this);

  /*  holder = (TextView) findViewById(R.id.timestamp);
    holderOne = (TextView) findViewById(R.id.timestamp_one);
    holderTwo = (TextView) findViewById(R.id.timestamp_two);*/

    recyclerViewAdapter = new RecyclerViewAdapter(getApplicationContext(),null,null);
    recyclerView.setAdapter(recyclerViewAdapter);

    /*countDownTimer = new CustomTimer(10000, 500);
    final CustomRunnable customRunnable = new CustomRunnable();
    final CustomRunnable customRunnableOne = new CustomRunnable();
    final CustomRunnable customRunnableTwo = new CustomRunnable();
    FloatingActionButton fab = (FloatingActionButton) findViewById(R.id.fab);
    fab.setOnClickListener(new View.OnClickListener() {
      @Override public void onClick(View view) {
        //countDownTimer.start();
        handler.removeCallbacks(customRunnable);
        customRunnable.holder = holder;
        customRunnable.millisUntilFinished = 4000; //Current time - received time
        handler.postDelayed(customRunnable, 100);
        handler.removeCallbacks(customRunnableOne);
        customRunnableOne.holder = holderOne;
        customRunnableOne.millisUntilFinished = 50000; //Current time - received time
        handler.postDelayed(customRunnableOne, 100);
        handler.removeCallbacks(customRunnableTwo);
        customRunnableTwo.holder = holderTwo;
        customRunnableTwo.millisUntilFinished = 99000; //Current time - received time
        handler.postDelayed(customRunnableTwo, 100);
      }
    });*/
  }

  @Override protected void onPause() {
    super.onPause();
    //countDownTimer.cancel();
    /*handler.removeCallbacksAndMessages(null);
    holder = null;*/
    recyclerViewAdapter.clearAll();
  }

  /*private Handler handler = new Handler();
  public class CustomRunnable implements Runnable {
    public long millisUntilFinished = 40000;
    public TextView holder;
    @Override
    public void run() {
      *//* do what you need to do *//*
      long seconds = millisUntilFinished / 1000;
      long minutes = seconds / 60;
      long hours = minutes / 60;
      long days = hours / 24;
      String time = days+" "+"days" +" :" +hours % 24 + ":" + minutes % 60 + ":" + seconds % 60;
      holder.setText(time);
      millisUntilFinished -= 1000;
      Log.d("DEV123",time);
      *//* and here comes the "trick" *//*
      handler.postDelayed(this, 1000);
    }
  }
  public class CustomTimer extends CountDownTimer{
    public CustomTimer(long millisInFuture, long countDownInterval) {
      super(millisInFuture, countDownInterval);
      Log.d("DEV123","Creating new object");
    }
    public void onTick(long millisUntilFinished) {
      long seconds = millisUntilFinished / 1000;
      long minutes = seconds / 60;
      long hours = minutes / 60;
      long days = hours / 24;
      String time = days+" "+"days" +" :" +hours % 24 + ":" + minutes % 60 + ":" + seconds % 60;
      holder.setText(time);
      Log.d("DEV123",time);
    }
    public void onFinish() {
      holder.setText("Time up!");
    }
  }*/
}
```

### Run

Finally run the project.

### Reference

Below are code references:

| Number | Link |
| --- | --- |
| 1. | [Download code](https://github.com/Manikkumar1988/TimerInRecyclerView/archive/refs/heads/master.zip) |
| 2. | [Follow code author](https://github.com/Manikkumar1988/) |

# Best timer libraries

let's now look at some third party libraries to create a timer.

## (a). Solution 1: Use TickingTimer

> TickingTimer is an Android Library to implement visual timer quickly, easily and effortlessly.

It's features include:

1. Kotlin First
2. It is Highly Customizable.
3. It is lifecycle aware.
4. It provides animations support.

![](https://github.com/sidhuparas/TickingTimer/raw/master/screenshots/poster.jpeg)

Here's a demo: ![](https://github.com/sidhuparas/TickingTimer/raw/master/screenshots/TickingTimer.gif)

### Step 1: Install

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
     implementation 'com.github.sidhuparas:TickingTimer:1.0.0'
}
```

### Step 2: How To Use?

1. Add the timer in XML and specify width and height. TickingTimer currently doesn't support feature-specific XML attributes.

```xml
<com.parassidhu.tickingtimer.TickingTimer
        android:id="@+id/timerView"
        android:layout_width="250dp"
        android:layout_height="250dp" />
```

2. Start the timer in Java/Kotlin code:

```kotlin
    timerView.start() // Without any customization
```

or

```kotlin
    timerView.start {
        textSize(20)
        shape(Shape.CIRCLE)
        backgroundTint(Color.parseColor(Color.BLACK))
    }
```

#### Customizations

| Function | Parameter(s) | Description |
| --- | --- | --- |
| timerDuration() | duration (Int) | Duration for which timer should run |
| backgroundTint() | color (Int?) | Colored tint for the background. If null is passed, tint is removed |
| customBackground() | resource (@DrawableRes res: Int) | Custom background for the background provided as a drawable |
| shape() | shape (Shape) | Set background shape from predefined: CIRCLE, ROUNDED and CIRCLE. Doesn't apply if customBackground is applied after calling this function |
| textSize() | size (Int) | Timer duration text size in sp (scaled-pixels) |
| textColor() | color (Int) | Timer duration text color |
| textAppearance() | resId (Int) | Use for custom styling of the text. Pass the style resource Id |
| onFinished() | lambda () | Lambda callback executed when timer finishes |
| onTick() | lambda (Int) | Lambda executed on every second elapsed and provides remaining time |
| timerAnimation() | animation (Animation) | Custom timer animation |
| timerEndAnimation() | lambda (View) | Lambda exposes View and is executed on timer end. Perform end animation on the view here |
| applyConfig() | config (Config?) | Pass a config object to apply above properties in one go |
| cancel() | N/A | Cancels the timer. Automatically gets called on onDestroy() of the activity/fragment |

#### Saving Properties

To save the properties of the timer to reuse, you can use a Config object. Create config like this:

```kotlin
   val config = TickingTimer.defaultConfig().apply {
        timerDuration = 10
        textSize = 50
        textColor = Color.BLACK
        shape = Shape.ROUNDED
        customBackground = R.drawable.bg_grad_blue
   }
```

and then apply to the timer while starting:

`timerView.start(config)`

Another way to use the config is to use `applyConfig()` function:

```kotlin
   timerView.start {
        applyConfig(config)
        shape(Shape.CIRCLE)
        timerAnimation(ScaleAnimation(this@MainActivity, null))
        customBackground(R.drawable.bg_grad_orange)
   }
```

Remember that the properties defined after `applyConfig()` overrides the config's properties for the specific timer.

### Example

Here's a complete TickingTimer example:

**MainActivity.kt**

```kotlin
package com.parassidhu.tickingtimerapp

import android.graphics.Color
import android.os.Bundle
import android.view.animation.Animation
import android.view.animation.ScaleAnimation
import androidx.appcompat.app.AppCompatActivity
import com.parassidhu.tickingtimer.Shape
import com.parassidhu.tickingtimer.TickingTimer
import kotlinx.android.synthetic.main.activity_main.*

class MainActivity : AppCompatActivity() {

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_main)

        if (System.currentTimeMillis() % 2L == 0L)
            startView1()
        else
            startView2()
    }

    private fun startView1() {
        val config = TickingTimer.defaultConfig().apply {
            timerDuration = 10
            textSize = 50
            textColor = Color.BLACK
            shape = Shape.ROUNDED
            customBackground = R.drawable.bg_grad_blue
        }

        timerView1.start(config)

        timerView2.start {
            applyConfig(config)
            shape(Shape.CIRCLE)
            timerAnimation(ScaleAnimation(this@MainActivity, null))
            customBackground(R.drawable.bg_grad_orange)
        }
    }

    private fun startView2() {
        val config = TickingTimer.defaultConfig().apply {
            timerDuration = 10
            textSize = 50
            textColor = Color.parseColor("#70FFFFFF")
            shape = Shape.ROUNDED
            customBackground = R.drawable.bg_grad_green
        }

        timerView1.start(config)

        timerView2.start {
            applyConfig(config)
            shape(Shape.CIRCLE)
            timerAnimation(ScaleAnimation(this@MainActivity, null))
            customBackground(R.drawable.bg_grad_pink)
        }
    }
}
```

**activity_main.xml**

And here's the layout:

```xml
<?xml version="1.0" encoding="utf-8"?>
<androidx.constraintlayout.widget.ConstraintLayout xmlns:android="http://schemas.android.com/apk/res/android"
    xmlns:app="http://schemas.android.com/apk/res-auto"
    xmlns:tools="http://schemas.android.com/tools"
    android:layout_width="match_parent"
    android:layout_height="match_parent"
    tools:context=".MainActivity">

    <com.parassidhu.tickingtimer.TickingTimer
        android:id="@+id/timerView1"
        android:layout_width="250dp"
        android:layout_height="250dp"
        android:layout_margin="40dp"
        app:layout_constraintBottom_toTopOf="@+id/timerView2"
        app:layout_constraintEnd_toEndOf="parent"
        app:layout_constraintHorizontal_bias="0.5"
        app:layout_constraintStart_toStartOf="parent"
        app:layout_constraintTop_toTopOf="parent"
        app:layout_constraintVertical_chainStyle="packed" />

    <com.parassidhu.tickingtimer.TickingTimer
        android:id="@+id/timerView2"
        android:layout_width="250dp"
        android:layout_height="250dp"
        android:layout_margin="40dp"
        app:layout_constraintBottom_toBottomOf="parent"
        app:layout_constraintEnd_toEndOf="parent"
        app:layout_constraintHorizontal_bias="0.5"
        app:layout_constraintStart_toStartOf="parent"
        app:layout_constraintTop_toBottomOf="@+id/timerView1" />

</androidx.constraintlayout.widget.ConstraintLayout>
```

### Reference

Find complete reference [here](https://github.com/sidhuparas/TickingTimer).
