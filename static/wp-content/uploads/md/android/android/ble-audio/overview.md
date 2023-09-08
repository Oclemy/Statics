# Bluetooth Low Energy Audio

BLE Audio ensures that users can receive high fidelity audio without sacrificing battery life, and lets them seamlessly switch between different use cases. Android 13 (API level 33) includes built-in support for LE Audio.

You may wish to integrate BLE Audio for the following use cases:

*   Sharing audio: Users can simultaneously share multiple audio streams to one or more audio sink devices. Audio is synchronized between the source device and connected devices.
    
*   Broadcast Audio: Users can broadcast audio to friends and family, while also connecting to public broadcasts for information, entertainment, or accessibility.
    
*   LC3 audio codec support: This is the default audio codec and replaces the SBC codec used for A2DP (media) and mSBC in HFP (voice). LC3 is more efficient, reconfigurable, and higher quality.
    
*   Audio sampling improvements: Headsets can maintain high output audio quality when using microphones. Bluetooth classic lowers audio quality when using Bluetooth microphones. With BLE Audio, input and output sampling can reach 32 kHz.
    
*   Stereo microphone: Hearables can record audio with stereo microphones for spatial audio enhancements.
    
*   Hearing Aid Profile (HAP) support: HAP offers users greater accessibility and usage than previous ASHA protocols. Users can use their hearing aids for phone calls and VoIP applications.
    
*   Enhanced Attribute protocol (EATT) support: EATT allows developers to send multiple commands at once to paired hearables.
    

Key scenarios
-------------

There are four main categories of use cases:

1.  Conversational: Dialer and VoIP applications that require low-latency communication routing offer high quality audio and less battery usage.
    
2.  Gaming: Concurrent microphone and high fidelity playback allows for games to stream high quality audio to hearables. A gaming app can access BLE audio input when a game arms the Bluetooth microphone as ready to use. Then, when a player starts a live conversation with a peer player, the game app can use the microphone data without delay.
    
3.  Media: Media applications are allowed to set the audio manager's preferred device. The user can override this by changing their preferred device from within the system's settings.
    
4.  Accessibility: Hearing aids that support BLE Audio can now use the microphone, allowing users to continually use their hearing aids for a call.
    

BLE Audio APIs and methods
--------------------------

The following APIs and methods are required to support BLE Audio hearables:

### AudioManager

*   `setCommunicationDevice()`) selects the audio device that should be used for communication use cases, for instance voice or video calls. This method can be used by voice or video chat applications to select a different audio device other than the one selected by default by the platform. This API replaces the following deprecated APIs: `startBluetoothSco()`), `stopBluetoothSco()`), and `setSpeakerphoneOn()`).
*   `clearCommunicationDevice` is called after your app finishes a call or session to help ensure the user has a great experience when moving between different applications.

### BluetoothProfile

*   `BluetoothLeAudio` controls the bluetooth service via proxy object.

### Telecom InCall Service

*   `setAudioRoute()`) sets the audio route to the current active device.
*   `CallAudioState.ROUTE_BLUETOOTH` directs the audio stream through Bluetooth.
*   `requestBluetoothAudio()`) requests audio routing to a specific bluetooth device.

### Audio Device Info

*   `AudioDeviceInfo.TYPE_BLE_HEADSET` describes the audio device type as a bluetooth low energy audio device. Used for identifying if the hearable device is a BLE Audio device.

### Audio Recorder

*   `setPreferredDevice()`) sets the preferred device for audio routing to use. The user can override this in the system settings.

### Bluetooth Adapter

*   `isLeAudioSupported()` returns if the platform's hardware supports BLE Audio.
*   `isLeAudioBroadcastSourceSupported()`) returns if the platform's hardware supports BLE Audio.

Guides based on use case
------------------------

Below are guidelines for implementing BLE Audio based on specific use cases.

### Voice communication applications

Voice communication applications have the choice of managing audio routing and device state by self managing their state or by using the Telecom API which does the audio routing and state logic for you.

*   Self-Managed: For applications that are currently using `startBluetoothSco()`), `stopBluetoothSco()`), and `setSpeakerphoneOn()`) or wish to self-manage the audio routing state, follow the Audio Manager self-managed call guide.
    
*   Managed: Use the Telecom API to create an audio or video calling application. This API allows you to quickly and easily control audio routing and switch between Bluetooth devices. For more information, see the Telecom managed calls guide.
    

### Audio recording applications

*   Media Recorder: When recording audio using the Media Recorder, you can now record in stereo if the bluetooth hearable supports BLE Audio. Check out the Audio recording guide.