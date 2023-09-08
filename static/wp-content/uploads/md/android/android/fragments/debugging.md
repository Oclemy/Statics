# Debug your fragments

This guide covers tools that you can use to debug your fragments.

FragmentManager logging
-----------------------

`FragmentManager` is capable of emitting various messages to Logcat. This is disabled by default to avoid adding noise to Logcat, but sometimes these log messages can help you troubleshoot issues with your fragments. `FragmentManager` emits the most meaningful output at the _Debug_ and _Verbose_ log levels.

You can enable logging using the `adb shell` command:

adb shell setprop log.tag.FragmentManager DEBUG

Alternatively, you can enable verbose logging:

adb shell setprop log.tag.FragmentManager VERBOSE

If you enable verbose logging, you can then apply a log level filter in the Logcat window. However, this will filter all logs, not just the `FragmentManager` logs. It's usually best to enable `FragmentManager` logging only at the log level that you need.

### DEBUG logging

At `DEBUG` level `FragmentManager` generally emits log messages relating to lifecycle state changes. Each log entry contains the `toString()`) dump from the `Fragment`. A log entry consists of the following information:

*   The simple class name of the `Fragment` instance.
*   The identity hash code) of the `Fragment` instance.
*   The `FragmentManager`’s unique ID of the `Fragment` instance. This is stable across configuration changes and process death and recreation.
*   The ID of the container that the `Fragment` was added to, but only if set.
*   The `Fragment` tag, but only if set.

D/FragmentManager: moveto ATTACHED: NavHostFragment{92d8f1d} (fd92599e-c349-4660-b2d6-0ece9ec72f7b id=0x7f080116)

You can identity the Fragment from the following:

*   The `Fragment` class is `NavHostFragment.`
*   The identity hash code is `92d8f1d`.
*   The unique ID is `fd92599e-c349-4660-b2d6-0ece9ec72f7b`.
*   The container ID is `0x7f080116`.
*   The tag is omitted because none was set. If it were present, it would follow the ID in the format `tag=tag_value`.

For brevity and readability, the UUIDs have been shortened in the following examples.

Here we see a `NavHostFragment` initialized and then the `startDestination` `Fragment` of type `FirstFragment` being created and transitioning through to `RESUMED` state:

```shell
D/FragmentManager: moveto ATTACHED: NavHostFragment{92d8f1d} (<UUID> id=0x7f080116)
D/FragmentManager:   mName=null mIndex=-1 mCommitted=false
D/FragmentManager:   Operations:
D/FragmentManager:     Op #0: SET_PRIMARY_NAV NavHostFragment{92d8f1d} (<UUID> id=0x7f080116)
D/FragmentManager: moveto CREATED: NavHostFragment{92d8f1d} (<UUID> id=0x7f080116)
D/FragmentManager:   mName=null mIndex=-1 mCommitted=false
D/FragmentManager:   Operations:
D/FragmentManager:     Op #0: REPLACE FirstFragment{ccd2189} (<UUID> id=0x7f080116)
D/FragmentManager:     Op #1: SET_PRIMARY_NAV FirstFragment{ccd2189} (<UUID> id=0x7f080116)
D/FragmentManager: moveto ATTACHED: FirstFragment{ccd2189} (<UUID> id=0x7f080116)
D/FragmentManager: moveto CREATED: FirstFragment{ccd2189} (<UUID> id=0x7f080116)
D/FragmentManager: moveto CREATE_VIEW: NavHostFragment{92d8f1d} (<UUID> id=0x7f080116)
D/FragmentManager: moveto CREATE_VIEW: FirstFragment{ccd2189} (<UUID> id=0x7f080116)
D/FragmentManager: moveto ACTIVITY_CREATED: NavHostFragment{92d8f1d} (<UUID> id=0x7f080116)
D/FragmentManager: moveto RESTORE_VIEW_STATE: NavHostFragment{92d8f1d} (<UUID> id=0x7f080116)
D/FragmentManager: moveto ACTIVITY_CREATED: FirstFragment{ccd2189} (<UUID> id=0x7f080116)
D/FragmentManager: moveto RESTORE_VIEW_STATE: FirstFragment{ccd2189} (<UUID> id=0x7f080116)
D/FragmentManager: moveto STARTED: NavHostFragment{92d8f1d} (<UUID> id=0x7f080116)
D/FragmentManager: moveto STARTED: FirstFragment{ccd2189} (<UUID> id=0x7f080116)
D/FragmentManager: moveto RESUMED: NavHostFragment{92d8f1d} (<UUID> id=0x7f080116)
D/FragmentManager: moveto RESUMED: FirstFragment{ccd2189} (<UUID> id=0x7f080116)
```

