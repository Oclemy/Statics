# Android DiffUtil vs NotifyDataSetChanged usage

Android Engineers added the DiffUtil class in API level 25.1.0. It was added in the `android.support.v7.util` package.

Let's answer some basic questions to better understand DiffUtil.


### (a). DiffUtil

According to the official documentation, DiffUtil is a utility class that can calculate the difference between two lists and output a list of update operations that converts the first list into the second one.

As a class it derives from the `java.lang.Object`:

```java
public class DiffUtil extends Object
```

Well it's a more efficient alternative to `notifyDataSetChanged()` method. The `notify`

DiffUtil is a utility class that can calculate the difference between two lists and output a list of update operations that converts the first list into the second one.

It can be used to calculate updates for a RecyclerView Adapter. See ListAdapter and AsyncListDiffer which can compute diffs using DiffUtil on a background thread.

DiffUtil uses Eugene W. Myers's difference algorithm to calculate the minimal number of updates to convert one list into another. Myers's algorithm does not handle items that are moved so DiffUtil runs a second pass on the result to detect items that were moved.

If the lists are large, this operation may take significant time so you are advised to run this on a background thread, get the DiffUtil.DiffResult then apply it on the RecyclerView on the main thread.

### (b). notifyDataSetChanged()

Well `notifyDataSetChanged()` is a method defined in the `RecyclerView.Adapter` class:

```java
void notifyDataSetChanged ()
```

It's role is to inform it's subscribers that the data source has changed. This allows them to update themselves. NotifyDataSetChanged() even widely used as it's easy to use, isn't very efficient.

This is because it does not specify the type of change that has occured. Changes regarding data and involve two scenarios:

1. When only data changes but structure doesn't change.
2. When data changes in a way that affects the structure of the list. For example when user inserts or removes an item from the list.

What makes notifyDataSetChanged() inefficient is that it forces observers to refresh everything as opposed to just the items that have changed.

Android documentation recommends using more specific change events like `notifyItemInserted(int position)` etc when using adapter.

### Example : Kotlin Android - DiffUtil vs NotifyDataSetChanged usage examples

Now that we've made a brief comparison between DiffUtil and notifyDataSetChanged(), let's come now and write an example to show how to use them with a recyclerview. The app will comprise two tabs(or rather buttons working as tabs). The first tab when clicked shows recyclerview with data changes being handled by `notifyDataSetChanged()`. The second tab shows recyclerview with data changes being handled by `DiffUtil`.

We will be using Kotlin and Androidx.

**Video Tutorial**

<iframe width="788" height="443" src="https://www.youtube.com/embed/d00e-kvuF9k" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>

#### Gradle scripts

##### (a). build.gradle(app)

In your dependencies make sure recyclerview has been added:

```groovy
dependencies {
    implementation fileTree(dir: 'libs', include: ['*.jar'])
    implementation"org.jetbrains.kotlin:kotlin-stdlib-jdk7:$kotlin_version"
    implementation 'androidx.appcompat:appcompat:1.0.2'
    implementation 'androidx.core:core-ktx:1.0.2'
    implementation 'androidx.constraintlayout:constraintlayout:1.1.3'
    testImplementation 'junit:junit:4.12'
    androidTestImplementation 'androidx.test:runner:1.2.0'
    androidTestImplementation 'androidx.test.espresso:espresso-core:3.2.0'
    implementation 'androidx.recyclerview:recyclerview:1.0.0'
    implementation 'androidx.cardview:cardview:1.0.0'
}
```

#### Layouts

##### (a). activity_main.xml

This is our main layout. We will have a recyclerview with two buttons on top of it.

```xml
<?xml version="1.0" encoding="utf-8"?>
<LinearLayout xmlns:android="http://schemas.android.com/apk/res/android"
    xmlns:app="http://schemas.android.com/apk/res-auto"
    xmlns:tools="http://schemas.android.com/tools"
    android:layout_width="match_parent"
    android:layout_height="match_parent"
    android:orientation="vertical"
    tools:context=".MainActivity">

    <LinearLayout
            android:orientation="horizontal"
            android:layout_width="match_parent"
            android:layout_height="wrap_content">
        <Button
                android:id="@+id/starsBtn"
                android:background="@color/colorAccent"
                android:layout_weight="0.5"
                android:layout_width="0dp"
                android:layout_height="wrap_content"
                android:textColor="@android:color/white"
                android:textStyle="bold"
                android:text="Stars"/>
        <Button
                android:id="@+id/galaxiesBtn"
                android:background="@android:color/holo_red_light"
                android:layout_weight="0.5"
                android:layout_width="0dp"
                android:layout_height="wrap_content"
                android:textColor="@android:color/white"
                android:textStyle="bold"
                android:text="Galaxies"/>
    </LinearLayout>

    <androidx.recyclerview.widget.RecyclerView
        android:id="@+id/myRecyclerView"
        android:layout_width="match_parent"
        android:layout_height="wrap_content"
        app:layoutManager="androidx.recyclerview.widget.LinearLayoutManager"
        tools:listitem="@layout/model" />

</LinearLayout>
```

