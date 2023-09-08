# Camera preview

> **Note:** This page refers to the Camera2 package. Unless your app requires specific, low-level features from Camera2, we recommend using CameraX. Both CameraX and Camera2 support Android 5.0 (API level 21) and higher.

Cameras and camera previews aren’t always in the same orientation on Android devices.

A camera is in a fixed position on a device, regardless of whether the device is a phone, tablet, or computer. When the device orientation changes, the camera orientation changes.

As a result, camera apps generally assume a fixed relationship between the orientation of the device and the aspect ratio of the camera preview. When a phone is in portrait orientation, the camera preview is assumed to be taller than it is wide. When the phone (and camera) are rotated to landscape, the camera preview is expected to be wider than it is tall.

But these assumptions are challenged by new form factors, such as foldable devices, and display modes such as multi-window and multi-display ). Foldable devices change display size and aspect ratio without changing orientation. Multi-window mode constrains camera apps to a portion of the screen, scaling the camera preview regardless of device orientation. Multi-display mode enables the use of secondary displays which might not be in the same orientation as the primary display. This requires different camera previews on different screens.

Camera orientation
------------------

The Android Compatibility Definition specifies that a camera image sensor “MUST be oriented so that the long dimension of the camera aligns with the screen’s long dimension.”

This arrangement maximizes the display area for the camera viewfinder in a camera app. Also, image sensors typically output their data in landscape aspect ratios–4:3 being the most common.

