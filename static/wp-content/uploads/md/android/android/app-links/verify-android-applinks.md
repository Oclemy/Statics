# Verify Android App Links

An Android App Link is a special type of deep link that allows your website URLs to immediately open the corresponding content in your Android app, without requiring the user to select the app. Android App Links use the Digital Asset Links API to establish trust that your app has been approved by the website to automatically open links for that domain. If the system successfully verifies that you own the URLs, the system automatically routes those URL intents to your app.

To verify that you own both your app and the website URLs, complete the following steps:

1.  Add intent filters that contain the `autoVerify` attribute. This attribute signals to the system that it should verify whether your app belongs to the URL domains used in your intent filters.
    
2.  Declare the association between your website and your intent filters by hosting a Digital Asset Links JSON file at the following location:
    
    https://domain.name/.well-known/assetlinks.json
    

You can find related information in the following resources:

*   Supporting URLs and App Indexing in Android Studio
*   Creating a Statement List

Add intent filters for app links verification
---------------------------------------------

To enable link handling verification for your app, add intent filters that match the following format:

```xml
    <!-- Make sure you explicitly set android:autoVerify to "true". -->
    <intent-filter android:autoVerify="true">
        <action android:name="android.intent.action.VIEW" />
        <category android:name="android.intent.category.DEFAULT" />
        <category android:name="android.intent.category.BROWSABLE" />
    
        <!-- If a user clicks on a shared link that uses the "http" scheme, your
             app should be able to delegate that traffic to "https". -->
        <data android:scheme="http" />
        <data android:scheme="https" />
    
        <!-- Include one or more domains that should be verified. -->
        <data android:host="..." />
    </intent-filter>
```

Although it's sufficient to include `autoVerify` in only one `<intent-filter>` declaration for each host, even if that host is used across other unmarked declarations, it's recommended that you add `autoVerify` to each `<intent-filter>` element for consistency. This also ensures that, after your remove or refactor elements in your manifest file, your app remains associated with all the domains that you still define.

The domain verification process requires an internet connection and could take some time to complete. To help improve the efficiency of the process, the system verifies a domain for an app that targets Android 12 or higher only if that domain is inside an `<intent-filter>` element that contains the exact format specified in the preceding code snippet.

### Supporting app linking for multiple hosts

The system must be able to verify the host specified in the app’s URL intent filters’ data elements against the Digital Asset Links files hosted on the respective web domains in that intent filter. If the verification fails, the system then defaults to its standard behavior to resolve the intent, as described in Create Deep Links to App Content. However, the app can still be verified as a default handler for any of the URL patterns defined in the app's other intent filters.

**Note:** On Android 11 (API level 30) and lower, the system doesn't verify your app as a default handler unless it finds a matching Digital Asset Links file for _all_ hosts that you define in the manifest.

For example, an app with the following intent filters would pass verification only for `https://www.example.com` if an `assetlinks.json` file were found at `https://www.example.com/.well-known/assetlinks.json` but not `https://www.example.net/.well-known/assetlinks.json`:

```xml
<application>

  <activity android:name=”MainActivity”>
    <intent-filter android:autoVerify="true">
      <action android:name="android.intent.action.VIEW" />
      <category android:name="android.intent.category.DEFAULT" />
      <category android:name="android.intent.category.BROWSABLE" />
      <data android:scheme="http" />
      <data android:scheme="https" />
      <data android:host="www.example.com" />
    </intent-filter>
  </activity>
  <activity android:name=”SecondActivity”>
    <intent-filter>
      <action android:name="android.intent.action.VIEW" />
      <category android:name="android.intent.category.DEFAULT" />
      <category android:name="android.intent.category.BROWSABLE" />
      <data android:scheme="https" />
     <data android:host="www.example.net" />
    </intent-filter>
  </activity>

</application>
```

> **Note:** All `<data>` elements in the same intent filter are merged together to account for all variations of their combined attributes. For example, the first intent filter above includes a `<data>` element that only declares the HTTPS scheme. But it is combined with the other `<data>` element so that the intent filter supports both `http://www.example.com` and `https://www.example.com`. As such, you must create separate intent filters when you want to define specific combinations of URI schemes and domains.

### Supporting app linking for multiple subdomains

The Digital Asset Links protocol treats subdomains in your intent filters as unique, separate hosts. So if your intent filter lists multiple hosts with different subdomains, you must publish a valid `assetlinks.json` on each domain. For example, the following intent filter includes `www.example.com` and `mobile.example.com` as accepted intent URL hosts. So a valid `assetlinks.json` must be published at both `https://www.example.com/.well-known/assetlinks.json` and `https://mobile.example.com/.well-known/assetlinks.json`.

