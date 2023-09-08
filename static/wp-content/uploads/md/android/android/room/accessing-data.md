# Accessing data using Room DAOs

When you use the Room persistence library to store your app's data, you interact with the stored data by defining _data access objects_, or DAOs. Each DAO includes methods that offer abstract access to your app's database. At compile time, Room automatically generates implementations of the DAOs that you define.

By using DAOs to access your app's database instead of query builders or direct queries, you can preserve separation of concerns, a critical architectural principle. DAOs also make it easier for you to mock database access when you test your app.

Anatomy of a DAO
----------------

You can define each DAO as either an interface or an abstract class. For basic use cases, you should usually use an interface. In either case, you must always annotate your DAOs with `@Dao`. DAOs don't have properties, but they do define one or more methods for interacting with the data in your app's database.

The following code is an example of a simple DAO that defines methods for inserting, deleting, and selecting `User` objects in a Room database:

### Kotlin

```kotlin
@Dao
interface UserDao {
    @Insert
    fun insertAll(vararg users: User)

    @Delete
    fun delete(user: User)

    @Query("SELECT * FROM user")
    fun getAll(): List<User>
}
```

### Java

```java
@Dao
public interface UserDao {
    @Insert
    void insertAll(User... users);

    @Delete
    void delete(User user);

    @Query("SELECT * FROM user")
    List<User> getAll();
}
```

There are two types of DAO methods that define database interactions:

*   Convenience methods that let you insert, update, and delete rows in your database without writing any SQL code.
*   Query methods that let you write your own SQL query to interact with the database.

The following sections demonstrate how to use both types of DAO methods to define the database interactions that your app needs.

Convenience methods
-------------------

Room provides convenience annotations for defining methods that perform simple inserts, updates, and deletes without requiring you to write a SQL statement.

If you need to define more complex inserts, updates, or deletes, or if you need to query the data in the database, use a query method instead.

### Insert

The `@Insert` annotation allows you to define methods that insert their parameters into the appropriate table in the database. The following code shows examples of valid `@Insert` methods that insert one or more `User` objects into the database:

### Kotlin

```kotlin
@Dao
interface UserDao {
    @Insert(onConflict = OnConflictStrategy.REPLACE)
    fun insertUsers(vararg users: User)

    @Insert
    fun insertBothUsers(user1: User, user2: User)

    @Insert
    fun insertUsersAndFriends(user: User, friends: List<User>)
}
```

### Java

```java
@Dao
public interface UserDao {
    @Insert(onConflict = OnConflictStrategy.REPLACE)
    public void insertUsers(User... users);

    @Insert
    public void insertBothUsers(User user1, User user2);

    @Insert
    public void insertUsersAndFriends(User user, List<User> friends);
}
```

Each parameter for an `@Insert` method must be either an instance of a Room data entity class annotated with `@Entity` or a collection of data entity class instances. When an `@Insert` method is called, Room inserts each passed entity instance into the corresponding database table.

If the `@Insert` method receives a single parameter, it can return a `long` value, which is the new `rowId` for the inserted item. If the parameter is an array or a collection, then the method should return an array or a collection of `long` values instead, with each value as the `rowId` for one of the inserted items. To learn more about returning `rowId` values, see the reference documentation for the `@Insert` annotation, as well as the SQLite documentation for rowid tables.

### Update

The `@Update` annotation allows you to define methods that update specific rows in a database table. Similarly to `@Insert` methods, `@Update` methods accept data entity instances as parameters. The following code shows an example of an `@Update` method that attempts to update one or more `User` objects in the database:

### Kotlin

```kotlin
@Dao
interface UserDao {
    @Update
    fun updateUsers(vararg users: User)
}
```

### Java

```java
@Dao
public interface UserDao {
    @Update
    public void updateUsers(User... users);
}
```

Room uses the primary key to match passed entity instances to rows in the database. If there is no row with the same primary key, Room makes no changes.

An `@Update` method can optionally return an `int` value indicating the number of rows that were updated successfully.

### Delete

The `@Delete` annotation allows you to define methods that delete specific rows from a database table. Similarly to `@Insert` methods, `@Delete` methods accept data entity instances as parameters. The following code shows an example of a `@Delete` method that attempts to delete one or more `User` objects from the database:

### Kotlin

```kotlin
@Dao
interface UserDao {
    @Delete
    fun deleteUsers(vararg users: User)
}
```

### Java

```java
@Dao
public interface UserDao {
    @Delete
    public void deleteUsers(User... users);
}
```

Room uses the primary key to match passed entity instances to rows in the database. If there is no row with the same primary key, Room makes no changes.

A `@Delete` method can optionally return an `int` value indicating the number of rows that were deleted successfully.

