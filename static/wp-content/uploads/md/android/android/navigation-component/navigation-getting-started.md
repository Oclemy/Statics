# Get started with the Navigation component

This topic shows you how to set up and work with the Navigation component. For a high level overview of the Navigation component, see the Navigation overview.

Set up your environment
-----------------------

To include Navigation support in your project, add the following dependencies to your app's `build.gradle` file:

### Groovy

```groovy
dependencies {
  def nav_version = "2.5.3"

  // Java language implementation
  implementation "androidx.navigation:navigation-fragment:$nav_version"
  implementation "androidx.navigation:navigation-ui:$nav_version"

  // Kotlin
  implementation "androidx.navigation:navigation-fragment-ktx:$nav_version"
  implementation "androidx.navigation:navigation-ui-ktx:$nav_version"

  // Feature module Support
  implementation "androidx.navigation:navigation-dynamic-features-fragment:$nav_version"

  // Testing Navigation
  androidTestImplementation "androidx.navigation:navigation-testing:$nav_version"

  // Jetpack Compose Integration
  implementation "androidx.navigation:navigation-compose:$nav_version"
}
```

### Kotlin

```kotlin
dependencies {
  val nav_version = "2.5.3"

  // Java language implementation
  implementation("androidx.navigation:navigation-fragment:$nav_version")
  implementation("androidx.navigation:navigation-ui:$nav_version")

  // Kotlin
  implementation("androidx.navigation:navigation-fragment-ktx:$nav_version")
  implementation("androidx.navigation:navigation-ui-ktx:$nav_version")

  // Feature module Support
  implementation("androidx.navigation:navigation-dynamic-features-fragment:$nav_version")

  // Testing Navigation
  androidTestImplementation("androidx.navigation:navigation-testing:$nav_version")

  // Jetpack Compose Integration
  implementation("androidx.navigation:navigation-compose:$nav_version")
}
```

For information on adding other Architecture Components to your project, see Adding components to your project.

Create a navigation graph
-------------------------

Navigation occurs between your app's _destinations_—that is, anywhere in your app to which users can navigate. These destinations are connected via _actions_.

A _navigation graph_ is a resource file that contains all of your destinations and actions. The graph represents all of your app's navigation paths.

Figure 1 shows a visual representation of a navigation graph for a sample app containing six destinations connected by five actions. Each destination is represented by a preview thumbnail, and connecting actions are represented by arrows that show how users can navigate from one destination to another.

