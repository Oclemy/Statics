# LightCompressor


> A powerful and easy-to-use video compression library for android uses [MediaCodec](https://developer.android.com/reference/android/media/MediaCodec) API.

This library generates a compressed MP4 video with a modified width, height, and bitrate (the number of bits per
seconds that determines the video and audio files’ size and quality). It is based on Telegram for Android project.

The general idea of how the library works is that, extreme high bitrate is reduced while maintaining a good video quality resulting in a smaller size.

I would like to mention that the set attributes for size and quality worked just great in my projects and met the expectations. It may or may not meet yours. I’d appreciate your feedback so I can enhance the compression process.

### How it works

When the video file is called to be compressed, the library checks if the user wants to set a min bitrate to avoid compressing low resolution videos. This becomes handy if you don’t want the video to be compressed every time it is to be processed to avoid having very bad quality after multiple rounds of compression. The minimum is;
* Bitrate: 2mbps

You can pass one of a 5 video qualities; VERY_HIGH, HIGH, MEDIUM, LOW, OR VERY_LOW and the library will handle generating the right bitrate value for the output video

```kotlin
return when (quality) {
    VideoQuality.VERY_LOW -> (bitrate * 0.1).roundToInt()
    VideoQuality.LOW -> (bitrate * 0.2).roundToInt()
    VideoQuality.MEDIUM -> (bitrate * 0.3).roundToInt()
    VideoQuality.HIGH -> (bitrate * 0.4).roundToInt()
    VideoQuality.VERY_HIGH -> (bitrate * 0.6).roundToInt()
}

when {
   width >= 1920 || height >= 1920 -> {
      newWidth = (((width * 0.5) / 16).roundToInt() * 16)
      newHeight = (((height * 0.5) / 16f).roundToInt() * 16)
   }
   width >= 1280 || height >= 1280 -> {
      newWidth = (((width * 0.75) / 16).roundToInt() * 16)
      newHeight = (((height * 0.75) / 16).roundToInt() * 16)
   }
   width >= 960 || height >= 960 -> {
      newWidth = (((width * 0.95) / 16).roundToInt() * 16)
      newHeight = (((height * 0.95) / 16).roundToInt() * 16)
   }
   else -> {
      newWidth = (((width * 0.9) / 16).roundToInt() * 16)
      newHeight = (((height * 0.9) / 16).roundToInt() * 16)
   }
}
```

You can as well pass custom videoHeight, videoWidth, frameRate, and videoBitrate values if you don't want the library to auto-generate the values for you. **The compression will fail if height or width is specified without the other, so ensure you pass both values**.

These values were tested on a huge set of videos and worked fine and fast with them. They might be changed based on the project needs and expectations.

### Step 1: Install it

## Compatibility
Minimum Android SDK: LightCompressor requires a minimum API level of 21.

## How to add to your project?

Ensure Kotlin version is `1.6.0`.

Include this in your Project-level `build.gradle` file:

```groovy
allprojects {
    repositories {
        .
        .
        .
        maven { url 'https://jitpack.io' }
    }
}
```

Include this in your Module-level `build.gradle` file:

```groovy
implementation 'com.github.AbedElazizShe:LightCompressor:1.1.1'
```

And import the following dependencies to use kotlin coroutines:

```groovy
implementation "org.jetbrains.kotlinx:kotlinx-coroutines-core:${Version.coroutines}"
implementation "org.jetbrains.kotlinx:kotlinx-coroutines-android:${Version.coroutines}"
```

If you're facing problems with the setup, edit settings.gradle by adding this at the beginning of the file:

```groovy
dependencyResolutionManagement {
    repositoriesMode.set(RepositoriesMode.FAIL_ON_PROJECT_REPOS)
    repositories {
        google()
        mavenCentral()
        maven { url 'https://jitpack.io' }
    }
}
```

### Step 2: Compress

To use this library, you must add the following permission to allow read and write to external storage. Refer to the sample app for a reference on how to start compression with the right setup.

**API < 29**

```xml
<uses-permission android:name="android.permission.READ_EXTERNAL_STORAGE"/>
<uses-permission android:name="android.permission.WRITE_EXTERNAL_STORAGE"
android:maxSdkVersion="28"/>
```

**API >= 29**

```xml
<uses-permission android:name="android.permission.READ_EXTERNAL_STORAGE"/>
```

Then just call `VideoCompressor.start()` and pass context, uris, and saveAt directory name.

The method has a callback for 5 functions;
1) `OnStart` - called when compression started
2) `OnSuccess` - called when compression completed with no errors/exceptions
3) `OnFailure` - called when an exception occurred or video bitrate and size are below the minimum required for compression.
4) `OnProgress` - called with progress new value
5) `OnCancelled` - called when the job is cancelled

