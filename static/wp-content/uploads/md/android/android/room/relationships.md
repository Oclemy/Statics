# Define relationships between objects

Because SQLite is a relational database, you can define relationships between entities. Even though most object-relational mapping libraries allow entity objects to reference each other, Room explicitly forbids this. To learn about the technical reasoning behind this decision, see Understand why Room doesn't allow object references.

Two possible approaches
-----------------------

In Room, there are two ways to define and query a relationship between entities: you can model the relationship using either an intermediate data class with embedded objects, or a relational query method with a multimap return type.

### Intermediate data class

In the intermediate data class approach, you define a data class that models the relationship between your Room entities. This data class holds the pairings between instances of one entity and instances of another entity as embedded objects. Your query methods can then return instances of this data class for use in your app.

For example, you can define a `UserBook` data class to represent library users with specific books checked out, and define a query method to retrieve a list of `UserBook` instances from the database:

### Kotlin

```kotlin
@Dao
interface UserBookDao {
    @Query(
        "SELECT user.name AS userName, book.name AS bookName " +
        "FROM user, book " +
        "WHERE user.id = book.user_id"
    )
    fun loadUserAndBookNames(): LiveData<List<UserBook>>
}

data class UserBook(val userName: String?, val bookName: String?)
```

### Java

```java
@Dao
public interface UserBookDao {
   @Query("SELECT user.name AS userName, book.name AS bookName " +
          "FROM user, book " +
          "WHERE user.id = book.user_id")
   public LiveData<List<UserBook>> loadUserAndBookNames();
}

public class UserBook {
    public String userName;
    public String bookName;
}
```

### Multimap return types

In the multimap return type approach, you don't need to define any additional data classes. Instead, you define a multimap return type for your method based on the map structure that you want and define the relationship between your entities directly in your SQL query.

For example, the following query method returns a mapping of `User` and `Book` instances to represent library users with specific books checked out:

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

### Choose an approach

Room supports both of the approaches described above, and you should use whichever approach works best for your app. This section discusses some of the reasons why you might prefer one or the other.

The intermediate data class approach allows you to avoid writing complex SQL queries, but it can also result in increased code complexity due to the additional data classes that it requires. In short, the multimap return type approach requires your SQL queries to do more work; and the intermediate data class approach requires your code to do more work.

If you don't have a specific reason to use intermediate data classes, we recommend that you use the multimap return type approach. To learn more about this approach, see Return a multimap.

The rest of this guide demonstrates how to define relationships using the intermediate data class approach.

Create embedded objects
-----------------------

Sometimes, you'd like to express an entity or data object as a cohesive whole in your database logic, even if the object contains several fields. In these situations, you can use the `@Embedded` annotation to represent an object that you'd like to decompose into its subfields within a table. You can then query the embedded fields just as you would for other individual columns.

For instance, your `User` class can include a field of type `Address`, which represents a composition of fields named `street`, `city`, `state`, and `postCode`. To store the composed columns separately in the table, include an `Address` field in the `User` class that is annotated with `@Embedded`, as shown in the following code snippet:

### Kotlin

```kotlin
data class Address(
    val street: String?,
    val state: String?,
    val city: String?,
    @ColumnInfo(name = "post_code") val postCode: Int
)

@Entity
data class User(
    @PrimaryKey val id: Int,
    val firstName: String?,
    @Embedded val address: Address?
)
```

### Java

```java
public class Address {
    public String street;
    public String state;
    public String city;

    @ColumnInfo(name = "post_code") public int postCode;
}

@Entity
public class User {
    @PrimaryKey public int id;

    public String firstName;

    @Embedded public Address address;
}
```


The table representing a `User` object then contains columns with the following names: `id`, `firstName`, `street`, `state`, `city`, and `post_code`.

If an entity has multiple embedded fields of the same type, you can keep each column unique by setting the `prefix`) property. Room then adds the provided value to the beginning of each column name in the embedded object.

Define one-to-one relationships
-------------------------------

A _one-to-one relationship_ between two entities is a relationship where each instance of the parent entity corresponds to exactly one instance of the child entity, and vice-versa.

For example, consider a music streaming app where the user has a library of songs that they own. Each user has only one library, and each library corresponds to exactly one user. Therefore, there should be a one-to-one relationship between the `User` entity and the `Library` entity.

First, create a class for each of your two entities. One of the entities must include a variable that is a reference to the primary key of the other entity.

