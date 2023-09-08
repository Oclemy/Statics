# ViewModel overview

The `ViewModel` class is a business logic or screen level state holder. It exposes state to the UI and encapsulates related business logic. Its principal advantage is that it caches state and persists it through configuration changes. This means that your UI doesn’t have to fetch data again when navigating between activities, or following configuration changes, such as when rotating the screen.

For more information on state holders, see the state holders guidance. Similarly, for more information on the UI layer generally, see the UI layer guidance.

ViewModel benefits
------------------

The alternative to a ViewModel is a plain class that holds the data you display in your UI. This can become a problem when navigating between activities or Navigation destinations. Doing so destroys that data if you don't store it using the saving instance state mechanism. ViewModel provides a convenient API for data persistence that resolves this issue.

The key benefits of the ViewModel class are essentially two fold:

*   It allows you to persist UI state.
*   It provides access to business logic.

### Persistence

ViewModel allows the survival through both the state that a ViewModel holds, and operations that a ViewModel trigger. This caching means that you don’t have to fetch data again through common configuration changes, such as a screen rotation.

#### Scope

When you instantiate a ViewModel, you pass it an object that implements the `ViewModelStoreOwner` interface. This may be a Navigation destination, Navigation graph, activity, fragment, or any other type that implements the interface. Your ViewModel is then scoped to the Lifecycle of the `ViewModelStoreOwner`. It remains in memory until its `ViewModelStoreOwner` goes away permanently.

A range of classes are either direct or indirect subclasses of the `ViewModelStoreOwner` interface. The direct subclasses are `ComponentActivity`, `Fragment`, and `NavBackStackEntry`. For a full list of indirect subclasses, see the `ViewModelStoreOwner` reference.

When the fragment or activity to which the ViewModel is scoped is destroyed, asynchronous work continues in the ViewModel that is scoped to it. This is the key to persistence.

For more information, see the section below on ViewModel lifecycle.

#### SavedStateHandle

SaveStateHandle allows you to persist data not just through configuration changes, but across process recreation. That is, it enables you to keep the UI state intact even when the user closes the app and opens it at a later time.

### Access to business logic

Even though the vast majority of business logic is present in the data layer, the UI layer can also contain business logic. This can be the case when combining data from multiple repositories to create the screen UI state, or when a particular type of data doesn't require a data layer.

ViewModel is the right place to handle business logic in the UI layer. The ViewModel is also in charge of handling events and delegating them to other layers of the hierarchy when business logic needs to be applied to modify application data.

Jetpack Compose
---------------

When using Jetpack Compose, ViewModel is the primary means of exposing screen UI state to your composables. In a hybrid app, activities and fragments simply host your composable functions. This is a shift from past approaches, where it wasn't that simple and intuitive to create reusable pieces of UI with activities and fragments, which caused them to be much more active as UI controllers.

The most important thing to keep in mind when using ViewModel with Compose is that you cannot scope a ViewModel to a composable. This is because a composable is not a `ViewModelStoreOwner`. Two instances of the same composable in the Composition, or two different composables accessing the same ViewModel type under the same `ViewModelStoreOwner` would receive the _same_ instance of the ViewModel, which often is not the expected behavior.

To get the benefits of ViewModel in Compose, host each screen in a Fragment or Activity, or use Compose Navigation and use ViewModels in composable functions as close as possible to the Navigation destination. That is because you can scope a ViewModel to Navigation destinations, Navigation graphs, Activities, and Fragments.

For more information, see the guide on State and Jetpack Compose.

Implement a ViewModel
---------------------

The following is an example implementation of a ViewModel. The use case is displaying a list of users.

### Kotlin

```kotlin
    data class DiceUiState(
        val firstDieValue: Int? = null,
        val secondDieValue: Int? = null,
        val numberOfRolls: Int = 0,
    )
    
    class DiceRollViewModel : ViewModel() {
    
        // Expose screen UI state
        private val _uiState = MutableStateFlow(DiceUiState())
        val uiState: StateFlow<DiceUiState> = _uiState.asStateFlow()
    
        // Handle business logic
        fun rollDice() {
            _uiState.update { currentState ->
                currentState.copy(
                    firstDieValue = Random.nextInt(from = 1, until = 7),
                    secondDieValue = Random.nextInt(from = 1, until = 7),
                    numberOfRolls = currentState.numberOfRolls + 1,
                )
            }
        }
    }
    
```

### Java

