# Write asynchronous DAO queries

To prevent queries from blocking the UI, Room does not allow database access on the main thread. This restriction means that you must make your DAO queries asynchronous. The Room library includes integrations with several different frameworks to provide asynchronous query execution.

DAO queries fall into three categories:

*   _One-shot write_ queries that insert, update, or delete data in the database.
*   _One-shot read_ queries that read data from your database only once and return a result with the snapshot of the database at that time.
*   _Observable read_ queries that read data from your database every time the underlying database tables change and emit new values to reflect those changes.

Language and framework options
------------------------------

Room provides integration support for interoperability with specific language features and libraries. The following table shows applicable return types based on query type and framework:

Query type

Kotlin language features

RxJava

Guava

Jetpack Lifecycle

One-shot write

Coroutines (`suspend`)

`Single<T>`, `Maybe<T>`, `Completable`

`ListenableFuture<T>`

N/A

One-shot read

Coroutines (`suspend`)

`Single<T>`, `Maybe<T>`

`ListenableFuture<T>`

N/A

Observable read

`Flow<T>`

`Flowable<T>`, `Publisher<T>`, `Observable<T>`

N/A

`LiveData<T>`

This guide demonstrates three possible ways that you can use these integrations to implement asynchronous queries in your DAOs.

### Kotlin with Flow and couroutines

Kotlin provides language features that allow you to write asynchronous queries without third-party frameworks:

*   In Room 2.2 and higher, you can use Kotlin's Flow functionality to write observable queries.
*   In Room 2.1 and higher, you can use the `suspend` keyword to make your DAO queries asynchronous using Kotlin coroutines.

### Java with RxJava

If your app uses the Java programming language, you can use specialized return types from the RxJava framework to write asynchronous DAO methods. Room provides support for the following RxJava 2 return types:

*   For one-shot queries, Room 2.1 and higher supports the `Completable`, `Single<T>`, and `Maybe<T>` return types.
*   For observable queries, Room supports the `Publisher<T>`, `Flowable<T>`, and `Observable<T>` return types.

Additionally, Room 2.3 and higher supports RxJava 3.

### Java with LiveData and Guava

If your app uses the Java programming language and you do not want to use the RxJava framework, you can use the following alternatives to write asynchronous queries:

*   You can use the `LiveData` wrapper class from Jetpack to write asynchronous observable queries.
*   You can use the `ListenableFuture<T>` wrapper from Guava to write asynchronous one-shot queries.

Write asynchronous one-shot queries
-----------------------------------

One-shot queries are database operations that only run once and grab a snapshot of data at the time of execution. Here are some examples of asynchronous one-shot queries:

### Kotlin

```kotlin
@Dao
interface UserDao {
    @Insert(onConflict = OnConflictStrategy.REPLACE)
    suspend fun insertUsers(vararg users: User)

    @Update
    suspend fun updateUsers(vararg users: User)

    @Delete
    suspend fun deleteUsers(vararg users: User)

    @Query("SELECT * FROM user WHERE id = :id")
    suspend fun loadUserById(id: Int): User

    @Query("SELECT * from user WHERE region IN (:regions)")
    suspend fun loadUsersByRegion(regions: List<String>): List<User>
}
```

### Java

```java
@Dao
public interface UserDao {
    @Insert(onConflict = OnConflictStrategy.REPLACE)
    public Completable insertUsers(List<User> users);

    @Update
    public Completable updateUsers(List<User> users);

    @Delete
    public Completable deleteUsers(List<User> users);

    @Query("SELECT * FROM user WHERE id = :id")
    public Single<User> loadUserById(int id);

    @Query("SELECT * from user WHERE region IN (:regions)")
    public Single<List<User>> loadUsersByRegion(List<String> regions);
}
```

### Java

```java
@Dao
public interface UserDao {
    // Returns the number of users inserted.
    @Insert(onConflict = OnConflictStrategy.REPLACE)
    public ListenableFuture<Integer> insertUsers(List<User> users);

    // Returns the number of users updated.
    @Update
    public ListenableFuture<Integer> updateUsers(List<User> users);

    // Returns the number of users deleted.
    @Delete
    public ListenableFuture<Integer> deleteUsers(List<User> users);

    @Query("SELECT * FROM user WHERE id = :id")
    public ListenableFuture<User> loadUserById(int id);

    @Query("SELECT * from user WHERE region IN (:regions)")
    public ListenableFuture<List<User>> loadUsersByRegion(List<String> regions);
}
```

Write observable queries
------------------------

Observable queries are read operations that emit new values whenever there are changes to any of the tables that are referenced by the query. One way you might use this is to help you keep a displayed list of items up to date as the items in the underlying database are inserted, updated, or removed. Here are some examples of observable queries:

### Kotlin

```kotlin
@Dao
interface UserDao {
    @Query("SELECT * FROM user WHERE id = :id")
    fun loadUserById(id: Int): Flow<User>

    @Query("SELECT * from user WHERE region IN (:regions)")
    fun loadUsersByRegion(regions: List<String>): Flow<List<User>>
}
```

### Java

```java
@Dao
public interface UserDao {
    @Query("SELECT * FROM user WHERE id = :id")
    public Flowable<User> loadUserById(int id);

    @Query("SELECT * from user WHERE region IN (:regions)")
    public Flowable<List<User>> loadUsersByRegion(List<String> regions);
}
```

### Java

```java
@Dao
public interface UserDao {
    @Query("SELECT * FROM user WHERE id = :id")
    public LiveData<User> loadUserById(int id);

    @Query("SELECT * from user WHERE region IN (:regions)")
    public LiveData<List<User>> loadUsersByRegion(List<String> regions);
}
```
