# App Architecture: Data Layer - DataStore

Jetpack DataStore is a data storage solution that allows you to store key-value pairs or typed objects with protocol buffers. DataStore uses Kotlin coroutines and Flow to store data asynchronously, consistently, and transactionally.

If you're currently using `SharedPreferences` to store data, consider migrating to DataStore instead.

Preferences DataStore and Proto DataStore
-----------------------------------------

DataStore provides two different implementations: Preferences DataStore and Proto DataStore.

*   **Preferences DataStore** stores and accesses data using keys. This implementation does not require a predefined schema, and it does not provide type safety.
*   **Proto DataStore** stores data as instances of a custom data type. This implementation requires you to define a schema using protocol buffers, but it provides type safety.

Setup
-----

To use Jetpack DataStore in your app, add the following to your Gradle file depending on which implementation you want to use:

### Preferences DataStore

### Groovy

```groovy
    // Preferences DataStore (SharedPreferences like APIs)
    dependencies {
        implementation "androidx.datastore:datastore-preferences:1.0.0"

        // optional - RxJava2 support
        implementation "androidx.datastore:datastore-preferences-rxjava2:1.0.0"

        // optional - RxJava3 support
        implementation "androidx.datastore:datastore-preferences-rxjava3:1.0.0"
    }

    // Alternatively - use the following artifact without an Android dependency.
    dependencies {
        implementation "androidx.datastore:datastore-preferences-core:1.0.0"
    }
  ```

### Kotlin

```kotlin
    // Preferences DataStore (SharedPreferences like APIs)
    dependencies {
        implementation("androidx.datastore:datastore-preferences:1.0.0")

        // optional - RxJava2 support
        implementation("androidx.datastore:datastore-preferences-rxjava2:1.0.0")

        // optional - RxJava3 support
        implementation("androidx.datastore:datastore-preferences-rxjava3:1.0.0")
    }

    // Alternatively - use the following artifact without an Android dependency.
    dependencies {
        implementation("androidx.datastore:datastore-preferences-core:1.0.0")
    }
  ```

### Proto DataStore

### Groovy

```groovy
    // Typed DataStore (Typed API surface, such as Proto)
    dependencies {
        implementation "androidx.datastore:datastore:1.0.0"

        // optional - RxJava2 support
        implementation "androidx.datastore:datastore-rxjava2:1.0.0"

        // optional - RxJava3 support
        implementation "androidx.datastore:datastore-rxjava3:1.0.0"
    }

    // Alternatively - use the following artifact without an Android dependency.
    dependencies {
        implementation "androidx.datastore:datastore-core:1.0.0"
    }
  ```

### Kotlin

```kotlin
    // Typed DataStore (Typed API surface, such as Proto)
    dependencies {
        implementation("androidx.datastore:datastore:1.0.0")

        // optional - RxJava2 support
        implementation("androidx.datastore:datastore-rxjava2:1.0.0")

        // optional - RxJava3 support
        implementation("androidx.datastore:datastore-rxjava3:1.0.0")
    }

    // Alternatively - use the following artifact without an Android dependency.
    dependencies {
        implementation("androidx.datastore:datastore-core:1.0.0")
    }
  ```

Store key-value pairs with Preferences DataStore
------------------------------------------------

The Preferences DataStore implementation uses the `DataStore` and `Preferences` classes to persist simple key-value pairs to disk.

### Create a Preferences DataStore

Use the property delegate created by `preferencesDataStore` to create an instance of `Datastore<Preferences>`. Call it once at the top level of your kotlin file, and access it through this property throughout the rest of your application. This makes it easier to keep your `DataStore` as a singleton. Alternatively, use `RxPreferenceDataStoreBuilder` if you're using RxJava. The mandatory `name` parameter is the name of the Preferences DataStore.

### Kotlin

```kotlin
// At the top level of your kotlin file:
val Context.dataStore: DataStore<Preferences> by preferencesDataStore(name = "settings")
```

### Java

```java
RxDataStore<Preferences> dataStore =
  new RxPreferenceDataStoreBuilder(context, /*name=*/ "settings").build();
```

### Read from a Preferences DataStore

Because Preferences DataStore does not use a predefined schema, you must use the corresponding key type function to define a key for each value that you need to store in the `DataStore<Preferences>` instance. For example, to define a key for an int value, use `intPreferencesKey()`). Then, use the `DataStore.data` property to expose the appropriate stored value using a `Flow`.

### Kotlin

```kotlin
val EXAMPLE_COUNTER = intPreferencesKey("example_counter")
val exampleCounterFlow: Flow<Int> = context.dataStore.data
  .map { preferences ->
    // No type safety.
    preferences[EXAMPLE_COUNTER] ?: 0
}
```

### Java

```java
Preferences.Key<Integer> EXAMPLE_COUNTER = PreferencesKeys.int("example_counter");

Flowable<Integer> exampleCounterFlow =
  dataStore.data().map(prefs -> prefs.get(EXAMPLE_COUNTER));
```

### Write to a Preferences DataStore

Preferences DataStore provides an `edit()` function that transactionally updates the data in a `DataStore`. The function's `transform` parameter accepts a block of code where you can update the values as needed. All of the code in the transform block is treated as a single transaction.

### Kotlin

```kotlin
suspend fun incrementCounter() {
  context.dataStore.edit { settings ->
    val currentCounterValue = settings[EXAMPLE_COUNTER] ?: 0
    settings[EXAMPLE_COUNTER] = currentCounterValue + 1
  }
}
```

### Java

