# Android Developers

To protect user privacy, it's a best practice for all Android apps to work with user-resettable identifiers. One such identifier is an _advertising ID_, which uniquely identifies a particular user for advertising use cases, such as ad personalization.

To support a standardized ad-tracking solution across the devices running your app, you can use the Advertising ID library. This library, which is available on devices running Android 4.0 (API level 14) and higher, defines an interface to interact with system-level ad providers. This interface allows your app to receive consistent advertising ID values.

The ad provider that's included with the Advertising ID library also defines a standard intent for opening a settings screen that the ad provider implements. This settings screen allows the user to reset their advertising ID and opt out of ad personalization.

This guide explains how to use the client module of the Advertising ID library to obtain a consistent advertising ID on a per-device-user basis. This guide then presents an overview of the library's architecture.

Configure your client app
-------------------------

By interacting with the client module of the Advertising ID library, your app can retrieve a consistent advertising ID that represents the user who is interacting with the app.

The advertising ID is represented using version 3 of the universally unique identifier (UUID) format or an equivalent 128-bit format:

38400000-8cf0-11bd-b23e-10b96e40000d

The Advertising ID library normalizes the return value as necessary to provide IDs using this format.

To retrieve the user-resettable advertising ID for your app, complete the following steps:

1.  Check whether an ad provider is available by calling `AdvertisingIdClient.isAdvertisingIdProviderAvailable()`). If this method returns `false`, your app should use another means to perform any required ad-tracking use cases.
    
2.  Get the ad identifier details, including the advertising ID, by calling `AdvertisingIdClient.getAdvertisingIdInfo()`). The Advertising ID library executes this method on a worker thread and uses a 10-second connection timeout.
    

The following code snippet demonstrates how to retrieve the advertising ID along with other information from the ad provider:

app/build.gradle

### Groovy

```groovy
dependencies {
    implementation 'androidx.ads:ads-identifier:1.0.0-alpha01'

    // Used for the calls to addCallback() in the snippets on this page.
    implementation 'com.google.guava:guava:28.0-android'
}
```

### Kotlin

```
dependencies {
    implementation("androidx.ads:ads-identifier:1.0.0-alpha01")

    // Used for the calls to addCallback() in the snippets on this page.
    implementation("com.google.guava:guava:28.0-android")
}
```

MyAdIdClient

### Kotlin

```kotlin
// Used for the call to addCallback() within this snippet.
import com.google.common.util.concurrent.Futures.addCallback

private fun determineAdvertisingInfo() {
    if (AdvertisingIdClient.isAdvertisingIdProviderAvailable()) {
        val advertisingIdInfoListenableFuture =
                AdvertisingIdClient.getAdvertisingIdInfo(applicationContext)

        addCallback(advertisingIdInfoListenableFuture,
                object : FutureCallback<AdvertisingIdInfo> {
            override fun onSuccess(adInfo: AdvertisingIdInfo?) {
                val id: String = adInfo?.id
                val providerPackageName: String = adInfo?.providerPackageName
                val isLimitTrackingEnabled: Boolean =
                                adInfo?.isLimitTrackingEnabled
            }

            // Any exceptions thrown by getAdvertisingIdInfo()
            // cause this method to be called.
            override fun onFailure(t: Throwable) {
                Log.e("MY_APP_TAG",
                        "Failed to connect to Advertising ID provider.")
                // Try to connect to the Advertising ID provider again or fall
                // back to an ad solution that doesn't require using the
                // Advertising ID library.
            }
        }, Executors.newSingleThreadExecutor())
    } else {
        // The Advertising ID client library is unavailable. Use a different
        // library to perform any required ad use cases.
    }
}
```

### Java

```java
// Used for the call to addCallback() within this snippet.
import com.google.common.util.concurrent.Futures;

private void determineAdvertisingInfo() {
    if (AdvertisingIdClient.isAdvertisingIdProviderAvailable()) {
        ListenableFuture<AdvertisingIdInfo> advertisingIdInfoListenableFuture =
                AdvertisingIdClient.getAdvertisingIdInfo(getApplicationContext());
        Futures.addCallback(advertisingIdInfoListenableFuture,
                new FutureCallback<AdvertisingIdInfo>() {
                    @Override
                    public void onSuccess(AdvertisingIdInfo adInfo) {
                        String id = adInfo.getId();
                        String providerPackageName =
                                adInfo.getProviderPackageName();
                        boolean isLimitTrackingEnabled =
                                adInfo.isLimitTrackingEnabled();

                    // Any exceptions thrown by getAdvertisingIdInfo()
                    // cause this method to be called.
                    @Override
                    public void onFailure(Throwable throwable) {
                        Log.e("MY_APP_TAG",
                                "Failed to connect to Advertising ID provider.");
                        // Try to connect to the Advertising ID provider again
                        // or fall back to an ad solution that doesn't require
                        // using the Advertising ID library.
                    }
                });
    } else {
        // The Advertising ID client library is unavailable. Use a different
        // library to perform any required ad use cases.
    }
}
```

Advertising ID library architecture
-----------------------------------

![Architecture diagram](https://developer.android.com/static/images/training/articles/ad-id-arch.svg)

**Figure 1.** Advertising ID library architecture

Figure 1 depicts the structure of the Advertising ID library. The library consists of the following modules:

*   A _client module_, which is a thin layer included in apps.
*   A _provider module_, which the device manufacturer makes available. Implementations of this module must define a settings UI to give users the ability to reset their advertising ID and toggle ad tracking preferences.

The client module communicates with the provider module to retrieve advertising IDs and user preferences regarding ad tracking.

It's possible for a device to support multiple system-level ad providers at the same time. If the Advertising ID library detects this situation, it ensures that your app always retrieves information from the same provider, assuming that the provider remains available. This process keeps the advertising ID consistent.

If the set of available ad providers changes over time and your app interacts with a different ad identifier provider, all other client apps start using that new provider as well. Your app demonstrates the same behavior that would occur if the user had requested to reset their advertising ID.

The Advertising ID provider library uses the following deterministic order to rank the providers:

1.  Providers that have requested the `androidx.ads.identifier.provider.HIGH_PRIORITY` permission.
2.  Providers that have been installed on the device for the longest time.
3.  Providers that appear first in alphabetical order.