# Media Controls

![](https://developer.android.com/static/images/about/versions/11/media-controls.png)

Android 11 updates how media controls are displayed, making use of the `MediaSession` and `MediaRouter2` APIs to render controls and audio output information.

Media controls in Android 11 are located near the Quick Settings. Sessions from multiple apps are arranged in a swipeable carousel. The carousel lists sessions in this order:

*   Streams playing locally on the phone
*   Remote streams, such as those detected on external devices or cast sessions
*   Previous resumable sessions, in the order they were last played

Users can restart previous sessions from the carousel without having to start the app. When playback begins, the user interacts with the media controls in the usual way.

Supporting playback resumption
------------------------------

In order to use this feature, you must enable **Media resumption** in the Developer Options settings.

To make your player app appear in the quick setting settings area, you must create a `MediaStyle` notification with a valid `MediaSession` token.

To display the brand icon for the media player, use `NotificationBuilder.setSmallIcon()`.

To support playback resumption, apps must implement a `MediaBrowserService` and `MediaSession`.

The playback resumption feature can be be turned off using the Settings app, under the **Sound > Media** options. The user can also access Settings by tapping the gear icon that appears after swiping on the expanded carousel.

After the device boots, the system looks for the five most recently used media apps, and provides controls that can be used to restart playing from each app.

The system attempts to contact your `MediaBrowserService` with a connection from SystemUI. Your app must allow such connections, otherwise it cannot support playback resumption.

Connections from SystemUI can be identified and verified using the package name `com.android.systemui` and signature. The SystemUI is signed with the platform signature. An example of how to check against the platform signature can be found in the UAMP app.

In order to support playback resumption, your `MediaBrowserService` must implement these behaviors:

*   `onGetRoot()` must return a non-null root quickly. Other complex logic should be handled in `onLoadChildren()`
    
*   When `onLoadChildren()` is called on the root media ID, the result must contain a FLAG_PLAYABLE child.
    
*   `MediaBrowserService` should return the most recently played media item when they receive an EXTRA_RECENT query. The value returned should be an actual media item rather than generic function.
    
*   `MediaBrowserService` must provide an appropriate MediaDescription with a non-empty title) and subtitle). It should also set an icon URI) or an icon bitmap).
    

The following code examples illustrate how to implement `onGetRoot()`.

### Kotlin

```kotlin
override fun onGetRoot(
    clientPackageName: String,
    clientUid: Int,
    rootHints: Bundle?
): BrowserRoot? {
    ...
    // Verify that the specified package is SystemUI. You'll need to write your 
    // own logic to do this.
    if (isSystem(clientPackageName, clientUid)) {
        rootHints?.let {
            if (it.getBoolean(BrowserRoot.EXTRA_RECENT)) {
                // Return a tree with a single playable media item for resumption.
                val extras = Bundle().apply {
                    putBoolean(BrowserRoot.EXTRA_RECENT, true)
                }
                return BrowserRoot(MY_RECENTS_ROOT_ID, extras)
            }
        }
        // You can return your normal tree if the EXTRA_RECENT flag is not present.
        return BrowserRoot(MY_MEDIA_ROOT_ID, null)
    }
    // Return an empty tree to disallow browsing.
    return BrowserRoot(MY_EMPTY_ROOT_ID, null)
```

### Java

```java
@Override
public BrowserRoot onGetRoot(String clientPackageName, int clientUid,
    Bundle rootHints) {
    ...
    // Verify that the specified package is SystemUI. You'll need to write your
    // own logic to do this.
    if (isSystem(clientPackageName, clientUid)) {
        if (rootHints != null) {
            if (rootHints.getBoolean(BrowserRoot.EXTRA_RECENT)) {
                // Return a tree with a single playable media item for resumption.
                Bundle extras = new Bundle();
                extras.putBoolean(BrowserRoot.EXTRA_RECENT, true);
                return new BrowserRoot(MY_RECENTS_ROOT_ID, extras);
            }
        }
        // You can return your normal tree if the EXTRA_RECENT flag is not present.
        return new BrowserRoot(MY_MEDIA_ROOT_ID, null);
    }
    // Return an empty tree to disallow browsing.
    return new BrowserRoot(MY_EMPTY_ROOT_ID, null);
}
```

The system retrieves the following information from the `MediaSession`'s `MediaMetadata`, and displays it when it is available:

*   `METADATA_KEY_ALBUM_ART_URI`
*   `METADATA_KEY_TITLE`
*   `METADATA_KEY_ARTIST`
*   `METADATA_KEY_DURATION` (If the duration isn’t set the seek bar doesn't show progress)

In order to support play resumption, your `MediaSession` must implement a `MediaSession` callback for `onPlay()`.

The media player shows the elapsed time for the currently playing media, along with a seek bar which is mapped to the `MediaSession` `PlaybackState`.

In order for the the seek bar to work correctly, you must implement `PlaybackState.Builder#setActions` and include `ACTION_SEEK_TO`. Otherwise the player only shows the elapsed time and duration.

To set the player controls, use `Notification.Builder#setCustomActions`. Only the actions indicated with `Notification.MediaStyle#setShowsActionsInCompactView` will be displayed in the media player appearing in the collapsed quick settings.