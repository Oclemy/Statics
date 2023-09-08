# Test backup and restore

This page shows you how to manually trigger backup and restore operations with Auto Backup and Key/Value Backup to ensure your app saves and restores data properly.

How backup works
----------------

The section describes various pieces in the Android backup framework and how they interact with apps that support Auto Backup and Key/Value Backup. During the app development phase, most of the inner working of the framework were abstracted away, so you didn't need to know this information. However, during the testing phase, an understanding of these concepts is important.

The following diagram illustrates how data flows during backup and restore:

![Backup Framework Data Flow](https://developer.android.com/static/guide/topics/data/images/backup-framework.png)

The _Backup Manager Service_ is an Android system service which orchestrates and initiates backup and restore operations. The service is accessible through the `Backup Manager` API. During a backup operation, the service queries your app for backup data, then hands it to the _backup transport_, which then archives the data. During a restore operation, the backup manager service retrieves the backup data from the backup transport and restores the data to the device.

_Backup Transports_ are Android components that are responsible for storing and retrieving backups. An Android device can have zero or more backup transports, but only one of those transports can be marked active. The available backup transports may differ from device to device (due to customizations by device manufacturers and service providers), but most Google Play enabled devices ship with the following transports:

*   **Google Transport** (default) - the active backup transport on most devices, part of Google Mobile Services. This documentation assumes that users are using the Google transport. This transport stores data in the Android Backup Service.
*   **Local Transport** - stores backup data locally on the device. This transport is typically used for development/debugging purposes and is not useful in the real world.

If a device does not have any backup transports, then the data cannot be backed up. Your app is not adversely affected.

Prerequisites
-------------

To test your backup and restore operations, you need to know a bit about the following tools.

*   adb - to run commands on the device or emulator
*   bmgr - to perform various backup and restore operations
*   logcat - to see the output of backup and restore operations

Prepare your device or emulator
-------------------------------

Prepare your device or emulator for backup testing by working through the following checklist:

*   For Auto Backup, check that you are using a device or emulator running Android 6.0 (API level 23) or higher.
*   For Key/Value Backup, check that you are using a device or emulator running Android 2.2 (API level 8) or higher.
*   Check that backup and restore is enabled on the device or emulator and that a Google account has been added. There are two ways to check:
    
    *   Depending on the device version, you can either go to **Settings > Backup & Restore**, or just search **Backup** in the search bar at the top of the screen.
    *   From adb shell, run `bmgr enabled`
    
    On physical devices, backup and restore is typically enabled during the initial setup wizard. Emulators do not run the setup wizard, so don't forget to enable backup and specify a backup account in device settings.
    
*   Make sure the Google Backup Transport is available and active by running the command:
    ```shell
        adb shell bmgr list transports
        
    ```
    Then, check the console for the following output:
    ```shell
        android/com.android.internal.backup.LocalTransport
        * com.google.android.gms/.backup.BackupTransportService
        
    ```

Physical devices without Google Play and emulators without Google APIs might not include the Google Backup Transport. This article assumes you are using the Google Backup Transport. You can test backup and restore with other backup transports, but the procedure and output can differ.

Test the backup
---------------

To initiate a backup of your app, run the following command:

```shell
    adb shell bmgr backupnow <PACKAGE>
```    

The `backupnow` command is available on devices and emulator running Android 7.0 or later. It runs either a Key/Value Backup or Auto Backup depending on the package's manifest declarations. Check logcat to see the output of the backup procedure. For example:

```shell
    D/BackupManagerService: fullTransportBackup()
    I/GmsBackupTransport: Attempt to do full backup on <PACKAGE>
 ```   
    ---- or ----
 ```shell
    V/BackupManagerService: Scheduling immediate backup pass
    D/PerformBackupTask: starting key/value Backup of BackupRequest{pkg=<PACKAGE>}
    
```
If the `backupnow` command is not available on your device, complete the steps below for either Auto Backups or Key/Value Backups.

For Auto Backups, complete the following steps:

1.  Run the following command:
    ```shell
        adb shell bmgr backup @pm@ && adb shell bmgr run
        
    ```
2.  Wait until the command in the previous step finishes by monitoring `adb logcat` for the following output:
    ```shell
        I/BackupManagerService: K/V backup pass finished.
        
    ```
3.  Run the following command to perform a full backup:
    ```shell
        adb shell bmgr fullbackup <PACKAGE>
        
    ```

For Key/Value Backups, schedule and run your backup with the following steps:

1.  If your app hasn't called `BackupManager.dataChanged()`) since the last backup, you can include your app in the backup operation for testing purposes by running the following command:
    ```shell
        adb shell bmgr backup <PACKAGE>
        
    ```
2.  You can then trigger a backup by running the following command:
    ```shell
        adb shell bmgr run
        
    ```

`bmgr backup` adds your app to the Backup Manager's queue. `bmgr run` initiates the backup operation, which forces the Backup Manager to perform all backup requests that are in its queue.

When testing Key/Value Backups, you must verify that every preference change schedules a backup. You can verify that a backup is scheduled using one of the following methods:

*   Run `adb shell dumpsys backup` and check that your app is listed in the output of the command under `Pending key/value backup`.
    
*   Log a message when you schedule a backup. You can then run `adb logcat`, and check the output of the command to verify that a backup was scheduled.
    

Test restore
------------

To manually initiate a restore, run the following command with a backup token (see how to get one below):
```shell
    adb shell bmgr restore <TOKEN> <PACKAGE>
    
```

To look up backup tokens, run `adb shell dumpsys backup`. The token is the hexidecimal string following the labels `Ancestral:` and `Current:`. The _ancestral_ token refers to the backup dataset that was used to restore the device when it was initially setup (with the device-setup wizard). The _current_ token refers to the device's current backup dataset (the dataset that the device is currently sending its backup data to).

Then, check logcat to see the output of the restore procedure. For example:

```shel
    V/BackupManagerService: beginRestoreSession: pkg=<PACKAGE> transport=null
    V/RestoreSession: restorePackage pkg=<PACKAGE> token=368abb4465c5c683
    ...
    I/BackupManagerService: Restore complete.
    
```

You can test automatic restore for your app by uninstalling and reinstalling your app either with `adb` or through the Google Play Store app.

Troubleshooting
---------------

This section helps you troubleshoot some common issues.

**Transport quota exceeded**

If you see the following messages in logcat:

```shell
    I/PFTBT: Transport rejected backup of <PACKAGE>, skipping
```
    --- or ---
```shell 
    I/PFTBT: Transport quota exceeded for package: <PACKAGE>
    
```

Your app has exceeded the quota. Reduce the amount of backup data and try again. For example, verify that you are caching data only in the cache directory of your app. The cache directory isn't included in backups.

**Full backup not possible**

If you see the following message in logcat:

```shell
    I/BackupManagerService: Full backup not currently possible -- key/value backup not yet run?
    
```

The fullbackup operation failed because no Key/Value Backup operation has yet occurred on the device. Trigger a Key/Value Backup with the command `bmgr run` and then try again.

**Timeout waiting for agent**

If you see the following message in logcat:

```shell
    12-05 18:59:02.033  1910  2251 D BackupManagerService:
        awaiting agent for ApplicationInfo{5c7cde0 com.your.app.package}
    12-05 18:59:12.117  1910  2251 W BackupManagerService:
        Timeout waiting for agent ApplicationInfo{5c7cde0 com.your.app.package}
    12-05 18:59:12.117  1910  2251 W BackupManagerService:
        Can't find backup agent for com.your.app.package
    
```

Your app is taking more than 10 seconds to launch for backup. Notice the timestamp difference in the log output. This error typically occurs when your app makes use of a multidex configuration without ProGuard.

**Uninitialized backup account**

If you see the following messages in logcat:

```shell
    01-31 14:32:45.698 17280 17292 I Backup: [GmsBackupTransport] Try to backup for an uninitialized backup account.
    01-31 14:32:45.699  1043 18255 W PFTBT: Transport failed; aborting backup: -1001
    01-31 14:32:45.699  1043 18255 I PFTBT: Full backup completed with status: -1000
    
```

The backup was aborted because the backup dataset was not initialized. Run the backup manager with the command `adb shell bmgr run` and then try to perform the backup again.

**App methods not called**

Because Auto Backup launches your app with a base class of `Application`, your app's set-up methods might not be called. Auto Backup doesn't launch any of your app's activities either, so you might see errors if your app does setup in an activity. To learn more, read Implement BackupAgent.

In contrast, Key/Value Backup does launch your app with any `Application` subclass you declare in your app manifest file.

**No data to back up**

If you see one of the following messages in logcat:

```shell
    I Backup  : [FullBackupSession] Package com.your.app.package doesn't have any backup data.
```
    --- or ---
shell 
    I Backup  : [D2dTransport] Package com.your.app.package doesn't have any backup data.
```

Your app has no data to back up. If you've implemented your own BackupAgent, this likely means you have not added any data or files to the backup.