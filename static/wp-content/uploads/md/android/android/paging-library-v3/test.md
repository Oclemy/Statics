# Test your Paging implementation

Implementing the Paging library in your app should be paired with a robust testing strategy. You should test data loading components such as `PagingSource` and `RemoteMediator` to ensure that they work as expected. You should also write end-to-end tests to verify that all of the components in your Paging implementation work correctly together without unexpected side effects.

This guide explains how to test paging data sources in isolation, how to test transformations you perform on paged data, and how to write end-to-end tests for your entire Paging implementation. The examples in this guide are based on the Paging with Network Sample.

Repository layer tests
----------------------

Write unit tests for the components in your repository layer to ensure that they load the data from your data sources appropriately. Provide mock versions of dependencies to verify that the components under test function correctly in isolation. The main components that you need to test in the repository layer are the `PagingSource` and the `RemoteMediator`.

### PagingSource tests

Unit tests for your `PagingSource` classes involve setting up the `PagingSource` instance and verifying that the `load()` function returns the correct paged data based on a `LoadParams` argument. Provide mock data to the `PagingSource` constructor so that you have control over the data in your tests. You can pass in a default value for primitive data types but you need to pass in a mock version for other objects, such as a database or an API implementation. This gives you full control over the output of the mock data source when the `PagingSource` under test interacts with it.

The constructor parameters for your specific `PagingSource` implementation dictate what type of test data you need to pass. In the following example, the `PagingSource` implementation requires a `RedditApi` object as well as a `String` for the subreddit name. You can pass a default value for the `String` parameter, but for the `RedditApi` parameter you must create a mock implementation for tests.

### Kotlin

```kotlin
class ItemKeyedSubredditPagingSource(
  private val redditApi: RedditApi,
  private val subredditName: String
) : PagingSource<String, RedditPost>() {
  ...
}
```

### Java

```java
public class ItemKeyedSubredditPagingSource
  extends RxPagingSource<String, RedditPost> {

  @NonNull
  private RedditApi redditApi;
  @NonNull
  private String subredditName;

  ItemKeyedSubredditPagingSource(
    @NotNull RedditApi redditApi,
    @NotNull String subredditName
  ) {
    this.redditApi = redditApi;
    this.subredditName = subredditName;
    ...
  }
}
```

### Java

```java
public class ItemKeyedSubredditPagingSource
  extends ListenableFuturePagingSource<String, RedditPost> {

  @NonNull
  private RedditApi redditApi;
  @NonNull
  private String subredditName;
  @NonNull
  private Executor bgExecutor;

  public ItemKeyedSubredditPagingSource(
    @NotNull RedditApi redditApi,
    @NotNull String subredditName,
    @NonNull Executor bgExecutor
  ) {
    this.redditApi = redditApi;
    this.subredditName = subredditName;
    this.bgExecutor = bgExecutor;
    ...
  }
}
```

In this example, the `RedditApi` parameter is a Retrofit interface that defines the server requests as well as the response classes. A mock version can implement the interface, override any required functions, and provide convenience methods to configure how the mock object should react in tests.

After the mock objects are in place, set up the dependencies and initialize the `PagingSource` object in the test. The following example demonstrates initializing the `MockRedditApi` object with a list of test posts:

### Kotlin

```kotlin
@OptIn(ExperimentalCoroutinesApi::class)
class SubredditPagingSourceTest {
  private val postFactory = PostFactory()
  private val mockPosts = listOf(
    postFactory.createRedditPost(DEFAULT_SUBREDDIT),
    postFactory.createRedditPost(DEFAULT_SUBREDDIT),
    postFactory.createRedditPost(DEFAULT_SUBREDDIT)
  )
  private val mockApi = MockRedditApi().apply {
    mockPosts.forEach { post -> addPost(post) }
  }

  @Test
  fun loadReturnsPageWhenOnSuccessfulLoadOfItemKeyedData() = runTest {
    val pagingSource = ItemKeyedSubredditPagingSource(mockApi, DEFAULT_SUBREDDIT)
  }
}
```

### Java

```java
public class SubredditPagingSourceTest {
  static PostFactory postFactory = new PostFactory();
  static List<RedditPost> mockPosts = new ArrayList<>();
  static MockRedditApi mockApi = new MockRedditApi();

  static {
    for (int i=0; i<3; i++) {
      RedditPost post = postFactory.createRedditPost(DEFAULT_SUBREDDIT);
      mockPosts.add(post);
      mockApi.addPost(post);
    }
  }

  @After
  public void tearDown() {
    // Clear the failure message after each test run.
    mockApi.setFailureMsg(null);
  }

  @Test
  public void loadReturnsPageWhenOnSuccessfulLoadOfItemKeyedData()
    throws InterruptedException {

    ItemKeyedSubredditPagingSource pagingSource =
      new ItemKeyedSubredditPagingSource(mockApi, DEFAULT_SUBREDDIT);
  }
}
```

### Java