![](https://developer.android.com/static/images/topic/libraries/architecture/navigation-graph_2x-callouts.png)

**Figure 1.** A navigation graph that shows previews of six different destinations that are connected via five actions.

1.  _Destinations_ are the different content areas in your app.
2.  _Actions_ are logical connections between your destinations that represent paths that users can take.

To add a navigation graph to your project, do the following:

1.  In the Project window, right-click on the `res` directory and select **New > Android Resource File**. The **New Resource File** dialog appears.
2.  Type a name in the **File name** field, such as "nav_graph".
3.  Select **Navigation** from the **Resource type** drop-down list, and then click **OK**.

When you add your first navigation graph, Android Studio creates a `navigation` resource directory within the `res` directory. This directory contains your navigation graph resource file (`nav_graph.xml`, for example).

Navigation Editor
-----------------

After adding a graph, Android Studio opens the graph in the _Navigation Editor_. In the Navigation Editor, you can visually edit navigation graphs or directly edit the underlying XML.

![](https://developer.android.com/static/images/guide/navigation/nav-editor-2x.png)

**Figure 2.** The Navigation Editor

1.  **Destinations panel**: Lists your navigation host and all destinations currently in the **Graph Editor**.
2.  **Graph Editor**: Contains a visual representation of your navigation graph. You can switch between **Design** view and the underlying XML representation in the **Text** view.
3.  **Attributes**: Shows attributes for the currently-selected item in the navigation graph.

Click the **Text** tab to see the corresponding XML, which should look similar to the following snippet:

```xml
    <?xml version="1.0" encoding="utf-8"?>
    <navigation xmlns:android="http://schemas.android.com/apk/res/android"
                xmlns:app="http://schemas.android.com/apk/res-auto"
                android:id="@+id/nav_graph">
    
    </navigation>
```

The `<navigation>` element is the root element of a navigation graph. As you add destinations and connecting actions to your graph, you can see the corresponding `<destination>` and `<action>` elements here as child elements. If you have nested graphs, they appear as child `<navigation>` elements.

Add a NavHost to an activity
----------------------------

One of the core parts of the Navigation component is the _navigation host_. The navigation host is an empty container where destinations are swapped in and out as a user navigates through your app.

A navigation host must derive from `NavHost`. The Navigation component's default `NavHost` implementation, `NavHostFragment`, handles swapping fragment destinations.

### Add a NavHostFragment via XML

The XML example below shows a `NavHostFragment` as part of an app's main activity:

```xml
<?xml version="1.0" encoding="utf-8"?>
<androidx.constraintlayout.widget.ConstraintLayout
    xmlns:android="http://schemas.android.com/apk/res/android"
    xmlns:app="http://schemas.android.com/apk/res-auto"
    xmlns:tools="http://schemas.android.com/tools"
    android:layout_width="match_parent"
    android:layout_height="match_parent"
    tools:context=".MainActivity">

    <androidx.appcompat.widget.Toolbar
        .../>

    <androidx.fragment.app.FragmentContainerView
        android:id="@+id/nav_host_fragment"
        android:name="androidx.navigation.fragment.NavHostFragment"
        android:layout_width="0dp"
        android:layout_height="0dp"
        app:layout_constraintLeft_toLeftOf="parent"
        app:layout_constraintRight_toRightOf="parent"
        app:layout_constraintTop_toTopOf="parent"
        app:layout_constraintBottom_toBottomOf="parent"

        app:defaultNavHost="true"
        app:navGraph="@navigation/nav_graph" />

    <com.google.android.material.bottomnavigation.BottomNavigationView
        .../>

</androidx.constraintlayout.widget.ConstraintLayout>
```

Note the following:

*   The `android:name` attribute contains the class name of your `NavHost` implementation.
*   The `app:navGraph` attribute associates the `NavHostFragment` with a navigation graph. The navigation graph specifies all of the destinations in this `NavHostFragment` to which users can navigate.
*   The `app:defaultNavHost="true"` attribute ensures that your `NavHostFragment` intercepts the system Back button. Note that only one `NavHost` can be the default. If you have multiple hosts in the same layout (two-pane layouts, for example), be sure to specify only one default `NavHost`.

You can also use the Layout Editor to add a `NavHostFragment` to an activity by doing the following:

1.  In your list of project files, double-click on your activity's layout XML file to open it in the Layout Editor.
2.  Within the **Palette** pane, choose the **Containers** category, or alternatively search for "NavHostFragment".
3.  Drag the `NavHostFragment` view onto your activity.
4.  Next, in the **Navigation Graphs** dialog that appears, choose the corresponding navigation graph to associate with this `NavHostFragment`, and then click **OK**.

Add destinations to the navigation graph
----------------------------------------

You can create a destination from an existing fragment or activity. You can also use the Navigation Editor to create a new destination or create a placeholder to later replace with a fragment or activity.

In this example, let's create a new destination. To add a new destination using the Navigation Editor, do the following:

1.  In the Navigation Editor, click the **New Destination** icon , and then click **Create new destination**.
2.  In the **New Android Component** dialog that appears, create your fragment. For more information on fragments, see the fragment documentation.

Back in the Navigation Editor, notice that Android Studio has added this destination to the graph.

Figure 3 shows an example of a destination and a placeholder destination.

![](https://developer.android.com/static/images/topic/libraries/architecture/navigation-destination-and-placeholder_2x.png)

**Figure 3.** A destination and a placeholder

For other ways to add destinations to your navigation graph, see Create destinations.

Anatomy of a destination
------------------------

Click on a destination to select it, and note the following attributes in the **Attributes** panel:

*   The **Type** field indicates whether the destination is implemented as a fragment, activity, or other custom class in your source code.
*   The **Label** field contains the user-readable name of the destination. This might be surfaced to the UI—for example, if you connect the `NavGraph` to a `Toolbar` using `setupWithNavController()`). For this reason, it is recommended that you use resource strings for this value.
*   The **ID** field contains the ID of the destination which is used to refer to the destination in code.
*   The **Class** dropdown shows the name of the class that is associated with the destination. You can click this dropdown to change the associated class to another destination type.

Click the **Text** tab to show the XML view of your navigation graph. The XML contains the same `id`, `name`, `label`, and `layout` attributes for the destination, as shown below:

```xml
<?xml version="1.0" encoding="utf-8"?>
<navigation xmlns:app="http://schemas.android.com/apk/res-auto"
    xmlns:tools="http://schemas.android.com/tools"
    xmlns:android="http://schemas.android.com/apk/res/android"
    app:startDestination="@id/blankFragment">
    <fragment
        android:id="@+id/blankFragment"
        android:name="com.example.cashdog.cashdog.BlankFragment"
        android:label="@string/label_blank"
        tools:layout="@layout/fragment_blank" />
</navigation>
```

Designate a screen as the start destination
-------------------------------------------

The _start destination_ is the first screen users see when opening your app, and it's the last screen users see when exiting your app. The Navigation editor uses a house icon to indicate the start destination.

Once you have all of your destinations in place, you can choose a start destination by doing the following:

1.  In the **Design** tab, click on the destination to highlight it.
    
2.  Click the **Assign start destination** button . Alternatively, you can right-click on the destination and click **Set as Start Destination**.
    

Connect destinations
--------------------

An _action_ is a logical connection between destinations. Actions are represented in the navigation graph as arrows. Actions usually connect one destination to another, though you can also create global actions that take you to a specific destination from anywhere in your app.

With actions, you're representing the different paths that users can take through your app. Note that to actually navigate to destinations, you still need to write the code to perform the navigation. This is covered in the Navigate to a destination section later in this topic.

You can use the Navigation Editor to connect two destinations by doing the following:

1.  In the **Design** tab, hover over the right side of the destination that you want users to navigate from. A circle appears over the right side of the destination, as shown in figure 4.
    
    ![](https://developer.android.com/static/images/topic/libraries/architecture/navigation-actioncircle_2x.png)
    
    **Figure 4.** A destination with an action connection circle
    
2.  Click and drag your cursor over the destination you want users to navigate to, and release. The resulting line between the two destinations represents an action, as shown in figure 5.
    
    ![](https://developer.android.com/static/images/topic/libraries/architecture/navigation-connected_2x.png)
    
    **Figure 5.** Connecting destinations with an action
    
3.  Click on the arrow to highlight the action. The following attributes appear in the **Attributes** panel:
    
    *   The **Type** field contains “Action”.
    *   The **ID** field contains the ID for the action.
    *   The **Destination** field contains the ID for the destination fragment or activity.
4.  Click the **Text** tab to toggle to the XML view. An action element is now added to the source destination. The action has an ID and a destination attribute that contains the ID of the next destination, as shown in the example below:

```xml    
        <?xml version="1.0" encoding="utf-8"?>
        <navigation xmlns:app="http://schemas.android.com/apk/res-auto"
            xmlns:tools="http://schemas.android.com/tools"
            xmlns:android="http://schemas.android.com/apk/res/android"
            app:startDestination="@id/blankFragment">
            <fragment
                android:id="@+id/blankFragment"
                android:name="com.example.cashdog.cashdog.BlankFragment"
                android:label="@string/label_blank"
                tools:layout="@layout/fragment_blank" >
                <action
                    android:id="@+id/action_blankFragment_to_blankFragment2"
                    app:destination="@id/blankFragment2" />
            </fragment>
            <fragment
                android:id="@+id/blankFragment2"
                android:name="com.example.cashdog.cashdog.BlankFragment2"
                android:label="@string/label_blank_2"
                tools:layout="@layout/fragment_blank_fragment2" />
        </navigation>
        
```

In your navigation graph, actions are represented by `<action>` elements. At a minimum, an action contains its own ID and the ID of the destination to which a user should be taken.

Navigate to a destination
-------------------------

Navigating to a destination is done using a `NavController`, an object that manages app navigation within a `NavHost`. Each `NavHost` has its own corresponding `NavController`. You can retrieve a `NavController` by using one of the following methods:

**Kotlin:**

*   `Fragment.findNavController()`.findNavController())
*   `View.findNavController()`
*   `Activity.findNavController(viewId: Int)`.findNavController(kotlin.Int))

**Java:**

*   `NavHostFragment.findNavController(Fragment)`)
*   `Navigation.findNavController(Activity, @IdRes int viewId)`)
*   `Navigation.findNavController(View)`)

