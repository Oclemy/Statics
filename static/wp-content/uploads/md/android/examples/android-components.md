# Android Components Tutorial



_Android Components are the building blocks of an Android app._

Android has around 5 types of components:

1. Activity
2. Service
3. BroadcastReceiver
4. ContentProviders
5. Application.

Each of these components plays a specific role in an Android app which serves a distinct purpose and has distinct life-cycles(the flow of how and when the component is created and destroyed).


Activities are responsible for user interface. Normally you start by creating and activity, or the IDE generating for you a MainActivity.

Services implement long running operations in the background.

BroadcastReceivers listen for System events.

ContentProviders on the other hand are used to store the application data.

All the above have to be registered in the AndroidManifest.xml file.

The above components get tied up together by use of Intents.

[Application](https://camposha.info/android/application) is also an android component albeit one that is rarely used. Applications provide and maintain a global state to all the stateful components like [Activities](https://camposha.info/android/activity) and Services.

\\===

[section name="android_components_intro"] _Android Components are the building blocks of an Android app._

Android has around 5 types of components:

1. Activity
2. Service
3. BroadcastReceiver
4. ContentProviders
5. Application.

Each of these components plays a specific role in an Android app which serves a distinct purpose and has distinct life-cycles(the flow of how and when the component is created and destroyed).

Activities are responsible for user interface. Normally you start by creating and activity, or the IDE generating for you a MainActivity.

Services implement long running operations in the background.

BroadcastReceivers listen for System events.

ContentProviders on the other hand are used to store the application data.

All the above have to be registered in the AndroidManifest.xml file.

The above components get tied up together by use of Intents.

[Application](https://camposha.info/android/application) is also an android component albeit one that is rarely used. Applications provide and maintain a global state to all the stateful components like [Activities](https://camposha.info/android/activity) and Services.

[/section]

#### 1\. [Activity](https://camposha.info/android/activity)

This is the most commonly used android component.

Activities represent and manage user interfaces.

Normally you use subclasses of the [Activity](https://camposha.info/android/activity) class.

```java
public class MainActivity extends Activity{}
```

One application can have several activities to represent different functional screens.

However, at any one time your application can only display one activity.

Android provides several lifecycle callbacks to handle the varying activity states.

Activities are meant to handle UI related tasks. Normally these tasks take only a short amount of time and all of them can comfortaby be run on the main [thread](https://camposha.info/android/thread).

However, for long running operations such as networking calls, it is preferable to implement a service to handle them. Though it's possible to use a separate thread within the context of your Activity, it is preferable to delegate such tasks to a service.

This is because activities are what users directly interact with. They can start and stop them at will without necessarily the background task being over.

#### 2\. Service

Services implement long running operations in android.

They are the second most commonly used component after the activity.

Services don't involve user interfaces, so they are suitable for performing long running background tasks.

All android components, Services included, do run on the main thread.

Therefore those long running background tasks still have to be executed in a separate thread.

The most commonly used abstractions for the [Thread](https://camposha.info/android/thread) class are AsyncTask and Handler.

Services ensure that your tasks can complete even if the user presses the Home or Back button, unlike activities.

This is because services aren't attached to the user interfaces, hence will continue running even if the activity is not visible.

```java
public class MyService extends Service {

    @Override
    public IBinder onBind(Intent intent) {
        return null;
    }
}
```

#### 3\. BroadcastReceiver

This is the third android component.

BroadcastReceiver listen for system events.

Unlike activities and services, BroadcastReceivers are stateless. This implies the BroadcastReceiver object is only valid during the invocation of the `onReceive()` method.

Thus you cannot keep a reference to a BroadcastReceiver object declared inside the manifest anywhere in your code.

You cannot also add it's objecr as a listener or callback to an asynchronous operation.

Within the `onReceive()` method, you should delegate the call to another component, via the `Context.startActivity()` for activities and `Context.startService()` for service.

BroadcastReceiver therefore are only majorly used for listening to System events.

The Android SDK already predefines dozens of BroadcastIntents.

BroadcastReceivers have the ability to be programmatically declared inside a Service or Activity.

After the declaration they are then manually registered and unregustered to release memory.

#### 4\. ContentProvider

ContentProvider store application data.

They are unique in that you don't have to declare them to store data.

ContentProviders allow us share data between applications.

In some situations they can also be easier to use especially when working with AdapterViews.

#### 5\. Application

Android provides a base class in the `android.app` package which can be used to maintain the global state of an application.

Obviously activities are used extensively in almost all applications as they are a core component of android platform. However, an activity can only keep an activity state.

If the system or you destroy an activity then that state is lost. So `android.app.Application` provide a way for us to maintain state that is global to all activities.

To provide your own implementation of the `Application` class, you specify the the name in the `<application>` tag inside your `android_manifest.xml` file. Doing this ensures that during the creation of your application's process, the `Application` gets instantiated automatically for you.

However, when it comes to maintaining global state, it's recommended to use static singletons whenever possible since they are more modular.

#### Introduction to Android Components

`Application` is an android component. However there are 4 other components. But first what is an android component?

To learn more android components, check here.

#### Application class Methods

Here are some public methods in the `android.app.Application`.

1. `onCreate()` : This method gets called when tha application has been created and is starting. By this time still there is no actiity, service or receiver objects(excluding content providers) created. You have to call the `onCreate()` method of the super `Application` class: `super.OnCreate()`.
2. `onConfigurationChanged()` :This method will be called by the system when the device configuration changes are detected. Only activities get restarted when this occurs. Other components don't and have to deal with the consequences of this change such as re-fetching resources they were using.
3. `onLowMemory()` : The android system will call this method when it's running low on memory. By this time the memory is low and actively running process need to trim their memory usage. This can happen at any time with no specific defined time. However by this time probably all background processes have already been killed. Typically you implement this so as to release caches and other non-critical resources you are occupying.
