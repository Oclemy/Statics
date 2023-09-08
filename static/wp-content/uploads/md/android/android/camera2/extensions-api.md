# Camera2 Extensions API 

> **Note:** This page refers to the Camera2 package. Unless your app requires specific, low-level features from Camera2, we recommend using CameraX. Both CameraX and Camera2 support Android 5.0 (API level 21) and higher.

Camera2 provides an Extensions API for accessing extensions that device manufacturers have implemented on various Android devices. For a list of supported extension modes, see Camera extensions.

For a list of devices that support extensions, see Supported devices.

Test a camera device for Camera2 Extensions API compatibility
-------------------------------------------------------------

The following code snippet checks if the device supports the Camera2 extensions API and returns a list of compatible cameras:

### Kotlin

```kotlin
private fun getExtensionCameraIds(cameraManager: CameraManager): List {
    return if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.S) {
        cameraManager.cameraIdList.filter { cameraId ->
            val characteristics = cameraManager.getCameraCharacteristics(cameraId)
            val extensionCharacteristics =
                cameraManager.getCameraExtensionCharacteristics(cameraId)
            val capabilities =
                characteristics.get(CameraCharacteristics.REQUEST_AVAILABLE_CAPABILITIES)
            extensionCharacteristics.supportedExtensions.isNotEmpty() &&
                    capabilities?.contains(
                        CameraCharacteristics.REQUEST_AVAILABLE_CAPABILITIES_BACKWARD_COMPATIBLE
                    ) ?: false
        }
    } else emptyList()
}
```

### Java

```java
private List getExtensionCameraIds(CameraManager cameraManager)
        throws CameraAccessException {
    if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.S) {
        return Arrays.stream(cameraManager.getCameraIdList()).filter(cameraId -> {
            try {
                CameraCharacteristics characteristics =
                        cameraManager.getCameraCharacteristics(cameraId);
                CameraExtensionCharacteristics extensionCharacteristics =
                        cameraManager.getCameraExtensionCharacteristics(cameraId);
                IntStream capabilities =
                    Arrays.stream(
                                characteristics.get(
                                        CameraCharacteristics.REQUEST_AVAILABLE_CAPABILITIES
                                )
                        );
                return !extensionCharacteristics.getSupportedExtensions().isEmpty() &&
                       capabilities.anyMatch(capability -> capability == CameraCharacteristics
                                        .REQUEST_AVAILABLE_CAPABILITIES_BACKWARD_COMPATIBLE
                        );
            } catch (CameraAccessException e) {
                throw new RuntimeException(e);
            }
        }).collect(Collectors.toList());
    } else {
        return Collections.emptyList();
    }
}
```

Create a CameraExtensionSession with the Camera2 Extensions API
---------------------------------------------------------------

The Camera2 extensions API, when used with compatible devices, lets you access certain camera effects. The following code snippet showcases an example of how to create a `CameraExtensionSession` for using the night mode effect for an existing Camera2 application.

### Kotlin

```kotlin
private val captureCallbacks = object : CameraExtensionSession.ExtensionCaptureCallback() {
    // Implement Capture Callbacks
}
private val extensionSessionStateCallback = object : CameraExtensionSession.StateCallback() {
    override fun onConfigured(session: CameraExtensionSession) {
        cameraExtensionSession = session
        try {
            val captureRequest =
                cameraDevice.createCaptureRequest(CameraDevice.TEMPLATE_PREVIEW).apply {
                    addTarget(previewSurface)
                }.build()
            session.setRepeatingRequest(
                captureRequest,
                Dispatchers.IO.asExecutor(),
                captureCallbacks
            )
        } catch (e: CameraAccessException) {
            Snackbar.make(
                previewView,
                "Failed to preview capture request",
                Snackbar.LENGTH_SHORT
            ).show()
            requireActivity().finish()
        }
    }

    override fun onClosed(session: CameraExtensionSession) {
        super.onClosed(session)
        cameraDevice.close()
    }

    override fun onConfigureFailed(session: CameraExtensionSession) {
        Snackbar.make(
            previewView,
            "Failed to start camera extension preview",
            Snackbar.LENGTH_SHORT
        ).show()
        requireActivity().finish()
    }
}

private fun startExtensionSession() {
    val outputConfig = arrayListOf(
        OutputConfiguration(stillImageReader.surface),
        OutputConfiguration(previewSurface)
    )
    val extensionConfiguration = ExtensionSessionConfiguration(
        CameraExtensionCharacteristics.EXTENSION_NIGHT,
        outputConfig,
        Dispatchers.IO.asExecutor(),
        extensionSessionStateCallback
    )
    cameraDevice.createExtensionSession(extensionConfiguration)
}
```

### Java

```java
private CameraExtensionSession.ExtensionCaptureCallback captureCallbacks =
        new CameraExtensionSession.ExtensionCaptureCallback() {
            // Implement Capture Callbacks
        };

private CameraExtensionSession.StateCallback extensionSessionStateCallback =
        new CameraExtensionSession.StateCallback() {
            @Override
            public void onConfigured(@NonNull CameraExtensionSession session) {
                cameraExtensionSession = session;
                try {
                    CaptureRequest.Builder captureRequestBuilder =
                            cameraDevice.createCaptureRequest(CameraDevice.TEMPLATE_PREVIEW);
                    captureRequestBuilder.addTarget(previewSurface);
                    CaptureRequest captureRequest = captureRequestBuilder.build();
                    session.setRepeatingRequest(captureRequest, backgroundExecutor, captureCallbacks);
                } catch (CameraAccessException e) {
                    Snackbar.make(
                            previewView,
                            "Failed to preview capture request",
                            Snackbar.LENGTH_SHORT
                    ).show();
                    requireActivity().finish();
                }
            }

            @Override
            public void onClosed(@NonNull CameraExtensionSession session) {
                super.onClosed(session);
                cameraDevice.close();
            }

            @Override
            public void onConfigureFailed(@NonNull CameraExtensionSession session) {
                Snackbar.make(
                        previewView,
                        "Failed to start camera extension preview",
                        Snackbar.LENGTH_SHORT
                ).show();
                requireActivity().finish();
            }
        };

private void startExtensionSession() {
    ArrayList outputConfig = new ArrayList<>();
    outputConfig.add(new OutputConfiguration(stillImageReader.getSurface()));
    outputConfig.add(new OutputConfiguration(previewSurface));
    ExtensionSessionConfiguration extensionConfiguration = new ExtensionSessionConfiguration(
            CameraExtensionCharacteristics.EXTENSION_NIGHT,
            outputConfig,
            backgroundExecutor,
            extensionSessionStateCallback
    );
}
```