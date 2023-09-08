# Companion device pairing

On devices running Android 8.0 (API level 26) and higher, companion device pairing performs a Bluetooth or Wi-Fi scan of nearby devices on behalf of your app without requiring the `ACCESS_FINE_LOCATION` permission. This helps maximize user privacy protections. After the device is paired, the device can leverage the `REQUEST_COMPANION_RUN_IN_BACKGROUND` and `REQUEST_COMPANION_USE_DATA_IN_BACKGROUND` permissions to start the app from the background. Use this method to perform the initial configuration of the companion device, such as a BLE-capable smart watch.

Companion device pairing doesn't create connections on its own. Bluetooth and Wi-Fi connectivity APIs establish connections. Nor does companion device pairing enable continuous scanning.

A user can select a device from a list and grant it permission to access an app. These permissions are revoked if you uninstall the app or call `disassociate()`). An app is responsible for clearing its own associations if the user no longer needs them, such as when they log out or remove bonded devices.

Implement companion device pairing
----------------------------------

To make and manage a connection to a companion device, use the `CompanionDeviceManager`. This section explains how to customize your pairing request dialog when you pair your app with companion devices over Bluetooth, BLE, and Wi-Fi.

### Specify companion devices

The following code sample shows how to add the `<uses-feature>` flag to a manifest file. This tells the system that your app intends to set up companion devices.

```xml
    <uses-feature android:name="android.software.companion_device_setup"/>
```

### List devices by type

![](https://developer.android.com/static/images/guide/topics/connectivity/companion-device-pairing.png)

**Figure 1.** The Companion Device Pairing screen, limited to a single pairing option.

You can display all possible companion devices available that match the filter you provide, or limit the display to a single option (shown in figure 1). You configure this by creating a filter that specifies what types of devices your app is looking for or by setting `setSingleDevice()`) to `true`.

To apply a filter to the list of companion devices that appears in your request dialog, check if Bluetooth is on or check if Wi-Fi is on. After a connection is enabled, you can add a `DeviceFilter`. The following subclasses of `DeviceFilter` specify the types of devices your app can associate with based on a connection type:

*   `BluetoothDeviceFilter`
*   `BluetoothLeDeviceFilter`
*   `WifiDeviceFilter`

All three subclasses have builders that streamline the configuration of filters. In the following example, a device scans for a Bluetooth device with a `BluetoothDeviceFilter`.

### Kotlin

```kotlin
val deviceFilter: BluetoothDeviceFilter = BluetoothDeviceFilter.Builder()
        // Match only Bluetooth devices whose name matches the pattern.
        .setNamePattern(Pattern.compile("My device"))
        // Match only Bluetooth devices whose service UUID matches this pattern.
        .addServiceUuid(ParcelUuid(UUID(0x123abcL, -1L)), null)
        .build()
```

### Java

```java
BluetoothDeviceFilter deviceFilter = new BluetoothDeviceFilter.Builder()
        // Match only Bluetooth devices whose name matches the pattern.
        .setNamePattern(Pattern.compile("My device"))
        // Match only Bluetooth devices whose service UUID matches this pattern.
        .addServiceUuid(new ParcelUuid(new UUID(0x123abcL, -1L)), null)
        .build();
```

Set a `DeviceFilter` to an `AssociationRequest` so the device manager can determine what type of device to seek.

### Kotlin

```kotlin
val pairingRequest: AssociationRequest = AssociationRequest.Builder()
        // Find only devices that match this request filter.
        .addDeviceFilter(deviceFilter)
        // Stop scanning as soon as one device matching the filter is found.
        .setSingleDevice(true)
        .build()
```

### Java

```java
AssociationRequest pairingRequest = new AssociationRequest.Builder()
        // Find only devices that match this request filter.
        .addDeviceFilter(deviceFilter)
        // Stop scanning as soon as one device matching the filter is found.
        .setSingleDevice(true)
        .build();
```

After you initialize an `AssociationRequest`, run the `associate()`) function on the `CompanionDeviceManager`. The `associate()` function takes in pairing request object and callback. Callbacks indicate when an app locates a device and it's ready to launch a dialog box for the user to input their choice. If an app doesn't find any devices, the callback returns an error message.

### Kotlin

