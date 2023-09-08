# Android Handler Tutorial and Examples

_Android Handler Tutorial and Examples_

A Handler is a threading class defined in the `android.os` package through which we can send and process `Message` and `Runnable` objects associated with a thread's `MessageQueue`.

You start by creating a Handler instance. Then that instance gets associated with a single thread as well as that thread's message queue. The Handler you've just created will then get bound to the thread or message queue of the thread that is creating it. Hence it can then deliver messages and runnables to that message queue and execute them as they come out of the message queue.

### Uses of Handler

Handler has two main uses

1. Scehduling of messages and runnables that need to be executed in the future.
2. Enqueueing actions that need to be performed in the background thread.

### Handler and Looper

Handler is a class fundamental to how we do threading in android, at the infrastructure level. It works hand in hand with the Looper. Together they underpin everything that the main thread does—including the invocation of the Activity lifecycle methods.

`Looper` will take care of dispatching work on its message-loop thread. On the other hand `Handler` will serve two roles:

1. First it will provide an interface to submit messages to its Looper queue. 2.Secondly it will implement the callback for processing those messages when they are dispatched by the Looper.

Each Handler gets bound to a single Looper and, by extension, to one thread and its looper MessageQueue.

We said Handler does provide an interface to submit work to Looper threads. Apart from that, Handler also defines the code that process the messages submitted.

For example in the following code, the `MyHandler` class will override the `Handler`'s `handleMessage()` method.

This is where we then write our message-handling code:

```java
public class MyHandler extends Handler {
    @Override
    public void handleMessage(Message msg) {
        // your message handling code here
    }
}
```

Let's say we have created a thread called `MyThread`. We can then create our handler inside our `MyThread` thread over the default constructor `Handler()`.

Hence `myHandler` will get attached to the current thread's Looper instead of the main thread's Looper:

```java
public class MyThread extends Thread{
    private Handler myHandler;
    @Override
    public void run() {
        Looper.prepare();
        myHandler = new MyHandler();
        Looper.loop();
    }
    public Handler getHandler(){
        return myHandler;
    }
}
```

Then once started, the Looper thread is going to wait inside `loop()` method of the `Looper` class for messages to be added to its queue.

Then another thread can add a message to that queue. It can do that using the `submit()` method.

When that happens, the waiting thread will dispatch the message to our target `MyHandler` by invoking the handler's `handleMessage()` method.

Handler instance/object allows us to be able to send messages to the Handler class from any thread and as a consequence, it is always dispatched to the Looper thread and handled by the correct Handler,

### Handler Quick Examples

Let's look at Handler quick examples, snippets and howTos.

##### 1\. How to show a splash activity via Handler

Our aim is to show a splash activity via Handler.

Asssume you have this layout as our `activity_splash`. It has imageview and several textviews.

```xml
<?xml version="1.0" encoding="utf-8"?>
<RelativeLayout

    android_id="@+id/activity_splash"
    android_layout_width="match_parent"
    android_layout_height="match_parent"
    tools_context="com.pchef.cc.personalchef.Splash">

    <ImageView
        android_layout_width="match_parent"
        android_layout_height="match_parent"
        android_id="@+id/s_img"
        android_alpha="0.7"
        android_src="@drawable/splash"
        android_scaleType="centerCrop"/>

    <LinearLayout
        android_layout_width="match_parent"
        android_layout_height="wrap_content"
        android_orientation="vertical"
        android_layout_centerInParent="true">

        <TextView
            android_layout_width="200dp"
            android_layout_height="wrap_content"
            android_text="Personal Chef"
            android_layout_gravity="center"
            android_gravity="center"
            android_textColor="#fff"
            android_fontFamily="cursive"
            android_textStyle="bold|italic"
            android_layout_marginBottom="50dp"
            android_textSize="60dp"/>

        <TextView
            android_layout_width="match_parent"
            android_layout_height="wrap_content"
            android_gravity="center"
            android_textColor="#fff"
            android_textSize="22dp"
            android_fontFamily="sans-serif-condensed"
            android_id="@+id/tv1"
            android_text="Dont know what to cook ?"
            />

        <TextView
            android_layout_width="match_parent"
            android_layout_height="wrap_content"
            android_id="@+id/tv2"
            android_gravity="center"
            android_layout_marginLeft="20dp"
            android_layout_marginRight="20dp"
            android_textSize="18dp"
            android_textColor="#fff"

            android_fontFamily="sans-serif-condensed"
            android_text="Our Personal Chef Can help you"
            android_layout_marginTop="14dp" />

    </LinearLayout>

</RelativeLayout>
```

