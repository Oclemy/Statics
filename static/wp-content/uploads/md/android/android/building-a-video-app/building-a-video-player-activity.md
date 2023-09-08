# Building a video player activity

When the activity receives the `onCreate()` lifecycle callback method it should perform these steps:

*   Create and initialize the media session
*   Set the media session callback
*   Set the media session's media button receiver to null so that a media button event won't restart the player when it is not visible. This only affects Android 5.0 (API level 21) and higher devices.
*   Create and initialize the media controller

The `onCreate()` code below demonstrates these steps:

### Kotlin

```kotlin
private lateinit var mediaSession: MediaSessionCompat

public override fun onCreate(savedInstanceState: Bundle?) {
    super.onCreate(savedInstanceState)

    // Create a MediaSessionCompat
    mediaSession = MediaSessionCompat(this, LOG\_TAG).apply {

        // Enable callbacks from MediaButtons and TransportControls
        setFlags(MediaSessionCompat.FLAG\_HANDLES\_MEDIA\_BUTTONS or
                MediaSessionCompat.FLAG\_HANDLES\_TRANSPORT\_CONTROLS)

        // Do not let MediaButtons restart the player when the app is not visible
        setMediaButtonReceiver(null)

        // Set an initial PlaybackState with ACTION\_PLAY, so media buttons can start the player
        val stateBuilder = PlaybackStateCompat.Builder()
                .setActions(PlaybackStateCompat.ACTION\_PLAY or PlaybackStateCompat.ACTION\_PLAY\_PAUSE)
        setPlaybackState(stateBuilder.build())

        // MySessionCallback has methods that handle callbacks from a media controller
        setCallback(MySessionCallback())
    }

    // Create a MediaControllerCompat
    MediaControllerCompat(this, mediaSession).also { mediaController ->
        MediaControllerCompat.setMediaController(this, mediaController)
    }
}
```

### Java

```java
MediaSessionCompat mediaSession;
PlaybackStateCompat.Builder stateBuilder;

@Override
public void onCreate(Bundle savedInstanceState) {
  super.onCreate(savedInstanceState);

  // Create a MediaSessionCompat
  mediaSession = new MediaSessionCompat(this, LOG\_TAG);

  // Enable callbacks from MediaButtons and TransportControls
  mediaSession.setFlags(
    MediaSessionCompat.FLAG\_HANDLES\_MEDIA\_BUTTONS |
    MediaSessionCompat.FLAG\_HANDLES\_TRANSPORT\_CONTROLS);

  // Do not let MediaButtons restart the player when the app is not visible
  mediaSession.setMediaButtonReceiver(null);

  // Set an initial PlaybackState with ACTION\_PLAY, so media buttons can start the player
  stateBuilder = new PlaybackStateCompat.Builder()
                .setActions(
                    PlaybackStateCompat.ACTION\_PLAY |
                    PlaybackStateCompat.ACTION\_PLAY\_PAUSE);
  mediaSession.setState(stateBuilder.build());

  // MySessionCallback has methods that handle callbacks from a media controller
  mediaSession.setCallback(new MySessionCallback());

  // Create a MediaControllerCompat
  MediaControllerCompat mediaController \=
    new MediaControllerCompat(this, mediaSession);

  MediaControllerCompat.setMediaController(this, mediaController);
}
```

When an app is closed, the activity receives the `onPause()` and `onStop()` callbacks in succession. If the player is playing, you must stop it before its activity goes away. The choice of which callback to use depends on what Android version you’re running.

In Android 6.0 (API level 23) and earlier there is no guarantee of when `onStop()` is called; it could get called 5 seconds after your activity disappears. Therefore, in Android versions earlier than 7.0, your app should stop playback in `onPause()`. In Android 7.0 and beyond, the system calls `onStop()` as soon as the activity becomes not visible, so this is not a problem.

To summarize:

*   In Android version 6.0 and earlier, stop the player in the `onPause()` callback.
*   In Android version 7.0 and later, stop the player in the `onStop()` callback.

When the activity receives the `onDestroy()` callback, it should release and clean up your player.