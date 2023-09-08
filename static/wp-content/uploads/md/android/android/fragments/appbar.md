# Working with the AppBar

The top app bar provides a consistent place along the top of your app window for displaying information and actions from the current screen.

![an example top app bar](https://developer.android.com/static/images/guide/fragments/top-app-bar.png)

**Figure 1.** An example top app bar.

When using fragments, the app bar can be implemented as an `ActionBar` that is owned by the host activity or a toolbar within your fragment's layout. Ownership of the app bar varies depending on the needs of your app.

If all your screens use the same app bar that's always at the top and spans the width of the screen, then you should use a theme-provided action bar hosted by the activity. Using theme app bars helps to maintain a consistent look and provides a place to host option menus and an up button.

Use a toolbar hosted by the fragment if you want more control over the size, placement, and animation of the app bar across multiple screens. For example, you might need a collapsing app bar or one that spans only half the width of the screen and is vertically centered.

Understanding the different approaches and employing a correct one saves you time and helps to ensure your app functions properly. Different situations require different approaches for things like inflating menus and responding to user interaction.

The examples in this topic reference an `ExampleFragment` that contains an editable profile. The fragment inflates the following XML-defined menu in its app bar:

```xml
    <!-- sample_menu.xml -->
    <menu
        xmlns:android="http://schemas.android.com/apk/res/android"
        xmlns:app="http://schemas.android.com/apk/res-auto">
    
        <item
            android:id="@+id/action_settings"
            android:icon="@drawable/ic_settings"
            android:title="@string/settings"
            app:showAsAction="ifRoom"/>
        <item
            android:id="@+id/action_done"
            android:icon="@drawable/ic_done"
            android:title="@string/done"
            app:showAsAction="ifRoom|withText"/>
    
    </menu>
    
```

The menu contains two options: one for navigating to a profile screen, and one to save any profile changes made.

Activity-owned app bar
----------------------

The app bar is most commonly owned by the host activity. When the app bar is owned by an activity, fragments can interact with the app bar by overriding framework methods that are called during fragment creation.

### Register with activity

You must inform the system that your app bar fragment is participating in the population of the options menu. To do this, call `setHasOptionsMenu(true)`) in your fragment's `onCreate(Bundle)` method, as shown in the following example:

### Kotlin

```kotlin
class ExampleFragment : Fragment() {
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setHasOptionsMenu(true)
    }
}
```

### Java

```java
public class ExampleFragment extends Fragment {
    @Override
    public void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setHasOptionsMenu(true);
    }
}
```

`setHasOptionsMenu(true)` tells the system that your fragment would like to receive menu-related callbacks. When a menu-related event occurs (creation, clicks, and so on), the event handling method is first called on the activity before being called on the fragment. Note that your application logic should not depend on this order. If multiple fragments are hosted by the same activity, each fragment can supply menu options. In this case, the callback order depends on the order in which the fragments were added.

### Inflating a menu

To merge your menu into the app bar's options menu, override `onCreateOptionsMenu()`) in your fragment. This method receives the current app bar menu and a `MenuInflater` as parameters. Use the menu inflater to create an instance of your fragment's menu, and then merge it into the current menu, as shown in the following example:

### Kotlin

```kotlin
class ExampleFragment : Fragment() {
    ...

    override fun onCreateOptionsMenu(menu: Menu, inflater: MenuInflater) {
        inflater.inflate(R.menu.sample_menu, menu)
    }
}
```

### Java

```java
public class ExampleFragment extends Fragment {
    ...

    @Override
    public void onCreateOptionsMenu(@NonNull Menu menu, @NonNull MenuInflater inflater) {
       inflater.inflate(R.menu.sample_menu, menu);
    }
}
```

Figure 2 shows the updated menu.

