# UI State production

Modern UIs are rarely static. The state of the UI changes when the user interacts with the UI or when the app needs to display new data.

This document prescribes guidelines for the production and management of UI state. At the end of it you should:

*   Know what APIs you should use to produce UI state. This depends on the nature of the sources of state change available in your state holders, following unidirectional data flow principles.
*   Know how you should scope the production of UI state to be conscious of system resources.
*   Know how you should expose the UI state for consumption by the UI.

Fundamentally, state production is the incremental application of these changes to the UI state. State always exists, and it changes as a result of events. The differences between events and state are summarized in the table below:

Events

State

Transient, unpredictable, and exist for a finite period.

Always exists.

The inputs of state production.

The output of state production.

The product of the UI or other sources.

Is consumed by the UI.

A great mnemonic that summarizes the above is **state is; events happen**. The diagram below helps visualize changes to state as events occur in a timeline. Each event is processed by the appropriate state holder and it results in a state change:

![Events vs. state](https://developer.android.com/static/images/topic/architecture/ui-layer/events-vs-state.png)

**Figure 1**: Events cause state to change

Events can come from:

*   **Users**: As they interact with the app's UI.
*   **Other sources of state change**: APIs that present app data from UI, domain, or data layers like snackbar timeout events, use cases or repositories respectively.

The UI state production pipeline
--------------------------------

State production in Android apps can be thought of as a processing pipeline comprising:

*   **Inputs**: The sources of state change. They may be:
    *   Local to the UI layer: These could be user events like a user entering a title for a "to-do" in a task management app, or APIs that provide access to UI logic that drive changes in UI state. For example, calling the `open`) method on `DrawerState` in Jetpack Compose.
    *   External to the UI layer: These are sources from the domain or data layers that cause changes to UI state. For example news that finished loading from a `NewsRepository` or other events.
    *   A mixture of all the above.
*   **State holders**: Types that apply business logic and/or UI logic to sources of state change and process user events to produce UI state.
*   **Output**: The UI State that the app can render to provide users the information they need.

![The state production pipeline](https://developer.android.com/static/images/topic/architecture/ui-layer/state-production-pipeline.png)

**Figure 2**: The state production pipeline

State production APIs
---------------------

There are two main APIs used in state production depending on what stage of the pipeline you're in:

Pipeline stage

API

Input

You should use asynchronous APIs to perform work off the UI thread to keep the UI jank free. For example, Coroutines or Flows in Kotlin, and RxJava or callbacks in the Java Programming Language.

Output

You should use observable data holder APIs to invalidate and rerender the UI when state changes. For example, StateFlow, Compose State, or LiveData. Observable data holders guarantee the UI always has a UI state to display on the screen

Of the two, the choice of asynchronous API for input has a greater influence on the nature of the state production pipeline than the choice of observable API for output. This is because the inputs **dictate the kind of processing that may be applied to the pipeline**.

State production pipeline assembly
----------------------------------

The next sections cover state production techniques best suited for various inputs, and the output APIs that match. Each state production pipeline is a combination of inputs and outputs and should be:

*   **Lifecycle aware**: In the case where the UI is not visible or active, the state production pipeline should not consume any resources unless explicitly required.
*   **Easy to consume**: The UI should be able to easily render the produced UI state. Considerations for the output of the state production pipeline will vary across different View APIs such as the View system or Jetpack Compose.

Inputs in state production pipelines
------------------------------------

Inputs in a state production pipeline may either provide their sources of state change via:

*   One-shot operations that may be synchronous or asynchronous, for example calls to `suspend` functions.
*   Stream APIs, for example `Flows`.
*   All of the above.

The following sections cover how you can assemble a state production pipeline for each of the above inputs.

### One-shot APIs as sources of state change

Use the `MutableStateFlow` API as an observable, mutable container of state. In Jetpack Compose apps, you can also consider `mutableStateOf`) especially when working with Compose text APIs. Both APIs offer methods that allow safe atomic updates to the values they host whether or not the updates are synchronous or asynchronous.

