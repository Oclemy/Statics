# Host-based card emulation overview

Many Android-powered devices that offer NFC functionality already support NFC card emulation. In most cases, the card is emulated by a separate chip in the device, called a _secure element_. Many SIM cards provided by wireless carriers also contain a secure element.

Android 4.4 and higher provide an additional method of card emulation that doesn't involve a secure element, called _host-based card emulation_. This allows any Android application to emulate a card and talk directly to the NFC reader. This topic describes how host-based card emulation (HCE) works on Android and how you can develop an app that emulates an NFC card using this technique.

Card emulation with a secure element
------------------------------------

When NFC card emulation is provided using a secure element, the card to be emulated is provisioned into the secure element on the device through an Android application. Then, when the user holds the device over an NFC terminal, the NFC controller in the device routes all data from the reader directly to the secure element. Figure 1 illustrates this concept:

![Diagram with NFC reader going through an NFC controller to retrieve information from a secure element](https://developer.android.com/static/images/nfc/secure-element.png)  
**Figure 1.** NFC card emulation with a secure element.

The secure element itself performs the communication with the NFC terminal, and no Android application is involved in the transaction. After the transaction is complete, an Android application can query the secure element directly for the transaction status and notify the user.

Host-based card emulation
-------------------------

When an NFC card is emulated using host-based card emulation, the data is routed directly to the host CPU instead of being routed to a secure element. Figure 2 illustrates how host-based card emulation works:

![Diagram with NFC reader going through an NFC controller to retrieve information from the CPU](https://developer.android.com/static/images/nfc/host-based-card.png)  
**Figure 2.** NFC card emulation without a secure element.

Supported NFC cards and protocols
---------------------------------

**Figure 3.** Android's HCE protocol stack.

The NFC standards offer support for many different protocols, and there are different types of cards that you can emulate.

Android 4.4 and higher supports several protocols that are common in the market today. Many existing contactless cards are already based on these protocols, such as contactless payment cards. These protocols are also supported by many NFC readers in the market today, including Android NFC devices functioning as readers themselves (see the `IsoDep` class). This allows you to build and deploy an end-to-end NFC solution around HCE using only Android-powered devices.

Specifically, Android 4.4 and higher supports emulating cards that are based on the NFC-Forum ISO-DEP specification (based on ISO/IEC 14443-4) and process Application Protocol Data Units (APDUs) as defined in the ISO/IEC 7816-4 specification. Android mandates emulating ISO-DEP only on top of the Nfc-A (ISO/IEC 14443-3 Type A) technology. Support for Nfc-B (ISO/IEC 14443-4 Type B) technology is optional. Figure 3 illustrates the layering of all of these specifications.

HCE services
------------

The HCE architecture in Android is based around Android `Service` components (known as _HCE services_). One of the key advantages of a service is that it can run in the background without any user interface. This is a natural fit for many HCE applications, like loyalty or transit cards, which the user shouldn't need to launch an app to use. Instead, tapping the device against the NFC reader starts the correct service if it is not already running and executes the transaction in the background. Of course, you are free to launch additional UI (such as user notifications) from your service when appropriate.

### Service selection

When the user taps a device to an NFC reader, the Android system needs to know which HCE service the NFC reader wants to communicate with. The ISO/IEC 7816-4 specification defines a way to select applications, centered around an Application ID (AID). An AID consists of up to 16 bytes. If you are emulating cards for an existing NFC reader infrastructure, the AIDs that those readers look for are typically well-known and publicly registered (for example, the AIDs of payment networks such as Visa and MasterCard).

If you want to deploy new reader infrastructure for your own application, you must register your own AIDs. The registration procedure for AIDs is defined in the ISO/IEC 7816-5 specification. We recommend registering an AID as per 7816-5 if you are deploying a HCE application for Android, because it avoids collisions with other applications.

### AID groups

In some cases, an HCE service may need to register multiple AIDs and be set as the default handler for all of the AIDs in order to implement a certain application. Some AIDs in the group going to another service isn't supported.

A list of AIDs that are kept together is called an AID group. For all AIDs in an AID group, Android guarantees one of the following:

*   All AIDs in the group are routed to this HCE service.
*   No AIDs in the group are routed to this HCE service (for example, because the user preferred another service which requested one or more AIDs in your group as well).

In other words, there is no in-between state, where some AIDs in the group can be routed to one HCE service, and some to another.

### AID groups and categories

You can associate each AID group with a category. This allows Android to group HCE services together by category, and that in turn allows the user to set defaults at the category level instead of the AID level. Avoid mentioning AIDs in any user-facing parts of your application, because they don't mean anything to the average user.

Android 4.4 and higher supports two categories:

*   `CATEGORY_PAYMENT` (covering industry-standard payment apps)
*   `CATEGORY_OTHER` (for all other HCE apps)

Implement an HCE service
------------------------

To emulate an NFC card using host-based card emulation, you need to create a `Service` component that handles the NFC transactions.

### Check for HCE support

Your application can check whether a device supports HCE by checking for the `FEATURE_NFC_HOST_CARD_EMULATION` feature. Use the `<uses-feature>` tag in the manifest of your application to declare that your app uses the HCE feature, and whether it is required for the app to function or not.

### Service implementation

Android 4.4 and higher provides a convenience `Service` class that you can use as a basis for implementing an HCE service: the `HostApduService` class.

The first step is to extend `HostApduService`, as shown in the following code sample:

### Kotlin

```kotlin
class MyHostApduService : HostApduService() {

    override fun processCommandApdu(commandApdu: ByteArray, extras: Bundle?): ByteArray {
       ...
    }

    override fun onDeactivated(reason: Int) {
       ...
    }
}
```

### Java

```java
public class MyHostApduService extends HostApduService {
    @Override
    public byte[] processCommandApdu(byte[] apdu, Bundle extras) {
       ...
    }
    @Override
    public void onDeactivated(int reason) {
       ...
    }
}
```

`HostApduService` declares two abstract methods that you must override and implement. One of those, `processCommandApdu()`), is called whenever a NFC reader sends an Application Protocol Data Unit (APDU) to your service. APDUs are defined in the ISO/IEC 7816-4 specification. APDUs are the application-level packets being exchanged between the NFC reader and your HCE service. That application-level protocol is half-duplex: the NFC reader sends you a command APDU, and it waits for you to send a response APDU in return.

As mentioned previously, Android uses the AID to determine which HCE service the reader wants to talk to. Typically, the first APDU an NFC reader sends to your device is a `SELECT AID` APDU; this APDU contains the AID that the reader wants to talk to. Android extracts that AID from the APDU, resolves it to an HCE service, and then forwards that APDU to the resolved service.

You can send a response APDU by returning the bytes of the response APDU from `processCommandApdu()`. Note that this method is called on the main thread of your application, which you shouldn't block. If you can't compute and return a response APDU immediately, return null. You can then do the necessary work on another thread and use the `sendResponseApdu()`) method defined in the `HostApduService` class to send the response when you are done.

