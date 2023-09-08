# Save networks and Passpoint configurations

On Android 11 (SDK level 30) and higher, apps can use the `android.provider.Settings.ACTION_WIFI_ADD_NETWORKS` intent to guide the user through adding one or more new saved networks or Passpoint configurations. The API also works as-is to modify existing saved configurations.

To save a network or Passpoint configuration, do the following:

1.  Create an `ACTION_WIFI_ADD_NETWORKS` intent.
    
2.  Create one or more configurations using `WifiNetworkSuggestion.Builder`. Note that even though you use a `WifiNetworkSuggestion`, this Intent API is not related to the Suggestion API.
    
3.  Create a parcelable array list of the configurations and attach it to the intent with the `EXTRA_WIFI_NETWORK_LIST` extra.
    
4.  Execute `Activity.startActivityForResult()`), passing in the intent.
    
5.  Listen for the result using the `Activity.onActivityResult()`) callback.
    
    The `resultCode` can be one of the following:
    
    *   `Activity.RESULT_OK`: indicating that the user accepted the proposed networks and saved them.
    *   `Activity.RESULT_CANCELED`: indicating that the user rejected the proposed networks.
    
    If the `resultCode` is `RESULT_OK`, then the data `Intent` contains the `EXTRA_WIFI_NETWORK_RESULT_LIST` extra, which contains an array of result codes indicating whether individual configurations were saved successfully. The possible result codes are:
    
    *   `ADD_WIFI_RESULT_SUCCESS`: configuration added or successfully updated.
    *   `ADD_WIFI_RESULT_ADD_OR_UPDATE_FAILED`: failure when trying to add configuration, such as due to a badly formed configuration.
    *   `ADD_WIFI_RESULT_ALREADY_EXISTS`: the requested configuration already existed so no action was necessary.
6.  If the request is successful, the platfom triggers a connection to one of the newly saved networks.
    

Code sample
-----------

The following code sample shows how to save a network or Passpoint configuration.

```kotlin
    class MainActivity : AppCompatActivity() {
        override fun onCreate(savedInstanceState: Bundle?) {
            super.onCreate(savedInstanceState)
            ...
        }
    
        fun startOperation() {
            val suggestions = ArrayList<WifiNetworkSuggestion>()
    
            // WPA2 configuration
            suggestions.add(
                    WifiNetworkSuggestion.Builder()
                            .setSsid("test111111")
                            .setWpa2Passphrase("test123456")
                            .build()
            )
    
            // Open configuration
            suggestions.add(
                    WifiNetworkSuggestion.Builder()
                            .setSsid("test222222")
                            .build()
            )
    
            // Passpoint configuration
            val config = PasspointConfiguration()
            config.credential = Credential().apply {
                realm = "realm.example.com"
                simCredential = Credential.SimCredential().apply {
                    eapType = 18
                    imsi = "123456*"
                }
            }
            config.homeSp = HomeSp().apply {
                fqdn = "test1.example.com"
                friendlyName = "Some Friendly Name"
            }
            suggestions.add(
                    WifiNetworkSuggestion.Builder()
                            .setPasspointConfig(config)
                            .build())
    
            // Create intent
            val bundle = Bundle()
            bundle.putParcelableArrayList(EXTRA_WIFI_NETWORK_LIST, suggestions)
            val intent = Intent(ACTION_WIFI_ADD_NETWORKS)
            intent.putExtras(bundle)
    
            // Launch intent
            startActivityForResult(intent, 0)
        }
    
        override fun onActivityResult(requestCode: Int, resultCode: Int, data: Intent?) {
            super.onActivityResult(requestCode, resultCode, data)
            if(resultCode == RESULT_OK) {
                // user agreed to save configurations: still need to check individual results
                if (data != null && data.hasExtra(EXTRA_WIFI_NETWORK_RESULT_LIST)) {
                    for (code in data.getIntegerArrayListExtra(EXTRA_WIFI_NETWORK_RESULT_LIST)) {
                        when (code) {
                            ADD_WIFI_RESULT_SUCCESS ->
                                ... // Configuration saved or modified
                            ADD_WIFI_RESULT_ADD_OR_UPDATE_FAILED ->
                                ... // Something went wrong - invalid configuration
                            ADD_WIFI_RESULT_ALREADY_EXISTS ->
                                ... // Configuration existed (as-is) on device, nothing changed
                            else ->
                                ... // Other errors
                        }
                    }
                }
            } else {
                // User refused to save configurations
            }
        }
    }
```