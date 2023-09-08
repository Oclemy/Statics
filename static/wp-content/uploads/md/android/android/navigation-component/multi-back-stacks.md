# Support multiple back stacks

The Navigation component works with the Android operating system to maintain the back stack as the user navigates in your app. In some cases, it might be helpful to maintain _multiple back stacks_ at the same time, with the user moving back and forth between them. For example, if your app includes bottom navigation or a navigation drawer, multiple back stack support allows your users to switch freely between flows in your app without losing their place in any of them.

The Navigation component provides APIs that support multiple back stacks by saving and restoring the state of destinations in your navigation graph. The `NavigationUI` class includes methods that handle this automatically, but you can also use the underlying APIs manually for a more customized implementation.

Implement support automatically with NavigationUI
-------------------------------------------------

The `NavigationUI` class includes APIs that automatically save and restore the state of menu items as the user moves between them. These APIs implement multiple back stack support by default in the following cases:

*   When you use the appropriate overload of `setupWithNavController()`) to associate an instance of `NavigationView` or `BottomNavigationView` with a `NavController` instance, as described in Add a navigation drawer or Bottom navigation.
*   When you use `onNavDestinationSelected()`) to create a custom navigation menu UI tied to destinations hosted by a `NavController` instance.

These APIs require no further code changes to implement multiple back stack support, and are the recommended way of supporting multiple back stacks in your app.

Implement support manually with underlying APIs
-----------------------------------------------

If the elements provided by `NavigationUI` don't satisfy your requirements, you can use the underlying APIs for saving and restoring back stacks through one of the other API surfaces provided by the Navigation component.

### Navigation XML

In Navigation XML, `<action>` elements in your navigation graph can use the `app:popUpToSaveState` attribute to save the state of any destinations that the action popped using `app:popUpTo`. They can also use the `app:restoreState` attribute to restore any previously saved state for the destination defined in the `app:destination` attribute.

You can use these attributes to support multiple back stacks. When a navigation action needs to move the user from one back stack to another, set both `app:popUpToSaveState` and `app:restoreState` to `true` in the corresponding `<action>` element. That way, the action saves the state of the current back stack while also restoring the previously saved state of the destination back stack, if it exists.

The following example shows an action that uses both of these attributes:

```xml
    <action
      android:id=”@+id/swap_stack”
      app:destination=”@id/second_stack”
      app:restoreState=”true”
      app:popUpTo=”@id/first_stack_start_destination”
      app:popUpToSaveState=”true” />
```

### NavOptions

The `NavOptions` class allows you to pass special navigation options to save and restore back stacks when you navigate using a `NavController`. This is true whether you create your instance of `NavOptions` using the Kotlin DSL or using the `NavOptions.Builder`:

### Kotlin

```kotlin
// Use the navigate() method that takes a navOptions DSL Builder
navController.navigate(selectedBottomNavRoute) {
  launchSingleTop = true
  restoreState = true
  popUpTo(navController.graph.findStartDestination().id) {
    saveState = true
  }
}
```

### Java

```java
NavOptions navOptions = new NavOptions.Builder()
  .setLaunchSingleTop(true)
  .setRestoreState(true)
  .setPopUpTo(NavGraph.findStartDestination(navController.getGraph()).getId(),
    false, // inclusive
    true) // saveState
  .build();
navController.navigate(selectedBottomNavId, null, navOptions);
```

To learn more about passing navigation options, see Apply NavOptions programmatically.

