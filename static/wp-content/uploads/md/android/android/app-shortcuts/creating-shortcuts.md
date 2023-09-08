# Create shortcuts

Shortcuts deliver specific types of content to your users by helping them quickly access parts of your app.

How you deliver content with shortcuts depends on your use case and whether the shortcut's context is app-driven or user-driven. Although a static shortcut's context doesn't change and a dynamic shortcut's context constantly changes, the context in both cases is driven by your app. In cases where a user chooses how they want your app to deliver content to them, such as with a pinned shortcut, the context is defined by the user. The following scenarios demonstrate a few use cases for each shortcut type:

*   **Static shortcuts are best for apps that link to content using a consistent structure throughout the lifetime of a user's interaction with the app.** Because most launchers can only display four shortcuts at once, static shortcuts are useful for common activities. For example, if the user wants to view their calendar or email in a specific way, using a static shortcut ensures that their experience in performing a routine task is consistent.
*   **Dynamic shortcuts are used for actions in apps that are context-sensitive.** Context-sensitive shortcuts are tailored to the actions users perform in an app. For instance, if you build a game that allows the user to start from their current level on launch, you should update the shortcut frequently. Using a dynamic shortcut allows the shortcut to be updated each time the user clears a level.
*   **Pinned shortcuts are used for specific, user-driven actions.** For example, a user might want to pin a specific website to the launcher. This is beneficial because it allows the user to perform a custom action, like navigating to the website in one step, more quickly than using a default instance of a browser.

Create static shortcuts
-----------------------

Static shortcuts provide links to generic actions within your app, and these actions should remain consistent over the lifetime of your app's current version. Good candidates for static shortcuts include viewing sent messages, setting an alarm, and displaying a user's exercise activity for the day.

To create a static shortcut, complete the following sequence of steps:

1.  In your app's manifest file (`AndroidManifest.xml`), find an activity whose intent filters are set to the `android.intent.action.MAIN` action and the `android.intent.category.LAUNCHER` category.
    
2.  Add a `<meta-data>` element to this activity that references the resource file where the app's shortcuts are defined:

```xml
    <manifest xmlns:android="http://schemas.android.com/apk/res/android"
              package="com.example.myapplication">
      <application ... >
        <activity android:name="Main">
          <intent-filter>
            <action android:name="android.intent.action.MAIN" />
            <category android:name="android.intent.category.LAUNCHER" />
          </intent-filter>
          
          <meta-data android:name="android.app.shortcuts"
                     android:resource="@xml/shortcuts" /> 
        </activity>
      </application>
    </manifest>
```

3.  Create a new resource file: `res/xml/shortcuts.xml`.
    
4.  In this new resource file, add a `<shortcuts>` root element, which contains a list of `<shortcut>` elements. Each `<shortcut>` element contains information about a static shortcut, including its icon, its description labels, and the intents that it launches within the app:

```xml    
    <shortcuts xmlns:android="http://schemas.android.com/apk/res/android">
      <shortcut
        android:shortcutId="compose"
        android:enabled="true"
        android:icon="@drawable/compose_icon"
        android:shortcutShortLabel="@string/compose_shortcut_short_label1"
        android:shortcutLongLabel="@string/compose_shortcut_long_label1"
        android:shortcutDisabledMessage="@string/compose_disabled_message1">
        <intent
          android:action="android.intent.action.VIEW"
          android:targetPackage="com.example.myapplication"
          android:targetClass="com.example.myapplication.ComposeActivity" />
        <!-- If your shortcut is associated with multiple intents, include them
             here. The last intent in the list determines what the user sees when
             they launch this shortcut. -->
        <categories android:name="android.shortcut.conversation" />
        <capability-binding android:key="actions.intent.CREATE_MESSAGE" />
      </shortcut>
      <!-- Specify more shortcuts here. -->
    </shortcuts>
```

### Customize attribute values

The following list includes descriptions for the different attributes within a static shortcut. You must provide a value for `android:shortcutId` and `android:shortcutShortLabel`. All other values are optional.

`android:shortcutId`

A string literal, which represents the shortcut when a `ShortcutManager` object performs operations on it.

**Note:** You cannot set this attribute's value to a resource string, such as `@string/foo`.

`android:shortcutShortLabel`

A concise phrase that describes the shortcut's purpose. When possible, limit the length of the "short description" of a shortcut to 10 characters.

For more information, see `setShortLabel()`.

**Note:** This attribute's value must be a resource string, such as `@string/shortcut_short_label`.

