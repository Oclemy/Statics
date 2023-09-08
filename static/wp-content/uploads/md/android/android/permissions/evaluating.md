# Minimize your permission requests

Before you declare permissions in your app, consider whether you need to do so. Every time the user tries an app feature that requires a runtime permission, your app has to interrupt the user's work with a permission request. The user then must make a decision. If the user doesn't understand why your app requests a particular permission, they might deny the permission or even uninstall your app.

Consider whether another installed app might be able to perform the functionality on your app's behalf. In these cases, delegate the task to another app using an intent. In doing so, you don't need to declare the necessary permissions because the other app declares the permissions instead.

Alternatives to declaring permissions
-------------------------------------

This section describes several use cases that your app can fulfill without declaring the need for any permissions.

### Show nearby places

Your app might need to know the user's approximate location. This is useful for showing location-aware information, such as nearby restaurants.

Some use cases only require a rough estimate of a device's location. In these situations, do one of the following, depending on how often your app needs location-aware information:

*   If your app frequently needs location, declare the `ACCESS_COARSE_LOCATION` permission. The permission provides a device location estimate from location services, as described in the documentation about approximate location accuracy.
*   If your app needs location less often, or only once, consider asking the user to enter an address or a postal code instead.

Other use cases require a more precise estimate of a device's location. Those situations are the only times when it's OK to declare the `ACCESS_FINE_LOCATION` permission.

### Take a photo

Users might take pictures in your app, using the pre-installed system camera app.

In this situation, don't declare the `CAMERA` permission. Instead, invoke the `ACTION_IMAGE_CAPTURE` intent action.

### Record a video

Users might record videos in your app, using the pre-installed system camera app.

In this situation, don't declare the `CAMERA` permission. Instead, invoke the `ACTION_VIDEO_CAPTURE` intent action.

### Open media that your app created

Your app might show media content, such as photos or videos, that the user created while in your app. In this situation, you don't need to use the `READ_EXTERNAL_STORAGE` permission on devices that run Android 10 (API level 29) or higher, as long as your app targets Android 10 or higher. If your app targets Android 10, opt out of scoped storage.

For compatibility with older devices, declare the `READ_EXTERNAL_STORAGE` permission and set the `android:maxSdkVersion` to `28`.

Look for the file in one of the following collections, which are well known to the media store:

*   `MediaStore.Images`
*   `MediaStore.Video`
*   `MediaStore.Audio`

Use `ContentResolver` to query media content directly from the media store, rather than attempting to discover media content on your own.

### Open documents

Your app might show documents that the user created, either in your app or in another app. A common example is a text file.

In this situation, you don't need to use the `READ_EXTERNAL_STORAGE` permission on devices that run Android 10 or higher, as long as your app targets Android 10 or higher. If your app targets Android 10, opt out of scoped storage.

For compatibility with older devices, declare the `READ_EXTERNAL_STORAGE` permission, and set the `android:maxSdkVersion` to `28`.

Depending on which app created the document, do one of the following:

*   If the user created the document in your app, access it directly.
*   If the user created the document in another app, use the Storage Access Framework.

### Identify the device that's running an instance of your app

A particular instance of your app might need to know which device it's running on. This is useful for apps that have device-specific preferences or messaging, such as different playlists for TV devices and wearable devices.

In this situation, don't access the device's IMEI directly. In fact, as of Android 10, you can't do so. Instead, do one of the following:

*   Get a unique device identifier for your app's instance using the Instance ID library.
*   Create your own identifier that's scoped to your app's storage. Use basic system functions, such as `randomUUID()`).

### Pair with a device over Bluetooth

Your app might offer an enhanced experience by transferring data to another device over Bluetooth.

To support this functionality, don't declare the `ACCESS_FINE_LOCATION`, `ACCESS_COARSE_LOCATIION`, or `BLUETOOTH_ADMIN` permissions. Instead, use companion device pairing.

### Pause media when your app is interrupted

If the user receives a phone call, or if a user-configured alarm occurs, your app should pause any media playback until your app regains audio focus.

To support this functionality, don't declare the `READ_PHONE_STATE` permission. Instead, implement the `onAudioFocusChange()`) event handler, which runs automatically when the system shifts its audio focus. Learn more about how to implement audio focus.

### Filter phone calls

To minimize unnecessary interruptions for the user, your app might filter phone calls for spam.

To support this functionality, don't declare the `READ_PHONE_STATE` permission. Instead, use the `CallScreeningService` API.

### Place phone calls

Your app might offer the ability to place a phone call by tapping a contact's information.

To support this functionality, use the `ACTION_DIAL` intent action rather than the `ACTION_CALL` action. `ACTION_CALL` requires the install-time permission `CALL_PHONE`, which prevents devices that can't place calls, such as some tablets, from installing your application.

### Access SMS messages

Your app might need access to SMS messages, for example to receive authentication codes that protect the user from fraud.

To support this functionality, if your app targets Android 8.0 (API level 26) or higher, don't request the `READ_SMS` permission as part of verifying a user's credentials. Instead, generate an app-specific token using `createAppSpecificSmsToken()`), then pass this token to another app or service that can send a verification SMS message.