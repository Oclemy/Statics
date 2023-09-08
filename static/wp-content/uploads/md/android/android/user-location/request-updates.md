# Request location updates

Appropriate use of location information can be beneficial to users of your app. For example, if your app helps the user find their way while walking or driving, or if your app tracks the location of assets, it needs to get the location of the device at regular intervals. As well as the geographical location (latitude and longitude), you may want to give the user further information such as the bearing (horizontal direction of travel), altitude, or velocity of the device. This information, and more, is available in the `Location` object that your app can retrieve from the fused location provider. In response, the API updates your app periodically with the best available location, based on the currently-available location providers such as WiFi and GPS (Global Positioning System). The accuracy of the location is determined by the providers, the location permissions you've requested, and the options you set in the location request.

This lesson shows you how to request regular updates about a device's location using the `requestLocationUpdates()`) method in the fused location provider.

Get the last known location
---------------------------

The last known location of the device provides a handy base from which to start, ensuring that the app has a known location before starting the periodic location updates. The lesson on Getting the Last Known Location shows you how to get the last known location by calling `getLastLocation()`). The snippets in the following sections assume that your app has already retrieved the last known location and stored it as a `Location` object in the global variable `mCurrentLocation`.

Make a location request
-----------------------

Before requesting location updates, your app must connect to location services and make a location request. The lesson on Changing Location Settings shows you how to do this. Once a location request is in place you can start the regular updates by calling `requestLocationUpdates()`).

Depending on the form of the request, the fused location provider either invokes the `LocationCallback.onLocationResult()`) callback method and passes it a list of `Location` objects, or issues a `PendingIntent` that contains the location in its extended data. The accuracy and frequency of the updates are affected by the location permissions you've requested and the options you set in the location request object.

This lesson shows you how to get the update using the `LocationCallback` callback approach. Call `requestLocationUpdates()`), passing it your instance of the `LocationRequest` object, and a `LocationCallback`. Define a `startLocationUpdates()` method as shown in the following code sample:

### Kotlin

```kotlin
override fun onResume() {
    super.onResume()
    if (requestingLocationUpdates) startLocationUpdates()
}

private fun startLocationUpdates() {
    fusedLocationClient.requestLocationUpdates(locationRequest,
            locationCallback,
            Looper.getMainLooper())
}
```

### Java

```java
@Override
protected void onResume() {
    super.onResume();
    if (requestingLocationUpdates) {
        startLocationUpdates();
    }
}

private void startLocationUpdates() {
    fusedLocationClient.requestLocationUpdates(locationRequest,
            locationCallback,
            Looper.getMainLooper());
}
```

Notice that the above code snippet refers to a boolean flag, `requestingLocationUpdates`, used to track whether the user has turned location updates on or off. If users have turned location updates off, you can inform them of your app's location requirement. For more about retaining the value of the boolean flag across instances of the activity, see Save the State of the Activity.

Define the location update callback
-----------------------------------

The fused location provider invokes the `LocationCallback.onLocationResult()`) callback method. The incoming argument contains a list `Location` object containing the location's latitude and longitude. The following snippet shows how to implement the `LocationCallback` interface and define the method, then get the timestamp of the location update and display the latitude, longitude and timestamp on your app's user interface:

### Kotlin

```kotlin
private lateinit var locationCallback: LocationCallback

// ...

override fun onCreate(savedInstanceState: Bundle?) {
    // ...

    locationCallback = object : LocationCallback() {
        override fun onLocationResult(locationResult: LocationResult?) {
            locationResult ?: return
            for (location in locationResult.locations){
                // Update UI with location data
                // ...
            }
        }
    }
}
```

### Java

```java
private LocationCallback locationCallback;

// ...

@Override
protected void onCreate(Bundle savedInstanceState) {
    // ...

    locationCallback = new LocationCallback() {
        @Override
        public void onLocationResult(LocationResult locationResult) {
            if (locationResult == null) {
                return;
            }
            for (Location location : locationResult.getLocations()) {
                // Update UI with location data
                // ...
            }
        }
    };
}
```

