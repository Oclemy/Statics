# App compatibility in Android

For Android, the term _app compatibility_ means that your app runs properly on a specific version of the platform, typically the latest version. With each release, we make integral changes that improve privacy and security, and we implement changes that evolve the overall user experience across the OS. Sometimes these changes can affect your apps, so it’s important to take a look at the behavior changes that are included in each released version, test against them, and publish compatibility updates for your users.

Why app compatibility is important
----------------------------------

App compatibility starts to affect your users immediately when they update to the latest version of Android, whether they’ve purchased a new device or installed an update on their current device. They’re excited to explore the latest version of Android, and they want to experience it with their favorite apps. If their apps don’t work properly, it can cause major issues both for them and for you.

Types of platform behavior changes
----------------------------------

Your app can be affected by two different types of changes when running on a new platform version:

### Changes for all apps

These changes affect all apps that run on that version of Android, regardless of an app's `targetSdkVersion`.

You should test your app's compatibility with these changes proactively during the developer preview and beta releases of each new Android version. Updates to Pixel and other devices start as soon as a new Android version reaches its final release to Android Open Source Project (AOSP), so when you test proactively for these changes, you help ensure that your users can seamlessly transition to the latest Android version on these devices.

### Targeted changes

These changes only affect apps that are targeting that version of Android.

For these changes, you should perform compatibility testing as you prepare to target the latest stable API version , which is currently Android 13 (API level 33). Even if you aren't planning to target a new Android version immediately, addressing these changes can require a significant amount of development, so you should learn about them as early as possible—ideally during the developer preview and beta releases of each new Android version, so you can do preliminary testing and provide feedback.

Compatibility framework tools
-----------------------------

To help you test for compatibility, we include as many of the breaking changes as possible each release in the compatibility framework. Including a change in the compatibility framework makes it toggleable, letting you force-enable or disable the changes individually from developer options or ADB. When using the compatibility framework, you don't need to change your app's `targetSdkVersion` or recompile your app for basic testing.

To learn more, see Test and debug platform behavior changes in your app.

Restrictions on non-SDK interfaces
----------------------------------

As part of our ongoing effort to gradually move developers away from non-SDK APIs, we update the lists of restricted non-SDK interfaces in each Android release. As always, your feedback and requests for public API equivalents are welcome.

