# Navigate to a destination

Navigating to a destination is done using a `NavController`, an object that manages app navigation within a `NavHost`. Each `NavHost` has its own corresponding `NavController`. `NavController` provides a few different ways to navigate to a destination, which are further described in the sections below.

To retrieve the `NavController` for a fragment, activity, or view, use one of the following methods:

**Kotlin:**

*   `Fragment.findNavController()`.findNavController())
*   `View.findNavController()`
*   `Activity.findNavController(viewId: Int)`.findNavController(kotlin.Int))

**Java:**

*   `NavHostFragment.findNavController(Fragment)`)
*   `Navigation.findNavController(Activity, @IdRes int viewId)`)
*   `Navigation.findNavController(View)`)

After you've retrieved a `NavController`, you can call one of the overloads of `navigate()`) to navigate between destinations. Each overload provides support for various navigation scenarios, as described in the following sections.

Use Safe Args to navigate with type-safety
------------------------------------------

The recommended way to navigate between destinations is to use the Safe Args Gradle plugin. This plugin generates simple object and builder classes that enable type-safe navigation between destinations. Safe Args is recommended both for navigating as well as passing data between destinations.

To add Safe Args to your project, include the following `classpath` in your top level `build.gradle` file:

### Groovy

```groovy
buildscript {
    repositories {
        google()
    }
    dependencies {
        def nav_version = "2.5.3"
        classpath "androidx.navigation:navigation-safe-args-gradle-plugin:$nav_version"
    }
}
```

### Kotlin

```kotlin
buildscript {
    repositories {
        google()
    }
    dependencies {
        val nav_version = "2.5.3"
        classpath("androidx.navigation:navigation-safe-args-gradle-plugin:$nav_version")
    }
}
```

You must also apply one of two available plugins.

To generate Java language code suitable for Java or mixed Java and Kotlin modules, add this line to **your app or module's** `build.gradle` file:

### Groovy

```groovy
plugins {
  id 'androidx.navigation.safeargs'
}
```

### Kotlin

```kotlin
plugins {
    id("androidx.navigation.safeargs")
}
```

Alternatively, to generate Kotlin code suitable for Kotlin-only modules add:

### Groovy

```groovy
plugins {
  id 'androidx.navigation.safeargs.kotlin'
}
```

### Kotlin

```kotlin
plugins {
    id("androidx.navigation.safeargs.kotlin")
}
```

You must have `android.useAndroidX=true` in your `gradle.properties` file as per Migrating to AndroidX).

After enabling Safe Args, your generated code contains classes and methods for each action you've defined as well as classes that correspond to each sending and receiving destination.

Safe Args generates a class for each destination where an action originates. The generated class name adds "Directions" to the originating destination class name. For example, if the originating destination is named `SpecifyAmountFragment`, the generated class is named `SpecifyAmountFragmentDirections`.

The generated class contains a static method for each action defined in the originating destination. This method takes any defined action parameters as arguments and returns a `NavDirections` object that you can pass directly to `navigate()`).

### Safe Args example

As an example, assume we have a navigation graph with a single action that connects two destinations, `SpecifyAmountFragment` and `ConfirmationFragment`. The `ConfirmationFragment` takes a single `float` parameter that you provide as part of the action.

Safe Args generates a `SpecifyAmountFragmentDirections` class with a single method, `actionSpecifyAmountFragmentToConfirmationFragment()`, and an inner class called `ActionSpecifyAmountFragmentToConfirmationFragment`. The inner class is derived from `NavDirections` and stores the associated action ID and `float` parameter. The returned `NavDirections` object can then be passed directly to `navigate()`, as shown in the following example:

### Kotlin

```kotlin
override fun onClick(v: View) {
    val amount: Float = ...
    val action =
        SpecifyAmountFragmentDirections
            .actionSpecifyAmountFragmentToConfirmationFragment(amount)
    v.findNavController().navigate(action)
}
```

### Java

```java
@Override
public void onClick(View view) {
    float amount = ...;
    action =
        SpecifyAmountFragmentDirections
            .actionSpecifyAmountFragmentToConfirmationFragment(amount);
    Navigation.findNavController(view).navigate(action);
}
```

