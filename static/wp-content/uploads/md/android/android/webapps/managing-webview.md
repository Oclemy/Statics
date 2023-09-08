# Managing WebView objects

Android provides several APIs to help you manage the `WebView` objects that display web content in your app.

This page describes how to use these APIs to work with `WebView` objects more effectively, improving your app's stability and security.

Version API
-----------

Starting in Android 7.0 (API level 24), users can choose among several different packages for displaying web content in a `WebView` object. The [AndroidX webkit library](https://developer.android.com/reference/androidx/webkit/package-summary) includes the `getCurrentWebViewPackage()` method for fetching information related to the package that is displaying web content in your app. This method is especially useful when analyzing errors that occur only when your app tries to display web content using a particular package's implementation of `WebView`.

To use this method, add the logic shown in the following code snippet:

### Kotlin

```kotlin
val webViewPackageInfo = WebViewCompat.getCurrentWebViewPackage(appContext)
Log.d("MY_APP_TAG", "WebView version: ${webViewPackageInfo.versionName}")
```

### Java

```java
PackageInfo webViewPackageInfo = WebViewCompat.getCurrentWebViewPackage(appContext);
Log.d("MY_APP_TAG", "WebView version: " + webViewPackageInfo.versionName);
```

> **Note:** The `getCurrentWebViewPackage()` method can return `null` if the device has been set up incorrectly, doesn't support using `WebView` (such as a Wear OS device), or lacks an updatable `WebView` implementation, as on Android 4.4 (API level 19) and earlier.

Google Safe Browsing Service
----------------------------

To provide your users with a safer browsing experience, your `WebView` objects verify URLs using [Google Safe Browsing](https://developers.google.com/safe-browsing/), which enables your app to show users a warning when they attempt to navigate to a potentially unsafe website.

While the default value of `EnableSafeBrowsing` is true, there are occasional cases when you may want to only enable Safe Browsing conditionally or disable it. Android 8.0 (API level 26) and higher support using [`setSafeBrowsingEnabled()`](https://developer.android.com/reference/androidx/webkit/WebSettingsCompat#setSafeBrowsingEnabled(android.webkit.WebSettings,%20boolean)) to toggle Safe Browsing for an individual `WebView` object.

If you would like all `WebView` objects to opt out of Safe Browsing checks, you can do so by adding the following `<meta-data>` element to your app’s manifest file:

```xml
<manifest>
    <application>
        <meta-data android:name="android.webkit.WebView.EnableSafeBrowsing"
                   android:value="false" />
        ...
    </application>
</manifest>
```

### Defining programmatic actions

When an instance of [`WebView`](https://developer.android.com/reference/android/webkit/WebView) attempts to load a page that has been classified by Google as a known threat, the `WebView` by default shows an interstitial that warns users of the known threat. This screen gives users the option to load the URL anyway or return to a previous page that's safe.

If you target Android 8.1 (API level 27) or higher, you can define programmatically how your app responds to a known threat:

*   You can control whether your app reports known threats to Safe Browsing.
*   You can have your app automatically perform a particular action—such as going back to safety—each time it encounters a URL that's classified as a known threat.

> **Note:** For optimal protection against known threats, wait until you've initialized Safe Browsing before you invoke a `WebView` object's `loadUrl()` method.

The following code snippets show how you can instruct your app's instances of `WebView` to always go back to safety after encountering a known threat:

MyWebActivity.java

### Kotlin

```kotlin
private lateinit var superSafeWebView: WebView
private var safeBrowsingIsInitialized: Boolean = false

// ...

override fun onCreate(savedInstanceState: Bundle?) {
    super.onCreate(savedInstanceState)

    superSafeWebView = WebView(this)
    superSafeWebView.webViewClient = MyWebViewClient()
    safeBrowsingIsInitialized = false

    if (WebViewFeature.isFeatureSupported(WebViewFeature.START_SAFE_BROWSING)) {
        WebViewCompat.startSafeBrowsing(this, ValueCallback<Boolean> { success ->
            safeBrowsingIsInitialized = true
            if (!success) {
                Log.e("MY_APP_TAG", "Unable to initialize Safe Browsing!")
            }
        })
    }
}
```

### Java

```java
private WebView superSafeWebView;
private boolean safeBrowsingIsInitialized;

// ...

@Override
protected void onCreate(Bundle savedInstanceState) {
    super.onCreate(savedInstanceState);

    superSafeWebView = new WebView(this);
    superSafeWebView.setWebViewClient(new MyWebViewClient());
    safeBrowsingIsInitialized = false;

    if (WebViewFeature.isFeatureSupported(WebViewFeature.START_SAFE_BROWSING)) {
        WebViewCompat.startSafeBrowsing(this, new ValueCallback<Boolean>() {
            @Override
            public void onReceiveValue(Boolean success) {
                safeBrowsingIsInitialized = true;
                if (!success) {
                    Log.e("MY_APP_TAG", "Unable to initialize Safe Browsing!");
                }
            }
        });
    }
}
```

MyWebViewClient.java

### Kotlin

```kotlin
class MyWebViewClient : WebViewClientCompat() {
    // Automatically go "back to safety" when attempting to load a website that
    // Google has identified as a known threat. An instance of WebView calls
    // this method only after Safe Browsing is initialized, so there's no
    // conditional logic needed here.
    override fun onSafeBrowsingHit(
            view: WebView,
            request: WebResourceRequest,
            threatType: Int,
            callback: SafeBrowsingResponseCompat
    ) {
        // The "true" argument indicates that your app reports incidents like
        // this one to Safe Browsing.
        if (WebViewFeature.isFeatureSupported(WebViewFeature.SAFE_BROWSING_RESPONSE_BACK_TO_SAFETY)) {
            callback.backToSafety(true)
            Toast.makeText(view.context, "Unsafe web page blocked.", Toast.LENGTH_LONG).show()
        }
    }
}
```

### Java

```java
public class MyWebViewClient extends WebViewClientCompat {
    // Automatically go "back to safety" when attempting to load a website that
    // Google has identified as a known threat. An instance of WebView calls
    // this method only after Safe Browsing is initialized, so there's no
    // conditional logic needed here.
    @Override
    public void onSafeBrowsingHit(WebView view, WebResourceRequest request,
            int threatType, SafeBrowsingResponseCompat callback) {
        // The "true" argument indicates that your app reports incidents like
        // this one to Safe Browsing.
        if (WebViewFeature.isFeatureSupported(WebViewFeature.SAFE_BROWSING_RESPONSE_BACK_TO_SAFETY)) {
            callback.backToSafety(true);
            Toast.makeText(view.getContext(), "Unsafe web page blocked.",
                    Toast.LENGTH_LONG).show();
        }
    }
}
```

HTML5 Geolocation API
---------------------

For apps targeting Android 6.0 (API level 23) and higher, the Geolocation API is only supported on secure origins, such as HTTPS. Any request to the Geolocation API on non-secure origins is automatically denied without invoking the corresponding `onGeolocationPermissionsShowPrompt()` method.

Opting out of metrics collection
--------------------------------

`WebView` has the ability to upload anonymous diagnostic data to Google when the user has given their consent. Data is collected on a per-app basis for each app that has instantiated a `WebView`. You can opt out of this feature by creating the following tag in the manifest's `<application>` element:

```xml
<manifest>
    <application>
    ...
    <meta-data android:name="android.webkit.WebView.MetricsOptOut"
               android:value="true" />
    </application>
</manifest>
```

Data will only be uploaded from an app if the user has consented **and** the app has not opted out. For more information on opting out of diagnostic data reporting, see [User privacy in WebView crash reporting](https://developer.android.com/develop/ui/views/layout/webapps/webview-privacy).

Termination Handling API
------------------------

This API handles cases where the renderer process for a `WebView` object goes away, either because the system killed the renderer to reclaim much-needed memory or because the renderer process itself crashed. By using this API, you allow your app to continue executing, even though the renderer process has gone away.

> **Caution:** If your app continues executing after the renderer process goes away, the associated instance of `WebView` cannot be reused, no matter whether the renderer process is killed or crashes. Your app must remove the instance from the view hierarchy and destroy the instance to continue executing. Your app must then create an entirely new instance of `WebView` to continue rendering web pages.

Be aware that, if a renderer crashes while loading a particular web page, attempting to load that same page again could cause a new `WebView` object to exhibit the same rendering crash behavior.

The following code snippet illustrates how to use this API:

### Kotlin

```kotlin
inner class MyRendererTrackingWebViewClient : WebViewClient() {
    private var mWebView: WebView? = null

    override fun onRenderProcessGone(view: WebView, detail: RenderProcessGoneDetail): Boolean {
        if (!detail.didCrash()) {
            // Renderer was killed because the system ran out of memory.
            // The app can recover gracefully by creating a new WebView instance
            // in the foreground.
            Log.e("MY_APP_TAG", ("System killed the WebView rendering process " +
                "to reclaim memory. Recreating..."))

            mWebView?.also { webView ->
                val webViewContainer: ViewGroup = findViewById(R.id.my_web_view_container)
                webViewContainer.removeView(webView)
                webView.destroy()
                mWebView = null
            }

            // By this point, the instance variable "mWebView" is guaranteed
            // to be null, so it's safe to reinitialize it.

            return true // The app continues executing.
        }

        // Renderer crashed because of an internal error, such as a memory
        // access violation.
        Log.e("MY_APP_TAG", "The WebView rendering process crashed!")

        // In this example, the app itself crashes after detecting that the
        // renderer crashed. If you choose to handle the crash more gracefully
        // and allow your app to continue executing, you should 1) destroy the
        // current WebView instance, 2) specify logic for how the app can
        // continue executing, and 3) return "true" instead.
        return false
    }
}
```

### Java

```java
public class MyRendererTrackingWebViewClient extends WebViewClient {
    private WebView mWebView;

    @Override
    public boolean onRenderProcessGone(WebView view,
            RenderProcessGoneDetail detail) {
        if (!detail.didCrash()) {
            // Renderer was killed because the system ran out of memory.
            // The app can recover gracefully by creating a new WebView instance
            // in the foreground.
            Log.e("MY_APP_TAG", "System killed the WebView rendering process " +
                    "to reclaim memory. Recreating...");

            if (mWebView != null) {
                ViewGroup webViewContainer =
                        (ViewGroup) findViewById(R.id.my_web_view_container);
                webViewContainer.removeView(mWebView);
                mWebView.destroy();
                mWebView = null;
            }

            // By this point, the instance variable "mWebView" is guaranteed
            // to be null, so it's safe to reinitialize it.

            return true; // The app continues executing.
        }

        // Renderer crashed because of an internal error, such as a memory
        // access violation.
        Log.e("MY_APP_TAG", "The WebView rendering process crashed!");

        // In this example, the app itself crashes after detecting that the
        // renderer crashed. If you choose to handle the crash more gracefully
        // and allow your app to continue executing, you should 1) destroy the
        // current WebView instance, 2) specify logic for how the app can
        // continue executing, and 3) return "true" instead.
        return false;
    }
}
```

Renderer Importance API
-----------------------

Now that `WebView` objects [operate in multiprocess mode](https://developer.android.com/about/versions/oreo/android-8.0-changes#security-all), you have some flexibility in how your app handles out-of-memory situations. You can use the Renderer Importance API, introduced in Android 8.0, to set a priority policy for the renderer assigned to a particular `WebView` object. In particular, you might want the main part of your app to continue executing when a renderer that displays your app's `WebView` objects is killed. You might do this, for example, if you expect to not show the `WebView` object for a long period of time so that the system can reclaim memory that the renderer was using.

The following code snippet shows how to assign a priority to the renderer process associated with your app's `WebView` objects:

### Kotlin

```kotlin
val myWebView: WebView = ...
myWebView.setRendererPriorityPolicy(RENDERER_PRIORITY_BOUND, true)
```

### Java

```java
WebView myWebView;
myWebView.setRendererPriorityPolicy(RENDERER_PRIORITY_BOUND, true);
```

In this particular snippet, the renderer's priority is the same as (or "is bound to") the default priority for the app. The `true` argument decreases the renderer's priority to `RENDERER_PRIORITY_WAIVED` when the associated `WebView` object is no longer visible. In other words, a `true` argument indicates that your app doesn't care whether the system keeps the renderer process alive. In fact, this lower priority level makes it likely that the renderer process is killed in out-of-memory situations.

> **Warning:** To maintain app stability, you shouldn't change the renderer priority policy for a `WebView` object unless you also use the [Termination Handle API](#termination-handle) to specify how the `WebView` reacts when its associated renderer goes away.

To learn more about how the system handles low-memory situations, see [Processes and Application Life Cycle](https://developer.android.com/guide/topics/processes/process-lifecycle).
