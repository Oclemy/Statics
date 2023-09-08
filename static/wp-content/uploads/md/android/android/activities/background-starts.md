# Restrictions on starting activities from the background

Android 10 (API level 29) and higher place restrictions on when apps can start activities when the app is running in the background. These restrictions help minimize interruptions for the user and keep the user more in control of what's shown on their screen.

This guide presents notifications as an alternative for starting activities from the background. Then, this guide lists the specific cases where the restriction doesn't apply.

Display notifications instead
-----------------------------

In nearly all cases, apps that are in the background should display time-sensitive notifications to provide urgent information to the user instead of directly starting an activity. Examples of when to use such notifications include handling an incoming phone call or an active alarm clock.

This notification-based alert and reminder system provides several advantages for users:

*   When using the device, the user is shown a heads-up notification that allows them to respond. The user maintains their current context and has control over the content that they see on the screen.
*   Time-sensitive notifications respect the user's Do Not Disturb rules. For example, users might permit calls only from specific contacts, or repeat callers, when Do Not Disturb is enabled.
*   When the device's screen is off, your full-screen intent is launched immediately.
*   In the device's **Settings** screen, the user can see which apps have recently sent notifications, including from specific notification channels. From this screen, the user can control their notification preferences.

Exceptions to the restriction
-----------------------------

Apps running on Android 10 or higher can start activities only when one or more of the following conditions are met:

*   The app has a visible window, such as an activity in the foreground.
*   The app has an activity in the back stack of the foreground task.
*   The app has an activity in the back stack of an existing task on the **Recents** screen.
    
*   The app has an activity that was started very recently.
    
*   The app called `finish()`) on an activity very recently. This applies only when the app had either an activity in the foreground or an activity in the back stack of the foreground task at the time `finish()` was called.
    
*   The app has a service that is bound by the system. This condition applies only for the following services, which might need to launch a UI: `AccessibilityService`, `AutofillService`, `CallRedirectionService`, `HostApduService`, `InCallService`, `TileService`, `VoiceInteractionService`, and `VrListenerService`.
    
*   The app has a service that is bound by a different, visible app. Note that the app that is bound to the service must remain visible for the app in the background to start activities successfully.
    
*   The app receives a notification `PendingIntent` from the system. In the case of pending intents for services and broadcast receivers, the app can start activities for a few seconds after the pending intent is sent.
    
*   The app receives a `PendingIntent` that is sent from a different, visible app.
    
*   The app receives a system broadcast where the app is expected to launch a UI. Examples include `ACTION_NEW_OUTGOING_CALL` and `SECRET_CODE_ACTION`. The app can start activities for a few seconds after the broadcast is sent.
    
*   The app is associated with a companion hardware device through the `CompanionDeviceManager` API. This API allows the app to start activities in response to actions that the user performs on a paired device.
    
*   The app is a device policy controller running in device owner mode. Example use cases include fully managed enterprise devices, as well as dedicated devices like digital signage and kiosks.
    
*   The app has been granted the `SYSTEM_ALERT_WINDOW` permission by the user.