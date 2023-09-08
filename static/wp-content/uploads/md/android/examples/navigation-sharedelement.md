# Navigation Architecture Component + SharedElement Transition


> How to implement Jetpack Navigation Architecture Component with `SharedElement` Transition in Kotlin.

### Step 1: Dependencies

Include the following in your `app/build.gradle` under the dependencies closure:

```groovy
    implementation 'androidx.cardview:cardview:1.0.0'
    implementation "androidx.lifecycle:lifecycle-extensions:2.0.0"
    implementation 'com.github.bumptech.glide:glide:4.8.0'
    kapt 'com.github.bumptech.glide:compiler:4.8.0'
    implementation "android.arch.navigation:navigation-fragment-ktx:1.0.0-alpha08"
    implementation "android.arch.navigation:navigation-ui-ktx:1.0.0-alpha08"
```

### Step 2: Create Navigation Rules

Create a folder called `navigation` inside the `res` directory and add the following rules:

**/navigation/navigation.xml**

```xml
<?xml version="1.0" encoding="utf-8"?>
<navigation xmlns:android="http://schemas.android.com/apk/res/android"
    xmlns:app="http://schemas.android.com/apk/res-auto"
    android:id="@+id/navigation"
    app:startDestination="@id/gridFragment">

    <fragment
        android:id="@+id/gridFragment"
        android:name="com.example.withnavigation.sharedelementsample.GridFragment"
        android:label="GridFragment">
        <action
            android:id="@+id/action_gridFragment_to_imageFragment"
            app:destination="@id/imageFragment" />
        <action
            android:id="@+id/action_gridFragment_to_imageActivity"
            app:destination="@id/imageActivity" />
    </fragment>
    <fragment
        android:id="@+id/imageFragment"
        android:name="com.example.withnavigation.sharedelementsample.ImageFragment"
        android:label="ImageFragment">
        <argument
            android:name="imageURL"
            app:argType="string" />
    </fragment>
    <activity
        android:id="@+id/imageActivity"
        android:name="com.example.withnavigation.sharedelementsample.ImageActivity"
        android:label="ImageActivity">
        <argument
            android:name="image_url"
            app:argType="string" />
    </activity>
</navigation>

```

### Step 3: Create SharedElement Transition

In your `res` directory create a folder called `transition` and add the following animation code:

**/transition/change_image_transform.xml**

```xml
<?xml version="1.0" encoding="utf-8"?>
<transitionSet xmlns:android="http://schemas.android.com/apk/res/android"
    android:duration="300"
    android:transitionOrdering="together">
    <changeBounds />
    <changeTransform />
    <changeImageTransform />
</transitionSet>

```

### Step 4: Design Layouts

Design your xml layouts as follows:

**(a). item_image.xml**

Include an ImageView inside a cardView. Image URL will be passed over using data binding:

```xml
<?xml version="1.0" encoding="utf-8"?>
<layout xmlns:android="http://schemas.android.com/apk/res/android"
    xmlns:app="http://schemas.android.com/apk/res-auto">

    <data>

        <variable
            name="imageURL"
            type="String" />
    </data>

    <androidx.cardview.widget.CardView
        android:layout_width="wrap_content"
        android:layout_height="wrap_content"
        android:clickable="true"
        android:focusable="true"
        app:cardCornerRadius="4dp"
        app:cardElevation="4dp"
        app:cardUseCompatPadding="true">

        <ImageView
            android:id="@+id/image"
            android:layout_width="200dp"
            android:layout_height="200dp"
            android:scaleType="centerCrop"
            app:imageURL="@{imageURL}" />
    </androidx.cardview.widget.CardView>
</layout>

```

**(b). fragment_image.xml**

Include an ImageView inside a ConstraintLayout:

```xml
<?xml version="1.0" encoding="utf-8"?>
<layout xmlns:android="http://schemas.android.com/apk/res/android"
    xmlns:app="http://schemas.android.com/apk/res-auto">

    <androidx.constraintlayout.widget.ConstraintLayout
        android:layout_width="match_parent"
        android:layout_height="match_parent"
        android:orientation="vertical">

        <ImageView
            android:id="@+id/image"
            android:layout_width="match_parent"
            android:layout_height="match_parent"
            android:layout_marginStart="16dp"
            android:layout_marginTop="16dp"
            android:layout_marginEnd="16dp"
            android:layout_marginBottom="16dp"
            android:scaleType="fitCenter"
            app:layout_constraintBottom_toBottomOf="parent"
            app:layout_constraintEnd_toEndOf="parent"
            app:layout_constraintStart_toStartOf="parent"
            app:layout_constraintTop_toTopOf="parent" />
    </androidx.constraintlayout.widget.ConstraintLayout>
</layout>

```