Android keeps forwarding new APDUs from the reader to your service, until either of the following happens:

*   The NFC reader sends another `SELECT AID` APDU, which the OS resolves to a different service.
*   The NFC link between the NFC reader and your device is broken.

In both of these cases, your class's `onDeactivated()`) implementation is called with an argument indicating which of the two happened.

If you are working with existing reader infrastructure, you must implement the existing application-level protocol that the readers expect in your HCE service.

If you are deploying new reader infrastructure which you control as well, you can define your own protocol and APDU sequence. Try to limit the amount of APDUs and the size of the data to exchange: this makes sure that your users only have to hold their device over the NFC reader for a short amount of time. A reasonable upper bound is about 1 KB of data, which can usually be exchanged within 300 ms.

### Service manifest declaration and AID registration

You must declare your service in the manifest as usual, but you must add some additional pieces to the service declaration as well:

1.  To tell the platform that it is a HCE service implementing a `HostApduService` interface, add an intent filter for the `SERVICE_INTERFACE` action to your service declaration.
    
2.  To tell the platform which AIDs groups are requested by this service, include a `SERVICE_META_DATA` `<meta-data>` tag in the declaration of the service, pointing to an XML resource with additional information about the HCE service.
    
3.  Set the `android:exported` attribute to `true`, and require the `android.permission.BIND_NFC_SERVICE` permission in your service declaration. The former ensures that the service can be bound to by external applications. The latter then enforces that only external applications that hold the `android.permission.BIND_NFC_SERVICE` permission can bind to your service. Since `android.permission.BIND_NFC_SERVICE` is a system permission, this effectively enforces that only the Android OS can bind to your service.
    

