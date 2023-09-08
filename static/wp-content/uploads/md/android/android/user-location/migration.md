# Migrate to location and context APIs

Google recommends using the location and context APIs in Google Play services in apps that require location services. If your app uses the framework location APIs it’s important to migrate to Google Play services to take advantage of the latest Google-powered features.

Using Google Play services is the preferred option to get location services in your app for the following reasons:

1.  Google Play services provide a simple interface and a cleaner API surface.
2.  You specify a desired quality of service and the APIs manage the underlying technologies for you.
3.  The Google Play services APIs are optimized for performance and battery usage.
4.  The Google Play services APIs are actively maintained. Google is constantly improving the algorithms and adding more features.

Update your app
---------------

The following steps describe the process to update an app to use the location and context APIs:

1.  Set up Google Play Services in your project.
2.  Update the app to use the location settings API to validate the current location settings.
3.  Replace custom logic used for complex tasks, such as trying to identify if a user is close to an area or trying to guess what the user is doing, with high-level APIs, such as the Geofencing API or the Activity Recognition API.
4.  Replace usage of the framework location API with the fused location provider API.
5.  Remove references to the framework location API.

### Set up Google Play services in your project

To make the location and context APIs available to your project you must add a reference to the Google maven repository and declare a dependency to the required APIs. For more information, see Set Up Google Play Services.

### Use the location settings API

By using the location settings API, apps provide the desired QoS level and the API requests the user for the appropriate changes to the system settings. Take the following steps to use the location settings API in your app:

1.  Request location permissions in the app manifest.
2.  Set up a `LocationRequest` object, which specifies the desired QoS level.
3.  Use the location settings API to check the current settings.

For more information, see Changing Location Settings or see the Google Play Location samples for example code.

### Replace custom logic with high-level APIs

High-level APIs, such as the geofencing API and the activity recognition API, provide features that your app can use to provide great experiences. However, such features require complex logic that can be difficult to code and maintain. If your app has such custom logic you should replace it with components that take advantage of the high-level APIs.

For implementation details, see the guides for the specific location and context API.

### Replace the framework location API with the fused location provider API

You can use the fused location provider API to get location data, such as latitude and longitude. The fused location provider API uses a `Location` object—just like the location framework API—to represent geographic location. The API provides features to listen for location updates as well as to get the last known location. All these features make the fused location provider API a good candidate to replace the components that use the framework location API with minimal changes to the rest of the app.

Getting the last known location is a good starting point for many experiences because it’s a fast operation that uses location data requested by any client on the device. To periodically track location, your app can subscribe to receive location updates, which provides up-to-date data and enables more complex experiences.

### Remove references to the framework location API

Replace references to classes in the `com.google.android.location` package with classes from the `com.google.android.gms.location` package, except references to the `Location` class, which the fused location provider API uses. You can usually remove the components that manage the different providers, such as GPS and Wi-Fi, from your app. The location and context APIs automatically manage these providers.

Test your app
-------------

To run an app that uses the latest version of Google Play services, you need a device that has the Play Store app installed and a Google account must be signed in. For development purposes you can use the following options:

*   A physical device connected to your development environment using a USB cable.
*   An emulator with the Play Store app installed.

For more information about connecting a physical device to your development environment, see Run Apps on a Hardware Device. To create an emulator that includes the Play Store app, see Create and Manage Virtual Devices.