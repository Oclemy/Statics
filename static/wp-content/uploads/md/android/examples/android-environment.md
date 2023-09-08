# Android Environment class


_Android Environment Class Tutorial and Examples_

In the `android.os` package is an `Environment` class that gives us acess to environment variables. In this tutorial we will explore several example snippets to understand several capabilities of this class.


##### What You Learn in This Tutorial.

This tutorial is meant to teach you about the `Environment` class in android. In the process you will learn the following:

1. What the Environment class is and it's api definition.
2. The several public directories available in the android operating system. These are available as public constants.
3. The several public methods available in the android operating system.
4. Several "howTo" snippets for the `Environment` class. For example how to open any directory by supplying it's path or the just the public directories.

##### Environment API Definition

`Environment` is class that gives us access to environment variables in the android operating system. The `Environment` class is a public class directly extending the `java.lang.Object` class:

```java
public class Environment extends Object {}
```

Here's it's inheritance hierarchy:

```java
java.lang.Object
   ↳    android.os.Environment
```

##### Public Directories

Here are public system defined dirextories:

| No. | Directory | Description |
| --- | --- | --- |
| 1. | DIRECTORY_ALARMS | Standard directory in which to place any audio files that should be in the list of alarms that the user can select (not as regular music). |
| 2. | DIRECTORY_DCIM | The traditional location for pictures and videos when mounting the device as a camera. |
| 3. | DIRECTORY_DOCUMENTS | Standard directory in which to place documents that have been created by the user. |
| 4. | DIRECTORY_DOWNLOADS | Standard directory in which to place files that have been downloaded by the user. |
| 5. | DIRECTORY_MOVIES | Standard directory in which to place movies that are available to the user. |
| 6. | DIRECTORY_MUSIC | Standard directory in which to place any audio files that should be in the regular list of music for the user. |
| 7. | DIRECTORY_NOTIFICATIONS | Standard directory in which to place any audio files that should be in the list of notifications that the user can select (not as regular music). |
| 8. | DIRECTORY_PICTURES | Standard directory in which to place pictures that are available to the user. |
| 9. | DIRECTORY_PODCASTS | Standard directory in which to place any audio files that should be in the list of podcasts that the user can select (not as regular music). |
| 10. | DIRECTORY_RINGTONES | Standard directory in which to place any audio files that should be in the list of ringtones that the user can select (not as regular music). |

##### Public Environment Methods

Here are some public methods in the `Environment` class that you will want to use when working with this class:

| No. | Return Type | Method | Description |
| --- | --- | --- | --- |
| 1. | `File` | `getDataDirectory()` | Return the user data directory. |
| 2. | `File` | `getDownloadCacheDirectory()` | Return the download/cache content directory. |
| 3. | `File` | `getExternalStorageDirectory()` | Return the primary shared/external storage directory. |
| 4. | `File` | `getExternalStoragePublicDirectory(String type)` | Get a top-level shared/external storage directory for placing files of a particular type. |
| 5. | `String` | `getExternalStorageState()` | Returns the current state of the primary shared/external storage media. |
| 6. | `String` | `getExternalStorageState(File path)` | Returns the current state of the shared/external storage media at the given path. |
| 7. | `File` | `getRootDirectory()` | Return root of the "system" partition holding the core Android OS. |
| 8. | `String` | `getStorageState(File path)` | This method was deprecated in API level 21. use `getExternalStorageState(File)` |
| 9. | `boolean` | `isExternalStorageEmulated()` | Returns whether the primary shared/external storage media is emulated. |
| 10. | `boolean` | `isExternalStorageEmulated(File path)` | Returns whether the shared/external storage media at the given path is emulated. |
| 11. | `boolean` | `isExternalStorageRemovable()` | Returns whether the primary shared/external storage media is physically removable. |
| 12. | `boolean` | `isExternalStorageRemovable(File path)` | Returns whether the shared/external storage media at the given path is physically removable. |

### Quick Environment Class Solutions and Snippets.

