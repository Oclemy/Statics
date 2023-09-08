# Media3 - Play media in the background


It is often desirable to play media while an app is not in the foreground. For example, a music player generally keeps playing music when the user has locked their device or is using another app. Similarly, a video player may want to enable a picture-in-picture mode. This is playing in the background.

The Media3 library provides a series of interfaces that allow you to support background playback in Android more easily than ever.

To enable background playback, you should contain the `Player` and `MediaSession` inside a separate Service. This allows the device to continue serving media even while your app is not in the foreground.

![The MediaSession service allows the media session to run separately
    from the app's activity](https://developer.android.com/static/guide/topics/media/media3/getting-started/mediasessionservice.png)

**Figure 1**: The MediaSession service allows the media session to run separately from the app's activity

When hosting a player inside a Service, you should use a `MediaSessionService`. To do this, create a class that extends MediaSessionService and create your media session inside of it.

Using `MediaSessionService` makes it easy for companion devices like Assistant, System media controls or companion devices like Wear OS to discover your service, connect to it, and control playback, all without accessing your app's UI activity at all. In fact, there can be multiple apps connected to the same `MediaSessionService` at the same time, each app with its own `MediaController`.

### Provide access to the media session

Override the `onGetSession()` method to give other clients access to your media session.

```kotlin
    // Extend MediaSessionService
    class PlaybackService : MediaSessionService() {
        private var mediaSession: MediaSession? = null
        // Create your Player and MediaSession in the onCreate lifecycle event
        override fun onCreate() {
            super.onCreate()
            Player player = ExoPlayer.Builder(this).build()
            mediaSession = MediaSession.Builder(this, player).build()
        }
        // Return a MediaSession to link with the MediaController that is making
        // this request.
        override fun onGetSession(controllerInfo: MediaSession.ControllerInfo): MediaSession?
            = mediaSession
    }
```

An app requires permission to run a foreground service. Add the `FOREGROUND_SERVICE` permission to the manifest:

```xml
    <uses-permission android:name="android.permission.FOREGROUND_SERVICE" />
```

You must also declare your `Service` class in the manifest with an intent filter of `MediaSessionService`.

```xml
    <service
        android:name=".PlaybackService"
        android:foregroundServiceType="mediaPlayback"
        android:exported="true">
        <intent-filter>
            <action android:name="androidx.media3.session.MediaSessionService"/>
        </intent-filter>
    </service>
```

You must define a `foregroundServiceType` that includes `mediaPlayback` when your app is running on a device with Android 10 onwards.

Be sure to release the media session (and player) in your service’s `onDestroy()` lifecycle callback:

```kotlin
    override fun onDestroy() {
        mediaSession?.run {
            player.release()
            release()
            mediaSession = null
        }
        super.onDestroy()
    }
```

Control playback in the media session
-------------------------------------

In the Activity or Fragment containing your player UI, you can establish a link between the UI and your media session using a `MediaController`. Your UI uses the media controller to send commands from your UI to the player within the session.

Obtain a `MediaController` from your `MediaSession` by creating a `SessionToken` in the `onStart()` method of your Activity or Fragment.

```kotlin
    override fun onStart() {
        val sessionToken = SessionToken(this, ComponentName(this, PlaybackService::class.java))
    }
```

Use this `SessionToken` to build a `MediaController`. Doing so connects the controller to the given session. This takes place asynchronously so you should listen for the result and assign it when constructed. This example shows how you can do this to connect the `MediaController` to your player UI.

```kotlin
    val controllerFuture = MediaController.Builder(this, sessionToken).buildAsync()
    controllerFuture.addListener(
        { playerView.player = controllerFuture.get() },
        MoreExecutors.directExecutor()
    )
```

### Handle UI commands

The `MediaSession` receives commands from the controller through its `SessionCallback`. Initializing a `MediaSession` creates a default implementation of `SessionCallback` that automatically handles all commands that your `MediaController` sends to your player.

You should also release the controller in the `onStop()` method of its hosting Activity or Fragment by calling `MediaController.releaseFuture(controllerFuture)`.

Notification
------------

A `MediaSessionService` automatically creates a `MediaNotification` for you that should work in most cases. By default, the published notification is a `MediaStyle` notification that stays updated with the latest information from your media session and displays playback controls. The `MediaNotification` is aware of your session and can be used to control playback for any other apps that are connected to the same session.

For example, a music streaming app using a `MediaSessionService` would create a `MediaNotification` that displays the title, artist, and album art for the current song playing alongside playback controls based on your `MediaSession` configuration.

If you’d like to provide your own custom `MediaNotification`, you can override `MediaSessionService.onUpdateNotification()`.