```java
public class SubredditPagingSourceTest {
  static PostFactory postFactory = new PostFactory();
  static List<RedditPost> mockPosts = new ArrayList<>();
  static MockRedditApi mockApi = new MockRedditApi();

  static {
    for (int i=0; i<3; i++) {
      RedditPost post = postFactory.createRedditPost(DEFAULT_SUBREDDIT);
      mockPosts.add(post);
      mockApi.addPost(post);
    }
  }

  @After
  public void tearDown() {
    // Clear the failure message after each test run.
    mockApi.setFailureMsg(null);
  }

  @Test
  public void loadReturnsPageWhenOnSuccessfulLoadOfItemKeyedData()
    throws ExecutionException, InterruptedException {

    ItemKeyedSubredditPagingSource pagingSource =
      new ItemKeyedSubredditPagingSource(
        mockApi,
        DEFAULT_SUBREDDIT,
        new CurrentThreadExecutor()
      );

  }
}
```

The next step is to test the `PagingSource` object. The `load()` method is the main focus of the tests. The following example demonstrates an assertion verifying that the `load()` method returns the correct data, previous key, and next key for a given `LoadParams` parameter:

### Kotlin

```kotlin
@Test
// Since load is a suspend function, runTest is used to ensure that it
// runs on the test thread.
fun loadReturnsPageWhenOnSuccessfulLoadOfItemKeyedData() = runTest {
  val pagingSource = ItemKeyedSubredditPagingSource(mockApi, DEFAULT_SUBREDDIT)
  assertEquals(
    expected = Page(
      data = listOf(mockPosts[0], mockPosts[1]),
      prevKey = mockPosts[0].name,
      nextKey = mockPosts[1].name
    ),
    actual = pagingSource.load(
      Refresh(
        key = null,
        loadSize = 2,
        placeholdersEnabled = false
      )
    ),
  )
}
```

### Java

```java
@Test
public void loadReturnsPageWhenOnSuccessfulLoadOfItemKeyedData()
  throws InterruptedException {

  ItemKeyedSubredditPagingSource pagingSource =
    new ItemKeyedSubredditPagingSource(mockApi, DEFAULT_SUBREDDIT);

  LoadParams.Refresh<String> refreshRequest =
    new LoadParams.Refresh<>(null, 2, false);

  pagingSource.loadSingle(refreshRequest)
    .test()
    .await()
    .assertValueCount(1)
    .assertValue(new LoadResult.Page<>(
      mockPosts.subList(0, 2),
      mockPosts.get(0).getName(),
      mockPosts.get(1).getName()
    ));
}
```

### Java

```java
@Test
public void loadReturnsPageWhenOnSuccessfulLoadOfItemKeyedData()
  throws ExecutionException, InterruptedException {

  ItemKeyedSubredditPagingSource pagingSource = new ItemKeyedSubredditPagingSource(
    mockApi,
    DEFAULT_SUBREDDIT,
    new CurrentThreadExecutor()
  );

  PagingSource.LoadParams.Refresh<String> refreshRequest =
    new PagingSource.LoadParams.Refresh<>(null, 2, false);

  PagingSource.LoadResult<String, RedditPost> result =
    pagingSource.loadFuture(refreshRequest).get();

  PagingSource.LoadResult<String, RedditPost> expected =
    new PagingSource.LoadResult.Page<>(
      mockPosts.subList(0, 2),
      mockPosts.get(0).getName(),
      mockPosts.get(1).getName()
    );

  assertThat(result, equalTo(expected));
}
```

The previous example demonstrates testing a `PagingSource` that uses item-keyed paging. If the data source that you are using is page-keyed instead, then the `PagingSource` tests will be different. The main difference is the previous and next keys that are expected from the `load()` method.

### Kotlin

```kotlin
@Test
fun loadReturnsPageWhenOnSuccessfulLoadOfPageKeyedData() = runTest {
  val pagingSource = PageKeyedSubredditPagingSource(mockApi, DEFAULT_SUBREDDIT)
  assertEquals(
    expected = Page(
      data = listOf(mockPosts[0], mockPosts[1]),
      prevKey = null,
      nextKey = mockPosts[1].id
    ),
    actual = pagingSource.load(
      Refresh(
        key = null,
        loadSize = 2,
        placeholdersEnabled = false
      )
    ),
  )
}
```

### Java

```java
@Test
public void loadReturnsPageWhenOnSuccessfulLoadOfPageKeyedData()
  throws InterruptedException {

  PageKeyedSubredditPagingSource pagingSource =
    new PageKeyedSubredditPagingSource(mockApi, DEFAULT_SUBREDDIT);

  LoadParams.Refresh<String> refreshRequest =
    new LoadParams.Refresh<>(null, 2, false);

  pagingSource.loadSingle(refreshRequest)
    .test()
    .await()
    .assertValueCount(1)
    .assertValue(new LoadResult.Page<>(
      mockPosts.subList(0, 2),
      null,
      mockPosts.get(1).getId()
    ));
}
```

### Java