```java
    public class MyViewModel extends ViewModel {
    
        // Expose screen UI state
        private MutableLiveData<List<User>> users;
        public LiveData<List<User>> getUsers() {
            if (users == null) {
                users = new MutableLiveData<List<User>>();
                loadUsers();
            }
            return users;
        }
    
        // Handle business logic
        private void loadUsers() {
            // Do an asynchronous operation to fetch users.
        }
    }
    
```

You can then access the list from an activity as follows:

### Kotlin

```kotlin
    import androidx.activity.viewModels
    
    class DiceRollActivity : AppCompatActivity() {
    
        override fun onCreate(savedInstanceState: Bundle?) {
            // Create a ViewModel the first time the system calls an activity's onCreate() method.
            // Re-created activities receive the same DiceRollViewModel instance created by the first activity.
    
            // Use the 'by viewModels()' Kotlin property delegate
            // from the activity-ktx artifact
            val viewModel: DiceRollViewModel by viewModels()
            lifecycleScope.launch {
                repeatOnLifecycle(Lifecycle.State.STARTED) {
                    viewModel.uiState.collect {
                        // Update UI elements
                    }
                }
            }
        }
    }
    
```

### Java

```java
    import androidx.lifecycle.ViewModelProvider;
    
    public class MyActivity extends AppCompatActivity {
        public void onCreate(Bundle savedInstanceState) {
            // Create a ViewModel the first time the system calls an activity's onCreate() method.
            // Re-created activities receive the same MyViewModel instance created by the first activity.
    
            MyViewModel model = new ViewModelProvider(this).get(MyViewModel.class);
            model.getUsers().observe(this, users -> {
                // update UI
            });
        }
    }
```

### Jetpack Compose

```kotlin
    import androidx.lifecycle.viewmodel.compose.viewModel
    
    // Use the 'viewModel()' function from the lifecycle-viewmodel-compose artifact
    @Composable
    fun DiceRollScreen(
        viewModel: DiceRollViewModel = viewModel()
    ) {
        val uiState by viewModel.uiState.collectAsStateWithLifecycle()
        // Update UI elements
    }
```

### Use coroutines with ViewModel

`ViewModel` includes support for Kotlin coroutines. It is able to persist asynchronous work in the same manner as it persists UI state.

For more information, see Use Kotlin coroutines with Android Architecture Components.

The lifecycle of a ViewModel
----------------------------

The lifecycle of a `ViewModel` is tied directly to its scope. As mentioned above, a ViewModel is tied to its scope. A ViewModel remains in memory until the `ViewModelStoreOwner` to which it is scoped disappears. This may occur in the following contexts:

*   In the case of an activity, when it finishes.
*   In the case of a fragment, when it detaches.
*   In the case of a Navigation entry, when it's removed from the back stack.

This makes ViewModels a great solution for storing data that survives configuration changes.

Figure 1 illustrates the various lifecycle states of an activity as it undergoes a rotation and then is finished. The illustration also shows the lifetime of the `ViewModel` next to the associated activity lifecycle. This particular diagram illustrates the states of an activity. The same basic states apply to the lifecycle of a fragment.

![Illustrates the lifecycle of a ViewModel as an activity changes state.](https://developer.android.com/static/images/topic/libraries/architecture/viewmodel-lifecycle.png)

You usually request a `ViewModel` the first time the system calls an activity object's `onCreate()`) method. The system may call `onCreate()`) several times throughout the existence of an activity, such as when a device screen is rotated. The `ViewModel` exists from when you first request a `ViewModel` until the activity is finished and destroyed.

Best practices
--------------

The following are several key best practices you should follow when implementing ViewModel:

*   Because of their scoping, use ViewModels as implementation details of a screen level state holder. Don't use them as state holders of reusable UI components such as chip groups or forms. Otherwise, you'd get the same ViewModel instance in different usages of the same UI component under the same ViewModelStoreOwner.
*   ViewModels shouldn't know about the UI implementation details. Keep the names of the methods the ViewModel API exposes and those of the UI state fields as generic as possible. In this way, your ViewModel can accommodate any type of UI: a mobile phone, foldable, tablet, or even a Chromebook!
*   As they can potentially live longer than the `ViewModelStoreOwner`, ViewModels shouldn't hold any references of lifecycle-related APIs such as the `Context` or `Resources` to prevent memory leaks.
*   Don't pass ViewModels to other classes, functions or other UI components. Because the platform manages them, you should keep them as close to it as you can. Close to your Activity, fragment, or screen level composable function. This prevents lower level components from accessing more data and logic than they need.

Further information
-------------------

As your data grows more complex, you might choose to have a separate class just to load the data. The purpose of `ViewModel` is to encapsulate the data for a UI controller to let the data survive configuration changes. For information about how to load, persist, and manage data across configuration changes, see Saved UI States.