Following a user interaction, we see `FirstFragment` transition out of the various lifecycle states. Then `SecondFragment` is instantiated and transitions through to `RESUMED` state:

```shell
D/FragmentManager:   mName=07c8a5e8-54a3-4e21-b2cc-c8efc37c4cf5 mIndex=-1 mCommitted=false
D/FragmentManager:   Operations:
D/FragmentManager:     Op #0: REPLACE SecondFragment{84132db} (<UUID> id=0x7f080116)
D/FragmentManager:     Op #1: SET_PRIMARY_NAV SecondFragment{84132db} (<UUID> id=0x7f080116)
D/FragmentManager: movefrom RESUMED: FirstFragment{ccd2189} (<UUID> id=0x7f080116)
D/FragmentManager: movefrom STARTED: FirstFragment{ccd2189} (<UUID> id=0x7f080116)
D/FragmentManager: movefrom ACTIVITY_CREATED: FirstFragment{ccd2189} (<UUID> id=0x7f080116)
D/FragmentManager: moveto ATTACHED: SecondFragment{84132db} (<UUID> id=0x7f080116)
D/FragmentManager: moveto CREATED: SecondFragment{84132db} (<UUID> id=0x7f080116)
D/FragmentManager: moveto CREATE_VIEW: SecondFragment{84132db} (<UUID> id=0x7f080116)
D/FragmentManager: moveto ACTIVITY_CREATED: SecondFragment{84132db} (<UUID> id=0x7f080116)
D/FragmentManager: moveto RESTORE_VIEW_STATE: SecondFragment{84132db} (<UUID> id=0x7f080116)
D/FragmentManager: moveto STARTED: SecondFragment{84132db} (<UUID> id=0x7f080116)
D/FragmentManager: movefrom CREATE_VIEW: FirstFragment{ccd2189} (<UUID> id=0x7f080116)
D/FragmentManager: moveto RESUMED: SecondFragment{84132db} (<UUID> id=0x7f080116)
```

All the Fragment instances are suffixed by an identifier so that you can track different instances of the same `Fragment` class.

### VERBOSE logging

At `VERBOSE` level, `FragmentManager` generally emits log messages about its internal state:

```shell
V/FragmentManager: Run: BackStackEntry{f9d3ff3}
V/FragmentManager: add: NavHostFragment{86274b0} (<UUID> id=0x7f080130)
V/FragmentManager: Added fragment to active set NavHostFragment{86274b0} (<UUID> id=0x7f080130)
V/FragmentManager: computeExpectedState() of 1 for NavHostFragment{86274b0} (<UUID> id=0x7f080130)
D/FragmentManager: moveto ATTACHED: NavHostFragment{86274b0} (<UUID> id=0x7f080130)
V/FragmentManager: Commit: BackStackEntry{5cfd2ae}
D/FragmentManager:   mName=null mIndex=-1 mCommitted=false
D/FragmentManager:   Operations:
D/FragmentManager:     Op #0: SET_PRIMARY_NAV NavHostFragment{86274b0} (<UUID> id=0x7f080130)
V/FragmentManager: computeExpectedState() of 1 for NavHostFragment{86274b0} (<UUID> id=0x7f080130)
D/FragmentManager: moveto CREATED: NavHostFragment{86274b0} (<UUID> id=0x7f080130)
V/FragmentManager: Commit: BackStackEntry{e93833f}
D/FragmentManager:   mName=null mIndex=-1 mCommitted=false
D/FragmentManager:   Operations:
D/FragmentManager:     Op #0: REPLACE FirstFragment{886440c} (<UUID> id=0x7f080130)
D/FragmentManager:     Op #1: SET_PRIMARY_NAV FirstFragment{886440c} (<UUID> id=0x7f080130)
V/FragmentManager: Run: BackStackEntry{e93833f}
V/FragmentManager: add: FirstFragment{886440c} (<UUID> id=0x7f080130)
V/FragmentManager: Added fragment to active set FirstFragment{886440c} (<UUID> id=0x7f080130)
V/FragmentManager: computeExpectedState() of 1 for FirstFragment{886440c} (<UUID> id=0x7f080130)
D/FragmentManager: moveto ATTACHED: FirstFragment{886440c} (<UUID> id=0x7f080130)
V/FragmentManager: computeExpectedState() of 1 for FirstFragment{886440c} (<UUID> id=0x7f080130)
D/FragmentManager: moveto CREATED: FirstFragment{886440c} (<UUID> id=0x7f080130)
V/FragmentManager: computeExpectedState() of 1 for FirstFragment{886440c} (<UUID> id=0x7f080130)
V/FragmentManager: computeExpectedState() of 1 for FirstFragment{886440c} (<UUID> id=0x7f080130)
V/FragmentManager: computeExpectedState() of 1 for FirstFragment{886440c} (<UUID> id=0x7f080130)
V/FragmentManager: computeExpectedState() of 1 for FirstFragment{886440c} (<UUID> id=0x7f080130)
V/FragmentManager: computeExpectedState() of 1 for NavHostFragment{86274b0} (<UUID> id=0x7f080130)
V/FragmentManager: computeExpectedState() of 1 for NavHostFragment{86274b0} (<UUID> id=0x7f080130)
V/FragmentManager: computeExpectedState() of 1 for NavHostFragment{86274b0} (<UUID> id=0x7f080130)
V/FragmentManager: computeExpectedState() of 4 for NavHostFragment{86274b0} (<UUID> id=0x7f080130)
D/FragmentManager: moveto CREATE_VIEW: NavHostFragment{86274b0} (<UUID> id=0x7f080130)
V/FragmentManager: computeExpectedState() of 2 for FirstFragment{886440c} (<UUID> id=0x7f080130)
D/FragmentManager: moveto CREATE_VIEW: FirstFragment{886440c} (<UUID> id=0x7f080130)
V/FragmentManager: computeExpectedState() of 2 for FirstFragment{886440c} (<UUID> id=0x7f080130)
V/FragmentManager: computeExpectedState() of 2 for FirstFragment{886440c} (<UUID> id=0x7f080130)
V/FragmentManager: computeExpectedState() of 4 for NavHostFragment{86274b0} (<UUID> id=0x7f080130)
D/FragmentManager: moveto ACTIVITY_CREATED: NavHostFragment{86274b0} (<UUID> id=0x7f080130)
D/FragmentManager: moveto RESTORE_VIEW_STATE: NavHostFragment{86274b0} (<UUID> id=0x7f080130)
V/FragmentManager: computeExpectedState() of 4 for FirstFragment{886440c} (<UUID> id=0x7f080130)
D/FragmentManager: moveto ACTIVITY_CREATED: FirstFragment{886440c} (<UUID> id=0x7f080130)
D/FragmentManager: moveto RESTORE_VIEW_STATE: FirstFragment{886440c} (<UUID> id=0x7f080130)
V/FragmentManager: computeExpectedState() of 4 for FirstFragment{886440c} (<UUID> id=0x7f080130)
V/FragmentManager: SpecialEffectsController: Enqueuing add operation for fragment FirstFragment{886440c} (<UUID> id=0x7f080130)
V/FragmentManager: computeExpectedState() of 4 for FirstFragment{886440c} (<UUID> id=0x7f080130)
V/FragmentManager: computeExpectedState() of 4 for FirstFragment{886440c} (<UUID> id=0x7f080130)
V/FragmentManager: SpecialEffectsController: For fragment FirstFragment{886440c} (<UUID> id=0x7f080130) mFinalState = VISIBLE -> VISIBLE.
V/FragmentManager: SpecialEffectsController: Container androidx.fragment.app.FragmentContainerView{7578ffa V.E...... ......I. 0,0-0,0 #7f080130 app:id/nav_host_fragment_content_fragment} is not attached to window. Cancelling pending operation Operation {382a9ab} {mFinalState = VISIBLE} {mLifecycleImpact = ADDING} {mFragment = FirstFragment{886440c} (<UUID> id=0x7f080130)}
V/FragmentManager: SpecialEffectsController: Operation {382a9ab} {mFinalState = VISIBLE} {mLifecycleImpact = ADDING} {mFragment = FirstFragment{886440c} (<UUID> id=0x7f080130)} has called complete.
V/FragmentManager: SpecialEffectsController: Setting view androidx.constraintlayout.widget.ConstraintLayout{3968808 I.E...... ......I. 0,0-0,0} to VISIBLE
V/FragmentManager: computeExpectedState() of 4 for FirstFragment{886440c} (<UUID> id=0x7f080130)
V/FragmentManager: computeExpectedState() of 4 for NavHostFragment{86274b0} (<UUID> id=0x7f080130)
V/FragmentManager: SpecialEffectsController: Enqueuing add operation for fragment NavHostFragment{86274b0} (<UUID> id=0x7f080130)
V/FragmentManager: computeExpectedState() of 4 for NavHostFragment{86274b0} (<UUID> id=0x7f080130)
V/FragmentManager: computeExpectedState() of 4 for NavHostFragment{86274b0} (<UUID> id=0x7f080130)
V/FragmentManager: SpecialEffectsController: For fragment NavHostFragment{86274b0} (<UUID> id=0x7f080130) mFinalState = VISIBLE -> VISIBLE. 
V/FragmentManager: SpecialEffectsController: Container androidx.fragment.app.FragmentContainerView{2ba8ba1 V.E...... ......I. 0,0-0,0 #7f080130 app:id/nav_host_fragment_content_fragment} is not attached to window. Cancelling pending operation Operation {f7eb1c6} {mFinalState = VISIBLE} {mLifecycleImpact = ADDING} {mFragment = NavHostFragment{86274b0} (<UUID> id=0x7f080130)}
V/FragmentManager: SpecialEffectsController: Operation {f7eb1c6} {mFinalState = VISIBLE} {mLifecycleImpact = ADDING} {mFragment = NavHostFragment{86274b0} (<UUID> id=0x7f080130)} has called complete.
V/FragmentManager: SpecialEffectsController: Setting view androidx.fragment.app.FragmentContainerView{7578ffa I.E...... ......I. 0,0-0,0 #7f080130 app:id/nav_host_fragment_content_fragment} to VISIBLE
V/FragmentManager: computeExpectedState() of 4 for NavHostFragment{86274b0} (<UUID> id=0x7f080130)
V/FragmentManager: Run: BackStackEntry{5cfd2ae}
V/FragmentManager: computeExpectedState() of 4 for NavHostFragment{86274b0} (<UUID> id=0x7f080130)
V/FragmentManager: computeExpectedState() of 4 for NavHostFragment{86274b0} (<UUID> id=0x7f080130)
V/FragmentManager: computeExpectedState() of 4 for NavHostFragment{86274b0} (<UUID> id=0x7f080130)
V/FragmentManager: computeExpectedState() of 5 for NavHostFragment{86274b0} (<UUID> id=0x7f080130)
D/FragmentManager: moveto STARTED: NavHostFragment{86274b0} (<UUID> id=0x7f080130)
V/FragmentManager: computeExpectedState() of 5 for FirstFragment{886440c} (<UUID> id=0x7f080130)
D/FragmentManager: moveto STARTED: FirstFragment{886440c} (<UUID> id=0x7f080130)
V/FragmentManager: computeExpectedState() of 5 for FirstFragment{886440c} (<UUID> id=0x7f080130)
V/FragmentManager: computeExpectedState() of 5 for FirstFragment{886440c} (<UUID> id=0x7f080130)
V/FragmentManager: computeExpectedState() of 5 for NavHostFragment{86274b0} (<UUID> id=0x7f080130)
V/FragmentManager: computeExpectedState() of 5 for NavHostFragment{86274b0} (<UUID> id=0x7f080130)
V/FragmentManager: computeExpectedState() of 7 for NavHostFragment{86274b0} (<UUID> id=0x7f080130)
V/FragmentManager: computeExpectedState() of 7 for NavHostFragment{86274b0} (<UUID> id=0x7f080130)
D/FragmentManager: moveto RESUMED: NavHostFragment{86274b0} (<UUID> id=0x7f080130)
V/FragmentManager: computeExpectedState() of 7 for FirstFragment{886440c} (<UUID> id=0x7f080130)
V/FragmentManager: computeExpectedState() of 7 for FirstFragment{886440c} (<UUID> id=0x7f080130)
D/FragmentManager: moveto RESUMED: FirstFragment{886440c} (<UUID> id=0x7f080130)
V/FragmentManager: computeExpectedState() of 7 for FirstFragment{886440c} (<UUID> id=0x7f080130)
V/FragmentManager: computeExpectedState() of 7 for FirstFragment{886440c} (<UUID> id=0x7f080130)
V/FragmentManager: computeExpectedState() of 7 for NavHostFragment{86274b0} (<UUID> id=0x7f080130)
V/FragmentManager: computeExpectedState() of 7 for NavHostFragment{86274b0} (<UUID> id=0x7f080130)
```