![the options menu now contains your menu fragment](https://developer.android.com/static/images/guide/fragments/app-bar-added.png)

**Figure 2.** The options menu now contains your menu fragment.

### Handling click events

Every activity and fragment that participates in the options menu is able to respond to touches. Fragment's `onOptionsItemSelected()`) receives the selected menu item as a parameter and returns a boolean to indicate whether or not the touch has been consumed. Once an activity or fragment returns `true` from `onOptionsItemSelected()`, no other participating fragments will receive the callback.

In your implementation of `onOptionsItemSelected()`, use a `switch` statement on the `itemId` of the menu item. If the selected item is yours, handle the touch appropriately and return `true` to indicate that the click event has been handled. If the selected item is not yours, call the `super` implementation. By default, the `super` implementation returns `false` to allow menu processing to continue.

### Kotlin

```kotlin
class ExampleFragment : Fragment() {
    ...

    override fun onOptionsItemSelected(item: MenuItem): Boolean {
        return when (item.itemId) {
            R.id.action_settings -> {
                // navigate to settings screen
                true
            }
            R.id.action_done -> {
                // save profile changes
                true
            }
            else -> super.onOptionsItemSelected(item)
        }
    }
}
```

### Java

```java
public class ExampleFragment extends Fragment {
    ...

    @Override
    public boolean onOptionsItemSelected(@NonNull MenuItem item) {
        switch (item.getItemId()) {
            case R.id.action_settings:  {
                // navigate to settings screen
                return true;
            }
            case R.id.action_done: {
                // save profile changes
                return true;
            }
            default:
                return super.onOptionsItemSelected(item);
        }

    }

}
```

### Dynamically modify menu

The logic to hide or show a button or change the icon should be placed in `onPrepareOptionsMenu()`). This method is called right before each instance that the menu is shown.

Continuing with the previous example, the **Save** button should be invisible until the user begins editing, and it should disappear after the user saves. Adding this logic to `onPrepareOptionsMenu()` ensures the menu is always presented correctly:

### Kotlin

```kotlin
class ExampleFragment : Fragment() {
    ...

    override fun onPrepareOptionsMenu(menu: Menu){
        super.onPrepareOptionsMenu(menu)
        val item = menu.findItem(R.id.action_done)
        item.isVisible = isEditing
    }
}
```

### Java

```java
public class ExampleFragment extends Fragment {
    ...

    @Override
    public void onPrepareOptionsMenu(@NonNull Menu menu) {
        super.onPrepareOptionsMenu(menu);
        MenuItem item = menu.findItem(R.id.action_done);
        item.setVisible(isEditing);
    }
}
```

When you need to update the menu—for example, when a user presses the **Edit** button to edit the profile info—you must call `invalidateOptionsMenu()`) on the host activity to request that the system call `onCreateOptionsMenu()`. Upon invalidation, you can make the updates in `onCreateOptionsMenu()`. Once the menu is inflated, the system calls `onPrepareOptionsMenu()` and updates the menu to reflect the fragment's current state.

### Kotlin

```kotlin
class ExampleFragment : Fragment() {
    ...

    fun updateOptionsMenu() {
        isEditing = !isEditing
        requireActivity().invalidateOptionsMenu()
    }
}
```

### Java

```java
public class ExampleFragment extends Fragment {
    ...

    public void updateOptionsMenu() {
        isEditing = !isEditing;
        requireActivity().invalidateOptionsMenu();
    }
}
```

Fragment-owned app bar
----------------------

If most screens in your app don't need an app bar, or if perhaps one screen needs a dramatically-different app bar, you can add a `Toolbar` to your fragment layout. Though you can add a `Toolbar` anywhere within your fragment's view hierarchy, you should generally keep it at the top of the screen. To use the `Toolbar` in your fragment, provide an ID and obtain a reference to it in your fragment, as you would with any other view.

```xml
    <androidx.appcompat.widget.Toolbar
        android:id="@+id/myToolbar"
        ... />
```

When using a fragment-owned app bar, we strongly recommended using the `Toolbar` APIs directly. Do _not_ use `setSupportActionBar()` and the `Fragment` menu APIs, which are appropriate only for activity-owned app bars.

### Inflating a menu

The `Toolbar` convenience method `inflateMenu(int)` takes the ID of a menu resource as a parameter. To inflate an XML menu resource into your toolbar, pass the `resId` to this method, as shown in the following example:

### Kotlin

```kotlin
class ExampleFragment : Fragment() {
    ...

    override fun onViewCreated(view: View, savedInstanceState: Bundle?) {
        ...

        viewBinding.myToolbar.inflateMenu(R.menu.sample_menu)
    }
}
```

