#Authenticate to OAuth2 services

![Diagram of auth token  logic](https://developer.android.com/static/images/training/oauth_dance.png)

**Figure 1.** Procedure for obtaining a valid auth token from the Android Account Manager.

In order to securely access an online service, users need to authenticate to the service—they need to provide proof of their identity. For an application that accesses a third-party service, the security problem is even more complicated. Not only does the user need to be authenticated to access the service, but the application also needs to be authorized to act on the user's behalf.

The industry standard way to deal with authentication to third-party services is the OAuth2 protocol. OAuth2 provides a single value, called an auth token, that represents both the user's identity and the application's authorization to act on the user's behalf. This lesson demonstrates connecting to a Google server that supports OAuth2. Although Google services are used as an example, the techniques demonstrated will work on any service that correctly supports the OAuth2 protocol.

Using OAuth2 is good for:

*   Getting permission from the user to access an online service using their account.
*   Authenticating to an online service on behalf of the user.
*   Handling authentication errors.

Gather information
------------------

To begin using OAuth2, you need to know a few API-specific things about the service you're trying to access:

*   The URL of the service you want to access.
*   The auth scope, which is a string that defines the specific type of access your app is asking for. For instance, the auth scope for read-only access to Google Tasks is `View your tasks`, while the auth scope for read-write access to Google Tasks is `Manage your tasks`.
*   A client ID and client secret, which are strings that identify your app to the service. You need to obtain these strings directly from the service owner. Google has a self-service system for obtaining client IDs and secrets.

Request the internet permission
-------------------------------

For apps targeting Android 6.0 (API level 23) and higher, the `getAuthToken()` method itself doesn't require any permissions. However, to perform operations on the token, you need to add the `INTERNET` permission to your manifest file, as shown in the following code snippet:

```xml
<manifest ... >
    <uses-permission android:name="android.permission.INTERNET" />
    ...
</manifest>
```

Request an auth token
---------------------

To get the token, call `AccountManager.getAuthToken()`.

> **Caution:** Because some account operations might involve network communication, most of the `AccountManager` methods are asynchronous. This means that instead of doing all of your auth work in one function, you need to implement it as a series of callbacks.

The following snippet shows how to work with a series of callbacks to get the token:

### Kotlin

```kotlin
val am: AccountManager = AccountManager.get(this)
val options = Bundle()

am.getAuthToken(
        myAccount_,                     // Account retrieved using getAccountsByType()
        "Manage your tasks",            // Auth scope
        options,                        // Authenticator-specific options
        this,                           // Your activity
        OnTokenAcquired(),              // Callback called when a token is successfully acquired
        Handler(OnError())              // Callback called if an error occurs
)
```

### Java

```java
AccountManager am = AccountManager.get(this);
Bundle options = new Bundle();

am.getAuthToken(
    myAccount_,                     // Account retrieved using getAccountsByType()
    "Manage your tasks",            // Auth scope
    options,                        // Authenticator-specific options
    this,                           // Your activity
    new OnTokenAcquired(),          // Callback called when a token is successfully acquired
    new Handler(new OnError()));    // Callback called if an error occurs
```

In this example, `OnTokenAcquired` is a class that implements `AccountManagerCallback`. `AccountManager` calls `run()` on `OnTokenAcquired` with an `AccountManagerFuture` that contains a `Bundle`. If the call succeeded, the token is inside the `Bundle`.

Here's how you can get the token from the `Bundle`:

### Kotlin

```kotlin
private class OnTokenAcquired : AccountManagerCallback<Bundle> {

    override fun run(result: AccountManagerFuture<Bundle>) {
        // Get the result of the operation from the AccountManagerFuture.
        val bundle: Bundle = result.getResult()

        // The token is a named value in the bundle. The name of the value
        // is stored in the constant AccountManager.KEY_AUTHTOKEN.
        val token: String = bundle.getString(AccountManager.KEY_AUTHTOKEN)
    }
}
```

### Java

```java
private class OnTokenAcquired implements AccountManagerCallback<Bundle> {
    @Override
    public void run(AccountManagerFuture<Bundle> result) {
        // Get the result of the operation from the AccountManagerFuture.
        Bundle bundle = result.getResult();

        // The token is a named value in the bundle. The name of the value
        // is stored in the constant AccountManager.KEY_AUTHTOKEN.
        String token = bundle.getString(AccountManager.KEY_AUTHTOKEN);
        ...
    }
}
```

If all goes well, the `Bundle` contains a valid token in the `KEY_AUTHTOKEN` key and you're all set.

Your first request for an auth token might fail, for several reasons:

*   An error in the device or network caused `AccountManager` to fail.
*   The user decided not to grant your app access to the account.
*   The stored account credentials aren't sufficient to gain access to the account.
*   The cached auth token has expired.

Applications can handle the first two cases trivially, usually by simply showing an error message to the user. If the network is down or the user decided not to grant access, there's not much that your application can do about it. The last two cases are a little more complicated, because well-behaved applications are expected to handle these failures automatically.

The third failure case, having insufficient credentials, is communicated via the `Bundle` you receive in your `AccountManagerCallback` (`OnTokenAcquired` from the previous example). If the `Bundle` includes an `Intent` in the `KEY_INTENT` key, then the authenticator is telling you that it needs to interact directly with the user before it can give you a valid token.

There may be many reasons for the authenticator to return an `Intent`. It may be the first time the user has logged in to this account. Perhaps the user's account has expired and they need to log in again, or perhaps their stored credentials are incorrect. Maybe the account requires two-factor authentication or it needs to activate the camera to do a retina scan. It doesn't really matter what the reason is. If you want a valid token, you're going to have to fire off the `Intent` to get it.

### Kotlin

```kotlin
private inner class OnTokenAcquired : AccountManagerCallback<Bundle> {

    override fun run(result: AccountManagerFuture<Bundle>) {
        val launch: Intent? = result.getResult().get(AccountManager.KEY_INTENT) as? Intent
        if (launch != null) {
            startActivityForResult(launch, 0)
        }
    }
}
```

### Java

```java
private class OnTokenAcquired implements AccountManagerCallback<Bundle> {
    @Override
    public void run(AccountManagerFuture<Bundle> result) {
        ...
        Intent launch = (Intent) result.getResult().get(AccountManager.KEY_INTENT);
        if (launch != null) {
            startActivityForResult(launch, 0);
            return;
        }
    }
}
```

Note that the example uses `startActivityForResult()`, so that you can capture the result of the `Intent` by implementing `onActivityResult()` in your own activity. This is important: If you don't capture the result from the authenticator's response `Intent`, it's impossible to tell whether the user has successfully authenticated.

If the result is `RESULT_OK`, then the authenticator has updated the stored credentials so that they are sufficient for the level of access you requested, and you should call `AccountManager.getAuthToken()` again to request the new auth token.

The last case, where the token has expired, is not actually an `AccountManager` failure. The only way to discover whether a token is expired is to contact the server, and it would be wasteful and expensive for `AccountManager` to continually go online to check the state of all of its tokens. So this is a failure that can only be detected when an application like yours tries to use the auth token to access an online service.

Connect to the online service
-----------------------------

The example below shows how to connect to a Google server. Since Google uses the industry standard OAuth2 protocol to authenticate requests, the techniques discussed here are broadly applicable. Keep in mind, though, that every server is different. You may find yourself needing to make minor adjustments to these instructions to account for your specific situation.

The Google APIs require you to supply four values with each request: the API key, the client ID, the client secret, and the auth key. The first three come from the Google API Console website. The last is the string value you obtained by calling `AccountManager.getAuthToken()`. You pass these to the Google Server as part of an HTTP request.

### Kotlin

```kotlin
val url = URL("https://www.googleapis.com/tasks/v1/users/@me/lists?key=$your_api_key")
val conn = url.openConnection() as HttpURLConnection
conn.apply {
    addRequestProperty("client_id", your client id)
    addRequestProperty("client_secret", your client secret)
    setRequestProperty("Authorization", "OAuth $token")
}
```

### Java

```java
URL url = new URL("https://www.googleapis.com/tasks/v1/users/@me/lists?key=" + your_api_key);
URLConnection conn = (HttpURLConnection) url.openConnection();
conn.addRequestProperty("client_id", your client id);
conn.addRequestProperty("client_secret", your client secret);
conn.setRequestProperty("Authorization", "OAuth " + token);
```

If the request returns an HTTP error code of 401, then your token has been denied. As mentioned in the last section, the most common reason for this is that the token has expired. The fix is simple: call `AccountManager.invalidateAuthToken()` and repeat the token acquisition process one more time.

Because expired tokens are such a common occurrence, and fixing them is so easy, many applications just assume the token has expired before even asking for it. If renewing a token is a cheap operation for your server, you might prefer to call `AccountManager.invalidateAuthToken()` before the first call to `AccountManager.getAuthToken()`, and spare yourself the need to request an auth token twice.