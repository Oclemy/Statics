# Image capture

The image capture use case is designed for capturing high-resolution, high-quality photos and provides auto-white-balance, auto-exposure, and auto-focus (3A) functionality, in addition to simple manual camera controls. The caller is responsible for deciding how to use the captured picture, including the following options:

*   `takePicture(Executor, OnImageCapturedCallback)`): This method provides an in-memory buffer of the captured image.
*   `takePicture(OutputFileOptions, Executor, OnImageSavedCallback)`): This method saves the captured image to the provided file location.

There are two types of customizable executors on which `ImageCapture` runs, the callback executor and the IO executor.

*   The callback executor is the parameter of the `takePicture` methods. It is used to execute the user-provided `OnImageCapturedCallback()`.
*   If the caller chooses to save the image to a file location, you can specify an executor to do the IO. To set the IO executor, call `ImageCapture.Builder.setIoExecutor(Executor)`). If the executor is absent, CameraX will default to an internal IO executor for the task.

Implementation
--------------

Basic controls for taking pictures are provided. Pictures are taken with flash options and using continuous auto-focus.

To optimize photo capture for latency, set `ImageCapture.CaptureMode` to `CAPTURE_MODE_MINIMIZE_LATENCY`. To optimize for quality, set it to `CAPTURE_MODE_MAXIMIZE_QUALITY`.

The following code sample shows how to configure your app to take a photo:

### Kotlin

```kotlin
val imageCapture = ImageCapture.Builder()
 .setTargetRotation(view.display.rotation)
    .build() 
cameraProvider.bindToLifecycle(lifecycleOwner, cameraSelector, imageCapture,
 imageAnalysis, preview) 
```

### Java

```java
ImageCapture imageCapture =
    new ImageCapture.Builder()
        .setTargetRotation(view.getDisplay().getRotation())
        .build();
```

cameraProvider.bindToLifecycle(lifecycleOwner, cameraSelector, imageCapture, imageAnalysis, preview);

Note that `bindToLifecycle()`) returns a `Camera` object. See this guide for more information about controlling camera output, such as zoom and exposure.

Once you've configured the camera, the following code takes a photo based on user action:

### Kotlin

```kotlin
fun onClick() {
    val outputFileOptions = ImageCapture.OutputFileOptions.Builder(File(...)).build()
    imageCapture.takePicture(outputFileOptions, cameraExecutor,
        object : ImageCapture.OnImageSavedCallback {
            override fun onError(error: ImageCaptureException)
            {
                // insert your code here.
            }
            override fun onImageSaved(outputFileResults: ImageCapture.OutputFileResults) {
                // insert your code here.
            }
        })
}
```

### Java

```java
public void onClick() {
    ImageCapture.OutputFileOptions outputFileOptions =
            new ImageCapture.OutputFileOptions.Builder(new File(...)).build();
    imageCapture.takePicture(outputFileOptions, cameraExecutor,
        new ImageCapture.OnImageSavedCallback() {
            @Override
            public void onImageSaved(ImageCapture.OutputFileResults outputFileResults) {
                // insert your code here.
            }
            @Override
            public void onError(ImageCaptureException error) {
                // insert your code here.
            }
       }
    );
}
```

The image capture method fully supports the `JPEG` format. For sample code that shows how to convert a `Media.Image` object from `YUV_420_888` format to an RGB `Bitmap` object, see `YuvToRgbConverter.kt`.