Query methods
-------------

The `@Query` annotation allows you to write SQL statements and expose them as DAO methods. Use these query methods to query data from your app's database, or when you need to perform more complex inserts, updates, and deletes.

Room validates SQL queries at compile time. This means that if there's a problem with your query, a compilation error occurs instead of a runtime failure.

### Simple queries

The following code defines a method that uses a simple `SELECT` query to return all of the `User` objects in the database:

### Kotlin

```kotlin
@Query("SELECT * FROM user")
fun loadAllUsers(): Array<User>
```

### Java

```java
@Query("SELECT * FROM user")
public User[] loadAllUsers();
```

The following sections demonstrate how to modify this example for typical use cases.

### Return a subset of a table's columns

Most of the time, you only need to return a subset of the columns from the table that you are querying. For example, your UI might display just the first and last name for a user instead of every detail about that user. In order to save resources and streamline your query's execution, you should only query the fields that you need.

Room allows you to return a simple object from any of your queries as long as you can map the set of result columns onto the returned object. For example, you can define the following object to hold a user's first and last name:

### Kotlin

```kotlin
data class NameTuple(
    @ColumnInfo(name = "first_name") val firstName: String?,
    @ColumnInfo(name = "last_name") val lastName: String?
)
```

### Java

```java
public class NameTuple {
    @ColumnInfo(name = "first_name")
    public String firstName;

    @ColumnInfo(name = "last_name")
    @NonNull
    public String lastName;
}
```

Then, you can return that simple object from your query method:

### Kotlin

```kotlin
@Query("SELECT first_name, last_name FROM user")
fun loadFullName(): List<NameTuple>
```

### Java

```java
@Query("SELECT first_name, last_name FROM user")
public List<NameTuple> loadFullName();
```

Room understands that the query returns values for the `first_name` and `last_name` columns and that these values can be mapped onto the fields in the `NameTuple` class. If the query returns a column that doesn't map onto a field in the returned object, Room displays a warning.

### Pass simple parameters to a query

Most of the time, your DAO methods need to accept parameters so that they can perform filtering operations. Room supports using method parameters as bind parameters in your queries.

For example, the following code defines a method that returns all of the users above a certain age:

### Kotlin

```kotlin
@Query("SELECT * FROM user WHERE age > :minAge")
fun loadAllUsersOlderThan(minAge: Int): Array<User>
```

### Java

```java
@Query("SELECT * FROM user WHERE age > :minAge")
public User[] loadAllUsersOlderThan(int minAge);
```

You can also pass multiple parameters or reference the same parameter multiple times in a query, as demonstrated in the following code:

### Kotlin

```kotlin
@Query("SELECT * FROM user WHERE age BETWEEN :minAge AND :maxAge")
fun loadAllUsersBetweenAges(minAge: Int, maxAge: Int): Array<User>

@Query("SELECT * FROM user WHERE first_name LIKE :search " +
       "OR last_name LIKE :search")
fun findUserWithName(search: String): List<User>
```

### Java

```java
@Query("SELECT * FROM user WHERE age BETWEEN :minAge AND :maxAge")
public User[] loadAllUsersBetweenAges(int minAge, int maxAge);

@Query("SELECT * FROM user WHERE first_name LIKE :search " +
       "OR last_name LIKE :search")
public List<User> findUserWithName(String search);
```

### Pass a collection of parameters to a query

Some of your DAO methods might require you to pass in a variable number of parameters that is not known until runtime. Room understands when a parameter represents a collection and automatically expands it at runtime based on the number of parameters provided.

For example, the following code defines a method that returns information about all of the users from a subset of regions:

### Kotlin

```kotlin
@Query("SELECT * FROM user WHERE region IN (:regions)")
fun loadUsersFromRegions(regions: List<String>): List<User>
```

### Java

```java
@Query("SELECT * FROM user WHERE region IN (:regions)")
public List<User> loadUsersFromRegions(List<String> regions);
```

### Query multiple tables

Some of your queries might require access to multiple tables to calculate the result. You can use `JOIN` clauses in your SQL queries to reference more than one table.

The following code defines a method that joins three tables together to return the books that are currently on loan to a specific user:

### Kotlin

```kotlin
@Query(
    "SELECT * FROM book " +
    "INNER JOIN loan ON loan.book_id = book.id " +
    "INNER JOIN user ON user.id = loan.user_id " +
    "WHERE user.name LIKE :userName"
)
fun findBooksBorrowedByNameSync(userName: String): List<Book>
```

### Java

```java
@Query("SELECT * FROM book " +
       "INNER JOIN loan ON loan.book_id = book.id " +
       "INNER JOIN user ON user.id = loan.user_id " +
       "WHERE user.name LIKE :userName")
public List<Book> findBooksBorrowedByNameSync(String userName);
```