```java
Single<Preferences> updateResult =  dataStore.updateDataAsync(prefsIn -> {
  MutablePreferences mutablePreferences = prefsIn.toMutablePreferences();
  Integer currentInt = prefsIn.get(INTEGER_KEY);
  mutablePreferences.set(INTEGER_KEY, currentInt != null ? currentInt + 1 : 1);
  return Single.just(mutablePreferences);
});
// The update is completed once updateResult is completed.
```

Store typed objects with Proto DataStore
----------------------------------------

The Proto DataStore implementation uses DataStore and protocol buffers to persist typed objects to disk.

### Define a schema

Proto DataStore requires a predefined schema in a proto file in the `app/src/main/proto/` directory. This schema defines the type for the objects that you persist in your Proto DataStore. To learn more about defining a proto schema, see the protobuf language guide.

```
    syntax = "proto3";
    
    option java_package = "com.example.application";
    option java_multiple_files = true;
    
    message Settings {
      int32 example_counter = 1;
    }
  ``` 

### Create a Proto DataStore

There are two steps involved in creating a Proto DataStore to store your typed objects:

1.  Define a class that implements `Serializer<T>`, where `T` is the type defined in the proto file. This serializer class tells DataStore how to read and write your data type. Make sure you include a default value for the serializer to be used if there is no file created yet.
2.  Use the property delegate created by `dataStore` to create an instance of `DataStore<T>`, where `T` is the type defined in the proto file. Call this once at the top level of your kotlin file and access it through this property delegate throughout the rest of your app. The `filename` parameter tells DataStore which file to use to store the data, and the `serializer` parameter tells DataStore the name of the serializer class defined in step 1.

### Kotlin

```kotlin
object SettingsSerializer : Serializer<Settings> {
  override val defaultValue: Settings = Settings.getDefaultInstance()

  override suspend fun readFrom(input: InputStream): Settings {
    try {
      return Settings.parseFrom(input)
    } catch (exception: InvalidProtocolBufferException) {
      throw CorruptionException("Cannot read proto.", exception)
    }
  }

  override suspend fun writeTo(
    t: Settings,
    output: OutputStream) = t.writeTo(output)
}

val Context.settingsDataStore: DataStore<Settings> by dataStore(
  fileName = "settings.pb",
  serializer = SettingsSerializer
)
```

### Java

```java
private static class SettingsSerializer implements Serializer<Settings> {
  @Override
  public Settings getDefaultValue() {
    Settings.getDefaultInstance();
  }

  @Override
  public Settings readFrom(@NotNull InputStream input) {
    try {
      return Settings.parseFrom(input);
    } catch (exception: InvalidProtocolBufferException) {
      throw CorruptionException(“Cannot read proto.”, exception);
    }
  }

  @Override
  public void writeTo(Settings t, @NotNull OutputStream output) {
    t.writeTo(output);
  }
}

RxDataStore<Byte> dataStore =
    new RxDataStoreBuilder<Byte>(context, /* fileName= */ "settings.pb", new SettingsSerializer()).build();
```

### Read from a Proto DataStore

Use `DataStore.data` to expose a `Flow` of the appropriate property from your stored object.

### Kotlin

```kotlin
val exampleCounterFlow: Flow<Int> = context.settingsDataStore.data
  .map { settings ->
    // The exampleCounter property is generated from the proto schema.
    settings.exampleCounter
  }
```

### Java

```java
Flowable<Integer> exampleCounterFlow =
  dataStore.data().map(settings -> settings.getExampleCounter());
```

### Write to a Proto DataStore

Proto DataStore provides an `updateData()` function that transactionally updates a stored object. `updateData()` gives you the current state of the data as an instance of your data type and updates the data transactionally in an atomic read-write-modify operation.

### Kotlin

```kotlin
suspend fun incrementCounter() {
  context.settingsDataStore.updateData { currentSettings ->
    currentSettings.toBuilder()
      .setExampleCounter(currentSettings.exampleCounter + 1)
      .build()
    }
}
```

### Java

```java
Single<Settings> updateResult =
  dataStore.updateDataAsync(currentSettings ->
    Single.just(
      currentSettings.toBuilder()
        .setExampleCounter(currentSettings.getExampleCounter() + 1)
        .build()));
```

Use DataStore in synchronous code
---------------------------------

One of the primary benefits of DataStore is the asynchronous API, but it may not always be feasible to change your surrounding code to be asynchronous. This might be the case if you're working with an existing codebase that uses synchronous disk I/O or if you have a dependency that doesn't provide an asynchronous API.

Kotlin coroutines provide the `runBlocking()` coroutine builder to help bridge the gap between synchronous and asynchronous code. You can use `runBlocking()` to read data from DataStore synchronously. RxJava offers blocking methods on `Flowable`. The following code blocks the calling thread until DataStore returns data:

### Kotlin

```kotlin
val exampleData = runBlocking { context.dataStore.data.first() }
```

### Java

```java
Settings settings = dataStore.data().blockingFirst();
```

Performing synchronous I/O operations on the UI thread can cause ANRs or UI jank. You can mitigate these issues by asynchronously preloading the data from DataStore:

### Kotlin

```kotlin
override fun onCreate(savedInstanceState: Bundle?) {
    lifecycleScope.launch {
        context.dataStore.data.first()
        // You should also handle IOExceptions here.
    }
}
```

### Java

```java
dataStore.data().first().subscribe();
```

This way, DataStore asynchronously reads the data and caches it in memory. Later synchronous reads using `runBlocking()` may be faster or may avoid a disk I/O operation altogether if the initial read has completed.

