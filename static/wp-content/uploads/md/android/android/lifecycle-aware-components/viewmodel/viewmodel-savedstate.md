# Saved State module for ViewModel

As mentioned in Saving UI States, `ViewModel` objects can handle configuration changes, so you don't need to worry about state in rotations or other cases. However, if you need to handle system-initiated process death, you might want to use `onSaveInstanceState()`) as backup.

UI state is usually stored or referenced in `ViewModel` objects and not activities, so using `onSaveInstanceState()` requires some boilerplate that the saved state module can handle for you.

When using this module, `ViewModel` objects receive a `SavedStateHandle` object through its constructor. This object is a key-value map that lets you write and retrieve objects to and from the saved state. These values persist after the process is killed by the system and remain available through the same object.

Saved state is tied to your task stack. If your task stack goes away, your saved state also goes away. This can occur when force stopping an app, removing the app from the recents menu, or rebooting the device. In such cases, the task stack disappears and you can't restore the information in saved state.

Setup
-----

Beginning with Fragment 1.2.0 or its transitive dependency Activity 1.1.0, you can accept a `SavedStateHandle` as a constructor argument to your `ViewModel`.

### Kotlin

class SavedStateViewModel(private val state: SavedStateHandle) : ViewModel() { ... }

### Java

```java
public class SavedStateViewModel extends ViewModel {
    private SavedStateHandle state;

    public SavedStateViewModel(SavedStateHandle savedStateHandle) {
        state = savedStateHandle;
    }

    ...
}
```

You can then retrieve an instance of your `ViewModel` without any additional configuration. The default `ViewModel` factory provides the appropriate `SavedStateHandle` to your `ViewModel`.

### Kotlin

```kotlin
class MainFragment : Fragment() {
    val vm: SavedStateViewModel by viewModels()

    ...
}
```

### Java

```java
class MainFragment extends Fragment {
    private SavedStateViewModel vm;

    public void onViewCreated(@NonNull View view, Bundle savedInstanceState) {
        vm = new ViewModelProvider(this).get(SavedStateViewModel.class);

        ...


    }

    ...
}
```

When providing a custom `ViewModelProvider.Factory` instance, you can enable usage of `SavedStateHandle` by extending `AbstractSavedStateViewModelFactory`.

Working with SavedStateHandle
-----------------------------

The `SavedStateHandle` class is a key-value map that allows you to write and retrieve data to and from the saved state through the `set()`) and `get()`) methods.

By using `SavedStateHandle`, the query value is retained across process death, ensuring that the user sees the same set of filtered data before and after recreation without the activity or fragment needing to manually save, restore, and forward that value back to the `ViewModel`.

`SavedStateHandle` also has other methods you might expect when interacting with a key-value map:

*   `contains(String key)`) - Checks if there is a value for the given key.
*   `remove(String key)`) - Removes the value for the given key.
*   `keys()`) - Returns all keys contained within the `SavedStateHandle`.

Additionally, you can retrieve values from `SavedStateHandle` using an observable data holder. The list of supported types are:

*   `LiveData`.
*   `StateFlow`.
*   Compose's State APIs.

### LiveData

Retrieve values from `SavedStateHandle` that are wrapped in a `LiveData` observable using `getLiveData()`). When the key's value is updated, the `LiveData` receives the new value. Most often, the value is set due to user interactions, such as entering a query to filter a list of data. This updated value can then be used to transform `LiveData`.

### Kotlin

```kotlin
class SavedStateViewModel(private val savedStateHandle: SavedStateHandle) : ViewModel() {
    val filteredData: LiveData<List<String>> =
        savedStateHandle.getLiveData<String>("query").switchMap { query ->
        repository.getFilteredData(query)
    }

    fun setQuery(query: String) {
        savedStateHandle["query"] = query
    }
}
```

### Java

```java
public class SavedStateViewModel extends ViewModel {
    private SavedStateHandle savedStateHandle;
    public LiveData<List<String>> filteredData;
    public UserViewModelJava(SavedStateHandle savedStateHandle) {
        this.savedStateHandle = savedStateHandle;
        LiveData<String> queryLiveData = savedStateHandle.getLiveData("query");
        filteredData = Transformations.switchMap(queryLiveData, query -> {
            return repository.getFilteredData(query);
        });
    }

    public void setQuery(String query) {
        savedStateHandle.set("query", query);
    }
}
```