The following is an example of a `HostApduService` manifest declaration:

```xml
<service android:name=".MyHostApduService" android:exported="true"
         android:permission="android.permission.BIND_NFC_SERVICE">
    <intent-filter>
        <action android:name="android.nfc.cardemulation.action.HOST_APDU_SERVICE"/>
    </intent-filter>
    <meta-data android:name="android.nfc.cardemulation.host_apdu_service"
               android:resource="@xml/apduservice"/>
</service>
```

This meta-data tag points to an `apduservice.xml` file. The following is an example of such a file with a single AID group declaration containing two proprietary AIDs:

```xml
<host-apdu-service xmlns:android="http://schemas.android.com/apk/res/android"
           android:description="@string/servicedesc"
           android:requireDeviceUnlock="false">
    <aid-group android:description="@string/aiddescription"
               android:category="other">
        <aid-filter android:name="F0010203040506"/>
        <aid-filter android:name="F0394148148100"/>
    </aid-group>
</host-apdu-service>
```

The `<host-apdu-service>` tag must contain an `<android:description>` attribute that contains a user-friendly description of the service that you can show in the app UI. You can use the `requireDeviceUnlock` attribute to specify that the device is unlocked before you invoke this service to handle APDUs.

The `<host-apdu-service>` must contain one or more `<aid-group>` tags. Each `<aid-group>` tag is required to do the following:

*   Contain an `android:description` attribute that contains a user-friendly description of the AID group, suitable for display in UI.
*   Have its `android:category` attribute set to indicate the category the AID group belongs to, such as the string constants defined by `CATEGORY_PAYMENT` or `CATEGORY_OTHER`.
*   Contain one or more `<aid-filter>` tags, each of which contains a single AID. Specify the AID in hexadecimal format, and make sure it contains an even number of characters.

Your application also needs to hold the `NFC` permission to register as an HCE service.

AID conflict resolution
-----------------------

Multiple `HostApduService` components may be installed on a single device, and the same AID can be registered by more than one service. Android resolves AID conflicts differently depending on which category an AID belongs to. Each category may have a different conflict resolution policy.

For some categories, such as payment, the user might be able to select a default service in the Android settings UI. For other categories, the policy might be to always ask the user which service to invoke in case of conflict. For information about how to query the conflict resolution policy for a certain category, see `getSelectionModeForCategory()`).

### Check if your service is the default

Applications can check whether their HCE service is the default service for a certain category by using the `isDefaultServiceForCategory()`) API.

If your service isn't the default, you can request it to be made the default using `ACTION_CHANGE_DEFAULT`.

Payment applications
--------------------

Android considers HCE services that have declared an AID group with the _payment_ category as payment applications. Android 4.4 and higher contains a top-level **Settings** menu entry called _tap & pay_, which enumerates all such payment applications. In this settings menu, the user can select the default payment application to invoke when a payment terminal is tapped.

### Required assets for payment applications

To provide a more visually attractive user experience, HCE payment applications are required to provide a service banner.

#### Android 13 and higher

To better fit the default payment selection list in the Settings UI, adjust the banner requirement to a square icon. Ideally, it should be identical to the application launcher icon design. This adjustment creates more consistency and a cleaner look.

#### Android 12 and lower

Set the service banner's size to 260x96 dp, then set the service banner's size in your metadata XML file by adding the `android:apduServiceBanner` attribute to the `<host-apdu-service>` tag, which points to the drawable resource. The following is an example:

```xml
<host-apdu-service xmlns:android="http://schemas.android.com/apk/res/android"
        android:description="@string/servicedesc"
        android:requireDeviceUnlock="false"
        android:apduServiceBanner="@drawable/my_banner">
    <aid-group android:description="@string/aiddescription"
               android:category="payment">
        <aid-filter android:name="F0010203040506"/>
        <aid-filter android:name="F0394148148100"/>
    </aid-group>
</host-apdu-service>
```

Screen off and lock-screen behavior
-----------------------------------

The behavior of HCE services varies based on the version of Android running on the device.

### Android 12 and higher

In apps that target Android 12 (API level 31) and higher, you can enable NFC payments without the device's screen on by setting `requireDeviceScreenOn` to `false`.

### Android 10 and higher

Devices running Android 10 (API level 29) or higher support Secure NFC. While Secure NFC is on, all card emulators (host applications and off-host applications) are unavailable when the device screen is off. While Secure NFC is off, off-host applications are available when the device screen is off. You can check for Secure NFC support using `isSecureNfcSupported()`).

