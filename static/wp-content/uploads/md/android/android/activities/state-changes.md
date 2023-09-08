# Activity state changes

Different events, some user-triggered and some system-triggered, can cause an `Activity` to transition from one state to another. This document describes some common cases in which such transitions happen, and how to handle those transitions.

For more information about activity states, see The Activity lifecycle. To learn about how the `ViewModel` class can help you manage the activity lifecycle, see ViewModel Overview.

Configuration change occurs
---------------------------

There are a number of events that can trigger a configuration change. Perhaps the most prominent example is a change between portrait and landscape orientations. Other cases that can cause configuration changes include changes to language or input device.

When a configuration change occurs, the activity is destroyed and recreated. The original activity instance will have the following callbacks triggered:

1.  `onPause()`
2.  `onStop()`
3.  `onDestroy()`

A new instance of the activity will be created and have the following callbacks triggered:

1.  `onCreate()`),
2.  `onStart()`,
3.  `onResume()`)

Use a combination of ViewModels, the `onSaveInstanceState()` method, and/or persistent local storage to preserve an activity’s UI state across configuration changes. Deciding how to combine these options depends on the complexity of your UI data, use cases for your app, and consideration of speed of retrieval versus memory usage. For more information on saving your activity UI state, see Saving UI States.

### Handle multi-window cases

When an app enters multi-window mode, available in Android 7.0 (API level 24)and higher, the system notifies the currently running activity of a configuration change, thus going through the lifecycle transitions described above. This behavior also occurs if an app already in multi-window mode gets resized. Your activity can handle the configuration change itself, or it can allow the system to destroy the activity and recreate it with the new dimensions.

For more information about the multi-window lifecycle, see the Multi-window lifecycle section of the Multi-window support page.

In multi-window mode, although there are two apps that are visible to the user, only the one with which the user is interacting is in the foreground and has focus. That activity is in the Resumed state, while the app in the other window is in the Paused state.

When the user switches from app A to app B, the system calls `onPause()`) on app A, and `onResume()`) on app B. It switches between these two methods each time the user toggles between apps.

For more detail about multi-windowing, refer to Multi-window support.

Activity or dialog appears in foreground
----------------------------------------

If a new activity or dialog appears in the foreground, taking focus and partially covering the activity in progress, the covered activity loses focus and enters the Paused state. Then, the system calls `onPause()`) on it.

When the covered activity returns to the foreground and regains focus, it calls `onResume()`).

If a new activity or dialog appears in the foreground, taking focus and completely covering the activity in progress, the covered activity loses focus and enters the Stopped state. The system then, in rapid succession, calls `onPause()`) and `onStop()`).

When the same instance of the covered activity comes back to the foreground, the system calls `onRestart()`), `onStart()`), and `onResume()`) on the activity. If it is a new instance of the covered activity that comes to the background, the system does not call onRestart(), only calling `onStart()`) and `onResume()`).

User presses or gestures Back
-----------------------------

If an activity is in the foreground, and the user presses or gestures Back, the activity transitions through the `onPause()`), `onStop()`), and `onDestroy()`) callbacks. In addition to being destroyed, the activity is also removed from the back stack.

It is important to note that, by default, the `onSaveInstanceState()`) callback does not fire in this case. This behavior is based on the assumption that the user used Back with no expectation of returning to the same instance of the activity. However, you can override the `onBackPressed()`) method to implement custom behavior, such as displaying a dialog that asks the user to confirm that they want to exit your app.

If you override the `onBackPressed()`) method, we still highly recommend that you invoke `super.onBackPressed()`) from your overridden method. Otherwise the system Back behavior may be jarring to the user.

System kills app process
------------------------

If an app is in the background and the system needs to free up additional memory for a foreground app, the background app can be killed by the system to free up more memory. To learn more about how the system decides which processes to destroy, read Activity state and ejection from memory and Processes and Application Lifecycle.

To learn how to save your activity UI state when the system kills your app process, see Saving and restoring activity state.