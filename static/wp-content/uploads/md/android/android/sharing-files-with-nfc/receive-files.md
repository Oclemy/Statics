# Receiving Files from Another Device with NFC

Android Beam file transfer copies files to a special directory on the receiving device. It also scans the copied files using the Android Media Scanner and adds entries for media files to the `MediaStore` provider. This lesson shows you how to respond when the file copy is complete, and how to locate the copied files on the receiving device.

Respond to a request to display data
------------------------------------

When Android Beam file transfer finishes copying files to the receiving device, it posts a notification containing an `Intent` with the action `ACTION_VIEW`, the MIME type of the first file that was transferred, and a URI that points to the first file. When the user clicks the notification, this intent is sent out to the system. To have your app respond to this intent, add an `<intent-filter>` element for the `<activity>` element of the `Activity` that should respond. In the `<intent-filter>` element, add the following child elements:

`<action android:name="android.intent.action.VIEW" />`

Matches the `ACTION_VIEW` intent sent from the notification.

`<category android:name="android.intent.category.CATEGORY_DEFAULT" />`

Matches an `Intent` that doesn't have an explicit category.

`<data android:mimeType="mime-type" />`

Matches a MIME type. Specify only those MIME types that your app can handle.

For example, the following snippet shows you how to add an intent filter that triggers the activity `com.example.android.nfctransfer.ViewActivity`:

```xml
    <activity
        android:name="com.example.android.nfctransfer.ViewActivity"
        android:label="Android Beam Viewer" >
        ...
        <intent-filter>
            <action android:name="android.intent.action.VIEW"/>
            <category android:name="android.intent.category.DEFAULT"/>
            ...
        </intent-filter>
    </activity>
```

> **Note:** Android Beam file transfer is not the only source of an `ACTION_VIEW` intent. Other apps on the receiving device can also send an `Intent` with this action. Handling this situation is discussed in the section Get the directory from a content URI.

Request file permissions
------------------------

To read files that Android Beam file transfer copies to the device, request the permission `READ_EXTERNAL_STORAGE`. For example:

```xml
    <uses-permission android:name="android.permission.READ_EXTERNAL_STORAGE" />
```

> **Note:** As of Android 10 (API level 29), you don't need to request the `READ_EXTERNAL_STORAGE` permission to view the files that Android Beam has transferred onto the device.

Since your app has control over its internal storage area, you don't need to request write permission to copy a transferred file to your internal storage area.

Get the directory for copied files
----------------------------------

Android Beam file transfer copies all the files in a single transfer to one directory on the receiving device. The URI in the content `Intent` sent by the Android Beam file transfer notification points to the first transferred file. However, your app may also receive an `ACTION_VIEW` intent from a source other than Android Beam file transfer. To determine how you should handle the incoming `Intent`, you need to examine its scheme and authority.

To get the scheme for the URI, call `Uri.getScheme()`. The following code snippet shows you how to determine the scheme and handle the URI accordingly:

### Kotlin

```kotlin
class MainActivity : Activity() {
    ...
    // A File object containing the path to the transferred files
    private var parentPath: File? = null
    ...
    /*
     * Called from onNewIntent() for a SINGLE_TOP Activity
     * or onCreate() for a new Activity. For onNewIntent(),
     * remember to call setIntent() to store the most
     * current Intent
     *
     */
    private fun handleViewIntent() {
        ...
        /*
         * For ACTION_VIEW, the Activity is being asked to display data.
         * Get the URI.
         */
        if (TextUtils.equals(intent.action, Intent.ACTION_VIEW)) {
            // Get the URI from the Intent
            intent.data?.also { beamUri ->
                /*
                 * Test for the type of URI, by getting its scheme value
                 */
                parentPath = when (beamUri.scheme) {
                    "file" -> handleFileUri(beamUri)
                    "content" -> handleContentUri(beamUri)
                    else -> null
                }
            }
        }
        ...
    }
    ...
}
```

### Java

```java
public class MainActivity extends Activity {
    ...
    // A File object containing the path to the transferred files
    private File parentPath;
    // Incoming Intent
    private Intent intent;
    ...
    /*
     * Called from onNewIntent() for a SINGLE_TOP Activity
     * or onCreate() for a new Activity. For onNewIntent(),
     * remember to call setIntent() to store the most
     * current Intent
     *
     */
    private void handleViewIntent() {
        ...
        // Get the Intent action
        intent = getIntent();
        String action = intent.getAction();
        /*
         * For ACTION_VIEW, the Activity is being asked to display data.
         * Get the URI.
         */
        if (TextUtils.equals(action, Intent.ACTION_VIEW)) {
            // Get the URI from the Intent
            Uri beamUri = intent.getData();
            /*
             * Test for the type of URI, by getting its scheme value
             */
            if (TextUtils.equals(beamUri.getScheme(), "file")) {
                parentPath = handleFileUri(beamUri);
            } else if (TextUtils.equals(
                    beamUri.getScheme(), "content")) {
                parentPath = handleContentUri(beamUri);
            }
        }
        ...
    }
    ...
}
```

### Get the directory from a file URI

