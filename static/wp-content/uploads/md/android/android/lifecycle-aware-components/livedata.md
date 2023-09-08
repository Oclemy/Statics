# LiveData overview

`LiveData` is an observable data holder class. Unlike a regular observable, LiveData is lifecycle-aware, meaning it respects the lifecycle of other app components, such as activities, fragments, or services. This awareness ensures LiveData only updates app component observers that are in an active lifecycle state.

LiveData considers an observer, which is represented by the `Observer` class, to be in an active state if its lifecycle is in the `STARTED` or `RESUMED` state. LiveData only notifies active observers about updates. Inactive observers registered to watch `LiveData` objects aren't notified about changes.

You can register an observer paired with an object that implements the `LifecycleOwner` interface. This relationship allows the observer to be removed when the state of the corresponding `Lifecycle` object changes to `DESTROYED`. This is especially useful for activities and fragments because they can safely observe `LiveData` objects and not worry about leaks—activities and fragments are instantly unsubscribed when their lifecycles are destroyed.

For more information about how to use LiveData, see Work with LiveData objects.

### The advantages of using LiveData

Using LiveData provides the following advantages:

**Ensures your UI matches your data state**

LiveData follows the observer pattern. LiveData notifies `Observer` objects when underlying data changes. You can consolidate your code to update the UI in these `Observer` objects. That way, you don't need to update the UI every time the app data changes because the observer does it for you.

**No memory leaks**

Observers are bound to `Lifecycle` objects and clean up after themselves when their associated lifecycle is destroyed.

**No crashes due to stopped activities**

If the observer's lifecycle is inactive, such as in the case of an activity in the back stack, then it doesn’t receive any LiveData events.

**No more manual lifecycle handling**

UI components just observe relevant data and don’t stop or resume observation. LiveData automatically manages all of this since it’s aware of the relevant lifecycle status changes while observing.

**Always up to date data**

If a lifecycle becomes inactive, it receives the latest data upon becoming active again. For example, an activity that was in the background receives the latest data right after it returns to the foreground.

**Proper configuration changes**

If an activity or fragment is recreated due to a configuration change, like device rotation, it immediately receives the latest available data.

**Sharing resources**

You can extend a `LiveData` object using the singleton pattern to wrap system services so that they can be shared in your app. The `LiveData` object connects to the system service once, and then any observer that needs the resource can just watch the `LiveData` object. For more information, see Extend LiveData.

Work with LiveData objects
--------------------------

Follow these steps to work with `LiveData` objects:

1.  Create an instance of `LiveData` to hold a certain type of data. This is usually done within your `ViewModel` class.
2.  Create an `Observer` object that defines the `onChanged()`) method, which controls what happens when the `LiveData` object's held data changes. You usually create an `Observer` object in a UI controller, such as an activity or fragment.
3.  Attach the `Observer` object to the `LiveData` object using the `observe()`) method. The `observe()` method takes a `LifecycleOwner` object. This subscribes the `Observer` object to the `LiveData` object so that it is notified of changes. You usually attach the `Observer` object in a UI controller, such as an activity or fragment.
    

When you update the value stored in the `LiveData` object, it triggers all registered observers as long as the attached `LifecycleOwner` is in the active state.

LiveData allows UI controller observers to subscribe to updates. When the data held by the `LiveData` object changes, the UI automatically updates in response.

### Create LiveData objects

LiveData is a wrapper that can be used with any data, including objects that implement `Collections`, such as `List`. A `LiveData` object is usually stored within a `ViewModel` object and is accessed via a getter method, as demonstrated in the following example:

### Kotlin

```kotlin
class NameViewModel : ViewModel() {

    // Create a LiveData with a String
    val currentName: MutableLiveData<String> by lazy {
        MutableLiveData<String>()
    }

    // Rest of the ViewModel...
}
```

### Java

```java
public class NameViewModel extends ViewModel {

// Create a LiveData with a String
private MutableLiveData<String> currentName;

    public MutableLiveData<String> getCurrentName() {
        if (currentName == null) {
            currentName = new MutableLiveData<String>();
        }
        return currentName;
    }

// Rest of the ViewModel...
}
```

Initially, the data in a `LiveData` object is not set.

