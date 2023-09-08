# Per-app language preferences 

![](https://developer.android.com/static/images/about/versions/13/app-languages.png)

Per-app languages in system settings

In many cases, multilingual users set their system language to one language—such as English—but they want to select other languages for specific apps, such as Dutch, Chinese, or Hindi. To help apps provide a better experience for these users, Android 13 introduces the following features for apps that support multiple languages:

*   **System settings**: A centralized location where users can select a preferred language for each app.
    
    Your app must declare the `android:localeConfig` attribute in your app's manifest to tell the system that it supports multiple languages. To learn more, see the instructions for creating a resource file and declaring it in your app's manifest file.
    
*   **Additional APIs**: These public APIs, such as the `setApplicationLocales()`) and `getApplicationLocales()`) methods in `LocaleManager`, let apps set a different language from the system language at runtime.
    
    These APIs automatically sync with system settings; therefore, apps that use these APIs to create custom in-app language pickers will ensure their users have a consistent user experience regardless of where they select their language preferences. The public APIs also help you reduce the amount of boilerplate code, they support split APKs, and they support Auto Backup for Apps to store app-level user language settings.
    
    For backward compatibility with previous Android versions, equivalent APIs are also available in AndroidX. We recommend using Appcompat 1.6.0-beta01 or higher.
    

Overview of implementing this feature
-------------------------------------

The following table shows recommended implementations based on different use cases.

Use case

Recommended implementation

Your app doesn't have an in-app language picker

1.  Use the `android:localeConfig` attribute in your app's manifest to add your app’s languages to phone settings.
2.  Optionally, if you want to add an in-app language picker: use the AndroidX library and opt in to our API implementation to support backward compatibility through `autoStoreLocales`.

Your app already has an in-app language picker

1.  Use the `android:localeConfig` attribute in your app's manifest to add your app’s languages to phone settings.
2.  Migrate your app's custom logic to use the public APIs to ensure users see a consistent experience.
3.  Handle the following corner cases:

1.  Call `AppCompatDelegate.setApplicationLocales()` the first time your app is run on a device running Android 13.
2.  Call `AppCompatDelegate.setApplicationLocales()` to provide pre-existing user-requested locales to the system for the following cases:
    *   If you opt your app in to auto-storage for Android 12 (API level 32) and lower
    *   If your app needs to migrate data from a custom backup storage location

System settings for users
-------------------------

Starting in Android 13, Android includes a centralized location in phone settings for setting per-app language preferences. To ensure your app's languages are configurable in system settings on devices running Android 13 or higher, create a `locales_config` XML file and add it your app's manifest using the `android:localeConfig` attribute. Omitting the `android:localeConfig` manifest entry signals that users shouldn't be able to set your app's language independent of their system language within their phone settings.

### Use `android:localeConfig` to add supported languages to phone settings

To add your app's supported languages to a user's phone settings:

1.  Create a file called `res/xml/locales_config.xml` and specify your app’s languages, including your app's ultimate fallback locale, which is the locale specified in `res/values/strings.xml`.
    
    To form the locale names, combine the language code with the optional script and region codes, separating each with a dash.
    
    *   Language: Use the two- or three-letter ISO 639-1 code.
        
    *   Script (optional): Use the ISO 15924 code.
        
    *   Region (optional): Use either the two-letter ISO 3166-1-alpha-2 code or three-digit UN_M.49 code.
        
    
    See the suggested format in the sample `locale_config.xml`file for a list of the most commonly-used locales.
    
    For example, format the `locales_config.xml` file like this for an app that supports the following languages:
    
    *   English (United States) as the ultimate fallback locale
    *   English (United Kingdom)
    *   French
    *   Japanese
    *   Chinese (Simplified, Macau)
    *   Chinese (Traditional, Macau)
  
```xml    
        <?xml version="1.0" encoding="utf-8"?>
        <locale-config xmlns:android="http://schemas.android.com/apk/res/android">
           <locale android:name="en"/>
           <locale android:name="en-GB"/>
           <locale android:name="fr"/>
           <locale android:name="ja"/>
           <locale android:name="zh-Hans-MO"/>
           <locale android:name="zh-Hant-MO"/>
        </locale-config>
```        
    
