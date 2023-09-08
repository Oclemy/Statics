# Build your first app

This section describes how to build a simple Android app. First, you learn how to create a "Hello, World!" project with Android Studio and run it. Then, you create a new interface for the app that takes user input and switches to a new screen in the app to display it.

Before you start, there are two fundamental concepts that you need to understand about Android apps: how they provide multiple entry points, and how they adapt to different devices.

## Apps provide multiple entry points

Android apps are built as a combination of components that can be invoked individually. For example, an *activity* is a type of app component that provides a user interface (UI).

The "main" activity starts when the user taps your app's icon. You can also direct the user to an activity from elsewhere, such as from a notification or even from a different app.

Other components, such as *WorkManager*, allow your app to perform background tasks without a UI.

After you build your first app, you can learn more about the other app components at Application fundamentals.

## Apps adapt to different devices

Android allows you to provide different resources for different devices. For example, you can create different layouts for different screen sizes. The system determines which layout to use based on the screen size of the current device.

If any of your app's features need specific hardware, such as a camera, you can query at runtime whether the device has that hardware or not, and then disable the corresponding features if it doesn't. You can specify that your app requires certain hardware so that Google Play won't allow the app to be installed on devices without them.

After you build your first app, learn more about device configurations at Device compatibility overview.

## Where to go from here

With these two basic concepts in mind, you have two options. If you prefer staying in the main documentation, which makes it easy to branch off to other topics to learn more about specific aspects of building an app, you can proceed to the next lesson to build your first app. However, if you like to follow step-by-step tutorials that explain every step from beginning to end, then consider the Android Basics in Kotlin course.