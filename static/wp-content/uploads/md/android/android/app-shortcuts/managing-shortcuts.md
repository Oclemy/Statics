# Manage shortcuts

After creating shortcuts, you may need to manage them over the lifetime of your app. For example, you may want to optimize your app by determining how often your users complete specific actions with your shortcuts. In another case, you might decide to disable a pinned shortcut to prevent your app from performing outdated or missing actions. This guide describes these and several other common ways to manage your shortcuts.

Shortcut behavior
-----------------

The following sections contain general information about shortcut behavior including visibility, display order, and ranks.

### Shortcut visibility

**Important security note:** All shortcut information is stored in credential encrypted storage, so your app cannot access a user's shortcuts until after they've unlocked the device.

Static shortcuts and dynamic shortcuts appear in a supported launcher or assistant when the user performs a specific gesture or voice command. On supported launchers, the gesture is a long-press on the app's launcher icon, but the actual gesture may be different on other launcher apps. With Google Assistant, shortcuts may be displayed within Assistant or launched from a user voice command.

The `LauncherApps` class provides APIs for launcher apps to access shortcuts.

Because pinned shortcuts appear in the launcher itself, they're always visible. A pinned shortcut is removed from the launcher only in the following situations:

*   The user removes it.
*   The app associated with the shortcut is uninstalled.
*   The user clears an app's data by going to **Settings > Apps & notifications**, selecting an app, then pressing **Storage > Clear storage**.

### Shortcut display order

When the launcher displays an app's shortcuts, they should appear in the following order:

1.  **Static shortcuts:** Shortcuts whose `isDeclaredInManifest()` method returns `true`.
2.  **Dynamic shortcuts:** Shortcuts whose `ShortcutInfo.isDynamic()` method returns `true`.

Within each shortcut type (static and dynamic), shortcuts are sorted in order of increasing _rank_ according to `ShortcutInfo.getRank()`. Google Assistant also considers shortcut rank when determining contextual shortcuts to display to users.

Ranks are non-negative, sequential integers. You can update ranks of existing shortcuts when you call `updateShortcuts(Context, List)`, `addDynamicShortcuts(Context, List)`, or `setDynamicShortcuts(Context, List)`.

**Note:** Ranks are auto-adjusted so they're unique for each type of shortcut (static or dynamic). For example, if there are three dynamic shortcuts with ranks 0, 1 and 2, adding another dynamic shortcut with a rank of 1 represents a request to place this shortcut in the second position. In response, the third and fourth shortcuts move closer to the bottom of the shortcut list, with their ranks changing to 2 and 3, respectively.

Manage multiple intents and activities
--------------------------------------

If you want your app to perform multiple operations when your user activates a shortcut, you can configure it to trigger successive activities. You can accomplish this by assigning multiple intents, starting one activity from another, or setting intent flags, depending on the shortcut's type.

### Assign multiple intents

When creating a shortcut with `ShortcutInfoCompat.Builder`, you can use `setIntents()` instead of `setIntent()`. By calling `setIntents()`, you can launch multiple activities within your app when the user selects a shortcut, placing all but the last activity in the list on the back stack. If the user then decides to press the device's back button, they will see another activity in your app instead of returning to the device's launcher.

**Note:** When the user selects a shortcut then presses the back key, your app launches the activity corresponding with the shortcut's second-to-last intent listed in the resource file. This behavior pattern continues upon repeated presses of the back button, until the user clears the back stack that a shortcut created. When the user next presses the back button, the system navigates them back to the launcher.

### Start one activity from another

Static shortcuts **cannot** have custom intent flags. The first intent of a static shortcut will always have `Intent.FLAG_ACTIVITY_NEW_TASK` and `Intent.FLAG_ACTIVITY_CLEAR_TASK` set. This means, when the app is already running, all the existing activities in your app are destroyed when a static shortcut is launched. If this behavior is not desirable, you can use a _trampoline activity_, or an invisible activity that starts another activity in `Activity.onCreate(Bundle)`, then calls `Activity.finish()`:

1.  In the `AndroidManifest.xml` file, the trampoline activity should include the attribute assignment `android:taskAffinity=""`.
2.  In the shortcuts resource file, the intent within the static shortcut should reference the trampoline activity.

For more information about trampoline activities, read Start one activity from another.

### Set intent flags

Dynamic shortcuts can be published with any set of `Intent` flags. Preferably, you'll specify `Intent.FLAG_ACTIVITY_CLEAR_TASK` along with your other flags. Otherwise, if you attempt to start another task while your app is running, the target activity might not appear.

To learn more about tasks and intent flags, read the tasks and back stack guide.

Update shortcuts
----------------

Each app's launcher icon can contain at most `getMaxShortcutCountPerActivity()` number of static and dynamic shortcuts combined. There is no limit to the number of pinned shortcuts that an app can create, though.

When a dynamic shortcut is pinned, even when the publisher removes it as a dynamic shortcut, the pinned shortcut is still visible and launchable. This allows an app to have more than `getMaxShortcutCountPerActivity()` number of shortcuts.

As an example, suppose `getMaxShortcutCountPerActivity()` is four:

1.  A chat app publishes four dynamic shortcuts representing the four most recent conversations (c1, c2, c3, c4).
2.  The user pins all four of the shortcuts.
3.  Later, the user has started three additional conversations (c5, c6, and c7), so the publisher app re-publishes its dynamic shortcuts. The new dynamic shortcut list is: c4, c5, c6, c7.
    
    The app has to remove c1, c2, and c3 because it can't display more than four dynamic shortcuts. However, c1, c2, and c3 are still pinned shortcuts that the user can access and launch.
    
    The user can now access a total of seven shortcuts that link to activities in the publisher app. This is because the total includes both the maximum number of shortcuts and the three pinned shortcuts.
    
