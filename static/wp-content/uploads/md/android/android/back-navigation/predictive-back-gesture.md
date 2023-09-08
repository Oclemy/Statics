# Add support for the predictive back gesture

![](https://developer.android.com/static/images/about/versions/13/predictive-back-nav-home.gif)

**Figure 1:** Mockup of the predictive back gesture look and feel on a phone

Android 13 (API level 33) introduces a predictive back gesture for Android devices such as phones, large screens, and foldables. It is part of a multi-year release; when fully implemented, this feature will let users preview the destination or other result of a back gesture before fully completing it, allowing them to decide whether to continue or stay in the current view.

For example, using a back gesture can display an animated preview of the Home screen behind your app, as presented in the mockup in figure 1. Starting with Android 13, you can test this back-to-home animation by enabling a developer option (as described on this page).

Supporting the predictive back gesture requires updating your app, using the `OnBackPressedCallback` AppCompat 1.6.0-alpha05 (AndroidX) or higher API, or using the new `OnBackInvokedCallback` platform API.

This update provides a migration path for back navigation APIs that are no longer being supported, which are `KeyEvent.KEYCODE_BACK` and any classes with `onBackPressed` methods such as `Activity` and `Dialog`).

#### Codelab

In addition to using this documentation on this page, you can try out our codelab, which provides a common use-case implementation of a WebView handling the predictive back gesture using `AndroidX Activity APIs`.

Update an app that uses default back navigation
-----------------------------------------------

Updating your app to support this feature is straightforward if your app doesn't implement any custom back behavior (in other words, it leaves back handling up to the system). Simply opt in to this feature as described on this page.

Update an app that uses custom back navigation
----------------------------------------------

If your app implements custom back behavior, there are different migration paths depending on whether it uses AndroidX and how it handles back navigation.

### Migrate an AndroidX back navigation implementation

This use case is the most common (and the most recommended). It applies to new or existing apps that implement custom gesture navigation handling with `OnBackPressedDispatcher`, as described in Provide custom back navigation.

If your app fits into this category, follow these steps to add support for the predictive back gesture:

1.  To ensure that APIs that are already using `OnBackPressedDispatcher` APIs (such as Fragments and the Navigation Component) work seamlessly with the predictive back gesture, upgrade to AndroidX Activity 1.6.0-alpha05.
    
```groovy    
        // In your build.gradle file:
        dependencies {
        
        // Add this in addition to your other dependencies
        implementation "androidx.activity:activity:1.6.0-alpha05"
        
```

2.  Opt in to the predictive back gesture, as described on this page.
    

### Migrate an AndroidX app containing unsupported back navigation APIs to AndroidX APIs

If your app uses AndroidX libraries but implements or makes reference to the unsupported back navigation APIs, you’ll need to migrate to using AndroidX APIs to support the new behavior.

To migrate unsupported APIs to AndroidX APIs:

1.  Migrate your system Back handling logic to AndroidX’s `OnBackPressedDispatcher` with an implementation of `OnBackPressedCallback`. For detailed guidance, see Provide custom back navigation.
    
2.  To stop intercepting system Back navigation, either disable any previously enabled instances of `OnBackPressedCallback` or do not enable any callbacks at any time.
    
3.  Make sure to upgrade to AndroidX Activity 1.6.0-alpha05.

```groovy    
        // In your build.gradle file:
        dependencies {
        
        // Add this in addition to your other dependencies
        implementation "androidx.activity:activity:1.6.0-alpha05"
        
```

4.  When you have successfully migrated your app, opt in to the predictive back gesture as described on this page.
    

### Migrate an app that uses unsupported back navigation APIs to platform APIs

If your app cannot use AndroidX libraries and instead implements or makes reference to custom Back navigation using the unsupported APIs, you must migrate to the `OnBackInvokedCallback` platform API.

Complete the following steps to migrate unsupported APIs to the platform API:

1.  Use the new `OnBackInvokedCallback` API on devices running Android 13 or higher, and rely on the unsupported APIs on devices running Android 12 or lower.
    
2.  Register your custom back logic in `OnBackInvokedCallback` with logic in the `onBackInvoked` method. This prevents the current activity from being finished, and your callback gets a chance to react to the Back action once the user completes the system Back navigation.
    
3.  To ensure that future enhancements to the system Back navigation are properly supported, your app **MUST** unregister the `OnBackInvokedCallback`. Otherwise, users may see undesirable behavior when using a system Back navigation—for example, "getting stuck" between views and forcing them to force quit your app.
    
    Here’s an example of how to migrate logic out of `onBackPressed`:
    
### Kotlin

```kotlin    
    @Override
    fun onCreate() {
        if (BuildCompat.isAtLeastT()) {
            onBackInvokedDispatcher.registerOnBackInvokedCallback(
                OnBackInvokedDispatcher.PRIORITY_DEFAULT
            ) {
                /**
                 * onBackPressed logic goes here. For instance:
                 * Prevents closing the app to go home screen when in the
                 * middle of entering data to a form
                 * or from accidentally leaving a fragment with a WebView in it
                 *
                 * Unregistering the callback to stop intercepting the back gesture:
                 * When the user transitions to the topmost screen (activity, fragment)
                 * in the BackStack, unregister the callback by using
                 * OnBackInvokeDispatcher.unregisterOnBackInvokedCallback
                 * (https://developer.android.com/reference/kotlin/android/window/OnBackInvokedDispatcher#unregisteronbackinvokedcallback)
                 */
            }
        }
    }
```

### Java

```java    
    @Override
    void onCreate() {
      if (BuildCompat.isAtLeastT()) {
        getOnBackInvokedDispatcher().registerOnBackInvokedCallback(
            OnBackInvokedDispatcher.PRIORITY_DEFAULT,
            () -> {
              /**
               * onBackPressed logic goes here - For instance:
               * Prevents closing the app to go home screen when in the
               * middle of entering data to a form
               * or from accidentally leaving a fragment with a WebView in it
               *
               * Unregistering the callback to stop intercepting the back gesture:
               * When the user transitions to the topmost screen (activity, fragment)
               * in the BackStack, unregister the callback by using
               * OnBackInvokeDispatcher.unregisterOnBackInvokedCallback
               * (https://developer.android.com/reference/kotlin/android/view/OnBackInvokedDispatcher#unregisteronbackinvokedcallback)
               */
            }
        );
      }
    }
```

4.  When you have successfully migrated your app, opt in to the predictive back gesture as described in the following section.
    

Opt in to the predictive back gesture
-------------------------------------

Once you've determined how to update your app based on your case, it's easy to opt in to supporting the predictive back gesture.

To opt in, in `AndroidManifest.xml`, in the `<application>` tag, set the `android:enableOnBackInvokedCallback` flag to `true`.

```xml
    <application
        ...
        android:enableOnBackInvokedCallback="true"
        ... >
    ...
    </application>
```

If you don't provide a value, it defaults to `false` and disables the predictive back gesture.

Test the predictive back gesture animation
------------------------------------------

Starting with the Android 13 final release, you should be able to enable a developer option to test the back-to-home animation shown in figure 1.

To test this animation, complete the following steps:

1.  On your device, go to **Settings > System > Developer options**.
    
2.  Select **Predictive back animations**.
    
3.  Launch your updated app, and use the back gesture to see it in action.