# Domain layer

The domain layer is an _optional_ layer that sits between the UI layer and the data layer.

![When it is included, the optional domain layer provides dependencies to
    the UI layer and depends on the data layer.](https://developer.android.com/static/topic/libraries/architecture/images/mad-arch-domain-overview.png)

**Figure 1.** The domain layer's role in app architecture.

The domain layer is responsible for encapsulating complex business logic, or simple business logic that is reused by multiple ViewModels. This layer is optional because not all apps will have these requirements. You should only use it when needed-for example, to handle complexity or favor reusability.

A domain layer provides the following benefits:

*   It avoids code duplication.
*   It improves readability in classes that use domain layer classes.
*   It improves the testability of the app.
*   It avoids large classes by allowing you to split responsibilities.

To keep these classes simple and lightweight, each use case should only have responsibility over a single functionality, and they should not contain mutable data. You should instead handle mutable data in your UI or data layers.

Naming conventions in this guide
--------------------------------

In this guide, use cases are named after the single action they're responsible for. The convention is as follows:

_verb in present tense_ + _noun/what (optional)_ + _UseCase_.

For example: `FormatDateUseCase`, `LogOutUserUseCase`, `GetLatestNewsWithAuthorsUseCase`, or `MakeLoginRequestUseCase`.

Dependencies
------------

In a typical app architecture, use case classes fit between ViewModels from the UI layer and repositories from the data layer. This means that use case classes usually depend on repository classes, and they communicate with the UI layer the same way repositories do—using either callbacks (for Java) or coroutines (for Kotlin). To learn more about this, see the data layer page.

For example, in your app, you might have a use case class that fetches data from a news repository and an author repository, and combines them:

```kotlin
    class GetLatestNewsWithAuthorsUseCase(
      private val newsRepository: NewsRepository,
      private val authorsRepository: AuthorsRepository
    ) { /* ... */ }
```

Because use cases contain reusable logic, they can also be used by other use cases. It's normal to have multiple levels of use cases in the domain layer. For example, the use case defined in the example below can make use of the `FormatDateUseCase` use case if multiple classes from the UI layer rely on time zones to display the proper message on the screen:

```kotlin
    class GetLatestNewsWithAuthorsUseCase(
      private val newsRepository: NewsRepository,
      private val authorsRepository: AuthorsRepository,
      private val formatDateUseCase: FormatDateUseCase
    ) { /* ... */ }
```

![GetLatestNewsWithAuthorsUseCase depends on repository classes from the
    data layer, but it also depends on FormatDataUseCase, another use case class
    that is also in the domain layer.](https://developer.android.com/static/topic/libraries/architecture/images/mad-arch-domain-usecase-deps.png)

**Figure 2.** Example dependency graph for a use case that depends on other use cases.

Call use cases in Kotlin
------------------------

In Kotlin, you can make use case class instances callable as functions by defining the `invoke()` function with the `operator` modifier. See the following example:

```kotlin
    class FormatDateUseCase(userRepository: UserRepository) {
    
        private val formatter = SimpleDateFormat(
            userRepository.getPreferredDateFormat(),
            userRepository.getPreferredLocale()
        )
    
        operator fun invoke(date: Date): String {
            return formatter.format(date)
        }
    }
```

In this example, the `invoke()` method in `FormatDateUseCase` allows you to call instances of the class as if they were functions. The `invoke()` method is not restricted to any specific signature—it can take any number of parameters and return any type. You can also overload `invoke()` with different signatures in your class. You'd call the use case from the example above as follows:

```kotlin
    class MyViewModel(formatDateUseCase: FormatDateUseCase) : ViewModel() {
        init {
            val today = Calendar.getInstance()
            val todaysDate = formatDateUseCase(today)
            /* ... */
        }
    }
```

To learn more about the `invoke()` operator, see the Kotlin docs.

Lifecycle
---------

Use cases don't have their own lifecycle. Instead, they're scoped to the class that uses them. This means that you can call use cases from classes in the UI layer, from services, or from the `Application` class itself. Because use cases shouldn't contain mutable data, you should create a new instance of a use case class every time you pass it as a dependency.

Threading
---------

Use cases from the domain layer must be _main-safe_; in other words, they must be safe to call from the main thread. If use case classes perform long-running blocking operations, they are responsible for moving that logic to the appropriate thread. However, before doing that, check if those blocking operations would be better placed in other layers of the hierarchy. Typically, complex computations happen in the data layer to encourage reusability or caching. For example, a resource-intensive operation on a big list is better placed in the data layer than in the domain layer if the result needs to be cached to reuse it on multiple screens of the app.

The following example shows a use case that performs its work on a background thread:

```kotlin
    class MyUseCase(
        private val defaultDispatcher: CoroutineDispatcher = Dispatchers.Default
    ) {
    
        suspend operator fun invoke(...) = withContext(defaultDispatcher) {
            // Long-running blocking operations happen on a background thread.
        }
    }
```

Common tasks
------------

This section describes how to perform common domain layer tasks.

### Reusable simple business logic

You should encapsulate repeatable business logic present in the UI layer in a use case class. This makes it easier to apply any changes everywhere the logic is used. It also allows you to test the logic in isolation.

Consider the `FormatDateUseCase` example described earlier. If your business requirements regarding date formatting change in the future, you only need to change code in one centralized place.

### Combine repositories

In a news app, you might have `NewsRepository` and `AuthorsRepository` classes that handle news and author data operations respectively. The `Article` class that `NewsRepository` exposes only contains the name of the author, but you want to display more information about the author on the screen. Author information can be obtained from the `AuthorsRepository`.

![GetLatestNewsWithAuthorsUseCase depends on two different repository
    classes from the data layer: NewsRepository and AuthorsRepository.](https://developer.android.com/static/topic/libraries/architecture/images/mad-arch-domain-multiple-repos.png)

**Figure 3.** Dependency graph for a use case that combines data from multiple repositories.

Because the logic involves multiple repositories and can become complex, you create a `GetLatestNewsWithAuthorsUseCase` class to abstract the logic out of the ViewModel and make it more readable. This also makes the logic easier to test in isolation, and reusable in different parts of the app.

```kotlin
    /**
     * This use case fetches the latest news and the associated author.
     */
    class GetLatestNewsWithAuthorsUseCase(
      private val newsRepository: NewsRepository,
      private val authorsRepository: AuthorsRepository,
      private val defaultDispatcher: CoroutineDispatcher = Dispatchers.Default
    ) {
        suspend operator fun invoke(): List<ArticleWithAuthor> =
            withContext(defaultDispatcher) {
                val news = newsRepository.fetchLatestNews()
                val result: MutableList<ArticleWithAuthor> = mutableListOf()
                // This is not parallelized, the use case is linearly slow.
                for (article in news) {
                    // The repository exposes suspend functions
                    val author = authorsRepository.getAuthor(article.authorId)
                    result.add(ArticleWithAuthor(article, author))
                }
                result
            }
    }
    
```

The logic maps all items in the `news` list; so even though the data layer is main-safe, this work shouldn't block the main thread because you don't know how many items it'll process. That's why the use case moves the work to a background thread using the default dispatcher.

Other consumers
---------------

Apart from the UI layer, the domain layer can be reused by other classes such as services and the `Application` class. Furthermore, if other platforms such as TV or Wear share codebase with the mobile app, their UI layer can also reuse use cases to get all the aforementioned benefits of the domain layer.

Data layer access restriction
-----------------------------

One other consideration when implementing the domain layer is whether you should still allow direct access to the data layer from the UI layer, or force everything through the domain layer.

![UI layer cannot access data layer directly, it must go through the Domain layer](https://developer.android.com/static/topic/libraries/architecture/images/mad-arch-domain-data-access-restriction.png)

**Figure 4.** Dependency graph showing UI layer being denied access to the data layer.

An advantage of making this restriction is that it stops your UI from bypassing domain layer logic, for example, if you are performing analytics logging on each access request to the data layer.

However, the **potentially significant disadvantage** is that it forces you to add use cases even when they are just simple function calls to the data layer, which can add complexity for little benefit.

A good approach is to add use cases only when required. If you find that your UI layer is accessing data through use cases almost exclusively, it may make sense to _only_ access data this way.

Ultimately, the decision to restrict access to the data layer comes down to your individual codebase, and whether you prefer strict rules or a more flexible approach.

Testing
-------

General testing guidance applies when testing the domain layer. For other UI tests, developers typically use fake repositories, and it's good practice to use fake repositories when testing the domain layer as well.

