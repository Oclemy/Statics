# Loaders

Loaders have been deprecated as of Android P (API 28). The recommended option for dealing with loading data while handling the Activity and Fragment lifecycles is to use a combination of `ViewModels` and `LiveData`. ViewModels survive configuration changes like Loaders but with less boilerplate. LiveData provides a lifecycle-aware way of loading data that you can reuse in multiple ViewModels. You can also combine LiveData using `MediatorLiveData` , and any observable queries, such as those from a Room database, can be used to observe changes to the data. ViewModels and LiveData are also available in situations where you do not have access to the `LoaderManager`, such as in a `Service`. Using the two in tandem provides an easy way to access the data your app needs without having to deal with the UI lifecycle. To learn more about LiveData see the LiveData guide and to learn more about ViewModels see the ViewModel guide.

The Loader API lets you load data from a content provider or other data source for display in an `FragmentActivity` or `Fragment`. If you don't understand why you need the Loader API to perform this seemingly trivial operation, then first consider some of the problems you might encounter without loaders:

*   If you fetch the data directly in the activity or fragment, your users will suffer from lack of responsiveness due to performing potentially slow queries from the UI thread.
*   If you fetch the data from another thread, perhaps with `AsyncTask`, then you're responsible for managing both the thread and the UI thread through various activity or fragment lifecycle events, such as `onDestroy()` and configurations changes.

Loaders solve these problems and includes other benefits. For example:

*   Loaders run on separate threads to prevent janky or unresponsive UI.
*   Loaders simplify thread management by providing callback methods when events occur.
*   Loaders persist and cache results across configuration changes to prevent duplicate queries.
*   Loaders can implement an observer to monitor for changes in the underlying data source. For example, `CursorLoader` automatically registers a `ContentObserver` to trigger a reload when data changes.

Loader API Summary
------------------

There are multiple classes and interfaces that may be involved when using loaders in an app. They are summarized in this table:

Class/Interface

Description

`LoaderManager`

An abstract class associated with an `FragmentActivity` or `Fragment` for managing one or more `Loader` instances. There is only one `LoaderManager` per activity or fragment, but a `LoaderManager` can manage multiple loaders.

To get LoaderManager, call `getSupportLoaderManager()` from the activity or fragment.

To start loading data from a loader, call either `initLoader()` or `restartLoader()`. The system automatically determines whether a loader with the same integer ID already exists and will either create a new loader or reuse an existing loader.

`LoaderManager.LoaderCallbacks`

This interface contains callback methods that are called when loader events occur. The interface defines three callback methods:

*   `onCreateLoader(int, Bundle)` - called when the system needs a new loader to be created. Your code should create a `Loader` object and return it to the system.
*   `onLoadFinished(Loader<D>, D)` - called when a loader has finished loading data. Typically, your code should display the data to the user.
*   `onLoaderReset(Loader<D>)` - called when a previously created loader is being reset (when you call `destroyLoader(int)` or when the activity or fragment is destroyed , and thus making its data unavailable. Your code should remove any references it has to the loader's data.

This interface is typically implemented by your activity or fragment and is registered when you call `initLoader()` or `restartLoader()`.

`Loader`

Loaders perform the loading of data. This class is abstract and serves as the base class for all loaders. You can directly subclass `Loader` or use one of the following built-in subclasses to simplify implementation:

*   `AsyncTaskLoader` - an abstract loader that provides an `AsyncTask` to perform load operations on a separate thread.
*   `CursorLoader` - a concrete subclass of `AsyncTaskLoader` for asynchronously loading data from a `ContentProvider`. It queries a `ContentResolver` and returns a `Cursor`.

The following sections show you how to use these classes and interfaces in an application.

Using Loaders in an Application
-------------------------------

This section describes how to use loaders in an Android application. An application that uses loaders typically includes the following:

*   An `FragmentActivity` or `Fragment`.
*   An instance of the `LoaderManager`.
*   A `CursorLoader` to load data backed by a `ContentProvider`. Alternatively, you can implement your own subclass of `Loader` or `AsyncTaskLoader` to load data from some other source.
*   An implementation for `LoaderManager.LoaderCallbacks`. This is where you create new loaders and manage your references to existing loaders.
*   A way of displaying the loader's data, such as a `SimpleCursorAdapter`.
*   A data source, such as a `ContentProvider`, when using a `CursorLoader`.

### Starting a Loader

The `LoaderManager` manages one or more `Loader` instances within an `FragmentActivity` or `Fragment`. There is only one `LoaderManager` per activity or fragment.

You typically initialize a `Loader` within the activity's `onCreate()` method, or within the fragment's `onCreate()` method. You do this as follows:

### Kotlin

```kotlin
supportLoaderManager.initLoader(0, null, this)
```

### Java

```java
// Prepare the loader.  Either re-connect with an existing one,
// or start a new one.
getSupportLoaderManager().initLoader(0, null, this);
```

The `initLoader()` method takes the following parameters:

*   A unique ID that identifies the loader. In this example, the ID is 0.
*   Optional arguments to supply to the loader at construction (`null` in this example).
*   A `LoaderManager.LoaderCallbacks` implementation, which the `LoaderManager` calls to report loader events. In this example, the local class implements the `LoaderManager.LoaderCallbacks` interface, so it passes a reference to itself, `this`.

The `initLoader()` call ensures that a loader is initialized and active. It has two possible outcomes:

*   If the loader specified by the ID already exists, the last created loader is reused.
*   If the loader specified by the ID does _not_ exist, `initLoader()` triggers the `LoaderManager.LoaderCallbacks` method `onCreateLoader()`. This is where you implement the code to instantiate and return a new loader. For more discussion, see the section onCreateLoader.

In either case, the given `LoaderManager.LoaderCallbacks` implementation is associated with the loader, and will be called when the loader state changes. If at the point of this call the caller is in its started state, and the requested loader already exists and has generated its data, then the system calls `onLoadFinished()` immediately (during `initLoader()`), so you must be prepared for this to happen. See onLoadFinished for more discussion of this callback

Note that the `initLoader()` method returns the `Loader` that is created, but you don't need to capture a reference to it. The `LoaderManager` manages the life of the loader automatically. The `LoaderManager` starts and stops loading when necessary, and maintains the state of the loader and its associated content. As this implies, you rarely interact with loaders directly (though for an example of using loader methods to fine-tune a loader's behavior, see the LoaderThrottle sample). You most commonly use the `LoaderManager.LoaderCallbacks` methods to intervene in the loading process when particular events occur. For more discussion of this topic, see Using the LoaderManager Callbacks.

### Restarting a Loader

When you use `initLoader()`, as shown above, it uses an existing loader with the specified ID if there is one. If there isn't, it creates one. But sometimes you want to discard your old data and start over.

To discard your old data, you use `restartLoader()`. For example, this implementation of `SearchView.OnQueryTextListener` restarts the loader when the user's query changes. The loader needs to be restarted so that it can use the revised search filter to do a new query:

### Kotlin

```kotlin
fun onQueryTextChanged(newText: String?): Boolean {
    // Called when the action bar search text has changed.  Update
    // the search filter, and restart the loader to do a new query
    // with this filter.
    curFilter = if (newText?.isNotEmpty() == true) newText else null
    supportLoaderManager.restartLoader(0, null, this)
    return true
}
```

### Java

```java
public boolean onQueryTextChanged(String newText) {
    // Called when the action bar search text has changed.  Update
    // the search filter, and restart the loader to do a new query
    // with this filter.
    curFilter = !TextUtils.isEmpty(newText) ? newText : null;
    getSupportLoaderManager().restartLoader(0, null, this);
    return true;
}
```

### Using the LoaderManager Callbacks

`LoaderManager.LoaderCallbacks` is a callback interface that lets a client interact with the `LoaderManager`.

