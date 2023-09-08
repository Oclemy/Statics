# Migrate to Paging 3

Paging 3 is significantly different from earlier versions of the Paging library. This version provides enhanced functionality and addresses common difficulties with using Paging 2. If your app already uses an earlier version of the Paging library, read this page to learn more about migrating to Paging 3.

If Paging 3 is the first version of the Paging library that you are using in your app, see Load and display paged data for basic usage information.

Benefits of migrating to Paging 3
---------------------------------

Paging 3 includes the following features that were not present in earlier versions of the library:

*   First-class support for Kotlin coroutines and Flow.
*   Support for async loading using RxJava `Single` or Guava `ListenableFuture` primitives.
*   Built-in load state and error signals for responsive UI design, including retry and refresh functionality.
*   Improvements to the repository layer, including cancellation support and a simplified data source interface.
*   Improvements to the presentation layer, list separators, custom page transforms, and loading state headers and footers.

Migrate your app to Paging 3
----------------------------

To fully migrate to Paging 3, you must migrate all three of the major components from Paging 2:

*   `DataSource` classes
*   `PagedList`
*   `PagedListAdapter`

However, some Paging 3 components are backwards-compatible with previous versions of Paging. In particular, the `PagingSource` API from Paging 3 can be a data source for `LivePagedListBuilder` and `RxPagedListBuilder` from older versions. Similarly, the `Pager` API can use older `DataSource` objects with the `asPagingSourceFactory()` method. This means that you have the following migration options:

*   You can migrate your `DataSource` to `PagingSource` but leave the rest of your Paging implementation unchanged.
*   You can migrate your `PagedList` and `PagedListAdapter` but still use the older `DataSource` API.
*   You can migrate the entire Paging implementation to fully migrate your app to Paging 3.

The sections on this page explain how to migrate Paging components on each layer of your app.

### DataSource classes

This section describes all of the necessary changes to migrate an older Paging implementation to use `PagingSource`.

The `PageKeyedDataSource`, `PositionalDataSource`, and `ItemKeyedDataSource` from Paging 2 are all combined into the `PagingSource` API in Paging 3. The loading methods from all of the old API classes are combined into a single `load()` method in `PagingSource`. This reduces code duplication because much of the logic across the loading methods in implementations of the old API classes is often identical.

All loading method parameters are replaced in Paging 3 with a `LoadParams` sealed class, which includes subclasses for each load type. If you need to differentiate among load types in your `load()` method, check which subclass of `LoadParams` was passed in: `LoadParams.Refresh`, `LoadParams.Prepend`, or `LoadParams.Append`.

To learn more about implementing `PagingSource`, see Define a data source.

#### Refresh keys

Implementations of `PagingSource` must define how refreshes resume from the middle of the loaded paged data. Do this by implementing `getRefreshKey()` to map the correct initial key using `state.anchorPosition` as the most recently accessed index.

### Kotlin

```kotlin
// Replaces ItemKeyedDataSource.
override fun getRefreshKey(state: PagingState): String? {
  return state.anchorPosition?.let { anchorPosition ->
    state.getClosestItemToPosition(anchorPosition)?.id
  }
}

// Replacing PositionalDataSource.
override fun getRefreshKey(state: PagingState): Int? {
  return state.anchorPosition
}
```

### Java

```java
// Replaces ItemKeyedDataSource.
@Nullable
@Override
String getRefreshKey(state: PagingState) {
  Integer anchorPosition = state.anchorPosition;
  if (anchorPosition == null) {
    return null;
  }

  return state.getClosestItemToPosition(anchorPosition);
}

// Replaces PositionalDataSource.
@Nullable
@Override
Integer getRefreshKey(state: PagingState) {
  return state.anchorPosition;
}
```

### Java

```java
// Replacing ItemKeyedDataSource.
@Nullable
@Override
String getRefreshKey(state: PagingState) {
  Integer anchorPosition = state.anchorPosition;
  if (anchorPosition == null) {
    return null;
  }

  return state.getClosestItemToPosition(anchorPosition);
}

// Replacing PositionalDataSource.
@Nullable
@Override
Integer getRefreshKey(state: PagingState) {
  return state.anchorPosition;
}
```

