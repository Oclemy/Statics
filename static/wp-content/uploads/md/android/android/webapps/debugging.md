# Debugging web apps

You can debug your JavaScript using the `console` JavaScript APIs and view the output messages to logcat. If you're familiar with debugging web pages with Firebug or Web Inspector, then you're probably familiar with using `console` (such as `console.log()`). Android's WebKit framework supports most of the same APIs, so you can receive logs from your web page when debugging in your [`WebView`](https://developer.android.com/reference/android/webkit/WebView). This topic describes how to use the console APIs for debugging.

Using console APIs in WebView
-----------------------------

All the console APIs shown in the previous section are also supported when debugging in WebView. You must provide a [`WebChromeClient`](https://developer.android.com/reference/android/webkit/WebChromeClient) that implements the [`onConsoleMessage()`](https://developer.android.com/reference/android/webkit/WebChromeClient#onConsoleMessage(android.webkit.ConsoleMessage)) method in order for console messages to appear in logcat. Then, apply the [`WebChromeClient`](https://developer.android.com/reference/android/webkit/WebChromeClient) to your `WebView` with [`setWebChromeClient()`](https://developer.android.com/reference/android/webkit/WebView#setWebChromeClient(android.webkit.WebChromeClient)).

The following shows how to use console APIs in WebView:

### Kotlin

```kotlin
val myWebView: WebView = findViewById(R.id.webview)
myWebView.webChromeClient = object : WebChromeClient() {

    override fun onConsoleMessage(message: ConsoleMessage): Boolean {
        Log.d("MyApplication", "${message.message()} -- From line " +
              "${message.lineNumber()} of ${message.sourceId()}")
        return true
    }
}
```

### Java

```java
WebView myWebView = findViewById(R.id.webview);
myWebView.setWebChromeClient(new WebChromeClient() {
    @Override
    public boolean onConsoleMessage(ConsoleMessage consoleMessage) {
        Log.d("MyApplication", consoleMessage.message() + " -- From line " +
        consoleMessage.lineNumber() + " of " + consoleMessage.sourceId());
        return true;
    }
});
```

The [`ConsoleMessage`](https://developer.android.com/reference/android/webkit/ConsoleMessage) also includes a [`MessageLevel`](https://developer.android.com/reference/android/webkit/ConsoleMessage.MessageLevel) object to indicate the type of console message being delivered. You can query the message level with [`messageLevel()`](https://developer.android.com/reference/android/webkit/ConsoleMessage#messageLevel()) to determine the severity of the message, then use the appropriate [`Log`](https://developer.android.com/reference/android/util/Log) method or take other appropriate actions.

Whether you're using [`onConsoleMessage(String, int, String)`](https://developer.android.com/reference/android/webkit/WebChromeClient#onConsoleMessage(java.lang.String,%20int,%20java.lang.String)) or [`onConsoleMessage(ConsoleMessage)`](https://developer.android.com/reference/android/webkit/WebChromeClient#onConsoleMessage(android.webkit.ConsoleMessage)), when you execute a console method in your web page, Android calls the appropriate [`onConsoleMessage()`](https://developer.android.com/reference/android/webkit/WebChromeClient#onConsoleMessage(java.lang.String,%20int,%20java.lang.String)) method so you can report the error. For instance, with the example code above, a logcat message is printed that looks like this:

```shell
    Hello World -- From line 82 of http://www.example.com/hello.html
```

Logcat
------

Logcat is a tool that dumps a log of system messages. The messages include a stack trace when the device throws an error, as well as log messages written from your application and those written using JavaScript `console` APIs.

To run logcat and view messages from Android Studio, select **View > Tool Windows > Logcat**.

For more information, see [Write and view logs with logcat](https://developer.android.com/studio/debug/am-logcat).

The following are some additional resources related to debugging:

*   [Remote debugging on Android](https://developers.google.com/chrome-developer-tools/docs/remote-debugging)
*   [Debug your app](https://developer.android.com/studio/debug)

Testing experimental web features
---------------------------------

Similar to Google Chrome's `chrome://flags` page, you can also test experimental web features in WebView.

To do this, do the following:

1.  [Install one of WebView's pre-release channels](https://chromium.googlesource.com/chromium/src/+/HEAD/android_webview/docs/prerelease.md) (beta, dev, or canary).
    
2.  [Switch your WebView channel](https://chromium.googlesource.com/chromium/src/+/HEAD/android_webview/docs/prerelease.md#android-10-and-later-q_r_etc) on your test device to the installed pre-release channel.
    
3.  Click on the WebView DevTools Launcher.
    
      
    **Figure 1.** WebView DevTools icon for app installed on a device.
    
4.  From DevTools, click on **Flags** and search for any experimental features you'd like to enable or disable. The change applies to all WebViews on the device.
    
5.  Stop and restart your app to start testing with the new features.
    

