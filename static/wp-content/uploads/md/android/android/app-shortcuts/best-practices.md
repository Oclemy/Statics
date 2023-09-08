# Best practices for shortcuts

When designing and creating your app's shortcuts, follow these guidelines:

**Follow the design guidelines**

To make your app's shortcuts visually consistent with the shortcuts used for system apps, follow the App Shortcuts Design Guidelines.

**Publish only four distinct shortcuts**

Although the API currently supports a combination of up to fifteen static and dynamic shortcuts for your app at any given time, we recommend that you publish only four distinct shortcuts to improve their visual appearance in the launcher.

In addition to displaying shortcuts on the launcher, use the Google Shortcuts Integration Library to display shortcuts on Google surfaces such as Google Assistant. This library supports pushing an unlimited number of dynamic shortcuts. If you are using this library to push a large number of shortcuts, we recommend setting the `rank` of the shortcuts that should appear in supported launchers by calling the `setRank()` method.

**Limit shortcut description length**

Space is limited within the menu that shows your app's shortcuts in the launcher. When possible, limit the length of the "short description" of a shortcut to 10 characters, and limit the length of the "long description" to 25 characters.

For more information about labels for static shortcuts, read Customizing attribute values. For dynamic and pinned shortcuts, read the reference documentation on `setLongLabel()` and `setShortLabel()`.

**Maintain shortcut and action usage history**

For each shortcut that you create, consider the different ways in which a user can accomplish the same task directly within your app. Remember to call `reportShortcutUsed()` in each of these situations so that the launcher maintains an accurate history of how frequently a user performs the actions representing your shortcuts.

**Update shortcuts only when their meaning is retained**

When changing dynamic and pinned shortcuts, call `updateShortcuts()` only when changing the information of a shortcut that has retained its meaning. Otherwise, you should use one of the following methods, depending on the type of shortcut you're recreating:

*   Dynamic shortcuts: `pushDynamicShortcut()`.
*   Pinned shortcuts: `requestPinShortcut()`.

For example, if you created a shortcut for navigating to a supermarket, it would be appropriate to update the shortcut if the name of the supermarket changed but its location stayed the same. If the user started shopping at a different supermarket location, however, it would be better to create a new shortcut.

**Check dynamic shortcuts whenever you launch your app**

Dynamic shortcuts aren't preserved when the user restores their data onto a new device. For this reason, we recommend that you check the number of objects returned by `getDynamicShortcuts()` each time you launch your app and re-publish dynamic shortcuts as needed, as shown in the code snippet in Backup and Restore.