```java
@Test
public void loadReturnsPageWhenOnSuccessfulLoadOfPageKeyedData()
  throws InterruptedException, ExecutionException {

  PageKeyedSubredditPagingSource pagingSource =
    new PageKeyedSubredditPagingSource(
      mockApi,
      DEFAULT_SUBREDDIT,
      new CurrentThreadExecutor()
    );

  PagingSource.LoadParams.Refresh<String> refreshRequest =
    new PagingSource.LoadParams.Refresh<>(null, 2, false);

  PagingSource.LoadResult<String, RedditPost> result =
    pagingSource.loadFuture(refreshRequest).get();

  PagingSource.LoadResult<String, RedditPost> expected =
    new PagingSource.LoadResult.Page<>(
      mockPosts.subList(0, 2),
      null,
      mockPosts.get(1).getId()
    );

  assertThat(result, equalTo(expected));
}
```

### RemoteMediator tests

The goal of the `RemoteMediator` unit tests is to verify that the `load()` function returns the correct `MediatorResult`. Tests for side effects, such as data being inserted into the database, are better suited for integration tests.

The first step is to determine what dependencies your `RemoteMediator` implementation needs. The following example demonstrates a `RemoteMediator` implementation that requires a Room database, a Retrofit interface, and a search string:

### Kotlin

```kotlin
@OptIn(ExperimentalPagingApi::class)
class PageKeyedRemoteMediator(
  private val db: RedditDb,
  private val redditApi: RedditApi,
  private val subredditName: String
) : RemoteMediator<Int, RedditPost>() {
  ...
}
```

### Java

```java
public class PageKeyedRemoteMediator
  extends RxRemoteMediator<Integer, RedditPost> {

  @NonNull
  private RedditDb db;
  @NonNull
  private RedditPostDao postDao;
  @NonNull
  private SubredditRemoteKeyDao remoteKeyDao;
  @NonNull
  private RedditApi redditApi;
  @NonNull
  private String subredditName;

  public PageKeyedRemoteMediator(
    @NonNull RedditDb db,
    @NonNull RedditApi redditApi,
    @NonNull String subredditName
  ) {
      this.db = db;
      this.postDao = db.posts();
      this.remoteKeyDao = db.remoteKeys();
      this.redditApi = redditApi;
      this.subredditName = subredditName;
      ...
  }
}
```

### Java

```java
public class PageKeyedRemoteMediator
  extends ListenableFutureRemoteMediator<Integer, RedditPost> {

  @NonNull
  private RedditDb db;
  @NonNull
  private RedditPostDao postDao;
  @NonNull
  private SubredditRemoteKeyDao remoteKeyDao;
  @NonNull
  private RedditApi redditApi;
  @NonNull
  private String subredditName;
  @NonNull
  private Executor bgExecutor;

  public PageKeyedRemoteMediator(
    @NonNull RedditDb db,
    @NonNull RedditApi redditApi,
    @NonNull String subredditName,
    @NonNull Executor bgExecutor
  ) {
    this.db = db;
    this.postDao = db.posts();
    this.remoteKeyDao = db.remoteKeys();
    this.redditApi = redditApi;
    this.subredditName = subredditName;
    this.bgExecutor = bgExecutor;
    ...
  }
}
```

You can provide the Retrofit interface and the search string as demonstrated in the PagingSource tests section. Providing a mock version of the Room database is very involved, so it can be easier to provide an in-memory implementation of the database instead of a full mock version. Because creating a Room database requires a `Context` object, you must place this `RemoteMediator` test in the `androidTest` directory and execute it with the AndroidJUnit4 test runner so that it has access to a test application context. For more information about instrumented tests, see Build instrumented unit tests.

Define tear-down functions to ensure that state does not leak between test functions. This ensures consistent results between test runs.

### Kotlin

```kotlin
@ExperimentalPagingApi
@OptIn(ExperimentalCoroutinesApi::class)
@RunWith(AndroidJUnit4::class)
class PageKeyedRemoteMediatorTest {
  private val postFactory = PostFactory()
  private val mockPosts = listOf(
    postFactory.createRedditPost(SubRedditViewModel.DEFAULT_SUBREDDIT),
    postFactory.createRedditPost(SubRedditViewModel.DEFAULT_SUBREDDIT),
    postFactory.createRedditPost(SubRedditViewModel.DEFAULT_SUBREDDIT)
  )
  private val mockApi = mockRedditApi()

  private val mockDb = RedditDb.create(
    ApplicationProvider.getApplicationContext(),
    useInMemory = true
  )

  @After
  fun tearDown() {
    mockDb.clearAllTables()
    // Clear out failure message to default to the successful response.
    mockApi.failureMsg = null
    // Clear out posts after each test run.
    mockApi.clearPosts()
  }
}
```

### Java

```java
@RunWith(AndroidJUnit4.class)
public class PageKeyedRemoteMediatorTest {
  static PostFactory postFactory = new PostFactory();
  static List<RedditPost> mockPosts = new ArrayList<>();
  static MockRedditApi mockApi = new MockRedditApi();
  private RedditDb mockDb = RedditDb.Companion.create(
    ApplicationProvider.getApplicationContext(),
    true
  );

  static {
    for (int i=0; i<3; i++) {
      RedditPost post = postFactory.createRedditPost(DEFAULT_SUBREDDIT);
      mockPosts.add(post);
    }
  }

  @After
  public void tearDown() {
    mockDb.clearAllTables();
    // Clear the failure message after each test run.
    mockApi.setFailureMsg(null);
    // Clear out posts after each test run.
    mockApi.clearPosts();
  }
}
```