This only covers the loading on `FirstFragment`. Including the transition to `SecondFragment` would have increased the log entries considerably. Much of the `VERBOSE` level log messages will be of little to no use to app developers. However, seeing when changes to the back stack occur may help in debugging some issues.

StrictMode for fragments
------------------------

Version 1.4.0 and higher of the Jetpack Fragment library includes StrictMode for fragments. It can catch some common issues which may cause your app to behave in unexpected ways.

By default, Fragment StrictMode has a `LAX` policy that catches nothing. However, it is possible to create custom policies. A custom `Policy` defines which violations are detected and specifies what penalty is applied when violations are detected.

To apply a custom StrictMode policy, assign it to the `FragmentManager`. You should do this as early as possible. In this case, you do it in an `init` block or in the Java constructor:

### Kotlin

```kotlin
class ExampleActivity : AppCompatActivity() {

    init {
        supportFragmentManager.strictModePolicy =
            FragmentStrictMode.Policy.Builder()
                .penaltyDeath()
                .detectFragmentReuse()
                .allowViolation(FirstFragment::class.java,
                                FragmentReuseViolation::class.java)
                .build()
    }

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)

        val binding = ActivityExampleBinding.inflate(layoutInflater)
        setContentView(binding.root)
        ...
   }
}
```

### Java

