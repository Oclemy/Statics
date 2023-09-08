# Testing against future versions of WebView

Overview
--------

When an application depends on the Android WebView it needs to take into consideration that the system updates the component over time.

To help your app handle these changes well, it is important to test your app using future versions of WebView. This guide explains the different channels through which you can access future versions of WebView.

Webview release channels
------------------------

There are several release channels through which you can access future versions of WebView. As of Android 7 (API level 24), these channels are available as separate apps in the Play Store. You can install any combination of them to test several upcoming versions of WebView alongside the latest stable version.

Like Chrome, WebView has four release channels:

*   **Stable channel**:
    *   Installed and updated by default on every Android device with WebView.
    *   Fully tested. Least likely to crash or have other major bugs.
    *   Updated every 2-3 weeks with minor releases, and every 4 weeks with major releases.
*   **Beta channel**:
    *   Available on Android 6 (API level 23) and higher.
    *   Tested before release, but not as extensively as stable.
    *   One major update ahead of stable, minor updates every week.
*   **Dev channel**:
    *   Publicly available on Android 7 and later.
    *   Two major updates ahead of stable, representing what is actively being developed
    *   Updated once per week.
    *   Minimally tested.
*   **Canary build**:
    *   Available on Android 7 and later.
    *   Released daily.
    *   Includes the latest code changes from the previous day.
    *   Has not been tested or used.

![WebView has stable, beta, dev, and canary build release channels.](https://developer.android.com/static/develop/ui/views/layout/webapps/implementation.png)

**Figure 1**: WebView release channels.

If you're looking for a specific version of Chromium, you can find the latest versions in each channel on [Chromium Dash](https://chromiumdash.appspot.com/releases?platform=Android). WebView and Chrome for Android always release together on all OS levels.

### Installing Webview Beta

Android 10 (API level 29) and higher

1.  Install separate WebView Beta app via the Playstore.
2.  Follow the steps to [enable Android's developer options menu](https://developer.android.com/studio/debug/dev-options#enable)
3.  Navigate to Developer Options > WebView implementation
4.  Choose the WebView channel that you would like to use for WebView

![](https://developer.android.com/static/develop/ui/views/layout/webapps/webview-beta.png)

Android 7 through 9 (API levels 24 - 28)

1.  Install Chrome Beta
2.  Follow the steps to [enable Android's developer options menu](https://developer.android.com/studio/debug/dev-options#enable)
3.  Navigate to Developer Options > WebView implementation
4.  Choose the Chrome channel that you would like to use for WebView

![](https://developer.android.com/static/develop/ui/views/layout/webapps/chrome-beta.png)

WebView DevTools are a set of on-device tools to help debug your WebView apps.

The best way to launch WebView DevTools is to download WebView Beta, Dev, or Canary. These channels contain a launcher icon which launches WebView DevTools.

![You can debug your WebView apps with WebView DevTools.](https://developer.android.com/static/develop/ui/views/layout/webapps/devtools.png)

**Figure 2**: WebView DevTools.

### Webview Crashes

Within the WebView Beta, Dev, and Canary apps, you can view WebView crashes that have occurred on the device.

*   Similar to `chrome://crashes`.
*   Crashes from all apps on the device.
*   File a bug to provide more info.

### Webview Flags

Similarly, the testing apps contain a series of [flags](https://developer.android.com/guide/webapps/debugging#Testing) you may use to enable/disable experimental features.

Using WebView on older versions of Android
------------------------------------------

Jetpack’s [androidx.webkit](https://developer.android.com/jetpack/androidx/releases/webkit) enables you to use WebView APIs on older versions of Android that would otherwise not support them. There are several benefits to AndroidX WebKit:

*   It is a Jetpack library updated regularly.
*   It is easy to use by design,
*   It enables your WebView apps to work on more devices.

Add the dependencies for the artifacts you need in the `build.gradle` file for your app or module:

### Groovy

```groovy
dependencies {
    implementation "androidx.webkit:webkit:1.5.0"
}
```

### Kotlin

```kotlin
dependencies {
    implementation("androidx.webkit:webkit:1.5.0")
}
```
