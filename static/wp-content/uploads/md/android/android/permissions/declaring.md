# Declare app permissions

As mentioned in the workflow for using permissions, if your app requests app permissions, you must declare these permissions in your app's manifest file. These declarations help app stores and users understand the set of permissions that your app might request.

The process to request a permission depends on the type of permission:

*   If the permission is an install-time permission, such as a normal permission or a signature permission, the permission is granted automatically at install time.
*   If the permission is a runtime permission, and if your app is installed on a device that runs Android 6.0 (API level 23) or higher, you must request the permission yourself.

Add declaration to app manifest
-------------------------------

To declare a permission that your app might request, include the appropriate `<uses-permission>` element in your app's manifest file. For example, an app that needs to access the camera has this line in `AndroidManifest.xml`:

```xml
<manifest ...>
    <uses-permission android:name="android.permission.CAMERA"/>
    <application ...>
        ...
    </application>
</manifest>
```

Declare hardware as optional
----------------------------

Some permissions, such as `CAMERA`, let your app access pieces of hardware that only some Android devices have. If your app declares one of these hardware-associated permissions, consider whether your app can still run on a device that doesn't have that hardware. In most cases, hardware is optional, so it's better to declare the hardware as optional by setting `android:required` to `false` in your `<uses-feature>` declaration, as shown in the following code snippet from an `AndroidManifest.xml` file:

```xml
<manifest ...>
    <application>
        ...
    </application>
    <uses-feature android:name="android.hardware.camera"
                  android:required="false" />
<manifest>
```

### Determine hardware availability

If you declare hardware as optional, it's possible for your app to run on a device that doesn't have that hardware. To check whether a device has a specific piece of hardware, use the `hasSystemFeature()`) method, as shown in the following code snippet. If the hardware isn't available, gracefully disable that feature in your app.

### Kotlin

```kotlin
// Check whether your app is running on a device that has a front-facing camera.
if (applicationContext.packageManager.hasSystemFeature(
        PackageManager.FEATURE_CAMERA_FRONT)) {
    // Continue with the part of your app's workflow that requires a
    // front-facing camera.
} else {
    // Gracefully degrade your app experience.
}
```

### Java

```java
// Check whether your app is running on a device that has a front-facing camera.
if (getApplicationContext().getPackageManager().hasSystemFeature(
        PackageManager.FEATURE_CAMERA_FRONT)) {
    // Continue with the part of your app's workflow that requires a
    // front-facing camera.
} else {
    // Gracefully degrade your app experience.
}
```

Declare permissions by API level
--------------------------------

To declare a permission only on devices that support runtime permissions—that is, devices that run Android 6.0 (API level 23) or higher—include the `<uses-permission-sdk-23>` element instead of the `<uses-permission>` element.

When using either of these elements, you can set the `maxSdkVersion` attribute to indicate that devices running a version of Android higher than the specified value don't need a particular permission. This lets you eliminate unnecessary permissions while still providing compatibility for older devices.

For example, your app might show media content, such as photos or videos, that the user created while in your app. In this situation, you don't need to use the `READ_EXTERNAL_STORAGE` permission on devices that run Android 10 (API level 29) or higher, as long as your app targets Android 10 or higher. However, for compatibility with older devices, you can declare the `READ_EXTERNAL_STORAGE` permission and set the `android:maxSdkVersion` to 28.