`android:shortcutLongLabel`

An extended phrase that describes the shortcut's purpose. If there's enough space, the launcher displays this value instead of `android:shortcutShortLabel`. When possible, limit the length of the "long description" of a shortcut to 25 characters.

For more information, see `setLongLabel()`.

**Note:** This attribute's value must be a resource string, such as `@string/shortcut_long_label`.

`android:shortcutDisabledMessage`

The message that appears in a supported launcher when the user attempts to launch a disabled shortcut. The message should explain to the user why the shortcut is now disabled. This attribute's value has no effect if `android:enabled` is `true`.

**Note:** This attribute's value must be a resource string, such as `@string/shortcut_disabled_message`.

`android:enabled`

Determines whether the user can interact with the shortcut from a supported launcher. The default value of `android:enabled` is `true`. If you set it to `false`, you should also set a `android:shortcutDisabledMessage` that explains why you've disabled the shortcut. If you don't think you need to provide such a message, it's easiest to remove the shortcut from the XML file entirely.

`android:icon`

The bitmap or adaptive icon that the launcher uses when displaying the shortcut to the user. This value can be either the path to an image or the resource file that contains the image. Use adaptive icons whenever possible to improve performance and consistency.

**Note:** Shortcut icons cannot include tints.

### Configure inner elements

The XML file that lists an app's static shortcuts supports the following elements inside each `<shortcut>` element. You **must** include an `intent` inner element for each static shortcut that you define.

`intent`

The action that the system launches when the user selects the shortcut. This intent must provide a value for the `android:action` attribute.

**Note:** This `intent` element cannot include string resources.

You can provide multiple intents for a single shortcut. See Manage multiple intents and activities, Set an intent, and the `TaskStackBuilder` class reference for details.

`categories`

Provides a grouping for the types of actions that your app's shortcuts perform, such as creating new chat messages.

For a list of supported shortcut categories, see the `ShortcutInfo` class reference.

`capability-binding`

Declares the capability linked with this shortcut.

In this example, the shortcut is linked to a capability declared for `CREATE_MESSAGE`, which is an App Actions built-in intent. This particular capability binding enables users to use spoken commands with Google Assistant to invoke this shortcut.

Create dynamic shortcuts
------------------------

Dynamic shortcuts provide links to specific, context-sensitive actions within your app. These actions can change between uses of your app, and they can change even while your app is running. Good examples of use cases for dynamic shortcuts include calling a specific person, navigating to a specific location, and loading a game from the user's last save point. You can also use dynamic shortcuts to open a conversation.

The `ShortcutManagerCompat` Jetpack library is a helper for the `ShortcutManager` API, which lets you manage dynamic shortcuts in your app. Using `ShortcutManagerCompat` library reduces boilerplate code and ensures your shortcuts work consistently across Android versions. This library is also required for pushing dynamic shortcuts so that they are eligible to appear on Google surfaces, like Assistant, with the Google Shortcuts Integration Library.

The `ShorcutManagerCompat` API allows your app to perform the following operations with dynamic shortcuts:

*   **Push and update:** Use `pushDynamicShortcut()` to publish and update your dynamic shortcuts. If there are already dynamic or pinned shortcuts with the same ID, each mutable shortcut is updated.
*   **Remove:** Remove a set of dynamic shortcuts using `removeDynamicShortcuts()`, or remove all dynamic shortcuts using `removeAllDynamicShortcuts()`.

For more information about performing operations on shortcuts, read Manage shortcuts and the `ShortcutManagerCompat` reference.

An example of creating a dynamic shortcut and associating it with your app appears in the following code snippet:

### Kotlin

```kotlin
val shortcut = ShortcutInfoCompat.Builder(context, "id1")
        .setShortLabel("Website")
        .setLongLabel("Open the website")
        .setIcon(IconCompat.createWithResource(context, R.drawable.icon_website))
        .setIntent(Intent(Intent.ACTION_VIEW,
                Uri.parse("https://www.mysite.example.com/")))
        .build()

ShortcutManagerCompat.pushDynamicShortcut(context, shortcut)
```

### Java

```java
ShortcutInfo shortcut = new ShortcutInfoCompat.Builder(context, "id1")
    .setShortLabel("Website")
    .setLongLabel("Open the website")
    .setIcon(IconCompat.createWithResource(context, R.drawable.icon_website))
    .setIntent(new Intent(Intent.ACTION_VIEW,
                   Uri.parse("https://www.mysite.example.com/")))
    .build();

ShortcutManagerCompat.pushDynamicShortcut(context, shortcut);
```

