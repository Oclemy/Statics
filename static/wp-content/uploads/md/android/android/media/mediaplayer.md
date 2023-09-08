# MediaPlayer overview

The Android multimedia framework includes support for playing variety of common media types, so that you can easily integrate audio, video and images into your applications. You can play audio or video from media files stored in your application's resources (raw resources), from standalone files in the filesystem, or from a data stream arriving over a network connection, all using `MediaPlayer` APIs.

This document shows you how to use `MediaPlayer` to write a media-playing application that interacts with the user and the system in order to obtain good performance and a pleasant user experience. Alternatively, you might want to use ExoPlayer, which is a customizable open source library that supports high-performance features not available in `MediaPlayer`

> **Note:** You can play back the audio data only to the standard output device. Currently, that is the mobile device speaker or a Bluetooth headset. You cannot play sound files in the conversation audio during a call.

The basics
----------

The following classes are used to play sound and video in the Android framework:

`MediaPlayer`

This class is the primary API for playing sound and video.

`AudioManager`

This class manages audio sources and audio output on a device.

Manifest declarations
---------------------

Before starting development on your application using MediaPlayer, make sure your manifest has the appropriate declarations to allow use of related features.

*   **Internet Permission** - If you are using MediaPlayer to stream network-based content, your application must request network access.

```xml
    <uses-permission android:name="android.permission.INTERNET" />
```

*   **Wake Lock Permission** - If your player application needs to keep the screen from dimming or the processor from sleeping, or uses the `MediaPlayer.setScreenOnWhilePlaying()` or `MediaPlayer.setWakeMode()` methods, you must request this permission.

```xml    
    <uses-permission android:name="android.permission.WAKE_LOCK" />
```

One of the most important components of the media framework is the `MediaPlayer` class. An object of this class can fetch, decode, and play both audio and video with minimal setup. It supports several different media sources such as:

*   Local resources
*   Internal URIs, such as one you might obtain from a Content Resolver
*   External URLs (streaming)

For a list of media formats that Android supports, see the Supported Media Formats page.

Here is an example of how to play audio that's available as a local raw resource (saved in your application's `res/raw/` directory):

### Kotlin

```kotlin
var mediaPlayer = MediaPlayer.create(context, R.raw.sound_file_1)
mediaPlayer.start() // no need to call prepare(); create() does that for you
```

### Java

```java
MediaPlayer mediaPlayer = MediaPlayer.create(context, R.raw.sound_file_1);
mediaPlayer.start(); // no need to call prepare(); create() does that for you
```

In this case, a "raw" resource is a file that the system does not try to parse in any particular way. However, the content of this resource should not be raw audio. It should be a properly encoded and formatted media file in one of the supported formats.

And here is how you might play from a URI available locally in the system (that you obtained through a Content Resolver, for instance):

### Kotlin

```kotlin
val myUri: Uri = .... // initialize Uri here
val mediaPlayer = MediaPlayer().apply {
    setAudioAttributes(
        AudioAttributes.Builder()
            .setContentType(AudioAttributes.CONTENT_TYPE_MUSIC)
            .setUsage(AudioAttributes.USAGE_MEDIA)
            .build()
    )
    setDataSource(applicationContext, myUri)
    prepare()
    start()
}
```

### Java

```java
Uri myUri = ....; // initialize Uri here
MediaPlayer mediaPlayer = new MediaPlayer();
mediaPlayer.setAudioAttributes(
    new AudioAttributes.Builder()
        .setContentType(AudioAttributes.CONTENT_TYPE_MUSIC)
        .setUsage(AudioAttributes.USAGE_MEDIA)
        .build()
);
mediaPlayer.setDataSource(getApplicationContext(), myUri);
mediaPlayer.prepare();
mediaPlayer.start();
```

Playing from a remote URL via HTTP streaming looks like this:

### Kotlin

```kotlin
val url = "http://........" // your URL here
val mediaPlayer = MediaPlayer().apply {
    setAudioAttributes(
        AudioAttributes.Builder()
            .setContentType(AudioAttributes.CONTENT_TYPE_MUSIC)
            .setUsage(AudioAttributes.USAGE_MEDIA)
            .build()
    )
    setDataSource(url)
    prepare() // might take long! (for buffering, etc)
    start()
}
```

### Java

