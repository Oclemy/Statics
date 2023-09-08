# Save UI states

Preserving and restoring an activity's UI state in a timely fashion across system-initiated activity or application destruction is a crucial part of the user experience. In these cases the user expects the UI state to remain the same, but the system destroys the activity and any state stored in it.

To bridge the gap between user expectation and system behavior, use a combination of `ViewModel` objects, the `onSaveInstanceState()`) method, and/or local storage to persist the UI state across such application and activity instance transitions. Deciding how to combine these options depends on the complexity of your UI data, use cases for your app, and consideration of speed of retrieval versus memory usage.

Regardless of which approach you take, you should ensure your app meets users expectations with respect to their UI state, and provides a smooth, snappy UI (avoids lag time in loading data into the UI, especially after frequently occurring configuration changes, like rotation). In most cases you should use both ViewModel and onSaveInstanceState().

This page discusses user expectations about UI state, options available for preserving state, the tradeoffs and limitations of each.

User expectations and system behavior
-------------------------------------

Depending upon the action a user takes, they either expect that activity state to be cleared or the state to be preserved. In some cases the system automatically does what is expected by the user. In other cases the system does the opposite of what the user expects.

### User-initiated UI state dismissal

The user expects that when they start an activity, the transient UI state of that activity will remain the same until the user completely dismisses the activity. The user can completely dismiss an activity by:

*   pressing the back button
*   swiping the activity off of the Overview (Recents) screen
*   navigating up from the activity
*   killing the app from Settings screen
*   completing some sort of "finishing" action (which is backed by Activity.finish())

The user's assumption in these complete dismissal cases is that they have permanently navigated away from the activity, and if they re-open the activity they expect the activity to start from a clean state. The underlying system behavior for these dismissal scenarios matches the user expectation - the activity instance will get destroyed and removed from memory, along with any state stored in it and any saved instance state record associated with the activity.

There are some exceptions to this rule about complete dismissal -- for example a user might expect a browser to take them to the exact webpage they were looking at before they exited the browser using the back button.

### System-initiated UI state dismissal

A user expects an activity's UI state to remain the same throughout a configuration change, such as rotation or switching into multi-window mode. However, by default the system destroys the activity when such a configuration change occurs, wiping away any UI state stored in the activity instance. To learn more about device configurations, see the Configuration reference page. Note, it is possible (though not recommended) to override the default behavior for configuration changes. See Handling the Configuration Change Yourself for more details.

A user also expects your activity's UI state to remain the same if they temporarily switch to a different app and then come back to your app later. For example, the user performs a search in your search activity and then presses the home button or answers a phone call - when they return to the search activity they expect to find the search keyword and results still there, exactly as before.

In this scenario, your app is placed in the background the system does its best to keep your app process in memory. However, the system may destroy the application process while the user is away interacting with other apps. In such a case, the activity instance is destroyed, along with any state stored in it. When the user relaunches the app, the activity is unexpectedly in a clean state. To learn more about process death, see Processes and Application Lifecycle.

Options for preserving UI state
-------------------------------

When the user's expectations about UI state do not match default system behavior, you must save and restore the user's UI state to ensure that the system-initiated destruction is transparent to the user.

Each of the options for preserving UI state vary along the following dimensions that impact the user experience:

ViewModel

Saved instance state

Persistent storage

Storage location

in memory

in memory

on disk or network

Survives configuration change

Yes

Yes

Yes

Survives system-initiated process death

No

Yes

Yes

Survives user complete activity dismissal/onFinish()

No

No

Yes

Data limitations

complex objects are fine, but space is limited by available memory

only for primitive types and simple, small objects such as String

only limited by disk space or cost / time of retrieval from the network resource

Read/write time

quick (memory access only)

slow (requires serialization/deserialization and disk access)

slow (requires disk access or network transaction)

Use ViewModel to handle configuration changes
---------------------------------------------

ViewModel is ideal for storing and managing UI-related data while the user is actively using the application. It allows quick access to UI data and helps you avoid refetching data from network or disk across rotation, window resizing, and other commonly occurring configuration changes. To learn how to implement a ViewModel, see the ViewModel guide.

ViewModel retains the data in memory, which means it is cheaper to retrieve than data from the disk or the network. A ViewModel is associated with an activity (or some other lifecycle owner) - it stays in memory during a configuration change and the system automatically associates the ViewModel with the new activity instance that results from the configuration change.

ViewModels are automatically destroyed by the system when your user backs out of your activity or fragment or if you call `finish()`, which means the state will be cleared as the user expects in these scenarios.

Unlike saved instance state, ViewModels are destroyed during a system-initiated process death. This is why you should use ViewModel objects in combination with `onSaveInstanceState()` (or some other disk persistence), stashing identifiers in `savedInstanceState` to help view models reload the data after system death.

