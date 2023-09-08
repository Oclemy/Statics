# Reading network state

Android enables apps to learn about dynamic changes in connectivity. Use the following classes to track and respond to connectivity changes:

*   `ConnectivityManager` tells your app about the state of connectivity in the system.
*   The `Network` class represents one of the networks that the device is currently connected to. You can use the `Network` object as a key to gather information about the network with `ConnectivityManager` or to bind sockets on the network. When the network disconnects, the `Network` object stops being usable; even if the device later reconnects to the same appliance, a new `Network` object will represent the new network.
*   The `LinkProperties` object contains information about the link for a network, such as the list of DNS servers, local IP addresses, and network routes installed for the network.
*   The `NetworkCapabilities` object contains information about properties of a network, such as the transports (Wi-Fi, cellular, Bluetooth) and what the network is capable of. For example, you can query the object to determine whether the network is capable of sending MMS, is behind a captive portal, and if it is metered.

Apps interested in the immediate state of connectivity at any given time can call `ConnectivityManager` methods to find out what kind of network is available. These methods are helpful for debugging, and to occasionally review a snapshot of connectivity available at any given time. However, the synchronous `ConnectivityManager` methods do not tell your app about anything happening after a call, so they don't enable you to update your UI nor adjust app behavior based on the network disconnecting or when the network capabilities change.

Because connectivity can change at any time and most apps need to have an always-fresh, up-to-date view of the state of networking on the device, apps can register a callback with `ConnectivityManager` to be alerted to changes that the app cares about. Using the callback, your app can react immediately to any relevant change in connectivity without having to resort to expensive polling that may miss fast updates.

Getting instantaneous state
---------------------------

An Android device may maintain many connections at the same time. First, obtain an instance of `ConnectivityManager`:

### Kotlin

```kotlin
val connectivityManager = getSystemService(ConnectivityManager::class.java)
```

### Java

```java
ConnectivityManager connectivityManager = getSystemService(ConnectivityManager.class);
```

Use this instance to get a reference to the current default network for your app:

### Kotlin

```kotlin
val currentNetwork = connectivityManager.getActiveNetwork()
```

### Java

```java
Network currentNetwork = connectivityManager.getActiveNetwork();
```

With a reference to a network, your app can query information about it.

### Kotlin

```kotlin
val caps = connectivityManager.getNetworkCapabilities(currentNetwork)
val linkProperties = connectivityManager.getLinkProperties(currentNetwork)
```

### Java

```java
NetworkCapabilities caps = connectivityManager.getNetworkCapabilities(currentNetwork);
LinkProperties linkProperties = connectivityManager.getLinkProperties(currentNetwork);
```

Querying instantaneous state is not useful to most apps besides for debugging. For more-useful functionality, such as being alerted when new networks come up and networks disconnect, register a `NetworkCallback`. For more information on registering network callbacks, see Listening to network events.

NetworkCapabilities and LinkProperties
--------------------------------------

The `NetworkCapabilities` and `LinkProperties` objects provide information about all attributes that the system knows about a network. The `LinkProperties` object knows about the routes, link addresses, interface name, proxy info (if any), and DNS servers. Call the relevant method on the `LinkProperties` object to retrieve the information you need. The `NetworkCapabilities` object encapsulates information about the network transports and their capabilities.

A transport is an abstraction of a physical medium over which a network operates. Common examples of transports are Ethernet, Wi-Fi, and cellular, but it can also include VPN or Peer-to-Peer Wi-Fi.

In Android, a network can have multiple transports at the same time. An example of this would be a VPN operating over both Wi-Fi and cellular networks; such a network would have the Wi-Fi, cellular, and VPN transports. To find out if a network has a particular transport, use `NetworkCapabilities.hasTransport(int)`) with one of the `NetworkCapabilities.TRANSPORT_*` constants.

A capability describes a property of the network. Example capabilities include `MMS`, `NOT_METERED`, and `INTERNET`. A network with the MMS capability can send and receive Multimedia Messaging Service messages, while a network without this capability can't. A network with the `NOT_METERED` capability does not bill the user for data. Your app can check for appropriate capabilities by using `NetworkCapabilities.hasCapability(int)`) method with one of the `NetworkCapabilities.NET_CAPABILITY_*` constants.

The most-useful `NET_CAPABILITY_*` constants include:

*   `NET_CAPABILITY_INTERNET`: This capability indicates that the network is set up to access the internet. Note that this is about _setup_ and not actual _ability_ to reach public servers. For example, a network could be set up to access the internet but be subject to a captive portal.
    
    A carrier's cellular network typically has the `INTERNET` capability, while a local P2P Wi-Fi network typically does not. For actual connectivity, see `NET_CAPABILITY_VALIDATED`.
    
*   `NET_CAPABILITY_NOT_METERED`: This capability indicates that the network is not metered. A network is classified as metered when the user is sensitive to heavy data usage on that connection due to monetary costs, data limitations, or battery/performance issues.
    
*   `NET_CAPABILITY_NOT_VPN`: This capability indicates the network is not a virtual private network.
    
*   `NET_CAPABILITY_VALIDATED`: This capability indicates the network has been found to provide actual access to the public internet last time it was probed. A network behind a captive portal or a network that does not provide domain name resolution doesn't have this capability. This is the nearest the system can tell about a network actually providing access, although a validated network can still in principle be subject to IP-based filtering or suffer sudden losses of connectivity due to issues such as poor signal.
    
*   `NET_CAPABILITY_CAPTIVE_PORTAL`: This capability indicates the network has been found to have a captive portal the last time it was probed.
    

There are other capabilities that more specialized apps might be interested in. Read the parameter definitions in `NetworkCapabilities.hasCapability(int)`) for more information.

Capabilities of a network can change at any time. When the system detects a captive portal, it shows a notification inviting the user to log in. While this is ongoing, the network has the `NET_CAPABILITY_INTERNET` and `NET_CAPABILITY_CAPTIVE_PORTAL` capabilities but not the `NET_CAPABILITY_VALIDATED` capability. When the user takes action and logs in to the captive portal page, the device becomes able to access the public internet and the network gains the `NET_CAPABILITY_VALIDATED` capability and loses the `NET_CAPABILITY_CAPTIVE_PORTAL` capability. Likewise, the transports of a network can change dynamically. For example, a VPN can reconfigure itself to use a faster network that just came up, like switching from cellular to Wi-Fi for its underlying network. In this case, the network loses the `TRANSPORT_CELLULAR` transport and gains the `TRANSPORT_WIFI` transport, while keeping the `TRANSPORT_VPN` transport.

Listening to network events
---------------------------

To find out about network events, use the `NetworkCallback` class together with `ConnectivityManager.registerDefaultNetworkCallback(NetworkCallback)`) and `ConnectivityManager.registerNetworkCallback(NetworkCallback)`). These two methods serve different purposes.

All Android apps have a default network. The system decides which should be the default network. The system typically prefers unmetered networks to metered ones and faster networks to slower ones. When an app issues a network request, such as with `HttpsURLConnection`, the system satisfies this request using the default network. Apps can send traffic on other networks, too. For more information, see Additional networks.

The network that is set as the default network can change at any time during the lifetime of an app. A typical example would be the device coming within range of a known active, unmetered, faster-than-celluar Wi-Fi access point. The device would connect to this access point and switch the default network for all apps to the new Wi-Fi network.

When a new network becomes the default, any new connection the app opens uses this network. At some point later, all remaining connections on the previous default network are forcefully terminated. If it is important for the app to know when the default network changes, it should register a default network callback as follows:

### Kotlin

```kotlin
connectivityManager.registerDefaultNetworkCallback(object : ConnectivityManager.NetworkCallback() {
    override fun onAvailable(network : Network) {
        Log.e(TAG, "The default network is now: " + network)
    }

    override fun onLost(network : Network) {
        Log.e(TAG, "The application no longer has a default network. The last default network was " + network)
    }

    override fun onCapabilitiesChanged(network : Network, networkCapabilities : NetworkCapabilities) {
        Log.e(TAG, "The default network changed capabilities: " + networkCapabilities)
    }

    override fun onLinkPropertiesChanged(network : Network, linkProperties : LinkProperties) {
        Log.e(TAG, "The default network changed link properties: " + linkProperties)
    }
})
```

### Java

```java
connectivityManager.registerDefaultNetworkCallback(new ConnectivityManager.NetworkCallback() {
    @Override
    public void onAvailable(Network network) {
        Log.e(TAG, "The default network is now: " + network);
    }

    @Override
    public void onLost(Network network) {
        Log.e(TAG, "The application no longer has a default network. The last default network was " + network);
    }

    @Override
    public void onCapabilitiesChanged(Network network, NetworkCapabilities networkCapabilities) {
        Log.e(TAG, "The default network changed capabilities: " + networkCapabilities);
    }

    @Override
    public void onLinkPropertiesChanged(Network network, LinkProperties linkProperties) {
        Log.e(TAG, "The default network changed link properties: " + linkProperties);
    }
});
```

