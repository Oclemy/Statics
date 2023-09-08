# Receiving simple data from other apps

Just as an app can send data to other apps, it can also receive data from other apps as well. Think about how users interact with your application and what data types you want to receive from other applications. For example, a social networking application might be interested in receiving text content, like an interesting web URL, from another app.

Users will often send data to your app through the Android Sharesheet or the intent resolver. All received data has a MIME type set by the providing app. There are three ways your app can receive data sent by another app:

*   An `Activity` with a matching `intent-filter` tag in the manifest
*   One or more `ChooserTarget` objects returned by your `ChooserTargetService`
*   Sharing Shortcuts published by your app. These supersede `ChooserTarget` objects. Sharing Shortcuts are only available if your app is running Android 10 (API level 29).

Sharing Shortcuts and `ChooserTarget` objects are Direct Share deep links into a specific `Activity` within your app. They often represent a person, and the Android Sharesheet shows them. For example, a messaging application can provide a Sharing Shortcut for a person that deep links directly into a conversation with that person.

Supporting MIME types
---------------------

Your app should be able to receive the widest possible range of MIME types. For example, a messaging app used to send text, images and video should support receiving `text/*`, `image/*` and `video/*`. Here are a few common MIME types when sending simple data in Android.

*   `text/*`, senders will often send `text/plain`, `text/rtf`, `text/html`, `text/json`
*   `image/*`, senders will often send `image/jpg`, `image/png`, `image/gif`
*   `video/*`, senders will often send `video/mp4`, `video/3gp`
*   receivers should register for supported file extensions, senders will often send `application/pdf`

Please refer to the IANA official registry of MIME media types. You can receive a MIME type of `*/*`, but this is highly discouraged unless you are fully capable of handling **any** type of incoming content.

When a user taps on a share target associated with a specific activity they should be able to confirm and edit the shared content before using it. This is especially important for text data.

Tapping on any Direct Share target should take the user to an interface where an action can be directly performed on the target's subject. Avoid showing users a disambiguation or placing them in an interface that is not related to the tapped target. Specifically, do not take the user to a contact disambugation interface where they must confirm or reselect the contact to share with, since they've already done that by tapping the target in the Android Sharesheet. For example, in a messaging app, tapping a Direct Share target should take the user to a conversation view with the person they selected. The keyboard should be visible and the message should be prefilled with the shared data.

Receiving data with an activity
-------------------------------

### Update your manifest

Intent filters inform the system what intents an application component is willing to accept. Similar to how you constructed an intent with action `ACTION_SEND` in the Sending Simple Data to Other Apps lesson, you create intent filters in order to be able to receive intents with this action. You define an intent filter in your manifest, using the `<intent-filter>` element. For example, if your application handles receiving text content, a single image of any type, or multiple images of any type, your manifest would look like:

```xml
<activity android:name=".ui.MyActivity" >
    <intent-filter>
        <action android:name="android.intent.action.SEND" />
        <category android:name="android.intent.category.DEFAULT" />
        <data android:mimeType="image/*" />
    </intent-filter>
    <intent-filter>
        <action android:name="android.intent.action.SEND" />
        <category android:name="android.intent.category.DEFAULT" />
        <data android:mimeType="text/plain" />
    </intent-filter>
    <intent-filter>
        <action android:name="android.intent.action.SEND_MULTIPLE" />
        <category android:name="android.intent.category.DEFAULT" />
        <data android:mimeType="image/*" />
    </intent-filter>
</activity>
```

When another application tries to share any of these things by constructing an intent and passing it to `startActivity()`, your application will be listed as an option in the Android Sharesheet or intent resolver. If the user selects your application, the corresponding activity (`.ui.MyActivity` in the example above) will be started. It is then up to you to handle the content appropriately within your code and UI.

> **Note:** For more information on intent filters and intent resolution please read Intents and Intent Filters

### Handle the incoming content