1.  In the manifest, add a line pointing to this new file:

```xml    
        <manifest>
            ...
            <application
                ...
                android:localeConfig="@xml/locales_config">
            </application>
        </manifest>
```

### Specify supported languages in Gradle

If not already present, specify the same languages using the `resConfigs` property in your app's module-level `build.gradle` file:

```groovy
  android {
      defaultConfig {
          ...
          resConfigs "en", "en-GB", "fr", "ja", "zh-Hans-MO", "zh-Hant-MO"
      }
  }
 ```

Kotlin:

```
  android {
      defaultConfig {
          ...
          resConfigs("en", "en-GB", "fr", "ja", "zh-Hans-MO", "zh-Hant-MO")
      }
  }
  ```

When the `resConfigs` property is present, the build system only includes language resource in the APK for these specified languages, preventing translated strings from being included from other libraries that might support languages that your app does not support. For more information, see specify the languages your app supports.

### How users select an app language in system settings

Users can select their preferred language for each app through the system settings. They can access these settings in two different ways:

*   Access through the **System** settings
    
    **Settings > System > Languages & Input > App Languages > (select an app)**
    
*   Access through **Apps** settings
    
    **Settings > Apps > (select an app) > Language**
    

### Known issues

Here are known issues to keep in mind as you test your app:

*   If you're using Android Gradle plugin (AGP) version 7.3.0-alpha07 through 7.3.0-beta02 or 7.4.0-alpha01 through 7.4.0-alpha03, you might encounter an issue that causes resource linking to fail when you declare `android:localeConfig` in your app's manifest file. This issue has been resolved in later versions of AGP and the Android SDK. If you're encountering this issue, use AGP 7.3.0-beta04 or higher, or AGP 7.4.0-alpha05 or higher, with SDK version 33 (`compileSdk = 33`).

Handle in-app language pickers
------------------------------

For apps that already have an in-app language picker or want to use one, use the public APIs instead of custom app logic to handle setting and getting a user's preferred language for your app. If you use the public APIs for your in-app language picker, the device's system settings are automatically updated to match whichever language the user selects through your in-app experience.

For backward compatibility with previous Android versions, we strongly recommend using the AndroidX support library when implementing an in-app language picker. However, you can also implement the framework APIs directly if you need to.

### Implement using the AndroidX support library

Use the `setApplicationLocales()`) and `getApplicationLocales()`) methods in Appcompat 1.6.0-beta01 or higher.

For example, to set a user's preferred language, you would ask the user to select a locale in the language picker, then set that value in the system:

Kotlin:

```kotlin
val appLocale: LocaleListCompat = LocaleListCompat.forLanguageTags("xx-YY")
// Call this on the main thread as it may require Activity.restart()
AppCompatDelegate.setApplicationLocales(appLocale)
```

Java:

```java
LocaleListCompat appLocale = LocaleListCompat.forLanguageTags("xx-YY");
// Call this on the main thread as it may require Activity.restart()
AppCompatDelegate.setApplicationLocales(appLocale);
```

> Note that calling `setApplicationLocales()` recreates your `Activity`, unless your app handles locale configuration changes by itself.

Use `AppCompatDelegate.getApplicationLocales()`) to retrieve the user's preferred locale. The user might have selected their app locale from system settings or from your in-app language picker.

#### Support Android 12 and lower

To support for devices running Android 12 (API level 32) and lower, tell AndroidX to handle locale storage by setting an `autoStoreLocales` value to `true` and `android:enabled` to `false` in the manifest entry for your app's `AppLocalesMetadataHolderService` service, as shown in the following code snippet:

```xml
    <application
      ...
      <service
        android:name="androidx.appcompat.app.AppLocalesMetadataHolderService"
        android:enabled="false"
        android:exported="false">
        <meta-data
          android:name="autoStoreLocales"
          android:value="true" />
      </service>
      ...
    </application>
```    

Note that setting an `autoStoreLocales` value to `true` causes a blocking read on the main thread and might cause a `StrictMode` `diskRead` and `diskWrite` violation if you are logging thread violations. See `AppCompatDelegate.setApplicationLocales()`) for more information.

