# Bluetooth overview

The Android platform includes support for the Bluetooth network stack, which allows a device to wirelessly exchange data with other Bluetooth devices. The app framework provides access to the Bluetooth functionality through Bluetooth APIs. These APIs let apps connect to other Bluetooth devices, enabling point-to-point and multipoint wireless features.

Using the Bluetooth APIs, an app can perform the following:

*   Scan for other Bluetooth devices.
*   Query the local Bluetooth adapter for paired Bluetooth devices.
*   Establish RFCOMM channels.
*   Connect to other devices through service discovery.
*   Transfer data to and from other devices.
*   Manage multiple connections.

This topic focuses on _Classic Bluetooth_. Classic Bluetooth is the right choice for more battery-intensive operations, which include streaming and communicating between devices. For Bluetooth devices with low power requirements, consider using Bluetooth Low Energy connections.

This documentation describes different Bluetooth profiles and explains how to use the Bluetooth APIs to accomplish the four major tasks necessary to communicate using Bluetooth:

*   Setting up Bluetooth.
*   Finding devices that are either paired or available in the local area.
*   Connecting devices.
*   Transferring data between devices.

For a demonstration of using the Bluetooth APIs, see the Bluetooth Chat sample app.

The basics
----------

For Bluetooth-enabled devices to transmit data between each other, they must first form a channel of communication using a pairing process. One device, a discoverable device, makes itself available for incoming connection requests. Another device finds the discoverable device using a service discovery process. After the discoverable device accepts the pairing request, the two devices complete a bonding process in which they exchange security keys. The devices cache these keys for later use. After the pairing and bonding processes are complete, the two devices exchange information. When the session is complete, the device that initiated the pairing request releases the channel that had linked it to the discoverable device. The two devices remain bonded, however, so they can reconnect automatically during a future session as long as they're in range of each other and neither device has removed the bond.

Use of the Bluetooth APIs requires declaring several permissions in your manifest file. Once your app has permission to use Bluetooth, your app needs to access the `BluetoothAdapter` and determine if Bluetooth is available on the device. If Bluetooth is available, there are three steps to make a connection:

*   Find nearby Bluetooth devices, either devices that are already paired or new ones.
*   Connect to a Bluetooth device.
*   Transfer data with the connected device.

Certain devices use a specific Bluetooth profile that declares the data it provides.

Key classes and interfaces
--------------------------

All of the Bluetooth APIs are available in the `android.bluetooth` package. The following are the classes and interfaces you need in order to create Bluetooth connections:

`BluetoothAdapter`

Represents the local Bluetooth adapter (Bluetooth radio). The `BluetoothAdapter` is the entry-point for all Bluetooth interaction. Using this, you can discover other Bluetooth devices, query a list of bonded (paired) devices, instantiate a `BluetoothDevice` using a known MAC address, and create a `BluetoothServerSocket` to listen for communications from other devices.

`BluetoothDevice`

Represents a remote Bluetooth device. Use this to request a connection with a remote device through a `BluetoothSocket` or query information about the device such as its name, address, class, and bonding state.

`BluetoothSocket`

Represents the interface for a Bluetooth socket (similar to a TCP `Socket`). This is the connection point that allows an app to exchange data with another Bluetooth device using `InputStream` and `OutputStream`.

`BluetoothServerSocket`

Represents an open server socket that listens for incoming requests (similar to a TCP `ServerSocket`). In order to connect two devices, one device must open a server socket with this class. When a remote Bluetooth device makes a connection request to this device, the device accepts the connection and then returns a connected `BluetoothSocket`.

`BluetoothClass`

Describes the general characteristics and capabilities of a Bluetooth device. This is a read-only set of properties that defines the device's classes and services. Although this information provides a useful hint regarding a device's type, the attributes of this class don't necessarily describe all Bluetooth profiles and services that the device supports.

`BluetoothProfile`

An interface that represents a Bluetooth profile. A Bluetooth profile is a wireless interface specification for Bluetooth-based communication between devices. An example is the Hands-Free profile. For more discussion of profiles, see Bluetooth profiles.

`BluetoothHeadset`

Provides support for Bluetooth headsets to be used with mobile phones. This includes both the Bluetooth Headset profile and the Hands-Free (v1.5) profile.

`BluetoothA2dp`

Defines how high-quality audio can be streamed from one device to another over a Bluetooth connection using the Advanced Audio Distribution Profile (A2DP).

`BluetoothHealth`

Represents a Health Device Profile proxy that controls the Bluetooth service.

`BluetoothHealthCallback`

An abstract class that you use to implement `BluetoothHealth` callbacks. You must extend this class and implement the callback methods to receive updates about changes in the app’s registration state and Bluetooth channel state.

`BluetoothHealthAppConfiguration`

Represents an app configuration that the Bluetooth Health third-party app registers to communicate with a remote Bluetooth health device.

`BluetoothProfile.ServiceListener`

An interface that notifies `BluetoothProfile` interprocess communication (IPC) clients when they have been connected to or disconnected from the internal service that runs a particular profile.