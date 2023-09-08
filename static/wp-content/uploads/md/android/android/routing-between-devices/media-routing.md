# Routing between devices

As users connect their televisions, home theater systems, and music players with wireless technologies, they want to be able to play content from Android apps on these larger, louder devices. Enabling this kind of playback can turn your one-device, one-user app into a shared experience that delights and inspires multiple users.

The Android media router APIs are designed to enable media display and playback on remote receiver devices using a common user interface. App developers that implement a `MediaRouter` interface can then connect to the framework and play content to devices that participate in the media router framework. Media playback device manufacturers can participate in the framework by publishing a `MediaRouteProvider` that allows other applications to connect to and play media on the receiver devices. Figure 1 illustrates how an app connects to a receiver device through the media router framework.

**Figure 1.** Overview of how media route provider classes provide communication from a media app to a receiver device.

**Note:** If you want your app to support Google Cast devices, you should use the Cast SDK and build your app as a Cast sender. Follow the directions in the Cast documentation instead of using the MediaRouter framework directly.

MediaRouter support library
---------------------------

The mediarouter APIs are defined in the AndroidX MediaRouter library. This library is compatible with devices running Android 2.3 (API level 9) and higher and ensures a consistent experience across all of them. For detailed information about the mediarouter APIs, see the `androidx.mediarouter.media` package in the API reference.

**MediaRouter API**

A media app uses the `MediaRouter` API to discover available remote playback devices and to route audio and video to them.

**MediaRouteProvider API**

The `MediaRouteProvider` API defines the capabilities of a remote playback device and makes it visible to apps that use a `MediaRouter` to search for alternative media paths.

The output switcher
-------------------

Starting with Android 11, your app's routing options also appear in the system media player. This helps to give the user a seamless journey when moving between devices as they change their viewing and listening contexts, such as watching video in the kitchen versus on a phone, or listening to audio in the home or car.

Pressing the route selection button in a media notification brings up the output switcher with these choices by default:

*   The speaker on the current device
*   All connected Bluetooth audio devices

Apps can also provide more options depending on their capabilities, such as Cast.

Apps can use the `MediaRouter` API to customize the routing choices. You can exclude devices you don't support (like filtering out audio-only Chromecast if you're watching a Netflix smart TV) or include other special devices that your app recognizes.