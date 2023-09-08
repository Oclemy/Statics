# Spatial Audio

Spatial Audio is an immersive audio experience that puts your users at the center of the action, making your content sound more realistic. In a movie, the sound from a car might start behind the user, move forward, and trail off into the distance. In a video chat, voices can be separated and placed around the user, making it easier to identify speakers. The sound is "spatialized" to create a multi-speaker effect, similar to a surround sound setup, with headphones. If your content uses a supported audio format, you can add spatial audio to your app starting with Android 13 (API level 33).

Query for capabilities
----------------------

The `Spatializer` class lets you query the device's spatialization capabilities and behavior. Start by retrieving an instance of the `Spatializer` from the `AudioManager`):

### Kotlin

val spatializer = audioManager.spatializer

### Java

Spatializer spatializer = AudioManager.getSpatializer();

After you get the `Spatializer`, check for the three conditions that must hold true for the device to output spatialized audio:

These conditions might not be met, for example, if spatialization is unavailable for the current audio track or disabled on the audio output device altogether.

### Head tracking

With supported headsets, the platform is able to adjust the audio's spatialization based on the user's head position. To check if a head tracker is available for the current audio output routing, call `isHeadTrackerAvailable()`).

Compatible content
------------------

`Spatializer.canBeSpatialized()`) indicates whether audio with the given properties can be spatialized with the current output device routing. This method takes an `AudioAttributes` and an `AudioFormat`, both of which are described in more detail below.

### `AudioAttributes`

An `AudioAttributes` object describes the usage) of an audio stream (for example, game audio or standard media), along with its playback behaviors and content type).

When calling `canBeSpatialized()`), use the same `AudioAttributes` instance as set for your `Player`. For example, if you're using the Jetpack Media3 library and haven't customized the `AudioAttributes`, use `AudioAttributes.DEFAULT`.

#### Disabling spatial audio

To indicate that your content has already been spatialized, call `setIsContentSpatialized(true)`) so that the audio isn't double-processed. Alternatively, adjust the spatialization behavior to disable spatialization altogether by calling `setSpatializationBehavior(AudioAttributes.SPATIALIZATION_BEHAVIOR_NEVER)`).

### `AudioFormat`

An `AudioFormat` object describes details about the format and channel configuration of an audio track.

When instantiating the `AudioFormat` to pass into `canBeSpatialized()`), set the encoding) to the same as the output format expected from the decoder. You should also set a channel mask) that matches your content's channel configuration. Refer to the Default spatialization behavior section for guidance on specific values to use.

Listen for changes to the `Spatializer`
---------------------------------------

To listen for changes in the `Spatializer`’s state, you can add a listener with `Spatializer.addOnSpatializerStateChangedListener()`). Similarly, to listen for changes in the availability of a head tracker, call `Spatializer.addOnHeadTrackerAvailableListener()`).

This can be useful if you want to adjust your track selection during playback using the listener’s callbacks. For example, when a user connects or disconnects their headset from the device, the `onSpatializerAvailableChanged`) callback indicates whether the spatializer effect is available for the new audio output routing. At this point, you may consider updating your player's track selection logic to match the device's new capabilities. For details on ExoPlayer's track selection behavior, refer to the ExoPlayer and spatial audio section.

Recent releases of ExoPlayer make it easier to adopt spatial audio. If you use the standalone ExoPlayer library (package name `com.google.android.exoplayer2`), version 2.17 configures the platform to output spatialized audio, and version 2.18 introduces audio channel count constraints. If you use the ExoPlayer module from the Media3 library, (package name `androidx.media3`), versions `1.0.0-beta01` and newer include these same updates.

After updating your ExoPlayer dependency to the latest release, your app just needs to include content that can be spatialized.

### Audio channel count constraints

When all three conditions for spatial audio are met, ExoPlayer picks a multi-channel audio track. If not, ExoPlayer chooses a stereo track instead. If the `Spatializer` properties change, ExoPlayer will trigger a new track selection to select an audio track that matches the current properties. Note that this new track selection may cause a short rebuffering period.

To disable audio channel count constraints, set the track selection parameters on the player as shown below:

### Kotlin

```kotlin
exoPlayer.trackSelectionParameters = DefaultTrackSelector.Parameters.Builder(context)
  .setConstrainAudioChannelCountToDeviceCapabilities(false)
  .build()
```

### Java

```java
exoPlayer.setTrackSelectionParameters(
  new DefaultTrackSelector.Parameters.Builder(context)
    .setConstrainAudioChannelCountToDeviceCapabilities(false)
    .build()
);
```

Similarly, you can update an existing track selector's parameters to disable audio channel count constraints as follows:

### Kotlin

```kotlin
val trackSelector = DefaultTrackSelector(context)
...
trackSelector.parameters = trackSelector.buildUponParameters()
  .setConstrainAudioChannelCountToDeviceCapabilities(false)
  .build()
```

