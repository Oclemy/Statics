# Audio app overview

The preferred architecture for an audio app is a client/server design. The client is an Activity in your app that includes a `MediaBrowser`, media controller, and the UI. The server is a `MediaBrowserService` containing the player and a media session.

A `MediaBrowserService` provides two main features:

*   When you use a `MediaBrowserService`, other components and applications with a `MediaBrowser` can discover your service, create their own media controller, connect to your media session, and control the player. This is how Wear OS and Android Auto Applications gain access to your media application.
*   It also provides an optional _browsing API_. Applications don't have to use this feature. The browsing API lets clients query the service and build out a representation of its content hierarchy, which might represent playlists, a media library, or some other kind of collection.

**Building a media browser service**

How to create a media browser service that contains a media session, manage client connections, and become a foreground service while playing audio.

**Building a media browser client**

How to create a media browser client activity that contains a UI and media controller, and connect and communicate with a media browser service.

**Media session callbacks**

Describes how the media session callback methods manage the media session, media browser service, and other app components like notifications and broadcast receivers.

**Universal Android Music Player Sample**

This GitHub sample shows how to implement a media app that allows background playback of audio, and provides a media library that is exposed to other apps.