Loaders, in particular `CursorLoader`, are expected to retain their data after being stopped. This allows applications to keep their data across the activity or fragment's `onStop()` and `onStart()` methods, so that when users return to an application, they don't have to wait for the data to reload. You use the `LoaderManager.LoaderCallbacks` methods when to know when to create a new loader, and to tell the application when it is time to stop using a loader's data.

`LoaderManager.LoaderCallbacks` includes these methods:

*   `onCreateLoader()` — Instantiate and return a new `Loader` for the given ID.

*   `onLoadFinished()` — Called when a previously created loader has finished its load.

*   `onLoaderReset()` — Called when a previously created loader is being reset, thus making its data unavailable.

These methods are described in more detail in the following sections.

#### onCreateLoader

When you attempt to access a loader (for example, through `initLoader()`), it checks to see whether the loader specified by the ID exists. If it doesn't, it triggers the `LoaderManager.LoaderCallbacks` method `onCreateLoader()`. This is where you create a new loader. Typically this will be a `CursorLoader`, but you can implement your own `Loader` subclass.

In this example, the `onCreateLoader()` callback method creates a `CursorLoader`. You must build the `CursorLoader` using its constructor method, which requires the complete set of information needed to perform a query to the `ContentProvider`. Specifically, it needs:

*   _uri_ — The URI for the content to retrieve.
*   _projection_ — A list of which columns to return. Passing `null` will return all columns, which is inefficient.
*   _selection_ — A filter declaring which rows to return, formatted as an SQL WHERE clause (excluding the WHERE itself). Passing `null` will return all rows for the given URI.
*   _selectionArgs_ — You may include ?s in the selection, which will be replaced by the values from _selectionArgs_, in the order that they appear in the selection. The values will be bound as Strings.
*   _sortOrder_ — How to order the rows, formatted as an SQL ORDER BY clause (excluding the ORDER BY itself). Passing `null` will use the default sort order, which may be unordered.

For example:

### Kotlin

```kotlin
// If non-null, this is the current filter the user has provided.
private var curFilter: String? = null
...
override fun onCreateLoader(id: Int, args: Bundle?): Loader<Cursor> {
    // This is called when a new Loader needs to be created.  This
    // sample only has one Loader, so we don't care about the ID.
    // First, pick the base URI to use depending on whether we are
    // currently filtering.
    val baseUri: Uri = if (curFilter != null) {
        Uri.withAppendedPath(ContactsContract.Contacts.CONTENT_URI, Uri.encode(curFilter))
    } else {
        ContactsContract.Contacts.CONTENT_URI
    }

    // Now create and return a CursorLoader that will take care of
    // creating a Cursor for the data being displayed.
    val select: String = "((${Contacts.DISPLAY_NAME} NOTNULL) AND (" +
            "${Contacts.HAS_PHONE_NUMBER}=1) AND (" +
            "${Contacts.DISPLAY_NAME} != ''))"
    return (activity as? Context)?.let { context ->
        CursorLoader(
                context,
                baseUri,
                CONTACTS_SUMMARY_PROJECTION,
                select,
                null,
                "${Contacts.DISPLAY_NAME} COLLATE LOCALIZED ASC"
        )
    } ?: throw Exception("Activity cannot be null")
}
```

### Java

```java
// If non-null, this is the current filter the user has provided.
String curFilter;
...
public Loader<Cursor> onCreateLoader(int id, Bundle args) {
    // This is called when a new Loader needs to be created.  This
    // sample only has one Loader, so we don't care about the ID.
    // First, pick the base URI to use depending on whether we are
    // currently filtering.
    Uri baseUri;
    if (curFilter != null) {
        baseUri = Uri.withAppendedPath(Contacts.CONTENT_FILTER_URI,
                  Uri.encode(curFilter));
    } else {
        baseUri = Contacts.CONTENT_URI;
    }

    // Now create and return a CursorLoader that will take care of
    // creating a Cursor for the data being displayed.
    String select = "((" + Contacts.DISPLAY_NAME + " NOTNULL) AND ("
            + Contacts.HAS_PHONE_NUMBER + "=1) AND ("
            + Contacts.DISPLAY_NAME + " != '' ))";
    return new CursorLoader(getActivity(), baseUri,
            CONTACTS_SUMMARY_PROJECTION, select, null,
            Contacts.DISPLAY_NAME + " COLLATE LOCALIZED ASC");
}
```