You can also define simple objects to return a subset of columns from multiple joined tables as discussed in Return a subset of a table's columns. The following code defines a DAO with a method that returns the names of users and the names of the books that they have borrowed:

### Kotlin

```kotlin
interface UserBookDao {
    @Query(
        "SELECT user.name AS userName, book.name AS bookName " +
        "FROM user, book " +
        "WHERE user.id = book.user_id"
    )
    fun loadUserAndBookNames(): LiveData<List<UserBook>>

    // You can also define this class in a separate file.
    data class UserBook(val userName: String?, val bookName: String?)
}
```

### Java

```java
@Dao
public interface UserBookDao {
   @Query("SELECT user.name AS userName, book.name AS bookName " +
          "FROM user, book " +
          "WHERE user.id = book.user_id")
   public LiveData<List<UserBook>> loadUserAndBookNames();

   // You can also define this class in a separate file, as long as you add the
   // "public" access modifier.
   static class UserBook {
       public String userName;
       public String bookName;
   }
}
```

### Return a multimap

In Room 2.4 and higher, you can also query columns from multiple tables without defining an additional data class by writing query methods that return a multimap.

Consider the example from the Query multiple tables section. Instead of returning a list of instances of a custom data class that holds pairings of `User` and `Book` instances, you can return a mapping of `User` and `Book` directly from your query method:

### Kotlin

```kotlin
@Query(
    "SELECT * FROM user" +
    "JOIN book ON user.id = book.user_id"
)
fun loadUserAndBookNames(): Map<User, List<Book>>
```

### Java

```java
@Query(
    "SELECT * FROM user" +
    "JOIN book ON user.id = book.user_id"
)
public Map<User, List<Book>> loadUserAndBookNames();
```

When your query method returns a multimap, you can write queries that use `GROUP BY` clauses, allowing you to take advantage of SQL's capabilities for advanced calculations and filtering. For example, you can modify your `loadUserAndBookNames()` method to only return users with three or more books checked out:

### Kotlin

```kotlin
@Query(
    "SELECT * FROM user" +
    "JOIN book ON user.id = book.user_id" +
    "GROUP BY user.name WHERE COUNT(book.id) >= 3"
)
fun loadUserAndBookNames(): Map<User, List<Book>>
```

### Java

```java
@Query(
    "SELECT * FROM user" +
    "JOIN book ON user.id = book.user_id" +
    "GROUP BY user.name WHERE COUNT(book.id) >= 3"
)
public Map<User, List<Book>> loadUserAndBookNames();
```

If you don't need to map entire objects, you can also return mappings between specific columns in your query by setting the `keyColumn` and `valueColumn` attributes in a `@MapInfo` annotation on your query method:

### Kotlin

```kotlin
@MapInfo(keyColumn = "userName", valueColumn = "bookName")
@Query(
    "SELECT user.name AS username, book.name AS bookname FROM user" +
    "JOIN book ON user.id = book.user_id"
)
fun loadUserAndBookNames(): Map<String, List<String>>
```

### Java

```java
@MapInfo(keyColumn = "userName", valueColumn = "bookName")
@Query(
    "SELECT user.name AS username, book.name AS bookname FROM user" +
    "JOIN book ON user.id = book.user_id"
)
public Map<String, List<String>> loadUserAndBookNames();
```

Special return types
--------------------

Room provides some special return types for integration with other API libraries.

### Paginated queries with the Paging library

Room supports paginated queries through integration with the Paging library. In `Room 2.3.0-alpha01` and higher, DAOs can return `PagingSource` objects for use with Paging 3.

### Kotlin

```kotlin
@Dao
interface UserDao {
  @Query("SELECT * FROM users WHERE label LIKE :query")
  fun pagingSource(query: String): PagingSource<Int, User>
}
```

### Java

```java
@Dao
interface UserDao {
  @Query("SELECT * FROM users WHERE label LIKE :query")
  PagingSource<Integer, User> pagingSource(String query);
}
```

For more information about choosing type parameters for a `PagingSource`, see Select key and value types.

### Direct cursor access

If your app's logic requires direct access to the return rows, you can write your DAO methods to return a `Cursor` object as shown in the following example:

### Kotlin

```kotlin
@Dao
interface UserDao {
    @Query("SELECT * FROM user WHERE age > :minAge LIMIT 5")
    fun loadRawUsersOlderThan(minAge: Int): Cursor
}
```

### Java

```java
@Dao
public interface UserDao {
    @Query("SELECT * FROM user WHERE age > :minAge LIMIT 5")
    public Cursor loadRawUsersOlderThan(int minAge);
}
```