If the incoming `Intent` contains a file URI, the URI contains the absolute file name of a file, including the full directory path and file name. For Android Beam file transfer, the directory path points to the location of the other transferred files, if any. To get the directory path, get the path part of the URI, which contains all of the URI except the `file:` prefix. Create a `File` from the path part, then get the parent path of the `File`:

### Kotlin


```kotlin
    fun handleFileUri(beamUri: Uri): File? =
            // Get the path part of the URI
            beamUri.path.let { fileName ->
                // Create a File object for this filename
                File(fileName)
                        // Get the file's parent directory
                        .parentFile
            }
    ...
```

### Java

```java
    ...
    public File handleFileUri(Uri beamUri) {
        // Get the path part of the URI
        String fileName = beamUri.getPath();
        // Create a File object for this filename
        File copiedFile = new File(fileName);
        // Get the file's parent directory
        return copiedFile.getParentFile();
    }
    ...
```

### Get the directory from a content URI

If the incoming `Intent` contains a content URI, the URI may point to a directory and file name stored in the `MediaStore` content provider. You can detect a content URI for `MediaStore` by testing the URI's authority value. A content URI for `MediaStore` may come from Android Beam file transfer or from another app, but in both cases you can retrieve a directory and file name for the content URI.

You can also receive an incoming `ACTION_VIEW` intent containing a content URI for a content provider other than `MediaStore`. In this case, the content URI doesn't contain the `MediaStore` authority value, and the content URI usually doesn't point to a directory.

**Note:** For Android Beam file transfer, you receive a content URI in the `ACTION_VIEW` intent if the first incoming file has a MIME type of "audio/*", "image/*", or "video/*", indicating that the file is media- related. Android Beam file transfer indexes the media files it transfers by running Media Scanner on the directory where it stores transferred files. Media Scanner writes its results to the `MediaStore` content provider, then it passes a content URI for the first file back to Android Beam file transfer. This content URI is the one you receive in the notification `Intent`. To get the directory of the first file, you retrieve it from `MediaStore` using the content URI.

### Determine the content provider

To determine if you can retrieve a file directory from the content URI, determine the the content provider associated with the URI by calling `Uri.getAuthority()` to get the URI's authority. The result has two possible values:

`MediaStore.AUTHORITY`

The URI is for a file or files tracked by `MediaStore`. Retrieve the full file name from `MediaStore`, and get directory from the file name.

Any other authority value

A content URI from another content provider. Display the data associated with the content URI, but don't get the file directory.

To get the directory for a `MediaStore` content URI, run a query that specifies the incoming content URI for the `Uri` argument and the column `MediaColumns.DATA` for the projection. The returned `Cursor` contains the full path and name for the file represented by the URI. This path also contains all the other files that Android Beam file transfer just copied to the device.

The following snippet shows you how to test the authority of the content URI and retrieve the the path and file name for the transferred file:

### Kotlin

   
```kotlin
    private fun handleContentUri(beamUri: Uri): File? =
            // Test the authority of the URI
            if (beamUri.authority == MediaStore.AUTHORITY) {
                /*
                 * Handle content URIs for other content providers
                 */
                ...
            // For a MediaStore content URI
            } else {
                // Get the column that contains the file name
                val projection = arrayOf(MediaStore.MediaColumns.DATA)
                val pathCursor = contentResolver.query(beamUri, projection, null, null, null)
                // Check for a valid cursor
                if (pathCursor?.moveToFirst() == true) {
                    // Get the column index in the Cursor
                    pathCursor.getColumnIndex(MediaStore.MediaColumns.DATA).let { filenameIndex ->
                        // Get the full file name including path
                        pathCursor.getString(filenameIndex).let { fileName ->
                            // Create a File object for the filename
                            File(fileName)
                        }.parentFile // Return the parent directory of the file
                    }
                } else {
                    // The query didn't work; return null
                    null
                }
            }
    ...
```

### Java

```java
    ...
    public String handleContentUri(Uri beamUri) {
        // Position of the filename in the query Cursor
        int filenameIndex;
        // File object for the filename
        File copiedFile;
        // The filename stored in MediaStore
        String fileName;
        // Test the authority of the URI
        if (!TextUtils.equals(beamUri.getAuthority(), MediaStore.AUTHORITY)) {
            /*
             * Handle content URIs for other content providers
             */
        // For a MediaStore content URI
        } else {
            // Get the column that contains the file name
            String[] projection = { MediaStore.MediaColumns.DATA };
            Cursor pathCursor =
                    getContentResolver().query(beamUri, projection,
                    null, null, null);
            // Check for a valid cursor
            if (pathCursor != null &&
                    pathCursor.moveToFirst()) {
                // Get the column index in the Cursor
                filenameIndex = pathCursor.getColumnIndex(
                        MediaStore.MediaColumns.DATA);
                // Get the full file name including path
                fileName = pathCursor.getString(filenameIndex);
                // Create a File object for the filename
                copiedFile = new File(fileName);
                // Return the parent directory of the file
                return copiedFile.getParentFile();
             } else {
                // The query didn't work; return null
                return null;
             }
        }
    }
    ...
```

To learn more about retrieving data from a content provider, see the section Retrieving data from the provider.

For additional related information, refer to:

*   Content URIs
*   Intents and Intent Filters
*   Notifications
*   Using the External Storage