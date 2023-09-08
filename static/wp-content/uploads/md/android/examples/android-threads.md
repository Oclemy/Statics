# Android Threads Tutorial and Examples


_Android Threading Tutorial and Examples_

This is our android threading tutorial. We explore what a thread is and provide several abstractions for the `Thread` class.


#### What is a Thread?

A thread is a path of execution that exists within a process.

One process may have one or more threads.

A **Single-threaded** process has one thread while a **multi-threaded** process has more than one threads.

In the single-threaded process, we have only one flow of execution of instructions while in multi-threaded process we have we have multiple sets of instructions executed simultaneously.

A multi-threaded process has parts running concurrently and each part can do a given task independently.

So multi-threadig is a mechanism that allows us write programs in a way in which multiple activities can proceed concurrently in the same program.

And especially in today's multicore-device environment, developers should be capable of creating concurrent lines of execution that combine and aggregate data from multiple resources.

But, it is also important to note that in reality, a system that has only a single execution core can create the illusion of concurrent execution. It does this by executing the various threads in an interleaved manner. But it does it fast such that we think that it's actually doing tasks concurrently.

#### The Main Thread

Normally when you run your project,your [application](https://camposha.info/android/application) process will start. First there will be housekeeping threads for the Android Runtime or Dalvik Virtual Machine.

Apart from those the Android System will create a thread of execution called `main`. This will be the main thread for your application.

This thread is also sometimes called the `UI thread`.

You application can have many other threads, normally called background threads. However the main thread is the most crucial one. It is this thread that is responsible for interacting with Android Components and Views. It renders them and also updates their states.

This thread is very crucial especially given the fact as we've said, that it is where all android components([Activity](https://camposha.info/android/activity), Services, BroadcastReceiver ) are executed by default.

This thread is the one responsible for handling and listening to user input events. Due to how important it is, it's always adviced to keep it responsive by:

1. Not doing any kind task that are likely to take along time like `input/output` (I/O) in this thread. These tasks can block the main thread for an indefinite amount of time hence have to be ofloaded to a background thread.
2. Not doing CPU-intensive tasks in this thread. If you have some expensive calculations or tasks like video encoding, you need to offload them as well to background thread.

This thread normally has a facility attached to it called **Looper**. Looper will hold a **MessageQueue**. A MessageQueue is just a queue of messages with some unit of work that are to be executed sequentially.

So when a message is ready to be processed on the queue, the **Looper Thread** will pop that message from the queue. That message will be forwarded synchronously(sequentially) to the target handler. That handler is already specified in the message.

Then the Handler will start it's work and do it. When it finishes that work, then the Looper thread starts processing the next message available on the queue and pass it over for it to be also executed.

You can see this process is sequential. So suppose our Handler doesn't finish it's work quickly, the Looper will just be there waiting to process other pending messages in the queue.

In that case the system will show the Application Not Responding(ANR) Dialog. You may have already seen these in some apps. It means that application is not responding to user inputs. Yet it's busy doing work.

[notice] The ANR Dialog will be shown to users if an app doesn't respond to user input within five seconds. The system will then offer users the option to quit the application. [/notice]

You will run into this type of scenario when you try to do intensive tasks in your main thread. That means for example when you try to do the following in your main thread:

1. Access the Network/Web Services/internet
2. Access File system resources.
3. Try processing large amounts of data or doing complex math calculations etc.

Most of the code you write like in your activities, fragments, services normally run in the main thread by defaulu, unless you explicitly create a background thread.

Android SDK is based on a subset of Java SDK. Java SDK is derived from the Apache Harmony project and provides access to low-level concurrency constructs such as:

1. `java.lang.Thread`.
2. `java.lang.Runnable`.
3. `synchronized` and `volatile` keywords.

#### Thread class

The class `java.lang.Thread` is the most basic construct used to create threads.

It is also the most commonly used. This class creates us a new independent line of execution in a Java program.

One way of creating a new thread is just by subclassing or extending the `java.lang.Thread` class.

```java
public class MyThread extends Thread {
    public void run() {
        Log.d("Generic", "Our thread is running ...");
    }
}
```

We can then do our background task inside the `run()` method.

However that thread is not yet started. For that to happen we have to instantiate that class and explicitly start our thread:

```java
    MyThread myThread = new MyThread();
    myTread.start();
```

The `start()` method resides in the `Thread` class. Invoking it tells the system to create a thread inside the process and executes the `run()` method. The `run()` will be executed automatically if we invoke the `start()` method.

#### Common Threading Methods

**(a). Thread.currentThread()**

This method will return the Thread of the caller, that is, the current Thread.

**(b). Thread.sleep(time)**

This method will cause the thread which sent this message to sleep for the given interval of time (given in milliseconds and nanoseconds). The precision is not guaranteed - the `Thread` may sleep more or less than requested.

Basically it pauses the current thread from execution for the given period of time.

**(c). getContextClassLoader()**

This method will return the context ClassLoader for this Thread.

**(d). start()**

This method will start the new Thread of execution. The `run()` method of the receiver will be called by the receiver Thread itself (and not the Thread calling `start()`).

**(e). Thread.getName() and Thread.getId()**

These will get the `name` and `TID` respectively. These are mainly used for debugging purposes.

**(f) Thread.isAlive()**

`isAlive()` will check whether the thread is currently running or it has already finished its job.

**(g) Thread.join()**

`join()` will block the current thread and wait until the accessed thread finishes its execution or dies.

#### How to Maintain App Responsiveness

The best way to maintain app responsiveness is not by shunning away doing long running operations. Instead it is by offloading them from the main thread so that they can be handled in the background by another thread.

The main thread can then continue to process user-interface updates smoothly and respond in a timely fashion to user interactions.

Normally there are a set of typical operations that are common in many applications and do consume not only alot of time but also device resources.

These include:

- Accessing and Communicating via the network, especially internet.
- File Input and output operations. These occur on the local filesystem.
- Processing Image and video.
- Complex math calculations.
- Text processing - Trying to process or analyze a large blob of text.
- Data encoding and decoding.

#### Quick Threading Examples

##### 1\. Creating simple Timer with Thread class

This is a class to show how to implement a simple timer. It doesn't print our anything and is just a class showing how to implement such an idea.

```java
import java.lang.Thread;

public class TimerClass extends Thread{

    boolean timeExpired;
    double mTime;
    /** Creates a new instance of TimerClass */
    public TimerClass(double time){
        mTime = time;
    }

    public void run(){

        timeExpired = true;
        mTime = mTime * 1000;
        double startTime = System.currentTimeMillis();
        double stopTime = startTime + mTime;
        while(System.currentTimeMillis() < stopTime && timeExpired == false){
              try {
                Thread.sleep(10);
            } catch (InterruptedException e){ }
        }

        timeExpired = true;

    }

    public boolean getTimeExpired(){
        return true;
    }

    public void cancel(){
        timeExpired = true;
    }

}
```

##### 2\. Full Reusable Thread Utility class

```java
import android.os.Looper;

import java.util.concurrent.ExecutorService;
import java.util.concurrent.Executors;

/**
 * Threading tools
 * </p>
 */
public class ThreadUtils {

    private final static ExecutorService sThreadPool = Executors.newCachedThreadPool();

    /**
     * Current thread
     */
    public static Thread currentThread() {
        return Thread.currentThread();
    }

    /**
     * Current process ID
     */
    public static long currentThreadId() {
        return Thread.currentThread().getId();
    }

    /**
     * Current process name
     */
    public static String currentThreadName() {
        return Thread.currentThread().getName();
    }

    /**
     * Determine if it is a UI thread
     */
    public static boolean isUiThread() {
        return Looper.myLooper() == Looper.getMainLooper();
    }

    /**
     * Runs on the UI thread
     */
    public static void runOnUiThread(Runnable action) {
        if (action == null) {
            return;
        }
        if (Looper.myLooper() == Looper.getMainLooper()) {
            action.run();
        } else {
            HandlerUtils.uiPost(action);
        }
    }

    /**
     * Runs in the background thread
     */
    public static void runOnBackgroundThread(Runnable action) {
        if(action==null){
            return;
        }
        if (Looper.myLooper() != Looper.getMainLooper()) {
            action.run();
        }else{
            sThreadPool.submit(action);
        }
    }

    /**
     * Run on asynchronous thread
     */
    public static void runOnAsyncThread(Runnable action) {
        if (action == null) {
            return;
        }
        sThreadPool.submit(action);
    }

    /**
     * Runs on the current thread
     */
    public static void runOnPostThread(Runnable action) {
        if(action==null){
            return;
        }
        action.run();
    }

    public static void backgroundToUi ( final Runnable background , final Runnable ui ) {
        runOnBackgroundThread(new Runnable() {
            @Override
            public void run() {
                background.run();
                runOnUiThread ( ui );
            }
        });
    }
}
```
