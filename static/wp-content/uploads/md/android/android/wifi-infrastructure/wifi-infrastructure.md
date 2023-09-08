# Wi-Fi infrastructure overview

On Android 10 and higher, the Wi-Fi infrastructure includes the Wi-Fi suggestion API for internet connectivity and the Wi-Fi network request API for peer-to-peer connectivity. On Android 11 and higher, the Settings Intent API enables you to ask the user to approve adding a saved network or Passpoint configuration.

The three APIs target different use cases and have different capabilities and constraints:

*   Suggestion API: targets apps that provision and provide internet-capable configurations. These configurations are not individually owned by the user—that is, the user can't delete them—though the user can disable specific configurations or disable the suggesting app.
    
    *   User approval is required per app, not per network suggested by the app.
    *   Intended for carrier Wi-Fi offload configuration apps and other apps that may actively manage offload networks.
*   Network request API: targets apps that need to connect to a peer device, such as when configuring an IoT device or transferring files to a camera. In such cases, the peer device starts up a SoftAP and the API allows the app to guide the user to connect to the device. The resulting network is not intended to provide internet access, can't be used by the system, and can't be used by any app except the configuring app.
    
    *   User selection and approval is required the first time a connection is made to a new peer.
    *   Intended for IoT configuration apps and IoT file transfer apps.
*   `ACTION_WIFI_ADD_NETWORKS` API: allows apps (with user approval) to add networks or Passpoint configurations to the saved network or subscription list. These configurations are then treated as if the user added them directly. For example, the user can later delete them.
    
    *   User approval is required for every request to add saved networks.
    *   Intended for apps that configure a home Access Point and need to add the configuration to the user’s saved network list. Apps that provision a user-account Passpoint configuration, such as Enterprise, federated networks, and educational institutions.