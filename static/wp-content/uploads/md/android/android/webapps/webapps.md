# Web-based content

![](https://developer.android.com/static/images/webapps/webapps.png)

**Figure 1.** You can make your web content available to users in two ways: in a traditional web browser and in an Android application, by including a [`WebView`](https://developer.android.com/reference/android/webkit/WebView)in the layout.

Android offers a variety of ways to present content to a user. To provide a user experience that’s consistent with the rest of the platform, it’s usually best to build a native app that incorporates framework-provided experiences, such as [Android App Links](https://developer.android.com/training/app-links) or [Search](https://developer.android.com/guide/topics/search). Additionally, you can use Google Play-based experiences, such as [App Actions](https://developer.android.com/guide/actions) and [Slices](https://developer.android.com/guide/slices), where Google Play services is available. Some apps, however, may need increased control over the UI. In this case, a [`WebView`](https://developer.android.com/reference/android/webkit/WebView) is a good option for displaying trusted first-party content.

Figure 1 illustrates how you can provide access to your web pages from either a browser or your own Android app. The `WebView` framework allows you to specify viewport and style properties that make your web pages appear at the proper size and scale on all screen configurations for all major web browsers. You can even define an interface between your Android app and your web pages that allows JavaScript in the web pages to call upon APIs in your app—providing Android APIs to your web-based application.

However, you shouldn't develop an Android app simply as a means to view your website. Rather, the web pages you embed in your app should be designed especially for that environment.

Alternatives to WebView
-----------------------

Although `WebView` objects provide increased control over the UI, there are alternatives that may provide similar functionality with various advantages: they require less configuration, may load and perform faster, provide improved privacy protections, and can access the browser's cookies.

Consider using these alternatives to `WebView` if your app falls into the following use cases:

*   If you want to send users to a mobile site, [build a progressive web app (PWA)](https://web.dev/progressive-web-apps/).
*   If you want to display third-party web content, [send an intent to installed web browsers](https://developer.android.com/guide/components/intents-common#Browser).
*   If you want to avoid leaving your app to open the browser, or if you want to customize the browser's UI, use [Custom Tabs](https://developer.chrome.com/docs/android/custom-tabs/).

To start developing web pages for Android-powered devices using `WebView` objects, see the following documents.
