# Runtime Permissions Tutorial and Example


_Android Runtime Permissions Tutorial and Examples._

Android has this concept of permission requesting before accessing various device resources.

This helps in protecting the privacy of an Android Device user. So for example you(your apps) have to request permissions to:

1. Access sensitive user data (such as contacts and SMS).
2. Acess certain system features (such as camera and internet).

Depending on the feature, the system might grant the permission automatically or might prompt the user to approve the request.


#### Permission approval

Your apps will have to declare the permissions for certain device features using the `<uses-permission>` tags in the AndroidManifest.xml file.

For example, an app that needs to send SMS messages would have this line in the manifest:

```xml
<manifest
          package="com.example.mysmsapp">

    <uses-permission android_name="android.permission.SEND_SMS"/>

    <application ...>
        ...
    </application>
</manifest>
```

An app that requires to access network must declare a permissio also:

````xml
```xml
<manifest
          package="com.example.myinternetapp">

    <uses-permission android_name="android.permission.INTERNET"/>

    <application ...>
        ...
    </application>
</manifest>
````

#### Protection levels

There are several protection levels for permissions.These levels affect whether runtime permission requests are required.

These levels include:

1. Normal.
2. Signature.
3. Dangerous permissions.

If your app lists normal permissions in its manifest (that is, permissions that don't pose much risk to the user's privacy or the device's operation), the system automatically grants those permissions to your app.

If your app lists dangerous permissions in its manifest (that is, permissions that could potentially affect the user's privacy or the device's normal operation), such as the `SEND_SMS` permission above, the user must explicitly agree to grant those permissions.

##### (a). Normal Permissions

These are required when your app needs to access data or resources outside the app's sandbox, but where there's very little risk to the user's privacy or the operation of other apps. For example, permission to set the time zone is a normal permission.

If an app declares in its manifest that it needs a normal permission, the system automatically grants the app that permission at install time. The system doesn't prompt the user to grant normal permissions, and users cannot revoke these permissions.

Normal permissions include:

1. ACCESS_LOCATION_EXTRA_COMMANDS
2. ACCESS_NETWORK_STATE
3. ACCESS_NOTIFICATION_POLICY
4. ACCESS_WIFI_STATE
5. BLUETOOTH
6. BLUETOOTH_ADMIN
7. BROADCAST_STICKY
8. CHANGE_NETWORK_STATE
9. CHANGE_WIFI_MULTICAST_STATE
10. CHANGE_WIFI_STATE
11. DISABLE_KEYGUARD
12. EXPAND_STATUS_BAR
13. FOREGROUND_SERVICE
14. GET_PACKAGE_SIZE
15. INSTALL_SHORTCUT
16. INTERNET
17. KILL_BACKGROUND_PROCESSES
18. MANAGE_OWN_CALLS
19. MODIFY_AUDIO_SETTINGS
20. NFC
21. READ_SYNC_SETTINGS
22. READ_SYNC_STATS
23. RECEIVE_BOOT_COMPLETED
24. REORDER_TASKS
25. REQUEST_COMPANION_RUN_IN_BACKGROUND
26. REQUEST_COMPANION_USE_DATA_IN_BACKGROUND
27. REQUEST_DELETE_PACKAGES
28. REQUEST_IGNORE_BATTERY_OPTIMIZATIONS
29. SET_ALARM
30. SET_WALLPAPER
31. SET_WALLPAPER_HINTS
32. TRANSMIT_IR
33. USE_FINGERPRINT
34. VIBRATE
35. WAKE_LOCK
36. WRITE_SYNC_SETTINGS

##### (b). Signature permissions

The second type of permission are the `Signature` permission.

These get granted by the system at install time. However this occurs only when the app that attempts to use a permission is signed by the same certificate as the app that defines the permission.

As of `Android 8.1 (API level 27)`, the following permissions that third-party apps can use are classified as `PROTECTION_SIGNATURE`:

1. BIND_ACCESSIBILITY_SERVICE
2. BIND_AUTOFILL_SERVICE
3. BIND_CARRIER_SERVICES
4. BIND_CHOOSER_TARGET_SERVICE
5. BIND_CONDITION_PROVIDER_SERVICE
6. BIND_DEVICE_ADMIN
7. BIND_DREAM_SERVICE
8. BIND_INCALL_SERVICE
9. BIND_INPUT_METHOD
10. BIND_MIDI_DEVICE_SERVICE
11. BIND_NFC_SERVICE
12. BIND_NOTIFICATION_LISTENER_SERVICE
13. BIND_PRINT_SERVICE
14. BIND_SCREENING_SERVICE
15. BIND_TELECOM_CONNECTION_SERVICE
16. BIND_TEXT_SERVICE
17. BIND_TV_INPUT
18. BIND_VISUAL_VOICEMAIL_SERVICE
19. BIND_VOICE_INTERACTION
20. BIND_VPN_SERVICE
21. BIND_VR_LISTENER_SERVICE
22. BIND_WALLPAPER
23. CLEAR_APP_CACHE
24. MANAGE_DOCUMENTS
25. READ_VOICEMAIL
26. REQUEST_INSTALL_PACKAGES
27. SYSTEM_ALERT_WINDOW
28. WRITE_SETTINGS
29. WRITE_VOICEMAIL

##### (c). Dangerous permissions

Permissions are considered to be of dangerous type when you app wants data or resources involving user's private information, or could potentially affect the user's stored data or the operation of other apps.

For example, the ability to read the user's contacts is a dangerous permission. If an app declares that it needs a dangerous permission, the user has to explicitly grant the permission to the app. Until the user approves the permission, your app cannot provide functionality that depends on that permission.

To use a dangerous permission, your app must prompt the user to grant permission at runtime. For more details about how the user is prompted.

| No. | Permission Group | Permissions |
| --- | --- | --- |
| 1. | CALENDAR | READ_CALENDAR , WRITE_CALENDAR |
| 2. | CALL_LOG | READ_CALL_LOG, WRITE_CALL_LOG, PROCESS_OUTGOING_CALLS |
| 3. | CAMERA | CAMERA |
| 4. | CONTACTS | READ_CONTACTS, WRITE_CONTACTS, GET_ACCOUNTS |
| 5. | LOCATION | ACCESS_FINE_LOCATION, ACCESS_COARSE_LOCATION |
| 6. | MICROPHONE | RECORD_AUDIO |
| 7. | PHONE | READ_PHONE_STATE, READ_PHONE_NUMBERS, CALL_PHONE, ANSWER_PHONE_CALLS,ADD_VOICEMAIL , USE_SIP |
| 8. | SENSORS | BODY_SENSORS |
| 9. | SMS | SEND_SMS, RECEIVE_SMS, READ_SMS, RECEIVE_WAP_PUSH, RECEIVE_MMS |
| 10. | STORAGE | READ_EXTERNAL_STORAGE, WRITE_EXTERNAL_STORAGE |

##### (d). Special permissions

However, some permissions don't behave like normal and dangerous permissions. These include the `SYSTEM_ALERT_WINDOW` and `WRITE_SETTINGS` . These are particularly sensitive, so most apps should not use them.

If an app needs one of these permissions, it must declare the permission in the manifest, and send an intent requesting the user's authorization. The system responds to the intent by showing a detailed management screen to the user.

Find more details about permissions [here](https://developer.android.com/training/permissions/requesting).

#### How to Check for permissions

As we have said, dangerous permissions get specified when your app tries to access user's sensitive or private data. So if your app needs a dangerous permission, you must check whether you have that permission every time you perform an operation that requires that permission.

Since `Android 6.0 (API level 23)`, users have the authority to revoke permissions from any app at any time, even if the app targets a lower API level. So even if the app used the camera yesterday, it can't assume it still has that permission today.

Luckily checking for permissions is easy, you do it using the `ContextCompat.checkSelfPermission()` method. For example, this snippet shows how to check if the activity has permission to write to the calendar.

```java
if (ContextCompat.checkSelfPermission(thisActivity, Manifest.permission.WRITE_CALENDAR)
        != PackageManager.PERMISSION_GRANTED) {
    // Permission is not granted
}
```

Then suppose your app has been given the permission, our method will return `PERMISSION_GRANTED`. That means the app can proceed with the operation. One the other hand if the app does not have the permission, the method returns `PERMISSION_DENIED`, and the app has to explicitly ask the user for permission.

#### How to Request the permissions you need

You have to call one of the `requestPermissions()` methods to request for the appropriate permission. Then our app will app pass the permissions it wants and an `integer` request code. This request code is meant to identify our permission request. This method functions asynchronously. It returns right away, and after the user responds to the prompt, the system calls the app's callback method with the results, passing the same request code that the app passed to `requestPermissions()`.

Here's an example:

```java
// Here, thisActivity is the current activity
if (ContextCompat.checkSelfPermission(thisActivity,
        Manifest.permission.READ_CONTACTS)
        != PackageManager.PERMISSION_GRANTED) {

    // Permission is not granted
    // Should we show an explanation?
    if (ActivityCompat.shouldShowRequestPermissionRationale(thisActivity,
            Manifest.permission.READ_CONTACTS)) {
        // Show an explanation to the user *asynchronously* -- don't block
        // this thread waiting for the user's response! After the user
        // sees the explanation, try again to request the permission.
    } else {
        // No explanation needed; request the permission
        ActivityCompat.requestPermissions(thisActivity,
                new String[]{Manifest.permission.READ_CONTACTS},
                MY_PERMISSIONS_REQUEST_READ_CONTACTS);

        // MY_PERMISSIONS_REQUEST_READ_CONTACTS is an
        // app-defined int constant. The callback method gets the
        // result of the request.
    }
} else {
    // Permission has already been granted
}
```

#### Quick Permissions Example

##### 1\. Android Runtime Permission Check and Request

Let's now put together a simple utility or helper class to allow us check and request for permissions in an easy manner. This class can be reused.

```java
import android.app.Activity;
import android.content.Context;
import android.content.Intent;
import android.content.pm.PackageManager;
import android.os.Bundle;
import android.support.annotation.NonNull;
import android.support.v4.app.ActivityCompat;
import android.support.v4.content.ContextCompat;
import android.support.v7.app.AppCompatActivity;

