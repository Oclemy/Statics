# Wi-Fi Aware overview

Wi-Fi Aware capabilities enable devices running Android 8.0 (API level 26) and higher to discover and connect directly to each other without any other type of connectivity between them. Wi-Fi Aware is also known as _Neighbor Awareness Networking_ (NAN).

Wi-Fi Aware networking works by forming clusters with neighboring devices, or by creating a new cluster if the device is the first one in an area. This clustering behavior applies to the entire device and is managed by the Wi-Fi Aware system service; apps have no control over clustering behavior. Apps use the Wi-Fi Aware APIs to talk to the Wi-Fi Aware system service, which manages the Wi-Fi Aware hardware on the device.

The Wi-Fi Aware APIs let apps perform the following operations:

*   **Discover other devices:** The API has a mechanism for finding other nearby devices. The process starts when one device _publishes_ one or more discoverable services. Then, when a device _subscribes_ to one or more services and enters the publisher's Wi-Fi range, the subscriber receives a notification that a matching publisher has been discovered. After the subscriber discovers a publisher, the subscriber can either send a short message or establish a network connection with the discovered device. Devices can concurrently be both publishers and subscribers.
    
*   **Create a network connection:** After two devices have discovered each other they can create a bi-directional Wi-Fi Aware network connection without an access point.
    

Wi-Fi Aware network connections support higher throughput rates across longer distances than Bluetooth connections. These types of connections are useful for apps that share large amounts of data between users, such as photo-sharing apps.

Android 12 (API level 31) enhancements
--------------------------------------

Android 12 (API level 31) adds some enhancements to Wi-Fi Aware:

*   On devices running Android 12 (API level 31) or higher, you can use the `onServiceLost()`) callback to be alerted when your app has lost a discovered service due to the service stopping or moving out of range.
*   The setup of Wi-Fi Aware data paths has been simiplified. Earlier versions used L2 messaging to provide the MAC address of the initiator, which introduced latency. On devices running Android 12 and higher, the responder (server) can be configured to accept any peer—that is, it doesn’t need to know the MAC address of the initator upfront. This speeds up datapath bringup and enables multiple point-to-point links with only one network request.
*   Apps running on Android 12 or higher can use the `WifiAwareManager.getAvailableAwareResources()`) method to get the number of currently available data paths, publish sessions, and subscribe sessions. This can help the app determine if there are enough available resources to execute their desired functionality.

Initial setup
-------------

To set up your app to use Wi-Fi Aware discovery and networking, perform the following steps:

1.  Request the following permissions in your app's manifest:

```xml  
    <uses-permission android:name="android.permission.ACCESS_WIFI_STATE" />
    <uses-permission android:name="android.permission.CHANGE_WIFI_STATE" />
    <uses-permission android:name="android.permission.CHANGE_NETWORK_STATE" />
    <uses-permission android:name="android.permission.INTERNET" />
    <!-- If your app targets Android 13 (API level 33)
         or higher, you must declare the NEARBY_WIFI_DEVICES permission. -->
    <uses-permission android:name="android.permission.NEARBY_WIFI_DEVICES"
                     <!-- If your app derives location information from
                          Wi-Fi APIs, don't include the "usesPermissionFlags"
                          attribute. -->
                     android:usesPermissionFlags="neverForLocation" />
    <uses-permission android:name="android.permission.ACCESS_FINE_LOCATION"
                     <!-- If any feature in your app relies on precise location
                          information, don't include the "maxSdkVersion"
                          attribute. -->
                     android:maxSdkVersion="32" /> 
```

2.  Check whether the device supports Wi-Fi Aware with the `PackageManager` API, as shown below:
    
### Kotlin

```kotlin    
    context.packageManager.hasSystemFeature(PackageManager.FEATURE_WIFI_AWARE)
```

### Java

```java    
    context.getPackageManager().hasSystemFeature(PackageManager.FEATURE_WIFI_AWARE);
```

3.  Check whether Wi-Fi Aware is currently available. Wi-Fi Aware may exist on the device, but may not be currently available because the user has disabled Wi-Fi or Location. Depending on their hardware and firmware capabilities, some devices may not support Wi-Fi Aware if Wi-Fi Direct, SoftAP, or tethering is in use. To check whether Wi-Fi Aware is currently available, call `isAvailable()`.
    
    The availability of Wi-Fi Aware can change at any time. Your app should register a `BroadcastReceiver` to receive `ACTION_WIFI_AWARE_STATE_CHANGED`, which is sent whenever availability changes. When your app receives the broadcast intent, it should discard all existing sessions (assume that Wi-Fi Aware service was disrupted), then check the current state of availability and adjust its behavior accordingly. For example:
    
