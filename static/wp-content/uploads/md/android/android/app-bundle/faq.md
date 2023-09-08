# Android App Bundle frequently asked questions

About Android App Bundles
-------------------------

### What is the Android App Bundle (AAB)?

Launched in 2018, the Android App Bundle (AAB) is a publishing format for Android that is supported by Google Play and other app stores, and by build tools such as Android Studio, Bazel, Buck, Cocos Creator, Gradle, Unity, and Unreal.

### What's the difference between AABs and APKs?

App bundles are only for publishing and cannot be installed on Android devices. The Android package (APK) is Android's installable, executable format for apps. App bundles must be processed by a distributor into APKs so that they can be installed on devices.

### Is the AAB a proprietary format that can only be used on Google Play?

No, the AAB is not proprietary. The app bundle is open source, so any app store can support it. Bundles are supported by Google Play and some other app stores.

### Does creating AABs prevent me from publishing to other app stores?

No, you are not prevented from publishing to other app stores. When you build your app, you can build AABs and APKs at the same time depending on what publishing format is required for each app store.

### How much work is required to use an AAB?

For most apps, building an AAB is equivalent effort to building an APK, since it simply involves choosing AAB instead of APK at build time. For some apps, there might be some changes needed to get the full benefits of AABs.

### Are any developers using AABs already?

Yes. Over 1 million apps and games are using app bundles to publish their production releases on Google Play including the majority of popular apps, representing billions of active installs. If you use Google Play to install apps, many of the apps on your device were published as app bundles.

### Does the AAB prevent users from "sideloading" apps?

No, AABs do not prevent users from installing APKs from any source. Since AAB is just a publishing format, they don't change how the Android platform works.

There have always been rare cases on Android when APKs cannot directly transfer from one device to another, regardless of whether the app is published via APKs or AABs. Specifically, when APKs have been optimized for a device (for example, for a specific chip architecture) then transferring those APKs directly to another device may encounter issues if the target device doesn't match the properties of the original device. In these situations, an APK or set of APKs that are appropriate for the target device need to be installed.

Google Play changes
-------------------

### What changed for Google Play starting August 2021?

Having adopted AABs in 2018 and having seen exponential adoption by developers in the years since, Google Play made AABs the required format for new apps starting August 2021. Google Play users benefit from smaller, faster apps and developers benefit from streamlined releases and ongoing investment in new delivery features.

### What hasn't changed for Android?

APKs have not changed and there are currently no plans to change them in the Android platform. APKs are the executable container of apps on Android, they are still what you install on Android devices (whether the app was published with an AAB or an APK).

### Why change the publishing format for Google Play?

APKs were the publishing format on Play for 10 years before it became evident they were no longer fit for this purpose. Apps had grown in size by 5x in 5 years; 1 in 5 Android devices had run out of device storage; and developers faced growing complexity dealing with Android's diverse device ecosystem. Developers could upload giant APKs for all possible device types and ship unused code/resources at the cost of losing users, or they could try to manage the complex and time-consuming task of multi-APK releases. This led Google to work closely with developers to devise an ecosystem solution: the Android App Bundle, a format specifically designed for publishing. AABs can be used to make apps smaller (apps using AABs on Google Play are 15% smaller on average versus a universal APK), which means faster installs for users and more installs for developers. AABs reduce release complexity and save developers time. More fundamentally, separating the publishing format from the executable format also unlocked the ability for app stores to innovate by offering new distribution features that improve user experiences. For example, Google Play is now able to offer developers on-demand delivery modes that reduce waiting times and enable more device-tailored apps. This separation in software distribution enables innovation that wouldn’t be possible by using the executable as both the publishing and distribution format.

### Can I still publish to multiple app stores?

Yes, you can publish to multiple app stores whether or not you use AABs. You can publish AABs on Google Play and other app stores that support AABs at the same time as publishing APKs on other app stores or websites that don't support AABs.

### Does the AAB requirement apply to private apps published to managed Google Play?

No, private apps published to managed Google Play can publish with either APKs or AABs. When creating a new private app, you can choose **Change app signing key** and opt out of Play App Signing if you want to publish a self-signed, private APK.