![Phone and camera sensor both in portrait orientation.](https://developer.android.com/static/images/training/camera/camera2/camera-preview/camera_preview_portrait_front_facing.png)

**Figure 1.** Typical relationship of phone and camera sensor orientation.

The camera sensor’s natural orientation is landscape. In figure 1, the sensor of the front-facing camera (the camera pointing in the same direction as the display) is rotated 270 degrees relative to the phone to comply with the Android Compatibility Definition.

To expose the sensor rotation to apps, the camera2 API includes a `SENSOR_ORIENTATION` constant. For most phones and tablets, the device reports a sensor orientation of 270 degrees for front-facing cameras and 90 degrees (point of view from the back of the device) for back-facing cameras, which aligns the long edge of the sensor with the long edge of the device. Laptop cameras generally report a sensor orientation of 0 or 180 degrees.

Because camera image sensors output their data (an image buffer) in the sensor’s natural orientation (landscape), the image buffer must be rotated the number of degrees specified by `SENSOR_ORIENTATION` for the camera preview to appear upright in the device’s natural orientation. For front-facing cameras, the rotation is counterclockwise; for back-facing cameras, clockwise.

For example, for the front-facing camera in figure 1, the image buffer produced by the camera sensor looks like this:

![Camera sensor rotated to landscape orientation with image
            sideways, top left.](https://developer.android.com/static/images/training/camera/camera2/camera-preview/camera_sensor_portrait_rotated_90.png)

The image must be rotated 270 degrees counterclockwise so that the preview’s orientation matches the device orientation:

![Camera sensor in portrait orientation with image upright.](https://developer.android.com/static/images/training/camera/camera2/camera-preview/camera_sensor_portrait_without_coordinates.png)

A back-facing camera would produce an image buffer with the same orientation as the buffer above, but `SENSOR_ORIENTATION` is 90 degrees. As a result, the buffer is rotated 90 degrees clockwise.

Device rotation
---------------

Device rotation is the number of degrees a device is rotated from its natural orientation. For example, a phone in landscape orientation has a device rotation of 90 or 270 degrees, depending on the direction of rotation.

A camera sensor image buffer must be rotated the same number of degrees as the device rotation (in addition to the degrees of sensor orientation) for the camera preview to appear upright.

Orientation calculation
-----------------------

Proper orientation of the camera preview takes into consideration sensor orientation and device rotation.

The overall rotation of the sensor image buffer can be computed using the following formula:

```
    rotation = (sensorOrientationDegrees - deviceOrientationDegrees * sign + 360) % 360
``` 

where `sign` is `1` for front-facing cameras, `-1` for back-facing cameras.

For front-facing cameras, the image buffer is rotated counterclockwise (from the natural orientation of the sensor). For back-facing cameras, the sensor image buffer is rotated clockwise.

The expression `deviceOrientationDegrees * sign + 360` converts device rotation from counterclockwise to clockwise for back-facing cameras (for example, converting 270 degrees counterclockwise to 90 degrees clockwise). The modulo operation scales the result to less than 360 degrees (for example, scaling 540 degrees of rotation to 180).

Different APIs report device rotation differently:

*   `Display#getRotation()`) provides the counterclockwise rotation of the device (from the user’s point of view). This value plugs into the formula above as is.
*   `OrientationEventListener#onOrientationChanged()`) returns the clockwise rotation of the device (from the user’s point of view). Negate the value for use in the formula above.

### Front-facing cameras

![Camera preview and sensor both in landscape orientation, sensor
            is right side up.](https://developer.android.com/static/images/training/camera/camera2/camera-preview/camera_preview_landscape_counterclockwise_front_facing.png)

**Figure 2.** Camera preview and sensor with phone turned 90 degrees to landscape orientation.

Here’s the image buffer produced by the camera sensor in figure 2:

![Camera sensor in landscape orientation with image upright.](https://developer.android.com/static/images/training/camera/camera2/camera-preview/camera_sensor_landscape.png)

The buffer has to be rotated 270 degrees counterclockwise to adjust for sensor orientation (see Camera orientation above):

![Camera sensor rotated to portait orientation with image sideways,
            top right.](https://developer.android.com/static/images/training/camera/camera2/camera-preview/camera_sensor_landscape_rotated_270.png)

Then the buffer is rotated an additional 90 degrees counterclockwise to account for device rotation, resulting in the correct orientation of the camera preview in figure 2:

Here’s the camera turned to the right to landscape orientation:

![Camera preview and sensor both in landscape orientation, but
            sensor is upside down.](https://developer.android.com/static/images/training/camera/camera2/camera-preview/camera_preview_landscape_clockwise_front_facing.png)

**Figure 3.** Camera preview and sensor with phone turned 270 degrees (or -90 degrees) to landscape orientation.

Here’s the image buffer:

The buffer must be rotated 270 degrees counterclockwise to adjust for sensor orientation:

Then the buffer is rotated another 270 degrees counterclockwise to account for the device rotation:

### Back-facing cameras

Back-facing cameras typically have a sensor orientation of 90 degrees (as viewed from the back of the device). When orienting the camera preview, the sensor image buffer is rotated clockwise by the amount of sensor rotation (rather than counterclockwise like front-facing cameras), and then the image buffer is rotated counterclockwise by the amount of device rotation.

![Camera preview and sensor both in landscape orientation, but
            sensor is upside down.](https://developer.android.com/static/images/training/camera/camera2/camera-preview/camera_preview_landscape_clockwise_back_facing.png)

**Figure 4.** Phone with back-facing camera in landscape orientation (turned 270 or -90 degrees).

Here’s the image buffer from the camera sensor in figure 4:

![Camera sensor rotated to landscape orientation with image upside
            down.](https://developer.android.com/static/images/training/camera/camera2/camera-preview/camera_sensor_landscape_clockwise.png)

The buffer must be rotated 90 degrees clockwise to adjust for sensor orientation:

![Camera sensor rated to portrait orientation with image sideways,
            top left.](https://developer.android.com/static/images/training/camera/camera2/camera-preview/camera_sensor_landscape_clockwise_rotated_270.png)

Then the buffer is rotated 270 degrees counterclockwise to account for device rotation:

![Camera sensor rotated to landscape orientation with image
            upright.](https://developer.android.com/static/images/training/camera/camera2/camera-preview/camera_sensor_landscape_without_coordinates.png)

Aspect ratio
------------

Display aspect ratio changes when the device orientation changes but also when foldables fold and unfold, when windows are resized in multi-window environments, and when apps open on secondary displays.

The camera sensor image buffer must be oriented and scaled to match the orientation and aspect ratio of the viewfinder UI element as the UI dynamically changes orientation—with or without the device changing orientation.

On new form factors or in multi-window or multi-display environments, if your app assumes that the camera preview has the same orientation as the device (portrait or landscape) your preview might be oriented incorrectly, scaled incorrectly, or both.

![Unfolded foldable device with portrait camera preview turned
            sideways.](https://developer.android.com/static/images/training/camera/camera2/camera-preview/foldable_with_rotation_problem.png)

**Figure 5.** Foldable device transitions from portrait to landscape aspect ratio but camera sensor remains in portrait orientation.

In figure 5, the application mistakenly assumed the device was rotated 90 degrees counterclockwise; and so, the app rotated the preview the same amount.

![Unfolded foldable device with camera preview upright but squashed
            because of incorrect scaling.](https://developer.android.com/static/images/training/camera/camera2/camera-preview/foldable_with_scaling_problem.png)

**Figure 6.** Foldable device transitions from portrait to landscape aspect ratio but camera sensor remains in portrait orientation.

In figure 6, the app didn’t adjust the aspect ratio of the image buffer to enable it to properly scale to fit the new dimensions of the camera preview UI element.

Fixed-orientation camera apps typically experience problems on foldables and other large screen devices such as laptops:

![Camera preview on laptop is upright but app UI is sideways.](https://developer.android.com/static/images/training/camera/camera2/camera-preview/laptop_camera_preview_fixed-orientation_app.png)

**Figure 7.** Fixed-orientation portrait app on laptop computer.

In figure 7, the UI of the camera app is sideways because the app’s orientation is restricted to portrait only. The viewfinder image is oriented correctly relative to the camera sensor.

Inset portrait mode
-------------------

Camera apps that do not support multi-window mode (`resizeableActivity="false"`) and restrict their orientation (`screenOrientation="portrait"` or `screenOrientation="landscape"`) can be placed in inset portrait mode on large screen devices to properly orient the camera preview.

Inset portrait mode letterboxes (insets) portrait‑only apps in portrait orientation even though the display aspect ratio is landscape. Landscape‑only apps are letterboxed in landscape orientation even though the display aspect ratio is portrait. The camera image is rotated to align with the app UI, cropped to match the aspect ratio of the camera preview, and then scaled to fill the preview.

Inset portrait mode is triggered when the aspect ratio of the camera image sensor and the aspect ratio of the application's primary activity do not match.

![Camera preview and app UI in proper portrait orientation on laptop.
            Wide preview image is scaled and cropped to fit portrait
            orientation.](https://developer.android.com/static/images/training/camera/camera2/camera-preview/laptop_inset_portrait_mode.png)

**Figure 8.** Fixed-orientation portrait app in inset portrait mode on laptop.

In figure 8, the portrait-only camera app has been rotated to display the UI upright on the laptop display. The app is letterboxed because of the difference in aspect ratio between the portrait app and the landscape display. The camera preview image has been rotated to compensate for the app's UI rotation (due to inset portrait mode), and the image has been cropped and scaled to fit the portrait orientation, reducing the field of view.

### Rotate, crop, scale

Inset portrait mode is invoked for a portrait-only camera app on a display that has a landscape aspect ratio:

![Camera preview on laptop is upright but app UI is sideways.](https://developer.android.com/static/images/training/camera/camera2/camera-preview/laptop_inset_portrait_mode_fixed-orientation_app.png)

**Figure 9.** Fixed-orientation portrait app on laptop.

The app is letterboxed in portrait orientation:

![App rotated to portrait orientation and letterboxed. Image is
            sideways, top to the right.](https://developer.android.com/static/images/training/camera/camera2/camera-preview/laptop_inset_portrait_mode_rotate_ui.png)

The camera image is rotated 90 degrees to adjust for the reorientation of the app:

![Sensor image rotated 90 degrees to make it upright.](https://developer.android.com/static/images/training/camera/camera2/camera-preview/laptop_inset_portrait_mode_rotate_sensor_image.png)

The image is cropped to the aspect ratio of the camera preview, then scaled to fill the preview (field of view is reduced):

![Cropped camera image scaled to fill camera preview.](https://developer.android.com/static/images/training/camera/camera2/camera-preview/laptop_inset_portrait_mode_crop_and_scale.png)

On foldable devices, the orientation of the camera sensor can be portrait while the aspect ratio of the display is landscape:

![Camera preview and app UI turned sideways of wide, unfolded display.](https://developer.android.com/static/images/training/camera/camera2/camera-preview/unfolded_phone_camera_preview_fixed-orientation_app.png)

**Figure 10.** Unfolded device with portrait-only camera app and different aspect ratios of camera sensor and display.

Because the camera preview is rotated to adjust for the sensor orientation, the image is properly oriented in the viewfinder, but the portrait-only app is sideways.

Inset portrait mode only needs to letterbox the app in portrait orientation to properly orient the app and camera preview:

![Letterboxed app in portait orientation with camera preview
            upright on foldable device.](https://developer.android.com/static/images/training/camera/camera2/camera-preview/unfolded_phone_inset_portrait_mode.png)

### API

As of Android 12 (API level 31) apps can also explicitly control inset portrait mode by means of the `SCALER_ROTATE_AND_CROP` property of the `CameraRequest` class.

The default value is `SCALER_ROTATE_AND_CROP_AUTO`, which enables the system to invoke inset portrait mode. `SCALER_ROTATE_AND_CROP_90` is the behavior of inset portrait mode as described above.

Not all devices support all `SCALER_ROTATE_AND_CROP` values. To obtain a list of supported values, reference `CameraCharacteristics#SCALER_AVAILABLE_ROTATE_AND_CROP_MODES`.

CameraX
-------

The Jetpack CameraX library makes creating a camera viewfinder that accommodates sensor orientation and device rotation a simple task.

The `PreviewView` layout element creates a camera preview, automatically adjusting for sensor orientation, device rotation, and scaling. `PreviewView` maintains the aspect ratio of the camera image by applying the `FILL_CENTER` scale type, which centers the image but might crop it to match the dimensions of the `PreviewView`. To letterbox the camera image, set the scale type to `FIT_CENTER`.

To learn the basics of creating a camera preview with `PreviewView`, see Implement a preview.

For a complete sample implementation, see the `CameraXBasic` repository on GitHub.

CameraViewfinder
----------------

Similar to the Preview use case, the CameraViewfinder library provides a set of tools to simplify the creation of a camera preview. It does not depend on CameraX Core, so you can seamlessly integrate it into your existing Camera2 codebase.

Instead of using the `Surface` directly, you can use the `CameraViewfinder` widget to display the camera feed for Camera2.

`CameraViewfinder` internally uses either a `TextureView` or `SurfaceView` to display the camera feed, and applies the required transformations on them to correctly display the viewfinder. This involves correcting their aspect ratio, scale, and rotation.

To request the surface from the `CameraViewfinder` object, you need to create a `ViewfinderSurfaceRequest`.

This request contains requirements for the surface resolution and camera device information from `CameraCharacteristics`.

Calling `requestSurfaceAsync()`) sends the request to the surface provider, which is either a `TextureView` or `SurfaceView` and gets a `ListenableFuture` of `Surface`.

Calling `markSurfaceSafeToRelease()`) notifies the surface provider that the surface is not needed and related resources can be released.

### Kotlin

```kotlin
fun startCamera(){
    val previewResolution = Size(width, height)
    val viewfinderSurfaceRequest =
        ViewfinderSurfaceRequest(previewResolution, characteristics)
    val surfaceListenableFuture =
        cameraViewfinder.requestSurfaceAsync(viewfinderSurfaceRequest)

    Futures.addCallback(surfaceListenableFuture, object : FutureCallback {
        override fun onSuccess(surface: Surface) {
            /* create a CaptureSession using this surface as usual */
        }
        override fun onFailure(t: Throwable) { /* something went wrong */}
    }, ContextCompat.getMainExecutor(context))
}
```

### Java

```java
    void startCamera(){
        Size previewResolution = new Size(width, height);
        ViewfinderSurfaceRequest viewfinderSurfaceRequest =
                new ViewfinderSurfaceRequest(previewResolution, characteristics);
        ListenableFuture surfaceListenableFuture =
                cameraViewfinder.requestSurfaceAsync(viewfinderSurfaceRequest);

        Futures.addCallback(surfaceListenableFuture, new FutureCallback() {
            @Override
            public void onSuccess(Surface result) {
                /* create a CaptureSession using this surface as usual */
            }
            @Override public void onFailure(Throwable t) { /* something went wrong */}
        },  ContextCompat.getMainExecutor(context));
    }
```

SurfaceView
-----------

`SurfaceView` is a straightforward approach to creating a camera preview if the preview doesn’t require processing and isn’t animated.

`SurfaceView` automatically rotates the camera sensor image buffer to match the display orientation, accounting for both sensor orientation and device rotation. However, the image buffer is scaled to fit the `SurfaceView` dimensions without any consideration of aspect ratio.

You must ensure that the aspect ratio of the image buffer matches the aspect ratio of the `SurfaceView`, which you can accomplish by scaling the contents of the `SurfaceView` in the component’s `onMeasure()`) method:

(The `computeRelativeRotation()` source code is in Relative rotation below.)

### Kotlin

```kotlin
override fun onMeasure(widthMeasureSpec: Int, heightMeasureSpec: Int) {
    val width = MeasureSpec.getSize(widthMeasureSpec)
    val height = MeasureSpec.getSize(heightMeasureSpec)

    val relativeRotation = computeRelativeRotation(characteristics, surfaceRotationDegrees)

    if (previewWidth > 0f && previewHeight > 0f) {
        /* Scale factor required to scale the preview to its original size on the x-axis. */
        val scaleX =
            if (relativeRotation % 180 == 0) {
                width.toFloat() / previewWidth
            } else {
                width.toFloat() / previewHeight
            }
        /* Scale factor required to scale the preview to its original size on the y-axis. */
        val scaleY =
            if (relativeRotation % 180 == 0) {
                height.toFloat() / previewHeight
            } else {
                height.toFloat() / previewWidth
            }

        /* Scale factor required to fit the preview to the SurfaceView size. */
        val finalScale = min(scaleX, scaleY)

        setScaleX(1 / scaleX * finalScale)
        setScaleY(1 / scaleY * finalScale)
    }
    setMeasuredDimension(width, height)
}
```

### Java

```java
@Override
void onMeasure(int widthMeasureSpec, int heightMeasureSpec) {
    int width = MeasureSpec.getSize(widthMeasureSpec);
    int height = MeasureSpec.getSize(heightMeasureSpec);

    int relativeRotation = computeRelativeRotation(characteristics, surfaceRotationDegrees);

    if (previewWidth > 0f && previewHeight > 0f) {

        /* Scale factor required to scale the preview to its original size on the x-axis. */
        float scaleX = (relativeRotation % 180 == 0)
                       ? (float) width / previewWidth
                       : (float) width / previewHeight;

        /* Scale factor required to scale the preview to its original size on the y-axis. */
        float scaleY = (relativeRotation % 180 == 0)
                       ? (float) height / previewHeight
                       : (float) height / previewWidth;

        /* Scale factor required to fit the preview to the SurfaceView size. */
        float finalScale = Math.min(scaleX, scaleY);

        setScaleX(1 / scaleX * finalScale);
        setScaleY(1 / scaleY * finalScale);
    }
    setMeasuredDimension(width, height);
}
```

For more details on implementing `SurfaceView` as a camera preview, see Camera orientations.

TextureView
-----------

`TextureView` is less performant than `SurfaceView`—and more work—but `TextureView` gives you maximum control of the camera preview.

`TextureView` rotates the sensor image buffer based on sensor orientation but does not handle device rotation or preview scaling.

Scaling and rotation can be encoded in a Matrix transformation. To learn how to correctly scale and rotate a `TextureView`, see Support resizable surfaces in your camera app

Relative rotation
-----------------

The camera sensor’s relative rotation is the amount of rotation required to align the camera sensor output with the device orientation.

Relative rotation is used by components such as `SurfaceView` and `TextureView` to determine x and y scaling factors for the preview image. It is also used to specify the rotation of the sensor image buffer.

The `CameraCharacteristics` and `Surface` classes enable calculation of the camera sensor’s relative rotation:

### Kotlin

```kotlin
/**
 * Computes rotation required to transform the camera sensor output orientation to the
 * device's current orientation in degrees.
 *
 * @param characteristics The CameraCharacteristics to query for the sensor orientation.
 * @param surfaceRotationDegrees The current device orientation as a Surface constant.
 * @return Relative rotation of the camera sensor output.
 */
public fun computeRelativeRotation(
    characteristics: CameraCharacteristics,
    surfaceRotationDegrees: Int
): Int {
    val sensorOrientationDegrees =
        characteristics.get(CameraCharacteristics.SENSOR_ORIENTATION)!!

    // Reverse device orientation for back-facing cameras.
    val sign = if (characteristics.get(CameraCharacteristics.LENS_FACING) ==
        CameraCharacteristics.LENS_FACING_FRONT
    ) 1 else -1

    // Calculate desired orientation relative to camera orientation to make
    // the image upright relative to the device orientation.
    return (sensorOrientationDegrees - surfaceRotationDegrees * sign + 360) % 360
}
```

### Java

```java
/**
 * Computes rotation required to transform the camera sensor output orientation to the
 * device's current orientation in degrees.
 *
 * @param characteristics The CameraCharacteristics to query for the sensor orientation.
 * @param surfaceRotationDegrees The current device orientation as a Surface constant.
 * @return Relative rotation of the camera sensor output.
 */
public int computeRelativeRotation(
    CameraCharacteristics characteristics,
    int surfaceRotationDegrees
){
    Integer sensorOrientationDegrees =
        characteristics.get(CameraCharacteristics.SENSOR_ORIENTATION);

    // Reverse device orientation for back-facing cameras.
    int sign = characteristics.get(CameraCharacteristics.LENS_FACING) ==
        CameraCharacteristics.LENS_FACING_FRONT ? 1 : -1;

    // Calculate desired orientation relative to camera orientation to make
    // the image upright relative to the device orientation.
    return (sensorOrientationDegrees - surfaceRotationDegrees * sign + 360) % 360;
}
```

Window metrics
--------------

Screen size should not be used to determine the dimensions of the camera viewfinder; the camera app might be running in a portion of the screen, either in multi-window mode on mobile devices or free-from mode on Chrome OS.

`WindowManager#getCurrentWindowMetrics()`) (added in API level 30) returns the size of the application window rather than the size of the screen. The Jetpack WindowManager library methods `WindowMetricsCalculator#computeCurrentWindowMetrics()`) and `WindowInfoTracker#currentWindowMetrics()` provide similar support with backward compatibility to API level 14.

180 degree rotation
-------------------

A 180 degree rotation of a device (for example, from natural orientation to natural orientation upside down) does not trigger the `onConfigurationChanged()`) callback. As a result, the camera preview might be upside down.

To detect a 180 degree rotation, implement a `DisplayListener` and check the device rotation with a call to `Display#getRotation()`) in the `onDisplayChanged()`) callback.

Exclusive resources
-------------------

Prior to Android 10, only the topmost visible activity in a multi-window environment was in the `RESUMED` state. This was confusing for users because the system provided no indication of which activity was resumed.

Android 10 (API level 29) introduced multi-resume where all visible activities are in the `RESUMED` state. Visible activities can still enter the `PAUSED` state if, for example, a transparent activity is on top of the activity or the activity is not focusable, such as in picture-in-picture mode (see Picture-in-picture support).

An application using the camera, microphone, or any exclusive or singleton resource on API level 29 or higher must support multi-resume. For example, if three resumed activities want to use the camera, only one is able to access this exclusive resource. Each activity must implement an `onDisconnected()`) callback to stay aware of preemptive access to the camera by a higher priority activity.

