# User privacy in WebView reporting

For users who choose to [share usage statistics and diagnostics with Google](https://support.google.com/accounts/answer/6078260), WebView sends usage statistics and crash reports to Google. Usage statistics contain information such as system information, active field trials, feature usage, responsiveness, performance, and memory usage. They do not include any personally identifying details.

Usage statistics
----------------

Collected usage statistics are used to improve WebView performance and to assess the impact of changes to existing features and guide the development of new features.

The stable channel of WebView gathers usage statistics from a small percentage of users. Pre-stable channels might sample from a greater percentage of users.

Starting with WebView 71, these statistics are associated with the app package name. This enables Google to proactively monitor and address WebView issues that may degrade the performance of specific apps without causing crashes.

Before WebView 104: for any given app, at most 10% of users upload reports containing the package name. Other users upload blank package names or no upload records at all.

Starting with WebView 104: App package names are always recorded for apps that are in a list of allowed popular apps. Other apps upload blank package names.

App developers can opt-out their applications from metrics collection by following [these instructions](https://developer.android.com/develop/ui/views/layout/webapps/managing-webview#metrics).

Crash reports
-------------

Crash reports are collected when a [`WebView`](https://developer.android.com/reference/android/webkit/WebView) object is likely to be the cause of the crash. Crash reports contain information required to determine the state of WebView at the time of the crash. This includes system information, active field trials and stack memory from the app required to generate the sequence of calls made within thread.

Stack memory is sanitized to remove strings, with the intent of capturing only the information required to generate stack traces. No URLs are collected as part of usage statistics or crash reports.

Opt out
-------

Apps may opt out of usage statistics collection by including the following in the `<application>` section of their manifest:

```xml
    <meta-data android:name="android.webkit.WebView.MetricsOptOut" android:value="true" />
```

This disables usage statistics collection for all users of the app, regardless of whether or not they have the corresponding setting enabled. It does not disable crash reporting.

Pseudonymous identifiers and data privacy
-----------------------------------------

Crash reports and usage statistics collected by WebView each contain a randomly generated 128-bit token used to pseudonymously de-duplicate reports and maintain accuracy in statistics. Token values are not shared between apps, and crash reports and usage statistics have independent tokens. All apps' usage statistics tokens are cleared when the user opts out of sharing usage statistics and diagnostics with Google. The crash report token is cleared when the app cache is cleared. Both tokens are cleared when the app is uninstalled or app data is cleared.

