# Android Executor Tutorial and Examples

An Executor is an object that executes submitted Runnable tasks.


### What is ExecutorService?

The Java ExecutorService is a construct that allows you to pass a task to be executed by a thread asynchronously. This service creates and maintains a reusable pool of threads for executing submitted tasks.

The service also manages a queue, which is used when there are more tasks than the number of threads in the pool and there is a need to queue up tasks until there is a free thread available to execute the task.

### ThreadPoolExecutor

In this piece we want to look at `ThreadPoolExecutor` implementation of the ExecutorService with regards to Android Development.

To instantiate a ThreadpoolExecutor, You can either directly instantiate it using one of its constructor overloads, for example;

```java
ExecutorService executorService = new ThreadPoolExecutor(10, 10, 0L, TimeUnit.MILLISECONDS, new LinkedBlockingQueue<Runnable>());
```

In the above we've instantiated 10 threads with a KeepAlive parameter of 0 milliseconds.

You can also instantiate it using one of the factory methods in the Executors class.

```java
ExecutorService executor = Executors.newFixedThreadPool(10);
```

The above code has instantiated a ThreadPoolExecutor of 10 threads.

To instantiate a ThreadPoolExecutor of only one thread use the `newSingleThreadExecutor()` method:

```java
ExecutorService executor = Executors.newSingleThreadExecutor()
```

To instantiate a ThreadPoolExecutor that adds threads as needed use the `newCachedThreadPool()` method:

```java
ExecutorService executor = Executors.newCachedThreadPool();
```

When you instantiate your Executor Service, a few parameters are initialized. Depending on how you instantiated your Executor Service, you may manually specify these parameters or they may be provided for you by default. These parameters are:

- corePool size - minimum number of threads that should be kept in the pool.
    
- maxPool size - the maximum number of workers that can be in the pool.
    
- workQueue - used to queue up tasks for the available worker threads.
    
- keepAliveTime - If the current number of worker threads exceeds the core pool size and a keepAliveTime is set, then worker threads are shut down when there is no more work to do until the number of worker threads is back to the core pool size; a thread will wait for work for the keepAlive time, and when that is exceeded and no work arrives, it will shut down.
    
- threadFactory
    
- rejectedExecutionHandler
    

### Quick Executor Examples

Let's start by looking at some snippets of code before writing full examples later in the article, in both Java and Kotlin:

#### 1\. Using Executor with Handler

```java
public DownloadStatusDeliveryImpl(final Handler handler) {
    this.mDownloadStatusPoster = new Executor() {
        public void execute(Runnable command) {
            handler.post(command);
        }
    };
}
```

#### 2\. Example 2

```java
package executortest;

import java.time.LocalDate;
import java.util.Timer;
import java.util.TimerTask;
import java.util.concurrent.ExecutorService;
import java.util.concurrent.RejectedExecutionHandler;
import java.util.concurrent.SynchronousQueue;
import java.util.concurrent.ThreadLocalRandom;
import java.util.concurrent.ThreadPoolExecutor;
import java.util.concurrent.TimeUnit;

public class Client {

    public static void main(String[] args) {

        Timer timer = new Timer();
        timer.scheduleAtFixedRate(new TimerTask() {
            @Override
            public void run() {
                System.gc();
            }
        }, 10000, 30000);

        ExecutorService executorService = new ThreadPoolExecutor(0, Integer.MAX_VALUE, 60L, TimeUnit.SECONDS,
                new SynchronousQueue<Runnable>(), new RejectedExecutionHandler() {

                    public void rejectedExecution(Runnable r, ThreadPoolExecutor executor) {
                        System.out.println("Runnable rejected :: " + LocalDate.now());
                    }
                });

        while (true) {

            for (int i = 0; i < 10; i++) {
                executorService.execute(new Runnable() {

                    public void run() {

                        System.out.println("Thread executed");
                    }
                });
            }

            try {
                Thread.sleep(1000);
            } catch (InterruptedException e) {
                e.printStackTrace();
            }
        }

    }
}
```

#### 3\. Example 3