### StateFlow

Retrieve values from `SavedStateHandle` that are wrapped in a `StateFlow` observable using `getStateFlow()`). When you update the key's value, the `StateFlow` receives the new value. Most often, you might set the value due to user interactions, such as entering a query to filter a list of data. You can then transform this updated value using other Flow operators.

### Kotlin

```kotlin
class SavedStateViewModel(private val savedStateHandle: SavedStateHandle) : ViewModel() {
    val filteredData: StateFlow<List<String>> =
        savedStateHandle.getStateFlow<String>("query")
            .flatMapLatest { query ->
                repository.getFilteredData(query)
            }

    fun setQuery(query: String) {
        savedStateHandle["query"] = query
    }
}
```

### Experimental Compose's State support

The `lifecycle-viewmodel-compose` artifact provides the experimental `saveable`.saveable(kotlin.String,androidx.compose.runtime.saveable.Saver,kotlin.Function0)) APIs that allow interoperability between `SavedStateHandle` and Compose's `Saver` so that any `State` that you can save via `rememberSaveable` with a custom `Saver` can also be saved with `SavedStateHandle`.

### Kotlin

```kotlin
class SavedStateViewModel(private val savedStateHandle: SavedStateHandle) : ViewModel() {

    val filteredData: List<String> by savedStateHandle.saveable {
        mutableStateOf>(emptyList())
    }

    fun setQuery(query: String) {
        withMutableSnapshot {
            filteredData = query
        }
    }
}
```

Supported types
---------------

Data kept within a `SavedStateHandle` is saved and restored as a `Bundle`, along with the rest of the `savedInstanceState` for the activity or fragment.

### Directly supported types

By default, you can call `set()` and `get()` on a `SavedStateHandle` for the same data types as a `Bundle`, as shown below:

**Type/Class support**

**Array support**

`double`

`double[]`

`int`

`int[]`

`long`

`long[]`

`String`

`String[]`

`byte`

`byte[]`

`char`

`char[]`

`CharSequence`

`CharSequence[]`

`float`

`float[]`

`Parcelable`

`Parcelable[]`

`Serializable`

`Serializable[]`

`short`

`short[]`

`SparseArray`

`Binder`

`Bundle`

`ArrayList`

`Size (only in API 21+)`

`SizeF (only in API 21+)`

If the class does not extend one of those in the above list, consider making the class parcelable by adding the `@Parcelize` Kotlin annotation or implementing `Parcelable` directly.

### Saving non-parcelable classes

If a class does not implement `Parcelable` or `Serializable` and cannot be modified to implement one of those interfaces, then it is not possible to directly save an instance of that class into a `SavedStateHandle`.

Beginning with Lifecycle 2.3.0-alpha03, `SavedStateHandle` allows you to save any object by providing your own logic for saving and restoring your object as a `Bundle` using the `setSavedStateProvider()`) method. `SavedStateRegistry.SavedStateProvider` is an interface that defines a single `saveState()`) method that returns a `Bundle` containing the state you want to save. When `SavedStateHandle` is ready to save its state, it calls `saveState()` to retrieve the `Bundle` from the `SavedStateProvider` and saves the `Bundle` for the associated key.

Consider an example of an app that requests an image from the camera app via the `ACTION_IMAGE_CAPTURE` intent, passing in a temporary file for where the camera should store the image. The `TempFileViewModel` encapsulates the logic for creating that temporary file.

### Kotlin

```kotlin
class TempFileViewModel : ViewModel() {
    private var tempFile: File? = null

    fun createOrGetTempFile(): File {
        return tempFile ?: File.createTempFile("temp", null).also {
            tempFile = it
        }
    }
}
```

### Java

```java
class TempFileViewModel extends ViewModel {
    private File tempFile = null;

    public TempFileViewModel() {
    }


    @NonNull
    public File createOrGetTempFile() {
        if (tempFile == null) {
            tempFile = File.createTempFile("temp", null);
        }
        return tempFile;
    }
}
```