Let's look at some quick example snippets to incorporate into your project:

#### 1\. How to Open a Directory

Let's say a path is being passed to us and we have to get and return a File object.

```java
    private static File openFolder(final String path) {
        File file = null;

        if (isExternalStorageAvailable()) {
            final File storageFolder = Environment.getExternalStorageDirectory();

            file = new File(storageFolder, path);
            if (!file.exists()) {
                if (!file.mkdirs()) {
                    file = null;
                }
            }
        }

        return file;
    }
```

In the above solution we have created a method called `openFolder()`. The method is receiving a path as a parameter. Then we've initialized the a `File` object to null. Then checked if the ExternalStoarge is available via the `isExternalStorageAvailable` method. Then obtained external storage directory via the `getExternalStorageDirectory` method of the `Environment` class. Then we've instantiated the `File` class, passing in the storageFolder and path as parameters.

Then we've checked if the `File` exists via the `exists()` method of the `File` class. Then we've checked if the `File` is directory via the `mkdirs()` method. If not so we return null, otherwise we return the `File`.

#### 2\. How to determine if ExternalStorage is Available

We will return true if the external storage is available. If not we return false.

```java
    public static boolean isExternalStorageAvailable() {
        return Environment.MEDIA_MOUNTED.equals(Environment.getExternalStorageState());
    }
```

We've created a static method to return a `boolean` value, `true` or `false` based on whether external storage is available or not.

#### 3\. How to Open the Pictures Directory

We see how to open the system defined pictures directory. We will return the path of the directory holding application files on external storage.

```java
    public static File openPublicPicturesDirectory() {
        if (isExternalStorageAvailable()) {
            return (AndroidUtils.isAtLeastFroyo()) ? Environment.getExternalStoragePublicDirectory(
                    Environment.DIRECTORY_PICTURES) : openFolder("Pictures");
        }
        return null;
    }
```

In the above we've shown you how you can open the public pictures directory. We start by checking if the external storage is available via the `isExternalStorageAvailable()` method. If so we then check if the device OS is atleast Froyo. Am assuming that you have maybe some `AndroidUtils` class. We've used what we call a ternary operator. If it's true then `Environment.getExternalStoragePublicDirectory` gets called, otherwise `openFolder()`. Note we had defined the `openFolder` earlier.

#### 4\. How to Open the Music Directory

This method opens the the system defined music directory. We return the path of the directory holding application files on external storage. Let's say we have a separate utility class from which we can determine if the device is atleast Froyo.

```java
    public static File openMusicDirectory(final Context context) {
        if (isExternalStorageAvailable()) {
            return (AndroidUtils.isAtLeastFroyo()) ? context.getExternalFilesDir(Environment.DIRECTORY_MUSIC)
                                                   : openFolder("music");
        }

        return null;
    }
```

Note that we had defined the `openFolder` earlier.

##### 5\. How to Open File Explorer via Intent

```java
                Intent intent = new Intent();
                intent.setType("*/*");
                intent.setAction(Intent.ACTION_GET_CONTENT);
                startActivityForResult(Intent.createChooser(intent, getString(R.string
                                .select_file)),
                        PICK_IMAGE_FROM_EXPLORER);
```

The unique thing is the `*/*` we've passed in the `setType()` method.

##### 6\. How to Create a Directory in Downloads Folder

Here's the problem. You need to create a directory in the Downloads Directory in the external storage, otherwise throw an error.

```java
            final File target = new File(
                    Environment.getExternalStorageDirectory(), Environment.DIRECTORY_DOWNLOADS);
            if (!target.isDirectory() && target.mkdirs()) {
                throw new IOException("unable to create external downloads directory");
            }
            return target;
```

First we have instantiate a File object passing in two parameters. The first is the ExternalStorageDirectory and the second is the downloads directory. Both parameters are obtained from the `Environment` class. It is important to note that even folders are represented by the `File` class. Hence for us to determine if a `File` object is a folder or not we have to call the `isDirectory()` method and the `mkdirs()` method. Both are defined in the `File` class.

