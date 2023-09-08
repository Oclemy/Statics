# Interacting with Other Apps

An Android app typically has several activities. Each activity displays a user interface that allows the user to perform a specific task (such as view a map or take a photo). To take the user from one activity to another, your app must use an `Intent` to define your app's "intent" to do something. When you pass an `Intent` to the system with a method such as `startActivity()`, the system uses the `Intent` to identify and start the appropriate app component. Using intents even allows your app to start an activity that is contained in a separate app.

An `Intent` can be _explicit_ in order to start a specific component (a specific `Activity` instance) or _implicit_ in order to start any component that can handle the intended action (such as "capture a photo").

This class shows you how to use an `Intent` to perform some basic interactions with other apps, such as start another app, receive a result from that app, and make your app able to respond to intents from other apps.

Lessons
-------

**Sending the User to Another App**

Shows how you can create implicit intents to launch other apps that can perform an action.

**Getting a Result from an Activity**

Shows how to start another activity and receive a result from the activity.

**Allowing Other Apps to Start Your Activity**

Shows how to make activities in your app open for use by other apps by defining intent filters that declare the implicit intents your app accepts.

**Managing Package Visibility**

Shows how to make other apps visible to your app, if those other apps aren't visible by default. _Applies only to apps that target Android 11 (API level 30) or higher._

**Configuring Package Visibility Based on Use Cases**

Shows several types of app interactions that might require you to update your app's manifest file in order for other apps to be visible to your app. _Applies only to apps that target Android 11 (API level 30) or higher._

For additional information about the topics on this page, see:

*   Sharing Simple Data
*   Sharing Files
*   Integrating Application with Intents (blog post)
*   Intents and Intent Filters