```java
String url = "http://........"; // your URL here
MediaPlayer mediaPlayer = new MediaPlayer();
mediaPlayer.setAudioAttributes(
    new AudioAttributes.Builder()
        .setContentType(AudioAttributes.CONTENT_TYPE_MUSIC)
        .setUsage(AudioAttributes.USAGE_MEDIA)
        .build()
);
mediaPlayer.setDataSource(url);
mediaPlayer.prepare(); // might take long! (for buffering, etc)
mediaPlayer.start();
```

> **Note:** If you're passing a URL to stream an online media file, the file must be capable of progressive download.

> **Caution:** You must either catch or pass `IllegalArgumentException` and `IOException` when using `setDataSource()`, because the file you are referencing might not exist.

### Asynchronous preparation

Using `MediaPlayer` can be straightforward in principle. However, it's important to keep in mind that a few more things are necessary to integrate it correctly with a typical Android application. For example, the call to `prepare()` can take a long time to execute, because it might involve fetching and decoding media data. So, as is the case with any method that may take long to execute, you should **never call it from your application's UI thread**. Doing that causes the UI to hang until the method returns, which is a very bad user experience and can cause an ANR (Application Not Responding) error. Even if you expect your resource to load quickly, remember that anything that takes more than a tenth of a second to respond in the UI causes a noticeable pause and gives the user the impression that your application is slow.

To avoid hanging your UI thread, spawn another thread to prepare the `MediaPlayer` and notify the main thread when done. However, while you could write the threading logic yourself, this pattern is so common when using `MediaPlayer` that the framework supplies a convenient way to accomplish this task by using the `prepareAsync()` method. This method starts preparing the media in the background and returns immediately. When the media is done preparing, the `onPrepared()` method of the `MediaPlayer.OnPreparedListener`, configured through `setOnPreparedListener()` is called.

### Managing state

Another aspect of a `MediaPlayer` that you should keep in mind is that it's state-based. That is, the `MediaPlayer` has an internal state that you must always be aware of when writing your code, because certain operations are only valid when the player is in specific states. If you perform an operation while in the wrong state, the system may throw an exception or cause other undesirable behaviors.

The documentation in the `MediaPlayer` class shows a complete state diagram, that clarifies which methods move the `MediaPlayer` from one state to another. For example, when you create a new `MediaPlayer`, it is in the _Idle_ state. At that point, you should initialize it by calling `setDataSource()`, bringing it to the _Initialized_ state. After that, you have to prepare it using either the `prepare()` or `prepareAsync()` method. When the `MediaPlayer` is done preparing, it enters the _Prepared_ state, which means you can call `start()` to make it play the media. At that point, as the diagram illustrates, you can move between the _Started_, _Paused_ and _PlaybackCompleted_ states by calling such methods as `start()`, `pause()`, and `seekTo()`, amongst others. When you call `stop()`, however, notice that you cannot call `start()` again until you prepare the `MediaPlayer` again.

Always keep the state diagram in mind when writing code that interacts with a `MediaPlayer` object, because calling its methods from the wrong state is a common cause of bugs.

### Releasing the MediaPlayer

A `MediaPlayer` can consume valuable system resources. Therefore, you should always take extra precautions to make sure you are not hanging on to a `MediaPlayer` instance longer than necessary. When you are done with it, you should always call `release()` to make sure any system resources allocated to it are properly released. For example, if you are using a `MediaPlayer` and your activity receives a call to `onStop()`, you must release the `MediaPlayer`, because it makes little sense to hold on to it while your activity is not interacting with the user (unless you are playing media in the background, which is discussed in the next section). When your activity is resumed or restarted, of course, you need to create a new `MediaPlayer` and prepare it again before resuming playback.

Here's how you should release and then nullify your `MediaPlayer`:

### Kotlin

```kotlin
mediaPlayer?.release()
mediaPlayer = null
```

### Java

```java
mediaPlayer.release();
mediaPlayer = null;
```

As an example, consider the problems that could happen if you forgot to release the `MediaPlayer` when your activity is stopped, but create a new one when the activity starts again. As you may know, when the user changes the screen orientation (or changes the device configuration in another way), the system handles that by restarting the activity (by default), so you might quickly consume all of the system resources as the user rotates the device back and forth between portrait and landscape, because at each orientation change, you create a new `MediaPlayer` that you never release. (For more information about runtime restarts, see Handling Runtime Changes.)

