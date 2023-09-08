# Optimize location for battery

The Background Location Limits introduced in Android 8.0 (API level 26) have brought renewed focus to the subject of how location services usage affects battery drain. This page addresses some location services best practices and what you can do _now_ to make your apps more battery efficient. Applying these best practices benefits your app regardless of the platform version it is running on.

The background location limits in Android 8.0 introduced the following changes:

*   Background location gathering is throttled and location is computed, and delivered only a few times an hour.
*   Wi-Fi scans are more conservative, and location updates aren't computed when the device stays connected to the same static access point.
*   Geofencing responsiveness changes from tens of seconds to approximately two minutes. This change noticeably improves battery performance—up to 10 times better on some devices.

This page assumes you’re using the Google Location Services APIs, which offer higher accuracy and impose a lighter battery burden than the framework location APIs. In particular, this page assumes familiarity with the fused location provider API, which combines signals from GPS, Wi-Fi, and cell networks, as well as accelerometer, gyroscope, magnetometer and other sensors. You should also be familiar with the geofencing API, which is built on top of the fused location provider API, and is optimized for battery performance.

Understand battery drain
------------------------

Location gathering and battery drain are directly related in the following aspects:

*   Accuracy: The precision of the location data. In general, the higher the accuracy, the higher the battery drain.
*   Frequency: How often location is computed. The more frequent location is computed, the more battery is used.
*   Latency: How quickly location data is delivered. Less latency usually requires more battery.

### Accuracy

You can specify location accuracy using the `setPriority()`) method, passing one of the following values as the argument:

*   `PRIORITY_HIGH_ACCURACY` provides the most accurate location possible, which is computed using as many inputs as necessary (it enables GPS, Wi-Fi, and cell, and uses a variety of Sensors), and may cause significant battery drain.
*   `PRIORITY_BALANCED_POWER_ACCURACY` provides accurate location while optimizing for power. Very rarely uses GPS. Typically uses a combination of Wi-Fi and cell information to compute device location.
*   `PRIORITY_LOW_POWER` largely relies on cell towers and avoids GPS and Wi-Fi inputs, providing coarse (city-level) accuracy with minimal battery drain.
*   `PRIORITY_NO_POWER` receives locations passively from other apps for which location has already been computed.

The location needs of most apps can be satisfied using the balanced power or low power options. High accuracy should be reserved for apps that are running in the foreground and require _real time_ location updates (for example, a mapping app).

### Frequency

You can specify location frequency using two methods:

*   Use the `setinterval()`) method to specify the interval at which _location is computed for your app_.
*   Use the `setFastestInterval()`) to specify the interval at which _location computed for other apps is delivered to your app_.

You should pass the largest possible value when using `setInterval()`. This is especially true for background location gathering, which is often a source of unwelcome battery drain. Using intervals of a few seconds should be reserved for foreground use cases. The background location limits introduced in Android 8.0 enforce these strategies, but your app should strive to enforce them on Android 7.0 or lower devices.

### Latency

You can specify latency using the `setMaxWaitTime()`) method, typically passing a value that is several times larger than the interval specified in the `setInterval()`) method. This setting delays location delivery, and multiple location updates may be delivered in batches. These two changes help minimize battery consumption.

If your app doesn’t immediately need a location update, you should pass the largest possible value to the `setMaxWaitTime()` method, effectively trading latency for more data and battery efficiency.

When using geofences, apps should pass a large value into the `setNotificationResponsiveness()`) method to preserve power. A value of five minutes or larger is recommended.

Location use cases
------------------

This section describes some typical location-gathering scenarios, along with recommendations for optimal use of the geofencing and fused location provider APIs.

### User visible or foreground updates

Example: A mapping app that needs frequent, accurate updates with very low latency. All updates happen in the foreground: the user starts an activity, consumes location data, and then stops the activity after a short time.

Use the `setPriority()`) method with a value of `PRIORITY_HIGH_ACCURACY` or `PRIORITY_BALANCED_POWER_ACCURACY`.

The interval specified in the `setInterval()`) method depends on the use case: for real time scenarios, set the value to few seconds; otherwise, limit to a few minutes (approximately two minutes or greater is recommended to minimize battery usage).

### Knowing the location of the device

Example: A weather app wants to know the device’s location.

Use the `getLastLocation()`) method, which returns the most recently available location (which in rare cases may be null) . This method provides a simple way of getting location and doesn't incur costs associated with actively requesting location updates. Use in conjunction with the `isLocationAvailable()`) method, which returns `true` when the location returned by `getLastLocation()`) is reasonably up-to-date.

### Starting updates when a user is at a specific location

Example: Requesting updates when a user is within a certain distance of work, home, or another location.

Use geofencing in conjunction with fused location provider updates. Request updates when the app receives a geofence entrance trigger, and remove updates when the app receives a geofence exit trigger. This ensures that the app gets more granular location updates only when the user has entered a defined area.

The typical workflow for this scenario could involve surfacing a notification upon the geofence enter transition, and launching an activity which contains code to request updates when the user taps the notification.

### Starting updates based on the user’s activity state

Example: Requesting updates only when the user is driving or riding a bike.

Use the Activity Recognition API in conjunction with fused location provider updates. Request updates when the targeted activity is detected, and remove updates when the user stops performing that activity.

The typical workflow for this use case could involve surfacing a notification for the detected activity, and launching an activity which contains code to request updates when the user taps the notification.

### Long running background location updates tied to geographical areas

Example: The user wants to be notified when the device is within proximity of a retailer.

