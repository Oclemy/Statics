# Wi-Fi location: ranging with RTT

You can use the Wi-Fi location functionality provided by the Wi-Fi RTT (Round-Trip-Time) API to measure the distance to nearby RTT-capable Wi-Fi access points and peer Wi-Fi Aware devices.

If you measure the distance to three or more access points, you can use a multilateration algorithm to estimate the device position that best fits those measurements. The result is typically accurate within 1-2 meters.

With this accuracy, you can develop fine-grained location-based services, such as indoor navigation, disambiguated voice control (for example, "Turn on this light"), and location-based information (for example, "Are there special offers for this product?").

The requesting device doesn't need to connect to the access points to measure distance with Wi-Fi RTT. To maintain privacy, only the requesting device is able to determine the distance to the access point; the access points do not have this information. Wi-Fi RTT operations are unlimited for foreground apps but are throttled for background apps.

Wi-Fi RTT and the related _Fine-Time-Measurement_ (FTM) capabilities are specified by the IEEE 802.11-2016 standard. Wi-Fi RTT requires the precise time measurement provided by FTM because it calculates the distance between two devices by measuring the time a packet takes to make a round trip between the devices and multiplying that time by the speed of light.

Implementation differences based on Android version
---------------------------------------------------

Wi-Fi RTT was introduced in Android 9 (API level 28). When using this protocol to determine a device's position using multilateration with devices running Android 9, you need to have access to pre-determined access point (AP) locations data in your app. It is up to you to decide how to store and retrieve this data.

On devices running Android 10 (API level 29) and higher, AP location data can be represented as `ResponderLocation` objects, which include latitude, longitude, and altitude. For Wi-Fi RTT APs that support Location Configuration Information/Location Civic Report (LCI/LCR data), the protocol will return a `ResponderLocation` object during the ranging process.

This feature allows apps to query APs to ask them for their position directly rather than needing to store this information ahead of time. So, your app can find APs and determine their positions even if the APs were not known before, such as when a user enters a new building.

Requirements
------------

*   The hardware of the device making the ranging request must implement the 802.11-2016 FTM standard.
*   The device making the ranging request must be running Android 9 (API level 28) or later.
*   The device making the ranging request must have location services enabled and Wi-Fi scanning turned on (under **Settings > Location**).
*   If the app that's making the ranging request targets Android 13 (API level 33) or higher, it must have the `NEARBY_WIFI_DEVICES` permission. If such an app targets an earlier version of Android, it must have the `ACCESS_FINE_LOCATION` permission instead.
*   The app must query the range of access points while the app is visible or in a foreground service. The app cannot access location information from the background.
*   The access point must implement the IEEE 802.11-2016 FTM standard.

Setup
-----

To set up your app to use Wi-Fi RTT, perform the following steps.

#### 1. Request permissions

Request the following permissions in your app's manifest:

```xml
    <uses-permission android:name="android.permission.ACCESS_WIFI_STATE" />
    <uses-permission android:name="android.permission.CHANGE_WIFI_STATE" />
    <!-- If your app targets Android 13 (API level 33)
         or higher, you must declare the NEARBY_WIFI_DEVICES permission. -->
    <uses-permission android:name="android.permission.NEARBY_WIFI_DEVICES"
                     <!-- If your app derives location information from Wi-Fi APIs,
                          don't include the "usesPermissionFlags" attribute. -->
                     android:usesPermissionFlags="neverForLocation" />
    <uses-permission android:name="android.permission.ACCESS_FINE_LOCATION"
                     <!-- If any feature in your app relies on precise location
                          information, don't include the "maxSdkVersion"
                          attribute. -->
                     android:maxSdkVersion="32" />
```

The `NEARBY_WIFI_DEVICES` and `ACCESS_FINE_LOCATION` permissions are dangerous permissions, so you need to request them at runtime every time the user wants to perform an RTT scan operation. Your app will need to request the user's permission if the permission has not already been granted. For more information about runtime permissions, see Request App Permissions.

#### 2. Check whether the device supports Wi-Fi RTT

To check whether the device supports Wi-Fi RTT, use the PackageManager API:

### Kotlin

```kotlin
context.packageManager.hasSystemFeature(PackageManager.FEATURE_WIFI_RTT)
```

### Java

```java
context.getPackageManager().hasSystemFeature(PackageManager.FEATURE_WIFI_RTT);
```

#### 3. Check whether Wi-Fi RTT is available