```xml
<application>
  <activity android:name=”MainActivity”>
    <intent-filter android:autoVerify="true">
      <action android:name="android.intent.action.VIEW" />
      <category android:name="android.intent.category.DEFAULT" />
      <category android:name="android.intent.category.BROWSABLE" />
      <data android:scheme="https" />
      <data android:scheme="https" />
      <data android:host="www.example.com" />
      <data android:host="mobile.example.com" />
    </intent-filter>
  </activity>
</application>
```

Alternatively, if you declare your hostname with a wildcard (such as `*.example.com`), you must publish your `assetlinks.json` file at the root hostname (`example.com`). For example, an app with the following intent filter will pass verification for any sub-name of `example.com` (such as `foo.example.com`) as long as the `assetlinks.json` file is published at `https://example.com/.well-known/assetlinks.json`:

```xml
<application>
  <activity android:name=”MainActivity”>
    <intent-filter android:autoVerify="true">
      <action android:name="android.intent.action.VIEW" />
      <category android:name="android.intent.category.DEFAULT" />
      <category android:name="android.intent.category.BROWSABLE" />
      <data android:scheme="https" />
      <data android:host="*.example.com" />
    </intent-filter>
  </activity>
</application>
```

### Check for multiple apps associated with the same domain

If you publish multiple apps that are each associated with the same domain, they can each be successfully verified. However, if the apps can resolve the exact same domain host and path, as might be the case with lite and full versions of an app, only the app that was installed most recently can resolve web intents for that domain.

In a case like this, check for possible conflicting apps on the user's device, provided that you have the necessary package visibility. Then, in your app, show a custom chooser dialog that contains the results from calling `queryIntentActivities()`. The user can select their preferred app from the list of matching apps that appear in the dialog.

Declare website associations
----------------------------

A Digital Asset Links JSON file must be published on your website to indicate the Android apps that are associated with the website and verify the app's URL intents. The JSON file uses the following fields to identify associated apps:

*   `package_name`: The application ID declared in the app's `build.gradle` file.
*   `sha256_cert_fingerprints`: The SHA256 fingerprints of your app’s signing certificate. You can use the following command to generate the fingerprint via the Java keytool:
    
    keytool -list -v -keystore my-release-key.keystore
    
    This field supports multiple fingerprints, which can be used to support different versions of your app, such as debug and production builds.
    
    If you're using Play App Signing for your app, then the certificate fingerprint produced by running `keytool` locally will usually not match the one on users' devices. You can verify whether you're using Play App Signing for your app in your Play Console developer account under `Release > Setup > App Integrity`; if you do, then you'll also find the correct Digital Asset Links JSON snippet for your app on the same page.
    

The following example `assetlinks.json` file grants link-opening rights to a `com.example` Android app:

```json
[{
  "relation": ["delegate_permission/common.handle_all_urls"],
  "target": {
    "namespace": "android_app",
    "package_name": "com.example",
    "sha256_cert_fingerprints":
    ["14:6D:E9:83:C5:73:06:50:D8:EE:B9:95:2F:34:FC:64:16:A0:83:42:E6:1D:BE:A8:8A:04:96:B2:3F:CF:44:E5"]
  }
}]
```

### Associating a website with multiple apps

A website can declare associations with multiple apps within the same `assetlinks.json` file. The following file listing shows an example of a statement file that declares association with two apps, separately, and resides at `https://www.example.com/.well-known/assetlinks.json`:

```json
[{
  "relation": ["delegate_permission/common.handle_all_urls"],
  "target": {
    "namespace": "android_app",
    "package_name": "com.example.puppies.app",
    "sha256_cert_fingerprints":
    ["14:6D:E9:83:C5:73:06:50:D8:EE:B9:95:2F:34:FC:64:16:A0:83:42:E6:1D:BE:A8:8A:04:96:B2:3F:CF:44:E5"]
  }
  },
  {
  "relation": ["delegate_permission/common.handle_all_urls"],
  "target": {
    "namespace": "android_app",
    "package_name": "com.example.monkeys.app",
    "sha256_cert_fingerprints":
    ["14:6D:E9:83:C5:73:06:50:D8:EE:B9:95:2F:34:FC:64:16:A0:83:42:E6:1D:BE:A8:8A:04:96:B2:3F:CF:44:E5"]
  }
}]
```