#### List transformations

In older versions of the Paging library, transformation of the paged data relies on the following methods:

*   `DataSource.map()`
*   `DataSource.mapByPage()`
*   `DataSource.Factory.map()`
*   `DataSource.Factory.mapByPage()`

In Paging 3, all transformations are applied as operators on `PagingData`. If you use any of the methods in the preceding list to transform your paged list, you must move your transformation logic from the `DataSource` to the `PagingData` when constructing the `Pager` using your new `PagingSource`.

To learn more about applying transformations to paged data using Paging 3, see Transform data streams.

### PagedList

This section describes all of the necessary changes to migrate an older Paging implementation to use `Pager` and `PagingData` in Paging 3.

#### PagedListBuilder classes

`PagingData` replaces the existing `PagedList` from Paging 2. To migrate to `PagingData`, you must update the following:

*   Paging configuration has moved from `PagedList.Config` to `PagingConfig`.
*   `LivePagedListBuilder` and `RxPagedListBuilder` have been combined into a single `Pager` class.
*   `Pager` exposes an observable `Flow<PagingData>` with its `.flow` property. RxJava and LiveData variants are also available as extension properties, which are callable from Java via static methods and are provided from the `paging-rxjava*` and `paging-runtime` modules respectively.

### Kotlin

```kotlin
val flow = Pager(
  // Configure how data is loaded by passing additional properties to
  // PagingConfig, such as prefetchDistance.
  PagingConfig(pageSize = 20)
) {
  ExamplePagingSource(backend, query)
}.flow
  .cachedIn(viewModelScope)
```

### Java

```java
// CoroutineScope helper provided by the lifecycle-viewmodel-ktx artifact.
CoroutineScope viewModelScope = ViewModelKt.getViewModelScope(viewModel);
Pager<Integer, User> pager = Pager<>(
  new PagingConfig(/* pageSize = */ 20),
  () -> ExamplePagingSource(backend, query));

Flowable<PagingData<User>> flowable = PagingRx.getFlowable(pager);
PagingRx.cachedIn(flowable, viewModelScope);
```

### Java

```java
// CoroutineScope helper provided by the lifecycle-viewmodel-ktx artifact.
CoroutineScope viewModelScope = ViewModelKt.getViewModelScope(viewModel);
Pager<Integer, User> pager = Pager<>(
  new PagingConfig(/* pageSize = */ 20),
  () -> ExamplePagingSource(backend, query));

PagingLiveData.cachedIn(PagingLiveData.getLiveData(pager), viewModelScope);
```

To learn more about setting up a reactive stream of `PagingData` objects using Paging 3, see Set up a stream of PagingData.

#### BoundaryCallback for layered sources

In Paging 3, `RemoteMediator` replaces `PagedList.BoundaryCallback` as a handler for paging from network and database.

To learn more about using `RemoteMediator` to page from network and database in Paging 3, see the Android Paging codelab.

### PagedListAdapter

This section describes all of the necessary changes to migrate an older Paging implementation to use the `PagingDataAdapter` or `AsyncPagingDataDiffer` classes from Paging 3.

Paging 3 provides `PagingDataAdapter` to handle the new `PagingData` reactive streams. Otherwise, `PagedListAdapter` and `PagingDataAdapter` have the same interface. To migrate from `PagedListAdapter` to `PagingDataAdapter`, change your implementation of `PagedListAdapter` to extend `PagingDataAdapter` instead.

To learn more about `PagingDataAdapter`, see Define a RecyclerView adapter.

#### AsyncPagedListDiffer

If you currently use a custom `RecyclerView.Adapter` implementation with `AsyncPagedListDiffer`, migrate your implementation to use the `AsyncPagingDataDiffer` provided in Paging 3 instead:

### Kotlin

```kotlin
AsyncPagingDataDiffer(diffCallback, listUpdateCallback)
```

### Java

```java
new AsyncPagingDataDiffer(diffCallback, listUpdateCallback);
```

### Java

```java
new AsyncPagingDataDiffer(diffCallback, listUpdateCallback);
```
