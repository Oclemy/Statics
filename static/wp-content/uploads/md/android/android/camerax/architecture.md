# CameraX architecture

This page covers the architecture of CameraX, including its structure, how to work with the API, how to work with lifecycles, and how to combine use cases.

CameraX structure
-----------------

You can use CameraX to interface with a device’s camera through an abstraction called a use case. The following use cases are available:

*   **Preview**: accepts a surface for displaying a preview, such as a `PreviewView`.
*   **Image analysis**: provides CPU-accessible buffers for analysis, such as for machine learning.
*   **Image capture**: captures and saves a photo.
*   **Video capture**: capture video and audio with `VideoCapture`

Use cases can be combined and active concurrently. For example, an app can let the user view the image that the camera sees using a preview use case, have an image analysis use case that determines whether the people in the photo are smiling, and include an image capture use case to take a picture once they are.

API model
---------

To work with the library, you specify the following things:

*   The desired use case with configuration options.
*   What to do with output data by attaching listeners.
*   The intended flow, such as when to enable cameras and when to produce data, by binding the use case to Android Architecture Lifecycles.

You configure use cases using `set()` methods and finalize them with the `build()` method. Each use case object provides a set of use case-specific APIs. For example, the image capture use case provides a `takePicture()` method call.

Instead of an application placing specific start and stop method calls in `onResume()` and `onPause()`, the application specifies a lifecycle to associate the camera with, using `cameraProvider.bindToLifecycle()`). That lifecycle then informs CameraX when to configure the camera capture session and ensures camera state changes appropriately to match lifecycle transitions.

For implementation steps for each use case, see Implement a preview, Analyze images, Image capture, and Video capture

API model example
-----------------

The preview use case interacts with a `Surface` for display. Applications create the use case with configuration options using the following code:

### Kotlin

```kotlin
val preview = Preview.Builder().build()
val viewFinder: PreviewView = findViewById(R.id.previewView)

// The use case is bound to an Android Lifecycle with the following code
val camera = cameraProvider.bindToLifecycle(lifecycleOwner, cameraSelector, preview)

// PreviewView creates a surface provider and is the recommended provider
preview.setSurfaceProvider(viewFinder.getSurfaceProvider())
```

### Java

```java
Preview preview = new Preview.Builder().build();
PreviewView viewFinder = findViewById(R.id.view_finder);

// The use case is bound to an Android Lifecycle with the following code
Camera camera = cameraProvider.bindToLifecycle(lifecycleOwner, cameraSelector, preview);

// PreviewView creates a surface provider, using a Surface from a different
// kind of view will require you to implement your own surface provider.
preview.previewSurfaceProvider = viewFinder.getSurfaceProvider();
```


CameraX Lifecycles
------------------

CameraX observes a lifecycle to determine when to open the camera, when to create a capture session, and when to stop and shut down. Use case APIs provide method calls and callbacks to monitor progress.

As explained in Combine use cases, you can bind some mixes of use cases to a single lifecycle. When your app needs to support use cases that can't be combined, you can do one of the following:

*   Group compatible use cases together into more than one fragment and then switch between fragments
*   Create a custom lifecycle component and use it to manually control the camera lifecycle

If you decouple your view and camera use cases' Lifecycle owners (for example, if you use a custom lifecycle or a retain fragment)), then you must ensure that all use cases are unbound from CameraX by using `ProcessCameraProvider.unbindAll()`) or by unbinding each use case individually. Alternatively, when you bind use cases to a Lifecycle, you can let CameraX manage opening and closing the capture session and unbinding the use cases.

If all of your camera functionality corresponds to the lifecycle of a single lifecycle-aware component such as an `AppCompatActivity` or an `AppCompat` fragment, then using the lifecycle of that component when binding all the desired use cases will ensure that the camera functionality is ready when the lifecycle-aware component is active, and safely disposed of, not consuming any resources, otherwise.

Custom LifecycleOwners
----------------------

For advanced cases, you can create a custom `LifecycleOwner` to enable your app to explicitly control the CameraX session lifecycle instead of tying it to a standard Android `LifecycleOwner`.

The following code sample shows how to create a simple custom LifecycleOwner:

### Kotlin

```kotlin
class CustomLifecycle : LifecycleOwner {
    private val lifecycleRegistry: LifecycleRegistry

    init {
        lifecycleRegistry = LifecycleRegistry(this);
        lifecycleRegistry.markState(Lifecycle.State.CREATED)
    }
    ...
    fun doOnResume() {
        lifecycleRegistry.markState(State.RESUMED)
    }
    ...
    override fun getLifecycle(): Lifecycle {
        return lifecycleRegistry
    }
}
```

### Java

```java
public class CustomLifecycle implements LifecycleOwner {
    private LifecycleRegistry lifecycleRegistry;
    public CustomLifecycle() {
        lifecycleRegistry = new LifecycleRegistry(this);
        lifecycleRegistry.markState(Lifecycle.State.CREATED);
    }
   ...
   public void doOnResume() {
        lifecycleRegistry.markState(State.RESUMED);
    }
   ...
    public Lifecycle getLifecycle() {
        return lifecycleRegistry;
    }
}
```