**(c). fragment_grid.xml**

Include a RecyclerView inside a ConstraintLayout:

```xml
<?xml version="1.0" encoding="utf-8"?>
<layout xmlns:android="http://schemas.android.com/apk/res/android"
    xmlns:app="http://schemas.android.com/apk/res-auto">

    <androidx.constraintlayout.widget.ConstraintLayout
        android:id="@+id/content"
        android:layout_width="match_parent"
        android:layout_height="match_parent">

        <androidx.recyclerview.widget.RecyclerView
            android:id="@+id/recycler"
            android:layout_width="0dp"
            android:layout_height="0dp"
            app:layout_constraintBottom_toBottomOf="parent"
            app:layout_constraintEnd_toEndOf="parent"
            app:layout_constraintStart_toStartOf="parent"
            app:layout_constraintTop_toTopOf="parent" />
    </androidx.constraintlayout.widget.ConstraintLayout>
</layout>

```

**(d). activity_image.xml**

Add an `ImageView` that will render the Image passed to this `activity`:

```xml
<?xml version="1.0" encoding="utf-8"?>
<layout xmlns:android="http://schemas.android.com/apk/res/android"
    xmlns:app="http://schemas.android.com/apk/res-auto">

    <androidx.constraintlayout.widget.ConstraintLayout
        android:layout_width="match_parent"
        android:layout_height="match_parent">

        <ImageView
            android:id="@+id/image"
            android:layout_width="0dp"
            android:layout_height="0dp"
            android:layout_marginStart="16dp"
            android:layout_marginTop="16dp"
            android:layout_marginEnd="16dp"
            android:layout_marginBottom="16dp"
            android:scaleType="fitCenter"
            app:layout_constraintBottom_toBottomOf="parent"
            app:layout_constraintEnd_toEndOf="parent"
            app:layout_constraintStart_toStartOf="parent"
            app:layout_constraintTop_toTopOf="parent" />
    </androidx.constraintlayout.widget.ConstraintLayout>
</layout>

```

**(e). activity_main.xml**

Include a `NavHostFragment` here:

```xml
<?xml version="1.0" encoding="utf-8"?>
<androidx.constraintlayout.widget.ConstraintLayout xmlns:android="http://schemas.android.com/apk/res/android"
    xmlns:app="http://schemas.android.com/apk/res-auto"
    android:layout_width="match_parent"
    android:layout_height="match_parent">

    <fragment
        android:id="@+id/nav_host_fragment"
        android:name="androidx.navigation.fragment.NavHostFragment"
        android:layout_width="0dp"
        android:layout_height="0dp"
        app:defaultNavHost="true"
        app:layout_constraintBottom_toBottomOf="parent"
        app:layout_constraintEnd_toEndOf="parent"
        app:layout_constraintStart_toStartOf="parent"
        app:layout_constraintTop_toTopOf="parent"
        app:navGraph="@navigation/navigation" />
</androidx.constraintlayout.widget.ConstraintLayout>


```

### Step 5: Create Utils

Here are helper classes to load images via Glide as well as bind them through data binding:

**(a). GlideModule.kt**

```kotlin
package com.example.withnavigation.sharedelementsample.util

import com.bumptech.glide.annotation.GlideModule
import com.bumptech.glide.module.AppGlideModule

@GlideModule
class GlideModule : AppGlideModule()

```

**(b). BindingExtensions.kt**

How to load image via Glide into an ImageView through data binding:

```kotlin
package com.example.withnavigation.sharedelementsample.util

import android.widget.ImageView
import androidx.databinding.BindingAdapter

@BindingAdapter("imageURL")
fun ImageView.setImageURL(url: String?) {
    if (url == null) {
        setImageDrawable(null)
        return
    }

    GlideApp.with(this)
            .load(url)
            .into(this)
}

```

### Step 6: Create Adapter

Create a recyclerview adapter to set the images to the recyclerview:


**(a). GridAdapter.kt**