On devices running Android 10 and higher, the same functionality for setting `android:requireDeviceUnlock` to `true` applies as with devices running Android 9 and lower, but only when Secure NFC is turned off. That is, if Secure NFC is turned on, HCE services can't function from the lock-screen regardless of the setting of `android:requireDeviceUnlock`.

### Android 9 and lower

On devices that run Android 9 (API level 28) and lower, the NFC controller and the application processor are turned off completely when the screen of the device is turned off. HCE services therefore don't work when the screen is off.

Also on Android 9 and lower, HCE services can function from the lock screen. However, this is controlled by the `android:requireDeviceUnlock` attribute in the `<host-apdu-service>` tag of your HCE service. By default, device unlock is not required, and your service is invoked even if the device is locked.

If you set the `android:requireDeviceUnlock` attribute to `true` for your HCE service, Android prompts the user to unlock the device when the following happen:

*   the user taps an NFC reader.
*   the NFC reader selects an AID that is resolved to your service.

After unlocking, Android shows a dialog prompting the user to tap again to complete the transaction. This is necessary because the user may have moved the device away from the NFC reader in order to unlock it.

Coexistence with secure element cards
-------------------------------------

This section is of interest for developers who have deployed an application that relies on a secure element for card emulation. Android's HCE implementation is designed to work in parallel with other methods of implementing card emulation, including the use of secure elements.

This coexistence is based on a principle called _AID routing_. The NFC controller keeps a routing table that consists of a (finite) list of routing rules. Each routing rule contains an AID and a destination. The destination can either be the host CPU, where Android apps are running, or a connected secure element.

When the NFC reader sends an APDU with a `SELECT AID`, the NFC controller parses it and checks whether the AIDs match with any AID in its routing table. If it matches, that APDU and all APDUs following it are sent to the destination associated with the AID, until another `SELECT AID` APDU is received or the NFC link is broken.

Figure 4 illustrates this architecture:

  
**Figure 4.** Android operating with both secure element and host-card emulation.

The NFC controller typically also contains a default route for APDUs. When an AID is not found in the routing table, the default route is used. While this setting might be different from device to device, Android devices are required to ensure that the AIDs being registered by your app are properly routed to the host.

Android applications that implement an HCE service or that use a secure element don't have to worry about configuring the routing table; that is handled by Android automatically. Android merely needs to know which AIDs can be handled by HCE services and which ones can be handled by the secure element. The routing table is configured automatically based on which services are installed and which the user has configured as preferred.

The following section explains how to declare AIDs for applications that use a secure element for card emulation.

### Secure element AID registration

Applications using a secure element for card emulation can declare an _off-host service_ in their manifest. The declaration of such a service is almost identical to the declaration of an HCE service. The exceptions are as follows:

*   The action used in the intent filter must be set to `SERVICE_INTERFACE`.
*   The meta-data name attribute must be set to `SERVICE_META_DATA`.
*   The meta-data XML file must use the `<offhost-apdu-service>` root tag.
    
```xml
    <service android:name=".MyOffHostApduService" android:exported="true"
           android:permission="android.permission.BIND_NFC_SERVICE">
      <intent-filter>
          <action android:name="android.nfc.cardemulation.action.OFF_HOST_APDU_SERVICE"/>
      </intent-filter>
      <meta-data android:name="android.nfc.cardemulation.off_host_apdu_service"
                 android:resource="@xml/apduservice"/>
    </service>
```

The following is an example of the corresponding `apduservice.xml` file registering two AIDs:

```xml
<offhost-apdu-service xmlns:android="http://schemas.android.com/apk/res/android"
           android:description="@string/servicedesc">
    <aid-group android:description="@string/subscription" android:category="other">
        <aid-filter android:name="F0010203040506"/>
        <aid-filter android:name="F0394148148100"/>
    </aid-group>
</offhost-apdu-service>
```

The `android:requireDeviceUnlock` attribute doesn't apply to off-host services, because the host CPU is not involved in the transaction and therefore cannot prevent the secure element from executing transactions when the device is locked.

The `android:apduServiceBanner` attribute is required for off-host services that are payment applications and to be selectable as a default payment application.

### Off-host service invocation