To handle the content delivered by an `Intent`, call `getIntent()` to get the `Intent` object. Once you have the object, you can examine its contents to determine what to do next. Keep in mind that if this activity can be started from other parts of the system, such as the launcher, then you will need to take this into consideration when examining the intent.

Take extra care to check the incoming data, you never know what some other application may send you. For example, the wrong MIME type might be set, or the image being sent might be extremely large. Also, remember to process binary data in a separate thread rather than the main ("UI") thread.

### Kotlin

```kotlin
override fun onCreate(savedInstanceState: Bundle?) {
    ...
    when {
        intent?.action == Intent.ACTION_SEND -> {
            if ("text/plain" == intent.type) {
                handleSendText(intent) // Handle text being sent
            } else if (intent.type?.startsWith("image/") == true) {
                handleSendImage(intent) // Handle single image being sent
            }
        }
        intent?.action == Intent.ACTION_SEND_MULTIPLE
                && intent.type?.startsWith("image/") == true -> {
                handleSendMultipleImages(intent) // Handle multiple images being sent
        }
        else -> {
            // Handle other intents, such as being started from the home screen
        }
    }
    ...
}

private fun handleSendText(intent: Intent) {
    intent.getStringExtra(Intent.EXTRA_TEXT)?.let {
        // Update UI to reflect text being shared
    }
}

private fun handleSendImage(intent: Intent) {
    (intent.getParcelableExtra<Parcelable>(Intent.EXTRA_STREAM) as? Uri)?.let {
        // Update UI to reflect image being shared
    }
}

private fun handleSendMultipleImages(intent: Intent) {
    intent.getParcelableArrayListExtra<Parcelable>(Intent.EXTRA_STREAM)?.let {
        // Update UI to reflect multiple images being shared
    }
}
```

### Java

```java
void onCreate (Bundle savedInstanceState) {
    ...
    // Get intent, action and MIME type
    Intent intent = getIntent();
    String action = intent.getAction();
    String type = intent.getType();

    if (Intent.ACTION_SEND.equals(action) && type != null) {
        if ("text/plain".equals(type)) {
            handleSendText(intent); // Handle text being sent
        } else if (type.startsWith("image/")) {
            handleSendImage(intent); // Handle single image being sent
        }
    } else if (Intent.ACTION_SEND_MULTIPLE.equals(action) && type != null) {
        if (type.startsWith("image/")) {
            handleSendMultipleImages(intent); // Handle multiple images being sent
        }
    } else {
        // Handle other intents, such as being started from the home screen
    }
    ...
}

void handleSendText(Intent intent) {
    String sharedText = intent.getStringExtra(Intent.EXTRA_TEXT);
    if (sharedText != null) {
        // Update UI to reflect text being shared
    }
}

void handleSendImage(Intent intent) {
    Uri imageUri = (Uri) intent.getParcelableExtra(Intent.EXTRA_STREAM);
    if (imageUri != null) {
        // Update UI to reflect image being shared
    }
}

void handleSendMultipleImages(Intent intent) {
    ArrayList<Uri> imageUris = intent.getParcelableArrayListExtra(Intent.EXTRA_STREAM);
    if (imageUris != null) {
        // Update UI to reflect multiple images being shared
    }
}
```

Updating the UI after receiving the data can be as simple as populating an `EditText`, or it can be more complicated like applying an interesting photo filter to an image. It's up to your app what happens next.

### Ensure users recognize your app

Your app is represented by its icon and label in the Android Sharesheet and intent resolver. These are both defined in the manifest. You can set activity or intent filter labels to provide more context.

As of Android 10 (API level 29), the Android Sharesheet will only use icons set in the manifest on your `application` tag. Icons set on `intent-filter` and `activity` tags will be ignored.

Note: The best share targets do not need a label and icon in the associated activity or intent filter. The receiving app's name and icon alone should be enough for users to understand what will happen when sharing.