##### (b). model.xml

This is our recyclerview item layout. It's just a cardview containing a textview:

```xml
<?xml version="1.0" encoding="utf-8"?>
<androidx.cardview.widget.CardView
        xmlns:android="http://schemas.android.com/apk/res/android"
        xmlns:card_view="http://schemas.android.com/apk/res-auto"
        android:layout_width="match_parent"
        android:layout_margin="3dp"
        card_view:cardCornerRadius="2dp"
        card_view:cardElevation="5dp"
        android:layout_height="120dp"
        android:foreground="?android:selectableItemBackground">
    <!-- set foreground to this ^ for animation onClick-->

    <TextView
            android:layout_width="match_parent"
            android:layout_height="wrap_content"
            android:textAppearance="?android:attr/textAppearanceSmall"
            android:text="Name"
            android:id="@+id/nameTxt"
            android:padding="10dp"
            android:textColor="@color/colorAccent"
            android:textStyle="bold"
            android:layout_alignParentLeft="true"/>

</androidx.cardview.widget.CardView>
```

#### Kotlin Code

##### (a). MyNotifyDataSetAdapter

This class shows you the classic way of provding updates to the recyclerview, the good old notifyDataSetChanged.

Start by adding imports to `MyNotifyDataSetAdapter.kt`:

```kotlin
import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import androidx.recyclerview.widget.RecyclerView
import kotlinx.android.synthetic.main.model.view.*
```

Then create the class and make it derive from `RecyclerView.Adapter`. The ViewHolder class is specified as the generic parameter of the Adapter class.

```kotlin
class MyNotifyDataSetAdapter(var stars: List<String>):
         RecyclerView.Adapter<MyNotifyDataSetAdapter.MyViewHolder>() {
```

You can see that a List of strings, our data set, has been passed via the constructor.

Then prepare our ItemClickListener:

```kotlin
    var ItemClickListener: ((position: Int, name: String) -> Unit)? = null
```

Then let's override our onCreateViewHolder:

```kotlin
    override fun onCreateViewHolder(parent: ViewGroup, viewHolderType: Int): MyViewHolder {
        val itemView = LayoutInflater.from(parent.context).inflate(R.layout.model, parent, false)
        return MyViewHolder(itemView)
    }
```

You can see we are inflating our model layout inside it and passing the resultant view object tp the ViewHolder constructor.

Then override two more methods:

```kotlin
    override fun getItemCount(): Int {
        // Size of items to load
        return stars.size
    }

    override fun onBindViewHolder(viewHolder: MyViewHolder, position: Int) {
        viewHolder.bindView(stars[position], position)
    }
```

Let's create an inner `MyViewHolder` class:

```kotlin
    inner class MyViewHolder(itemView: View) : RecyclerView.ViewHolder(itemView) {
        fun bindView(star: String, position: Int) {
            itemView.nameTxt.text = star

            itemView.setOnClickListener {
                ItemClickListener?.invoke(position, star)
            }
        }
    }
```

And finally here is the difference, our notifyDataSetChanged(), take note of how simple it is to use:

```kotlin
    fun updateList(newStars: List<String>) {
        this.stars = newStars

        // Call this when you change the data of Recycler View to refresh the items
        notifyDataSetChanged()
    }
```

**FULL CODE - MyNotifyDataSetAdapter.kt**

