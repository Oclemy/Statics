# Handling Lifecycles with Lifecycle-Aware Components

Lifecycle-aware components perform actions in response to a change in the lifecycle status of another component, such as activities and fragments. These components help you produce better-organized, and often lighter-weight code, that is easier to maintain.

A common pattern is to implement the actions of the dependent components in the lifecycle methods of activities and fragments. However, this pattern leads to a poor organization of the code and to the proliferation of errors. By using lifecycle-aware components, you can move the code of dependent components out of the lifecycle methods and into the components themselves.

The `androidx.lifecycle` package provides classes and interfaces that let you build _lifecycle-aware_ components—which are components that can automatically adjust their behavior based on the current lifecycle state of an activity or fragment.

Most of the app components that are defined in the Android Framework have lifecycles attached to them. Lifecycles are managed by the operating system or the framework code running in your process. They are core to how Android works and your application must respect them. Not doing so may trigger memory leaks or even application crashes.

Imagine we have an activity that shows the device location on the screen. A common implementation might be like the following:

### Kotlin

```kotlin
internal class MyLocationListener(
        private val context: Context,
        private val callback: (Location) -> Unit
) {

    fun start() {
        // connect to system location service
    }

    fun stop() {
        // disconnect from system location service
    }
}

class MyActivity : AppCompatActivity() {
    private lateinit var myLocationListener: MyLocationListener

    override fun onCreate(...) {
        myLocationListener = MyLocationListener(this) { location ->
            // update UI
        }
    }

    public override fun onStart() {
        super.onStart()
        myLocationListener.start()
        // manage other components that need to respond
        // to the activity lifecycle
    }

    public override fun onStop() {
        super.onStop()
        myLocationListener.stop()
        // manage other components that need to respond
        // to the activity lifecycle
    }
}
```

### Java

```java
class MyLocationListener {
    public MyLocationListener(Context context, Callback callback) {
        // ...
    }

    void start() {
        // connect to system location service
    }

    void stop() {
        // disconnect from system location service
    }
}

class MyActivity extends AppCompatActivity {
    private MyLocationListener myLocationListener;

    @Override
    public void onCreate(...) {
        myLocationListener = new MyLocationListener(this, (location) -> {
            // update UI
        });
    }

    @Override
    public void onStart() {
        super.onStart();
        myLocationListener.start();
        // manage other components that need to respond
        // to the activity lifecycle
    }

    @Override
    public void onStop() {
        super.onStop();
        myLocationListener.stop();
        // manage other components that need to respond
        // to the activity lifecycle
    }
}
```

Even though this sample looks fine, in a real app, you end up having too many calls that manage the UI and other components in response to the current state of the lifecycle. Managing multiple components places a considerable amount of code in lifecycle methods, such as `onStart()` and `onStop()`, which makes them difficult to maintain.

Moreover, there's no guarantee that the component starts before the activity or fragment is stopped. This is especially true if we need to perform a long-running operation, such as some configuration check in `onStart()`. This can cause a race condition where the `onStop()` method finishes before the `onStart()`, keeping the component alive longer than it's needed.

### Kotlin

```kotlin
class MyActivity : AppCompatActivity() {
    private lateinit var myLocationListener: MyLocationListener

    override fun onCreate(...) {
        myLocationListener = MyLocationListener(this) { location ->
            // update UI
        }
    }

    public override fun onStart() {
        super.onStart()
        Util.checkUserStatus { result ->
            // what if this callback is invoked AFTER activity is stopped?
            if (result) {
                myLocationListener.start()
            }
        }
    }

    public override fun onStop() {
        super.onStop()
        myLocationListener.stop()
    }

}
```

### Java

```java
class MyActivity extends AppCompatActivity {
    private MyLocationListener myLocationListener;

    public void onCreate(...) {
        myLocationListener = new MyLocationListener(this, location -> {
            // update UI
        });
    }

    @Override
    public void onStart() {
        super.onStart();
        Util.checkUserStatus(result -> {
            // what if this callback is invoked AFTER activity is stopped?
            if (result) {
                myLocationListener.start();
            }
        });
    }

    @Override
    public void onStop() {
        super.onStop();
        myLocationListener.stop();
    }
}
```

The `androidx.lifecycle` package provides classes and interfaces that help you tackle these problems in a resilient and isolated way.

Lifecycle
---------

`Lifecycle` is a class that holds the information about the lifecycle state of a component (like an activity or a fragment) and allows other objects to observe this state.

`Lifecycle` uses two main enumerations to track the lifecycle status for its associated component:

Event

The lifecycle events that are dispatched from the framework and the `Lifecycle` class. These events map to the callback events in activities and fragments.

State

The current state of the component tracked by the `Lifecycle` object.

