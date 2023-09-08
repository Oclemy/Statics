# Build a graph programmatically using the Kotlin DSL

The Navigation component provides a Kotlin-based domain-specific language, or DSL, that relies on Kotlin's type-safe builders. This API allows you to declaratively compose your graph in your Kotlin code, rather than inside an XML resource. This can be useful if you wish to build your app's navigation dynamically. For example, your app could download and cache a navigation configuration from an external web service and then use that configuration to dynamically build a navigation graph in your activity's `onCreate()` function.

Dependencies
------------

To use the Kotlin DSL, add the following dependency to your app's `build.gradle` file:

### Groovy

```groovy
dependencies {
    def nav_version = "2.5.3"

    api "androidx.navigation:navigation-fragment-ktx:$nav_version"
}
```

### Kotlin

```kotlin
dependencies {
    val nav_version = "2.5.3"

    api("androidx.navigation:navigation-fragment-ktx:$nav_version")
}
```

Building a graph
----------------

Let's start with a basic example based on the Sunflower app. For this example, we have two destinations: `home` and `plant_detail`. The `home` destination is present when the user first launches the app. This destination displays a list of plants from the user's garden. When the user selects one of the plants, the app navigates to the `plant_detail` destination.

Figure 1 shows these destinations along with the arguments required by the `plant_detail` destination and an action, `to_plant_detail`, that the app uses to navigate from `home` to `plant_detail`.

![The Sunflower app has two destinations along with an action that connects them.](https://developer.android.com/static/images/guide/navigation/navigation-kotlin-dsl-1.png)

**Figure 1.** The Sunflower app has two destinations, `home` and `plant_detail`, along with an action that connects them.

### Hosting a Kotlin DSL Nav Graph

Before you can build your app's navigation graph, you need a place to host the graph. This example uses fragments, so it hosts the graph in a `NavHostFragment` inside of a `FragmentContainerView`:

```xml
    <!-- activity_garden.xml -->
    <FrameLayout
        xmlns:android="http://schemas.android.com/apk/res/android"
        xmlns:app="http://schemas.android.com/apk/res-auto">
        android:layout_width="match_parent"
        android:layout_height="match_parent">
    
        <androidx.fragment.app.FragmentContainerView
            android:id="@+id/nav_host"
            android:name="androidx.navigation.fragment.NavHostFragment"
            android:layout_width="match_parent"
            android:layout_height="match_parent"
            app:defaultNavHost="true" />
    
    </FrameLayout>
```

Notice that the `app:navGraph` attribute is not set in this example. The graph isn't defined as a resource in the `res/navigation` folder so it needs to be set as part of the `onCreate()` process in the activity.

In XML, an action ties together a destination ID with one or more arguments. However, when using the Navigation DSL a route can contain arguments as part of the route. This means that there is no concept of actions when using the DSL.

The next step is to define some constants that you will use when defining your graph.

### Create constants for your graph

XML-based navigation graphs are parsed as part of the Android build process. A numeric constant is created for each `id` attribute defined in the graph. These build time generated static IDs are not available when building your navigation graph at runtime so the Navigation DSL uses route strings instead of IDs. Each route is represented by a unique string and it is good practice to define these as constants to reduce the risk of typo-related bugs.

When dealing with arguments, these are built into the route string. Building this logic into the route can, once again, reduce the risk of typo-related bugs creeping in.

```kotlin
    object nav_routes {
        const val home = "home"
        const val plant_detail = "plant_detail"
    }
    
    object nav_arguments {
        const val plant_id = "plant_id"
        const val plant_name = "plant_name"
    }
```

### Build a graph with the NavGraphBuilder DSL

Once you've defined your constants, you can build the navigation graph.

```kotlin
    val navController = findNavController(R.id.nav_host_fragment)
    navController.graph = navController.createGraph(
        startDestination = nav_routes.home
    ) {
        fragment<HomeFragment>(nav_routes.home) {
            label = resources.getString(R.string.home_title)
        }
    
        fragment<PlantDetailFragment>("${nav_routes.plant_detail}/{${nav_arguments.plant_id}}") {
            label = resources.getString(R.string.plant_detail_title)
            argument(nav_arguments.plant_id) {
                type = NavType.StringType
            }
        }
    }
```

In this example, the trailing lambda defines two fragment destinations using the `fragment()`.fragment(kotlin.String,%20kotlin.Function1)) DSL builder function. This function requires a route string for the destination which is obtained from the constants. The function also accepts an optional lambda for additional configuration, such as the destination label, as well as embedded builder functions for arguments and deep links.

