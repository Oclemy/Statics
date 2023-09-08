# Handle configuration changes  |  Android Developers

Some device configurations can change during runtime (such as screen orientation, keyboard availability, and when the user enables multi-window mode). When such a change occurs, Android restarts the running `Activity` (`onDestroy()` is called, followed by `onCreate()`)). The restart behavior is designed to help your application adapt to new configurations by automatically reloading your application with alternative resources that match the new device configuration.

To properly handle a restart, it is important that your activity restores its previous state. You can use a combination of `onSaveInstanceState()`, `ViewModel` objects, and persistent storage to save and restore the UI state of your activity across configuration changes. For more information on how to save your Activity state, read Save UI states.

To test that your application restarts itself with the application state intact, you should invoke configuration changes (such as changing the screen orientation) while performing various tasks in your application. Your application should be able to restart at any time without loss of user data or state in order to handle events such as configuration changes or when the user receives an incoming phone call and then returns to your application much later after your application process may have been destroyed. To learn how you can restore your activity state, read about the Activity lifecycle.

However, you might encounter a situation in which restarting your application and restoring significant amounts of data can be costly and create a poor user experience. In such a situation, you have two other options:

1.  Retain an object during a configuration change
    
    Allow your activity to restart when a configuration changes, but carry a stateful object to the new instance of your activity.
    
2.  Handle the configuration change yourself
    
    It is not recommended to handle configuration changes yourself due to the hidden complexity of handling the configuration changes. However, if you are unable to preserve your UI state using the preferred options (`onSaveInstanceState()`, `ViewModel` objects, and persistent storage) you can instead prevent the system from restarting your activity during certain configuration changes. Your app will receive a callback when the configurations do change so that you can manually update your activity as necessary.
    

Retain an object during a configuration change
----------------------------------------------

If restarting your activity requires that you recover large sets of data, re-establish a network connection, or perform other intensive operations, then a full restart due to a configuration change might be a slow user experience. Also, it might not be possible for you to completely restore your activity state with the `Bundle` that the system saves for you with the `onSaveInstanceState()` callback—it is not designed to carry large objects (such as bitmaps) and the data within it must be serialized then deserialized on the main thread, which can consume a lot of memory and make the configuration change slow. In such a situation, you can alleviate the burden of reinitializing part of your activity by using a `ViewModel`. `ViewModel` objects are preserved across configuration changes so they are the perfect place to keep your UI data without having to query them again. For more information about using the `ViewModel` class in your apps, read the ViewModel overview.

Handle the configuration change yourself
----------------------------------------

If your application doesn't need to update resources during a specific configuration change and you have a performance limitation that requires you to avoid the activity restart, then you can declare that your activity handles the configuration change itself which prevents the system from restarting your activity.

**Caution:** Handling the configuration change yourself can make it much more difficult to use alternative resources because the system does not automatically apply them for you. This technique should be considered a last resort when you must avoid restarts due to a configuration change and is not recommended for most applications.

To declare that your activity handles a configuration change, edit the appropriate `<activity>` element in your manifest file to include the `android:configChanges` attribute with a value that represents the configuration you want to handle. Possible values are listed in the documentation for the `android:configChanges` attribute. The most commonly used values are `"orientation"`, `"screenSize"`, `"screenLayout"`, and `"keyboardHidden"`:

*   The `"orientation"` value prevents restarts when the screen orientation changes.
*   The `"screenSize"` value also prevents restarts when orientation changes, but only for Android 3.2 (API level 13) and above.
*   The `"screenLayout"` value is necessary to detect changes that can be triggered by devices such as foldable phones and convertible Chromebooks.
*   The `"keyboardHidden"` value prevents restarts when the keyboard availability changes.

If you want to manually handle orientation changes in your app you must declare the `"orientation"`, `"screenSize"`, and `"screenLayout"` values in the `android:configChanges` attributes. You can declare multiple configuration values in the attribute by separating them with a pipe `|` character.

For example, the following manifest code declares an activity that handles both screen orientation changes and keyboard availability change:

<activity android:name\=".MyActivity"
          android:configChanges\="orientation|screenSize|screenLayout|keyboardHidden"
          android:label\="@string/app\_name"\>

Now, when a change occurs in one of these configurations, `MyActivity` does not restart. Instead, `MyActivity` receives a call to `onConfigurationChanged()`). This method is passed a `Configuration` object that specifies the new device configuration. By reading fields in the `Configuration` object, you can determine the new configuration and make appropriate changes by updating the resources used in your interface. At the time this method is called, your activity's `Resources` object is updated to return resources based on the new configuration, so you can easily reset elements of your UI without the system restarting your activity.

For example, the following `onConfigurationChanged()` implementation checks the current device orientation:

override fun onConfigurationChanged(newConfig: Configuration) {
    super.onConfigurationChanged(newConfig)// Checks the orientation of the screen
    if (newConfig.orientation === Configuration.ORIENTATION\_LANDSCAPE) {
        Toast.makeText(this, "landscape", Toast.LENGTH\_SHORT).show()
    } else if (newConfig.orientation === Configuration.ORIENTATION\_PORTRAIT) {
        Toast.makeText(this, "portrait", Toast.LENGTH\_SHORT).show()
    }
}

@Override
public void onConfigurationChanged(Configuration newConfig) {
    super.onConfigurationChanged(newConfig);// Checks the orientation of the screen
    if (newConfig.orientation == Configuration.ORIENTATION\_LANDSCAPE) {
        Toast.makeText(this, "landscape", Toast.LENGTH\_SHORT).show();
    } else if (newConfig.orientation == Configuration.ORIENTATION\_PORTRAIT){
        Toast.makeText(this, "portrait", Toast.LENGTH\_SHORT).show();
    }
}

The `Configuration` object represents all of the current configurations, not just the ones that have changed. Most of the time, you won't care exactly how the configuration has changed and can simply reassign all your resources that provide alternatives to the configuration that you're handling. For example, because the `Resources` object is now updated, you can reset any `ImageView` instances with `setImageResource()` and the appropriate resource for the new configuration is used (as described in App resources overview).

Notice that the values from the `Configuration` fields are integers that are matched to specific constants from the `Configuration` class. For documentation about which constants to use with each field, refer to the appropriate field in the `Configuration` reference.

**Remember:** When you declare your activity to handle a configuration change, you are responsible for resetting any elements for which you provide alternatives. If you declare your activity to handle the orientation change and have images that should change between landscape and portrait, you must reassign each resource to each element during `onConfigurationChanged()`).

If you don't need to update your application based on these configuration changes, you can instead _not_ implement `onConfigurationChanged()`. In which case, all of the resources used before the configuration change are still used and you've only avoided the restart of your activity.

However, don't consider this technique an escape from retaining state during the normal activity lifecycle. Your application should always be able to shutdown and restart with its previous state intact. Configuration changes that you cannot prevent can restart your application. If the user leaves your application and the app is placed in the background, the system might destroy the app.