When creating the `NavHostFragment` using `FragmentContainerView` or if manually adding the `NavHostFragment` to your activity via a `FragmentTransaction`, attempting to retrieve the `NavController` in `onCreate()` of an Activity via `Navigation.findNavController(Activity, @IdRes int)` will fail. You should retrieve the `NavController` directly from the `NavHostFragment` instead.

### Kotlin

```kotlin
val navHostFragment =
        supportFragmentManager.findFragmentById(R.id.nav_host_fragment) as NavHostFragment
val navController = navHostFragment.navController
```

### Java

```java
NavHostFragment navHostFragment =
        (NavHostFragment) getSupportFragmentManager().findFragmentById(R.id.nav_host_fragment);
NavController navController = navHostFragment.getNavController();
```

### Ensure type-safety by using Safe Args

The recommended way to navigate between destinations is to use the Safe Args Gradle plugin. This plugin generates simple object and builder classes that enable type-safe navigation and argument passing between destinations.

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

After you enable Safe Args, the plugin generates code that contains classes and methods for each action you've defined. For each action, Safe Args also generates a class for each _originating destination_, which is the destination from which the action originates. The generated class name is a combination of the originating destination class name and the word "Directions". For example, if the destination is named `SpecifyAmountFragment`, the generated class is named `SpecifyAmountFragmentDirections`. The generated class contains a static method for each action defined in the originating destination. This method takes any defined action parameters as arguments and returns a `NavDirections` object that you can pass to `navigate()`.

As an example, assume we have a navigation graph with a single action that connects the originating destination, `SpecifyAmountFragment`, to a receiving destination, `ConfirmationFragment`.

Safe Args generates a `SpecifyAmountFragmentDirections` class with a single method, `actionSpecifyAmountFragmentToConfirmationFragment()` that returns a `NavDirections` object. This returned `NavDirections` object can then be passed directly to `navigate()`, as shown in the following example:

### Kotlin

```kotlin
override fun onClick(view: View) {
    val action =
        SpecifyAmountFragmentDirections
            .actionSpecifyAmountFragmentToConfirmationFragment()
    view.findNavController().navigate(action)
}
```

### Java

```java
@Override
public void onClick(View view) {
    NavDirections action =
        SpecifyAmountFragmentDirections
            .actionSpecifyAmountFragmentToConfirmationFragment();
    Navigation.findNavController(view).navigate(action);
}
```

For more information on passing data between destinations with Safe Args, see Use Safe Args to pass data with type safety.