For more information on passing data between destinations with Safe Args, see Use Safe Args to pass data with type safety.

Navigate using ID
-----------------

`navigate(int)`) takes the resource ID of either an action or a destination. The following code snippet shows how to navigate to the `ViewTransactionsFragment`:

### Kotlin

```kotlin
viewTransactionsButton.setOnClickListener { view ->
   view.findNavController().navigate(R.id.viewTransactionsAction)
}
```

### Java

```java
viewTransactionsButton.setOnClickListener(new View.OnClickListener() {
    @Override
    public void onClick(View view) {
        Navigation.findNavController(view).navigate(R.id.viewTransactionsAction);
    }
});
```

For buttons, there are three variants of `Navigation.createNavigateOnClickListener()`). These variants are useful if you're using the Java programming language. If you're using Kotlin, `OnClickListener` is a SAM interface, so you can use a trailing lambda. This approach can be shorter and easier to read than calling `createNavigateOnClickListener()` directly.

To handle other common UI components, such as the top app bar and bottom navigation, see Update UI components with NavigationUI.

### Provide navigation options to actions

When you define an action in the navigation graph, Navigation generates a corresponding `NavAction` class, which contains the configurations defined for that action, including the following:

*   Destination): The resource ID of the target destination.
*   Default arguments): An `android.os.Bundle` containing default values for the target destination, if supplied.
*   Navigation options): Navigation options, represented as `NavOptions`. This class contains all of the special configuration for transitioning to and back from the target destination, including animation resource configuration, pop behavior, and whether the destination should be launched in single top mode.

Let’s take a look at an example graph consisting of two screens along with an action to navigate from one to the other:

```xml
    <?xml version="1.0" encoding="utf-8"?>
    <navigation xmlns:android="http://schemas.android.com/apk/res/android"
                xmlns:app="http://schemas.android.com/apk/res-auto"
                xmlns:tools="http://schemas.android.com/tools"
                android:id="@+id/nav_graph"
                app:startDestination="@id/a">
    
        <fragment android:id="@+id/a"
                  android:name="com.example.myapplication.FragmentA"
                  android:label="a"
                  tools:layout="@layout/a">
            <action android:id="@+id/action_a_to_b"
                    app:destination="@id/b"
                    app:enterAnim="@anim/nav_default_enter_anim"
                    app:exitAnim="@anim/nav_default_exit_anim"
                    app:popEnterAnim="@anim/nav_default_pop_enter_anim"
                    app:popExitAnim="@anim/nav_default_pop_exit_anim"/>
        </fragment>
    
        <fragment android:id="@+id/b"
                  android:name="com.example.myapplication.FragmentB"
                  android:label="b"
                  tools:layout="@layout/b">
            <action android:id="@+id/action_b_to_a"
                    app:destination="@id/a"
                    app:enterAnim="@anim/nav_default_enter_anim"
                    app:exitAnim="@anim/nav_default_exit_anim"
                    app:popEnterAnim="@anim/nav_default_pop_enter_anim"
                    app:popExitAnim="@anim/nav_default_pop_exit_anim"
                    app:popUpTo="@+id/a"
                    app:popUpToInclusive="true"/>
        </fragment>
    </navigation>
    
```

When the navigation graph is inflated, these actions are parsed, and corresponding `NavAction` objects are generated with the configurations defined in the graph. For example, `action_b_to_a` is defined as navigating from destination `b` to destination `a`. The action includes animations along with `popTo` behavior that removes all destinations from the backstack. All of these settings are captured as `NavOptions` and are attached to the `NavAction`.

To follow this `NavAction`, use `NavController.navigate()`, passing the ID of the action, as shown in the following example:

### Kotlin

```kotlin
findNavController().navigate(R.id.action_b_to_a)
```

### Java

```java
NavigationHostFragment.findNavController(this).navigate(R.id.action_b_to_a);
```

### Apply NavOptions programmatically

The previous examples show how to specify `NavOptions` within the navigation graph XML. However, specific options can vary depending on constraints that are unknown at build time. In such cases, the `NavOptions` must be created and set programmatically, as shown in the following example:

### Kotlin

```kotlin
findNavController().navigate(
    R.id.action_fragmentOne_to_fragmentTwo,
    null,
    navOptions { // Use the Kotlin DSL for building NavOptions
        anim {
            enter = android.R.animator.fade_in
            exit = android.R.animator.fade_out
        }
    }
)
```

### Java

```java
NavController navController = NavHostFragment.findNavController(this);
navController.navigate(
        R.id.action_fragmentOne_to_fragmentTwo,
        null,
        new NavOptions.Builder()
                .setEnterAnim(android.R.animator.fade_in)
                .setExitAnim(android.R.animator.fade_out)
                .build()
);
```

This example uses an extended form of `navigate()`) and contains additional `Bundle` and `NavOptions` arguments. All variants of `navigate()` have extended versions that accept a `NavOptions` argument.

You can also programmatically apply `NavOptions` when navigating to implicit deep links:

### Kotlin

```kotlin
findNavController().navigate(
    deepLinkUri,
    navOptions { // Use the Kotlin DSL for building NavOptions
        anim {
            enter = android.R.animator.fade_in
            exit = android.R.animator.fade_out
        }
    }
)
```

### Java

```java
NavController navController = NavHostFragment.findNavController(this);
navController.navigate(
        deepLinkUri,
        new NavOptions.Builder()
                .setEnterAnim(android.R.animator.fade_in)
                .setExitAnim(android.R.animator.fade_out)
                .build()
);
```

This variant of `navigate()`) takes a `Uri` for the implicit deep link, as well as the `NavOptions` instance.

Navigate using DeepLinkRequest
------------------------------

You can use `navigate(NavDeepLinkRequest)`) to navigate directly to an implicit deep link destination, as shown in the following example:

### Kotlin

```kotlin
val request = NavDeepLinkRequest.Builder
    .fromUri("android-app://androidx.navigation.app/profile".toUri())
    .build()
findNavController().navigate(request)
```

### Java

```java
NavDeepLinkRequest request = NavDeepLinkRequest.Builder
    .fromUri(Uri.parse("android-app://androidx.navigation.app/profile"))
    .build()
NavHostFragment.findNavController(this).navigate(request)
```

In addition to `Uri`, `NavDeepLinkRequest` also supports deep links with actions and MIME types. To add an action to the request, use `fromAction()`) or `setAction()`). To add a MIME type to a request, use `fromMimeType()`) or `setMimeType()`).

For a `NavDeepLinkRequest` to properly match an implicit deep link destination, the URI, action, and MIME type must all match the `NavDeepLink` in the destination. URIs must match the pattern, the actions must be an exact match, and the MIME types must be related (e.g. "image/jpg" matches with "image/*").

Unlike navigation using action or destination IDs, you can navigate to any deep link in your graph, regardless of whether the destination is visible. You can navigate to a destination on the current graph or a destination on a completely different graph.

When navigating using `NavDeepLinkRequest`, the back stack is _not_ reset. This behavior is unlike other deep link navigation, where the back stack is replaced when navigating. `popUpTo` and `popUpToInclusive` still remove destinations from the back stack just as though you had navigated using an ID.

Navigation and the back stack
-----------------------------

Android maintains a back stack that contains the destinations you've visited. The first destination of your app is placed on the stack when the user opens the app. Each call to the `navigate()`) method puts another destination on top of the stack. Tapping **Up** or **Back** calls the `NavController.navigateUp()`) and `NavController.popBackStack()`) methods, respectively, to remove (or _pop_) the top destination off of the stack.

`NavController.popBackStack()` returns a boolean indicating whether it successfully popped back to another destination. The most common case when this returns `false` is when you manually pop the start destination of your graph.

When the method returns `false`, `NavController.getCurrentDestination()` returns `null`. You are responsible for either navigating to a new destination or handling the pop by calling `finish()` on your Activity, as shown in the following example:

### Kotlin

```kotlin
...

if (!navController.popBackStack()) {
    // Call finish() on your Activity
    finish()
}
```

### Java

```java
...

if (!navController.popBackStack()) {
    // Call finish() on your Activity
    finish();
}
```

