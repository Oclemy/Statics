# Search/Filter Lists


In this tutorial you will learn various ways in which you can search various types of lists. By lists we mean:

1. RecyclerView
2. ListView
3. GridView
4. Spinner etc.


> NOTE: BECAUSE THIS TUTORIAL COVERS MANY CONCEPTS WE HAVE SPLIT IT INTO THREE PAGES:

1. [Page 1](https://camposha.info/android-examples/android-search-filter-lists/): Filter Listview using spinner or searchview.
2. [Page 2](https://camposha.info/android-examples/android-search-filter-lists/2/): Filter RecyclerView
3. [Page 3](https://camposha.info/android-examples/android-search-filter-lists/3/): Filter Spinner.

# Concept 1: Filter ListView using Spinner or SearchView

The oldest view for listing or rendering lists of items in android is the listview. If you want the simplest way to list items then it is the way to go. However after listing items you may wish to filter or search items. if that's the case then this tutorial is for you.

### Concepts You will Learn

This tutorial basically teaches you various ways of filtering data. You will learn the following:

1. Filtering items in a listview or gridView using a dropdown/spinner.
2. Filtering/Searching items in a listvew or gridview using a search view.
3. How to filter a custom listview.
4. How to filter JSON data downloaded via Retrofit.

We follow an example based approach whereby you learn by following source code. The code is well commented.

## (a). How to filter a ListView using a dropdown/spinner.

**Tools Used**

Here are the tools used in this project:

1. IDE: Android Studio
2. Programming language: Java

### Step 1 - Dependencies

This project doesn't require any third party libraries.

### Step 2 - Code

Let's write some code:

First Start by adding the necessary imports:

```java
import android.app.Activity;
import android.os.Bundle;
import android.view.View;
import android.widget.AdapterView;
import android.widget.ArrayAdapter;
import android.widget.ListView;
import android.widget.Spinner;
import android.widget.Toast;

import java.util.ArrayList;
```

Extend the activity or the appcompatactivity to create for us an activity:

```java
public class MainActivity extends Activity {
```

As instance properties of this activity, declare some components we will need: like ListView and spinner, as well as an array to host our filter parameters:

```java
    ListView myListView;
    Spinner mySpinner;
    ArrayAdapter<CosmicBody> adapter;
    String[] categories={"All","Planets","Stars","Galaxies"};
```

Now generate our comsic bodies using the following method. These cosmic bodies are what the user will be filtering:

```java
    private ArrayList<CosmicBody> getCosmicBodies() {
        ArrayList<CosmicBody> data = new ArrayList<>();
        data.clear();

        data.add(new CosmicBody("Mercury", 1));
        data.add(new CosmicBody("UY Scuti", 1));
        data.add(new CosmicBody("Andromeda", 3));
        data.add(new CosmicBody("VV Cephei A", 2));
        data.add(new CosmicBody("IC 1011", 3));
        data.add(new CosmicBody("Sun", 2));
        data.add(new CosmicBody("Aldebaran", 2));
        data.add(new CosmicBody("Venus", 1));
        data.add(new CosmicBody("Malin 1", 3));
        data.add(new CosmicBody("Rigel", 2));
        data.add(new CosmicBody("Earth", 1));
        data.add(new CosmicBody("Whirlpool", 3));
        data.add(new CosmicBody("VY Canis Majoris", 2));
        data.add(new CosmicBody("Saturn", 1));
        data.add(new CosmicBody("Sombrero", 3));
        data.add(new CosmicBody("Betelgeuse", 2));
        data.add(new CosmicBody("Uranus", 1));
        data.add(new CosmicBody("Virgo Stellar Stream", 3));
        data.add(new CosmicBody("Epsillon Canis Majoris", 2));
        data.add(new CosmicBody("Jupiter", 1));
        data.add(new CosmicBody("VY Canis Majos", 2));
        data.add(new CosmicBody("Triangulum", 3));
        data.add(new CosmicBody("Cartwheel", 3));
        data.add(new CosmicBody("Antares", 2));
        data.add(new CosmicBody("Mayall's Object", 3));
        data.add(new CosmicBody("Proxima Centauri", 2));
        data.add(new CosmicBody("Black Eye", 3));
        data.add(new CosmicBody("Mars", 1));
        data.add(new CosmicBody("Sirius", 2));
        data.add(new CosmicBody("Centaurus A", 3));
        data.add(new CosmicBody("Pinwheel", 3));
        data.add(new CosmicBody("Small Magellonic Cloud", 3));
        data.add(new CosmicBody("Uranus", 1));
        data.add(new CosmicBody("Alpha Centauri", 2));
        data.add(new CosmicBody("Large Magellonic Cloud", 3));

        return data;
    }
```

Here is the fill code for this activity:

**. MainActivity.java**

Add the following code in your main activity:

```java
package info.camposha.listviewdropdownspinnerjava;

import android.app.Activity;
import android.os.Bundle;
import android.view.View;
import android.widget.AdapterView;
import android.widget.ArrayAdapter;
import android.widget.ListView;
import android.widget.Spinner;
import android.widget.Toast;

import java.util.ArrayList;

public class MainActivity extends Activity {

    ListView myListView;
    Spinner mySpinner;
    ArrayAdapter<CosmicBody> adapter;
    String[] categories={"All","Planets","Stars","Galaxies"};

    /*
    Initialize ListView and Spinner, set their adapters and listen to spinner itemSelection events
    */
    private void initializeViews() {

        mySpinner = findViewById(R.id.mySpinner);
        mySpinner.setAdapter(new ArrayAdapter<>(this, android.R.layout.simple_list_item_1, categories));

        myListView = findViewById(R.id.myListView);
        myListView.setAdapter(new ArrayAdapter<>(this, android.R.layout.simple_list_item_1, getCosmicBodies()));

        //spinner selection events
        mySpinner.setOnItemSelectedListener(new AdapterView.OnItemSelectedListener() {
            @Override
            public void onItemSelected(AdapterView<?> adapterView, View view, int position, long itemID) {
                if (position >= 0 && position < categories.length) {
                    getSelectedCategoryData(position);
                } else {
                    Toast.makeText(MainActivity.this, "Selected Category Does not Exist!", Toast.LENGTH_SHORT).show();
                }
            }
            @Override
            public void onNothingSelected(AdapterView<?> adapterView) {

            }
        });
    }
    /*
    Populate an arraylist that will act as our data source.
     */
    private ArrayList<CosmicBody> getCosmicBodies() {
        ArrayList<CosmicBody> data = new ArrayList<>();
        data.clear();

        data.add(new CosmicBody("Mercury", 1));
        data.add(new CosmicBody("UY Scuti", 1));
        data.add(new CosmicBody("Andromeda", 3));
        data.add(new CosmicBody("VV Cephei A", 2));
        data.add(new CosmicBody("IC 1011", 3));
        data.add(new CosmicBody("Sun", 2));
        data.add(new CosmicBody("Aldebaran", 2));
        data.add(new CosmicBody("Venus", 1));
        data.add(new CosmicBody("Malin 1", 3));
        data.add(new CosmicBody("Rigel", 2));
        data.add(new CosmicBody("Earth", 1));
        data.add(new CosmicBody("Whirlpool", 3));
        data.add(new CosmicBody("VY Canis Majoris", 2));
        data.add(new CosmicBody("Saturn", 1));
        data.add(new CosmicBody("Sombrero", 3));
        data.add(new CosmicBody("Betelgeuse", 2));
        data.add(new CosmicBody("Uranus", 1));
        data.add(new CosmicBody("Virgo Stellar Stream", 3));
        data.add(new CosmicBody("Epsillon Canis Majoris", 2));
        data.add(new CosmicBody("Jupiter", 1));
        data.add(new CosmicBody("VY Canis Majos", 2));
        data.add(new CosmicBody("Triangulum", 3));
        data.add(new CosmicBody("Cartwheel", 3));
        data.add(new CosmicBody("Antares", 2));
        data.add(new CosmicBody("Mayall's Object", 3));
        data.add(new CosmicBody("Proxima Centauri", 2));
        data.add(new CosmicBody("Black Eye", 3));
        data.add(new CosmicBody("Mars", 1));
        data.add(new CosmicBody("Sirius", 2));
        data.add(new CosmicBody("Centaurus A", 3));
        data.add(new CosmicBody("Pinwheel", 3));
        data.add(new CosmicBody("Small Magellonic Cloud", 3));
        data.add(new CosmicBody("Uranus", 1));
        data.add(new CosmicBody("Alpha Centauri", 2));
        data.add(new CosmicBody("Large Magellonic Cloud", 3));

        return data;
    }
    /*
    Get the selected category's cosmic bodies and bind to ListView
     */
    private void getSelectedCategoryData(int categoryID) {
        //arraylist to hold selected cosmic bodies
        ArrayList<CosmicBody> cosmicBodies = new ArrayList<>();
        if(categoryID == 0)
        {
            adapter = new ArrayAdapter<>(this, android.R.layout.simple_list_item_1, getCosmicBodies());
        }else{
            //filter by id
            for (CosmicBody cosmicBody : getCosmicBodies()) {
                if (cosmicBody.getCategoryId() == categoryID) {
                    cosmicBodies.add(cosmicBody);
                }
            }
            //instatiate adapter a
            adapter = new ArrayAdapter<>(this, android.R.layout.simple_list_item_1, cosmicBodies);
        }
        //set the adapter to GridView
        myListView.setAdapter(adapter);
    }
    /*
    when activity is created, setContentView then initializeViews.
     */
    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);

        initializeViews();
    }
}
/*
Data Object class to represent a single Cosmic body. Class has default access modifier
 */
class CosmicBody {
    private String name;
    private int categoryID;

    public String getName() {
        return name;
    }

    public int getCategoryId() {
        return categoryID;
    }

    public CosmicBody(String name, int categoryID) {
        this.name = name;
        this.categoryID = categoryID;
    }

    @Override
    public String toString() {
        return name;
    }
}
```

That's the whole code required.

### Step 3: Layouts

Copy the layout from the source code.

### Step 4: Run

If your run the project you'll get the following:

![](https://github.com/Oclemy/ListViewDropDownSpinnerJava/raw/master/ListViewDropDownSpinnerJava.gif)

### Step 5: Download

Download the code below:

| No. | Link |
| --- | --- |
| 1. | [Browse/Download Code](https://github.com/Oclemy/ListViewDropDownSpinnerJava) |
| 2. | [Follow @Oclemy](https://github.com/Oclemy) |

## (b). How to filter a listview using dropdown/spinner in Kotlin

These days kotlin is the goto language for android development. Solet's see the first example re-written for Kotlin.

This example:

1. Filters a listview using a dropdown/spinner.

### Step 1: Dependencies

No third party dependencies used.

### Step 2: Code

We have only one file:

**MainActivity.kt**

```kotlin
package info.camposha.kotlinlistviewfilter

import android.os.Bundle
import android.view.View
import android.widget.*
import android.widget.AdapterView.OnItemSelectedListener
import androidx.appcompat.app.AppCompatActivity
import kotlinx.android.synthetic.main.activity_main.*

class MainActivity : AppCompatActivity() {
   private var adapter: ArrayAdapter<CosmicBody>? = null
    var categories = arrayOf("All", "Planets", "Stars", "Galaxies")

    /*
    Initialize ListView and Spinner, set their adapters and listen to spinner itemSelection events
    */
    private fun initializeViews() {
        mySpinner.adapter = ArrayAdapter(this, android.R.layout.simple_list_item_1, categories)
        myListView.adapter = ArrayAdapter(
            this, android.R.layout.simple_list_item_1,
            cosmicBodies
        )
        //myListView.adapter=adapter

        //spinner selection events
        mySpinner.onItemSelectedListener = object : OnItemSelectedListener {
            override fun onItemSelected(
                adapterView: AdapterView<*>?,
                view: View,
                position: Int,
                itemID: Long
            ) {
                if (position >= 0 && position < categories.size) {
                    getSelectedCategoryData(position)
                } else {
                    Toast.makeText(
                        this@MainActivity,
                        "Selected Category Does not Exist!",
                        Toast.LENGTH_SHORT
                    ).show()
                }
            }

            override fun onNothingSelected(adapterView: AdapterView<*>?) {}
        }
    }

    /*
   Populate an arraylist that will act as our data source.
    */
    private val cosmicBodies: ArrayList<CosmicBody>
        get() {
            val data = ArrayList<CosmicBody>()
            data.add(CosmicBody("Mercury", 1))
            data.add(CosmicBody("UY Scuti", 1))
            data.add(CosmicBody("Andromeda", 3))
            data.add(CosmicBody("VV Cephei A", 2))
            data.add(CosmicBody("IC 1011", 3))
            data.add(CosmicBody("Sun", 2))
            data.add(CosmicBody("Aldebaran", 2))
            data.add(CosmicBody("Venus", 1))
            data.add(CosmicBody("Malin 1", 3))
            data.add(CosmicBody("Rigel", 2))
            data.add(CosmicBody("Earth", 1))
            data.add(CosmicBody("Whirlpool", 3))
            data.add(CosmicBody("VY Canis Majoris", 2))
            data.add(CosmicBody("Saturn", 1))
            data.add(CosmicBody("Sombrero", 3))
            data.add(CosmicBody("Betelgeuse", 2))
            data.add(CosmicBody("Uranus", 1))
            data.add(CosmicBody("Virgo Stellar Stream", 3))
            data.add(CosmicBody("Epsillon Canis Majoris", 2))
            data.add(CosmicBody("Jupiter", 1))
            data.add(CosmicBody("VY Canis Majos", 2))
            data.add(CosmicBody("Triangulum", 3))
            data.add(CosmicBody("Cartwheel", 3))
            data.add(CosmicBody("Antares", 2))
            data.add(CosmicBody("Mayall's Object", 3))
            data.add(CosmicBody("Proxima Centauri", 2))
            data.add(CosmicBody("Black Eye", 3))
            data.add(CosmicBody("Mars", 1))
            data.add(CosmicBody("Sirius", 2))
            data.add(CosmicBody("Centaurus A", 3))
            data.add(CosmicBody("Pinwheel", 3))
            data.add(CosmicBody("Small Magellonic Cloud", 3))
            data.add(CosmicBody("Uranus", 1))
            data.add(CosmicBody("Alpha Centauri", 2))
            data.add(CosmicBody("Large Magellonic Cloud", 3))
            return data
        }

    /*
   Get the selected category's cosmic bodies and bind to ListView
    */
    private fun getSelectedCategoryData(categoryID: Int) {
        //arraylist to hold selected cosmic bodies
        val data = ArrayList<CosmicBody>()
        adapter = if (categoryID == 0) {
            ArrayAdapter(
                this, android.R.layout.simple_list_item_1,
                cosmicBodies
            )

        } else {
            //filter by id
            for (cosmicBody in cosmicBodies) {
                if (cosmicBody.categoryId == categoryID) {
                    data.add(cosmicBody)
                }
            }
            //instatiate adapter a
            ArrayAdapter(this, android.R.layout.simple_list_item_1, data)
        }
        //set the adapter to GridView
        myListView!!.adapter = adapter
    }

    /*
    when activity is created, setContentView then initializeViews.
     */
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_main)
        initializeViews()
    }
}

/*
Data Object class to represent a single Cosmic body. Class has default access modifier
 */
class CosmicBody(private val name: String, val categoryId: Int) {

    override fun toString(): String {
        return name
    }
}
```

### Step 3: Layouts

Copy layout from the source code reference.

### Step 4: Run

If you run the project you get the following:

![Kotlin Filter ListView](https://github.com/Oclemy/KotlinListViewFilter/raw/master/KotlinListViewFilter.gif)

### Step 5: Download

Download the code below:

| No. | Link |
| --- | --- |
| 1. | [Browse/Download Code](https://github.com/Oclemy/KotlinListViewFilter) |
| 2. | [Follow @Oclemy](https://github.com/Oclemy) |

## Example 3: Android Filter GridView Using Spinner/Dropdown

_Android Filter GridView using Spinner Example_

In this tutorial we want to see how to filter a gridview using a spinner widget. You select a category from the spinner or dropdown and that is used as a constraint thus allowing us filter a simple gridview.

##### Demo

Here's the gif demo of the project:

#### Layouts

We have only a single layout:

##### (a). activity_main.xml

Our mainactivity's layout. Here we have a header textview, a spinner which is our dropdown widget and a gridview which is our adapterview.

This is our only layout and it gets inflated into our main activity.

```xml
<?xml version="1.0" encoding="utf-8"?>
<RelativeLayout

    android_layout_width="match_parent"
    android_layout_height="match_parent"
    tools_context="info.camposha.gridviewdropdownfilter.MainActivity">

    <TextView
        android_id="@+id/headerLabel"
        android_layout_width="wrap_content"
        android_layout_height="wrap_content"
        android_layout_alignParentTop="true"
        android_layout_centerHorizontal="true"
        android_fontFamily="casual"
        android_text="Cosmic Bodies"
        android_textAllCaps="true"
        android_textSize="24sp"
        android_textStyle="bold" />

    <Spinner
        android_id="@+id/mySpinner"
        android_layout_width="match_parent"
        android_layout_height="wrap_content"
        android_padding="5dp"
        android_layout_below="@id/headerLabel"
        android_layout_centerHorizontal="true"
        android_background="@android:drawable/editbox_dropdown_light_frame" />
    <GridView
        android_id="@+id/myGridView"
        android_numColumns="auto_fit"
        android_layout_below="@id/mySpinner"
        android_layout_width="match_parent"
        android_layout_height="wrap_content" />

</RelativeLayout>
```

#### Java Code

We have one class:

##### (a). MainActivity.java

The main activity is the entry point to our Kotlin app. We have cleanly commented the code for inline explanations.

```java
package info.camposha.gridviewdropdownfilter;

import android.app.Activity;
import android.os.Bundle;
import android.view.View;
import android.widget.AdapterView;
import android.widget.ArrayAdapter;
import android.widget.GridView;
import android.widget.Spinner;
import android.widget.Toast;

import java.util.ArrayList;

public class MainActivity extends Activity {

    GridView myGridView;
    Spinner mySpinner;
    ArrayAdapter<CosmicBody> adapter;
    String[] categories={"All","Planets","Stars","Galaxies"};
    /*
    when activity is created
     */
    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);

        initializeViews();
    }
    /*
    Initialize GridView and Spinner, set their adapters and listen to spinner itemSelection events
    */
    private void initializeViews() {

    mySpinner = findViewById(R.id.mySpinner);
        mySpinner.setAdapter(new ArrayAdapter<String>(this, android.R.layout.simple_list_item_1, categories));

        myGridView = findViewById(R.id.myGridView);
        myGridView.setAdapter(new ArrayAdapter<CosmicBody>(this, android.R.layout.simple_list_item_1, getCosmicBodies()));

        //spinner selection events
        mySpinner.setOnItemSelectedListener(new AdapterView.OnItemSelectedListener() {
            @Override
            public void onItemSelected(AdapterView<?> adapterView, View view, int position, long itemID) {
                if (position >= 0 && position < categories.length) {
                    getSelectedCategoryData(position);
                } else {
                    Toast.makeText(MainActivity.this, "Selected Category Does not Exist!", Toast.LENGTH_SHORT).show();
                }
            }
            @Override
            public void onNothingSelected(AdapterView<?> adapterView) {

            }
        });
    }
    /*
    Populate an arraylist that will act as our data source.
     */
    private ArrayList<CosmicBody> getCosmicBodies() {
        ArrayList<CosmicBody> data = new ArrayList<>();
        data.clear();

        data.add(new CosmicBody("Mercury", 1));
        data.add(new CosmicBody("UY Scuti", 1));
        data.add(new CosmicBody("Andromeda", 3));
        data.add(new CosmicBody("VV Cephei A", 2));
        data.add(new CosmicBody("IC 1011", 3));
        data.add(new CosmicBody("Sun", 2));
        data.add(new CosmicBody("Aldebaran", 2));
        data.add(new CosmicBody("Venus", 1));
        data.add(new CosmicBody("Malin 1", 3));
        data.add(new CosmicBody("Rigel", 2));
        data.add(new CosmicBody("Earth", 1));
        data.add(new CosmicBody("Whirlpool", 3));
        data.add(new CosmicBody("VY Canis Majoris", 2));
        data.add(new CosmicBody("Saturn", 1));
        data.add(new CosmicBody("Sombrero", 3));
        data.add(new CosmicBody("Betelgeuse", 2));
        data.add(new CosmicBody("Uranus", 1));
        data.add(new CosmicBody("Virgo Stellar Stream", 3));
        data.add(new CosmicBody("Epsillon Canis Majoris", 2));
        data.add(new CosmicBody("Jupiter", 1));
        data.add(new CosmicBody("VY Canis Majos", 2));
        data.add(new CosmicBody("Triangulum", 3));
        data.add(new CosmicBody("Cartwheel", 3));
        data.add(new CosmicBody("Antares", 2));
        data.add(new CosmicBody("Mayall's Object", 3));
        data.add(new CosmicBody("Proxima Centauri", 2));
        data.add(new CosmicBody("Black Eye", 3));
        data.add(new CosmicBody("Mars", 1));
        data.add(new CosmicBody("Sirius", 2));
        data.add(new CosmicBody("Centaurus A", 3));
        data.add(new CosmicBody("Pinwheel", 3));
        data.add(new CosmicBody("Small Magellonic Cloud", 3));
        data.add(new CosmicBody("Uranus", 1));
        data.add(new CosmicBody("Alpha Centauri", 2));
        data.add(new CosmicBody("Large Magellonic Cloud", 3));

        return data;
    }
    /*
    Get the selected category's cosmic bodies and bind to GridView
     */
    private void getSelectedCategoryData(int categoryID) {
        //arraylist to hold selected cosmic bodies
        ArrayList<CosmicBody> cosmicBodies = new ArrayList<>();
        if(categoryID == 0)
        {
            adapter = new ArrayAdapter<>(this, android.R.layout.simple_list_item_1, getCosmicBodies());
        }else{
            //filter by id
            for (CosmicBody cosmicBody : getCosmicBodies()) {
                if (cosmicBody.getCategoryId() == categoryID) {
                    cosmicBodies.add(cosmicBody);
                }
            }
    //instatiate adapter a
        adapter = new ArrayAdapter<CosmicBody>(this, android.R.layout.simple_list_item_1, cosmicBodies);
        }
        //set the adapter to GridView
        myGridView.setAdapter(adapter);
    }
}
   /*
   Data Object class to represent a single Cosmic body. Class has default access modifier
    */
class CosmicBody {
    private String name;
    private int categoryID;

    public String getName() {
        return name;
    }

    public int getCategoryId() {
        return categoryID;
    }

    public CosmicBody(String name, int categoryID) {
        this.name = name;
        this.categoryID = categoryID;
    }

    @Override
    public String toString() {
        return name;
    }
}
```

##### Download

You can download the full source code below or watch the video from the link provided.

| No. | Location | Link |
| --- | --- | --- |
| 1. | GitHub | [Direct Download](https://github.com/Oclemy/GridViewDropDownFilter/archive/master.zip) |
| 2. | GitHub | [Browse](https://github.com/Oclemy/GridViewDropDownFilter) |
| 3. | YouTube | [Video Tutorial](https://www.youtube.com/watch?v=l2GejnvGjl4) |
| 4. | YouTube | [ProgrammingWizards TV Channel](http://www.youtube.com/c/programmingwizards) |

## Part 2 - Filtering Using a Searchview

In this part we will see how to filter search a gridview or listview using a searchview.

## Example 1: Android ListView – Search/Filter

In this example, we'll see how to search filter an android listview.

We'll use a SearchView component.

### Step 1: Gradle Files

We do not need any special dependencies for this project.

### Step 2: Create Layouts

We'll have these three layouts in our project:

**1\. activity_main.xml**

Our main activity's layout:

```xml
    <?xml version="1.0" encoding="utf-8"?>
    <android.support.design.widget.CoordinatorLayout

        android_layout_width="match_parent"
        android_layout_height="match_parent"
        android_fitsSystemWindows="true"
        tools_context="com.tutorials.hp.lvfilter.MainActivity">

        <android.support.design.widget.AppBarLayout
            android_layout_width="match_parent"
            android_layout_height="wrap_content"
            android_theme="@style/AppTheme.AppBarOverlay">

            <android.support.v7.widget.Toolbar
                android_id="@+id/toolbar"
                android_layout_width="match_parent"
                android_layout_height="?attr/actionBarSize"
                android_background="?attr/colorPrimary"
                app_popupTheme="@style/AppTheme.PopupOverlay" />

        </android.support.design.widget.AppBarLayout>

        <include layout="@layout/content_main" />

        <android.support.design.widget.FloatingActionButton
            android_id="@+id/fab"
            android_layout_width="wrap_content"
            android_layout_height="wrap_content"
            android_layout_gravity="bottom|end"
            android_layout_margin="@dimen/fab_margin"
            android_src="@android:drawable/ic_dialog_email" />

    </android.support.design.widget.CoordinatorLayout>
```

**2\. content_main.xml**

- This layout will hold our ListView and SearchView.

```xml
    <?xml version="1.0" encoding="utf-8"?>
    <RelativeLayout

        android_layout_width="match_parent"
        android_layout_height="match_parent"
        android_paddingBottom="@dimen/activity_vertical_margin"
        android_paddingLeft="@dimen/activity_horizontal_margin"
        android_paddingRight="@dimen/activity_horizontal_margin"
        android_paddingTop="@dimen/activity_vertical_margin"
        app_layout_behavior="@string/appbar_scrolling_view_behavior"
        tools_context="com.tutorials.hp.lvfilter.MainActivity"
        tools_showIn="@layout/activity_main">

        <android.support.v7.widget.SearchView
            android_id="@+id/mSearch"
            android_layout_width="match_parent"
            android_layout_height="50dp"

            app_defaultQueryHint="Search.."

            />
        <ListView
            android_layout_width="wrap_content"
            android_layout_height="wrap_content"
            android_id="@+id/lv"
            android_layout_below="@+id/mSearch"
            android_layout_alignParentLeft="true"
            android_layout_alignParentStart="true" />
    </RelativeLayout>
```

**3\. model.xml**

This layout will define the model for our custom rows.Our ListView will have images and text.

```xml
    <?xml version="1.0" encoding="utf-8"?>
    <android.support.v7.widget.CardView
        android_orientation="horizontal" android_layout_width="match_parent"

        android_layout_margin="10dp"
        card_view_cardCornerRadius="10dp"
        card_view_cardElevation="10dp"

        android_layout_height="wrap_content">

        <RelativeLayout
            android_layout_width="match_parent"
            android_layout_height="match_parent">

            <ImageView
                android_layout_width="wrap_content"
                android_layout_height="wrap_content"
                android_id="@+id/movieImage"
                android_padding="10dp"
                android_src="@drawable/ghost" />

            <TextView
                android_layout_width="wrap_content"
                android_layout_height="wrap_content"
                android_textAppearance="?android:attr/textAppearanceLarge"
                android_text="Name"
                android_id="@+id/nameTxt"
                android_padding="10dp"
                android_textColor="@color/colorAccent"
                android_layout_below="@+id/movieImage"
                android_layout_alignParentLeft="true"
                 />

            <TextView
                android_layout_width="wrap_content"
                android_layout_height="wrap_content"
                android_textAppearance="?android:attr/textAppearanceLarge"
                android_text=" John Doe a former FBI Agent and now Physics teacher .is wrongly accussed of murdering an innocent child.He makes it his business to find the bad guys who did taht.He convinces hacker Aram to join him.....
                "
                android_id="@+id/descTxt"
                android_padding="10dp"
                android_layout_below="@+id/nameTxt"
                android_layout_alignParentLeft="true"
                />

            <TextView
                android_layout_width="wrap_content"
                android_layout_height="wrap_content"
                android_textAppearance="?android:attr/textAppearanceMedium"
                android_text="TV Show"
                android_id="@+id/posTxt"
                android_padding="10dp"

                android_layout_below="@+id/movieImage"
                android_layout_alignParentRight="true" />

            <CheckBox
                android_layout_width="wrap_content"
                android_layout_height="wrap_content"
                android_id="@+id/chk"
                android_layout_alignParentRight="true"
                />

        </RelativeLayout>
    </android.support.v7.widget.CardView>
```

### Step 3 Write Java Code

Here are our Java classes:

#### 1\. Create Model Class:

**Movie.java**

- Our data object.
- Will represent a single movies.

```java
    package com.tutorials.hp.lvfilter;

    public class Movie {

        private String name;
        private int image;

        public Movie(String name, int image) {
            this.name = name;
            this.image = image;
        }

        public String getName() {
            return name;
        }

        public int getImage() {
            return image;
        }
    }
```

#### 2\. Create Item Click Listener

**ItemClickListner**

An interface.It will define the signature for our `OnItemClick()` method.

```java
    package com.tutorials.hp.lvfilter;

    import android.view.View;

    public interface ItemClickListener {

        void onItemClick(View v);
    }
```

#### 3\. Create ViewHolder

**MyViewHolder.java**

Our View holder class.

```java
    package com.tutorials.hp.lvfilter;

    import android.view.View;
    import android.widget.ImageView;
    import android.widget.TextView;

    public class MyViewHolder implements View.OnClickListener {

        ImageView img;
        TextView nameTxt;
        ItemClickListener itemClickListener;

        public MyViewHolder(View v) {
            img= (ImageView) v.findViewById(R.id.movieImage);
            nameTxt= (TextView) v.findViewById(R.id.nameTxt);

            v.setOnClickListener(this);
        }

        @Override
        public void onClick(View v) {
            this.itemClickListener.onItemClick(v);
        }

        public void setItemClickListener(ItemClickListener ic)
        {
            this.itemClickListener=ic;
        }
    }
```

#### Create an Adapter class

**MyAdapter.java**

Our adapter class.It will Derive from BaseAdapter.It Implements Filterable interface.

```java
    package com.tutorials.hp.lvfilter;

    import android.content.Context;
    import android.view.LayoutInflater;
    import android.view.View;
    import android.view.ViewGroup;
    import android.widget.BaseAdapter;
    import android.widget.Filter;
    import android.widget.Filterable;
    import android.widget.Toast;

    import java.util.ArrayList;

    public class MyAdapter extends BaseAdapter implements Filterable {

        Context c;
        ArrayList<Movie> movies;
        LayoutInflater inflater;

        ArrayList<Movie> filterList;
        CustomFilter filter;

        public MyAdapter(Context c, ArrayList<Movie> movies) {
            this.c = c;
            this.movies = movies;
            this.filterList=movies;
        }

        //TOTLA NUM OF MOVIES
        @Override
        public int getCount() {
            return movies.size();
        }

        //GET A SINGLE MOVIE
        @Override
        public Object getItem(int position) {
            return movies.get(position);
        }

        //IDENTITDIER
        @Override
        public long getItemId(int position) {
            return position;
        }

        @Override
        public View getView(final int position, View convertView, ViewGroup parent) {

            if(inflater==null)
            {
                inflater= (LayoutInflater) c.getSystemService(Context.LAYOUT_INFLATER_SERVICE);
            }

            //PERFORM INFLATION
            if(convertView==null)
            {
                convertView=inflater.inflate(R.layout.model,null);
            }

            //BIND DATA TO VIEWS
            MyViewHolder holder=new MyViewHolder(convertView);
            holder.nameTxt.setText(movies.get(position).getName());
            holder.img.setImageResource(movies.get(position).getImage());

            holder.setItemClickListener(new ItemClickListener() {
                @Override
                public void onItemClick(View v) {
                    Toast.makeText(c,movies.get(position).getName(),Toast.LENGTH_SHORT).show();
                }
            });

            //RETURN A ROW
            return convertView;
        }

        @Override
        public Filter getFilter() {

            if(filter==null)
            {
                filter=new CustomFilter(filterList,this);
            }

            return filter;
        }
    }
```

#### Create a Custom Filter

**CustomFilter.java**

This class is responsible for our custom filtering.It Derives from `android.widget.Filter`.

```java
    package com.tutorials.hp.lvfilter;

    import android.widget.Filter;

    import java.util.ArrayList;

    public class CustomFilter extends Filter {

        ArrayList<Movie> filterList;
        MyAdapter adapter;

        public CustomFilter(ArrayList<Movie> filterList, MyAdapter adapter) {
            this.filterList = filterList;
            this.adapter = adapter;
        }

        //FILTERING
        @Override
        protected FilterResults performFiltering(CharSequence constraint) {

            //RESULTS
            FilterResults results=new FilterResults();

            //VALIDATION
            if(constraint != null && constraint.length()>0)
            {

                //CHANGE TO UPPER FOR CONSISTENCY
                constraint=constraint.toString().toUpperCase();

                ArrayList<Movie> filteredMovies=new ArrayList<>();

                //LOOP THRU FILTER LIST
                for(int i=0;i<filterList.size();i++)
                {
                    //FILTER
                    if(filterList.get(i).getName().toUpperCase().contains(constraint))
                    {
                        filteredMovies.add(filterList.get(i));
                    }
                }

                results.count=filteredMovies.size();
                results.values=filteredMovies;
            }else
            {
                results.count=filterList.size();
               results.values=filterList;
            }

            return results;
        }

        //PUBLISH RESULTS

        @Override
        protected void publishResults(CharSequence constraint, FilterResults results) {

            adapter.movies= (ArrayList<Movie>) results.values;
            adapter.notifyDataSetChanged();

        }
    }
```

### Create activity

**MainActivity.java**

This is Our launcher activity. It References both our ListView and SearchView.It Then sets the adapter to ListView. It also Listens to OnQueryTextChange events on the searchview.

```java
    package com.tutorials.hp.lvfilter;

    import android.os.Bundle;
    import android.support.design.widget.FloatingActionButton;
    import android.support.design.widget.Snackbar;
    import android.support.v7.app.AppCompatActivity;
    import android.support.v7.widget.SearchView;
    import android.support.v7.widget.Toolbar;
    import android.view.View;
    import android.view.Menu;
    import android.view.MenuItem;
    import android.widget.AdapterView;
    import android.widget.ListView;
    import android.widget.Toast;

    import java.util.ArrayList;

    public class MainActivity extends AppCompatActivity {

        SearchView sv;
        ListView lv;
        MyAdapter adapter;

        @Override
        protected void onCreate(Bundle savedInstanceState) {
            super.onCreate(savedInstanceState);
            setContentView(R.layout.activity_main);
            Toolbar toolbar = (Toolbar) findViewById(R.id.toolbar);
            setSupportActionBar(toolbar);

            FloatingActionButton fab = (FloatingActionButton) findViewById(R.id.fab);
            fab.setOnClickListener(new View.OnClickListener() {
                @Override
                public void onClick(View view) {
                    Snackbar.make(view, "Replace with your own action", Snackbar.LENGTH_LONG)
                            .setAction("Action", null).show();
                }
            });

            sv= (SearchView) findViewById(R.id.mSearch);
            lv= (ListView) findViewById(R.id.lv);

            adapter=new MyAdapter(this,getMovies());
            lv.setAdapter(adapter);

            sv.setOnQueryTextListener(new SearchView.OnQueryTextListener() {
                @Override
                public boolean onQueryTextSubmit(String query) {
                    return false;
                }

                @Override
                public boolean onQueryTextChange(String query) {
                    adapter.getFilter().filter(query);
                    return false;
                }
            });

        }

        private ArrayList<Movie> getMovies() {
            //COLECTION OF CRIME MOVIES
            ArrayList<Movie> movies=new ArrayList<>();

            Movie movie=new Movie("BlackList",R.drawable.red);

            //ADD ITR TO COLLECTION
            movies.add(movie);

            movie=new Movie("Fruts",R.drawable.fruits);
            movies.add(movie);

            movie=new Movie("Breaking Bad",R.drawable.breaking);
            movies.add(movie);

            movie=new Movie("Crisis",R.drawable.crisis);
            movies.add(movie);

            movie=new Movie("Ghost Rider",R.drawable.rider);
            movies.add(movie);

            movie=new Movie("Star Wars",R.drawable.starwars);
            movies.add(movie);

            movie=new Movie("Shuttle Carrier",R.drawable.shuttlecarrier);
            movies.add(movie);

            movie=new Movie("Men In Black",R.drawable.meninblack);
            movies.add(movie);

            movie=new Movie("Game Of Thrones",R.drawable.thrones);
            movies.add(movie);

            return movies;
        }

    }
```

## Example 2: Android Custom Filter/Search ListView With Images Text [BaseAdapter]

We cover how to perform a Custom Filter against data in your ListView.Our adapter is BaseAdapter and we shall be searching ListView with images and text.We shall implement Filterable interface and derive from Filter class.

PLATFORM : Android Java TOOLS : Eclipse,Bluestacks Emulator

### Step 1: Our Player Class

Purpose :

1. Is our POJO class.Plain Old Java Object
2. Holds data consisting of a single Player.

```java
package com.tutorials.listviewcustomfilterbase;

public class Player {

  private String name;
  private int img;

  public Player(String name,int img) {
    // TODO Auto-generated constructor stub

    this.name=name;
    this.img=img;
  }

  public String getName() {
    return name;
  }

  public void setName(String name) {
    this.name = name;
  }

  public int getImg() {
    return img;
  }

  public void setImg(int img) {
    this.img = img;
  }
}
```

### Step 2 : Our Custom Adapter class

Purpose:

1. Adapts our images and Text to our ListView
2. Is where we bind data to views
3. Has an inner class CustomFilter that implements Filtering or Searching for us.
4. Implements Filterable method hence we override getFilter() method that in turn returns a filter object.

```java
package com.tutorials.listviewcustomfilterbase;

import java.util.ArrayList;

import android.content.Context;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.BaseAdapter;
import android.widget.Filter;
import android.widget.Filterable;
import android.widget.ImageView;
import android.widget.TextView;

public class Adapter extends BaseAdapter implements Filterable{

  Context c;
  ArrayList<Player> players;
  CustomFilter filter;
  ArrayList<Player> filterList;

  public Adapter(Context ctx,ArrayList<Player> players) {
    // TODO Auto-generated constructor stub

    this.c=ctx;
    this.players=players;
    this.filterList=players;
  }

  @Override
  public int getCount() {
    // TODO Auto-generated method stub
    return players.size();
  }

  @Override
  public Object getItem(int pos) {
    // TODO Auto-generated method stub
    return players.get(pos);
  }

  @Override
  public long getItemId(int pos) {
    // TODO Auto-generated method stub
    return players.indexOf(getItem(pos));
  }

  @Override
  public View getView(int pos, View convertView, ViewGroup parent) {
    // TODO Auto-generated method stub

    LayoutInflater inflater=(LayoutInflater) c.getSystemService(Context.LAYOUT_INFLATER_SERVICE);

    if(convertView==null)
    {
      convertView=inflater.inflate(R.layout.model, null);
    }

    TextView nameTxt=(TextView) convertView.findViewById(R.id.nameTv);
    ImageView img=(ImageView) convertView.findViewById(R.id.imageView1);

    //SET DATA TO THEM
    nameTxt.setText(players.get(pos).getName());
    img.setImageResource(players.get(pos).getImg());

    return convertView;
  }

  @Override
  public Filter getFilter() {
    // TODO Auto-generated method stub
    if(filter == null)
    {
      filter=new CustomFilter();
    }

    return filter;
  }

  //INNER CLASS
  class CustomFilter extends Filter
  {

    @Override
    protected FilterResults performFiltering(CharSequence constraint) {
      // TODO Auto-generated method stub

      FilterResults results=new FilterResults();

      if(constraint != null && constraint.length()>0)
      {
        //CONSTARINT TO UPPER
        constraint=constraint.toString().toUpperCase();

        ArrayList<Player> filters=new ArrayList<Player>();

        //get specific items
        for(int i=0;i<filterList.size();i++)
        {
          if(filterList.get(i).getName().toUpperCase().contains(constraint))
          {
            Player p=new Player(filterList.get(i).getName(), filterList.get(i).getImg());

            filters.add(p);
          }
        }

        results.count=filters.size();
        results.values=filters;

      }else
      {
        results.count=filterList.size();
        results.values=filterList;

      }

      return results;
    }

    @Override
    protected void publishResults(CharSequence constraint, FilterResults results) {
      // TODO Auto-generated method stub

      players=(ArrayList<Player>) results.values;
      notifyDataSetChanged();
    }

  }

}
```

### Step 3: Our MainActivity class

Purpose :

1. Our launcher activity
2. We set reference our ListView from XML and attach its BaseAdapter subclass to it.
3. We reference our SearchView and implement its onQueryTextChangeListener.

```java
package com.tutorials.listviewcustomfilterbase;

import java.util.ArrayList;

import android.os.Bundle;
import android.app.Activity;
import android.view.Menu;
import android.widget.ListView;
import android.widget.SearchView;
import android.widget.SearchView.OnQueryTextListener;

public class MainActivity extends Activity {

  ListView lv;
  SearchView sv;

  String[] names={"Juan Mata","Ander Herera","Wayne Rooney","Eden Hazard","Michael Carrick","Diego Costa","Jose Mourinho"};
  int[] images={R.drawable.mata,R.drawable.herera,R.drawable.rooney,R.drawable.hazard,R.drawable.carrick,R.drawable.costa,R.drawable.mourinho};

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);

        lv=(ListView) findViewById(R.id.listView1);
        sv=(SearchView) findViewById(R.id.searchView1);

        //ADASPTER
        final Adapter adapter=new Adapter(this, getPlayers());
        lv.setAdapter(adapter);

        sv.setOnQueryTextListener(new OnQueryTextListener() {

      @Override
      public boolean onQueryTextSubmit(String arg0) {
        // TODO Auto-generated method stub
        return false;
      }

      @Override
      public boolean onQueryTextChange(String query) {
        // TODO Auto-generated method stub

        adapter.getFilter().filter(query);

        return false;
      }
    });

    }

    private ArrayList<Player> getPlayers()
    {
        ArrayList<Player> players=new ArrayList<Player>();
        Player p;

        for(int i=0;i<names.length;i++)
        {
            p=new Player(names[i], images[i]);
            players.add(p);
        }

        return players;
    }

}
```

### Step 4 : Our ActivityMain.xml layout

Purpose :

1. Acts as our template Layout.
2. Hold our ListView and SearchView

```xml
<RelativeLayout

    android_layout_width="match_parent"
    android_layout_height="match_parent"
    android_paddingBottom="@dimen/activity_vertical_margin"
    android_paddingLeft="@dimen/activity_horizontal_margin"
    android_paddingRight="@dimen/activity_horizontal_margin"
    android_paddingTop="@dimen/activity_vertical_margin"
    tools_context=".MainActivity" >

    <SearchView
        android_id="@+id/searchView1"
        android_layout_width="wrap_content"
        android_layout_height="wrap_content"
        android_layout_alignParentLeft="true"
        android_layout_alignParentTop="true"
        android_layout_alignRight="@+id/listView1"
        android_layout_marginLeft="14dp"
        android_queryHint="Search.." >

    </SearchView>

    <ListView
        android_id="@+id/listView1"
        android_layout_width="match_parent"
        android_layout_height="wrap_content"
        android_layout_alignParentLeft="true"
        android_layout_below="@+id/searchView1" >

    </ListView>

</RelativeLayout>
```

### Step 5: Create Our Model.xml Layout

Purpose :

1. Acts as our Row Model.Remember we want to display Listview with images and text.So its how a single row in our ListView shall appear.
2. Contains Images andText.

```xml
<?xml version="1.0" encoding="utf-8"?>
<RelativeLayout
    android_layout_width="match_parent"
    android_layout_height="match_parent" >

    <ImageView
        android_id="@+id/imageView1"
        android_layout_width="wrap_content"
        android_layout_height="wrap_content"
        android_layout_alignParentLeft="true"
        android_layout_alignParentTop="true"
        android_layout_marginLeft="40dp"
        android_layout_marginTop="44dp"
        android_src="@drawable/ic_launcher" />

    <TextView
        android_id="@+id/nameTv"
        android_layout_width="wrap_content"
        android_layout_height="wrap_content"
        android_layout_alignTop="@+id/imageView1"
        android_layout_toRightOf="@+id/imageView1"
        android_text="Name"
        android_padding="10dp"
        android_textAppearance="?android:attr/textAppearanceMedium" />

</RelativeLayout>
```

## Example 3: Android ListView – Download JSON Images Text then Search/Filter

This is an android tutorial for searching json data bound to a custom listview with images and text.

We retrieve both images and text json data and bind to a custom listview. We then search/filter these data on the client side.

This is because we are dealing with raw json without any server side processing like with php or something. However our JSON comes from online and we make a HTTP GET request to download it.

While downloading our JSON data we show an indetereminate progress bar. The downloded json data as we said contains images and text.

In fact it contains text with image urls. Then via Picasso Image Loader, the images are fetched and bound to a custom listview with cardviews.

The user can then search this data via a searchview.

Let's start.

#### We are Building a Vibrant YouTube Community

Here's this tutorial in Video Format.

<iframe width="788" height="443" src="https://www.youtube.com/embed/xNT1p9b_wks" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>

### Resources

I want to use a custom material design theme so I will start by setting up some resources:

#### Step 1: Create Colors

Colors that will color our application:

**colors.xml**

We are using a custom material design theme so first we will create some material colors.This is optional. Add these to your `colors.xml`:

```xml
<?xml version="1.0" encoding="utf-8"?>
<resources>
    <!--<color name="colorPrimary">#3F51B5</color>-->
    <!--<color name="colorPrimaryDark">#303F9F</color>-->
    <color name="colorAccent">#FF4081</color>

    <color name="colorPrimary">#f39c12</color>
    <!--<color name="colorPrimaryDark">#125688</color>-->

    <color name="colorPrimaryDark">#FFC107</color>
    <color name="textColorPrimary">#FFFFFF</color>
    <color name="windowBackground">#FFFFFF</color>
    <color name="navigationBarColor">#000000</color>
    <!--<color name="colorAccent">#c8e8ff</color>-->
</resources>
```

#### Step 2: Create Styles

**(a). styles.xml**

I am creating a custom material theme called `MyCustomMaterialTheme`.

I specify it's parent. Copy this code to your `styles.xml`. However if you don't desire the custom theme skip this part and move to layouts.

```xml
<resources>

    <!-- Base application theme. -->
    <style name="AppTheme" parent="Theme.AppCompat.Light.DarkActionBar">
        <!-- Customize your theme here. -->
        <item name="colorPrimary">@color/colorPrimary</item>
        <item name="colorPrimaryDark">@color/colorPrimaryDark</item>
        <item name="colorAccent">@color/colorAccent</item>

    </style>

    <style name="MyCustomMaterialTheme" parent="MyCustomMaterialTheme.Base">

    </style>

    <style name="MyCustomMaterialTheme.Base" parent="Theme.AppCompat.Light.DarkActionBar">
        <item name="windowNoTitle">false</item>
        <item name="windowActionBar">true</item>
        <item name="colorPrimary">@color/colorPrimary</item>
        <item name="colorPrimaryDark">@color/colorPrimaryDark</item>
        <item name="colorAccent">@color/colorAccent</item>
    </style>

</resources>
```

**(b). styles.xml(v21)**

Another skippable part. Create another XML values resource under the `res/values` folder. Name it `styles-v21`, this will target android lollipop.

Add the following code:

```xml
<resources>

    <style name="MyCustomMaterialTheme" parent="MyCustomMaterialTheme.Base">
        <item name="android:windowContentTransitions">true</item>
        <item name="android:windowAllowEnterTransitionOverlap">true</item>
        <item name="android:windowAllowReturnTransitionOverlap">true</item>
        <item name="android:windowSharedElementEnterTransition">@android:transition/move</item>
        <item name="android:windowSharedElementExitTransition">@android:transition/move</item>
    </style>
</resources>
```

#### Step 3: Add Necessary Permissions

You need to add the necessary permissions like the internet permission in your android manifest file. We also need to register our android components like the activities.

**AndroidManifest.xml**

This part is a must, add the permission for internet connectivity as we've done in your `AndroidManifest.xml`:

```xml
<?xml version="1.0" encoding="utf-8"?>
<manifest
    package="info.camposha.listviewsearchjson">

    <uses-permission android_name="android.permission.INTERNET"/>

    <application
        android_allowBackup="true"
        android_icon="@mipmap/ic_launcher"
        android_label="@string/app_name"
        android_roundIcon="@mipmap/ic_launcher_round"
        android_supportsRtl="true"
        android_theme="@style/MyCustomMaterialTheme">
        <!--android:theme="@style/AppTheme">-->
        <activity android_name=".MainActivity">
            <intent-filter>
                <action android_name="android.intent.action.MAIN" />

                <category android_name="android.intent.category.LAUNCHER" />
            </intent-filter>
        </activity>
    </application>

</manifest>
```

#### Step 4: Create Main Activity Layout

**activity_main.xml**

This layout is our Main Activity's layout file. It defines the user interface of our main activity.

We write in XML which stands for eXtensible Markup Language. In android development, user interfaces are normally created in XML. However it's also possible to create them programmatically in Java/Kotlin.

But XML is the easier yet more flexible option.

So as our root element we have a LinearLayout. LinearLayout usually arranges it's child elements in a linear manner, either vertcially or horizontally.

So you have to specify the orientation. Am ranging my widgets vertically, one on top of another.

Then I create a textView to act as my header label. I will make it bold and give it the accent color.

Below the header label I will have a SearchView, which we will use to type our queries.Please assign it an id as we will need to reference it from java code.

Below the SearchView I will have a progressbar, which will show us the progress of the download of json data.

Finally we will have a ListView which will render our json data.

```xml
<?xml version="1.0" encoding="utf-8"?>
<LinearLayout

    android_layout_width="match_parent"
    android_layout_height="match_parent"
    android_orientation="vertical"
    tools_context="info.camposha.listviewsearchjson.MainActivity">
    <TextView
        android_id="@+id/textView"
        android_layout_width="match_parent"
        android_layout_height="wrap_content"
        android_text="Spacecrafts Searcher"
        android_textAlignment="center"
        android_textStyle="bold"
        android_textAppearance="@style/TextAppearance.AppCompat.Large"
        android_textColor="@color/colorAccent" />
    <SearchView
        android_id="@+id/mySearchView"
        android_layout_width="match_parent"
        android_layout_height="wrap_content"
        android_text="Spacecrafts Searcher"
        android_padding="5dp"
        android_queryHint="Search.."
        android_textAlignment="center" />

    <ProgressBar
        android_id="@+id/myProgressBar"
        style="?android:attr/progressBarStyleHorizontal"
        android_layout_width="match_parent"
        android_layout_height="wrap_content"
        android_indeterminate="true"
        android_indeterminateBehavior="cycle"
        android_visibility="gone" />

    <ListView
        android_id="@+id/myListView"
        android_layout_weight="0.5"
        android_numColumns="auto_fit"
        android_layout_width="match_parent"
        android_layout_height="wrap_content" />
</LinearLayout>
```

#### Step 5: Create ListView Item Layout:

**model.xml**

```xml
<?xml version="1.0" encoding="utf-8"?>
<android.support.v7.widget.CardView
    android_orientation="horizontal" android_layout_width="match_parent"

    android_layout_margin="5dp"
    card_view_cardCornerRadius="10dp"
    card_view_cardElevation="5dp"
    android_layout_height="match_parent">

    <RelativeLayout
        android_layout_width="match_parent"
        android_layout_height="match_parent">
        <ImageView
            android_layout_width="150dp"
            android_layout_height="150dp"
            android_id="@+id/spacecraftImageView"
            android_padding="5dp"
            android_src="@drawable/placeholder" />

        <TextView
            android_layout_width="wrap_content"
            android_layout_height="wrap_content"
            android_textAppearance="?android:attr/textAppearanceLarge"
            android_text="Spacecraft Name"
            android_id="@+id/nameTextView"
            android_padding="5dp"
            android_textColor="@color/colorAccent"
            android_layout_alignParentTop="true"
            android_layout_toRightOf="@+id/spacecraftImageView" />

        <TextView
            android_layout_width="wrap_content"
            android_layout_height="wrap_content"
            android_textAppearance="?android:attr/textAppearanceMedium"
            android_text="Propellant"
            android_textStyle="italic"
            android_id="@+id/propellantTextView"
            android_padding="5dp"
            android_layout_alignBottom="@+id/spacecraftImageView"
            android_layout_toRightOf="@+id/spacecraftImageView" />
        <CheckBox
            android_layout_width="wrap_content"
            android_layout_height="wrap_content"
            android_id="@+id/myCheckBox"
            android_text="Tech Exists?"
            android_layout_alignParentRight="true"
            />

    </RelativeLayout>
</android.support.v7.widget.CardView>
```

Here's the json data we will use:

### Activities

#### Create Main Activity

**MainActivity.java**

```java
package info.camposha.listviewsearchjson;

import android.content.Context;
import android.support.annotation.Nullable;
import android.support.v7.app.AppCompatActivity;
import android.os.Bundle;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.BaseAdapter;
import android.widget.CheckBox;
import android.widget.Filter;
import android.widget.Filterable;
import android.widget.ListView;
import android.widget.ImageView;
import android.widget.ProgressBar;
import android.widget.SearchView;
import android.widget.Space;
import android.widget.TextView;
import android.widget.Toast;

import com.androidnetworking.AndroidNetworking;
import com.androidnetworking.common.Priority;
import com.androidnetworking.error.ANError;
import com.androidnetworking.interfaces.JSONArrayRequestListener;
import com.squareup.picasso.Picasso;

import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;

import java.util.ArrayList;

public class MainActivity extends AppCompatActivity {
    /*
    Our data object
     */
    public class Spacecraft {
        /*
        INSTANCE FIELDS
         */
        private int id;
        private String name;
        private String propellant;
        private String imageURL;
        private int technologyExists;
        /*
        GETTERS AND SETTERS
         */
        public int getId() {
            return id;
        }
        public void setId(int id) {
            this.id = id;
        }
        public String getName() {
            return name;
        }
        public void setName(String name) {
            this.name = name;
        }
        public String getPropellant() {
            return propellant;
        }
        public void setPropellant(String propellant) {
            this.propellant = propellant;
        }
        public String getImageURL() {
            return imageURL;
        }
        public void setImageURL(String imageURL) {
            this.imageURL = imageURL;
        }
        public int getTechnologyExists() {
            return technologyExists;
        }
        public void setTechnologyExists(int technologyExists) {
            this.technologyExists = technologyExists;
        }
        /*
        TOSTRING
         */
        @Override
        public String toString() {
            return name;
        }
    }
    class FilterHelper extends Filter {
        ArrayList<Spacecraft> currentList;
        ListViewAdapter adapter;
        Context c;

        public FilterHelper(ArrayList<Spacecraft> currentList, ListViewAdapter adapter,Context c) {
            this.currentList = currentList;
            this.adapter = adapter;
            this.c=c;
        }
        /*
        - Perform actual filtering.
         */
        @Override
        protected FilterResults performFiltering(CharSequence constraint) {
            FilterResults filterResults=new FilterResults();

            if(constraint != null && constraint.length()>0)
            {
                //CHANGE TO UPPER
                constraint=constraint.toString().toUpperCase();

                //HOLD FILTERS WE FIND
                ArrayList<Spacecraft> foundFilters=new ArrayList<>();

                Spacecraft spacecraft=null;

                //ITERATE CURRENT LIST
                for (int i=0;i<currentList.size();i++)
                {
                    spacecraft= currentList.get(i);

                    //SEARCH
                    if(spacecraft.getName().toUpperCase().contains(constraint) )
                    {
                        //ADD IF FOUND
                        foundFilters.add(spacecraft);
                    }
                }

                //SET RESULTS TO FILTER LIST
                filterResults.count=foundFilters.size();
                filterResults.values=foundFilters;
            }else
            {
                //NO ITEM FOUND.LIST REMAINS INTACT
                filterResults.count=currentList.size();
                filterResults.values=currentList;
            }

            //RETURN RESULTS
            return filterResults;
        }

        @Override
        protected void publishResults(CharSequence charSequence, FilterResults filterResults) {
            adapter.setSpacecrafts((ArrayList<Spacecraft>) filterResults.values);
            adapter.refresh();
        }
    }

    /*
    Our custom adapter class
     */
    public class ListViewAdapter extends BaseAdapter implements Filterable {

        Context c;
        ArrayList<Spacecraft> spacecrafts;
        public ArrayList<Spacecraft> currentList;
        FilterHelper filterHelper;

        public ListViewAdapter(Context c, ArrayList<Spacecraft> spacecrafts) {
            this.c = c;
            this.spacecrafts = spacecrafts;
            this.currentList=spacecrafts;
        }
        @Override
        public int getCount() {
            return spacecrafts.size();
        }
        @Override
        public Object getItem(int i) {
            return spacecrafts.get(i);
        }
        @Override
        public long getItemId(int i) {
            return i;
        }
        @Override
        public View getView(int i, View view, ViewGroup viewGroup) {
            if(view==null)
            {
                view= LayoutInflater.from(c).inflate(R.layout.model,viewGroup,false);
            }

            TextView txtName = view.findViewById(R.id.nameTextView);
            TextView txtPropellant = view.findViewById(R.id.propellantTextView);
            CheckBox chkTechExists = view.findViewById(R.id.myCheckBox);
            ImageView spacecraftImageView = view.findViewById(R.id.spacecraftImageView);

            final Spacecraft s= (Spacecraft) this.getItem(i);

            txtName.setText(s.getName());
            txtPropellant.setText(s.getPropellant());
            //chkTechExists.setEnabled(true);
            chkTechExists.setChecked( s.getTechnologyExists()==1);
            chkTechExists.setEnabled(false);

            if(s.getImageURL() != null && s.getImageURL().length()>0)
            {
                Picasso.get().load(s.getImageURL()).placeholder(R.drawable.placeholder).into(spacecraftImageView);
            }else {
                Toast.makeText(c, "Empty Image URL", Toast.LENGTH_LONG).show();
                Picasso.get().load(R.drawable.placeholder).into(spacecraftImageView);
            }
            view.setOnClickListener(new View.OnClickListener() {
                @Override
                public void onClick(View view) {
                    Toast.makeText(c, s.getName(), Toast.LENGTH_SHORT).show();
                }
            });

            return view;
        }
        public void setSpacecrafts(ArrayList<Spacecraft> filteredSpacecrafts)
        {
            this.spacecrafts=filteredSpacecrafts;

        }
        @Override
        public Filter getFilter() {
            if(filterHelper==null)
        {
            filterHelper=new FilterHelper(currentList,this,c);
        }

            return filterHelper;
        }
        public void refresh(){
            notifyDataSetChanged();
        }
    }

    /*
    Our HTTP Client
     */
    public class JSONDownloader {

        //SAVE/RETRIEVE URLS
        private static final String JSON_DATA_URL="https://cdn.rawgit.com/Oclemy/SampleJSON/338d9585/spacecrafts.json";
        //INSTANCE FIELDS
        private final Context c;

        public JSONDownloader(Context c) {
            this.c = c;
        }
        /*
        Fetch JSON Data
         */
        public ArrayList<Spacecraft> retrieve(final ListView mListView, final ProgressBar myProgressBar)
        {
            final ArrayList<Spacecraft> downloadedData=new ArrayList<>();
            myProgressBar.setIndeterminate(true);
            myProgressBar.setVisibility(View.VISIBLE);

            AndroidNetworking.get(JSON_DATA_URL)
                    .setPriority(Priority.HIGH)
                    .build()
                    .getAsJSONArray(new JSONArrayRequestListener() {
                        @Override
                        public void onResponse(JSONArray response) {
                            JSONObject jo;
                            Spacecraft s;
                            try
                            {
                                for(int i=0;i<response.length();i++)
                                {
                                    jo=response.getJSONObject(i);

                                    int id=jo.getInt("id");
                                    String name=jo.getString("name");
                                    String propellant=jo.getString("propellant");
                                    String techExists=jo.getString("technologyexists");
                                    String imageURL=jo.getString("imageurl");

                                    s=new Spacecraft();
                                    s.setId(id);
                                    s.setName(name);
                                    s.setPropellant(propellant);
                                    s.setImageURL(imageURL);
                                    s.setTechnologyExists(techExists.equalsIgnoreCase("1") ? 1 : 0);

                                    downloadedData.add(s);
                                }
                                myProgressBar.setVisibility(View.GONE);

                            }catch (JSONException e)
                            {
                                myProgressBar.setVisibility(View.GONE);
                                Toast.makeText(c, "GOOD RESPONSE BUT JAVA CAN'T PARSE JSON IT RECEIEVED. "+e.getMessage(), Toast.LENGTH_LONG).show();
                            }
                        }
                        //ERROR
                        @Override
                        public void onError(ANError anError) {
                            anError.printStackTrace();
                            myProgressBar.setVisibility(View.GONE);
                            Toast.makeText(c, "UNSUCCESSFUL :  ERROR IS : "+anError.getMessage(), Toast.LENGTH_LONG).show();
                        }
                    });
            return downloadedData;
        }
    }
    ArrayList<Spacecraft> spacecrafts = new ArrayList<>();
    ListView myListView;
    ListViewAdapter adapter;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);

        myListView= findViewById(R.id.myListView);
        final ProgressBar myProgressBar= findViewById(R.id.myProgressBar);
        SearchView mySearchView=findViewById(R.id.mySearchView);

        mySearchView.setIconified(true);
        mySearchView.setOnSearchClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View view) {

            }
        });
        mySearchView.setOnQueryTextListener(new SearchView.OnQueryTextListener() {
            @Override
            public boolean onQueryTextSubmit(String s) {
                adapter.getFilter().filter(s);
                return false;
            }

            @Override
            public boolean onQueryTextChange(String query) {
                adapter.getFilter().filter(query);
                return false;
            }
        });
        spacecrafts=new JSONDownloader(MainActivity.this).retrieve(myListView,myProgressBar);
        adapter=new ListViewAdapter(this,spacecrafts);
        myListView.setAdapter(adapter);

    }
}
```

Now move to next page to see how to search filter a recyclerview or a spinner.

# Concept 2: Android RecyclerView Search Filter Examples

**Concept 2: Android RecyclerView Search Filter Examples**


The significance of incorporating the search filter functionality in an app cannot be overstated. Mobile devices have smaller screen that typically show less than 5-10 items per page. If you have thousands of items in a list, imagine expecting your users to scroll through all those items looking for a single item. Hectic, yeah? So that's why we learn how to filter data in this tutorial.

## Example 1: Android Simple RecyclerView Search/Filter

_Searching and Filtering is an important task in programming as whole. It provides you a way to get what you want quickly without having to scroll through dozens,hundreds or thousands of items._

This is especially important in mobile devices which really do have a limited viewport. The mobile screen probably display only around 10 items per viewport. The other option is to make users scroll or to provide a search/filter facility.

#### Importance of Searching/Filtering for RecyclerView

| No. | Importance | Description |
| --- | --- | --- |
| 1. | User Experience | RecyclerViews are meant to display a large data set so searching/filtering mechanisms provide better user experience. |
| 2. | Efficiency | When an activity/fragment is being rendered, it's very efficient to display just a limited amount of RecyclerView items instead of pre-fetching everything at a go.This is because adapterviews normally have to go through an expensive process of inflating of layouts especially for generic views like recyclerview. |

#### 2\. Dependencies

There are no special dependencies.

#### 3\. Create User Interface

User interfaces are typically created in android using XML layouts as opposed by direct java coding.

Here are our layouts for this project:

##### (a). activity_main.xml

- This layout gets inflated to MainActivity user interface.
- It includes the content_main.xml.

```xml
<?xml version="1.0" encoding="utf-8"?>
<android.support.design.widget.CoordinatorLayout

    android_layout_width="match_parent"
    android_layout_height="match_parent"
    android_fitsSystemWindows="true"
    tools_context="com.tutorials.hp.simplerecyclerfilter.MainActivity">

    <android.support.design.widget.AppBarLayout
        android_layout_width="match_parent"
        android_layout_height="wrap_content"
        android_theme="@style/AppTheme.AppBarOverlay">

        <android.support.v7.widget.Toolbar
            android_id="@+id/toolbar"
            android_layout_width="match_parent"
            android_layout_height="?attr/actionBarSize"
            android_background="?attr/colorPrimary"
            app_popupTheme="@style/AppTheme.PopupOverlay" />

    </android.support.design.widget.AppBarLayout>

    <include layout="@layout/content_main" />

    <android.support.design.widget.FloatingActionButton
        android_id="@+id/fab"
        android_layout_width="wrap_content"
        android_layout_height="wrap_content"
        android_layout_gravity="bottom|end"
        android_layout_margin="@dimen/fab_margin"
        android_src="@android:drawable/ic_dialog_email" />

</android.support.design.widget.CoordinatorLayout>
```

##### (b). content_main.xml

This layout gets included in your activity_main.xml. You define your UI widgets right here.

In this case we use a SearchView and a RecyclerView so lets add them:

```xml
<?xml version="1.0" encoding="utf-8"?>
<RelativeLayout

    android_layout_width="match_parent"
    android_layout_height="match_parent"
    android_paddingBottom="@dimen/activity_vertical_margin"
    android_paddingLeft="@dimen/activity_horizontal_margin"
    android_paddingRight="@dimen/activity_horizontal_margin"
    android_paddingTop="@dimen/activity_vertical_margin"
    app_layout_behavior="@string/appbar_scrolling_view_behavior"
    tools_context="com.tutorials.hp.simplerecyclerfilter.MainActivity"
    tools_showIn="@layout/activity_main">
<LinearLayout
    android_layout_width="match_parent"
    android_orientation="vertical"
    android_layout_height="match_parent">

    <android.support.v7.widget.SearchView
        android_id="@+id/mSearch"
        android_layout_width="match_parent"
        android_layout_height="50dp"
        android_queryHint="Search.."

        ></android.support.v7.widget.SearchView>

    <android.support.v7.widget.RecyclerView
        android_id="@+id/myRecycler"
        android_layout_width="wrap_content"
        android_layout_below="@+id/mSearch"
        android_layout_height="wrap_content"
        class="android.support.v7.widget.RecyclerView" />

</LinearLayout>

</RelativeLayout>
```

##### 3\. model.xml

This is the recyclerview view items layout model. In other words the custom layout from which our recyclerview rows will be inflated.

In this case our RecyclerView items will comprise cardviews.

Our RecyclerView CardViews will comprise images and texts:

```xml
<?xml version="1.0" encoding="utf-8"?>
<android.support.v7.widget.CardView
    android_orientation="horizontal" android_layout_width="match_parent"

    android_layout_margin="5dp"
    card_view_cardCornerRadius="10dp"
    card_view_cardElevation="5dp"

    android_layout_height="match_parent">

    <RelativeLayout
        android_layout_width="match_parent"
        android_layout_height="match_parent">

        <ImageView
            android_layout_width="wrap_content"
            android_layout_height="wrap_content"
            android_id="@+id/playerImage"
            android_padding="10dp"
            android_src="@drawable/herera" />

        <TextView
            android_layout_width="wrap_content"
            android_layout_height="wrap_content"
            android_textAppearance="?android:attr/textAppearanceLarge"
            android_text="Name"
            android_id="@+id/nameTxt"
            android_padding="10dp"
            android_layout_alignParentTop="true"
            android_layout_toRightOf="@+id/playerImage" />

        <TextView
            android_layout_width="wrap_content"
            android_layout_height="wrap_content"
            android_textAppearance="?android:attr/textAppearanceMedium"
            android_text="Position"
            android_id="@+id/posTxt"
            android_padding="10dp"
            android_layout_alignBottom="@+id/playerImage"
            android_layout_alignParentRight="true" />

    </RelativeLayout>
</android.support.v7.widget.CardView>
```

#### 4\. Java Classes

Let's proceed on now and write some java code.

##### (a). ItemClickListener.java Interface

This is an interface to define for us a simple method signature that will be implemented to handle itemclicks.

```java
package com.tutorials.hp.simplerecyclerfilter;

import android.view.View;

public interface ItemClickListener {

    void onItemClick(View v,int pos);
}
```

##### (b). MyHolder.java class

This class in our RecyclerView.ViewHolder class.

It derives from `android.support.v7.widget.RecyclerView.View` thus forcing us to create a constructor `public MyHolder(View itemView)` that takes a View object as a parameter and pass it over the base clas by a call to `super(itemView)`.

| Here are the roles of this class | No. | Role |
| --- | --- | --- |
| 1. | Hold a View object already inflated from XML layout for recycling. This avoids re-inflation of the same layout which is an expensive process. Thus this improves the performance of list items rendering for recyclerview. The inflated View is received via the constructor |
| 2. | Searches for individual widgets by their id from the inflated View and defines instance fields them. This ensures that those widgets can easily be retrieved as instance fields and their values set especially inside our RecyclerView.Adapter sub-class. |
| 3. | Can also be used implement onClick event listener which can be handled by other classes especially the adapter class. |

```java
package com.tutorials.hp.simplerecyclerfilter;

import android.support.v7.widget.RecyclerView;
import android.view.View;
import android.widget.TextView;

public class MyHolder extends RecyclerView.ViewHolder implements View.OnClickListener{

    TextView nameTxt;
    ItemClickListener itemClickListener;

    public MyHolder(View itemView) {
        super(itemView);

        nameTxt= (TextView) itemView.findViewById(R.id.nameTxt);
        itemView.setOnClickListener(this);
    }

    @Override
    public void onClick(View v) {
        this.itemClickListener.onItemClick(v,getLayoutPosition());
    }

    public void setItemClickListener(ItemClickListener ic)
    {
        this.itemClickListener=ic;
    }
}
```

##### (c). MyAdapter.java

This is our RecyclerView.Adapter class.

It derives from `android.support.v7.widget.RecyclerView.Adapter<RecyclerView.ViewHolder myHolder>` class.

Deriving from Recylcerview.Adapter will force us to either make our adapter class abstract or go ahead and override a couple of methods. We choose the latter, overriding `onCreateViewHolder(ViewGroup parent, int viewType)` and `onBindViewHolder(MyHolder holder, final int position)`.

This class will adapt our data set to our RecyclerView which we use an adapterview adapterview.

Here are the main responsibilities of this class:

| No. | Responsibility |
| --- | --- |
| 1. | This class will be responsible for inflating our custom model layout to a View object to be used as our RecyclerView itemView. |
| 2. | A RecyclerView.ViewHolder instance will then be created with the View object passed to it. All these we do inside the `onCreateVewHolder()` method. |
| 3. | We'll then bind data to our view widgets inside the `onBindViewHolder()`. |
| 4. | Handling of click events for our inflated View item. |
| 5. | Returning the total item Count to be used when rendering our view items. |

Furthermore we really need to make our recyclerview adapter searchable.

So we need to implement the `android.widget.Filter.Filterable` interface:

```java
public class MyAdapter extends RecyclerView.Adapter<MyHolder> implements Filterable{}
```

We'll then create an inner class inside the `MyAdapter.java` class and make it derive from `android.widget.Filter` class:

```java
    class CustomFilter extends Filter {}
```

We then override two methods to help us in filtering searching.

In the first we performs filtering:

```java
        protected FilterResults performFiltering(CharSequence constraint) {...}
```

while in the second we publish a result:

```java
        protected void publishResults(CharSequence constraint, FilterResults results) {..}
```

Here's the code:

```java
package com.tutorials.hp.simplerecyclerfilter;

import android.content.Context;
import android.support.v7.widget.RecyclerView;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.Filter;
import android.widget.Filterable;
import android.widget.Toast;

import java.util.ArrayList;

public class MyAdapter extends RecyclerView.Adapter<MyHolder> implements Filterable{
    Context c;
    ArrayList<String> players;
    ArrayList<String> filterList;
    CustomFilter filter;

    public MyAdapter(Context ctx,ArrayList<String> names)
    {
        this.c=ctx;
        this.players=names;
        this.filterList=players;
    }

    @Override
    public MyHolder onCreateViewHolder(ViewGroup parent, int viewType) {
        View v= LayoutInflater.from(parent.getContext()).inflate(R.layout.model,null);
        MyHolder holder=new MyHolder(v);
        return holder;
    }

    @Override
    public void onBindViewHolder(MyHolder holder, final int position) {
        holder.nameTxt.setText(players.get(position));

        holder.setItemClickListener(new ItemClickListener() {
            @Override
            public void onItemClick(View v, int pos) {
                Toast.makeText(c,players.get(pos),Toast.LENGTH_LONG).show();
            }
        });
    }

    @Override
    public int getItemCount() {
        return players.size();
    }

    @Override
    public Filter getFilter() {
        if(filter==null)
        {
            filter=new CustomFilter();
        }
        return filter;
    }
    class CustomFilter extends Filter {

        @Override
        protected FilterResults performFiltering(CharSequence constraint) {
            FilterResults results=new FilterResults();

            if(constraint != null && constraint.length()>0)
            {
                constraint=constraint.toString().toUpperCase();
                ArrayList<String> filters=new ArrayList<>();

                for(int i=0;i<filterList.size();i++)
                {
                    if(filterList.get(i).toUpperCase().contains(constraint))
                    {
                        filters.add(filterList.get(i));
                    }
                }

                results.count=filters.size();
                results.values=filters;
            }else
            {
                results.count=filterList.size();
                results.values=filterList;
            }

            return results;
        }

        @Override
        protected void publishResults(CharSequence constraint, FilterResults results) {
            players= (ArrayList<String>) results.values;
            notifyDataSetChanged();
        }
    }
}
```

#### Our Activity

##### (a). MainActivity.java

This is our MainActivity.

Here are the roles it performs for us:

| No. | Role |
| --- | --- |
| 1. | It is our Activity class hence is responsible for rendering our Views. In this case our SearchView and RecyclerView. |
| 2. | It defines an array that acts as our data source. |
| 3. | It references our Views : SearchView and RecyclerView from our xml layout specifications. |
| 4. | It instantiates our MyAdapter class and sets it to our RecyclerView. |
| 5. | It sets queryTextListener to our searchview and listens to text change events, therefore invoking the `getFilter()` of our MyAdapter class. |

```java
public class MainActivity extends AppCompatActivity {

    String[] names={"Ander Herera","David De Gea","Michael Carrick","Juan Mata","Diego Costa","Oscar"};
    String[] positions={"Midfielder","GoalKeeper", "Midfielder","Playmaker","Striker","Playmaker"};
    int[] images={R.drawable.herera,R.drawable.degea,R.drawable.carrick,R.drawable.mata,R.drawable.costa,R.drawable.oscar};

    SearchView sv;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);
        Toolbar toolbar = (Toolbar) findViewById(R.id.toolbar);
        setSupportActionBar(toolbar);

        FloatingActionButton fab = (FloatingActionButton) findViewById(R.id.fab);
        fab.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View view) {
                Snackbar.make(view, "Replace with your own action", Snackbar.LENGTH_LONG)
                        .setAction("Action", null).show();
            }
        });

        sv= (SearchView) findViewById(R.id.mSearch);

        RecyclerView rv= (RecyclerView) findViewById(R.id.myRecycler);
        rv.setLayoutManager(new LinearLayoutManager(this));

        final MyAdapter adapter=new MyAdapter(this,getPlayers());
        rv.setAdapter(adapter);

        sv.setOnQueryTextListener(new SearchView.OnQueryTextListener() {
            @Override
            public boolean onQueryTextSubmit(String query) {
                return false;
            }

            @Override
            public boolean onQueryTextChange(String query) {
                adapter.getFilter().filter(query);
                return false;
            }
        });
    }

     private ArrayList<String> getPlayers()
     {
         ArrayList<String> players=new ArrayList<>();
         for(String player : names)
         {
             players.add(player);
         }

         return players;
     }
}
```

## Example 2: RecyclerView Search/Filter and ItemClick

_Android RecyclerView Search/Filter and OnClick Tutorial and Example._

This is an android tutorial to explore how to search or filter a recyclerview with images and text.

The RecyclerView will comprise CardViews so it is the CardViews that we will be filtering.

We use SearchView to input our search terms thus allowing us search in realtime.

#### Intro

Here is the thing :

- RecyclerView with Custom CardViews.
- CardViews are our viewItems and consist of images and text.
- We can search/filter the custom recyclerview from a searchview.
- Then we handle itemclicks of searched/filtered items getting their appropriate positions.

#### Tools Used

- IDE : Android Studio
- Language: Java
- OS : Windows 8

#### Create User Interface

Here are our layouts for this project:

##### (a). activity_main.xml

- This layout gets inflated to MainActivity user interface.
- It includes the content_main.xml.

```xml
<?xml version="1.0" encoding="utf-8"?>
<android.support.design.widget.CoordinatorLayout

    android_layout_width="match_parent"
    android_layout_height="match_parent"
    android_fitsSystemWindows="true"
    tools_context="com.tutorials.hp.customrecyclerfiltering.MainActivity">

    <android.support.design.widget.AppBarLayout
        android_layout_width="match_parent"
        android_layout_height="wrap_content"
        android_theme="@style/AppTheme.AppBarOverlay">

        <android.support.v7.widget.Toolbar
            android_id="@+id/toolbar"
            android_layout_width="match_parent"
            android_layout_height="?attr/actionBarSize"
            android_background="?attr/colorPrimary"
            app_popupTheme="@style/AppTheme.PopupOverlay" />

    </android.support.design.widget.AppBarLayout>

    <include layout="@layout/content_main" />

    <android.support.design.widget.FloatingActionButton
        android_id="@+id/fab"
        android_layout_width="wrap_content"
        android_layout_height="wrap_content"
        android_layout_gravity="bottom|end"
        android_layout_margin="@dimen/fab_margin"
        android_src="@android:drawable/ic_dialog_email" />

</android.support.design.widget.CoordinatorLayout>
```

##### (b). content_main.xml

This layout gets included in your activity_main.xml. We add our SearchView on to of our RecyclerView here.

The SearchView will be used to Filter the RecyclerView.

```xml
<?xml version="1.0" encoding="utf-8"?>
<RelativeLayout

    android_layout_width="match_parent"
    android_layout_height="match_parent"
    android_paddingBottom="@dimen/activity_vertical_margin"
    android_paddingLeft="@dimen/activity_horizontal_margin"
    android_paddingRight="@dimen/activity_horizontal_margin"
    android_paddingTop="@dimen/activity_vertical_margin"
    app_layout_behavior="@string/appbar_scrolling_view_behavior"
    tools_context="com.tutorials.hp.customrecyclerfiltering.MainActivity"
    tools_showIn="@layout/activity_main">

    <LinearLayout
        android_layout_width="match_parent"
        android_orientation="vertical"
        android_layout_height="match_parent">

        <android.support.v7.widget.SearchView
            android_id="@+id/mSearch"
            android_layout_width="match_parent"
            android_layout_height="50dp"
            app_defaultQueryHint="Search.."
            ></android.support.v7.widget.SearchView>

        <android.support.v7.widget.RecyclerView
            android_id="@+id/myRecycler"
            android_layout_width="wrap_content"
            android_layout_below="@+id/mSearch"
            android_layout_height="wrap_content"
            class="android.support.v7.widget.RecyclerView" />

    </LinearLayout>
</RelativeLayout>
```

##### (c). model.xml

This is a CardView with various widgets. This layout will represent a single item in our RecyclerView:

```xml
<?xml version="1.0" encoding="utf-8"?>
<android.support.v7.widget.CardView
    android_orientation="horizontal" android_layout_width="match_parent"

    android_layout_margin="5dp"
    card_view_cardCornerRadius="10dp"
    card_view_cardElevation="5dp"

    android_layout_height="match_parent">

    <RelativeLayout
        android_layout_width="match_parent"
        android_layout_height="match_parent">

        <ImageView
            android_layout_width="wrap_content"
            android_layout_height="wrap_content"
            android_id="@+id/playerImage"
            android_padding="10dp"
            android_src="@drawable/herera" />

        <TextView
            android_layout_width="wrap_content"
            android_layout_height="wrap_content"
            android_textAppearance="?android:attr/textAppearanceLarge"
            android_text="Name"
            android_id="@+id/nameTxt"
            android_padding="10dp"
            android_layout_alignParentTop="true"
            android_layout_toRightOf="@+id/playerImage" />

        <TextView
            android_layout_width="wrap_content"
            android_layout_height="wrap_content"
            android_textAppearance="?android:attr/textAppearanceMedium"
            android_text="Position"
            android_id="@+id/posTxt"
            android_padding="10dp"
            android_layout_alignBottom="@+id/playerImage"
            android_layout_alignParentRight="true" />

    </RelativeLayout>
</android.support.v7.widget.CardView>
```

#### 4\. Data Object(Player.java)

- This is our POJO, Plain Old Java Object. It defines each player, that is his name, playing position and image.

```java
package com.tutorials.hp.customrecyclerfiltering;

public class Player {

    private String name;
    private String pos;
    private int img;

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getPos() {
        return pos;
    }

    public void setPos(String pos) {
        this.pos = pos;
    }

    public int getImg() {
        return img;
    }

    public void setImg(int img) {
        this.img = img;
    }
}
```

#### 5\. ItemClickListener

- Our ItemClickListener interface.
- Signature for our itemClick events. We'll be handling click events for our RecyclerView.
- The onItemClick event will take a view object and its position.

```java
package com.tutorials.hp.customrecyclerfiltering;

import android.view.View;

public interface ItemClickListener {

    void onItemClick(View v,int pos);

}
```

#### 6\. MyHolder.java

This is a ViewHolder class.

It will hold our inflated `model.xml` as a view object for recycling. This View will be used by the `MyAdapter` class.

- Holds our imageviews and textviews for recycling.
- We have two textviews and one imageview.

```java
public class MyHolder extends RecyclerView.ViewHolder implements View.OnClickListener {

    //OUR VIEWS
    ImageView img;
    TextView nameTxt,posTxt;

    ItemClickListener itemClickListener;

    public MyHolder(View itemView) {
        super(itemView);

        this.img= (ImageView) itemView.findViewById(R.id.playerImage);
        this.nameTxt= (TextView) itemView.findViewById(R.id.nameTxt);
        this.posTxt= (TextView) itemView.findViewById(R.id.posTxt);

        itemView.setOnClickListener(this);
    }

    @Override
    public void onClick(View v) {
        this.itemClickListener.onItemClick(v,getLayoutPosition());

    }

    public void setItemClickListener(ItemClickListener ic)
    {
        this.itemClickListener=ic;
    }
}
```

#### 7\. MyAdapter.java

This is our RecyclerView.Adapter class.

This class will first inflate our `model.xml` and bind data to the resultant view.

This class will also implement the `android.widget.Filterable` interface.

- Our adapter class.
- Subclasses RecyclerView.Adapter
- Inflates Model layout
- Binds data to our views.
- Implements Filterable Interface

```java
public class MyAdapter extends RecyclerView.Adapter<MyHolder> implements Filterable{

    Context c;
    ArrayList<Player> players,filterList;
    CustomFilter filter;

    public MyAdapter(Context ctx,ArrayList<Player> players)
    {
        this.c=ctx;
        this.players=players;
        this.filterList=players;
    }

    @Override
    public MyHolder onCreateViewHolder(ViewGroup parent, int viewType) {
        //CONVERT XML TO VIEW ONBJ
        View v= LayoutInflater.from(parent.getContext()).inflate(R.layout.model,null);

        //HOLDER
        MyHolder holder=new MyHolder(v);

        return holder;
    }

    //DATA BOUND TO VIEWS
    @Override
    public void onBindViewHolder(MyHolder holder, int position) {

        //BIND DATA
        holder.posTxt.setText(players.get(position).getPos());
        holder.nameTxt.setText(players.get(position).getName());
        holder.img.setImageResource(players.get(position).getImg());

        //IMPLEMENT CLICK LISTENET
        holder.setItemClickListener(new ItemClickListener() {
            @Override
            public void onItemClick(View v, int pos) {
                Snackbar.make(v,players.get(pos).getName(),Snackbar.LENGTH_SHORT).show();
            }
        });

    }

    //GET TOTAL NUM OF PLAYERS
    @Override
    public int getItemCount() {
        return players.size();
    }

    //RETURN FILTER OBJ
    @Override
    public Filter getFilter() {
        if(filter==null)
        {
            filter=new CustomFilter(filterList,this);
        }

        return filter;
    }
}
```

#### 8\. CustomFilter.java

This is the class that will search our data.

- Our `CustomFilter` class.
- Performs our filtering of data.
- Subclass `android.widget.Filter` class

```java
public class CustomFilter extends Filter{

    MyAdapter adapter;
    ArrayList<Player> filterList;

    public CustomFilter(ArrayList<Player> filterList,MyAdapter adapter)
    {
        this.adapter=adapter;
        this.filterList=filterList;

    }

    //FILTERING OCURS
    @Override
    protected FilterResults performFiltering(CharSequence constraint) {
        FilterResults results=new FilterResults();

        //CHECK CONSTRAINT VALIDITY
        if(constraint != null && constraint.length() > 0)
        {
            //CHANGE TO UPPER
            constraint=constraint.toString().toUpperCase();
            //STORE OUR FILTERED PLAYERS
            ArrayList<Player> filteredPlayers=new ArrayList<>();

            for (int i=0;i<filterList.size();i++)
            {
                //CHECK
                if(filterList.get(i).getName().toUpperCase().contains(constraint))
                {
                    //ADD PLAYER TO FILTERED PLAYERS
                    filteredPlayers.add(filterList.get(i));
                }
            }

            results.count=filteredPlayers.size();
            results.values=filteredPlayers;
        }else
        {
            results.count=filterList.size();
            results.values=filterList;

        }

        return results;
    }

    @Override
    protected void publishResults(CharSequence constraint, FilterResults results) {

       adapter.players= (ArrayList<Player>) results.values;

        //REFRESH
        adapter.notifyDataSetChanged();
    }
}
```

#### 9\. MainActivity.java

- Our `MainActivity` class.
- Is our Launcher [activity](https://camposha.info/android/activity).
- Generates and passes dummy data to our adapter.
- Contains searchview where we handle onquerytextchange event.

```java
public class MainActivity extends AppCompatActivity {

   SearchView sv;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);
        Toolbar toolbar = (Toolbar) findViewById(R.id.toolbar);
        setSupportActionBar(toolbar);

        FloatingActionButton fab = (FloatingActionButton) findViewById(R.id.fab);
        fab.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View view) {
                Snackbar.make(view, "Replace with your own action", Snackbar.LENGTH_LONG)
                        .setAction("Action", null).show();
            }
        });

        sv= (SearchView) findViewById(R.id.mSearch);
        RecyclerView rv= (RecyclerView) findViewById(R.id.myRecycler);

        //SET ITS PROPETRIES
        rv.setLayoutManager(new LinearLayoutManager(this));
        rv.setItemAnimator(new DefaultItemAnimator());

        //ADAPTER
        final MyAdapter adapter=new MyAdapter(this,getPlayers());
        rv.setAdapter(adapter);

        //SEARCH
        sv.setOnQueryTextListener(new SearchView.OnQueryTextListener() {
            @Override
            public boolean onQueryTextSubmit(String query) {
                return false;
            }

            @Override
            public boolean onQueryTextChange(String query) {
                //FILTER AS YOU TYPE
                adapter.getFilter().filter(query);
                return false;
            }
        });

    }

    //ADD PLAYERS TO ARRAYLIST
    private ArrayList<Player> getPlayers()
    {
        ArrayList<Player> players=new ArrayList<>();
        Player p=new Player();
        p.setName("Ander Herera");
        p.setPos("Midfielder");
        p.setImg(R.drawable.herera);
        players.add(p);

        p=new Player();
        p.setName("David De Geaa");
        p.setPos("Goalkeeper");
        p.setImg(R.drawable.degea);
        players.add(p);

        p=new Player();
        p.setName("Michael Carrick");
        p.setPos("Midfielder");
        p.setImg(R.drawable.carrick);
        players.add(p);

        p=new Player();
        p.setName("Juan Mata");
        p.setPos("Playmaker");
        p.setImg(R.drawable.mata);
        players.add(p);

        p=new Player();
        p.setName("Diego Costa");
        p.setPos("Striker");
        p.setImg(R.drawable.costa);
        players.add(p);

        p=new Player();
        p.setName("Oscar");
        p.setPos("Playmaker");
        p.setImg(R.drawable.oscar);
        players.add(p);

        return players;
    }

}
```

#### How to

- Download the project above.
- You'll get a zipped file,extract it.
- Open the Android Studio.
- Now close, any already opened project
- From the Menu bar click on File >New> Import Project
- Now Choose a Destination Folder, from where you want to import project.
- Choose an Android Project.
- Now Click on “OK“.
- Done, your done importing the project,now edit it.

#### More Resources

| Resource | Link |
| --- | --- |
| GitHub Browse | [Browse](https://github.com/Oclemy/CustomRecyclerViewFiltering) |
| GitHub Download Link | [Download](https://github.com/Oclemy/CustomRecyclerViewFiltering/archive/master.zip) |

Now move to the next page to learn how to filter a spinner.

# Concpet 3: Kotlin Android Search Filter Spinner Examples

**Concpet 3: Kotlin Android Search Filter Spinner Examples**


> Step by Step Android Searchable Spinner Examples in both Kotlin and Java

In this piece we want to look at how to search or filter a spinner. We specifically will look at some libraries that easen this for us so that we don’t have to roll it out on our own.

## Example 1: Kotlin Android Searchable Spinner

This spinner allows you to search filter items contained in a spinner by utilizing a dialog with a searchview. Then the searched item will be rendered on the spinner.

Here is a demo of the what is created:

![Kotlin Android searchable spinner](https://github.com/DonMat/SearchableSpinner/raw/master/demo.gif?raw=true)

### Step 1: Add Dependency

First add `jitpack` in your root build.gradle at the end of repositories:

```groovy
    allprojects {
        repositories {
        ...
        maven { url "https://jitpack.io" }
        }
    }
```

Then add the dependency in the module `build.gradle`:

```groovy
    dependencies {
        implementation 'com.github.DonMat:searchablespinner:v1.0.1'
    }
```

### Step 2: Add to Layout

Now add the spinner to your xml layout:

```xml
    <pl.utkala.searchablespinner.SearchableSpinner
            android:layout_width="wrap_content"
            android:layout_height="wrap_content"

            app:closeText="Zamknij"
            app:dialogTitle="Wybierz z listy"/>
```

Here is the full layout:

**activity_main.xml**

Place a spinner below a textview inside a `LinearLayout` as follows:

```xml
<?xml version="1.0" encoding="utf-8"?>
<LinearLayout xmlns:android="http://schemas.android.com/apk/res/android"
    xmlns:app="http://schemas.android.com/apk/res-auto"
    xmlns:tools="http://schemas.android.com/tools"
    android:layout_width="match_parent"
    android:layout_height="match_parent"
    android:orientation="vertical"
    tools:context=".MainActivity">

    <TextView
        android:id="@+id/textView"
        android:layout_width="wrap_content"
        android:layout_height="wrap_content"
        android:layout_margin="16dp"
        android:layout_gravity="center_horizontal"
        android:text="@string/app_name" />

    <pl.utkala.searchablespinner.SearchableSpinner
        android:id="@+id/searchableSpinner"
        android:layout_width="wrap_content"
        android:layout_height="wrap_content"
        android:layout_margin="16dp"
        android:layout_gravity="center_horizontal"

        app:closeText="@string/search_dialog_close"
        app:dialogTitle="@string/search_dialog_title" />

</LinearLayout>
```

### Step 3: Write Kotlin Code

Create your main activity by extending the `AppCompatActivity`:

```kotlin
class MainActivity : AppCompatActivity()
    //...
```

Now Override the activity's `onCreate()` method:

```kotlin
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_main)
```

Create a list of users:

```kotlin
        val users = listOf("Veniam penatibus", "reprehenderit", "fusce", "Ullamcorper lacinia", "Etiam dis")
```

Bind data to the SearchabeSpinner using an ArrayAdapter:

```kotlin
        searchableSpinner.adapter = ArrayAdapter<String>(this, android.R.layout.simple_spinner_dropdown_item, users)
```

Here's the full code:

**MainActivity.kt**

```kotlin
class MainActivity : AppCompatActivity() {

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_main)

        val users = listOf("Veniam penatibus", "reprehenderit", "fusce", "Ullamcorper lacinia", "Etiam dis")
        searchableSpinner.adapter = ArrayAdapter<String>(this, android.R.layout.simple_spinner_dropdown_item, users)
    }
}
```

### Run

Finally run the project in android studio. Scroll above to see the demo screenshot.

### Reference

Download the code below:

| Number | Link |
| --- | --- |
| 1. | [Download code](https://downgit.github.io/#/home?url=https://github.com/DonMat/SearchableSpinner/tree/master/app) |
| 2. | [Follow code author](https://github.com/DonMat/) |

## Example 2: Android SearchableSpinner

> Android SearchableSpinner Library Tutorial and Example.

What about if you have a spinner with plenty of items and you want to provide users with ability to search or filter those items.

What do you do then?

Well you have a solution is SearchableSpinner by [@michaelprimez](https://github.com/michaelprimez) in SearcableSpinner.

#### Demo

Here’s SearchableSpinner in action. The source for this is found in the example below.

![Android Searchable Spinner](https://github.com/michaelprimez/searchablespinner/raw/master/searchablespinner.gif)

#### Installation

You can fetch SearchableSpinner via gradle. All you need do is add the following in your app level build.gradle and sync your project:

```groovy
implementation 'gr.escsoft.michaelprimez.searchablespinner:SearchableSpinner:1.0.9'
```

#### How to Use

To use SearchableSpinner first go over to your layout where you want to add it and add the following:

```xml
<gr.escsoft.michaelprimez.searchablespinner.SearchableSpinner
        android_id="@+id/SearchableSpinner"
        android_layout_width="wrap_content"
        android_layout_height="wrap_content"
        android_layout_marginTop="24dp"
        android_layout_marginLeft="24dp"
        android_layout_marginRight="24dp"
        android_layout_marginStart="24dp"
        android_layout_marginEnd="24dp"
        android_gravity="center_horizontal"
        app_StartSearchTintColor="@android:color/white"
        app_DoneSearchTintColor="@android:color/holo_purple"
        app_RevealViewBackgroundColor="@android:color/holo_purple"
        app_SearchViewBackgroundColor="@android:color/secondary_text_dark"
        app_ShowBorders="false"
        app_RevealEmptyText="Touch to select"
        app_SpinnerExpandHeight="300dp"/>
```

For java usage continue over to full example section.

#### Full Searchable Spinner Example

#### Gradle Scripts

Here are our gradle scripts in our build.gradle file(s).

##### (a). build.gradle(app)

Here’s our **app level** `build.gradle` file. We have the dependencies DSL where we add our dependencies.

This file is called app level `build.gradle` since it’s located in the app folder of the project.

If you are using Android Studio version 3 and above use `implementation` keyword while if you are using a version less than 3 then still use the `compile` keyword.

Once you’ve modified this `build.gradle` file you have to sync your project. Android Studio will indeed prompt you to do so.

```groovy
implementation 'gr.escsoft.michaelprimez.searchablespinner:SearchableSpinner:1.0.9'
```

#### Resources.

[Android](https://camposha.info/android/introduction) platform provides a powerful and flexible way of adding static content as a resource.

These static content will also be packaged into the APK file. The static content will be stored either as a resource or as an asset.

Resources belong to a given type. These types can be:

1. Drawable.
2. Layout.
3. Value.

Let’s start by looking at the layout resources

##### (a). activity_main.xml

This layout will get inflated into the main activity’s user interface. This will happen via the Activity’s `setContentView()` method which will require us to pass it the layout.

We will do so inside the `onCreate()` method of [Activity](https://camposha.info/android/activity).

```xml
<?xml version="1.0" encoding="utf-8"?>
<android.support.design.widget.CoordinatorLayout

    android_layout_width="match_parent"
    android_layout_height="match_parent"
    tools_context="gr.escsoft.michaelprimez.searchablespinnerexamples.MainActivity">

    <android.support.design.widget.AppBarLayout
        android_layout_width="match_parent"
        android_layout_height="wrap_content"
        android_theme="@style/AppTheme.AppBarOverlay">

        <android.support.v7.widget.Toolbar
            android_id="@+id/toolbar"
            android_layout_width="match_parent"
            android_layout_height="?attr/actionBarSize"
            android_background="?attr/colorPrimary"
            app_popupTheme="@style/AppTheme.PopupOverlay"/>

    </android.support.design.widget.AppBarLayout>

    <include layout="@layout/content_main"/>

</android.support.design.widget.CoordinatorLayout>
```

##### (b). content_main.xml

```xml
<?xml version="1.0" encoding="utf-8"?>
<LinearLayout

    android_id="@+id/content_main"
    android_layout_width="match_parent"
    android_layout_height="match_parent"
    android_orientation="vertical"
    app_layout_behavior="@string/appbar_scrolling_view_behavior"
    tools_context="gr.escsoft.michaelprimez.searchablespinnerexamples.MainActivity"
    tools_showIn="@layout/activity_main">

    <gr.escsoft.michaelprimez.searchablespinner.SearchableSpinner
        android_id="@+id/SearchableSpinner"
        android_layout_width="wrap_content"
        android_layout_height="wrap_content"
        android_layout_marginTop="24dp"
        android_layout_marginLeft="24dp"
        android_layout_marginRight="24dp"
        android_layout_marginStart="24dp"
        android_layout_marginEnd="24dp"
        android_gravity="center_horizontal"
        app_ShowBorders="true"
        app_BordersSize="1dp"
        app_RevealEmptyText="Touch to select"
        app_BoarderColor="@color/colorPrimary"
        app_SpinnerExpandHeight="250dp"/>

    <gr.escsoft.michaelprimez.searchablespinner.SearchableSpinner
        android_id="@+id/SearchableSpinner1"
        android_layout_width="wrap_content"
        android_layout_height="wrap_content"
        android_layout_marginTop="24dp"
        android_layout_marginLeft="24dp"
        android_layout_marginRight="24dp"
        android_layout_marginStart="24dp"
        android_layout_marginEnd="24dp"
        android_gravity="center_horizontal"
        app_StartSearchTintColor="@android:color/white"
        app_DoneSearchTintColor="@android:color/white"
        app_RevealViewBackgroundColor="@android:color/holo_blue_light"
        app_SearchViewBackgroundColor="@android:color/holo_blue_light"
        app_ShowBorders="true"
        app_BordersSize="1dp"
        app_BoarderColor="@android:color/holo_blue_light"
        app_SpinnerExpandHeight="0dp"/>

    <gr.escsoft.michaelprimez.searchablespinner.SearchableSpinner
        android_id="@+id/SearchableSpinner2"
        android_layout_width="wrap_content"
        android_layout_height="wrap_content"
        android_layout_marginTop="24dp"
        android_layout_marginLeft="24dp"
        android_layout_marginRight="24dp"
        android_layout_marginStart="24dp"
        android_layout_marginEnd="24dp"
        android_gravity="center_horizontal"
        app_StartSearchTintColor="@android:color/white"
        app_DoneSearchTintColor="@android:color/holo_purple"
        app_RevealViewBackgroundColor="@android:color/holo_purple"
        app_SearchViewBackgroundColor="@android:color/secondary_text_dark"
        app_ShowBorders="true"
        app_RevealEmptyText="Touch to select"
        app_SpinnerExpandHeight="300dp"
        app_ItemsDivider="@color/gray_400"
        app_DividerHeight="0.5dp"/>

    <gr.escsoft.michaelprimez.searchablespinner.SearchableSpinner
        android_id="@+id/SearchableSpinner3"
        android_layout_width="wrap_content"
        android_layout_height="wrap_content"
        android_layout_marginTop="24dp"
        android_layout_marginLeft="24dp"
        android_layout_marginRight="24dp"
        android_layout_marginStart="24dp"
        android_layout_marginEnd="24dp"
        android_gravity="center_horizontal"
        app_StartSearchTintColor="@android:color/white"
        app_DoneSearchTintColor="@android:color/holo_purple"
        app_RevealViewBackgroundColor="@android:color/holo_purple"
        app_SearchViewBackgroundColor="@android:color/secondary_text_dark"
        app_ShowBorders="false"
        app_BordersSize="4dp"
        app_RevealEmptyText="Touch to select"
        app_SpinnerExpandHeight="300dp"
        app_ItemsDivider="@color/gray_400"
        app_DividerHeight="0.5dp"/>

</LinearLayout>
```

##### (c). view_list_item.xml

```xml
?xml version="1.0" encoding="utf-8"?>
<LinearLayout

              android_layout_width="wrap_content"
              android_layout_height="wrap_content"
              android_paddingTop="4dp"
              android_paddingBottom="4dp"
              android_paddingRight="4dp"
              android_paddingLeft="8dp"
              android_orientation="horizontal"
              app_layout_collapseMode="parallax"
              app_layout_collapseParallaxMultiplier="0.5">

    <ImageView
        android_id="@+id/ImgVw_Letters"
        android_layout_width="32dp"
        android_layout_height="32dp"/>

    <TextView
        android_id="@+id/TxtVw_DisplayName"
        android_layout_width="wrap_content"
        android_layout_height="wrap_content"
        android_layout_marginLeft="8dp"
        android_layout_gravity="center_vertical"/>

</LinearLayout>
```

##### (d). view_no_selection_item.xml

```xml
<?xml version="1.0" encoding="utf-8"?>
<LinearLayout

              android_layout_width="wrap_content"
              android_layout_height="wrap_content"
              android_paddingTop="8dp"
              android_paddingBottom="8dp"
              android_paddingRight="4dp"
              android_paddingLeft="8dp"
              android_orientation="horizontal"
              app_layout_collapseMode="parallax"
              app_layout_collapseParallaxMultiplier="0.5">

    <TextView
        android_id="@+id/TxtVw_NoSelection"
        android_layout_width="wrap_content"
        android_layout_height="wrap_content"
        android_layout_marginLeft="8dp"
        android_layout_gravity="center_vertical"
        android_text="@string/no_selection"/>
</LinearLayout>
```

#### Java Code.

Android apps can be mainly written in Java or Kotlin. These days however there are many frameworks like Flutter also which use languages like Dart.

In this class we are using Java programming language.

We will have these classes in our project.

##### (a). MainActivity.java

This is our launcher activity as the name suggests. This means it will be the main entry point to our app in that when the user clicks the icon for our app, this activity will get rendered first.

We override a method called `onCreate()`. Here we will start by inflating our main layout via the `setContentView()` method.

Our main activity is actually an [activity](https://camposha.info/android/activity) since it’s deriving from the AppCompatActivity.

```java
package gr.escsoft.michaelprimez.searchablespinnerexamples;

import android.os.Bundle;
import android.support.v7.app.AppCompatActivity;
import android.support.v7.widget.Toolbar;
import android.view.MotionEvent;
import android.view.View;
import android.view.Menu;
import android.view.MenuItem;
import android.widget.Toast;

import java.util.ArrayList;

import gr.escsoft.michaelprimez.searchablespinner.SearchableSpinner;
import gr.escsoft.michaelprimez.searchablespinner.interfaces.IStatusListener;
import gr.escsoft.michaelprimez.searchablespinner.interfaces.OnItemSelectedListener;

public class MainActivity extends AppCompatActivity {

    private SearchableSpinner mSearchableSpinner;
    private SearchableSpinner mSearchableSpinner1;
    private SearchableSpinner mSearchableSpinner2;
    private SearchableSpinner mSearchableSpinner3;
    private SimpleListAdapter mSimpleListAdapter;
    private SimpleArrayListAdapter mSimpleArrayListAdapter;
    private final ArrayList<String> mStrings = new ArrayList<>();

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);
        Toolbar toolbar = (Toolbar) findViewById(R.id.toolbar);
        setSupportActionBar(toolbar);

        initListValues();
        mSimpleListAdapter = new SimpleListAdapter(this, mStrings);
        mSimpleArrayListAdapter = new SimpleArrayListAdapter(this, mStrings);

        mSearchableSpinner = (SearchableSpinner) findViewById(R.id.SearchableSpinner);
        mSearchableSpinner.setAdapter(mSimpleArrayListAdapter);
        mSearchableSpinner.setOnItemSelectedListener(mOnItemSelectedListener);
        mSearchableSpinner.setStatusListener(new IStatusListener() {
            @Override
            public void spinnerIsOpening() {
                mSearchableSpinner1.hideEdit();
                mSearchableSpinner2.hideEdit();
            }

            @Override
            public void spinnerIsClosing() {

            }
        });

        mSearchableSpinner1 = (SearchableSpinner) findViewById(R.id.SearchableSpinner1);
        mSearchableSpinner1.setAdapter(mSimpleListAdapter);
        mSearchableSpinner1.setOnItemSelectedListener(mOnItemSelectedListener);
        mSearchableSpinner1.setStatusListener(new IStatusListener() {
            @Override
            public void spinnerIsOpening() {
                mSearchableSpinner.hideEdit();
                mSearchableSpinner2.hideEdit();
            }

            @Override
            public void spinnerIsClosing() {

            }
        });

        mSearchableSpinner2 = (SearchableSpinner) findViewById(R.id.SearchableSpinner2);
        mSearchableSpinner2.setAdapter(mSimpleListAdapter);
        mSearchableSpinner2.setOnItemSelectedListener(mOnItemSelectedListener);
        mSearchableSpinner2.setStatusListener(new IStatusListener() {
            @Override
            public void spinnerIsOpening() {
                mSearchableSpinner.hideEdit();
                mSearchableSpinner1.hideEdit();
            }

            @Override
            public void spinnerIsClosing() {

            }
        });

        mSearchableSpinner3 = (SearchableSpinner) findViewById(R.id.SearchableSpinner3);
        mSearchableSpinner3.setAdapter(mSimpleListAdapter);
        mSearchableSpinner3.setOnItemSelectedListener(mOnItemSelectedListener);
        mSearchableSpinner3.setStatusListener(new IStatusListener() {
            @Override
            public void spinnerIsOpening() {
                mSearchableSpinner.hideEdit();
                mSearchableSpinner3.hideEdit();
            }

            @Override
            public void spinnerIsClosing() {

            }
        });
    }

    @Override
    public boolean onTouchEvent(MotionEvent event) {
        if (!mSearchableSpinner.isInsideSearchEditText(event)) {
            mSearchableSpinner.hideEdit();
        }
        if (!mSearchableSpinner1.isInsideSearchEditText(event)) {
            mSearchableSpinner1.hideEdit();
        }
        if (!mSearchableSpinner2.isInsideSearchEditText(event)) {
            mSearchableSpinner2.hideEdit();
        }
        return super.onTouchEvent(event);
    }

    private OnItemSelectedListener mOnItemSelectedListener = new OnItemSelectedListener() {
        @Override
        public void onItemSelected(View view, int position, long id) {
            Toast.makeText(MainActivity.this, "Item on position " + position + " : " + mSimpleListAdapter.getItem(position) + " Selected", Toast.LENGTH_SHORT).show();
        }

        @Override
        public void onNothingSelected() {
            Toast.makeText(MainActivity.this, "Nothing Selected", Toast.LENGTH_SHORT).show();
        }
    };

    private void initListValues() {
        mStrings.add("Brigida Kurz");
        mStrings.add("Tracy Mckim");
        mStrings.add("Iesha Davids");
        mStrings.add("Ozella Provenza");
        mStrings.add("Florentina Carriere");
        mStrings.add("Geri Eiler");
        mStrings.add("Tammara Belgrave");
        mStrings.add("Ashton Ridinger");
        mStrings.add("Jodee Dawkins");
        mStrings.add("Florine Cruzan");
        mStrings.add("Latia Stead");
        mStrings.add("Kai Urbain");
        mStrings.add("Liza Chi");
        mStrings.add("Clayton Laprade");
        mStrings.add("Wilfredo Mooney");
        mStrings.add("Roseline Cain");
        mStrings.add("Chadwick Gauna");
        mStrings.add("Carmela Bourn");
        mStrings.add("Valeri Dedios");
        mStrings.add("Calista Mcneese");
        mStrings.add("Willard Cuccia");
        mStrings.add("Ngan Blakey");
        mStrings.add("Reina Medlen");
        mStrings.add("Fabian Steenbergen");
        mStrings.add("Edmond Pine");
        mStrings.add("Teri Quesada");
        mStrings.add("Vernetta Fulgham");
        mStrings.add("Winnifred Kiefer");
        mStrings.add("Chiquita Lichty");
        mStrings.add("Elna Stiltner");
        mStrings.add("Carly Landon");
        mStrings.add("Hans Morford");
        mStrings.add("Shawanna Kapoor");
        mStrings.add("Thomasina Naron");
        mStrings.add("Melba Massi");
        mStrings.add("Sal Mangano");
        mStrings.add("Mika Weitzel");
        mStrings.add("Phylis France");
        mStrings.add("Illa Winzer");
        mStrings.add("Kristofer Boyden");
        mStrings.add("Idalia Cryan");
        mStrings.add("Jenni Sousa");
        mStrings.add("Eda Forkey");
        mStrings.add("Birgit Rispoli");
        mStrings.add("Janiece Mcguffey");
        mStrings.add("Barton Busick");
        mStrings.add("Gerald Westerman");
        mStrings.add("Shalanda Baran");
        mStrings.add("Margherita Pazos");
        mStrings.add("Yuk Fitts");
    }

    @Override
    public boolean onCreateOptionsMenu(Menu menu) {
        // Inflate the menu; this adds items to the action bar if it is present.
        getMenuInflater().inflate(R.menu.menu_main, menu);
        return true;
    }

    @Override
    public boolean onOptionsItemSelected(MenuItem item) {
        // Handle action bar item clicks here. The action bar will
        // automatically handle clicks on the Home/Up button, so long
        // as you specify a parent activity in AndroidManifest.xml.
        int id = item.getItemId();

        //noinspection SimplifiableIfStatement
        if (id == R.id.action_reset) {
            mSearchableSpinner.setSelectedItem(0);
            mSearchableSpinner1.setSelectedItem(0);
            mSearchableSpinner2.setSelectedItem(0);
            return true;
        }

        return super.onOptionsItemSelected(item);
    }
}
```

##### (b). SearchableSpinnerApp.java

```java
import android.app.Application;

import com.facebook.stetho.Stetho;

public class SearchableSpinnerApp extends Application {
    @Override
    public void onCreate() {
        super.onCreate();
        Stetho.initializeWithDefaults(this);
    }
}
```

##### (c). SimpleArrayListAdapter.java

The `SimpleArrayListAdapter` class.

Here’s the full code.

```java
package gr.escsoft.michaelprimez.searchablespinnerexamples;

import android.content.Context;
import android.graphics.Color;
import android.text.TextUtils;
import android.view.View;
import android.view.ViewGroup;
import android.widget.ArrayAdapter;
import android.widget.BaseAdapter;
import android.widget.Filter;
import android.widget.Filterable;
import android.widget.ImageView;
import android.widget.TextView;

import com.amulyakhare.textdrawable.TextDrawable;
import com.amulyakhare.textdrawable.util.ColorGenerator;

import java.util.ArrayList;

import gr.escsoft.michaelprimez.revealedittext.tools.UITools;
import gr.escsoft.michaelprimez.searchablespinner.interfaces.ISpinnerSelectedView;

public class SimpleArrayListAdapter extends ArrayAdapter<String> implements Filterable, ISpinnerSelectedView {

    private Context mContext;
    private ArrayList<String> mBackupStrings;
    private ArrayList<String> mStrings;
    private StringFilter mStringFilter = new StringFilter();

    public SimpleArrayListAdapter(Context context, ArrayList<String> strings) {
        super(context, R.layout.view_list_item);
        mContext = context;
        mStrings = strings;
        mBackupStrings = strings;
    }

    @Override
    public int getCount() {
        return mStrings == null ? 0 : mStrings.size() + 1;
    }

    @Override
    public String getItem(int position) {
        if (mStrings != null && position > 0)
            return mStrings.get(position - 1);
        else
            return null;
    }

    @Override
    public long getItemId(int position) {
        if (mStrings == null && position > 0)
            return mStrings.get(position).hashCode();
        else
            return -1;
    }

    @Override
    public View getView(int position, View convertView, ViewGroup parent) {
        View view = null;
        if (position == 0) {
            view = getNoSelectionView();
        } else {
            view = View.inflate(mContext, R.layout.view_list_item, null);
            ImageView letters = (ImageView) view.findViewById(R.id.ImgVw_Letters);
            TextView dispalyName = (TextView) view.findViewById(R.id.TxtVw_DisplayName);
            letters.setImageDrawable(getTextDrawable(mStrings.get(position-1)));
            dispalyName.setText(mStrings.get(position-1));
        }
        return view;
    }

    @Override
    public View getSelectedView(int position) {
        View view = null;
        if (position == 0) {
            view = getNoSelectionView();
        } else {
            view = View.inflate(mContext, R.layout.view_list_item, null);
            ImageView letters = (ImageView) view.findViewById(R.id.ImgVw_Letters);
            TextView dispalyName = (TextView) view.findViewById(R.id.TxtVw_DisplayName);
            letters.setImageDrawable(getTextDrawable(mStrings.get(position-1)));
            dispalyName.setText(mStrings.get(position-1));
        }
        return view;
    }

    @Override
    public View getNoSelectionView() {
        View view = View.inflate(mContext, R.layout.view_list_no_selection_item, null);
        return view;
    }

    private TextDrawable getTextDrawable(String displayName) {
        TextDrawable drawable = null;
        if (!TextUtils.isEmpty(displayName)) {
            int color2 = ColorGenerator.MATERIAL.getColor(displayName);
            drawable = TextDrawable.builder()
                    .beginConfig()
                    .width(UITools.dpToPx(mContext, 32))
                    .height(UITools.dpToPx(mContext, 32))
                    .textColor(Color.WHITE)
                    .toUpperCase()
                    .endConfig()
                    .round()
                    .build(displayName.substring(0, 1), color2);
        } else {
            drawable = TextDrawable.builder()
                    .beginConfig()
                    .width(UITools.dpToPx(mContext, 32))
                    .height(UITools.dpToPx(mContext, 32))
                    .endConfig()
                    .round()
                    .build("?", Color.GRAY);
        }
        return drawable;
    }

    @Override
    public Filter getFilter() {
        return mStringFilter;
    }

    public class StringFilter extends Filter {

        @Override
        protected FilterResults performFiltering(CharSequence constraint) {
            final FilterResults filterResults = new FilterResults();
            if (TextUtils.isEmpty(constraint)) {
                filterResults.count = mBackupStrings.size();
                filterResults.values = mBackupStrings;
                return filterResults;
            }
            final ArrayList<String> filterStrings = new ArrayList<>();
            for (String text : mBackupStrings) {
                if (text.toLowerCase().contains(constraint)) {
                    filterStrings.add(text);
                }
            }
            filterResults.count = filterStrings.size();
            filterResults.values = filterStrings;
            return filterResults;
        }

        @Override
        protected void publishResults(CharSequence constraint, FilterResults results) {
            mStrings = (ArrayList) results.values;
            notifyDataSetChanged();
        }
    }

    private class ItemView {
        public ImageView mImageView;
        public TextView mTextView;
    }

    public enum ItemViewType {
        ITEM, NO_SELECTION_ITEM;
    }
}
```

##### (d). SimpleListAdapter.java

The `SimpleListAdapter` class.

Here’s the full code.

```java
package gr.escsoft.michaelprimez.searchablespinnerexamples;

import android.content.Context;
import android.graphics.Color;
import android.text.TextUtils;
import android.view.View;
import android.view.ViewGroup;
import android.widget.BaseAdapter;
import android.widget.Filter;
import android.widget.Filterable;
import android.widget.ImageView;
import android.widget.TextView;

import com.amulyakhare.textdrawable.TextDrawable;
import com.amulyakhare.textdrawable.util.ColorGenerator;

import java.util.ArrayList;

import gr.escsoft.michaelprimez.revealedittext.tools.UITools;
import gr.escsoft.michaelprimez.searchablespinner.interfaces.ISpinnerSelectedView;
import gr.escsoft.michaelprimez.searchablespinner.interfaces.OnItemSelectedListener;

public class SimpleListAdapter extends BaseAdapter implements Filterable, ISpinnerSelectedView {

    private Context mContext;
    private ArrayList<String> mBackupStrings;
    private ArrayList<String> mStrings;
    private StringFilter mStringFilter = new StringFilter();

    public SimpleListAdapter(Context context, ArrayList<String> strings) {
        mContext = context;
        mStrings = strings;
        mBackupStrings = strings;
    }

    @Override
    public int getCount() {
        return mStrings == null ? 0 : mStrings.size() + 1;
    }

    @Override
    public Object getItem(int position) {
        if (mStrings != null && position > 0)
            return mStrings.get(position - 1);
        else
            return null;
    }

    @Override
    public long getItemId(int position) {
        if (mStrings == null && position > 0)
            return mStrings.get(position).hashCode();
        else
            return -1;
    }

    @Override
    public View getView(int position, View convertView, ViewGroup parent) {
        View view = null;
        if (position == 0) {
            view = getNoSelectionView();
        } else {
            view = View.inflate(mContext, R.layout.view_list_item, null);
            ImageView letters = (ImageView) view.findViewById(R.id.ImgVw_Letters);
            TextView dispalyName = (TextView) view.findViewById(R.id.TxtVw_DisplayName);
            letters.setImageDrawable(getTextDrawable(mStrings.get(position-1)));
            dispalyName.setText(mStrings.get(position-1));
        }
        return view;
    }

    @Override
    public View getSelectedView(int position) {
        View view = null;
        if (position == 0) {
            view = getNoSelectionView();
        } else {
            view = View.inflate(mContext, R.layout.view_list_item, null);
            ImageView letters = (ImageView) view.findViewById(R.id.ImgVw_Letters);
            TextView dispalyName = (TextView) view.findViewById(R.id.TxtVw_DisplayName);
            letters.setImageDrawable(getTextDrawable(mStrings.get(position-1)));
            dispalyName.setText(mStrings.get(position-1));
        }
        return view;
    }

    @Override
    public View getNoSelectionView() {
        View view = View.inflate(mContext, R.layout.view_list_no_selection_item, null);
        return view;
    }

    private TextDrawable getTextDrawable(String displayName) {
        TextDrawable drawable = null;
        if (!TextUtils.isEmpty(displayName)) {
            int color2 = ColorGenerator.MATERIAL.getColor(displayName);
            drawable = TextDrawable.builder()
                    .beginConfig()
                    .width(UITools.dpToPx(mContext, 32))
                    .height(UITools.dpToPx(mContext, 32))
                    .textColor(Color.WHITE)
                    .toUpperCase()
                    .endConfig()
                    .round()
                    .build(displayName.substring(0, 1), color2);
        } else {
            drawable = TextDrawable.builder()
                    .beginConfig()
                    .width(UITools.dpToPx(mContext, 32))
                    .height(UITools.dpToPx(mContext, 32))
                    .endConfig()
                    .round()
                    .build("?", Color.GRAY);
        }
        return drawable;
    }

    @Override
    public Filter getFilter() {
        return mStringFilter;
    }

    public class StringFilter extends Filter {

        @Override
        protected FilterResults performFiltering(CharSequence constraint) {
            final FilterResults filterResults = new FilterResults();
            if (TextUtils.isEmpty(constraint)) {
                filterResults.count = mBackupStrings.size();
                filterResults.values = mBackupStrings;
                return filterResults;
            }
            final ArrayList<String> filterStrings = new ArrayList<>();
            for (String text : mBackupStrings) {
                if (text.toLowerCase().contains(constraint)) {
                    filterStrings.add(text);
                }
            }
            filterResults.count = filterStrings.size();
            filterResults.values = filterStrings;
            return filterResults;
        }

        @Override
        protected void publishResults(CharSequence constraint, FilterResults results) {
            mStrings = (ArrayList) results.values;
            notifyDataSetChanged();
        }
    }

    private class ItemView {
        public ImageView mImageView;
        public TextView mTextView;
    }

    public enum ItemViewType {
        ITEM, NO_SELECTION_ITEM;
    }
}
```

#### Download

Download the project below.

| No. | Location | Link |
| --- | --- | --- |
| 1. | GitHub | [Direct Download](https://github.com/michaelprimez/searchablespinner/archive/master.zip) |
| 2. | GitHub | [Browse](https://github.com/michaelprimez/searchablespinner/tree/master/app) |

Credit to the Original Creator [michaelprimez](https://github.com/michaelprimez)

#### How to Run

1. Download the project.
2. Go over to app folder and edit import it to your android studio.Alternatively you can just copy paste the classes as well as the layouts and maybe other resources into your already created project.
3. Then edit the app level build/gradle to add our dependency.

## Example 3: Searchable Spinner Dialog

This example is a searchable spinner but with a dialog being shown. The spinner is rendered on a dialog. It can be claimed that this type of configuration is even more convenient since you can link the spinner to almost any widget. All you need is handle the click event of that widget and consequently display the dialog with the spinner.

Let as look at an example. Here is the demo of what will be created:

![Searchable Spinner Example](https://github.com/miteshpithadiya/SearchableSpinner/raw/master/searchablespinnerlibrary/src/main/res/nobleltevzwLMY47XMeditab02192016201518.gif)

Following the following steps:

### Step 1: Dependencies

In your app level `build.gradle` add the following implementation statement then sync your project:

```groovy
implementation 'kenmeidearu.searchablespinner:searchablespinnerlibrary:1.5.0'
```

### Step 2: Add Spinner to Layout

In your xml layout, add the searchable spinner as follows:

```xml
    <com.kenmeidearu.searchablespinnerlibrary.SearchableSpinner
        android:layout_width="wrap_content"
        android:layout_height="wrap_content" />
```

Here is the full layout:

**activity_main.xml**

```xml
<?xml version="1.0" encoding="utf-8"?>
<LinearLayout
    xmlns:android="http://schemas.android.com/apk/res/android"
    xmlns:app="http://schemas.android.com/apk/res-auto"
    xmlns:tools="http://schemas.android.com/tools"
    android:layout_width="match_parent"
    android:layout_height="match_parent"
    android:layout_margin="16dp"
    android:orientation="vertical"
    tools:context="com.kenmeidearu.sample.MainActivity">
    <TextView
        android:layout_width="match_parent"
        android:layout_height="wrap_content"
        android:layout_gravity="center_horizontal"
        android:gravity="center"
        android:text="Kenmeidearu Spinner"/>

    <com.kenmeidearu.searchablespinnerlibrary.SearchableSpinner
        android:id="@+id/spinner"
        android:layout_width="match_parent"
        android:layout_height="wrap_content"
        android:layout_margin="20dp"
        android:layout_gravity="center"
        android:gravity="center" />

    <com.kenmeidearu.searchablespinnerlibrary.SearchableSpinner
        android:id="@+id/spinner1"
        android:layout_width="match_parent"
        android:layout_height="wrap_content"
        android:layout_margin="20dp"
        app:hintText="Select Customer"/>

    <com.kenmeidearu.searchablespinnerlibrary.SearchableSpinner
        android:id="@+id/spinner2"
        android:layout_width="match_parent"
        android:layout_height="wrap_content"
        android:layout_margin="20dp"
        app:hintText="Select Customer"/>
</LinearLayout>
```

### Write Activity Code

Here generate your data. For example to load data from a string array into an arraylist:

```java
       ArrayList<mListString> StringIsi = new ArrayList<>();
        customerNama = getResources().getStringArray(R.array.planets);
        int id = 0;
        for (String s : customerNama) {
            StringIsi.add(new mListString(id, s, s, s, s));
            id++;
        }
```

Then specify the spinner prompt message or title:

```java
        sp.setTitleList("--Select Planet--");
```

Then set the adapter to the spinner:

```java
        sp.setAdapter(StringIsi, 2, 1);/
```

Here's the full code:

**MainActivity.kt**

```java
public class MainActivity extends AppCompatActivity {
    String[] customerNama = null;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);
        SearchableSpinner sp = (SearchableSpinner) findViewById(R.id.spinner);
        final SearchableSpinner sp1 = (SearchableSpinner) findViewById(R.id.spinner1);
        SearchableSpinner sp2 = (SearchableSpinner) findViewById(R.id.spinner2);

        //for two data
        ArrayList<mListString> StringIsi = new ArrayList<>();//must crete this to generate data there are n1-n4
        customerNama = getResources().getStringArray(R.array.planets);
        int id = 0;
        for (String s : customerNama) {
            StringIsi.add(new mListString(id, s, s, s, s));
            id++;
        }
        assert sp != null;
        sp.setTitleList("--Select Planet--");//use this to create initial search first
        sp.setAdapter(StringIsi, 2, 1);// type spinner 1-4, search option 1-4

        //for 4 data
        final ArrayList<mListString> listStringsCustomer = new ArrayList<>();
        listStringsCustomer.add(new mListString(1, "Andi", "Ambon Street", "Active", "New"));
        listStringsCustomer.add(new mListString(2, "Budi", "Bandung Street", "Active", "New"));
        listStringsCustomer.add(new mListString(3, "Carli", "Chille Street", "Non Active", "New"));
        listStringsCustomer.add(new mListString(4, "Deni", "Denmark Street", "Active", "New"));
        listStringsCustomer.add(new mListString(5, "Eko", "Estonia Street", "Active", "New"));
        sp1.setTitleList("--Select Customer--");//use this to create initial search first
        sp1.setAdapter(listStringsCustomer, 4, 4);// type spinner 1-4, search option 1-4

        //for immage
        final ArrayList<mListString> listStringsNegara = new ArrayList<>();
        listStringsNegara.add(new mListString(1, "Indonesia", "INA", "https://upload.wikimedia.org/wikipedia/id/2/2d/Bendera_Indonesia_%28Merah_Putih%29_by_Vibriel.jpg", true));
        listStringsNegara.add(new mListString(1, "Amerika Serikat", "USA", "http://2fm.rte.ie/wp-content/uploads/2017/05/american-flag-1459201553ppe-1.jpg", true));
        listStringsNegara.add(new mListString(1, "England", "UK", "http://1.bp.blogspot.com/-G7UhV_i5Rcc/T_15FYC57KI/AAAAAAAAAEc/-Trp7ugfE74/s1600/uk-flag.jpg", true));
        listStringsNegara.add(new mListString(1, "Jepang", "JP", "http://www.id.emb-japan.go.jp/image/expl12_01.jpg", true));
        sp2.setAdapter(listStringsNegara, 0, 2);//type zero for list with image

        sp1.setOnItemSelectedListener(new AdapterView.OnItemSelectedListener() {
            @Override
            public void onItemSelected(AdapterView<?> parent, View view, int position, long id) {
                Log.e("tes posisi", id + " ," + position + "," + listStringsCustomer.get(position - 1).get_id() + "," + sp1.getSelectedItem().toString());

                mListString layerName = ((mListString) sp1.getSelectedItem());
                Toast.makeText(MainActivity.this, "You choose:" + layerName.getNilai1(), Toast.LENGTH_SHORT).show();
            }

            @Override
            public void onNothingSelected(AdapterView<?> parent) {

            }
        });
    }

}
```

### Run

Run the project in android studio.

### Reference

Download the code below:

| Number | Link |
| --- | --- |
| 1. | [Download code](https://downgit.github.io/#/home?url=https://github.com/kenmeidearu/SearchableSpinner/tree/master/sample) |
| 2. | [Follow code author](https://github.com/kenmeidearu/) |