##### Custom storage handling

Omitting the manifest entry or setting `autoStoreLocales` to `false` signals that you are handling your own storage. In this case, you must provide the stored locales before `onCreate` in the activity lifecycle and gate calls to `AppCompatDelegate.setApplicationLocales()` in Android 12 (API level 32) or lower.

If your app has a custom locale storage location, we recommend using a one-time handoff between your custom locale storage solution and `autoStoreLocales` so users continue to enjoy your app in the language they prefer. This is especially applicable in cases when your app is first run after a device has upgraded to Android 13. In this case, you can provide pre-existing, user-requested locales by retrieving the locales from your custom storage and passing the locales into `AppCompatDelegate.setApplicationLocales()`.

### Implement using the Android framework APIs

While we strongly recommend that you use the AndroidX support library to implement in-app language pickers, you can also use the `setApplicationLocales()`) and `getApplicationLocales()`) methods in the Android framework for devices running Android 13.

For example, to set a user's preferred language, you would ask the user to select a locale in the language picker, then set that value in the system:

```kotlin
    // 1. Inside an activity, in-app language picker gets an input locale "xx-YY"
    // 2. App calls the API to set its locale
    mContext.getSystemService(LocaleManager.class
        ).setApplicationLocales(newLocaleList(Locale.forLanguageTag("xx-YY")));
    // 3. The system updates the locale and restarts the app, including any configuration updates
    // 4. The app is now displayed in "xx-YY" language
 ```   

To get a user's current preferred language to display in the language picker, your app can get the value back from the system:

```kotlin
    // 1. App calls the API to get the preferred locale
    LocaleList currentAppLocales =
        mContext.getSystemService(LocaleManager.class).getApplicationLocales();
    // 2. App uses the returned LocaleList to display languages to the user
    
```

Additional best practices
-------------------------

Take note of the following best practices.

### Consider language when invoking an intent in another app

Language-focused intents might allow you to specify the language you want the invoked app to be in. One example is the `EXTRA_LANGUAGE` feature from the Speech Recognizer API.

Consider adding the Accept-Language Header through the `Browser.EXTRA_HEADERS` to open a web page in your app's language when invoking a Chrome Custom tab.

Sample locale_config.xml file
------------------------------

By default, Android includes system-level translations in the Android Open Source Project (AOSP) for a standard set of the most commonly-used locales. The sample `locale_config.xml` file that's included in this section shows the suggested format for each of these locales. Reference this sample file to help you construct your own `locale_config.xml` file for the set of languages that your app supports.

