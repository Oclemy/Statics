# Android storage use cases and best practices

To give users more control over their files and limit file clutter, Android 10 introduced a new storage paradigm for apps called scoped storage. Scoped storage changes the way apps store and access files on a device's external storage. To help you migrate your app to support scoped storage, follow the best practices for common storage use cases that are outlined in this guide. The use cases are organized into two categories: handling media files and handling non-media files.

To learn more about how to store and access files on Android, see the storage training guides.

This section describes some of the common use cases for handling media files (video, image, and audio files) and explains the high-level approach that your app can use. The following table summarizes each of these use cases, and links to the each of sections that contain further details.

### Show image or video files from multiple folders

Query a media collection using the `query()`) API. To filter or sort the media files, adjust the `projection`, `selection`, `selectionArgs`, and `sortOrder` parameters.

### Show images or videos from a particular folder

Use this approach:

1.  Following the best practices outlined in Request App Permissions, request the `READ_EXTERNAL_STORAGE` permission.
2.  Retrieve media files based on the value of `MediaColumns.DATA`, which contains the absolute filesystem path to the media item on disk.

**Note:** When you access an existing media file, you can use the value of the `DATA` column in your logic. That's because this value has a valid file path. However, don't assume that the file is always available. Be prepared to handle any file-based I/O errors that could occur.

To create or update a media file, on the other hand, don't use the `DATA` column. Instead, use the `DISPLAY_NAME` and `RELATIVE_PATH` columns.

### Access location information from photos

If your app uses scoped storage, follow the steps in the Location information in photographs section of the media storage guide.

### Define storage location for new downloads

If your app uses scoped storage, be mindful of the location where you choose to store media files that you download.

If other apps require access to files, consider using well-defined media collections for downloads or document collections.

On Android 11 and higher, the files inside of your external app-specific directory aren't accessible to other apps, even if you use `DownloadManager` to fetch these files.

### Export user media files to a device

Define a proper default location to store user media files:

*   Allow users to choose whether to make their media files readable by other apps or not, using app-specific-storage or shared storage.
*   Allow users to export files from app-specific directories) to a more generally accessible location. Use MediaStore's images, video, and audio collections to export media files to the device's gallery.

### Modify or delete multiple media files in a single operation

Incorporate logic based on the Android versions that your app runs on.

#### Running on Android 11

Use this approach:

1.  Create a pending intent for your app's write or delete request using `MediaStore.createWriteRequest()`) or `MediaStore.createTrashRequest()`) and then prompt the user for permission to edit a set of files by invoking that intent.
2.  Evaluate the user's response:
    
    *   If the permission was granted, proceed with the modify or delete operation.
    *   If the permission wasn't granted, explain to the user why the feature in your app needs the permission.

Learn more about how to manage groups of media files using these methods that are available on Android 11 and higher.

#### Running on Android 10

If your app targets Android 10 (API level 29), opt-out of scoped storage and continue using the approach for Android 9 and lower to perform this operation.

#### Running on Android 9 or lower

Use this approach:

1.  Following the best practices outlined in Request App Permissions, request the `WRITE_EXTERNAL_STORAGE` permission.
2.  Use the `MediaStore` API to modify or delete the media files.

### Import a single image that already exists

When you want to import a single image that already exists (for example, to use as the photo for a user's profile), your app can either use its own UI for the operation, or it can use the system picker.

#### Present your own user interface

Use this approach:

1.  Following the best practices outlined in Request App Permissions, request the `READ_EXTERNAL_STORAGE` permission.
2.  Use the `query()`) API to query a media collection.
3.  Display the results in your app's custom UI.

#### Use the system picker

Use the `ACTION_GET_CONTENT` intent, which asks the user to pick an image to import.

If you want to filter the types of images that the system picker presents to the user to choose from, you can use `setType()`) or `EXTRA_MIME_TYPES`.

### Capture a single image

When you want to capture a single image to use in your app (for example, to use as the photo for a user's profile), use the `ACTION_IMAGE_CAPTURE` intent to ask the user to take a photo using the device's camera. The system stores the captured photo in the `MediaStore.Images` table.

Use the `insert()`) method to add records directly into the MediaStore. For more information, see the Add an item section of the media storage guide.

Use the Android `FileProvider` component, as described in the Setting up file sharing guide.

### Access files from code or libraries that use direct file paths

Incorporate logic based on the Android versions that your app runs on.

#### Running on Android 11

Use this approach:

1.  Following the best practices outlined in Request App Permissions, request the `READ_EXTERNAL_STORAGE` permission.
2.  Access the files using direct file paths.

For more information, see the section about how to open media files using direct file paths.

#### Running on Android 10

If your app targets Android 10 (API level 29), opt-out of scoped storage and continue using the approach for Android 9 and lower to perform this operation.

#### Running on Android 9 or lower

Use this approach:

1.  Following the best practices outlined in Request App Permissions, request the `WRITE_EXTERNAL_STORAGE` permission.
2.  Access the files using direct file paths.

This section describes some of the common use cases for handling non-media files and explains the high-level approach that your app can use. The following table summarizes each of these use cases, and links to the each of sections that contain further details.

### Open a document file

Use the `ACTION_OPEN_DOCUMENT` intent to ask the user to pick a file to open using the system picker. If you want to filter the types of files that the system picker will present to the user to choose from, you can use `setType()`) or `EXTRA_MIME_TYPES`.

For example, you could find all PDF, ODT, and TXT files using the following code:

### Kotlin

