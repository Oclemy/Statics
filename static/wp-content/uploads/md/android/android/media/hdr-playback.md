# HDR video playback

HDR, or High Dynamic Range, provides a wider range of colors and greater contrast between the brightest whites and darkest shadows, resulting in video quality that more closely resembles what the naked eye perceives.

Learn how to set up HDR video playback in your app. This enables you to preview and play back HDR video content. For more information on how to add basic video playback support to your app, see the ExoPlayer documentation.

Device prerequisites
--------------------

Not all Android devices support HDR playback. Before playing back HDR video content in your app, determine if your device meets the following prerequisites:

*   Targets Android 7.0 or higher (API layer 24).
*   Has a HDR-capable decoder and access to a HDR-capable display.

The next section walks you through how to check if your device supports HDR playback.

Check for HDR playback support
------------------------------

Use `Display.getHdrCapabilities()`) to query a display’s HDR capabilities. The method returns information about the supported HDR profiles and luminance range for the display.

The following code checks if the device supports HLG10 playback. Starting in Android 13, HLG10 is the minimum standard that device makers must support if the device is capable of HDR playback:

### Kotlin

```kotlin
// Check if display supports the HDR type
val capabilities = display?.hdrCapabilities?.supportedHdrTypes ?: intArrayOf()
if (!capabilities.contains(HDR_TYPE_HLG)) {
  throw RuntimeException("Display does not support desired HDR type");
}
```

### Java

```java
// Check if display supports the HDR type
int[] list = getDisplay().getHdrCapabilities().getSupportedHdrTypes();
List capabilities = Arrays.stream(list).boxed().collect(Collectors.toList());
if (!capabilities.contains(HDR_TYPE_HLG)) {
 throw new RuntimeException("Display does not support desired HDR type");
}
```

Set up HDR playback in your app
-------------------------------

If your app uses ExoPlayer, it supports HDR playback by default. See Check for HDR playback support for next steps.

If your app does not use ExoPlayer, set up HDR playback using `MediaCodec` via `SurfaceView`.

### Set up MediaCodec using SurfaceView

Set up a standard `MediaCodec` playback flow using `SurfaceView`. This allows you to display HDR video content without any special handling for HDR playback:

*   `MediaCodec`: Decodes HDR video content.
*   `SurfaceView`: Displays HDR video content.

The following code checks if the codec supports the HDR profile, then sets up `MediaCodec` using `SurfaceView`:

### Kotlin

```kotlin
// Check if there's a codec that supports the specific HDR profile
val list = MediaCodecList(MediaCodecList.REGULAR_CODECS) var format = MediaFormat() /* media format from the container */;
format.setInteger(MediaFormat.KEY_PROFILE, MediaCodecInfo.CodecProfileLevel.AV1ProfileMain10)
val codecName = list.findDecoderForFormat (format) ?: throw RuntimeException ("No codec supports the format")

// Below is a standard MediaCodec playback flow
val codec: MediaCodec = MediaCodec.createByCodecName(codecName);
val surface: Surface = surfaceView.holder.surface
val callback: MediaCodec.Callback = (object : MediaCodec.Callback() {
   override fun onInputBufferAvailable(codec: MediaCodec, index: Int) {
      queue.offer(index)
   }

   override fun onOutputBufferAvailable(
      codec: MediaCodec,
      index: Int,
      info: MediaCodec.BufferInfo
   ) {
      codec.releaseOutputBuffer(index, timestamp)
   }

   override fun onError(codec: MediaCodec, e: MediaCodec.CodecException) {
      // handle error
   }

   override fun onOutputFormatChanged(
      codec: MediaCodec, format: MediaFormat
   ) {
      // handle format change
   }
})

codec.setCallback(callback)
codec.configure(format, surface, crypto, 0 /* flags */)
codec.start()
while (/* until EOS */) {
   val index = queue.poll()
   val buffer = codec.getInputBuffer(index)
   buffer?.put(/* write bitstream */)
   codec.queueInputBuffer(index, offset, size, timestamp, flags)
}
codec.stop()
codec.release()
```

### Java

```java
// Check if there's a codec that supports the specific HDR profile
MediaCodecList list = new MediaCodecList(MediaCodecList.REGULAR_CODECS);
MediaFormat format = /* media format from the container */;
format.setInteger(
    MediaFormat.KEY_PROFILE, CodecProfileLevel.AV1ProfileMain10);
String codecName = list.findDecoderForFormat(format);
if (codecName == null) {
    throw new RuntimeException("No codec supports the format");
}

// Below is a standard MediaCodec playback flow
MediaCodec codec = MediaCodec.getCodecByName(codecName);
Surface surface = surfaceView.getHolder().getSurface();
MediaCodec.Callback callback = new MediaCodec.Callback() {
    @Override
    void onInputBufferAvailable(MediaCodec codec, int index) {
        queue.offer(index);
    }

    @Override
    void onOutputBufferAvailable(MediaCodec codec, int index) {
        // release the buffer for render
        codec.releaseOutputBuffer(index, timestamp);
    }

    @Override
    void onOutputFormatChanged(MediaCodec codec, MediaFormat format) {
        // handle format change
    }

    @Override
    void onError(MediaCodec codec, MediaCodec.CodecException ex) {
        // handle error
    }

};
codec.setCallback(callback);
codec.configure(format, surface, crypto, 0 /* flags */);
codec.start();
while (/* until EOS */) {
    int index = queue.poll();
    ByteBuffer buffer = codec.getInputBuffer(index);
    buffer.put(/* write bitstream */);
    codec.queueInputBuffer(index, offset, size, timestamp, flags);
}
codec.stop();
codec.release();
```

For more `MediaCodec` implementations using `SurfaceView`, see the Android Camera samples.