### Java

```java
@RunWith(AndroidJUnit4.class)
public class PageKeyedRemoteMediatorTest {
  static PostFactory postFactory = new PostFactory();
  static List<RedditPost> mockPosts = new ArrayList<>();
  static MockRedditApi mockApi = new MockRedditApi();

  private RedditDb mockDb = RedditDb.Companion.create(
    ApplicationProvider.getApplicationContext(),
    true
  );

  static {
    for (int i=0; i<3; i++) {
      RedditPost post = postFactory.createRedditPost(DEFAULT_SUBREDDIT);
      mockPosts.add(post);
    }
  }

  @After
  public void tearDown() {
    mockDb.clearAllTables();
    // Clear the failure message after each test run.
    mockApi.setFailureMsg(null);
    // Clear out posts after each test run.
    mockApi.clearPosts();
  }
}
```

The next step is to test the `load()` function. In this example, there are three cases to test:

*   The first case is when `mockApi` returns valid data. The `load()` function should return `MediatorResult.Success`, and the `endOfPaginationReached` property should be `false`.
*   The second case is when `mockApi` returns a successful response, but the returned data is empty. The `load()` function should return `MediatorResult.Success`, and the `endOfPaginationReached` property should be `true`.
*   The third case is when `mockApi` throws an exception when fetching the data. The `load()` function should return `MediatorResult.Error`.

Follow these steps to test the first case:

1.  Set up the `mockApi` with the post data to return.
2.  Initialize the `RemoteMediator` object.
3.  Test the `load()` function.

### Kotlin

```kotlin
@Test
fun refreshLoadReturnsSuccessResultWhenMoreDataIsPresent() = runTest {
  // Add mock results for the API to return.
  mockPosts.forEach { post -> mockApi.addPost(post) }
  val remoteMediator = PageKeyedRemoteMediator(
    mockDb,
    mockApi,
    SubRedditViewModel.DEFAULT_SUBREDDIT
  )
  val pagingState = PagingState<Int, RedditPost>(
    listOf(),
    null,
    PagingConfig(10),
    10
  )
  val result = remoteMediator.load(LoadType.REFRESH, pagingState)
  assertTrue { result is MediatorResult.Success }
  assertFalse { (result as MediatorResult.Success).endOfPaginationReached }
}
```

### Java

```java
@Test
public void refreshLoadReturnsSuccessResultWhenMoreDataIsPresent()
  throws InterruptedException {

  // Add mock results for the API to return.
  for (RedditPost post: mockPosts) {
    mockApi.addPost(post);
  }

  PageKeyedRemoteMediator remoteMediator = new PageKeyedRemoteMediator(
    mockDb,
    mockApi,
    SubRedditViewModel.DEFAULT_SUBREDDIT
  );
  PagingState<Integer, RedditPost> pagingState = new PagingState<>(
    new ArrayList(),
    null,
    new PagingConfig(10),
    10
  );
  remoteMediator.loadSingle(LoadType.REFRESH, pagingState)
    .test()
    .await()
    .assertValueCount(1)
    .assertValue(value -> value instanceof RemoteMediator.MediatorResult.Success &&
      ((RemoteMediator.MediatorResult.Success) value).endOfPaginationReached() == false);
}
```

### Java

```java
@Test
public void refreshLoadReturnsSuccessResultWhenMoreDataIsPresent()
  throws InterruptedException, ExecutionException {

  // Add mock results for the API to return.
  for (RedditPost post: mockPosts) {
    mockApi.addPost(post);
  }

  PageKeyedRemoteMediator remoteMediator = new PageKeyedRemoteMediator(
    mockDb,
    mockApi,
    SubRedditViewModel.DEFAULT_SUBREDDIT,
    new CurrentThreadExecutor()
  );
  PagingState<Integer, RedditPost> pagingState = new PagingState<>(
    new ArrayList(),
    null,
    new PagingConfig(10),
    10
  );

  RemoteMediator.MediatorResult result =
    remoteMediator.loadFuture(LoadType.REFRESH, pagingState).get();

  assertThat(result, instanceOf(RemoteMediator.MediatorResult.Success.class));
  assertFalse(((RemoteMediator.MediatorResult.Success) result).endOfPaginationReached());
}
```

The second test requires the `mockApi` to return an empty result. Because you clear the data from the `mockApi` after each test run, it will return an empty result by default.

### Kotlin