```kotlin
startActivityForResult(
        Intent(Intent.ACTION_OPEN_DOCUMENT).apply {
            addCategory(Intent.CATEGORY_OPENABLE)
            type = "*/*"
            putExtra(Intent.EXTRA_MIME_TYPES, arrayOf(
                    "application/pdf", // .pdf
                    "application/vnd.oasis.opendocument.text", // .odt
                    "text/plain" // .txt
            ))
        },
        REQUEST_CODE
      )
```

### Java

```java
Intent intent = new Intent(Intent.ACTION_OPEN_DOCUMENT);
        intent.addCategory(Intent.CATEGORY_OPENABLE);
        intent.setType("*/*");
        intent.putExtra(Intent.EXTRA_MIME_TYPES, new String[] {
                "application/pdf", // .pdf
                "application/vnd.oasis.opendocument.text", // .odt
                "text/plain" // .txt
        });
        startActivityForResult(intent, REQUEST_CODE);
```

### Write to files on secondary storage volumes

Secondary storage volumes include SD cards. You can access information about a given storage volume using the `StorageVolume` class.

Incorporate logic based on the Android version that your app runs on.

#### Running on Android 11

Use this approach:

1.  Use the scoped storage model.
2.  Target Android 10 (API level 29) or lower.
3.  Declare the `WRITE_EXTERNAL_STORAGE` permission.
4.  Perform one of the following types of access:
    *   File access using the `MediaStore` API.
    *   Direct file path access using APIs such as `File` or `fopen()`.

#### Running on older versions

Use the Storage Access Framework, which allows users to select the location on a secondary storage volume where your app can write the file.

### Migrate existing files from a legacy storage location

A directory is considered a _legacy storage location_ if it isn't an app-specific directory or a public shared directory. If your app creates or consumes files in a legacy storage location, we recommend that you migrate your app's files to locations that are accessible with scoped storage and make any necessary app changes to work with files in scoped storage.

#### Maintain access to the legacy storage location for data migration

Your app needs to maintain access to the legacy storage location in order to migrate any app files to locations that are accessible with scoped storage. The approach you should use depends on your app’s target API level.

##### If your app targets Android 11

1.  Set the `preserveLegacyExternalStorage` flag to `true` to preserve the legacy storage model so that your app can migrate a user's data when they upgrade to the new version of your app that targets Android 11.
    
2.  Continue to opt out of scoped storage so that your app can continue to access your files in the legacy storage location on Android 10 devices.
    

##### If your app targets Android 10

Opt out of scoped storage to make it easier to maintain your app's behavior across Android versions.

#### Migrate app data

When your app is ready to migrate, use the following approach:

1.  Target Android 10 or lower.
2.  Opt out of scoped storage so that your app has access to the files that you need to migrate.
3.  Deploy code that uses the `File` API to move files from their current location under `/sdcard/` to a location that's accessible with scoped storage:
    
    1.  Move any private app files to the directory that is returned by the `getExternalFilesDir()`) method.
    2.  Move any shared non-media files to an app-dedicated subdirectory of the `Downloads/` directory.
4.  Remove your app's legacy storage directories from the `/sdcard/` directory.

After users install the new version of your app, they complete the data migration process on their devices. You can monitor the migration process across your user base by creating an analytics event.

After users have migrated their data, publish another update to your app, where you target Android 11.

### Share content with other apps

To share your app's files with a single other app, use a `FileProvider`. For apps that all need to share files between each other, we recommend using a content provider for each app, and then syncing the data as apps are added to the collection.

### Cache non-media files

The approach that you should use depends on the type of files that you need to cache.

*   **Small files or files that contain sensitive information**: Use `Context#getCacheDir()`).
*   **Large files or files that do not contain sensitive information**: Use `Context#getExternalCacheDir()`).

### Export non-media files to a device

Define a proper default location to store non-media files. Allow users to export files from app-specific directories) to a more generally accessible location. Use MediaStore's downloads or document collections to export non-media files to the device.

Temporarily opt-out of scoped storage
-------------------------------------

Before your app is fully compatible with scoped storage, you can temporarily opt out, both in your tests and in your production app.

### Opt out in your tests

On Android 10 (API level 29) and higher, your app's tests run in a storage sandbox by default. This sandbox prevents your app from accessing files outside of the app-specific directory and publicly-shared directories.

If a test outputs files for the host—such as screenshots, debugging data, coverage data, or performance metrics—you can write these files to global directories. To do so, add the following flag to the relevant harness that invokes `am instrument`:

-e no-isolated-storage 1

This flag affects all behavior of the instrumented test case, and it affects all invoked test code. Therefore, when you use this flag, you can't validate your app's compatibility with scoped storage. For test output, it's better to instead write to app-scoped storage that's readable by the shell. You can then pull that app-scoped directory. To determine which directory to pull from, call `getExternalMediaDirs()`).

### Opt out in your production app

If your app targets Android 10 (API level 29) or lower, you can temporarily opt out of scoped storage in your production app. If you target Android 10, however, you need to set the value of `requestLegacyExternalStorage` to `true` in your app's manifest file:

```xml
<manifest ... >
  <!-- This attribute is "false" by default on apps targeting
       Android 10. -->
  <application android:requestLegacyExternalStorage="true" ... >
    ...
  </application>
</manifest>
```

To test how an app targeting Android 10 or lower behaves when using scoped storage, you can opt in to the behavior by setting the value of `requestLegacyExternalStorage` to `false`. If you are testing on a device that runs Android 11, you can also use app compatibility flags to test your app's behavior with or without scoped storage.