Stop location updates
---------------------

Consider whether you want to stop the location updates when the activity is no longer in focus, such as when the user switches to another app or to a different activity in the same app. This can be handy to reduce power consumption, provided the app doesn't need to collect information even when it's running in the background. This section shows how you can stop the updates in the activity's `onPause()` method.

To stop location updates, call `removeLocationUpdates()`), passing it a `LocationCallback`, as shown in the following code sample:

### Kotlin

```kotlin
override fun onPause() {
    super.onPause()
    stopLocationUpdates()
}

private fun stopLocationUpdates() {
    fusedLocationClient.removeLocationUpdates(locationCallback)
}
```

### Java

```java
@Override
protected void onPause() {
    super.onPause();
    stopLocationUpdates();
}

private void stopLocationUpdates() {
    fusedLocationClient.removeLocationUpdates(locationCallback);
}
```

Use a boolean, `requestingLocationUpdates`, to track whether location updates are currently turned on. In the activity's `onResume()` method, check whether location updates are currently active, and activate them if not:

### Kotlin

```kotlin
override fun onResume() {
    super.onResume()
    if (requestingLocationUpdates) startLocationUpdates()
}
```

### Java

```java
@Override
protected void onResume() {
    super.onResume();
    if (requestingLocationUpdates) {
        startLocationUpdates();
    }
}
```

Save the state of the activity
------------------------------

A change to the device's configuration, such as a change in screen orientation or language, can cause the current activity to be destroyed. Your app must therefore store any information it needs to recreate the activity. One way to do this is via an instance state stored in a `Bundle` object.

The following code sample shows how to use the activity's `onSaveInstanceState()`) callback to save the instance state:

### Kotlin

```kotlin
override fun onSaveInstanceState(outState: Bundle?) {
    outState?.putBoolean(REQUESTING_LOCATION_UPDATES_KEY, requestingLocationUpdates)
    super.onSaveInstanceState(outState)
}
```

### Java

```java
@Override
protected void onSaveInstanceState(Bundle outState) {
    outState.putBoolean(REQUESTING_LOCATION_UPDATES_KEY,
            requestingLocationUpdates);
    // ...
    super.onSaveInstanceState(outState);
}
```

Define an `updateValuesFromBundle()` method to restore the saved values from the previous instance of the activity, if they're available. Call the method from the activity's `onCreate()` method, as shown in the following code sample:

### Kotlin

```kotlin
override fun onCreate(savedInstanceState: Bundle?) {
    // ...
    updateValuesFromBundle(savedInstanceState)
}

private fun updateValuesFromBundle(savedInstanceState: Bundle?) {
    savedInstanceState ?: return

    // Update the value of requestingLocationUpdates from the Bundle.
    if (savedInstanceState.keySet().contains(REQUESTING_LOCATION_UPDATES_KEY)) {
        requestingLocationUpdates = savedInstanceState.getBoolean(
                REQUESTING_LOCATION_UPDATES_KEY)
    }

    // ...

    // Update UI to match restored state
    updateUI()
}
```

### Java

```java
@Override
public void onCreate(Bundle savedInstanceState) {
    // ...
    updateValuesFromBundle(savedInstanceState);
}

private void updateValuesFromBundle(Bundle savedInstanceState) {
    if (savedInstanceState == null) {
        return;
    }

    // Update the value of requestingLocationUpdates from the Bundle.
    if (savedInstanceState.keySet().contains(REQUESTING_LOCATION_UPDATES_KEY)) {
        requestingLocationUpdates = savedInstanceState.getBoolean(
                REQUESTING_LOCATION_UPDATES_KEY);
    }

    // ...

    // Update UI to match restored state
    updateUI();
}
```

For more about saving instance state, see the Android Activity class reference.

> **Note:** For a more persistent storage, you can store the user's preferences in your app's `SharedPreferences`. Set the shared preference in your activity's `onPause()` method, and retrieve the preference in `onResume()`. For more information about saving preferences, read Saving Key-Value Sets.