```kotlin
@Test
fun refreshLoadSuccessAndEndOfPaginationWhenNoMoreData() = runTest {
  // To test endOfPaginationReached, don't set up the mockApi to return post
  // data here.
  val remoteMediator = PageKeyedRemoteMediator(
    mockDb,
    mockApi,
    SubRedditViewModel.DEFAULT_SUBREDDIT
  )
  val pagingState = PagingState<Int, RedditPost>(
    listOf(),
    null,
    PagingConfig(10),
    10
  )
  val result = remoteMediator.load(LoadType.REFRESH, pagingState)
  assertTrue { result is MediatorResult.Success }
  assertTrue { (result as MediatorResult.Success).endOfPaginationReached }
}
```

### Java

```java
@Test
public void refreshLoadSuccessAndEndOfPaginationWhenNoMoreData()
  throws InterruptedException() {

  // To test endOfPaginationReached, don't set up the mockApi to return post
  // data here.
  PageKeyedRemoteMediator remoteMediator = new PageKeyedRemoteMediator(
    mockDb,
    mockApi,
    SubRedditViewModel.DEFAULT_SUBREDDIT
  );
  PagingState<Integer, RedditPost> pagingState = new PagingState<>(
    new ArrayList(),
    null,
    new PagingConfig(10),
    10
  );
  remoteMediator.loadSingle(LoadType.REFRESH, pagingState)
    .test()
    .await()
    .assertValueCount(1)
    .assertValue(value -> value instanceof RemoteMediator.MediatorResult.Success &&
      ((RemoteMediator.MediatorResult.Success) value).endOfPaginationReached() == true);
}
```

### Java

```java
@Test
public void refreshLoadSuccessAndEndOfPaginationWhenNoMoreData()
  throws InterruptedException, ExecutionException {

  // To test endOfPaginationReached, don't set up the mockApi to return post
  // data here.
  PageKeyedRemoteMediator remoteMediator = new PageKeyedRemoteMediator(
    mockDb,
    mockApi,
    SubRedditViewModel.DEFAULT_SUBREDDIT,
    new CurrentThreadExecutor()
  );
  PagingState<Integer, RedditPost> pagingState = new PagingState<>(
    new ArrayList(),
    null,
    new PagingConfig(10),
    10
  );

  RemoteMediator.MediatorResult result =
    remoteMediator.loadFuture(LoadType.REFRESH, pagingState).get();

  assertThat(result, instanceOf(RemoteMediator.MediatorResult.Success.class));
  assertTrue(((RemoteMediator.MediatorResult.Success) result).endOfPaginationReached());
}
```

The final test requires the `mockApi` to throw an exception so that the test can verify that the `load()` function correctly returns `MediatorResult.Error`.

### Kotlin

```kotlin
@Test
fun refreshLoadReturnsErrorResultWhenErrorOccurs() = runTest {
  // Set up failure message to throw exception from the mock API.
  mockApi.failureMsg = "Throw test failure"
  val remoteMediator = PageKeyedRemoteMediator(
    mockDb,
    mockApi,
    SubRedditViewModel.DEFAULT_SUBREDDIT
  )
  val pagingState = PagingState<Int, RedditPost>(
    listOf(),
    null,
    PagingConfig(10),
    10
  )
  val result = remoteMediator.load(LoadType.REFRESH, pagingState)
  assertTrue {result is MediatorResult.Error }
}
```

### Java

```java
@Test
public void refreshLoadReturnsErrorResultWhenErrorOccurs()
  throws InterruptedException {

  // Set up failure message to throw exception from the mock API.
  mockApi.setFailureMsg("Throw test failure");
  PageKeyedRemoteMediator remoteMediator = new PageKeyedRemoteMediator(
    mockDb,
    mockApi,
    SubRedditViewModel.DEFAULT_SUBREDDIT
  );
  PagingState<Integer, RedditPost> pagingState = new PagingState<>(
    new ArrayList(),
    null,
    new PagingConfig(10),
    10
  );
  remoteMediator.loadSingle(LoadType.REFRESH, pagingState)
    .test()
    .await()
    .assertValueCount(1)
    .assertValue(value -> value instanceof RemoteMediator.MediatorResult.Error);
}
```

### Java

```java
@Test
public void refreshLoadReturnsErrorResultWhenErrorOccurs()
  throws InterruptedException, ExecutionException {

  // Set up failure message to throw exception from the mock API.
  mockApi.setFailureMsg("Throw test failure");
  PageKeyedRemoteMediator remoteMediator = new PageKeyedRemoteMediator(
    mockDb,
    mockApi,
    SubRedditViewModel.DEFAULT_SUBREDDIT,
    new CurrentThreadExecutor()
  );
  PagingState<Integer, RedditPost> pagingState = new PagingState<>(
    new ArrayList(),
    null,
    new PagingConfig(10),
    10
  );
  RemoteMediator.MediatorResult result =
    remoteMediator.loadFuture(LoadType.REFRESH, pagingState).get();

  assertThat(result, instanceOf(RemoteMediator.MediatorResult.Error.class));
}
```

Transformation tests
--------------------

You should also write unit tests to cover any transformations that you apply to the `PagingData` stream. If your Paging implementation performs any data mapping or filtering, you should test these transformations to ensure that they function as expected. You need to use `AsyncPagingDataDiffer` in these tests because you can't directly access the output of the `PagingData` stream.