Using this `LifecycleOwner`, your app can place state transitions at desired points in its code. For more on implementing this functionality in your app, see Implementing a custom LifecycleOwner.

Concurrent use cases
--------------------

Use cases can run concurrently. While use cases can be sequentially bound to a lifecycle, it is better to bind all use cases with a single call to `CameraProcessProvider.bindToLifecycle()`. For more information on best practices for configuration changes, see Handle configuration changes.

In the following code sample, the app specifies the two use cases to be created and run simultaneously. It also specifies the lifecycle to use for both use cases, so that they both start and stop according to the lifecycle.

### Kotlin

```kotlin
private lateinit var imageCapture: ImageCapture

override fun onCreate(savedInstanceState: Bundle?) {
    super.onCreate(savedInstanceState)
    setContentView(R.layout.activity_main)

    val cameraProviderFuture = ProcessCameraProvider.getInstance(this)

    cameraProviderFuture.addListener(Runnable {
        // Camera provider is now guaranteed to be available
        val cameraProvider = cameraProviderFuture.get()

        // Set up the preview use case to display camera preview.
        val preview = Preview.Builder().build()

        // Set up the capture use case to allow users to take photos.
        imageCapture = ImageCapture.Builder()
                .setCaptureMode(ImageCapture.CAPTURE_MODE_MINIMIZE_LATENCY)
                .build()

        // Choose the camera by requiring a lens facing
        val cameraSelector = CameraSelector.Builder()
                .requireLensFacing(CameraSelector.LENS_FACING_FRONT)
                .build()

        // Attach use cases to the camera with the same lifecycle owner
        val camera = cameraProvider.bindToLifecycle(
                this as LifecycleOwner, cameraSelector, preview, imageCapture)

        // Connect the preview use case to the previewView
        preview.setSurfaceProvider(
                previewView.getSurfaceProvider())
    }, ContextCompat.getMainExecutor(this))
}
```

### Java

```java
private ImageCapture imageCapture;

@Override
public void onCreate(@Nullable Bundle savedInstanceState) {
    super.onCreate(savedInstanceState);
    setContentView(R.layout.activity_main);

    PreviewView previewView = findViewById(R.id.previewView);

    ListenableFuture<ProcessCameraProvider> cameraProviderFuture =
            ProcessCameraProvider.getInstance(this);

    cameraProviderFuture.addListener(() -> {
        try {
            // Camera provider is now guaranteed to be available
            ProcessCameraProvider cameraProvider = cameraProviderFuture.get();

            // Set up the view finder use case to display camera preview
            Preview preview = new Preview.Builder().build();

            // Set up the capture use case to allow users to take photos
            imageCapture = new ImageCapture.Builder()
                    .setCaptureMode(ImageCapture.CAPTURE_MODE_MINIMIZE_LATENCY)
                    .build();

            // Choose the camera by requiring a lens facing
            CameraSelector cameraSelector = new CameraSelector.Builder()
                    .requireLensFacing(lensFacing)
                    .build();

            // Attach use cases to the camera with the same lifecycle owner
            Camera camera = cameraProvider.bindToLifecycle(
                    ((LifecycleOwner) this),
                    cameraSelector,
                    preview,
                    imageCapture);

            // Connect the preview use case to the previewView
            preview.setSurfaceProvider(
                    previewView.getSurfaceProvider());
        } catch (InterruptedException | ExecutionException e) {
            // Currently no exceptions thrown. cameraProviderFuture.get()
            // shouldn't block since the listener is being called, so no need to
            // handle InterruptedException.
        }
    }, ContextCompat.getMainExecutor(this));
}
```

The following configuration combinations are guaranteed to be supported (when Preview or Video Capture is required, but not both at the same time):

Preview or VideoCapture

Image capture

Analysis

Descriptions

Provide user a preview or record video, take a photo, and analyze the image stream.

 

Take a photo, and analyze the image stream.

 

Provide user a preview or record video, and take a photo.

 

Provide user a preview or record video, and analyze the image stream.

When both Preview and Video Capture are required, the following use case combinations are conditionally supported:

Preview

Video capture

Image capture

Analysis

Special requirement

 

 

Guaranteed for all cameras

 

LIMITED (or better) camera device.

 

LEVEL_3 (or better) camera device.

Additionally,

*   Every use case can work on its own. For example, an app can record video without using preview.
*   When extensions are enabled, only the `ImageCapture` and `Preview` combination is guaranteed to work. Depending on OEM implementation, it may not be possible to also add `ImageAnalysis`; extensions can not be enabled for the `VideoCapture` use case. Check the Extension reference doc for details.
*   Depending on camera capability, some cameras may support the combination at lower resolution modes, but can not support the same combination at some higher resolutions.

The supported hardware level can be retrieved from `Camera2CameraInfo`. For example, the following code checks whether the default back facing camera is a `LEVEL_3` device:

### Kotlin