```java
package executorsexample;

/**
 *
 * @author jessi
 */
import java.util.concurrent.ExecutorService;
import java.util.concurrent.Executors;
import java.util.concurrent.TimeUnit;

public class ExecutorsExample {

    public static void main(String[] args) {
        System.out.println("Inside : " + Thread.currentThread().getName());

        System.out.println("Creating Executor Service with a thread pool of Size 4");
        ExecutorService executorService = Executors.newFixedThreadPool(4);

        Runnable task1 = () -> {
            System.out.println("Executing Task1 inside : " + Thread.currentThread().getName());
            try {
                TimeUnit.SECONDS.sleep(2);
            } catch (InterruptedException ex) {
                throw new IllegalStateException(ex);
            }
        };

        Runnable task2 = () -> {
            System.out.println("Executing Task2 inside : " + Thread.currentThread().getName());
            try {
                TimeUnit.SECONDS.sleep(4);
            } catch (InterruptedException ex) {
                throw new IllegalStateException(ex);
            }
        };

        Runnable task3 = () -> {
            System.out.println("Executing Task3 inside : " + Thread.currentThread().getName());
            try {
                TimeUnit.SECONDS.sleep(3);
            } catch (InterruptedException ex) {
                throw new IllegalStateException(ex);
            }
        };

        Runnable task4 = () -> {
            System.out.println("Executing Task4 inside : " + Thread.currentThread().getName());
            try {
                TimeUnit.SECONDS.sleep(5);
            } catch (InterruptedException ex) {
                throw new IllegalStateException(ex);
            }
        };

        Runnable task5 = () -> {
            System.out.println("Executing Task5 inside : " + Thread.currentThread().getName());
            try {
                TimeUnit.SECONDS.sleep(6);
            } catch (InterruptedException ex) {
                throw new IllegalStateException(ex);
            }
        };

        Runnable task6 = () -> {
            System.out.println("Executing Task6 inside : " + Thread.currentThread().getName());
            try {
                TimeUnit.SECONDS.sleep(1);
            } catch (InterruptedException ex) {
                throw new IllegalStateException(ex);
            }
        };

        System.out.println("Submitting the tasks for execution...");
        executorService.submit(task1);
        executorService.submit(task2);
        executorService.submit(task3);
        executorService.submit(task4);
        executorService.submit(task5);
        executorService.submit(task6);

        executorService.shutdown();
    }
}
```

Let's look at some full examples in Android.

## Example 1: Android ThreadPoolExecutor simple Example

Here is a simple step by step example to teach you the threadpoolexecutor in android.

### Step 1: Create Project

Start by creating an empty `Android Studio` project.

### Step 2: Dependencies

No third party dependencies are needed for this example.

### Step 3: Design Layout

Design a simple layout with buttons and textviews:

```xml
<?xml version="1.0" encoding="utf-8"?>
<LinearLayout
    xmlns:android="http://schemas.android.com/apk/res/android"
    xmlns:app="http://schemas.android.com/apk/res-auto"
    xmlns:tools="http://schemas.android.com/tools"
    android:layout_width="match_parent"
    android:layout_height="match_parent"
    android:paddingBottom="@dimen/activity_vertical_margin"
    android:paddingLeft="@dimen/activity_horizontal_margin"
    android:paddingRight="@dimen/activity_horizontal_margin"
    android:paddingTop="@dimen/activity_vertical_margin"
    android:orientation="vertical"
    app:layout_behavior="@string/appbar_scrolling_view_behavior"
    tools:context="com.example.bajian.androidthreadpooldemo.MainActivity"
    tools:showIn="@layout/activity_main">

    <TextView
        android:layout_width="wrap_content"
        android:layout_height="wrap_content"
        android:text="Hello World!"/>
    <Button
        android:layout_width="wrap_content"
        android:layout_height="wrap_content"
        android:text="newCachedThreadPool"
        android:onClick="newCachedThreadPool"/>
    <Button
        android:layout_width="wrap_content"
        android:layout_height="wrap_content"
        android:text="newFixedThreadPool"
        android:onClick="newFixedThreadPool"/>

<LinearLayout
    android:layout_width="match_parent"
    android:layout_height="wrap_content"
    android:orientation="horizontal">
    <Button
        android:layout_width="wrap_content"
        android:layout_height="wrap_content"
        android:text="newScheduledThreadPool"
        android:onClick="newScheduledThreadPool"/>
    <Button
        android:layout_width="wrap_content"
        android:layout_height="wrap_content"
        android:text="stop"
        android:onClick="stop"/>

</LinearLayout>
    <Button
        android:layout_width="wrap_content"
        android:layout_height="wrap_content"
        android:text="newSingleThreadExecutor"
        android:onClick="newSingleThreadExecutor"/>

</LinearLayout>
```

