# CameraX overview

CameraX is a Jetpack library, built to help make camera app development easier. For new apps, we recommend starting with CameraX. It provides a consistent, easy-to-use API that works across the vast majority of Android devices, with backward-compatibility to Android 5.0 (API level 21).

Primary benefits
----------------

CameraX improves the developer experience in several key ways.

### Broad device compatibility

CameraX supports devices running Android 5.0 (API level 21) and higher, representing over 98% of existing Android devices.

### Ease of use

CameraX emphasizes use cases, which allow you to focus on the task you need to get done instead of managing device-specific nuances. Most common camera use cases are supported:

*   Preview: View an image on the display.
*   Image analysis: Access a buffer seamlessly for use in your algorithms, such as to pass to ML Kit.
*   Image capture: Save images.
*   Video capture: Save video and audio.

### Consistency across devices

![](https://developer.android.com/static/images/training/camera/camerax/testing-lab.png)

**Figure 2.** Automated CameraX test lab ensures a consistent API experience across many device types and manufacturers.

Maintaining consistent camera behavior is hard. You have to consider aspect ratio, orientation, rotation, preview size, and image size. With CameraX, these basic behaviors just work.

We maintain an automated CameraX test lab that tests a variety of camera behaviors across a range of devices and all operating system versions since Android 5.0. These tests run on an ongoing basis to identify and fix a wide range of issues.

### Camera extensions

![](https://developer.android.com/static/images/training/camera/camerax/portrait-mode.png)

**Figure 3.** An image captured with the bokeh (portrait) effect using CameraX.

CameraX has an optional Extensions API that allows you to access the same features and capabilities as a device's native camera app with as few as two lines of code.

Extensions include bokeh (portrait), high dynamic range (HDR), night mode, and face retouching, all of which require device support.