### Kotlin

```kotlin
@Entity
data class User(
    @PrimaryKey val userId: Long,
    val name: String,
    val age: Int
)

@Entity
data class Library(
    @PrimaryKey val libraryId: Long,
    val userOwnerId: Long
)
```

### Java

```java
@Entity
public class User {
    @PrimaryKey public long userId;
    public String name;
    public int age;
}

@Entity
public class Library {
    @PrimaryKey public long libraryId;
    public long userOwnerId;
}
```

In order to query the list of users and corresponding libraries, you must first model the one-to-one relationship between the two entities. To do this, create a new data class where each instance holds an instance of the parent entity and the corresponding instance of the child entity. Add the `@Relation` annotation to the instance of the child entity, with `parentColumn` set to the name of the primary key column of the parent entity and `entityColumn` set to the name of the column of the child entity that references the parent entity's primary key.

### Kotlin

```kotlin
data class UserAndLibrary(
    @Embedded val user: User,
    @Relation(
         parentColumn = "userId",
         entityColumn = "userOwnerId"
    )
    val library: Library
)
```

### Java

```java
public class UserAndLibrary {
    @Embedded public User user;
    @Relation(
         parentColumn = "userId",
         entityColumn = "userOwnerId"
    )
    public Library library;
}
```

Finally, add a method to the DAO class that returns all instances of the data class that pairs the parent entity and the child entity. This method requires Room to run two queries, so add the `@Transaction` annotation to this method to ensure that the whole operation is performed atomically.

### Kotlin

```kotlin
@Transaction
@Query("SELECT * FROM User")
fun getUsersAndLibraries(): List<UserAndLibrary>
```

### Java

```java
@Transaction
@Query("SELECT * FROM User")
public List<UserAndLibrary> getUsersAndLibraries();
```

Define one-to-many relationships
--------------------------------

A _one-to-many relationship_ between two entities is a relationship where each instance of the parent entity corresponds to zero or more instances of the child entity, but each instance of the child entity can only correspond to exactly one instance of the parent entity.

In the music streaming app example, suppose the user has the ability to organize their songs into playlists. Each user can create as many playlists as they want, but each playlist is created by exactly one user. Therefore, there should be a one-to-many relationship between the `User` entity and the `Playlist` entity.

First, create a class for each of your two entities. As in the previous example, the child entity must include a variable that is a reference to the primary key of the parent entity.

### Kotlin

```kotlin
@Entity
data class User(
    @PrimaryKey val userId: Long,
    val name: String,
    val age: Int
)

@Entity
data class Playlist(
    @PrimaryKey val playlistId: Long,
    val userCreatorId: Long,
    val playlistName: String
)
```

### Java

```java
@Entity
public class User {
    @PrimaryKey public long userId;
    public String name;
    public int age;
}

@Entity
public class Playlist {
    @PrimaryKey public long playlistId;
    public long userCreatorId;
    public String playlistName;
}
```

In order to query the list of users and corresponding playlists, you must first model the one-to-many relationship between the two entities. To do this, create a new data class where each instance holds an instance of the parent entity and a list of all corresponding child entity instances. Add the `@Relation` annotation to the instance of the child entity, with `parentColumn` set to the name of the primary key column of the parent entity and `entityColumn` set to the name of the column of the child entity that references the parent entity's primary key.

### Kotlin

```kotlin
data class UserWithPlaylists(
    @Embedded val user: User,
    @Relation(
          parentColumn = "userId",
          entityColumn = "userCreatorId"
    )
    val playlists: List<Playlist>
)
```

### Java

```java
public class UserWithPlaylists {
    @Embedded public User user;
    @Relation(
         parentColumn = "userId",
         entityColumn = "userCreatorId"
    )
    public List<Playlist> playlists;
}
```

Finally, add a method to the DAO class that returns all instances of the data class that pairs the parent entity and the child entity. This method requires Room to run two queries, so add the `@Transaction` annotation to this method to ensure that the whole operation is performed atomically.

### Kotlin

```kotlin
@Transaction
@Query("SELECT * FROM User")
fun getUsersWithPlaylists(): List<UserWithPlaylists>
```

### Java

```java
@Transaction
@Query("SELECT * FROM User")
public List<UserWithPlaylists> getUsersWithPlaylists();
```

Define many-to-many relationships
---------------------------------