You can read more about the benefits and usage of the `ViewModel` class in the ViewModel guide.

### Observe LiveData objects

In most cases, an app component’s `onCreate()` method is the right place to begin observing a `LiveData` object for the following reasons:

*   To ensure the system doesn’t make redundant calls from an activity or fragment’s `onResume()` method.
*   To ensure that the activity or fragment has data that it can display as soon as it becomes active. As soon as an app component is in the `STARTED` state, it receives the most recent value from the `LiveData` objects it’s observing. This only occurs if the `LiveData` object to be observed has been set.

Generally, LiveData delivers updates only when data changes, and only to active observers. An exception to this behavior is that observers also receive an update when they change from an inactive to an active state. Furthermore, if the observer changes from inactive to active a second time, it only receives an update if the value has changed since the last time it became active.

The following sample code illustrates how to start observing a `LiveData` object:

### Kotlin

```kotlin
class NameActivity : AppCompatActivity() {

    // Use the 'by viewModels()' Kotlin property delegate
    // from the activity-ktx artifact
    private val model: NameViewModel by viewModels()

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)

        // Other code to setup the activity...

        // Create the observer which updates the UI.
        val nameObserver = Observer<String> { newName ->
            // Update the UI, in this case, a TextView.
            nameTextView.text = newName
        }

        // Observe the LiveData, passing in this activity as the LifecycleOwner and the observer.
        model.currentName.observe(this, nameObserver)
    }
}
```

### Java

```java
public class NameActivity extends AppCompatActivity {

    private NameViewModel model;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);

        // Other code to setup the activity...

        // Get the ViewModel.
        model = new ViewModelProvider(this).get(NameViewModel.class);

        // Create the observer which updates the UI.
        final Observer<String> nameObserver = new Observer<String>() {
            @Override
            public void onChanged(@Nullable final String newName) {
                // Update the UI, in this case, a TextView.
                nameTextView.setText(newName);
            }
        };

        // Observe the LiveData, passing in this activity as the LifecycleOwner and the observer.
        model.getCurrentName().observe(this, nameObserver);
    }
}
```

After `observe()`) is called with `nameObserver` passed as parameter, `onChanged()`) is immediately invoked providing the most recent value stored in `mCurrentName`. If the `LiveData` object hasn't set a value in `mCurrentName`, `onChanged()` is not called.

### Update LiveData objects

LiveData has no publicly available methods to update the stored data. The `MutableLiveData` class exposes the `setValue(T)`) and `postValue(T)`) methods publicly and you must use these if you need to edit the value stored in a `LiveData` object. Usually `MutableLiveData` is used in the `ViewModel` and then the `ViewModel` only exposes immutable `LiveData` objects to the observers.

After you have set up the observer relationship, you can then update the value of the `LiveData` object, as illustrated by the following example, which triggers all observers when the user taps a button:

### Kotlin

```kotlin
button.setOnClickListener {
    val anotherName = "John Doe"
    model.currentName.setValue(anotherName)
}
```

### Java

```java
button.setOnClickListener(new OnClickListener() {
    @Override
    public void onClick(View v) {
        String anotherName = "John Doe";
        model.getCurrentName().setValue(anotherName);
    }
});
```

Calling `setValue(T)` in the example results in the observers calling their `onChanged()`) methods with the value `John Doe`. The example shows a button press, but `setValue()` or `postValue()` could be called to update `mName` for a variety of reasons, including in response to a network request or a database load completing; in all cases, the call to `setValue()` or `postValue()` triggers observers and updates the UI.

### Use LiveData with Room

The Room persistence library supports observable queries, which return `LiveData` objects. Observable queries are written as part of a Database Access Object (DAO).

Room generates all the necessary code to update the `LiveData` object when a database is updated. The generated code runs the query asynchronously on a background thread when needed. This pattern is useful for keeping the data displayed in a UI in sync with the data stored in a database. You can read more about Room and DAOs in the Room persistent library guide.

### Use coroutines with LiveData

`LiveData` includes support for Kotlin coroutines. For more information, see Use Kotlin coroutines with Android Architecture Components.

LiveData in an app's architecture
---------------------------------

