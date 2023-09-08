# Camera capture sessions and requests

> **Note:** This page refers to the Camera2 package. Unless your app requires specific, low-level features from Camera2, we recommend using CameraX. Both CameraX and Camera2 support Android 5.0 (API level 21) and higher.

A single Android device can have multiple cameras. Each camera is a `CameraDevice`, and a `CameraDevice` can output more than one stream simultaneously.

One reason to do this is so that one stream, sequential camera frames coming from a `CameraDevice`, is optimized for a specific use-case, such as displaying a viewfinder, while others might be used to take a photo or to make a video recording.The streams act as parallel pipelines that process raw frames coming out of the camera,one frame at a time:

![](https://developer.android.com/static/images/training/camera/camera2/capture-sessions-requests-1.png)

**Figure 1.** Illustration from Building a Universal Camera App (Google I/O ‘18)

Parallel processing suggests that there could be performance limits depending on the available processing power from the CPU, GPU, or other processor. If a pipeline can’t keep up with the incoming frames, it starts dropping them.

Note that each pipeline has its own output format. The raw data coming in is automatically transformed into the appropriate output format by implicit logic associated with each pipeline. The `CameraDevice` used throughout this page's code samples is non-specific, so you should first enumerate all available cameras before proceeding.

You can use the `CameraDevice` to create a `CameraCaptureSession`, which will be specific to that `CameraDevice`. A `CameraDevice` must receive a frame configuration for each raw frame via the `CameraCaptureSession`. The configuration specifies camera attributes such as autofocus, aperture, effects, and exposure. Due to hardware constraints, only a single configuration can be active in the camera sensor at any given time; this configuration is called the _active_ configuration.

A `CameraCaptureSession` describes all the possible pipelines bound to the `CameraDevice`. Once a session is created, you cannot add or remove pipelines. The `CameraCaptureSession` maintains a queue of `CaptureRequest`s, which become the active configuration.

A `CaptureRequest` adds a configuration to the queue and selects one, more than one, or all of the available pipelines to receive a frame from the `CameraDevice`. You can send many capture requests over the life of a capture session. Each request can change the active configuration and set of output pipelines that will receive the raw image.

Creating a CameraCaptureSession
-------------------------------

To create a camera session, provide it with one or more output target buffers your app can write output frames to. Each buffer represents a pipeline. You must do this before you start using the camera so that the framework can configure the device’s internal pipelines and allocate memory buffers for sending frames to the desired output targets.

The following code snippet shows how you could prepare a camera session with two output buffers, one belonging to a `SurfaceView` and another to an `ImageReader`:

### Kotlin

```kotlin
// Retrieve the target surfaces, which could be coming from a number of places:
// 1. SurfaceView, if you want to display the image directly to the user
// 2. ImageReader, if you want to read each frame or perform frame-by-frame
// analysis
// 3. OpenGL Texture or TextureView, although discouraged for maintainability
      reasons
// 4. RenderScript.Allocation, if you want to do parallel processing
val surfaceView = findViewById<SurfaceView>(...)
val imageReader = ImageReader.newInstance(...)

// Remember to call this only *after* SurfaceHolder.Callback.surfaceCreated()
val previewSurface = surfaceView.holder.surface
val imReaderSurface = imageReader.surface
val targets = listOf(previewSurface, imReaderSurface)

// Create a capture session using the predefined targets; this also involves
// defining the session state callback to be notified of when the session is
// ready
cameraDevice.createCaptureSession(targets, object: CameraCaptureSession.StateCallback() {
override fun onConfigured(session: CameraCaptureSession) {
// Do something with `session`
}
// Omitting for brevity...
override fun onConfigureFailed(session: CameraCaptureSession) = Unit
}, null)  // null can be replaced with a Handler, falls back to current thread's Looper
```

### Java

```java
// Retrieve the target surfaces, which could be coming from a number of places:
// 1. SurfaceView, if you want to display the image directly to the user
// 2. ImageReader, if you want to read each frame or perform frame-by-frame
      analysis
// 3. RenderScript.Allocation, if you want to do parallel processing
// 4. OpenGL Texture or TextureView, although discouraged for maintainability
      reasons
Surface surfaceView = findViewById<SurfaceView>(...);
ImageReader imageReader = ImageReader.newInstance(...);

// Remember to call this only *after* SurfaceHolder.Callback.surfaceCreated()
Surface previewSurface = surfaceView.getHolder().getSurface();
Surface imageSurface = imageReader.getSurface();
List<Surface> targets = Arrays.asList(previewSurface, imageSurface);

// Create a capture session using the predefined targets; this also involves defining the
// session state callback to be notified of when the session is ready
cameraDevice.createCaptureSession(targets, new CameraCaptureSession.StateCallback() {
@Override
public void onConfigured(@NonNull CameraCaptureSession cameraCaptureSession) {
// Do something with `session`
}

// Omitting for brevity...
@Override
public void onConfigureFailed(@NonNull CameraCaptureSession cameraCaptureSession) {}
}, null); // null can be replaced with a Handler, falls back to current thread's Looper
```

Note that at this point you have not defined the camera's active configuration. Once the session has been configured, you can create and dispatch capture requests to do that.

The transformation applied to inputs as they are written to their buffer is determined by the type of each target, which must be a `Surface`. The Android framework knows how to convert a raw image in the active configuration into a format appropriate for each target. The conversion is controlled by the pixel format and size of the particular `Surface`. The framework tries to do its best, but some `Surface` configuration combinations may not work, causing issues such as the session not being created, throwing a runtime error when you dispatch a request, or performance degradation. The framework provides guarantees for specific combinations of device, surface, and request parameters. The documentation for `createCaptureSession()`) provides more information.