Different apps may handle links for different resources under the same web host. For example, app1 may declare an intent filter for `https://example.com/articles`, and app2 may declare an intent filter for `https://example.com/videos`.

> **Note:** Multiple apps associated with a domain may be signed with the same or different certificates.

### Associating multiple websites with a single app

Multiple websites can declare associations with the same app in their respective `assetlinks.json` files. The following file listings show an example of how to declare the association of example.com and example.net with app1. The first listing shows the association of example.com with app1:

https://www.example.com/.well-known/assetlinks.json

```json
[{
  "relation": ["delegate_permission/common.handle_all_urls"],
  "target": {
    "namespace": "android_app",
    "package_name": "com.mycompany.app1",
    "sha256_cert_fingerprints":
    ["14:6D:E9:83:C5:73:06:50:D8:EE:B9:95:2F:34:FC:64:16:A0:83:42:E6:1D:BE:A8:8A:04:96:B2:3F:CF:44:E5"]
  }
}]
```

The next listing shows the association of example.net with app1. Only the location where these files are hosted is different (`.com` and `.net`):

https://www.example.net/.well-known/assetlinks.json

```json
[{
  "relation": ["delegate_permission/common.handle_all_urls"],
  "target": {
    "namespace": "android_app",
    "package_name": "com.mycompany.app1",
    "sha256_cert_fingerprints":
    ["14:6D:E9:83:C5:73:06:50:D8:EE:B9:95:2F:34:FC:64:16:A0:83:42:E6:1D:BE:A8:8A:04:96:B2:3F:CF:44:E5"]
  }
}]
```

### Publishing the JSON verification file

You must publish your JSON verification file at the following location:

https://domain.name/.well-known/assetlinks.json

Be sure of the following:

*   The `assetlinks.json` file is served with content-type `application/json`.
*   The `assetlinks.json` file must be accessible over an HTTPS connection, regardless of whether your app's intent filters declare HTTPS as the data scheme.
*   The `assetlinks.json` file must be accessible without any redirects (no 301 or 302 redirects).
*   If your app links support multiple host domains, then you must publish the `assetlinks.json` file on each domain. See Supporting app linking for multiple hosts.
*   Do not publish your app with dev/test URLs in the manifest file that may not be accessible to the public (such as any that are accessible only with a VPN). A work-around in such cases is to configure build variants to generate a different manifest file for dev builds.

Android App Links verification
------------------------------

When `android:autoVerify="true"` is present in at least one of your app's intent filters, installing your app on a device that runs Android 6.0 (API level 23) or higher causes the system to automatically verify the hosts associated with the URLs in your app's intent filters. On Android 12 and higher, you can also invoke the verification process manually to test the verification logic.

### Auto verification

The system's auto-verification involves the following:

1.  The system inspects all intent filters that include any of the following:
    *   Action: `android.intent.action.VIEW`
    *   Categories: `android.intent.category.BROWSABLE` and `android.intent.category.DEFAULT`
    *   Data scheme: `http` or `https`
2.  For each unique host name found in the above intent filters, Android queries the corresponding websites for the Digital Asset Links file at `https://hostname/.well-known/assetlinks.json`.

After you have confirmed the list of websites to associate with your app, and you have confirmed that the hosted JSON file is valid, install the app on your device. Wait at least 20 seconds for the asynchronous verification process to complete. Use the following command to check whether the system verified your app and set the correct link handling policies:

adb shell am start -a android.intent.action.VIEW 
    -c android.intent.category.BROWSABLE 
    -d "http://domain.name:optional_port"

### Manual verification

Starting in Android 12, you can manually invoke domain verification for an app that's installed on a device. You can perform this process regardless of whether your app targets Android 12.

#### Establish an internet connection

To perform domain verification, your test device must be connected to the internet.

#### Support the updated domain verification process

If your app targets Android 12 or higher, the system uses the updated domain verification process automatically.

Otherwise, you can manually enable the updated verification process. To do so, run the following command in a terminal window:

```shell
adb shell am compat enable 175408749 PACKAGE_NAME
```

#### Reset the state of Android App Links on a device

Before you manually invoke domain verification on a device, you must reset the state of Android App Links on the test device. To do so, run the following command in a terminal window:

```shell
adb shell pm set-app-links --package PACKAGE_NAME 0 all
```

This command puts the device in the same state that it's in before the user chooses default apps for any domains.

#### Invoke the domain verification process

