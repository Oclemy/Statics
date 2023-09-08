# Prevent caller ID spoofing

In Android 11 (API level 30) and higher, the platform supports the STIR/SHAKEN protocols to provide a secure and private method of verifying and communicating a caller's number to a recipient when a call is placed. Android 11 and higher provide support for apps, such as native dialers, call screening, and spam apps, to access the carrier verdict data. This lets apps identify spam calls and inform users before answering a call.

For devices running Android 11 and higher, call screening and spam apps that use the CallScreeningService API can access functionality to screen a call, enhancing user privacy and device performance. Using this API, apps don't need to ask for individual permissions and can get access to additional information that wasn't available through standard permission requests in Android 10 and lower. The data available in this API include:

*   Number of incoming or outgoing call
*   Notification of an incoming call and termination
*   Limited access to the system alert window for in-call and post-call screening information
*   Ability to reject incoming calls
*   Call duration
*   Call disconnect reason
*   STIR/SHAKEN verdict

Implementation
--------------

Dialer apps, call screening apps, and spam apps should adopt the CallScreeningService API. When a user selects the app as their default caller ID and spam app, the app receives access to the `getCallerNumberVerificationStatus()`) method, which surfaces the STIR/SHAKEN verdict from the carrier verification mechanism for the STIR/SHAKEN protocol. This makes robocall detection possible.

Additionally, call screening apps can implement a post-call screen by invoking the `ACTION_POST_CALL` intent action, which starts an activity that allows the user to mark a call as spam or add a number to their list of saved contacts.