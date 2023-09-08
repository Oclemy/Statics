# Defining data using Room entities

When you use the Room persistence library to store your app's data, you define entities to represent the objects that you want to store. Each entity corresponds to a table in the associated Room database, and each instance of an entity represents a row of data in the corresponding table.

That means you can use Room entities to define your database schema without writing any SQL code.

Anatomy of an entity
--------------------

You define each Room entity as a class that is annotated with `@Entity`. A Room entity includes fields for each column in the corresponding table in the database, including one or more columns that comprise the primary key.

The following code is an example of a simple entity that defines a `User` table with columns for ID, first name, and last name:

### Kotlin

```kotlin
@Entity
data class User(
    @PrimaryKey val id: Int,

    val firstName: String?,
    val lastName: String?
)
```

### Java

```java
@Entity
public class User {
    @PrimaryKey
    public int id;

    public String firstName;
    public String lastName;
}
```

By default, Room uses the class name as the database table name. If you want the table to have a different name, set the `tableName` property of the `@Entity` annotation. Similarly, Room uses the field names as column names in the database by default. If you want a column to have a different name, add the `@ColumnInfo` annotation to the field and set the `name` property. The following example demonstrates custom names for tables and columns:

### Kotlin

```kotlin
@Entity(tableName = "users")
data class User (
    @PrimaryKey val id: Int,
    @ColumnInfo(name = "first_name") val firstName: String?,
    @ColumnInfo(name = "last_name") val lastName: String?
)
```

### Java

```java
@Entity(tableName = "users")
public class User {
    @PrimaryKey
    public int id;

    @ColumnInfo(name = "first_name")
    public String firstName;

    @ColumnInfo(name = "last_name")
    public String lastName;
}
```

Define a primary key
--------------------

Each Room entity must define a primary key that uniquely identifies each row in the corresponding database table. The most straightforward way of doing this is to annotate a single column with `@PrimaryKey`:

### Kotlin

```kotlin
@PrimaryKey val id: Int
```

### Java

```java
@PrimaryKey
public int id;
```

### Define a composite primary key

If you need instances of an entity to be uniquely identified by a combination of multiple columns, you can define a _composite primary key_ by listing those columns in the `primaryKeys` property of `@Entity`:

### Kotlin

```kotlin
@Entity(primaryKeys = ["firstName", "lastName"])
data class User(
    val firstName: String?,
    val lastName: String?
)
```

### Java

```java
@Entity(primaryKeys = {"firstName", "lastName"})
public class User {
    public String firstName;
    public String lastName;
}
```

Ignore fields
-------------

By default, Room creates a column for each field that's defined in the entity. If an entity has fields that you don't want to persist, you can annotate them using `@Ignore`, as shown in the following code snippet:

### Kotlin

```kotlin
@Entity
data class User(
    @PrimaryKey val id: Int,
    val firstName: String?,
    val lastName: String?,
    @Ignore val picture: Bitmap?
)
```

### Java

```java
@Entity
public class User {
    @PrimaryKey
    public int id;

    public String firstName;
    public String lastName;

    @Ignore
    Bitmap picture;
}
```


In cases where an entity inherits fields from a parent entity, it's usually easier to use the `ignoredColumns` property of the `@Entity` attribute:

### Kotlin

```kotlin
open class User {
    var picture: Bitmap? = null
}

@Entity(ignoredColumns = ["picture"])
data class RemoteUser(
    @PrimaryKey val id: Int,
    val hasVpn: Boolean
) : User()
```

### Java

```java
@Entity(ignoredColumns = "picture")
public class RemoteUser extends User {
    @PrimaryKey
    public int id;

    public boolean hasVpn;
}
```

Provide table search support
----------------------------

Room supports several types of annotations that make it easier for you to search for details in your database's tables. Use full-text search unless your app's `minSdkVersion` is less than 16.

### Support full-text search

If your app requires very quick access to database information through full-text search (FTS), have your entities backed by a virtual table that uses either the FTS3 or FTS4 SQLite extension module. To use this capability, available in Room 2.1.0 and higher, add the `@Fts3` or `@Fts4` annotation to a given entity, as shown in the following code snippet:

### Kotlin

