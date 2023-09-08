# Change location settings

If your app needs to request location or receive permission updates, the device needs to enable the appropriate system settings, such as GPS or Wi-Fi scanning. Rather than directly enabling services such as the device's GPS, your app specifies the required level of accuracy/power consumption and desired update interval, and the device automatically makes the appropriate changes to system settings. These settings are defined by the `LocationRequest` data object.

This lesson shows you how to use the Settings Client to check which settings are enabled, and present the Location Settings dialog for the user to update their settings with a single tap.

Configure location services
---------------------------

In order to use the location services provided by Google Play Services and the fused location provider, connect your app using the Settings Client, then check the current location settings and prompt the user to enable the required settings if needed.

Apps whose features use location services must request location permissions, depending on the use cases of those features.

Set up a location request
-------------------------

To store parameters for requests to the fused location provider, create a `LocationRequest`. The parameters determine the level of accuracy for location requests. For details of all available location request options, see the `LocationRequest` class reference. This lesson sets the update interval, fastest update interval, and priority, as described below:

Update interval

`setInterval()`) - This method sets the rate in milliseconds at which your app prefers to receive location updates. Note that the location updates may be somewhat faster or slower than this rate to optimize for battery usage, or there may be no updates at all (if the device has no connectivity, for example).

Fastest update interval

`setFastestInterval()`) - This method sets the **fastest** rate in milliseconds at which your app can handle location updates. Unless your app benefits from receiving updates more quickly than the rate specified in `setInterval()`, you don't need to call this method.

Priority

`setPriority()`) - This method sets the priority of the request, which gives the Google Play services location services a strong hint about which location sources to use. The following values are supported:

*   `PRIORITY_BALANCED_POWER_ACCURACY` - Use this setting to request location precision to within a city block, which is an accuracy of approximately 100 meters. This is considered a coarse level of accuracy, and is likely to consume less power. With this setting, the location services are likely to use WiFi and cell tower positioning. Note, however, that the choice of location provider depends on many other factors, such as which sources are available.
*   `PRIORITY_HIGH_ACCURACY` - Use this setting to request the most precise location possible. With this setting, the location services are more likely to use GPS to determine the location.
*   `PRIORITY_LOW_POWER` - Use this setting to request city-level precision, which is an accuracy of approximately 10 kilometers. This is considered a coarse level of accuracy, and is likely to consume less power.
*   `PRIORITY_NO_POWER` - Use this setting if you need negligible impact on power consumption, but want to receive location updates when available. With this setting, your app does not trigger any location updates, but receives locations triggered by other apps.

Create the location request and set the parameters as shown in this code sample:

### Kotlin

```kotlin
fun createLocationRequest() {
    val locationRequest = LocationRequest.create()?.apply {
        interval = 10000
        fastestInterval = 5000
        priority = LocationRequest.PRIORITY_HIGH_ACCURACY
    }
}
```

### Java

```java
protected void createLocationRequest() {
    LocationRequest locationRequest = LocationRequest.create();
    locationRequest.setInterval(10000);
    locationRequest.setFastestInterval(5000);
    locationRequest.setPriority(LocationRequest.PRIORITY_HIGH_ACCURACY);
}
```

The priority of `PRIORITY_HIGH_ACCURACY`, combined with the `ACCESS_FINE_LOCATION` permission setting that you've defined in the app manifest, and a fast update interval of 5000 milliseconds (5 seconds), causes the fused location provider to return location updates that are accurate to within a few feet. This approach is appropriate for mapping apps that display the location in real time.

> **Performance hint:** If your app accesses the network or does other long-running work after receiving a location update, adjust the fastest interval to a slower value. This adjustment prevents your app from receiving updates it can't use. Once the long-running work is done, set the fastest interval back to a fast value.

Get current location settings
-----------------------------

Once you have connected to Google Play services and the location services API, you can get the current location settings of a user's device. To do this, create a `LocationSettingsRequest.Builder`, and add one or more location requests. The following code snippet shows how to add the location request that was created in the previous step:

### Kotlin

```kotlin
val builder = LocationSettingsRequest.Builder()
        .addLocationRequest(locationRequest)
```

### Java

```java
LocationSettingsRequest.Builder builder = new LocationSettingsRequest.Builder()
     .addLocationRequest(locationRequest);
```

Next check whether the current location settings are satisfied:

### Kotlin

```kotlin
val builder = LocationSettingsRequest.Builder()

// ...

val client: SettingsClient = LocationServices.getSettingsClient(this)
val task: Task<LocationSettingsResponse> = client.checkLocationSettings(builder.build())
```

### Java

```java
LocationSettingsRequest.Builder builder = new LocationSettingsRequest.Builder();

// ...

SettingsClient client = LocationServices.getSettingsClient(this);
Task<LocationSettingsResponse> task = client.checkLocationSettings(builder.build());
```

When the `Task` completes, your app can check the location settings by looking at the status code from the `LocationSettingsResponse` object. To get even more details about the current state of the relevant location settings, your app can call the `LocationSettingsResponse` object's `getLocationSettingsStates()` method.

Prompt the user to change location settings
-------------------------------------------

To determine whether the location settings are appropriate for the location request, add an `OnFailureListener` to the `Task` object that validates the location settings. Then, check if the `Exception` object passed to the `onFailure()`) method is an instance of the `ResolvableApiException` class, which indicates that the settings must be changed. Then, display a dialog that prompts the user for permission to modify the location settings by calling `startResolutionForResult()`).

The following code snippet shows how to determine whether the user's location settings allow location services to create a `LocationRequest`, as well as how to ask the user for permission to change the location settings if necessary:

### Kotlin

```kotlin
task.addOnSuccessListener { locationSettingsResponse ->
    // All location settings are satisfied. The client can initialize
    // location requests here.
    // ...
}

task.addOnFailureListener { exception ->
    if (exception is ResolvableApiException){
        // Location settings are not satisfied, but this can be fixed
        // by showing the user a dialog.
        try {
            // Show the dialog by calling startResolutionForResult(),
            // and check the result in onActivityResult().
            exception.startResolutionForResult(this@MainActivity,
                    REQUEST_CHECK_SETTINGS)
        } catch (sendEx: IntentSender.SendIntentException) {
            // Ignore the error.
        }
    }
}
```

### Java

```java
task.addOnSuccessListener(this, new OnSuccessListener<LocationSettingsResponse>() {
    @Override
    public void onSuccess(LocationSettingsResponse locationSettingsResponse) {
        // All location settings are satisfied. The client can initialize
        // location requests here.
        // ...
    }
});

task.addOnFailureListener(this, new OnFailureListener() {
    @Override
    public void onFailure(@NonNull Exception e) {
        if (e instanceof ResolvableApiException) {
            // Location settings are not satisfied, but this can be fixed
            // by showing the user a dialog.
            try {
                // Show the dialog by calling startResolutionForResult(),
                // and check the result in onActivityResult().
                ResolvableApiException resolvable = (ResolvableApiException) e;
                resolvable.startResolutionForResult(MainActivity.this,
                        REQUEST_CHECK_SETTINGS);
            } catch (IntentSender.SendIntentException sendEx) {
                // Ignore the error.
            }
        }
    }
});
```

The next lesson, Receiving Location Updates, shows you how to receive periodic location updates.