Then we can come create our `SpashActivity`. It's deriving from the AppCompatActivity. We are making several imports including the Handler itself as well as Glide, an imageloader library.

```java
import android.content.Intent;
import android.os.Handler;
import android.support.v7.app.AppCompatActivity;
import android.os.Bundle;
import android.widget.ImageView;
import android.widget.Spinner;

import com.bumptech.glide.Glide;

import java.util.concurrent.TimeUnit;

public class Splash extends AppCompatActivity {...}
```

We'll have an ImageView as our background:

```java
    ImageView background;
    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_splash);
        background = (ImageView) findViewById(R.id.s_img);
```

We'll use glide to load the image into an imageview:

```java
        Glide.with(this)
                .load(R.drawable.splash)
                .into(background);
```

Finally we come and instantiate our handler:

```java
        final Handler handler = new Handler();
```

Then invoke the `postDelayed()` method passing in a Runnable where we implement the `run()` method.

It is inside the `run()` method where we do our background stuff. Take note we are also passing the delay in milliseconds.

```java
        handler.postDelayed(new Runnable() {
            @Override
            public void run() {
                //Do something after delay
                finish();
                startActivity(new Intent(Splash.this, Home.class));
            }
        }, 3000);
    }

}
```

##### 3\. How to use a Handler to refresh WebView

In this quick sample we want to use Handler's `postDelayed()` method refresh a webview. You referesh a webview using the `reload()` method of the webview. We pass the delay time in milliseconds.

```java
void refreshWebPage(){
        new Handler().postDelayed(new Runnable() {
            @Override
            public void run() {
                LightningView webview = getCurrentWebView();
                if (webview != null) {
                    webview.reload();
        }
            }
        }, 200);
    }
```

###### 4\. How to use a Handler to load animation

Android is an animation rich framework. The ability to use animations has been made easier given the presence of a Hnadler. Let's look at a sample snippet that can show us how to load an animation using a Handler. We will pass the view to animate, the animation resource id, the delay time and the Context object. We will use Handler's `postDelayed` method. There we pass our Runnable annonymous class as well as the delay time.

```java
public static void animationIn(final View view, final int animation, int delayTime, final Context context) {
    Handler handler = new Handler();
    handler.postDelayed(new Runnable() {
        public void run() {
            Animation inAnimation = AnimationUtils.loadAnimation(
                    context.getApplicationContext(), animation);
            view.setAnimation(inAnimation);
            view.setVisibility(View.VISIBLE);
        }
    }, delayTime);
}
```

That was animation in, well we also have animation out:

```java
 public static void animationOut(final View view, final int animation, int delayTime, final boolean isViewGone, final Context context) {
        view.setVisibility(View.VISIBLE);
        Handler handler = new Handler();
        handler.postDelayed(new Runnable() {
            public void run() {
                Animation outAnimation = AnimationUtils.loadAnimation(
                        context.getApplicationContext(), animation);
                view.setAnimation(outAnimation);
                if (isViewGone)
                    view.setVisibility(View.GONE);
                else
                    view.setVisibility(View.INVISIBLE);
            }
        }, delayTime);
    }
```

#### Handler post()

Handler has a method called `post()`:

```java
post(Runnable r)
```

As you can see that method takes a runnable object. The `post()` method **causes the Runnable r to be added to the message queue**.

Let's look at several real world examples of this method:

##### 1\. Use Handler's `post()` method to open keyboard

Here's how to use the Handler's `post()` method to open a Keyboard.

```java
public void openIME(final EditText v) {
    final boolean focus = v.requestFocus();
    if (v.hasFocus()) {
        final Handler handler = new Handler(Looper.getMainLooper());
        handler.post(new Runnable() {
            @Override
            public void run() {
                InputMethodManager mgr = (InputMethodManager) getSystemService(INPUT_METHOD_SERVICE);
                boolean result = mgr.showSoftInput(v, InputMethodManager.SHOW_FORCED);
                log.debug("openIME " + focus + " " + result);
            }
        });
    }
}
```

##### 2\. Handler's post() method with Executor

An Executor is an object that executes submitted Runnable tasks.

```java
public DownloadStatusDeliveryImpl(final Handler handler) {
    this.mDownloadStatusPoster = new Executor() {
        public void execute(Runnable command) {
            handler.post(command);
        }
    };
}
```

##### 3\. Full Handler Reusable Utility class

Here is an example of a utility class that further explores Handler usage:

```java
import android.os.Handler;
import android.os.HandlerThread;
import android.os.Looper;

public final class HandlerUtils {

    private HandlerUtils() {
    }

    public static void uiPost(Runnable action) {
        if (action == null) {
            return;
        }
        uiHandler().post(action);
    }

    public static void uiPostDelayed(Runnable action, long delayMillis) {
        if (action == null) {
            return;
        }
        uiHandler().postDelayed(action, delayMillis);
    }

    public static void uiRemoveCallbacks(Runnable action) {
        uiHandler().removeCallbacks(action);
    }

    public static void threadPost(Runnable action) {
        if (action == null) {
            return;
        }
        threadHandler().post(action);
    }

    public static void threadPostDelayed(Runnable action, long delayMillis) {
        if (action == null) {
            return;
        }
        threadHandler().postDelayed(action, delayMillis);
    }

    public static void threadRemoveCallbacks(Runnable action) {
        threadHandler().removeCallbacks(action);
    }

    private static Handler uiHandler() {
        return Holder.handler;
    }

    private interface Holder {
        Handler handler = new Handler(Looper.getMainLooper());
    }

    private static Handler sThreadHandler;

    private static synchronized Handler threadHandler() {
        if (sThreadHandler == null) {
            HandlerThread thread = new HandlerThread("HandlerUtils.sThreadHandler");
            thread.start();
            sThreadHandler = new Handler(thread.getLooper());
        }
        return sThreadHandler;
    }
}
```

#### 4\. How to Execure a Specified Runnable on the Main thread

We pass the action to be run on the UI thread.

```java
public final class HandlerUtils {
    private static Handler handler = new Handler(Looper.getMainLooper());

    public static void runOnUiThread(Runnable action) {
        if (Looper.myLooper() == Looper.getMainLooper()) {
            action.run();
        }
        else {
            handler.post(action);
        }
    }
}
```

Let's look at some full Examples.

## Example 1: Various Handler Examples

This example will explore various practical usage scenarios that you are likely to get into while using the `android.os.Handler` class.

### Step 1: Create Java or Kotlin Project

Create a java project in android studio. You can also create a kotlin one and use the code converter to convert from java to kotlin.

### Step 2: Dependencies

No dependencies are needed for this project.

### Step 3: Permissions

No permissions are needed for this project.

### Step 4: Design Layout

This involves adding a bunch of textviews to your main activity layout. Also add a button. You can organize them using a vertical linear layout:

**`activity_main.xml`**

```xml
<?xml version="1.0" encoding="utf-8"?>
<LinearLayout xmlns:android="http://schemas.android.com/apk/res/android"
    xmlns:tools="http://schemas.android.com/tools"
    android:layout_width="match_parent"
    android:layout_height="match_parent"
    android:orientation="vertical"
    android:paddingBottom="@dimen/activity_vertical_margin"
    android:paddingLeft="@dimen/activity_horizontal_margin"
    android:paddingRight="@dimen/activity_horizontal_margin"
    android:paddingTop="@dimen/activity_vertical_margin"
    tools:context="com.lomza.examples.handlers.MainActivity">

    <TextView
        android:id="@+id/tv_01"
        android:layout_width="wrap_content"
        android:layout_height="wrap_content" />

    <TextView
        android:id="@+id/tv_02"
        android:layout_width="wrap_content"
        android:layout_height="wrap_content" />

    <TextView
        android:id="@+id/tv_03"
        android:layout_width="wrap_content"
        android:layout_height="wrap_content" />

    <TextView
        android:id="@+id/tv_04"
        android:layout_width="wrap_content"
        android:layout_height="wrap_content" />

    <TextView
        android:id="@+id/tv_05"
        android:layout_width="wrap_content"
        android:layout_height="wrap_content" />

    <TextView
        android:id="@+id/tv_06"
        android:layout_width="wrap_content"
        android:layout_height="wrap_content" />

    <Button
        android:id="@+id/button_07"
        android:layout_width="wrap_content"
        android:layout_height="wrap_content"
        android:text="Post with a view Handler"/>

    <TextView
        android:id="@+id/tv_07"
        android:layout_width="wrap_content"
        android:layout_height="wrap_content" />
</LinearLayout>
```

### Step 5: Write Code

We then wrote our code. you start by extending the `AppCompatActivity` to create our main activity.

The Main activity with methods to demonstrates the usage of Handlers, Runnables, and Messages:

```java

public class MainActivity extends AppCompatActivity {
    private TextView tv01;
    private TextView tv02;
    private TextView tv03;
    private TextView tv04;
    private TextView tv05;
    private TextView tv06;
    private TextView tv07;
    private Button button07;

    private final Handler mainThreadHandler = new Handler(Looper.getMainLooper());
    private Handler currentThreadHandler;
    private Handler decorViewHandler;
    private final ChangeTextHandler customHandler = new ChangeTextHandler(this);
    private final Handler notLeakyHandler = new Handler();
    private final Runnable notLeakyRunnable = new ChangeTextRunnable(this, "Hi from leak-safe Runnable!");

    private static final String TAG = "[Handlers]";
    private static final String BUNDLE_KEY = "greeting";
```