When a new network becomes the default, the app receives a call to `onAvailable(Network)`) for the new network. Implement `onCapabilitiesChanged(Network,NetworkCapabilities)`), `onLinkPropertiesChanged(Network,LinkProperties)`), or both to react appropriately to changes in connectivity.

For a callback registered with `registerDefaultNetworkCallback()`, `onLost()` means the network has lost the status of being the default network. It may or may not have disconnected.

Although you can learn about the transports that the default network is using by querying `NetworkCapabilities.hasTransport(int)`), this is a poor proxy for bandwidth or meteredness of the network. Your app should not assume Wi-Fi is always unmetered and always supplies better bandwidth than cellular. Instead use `NetworkCapabilities.getLinkDownstreamBandwidthKbps()`) to measure bandwidth, and `NetworkCapabilites.hasCapability(int)`) with `NET_CAPABILITY_NOT_METERED` arguments to determine meteredness. See NetworkCapabilities and LinkProperties for more information.

By default, the callback methods are called on the connectivity thread of your app, which is a separate thread used by `ConnectivityManager`. If your implementation of the callbacks need to do any longer work, call them on a separate worker thread by using the variant `ConnectivityManager.registerDefaultNetworkCallback(NetworkCallback, Handler)`).

Unregister your callback when you have no use for it anymore by calling `ConnectivityManager.unregisterNetworkCallback(NetworkCallback)`). Your main activity's `onPause()`) is a good place to do this, especially if you register the callback in `onResume()`).

Additional networks
-------------------

While the default network is the only relevant network for most apps, some apps may be interested in other available networks. To find out about these, apps build a `NetworkRequest` matching their needs and call `ConnectivityManager.registerNetworkCallback(NetworkRequest, NetworkCallback)`). The process is similar to listening to a default network. The main difference is that, while there may only be one default network that applies to an app at any given time, this version lets your app see all the available networks simultaneously, so a call to `onLost(Network)`) would mean the network has disconnected for good, not that it's not the default anymore.

The app builds a `NetworkRequest` to inform `ConnectivityManager` of what kind of networks it wants to listen to. For example, if your app is only interested in unmetered internet connections:

### Kotlin

```kotlin
val request = NetworkRequest.Builder()
  .addCapability(NetworkCapabilities.NET_CAPABILITY_NOT_METERED)
  .addCapability(NET_CAPABILITY_INTERNET)
  .build()

connectivityManager.registerNetworkCallback(request, myNetworkCallback)
```

### Java

```java
NetworkRequest request = new NetworkRequest.Builder()
  .addCapability(NetworkCapabilities.NET_CAPABILITY_NOT_METERED)
  .addCapability(NET_CAPABILITY_INTERNET)
  .build();

connectivityManager.registerNetworkCallback(request, myNetworkCallback);
```

This would ensure that your app hears about all changes concerning any unmetered network on the system.

As for the default network callback, there is a version of `registerNetworkCallback(NetworkRequest, NetworkCallback, Handler)`) that accepts a `Handler` so as not to load the `Connectivity` thread of your app. Call `ConnectivityManager.unregisterNetworkCallback(NetworkCallback)`) when the callback is not relevant anymore. An app can concurrently register multiple network callbacks.

For convenience, the `NetworkRequest` object contains the common capabilities most apps need, including the following:

*   `NET_CAPABILITY_NOT_RESTRICTED`
*   `NET_CAPABILITY_TRUSTED`
*   `NET_CAPABILITY_NOT_VPN`

When writing your app, you should check the defaults to see if they match your use case and clear them if your app should also be notified about networks that do not have these capabilities. Conversely, your app should add capabilities to avoid being called for any connectivity change in networks that your app does not interact with.

For example, if your app needs to send MMS messages, it should add `NET_CAPABILITY_MMS` to its `NetworkRequest` to avoid being told about all the networks that can't send MMSes, or `TRANSPORT_WIFI_AWARE` if it's only interested in P2P Wi-Fi connectivity. `NET_CAPABILITY_INTERNET` and `NET_CAPABILITY_VALIDATED` are helpful if you are interested in the ability to transfer data with a server on the internet.

An example
----------

