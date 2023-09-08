`<instrumentation>`
=================

syntax:

```xml
<instrumentation android:functionalTest\=\["true" | "false"\]
        android:handleProfiling\=\["true" | "false"\]
        android:icon\="_drawable resource_"
        android:label\="_string resource_"
        android:name\="_string_"
        android:targetPackage\="_string_"
        android:targetProcesses\="_string_" />
```

contained in: `<manifest>` description: Declares an `Instrumentation` class that enables you to monitor an application's interaction with the system. The Instrumentation object is instantiated before any of the application's components. attributes: `android:functionalTest` Whether or not the Instrumentation class should run as a functional test — "`true`" if it should, and "`false`" if not. The default value is "`false`". `android:handleProfiling` Whether or not the Instrumentation object will turn profiling on and off — "`true`" if it determines when profiling starts and stops, and "`false`" if profiling continues the entire time it is running. A value of "`true`" enables the object to target profiling at a specific set of operations. The default value is "`false`". `android:icon` An icon that represents the Instrumentation class. This attribute must be set as a reference to a drawable resource. `android:label` A user-readable label for the Instrumentation class. The label can be set as a raw string or a reference to a string resource. `android:name` The name of the `Instrumentation` subclass. This should be a fully qualified class name (such as, "`com.example.project.StringInstrumentation`"). However, as a shorthand, if the first character of the name is a period, it is appended to the package name specified in the `<manifest>` element.

There is no default. The name must be specified.

`android:targetPackage` The application that the `Instrumentation` object will run against. An application is identified by the package name assigned in its manifest file by the `<manifest>` element. `android:targetProcesses`

The processes that the `Instrumentation` object will run against. A comma-separated list indicates that the instrumentation will run against those specific processes. A value of `"*"` indicates that the instrumentation will run against all processes of the app defined in `android:targetPackage`.

If this value isn't provided in the manifest, the instrumentation will run only against the main process of the app defined in `android:targetPackage`.

This attribute was added in API Level 26.

introduced in: API Level 1