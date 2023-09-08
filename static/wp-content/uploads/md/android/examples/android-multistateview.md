# Kotlin Android MultiState View example - Loading,Empty,Error etc

This is an example on how to display different states in app based on the status of your app's operations. For example loading state, empty state, error state and content state.

We will look at various solutions as well as examples.


## Solution 1: Use MultiStateView

> An android View that displays different content based on its state.

The four different states the view can be:

- Content
- Empty
- Error
- Loading

Check the demo images below:

[![screenshot](https://github.com/Kennyc1012/MultiStateView/raw/master/art/content.png)](https://github.com/Kennyc1012/MultiStateView/blob/master/art/content.png) [![screenshot](https://github.com/Kennyc1012/MultiStateView/raw/master/art/loading.png)](https://github.com/Kennyc1012/MultiStateView/blob/master/art/loading.png) [![screenshot](https://github.com/Kennyc1012/MultiStateView/raw/master/art/empty.png)](https://github.com/Kennyc1012/MultiStateView/blob/master/art/empty.png) [![screenshot](https://github.com/Kennyc1012/MultiStateView/raw/master/art/error.png)](https://github.com/Kennyc1012/MultiStateView/blob/master/art/error.png) Here's how you use it:

### Step 1: Install it

Register jitpack as a repository in `YOUR_PROJECT/build.gradle`:

```groovy
repositories {
    maven { url 'https://jitpack.io' }
}
```

Then add the dependency in your `app/build.gradle`:

```groovy
dependencies {
    implementation  'com.github.Kennyc1012:MultiStateView:2.2.0'
}
```

### Step 2: Add to Layout

Wrap your content with the `MultiStateView` widget;

```xml
<com.kennyc.view.MultiStateView xmlns:android="http://schemas.android.com/apk/res/android"
    xmlns:tools="http://schemas.android.com/tools"
    xmlns:app="http://schemas.android.com/apk/res-auto"
    android:id="@+id/multiStateView"
    android:layout_width="match_parent"
    android:layout_height="match_parent"
    app:msv_errorView="@layout/error_view"
    app:msv_emptyView="@layout/empty_view"
    app:msv_loadingView="@layout/loading_view"
    app:msv_viewState="loading">

      <ListView
        android:id="@+id/list"
        android:layout_width="match_parent"
        android:layout_height="match_parent"
        tools:listitem="@android:layout/simple_list_item_1" />

</com.kennyc.view.MultiStateView>
```

Here are the attributes you can use:

```xml
<attr name="msv_loadingView" format="reference" />
<attr name="msv_emptyView" format="reference" />
<attr name="msv_errorView" format="reference" />
<attr name="msv_viewState" format="enum">
<attr name="msv_animateViewChanges" format="boolean" />
```

### Step 3: Write Code

In you Kotlin code you can then switch to the desired View state:

```kotlin
multiStateView.viewState = state: ViewState
```

You can also get the accompanying ViewState :

```kotlin
multiStateView.getView(state: ViewState):View?
```

### Full Example

Let us look at a full example.

#### Step 1: Create Project

Create android studio project or download the one provided.

#### Step 2: Install Library

Install the library as has been discussed.

#### Step 3: Create Menu

Create a menu resource with the different states:

**res/menu/menu_main.xml**

```xml
<menu xmlns:android="http://schemas.android.com/apk/res/android"
    xmlns:app="http://schemas.android.com/apk/res-auto"
    xmlns:tools="http://schemas.android.com/tools"
    tools:context=".MainActivity">
    <item
        android:id="@+id/loading"
        android:title="Toggle Loading View"
        app:showAsAction="never" />
    <item
        android:id="@+id/error"
        android:title="Toggle Error View"
        app:showAsAction="never" />
    <item
        android:id="@+id/empty"
        android:title="Toggle Empty View"
        app:showAsAction="never" />
    <item
        android:id="@+id/content"
        android:title="Toggle Content View"
        app:showAsAction="never" />
</menu>
```

#### Step 4: Design Layout resources

Design layout resources with the states:

**(a). loading_view.xml**

Add a progressbar here:

```xml
<?xml version="1.0" encoding="utf-8"?>
<ProgressBar xmlns:android="http://schemas.android.com/apk/res/android"
    android:orientation="vertical"
    style="?android:progressBarStyleLarge"
    android:layout_width="wrap_content"
    android:layout_height="wrap_content"
    android:layout_gravity="center" />
```

**(b). error_view.xml**

Add a Textview to show error message as well as the retry button:

```xml
<?xml version="1.0" encoding="utf-8"?>
<LinearLayout xmlns:android="http://schemas.android.com/apk/res/android"
    android:orientation="vertical"
    android:layout_width="wrap_content"
    android:layout_height="wrap_content"
    android:layout_gravity="center"
    android:gravity="center_horizontal">

    <TextView
        android:layout_width="wrap_content"
        android:layout_height="wrap_content"
        android:text="Whoops! Something went wrong" />

    <Button
        android:id="@+id/retry"
        style="?android:borderlessButtonStyle"
        android:layout_width="wrap_content"
        android:layout_height="wrap_content"
        android:text="Retry" />

</LinearLayout>
```

**(c). empty_view.xml**

Add a textview to show a `No results` message:

```xml
<?xml version="1.0" encoding="utf-8"?>
<TextView xmlns:android="http://schemas.android.com/apk/res/android"
    android:orientation="vertical"
    android:layout_width="wrap_content"
    android:layout_height="wrap_content"
    android:layout_gravity="center"
    android:text="No Results Found" />
```

**(d). activity_main.xml**

This is the content layout. Add a `MultiStateView` here, wrapping your content:

```xml
<com.kennyc.view.MultiStateView xmlns:android="http://schemas.android.com/apk/res/android"
    xmlns:tools="http://schemas.android.com/tools"
    xmlns:app="http://schemas.android.com/apk/res-auto"
    android:id="@+id/multiStateView"
    android:layout_width="match_parent"
    android:layout_height="match_parent"
    app:msv_errorView="@layout/error_view"
    app:msv_emptyView="@layout/empty_view"
    app:msv_loadingView="@layout/loading_view"
    app:msv_viewState="content"
    app:msv_animateViewChanges="true"
    tools:context=".MainActivity">

    <ListView
        android:id="@+id/list"
        android:layout_width="match_parent"
        android:layout_height="match_parent"
        tools:listitem="@android:layout/simple_list_item_1" />

</com.kennyc.view.MultiStateView>
```

#### Step 5: Write Code

replace your `MainActivity` with following code:

**MainActivity.kt**

```kotlin
import android.os.Bundle
import android.util.Log
import android.view.Menu
import android.view.MenuItem
import android.widget.ArrayAdapter
import android.widget.Button
import android.widget.ListView
import android.widget.Toast
import androidx.appcompat.app.AppCompatActivity
import com.kennyc.view.MultiStateView

class MainActivity : AppCompatActivity(), MultiStateView.StateListener {
    private lateinit var multiStateView: MultiStateView

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_main)
        multiStateView = findViewById(R.id.multiStateView)
        multiStateView.listener = this
        multiStateView.getView(MultiStateView.ViewState.ERROR)?.findViewById<Button>(R.id.retry)
                ?.setOnClickListener {
                    multiStateView.viewState = MultiStateView.ViewState.LOADING
                    Toast.makeText(applicationContext, "Fetching Data", Toast.LENGTH_SHORT).show()
                    multiStateView.postDelayed({ multiStateView.viewState = MultiStateView.ViewState.CONTENT }, 3000L)
                }

        val list: ListView = multiStateView.findViewById(R.id.list)

        val data = arrayOfNulls<String>(100)
        for (i in 0..99) {
            data[i] = "Row $i"
        }

        list.adapter = ArrayAdapter<String>(applicationContext, android.R.layout.simple_list_item_1, data)
    }

    override fun onCreateOptionsMenu(menu: Menu): Boolean {
        menuInflater.inflate(R.menu.menu_main, menu)
        return true
    }

    override fun onOptionsItemSelected(item: MenuItem): Boolean {
        when (item.itemId) {
            R.id.error -> {
                multiStateView.viewState = MultiStateView.ViewState.ERROR
                return true
            }

            R.id.empty -> {
                multiStateView.viewState = MultiStateView.ViewState.EMPTY
                return true
            }

            R.id.content -> {
                multiStateView.viewState = MultiStateView.ViewState.CONTENT
                return true
            }

            R.id.loading -> {
                multiStateView.viewState = MultiStateView.ViewState.LOADING
                return true
            }
        }

        return super.onOptionsItemSelected(item)
    }

    override fun onStateChanged(viewState: MultiStateView.ViewState) {
        Log.v("MSVSample", "onStateChanged; viewState: $viewState")
    }
}
```

### Reference

Here are the reference links:

| Number | Link |
| --- | --- |
| 1. | [Download](https://downgit.github.io/#/home?url=https://github.com/Kennyc1012/MultiStateView/tree/master/sample) Example |
| 2. | [Read](https://github.com/Kennyc1012/MultiStateView/) more |
| 3. | [Follow](https://github.com/Kennyc1012/) code author |