#### onLoadFinished

This method is called when a previously created loader has finished its load. This method is guaranteed to be called prior to the release of the last data that was supplied for this loader. At this point you should remove all use of the old data (since it will be released soon), but should not do your own release of the data since its loader owns it and will take care of that.

The loader will release the data once it knows the application is no longer using it. For example, if the data is a cursor from a `CursorLoader`, you should not call `close()` on it yourself. If the cursor is being placed in a `CursorAdapter`, you should use the `swapCursor()` method so that the old `Cursor` is not closed. For example:

### Kotlin

```kotlin
private lateinit var adapter: SimpleCursorAdapter
...

override fun onLoadFinished(loader: Loader<Cursor>, data: Cursor?) {
    // Swap the new cursor in.  (The framework will take care of closing the
    // old cursor once we return.)
    adapter.swapCursor(data)
}
```

### Java

```java
// This is the Adapter being used to display the list's data.
SimpleCursorAdapter adapter;
...

public void onLoadFinished(Loader<Cursor> loader, Cursor data) {
    // Swap the new cursor in.  (The framework will take care of closing the
    // old cursor once we return.)
    adapter.swapCursor(data);
}
```

#### onLoaderReset

This method is called when a previously created loader is being reset, thus making its data unavailable. This callback lets you find out when the data is about to be released so you can remove your reference to it.  

This implementation calls `swapCursor()` with a value of `null`:

### Kotlin

```kotlin
private lateinit var adapter: SimpleCursorAdapter
...

override fun onLoaderReset(loader: Loader<Cursor>) {
    // This is called when the last Cursor provided to onLoadFinished()
    // above is about to be closed.  We need to make sure we are no
    // longer using it.
    adapter.swapCursor(null)
}
```

### Java

```java
// This is the Adapter being used to display the list's data.
SimpleCursorAdapter adapter;
...

public void onLoaderReset(Loader<Cursor> loader) {
    // This is called when the last Cursor provided to onLoadFinished()
    // above is about to be closed.  We need to make sure we are no
    // longer using it.
    adapter.swapCursor(null);
}
```

Example
-------

As an example, here is the full implementation of a `Fragment` that displays a `ListView` containing the results of a query against the contacts content provider. It uses a `CursorLoader` to manage the query on the provider.

For an application to access a user's contacts, as shown in this example, its manifest must include the permission `READ_CONTACTS`.

### Kotlin