Direct Share was introducted in Android 6.0 (API level 23) allowing apps to provide `ChooserTarget` objects through a `ChooserTargetService`. Results were retrieved reactively on demand, leading to a slow loading time for targets.

In Android 10 (API level 29), the `ChooserTargetService` Direct Share APIs were replaced with the new Sharing Shortcuts API. Instead of retrieving results reactively on demand, the Sharing Shortcuts API lets apps publish direct share targets in advance. The `ChooserTargetService` Direct Share mechanism will continue to work, but targets provided this way will be ranked lower than any target that uses the Sharing Shortcuts API.

In Android 11 (API level 30), the `ChooserTargetService` service has been deprecated and we strongly encourage developers to migrate to the Sharing Shortcuts API.

ShortcutManagerCompat is an AndroidX API that provides Sharing Shortcuts that is backwards compatible with the old `ChooserTargetService` DirectShare API. This is the preferred way to publish both Sharing Shortcuts and `ChooserTargets`. See the instructions below.

You can only use dynamic shortcuts to publish Direct Share targets. Follow these steps to publish direct share targets using the new API:

1.  Declare share-target elements in an app's XML resource file. For details, see Declare a share target below.
2.  Publish dynamic shortcuts with matching categories to the declared share-targets. Shortcuts can be added, accessed, updated, and removed using the ShortcutManager or ShortcutManagerCompat in AndroidX. Using the compatibility library in AndroidX is the preferred method since it provides backwards compatibility on older Android versions.

### Sharing Shortcuts API

`ShortcutInfo.Builder` includes new and enhanced methods that provide additional info about the share target:

`setCategories()`

This is not a new method, but now categories are also used to filter shortcuts that can handle share intents or actions. See Declare a share target for details. This field is required for shortcuts that are meant to be used as share targets.

`setLongLived()`

Specifies whether or not a shortcut is valid when it has been unpublished or made invisible by the app (as a dynamic or pinned shortcut). If a shortcut is long lived, it can be cached by various system services even after if has been unpublished as a dynamic shortcut.

Making a shortcut long lived can improve its ranking. See Get the best ranking for details.

`setPerson()`, `setPersons()`

Associates one or more `Person` objects with the shortcut. This can be used to better understand user behavior across different apps, and to help potential prediction services in the framework provide better suggestions in a ShareSheet. Adding Person info to a shortcut is optional, but strongly recommended if the share target can be associated with a person. Note that some share targets, such as cloud, cannot be associated with a person.

Including a specific `Person` object with a unique key in a sharing target and related notifications can improve its ranking. See Get the best ranking for details.

For a typical messaging app, a separate shortcut should be published for each contact, and the `Person` field should contain the contact's info. If the target can be associated with multiple people (like a group chat), add multiple `Person` objects to a single share target.

When publishing a shortcut to an individual person please include their full name in `setLongLabel()` and any short name, such as a nickname or a first name, in `setShortLabel()`

For an example of publishing Sharing Shortcuts see the Sharing Shortcuts sample code.

### Get the best ranking

The Android Sharesheet shows a fixed number of Direct Share targets. These suggestions are sorted by rank. You can potentially improve the ranking of your shortcuts by doing the following:

*   Ensure all shortcutIds are unique and never reused for different targets.
*   Ensure the shortcut is long-lived by calling `setLongLived(true)`).
*   Provide a rank that can be used to compare shortcuts from your app in the absence of training data. See `setRank()`. A lower rank means the shortcut is more important.

For a further increase in ranking, we strongly recommend social apps to do all of the above and:

*   Supply relevant `Person` objects with a set key in your shortcut, see `setPerson()`, `setPersons()` and `setKey()`
*   Link your shortcut to relevant notifications from the same person or people, see `setShortcutId().` The shortcutId may be for any shortcut previously published with `setLongLived(true)`.

For the maximum increase in ranking, social apps can do all of the above and:

*   In provided `Person` objects, supply a valid URI to an associated contact on the device, see `setUri()`

Here is an example shortcut with all potential ranking improvements.

### Kotlin

```kotlin
val person = Person.Builder()
  ...
  .setName(fullName)
  .setKey(staticPersonIdentifier)
  .setUri("tel:$phoneNumber") // alternatively "mailto:$email" or CONTENT_LOOKUP_URI
  .build()

val shortcutInfo = ShortcutInfoCompat.Builder(myContext, staticPersonIdentifier)
  ...
  .setShortLabel(firstName)
  .setLongLabel(fullName)
  .setPerson(person)
  .setLongLived(true)
  .setRank(personRank)
  .build()
```

### Java

```java
Person person = Person.Builder()
  ...
  .setName(fullName)
  .setKey(staticPersonIdentifier)
  .setUri("tel:"+phoneNumber) // alternatively "mailto:"+email or CONTENT_LOOKUP_URI
  .build();

ShortcutInfoCompat shortcutInfo = ShortcutInfoCompat.Builder(myContext, staticPersonIdentifier)
  ...
  .setShortLabel(firstName)
  .setLongLabel(fullName)
  .setPerson(person)
  .setLongLived(true)
  .setRank(personRank)
  .build();
```

### Kotlin

```kottlin
val notif = NotificationCompat.Builder(myContext, channelId)
  ...
  .setShortcutId(staticPersonIdentifier)
  .build()
```

### Java

```java
Notification notif = NotificationCompat.Builder(myContext, channelId)
  ...
  .setShortcutId(staticPersonIdentifier)
  .build();
```

### Providing shortcut imagery

To make a Sharing Shortcut, you'll need to add an image via `setIcon()`.

Sharing Shortcuts can appear across system surfaces and might be reshaped. Additionally, some devices running Android versions 7, 8, or 9 (API levels 25, 26, 27, and 28) might display bitmap‑only icons without a background, which dramatically decreases contrast. To ensure your shortcut looks as intended, provide an adaptive bitmap by using `IconCompat.createWithAdaptiveBitmap()`.

Adaptive bitmaps should follow the same guidelines and dimensions set for adaptive icons. The most common way to accomplish this is to scale the intended square bitmap to 72x72dp and center that within a 108x108dp transparent canvas. If your icon includes a transparent regions you need to include a background color, otherwise transparent regions will appear black.

Do not provide imagery masked to a specific shape. For example, prior to Android 10 (API level 29), it was common to provide user avatars for Direct Share `ChooserTarget`s that were masked to a circle. The Android Sharesheet and other system surfaces in Android 10 now shape and theme shortcut imagery. The preferred method to provide Sharing Shortcuts, via ShortcutManagerCompat, will automatically shape backcompat Direct Share `ChooserTarget`s to circles for you.

Share targets must be declared in the app's resource file, similar to static shortcuts definitions. Add share target definitions inside the `<shortcuts>` root element in the resource file, along with other static shortcut definitions. Each `<share-targets>` element contains information about the shared data type, matching categories, and the target class that will handle the share intent. The XML code looks something like this:

```xml
<shortcuts xmlns:android="http://schemas.android.com/apk/res/android">
  <share-target android:targetClass="com.example.android.sharingshortcuts.SendMessageActivity">
    <data android:mimeType="text/plain" />
    <category android:name="com.example.android.sharingshortcuts.category.TEXT_SHARE_TARGET" />
  </share-target>
</shortcuts>
```

The data element in a share target is similar to the data specification in an intent filter. Each share target can have multiple categories, which are only used to match an app's published shortcuts with its share target definitions. Categories can have any arbitrary app-defined values.

In case the user selects the Sharing Shortcut in the Android Sharesheet that matches with the example target-share above, the app will get the following share intent:

```
Action: Intent.ACTION_SEND
ComponentName: {com.example.android.sharingshortcuts /
                com.example.android.sharingshortcuts.SendMessageActivity}
Data: Uri to the shared content
EXTRA_SHORTCUT_ID: <ID of the selected shortcut>
```

If the user opens the share target from the launcher shortcuts, the app will get the intent that was created when adding the sharing shortcut to the ShortcutManagerCompat. Since it's a different intent, `Intent.EXTRA_SHORTCUT_ID` won't be available, and you will have to pass the ID manually if you need it.

### Using AndroidX to provide both Sharing Shortcuts and ChooserTargets

To be able to work with the AndroidX compatibility library, the app’s manifest must contain the meta-data chooser-target-service and intent-filters set. See the current `ChooserTargetService` Direct Share API.

This service is already declared in the compatibility library, so the user does not need to declare the service in the app’s manifest. However, the link from the share activity to the service must be taken into account as a chooser target provider.

In the following example, the implementation of `ChooserTargetService` is `androidx.core.content.pm.ChooserTargetServiceCompat`, which is already defined in AndroidX:

```xml
<activity
    android:name=".SendMessageActivity"
    android:label="@string/app_name"
    android:theme="@style/SharingShortcutsDialogTheme">
    <!-- This activity can respond to Intents of type SEND -->
    <intent-filter>
        <action android:name="android.intent.action.SEND" />
        <category android:name="android.intent.category.DEFAULT" />
        <data android:mimeType="text/plain" />
    </intent-filter>
    <!-- Only needed if you import the sharetarget AndroidX library that
         provides backwards compatibility with the old DirectShare API.
         The activity that receives the Sharing Shortcut intent needs to be
         taken into account with this chooser target provider. -->
    <meta-data
        android:name="android.service.chooser.chooser_target_service"
        android:value="androidx.sharetarget.ChooserTargetServiceCompat" />
</activity>
```

### Sharing Shortcuts FAQ

**What are the main differences between the current Sharing Shortcuts API and the old `ChooserTargetService` Direct Share API?**

The Sharing Shortcuts API uses a push model, versus the pull model used in the old Direct Share API. This makes the process of retrieving direct share targets much faster when preparing the ShareSheet. From the app developer's point of view, when using the new API, the app needs to provide the list of direct share targets ahead of time, and potentially update the list of shortcuts every time the internal state of the app changes (for example, if a new contact is added in a messaging app).

**What happens if I don't migrate to use the Sharing Shortcuts APIs?**

On Android 10 (API level 29) and higher, the Android Sharesheet will put higher priority on share targets which are provided via ShortcutManager using the Sharing Shortcuts API. So your published share targets may get buried under other apps' share targets and potentially never appear when sharing.

**Can I use both `ChooserTargetService` and Sharing Shortcuts DirectShare APIs in my app for backwards compatibility?**

Don't do it! Instead, use the provided support library APIs `ShortcutManagerCompat`. Mixing the two sets of APIs may result in unwanted/unexpected behavior when retrieving the share targets.

**How are published shortcuts for share targets different from launcher shortcuts (the typical usage of shortcuts when long pressing on app icons in launcher)?**

Any shortcuts published for a "share target" purpose, is also a launcher shortcut, and will be shown in the menu when long pressing your app's icon. The maximum shortcut count limit per activity also applies to the total number of shortcuts an app is publishing (share targets and legacy launcher shortcuts combined).

**What is the guidance on the number of sharing shortcuts one should publish.**

The number of sharing shortcuts is constrained to the same limit of dynamic shortcuts available via `getMaxShortcutCountPerActivity(android.content.Context)`. One can publish any number to that limit but must keep in mind that sharing shortcuts can be visible in the app launcher long-press and in the share sheet. Most app launchers on long-press will display a maximum of 4 shortcuts (static and/or dynamic) and the share-sheet also surfaces only 4 sharing shortcuts in portrait mode, 8 in landscape mode. See this FAQ for more details and guidance on sharing shortcuts.