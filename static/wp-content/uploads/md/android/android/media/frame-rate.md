# Frame rate

The frame rate API lets apps inform the Android platform of their intended frame rate and is available on apps that target Android 11 (API level 30) or higher. Traditionally, most devices have supported only a single display refresh rate, typically 60Hz, but this has been changing. Many devices now support additional refresh rates such as 90Hz or 120Hz. Some devices support seamless refresh rate switches, while others briefly show a black screen, usually lasting a second.

The primary purpose of the API is to enable apps to better take advantage of all the supported display refresh rates. For example, an app playing a 24Hz video that calls `setFrameRate()` may result in the device changing the display refresh rate from 60Hz to 120Hz. This new refresh rate enables smooth, judder-free playback of 24Hz video, with no need for 3:2 pulldown as would be required to play the same video on a 60Hz display. This results in a better user experience.

Basic usage
-----------

Android exposes several ways to access and control surfaces, so there are several versions of the `setFrameRate()` API. Each version of the API takes the same parameters and works the same as the others:

*   `Surface.setFrameRate()`)
*   `SurfaceControl.Transaction.setFrameRate()`)
*   `ANativeWindow_setFrameRate()`
*   `ASurfaceTransaction_setFrameRate()`

The app does not need to consider the actual supported display refresh rates, which can be obtained by calling `Display.getSupportedModes()`), in order to safely call `setFrameRate()`. For example, even if the device only supports 60Hz, call `setFrameRate()` with the frame rate your app prefers. Devices that don't have a better match for the app's frame rate will stay with the current display refresh rate.

To see if a call to `setFrameRate()` results in a change to the display refresh rate, register for display change notifications by calling `DisplayManager.registerDisplayListener()`) or `AChoreographer_registerRefreshRateCallback()`.

When calling `setFrameRate()`, it's best to pass in the exact frame rate rather than rounding to an integer. For example, when rendering a video recorded at 29.97Hz, pass in 29.97 rather than rounding to 30.

For video apps, the compatibility parameter passed to `setFrameRate()` should be set to `Surface.FRAME_RATE_COMPATIBILITY_FIXED_SOURCE` to give an additional hint to the Android platform that the app will use pulldown to adapt to a non-matching display refresh rate (which will result in judder).

In some scenarios, the video surface will stop submitting frames but will remain visible on the screen for some time. Common scenarios include when playback reaches the end of the video or when the user pauses playback. In these cases, call `setFrameRate()` with the frame rate parameter set to 0 to clear the surface's frame rate setting back to the default value. Clearing the frame rate setting like this isn't necessary when destroying the surface, or when the surface is hidden because the user switches to a different app. Clear the frame rate setting only when the surface remains visible without being used.

Non-seamless frame rate switch
------------------------------

On some devices, refresh rate switching may have visual interruptions like a black screen for a second or two. This typically occurs on set top boxes, TV panels, and similar devices. By default the Android framework doesn't switch modes when the `Surface.setFrameRate()`) API is called, in order to avoid such visual interruptions.

Some users prefer a visual interruption at the beginning and the end of longer videos. This allows the refresh rate of the display to match the video frame rate, and avoid frame-rate conversion artifacts such as 3:2 pulldown judder for movie playback.

For this reason, non-seamless refresh rate switches can be enabled if both the user and apps opt-in:

*   **Users**: To opt in, users can enable the Match content frame rate user setting.
*   **Apps**: To opt in, apps can pass `CHANGE_FRAME_RATE_ALWAYS` into `setFrameRate()`).

We recommend you always use `CHANGE_FRAME_RATE_ALWAYS` for long-running videos such as movies. This is because the benefit of matching the video frame rate outweighs the interruption that occurs when changing the refresh rate.

Additional recommendations
--------------------------

Follow these recommendations for common scenarios.

### Multiple surfaces

The Android platform is designed to correctly handle scenarios where there are multiple surfaces with different frame rate settings. When your app has multiple surfaces with different frame rates, call `setFrameRate()` with the correct frame rate for each surface. Even if the device is running multiple apps at once, using split screen or picture-in-picture mode, each app can safely call `setFrameRate()` for their own surfaces.

### The platform does not change to the app's frame rate