```kotlin
val deviceManager =
      requireContext().getSystemService(Context.COMPANION_DEVICE_SERVICE)

deviceManager.associate(pairingRequest,
    object : CompanionDeviceManager.Callback() {
        // Called when a device is found. Launch the IntentSender so the user
        // can select the device they want to pair with.
        override fun onDeviceFound(chooserLauncher: IntentSender) {
            startIntentSenderForResult(chooserLauncher,
                SELECT_DEVICE_REQUEST_CODE, null, 0, 0, 0)
        }

        override fun onFailure(error: CharSequence?) {
            // Handle the failure.
        }
    }, null)
```

### Java

```java
CompanionDeviceManager deviceManager =
        (CompanionDeviceManager) getSystemService(Context.COMPANION_DEVICE_SERVICE);
deviceManager.associate(pairingRequest, new CompanionDeviceManager.Callback() {
    // Called when a device is found. Launch the IntentSender so the user can
    // select the device they want to pair with.
    @Override
    public void onDeviceFound(IntentSender chooserLauncher) {
        try {
            startIntentSenderForResult(
                    chooserLauncher, SELECT_DEVICE_REQUEST_CODE, null, 0, 0, 0
            );
        } catch (IntentSender.SendIntentException e) {
            Log.e("MainActivity", "Failed to send intent");
        }
    }

    @Override
    public void onFailure(CharSequence error) {
        // Handle the failure.
    }
}, null);
```

To empower users to select what type of devices they want to connect to, start a preferences activity with the `chooserLauncher` parameter in the `onDeviceFound()`) function. The results of this action are sent back to the fragment in the `onActivityResult()`) function of your preferences activity. This updates you when the user makes a selection based on the result. You can then access the selected device. When a user selects a Bluetooth device, the result sent is a `BluetoothDevice` object. Similarly, when the `onDeviceFound()` function detects that a user selects a Bluetooth LE device, expect an `android.bluetooth.le.ScanResult` object. For Wi-Fi devices, expect a `android.net.wifi.ScanResult` object.

### Kotlin

```kotlin
override fun onActivityResult(requestCode: Int, resultCode: Int, data: Intent?) {
    when (requestCode) {
        SELECT_DEVICE_REQUEST_CODE -> when(resultCode) {
            Activity.RESULT_OK -> {
                // The user chose to pair the app with a Bluetooth device.
                val deviceToPair: BluetoothDevice? =
data?.getParcelableExtra(CompanionDeviceManager.EXTRA_DEVICE)
                deviceToPair?.let { device ->
                    device.createBond()
                    // Continue to interact with the paired device.
                }
            }
        }
        else -> super.onActivityResult(requestCode, resultCode, data)
    }
}
```

### Java

```java
@Override
protected void onActivityResult(int requestCode, int resultCode, @Nullable Intent data) {
    if (resultCode != Activity.RESULT_OK) {
        return;
    }
    if (requestCode == SELECT_DEVICE_REQUEST_CODE && data != null) {
        BluetoothDevice deviceToPair =
data.getParcelableExtra(CompanionDeviceManager.EXTRA_DEVICE);
        if (deviceToPair != null) {
            deviceToPair.createBond();
            // Continue to interact with the paired device.
        }
    } else {
        super.onActivityResult(requestCode, resultCode, data);
    }
}
```

To implement companion device pairing with filters that can specify devices and list them by type, see the following example:

### Kotlin