public class PermissionUtils{

    private static final int REQUEST_CODE = 1111;

    private Context context;

    private PermissionCallback callback;

    private PermissionUtils(Context context) {
        this.context = context;
    }

    public static PermissionUtils getInstance(Context context){
        return new PermissionUtils(context);
    }

    public void requestPermission(@NonNull String permission){
        if (ContextCompat.checkSelfPermission(context,permission) == PackageManager.PERMISSION_GRANTED){
            if (callback != null){
                callback.success();
            }
        }else {
            ActivityCompat.requestPermissions((Activity) context,new String[]{permission},REQUEST_CODE);
        }
    }

    public PermissionUtils setCallback(PermissionCallback callback) {
        this.callback = callback;
        return this;
    }

    public interface PermissionCallback{

        int REQUEST_CODE = 1234;

        void success();
        void fail();
    }

}
```

### Full Permission Examples

#### 1\. Request and Check Permission

Let's look at a runtime permission example. We will see how to check and request permissions in a full runnable app.

**MainActivity.java**

This is the main activity. It will be responsible for checking and requesting permission.

````java
```java
package com.example.ankitkumar.permissionrequest;

import android.content.DialogInterface;
import android.content.pm.PackageManager;
import android.os.Build;
import android.support.design.widget.Snackbar;
import android.support.v4.app.ActivityCompat;
import android.support.v4.content.ContextCompat;
import android.support.v7.app.AlertDialog;
import android.support.v7.app.AppCompatActivity;
import android.os.Bundle;
import android.support.v7.widget.Toolbar;
import android.view.View;
import android.widget.Button;

