# Handling Android App Links

![Deep links handle content URIs. Web links handle the         HTTP and HTTPS schemes. Android App Links handle the autoVerify         attribute.](https://developer.android.com/static/images/training/app-links/ink-types-capabilities.svg)

**Figure 1.** Capabilities of deep links, web links, and Android App Links.

Users following links on devices have one goal in mind: to get to the content they want to see. As a developer, you can set up Android App Links to take users to a link's specific content directly in your app, bypassing the app-selection dialog, also known as the disambiguation dialog. Because Android App Links leverage HTTP URLs and association with a website, users who don't have your app installed go directly to content on your site.

Understand the different types of links
---------------------------------------

Before you implement Android App Links, it's important to understand the different types of links you can create in your Android app: deep links, web links, and Android App Links. Figure 1 shows the relationship among these types of links, and the following sections describe each type of link in more detail.

### Deep links

_Deep links_ are URIs of any scheme that take users directly to a specific part of your app. To create deep links, add intent filters to drive users to the right activity in your app, as shown in the following code snippet:

```xml
<activity
    android:name=".MyMapActivity"
    android:exported="true"
    ...>
    <intent-filter>
        <action android:name="android.intent.action.VIEW" />
        <category android:name="android.intent.category.DEFAULT" />
        <category android:name="android.intent.category.BROWSABLE" />
        <data android:scheme="geo" />
    </intent-filter>
</activity>
```

When the user clicks a deep link, a disambiguation dialog might appear. This dialog allows the user to select one of multiple apps, including your app, that can handle the given deep link. Figure 2 shows the dialog after the user clicks a map link, asking whether to open the link in Maps or Chrome.

![](https://developer.android.com/static/training/app-links/images/app-disambiguation_2x.png)

**Figure 2.** The disambiguation dialog

### Web links

_Web links_ are deep links that use the HTTP and HTTPS schemes. On Android 12 and higher, clicking a web link (that is not an Android App Link) always shows content in a web browser. On devices running previous versions of Android, if your app or other apps installed on a user's device can also handle the web link, users might not go directly to the browser. Instead, they'll see a disambiguation dialog similar to the one that appears in figure 2.

The following code snippet shows an example of a web link filter:

```xml
<intent-filter>
    <action android:name="android.intent.action.VIEW" />
    <category android:name="android.intent.category.DEFAULT" />
    <category android:name="android.intent.category.BROWSABLE" />

    <data android:scheme="http" />
    <data android:host="myownpersonaldomain.com" />
</intent-filter>
```

### Android App Links

_Android App Links_, available on Android 6.0 (API level 23) and higher, are web links that use the HTTP and HTTPS schemes and contain the `autoVerify` attribute. This attribute allows your app to designate itself as the default handler of a given type of link. So when the user clicks on an Android App Link, your app opens immediately if it's installed—the disambiguation dialog doesn't appear.

If the user doesn't want your app to be the default handler, they can override this behavior from the app's settings.

The following code snippet shows an example of an Android App Link filter:

```xml
<intent-filter android:autoVerify="true">
    <action android:name="android.intent.action.VIEW" />
    <category android:name="android.intent.category.DEFAULT" />
    <category android:name="android.intent.category.BROWSABLE" />

    <data android:scheme="http" />
    <data android:scheme="https" />

    <data android:host="myownpersonaldomain.com" />
</intent-filter>
```

Android App Links offer the following benefits:

*   **Secure and specific:** Android App Links use HTTP URLs that link to a website domain you own, so no other app can use your links. One of the requirements for Android App Links is that you verify ownership of your domain through one of our website association methods.
*   **Seamless user experience:** Since Android App Links use a single HTTP URL for the same content on your website and in your app, users who don’t have the app installed simply go to your website instead of the app — no 404s, no errors.
*   **Android Instant Apps support:** With Android Instant Apps, your users can run your Android app without installing it. To add Instant App support to your Android app, set up Android App Links and visit g.co/InstantApps.
*   **Engage users from Google Search:** Users directly open specific content in your app by clicking a URL from Google in a mobile browser, in the Google Search app, in screen search on Android, or through Google Assistant.

Add Android App Links
---------------------

The general steps for creating Android App Links are as follows:

1.  **Create deep links to specific content in your app:** In your app manifest, create intent filters for your website URIs and configure your app to use data from the intents to send users to the right content in your app. Learn more in Create Deep Links to App Content.
2.  **Add verification for your deep links:** Configure your app to request verification of app links. Then, publish a Digital Asset Links JSON file on your websites to verify ownership through Google Search Console. Learn more in Verify App Links.

As an alternative to the documentation linked above, the Android App Links Assistant is a tool in Android Studio that guides you through each of the steps required to create Android App Links.

For additional information, see the following resources:

*   Add Android App Links in Android Studio
*   Creating a Statement List

Manage and verify Android App Links
-----------------------------------

You can manage and verify deep links through the Play Console. Once an app has been successfully uploaded the dashboard (located under Grow > Deep links) displays an overview of deep links and configuration errors.

**Figure 3.** Deep links Play Console dashboard

The dashboard offers the following sections:

*   Highlights of the overall deep links configuration
*   All the domains declared in the manifest file
*   Web links which are grouped by path
*   Links which have custom schemes

Each one of these sections displays the deep link status and a way to fix them in case of an error.

