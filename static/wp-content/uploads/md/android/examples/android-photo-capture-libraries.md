# Best Android Camera photo Capture and ImagePicker Libraries - 2021


Many a times we need to capture images from the android device or pick already captured images via File Picker. In this article, we will explore the best libraries that facilitate these operations.


## (a). Gliger

> Gliger is an Easy, lightweight and high performance image picker library for Android!

Gliger load images using Android content resolver with the help of coroutines to lazy load the images and improve the performance!

Gliger handle permission requests, support camera capture, and limit for the max number of images to pick.

### Step 1: How to Install Gligar

First, be aware that Gligar requires API 17+.

This library is available in **jCenter** which is the default Maven repository used in Android Studio. You can also import this library from source as a module.

```groovy
dependencies {
    // other dependencies here
    implementation 'com.opensooq.supernova:gligar:1.1.0'
}
```

### Step 2: How to Use

To open the image Picker:

### Kotlin

```kotlin
GligarPicker().requestCode(PICKER_REQUEST_CODE).withActivity(this).show()
```

### Java

```java
new GligarPicker().requestCode(PICKER_REQUEST_CODE).withActivity(this).show();
```

To get the result override onActivityResult method:

### Kotlin

```kotlin
    override fun onActivityResult(requestCode: Int, resultCode: Int, data: Intent?) {
        super.onActivityResult(requestCode, resultCode, data)
        if (resultCode != Activity.RESULT_OK) {
            return
        }

        when (requestCode) {
            PICKER_REQUEST_CODE -> {
                val imagesList = data?.extras?.getStringArray(GligarPicker.IMAGES_RESULT)// return list of selected images paths.
                if (!imagesList.isNullOrEmpty()) {
                    imagesCount.text = "Number of selected Images: ${imagesList.size}"
                }
            }
        }
    }
```

### Java

```java
@Override
    protected void onActivityResult(int requestCode, int resultCode, @Nullable Intent data) {
        super.onActivityResult(requestCode, resultCode, data);
        if (resultCode != Activity.RESULT_OK) {
            return;
        }
        switch (requestCode){
            case PICKER_REQUEST_CODE : {
              String pathsList[]= data.getExtras().getStringArray(GligarPicker.IMAGES_RESULT); // return list of selected images paths.
                imagesCount.text = "Number of selected Images: " + pathsList.length;
                break;
            }
        }
    }
```

| Method | usage |
| --- | --- |
| `withActivity(activity: Activity)` | used to set the activity will recive the result |
| `withFragment(fragment: Fragment)` | used to set the fragment will recive the result |
| `requestCode(requestCode: Int)` | used to set the request code for the result |
| `limit(limit: Int)` | used to set the max number of images to select |
| `disableCamera(disableCamera: Boolean)` | by default the value of disableCamera is false, it determine to allow camera captures or not |
| `cameraDirect(cameraDirect: Boolean)` | by default the value of cameraDirect is false, it determine to open the camera before showing the picker or not |

## UI customization

### Customizable Colors

override any color to change inside your project colors.xml

| Property | Description |
| --- | --- |
| `counter_bg` | selection counter background color |
| `counter_color` | selection counter text color |
| `selector_color` | selection tint color |
| `place_holder_color` | empty image holder color |
| `ripple_color` | selection ripple color |
| `toolbar_bg` | toolbar color |
| `done` | Done button color |
| `change_album_color` | change album text color |
| `camera_icon_color` | camera icon color |
| `camera_text_color` | camera text color |
| `permission_alert_bg` | permission alert background color |
| `permission_alert_color` | permission alert text color |

### Customizable Texts

override any string to change inside your project strings.xml

| Property | Description |
| --- | --- |
| `over_limit_msg` | selection limit reached message |
| `capture_new_image` | capture image text |
| `change_album_text` | change album text |
| `permission_storage_never_ask` | permission denied message |
| `all_images` | all images album name |

### Example

**MainActivity.java**

Here's an example that launches for a window that allows us select multiple images from filepicker or capture one from the camera:

```

import android.app.Activity
import android.content.Intent
import android.os.Bundle
import androidx.appcompat.app.AppCompatActivity
import com.opensooq.supernova.gligar.GligarPicker
import kotlinx.android.synthetic.main.activity_main.*

class MainActivity : AppCompatActivity() {

    val PICKER_REQUEST_CODE = 30

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_main)
        GligarPicker().limit(10).disableCamera(false).cameraDirect(false).requestCode(PICKER_REQUEST_CODE)
            .withActivity(this).show()
    }

    override fun onActivityResult(requestCode: Int, resultCode: Int, data: Intent?) {
        super.onActivityResult(requestCode, resultCode, data)
        if (resultCode != Activity.RESULT_OK) {
            return
        }

        when (requestCode) {
            PICKER_REQUEST_CODE -> {
                val imagesList = data?.extras?.getStringArray(GligarPicker.IMAGES_RESULT)
                if (!imagesList.isNullOrEmpty()) {
                    imagesCount.text = "Number of selected Images: ${imagesList.size}"
                }
            }
        }
    }

}
```

### Reference

Find complete source code reference [here](https://github.com/OpenSooq/Gligar).

## (b). EasyImage

> EasyImage allows you to easily capture images and videos from the gallery, camera or documents without creating lots of boilerplate.

### Step 1: How to Install EasyImage

Add it in your root build.gradle at the end of repositories:

```groovy
allprojects {
        repositories {
            ...
            maven { url 'https://jitpack.io' }
        }
    }
```

**Step 2.** Add the dependency

Subproject

```groovy
    dependencies {
            implementation 'com.github.jkwiecien:EasyImage:3.2.0'
    }
```

### Step 2: How to Use EasyImage

#### Runtime permissions

No additional permisions are required if you DO NOT `use setCopyImagesToPublicGalleryFolder()` setting. But if you do:

#### For devices running Android 10 and newer:

Nothing is required

#### For devices running Android 9 or lower:

Permission need to be specified in Manifest:

```xml
<uses-permission android:name="android.permission.WRITE_EXTERNAL_STORAGE" />
```

Also you'll need to ask for this permission in the runtime in the moment of your choice. Sample app does that.

**There is also one issue about runtime permissions**. According to the docs:

```
If your app targets M and above and declares as using the CAMERA permission which is not granted, then attempting to use this action will result in a SecurityException.
```

For this reason, if your app uses `CAMERA` permission, you should check it along **with** `WRITE_EXTERNAL_STORAGE` before calling `EasyImage.openCamera()`

#### Essentials

Create your EasyImageInstance like this:

```java
EasyImage easyImage = new EasyImage.Builder(context)

// Chooser only
// Will appear as a system chooser title, DEFAULT empty string
//.setChooserTitle("Pick media")
// Will tell chooser that it should show documents or gallery apps
//.setChooserType(ChooserType.CAMERA_AND_DOCUMENTS)  you can use this or the one below
//.setChooserType(ChooserType.CAMERA_AND_GALLERY)
// saving EasyImage state (as for now: last camera file link)
.setMemento(memento)

// Setting to true will cause taken pictures to show up in the device gallery, DEFAULT false
.setCopyImagesToPublicGalleryFolder(false)
// Sets the name for images stored if setCopyImagesToPublicGalleryFolder = true
.setFolderName("EasyImage sample")

// Allow multiple picking
.allowMultiple(true)
.build();
```

#### Taking image straight from camera

- `easyImage.openCameraForImage(Activity activity,);`
- `easyImage.openCameraForImage(Fragment fragment);`

#### Capturing video

- `easyImage.openCameraForVideo(Activity activity);`
- `easyImage.openCameraForVideo(Fragment fragment);`

#### Taking image from gallery or the gallery picker if there is more than 1 gallery app

- `easyImage.openGallery(Activity activity);`
- `easyImage.openGallery(Fragment fragment);`

#### Taking image from documents

- `easyImage.openDocuments(Activity activity);`
- `easyImage.openDocuments(Fragment fragment);`

### Displaying system picker to chose from camera, documents, or gallery if no documents apps are available

- `easyImage.openChooser(Activity activity);`
- `easyImage.openChooser(Fragment fragment);`

#### Getting the photo file

```java
    protected void onActivityResult(int requestCode, int resultCode, Intent data) {
        super.onActivityResult(requestCode, resultCode, data);

        easyImage.handleActivityResult(requestCode, resultCode, data, this, new DefaultCallback() {
            @Override
            public void onMediaFilesPicked(MediaFile[] imageFiles, MediaSource source) {
                onPhotosReturned(imageFiles);
            }

            @Override
            public void onImagePickerError(@NonNull Throwable error, @NonNull MediaSource source) {
                //Some error handling
                error.printStackTrace();
            }

            @Override
            public void onCanceled(@NonNull MediaSource source) {
                //Not necessary to remove any files manually anymore
            }
        });
    }
```

### Example

Here's an example of how to use EasyImage

**MainActivity.java**

```

import android.Manifest;
import android.content.Intent;
import android.content.pm.PackageManager;
import android.os.Bundle;
import android.util.Log;
import android.view.View;

import androidx.annotation.NonNull;
import androidx.appcompat.app.AppCompatActivity;
import androidx.core.app.ActivityCompat;
import androidx.core.content.ContextCompat;
import androidx.recyclerview.widget.LinearLayoutManager;
import androidx.recyclerview.widget.RecyclerView;

import java.util.ArrayList;
import java.util.Arrays;

import pl.aprilapps.easyphotopicker.ChooserType;
import pl.aprilapps.easyphotopicker.DefaultCallback;
import pl.aprilapps.easyphotopicker.EasyImage;
import pl.aprilapps.easyphotopicker.MediaFile;
import pl.aprilapps.easyphotopicker.MediaSource;

public class MainActivity extends AppCompatActivity {

    private static final String PHOTOS_KEY = "easy_image_photos_list";
    private static final int CHOOSER_PERMISSIONS_REQUEST_CODE = 7459;
    private static final int CAMERA_REQUEST_CODE = 7500;
    private static final int CAMERA_VIDEO_REQUEST_CODE = 7501;
    private static final int GALLERY_REQUEST_CODE = 7502;
    private static final int DOCUMENTS_REQUEST_CODE = 7503;

    protected RecyclerView recyclerView;

    protected View galleryButton;

    private ImagesAdapter imagesAdapter;

    private ArrayList photos = new ArrayList<>();

    private EasyImage easyImage;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);

        recyclerView = findViewById(R.id.recycler_view);
        galleryButton = findViewById(R.id.gallery_button);

        if (savedInstanceState != null) {
            photos = savedInstanceState.getParcelableArrayList(PHOTOS_KEY);
        }

        imagesAdapter = new ImagesAdapter(this, photos);
        recyclerView.setLayoutManager(new LinearLayoutManager(this));
        recyclerView.setHasFixedSize(true);
        recyclerView.setAdapter(imagesAdapter);

        easyImage = new EasyImage.Builder(this)
                .setChooserTitle("Pick media")
                .setCopyImagesToPublicGalleryFolder(false)
//                .setChooserType(ChooserType.CAMERA_AND_DOCUMENTS)
                .setChooserType(ChooserType.CAMERA_AND_GALLERY)
                .setFolderName("EasyImage sample")
                .allowMultiple(true)
                .build();

        checkGalleryAppAvailability();

        findViewById(R.id.gallery_button).setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View view) {
                /** Some devices such as Samsungs which have their own gallery app require write permission. Testing is advised! */
                String[] necessaryPermissions = new String[]{Manifest.permission.WRITE_EXTERNAL_STORAGE};
                if (arePermissionsGranted(necessaryPermissions)) {
                    easyImage.openGallery(MainActivity.this);
                } else {
                    requestPermissionsCompat(necessaryPermissions, GALLERY_REQUEST_CODE);
                }
            }
        });

        findViewById(R.id.camera_button).setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View view) {
                String[] necessaryPermissions = new String[]{Manifest.permission.CAMERA};
                if (arePermissionsGranted(necessaryPermissions)) {
                    easyImage.openCameraForImage(MainActivity.this);
                } else {
                    requestPermissionsCompat(necessaryPermissions, CAMERA_REQUEST_CODE);
                }
            }
        });

        findViewById(R.id.camera_video_button).setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View view) {
                String[] necessaryPermissions = new String[]{Manifest.permission.CAMERA};
                if (arePermissionsGranted(necessaryPermissions)) {
                    easyImage.openCameraForVideo(MainActivity.this);
                } else {
                    requestPermissionsCompat(necessaryPermissions, CAMERA_VIDEO_REQUEST_CODE);
                }
            }
        });

        findViewById(R.id.documents_button).setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View view) {
                /** Some devices such as Samsungs which have their own gallery app require write permission. Testing is advised! */
                String[] necessaryPermissions = new String[]{Manifest.permission.WRITE_EXTERNAL_STORAGE};
                if (arePermissionsGranted(necessaryPermissions)) {
                    easyImage.openDocuments(MainActivity.this);
                } else {
                    requestPermissionsCompat(necessaryPermissions, DOCUMENTS_REQUEST_CODE);
                }
            }
        });

        findViewById(R.id.chooser_button).setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View view) {
                String[] necessaryPermissions = new String[]{Manifest.permission.CAMERA, Manifest.permission.WRITE_EXTERNAL_STORAGE};
                if (arePermissionsGranted(necessaryPermissions)) {
                    easyImage.openChooser(MainActivity.this);
                } else {
                    requestPermissionsCompat(necessaryPermissions, CHOOSER_PERMISSIONS_REQUEST_CODE);
                }
            }
        });

    }

    @Override
    public void onSaveInstanceState(Bundle outState) {
        super.onSaveInstanceState(outState);
        outState.putSerializable(PHOTOS_KEY, photos);
    }

    private void checkGalleryAppAvailability() {
        if (!easyImage.canDeviceHandleGallery()) {
            //Device has no app that handles gallery intent
            galleryButton.setVisibility(View.GONE);
        }
    }

    @Override
    public void onRequestPermissionsResult(int requestCode, String[] permissions, int[] grantResults) {
        super.onRequestPermissionsResult(requestCode, permissions, grantResults);

        if (requestCode == CHOOSER_PERMISSIONS_REQUEST_CODE && grantResults.length > 0 && grantResults[0] == PackageManager.PERMISSION_GRANTED) {
            easyImage.openChooser(MainActivity.this);
        } else if (requestCode == CAMERA_REQUEST_CODE && grantResults.length > 0 && grantResults[0] == PackageManager.PERMISSION_GRANTED) {
            easyImage.openCameraForImage(MainActivity.this);
        } else if (requestCode == CAMERA_VIDEO_REQUEST_CODE && grantResults.length > 0 && grantResults[0] == PackageManager.PERMISSION_GRANTED) {
            easyImage.openCameraForVideo(MainActivity.this);
        } else if (requestCode == GALLERY_REQUEST_CODE && grantResults.length > 0 && grantResults[0] == PackageManager.PERMISSION_GRANTED) {
            easyImage.openGallery(MainActivity.this);
        } else if (requestCode == DOCUMENTS_REQUEST_CODE && grantResults.length > 0 && grantResults[0] == PackageManager.PERMISSION_GRANTED) {
            easyImage.openDocuments(MainActivity.this);
        }
    }

    @Override
    protected void onActivityResult(int requestCode, int resultCode, Intent data) {
        super.onActivityResult(requestCode, resultCode, data);

        easyImage.handleActivityResult(requestCode, resultCode, data, this, new DefaultCallback() {
            @Override
            public void onMediaFilesPicked(MediaFile[] imageFiles, MediaSource source) {
                for (MediaFile imageFile : imageFiles) {
                    Log.d("EasyImage", "Image file returned: " + imageFile.getFile().toString());
                }
                onPhotosReturned(imageFiles);
            }

            @Override
            public void onImagePickerError(@NonNull Throwable error, @NonNull MediaSource source) {
                //Some error handling
                error.printStackTrace();
            }

            @Override
            public void onCanceled(@NonNull MediaSource source) {
                //Not necessary to remove any files manually anymore
            }
        });
    }

    private void onPhotosReturned(@NonNull MediaFile[] returnedPhotos) {
        photos.addAll(Arrays.asList(returnedPhotos));
        imagesAdapter.notifyDataSetChanged();
        recyclerView.scrollToPosition(photos.size() - 1);
    }

    private boolean arePermissionsGranted(String[] permissions) {
        for (String permission : permissions) {
            if (ContextCompat.checkSelfPermission(this, permission) != PackageManager.PERMISSION_GRANTED)
                return false;

        }
        return true;
    }

    private void requestPermissionsCompat(String[] permissions, int requestCode) {
        ActivityCompat.requestPermissions(MainActivity.this, permissions, requestCode);
    }
}
```

### Reference

Find complete source code reference [here](https://github.com/jkwiecien/EasyImage).