For example, consider state updates in a simple dice rolling app. Each roll of the dice from the user invokes the synchronous `Random.nextInt()` method, and the result is written into the UI state.

### StateFlow

```kotlin
    data class DiceUiState(
        val firstDieValue: Int? = null,
        val secondDieValue: Int? = null,
        val numberOfRolls: Int = 0,
    )
    
    class DiceRollViewModel : ViewModel() {
    
        private val _uiState = MutableStateFlow(DiceUiState())
        val uiState: StateFlow<DiceUiState> = _uiState.asStateFlow()
    
        // Called from the UI
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

### Compose State

```kotlin
    @Stable
    interface DiceUiState {
        val firstDieValue: Int?
        val secondDieValue: Int?
        val numberOfRolls: Int?
    }
    
    private class MutableDiceUiState: DiceUiState {
        override var firstDieValue: Int? by mutableStateOf(null)
        override var secondDieValue: Int? by mutableStateOf(null)
        override var numberOfRolls: Int by mutableStateOf(0)
    }
    
    class DiceRollViewModel : ViewModel() {
    
        private val _uiState = MutableDiceUiState()
        val uiState: DiceUiState = _uiState
    
        // Called from the UI
        fun rollDice() {
            _uiState.firstDieValue = Random.nextInt(from = 1, until = 7)
            _uiState.secondDieValue = Random.nextInt(from = 1, until = 7)
            _uiState.numberOfRolls = _uiState.numberOfRolls + 1
        }
    }
    
```

#### Mutating the UI state from asynchronous calls

For state changes that require an asynchronous result, launch a Coroutine in the appropriate `CoroutineScope`. This allows the app to discard the work when the `CoroutineScope` is canceled. The state holder then writes the result of the suspend method call into the observable API used to expose the UI state.

For example, consider the `AddEditTaskViewModel` in the Architecture sample. When the suspending `saveTask()` method saves a task asynchronously, the `update` method on the MutableStateFlow propagates the state change to the UI state.

### StateFlow

```kotlin
    data class AddEditTaskUiState(
        val title: String = "",
        val description: String = "",
        val isTaskCompleted: Boolean = false,
        val isLoading: Boolean = false,
        val userMessage: String? = null,
        val isTaskSaved: Boolean = false
    )
    
    class AddEditTaskViewModel(...) : ViewModel() {
    
       private val _uiState = MutableStateFlow(AddEditTaskUiState())
       val uiState: StateFlow<AddEditTaskUiState> = _uiState.asStateFlow()
    
       private fun createNewTask() {
            viewModelScope.launch {
                val newTask = Task(uiState.value.title, uiState.value.description)
                try {
                    tasksRepository.saveTask(newTask)
                    // Write data into the UI state.
                    _uiState.update {
                        it.copy(isTaskSaved = true)
                    }
                }
                catch(cancellationException: CancellationException) {
                    throw cancellationException
                }
                catch(exception: Exception) {
                    _uiState.update {
                        it.copy(userMessage = getErrorMessage(exception))
                    }
                }
            }
        }
    }
```

### Compose State

```kotlin
    @Stable
    interface AddEditTaskUiState {
        val title: String
        val description: String
        val isTaskCompleted: Boolean
        val isLoading: Boolean
        val userMessage: String?
        val isTaskSaved: Boolean
    }
    
    private class MutableAddEditTaskUiState : AddEditTaskUiState() {
        override var title: String by mutableStateOf("")
        override var description: String by mutableStateOf("")
        override var isTaskCompleted: Boolean by mutableStateOf(false)
        override var isLoading: Boolean by mutableStateOf(false)
        override var userMessage: String? by mutableStateOf<String?>(null)
        override var isTaskSaved: Boolean by mutableStateOf(false)
    }
    
    class AddEditTaskViewModel(...) : ViewModel() {
    
       private val _uiState = MutableAddEditTaskUiState()
       val uiState: AddEditTaskUiState = _uiState
    
       private fun createNewTask() {
            viewModelScope.launch {
                val newTask = Task(uiState.value.title, uiState.value.description)
                try {
                    tasksRepository.saveTask(newTask)
                    // Write data into the UI state.
                    _uiState.isTaskSaved = true
                }
                catch(cancellationException: CancellationException) {
                    throw cancellationException
                }
                catch(exception: Exception) {
                    _uiState.userMessage = getErrorMessage(exception))
                }
            }
        }
    }
    