`LiveData` is lifecycle-aware, following the lifecycle of entities such as activities and fragments. Use `LiveData` to communicate between these lifecycle owners and other objects with a different lifespan, such as `ViewModel` objects. The main responsibility of the `ViewModel` is to load and manage UI-related data, which makes it a great candidate for holding `LiveData` objects. Create `LiveData` objects in the `ViewModel` and use them to expose state to the UI layer.

Activities and fragments should not hold `LiveData` instances because their role is to display data, not hold state. Also, keeping activities and fragments free from holding data makes it easier to write unit tests.

It may be tempting to work `LiveData` objects in your data layer class, but `LiveData`is not designed to handle asynchronous streams of data. Even though you can use `LiveData` transformations and `MediatorLiveData` to achieve this, this approach has drawbacks: the capability to combine streams of data is very limited and all `LiveData` objects (including ones created through transformations) are observed on the main thread. The code below is an example of how holding a `LiveData` in the `Repository` can block the main thread:

### Kotlin

```kotlin
class UserRepository {

    // DON'T DO THIS! LiveData objects should not live in the repository.
    fun getUsers(): LiveData<List<User>> {
        ...
    }

    fun getNewPremiumUsers(): LiveData<List<User>> {
        return TransformationsLiveData.map(getUsers()) { users ->
            // This is an expensive call being made on the main thread and may
            // cause noticeable jank in the UI!
            users
                .filter { user ->
                  user.isPremium
                }
          .filter { user ->
              val lastSyncedTime = dao.getLastSyncedTime()
              user.timeCreated > lastSyncedTime
                }
    }
}
```

### Java

```java
class UserRepository {

    // DON'T DO THIS! LiveData objects should not live in the repository.
    LiveData<List<User>> getUsers() {
        ...
    }

    LiveData<List<User>> getNewPremiumUsers() {
    return Transformations.map(getUsers(),
        // This is an expensive call being made on the main thread and may cause
        // noticeable jank in the UI!
        users -> users.stream()
            .filter(User::isPremium)
            .filter(user ->
                user.getTimeCreated() > dao.getLastSyncedTime())
            .collect(Collectors.toList()));
    }
}
```

If you need to use streams of data in other layers of your app, consider using Kotlin Flows and then converting them to `LiveData` in the `ViewModel` using `asLiveData()`. Learn more about using Kotlin `Flow` with `LiveData` in this codelab. For codebases built with Java, consider using Executors in conjuction with callbacks or `RxJava`.

Extend LiveData
---------------

LiveData considers an observer to be in an active state if the observer's lifecycle is in either the `STARTED` or `RESUMED` states. The following sample code illustrates how to extend the `LiveData` class:

### Kotlin

```kotlin
class StockLiveData(symbol: String) : LiveData<BigDecimal>() {
    private val stockManager = StockManager(symbol)

    private val listener = { price: BigDecimal ->
        value = price
    }

    override fun onActive() {
        stockManager.requestPriceUpdates(listener)
    }

    override fun onInactive() {
        stockManager.removeUpdates(listener)
    }
}
```

### Java

```java
public class StockLiveData extends LiveData<BigDecimal> {
    private StockManager stockManager;

    private SimplePriceListener listener = new SimplePriceListener() {
        @Override
        public void onPriceChanged(BigDecimal price) {
            setValue(price);
        }
    };

    public StockLiveData(String symbol) {
        stockManager = new StockManager(symbol);
    }

    @Override
    protected void onActive() {
        stockManager.requestPriceUpdates(listener);
    }

    @Override
    protected void onInactive() {
        stockManager.removeUpdates(listener);
    }
}
```

The implementation of the price listener in this example includes the following important methods:

*   The `onActive()`) method is called when the `LiveData` object has an active observer. This means you need to start observing the stock price updates from this method.
*   The `onInactive()`) method is called when the `LiveData` object doesn't have any active observers. Since no observers are listening, there is no reason to stay connected to the `StockManager` service.
*   The `setValue(T)`) method updates the value of the `LiveData` instance and notifies any active observers about the change.

You can use the `StockLiveData` class as follows:

### Kotlin

```kotlin
public class MyFragment : Fragment() {
    override fun onViewCreated(view: View, savedInstanceState: Bundle?) {
        super.onViewCreated(view, savedInstanceState)
        val myPriceListener: LiveData<BigDecimal> = ...
        myPriceListener.observe(viewLifecycleOwner, Observer<BigDecimal> { price: BigDecimal? ->
            // Update the UI.
        })
    }
}
```

