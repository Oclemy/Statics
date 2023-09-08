# Create views into a database

Version 2.1.0 and higher of the Room persistence library provides support for SQLite database views, allowing you to encapsulate a query into a class. Room refers to these query-backed classes as _views_, and they behave the same as simple data objects when used in a DAO.

Create a view
-------------

To create a view, add the `@DatabaseView` annotation to a class. Set the annotation's value to the query that the class should represent.

The following code snippet provides an example of a view:

### Kotlin

```kotlin
@DatabaseView("SELECT user.id, user.name, user.departmentId," +
        "department.name AS departmentName FROM user " +
        "INNER JOIN department ON user.departmentId = department.id")
data class UserDetail(
    val id: Long,
    val name: String?,
    val departmentId: Long,
    val departmentName: String?
)
```

### Java

```java
@DatabaseView("SELECT user.id, user.name, user.departmentId," +
              "department.name AS departmentName FROM user " +
              "INNER JOIN department ON user.departmentId = department.id")
public class UserDetail {
    public long id;
    public String name;
    public long departmentId;
    public String departmentName;
}
```

Associate a view with your database
-----------------------------------

To include this view as part of your app's database, include the `views` property in your app's `@Database` annotation:

### Kotlin

```kotlin
@Database(entities = [User::class],
          views =[UserDetail::class], version = 1)
abstract class AppDatabase : RoomDatabase() {
    abstract fun userDao(): UserDao
}
```

### Java

```java
@Database(entities = {User.class}, views = {UserDetail.class},
          version = 1)
public abstract class AppDatabase extends RoomDatabase {
    public abstract UserDao userDao();
}
```