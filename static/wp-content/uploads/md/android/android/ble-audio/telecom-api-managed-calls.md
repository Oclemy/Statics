# Manage calls using the Telecom API

This guide covers how to route audio for Bluetooth devices using the Telecom API and set the connection for VoIP calls. Read the Build a calling app guide before continuing.

By using the `ConnectionService` and `Connection` classes, you can access the audio state and a list of available Bluetooth devices, and can route audio to a selected Bluetooth device.

VoIP Connection and ConnectionService
-------------------------------------

Create a `VoIPConnection` class that extends from `Connection`. This class controls the state of the current call. As the Build a calling app guide states, make this a self-managed application and set the audio mode for a VoIP application.

### Kotlin

```kotlin
class VoIPConnection : Connection() {
  init {
    setConnectionProperties(PROPERTY_SELF_MANAGED)
    setAudioModeIsVoip(true)
  }
}
```

### Java

```java
public class VoIPConnection extends Connection {
  public VoIPConnection() {
    setConnectionProperties(PROPERTY_SELF_MANAGED);
    setAudioModeIsVoip(true);
  }
}
```

Next, return an instance of this class in `ConnectionService` when an incoming or outgoing call occurs.

### Kotlin

```kotlin
class VoIPConnectionService : ConnectionService() {
  override fun onCreateOutgoingConnection(
    connectionManagerPhoneAccount: PhoneAccountHandle,
    request: ConnectionRequest,
  ): Connection {
    return VoIPConnection()
  }
}
```

### Java

```java
public class VoIPConnectionService extends ConnectionService {
  @Override
  public Connection onCreateOutgoingConnection(PhoneAccountHandle connectionManagerPhoneAccount, ConnectionRequest request) {
    return new VoIPConnection();
  }
}
```

Ensure the manifest correctly points to the `VoIPConnectionService` class.

```xml
    <service android:name=".voip.TelegramConnectionService" android:permission="android.permission.BIND_TELECOM_CONNECTION_SERVICE">
      <intent-filter>
        <action android:name="android.telecom.ConnectionService"/>
      </intent-filter>
    </service>
```

With these custom `Connection` and `ConnectionService` classes, you can control which device and what type of audio routing you wish to use during a call.

Get the current audio state
---------------------------

To get the current audio state, call `getCallAudioState()`). `getCallAudioState()`) returns if the device is streaming using Bluetooth, Earpiece, Wired, or Speaker.

```xml
    mAudioState = connection.getCallAudioState()
```

On State Changed
----------------

Subscribe to changes in CallAudioState by overriding `onCallAudioStateChanged()`). This alerts you of any changes to the state.

### Kotlin

```kotlin
fun onCallAudioStateChanged(audioState: CallAudioState) {
  mAudioState = audioState
}
```

### Java

```java
@Override
public void onCallAudioStateChanged(CallAudioState audioState) {
  mAudioState = audioState;
}
```

Get the current device
----------------------

Get the current active device using `CallAudioState.getActiveBluetoothDevice()`). This function returns the active Bluetooth device.

### Kotlin

```kotlin
val activeDevice: BluetoothDevice = mAudioState.getActiveBluetoothDevice()
```

### Java

```java
BluetoothDevice activeDevice = mAudioState.getActiveBluetoothDevice();
```

Get Bluetooth devices
---------------------

Get a list of Bluetooth devices that are available for call audio routing using `CallAudioState.getSupportedBluetoothDevices()`).

### Kotlin

```kotlin
val availableBluetoothDevices: Collection =
  mAudioState.getSupportedBluetoothDevices()
```

### Java

```java
Collection availableBluetoothDevices = mAudioState.getSupportedBluetoothDevices();
```

Route the call audio
--------------------

### Using API level 28 and higher (recommended)

Route the call audio to an available Bluetooth device using `requestBluetoothAudio(BluetoothDevice)`):

```java
    requestBluetoothAudio(availableBluetoothDevices[0]);
```

### Using API level 23 and higher

Enable `ROUTE_BLUETOOTH` without specifying the device using `setAudioRoute(int)`). This defaults routing to current, active bluetooth devices on Android 9 and higher.

```java
    setAudioRoute(CallAudioState.ROUTE_BLUETOOTH);
```