A _many-to-many relationship_ between two entities is a relationship where each instance of the parent entity corresponds to zero or more instances of the child entity, and vice-versa.

In the music streaming app example, consider again the user-defined playlists. Each playlist can include many songs, and each song can be a part of many different playlists. Therefore, there should be a many-to-many relationship between the `Playlist` entity and the `Song` entity.

First, create a class for each of your two entities. Many-to-many relationships are distinct from other relationship types because there is generally no reference to the parent entity in the child entity. Instead, create a third class to represent an associative entity (or cross-reference table) between the two entities. The cross-reference table must have columns for the primary key from each entity in the many-to-many relationship represented in the table. In this example, each row in the cross-reference table corresponds to a pairing of a `Playlist` instance and a `Song` instance where the referenced song is included in the referenced playlist.

### Kotlin

```kotlin
@Entity
data class Playlist(
    @PrimaryKey val playlistId: Long,
    val playlistName: String
)

@Entity
data class Song(
    @PrimaryKey val songId: Long,
    val songName: String,
    val artist: String
)

@Entity(primaryKeys = ["playlistId", "songId"])
data class PlaylistSongCrossRef(
    val playlistId: Long,
    val songId: Long
)
```

### Java

```java
@Entity
public class Playlist {
    @PrimaryKey public long playlistId;
    public String playlistName;
}

@Entity
public class Song {
    @PrimaryKey public long songId;
    public String songName;
    public String artist;
}

@Entity(primaryKeys = {"playlistId", "songId"})
public class PlaylistSongCrossRef {
    public long playlistId;
    public long songId;
}
```

The next step depends on how you want to query these related entities.

*   If you want to query _playlists_ and a list of the corresponding _songs_ for each playlist, create a new data class that contains a single `Playlist` object and a list of all of the `Song` objects that the playlist includes.
*   If you want to query _songs_ and a list of the corresponding _playlists_ for each, create a new data class that contains a single `Song` object and a list of all of the `Playlist` objects in which the song is included.

In either case, model the relationship between the entities by using the `associateBy` property in the `@Relation` annotation in each of these classes to identify the cross-reference entity providing the relationship between the `Playlist` entity and the `Song` entity.

### Kotlin

```kotlin
data class PlaylistWithSongs(
    @Embedded val playlist: Playlist,
    @Relation(
         parentColumn = "playlistId",
         entityColumn = "songId",
         associateBy = Junction(PlaylistSongCrossRef::class)
    )
    val songs: List<Song>
)

data class SongWithPlaylists(
    @Embedded val song: Song,
    @Relation(
         parentColumn = "songId",
         entityColumn = "playlistId",
         associateBy = Junction(PlaylistSongCrossRef::class)
    )
    val playlists: List<Playlist>
)
```

### Java

```java
public class PlaylistWithSongs {
    @Embedded public Playlist playlist;
    @Relation(
         parentColumn = "playlistId",
         entityColumn = "songId",
         associateBy = @Junction(PlaylistSongCrossref.class)
    )
    public List<Song> songs;
}

public class SongWithPlaylists {
    @Embedded public Song song;
    @Relation(
         parentColumn = "songId",
         entityColumn = "playlistId",
         associateBy = @Junction(PlaylistSongCrossref.class)
    )
    public List<Playlist> playlists;
}
```

Finally, add a method to the DAO class to expose the query functionality your app needs.

*   `getPlaylistsWithSongs`: This method queries the database and returns all of the resulting `PlaylistWithSongs` objects.
*   `getSongsWithPlaylists`: This method queries the database and returns all of the resulting `SongWithPlaylists` objects.

These methods each require Room to run two queries, so add the `@Transaction` annotation to both methods to ensure that the whole operation is performed atomically.

### Kotlin

```kotlin
@Transaction
@Query("SELECT * FROM Playlist")
fun getPlaylistsWithSongs(): List<PlaylistWithSongs>

@Transaction
@Query("SELECT * FROM Song")
fun getSongsWithPlaylists(): List<SongWithPlaylists>
```

### Java

```java
@Transaction
@Query("SELECT * FROM Playlist")
public List<PlaylistWithSongs> getPlaylistsWithSongs();

@Transaction
@Query("SELECT * FROM Song")
public List<SongWithPlaylists> getSongsWithPlaylists();
```

Define nested relationships
---------------------------