Dialog destinations implement the `FloatingWindow` interface, indicating that they overlay other destinations on the back stack. As such, one or more `FloatingWindow` destinations can be present only on the top of the navigation back stack. Navigating to a destination that does not implement `FloatingWindow` automatically pops all `FloatingWindow` destinations off of the top of the stack. This ensures that the current destination is always fully visible above other destinations on the back stack.

As an example, if the back stack consists solely of non-floating destinations, and the user navigates to a `Dialog` destination, then the back stack might look similar to figure 1:

![a back stack with a dialog destination on top](https://developer.android.com/static/images/guide/navigation/backstack-1.png)

**Figure 1.** A back stack with a `Dialog` destination on top.

If the user then navigates to another `Dialog` destination, it is then added to the top of the back stack, as shown in figure 2:

![a back stack with two dialog destinations on top](https://developer.android.com/static/images/guide/navigation/backstack-2.png)

**Figure 2.** A back stack with two `Dialog` destinations on top.

If the user then navigates to a non-floating destination, any `FloatingWindow` destinations are first popped from the top of the back stack before navigating to the new destination, as shown in figure 3:

![the dialog destinations are popped, and the new destination
            is added](https://developer.android.com/static/images/guide/navigation/backstack-3.png)

**Figure 3.** The `Dialog` destinations are popped, and the new destination is added.

popUpTo and popUpToInclusive
----------------------------

When navigating using an action, you can optionally pop additional destinations off of the back stack. For example, if your app has an initial login flow, once a user has logged in, you should pop all of the login-related destinations off of the back stack so that the Back button doesn't take users back into the login flow.

To pop destinations when navigating from one destination to another, add an `app:popUpTo` attribute to the associated `<action>` element. `app:popUpTo` tells the Navigation library to pop some destinations off of the back stack as part of the call to `navigate()`. The attribute value is the ID of the most recent destination that should remain on the stack.

You can also include `app:popUpToInclusive="true"` to indicate that the destination specified in `app:popUpTo` should also be removed from the back stack.

### popUpTo example: circular logic

Let's say that your app has three destinations—A, B, and C—along with actions that lead from A to B, B to C, and C back to A. The corresponding navigation graph is shown in figure 4:

![](https://developer.android.com/static/images/topic/libraries/architecture/navigation-getting-started-pop.png)

**Figure 4.** A circular navigation graph with three destinations: A, B, and C.

With each navigation action, a destination is added to the back stack. If you were to navigate repeatedly through this flow, your back stack would then contain multiple sets of each destination (A, B, C, A, B, C, A, and so on). To avoid this repetition, you can specify `app:popUpTo` and `app:popUpToInclusive` in the action that takes you from destination C to destination A, as shown in the following example:

```xml
<fragment
    android:id="@+id/c"
    android:name="com.example.myapplication.C"
    android:label="fragment_c"
    tools:layout="@layout/fragment_c">

    <action
        android:id="@+id/action_c_to_a"
        app:destination="@id/a"
        app:popUpTo="@+id/a"
        app:popUpToInclusive="true"/>
</fragment>
```

After reaching destination C, the back stack contains one instance of each destination (A, B, C). When navigating back to destination A, we also `popUpTo` A, which means that we remove B and C from the stack while navigating. With `app:popUpToInclusive="true"`, we also pop that first A off of the stack, effectively clearing it. Notice here that if you don't use `app:popUpToInclusive`, your back stack would contain two instances of destination A.

popUpToSaveState and restoreSaveState
-------------------------------------

When you use `app:popUpTo` to navigate to a destination, Navigation 2.4.0-alpha01 and higher allow you to optionally save the states of all destinations popped off of the back stack. To enable this option, include `app:popUpToSaveState="true"` in the associated `<action>` element:

```xml
    <action
      android:id="@+id/action_c_to_a"
      app:destination="@id/a"
      app:popUpTo="@+id/a"
      app:popUpToInclusive="true"
      app:popUpToSaveState="true"/>
```

When you navigate to a destination, you can also include `app:restoreSaveState="true"` to automatically restore the state associated with the destination in `app:destination`.