```kotlin
package info.camposha.krecyclerviewdiffutil

import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import androidx.recyclerview.widget.RecyclerView
import kotlinx.android.synthetic.main.model.view.*

/**
 * This class will generate the recycled views and load data when they come into screen using
 * view holder pattern. Updates from the data source to the recyclerview will occur through
 * notifyDatasetChanged
 */
class MyNotifyDataSetAdapter(var stars: List<String>):
         RecyclerView.Adapter<MyNotifyDataSetAdapter.MyViewHolder>() {

    var ItemClickListener: ((position: Int, name: String) -> Unit)? = null

    override fun onCreateViewHolder(parent: ViewGroup, viewHolderType: Int): MyViewHolder {
        val itemView = LayoutInflater.from(parent.context).inflate(R.layout.model, parent, false)
        return MyViewHolder(itemView)
    }

    override fun getItemCount(): Int {
        // Size of items to load
        return stars.size
    }

    override fun onBindViewHolder(viewHolder: MyViewHolder, position: Int) {
        viewHolder.bindView(stars[position], position)
    }

    inner class MyViewHolder(itemView: View) : RecyclerView.ViewHolder(itemView) {
        fun bindView(star: String, position: Int) {
            itemView.nameTxt.text = star

            itemView.setOnClickListener {
                ItemClickListener?.invoke(position, star)
            }
        }
    }
    fun updateList(newStars: List<String>) {
        this.stars = newStars

        // Call this when you change the data of Recycler View to refresh the items
        notifyDataSetChanged()
    }
}
```

Well that's it. We've created an adapter that can bind our data to our recyclerview. We've alse prepared a method that can allow us update the recyclerview using `notifyDataSetChanged()`.

##### (b). MyDiffCallback

This and the next class will allow us make use of the DiffUtil.

First import the DiffUtil class using the following:

```kotlin

import androidx.recyclerview.widget.DiffUtil
```

Then let's create a class implementing an interface:

```kotlin
open class MyDiffCallback(
    private val oldGalaxies: List<String>,
    private val newGalaxies: List<String>
): DiffUtil.Callback() {
```

Well in the above code we've created an open class and made it receive two `List<String>` objects via constructor. We;ve then made it derive the abstract `Callback` class defined in the `DiffUtil` class.

Then let's override four methods:

```kotlin
    override fun getOldListSize(): Int {
        return oldGalaxies.size
    }

    override fun getNewListSize(): Int {
        return newGalaxies.size
    }

    override fun areItemsTheSame(oldItemPosition: Int, newItemPosition: Int): Boolean {
        // In the real world you need to compare something unique like id
        return oldGalaxies[oldItemPosition] == newGalaxies[newItemPosition]
    }

    override fun areContentsTheSame(oldItemPosition: Int, newItemPosition: Int): Boolean {
        // This is called if areItemsTheSame() == true;
        return oldGalaxies[oldItemPosition] == newGalaxies[newItemPosition]
    }
```

You can see the methods are rather self explanatory.

**FULL CODE : MyDiffCallback.kt**

```kotlin
package info.camposha.krecyclerviewdiffutil

import androidx.recyclerview.widget.DiffUtil

//DiffUtil is a utility class that can calculate the difference between two lists and
// output a list of update operations that converts the first list into the second one.

//It can be used to calculate updates for a RecyclerView Adapter.

open class MyDiffCallback(
    private val oldGalaxies: List<String>,
    private val newGalaxies: List<String>
): DiffUtil.Callback() {

    override fun getOldListSize(): Int {
        return oldGalaxies.size
    }

    override fun getNewListSize(): Int {
        return newGalaxies.size
    }

    override fun areItemsTheSame(oldItemPosition: Int, newItemPosition: Int): Boolean {
        // In the real world you need to compare something unique like id
        return oldGalaxies[oldItemPosition] == newGalaxies[newItemPosition]
    }

    override fun areContentsTheSame(oldItemPosition: Int, newItemPosition: Int): Boolean {
        // This is called if areItemsTheSame() == true;
        return oldGalaxies[oldItemPosition] == newGalaxies[newItemPosition]
    }
}
//end
```

##### (c). MyDiffUtilAdapter

With our Callback ready to use, we now come to the adapter. It's easy. In fact only method is different from the code we had written in the `MyNotifyDataSetAdapter` class.

And that method is here:

```kotlin
    /**
     *  THIS IS THE ONLY DIFFERENCE BETWEEN the regular MyNotifyDataSetAdapter
     */
    fun updateList(newGalaxies: List<String>) {

        val diffCallback = MyDiffCallback(this.galaxies, newGalaxies)
        val diffResult = DiffUtil.calculateDiff(diffCallback)
        diffResult.dispatchUpdatesTo(this)

        this.galaxies = newGalaxies
    }
```

**FULL CODE : MyDiffUtilAdapter.kt**