The `Fragment` class that manages the UI of each destination is passed in as a parameterized type inside angle brackets (`<>`). This has the same effect as setting the `android:name` attribute on fragment destinations that are defined using XML.

### Navigating with your Kotlin DSL graph

Finally, you can navigate from `home` to `plant_detail` using standard NavController.navigate()) calls:

```kotlin
    private fun navigateToPlant(plantId: String) {
       findNavController().navigate("${nav_routes.plant_detail}/$plantId")
    }
```

In `PlantDetailFragment`, you can obtain the value of the argument as shown in the following example:

```kotlin
    val plantId: String? = arguments?.getString(nav_arguments.plant_id)
```

Details of how to supply arguments when navigating can be found in the providing destination arguments section.

The rest of this guide describes common navigation graph elements, destinations, and how to use them when building your graph.

Destinations
------------

The Kotlin DSL provides built-in support for three destination types: `Fragment`, `Activity`, and `NavGraph` destinations, each of which has its own inline extension function available for building and configuring the destination.

### Fragment destinations

The `fragment()`.fragment(kotlin.String)) DSL function can be parameterized to the implementing fragment class and takes a unique route string to assign to this destination, followed by a lambda where you can provide additional configuration as described in the Navigating with your Kotlin DSL graph section.

```kotlin
    fragment<FragmentDestination>(nav_routes.route_name) {
       label = getString(R.string.fragment_title)
       // arguments, deepLinks
    }
```

### Activity destination

The `activity()`.activity(kotlin.String,kotlin.Function1)) DSL function takes a unique route string to assign to this destination but is not parameterized to any implementing activity class. Instead, you set an optional `activityClass` in a trailing lambda. This flexibility allows you to define an activity destination for an activity that should be launched using an implicit intent, where an explicit activity class would not make sense. As with fragment destinations, you can also configure a label, arguments, and deep links.

```kotlin
    activity(nav_routes.route_name) {
       label = getString(R.string.activity_title)
       // arguments, deepLinks...
    
       activityClass = ActivityDestination::class
    }
```

### Navigation graph destination

The `navigation()`.navigation(kotlin.String,kotlin.String,kotlin.Function1)) DSL function can be used to build a nested navigation graph. This function takes three arguments: a route to assign to the graph, the route of the starting destination of the graph, and a lambda to further configure the graph. Valid elements include other destinations, arguments, deep links, and a descriptive label for the destination). This label can be useful for binding the navigation graph to UI components using NavigationUI

```kotlin
    navigation("route_to_this_graph", nav_routes.home) {
       // label, other destinations, deep links
    }
```

### Supporting custom destinations

If you’re using a new destination type that does not directly support the Kotlin DSL, you can add these destinations to your Kotlin DSL using `addDestination()`):

```kotlin
    // The NavigatorProvider is retrieved from the NavController
    val customDestination = navigatorProvider[CustomNavigator::class].createDestination().apply {
        route = Graph.CustomDestination.route
    }
    addDestination(customDestination)
```

As an alternative, you can also use the unary plus operator to add a newly constructed destination directly to the graph:

```kotlin
    // The NavigatorProvider is retrieved from the NavController
    +navigatorProvider[CustomNavigator::class].createDestination().apply {
        route = Graph.CustomDestination.route
    }
    
```

### Providing destination arguments

Any destination can define arguments that are optional or required. Actions can be defined using the `argument()`) function on `NavDestinationBuilder`, which is the base class for all destination builder types. This function takes the argument’s name as a string and a lambda that is used to construct and configure a `NavArgument`.

Inside the lambda you can specify the argument data type, a default value if applicable, and whether or not it is nullable.

kotlin
    fragment<PlantDetailFragment>("${nav_routes.plant_detail}/{${nav_arguments.plant_id}}") {
        label = getString(R.string.plant_details_title)
        argument(nav_arguments.plant_id) {
            type = NavType.StringType
            defaultValue = getString(R.string.default_plant_id)
            nullable = true  // default false
        }
    }
