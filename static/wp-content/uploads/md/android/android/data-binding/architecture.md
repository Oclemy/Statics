# Bind layout views to Architecture Components

The AndroidX library includes the Architecture Components, which you can use to design robust, testable, and maintainable apps. The Data Binding Library works seamlessly with the Architecture Components to further simplify the development of your UI. The layouts in your app can bind to the data in the Architecture Components, which already help you manage the UI controllers lifecycle and notify about changes in the data.

This page shows how to incorporate the Architecture Components to your app to further enhance the benefits of using the Data Binding Library.

Use LiveData to notify the UI about data changes
------------------------------------------------

You can use `LiveData` objects as the data binding source to automatically notify the UI about changes in the data. For more information about this Architecture Component, see LiveData Overview.

Unlike objects that implement `Observable`—such as observable fields—`LiveData` objects know about the lifecycle of the observers subscribed to the data changes. This knowledge enables many benefits, which are explained in The advantages of using LiveData. In Android Studio version 3.1 and higher, you can replace observable fields with `LiveData` objects in your data binding code.

To use a `LiveData` object with your binding class, you need to specify a lifecycle owner to define the scope of the `LiveData` object. The following example specifies the activity as the lifecycle owner after the binding class has been instantiated:

### Kotlin

```kotlin
class ViewModelActivity : AppCompatActivity() {
    override fun onCreate(savedInstanceState: Bundle?) {
        // Inflate view and obtain an instance of the binding class.
        val binding: UserBinding = DataBindingUtil.setContentView(this, R.layout.user)

        // Specify the current activity as the lifecycle owner.
        binding.setLifecycleOwner(this)
    }
}
```

### Java

```java
class ViewModelActivity extends AppCompatActivity {
    @Override
    protected void onCreate(Bundle savedInstanceState) {
        // Inflate view and obtain an instance of the binding class.
        UserBinding binding = DataBindingUtil.setContentView(this, R.layout.user);

        // Specify the current activity as the lifecycle owner.
        binding.setLifecycleOwner(this);
    }
}
```

You can use a `ViewModel` component, as explained in Use ViewModel to manage UI-related data, to bind the data to the layout. In the `ViewModel` component, you can use the `LiveData` object to transform the data or merge multiple data sources. The following example shows how to transform the data in the `ViewModel`:

### Kotlin

```kotlin
class ScheduleViewModel : ViewModel() {
    val userName: LiveData

    init {
        val result = Repository.userName
        userName = Transformations.map(result) { result -> result.value }
    }
}
```

### Java

```java
class ScheduleViewModel extends ViewModel {
    LiveData username;

    public ScheduleViewModel() {
        String result = Repository.userName;
        userName = Transformations.map(result, result -> result.value);
    }
}
```

Use ViewModel to manage UI-related data
---------------------------------------

The Data Binding Library works seamlessly with `ViewModel` components, which expose the data that the layout observes and reacts to its changes. Using `ViewModel` components with the Data Binding Library allows you to move UI logic out of the layouts and into the components, which are easier to test. The Data Binding Library ensures that the views are bound and unbound from the data source when needed. Most of the remaining work consists in making sure that you're exposing the correct data. For more information about this Architecture Component, see ViewModel Overview.

To use the `ViewModel` component with the Data Binding Library, you must instantiate your component, which inherits from the `ViewModel` class, obtain an instance of your binding class, and assign your `ViewModel` component to a property in the binding class. The following example shows how to use the component with the library:

### Kotlin

```kotlin
class ViewModelActivity : AppCompatActivity() {
    override fun onCreate(savedInstanceState: Bundle?) {
        // Obtain the ViewModel component.
        val userModel: UserModel by viewModels()

        // Inflate view and obtain an instance of the binding class.
        val binding: UserBinding = DataBindingUtil.setContentView(this, R.layout.user)

        // Assign the component to a property in the binding class.
        binding.viewmodel = userModel
    }
}
```

### Java

