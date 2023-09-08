# Fragment Example


>  Learn about Fragment using these simple examples.

### Step 1: Dependencies

No external dependencies are needed for this project.

### Step 2: Design Layouts

We will have 4 layouts. Two of them for `Fragments`, two for `Activities`:

**(a). fragment_second.xml**

Declare a TextView as the root and only element:

```xml
<?xml version="1.0" encoding="utf-8"?>

<TextView
    xmlns:android="http://schemas.android.com/apk/res/android"
    android:layout_width="match_parent"
    android:layout_height="match_parent"
    android:gravity="center"
    android:background="@android:color/holo_red_light"
    android:text="@string/secondFragmentText"/>


```

**(b). fragment_main.xml**

Declare a `TextView` and a `Button` inside a `RelativeLayout`:

```xml
<?xml version="1.0" encoding="utf-8"?>
<RelativeLayout xmlns:android="http://schemas.android.com/apk/res/android"
                android:layout_width="match_parent"
                android:layout_height="match_parent">

    <TextView
        android:layout_width="wrap_content"
        android:layout_height="wrap_content"
        android:layout_centerInParent="true"
        android:text="@string/mainFragmentText"/>

    <Button
        android:id="@+id/mainFragmentButton"
        android:layout_width="wrap_content"
        android:layout_height="wrap_content"
        android:layout_alignParentBottom="true"
        android:layout_margin="20dp"
        android:text="@string/mainFragmentButton"/>

</RelativeLayout>

```

**(c). activity_second.xml**

```xml
<?xml version="1.0" encoding="utf-8"?>
<FrameLayout
    android:id="@+id/contentFrame"
    xmlns:android="http://schemas.android.com/apk/res/android"
    android:layout_width="match_parent"
    android:layout_height="match_parent">

    <!-- Do not add Views inside FrameLayout used for fragment transactions. This is only for a test purpose-->
    <Button
        android:layout_width="wrap_content"
        android:layout_height="wrap_content"
        android:layout_gravity="center"
        android:onClick="showFragment"
        android:text="@string/secondActivityButton"/>
</FrameLayout>

```

**(d). activity_main.xml**

Declare our main Fragment inside this layout:

```xml
<?xml version="1.0" encoding="utf-8"?>
<RelativeLayout
    xmlns:android="http://schemas.android.com/apk/res/android"
    xmlns:tools="http://schemas.android.com/tools"
    android:layout_width="match_parent"
    android:layout_height="match_parent"
    android:paddingBottom="@dimen/activity_vertical_margin"
    android:paddingLeft="@dimen/activity_horizontal_margin"
    android:paddingRight="@dimen/activity_horizontal_margin"
    android:paddingTop="@dimen/activity_vertical_margin"
    tools:context=".activities.MainActivity">

    <fragment
        android:id="@+id/mainFragment"
        android:name="fr.esilv.fragmentexample.fragments.MainFragment"
        android:layout_width="match_parent"
        android:layout_height="match_parent"/>
</RelativeLayout>

```


### Step 3: Write Fragment Code

**(a). SecondFragment.kt**

```kotlin
package fr.esilv.fragmentexample.fragments

import android.os.Bundle
import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import androidx.fragment.app.Fragment
import fr.esilv.fragmentexample.R

class SecondFragment : Fragment() {
	override fun onCreateView(inflater: LayoutInflater, container: ViewGroup?,
	                          savedInstanceState: Bundle?): View? {
		return inflater.inflate(R.layout.fragment_second, container, false)
	}
}

```

**(b). MainFragment.kt**

```kotlin
package fr.esilv.fragmentexample.fragments

import android.content.Intent
import android.os.Bundle
import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import androidx.fragment.app.Fragment
import fr.esilv.fragmentexample.R
import fr.esilv.fragmentexample.activities.SecondActivity
import kotlinx.android.synthetic.main.fragment_main.mainFragmentButton

class MainFragment : Fragment() {
	override fun onCreateView(inflater: LayoutInflater, container: ViewGroup?,
	                          savedInstanceState: Bundle?): View? {
		return inflater.inflate(R.layout.fragment_main, container, false)
	}

	override fun onViewCreated(view: View, savedInstanceState: Bundle?) {
		super.onViewCreated(view, savedInstanceState)
		mainFragmentButton.setOnClickListener(OnMainFragmentButtonClickListener())
	}

	private inner class OnMainFragmentButtonClickListener : View.OnClickListener {
		override fun onClick(v: View) {
			startActivity(Intent(v.context, SecondActivity::class.java))
		}
	}
}

```

### Step 4: Create Activities

Create `Activities` code as follows:

**(a). SecondActivity.kt**

```kotlin
package fr.esilv.fragmentexample.activities

import android.os.Bundle
import android.view.View
import androidx.appcompat.app.AppCompatActivity
import fr.esilv.fragmentexample.R
import fr.esilv.fragmentexample.fragments.SecondFragment

class SecondActivity : AppCompatActivity() {
	override fun onCreate(savedInstanceState: Bundle?) {
		super.onCreate(savedInstanceState)
		setContentView(R.layout.activity_second)
	}

	//this method is called by the Button in activity_second.xml. the android:onClick attribute binds with this method.
	fun showFragment(view: View) {
		view.visibility = View.GONE
		supportFragmentManager.beginTransaction()
				.apply {
					//the id passed as parameter is the id of the FrameLayout defined in activity_second.xml.
					replace(R.id.contentFrame, SecondFragment())
					//the transaction has to be committed for changes to happen.
					commit()
				}

	}
}

```

**(b). MainActivity.kt**

```kotlin
package fr.esilv.fragmentexample.activities

import android.os.Bundle
import androidx.appcompat.app.AppCompatActivity
import fr.esilv.fragmentexample.R

class MainActivity : AppCompatActivity() {
	override fun onCreate(savedInstanceState: Bundle?) {
		super.onCreate(savedInstanceState)
		setContentView(R.layout.activity_main)
	}
}

```

### Reference

- Download code [here](https://github.com/nguyen-baylatry-esilv/fragment-example/archive/refs/heads/master.zip).
- Follow code author [here](https://github.com/nguyen-baylatry-esilv/).