```java
class ExampleActivity extends AppCompatActivity() {

    ExampleActivity() {
        getSupportFragmentManager().setStrictModePolicy(
                new FragmentStrictMode.Policy.Builder()
                        .penaltyDeath()
                        .detectFragmentReuse()
                        .allowViolation(FirstFragment.class,
                                        FragmentReuseViolation.class)
                        .build()
        );
    }

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState)

        ActivityExampleBinding binding =
            ActivityExampleBinding.inflate(getLayoutInflater());
        setContentView(binding.getRoot());
        ...
   }
}
```

For cases where you need to know the `Context` to determine whether or not to enable strict mode (for example, from the value of a boolean resource), you can defer assigning a StrictMode policy to the `FragmentManager` using an `OnContextAvailableListener`:

### Kotlin

```kotlin
class ExampleActivity : AppCompatActivity() {

    init {
        addOnContextAvailableListener { context ->
            if(context.resources.getBoolean(R.bool.enable_strict_mode)) {
                supportFragmentManager.strictModePolicy = FragmentStrictMode.Policy.Builder()
                    .penaltyDeath()
                    .detectFragmentReuse()
                    .allowViolation(FirstFragment::class.java, FragmentReuseViolation::class.java)
                    .build()
            }
        }
    }

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)

        val binding = ActivityExampleBinding.inflate(layoutInflater)
        setContentView(binding.root)
        ...
   }
}
```

