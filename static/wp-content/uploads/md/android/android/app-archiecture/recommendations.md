# Recommendations for Android architecture

This page presents several Architecture best practices and recommendations. Adopt them to improve your app’s quality, robustness, and scalability. They also make it easier to maintain and test your app.

The best practices below are grouped by topic. Each has a priority that reflects how strongly the team recommends it. The list of priorities is as follows:

*   **Strongly recommended:** You should implement this practice unless it clashes fundamentally with your approach.
*   **Recommended:** This practice is likely to improve your app.
*   **Optional:** This practice can improve your app in certain circumstances.

Layered architecture
--------------------

Our recommended layered architecture favors separation of concerns. It drives UI from data models, complies with the single source of truth principle, and follows unidirectional data flow principles. Here are some best practices for layered architecture:

Recommendation

Description

Use a clearly defined data layer.

**Strongly recommended**

The data layer exposes application data to the rest of the app and contains the vast majority of business logic of your app.

*   You should create repositories even if they just contain a single data source.
*   In small apps, you can choose to place data layer types in a `data` package or module.

Use a clearly defined UI layer.

**Strongly recommended**

The UI layer displays the application data on the screen and serves as the primary point of user interaction.

*   In small apps, you can choose to place data layer types in a `ui` package or module.

More UI layer best practices here.

The data layer should expose application data using a repository.

**Strongly recommended**

Components in the UI layer such as composables, activities, or ViewModels shouldn't interact directly with a data source. Examples of data sources are:

*   Databases, DataStore, SharedPreferences, Firebase APIs.
*   GPS location providers.
*   Bluetooth data providers.
*   Network connectivity status provider.

Use coroutines and flows.

**Strongly recommended**

Use coroutines and flows to communicate between layers.

More coroutines best practices here.

Use a domain layer.

**Recommended in big apps**

Use a domain layer, use cases, if you need to reuse business logic that interacts with the data layer across multiple ViewModels, or you want to simplify the business logic complexity of a particular ViewModel

UI layer
--------

The role of the UI layer is to display the application data on the screen and serve as the primary point of user interaction. Here are some best practices for the UI layer:

The following snippet outlines how to collect the UI state in a lifecycle-aware manner:

### Views

```kotlin
    class MyFragment : Fragment() {
    
        private val viewModel: MyViewModel by viewModel()
    
        override fun onViewCreated(view: View, savedInstanceState: Bundle?) {
            super.onViewCreated(view, savedInstanceState)
    
            viewLifecycleOwner.lifecycleScope.launch {
                viewLifecycleOwner.repeatOnLifecycle(Lifecycle.State.STARTED) {
                    viewModel.uiState.collect {
                        // Process item
                    }
                }
            }
        }
    }
```

### Compose

```kotlin
    @Composable
    fun MyScreen(
        viewModel: MyViewModel = viewModel()
    ) {
        val uiState by viewModel.uiState.collectAsStateWithLifecycle()
    }
```

ViewModel
---------

ViewModels are responsible for providing the UI state and access to the data layer. Here are some best practices for ViewModels:

Recommendation

Description

ViewModels should be agnostic of the Android lifecycle.

**Strongly recommended**

ViewModels shouldn't hold a reference to any Lifecycle-related type. Don't pass `Activity, Fragment, Context` or `Resources` as a dependency. If something needs a `Context` in the ViewModel, you should strongly evaluate if that is in the right layer.

Use coroutines and flows.

**Strongly recommended**

The ViewModel interacts with the data or domain layers using:

*   Kotlin flows for receiving application data,
*   `suspend` functions to perform actions using `viewModelScope`.

Use ViewModels at screen level.

**Strongly recommended**

Do not use ViewModels in reusable pieces of UI. You should use ViewModels in:

*   Screen-level composables,
*   Activities/Fragments in Views,
*   Destinations or graphs when using Jetpack Navigation.

Use plain state holder classes in reusable UI components.

**Strongly recommended**

Use plain state holder classes for handling complexity in reusable UI components. By doing this, the state can be hoisted and controlled externally.

Do not use `AndroidViewModel`.

**Recommended**

Use the `ViewModel` class, not `AndroidViewModel`. The `Application` class shouldn't be used in the ViewModel. Instead, move the dependency to the UI or the data layer.

Expose a UI state.

**Recommended**

ViewModels should expose data to the UI through a single property called `uiState`. If the UI shows multiple, unrelated pieces of data, the VM can expose multiple UI state properties.

*   You should make `uiState` a `StateFlow`.
*   You should create the `uiState` using the `stateIn` operator with the `WhileSubscribed(5000)` policy (example) if the data comes as a stream of data from other layers of the hierarchy.
*   For simpler cases with no streams of data coming from the data layer, it's acceptable to use a `MutableStateFlow` exposed as an immutable `StateFlow` (example).
*   You can choose to have the `${Screen}UiState` as a data class that can contain data, errors and loading signals. This class could also be a sealed class if the different states are exclusive.

The following snippet outlines how to expose UI state from a ViewModel:

```kotlin
    @HiltViewModel
    class BookmarksViewModel @Inject constructor(
        newsRepository: NewsRepository
    ) : ViewModel() {
    
        val feedState: StateFlow<NewsFeedUiState> =
            newsRepository
                .getNewsResourcesStream()
                .mapToFeedState(savedNewsResourcesState)
                .stateIn(
                    scope = viewModelScope,
                    started = SharingStarted.WhileSubscribed(5_000),
                    initialValue = NewsFeedUiState.Loading
                )
    
        // ...
    }
```

Lifecycle
---------

The following are some best practices for working with the Android lifecycle:

Recommendation

Description

Do not override lifecycle methods.

**Strongly recommended**

Do not override lifecycle methods such as `onResume` in Activities or Fragments. Use `LifecycleObserver` instead. If the app needs to perform work when the lifecycle reaches a certain `Lifecycle.State`, use the `repeatOnLifecycle`.repeatOnLifecycle(androidx.lifecycle.Lifecycle.State,kotlin.coroutines.SuspendFunction1)) API.

The following snippet outlines how to perform operations given a certain Lifecycle state:

### Views

```kotlin
    class MyFragment: Fragment() {
        override fun onViewCreated(view: View, savedInstanceState: Bundle?) {
            super.onViewCreated(view, savedInstanceState)
    
            viewLifecycleOwner.lifecycle.addObserver(object : DefaultLifecycleObserver {
                override fun onResume(owner: LifecycleOwner) {
                    // ...
                }
                override fun onPause(owner: LifecycleOwner) {
                    // ...
                }
            }
        }
    }
    
```

### Compose

```kotlin
    @Composable
    fun MyApp() {
    
        val lifecycleOwner = LocalLifecycleOwner.current
        DisposableEffect(lifecycleOwner, ...) {
            val lifecycleObserver = object : DefaultLifecycleObserver {
                override fun onStop(owner: LifecycleOwner) {
                    // ...
                }
            }
    
            lifecycleOwner.lifecycle.addObserver(lifecycleObserver)
            onDispose {
                lifecycleOwner.lifecycle.removeObserver(lifecycleObserver)
            }
        }
    }
```

Handle dependencies
-------------------

There are several best practices you should observe when managing dependencies between components:

Recommendation

Description

Use dependency injection.

**Strongly recommended**

Use dependency injection best practices, mainly constructor injection when possible.

Scope to a component when necessary.

**Strongly recommended**

Scope to a dependency container when the type contains mutable data that needs to be shared or the type is expensive to initialize and is widely used in the app.

Use Hilt.

**Recommended**

Use Hilt or manual dependency injection in simple apps. Use Hilt if your project is complex enough. For example, if you have:

*   Multiple screens with ViewModels—integration
*   WorkManager usage—integration
*   Advance usage of Navigation, such as ViewModels scoped to the nav graph—integration.

Testing
-------

The following are some best practices for testing:

Recommendation

Description

Know what to test.

**Strongly recommended**

Unless the project is roughly as simple as a hello world app, you should test it, at minimum with:

*   Unit test ViewModels, including Flows.
*   Unit test data layer entities. That is, repositories and data sources.
*   UI navigation tests that are useful as regression tests in CI.

Prefer fakes to mocks.

**Strongly recommended**

Read more in the Use test doubles in Android documentation.

Test StateFlows.

**Strongly recommended**

When testing `StateFlow`:

*   Assert on the `value` property whenever possible
*   You should create a `collectJob` if using `WhileSubscribed`

For more information, check the What to test in Android DAC guide.

Models
------

You should observe these best practices when developing models in your apps:

Recommendation

Description

Create a model per layer in complex apps.

**Recommended**

In complex apps, create new models in different layers or components when it makes sense. Consider the following examples:

*   A remote data source can map the model that it receives through the network to a simpler class with just the data the app needs
*   Repositories can map DAO models to simpler data classes with just the information the UI layer needs.
*   ViewModel can include data layer models in `UiState` classes.

Naming conventions
------------------

When naming your codebase, you should be aware of the following best practices:

Recommendation

Description

Naming methods.

**Optional**

Methods should be a verb phrase. For example, `makePayment()`.

Naming properties.

**Optional**

Properties should be a noun phrase. For example, `inProgressTopicSelection`.

Naming streams of data.

**Optional**

When a class exposes a Flow stream, LiveData, or any other stream, the naming convention is `get{model}Stream()`. For example, `getAuthorStream(): Flow` If the function returns a list of models the model name should be in the plural: `getAuthorsStream(): Flow>`

Naming interfaces implementations.

**Optional**

Names for the implementations of interfaces should be meaningful. Have `Default` as the prefix if a better name cannot be found. For example, for a `NewsRepository` interface, you could have an `OfflineFirstNewsRepository`, or `InMemoryNewsRepository`. If you can find no good name, then use `DefaultNewsRepository`. Fake implementations should be prefixed with `Fake`, as in `FakeAuthorsRepository`.