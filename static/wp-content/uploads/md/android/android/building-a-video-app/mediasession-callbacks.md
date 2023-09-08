# Media session callbacks

Since a video app runs its media session and media controller in the same activity, the media session callbacks are different from the implementation shown for the audio app server/client architecture. There are no service calls, and notifications are handled via the NotificationManager. The following table shows how the various features are controlled in each callback method:

**onPlay()**

**onPause()**

**onStop()**

Audio Focus

`requestFocus()` passing in your `OnAudioFocusChangeListener`.  
_Always call `requestFocus()` first, proceed only if focus is granted._

`abandonAudioFocus()`

Media Session

`setActive(true)`  
- Update metadata and state

- Update metadata and state

`setActive(false)`

- Update metadata and state

Player Implementation

Start the player

Pause the player

Stop the player

Becoming Noisy

Register your `BroadcastReceiver`

Unregister your `BroadcastReceiver`

Notifications

Show notification

Update notification