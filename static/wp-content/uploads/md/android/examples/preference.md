# Kotlin AndroidX Preferenc and Settings Examples

The Preference library allows you to build interactive settings screens, without needing to handle interacting with device storage or managing the user interface.


### Settings

Settings allow users to change the functionality and behavior of an application. Settings can affect background behavior, such as how often the application synchronizes data with the cloud, or they can be more wide-reaching, such as changing the contents and presentation of the user interface.

The recommended way to integrate user configurable settings into your application is to use the AndroidX Preference Library. This library manages the user interface and interacts with storage so that you define only the individual settings that the user can configure. The library comes with a Material theme that provides a consistent user experience across devices and OS versions.

### How to create a Settings Screen

You can create a Settings  screen in two way: via xml or via code. Here is the screen that we will build in the two ways:

![https://developer.android.com/guide/topics/ui/settings/images/settings-simple.png](https://developer.android.com/guide/topics/ui/settings/images/settings-simple.png)

#### (a). Via XML

```xml
<PreferenceScreen
    xmlns:app="http://schemas.android.com/apk/res-auto">

    <SwitchPreferenceCompat
        app:key="notifications"
        app:title="Enable message notifications"/>

    <Preference
        app:key="feedback"
        app:title="Send feedback"
        app:summary="Report technical issues or suggest new features"/>

</PreferenceScreen>
```

The above xml will give you the following:



#### (b). Via Code

You can also build a settings screen programmatically via code. Below are code examples:

```kotlin
override fun onCreatePreferences(savedInstanceState: Bundle?, rootKey: String?) {
    val context = preferenceManager.context
    val screen = preferenceManager.createPreferenceScreen(context)

    val notificationPreference = SwitchPreferenceCompat(context)
    notificationPreference.key = "notifications"
    notificationPreference.title = "Enable message notifications"

    val feedbackPreference = Preference(context)
    feedbackPreference.key = "feedback"
    feedbackPreference.title = "Send feedback"
    feedbackPreference.summary = "Report technical issues or suggest new features"

    screen.addPreference(notificationPreference)
    screen.addPreference(feedbackPreference)

    preferenceScreen = screen
}
```

Adding a [`PreferenceCategory` is similar, as shown below. Remember to add the children to the `PreferenceCategory` and not to the root `PreferenceScreen`:

```kotlin
override fun onCreatePreferences(savedInstanceState: Bundle?, rootKey: String?) {
    val context = preferenceManager.context
    val screen = preferenceManager.createPreferenceScreen(context)

    val notificationPreference = SwitchPreferenceCompat(context)
    notificationPreference.key = "notifications"
    notificationPreference.title = "Enable message notifications"

    val notificationCategory = PreferenceCategory(context)
    notificationCategory.key = "notifications_category"
    notificationCategory.title = "Notifications"
    screen.addPreference(notificationCategory)
    notificationCategory.addPreference(notificationPreference)

    val feedbackPreference = Preference(context)
    feedbackPreference.key = "feedback"
    feedbackPreference.title = "Send feedback"
    feedbackPreference.summary = "Report technical issues or suggest new features"

    val helpCategory = PreferenceCategory(context)
    helpCategory.key = "help"
    helpCategory.title = "Help"
    screen.addPreference(helpCategory)
    helpCategory.addPreference(feedbackPreference)

    preferenceScreen = screen
}
```

## More Examples

Here are more examples

[loop type=example taxonomy=post_tag term=preferencex orderby=date order=asc]

<h2>[loop-count]. [field title] </h2>

[content]

<a href="[field url]">Read Individually.</a>
<hr>

[/loop]