About Play App Signing
----------------------

### What is Play App Signing?

Every APK on Android must be cryptographically signed with an app signing key in order to be installable. The Android platform uses the key to ensure that any app updates match the installed app on a device so that, after an initial install happens, each app update comes from the same key holder. This reduces the risk of malicious app updates. Launched in 2017, Play App Signing is Google Play's key management service that protects and manages Play developers' app signing keys for their Play-distributed apps. In addition, Play App Signing performs the signing operation on the APKs that Play generates from uploaded AABs. In August 2021, Play App Signing became required for new apps so that they can use AABs.

### Why did Google launch Play App Signing?

For years, app signing keys were a challenge for Play developers. Losing the key would mean no longer being able to deliver app updates to users and a key becoming compromised puts users at risk of malicious updates. It's common in software distribution for distribution channels to store and manage the keys for the software they distribute because it mitigates these risks. Play App Signing was launched in 2017 to eliminate the risk of losing Play distribution keys, to make it possible to protect Play users following a key compromise, and to give developers' the benefit of Google's ongoing security investment.

### How does Google ensure the security of Play App Signing?

Google protects developers keys in the same industry-leading, secure infrastructure used to protect Google's own keys. Keys are stored encrypted on locked-down, dedicated key management servers with strict ACLs and tamper-evident audit trails covering all operations. Google's cloud security operations and best practices are detailed online.

### Can I choose the app signing key that Play uses for my app?

Yes, when you create a new app you can either choose to have Google generate and store an app signing key on your behalf or you can choose your own app signing key and upload a copy of it.

### I want to use the same app signing key for Play and other app stores. Is this still possible?

If you've decided to use the same signing key on multiple app stores after considering how app updates work, then it's still possible to do so. Remember, this will allow each app store to perform cross-store app updates for your app. You have two options:

*   You can generate a key locally and upload a copy of it to Play. That way, you can use the same key used by Google Play when you build your app for other app stores.
*   You can use a Google-generated key for Play App Signing, then download distribution APKs from Play Console that are signed with the Google-generated key and use those APKs for distribution on other app stores or websites.

No, you are not required to share any key you were using before August 2021 with Google. When you create a new app, you can choose a new key.

### Can I use Play App Signing for an app created before August 2021 without providing a copy of my app signing key?

Yes, Play App Signing will soon have an additional 'key upgrade' option for apps created before August 2021. This allows the app to start using Play App Signing with a new app signing key. However, in order to use this option, after you perform the upgrade you will be required to upload two things in each release: an app bundle and a legacy APK signed with your old app signing key. Play will use your AABs to generate APKs signed with the upgraded key for new installs and their updates; at the same time Play will use your legacy APKs for app updates to users who already have your app installed. Over time, the legacy installs will migrate to the upgraded key (e.g. when users move to a new mobile device).

### Is there a way to use the same app signing key for apps created before August 2021 and apps created after August 2021?

It's generally not recommended to use the same app signing key for multiple apps, it's more secure to use a unique key for each app. However, if you need to use the same app signing key for multiple apps this is possible. Either, you can upload a copy of the existing app signing key when configuring Play App Signing. Or, if you don't want to share the existing app signing key, you can use the upcoming 'key upgrade' option for your pre-August 2021 app to start using Play App Signing. That way both your pre-August 2021 app and your post-August 2021 app can use the same new key.

### Can I ever change the app signing key used by Play App Signing?

