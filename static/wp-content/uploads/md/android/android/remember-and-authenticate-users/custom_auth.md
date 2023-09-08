# Create a custom account type

So far we've talked about accessing Google APIs, which use accounts and users defined by Google. If you have your own online service, though, it won't have Google accounts or users, so what do you do? It turns out to be relatively straightforward to install new account types on a user's device. This lesson explains how to create a custom account type that works the same way as the built-in accounts do.

Implement your custom account code
----------------------------------

The first thing you'll need is a way to get credentials from the user. This may be as simple as a dialog box that asks for a name and a password. Or it may be a more exotic procedure like a one-time password or a biometric scan. Either way, it's your responsibility to implement the code that:

1.  Collects credentials from the user
2.  Authenticates the credentials with the server
3.  Stores the credentials on the device

Typically all three of these requirements can be handled by one activity. We'll call this the authenticator activity.

Because they need to interact with the `AccountManager` system, authenticator activities have certain requirements that normal activities don't. To make it easy to get things right, the Android framework supplies a base class, `AccountAuthenticatorActivity`, which you can extend to create your own custom authenticator.

How you address the first two requirements of an authenticator activity, credential collection and authentication, is completely up to you. (If there were only one way to do it, there'd be no need for "custom" account types, after all.) The third requirement has a canonical, and rather simple, implementation:

### Kotlin

```kotlin
Account(username, your_account_type).also { account ->
    accountManager.addAccountExplicitly(account, password, null)
}
```

### Java

```java
final Account account = new Account(username, your_account_type);
accountManager.addAccountExplicitly(account, password, null);
```

Be smart about security!
------------------------

It's important to understand that `AccountManager` is not an encryption service or a keychain. It stores account credentials just as you pass them, in **plain text**. On most devices, this isn't a particular concern, because it stores them in a database that is only accessible to root. But on a rooted device, the credentials would be readable by anyone with `adb` access to the device.

With this in mind, you shouldn't pass the user's actual password to `AccountManager.addAccountExplicitly()`. Instead, you should store a cryptographically secure token that would be of limited use to an attacker. If your user credentials are protecting something valuable, you should carefully consider doing something similar.

> **Remember:** When it comes to security code, follow the "Mythbusters" rule: don't try this at home! Consult a security professional before implementing any custom account code.

Now that the security disclaimers are out of the way, it's time to get back to work. You've already implemented the meat of your custom account code; what's left is plumbing.

Extend AbstractAccountAuthenticator
-----------------------------------

In order for the `AccountManager` to work with your custom account code, you need a class that implements the interfaces that `AccountManager` expects. This class is the _authenticator class_.

The easiest way to create an authenticator class is to extend `AbstractAccountAuthenticator` and implement its abstract methods. If you've worked through the previous lessons, the abstract methods of `AbstractAccountAuthenticator` should look familiar: they're the opposite side of the methods you called in the previous lesson to get account information and authorization tokens.

Implementing an authenticator class properly requires a number of separate pieces of code. First, `AbstractAccountAuthenticator` has seven abstract methods that you must override. Second, you need to add an intent filter for `"android.accounts.AccountAuthenticator"` to your application manifest (shown in the next section). Finally, you must supply two XML resources that define, among other things, the name of your custom account type and the icon that the system will display next to accounts of this type.

You can find a step-by-step guide to implementing a successful authenticator class and the XML files in the `AbstractAccountAuthenticator` documentation.

If your authenticator activity needs any special initialization parameters, you can attach them to the intent using `Intent.putExtra()`.

Create an authenticator service
-------------------------------

Now that you have an authenticator class, you need a place for it to live. Account authenticators need to be available to multiple applications and work in the background, so naturally they're required to run inside a `Service`. We'll call this the authenticator service.

Your authenticator service can be very simple. All it needs to do is create an instance of your authenticator class in `onCreate()` and call `getIBinder()` in `onBind()`.

Don't forget to add a `<service>` tag to your manifest file and add an intent filter for the AccountAuthenticator intent and declare the account authenticator:

```xml
<service ...>
   <intent-filter>
      <action android:name="android.accounts.AccountAuthenticator" />
   </intent-filter>
   <meta-data android:name="android.accounts.AccountAuthenticator"
             android:resource="@xml/authenticator" />
</service>
```

Distribute your service
-----------------------

You're done! The system now recognizes your account type, right alongside all the big name account types like "Google" and "Corporate." You can use the **Accounts & Sync** Settings page to add an account, and apps that ask for accounts of your custom type will be able to enumerate and authenticate just as they would with any other account type.

Of course, all of this assumes that your account service is actually installed on the device. If only one app will ever access the service, then this isn't a big deal—just bundle the service in the app. But if you want your account service to be used by more than one app, things get trickier. You don't want to bundle the service with all of your apps and have multiple copies of it taking up space on your user's device.

One solution is to place the service in one small, special-purpose APK. When an app wishes to use your custom account type, it can check the device to see if your custom account service is available. If not, it can direct the user to Google Play to download the service. This may seem like a great deal of trouble at first, but compared with the alternative of re-entering credentials for every app that uses your custom account, it's refreshingly easy.