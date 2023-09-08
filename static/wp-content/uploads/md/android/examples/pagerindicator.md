# Kotlin Android PagerIndicator using TabLayout Example

Learn PageIndicator using this example. This is a sample application that easily implemented pager's indicator using `TabLayout`.


Here is the demo GIF:

![PagerIndicator using TabLayout Example](https://github.com/NUmeroAndDev/PagerIndicatorExample-android/raw/master/screenshot/example.gif)

This is written in Kotlin and will comprise the following files:

- `MainActivity.kt`
- `PageViewModel.kt`
- `PlaceholderFragment.kt`
- `SectionsPagerAdapter.kt`

### Step 1: Create Project

1. Open your `AndroidStudio` IDE.
2. Go to `File-->New-->Project` to create a new project.

### Step 2: Add Dependencies

No external dependencies are needed for this project.

### Step 3: Design Layouts

Here are our layouts:

***(a). `activity_main.xml`**

Create a file named `activity_main.xml` and design it as follows:

```xml
<?xml version="1.0" encoding="utf-8"?>
<androidx.coordinatorlayout.widget.CoordinatorLayout xmlns:android="http://schemas.android.com/apk/res/android"
    xmlns:app="http://schemas.android.com/apk/res-auto"
    xmlns:tools="http://schemas.android.com/tools"
    android:layout_width="match_parent"
    android:layout_height="match_parent"
    tools:context=".MainActivity">

    <com.google.android.material.appbar.AppBarLayout
        android:layout_width="match_parent"
        android:layout_height="wrap_content"
        android:theme="@style/AppTheme.AppBarOverlay">

        <androidx.appcompat.widget.Toolbar
            android:id="@+id/toolbar"
            android:layout_width="match_parent"
            android:layout_height="wrap_content"
            android:minHeight="?actionBarSize" />

    </com.google.android.material.appbar.AppBarLayout>

    <androidx.viewpager.widget.ViewPager
        android:id="@+id/view_pager"
        android:layout_width="match_parent"
        android:layout_height="match_parent"
        app:layout_behavior="@string/appbar_scrolling_view_behavior" />

    <com.google.android.material.tabs.TabLayout
        android:id="@+id/tabs"
        android:layout_width="match_parent"
        android:layout_height="18dp"
        android:layout_gravity="bottom"
        android:layout_marginBottom="16dp"
        android:background="@android:color/transparent"
        app:tabBackground="@drawable/bg_tab_item"
        app:tabGravity="center"
        app:tabIndicator="@drawable/tab_indicator"
        app:tabIndicatorGravity="stretch"
        app:tabMaxWidth="18dp"
        app:tabMinWidth="18dp"
        app:tabRippleColor="@null" />

</androidx.coordinatorlayout.widget.CoordinatorLayout>
```
***(b). `fragment_main.xml`**

Create a file named `fragment_main.xml` and design it as follows:

```xml
<?xml version="1.0" encoding="utf-8"?>
<androidx.constraintlayout.widget.ConstraintLayout xmlns:android="http://schemas.android.com/apk/res/android"
    xmlns:app="http://schemas.android.com/apk/res-auto"
    xmlns:tools="http://schemas.android.com/tools"
    android:id="@+id/constraintLayout"
    android:layout_width="match_parent"
    android:layout_height="match_parent"
    tools:context=".ui.main.PlaceholderFragment">

    <TextView
        android:id="@+id/section_label"
        android:layout_width="wrap_content"
        android:layout_height="wrap_content"
        android:layout_marginStart="@dimen/activity_horizontal_margin"
        android:layout_marginTop="@dimen/activity_vertical_margin"
        android:layout_marginEnd="@dimen/activity_horizontal_margin"
        android:layout_marginBottom="@dimen/activity_vertical_margin"
        app:layout_constraintLeft_toLeftOf="parent"
        app:layout_constraintTop_toTopOf="@+id/constraintLayout"
        tools:layout_constraintLeft_creator="1"
        tools:layout_constraintTop_creator="1" />

</androidx.constraintlayout.widget.ConstraintLayout>
```

### Step 4: Write Code

Write Code as follows:

**(a). `MainActivity.kt`**

Create a file named `MainActivity.kt`and instantiate our PagerAdapter and set it to our ViewPager as well as our TabLayout:

```kotlin
        val sectionsPagerAdapter = SectionsPagerAdapter(supportFragmentManager)
        view_pager.adapter = sectionsPagerAdapter
        tabs.setupWithViewPager(view_pager)
```

Here is the full code

```kotlin
package com.numero.pagerindicator.example

import android.os.Bundle
import androidx.appcompat.app.AppCompatActivity
import com.numero.pagerindicator.example.ui.main.SectionsPagerAdapter
import kotlinx.android.synthetic.main.activity_main.*

class MainActivity : AppCompatActivity() {

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_main)
        setSupportActionBar(toolbar)

        val sectionsPagerAdapter = SectionsPagerAdapter(supportFragmentManager)
        view_pager.adapter = sectionsPagerAdapter
        tabs.setupWithViewPager(view_pager)
    }
}
```

**(b). `PageViewModel.kt`**

Create a file named `PageViewModel.kt` and make it extend the `androidx.lifecycle.ViewModel`.


Here is the full code

```kotlin
package com.numero.pagerindicator.example.ui.main

import androidx.lifecycle.LiveData
import androidx.lifecycle.MutableLiveData
import androidx.lifecycle.Transformations
import androidx.lifecycle.ViewModel
import androidx.lifecycle.ViewModelProvider

class PageViewModel : ViewModel() {

    private val _index = MutableLiveData<Int>()
    val text: LiveData<String> = Transformations.map(_index) {
        "Hello world from section: $it"
    }

    fun setIndex(index: Int) {
        _index.value = index
    }
}
```

**(c). `PlaceholderFragment.kt`**

Create a file named `PlaceholderFragment.kt` and extend the ` androidx.fragment.app.Fragment`.


Here is the full code

```kotlin
package com.numero.pagerindicator.example.ui.main

import android.os.Bundle
import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import android.widget.TextView
import androidx.fragment.app.Fragment
import androidx.lifecycle.Observer
import androidx.lifecycle.ViewModelProviders
import com.numero.pagerindicator.example.R

/**
 * A placeholder fragment containing a simple view.
 */
class PlaceholderFragment : Fragment() {

    private lateinit var pageViewModel: PageViewModel

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        pageViewModel = ViewModelProviders.of(this).get(PageViewModel::class.java).apply {
            setIndex(arguments?.getInt(ARG_SECTION_NUMBER) ?: 1)
        }
    }

    override fun onCreateView(
        inflater: LayoutInflater, container: ViewGroup?,
        savedInstanceState: Bundle?
    ): View? {
        val root = inflater.inflate(R.layout.fragment_main, container, false)
        val textView: TextView = root.findViewById(R.id.section_label)
        pageViewModel.text.observe(this, Observer<String> {
            textView.text = it
        })
        return root
    }

    companion object {
        /**
         * The fragment argument representing the section number for this
         * fragment.
         */
        private const val ARG_SECTION_NUMBER = "section_number"

        /**
         * Returns a new instance of this fragment for the given section
         * number.
         */
        @JvmStatic
        fun newInstance(sectionNumber: Int): PlaceholderFragment {
            return PlaceholderFragment().apply {
                arguments = Bundle().apply {
                    putInt(ARG_SECTION_NUMBER, sectionNumber)
                }
            }
        }
    }
}
```

**(d). `SectionsPagerAdapter.kt`**

Create a file named `SectionsPagerAdapter.kt` and extend the `androidx.fragment.app.FragmentPagerAdapter` then override the following callbacks:

```kotlin
    override fun getItem(position: Int): Fragment {
        return PlaceholderFragment.newInstance(position + 1)
    }

    override fun getCount(): Int = 5
```

Here is the full code

```kotlin
package com.numero.pagerindicator.example.ui.main

import androidx.fragment.app.Fragment
import androidx.fragment.app.FragmentManager
import androidx.fragment.app.FragmentPagerAdapter

class SectionsPagerAdapter(fm: FragmentManager) : FragmentPagerAdapter(fm) {

    override fun getItem(position: Int): Fragment {
        return PlaceholderFragment.newInstance(position + 1)
    }

    override fun getCount(): Int = 5
}
```

### Run

Simply copy the source code into your Android Project,Build and Run. 

### Reference

1. [Download](https://github.com/NUmeroAndDev/PagerIndicatorExample-android-master/archive/refs/heads/master.zip) code or Browse [here](https://github.com/NUmeroAndDev/PagerIndicatorExample-android).
2. [Follow](https://github.com/NUmeroAndDev/) code author.