```

#### Mutating the UI state from background threads

It's preferable to launch Coroutines on the main dispatcher for the production of UI state. That is, outside the `withContext` block in the code snippets below. However, if you need to update the UI state in a different background context, you can do so using the following APIs:

*   Use the `withContext` method to run Coroutines in a different concurrent context.
*   When using `MutableStateFlow`, use the `update` method as usual.
*   When using Compose State, use the `Snapshot.withMutableSnapshot`) to guarantee atomic updates to State in the concurrent context.

For example, assume in the `DiceRollViewModel` snippet below, that `SlowRandom.nextInt()` is a computationally intensive `suspend` function that needs to be called from a CPU bound Coroutine.

### StateFlow

```kotlin
    class DiceRollViewModel(
        private val defaultDispatcher: CoroutineScope = Dispatchers.Default
    ) : ViewModel() {
    
        private val _uiState = MutableStateFlow(DiceUiState())
        val uiState: StateFlow<DiceUiState> = _uiState.asStateFlow()
    
      // Called from the UI
      fun rollDice() {
            viewModelScope.launch() {
                // Other Coroutines that may be called from the current context
                …
                withContext(defaultDispatcher) {
                    _uiState.update { currentState ->
                        currentState.copy(
                            firstDieValue = SlowRandom.nextInt(from = 1, until = 7),
                            secondDieValue = SlowRandom.nextInt(from = 1, until = 7),
                            numberOfRolls = currentState.numberOfRolls + 1,
                        )
                    }
                }
            }
        }
    }
```

### Compose State

```kotlin
    class DiceRollViewModel(
        private val defaultDispatcher: CoroutineScope = Dispatchers.Default
    ) : ViewModel() {
    
        private val _uiState = MutableDiceUiState()
        val uiState: DiceUiState = _uiState
    
      // Called from the UI
      fun rollDice() {
            viewModelScope.launch() {
                // Other Coroutines that may be called from the current context
                …
                withContext(defaultDispatcher) {
                    Snapshot.withMutableSnapshot {
                        _uiState.firstDieValue = SlowRandom.nextInt(from = 1, until = 7)
                        _uiState.secondDieValue = SlowRandom.nextInt(from = 1, until = 7)
                        _uiState.numberOfRolls = _uiState.numberOfRolls + 1
                    }
                }
            }
        }
    }
```

### Stream APIs as sources of state change

For sources of state change that produce multiple values over time in streams, aggregating the outputs of all the sources into a cohesive whole is a straightforward approach to state production.

When using Kotlin Flows, you can achieve this with the combine function. An example of this can be seen in the "Now in Android" sample in the InterestsViewModel:

```kotlin
    class InterestsViewModel(
        authorsRepository: AuthorsRepository,
        topicsRepository: TopicsRepository
    ) : ViewModel() {
    
        val uiState = combine(
            authorsRepository.getAuthorsStream(),
            topicsRepository.getTopicsStream(),
        ) { availableAuthors, availableTopics ->
            InterestsUiState.Interests(
                authors = availableAuthors,
                topics = availableTopics
            )
        }
            .stateIn(
                scope = viewModelScope,
                started = SharingStarted.WhileSubscribed(5_000),
                initialValue = InterestsUiState.Loading
        )
    }
    