First you can post a task with ordinary thread using the following code:

```java
    private void postTaskWithOrdinaryThread() {
        Runnable notForHandlerTask = new Runnable() {
            @Override
            public void run() {
                // as written here - https://developer.android.com/guide/components/processes-and-threads.html#Threads,
                // do NOT access the Android UI toolkit from outside the UI thread, as sth unexpected may happen
                // for instance, you might get android.view.ViewRootImpl$CalledFromWrongThreadException
                tv01.setText("Hi from Thread(runnable)!");
                // if you call thread.run(), this would be TRUE, as no new Thread would be created
                // read the explanation here - http://stackoverflow.com/a/35264580/655275
                Log.d(TAG, "[postTaskWithOrdinaryThread] Current looper is a main thread (UI) looper: "
                        + (Looper.myLooper() == Looper.getMainLooper()));
            }
        };
        Thread thread = new Thread(notForHandlerTask);
        thread.start();
    }
```

And here's how you can post a task with handler onto the main thread:

```java
    @UiThread
    private void postTaskWithHandlerOnMainThread() {
        Runnable mainThreadTask = new Runnable() {
            @Override
            public void run() {
                // since we use Looper.getMainLooper(), we can safely update the UI from here
                tv02.setText("Hi from Handler(Looper.getMainLooper()) post!");
                Log.d(TAG, "[postTaskWithHandlerOnMainThread] Current looper is a main thread (UI) looper: "
                        + (Looper.myLooper() == Looper.getMainLooper()));
            }
        };
        mainThreadHandler.post(mainThreadTask);
    }
```

Here's how you can post task with handler on concurrent thread:

```java
    private void postTaskWithHandlerOnCurrentThread() {
        currentThreadHandler = new Handler();
        Runnable currentThreadTask = new Runnable() {
            @Override
            public void run() {
                // since we use current thread (and from onCreate(), it's the UI thread), we can safely update the UI from here
                tv03.setText("Hi from Handler() post!");
                Log.d(TAG, "[postTaskWithHandlerOnCurrentThread] Current looper is a main thread (UI) looper: "
                        + (Looper.myLooper() == Looper.getMainLooper()));
            }
        };
        currentThreadHandler.post(currentThreadTask);

    }
```

And here's how you can post task inside the background thread:

```java
    private void postTaskInsideBackgroundTask() {
        Thread backgroundThread = new Thread(new Runnable() {
            @Override
            public void run() {
                // pretend to do something "background-y"
                try {
                    TimeUnit.SECONDS.sleep(1);
                } catch (InterruptedException e) {
                    e.printStackTrace();
                }

                mainThreadHandler.post(new Runnable() {
                    @Override
                    public void run() {
                        tv04.setText("Hi from a Handler inside of a background Thread!");
                    }
                });
            }
        });

        backgroundThread.start();
    }
```

Here's how to use the `@UiThread` annotation to post task with this window and textview:

```java
    @UiThread
    private void postTaskWithThisWindowAndTextViewHandlers() {
        // this line will return null from onCreate() (and even if called from onResume()) and cause NPE when trying to post();
        // this is because the handler isn't attached to the view if it's not fully visible
        decorViewHandler = getWindow().getDecorView().getHandler();
        Runnable decorViewTask = new Runnable() {
            @Override
            public void run() {
                // View's post() uses UI handler internally
                tv07.post(new Runnable() {
                    @Override
                    public void run() {
                        tv07.setText("Hi from getWindow().getDecorView().getHandler() > TextView.post()!");
                        Log.d(TAG, "[postTaskWithThisWindowAndTextViewHandlers] Current looper is a main thread (UI) looper: "
                                + (Looper.myLooper() == Looper.getMainLooper()));
                    }
                });
            }
        };
        decorViewHandler.post(decorViewTask);
    }
```

And here's how you can post task with handler on background thread:

```java
    private void postTaskWithHandlerOnBackgroundThread() {
        final Runnable pretendsToBeSomeOtherTask = new Runnable() {
            @Override
            public void run() {
                Log.d(TAG, "[postTaskWithHandlerOnBackgroundThread] Is there a looper? " + (Looper.myLooper() != null));
                // you'll get java.lang.RuntimeException: Can't create handler inside thread that has not called Looper.prepare()
                // this is because Handlers need to have a Looper associated with them; when the task was run on the main thread,
                // main thread looper was used, but if we call this from the background thread, there is NO looper to use
                // read more - https://developer.android.com/reference/android/os/Looper.html

                postTaskWithHandlerOnCurrentThread();
            }
        };
        final Thread thread = new Thread(pretendsToBeSomeOtherTask);
        thread.start();
    }
```

