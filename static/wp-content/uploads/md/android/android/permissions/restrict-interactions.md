# Restrict interactions with other apps

Permissions aren't only for requesting system functionality. You can also restrict how other apps can interact with your app's components.

This guide explains how to check the set of permissions that another app has declared. The guide also explains how you can configure activities, services, content providers, and broadcast receivers to restrict how other apps can interact with your app.

Check another app's permissions
-------------------------------

To view the set of permissions that another app declares, use a device or emulator to complete the following steps:

1.  Open an app's **App info** screen.
2.  Select **Permissions**. The **App permissions** screen loads.
    
    This screen shows a set of permission groups. The system organizes the set of permissions that an app has declared into these groups.
    

There are a number of other useful ways to check permissions:

*   During a call into a service, pass a permission string into `Context.checkCallingPermission()`). This method returns an integer that indicates whether that permission has been granted to the current calling process. Note that this can only be used when you are executing a call coming in from another process, usually through an IDL interface published from a service or in some other way given to another process.
*   To check whether another process has been granted a particular permission, pass the process (PID) into `Context.checkPermission()`).
*   To check whether another package has been granted a particular permission, pass the package name into `PackageManager.checkPermission()`).

Restrict interactions with your app's activities
------------------------------------------------

Use the `android:permission` attribute to the `<activity>` tag in the manifest to restrict which other apps can start that `Activity`. The permission is checked during `Context.startActivity()` and `Activity.startActivityForResult()`. If the caller doesn't have the required permission, then a `SecurityException` occurs.

Restrict interactions with your app's services
----------------------------------------------

Use the `android:permission` attribute to the `<service>` tag in the manifest to restrict which other apps can start or bind to the associated `Service`. The permission is checked during `Context.startService()`, `Context.stopService()`, and `Context.bindService()`. If the caller doesn't have the required permission, then a `SecurityException` occurs.

Restrict interactions with your app's content providers
-------------------------------------------------------

Use the `android:permission` attribute to the `<provider>` tag to restrict which other apps can access the data in a `ContentProvider`. (Content providers have an important additional security facility available to them called URI permissions, which is described in the following section.) Unlike for the other components, there are two separate permission attributes you can set for content providers: `android:readPermission` restricts which other apps can read from the provider, and `android:writePermission` restricts which other apps can write to it. Note that if a provider is protected with both a read and write permission, holding only the write permission doesn't permit an app to read from a provider.

The permissions are checked when the provider is first retrieved and when an app performs operations on the provider. If the requesting app doesn't have either permission, a `SecurityException` occurs. Using `ContentResolver.query()` requires the read permission; using `ContentResolver.insert()`, `ContentResolver.update()`, or `ContentResolver.delete()` requires the write permission. In all of these cases, not holding the required permission results in a `SecurityException`.

### Give access on a per-URI basis

The system provides you with additional fine-grained control over how other apps can access your app's content providers. In particular, your content provider can protect itself with read and write permissions while still allowing its direct clients to share specific URIs with other apps. To declare your app's support for this model, use the `android:grantUriPermissions` attribute or the `<grant-uri-permission>` element.

You can also grant permissions on a per-URI basis. When starting an activity or returning a result to an activity, set the `Intent.FLAG_GRANT_READ_URI_PERMISSION` intent flag, the `Intent.FLAG_GRANT_WRITE_URI_PERMISSION` intent flag, or both flags. This gives other apps read, write, or read/write permissions, respectively, for the data URI that's included in the intent. Other apps gain these permissions for the specific URI regardless of whether they have permission to access data in the content provider more generally.

For example, suppose that a user is using your app to view an email with an image attachment. Other apps shouldn't be able to access the email contents in general, but they might be interested in viewing the image. Your app can use an intent and the `Intent.FLAG_GRANT_READ_URI_PERMISSION` intent flag to let an image-viewing app see the image.

Another consideration is app visibility. If your app targets Android 11 (API level 30) or higher, the system makes some apps visible to your app automatically and hides other apps by default. If your app has a content provider and has granted URI permissions to another app, your app is automatically visible to that other app.

For more information, view the reference material for the `grantUriPermission()`), `revokeUriPermission()`), and `checkUriPermission()`) methods.

Restrict interactions with your app's broadcast receivers
---------------------------------------------------------

Use the `android:permission` attribute to the `<receiver>` tag to restrict which other apps can send broadcasts to the associated `BroadcastReceiver`. The permission is checked _after_ `Context.sendBroadcast()` returns, as the system tries to deliver the submitted broadcast to the given receiver. This means that a permission failure doesn't result in an exception being thrown back to the caller—it just doesn't deliver the `Intent`.

In the same way, you can supply a permission to `Context.registerReceiver()` to control which other apps can broadcast to a programmatically registered receiver. Going the other way, you can supply a permission when calling `Context.sendBroadcast()` to restrict which broadcast receivers can receive the broadcast.

Note that both a receiver and a broadcaster can require a permission. When this happens, both permission checks must pass for the intent to be delivered to the associated target. For more information, see Restricting broadcasts with permissions.