The following example demonstrates a couple of basic transformations that are applied to a `PagingData` object for the purposes of testing:

### Kotlin

```kotlin
fun PagingData<Int>.myHelperTransformFunction(): PagingData<Int> {
  return this.map { item ->
    item * item
  }.filter { item ->
    item % 2 == 0
  }
}
```

### Java

```java
public PagingData<Integer> myHelperTransformFunction(PagingData<Integer> pagingData) {
  PagingData<Integer> mappedData = PagingDataTransforms.map(
    pagingData,
    new CurrentThreadExecutor(),
    ((item) -> item * item)
  );
  return PagingDataTransforms.filter(
    mappedData,
    new CurrentThreadExecutor(),
    ((item) -> item % 2 == 0)
  );
}
```

### Java

```java
public PagingData<Integer> myHelperTransformFunction(PagingData<Integer> pagingData) {
  PagingData<Integer> mappedData = PagingDataTransforms.map(
    pagingData,
    new CurrentThreadExecutor(),
    ((item) -> item * item)
  );
  return PagingDataTransforms.filter(
    mappedData,
    new CurrentThreadExecutor(),
    ((item) -> item % 2 == 0)
  );
}
```

The `AsyncPagingDataDiffer` object requires several parameters, but most of them can be empty implementations for the purposes of testing. Two of these parameters are a `DiffUtil.ItemCallback` and a `ListUpdateCallback` implementation:

### Kotlin

```kotlin
class NoopListCallback : ListUpdateCallback {
  override fun onChanged(position: Int, count: Int, payload: Any?) {}
  override fun onMoved(fromPosition: Int, toPosition: Int) {}
  override fun onInserted(position: Int, count: Int) {}
  override fun onRemoved(position: Int, count: Int) {}
}

class MyDiffCallback : DiffUtil.ItemCallback<Int>() {
  override fun areItemsTheSame(oldItem: Int, newItem: Int): Boolean {
    return oldItem == newItem
  }

  override fun areContentsTheSame(oldItem: Int, newItem: Int): Boolean {
    return oldItem == newItem
  }
}
```

### Java

```java
class NoopListCallback implements ListUpdateCallback {
  @Override
  public void onInserted(int position, int count) {}

  @Override
  public void onRemoved(int position, int count) {}

  @Override
  public void onMoved(int fromPosition, int toPosition) {}

  @Override
  public void onChanged(
    int position,
    int count,
    @Nullable Object payload
  ) { }
}

class MyDiffCallback extends DiffUtil.ItemCallback<Integer> {
  @Override
  public boolean areItemsTheSame(
    @NonNull Integer oldItem,
    @NonNull Integer newItem
  ) {
    return oldItem.equals(newItem);
  }

  @Override
  public boolean areContentsTheSame(
    @NonNull Integer oldItem,
    @NonNull Integer newItem
  ) {
    return oldItem.equals(newItem);
  }
}
```

### Java

```java
class NoopListCallback implements ListUpdateCallback {
  @Override
  public void onInserted(int position, int count) {}

  @Override
  public void onRemoved(int position, int count) {}

  @Override
  public void onMoved(int fromPosition, int toPosition) {}

  @Override
  public void onChanged(
    int position,
    int count,
    @Nullable Object payload
  ) { }
}

class MyDiffCallback extends DiffUtil.ItemCallback<Integer> {
  @Override
  public boolean areItemsTheSame(
    @NonNull Integer oldItem,
    @NonNull Integer newItem
  ) {
    return oldItem.equals(newItem);
  }

  @Override
  public boolean areContentsTheSame(
    @NonNull Integer oldItem,
    @NonNull Integer newItem
  ) {
    return oldItem.equals(newItem);
  }
}
```

With these dependencies in place, you can write the transformation tests. The tests should perform the following steps:

1.  Initialize the `PagingData` with test data.
2.  Run the transformations on the `PagingData`.
3.  Pass the transformed data to the differ.
4.  After the differ parses the data, access a snapshot of the differ output and verify that the data is correct.

The following example demonstrates this process:

### Kotlin

```kotlin
@ExperimentalCoroutinesApi
class PagingDataTransformTest {
  private val testScope = TestScope()
  private val testDispatcher = StandardTestDispatcher(testScope.testScheduler)

  @Before
  fun setUp() {
    Dispatchers.setMain(testDispatcher)
  }

  @After
  fun tearDown() {
    Dispatchers.resetMain()
  }

  @Test
  fun differTransformsData() = testScope.runTest {
    val data = PagingData.from(listOf(1, 2, 3, 4)).myHelperTransformFunction()
    val differ = AsyncPagingDataDiffer(
      diffCallback = MyDiffCallback(),
      updateCallback = NoopListCallback(),
      workerDispatcher = Dispatchers.Main
    )

    // You don't need to use lifecycleScope.launch() if you're using
    // PagingData.from()
    differ.submitData(data)

    // Wait for transforms and the differ to process all updates.
    advanceUntilIdle()
    assertEquals(listOf(4, 16), differ.snapshot().items)
  }
}
```

### Java

