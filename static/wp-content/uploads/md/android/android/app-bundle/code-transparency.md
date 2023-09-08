# Code transparency for app bundles

Code transparency is an optional code signing and verification mechanism for apps published with the Android App Bundle. It uses a code transparency signing key, which is solely held by the app developer.

Code transparency is independent of the signing scheme used for app bundles and APKs. The code transparency key is separate and different from the app signing key that is stored on Google’s secure infrastructure when using Play App Signing.

How code transparency works
---------------------------

The process works by including a code transparency file in the bundle after it has been built, but before it is uploaded to Play Console for distribution.

The code transparency file is a JSON Web Token (JWT) that contains a list of DEX files and native libraries included in the bundle, and their hashes. It is then signed using the code transparency key that is held only by the developer.

![Code transparency diagram](https://developer.android.com/static/images/app-bundle/code_transparency_diagram.png)

This code transparency file is propagated to the base APK built from the app bundle (specifically to the main split of the base module). It can then be verified that:

*   All DEX and native code files present in the APKs have matching hashes in the code transparency file.
*   The public key component of the code transparency signing key in the app matches the public key of the developer (which must be provided by the developer over a separate, secure channel).

Together, this information verifies that the code contained in the APKs matches what the developer had intended, and that it has not been modified.

The code transparency file does not verify resources, assets, the Android Manifest, or any other files that are not DEX files or native libraries contained in the `lib/` folder.

Code transparency verification is used solely for the purpose of inspection by developers and end users, who want to ensure that code they're running matches the code that was originally built and signed by the app developer.

Known limitations
-----------------

There are certain situations when code transparency cannot be used:

*   Apps that specify the `sharedUserId` attribute in the manifest. Such applications may share their process with other applications, which makes it difficult to make assurances about the code they're executing.
*   Apps using anti-tamper protection or any other service that makes code changes after the code transparency file is generated will cause the code transparency verification to fail.
*   Apps that use legacy Multidex on API levels below 21 (Android 5.0) and use feature modules. Code transparency will continue to work when the app is installed by Google Play on Android 5.0+ devices. Code transparency will be disabled on older OS versions.

How to add code transparency
----------------------------

Before you can add code transparency to your app, make sure that you have a private and public key pair that you can use for code transparency signing. This should be a unique key that is different from the app signing key that you use for Play App Signing, and it must be held securely and never shared outside of your organization.

If you don't have a key, you can follow the instructions in the Sign your app guide to generate one on your machine. Code transparency uses a standard keystore file, so even though the guide is for app signing, the key generation process is the same.

### Using Android Gradle plugin

Code transparency support requires Android Gradle plugin version 7.1.0-alpha03 or newer. To configure the key used for code transparency signing, add the following in the `bundle` block.

### Groovy

```groovy
// In your app module's build.gradle file:
android {
    ...
    bundle {
        codeTransparency {
            signing {
                keyAlias = "ALIAS"
                keyPassword = "PASSWORD"
                storeFile = file("path/to/keystore")
                storePassword = "PASSWORD"
            }
        }
        ...
    }
}
```

### Kotlin

```kotlin
// In your app module's build.gradle.kts file:
android {
    ...
    bundle {
        codeTransparency {
            signing {
                keyAlias = "ALIAS"
                keyPassword = "PASSWORD"
                storeFile = file("path/to/keystore")
                storePassword = "PASSWORD"
            }
        }
        ...
    }
}
```

The key used must be one that you will only use for code transparency, and not the app signing key that is used by Play App Signing.

### Using `bundletool` on the command line

Code transparency support requires bundletool version 1.7.0 or newer, which you can download from GitHub.

Run the following command to add code transparency to an Android App Bundle. The key used must be one that you will only use for code transparency, and not the app signing key that is used by Play App Signing.

```shell
    bundletool add-transparency 
      --bundle=/MyApp/my_app.aab 
      --output=/MyApp/my_app_with_transparency.aab 
      --ks=/MyApp/keystore.jks 
      --ks-pass=file:/MyApp/keystore.pwd 
      --ks-key-alias=MyKeyAlias 
      --key-pass=file:/MyApp/key.pwd
```

Alternatively, if you want to use your own signing tools, you can use bundletool to generate the unsigned code transparency file, sign it in a separate environment and inject the signature into the bundle:

```shell
    # Generate code transparency file
    bundletool add-transparency 
      --mode=generate_code_transparency_file 
      --bundle=/MyApp/my_app.aab 
      --output=/MyApp/code_transparency_file.jwt 
      --transparency-key-certificate=/MyApp/transparency.cert
    
    # Add code transparency signature to the bundle
    bundletool add-transparency 
      --mode=inject_signature 
      --bundle=/MyApp/my_app.aab 
      --output=/MyApp/my_app_with_transparency.aab 
      --transparency-key-certificate=/MyApp/transparency.cert 
      --transparency-signature=/MyApp/signature
```

Verify code transparency of an app
----------------------------------

There are different methods for verifying code against the code transparency file, depending on if you have the APKs installed on an Android device or downloaded locally to your computer.

### Using Bundletool to check an app bundle or APK set

You can use bundletool to verify code transparency in an app bundle or an APK set. Use the `check-transparency` command to print the public certificate fingerprint:

```shell
    # For checking a bundle:
    bundletool check-transparency 
      --mode=bundle 
      --bundle=/MyApp/my_app_with_transparency.aab
```

 No APK present. APK signature was not checked.
    Code transparency signature is valid. SHA-256 fingerprint of the code transparency key certificate (must be compared with the developer's public key manually): 01 23 45 67 89 AB CD EF ..
    Code transparency verified: code related file contents match the code transparency file.
    
    
### For checking a ZIP containing app's APK splits:

```shell
    bundletool check-transparency 
      --mode=apk 
      --apk-zip=/MyApp/my_app_with_transparency.zip
```

APK signature is valid. SHA-256 fingerprint of the apk signing key certificate (must be compared with the developer's public key manually): 02 34 E5 98 CD A7 B2 12 ..
    Code transparency signature is valid. SHA-256 fingerprint of the code transparency key certificate (must be compared with the developer's public key manually): 01 23 45 67 89 AB CD EF ..
    Code transparency verified: code related file contents match the code transparency file.
    

You can optionally specify the public certificate that you want to verify the bundle or APK set against, so that you don't have to compare the hashes manually:

```shell
    bundletool check-transparency 
      --mode=bundle 
      --bundle=/MyApp/my_app_with_transparency.aab 
      --transparency-key-certificate=/MyApp/transparency.cert
```

 No APK present. APK signature was not checked.
    Code transparency signature verified for the provided code transparency key certificate.
    Code transparency verified: code related file contents match the code transparency file.
    

```shell    
    bundletool check-transparency 
      --mode=apk 
      --apk-zip=/MyApp/my_app_with_transparency.zip 
      --apk-signing-key-certificate=/MyApp/apk.cert 
      --transparency-key-certificate=/MyApp/transparency.cert
```

APK signature verified for the provided apk signing key certificate.
    Code transparency signature verified for the provided code transparency key certificate.
    Code transparency verified: code related file contents match the code transparency file.
    

### Using Bundletool to check an app installed on a device

For checking an app that has been installed on an Android device, make sure the device is connected to your computer via ADB and issue to following command:

```shell
    bundletool check-transparency 
      --mode=connected_device 
      --package-name="com.my.app"
```

 APK signature is valid. SHA-256 fingerprint of the apk signing key certificate (must be compared with the developer's public key manually): 02 34 E5 98 CD A7 B2 12 ..
    Code transparency signature is valid. SHA-256 fingerprint of the code transparency key certificate (must be compared with the developer's public key manually): 01 23 45 67 89 AB CD EF ..
    Code transparency verified: code related file contents match the code transparency file.
    

The connected device transparency check can also optionally verify the signature against a public key that you specify:

```shell
    bundletool check-transparency 
      --mode=connected-device 
      --package-name="com.my.app" 
      --apk-signing-key-certificate=/MyApp/apk.cert 
      --transparency-key-certificate=/MyApp/transparency.cert
```

APK signature verified for the provided apk signing key certificate.
    Code transparency signature verified for the provided code transparency key certificate.
    Code transparency verified: code related file contents match the code transparency file.