Single CaptureRequests
----------------------

The configuration used for each frame is encoded in a `CaptureRequest`, which is sent to the camera. To create a capture request, you can use one of the predefined templates, or you can use `TEMPLATE_MANUAL` for full control. Once you have chosen a template, you need to provide one or more output target buffers to be used with the request. You can only use buffers that were already defined on the capture session you intend to use.

Capture requests use a builder pattern and give developers the opportunity to set many different options including auto-exposure, auto-focus, and lens aperture. Before setting a field, make sure that the specific option is available for the device by calling `CameraCharacteristics.getAvailableCaptureRequestKeys()`) and that the desired value is supported by checking the appropriate camera characteristic, such as the available auto-exposure modes.

To create a simple capture request for a `SurfaceView` using the template designed for preview without any modifications, use `CameraDevice.TEMPLATE_PREVIEW`:

### Kotlin

```kotlin
val session: CameraCaptureSession = ...  // from CameraCaptureSession.StateCallback
val captureRequest = session.device.createCaptureRequest(CameraDevice.TEMPLATE_PREVIEW)
captureRequest.addTarget(previewSurface)
```

### Java

```java
CameraCaptureSession session = ...;  // from CameraCaptureSession.StateCallback
CaptureRequest.Builder captureRequest =
    session.getDevice().createCaptureRequest(CameraDevice.TEMPLATE_PREVIEW);
captureRequest.addTarget(previewSurface);
```


With a capture request defined, you can now dispatch it to the camera session:

### Kotlin

```kotlin
val session: CameraCaptureSession = ...  // from CameraCaptureSession.StateCallback
val captureRequest: CaptureRequest = ...  // from CameraDevice.createCaptureRequest()

// The first null argument corresponds to the capture callback, which you should
// provide if you want to retrieve frame metadata or keep track of failed capture
// requests that could indicate dropped frames; the second null argument
// corresponds to the Handler used by the asynchronous callback, which will fall
// back to the current thread's looper if null
session.capture(captureRequest.build(), null, null)
```

### Java

```java
CameraCaptureSession session = ...;  // from CameraCaptureSession.StateCallback
CaptureRequest captureRequest = ...;  // from CameraDevice.createCaptureRequest()

// The first null argument corresponds to the capture callback, which you should
// provide if you want to retrieve frame metadata or keep track of failed 
// capture
// requests that could indicate dropped frames; the second null argument
// corresponds to the Handler used by the asynchronous callback, which will fall
// back to the current thread's looper if null
session.capture(captureRequest.build(), null, null);
```

When an output frame is put into the target buffer(s), a capture callback is triggered. In many cases additional callbacks, such as `ImageReader.OnImageAvailableListener`, may also be triggered once the frame it contains has been processed. It is at this point that you can retrieve image data out of the target buffer.

