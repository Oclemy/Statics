# Media apps on Google Assistant driving mode

Google Assistant helps drivers perform tasks they're already doing while driving. It reduces distraction by providing glanceable, voice-forward multimodal experiences. Driving mode helps make every drive safer, more informed, connected, and enjoyable.

Using driving mode
------------------

A device automatically enters driving mode when you start navigating in Google Maps.

You can disable driving mode by going to **Google Maps Settings > Navigation Settings > Google Assistant settings > Manage Driving Mode**. Then turn off the **Driving Mode** setting.

App prerequisites
-----------------

In order for driving mode to work correctly with your media app, the app must meet these requirements:

*   Follow all the directions in The Google Assistant and media apps
*   Your app needs to declare that it supports media for Android Auto. Follow the directions at declare media support for Android Auto.
*   Handle audio focus
*   Use `PlaybackState` to report errors
*   Implement a MediaBrowserService and a MediaSession
*   Your MediaSession must implement these callbacks:
    *   `onPlay()`
    *   `onPlayFromSearch()`
    *   `onPlayFromUri()`
    *   `onSkipToNext()`
    *   `onSkipToPrevious()`
    *   `onPause()`
    *   `onStop()`
*   Keep the `MediaSession` metadata current by calling `setMetadata()`.

Each app determines the transport controls that appear on the screen. This is done by connecting its `MediaSession` to `TransportControls`. For example, a music player usually shows these controls:

Any other supported actions are invoked via voice commands.

Driving mode displays recommendations in two places, the "For you" page and the app's browse page. The screens look similar:

**For you**

**App browse**

The Assistant calls `MediaBrowserService.onGetRoot()` with the hint `EXTRA_SUGGESTED` to retrieve recommendations. The method should return a flat list of playable `MediaItem` objects. The app's browse screen displays all the items in the list. The "for you" screen is not guaranteed to show the recommendations at all if there are less than 15 items in the list.

Each `MediaItem` must have media art. You can optionally provide the type of a `MediaItem` by adding a `CONTENT_TYPE` key,value pair to the Bundle in the MediaDescription of each `MediaItem`. This helps improve the item's ranking in the "for you" page.

The possible values for `CONTENT_TYPE` are:

*   ALBUM
*   ARTIST
*   PLAYLIST
*   TV_SHOW_EPISODE
*   PODCAST_EPISODE
*   MUSIC
*   AUDIO_BOOK
*   RADIO_STATION
*   VIDEO
*   NEWS

Testing
-------

Use the Media Control test app to verify your app.

Known Issues
------------

It is important to avoid opening a media app in the foreground while in driving mode. Currently there is no way for an app to detect whether it is in driving mode or not.

When the Assistant calls `MediaBrowserService.GetRoot()` to retrieve recommendations your app should ensure that `GetRoot()` is being called while in `STATE_NONE`. Otherwise the session will be brought to the foreground.