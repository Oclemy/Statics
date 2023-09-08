# Capture video and audio playback

An app can record the video or audio that is being played from another app. Such apps must handle the `MediaProjection` token correctly. This page explains how. It also shows how a device admin can disable the ability to record any screen snapshots, and how an audio app can prevent other apps from recording the content it plays.

The `MediaProjection` API allows apps to acquire a `MediaProjection` token that gives them one time access to capture screen contents or audio. The Android OS asks the user for their permission before granting the token to your app.

The OS displays the active `MediaProjection` tokens in the Quick Settings UI and allows users to withdraw access to a token at any time. When this happens the virtual displays or audio streams associated with the session stop receiving media streams. Your app must respond appropriately, otherwise it will continue to record audio silence or a black video stream.

To handle the loss of a token, register a callback on the `MediaProjection` instance using the `registerCallback`) method, and stop recording when the `onStop`) method is called.

Capture video
-------------

See the ScreenCapture sample app to learn how to learn how to use Media Projection API to capture a device's screen in real time and show it on a SurfaceView.

You can use the `DevicePolicyManger` to prevent screen recording. For enterprise accounts (Android for Work), the administrator can disable the collection of assistant data for the work profile by using the setScreenCaptureDisabled) method.

The codelab Managing Android Devices Without an App shows how to forbid screenshots.

Capture audio playback
----------------------

The AudioPlaybackCapture API was introduced in Android 10. This API gives apps the ability to copy the audio being played by other apps. This feature is the analog of screen capture, but for audio. The primary use case is for streaming apps that want to capture the audio being played by games.

Note that the AudioPlaybackCapture API does not affect the latency of the app whose audio is being captured.

### Building a capture app

For security and privacy, playback capture imposes some limitations. To be able to capture audio, an app must meet these requirements:

*   The app must have the `RECORD_AUDIO` permission.
*   The app must bring up the prompt displayed by `MediaProjectionManager.createScreenCaptureIntent()`), and the user must approve it.
*   The capturing and playing apps must be in the same user profile.

To capture audio from another app, your app must build an `AudioRecord` object and add an `AudioPlaybackCaptureConfiguration` to it. Follow these steps:

1.  Call `AudioPlaybackCaptureConfiguration.Builder.build()`) to build an `AudioPlaybackCaptureConfiguration`.
2.  Pass the configuration to the `AudioRecord` by calling `setAudioPlaybackCaptureConfig`).

### Controlling audio capture

Your app can control what types of content it can record, and what other kinds of app can record its own playback.

#### Constraining capture by audio content

An app can limit which audio it can capture by using these methods:

*   Pass an `AUDIO_USAGE` to AudioPlaybackCaptureConfiguration.addMatchingUsage()) to permit capturing a specific usage. Call the method multiple times to specify more than one usage.
*   Pass an `AUDIO_USAGE` to AudioPlaybackCaptureConfiguration.excludeUsage()) to forbid capturing that usage. Call the method multiple times to specify more than one usage.
*   Pass a UID to AudioPlaybackCaptureConfiguration.addMatchingUid()) to only capture apps with a specific UID. Call the method multiple times to specify more than one UID.
*   Pass a UID to AudioPlaybackCaptureConfiguration.excludeUid()) to forbid capturing that UID. Call the method multiple times to specify more than one UID.

Note that you cannot use the `addMatchingUsage()` and `excludeUsage()` methods together. You must choose one or the other. Likewise, you cannot use `addMatchingUid()` and `excludeUid()` at the same time.

### Constraining capture by other apps

You can configure an app to prevent other apps from capturing its audio. The audio coming from an app can be captured only if the app meets these requirements:

#### Usage

The player producing the audio must set its usage) to `USAGE_MEDIA`, `USAGE_GAME`, or `USAGE_UNKNOWN`.

#### Capture policy

The player's capture policy must be `AudioAttributes.ALLOW_CAPTURE_BY_ALL`, which allows other apps to capture playback. This can be done in a number of ways:

*   To enable capture on all players, include `android:allowAudioPlaybackCapture="true"` in the app's `manifest.xml` file.
*   You can also enable capture on all players by calling `AudioManager.setAllowedCapturePolicy(AudioAttributes.ALLOW_CAPTURE_BY_ALL)`).
*   You can set the policy on an individual player when you build it using `AudioAttributes.Builder.setAllowedCapturePolicy(AudioAttributes.ALLOW_CAPTURE_BY_ALL)`). (If you are using `AAudio` call `AAudioStreamBuilder_setAllowedCapturePolicy(AAUDIO_ALLOW_CAPTURE_BY_ALL)`.)

If these prerequisites are met, any audio produced by the player can be captured.

#### Disabling system capture

The protections permitting capture described above apply only to apps. Android system components can capture playback by default. Many of these components are customized by Android vendors and support features like accessibility and captioning. For this reason it is recommended that apps allow the system to capture their playback. In the rare case when you do not want the system to capture your app's playback, set the capture policy to `ALLOW_CAPTURE_BY_NONE`.

#### Setting policy at runtime

You can call `AudioManager.setAllowedCapturePolicy()` to change the capture policy while an app is running. If a MediaPlayer or AudioTrack is playing when you call the method, the audio is not affected. You must close and reopen the player or track for the policy change to take effect.

#### Policy = manifest + AudioManager + AudioAttributes

Since the capture policy can be specified in several places, it's important to understand how the effective policy is determined. The most restrictive capture policy is always applied. For example, an app whose manifest includes `setAllowedCapturePolicy="false"` will never permit non-system apps to capture its audio, even if `AudioManager#setAllowedCapturePolicy` is set to `ALLOW_CAPTURE_BY_ALL`. Similarly, if the `AudioManager#setAllowedCapturePolicy` is set to `ALLOW_CAPTURE_BY_ALL` and the manifest sets `setAllowedCapturePolicy="true"`, but the media player's `AudioAttributes` were built with `AudioAttributes.Builder#setAllowedCapturePolicy(ALLOW_CAPTURE_BY_SYSTEM)`, then this media player will not be capturable by non-system apps.

The table below summarizes the effect of the manifest attribute and the effective policy:

allowAudioPlaybackCapture

ALLOW_CAPTURE_BY_ALL

ALLOW_CAPTURE_BY_SYSTEM

ALLOW_CAPTURE_BY_NONE

true

any app

system only

no capture

false

system only

system only

no capture