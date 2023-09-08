# About Android App Bundles

An _Android App Bundle_ is a publishing format that includes all your app’s compiled code and resources, and defers APK generation and signing to Google Play.

Google Play uses your app bundle to generate and serve optimized APKs for each device configuration, so only the code and resources that are needed for a specific device are downloaded to run your app. You no longer have to build, sign, and manage multiple APKs to optimize support for different devices, and users get smaller, more-optimized downloads.

Most app projects won’t require much effort to build app bundles that support serving optimized APKs. For example, if you already organize your app’s code and resources according to established conventions, simply build signed Android App Bundles using Android Studio or using the command line, and upload them to Google Play. Optimized APK serving then becomes an automatic benefit.

When you use the app bundle format to publish your app, you can also optionally take advantage of Play Feature Delivery, which allows you to add _feature modules_ to your app project. These modules contain features and resources that are only included with your app based on conditions that you specify, or are available later at runtime for download Using the Play Core Library.

Game developers who publish their apps with app bundles can use Play Asset Delivery: Google Play’s solution for delivering large amounts of game assets that offers developers flexible delivery methods and high performance.

Watch the following video for an overview of why you should publish your app using Android App Bundles.

Compressed download size restriction
------------------------------------

Publishing with Android App Bundles helps your users to install your app with the smallest downloads possible and increases the **compressed download size limit to 150 MB**. That is, when a user downloads your app, the total size of the compressed APKs required to install your app (for example, the base APK + configuration APKs) must be no more than 150 MB. Any subsequent downloads, such as downloading a feature module (and its configuration APKs) on demand, must also meet this compressed download size restriction. Asset packs do not contribute to this size limit, but they do have other size restrictions.

When you upload your app bundle, if the Play Console finds any of the possible downloads of your app or its on demand features to be more than 150 MB, you get an error.

Keep in mind, **Android App Bundles do not support APK expansion (`*.obb`) files**. So, if you encounter this error when publishing your app bundle, use one of the following resources to reduce compressed APK download sizes:

*   Make sure you enable all configuration APKs by setting `enableSplit = true` for each type of configuration APK. This makes sure that users download only the code and resources they need to run your app on their device.
*   Make sure you shrink your app by removing unused code and resources.
*   Follow best practices to further reduce app size.
*   Consider converting features that are used by only some of your users into feature modules that your app can download later, on demand. Keep in mind, this may require some refactoring of your app, so make sure to first try the other suggestions described above.

Other considerations
--------------------

The following are the currently known issues when building or serving your app with Android App Bundles. If you experience issues that are not described below, please report a bug.

*   Partial installs of sideloaded apps—that is, apps that are not installed using the Google Play Store and are missing one or more required split APKs—fail on all Google-certified devices and devices running Android 10 (API level 29) or higher. When downloading your app through the Google Play Store, Google ensures that all required components of the app are installed.
*   If you use tools that dynamically modify resource tables, APKs generated from app bundles might behave unexpectedly. So, when building an app bundle, it is recommended that you disable such tools.
*   It is currently possible to configure properties in a feature module’s build configuration that conflict with those from the base (or other) modules. For example, you can set `buildTypes.release.debuggable = true` in the base module and set it to `false` in a feature module. Such conflicts might cause build and runtime issues. Keep in mind, by default, feature modules inherit some build configurations from the base module. So, make sure you understand which configurations you should keep, and which ones you should omit, in your feature module build configuration.