### Java

```java
public class MyFragment extends Fragment {
    @Override
    public void onViewCreated(@NonNull View view, @Nullable Bundle savedInstanceState) {
        super.onViewCreated(view, savedInstanceState);
        LiveData<BigDecimal> myPriceListener = ...;
        myPriceListener.observe(getViewLifecycleOwner(), price -> {
            // Update the UI.
        });
    }
}
```

The `observe()`) method passes the `LifecycleOwner` associated with the fragment's view as the first argument. Doing so denotes that this observer is bound to the `Lifecycle` object associated with the owner, meaning:

*   If the `Lifecycle` object is not in an active state, then the observer isn't called even if the value changes.
*   After the `Lifecycle` object is destroyed, the observer is automatically removed.

The fact that `LiveData` objects are lifecycle-aware means that you can share them between multiple activities, fragments, and services. To keep the example simple, you can implement the `LiveData` class as a singleton as follows:

### Kotlin

```kotlin
class StockLiveData(symbol: String) : LiveData<BigDecimal>() {
    private val stockManager: StockManager = StockManager(symbol)

    private val listener = { price: BigDecimal ->
        value = price
    }

    override fun onActive() {
        stockManager.requestPriceUpdates(listener)
    }

    override fun onInactive() {
        stockManager.removeUpdates(listener)
    }

    companion object {
        private lateinit var sInstance: StockLiveData

        @MainThread
        fun get(symbol: String): StockLiveData {
            sInstance = if (::sInstance.isInitialized) sInstance else StockLiveData(symbol)
            return sInstance
        }
    }
}
```

### Java

```java
public class StockLiveData extends LiveData<BigDecimal> {
    private static StockLiveData sInstance;
    private StockManager stockManager;

    private SimplePriceListener listener = new SimplePriceListener() {
        @Override
        public void onPriceChanged(BigDecimal price) {
            setValue(price);
        }
    };

    @MainThread
    public static StockLiveData get(String symbol) {
        if (sInstance == null) {
            sInstance = new StockLiveData(symbol);
        }
        return sInstance;
    }

    private StockLiveData(String symbol) {
        stockManager = new StockManager(symbol);
    }

    @Override
    protected void onActive() {
        stockManager.requestPriceUpdates(listener);
    }

    @Override
    protected void onInactive() {
        stockManager.removeUpdates(listener);
    }
}
```

And you can use it in the fragment as follows:

### Kotlin

```kotlin
class MyFragment : Fragment() {

    override fun onViewCreated(view: View, savedInstanceState: Bundle?) {
        super.onViewCreated(view, savedInstanceState)
        StockLiveData.get(symbol).observe(viewLifecycleOwner, Observer<BigDecimal> { price: BigDecimal? ->
            // Update the UI.
        })

    }
```

### Java

```java
public class MyFragment extends Fragment {
    @Override
    public void onViewCreated(@NonNull View view, @Nullable Bundle savedInstanceState) {
        super.onViewCreated(view, savedInstanceState);
        StockLiveData.get(symbol).observe(getViewLifecycleOwner(), price -> {
            // Update the UI.
        });
    }
}
```

Multiple fragments and activities can observe the `MyPriceListener` instance. LiveData only connects to the system service if one or more of them is visible and active.

Transform LiveData
------------------

You may want to make changes to the value stored in a `LiveData` object before dispatching it to the observers, or you may need to return a different `LiveData` instance based on the value of another one. The `Lifecycle` package provides the `Transformations` class which includes helper methods that support these scenarios.

`Transformations.map()`)

Applies a function on the value stored in the `LiveData` object, and propagates the result downstream.

### Kotlin

```kotlin
val userLiveData: LiveData<User> = UserLiveData()
val userName: LiveData<String> = Transformations.map(userLiveData) {
    user -> "${user.name} ${user.lastName}"
}
```

### Java

```java
LiveData<User> userLiveData = ...;
LiveData<String> userName = Transformations.map(userLiveData, user -> {
    user.name + " " + user.lastName
});
```

`Transformations.switchMap()`)