You may be wondering what happens if you want to continue playing "background media" even when the user leaves your activity, much in the same way that the built-in Music application behaves. In this case, what you need is a `MediaPlayer` controlled by a Service, as discussed in the next section

Using MediaPlayer in a service
------------------------------

If you want your media to play in the background even when your application is not onscreen—that is, you want it to continue playing while the user is interacting with other applications—then you must start a Service and control the `MediaPlayer` instance from there. You need to embed the MediaPlayer in a `MediaBrowserServiceCompat` service and have it interact with a `MediaBrowserCompat` in another activity.

You should be careful about this client/server setup. There are expectations about how a player running in a background service interacts with the rest of the system. If your application does not fulfill those expectations, the user may have a bad experience. Read Building an Audio App for the full details.

This section describes special instructions for managing a MediaPlayer when it is implemented inside a service.

### Running asynchronously

First of all, like an `Activity`, all work in a `Service` is done in a single thread by default—in fact, if you're running an activity and a service from the same application, they use the same thread (the "main thread") by default. Therefore, services need to process incoming intents quickly and never perform lengthy computations when responding to them. If any heavy work or blocking calls are expected, you must do those tasks asynchronously: either from another thread you implement yourself, or using the framework's many facilities for asynchronous processing.

For instance, when using a `MediaPlayer` from your main thread, you should call `prepareAsync()` rather than `prepare()`, and implement a `MediaPlayer.OnPreparedListener` in order to be notified when the preparation is complete and you can start playing. For example:

### Kotlin

```kotlin
private const val ACTION_PLAY: String = "com.example.action.PLAY"

class MyService: Service(), MediaPlayer.OnPreparedListener {

    private var mMediaPlayer: MediaPlayer? = null

    override fun onStartCommand(intent: Intent, flags: Int, startId: Int): Int {
        ...
        val action: String = intent.action
        when(action) {
            ACTION_PLAY -> {
                mMediaPlayer = ... // initialize it here
                mMediaPlayer?.apply {
                    setOnPreparedListener(this@MyService)
                    prepareAsync() // prepare async to not block main thread
                }

            }
        }
        ...
    }

    /** Called when MediaPlayer is ready */
    override fun onPrepared(mediaPlayer: MediaPlayer) {
        mediaPlayer.start()
    }
}
```

### Java

```java
public class MyService extends Service implements MediaPlayer.OnPreparedListener {
    private static final String ACTION_PLAY = "com.example.action.PLAY";
    MediaPlayer mediaPlayer = null;

    public int onStartCommand(Intent intent, int flags, int startId) {
        ...
        if (intent.getAction().equals(ACTION_PLAY)) {
            mediaPlayer = ... // initialize it here
            mediaPlayer.setOnPreparedListener(this);
            mediaPlayer.prepareAsync(); // prepare async to not block main thread
        }
    }

    /** Called when MediaPlayer is ready */
    public void onPrepared(MediaPlayer player) {
        player.start();
    }
}
```

### Handling asynchronous errors


On synchronous operations, errors would normally be signaled with an exception or an error code, but whenever you use asynchronous resources, you should make sure your application is notified of errors appropriately. In the case of a `MediaPlayer`, you can accomplish this by implementing a `MediaPlayer.OnErrorListener` and setting it in your `MediaPlayer` instance:

### Kotlin

```kotlin
class MyService : Service(), MediaPlayer.OnErrorListener {

    private var mediaPlayer: MediaPlayer? = null

    fun initMediaPlayer() {
        // ...initialize the MediaPlayer here...
        mediaPlayer?.setOnErrorListener(this)
    }

    override fun onError(mp: MediaPlayer, what: Int, extra: Int): Boolean {
        // ... react appropriately ...
        // The MediaPlayer has moved to the Error state, must be reset!
    }
}
```

### Java

```java
public class MyService extends Service implements MediaPlayer.OnErrorListener {
    MediaPlayer mediaPlayer;

    public void initMediaPlayer() {
        // ...initialize the MediaPlayer here...
        mediaPlayer.setOnErrorListener(this);
    }

    @Override
    public boolean onError(MediaPlayer mp, int what, int extra) {
        // ... react appropriately ...
        // The MediaPlayer has moved to the Error state, must be reset!
    }
}
```