### Add the Google Shortcuts Integration Library

The Google Shortcuts Integration Library is an optional Jetpack library. It lets you push dynamic shortcuts that can be displayed on both Android surfaces (such as the launcher) and Google surfaces (such as Assistant). Using this library enables your users to easily discover your shortcuts to quickly access specific content or replay actions in your app. For example, a messaging app might push a dynamic shortcut for a contact "Alex" after a user messages that person. After that dynamic shortcut is pushed, if the user asks Assistant, _"Hey Google, message Alex on ExampleApp,"_ Assistant could launch ExampleApp and automatically configure it to send a message to Alex.

Dynamic shortcuts pushed with this library are not subject to the shortcut limits enforced on a per-device basis, enabling your app to push a shortcut every time a user completes an associated action in your app. Pushing frequent shortcuts in this manner enables Google to understand your user's patterns of use and suggest contextually relevant shortcuts to them. For example, Assistant could learn from shortcuts pushed from your fitness-tracking app that a user typically goes for a run each morning and proactively suggest a "start a run" shortcut when the user picks up their phone in the morning.

The Google Shortcuts Integration Library does not offer any addressable functionality itself. Adding this library to your app enables Google surfaces to ingest the shortcuts your app pushes using `ShortcutManagerCompat`.

To use this library in your app, follow these steps:

1.  Update your `gradle.properties` file to support AndroidX libraries:

```groovy    
          
             android.useAndroidX=true
             # Automatically convert third-party libraries to use AndroidX
             android.enableJetifier=true
``` 
          
    
2.  In `app/build.gradle`, add dependencies for the Google Shortcuts Integration Library and `ShortcutManagerCompat`:

```groovy 
          
             dependencies {
               implementation "androidx.core:core:1.6.0"
               implementation 'androidx.core:core-google-shortcuts:1.0.0'
               ...
             }
          
          
```

3.  With the library dependencies added to your Android project, your app can use the `pushDynamicShortcut()` method of `ShortcutManagerCompat` to push dynamic shortcuts that will be eligible for display on the launcher and participating Google surfaces.
    
    **Note:** We recommend using `pushDynamicShortcut` to push dynamic shortcuts using the Google Shortcuts Integration Library. Your app can use other methods to publish shortcuts, but those may fail if they reach the maximum shortcut limit.
    

Create pinned shortcuts
-----------------------

On Android 8.0 (API level 26) and higher, you can create pinned shortcuts. Unlike static and dynamic shortcuts, pinned shortcuts appear in supported launchers as separate icons. Figure 1 shows the distinction between these two types of shortcuts.

**Note:** When you attempt to pin a shortcut onto a supported launcher, the user receives a confirmation dialog asking their permission to pin the shortcut. If the user doesn't allow the shortcut to be pinned, the launcher cancels the request.

