# Design navigation graphs

The Navigation component uses a _navigation graph_ to manage your app's navigation. A navigation graph is a resource file that contains all of your app's destinations along with the logical connections, or _actions_, that users can take to navigate from one destination to another. You can manage your app's navigation graph using the Navigation Editor in Android Studio.

This topic contains best practices and recommendations for designing your app's navigation graphs.

Top-level navigation graph
--------------------------

Your app’s _top-level_ navigation graph should start with the initial destination the user sees when launching the app and should include the destinations that they see as they move about your app.

![](https://developer.android.com/static/images/topic/libraries/architecture/navigation-design-graph-top-level.png)

**Figure 1:** A top-level navigation graph.

Nested graphs
-------------

Login flows, wizards, or other sub-flows within your app are usually best represented as nested navigation graphs. By nesting self-contained sub-navigation flows in this way, the main flow of your app’s UI is easier to comprehend and manage. In addition, nested graphs are reusable. They also provide a level of encapsulation—destinations outside of the nested graph do not have direct access to any of the destinations within the nested graph. Instead, they should `navigate()`) to the nested graph itself, where the internal logic can change without affecting the rest of the graph.

Using the top-level navigation graph from figure 1 as an example, suppose you wanted to require the user to see the **title_screen** and **register** screens only when the app is launched for the first time. Afterwards, the user information is stored, and in subsequent launches of the app, you should take them straight to the **match** screen. As a best practice, you should set the **match** screen as the _start destination_ of the top-level navigation graph and move the title and register screens into a nested graph, as shown in figure 2:

![](https://developer.android.com/static/images/topic/libraries/architecture/navigation-design-graph-nested.png)

**Figure 2:** The top-level navigation graph now contains a nested graph.

When the match screen launches, you can check to see if there is a registered user. If the user isn't registered, you can navigate the user to the registration screen. For more information on conditional navigation scenarios, see Conditional navigation.

Another way to modularize your graph structure is to _include_ one graph within another via an `<include>` element in the parent navigation graph. This allows the included graph to be defined in a separate module or project altogether, which maximizes reusability.

Navigation across library modules
---------------------------------

If your app depends on library modules, which have a navigation graph contained therein, you can reference these navigation graphs using an `<include>` element.

For more information, see Navigation best practices for multi-module projects.

Global actions
--------------

Any destination in your app that can be reached through more than one path should have a corresponding global action defined to navigate to that destination. Global actions can be used to navigate to a destination from anywhere.

Let's apply this to our library module sample, which has the same action defined in both the win and game over destinations. You should extract these common actions to a single global action and reference them from both destinations, as shown in the following example:

```xml
    <?xml version="1.0" encoding="utf-8"?>
    <navigation xmlns:android="http://schemas.android.com/apk/res/android"
       xmlns:app="http://schemas.android.com/apk/res-auto"
       android:id="@+id/in_game_nav_graph"
       app:startDestination="@id/in_game">
    
       <!-- Action back to destination which launched into this in_game_nav_graph-->
       <action android:id="@+id/action_pop_out_of_game"
                           app:popUpTo="@id/in_game_nav_graph"
                           app:popUpToInclusive="true" />
    
       <fragment
           android:id="@+id/in_game"
           android:name="com.example.android.gamemodule.InGame"
           android:label="Game">
           <action
               android:id="@+id/action_in_game_to_resultsWinner"
               app:destination="@id/results_winner" />
           <action
               android:id="@+id/action_in_game_to_gameOver"
               app:destination="@id/game_over" />
       </fragment>
    
       <fragment
           android:id="@+id/results_winner"
           android:name="com.example.android.gamemodule.ResultsWinner" />
    
       <fragment
           android:id="@+id/game_over"
           android:name="com.example.android.gamemodule.GameOver"
           android:label="fragment_game_over"
           tools:layout="@layout/fragment_game_over" />
    
    </navigation>
    
```

See Global actions in the navigation docs to learn more and examples of how to use global actions in your fragments.