Sometimes, you might need to query a set of three or more tables that are all related to each other. In that case, you would define _nested relationships_ between the tables.

Suppose that in the music streaming app example, you want to query all of the users, all of the playlists for each user, and all of the songs in each playlist for each user. Users have a one-to-many relationship with playlists, and playlists have a many-to-many relationship with songs. The following code example shows the classes that represent these entities, as well as the cross-reference table for the many-to-many relationship between playlists and songs:

### Kotlin

```kotlin
@Entity
data class User(
    @PrimaryKey val userId: Long,
    val name: String,
    val age: Int
)

@Entity
data class Playlist(
    @PrimaryKey val playlistId: Long,
    val userCreatorId: Long,
    val playlistName: String
)

@Entity
data class Song(
    @PrimaryKey val songId: Long,
    val songName: String,
    val artist: String
)

@Entity(primaryKeys = ["playlistId", "songId"])
data class PlaylistSongCrossRef(
    val playlistId: Long,
    val songId: Long
)
```

### Java

```java
@Entity
public class User {
    @PrimaryKey public long userId;
    public String name;
    public int age;
}

@Entity
public class Playlist {
    @PrimaryKey public long playlistId;
    public long userCreatorId;
    public String playlistName;
}
@Entity
public class Song {
    @PrimaryKey public long songId;
    public String songName;
    public String artist;
}

@Entity(primaryKeys = {"playlistId", "songId"})
public class PlaylistSongCrossRef {
    public long playlistId;
    public long songId;
}
```

First, model the relationship between two of the tables in your set as you normally would, with a data class and the `@Relation` annotation. The following example shows a `PlaylistWithSongs` class that models a many-to-many relationship between the `Playlist` entity class and the `Song` entity class:

### Kotlin

```kotlin
data class PlaylistWithSongs(
    @Embedded val playlist: Playlist,
    @Relation(
         parentColumn = "playlistId",
         entityColumn = "songId",
         associateBy = Junction(PlaylistSongCrossRef::class)
    )
    val songs: List<Song>
)
```

### Java

```java
public class PlaylistWithSongs {
    @Embedded public Playlist playlist;
    @Relation(
         parentColumn = "playlistId",
         entityColumn = "songId",
         associateBy = Junction(PlaylistSongCrossRef.class)
    )
    public List<Song> songs;
}
```


After you define a data class that represents this relationship, create another data class that models the relationship between another table from your set and the first relationship class, "nesting" the existing relationship within the new one. The following example shows a `UserWithPlaylistsAndSongs` class that models a one-to-many relationship between the `User` entity class and the `PlaylistWithSongs` relationship class:

### Kotlin

```kotlin
data class UserWithPlaylistsAndSongs(
    @Embedded val user: User
    @Relation(
        entity = Playlist::class,
        parentColumn = "userId",
        entityColumn = "userCreatorId"
    )
    val playlists: List<PlaylistWithSongs>
)
```

### Java

```java
public class UserWithPlaylistsAndSongs {
    @Embedded public User user;
    @Relation(
        entity = Playlist.class,
        parentColumn = "userId",
        entityColumn = "userCreatorId"
    )
    public List<PlaylistWithSongs> playlists;
}
```

The `UserWithPlaylistsAndSongs` class indirectly models the relationships between all three of the entity classes: `User`, `Playlist`, and `Song`. This is illustrated in figure 1.

![UserWithPlaylistsAndSongs models the relationship between User and
  PlaylistWithSongs, which in turn models the relationship between Playlist
  and Song.](https://developer.android.com/static/images/training/data-storage/room_nested_relationships.png)

**Figure 1.** Diagram of relationship classes in the music streaming app example.

If there are any more tables in your set, create a class to model the relationship between each remaining table and the relationship class that models the relationships between all previous tables. This creates a chain of nested relationships between all of the tables that you want to query.

Finally, add a method to the DAO class to expose the query functionality that your app needs. This method requires Room to run multiple queries, so add the `@Transaction` annotation to ensure that the whole operation is performed atomically:

### Kotlin

```kotlin
@Transaction
@Query("SELECT * FROM User")
fun getUsersWithPlaylistsAndSongs(): List<UserWithPlaylistsAndSongs>
```

### Java

```java
@Transaction
@Query("SELECT * FROM User")
public List<UserWithPlaylistsAndSongs> getUsersWithPlaylistsAndSongs();
```