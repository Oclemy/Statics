# Account Transfer API

Users can copy Google accounts and data from an existing Android-powered device to a new Android-powered device using Tap & Go. Use the Account Transfer API to let users also copy credentials for custom accounts implemented using `AbstractAccountAuthenticator` and integrated with `AccountManager`. The system invokes the Account Transfer API from the Tap & Go setup wizard running on the new device. The system also invokes the Account Transfer API to transfer data from an Android phone to a Pixel using a cable.

![The Tap and Go welcome screen.](https://developer.android.com/static/guide/topics/data/images/tap-and-go-1.png) ![The Tap and Go screen to select a data source.](https://developer.android.com/static/guide/topics/data/images/tap-and-go-2.png)

**Figure 1.** The Account Transfer API is invoked from the Tap & Go setup wizard running on a new device.

To add support for transferring custom accounts, integrate the Account Transfer API in your app. Google Play services can then establish a bidirectional encrypted channel between the existing device, also known as the _source device_, and the new device, also known as the _target device_, to transfer account data as illustrated in figure 2. The encrypted channel doesn't rely on being connected to third-party servers to complete the transfer.

Consider the following requirements when integrating the Account Transfer API into your app:

*   The source device must be running Android 4.0.1 (API level 14) or higher.
*   The target device must be running Android 8.0 (API level 26) or higher.
*   Both source and target devices must be running Google Play services version 11.2.0 or higher.
*   You must build your app using Google Play services SDK version 11.2.0 or higher.

![Illustration of account transfer from source to target device.](https://developer.android.com/static/guide/topics/data/images/account-transfer.png)

**Figure 2.** The transfer takes place over an encrypted channel that Google Play services establishes between source and target devices.

Add the Account Transfer API to your project
--------------------------------------------

To use the Account Transfer API in your project, you first need to set up your project with the Google Play services SDK. For detailed instructions on setting up the Google Play services SDK, see Set Up Google Play Services.

If you want to selectively compile the Google Account Transfer API into your app, add the following build rule to the `build.gradle` file inside your application module directory in the `dependencies` block:

### Groovy

```groovy
plugins {
  id 'com.android.application'
}

...

dependencies {
    // VERSION_NUMBER must be equal to or higher than 11.2.0.
    implementation 'com.google.android.gms:play-services-auth:<VERSION_NUMBER>'
}
```

### Kotlin

```kotlin
plugins {
    id("com.android.application")
}

...

dependencies {
    // VERSION_NUMBER must be equal to or higher than 11.2.0.
    implementation("com.google.android.gms:play-services-auth:<VERSION_NUMBER>")
}
```

To add support for transferring custom accounts, you must declare the `START_ACCOUNT_EXPORT` broadcast receiver for your authenticator service in your app's manifest:

```xml
    <receiver android:name=".MyBroadcastReceiver"  android:exported="true">
        <intent-filter>
            <action android:name="com.google.android.gms.auth.START_ACCOUNT_EXPORT"/>
            ...
        </intent-filter>
    </receiver>
```

If your app is not installed in an OEM system image and you don't plan to put your app in an OEM system image in the future, make sure you register to listen for the `ACTION_START_ACCOUNT_EXPORT` broadcast on the source device to export account data as described above.

If you install your app on an OEM system image, you must also register for the following broadcasts:

*   On the source device, register to listen for the `ACTION_ACCOUNT_EXPORT_DATA_AVAILABLE` broadcast.
*   On the target device, register to listen for the `ACTION_ACCOUNT_IMPORT_DATA_AVAILABLE` broadcast.

Transfer the account data
-------------------------

After a user chooses to restore content from their existing device, the system sends the `ACTION_START_ACCOUNT_EXPORT` broadcast to the packages associated with the relevant accounts on the source device.

### Send the account data

To send account data, start an authenticator service on the source device and call `sendData()`) after the service receives the `ACTION_START_ACCOUNT_EXPORT` broadcast. You can get a reference to an `AccountTransferClient` object by calling either `getAccountTransferClient(Context)`) or `getAccountTransferClient(Activity)`). The following code snippet illustrates how you can send data from the source device:

### Kotlin

```kotlin
val client: AccountTransferClient = AccountTransfer.getAccountTransferClient(this)
val exportTask: Task<Void> = client.sendData(ACCOUNT_TYPE, transferBytes)
try {
    // Wait for the task to either complete or provide the callback.
    Tasks.await(exportTask, TIMEOUT_API, TIME_UNIT)
} catch (e: Exception) {
    when(e) {
        is ExecutionException, is InterruptedException, is TimeoutException -> {
            client.notifyCompletion(ACCOUNT_TYPE,
                    AuthenticatorTransferCompletionStatus.COMPLETED_FAILURE)
            return
        }
        else -> throw e
    }
}
```

### Java