```xml
    <?xml version="1.0" encoding="utf-8"?>
    <locale-config xmlns:android="http://schemas.android.com/apk/res/android">
       <locale android:name="af"/> <!-- Afrikaans -->
       <locale android:name="am"/> <!-- Amharic -->
       <locale android:name="ar"/> <!-- Arabic -->
       <locale android:name="as"/> <!-- Assamese -->
       <locale android:name="az"/> <!-- Azerbaijani -->
       <locale android:name="be"/> <!-- Belarusian -->
       <locale android:name="bg"/> <!-- Bulgarian -->
       <locale android:name="bn"/> <!-- Bengali -->
       <locale android:name="bs"/> <!-- Bosnian -->
       <locale android:name="ca"/> <!-- Catalan -->
       <locale android:name="cs"/> <!-- Czech -->
       <locale android:name="da"/> <!-- Danish -->
       <locale android:name="de"/> <!-- German -->
       <locale android:name="el"/> <!-- Greek -->
       <locale android:name="en-AU"/> <!-- English (Australia) -->
       <locale android:name="en-CA"/> <!-- English (Canada) -->
       <locale android:name="en-GB"/> <!-- English (United Kingdom) -->
       <locale android:name="en-IN"/> <!-- English (India) -->
       <locale android:name="en-US"/> <!-- English (United States) -->
       <locale android:name="en-XA"/> <!-- English (Pseudo-Accents) -->
       <locale android:name="es"/> <!-- Spanish (Spain) -->
       <locale android:name="es-US"/> <!-- Spanish (United States) -->
       <locale android:name="et"/> <!-- Estonian -->
       <locale android:name="eu"/> <!-- Basque -->
       <locale android:name="fa"/> <!-- Farsi -->
       <locale android:name="fi"/> <!-- Finnish -->
       <locale android:name="fr"/> <!-- French (France) -->
       <locale android:name="fr-CA"/> <!-- French (Canada) -->
       <locale android:name="gl"/> <!-- Galician -->
       <locale android:name="gu"/> <!-- Gujarati -->
       <locale android:name="hi"/> <!-- Hindi -->
       <locale android:name="hr"/> <!-- Croatian -->
       <locale android:name="hu"/> <!-- Hungarian -->
       <locale android:name="hy"/> <!-- Armenian -->
       <locale android:name="in"/> <!-- Indonesian -->
       <locale android:name="is"/> <!-- Icelandic -->
       <locale android:name="it"/> <!-- Italian -->
       <locale android:name="iw"/> <!-- Hebrew -->
       <locale android:name="ja"/> <!-- Japanese -->
       <locale android:name="ka"/> <!-- Georgian -->
       <locale android:name="kk"/> <!-- Kazakh -->
       <locale android:name="km"/> <!-- Khmer -->
       <locale android:name="kn"/> <!-- Kannada -->
       <locale android:name="ko"/> <!-- Korean -->
       <locale android:name="ky"/> <!-- Kyrgyz -->
       <locale android:name="lo"/> <!-- Lao -->
       <locale android:name="lt"/> <!-- Lithuanian -->
       <locale android:name="lv"/> <!-- Latvian -->
       <locale android:name="mk"/> <!-- Macedonian -->
       <locale android:name="ml"/> <!-- Malayalam -->
       <locale android:name="mn"/> <!-- Mongolian -->
       <locale android:name="mr"/> <!-- Marathi -->
       <locale android:name="ms"/> <!-- Malay -->
       <locale android:name="my"/> <!-- Burmese -->
       <locale android:name="my-MM"/> <!-- Burmese (Myanmar) -->
       <locale android:name="nb"/> <!-- Norwegian -->
       <locale android:name="ne"/> <!-- Nepali -->
       <locale android:name="nl"/> <!-- Dutch -->
       <locale android:name="or"/> <!-- Odia -->
       <locale android:name="pa"/> <!-- Punjabi -->
       <locale android:name="pl"/> <!-- Polish -->
       <locale android:name="pt-BR"/> <!-- Portuguese (Brazil) -->
       <locale android:name="pt-PT"/> <!-- Portuguese (Portugal) -->
       <locale android:name="ro"/> <!-- Romanian -->
       <locale android:name="ru"/> <!-- Russian -->
       <locale android:name="si"/> <!-- Sinhala -->
       <locale android:name="sk"/> <!-- Slovak -->
       <locale android:name="sl"/> <!-- Slovenian -->
       <locale android:name="sq"/> <!-- Albanian -->
       <locale android:name="sr"/> <!-- Serbian (Cyrillic) -->
       <locale android:name="sr-Latn"/> <!-- Serbian (Latin) -->
       <locale android:name="sv"/> <!-- Swedish -->
       <locale android:name="sw"/> <!-- Swahili -->
       <locale android:name="ta"/> <!-- Tamil -->
       <locale android:name="te"/> <!-- Telugu -->
       <locale android:name="th"/> <!-- Thai -->
       <locale android:name="tl"/> <!-- Filipino -->
       <locale android:name="tr"/> <!-- Turkish -->
       <locale android:name="uk"/> <!-- Ukrainian -->
       <locale android:name="ur"/> <!-- Urdu -->
       <locale android:name="uz"/> <!-- Uzbek -->
       <locale android:name="vi"/> <!-- Vietnamese -->
       <locale android:name="zh-CN"/> <!-- Chinese (Simplified) -->
       <locale android:name="zh-HK"/> <!-- Chinese (Hong Kong) -->
       <locale android:name="zh-TW"/> <!-- Chinese (Traditional) -->
       <locale android:name="zu"/> <!-- Zulu -->
    </locale-config>
    ```