```java
List<Integer> data = Arrays.asList(1, 2, 3, 4);
PagingData<Integer> pagingData = PagingData.from(data);
PagingData<Integer> transformedData = myHelperTransformFunction(pagingData);

Executor executor = new CurrentThreadExecutor();
CoroutineDispatcher dispatcher = ExecutorsKt.from(executor);

AsyncPagingDataDiffer<Integer> differ = new AsyncPagingDataDiffer<Integer>(
  new MyDiffCallback(),
  new NoopListCallback(),
  dispatcher,
  dispatcher
);

TestLifecycleOwner lifecycleOwner =
    new TestLifecycleOwner(Lifecycle.State.RESUMED, dispatcher);

differ.submitData(lifecycleOwner.getLifecycle(), transformedData);

// Wait for submitData() to present some data.
while (differ.getItemCount() == 0) {
  Thread.sleep(100);
}

assertEquals(Arrays.asList(4, 16), differ.snapshot().getItems());
```

### Java

```java
List<Integer> data = Arrays.asList(1, 2, 3, 4);
PagingData<Integer> pagingData = PagingData.from(data);
PagingData<Integer> transformedData = myHelperTransformFunction(pagingData);

Executor executor = new CurrentThreadExecutor();
CoroutineDispatcher dispatcher = ExecutorsKt.from(executor);

AsyncPagingDataDiffer<Integer> differ = new AsyncPagingDataDiffer<Integer>(
  new MyDiffCallback(),
  new NoopListCallback(),
  dispatcher,
  dispatcher
);

TestLifecycleOwner lifecycleOwner =
    new TestLifecycleOwner(Lifecycle.State.RESUMED, dispatcher);

differ.submitData(lifecycleOwner.getLifecycle(), transformedData);

// Wait for submitData() to present some data.
while (differ.getItemCount() == 0) {
  Thread.sleep(100);
}

assertEquals(Arrays.asList(4, 16), differ.snapshot().getItems());
```

End-to-end tests
----------------

Unit tests provide assurance that individual Paging components work in isolation, but end-to-end tests provide more confidence that the application works as a whole. These tests will still need some mock dependencies, but generally they will cover most of your app code.

The example in this section uses a mock API dependency to avoid using the network in tests. The mock API is configured to return a consistent set of test data, resulting in repeatable tests. Decide which dependencies to swap out for mock implementations based on what each dependency does, how consistent its output is, and how much fidelity you need from your tests.

Write your code in a way that allows you to easily swap in mock versions of your dependencies. The following example uses a basic service locator implementation to provide and change dependencies as needed. In larger apps, using a dependency injection library like Hilt can help manage more-complex dependency graphs.

### Kotlin

```kotlin
class RedditActivityTest {

  companion object {
    private const val TEST_SUBREDDIT = "test"
  }

  private val postFactory = PostFactory()
  private val mockApi = MockRedditApi().apply {
    addPost(postFactory.createRedditPost(DEFAULT_SUBREDDIT))
    addPost(postFactory.createRedditPost(TEST_SUBREDDIT))
    addPost(postFactory.createRedditPost(TEST_SUBREDDIT))
  }

  @Before
  fun init() {
    val app = ApplicationProvider.getApplicationContext<Application>()
    // Use a controlled service locator with a mock API.
    ServiceLocator.swap(
      object : DefaultServiceLocator(app = app, useInMemoryDb = true) {
        override fun getRedditApi(): RedditApi = mockApi
      }
    )
  }
}
```

### Java

```java
public class RedditActivityTest {

  public static final String TEST_SUBREDDIT = "test";

  private static PostFactory postFactory = new PostFactory();
  private static MockRedditApi mockApi = new MockRedditApi();

  static {
    mockApi.addPost(postFactory.createRedditPost(DEFAULT_SUBREDDIT));
    mockApi.addPost(postFactory.createRedditPost(TEST_SUBREDDIT));
    mockApi.addPost(postFactory.createRedditPost(TEST_SUBREDDIT));
  }

  @Before
  public void setup() {
    Application app = ApplicationProvider.getApplicationContext();
    // Use a controlled service locator with a mock API.
    ServiceLocator.Companion.swap(
      new DefaultServiceLocator(app, true) {
        @NotNull
        @Override
        public RedditApi getRedditApi() {
          return mockApi;
        }
      }
    );
  }
}
```

### Java

```java
public class RedditActivityTest {

  public static final String TEST_SUBREDDIT = "test";

  private static PostFactory postFactory = new PostFactory();
  private static MockRedditApi mockApi = new MockRedditApi();

  static {
    mockApi.addPost(postFactory.createRedditPost(DEFAULT_SUBREDDIT));
    mockApi.addPost(postFactory.createRedditPost(TEST_SUBREDDIT));
    mockApi.addPost(postFactory.createRedditPost(TEST_SUBREDDIT));
  }

  @Before
  public void setup() {
    Application app = ApplicationProvider.getApplicationContext();
    // Use a controlled service locator with a mock API.
    ServiceLocator.Companion.swap(
      new DefaultServiceLocator(app, true) {
        @NotNull
        @Override
        public RedditApi getRedditApi() {
          return mockApi;
        }
      }
    );
  }
}
```

