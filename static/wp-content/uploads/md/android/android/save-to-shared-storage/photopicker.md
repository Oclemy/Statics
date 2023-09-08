# Photo picker

![Photo picker dialog appears with media files on your device. Select a photo to share with the app.](https://developer.android.com/static/images/training/data-storage/photo-picker-multiselect.gif)

**Figure 1.** Photo picker provides an intuitive UI for sharing photos with your app.

The photo picker provides a browsable, searchable interface that presents the user with their media library, sorted by date from newest to oldest. This tool provides a safe, built-in way for users to select images and videos, without needing to grant your app access to their entire media library.

The tool updates automatically, offering expanded functionality to your app's users over time without requiring any code changes.

The photo picker is available on devices that meet the following criteria:

*   Run Android 11 (API level 30) or higher
*   Receive changes to Modular System Components through Google System Updates

Add a support library dependency
--------------------------------

To use the photo picker support library, include version 1.6.1 or higher of the `androidx.activity` library.

The support library uses the following activity result contracts to launch the photo picker:

*   `PickVisualMedia`, to select a single image or video.
*   `PickMultipleVisualMedia`, to select multiple images or videos.

If the photo picker isn't available on a device, the support library automatically invokes the `ACTION_OPEN_DOCUMENT` intent action instead. This intent is supported on devices that run Android 4.4 (API level 19) or higher. You can verify whether the photo picker is available on a given device by calling `isPhotoPickerAvailable()`). If you want to customize the photo picker launch behavior, you can also use framework methods to check whether the photo picker is available.

Select a single media item
--------------------------

To select a single media item, use the `PickVisualMedia` activity result contract, as shown in the following code snippet:

### Kotlin

```kotlin
// Registers a photo picker activity launcher in single-select mode.
val pickMedia = registerForActivityResult(PickVisualMedia()) { uri ->
    // Callback is invoked after the user selects a media item or closes the
    // photo picker.
    if (uri != null) {
        Log.d("PhotoPicker", "Selected URI: $uri")
    } else {
        Log.d("PhotoPicker", "No media selected")
    }
}

// Include only one of the following calls to launch(), depending on the types
// of media that you want to allow the user to choose from.

// Launch the photo picker and allow the user to choose images and videos.
pickMedia.launch(PickVisualMediaRequest(PickVisualMedia.ImageAndVideo))

// Launch the photo picker and allow the user to choose only images.
pickMedia.launch(PickVisualMediaRequest(PickVisualMedia.ImageOnly))

// Launch the photo picker and allow the user to choose only videos.
pickMedia.launch(PickVisualMediaRequest(PickVisualMedia.VideoOnly))

// Launch the photo picker and allow the user to choose only images/videos of a
// specific MIME type, such as GIFs.
val mimeType = "image/gif"
pickMedia.launch(PickVisualMediaRequest(PickVisualMedia.SingleMimeType(mimeType)))
```

### Java

```java
// Registers a photo picker activity launcher in single-select mode.
ActivityResultLauncher<PickVisualMediaRequest> pickMedia = 
        registerForActivityResult(new PickVisualMedia(), uri -> {
    // Callback is invoked after the user selects a media item or closes the
    // photo picker.
    if (uri != null) {
        Log.d("PhotoPicker", "Selected URI: " + uri);
    } else {
        Log.d("PhotoPicker", "No media selected");
    }
});

// Include only one of the following calls to launch(), depending on the types
// of media that you want to allow the user to choose from.

// Launch the photo picker and allow the user to choose images and videos.
pickMedia.launch(new PickVisualMediaRequest.Builder()
        .setMediaType(PickVisualMedia.ImageAndVideo.INSTANCE)
        .build());

// Launch the photo picker and allow the user to choose only images.
pickMedia.launch(new PickVisualMediaRequest.Builder()
        .setMediaType(PickVisualMedia.ImageOnly.INSTANCE)
        .build());

// Launch the photo picker and allow the user to choose only videos.
pickMedia.launch(new PickVisualMediaRequest.Builder()
        .setMediaType(PickVisualMedia.VideoOnly.INSTANCE)
        .build());

// Launch the photo picker and allow the user to choose only images/videos of a
// specific MIME type, such as GIFs.
String mimeType = "image/gif";
pickMedia.launch(new PickVisualMediaRequest.Builder()
        .setMediaType(new PickVisualMedia.SingleMimeType(mimeType))
        .build());
```

Select multiple media items
---------------------------

To select multiple media items, set a maximum number of selectable media files, as shown in the following code snippet.

### Kotlin

```kotlin
// Registers a photo picker activity launcher in multi-select mode.
// In this example, the app allows the user to select up to 5 media files.
val pickMultipleMedia =
        registerForActivityResult(PickMultipleVisualMedia(5)) { uris ->
    // Callback is invoked after the user selects media items or closes the
    // photo picker.
    if (uris.isNotEmpty()) {
        Log.d("PhotoPicker", "Number of items selected: ${uris.size}")
    } else {
        Log.d("PhotoPicker", "No media selected")
    }
}

// For this example, launch the photo picker and allow the user to choose images
// and videos. If you want the user to select a specific type of media file,
// use the overloaded versions of launch(), as shown in the section about how
// to select a single media item.
pickMultipleMedia.launch(PickVisualMediaRequest(PickVisualMedia.ImageAndVideo))

### Java

// Registering Photo Picker activity launcher with multiple selects (5 max in this example)
ActivityResultLauncher<PickVisualMediaRequest> pickMultipleMedia =
        registerForActivityResult(new PickMultipleVisualMedia(5), uris -> {
    // Callback is invoked after the user selects media items or closes the
    // photo picker.
    if (!uris.isEmpty()) {
        Log.d("PhotoPicker", "Number of items selected: " + uris.size());
    } else {
        Log.d("PhotoPicker", "No media selected");
    }
});

// For this example, launch the photo picker and allow the user to choose images
// and videos. If you want the user to select a specific type of media file,
// use the overloaded versions of launch(), as shown in the section about how
// to select a single media item.
pickMultipleMedia.launch(new PickVisualMediaRequest.Builder()
        .setMediaType(PickVisualMedia.ImageAndVideo.INSTANCE)
        .build());
```

The platform limits the maximum number of files that you can ask the user to select in the photo picker. To access this limit, call `getPickImagesMaxLimit()`). On devices where the photo picker isn't supported, this limit is ignored.

