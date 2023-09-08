# Android Camera2 Examples - Capture, Pick or Scan

This piece will explore Camera2 examples, simple easy to understand step by step examples. The examples are written in Kotlin or Java and are beginner friendly.


### What is Camera2?

> It is an API defined in the android.hardware package that provides an interface to individual camera devices connected to an Android device.

Camera2 models a camera device as a pipeline, which takes in input requests for capturing a single frame, captures the single image per the request, and then outputs one capture result metadata packet, plus a set of output image buffers for the request.

## Example 1: Camera2 - Capture Photo or Pick

This is dead simple Camera2 example that allows you capture a photo from the camera or pick the image.

### Step 1: Create Project

Start by creating an empty `Android Studio` project.

### Step 2: Dependencies

No special or third party dependency is needed.

### Step 2: Layout

Design your `MainActivity` layout as follows, with an image and a button placed inside a ConstraintLayout:

**activity_main.xml**

```xml
<?xml version="1.0" encoding="utf-8"?>
<androidx.constraintlayout.widget.ConstraintLayout xmlns:android="http://schemas.android.com/apk/res/android"
    xmlns:app="http://schemas.android.com/apk/res-auto"
    xmlns:tools="http://schemas.android.com/tools"
    android:layout_width="match_parent"
    android:layout_height="match_parent"
    tools:context=".MainActivity">

    <ImageView
        android:id="@+id/imageView"
        android:layout_width="168dp"
        android:layout_height="285dp"
        app:layout_constraintBottom_toBottomOf="parent"
        app:layout_constraintEnd_toEndOf="parent"
        app:layout_constraintHorizontal_bias="0.497"
        app:layout_constraintStart_toStartOf="parent"
        app:layout_constraintTop_toTopOf="parent"
        app:layout_constraintVertical_bias="0.316"
         />

    <Button
        android:id="@+id/button"
        android:layout_width="wrap_content"
        android:layout_height="wrap_content"
        android:onClick="onCapture"
        android:text="Capture"
        app:layout_constraintBottom_toBottomOf="parent"
        app:layout_constraintEnd_toEndOf="parent"
        app:layout_constraintHorizontal_bias="0.498"
        app:layout_constraintStart_toStartOf="parent"
        app:layout_constraintTop_toBottomOf="@+id/imageView"
        app:layout_constraintVertical_bias="0.369" />
</androidx.constraintlayout.widget.ConstraintLayout>
```

### Step 3: Write Code

We have only Activity, our `MainActivity`. Go ahead and add imports:

```java
import androidx.appcompat.app.AppCompatActivity;

import android.content.Intent;
import android.graphics.Bitmap;
import android.hardware.camera2.CaptureRequest;
import android.os.Bundle;
import android.provider.MediaStore;
import android.view.View;
import android.widget.ImageView;
```

Extend the `AppCompatActivity`:

```java
public class MainActivity extends AppCompatActivity {
```

Then define a function to capture:

```java
    public void onCapture(View view){

        Intent takePictureIntent = new Intent(MediaStore.ACTION_IMAGE_CAPTURE);
        if(takePictureIntent.resolveActivity(getPackageManager())!=null) {
            startActivityForResult(takePictureIntent, REQUEST_IMAGE_CAPTURE);
        }
    }
```

Here is the full code:

**MainActivity.java**

```java
package com.example.androidbootcamp;

import androidx.appcompat.app.AppCompatActivity;

import android.content.Intent;
import android.graphics.Bitmap;
import android.hardware.camera2.CaptureRequest;
import android.os.Bundle;
import android.provider.MediaStore;
import android.view.View;
import android.widget.ImageView;

public class MainActivity extends AppCompatActivity {

    ImageView imageView;
    static final int REQUEST_IMAGE_CAPTURE = 1;
    public void onCapture(View view){

        Intent takePictureIntent = new Intent(MediaStore.ACTION_IMAGE_CAPTURE);
        if(takePictureIntent.resolveActivity(getPackageManager())!=null) {
            startActivityForResult(takePictureIntent, REQUEST_IMAGE_CAPTURE);
        }
    }
    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);
        imageView = findViewById(R.id.imageView);

    }
    @Override
    protected void onActivityResult(int requestCode, int resultCode, Intent data) {
        if (requestCode == REQUEST_IMAGE_CAPTURE && resultCode == RESULT_OK) {
            Bundle extras = data.getExtras();
            Bitmap imageBitmap = (Bitmap) extras.get("data");
            imageView.setImageBitmap(imageBitmap);
        }
    }
}
```