### Java

```java
DefaultTrackSelector trackSelector = new DefaultTrackSelector(context);
...
trackSelector.setParameters(
  trackSelector
    .buildUponParameters()
    .setConstrainAudioChannelCountToDeviceCapabilities(false)
    .build()
);
```

With audio channel count constraints disabled, if content has multiple audio tracks, ExoPlayer initially selects the track that has the highest number of channels and is playable from the device. For example, if the content contains a multi-channel audio track and a stereo audio track, and the device supports playback of both, ExoPlayer selects the multi-channel track. See the Audio track selection for details on how to customize this behavior.

### Audio track selection

When ExoPlayer’s audio channel count constraints behavior is disabled, ExoPlayer does not automatically select an audio track that matches the properties of the device's spatializer. Instead, you can customize ExoPlayer's track selection logic by setting track selection parameters before or during playback. By default, ExoPlayer selects audio tracks that are the same as the initial track with regards to MIME type (encoding), channel count, and sample rate.

#### Changing the track selection parameters

To change the ExoPlayer’s track selection parameters, use `Player.setTrackSelectionParameters()`. Likewise, you can get ExoPlayer’s current parameters with `Player.getTrackSelectionParameters()`. For example, to select a stereo audio track mid-playback:

### Kotlin

```kotlin
exoPlayer.trackSelectionParameters = exoPlayer.trackSelectionParameters
  .buildUpon()
  .setMaxAudioChannelCount(2)
  .build()
```

### Java

```java
exoPlayer.setTrackSelectionParameters(
  exoPlayer.getTrackSelectionParameters()
    .buildUpon()
    .setMaxAudioChannelCount(2)
    .build()
);
```

Note that changing the track selection parameters mid-playback may cause an interruption in the playback. More information on tuning the player’s track selection parameters is available in the track selection section of the ExoPlayer docs.

Default spatialization behavior
-------------------------------

The default spatialization behavior in Android includes the following behaviors that may be customized by OEMs:

*   Only multi-channel content is spatialized, not stereo content. If you do not use ExoPlayer, depending on the format of your multi-channel audio content, you may need to configure the maximum number of channels that can be output by an audio decoder to a large number. This ensures that the audio decoder outputs multi-channel PCM for the platform to spatialize.
    
### Kotlin

```kotlin
    val mediaFormat = MediaFormat()
    mediaFormat.setInteger(MediaFormat.KEY_MAX_OUTPUT_CHANNEL_COUNT, 99)
```

### Java

```java    
    MediaFormat mediaFormat = new MediaFormat();
    mediaFormat.setInteger(MediaFormat.KEY_MAX_OUTPUT_CHANNEL_COUNT, 99);
```

For an example in action, see ExoPlayer's `MediaCodecAudioRenderer.java`. To turn spatialization off yourself, regardless of OEM customization, see Disabling spatial audio.
    
*   `AudioAttributes`: Audio is eligible for spatialization if the `usage`) is set to either `USAGE_MEDIA` or `USAGE_GAME`.
    
*   `AudioFormat`: Use a channel mask that contains at least the `AudioFormat.CHANNEL_OUT_QUAD` channels (front-left, front-right, back-left, and back-right) for the audio to be eligible for spatialization. In the example below, we use `AudioFormat.CHANNEL_OUT_5POINT1` for a 5.1 audio track. For a stereo audio track, use `AudioFormat.CHANNEL_OUT_STEREO`.
    
    If you are using Media3, you can use `Util.getAudioTrackChannelConfig(int channelCount)` to convert a channel count to a channel mask.
    
    In addition, set the encoding to `AudioFormat.ENCODING_PCM_16BIT` if you have configured the decoder to output multi-channel PCM.
    
### Kotlin

```kotlin    
    val audioFormat = AudioFormat.Builder()
      .setEncoding(AudioFormat.ENCODING_PCM_16BIT)
      .setChannelMask(AudioFormat.CHANNEL_OUT_5POINT1)
      .build()
```

### Java

```kotlin 
    AudioFormat audioFormat = new AudioFormat.Builder()
      .setEncoding(AudioFormat.ENCODING_PCM_16BIT)
      .setChannelMask(AudioFormat.CHANNEL_OUT_5POINT1)
      .build();
```

Test spatial audio
------------------

Ensure that spatial audio is enabled on your test device:

*   For wired headsets, go to **System settings > Sound & vibration > Spatial audio**.
*   For wireless headsets, go to **System settings > Connected devices > Gear icon for your wireless device > Spatial audio**.

To check for Spatial Audio availability for the current routing, run the `adb shell dumpsys audio` command on your device. You should see the following parameters in the output while playback is active:

```kotlin
    Spatial audio:
    mHasSpatializerEffect:true (effect present)
    isSpatializerEnabled:true (routing dependent)
```