![Diagram of lifecycle states](https://developer.android.com/static/images/topic/libraries/architecture/lifecycle-states.svg)

**Figure 1.** States and events that comprise the Android activity lifecycle

Think of the states as nodes of a graph and events as the edges between these nodes.

A class can monitor the component's lifecycle status by implementing `DefaultLifecycleObserver` and overriding corresponding methods such as `onCreate`, `onStart`, etc. Then you can add an observer by calling the `addObserver()`) method of the `Lifecycle` class and passing an instance of your observer, as shown in the following example:

### Kotlin

```kotlin
class MyObserver : DefaultLifecycleObserver {
    override fun onResume(owner: LifecycleOwner) {
        connect()
    }

    override fun onPause(owner: LifecycleOwner) {
        disconnect()
    }
}

myLifecycleOwner.getLifecycle().addObserver(MyObserver())
```

### Java

```java
public class MyObserver implements DefaultLifecycleObserver {
    @Override
    public void onResume(LifecycleOwner owner) {
        connect()
    }

    @Override
    public void onPause(LifecycleOwner owner) {
        disconnect()
    }
}

myLifecycleOwner.getLifecycle().addObserver(new MyObserver());
```

In the example above, the `myLifecycleOwner` object implements the `LifecycleOwner` interface, which is explained in the following section.

LifecycleOwner
--------------

`LifecycleOwner` is a single method interface that denotes that the class has a `Lifecycle`. It has one method, `getLifecycle()`), which must be implemented by the class. If you're trying to manage the lifecycle of a whole application process instead, see `ProcessLifecycleOwner`.

This interface abstracts the ownership of a `Lifecycle` from individual classes, such as `Fragment` and `AppCompatActivity`, and allows writing components that work with them. Any custom application class can implement the `LifecycleOwner` interface.

Components that implement `DefaultLifecycleObserver` work seamlessly with components that implement `LifecycleOwner` because an owner can provide a lifecycle, which an observer can register to watch.

For the location tracking example, we can make the `MyLocationListener` class implement `DefaultLifecycleObserver` and then initialize it with the activity's `Lifecycle` in the `onCreate()` method. This allows the `MyLocationListener` class to be self-sufficient, meaning that the logic to react to changes in lifecycle status is declared in `MyLocationListener` instead of the activity. Having the individual components store their own logic makes the activities and fragments logic easier to manage.

### Kotlin

```kotlin
class MyActivity : AppCompatActivity() {
    private lateinit var myLocationListener: MyLocationListener

    override fun onCreate(...) {
        myLocationListener = MyLocationListener(this, lifecycle) { location ->
            // update UI
        }
        Util.checkUserStatus { result ->
            if (result) {
                myLocationListener.enable()
            }
        }
    }
}
```

### Java

```java
class MyActivity extends AppCompatActivity {
    private MyLocationListener myLocationListener;

    public void onCreate(...) {
        myLocationListener = new MyLocationListener(this, getLifecycle(), location -> {
            // update UI
        });
        Util.checkUserStatus(result -> {
            if (result) {
                myLocationListener.enable();
            }
        });
  }
}
```

A common use case is to avoid invoking certain callbacks if the `Lifecycle` isn't in a good state right now. For example, if the callback runs a fragment transaction after the activity state is saved, it would trigger a crash, so we would never want to invoke that callback.

To make this use case easy, the `Lifecycle` class allows other objects to query the current state.

### Kotlin

```kotlin
internal class MyLocationListener(
        private val context: Context,
        private val lifecycle: Lifecycle,
        private val callback: (Location) -> Unit
): DefaultLifecycleObserver {

    private var enabled = false

    override fun onStart(owner: LifecycleOwner) {
        if (enabled) {
            // connect
        }
    }

    fun enable() {
        enabled = true
        if (lifecycle.currentState.isAtLeast(Lifecycle.State.STARTED)) {
            // connect if not connected
        }
    }

    override fun onStop(owner: LifecycleOwner) {
        // disconnect if connected
    }
}
```

### Java

```java
class MyLocationListener implements DefaultLifecycleObserver {
    private boolean enabled = false;
    public MyLocationListener(Context context, Lifecycle lifecycle, Callback callback) {
       ...
    }

    @Override
    public void onStart(LifecycleOwner owner) {
        if (enabled) {
           // connect
        }
    }

    public void enable() {
        enabled = true;
        if (lifecycle.getCurrentState().isAtLeast(STARTED)) {
            // connect if not connected
        }
    }

    @Override
    public void onStop(LifecycleOwner owner) {
        // disconnect if connected
    }
}
```

With this implementation, our `LocationListener` class is completely lifecycle-aware. If we need to use our `LocationListener` from another activity or fragment, we just need to initialize it. All of the setup and teardown operations are managed by the class itself.

If a library provides classes that need to work with the Android lifecycle, we recommend that you use lifecycle-aware components. Your library clients can easily integrate those components without manual lifecycle management on the client side.

### Implementing a custom LifecycleOwner

Fragments and Activities in Support Library 26.1.0 and later already implement the `LifecycleOwner` interface.

If you have a custom class that you would like to make a `LifecycleOwner`, you can use the LifecycleRegistry class, but you need to forward events into that class, as shown in the following code example:

### Kotlin

