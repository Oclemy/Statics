# Review how your app collects and shares user data

The Play Console includes a **Data safety** form on the **App content** page. In this form, you explain to users which types of user data your app collects and shares. This information helps promote data transparency and user trust.

To help you fill out this form, this guide provides examples of places in your app's code where your app may collect different types of user data. In particular, it provides examples of permission declarations and API calls that your app may use to collect or share a particular type of user data, which would require you to declare that collection or sharing in the **Data safety** form.

The guide has the following format:

*   The main headings list the different categories of data types that are available in the **Data safety** form, along with a non-exhaustive list of ways that your app, or a library included in your app, may access user data related to that category.
*   The sub-headings list the different data types that are available in the form, to remind you of the data types that are part of a particular category.

While we are offering this guidance to make it easier for you to complete the **Data safety** form, you alone are responsible for making complete and accurate declarations in your app's Play store listing. Only you possess all the information required to complete the **Data safety** form. Google cannot make determinations on behalf of developers regarding how they collect or handle user data based on their particular usage and practices. When we become aware of a discrepancy between your app behavior and your declaration, we may take appropriate action, including enforcement action.

The details in this guidance are subject to change as we continue working with developers and to improve both developer and user experiences. For more information, read this blog post.

General guidelines
------------------

In addition to the specific suggestions listed in the following sections, there may be more general indicators that your app, or a library included in your app, collects or shares user data. These indicators include, but aren't limited to, the following:

*   UI components that hide text input, such as password entry fields.
*   Workflows that request the user to authenticate using biometrics.
*   Forms and alerts that prompt the user to enter user data, confirm a submission, or make a choice.
*   Code that controls the behavior of a `WebView` element in your app.
*   Support for the autofill framework.
*   Use of the data access auditing APIs.

Location
--------

There are different ways that your app, or a library included in your app, may access user data related to location. The following list provides several examples but isn't exhaustive:

*   Declares at least one of the following permissions:
    *   `ACCESS_COARSE_LOCATION`
    *   `ACCESS_FINE_LOCATION`
    *   `ACCESS_MEDIA_LOCATION`
*   Derives location information from an IP address.

### Approximate location

User or device physical location to an area greater than or equal to 3 square kilometers, such as the city a user is in, or location provided by Android's `ACCESS_COARSE_LOCATION` permission.

### Precise location

User or device physical location within an area less than 3 square kilometers, such as location provided by Android's `ACCESS_FINE_LOCATION` permission.

Personal info
-------------

There are different ways that your app, or a library included in your app, may access user data related to personal information. The following list provides several examples but isn't exhaustive:

*   Declares at least one of the following permissions:
    *   `BIND_AUTOFILL_SERVICE`
    *   `GET_ACCOUNTS`
*   Uses the `AccountManager` API.

### Name

How a user refers to themselves, such as their first or last name, or nickname.

### Email address

A user's email address.

### User IDs

User IDs that relate to an identifiable person. For example, an account ID, account number, or account name.

### Address

A user's address, such as a mailing or home address.

### Phone number

A user's phone number.

In addition to the broader suggestions listed at the beginning of this section, there may be more specific indicators that your app, or a library included in your app, collects or shares a user's phone number. These indicators include, but aren't limited to, the following:

*   Declares at least one of the following permissions:
    *   `READ_CALL_LOG`
    *   `READ_PHONE_NUMBERS`
    *   `READ_PHONE_STATE`, if your app targets Android 10 (API level 29) or lower
    *   `READ_SMS`
*   Requests user consent to become the device's default dialer app or default SMS app.
*   Has carrier privileges).

### Race and ethnicity

Information about a user's race or ethnicity.

### Political or religious beliefs

Information about a user's political or religious beliefs.

### Sexual orientation

Information about a user's sexual orientation.

### Other info

Any other personal information. For example, a user's date of birth, gender identity, or veteran status.

Financial info
--------------

There are different ways that your app, or a library included in your app, may access user data related to financial information. The following list provides several examples but isn't exhaustive:

*   Uses Google Play's Billing Library.
*   Uses the Google Pay APIs.
*   Declares the `BIND_AUTOFILL_SERVICE` permission and uses the autofill framework.

### User payment info

Information about a user's financial accounts such as credit card number.

### Purchase history

Information about purchases or transactions a user has made.

### Credit score

Information about a user's credit. For example, their credit history or credit score.

### Other financial info

Any other financial information. For example, a user's salary or debts.

Health and fitness
------------------

There are different ways that your app, or a library included in your app, may access user data related to health & fitness. The following list provides several examples but isn't exhaustive:

*   Declares at least one of the following permissions:
    *   `ACTIVITY_RECOGNITION`
    *   `BODY_SENSORS`
*   Uses at least one of the following APIs:
    *   Google Fit
    *   Sleep

### Health info

Information about a user's health, such as medical records or symptoms.

### Fitness info

Information about a user's fitness, such as exercise or other physical activity.

Messages
--------

There are different ways that your app, or a library included in your app, may access user data related to messages. The following list provides several examples but isn't exhaustive:

*   Declares at least one of the following permissions:
    *   `READ_SMS`
    *   `RECEIVE_MMS`
    *   `RECEIVE_SMS`
    *   `RECEIVE_WAP_PUSH`
    *   `SEND_SMS`
    *   `WRITE_SMS` depending on developer usage

