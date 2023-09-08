# ViewPager2 Example


The ViewPager class has finally gotten an improved version known as ViewPager2. This newer version offers enhanced functionality and addresses commondifficulties faced while using the `ViewPager` class.

This tutorial will explore examples of ViewPager2, helping you learn how to use this component using practical step by step examples.

You should consider migrating to ViewPager2 as it is the version that is now prefered and will continue receiving active development and updates. It is also more powerful than ViewPager.


Here are some features of ViewPager2:

### Vertical orientation support

Unlike ViewPager which needs complex customization to achieve vertical paging, ViewPager2 provides this capability natively. It also of course provides horizontal paging. Enabling vertical or horizontal paging is as easy as it gets, all you need to do is provide the value for the `android:orientation` attribute in your xml layout:

```xml
<androidx.viewpager2.widget.ViewPager2
    xmlns:android="http://schemas.android.com/apk/res/android"
    android:id="@+id/pager"       
    android:orientation="vertical" />
```

You can also set this attribute programmatically using the `setOrientation()`.

### Right-to-left support

Based on the locale your app is being used in, you may want to support RTL(right-to-left) paging. Unlike `ViewPager`, `ViewPager2` provides this capability natively and in fact automatically without any action from your part. This is done based on the users locale in the device.

However you can also set it manually in your layout as follows:

```xml
<androidx.viewpager2.widget.ViewPager2
    xmlns:android="http://schemas.android.com/apk/res/android"
    android:id="@+id/pager"
    android:layoutDirection="rtl" />
```

or programmatically using the `setLayoutDirection()` method.

### Modifiable fragment collections

The collections assigned to `ViewPager2` as the data source can be mutated. You do this by calling the `notifyDatasetChanged()`. This method updates the UI when that collection changes or is modified.

The advantage of this is that you can mutate or change your collection of fragments at runtime and `ViewPager2` will refresh itself based on that without requiring rebinding.

### DiffUtil

`ViewPager2` also, unlike `ViewPager` supports `DiffUtil`. This is because it is built from `RecyclerView`. This not only makes the binding of fragments more efficient but also implies that `ViewPager2` can natively take advantage of dataset change animations from the `RecyclerView` class.

Let's look at some examples.

## Kotlin Android ViewPager2 Example

Step by step example on how to use ViewPager2 in Kotlin Android.

### Step 1: Dependencies

Start by adding the `ViewPager2` androidx dependency. We will also use a third party `CircularIndicator` to indicate the pages:

```groovy
    // CircleIndicator
    implementation 'me.relex:circleindicator:2.1.6'

    // ViewPager2
    implementation "androidx.viewpager2:viewpager2:1.0.0"
```

### Step 2: Design Layout

We need two layouts. The first is a layout to represent a single page. Remember we will be swiping pages. This layout defines a single page:

**item_page.xml**

```xml
<?xml version="1.0" encoding="utf-8"?>
<androidx.constraintlayout.widget.ConstraintLayout xmlns:android="http://schemas.android.com/apk/res/android"
    xmlns:app="http://schemas.android.com/apk/res-auto"
    xmlns:tools="http://schemas.android.com/tools"
    android:layout_width="match_parent"
    android:layout_height="match_parent">

    <TextView
        android:id="@+id/textView"
        android:layout_width="wrap_content"
        android:layout_height="wrap_content"
        android:layout_marginTop="16dp"
        android:text="TextView"
        app:layout_constraintEnd_toEndOf="parent"
        app:layout_constraintHorizontal_bias="0.498"
        app:layout_constraintStart_toStartOf="parent"
        app:layout_constraintTop_toTopOf="parent" />

    <RadioGroup
        android:layout_width="wrap_content"
        android:layout_height="wrap_content"
        app:layout_constraintBottom_toBottomOf="parent"
        app:layout_constraintEnd_toEndOf="parent"
        app:layout_constraintStart_toStartOf="parent"
        app:layout_constraintTop_toBottomOf="@+id/textView" >

        <RadioButton
            android:id="@+id/radioButton4"
            android:layout_width="match_parent"
            android:layout_height="wrap_content"
            android:text="RadioButton" />

        <RadioButton
            android:id="@+id/radioButton3"
            android:layout_width="match_parent"
            android:layout_height="wrap_content"
            android:text="RadioButton" />

        <RadioButton
            android:id="@+id/radioButton2"
            android:layout_width="match_parent"
            android:layout_height="wrap_content"
            android:text="RadioButton" />

        <RadioButton
            android:id="@+id/radioButton"
            android:layout_width="match_parent"
            android:layout_height="wrap_content"
            android:text="RadioButton" />
    </RadioGroup>

</androidx.constraintlayout.widget.ConstraintLayout>
```

Then another layout tobe inflated into the main activity. This is where you add the `ViewPager2` as well as the `CircleIndicator`:

**activity_main.xml**

