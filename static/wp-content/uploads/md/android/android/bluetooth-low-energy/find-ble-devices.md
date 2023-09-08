# Find BLE devices

To find BLE devices, you use the `startScan()`) method. This method takes a `ScanCallback` as a parameter. You must implement this callback, because that is how scan results are returned. Because scanning is battery-intensive, you should observe the following guidelines:

*   As soon as you find the desired device, stop scanning.
*   Never scan on a loop, and always set a time limit on your scan. A device that was previously available may have moved out of range, and continuing to scan drains the battery.

In the following example, the BLE app provides an activity (`DeviceScanActivity`) to scan for available Bluetooth LE devices and display them in a list to the user. The following snippet shows how to start and stop a scan:

### Kotlin

```kotlin
private val bluetoothLeScanner = bluetoothAdapter.bluetoothLeScanner
private var scanning = false
private val handler = Handler()

// Stops scanning after 10 seconds.
private val SCAN_PERIOD: Long = 10000

private fun scanLeDevice() {
    if (!scanning) { // Stops scanning after a pre-defined scan period.
        handler.postDelayed({
            scanning = false
            bluetoothLeScanner.stopScan(leScanCallback)
        }, SCAN_PERIOD)
        scanning = true
        bluetoothLeScanner.startScan(leScanCallback)
    } else {
        scanning = false
        bluetoothLeScanner.stopScan(leScanCallback)
    }
}
```

### Java

```java
private BluetoothLeScanner bluetoothLeScanner = bluetoothAdapter.getBluetoothLeScanner();
private boolean scanning;
private Handler handler = new Handler();

// Stops scanning after 10 seconds.
private static final long SCAN_PERIOD = 10000;

private void scanLeDevice() {
    if (!scanning) {
        // Stops scanning after a predefined scan period.
        handler.postDelayed(new Runnable() {
            @Override
            public void run() {
                scanning = false;
                bluetoothLeScanner.stopScan(leScanCallback);
            }
        }, SCAN_PERIOD);

        scanning = true;
        bluetoothLeScanner.startScan(leScanCallback);
    } else {
        scanning = false;
        bluetoothLeScanner.stopScan(leScanCallback);
    }
}
```

To scan for only specific types of peripherals, you can instead call `startScan(List<ScanFilter>, ScanSettings, ScanCallback)`), providing a list of `ScanFilter` objects that restrict the devices that the scan looks for and a `ScanSettings` object that specifies parameters about the scan.

The following code sample is an implementation of `ScanCallback`, which is the interface used to deliver BLE scan results. When results are found, they are added to a list adapter in the `DeviceScanActivity` to display to the user.

### Kotlin

```kotlin
private val leDeviceListAdapter = LeDeviceListAdapter()
// Device scan callback.
private val leScanCallback: ScanCallback = object : ScanCallback() {
    override fun onScanResult(callbackType: Int, result: ScanResult) {
        super.onScanResult(callbackType, result)
        leDeviceListAdapter.addDevice(result.device)
        leDeviceListAdapter.notifyDataSetChanged()
    }
}
```

### Java

```java
private LeDeviceListAdapter leDeviceListAdapter = new LeDeviceListAdapter();

// Device scan callback.
private ScanCallback leScanCallback =
        new ScanCallback() {
            @Override
            public void onScanResult(int callbackType, ScanResult result) {
                super.onScanResult(callbackType, result);
                leDeviceListAdapter.addDevice(result.getDevice());
                leDeviceListAdapter.notifyDataSetChanged();
            }
        };
```