Yes, apps can change their key by requesting a key upgrade for new installs in Play Console (note that there are some technical constraints so it's not possible for all apps). Google Play will then use your new key to sign new installs and app updates while automatically using your legacy app signing key to sign updates for users who installed your app before the key upgrade. Soon, Play App Signing key upgrade will also add support for APK Signature Scheme v3 key rotation. This will make key upgrade possible for more apps and also help upgraded keys reach more users.

### How can I check that Google Play hasn't made unexpected changes to my code?

At any time, you can download and inspect artifacts from Google Play and from app bundle explorer in Play Console. In addition, the Play Developer API will soon offer the ability to verify APKs before you commit them to a release track. You can also use an optional feature called code transparency for app bundles. With code transparency, you and your end-users can hold an app store like Google Play to account for the code it delivers.

### How does code transparency for app bundles work?

Code transparency is an optional feature that makes it possible to hold an app store distributing your app to account for the code it delivers. To use code transparency, at build time you generate a code transparency file in your app that represents your code (specifically it's a file that contains hashes of your app's code). You sign it with your own private code transparency key that only you hold. You never have to provide your code transparency key to Google. Then, on a device, you can inspect an installed APK and verify that the code transparency file you signed still matches the APK's code. This gives you assurance that, even if the APK itself was re-signed during distribution, the code verified by code transparency hasn't been modified. If there is a mismatch, then that's evidence that the code was changed during distribution. Code transparency doesn't replace APK signatures and is not part of the Android platform.

Publishing large apps and games on Google Play
----------------------------------------------

### What are Google Play app size limits when using AABs?

The maximum compressed download size for any set of APKs generated from an AAB is 150MB. That is, Google Play will generate all possible APKs from your AAB. Then, Google Play checks that the maximum compressed download size that any individual device receives is not over 150MB. The AAB that you upload can be many times larger than this, something that was not possible on Google Play with APKs.

### Does Google Play support expansion files (OBBs) for AABs?

No, Google Play does not support expansion files for AABs. Expansion files (OBBs) are a legacy Google Play-specific solution for publishing large apps and games using APKs. There are Google and third party alternatives for AABs larger than 150MB.

### How do I publish an app or game larger than 150MB on Google Play?

Large apps and games using AABs can either use Play delivery services such as Play Asset Delivery or Play Feature Delivery to exceed the 150MB size limit or they can use third party content delivery networks.

### What benefits does Play Asset Delivery offer over expansion files (OBBs)?

On Google Play, APKs required separate expansion files (OBBs) to serve additional resources to users. However, because OBBs were not signed and are stored in the app's external storage, they're not very secure. With Play Asset Delivery (PAD), games larger than 150MB can replace OBBs by publishing the entire game as a single app bundle on the Play Store. In addition to offering a smoother publishing process and flexible delivery modes, PAD means updates require less device storage. As a result, it can drive higher install rates. Finally, with ASTC now supported on ~80% of devices, PAD's texture compression format targeting feature lets you serve ASTC to devices that support it. You can target the widest range of devices while making efficient use of the available hardware and device storage.

Google Play delivery features unlocked by AABs
----------------------------------------------

### What are examples of new features that Play is offering developers using AABs?

App stores like Google Play process AABs into installable APKs. Being responsible for the APKs makes it possible to offer new features and services that bring benefits to developers and users. Play already offers such services that are already widely used and valued by developers, two examples are Play Feature Delivery and Play Asset Delivery.

### What is Play Feature Delivery?

One of the features of app bundles is that they allow separating an app into multiple modules, called "feature modules". These modules can then be dynamically delivered to users and devices at different times (unlike in the past when everything had to be delivered as one file at install time). Play Feature Delivery gives you the ability to customize what feature modules are delivered to which device and when, with install-time, conditional, and on-demand delivery modes. This lets you reduce your app size, leading to more installs, and tailor your app experience. For example, you could deliver a rarely used feature like customer support on-demand to the users who need it instead of at install time, reducing the size of your initial install for all users. Or you could deliver your complete app experience to high-end devices while delivering a smaller app experience with optional, on-demand features to entry-level devices that have data and device storage constraints.

### What is Play Asset Delivery?

Play Asset Delivery allows game developers to improve the user experience and reduce user waiting time by dynamically delivering large assets at the optimal time. Games using Play Asset Delivery can also make use of texture compression format targeting, so your users only get the assets suitable for their device, with no wasted space or bandwidth.

### Are these Play delivery features available on other app stores?

No, Play Feature Delivery and Play Asset Delivery involve apps and games directly interfacing with the Google Play Store. These optional services are examples of Play differentiating itself as an app store and bringing additional value and usefulness to Play developers and users. Other app stores using app bundles and APKs offer their own app store services to developers.
