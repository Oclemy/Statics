# Request location permissions 

To protect user privacy, apps that use location services must request location permissions.

When you request location permissions, follow the same best practices as you would for any other runtime permission. One important difference when it comes to location permissions is that the system includes multiple permissions related to location. Which permissions you request, and how you request them, depend on the location requirements for your app's use case.

This page describes the different types of location requirements and provides guidance on how to request location permissions in each case.

Types of location access
------------------------

Each permission has a combination of the following characteristics:

*   **Category**: Either foreground location or background location.
*   **Accuracy**: Either precise location or approximate location.

### Foreground location

If your app contains a feature that shares or receives location information only once, or for a defined amount of time, then that feature requires foreground location access. Some examples include the following:

*   Within a navigation app, a feature allows users to get turn-by-turn directions.
*   Within a messaging app, a feature allows users to share their current location with another user.

The system considers your app to be using foreground location if a feature of your app accesses the device's current location in one of the following situations:

*   An activity that belongs to your app is visible.
*   Your app is running a foreground service. When a foreground service is running, the system raises user awareness by showing a persistent notification. Your app retains access when it's placed in the background, such as when the user presses the **Home** button on their device or turns their device's display off.
    
    Additionally, it's recommended that you declare a foreground service type of `location`, as shown in the following code snippet. On Android 10 (API level 29) and higher, you must declare this foreground service type.
  ```xml  
    <!-- Recommended for Android 9 (API level 28) and lower. -->
    <!-- Required for Android 10 (API level 29) and higher. -->
    <service
        android:name="MyNavigationService"
        android:foregroundServiceType="location" ... >
        <!-- Any inner elements would go here. -->
    </service>
    ```

You declare a need for foreground location when your app requests either the `ACCESS_COARSE_LOCATION` permission or the `ACCESS_FINE_LOCATION` permission, as shown in the following snippet:

```xml
<manifest ... >
  <!-- Always include this permission -->
  <uses-permission android:name="android.permission.ACCESS_COARSE_LOCATION" />

  <!-- Include only if your app benefits from precise location access. -->
  <uses-permission android:name="android.permission.ACCESS_FINE_LOCATION" />
</manifest>
```

### Background location

An app requires background location access if a feature within the app constantly shares location with other users or uses the Geofencing API. Several examples include the following:

*   Within a family location sharing app, a feature allows users to continuously share location with family members.
*   Within an IoT app, a feature allows users to configure their home devices such that they turn off when the user leaves their home and turn back on when the user returns home.

The system considers your app to be using background location if it accesses the device's current location in any situation other than the ones described in the foreground location section. The background location precision is the same as the foreground location precision, which depends on the location permissions that your app declares.

On Android 10 (API level 29) and higher, you must declare the `ACCESS_BACKGROUND_LOCATION` permission in your app's manifest in order to request background location access at runtime. On earlier versions of Android, when your app receives foreground location access, it automatically receives background location access as well.

```xml
<manifest ... >
  <!-- Required only when requesting background location access on
       Android 10 (API level 29) and higher. -->
  <uses-permission android:name="android.permission.ACCESS_BACKGROUND_LOCATION" />
</manifest>
```

### Accuracy

Android supports the following levels of location accuracy:

Approximate

Provides a device location estimate. If this location estimate is from the `LocationManagerService` or `FusedLocationProvider`, this estimate is accurate to within about 3 square kilometers (about 1.2 square miles). Your app can receive locations at this level of accuracy when you declare the `ACCESS_COARSE_LOCATION` permission but not the `ACCESS_FINE_LOCATION` permission.

Precise

Provides a device location estimate that is as accurate as possible. If the location estimate is from `LocationManagerService` or `FusedLocationProvider`, this estimate is usually within about 50 meters (160 feet) and is sometimes as accurate as within a few meters (10 feet) or better. Your app can receive locations at this level of accuracy when you declare the `ACCESS_FINE_LOCATION` permission.

If the user grants the approximate location permission, your app only has access to approximate location, regardless of which location permissions your app declares.

Your app should still work when the user grants only approximate location access. If a feature in your app absolutely requires access to precise location using the `ACCESS_FINE_LOCATION` permission, you can ask the user to allow your app to access precise location.

Request location access at runtime
----------------------------------

When a feature in your app needs location access, wait until the user interacts with the feature before making the permission request. This workflow follows the best practice of asking for runtime permissions in context, as described in the guide that explains how to request app permissions.

Figure 1 shows an example of how to perform this process. The app contains a "share location" feature that requires foreground location access. The app doesn't request the location permission, however, until the user selects the **Share location** button.