### Step 5: Write Code

Go to `MainActivity.java` and start by adding imports, among them the following:

```java
import java.util.concurrent.ExecutorService;
import java.util.concurrent.Executors;
import java.util.concurrent.ScheduledExecutorService;
import  java.util.concurrent.TimeUnit ;
```

In our `MainActivity` define two instance fields:

```java
public class MainActivity extends AppCompatActivity {

    private Runnable r;
    private ScheduledExecutorService scheduledThreadPool;
```

The method below shows you how to create a Create a cacheable & infinite thread pool. If the length of the thread pool exceeds the processing needs, idle threads can be recycled flexibly. If there is no recycling, new threads can be created. The sample code is as follows:

```java
    public void newCachedThreadPool(View v){
        ExecutorService cachedThreadPool = Executors.newCachedThreadPool();
        for (int i = 0; i < 10; i++) {
            final int index = i;

            try {
                Thread.sleep(500);
            } catch (InterruptedException e) {
                e . printStackTrace ();
            }
            cachedThreadPool.execute(new Runnable() {

                @Override
                public  void  run () {
                    System.out.println(index);
                    System.out.println(Thread.currentThread().getName());
                    try {
                        Thread.sleep(index * 1000);
                    } catch (InterruptedException e) {
                        e . printStackTrace ();
                    }
                }
            });
        }
    }
```

The method below shows you how to create a fixed-length thread pool, which can control the maximum concurrent number of threads, and the excess threads will wait in the queue. The size of the fixed-length thread pool is best set according to system resources. Such as `Runtime.getRuntime().availableProcessors()`

```java
    public void newFixedThreadPool(View v){
        int num=Runtime.getRuntime().availableProcessors();
        System.out.println("Runtime.getRuntime().availableProcessors()->"+num);
        ExecutorService fixedThreadPool = Executors.newFixedThreadPool(3);
        for (int i = 0; i < 10; i++) {
            final int index = i;
            fixedThreadPool.execute(new Runnable() {
                @Override
                public  void  run () {
                    try {
                        System.out.println(index);
                        Thread.sleep(1000);
                    } catch (InterruptedException e) {
                        e . printStackTrace ();
                    }
                }
            });
        }
    }
```

Here is how we will shut down our ThreadPools:

```java
    public void stop(View v){
        if (scheduledThreadPool!=null)
            scheduledThreadPool.shutdownNow();
        //        scheduledThreadPool.shutdown();
//        scheduledThreadPool.shutdownNow();
    }
```

The method below shows you how to create a single-threaded thread pool, it will only use a unique worker thread to perform tasks, ensuring that all tasks are executed in the specified order (FIFO, LIFO, priority). Single thread in Android can be used for database operations, file operations, application batch installation, application batch deletion, etc., which are not suitable for combined transmission but may be IO blocking and affect the UI thread response.

```java
    public void newSingleThreadExecutor(View v){

        ExecutorService singleThreadExecutor = Executors.newSingleThreadExecutor();
        for (int i = 0; i < 10; i++) {
            final int index = i;
            singleThreadExecutor.execute(new Runnable() {

                @Override
                public  void  run () {
                    try {
                        System.out.println(index);
                        Thread.sleep(2000);
                    } catch (InterruptedException e) {
                        e . printStackTrace ();
                    }
                }
            });
        }
    }
```

Here is the full code:

**MainActivity.java**

