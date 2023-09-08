# Add support for new destination types

`NavControllers` rely on one or more `Navigator` objects to perform the navigation operation. By default, all `NavControllers` support leaving the navigation graph by navigating to another activity using the `ActivityNavigator` class and its nested `ActivityNavigator.Destination` class. To be able to navigate to any other type of destination, one or more additional `Navigator` objects must be added to the `NavController`. For example, when using fragments as destinations, the `NavHostFragment` automatically adds the `FragmentNavigator` class to its `NavController`.

To add a new `Navigator` object to a `NavController`, you must use the respective `NavController` class’s `getNavigatorProvider()`) method, followed by the class’s `addNavigator()` method. The following code shows an example of adding a fictional `CustomNavigator` object to a `NavController`:

### Kotlin

```kotlin
val customNavigator = CustomNavigator()
navController.navigatorProvider += customNavigator
```

### Java

```java
CustomNavigator customNavigator = new CustomNavigator();
navController.getNavigatorProvider().addNavigator(customNavigator);
```

Most `Navigator` classes have a nested destination subclass. This subclass can be used to specify additional attributes unique to your destination. For further information about Destination subclasses, see the reference documentation for the appropriate `Navigator` class.

