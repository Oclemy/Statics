# Android MediaScannerConnection Tutorial

_Android MediaScannerConnection Tutorial and Examples._

MediaScannerConnection is a class that gives us our applications a way to pass a newly created or downloaded media file to the media scanner service. It does this by first reading metadata from the file. Then it adds the file to the media content provider.

he MediaScannerConnectionClient provides an interface for the media scanner service to return the Uri for a newly scanned file to the client of the MediaScannerConnection class.


#### MediaScannerConnection API Definition

This class derives directly from `java.lang.Object`. It also implemets the `android.content.ServiceConnection`:

```java
public class MediaScannerConnection extends Object implements ServiceConnection{..}
```

Here's it's inheritance tree:

```java
java.lang.Object
   ↳    android.media.MediaScannerConnection
```

#### Important Methods

##### (a). scanFile

Here's the definition of this method:

```java
public void scanFile (String path,
                String mimeType)
```

This method is responsible for requesting the media scanner to scan a file. Success or failure of the scanning operation cannot be determined until `MediaScannerConnection.MediaScannerConnectionClient.onScanCompleted(String, Uri)` is called.

##### (b) scanFile

This method was added in API level 8 while the other `scanFile()` we looked was added in API level 1.

It is a convenience for:

1. Constructing a `MediaScannerConnection`.
2. Calling `connect()` on it.
3. Calling`scanFile(Context, String[], String[], MediaScannerConnection.OnScanCompletedListener)` with the given path and mimeType when the connection is established.

Here's its signature:

```java
public static void scanFile (Context context,
                String[] paths,
                String[] mimeTypes,
                MediaScannerConnection.OnScanCompletedListener callback)
```

#### Quick MediaScannerConnection Examples

Here are some quick MediaScannerConnection examples:

##### 1\. How to scan images via MediaScannerConnection

```java
    static void scanCopiedImages(Context context, List<File> copiedImages) {
        String[] paths = new String[copiedImages.size()];
        for (int i = 0; i < copiedImages.size(); i++) {
            paths[i] = copiedImages.get(i).toString();
        }

        MediaScannerConnection.scanFile(context,
                paths, null,
                new MediaScannerConnection.OnScanCompletedListener() {
                    public void onScanCompleted(String path, Uri uri) {
                        Log.d(getClass().getSimpleName(), "Scanned " + path + ":");
                        Log.d(getClass().getSimpleName(), "-> uri=" + uri);
                    }
                });
    }
```