### Run

Copy the code or download it in the link below, build and run.

### Reference

Here are the reference links:

| Number | Link |
| --- | --- |
| 1. | [Download](https://github.com/Sarthak2601/CameraDemo2/archive/refs/heads/master.zip) Example |
| 2. | [Follow](https://github.com/Sarthak2601/) code author |

## Example 2: How to Capture Photo and Scan QR Code using Camera2

This example will teach you how to capture photo using camera2. You will also learn how to scan QR Code using the same package.

### Step 1: Dependencies

Camera2 itself, as we said is defined in the android.hardware package which is a standard sdk package. However to enable scanning of the QR Code include the following libraries in your dependencies closure in the app level gradle file:

```groovy
    implementation 'com.journeyapps:zxing-android-embedded:3.6.0'
    implementation 'com.google.zxing:core:3.3.2'
```

### Step 2: Add Permissions

In the android manifest add the following `use-feature` statements:

```xml
    <uses-feature
        android:name="android.hardware.camera"
        android:required="true" />
    <uses-feature
        android:name="android.hardware.camera.level.full"
        android:required="false" />
    <uses-feature android:name="android.hardware.camera.autofocus" />
```

Then add the permissions for accessing the camera, reading from and writing to external storage:

```xml
    <uses-permission android:name="android.permission.CAMERA" />
    <uses-permission android:name="android.permission.READ_EXTERNAL_STORAGE" />
    <uses-permission android:name="android.permission.WRITE_EXTERNAL_STORAGE" />
```

### Step 3: Design Layouts

Start by designing the layout for the main activity. This will provide buttons for initiating Camera actions like capturing a photo or scanning the qr code:

**activity_main.xml**

```xml
<?xml version="1.0" encoding="utf-8"?>
<layout xmlns:android="http://schemas.android.com/apk/res/android"
    xmlns:app="http://schemas.android.com/apk/res-auto"
    xmlns:tools="http://schemas.android.com/tools">

    <data>
        <variable
            name="userAction"
            type="com.mili.camera2api.UserAction" />

        <variable
            name="scannedData"
            type="String" />
    </data>

    <LinearLayout
        android:layout_width="match_parent"
        android:layout_height="match_parent"
        android:orientation="vertical"
        android:gravity="center"
        tools:context=".MainActivity">

        <com.google.android.material.button.MaterialButton
            android:id="@+id/btn_scan"
            android:layout_width="wrap_content"
            android:layout_height="wrap_content"
            android:text="@string/scan_qr_code"
            app:strokeColor="@color/colorAccent"
            android:onClick="@{() -> userAction.onScanQRCode()}"
            app:strokeWidth="6dp"
            android:layout_margin="8dp"/>

        <com.google.android.material.button.MaterialButton
            android:id="@+id/btn_click_photo"
            android:layout_width="wrap_content"
            android:layout_height="wrap_content"
            android:text="@string/click_photo"
            app:strokeColor="@color/colorAccent"
            android:onClick="@{() -> userAction.onClickPhoto()}"
            app:strokeWidth="6dp"
            android:layout_margin="8dp"/>

        <com.google.android.material.textfield.TextInputLayout
            android:layout_width="match_parent"
            android:layout_height="wrap_content"
            android:hint="Scanned Code Data"
            style="@style/Widget.MaterialComponents.TextInputLayout.OutlinedBox.Dense"
            android:layout_margin="32dp">

            <com.google.android.material.textfield.TextInputEditText
                android:layout_width="match_parent"
                android:layout_height="wrap_content"
                android:id="@+id/et_scanned_data"
                android:text="@{scannedData}"
                android:enabled="false"/>

        </com.google.android.material.textfield.TextInputLayout>

    </LinearLayout>
</layout>
```

The Camera activity is customizable. For example you can include buttons to save or delete the photo. Here is the camera activity layout:

**activity_camera.xml**

```xml
<?xml version="1.0" encoding="utf-8"?>
<androidx.constraintlayout.widget.ConstraintLayout xmlns:android="http://schemas.android.com/apk/res/android"
    xmlns:app="http://schemas.android.com/apk/res-auto"
    xmlns:tools="http://schemas.android.com/tools"
    android:layout_width="match_parent"
    android:layout_height="match_parent"
    tools:context=".CameraActivity">

    <com.mili.camera2api.AutoFitTextureView
        android:id="@+id/texture"
        android:layout_width="0dp"
        android:layout_height="0dp"
        app:layout_constraintBottom_toTopOf="@id/gl_divider"
        app:layout_constraintEnd_toEndOf="parent"
        app:layout_constraintStart_toStartOf="parent"
        app:layout_constraintTop_toTopOf="parent" />

    <ImageView
        android:id="@+id/ig_photo_preview"
        android:layout_width="0dp"
        android:layout_height="0dp"
        app:layout_constraintBottom_toTopOf="@id/gl_divider"
        app:layout_constraintEnd_toEndOf="parent"
        app:layout_constraintStart_toStartOf="parent"
        app:layout_constraintTop_toTopOf="parent" />

    <androidx.constraintlayout.widget.Guideline
        android:id="@+id/gl_divider"
        android:layout_width="wrap_content"
        android:layout_height="wrap_content"
        android:orientation="horizontal"
        app:layout_constraintGuide_percent="0.9" />

    <androidx.constraintlayout.widget.Group
        android:layout_width="wrap_content"
        android:layout_height="wrap_content"
        android:id="@+id/gp_save_retry"
        android:visibility="gone"
        app:constraint_referenced_ids="btn_retry_take_photo,btn_delete,ig_photo_preview"/>

    <androidx.constraintlayout.widget.Group
        android:layout_width="wrap_content"
        android:layout_height="wrap_content"
        android:id="@+id/gp_take_photo"
        android:visibility="visible"
        app:constraint_referenced_ids="btn_takepicture,texture"/>

    <ImageButton
        android:id="@+id/btn_takepicture"
        android:layout_width="wrap_content"
        android:layout_height="wrap_content"
        android:layout_margin="8dp"
        android:background="@android:color/transparent"
        android:src="@drawable/ic_photo_camera_black_24dp"
        app:layout_constraintBottom_toBottomOf="parent"
        app:layout_constraintEnd_toStartOf="@id/btn_delete"
        app:layout_constraintHorizontal_chainStyle="spread"
        app:layout_constraintStart_toEndOf="@id/btn_retry_take_photo"
        android:clickable="true"
        android:focusable="true"
        app:layout_constraintTop_toBottomOf="@id/texture" />

    <ImageButton
        android:id="@+id/btn_retry_take_photo"
        android:layout_width="wrap_content"
        android:layout_height="wrap_content"
        app:layout_constraintBottom_toBottomOf="parent"
        android:src="@drawable/ic_refresh_black"
        app:layout_constraintEnd_toStartOf="@+id/btn_takepicture"
        app:layout_constraintStart_toStartOf="parent"
        android:background="@android:color/transparent"
        app:layout_constraintHorizontal_chainStyle="spread"
        android:layout_margin="8dp"
        android:clickable="true"
        android:focusable="true"
        app:layout_constraintTop_toTopOf="@id/gl_divider"
        />

    <ImageButton
        android:id="@+id/btn_delete"
        android:layout_width="wrap_content"
        android:layout_height="wrap_content"
        android:src="@drawable/ic_delete_forever_black_24dp"
        app:layout_constraintBottom_toBottomOf="parent"
        app:layout_constraintEnd_toEndOf="parent"
        android:background="@android:color/transparent"
        app:layout_constraintHorizontal_chainStyle="spread"
        android:layout_margin="8dp"
        android:clickable="true"
        android:focusable="true"
        app:layout_constraintStart_toEndOf="@id/btn_takepicture"
        app:layout_constraintTop_toTopOf="@+id/gl_divider" />

</androidx.constraintlayout.widget.ConstraintLayout>
```

### Step 4: Create Event Handlers

Create a class to contain event handlers raised when the user captures a photo or scans the QR Code:

```java
public interface UserAction {

    void onClickPhoto();
    void onScanQRCode();
}
```

### Step 4: Create Helper methods

Now create a set of static helper methods you will use:

```java
package com.mili.camera2api;

import android.util.Patterns;

import org.json.JSONException;
import org.json.JSONObject;

class HelperClass {

    static boolean isDataOfTypeNumber(String data) {
        try {
            Double.parseDouble(data);
            return true;
        } catch (NumberFormatException e) {
            e.printStackTrace();
            return false;
        }
    }

    static boolean isDataOfTypeJson(String data) {
        try {
            new JSONObject(data);
            return true;
        } catch (JSONException e) {
            return false;
        }
    }

    static boolean isDataAnUrl(String data) {
        return android.util.Patterns.WEB_URL.matcher(data).matches();
    }

    static boolean isDataAnEmailId(String data) {
        return Patterns.EMAIL_ADDRESS.matcher(data).matches();
    }

}
```

### Step 6: Create a custom TextureView

The camera frame will be defined by the following custom textureview. This will be place in the camera layout:

**AutoFitTextureView.java**

```java
import android.content.Context;
import android.util.AttributeSet;
import android.view.TextureView;

public class AutoFitTextureView extends TextureView {

    private int mRatioWidth = 0;
    private int mRatioHeight = 0;

    public AutoFitTextureView(Context context) {
        this(context, null);
    }

    public AutoFitTextureView(Context context, AttributeSet attrs) {
        this(context, attrs, 0);
    }

    public AutoFitTextureView(Context context, AttributeSet attrs, int defStyle) {
        super(context, attrs, defStyle);
    }

    /**
     * Sets the aspect ratio for this view. The size of the view will be measured based on the ratio
     * calculated from the parameters. Note that the actual sizes of parameters don't matter, that
     * is, calling setAspectRatio(2, 3) and setAspectRatio(4, 6) make the same result.
     *
     * @param width  Relative horizontal size
     * @param height Relative vertical size
     */
    public void setAspectRatio(int width, int height) {
        if (width < 0 || height < 0) {
            throw new IllegalArgumentException("Size cannot be negative.");
        }
        mRatioWidth = width;
        mRatioHeight = height;
        requestLayout();
    }

    @Override
    protected void onMeasure(int widthMeasureSpec, int heightMeasureSpec) {
        super.onMeasure(widthMeasureSpec, heightMeasureSpec);
        int width = MeasureSpec.getSize(widthMeasureSpec);
        int height = MeasureSpec.getSize(heightMeasureSpec);
        if (0 == mRatioWidth || 0 == mRatioHeight) {
            setMeasuredDimension(width, height);
        } else {
            if (width < height * mRatioWidth / mRatioHeight) {
                setMeasuredDimension(width, width * mRatioHeight / mRatioWidth);
            } else {
                setMeasuredDimension(height * mRatioWidth / mRatioHeight, height);
            }
        }
    }
}
```

### Step 7: Create a Base activity

Now create a base activity from which the other activities will be inheriting. For example checking and handling runtime permissions are needed in both the camera photo capture activity as well as the QR Code scanning activity. So it makes sense to define it here:

**BaseActivity.java**

```java
import android.Manifest;
import android.content.pm.PackageManager;
import android.os.Build;
import android.util.Log;

import androidx.annotation.NonNull;
import androidx.appcompat.app.AppCompatActivity;
import androidx.core.content.ContextCompat;

public abstract class BaseActivity extends AppCompatActivity {

    protected static final int REQUEST_CAMERA = 100;
    private static final String TAG = "BaseActivity";

    protected boolean checkCameraPermission() {
        return Build.VERSION.SDK_INT < Build.VERSION_CODES.M || ContextCompat.checkSelfPermission(this, Manifest.permission.CAMERA) == PackageManager.PERMISSION_GRANTED;
    }

    @Override
    public void onRequestPermissionsResult(int requestCode, @NonNull String[] permissions, @NonNull int[] grantResults) {
        super.onRequestPermissionsResult(requestCode, permissions, grantResults);
        if(requestCode == REQUEST_CAMERA && grantResults.length > 0 && grantResults[0] == PackageManager.PERMISSION_GRANTED) {
            Log.d(TAG, "onRequestPermissionsResult: permission granted");
        } else {
            checkCameraPermission();
        }
    }
}
```

### Step 7: Create a Photo Capture Activity

This class will be responsible for capturing photo using the Camera2 API. It is created by extending the base activity so that we can inherit the runtime permission capabilities:

```java
public class CameraActivity extends BaseActivity {
```

A SparseIntArray will be created to contain the orientations:

```java
    private static final SparseIntArray ORIENTATIONS = new SparseIntArray();
```

Then surafce rotation angles will be appended to the Orientations sparse int array:

```java
    static {
        ORIENTATIONS.append(Surface.ROTATION_0, 90);
        ORIENTATIONS.append(Surface.ROTATION_90, 0);
        ORIENTATIONS.append(Surface.ROTATION_180, 270);
        ORIENTATIONS.append(Surface.ROTATION_270, 180);
    }
```

This method will be used to create a camera preview session:

```java
    private void createCameraPreviewSession() {
        try {
            SurfaceTexture texture = textureView.getSurfaceTexture();

            // We configure the size of default buffer to be the size of camera preview we want.
            texture.setDefaultBufferSize(previewSize.getWidth(), previewSize.getHeight());

            // This is the output Surface we need to start preview.
            Surface surface = new Surface(texture);

            // We set up a CaptureRequest.Builder with the output Surface.
            captureRequestBuilder
                    = cameraDevice.createCaptureRequest(CameraDevice.TEMPLATE_PREVIEW);
            captureRequestBuilder.addTarget(surface);

            // Here, we create a CameraCaptureSession for camera preview.
            cameraDevice.createCaptureSession(Arrays.asList(surface, imageReader.getSurface()),
                    new CameraCaptureSession.StateCallback() {

                        @Override
                        public void onConfigured(@NonNull CameraCaptureSession cameraCaptureSession) {
                            // The camera is already closed
                            if (cameraDevice == null) {
                                return;
                            }

                            // When the session is ready, we start displaying the preview.
                            cameraCaptureSessions = cameraCaptureSession;
                            try {
                                // Auto focus should be continuous for camera preview.
                                captureRequestBuilder.set(CaptureRequest.CONTROL_AF_MODE,
                                        CaptureRequest.CONTROL_AF_MODE_AUTO);
                                // Flash is automatically enabled when necessary.
                                setAutoFlash(captureRequestBuilder);

                                // Finally, we start displaying the camera preview.
                                captureRequest = captureRequestBuilder.build();
                                cameraCaptureSessions.setRepeatingRequest(captureRequest,
                                        captureCallbackListener, mBackgroundHandler);
                            } catch (CameraAccessException e) {
                                e.printStackTrace();
                            }
                        }

                        @Override
                        public void onConfigureFailed(
                                @NonNull CameraCaptureSession cameraCaptureSession) {
                            Log.d(TAG, "onConfigureFailed: failed");
                        }
                    }, null
            );
        } catch (CameraAccessException e) {
            e.printStackTrace();
        }
    }
```

Here is how you open the camera:

```java
    private void openCamera(int width, int height) {
        setUpCameraOutputs(width, height);
        configureTransform(width, height);
        CameraManager manager = (CameraManager) getSystemService(Context.CAMERA_SERVICE);
        Log.e(TAG, "is camera open");
        try {
            if (!cameraOpenCloseLockSemaphore.tryAcquire(2500, TimeUnit.MILLISECONDS)) {
                throw new RuntimeException("Time out waiting to lock camera opening.");
            }

            if (checkCameraPermission()) {
                manager.openCamera(cameraId, stateCallback, mBackgroundHandler);
            } else {
                requestPermissions(new String[]{Manifest.permission.CAMERA}, REQUEST_CAMERA);
            }
        } catch (CameraAccessException e) {
            e.printStackTrace();
        } catch (InterruptedException e) {
            throw new RuntimeException("Interrupted while trying to lock camera opening.", e);
        }
        Log.e(TAG, "openCamera X");
    }
```

And here is how you close the camera:

```java
    private void closeCamera() {
        try {
            cameraOpenCloseLockSemaphore.acquire();
            if (cameraCaptureSessions != null) {
                cameraCaptureSessions.close();
                cameraCaptureSessions = null;
            }
            if (cameraDevice != null) {
                cameraDevice.close();
                cameraDevice = null;
            }
            if (imageReader != null) {
                imageReader.close();
                imageReader = null;
            }
        } catch (InterruptedException e) {
            throw new RuntimeException("Interrupted while trying to lock camera closing.", e);
        } finally {
            cameraOpenCloseLockSemaphore.release();
        }
    }
```

To capture a still image, the first step is to lock the focus as follows:

```java
    private void lockFocus() {
        try {
            // This is how to tell the camera to lock focus.
            captureRequestBuilder.set(CaptureRequest.CONTROL_AF_TRIGGER,
                    CameraMetadata.CONTROL_AF_TRIGGER_START);
            // Tell #mCaptureCallback to wait for the lock.
            mState = STATE_WAITING_LOCK;
            cameraCaptureSessions.capture(captureRequestBuilder.build(), captureCallbackListener,
                    mBackgroundHandler);
        } catch (CameraAccessException e) {
            e.printStackTrace();
        }
    }
```

Then to capture the still image, simply invoke the `lockFocus()` method above;

```java
    private void takePicture() {
        lockFocus();
    }
```

### Step 8: Create A Scan Activity

It is an empty activity, yes an activity, but it derives fromthe `CaptureActivity`. The only reason to create this activity is to make sure the qr code is in portrait mode and CaptureActivity is part of com.journeyapps.barcodescanner lib. As we cannot access CaptureActivity and set it to portrait we can use this approach:

**ScanActivity.java**

```java
import com.journeyapps.barcodescanner.CaptureActivity;

public class ScanActivity extends CaptureActivity {

}
```

### Step 9: Create MainActivity

Finally wrap everything inside the main activity:

**MainActivity.java**

```java
public class MainActivity extends BaseActivity implements UserAction {

    IntentIntegrator scanIntent;
    ActivityMainBinding binding;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        binding  = DataBindingUtil.setContentView(this,R.layout.activity_main);
        getSupportActionBar().show();
        binding.setUserAction(this);
        checkCameraPermission();
    }

    @Override
    public void onClickPhoto() {
        Intent clickPhoto = new Intent(this, CameraActivity.class);
        startActivity(clickPhoto);
    }

    @Override
    public void onScanQRCode() {
        scanIntent = new IntentIntegrator(this);
        scanIntent.setCaptureActivity(ScanActivity.class);
        scanIntent.setBeepEnabled(true);
        scanIntent.setPrompt(getString(R.string.qr_code_scan_instruction));
        scanIntent.initiateScan();
    }

    @Override
    protected void onActivityResult(int requestCode, int resultCode, @Nullable Intent data) {
        super.onActivityResult(requestCode, resultCode, data);
        IntentResult result = IntentIntegrator.parseActivityResult(requestCode, resultCode, data);
        if (result != null) {
            if (result.getContents() == null) {
                Snackbar.make(binding.getRoot(), getResources().getString(R.string.code_not_scanned), Snackbar.LENGTH_LONG).show();
            } else {
                String dataInQrCode = result.getContents();
                binding.setScannedData(formatContentBasedOnData(dataInQrCode));
            }
        }

    }

    private String formatContentBasedOnData(String dataInQrCode) {
        StringBuilder builder = new StringBuilder();
        if (isDataOfTypeNumber(dataInQrCode)) {
            builder.append("Data in QR is a Number: \n").append(dataInQrCode);
            return builder.toString();
        } else if (isDataOfTypeJson(dataInQrCode)) {
            builder.append("Data in QR is a JSON Object: \n").append(dataInQrCode);
            return builder.toString();
        } else if (isDataAnEmailId(dataInQrCode)) {
            builder.append("Data in QR is an Email Id: \n").append(dataInQrCode);
            return builder.toString();
        } else if (isDataAnUrl(dataInQrCode)) {
            builder.append("Data in QR is an URL: \n").append(dataInQrCode);
            return builder.toString();
        } else {
            builder.append("Data in QR is a Normal Text: \n").append(dataInQrCode);
            return builder.toString();
        }
        // we can add more option if required
    }
}
```

### Run

Run the project and you will get the following:

![Camera2 App](https://camo.githubusercontent.com/9ae07d350ade7cca1d88edc3d904df05a21f2285d44b0bd5f9139c1adf5f444c/68747470733a2f2f6c68332e676f6f676c6575736572636f6e74656e742e636f6d2f2d6141524a31475a6b7849592f58643076675077534b48492f4141414141414141487a592f707536566466485f74686f4b79754e453356375a6e644c577968744f6976345651434b38424741735948672f73302f323031392d31312d32362e6a7067)

Here is the demo of the QR Code scan using camera2:

![Camera2 Scan QR Code](https://camo.githubusercontent.com/92d8feaef2eed300bb8a741b661364ac5b0a90f14f33b65ca29cdb86946de877/68747470733a2f2f6c68332e676f6f676c6575736572636f6e74656e742e636f6d2f2d6233416f4f755f635453302f58643076643348717a6b492f4141414141414141487a512f395a6451314251552d4777704333314b627a77763158396c57675a695348347377434b38424741735948672f73302f323031392d31312d32362e6a7067)

Here is the data contained in the QR Code:

![Scanned Code data](https://camo.githubusercontent.com/92504c3690d18b4d72d90091571a4a2d9cc3f0820013630edcea29a7092ae6f1/68747470733a2f2f6c68332e676f6f676c6575736572636f6e74656e742e636f6d2f2d334635696c4b34787445412f58643076627352526430492f4141414141414141487a492f6a7a5a5a7252794675566f77676e6951434e32324e35717845314a6a466c663451434b38424741735948672f73302f323031392d31312d32362e6a7067)

Here is the photo capture demo:

![Capture Image using camera2](https://camo.githubusercontent.com/ed55884125886ad1c2d8cb883edad5528dff2c3b350013d61bcc707e64861329/68747470733a2f2f6c68332e676f6f676c6575736572636f6e74656e742e636f6d2f2d6b37434a727134616179552f58643079304f73685630492f4141414141414141487a302f54305f774a535f4a7239454376346931735369425856315a35535f462d46555151434b38424741735948672f73302f323031392d31312d32362e6a7067)

### Reference

Find the download link below:

| No. | Link |
| --- | --- |
| 1. | [Download](https://github.com/manoj-mili/camera-2-basics/archive/refs/heads/master.zip) Code |
| 2. | [Browse](https://github.com/manoj-mili/camera-2-basics/) Code |
| 3. | [Follow](https://github.com/manoj-mili/) Code Author |