After you reset the state of Android App Links on a device, you can perform the verification itself. To do so, run the following command in a terminal window:

```shell
adb shell pm verify-app-links --re-verify PACKAGE_NAME
```

#### Review the verification results

After allowing some time for the verification agent to finish its requests, review the verification results. To do so, run the following command:

```shell
adb shell pm get-app-links PACKAGE_NAME
```

The output of this command is similar to the following:

```shell
com.example.pkg:
    ID: 01234567-89ab-cdef-0123-456789abcdef
    Signatures: [***]
    Domain verification state:
      example.com: verified
      sub.example.com: legacy_failure
      example.net: verified
      example.org: 1026
```

The domains that successfully pass verification have a domain verification state of `verified`. Any other state indicates that the domain verification couldn't be performed. In particular, a state of `none` indicates that the verification agent might not have completed the verification process yet.

The following list shows the possible return values that domain verification can return for a given domain:

`none`

Nothing has been recorded for this domain. Wait a few more minutes for the verification agent to finish the requests related to domain verification, then invoke the domain verification process again.

`verified`

The domain is successfully verified for the declaring app.

`approved`

The domain was force-approved, usually by executing a shell command.

`denied`

The domain was force-denied, usually by executing a shell command.

`migrated`

The system preserved the result of a previous process that used legacy domain verification.

`restored`

The domain was approved after the user performed a data restore. It's assumed that the domain was previously verified.

`legacy_failure`

The domain was rejected by a legacy verifier. The specific failure reason is unknown.

`system_configured`

The domain was approved automatically by the device configuration.

Error code of `1024` or greater

Custom error code that's specific to the device's verifier.

Double-check that you have established a network connection, and invoke the domain verification process again.

Request the user to associate your app with a domain
----------------------------------------------------

Another way for your app to get approved for a domain is to ask the user to associate your app with that domain.

### Check whether your app is already approved for the domain

Before you prompt the user, check whether your app is the default handler for the domains that you define in your `<intent-filter>` elements. You can query the approval state using one of the following methods:

*   The `DomainVerificationManager` API (at runtime).
*   A command-line program (during testing).

#### DomainVerificationManager

The following code snippet demonstrates how to use the `DomainVerificationManager` API:

### Kotlin

```kotlin
val context: Context = TODO("Your activity or fragment's Context")
val manager = context.getSystemService(DomainVerificationManager::class.java)
val userState = manager.getDomainVerificationUserState(context.packageName)

// Domains that have passed Android App Links verification.
val verifiedDomains = userState?.hostToStateMap
    ?.filterValues { it == DomainVerificationUserState.DOMAIN_STATE_VERIFIED }

// Domains that haven't passed Android App Links verification but that the user
// has associated with an app.
val selectedDomains = userState?.hostToStateMap
    ?.filterValues { it == DomainVerificationUserState.DOMAIN_STATE_SELECTED }

// All other domains.
val unapprovedDomains = userState?.hostToStateMap
    ?.filterValues { it == DomainVerificationUserState.DOMAIN_STATE_NONE }
```

### Java

```java
Context context = TODO("Your activity or fragment's Context");
DomainVerificationManager manager =
        context.getSystemService(DomainVerificationManager.class);
DomainVerificationUserState userState =
        manager.getDomainVerificationUserState(context.getPackageName());

Map<String, Integer> hostToStateMap = userState.getHostToStateMap();
List<String> verifiedDomains = new ArrayList<>();
List<String> selectedDomains = new ArrayList<>();
List<String> unapprovedDomains = new ArrayList<>();
for (String key : hostToStateMap.keySet()) {
    Integer stateValue = hostToStateMap.get(key);
    if (stateValue == DomainVerificationUserState.DOMAIN_STATE_VERIFIED) {
        // Domain has passed Android App Links verification.
        verifiedDomains.add(key);
    } else if (stateValue == DomainVerificationUserState.DOMAIN_STATE_SELECTED) {
        // Domain hasn't passed Android App Links verification, but the user has
        // associated it with an app.
        selectedDomains.add(key);
    } else {
        // All other domains.
        unapprovedDomains.add(key);
    }
}
```

#### Command-line program

When testing your app during development, you can run the following command to query the verification state of the domains that your organization owns:

adb shell pm get-app-links --user cur PACKAGE_NAME

In the following example output, even though the app failed verification for the "example.org" domain, user 0 has manually approved the app in system settings, and no other package is verified for that domain.