![Screenshot showing contrast between app shortcuts
  and pinned shortcuts](https://developer.android.com/static/images/guide/topics/ui/shortcuts/pinned-shortcuts.png)

**Figure 1.** Appearance of app shortcuts and pinned shortcuts

To pin a shortcut to a supported launcher using your app, complete the following sequence of steps:

1.  Use `isRequestPinShortcutSupported()` to verify that the device's default launcher supports in-app pinning of shortcuts.
2.  Create a `ShortcutInfo` object in one of two ways, depending on whether the shortcut already exists:
    
    1.  If the shortcut already exists, create a `ShortcutInfo` object that contains only the existing shortcut's ID. The system finds and pins all other information related to the shortcut automatically.
    2.  If you're pinning a new shortcut, create a `ShortcutInfo` object that contains an ID, an intent, and a short label for the new shortcut.
    
    **Note:** Because the system performs backup and restore on pinned shortcuts automatically, these shortcuts' IDs should contain either stable, constant strings or server-side identifiers, rather than identifiers generated locally that might not make sense on other devices.
    
3.  Attempt to pin the shortcut to the device's launcher by calling `requestPinShortcut()`. During this process, you can pass in a `PendingIntent` object, which notifies your app only when the shortcut is pinned successfully.
    
    **Note:** If the user doesn't allow the shortcut to be pinned to the launcher, your app doesn't receive a callback.
    
    After a shortcut is pinned, your app can update its contents using the `updateShortcuts()` method. For more information, read Update shortcuts.
    

The following code snippet demonstrates how to create a pinned shortcut:

**Note:** Instances of the `ShortcutManager` class must be obtained using `Context.getSystemService(Class)` with the argument `ShortcutManager.class` or `Context.getSystemService(String)` with the argument `Context.SHORTCUT_SERVICE`.

### Kotlin

```kotlin
val shortcutManager = getSystemService(ShortcutManager::class.java)

if (shortcutManager!!.isRequestPinShortcutSupported) {
    // Assumes there's already a shortcut with the ID "my-shortcut".
    // The shortcut must be enabled.
    val pinShortcutInfo = ShortcutInfo.Builder(context, "my-shortcut").build()

    // Create the PendingIntent object only if your app needs to be notified
    // that the user allowed the shortcut to be pinned. Note that, if the
    // pinning operation fails, your app isn't notified. We assume here that the
    // app has implemented a method called createShortcutResultIntent() that
    // returns a broadcast intent.
    val pinnedShortcutCallbackIntent = shortcutManager.createShortcutResultIntent(pinShortcutInfo)

    // Configure the intent so that your app's broadcast receiver gets
    // the callback successfully.For details, see PendingIntent.getBroadcast().
    val successCallback = PendingIntent.getBroadcast(context, /* request code */ 0,
            pinnedShortcutCallbackIntent, /* flags */ 0)

    shortcutManager.requestPinShortcut(pinShortcutInfo,
            successCallback.intentSender)
}
```

### Java

```java
ShortcutManager shortcutManager =
        context.getSystemService(ShortcutManager.class);

if (shortcutManager.isRequestPinShortcutSupported()) {
    // Assumes there's already a shortcut with the ID "my-shortcut".
    // The shortcut must be enabled.
    ShortcutInfo pinShortcutInfo =
            new ShortcutInfo.Builder(context, "my-shortcut").build();

    // Create the PendingIntent object only if your app needs to be notified
    // that the user allowed the shortcut to be pinned. Note that, if the
    // pinning operation fails, your app isn't notified. We assume here that the
    // app has implemented a method called createShortcutResultIntent() that
    // returns a broadcast intent.
    Intent pinnedShortcutCallbackIntent =
            shortcutManager.createShortcutResultIntent(pinShortcutInfo);

    // Configure the intent so that your app's broadcast receiver gets
    // the callback successfully.For details, see PendingIntent.getBroadcast().
    PendingIntent successCallback = PendingIntent.getBroadcast(context, /* request code */ 0,
            pinnedShortcutCallbackIntent, /* flags */ 0);

    shortcutManager.requestPinShortcut(pinShortcutInfo,
            successCallback.getIntentSender());
}
```

> **Note:** See also the support library APIs, `isRequestPinShortcutSupported()` and `requestPinShortcut()`, which work on Android 7.1 (API level 25) and lower. The support library falls back to the deprecated `EXTRA_SHORTCUT_INTENT` extra to attempt the pinning process.

### Create a custom shortcut activity

![The custom dialog activity shows the prompt 'Do you want
     to add the Gmail launcher icon to your home screen?' The custom options are
     'No thanks' and 'Add icon'.](https://developer.android.com/static/images/guide/topics/ui/shortcuts/pinned-shortcuts-dialog.png)

**Figure 2.** Example of a custom app shortcut dialog activity

You can also create a specialized activity that helps users create shortcuts, complete with custom options and a confirmation button. Figure 2 shows an example of this type of activity in the Gmail app.

In your app's manifest file, add `ACTION_CREATE_SHORTCUT` to the activity's `<intent-filter>` element. This declaration sets up the following behavior when the user attempts to create a shortcut:

1.  The system starts your app's specialized activity.
2.  The user sets options for the shortcut.
3.  The user selects the confirmation button.
4.  Your app creates the shortcut using the `createShortcutResultIntent()` method. This method returns an `Intent`, which your app relays back to the previously-executing activity using `setResult()`.
5.  Your app calls `finish()` on the activity used to create the customized shortcut.

Similarly, your app can prompt users to add pinned shortcuts to the home screen after installation or the first time the app is launched. This method is effective because it helps your users create a shortcut as part of their ordinary workflow.

Testing shortcuts
-----------------

To test your app's shortcuts, install your app on a device with a launcher that supports shortcuts. Then, perform the following actions:

*   Long-tap on your app's launcher icon to view the shortcuts that you've defined for your app.
*   Tap and drag a shortcut to pin it to the device's launcher.