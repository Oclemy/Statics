# ViewPager Indicator Examples


When you are using a ViewPager to implement swipeable pages, it is good practice to attach indicators so that users can figure out that the pages or views can be swiped. In this tutorial we will look at solutions that allow you to attach indicators to viewpager.


## Example 1: ViewPapger Indicator Example using ViewPagerDots

> This is a simple, compact Kotlin library for ViewPager page indicators.

This solution provides a very small, compact, Kotlin-based implementation for ViewPager dots. The dots can of course be switched out for whatever type of Drawable you wish. The animation can be customized as well.

You can see it in use here:

![ViewPager Indicators Android](https://raw.githubusercontent.com/afollestad/viewpagerdots/master/assets/demo.gif)

Let's see how to use.

### Step 1: Install it

The first step is to install in your project. This library is hosted in maven central, so all you need is add the following dependency in your app level build.gradle then sync:

```groovy
 implementation 'com.afollestad:viewpagerdots:1.0.0'
```

### Step 2: Add to Layout

Next you need to add the ViewPagerIndicator dots in your layout. Of course you add it alongside Viewpager as it is viewpager that provides the swipe capability.

For example below is a layout containing both viewpager indicator dots with the Viewpager:

```xml
<LinearLayout
    xmlns:android="http://schemas.android.com/apk/res/android"
    android:layout_width="match_parent"
    android:layout_height="match_parent"
    android:orientation="vertical"
    >

  <com.afollestad.viewpagerdots.DotsIndicator
      android:id="@+id/dots"
      android:layout_width="match_parent"
      android:layout_height="48dp"
      />

  <androidx.viewpager.widget.ViewPager
      android:id="@+id/pager"
      android:layout_width="match_parent"
      android:layout_height="match_parent"
      />

</LinearLayout>
```

### Step 3: Write Code

You can start by referencing the indicator as well as the viewpager:

```kotlin
val viewPager: ViewPager = // ...
val dots: DotsIndicator = // ...
```

Next you set your pageradapter to the viewpager:

```kotlin
viewPager.adapter = // ... This must be set before attaching
```

Then you attach the indicator.

```kotlin
dots.attachViewPager(viewPager)
```

Let's now explore a full ViewPager Indicator Dots example.

### Example

1.Start by installing the library as discussed abobe.

2.Next create a layout containing a viewpager as well as viewpager indicator dots:

**activity_main.xml**

```xml
<?xml version="1.0" encoding="utf-8"?>
<LinearLayout
    xmlns:android="http://schemas.android.com/apk/res/android"
    xmlns:app="http://schemas.android.com/apk/res-auto"
    xmlns:tools="http://schemas.android.com/tools"
    android:layout_width="match_parent"
    android:layout_height="match_parent"
    android:orientation="vertical"
    tools:context=".MainActivity"
    >

  <androidx.appcompat.widget.Toolbar
      android:id="@+id/toolbar"
      android:layout_width="match_parent"
      android:layout_height="?actionBarSize"
      android:background="?colorPrimary"
      android:elevation="4dp"
      app:title="@string/app_name"
      tools:ignore="UnusedAttribute"
      />

  <FrameLayout
      android:id="@+id/frame"
      android:layout_width="match_parent"
      android:layout_height="match_parent"
      android:background="@color/blue"
      >

  <com.afollestad.viewpagerdots.DotsIndicator
      android:id="@+id/dots"
      android:layout_width="match_parent"
      android:layout_height="48dp"
      />

    <androidx.viewpager.widget.ViewPager
        android:id="@+id/pager"
        android:layout_width="match_parent"
        android:layout_height="match_parent"
        tools:ignore="HardcodedText"
        >

      <TextView
          android:id="@+id/pageOne"
          android:text="Page One"
          style="@style/PageText"
          />

      <TextView
          android:id="@+id/pageTwo"
          android:text="Page Two"
          style="@style/PageText"
          />

      <TextView
          android:id="@+id/pageThree"
          android:text="Page Three"
          android:textColor="@color/black"
          style="@style/PageText"
          />

      <TextView
          android:id="@+id/pageFour"
          android:text="Page Four"
          style="@style/PageText"
          />

    </androidx.viewpager.widget.ViewPager>

  </FrameLayout>

</LinearLayout>
```

3.Now create a pager adapter by extending the `androidx.viewpager.widget.PagerAdapter` and add the following code:

**MainPagerAdapter**

```kotlin
import android.view.View
import android.view.ViewGroup
import androidx.viewpager.widget.PagerAdapter

class MainPagerAdapter : PagerAdapter() {

  override fun instantiateItem(
    collection: ViewGroup,
    position: Int
  ): Any {
    var resId = 0
    when (position) {
      0 -> resId = R.id.pageOne
      1 -> resId = R.id.pageTwo
      2 -> resId = R.id.pageThree
      3 -> resId = R.id.pageFour
    }
    return collection.findViewById(resId)
  }

  override fun isViewFromObject(
    arg0: View,
    arg1: Any
  ) = arg0 === arg1 as View

  override fun getCount() = 4

  override fun getPageTitle(position: Int) = when (position) {
    0 -> "One"
    1 -> "Two"
    2 -> "Three"
    3 -> "Four"
    else -> null
  }

  override fun destroyItem(
    container: ViewGroup,
    position: Int,
    arg1: Any
  ) = Unit
}
```

4.Lastly in your main activity add the following code:

**MainActivity**

```kotlin
class MainActivity : AppCompatActivity() {

  override fun onCreate(savedInstanceState: Bundle?) {
    super.onCreate(savedInstanceState)
    setContentView(R.layout.activity_main)

    pager.adapter = MainPagerAdapter()
    pager.offscreenPageLimit = 3
    dots.attachViewPager(pager)

    pager.onPageSelected {
      val colorRes = when (it) {
        0 -> R.color.blue
        1 -> R.color.red
        2 -> R.color.white
        else -> R.color.green
      }
      val color = ContextCompat.getColor(this, colorRes)
      frame.setBackgroundColor(color)
      dots.setDotTintRes(if (color.isColorLight()) R.color.black else R.color.white)
    }
  }
}
```

### Reference

Find code below:

| No. | Link |
| --- | --- |
| 1. | [Download Example](https://downgit.github.io/#/home?url=https://github.com/afollestad/viewpagerdots/tree/master/sample) |
| 2. | [Reference](https://github.com/afollestad/viewpagerdots) |

## Example 2: How to apply PageIndicator to both RecyclerView and ViewPager

This exmaple explores using the page indictaor with both the recyclerview and viewpager. Generally speaking, we tend to use ViewPager with pages and that works great. Those pages can be fragments or just simple views or layouts.

However we can also now use page indicator with recyclerview. This is extremely powerful as we can use recyclerview to build almost anything. For example, because of the limited nature of mobile screens, you can simply show your data in a recyclerview, one item per viewport, such that the user simply swipes to view the next. You can do this instead of listing them in a vertical or grid list.

Let's look at an example. Here is what is created:

![Kotlin Android Pageindicator with Recyclerview and viewpager](https://github.com/chahine/pageindicator/raw/master/art/pageindicator.gif)

## Step 1: Install PageIndicator

Go to your project folder, then add `jitpack` as a maven repository under the `allProjects` repositories:

```groovy
allprojects {
  repositories {
    maven { url 'https://jitpack.io' }
  }
}
```

Now move to the app folder and under the dependencies add the following implementation statement:

```groovy
implementation 'com.github.chahine:pageindicator:0.2.8'
```

Also add Picasso imageloader. This will be used to load images from the web.

Now sync to download the dependencies.

### Step 2: Design Layouts

We need three layouts:

**(a). item_card**

This will represent a single cardview in our recyclerview. In it add imageview and textviews that will show our items:

```xml
<?xml version="1.0" encoding="utf-8"?>
<androidx.cardview.widget.CardView
    xmlns:android="http://schemas.android.com/apk/res/android"
    xmlns:app="http://schemas.android.com/apk/res-auto"
    xmlns:tools="http://schemas.android.com/tools"
    android:layout_width="match_parent"
    android:layout_height="360dp"
    app:cardUseCompatPadding="true"
    >
  <LinearLayout
      android:layout_width="match_parent"
      android:layout_height="match_parent"
      android:orientation="vertical"
      >
    <ImageView
        android:id="@+id/image"
        android:layout_width="match_parent"
        android:layout_height="240dp"
        tools:background="@color/colorPrimaryDark"
        />
    <TextView
        android:id="@+id/title"
        android:layout_width="match_parent"
        android:layout_height="wrap_content"
        android:paddingEnd="16dp"
        android:paddingStart="16dp"
        android:paddingTop="16dp"
        android:textColor="#000"
        android:textSize="18sp"
        android:textStyle="bold"
        tools:text="Title"
        />
    <TextView
        android:id="@+id/caption"
        android:layout_width="match_parent"
        android:layout_height="wrap_content"
        android:ellipsize="end"
        android:maxLines="2"
        android:paddingBottom="16dp"
        android:paddingEnd="16dp"
        android:paddingStart="16dp"
        android:paddingTop="8dp"
        android:textSize="14sp"
        tools:text="Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod"
        />
  </LinearLayout>
</androidx.cardview.widget.CardView>
```

**(b). item_simple.xml**

Here define an empty view with color accent background:

```xml
<?xml version="1.0" encoding="utf-8"?>
<View
    xmlns:android="http://schemas.android.com/apk/res/android"
    android:layout_width="match_parent"
    android:layout_height="240dp"
    android:background="@color/colorAccent"
    />
```

**(c). activity_main.xml**

This is the main activity layout. Add all the necessary widgets including the `PageIndicator`, the `ViewPager` as well as the `RecyclerView`:

```xml
<?xml version="1.0" encoding="utf-8"?>
<ScrollView
    xmlns:android="http://schemas.android.com/apk/res/android"
    xmlns:app="http://schemas.android.com/apk/res-auto"
    xmlns:tools="http://schemas.android.com/tools"
    android:layout_width="match_parent"
    android:layout_height="match_parent"
    >
  <LinearLayout
      android:layout_width="match_parent"
      android:layout_height="wrap_content"
      android:orientation="vertical"
      >

    <TextView
        android:layout_width="match_parent"
        android:layout_height="wrap_content"
        android:padding="16dp"
        android:text="RecyclerView"
        style="@style/TextAppearance.AppCompat.Title"
        />

    <androidx.recyclerview.widget.RecyclerView
        android:id="@+id/list"
        android:layout_width="match_parent"
        android:layout_height="wrap_content"
        android:orientation="horizontal"
        app:layoutManager="androidx.recyclerview.widget.LinearLayoutManager"
        tools:listitem="@layout/item_card"
        />

    <com.chahinem.pageindicator.PageIndicator
        android:id="@+id/pageIndicator"
        android:layout_width="wrap_content"
        android:layout_height="wrap_content"
        android:layout_gravity="center"
        android:layout_marginTop="8dp"
        />

    <com.chahinem.pageindicator.PageIndicator
        android:id="@+id/pageIndicator2"
        android:layout_width="match_parent"
        android:layout_height="wrap_content"
        android:layout_gravity="start"
        android:layout_marginTop="8dp"
        app:piDotSpacing="8dp"
        app:piInitialPadding="16dp"
        app:piSize1="8dp"
        app:piSize2="8dp"
        app:piSize3="8dp"
        app:piSize4="8dp"
        app:piSize5="8dp"
        app:piSize6="8dp"
        />

    <TextView
        android:layout_width="match_parent"
        android:layout_height="wrap_content"
        android:layout_marginTop="32dp"
        android:padding="16dp"
        android:text="ViewPager"
        style="@style/TextAppearance.AppCompat.Title"
        />

    <androidx.viewpager.widget.ViewPager
        android:id="@+id/pager"
        android:layout_width="match_parent"
        android:layout_height="360dp"
        />

    <com.chahinem.pageindicator.PageIndicator
        android:id="@+id/pagerPageIndicator"
        android:layout_width="wrap_content"
        android:layout_height="wrap_content"
        android:layout_gravity="center"
        android:layout_marginTop="8dp"
        />

    <TextView
        android:layout_width="match_parent"
        android:layout_height="wrap_content"
        android:layout_marginTop="32dp"
        android:padding="16dp"
        android:text="Manual"
        style="@style/TextAppearance.AppCompat.Title"
        />

    <com.chahinem.pageindicator.PageIndicator
        android:id="@+id/manualPageIndicator"
        android:layout_width="wrap_content"
        android:layout_height="wrap_content"
        android:layout_gravity="center"
        />

    <LinearLayout
        android:layout_width="match_parent"
        android:layout_height="wrap_content"
        android:layout_margin="16dp"
        android:gravity="center"
        android:orientation="horizontal"
        >
      <Button
          android:id="@+id/leftBtn"
          android:layout_width="wrap_content"
          android:layout_height="wrap_content"
          android:text="Left"
          style="@style/Widget.AppCompat.Button.Colored"
          />
      <Button
          android:id="@+id/rightBtn"
          android:layout_width="wrap_content"
          android:layout_height="wrap_content"
          android:text="right"
          style="@style/Widget.AppCompat.Button.Colored"
          />
    </LinearLayout>

    <TextView
        android:layout_width="match_parent"
        android:layout_height="wrap_content"
        android:padding="16dp"
        android:text="Photos by Mary Quincy"
        style="@style/TextAppearance.AppCompat.Caption"
        />
  </LinearLayout>
</ScrollView>
```

### Step 3: Create PagerAdapter

This is the adapter for the ViewPager. Create a class that extends the `androidx.viewpager.widget.PagerAdapter` and implement the necessary functions as shown below. The item will be inflated and the data will be bound to the card widgets.Image will be loaded via Picasso.

Here is the full code:

**MyPagerAdapter.kotlin**

```kotlin
import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import android.widget.ImageView
import android.widget.TextView
import androidx.viewpager.widget.PagerAdapter
import com.chahinem.pageindicator.sample.MyAdapter.MyItem
import com.squareup.picasso.Picasso

class MyPagerAdapter(private val picasso: Picasso,
                     private val items: List<MyItem>) : PagerAdapter() {

  override fun getCount() = items.size

  override fun isViewFromObject(view: View, `object`: Any): Boolean = view == `object`

  override fun instantiateItem(container: ViewGroup, position: Int): Any {
    val view = LayoutInflater
        .from(container.context)
        .inflate(R.layout.item_card, container, false)

    val item = items[position]
    val title: TextView = view.findViewById(R.id.title)
    val caption: TextView = view.findViewById(R.id.caption)
    val image: ImageView = view.findViewById(R.id.image)

    picasso
        .load(item.image)
        .placeholder(R.color.colorPrimaryDark)
        .fit()
        .centerCrop()
        .into(image)
    title.text = item.title
    caption.text = item.caption

    container.addView(view)
    return view
  }

  override fun destroyItem(container: ViewGroup, position: Int, view: Any) {
    container.removeView(view as View)
  }
}
```

### Step 4: Create RecyclerView Adapter

The previous adapter was for the ViewPager. You also need one for the RecyclerView. Create one by extending the `RecyclerView.Adapter` class and overriding the `onCreateViewHolder()` and `onBind()` methods.

Inner classes: `MyItem` to represent a single recyclerview item and `MyViewHolder` to represent a `ViewHolder` are also created. Here is the full code:

**MyAdapter.kt**

```kotlin
import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import android.widget.ImageView
import android.widget.TextView
import androidx.recyclerview.widget.RecyclerView
import com.chahinem.pageindicator.sample.MyAdapter.MyViewHolder
import com.squareup.picasso.Picasso

class MyAdapter(private val picasso: Picasso) : RecyclerView.Adapter<MyViewHolder>() {

  private val items: MutableList<MyItem> = mutableListOf()

  override fun getItemCount() = items.size

  override fun onCreateViewHolder(parent: ViewGroup, viewType: Int) = MyViewHolder(
      LayoutInflater
          .from(parent.context)
          .inflate(R.layout.item_card, parent, false))

  override fun onBindViewHolder(holder: MyViewHolder, position: Int) {
    holder.bind(picasso, items[holder.adapterPosition])
  }

  fun swapData(data: Iterable<MyItem>?) {
    items.clear()
    data?.let { items.addAll(data) }
    notifyDataSetChanged()
  }

  class MyViewHolder(itemView: View) : RecyclerView.ViewHolder(itemView) {

    private val title: TextView = itemView.findViewById(R.id.title)
    private val caption: TextView = itemView.findViewById(R.id.caption)
    private val image: ImageView = itemView.findViewById(R.id.image)

    fun bind(picasso: Picasso, item: MyItem) {
      picasso
          .load(item.image)
          .placeholder(R.color.colorPrimaryDark)
          .fit()
          .centerCrop()
          .into(image)
      title.text = item.title
      caption.text = item.caption
    }
  }

  class MyItem(val title: String, val caption: String, val image: String)
}
```

### Step 5: Create MainActivity

In this main activity you will be attaching the page indicator to both the recyclerview and the viewpager. You will also be generating dummy data to represent the data source:

```kotlin
import android.os.Bundle
import androidx.appcompat.app.AppCompatActivity
import androidx.recyclerview.widget.LinearSnapHelper
import com.chahinem.pageindicator.sample.MyAdapter.MyItem
import com.squareup.picasso.Picasso.Builder
import kotlinx.android.synthetic.main.activity_main.*

class MainActivity : AppCompatActivity() {

  override fun onCreate(savedInstanceState: Bundle?) {
    super.onCreate(savedInstanceState)
    setContentView(R.layout.activity_main)

    val picasso = Builder(this).build()

    // RecyclerView
    val adapter = MyAdapter(picasso)
    list.adapter = adapter
    LinearSnapHelper().attachToRecyclerView(list)
    adapter.swapData(LIST_ITEMS)
    pageIndicator attachTo list
    pageIndicator2 attachTo list

    // ViewPager
    val myPagerAdapter = MyPagerAdapter(picasso, LIST_ITEMS)
    pager.adapter = myPagerAdapter
    pagerPageIndicator attachTo pager

    // Manual
    manualPageIndicator.count = 50
    leftBtn.setOnClickListener { manualPageIndicator.swipePrevious() }
    rightBtn.setOnClickListener { manualPageIndicator.swipeNext() }
  }

  companion object {
    private val LIST_ITEMS = listOf(
        MyItem(
            "Cormorant fishing at sunset",
            "Patryk Wojciechowicz",
            "https://cdn.dribbble.com/users/3178178/screenshots/6287074/cormorant_fishing_1600x1200_final_04_05_2019_4x.jpg"),
        MyItem(
            "Mountain House",
            "Alex Pasquarella",
            "https://cdn.dribbble.com/users/989466/screenshots/6100954/cabin-2-dribbble-alex-pasquarella_4x.png"),
        MyItem(
            "journey",
            "Febin_Raj",
            "https://cdn.dribbble.com/users/1803663/screenshots/6163551/nature-4_4x.png"),
        MyItem(
            "Explorer",
            "Uran",
            "https://cdn.dribbble.com/users/1355613/screenshots/6441984/landscape_4x.jpg"),
        MyItem(
            "Fishers Peak Limited Edition Print",
            "Brian Edward Miller ",
            "https://cdn.dribbble.com/users/329207/screenshots/6128300/bemocs_fisherspeak_dribbble.jpg"),
        MyItem(
            "First Man",
            "Lana Marandina",
            "https://cdn.dribbble.com/users/1461762/screenshots/6280906/first_man_lana_marandina_4x.png"),
        MyItem(
            "On The Road Again",
            "Brian Edward Miller",
            "https://cdn.dribbble.com/users/329207/screenshots/6522800/2026_nationwide_02_train_landscape_v01.00.jpg")
    )
  }
}
```

### Step 6: Add Permission and Run

You now need to add the internet permission in your android manifest file. This is needed since we are accessing the internet to load images:

```xml
  <uses-permission android:name="android.permission.INTERNET"/>
```

Then run the project. Scroll above to see the screenshot.

### Reference

Find links below:

| Number | Link |
| --- | --- |
| 1. | [Download code](https://downgit.github.io/#/home?url=https://github.com/chahine/pageindicator/tree/master/app) |
| 2. | [Follow code author](https://github.com/chahine/) |
