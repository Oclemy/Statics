# ShimmerRecyclerView


> `ShimmerRecyclerView` is a custom recycler view with shimmer views to indicate that views are loading.
 
The recycler view has a built-in adapter to control the shimmer appearance and provide two methods -

*   `showShimmerAdapter()` - set up a demo adapter a predefined number of child demo views.
*   `hideShimmerAdapter()`- restores your adapter to show the actual child elements.

### Demos

There are two kinds of shimmer animation which you can see here:

This type of shimmer effect uses the whole ViewHolder item to animate on.

List Demo

![](https://github.com/sharish/ShimmerRecyclerView/raw/master/screenshots/list_demo.gif)

Grid Demo:

![](https://github.com/sharish/ShimmerRecyclerView/raw/master/screenshots/grid_demo.gif)

Here the shimmer effect only applied on for those views which background color is nontransparent.

List Demo

![](https://github.com/sharish/ShimmerRecyclerView/raw/master/screenshots/second_list_demo.gif)

Grid Demo:

![](https://github.com/sharish/ShimmerRecyclerView/raw/master/screenshots/second_grid_demo.gif)

### Shimmer effect types

1.  As you can see the first demo examples show that the whole ViewHolder item is animated. To achieve the desired effect, the children of the ShimmerLayout should have a nontransparent background.
    
2.  You can achieve the second kind of shimmer effect by adding only one ViewGroup child to the ShimmerLayout with a transparent background. This ViewGroup will have the other views with nontransparent backgrounds on which the effect will be seen.
    
    You may wonder how can you add background to the root view of the ViewHolder, if you do not have direct access to the ShimmerLayout and the only child has a nontransparent background. The solution for this is to use the `shimmer_demo_view_holder_item_background` attribute.
    

### Attributes and Methods

Following are the attributes and methods to initialise the demo views.


- `app:shimmer_demo_child_count` : `setDemoChildCount(int)` :Integer value that sets the number of demo views should be present in shimmer adapter.
- `app:shimmer_demo_layout` : `setDemoLayoutReference(int)` : Layout reference to your demo view. Define your my\_demo\_view.xml and refer the layout reference here.
- `app:shimmer_demo_layout_manager_type` : `setDemoLayoutManager(LayoutManagerType)` : Layout manager of demo view. Can be one among linear\_vertical or linear\_horizontal or grid.
- `app:shimmer_demo_shimmer_color` : `-` : Color reference or value. It can be used to change the color of the shimmer line.
- `app:shimmer_demo_angle` : `-` : Integer value between 0 and 30 which can modify the angle of the shimmer line. The default value is zero.
- `app:shimmer_demo_mask_width` : `setDemoShimmerMaskWidth(float)` : Float value between 0 and 1 which can modify the width of the shimmer line. The default value is 0.5. 
- `app:shimmer_demo_view_holder_item_background` : `-` : Color or an xml drawable for the ViewHolder background if you want to achieve the second type of shimmer effect.
- `app:shimmer_demo_reverse_animation` : `-` : Defines whether the animation should be reversed. If it is true, then the animation starts from the right side of the View. Default value is false.

### Step 1: Adding to your project

Add the following configuration in your `build.gradle` file. Be sure to specify jitpack as a maven url in your `project-level build` file, under the repositories closure. After that proceed to your `app-level build` file and declare `ShimmerRecyclerView` as a dependency.

```groovy
repositories {
    jcenter()
    maven { url "https://jitpack.io" }
}
dependencies {
    implementation 'com.github.sharish:ShimmerRecyclerView:v1.3'
}
```

### Step 2: Add to Layout

Define your xml as shown.

```xml
<com.cooltechworks.views.shimmer.ShimmerRecyclerView
        xmlns:app="http://schemas.android.com/apk/res-auto"
        android:id="@+id/shimmer_recycler_view"
        android:layout_width="match_parent"
        android:layout_height="match_parent"
        app:shimmer_demo_child_count="10"
        app:shimmer_demo_grid_child_count="2"
        app:shimmer_demo_layout="@layout/layout_demo_grid"
        app:shimmer_demo_layout_manager_type="grid"
        app:shimmer_demo_angle="20"
        />

```

where `@layout/layout_demo_grid` refers to your sample layout that should be shown during loading spinner.

### Step 3: Show Shimmer

Now on your activity onCreate, initialize the shimmer as below. We reference the ShimmerRecyclerView in this case using the `findViewById` method, passing in the id. Then invoke the `showShimmerAdapter()` function to show shimmer effects.

```java
ShimmerRecyclerView shimmerRecycler = (ShimmerRecyclerView) findViewById(R.id.shimmer_recycler_view);
shimmerRecycler.showShimmerAdapter();
```

### Full Example

We will then proceed and create a full example.

Here is a full example:

**(a). ItemCard.kt**

Create a model class known as `ItemCard` and initialize 4 properties: title, description and thumbnail url, as well as the summary text. This class will represent a single item in our recyclerview.

```kotlin
class ItemCard {

    var title: String? = null
    var description: String? = null
    var thumbnailUrl: String? = null
    var summaryText: String? = null
}
```

**(b). CardAdapter.kt**

We then need a recyclerview adapter defined. An adapter will enable us bind data to our recyclerview.  Add imports. Then extend the Adapter from the RecyclerView class. Define a list of item cards and typelist as our private instance fields. Then override our typical recyclerview adapter functions: `onCreateViewHolder`, `onBindViewHolder` and `getItemCount`.

```kotlin
import android.support.v7.widget.RecyclerView
import android.view.ViewGroup
import com.cooltechworks.sample.models.ItemCard
import com.cooltechworks.sample.utils.BaseUtils
import com.cooltechworks.sample.viewholders.ItemHolder
import java.util.*

class CardAdapter : RecyclerView.Adapter<ItemHolder>() {

    private var mCards: List<ItemCard> = ArrayList()
    private var mType = BaseUtils.TYPE_LIST

    override fun onCreateViewHolder(parent: ViewGroup, viewType: Int): ItemHolder {
        return ItemHolder.newInstance(parent, mType)
    }

    override fun onBindViewHolder(holder: ItemHolder, position: Int) {
        holder.bind(mCards[position])
    }

    override fun getItemCount() = mCards.size


    fun setCards(cards: List<ItemCard>?) {
        if (cards == null) {
            return
        }

        mCards = cards
    }

    fun setType(type: Int) {
        this.mType = type
    }
}
```

**(c). DemoActivity.kt**

We then create a `DemoActivity`. In it define a function to load our Cards. Also set properties defined in our configuration such as theme and the content view. Then set the `LayoutManager` as well as the `Adapter` to the `RecyclerView`.

To show shimmer, invoke  `showShimmerAdapter()`.

```kotlin
import android.os.Bundle
import android.support.v7.app.AppCompatActivity
import android.support.v7.widget.RecyclerView
import com.cooltechworks.sample.adapters.CardAdapter
import com.cooltechworks.sample.utils.BaseUtils
import kotlinx.android.synthetic.main.activity_grid.*


class DemoActivity : AppCompatActivity() {

    private lateinit var mAdapter: CardAdapter

    private val type: Int
        get() = intent.getIntExtra(EXTRA_TYPE, BaseUtils.TYPE_LIST)

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)

        val type = type

        val layoutManager: RecyclerView.LayoutManager

        val demoConfiguration = BaseUtils.getDemoConfiguration(type, this)
        setTheme(demoConfiguration!!.styleResource)
        setContentView(demoConfiguration.layoutResource)
        layoutManager = demoConfiguration.layoutManager!!
        setTitle(demoConfiguration.titleResource)

        if (demoConfiguration.itemDecoration != null) {
            shimmer_recycler_view.addItemDecoration(demoConfiguration.itemDecoration)
        }

        mAdapter = CardAdapter()
        mAdapter.setType(type)

        shimmer_recycler_view.layoutManager = layoutManager
        shimmer_recycler_view.adapter = mAdapter
        shimmer_recycler_view.showShimmerAdapter()

        shimmer_recycler_view.postDelayed({ loadCards() }, 3000)
    }

    private fun loadCards() {
        val type = type

        mAdapter.setCards(BaseUtils.getCards(resources, type))
        shimmer_recycler_view.hideShimmerAdapter()
    }

    companion object {
        const val EXTRA_TYPE = "type"
    }
}
```

**(d). MainActivity.kt**
 
Finally we create Our `MainActivity`. It will be simple. We create two functions: one to create our listener while the other to start our demo by launching the `DemoActivity`. The `createClickListener` function will simply set the OnClick listener to our button. It will receive the Button, as well as the demo type as parameters. The start demo method will receive also the demo type. It will then instantiate an Intent targeting the DemoActivity and finally start that activity.
 
```kotlin
package com.cooltechworks.sample

import android.content.Intent
import android.os.Bundle
import android.support.v7.app.AppCompatActivity
import android.widget.Button
import com.cooltechworks.sample.utils.BaseUtils
import kotlinx.android.synthetic.main.activity_main.*

class MainActivity : AppCompatActivity() {

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_main)

        createClickListener(list_demo_button, BaseUtils.TYPE_LIST)
        createClickListener(grid_demo_button, BaseUtils.TYPE_GRID)
        createClickListener(list_second_demo_button, BaseUtils.TYPE_SECOND_LIST)
        createClickListener(grid_second_demo_button, BaseUtils.TYPE_SECOND_GRID)
    }

    private fun createClickListener(button: Button, demoType: Int) {
        button.setOnClickListener { startDemo(demoType) }
    }

    private fun startDemo(demoType: Int) {
        val intent = Intent(this, DemoActivity::class.java)
        intent.putExtra(DemoActivity.EXTRA_TYPE, demoType)
        startActivity(intent)
    }
}

```

> Find full code [here](https://github.com/sharish/ShimmerRecyclerView/tree/master/app).

### Reference

> Read more [here](https://github.com/sharish/ShimmerRecyclerView/).
> Download code [here](https://github.com/sharish/ShimmerRecyclerView/archive/refs/heads/master.zip).
> Follow code author [here](https://github.com/sharish/).

