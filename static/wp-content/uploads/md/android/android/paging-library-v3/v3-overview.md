# Paging library overview

The Paging library helps you load and display pages of data from a larger dataset from local storage or over network. This approach allows your app to use both network bandwidth and system resources more efficiently. The components of the Paging library are designed to fit into the recommended Android app architecture, integrate cleanly with other Jetpack components, and provide first-class Kotlin support.

Benefits of using the Paging library
------------------------------------

The Paging library includes the following features:

*   In-memory caching for your paged data. This ensures that your app uses system resources efficiently while working with paged data.
*   Built-in request deduplication, ensuring that your app uses network bandwidth and system resources efficiently.
*   Configurable `RecyclerView` adapters that automatically request data as the user scrolls toward the end of the loaded data.
*   First-class support for Kotlin coroutines and Flow, as well as `LiveData` and RxJava.
*   Built-in support for error handling, including refresh and retry capabilities.

Provide feedback
----------------

Your feedback helps make Jetpack better. Let us know if you discover new issues or have ideas for improving this library. Please take a look at the existing issues for this library before you create a new one. You can add your vote to an existing issue by clicking the star button.

Create a new issue

See the Issue Tracker documentation for more information.

Setup
-----

To import Paging components into your Android app, add the following dependencies to your app's `build.gradle` file:

### Groovy

```groovy
dependencies {
  def paging_version = "3.1.1"

  implementation "androidx.paging:paging-runtime:$paging_version"

  // alternatively - without Android dependencies for tests
  testImplementation "androidx.paging:paging-common:$paging_version"

  // optional - RxJava2 support
  implementation "androidx.paging:paging-rxjava2:$paging_version"

  // optional - RxJava3 support
  implementation "androidx.paging:paging-rxjava3:$paging_version"

  // optional - Guava ListenableFuture support
  implementation "androidx.paging:paging-guava:$paging_version"

  // optional - Jetpack Compose integration
  implementation "androidx.paging:paging-compose:1.0.0-alpha17"
}
```

### Kotlin

```kotlin
dependencies {
  val paging_version = "3.1.1"

  implementation("androidx.paging:paging-runtime:$paging_version")

  // alternatively - without Android dependencies for tests
  testImplementation("androidx.paging:paging-common:$paging_version")

  // optional - RxJava2 support
  implementation("androidx.paging:paging-rxjava2:$paging_version")

  // optional - RxJava3 support
  implementation("androidx.paging:paging-rxjava3:$paging_version")

  // optional - Guava ListenableFuture support
  implementation("androidx.paging:paging-guava:$paging_version")

  // optional - Jetpack Compose integration
  implementation("androidx.paging:paging-compose:1.0.0-alpha17")
}
```

Library architecture
--------------------

The Paging library integrates directly into the recommended Android app architecture. The library's components operate in three layers of your app:

*   The repository layer
*   The `ViewModel` layer
*   The UI layer

![Paged data flows from the PagingSource or RemoteMediator components
    in the repository layer to the Pager component in the ViewModel layer.
    Then the Pager component exposes a Flow of PagingData to the
    PagingDataAdapter in the UI layer.](https://developer.android.com/static/topic/libraries/architecture/images/paging3-library-architecture.svg)

**Figure 1.** An example of how the Paging library fits into your app architecture.

This section describes the Paging library components that operate at each layer and how they work together to load and display paged data.

### Repository layer

The primary Paging library component in the repository layer is `PagingSource`. Each `PagingSource` object defines a source of data and how to retrieve data from that source. A `PagingSource` object can load data from any single source, including network sources and local databases.

Another Paging library component that you might use is `RemoteMediator`. A `RemoteMediator` object handles paging from a layered data source, such as a network data source with a local database cache.

### ViewModel layer

The `Pager` component provides a public API for constructing instances of `PagingData` that are exposed in reactive streams, based on a `PagingSource` object and a `PagingConfig` configuration object.

The component that connects the `ViewModel` layer to the UI is `PagingData`. A `PagingData` object is a container for a snapshot of paginated data. It queries a `PagingSource` object and stores the result.

### UI layer

The primary Paging library component in the UI layer is `PagingDataAdapter`, a `RecyclerView` adapter that handles paginated data.

Alternatively, you can use the included `AsyncPagingDataDiffer` component to build your own custom adapter.