If you already have an in-memory solution in place for storing your UI state across configuration changes, you may not need to use ViewModel.

Use onSaveInstanceState() as backup to handle system-initiated process death
----------------------------------------------------------------------------

The `onSaveInstanceState()`) callback stores data needed to reload the state of a UI controller, such as an activity or a fragment, if the system destroys and later recreates that controller. To learn how to implement saved instance state, see _Saving and restoring activity state_ in the Activity Lifecycle guide.

Saved instance state bundles persist through both configuration changes and process death but are limited by storage and speed, because `onSavedInstanceState()` serializes data to disk. Serialization can consume a lot of memory if the objects being serialized are complicated. Because this process happens on the main thread during a configuration change, long-running serialization can cause dropped frames and visual stutter.

Do not use store `onSavedInstanceState()` to store large amounts of data, such as bitmaps, nor complex data structures that require lengthy serialization or deserialization. Instead, store only primitive types and simple, small objects such as `String`. As such, use `onSaveInstanceState()` to store a minimal amount of data necessary, such as an ID, to re-create the data necessary to restore the UI back to its previous state should the other persistence mechanisms fail. Most apps should implement `onSaveInstanceState()` to handle system-initiated process death.

Depending on your app's use cases, you might not need to use `onSaveInstanceState()` at all. For example, a browser might take the user back to the exact webpage they were looking at before they exited the browser. If your activity behaves this way, you can forego using `onSaveInstanceState()` and instead persist everything locally.

Additionally, when you open an activity from an intent, the bundle of extras is delivered to the activity both when the configuration changes and when the system restores the activity. If a piece of UI state data, such as a search query, were passed in as an intent extra when the activity was launched, you could use the extras bundle instead of the `onSaveInstanceState()` bundle. To learn more about intent extras, see Intent and Intent Filters.

In either of these scenarios, you should still use a `ViewModel` to avoid wasting cycles reloading data from the database during a configuration change.

In cases where the UI data to preserve is simple and lightweight, you might use `onSaveInstanceState()` alone to preserve your state data.

### Hook into saved state using SavedStateRegistry

Beginning with Fragment 1.1.0 or its transitive dependency Activity 1.0.0, UI controllers, such as an `Activity` or `Fragment`, implement `SavedStateRegistryOwner` and provide a `SavedStateRegistry` that is bound to that controller. `SavedStateRegistry` allows components to hook into your UI controller's saved state to consume or contribute to it. For example, the Saved State module for ViewModel uses `SavedStateRegistry` to create a `SavedStateHandle` and provide it to your `ViewModel` objects. You can retrieve the `SavedStateRegistry` from within your UI controller by calling `getSavedStateRegistry()`).

Components that contribute to saved state must implement `SavedStateRegistry.SavedStateProvider`, which defines a single method called `saveState()`). The `saveState()` method allows your component to return a `Bundle` containing any state that should be saved from that component. `SavedStateRegistry` calls this method during the saving state phase of the UI controller's lifecycle.

### Kotlin

```kotlin
class SearchManager : SavedStateRegistry.SavedStateProvider {
    companion object {
        private const val QUERY = "query"
    }

    private val query: String? = null

    ...

    override fun saveState(): Bundle {
        return bundleOf(QUERY to query)
    }
}
```

### Java

```java
class SearchManager implements SavedStateRegistry.SavedStateProvider {
    private static String QUERY = "query";
    private String query = null;
    ...

    @NonNull
    @Override
    public Bundle saveState() {
        Bundle bundle = new Bundle();
        bundle.putString(QUERY, query);
        return bundle;
    }
}
```

To register a `SavedStateProvider`, call `registerSavedStateProvider()`) on the `SavedStateRegistry`, passing a key to associate with the provider's data as well as the provider. The previously saved data for the provider can be retrieved from the saved state by calling `consumeRestoredStateForKey()`) on the `SavedStateRegistry`, passing in the key associated with the provider's data.

Within an `Activity` or `Fragment`, you can register a `SavedStateProvider` in `onCreate()` after calling `super.onCreate()`. Alternatively, you can set a `LifecycleObserver` on a `SavedStateRegistryOwner`, which implements `LifecycleOwner`, and register the `SavedStateProvider` once the `ON_CREATE` event occurs. By using a `LifecycleObserver`, you can decouple the registration and retrieval of the previously saved state from the `SavedStateRegistryOwner` itself.

### Kotlin