```java
class ViewModelActivity extends AppCompatActivity {
    @Override
    protected void onCreate(Bundle savedInstanceState) {
        // Obtain the ViewModel component.
        UserModel userModel = new ViewModelProvider(this).get(UserModel.class);

        // Inflate view and obtain an instance of the binding class.
        UserBinding binding = DataBindingUtil.setContentView(this, R.layout.user);

        // Assign the component to a property in the binding class.
        binding.viewmodel = userModel;
    }
}
```

In your layout, assign the properties and methods of your `ViewModel` component to the corresponding views using binding expressions, as shown in the following example:

```xml
    <CheckBox
        android:id="@+id/rememberMeCheckBox"
        android:checked="@{viewmodel.rememberMe}"
        android:onCheckedChanged="@{() -> viewmodel.rememberMeChanged()}" />
    
```

Use an Observable ViewModel for more control over binding adapters
------------------------------------------------------------------

You can use a `ViewModel` component that implements the `Observable` to notify other app components about changes in the data, similar to how you would use a `LiveData` object.

There are situations where you might prefer to use a `ViewModel` component that implements the `Observable` interface over using `LiveData` objects, even if you lose the lifecycle management capabilities of `LiveData`. Using a `ViewModel` component that implements `Observable` gives you more control over the binding adapters in your app. For example, this pattern gives you more control over the notifications when data changes, it also allows you to specify a custom method to set the value of an attribute in two-way data binding.

To implement an observable `ViewModel` component, you must create a class that inherits from the `ViewModel` class and implements the `Observable` interface. You can provide your custom logic when an observer subscribes or unsubscribes to notifications using the `addOnPropertyChangedCallback()`) and `removeOnPropertyChangedCallback()`) methods. You can also provide custom logic that runs when properties change in the `notifyPropertyChanged()`) method. The following code example shows how to implement an observable `ViewModel`:

### Kotlin

```kotlin
/**
 * A ViewModel that is also an Observable,
 * to be used with the Data Binding Library.
 */
open class ObservableViewModel : ViewModel(), Observable {
    private val callbacks: PropertyChangeRegistry = PropertyChangeRegistry()

    override fun addOnPropertyChangedCallback(
            callback: Observable.OnPropertyChangedCallback) {
        callbacks.add(callback)
    }

    override fun removeOnPropertyChangedCallback(
            callback: Observable.OnPropertyChangedCallback) {
        callbacks.remove(callback)
    }

    /**
     * Notifies observers that all properties of this instance have changed.
     */
    fun notifyChange() {
        callbacks.notifyCallbacks(this, 0, null)
    }

    /**
     * Notifies observers that a specific property has changed. The getter for the
     * property that changes should be marked with the @Bindable annotation to
     * generate a field in the BR class to be used as the fieldId parameter.
     *
     * @param fieldId The generated BR id for the Bindable field.
     */
    fun notifyPropertyChanged(fieldId: Int) {
        callbacks.notifyCallbacks(this, fieldId, null)
    }
}
```

### Java

```java
/**
 * A ViewModel that is also an Observable,
 * to be used with the Data Binding Library.
 */
class ObservableViewModel extends ViewModel implements Observable {
    private PropertyChangeRegistry callbacks = new PropertyChangeRegistry();

    @Override
    protected void addOnPropertyChangedCallback( Observable.OnPropertyChangedCallback callback) {
        callbacks.add(callback);
    }

    @Override
    protected void removeOnPropertyChangedCallback( Observable.OnPropertyChangedCallback callback) {
        callbacks.remove(callback);
    }

    /**
     * Notifies observers that all properties of this instance have changed.
     */
    void notifyChange() {
        callbacks.notifyCallbacks(this, 0, null);
    }

    /**
     * Notifies observers that a specific property has changed. The getter for the
     * property that changes should be marked with the @Bindable annotation to
     * generate a field in the BR class to be used as the fieldId parameter.
     *
     * @param fieldId The generated BR id for the Bindable field.
     */
    void notifyPropertyChanged(int fieldId) {
        callbacks.notifyCallbacks(this, fieldId, null);
    }
}
```