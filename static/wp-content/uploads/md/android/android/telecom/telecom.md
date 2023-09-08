# Telecom framework overview

The Android Telecom framework (also known simply as "Telecom") manages audio and video calls on an Android device. This includes SIM-based calls, such as calls that use the telephony framework, and VoIP calls that implement the `ConnectionService` API.

The major components that Telecom manages are `ConnectionService` and `InCallService`.

A `ConnectionService` implementation uses technologies like VoIP to connect calls to other parties. The most common `ConnectionService` implementation on a phone is the telephony `ConnectionService`. It connects carrier calls.

An `InCallService` implementation provides a user interface to calls managed by Telecom and allows the user to control and interact with these calls. The most common implementation of an `InCallService` is the phone app that's bundled with a device.

Telecom acts as a switchboard. It routes calls that `ConnectionService` implementations provide to the calling user interfaces that `InCallService` implementations provide.

You might want to implement the Telecom APIs for the following reasons:

*   To create a replacement for the system phone app.
*   To integrate a calling solution into the Android calling experience.

Create a replacement phone app
------------------------------

To create a replacement for the default phone app on an Android device, implement the `InCallService` API. Your implementation must meet the following requirements:

*   It must not have any calling capability, and must consist solely of the user interface for calling.
*   It must handle all calls that the Telecom framework is aware of, and not make assumptions about the nature of the calls. For example, it must not assume calls are SIM-based telephony calls, nor implement calling restrictions that are based on any one `ConnectionService`, such as enforcement of telephony restrictions for video calls.

For more information, see `InCallService`.

Integrate a calling solution
----------------------------

To integrate your calling solution into Android, you have the following options:

*   **Implement the self-managed ConnectionService API:** This option is ideal for developers of stand-alone calling apps who don't want to show their calls within the default phone app, nor have other calls shown in their user interface.
    
    When you use a self-managed `ConnectionService`, you help your app to interoperate not only with native telephony calling on the device, but also with other stand-alone calling apps that implement this API. The self-managed `ConnectionService` API also manages audio routing and focus. For details, see Build a calling app.
    
*   **Implement the managed ConnectionService API:** This option facilitates development of a calling solution that relies on the existing device phone application to provide the user interface for calls. Examples include a third-party implementation of SIP calling and VoIP calling services. For more details, see `getDefaultDialerPackage()`).
    
    A `ConnectionService` alone provides only the means of connecting calls. It has no associated user interface.
    
*   **Implement both the InCallService and ConnectionService API:** This option is ideal if you want to create your own `ConnectionService`-based calling solution, complete with its own user interface, and also show all other Android calls in the same user interface. When you use this approach, your implementation of `InCallService` mustn't make any assumptions about the sources of the calls it displays. Also, your implementation of `ConnectionService` must continue to work without the default phone app set to your custom `InCallService`.
    

Screen calls
------------

Devices that run Android 10 (API level 29) or higher allow your app to identify calls from numbers that aren't in the user's address book as potential spam calls. Users can choose to have spam calls silently rejected. To provide greater transparency to users when they miss calls, information about these blocked calls is logged in the call log. Using the Android 10 API eliminates the requirement to obtain the `READ_CALL_LOG` permission from the user in order to provide call screening and caller ID functionality.

You use a `CallScreeningService` implementation to screen calls. Call the `onScreenCall()`) function for any new incoming or outgoing calls when the number is not in the user’s contact list. You can check the `Call.Details` object for information about the call. Specifically, the `getCallerNumberVerificationStatus()`) function includes information from the network provider about the other number. If the verification status failed, this is a good indication that the call is from an invalid number or a potential spam call.

### Kotlin

