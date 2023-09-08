# Media3 overview

Jetpack Media3 is the new home for media libraries that enables Android apps to display rich audio and visual experiences. It introduces a simpler architecture that is familiar to current developers, and which allows you to more easily build and maintain your apps. Media3 also includes ExoPlayer as the default player implementation.

This document provides an introduction to the changes that Media3 introduces and directs you onwards to other Media3 docs.

Components
----------

A media app that uses Media3 is comprised of several key components. The classes that make up these components will be familiar to you if you have worked with previous Android media libraries.

**Class**

**Description**

**Implementation note**

`MediaSession`

Media sessions enable your app to interact with an audio or video player. They advertise media playback externally and receive playback commands from external sources.

In Media3, the `MediaSession` takes the player directly.

`Player`

The player is an interface that defines traditional high-level functionality, such as the ability to play, pause, and seek.

In Media3, the default `Player` implementation is `ExoPlayer`.

`MediaSessionService/MediaLibraryService`

The `MediaSessionService` holds a media session and its associated player in a service separate from your application main `Activity`. This facilitates background playback. Use a `MediaLibraryService` instead to additionally expose your content library to client apps.

`MediaController`

The `MediaController` class is generally used to send commands from outside your app, for example from other apps or the system itself. The commands are sent to the underlying `Player` of the associated `MediaSession`.

The `MediaController` class implements the `Player` interface, but when calling a method the command gets sent to the connected `MediaSession`. For this reason, client apps like the Google Assistant generally implement `MediaController`.

`MediaBrowser`

The `MediaBrowser` class allows the user to navigate through media content and select which items to play.

The `MediaBrowser` class implements both the `MediaController` and `Player` interfaces. Same as `MediaController`, client apps such as Android Auto generally implement `MediaBrowser`.

The following diagram clearly delineates how these components come together in a typical app.

![The different components of a media app that uses Media3 connect
  together in several simple ways owing to their sharing of interfaces
  and classes.](https://developer.android.com/static/guide/topics/media/media3/overview.png)

**Figure 1**: Media app components

Documentation
-------------

For the Media3 beta release, you will find a series of documents that examine in detail some of the key features in Media3. Namely, these documents outline how media sessions and media controllers now interact with the `ExoPlayer` class and `Player` interface, as this is perhaps the key difference between Media3 and previous media APIs.

When Media3 reaches its stable release, these documents will expand to cover the full breadth of the Media3 API and how to best implement it.

### Media sessions

Media sessions are a crucial component to any media app. The key change to media sessions in Media3 is that the `MediaSession` class now directly takes a `Player`, such as `ExoPlayer`. This reduces the need for connectors, such as the `MediaSessionConnector` from the previous `exoplayer2` library, and both simplifies and deepens the interaction between the MediaSession class and other core classes like MediaController.

For more information, read this guide that covers how you can use the Media3 media sessions to control and advertise playback within your app.

### Background playback

It is very common for media apps to play media in the background, such as with music apps, or video apps that offer picture-in-picture. This is achieved with a separate `MediaSessionService`.

For more information, please see the Media3 background playback guide.

### ExoPlayer

ExoPlayer is at the core of Media3 as the chosen implementation for the API’s media player. To facilitate this, ExoPlayer is now an AndroidX library. This means that it now has an API surface that will remain stable through future upgrades. It is therefore far easier to upgrade between new versions of ExoPlayer.

For the primary ExoPlayer documentation, please see exoplayer.dev.


