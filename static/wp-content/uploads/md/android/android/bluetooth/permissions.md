# Bluetooth permissions

To use Bluetooth features in your app, you must declare several permissions. You should also specify whether your app requires support for Bluetooth classic or Bluetooth Low Energy (BLE). If your app doesn't require Bluetooth classic or BLE but can still benefit from these technologies, you can check for availability at runtime.

Declare permissions
-------------------

The set of permissions that you declare in your app depends on your app's target SDK version.

### Target Android 12 or higher

> **Note:** On Android 8.0 (API level 26) and higher, the Companion Device Manager (CDM) provides a more streamlined method of connecting to companion devices, compared to the permissions described in this section. The CDM system provides a pairing UI on behalf of your app and doesn't require location permissions.

If you want more control over the pairing and connecting experience, use the permissions described in this section.

![](https://developer.android.com/static/images/guide/topics/connectivity/bluetooth/nearby-devices.svg)

**Figure 1.** System permissions dialog, asking the user to grant an app permission to discover, advertise, and connect to nearby devices.

If your app targets Android 12 (API level 31) or higher, declare the following permissions in your app's manifest file:

1.  If your app looks for Bluetooth devices, such as BLE peripherals, declare the `BLUETOOTH_SCAN` permission.
2.  If your app makes the current device discoverable to other Bluetooth devices, declare the `BLUETOOTH_ADVERTISE` permission.
3.  If your app communicates with already-paired Bluetooth devices, declare the `BLUETOOTH_CONNECT` permission.
4.  For your legacy Bluetooth-related permission declarations, set `android:maxSdkVersion` to `30`. This app compatibility step helps the system grant your app only the Bluetooth permissions that it needs when installed on devices that run Android 12 or higher.
5.  If your app uses Bluetooth scan results to derive physical location, declare the `ACCESS_FINE_LOCATION` permission. Otherwise, you can strongly assert that your app doesn't derive physical location.

The `BLUETOOTH_ADVERTISE`, `BLUETOOTH_CONNECT`, and `BLUETOOTH_SCAN` permissions are runtime permissions. Therefore, you must explicitly request user approval in your app before you can look for Bluetooth devices, make a device discoverable to other devices, or communicate with already-paired Bluetooth devices. When your app requests at least one of these permissions, the system prompts the user to allow your app to access **Nearby devices**, as shown in figure 1.

The following code snippet demonstrates how to declare Bluetooth-related permissions in your app if it targets Android 12 or higher:

```xml
<manifest>
    <!-- Request legacy Bluetooth permissions on older devices. -->
    <uses-permission android:name="android.permission.BLUETOOTH"
                     android:maxSdkVersion="30" />
    <uses-permission android:name="android.permission.BLUETOOTH_ADMIN"
                     android:maxSdkVersion="30" />

    <!-- Needed only if your app looks for Bluetooth devices.
         If your app doesn't use Bluetooth scan results to derive physical
         location information, you can strongly assert that your app
         doesn't derive physical location. -->
    <uses-permission android:name="android.permission.BLUETOOTH_SCAN" />

    <!-- Needed only if your app makes the device discoverable to Bluetooth
         devices. -->
    <uses-permission android:name="android.permission.BLUETOOTH_ADVERTISE" />

    <!-- Needed only if your app communicates with already-paired Bluetooth
         devices. -->
    <uses-permission android:name="android.permission.BLUETOOTH_CONNECT" />

    <!-- Needed only if your app uses Bluetooth scan results to derive physical location. -->
    <uses-permission android:name="android.permission.ACCESS_FINE_LOCATION" />
    ...
</manifest>
```

#### Strongly assert that your app doesn't derive physical location

If your app doesn't use Bluetooth scan results to derive physical location, you can make a strong assertion that your app never uses the Bluetooth permissions to derive physical location. To do so, complete the following steps:

1.  Add the `android:usesPermissionFlags` attribute to your `BLUETOOTH_SCAN` permission declaration, and set this attribute's value to `neverForLocation`.
    
2.  If location isn't otherwise needed for your app, remove the `ACCESS_FINE_LOCATION` permission from your app's manifest.
    

The following code snippet shows how to update your app's manifest file:

```xml
<manifest>
    <!-- Include "neverForLocation" only if you can strongly assert that
         your app never derives physical location from Bluetooth scan results. -->
    <uses-permission android:name="android.permission.BLUETOOTH_SCAN"
                     android:usesPermissionFlags="neverForLocation" />

    <!-- Not needed if you can strongly assert that your app never derives
         physical location from Bluetooth scan results and doesn't need location
         access for any other purpose. -->
    <uses-permission android:name="android.permission.ACCESS_FINE_LOCATION" />
    ...
</manifest>
```

### Target Android 11 or lower

If your app targets Android 11 (API level 30) or lower, declare the following permissions in your app's manifest file:

*   `BLUETOOTH` is necessary to perform any Bluetooth classic or BLE communication, such as requesting a connection, accepting a connection, and transferring data.
*   `ACCESS_FINE_LOCATION` is necessary because, on Android 11 and lower, a Bluetooth scan could potentially be used to gather information about the location of the user.
    
    If your app targets Android 9 (API level 28) or lower, you can declare the `ACCESS_COARSE_LOCATION` permission instead of the `ACCESS_FINE_LOCATION` permission.
    

Because location permissions are runtime permissions, you must request these permissions at runtime along with declaring them in your manifest.

Discover local Bluetooth devices
--------------------------------

If you want your app to initiate device discovery or manipulate Bluetooth settings, you must declare the `BLUETOOTH_ADMIN` permission. Most apps need this permission solely for the ability to discover local Bluetooth devices. Don't use the other abilities granted by this permission unless the app is a "power manager" that modifies Bluetooth settings upon user request. Declare the permission in your app manifest file. For example:

```xml
    <manifest ... >
    <uses-permission android:name="android.permission.BLUETOOTH_ADMIN" />
    ...
    </manifest>
```

If your app supports a service and can run on Android 10 (API level 29) or Android 11, you must also declare the `ACCESS_BACKGROUND_LOCATION` permission to discover Bluetooth devices. For more information on this requirement, see Access location in the background.

The following code snippet shows how to declare the `ACCESS_BACKGROUND_LOCATION` permission:

```xml
    <manifest ... >
    <uses-permission android:name="android.permission.ACCESS_BACKGROUND_LOCATION" />
    ...
    </manifest>
```

See the `<uses-permission>` reference for more information about declaring app permissions.

Specify Bluetooth feature usage
-------------------------------

If Bluetooth is a critical piece of your app, you can add flags to your manifest file indicating this requirement. The `<uses-feature>` element allows you to specify the type of hardware your app uses and whether or not it is required.

This example shows how to indicate that Bluetooth classic is required for your app.

```xml
    <uses-feature android:name="android.hardware.bluetooth" android:required="true"/>
```

If your app relies on Bluetooth Low Energy, you can use the following:

```xml
    <uses-feature android:name="android.hardware.bluetooth_le" android:required="true"/>
```

If you say the feature is required for your app, then the Google Play store will hide your app from users on devices lacking those features. For this reason, you should only set the required attribute to `true` if your app can't work without the feature.

Check feature availability at runtime
-------------------------------------

To make your app available to devices that don't support Bluetooth classic or BLE, you should still include the `<uses-feature>` element in your app's manifest, but set `required="false"`. Then, at run-time, you can determine feature availability by using `PackageManager.hasSystemFeature()`):

