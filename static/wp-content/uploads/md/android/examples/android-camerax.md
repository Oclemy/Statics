# Kotlin Android CameraX Tutorial and Examples

In this piece we will look at some easy to understand CameraX examples. These examples are available in Github and can allow you to master CameraX.

But first it is important to understand what CameraX is in the first place.


### What is CameraX?

> CameraX is a newer Camera API introduced in the Android Jetpack suite that is backwards compatible upto Android API level 21.

### Advantages of CameraX

Here are the advantages of CameraX:

1. Consistent across a variety of devices, starting from Android 5.0(API Level 21). No need to induce device specific code in your project.
2. Easier than previous APIs.
3. Has all the capabilities of Camera2.
4. Lifecycle aware, like most Android Jetpack components.

### Installing CameraX

To install CameraX you need to add it as a dependency in your app level build.gradle.

```groovy
// Use the most recent version of CameraX, currently that is alpha06.
def camerax_version = '1.0.0-alpha06'
implementation "androidx.camera:camera-core:${camerax_version}"
implementation "androidx.camera:camera-camera2:${camerax_version}"
```

It also requires some java8 methods:

```groovy
compileOptions {
    sourceCompatibility JavaVersion.VERSION_1_8
    targetCompatibility JavaVersion.VERSION_1_8
}
```

## 1\. Kotlin CameraX CameraView Example - Capture Image or Record Video

This is a simple example allowing us to capture image or record a video. Here is the project screenshot:

![CameraX Example - capture image or record video](https://github.com/iambaljeet/CameraXView/raw/master/art/device_art.jpg)

## Step 1: Add required dependencies

The first step is to add the appropriate CameraX dependencies for this project. These include CameraX core, Camera2 extensions, camerax lifecycle and camerax view.

Start by defining the version:

```groovy
    // CameraX core library
    def camerax_version = "1.0.0-beta01"
```

Then:

```groovy
    implementation "androidx.camera:camera-core:$camerax_version"

    // CameraX Camera2 extensions
    implementation "androidx.camera:camera-camera2:$camerax_version"

    // CameraX Lifecycle library
    implementation "androidx.camera:camera-lifecycle:$camerax_version"

    // CameraX View class
    implementation "androidx.camera:camera-view:1.0.0-alpha08"
```

### Step 2: Add Permissions

In you android manifest add the necessary permissions:

```xml
    <uses-permission android:name="android.permission.INTERNET" />
    <uses-permission android:name="android.permission.CAMERA" />
    <uses-permission android:name="android.permission.RECORD_AUDIO" />
```

### Step 3: Design Layout

In yourlayout include the CameraX View alongside two buttons:

**activity_main.xml**

```xml
<?xml version="1.0" encoding="utf-8"?>
<androidx.constraintlayout.widget.ConstraintLayout xmlns:android="http://schemas.android.com/apk/res/android"
    xmlns:app="http://schemas.android.com/apk/res-auto"
    xmlns:tools="http://schemas.android.com/tools"
    android:layout_width="match_parent"
    android:layout_height="match_parent"
    tools:context=".MainActivity">

    <androidx.camera.view.CameraView
        android:id="@+id/camera_view"
        android:layout_width="0dp"
        android:layout_height="0dp"
        app:lensFacing="back"
        app:scaleType="centerCrop"
        app:pinchToZoomEnabled="true"
        app:captureMode="mixed"
        app:flash="auto"
        app:layout_constraintBottom_toBottomOf="parent"
        app:layout_constraintLeft_toLeftOf="parent"
        app:layout_constraintRight_toRightOf="parent"
        app:layout_constraintTop_toTopOf="parent" />

    <Button
        android:id="@+id/video_record"
        android:layout_width="wrap_content"
        android:layout_height="wrap_content"
        android:layout_margin="20dp"
        android:text="Record Video"
        app:layout_constraintBottom_toBottomOf="parent"
        app:layout_constraintStart_toStartOf="parent"
        app:layout_constraintEnd_toStartOf="@+id/capture_image"/>

    <Button
        android:id="@+id/capture_image"
        android:layout_width="wrap_content"
        android:layout_height="wrap_content"
        android:layout_margin="20dp"
        android:text="Capture Image"
        app:layout_constraintBottom_toBottomOf="parent"
        app:layout_constraintStart_toEndOf="@+id/video_record"
        app:layout_constraintEnd_toEndOf="parent"/>

</androidx.constraintlayout.widget.ConstraintLayout>
```

### Step 4: Write Code

Let's look at the most important methods:

To capture an image with camraview invoke the takepicture method and override two methods: the onImageSaved and onError. This function allows you to capture image using camerax:

```kotlin
    private fun captureImage(imageCaptureFilePath: String) {
        camera_view.takePicture(File(imageCaptureFilePath), ContextCompat.getMainExecutor(this), object: ImageCapture.OnImageSavedCallback {
            override fun onImageSaved(outputFileResults: ImageCapture.OutputFileResults) {
                Toast.makeText(this@MainActivity, "Image Captured", Toast.LENGTH_SHORT).show()
                Log.d(TAG, "onImageSaved $imageCaptureFilePath")
            }

            override fun onError(exception: ImageCaptureException) {
                Toast.makeText(this@MainActivity, "Image Capture Failed", Toast.LENGTH_SHORT).show()
                Log.e(TAG, "onError $exception")
            }
        })
    }
```

To record a video using cameraView invoke the `startRecording()` method and override two methods: onVideoSaved and onError. Here's the function to do it:

```kotlin
    private fun recordVideo(videoRecordingFilePath: String) {
        camera_view.startRecording(File(videoRecordingFilePath), ContextCompat.getMainExecutor(this), object: VideoCapture.OnVideoSavedCallback {
            override fun onVideoSaved(file: File) {
                Toast.makeText(this@MainActivity, "Recording Saved", Toast.LENGTH_SHORT).show()
                Log.d(TAG, "onVideoSaved $videoRecordingFilePath")
            }

            override fun onError(videoCaptureError: Int, message: String, cause: Throwable?) {
                Toast.makeText(this@MainActivity, "Recording Failed", Toast.LENGTH_SHORT).show()
                Log.e(TAG, "onError $videoCaptureError $message")
            }
        })
    }
```

To start the camera session invoke the `bindToLifecycle()` function:

```kotlin
    private fun startCameraSession() {
        camera_view.bindToLifecycle(this)
    }
```

Here's the full code:

```kotlin
import android.Manifest
import android.content.pm.PackageManager
import android.os.Bundle
import android.os.Environment
import android.util.Log
import android.widget.Toast
import androidx.appcompat.app.AlertDialog
import androidx.appcompat.app.AppCompatActivity
import androidx.camera.core.ImageCapture
import androidx.camera.core.ImageCaptureException
import androidx.camera.core.VideoCapture
import androidx.core.app.ActivityCompat
import androidx.core.content.ContextCompat
import kotlinx.android.synthetic.main.activity_main.*
import java.io.File

class MainActivity : AppCompatActivity() {
    val TAG = MainActivity::class.java.simpleName
    var isRecording = false

    var CAMERA_PERMISSION = Manifest.permission.CAMERA
    var RECORD_AUDIO_PERMISSION = Manifest.permission.RECORD_AUDIO

    var RC_PERMISSION = 101

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_main)

        val recordFiles = ContextCompat.getExternalFilesDirs(this, Environment.DIRECTORY_MOVIES)
        val storageDirectory = recordFiles[0]
        val videoRecordingFilePath = "${storageDirectory.absoluteFile}/${System.currentTimeMillis()}_video.mp4"
        val imageCaptureFilePath = "${storageDirectory.absoluteFile}/${System.currentTimeMillis()}_image.jpg"

        if (checkPermissions()) startCameraSession() else requestPermissions()

        video_record.setOnClickListener {
            if (isRecording) {
                isRecording = false
                video_record.text = "Record Video"
                Toast.makeText(this, "Recording Stopped", Toast.LENGTH_SHORT).show()
                camera_view.stopRecording()
            } else {
                isRecording = true
                video_record.text = "Stop Recording"
                Toast.makeText(this, "Recording Started", Toast.LENGTH_SHORT).show()
                recordVideo(videoRecordingFilePath)
            }
        }

        capture_image.setOnClickListener {
            captureImage(imageCaptureFilePath)
        }
    }

    private fun requestPermissions() {
        ActivityCompat.requestPermissions(this, arrayOf(CAMERA_PERMISSION, RECORD_AUDIO_PERMISSION), RC_PERMISSION)
    }

    private fun checkPermissions(): Boolean {
        return ((ActivityCompat.checkSelfPermission(this, CAMERA_PERMISSION)) == PackageManager.PERMISSION_GRANTED
                && (ActivityCompat.checkSelfPermission(this, CAMERA_PERMISSION)) == PackageManager.PERMISSION_GRANTED)
    }

    override fun onRequestPermissionsResult(requestCode: Int, permissions: Array<out String>, grantResults: IntArray) {
        super.onRequestPermissionsResult(requestCode, permissions, grantResults)
        when(requestCode) {
            RC_PERMISSION -> {
                var allPermissionsGranted = false
                for (result in grantResults) {
                    if (result != PackageManager.PERMISSION_GRANTED) {
                        allPermissionsGranted = false
                        break
                    } else {
                        allPermissionsGranted = true
                    }
                }
                if (allPermissionsGranted) startCameraSession() else permissionsNotGranted()
            }
        }
    }

    private fun startCameraSession() {
        camera_view.bindToLifecycle(this)
    }

    private fun permissionsNotGranted() {
        AlertDialog.Builder(this).setTitle("Permissions required")
                .setMessage("These permissions are required to use this app. Please allow Camera and Audio permissions first")
                .setCancelable(false)
                .setPositiveButton("Grant") { dialog, which -> requestPermissions() }
                .show()
    }

    private fun recordVideo(videoRecordingFilePath: String) {
        camera_view.startRecording(File(videoRecordingFilePath), ContextCompat.getMainExecutor(this), object: VideoCapture.OnVideoSavedCallback {
            override fun onVideoSaved(file: File) {
                Toast.makeText(this@MainActivity, "Recording Saved", Toast.LENGTH_SHORT).show()
                Log.d(TAG, "onVideoSaved $videoRecordingFilePath")
            }

            override fun onError(videoCaptureError: Int, message: String, cause: Throwable?) {
                Toast.makeText(this@MainActivity, "Recording Failed", Toast.LENGTH_SHORT).show()
                Log.e(TAG, "onError $videoCaptureError $message")
            }
        })
    }

    private fun captureImage(imageCaptureFilePath: String) {
        camera_view.takePicture(File(imageCaptureFilePath), ContextCompat.getMainExecutor(this), object: ImageCapture.OnImageSavedCallback {
            override fun onImageSaved(outputFileResults: ImageCapture.OutputFileResults) {
                Toast.makeText(this@MainActivity, "Image Captured", Toast.LENGTH_SHORT).show()
                Log.d(TAG, "onImageSaved $imageCaptureFilePath")
            }

            override fun onError(exception: ImageCaptureException) {
                Toast.makeText(this@MainActivity, "Image Capture Failed", Toast.LENGTH_SHORT).show()
                Log.e(TAG, "onError $exception")
            }
        })
    }
}
```

### Reference

Here;s the reference for the code used in the example:

| No. | Link |
| --- | --- |
| 1. | [Download](https://github.com/iambaljeet/CameraXView/archive/refs/heads/master.zip) Example |
| 2. | [Browse](https://github.com/iambaljeet/CameraXView) Example |
| 3. | [Visit](https://github.com/iambaljeet) Author |

## 2\. Simple CameraX Java Example

1. First create a class extending AppCompatActivity:

```java
public class MainActivity extends AppCompatActivity {
//...
```

2. Define as instance fields Requestcode, permission and TextureView:

```java
    private int REQUEST_CODE_PERMISSIONS = 10; //arbitrary number, can be changed accordingly
    private final String[] REQUIRED_PERMISSIONS = new String[]{"android.permission.CAMERA","android.permission.WRITE_EXTERNAL_STORAGE"};}; //array w/ permissions from manifest
    TextureView txView;
```

3. Create a method to start the camera:

```java
    private void startCamera() {
        //make sure there isn't another camera instance running before starting
        CameraX.unbindAll();

        /* start preview */
        int aspRatioW = txView.getWidth(); //get width of screen
        int aspRatioH = txView.getHeight(); //get height
        Rational asp = new Rational (aspRatioW, aspRatioH); //aspect ratio
        Size screen = new Size(aspRatioW, aspRatioH); //size of the screen

        //config obj for preview/viewfinder thingy.
        PreviewConfig pConfig = new PreviewConfig.Builder().setTargetAspectRatio(asp).setTargetResolution(screen).build();
        Preview preview = new Preview(pConfig); //lets build it

        preview.setOnPreviewOutputUpdateListener(
                new Preview.OnPreviewOutputUpdateListener() {
                    //to update the surface texture we have to destroy it first, then re-add it
                    @Override
                    public void onUpdated(Preview.PreviewOutput output){
                        ViewGroup parent = (ViewGroup) txView.getParent();
                        parent.removeView(txView);
                        parent.addView(txView, 0);

                        txView.setSurfaceTexture(output.getSurfaceTexture());
                        updateTransform();
                    }
                });

        /* image capture */

        //config obj, selected capture mode
        ImageCaptureConfig imgCapConfig = new ImageCaptureConfig.Builder().setCaptureMode(ImageCapture.CaptureMode.MIN_LATENCY)
                .setTargetRotation(getWindowManager().getDefaultDisplay().getRotation()).build();
        final ImageCapture imgCap = new ImageCapture(imgCapConfig);

        findViewById(R.id.capture_button).setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                File file = new File(Environment.getExternalStorageDirectory() + "/" + System.currentTimeMillis() + ".jpg");
                imgCap.takePicture(file, new ImageCapture.OnImageSavedListener() {
                    @Override
                    public void onImageSaved(@NonNull File file) {
                        String msg = "Photo capture succeeded: " + file.getAbsolutePath();
                        Toast.makeText(getBaseContext(), msg,Toast.LENGTH_LONG).show();
                    }

                    @Override
                    public void onError(@NonNull ImageCapture.UseCaseError useCaseError, @NonNull String message, @Nullable Throwable cause) {
                        String msg = "Photo capture failed: " + message;
                        Toast.makeText(getBaseContext(), msg,Toast.LENGTH_LONG).show();
                        if(cause != null){
                            cause.printStackTrace();
                        }
                    }
                });
            }
        });
 /* image analyser */

        ImageAnalysisConfig imgAConfig = new ImageAnalysisConfig.Builder().setImageReaderMode(ImageAnalysis.ImageReaderMode.ACQUIRE_LATEST_IMAGE).build();
        ImageAnalysis analysis = new ImageAnalysis(imgAConfig);

        analysis.setAnalyzer(
            new ImageAnalysis.Analyzer(){
                @Override
                public void analyze(ImageProxy image, int rotationDegrees){
                    //y'all can add code to analyse stuff here idek go wild.
                }
            });

        //bind to lifecycle:
        CameraX.bindToLifecycle((LifecycleOwner)this, analysis, imgCap, preview);
    }
```

4. Check if permissions have been granted

```java
 private boolean allPermissionsGranted(){
        //check if req permissions have been granted
        for(String permission : REQUIRED_PERMISSIONS){
            if(ContextCompat.checkSelfPermission(this, permission) != PackageManager.PERMISSION_GRANTED){
                return false;
            }
        }
        return true;
    }
```

5. Handle Permission Results

```java

    @Override
    public void onRequestPermissionsResult(int requestCode, @NonNull String[] permissions, @NonNull int[] grantResults) {
        //start camera when permissions have been granted otherwise exit app
        if(requestCode == REQUEST_CODE_PERMISSIONS){
            if(allPermissionsGranted()){
                startCamera();
            } else{
                Toast.makeText(this, "Permissions not granted by the user.", Toast.LENGTH_SHORT).show();
                finish();
            }
        }
    }
```

Special thanks to [@thunderedge](https://github.com/thunderedge) for this example.

[Download example](https://github.com/thunderedge/CameraX/archive/master.zip)

## 3\. Simple CameraX App

This is a translation of the demo provided by [Google codelabs](https://codelabs.developers.google.com/codelabs/camerax-getting-started/) into Java. This example comprises two files:

(a). **LuminosityAnalyzer .java**

Start by creating a file called LuminosityAnalyzer.java. Make it implement `androidx.camera.core.ImageAnalysis.Analyzer` interface.

```java
public class LuminosityAnalyzer implements ImageAnalysis.Analyzer {
```

Create a long instance field to hold the last analyisis timestamp:

```java
private long lastAnalyzedTimestamp = 0L;
```

Create a helper method to extract byte array from image plane buffer:

```java
    /**
     * Helper extension function used to extract a byte array from an
     * image plane buffer
     */
    private byte[] byteBufferToByteArray(ByteBuffer buffer) {
        buffer.rewind();
        byte[] data = new byte[buffer.remaining()];
        buffer.get(data);
        return data;
    }
```

Override the analyze method

```java
    @Override
    public void analyze(ImageProxy image, int rotationDegrees) {
        long currentTimestamp = System.currentTimeMillis();
        // Calculate the average luma no more often than every second
        if (currentTimestamp - lastAnalyzedTimestamp >= TimeUnit.SECONDS.toMillis(1)) {
            // Since format in ImageAnalysis is YUV, image.planes[0]
            // contains the Y (luminance) plane
            ByteBuffer buffer = image.getPlanes()[0].getBuffer();
            // Extract image data from callback object
            byte[] data = byteBufferToByteArray(buffer);
            // Convert the data into an array of pixel values
            // NOTE: this is translated from the following kotlin code, ain't sure about it being right
            // val pixels = data.map { it.toInt() and 0xFF }
            int[] pixels = new int[data.length];
            int pos = 0;
            for (byte b : data) {
                pixels[pos] = b & 0xFF;
                pos++;
            }
            // Compute average luminance for the image
            double luma = Arrays.stream(pixels).average().orElse(Double.NaN);
            // Log the new luma value
            Log.d("CameraXApp", "Average luminosity: " + luma);
            // Update timestamp of last analyzed frame
            lastAnalyzedTimestamp = currentTimestamp;
        }
```

(b)**. MainActivity.java**

Then your main activity:

```java
public class MainActivity extends AppCompatActivity {
    private final static int REQUEST_CODE_PERMISSION = 10;
    private final static String[] REQUIRED_PERMISSIONS = new String[]{Manifest.permission.CAMERA};

    private TextureView viewFinder;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);

        viewFinder = findViewById(R.id.view_finder);
        viewFinder.addOnLayoutChangeListener(new View.OnLayoutChangeListener() {
            @Override
            public void onLayoutChange(View v, int left, int top, int right, int bottom, int oldLeft, int oldTop, int oldRight, int oldBottom) {
                // Every time the provided texture view changes, recompute layout
                updateTransform();
            }
        });
        if (allPermissionsGranted()) {
            viewFinder.post(new Runnable() {
                @Override
                public void run() {
                    startCamera();
                }
            });
        } else {
            ActivityCompat.requestPermissions(
                    this, REQUIRED_PERMISSIONS, REQUEST_CODE_PERMISSION);
        }
    }

    private void updateTransform() {
        Matrix matrix = new Matrix();

        // Compute the center of the view finder
        float centerX = viewFinder.getWidth() / 2;
        float centerY = viewFinder.getHeight() / 2;

        // Correct preview output to account for display rotation
        int rotationDegrees;
        switch (viewFinder.getDisplay().getRotation()) {
            case Surface.ROTATION_0:
                rotationDegrees = 0;
                break;
            case Surface.ROTATION_90:
                rotationDegrees = 90;
                break;
            case Surface.ROTATION_180:
                rotationDegrees = 180;
                break;
            case Surface.ROTATION_270:
                rotationDegrees = 270;
                break;
            default:
                return;
        }
        matrix.postRotate(rotationDegrees, centerX, centerY);

        // Finally, apply transformations to our TextureView
        viewFinder.setTransform(matrix);
    }

    @Override
    public void onRequestPermissionsResult(int requestCode, @NonNull String[] permissions, @NonNull int[] grantResults) {
        if (requestCode == REQUEST_CODE_PERMISSION) {
            if (allPermissionsGranted()) {
                viewFinder.post(new Runnable() {
                    @Override
                    public void run() {
                        startCamera();
                    }
                });
            }
        }
    }

    private void startCamera() {
        // Create configuration object for the viewfinder use case
        PreviewConfig previewConfig = new PreviewConfig.Builder()
                .setTargetAspectRatio(new Rational(1, 1))
                .setTargetResolution(new Size(640, 640))
                .build();

        // Build the viewfinder use case
        Preview preview = new Preview(previewConfig);

        // Everytime the viewfinder is updated, recompute the layout
        preview.setOnPreviewOutputUpdateListener(new Preview.OnPreviewOutputUpdateListener() {
            @Override
            public void onUpdated(Preview.PreviewOutput output) {
                // To update the SurfaceTexture, we have to remove it and re-add it
                ViewGroup parent = (ViewGroup) viewFinder.getParent();
                parent.removeView(viewFinder);
                parent.addView(viewFinder, 0);

                viewFinder.setSurfaceTexture(output.getSurfaceTexture());
                updateTransform();
            }
        });

        // Create configuration object for the image capture use case
        ImageCaptureConfig imageCaptureConfig = new ImageCaptureConfig.Builder()
                .setTargetAspectRatio(new Rational(1, 1))
                .setCaptureMode(ImageCapture.CaptureMode.MIN_LATENCY)
                .build();
        final ImageCapture imageCapture = new ImageCapture(imageCaptureConfig);
        findViewById(R.id.capture_button).setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                File file = new File(getExternalMediaDirs()[0], System.currentTimeMillis() + ".jpg");
                imageCapture.takePicture(file, new ImageCapture.OnImageSavedListener() {
                    @Override
                    public void onImageSaved(@NonNull File file) {
                        Toast.makeText(MainActivity.this, "Photo saved as " + file.getAbsolutePath(), Toast.LENGTH_SHORT).show();
                    }

                    @Override
                    public void onError(@NonNull ImageCapture.ImageCaptureError imageCaptureError, @NonNull String message, @Nullable Throwable cause) {
                        Toast.makeText(MainActivity.this, "Couldn't save photo: " + message, Toast.LENGTH_SHORT).show();
                        if (cause != null)
                            cause.printStackTrace();
                    }
                });
            }
        });

        // Setup image analysis pipeline that computes average pixel luminance
        // TODO add analyzerThread and setCallbackHandler as in the original example in Kotlin
        ImageAnalysisConfig analysisConfig = new ImageAnalysisConfig.Builder()
                .setImageReaderMode(ImageAnalysis.ImageReaderMode.ACQUIRE_LATEST_IMAGE)
                .build();

        // Build the image analysis use case and instantiate our analyzer
        ImageAnalysis imageAnalysis = new ImageAnalysis(analysisConfig);
        imageAnalysis.setAnalyzer(new LuminosityAnalyzer());

        // Bind use cases to lifecycle
        CameraX.bindToLifecycle(this, preview, imageCapture, imageAnalysis);
    }

    private boolean allPermissionsGranted() {
        for (String perm : REQUIRED_PERMISSIONS) {
            if (ContextCompat.checkSelfPermission(getBaseContext(), perm) != PackageManager.PERMISSION_GRANTED) {
                return false;
            }
        }
        return true;
    }
}
```

Special thanks to [@fmmarzoa](https://github.com/fmmarzoa) for this example. Download full code [here](https://github.com/fmmarzoa/CameraXApp/archive/master.zip).

## Kotlin Android CameraX Object Detection Example

This is an android camerax object detection example. This example is written in Kotlin and supports Androidx. This example uses Firebase ML librar for object detection.

![](https://camposha.info/wp-content/uploads/2019/11/camerax-object-detection.png)

### Requirements

This project, because it uses CameraX requires android API Level 21 and above.

### Build.gradle

Go to your app level build.gradle and add dependencies as follows:

```groovy
dependencies {
    implementation "org.jetbrains.kotlin:kotlin-stdlib-jdk7:$kotlin_version"

    implementation "androidx.appcompat:appcompat:1.1.0-alpha05"
    implementation "androidx.core:core-ktx:1.2.0-alpha01"
    implementation "androidx.constraintlayout:constraintlayout:1.1.3"

    implementation "com.google.firebase:firebase-ml-vision:20.0.0"
    implementation "com.google.firebase:firebase-ml-vision-object-detection-model:16.0.0"

    implementation "androidx.camera:camera-core:$camerax_version"
    implementation "androidx.camera:camera-camera2:$camerax_version"
}
```

After adding dependencies apply the google services plugin:

```groovy
apply plugin: "com.google.gms.google-services"
```

### ObjectDetectionAnalyzer

Create a class implementing the ImageAnalysis.Analyzer:

```kotlin
class ObjectDetectionAnalyzer(private val overlay: GraphicOverlay) : ImageAnalysis.Analyzer {
```

The graphic overlay is a custom view object created in the project to overlay the image.

Prepare instance fields:

```kotlin
    @GuardedBy("this")
    private var processingImage: Image? = null

    private val detector: FirebaseVisionObjectDetector

    @GuardedBy("this")
    @FirebaseVisionImageMetadata.Rotation
    var rotation = FirebaseVisionImageMetadata.ROTATION_90

    @GuardedBy("this")
    var scaledWidth = 0

    @GuardedBy("this")
    var scaledHeight = 0
```

NB/= `GuarededBy` is an annotation that denotes that the annotated method or field can only be accessed when holding the referenced lock. Read more [here](https://developer.android.com/reference/android/support/annotation/GuardedBy).

Create an inti to initialize some of our Firebase ML classes:

```kotlin
    init {
```

Inside the `init` initialize the FirebaseVisionObjectDetectorOptions:

```kotlin
        val options = FirebaseVisionObjectDetectorOptions.Builder()
            .setDetectorMode(FirebaseVisionObjectDetectorOptions.STREAM_MODE)
            .enableClassification()
            .build()
```

then FirebaseVisionObjectDetector:

```kotlin
detector = FirebaseVision.getInstance().getOnDeviceObjectDetector(options)
```

Create a method to process the latest frame:

```kotlin
    @Synchronized
    private fun processLatestFrame() {
        val processingImage = processingImage
        if (processingImage != null) {
            val image = FirebaseVisionImage.fromMediaImage(
                processingImage,
                rotation
            )

            when (rotation) {
                FirebaseVisionImageMetadata.ROTATION_0,
                FirebaseVisionImageMetadata.ROTATION_180 -> {
                    overlay.setSize(
                        processingImage.width,
                        processingImage.height,
                        scaledHeight,
                        scaledWidth
                    )
                }
                FirebaseVisionImageMetadata.ROTATION_90,
                FirebaseVisionImageMetadata.ROTATION_270 -> {
                    overlay.setSize(
                        processingImage.height,
                        processingImage.width,
                        scaledWidth,
                        scaledHeight
                    )
                }
            }

            detector.processImage(image)
                .addOnSuccessListener { results ->
                    debugPrint(results)

                    overlay.clear()

                    for (obj in results) {
                        val box = obj.boundingBox

                        val name = "${categoryNames[obj.classificationCategory]}"

                        val confidence =
                            if (obj.classificationCategory != FirebaseVisionObject.CATEGORY_UNKNOWN) {
                                val confidence: Int =
                                    obj.classificationConfidence!!.times(100).toInt()
                                " $confidence%"
                            } else ""

                        overlay.add(BoxData("$name$confidence", box))
                    }

                    this.processingImage = null
                }
                .addOnFailureListener {
                    println("failure")

                    this.processingImage = null
                }
        }
    }
```

Then override the `analyze()` method:

```kotlin
    override fun analyze(imageProxy: ImageProxy, rotationDegrees: Int) {
        val image = imageProxy.image ?: return

        if (processingImage == null) {
            processingImage = image
            processLatestFrame()
        }
    }
```

Special thanks to [@yanzm](https://github.com/yanzm) for creating this project.

Find the whole project in the [download](https://github.com/yanzm/CameraXObjectDetection).