This is an excellent use case for geofencing. Because the use case almost certainly involves background location, use the `addGeofences(GeofencingRequest, PendingIntent)`) method.

You should set the following configuration options:

*   If you're tracking dwell transitions, use the `setLoiteringDelay()`) method passing a value of approximately five minutes or less.
    
*   Use the `setNotificationResponsiveness()`), passing a value of approximately five minutes. However, consider using a value of approximately ten minutes if your app can manage the extra delay in responsiveness.
    

An app may only register a maximum of 100 geofences at a time. In a use case where an app wants to track a large number of retailer options, the app may want to register large geofence (at the city level) and dynamically register smaller geofences (for locations within the city) for stores within the larger geofence. When user enters a large geofence, smaller geofences can be added; when the user exits the larger geofence, the smaller geofences can be removed and geofences could be re-registered for a new area.

### Long running background location updates without a visible app component

Example: An app that passively tracks location

Use the `setPriority()`) method with the `PRIORITY_NO_POWER` option if possible because it incurs almost no battery drain. If using `PRIORITY_NO_POWER` isn't possible, use `PRIORITY_BALANCED_POWER_ACCURACY` or `PRIORITY_LOW_POWER`, but avoid using `PRIORITY_HIGH_ACCURACY` for sustained background work because this option substantially drains battery.

If you need more location data, use passive location by calling the `setFastestInterval()`) method passing a smaller value than what you pass to `setInterval()`). When combined with the `PRIORITY_NO_POWER` option, passive location can opportunistically deliver location computed by other apps at no extra cost.

Moderate frequency by adding some latency, using the `setMaxWaitTime()`) method. For example, if you use the `setinterval()` method with a value of approximately 10 minutes, you should consider calling `setMaxWaitTime()` with a value between 30 to 60 minutes. Using these options, location is computed for your app approximately every 10 minutes, but the app is only woken up every 30 to 60 minutes with some location data available as a batch update. This approach trades latency for more data available and better battery performance.

### Frequent high accuracy updates while the user interacts with other apps

Example: A navigation or fitness app that continues to work when the user either turns off the screen or opens a different app.

Use a foreground service. If expensive work is potentially going to be done by your app on behalf of the user, making the user aware of that work is a recommended best practice. A foreground service requires a persistent notification. For more information, see Notifications Overview.

Location best practices
-----------------------

Implementing the best practices in this section help reduce the battery usage of your app.

### Remove location updates

A common source of unnecessary battery drain is the failure to remove location updates when they are no longer needed. This can happen, for example, when an activity’s `onStart()`) or `onResume()`) lifecycle methods contain a call to `requestlocationUpdates()`) without a corresponding call to `removeLocationUpdates()`) in the `onPause()`) or `onStop()`) lifecycle methods.

You can use lifecycle-aware components to better manage the lifecycle of the activities in your app. For more information, see Handling Lifecycles with Lifecycle-Aware Components.

### Set timeouts

To guard against battery drain, set a reasonable timeout when location updates should stop. The timeout ensures that updates don't continue indefinitely, and it protects the app in scenarios where updates are requested but not removed (for example, because of a bug in the code).

For a fused location provider request, add a timeout by calling `setExpirationDuration()`), which receives a parameter that represents the time in milliseconds since the method was last called. You can also add a timeout by calling `setExpirationTime()`), which receives a parameter that represents the expiration time in milliseconds since the system last boot.

To add a timeout to a geofence location request, call the `setExpirationDuration()`) method.

### Batch requests

For all non-foreground use cases, batch multiple requests together. You can use the `setInterval()`) method to specify the interval at which you would like location to be computed. Then, use the `setMaxWaitTime()`) method to set the interval at which location is _delivered_ to your app. The value passed to the `setMaxWaitTime()` method should be a multiple of the value passed to the `setInterval()` method. For example, consider the following location request:

### Kotlin

```kotlin
val request = LocationRequest()
request.setInterval(10 * 60 * 1000)
request.setMaxWaitTime(60 * 60 * 1000)
```

### Java

```java
LocationRequest request = new LocationRequest();
request.setInterval(10 * 60 * 1000);
request.setMaxWaitTime(60 * 60 * 1000);
```

In this case, location is computed roughly every ten minutes, and approximately six location data points are delivered in a batch approximately every hour. While you still get location updates every ten minutes or so, you conserve battery because your device is woken up only every hour or so.

### Use passive location updates

In background use cases, it is a good idea to throttle location updates. Android 8.0 limits enforce this practice, but apps running on older devices should strive to limit background location as much as possible.

It is likely that while your app is in the background, another app may be frequently requesting location updates in the foreground. Location services makes these updates available to your app. Consider the following location request, which opportunistically consumes location data:

### Kotlin

```kotlin
val request = LocationRequest()
request.setInterval(15 * 60 * 1000)
request.setFastestInterval(2 * 60 * 1000)
```

### Java

```java
LocationRequest request = new LocationRequest();
request.setInterval(15 * 60 * 1000);
request.setFastestInterval(2 * 60 * 1000);
```

In the previous example, location is computed for your app roughly every 15 minutes. If other apps request location, the data is made available to your app at a maximum interval of two minutes.

While consuming location passively incurs no battery drain, take extra care in cases where the receipt of location data triggers expensive CPU or I/O operations. To minimize battery costs, the interval specified in `setFastestInterval()`) shouldn't be too small.

You can significantly improve the battery performance of your users' devices by following the recommendations on this page. Your users are less likely to delete apps that don't drain their battery.