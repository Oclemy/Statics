# Kotlin Android Image Carousel Examples

In most of our applications we tend to need to display a series of images. Images make our applications look more modern and interactive and they are a great way to pass information visually.

Sometimes you may even need to show your item lists horizontally. One way is to use a recyclerview with horizontal orientation. However in this case the items won't be auto-flipped or faded.

Thus we will first look at how to create a custom carousel based on recyclerview, the we will curate some of the best libraries and examples already written by other developers and available for re-use. You could always customize them since they are all open source.


Most of them are actually based on recyclerview and some do need a custom adapter. This gives them flexibility and power.

In this article you will learn:

1. How to create a custom image carousel in android based on recyclerview.
2. How to use third party libraries to implement a carousel.

We use the following languages:

1. Kotlin
2. Java

> NB/= This article is broken down into several pages. Each page teaches a unique concept. Here are the taught concepts: Page 1: Implement a custom carousel Page 2: Use libraries to implement a carousel


# Concept 1: Creating a Custom Carousel

## Example 1: Kotlin android Horizontal Carousel

How to implement a custom horizontal image carousel using recycelrview in Kotlin.

### Step 1: Create Project

Start by creating an empty `Android Studio` Kotlin project.

### Step 2: Dependencies

No third party libraries are needed for this project.

### Step 3: Create a Custom Carousel View

We will create a custom carousel view by extending the recyclerview:

**HorizontalCarouselRecyclerView.kt**

```kotlin
package supahsoftware.androidexamplecarousel

import android.animation.ArgbEvaluator
import android.content.Context
import android.graphics.ColorMatrix
import android.graphics.ColorMatrixColorFilter
import android.util.AttributeSet
import android.view.View
import android.widget.ImageView
import android.widget.TextView
import androidx.core.content.ContextCompat
import androidx.recyclerview.widget.LinearLayoutManager
import androidx.recyclerview.widget.RecyclerView

class HorizontalCarouselRecyclerView(
    context: Context,
    attrs: AttributeSet
) : RecyclerView(context, attrs) {

    private val activeColor by lazy { ContextCompat.getColor(context, R.color.blue) }
    private val inactiveColor by lazy { ContextCompat.getColor(context, R.color.gray) }
    private var viewsToChangeColor: List<Int> = listOf()

    fun <T : ViewHolder> initialize(newAdapter: Adapter<T>) {
        layoutManager = LinearLayoutManager(context, HORIZONTAL, false)
        newAdapter.registerAdapterDataObserver(object : RecyclerView.AdapterDataObserver() {
            override fun onChanged() {
                post {
                    val sidePadding = (width / 2) - (getChildAt(0).width / 2)
                    setPadding(sidePadding, 0, sidePadding, 0)
                    scrollToPosition(0)
                    addOnScrollListener(object : OnScrollListener() {
                        override fun onScrolled(recyclerView: RecyclerView, dx: Int, dy: Int) {
                            super.onScrolled(recyclerView, dx, dy)
                            onScrollChanged()
                        }
                    })
                }
            }
        })
        adapter = newAdapter
    }

    fun setViewsToChangeColor(viewIds: List<Int>) {
        viewsToChangeColor = viewIds
    }

    private fun onScrollChanged() {
        post {
            (0 until childCount).forEach { position ->
                val child = getChildAt(position)
                val childCenterX = (child.left + child.right) / 2
                val scaleValue = getGaussianScale(childCenterX, 1f, 1f, 150.toDouble())
                child.scaleX = scaleValue
                child.scaleY = scaleValue
                colorView(child, scaleValue)
            }
        }
    }

    private fun colorView(child: View, scaleValue: Float) {
        val saturationPercent = (scaleValue - 1) / 1f
        val alphaPercent = scaleValue / 2f
        val matrix = ColorMatrix()
        matrix.setSaturation(saturationPercent)

        viewsToChangeColor.forEach { viewId ->
            val viewToChangeColor = child.findViewById<View>(viewId)
            when (viewToChangeColor) {
                is ImageView -> {
                    viewToChangeColor.colorFilter = ColorMatrixColorFilter(matrix)
                    viewToChangeColor.imageAlpha = (255 * alphaPercent).toInt()
                }
                is TextView -> {
                    val textColor = ArgbEvaluator().evaluate(saturationPercent, inactiveColor, activeColor) as Int
                    viewToChangeColor.setTextColor(textColor)
                }
            }
        }
    }

    private fun getGaussianScale(
        childCenterX: Int,
        minScaleOffest: Float,
        scaleFactor: Float,
        spreadFactor: Double
    ): Float {
        val recyclerCenterX = (left + right) / 2
        return (Math.pow(
            Math.E,
            -Math.pow(childCenterX - recyclerCenterX.toDouble(), 2.toDouble()) / (2 * Math.pow(
                spreadFactor,
                2.toDouble()
            ))
        ) * scaleFactor + minScaleOffest).toFloat()
    }

}
```