```

If a `defaultValue` is given, the type can be inferred. If both a `defaultValue` and a `type` are given, the types must match. See the NavType reference documentation for a complete list of argument types available.

#### Providing custom types

Certain types, such as `ParcelableType` and `SerializableType`, do not support parsing values from the strings used by routes or deep links. This is because they do not rely on reflection at runtime. By providing a custom `NavType` class, you can control exactly how your type is parsed from a route or deep link. This allows you to use Kotlin Serialization or other libraries to provide reflectionless encoding and decoding of your custom type.

For example, a data class that represents search parameters being passed to your search screen could implement both `Serializable` (to providing the encoding/decoding support) and `Parcelize` (to support saving to and restoring from a `Bundle`):

```kotlin
    @Serializable
    @Parcelize
    data class SearchParameters(
      val searchQuery: String,
      val filters: List<String>
    )
```

A custom `NavType` could be written as:

```kotlin
    val SearchParametersType = object : NavType<SearchParameters>(
      isNullableAllowed = false
    ) {
      override fun put(bundle: Bundle, key: String, value: SearchParameters) {
        bundle.putParcelable(key, value)
      }
      override fun get(bundle: Bundle, key: String): SearchParameters {
        return bundle.getParcelable(key) as SearchParameters
      }
    
      override fun parseValue(value: String): SearchParameters {
        return Json.decodeFromString<SearchParameters>(value)
      }
    
      // Only required when using Navigation 2.4.0-alpha07 and lower
      override val name = "SearchParameters"
    }
```

This can then be used in your Kotlin DSL like any other type:

```kotlin
    fragment<SearchFragment>(nav_routes.plant_search) {
        label = getString(R.string.plant_search_title)
        argument(nav_arguments.search_parameters) {
            type = SearchParametersType
            defaultValue = SearchParameters("cactus", emptyList())
        }
    }
    
```

This example uses Kotlin Serialization to parse the value from the string, which means that Kotlin Serialization must also be used when you navigate to the destination to ensure the formats match:

```kotlin
    val params = SearchParameters("rose", listOf("available"))
    val searchArgument = Uri.encode(Json.encodeToString(params))
    navController.navigate("${nav_routes.plant_search}/$searchArgument")
```

The parameter can be obtained from the arguments in the destination:

```kotlin
    val params: SearchParameters? = arguments?.getParcelable(nav_arguments.search_parameters)
    
```

Deep links
----------

Deep links can be added to any destination, just as they can with an XML driven navigation graph. All of the same procedures defined in Creating a deep link for a destination apply to the process of creating an explicit deep link using the Kotlin DSL.

When creating an implicit deep link however, you don’t have an XML navigation resource that can be analyzed for `<deepLink>` elements. Therefore, you cannot rely on placing a `<nav-graph>` element in your `AndroidManifest.xml` file and must instead add intent filters to your activity manually. The intent filter you supply should match the base URL pattern, action, and mimetype of your app's deep links.

You can supply a more specific `deeplink` for each individually deep linked destination using the `deepLink()`) DSL function. This function accepts a `NavDeepLink` that contains a `String` representing the URI pattern, a `String` representing the intent actions, and a `String` representing the mimeType .

For example:

```kotlin
    deepLink {
        uriPattern = "http://www.example.com/plants/"
        action = "android.intent.action.MY_ACTION"
        mimeType = "image/*"
    }
```

There is no limit to the number of deep links you can add. Each time you call `deepLink()`) a new deep link is appended to a list that is maintained for that destination.

A more complex implicit deep link scenario that also defines path and query-based parameters is shown below:

```kotlin
    val baseUri = "http://www.example.com/plants"
    
    fragment<PlantDetailFragment>(nav_routes.plant_detail) {
       label = getString(R.string.plant_details_title)
       deepLink(navDeepLink {
        uriPattern = "${baseUri}/{id}"
       })
       deepLink(navDeepLink {
        uriPattern = "${baseUri}/{id}?name={plant_name}"
       })
    }
```

You can use string interpolation to simplify the definition.

Limitations
-----------

The Safe Args plugin is incompatible with the Kotlin DSL, as the plugin looks for XML resource files to generate `Directions` and `Arguments` classes.

