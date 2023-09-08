# Kotlin Android Nested RecyclerView Example

In this tutorial you will learn step by step how to create a nested recyclerview. This is whereby you are placing a recyclerview within another recyclerview. Each recyclerview needs to have it's independent adapter to bind it's data. Each also has to handle it's scroll appropriately.


Check the examples below.

## Example 1: Kotlin Android Nested RecyclerView

Here's the demo of this project:

![ Kotlin Android Nested RecyclerView](https://github.com/rubensousa/RecyclerViewNestedExample/blob/master/videos/nested_problem1_fix.gif?raw=true)

### Step 1: Create Project

Start by creating an empty `Android Studio` project.

### Step 2: Dependencies

Install GravitySnapHelper by adding the following implementation statement in your `app/build.gradle` file:

```groovy
    implementation 'com.github.rubensousa:gravitysnaphelper:2.1.0'
```

### Step 3: Design Layouts

There are three layouts for this project:

**nested_adapter_item.xml**

This is the layout for innert recyclerview item:

```xml
<?xml version="1.0" encoding="utf-8"?>
<FrameLayout xmlns:android="http://schemas.android.com/apk/res/android"
    xmlns:tools="http://schemas.android.com/tools"
    android:layout_width="@dimen/item_width"
    android:layout_height="@dimen/item_height"
    android:layout_margin="4dp"
    android:background="@android:color/black"
    tools:context=".MainActivity">

    <TextView
        android:id="@+id/textView"
        style="@style/TextAppearance.AppCompat.Title"
        android:layout_width="wrap_content"
        android:layout_height="wrap_content"
        android:layout_gravity="center"
        android:gravity="center"
        android:textColor="@android:color/white"
        android:textSize="@dimen/item_text_size"
        tools:text="0" />

</FrameLayout>
```

**(b). nested_adapter_list**

The layout for the inner recyclerview. Add OrientationAwareRecyclerView:

```xml
<?xml version="1.0" encoding="utf-8"?>
<LinearLayout xmlns:android="http://schemas.android.com/apk/res/android"
    xmlns:tools="http://schemas.android.com/tools"
    android:layout_width="match_parent"
    android:layout_height="wrap_content"
    android:orientation="vertical"
    tools:context=".MainActivity">

    <TextView
        android:id="@+id/nestedTitleTextView"
        style="@style/TextAppearance.AppCompat.Title"
        android:layout_width="wrap_content"
        android:layout_height="wrap_content"
        android:layout_marginStart="16dp"
        android:layout_marginTop="16dp" />

    <com.github.rubensousa.gravitysnaphelper.OrientationAwareRecyclerView
        android:id="@+id/nestedRecyclerView"
        android:layout_width="match_parent"
        android:layout_height="wrap_content" />

</LinearLayout>
```

**(c). nested_adapter_item.xml**

The layout for the outer recyclerview. Once more add the OrientationAwareRecyclerView:

```xml
<?xml version="1.0" encoding="utf-8"?>
<androidx.constraintlayout.widget.ConstraintLayout xmlns:android="http://schemas.android.com/apk/res/android"
    android:layout_width="match_parent"
    android:layout_height="match_parent">

    <com.github.rubensousa.gravitysnaphelper.OrientationAwareRecyclerView
        android:id="@+id/recyclerView"
        android:layout_width="match_parent"
        android:layout_height="match_parent" />

</androidx.constraintlayout.widget.ConstraintLayout>
```

### Step 4: Create Data Class

This data class will be our model class:

**(a). TiledList.kt**

```kotlin
data class TitledList(
    val title: String,
    val texts: MutableList<String>
)
```

### Step 5: Create Scroll State Holder

Create a class to hold the scroll state:

**ScrollStateHolder.kt**

```kotlin
import android.os.Bundle
import android.os.Parcelable
import androidx.recyclerview.widget.RecyclerView

/**
 * Persists scroll state for nested RecyclerViews.
 *
 * 1. Call [saveScrollState] in [RecyclerView.Adapter.onViewRecycled]
 * to save the scroll position.
 *
 * 2. Call [restoreScrollState] in [RecyclerView.Adapter.onBindViewHolder]
 * after changing the adapter's contents to restore the scroll position
 */
class ScrollStateHolder(savedInstanceState: Bundle? = null) {

    companion object {
        const val STATE_BUNDLE = "scroll_state_bundle"
    }

    /**
     * Provides a key that uniquely identifies a RecyclerView
     */
    interface ScrollStateKeyProvider {
        fun getScrollStateKey(): String?
    }

    /**
     * Persists the [RecyclerView.LayoutManager] states
     */
    private val scrollStates = hashMapOf<String, Parcelable>()

    /**
     * Keeps track of the keys that point to RecyclerViews
     * that have new scroll states that should be saved
     */
    private val scrolledKeys = mutableSetOf<String>()

    init {
        savedInstanceState?.getBundle(STATE_BUNDLE)?.let { bundle ->
            bundle.keySet().forEach { key ->
                bundle.getParcelable<Parcelable>(key)?.let {
                    scrollStates[key] = it
                }
            }
        }
    }

    fun setupRecyclerView(recyclerView: RecyclerView, scrollKeyProvider: ScrollStateKeyProvider) {
        recyclerView.addOnScrollListener(object : RecyclerView.OnScrollListener() {
            override fun onScrollStateChanged(recyclerView: RecyclerView, newState: Int) {
                super.onScrollStateChanged(recyclerView, newState)
                if (newState == RecyclerView.SCROLL_STATE_IDLE) {
                    saveScrollState(recyclerView, scrollKeyProvider)
                }
            }

            override fun onScrolled(recyclerView: RecyclerView, dx: Int, dy: Int) {
                super.onScrolled(recyclerView, dx, dy)
                val key = scrollKeyProvider.getScrollStateKey()
                if (key != null && dx != 0) {
                    scrolledKeys.add(key)
                }
            }
        })
    }

    fun onSaveInstanceState(outState: Bundle) {
        val stateBundle = Bundle()
        scrollStates.entries.forEach {
            stateBundle.putParcelable(it.key, it.value)
        }
        outState.putBundle(STATE_BUNDLE, stateBundle)
    }

    fun clearScrollState() {
        scrollStates.clear()
        scrolledKeys.clear()
    }

    /**
     * Saves this RecyclerView layout state for a given key
     */
    fun saveScrollState(
        recyclerView: RecyclerView,
        scrollKeyProvider: ScrollStateKeyProvider
    ) {
        val key = scrollKeyProvider.getScrollStateKey() ?: return
        // Check if we scrolled the RecyclerView for this key
        if (scrolledKeys.contains(key)) {
            val layoutManager = recyclerView.layoutManager ?: return
            layoutManager.onSaveInstanceState()?.let { scrollStates[key] = it }
            scrolledKeys.remove(key)
        }
    }

    /**
     * Restores this RecyclerView layout state for a given key
     */
    fun restoreScrollState(
        recyclerView: RecyclerView,
        scrollKeyProvider: ScrollStateKeyProvider
    ) {
        val key = scrollKeyProvider.getScrollStateKey() ?: return
        val layoutManager = recyclerView.layoutManager ?: return
        val savedState = scrollStates[key]
        if (savedState != null) {
            layoutManager.onRestoreInstanceState(savedState)
        } else {
            // If we don't have any state for this RecyclerView,
            // make sure we reset the scroll position
            layoutManager.scrollToPosition(0)
        }
        // Mark this key as not scrolled since we just restored the state
        scrolledKeys.remove(key)
    }

}
```

### Step 6: Create Adapters

There are two adapters:

**(a). ChildAdapter.kt**

This is the adapter for the inner recyclerview, or the nested recyclerview:

```kotlin
import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import android.widget.TextView
import androidx.recyclerview.widget.RecyclerView

class ChildAdapter : RecyclerView.Adapter<ChildAdapter.VH>() {

    private var items = listOf<String>()

    fun setItems(list: List<String>) {
        this.items = list
        notifyDataSetChanged()
    }

    override fun onCreateViewHolder(parent: ViewGroup, viewType: Int): VH {
        return VH(
            LayoutInflater.from(parent.context).inflate(
                R.layout.nested_adapter_item,
                parent,
                false
            )
        )
    }

    override fun getItemCount(): Int = items.size

    override fun onBindViewHolder(holder: VH, position: Int) {
        holder.bind(items[position])
    }

    class VH(view: View) : RecyclerView.ViewHolder(view) {

        private val textView: TextView = view.findViewById(R.id.textView)

        init {
            view.setOnClickListener {
                it.isSelected = !it.isSelected
            }
        }

        fun bind(item: String) {
            textView.text = item
        }

    }
}
```

**(b). ParentAdapter.kt**

This is the adapter for the outer or parent recyclerview:

```kotlin
import android.view.Gravity
import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import android.widget.TextView
import androidx.recyclerview.widget.LinearLayoutManager
import androidx.recyclerview.widget.RecyclerView
import com.github.rubensousa.gravitysnaphelper.GravitySnapHelper

class ParentAdapter(private val scrollStateHolder: ScrollStateHolder) :
    RecyclerView.Adapter<ParentAdapter.VH>() {

    private var items = listOf<TitledList>()

    fun setItems(list: List<TitledList>) {
        this.items = list
        notifyDataSetChanged()
    }

    override fun onCreateViewHolder(parent: ViewGroup, viewType: Int): VH {
        val view = LayoutInflater.from(parent.context).inflate(
            R.layout.nested_adapter_list,
            parent, false
        )
        val vh = VH(view, scrollStateHolder)
        vh.onCreated()
        return vh
    }

    override fun getItemCount(): Int = items.size

    override fun onBindViewHolder(holder: VH, position: Int) {
        holder.onBound(items[position])
    }

    override fun onViewRecycled(holder: VH) {
        super.onViewRecycled(holder)
        holder.onRecycled()
    }

    override fun onViewDetachedFromWindow(holder: VH) {
        super.onViewDetachedFromWindow(holder)
        holder.onDetachedFromWindow()
    }

    class VH(view: View, private val scrollStateHolder: ScrollStateHolder) :
        RecyclerView.ViewHolder(view), ScrollStateHolder.ScrollStateKeyProvider {

        private val titleTextView: TextView = view.findViewById(R.id.nestedTitleTextView)
        private val recyclerView: RecyclerView = view.findViewById(R.id.nestedRecyclerView)
        private val layoutManager = LinearLayoutManager(
            view.context,
            RecyclerView.HORIZONTAL, false
        )
        private val adapter = ChildAdapter()
        private val snapHelper = GravitySnapHelper(Gravity.START)
        private var currentItem: TitledList? = null

        override fun getScrollStateKey(): String? = currentItem?.title

        fun onCreated() {
            recyclerView.adapter = adapter
            recyclerView.layoutManager = layoutManager
            recyclerView.setHasFixedSize(true)
            recyclerView.itemAnimator?.changeDuration = 0
            snapHelper.attachToRecyclerView(recyclerView)
            scrollStateHolder.setupRecyclerView(recyclerView, this)
        }

        fun onBound(item: TitledList) {
            currentItem = item
            titleTextView.text = item.title
            adapter.setItems(item.texts)
            scrollStateHolder.restoreScrollState(recyclerView, this)
        }

        fun onRecycled() {
            scrollStateHolder.saveScrollState(recyclerView, this)
            currentItem = null
        }

        /**
         * If we fast scroll while this ViewHolder's RecyclerView is still settling the scroll,
         * the view will be detached and won't be snapped correctly
         *
         * To fix that, we snap again without smooth scrolling.
         */
        fun onDetachedFromWindow() {
            if (recyclerView.scrollState != RecyclerView.SCROLL_STATE_IDLE) {
                snapHelper.findSnapView(layoutManager)?.let {
                    val snapDistance = snapHelper.calculateDistanceToFinalSnap(layoutManager, it)
                    if (snapDistance!![0] != 0 || snapDistance[1] != 0) {
                        recyclerView.scrollBy(snapDistance[0], snapDistance[1])
                    }
                }
            }
        }
    }
}
```

### Step 7: Create MainActivity

Here is the code for the MainActivity

**MainActivity.kt**

```kotlin
import android.os.Bundle
import androidx.appcompat.app.AppCompatActivity
import androidx.recyclerview.widget.LinearLayoutManager
import androidx.recyclerview.widget.RecyclerView

class MainActivity : AppCompatActivity() {

    private lateinit var adapter: ParentAdapter
    private lateinit var recyclerView: RecyclerView
    private lateinit var scrollStateHolder: ScrollStateHolder

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_main)
        recyclerView = findViewById(R.id.recyclerView)
        scrollStateHolder = ScrollStateHolder(savedInstanceState)
        adapter = ParentAdapter(scrollStateHolder)
        recyclerView.adapter = adapter
        recyclerView.layoutManager = LinearLayoutManager(this)
        loadItems()
    }

    override fun onSaveInstanceState(outState: Bundle) {
        super.onSaveInstanceState(outState)
        scrollStateHolder.onSaveInstanceState(outState)
    }

    private fun loadItems() {
        val lists = arrayListOf<TitledList>()
        repeat(20) { listIndex ->
            val items = arrayListOf<String>()
            repeat(30) { itemIndex -> items.add(itemIndex.toString()) }
            lists.add(TitledList("List number $listIndex", items))
        }
        adapter.setItems(lists)
    }

}
```

### Run

Copy the code or download it in the link below, build and run.

### Reference

Here are the reference links:

| Number | Link |
| --- | --- |
| 1. | [Download](https://github.com/rubensousa/RecyclerViewNestedExample/archive/refs/heads/master.zip) Example |
| 2. | [Follow](https://github.com/rubensousa/) code author |
| 3. | Code: [Apache 2.0 License](http://www.apache.org/licenses/LICENSE-2.0.txt) |