### Step 4: Design Layouts

We will need two layouts for this project:

**(a). list_item.xml**

A layout to represent a single carousel item:

```xml
<?xml version="1.0" encoding="utf-8"?>
<RelativeLayout xmlns:android="http://schemas.android.com/apk/res/android"
    android:layout_width="wrap_content"
    android:layout_height="wrap_content"
    android:layout_margin="24dp"
    android:paddingStart="24dp"
    android:paddingTop="64dp"
    android:paddingEnd="24dp"
    android:paddingBottom="64dp">

    <ImageView
        android:id="@+id/list_item_background"
        android:layout_width="100dp"
        android:layout_height="100dp"
        android:layout_centerInParent="true"
        android:src="@drawable/icon_background_blue" />

    <ImageView
        android:id="@+id/list_item_icon"
        android:layout_width="64dp"
        android:layout_height="64dp"
        android:layout_centerInParent="true" />

    <TextView
        android:id="@+id/list_item_text"
        android:layout_width="wrap_content"
        android:layout_height="wrap_content"
        android:layout_below="@id/list_item_background"
        android:layout_centerHorizontal="true"
        android:layout_marginTop="32dp"
        android:textColor="@color/blue"
        android:textSize="22sp" />

</RelativeLayout>
```

**(b). activity_main.xml**

Will contain our custom Horizontal Carousel recyclerview:

```xml
<?xml version="1.0" encoding="utf-8"?>
<LinearLayout xmlns:android="http://schemas.android.com/apk/res/android"
    android:layout_width="match_parent"
    android:layout_height="match_parent"
    android:background="#ffffff">

    <supahsoftware.androidexamplecarousel.HorizontalCarouselRecyclerView
        android:id="@+id/item_list"
        android:layout_width="match_parent"
        android:layout_height="wrap_content"
        android:layout_gravity="center_vertical"
        android:clipToPadding="false"
        android:overScrollMode="never" />

</LinearLayout>
```

### Step 5: Create an Adapter

Create our carousel adapter:

**ItemAdapter.kt**

```kotlin

class ItemAdapter(val itemClick: (position:Int,item:Item) -> Unit) : RecyclerView.Adapter<ItemViewHolder>() {

    private var items: List<Item> = listOf()

    override fun onCreateViewHolder(parent: ViewGroup, viewType: Int): ItemViewHolder =
        ItemViewHolder(LayoutInflater.from(parent.context).inflate(R.layout.list_item, parent, false))

    override fun onBindViewHolder(holder: ItemViewHolder, position: Int) {
        holder.bind(items[position])
        holder.itemView.setOnClickListener {
            itemClick(position,items[position])
        }
    }

    override fun getItemCount() = items.size

    fun setItems(newItems: List<Item>) {
        items = newItems
        notifyDataSetChanged()
    }
}

class ItemViewHolder(private val view: View) : RecyclerView.ViewHolder(view) {
    fun bind(item: Item) {
        view.list_item_text.text = "${item.title}"
        view.list_item_icon.setImageResource(item.icon)
    }
}
```

### Step 6: Create MainActivity

Here is the code for MainActivity:

**MainActivity.kt**

```kotlin
class MainActivity : AppCompatActivity() {

    private val itemAdapter by lazy {
        ItemAdapter { position: Int, item: Item ->
            Toast.makeText(this@MainActivity, "Pos ${position}", Toast.LENGTH_LONG).show()
            item_list.smoothScrollToPosition(position)
        } }
    private val possibleItems = listOf(
        Item("Airplanes", R.drawable.ic_airplane),
        Item("Cars", R.drawable.ic_car),
        Item("Food", R.drawable.ic_food),
        Item("Gas", R.drawable.ic_gas),
        Item("Home", R.drawable.ic_home)
    )

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_main)

        item_list.initialize(itemAdapter)
        item_list.setViewsToChangeColor(listOf(R.id.list_item_background, R.id.list_item_text))
        itemAdapter.setItems(getLargeListOfItems())
    }

    private fun getLargeListOfItems(): List<Item> {
        val items = mutableListOf<Item>()
        (0..40).map { items.add(possibleItems.random()) }
        return items
    }
}

data class Item(
    val title: String,
    @DrawableRes val icon: Int
)
```