4.  The app can use `updateShortcuts(Context, List)` to update _any_ of the existing seven shortcuts. For example, you might update this set of shortcuts when the chat peers' icons have changed.
5.  The `addDynamicShortcuts(Context, List)` and `setDynamicShortcuts(Context, List)` methods can also be used to update existing shortcuts with the same IDs. However, they **cannot** be used for updating non-dynamic, pinned shortcuts because these two methods try to convert the given lists of shortcuts to dynamic shortcuts.

There is no limit to the number of shortcuts that can be pushed for display on assistant apps such as Google Assistant. Use the pushDynamicShortcut()) method of the ShortcutManagerCompat) Jetpack library to create and update shortcuts for use on assistant apps. Also, add the Google Shortcuts Integration library must also be added to your app for dynamic links to be eligible to appear on Google Assistant.

To learn more about our guidelines for app shortcuts, including updating shortcuts, read Best practices.

### Handle system locale changes

Apps should update dynamic and pinned shortcuts when they receive the `Intent.ACTION_LOCALE_CHANGED` broadcast, indicating that the system locale has changed.

Track shortcut usage
--------------------

To determine the situations during which static and dynamic shortcuts should appear, the launcher examines the activation history of shortcuts. For static shortcuts, you can keep track of when users complete specific actions within your app by calling the `reportShortcutUsed()` method and passing it the ID of a shortcut, when **either** of the following events occur:

*   The user selects the shortcut with the given ID.
*   Within the app, the user manually completes the action corresponding to the same shortcut.

Your app tracks usage for dynamic shortcuts by calling the `pushDynamicShortcut()` method and passing it the ID of the shortcut when a relevant event occurs. Pushing dynamic shortcut usage with this method enables assistant apps such as Google Assistant to suggest relevent shortcuts to users. Because the `pushDynamicShortcut()` method reports usage when called, you should not also call the `reportShortcutUsed()` method for the same shortcuts.

**Note:** The Google Shortcuts Integration library is required to enable the dynamic links your app pushes to be eligible to appear on Google surfaces such as Google Assistant. By adding this library to your app, you allow Assistant to ingest your dynamic links and suggest them to users from the Assistant app.

Disable shortcuts
-----------------

Because your app and its users can pin shortcuts to the device's launcher, it's possible that these pinned shortcuts could direct users to actions within your app that are out of date or no longer exist. To manage this situation, you can disable the shortcuts that you don't want users to select by calling `disableShortcuts()`, which removes the specified shortcuts from the static and dynamic shortcuts list and disables any pinned copies of these shortcuts. You can also use an overloaded version) of this method, which accepts a `CharSequence` as a custom error message. That error message then appears when users attempt to launch any disabled shortcut.

**Note:** If you remove some of your app's static shortcuts when you update your app, the system disables these shortcuts automatically.

Rate Limiting
-------------

When using the `setDynamicShortcuts()`, `addDynamicShortcuts()`, or `updateShortcuts()` methods, keep in mind that you might only be able to call these methods a specific number of times in a _background app_, an app with no activities or services currently in the foreground. The limit on the specific number of times you can call these methods is called _rate limiting_. This feature is used to prevent `ShortcutManagerCompat` from over-consuming device resources.

When rate limiting is active, `isRateLimitingActive()` returns true. However, rate limiting is reset during certain events, so even background apps can call `ShortcutManager` methods until the rate limit is reached again. These events include the following:

*   An app comes to the foreground.
*   The system locale changes.
*   The user performs the inline reply action on a notification.

If you encounter rate limiting during development or testing, you can select **Developer Options > Reset ShortcutManager rate-limiting** from the device's settings, or you can enter the following command in `adb`:

$ adb shell cmd shortcut reset-throttling [ --user your-user-id ]

Backup and restore
------------------

You can allow users to perform backup and restore operations on your app when changing devices by including the `android:allowBackup="true"` attribute assignment in your app's manifest file. If you allow backup and restore, keep the following points about app shortcuts in mind:

*   Static shortcuts are re-published automatically, but only after the user re-installs your app on a new device.
*   Dynamic shortcuts aren't backed up, so you must include logic in your app to re-publish them when a user opens your app on a new device.
*   Pinned shortcuts are restored to the device's launcher automatically, but the system doesn't back up icons associated with pinned shortcuts. Therefore, you should save your pinned shortcuts' images in your app so that it's easy to restore them on a new device.

The following code snippet shows how best to restore your app's dynamic shortcuts and how to check whether your app's pinned shortcuts were preserved:

### Kotlin

```kotlin
class MyMainActivity : Activity() {
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        if (ShortcutManagerCompat.dynamicShortcuts.size == 0) {
            // Application restored. Need to re-publish dynamic shortcuts.
            if (ShortcutManagerCompat.pinnedShortcuts.size > 0) {
                // Pinned shortcuts have been restored. Use
                // updateShortcuts() to make sure they contain
                // up-to-date information.
            }

        }
    }
    // ...
}
```

### Java

```java
public class MainActivity extends Activity {
    public void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);

        if (ShortcutManagerCompat.getDynamicShortcuts().size() == 0) {
            // Application restored. Need to re-publish dynamic shortcuts.
            if (ShortcutManagerCompat.getPinnedShortcuts().size() > 0) {
                // Pinned shortcuts have been restored. Use
                // updateShortcuts() to make sure they contain
                // up-to-date information.
            }
        }
    }
    // ...
}
```