```kotlin
class ScreeningService : CallScreeningService() {
    // This function is called when an ingoing or outgoing call
    // is from a number not in the user's contacts list
    override fun onScreenCall(callDetails: Call.Details) {
        // Can check the direction of the call
        val isIncoming = callDetails.callDirection == Call.Details.DIRECTION_INCOMING

        if (isIncoming) {
            // the handle (e.g. phone number) that the Call is currently connected to
            val handle: Uri = callDetails.handle

            // determine if you want to allow or reject the call
            when (callDetails.callerNumberVerificationStatus) {
                Connection.VERIFICATION_STATUS_FAILED -> {
                    // Network verification failed, likely an invalid/spam call.
                }
                Connection.VERIFICATION_STATUS_PASSED -> {
                    // Network verification passed, likely a valid call.
                }
                else -> {
                    // Network could not perform verification.
                    // This branch matches Connection.VERIFICATION_STATUS_NOT_VERIFIED.
                }
            }
        }
    }
}
```

### Java

```java
class ScreeningService extends CallScreeningService {
    @Override
    public void onScreenCall(@NonNull Call.Details callDetails) {
        boolean isIncoming = callDetails.getCallDirection() == Call.Details.DIRECTION_INCOMING;

        if (isIncoming) {
            Uri handle = callDetails.getHandle();

            switch (callDetails.getCallerNumberVerificationStatus()) {
                case Connection.VERIFICATION_STATUS_FAILED:
                    // Network verification failed, likely an invalid/spam call.
                    break;
                case Connection.VERIFICATION_STATUS_PASSED:
                    // Network verification passed, likely a valid call.
                    break;
                default:
                    // Network could not perform verification.
                    // This branch matches Connection.VERIFICATION_STATUS_NOT_VERIFIED
            }
        }
    }
}
```

Set the `onScreenCall()` function to call `respondToCall()`) to tell the system how to respond to the new call. This function takes a `CallResponse` parameter that you can use to tell the system to block the call, reject it as if the user did, or silence it. You can also tell the system to skip adding this call to the device’s call log altogether.

### Kotlin

```kotlin
// Tell the system how to respond to the incoming call
// and if it should notify the user of the call.
val response = CallResponse.Builder()
    // Sets whether the incoming call should be blocked.
    .setDisallowCall(false)
    // Sets whether the incoming call should be rejected as if the user did so manually.
    .setRejectCall(false)
    // Sets whether ringing should be silenced for the incoming call.
    .setSilenceCall(false)
    // Sets whether the incoming call should not be displayed in the call log.
    .setSkipCallLog(false)
    // Sets whether a missed call notification should not be shown for the incoming call.
    .setSkipNotification(false)
    .build()

// Call this function to provide your screening response.
respondToCall(callDetails, response)
```

### Java

```java
// Tell the system how to respond to the incoming call
// and if it should notify the user of the call.
CallResponse.Builder response = new CallResponse.Builder();
// Sets whether the incoming call should be blocked.
response.setDisallowCall(false);
// Sets whether the incoming call should be rejected as if the user did so manually.
response.setRejectCall(false);
// Sets whether ringing should be silenced for the incoming call.
response.setSilenceCall(false);
// Sets whether the incoming call should not be displayed in the call log.
response.setSkipCallLog(false);
// Sets whether a missed call notification should not be shown for the incoming call.
response.setSkipNotification(false);

// Call this function to provide your screening response.
respondToCall(callDetails, response.build());
```

You must register the `CallScreeningService` implementation in the manifest file with the appropriate intent filter and permission so the system can trigger it correctly.

```xml
    <service
        android:name=".ScreeningService"
        android:permission="android.permission.BIND_SCREENING_SERVICE">
        <intent-filter>
            <action android:name="android.telecom.CallScreeningService" />
        </intent-filter>
    </service>
```

Redirect a call
---------------

Devices that run Android 10 or higher manage call intents differently than devices that run Android 9 or lower. On Android 10 and higher, the `ACTION_NEW_OUTGOING_CALL` broadcast is deprecated and replaced with the `CallRedirectionService` API. The `CallRedirectionService` provides interfaces for you to use to modify outgoing calls made by the Android platform. For example, third-party apps might cancel calls and reroute them over VoIP.

### Kotlin

