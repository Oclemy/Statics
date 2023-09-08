# Darken web content in WebView

On devices running Android 10 (API level 29) and higher, app users can set the device to light theme or [dark theme](https://developer.android.com/guide/topics/ui/look-and-feel/darktheme) at the OS level. WebView applies these themes according to a [ForceDark setting](https://developer.android.com/reference/androidx/webkit/WebSettingsCompat#setForceDarkStrategy(android.webkit.WebSettings,%20int)), which can have three states: [`FORCE_DARK_AUTO`](https://developer.android.com/reference/androidx/webkit/WebSettingsCompat#FORCE_DARK_AUTO), [`FORCE_DARK_ON`](https://developer.android.com/reference/androidx/webkit/WebSettingsCompat#FORCE_DARK_ON), and [`FORCE_DARK_OFF`](https://developer.android.com/reference/androidx/webkit/WebSettingsCompat#FORCE_DARK_OFF).

You can use the `FORCE_DARK_ON` and `FORCE_DARK_OFF` states when your application provides its own method for switching, such as a toggle in the UI or an automatic time-based selection. See [DayNight theme](#daynight) for another use case that requires you to provide a toggle UI element.

To check whether the feature is supported, add the following lines of code wherever you configure your WebView object, such as in `Activity#onCreate`:

### Kotlin

```kotlin
if (WebViewFeature.isFeatureSupported(WebViewFeature.FORCE_DARK)) {
    WebSettingsCompat.setForceDark(...)
}
```

### Java

```java
if (WebViewFeature.isFeatureSupported(WebViewFeature.FORCE_DARK)) {
    WebSettingsCompat.setForceDark(...);
}
```

Use FORCE_DARK_AUTO mode
--------------------------

`FORCE_DARK_AUTO` mode is applied if the following conditions are met:

*   The WebView and its parent elements allow force dark.
*   The current activity theme is marked as light.

WebView and all its parents can allow force dark using [`View.setForceDarkAllowed()`](https://developer.android.com/reference/android/view/View#setForceDarkAllowed(boolean)). The default value is taken from the `setForceDarkAllowed()` attribute of the Android theme, which must also be set to `true`.

`FORCE_DARK_AUTO` mode is provided primarily for backward-compatibility in apps that don't provide their own dark theme. We recommend using `AppCompat.DayNight` to explicitly support a dark theme. Listen for theme changes and toggles between `FORCE_DARK_ON` and `FORCE_DARK_OFF`, such as when using `Theme.Material.Light`.

```xml
    <style name="AppDayNightTheme" parent="Theme.AppCompat.DayNight">
           <item name="android:forceDarkAllowed">true</item>
           <item name="android:isLightTheme">true</item>
    </style>
```

### Use DayNight themes

[DayNight themes](https://medium.com/androiddevelopers/appcompat-v23-2-daynight-d10f90c83e94) require you to use the `FORCE_DARK_ON` and `FORCE_DARK_OFF` Webkit states, and to provide explicit theme-changing functionality, such as through a toggle UI element or time-based switching. If your app relies on the system preference, you must explicitly listen for theme changes and apply these to WebView with `FORCE_DARK_ON` and `FORCE_DARK_OFF` states.

The following code snippet shows how to change the theme format.

### Kotlin

```kotlin
if (WebViewFeature.isFeatureSupported(WebViewFeature.FORCE_DARK)) {
    when (resources.configuration.uiMode and Configuration.UI_MODE_NIGHT_MASK) {
        Configuration.UI_MODE_NIGHT_YES -> {
            WebSettingsCompat.setForceDark(myWebView.settings, FORCE_DARK_ON)
        }
        Configuration.UI_MODE_NIGHT_NO, Configuration.UI_MODE_NIGHT_UNDEFINED -> {
            WebSettingsCompat.setForceDark(myWebView.settings, FORCE_DARK_OFF)
        }
        else -> {
            //
        }
    }
}
```

### Java

```java
if (WebViewFeature.isFeatureSupported(WebViewFeature.FORCE_DARK)) {
    switch (getResources().getConfiguration().uiMode & Configuration.UI_MODE_NIGHT_MASK) {
        case Configuration.UI_MODE_NIGHT_YES:
            WebSettingsCompat.setForceDark(myWebView.getSettings(), FORCE_DARK_ON);
            break;
        case Configuration.UI_MODE_NIGHT_NO:
        case Configuration.UI_MODE_NIGHT_UNDEFINED:
            WebSettingsCompat.setForceDark(myWebView.getSettings(), FORCE_DARK_OFF);
            break;
    }
}
```

Customize dark theme
--------------------

To provide the dark experience in all cases, by default WebView tries to determine whether a web page provides dark mode by itself and applies automatic darkening otherwise.

WebView can't differentiate based solely on the presence of the media query, so it needs a `<meta name="color-scheme" content="dark light">` tag in the `<head>` of the HTML page to indicate that the web page has its own dark theme. To prevent double-darkening (that is, applying color inversion on top of media query customization) WebView evaluates `@media (prefers-color-scheme: dark)` to false if this meta tag is missing.

The [ForceDarkStrategy API](https://developer.android.com/reference/androidx/webkit/WebSettingsCompat#setForceDarkStrategy(android.webkit.WebSettings,%20int)), exposed only within AndroidX, allows you to control how darkening is applied to a given WebView. This API is applicable only if force dark is set to `FORCE_DARK_ON` or `FORCE_DARK_AUTO`.

Using the API, you can choose between web theme darkening and user-agent darkening:

*   **Web theme darkening**: Web developers might apply `@media (prefers-color-scheme: dark)` to control web page appearance in the dark mode. WebView renders content according to these settings. For more about web theme darkening, see the [specification](https://drafts.csswg.org/css-color-adjust-1/#preferred).
*   **User-agent darkening**: the WebView automatically inverts colors of the web page. If you use user-agent darkening, the `@media (prefers-color-scheme: dark)` query evaluates to false.

To choose between the two strategies, use the following API:

### Kotlin

```kotlin
if (WebViewFeature.isFeatureSupported(WebViewFeature.FORCE_DARK_STRATEGY)) {
    WebSettingsCompat.setForceDarkStrategy(...)
}
```

### Java

```java
if (WebViewFeature.isFeatureSupported(WebViewFeature.FORCE_DARK_STRATEGY)) {
    WebSettingsCompat.setForceDarkStrategy(...);
}
```

The supported strategy options are:

*   [`DARK_STRATEGY_PREFER_WEB_THEME_OVER_USER_AGENT_DARKENING`](https://developer.android.com/reference/androidx/webkit/WebSettingsCompat#DARK_STRATEGY_PREFER_WEB_THEME_OVER_USER_AGENT_DARKENING): This is the default option. While most browsers treat the `<meta name="color-scheme" content="dark light">` tag as optional, Android WebView's default mode requires the meta tag to honor the web page's `prefers-color-scheme` media queries. You may optionally use WebViews with [`DARK_STRATEGY_WEB_THEME_DARKENING_ONLY`](https://developer.android.com/reference/androidx/webkit/WebSettingsCompat#DARK_STRATEGY_WEB_THEME_DARKENING_ONLY) mode, in which case WebView will always apply media queries even if the tag is omitted.
    
    However, we recommend web developers add `<meta name="color-scheme" content="dark light">` tag to their websites to ensure that their content renders correctly in WebViews with the default configuration.
    
*   [`DARK_STRATEGY_USER_AGENT_DARKENING_ONLY`](https://developer.android.com/reference/androidx/webkit/WebSettingsCompat#DARK_STRATEGY_USER_AGENT_DARKENING_ONLY): Called user-agent darkening, the WebView ignores any web page darkening and applies automatic darkening.
    

If your app shows first-party web content that you've customized with the `prefers-color-scheme` media query, we recommend [`DARK_STRATEGY_WEB_THEME_DARKENING_ONLY`](https://developer.android.com/reference/androidx/webkit/WebSettingsCompat#DARK_STRATEGY_WEB_THEME_DARKENING_ONLY) to ensure WebView uses the custom theme.

