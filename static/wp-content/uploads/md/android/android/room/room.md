# Save data in a local database using Room

Apps that handle non-trivial amounts of structured data can benefit greatly from persisting that data locally. The most common use case is to cache relevant pieces of data so that when the device cannot access the network, the user can still browse that content while they are offline.

The Room persistence library provides an abstraction layer over SQLite to allow fluent database access while harnessing the full power of SQLite. In particular, Room provides the following benefits:

*   Compile-time verification of SQL queries.
*   Convenience annotations that minimize repetitive and error-prone boilerplate code.
*   Streamlined database migration paths.

Because of these considerations, we highly recommend that you use Room instead of using the SQLite APIs directly.

Setup
-----

To use Room in your app, add the following dependencies to your app's `build.gradle` file:

### Groovy

```groovy
dependencies {
    def room_version = "2.4.3"

    implementation "androidx.room:room-runtime:$room_version"
    annotationProcessor "androidx.room:room-compiler:$room_version"

    // To use Kotlin annotation processing tool (kapt)
    kapt "androidx.room:room-compiler:$room_version"
    // To use Kotlin Symbol Processing (KSP)
    ksp "androidx.room:room-compiler:$room_version"

    // optional - RxJava2 support for Room
    implementation "androidx.room:room-rxjava2:$room_version"

    // optional - RxJava3 support for Room
    implementation "androidx.room:room-rxjava3:$room_version"

    // optional - Guava support for Room, including Optional and ListenableFuture
    implementation "androidx.room:room-guava:$room_version"

    // optional - Test helpers
    testImplementation "androidx.room:room-testing:$room_version"

    // optional - Paging 3 Integration
    implementation "androidx.room:room-paging:2.5.0-beta01"
}
```

### Kotlin

```kotlin
dependencies {
    val room_version = "2.4.3"

    implementation("androidx.room:room-runtime:$room_version")
    annotationProcessor("androidx.room:room-compiler:$room_version")

    // To use Kotlin annotation processing tool (kapt)
    kapt("androidx.room:room-compiler:$room_version")
    // To use Kotlin Symbol Processing (KSP)
    ksp("androidx.room:room-compiler:$room_version")

    // optional - Kotlin Extensions and Coroutines support for Room
    implementation("androidx.room:room-ktx:$room_version")

    // optional - RxJava2 support for Room
    implementation("androidx.room:room-rxjava2:$room_version")

    // optional - RxJava3 support for Room
    implementation("androidx.room:room-rxjava3:$room_version")

    // optional - Guava support for Room, including Optional and ListenableFuture
    implementation("androidx.room:room-guava:$room_version")

    // optional - Test helpers
    testImplementation("androidx.room:room-testing:$room_version")

    // optional - Paging 3 Integration
    implementation("androidx.room:room-paging:2.5.0-beta01")
}
```

Primary components
------------------

There are three major components in Room:

*   The database class that holds the database and serves as the main access point for the underlying connection to your app's persisted data.
*   Data entities that represent tables in your app's database.
*   Data access objects (DAOs) that provide methods that your app can use to query, update, insert, and delete data in the database.

The database class provides your app with instances of the DAOs associated with that database. In turn, the app can use the DAOs to retrieve data from the database as instances of the associated data entity objects. The app can also use the defined data entities to update rows from the corresponding tables, or to create new rows for insertion. Figure 1 illustrates the relationship between the different components of Room.

![](https://developer.android.com/static/images/training/data-storage/room_architecture.png)

**Figure 1.** Diagram of Room library architecture.

Sample implementation
---------------------

This section presents an example implementation of a Room database with a single data entity and a single DAO.

### Data entity

The following code defines a `User` data entity. Each instance of `User` represents a row in a `user` table in the app's database.

### Kotlin

```kotlin
@Entity
data class User(
    @PrimaryKey val uid: Int,
    @ColumnInfo(name = "first_name") val firstName: String?,
    @ColumnInfo(name = "last_name") val lastName: String?
)
```

### Java

```java
@Entity
public class User {
    @PrimaryKey
    public int uid;

    @ColumnInfo(name = "first_name")
    public String firstName;

    @ColumnInfo(name = "last_name")
    public String lastName;
}
```

To learn more about data entities in Room, see Defining data using Room entities.

### Data access object (DAO)

The following code defines a DAO called `UserDao`. `UserDao` provides the methods that the rest of the app uses to interact with data in the `user` table.

### Kotlin

```kotlin
@Dao
interface UserDao {
    @Query("SELECT * FROM user")
    fun getAll(): List<User>

    @Query("SELECT * FROM user WHERE uid IN (:userIds)")
    fun loadAllByIds(userIds: IntArray): List<User>

    @Query("SELECT * FROM user WHERE first_name LIKE :first AND " +
           "last_name LIKE :last LIMIT 1")
    fun findByName(first: String, last: String): User

    @Insert
    fun insertAll(vararg users: User)

    @Delete
    fun delete(user: User)
}
```

### Java

```java
@Dao
public interface UserDao {
    @Query("SELECT * FROM user")
    List<User> getAll();

    @Query("SELECT * FROM user WHERE uid IN (:userIds)")
    List<User> loadAllByIds(int[] userIds);

    @Query("SELECT * FROM user WHERE first_name LIKE :first AND " +
           "last_name LIKE :last LIMIT 1")
    User findByName(String first, String last);

    @Insert
    void insertAll(User... users);

    @Delete
    void delete(User user);
}
```

To learn more about DAOs, see Accessing data using Room DAOs.

### Database

The following code defines an `AppDatabase` class to hold the database. `AppDatabase` defines the database configuration and serves as the app's main access point to the persisted data. The database class must satisfy the following conditions:

*   The class must be annotated with a `@Database` annotation that includes an `entities` array that lists all of the data entities associated with the database.
*   The class must be an abstract class that extends `RoomDatabase`.
*   For each DAO class that is associated with the database, the database class must define an abstract method that has zero arguments and returns an instance of the DAO class.

### Kotlin

```kotlin
@Database(entities = [User::class], version = 1)
abstract class AppDatabase : RoomDatabase() {
    abstract fun userDao(): UserDao
}
```

### Java

```java
@Database(entities = {User.class}, version = 1)
public abstract class AppDatabase extends RoomDatabase {
    public abstract UserDao userDao();
}
```

> **Note:** If your app runs in a single process, you should follow the singleton design pattern when instantiating an `AppDatabase` object. Each `RoomDatabase` instance is fairly expensive, and you rarely need access to multiple instances within a single process.

If your app runs in multiple processes, include `enableMultiInstanceInvalidation()` in your database builder invocation. That way, when you have an instance of `AppDatabase` in each process, you can invalidate the shared database file in one process, and this invalidation automatically propagates to the instances of `AppDatabase` within other processes.

### Usage

After you have defined the data entity, the DAO, and the database object, you can use the following code to create an instance of the database:

### Kotlin

```kotlin
val db = Room.databaseBuilder(
            applicationContext,
            AppDatabase::class.java, "database-name"
        ).build()
```

### Java

```java
AppDatabase db = Room.databaseBuilder(getApplicationContext(),
        AppDatabase.class, "database-name").build();
```

You can then use the abstract methods from the `AppDatabase` to get an instance of the DAO. In turn, you can use the methods from the DAO instance to interact with the database:

### Kotlin

```kotlin
val userDao = db.userDao()
val users: List<User> = userDao.getAll()
```

### Java

```java
UserDao userDao = db.userDao();
List<User> users = userDao.getAll();
```