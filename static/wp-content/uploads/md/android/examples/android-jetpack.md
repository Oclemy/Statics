# Android Jetpack Introduction

Android Jetpack tutorial.


## What is Android Jetpack?

In the last few years, android development has been moving at breathtaking pace. Features and tools are being released year in year out. This is making android development much easier and android apps more powerful and reliable. However we developers must also keep learning to stay in tune and enjoy these new features and tools.

Android engineers released Jetpack a few years back, a collection of libraries and tools that allow us write high quality maintenable applications. Jetpack easens some complex tasks and allow us avoid boilerplate code by guiding us to write apps with best practices in mind.

Making up the Jetpack is the `androidx` package. Thus Jetpack respects backward compatibility.Android documentation furthermore claims that it gets updated even more frequently than the android platform itself.

### Advantages of Jetpack

1. Through Jetpack we get free management of intensive activities like background tasks, navigation and lifecycle. Through this we are allowed to focus our efforts on ideas and how to implement and not the nitty gritty of the framework.
2. Apps based on Jetpack are standing on a firm foundation due to the modern practices on which Jetpack components are built on. Thus they are less likely to crash or encounter memory leaks.
3. The components making up Jetpack are designed to seamlessly integrate with each other.You can use one, two or all of them. They are also designed to allow to take advantage of modern language features. Thus you end up becoming more productive.
4. Jetpack's Arch Foundation components provide backward compatibility as well. Moreover you can use Kotlin if you so desire.
5. Jetpack's Arch or Architecture allow you write easily testable code by employing modern best practices.Thus this easens maintenance.

## Categories of Jetpack Components

Jetpack components are divided in the following categories:

1. Foundation Components
2. Architecture Components
3. Behavior Components
4. UI Components.

Let's look at them one by one.

### 1\. Foundation Components

According to Android's documentation, these provide cross cutting functionality like backwards compatibility, testing and Kotlin language support.

They include:

| No. | Name | Description |
| --- | --- | --- |
| 1. | Android KTX | Through this we can write concise,idiomatic code in Kotlin |
| 2. | AppCompat | Provides us with features with backward compatibility |
| 3. | Auto | Provides us components for Android Auto development |
| 4. | Benchmark | You can use this to benchmark your code, be it Java or Kotlin |
| 5. | MultiDex | To provide support for apps with multiple DEX files. |
| 6. | Test | A framework for unit and runtime UI tests |
| 7. | TV | To be used for Android TV development. |
| 8. | Wear OS by Google | For android wear development |

### 2\. Architecture Components

This category is probably the most flashy. You may have already heard or used these components. Through arch components you can create highly robust, testable and maintenable apps.

They include:

| No. | Name | Description |
| --- | --- | --- |
| 1. | Data Binding | Data Binding allows you to bind your data to the UI declaratively. |
| 2. | Lifecycles | Provides management of activity and fragment lifecycles. Thus your app is able to survive configuration changes and avoid memory leaks. |
| 3. | LiveData | To notify views when the underlying data source changes. LiveData allows us build data objects which inform views when the data source changes. This allows us UI to update itself reactively. |
| 4. | Navigation | To provide handling of in app navigation |
| 5. | Paging | To allow you load data in chunks from a data source. |
| 6. | Room | To provide abstraction over SQLite database in a fluent manner. Room provides classes and interfaces that map to SQLite. Thus we don't have to write boilerplate code to do that.Furthermore Rooms gives us compile-time checks of SQLite statements. |
| 7. | ViewModel | Allows you manage UI related data with lifecycle changes in mind. Thorugh ViewMdel you can store UI related data which isn't destroyed by the system on configuration changes. |
| 8. | WorkManager | To allow you flexibly manage android background jobs. |

#### Adding Architecture Components

Architecture Components are available from Google's Maven repository. So go to your root level `build.gradle` and add the following:

```groovy
allprojects {
    repositories {
        google()
        jcenter()
    }
}
```

NB/= Root level build.gradle is located in your project's root folder.

Then you move to your app level(located in app folder) build.gradle and add the specific artifacts you need. Here is an example:

```groovy
dependencies {
    implementation fileTree(dir: 'libs', include: ['*.jar'])
    // Room components
    implementation 'androidx.room:room-runtime:2.0.0'
    annotationProcessor 'androidx.room:room-compiler:2.0.0'
    // Lifecycle components
    implementation 'androidx.lifecycle:lifecycle-extensions:2.0.0'
    annotationProcessor 'androidx.lifecycle:lifecycle-compiler:2.0.0'
```