This section describes the sequence of callbacks an app might get if it registers both a default callback and a regular callback on a device that currently has mobile connectivity. In this example, the device connects to a good Wi-Fi access point, then disconnects from it. The section also assumes the device has the **Mobile data always on** setting enabled.

The timeline is as follows:

1.  When the app calls `registerNetworkCallback()`, the callback immediately receives calls from `onAvailable()`, `onNetworkCapabilitiesChanged()`, and `onLinkPropertiesChanged()` for the cellular network, because only that network is available. If another network had been available, the app would also have received callbacks for the other network.
    
    ![State diagram showing the register network callback event and the callbacks triggered by the event](https://developer.android.com/static/images/training/basics/network-ops/register-network-callbacks-01.png)  
    **Figure 1. App state after calling `registerNetworkCallback()`**
    
2.  Then, the app calls `registerDefaultNetworkCallback()`. The default network callback starts receiving calls to `onAvailable()`, `onNetworkCapabilitiesChanged()`, and `onLinkPropertiesChanged()` for the cellular network because the cellular network is the default network. If another, non-default network had been up, the app would not have received calls for the non-default network.
    
    ![State diagram showing register the default network callback event and the
    callbacks triggered by the event](https://developer.android.com/static/images/training/basics/network-ops/register-network-callbacks-02.png)  
    **Figure 2. App state after registering a default network**
    
3.  Later, the device connects to an (unmetered) Wi-Fi network. The regular network callback receives calls to `onAvailable()`, `onNetworkCapabilitiesChanged()`, and `onLinkPropertiesChanged()` for the Wi-Fi network.
    
    ![State diagram showing the callbacks triggered when the app connects to a
    new network](https://developer.android.com/static/images/training/basics/network-ops/register-network-callbacks-03.png)  
    **Figure 3. App state after connecting to an unmetered Wi-Fi network**
    
4.  At this point, it is possible the Wi-Fi network takes a while to validate. In this case, the `onNetworkCapabilitiesChanged()` calls for the regular network callback would not include capability `NET_CAPABILITY_VALIDATED`. After a short time, it would receive a call to `onNetworkCapabilitiesChanged()` where the new capabilities would include `NET_CAPABILITY_VALIDATED`. In most cases, the validation is very quick.
    
    When the Wi-Fi network validates, the system prefers it to the cellular network, mainly because it is unmetered. The Wi-Fi network becomes the default network, so the default network callback receives a call to `onAvailable()`, `onNetworkCapabilitiesChanged()`, and `onLinkPropertiesChanged()` for the Wi-Fi network. The cellular network goes to the background, and the regular network callback receives a call to `onLosing()` for the cellular network.
    
    Because this example assumes mobile data is always on for this device, the mobile network never disconnects. If the setting was turned off, then after a while the cellular network would disconnect, and the regular network callback would receive a call to `onLost()`.
    
      
    **Figure 4. App state after Wi-Fi network validates**
    
5.  Later still, the device suddenly disconnects from Wi-Fi, because it went out of range. Because Wi-Fi disconnected, the regular network callback receives a call to `onLost()` for Wi-Fi. Because cellular is the new default network, the default network callback receives calls to `onAvailable()`, `onNetworkCapabilitiesChanged()`, and `onLinkPropertiesChanged()` for the cellular network.
    
      
    **Figure 5. App state after disconnecting from Wi-Fi network**
    

If the **mobile data always on** setting had been turned off, then when Wi-Fi disconnects the device would try to reconnect to cellular. The picture would be similar, but with a short additional delay for the `onAvailable()` calls, and the regular network callback would also receive calls to `onAvailable()`, `onNetworkCapabilitiesChanged()`, and `onLinkPropertiesChanged()` because cellular would just have become available.

Restrictions on the use of the network for data transfer
--------------------------------------------------------

Being able to see a network with a network callback does not mean your app can use the network for data transfer. Some networks do not provide internet connectivity (see `NET_CAPABILITY_INTERNET` and `NET_CAPABILITY_VALIDATED` to check for internet connectivity), and some networks may be restricted to privileged apps.

Use of background networks is also subject to permission checks. If your app wants to use a background network, it needs the `CHANGE_NETWORK_STATE` permission. Apps with this permission are also allowed to ask the system to try to bring up a network that is not currently up, such as the cellular network when the device is connected to a Wi-Fi network. Such an app would call `ConnectivityManager.requestNetwork(NetworkRequest, NetworkCallback)`) with a `NetworkCallback` to be called when the network is brought up.