```kotlin
package com.example.withnavigation.sharedelementsample

import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import androidx.recyclerview.widget.DiffUtil
import androidx.recyclerview.widget.ListAdapter
import androidx.recyclerview.widget.RecyclerView
import com.example.withnavigation.sharedelementsample.databinding.ItemImageBinding

class GridAdapter(
        private val clickItem: (View) -> Unit
) : ListAdapter<String, GridAdapter.ViewHolder>(DIFF_CALLBACK) {

    override fun onCreateViewHolder(parent: ViewGroup, viewType: Int): ViewHolder {
        val binding = ItemImageBinding.inflate(LayoutInflater.from(parent.context), parent, false)
        return ViewHolder(binding)
    }

    override fun onBindViewHolder(holder: ViewHolder, position: Int) {
        holder.bind(getItem(position), clickItem)
    }

    companion object {
        private val DIFF_CALLBACK = object : DiffUtil.ItemCallback<String>() {
            override fun areItemsTheSame(oldItem: String, newItem: String): Boolean {
                return oldItem == newItem
            }

            override fun areContentsTheSame(oldItem: String, newItem: String): Boolean {
                return oldItem == newItem
            }
        }
    }

    class ViewHolder(private val binding: ItemImageBinding) : RecyclerView.ViewHolder(binding.root) {
        fun bind(imageURL: String, clickItem: (View) -> Unit) {
            binding.image.transitionName = imageURL // Use image url for transitionName
            binding.imageURL = imageURL
            binding.image.setOnClickListener {
                clickItem(binding.image)
            }
            binding.executePendingBindings()
        }
    }
}

```
### Step 7: Create Fragments

Create the following two fragments:

**(a). GridFragment.kt**

```kotlin
package com.example.withnavigation.sharedelementsample

import android.os.Bundle
import android.transition.TransitionInflater
import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import androidx.core.app.ActivityOptionsCompat
import androidx.fragment.app.Fragment
import androidx.navigation.ActivityNavigator
import androidx.navigation.fragment.FragmentNavigatorExtras
import androidx.navigation.fragment.findNavController
import androidx.recyclerview.widget.GridLayoutManager
import com.example.withnavigation.sharedelementsample.databinding.FragmentGridBinding

class GridFragment : Fragment() {

    private lateinit var binding: FragmentGridBinding

    // Show Activity
    private val adapter = GridAdapter(this::clickItemActivity)

    // Show Fragment
//    private val adapter = GridAdapter(this::clickItemFragment)

    override fun onCreateView(inflater: LayoutInflater, container: ViewGroup?, savedInstanceState: Bundle?): View? {
        binding = FragmentGridBinding.inflate(inflater, container, false)
        return binding.root
    }

    override fun onActivityCreated(savedInstanceState: Bundle?) {
        super.onActivityCreated(savedInstanceState)

        binding.recycler.layoutManager = GridLayoutManager(requireContext(), 2)
        binding.recycler.adapter = adapter

        adapter.submitList(listOf(
                "https://images.pexels.com/photos/1383397/pexels-photo-1383397.jpeg?w=500",
                "https://images.pexels.com/photos/132694/pexels-photo-132694.jpeg?w=500",
                "https://images.pexels.com/photos/1423455/pexels-photo-1423455.jpeg?w=500",
                "https://images.pexels.com/photos/1251175/pexels-photo-1251175.jpeg",
                "https://images.pexels.com/photos/209037/pexels-photo-209037.jpeg",
                "https://images.pexels.com/photos/291528/pexels-photo-291528.jpeg",
                "https://images.pexels.com/photos/302478/pexels-photo-302478.jpeg",
                "https://images.pexels.com/photos/982612/pexels-photo-982612.jpeg"
        ))
    }

    private fun clickItemActivity(view: View) {
        val action = GridFragmentDirections.actionGridFragmentToImageActivity(view.transitionName) // transitionName == imageURL

        val options = ActivityOptionsCompat.makeSceneTransitionAnimation(
                requireActivity(),
                view,
                view.transitionName
        )
        val extras = ActivityNavigator.Extras.Builder().setActivityOptions(options).build()

        findNavController().navigate(action, extras)
    }

    private fun clickItemFragment(view: View) {
        exitTransition = TransitionInflater.from(requireContext()).inflateTransition(R.transition.change_image_transform)
        val action = GridFragmentDirections.actionGridFragmentToImageFragment(view.transitionName) // transitionName == imageURL
        val extra = FragmentNavigatorExtras(view to view.transitionName)
        findNavController().navigate(action, extra)
    }
}

```