### Important Notes:

- All the callback functions returns an index for the video being compressed in the same order of the urls passed to the library. You can use this index to update the UI
or retrieve information about the original uri/file.
- The source video must be provided as a list of content uris.
- If you want an output video that is optimised to be streamed, ensure you pass [isStreamable] flag is true.

### Configuration values

- VideoQuality: VERY_HIGH (original-bitrate * 0.6) , HIGH (original-bitrate * 0.4), MEDIUM (original-bitrate * 0.3), LOW (original-bitrate * 0.2), OR VERY_LOW (original-bitrate * 0.1)

- isMinBitrateCheckEnabled: this means, don't compress if bitrate is less than 2mbps

- frameRate: any fps value

- videoBitrate: any custom bitrate value

- disableAudio: true/false to generate a video without audio. False by default.

- keepOriginalResolution: true/false to tell the library not to change the resolution.

- videoWidth: custom video width.

- videoHeight: custom video height.

To cancel the compression job, just call [VideoCompressor.cancel()]

### Examples

Kotlin:

```kotlin
VideoCompressor.start(
   context = applicationContext, // => This is required
   uris = List<Uri>, // => Source can be provided as content uris
   isStreamable = true,
   saveAt = Environment.DIRECTORY_MOVIES, // => the directory to save the compressed video(s)
   listener = object : CompressionListener {
       override fun onProgress(index: Int, percent: Float) {
          // Update UI with progress value
          runOnUiThread {
          }
       }

       override fun onStart(index: Int) {
          // Compression start
       }

       override fun onSuccess(index: Int, size: Long, path: String?) {
         // On Compression success
       }

       override fun onFailure(index: Int, failureMessage: String) {
         // On Failure
       }

       override fun onCancelled(index: Int) {
         // On Cancelled
       }

   },
   configureWith = Configuration(
      quality = VideoQuality.MEDIUM,
      frameRate = 24, /*Int, ignore, or null*/
      isMinBitrateCheckEnabled = true,
      videoBitrate = 3677198, /*Int, ignore, or null*/
      disableAudio = false, /*Boolean, or ignore*/
      keepOriginalResolution = false, /*Boolean, or ignore*/
      videoWidth = 360.0, /*Double, ignore, or null*/
      videoHeight = 480.0 /*Double, ignore, or null*/
   )
)
```

Java:

```java
 VideoCompressor.start(
    applicationContext, // => This is required
    new ArrayList<Uri>(), // => Source can be provided as content uris
    false, // => isStreamable
    Environment.DIRECTORY_DOWNLOADS, // => the directory to save the compressed video(s)
    new CompressionListener() {
       @Override
       public void onStart(int index, long size) {
         // Compression start
       }

       @Override
       public void onSuccess(int index, @Nullable String path) {
         // On Compression success
       }

       @Override
       public void onFailure(int index, String failureMessage) {
         // On Failure
       }

       @Override
       public void onProgress(int index, float progressPercent) {
         // Update UI with progress value
         runOnUiThread(new Runnable() {
            public void run() {
           }
         });
       }

       @Override
       public void onCancelled(int index) {
         // On Cancelled
       }
    }, new Configuration(
        VideoQuality.MEDIUM,
        24, /*frameRate: int, or null*/
        false, /*isMinBitrateCheckEnabled*/
        null, /*videoBitrate: int, or null*/
        false, /*disableAudio: Boolean, or null*/
        false, /*keepOriginalResolution: Boolean, or null*/
        360.0, /*videoWidth: Double, or null*/
        480.0 /*videoHeight: Double, or null*/
    )
);
```

### Reference

Read more [here](https://github.com/AbedElazizShe/LightCompressor).
