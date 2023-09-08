# Identify developer-owned apps

For use cases such as analytics or fraud prevention on a given device, you may need to correlate usage or actions across a set of apps owned by your organization. Google Play services offers a privacy-friendly option called _app set ID_.

App set ID scope
----------------

The app set ID can have one of the following defined scopes. To determine which scope a particular ID is associated with, call `getScope()`).

### Google Play developer scope

For apps that are installed by the Google Play store, the app set ID API returns an ID scoped to the set of apps published under the same Google Play developer account.

For example, suppose you publish two apps under your Google Play developer account and both apps are installed on the same device through the Google Play store. The apps share the same app set ID on that device. The ID is the same even if the apps are signed by different keys.

### App scope

Under any of the following conditions, the app set ID SDK returns an ID unique to the calling app itself on a given device:

*   The app is installed by an installer other than the Google Play store.
*   Google Play services is unable to determine an app's Google Play developer account.
*   The app is installed on a device without Google Play services.

Don't rely on a cached value of app set ID
------------------------------------------

Under any of the following conditions, the app set ID for a given set of Google Play store-installed apps on a device can be reset:

*   The app set ID API hasn't been accessed by the groups of apps that share the same ID value for over 13 months.
*   The last app from a given set of apps is uninstalled from the device.
*   The user performs a factory reset of the device.

Your app should use the SDK to retrieve the ID value every time it's needed.

Add the app set ID SDK to your app
----------------------------------

The following snippet shows an example `build.gradle` file that uses the app set ID library:

```groovy
    dependencies {
        implementation 'com.google.android.gms:play-services-appset:16.0.2'
    }
```

The following sample snippet demonstrates how you can retrieve the app set ID asynchronously using the Tasks API in Google Play services:

### Kotlin

```kotlin
val client = AppSet.getClient(applicationContext) as AppSetIdClient
val task: Task<AppSetIdInfo> = client.appSetIdInfo as Task<AppSetIdInfo>

task.addOnSuccessListener({
    // Determine current scope of app set ID.
    val scope: Int = it.scope

    // Read app set ID value, which uses version 4 of the
    // universally unique identifier (UUID) format.
    val id: String = it.id
})
```

### Java

```java
Context context = getApplicationContext();
AppSetIdClient client = AppSet.getClient(context);
Task<AppSetIdInfo> task = client.getAppSetIdInfo();

task.addOnSuccessListener(new OnSuccessListener<AppSetIdInfo>() {
    @Override
    public void onSuccess(AppSetIdInfo info) {
        // Determine current scope of app set ID.
        int scope = info.getScope();

        // Read app set ID value, which uses version 4 of the
        // universally unique identifier (UUID) format.
        String id = info.getId();
    }
});
```