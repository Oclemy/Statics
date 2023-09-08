# App shortcuts overview

As a developer, you can define _shortcuts_ to perform specific actions in your app. These shortcuts can be displayed in a supported launcher or assistant, like Google Assistant, and help your users quickly start common or recommended tasks within your app.

This set of guides teaches you how to create and manage app shortcuts. Additionally, you'll learn some best practices that will improve the effectiveness of your shortcuts.

Shortcut types
--------------

![App shortcuts on Nexus 6P](https://developer.android.com/static/images/guide/topics/ui/shortcuts.png)

**Figure 1.** Using app shortcuts, you can surface key actions and take users deep into your app instantly

Each shortcut references one or more intents, each of which launches a specific action in your app when users select the shortcut. The types of shortcuts that you create for your app depend on the app's key use cases. Examples of actions you can express as shortcuts include the following:

*   Composing a new email in an email app.
*   Navigating users to a particular location in a mapping app.
*   Sending messages to a friend in a communication app.
*   Playing the next episode of a TV show in a media app.
*   Loading the last save point in a gaming app.
*   Ordering a drink in a delivery app with your voice, using spoken commands.

**Note:** Only main activities—activities that handle the `Intent.ACTION_MAIN` action and the `Intent.CATEGORY_LAUNCHER` category—can have shortcuts. If an app has multiple main activities, you need to define the set of shortcuts for each activity.

You can publish the following types of shortcuts for your app:

*   _Static shortcuts_ are defined in a resource file that is packaged into an APK or app bundle.
*   _Dynamic shortcuts_ can be pushed, updated, and removed by your app only at runtime.
*   _Pinned shortcuts_ can be added to supported launchers at runtime, if the user grants permission.
    
    **Note:** Users can also create pinned shortcuts themselves by copying your app's static and dynamic shortcuts onto the launcher.
    

Display shortcuts in assistants using capabilities
--------------------------------------------------

Capabilities in `shortcuts.xml` allow you to declare the types of actions users can take to launch your app and jump directly to performing a specific task. For example, you can allow users to have voice control of your app through Google Assistant by declaring `capability` elements that extend your in-app functionality to Assistant App Actions. For more details, see Add capabilities.

Shortcut limitations
--------------------

Most supported launchers display up to four shortcuts at a time, counting both static and dynamic shortcuts. When pushing dynamic shortcuts for display on Googles surfaces such as Google Assistant, use the Google Shortcuts Integration library to avoid being subjected to the shortcut limit.

If you choose not to use the Google Shortcuts Integration library, your app is limited to pushing up to the maximum number of shortcuts supported by the device at a time. Shortcuts published in this manner only appear within the Android launchers and are not discoverable on Google surfaces such as Assistant.

**Note:** The maximum number of shortcuts a device supports may vary. Use the getMaxShortcutCountPerActivity()) method to determine how many shortcuts a particular device supports.

There is no limit to the number of pinned shortcuts to your app that users can create. Even though your app cannot remove pinned shortcuts, it can still disable them.

**Note:** Although other apps can't access the metadata within your shortcuts, the launcher itself can access this data. Therefore, these metadata should conceal sensitive user information.

To start creating shortcuts for your app, refer to the following pages:

*   Create shortcuts
*   Manage shortcuts
*   Best practices for shortcuts

For more details about operations that can be performed on shortcuts, see the `ShortcutManager` API reference.