By default, the system grants your app access to media files until the device is restarted or until your app stops. If your app performs long-running work, such as uploading a large file in the background, you might need this access to be persisted for a longer period of time. To do so, call the `takePersistableUriPermission()`) method:

### Kotlin

```kotlin
val flag = Intent.FLAG_GRANT_READ_URI_PERMISSION
context.contentResolver.takePersistableUriPermission(uri, flag)
```

### Java

```java
int flag = Intent.FLAG_GRANT_READ_URI_PERMISSION;
context.contentResolver.takePersistableUriPermission(uri, flag);
```

Check whether the photo picker is available
-------------------------------------------

The following section describes how you can use a framework library to check whether the photo picker is available on a given device. This workflow allows you to customize the photo picker's launch behavior, and not depend on the support library.

To use the framework-provided version of the photo picker, add the following logic to your app:

### Kotlin

```kotlin
import android.os.ext.SdkExtensions.getExtensionVersion

private fun isPhotoPickerAvailable(): Boolean {
    return if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.TIRAMISU) {
        true
    } else if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.R) {
        getExtensionVersion(Build.VERSION_CODES.R) >= 2
    } else {
        false
    }
}

fun handlePhotoPickerLaunch() {
    if (isPhotoPickerAvailable()) {
        // To launch the system photo picker, invoke an intent that includes the
        // ACTION_PICK_IMAGES action. Consider adding support for the
        // EXTRA_PICK_IMAGES_MAX intent extra.
    } else {
        // Consider implementing fallback functionality so that users can still
        // select images and videos.
    }
}
```

### Java

```java
import android.os.ext.SdkExtensions.getExtensionVersion;

private boolean isPhotoPickerAvailable() {
    if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.TIRAMISU) {
        return true;
    } else if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.R) {
        return getExtensionVersion(Build.VERSION_CODES.R) >= 2;
    } else
        return false;
    }
}

public void handlePhotoPickerLaunch() {
    if (isPhotoPickerAvailable()) {
        // To launch the system photo picker, invoke an intent that includes the
        // ACTION_PICK_IMAGES action. Consider adding support for the
        // EXTRA_PICK_IMAGES_MAX intent extra.
    } else {
        // Consider implementing fallback functionality so that users can still
        // select images and videos.
    }
}
```