### 3\. Behavior Components

In Behavior Components you get a more flexible integration with android services like notifications, permissions, sharing and assistant.

| No. | Name | Description |
| --- | --- | --- |
| 1. | CameraX | To allow you add camera capabilities to your apps easily. |
| 2. | Download Manager | To help you manage downloads of large files. |
| 3. | Media and PlayBack | To provide you with backwards compatible media playback and routing APIs. |
| 4. | Notifications | To provide a backwards compatible API for notifications. This includes Auto and Wear support. |
| 5. | Permissions | To provide compatibility APIs for checking and requesting permissions. |
| 6. | Preferences | To allow you create preference or settings screens. |
| 7. | Sharing | To provide a share action suitable for an app's actionbar. |
| 8. | Slices | Create flexible UI elements that can display app data outside the app |

### 4\. UI Components

Lastly we have UI Components. These are a set of widgets and helpers not only to easen the UI creation process but also make UI more modern.

| No. | Name | Description |
| --- | --- | --- |
| 1. | Animations and Transitions | To allow controlled movement of UI widgets within and between the screens. |
| 2. | Emoji | To allow for emoji font usage even on older devices. |
| 3. | Fragment | Units of UI. |
| 4. | Layouts | To allow arrangement of UI widgets using various algorithms. |
| 5. | Palette | To allow for pulling of useful information out of Color palettes. |

## Room

Room is an abstraction layer over SQLite Database. Room provides full access to SQLite capability but does it in an intuitive fluent manner.

Android Engineers recommend using Room over direct SQLite APIs.

### Advantages of Using Room

1. Room is easier to use than direct SQLite APIs yet provides same capability.
2. Room performs verification of queries at compile-time thus allowing use avoid syntax errors.

### In which Threads are Room methods callable?

In the background thread and Asynchronously. Room doesn't support database access on the main thread. However you can access the database in the main thread if you call `allowMainThreadQueries()` on the builder.

Asynchronous queries—queries that return instances of LiveData or Flowable—are exempt from this rule because they asynchronously run the query on a background thread when needed.

### What are the Components of Room?

Room comprises the following three main components:

| No. | Component | Descriptioon |
| --- | --- | --- |
| 1. | Database | Represents our database. Provides us the connection point to the actual database |
| 2. | Entity | Represents our database table. |
| 3. | DAO | Contains methods to provide database access. |

#### (a) Database

`Database` is an annotation defined in the `android.room` package:

```java
public abstract @interface Database
implements Annotation
```

It marks a class as a RoomDatabase.

##### What are the Requirements for a Database Class?

Database classes in Room are classes annotated with `@Database` decoration. These classes must:

| No. | Requirement |
| --- | --- |
| 1. | Be abstract and extend the `RoomDatabase` class. |
| 2. | Contain entities associated with the database. Entities, remember represent database tables. |
| 3. | Contain an abstract method with no arguments. That method must also return a DAO class object. DAO Classes are classes annotated with `@Dao`. |

NB/= At runtime, you can acquire an instance of Database by calling `Room.databaseBuilder()` or `Room.inMemoryDatabaseBuilder()`.

```java
 @Database(version = 1, entities = {User.class, Book.class})
 abstract class AppDatabase extends RoomDatabase {
     // BookDao is a class annotated with @Dao.
     abstract public BookDao bookDao();
     // UserDao is a class annotated with @Dao.
     abstract public UserDao userDao();
     // UserBookDao is a class annotated with @Dao.
     abstract public UserBookDao userBookDao();
 }
```

#### (b). Dao

Dao or DAO stands for _Data Access Objects_.

Dao classes provide communication abstractions over the database and should contain methods that should represent our queries rather than directly running queries on the database.

Dao allows us access our database data and is one of the main components of Room.

The methods defined in the DAO abstracts us access to the sqlite database.

By accessing a database using a DAO class instead of query builders or direct queries, you can separate different components of your database architecture. Furthermore, DAOs allow you to easily mock database access as you test your app.

##### What are the Advantages of having Dao Classes?

1. It allows us to abstract the database communication in a more logical layer which will be much easier to mock in tests (compared to running direct sql queries).This is becuase it allows us break our database architecture into different components.
2. It also automatically does the conversion from Cursor to your application classes so you don't need to deal with lower level database APIs for most of your data access.

##### In which format do we define Dao?

A DAO can be defined in the following formats:

1. As an Interface
2. As an Abstract Class - in this case it can optionally have a constructor that takes a RoomDatabase as its only parameter