```xml
<?xml version="1.0" encoding="utf-8"?>
<androidx.constraintlayout.widget.ConstraintLayout xmlns:android="http://schemas.android.com/apk/res/android"
    xmlns:app="http://schemas.android.com/apk/res-auto"
    xmlns:tools="http://schemas.android.com/tools"
    android:layout_width="match_parent"
    android:layout_height="match_parent"
    tools:context=".MainActivity">

    <Button
        android:id="@+id/btn_back"
        android:layout_width="wrap_content"
        android:layout_height="wrap_content"
        android:layout_marginStart="16dp"
        android:layout_marginLeft="16dp"
        android:layout_marginBottom="16dp"
        android:text="قبلی"
        app:layout_constraintBottom_toTopOf="@+id/indicator"
        app:layout_constraintStart_toStartOf="parent" />

    <Button
        android:id="@+id/btn_next"
        android:layout_width="wrap_content"
        android:layout_height="wrap_content"
        android:layout_marginEnd="16dp"
        android:layout_marginRight="16dp"
        android:layout_marginBottom="16dp"
        android:text="بعدی"
        app:layout_constraintBottom_toTopOf="@+id/indicator"
        app:layout_constraintEnd_toEndOf="parent" />

    <me.relex.circleindicator.CircleIndicator3
        android:id="@+id/indicator"
        android:layout_width="match_parent"
        android:layout_height="48dp"
        android:background="#1e88e5"
        app:layout_constraintBottom_toBottomOf="parent"
        app:layout_constraintEnd_toEndOf="parent"
        app:layout_constraintStart_toStartOf="parent" />

    <androidx.viewpager2.widget.ViewPager2
        android:id="@+id/view_pager2"
        android:layout_width="match_parent"
        android:layout_height="0dp"
        app:layout_constraintBottom_toTopOf="@+id/indicator"
        app:layout_constraintEnd_toEndOf="parent"
        app:layout_constraintStart_toStartOf="parent"
        app:layout_constraintTop_toTopOf="parent" >

    </androidx.viewpager2.widget.ViewPager2>

</androidx.constraintlayout.widget.ConstraintLayout>
```

### Step 3: Create ViewPager2 Adapter

Because as we had said earlier `ViewPager2` is built on RecyclerView, it needs an adapter. But not a `PagerAdapter` like `ViewPager`, instead a `RecyclerView.Adapter`:

Here is an example of such an adapter:

**ViewPagerAdapter**

```kotlin
import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import androidx.recyclerview.widget.RecyclerView

class ViewPagerAdapter(private val dataValue: List<String>, private val condition: ConditionViewPager) :
    RecyclerView.Adapter<ViewPagerAdapter.ViewPagerViewHolder>() {

    inner class ViewPagerViewHolder(view: View) : RecyclerView.ViewHolder(view) {

        //val txt: TextView = view.findViewById(R.id.textView)

    }

    override fun onCreateViewHolder(parent: ViewGroup, viewType: Int): ViewPagerViewHolder =
        ViewPagerViewHolder(
            LayoutInflater.from(parent.context).inflate(R.layout.item_page, parent, false)
        )

    override fun onBindViewHolder(holder: ViewPagerViewHolder, position: Int) {
        condition.condition(position,dataValue.size)
    }

    override fun getItemCount(): Int = dataValue.size

    interface ConditionViewPager {

        fun condition(position : Int, fullSize : Int)

    }

}
```

### Step 4: Write Activity Code

The next step is to write the main activity code. This is where you will connect the `ViewPager2` with the `CircleIndicator`:

**MainActivity.kt**

```kotlin
package com.alirezabashi98.viewpager

import android.os.Bundle
import android.widget.Button
import android.widget.Toast
import androidx.appcompat.app.AppCompatActivity
import androidx.viewpager2.widget.ViewPager2
import me.relex.circleindicator.CircleIndicator3

class MainActivity : AppCompatActivity(), ViewPagerAdapter.ConditionViewPager {

    private val data = mutableListOf<String>()
    private lateinit var viewPager: ViewPager2
    private lateinit var indicator: CircleIndicator3
    private lateinit var btnNext: Button
    private lateinit var btnBack: Button

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_main)
        castView()
        addToList()

        viewPager.adapter = ViewPagerAdapter(data, this)
        viewPager.orientation = ViewPager2.ORIENTATION_HORIZONTAL

        indicator.setViewPager(viewPager)

        btnNext.setOnClickListener {
            viewPager.apply {
                beginFakeDrag()
                fakeDragBy(-10f)
                endFakeDrag()
            }
        }

        btnBack.setOnClickListener {
            viewPager.apply {
                beginFakeDrag()
                fakeDragBy(10f)
                endFakeDrag()
            }
        }

    }

    private fun castView() {

        viewPager = findViewById(R.id.view_pager2)
        indicator = findViewById(R.id.indicator)
        btnNext = findViewById(R.id.btn_next)
        btnBack = findViewById(R.id.btn_back)

    }

    private fun addToList() {
        for (item in 1..20) {
            data.add("item $item")
        }
    }

    override fun condition(position: Int, fullSize: Int) {

        if (position == fullSize) {
            btnNext.text = "پایان"
        }
        Toast.makeText(this, "$position / $fullSize", Toast.LENGTH_SHORT).show()

    }

}
```

### Reference

Here are the reference links:

| Number | Link |
| --- | --- |
| 1. | [Download code](https://github.com/alirezabashi98/ViewPager2/archive/refs/heads/master.zip) |
| 2. | [Follow code author](https://github.com/alirezabashi98/) |
| 3. | [Read more about ViewPager2](https://developer.android.com/jetpack/androidx/releases/viewpager2) |
