# Back up user data with Auto Backup

_Auto Backup for Apps_ automatically backs up a user's data from apps that target and run on Android 6.0 (API level 23) or higher. Android preserves app data by uploading it to the user's Google Drive—where it's protected by the user's Google account credentials. The backup is end-to-end encrypted on devices running Android 9 or higher using the device's pin, pattern, or password. The amount of data is limited to 25MB per user of your app. There's no charge for storing backup data. Your app can customize the backup process or opt out by disabling backups.

For an overview of Android's backup options and guidance about which data you should back up and restore, see the data backup overview.

Files that are backed up
------------------------

By default, Auto Backup includes files in most of the directories that are assigned to your app by the system:

*   Shared preferences files.
    
*   Files saved to your app's internal storage, accessed by `getFilesDir()`) or `getDir(String, int)`).
    
*   Files in the directory returned by `getDatabasePath(String)`), which also includes files created with the `SQLiteOpenHelper` class.
    
*   Files on external storage in the directory returned by `getExternalFilesDir(String)`).
    

Auto Backup excludes files in directories returned by `getCacheDir()`), `getCodeCacheDir()`), and `getNoBackupFilesDir()`). The files saved in these locations are needed only temporarily, and are intentionally excluded from backup operations.

You can configure your app to include and exclude particular files. For more information on this, see the include and exclude files section.

Backup location
---------------

Backup data is stored in a private folder in the user's Google Drive account, limited to 25MB per app. The saved data does not count towards the user's personal Google Drive quota. Only the most recent backup is stored. When a backup is made, the previous backup (if one exists) is deleted. The backup data can't be read by the user or other apps on the device.

Users can see a list of apps that have been backed up in the Google Drive Android app. On an Android-powered device, users can find this list in the Drive app's navigation drawer under **Settings > Backup and reset**.

Backups from each device-setup-lifetime are stored in separate datasets, as shown in the following examples:

*   If the user owns two devices, then a backup dataset exists for each device.
    
*   If the user factory-resets a device and then sets up the device with the same account, the backup is stored in a new dataset. Obsolete datasets are automatically deleted after a period of inactivity.
    

Backup schedule
---------------

Backups occur automatically when all of the following conditions are met:

*   The user has enabled backup on the device. In Android 9, this setting is in **Settings > System > Backup**.
*   At least 24 hours have elapsed since the last backup.
*   The device is idle.
*   The device is connected to a Wi-Fi network (if the device user hasn't opted in to mobile-data backups).

In practice, these conditions occur roughly every night but a device might never back up (for example, if it never connects to a network). To conserve network bandwidth, the upload takes place only if the app data has changed.

During Auto Backup, the system shuts down the app to make sure it is no longer writing to the file system. By default, the backup system ignores apps that are running in the foreground because users would notice their apps being shut down. You can override the default behavior by setting the `android;backupInForeground` attribute to true.

To simplify testing, Android includes tools that let you manually initiate a backup of your app. For more information, see Test backup and restore.

Restore schedule
----------------

Data is restored whenever the app is installed, either from the Play store, during device setup (when the system installs previously installed apps), or from running adb install. The restore operation occurs after the APK is installed, but before the app is available to be launched by the user.

During the initial device setup wizard, the user is shown a list of available backup datasets and is asked which one to restore the data from. Whichever backup dataset is selected becomes the ancestral dataset for the device. The device can restore from either its own backups or the ancestral dataset. The device prioritizes its own backup if backups from both sources are available. If the user didn't go through the device setup wizard, then the device can restore only from its own backups.

To simplify testing, Android includes tools that let you manually initiate a restore of your app. For more information, see Test backup and restore.

Enable and disable backup
-------------------------

Apps that target Android 6.0 (API level 23) or higher automatically participate in Auto Backup. In your app manifest file, set the boolean value `android:allowBackup` to enable or disable backup. The default value is `true` but to make your intentions clear, we recommend explicitly setting the attribute in your manifest as shown below:

```xml
    <manifest ... >
        ...
        <application android:allowBackup="true" ... >
            ...
        </application>
    </manifest>
```

You can disable backups by setting `android:allowBackup` to `false`. You might want to do this if your app can recreate its state through some other mechanism or if your app deals with sensitive information that Android shouldn't back up.

Include and exclude files
-------------------------

By default, the system backs up almost all app data. For more information, see Files that are backed up. This section shows you how to define custom XML rules to control what gets backed up. If your app targets Android 12 (API level 31) or higher, you must specify an additional set of XML backup rules to support the changes to backup restore that were introduced for devices running Android 12 or higher.

### Control backup on Android 11 and lower

Follow the steps in this section to include or exclude files that are backed up on devices running Android 11 (API level 30) or lower.

1.  In `AndroidManifest.xml`, add the `android:fullBackupContent` attribute to the `<application>` element. This attribute points to an XML file that contains backup rules. For example:

```xml 
    <application ...
     android:fullBackupContent="@xml/backup_rules">
    </application>
```

2.  Create an XML file called `@xml/backup_rules` in the `res/xml/` directory. Inside the file, add rules with the `<include>` and `<exclude>` elements. The following sample backs up all shared preferences except `device.xml`:

```xml    
    <?xml version="1.0" encoding="utf-8"?>
    <full-backup-content>
     <include domain="sharedpref" path="."/>
     <exclude domain="sharedpref" path="device.xml"/>
    </full-backup-content>
```

#### Define device conditions required for backup

If your app saves sensitive information on the device, you can specify conditions under which your app's data is included in the user's backup. You can add the following conditions in Android 9 (API level 28) or higher:

*   `clientSideEncryption`: The user's backup is encrypted with a client-side secret. This form of encryption is enabled on devices running Android 9 or higher as long as the user has enabled backup in Android 9 or higher and has set a screen lock (PIN, pattern, or password) for their device.
*   `deviceToDeviceTransfer`: The user is transferring their backup to another device that supports local device-to-device transfer (for example, Google Pixel).

If you've upgraded your development devices to Android 9, you need to disable and then re-enable data backup after upgrading. This is because Android only encrypts backups with a client-side secret after informing users in Settings or the Setup Wizard.

To declare the inclusion conditions, set the `requireFlags` attribute to the desired value or values in your in the `<include>` elements within your set of backup rules:

backup_rules.xml

```xml
<?xml version="1.0" encoding="utf-8"?>
<full-backup-content>
    <!-- App data isn't included in user's backup
         unless client-side encryption is enabled. -->
    <include domain="file" path="."
             requireFlags="clientSideEncryption" />
</full-backup-content>
```

If your app implements a key-value backup system, or if you implement BackupAgent yourself, you can also apply these conditional requirements to your backup logic by performing a bitwise comparison between a `BackupDataOutput` object's set of transport flags and your custom backup agent's `FLAG_CLIENT_SIDE_ENCRYPTION_ENABLED` or `FLAG_DEVICE_TO_DEVICE_TRANSFER` flags.

The following code snippet shows an example use of this method:

### Kotlin

```kotlin
class CustomBackupAgent : BackupAgent() {
    override fun onBackup(oldState: ParcelFileDescriptor?,
            data: BackupDataOutput?, newState: ParcelFileDescriptor?) {
        if (data != null) {
            if ((data.transportFlags and
                    FLAG_CLIENT_SIDE_ENCRYPTION_ENABLED) != 0) {
                // Client-side backup encryption is enabled.
            }

            if ((data.transportFlags and FLAG_DEVICE_TO_DEVICE_TRANSFER) != 0) {
                // Local device-to-device transfer is enabled.
            }
        }
    }

    // Implementation of onRestore() here.
}
```

### Java

```java
public class CustomBackupAgent extends BackupAgent {
    @Override
    public void onBackup(ParcelFileDescriptor oldState, BackupDataOutput data,
            ParcelFileDescriptor newState) throws IOException {
        if ((data.getTransportFlags() &
                FLAG_CLIENT_SIDE_ENCRYPTION_ENABLED) != 0) {
            // Client-side backup encryption is enabled.
        }

        if ((data.getTransportFlags() &
                FLAG_DEVICE_TO_DEVICE_TRANSFER) != 0) {
            // Local device-to-device transfer is enabled.
        }
    }

    // Implementation of onRestore() here.
}
```

### Control backup on Android 12 or higher

If your app targets Android 12 (API level 31) or higher, follow the steps in this section to include or exclude files that are backed up on devices that are running Android 12 or higher.

1.  In `AndroidManifest.xml`, add the `android:dataExtractionRules` attribute to the `<application>` element. This attribute points to an XML file that contains backup rules. For example:

```xml    
    <application ...
     android:dataExtractionRules="backup_rules.xml">
    </application>
```

2.  Create an XML file called `backup_rules.xml` in the `res/xml/` directory. Inside the file, add rules with the `<include>` and `<exclude>` elements. The following sample backs up all shared preferences except `device.xml`:

```xml    
    <?xml version="1.0" encoding="utf-8"?>
    <data-extraction-rules>
     <cloud-backup [disableIfNoEncryptionCapabilities="true|false"]>
       <include domain="sharedpref" path="."/>
       <exclude domain="sharedpref" path="device.xml"/>
     </cloud-backup>
    </data-extraction-rules>
```

### XML config syntax

The XML syntax for the configuration file varies depending on the version of Android that your app is targeting and running on:

#### Android 11 or lower

Use the following XML syntax for the configuration file that controls backup for devices running Android 11 or lower.

```xml
<full-backup-content>
    <include domain=["file" | "database" | "sharedpref" | "external" |
                     "root"] path="string"
    requireFlags=["clientSideEncryption" | "deviceToDeviceTransfer"] />
    <exclude domain=["file" | "database" | "sharedpref" | "external" |
                     "root"] path="string" />
</full-backup-content>
```

#### Android 12 or higher

If your app targets Android 12 (API level 31) or higher, use the following XML syntax for the configuration file that controls backup for devices running Android 12 or higher.

```xml
<data-extraction-rules>
  <cloud-backup [disableIfNoEncryptionCapabilities="true|false"]>
    ...
    <include domain=["file" | "database" | "sharedpref" | "external" |
                        "root"] path="string"/>
    ...
    <exclude domain=["file" | "database" | "sharedpref" | "external" |
                        "root"] path="string"/>
    ...
  </cloud-backup>
  <device-transfer>
    ...
    <include domain=["file" | "database" | "sharedpref" | "external" |
                        "root"] path="string"/>
    ...
    <exclude domain=["file" | "database" | "sharedpref" | "external" |
                        "root"] path="string"/>
    ...
  </device-transfer>
</data-extraction-rules>
```

Each section of the configuration (`<cloud-backup>`, `<device-transfer>`) contains rules that apply only to that particular type of transfer. This separation allows you, for example, to exclude a file or directory from Google Drive backups while still transferring it during device-to-device (D2D) transfers. This may be useful if you have files which would be too large to back up to the cloud, but which can be transferred between devices without issue.

If there are no rules for a particular backup mode, such as if the `<device-transfer>` section is missing, that mode is fully enabled for all content except for `no-backup` and `cache` directories, as described in Files that are backed up.

Your app can set the `disableIfNoEncryptionCapabilities` flag in the `<cloud-backup>` section to make sure the backup happens only if it can be encrypted, such as when the user has a lock screen. Setting this constraint stops backups from being sent to the cloud if the user’s device cannot support encryption, but because D2D transfers aren't sent to the server, they will continue to operate even on devices that don't support encryption.

#### Syntax for include and exclude elements

Inside the `<full-backup-content>`, `<cloud-backup>`, and `<device-transfer>` tags (depending on the device's Android version and your app's `targetSDKVersion`), you can define `<include>` and `<exclude>` elements:

`<include>`

Specifies a file or folder to backup. By default, Auto Backup includes almost all app files. If you specify an `<include>` element, the system no longer includes any files by default and backs up _only the files specified_. To include multiple files, use multiple `<include>` elements.

On Android 11 and lower, this element can also contain the `requireFlags` attribute, which the section describing how to define conditional requirements for backup discusses in more detail.

`<exclude>`

Specifies a file or folder to exclude during backup. Here are some files that are typically excluded from backup:

*   Files that have device specific identifiers, either issued by a server or generated on the device. For example, Firebase Cloud Messaging (FCM) needs to generate a registration token every time a user installs your app on a new device. If the old registration token is restored, the app may behave unexpectedly.
    
*   Files related to app debugging.
    
*   Large files that cause the app to exceed the 25MB backup quota.
    

Each `<include>` and `<exclude>` element must include the following two attributes:

`domain`

Specifies the location of resource. Valid values for this attribute include the following:

*   `root` The directory on the filesystem where all private files belonging to this app are stored.
*   `file` Directories returned by `getFilesDir()`.
*   `database` Directories returned by `getDatabasePath()`. Databases created with `SQLiteOpenHelper` are stored here.
*   `sharedpref` The directory where `SharedPreferences` are stored.
*   `external` The directory returned by `getExternalFilesDir()`.

`path`

Specifies a file or folder to include in or exclude from backup. Note the following:

*   This attribute does not support wildcard or regex syntax.
*   You can reference the current directory using `./`, but you can't reference the parent directory `..` for security reasons.
*   If you specify a directory, then the rule applies to all files in the directory and recursive sub-directories.

Implement BackupAgent
---------------------

Apps that implement Auto Backup do not need to implement a `BackupAgent`. However, you can optionally implement a custom `BackupAgent`. Typically, there are two reasons for doing this:

*   You want to receive notification of backup events, such as `onRestoreFinished()`) and `onQuotaExceeded(long, long)`). These callback methods are executed even if the app is not running.
    
*   You can't easily express the set of files you want to backup with XML rules. In these rare cases, you can implement a BackupAgent that overrides `onFullBackup(FullBackupDataOutput)`) to store what you want. To retain the system's default implementation, call the corresponding method on the superclass with `super.onFullBackup()`.
    

If you implement a BackupAgent, by default the system expects your app to perform key/value backup and restore. To use the file-based Auto Backup instead, set the `android:fullBackupOnly` attribute to `true` in your app's manifest.

During auto backup and restore operations, the system launches the app in a restricted mode to both prevent the app from accessing files that could cause conflicts and let the app execute callback methods in its `BackupAgent`. In this restricted mode, the app's main activity is not automatically launched, its Content Providers are not initialized, and the base-class `Application` is instantiated instead of any subclass declared in the app's manifest.

Your `BackupAgent` must implement the abstract methods `onBackup()`) and `onRestore()`), which are used for key-value backup. If you don't want to perform key-value backup, you can just leave your implementation of those methods blank.

For more information, see Extend BackupAgent.