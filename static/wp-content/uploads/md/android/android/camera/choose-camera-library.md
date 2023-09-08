# Choose a camera library

If you want to add camera functionality to an Android app, you have three main options:

*   CameraX
*   Camera2
*   Camera (deprecated)

For most developers, we recommend CameraX. CameraX is a Jetpack library that supports the vast majority of Android devices (Android 5.0 and higher) and provides a consistent, high-level API designed around common use cases. CameraX resolves device compatibility issues for you so that you don't have to add device-specific code to your app.

CameraX is built on top of the Camera2 package. If you need low-level camera control to support complex use cases, Camera2 is a good option, but the API is more complex than CameraX and requires you to manage device-specific configurations. Like CameraX, Camera2 works on Android 5.0 (API level 21) and higher.

The original Android Camera class is deprecated. New apps should use CameraX (recommended) or Camera2, and existing apps should migrate to take advantage of new features and avoid losing compatibility with future devices.