Wi-Fi RTT may exist on the device, but it may not be currently available because the user has disabled Wi-Fi. Depending on their hardware and firmware capabilities, some devices may not support Wi-Fi RTT if SoftAP or tethering are in use. To check whether Wi-Fi RTT is currently available, call isAvailable()).

The availability of Wi-Fi RTT can change at any time. Your app should register a BroadcastReceiver to receive ACTION_WIFI_RTT_STATE_CHANGED, which is sent when availability changes. When your app receives the broadcast intent, the app should check the current state of availability and adjust its behavior accordingly.

For example:

### Kotlin

```kotlin
val filter = IntentFilter(WifiRttManager.ACTION_WIFI_RTT_STATE_CHANGED)
val myReceiver = object: BroadcastReceiver() {

    override fun onReceive(context: Context, intent: Intent) {
        if (wifiRttManager.isAvailable) {
            …
        } else {
            …
        }
    }
}
context.registerReceiver(myReceiver, filter)
```

### Java

```java
IntentFilter filter =
    new IntentFilter(WifiRttManager.ACTION_WIFI_RTT_STATE_CHANGED);
BroadcastReceiver myReceiver = new BroadcastReceiver() {
    @Override
    public void onReceive(Context context, Intent intent) {
        if (wifiRttManager.isAvailable()) {
            …
        } else {
            …
        }
    }
};
context.registerReceiver(myReceiver, filter);
```

For more information, see Broadcasts.

Create a ranging request
------------------------

A ranging request (RangingRequest) is created by specifying a list of APs or Wi-Fi Aware peers to which a range is requested. Multiple access points or Wi-Fi Aware peers can be specified in a single ranging request; the distances to all devices are measured and returned.

For example, a request can use the addAccessPoint()) method to specify an access point to which to measure the distance:

### Kotlin

```kotlin
val req: RangingRequest = RangingRequest.Builder().run {
    addAccessPoint(ap1ScanResult)
    addAccessPoint(ap2ScanResult)
    build()
}
```

### Java

```java
RangingRequest.Builder builder = new RangingRequest.Builder();
builder.addAccessPoint(ap1ScanResult);
builder.addAccessPoint(ap2ScanResult);

RangingRequest req = builder.build();
```

An access point is identified by its ScanResult object, which can be obtained by calling WifiManager.getScanResults(). You can use addAccessPoints(List) to add multiple access points in a batch.

Similarly, a ranging request can add a Wi-Fi Aware peer using either its MAC address or its PeerHandle, using the addWifiAwarePeer(MacAddress peer) and addWifiAwarePeer(PeerHandle peer) methods, respectively. For more information about discovering Wi-Fi Aware peers, see the Wi-Fi Aware documentation.

Request ranging
---------------

An app issues a ranging request using the WifiRttManager.startRanging()) method and providing the following: a RangingRequest to specify the operation, an Executor to specify the callback context, and a RangingResultCallback to receive the results.

For example:

### Kotlin

```kotlin
val mgr = context.getSystemService(Context.WIFI_RTT_RANGING_SERVICE) as WifiRttManager
val request: RangingRequest = myRequest
mgr.startRanging(request, executor, object : RangingResultCallback() {

    override fun onRangingResults(results: List<RangingResult>) { … }

    override fun onRangingFailure(code: Int) { … }
})
```

### Java

```java
WifiRttManager mgr =
      (WifiRttManager) Context.getSystemService(Context.WIFI_RTT_RANGING_SERVICE);

RangingRequest request ...;
mgr.startRanging(request, executor, new RangingResultCallback() {

  @Override
  public void onRangingFailure(int code) { … }

  @Override
  public void onRangingResults(List<RangingResult> results) { … }
});
```

The ranging operation is performed asynchronously, and ranging results are returned in one of the callbacks of RangingResultCallback:

*   If the whole ranging operation fails, the onRangingFailure callback is triggered with a status code described in RangingResultCallback. Such a failure may happen if the service cannot execute a ranging operation at the time--for example, because Wi-Fi is disabled, because the application has requested too many ranging operations and is throttled, or because of a permission issue.
*   When the ranging operation completes, the onRangingResults callback is triggered with a list of results that matches the list of requests--one result for each request. The order of the results does not necessarily match the order of the requests. Note that ranging operation may complete but each result may still indicate a failure of that specific measurement.

Interpret ranging results
-------------------------

Each of the results returned by the onRangingResults callback is specified by a RangingResult object. On each request, do the following.

#### 1. Identify the request