```java
package com.example.bajian.androidthreadpooldemo;

import android.os.Bundle;
import android.support.v7.app.AppCompatActivity;
import android.support.v7.widget.Toolbar;
import android.view.Menu;
import android.view.MenuItem;
import android.view.View;

import java.util.concurrent.ExecutorService;
import java.util.concurrent.Executors;
import java.util.concurrent.ScheduledExecutorService;
import  java.util.concurrent.TimeUnit ;

public class MainActivity extends AppCompatActivity {

    private Runnable r;
    private ScheduledExecutorService scheduledThreadPool;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super . onCreate (savedInstanceState);
        setContentView(R.layout.activity_main);
        Toolbar toolbar = (Toolbar) findViewById(R.id.toolbar);
        setSupportActionBar(toolbar);

    }

    public void newCachedThreadPool(View v){
        ExecutorService cachedThreadPool = Executors.newCachedThreadPool();
        for (int i = 0; i < 10; i++) {
            final int index = i;

            try {
                Thread.sleep(500);
            } catch (InterruptedException e) {
                e . printStackTrace ();
            }
            cachedThreadPool.execute(new Runnable() {

                @Override
                public  void  run () {
                    System.out.println(index);
                    System.out.println(Thread.currentThread().getName());
                    try {
                        Thread.sleep(index * 1000);
                    } catch (InterruptedException e) {
                        e . printStackTrace ();
                    }
                }
            });
        }
    }

    public void newFixedThreadPool(View v){
        int num=Runtime.getRuntime().availableProcessors();
        System.out.println("Runtime.getRuntime().availableProcessors()->"+num);
        ExecutorService fixedThreadPool = Executors.newFixedThreadPool(3);
        for (int i = 0; i < 10; i++) {
            final int index = i;
            fixedThreadPool.execute(new Runnable() {
                @Override
                public  void  run () {
                    try {
                        System.out.println(index);
                        Thread.sleep(1000);
                    } catch (InterruptedException e) {
                        e . printStackTrace ();
                    }
                }
            });
        }
    }

    public void stop(View v){
        if (scheduledThreadPool!=null)
            scheduledThreadPool.shutdownNow();
        //        scheduledThreadPool.shutdown();
//        scheduledThreadPool.shutdownNow();
    }
    /**
     * The choice between Timer and ScheduledExecutorService
     * Create a fixed-length thread pool to support timing and periodic task execution.
     * In fact, when the time to execute the task is greater than the interval we specify, it will not open up a new thread to execute the task concurrently at the specified interval. But wait for the thread to finish executing
     *   @param v
     */
    public void newScheduledThreadPool(View v){

        scheduledThreadPool = Executors.newScheduledThreadPool(5);

        // Execution delayed by 3 seconds.
/*
        scheduledThreadPool.schedule(new Runnable() {
            @Override
            public void run() {
                System.out.println("delay 3 seconds");
            }
        }, 3, TimeUnit.SECONDS);
*/

        r=new Runnable() {

            @Override
            public  void  run () {
                try {
                    Thread . Sleep( 5000 ); // In fact, when the time to execute the task is greater than the interval we specify, it will not open up a new thread to execute the task concurrently at the specified interval. But wait for the thread to finish executing
                } catch (InterruptedException mE) {
                    mE.printStackTrace();
                }
                System.out.println("delay 1 seconds, and excute every 3 seconds");
            }
        };
//         Indicates that it will be executed every 3 seconds after a delay of 1 second.
//         ScheduledExecutorService is safer and more powerful than Timer. There will be a demo for comparison later.
//         When executing a task, if the specified scheduled execution time scheduledExecutionTime<= systemCurrentTime, the task will first be executed once; then according to the execution time, the current system time and the period parameters, the number of expired executions is calculated, and the calculation is based on: (systemCurrentTime -scheduledExecutionTime)/period, the number of times that the calculation is executed again; finally, the execution is fixed and repeated according to the period parameter
        scheduledThreadPool.scheduleAtFixedRate(r, 1, 3, TimeUnit.SECONDS);
/*        scheduledThreadPool.scheduleAtFixedRate(new Runnable() {
            @Override
            public void run() {
                System.out.println("excute every 2 seconds");
            }
        }, 1, 2, TimeUnit.SECONDS);*/

    }

    public void newSingleThreadExecutor(View v){

        ExecutorService singleThreadExecutor = Executors.newSingleThreadExecutor();
        for (int i = 0; i < 10; i++) {
            final int index = i;
            singleThreadExecutor.execute(new Runnable() {

                @Override
                public  void  run () {
                    try {
                        System.out.println(index);
                        Thread.sleep(2000);
                    } catch (InterruptedException e) {
                        e . printStackTrace ();
                    }
                }
            });
        }
    }

    @Override
    public  boolean  onCreateOptionsMenu ( Menu  menu ) {
        // Inflate the menu; this adds items to the action bar if it is present.
        getMenuInflater().inflate(R.menu.menu_main, menu);
        return true;
    }

    @Override
    public boolean onOptionsItemSelected(MenuItem item) {
        // Handle action bar item clicks here. The action bar will
        // automatically handle clicks on the Home/Up button, so long
        // as you specify a parent activity in AndroidManifest.xml.
        int id = item.getItemId();

        // noinspection SimplifiableIfStatement
        if (id == R.id.action_settings) {
            return true;
        }

        return super.onOptionsItemSelected(item);
    }
}
```