It's important to remember that when an error occurs, the `MediaPlayer` moves to the _Error_ state (see the documentation for the `MediaPlayer` class for the full state diagram) and you must reset it before you can use it again.

### Using wake locks

When designing applications that play media in the background, the device may go to sleep while your service is running. Because the Android system tries to conserve battery while the device is sleeping, the system tries to shut off any of the phone's features that are not necessary, including the CPU and the WiFi hardware. However, if your service is playing or streaming music, you want to prevent the system from interfering with your playback.

In order to ensure that your service continues to run under those conditions, you have to use "wake locks." A wake lock is a way to signal to the system that your application is using some feature that should stay available even if the phone is idle.

> **Notice:** You should always use wake locks sparingly and hold them only for as long as truly necessary, because they significantly reduce the battery life of the device.

To ensure that the CPU continues running while your `MediaPlayer` is playing, call the `setWakeMode()` method when initializing your `MediaPlayer`. Once you do, the `MediaPlayer` holds the specified lock while playing and releases the lock when paused or stopped:

### Kotlin

```kotlin
mediaPlayer = MediaPlayer().apply {
    // ... other initialization here ...
    setWakeMode(applicationContext, PowerManager.PARTIAL_WAKE_LOCK)
}
```

### Java

```java
mediaPlayer = new MediaPlayer();
// ... other initialization here ...
mediaPlayer.setWakeMode(getApplicationContext(), PowerManager.PARTIAL_WAKE_LOCK);
```

However, the wake lock acquired in this example guarantees only that the CPU remains awake. If you are streaming media over the network and you are using Wi-Fi, you probably want to hold a `WifiLock` as well, which you must acquire and release manually. So, when you start preparing the `MediaPlayer` with the remote URL, you should create and acquire the Wi-Fi lock. For example:

### Kotlin

```kotlin
val wifiManager = getSystemService(Context.WIFI_SERVICE) as WifiManager
val wifiLock: WifiManager.WifiLock =
    wifiManager.createWifiLock(WifiManager.WIFI_MODE_FULL, "mylock")

wifiLock.acquire()
```

### Java

```java
WifiLock wifiLock = ((WifiManager) getSystemService(Context.WIFI_SERVICE))
    .createWifiLock(WifiManager.WIFI_MODE_FULL, "mylock");

wifiLock.acquire();
```

When you pause or stop your media, or when you no longer need the network, you should release the lock:

### Kotlin

```kotlin
wifiLock.release()
```

### Java

```java
wifiLock.release();
```

### Performing cleanup

As mentioned earlier, a `MediaPlayer` object can consume a significant amount of system resources, so you should keep it only for as long as you need and call `release()` when you are done with it. It's important to call this cleanup method explicitly rather than rely on system garbage collection because it might take some time before the garbage collector reclaims the `MediaPlayer`, as it's only sensitive to memory needs and not to shortage of other media-related resources. So, in the case when you're using a service, you should always override the `onDestroy()` method to make sure you are releasing the `MediaPlayer`:

### Kotlin

```kotlin
class MyService : Service() {

    private var mediaPlayer: MediaPlayer? = null
    // ...

    override fun onDestroy() {
        super.onDestroy()
        mediaPlayer?.release()
    }
}
```

### Java

```java
public class MyService extends Service {
   MediaPlayer mediaPlayer;
   // ...

   @Override
   public void onDestroy() {
       super.onDestroy();
       if (mediaPlayer != null) mediaPlayer.release();
   }
}
```

You should always look for other opportunities to release your `MediaPlayer` as well, apart from releasing it when being shut down. For example, if you expect not to be able to play media for an extended period of time (after losing audio focus, for example), you should definitely release your existing `MediaPlayer` and create it again later. On the other hand, if you only expect to stop playback for a very short time, you should probably hold on to your `MediaPlayer` to avoid the overhead of creating and preparing it again.

Digital Rights Management (DRM)
-------------------------------

Starting with Android 8.0 (API level 26), `MediaPlayer` includes APIs that support the playback of DRM-protected material. They are similar to the low-level API provided by `MediaDrm`, but they operate at a higher level and do not expose the underlying extractor, drm, and crypto objects.