To ensure the temporary file is not lost if the activity's process is killed and later restored, `TempFileViewModel` can use the `SavedStateHandle` to persist its data. To allow `TempFileViewModel` to save its data, implement `SavedStateProvider` and set it as a provider on the `SavedStateHandle` of the `ViewModel`:

### Kotlin

```kotlin
private fun File.saveTempFile() = bundleOf("path", absolutePath)

class TempFileViewModel(savedStateHandle: SavedStateHandle) : ViewModel() {
    private var tempFile: File? = null
    init {
        savedStateHandle.setSavedStateProvider("temp_file") { // saveState()
            if (tempFile != null) {
                tempFile.saveTempFile()
            } else {
                Bundle()
            }
        }
    }

    fun createOrGetTempFile(): File {
        return tempFile ?: File.createTempFile("temp", null).also {
            tempFile = it
        }
    }
}
```

### Java

```java
class TempFileViewModel extends ViewModel {
    private File tempFile = null;

    public TempFileViewModel(SavedStateHandle savedStateHandle) {
        savedStateHandle.setSavedStateProvider("temp_file",
            new TempFileSavedStateProvider());
    }
    @NonNull
    public File createOrGetTempFile() {
        if (tempFile == null) {
            tempFile = File.createTempFile("temp", null);
        }
        return tempFile;
    }

    private class TempFileSavedStateProvider implements SavedStateRegistry.SavedStateProvider {
        @NonNull
        @Override
        public Bundle saveState() {
            Bundle bundle = new Bundle();
            if (tempFile != null) {
                bundle.putString("path", tempFile.getAbsolutePath());
            }
            return bundle;
        }
    }
}
```

To restore the `File` data when the user returns, retrieve the `temp_file` `Bundle` from the `SavedStateHandle`. This is the same `Bundle` provided by `saveTempFile()` that contains the absolute path. The absolute path can then be used to instantiate a new `File`.

### Kotlin

```kotlin
private fun File.saveTempFile() = bundleOf("path", absolutePath)

private fun Bundle.restoreTempFile() = if (containsKey("path")) {
    File(getString("path"))
} else {
    null
}

class TempFileViewModel(savedStateHandle: SavedStateHandle) : ViewModel() {
    private var tempFile: File? = null
    init {
        val tempFileBundle = savedStateHandle.get<Bundle>("temp_file")
        if (tempFileBundle != null) {
            tempFile = tempFileBundle.restoreTempFile()
        }
        savedStateHandle.setSavedStateProvider("temp_file") { // saveState()
            if (tempFile != null) {
                tempFile.saveTempFile()
            } else {
                Bundle()
            }
        }
    }

    fun createOrGetTempFile(): File {
      return tempFile ?: File.createTempFile("temp", null).also {
          tempFile = it
      }
    }
}
```

### Java

```java
class TempFileViewModel extends ViewModel {
    private File tempFile = null;

    public TempFileViewModel(SavedStateHandle savedStateHandle) {
        Bundle tempFileBundle = savedStateHandle.get("temp_file");
        if (tempFileBundle != null) {
            tempFile = TempFileSavedStateProvider.restoreTempFile(tempFileBundle);
        }
        savedStateHandle.setSavedStateProvider("temp_file", new TempFileSavedStateProvider());
    }

    @NonNull
    public File createOrGetTempFile() {
        if (tempFile == null) {
            tempFile = File.createTempFile("temp", null);
        }
        return tempFile;
    }

    private class TempFileSavedStateProvider implements SavedStateRegistry.SavedStateProvider {
        @NonNull
        @Override
        public Bundle saveState() {
            Bundle bundle = new Bundle();
            if (tempFile != null) {
                bundle.putString("path", tempFile.getAbsolutePath());
            }
            return bundle;
        }

        @Nullable
        private static File restoreTempFile(Bundle bundle) {
            if (bundle.containsKey("path") {
                return File(bundle.getString("path"));
            }
            return null;
        }
    }
}
```