```shell
com.example.pkg:
ID: ***
Signatures: [***]
Domain verification state:
  example.com: verified
  example.net: verified
  example.org: 1026
User 0:
  Verification link handling allowed: true
  Selection state:
    Enabled:
      example.org
    Disabled:
      example.com
      example.net
```

You can also use shell commands to simulate the process where the user selects which app is associated with a given domain. A full explanation of these commands is available from the output of `adb shell pm`.

### Provide context for the request

Before you make this request for domain approval, provide some context for the user. For example, you might show them a splash screen, a dialog, or a similar UI element that explains to the user why your app should be the default handler for a particular domain.

### Make the request

After the user understands what your app is asking them to do, make the request. To do so, invoke an intent that includes the `ACTION_APP_OPEN_BY_DEFAULT_SETTINGS` intent action, and a data string matching `package:com.example.pkg` for the target app, as shown in the following code snippet:

### Kotlin

```kotlin
val context: Context = TODO("Your activity or fragment's Context")
val intent = Intent(Settings.ACTION_APP_OPEN_BY_DEFAULT_SETTINGS,
    Uri.parse("package:${context.packageName}"))
context.startActivity(intent)
```

### Java

```java
Context context = TODO("Your activity or fragment's Context");
Intent intent = new Intent(Settings.ACTION_APP_OPEN_BY_DEFAULT_SETTINGS,
    Uri.parse("package:" + context.getPackageName()));
context.startActivity(intent);
```

When the intent is invoked, users see a settings screen called **Open by default**. This screen contains a radio button called **Open supported links**, as shown in figure 1.

When the user turns on **Open supported links**, a set of checkboxes appear under a section called **Links to open in this app**. From here, users can select the domains that they want to associate with your app. They can also select **Add link** to add domains, as shown in figure 2. When users later select any link within the domains that they add, the link opens in your app automatically.