### Java

```java
class ExampleActivity extends AppCompatActivity() {

    ExampleActivity() {
        addOnContextAvailableListener((context) -> {
            if(context.getResources().getBoolean(R.bool.enable_strict_mode)) {
                getSupportFragmentManager().setStrictModePolicy(
                        new FragmentStrictMode.Policy.Builder()
                                .penaltyDeath()
                                .detectFragmentReuse()
                                .allowViolation(FirstFragment.class, FragmentReuseViolation.class)
                                .build()
                );
            }
        }
    }

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState)

        ActivityExampleBinding binding = ActivityExampleBinding.inflate(getLayoutInflater());
        setContentView(binding.getRoot());
        ...
   }
}
```

The latest point at which you should configure strict mode to catch all possible violations is in `onCreate()`), but here you must configure strict mode before the call to `super.onCreate()`:

### Kotlin

```kotlin
class ExampleActivity : AppCompatActivity() {

    override fun onCreate(savedInstanceState: Bundle?) {
        supportFragmentManager.strictModePolicy = FragmentStrictMode.Policy.Builder()
            .penaltyDeath()
            .detectFragmentReuse()
            .allowViolation(FirstFragment::class.java, FragmentReuseViolation::class.java)
            .build()

        super.onCreate(savedInstanceState)

        val binding = ActivityExampleBinding.inflate(layoutInflater)
        setContentView(binding.root)
        ...
   }
}
```

### Java

```java
class ExampleActivity extends AppCompatActivity() {

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        getSupportFragmentManager().setStrictModePolicy(
                new FragmentStrictMode.Policy.Builder()
                        .penaltyDeath()
                        .detectFragmentReuse()
                        .allowViolation(FirstFragment.class, FragmentReuseViolation.class)
                        .build()
                );

        super.onCreate(savedInstanceState)

        ActivityExampleBinding binding = ActivityExampleBinding.inflate(getLayoutInflater());
        setContentView(binding.getRoot());
        ...
   }
}
```

This policy used in these examples detects only fragment reuse violations, and the app terminates whenever one occurs. `penaltyDeath()` can be helpful in debug builds because it fails quickly enough that you cannot ignore violations.

It is also possible to selectively allow certain violations. In the example, However, this policy enforces this violation for all other fragment types. This is useful for cases where a third-party library component might contain StrictMode violations. In such cases, you can temporarily add those violations to the allow list of your StrictMode for components that you don’t own until the library fixes their violation.

See the documentation for `FragmentStrictMode.Policy.Builder` for details on how to configure other violations.

There are three penalty types.

*   `penaltyLog()` dumps details of violations to `LogCat`
*   `penaltyDeath()`) terminates the app when violations are detected.
*   `penaltyListener()` allows you to add a custom listener, which gets called whenever violations are detected.

You can apply any combination of penalties in your `Policy`. If your policy does not explicitly specify a penalty, a default of `penaltyLog()` is applied. If you apply a penalty other than `penaltyLog()` in your custom `Policy`, then `penaltyLog()` will be disabled unless you explicitly set it.

`penaltyListener()` can be useful when you have a third-party logging library to which you want to log violations. Alternatively, you might want to enable non-fatal violation catching in release builds and log them to a crash reporting library. This strategy can detect violations in the wild.

Setting a global StrictMode policy is best done by setting a default policy that applies to all `FragmentManager` instances via the `FragmentStrictMode.setDefaultPolicy()`) method:

### Kotlin