Even if the device supports the frame rate the app specifies in a call to `setFrameRate()`, there are cases where the device won't switch the display to that refresh rate. For example, a higher priority surface may have a different frame rate setting, or the device may be in battery saver mode (setting a restriction on the display refresh rate to preserve battery). The app must still work correctly when the device doesn't switch the display refresh rate to the app's frame rate setting, even if the device does switch under normal circumstances.

It's up to the app to decide how to respond when the display refresh rate doesn't match the app frame rate. For video, the frame rate is fixed to that of the source video, and pulldown will be required to show the video content. A game may instead choose to try to run at the display refresh rate rather than staying with its preferred frame rate. The app shouldn't change the value it passes to `setFrameRate()` based on what the platform does. It should stay set to the app's preferred frame rate, regardless of how the app handles cases where the platform doesn't adjust to match the app's request. That way, if device conditions change to allow additional display refresh rates to be used, the platform has the correct information to switch to the app's preferred frame rate.

In cases where the app won't or can't run at the display refresh rate, the app should specify presentation timestamps for each frame, using one of the platform's mechanisms for setting presentation timestamps:

*   `ASurfaceTransaction_setDesiredPresentTime()`
*   `EGL_ANDROID_presentation_time`
*   `VK_GOOGLE_display_timing`

Using these timestamps stops the platform from presenting an app frame too early, which would result in unnecessary judder. Correct usage of frame presentation timestamps is a bit tricky. For games, see our frame pacing guide for more info on avoiding judder, and consider using the Android Frame Pacing library.

In some cases, the platform may switch to a multiple of the frame rate the app specified in `setFrameRate()`. For example, an app may call `setFrameRate()` with 60Hz and the device may switch the display to 120Hz. One reason this might happen is if another app has a surface with a frame rate setting of 24Hz. In that case, running the display at 120Hz will allow both the 60Hz surface and 24Hz surface to run with no pulldown required.

When the display is running at a multiple of the app's frame rate, the app should specify presentation timestamps for each frame to avoid unnecessary judder. For games, the Android Frame Pacing library is helpful for correctly setting frame presentation timestamps.

### setFrameRate() vs preferredDisplayModeId

`WindowManager.LayoutParams.preferredDisplayModeId` is another way that apps can indicate their frame rate to the platform. Some apps only want to change the display refresh rate rather than changing other display mode settings, like the display resolution. In general, use `setFrameRate()` instead of `preferredDisplayModeId`. The `setFrameRate()` function is easier to use because the app doesn't need to search through the list of display modes to find a mode with a specific frame rate.

`setFrameRate()` gives the platform more opportunities to pick a compatible frame rate in scenarios where there are multiple surfaces that are running at different frame rates. For example, consider a scenario where two apps are running in split-screen mode on a Pixel 4, where one app is playing a 24Hz video and the other is showing the user a scrollable list. Pixel 4 supports two display refresh rates: 60Hz and 90Hz. Using the `preferredDisplayModeId` API, the video surface is forced to pick either 60Hz or 90Hz. By calling `setFrameRate()` with 24Hz, the video surface gives the platform more information about the frame rate of the source video, enabling the platform to choose 90Hz for the display refresh rate, which is better than 60Hz in this scenario.

However, there are scenarios where `preferredDisplayModeId` should be used instead of `setFrameRate()`, such as the following:

*   If the app wants to change the resolution or other display mode settings, use `preferredDisplayModeId`.
*   The platform will only switch display modes in response to a call to `setFrameRate()` if the mode switch is lightweight and unlikely to be noticeable to the user. If the app prefers to switch the display refresh rate even if it requires a heavy mode switch (for example, on an Android TV device), use `preferredDisplayModeId`.
*   Apps that can't handle the display running at a multiple of the app's frame rate, which requires setting presentation timestamps on each frame, should use `preferredDisplayModeId`.

### Avoiding calling setFrameRate() too frequently

Although the `setFrameRate()` call isn't very costly in terms of performance, apps should avoid calling `setFrameRate()` every frame or multiple times per second. Calls to `setFrameRate()` are likely to result in a change to the display refresh rate, which may result in a frame drop during the transition. You should figure out the correct frame rate ahead of time and call `setFrameRate()` once.

### Usage for games or other non-video apps

Although video is the primary use case for the `setFrameRate()` API, it can be used for other apps. For example, a game that intends to not run higher than 60Hz (to reduce power usage and achieve longer play sessions) can call `Surface.setFrameRate(60, Surface.FRAME_RATE_COMPATIBILITY_DEFAULT)`. In this way, a device that runs at 90Hz by default will instead run at 60Hz while the game is active, which will avoid the judder that would otherwise occur if the game ran at 60Hz while the display ran at 90Hz.