```kotlin
package info.camposha.krecyclerviewdiffutil

import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import androidx.recyclerview.widget.DiffUtil
import androidx.recyclerview.widget.RecyclerView
import kotlinx.android.synthetic.main.model.view.*

/**
 * This is the same RecyclerView but using DiffUtil instead of
 * notifyDataSetChanged() to animate changes
 */
class MyDiffUtilAdapter(var galaxies: List<String>):
         RecyclerView.Adapter<MyDiffUtilAdapter.MyViewHolder>() {

    var ItemClickListener: ((position: Int, name: String) -> Unit)? = null

    override fun onCreateViewHolder(parent: ViewGroup, viewHolderType: Int):
     MyViewHolder = MyViewHolder(LayoutInflater.from(parent.context).inflate(
        R.layout.model, parent, false))

    override fun getItemCount(): Int = galaxies.size

    override fun onBindViewHolder(viewHolder: MyViewHolder, position: Int) {
        viewHolder.bindView(galaxies[position], position)
    }

    inner class MyViewHolder(itemView: View) : RecyclerView.ViewHolder(itemView) {
        fun bindView(galaxy: String, position: Int) {
            itemView.nameTxt.text = galaxy
            itemView.setOnClickListener { ItemClickListener?.invoke(position, galaxy) }
        }
    }

    /**
     *  THIS IS THE ONLY DIFFERENCE BETWEEN the regular MyNotifyDataSetAdapter
     */
    fun updateList(newGalaxies: List<String>) {

        val diffCallback = MyDiffCallback(this.galaxies, newGalaxies)
        val diffResult = DiffUtil.calculateDiff(diffCallback)
        diffResult.dispatchUpdatesTo(this)

        this.galaxies = newGalaxies
    }
}
//end
```

Ideally, you can save yourself from typing repetitive code by just including the `updateList` method in the first adapter since they are similar apart from that method.

##### (d). MainActivity

We have done the main work. Here is the code for MainActivity to make use of both adapters:

```kotlin
package info.camposha.krecyclerviewdiffutil

import android.os.Bundle
import android.widget.Toast
import androidx.appcompat.app.AppCompatActivity
import androidx.recyclerview.widget.GridLayoutManager
import androidx.recyclerview.widget.LinearLayoutManager
import kotlinx.android.synthetic.main.activity_main.*

@Suppress("DEPRECATION")
class MainActivity : AppCompatActivity() {

    private val stars = listOf(
        "Aldebaran",
        "Rigel",
        "Canopus",
        "Bellatrix",
        "Polaris",
        "Regulus",
        "VY Canis Majoris",
        "UY Scuti",
        "Deneb",
        "Wezen",
        "Arcturus"
    )
    private val galaxies = listOf(
        "Circunus",
        "Milky Way",
        "Andromeda",
        "StarBust",
        "Sombrero",
        "Pinwheel",
        "Cartwheel",
        "Large Magellonic Cloud",
        "Hoags Object",
        "Centaurus A",
        "Leo",
        "Virgo Stellar Stream"
    )

    private fun show(name: String) {
        Toast.makeText(this, "$name clicked!", Toast.LENGTH_SHORT).show()
    }

    private fun useNotifyDataSet() {
        val adapter = MyNotifyDataSetAdapter(stars)
        myRecyclerView.adapter = adapter
        myRecyclerView.layoutManager= LinearLayoutManager(this)
        myRecyclerView.setHasFixedSize(true)

        adapter.ItemClickListener = { position, name ->
            show(name)
        }
        adapter.updateList(stars)

    }

    private fun useDiffUtil() {
        val adapter = MyDiffUtilAdapter(galaxies)
        myRecyclerView.adapter = adapter
        myRecyclerView.layoutManager= GridLayoutManager(this,2)
        myRecyclerView.setHasFixedSize(true)

        adapter.ItemClickListener = { position, name ->
            show( name)
        }
        adapter.updateList(galaxies)
    }

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_main)

        useNotifyDataSet()

        starsBtn.setOnClickListener {
            useNotifyDataSet()
            starsBtn.setBackgroundColor(resources.getColor(android.R.color.holo_red_light))
            galaxiesBtn.setBackgroundColor(resources.getColor(R.color.colorAccent))
        }
        galaxiesBtn.setOnClickListener {
            useDiffUtil()
            galaxiesBtn.setBackgroundColor(resources.getColor(android.R.color.holo_red_light))
            starsBtn.setBackgroundColor(resources.getColor(R.color.colorAccent))

        }
    }

}
//end
```

### Download

SOURCE CODE : [Download](https://github.com/Oclemy/RecyclerViewDiffUtil/archive/master.zip)

GITHUB : [Browse](https://github.com/Oclemy/RecyclerViewDiffUtil)

References : [Android documenation](https://developer.android.com/reference/android/support/v7/util/DiffUtil)

Good day.