### Kotlin

```kotlin
private fun PackageManager.missingSystemFeature(name: String): Boolean = !hasSystemFeature(name)
...
// Check to see if the Bluetooth classic feature is available.
packageManager.takeIf { it.missingSystemFeature(PackageManager.FEATURE_BLUETOOTH) }?.also {
    Toast.makeText(this, R.string.bluetooth_not_supported, Toast.LENGTH_SHORT).show()
    finish()
}
// Check to see if the BLE feature is available.
packageManager.takeIf { it.missingSystemFeature(PackageManager.FEATURE_BLUETOOTH_LE) }?.also {
    Toast.makeText(this, R.string.ble_not_supported, Toast.LENGTH_SHORT).show()
    finish()
}
```

### Java

```java
// Use this check to determine whether Bluetooth classic is supported on the device.
// Then you can selectively disable BLE-related features.
if (!getPackageManager().hasSystemFeature(PackageManager.FEATURE_BLUETOOTH)) {
    Toast.makeText(this, R.string.bluetooth_not_supported, Toast.LENGTH_SHORT).show();
    finish();
}
// Use this check to determine whether BLE is supported on the device. Then
// you can selectively disable BLE-related features.
if (!getPackageManager().hasSystemFeature(PackageManager.FEATURE_BLUETOOTH_LE)) {
    Toast.makeText(this, R.string.ble_not_supported, Toast.LENGTH_SHORT).show();
    finish();
}
```