![When the radio button is enabled, a section near the bottom
    includes checkboxes as well as a button called 'Add link'](https://developer.android.com/static/images/training/app-links/choose-domains.svg)

**Figure 1.** System settings screen where users can choose which links open in your app by default.

![Each checkbox represents a domain that you can add. The
    dialog's buttons are 'Cancel' and 'Add.'](https://developer.android.com/static/images/training/app-links/add-domains.svg)

**Figure 2.** Dialog where users can choose additional domains to associate with your app.

Open domains in your app that your app cannot verify
----------------------------------------------------

Your app's main function might be to open links as a third party, without the ability to verify its handled domains. If this is the case, explain to users that, at that time when they select a web link, they cannot choose between a first-party app and your (third-party) app. Users need to manually associate the domains with your third-party app.

In addition, consider introducing a dialog or trampoline activity that allows the user to open the link in the first-party app if the user prefers to do so, acting as a proxy. Before setting up such a dialog or trampoline activity, set up your app so that it has package visibility into the first-party apps that match your app's web intent filter.

Test app links
--------------

When implementing the app linking feature, you should test the linking functionality to make sure the system can associate your app with your websites, and handle URL requests, as you expect.

To test an existing statement file, you can use the Statement List Generator and Tester tool.

### Confirm the list of hosts to verify

When testing, you should confirm the list of associated hosts that the system should verify for your app. Make a list of all URLs whose corresponding intent filters include the following attributes and elements:

*   `android:scheme` attribute with a value of `http` or `https`
*   `android:host` attribute with a domain URL pattern
*   `android.intent.action.VIEW` action element
*   `android.intent.category.BROWSABLE` category element

Use this list to check that a Digital Asset Links JSON file is provided on each named host and subdomain.

### Confirm the Digital Asset Links files

For each website, use the Digital Asset Links API to confirm that the Digital Asset Links JSON file is properly hosted and defined:

```shell
https://digitalassetlinks.googleapis.com/v1/statements:list?
   source.web.site=https://domain.name:optional_port&
   relation=delegate_permission/common.handle_all_urls
```

### Check link policies

As part of your testing process, you can check the current system settings for link handling. Use the following command to get a listing of existing link-handling policies for all apps on your connected device:

```shell
adb shell dumpsys package domain-preferred-apps
```

Or the following does the same thing:

```shell
adb shell dumpsys package d
```

> **Note:** Make sure you wait at least 20 seconds after installation of your app to allow for the system to complete the verification process.

The command returns a listing of each user or profile defined on the device, preceded by a header in the following format:

App linkages for user 0:

Following this header, the output uses the following format to list the link-handling settings for that user:

```shell
Package: com.android.vending
Domains: play.google.com market.android.com
Status: always : 200000002
```

This listing indicates which apps are associated with which domains for that user:

*   `Package` - Identifies an app by its package name, as declared in its manifest.
*   `Domains` - Shows the full list of hosts whose web links this app handles, using blank spaces as delimiters.
*   `Status` - Shows the current link-handling setting for this app. An app that has passed verification, and whose manifest contains `android:autoVerify="true"`, shows a status of `always`. The hexadecimal number after this status is related to the Android system's record of the user’s app linkage preferences. This value does not indicate whether verification succeeded.

> **Note:** If a user changes the app link settings for an app before verification is complete, you may see a false positive for a successful verification, even though verification has failed. This verification failure, however, does not matter if the user explicitly enabled the app to open supported links without asking. This is because user preferences take precedence over programmatic verification (or lack of it). As a result, the link goes directly to your app, without showing a dialog, just as if verification had succeeded.

### Test example

For app link verification to succeed, the system must be able to verify your app with each of the websites that you specify in a given intent filter that meets the criteria for app links. The following example shows a manifest configuration with several app links defined:

```xml
<application>

    <activity android:name=”MainActivity”>
        <intent-filter android:autoVerify="true">
            <action android:name="android.intent.action.VIEW" />
            <category android:name="android.intent.category.DEFAULT" />
            <category android:name="android.intent.category.BROWSABLE" />
            <data android:scheme="https" />
            <data android:scheme="https" />
            <data android:host="www.example.com" />
            <data android:host="mobile.example.com" />
        </intent-filter>
        <intent-filter>
            <action android:name="android.intent.action.VIEW" />
            <category android:name="android.intent.category.BROWSABLE" />
            <data android:scheme="https" />
            <data android:host="www.example2.com" />
        </intent-filter>
    </activity>

    <activity android:name=”SecondActivity”>
        <intent-filter>
            <action android:name="android.intent.action.VIEW" />
            <category android:name="android.intent.category.DEFAULT" />
            <category android:name="android.intent.category.BROWSABLE" />
            <data android:scheme="https" />
            <data android:host="account.example.com" />
        </intent-filter>
    </activity>

      <activity android:name=”ThirdActivity”>
        <intent-filter>
            <action android:name="android.intent.action.VIEW" />
            <category android:name="android.intent.category.DEFAULT" />
            <data android:scheme="https" />
            <data android:host="map.example.com" />
        </intent-filter>
        <intent-filter>
            <action android:name="android.intent.action.VIEW" />
            <category android:name="android.intent.category.BROWSABLE" />
            <data android:scheme="market" />
            <data android:host="example.com" />
        </intent-filter>
      </activity>

</application>
```

The list of hosts that the platform would attempt to verify from the above manifest is:

```shell
www.example.com
mobile.example.com
www.example2.com
account.example.com
```

The list of hosts that the platform would not attempt to verify from the above manifest is:

```shell
map.example.com (it does not have android.intent.category.BROWSABLE)
market://example.com (it does not have either an "http" or "https" scheme)
```

To learn more about statement lists, see Creating a Statement List.

Fix common implementation errors
--------------------------------

If you can't verify your Android App Links, check for the following common errors. This section uses `example.com` as a placeholder domain name; when performing these checks, substitute `example.com` with your server's actual domain name.

Incorrect intent filter set up

Check to see whether you include a URL that your app doesn't own in an `<intent-filter>` element.

Incorrect server configuration

Check to your server's JSON configuration, and make sure the SHA value is correct.

Also, check that `example.com.` (with the trailing period) serves the same content as `example.com`.

Server-side redirects

The system doesn't verify **any** Android App Links for your app if you set up a redirect such as the following:

*   `http://example.com` to `https://example.com`
*   `example.com` to `www.example.com`

This behavior protects your app's security.

Server robustness

Check whether your server can connect to your client apps.

Non-verifiable links

For testing purposes, you might intentionally add non-verifiable links. Keep in mind that, on Android 11 and lower, these links cause the system to not verify **all** Android App Links for your app.

Incorrect signature in assetlinks.json

Verify that your signature is correct and matches the signature used to sign your app. Common mistakes include:

*   Signing the app with a debug certificate and only having the release signature in `assetlinks.json`.
*   Having a lower case signature in `assetlinks.json`. The signature should be in upper case.
*   If you are using Play App Signing, make sure you're using the signature that Google uses to sign each of your releases. You can verify these details, including a complete JSON snippet, by following instructions about declaring website associations.