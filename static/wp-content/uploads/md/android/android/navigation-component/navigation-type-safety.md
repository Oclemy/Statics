# Type safety in Kotlin DSL and Navigation Compose

This page contains best practices for providing runtime type safety to the Navigation Kotlin DSL and Navigation Compose. In summary, you should map each screen of your app or navigation graph to a Navigation file on a per module basis. The resulting files should each contain all the Navigation related information for the given destination. These navigation files are also where Kotlin visibility modifiers provide runtime type safety:

*   Type safe functions are publicly exposed to the rest of the codebase.
*   Navigation specific concepts for a particular screen or navigation graph are co-located and kept private in the same file to make them inaccessible to the rest of the codebase.

Split your navigation graph
---------------------------

You should split your navigation graph by screen. This is essentially the same approach as when you split screens to different composable functions. Each screen should have a `NavGraphBuilder` extension function.

This extension function is the bridge between a stateless screen-level composable function and Navigation-specific logic. This layer can also define where the state comes from and how events are handled.

Here's a typical `ConversationScreen` that can be `internal` to its own module, so that other modules cannot access it:

```kotlin
    // ConversationScreen.kt
    
    @Composable
    internal fun ConversationScreen(
      uiState: ConversationUiState,
      onPinConversation: () -> Unit,
      onNavigateToParticipantList: (conversationId: String) -> Unit
    ) { ... }
```

The following `NavGraphBuilder` extension function adds the `ConversationScreen` composable as a destination of that `NavGraph`. It also connects the screen with a ViewModel that provides the screen UI state and handles the screen-related business logic. Navigation events that cannot be handled by the ViewModel are exposed to the caller.

```kotlin
    // ConversationNavigation.kt
    
    private const val conversationIdArg = "conversationId"
    
    // Adds conversation screen to `this` NavGraphBuilder
    fun NavGraphBuilder.conversationScreen(
      // Navigation events are exposed to the caller to be handled at a higher level
      onNavigateToParticipantList: (conversationId: String) -> Unit
    ) {
      composable("conversation/{$conversationIdArg}") {
        // The ViewModel as a screen level state holder produces the screen
        // UI state and handles business logic for the ConversationScreen
        val viewModel: ConversationViewModel = hiltViewModel()
        val uiState = viewModel.uiState.collectAsStateWithLifecycle()
        ConversationScreen(
          uiState,
          ::viewModel.pinConversation,
          onNavigateToParticipantList
        )
      }
    }
    
```

The `ConversationNavigation.kt` file separates code from the Navigation library from the destination itself. It also provides encapsulation around Navigation concepts such as routes or argument IDs that are kept private because they should never leak outside of this file. Navigation events that cannot be handled at this layer, need to be exposed to the caller so that they're handled at the right level. You will find an example of such an event with `onNavigateToParticipantList` in the code snippet above.

Type safe navigation
--------------------

The Navigation Kotlin DSL that Navigation Compose is built on doesn't _currently_ offer compile-time type safety of the kind Safe Args provides to navigation graphs built in navigation XML resource files. Safe Args generates code that contains type-safe classes and methods for Navigation destinations and actions. However, you can structure your Navigation code to be type safe at runtime. With it, you can avoid crashes and make sure that:

*   The arguments you provide when navigating to a destination or navigation graph are the right types and that all the required arguments are present.
*   The arguments you retrieve from `SavedStateHandle` are the right types.

### Navigate to a destination

Each destination should also expose a `NavController` extension function to allow other destinations to safely navigate to it.

```kotlin
    // ConversationNavigation.kt
    
    fun NavController.navigateToConversation(conversationId: String) {
      navController.navigate("conversation/$conversationId")
    }
```

If you want to navigate to a screen of your app with different `NavOptions`, such as `popUpTo, savedState, restoreState`, or `singleTop` when navigating, pass an optional parameter to the `NavController` extension function.

```kotlin
    // HomeNavigation.kt
    
    const val HomeRoute = "home"
    
    fun NavController.navigateToHome(navOptions: NavOptions? = null) {
        this.navigate(HomeRoute, navOptions)
    }
```

### Type safe arguments wrapper

You can optionally create a type safe wrapper to extract the arguments out of a `SavedStateHandle` for your ViewModel and out of a `NavBackStackEntry` in the content of a destination to get the benefits mentioned in the introduction to this section.

```kotlin
    // ConversationNavigation.kt
    
    private const val conversationIdArg = "conversationId"
    
    internal class ConversationArgs(val conversationId: String) {
      constructor(savedStateHandle: SavedStateHandle) :
        this(checkNotNull(savedStateHandle[conversationIdArg]) as String)
    }
    
    // ConversationViewModel.kt
    
    internal class ConversationViewModel(...,
      savedStateHandle: SavedStateHandle
    ) : ViewModel() {
      private val conversationArgs = ConversationArgs(savedStateHandle)
    }
    
```

Assemble the navigation graph
-----------------------------

Navigation graphs use the type safe extension functions described above to add destinations and to navigate to them.

In the following example, the _conversation_ destination together with two other destinations, _home_ and _participant list_, is included in an app level `NavHost` as follows:

```kotlin
    // MyApp.kt
    
    @Composable
    fun MyApp(modifier: Modifier = Modifier) {
      val navController = rememberNavController()
      NavHost(
        navController = navController,
        startDestination = HomeRoute,
        modifier = modifier
      ) {
    
        homeScreen(
          onNavigateToConversation = { conversationId ->
            navController.navigateToConversation(conversationId)
          }
        )
    
        conversationScreen(
          onNavigateToParticipantList = { conversationId ->
            navController.navigateToParticipantList(conversationId)
          }
        }
    
        participantListScreen()
    }
```

Type safety in nested navigation graphs
---------------------------------------

You should choose the right visibility for modules that provide multiple screens. This is the same concept as for each method in the sections above. However, it may not make sense to expose individual screens to other modules at all. In that case, you should instead treat them as part of a larger, self contained flow.

This self-contained set of screens is called a **nested navigation graph**. This lets you include multiple screens into a single `NavGraphBuilder` extension method. This method uses those `NavController` extension methods in turn to link the screens within the same module together.

In the following example, the _conversation_ destination described in previous sections appears n a nested navigation graph alongside two other destinations, _conversation list_ and _participant list_:

```kotlin
    // ConversationGraphNavigation.kt
    
    private val ConversationGraphRoutePattern = "conversation"
    
    fun NavController.navigateToConversationGraph(navOptions: NavOptions? = null) {
      this.navigate(ConversationGraphRoutePattern, navOptions)
    }
    
    fun NavGraphBuilder.conversationGraph(navController: NavController) {
      navigation(
        startDestination = ConversationListRoutePattern,
        route = ConversationGraphRoutePattern
      ) {
        conversationListScreen(
          onNavigateToConversation = { conversationId ->
            navController.navigateToConversation(conversationId)
          }
        )
        conversationScreen(
          onNavigateToParticipantList = { conversationId ->
            navController.navigateToParticipantList(conversationId)
          }
        )
        partipantList()
    }
    
```

You can use multiple nested navigation graphs in an app level `NavHost` as follows:

```kotlin
    // MyApp.kt
    
    @Composable
    fun MyApp(modifier: Modifier = Modifier) {
      val navController = rememberNavController()
      NavHost(
        navController = navController,
        startDestination = HomeGraphRoutePattern
        modifier = modifier
      ) {
        homeGraph(
          navController,
          onNavigateToConversation = {
            navController.navigateToConversationGraph()
          }
        }
        conversationGraph(navController)
    }
```