```kotlin
private val CONTACTS_SUMMARY_PROJECTION: Array<String> = arrayOf(
        Contacts._ID,
        Contacts.DISPLAY_NAME,
        Contacts.CONTACT_STATUS,
        Contacts.CONTACT_PRESENCE,
        Contacts.PHOTO_ID,
        Contacts.LOOKUP_KEY
)

class CursorLoaderListFragment :
        ListFragment(),
        SearchView.OnQueryTextListener,
        LoaderManager.LoaderCallbacks<Cursor> {

    // This is the Adapter being used to display the list's data.
    private lateinit var mAdapter: SimpleCursorAdapter

    // If non-null, this is the current filter the user has provided.
    private var curFilter: String? = null

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)

        // Prepare the loader.  Either re-connect with an existing one,
        // or start a new one.
        loaderManager.initLoader(0, null, this)
    }

    override fun onViewCreated(view: View, savedInstanceState: Bundle?) {
        super.onViewCreated(view, savedInstanceState)

        // Give some text to display if there is no data.  In a real
        // application this would come from a resource.
        setEmptyText("No phone numbers")

        // We have a menu item to show in action bar.
        setHasOptionsMenu(true)

        // Create an empty adapter we will use to display the loaded data.
        mAdapter = SimpleCursorAdapter(activity,
                android.R.layout.simple_list_item_2,
                null,
                arrayOf(Contacts.DISPLAY_NAME, Contacts.CONTACT_STATUS),
                intArrayOf(android.R.id.text1, android.R.id.text2),
                0
        )
        listAdapter = mAdapter
    }

    override fun onCreateOptionsMenu(menu: Menu, inflater: MenuInflater) {
        // Place an action bar item for searching.
        menu.add("Search").apply {
            setIcon(android.R.drawable.ic_menu_search)
            setShowAsAction(MenuItem.SHOW_AS_ACTION_IF_ROOM)
            actionView = SearchView(activity).apply {
                setOnQueryTextListener(this@CursorLoaderListFragment)
            }
        }
    }

    override fun onQueryTextChange(newText: String?): Boolean {
        // Called when the action bar search text has changed.  Update
        // the search filter, and restart the loader to do a new query
        // with this filter.
        curFilter = if (newText?.isNotEmpty() == true) newText else null
        loaderManager.restartLoader(0, null, this)
        return true
    }

    override fun onQueryTextSubmit(query: String): Boolean {
        // Don't care about this.
        return true
    }

    override fun onListItemClick(l: ListView, v: View, position: Int, id: Long) {
        // Insert desired behavior here.
        Log.i("FragmentComplexList", "Item clicked: $id")
    }

    override fun onCreateLoader(id: Int, args: Bundle?): Loader<Cursor> {
        // This is called when a new Loader needs to be created.  This
        // sample only has one Loader, so we don't care about the ID.
        // First, pick the base URI to use depending on whether we are
        // currently filtering.
        val baseUri: Uri = if (curFilter != null) {
            Uri.withAppendedPath(Contacts.CONTENT_URI, Uri.encode(curFilter))
        } else {
            Contacts.CONTENT_URI
        }

        // Now create and return a CursorLoader that will take care of
        // creating a Cursor for the data being displayed.
        val select: String = "((${Contacts.DISPLAY_NAME} NOTNULL) AND (" +
                "${Contacts.HAS_PHONE_NUMBER}=1) AND (" +
                "${Contacts.DISPLAY_NAME} != ''))"
        return (activity as? Context)?.let { context ->
            CursorLoader(
                    context,
                    baseUri,
                    CONTACTS_SUMMARY_PROJECTION,
                    select,
                    null,
                    "${Contacts.DISPLAY_NAME} COLLATE LOCALIZED ASC"
            )
        } ?: throw Exception("Activity cannot be null")
    }

    override fun onLoadFinished(loader: Loader<Cursor>, data: Cursor) {
        // Swap the new cursor in.  (The framework will take care of closing the
        // old cursor once we return.)
        mAdapter.swapCursor(data)
    }

    override fun onLoaderReset(loader: Loader<Cursor>) {
        // This is called when the last Cursor provided to onLoadFinished()
        // above is about to be closed.  We need to make sure we are no
        // longer using it.
        mAdapter.swapCursor(null)
    }
}
```

### Java

