# Wi-Fi suggestion API for internet connectivity

Devices running Android 10 (API level 29) and higher allow your app to add network credentials for a device to auto-connect to a Wi-Fi access point. You can supply suggestions for which network to connect to using `WifiNetworkSuggestion`. The platform ultimately chooses which access point to accept based on the input from your app and others.

On Android 11 (API level 30) and higher:

*   Provisioning a `PasspointConfiguration` is supported by the suggestion API. Before Android 11, provisioning a `PasspointConfiguration` requires the use of the `addOrUpdatePasspointConfiguration()`) API.
*   The framework enforces security requirements on TLS-based Enterprise suggestions (EAP-TLS, EAP-TTLS, and EAP-PEAP); suggestions to such networks must set a `Root CA certificate`) and a `server domain name`).

*   The framework enforces ownership requirements for EAP-SIM based Enterprise suggestions (EAP-SIM, EAP-AKA, EAP-AKA-PRIME); such suggestions are allowed only by apps that are carrier-signed.
*   For suggestions provided by a carrier-signed app, the framework automatically assigns them a carrier ID corresponding to the app's carrier signing. Such suggestions are automatically disabled if the corresponding SIM is removed from the device.

On Android 12 (API level 31) and higher:

*   Additional privacy can be enabled via non-persistent MAC randomization, which periodically re-randomizes the randomized MAC address. Use `setMacRandomizationSetting`) to specify the level of randomization for your network.
    
*   `isPasspointTermsAndConditionsSupported()`): _Terms and conditions_ is a Passpoint feature that allows network deployments to replace insecure captive portals, which use open networks, with a secure Passpoint network. A notification is displayed to the user when terms and conditions are required to be accepted. Apps that suggest Passpoint networks that are gated by terms and conditions must call this API first to make sure that the device supports the capability. If the device does not support the capability, it won't be able to connect to this network, and an alternative or legacy network must be suggested.
    
*   `isDecoratedIdentitySupported()`): When authenticating to networks with a prefix decoration, the decorated identity prefix allows network operators to update the Network Access Identifier (NAI) to perform explicit routing through multiple proxies inside of an AAA network (see RFC 7542 for more on this).
    
    Android 12 implements this feature to conform with the WBA specification for PPS-MO extensions. Apps that suggest Passpoint networks that require a decorated identity must call this API first to make sure that the device supports the capability. If the device does not support the capability, the identity won't be decorated and the authentication to the network might fail.
    

To create a Passpoint suggestion, apps must use the `PasspointConfiguration`, `Credential`, and `HomeSp` classes. These classes describe the Passpoint profile, which is defined in the Wi-Fi Alliance Passpoint specification.

The following code sample shows how to provide credentials for one open, one WPA2, one WPA3 network and one Passpoint network:

### Kotlin

```kotlin
val suggestion1 = WifiNetworkSuggestion.Builder()
        .setSsid("test111111")
        .setIsAppInteractionRequired(true) // Optional (Needs location permission)
        .build();

val suggestion2 = WifiNetworkSuggestion.Builder()
        .setSsid("test222222")
        .setWpa2Passphrase("test123456")
        .setIsAppInteractionRequired(true) // Optional (Needs location permission)
        .build();

val suggestion3 = WifiNetworkSuggestion.Builder()
        .setSsid("test333333")
        .setWpa3Passphrase("test6789")
        .setIsAppInteractionRequired(true) // Optional (Needs location permission)
        .build();

val passpointConfig = PasspointConfiguration(); // configure passpointConfig to include a valid Passpoint configuration
val suggestion4 = WifiNetworkSuggestion.Builder()
        .setPasspointConfig(passpointConfig)
        .setIsAppInteractionRequired(true) // Optional (Needs location permission)
        .build();

val suggestionsList = listOf(suggestion1, suggestion2, suggestion3, suggestion4);

val wifiManager = context.getSystemService(Context.WIFI_SERVICE) as WifiManager;

val status = wifiManager.addNetworkSuggestions(suggestionsList);
if (status != WifiManager.STATUS_NETWORK_SUGGESTIONS_SUCCESS) {
    // do error handling here
}

// Optional (Wait for post connection broadcast to one of your suggestions)
val intentFilter = IntentFilter(WifiManager.ACTION_WIFI_NETWORK_SUGGESTION_POST_CONNECTION);

val broadcastReceiver = object : BroadcastReceiver() {
    override fun onReceive(context: Context, intent: Intent) {
        if (!intent.action.equals(WifiManager.ACTION_WIFI_NETWORK_SUGGESTION_POST_CONNECTION)) {
            return;
        }
        // do post connect processing here
    }
};
context.registerReceiver(broadcastReceiver, intentFilter);
```