### Run

Copy the code or download it in the link below, build and run.

### Reference

Here are the reference links:

| Number | Link |
| --- | --- |
| 1. | [Download](https://github.com/SupahSoftware/AndroidExampleCarousel/archive/refs/heads/master.zip) Example |
| 2. | [Follow](https://github.com/SupahSoftware/) code author |
| 3. | Code: [Apache 2.0 License](http://www.apache.org/licenses/LICENSE-2.0.txt) |

# Concepts 2: Best Android Image Carousel Libraries - 2021

> Proceed to the next page to view the best android image carousel libraries this year.

# Concepts 2: Best Android Image Carousel Libraries - 2021


## (a). Pluto

> Pluto is an Easy, lightweight and high performance slider view library for Android! You can customize it to any view since it based RecyclerView.

The differnce of this library, we are not following the concept of images model. Pluto is not depending on any Image loading library.

Here is the demo:

![](https://github.com/OpenSooq/Pluto/blob/master/demoassets/demo_1.gif) ![](https://github.com/OpenSooq/Pluto/blob/master/demoassets/demo_2.gif)

## Step 1: How to Install Pluto

Pluto requires API 17+.

This library is available in **jCenter** which is the default Maven repository used in Android Studio. You can also import this library from source as a module.

```groovy
dependencies {
    // other dependencies here
    implementation 'com.opensooq.android:pluto:1.6'
}
```

## Step 2: How to Use pluto

To create an image carousel using Pluto, first create your own adapter extending the `PlutoAdapter`:

#### Kotlin

```kotlin
class YourAdapter(items: MutableList<YourModel> , onItemClickListener: OnItemClickListener<Movie>? = null)
    : PlutoAdapter<YourModel, YourViewHolder>(items,onItemClickListener) {

    override fun getViewHolder(parent: ViewGroup, viewType: Int): ViewHolder {
        return ViewHolder(parent, R.layout.item_your_layout)
    }

    class YourViewHolder(parent: ViewGroup, itemLayoutId: Int) : PlutoViewHolder<YourModel>(parent, itemLayoutId) {
        private var ivPoster: ImageView = getView(R.id.iv_poster)
        private var tvRating: TextView = getView(R.id.tv_rating)

        override fun set(item: YourModel, position: Int) {
           //  yourImageLoader.with(mContext).load(item.getPosterId()).into(ivPoster);
            tvRating.text = item.imdbRating
        }
    }
}
```

#### Java

```java
public class YourAdapter extends PlutoAdapter<YourModel, YourViewHolder> {

    public YourAdapter(List<YourModel> items) {
        super(items);
    }

    @Override
    public ViewHolder getViewHolder(ViewGroup parent, int viewType) {
        return new YourViewHolder(parent, R.layout.item_your_layout);
    }

    public static class YourViewHolder extends PlutoViewHolder<YourModel> {
        ImageView ivPoster;
        TextView tvRating;

        public YourViewHolder(ViewGroup parent, int itemLayoutId) {
            super(parent, itemLayoutId);
            ivPoster = getView(R.id.iv_poster);
            tvRating = getView(R.id.tv_rating);
        }

        @Override
        public void set(YourModel item, int pos) {
           //  yourImageLoader.with(mContext).load(item.getPosterId()).into(ivPoster);
            tvRating.setText(item.getImdbRating());
        }
    }
}
```

Then add PlutoView in your XML layouts:

```XML
<com.opensooq.pluto.PlutoView
        android:id="@+id/slider_view"
        android:layout_width="match_parent"
        android:layout_height="wrap_content"
        app:indicator_visibility="true"
        app:layout_constraintEnd_toEndOf="parent"
        app:layout_constraintStart_toStartOf="parent"
        app:layout_constraintTop_toTopOf="parent"/>
```

Then finaly attach the adapter to Pluto:

#### Kotlin

```kotlin
val pluto = findViewById<PlutoView>(R.id.slider_view)
        val yourAdapter = YourAdapter(yourModelList, object : OnItemClickListener<Movie> {
            override fun onItemClicked(item: yourModel?, position: Int) {
            }
        })

        pluto.create(adapter, lifecycle = lifecycle)//pass the lifecycle to make the slider aware of lifecycle to avoid memory leak and handling the pause/destroy/resume
```

#### Java

```java
  PlutoView pluto = findViewById(R.id.slider_view);
        YourAdapter adapter = new YourAdapter(yourModelsList);
        pluto.create(adapter,getLifecycle());  //pass the lifecycle to make the slider aware of lifecycle to avoid memory leak and handling the pause/destroy/resume
```

| Method | usage |
| --- | --- |
| `create(PlutoAdapter adapter, long duration,Lifecycle lifecyle)` | it is the initialization method it take your adapter and the duration of waiting between each slide and lifecycle to make slider lifecylce-aware |
| `startAutoCycle()` | by default the value of autocycle is true, it determine to start autocycling or not |
| `stopAutoCycle()` | it stops the auto cycling of the view |
| `moveNextPosition()` | if you are the auto cylce is off you can manually move next with this method |
| `movePrevPosition()` | if you are the auto cylce is off you can manually move to the previus item with this method |
| `setIndicatorPosition(IndicatorPosition presetIndicator)` | to set the position of the indicator where values are `CENTER_BOTTOM` `RIGHT_BOTTOM` `LEFT_BOTTOM` `CENTER_TOP` `RIGHT_TOP` `LEFT_TOP` |
| `setCustomIndicator(PlutoIndicator indicator)` | if you want to custom the indicator use this method for custom indicators check [Custom indicators](#indicator) |

### Example

Let's look at a full example of how to create an image carousel using Pluto:

**SliderAdapter**

Here is a custom adapter for the image slider:

```kotlin

import android.view.ViewGroup
import android.widget.ImageView
import android.widget.TextView

import com.bumptech.glide.Glide
import com.opensooq.pluto.base.PlutoAdapter
import com.opensooq.pluto.base.PlutoViewHolder
import com.opensooq.pluto.listeners.OnItemClickListener

class SliderAdapter(items: MutableList, onItemClickListener: OnItemClickListener) : PlutoAdapter<Movie, SliderAdapter.ViewHolder>(items, onItemClickListener) {

    override fun getViewHolder(parent: ViewGroup, viewType: Int): ViewHolder {
        return ViewHolder(parent, R.layout.item_movie_promotion)
    }

    class ViewHolder(parent: ViewGroup, itemLayoutId: Int) : PlutoViewHolder(parent, itemLayoutId) {
        private var ivPoster: ImageView = getView(R.id.iv_poster)
        private var tvRating: TextView = getView(R.id.tv_rating)

        override fun set(item: Movie, position: Int) {
            Glide.with(context).load(item.posterId).into(ivPoster)
            tvRating.text = item.imdbRating
        }
    }
}
```

**MainActivity.**

The main activity:

```kotlin
package com.opensooq.plutodemo

import android.content.Intent
import android.os.Bundle
import android.support.v7.app.AppCompatActivity
import android.util.Log
import android.widget.LinearLayout

import com.opensooq.pluto.PlutoView
import com.opensooq.pluto.base.PlutoAdapter
import com.opensooq.pluto.listeners.OnItemClickListener
import com.opensooq.pluto.listeners.OnSlideChangeListener

const val TAG = "MainActivity"

class MainActivity : AppCompatActivity() {

    private fun getAvenger(): MutableList {
        val items = mutableListOf()
        items.add(Movie("7.1", R.drawable.ic_captain_marvel))
        items.add(Movie("9.2", R.drawable.ic_end_game))
        items.add(Movie("7.5", R.drawable.ic_dr_strange))
        items.add(Movie("7.9", R.drawable.ic_iron_man))
        return items
    }

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_main)
        val pluto = findViewById(R.id.slider_view)
        val adapter = SliderAdapter(getAvenger(), object : OnItemClickListener {
            override fun onItemClicked(item: Movie?, position: Int) {
                Log.d(TAG, "on Item clicked $position ${item?.imdbRating}")
            }
        })

        pluto.create(adapter, lifecycle = lifecycle)
        pluto.setOnSlideChangeListener(object : OnSlideChangeListener {
            override fun onSlideChange(adapter: PlutoAdapter<\*, \*>, position: Int) {
                Log.d(TAG, "on slide change $position ")

            }
        })

        val button = findViewById(R.id.indicator_example)
        button.setOnClickListener {
            startActivity(Intent(this, CustomIndicatorActivity::class.java))
        }

    }
}
```

Find source code [here](https://github.com/OpenSooq/Pluto/tree/master/app).

### Reference

find more documentation and code reference [here](https://github.com/OpenSooq/Pluto).

## (b). Sliding-Carousel

> Android Library for easing Slider insertion to your apps with support for Images.

Here are it's features:

- Written in Kotlin
- No boilerplate code
- Easy initialization

Here's the demo:

![](https://camo.githubusercontent.com/9bc54cae4b3276300a5962757c4193e033132e9255c2fe9206a38bb3a5cf00d2/68747470733a2f2f692e706f7374696d672e63632f445a4d72504463392f6f6b612e676966)

### Step 1: Install Sliding Carousel

Specify the jitpakc as repository in your allProjects closure in the root level build.gardle file:

```groovy
allprojects {
    repositories {
        ...
        maven { url 'https://jitpack.io' }
    }
}
```

Then add this implementation statement in the dependencies closure in the app level build.gradle:

```groovy
implementation 'com.github.akshaaatt:Sliding-Carousel:1.0.1'
```

Now sync your project.

### Step 2: Add Carousel to Layout

Now add the sliding carousel to your xml layout:

```xml
<com.limerse.slider.ImageCarousel
    android:id="@+id/carousel"
    android:layout_width="match_parent"
    android:layout_height="256dp" />
```

### Step 3: Write Code

Reference the ImageCarousel:

```kotlin
val carousel: ImageCarousel = findViewById(R.id.carousel)
```

Register it to the lifecycle of the activity:

```kotlin
carousel.registerLifecycle(lifecycle)
```

Create a list to hold carousel items:

```kotlin
val list = mutableListOf<CarouselItem>()
```

Now add images with or without captions:

```kotlin
// Image URL with caption
list.add(
    CarouselItem(
        imageUrl = "https://images.unsplash.com/photo-1532581291347-9c39cf10a73c?w=1080",
        caption = "Photo by Aaron Wu on Unsplash"
    )
)
```

Image without caption:

```kotlin
// Just image URL
list.add(
    CarouselItem(
        imageUrl = "https://images.unsplash.com/photo-1534447677768-be436bb09401?w=1080"
    )
)
```

To add image url with header:

```kotlin
// Image URL with header
val headers = mutableMapOf<String, String>()
headers["header_key"] = "header_value"

list.add(
    CarouselItem(
        imageUrl = "https://images.unsplash.com/photo-1534447677768-be436bb09401?w=1080",
        headers = headers
    )
)
```

**Image Carousel Attributes**

Here are all attributes of this library:

```xml
<com.limerse.slider.ImageCarousel
    android:id="@+id/carousel"
    android:layout_width="match_parent"
    android:layout_height="match_parent"

    app:showTopShadow="true"
    app:topShadowAlpha="0.6"
    app:topShadowHeight="32dp"

    app:showBottomShadow="true"
    app:bottomShadowAlpha="0.6"
    app:bottomShadowHeight="64dp"

    app:showCaption="true"
    app:captionMargin="0dp"
    app:captionTextSize="14sp"

    app:showIndicator="true"
    app:indicatorMargin="0dp"

    app:imageScaleType="centerCrop"

    app:carouselBackground="#00000000"
    app:imagePlaceholder="@drawable/ic_picture"

    app:carouselPadding="0dp"
    app:carouselPaddingBottom="0dp"
    app:carouselPaddingEnd="0dp"
    app:carouselPaddingStart="0dp"
    app:carouselPaddingTop="0dp"

    app:showNavigationButtons="true"
    app:previousButtonLayout="@layout/previous_button_layout"
    app:previousButtonId="@id/btn_previous"
    app:previousButtonMargin="4dp"
    app:nextButtonLayout="@layout/next_button_layout"
    app:nextButtonId="@id/btn_next"
    app:nextButtonMargin="4dp"

    app:carouselType="BLOCK"
    app:carouselGravity="CENTER"

    app:scaleOnScroll="false"
    app:scalingFactor="0.15"
    app:autoWidthFixing="true"
    app:autoPlay="false"
    app:autoPlayDelay="3000"
    app:infiniteCarousel="true"
    app:touchToPause="true" />
```

### Example

You can find a full example [here](https://github.com/akshaaatt/Sliding-Carousel/tree/master/app).

### Reference

Find more [here](https://github.com/akshaaatt/Sliding-Carousel)