Here's how you can post task with a non-leaky `Handler` and `Runnable`:

```java
    private void postTaskWithNotLeakyHandlerAndRunnable() {
        // in order to eliminate leaks, both Handler and Runnable should be static
        // static inner classes do not hold an implicit reference to the outer class
        // it seems like a lot of useless work, but it's the most accurate and bug-free way
        // read more - http://www.androiddesignpatterns.com/2013/01/inner-class-handler-memory-leak.html
        notLeakyHandler.postDelayed(notLeakyRunnable, 500);
    }
```

Here is the full code;

**`MainActivity.java`**

```java
package com.lomza.examples.handlers;

import android.os.Bundle;
import android.os.Handler;
import android.os.Looper;
import android.os.Message;
import android.support.annotation.UiThread;
import android.support.v7.app.AppCompatActivity;
import android.text.TextUtils;
import android.util.Log;
import android.view.View;
import android.widget.Button;
import android.widget.TextView;

import java.lang.ref.WeakReference;
import java.util.concurrent.TimeUnit;

/**
 * Main activity with methods to demonstrates the usage of Handlers, Runnables, and Messages :)
 *
 * @author Antonina Tkachuk
 */
public class MainActivity extends AppCompatActivity {
    private TextView tv01;
    private TextView tv02;
    private TextView tv03;
    private TextView tv04;
    private TextView tv05;
    private TextView tv06;
    private TextView tv07;
    private Button button07;

    private final Handler mainThreadHandler = new Handler(Looper.getMainLooper());
    private Handler currentThreadHandler;
    private Handler decorViewHandler;
    private final ChangeTextHandler customHandler = new ChangeTextHandler(this);
    private final Handler notLeakyHandler = new Handler();
    private final Runnable notLeakyRunnable = new ChangeTextRunnable(this, "Hi from leak-safe Runnable!");

    private static final String TAG = "[Handlers]";
    private static final String BUNDLE_KEY = "greeting";

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);

        initView();
    }

    @Override
    protected void onStart() {
        super.onStart();

        postTaskWithOrdinaryThread();
        postTaskWithHandlerOnMainThread();
        postTaskWithHandlerOnCurrentThread();
        postTaskInsideBackgroundTask();
        //postTaskWithHandlerOnBackgroundThread();
        postTaskWithNotLeakyHandlerAndRunnable();
        sendMessageToChangeTextHandler();
    }

    @Override
    protected void onStop() {
        super.onStop();
        // when posting Runnables or Messages, always remember to call removeCallbacks() or removeMessages()
        // or removeCallbacksAndMessages() for both.
        // this ensures that all pending tasks don't execute in vain; for instance, the user has left our activity
        // and he doesn't really care if some job is finished or not, so it's our responsibility to cancel it

        // pass null to remove ALL callbacks and messages
        mainThreadHandler.removeCallbacks(null);
        currentThreadHandler.removeCallbacks(null);
        if (decorViewHandler != null)
            decorViewHandler.removeCallbacks(null);
        customHandler.removeCallbacksAndMessages(null);
        notLeakyHandler.removeCallbacks(notLeakyRunnable);
    }

    private void initView() {
        tv01 = (TextView) findViewById(R.id.tv_01);
        tv02 = (TextView) findViewById(R.id.tv_02);
        tv03 = (TextView) findViewById(R.id.tv_03);
        tv04 = (TextView) findViewById(R.id.tv_04);
        tv05 = (TextView) findViewById(R.id.tv_05);
        tv06 = (TextView) findViewById(R.id.tv_06);
        tv07 = (TextView) findViewById(R.id.tv_07);
        button07 = (Button) findViewById(R.id.button_07);
        button07.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                postTaskWithThisWindowAndTextViewHandlers();
            }
        });
    }

    private void postTaskWithOrdinaryThread() {
        Runnable notForHandlerTask = new Runnable() {
            @Override
            public void run() {
                // as written here - https://developer.android.com/guide/components/processes-and-threads.html#Threads,
                // do NOT access the Android UI toolkit from outside the UI thread, as sth unexpected may happen
                // for instance, you might get android.view.ViewRootImpl$CalledFromWrongThreadException
                tv01.setText("Hi from Thread(runnable)!");
                // if you call thread.run(), this would be TRUE, as no new Thread would be created
                // read the explanation here - http://stackoverflow.com/a/35264580/655275
                Log.d(TAG, "[postTaskWithOrdinaryThread] Current looper is a main thread (UI) looper: "
                        + (Looper.myLooper() == Looper.getMainLooper()));
            }
        };
        Thread thread = new Thread(notForHandlerTask);
        thread.start();
    }

    @UiThread
    private void postTaskWithHandlerOnMainThread() {
        Runnable mainThreadTask = new Runnable() {
            @Override
            public void run() {
                // since we use Looper.getMainLooper(), we can safely update the UI from here
                tv02.setText("Hi from Handler(Looper.getMainLooper()) post!");
                Log.d(TAG, "[postTaskWithHandlerOnMainThread] Current looper is a main thread (UI) looper: "
                        + (Looper.myLooper() == Looper.getMainLooper()));
            }
        };
        mainThreadHandler.post(mainThreadTask);
    }

    private void postTaskWithHandlerOnCurrentThread() {
        currentThreadHandler = new Handler();
        Runnable currentThreadTask = new Runnable() {
            @Override
            public void run() {
                // since we use current thread (and from onCreate(), it's the UI thread), we can safely update the UI from here
                tv03.setText("Hi from Handler() post!");
                Log.d(TAG, "[postTaskWithHandlerOnCurrentThread] Current looper is a main thread (UI) looper: "
                        + (Looper.myLooper() == Looper.getMainLooper()));
            }
        };
        currentThreadHandler.post(currentThreadTask);

    }

    private void postTaskInsideBackgroundTask() {
        Thread backgroundThread = new Thread(new Runnable() {
            @Override
            public void run() {
                // pretend to do something "background-y"
                try {
                    TimeUnit.SECONDS.sleep(1);
                } catch (InterruptedException e) {
                    e.printStackTrace();
                }

                mainThreadHandler.post(new Runnable() {
                    @Override
                    public void run() {
                        tv04.setText("Hi from a Handler inside of a background Thread!");
                    }
                });
            }
        });

        backgroundThread.start();
    }

    @UiThread
    private void postTaskWithThisWindowAndTextViewHandlers() {
        // this line will return null from onCreate() (and even if called from onResume()) and cause NPE when trying to post();
        // this is because the handler isn't attached to the view if it's not fully visible
        decorViewHandler = getWindow().getDecorView().getHandler();
        Runnable decorViewTask = new Runnable() {
            @Override
            public void run() {
                // View's post() uses UI handler internally
                tv07.post(new Runnable() {
                    @Override
                    public void run() {
                        tv07.setText("Hi from getWindow().getDecorView().getHandler() > TextView.post()!");
                        Log.d(TAG, "[postTaskWithThisWindowAndTextViewHandlers] Current looper is a main thread (UI) looper: "
                                + (Looper.myLooper() == Looper.getMainLooper()));
                    }
                });
            }
        };
        decorViewHandler.post(decorViewTask);
    }

    private void postTaskWithHandlerOnBackgroundThread() {
        final Runnable pretendsToBeSomeOtherTask = new Runnable() {
            @Override
            public void run() {
                Log.d(TAG, "[postTaskWithHandlerOnBackgroundThread] Is there a looper? " + (Looper.myLooper() != null));
                // you'll get java.lang.RuntimeException: Can't create handler inside thread that has not called Looper.prepare()
                // this is because Handlers need to have a Looper associated with them; when the task was run on the main thread,
                // main thread looper was used, but if we call this from the background thread, there is NO looper to use
                // read more - https://developer.android.com/reference/android/os/Looper.html

                postTaskWithHandlerOnCurrentThread();
            }
        };
        final Thread thread = new Thread(pretendsToBeSomeOtherTask);
        thread.start();
    }

    private void postTaskWithNotLeakyHandlerAndRunnable() {
        // in order to eliminate leaks, both Handler and Runnable should be static
        // static inner classes do not hold an implicit reference to the outer class
        // it seems like a lot of useless work, but it's the most accurate and bug-free way
        // read more - http://www.androiddesignpatterns.com/2013/01/inner-class-handler-memory-leak.html
        notLeakyHandler.postDelayed(notLeakyRunnable, 500);
    }

    private static class ChangeTextRunnable implements Runnable {
        private final WeakReference<MainActivity> activity;
        private final String greetingMessage;

        public ChangeTextRunnable(MainActivity activity, String greetingMessage) {
            this.activity = new WeakReference<>(activity);
            this.greetingMessage = greetingMessage;
        }

        public void run() {
            if (greetingMessage == null) {
                Log.e(TAG, "The message is null ChangeTextRunnable.run()!");
                return;
            }

            MainActivity activity = this.activity.get();
            if (activity == null) {
                Log.e(TAG, "Activity is null ChangeTextRunnable.run()!");
                return;
            }

            activity.tv05.setText(greetingMessage);
        }
    }

    // === OBTAIN AND HANDLE A MESSAGE ===
    private void sendMessageToChangeTextHandler() {
        Message messageToSend = customHandler.obtainMessage();
        Bundle bundle = new Bundle();
        bundle.putString(BUNDLE_KEY, "Hi from custom inner Handler!");
        messageToSend.setData(bundle);
        messageToSend.what = 6;
        customHandler.sendMessage(messageToSend);
    }

    private static class ChangeTextHandler extends Handler {
        private final WeakReference<MainActivity> activity;

        public ChangeTextHandler(MainActivity activity) {
            this.activity = new WeakReference<>(activity);
        }

        @Override
        public void handleMessage(Message msg) {
            MainActivity activity = this.activity.get();
            if (activity == null) {
                Log.e(TAG, "Activity is null ChangeTextHandler.handleMessage()!");
                return;
            }

            final String text = (String) msg.getData().get(BUNDLE_KEY);
            if (!TextUtils.isEmpty(text)) {
                switch (msg.what) {
                    case 6:
                        activity.tv06.setText(text);
                        break;
                    default:
                        activity.tv01.setText(text);
                        break;
                }
            }
        }
    }
    // === END - OBTAIN AND HANDLE A MESSAGE ===
}
```

