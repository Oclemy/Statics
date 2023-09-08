# How to Search Text inside Image using CameraX and Firebase ML

By combining the Jetpack camerax and firebase ML kit you can search text inside an image. In this article we want to explore examples.


## (a). CameraX Search Text inside an image

An example that uses the Jetpack CameraX api. The app takes input for a phrase from the user, and then uses CameraX and MLKit Text Recognition to preview the camera feed, analyze the image buffer to search for the phrase, and capture the image once the phrase has been detected.

Here is the demo:

![Search Text inside an Image](https://github.com/CapTechMobile/camerax-sample/raw/master/demo.gif)

### Step 1: Setup Firebase

because this example uses Firebase technologies you need to add the google-services.json to the project. So you must [create a Firebase project and add the google-services.json](https://firebase.google.com/docs/android/setup), first.

### Step 2: Add dependencies

Once you've added the `google-services.json` in the project you proceed to setup dependencies. You need to add dependencies for CameraX in your app-level build.gradle;

```groovy
    implementation "androidx.camera:camera-core:${camerax_version}"
    implementation "androidx.camera:camera-camera2:${camerax_version}"
```

Then add firebase ML and Firebase core:

```groovy
    implementation 'com.google.firebase:firebase-ml-vision:20.0.0'
    implementation 'com.google.firebase:firebase-core:16.0.9'
```

Also Glide will be used to load image:

```groovy

    implementation 'com.github.bumptech.glide:glide:4.9.0'
    annotationProcessor 'com.github.bumptech.glide:compiler:4.9.0'
```

### Step 3: Create Layouts

Next you create layouts. There will be four layouts:

1. activity_main.xm;
2. fragment_camera.xml
3. fragment_photo.xml
4. fragment_phrase_entry.xml

**fragment_camera.xml**

This layout will have the TextureView:

```xml
<?xml version="1.0" encoding="utf-8"?>
<androidx.constraintlayout.widget.ConstraintLayout xmlns:android="http://schemas.android.com/apk/res/android"
    xmlns:app="http://schemas.android.com/apk/res-auto"
    xmlns:tools="http://schemas.android.com/tools"
    android:layout_width="match_parent"
    android:layout_height="match_parent"
    tools:context=".MainActivity">

    <TextureView
        android:id="@+id/surfacePreview"
        android:layout_width="0dp"
        android:layout_height="0dp"
        app:layout_constraintBottom_toBottomOf="parent"
        app:layout_constraintEnd_toEndOf="parent"
        app:layout_constraintStart_toStartOf="parent"
        app:layout_constraintTop_toTopOf="parent" />

</androidx.constraintlayout.widget.ConstraintLayout>
```

You can find the other xml files in the source code reference.

### Step 4: Write Code

There are 4 kotlin files;

1. CameraFragment.kt
2. PhotoFragment.kt
3. PhraseEntryFragment.kt
4. AutoFitPreviewBuilder.kt
5. MainActivity.kt

**CameraFragment.kt**

Start by extending the Fragment class:

```kotlin
class CameraFragment : Fragment() {
```

Create an inner TextAnalyzer class that takes two parameters as follows:

```kotlin
class TextAnalyzer(
    private val identifier: String,
    private val identifierDetectedCallback: () -> Unit
) : ImageAnalysis.Analyzer {
```

In a companion object prepare a sparseArray with orientations for FirebaseVisionImageMetadata:

```kotlin
    companion object {
        private val ORIENTATIONS = SparseIntArray()

        init {
            ORIENTATIONS.append(0, FirebaseVisionImageMetadata.ROTATION_0)
            ORIENTATIONS.append(90, FirebaseVisionImageMetadata.ROTATION_90)
            ORIENTATIONS.append(180, FirebaseVisionImageMetadata.ROTATION_180)
            ORIENTATIONS.append(270, FirebaseVisionImageMetadata.ROTATION_270)
        }
    }
```

Create a function to obtain orientations from rotation:

```kotlin
    private fun getOrientationFromRotation(rotationDegrees: Int): Int {
        return when (rotationDegrees) {
            0 -> FirebaseVisionImageMetadata.ROTATION_0
            90 -> FirebaseVisionImageMetadata.ROTATION_90
            180 -> FirebaseVisionImageMetadata.ROTATION_180
            270 -> FirebaseVisionImageMetadata.ROTATION_270
            else -> FirebaseVisionImageMetadata.ROTATION_90
        }
    }
```

Override the `analyze()` function with the following code:

```kotlin
 override fun analyze(image: ImageProxy?, rotationDegrees: Int) {
        if (image?.image == null || image.image == null) return

        val timestamp = System.currentTimeMillis()
        // only run once per second
        if (timestamp - lastAnalyzedTimestamp >= TimeUnit.SECONDS.toMillis(1)) {
            val visionImage = FirebaseVisionImage.fromMediaImage(
                image.image!!,
                getOrientationFromRotation(rotationDegrees)
            )

            val detector = FirebaseVision.getInstance()
                .onDeviceTextRecognizer

            detector.processImage(visionImage)
                .addOnSuccessListener { result: FirebaseVisionText ->
                    // remove the new lines and join to a single string,
                    // then search for our identifier
                    val textToSearch = result.text.split("\n").joinToString(" ")
                    if (textToSearch.contains(identifier, true)) {
                        identifierDetectedCallback()
                    }
                }
                .addOnFailureListener {
                    Log.e(TAG, "Error processing image", it)
                }
            lastAnalyzedTimestamp = timestamp
        }
```

\` As a function inside the fragment create `startCamera()` to launch the camera:

```kotlin
    private fun startCamera() {
```

In it start by unbinding anything that might still be open using the `unbindAll()` function:

```kotlin
        CameraX.unbindAll()
```

Get the necessary metrics:

```kotlin
        val metrics = DisplayMetrics().also { surfacePreview.display.getRealMetrics(it) }
        val screenSize = Size(metrics.widthPixels, metrics.heightPixels)
        val screenAspectRatio = Rational(metrics.widthPixels, metrics.heightPixels)
```

Build the preview configurations using the above metrics;

```kotlin
        val previewConfig = PreviewConfig.Builder()
            .setLensFacing(CameraX.LensFacing.BACK)
            .setTargetAspectRatio(screenAspectRatio)
            .setTargetResolution(screenSize)
            .build()
```

Build the viewfinder use case:

```kotlin
        val preview = AutoFitPreviewBuilder.build(previewConfig, surfacePreview)
```

Setup the Analyzer configurations:

```kotlin
        val analyzerConfig = ImageAnalysisConfig.Builder().apply {
            setLensFacing(CameraX.LensFacing.BACK)
            val analyzerThread = HandlerThread("OCR").apply { start() }
            setCallbackHandler(Handler(analyzerThread.looper))
            setImageReaderMode(ImageAnalysis.ImageReaderMode.ACQUIRE_LATEST_IMAGE)
            setTargetResolution(Size(1280, 720))
        }.build()
```

Also setup the capture configurations:

```kotlin
        val captureConfig = ImageCaptureConfig.Builder()
            .setLensFacing(CameraX.LensFacing.BACK)
            .setCaptureMode(ImageCapture.CaptureMode.MIN_LATENCY)
            .setTargetRotation(surfacePreview.display.rotation)
            .setTargetAspectRatio(screenAspectRatio)
            .build()
```

Instantiate the ImageCapture and ImageAnalyzer classes,passing in the capture and analyzer configurations respectively:

```kotlin
        imageCapture = ImageCapture(captureConfig)
        val imageAnalysis = ImageAnalysis(analyzerConfig)
```

Set the TextAnalyzer to analyzer property of the imageAnalysis:

```kotlin
        imageAnalysis.analyzer = TextAnalyzer(phrase) {
            val outputDirectory: File = requireContext().filesDir
            val photoFile = File(outputDirectory, "${System.currentTimeMillis()}.jpg")
            imageCapture?.takePicture(photoFile, imageCaptureListener, ImageCapture.Metadata())
```

Bind CameraX to the fragment lifeycle using the `bindToLifecycle()` function, passing in the context, preview, imageAnalysis and imageCapture objects:

```kotlin
        CameraX.bindToLifecycle(this, preview, imageAnalysis, imageCapture)
```

Find the classes in the source code.

### Reference

Below are the source code reference links for this project:

| No. | Link |
| --- | --- |
| 1. | Download code[here](https://github.com/CapTechMobile/camerax-sample/archive/refs/heads/master.zip) |
| 2. | Download code[here](https://github.com/CapTechMobile/camerax-sample/) |
| 3. | Follow Project Author[here](https://github.com/CapTechMobile) |
