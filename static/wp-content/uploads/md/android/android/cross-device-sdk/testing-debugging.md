# Testing and debugging  |  Cross Device SDK

Preconditions
-------------

The Developer Preview isn’t intended for use in production applications. Hence, it requires using a beta version of Google Play Services. See this guide on how to enroll in the Beta Program.

To run and test multi-device experiences, you must have at least two Android devices (for example, a phone and a tablet). The devices must:

*   Have Google Play Services Beta installed
*   Use the same primary Google Account
*   Have Nearby Share enabled and be visible to nearby devices
*   Be in close proximity of each other

Deploy your apps
----------------

### Deploy through Android Studio

When deploying through Android Studio, complete the following steps:

1.  Open the Android Studio project for your app.
2.  Go to **Run > Edit Configurations**. The **Run/Debug Configuration** window appears.
3.  Under **Launch Options**, set **Launch** to your app main or multi-device activity.
4.  Click **Apply**, and then **OK**.
5.  Click **Run** to install the app on your test device.

### Deploy using the command line

When deploying using the command line, repeat the steps for all devices used in testing the multi-device experience. This section assumes that the name of your app module is `crossdevice-app`.

```shell
    ./gradlew crossdevice-app:installDebug
    # Start the app's activity. This example uses the sample app.
    adb shell am start -n 
      com.example.dtdi/com.example.crossdevice.MainActivity
```

Tips for Debugging
------------------

To debug the app, click the **Debug** button in Android Studio.

Given the asynchronous and distributed nature of multi-device experiences, it might be difficult to rely only on debugging. We encourage you to take advantage of logging and analytics. The Cross device SDK is designed to provide callbacks for both successful and failed operations, so it’s important to handle those callbacks and log outputs for easier debugging.

If your transfer failed and you can't initiate device discovery or a new session, you can try turning Airplane Mode ON and OFF to quickly reset the nearby share state.

Your feedback is a crucial part of the Cross device SDK Developer Preview! Let us know of any issues you find or ideas for improving the Cross device SDK on Android.