```kotlin
class RedirectionService : CallRedirectionService() {
    override fun onPlaceCall(
        handle: Uri,
        initialPhoneAccount: PhoneAccountHandle,
        allowInteractiveResponse: Boolean
    ) {
        // Determine if the call should proceed, be redirected, or cancelled.
        val callShouldProceed = true
        val callShouldRedirect = false
        when {
            callShouldProceed -> {
                placeCallUnmodified()
            }
            callShouldRedirect -> {
                // Update the URI to point to a different phone number or modify the
                // PhoneAccountHandle and redirect.
                redirectCall(handle, initialPhoneAccount, true)
            }
            else -> {
                cancelCall()
            }
        }
    }
}
```

### Java

```java
class RedirectionService extends CallRedirectionService {
    @Override
    public void onPlaceCall(
            @NonNull Uri handle,
            @NonNull PhoneAccountHandle initialPhoneAccount,
            boolean allowInteractiveResponse
    ) {
        // Determine if the call should proceed, be redirected, or cancelled.
        // Your app should implement this logic to determine the redirection.
        boolean callShouldProceed = true;
        boolean callShouldRedirect = false;
        if (callShouldProceed) {
            placeCallUnmodified();
        } else if (callShouldRedirect) {
            // Update the URI to point to a different phone number or modify the
            // PhoneAccountHandle and redirect.
            redirectCall(handle, initialPhoneAccount, true);
        } else {
            cancelCall();
        }
    }
}
```

You must register this service in the manifest so the system can start it correctly.

```xml
    <service
        android:name=".RedirectionService"
        android:permission="android.permission.BIND_CALL_REDIRECTION_SERVICE">
        <intent-filter>
            <action android:name="android.telecom.CallRedirectionService"/>
        </intent-filter>
    </service>
```

To use a redirection service, your app must request the call redirection role from the `RoleManager`. This will ask the user if they want to allow your app to handle call redirects. If your app isn't granted this role, your redirection service isn't used.

You should check if your app has this role when the user launches your app so you can request it as needed. You launch an intent created by the `RoleManager`, so ensure you override the `onActivityResult()`) function to handle the user’s selection.

### Kotlin

```kotlin
class MainActivity : AppCompatActivity() {
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_main)

        // Tell the system that you want your app to handle call redirects. This
        // is done by using the RoleManager to register your app to handle redirects.
        if (android.os.Build.VERSION.SDK_INT >= android.os.Build.VERSION_CODES.Q) {
            val roleManager = getSystemService(Context.ROLE_SERVICE) as RoleManager
            // Check if the app needs to register call redirection role.
            val shouldRequestRole = roleManager.isRoleAvailable(RoleManager.ROLE_CALL_REDIRECTION) &&
                    !roleManager.isRoleHeld(RoleManager.ROLE_CALL_REDIRECTION)
            if (shouldRequestRole) {
                val intent = roleManager.createRequestRoleIntent(RoleManager.ROLE_CALL_REDIRECTION)
                startActivityForResult(intent, REDIRECT_ROLE_REQUEST_CODE)
            }
        }
    }

    companion object {
        private const val REDIRECT_ROLE_REQUEST_CODE = 1
    }
}
```

### Java

```java
class MainActivity extends AppCompatActivity {
    private static final int REDIRECT_ROLE_REQUEST_CODE = 0;

    @Override
    protected void onCreate(@Nullable Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);

        // Tell the system that you want your app to handle call redirects. This
        // is done by using the RoleManager to register your app to handle redirects.
        if (android.os.Build.VERSION.SDK_INT >= android.os.Build.VERSION_CODES.Q) {
            RoleManager roleManager = (RoleManager) getSystemService(Context.ROLE_SERVICE);
            // Check if the app needs to register call redirection role.
            boolean shouldRequestRole = roleManager.isRoleAvailable(RoleManager.ROLE_CALL_REDIRECTION) &&
                    !roleManager.isRoleHeld(RoleManager.ROLE_CALL_REDIRECTION);
            if (shouldRequestRole) {
                Intent intent = roleManager.createRequestRoleIntent(RoleManager.ROLE_CALL_REDIRECTION);
                startActivityForResult(intent, REDIRECT_ROLE_REQUEST_CODE);
            }
        }
    }
}
```