import static android.Manifest.permission.ACCESS_FINE_LOCATION;
import static android.Manifest.permission.CAMERA;

public class MainActivity extends AppCompatActivity implements View.OnClickListener{

    private static final int PERMISSION_REQUEST_CODE = 200;
    private View view;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);
        Toolbar toolbar = (Toolbar) findViewById(R.id.toolbar);
        setSupportActionBar(toolbar);

        Button check_permission = (Button) findViewById(R.id.check_permission);
        Button request_permission = (Button) findViewById(R.id.request_permission);
        check_permission.setOnClickListener(this);
        request_permission.setOnClickListener(this);

    }
    @Override
    public void onClick(View v) {

        view = v;

        int id = v.getId();
        switch (id) {
            case R.id.check_permission:
                if (checkPermission()) {

                    Snackbar.make(view, "Permission already granted.", Snackbar.LENGTH_LONG).show();

                } else {

                    Snackbar.make(view, "Please request permission.", Snackbar.LENGTH_LONG).show();
                }
                break;
            case R.id.request_permission:
                if (!checkPermission()) {

                    requestPermission();

                } else {

                    Snackbar.make(view, "Permission already granted.", Snackbar.LENGTH_LONG).show();

                }
                break;
        }

    }

    private boolean checkPermission() {
        //int result = ContextCompat.checkSelfPermission(getApplicationContext(), ACCESS_FINE_LOCATION);
        int result1 = ContextCompat.checkSelfPermission(getApplicationContext(), CAMERA);

        return result1 == PackageManager.PERMISSION_GRANTED;
    }

    private void requestPermission() {

        ActivityCompat.requestPermissions(this, new String[]{CAMERA}, PERMISSION_REQUEST_CODE);

    }

    @Override
    public void onRequestPermissionsResult(int requestCode, String permissions[], int[] grantResults) {
        switch (requestCode) {
            case PERMISSION_REQUEST_CODE:
                if (grantResults.length > 0) {

                    // boolean locationAccepted = grantResults[0] == PackageManager.PERMISSION_GRANTED;
                    boolean cameraAccepted = grantResults[1] == PackageManager.PERMISSION_GRANTED;

                    if (cameraAccepted)
                        Snackbar.make(view, "Permission Granted, Now you can access camera.", Snackbar.LENGTH_LONG).show();
                    else {

                        Snackbar.make(view, "Permission Denied, You cannot access camera.", Snackbar.LENGTH_LONG).show();

                        if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.M) {
                            if (shouldShowRequestPermissionRationale(ACCESS_FINE_LOCATION)) {
                                showMessageOKCancel("You need to allow access to the permission",
                                        new DialogInterface.OnClickListener() {
                                            @Override
                                            public void onClick(DialogInterface dialog, int which) {
                                                if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.M) {
                                                    requestPermissions(new String[]{ACCESS_FINE_LOCATION, CAMERA},
                                                            PERMISSION_REQUEST_CODE);
                                                }
                                            }
                                        });
                                return;
                            }
                        }

                    }
                }

                break;
        }
    }

    private void showMessageOKCancel(String message, DialogInterface.OnClickListener okListener) {
        new AlertDialog.Builder(MainActivity.this)
                .setMessage(message)
                .setPositiveButton("OK", okListener)
                .setNegativeButton("Cancel", null)
                .create()
                .show();
    }

}
````