Although the MediaPlayer DRM API does not provide the full functionality of `MediaDrm`, it supports the most common use cases. The current implementation can handle the following content types:

*   Widevine-protected local media files
*   Widevine-protected remote/streaming media files

The following code snippet demonstrates how to use the new DRM MediaPlayer methods in a simple synchronous implementation.

To manage DRM-controlled media, you need to include the new methods alongside the usual flow of MediaPlayer calls, as shown below:

### Kotlin

```kotlin
mediaPlayer?.apply {
    setDataSource()
    setOnDrmConfigHelper() // optional, for custom configuration
    prepare()
    drmInfo?.also {
        prepareDrm()
        getKeyRequest()
        provideKeyResponse()
    }

    // MediaPlayer is now ready to use
    start()
    // ...play/pause/resume...
    stop()
    releaseDrm()
}
```

### Java

```java
setDataSource();
setOnDrmConfigHelper(); // optional, for custom configuration
prepare();
if (getDrmInfo() != null) {
  prepareDrm();
  getKeyRequest();
  provideKeyResponse();
}

// MediaPlayer is now ready to use
start();
// ...play/pause/resume...
stop();
releaseDrm();
```

Start by initializing the `MediaPlayer` object and setting its source using `setDataSource()`, as usual. Then, to use DRM, perform these steps:

1.  If you want your app to perform custom configuration, define an `OnDrmConfigHelper` interface, and attach it to the player using `setOnDrmConfigHelper()`.
2.  Call `prepare()`.
3.  Call `getDrmInfo()`. If the source has DRM content, the method returns a non-null `MediaPlayer.DrmInfo` value.

If `MediaPlayer.DrmInfo` exists:

1.  Examine the map of available UUIDs and choose one.
2.  Prepare the DRM configuration for the current source by calling `prepareDrm()`.

*   If you created and registered an `OnDrmConfigHelper` callback, it is called while `prepareDrm()` is executing. This lets you perform custom configuration of the DRM properties before opening the DRM session. The callback is called synchronously in the thread that called `prepareDrm()`. To access the DRM properties, call `getDrmPropertyString()` and `setDrmPropertyString()`. Avoid performing lengthy operations.
*   If the device has not yet been provisioned, `prepareDrm()` also accesses the provisioning server to provision the device. This can take a variable amount of time, depending on the network connectivity.

4.  To get an opaque key request byte array to send to a license server, call `getKeyRequest()`.
5.  To inform the DRM engine about the key response received from the license server, call `provideKeyResponse()`. The result depends on the type of key request:
    *   If the response is for an offline key request, the result is a key-set identifier. You can use this key-set identifier with `restoreKeys()` to restore the keys to a new session.
    *   If the response is for a streaming or release request, the result is null.

### Running `prepareDrm()` asynchronously

By default, `prepareDrm()` runs synchronously, blocking until preparation is finished. However, the very first DRM preparation on a new device may also require provisioning, which is handled internally by `prepareDrm()`, and may take some time to finish due to the network operation involved. You can avoid blocking on `prepareDrm()` by defining and setting a `MediaPlayer.OnDrmPreparedListener`.

When you set an `OnDrmPreparedListener`, `prepareDrm()` performs the provisioning (if needed) and preparation in the background. When provisioning and preparation have finished, the listener is called. You should not make any assumption about the calling sequence or the thread in which the listener runs (unless the listener is registered with a handler thread). The listener can be called before or after `prepareDrm()` returns.

### Setting up DRM asynchronously

You can initialize the DRM asynchronously by creating and registering the `MediaPlayer.OnDrmInfoListener` for DRM preparation and the `MediaPlayer.OnDrmPreparedListener` to start the player. They work in conjunction with `prepareAsync()`, as shown below:

### Kotlin

```kotlin
setOnPreparedListener()
setOnDrmInfoListener()
setDataSource()
prepareAsync()
// ...

// If the data source content is protected you receive a call to the onDrmInfo() callback.
override fun onDrmInfo(mediaPlayer: MediaPlayer, drmInfo: MediaPlayer.DrmInfo) {
    mediaPlayer.apply {
        prepareDrm()
        getKeyRequest()
        provideKeyResponse()
    }
}

// When prepareAsync() finishes, you receive a call to the onPrepared() callback.
// If there is a DRM, onDrmInfo() sets it up before executing this callback,
// so you can start the player.
override fun onPrepared(mediaPlayer: MediaPlayer) {
    mediaPlayer.start()
}
```

