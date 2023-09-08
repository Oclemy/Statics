# Android ListView Sorting Examples


When you have a collection of data, one of the most important feature to add is the ability to sort that data. In this piece we will look at all data sorting examples related to listview and gridview.


## Example 1: Android Arrays – Sort Descending and Ascending Order

_This is an android data sorting tutorial. How to sort in both ascending and descending manner._

We all know [Java](https://camposha.info/java/introduction) provides us the `java.util.Collection` framework for manipulating data including sorting.

With this we can sort any collection. However, an array is a built language feature and is not found in `java.util.Collection`.

However we have the `Array` class which provides us with the `asList` method that we can use to convert our Array into a [List](https://camposha.info/java/list) then sort it via the Collections API.

```java
List<String> myList = Array.asList(myStringArray);
```

We can then call the `Collections.sort()` passing in our [List](https://camposha.info/java/list). This sorts the data in ascending order by default.

```java
Collections.sort(galaxiesList);
```

We can then reverse it into descending, which is the opposite of ascending:

```java
Collections.reverse(galaxiesList)
```

\\===

#### 1\. Create Project

1. First create an empty project in [Android Studio](https://camposha.info/android/android-studio). Go to File --> New Project.
2. Type the application name and choose the company name.
3. Choose minimum SDK.
4. Choose Empty activity.
5. Click Finish.

This will generate for us a project with the following:

- 1 Activity - `MainActivity.java`
- 1 Layout - `activity_main.xml`.

The activity will automatically be registered in the android_manifest.xml. Android Activities are components and normally need to be registered as an [application](https://camposha.info/android/application) component.

If you've created yours manually then register it inside the `<application>...<application>` as following, replacing the `MainActivity` with your activity name:

```xml
        <activity android_name=".MainActivity">
            <intent-filter>
                <action android_name="android.intent.action.MAIN" />
                <category android_name="android.intent.category.LAUNCHER" />
            </intent-filter>
        </activity>
```

You can see that one action and category are specified as intent filters. The category makes our `MainActivity` as launcher [activity](https://camposha.info/android/activity).

Launcher activities get executed first when th android app is run.

#### Project Structure

Here's our project structure.

#### Layouts

We'll have only one layout, our `activity_main.xml`. We are working with:

1. [ListView](https://camposha.info/android/listview)
2. Button
3. TextView
4. [RelativeLayout](https://camposha.info/android/relativelayout)

Here's the component tree:

Here's our design pallete:

Here's our XML Layout, our `activity_main.xml` file:

```xml
<?xml version="1.0" encoding="utf-8"?>
<RelativeLayout

    android_layout_width="match_parent"
    android_layout_height="match_parent"
    tools_context="info.tutorialsloop.hp.arraysortcollection.MainActivity">

    <TextView
        android_id="@+id/headerLabel"
        android_layout_width="wrap_content"
        android_layout_height="wrap_content"
        android_layout_alignParentTop="true"
        android_layout_centerHorizontal="true"
        android_fontFamily="casual"
        android_text="Array Sorting ListView"
        android_textAllCaps="true"
        android_textSize="24sp"
        android_textStyle="bold" />

    <Button
        android_id="@+id/mySortBtn"
        android_layout_width="wrap_content"
        android_layout_height="wrap_content"
        android_layout_alignParentBottom="true"
        android_layout_centerHorizontal="true"
        android_layout_marginBottom="12dp"
        android_fontFamily="serif-monospace"
        android_text="Toggle Sort" />

    <ListView
        android_id="@+id/myListView"
        android_layout_width="match_parent"
        android_layout_height="match_parent"
        android_layout_above="@+id/mySortBtn"
        android_layout_alignParentEnd="true"
        android_layout_alignParentRight="true"
        android_layout_below="@+id/headerLabel"
        android_layout_marginTop="33dp" />

</RelativeLayout>
```

#### Java Code

We'll have only one class the `MainActivity`.

First we specify the package name:

```java
package info.tutorialsloop.hp.arraysortcollection;
```

Then create the class

```java
public class MainActivity{}
```

Let's add the imports we'll use:

```java
import android.app.Activity;
import android.os.Bundle;
import android.view.View;
import android.widget.ArrayAdapter;
import android.widget.Button;
import android.widget.ListView;
import java.util.Arrays;
import java.util.Collections;
import java.util.List;
```

We then make the class derive from [Activity](https://camposha.info/android/activity).

```java
public class MainActivity extends Activity {}
```

Our class will have the following instance fields. Instance fields are private properties of a class.

```java
    private ListView myListView;
    private Button mySortButton;
    private String[] galaxies={"Sombrero", "Cartwheel", "Pinwheel", "StarBust","Whirlpool","Ring Nebular", "Own Nebular","Centaurus A", "Virgo Stellar Stream", "Canis Majos Overdensity"
            , "Mayall's Object", "Leo", "Milky Way","IC 1011","Messier 81", "Andromeda", "Messier 87"};
    private boolean sortAscending=true;
    private boolean unSorted=true;
```

- The [ListView](https://camposha.info/android/listview) is our adapterview onto which we'll bind data.
- The button will toggle between ascending and descending order.
- The `galaxies` is a String array that will act as our data source.
- Then `sortAscending` is also a boolean that will maintain for us the state of sorting whether ascending or descending.
- The `unsorted` will help us determine the first time the user has clicked the sort button so that we can sort only once then subsequently only reverse instead of resorting every time the user clicks the sort button.

Let's continue.

We'll the create an `initializeViews()` method to initialize our views.

```java
    private void initializeViews()
    {
        myListView=findViewById(R.id.myListView);
       //with arrayadapter you have to pass a textview as a resource, and that is simple_list_item_1
        myListView.setAdapter(new ArrayAdapter(this,android.R.layout.simple_list_item_1,galaxies));

        mySortButton=findViewById(R.id.mySortBtn);
        mySortButton.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View view) {
                sortData();
            }
        });
    }
```

In the above we reference the [ListView](https://camposha.info/android/listview) from our XML layout using the `findViewById()`. This method is defined in the `android.app.Activity` class from which our `MainActivity` derives. We then call the ListView's `setAdapter()` method. And pass it an instance of an ArrayAdapter.

Our ArrayAdapter takes the following parameters:

- Context object.
- TextView resource
- Data Source

We also reference the button from the XML layout. And invoke it's `setOnClickListener` event handler. Then call `sortData()` inside it. We'll define this method next.

Then `sortData()` method:

This method will be responsible for sorting our data in both ascending and descending.

```java
private void sortData()
    {
        List<String> galaxiesList=Arrays.asList(galaxies);

        if(unSorted)Collections.sort(galaxiesList);
        else Collections.reverse(galaxiesList);

        sortAscending=!sortAscending;
        unSorted=false;

        myListView.setAdapter(new ArrayAdapter(this,android.R.layout.simple_list_item_1,galaxiesList));
    }
```

First we convert our Array to an ArrayList using the `asList()` method, passing in the array as a parameter. This gives us a [List](https://camposha.info/java/list) object which is passable to a collection to be sorted.

We check if our `unSorted` boolean is set to true. If so then we `sort` the data using the Collection's `sort()` method, passing in our List object.

If it's false then we simply reverse the Collection using the `reverse()` method.

We then toggle `sortAscending` to its negation, then update the `unSorted` to false.

After that we set our adapter to our ListView. This time however we pass our sorted List object as the data source.

Let's now come to the last part of our MainActivity class.

`The OnCreate()` method.

This method is one of lifecycle methods for android. This means it get's called at a particular time in the lifetime of an activity. In this case after the creation.

```java
    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);

        initializeViews();
    }
```

It's a method we are overriding. This means it has already been defined in the parent class. The parent class of our `MainActivity` is `android.app.Activity`.

The first requirement when overriding a lifecycle method is to invoke the `onCreate()` method that's defined inside that parent class. So we call `super.onCreate()`.

And we pass it a Bundle object. A Bundle is a class that allows us map string values to parceable types. It's a class belonging to `android.os` package and deriving from `android.os.BaseBundle`.

After that we call the `setContentView()` passing in our layout. This method belongs to our Activity. it knows and will inflate our XML layout into an `android.view.View` object that will be used as the user interface we interact with.

Finally we invoke the `initialize()` method.

And that's it. Here's the complete source:

```java
package info.tutorialsloop.hp.arraysortcollection;

import android.app.Activity;
import android.os.Bundle;
import android.view.View;
import android.widget.ArrayAdapter;
import android.widget.Button;
import android.widget.ListView;
import java.util.Arrays;
import java.util.Collections;
import java.util.List;

public class MainActivity extends Activity {

    private ListView myListView;
    private Button mySortButton;
    private String[] galaxies={"Sombrero", "Cartwheel", "Pinwheel", "StarBust","Whirlpool","Ring Nebular", "Own Nebular","Centaurus A", "Virgo Stellar Stream", "Canis Majos Overdensity"
            , "Mayall's Object", "Leo", "Milky Way","IC 1011","Messier 81", "Andromeda", "Messier 87"};
    private boolean sortAscending=true;
    private boolean unSorted=true;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);

        initializeViews();
    }

    private void initializeViews()
    {
        myListView=findViewById(R.id.myListView);
       //with arrayadapter you have to pass a textview as a resource, and that is simple_list_item_1
        myListView.setAdapter(new ArrayAdapter(this,android.R.layout.simple_list_item_1,galaxies));

        mySortButton=findViewById(R.id.mySortBtn);
        mySortButton.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View view) {
                sortData();
            }
        });
    }
    private void sortData()
    {
        List<String> galaxiesList=Arrays.asList(galaxies);

        if(unSorted)Collections.sort(galaxiesList);
        else Collections.reverse(galaxiesList);

        sortAscending=!sortAscending;
        unSorted=false;

        myListView.setAdapter(new ArrayAdapter(this,android.R.layout.simple_list_item_1,galaxiesList));
    }
}
```

## Example 2: Kotlin Android - ListView - Sort Ascending and Descending

Kotlin Android Simple ListView Sort Ascending and Descending Example

_How to sort a simple [listview](https://camposha.info/android/listview) in ascending and descending manner in Kotlin Android._

Let's see how to sort data in a ListView in both ascending and descendig manner.

You click a button to sort in ascending, then click it again to toggle the sort into descending manner and vice versa.

#### Concepts You will Learn

Here are some of the concepts you will learn from this tutorial.

1. What is a [ListView](https://camposha.info/android/listview)?
2. What is Data Sorting?
3. How to sort a ListView Alphabetically in both ascending and descending manner.
4. How to populate a ListView with an Array in Kotlin.

#### Video Tutorial

Well we have a video tutorial as an alternative to this. If you prefer tutorials like this one then it would be good you [subscribe to our YouTube channel, ProgrammingWizards TV](https://www.youtube.com/channel/UCpdkWp2zh5Qv1ZWlnqswdCw). Basically we have a TV for programming where do daily tutorials especially android.

#### What is Kotlin?

Kotlin is a programming language targeting the Java platform. Kotlin is concise, safe, pragmatic, and focused on interoperability with Java code.

Kotlin is usble almost everywhere Java is used today - for server-side development, Android apps, and much more.

Kotlin like Java is a statically typed programming language. This implies the type of every expression in a program is known at compile time, and the compiler can validate that the methods and fields you’re trying to access exist on the objects you’re using.

##### (a). Defining Packages in Kotlin

Normally classes are organized in packages in Java. This applies to Kotlin as well.

Package specification should be at the top of the source file:

```kotlin
package info.camposha
import java.util.*
class Starter{
    ...
}
```

However, be aware that it's not required to match directories and packages: source files can be placed arbitrarily in the file system.

##### (b). Defining Functions in Kotlin

Roughly speaking, functions in Kotlin are the equivalent of methods in java.

Functions can take input parameters and can return values. Here's such a function:

```kotlin
fun sum(a: Int, b: Int): Int {
    return a + b
}
```

This can be condensed into a single line given that it has an expression body and we can infer the retur types:

```kotlin
fun sum(a: Int, b: Int) = a + b
```

However, if functions do not return any meaningful value:

```kotlin
fun printSum(a: Int, b: Int): Unit {
    println("sum of $a and $b is ${a + b}")
}
```

#### Demo

Let's see the full example.

ListView Sort Descending Unsorted ListView ListView Sort Ascending

#### 1\. Resources.

[Android](https://camposha.info/android/introduction) platform provides a powerful and flexible way of adding static content as a resource.

These static content will also be packaged into the APK file. The static content will be stored either as a resource or as an asset.

Resources belong to a given type. These types can be:

1. Drawable.
2. Layout.
3. Value.

Let's start by looking at the layout resources

##### (a). activity_main.xml

This layout will get inflated into the main activity's user interface. This will happen via the Activity's `setContentView()` method which will require us to pass it the layout.

We will do so inside the `onCreate()` method of [Activity](https://camposha.info/android/activity).

In this case we use the following widgets:

1. [RelativeLayout](https://camposha.info/android/relativelayout) - our viewgroup.
2. TextView - to render our data.
3. Button - To toggle sort order.
4. [ListView](https://camposha.info/android/listview) - To render both our sorted and unsorted data.

```xml
<?xml version="1.0" encoding="utf-8"?>
<RelativeLayout

    android_layout_width="match_parent"
    android_layout_height="match_parent"
    tools_context="info.camposha.kotlinsortsimplelistview.MainActivity">

    <TextView
        android_id="@+id/headerLabel"
        android_layout_width="wrap_content"
        android_layout_height="wrap_content"
        android_layout_alignParentTop="true"
        android_layout_centerHorizontal="true"
        android_fontFamily="casual"
        android_text="Array Sorting ListView"
        android_textAllCaps="true"
        android_textSize="24sp"
        android_textStyle="bold" />

    <Button
        android_id="@+id/mySortBtn"
        android_layout_width="wrap_content"
        android_layout_height="wrap_content"
        android_layout_alignParentBottom="true"
        android_layout_centerHorizontal="true"
        android_layout_marginBottom="12dp"
        android_fontFamily="serif-monospace"
        android_text="Toggle Sort" />

    <ListView
        android_id="@+id/myListView"
        android_layout_width="match_parent"
        android_layout_height="match_parent"
        android_layout_above="@+id/mySortBtn"
        android_layout_alignParentEnd="true"
        android_layout_alignParentRight="true"
        android_layout_below="@+id/headerLabel"
        android_layout_marginTop="33dp" />

</RelativeLayout>
```

#### 2\. Kotlin Code

Kotlin is our programming language in this case.

##### (a) MainActivity.kt

Our main [activity](https://camposha.info/android/activity).

```kotlin
package info.camposha.kotlinsortsimplelistview

import android.app.Activity
import android.os.Bundle
import android.widget.*
import java.util.*

class MainActivity : Activity() {

    private var myListView: ListView? = null
    private var mySortButton: Button? = null
    private var galaxies = arrayOf("Sombrero", "Cartwheel", "Pinwheel", "StarBust", "Whirlpool", "Ring Nebular", "Own Nebular", "Centaurus A", "Virgo Stellar Stream", "Canis Majos Overdensity", "Mayall's Object", "Leo", "Milky Way", "IC 1011", "Messier 81", "Andromeda", "Messier 87")
    private var sortAscending = true
    private var galaxiesList = Arrays.asList(*galaxies)

    private fun sortData() {

        if (sortAscending) Collections.sort(galaxiesList)
        else

            Collections.reverse(galaxiesList)

        sortAscending = !sortAscending
        myListView!!.adapter = ArrayAdapter(this, android.R.layout.simple_list_item_1, galaxiesList)
        myListView!!.onItemClickListener = AdapterView.OnItemClickListener { adapterView, view, i, l -> Toast.makeText(this@MainActivity, galaxiesList[i], Toast.LENGTH_SHORT).show() }
    }

    private fun initializeViews() {
        myListView = findViewById(R.id.myListView)
        //with arrayadapter you have to pass a textview as a resource, and that is simple_list_item_1
        myListView!!.adapter = ArrayAdapter(this, android.R.layout.simple_list_item_1, galaxies)

        mySortButton = findViewById(R.id.mySortBtn)
        mySortButton!!.setOnClickListener { sortData() }
    }

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_main)
        initializeViews()
    }
}
```

#### 3\. Download

You can download full source code below.

| No. | Location | Link |
| --- | --- | --- |
| 1. | GitHub | [Direct Download](https://github.com/Oclemy/KotlinSortSimpleListView/archive/master.zip) |
| 2. | GitHub | [Browse](https://github.com/Oclemy/KotlinSortSimpleListView) |
| 3. | YouTube | [Our YouTube Channel](https://www.youtube.com/channel/UCpdkWp2zh5Qv1ZWlnqswdCw) |
| 2. | YouTube | [Watch Video Tutorial](https://www.youtube.com/watch?v=O3OsH_Hpt1w) |
| 4. | Camposha | [View All ListView Tutorials](https://camposha.info/android/listview) |

## Example 3: Android GridView - Sort - Ascending and Descending

_Android GridView - Sort - Ascending and Descending Tutorial_

Lets see how to sort data in android java using Collections class.We shall sort ascending and descending in GridView when button is clicked.

### Example 1 - Android GridView - Array - Sort Ascending/Descending

In this class we look at how to sort a gridview in both ascending and descending manner.

#### Project Structure

Here's our project structure:

![Project Structure](https://camposha.info/demos/source/arraysortgridview/demo1.png)

#### 1\. Create Basic Activity Project

1. First create a new project in android studio. Go to File --> New Project.

#### 3\. Our Layouts

##### (a). activity_main.xml

- This layout gets inflated to MainActivity user interface.

We add a GridView here.

```xml
<?xml version="1.0" encoding="utf-8"?>
<RelativeLayout

    android_layout_width="match_parent"
    android_layout_height="match_parent"
    tools_context="info.tutorialsloop.hp.arraysortgridview.MainActivity">

    <TextView
        android_id="@+id/headerLabel"
        android_layout_width="wrap_content"
        android_layout_height="wrap_content"
        android_layout_alignParentTop="true"
        android_layout_centerHorizontal="true"
        android_fontFamily="casual"
        android_text="Array Sorting GridView"
        android_textAllCaps="true"
        android_textSize="24sp"
        android_textStyle="bold" />

    <Button
        android_id="@+id/mySortBtn"
        android_layout_width="wrap_content"
        android_layout_height="wrap_content"
        android_layout_alignParentBottom="true"
        android_layout_centerHorizontal="true"
        android_layout_marginBottom="12dp"
        android_fontFamily="serif-monospace"
        android_text="Toggle Sort" />

    <GridView
        android_id="@+id/myGridView"
        android_layout_width="match_parent"
        android_layout_height="match_parent"
        android_layout_above="@+id/mySortBtn"
        android_layout_alignParentEnd="true"
        android_layout_alignParentRight="true"
        android_layout_below="@+id/headerLabel"
        android_layout_marginTop="33dp" />

</RelativeLayout>
```

* * *

#### 4\. MainActivity.java

Here's our main activity.

```java
package info.tutorialsloop.hp.arraysortgridview;

import android.app.Activity;
import android.os.Bundle;
import android.view.View;
import android.widget.AdapterView;
import android.widget.ArrayAdapter;
import android.widget.Button;
import android.widget.GridView;
import android.widget.Toast;

import java.util.Arrays;
import java.util.Collections;
import java.util.List;

public class MainActivity extends Activity {
    GridView gv;
    Button mySortButton;
    private String[] galaxies={"Sombrero", "Cartwheel", "Pinwheel", "StarBust","Whirlpool","Ring Nebular", "Own Nebular","Centaurus A", "Virgo Stellar Stream", "Canis Majos Overdensity"
            , "Mayall's Object", "Leo","Small Magellonic Cloud", "Large Magellonic Cloud","Milky Way","Whirlpool","Black Eye Galaxy","IC 1011","Messier 81", "Andromeda", "Messier 87"};

    private boolean sortAscending=true;
    private boolean unSorted=true;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);

        initializeGridView();

    }
    private void initializeGridView()
    {
        gv= findViewById(R.id.myGridView);
        gv.setAdapter(new ArrayAdapter<>(this,android.R.layout.simple_list_item_1,galaxies));
        gv.setOnItemClickListener(new AdapterView.OnItemClickListener() {
            @Override
            public void onItemClick(AdapterView<?> adapterView, View view, int i, long l) {
                Toast.makeText(MainActivity.this, galaxies[i], Toast.LENGTH_SHORT).show();
            }
        });

        mySortButton=findViewById(R.id.mySortBtn);
        mySortButton.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View view) {
                sortData();
            }
        });
    }
    private void sortData()
    {
        List<String> galaxiesList= Arrays.asList(galaxies);

        if(unSorted) Collections.sort(galaxiesList);
        else Collections.reverse(galaxiesList);

        sortAscending=!sortAscending;
        unSorted=false;

        gv.setAdapter(new ArrayAdapter(this,android.R.layout.simple_list_item_1,galaxiesList));
    }
}
```

### Example 2

#### Intro

- We sort data in ascending and descending manner on button click.
- GridView is the component we are using here.
- We use Collections.sort() method passing in our data source and reversing it.
- We've used Android Studio as our IDE.
- The code is well commented for easier understanding.

#### Common Questions we answer

With this simple example we explore the following :

- How o sort data in Java Android
- Sort data ascending and descending manner.
- How to bind arraylist data to gridview.
- How to sort using Collections class in java.
- How to reverse a Collection.
- Using ArrayAdapter with GridView.
- How to sort and reverse an arraylist in Java.
- Using Android with GridView.

#### Tools Used

- IDE : Android Studio
- OS : Windows 8.1
- PLATFORM : Android
- LANGUAGE : Java

#### 1\. MainActivity Class

- Our MainActivity,launcher activity.
- First we reference views here.
- Our adapterview is GridView.
- We also have a button that shall get clicked.

```java
package com.tutorials.hp.simplegridviewsort;

import android.os.Bundle;
import android.support.v7.app.AppCompatActivity;
import android.view.View;
import android.widget.ArrayAdapter;
import android.widget.Button;
import android.widget.GridView;

import java.util.ArrayList;
import java.util.Collections;

public class MainActivity extends AppCompatActivity {

    //VIEWS
    private GridView gv;
    private Button sortBtn;

    //DATA
    private static ArrayList<String> spacecrafts =new ArrayList<>();
    private boolean ascending = true;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);

        this.initializeViews();
        this.fillSpacecrafts();

    }

    //INITIALIZE VIEWS
    private void initializeViews()
    {
        gv = (GridView) findViewById(R.id.gv);
        sortBtn = (Button) findViewById(R.id.sortBtn);

        sortBtn.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View view) {
                sortData(ascending);
                ascending = !ascending;
            }
        });
    }

    /*
     * SORT
     */
    private void sortData(boolean asc)
    {
        //SORT ARRAY ASCENDING AND DESCENDING
        if (asc)
        {
            Collections.sort(spacecrafts);
        }
        else
        {
           Collections.reverse(spacecrafts);
        }

        gv.setAdapter(new ArrayAdapter(MainActivity.this,android.R.layout.simple_list_item_1,spacecrafts));

    }

    /*
    FILL SPACECRAFTS DATA
     */
    private void fillSpacecrafts() {

        spacecrafts.clear();
        spacecrafts.add("Kepler");
        spacecrafts.add("Casini");
        spacecrafts.add("Voyager");
        spacecrafts.add("New Horizon");
        spacecrafts.add("James Web");
        spacecrafts.add("Apollo 15");
        spacecrafts.add("WMAP");
        spacecrafts.add("Enterprise");
        spacecrafts.add("Spitzer");
        spacecrafts.add("Galileo");
        spacecrafts.add("Challenger");
        spacecrafts.add("Atlantis");
        spacecrafts.add("Apollo 19");
        spacecrafts.add("Huygens");
        spacecrafts.add("Hubble");
        spacecrafts.add("Juno");
        spacecrafts.add("Aries");
        spacecrafts.add("Columbia");

        gv.setAdapter(new ArrayAdapter(MainActivity.this,android.R.layout.simple_list_item_1,spacecrafts));

    }

}
```

#### 3\. Main.axml Layout\*\*

- Main Layout.
- We specify Views and widgets xml code here.
- This layout shall get inflated into our MainActivity interface.
- We have two components : GridView and Button.
- GridView has two columns.

```xml
<?xml version="1.0" encoding="utf-8"?>
<RelativeLayout

    android_id="@+id/activity_main"
    android_layout_width="match_parent"
    android_layout_height="match_parent"
    android_paddingBottom="@dimen/activity_vertical_margin"
    android_paddingLeft="@dimen/activity_horizontal_margin"
    android_paddingRight="@dimen/activity_horizontal_margin"
    android_paddingTop="@dimen/activity_vertical_margin"
    tools_context="com.tutorials.hp.simplegridviewsort.MainActivity">

    <LinearLayout
        android_orientation="vertical"
        android_layout_width="match_parent"
        android_layout_height="match_parent">

        <GridView
            android_id="@+id/gv"
            android_layout_width="match_parent"
            android_layout_height="wrap_content"
            android_numColumns="2" />

        <Button
            android_text="Sort"
            android_layout_centerInParent="true"
            android_layout_width="381.0dp"
            android_layout_height="70dp"
            android_background="@color/colorAccent"
            android_padding="10dp"
            android_id="@+id/sortBtn"
            android_layout_marginRight="0.0dp" />

    </LinearLayout>

</RelativeLayout>
```

#### Download

| Resource | Link |
| --- | --- |
| GitHub Browse | [Browse](https://github.com/Oclemy/SimpleGridViewSort) |
| GitHub Download Link | [Download](https://github.com/Oclemy/SimpleGridViewSort/archive/master.zip) |

## Example 4: Kotlin GridView Sort Ascending and Descending

## **(a). build.gradle(app level)**

Inside our app level build.gradle first you want to make sure that Kotlin plugin has been added as a dependency.

Also that it has been applied. Check below.

Normally if your are using android studio, just mark `include kotlin` in the `Create Project` and these will be done for you by the IDE.

```groovy
apply plugin: 'com.android.application'

apply plugin: 'kotlin-android'

apply plugin: 'kotlin-android-extensions'

android {
    compileSdkVersion 26
    defaultConfig {
        applicationId "info.camposha.kotlinsortgridview"
        minSdkVersion 14
        targetSdkVersion 26
        versionCode 1
        versionName "1.0"
        testInstrumentationRunner "android.support.test.runner.AndroidJUnitRunner"
    }
    buildTypes {
        release {
            minifyEnabled false
            proguardFiles getDefaultProguardFile('proguard-android.txt'), 'proguard-rules.pro'
        }
    }
}

dependencies {
    implementation fileTree(dir: 'libs', include: ['*.jar'])
    implementation"org.jetbrains.kotlin:kotlin-stdlib-jre7:$kotlin_version"
    implementation 'com.android.support:appcompat-v7:26.+'
    testImplementation 'junit:junit:4.12'

}
```

## **(b). activity_main.xml**

This layout will get inflated to our Main Activity layout.

It's an XML file. XML normally stands for eXtensible Markup Language and is a markup language that defines a set of rules for encoding documents in a format that is both human-readable and machine-readable.

Android user interfaces are normally written in XML format. This makes them agnostic to the logic code written in Kotlin.

The encoding formats used with XML documents are either `utf-8` or `utf-16`, normally and in this case we use the former.

We have a `RelativeLayout` element as the root element. This layout normally arranges its children relative to other each other.

The first of those children is the extView, a View that is meant to render static Text. In this case we use it show the header label of our Kotlin Android application.

Then we will have another sibling element called GridView. This is a widget which is an adapterview. It's similar to other adapterviews like ListView and Spinner in that they render lists of data and need an adapter to bind that data.

However GridViews normally render data in a two-dimensional format, that is rows and columns.

Lastly we have a button that is meant to toggle sort between ascending and descending.

```xml
<?xml version="1.0" encoding="utf-8"?>
<RelativeLayout xmlns:android="http://schemas.android.com/apk/res/android"
    xmlns:app="http://schemas.android.com/apk/res-auto"
    xmlns:tools="http://schemas.android.com/tools"
    android:layout_width="match_parent"
    android:layout_height="match_parent"
    tools:context="info.camposha.kotlinsortgridview.MainActivity">

    <TextView
        android:id="@+id/headerLabel"
        android:layout_width="wrap_content"
        android:layout_height="wrap_content"
        android:layout_alignParentTop="true"
        android:layout_centerHorizontal="true"
        android:fontFamily="casual"
        android:text="Array Sorting GridView"
        android:textAllCaps="true"
        android:textSize="24sp"
        android:textStyle="bold" />

    <Button
        android:id="@+id/mySortBtn"
        android:layout_width="wrap_content"
        android:layout_height="wrap_content"
        android:layout_alignParentBottom="true"
        android:layout_centerHorizontal="true"
        android:layout_marginBottom="12dp"
        android:fontFamily="serif-monospace"
        android:text="Toggle Sort" />

    <GridView
        android:id="@+id/myGridView"
        android:layout_width="match_parent"
        android:layout_height="match_parent"
        android:layout_above="@+id/mySortBtn"
        android:layout_alignParentEnd="true"
        android:layout_alignParentRight="true"
        android:layout_below="@+id/headerLabel"
        android:numColumns="3"
        android:layout_marginTop="33dp" />

</RelativeLayout>
```

* * *

Let's now move to our MainActivity class.

## **(c). MainActivity.kt**

## **1\. What is an Activity in Kotlin Android?**

Generally an activity is a single, focused thing that the user can do. Users normally act when they are interacting with your application.

This act may be sending an email or playing some music, or clicking a button. In Kotlin Android, or Android as a whole, they act on Activities.

An Activity is an android component so is fundamental to how android works. Activities have life cycle methods representing various stages in its life cycle.

Activities get created by deriving from `android.app.Activity` as we do here in Kotlin:

```kotlin
class MainActivity : Activity() {..}
```

Of course we've already imported some packages:

```kotlin
import android.app.Activity
import android.os.Bundle
import android.widget.*
import java.util.*
```

## **2\. Create Instance Properties**

These include properties of type GridView and Button, which are our user interface widgets.

```kotlin
    private lateinit var gv: GridView
    private lateinit var mySortButton: Button
```

The GridView will be used to contain the data that need to sorted.

These two are not null and yet we don't want to initialize them in the constructor, the way any non-null property has to. So we mark them as `lateinit`.

Then we create a property to act as our data source. We use the `arrayOf()` function to create an array of galaxies data:

```kotlin
    private var galaxies = arrayOf("Sombrero", "Cartwheel", "Pinwheel", "StarBust", "Whirlpool", "Ring Nebular", "Own Nebular", "Centaurus A", "Virgo Stellar Stream", "Canis Majos Overdensity", "Mayall's Object", "Leo", "Small Magellonic Cloud", "Large Magellonic Cloud", "Milky Way", "Whirlpool", "Black Eye Galaxy", "IC 1011", "Messier 81", "Andromeda", "Messier 87")
```

Then we turn that Array into a List using the `asList()` method of the `java.util.Arrays` class:

```kotlin
    var galaxiesList = Arrays.asList(*galaxies)
```

And finally two helper properties to help us maintain state of sorting, whether data is unsorted or sorted in ascending or sorted in descending manner.

```kotlin
    private var sortAscending = true
    private var unSorted = true
```

## **3\. Sort Data in Ascending or Descending Manner via Collections**

Then we come to how we will actually sort our data.

Fortunately we have the `Collections` class which will allow us do that easily.

But what is this `Collections` class?

Please don't confuse it with `Collection<E>` which is the root interface of the Collection hierarchy.

`Collections` on the other hand is a class that consists exclusively of static methods that operate on or return collections.

It derives from the `Object` class:

```shell
java.lang.Object
   ↳    java.util.Collections
```

Among those static methods we are interested in the `sort()` and `reverse()`.

`sort()` will sort data in ascending manner. Then `reverse()` can reverse the already sorted data in descending manner.

```kotlin
        if (sortAscending)
            Collections.sort(galaxiesList)
        else
            Collections.reverse(galaxiesList)

        sortAscending = !sortAscending
```

You can see we reverse the state after sorting.Note that we have one button that will sort our data in descending manner the first time it's clicked.

Then when clicked again it simply reverses it and then updates or negates the state of `sortAscending` variable.

So we will subsequently be toggling between the ascending and descending sort orders.

## **4\. Bind Data to GridView Kotlin Android**

Yeah we bind data to GridView using ArrayAdapter:

```kotlin
        gv.adapter = ArrayAdapter(this, android.R.layout.simple_list_item_1, galaxiesList)
        gv.onItemClickListener = AdapterView.OnItemClickListener { adapterView, view, i, l -> Toast.makeText(this@MainActivity, galaxiesList[i], Toast.LENGTH_SHORT).show() }
```

We listen to onClick events and show a Toast message with the clicked ite,.

Well here's the full Kotlin source code.

## Full Code

Our Kotlin MainActivity class.

```kotlin
package info.camposha.kotlinsortgridview

import android.app.Activity
import android.os.Bundle
import android.widget.*
import java.util.*

class MainActivity : Activity() {

    private lateinit var gv: GridView
    private lateinit var mySortButton: Button
    private var galaxies = arrayOf("Sombrero", "Cartwheel", "Pinwheel", "StarBust", "Whirlpool", "Ring Nebular", "Own Nebular", "Centaurus A", "Virgo Stellar Stream", "Canis Majos Overdensity", "Mayall's Object", "Leo", "Small Magellonic Cloud", "Large Magellonic Cloud", "Milky Way", "Whirlpool", "Black Eye Galaxy", "IC 1011", "Messier 81", "Andromeda", "Messier 87")

    var galaxiesList = Arrays.asList(*galaxies)

    private var sortAscending = true
    private var unSorted = true
    /*
    SORT
     */
    private fun sortData() {

        if (sortAscending)
            Collections.sort(galaxiesList)
        else
            Collections.reverse(galaxiesList)

        sortAscending = !sortAscending
        gv.adapter = ArrayAdapter(this, android.R.layout.simple_list_item_1, galaxiesList)
        gv.onItemClickListener = AdapterView.OnItemClickListener { adapterView, view, i, l -> Toast.makeText(this@MainActivity, galaxiesList[i], Toast.LENGTH_SHORT).show() }
    }
    /*
    INITIALIZE GRIDVIEW
     */
    private fun initializeGridView() {
        gv = findViewById(R.id.myGridView)
        gv.adapter = ArrayAdapter(this, android.R.layout.simple_list_item_1, galaxies)

        mySortButton = findViewById(R.id.mySortBtn)
        mySortButton.setOnClickListener { sortData() }
    }

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_main)

        initializeGridView()
    }
}
```

* * *

## **(d). Results**

I used Nox Player Emulator.

First unsorted data in our gridview. This before the user clicks the `Toggle Sort` button:

![Kotlin Android Sort GridView](https://camposha.info/wp-content/uploads/2019/04/demo1-13.png)

Kotlin Android Sort GridView

Then sorted data in ascending manner. This after he's clicked the `Toggle Sort` button:

![Kotlin Android Sort GridView](https://camposha.info/wp-content/uploads/2019/04/demo2-6.png)

Kotlin Android Sort GridView

And lastly data sorted in descending manner. The data was first sorted in ascending manner. He clicks `Toggle Sort` and we toggle the sort to descending order:

![Kotlin Android Sort GridView](https://camposha.info/wp-content/uploads/2019/04/demo3-4.png)

Kotlin Android Sort GridView

Best Regards.