Similar to `map()`, applies a function to the value stored in the `LiveData` object and unwraps and dispatches the result downstream. The function passed to `switchMap()` must return a `LiveData` object, as illustrated by the following example:

### Kotlin

```kotlin
private fun getUser(id: String): LiveData<User> {
  ...
}
val userId: LiveData<String> = ...
val user = Transformations.switchMap(userId) { id -> getUser(id) }
```

### Java

```java
private LiveData<User> getUser(String id) {
  ...;
}

LiveData<String> userId = ...;
LiveData<User> user = Transformations.switchMap(userId, id -> getUser(id) );
```

You can use transformation methods to carry information across the observer's lifecycle. The transformations aren't calculated unless an observer is watching the returned `LiveData` object. Because the transformations are calculated lazily, lifecycle-related behavior is implicitly passed down without requiring additional explicit calls or dependencies.

If you think you need a `Lifecycle` object inside a `ViewModel` object, a transformation is probably a better solution. For example, assume that you have a UI component that accepts an address and returns the postal code for that address. You can implement the naive `ViewModel` for this component as illustrated by the following sample code:

### Kotlin

```kotlin
class MyViewModel(private val repository: PostalCodeRepository) : ViewModel() {

    private fun getPostalCode(address: String): LiveData<String> {
        // DON'T DO THIS
        return repository.getPostCode(address)
    }
}
```

### Java

```java
class MyViewModel extends ViewModel {
    private final PostalCodeRepository repository;
    public MyViewModel(PostalCodeRepository repository) {
       this.repository = repository;
    }

    private LiveData<String> getPostalCode(String address) {
       // DON'T DO THIS
       return repository.getPostCode(address);
    }
}
```

The UI component then needs to unregister from the previous `LiveData` object and register to the new instance each time it calls `getPostalCode()`. In addition, if the UI component is recreated, it triggers another call to the `repository.getPostCode()` method instead of using the previous call’s result.

Instead, you can implement the postal code lookup as a transformation of the address input, as shown in the following example:

### Kotlin

```kotlin
class MyViewModel(private val repository: PostalCodeRepository) : ViewModel() {
    private val addressInput = MutableLiveData<String>()
    val postalCode: LiveData<String> = Transformations.switchMap(addressInput) {
            address -> repository.getPostCode(address) }


    private fun setInput(address: String) {
        addressInput.value = address
    }
}
```

### Java

```java
class MyViewModel extends ViewModel {
    private final PostalCodeRepository repository;
    private final MutableLiveData<String> addressInput = new MutableLiveData();
    public final LiveData<String> postalCode =
            Transformations.switchMap(addressInput, (address) -> {
                return repository.getPostCode(address);
             });

  public MyViewModel(PostalCodeRepository repository) {
      this.repository = repository
  }

  private void setInput(String address) {
      addressInput.setValue(address);
  }
}
```

In this case, the `postalCode` field is defined as a transformation of the `addressInput`. As long as your app has an active observer associated with the `postalCode` field, the field's value is recalculated and retrieved whenever `addressInput` changes.

This mechanism allows lower levels of the app to create `LiveData` objects that are lazily calculated on demand. A `ViewModel` object can easily obtain references to `LiveData` objects and then define transformation rules on top of them.

### Create new transformations

There are a dozen different specific transformation that may be useful in your app, but they aren’t provided by default. To implement your own transformation you can you use the `MediatorLiveData` class, which listens to other `LiveData` objects and processes events emitted by them. `MediatorLiveData` correctly propagates its state to the source `LiveData` object. To learn more about this pattern, see the reference documentation of the `Transformations` class.

Merge multiple LiveData sources
-------------------------------

`MediatorLiveData` is a subclass of `LiveData` that allows you to merge multiple LiveData sources. Observers of `MediatorLiveData` objects are then triggered whenever any of the original LiveData source objects change.

For example, if you have a `LiveData` object in your UI that can be updated from a local database or a network, then you can add the following sources to the `MediatorLiveData` object:

*   A `LiveData` object associated with the data stored in the database.
*   A `LiveData` object associated with the data accessed from the network.

Your activity only needs to observe the `MediatorLiveData` object to receive updates from both sources. For a detailed example, see the Addendum: exposing network status section of the Guide to App Architecture.

