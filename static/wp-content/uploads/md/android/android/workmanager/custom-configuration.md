# Custom WorkManager Configuration and Initialization

By default, WorkManager configures itself automatically when your app starts, using reasonable options that are suitable for most apps. If you require more control of how WorkManager manages and schedules work, you can customize the WorkManager configuration by initializing WorkManager yourself.

The most flexible way to provide a custom initialization for WorkManager is to use on-demand initialization, available in WorkManager 2.1.0 and later. The other options are discussed later.

On-Demand Initialization
------------------------

On-demand initialization lets you create WorkManager only when that component is needed, instead of every time the app starts up. Doing so moves WorkManager off your critical startup path, improving app startup performance. To use on-demand initialization:

### Remove the default initializer

To provide your own configuration, you must first remove the default initializer. To do so, update `AndroidManifest.xml` using the merge rule `tools:node="remove"`.

Since WorkManager 2.6, App Startup is used internally within WorkManager. To provide a custom initializer you need to remove the `androidx.startup` node.

If you don't use App Startup in your app, you can remove it completely.

```xml
     <!-- If you want to disable android.startup completely. -->
     <provider
        android:name="androidx.startup.InitializationProvider"
        android:authorities="${applicationId}.androidx-startup"
        tools:node="remove">
     </provider>
```

Otherwise, remove only the `WorkManagerInitializer` node.

```xml
     <provider
        android:name="androidx.startup.InitializationProvider"
        android:authorities="${applicationId}.androidx-startup"
        android:exported="false"
        tools:node="merge">
        <!-- If you are using androidx.startup to initialize other components -->
        <meta-data
            android:name="androidx.work.WorkManagerInitializer"
            android:value="androidx.startup"
            tools:node="remove" />
     </provider>
```

While using an version of WorkManager older than 2.6, remove `workmanager-init` instead:

```xml
    <provider
        android:name="androidx.work.impl.WorkManagerInitializer"
        android:authorities="${applicationId}.workmanager-init"
        tools:node="remove" />
```

To learn more about using merge rules in your manifest, see the documentation on merging multiple manifest files.

### Implement Configuration.Provider

Have your `Application` class implement the `Configuration.Provider` interface, and provide your own implementation of `Configuration.Provider.getWorkManagerConfiguration`()). When you need to use WorkManager, make sure to call the method `WorkManager.getInstance(Context)`). WorkManager calls your app's custom `getWorkManagerConfiguration()` method to discover its `Configuration`. (You do not need to call `WorkManager.initialize()` yourself.)

Here's an example of a custom `getWorkManagerConfiguration()` implementation:

### Kotlin

```kotlin
class MyApplication() : Application(), Configuration.Provider {
     override fun getWorkManagerConfiguration() =
           Configuration.Builder()
                .setMinimumLoggingLevel(android.util.Log.INFO)
                .build()
}
```

### Java

```java
class MyApplication extends Application implements Configuration.Provider {
    @Override
    public Configuration getWorkManagerConfiguration() {
        return new Configuration.Builder()
                .setMinimumLoggingLevel(android.util.Log.INFO)
                .build();
    }
}
```

Custom initialization before WorkManager 2.1.0
----------------------------------------------

For versions of WorkManager before version 2.1.0, there are two initialization options. In most cases, the default initialization is all you need. For more precise control of WorkManager, you can specify your own configuration.

### Default initialization

WorkManager uses a custom `ContentProvider` to initialize itself when your app starts. This code lives in the internal class `androidx.work.impl.WorkManagerInitializer` and uses the default `Configuration`. The default initializer is automatically used unless you explicitly disable it. The default initializer is suitable for most apps.

### Custom initialization

If you want to control the initialization process, you must disable the default initializer, then define your own custom configuration.

Once the default initializer is removed, you can manually initialize WorkManager:

### Kotlin

```kotlin
// provide custom configuration
val myConfig = Configuration.Builder()
    .setMinimumLoggingLevel(android.util.Log.INFO)
    .build()

// initialize WorkManager
WorkManager.initialize(this, myConfig)
```

### Java

```java
// provide custom configuration
Configuration myConfig = new Configuration.Builder()
    .setMinimumLoggingLevel(android.util.Log.INFO)
    .build();

//initialize WorkManager
WorkManager.initialize(this, myConfig);
```

Make sure the initialization of the `WorkManager` singleton runs either in `Application.onCreate()`) or in a `ContentProvider.onCreate()`).

For the complete list of customizations available, see the `Configuration.Builder()` reference documentation.