##### 7\. How to Check if SDCard is enabled or not.

Suppose you want to check if the SCard is enable or not and return a boolean value: true or false:

```java
    public static boolean isSDCardEnabled() {
        return Environment.MEDIA_MOUNTED.equals(Environment.getExternalStorageState());
    }
```

We may re-use this method in some snippets.

##### 8\. How to obtain the SDCard Path

We want to obtain it's path and return it as a string.

```java
    public static String getSDCardPath() {
        if (!isSDCardEnable()) return null;
        String cmd = "cat /proc/mounts";
        Runtime run = Runtime.getRuntime();
        BufferedReader bufferedReader = null;
        try {
            Process p = run.exec(cmd);
            bufferedReader = new BufferedReader(new InputStreamReader(new BufferedInputStream(p.getInputStream())));
            String lineStr;
            while ((lineStr = bufferedReader.readLine()) != null) {
                if (lineStr.contains("sdcard") && lineStr.contains(".android_secure")) {
                    String[] strArray = lineStr.split(" ");
                    if (strArray.length >= 5) {
                        return strArray[1].replace("/.android_secure", "") + File.separator;
                    }
                }
                if (p.waitFor() != 0 && p.exitValue() == 1) {
                    break;
                }
            }
        } catch (Exception e) {
            e.printStackTrace();
        } finally {
            CloseUtils.closeIO(bufferedReader);
        }
        return Environment.getExternalStorageDirectory().getPath() + File.separator;
    }
```

##### 9\. How to Obtain Data Path

```java
    public static String getDataPath() {
        if (!isSDCardEnabled()) return null;
        return Environment.getExternalStorageDirectory().getPath() + File.separator + "data" + File.separator;
    }
```

##### 10\. How to get Available Free Space

We wnat to get the available free space in the SD Card.

```java
    @TargetApi(Build.VERSION_CODES.JELLY_BEAN_MR2)
    public static String getFreeSpace() {
        if (!isSDCardEnabled()) return null;
        StatFs stat = new StatFs(getSDCardPath());
        long blockSize, availableBlocks;
        availableBlocks = stat.getAvailableBlocksLong();
        blockSize = stat.getBlockSizeLong();
        return ConvertUtils.byte2FitMemorySize(availableBlocks * blockSize);
    }
```

We've started by checking if the SD Card is enabled.

##### 11\. How to get SD Card Information

Let's start by creating a class:

```java
public static class SDCardInfo {
        boolean isExist;
        long    totalBlocks;
        long    freeBlocks;
        long    availableBlocks;
        long    blockByteSize;
        long    totalBytes;
        long    freeBytes;
        long    availableBytes;

        @Override
        public String toString() {
            return "isExist=" + isExist +
                    "ntotalBlocks=" + totalBlocks +
                    "nfreeBlocks=" + freeBlocks +
                    "navailableBlocks=" + availableBlocks +
                    "nblockByteSize=" + blockByteSize +
                    "ntotalBytes=" + totalBytes +
                    "nfreeBytes=" + freeBytes +
                    "navailableBytes=" + availableBytes;
        }
    }
```

Then:

```java
    @TargetApi(Build.VERSION_CODES.JELLY_BEAN_MR2)
    public static String getSDCardInfo() {
        if (!isSDCardEnable()) return null;
        SDCardInfo sd = new SDCardInfo();
        sd.isExist = true;
        StatFs sf = new StatFs(Environment.getExternalStorageDirectory().getPath());
        sd.totalBlocks = sf.getBlockCountLong();
        sd.blockByteSize = sf.getBlockSizeLong();
        sd.availableBlocks = sf.getAvailableBlocksLong();
        sd.availableBytes = sf.getAvailableBytes();
        sd.freeBlocks = sf.getFreeBlocksLong();
        sd.freeBytes = sf.getFreeBytes();
        sd.totalBytes = sf.getTotalBytes();
        return sd.toString();
    }
```
