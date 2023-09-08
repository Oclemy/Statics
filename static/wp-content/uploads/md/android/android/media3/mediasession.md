# Media3 - Use a media session to manage playback

Media sessions provide a universal way of interacting with an audio or video player. In Media3, the default player is the `ExoPlayer` class, which implements the `Player` interface. Connecting the media session to the player allows an app to advertise media playback externally and to receive playback commands from external sources.

Commands may originate from physical buttons such as the play button on a headset or TV remote control. They might also come from client apps that have a media controller, such as instructing "pause" to Google Assistant. The media session delegates these commands to the media app's player.

A media session lives alongside the player that it manages. You can construct a media session with a `Context` and a `Player` object. You should create and initialize a media session in the `onCreate()` method of the activity or service that owns the media session and its associated player.

To create a media session, initialize a `Player` and supply it to `MediaSession.Builder` like this:

```kotlin
    val player = ExoPlayer.Builder(context).build()
    val mediaSession = MediaSession.Builder(context, player)
       .build()
```

### Automatic state handling

The Media3 library automatically updates the media session using the player's state. As such, you don't need to manually handle the mapping from player to session.

This is a break from the legacy approach where you needed to create and maintain a `PlaybackStateCompat` independently from the player itself, for example to indicate any errors.

The media session is the key to controlling playback. It enables you to route commands from external sources to the player that does the work of playing your media.

These sources can be physical buttons such as the play button on a headset or TV remote control, or indirect commands such as instructing "pause" to Google Assistant. The media session ultimately delegates commands to the media player.

### Control your media session with a media controller

If you have access to a Player, you should call its methods directly to issue playback commands. Clients that want to control an external media session, can use a media controller instead. A `MediaController` facilitates connecting to a media session and issuing playback command requests.

When playing media in the background, you need to house your media session and player within a `MediaSessionService` or `MediaLibraryService` that runs as a foreground service. If you do so, you can separate your player from the Activity in your app that contains the UI for playback control. This may necessitate that you use a media controller.

For more information on creating and using media controllers, please refer to Playing in the background.

![INSERT ALT TEXT HERE](https://developer.android.com/static/guide/topics/media/media3/getting-started/backgroundplayback.png)

**Figure 1**: The `Player` interface plays a key role in the architecture of Media3.

### Grant control to other clients

You can allow clients other than your own app to control your media session. These clients can use the media controller to do so. For example, you may wish to grant access to the Android system to facilitate notification and lock screen controls. Likewise, you might grant access to a Wear watch so that you can control playback from the watchface.

In Media3, the updated `MediaSession` and `MediaController` APIs allow media apps to grant finer-grained access control to Player commands on a per-controller basis.

Other apps you may wish to grant access might include the following:

*   Android Wear companion app. See diagram below with Wear screenshot.
*   Android Auto companion app.
*   Automotive OS.
*   Bluetooth headsets.
*   Any other 3rd-party app, as necessary.

![INSERT ALT TEXT HERE](https://developer.android.com/static/guide/topics/media/media3/getting-started/backgroundcontrols.png)

**Figure 2**: The media controller facilitates passing commands from external sources to the media session.

Add custom commands
-------------------

Media applications can define custom commands. For example, you might wish to implement buttons that allow the user to skip forwards or backwards 30 seconds. The `MediaController` sends custom commands and the `MediaSession.SessionCallback` receives them.

You can define which custom session commands are available to a MediaController when it connects to your media session. You achieve by overriding `MediaSession.SessionCallback.onConnect()`. See below an example of how you might do so.

```kotlin
    // Create a MediaSession in the onCreate method of your Activity or Service
    override fun onCreate() {
        super.onCreate()
    
        // Create and assign a custom SessionCallback to the MediaSession
        val customCallback = CustomMediaSessionCallback()
        mediaSession = MediaSession.Builder(this, player)
            .setSessionCallback(customCallback)
            .build()
    }
    
    private inner class CustomMediaSessionCallback: MediaSession.SessionCallback {
        // Configure commands available to the controller in onConnect()
        override fun onConnect(
                session: MediaSession,
                controller: MediaSession.ControllerInfo
            ): MediaSession.ConnectionResult {
                val connectionResult = super.onConnect(session, controller)
                val sessionCommands =
                    connectionResult.availableSessionCommands
                        .buildUpon()
                        // Add custom commands
                        .add(SessionCommand(REWIND_30, Bundle()))
                        .add(SessionCommand(FAST_FWD_30, Bundle()))
                        .build()
                return MediaSession.ConnectionResult.accept(
                    sessionCommands, connectionResult.availablePlayerCommands)
            }
    }
```

To receive custom command requests from a `MediaController`, override the `onCustomCommand()` method in the `SessionCallback`.

```kotlin
    private inner class CustomMediaSessionCallback: MediaSession.SessionCallback {
        ...
        override fun onCustomCommand(
                session: MediaSession,
                controller: MediaSession.ControllerInfo,
                customCommand: SessionCommand,
                args: Bundle
            ): ListenableFuture<SessionResult> {
                if (customCommand.customAction == REWIND_30) {
                    session.player.seekBack(30000)
                    return Futures.immediateFuture(
                        SessionResult(SessionResult.RESULT_SUCCESS)
                    )
                }
                ...
        }
    }
```

You can track which media controller is making a request by using the `packageName` property of the `MediaSession.ControllerInfo` object that is passed into `SessionCallback` methods. This allows you to tailor your app’s behavior in response to a given command if it originates from the system, your own app, or other client apps.