```kotlin
private const val SELECT_DEVICE_REQUEST_CODE = 0

class MainActivity : AppCompatActivity() {

    private val deviceManager: CompanionDeviceManager by lazy {
        getSystemService(Context.COMPANION_DEVICE_SERVICE) as CompanionDeviceManager
    }

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_main)

        // To skip filters based on names and supported feature flags (UUIDs),
        // omit calls to setNamePattern() and addServiceUuid()
        // respectively, as shown in the following  Bluetooth example.
        val deviceFilter: BluetoothDeviceFilter = BluetoothDeviceFilter.Builder()
            .setNamePattern(Pattern.compile("My device"))
            .addServiceUuid(ParcelUuid(UUID(0x123abcL, -1L)), null)
            .build()

        // The argument provided in setSingleDevice() determines whether a single
        // device name or a list of them appears.
        val pairingRequest: AssociationRequest = AssociationRequest.Builder()
            .addDeviceFilter(deviceFilter)
            .setSingleDevice(true)
            .build()

        // When the app tries to pair with a Bluetooth device, show the
        // corresponding dialog box to the user.
        deviceManager.associate(pairingRequest,
            object : CompanionDeviceManager.Callback() {

                override fun onDeviceFound(chooserLauncher: IntentSender) {
                    startIntentSenderForResult(chooserLauncher,
                        SELECT_DEVICE_REQUEST_CODE, null, 0, 0, 0)
                }

                override fun onFailure(error: CharSequence?) {
                    // Handle the failure.
                }
            }, null)
    }

    override fun onActivityResult(requestCode: Int, resultCode: Int, data: Intent?) {
        when (requestCode) {
            SELECT_DEVICE_REQUEST_CODE -> when(resultCode) {
                Activity.RESULT_OK -> {
                    // The user chose to pair the app with a Bluetooth device.
                    val deviceToPair: BluetoothDevice? =
                        data?.getParcelableExtra(CompanionDeviceManager.EXTRA_DEVICE)
                    deviceToPair?.let { device ->
                        device.createBond()
                        // Maintain continuous interaction with a paired device.
                    }
                }
            }
            else -> super.onActivityResult(requestCode, resultCode, data)
        }
    }
}
```

### Java

```java
class MainActivityJava extends AppCompatActivity {

    private static final int SELECT_DEVICE_REQUEST_CODE = 0;

    @Override
    protected void onCreate(@Nullable Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);

        CompanionDeviceManager deviceManager =
            (CompanionDeviceManager) getSystemService(
                Context.COMPANION_DEVICE_SERVICE
            );

        // To skip filtering based on name and supported feature flags,
        // don't include calls to setNamePattern() and addServiceUuid(),
        // respectively. This example uses Bluetooth.
        BluetoothDeviceFilter deviceFilter = 
            new BluetoothDeviceFilter.Builder()
                .setNamePattern(Pattern.compile("My device"))
                .addServiceUuid(
                    new ParcelUuid(new UUID(0x123abcL, -1L)), null
                )
                .build();

        // The argument provided in setSingleDevice() determines whether a single
        // device name or a list of device names is presented to the user as
        // pairing options.
        AssociationRequest pairingRequest = new AssociationRequest.Builder()
            .addDeviceFilter(deviceFilter)
            .setSingleDevice(true)
            .build();

        // When the app tries to pair with the Bluetooth device, show the
        // appropriate pairing request dialog to the user.
        deviceManager.associate(pairingRequest,
            new CompanionDeviceManager.Callback() {
                @Override
                public void onDeviceFound(IntentSender chooserLauncher) {
                    try {
                        startIntentSenderForResult(chooserLauncher,
                            SELECT_DEVICE_REQUEST_CODE, null, 0, 0, 0);
                    } catch (IntentSender.SendIntentException e) {
                        // failed to send the intent
                    }
                }

                @Override
                public void onFailure(CharSequence error) {
                    // handle failure to find the companion device
                }
            }, null);
    }

    @Override
    protected void onActivityResult(int requestCode, int resultCode, @Nullable Intent data) {
        if (requestCode == SELECT_DEVICE_REQUEST_CODE) {
            if (resultCode == Activity.RESULT_OK && data != null) {
                BluetoothDevice deviceToPair = data.getParcelableExtra(
                    CompanionDeviceManager.EXTRA_DEVICE
                );

                if (deviceToPair != null) {
                    deviceToPair.createBond();
                    // ... Continue interacting with the paired device.
                }
            }
        } else {
            super.onActivityResult(requestCode, resultCode, data);
        }
    }
}
```

### Companion device profiles

Partner apps on Android 12 (API level 31) and higher can use companion device profiles when connecting to a watch. For more information, see the guide to requesting permissions on Wear OS.

### Keep companion apps awake

On Android 12 (API level 31) and higher, you can use additional APIs help your companion app stay running while a companion device is within range. These APIs let you do the following:

*   Wake your app when a companion device is within range.
    
    For details, see `CompanionDeviceManager.startObservingDevicePresence()`).
    
*   Guarantee that an app process will continue running so long as the companion device stays within range.
    
    For details, see `CompanionDeviceService.onDeviceAppeared()`).