```

Use of the `stateIn` operator to create `StateFlows` gives the UI finer grained control over the activity of the state production pipeline as it may need to only be active when the UI is visible.

*   Use `SharingStarted.WhileSubscribed()` if the pipeline should only be active when the UI is visible while collecting the flow in a lifecycle-aware manner.
*   Use `SharingStarted.Lazily` if the pipeline should be active as long as the user may return to the UI, that is the UI is on the backstack, or in another tab offscreen.

In cases where aggregating stream based sources of state does not apply, stream APIs like Kotlin Flows offer a rich set of transformations such as merging, flattening and so on to help with processing the streams into UI state.

### One-shot and stream APIs as sources of state change

In the case where the state production pipeline depends on both one-shot calls and streams as sources of state change, streams are the defining constraint. Therefore, convert the one-shot calls into streams APIs, or pipe their output into streams and resume processing as described in the streams section above.

With flows, this typically means creating one or more private backing `MutableStateFlow` instances to propagate state changes. You can also create snapshot flows) from Compose state.

Consider the `TaskDetailViewModel` from the architecture-samples repository below:

### StateFlow

```kotlin
    class TaskDetailViewModel @Inject constructor(
        private val tasksRepository: TasksRepository,
        savedStateHandle: SavedStateHandle
    ) : ViewModel() {
    
        private val _isTaskDeleted = MutableStateFlow(false)
        private val _task = tasksRepository.getTaskStream(taskId)
    
        val uiState: StateFlow<TaskDetailUiState> = combine(
            _isTaskDeleted,
            _task
        ) { isTaskDeleted, task ->
            TaskDetailUiState(
                task = taskAsync.data,
                isTaskDeleted = isTaskDeleted
            )
        }
            // Convert the result to the appropriate observable API for the UI
            .stateIn(
                scope = viewModelScope,
                started = SharingStarted.WhileSubscribed(5_000),
                initialValue = TaskDetailUiState()
            )
    
        fun deleteTask() = viewModelScope.launch {
            tasksRepository.deleteTask(taskId)
            _isTaskDeleted.update { true }
        }
    }
```

### Compose State

```kotlin
    class TaskDetailViewModel @Inject constructor(
        private val tasksRepository: TasksRepository,
        savedStateHandle: SavedStateHandle
    ) : ViewModel() {
    
        private var _isTaskDeleted by mutableStateOf(false)
        private val _task = tasksRepository.getTaskStream(taskId)
    
        val uiState: StateFlow<TaskDetailUiState> = combine(
            snapshotFlow { _isTaskDeleted },
            _task
        ) { isTaskDeleted, task ->
            TaskDetailUiState(
                task = taskAsync.data,
                isTaskDeleted = isTaskDeleted
            )
        }
            // Convert the result to the appropriate observable API for the UI
            .stateIn(
                scope = viewModelScope,
                started = SharingStarted.WhileSubscribed(5_000),
                initialValue = TaskDetailUiState()
            )
    
        fun deleteTask() = viewModelScope.launch {
            tasksRepository.deleteTask(taskId)
            _isTaskDeleted = true
        }
    }
```

Output types in state production pipelines
------------------------------------------

The choice of the output API for UI state, and the nature of its presentation depends largely on the API your app uses to render the UI. In Android apps, you can choose to use Views or Jetpack Compose. Considerations here include:

*   Reading state in a lifecycle aware manner.
*   Whether state should be exposed in one or multiple fields from the state holder.

The following table summarizes what APIs to use for your state production pipeline for any given input and consumer:

Input

Consumer

Output

One-shot APIs

Views

`StateFlow` or `LiveData`

One-shot APIs

Compose

`StateFlow` or Compose `State`

Stream APIs

Views

`StateFlow` or `LiveData`

Stream APIs

Compose

`StateFlow`

One-shot and stream APIs

Views

`StateFlow` or `LiveData`

One-shot and stream APIs

Compose

`StateFlow`