Android never starts or binds to a service that is declared as "off-host," because the actual transactions are executed by the secure element and not by the Android service. The service declaration merely allows applications to register AIDs present on the secure element.

HCE and security
----------------

The HCE architecture provides one core piece of security: because your service is protected by the `BIND_NFC_SERVICE` system permission, only the OS can bind to and communicate with your service. This ensures that any APDU you receive is actually an APDU that was received by the OS from the NFC controller, and that any APDU you send back only goes to the OS, which in turn directly forwards the APDUs to the NFC controller.

The last remaining concern is where you get your data that your app sends to the NFC reader. This is intentionally decoupled in the HCE design; it does not care where the data comes from, it just makes sure that it is safely transported to the NFC controller and out to the NFC reader.

For securely storing and retrieving the data that you want to send from your HCE service, you can, for example, rely on the Android Application Sandbox, which isolates your app's data from other apps. For more details about Android security, read Security tips.

Protocol parameters and details
-------------------------------

This section is of interest for developers who want to understand what protocol parameters HCE devices use during the anti-collision and activation phases of the NFC protocols. This allows building a reader infrastructure that is compatible with Android HCE devices.

### Nfc-A (ISO/IEC 14443 type A) protocol anti-collision and activation

As part of the Nfc-A protocol activation, multiple frames are exchanged.

In the first part of the exchange, the HCE device presents its UID; HCE devices should be assumed to have a random UID. This means that on every tap, the UID that is presented to the reader is a randomly generated UID. Because of this, NFC readers should not depend on the UID of HCE devices as a form of authentication or identification.

The NFC reader can subsequently select the HCE device by sending a `SEL_REQ` command. The `SEL_RES` response of the HCE device has at least the 6th bit (0x20) set, indicating that the device supports ISO-DEP. Note that other bits in the `SEL_RES` may be set as well, indicating for example support for the NFC-DEP (p2p) protocol. Since other bits may be set, readers wanting to interact with HCE devices should explicitly check for the 6th bit only, and **not** compare the complete `SEL_RES` with a value of 0x20.

### ISO-DEP activation

After the Nfc-A protocol is activated, the NFC reader initiates the ISO-DEP protocol activation. It sends a RATS (Request for Answer To Select) command. The NFC controller generates the RATS response, the ATS; the ATS isn't configurable by HCE services. However, HCE implementations must meet NFC Forum requirements for the ATS response, so NFC readers can count on these parameters being set in accordance with NFC Forum requirements for any HCE device.

The section below provides more details on the individual bytes of the ATS response provided by the NFC controller on a HCE device:

*   TL: length of the ATS response. Must not indicate a length greater than 20 bytes.
*   T0: bits 5, 6 and 7 must be set on all HCE devices, indicating TA(1), TB(1) and TC(1) are included in the ATS response. Bits 1 to 4 indicate the FSCI, coding the maximum frame size. On HCE devices the value of FSCI must be between 0h and 8h.
*   T(A)1: defines bitrates between reader and emulator, and whether they can be asymmetric. There are no bitrate requirements or guarantees for HCE devices.
*   T(B)1: bits 1 to 4 indicate the Start-up Frame Guard time Integer (SFGI). On HCE devices, SFGI must be <= 8h. Bits 5 to 8 indicate the Frame Waiting time Integer (FWI) and codes the Frame Waiting Time (FWT). On HCE devices, FWI must be <= 8h.
*   T(C)1: bit 5 indicates support for "Advanced Protocol features". HCE devices may or may not support "Advanced Protocol features". Bit 2 indicates support for DID. HCE devices may or may not support DID. Bit 1 indicates support for NAD. HCE devices must not support NAD and set bit 1 to zero.
*   Historical bytes: HCE devices may return up to 15 historical bytes. NFC readers willing to interact with HCE services should make no assumptions about the contents of the historical bytes or their presence.

Note that many HCE devices are likely made compliant with protocol requirements that the payment networks united in EMVCo have specified in their "Contactless Communication Protocol" specification. In particular:

*   FSCI in T0 must be between 2h and 8h.
*   T(A)1 must be set to 0x80, indicating only the 106 kbit/s bitrate is supported, and asymmetric bitrates between reader and emulator are not supported.
*   FWI in T(B)1 must be <= 7h.

### APDU data exchange

As noted earlier, HCE implementations support only a single logical channel. Attempting to select applications on different logical channels doesn't work on a HCE device.