```kotlin
class MyApplication : Application() {

    override fun onCreate() {
        super.onCreate()

        FragmentStrictMode.defaultPolicy =
            FragmentStrictMode.Policy.Builder()
                .detectFragmentReuse()
                .detectFragmentTagUsage()
                .detectRetainInstanceUsage()
                .detectSetUserVisibleHint()
                .detectTargetFragmentUsage()
                .detectWrongFragmentContainer()
                .apply {
                    if (BuildConfig.DEBUG) {
                        // Fail early on DEBUG builds
                        penaltyDeath()
                    } else {
                        // Log to Crashlytics on RELEASE builds
                        penaltyListener {
                            FirebaseCrashlytics.getInstance().recordException(it)
                        }
                    }
                }
                .build()
    }
}
```

### Java

```java
public class MyApplication extends Application {

    @Override
    public void onCreate() {
        super.onCreate();

        FragmentStrictMode.Policy.Builder builder = new FragmentStrictMode.Policy.Builder();
        builder.detectFragmentReuse()
                .detectFragmentTagUsage()
                .detectRetainInstanceUsage()
                .detectSetUserVisibleHint()
                .detectTargetFragmentUsage()
                .detectWrongFragmentContainer();
        if (BuildConfig.DEBUG) {
            // Fail early on DEBUG builds
            builder.penaltyDeath();
        } else {
            // Log to Crashlytics on RELEASE builds
            builder.penaltyListener((exception) ->
                    FirebaseCrashlytics.getInstance().recordException(exception)
            );
        }
        FragmentStrictMode.setDefaultPolicy(builder.build());
    }
}
```

The following sections describe types of violations and possible workarounds.

### Fragment reuse

The fragment reuse violation is enabled using `detectFragmentReuse()`) and throws a `FragmentReuseViolation`.

This violation indicates the reuse of a `Fragment` instance after its removal from `FragmentManager`. This reuse can cause issues because the `Fragment` may retain state from its previous use and not behave consistently. If you create a new instance each time, it will always be in the initial state when added to `FragmentManager`.

### Fragment tag usage

The fragment tag usage violation is enabled using `detectFragmentTagUsage()`) and throws a `FragmentTagUsageViolation`.

This violation indicates that a `Fragment` was inflated using the `<fragment>` tag in an XML layout. To resolve this, inflate your `Fragment` inside `<androidx.fragment.app.FragmentContainerView>` rather than in the `<fragment>` tag. Fragments inflated using a `FragmentContainerView` can reliably handle `Fragment` transactions and configuration changes. These may not work as expected if you use the `<fragment>` tag instead.

### Retain instance usage

The retain instance usage violation is enabled using `detectRetainInstanceUsage()`) and throws a `RetainInstanceUsageViolation`.

This violation indicates the usage of a retained `Fragment`. Specifically, if there are calls to `setRetainInstance()`) or `getRetainInstance()`) which are both deprecated.

Instead of using these methods to manage retained `Fragment` instances yourself, you should store state in a `ViewModel` that will handle this for you.

### Set user visible hint

The set user visible hint violation is enabled using `detectSetUserVisibleHint()`) and throws a `SetUserVisibleHintViolation`.

This violation indicates a call to `setUserVisibleHint()`, which is deprecated.

If you are manually calling this method, then you should call `setMaxLifecycle()`) instead. If you override this method, you should move the behavior to `onResume()`) when passing in **`true`** and `onPause()`) when passing in **`false`**.

### Target fragment usage

The target fragment usage violation is enabled using `detectTargetFragmentUsage()`) and throws a `TargetFragmentUsageViolation`.

This violation indicates a call to `setTargetFragment()`), `getTargetFragment()`), or `getTargetRequestCode()`), which are all deprecated. Instead of using these methods you should register a `FragmentResultListener`. For more information, see Pass results between fragments.

### Wrong fragment container

The wrong fragment container violation is enabled using `detectWrongFragmentContainer()`) and throws a `WrongFragmentContainerViolation`.

This violation indicates the addition of a `Fragment` to a container other than `FragmentContainerView`. As with Fragment tag usage, Fragment Transactions may not work as expected unless hosted inside a `FragmentContainerView`. It also helps address an issue in the `View` API that causes fragments using exit animations to be drawn on top of all other fragments.