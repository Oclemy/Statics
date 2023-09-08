# Audio recording

Bluetooth audio profiles based on Bluetooth Low Energy (BLE) Audio allow bidirectional streaming of high quality audio (for example, stereo audio with a 32 kHz sampling rate). This is possible thanks to the creation of the LE Isochronous Channel (ISO). ISO is similar to the Synchronous Connection-Oriented (SCO) Link because it also uses reserved wireless bandwidth, but the bandwidth reservation is no longer capped at 64 Kbps and can be dynamically adjusted.

Bluetooth audio input can use the latest AudioManager API for nearly all use cases, excluding phone calls. This guide covers how to record stereo audio from BLE Audio hearables.

Configure your application
--------------------------

First, configure your application to target the correct SDK in `build.gradle`:

```groovy
    targetSdkVersion 31
```

Register audio callback
-----------------------

Create an `AudioDeviceCallback`) that lets your application know of any changes to connected or disconnected `AudioDevices`.

```java
    final AudioDeviceCallback audioDeviceCallback = new AudioDeviceCallback() {
      @Override
      public void onAudioDevicesAdded(AudioDeviceInfo[] addedDevices) {
        };
      @Override
      public void onAudioDevicesRemoved(AudioDeviceInfo[] removedDevices) {
        // Handle device removal
      };
    };
    
    audioManager.registerAudioDeviceCallback(audioDeviceCallback);
```

Find BLE Audio Device
---------------------

Get a list of all connected audio devices with input supported, then use `getType()`) to see if the device is a headset using `AudioDeviceInfo.TYPE_BLE_HEADSET`.

### Kotlin

```kotlin
val allDeviceInfo = audioManager.getDevices(GET_DEVICES_INPUTS)
var bleInputDevice: AudioDeviceInfo? = null
  for (device in allDeviceInfo) {
    if (device.type == AudioDeviceInfo.TYPE_BLE_HEADSET) {
      bleInputDevice = device
      break
    }
  }
```

### Java

```java
AudioDeviceInfo[] allDeviceInfo = audioManager.getDevices(GET_DEVICES_INPUTS);
AudioDeviceInfo bleInputDevice = null;
for (AudioDeviceInfo device : allDeviceInfo) {
  if (device.getType() == AudioDeviceInfo.TYPE_BLE_HEADSET) {
    bleInputDevice = device;
    break;
  }
}
```

Stereo support
--------------

To check if stereo microphones are supported on the selected device, see if the device has two or more channels. If the device only has one channel, set the channel mask to mono.

### Kotlin

```kotlin
var channelMask: Int = AudioFormat.CHANNEL_IN_MONO
if (audioDevice.channelCounts.size >= 2) {
  channelMask = AudioFormat.CHANNEL_IN_STEREO
}
```

### Java

```java
if (bleInputDevice.getChannelCounts() >= 2) {
  channelMask = AudioFormat.CHANNEL_IN_STEREO;
};
```

Set up the audio recorder
-------------------------

Audio recorders can be set up using the standard `AudioRecord` builder. Use the channel mask to select stereo or mono configuration.

### Kotlin

```kotlin
val recorder = AudioRecord.Builder()
  .setAudioSource(MediaRecorder.AudioSource.MIC)
  .setAudioFormat(AudioFormat.Builder()
    .setEncoding(AudioFormat.ENCODING_PCM_16BIT)
    .setSampleRate(32000)
    .setChannelMask(channelMask)
    .build())
  .setBufferSizeInBytes(2 * minBuffSizeBytes)
  .build()
```

### Java

```java
AudioRecord recorder = new AudioRecord.Builder()
  .setAudioSource(MediaRecorder.AudioSource.MIC)
  .setAudioFormat(new AudioFormat.Builder()
    .setEncoding(AudioFormat.ENCODING_PCM_16BIT)
    .setSampleRate(32000)
    .setChannelMask(channelMask)
    .build())
  .setBufferSizeInBytes(2*minBuffSizeBytes)
  .build();
```

Set preferred device
--------------------

Setting a preferred device informs the audio `recorder` which audio device you wish to record with.

### Kotlin

```kotlin
recorder.preferredDevice = audioDevice
```

### Java

```java
recorder.setPreferredDevice(bleInputDevice);
```

Now, you can record audio as outlined in the MediaRecorder guide.