```kotlin
@androidx.annotation.OptIn(ExperimentalCamera2Interop::class)
fun isBackCameraLevel3Device(cameraProvider: ProcessCameraProvider) : Boolean {
    if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.N) {
        return CameraSelector.DEFAULT_BACK_CAMERA
            .filter(cameraProvider.availableCameraInfos)
            .firstOrNull()
            ?.let { Camera2CameraInfo.from(it) }
            ?.getCameraCharacteristic(CameraCharacteristics.INFO_SUPPORTED_HARDWARE_LEVEL) ==
            CameraCharacteristics.INFO_SUPPORTED_HARDWARE_LEVEL_3
    }
    return false
}
```

### Java

```java
@androidx.annotation.OptIn(markerClass = ExperimentalCamera2Interop.class)
Boolean isBackCameraLevel3Device(ProcessCameraProvider cameraProvider) {
    if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.N) {
        List filteredCameraInfos = CameraSelector.DEFAULT_BACK_CAMERA
                .filter(cameraProvider.getAvailableCameraInfos());
        if (!filteredCameraInfos.isEmpty()) {
            return Objects.equals(
                Camera2CameraInfo.from(filteredCameraInfos.get(0)).getCameraCharacteristic(
                        CameraCharacteristics.INFO_SUPPORTED_HARDWARE_LEVEL),
                CameraCharacteristics.INFO_SUPPORTED_HARDWARE_LEVEL_3);
        }
    }
    return false;
}
```

Permissions
-----------

Your app will need the `CAMERA` permission. To save images to files, it will also require the `WRITE_EXTERNAL_STORAGE` permission, except on devices running Android 10 or later.

For more information about configuring permissions for your app, read Request App Permissions.

Requirements
------------

CameraX has the following minimum version requirements:

*   Android API level 21
*   Android Architecture Components 1.1.1

For lifecycle-aware activities, use `FragmentActivity` or `AppCompatActivity`.

Declare dependencies
--------------------

To add a dependency on CameraX, you must add the Google Maven repository to your project.

Open the `settings.gradle` file for your project and add the `google()` repository as shown in the following:

### Groovy

```groovy
dependencyResolutionManagement {
    repositoriesMode.set(RepositoriesMode.FAIL_ON_PROJECT_REPOS)
    repositories {
        google()
        mavenCentral()
    }
}
```

### Kotlin

```kotlin
dependencyResolutionManagement {
    repositoriesMode.set(RepositoriesMode.FAIL_ON_PROJECT_REPOS)
    repositories {
        google()
        mavenCentral()
    }
}
```

Add the following to the end of the Android block:

### Groovy

```kotlin
android {
    compileOptions {
        sourceCompatibility JavaVersion.VERSION_1_8
        targetCompatibility JavaVersion.VERSION_1_8
    }
    // For Kotlin projects
    kotlinOptions {
        jvmTarget = "1.8"
    }
}
```

### Kotlin

```kotlin
android {
    compileOptions {
        sourceCompatibility = JavaVersion.VERSION_1_8
        targetCompatibility = JavaVersion.VERSION_1_8
    }
    // For Kotlin projects
    kotlinOptions {
        jvmTarget = "1.8"
    }
}
```

Add the following to each module’s `build.gradle` file for an app:

### Groovy

```groovy
dependencies {
  // CameraX core library using the camera2 implementation
  def camerax_version = "1.2.0-rc01"
  // The following line is optional, as the core library is included indirectly by camera-camera2
  implementation "androidx.camera:camera-core:${camerax_version}"
  implementation "androidx.camera:camera-camera2:${camerax_version}"
  // If you want to additionally use the CameraX Lifecycle library
  implementation "androidx.camera:camera-lifecycle:${camerax_version}"
  // If you want to additionally use the CameraX VideoCapture library
  implementation "androidx.camera:camera-video:${camerax_version}"
  // If you want to additionally use the CameraX View class
  implementation "androidx.camera:camera-view:${camerax_version}"
  // If you want to additionally add CameraX ML Kit Vision Integration
  implementation "androidx.camera:camera-mlkit-vision:${camerax_version}"
  // If you want to additionally use the CameraX Extensions library
  implementation "androidx.camera:camera-extensions:${camerax_version}"
}
```

### Kotlin

```kotlin
dependencies {
    // CameraX core library using the camera2 implementation
    val camerax_version = "1.2.0-rc01"
    // The following line is optional, as the core library is included indirectly by camera-camera2
    implementation("androidx.camera:camera-core:${camerax_version}")
    implementation("androidx.camera:camera-camera2:${camerax_version}")
    // If you want to additionally use the CameraX Lifecycle library
    implementation("androidx.camera:camera-lifecycle:${camerax_version}")
    // If you want to additionally use the CameraX VideoCapture library
    implementation("androidx.camera:camera-video:${camerax_version}")
    // If you want to additionally use the CameraX View class
    implementation("androidx.camera:camera-view:${camerax_version}")
    // If you want to additionally add CameraX ML Kit Vision Integration
    implementation("androidx.camera:camera-mlkit-vision:${camerax_version}")
    // If you want to additionally use the CameraX Extensions library
    implementation("androidx.camera:camera-extensions:${camerax_version}")
}
```

For more information on configuring your app to conform to these requirements, see Declaring dependencies.
