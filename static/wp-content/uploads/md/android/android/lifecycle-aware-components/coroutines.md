# Use Kotlin coroutines with lifecycle-aware components

Kotlin coroutines provide an API that enables you to write asynchronous code. With Kotlin coroutines, you can define a `CoroutineScope`, which helps you to manage when your coroutines should run. Each asynchronous operation runs within a particular scope.

Lifecycle-aware components provide first-class support for coroutines for logical scopes in your app along with an interoperability layer with `LiveData`. This topic explains how to use coroutines effectively with lifecycle-aware components.

Add KTX dependencies
--------------------

The built-in coroutine scopes described in this topic are contained in the KTX extensions for each corresponding component. Be sure to add the appropriate dependencies when using these scopes.

*   For `ViewModelScope`, use `androidx.lifecycle:lifecycle-viewmodel-ktx:2.4.0` or higher.
*   For `LifecycleScope`, use `androidx.lifecycle:lifecycle-runtime-ktx:2.4.0` or higher.
*   For `liveData`, use `androidx.lifecycle:lifecycle-livedata-ktx:2.4.0` or higher.

Lifecycle-aware coroutine scopes
--------------------------------

Lifecycle-aware components define the following built-in scopes that you can use in your app.

### ViewModelScope

A `ViewModelScope` is defined for each `ViewModel` in your app. Any coroutine launched in this scope is automatically canceled if the `ViewModel` is cleared. Coroutines are useful here for when you have work that needs to be done only if the `ViewModel` is active. For example, if you are computing some data for a layout, you should scope the work to the `ViewModel` so that if the `ViewModel` is cleared, the work is canceled automatically to avoid consuming resources.

You can access the `CoroutineScope` of a `ViewModel` through the `viewModelScope` property of the ViewModel, as shown in the following example:

```kotlin
    class MyViewModel: ViewModel() {
        init {
            viewModelScope.launch {
                // Coroutine that will be canceled when the ViewModel is cleared.
            }
        }
    }
```

### LifecycleScope

A `LifecycleScope` is defined for each `Lifecycle` object. Any coroutine launched in this scope is canceled when the `Lifecycle` is destroyed. You can access the `CoroutineScope` of the `Lifecycle` either via `lifecycle.coroutineScope` or `lifecycleOwner.lifecycleScope` properties.

The example below demonstrates how to use `lifecycleOwner.lifecycleScope` to create precomputed text asynchronously:

```kotlin
    class MyFragment: Fragment() {
        override fun onViewCreated(view: View, savedInstanceState: Bundle?) {
            super.onViewCreated(view, savedInstanceState)
            viewLifecycleOwner.lifecycleScope.launch {
                val params = TextViewCompat.getTextMetricsParams(textView)
                val precomputedText = withContext(Dispatchers.Default) {
                    PrecomputedTextCompat.create(longTextContent, params)
                }
                TextViewCompat.setPrecomputedText(textView, precomputedText)
            }
        }
    }
```

Restartable Lifecycle-aware coroutines
--------------------------------------

Even though the `lifecycleScope` provides a proper way to cancel long-running operations automatically when the `Lifecycle` is `DESTROYED`, you might have other cases where you want to start the execution of a code block when the `Lifecycle` is in a certain state, and cancel when it is in another state. For example, you might want to collect a flow when the `Lifecycle` is `STARTED` and cancel the collection when it's `STOPPED`. This approach processes the flow emissions only when the UI is visible on the screen, saving resources and potentially avoiding app crashes.

For these cases, `Lifecycle` and `LifecycleOwner` provide the suspend `repeatOnLifecycle` API that does exactly that. The following example contains a code block that runs every time the associated `Lifecycle` is at least in the `STARTED` state and cancels when the `Lifecycle` is `STOPPED`:

```kotlin
    class MyFragment : Fragment() {
    
        val viewModel: MyViewModel by viewModel()
    
        override fun onViewCreated(view: View, savedInstanceState: Bundle?) {
            super.onViewCreated(view, savedInstanceState)
    
            // Create a new coroutine in the lifecycleScope
            viewLifecycleOwner.lifecycleScope.launch {
                // repeatOnLifecycle launches the block in a new coroutine every time the
                // lifecycle is in the STARTED state (or above) and cancels it when it's STOPPED.
                viewLifecycleOwner.repeatOnLifecycle(Lifecycle.State.STARTED) {
                    // Trigger the flow and start listening for values.
                    // This happens when lifecycle is STARTED and stops
                    // collecting when the lifecycle is STOPPED
                    viewModel.someDataFlow.collect {
                        // Process item
                    }
                }
            }
        }
    }
```

### Lifecycle-aware flow collection

If you only need to perform lifecycle-aware collection on a single flow, you can use the `Flow.flowWithLifecycle()` method to simplify your code:

```kotlin
    viewLifecycleOwner.lifecycleScope.launch {
        exampleProvider.exampleFlow()
            .flowWithLifecycle(viewLifecycleOwner.lifecycle, Lifecycle.State.STARTED)
            .collect {
                // Process the value.
            }
    }
```

However, if you need to perform lifecycle-aware collection on multiple flows in parallel, then you must collect each flow in different coroutines. In that case, it's more efficient to use `repeatOnLifecycle()` directly:

```kotlin
    viewLifecycleOwner.lifecycleScope.launch {
        viewLifecycleOwner.repeatOnLifecycle(Lifecycle.State.STARTED) {
            // Because collect is a suspend function, if you want to
            // collect multiple flows in parallel, you need to do so in
            // different coroutines.
            launch {
                flow1.collect { /* Process the value. */ }
            }
    
            launch {
                flow2.collect { /* Process the value. */ }
            }
        }
    }
```

Suspend Lifecycle-aware coroutines
----------------------------------

Even though the `CoroutineScope` provides a proper way to cancel long-running operations automatically, you might have other cases where you want to suspend execution of a code block unless the `Lifecycle` is in a certain state. For example, to run a `FragmentTransaction`, you must wait until the `Lifecycle` is at least `STARTED`. For these cases, `Lifecycle` provides additional methods: `lifecycle.whenCreated`, `lifecycle.whenStarted`, and `lifecycle.whenResumed`. Any coroutine run inside these blocks is suspended if the `Lifecycle` isn't at least in the minimal desired state.

The example below contains a code block that runs only when the associated `Lifecycle` is at least in the `STARTED` state:

```kotlin
    class MyFragment: Fragment {
        init { // Notice that we can safely launch in the constructor of the Fragment.
            lifecycleScope.launch {
                whenStarted {
                    // The block inside will run only when Lifecycle is at least STARTED.
                    // It will start executing when fragment is started and
                    // can call other suspend methods.
                    loadingView.visibility = View.VISIBLE
                    val canAccess = withContext(Dispatchers.IO) {
                        checkUserAccess()
                    }
    
                    // When checkUserAccess returns, the next line is automatically
                    // suspended if the Lifecycle is not *at least* STARTED.
                    // We could safely run fragment transactions because we know the
                    // code won't run unless the lifecycle is at least STARTED.
                    loadingView.visibility = View.GONE
                    if (canAccess == false) {
                        findNavController().popBackStack()
                    } else {
                        showContent()
                    }
                }
    
                // This line runs only after the whenStarted block above has completed.
    
            }
        }
    }
```

If the `Lifecycle` is destroyed while a coroutine is active via one of the `when` methods, the coroutine is automatically canceled. In the example below, the `finally` block runs once the `Lifecycle` state is `DESTROYED`:

```kotlin
    class MyFragment: Fragment {
        init {
            lifecycleScope.launchWhenStarted {
                try {
                    // Call some suspend functions.
                } finally {
                    // This line might execute after Lifecycle is DESTROYED.
                    if (lifecycle.state >= STARTED) {
                        // Here, since we've checked, it is safe to run any
                        // Fragment transactions.
                    }
                }
            }
        }
    }
```

Use coroutines with LiveData
----------------------------

When using `LiveData`, you might need to calculate values asynchronously. For example, you might want to retrieve a user's preferences and serve them to your UI. In these cases, you can use the `liveData` builder function to call a `suspend` function, serving the result as a `LiveData` object.

In the example below, `loadUser()` is a suspend function declared elsewhere. Use the `liveData` builder function to call `loadUser()` asynchronously, and then use `emit()` to emit the result:

```kotlin
    val user: LiveData<User> = liveData {
        val data = database.loadUser() // loadUser is a suspend function.
        emit(data)
    }
```

The `liveData` building block serves as a structured concurrency primitive between coroutines and `LiveData`. The code block starts executing when `LiveData` becomes active and is automatically canceled after a configurable timeout when the `LiveData` becomes inactive. If it is canceled before completion, it is restarted if the `LiveData` becomes active again. If it completed successfully in a previous run, it doesn't restart. Note that it is restarted only if canceled automatically. If the block is canceled for any other reason (e.g. throwing a `CancellationException`), it is **not** restarted.

You can also emit multiple values from the block. Each `emit()` call suspends the execution of the block until the `LiveData` value is set on the main thread.

```kotlin
    val user: LiveData<Result> = liveData {
        emit(Result.loading())
        try {
            emit(Result.success(fetchUser()))
        } catch(ioException: Exception) {
            emit(Result.error(ioException))
        }
    }
```

You can also combine `liveData` with `Transformations`, as shown in the following example:

```kotlin
    class MyViewModel: ViewModel() {
        private val userId: LiveData<String> = MutableLiveData()
        val user = userId.switchMap { id ->
            liveData(context = viewModelScope.coroutineContext + Dispatchers.IO) {
                emit(database.loadUserById(id))
            }
        }
    }
```

You can emit multiple values from a `LiveData` by calling the `emitSource()` function whenever you want to emit a new value. Note that each call to `emit()` or `emitSource()` removes the previously-added source.

```kotlin
    class UserDao: Dao {
        @Query("SELECT * FROM User WHERE id = :id")
        fun getUser(id: String): LiveData<User>
    }
    
    class MyRepository {
        fun getUser(id: String) = liveData<User> {
            val disposable = emitSource(
                userDao.getUser(id).map {
                    Result.loading(it)
                }
            )
            try {
                val user = webservice.fetchUser(id)
                // Stop the previous emission to avoid dispatching the updated user
                // as `loading`.
                disposable.dispose()
                // Update the database.
                userDao.insert(user)
                // Re-establish the emission with success type.
                emitSource(
                    userDao.getUser(id).map {
                        Result.success(it)
                    }
                )
            } catch(exception: IOException) {
                // Any call to `emit` disposes the previous one automatically so we don't
                // need to dispose it here as we didn't get an updated value.
                emitSource(
                    userDao.getUser(id).map {
                        Result.error(exception, it)
                    }
                )
            }
        }
    }
```