```kotlin
// Use `@Fts3` only if your app has strict disk space requirements or if you
// require compatibility with an older SQLite version.
@Fts4
@Entity(tableName = "users")
data class User(
    /* Specifying a primary key for an FTS-table-backed entity is optional, but
       if you include one, it must use this type and column name. */
    @PrimaryKey @ColumnInfo(name = "rowid") val id: Int,
    @ColumnInfo(name = "first_name") val firstName: String?
)
```

### Java

```java
// Use `@Fts3` only if your app has strict disk space requirements or if you
// require compatibility with an older SQLite version.
@Fts4
@Entity(tableName = "users")
public class User {
    // Specifying a primary key for an FTS-table-backed entity is optional, but
    // if you include one, it must use this type and column name.
    @PrimaryKey
    @ColumnInfo(name = "rowid")
    public int id;

    @ColumnInfo(name = "first_name")
    public String firstName;
}
```

In cases where a table supports content in multiple languages, use the `languageId` option to specify the column that stores language information for each row:

### Kotlin

```kotlin
@Fts4(languageId = "lid")
@Entity(tableName = "users")
data class User(
    // ...
    @ColumnInfo(name = "lid") val languageId: Int
)
```

### Java

```java
@Fts4(languageId = "lid")
@Entity(tableName = "users")
public class User {
    // ...

    @ColumnInfo(name = "lid")
    int languageId;
}
```

Room provides several other options for defining FTS-backed entities, including result ordering, tokenizer types, and tables managed as external content. For more details about these options, see the `FtsOptions` reference.

### Index specific columns

If your app must support SDK versions that don't allow for using FTS3- or FTS4-table-backed entities, you can still index certain columns in the database to speed up your queries. To add indices to an entity, include the `indices`) property within the `@Entity` annotation, listing the names of the columns that you want to include in the index or composite index. The following code snippet demonstrates this annotation process:

### Kotlin

```kotlin
@Entity(indices = [Index(value = ["last_name", "address"])])
data class User(
    @PrimaryKey val id: Int,
    val firstName: String?,
    val address: String?,
    @ColumnInfo(name = "last_name") val lastName: String?,
    @Ignore val picture: Bitmap?
)
```

### Java

```java
@Entity(indices = {@Index("name"),
        @Index(value = {"last_name", "address"})})
public class User {
    @PrimaryKey
    public int id;

    public String firstName;
    public String address;

    @ColumnInfo(name = "last_name")
    public String lastName;

    @Ignore
    Bitmap picture;
}
```

Sometimes, certain fields or groups of fields in a database must be unique. You can enforce this uniqueness property by setting the `unique`) property of an `@Index` annotation to `true`. The following code sample prevents a table from having two rows that contain the same set of values for the `firstName` and `lastName` columns:

### Kotlin

```kotlin
@Entity(indices = [Index(value = ["first_name", "last_name"],
        unique = true)])
data class User(
    @PrimaryKey val id: Int,
    @ColumnInfo(name = "first_name") val firstName: String?,
    @ColumnInfo(name = "last_name") val lastName: String?,
    @Ignore var picture: Bitmap?
)
```

### Java

```java
@Entity(indices = {@Index(value = {"first_name", "last_name"},
        unique = true)})
public class User {
    @PrimaryKey
    public int id;

    @ColumnInfo(name = "first_name")
    public String firstName;

    @ColumnInfo(name = "last_name")
    public String lastName;

    @Ignore
    Bitmap picture;
}
```

Include AutoValue-based objects
-------------------------------

In Room 2.1.0 and higher, you can use Java-based immutable value classes, which you annotate using `@AutoValue`, as entities in your app's database. This support is particularly helpful when two instances of an entity are considered to be equal if their columns contain identical values.

When using classes annotated with `@AutoValue` as entities, you can annotate the class's abstract methods using `@PrimaryKey`, `@ColumnInfo`, `@Embedded`, and `@Relation`. When using these annotations, however, you must include the `@CopyAnnotations` annotation each time so that Room can interpret the methods' auto-generated implementations properly.

The following code snippet shows an example of a class annotated with `@AutoValue` that Room recognizes as an entity:

User.java

```java
@AutoValue
@Entity
public abstract class User {
    // Supported annotations must include `@CopyAnnotations`.
    @CopyAnnotations
    @PrimaryKey
    public abstract long getId();

    public abstract String getFirstName();
    public abstract String getLastName();

    // Room uses this factory method to create User objects.
    public static User create(long id, String firstName, String lastName) {
        return new AutoValue_User(id, firstName, lastName);
    }
}
```