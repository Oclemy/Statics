# Create Deep Links to App Content

When a clicked link or programmatic request invokes a web URI intent, the Android system tries each of the following actions, in sequential order, until the request succeeds:

1.  Open the user's preferred app that can handle the URI, if one is designated.
2.  Open the only available app that can handle the URI.
3.  Allow the user to select an app from a dialog.

Follow the steps below to create and test links to your content. You can also use the App Links Assistant in Android Studio to add Android App Links.

**Note:** Starting in Android 12 (API level 31), a generic web intent resolves to an activity in your app only if your app is approved for the specific domain contained in that web intent. If your app isn't approved for the domain, the web intent resolves to the user's default browser app instead.

Add intent filters for incoming links
-------------------------------------

To create a link to your app content, add an intent filter that contains these elements and attribute values in your manifest:

`<action>`

Specify the `ACTION_VIEW` intent action so that the intent filter can be reached from Google Search.

`<data>`

Add one or more `<data>` tags, each of which represents a URI format that resolves to the activity. At minimum, the `<data>` tag must include the `android:scheme` attribute.

You can add more attributes to further refine the type of URI that the activity accepts. For example, you might have multiple activities that accept similar URIs, but which differ simply based on the path name. In this case, use the `android:path` attribute or its `pathPattern` or `pathPrefix` variants to differentiate which activity the system should open for different URI paths.

`<category>`

Include the `BROWSABLE` category. It is required in order for the intent filter to be accessible from a web browser. Without it, clicking a link in a browser cannot resolve to your app.

Also include the `DEFAULT` category. This allows your app to respond to implicit intents. Without this, the activity can be started only if the intent specifies your app component name.

The following XML snippet shows how you might specify an intent filter in your manifest for deep linking. The URIs `“example://gizmos”` and `“http://www.example.com/gizmos”` both resolve to this activity.

```xml
<activity
    android:name="com.example.android.GizmosActivity"
    android:label="@string/title_gizmos" >
    <intent-filter android:label="@string/filter_view_http_gizmos">
        <action android:name="android.intent.action.VIEW" />
        <category android:name="android.intent.category.DEFAULT" />
        <category android:name="android.intent.category.BROWSABLE" />
        <!-- Accepts URIs that begin with "http://www.example.com/gizmos” -->
        <data android:scheme="http"
              android:host="www.example.com"
              android:pathPrefix="/gizmos" />
        <!-- note that the leading "/" is required for pathPrefix-->
    </intent-filter>
    <intent-filter android:label="@string/filter_view_example_gizmos">
        <action android:name="android.intent.action.VIEW" />
        <category android:name="android.intent.category.DEFAULT" />
        <category android:name="android.intent.category.BROWSABLE" />
        <!-- Accepts URIs that begin with "example://gizmos” -->
        <data android:scheme="example"
              android:host="gizmos" />
    </intent-filter>
</activity>
```

Notice that the two intent filters only differ by the `<data>` element. Although it's possible to include multiple `<data>` elements in the same filter, it's important that you create separate filters when your intention is to declare unique URLs (such as a specific combination of `scheme` and `host`), because multiple `<data>` elements in the same intent filter are actually merged together to account for all variations of their combined attributes. For example, consider the following:

```xml
<intent-filter>
  ...
  <data android:scheme="https" android:host="www.example.com" />
  <data android:scheme="app" android:host="open.my.app" />
</intent-filter>
```

It might seem as though this supports only `https://www.example.com` and `app://open.my.app`. However, it actually supports those two, plus these: `app://www.example.com` and `https://open.my.app`.

> **Caution:** If multiple activities contain intent filters that resolve to the same verified Android App Link, then there's no guarantee as to which activity handles the link.

Once you've added intent filters with URIs for activity content to your app manifest, Android is able to route any `Intent` that has matching URIs to your app at runtime.

To learn more about defining intent filters, see Allow Other Apps to Start Your Activity.

Read data from incoming intents
-------------------------------

Once the system starts your activity through an intent filter, you can use data provided by the `Intent` to determine what you need to render. Call the `getData()` and `getAction()` methods to retrieve the data and action associated with the incoming `Intent`. You can call these methods at any time during the lifecycle of the activity, but you should generally do so during early callbacks such as `onCreate()` or `onStart()`.

Here’s a snippet that shows how to retrieve data from an `Intent`:

### Kotlin

```kotlin
override fun onCreate(savedInstanceState: Bundle?) {
    super.onCreate(savedInstanceState)
    setContentView(R.layout.main)

    val action: String? = intent?.action
    val data: Uri? = intent?.data
}
```

### Java

```java
@Override
public void onCreate(Bundle savedInstanceState) {
    super.onCreate(savedInstanceState);
    setContentView(R.layout.main);

    Intent intent = getIntent();
    String action = intent.getAction();
    Uri data = intent.getData();
}
```

Follow these best practices to improve the user's experience:

*   The deep link should take users directly to the content, without any prompts, interstitial pages, or logins. Make sure that users can see the app content even if they never previously opened the application. It is okay to prompt users on subsequent interactions or when they open the app from the Launcher.
*   Follow the design guidance described in Navigation with Back and Up so that your app matches users' expectations for backward navigation after they enter your app through a deep link.

Test your deep links
--------------------

You can use the Android Debug Bridge with the activity manager (am) tool to test that the intent filter URIs you specified for deep linking resolve to the correct app activity. You can run the adb command against a device or an emulator.

The general syntax for testing an intent filter URI with adb is:

```shell
$ adb shell am start
        -W -a android.intent.action.VIEW
        -d <URI> <PACKAGE>
```

For example, the command below tries to view a target app activity that is associated with the specified URI.

```shell
$ adb shell am start
        -W -a android.intent.action.VIEW
        -d "example://gizmos" com.example.android
```

The manifest declaration and intent handler you set above define the connection between your app and a website and what to do with incoming links. However, in order to have the system treat your app as the default handler for a set of URIs, you must also request that the system verify this connection. The next lesson explains how to implement this verification.

To learn more about intents and app links, see the following resources:

*   Intents and Intent Filters
*   Allow Other Apps to Start Your Activity
*   Add Android App Links with Android Studio