```java
AccountTransferClient client = AccountTransfer.getAccountTransferClient(this);
Task<Void> exportTask = client.sendData(ACCOUNT_TYPE, transferBytes);
try {
  // Wait for the task to either complete or provide the callback.
  Tasks.await(exportTask, TIMEOUT_API, TIME_UNIT);
} catch (ExecutionException | InterruptedException | TimeoutException e) {
  client.notifyCompletion(ACCOUNT_TYPE,AuthenticatorTransferCompletionStatus.COMPLETED_FAILURE);
  return;
}
```

The setup wizard on the target device receives the account data.

### Receive the account data

If the same authenticator service is installed on this device and has registered its interest by listening for the `ACTION_ACCOUNT_IMPORT_DATA_AVAILABLE` broadcast, the target device sends the `ACTION_ACCOUNT_IMPORT_DATA_AVAILABLE` broadcast to the corresponding packages.

On receiving the `ACTION_ACCOUNT_IMPORT_DATA_AVAILABLE` broadcast, start a service and call `retrieveData()`) on the target device to retrieve the data sent from the source device. The following code snippet illustrates how you can retrieve data on the target device:

### Kotlin

```kotlin
val client: AccountTransferClient = AccountTransfer.getAccountTransferClient(this)
val transportTask: Task<Void> = client.retrieveData(ACCOUNT_TYPE)
try {
    val transferBytes: ByteArray = Tasks.await(transferTask, TIMEOUT_API, TIME_UNIT)
    // Add the transferred account(s) to AccountManager to register it with the framework.
} catch (e: Exception) {
    when(e) {
        is ExecutionException, is InterruptedException, is TimeoutException -> {
            client.notifyCompletion(ACCOUNT_TYPE,
                    AuthenticatorTransferCompletionStatus.COMPLETED_FAILURE)
            return
        }
        else -> throw e
    }
 }
client.notifyCompletion(ACCOUNT_TYPE, AuthenticatorTransferCompletionStatus.COMPLETED_SUCCESS)
```

### Java

```java
AccountTransferClient client = AccountTransfer.getAccountTransferClient(this);
Task<Void> transferTask = client.retrieveData(ACCOUNT_TYPE);
try {
  byte[] transferBytes = Tasks.await(transferTask, TIMEOUT_API, TIME_UNIT);
  // Add the transferred account(s) to AccountManager to register it with the framework.
} catch (ExecutionException | InterruptedException | TimeoutException e) {
  client.notifyCompletion(ACCOUNT_TYPE, AuthenticatorTransferCompletionStatus.COMPLETED_FAILURE);
  return;
}
client.notifyCompletion(ACCOUNT_TYPE, AuthenticatorTransferCompletionStatus.COMPLETED_SUCCESS);
```

### Finish the transfer

If necessary, the authenticator service on the target device can also transfer data back to the source device by calling `sendData()`).

To receive data on the source device, your authenticator service must listen for the `ACTION_ACCOUNT_EXPORT_DATA_AVAILABLE` broadcast. Similarly, your authenticator service on the source device can send further messages to the target device.

When the transfer finishes, your authenticator service must call `notifyCompletion()`) with the appropriate completion status.

If you require further security, you can introduce a user-facing challenge on either the source or target device. First, you must check whether challenges can be shown by calling `getDeviceMetaData()`) and inspecting the result. If the authenticator service on the target device supports challenges, you can call `showUserChallenge()`) to display the challenge.

If the required authenticator service is not installed on the target device at the time of transfer, the system stores the transferred data in temporary local storage. When the app is first installed and opened, it can call `retrieveData()`) to check whether there is any data available in temporary local storage. If there is any available data, the Account Transfer API returns the data; otherwise the call fails. If no data is available in temporary local storage, any further attempts to retrieve data may fail. Don't call `notifyCompletion()`) as it may fail.

![Illustration of the target device storing the transferred data in
     temporary local storage.](https://developer.android.com/static/guide/topics/data/images/account-transfer-temporary.png)

**Figure 3.** If the required authenticator service is not installed on the target device, the system stores the transferred data in temporary local storage.

Test the account transfer
-------------------------

The setup wizard runs when you set up a new device. Regularly factory resetting a device to test the setup and transfer of an account would be tiresome and time-consuming. Instead, you can run a subset of the setup wizard flow to test transferring a user's account from one device to another.

Make sure to have at least one custom account on your source device before you begin the test. Also ensure that the target device isn't signed into any custom accounts. If the target device is already signed into a custom account when you run the setup wizard, trying to add the same account fails when the system calls the `AccountManager.addAccountExplicitly()`) method.

For testing purposes, you must use a device running Android 8.0 (API level 26) or higher as the target device.

You can use a device running Android 4.0.1 (API level 14) or higher, as well as Google Play services version 11.2.0 or higher, as the source device. To build the APK that you are testing, you must use Google Play services SDK version 11.2.0 or higher.

To test the setup wizard flow, run the following command on your target device:

```shell
    $ adb shell am start -a android.intent.action.MAIN -n com.google.android.gms/.smartdevice.d2d.ui.TargetActivity
```

The command launches an activity and displays the setup wizard, ready to pair the test device with another one. After the devices establish a connection, you can begin the account transfer process.