### Usage of FRAME_RATE_COMPATIBILITY_FIXED_SOURCE

`FRAME_RATE_COMPATIBILITY_FIXED_SOURCE` is intended only for video apps. For non-video usage, use `FRAME_RATE_COMPATIBILITY_DEFAULT`.

### Choosing a strategy for changing the frame rate

*   We strongly recommend that apps, when displaying long-running videos such as movies, call `setFrameRate(`fps`, FRAME_RATE_COMPATIBILITY_FIXED_SOURCE, CHANGE_FRAME_RATE_ALWAYS)` where fps is the frame rate of the video.
*   We strongly recommend against apps calling `setFrameRate()` with `CHANGE_FRAME_RATE_ALWAYS` when you expect video playback to last several minutes or less.

Example integration for video playback apps
-------------------------------------------

We recommend the following steps for integrating refresh rate switches in video playback apps:

1.  Decide the `changeFrameRateStrategy`:
    1.  If playing a long running video such as a movie use `MATCH_CONTENT_FRAMERATE_ALWAYS`
    2.  If playing a short video such as a move trailer use `CHANGE_FRAME_RATE_ONLY_IF_SEAMLESS`
2.  If the `changeFrameRateStrategy` is `CHANGE_FRAME_RATE_ONLY_IF_SEAMLESS` , go to step 4.
3.  Detect if a non-seamless refresh rate switch is about to happen by checking that both of these facts are true:
    1.  Seamless mode switch isn't possible from the current refresh rate (let’s call it C) to the frame rate of the video (let’s call it V). This will be the case if C and V are different and `Display.getMode().getAlternativeRefreshRates`) does not contain a multiple of V.
    2.  The user has opted in to non-seamless refresh rate changes. You can detect this by checking if `DisplayManager.getMatchContentFrameRateUserPreference`) returns `MATCH_CONTENT_FRAMERATE_ALWAYS`
4.  If the switch is going to be seamless, do the following:
    1.  Call `setFrameRate`) and pass it `fps`, `FRAME_RATE_COMPATIBILITY_FIXED_SOURCE`, and `changeFrameRateStrategy`, where `fps` is the frame rate of the video.
    2.  Begin video playback
5.  If a non-seamless mode change is about to happen, do the following:
    1.  Show UX to notify the user. Note that we recommend you implement a way for the user to dismiss this UX and skip the additional delay in step 5.d. This is because our recommended delay is greater than necessary on displays that exhibit faster switching times.
    2.  Call `setFrameRate`) and pass it `fps`, `FRAME_RATE_COMPATIBILITY_FIXED_SOURCE`, and `CHANGE_FRAME_RATE_ALWAYS`, where `fps` is the frame rate of the video.
    3.  Wait for the `onDisplayChanged`) callback.
    4.  Wait 2 seconds for the mode switch to complete.
    5.  Begin video playback

The pseudo-code to **only** support seamless switching is as follows:

```java
    surface.setFrameRate(contentFrameRate,
        FRAME_RATE_COMPATIBILITY_FIXED_SOURCE,
        CHANGE_FRAME_RATE_ONLY_IF_SEAMLESS);
    beginPlayback();
```

The pseudo-code to support seamless and non-seamless switching as described above is as follows:

```java
    if (isSeamlessSwitch(contentFrameRate)) {
      surface.setFrameRate(contentFrameRate,
          FRAME_RATE_COMPATIBILITY_FIXED_SOURCE,
          CHANGE_FRAME_RATE_ONLY_IF_SEAMLESS);
      beginPlayback();
    } else if (displayManager.getMatchContentFrameRateUserPreference()
          == MATCH_CONTENT_FRAMERATE_ALWAYS) {
      showRefreshRateSwitchUI();
      sleep(shortDelaySoUserSeesUi);
      displayManager.registerDisplayListener(…);
      surface.setFrameRate(contentFrameRate,
          FRAME_RATE_COMPATIBILITY_FIXED_SOURCE,
          CHANGE_FRAME_RATE_ALWAYS);
      waitForOnDisplayChanged();
      sleep(twoSeconds);
      hideRefreshRateSwitchUI();
      beginPlayback();
    }
```