### Java

```java
final WifiNetworkSuggestion suggestion1 =
  new WifiNetworkSuggestion.Builder()
  .setSsid("test111111")
  .setIsAppInteractionRequired(true) // Optional (Needs location permission)
  .build();

final WifiNetworkSuggestion suggestion2 =
  new WifiNetworkSuggestion.Builder()
  .setSsid("test222222")
  .setWpa2Passphrase("test123456")
  .setIsAppInteractionRequired(true) // Optional (Needs location permission)
  .build();

final WifiNetworkSuggestion suggestion3 =
  new WifiNetworkSuggestion.Builder()
  .setSsid("test333333")
  .setWpa3Passphrase("test6789")
  .setIsAppInteractionRequired(true) // Optional (Needs location permission)
  .build();

final PasspointConfiguration passpointConfig = new PasspointConfiguration();
// configure passpointConfig to include a valid Passpoint configuration

final WifiNetworkSuggestion suggestion4 =
  new WifiNetworkSuggestion.Builder()
  .setPasspointConfig(passpointConfig)
  .setIsAppInteractionRequired(true) // Optional (Needs location permission)
  .build();

final List<WifiNetworkSuggestion> suggestionsList =
  new ArrayList<WifiNetworkSuggestion> {{
    add(suggestion1);
    add(suggestion2);
    add(suggestion3);
    add(suggestion4);
  }};

final WifiManager wifiManager =
  (WifiManager) context.getSystemService(Context.WIFI_SERVICE);

final int status = wifiManager.addNetworkSuggestions(suggestionsList);
if (status != WifiManager.STATUS_NETWORK_SUGGESTIONS_SUCCESS) {
// do error handling here…
}

// Optional (Wait for post connection broadcast to one of your suggestions)
final IntentFilter intentFilter =
  new IntentFilter(WifiManager.ACTION_WIFI_NETWORK_SUGGESTION_POST_CONNECTION);

final BroadcastReceiver broadcastReceiver = new BroadcastReceiver() {
  @Override
  public void onReceive(Context context, Intent intent) {
    if (!intent.getAction().equals(
      WifiManager.ACTION_WIFI_NETWORK_SUGGESTION_POST_CONNECTION)) {
      return;
    }
    // do post connect processing here...
  }
};
context.registerReceiver(broadcastReceiver, intentFilter);
```

Immediately after the app places a suggestion for the first time, the user is notified. The notification type depends on the version of Android that's running on the device:

*   On Android 11 (API level 30) and higher, the user sees a dialog if the app is running in the foreground, and a notification if the app is running in the background.
*   On Android 10 (API level 29), the user sees a notification, regardless of whether the app is running in the foreground or the background.

When the platform connects to one of the network suggestions, the settings show text that attributes the network connection to the corresponding suggester app.

If the user uses the Wi-Fi picker to explicitly disconnect from one of the network suggestions when connected to it, then that network is ignored when it is still in range. During this period, that network will not be considered for auto-connection, even if the app removes and re-adds the network suggestion corresponding to the network. If the user uses the Wi-Fi picker to explicitly connect to a network that was previously disconnected, then that network will be considered for auto-connection immediately.

Changing approval status for app
--------------------------------

A user declining the network suggestion notification removes the `CHANGE_WIFI_STATE` permission from the app. The user can grant this approval later by going into the Wi-Fi control menu (**Settings** > **Apps & notifications** > **Special App access** > **Wi-Fi Control** > App name).