**(b). ImageFragment.kt**

```kotlin
package com.example.withnavigation.sharedelementsample

import android.graphics.drawable.Drawable
import android.os.Bundle
import android.transition.TransitionInflater
import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import androidx.fragment.app.Fragment
import com.bumptech.glide.load.DataSource
import com.bumptech.glide.load.engine.GlideException
import com.bumptech.glide.request.RequestListener
import com.bumptech.glide.request.target.Target
import com.example.withnavigation.sharedelementsample.databinding.FragmentImageBinding
import com.example.withnavigation.sharedelementsample.util.GlideApp

class ImageFragment : Fragment() {

    private lateinit var binding: FragmentImageBinding

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        sharedElementEnterTransition = TransitionInflater.from(requireContext()).inflateTransition(R.transition.change_image_transform)
    }

    override fun onCreateView(inflater: LayoutInflater, container: ViewGroup?, savedInstanceState: Bundle?): View? {
        binding = FragmentImageBinding.inflate(inflater, container, false)
        return binding.root
    }

    override fun onActivityCreated(savedInstanceState: Bundle?) {
        super.onActivityCreated(savedInstanceState)
        postponeEnterTransition()

        val imageURL = ImageFragmentArgs.fromBundle(arguments).imageURL
        binding.image.transitionName = imageURL

        GlideApp.with(this)
                .load(imageURL)
                .dontAnimate()
                .listener(object : RequestListener<Drawable> {
                    override fun onLoadFailed(e: GlideException?, model: Any?, target: Target<Drawable>?, isFirstResource: Boolean): Boolean {
                        startPostponedEnterTransition()
                        return false
                    }

                    override fun onResourceReady(resource: Drawable?, model: Any?, target: Target<Drawable>?, dataSource: DataSource?, isFirstResource: Boolean): Boolean {
                        startPostponedEnterTransition()
                        return false
                    }
                })
                .into(binding.image)
    }
}

```
### Step 8: Create Activities

We will have two activities;

**(a). ImageActivity.kt**

Load image via Glide:

```kotlin
package com.example.withnavigation.sharedelementsample

import android.graphics.drawable.Drawable
import android.os.Bundle
import androidx.appcompat.app.AppCompatActivity
import androidx.databinding.DataBindingUtil
import com.bumptech.glide.load.DataSource
import com.bumptech.glide.load.engine.GlideException
import com.bumptech.glide.request.RequestListener
import com.bumptech.glide.request.target.Target
import com.example.withnavigation.sharedelementsample.databinding.ActivityImageBinding
import com.example.withnavigation.sharedelementsample.util.GlideApp

class ImageActivity : AppCompatActivity() {

    private lateinit var binding: ActivityImageBinding

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        binding = DataBindingUtil.setContentView(this, R.layout.activity_image)

        // prevent blink in status bar
        window.enterTransition = null
        window.exitTransition = null

        postponeEnterTransition()

        val imageURL = ImageActivityArgs.fromBundle(intent.extras).imageUrl

        binding.image.transitionName = imageURL

        GlideApp.with(this)
                .load(imageURL)
                .dontAnimate()
                .listener(object : RequestListener<Drawable> {
                    override fun onLoadFailed(e: GlideException?, model: Any?, target: Target<Drawable>?, isFirstResource: Boolean): Boolean {
                        startPostponedEnterTransition()
                        return false
                    }

                    override fun onResourceReady(resource: Drawable?, model: Any?, target: Target<Drawable>?, dataSource: DataSource?, isFirstResource: Boolean): Boolean {
                        startPostponedEnterTransition()
                        return false
                    }
                })
                .into(binding.image)
    }
}

```

**(b). MainActivity.kt**

Here is the code for MainActivity:

```kotlin
package com.example.withnavigation.sharedelementsample

import android.os.Bundle
import androidx.appcompat.app.AppCompatActivity
import androidx.navigation.findNavController

class MainActivity : AppCompatActivity() {

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_main)
    }

    override fun onSupportNavigateUp() = findNavController(R.id.nav_host_fragment).navigateUp()
}

```

### Reference

- Download full code [here](https://github.com/STAR-ZERO/navigation-shared-element/archive/refs/heads/master.zip).
- Follow code author [here](https://github.com/STAR-ZERO/).