Repeating CaptureRequests
-------------------------

Single camera requests are easy to do, but for displaying a live preview, or video, they aren't very useful. In that case, you would need to receive a continuous stream of frames, not just a single one. The following shows how to add a repeating request to the session:

### Kotlin

```kotlin
val session: CameraCaptureSession = ...  // from CameraCaptureSession.StateCallback
val captureRequest: CaptureRequest = ...  // from CameraDevice.createCaptureRequest()

// This will keep sending the capture request as frequently as possible until
// the
// session is torn down or session.stopRepeating() is called
// session.setRepeatingRequest(captureRequest.build(), null, null)
```

### Java

```java
CameraCaptureSession session = ...;  // from CameraCaptureSession.StateCallback
CaptureRequest captureRequest = ...;  // from CameraDevice.createCaptureRequest()

// This will keep sending the capture request as frequently as possible until the
// session is torn down or session.stopRepeating() is called
// session.setRepeatingRequest(captureRequest.build(), null, null);
```

A repeating capture request will make the camera device continually capture images using the settings in the provided `CaptureRequest`. The Camera2 API also allows users to capture video from the camera by sending repeating `CaptureRequests` as seen in this Camera2 sample repository on GitHub. It can also render slow motion video by capturing a high-speed (slow motion) video using repeating burst `CaptureRequests` as showcased in the Camera2 slow motion video sample app on GitHub.

Interleaving CaptureRequests
----------------------------

To send a second capture request while the repeating capture request is active, such as to display a viewfinder and let users capture a photo, you don't need to stop the ongoing repeating request. Instead, you issue a non-repeating capture request while the repeating request continues to run. Any output target buffer used needs to have been configured as part of the camera session when the session was first created. Note that repeating requests have lower priority than single-frame or burst requests, which enables the following sample to work:

### Kotlin

```kotlin
val session: CameraCaptureSession = ...  // from CameraCaptureSession.StateCallback

// Create the repeating request and dispatch it
val repeatingRequest = session.device.createCaptureRequest(
CameraDevice.TEMPLATE_PREVIEW)
repeatingRequest.addTarget(previewSurface)
session.setRepeatingRequest(repeatingRequest.build(), null, null)

// Some time later...

// Create the single request and dispatch it
// NOTE: This may disrupt the ongoing repeating request momentarily
val singleRequest = session.device.createCaptureRequest(
CameraDevice.TEMPLATE_STILL_CAPTURE)
singleRequest.addTarget(imReaderSurface)
session.capture(singleRequest.build(), null, null)
```

### Java

```java
CameraCaptureSession session = ...;  // from CameraCaptureSession.StateCallback

// Create the repeating request and dispatch it
CaptureRequest.Builder repeatingRequest =
session.getDevice().createCaptureRequest(CameraDevice.TEMPLATE_PREVIEW);
repeatingRequest.addTarget(previewSurface);
session.setRepeatingRequest(repeatingRequest.build(), null, null);

// Some time later...

// Create the single request and dispatch it
// NOTE: This may disrupt the ongoing repeating request momentarily
CaptureRequest.Builder singleRequest =
session.getDevice().createCaptureRequest(CameraDevice.TEMPLATE_STILL_CAPTURE);
singleRequest.addTarget(imReaderSurface);
session.capture(singleRequest.build(), null, null);
```

There is a drawback with this approach, though: you don’t know exactly when the single request will occur. In the figure below, if **A** is the repeating capture request and **B** is the single-frame capture request, this is how the session would process the request queue:

![](https://developer.android.com/static/images/training/camera/camera2/capture-sessions-requests-2.png)

**Figure 2.** Illustration of a request queue for the ongoing camera session

There are no guarantees for the latency between the last repeating request from **A** before request **B** activates and the next time that **A** is being used again, so you may experience some skipped frames. There are some things you can do to mitigate this problem:

*   Add the output targets from request **A** to request **B**. That way, when **B**’s frame is ready, it will be copied into **A**’s output targets. For example, this is essential when doing video snapshots to maintain a steady frame rate. In the code above, you would add `singleRequest.addTarget(previewSurface)` before building the request.
    
*   Use a combination of templates designed to work for this particular scenario, such as zero-shutter-lag.