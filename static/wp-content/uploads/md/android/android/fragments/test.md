# Test your fragments

This topic describes how to include framework-provided APIs in tests that evaluate each fragment's behavior.

Fragments serve as reusable containers within your app, allowing you to present the same user interface layout in a variety of activities and layout configurations. Given the versatility of fragments, it's important to validate that they provide a consistent and resource-efficient experience. Note the following:

*   Your fragment shouldn't be dependent on a specific parent activity or fragment.
*   You shouldn't create a fragment's view hierarchy unless the fragment is visible to the user.

To help set up the conditions for performing these tests, the AndroidX `fragment-testing` library provides the `FragmentScenario` class to create fragments and change their `Lifecycle.State`.

Declaring dependencies
----------------------

To use `FragmentScenario`, define the `fragment-testing` artifact in your app's `build.gradle` file using `debugImplementation`, as shown in the following example:

### Groovy

```groovy
dependencies {
    def fragment_version = "1.5.4"

    debugImplementation "androidx.fragment:fragment-testing:$fragment_version"
}
```

### Kotlin

```kotlin
dependencies {
    val fragment_version = "1.5.4"

    debugImplementation("androidx.fragment:fragment-testing:$fragment_version")
}
```

Testing examples in this document use assertions from the Espresso and Truth libraries. For information on other available testing and assertion libraries, see Set up project for AndroidX Test.

Create a fragment
-----------------

`FragmentScenario` includes the following methods for launching fragments in tests:

*   `launchInContainer()`), for testing a fragment's user interface. `FragmentScenario` attaches the fragment to an activity's root view controller. This containing activity is otherwise empty.
*   `launch()`), for testing without the fragment's user interface. `FragmentScenario` attaches this type of fragment to an _empty activity_, one that doesn't have a root view.

After launching one of these fragment types, `FragmentScenario` drives the fragment under test to a specified state. By default this state is `RESUMED`, but you can override this with the `initialState` argument. The `RESUMED` state indicates that the fragment is running and visible to the user. You can evaluate information about its UI elements using Espresso UI tests.

The following code examples show how to launch your fragment using each method:

**launchInContainer() example**

```kotlin
    @RunWith(AndroidJUnit4::class)
    class MyTestSuite {
        @Test fun testEventFragment() {
            // The "fragmentArgs" argument is optional.
            val fragmentArgs = bundleOf(“selectedListItem” to 0)
            val scenario = launchFragmentInContainer<EventFragment>(fragmentArgs)
            ...
        }
    }
```

**launch() example**

```kotlin
    @RunWith(AndroidJUnit4::class)
    class MyTestSuite {
        @Test fun testEventFragment() {
            // The "fragmentArgs" arguments are optional.
            val fragmentArgs = bundleOf("numElements" to 0)
            val scenario = launchFragment<EventFragment>(fragmentArgs)
            ...
        }
    }
```

Provide dependencies
--------------------

If your fragments have dependencies, you can provide test versions of these dependencies by providing a custom `FragmentFactory` to the `launchInContainer()` or `launch()` methods.

```kotlin
    @RunWith(AndroidJUnit4::class)
    class MyTestSuite {
        @Test fun testEventFragment() {
            val someDependency = TestDependency()
            launchFragmentInContainer {
                EventFragment(someDependency)
            }
            ...
        }
    }
    
```

For more information about using `FragmentFactory` to provide dependencies to fragments, see Fragment manager.

Drive the fragment to a new state
---------------------------------

In your app's UI tests, it's usually sufficient to launch the fragment under test and start testing it from a `RESUMED` state. In finer-grained unit tests, however, you might also evaluate the fragment's behavior as it transitions from one lifecycle state to another. You can specify the initial state by passing the `initialState` argument to any of the `launchFragment*()` functions.

To drive the fragment to a different lifecycle state, call `moveToState()`). This method supports the following states as arguments: `CREATED`, `STARTED`, `RESUMED`, and `DESTROYED`. This method simulates a situation where the fragment or activity containing your fragment changes its state for any reason.

The following example launches a test fragment in the `INITIALIZED` state and then moves it to the `RESUMED` state:

```kotlin
    @RunWith(AndroidJUnit4::class)
    class MyTestSuite {
        @Test fun testEventFragment() {
            val scenario = launchFragmentInContainer<EventFragment>(
                initialState = Lifecycle.State.INITIALIZED
            )
            // EventFragment has gone through onAttach(), but not onCreate().
            // Verify the initial state.
            scenario.moveToState(Lifecycle.State.RESUMED)
            // EventFragment moves to CREATED -> STARTED -> RESUMED.
            ...
        }
    }
```

Recreate the fragment
---------------------

If your app is running on a device which is low on resources, the system might destroy the activity containing your fragment. This situation requires your app to recreate the fragment when the user returns to it. To simulate this situation, call `recreate()`:

```kotlin
    @RunWith(AndroidJUnit4::class)
    class MyTestSuite {
        @Test fun testEventFragment() {
            val scenario = launchFragmentInContainer<EventFragment>()
            scenario.recreate()
            ...
        }
    }
```

`FragmentScenario.recreate()`) destroys the fragment and its host and then recreates them. When the `FragmentScenario` class recreates the fragment under test, the fragment returns to the lifecycle state that it was in before it was destroyed.

Interacting with UI fragments
-----------------------------

To trigger UI actions in your fragment under test, use Espresso view matchers to interact with elements in your view:

```kotlin
    @RunWith(AndroidJUnit4::class)
    class MyTestSuite {
        @Test fun testEventFragment() {
            val scenario = launchFragmentInContainer<EventFragment>()
            onView(withId(R.id.refresh)).perform(click())
            // Assert some expected behavior
            ...
        }
    }
```

If you need to call a method on the fragment itself, such as responding to a selection in the options menu, you can do so safely by getting a reference to the fragment using `FragmentScenario.onFragment()`) and passing in a `FragmentAction`:

```kotlin
    @RunWith(AndroidJUnit4::class)
    class MyTestSuite {
        @Test fun testEventFragment() {
            val scenario = launchFragmentInContainer<EventFragment>()
            scenario.onFragment { fragment ->
                fragment.myInstanceMethod()
            }
        }
    }
```

Test dialog actions
-------------------

`FragmentScenario` also supports testing dialog fragments. Though dialog fragments have UI elements, their layout is populated in a separate window, rather than in the activity itself. For this reason, use `FragmentScenario.launch()` to test dialog fragments.

The following example tests the dialog dismissal process:

```kotlin
    @RunWith(AndroidJUnit4::class)
    class MyTestSuite {
        @Test fun testDismissDialogFragment() {
            // Assumes that "MyDialogFragment" extends the DialogFragment class.
            with(launchFragment<MyDialogFragment>()) {
                onFragment { fragment ->
                    assertThat(fragment.dialog).isNotNull()
                    assertThat(fragment.requireDialog().isShowing).isTrue()
                    fragment.dismiss()
                    fragment.parentFragmentManager.executePendingTransactions()
                    assertThat(fragment.dialog).isNull()
                }
            }
    
            // Assumes that the dialog had a button
            // containing the text "Cancel".
            onView(withText("Cancel")).check(doesNotExist())
        }
    }
 ```