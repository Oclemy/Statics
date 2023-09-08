# Create ViewModels with dependencies

Following dependency injection's best practices, ViewModels can take dependencies as parameters in their constructor. These are mostly of types from the domain or data layers. Because the framework provides the ViewModels, a special mechanism is required to create instances of them. That mechanism is the `ViewModelProvider.Factory` interface. Only **implementations of this interface can instantiate ViewModels in the right scope**.

If a ViewModel class receives dependencies in its constructor, provide a factory that implements the `ViewModelProvider.Factory` interface. Override the `create(Class<T>, CreationExtras)`) function to provide a new instance of the ViewModel.

`CreationExtras` allows you to access relevant information that helps instantiate a ViewModel. Here's a list of keys that can be accessed from extras:

To create a new instance of `SavedStateHandle`, use the `CreationExtras.createSavedStateHandle()`.createSavedStateHandle()) function and pass it to the ViewModel.

The following is an example of how to provide an instance of a ViewModel that takes a repository scoped to the `Application` class and `SavedStateHandle` as dependencies:

### Kotlin

```kotlin
        import androidx.lifecycle.SavedStateHandle
        import androidx.lifecycle.ViewModel
        import androidx.lifecycle.ViewModelProvider
        import androidx.lifecycle.ViewModelProvider.AndroidViewModelFactory.Companion.APPLICATION_KEY
        import androidx.lifecycle.createSavedStateHandle
        import androidx.lifecycle.viewmodel.CreationExtras
    
        class MyViewModel(
            private val myRepository: MyRepository,
            private val savedStateHandle: SavedStateHandle
        ) : ViewModel() {
    
            // ViewModel logic
            // ...
    
            // Define ViewModel factory in a companion object
            companion object {
    
                val Factory: ViewModelProvider.Factory = object : ViewModelProvider.Factory {
                    @Suppress("UNCHECKED_CAST")
                    override fun <T : ViewModel> create(
                        modelClass: Class<T>,
                        extras: CreationExtras
                    ): T {
                        // Get the Application object from extras
                        val application = checkNotNull(extras[APPLICATION_KEY])
                        // Create a SavedStateHandle for this ViewModel from extras
                        val savedStateHandle = extras.createSavedStateHandle()
    
                        return MyViewModel(
                            (application as MyApplication).myRepository,
                            savedStateHandle
                        ) as T
                    }
                }
            }
        }
```

### Java

```java
    import static androidx.lifecycle.SavedStateHandleSupport.createSavedStateHandle;
    import static androidx.lifecycle.ViewModelProvider.AndroidViewModelFactory.APPLICATION_KEY;
    
    import androidx.lifecycle.SavedStateHandle;
    import androidx.lifecycle.ViewModel;
    import androidx.lifecycle.viewmodel.ViewModelInitializer;
    
    public class MyViewModel extends ViewModel {
    
        public MyViewModel(
            MyRepository myRepository,
            SavedStateHandle savedStateHandle
        ) { /* Init ViewModel here */ }
    
        static final ViewModelInitializer<MyViewModel> initializer = new ViewModelInitializer<>(
            MyViewModel.class,
            creationExtras -> {
                MyApplication app = (MyApplication) creationExtras.get(APPLICATION_KEY);
                assert app != null;
                SavedStateHandle savedStateHandle = createSavedStateHandle(creationExtras);
    
                return new MyViewModel(app.getMyRepository(), savedStateHandle);
            }
        );
    }
```

Then, you can use this factory when retrieving an instance of the ViewModel:

### Kotlin

```kotlin
    import androidx.activity.viewModels
    
    class MyActivity : AppCompatActivity() {
    
        private val viewModel: MyViewModel by viewModels { MyViewModel.Factory }
    
        // Rest of Activity code
    }
```

### Java

```java
    import androidx.appcompat.app.AppCompatActivity;
    import androidx.lifecycle.ViewModelProvider;
    
    public class MyActivity extends AppCompatActivity {
    
    MyViewModel myViewModel = new ViewModelProvider(
        this,
        ViewModelProvider.Factory.from(MyViewModel.initializer)
    ).get(MyViewModel.class);
    
    // Rest of Activity code
    } 
```

### Jetpack Compose

```kotlin
    import androidx.lifecycle.viewmodel.compose.viewModel
    
    @Composable
    fun MyScreen(
        modifier: Modifier = Modifier,
        viewModel: MyViewModel = viewModel(factory = MyViewModel.Factory)
    ) {
        // ...
    }
```

Alternatively, use the ViewModel factory DSL to create factories using a more idiomatic Kotlin API:

```kotlin
    import androidx.lifecycle.SavedStateHandle
    import androidx.lifecycle.ViewModel
    import androidx.lifecycle.ViewModelProvider
    import androidx.lifecycle.ViewModelProvider.AndroidViewModelFactory.Companion.APPLICATION_KEY
    import androidx.lifecycle.createSavedStateHandle
    import androidx.lifecycle.viewmodel.initializer
    import androidx.lifecycle.viewmodel.viewModelFactory
    
    class MyViewModel(
        private val myRepository: MyRepository,
        private val savedStateHandle: SavedStateHandle
    ) : ViewModel() {
        // ViewModel logic
    
        // Define ViewModel factory in a companion object
        companion object {
            val Factory: ViewModelProvider.Factory = viewModelFactory {
                initializer {
                    val savedStateHandle = createSavedStateHandle()
                    val myRepository = (this[APPLICATION_KEY] as MyApplication).myRepository
                    MyViewModel(
                        myRepository = myRepository,
                        savedStateHandle = savedStateHandle
                    )
                }
            }
        }
    }
```

Factories for ViewModel version older than 2.5.0
------------------------------------------------

If you're using a version of ViewModel older than 2.5.0, you need to provide factories from a subset of classes that extend `ViewModelProvider.Factory` and implement the `create(Class<T>)` function. Depending on what dependencies the ViewModel needs, a different class needs to be extended from:

*   `AndroidViewModelFactory` if the `Application` class is needed.
*   `AbstractSavedStateViewModelFactory` if `SavedStateHandle`) needs to be passed as a dependency.

If `Application` or `SavedStateHandle` aren't needed, simply extend from `ViewModelProvider.Factory`.

The following example uses an `AbstractSavedStateViewModelFactory` for a ViewModel that takes a repository and a `SavedStateHandle`) type as a dependency:

### Kotlin

```kotlin
    class MyViewModel(
    private val myRepository: MyRepository,
    private val savedStateHandle: SavedStateHandle
    ) : ViewModel() {
    
    // ViewModel logic ...
    
    // Define ViewModel factory in a companion object
    companion object {
        fun provideFactory(
            myRepository: MyRepository,
            owner: SavedStateRegistryOwner,
            defaultArgs: Bundle? = null,
        ): AbstractSavedStateViewModelFactory =
            object : AbstractSavedStateViewModelFactory(owner, defaultArgs) {
                @Suppress("UNCHECKED_CAST")
                override fun <T : ViewModel> create(
                    key: String,
                    modelClass: Class<T>,
                    handle: SavedStateHandle
                ): T {
                    return MyViewModel(myRepository, handle) as T
                }
            }
        }
    }
    
```

### Java

```java
    import androidx.annotation.NonNull;
    import androidx.lifecycle.AbstractSavedStateViewModelFactory;
    import androidx.lifecycle.SavedStateHandle;
    import androidx.lifecycle.ViewModel;
    
    public class MyViewModel extends ViewModel {
        public MyViewModel(
            MyRepository myRepository,
            SavedStateHandle savedStateHandle
        ) { /* Init ViewModel here */ }
    }
    
    public class MyViewModelFactory extends AbstractSavedStateViewModelFactory {
    
        private final MyRepository myRepository;
    
        public MyViewModelFactory(
            MyRepository myRepository
        ) {
            this.myRepository = myRepository;
        }
    
        @SuppressWarnings("unchecked")
        @NonNull
        @Override
        protected <T extends ViewModel> T create(
            @NonNull String key, @NonNull Class<T> modelClass, @NonNull SavedStateHandle handle
        ) {
            return (T) new MyViewModel(myRepository, handle);
        }
    }
    
```

Then, you can use factory to retrieve your ViewModel:

### Kotlin

```kotlin
    import androidx.activity.viewModels
    
    class MyActivity : AppCompatActivity() {
    
        private val viewModel: MyViewModel by viewModels {
            MyViewModel.provideFactory((application as MyApplication).myRepository, this)
        }
    
        // Rest of Activity code
    }
```

### Java

```java
    import androidx.appcompat.app.AppCompatActivity;
    import androidx.lifecycle.ViewModelProvider;
    
    public class MyActivity extends AppCompatActivity {
    
        MyViewModel myViewModel = new ViewModelProvider(
            this,
            ViewModelProvider.Factory.from(MyViewModel.initializer)
        ).get(MyViewModel.class);
    
        // Rest of Activity code
    }
```

### Jetpack Compose

```kotlin
    import androidx.lifecycle.viewmodel.compose.viewModel
    
    @Composable
    fun MyScreen(
        modifier: Modifier = Modifier,
        viewModel: MyViewModel = viewModel(
            factory = MyViewModel.provideFactory(
                (LocalContext.current.applicationContext as MyApplication).myRepository,
                owner = LocalSavedStateRegistryOwner.current
            )
        )
    ) {
        // ...
    }
```