```kotlin
class SearchManager(registryOwner: SavedStateRegistryOwner) : SavedStateRegistry.SavedStateProvider {
    companion object {
        private const val PROVIDER = "search_manager"
        private const val QUERY = "query"
    }

    private val query: String? = null

    init {
        // Register a LifecycleObserver for when the Lifecycle hits ON_CREATE
        registryOwner.lifecycle.addObserver(LifecycleEventObserver { _, event ->
            if (event == Lifecycle.Event.ON_CREATE) {
                val registry = registryOwner.savedStateRegistry

                // Register this object for future calls to saveState()
                registry.registerSavedStateProvider(PROVIDER, this)

                // Get the previously saved state and restore it
                val state = registry.consumeRestoredStateForKey(PROVIDER)

                // Apply the previously saved state
                query = state?.getString(QUERY)
            }
        }
    }

    override fun saveState(): Bundle {
        return bundleOf(QUERY to query)
    }

    ...
}

class SearchFragment : Fragment() {
    private var searchManager = SearchManager(this)
    ...
}
```

### Java

```java
class SearchManager implements SavedStateRegistry.SavedStateProvider {
    private static String PROVIDER = "search_manager";
    private static String QUERY = "query";
    private String query = null;

    public SearchManager(SavedStateRegistryOwner registryOwner) {
        registryOwner.getLifecycle().addObserver((LifecycleEventObserver) (source, event) -> {
            if (event == Lifecycle.Event.ON_CREATE) {
                SavedStateRegistry registry = registryOwner.getSavedStateRegistry();

                // Register this object for future calls to saveState()
                registry.registerSavedStateProvider(PROVIDER, this);

                // Get the previously saved state and restore it
                Bundle state = registry.consumeRestoredStateForKey(PROVIDER);

                // Apply the previously saved state
                if (state != null) {
                    query = state.getString(QUERY);
                }
            }
        });
    }

    @NonNull
    @Override
    public Bundle saveState() {
        Bundle bundle = new Bundle();
        bundle.putString(QUERY, query);
        return bundle;
    }

    ...
}

class SearchFragment extends Fragment {
    private SearchManager searchManager = new SearchManager(this);
    ...
}
```

Use local persistence to handle process death for complex or large data
-----------------------------------------------------------------------

Persistent local storage, such as a database or shared preferences, will survive for as long as your application is installed on the user's device (unless the user clears the data for your app). While such local storage survives system-initiated activity and application process death, it can be expensive to retrieve because it will have to be read from local storage in to memory. Often this persistent local storage may already be a part of your application architecture to store all data you don't want to lose if you open and close the activity.

Neither ViewModel nor saved instance state are long-term storage solutions and thus are not replacements for local storage, such as a database. Instead you should use these mechanisms for temporarily storing transient UI state only and use persistent storage for other app data. See Guide to App Architecture for more details about how to leverage local storage to persist your app model data long term (e.g. across restarts of the device).

Managing UI state: divide and conquer
-------------------------------------

You can efficiently save and restore UI state by dividing the work among the various types of persistence mechanisms. In most cases, each of these mechanisms should store a different type of data used in the activity, based on the tradeoffs of data complexity, access speed, and lifetime:

*   Local persistence: Stores all data you don't want to lose if you open and close the activity.
    *   Example: A collection of song objects, which could include audio files and metadata.
*   `ViewModel`: Stores in memory all the data needed to display the associated UI Controller.
    *   Example: The song objects of the most recent search and the most recent search query.
*   `onSaveInstanceState()`): Stores a small amount of data needed to easily reload activity state if the system stops and then recreates the UI Controller. Instead of storing complex objects here, persist the complex objects in local storage and store a unique ID for these objects in `onSaveInstanceState()`)
    *   Example: Storing the most recent search query.

As an example, consider an activity that allows you to search through your library of songs. Here's how different events should be handled:

When the user adds a song, the `ViewModel` immediately delegates persisting this data locally. If this newly added song should be shown in the UI, you should also update the data in the `ViewModel` object to reflect the addition of the song. Remember to do all database inserts off of the main thread.

When the user searches for a song, whatever complex song data you load from the database for the UI Controller should be immediately stored in the `ViewModel` object. You should also save the search query itself in the `ViewModel` object.

When the activity goes into the background, the system calls `onSaveInstanceState()`). You should save the search query in the `onSaveInstanceState()` bundle. This small amount of data is easy to save. It's also all the information you need to get the activity back into its current state.

Restoring complex states: reassembling the pieces
-------------------------------------------------

When it is time for the user to return to the activity, there are two possible scenarios for recreating the activity:

*   The activity is recreated after having been stopped by the system. The activity has the query saved in an `onSaveInstanceState()`) bundle, and should pass the query to the `ViewModel`. The `ViewModel` sees that it has no search results cached and delegates loading the search results using the given search query.
*   The activity is created after a configuration change. The activity has the query saved in an `onSaveInstanceState()` bundle, and the `ViewModel` already has the search results cached. You pass the query from the `onSaveInstanceState()` bundle to the `ViewModel`, which determines that it already has loaded the necessary data and that it does not need to re-query the database.