### Java

```java
public class ExampleFragment extends Fragment {
    ...

    @Override
    public void onViewCreated(@NonNull View view, @Nullable Bundle savedInstanceState) {
        ...

        viewBinding.myToolbar.inflateMenu(R.menu.sample_menu);
    }

}
```

To inflate another XML menu resource, call the method again with the `resId` of the new menu. The new menu items are added to the menu, and the existing menu items are not modified or removed.

If you want to replace the existing menu set, clear the menu before calling `inflateMenu(int)` with the new menu ID.

### Kotlin

```kotlin
class ExampleFragment : Fragment() {
    ...

    fun clearToolbarMenu() {
        viewBinding.myToolbar.menu.clear()
    }
}
```

### Java

```java
public class ExampleFragment extends Fragment {

    ...
    public void clearToolbarMenu() {

        viewBinding.myToolbar.getMenu().clear()

    }

}
```

### Handling click events

You can pass an `OnMenuItemClickListener` directly to the toolbar using the `setOnMenuItemClickListener()`) method. This listener is invoked whenever a user selects a menu item from the action buttons presented at the end of the toolbar or the associated overflow. The selected `MenuItem` is passed to the listener's `onMenuItemClick()`) method and can be used to consume the action, as shown in the following example:

### Kotlin

```kotlin
class ExampleFragment : Fragment() {
    ...

    override fun onViewCreated(view: View, savedInstanceState: Bundle?) {
        ...

        viewBinding.myToolbar.setOnMenuItemClickListener {
            when (it.itemId) {
                R.id.action_settings -> {
                    // Navigate to settings screen
                    true
                }
                R.id.action_done -> {
                    // Save profile changes
                    true
                }
                else -> false
            }
        }
    }
}
```

### Java

```java
public class ExampleFragment extends Fragment {
    ...

    @Override
    public void onViewCreated(@NonNull View view, @Nullable Bundle savedInstanceState) {
        ...

        viewBinding.myToolbar.setOnMenuItemClickListener(item -> {
            switch (item.getItemId()) {
                case R.id.action_settings:
                    // Navigate to settings screen
                    return true;
                case R.id.action_done:
                    // Save profile changes
                    return true;
                default:
                    return false;
            }
        });
    }
}
```

### Dynamically modify menu

When your fragment owns the app bar, you can modify the `Toolbar` at runtime exactly as you would any other view.

Continuing with the previous example, the **Save** menu option should be invisible until the user begins editing, and it should disappear again when pressed:

### Kotlin

```kotlin
class ExampleFragment : Fragment() {
    ...

    fun updateToolbar() {
        isEditing = !isEditing

        val saveItem = viewBinding.myToolbar.menu.findItem(R.id.action_done)
        saveItem.isVisible = isEditing

    }
}
```

### Java

```java
public class ExampleFragment extends Fragment {
    ...

    public void updateToolbar() {
        isEditing = !isEditing;

        MenuItem saveItem = viewBinding.myToolbar.getMenu().findItem(R.id.action_done);
        saveItem.setVisible(isEditing);
    }

}
```

### Adding a navigation icon

If present, the navigation button appears at the start of the toolbar. Setting a navigation icon on the toolbar makes it visible. You can also set a navigation-specific `onClickListener()` that is called whenever the user clicks on the navigation button, as shown in the following example:

### Kotlin

```kotlin
class ExampleFragment : Fragment() {
    ...

    override fun onViewCreated(view: View, savedInstanceState: Bundle?) {
        ...

        myToolbar.setNavigationIcon(R.drawable.ic_back)

        myToolbar.setNavigationOnClickListener { view ->
            // Navigate somewhere
        }
    }
}
```

### Java

```java
public class ExampleFragment extends Fragment {
    ...

    @Override
    public void onViewCreated(@NonNull View view, @Nullable Bundle savedInstanceState) {
        ...

        viewBinding.myToolbar.setNavigationIcon(R.drawable.ic_back);
        viewBinding.myToolbar.setNavigationOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View view) {
                // Navigate somewhere
            }
        });
    }
}
```