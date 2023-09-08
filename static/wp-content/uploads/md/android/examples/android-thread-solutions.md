# Thread and Threadpool - Libraries and Examples


There are numerous abstractions provided for performing work in the background thread. However you may still prefer the native way of working with threads and threadpools. If so then here are some libraries and solutions that make these more convenient.


## (a). EasyThread

> A safe, lightweight and simple thread pool manager.

EasyThread encapsulates the native thread pool, allowing you to perform thread task operations more conveniently.

Here are its features:

- **Simple and lightweight** : There are no more than hundreds of methods and no additional secondary dependencies.
- **Flexible configuration** : It is convenient and flexible to configure the thread name, thread priority, etc. for each task started.
- **Use safety** : When the thread is abnormal. It can automatically deliver the catch exception information to the user to avoid crashes.
- **Thread switching** : comes with thread switching function: specify the thread in which the user will be notified after the task is executed.
- **Callback notification** : when the task starts and after the task has finished running. There are separate life cycles as notifications.
- **Task expansion** : support _delayed tasks_ and _asynchronous callback tasks_

### Step 1: Install it

The first step in using EasyThread is to install it. In your project-level build.gradle add jitpack as a maven repository:

```groovy
Maven {URL ' https://jitpack.io ' }
```

Then specify the implementation statement in your app level build.gradle file:

```groovy
implementation "com.github.yjfnypeu:EasyThread: 0.6.0"
```

### Step 2: Write Code

There are two steps to use:

- The first step: Create an EasyThread instance. Each EasyThread instance will hold an independent thread pool for use.

```java
EasyThread easyThread = EasyThread.Builder
            //Four create methods are provided to create different types of thread pools for use as needed
            //For example, createSingle(): means to create a singleton thread pool for use
            .createXXX()
            .build();
```

- Step 2: Use the created EasyThread instance for task execution:

EasyThread supports four tasks:

EasyThread supports four tasks:

#### 1\. Ordinary Runnable tasks

```java
easyThread.execute(new Runnable(){
    @Override
    public void run() {
        // do something.
    }
});
```

#### 2\. Ordinary Callable tasks

```java
Future task = easyThread.submit(new Callback<User>(){
    @Override
    public User call() throws Exception {
        // do something
        return user;
    }
})
User result = task.get();
```

#### 3\. Asynchronous callback task

```java
// Execute tasks asynchronously
Callable<User> callable = new Callable<User>(){
    @Override
    public User call() throws Exception {
        // do something
        return user;
    }
}

// Asynchronous callback
AsyncCallback<User> async = new AsyncCallback<User>() {
    @Override
    public void onSuccess(User user) {
        // notify success;
    }

    @Override
    public void onFailed(Throwable t) {
        // notify failed.
    }
};

// Start an asynchronous task
easyThread.async(callable, async)
```

#### 4\. Delay background tasks

```java
// Before starting the task, call the delay method and specify the delay time
easyThread.setDelay(time, unit)
    .execute(runnable);
```

**eg Delayed 3 seconds to start the execution of the task**

```java
easyThread.setDelay(3, TimeUnit.SECONDS)
        .execute(task);
```

### Example

Let's look at a full thread example using this EasyThread library.

1. Start by installing the library as we had discussed above.
    
2. Create a Model class.
    

**User.java**

Add the following code to the class:

```java
public class User {
    String username;
    String password;

    public User(String username, String password) {
        this.username = username;
        this.password = password;
    }

    @Override
    public String toString() {
        return "User{" +
                "username='" + username + '\'' +
                ", password='" + password + '\'' +
                '}';
    }
}
```

3. Create MainActivity

Or add the following code to your already created main activity class:

**MainActivity.java**