### Java

```java
setOnPreparedListener();
setOnDrmInfoListener();
setDataSource();
prepareAsync();
// ...

// If the data source content is protected you receive a call to the onDrmInfo() callback.
onDrmInfo() {
  prepareDrm();
  getKeyRequest();
  provideKeyResponse();
}

// When prepareAsync() finishes, you receive a call to the onPrepared() callback.
// If there is a DRM, onDrmInfo() sets it up before executing this callback,
// so you can start the player.
onPrepared() {

start();
}
```

Handling encrypted media
------------------------

Starting with Android 8.0 (API level 26) `MediaPlayer` can also decrypt Common Encryption Scheme (CENC) and HLS sample-level encrypted media (METHOD=SAMPLE-AES) for the elementary stream types H.264, and AAC. Full-segment encrypted media (METHOD=AES-128) was previously supported.

Retrieving media from a ContentResolver
---------------------------------------

Another feature that may be useful in a media player application is the ability to retrieve music that the user has on the device. You can do that by querying the `ContentResolver` for external media:

### Kotlin

```kotlin
val resolver: ContentResolver = contentResolver
val uri = android.provider.MediaStore.Audio.Media.EXTERNAL_CONTENT_URI
val cursor: Cursor? = resolver.query(uri, null, null, null, null)
when {
    cursor == null -> {
        // query failed, handle error.
    }
    !cursor.moveToFirst() -> {
        // no media on the device
    }
    else -> {
        val titleColumn: Int = cursor.getColumnIndex(android.provider.MediaStore.Audio.Media.TITLE)
        val idColumn: Int = cursor.getColumnIndex(android.provider.MediaStore.Audio.Media._ID)
        do {
            val thisId = cursor.getLong(idColumn)
            val thisTitle = cursor.getString(titleColumn)
            // ...process entry...
        } while (cursor.moveToNext())
    }
}
cursor?.close()
```

### Java

```java
ContentResolver contentResolver = getContentResolver();
Uri uri = android.provider.MediaStore.Audio.Media.EXTERNAL_CONTENT_URI;
Cursor cursor = contentResolver.query(uri, null, null, null, null);
if (cursor == null) {
    // query failed, handle error.
} else if (!cursor.moveToFirst()) {
    // no media on the device
} else {
    int titleColumn = cursor.getColumnIndex(android.provider.MediaStore.Audio.Media.TITLE);
    int idColumn = cursor.getColumnIndex(android.provider.MediaStore.Audio.Media._ID);
    do {
       long thisId = cursor.getLong(idColumn);
       String thisTitle = cursor.getString(titleColumn);
       // ...process entry...
    } while (cursor.moveToNext());
}

To use this with the `MediaPlayer`, you can do this:

### Kotlin

val id: Long = /* retrieve it from somewhere */
val contentUri: Uri =
    ContentUris.withAppendedId(android.provider.MediaStore.Audio.Media.EXTERNAL_CONTENT_URI, id )

mediaPlayer = MediaPlayer().apply {
    setAudioAttributes(
        AudioAttributes.Builder()
            .setContentType(AudioAttributes.CONTENT_TYPE_MUSIC)
            .setUsage(AudioAttributes.USAGE_MEDIA)
            .build()
    )
    setDataSource(applicationContext, contentUri)
}

// ...prepare and start...
```

### Java

```java
long id = /* retrieve it from somewhere */;
Uri contentUri = ContentUris.withAppendedId(
        android.provider.MediaStore.Audio.Media.EXTERNAL_CONTENT_URI, id);

mediaPlayer = new MediaPlayer();
mediaPlayer.setAudioAttributes(
    new AudioAttributes.Builder()
        .setContentType(AudioAttributes.CONTENT_TYPE_MUSIC)
        .setUsage(AudioAttributes.USAGE_MEDIA)
        .build()
);
mediaPlayer.setDataSource(getApplicationContext(), contentUri);

// ...prepare and start...
```

Learn more
----------

These pages cover topics relating to recording, storing, and playing back audio and video.

*   Supported Media Formats
*   MediaRecorder
*   Data Storage