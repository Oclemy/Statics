# Data backup overview

Users often invest significant time and effort creating an identity, adding data, and customizing settings and preferences within your app. Preserving this data and personalization for users when they upgrade to a new device or re-install your app is an important part of ensuring a great user experience. This page describes what data you should back up and the backup options available to you.

Select which data to back up
----------------------------

**Figure 1.** Make sure you restore identity, app data, and settings data for users returning to your app.

Users generate a lot of data when using your apps and you should take care to back up the appropriate data. Only backing up some of the data can frustrate users when they open the app on a new device and discover something missing. The important data to back up for your users is their identity data, user-generated app data, and settings data, as described below.

### Identity data

You can help maintain existing user engagement by transferring the user's account when they get started with a new device.

For details on transferring account (login) credentials, refer to Block Store.

To explore Google sign-in solutions to facilitate user login to your app, refer to Google Identity.

### App data

App data may include user-generated content, such as text, images, and other media. For restoring app data, see Transfer data using sync adapters or Google Drive Android API. You can use either approach to synchronize app data between Android-powered devices and save data which you'd like to use during the normal app lifecycle. You can also use either approach to restore a returning user's data onto a new device.

### Settings data

Make sure you also back up and restore settings data to preserve a returning user's personalized preferences on a new device. You can restore settings data even if a user doesn't log in to your app. You can back up settings that a user explicitly sets in your app's UI, as well as transparent data, such as a flag indicating whether a user has seen a setup wizard.

To preserve as much of an existing user's experience on a new device as possible, make sure you back up the following user settings:

*   Any settings modified by the user, for example when using the Jetpack Preference library.
    
*   Whether the user has turned notification and ringtones on or off.
    
*   Boolean flags which indicate if the user has seen welcome screens or introductory tooltips.
    

![Transfer of settings from one mobile device to another.](https://developer.android.com/static/guide/topics/data/images/restore-settings.png)

**Figure 2.** Restoring settings on new devices ensures a great user experience.

One type of settings data you should avoid backing up is URIs because they can be unstable. In some cases a restoration to a new mobile device may result in an invalid URI that does not point to a valid file. One example of this is using URIs to save a user's ringtone preference. When the user reinstalls the app, the URI might point to no ringtone, or a different ringtone from the one intended. Instead of backing up the URI you can instead back up some metadata about the setting, such as a ringtone title or a hash of the ringtone.

Backup options
--------------

Android provides two ways for apps to back up their data to the cloud: Auto backup for apps and Key/Value Backup. Auto Backup, which is available on Android version 6.0 and higher, preserves data by uploading it to the user's Google Drive account. Auto Backup includes files in most of the directories that are assigned to your app by the system. Auto Backup can store up to 25 MB of file-based data per app. The Key/Value Backup feature (formerly known as the Backup API and the Android Backup Service) preserves settings data in the form of key/value pairs by uploading it to the Android Backup Service.

Generally, we recommend Auto Backup because it's enabled by default and requires no work to implement. Apps that target Android version 6.0 or higher are automatically enabled for Auto Backup. The Auto Backup feature is a file-based approach to backing up app data. While Auto Backup is simple to implement, you may consider using the Key/Value Backup feature if you have more specific needs for backing up data.

The following table describes some of the key differences between Key/Value Backup and Auto Backup:

Category

Key/Value Backup (Android Backup Service)

Android Auto Backup

Supported versions

Android 2.2 (API level 8) and higher.

Android 6.0 (API level 23) and higher.

Participation

Disabled by default. Apps can opt in by declaring a backup agent.

Enabled by default. Apps can opt out by disabling backups.

Implementation

Apps must implement a `BackupAgent`. The backup agent defines what data to back up and how to restore data.

By default, Auto Backup includes almost all of the app's files. You can use XML to include and exclude files. Internally, Auto Backup relies on a backup agent that is bundled into the SDK.

Frequency

Apps must issue a request when there is data that is ready to be backed up. Requests from multiple apps are batched and executed every few hours.

Backups happen automatically roughly once a day.

Transmission

Backup data can be transmitted via Wi-Fi or cellular data.

Backup data is transmitted using Wi-Fi by default, but the device user can turn on mobile-data backups. If the device is never connected to a Wi-Fi network or the user doesn't change their mobile-data backup settings, then Auto Backup never occurs.

Transmission conditions

Define device conditions required for backup in `onBackup()`).

Define device conditions required for backup in XML file (if using the default backup agent).

App shut down

Apps are not shut down during backup.

The system shuts down the app during backup.

Backup storage

Backup data is stored in Android Backup Service and limited to 5MB per app. Google treats this data as personal information in accordance with Google's Privacy Policy.

Backup data is stored in the user's Google Drive limited to 25MB per app. Google treats this data as personal information in accordance with Google's Privacy Policy.

User login

Doesn't require a user to be logged into your app. The user must be logged into the device with a Google account.

Doesn't require a user to be logged into your app. The user must be logged into the device with a Google account.

API

Related API methods are entity-based:

*   `onBackup()`
*   `onRestore()`

Related API methods are file-based:

*   `onFullBackup()`
*   `onRestoreFile()`

Data restore

Data is restored when the app is installed. If needed, you can request a manual restore.

Data is restored when the app is installed. Users can select from a list of backup datasets if multiple datasets are available.