```kotlin
class MyActivity : Activity(), LifecycleOwner {

    private lateinit var lifecycleRegistry: LifecycleRegistry

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)

        lifecycleRegistry = LifecycleRegistry(this)
        lifecycleRegistry.markState(Lifecycle.State.CREATED)
    }

    public override fun onStart() {
        super.onStart()
        lifecycleRegistry.markState(Lifecycle.State.STARTED)
    }

    override fun getLifecycle(): Lifecycle {
        return lifecycleRegistry
    }
}
```

### Java

```java
public class MyActivity extends Activity implements LifecycleOwner {
    private LifecycleRegistry lifecycleRegistry;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);

        lifecycleRegistry = new LifecycleRegistry(this);
        lifecycleRegistry.markState(Lifecycle.State.CREATED);
    }

    @Override
    public void onStart() {
        super.onStart();
        lifecycleRegistry.markState(Lifecycle.State.STARTED);
    }

    @NonNull
    @Override
    public Lifecycle getLifecycle() {
        return lifecycleRegistry;
    }
}
```

Best practices for lifecycle-aware components
---------------------------------------------

*   Keep your UI controllers (activities and fragments) as lean as possible. They should not try to acquire their own data; instead, use a `ViewModel` to do that, and observe a `LiveData` object to reflect the changes back to the views.
*   Try to write data-driven UIs where your UI controller’s responsibility is to update the views as data changes, or notify user actions back to the `ViewModel`.
*   Put your data logic in your `ViewModel` class. `ViewModel` should serve as the connector between your UI controller and the rest of your app. Be careful though, it isn't `ViewModel`'s responsibility to fetch data (for example, from a network). Instead, `ViewModel` should call the appropriate component to fetch the data, then provide the result back to the UI controller.
*   Use Data Binding to maintain a clean interface between your views and the UI controller. This allows you to make your views more declarative and minimize the update code you need to write in your activities and fragments. If you prefer to do this in the Java programming language, use a library like Butter Knife to avoid boilerplate code and have a better abstraction.
*   If your UI is complex, consider creating a presenter class to handle UI modifications. This might be a laborious task, but it can make your UI components easier to test.
*   Avoid referencing a `View` or `Activity` context in your `ViewModel`. If the `ViewModel` outlives the activity (in case of configuration changes), your activity leaks and isn't properly disposed by the garbage collector.
*   Use Kotlin coroutines to manage long-running tasks and other operations that can run asynchronously.

Use cases for lifecycle-aware components
----------------------------------------

Lifecycle-aware components can make it much easier for you to manage lifecycles in a variety of cases. A few examples are:

*   Switching between coarse and fine-grained location updates. Use lifecycle-aware components to enable fine-grained location updates while your location app is visible and switch to coarse-grained updates when the app is in the background. `LiveData`, a lifecycle-aware component, allows your app to automatically update the UI when your user changes locations.
*   Stopping and starting video buffering. Use lifecycle-aware components to start video buffering as soon as possible, but defer playback until app is fully started. You can also use lifecycle-aware components to terminate buffering when your app is destroyed.
*   Starting and stopping network connectivity. Use lifecycle-aware components to enable live updating (streaming) of network data while an app is in the foreground and also to automatically pause when the app goes into the background.
*   Pausing and resuming animated drawables. Use lifecycle-aware components to handle pausing animated drawables when while app is in the background and resume drawables after the app is in the foreground.

Handling on stop events
-----------------------

When a `Lifecycle` belongs to an `AppCompatActivity` or `Fragment`, the `Lifecycle`'s state changes to `CREATED` and the `ON_STOP` event is dispatched when the `AppCompatActivity` or `Fragment`'s `onSaveInstanceState()` is called.

When a `Fragment` or `AppCompatActivity`'s state is saved via `onSaveInstanceState()`, it's UI is considered immutable until `ON_START` is called. Trying to modify the UI after the state is saved is likely to cause inconsistencies in the navigation state of your application which is why `FragmentManager` throws an exception if the app runs a `FragmentTransaction` after state is saved. See `commit()` for details.

`LiveData` prevents this edge case out of the box by refraining from calling its observer if the observer's associated `Lifecycle` isn't at least `STARTED`. Behind the scenes, it calls `isAtLeast()`) before deciding to invoke its observer.

Unfortunately, `AppCompatActivity`'s `onStop()` method is called _after_ `onSaveInstanceState()`, which leaves a gap where UI state changes are not allowed but the `Lifecycle` has not yet been moved to the `CREATED` state.

To prevent this issue, the `Lifecycle` class in version `beta2` and lower mark the state as `CREATED` without dispatching the event so that any code that checks the current state gets the real value even though the event isn't dispatched until `onStop()` is called by the system.

Unfortunately, this solution has two major problems:

*   On API level 23 and lower, the Android system actually saves the state of an activity even if it is _partially_ covered by another activity. In other words, the Android system calls `onSaveInstanceState()` but it doesn't necessarily call `onStop()`. This creates a potentially long interval where the observer still thinks that the lifecycle is active even though its UI state can't be modified.
*   Any class that wants to expose a similar behavior to the `LiveData` class has to implement the workaround provided by `Lifecycle` version `beta 2` and lower.