After you set up the test structure, the next step is to verify that the data returned by the `Pager` implementation is correct. One test should ensure that the `Pager` object loads the default data when the page first loads, and another test should verify that the `Pager` object correctly loads additional data based on user input. In the following example, the test verifies that the `Pager` object updates the `RecyclerView.Adapter` with the correct number of items returned from the API when the user enters a different subreddit to search.

### Kotlin

```kotlin
@Test
fun loadsTheDefaultResults() {
    ActivityScenario.launch(RedditActivity::class.java)

    onView(withId(R.id.list)).check { view, noViewFoundException ->
        if (noViewFoundException != null) {
            throw noViewFoundException
        }

        val recyclerView = view as RecyclerView
        assertEquals(1, recyclerView.adapter?.itemCount)
    }
}

@Test
// Verify that the default data is swapped out when the user searches for a
// different subreddit.
fun loadsTheTestResultsWhenSearchingForSubreddit() {
  ActivityScenario.launch(RedditActivity::class.java )

  onView(withId(R.id.list)).check { view, noViewFoundException ->
    if (noViewFoundException != null) {
      throw noViewFoundException
    }

    val recyclerView = view as RecyclerView
    // Verify that it loads the default data first.
    assertEquals(1, recyclerView.adapter?.itemCount)
  }

  // Search for test subreddit instead of default to trigger new data load.
  onView(withId(R.id.input)).perform(
    replaceText(TEST_SUBREDDIT),
    pressKey(KeyEvent.KEYCODE_ENTER)
  )

  onView(withId(R.id.list)).check { view, noViewFoundException ->
    if (noViewFoundException != null) {
      throw noViewFoundException
    }

    val recyclerView = view as RecyclerView
    assertEquals(2, recyclerView.adapter?.itemCount)
  }
}
```

### Java

```java
@Test
public void loadsTheDefaultResults() {
  ActivityScenario.launch(RedditActivity.class);

  onView(withId(R.id.list)).check((view, noViewFoundException) -> {
    if (noViewFoundException != null) {
      throw noViewFoundException;
    }

    RecyclerView recyclerView = (RecyclerView) view;
    assertEquals(1, recyclerView.getAdapter().getItemCount());
  });
}

@Test
// Verify that the default data is swapped out when the user searches for a
// different subreddit.
public void loadsTheTestResultsWhenSearchingForSubreddit() {
  ActivityScenario.launch(RedditActivity.class);

  onView(withId(R.id.list)).check((view, noViewFoundException) -> {
    if (noViewFoundException != null) {
      throw noViewFoundException;
    }

    RecyclerView recyclerView = (RecyclerView) view;
    // Verify that it loads the default data first.
    assertEquals(1, recyclerView.getAdapter().getItemCount());
  });

  // Search for test subreddit instead of default to trigger new data load.
  onView(withId(R.id.input)).perform(
    replaceText(TEST_SUBREDDIT),
    pressKey(KeyEvent.KEYCODE_ENTER)
  );

  onView(withId(R.id.list)).check((view, noViewFoundException) -> {
    if (noViewFoundException != null) {
      throw noViewFoundException;
    }

    RecyclerView recyclerView = (RecyclerView) view;
    assertEquals(2, recyclerView.getAdapter().getItemCount());
  });
}
```

### Java

```java
@Test
public void loadsTheDefaultResults() {
  ActivityScenario.launch(RedditActivity.class);

  onView(withId(R.id.list)).check((view, noViewFoundException) -> {
    if (noViewFoundException != null) {
      throw noViewFoundException;
    }

    RecyclerView recyclerView = (RecyclerView) view;
    assertEquals(1, recyclerView.getAdapter().getItemCount());
  });
}

@Test
// Verify that the default data is swapped out when the user searches for a
// different subreddit.
public void loadsTheTestResultsWhenSearchingForSubreddit() {
  ActivityScenario.launch(RedditActivity.class);

  onView(withId(R.id.list)).check((view, noViewFoundException) -> {
    if (noViewFoundException != null) {
      throw noViewFoundException;
    }

    RecyclerView recyclerView = (RecyclerView) view;
    // Verify that it loads the default data first.
    assertEquals(1, recyclerView.getAdapter().getItemCount());
  });

  // Search for test subreddit instead of default to trigger new data load.
  onView(withId(R.id.input)).perform(
    replaceText(TEST_SUBREDDIT),
    pressKey(KeyEvent.KEYCODE_ENTER)
  );

  onView(withId(R.id.list)).check((view, noViewFoundException) -> {
    if (noViewFoundException != null) {
      throw noViewFoundException;
    }

    RecyclerView recyclerView = (RecyclerView) view;
    assertEquals(2, recyclerView.getAdapter().getItemCount());
  });
}
```

Instrumented tests should verify that the data displays correctly in the UI. Do this either by verifying that the correct number of items exists in the `RecyclerView.Adapter`, or by iterating through the individual row views and verifying that the data is formatted correctly.