### Kotlin
    
```kotlin
    val wifiAwareManager = context.getSystemService(Context.WIFI_AWARE_SERVICE) as WifiAwareManager?
    val filter = IntentFilter(WifiAwareManager.ACTION_WIFI_AWARE_STATE_CHANGED)
    val myReceiver = object : BroadcastReceiver() {
    
        override fun onReceive(context: Context, intent: Intent) {
            // discard current sessions
            if (wifiAwareManager?.isAvailable) {
                ...
            } else {
                ...
            }
        }
    }
    context.registerReceiver(myReceiver, filter)
```

### Java

```java    
    WifiAwareManager wifiAwareManager = 
            (WifiAwareManager)context.getSystemService(Context.WIFI_AWARE_SERVICE)
    IntentFilter filter =
            new IntentFilter(WifiAwareManager.ACTION_WIFI_AWARE_STATE_CHANGED);
    BroadcastReceiver myReceiver = new BroadcastReceiver() {
        @Override
        public void onReceive(Context context, Intent intent) {
            // discard current sessions
            if (wifiAwareManager.isAvailable()) {
                ...
            } else {
                ...
            }
        }
    };
    context.registerReceiver(myReceiver, filter);
```

For more information, see Broadcasts.

Obtain a session
----------------

To start using Wi-Fi Aware, your app must obtain a `WifiAwareSession` by calling `attach()`. This method does the following:

*   Turns on the Wi-Fi Aware hardware.
*   Joins or forms a Wi-Fi Aware cluster.
*   Creates a Wi-Fi Aware session with a unique namespace that acts as a container for all discovery sessions created within it.

If the app attaches successfully, the system executes the `onAttached()` callback. This callback provides a `WifiAwareSession` object that your app should use for all further session operations. An app can use the session to publish a service or subscribe to a service.

Your app should call `attach()` only once. If your app calls `attach()` multiple times, the app receives a different session for each call, each with its own namespace. This could be useful in complex scenarios, but should generally be avoided.

Publish a service
-----------------

To make a service discoverable, call the `publish()` method, which takes the following parameters:

*   `PublishConfig` specifies the name of the service and other configuration properties, such as match filter.
*   `DiscoverySessionCallback` specifies the actions to execute when events occur, such as when the subscriber receives a message.

Here's an example:

### Kotlin

```kotlin
val config: PublishConfig = PublishConfig.Builder()
        .setServiceName(AWARE_FILE_SHARE_SERVICE_NAME)
        .build()
awareSession.publish(config, object : DiscoverySessionCallback() {

    override fun onPublishStarted(session: PublishDiscoverySession) {
        ...
    }

    override fun onMessageReceived(peerHandle: PeerHandle, message: ByteArray) {
        ...
    }
})
```

### Java

```java
PublishConfig config = new PublishConfig.Builder()
    .setServiceName(“Aware_File_Share_Service_Name”)
    .build();

awareSession.publish(config, new DiscoverySessionCallback() {
    @Override
    public void onPublishStarted(PublishDiscoverySession session) {
        ...
    }
    @Override
    public void onMessageReceived(PeerHandle peerHandle, byte[] message) {
        ...
    }
}, null);
```

If publication succeeds, then the `onPublishStarted()` callback method is called.

After publication, when devices running matching subscriber apps move into the Wi-Fi range of the publishing device, the subscribers discover the service. When a subscriber discovers a publisher, the publisher does not receive a notification; if the subscriber sends a message to the publisher, however, then the publisher receives a notification. When that happens, the `onMessageReceived()` callback method is called. You can use the `PeerHandle` argument from this method to send a message back to the subscriber or create a connection to it.

To stop publishing the service, call `DiscoverySession.close()`. Discovery sessions are associated with their parent `WifiAwareSession`. If the parent session is closed, its associated discovery sessions are also closed. While discarded objects are closed as well, the system doesn't guarantee when out-of-scope sessions are closed, so we recommend that you explicitly call the `close()` methods.

Subscribe to a service
----------------------

To subscribe to a service, call the `subscribe()` method, which takes the following parameters:

*   `SubscribeConfig` specifies the name of the service to subscribe to and other configuration properties, such as match filter.
*   `DiscoverySessionCallback` specifies the actions to execute when events occur, such as when a publisher is discovered.

Here's an example:

### Kotlin

```kotlin
val config: SubscribeConfig = SubscribeConfig.Builder()
        .setServiceName(AWARE_FILE_SHARE_SERVICE_NAME)
        .build()
awareSession.subscribe(config, object : DiscoverySessionCallback() {

    override fun onSubscribeStarted(session: SubscribeDiscoverySession) {
        ...
    }

    override fun onServiceDiscovered(
            peerHandle: PeerHandle,
            serviceSpecificInfo: ByteArray,
            matchFilter: List<ByteArray>
    ) {
        ...
    }
}, null)
```

### Java

```java
SubscribeConfig config = new SubscribeConfig.Builder()
    .setServiceName("Aware_File_Share_Service_Name")
    .build();

awareSession.subscribe(config, new DiscoverySessionCallback() {
    @Override
    public void onSubscribeStarted(SubscribeDiscoverySession session) {
        ...
    }

    @Override
    public void onServiceDiscovered(PeerHandle peerHandle,
            byte[] serviceSpecificInfo, List<byte[]> matchFilter) {
        ...
    }
}, null);
```

If the subscribe operation succeeds, the system calls the `onSubscribeStarted()` callback in your app. Because you can use the `SubscribeDiscoverySession` argument in the callback to communicate with a publisher after your app has discovered one, you should save this reference. You can update the subscribe session at any time by calling `updateSubscribe()` on the discovery session.

At this point, your subscription waits for matching publishers to come into Wi-Fi range. When this happens, the system executes the `onServiceDiscovered()`) callback method. You can use the `PeerHandle` argument from this callback to send a message or create a connection to that publisher.

To stop subscribing to a service, call `DiscoverySession.close()`. Discovery sessions are associated with their parent `WifiAwareSession`. If the parent session is closed, its associated discovery sessions are also closed. While discarded objects are closed as well, the system doesn't guarantee when out-of-scope sessions are closed, so we recommend that you explicitly call the `close()` methods.

Send a message
--------------

To send a message to another device, you need the following objects:

*   A `DiscoverySession`. This object allows you to call `sendMessage()`. Your app gets a `DiscoverySession` by either publishing a service or subscribing to a service.
    
*   The other device's `PeerHandle`, to route the message. Your app gets another device's `PeerHandle` in one of two ways:
    
    *   Your app publishes a service and receives a message from a subscriber. Your app gets the subscriber's `PeerHandle` from the `onMessageReceived()` callback.
    *   Your app subscribes to a service. Then, when it discovers a matching publisher, your app gets the publisher's `PeerHandle` from the `onServiceDiscovered()`) callback.

To send a message, call `sendMessage()`. The following callbacks might then occur:

*   When the message is successfully received by the peer, the system calls the `onMessageSendSucceeded()` callback in the _sending_ app.
*   When the peer receives a message, the system calls the `onMessageReceived()` callback in the _receiving_ app.

Though the `PeerHandle` is required to communicate with peers, you should not rely on it as a permanent identifier of peers. Higher-level identifiers can be used by the application--embedded in the discovery service itself or in subsequent messages. You can embed an identifier in the discovery service with the `setMatchFilter()`) or `setServiceSpecificInfo()`) method of `PublishConfig` or `SubscribeConfig`. The `setMatchFilter()` method affects discovery, whereas the `setServiceSpecificInfo()` method does not affect discovery.

Embedding an identifier in a message implies modifying the message byte array to include an identifier (for example, as the first couple of bytes).

Create a connection
-------------------

Wi-Fi Aware supports client-server networking between two Wi-Fi Aware devices.

To set up the client-server connection:

1.  Use Wi-Fi Aware discovery to publish a service (on the server) and subscribe to a service (on the client).
    
2.  Once the subscriber discovers the publisher, send a message from the subscriber to the publisher.
    
3.  Start a `ServerSocket` on the publisher device and either set or obtain its port:
    
    ### Kotlin

```kotlin    
    val ss = ServerSocket(0)
    val port = ss.localPort
```

### Java

```java    
    ServerSocket ss = new ServerSocket(0);
    int port = ss.getLocalPort();
```

4.  Use the `ConnectivityManager` to request a Wi-Fi Aware network on the publisher using a `WifiAwareNetworkSpecifier`, specifying the discovery session and the `PeerHandle` of the subscriber, which you obtained from the message transmitted by the subscriber:
    
### Kotlin