Identify the request based on the information provided when creating the RangingRequest: most often a MAC address provided in the `ScanResult` identifying an access point. The MAC address can be obtained from the ranging result using the getMacAddress()) method.

The list of ranging results may be in different order than the peers (access points) specified in the ranging request, so you should use the MAC address to identify the peer, not the order of results.

#### 2. Determine whether each measurement was successful

To determine whether a measurement was successful, use the getStatus() method. Any value other than STATUS_SUCCESS indicates a failure. A failure means that all other fields of this result (except the request identification above) are invalid, and the corresponding `get*` method will fail with an IllegalStateException exception.

#### 3. Get results for each successful measurement

For each successful measurement, you can retrieve result values with the respective `get` methods:

*   Distance, in mm, and the standard deviation of the measurement:
    
    getDistanceMm()
    
    getDistanceStdDevMm()
    
*   RSSI of the packets used for the measurements:
    
    getRssi()
    
*   Time in milliseconds at which the measurement was taken (indicating time since boot):
    
    getRangingTimestampMillis()
    
*   Number of measurements that were attempted and the number of measurements that succeeded (and on which the distance measurements are based):
    
    getNumAttemptedMeasurements()
    
    getNumSuccessfulMeasurements()
    

Android devices that support WiFi-RTT
-------------------------------------

The tables below list some phones, access points, and retail, warehousing and distribution center devices that support WiFi-RTT. These are far from comprehensive. We encourage you to reach out to us to list your RTT capable-products here.

### Access Points

### Phones

Manufacturer and Model

Android Version

Pixel 6

9.0+

Pixel 6 Pro

9.0+

Pixel 5

9.0+

Pixel 5a

9.0+

Pixel 5a 5G

9.0+

Xiaomi Mi 10 Pro

9.0+

Xiaomi Mi 10

9.0+

Xiaomi Redmi Mi 9T Pro

9.0+

Xiaomi Mi 9T

9.0+

Xiaomi Mi 9

9.0+

Xiaomi Mi Note 10

9.0+

Xiaomi Mi Note 10 Lite

9.0+

Xiaomi Redmi Note 9S

9.0+

Xiaomi Redmi Note 9 Pro

9.0+

Xiaomi Redmi Note 8T

9.0+

Xiaomi Redmi Note 8

9.0+

Xiaomi Redmi K30 Pro

9.0+

Xiaomi Redmi K20 Pro

9.0+

Xiaomi Redmi K20

9.0+

Xiaomi Redmi Note 5 Pro

9.0+

Xiaomi Mi CC9 Pro

9.0+

LG G8X ThinQ

9.0+

LG V50S ThinQ

9.0+

LG V60 ThinQ

9.0+

LG V30

9.0+

Samsung Galaxy Note 10+ 5G

9.0+

Samsung Galaxy S20+ 5G

9.0+

Samsung Galaxy S20+

9.0+

Samsung Galaxy S20 5G

9.0+

Samsung Galaxy S20 Ultra 5G

9.0+

Samsung Galaxy S20

9.0+

Samsung Galaxy Note 10+

9.0+

Samsung Galaxy Note 10 5G

9.0+

Samsung Galaxy Note 10

9.0+

Samsung A9 Pro

9.0+

Google Pixel 4 XL

9.0+

Google Pixel 4

9.0+

Google Pixel 4a

9.0+

Google Pixel 3 XL

9.0+

Google Pixel 3

9.0+

Google Pixel 3a XL

9.0+

Google Pixel 3a

9.0+

Google Pixel 2 XL

9.0+

Google Pixel 2

9.0+

Google Pixel 1 XL

9.0+

Google Pixel 1

9.0+

Poco X2

9.0+

Sharp Aquos R3 SH-04L

9.0+

### Retail, Warehousing and Distribution Center Devices

Manufacturer and Model

Android Version

Zebra PS20

10.0+

Zebra TC52/TC52HC

10.0+

Zebra TC57

10.0+

Zebra TC72

10.0+

Zebra TC77

10.0+

Zebra MC93

10.0+

Zebra TC8300

10.0+

Zebra VC8300

10.0+

Zebra EC30

10.0+

Zebra ET51

10.0+

Zebra ET56

10.0+

Zebra L10

10.0+

Zebra CC600/CC6000

10.0+

Zebra MC3300x

10.0+

Zebra MC330x

10.0+

Zebra TC52x

10.0+

Zebra TC57x

10.0+

Zebra EC50 (LAN and HC)

10.0+

Zebra EC55 (WAN)

10.0+

Zebra WT6300

10.0+

Skorpio X5

10.0+