### Run

Finally run the project.

### Reference

Below are the code reference links:

| Number | Link |
| --- | --- |
| 1. | [Download code](https://github.com/lomza/handlers-examples/archive/refs/heads/master.zip) |
| 2. | [Follow code author](https://github.com/lomza/) |

## Example 2: Handler with ProgressBar Example

In this tutorial we want to see how to post updates from a background thread to the user interface thread using a Handler.

We click a button and simulate doing heavy work in the background. Meanwhile we are able to update our progressbar as the work continues.

#### (a). MainActivity.java

This is the main activity. We derive from the AppCompatActivity. One of the imports we add is the Handler from the `android.os` package.

```java
...
import android.os.Handler;
...
```

We will maintain three instance fields:

1. Handler - a class defined in the `android.os` package through which we can send and process `Message` and `Runnable` objects associated with a thread's `MessageQueue`.
2. ProgressBar - a widget that allows us to show progress.
3. Button - an action button.

Here's the full code:

```java
package info.camposha.mrhandler;

import android.os.Bundle;
import android.os.Handler;
import android.support.v7.app.AppCompatActivity;
import android.view.View;
import android.widget.Button;
import android.widget.ProgressBar;

public class MainActivity extends AppCompatActivity {

    private Handler mHandler;
    private ProgressBar mProgressBar;
    private Button mStartButton;

    @Override
    public void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);
        mHandler = new Handler();
        mProgressBar = findViewById(R.id.mProgressBar);
        mStartButton = findViewById(R.id.startBtn);
        mStartButton.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View view) {
                performStuff();
            }
        });
    }
    private void performStuff() {
        //Simulate Heavy task in background thread
        new Thread(new Runnable() {
            @Override
            public void run() {
                for (int i = 0; i <= 30; i++) {
                    final int currentProgressCount = i;
                    try {
                        Thread.sleep(500);
                    } catch (InterruptedException e) {
                        e.printStackTrace();
                    }

                //Post updates to the User Interface
                    mHandler.post(new Runnable() {
                        @Override
                        public void run() {
                            mProgressBar.setProgress(currentProgressCount);
                        }
                    });
                }
            }
        }).start();
    }
}
```

#### (b). activity_main.xml

This is the main activity layout. At the root we have a [LinearLayout](https://camposha.info/android/linearlayout). This element allows us to arrange it's children linearly either horizontally or vertically. We also have TextView to display the header text of our app. Also we have a progressbar to display progress. We have also a button that when clicked will start the thread to perform our work in the background thread.

```xml
<?xml version="1.0" encoding="utf-8"?>
<LinearLayout
    android_layout_width="match_parent"
    android_layout_height="match_parent"

    android_gravity="center"
    android_orientation="vertical"
    tools_context=".MainActivity">

    <TextView
        android_id="@+id/headerLabel"
        android_layout_width="wrap_content"
        android_layout_height="wrap_content"
        android_layout_alignParentTop="true"
        android_layout_centerHorizontal="true"
        android_fontFamily="casual"
        android_text="Handler ProgressBar"
        android_textAllCaps="true"
        android_textSize="24sp"
        android_textStyle="bold" />

    <ProgressBar
        android_id="@+id/mProgressBar"
        style="?android:attr/progressBarStyleHorizontal"
        android_layout_width="match_parent"
        android_layout_height="wrap_content"
        android_layout_margin="10dp"
        android_indeterminate="false"
        android_max="10" />

    <Button
        android_id="@+id/startBtn"
        android_layout_width="wrap_content"
        android_layout_height="wrap_content"
        android_text="Start" />
</LinearLayout>
```

## Example 3: Simple Handler Example with Timer

This example explores how to use `Handler` with `Timer`.

### Step 1: Dependencies

No third party depedencies are needed for this example.

### Step 2: Layouts

We do not need any layout for this example.

### Step 3: Write Code

Here is the full code:

**HandlerActivity.java**

```java
package com.sdwfqin.sample.handler;

import android.os.Handler;
import android.os.Message;
import android.support.v7.app.AppCompatActivity;
import android.os.Bundle;
import android.util.Log;

import com.sdwfqin.sample.R;

import java.lang.ref.WeakReference;
import java.util.Timer;
import java.util.TimerTask;

/**
 * @author zhangqin
 */
public class HandlerActivity extends AppCompatActivity {

    private static final String TAG = "HandlerActivity";
    private MyHandler mMyHandler;
    private Timer mTimer;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_handler);

        mMyHandler = new MyHandler(this);

        mMyHandler.sendEmptyMessage(1);

        mTimer = new Timer();
        mTimer.schedule(new TimerTask() {
            @Override
            public void run() {
                mMyHandler.sendEmptyMessage(2);
            }
        }, 1000, 1000);
        mMyHandler.sendEmptyMessage(3);
    }

    static class MyHandler extends Handler {

        private WeakReference<HandlerActivity> mActivity;

        public MyHandler(HandlerActivity activity) {
            mActivity = new WeakReference<>(activity);
        }

        @Override
        public void handleMessage(Message msg) {
            HandlerActivity activity = mActivity.get();
            switch (msg.what) {
                case 1:
                    Log.e(TAG, "handlerA:case:1");
                    break;
                case 2:
                    Log.e(TAG, "handlerA:case:2");
                    break;
                case 3:
                    Log.e(TAG, "handlerA:case:3");
                    break;
                default:
                    break;
            }
        }
    }

    @Override
    protected void onDestroy() {
        mTimer.cancel();
        mMyHandler.removeCallbacksAndMessages(null);
        super.onDestroy();
    }
}
```

### Reference

Download the code below:

| Number | Link |
| --- | --- |
| 1. | [Download code](https://downgit.github.io/#/home?url=https://github.com/sdwfqin/AndroidSamples/tree/master/app/src/main/java/com/sdwfqin/sample/handler) |
| 2. | [Follow code author](https://github.com/sdwfqin/) |

## Memory-Safe Handler

Original implementation of Handler always keeps hard reference to handler in queue of execution. Any object in Message or Runnable posted to `android.os.Handler` will be hard referenced for some time. If you create anonymous Runnable and call to `postDelayed` with large timeout, that Runnable will be held in memory until timeout passes. Even if your Runnable seems small, it indirectly references owner class, which is usually something as big as Activity or Fragment.

You can read more [here](https://medium.com/bumble-tech/android-handler-memory-leaks-7291c5be6101).

### Solution - Use Weak Handler

What is weak handler?

> It is a Memory safer implementation of android.os.Handler.

`WeakHandler` is trickier than `android.os.Handler` , it will keep `WeakReferences` to runnables and messages, and GC could collect them once `WeakHandler` instance is not referenced any more.

![WeakHandler](https://github.com/badoo/android-weak-handler/raw/master/WeakHandler.png)

How do you use it?

### Step 1: Install it

Register `Jitpack` as a maven url in your project-level `build.gradle` file as follows:

```groovy
repositories {
    maven { url 'https://jitpack.io' }
}
```

Then add the implementation statement under the dependencies closure in your app-level `build.gradle` file:

```groovy

dependencies {
    implementation 'com.github.badoo:android-weak-handler:1.2'
}
```

Sync to install it.

### Step 2: Write Code

You can simply use `WeakHandler` as a drop-in replacement of the `android.os.Handler`. Just use it the way you would use the `Handler`. Below is an example:

**ExampleActivity.java**

```java
import com.badoo.mobile.util.WeakHandler;

public class ExampleActivity extends Activity {

    private WeakHandler handler; // We still need at least one hard reference to WeakHandler

    protected void onCreate(Bundle savedInstanceState) {
        handler = new WeakHandler();
        ...
    }

    private void onClick(View view) {
        handler.postDelayed(new Runnable() {
            view.setVisibility(View.INVISIBLE);
        }, 5000);
    }
}
```

### Reference

Find the reference links below:

| Number | Link |
| --- | --- |
| 1. | [Read more](https://github.com/badoo/android-weak-handler) |