![After the user selects the Share Location button, the
    system's location permission dialog appears](https://developer.android.com/static/images/training/location/feature-requires-foreground.svg)

**Figure 1.** Location-sharing feature that requires foreground location access. The feature is enabled if the user selects **Allow only while using the app**.

### User can grant only approximate location

On Android 12 (API level 31) or higher, users can request that your app retrieve only approximate location information, even when your app requests the `ACCESS_FINE_LOCATION` runtime permission.

To handle this potential user behavior, don't request the `ACCESS_FINE_LOCATION` permission by itself. Instead, request both the `ACCESS_FINE_LOCATION` permission and the `ACCESS_COARSE_LOCATION` permission in a single runtime request. If you try to request only `ACCESS_FINE_LOCATION`, the system ignores the request on some releases of Android 12. If your app targets Android 12 or higher, the system logs the following error message in Logcat:

ACCESS_FINE_LOCATION must be requested with ACCESS_COARSE_LOCATION.

When your app requests both `ACCESS_FINE_LOCATION` and `ACCESS_COARSE_LOCATION`, the system permissions dialog includes the following options for the user:

*   **Precise**: Allows your app to get precise location information.
*   **Approximate**: Allows your app to get only approximate location information.

Figure 3 shows that the dialog contains a visual cue for both options, to help the user choose. After the user decides on a location accuracy, they tap one of three buttons to select the duration of the permission grant.

On Android 12 and higher, users can navigate to system settings to set the preferred location accuracy for any app, regardless of that app's target SDK version. This is true even when your app is installed on a device running Android 11 or lower, and then the user upgrades the device to Android 12 or higher.

![The dialog refers only to approximate location and
         contains 3 buttons, one above the other](https://developer.android.com/static/images/training/location/approximate-only.svg)

**Figure 2.** System permissions dialog that appears when your app requests `ACCESS_COARSE_LOCATION` only.

![The dialog has 2 sets of options, one above the other](https://developer.android.com/static/images/training/location/approximate-full-prompt.svg)

**Figure 3.** System permissions dialog that appears when your app requests both `ACCESS_FINE_LOCATION` and `ACCESS_COARSE_LOCATION` in a single runtime request.

#### User choice affects permission grants

The following table shows the permissions that the system grants your app, based on the options that the user chooses in the permissions runtime dialog:

Precise

Approximate

**While using the app**

`ACCESS_FINE_LOCATION` and  
`ACCESS_COARSE_LOCATION`

`ACCESS_COARSE_LOCATION`

**Only this time**

`ACCESS_FINE_LOCATION` and  
`ACCESS_COARSE_LOCATION`

`ACCESS_COARSE_LOCATION`

**Deny**

No location permissions

No location permissions

To determine which permissions the system has granted to your app, check the return value of your permissions request. You can use Jetpack libraries in code that's similar to the following, or you can use platform libraries, where you manage the permission request code yourself.

### Kotlin

```kotlin
val locationPermissionRequest = registerForActivityResult(
        ActivityResultContracts.RequestMultiplePermissions()
    ) { permissions ->
        when {
            permissions.getOrDefault(Manifest.permission.ACCESS_FINE_LOCATION, false) -> {
                // Precise location access granted.
            }
            permissions.getOrDefault(Manifest.permission.ACCESS_COARSE_LOCATION, false) -> {
                // Only approximate location access granted.
            } else -> {
                // No location access granted.
            }
        }
    }

// ...

// Before you perform the actual permission request, check whether your app
// already has the permissions, and whether your app needs to show a permission
// rationale dialog. For more details, see Request permissions.
locationPermissionRequest.launch(arrayOf(
    Manifest.permission.ACCESS_FINE_LOCATION,
    Manifest.permission.ACCESS_COARSE_LOCATION))
```

### Java

```java
ActivityResultLauncher<String[]> locationPermissionRequest =
    registerForActivityResult(new ActivityResultContracts
        .RequestMultiplePermissions(), result -> {
            Boolean fineLocationGranted = result.getOrDefault(
                    Manifest.permission.ACCESS_FINE_LOCATION, false);
            Boolean coarseLocationGranted = result.getOrDefault(
                    Manifest.permission.ACCESS_COARSE_LOCATION,false);
            if (fineLocationGranted != null && fineLocationGranted) {
                // Precise location access granted.
            } else if (coarseLocationGranted != null && coarseLocationGranted) {
                // Only approximate location access granted.
            } else {
                // No location access granted.
            }
        }
    );

// ...

// Before you perform the actual permission request, check whether your app
// already has the permissions, and whether your app needs to show a permission
// rationale dialog. For more details, see Request permissions.
locationPermissionRequest.launch(new String[] {
    Manifest.permission.ACCESS_FINE_LOCATION,
    Manifest.permission.ACCESS_COARSE_LOCATION
});
```

#### Request an upgrade to precise location

You can ask the user to upgrade your app's access from approximate location to precise location. Before you ask the user to upgrade your app's access to precise location, however, consider whether your app's use case absolutely requires this level of precision. If your app needs to pair a device with nearby devices over Bluetooth or Wi-Fi, consider using companion device pairing or Bluetooth permissions, instead of requesting the `ACCESS_FINE_LOCATION` permission.

To request that the user upgrade your app's location access from approximate to precise, do the following:

1.  If necessary, explain why your app needs the permission.
2.  Request the `ACCESS_FINE_LOCATION` and `ACCESS_COARSE_LOCATION` permissions together again. Because the user has already allowed the system to grant approximate location to your app, the system dialog is different this time, as shown in figure 4 and figure 5:

![The dialog contains the options 'Change to precise
         location', 'Only this time', and 'Deny'.](https://developer.android.com/static/images/training/location/upgrade-to-precise-while-using-the-app.svg)

**Figure 4.** The user previously selected **Approximate** and **While using the app** (in the dialog from figure 3).

![The dialog contains the options 'Only this time' and
         'Deny'.](https://developer.android.com/static/images/training/location/upgrade-to-precise-only-this-time.svg)

**Figure 5.** The user previously selected **Approximate** and **Only this time** (in the dialog from figure 3).

### Request only foreground location initially

Even if several features in your app require location access, it's likely that only some of them require background location access. Therefore, it's recommended that your app performs _incremental requests_ for location permissions, asking for foreground location access and then background location access. By performing incremental requests, you give users more control and transparency because they can better understand which features in your app need background location access.

Figure 6 shows an example of an app that's designed to handle incremental requests. Both the "show current location" and "recommend nearby places" features require foreground location access. Only the "recommend nearby places" feature, however, requires background location access.

![The button that enables foreground location access is
    positioned half a screen length away from the button that enables background
    location](https://developer.android.com/static/images/training/location/incremental-permission-request.svg)

**Figure 6.** Both features require location access, but only the "recommend nearby features" feature requires background location access.

The process for performing incremental requests is as follows:

1.  At first, your app should guide users to the features that require foreground location access, such as the "share location" feature in Figure 1 or the "show current location" feature in Figure 2.
    
    It's recommended that you disable user access to features that require background location access until your app has foreground location access.
    
2.  At a later time, when the user explores functionality that requires background location access, you can request background location access.
    

Request background location if necessary
----------------------------------------

![](https://developer.android.com/static/images/training/location/request-device-location-background-11.svg)

**Figure 7.** Settings page includes an option called **Allow all the time**, which grants background location access.

### Permission dialog contents depend on target SDK version

When a feature in your app requests background location on a device that runs Android 10 (API level 29), the system permissions dialog includes an option named **Allow all the time**. If the user selects this option, the feature in your app gains background location access.

On Android 11 (API level 30) and higher, however, the system dialog doesn't include the **Allow all the time** option. Instead, users must enable background location on a settings page, as shown in figure 7.

You can help users navigate to this settings page by following best practices when requesting the background location permission. The process for granting the permission depends on your app's target SDK version.

#### App targets Android 11 or higher

If your app hasn't been granted the `ACCESS_BACKGROUND_LOCATION` permission, and `shouldShowRequestPermissionRationale()`) returns `true`, show an educational UI to users that includes the following:

*   A clear explanation of why your app's feature needs access to background location.
*   The user-visible label of the settings option that grants background location (for example, **Allow all the time** in figure 7). You can call `getBackgroundPermissionOptionLabel()`) to get this label. The return value of this method is localized to the user's device language preference.
*   An option for users to decline the permission. If users decline background location access, they should be able to continue using your app.

![Users can tap the system notification to change location
  settings for an app](https://developer.android.com/static/images/training/location/location-access-reminder.svg)

**Figure 8.** Notification reminding the user that they've granted background location access to an app.

#### App targets Android 10 or lower

When a feature in your app requests background location access, users see a system dialog. This dialog includes an option to navigate to your app's location permission options on a settings page.

As long as your app already follows best practices for requesting location permissions, you don't need to make any changes to support this behavior.

### User can affect background location accuracy

If the user requests approximate location, the user's choices in the location permissions dialog also apply to background location. In other words, if the user grants your app the `ACCESS_BACKGROUND_LOCATION` permission but grants only approximate location access in the foreground, your app has only approximate location access in the background as well.

### Reminder of background location grant

On Android 10 and higher, when a feature in your app accesses device location in the background for the first time after the user grants background location access, the system schedules a notification to send to the user. This notification reminds the user that they've allowed your app to access device location all the time. An example notification appears in figure 8.

Check for location requirements in your app's SDK dependencies
--------------------------------------------------------------

Check whether your app uses any SDKs that depend on location permissions, especially the `ACCESS_FINE_LOCATION` permission. Consult this article on Medium about Getting to know the behaviors of your SDK dependencies.
