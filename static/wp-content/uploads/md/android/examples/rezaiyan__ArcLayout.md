# ArcLayout


>  Arc Layout is a view group with which you can add a arc-shaped container in your layout..

Use this to create arced layouts for example in ToolBars.

![ArcLayout Tutorial](https://camo.githubusercontent.com/8e2330e0f81443700bab86ccd11ebbf39d96469ca43f4c48ee541475dfe4ecc7/68747470733a2f2f6a69747061636b2e696f2f762f72657a616979616e2f4172634c61796f75742e737667)


Here are the demos:

![ArcLayout Tutorial](https://raw.githubusercontent.com/rezaiyan/ArcLayout/master/sc/bottomNavigation.png)

![ArcLayout Tutorial](https://raw.githubusercontent.com/rezaiyan/ArcLayout/master/sc/toolbar2.png)

![ArcLayout Tutorial](https://raw.githubusercontent.com/rezaiyan/ArcLayout/master/sc/toolbar.png)

Follow these steps:

### Step 1: Add Maven Repository

First of all, Add it to your root `build.gradle` at the end of repositories:

```groovy
allprojects {
  repositories {
    ...
    maven { url 'https://jitpack.io' }
  }
}
```


### Step 2: Add Dependency

Add the dependency to your app `build.gradle` file:

```groovy
dependencies
{
    implementation 'com.github.rezaiyan:arclayout:1.0.1'
}
```

### Step 3: Add to Layout

Add the following to your xml layout

```xml
<ir.alirezaiyan.arclayout.ArcRelativeLayout
        android:layout_width="match_parent"
        android:layout_height="match_parent"
        app:arc_bottom_cropCurve="cropConcave|cropConvex"
        app:arc_top_cropCurve="cropConcave|cropConvex"
        app:arc_bottom_height="80dp"
        app:arc_top_height="80dp"
        app:arc_bottom_position="true"
        app:arc_top_position="true">

        <!-- YOUR CONTENT -->

    </ir.alirezaiyan.arclayout.ArcRelativeLayout>
```


### Full Example

Here is a full example.

#### Step 1. Design Layouts

For this project let's create the following layouts:

**(a). `item_list_content.xml`**

> Our `item_list_content` layout.

This layout will represent our Content List Item's layout. Specify [`LinearLayout`](https://android.camposha.info/en/linearlayout) as it's root element, then add the following [widgets](https://android.camposha.info/en/view):

1. [`TextView`](https://android.camposha.info/en/textview)

```xml
<?xml version="1.0" encoding="utf-8"?>
<LinearLayout xmlns:android="http://schemas.android.com/apk/res/android"
    android:layout_width="wrap_content"
    android:layout_height="wrap_content"
    android:orientation="horizontal">

    <TextView
        android:id="@+id/id_text"
        android:layout_width="wrap_content"
        android:layout_height="wrap_content"
        android:layout_margin="@dimen/text_margin"
        android:textAppearance="?attr/textAppearanceListItem" />

    <TextView
        android:id="@+id/content"
        android:layout_width="wrap_content"
        android:layout_height="wrap_content"
        android:layout_margin="@dimen/text_margin"
        android:textAppearance="?attr/textAppearanceListItem" />
</LinearLayout>
```

**(b). `item_list.xml`**

> Our `item_list` layout.

This layout will represent our List Item's layout. Specify [`RecyclerView`](https://android.camposha.info/en/recyclerview) as it's root element then inside it place the following [widgets](https://android.camposha.info/en/view):

```xml
<?xml version="1.0" encoding="utf-8"?>
<android.support.v7.widget.RecyclerView xmlns:android="http://schemas.android.com/apk/res/android"
    xmlns:app="http://schemas.android.com/apk/res-auto"
    xmlns:tools="http://schemas.android.com/tools"
    android:id="@+id/item_list"
    android:name="ir.alirezaiyan.arclayout.ItemListFragment"
    android:layout_width="match_parent"
    android:layout_height="match_parent"
    android:layout_marginLeft="16dp"
    android:layout_marginRight="16dp"
    app:layoutManager="android.support.v7.widget.LinearLayoutManager"
    tools:context=".MainActivity"
    tools:listitem="@layout/item_list_content" />
```

**(c). `item_detail.xml`**

> Our `item_detail` layout.

This layout will represent our Detail Item's layout. Specify [`TextView`](https://android.camposha.info/en/textview) as it's root element, then add the following [widgets](https://android.camposha.info/en/view):


```xml
<?xml version="1.0" encoding="utf-8"?>
<TextView xmlns:android="http://schemas.android.com/apk/res/android"
    xmlns:tools="http://schemas.android.com/tools"
    android:id="@+id/item_detail"
    style="?android:attr/textAppearanceLarge"
    android:layout_width="match_parent"
    android:layout_height="match_parent"
    android:padding="16dp"
    android:textIsSelectable="true"
    tools:context=".DetailFragment" />
```

**(d). `activity_main.xml`**

> Our `activity_main` layout.

This layout will represent our Main Activity's layout. Specify [`android.support.design.widget.CoordinatorLayout`](https://android.camposha.info/en/coordinatorlayout) as it's root element then inside it place the following [widgets](https://android.camposha.info/en/view):

1. [`AppBarLayout`](https://android.camposha.info/en/appbarlayout)
2. [`Toolbar`](https://android.camposha.info/en/toolbar)
3. [`FrameLayout`](https://android.camposha.info/en/framelayout)

```xml
<?xml version="1.0" encoding="utf-8"?>
<android.support.design.widget.CoordinatorLayout xmlns:android="http://schemas.android.com/apk/res/android"
    xmlns:app="http://schemas.android.com/apk/res-auto"
    xmlns:tools="http://schemas.android.com/tools"
    android:layout_width="match_parent"
    android:layout_height="match_parent"
    android:fitsSystemWindows="true"
    tools:context=".MainActivity">

    <android.support.design.widget.AppBarLayout
        android:id="@+id/app_bar"
        android:layout_width="match_parent"
        android:layout_height="wrap_content"
        android:theme="@style/AppTheme.AppBarOverlay">

        <android.support.v7.widget.Toolbar
            android:id="@+id/toolbar"
            android:background="@color/colorPrimaryDark"
            android:layout_width="match_parent"
            android:layout_height="?attr/actionBarSize"
            app:popupTheme="@style/AppTheme.PopupOverlay" />

    </android.support.design.widget.AppBarLayout>

    <FrameLayout
        android:id="@+id/frameLayout"
        android:layout_width="match_parent"
        android:layout_height="match_parent"
        app:layout_behavior="@string/appbar_scrolling_view_behavior">

        <include layout="@layout/item_list" />
    </FrameLayout>


</android.support.design.widget.CoordinatorLayout>
```

**(e). `activity_detail_toolbar.xml`**

> Our `activity_detail_toolbar` layout.

This layout will represent our Toolbar Detail Activity's layout. Specify [`android.support.design.widget.CoordinatorLayout`](https://android.camposha.info/en/coordinatorlayout) as it's root element then inside it place the following [widgets](https://android.camposha.info/en/view):

1. [`ArcAppBarLayout`](https://android.camposha.info/en/arcappbarlayout)
2. [`CollapsingToolbarLayout`](https://android.camposha.info/en/collapsingtoolbarlayout)
3. [`Toolbar`](https://android.camposha.info/en/toolbar)
4. [`NestedScrollView`](https://android.camposha.info/en/nestedscrollview)
5. [`FloatingActionButton`](https://android.camposha.info/en/floatingactionbutton)

```xml
<?xml version="1.0" encoding="utf-8"?>
<android.support.design.widget.CoordinatorLayout xmlns:android="http://schemas.android.com/apk/res/android"
    xmlns:app="http://schemas.android.com/apk/res-auto"
    xmlns:tools="http://schemas.android.com/tools"
    android:layout_width="match_parent"
    android:layout_height="match_parent"
    android:fitsSystemWindows="true"
    tools:context=".DetailActivity"
    tools:ignore="MergeRootFrame">

    <ir.alirezaiyan.arclayout.ArcAppBarLayout
        android:id="@+id/app_bar"
        android:layout_width="match_parent"
        android:layout_height="@dimen/app_bar_height"
        android:fitsSystemWindows="true"
        android:theme="@style/ThemeOverlay.AppCompat.Dark.ActionBar"
        app:arc_bottom_cropCurve="cropConvex"
        app:arc_bottom_height="10dp"
        app:arc_bottom_position="true"
        app:arc_top_position="false"
        app:elevation="0dp">

        <android.support.design.widget.CollapsingToolbarLayout
            android:id="@+id/toolbar_layout"
            android:layout_width="match_parent"
            android:layout_height="match_parent"
            android:background="@color/colorPrimaryDark"
            android:fitsSystemWindows="true"
            app:contentScrim="?attr/colorPrimary"
            app:layout_scrollFlags="scroll|exitUntilCollapsed"
            app:toolbarId="@+id/toolbar">

            <android.support.v7.widget.Toolbar
                android:id="@+id/detail_toolbar"
                android:layout_width="match_parent"
                android:layout_height="?attr/actionBarSize"
                android:background="@color/colorPrimaryDark"
                app:layout_collapseMode="pin"
                app:popupTheme="@style/ThemeOverlay.AppCompat.Light" />

        </android.support.design.widget.CollapsingToolbarLayout>

    </ir.alirezaiyan.arclayout.ArcAppBarLayout>

    <android.support.v4.widget.NestedScrollView
        android:id="@+id/item_detail_container"
        android:layout_width="match_parent"
        android:layout_height="match_parent"
        app:layout_behavior="@string/appbar_scrolling_view_behavior" />

    <android.support.design.widget.FloatingActionButton
        android:id="@+id/github_fab"
        android:layout_width="wrap_content"
        android:layout_height="wrap_content"
        android:layout_gravity="center_vertical|start"
        android:layout_margin="@dimen/fab_margin"
        app:layout_anchor="@+id/item_detail_container"
        app:layout_anchorGravity="top|end"
        app:srcCompat="@drawable/ic_github" />

</android.support.design.widget.CoordinatorLayout>
```

**(f). `activity_detail_bottom_navigation.xml`**

> Our `activity_detail_bottom_navigation` layout.

This layout will represent our Navigation Bottom Detail Activity's layout. Specify [`CoordinatorLayout`](https://android.camposha.info/en/coordinatorlayout) as it's root element then inside it place the following [widgets](https://android.camposha.info/en/view):

1. [`AppBarLayout`](https://android.camposha.info/en/appbarlayout)
2. [`CollapsingToolbarLayout`](https://android.camposha.info/en/collapsingtoolbarlayout)
3. [`Toolbar`](https://android.camposha.info/en/toolbar)
4. [`RelativeLayout`](https://android.camposha.info/en/relativelayout)
5. [`NestedScrollView`](https://android.camposha.info/en/nestedscrollview)
6. [`ArcRelativeLayout`](https://android.camposha.info/en/arcrelativelayout)
7. [`LinearLayout`](https://android.camposha.info/en/linearlayout)
8. [`ImageView`](https://android.camposha.info/en/imageview)

```xml
<?xml version="1.0" encoding="utf-8"?>
<android.support.design.widget.CoordinatorLayout xmlns:android="http://schemas.android.com/apk/res/android"
    xmlns:app="http://schemas.android.com/apk/res-auto"
    xmlns:tools="http://schemas.android.com/tools"
    android:layout_width="match_parent"
    android:layout_height="match_parent"
    android:fitsSystemWindows="true"
    tools:context=".DetailActivity"
    tools:ignore="MergeRootFrame">

    <android.support.design.widget.AppBarLayout
        android:id="@+id/app_bar"
        android:layout_width="match_parent"
        android:layout_height="@dimen/app_bar_height"
        android:fitsSystemWindows="true"
        android:theme="@style/ThemeOverlay.AppCompat.Dark.ActionBar"
        app:arc_bottom_cropCurve="cropConvex"
        app:arc_bottom_height="10dp"
        app:arc_bottom_position="true"
        app:arc_top_position="false"
        app:elevation="0dp">

        <android.support.design.widget.CollapsingToolbarLayout
            android:id="@+id/toolbar_layout"
            android:layout_width="match_parent"
            android:layout_height="match_parent"
            android:background="@color/colorPrimaryDark"
            android:fitsSystemWindows="true"
            app:contentScrim="?attr/colorPrimary"
            app:layout_scrollFlags="scroll|exitUntilCollapsed"
            app:toolbarId="@+id/toolbar">

            <android.support.v7.widget.Toolbar
                android:id="@+id/detail_toolbar"
                android:layout_width="match_parent"
                android:layout_height="?attr/actionBarSize"
                android:background="@color/colorPrimaryDark"
                app:layout_collapseMode="pin"
                app:popupTheme="@style/ThemeOverlay.AppCompat.Light" />

        </android.support.design.widget.CollapsingToolbarLayout>

    </android.support.design.widget.AppBarLayout>

    <RelativeLayout
        android:layout_width="match_parent"
        android:layout_height="match_parent"
        app:layout_behavior="@string/appbar_scrolling_view_behavior">

        <android.support.v4.widget.NestedScrollView
            android:id="@+id/item_detail_container"
            android:layout_width="match_parent"
            android:layout_height="match_parent" />


        <ir.alirezaiyan.arclayout.ArcRelativeLayout
            android:layout_width="match_parent"
            android:layout_height="80dp"
            android:layout_alignParentBottom="true"
            android:layout_gravity="bottom"
            app:arc_bottom_cropCurve="cropConvex"
            app:arc_bottom_height="10dp"
            app:arc_bottom_position="false"
            app:arc_top_position="true">

            <LinearLayout
                android:layout_width="match_parent"
                android:layout_height="match_parent"
                android:background="@color/colorPrimaryDark"
                android:gravity="center_vertical"
                android:paddingStart="15dp"
                android:paddingTop="20dp"
                android:paddingEnd="15dp"
                android:weightSum="5">


                <ImageView
                    android:layout_width="0dp"
                    android:layout_height="50dp"
                    android:layout_weight="1"
                    android:clickable="true"
                    android:focusable="true"
                    android:scaleType="centerCrop"
                    android:src="@drawable/ic_launcher_foreground"
                    tools:ignore="ContentDescription" />

                <ImageView
                    android:layout_width="0dp"
                    android:layout_height="50dp"
                    android:layout_marginTop="-10dp"
                    android:layout_weight="1"
                    android:clickable="true"
                    android:focusable="true"
                    android:scaleType="centerCrop"
                    android:src="@drawable/ic_launcher_foreground"
                    tools:ignore="ContentDescription" />

                <ImageView
                    android:layout_width="0dp"
                    android:layout_height="50dp"
                    android:layout_marginTop="-15dp"
                    android:layout_weight="1"
                    android:clickable="true"
                    android:focusable="true"
                    android:scaleType="centerCrop"
                    android:src="@drawable/ic_launcher_foreground"
                    tools:ignore="ContentDescription" />

                <ImageView
                    android:layout_width="0dp"
                    android:layout_height="50dp"
                    android:layout_marginTop="-10dp"
                    android:layout_weight="1"
                    android:clickable="true"
                    android:focusable="true"
                    android:scaleType="centerCrop"
                    android:src="@drawable/ic_launcher_foreground"
                    tools:ignore="ContentDescription" />

                <ImageView
                    android:layout_width="0dp"
                    android:layout_height="50dp"
                    android:layout_weight="1"
                    android:clickable="true"
                    android:focusable="true"
                    android:scaleType="centerCrop"
                    android:src="@drawable/ic_launcher_foreground"
                    tools:ignore="ContentDescription" />
            </LinearLayout>

        </ir.alirezaiyan.arclayout.ArcRelativeLayout>

    </RelativeLayout>

</android.support.design.widget.CoordinatorLayout>
```

#### Step 2. Write Code

Finally we need to write our code as follows:

**(a). `ListContent.kt`**

> Our `ListContent` class.

Create a Kotlin file named `ListContent.kt` and add the necessary imports. Here are some of the imports we will be using:
1. `Parcel` from the `android.os` package.
2. `Parcelable` from the `android.os` package.

Then extend the `Parcelable` and add its contents as follows:

First override these callbacks: 

1. `writeToParcel(parcel: Parcel, flags: Int) `.
2. `describeContents(): Int `.
3. `createFromParcel(parcel: Parcel): ListItem `.
4. `newArray(size: Int): Array<ListItem?> `.

Then we will be creating the following functions:

1. `addItem(parameter)` - Our function will take a `ListItem` object as a parameter.

**(a). Our `addItem()` function**

Write the `addItem()` function as follows:

```kotlin
    private fun addItem(item: ListItem) {
        ITEMS.add(item)
        ITEM_MAP[item.id] = item
    }
```


Here is the full code:

```kotlin
package replace_with_your_package_name

import android.os.Parcel
import android.os.Parcelable
import java.util.*

/**
 * Helper class for providing sample content for user interfaces created by
 * Android template wizards.
 *
 * TODO: Replace all uses of this class before publishing your app.
 */

const val ARC_BOTTOM_NAVIGATION_ID = 1
const val ARC_TOOLBAR_ID = 2

object ListContent {

    val bnvDetails = "BottomNavigationView.."

    val toolbarDetails = "Add details here..."
    /**
     * An array of sample (model) items.
     */
    val ITEMS: MutableList<ListItem> = ArrayList()

    /**
     * A map of sample (model) items, by ID.
     */
    val ITEM_MAP: MutableMap<Int, ListItem> = HashMap()

    init {
        // Add some sample items.
        addItem(ListItem(id = ARC_BOTTOM_NAVIGATION_ID, content = "ArcBottomNavigation", details = bnvDetails))
        addItem(ListItem(id = ARC_TOOLBAR_ID, content = "ArcToolbar", details = toolbarDetails))
    }

    private fun addItem(item: ListItem) {
        ITEMS.add(item)
        ITEM_MAP[item.id] = item
    }


    /**
     * A model item representing a piece of content.
     */
    @Suppress("NULLABILITY_MISMATCH_BASED_ON_JAVA_ANNOTATIONS")
    data class ListItem(val id: Int = -1, val content: String, val details: String = "") : Parcelable {
        constructor(parcel: Parcel) : this(
                parcel.readInt(),
                parcel.readString(),
                parcel.readString())

        override fun toString(): String = content
        override fun writeToParcel(parcel: Parcel, flags: Int) {
            parcel.writeInt(id)
            parcel.writeString(content)
            parcel.writeString(details)
        }

        override fun describeContents(): Int {
            return 0
        }

        companion object CREATOR : Parcelable.Creator<ListItem> {
            override fun createFromParcel(parcel: Parcel): ListItem {
                return ListItem(parcel)
            }

            override fun newArray(size: Int): Array<ListItem?> {
                return arrayOfNulls(size)
            }
        }
    }
}


```

**(b). `DetailFragment.kt`**
> Our `DetailFragment` class.

Create a Kotlin file named `DetailFragment.kt` and add the necessary imports. Here are some of the imports we will be using:
1. `Fragment` from the `android.support.v4.app` package.
2. `LayoutInflater` from the `android.view` package.
3. `ViewGroup` from the `android.view` package.
4. `*` from the `kotlinx.android.synthetic.main.activity_detail_toolbar` package.
5. `*` from the `kotlinx.android.synthetic.main.item_detail` package.

Then extend the `Fragment` and add its contents as follows:

First override these callbacks: 

1. `onCreate(savedInstanceState: Bundle?) `.
2. `onActivityCreated(savedInstanceState: Bundle?) `.

Here is the full code:

```kotlin
package replace_with_your_package_name

import android.os.Bundle
import android.support.v4.app.Fragment
import android.view.LayoutInflater
import android.view.ViewGroup
import ir.alirezaiyan.arclayout.sample.model.ListContent
import kotlinx.android.synthetic.main.activity_detail_toolbar.*
import kotlinx.android.synthetic.main.item_detail.*

class DetailFragment : Fragment() {

    /**
     * The model content this fragment is presenting.
     */
    private var item: ListContent.ListItem? = null

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)

        arguments?.let {
            if (it.containsKey(ARG_ITEM_ID)) {
                // Load the model content specified by the fragment
                // arguments. In a real-world scenario, use a Loader
                // to load content from a content provider.
                item = ListContent.ITEM_MAP[it.getInt(ARG_ITEM_ID)]
                activity?.toolbar_layout?.title = item?.content
            }
        }
    }

    override fun onCreateView(inflater: LayoutInflater, container: ViewGroup?,
                              savedInstanceState: Bundle?) = inflater.inflate(R.layout.item_detail, container, false)

    override fun onActivityCreated(savedInstanceState: Bundle?) {
        super.onActivityCreated(savedInstanceState)
        // Show the model content as text in a TextView.
        item_detail.text = item?.details
    }


    companion object {
        /**
         * The fragment argument representing the item ID that this fragment
         * represents.
         */
        const val ARG_ITEM_ID = "item_id"
    }
}


```

**(c). `DetailActivity.kt`**
> Our `DetailActivity` class.

Create a Kotlin file named `DetailActivity.kt` and add the necessary imports. 

Here is the full code:

```kotlin
package replace_with_your_package_name

import android.content.Intent
import android.net.Uri
import android.os.Bundle
import android.support.v7.app.AppCompatActivity
import android.view.MenuItem
import android.view.View
import ir.alirezaiyan.arclayout.sample.model.ARC_TOOLBAR_ID
import ir.alirezaiyan.arclayout.sample.model.ListContent
import kotlinx.android.synthetic.main.activity_detail_toolbar.*

class DetailActivity : AppCompatActivity(), View.OnClickListener {

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        val listItem = intent.getParcelableExtra<ListContent.ListItem>(DetailFragment.ARG_ITEM_ID)
        val layout = if (listItem.id == ARC_TOOLBAR_ID) R.layout.activity_detail_toolbar else R.layout.activity_detail_bottom_navigation
        setContentView(layout)
        setSupportActionBar(detail_toolbar)
        title = listItem.content
        github_fab?.setOnClickListener(this)

        // Show the Up button in the action bar.
        supportActionBar?.setDisplayHomeAsUpEnabled(true)

        // savedInstanceState is non-null when there is fragment state
        // saved from previous configurations of this activity
        // (e.g. when rotating the screen from portrait to landscape).
        // In this case, the fragment will automatically be re-added
        // to its container so we don't need to manually add it.
        // For more information, see the Fragments API guide at:
        //
        // http://developer.android.com/guide/components/fragments.html
        //
        if (savedInstanceState == null) {
            // Create the detail fragment and add it to the activity
            // using a fragment transaction.
            val fragment = DetailFragment().apply {
                arguments = Bundle().apply {
                    putInt(DetailFragment.ARG_ITEM_ID, listItem.id)
                }
            }

            supportFragmentManager.beginTransaction()
                    .add(R.id.item_detail_container, fragment)
                    .commit()
        }

    }

    override fun onOptionsItemSelected(item: MenuItem) =
            when (item.itemId) {
                android.R.id.home -> {
                    // This ID represents the Home or Up button. In the case of this
                    // activity, the Up button is shown. For
                    // more details, see the Navigation pattern on Android Design:
                    //
                    // http://developer.android.com/design/patterns/navigation.html#up-vs-back

                    navigateUpTo(Intent(this, MainActivity::class.java))
                    true
                }
                else -> super.onOptionsItemSelected(item)
            }


    override fun onClick(v: View?) {
        when (v?.id) {
            R.id.github_fab -> {
                val repo = Intent(Intent.ACTION_VIEW)
                repo.data = Uri.parse("https://github.com/rezaiyan/ArcLayout")
                startActivity(repo)
            }
        }
    }
}


```

**(d). `MainActivity.kt`**

> Our `MainActivity` class.

First override these callbacks: 

1. `onCreate(savedInstanceState: Bundle?) `.
2. `onCreateViewHolder(parent: ViewGroup, viewType: Int): ViewHolder `.
3. `onBindViewHolder(holder: ViewHolder, position: Int) `.

Then we will be creating the following functions:

1. `setupRecyclerView(parameter)` - This function will take a `RecyclerView` object as a parameter.

**(a). Our `setupRecyclerView()` function**

Write the `setupRecyclerView()` function as follows:

```kotlin
    private fun setupRecyclerView(recyclerView: RecyclerView) {
        recyclerView.adapter = SimpleItemRecyclerViewAdapter(this, ListContent.ITEMS, twoPane)
    }
```


Here is the full code:

```kotlin
package replace_with_your_package_name

import android.content.Intent
import android.os.Bundle
import android.support.v7.app.AppCompatActivity
import android.support.v7.widget.RecyclerView
import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import android.widget.TextView
import ir.alirezaiyan.arclayout.sample.model.ListContent
import kotlinx.android.synthetic.main.activity_main.*
import kotlinx.android.synthetic.main.item_list.*
import kotlinx.android.synthetic.main.item_list_content.view.*


class MainActivity : AppCompatActivity() {

    /**
     * Whether or not the activity is in two-pane mode, i.e. running on a tablet
     * device.
     */
    private var twoPane: Boolean = false

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_main)

        setSupportActionBar(toolbar)
        toolbar.title = title

        if (item_detail_container != null) {
            // The detail container view will be present only in the
            // large-screen layouts (res/values-w900dp).
            // If this view is present, then the
            // activity should be in two-pane mode.
            twoPane = true
        }

        setupRecyclerView(item_list)
    }

    private fun setupRecyclerView(recyclerView: RecyclerView) {
        recyclerView.adapter = SimpleItemRecyclerViewAdapter(this, ListContent.ITEMS, twoPane)
    }

    class SimpleItemRecyclerViewAdapter(private val parentActivity: MainActivity,
                                        private val values: List<ListContent.ListItem>,
                                        private val twoPane: Boolean) :
            RecyclerView.Adapter<SimpleItemRecyclerViewAdapter.ViewHolder>() {

        private val onClickListener: View.OnClickListener

        init {
            onClickListener = View.OnClickListener { v ->
                val item = v.tag as ListContent.ListItem
                if (twoPane) {
                    val fragment = DetailFragment().apply {
                        arguments = Bundle().apply {
                            putParcelable(DetailFragment.ARG_ITEM_ID, item)
                        }
                    }
                    parentActivity.supportFragmentManager
                            .beginTransaction()
                            .replace(R.id.item_detail_container, fragment)
                            .commit()
                } else {
                    val intent = Intent(v.context, DetailActivity::class.java).apply {
                        putExtra(DetailFragment.ARG_ITEM_ID, item)
                    }
                    v.context.startActivity(intent)
                }
            }
        }

        override fun onCreateViewHolder(parent: ViewGroup, viewType: Int): ViewHolder {
            val view = LayoutInflater.from(parent.context)
                    .inflate(R.layout.item_list_content, parent, false)
            return ViewHolder(view)
        }

        override fun onBindViewHolder(holder: ViewHolder, position: Int) {
            val item = values[position]
            holder.idView.text = "${item.id}"
            holder.contentView.text = item.content

            with(holder.itemView) {
                tag = item
                setOnClickListener(onClickListener)
            }
        }

        override fun getItemCount() = values.size

        inner class ViewHolder(view: View) : RecyclerView.ViewHolder(view) {
            val idView: TextView = view.id_text
            val contentView: TextView = view.content
        }
    }
}


```

### Reference

Download the code below:

|No.|Link|
|--|---|
|1.|[Download Full Code](https://github.com/rezaiyan/ArcLayout/archive/refs/heads/master.zip)|
|2.|Read more [here](https://github.com/rezaiyan/ArcLayout).|
|3.|Follow code author [here](https://github.com/rezaiyan).|