```java
public static class CursorLoaderListFragment extends ListFragment
        implements OnQueryTextListener, LoaderManager.LoaderCallbacks<Cursor> {

    // This is the Adapter being used to display the list's data.
    SimpleCursorAdapter mAdapter;

    // If non-null, this is the current filter the user has provided.
    String curFilter;

    @Override public void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);

        // Prepare the loader.  Either re-connect with an existing one,
        // or start a new one.
        getLoaderManager().initLoader(0, null, this);
    }

    @Override public void onViewCreated(@NonNull View view, Bundle savedInstanceState) {
        super.onViewCreated(view, savedInstanceState);

        // Give some text to display if there is no data.  In a real
        // application this would come from a resource.
        setEmptyText("No phone numbers");

        // We have a menu item to show in action bar.
        setHasOptionsMenu(true);

        // Create an empty adapter we will use to display the loaded data.
        mAdapter = new SimpleCursorAdapter(getActivity(),
                android.R.layout.simple_list_item_2, null,
                new String[] { Contacts.DISPLAY_NAME, Contacts.CONTACT_STATUS },
                new int[] { android.R.id.text1, android.R.id.text2 }, 0);
        setListAdapter(mAdapter);
    }

    @Override public void onCreateOptionsMenu(Menu menu, MenuInflater inflater) {
        // Place an action bar item for searching.
        MenuItem item = menu.add("Search");
        item.setIcon(android.R.drawable.ic_menu_search);
        item.setShowAsAction(MenuItem.SHOW_AS_ACTION_IF_ROOM);
        SearchView sv = new SearchView(getActivity());
        sv.setOnQueryTextListener(this);
        item.setActionView(sv);
    }

    public boolean onQueryTextChange(String newText) {
        // Called when the action bar search text has changed.  Update
        // the search filter, and restart the loader to do a new query
        // with this filter.
        curFilter = !TextUtils.isEmpty(newText) ? newText : null;
        getLoaderManager().restartLoader(0, null, this);
        return true;
    }

    @Override public boolean onQueryTextSubmit(String query) {
        // Don't care about this.
        return true;
    }

    @Override public void onListItemClick(ListView l, View v, int position, long id) {
        // Insert desired behavior here.
        Log.i("FragmentComplexList", "Item clicked: " + id);
    }

    // These are the Contacts rows that we will retrieve.
    static final String[] CONTACTS_SUMMARY_PROJECTION = new String[] {
        Contacts._ID,
        Contacts.DISPLAY_NAME,
        Contacts.CONTACT_STATUS,
        Contacts.CONTACT_PRESENCE,
        Contacts.PHOTO_ID,
        Contacts.LOOKUP_KEY,
    };
    public Loader<Cursor> onCreateLoader(int id, Bundle args) {
        // This is called when a new Loader needs to be created.  This
        // sample only has one Loader, so we don't care about the ID.
        // First, pick the base URI to use depending on whether we are
        // currently filtering.
        Uri baseUri;
        if (curFilter != null) {
            baseUri = Uri.withAppendedPath(Contacts.CONTENT_FILTER_URI,
                    Uri.encode(curFilter));
        } else {
            baseUri = Contacts.CONTENT_URI;
        }

        // Now create and return a CursorLoader that will take care of
        // creating a Cursor for the data being displayed.
        String select = "((" + Contacts.DISPLAY_NAME + " NOTNULL) AND ("
                + Contacts.HAS_PHONE_NUMBER + "=1) AND ("
                + Contacts.DISPLAY_NAME + " != '' ))";
        return new CursorLoader(getActivity(), baseUri,
                CONTACTS_SUMMARY_PROJECTION, select, null,
                Contacts.DISPLAY_NAME + " COLLATE LOCALIZED ASC");
    }

    public void onLoadFinished(Loader<Cursor> loader, Cursor data) {
        // Swap the new cursor in.  (The framework will take care of closing the
        // old cursor once we return.)
        mAdapter.swapCursor(data);
    }

    public void onLoaderReset(Loader<Cursor> loader) {
        // This is called when the last Cursor provided to onLoadFinished()
        // above is about to be closed.  We need to make sure we are no
        // longer using it.
        mAdapter.swapCursor(null);
    }
}
```

### More Examples

The following examples illustrate how to use loaders:

*   LoaderCursor - a complete version of the snippet shown above.
*   Retrieving a List of Contacts - a walkthrough that uses a `CursorLoader` to retrieve data from the contacts provider.
*   LoaderThrottle - an example of how to use throttling to reduce the number of queries a content provider performs when its data changes.
*   `AsyncTaskLoader` - an example that uses an `AsyncTaskLoader` to load the currently installed apps from the package manager.