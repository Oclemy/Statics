# Kotlin Android - Fragment Examples

A Fragment in Android is a subactivity. A single activity can host multiple fragments. SO for example if you need one main page with sub-pages, then you need to think about Fragments. What is interesting is that Fragments have their own lifecycle and thus provide us with an independent way of working without having to rely on activities that much.


This tutorial teaches how to use fragments via simple HowTo Examples based on Kotlin Android.

## Example 1: Kotlin Android - Show Fragment in Activity

The activity will have a button that when clicked shows a fragment. Here is the demo image of what is created:

![Kotlin Android Fragment Example](https://github.com/alirezabashi98/Fragment/raw/master/scr001.png)

### Step 1: Dependencies

No third party dependencies are needed for this project.

### Step 2: Design Layouts

You need two layouts: one for the fragment and the other for the main activity.

**(a). fragment.xml**

This is the layout for the fragment. It will simply contain a textiew:

```xml
<?xml version="1.0" encoding="utf-8"?>
<LinearLayout
    xmlns:android="http://schemas.android.com/apk/res/android"
    android:layout_width="match_parent"
    android:layout_height="match_parent">

    <TextView
        android:id="@+id/txt_fragment"
        android:layout_width="match_parent"
        android:layout_height="wrap_content"
        android:gravity="top|left"
        android:text="@string/str_fragment"
        android:textColor="#2a2a2a"
        android:layout_margin="10dp"
        android:padding="10dp"/>

</LinearLayout>
```

**(b). activity_main.xml**

This is the layout for the main activity. It will contain a button and a framelayout. When the user clicks the button, and fragment is initialized and rendered in the framelayout:

```xml
<?xml version="1.0" encoding="utf-8"?>
<LinearLayout xmlns:android="http://schemas.android.com/apk/res/android"
    xmlns:app="http://schemas.android.com/apk/res-auto"
    xmlns:tools="http://schemas.android.com/tools"
    android:layout_width="match_parent"
    android:layout_height="match_parent"
    tools:context=".MainActivity"
    android:orientation="vertical">

    <Button
        android:id="@+id/btn_show"
        android:layout_width="match_parent"
        android:layout_height="match_parent"
        android:layout_weight="0.9"
        android:text="@string/show"/>

    <FrameLayout
        android:id="@+id/fragment_main"
        android:layout_width="match_parent"
        android:layout_height="match_parent"
        android:layout_weight="0.1">

    </FrameLayout>
</LinearLayout>
```

### Step 3: Create a Fragment

The third step is to create the actual fragment and inflate it's layout. A fragment is created by extending the `androidx.fragment.app.Fragment` class. It is inflated by overriding the `onCreateView()` and returning a view object inflated from a layout for the fragment.

Here is the full code:

**Fragment_one.kt**

```kotlin

import android.os.Bundle
import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import android.widget.Toast
import androidx.fragment.app.Fragment
import kotlinx.android.synthetic.main.fragment.*

class Fragment_one : Fragment() {

    override fun onCreateView(inflater: LayoutInflater, container: ViewGroup?, savedInstanceState: Bundle?): View? {
        return inflater.inflate(R.layout.fragment,container,false)
    }

    override fun onActivityCreated(savedInstanceState: Bundle?) {
        super.onActivityCreated(savedInstanceState)

        txt_fragment.setOnClickListener {
            Toast.makeText(activity,"text fragment",Toast.LENGTH_SHORT).show()
        }

    }

}
```

### Step 4: Create MainActivity

This is the activity that will host the fragment. Fragments don't exist on their own but are hosted by activities. A single activity can host multiple fragments.

To show a fragment inside an activity, you need to perform what is called a Fragment Transaction. Such a transaction can be adding a fragment, removing a fragment, replacing a fragment etc. In our case we are interested in replacement of our framelayout with our fragment. Here is the code to do it:

```kotlin

    fun showFragment(fragment: Fragment_one){
        val fram = supportFragmentManager.beginTransaction()
        fram.replace(R.id.fragment_main,fragment)
        fram.commit()
    }
```

Here is the full code for this activity:

**MainActivity.kt**

```kotlin
import androidx.appcompat.app.AppCompatActivity
import android.os.Bundle
import kotlinx.android.synthetic.main.activity_main.*

class MainActivity : AppCompatActivity() {

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_main)

        btn_show.setOnClickListener {

            val fragment = arb.test.fragment.Fragment_one()
            showFragment(fragment)

        }

    }

    fun showFragment(fragment: Fragment_one){
        val fram = supportFragmentManager.beginTransaction()
        fram.replace(R.id.fragment_main,fragment)
        fram.commit()
    }
}
```

### Run

Now run the project.

### Reference

Download the code below:

| No. | Link |
| --- | --- |
| 1. | [Download](https://github.com/alirezabashi98/Fragment/archive/refs/heads/master.zip) code |
| 2. | [Follow](https://github.com/alirezabashi98/) code author |

## Example 2: Kotlin Android Fragment Lifecycle

This is a project to teach you about handling the lifecycle events in Fragment.

### Step 1: Create Project

Start by creating an empty `Android Studio` project.

### Step 2: Dependencies

No third party dependency is needed.

### Step 3: Design Layouts

We need three layouts: two for our two fragments and one for the `Activity`:

**(a). fragment_first.xml**

Add several TextViews in this layout. This layout will be inflated into our first Fragment:

```xml
<?xml version="1.0" encoding="utf-8"?>
<LinearLayout xmlns:android="http://schemas.android.com/apk/res/android"
    xmlns:tools="http://schemas.android.com/tools"
    android:layout_width="match_parent"
    android:layout_height="match_parent"
    android:orientation="vertical"
    tools:context=".FirstFragment">

    <TextView
        android:id="@+id/firstFragment"
        android:layout_width="wrap_content"
        android:layout_height="wrap_content"
        android:layout_gravity="center"
        android:text="@string/first_fragment"
        android:textColor="@color/colorPrimary"/>

    <TextView
        android:id="@+id/txtUsername"
        android:layout_width="wrap_content"
        android:layout_height="wrap_content"
        android:layout_gravity="center"
        android:textColor="@color/colorPrimary"/>

    <TextView
        android:id="@+id/txtLastName"
        android:layout_width="wrap_content"
        android:layout_height="wrap_content"
        android:layout_gravity="center"
        android:textColor="@color/colorPrimary"/>
</LinearLayout>
```

**(b). fragment_second.xml**

Add a button and edittexts in this layout. This is the layout for the second Fragment.

```xml
<?xml version="1.0" encoding="utf-8"?>
<LinearLayout android:layout_height="match_parent"
    android:layout_width="match_parent"
    android:orientation="vertical"
    xmlns:android="http://schemas.android.com/apk/res/android">

    <EditText
        android:id="@+id/edtUsername"
        android:layout_width="match_parent"
        android:layout_height="wrap_content"
        android:autofillHints=""
        android:textColor="#FF0000"
        android:hint="@string/enter_name"
        android:inputType="textPersonName" />
    <EditText
        android:layout_width="match_parent"
        android:layout_height="wrap_content"
        android:id="@+id/edtLastName"
        android:textColor="#FF0000"
        android:hint="@string/enter_last_name"
        android:autofillHints=""
        android:inputType="textPersonName" />
    <Button
        android:id="@+id/btnShow"
        android:layout_width="wrap_content"
        android:layout_height="wrap_content"
        android:text="@string/show_details"/>
</LinearLayout>
```

**(c). activity_main.xml**

Add the Fragment element in this layout. This is the layout for our `MainActivity`.

```xml
<?xml version="1.0" encoding="utf-8"?>
<RelativeLayout xmlns:android="http://schemas.android.com/apk/res/android"
    xmlns:app="http://schemas.android.com/apk/res-auto"
    xmlns:tools="http://schemas.android.com/tools"
    android:layout_width="match_parent"
    android:layout_height="match_parent"
    tools:context=".MainActivity">

    <FrameLayout
        android:id="@+id/fragment_container"
        android:name="com.example.lifecycle.SecondFragment"
        android:layout_centerHorizontal="true"
        android:layout_width="wrap_content"
        android:layout_height="wrap_content" />

    <View
        android:id="@+id/divider"
        android:layout_width="match_parent"
        android:layout_height="5dp"
        android:layout_below="@id/fragment_container"
        android:layout_marginTop="329dp"
        android:background="@color/black" />

    <fragment
        android:id="@+id/first_fragment"
        android:name="com.example.lifecycle.FirstFragment"
        android:layout_width="wrap_content"
        android:layout_height="wrap_content"
        android:layout_below="@id/divider"
        android:layout_centerHorizontal="true"
        android:layout_marginTop="187dp" />

</RelativeLayout>
```

### Step 4: Create first Fragment

Override the Fragment's lifecycle methods.

Here is the code for this fragment:

**FirstFragment.kt**

```kotlin
package com.example.lifecycle

import android.content.ContentValues.TAG
import android.content.Context
import android.os.Bundle
import android.util.Log
import androidx.fragment.app.Fragment
import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import android.widget.EditText
import android.widget.TextView

class FirstFragment : Fragment() {
    var TAG = "ActivityLifeCycle"
    lateinit var firstnameTxt : TextView
    lateinit var lastnameTxt : TextView
    override fun onAttach(context: Context) {
        super.onAttach(context)
        Log.d(TAG, "===>fragment===>onAttach()")
    }
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        Log.d(TAG, "===>fragment===>onCreate()")
    }

    override fun onCreateView(
        inflater: LayoutInflater, container: ViewGroup?,
        savedInstanceState: Bundle?
    ): View? {

        Log.d(TAG, "===>fragment===>onCreateView()")
        val view = inflater.inflate(R.layout.fragment_first, container, false)
        firstnameTxt = view.findViewById<TextView>(R.id.txtUsername)
        lastnameTxt = view.findViewById<TextView>(R.id.txtLastName)
        return view
    }
    fun showDetails(firstName:String, lastName:String){
        firstnameTxt.text = firstName
        lastnameTxt.text = lastName
    }

    override fun onActivityCreated(savedInstanceState: Bundle?) {
        super.onActivityCreated(savedInstanceState)
        Log.d(TAG, "===>fragment===>onActivityCreated()")
    }

    override fun onStart() {
        super.onStart()
        Log.d(TAG, "===>fragment===>onStart()")
    }

    override fun onResume() {
        super.onResume()
        Log.d(TAG, "===>fragment===>onResume()")
    }

    override fun onPause() {
        super.onPause()
        Log.d(TAG, "===>fragment===>onPause()")
    }

    override fun onStop() {
        super.onStop()
        Log.d(TAG, "===>fragment===>onStop()")
    }

    override fun onDestroyView() {
        super.onDestroyView()
        Log.d(TAG, "===>fragment===>onDestroyView()")
    }

    override fun onDestroy() {
        super.onDestroy()
        Log.d(TAG, "===>fragment===>onDestroy()")
    }

    override fun onDetach() {
        super.onDetach()
        Log.d(TAG, "===>fragment===>onDetach()")
    }

}
```

### Step 5: Create Second Fragment

Create the second fragment and add the following code:

**SecondFragment.kt**

```kotlin
package com.example.lifecycle

import android.os.Bundle
import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import android.widget.Button
import android.widget.EditText
import androidx.fragment.app.Fragment
import kotlinx.android.synthetic.main.activity_main.*
import kotlinx.android.synthetic.main.fragment_second.*

class SecondFragment : Fragment() {

    interface GetUserDetail{
        fun showDetails(firstName:String, lastName:String)
    }
    lateinit var getUserDetail : GetUserDetail
    lateinit var firstNameEditText : EditText
    lateinit var lastNameEditText: EditText

    override fun onCreateView(
        inflater: LayoutInflater, container: ViewGroup?,
        savedInstanceState: Bundle?
    ): View? {
        val view = inflater.inflate(R.layout.fragment_second, container, false)
        val showButton = view.findViewById<Button>(R.id.btnShow)
        firstNameEditText = view.findViewById(R.id.edtUsername)
        lastNameEditText = view.findViewById(R.id.edtLastName)
        showButton.setOnClickListener(View.OnClickListener {
            getUserDetail.showDetails(firstNameEditText.text.toString(),lastNameEditText.text.toString())
        })
        return view
        }
}
```

### Step 6: Create MainActivity

The fragments have to be hosted in an Activity. It is this MainActivity that will host both fragments.

**Fragment.kt**

```kotlin
package com.example.lifecycle

import androidx.appcompat.app.AppCompatActivity
import android.os.Bundle
import android.util.Log
import android.widget.Toast
import androidx.fragment.app.FragmentManager
import kotlinx.android.synthetic.main.activity_main.*

class MainActivity : AppCompatActivity(), SecondFragment.GetUserDetail {

    var TAG = "ActivityLifeCycle"
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_main)
        Log.d(TAG, "===>onCreate()")
        loadFragment()
    }
    private fun loadFragment()
    {
        val fragmentManager = supportFragmentManager
        val fragmentTransaction = fragmentManager.beginTransaction()
        val secondFragment = SecondFragment()
        secondFragment.getUserDetail = this
        fragmentTransaction.add(R.id.fragment_container,secondFragment)
        fragmentTransaction.commit()
    }
    override fun onStart() {
        super.onStart()
        Log.d(TAG, "===>onStart()")
    }
    override fun onResume() {
        super.onResume()
        Log.d(TAG, "===>onResume()")
    }

    override fun onPause() {
        super.onPause()
        Log.d(TAG, "===>onPause()")
    }

    override fun onStop() {
        super.onStop()
        Log.d(TAG, "===>onStop()")
    }

    override fun onRestart() {
        super.onRestart()
        Log.d(TAG, "===>onRestart()")
    }

    override fun onDestroy() {
        super.onDestroy()
        Log.d(TAG, "===>onDelete()")
    }

    override fun showDetails(firstName: String, lastName: String) {
        val firstFragment:FirstFragment = first_fragment as FirstFragment
        firstFragment.showDetails(firstName, lastName)
    }
}
```

### Run

Copy the code or download it in the link below, build and run.

### Reference

Here are the reference links:

| Number | Link |
| --- | --- |
| 1. | [Download](https://github.com/kunjanrana4/LifeCycle/archive/refs/heads/master.zip) Example |
| 2. | [Follow](https://github.com/kunjanrana4/) code author |

## Example 3: Android Simple Fragment inside Activity

This is another simple Fragment inside Activity example. However this time we write our code in Java. We will also see how to work with widgets inside the Fragment independent of the Activity.

Let's start.

### Step 1: Create Project

Start by creating an empty `Android Studio` project.

### Step 2: Dependencies

No external or special dependencies are needed.

### Step 3: Design Layouts

We need two layouts: one for Fragment and the other for the Activity.

**(a). fragment_simple.xml**

Add a widgets like Button, EditText and TextView inside this layout. This layout will be inflated into our Fragment:

```xml
<RelativeLayout xmlns:android="http://schemas.android.com/apk/res/android"
                xmlns:tools="http://schemas.android.com/tools"
                android:layout_width="match_parent"
                android:layout_height="match_parent"
                android:paddingBottom="@dimen/activity_vertical_margin"
                android:paddingLeft="@dimen/activity_horizontal_margin"
                android:paddingRight="@dimen/activity_horizontal_margin"
                android:paddingTop="@dimen/activity_vertical_margin"
                tools:context=".MainActivity" >

    <EditText
        android:id="@+id/editText1"
        android:layout_width="wrap_content"
        android:layout_height="wrap_content"
        android:ems="10" android:layout_alignParentTop="true"
        android:layout_alignParentLeft="true" android:layout_alignParentStart="true"
        android:layout_alignRight="@+id/textView1" android:layout_alignEnd="@+id/textView1">

        <requestFocus />
    </EditText>

    <Button
        android:id="@+id/button1"
        android:layout_width="wrap_content"
        android:layout_height="wrap_content"
        android:text="Submit" android:layout_below="@+id/editText1"
        android:layout_alignParentLeft="true" android:layout_alignParentStart="true"
        android:layout_alignRight="@+id/editText1" android:layout_alignEnd="@+id/editText1"/>
    <TextView
        android:layout_width="wrap_content"
        android:layout_height="wrap_content"
        android:textAppearance="?android:attr/textAppearanceLarge"
        android:text="Large Text"
        android:id="@+id/textView1"
        android:layout_below="@+id/button1" android:layout_alignParentLeft="true"
        android:layout_alignParentRight="true" android:layout_alignParentBottom="true"
        android:background="#ff7299ff"/>

</RelativeLayout>
```

**(b). activity_main.xml**

This is our MainActivity layout. Given that this activity will host our Fragment, we need to add our Fragment tag inside.

```xml
<?xml version="1.0" encoding="utf-8"?>
<LinearLayout xmlns:android="http://schemas.android.com/apk/res/android"
              android:layout_width="match_parent"
              android:layout_height="match_parent"
              android:gravity="center_horizontal"
              android:orientation="vertical"
              android:padding="4dip" >

    <fragment
        android:id="@+id/FrameLayout1"
        android:name="com.example.ankitkumar.singlescreenfragment.MainActivity"
        android:layout_width="match_parent"
        android:layout_height="0px"
        android:layout_weight="1" >
    </fragment>

</LinearLayout>
```

### Step 4: Write Code

Here is our full code:

**MainActivity.java**

```java
import android.app.Activity;
import android.app.Fragment;
import android.os.Bundle;
import android.view.LayoutInflater;
import android.view.View;
import android.view.View.OnClickListener;
import android.view.ViewGroup;
import android.widget.Button;
import android.widget.EditText;
import android.widget.TextView;

public class MainActivity extends Activity {
    int i = 1;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);

        setContentView(R.layout.activity_main);

        getFragmentManager().findFragmentById(R.id.FrameLayout1);

    }

    public static class SimpleAddition extends Fragment {
        @Override
        public View onCreateView(LayoutInflater inflater, ViewGroup container,
                                 Bundle savedInstanceState) {
            View v = inflater.inflate(R.layout.fragment_simple, container, false);

            Button b = (Button) v.findViewById(R.id.button1);
            final EditText et1 = (EditText) v.findViewById(R.id.editText1);
            final TextView tv = (TextView) v.findViewById(R.id.textView1);

            b.setOnClickListener(new OnClickListener() {

                @Override
                public void onClick(View v) {
                    tv.setText(et1.getText().toString());
                }
            });
            return v;
        }
    }

}
```

### Run

Copy the code or download it in the link below, build and run.

### Reference

Here are the reference links:

| Number | Link |
| --- | --- |
| 1. | [Download](https://github.com/AnkitKumar111/Android_Assignment10.1/archive/refs/heads/master.zip) Example |
| 2. | [Follow](https://github.com/AnkitKumar111/) code author |

## More Examples

Here are more examples

[loop type=example taxonomy=post_tag term=fragment orderby=date order=asc]

## [loop-count]. [field title]

[content]

[Read Individually.]([field url])

* * *

[/loop]