```java
import android.app.Activity;
import android.os.Bundle;
import android.os.Looper;
import android.util.Log;
import android.view.View;
import android.widget.Toast;

import com.lzh.easythread.AsyncCallback;
import com.lzh.easythread.Callback;
import com.lzh.easythread.EasyThread;

import java.util.concurrent.Callable;
import java.util.concurrent.Future;
import java.util.concurrent.TimeUnit;

public class MainActivity extends Activity{

    EasyThread executor = null;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);
        // Create an independent instance for use
        executor = EasyThread.Builder
                .createFixed(4)
                .setPriority(Thread.MAX_PRIORITY)
                .setCallback(new ToastCallback())
                .build();
    }

    // Start normal Runnable tasks
    public void runnableTask(View view) {
        executor.setName("Runnable task")
                .execute(new NormalTask());
    }

    public void callableTask(View view) {
        Future<User> submit = executor.setName("Callable task")
                .submit(new NormalTask());

        try {
            User user = submit.get(3, TimeUnit.SECONDS);
            toast("Get the task return information：%s", user);
        } catch (Exception e) {
            toast("Failed to obtain Callable task information");
        }
    }

    public void asyncTask(View view) {
        executor.setName("Async task")
                .async(new NormalTask(), new AsyncCallback<User>() {
                    @Override
                    public void onSuccess(User user) {
                        toast("Successful execution of asynchronous callback task：%s", user);
                    }

                    @Override
                    public void onFailed(Throwable t) {
                        toast("Failed to execute asynchronous callback task：%s", t.getMessage());
                    }
                });
    }

    public void onExceptionClick(View view) {
        executor.setName("un catch task")
                .execute(new UnCatchTask());
    }

    public void delayTask(View view) {
        for (int i = 0; i < 6; i++) {
            executor.setName("delay task" + i)
                    .setDelay(i, TimeUnit.SECONDS)
                    .execute(new NormalTask());
        }
    }

    public void switchThread(View view) {
        executor.setName("switch thread task")
                .setDeliver(executor.getExecutor())// Call back to its own thread pool task
                .execute(new NormalTask());
    }

    public void multiThreadTask(View view) {
        // Multi-threaded concurrent start task test
        for (int i = 0; i < 10; i++) {
            final int index = i;
            new Thread(new Runnable() {
                @Override
                public void run() {
                    executor.setName("MultiTask" + index)
                            .setCallback(new LogCallback())
                            .execute(new Runnable() {
                                @Override
                                public void run() {}
                            });
                }
            }).start();
        }
    }

    private class NormalTask implements Runnable, Callable<User> {
        @Override
        public void run() {
            toast("Executing Runnable task: %s", Thread.currentThread().getName());
            try {
                Thread.sleep(2000);
            } catch (InterruptedException e) {
                e.printStackTrace();
            }
        }

        @Override
        public User call() throws Exception {
            toast("Callable task is being executed: %s", Thread.currentThread().getName());
            try {
                Thread.sleep(2000);
            } catch (InterruptedException e) {
                e.printStackTrace();
            }
            return new User("Haoge", "123456");
        }
    }

    private class UnCatchTask implements Runnable {

        @Override
        public void run() {
            try {
                Thread.sleep(2000);
            } catch (InterruptedException e) {
                e.printStackTrace();
            }

            throw new RuntimeException("on purpose");
        }
    }

    private class LogCallback implements Callback {

        private final String TAG = "LogCallback";

        @Override
        public void onError(String name, Throwable t) {
            Log.e(TAG, String.format("[Task thread%s]/[Callback thread%s] failed to execute: %s", name, Thread.currentThread(), t.getMessage()), t);
        }

        @Override
        public void onCompleted(String name) {
            Log.d(TAG, String.format("[Task thread%s]/[Callback thread%s] finished:", name, Thread.currentThread()));
        }

        @Override
        public void onStart(String name) {
            Log.d(TAG, String.format("[Task thread%s]/[Callback thread%s] start of execution:", name, Thread.currentThread()));
        }
    }

    private class ToastCallback extends LogCallback {

        @Override
        public void onError(String name, Throwable t) {
            super.onError(name, t);
            toast("Thread %s is running abnormally, the abnormal information is: %s", name, t.getMessage());
        }

        @Override
        public void onCompleted(String name) {
            super.onCompleted(name);
            toast("Thread %s has finished running", name);
        }
    }

    private void toast(final String message, final Object... args) {
        if (Looper.myLooper() == Looper.getMainLooper()) {
            Toast.makeText(this, String.format(message, args), Toast.LENGTH_SHORT).show();
        } else {
            runOnUiThread(new Runnable() {
                @Override
                public void run() {
                    Toast.makeText(MainActivity.this, String.format(message, args), Toast.LENGTH_SHORT).show();
                }
            });
        }

    }

}
```

4. Create Layout.

You can find the layout code [here](https://github.com/yjfnypeu/EasyThread/tree/master/app/src/main/res/layout).

### Reference

Find more about this library in the following links:

| No. | Link |
| --- | --- |
| 1. | [Example](https://github.com/yjfnypeu/EasyThread/tree/master/app) |
| 2. | [Reference](https://github.com/yjfnypeu/EasyThread) |

Good day!