**activity_main.xml**

This is the main layout. We will have two buttons: one for checking permission while the other for requesting permission.

We wrap them in the [RelativeLayout](https://camposha.info/android/relativelayout).

```xml
<?xml version="1.0" encoding="utf-8"?>
<RelativeLayout

    android_layout_width="match_parent"
    android_layout_height="match_parent"
    android_paddingBottom="@dimen/activity_vertical_margin"
    android_paddingLeft="@dimen/activity_horizontal_margin"
    android_paddingRight="@dimen/activity_horizontal_margin"
    android_paddingTop="@dimen/activity_vertical_margin"
    app_layout_behavior="@string/appbar_scrolling_view_behavior"
    tools_context="com.example.ankitkumar.permissionrequest.MainActivity"
    >
    <Button
        android_id="@+id/check_permission"
        android_layout_width="match_parent"
        android_layout_centerInParent="true"
        android_layout_height="wrap_content"
        android_text="Check Permission"/>
    <Button
        android_id="@+id/request_permission"
        android_layout_below="@+id/check_permission"
        android_layout_width="match_parent"
        android_layout_height="wrap_content"
        android_text="Request Permission"/>
</RelativeLayout>
```

**Download**

| No. | Location | Link |
| --- | --- | --- |
| 1. | GitHub | [Download](https://github.com/AnkitKumar111/Android_Assignment14.4/tree/master/sample/archive/master.zip) |
| 2. | GitHub | [Browse](https://github.com/AnkitKumar111/Android_Assignment14.4) |
| 2. | GitHub | [Original Creator: @AnkitKumar111](https://github.com/AnkitKumar111) |