```kotlin    
    val networkSpecifier = WifiAwareNetworkSpecifier.Builder(discoverySession, peerHandle)
        .setPskPassphrase("somePassword")
        .setPort(port)
        .build()
    val myNetworkRequest = NetworkRequest.Builder()
        .addTransportType(NetworkCapabilities.TRANSPORT_WIFI_AWARE)
        .setNetworkSpecifier(networkSpecifier)
        .build()
    val callback = object : ConnectivityManager.NetworkCallback() {
        override fun onAvailable(network: Network) {
            ...
        }
    
        override fun onCapabilitiesChanged(network: Network, networkCapabilities: NetworkCapabilities) {
            ...
        }
    
        override fun onLost(network: Network) {
            ...
        }
    }
    
    connMgr.requestNetwork(myNetworkRequest, callback);
```

### Java

```java    
    NetworkSpecifier networkSpecifier = new WifiAwareNetworkSpecifier.Builder(discoverySession, peerHandle)
        .setPskPassphrase("somePassword")
        .setPort(port)
        .build();
    NetworkRequest myNetworkRequest = new NetworkRequest.Builder()
        .addTransportType(NetworkCapabilities.TRANSPORT_WIFI_AWARE)
        .setNetworkSpecifier(networkSpecifier)
        .build();
    ConnectivityManager.NetworkCallback callback = new ConnectivityManager.NetworkCallback() {
        @Override
        public void onAvailable(Network network) {
            ...
        }
    
        @Override
        public void onCapabilitiesChanged(Network network, NetworkCapabilities networkCapabilities) {
            ...
        }
    
        @Override
        public void onLost(Network network) {
            ...
        }
    };
    
    ConnectivityManager connMgr.requestNetwork(myNetworkRequest, callback);
```

5.  Once the publisher requests a network it should send a message to the subscriber.
    
6.  Once the subscriber receives the message from publisher, request a Wi-Fi Aware network on the subscriber using the same method as on the publisher. Do not specify a port when creating the `NetworkSpecifier`. The appropriate callback methods are called when the network connection is available, changed, or lost.
    
7.  Once the `onAvailable()` method is called on the subscriber, a `Network` object is available with which you can open a `Socket` to communicate with the `ServerSocket` on the publisher, but you need to know the `ServerSocket`’s IPv6 address and port. You get these from the `NetworkCapabilities` object provided in the `onCapabilitiesChanged()` callback:
    
### Kotlin

```kotlin    
    val peerAwareInfo = networkCapabilities.transportInfo as WifiAwareNetworkInfo
    val peerIpv6 = peerAwareInfo.peerIpv6Addr
    val peerPort = peerAwareInfo.port
    ...
    val socket = network.getSocketFactory().createSocket(peerIpv6, peerPort)
```

### Java

```java    
    WifiAwareNetworkInfo peerAwareInfo = (WifiAwareNetworkInfo) networkCapabilities.getTransportInfo();
    Inet6Address peerIpv6 = peerAwareInfo.getPeerIpv6Addr();
    int peerPort = peerAwareInfo.getPort();
    ...
    Socket socket = network.getSocketFactory().createSocket(peerIpv6, peerPort);
```

8.  When you're finished with the network connection, call `unregisterNetworkCallback()`).
    

Ranging peers and location-aware discovery
------------------------------------------

A device with Wi-Fi RTT location capabilities can directly measure distance to peers and use this information to constrain Wi-Fi Aware service discovery.

The Wi-Fi RTT API allows direct ranging to a Wi-Fi Aware peer using either its MAC address or its PeerHandle.

Wi-Fi Aware discovery can be constrained to only discover services within a particular geofence. For example, you can set up a geofence that allows discovery of a device publishing an `"Aware_File_Share_Service_Name"` service that is no closer than 3 meters (specified as 3,000 mm) and no further than 10 meters (specified as 10,000 mm).

To enable geofencing, the publisher and the subscriber both must take action:

*   The publisher must enable ranging on the published service using setRangingEnabled(true).
    
    If the publisher doesn’t enable ranging, then any geofence constraints specified by the subscriber are ignored and normal discovery is performed, ignoring distance.
    
*   The subscriber must specify a geofence using some combination of setMinDistanceMm and setMaxDistanceMm.
    
    For either value, an unspecified distance implies no limit. Only specifying the maximum distance implies a minimum distance of 0. Only specifying the minimum distance implies no maximum.
    

When a peer service is discovered within a geofence, the onServiceDiscoveredWithinRange) callback is triggered, which provides the measured distance to the peer. The direct Wi-Fi RTT API can then be called as necessary to measure distance at later times.