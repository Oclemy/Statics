# Fragment transactions

At runtime, a `FragmentManager` can add, remove, replace, and perform other actions with fragments in response to user interaction. Each set of fragment changes that you commit is called a _transaction_, and you can specify what to do inside the transaction using the APIs provided by the `FragmentTransaction` class. You can group multiple actions into a single transaction—for example, a transaction can add or replace multiple fragments. This grouping can be useful for when you have multiple sibling fragments displayed on the same screen, such as with split views.

You can save each transaction to a back stack managed by the `FragmentManager`, allowing the user to navigate backward through the fragment changes—similar to navigating backward through activities.

You can get an instance of `FragmentTransaction` from the `FragmentManager` by calling `beginTransaction()`, as shown in the following example:

### Kotlin

```kotlin
val fragmentManager = ...
val fragmentTransaction = fragmentManager.beginTransaction()
```

### Java

```java
FragmentManager fragmentManager = ...
FragmentTransaction fragmentTransaction = fragmentManager.beginTransaction();
```

The final call on each `FragmentTransaction` must commit the transaction. The `commit()` call signals to the `FragmentManager` that all operations have been added to the transaction.

### Kotlin

```kotlin
val fragmentManager = ...
// The fragment-ktx module provides a commit block that automatically
// calls beginTransaction and commit for you.
fragmentManager.commit {
    // Add operations here
}
```

### Java

```java
FragmentManager fragmentManager = ...
FragmentTransaction fragmentTransaction = fragmentManager.beginTransaction();

// Add operations here

fragmentTransaction.commit();
```

Allow reordering of fragment state changes
------------------------------------------

Each `FragmentTransaction` should use `setReorderingAllowed(true)`:

### Kotlin

```kotlin
supportFragmentManager.commit {
    ...
    setReorderingAllowed(true)
}
```

### Java

```java
FragmentManager fragmentManager = ...
fragmentManager.beginTransaction()
    ...
    .setReorderingAllowed(true)
    .commit();
```

For behavior compatibility, the reordering flag is not enabled by default. It is required, however, to allow `FragmentManager` to properly execute your `FragmentTransaction`, particularly when it operates on the back stack and runs animations and transitions. Enabling the flag ensures that if multiple transactions are executed together, any intermediate fragments (i.e. ones that are added and then immediately replaced) do not go through lifecycle changes or have their animations or transitions executed. Note that this flag affects both the initial execution of the transaction and reversing the transaction with `popBackStack()`.

Adding and removing fragments
-----------------------------

To add a fragment to a `FragmentManager`, call `add()`) on the transaction. This method receives the ID of the _container_ for the fragment, as well as the class name of the fragment you wish to add. The added fragment is moved to the `RESUMED` state. It is strongly recommended that the _container_ is a `FragmentContainerView` that is part of the view hierarchy.

To remove a fragment from the host, call `remove()`), passing in a fragment instance that was retrieved from the fragment manager through `findFragmentById()` or `findFragmentByTag()`. If the fragment's view was previously added to a container, the view is removed from the container at this point. The removed fragment is moved to the `DESTROYED` state.

Use `replace()`) to replace an existing fragment in a container with an instance of a new fragment class that you provide. Calling `replace()` is equivalent to calling `remove()` with a fragment in a container and adding a new fragment to that same container.

The following code snippet shows how you can replace one fragment with another:

### Kotlin

```kotlin
// Create new fragment
val fragmentManager = // ...

// Create and commit a new transaction
fragmentManager.commit {
    setReorderingAllowed(true)
    // Replace whatever is in the fragment_container view with this fragment
    replace<ExampleFragment>(R.id.fragment_container)
}
```

### Java

```java
// Create new fragment and transaction
FragmentManager fragmentManager = ...
FragmentTransaction transaction = fragmentManager.beginTransaction();
transaction.setReorderingAllowed(true);

// Replace whatever is in the fragment_container view with this fragment
transaction.replace(R.id.fragment_container, ExampleFragment.class, null);

// Commit the transaction
transaction.commit();
```

In this example, a new instance of `ExampleFragment` replaces the fragment, if any, that is currently in the layout container identified by `R.id.fragment_container`.

By default, the changes made in a `FragmentTransaction` are not added to the back stack. To save those changes, you can call `addToBackStack()`) on the `FragmentTransaction`. For more information, see Fragment manager.

### Commit is asynchronous

Calling `commit()`) doesn't perform the transaction immediately. Rather, the transaction is scheduled to run on the main UI thread as soon as it is able to do so. If necessary, however, you can call `commitNow()`) to run the fragment transaction on your UI thread immediately.

Note that `commitNow` is incompatible with `addToBackStack`. Alternatively, you can execute all pending `FragmentTransactions` submitted by `commit()`) calls that have not yet run by calling `executePendingTransactions()`). This approach is compatible with `addToBackStack`.

For the vast majority of use cases, `commit()` is all you need.

### Operation ordering is significant

The order in which you perform operations within a `FragmentTransaction` is significant, particularly when using `setCustomAnimations()`. This method applies the given animations to all fragment operations that follow it.

### Kotlin

```kotlin
supportFragmentManager.commit {
    setCustomAnimations(enter1, exit1, popEnter1, popExit1)
    add<ExampleFragment>(R.id.container) // gets the first animations
    setCustomAnimations(enter2, exit2, popEnter2, popExit2)
    add<ExampleFragment>(R.id.container) // gets the second animations
}
```

### Java

```java
getSupportFragmentManager().beginTransaction()
        .setCustomAnimations(enter1, exit1, popEnter1, popExit1)
        .add(R.id.container, ExampleFragment.class, null) // gets the first animations
        .setCustomAnimations(enter2, exit2, popEnter2, popExit2)
        .add(R.id.container, ExampleFragment.class, null) // gets the second animations
        .commit()
```

Limit the fragment's lifecycle
------------------------------

`FragmentTransactions` can affect the lifecycle state of individual fragments added within the scope of the transaction. When creating a `FragmentTransaction`, `setMaxLifecycle()`) sets a maximum state for the given fragment. For example, `ViewPager2` uses `setMaxLifecycle()` to limit the off-screen fragments to the `STARTED` state.

Showing and hiding fragment's views
-----------------------------------

Use the `FragmentTransaction` methods `show()`) and `hide()`) to show and hide the view of fragments that have been added to a container. These methods set the visibility of the fragment's views _without_ affecting the lifecycle of the fragment.

While you don't need to use a fragment transaction to toggle the visibility of the views within a fragment, these methods are useful for cases where you want changes to the visibility state to be associated with transactions on the back stack.

Attaching and detaching fragments
---------------------------------

The `FragmentTransaction` method `detach()`) detaches the fragment from the UI, destroying its view hierarchy. The fragment remains in the same state (`STOPPED`) as when it is put on the back stack. This means that the fragment was removed from the UI but is still managed by the fragment manager.

The `attach()`) method reattaches a fragment from which it was previously detached. This causes its view hierarchy to be recreated, attached to the UI, and displayed.

As a `FragmentTransaction` is treated as a single atomic set of operations, calls to both `detach` and `attach` on the same fragment instance in the same transaction effectively cancel each other out, thus avoiding the destruction and immediate recreation of the fragment's UI. Use separate transactions, separated by `executePendingOperations()` if using `commit()`, if you want to detach and then immediately re-attach a fragment.