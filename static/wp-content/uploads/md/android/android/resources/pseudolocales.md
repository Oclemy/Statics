Test your app with pseudolocales
================================

On this page you will learn:

- Test your app with pseudolocales
  - Enable pseudolocales
  - Spot localization issues

A pseudolocale is a locale that is designed to simulate characteristics of languages that cause UI, layout, and other translation-related problems when an app is translated. Pseudolocales are created by instant and automatic translations that are readable in English for all _localizable_ messages. Un-pseudolocalized text points to untranslatable messages in your source code. Pseudolocales save time and money because you can make adjustments to the UI text and its layout before you commit your messages to the source repository to be sent for translation later. For a list of potential translation problems, see Spot Localization Issues.

**Figure 1.** English (XA) pseudolocale

![](https://developer.android.com/images/develop/pseudo-locale-example-app_2x.png)

The (Android) pseudolocale names follow standard locale naming conventions, and their locale IDs can be parsed by any BCP 47 compliant programming language. In this sense, pseudolocales are just like any other locales such as French, Chinese, Russian, and so on.

The Android platform provides the following two pseudolocales to represent Left-to-right (LTR) and right-to-left (RTL) languages:

**Figure 2.** AR (XB) pseudolocale

![](https://developer.android.com/images/develop/pseudo-locale-example-app-rtl_2x.png)

**English (XA):** Adds Latin accents to the base English UI text, expands the original text by adding non-accented text, and brackets each message unit to expose potential issues from expanded text. Potential issues can be layout breakage and badly formed message syntax as shown by one sentence split into multiple parts displaying as multiple bracketed messages. The English (XA) pseudolocale is shown in figure 1.

**AR (XB):** Sets the text direction of the original left-to-right messages to the right-to-left direction, which reverses the order of the characters in the original message. The AR (XB) pseudolocale is shown in figure 2.

Pseudolocales can help you make an RTL version of your app, even if you do not write or speak any RTL languages.

Enable pseudolocales
--------------------

Pseudolocales are usually added to developer-oriented builds. When you choose a pseudolocale on your device, all of the apps that support pseudolocales take on the characteristics of the selected pseudolocale including all the system apps such as Settings app and Quick Settings panel.

To use the Android pseudolocales, you must be running Android 4.3 (API level 18) or higher and have developer options enabled on your device.

The following procedure explains how to enable pseudolocales:

1.  In Android Studio enable pseudolocales for a specific app by adding the following configuration to your `build.gradle` file, as follows:

**Groovy**

```groovy
    android {
     ...
     buildTypes {
       debug {
         `pseudoLocalesEnabled` true
       }
     }
    }
```

**Kotlin**

```kotlin
    android {
     ...
     buildTypes.getByName("debug") {
       isPseudoLocalesEnabled = true
     }
    }
```

1.  Build and run your app.

    **Figure 3.** Select a pseudolocale

2.  Use the Settings app to select a pseudolocale according to your Android version, as follows:

    **Android 5.0 or later:**

    1.  On the device, open the Settings app and tap **Languages and input > Language preferences**.
    2.  In the **Language preferences** list, press the tab to move a pseudolocale to the top of the list to make it the active language (see figure 3).

    **Android 4.4.4 or earlier:**

    1.  On the device, open the Settings app and tap **Languages and input > Language preferences > Add a language**.
    2.  Tap a pseudolocale to add it to the **Language preferences** list.
    3.  In the **Language preferences** list, press the tab to move a pseudolocale to the top of the list to make it the active language (see figure 3).

Spot localization issues
------------------------

Pseudolocales provide a time-saving and effective way to spot potential localizability issues in the UI by helping you to identify problems in the following areas:

*   Hard-coded strings, which cannot be sent to translation, display as unaccented text in the pseudolocale to make them easy to notice.
*   UI layout issues caused by text expansion showing where the UI can break due to text length.
*   String concatenation, which displays as one message split across 2 or more brackets. This can make correct translation difficult because translators have to translate each part independently without knowing that the parts are related. String concatenation can also make correct translation impossible because different languages might require a different order of parts or a completely different sentence structure. For example, some languages such as Japanese, Korean, and Tamil place the verb at the end. When the sentence is concatenated, translators cannot change the word order as needed.

*   Bi-directional (BIDI) text problems, such as when content in one text direction includes an inline phrase in the opposite text direction making the string difficult to read.

*   Right-to-left (RTL) problems such as elements not being mirrored. For example, a UI element did not move to the left, text did not reverse and move to the left, or misplaced punctuation, such as "pseudolocales rule!" changing to "elur selacoloduesp!" when it should instead be "!elur selacoloduesp".