### Run

Copy the code or download it in the link below, build and run.

### Reference

Here are the reference links:

| Number | Link |
| --- | --- |
| 1. | [Download](https://github.com/bajian/AndroidThreadPoolDemo/archive/refs/heads/master.zip) Example |
| 2. | [Follow](https://github.com/bajian/) code author |

## Example 2 - Android ThreadPoolExecutor

This is a simple example written in Java.

### Step 1: Dependencies

No external dependencies are needed.

### Step 2: Create MainActivity

Create your MainActivity as follows:

**MainActivity.java**

```java
import android.os.Bundle;
import android.support.v7.app.AppCompatActivity;
import android.view.View;
import android.widget.TextView;

import java.util.concurrent.Executor;
import java.util.concurrent.Executors;
import java.util.concurrent.LinkedBlockingDeque;
import java.util.concurrent.ThreadPoolExecutor;
import java.util.concurrent.TimeUnit;

public class MainActivity extends AppCompatActivity {

    /**
   * Gets the number of available cores
   * (not always the same as the maximum number of cores)
   **/
    private static int NUMBER_OF_CORES = Runtime.getRuntime().availableProcessors();
    // Sets the amount of time an idle thread waits before terminating
    private static final int KEEP_ALIVE_TIME = 1000;

    // Sets the Time Unit to Milliseconds
    private static final TimeUnit KEEP_ALIVE_TIME_UNIT = TimeUnit.MILLISECONDS;

    // Used to update UI with work progress
    private int count = 0;

    // This is the runnable task that we will run 100 times
    private Runnable runnable = new Runnable() {
        @Override
        public void run() {
            // Do some work that takes 50 milliseconds
            try {
                Thread.sleep(50);
            } catch (InterruptedException e) {
                e.printStackTrace();
            }

            // Update the UI with progress
            runOnUiThread(new Runnable() {
                @Override
                public void run() {
                    count++;
                    String msg = count < 100 ? "working " : "done ";
                    updateStatus(msg + count);
                }
            });

        }
    };

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);
    }
    // button click - performs work on a single thread
    public void buttonClickSingleThread(View view) {
        count = 0;
        Executor mSingleThreadExecutor = Executors.newSingleThreadExecutor();

        for (int i = 0; i < 100; i++) {
            mSingleThreadExecutor.execute(runnable);
        }
    }

    // button click - performs work using a thread pool
    public void buttonClickThreadPool(View view) {
        count = 0;
        ThreadPoolExecutor mThreadPoolExecutor = new ThreadPoolExecutor(
                NUMBER_OF_CORES + 5,   // Initial pool size
                NUMBER_OF_CORES + 8,   // Max pool size
                KEEP_ALIVE_TIME,       // Time idle thread waits before terminating
                KEEP_ALIVE_TIME_UNIT,  // Sets the Time Unit for KEEP_ALIVE_TIME
                new LinkedBlockingDeque<Runnable>());  // Work Queue

        for (int i = 0; i < 100; i++) {
            mThreadPoolExecutor.execute(runnable);
        }
    }

    private void updateStatus(String msg) {
        ((TextView) findViewById(R.id.text)).setText(msg);
    }

}
```

### Step 4: Create Layout

Here is our MainActivity layout:

**activity_main.xml**

```xml
<?xml version="1.0" encoding="utf-8"?>
<ScrollView

    android_layout_width="match_parent"
    android_layout_height="match_parent"
    android_padding="20dp"
    android_orientation="vertical"
    tools_context=".MainActivity">

    <LinearLayout
        android_layout_width="match_parent"
        android_layout_height="wrap_content"
        android_padding="5dp"
        android_orientation="vertical">

        <TextView
            android_id="@+id/text"
            android_gravity="center"
            android_layout_width="match_parent"
            android_layout_margin="10dp"
            android_layout_height="wrap_content"
            android_text="@string/app_name" />

        <Button
            android_id="@+id/singleButton"
            android_layout_width="match_parent"
            android_layout_height="wrap_content"
            android_onClick="buttonClickSingleThread"
            android_text="Single Thread" />

        <Button
            android_id="@+id/poolButton"
            android_layout_width="match_parent"
            android_layout_height="wrap_content"
            android_onClick="buttonClickThreadPool"
            android_text="Thread Pool" />

    </LinearLayout>

</ScrollView>
```

### Reference

[Download](https://github.com/Piashsarker/ThreadPoolExecutorAndroid/archive/refs/heads/master.zip).

## Example 3: Kotlin Android ThreadPoolExecutor Example

Let;s look at a ThreadPoolExecutor example in a step by step manner.

### Step 1: Create Project

Start by creating an empty `Android Studio` project.

### Step 2: Dependencies

No third party dependencies are needed.

### Step 3: Create layout

We need to create a single layout and add some progressbars to it:

**activity_executor.xml**

```xml
<?xml version="1.0" encoding="utf-8"?>
<android.support.constraint.ConstraintLayout xmlns:android="http://schemas.android.com/apk/res/android"
    xmlns:app="http://schemas.android.com/apk/res-auto"
    xmlns:tools="http://schemas.android.com/tools"
    android:layout_width="match_parent"
    android:layout_height="match_parent"
    tools:context="com.kotlin.siddhant.androidexecutorexample.ExecutorActivity">

    <ProgressBar
        android:id="@+id/progressBar"
        style="?android:attr/progressBarStyleHorizontal"
        android:layout_width="331dp"
        android:layout_height="44dp"
        android:layout_marginEnd="26dp"
        android:layout_marginStart="27dp"
        android:layout_marginTop="26dp"
        app:layout_constraintEnd_toEndOf="parent"
        app:layout_constraintStart_toStartOf="parent"
        app:layout_constraintTop_toTopOf="parent" />

    <ProgressBar
        android:id="@+id/progressBar2"
        style="?android:attr/progressBarStyleHorizontal"
        android:layout_width="331dp"
        android:layout_height="44dp"
        android:layout_marginEnd="26dp"
        android:layout_marginStart="27dp"
        android:layout_marginTop="23dp"
        app:layout_constraintEnd_toEndOf="parent"
        app:layout_constraintStart_toStartOf="parent"
        app:layout_constraintTop_toBottomOf="@+id/progressBar" />

    <ProgressBar
        android:id="@+id/progressBar3"
        style="?android:attr/progressBarStyleHorizontal"
        android:layout_width="331dp"
        android:layout_height="44dp"
        android:layout_marginEnd="26dp"
        android:layout_marginStart="27dp"
        android:layout_marginTop="25dp"
        app:layout_constraintEnd_toEndOf="parent"
        app:layout_constraintStart_toStartOf="parent"
        app:layout_constraintTop_toBottomOf="@+id/progressBar2" />

    <ProgressBar
        android:id="@+id/progressBar4"
        style="?android:attr/progressBarStyleHorizontal"
        android:layout_width="331dp"
        android:layout_height="44dp"
        android:layout_marginEnd="26dp"
        android:layout_marginStart="27dp"
        android:layout_marginTop="27dp"
        app:layout_constraintEnd_toEndOf="parent"
        app:layout_constraintStart_toStartOf="parent"
        app:layout_constraintTop_toBottomOf="@+id/progressBar3" />

    <ProgressBar
        android:id="@+id/progressBar5"
        style="?android:attr/progressBarStyleHorizontal"
        android:layout_width="331dp"
        android:layout_height="44dp"
        android:layout_marginEnd="26dp"
        android:layout_marginStart="27dp"
        android:layout_marginTop="30dp"
        app:layout_constraintEnd_toEndOf="parent"
        app:layout_constraintStart_toStartOf="parent"
        app:layout_constraintTop_toBottomOf="@+id/progressBar4" />

    <Button
        android:id="@+id/btnStart"
        android:layout_width="332dp"
        android:layout_height="wrap_content"
        android:layout_marginEnd="25dp"
        android:layout_marginStart="27dp"
        android:layout_marginTop="40dp"
        android:text="Start"
        app:layout_constraintEnd_toEndOf="parent"
        app:layout_constraintStart_toStartOf="parent"
        app:layout_constraintTop_toBottomOf="@+id/progressBar5" />
</android.support.constraint.ConstraintLayout>
```

### Step 4: Write Code

We use the MVP Design Pattern. Start by creating a Contract:

**Contract.kt**

```kotlin
public class Contract
{
    public interface View
    {
        public fun initView()
    }

    public interface Presenter
    {
        public fun onClick()
    }

}
```

Then extend the `Thread` class to create our `CounterThread`:

**CounterThread.kt**

```kotlin
import android.app.Activity
import android.widget.ProgressBar

public class CounterThread(progressBar: ProgressBar,activity:Activity):Thread()
{
    var progressBar=progressBar
    var activity=activity

    override fun run() {
        super.run()
        for (progress in 0..100 step 10) // step is use to increase count by 10 (it shows jump)
        {

            (activity as ExecutorActivity).runOnUiThread {
               progressBar.setProgress(progress) // here we set progress android
             }
            Thread.sleep(1000)
        }

    }
}
```

Then create our `ExecutorPresentor`:

**ExecutorPresenter.kt**

```kotlin
import android.app.Activity
import java.util.concurrent.Executor
import java.util.concurrent.Executors

/**
 * Created by Siddhant on 22/03/18.
 */
public class ExecutorPresentor(activity:Activity):Contract.Presenter
{
    var activity=activity as ExecutorActivity
    init {
        (activity as ExecutorActivity)?.initView()
    }
    override fun onClick()
    {
        activity?.initView()
        var executor=Executors.newScheduledThreadPool(2)
        var counterThread=CounterThread(activity.progressBar!!,activity)
        var counterThread2=CounterThread(activity.progressBar2!!,activity)
        var counterThread3=CounterThread(activity.progressBar3!!,activity)
        var counterThread4=CounterThread(activity.progressBar4!!,activity)
        var counterThread5=CounterThread(activity.progressBar5!!,activity)

        executor.execute(counterThread)
        executor.execute(counterThread2)
        executor.execute(counterThread3)
        executor.execute(counterThread4)
        executor.execute(counterThread5)
    }

}
```

The finally the `ExecutorActivity` which is the launcher activity:

**ExecutorActivity.kt**

```kotlin
import android.support.v7.app.AppCompatActivity
import android.os.Bundle
import android.view.View
import android.widget.Button
import android.widget.ProgressBar
import kotlinx.android.synthetic.main.activity_executor.*

class ExecutorActivity : AppCompatActivity(),Contract.View, View.OnClickListener {

    var progressBar:ProgressBar?=null
    var progressBar2:ProgressBar?=null
    var progressBar3:ProgressBar?=null
    var progressBar4:ProgressBar?=null
    var progressBar5:ProgressBar?=null
    var btnStart:Button?=null

    var presenter:ExecutorPresentor?=null

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_executor)
        presenter= ExecutorPresentor(this)
    }
    // Progressbar initialization
    override fun initView() {
        progressBar=findViewById(R.id.progressBar)
        progressBar2=findViewById(R.id.progressBar2)
        progressBar3=findViewById(R.id.progressBar3)
        progressBar4=findViewById(R.id.progressBar4)
        progressBar5=findViewById(R.id.progressBar5)
        btnStart=findViewById(R.id.btnStart)
        btnStart?.setOnClickListener(this)
    }

    //on click of btnStart to perform action on click
    override fun onClick(view: View?)
    {
        when(view?.id)
        {
            R.id.btnStart ->
                presenter?.onClick()

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
| 1. | [Download](https://github.com/siddhpatil6/Kotlin-Executor/archive/refs/heads/master.zip) Example |
| 2. | [Follow](https://github.com/siddhpatil6/) code author |
