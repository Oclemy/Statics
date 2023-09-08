# Work with observable data objects

Observability refers to the capability of an object to notify others about changes in its data. The Data Binding Library allows you to make objects, fields, or collections observable.

Any plain-old object can be used for data binding, but modifying the object doesn't automatically cause the UI to update. Data binding can be used to give your data objects the ability to notify other objects, known as listeners, when its data changes. There are three different types of observable classes: objects, fields, and collections.

When one of these observable data objects is bound to the UI and a property of the data object changes, the UI is updated automatically.

Observable fields
-----------------

Some work is involved in creating classes that implement the `Observable` interface, which could not be worth the effort if your classes only have a few properties. In this case, you can use the generic `Observable` class and the following primitive-specific classes to make fields observable:

*   `ObservableBoolean`
*   `ObservableByte`
*   `ObservableChar`
*   `ObservableShort`
*   `ObservableInt`
*   `ObservableLong`
*   `ObservableFloat`
*   `ObservableDouble`
*   `ObservableParcelable`

Observable fields are self-contained observable objects that have a single field. The primitive versions avoid boxing and unboxing during access operations. To use this mechanism, create a `public final` property in the Java programming language or a read-only property in Kotlin, as shown in the following example:

### Kotlin

```kotlin
class User {
    val firstName = ObservableField<String>()
    val lastName = ObservableField<String>()
    val age = ObservableInt()
}
```

### Java

```java
private static class User {
    public final ObservableField<String> firstName = new ObservableField<>();
    public final ObservableField<String> lastName = new ObservableField<>();
    public final ObservableInt age = new ObservableInt();
}
```

To access the field value, either use the `set()` and `get()` accessor methods or use Kotlin property syntax:

### Kotlin

```kotlin
user.firstName = "Google"
val age = user.age
```

### Java

```java
user.firstName.set("Google");
int age = user.age.get();
```

Observable collections
----------------------

Some apps use dynamic structures to hold data. Observable collections allow access to these structures by using a key. The `ObservableArrayMap` class is useful when the key is a reference type, such as `String`, as shown in the following example:

### Kotlin

```kotlin
ObservableArrayMap<String, Any>().apply {
    put("firstName", "Google")
    put("lastName", "Inc.")
    put("age", 17)
}
```

### Java

```java
ObservableArrayMap<String, Object> user = new ObservableArrayMap<>();
user.put("firstName", "Google");
user.put("lastName", "Inc.");
user.put("age", 17);
```

In the layout, the map can be found using the string keys, as follows:

```xml
    <data>
        <import type="android.databinding.ObservableMap"/>
        <variable name="user" type="ObservableMap&lt;String, Object&gt;"/>
    </data>
    …
    <TextView
        android:text="@{user.lastName}"
        android:layout_width="wrap_content"
        android:layout_height="wrap_content"/>
    <TextView
        android:text="@{String.valueOf(1 + (Integer)user.age)}"
        android:layout_width="wrap_content"
        android:layout_height="wrap_content"/>
```

The `ObservableArrayList` class is useful when the key is an integer, as follows:

### Kotlin

```kotlin
ObservableArrayList<Any>().apply {
    add("Google")
    add("Inc.")
    add(17)
}
```

### Java

```java
ObservableArrayList<Object> user = new ObservableArrayList<>();
user.add("Google");
user.add("Inc.");
user.add(17);
```

In the layout, the list can be accessed through the indexes, as shown in the following example:

```xml
    <data>
        <import type="android.databinding.ObservableList"/>
        <import type="com.example.my.app.Fields"/>
        <variable name="user" type="ObservableList&lt;Object&gt;"/>
    </data>
    …
    <TextView
        android:text='@{user[Fields.LAST_NAME]}'
        android:layout_width="wrap_content"
        android:layout_height="wrap_content"/>
    <TextView
        android:text='@{String.valueOf(1 + (Integer)user[Fields.AGE])}'
        android:layout_width="wrap_content"
        android:layout_height="wrap_content"/>
```

Observable objects
------------------

A class that implements the `Observable` interface allows the registration of listeners that want to be notified of property changes of on the observable object.

