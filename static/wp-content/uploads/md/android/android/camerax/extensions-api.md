# CameraX Extensions API

CameraX provides an Extensions API for accessing extensions that device manufacturers have implemented on various Android devices. For a list of supported extension modes, see Camera extensions.

For a list of devices that support extensions, see Supported devices.

Extensions architecture
-----------------------

The following image shows the architecture for extensions with CameraX.

![](https://developer.android.com/static/images/training/camera/camerax/camerax-architecture.png)

**Figure 1.** CameraX architecture for extensions

Extensions are separate from the Camera2 core of CameraX. In the diagram, the red arrows indicate the main data flow when users trigger an extension-based feature, such as HDR image capture.

Enable an effect for image capture and preview
----------------------------------------------

Before using the extensions API, retrieve an `ExtensionsManager` instance using the ExtensionsManager#getInstanceAsync(Context, CameraProvider)) method. This will allow you to query the extension availability information. Then retrieve an extension enabled `CameraSelector`. The extension mode will be applied on the image capture and preview use cases when calling the bindToLifecycle()) method with the `CameraSelector` extension enabled.

To implement the extension for the image capture and preview use cases, refer to the following code sample:

### Kotlin

```kotlin
import androidx.camera.extensions.ExtensionMode
import androidx.camera.extensions.ExtensionsManager

fun onCreate() {
    // Create a camera provider
    val cameraProvider : ProcessCameraProvider = ... // Get the provider instance

    lifecycleScope.launch {
        // Create an extensions manager
        val extensionsManager =
                ExtensionsManager.getInstanceAsync(context, cameraProvider).await()

        // Select the camera
        val cameraSelector = CameraSelector.DEFAULT_BACK_CAMERA

        // Query if extension is available.
        if (extensionsManager.isExtensionAvailable(
                cameraSelector,
                ExtensionMode.BOKEH
            )
        ) {
            // Unbind all use cases before enabling different extension modes.
            cameraProvider.unbindAll()

            // Retrieve extension enabled camera selector
            val bokehCameraSelector = extensionsManager.getExtensionEnabledCameraSelector(
                cameraSelector,
                ExtensionMode.BOKEH
            )

            // Bind image capture and preview use cases with the extension enabled camera selector.
            val imageCapture = ImageCapture.Builder().build()
            val preview = Preview.Builder().build()
            cameraProvider.bindToLifecycle(
                lifecycleOwner,
                bokehCameraSelector,
                imageCapture,
                preview
            )
        }
    }
}
```

### Java

```java
import androidx.camera.extensions.ExtensionMode;
import androidx.camera.extensions.ExtensionsManager;

void onCreate() {
    // Create a camera provider
    ProcessCameraProvider cameraProvider = ... // Get the provider instance

    // Call the getInstanceAsync function to retrieve a ListenableFuture object
    ListenableFuture future =
            ExtensionsManager.getInstanceAsync(context, cameraProvider);

    // Obtain the ExtensionsManager instance from the returned ListenableFuture object
    future.addListener(() -> {
        try {
            ExtensionsManager extensionsManager = future.get();

            // Select the camera
            CameraSelector cameraSelector = CameraSelector.DEFAULT_BACK_CAMERA;

            // Query if extension is available.
            if (extensionsManager.isExtensionAvailable(cameraSelector, ExtensionMode.BOKEH)) {
                // Unbind all use cases before enabling different extension modes.
                cameraProvider.unbindAll();

                // Retrieve extension enabled camera selector
                CameraSelector bokehCameraSelector = extensionsManager
                    .getExtensionEnabledCameraSelector(cameraSelector, ExtensionMode.BOKEH);

                // Bind image capture and preview use cases with the extension enabled camera selector.
                ImageCapture imageCapture = new ImageCapture.Builder().build();
                Preview preview = new Preview.Builder().build();
                cameraProvider.bindToLifecycle(lifecycleOwner, bokehCameraSelector, imageCapture, preview);
            }
        } catch (ExecutionException | InterruptedException e) {
            // This should not happen unless the future is cancelled or the thread is interrupted by
            // applications.
        }
    }, ContextCompact.getMainExecutor(context));
}
```

Disable the effect
------------------

To disable vendor extensions, unbind all use cases and rebind the image capture and preview use cases with a normal camera selector. For example, rebind to the back camera using `CameraSelector.DEFAULT_BACK_CAMERA`.

Dependencies
------------

The CameraX Extensions API is implemented in the `camera-extensions` library. The extensions depend on the CameraX core modules (`core`, `camera2`, `lifecycle`).

### Groovy

```groovy
dependencies {
  def camerax_version = "1.2.0-alpha04"
  implementation "androidx.camera:camera-core:${camerax_version}"
  implementation "androidx.camera:camera-camera2:${camerax_version}"
  implementation "androidx.camera:camera-lifecycle:${camerax_version}"
  //the CameraX Extensions library
  implementation "androidx.camera:camera-extensions:${camerax_version}"
    ...
}
```

### Kotlin

```kotlin
dependencies {
  val camerax_version = "1.2.0-alpha04"
  implementation("androidx.camera:camera-core:${camerax_version}")
  implementation("androidx.camera:camera-camera2:${camerax_version}")
  implementation("androidx.camera:camera-lifecycle:${camerax_version}")
  // the CameraX Extensions library
  implementation("androidx.camera:camera-extensions:${camerax_version}")
    ...
}
```

Legacy API removal
------------------

With the new Extensions API released in `1.0.0-alpha26`, the legacy Extensions API released in August 2019 is now deprecated. Starting with version `1.0.0-alpha28`, the legacy Extensions API has been removed from the library. Applications using the new Extensions API must now acquire an extension-enabled `CameraSelector` and use it to bind the use cases.

Applications using the legacy Extensions API should migrate to the new Extensions API to ensure future compatibility with upcoming CameraX releases.

