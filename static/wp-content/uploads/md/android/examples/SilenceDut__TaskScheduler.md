# TaskScheduler


> A concise,practical async library for Android project.

In the daily development of Android, it is often necessary to deal with asynchronous tasks. The Handler and Asynctask provided by the system are really inconvenient. Some open source third-party libraries are too large and complicated, such as RxJava. Although it is very convenient, RxJava is not easy to promote in the team. Therefore, a concise, convenient and practical asynchronous library is realized.

**The asynchronous library will be very simple to use. It only provides a small number of interfaces, but the function will be very powerful. In fact, the purpose is this. It is to use the classes provided by the relatively complete jdk or sdk for certain encapsulation, so as to make asynchronous tasks more concise, and no It is necessary to provide a lot of interfaces that seem to be fully functional but are basically unusable in practice, so that you can basically understand how to use the interface as soon as you see it, so as to avoid bloating.

### Step 1: Install it

Add it in your root build.gradle at the end of repositories:**

```groovy
allprojects {
	repositories {
		...
		maven { url 'https://jitpack.io' }
	}
}
```

Then Add the dependency:

```java
dependencies {
	implementation 'com.github.silencedut:taskscheduler:latest'
}
```


### Step 2: Write Code

#### Simple asynchronous tasks that do not require callbacks

```java
TaskScheduler.execute(new Runnable() {
    @Override
    public void run() {
    // DO BACKGROUND WORK
    }
});
```

#### Asynchronous tasks that require callbacks

```java
Task task = new Task<String>() {

    @Override
    public String doInBackground()  {
        return "background task";
    }

    @Override public void onSuccess ( String result ) {
        // Call
    back to the main thread
    }

    @Override public void onFail
     ( Throwable throwable ) {
         super . onFail ( throwable );
         //Callback when an error occurs in doInBackground
    }

    @Override public void onCancel
     () {
         super . onCancel ();
         // Callback when the task is canceled
    }
});
```

Interfaces that must be implemented by default in doInBackground and onSuccess(Object result), other implementations are optional. Except for doInBackground, which is executed in an asynchronous thread, everything else will be called back to the main thread for execution.

**perform tasks**

```java
TaskScheduler.execute(task);
```

**cancel task**

It will be called back to onCancel(), it can't really cancel the task being executed, but the result is not called back in onSuccess, it may not stop the task, the same reason as AsyncTask, you can refer to a blog written before why the cancel of AsyncTask can't really be to stop the thread from running.

```java
TaskScheduler.cancel(task);
```

**timeout task**

If the task times out, it will call back to onCancel()

```java
TaskScheduler.executeTimeOutTask(timeOutMillis,task);
```

**Periodic task**

If the task times out, it will call back to onCancel()

```java
Main thread, Io thread optional
 TaskScheduler . scheduleUITask ( SchedulerTask  task );

cancel task
TaskScheduler.stopScheduleTask(SchedulerTask task)
```

#### Binding life cycle

**Support when executing runnables of anonymous inner classes or delaying execution of anonymous inner classes by means of Handler, when onDestroy, runnables are automatically removed, which greatly simplifies use and avoids memory leaks**

When used in Activity or Fragment, remove anonymous inner classes that do not need to be displayed in onDestory (note that the support version must be greater than 27, the official recommendation is to always use the latest compileSdkVersion and supportVersion)

```java
TaskScheduler.runOnUIThread(this,new Runnable() {
    @Override
    public void run() {

    }
},5000);
```

Can specify to remove unexecuted tasks in a specific life cycle, such as onStop

```java
TaskScheduler.runOnUIThread(this, Lifecycle.Event.ON_STOP, new Runnable() {
    @Override
    public void run() {
        Log.i("LifeFragment","runTask with life on Stop");
    }
},5000);
```

Externally pass in any Handler

```java
TaskScheduler.runLifecycleRunnable(this,anyHandler,,new Runnable() {
    @Override
    public void run() {

    }
},5000);

```

### More

**Some other common methods**

```java
/**
* Get the handler that is called back to the handlerName thread. It is generally used to perform the same task in a background thread to avoid thread safety issues. Such as database, file operations
*/
Handler  provideHandler ( String  handlerName )

 /**
* Provide a public asynchronous handler
*/
Handler  ioHandler ()

/**
* Common handler operations
*/
runOnUIThread ( @ NonNull  Runnable  runnable )

runOnUIThread(Runnable runnable,long delayed)

removeUICallback(@NonNull Runnable runnable)

```

### Reference

Read more [here](https://github.com/SilenceDut/TaskScheduler).
