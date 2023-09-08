# Remember your user

Everyone likes it when you remember their name. One of the simplest, most effective things you can do to make your app more lovable is to remember who your user is—especially when the user upgrades to a new device or starts carrying a tablet as well as a phone. But how do you know who your user is? And how do you recognize them on a new device?

For many applications, the answer is the `AccountManager` APIs. With the user's permission, you can use Account Manager to fetch the account names that the user has stored on their device.

Integration with the user's accounts lets you do a variety of things, such as:

*   Autofill forms with the user's email address.
*   Retrieve an ID that is tied to a user, not a device.

Determine whether AccountManager is for you
-------------------------------------------

Applications typically try to remember the user using one of three techniques:

1.  Ask the user to enter a username.
2.  Retrieve a unique device ID to remember the device.
3.  Retrieve a built-in account from `AccountManager`.

Option (1) is problematic. First, asking the user to enter something before using your app automatically makes your app less appealing. Second, there's no guarantee that the username they choose is unique.

Option (2) is less onerous for the user, but it's tricky to get right. More importantly, it only lets you remember the user on one device. Imagine the frustration of someone who upgrades to a shiny new device, only to find that your app no longer remembers them.

Option (3) is the preferred technique. Account Manager lets you get information about the accounts that are stored on the user's device. Using Account Manager lets you remember your user, no matter how many devices the user may own, by adding just a couple of extra taps to your UI.

Decide what type of account to use
----------------------------------

Android devices can store multiple accounts from many different providers. When you query `AccountManager` for account names, you can choose to filter by account type. The account type is a string that uniquely identifies the entity that issued the account. For instance, Google accounts have type `com.google`, while Twitter uses `com.twitter.android.auth.login`.

Request GET_ACCOUNTS permission
--------------------------------

In order to get a list of accounts on the device, your app needs the `GET_ACCOUNTS` permission. Add a `<uses-permission>` tag in your manifest file to request this permission:

```xml
<manifest ... >
    <uses-permission android:name="android.permission.GET_ACCOUNTS" />
    ...
</manifest>
```

Inform users and get consent
----------------------------

You can get the list of user accounts by calling either `getAccounts()`) or `getAccountsByType()`). But keep in mind that the API returns personal and sensitive user data, and any time your app accesses, collects, uses, or shares personal and sensitive data you must clearly disclose that fact to users. For apps published on Google Play, policies protecting user data require that you do the following:

1.  Disclose to the user how your app accesses, collects, uses, or shares personal and sensitive data. Learn more about acceptable disclosure and consent.
2.  Provide a privacy policy that describes your use of this data on- and off-device.

To learn more, visit the Google Play Policy about user data.

Query AccountManager for a list of accounts
-------------------------------------------

Once you decide what account type you're interested in, you need to query for accounts of that type. Get an instance of `AccountManager` by calling `AccountManager.get()`). Then use that instance to call `getAccountsByType()`.

### Kotlin

```kotlin
val am: AccountManager = AccountManager.get(this) // "this" references the current Context

val accounts: Array<out Account> = am.getAccountsByType("com.google")
```

### Java

```java
AccountManager am = AccountManager.get(this); // "this" references the current Context

Account[] accounts = am.getAccountsByType("com.google");
```

This returns an array of `Account` objects. If there's more than one `Account` in the array, present a dialog asking the user to select one.

The `Account` object contains an account name, which for Google accounts is an email address. You can use this information in several ways, including:

*   As suggestions in forms, so the user doesn't need to input account information themselves.
*   As a key into your own online database of usage and personalization information.

Decide whether an account name is enough
----------------------------------------

An account name is a good way to remember the user, but the `Account` object by itself doesn't protect your data or give you access to anything besides the user's account name. If your app needs to let the user go online to access private data, you need something stronger: authentication. Learn how to authenticate to existing online services and how to write a custom authenticator so that you can install your own account types.