The `Observable` interface has a mechanism to add and remove listeners, but you must decide when notifications are sent. To make development easier, the Data Binding Library provides the `BaseObservable` class, which implements the listener registration mechanism. The data class that implements `BaseObservable` is responsible for notifying when the properties change. This is done by assigning a `Bindable` annotation to the getter and calling the `notifyPropertyChanged()` method in the setter, as shown in the following example:

### Kotlin

```kotlin
class User : BaseObservable() {

    @get:Bindable
    var firstName: String = ""
        set(value) {
            field = value
            notifyPropertyChanged(BR.firstName)
        }

    @get:Bindable
    var lastName: String = ""
        set(value) {
            field = value
            notifyPropertyChanged(BR.lastName)
        }
}
```

### Java

```java
private static class User extends BaseObservable {
    private String firstName;
    private String lastName;

    @Bindable
    public String getFirstName() {
        return this.firstName;
    }

    @Bindable
    public String getLastName() {
        return this.lastName;
    }

    public void setFirstName(String firstName) {
        this.firstName = firstName;
        notifyPropertyChanged(BR.firstName);
    }

    public void setLastName(String lastName) {
        this.lastName = lastName;
        notifyPropertyChanged(BR.lastName);
    }
}
```

Data binding generates a class named `BR` in the module package which contains the IDs of the resources used for data binding. The `Bindable` annotation generates an entry in the `BR` class file during compilation. If the base class for data classes cannot be changed, the `Observable` interface can be implemented using a `PropertyChangeRegistry` object to register and notify listeners efficiently.

Lifecycle-aware objects
-----------------------

The layouts in your app can also bind to data binding sources that automatically notify the UI about changes in the data. That way, your bindings are lifecycle-aware and are only triggered when the UI is visible on the screen.

Data binding currently supports `StateFlow` and `LiveData`. For more information about using `LiveData` in data binding, see Use LiveData to notify the UI about data changes.

### Using StateFlow

If your app uses Kotlin with coroutines, you can use `StateFlow` objects as the data binding source. To use a `StateFlow` object with your binding class, you must specify a lifecycle owner to define the scope of the `StateFlow` object. The following example specifies the activity as the lifecycle owner after the binding class is instantiated:

```kotlin
    class ViewModelActivity : AppCompatActivity() {
        override fun onCreate(savedInstanceState: Bundle?) {
            // Inflate view and obtain an instance of the binding class.
            val binding: UserBinding = DataBindingUtil.setContentView(this, R.layout.user)
    
            // Specify the current activity as the lifecycle owner.
            binding.lifecycleOwner = this
        }
    }
```

As described in Bind layout views to Architecture Components, data binding works seamlessly with `ViewModel` objects. You can use `StateFlow` and `ViewModel` together as follows:

```kotlin
    class ScheduleViewModel : ViewModel() {
    
        private val _username = MutableStateFlow<String>("")
        val username: StateFlow<String> = _username
    
        init {
            viewModelScope.launch {
                _username.value = Repository.loadUserName()
            }
        }
    }
```

In your layout, assign the properties and methods of your `ViewModel` object to the corresponding views using binding expressions, as shown in the following example:

```xml
    <TextView
        android:id="@+id/name"
        android:text="@{viewmodel.username}" />
```

The UI is automatically updated whenever the user's name value changes.

#### Disabling StateFlow support

For apps that use Kotlin and AndroidX, StateFlow support is automatically included with data binding. This means that the coroutines dependency is automatically included in your app if the dependency is not already available.

You can opt out of this functionality by adding the following to your `build.gradle` file:

### Groovy

```groovy
android {
    ...
    dataBinding {
        addKtx = false
    }
}
```

### Kotlin

```kotlin
android {
    ...
    dataBinding {
        addKtx = false
    }
}
```

Alternatively, you can disable it globally in your project by adding the following line to the `gradle.properties` file:

### Groovy

```groovy
android.defaults.databinding.addKtx = false
```

### Kotlin

```kotlin
android.defaults.databinding.addKtx = false
```