### Emails

A user's emails including the email subject line, sender, recipients, and the content of the email.

### SMS or MMS

A user's text messages including the sender, recipients, and the content of the message.

### Other messages

Any other types of messages. For example, instant messages or chat content.

Photos or videos
----------------

There are different ways that your app, or a library included in your app, may access user data related to photos or videos. The following list provides several examples but isn't exhaustive:

*   Declares at least one of the following permissions:
    *   `READ_EXTERNAL_STORAGE`
    *   `WRITE_EXTERNAL_STORAGE`
*   Provides a workflow for handling media files.

### Photos

A user's photos.

### Videos

A user's videos.

Audio files
-----------

There are different ways that your app, or a library included in your app, may access user data related to audio files. The following list provides several examples but isn't exhaustive:

*   Declares at least one of the following permissions:
    *   `CAPTURE_AUDIO_OUTPUT`
    *   `RECORD_AUDIO`
    *   `READ_EXTERNAL_STORAGE`
    *   `WRITE_EXTERNAL_STORAGE`
*   Provides a workflow for handling media files.

### Voice or sound recordings

A user's voice such as a voicemail or a sound recording.

### Music files

A user's music files.

### Other audio files

Any other user-created or user-provided audio files.

Files and docs
--------------

There are different ways that your app, or a library included in your app, may access user data related to files and docs. The following list provides several examples but isn't exhaustive:

*   Declares at least one of the following permissions:
    *   `READ_EXTERNAL_STORAGE`
    *   `WRITE_EXTERNAL_STORAGE`
    *   `MANAGE_EXTERNAL_STORAGE`
*   Provides a workflow for data and file storage.
*   Provides a workflow for data backup.

Calendar
--------

There are different ways that your app, or a library included in your app, may access user data related to the user's calendar. The following list provides several examples but isn't exhaustive:

*   `READ_CALENDAR`
*   `WRITE_CALENDAR`

There are different ways that your app, or a library included in your app, may access user data related to the user's contacts. The following list provides several examples but isn't exhaustive:

*   Declares at least one of the following permissions:
    *   `ACCEPT_HANDOVER`
    *   `ADD_VOICEMAIL`
    *   `ANSWER_PHONE_CALLS`
    *   `CALL_PHONE`
    *   `PROCESS_OUTGOING_CALLS`
    *   `READ_CALL_LOG`
    *   `READ_CONTACTS`
    *   `READ_PHONE_NUMBERS`
    *   `READ_PHONE_STATE`
    *   `READ_SMS`
    *   `RECEIVE_MMS`
    *   `RECEIVE_SMS`
    *   `RECEIVE_WAP_PUSH`
    *   `SEND_SMS`
    *   `WRITE_CONTACTS`

App activity
------------

There are different ways that your app, or a library included in your app, may access user data related to the user's app activity. The following list provides several examples but isn't exhaustive:

*   Binds to a system service, such as `AccessibilityService` or `TextService`.
*   Declares the `QUERY_ALL_PACKAGES` permission and calls `getInstalledApplications()`) or similar methods.
*   Creates a search interface.
*   Supports the Google Shortcuts Integration Library.
*   Uses the `Instrumentation` API.

### App interactions

Information about how a user interacts with your app. For example, the number of times they visit a page, or what they tap on.

### In-app search history

Information about what a user has searched for in your app.

### Installed apps

Information about the apps installed on a user's device.

### Other user-generated content

Any other user-generated content not listed here, or in any other section. For example, user bios, notes, or open-ended responses.

### Other actions

Any other user actions not listed here. For example, gameplay information likes, or dialog options.

Web browsing
------------

There are different ways that your app, or a library included in your app, may access user data related to web browsing. The following list provides several examples but isn't exhaustive:

*   Sends requests to users to make your app the default browser app.
*   Maintains a browsing cache or cookies.
*   Creates a search interface.

App info and performance
------------------------

There are different ways that your app, or a library included in your app, may access user data related to app info and performance. The following list provides several examples but isn't exhaustive:

*   Declares the `BATTERY_STATS` permission.
*   Uses APIs such as the following:
    *   `ActivityManager`
    *   `ApplicationErrorReport`
    *   `ApplicationExitInfo`
    *   `BatteryManager`
    *   `Benchmark`
    *   `Debug`
    *   `HealthStats`
    *   `Macrobenchmark`
    *   `PowerManager`
    *   `StrictMode`

### Crash logs

Crash log data from your app. For example, the number of times your app has crashed, stack traces, or other information directly related to a crash.

### Diagnostics

Information about the performance of your app. For example: battery life, loading time, latency, framerate, or any technical diagnostics.

### Other app performance data

Any other app performance data not listed here.

Device or other IDs
-------------------

Examples of these IDs include: an IMEI number), MAC address), Widevine Device ID, Firebase installation ID, or advertising identifier.

There are different ways that your app, or a library included in your app, may access user data related to device or other IDs. The following list provides several examples but isn't exhaustive:

*   Declares at least one of the following permissions:
    *   `AD_ID` (Google Play services permission)
    *   `READ_PRIVILEGED_PHONE_STATE`
*   Uses API such as `AdvertisingIdClient`.
*   Dervies device or other identifier information from an IP address.

