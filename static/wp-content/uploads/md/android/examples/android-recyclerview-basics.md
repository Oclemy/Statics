# RecyclerView Basic Examples - Images Text, ItemClicks etc


RecyclerView is an adapterview that you need to master in order to do android development. It is extremely powerful and is key to android development since it's extremely flexibble. Developers use it to not only display lists and grids of data but to build all types of widgets like tables, calenders, sliders etc.

This is an android recyclerview tutorial. We see what a recyclerview is, why we need it and several examples of how to apply it. This tutorial helps you learn recyclerview through step by step howto examples.


##### What is a RecyclerView?

> _A **RecyclerView** is an adapterview that allows us display a large data set through just a limited window._

RecyclerViews were introduced in Android API 5 as an alternative to ListViews. ListView as you may already know is also an adapterview and allows us display items in a vertically scrolling list.

RecyclerView reuse views. And those views are just pieces of grahpical user interface widgets that normally we define in XML and get inflated in java.

RecyclerViews are not limited to any one particular view. Instead it can utilize any. Be it TextViews, Buttons, checkBoxes etc.

RecyclerView is meant to work as an adapterview, basically with an adapter that adapts data to the RecyclerView's views. AdapterViews normally display collections of data.

Even though there have been various great and popular adapterviews like ListViews, GridViews and expandablelistviews, recyclerview is the best when it comes to displaying large quantities of data.

And that's because of it's concept of recycling already used views instead of re-inflating them everytime.

Infation of views is normally expensive as it involves parsing of XML layouts into java objects. And remember this is to be done in realtime as the user scrolls through a list of data. Users can definitely notice that. And you can imagine having hundreds of rows or grids of data. Not so good isn't it?

So RecyclerView is great in this regard as instead of re-inflating the views, it holds them in a ViewHolder class and then recycles them, only binding fresh data to them. The end result is smoothness even with large datasets that we and our users can take for granted.

##### Advantages of RecyclerViews

| No. | Advantage | Description |
| --- | --- | --- |
| 1. | Efficient. | Android Engineers introduced RecyclerViews to provide a more efficient way of displaying large data sets. Previously ListViews were and gridviews were the only inbuilt alternatives. They are great for small data sets but not for large. |
| 2. | Flexible | RecyclerViews are the most flexible adapterviews in android. I have seen people using them to build almost anything from creating input forms to scrollable grids to other adapterviews. |
| 3. | Easy to use. | This is one of the reasons why they are popular. Some may argue that you always need two or three classes however, these are simple classes that can be combined in one file. |
| 4. | Obeys SOC(Seperation of Concerns) | A RecyclerView decouples adapter from views. Hence we can work on either without touching the other. |

##### Programmatic Definition of RecyclerViews

Like anything you can imagine in android or even java at large, a RecyclerView is just a class:

```java
class RecyclerView{..}
```

And is public so that it's not only visible to class in this package but also those in other packages:

```java
public class RecyclerView{..}
```

_RecyclerView_ extends android.view.ViewGroup. ViewGroup is a _special view that can contain other views_. It can basically hold children within itself. Think of views like relativelayout and linearlayout.

```java
public class RecyclerView extends ViewGroup... {..}
```

This will give a RecyclerView the capability to hold views as well.

Then RecyclerView implements two interfaces:

```java
public class RecyclerView extends ViewGroup implements ScrollingView, NestedScrollingChild{..}
```

1. **ScrollingView** - It provides scroll related APIs to RecyclerView. These includes APIs such as `computeHorizontalScrollExtent()`,`computeVerticalScrollExtent()` etc.
2. **NestedScrollingChild** - Provides support for dispatching of nested scrolling operations to a cooperating parent ViewGroup.

## 1\. Kotlin Android RecyclerView Example

Let's look at a simple and modern recyclerview example using kotlin and AndroidX. Most of the other examples were written long time with javawhen kotlin had not been introduced to android development. However these days kotlin is the language prioritized in android development so we have to look at a kotlin recyclerview example with androidx.

Here is what is created;

![Kotlin recyclerView Example](https://github.com/yanzm/RecyclerViewSample/raw/master/screenshots/untitled.gif)

### Step 1: Add dependency

In this lesson we start by adding recyclerview as a dependency in our app level build.gradle file

```kotlin
    implementation "androidx.recyclerview:recyclerview:1.1.0"
```

Then sync the project.

### Step 2: Create Model/Item Layout

The next step is that you create a model layout, or an item layout or a row layout. This is the layout for a single individual row in your recyclerview. If you are using a gridlayout then it will represent a single grid:

```xml
<?xml version="1.0" encoding="utf-8"?>
<TextView xmlns:android="http://schemas.android.com/apk/res/android"
    android:id="@android:id/text1"
    android:layout_width="match_parent"
    android:layout_height="wrap_content"
    android:background="?android:attr/selectableItemBackground"
    android:gravity="center_vertical"
    android:minHeight="?android:attr/listPreferredItemHeightSmall"
    android:paddingEnd="?android:attr/listPreferredItemPaddingEnd"
    android:paddingStart="?android:attr/listPreferredItemPaddingStart"
    android:textAppearance="?android:attr/textAppearanceListItemSmall" />
```

### Step 3: Create main layout

The main layout is the xml layout for your main page. This is where the recyclerview will be placed. In this case we will have the recyclerview occupying the whole page:

```xml
<?xml version="1.0" encoding="utf-8"?>
<androidx.recyclerview.widget.RecyclerView xmlns:android="http://schemas.android.com/apk/res/android"
    xmlns:tools="http://schemas.android.com/tools"
    android:id="@+id/recycler_view"
    android:layout_width="match_parent"
    android:layout_height="match_parent"
    />
```

### Step 5: Write Code

We write the code in kotlin.

Extend AppCompatActivity to create us an activity:

```kotlin
class MainActivity : AppCompatActivity() {
```

Inside the activity override the onCreate method as folows;

```kotlin

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_main)
```

Reference recylerview then set it's layout manager:

```kotlin
       val recyclerView = findViewById<View>(R.id.recycler_view) as RecyclerView
        recyclerView.setHasFixedSize(true)
        recyclerView.layoutManager = LinearLayoutManager(this)
```

Then instantiate the recyclerview adapter and attach it to the recyclerview:

```kotlin
val adapter = VersionAdapter { version ->
            Toast.makeText(this, version, Toast.LENGTH_SHORT).show()
        }
        recyclerView.adapter = adapter
```

Randomize data and set the adapter:

```kotlin
        repeat(30) {
            ANDROID_CODE_NAMES.random()
            adapter.add(ANDROID_CODE_NAMES.random())
        }
```

Below the main activity create a view holder class:

```kotlin
class VersionViewHolder private constructor(itemView: View) : RecyclerView.ViewHolder(itemView) {

    val textView: TextView = itemView as TextView

    companion object {
        private const val LAYOUT_ID = R.layout.list_item

        fun create(inflater: LayoutInflater, parent: ViewGroup?): VersionViewHolder {
            return VersionViewHolder(inflater.inflate(LAYOUT_ID, parent, false))
        }
    }
}
```

Then the adapter class. Here is the full code:

**MainActivity.kt**

```kotlin
package net.yanzm.recyclerviewsample

import android.os.Bundle
import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import android.widget.TextView
import android.widget.Toast
import androidx.appcompat.app.AppCompatActivity
import androidx.recyclerview.widget.LinearLayoutManager
import androidx.recyclerview.widget.RecyclerView

class MainActivity : AppCompatActivity() {

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_main)

        val recyclerView = findViewById<View>(R.id.recycler_view) as RecyclerView
        recyclerView.setHasFixedSize(true)
        recyclerView.layoutManager = LinearLayoutManager(this)

        val adapter = VersionAdapter { version ->
            Toast.makeText(this, version, Toast.LENGTH_SHORT).show()
        }
        recyclerView.adapter = adapter

        repeat(30) {
            ANDROID_CODE_NAMES.random()
            adapter.add(ANDROID_CODE_NAMES.random())
        }
    }
}

class VersionAdapter(private val clickListener: (version: String) -> Unit) :
    RecyclerView.Adapter<VersionViewHolder>() {

    private val lock = Any()

    private val versions = mutableListOf<String>()

    override fun onCreateViewHolder(parent: ViewGroup, viewType: Int): VersionViewHolder {
        val inflater = LayoutInflater.from(parent.context)
        return VersionViewHolder.create(inflater, parent).apply {
            itemView.setOnClickListener {
                val version = versions[adapterPosition]
                clickListener(version)
            }
        }
    }

    override fun onBindViewHolder(holder: VersionViewHolder, position: Int) {
        val version = versions[position]
        holder.textView.text = version
    }

    override fun getItemCount(): Int {
        return versions.size
    }

    fun add(version: String) {
        val position: Int
        synchronized(lock) {
            position = versions.size
            versions.add(version)
        }
        notifyItemInserted(position)
    }
}

class VersionViewHolder private constructor(itemView: View) : RecyclerView.ViewHolder(itemView) {

    val textView: TextView = itemView as TextView

    companion object {
        private const val LAYOUT_ID = R.layout.list_item

        fun create(inflater: LayoutInflater, parent: ViewGroup?): VersionViewHolder {
            return VersionViewHolder(inflater.inflate(LAYOUT_ID, parent, false))
        }
    }
}

private val ANDROID_CODE_NAMES = arrayOf(
    "Cupcake",
    "Donuts",
    "Eclair",
    "Froyo",
    "Gingerbread",
    "Honeycomb",
    "IceCreamSandwich",
    "JellyBean",
    "Kitkat",
    "Lollipop",
    "Marshmallow",
    "Nougat"
)
```

### Reference

Here are the reference links to this project:

| No. | Link |
| --- | --- |
| 1. | Download code [here](https://github.com/yanzm/RecyclerViewSample/archive/refs/heads/master.zip) |
| 2. | Browse code [here](https://github.com/yanzm/RecyclerViewSample/) |
| 3. | Follow code author [here](https://github.com/yanzm) |

## Example 2: Simple Kotlin Android ImageViewer App with Recyclerview

In this example we create an imageview app with recyclerview. Images and Text are displayed in a recyclerview. When a user clicks a single image or row, a new full screen activity is opend to show the details.

Here is the demo of what is created;

![Kotlin Android RecyclerView Example](https://github.com/alirezabashi98/RecyclerView/raw/master/scr001.png)

Let's start.

### Step 1: Dependencies

Add androidx recyclerview as a dependency. No third party dependency are used in this project:

```groovy
    implementation 'androidx.recyclerview:recyclerview:1.1.0'
```

### Step 2: Design Layouts

We will have three layouts:

1. custom_recyclerview.xml
2. activity_fullscreen.xml
3. activity_main.xml

**(a). custom_recyclerview.xml**

This will define a single recyclerview row. The recyclerview will have images and text:

```xml
<?xml version="1.0" encoding="utf-8"?>
<LinearLayout
    xmlns:android="http://schemas.android.com/apk/res/android"
    xmlns:tools="http://schemas.android.com/tools"
    android:layout_width="match_parent"
    android:layout_height="wrap_content"
    android:orientation="horizontal"
    android:padding="5dp"
    android:layout_margin="5dp"
    tools:ignore="UseCompoundDrawables"
    android:id="@+id/custom_lin">

    <ImageView
        android:id="@+id/custom_img"
        android:layout_width="150dp"
        android:layout_height="200dp"
        android:scaleType="centerCrop"
        android:contentDescription="@string/todo" />

    <TextView
        android:id="@+id/custom_txt"
        android:layout_width="wrap_content"
        android:layout_height="wrap_content"
        android:layout_gravity="center"
        android:gravity="center"
        android:text="@string/test"
        android:layout_marginStart="15dp"/>

</LinearLayout>
```

**(b). activity_fullscreen.xml**

This will be the detail page for a single recycelrview item:

```xml
<?xml version="1.0" encoding="utf-8"?>
<LinearLayout xmlns:android="http://schemas.android.com/apk/res/android"
    xmlns:app="http://schemas.android.com/apk/res-auto"
    xmlns:tools="http://schemas.android.com/tools"
    android:layout_width="match_parent"
    android:layout_height="match_parent"
    tools:context=".FullScreen">

    <ImageView
        android:id="@+id/full_img"
        android:layout_width="match_parent"
        android:layout_height="match_parent"
        android:scaleType="fitXY"/>

</LinearLayout>
```

**(c). activity_main.xml**

This is the main activity layout. Simply add a recyclerview onto it:

```xml
<?xml version="1.0" encoding="utf-8"?>
<LinearLayout xmlns:android="http://schemas.android.com/apk/res/android"
    xmlns:app="http://schemas.android.com/apk/res-auto"
    xmlns:tools="http://schemas.android.com/tools"
    android:layout_width="match_parent"
    android:layout_height="match_parent"
    tools:context=".MainActivity"
    android:orientation="vertical">

    <androidx.recyclerview.widget.RecyclerView
        android:id="@+id/recyclerView"
        android:layout_width="match_parent"
        android:layout_height="wrap_content" />

</LinearLayout>
```

### Step 3: Create Data Model

The data model to represent a single item that will be rendered in each recyclerview row:

**DataModel.kt**

```kotlin
package arb.test.recyclerview

data class DataModel(val img :Int , val txt : String)
```

### Step 4: Create Recyclerview Adapter

To render items in a recyclerview you need an adapter class. This will inflate the custom layout and bind data to it:

**RecyyAdapter.kt**

```kotlin
import android.content.Context
import android.content.Intent
import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import android.widget.ImageView
import android.widget.LinearLayout
import android.widget.TextView
import androidx.recyclerview.widget.RecyclerView

class RecyAdapter(private val data:List<DataModel>,private val context:Context) : RecyclerView.Adapter<RecyAdapter.CustomViewHolder>() {

    inner class CustomViewHolder(parent:View):RecyclerView.ViewHolder(parent){

        val img = parent.findViewById<ImageView>(R.id.custom_img)
        val txt = parent.findViewById<TextView>(R.id.custom_txt)
        val layout = parent.findViewById<LinearLayout>(R.id.custom_lin)

    }

    override fun onCreateViewHolder(parent: ViewGroup, viewType: Int): CustomViewHolder {
        return CustomViewHolder(LayoutInflater.from(parent.context).inflate(R.layout.custom_recyclerview,parent,false))
    }

    override fun getItemCount(): Int = data.count()

    override fun onBindViewHolder(holder: CustomViewHolder, position: Int) {

        holder.img.setImageResource(data[position].img)
        holder.txt.text = data[position].txt

        holder.layout.setOnClickListener {
            val intent = Intent(context,FullScreen::class.java)
            intent.putExtra("imgID",data[position].img)
            context.startActivity(intent)
        }
    }
}
```

### Step 5: Create Detail Page

This is the detail page to be shown when a user clicks a single recyclerview :

**FullScreen.kt**

```kotlin
import androidx.appcompat.app.AppCompatActivity
import android.os.Bundle
import android.view.WindowManager
import kotlinx.android.synthetic.main.activity_full_screen.*

class FullScreen : AppCompatActivity() {

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        window.setFlags(WindowManager.LayoutParams.FLAG_FULLSCREEN,WindowManager.LayoutParams.FLAG_FULLSCREEN)
        setContentView(R.layout.activity_full_screen)

        full_img.setImageResource(intent.getIntExtra("imgID",R.drawable.test1))
    }
}
```

### Step 6: Create Main Activity

This is where you attach the recyclerview adapterto the recyclerview:

**MainActivity.kt**

```kotlin
import androidx.appcompat.app.AppCompatActivity
import android.os.Bundle
import androidx.recyclerview.widget.LinearLayoutManager
import androidx.recyclerview.widget.RecyclerView
import kotlinx.android.synthetic.main.activity_main.*

class MainActivity : AppCompatActivity() {

    val data = listOf(
        DataModel(R.drawable.test1,"Background 1") ,
        DataModel(R.drawable.test2,"Background 2") ,
        DataModel(R.drawable.test3,"Background 3") ,
        DataModel(R.drawable.test4,"Background 4") ,
        DataModel(R.drawable.test5,"Background 5") ,
        DataModel(R.drawable.test1,"Background 6") ,
        DataModel(R.drawable.test2,"Background 7") ,
        DataModel(R.drawable.test3,"Background 8") ,
        DataModel(R.drawable.test4,"Background 9") ,
        DataModel(R.drawable.test5,"Background 10") ,
        DataModel(R.drawable.test1,"Background 11") ,
        DataModel(R.drawable.test2,"Background 12") ,
        DataModel(R.drawable.test3,"Background 13") ,
        DataModel(R.drawable.test4,"Background 14") ,
        DataModel(R.drawable.test5,"Background 15") ,
        DataModel(R.drawable.test1,"Background 16") ,
        DataModel(R.drawable.test2,"Background 17") ,
        DataModel(R.drawable.test3,"Background 18") ,
        DataModel(R.drawable.test4,"Background 19") ,
        DataModel(R.drawable.test5,"Background 20") ,
        DataModel(R.drawable.test1,"Background 21") ,
        DataModel(R.drawable.test2,"Background 22") ,
        DataModel(R.drawable.test3,"Background 23") ,
        DataModel(R.drawable.test4,"Background 24") ,
        DataModel(R.drawable.test5,"Background 25")
    )

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_main)

        recyclerView.layoutManager = LinearLayoutManager(this)
        recyclerView.adapter = RecyAdapter(data,this)
    }
}
```

### Run

Run the project.

### Reference

Find download link below:

| No. | Link |
| --- | --- |
| 1. | [Download](https://github.com/alirezabashi98/RecyclerView/archive/refs/heads/master.zip) code |
| 2. | [Follow](https://github.com/alirezabashi98/) code author |

## Example 3. Android RecyclerView - Fill With ArrayList (Java)

_How to populate a recyclerview from an arraylist._

This is a simple RecyclerView and ArrayList tutorial.Here is what we do:

- Fill RecyclerView with data from a simple ArrayList.
- We derive from RecycelView.ViewHolder to get our custom viewholder class.
- We aslo derive from RecyclerView.Adapter to get our adapter class that helps us bind our data to our RecyclerView.
- We create a model layout using cardview that's inflated to a view item for our recyclerview.

##### What This Example Teaches

1. How to fill a recyclerview with an arraylist.
2. How to show cardviews in a recyclerview.
3. How to inflate a model layout into an java view item.

##### (a). Our View Holder Class

Holds our views for recycling.

```java

public class MyViewHolder extends RecyclerView.ViewHolder {

    TextView nameTxt;

    public MyViewHolder(View itemView) {
        super(itemView);

        nameTxt = (TextView) itemView.findViewById(R.id.nameTxt);

    }

}
```

##### (b). Our Adapter Class

Responisble for layout inflation. Initializes our View holder. Binds data to our views.

```java

public class MyAdapter extends RecyclerView.Adapter<MyViewHolder> {

    Context c;
    ArrayList<String> numbers;

    public MyAdapter(Context c, ArrayList<String> numbers) {
        this.c = c;
        this.numbers = numbers;
    }

    @Override
    public MyViewHolder onCreateViewHolder(ViewGroup parent, int viewType) {
        View v = LayoutInflater.from(c).inflate(R.layout.model, parent, false);
        return new MyViewHolder(v);
    }

    @Override
    public void onBindViewHolder(MyViewHolder holder, int position) {

        //BIND DATA
        holder.nameTxt.setText(numbers.get(position));

    }

    @Override
    public int getItemCount() {
        return numbers.size();
    }
}
```

##### (c). Our MainActivity

Launcher activity. References RecyclerView and sets its layout manager. Instantiates and sets our adapter to RecyclerView.

```java

public class MainActivity extends AppCompatActivity {

    ArrayList<String> numbers=new ArrayList<>();

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);

        //SETUP RECYCLER
        RecyclerView rv= (RecyclerView) findViewById(R.id.rv);
        rv.setLayoutManager(new LinearLayoutManager(this));

        //FILL LIST
        fillList();

        //adapter
        MyAdapter adapter=new MyAdapter(this,numbers);
        rv.setAdapter(adapter);

    }

    private void fillList()
    {
        for(int i=0;i<10;i++)
        {
            numbers.add("Number "+String.valueOf(i));
        }

    }
}
```

##### (d). Our Model XML Layout

- A single cardview in our recyclerview.
- Shall be inflated to a view item.

```xml
<?xml version="1.0" encoding="utf-8"?>
<android.support.v7.widget.CardView
    android_orientation="horizontal" android_layout_width="match_parent"

    android_layout_margin="10dp"
    card_view_cardCornerRadius="5dp"
    card_view_cardElevation="5dp"
    android_layout_height="200dp">

            <TextView
                android_layout_width="match_parent"
                android_layout_height="wrap_content"
                android_textAppearance="?android:attr/textAppearanceLarge"
                android_text="Name"
                android_id="@+id/nameTxt"
                android_padding="10dp"
                android_textColor="@color/colorAccent"
                android_textStyle="bold"
                android_layout_alignParentLeft="true"
                />

</android.support.v7.widget.CardView>
```

### 3\. Android RecyclerView - Fill With List Of Objects

In this tutorial we take a look at how to populate a recyclerView with list of objects.Our recycerview is going to consist of two textviews inside a cardview.

##### (a). Our build.gradle

-  Lets add two dependencies,support design and cardview in our buil.gradle(Module:app)

```groovy
dependencies {
    compile fileTree(dir: 'libs', include: ['*.jar'])
    testCompile 'junit:junit:4.12'
    compile 'com.android.support:appcompat-v7:24.0.0'
    compile 'com.android.support:design:24.0.0'
    compile 'com.android.support:cardview-v7:24.0.0'
}
```

##### (b). Our Model Class

- Is our data object representing a single Person object.

```java
package com.tutorials.hp.recyclerviewandobjects;

public class Person {

    int id;
    String name,country;

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

    public String getCountry() {
        return country;
    }

    public void setCountry(String country) {
        this.country = country;
    }
}
```

##### (c). Our MainActivity

Our launcher activity.

- We set our layoutmanager as well as our adapter instance to our RecyclerView.
- We fill our arraylist with data.

```java

public class MainActivity extends AppCompatActivity {

    ArrayList<Person> people=new ArrayList<>();

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);

        //RECYCLERVIEW
        RecyclerView rv= (RecyclerView) findViewById(R.id.rv);
        rv.setLayoutManager(new LinearLayoutManager(this));

        //FILL LIST
        fillPeople();

        //ADAPTER
        MyAdapter adapter=new MyAdapter(this,people);
        rv.setAdapter(adapter);

    }

    private void fillPeople()
    {
        people.clear();

        Person p=new Person();
        p.setName("Micky");
        p.setCountry("Armenia");
        people.add(p);

        p=new Person();
        p.setName("Nemanja");
        p.setCountry("Serbia");
        people.add(p);

        p=new Person();
        p.setName("Lucy");
        p.setCountry("Russia");
        people.add(p);

        p=new Person();
        p.setName("Rebecca");
        p.setCountry("South Africa");
        people.add(p);

        p=new Person();
        p.setName("Singh");
        p.setCountry("India");
        people.add(p);

        p=new Person();
        p.setName("Kurt");
        p.setCountry("France");
        people.add(p);

        p=new Person();
        p.setName("Vicente");
        p.setCountry("Spain");
        people.add(p);
    }
}
```

##### (d). Our ViewHolder class

Holds our textviews for recycling.

```java

public class MyViewHolder extends RecyclerView.ViewHolder {

    TextView nameTxt,countryTxt;

    public MyViewHolder(View itemView) {
        super(itemView);

        nameTxt= (TextView) itemView.findViewById(R.id.nameTxt);
        countryTxt= (TextView) itemView.findViewById(R.id.countryTxt);

    }

}
```

##### (e). Our Adapter class

- Responsible for layout inflation.
- Also binding data to our views

```java

public class MyAdapter extends RecyclerView.Adapter<MyViewHolder> {

    Context c;
    ArrayList<Person> people;

    public MyAdapter(Context c, ArrayList<Person> people) {
        this.c = c;
        this.people = people;
    }

    @Override
    public MyViewHolder onCreateViewHolder(ViewGroup parent, int viewType) {
        View v= LayoutInflater.from(c).inflate(R.layout.model,parent,false);
        return new MyViewHolder(v);
    }

    @Override
    public void onBindViewHolder(MyViewHolder holder, int position) {

        //BIND DATA
        holder.nameTxt.setText(people.get(position).getName());
        holder.countryTxt.setText(people.get(position).getCountry());

    }

    @Override
    public int getItemCount() {
        return people.size();
    }
}
```

##### (f). Model.xml

```xml
<?xml version="1.0" encoding="utf-8"?>
<android.support.v7.widget.CardView
    android_orientation="horizontal" android_layout_width="match_parent"

    android_layout_margin="10dp"
    card_view_cardCornerRadius="5dp"
    card_view_cardElevation="5dp"
    android_layout_height="200dp">

<LinearLayout
    android_orientation="vertical"
    android_layout_width="match_parent"
    android_layout_height="wrap_content">
    <TextView
        android_layout_width="match_parent"
        android_layout_height="wrap_content"
        android_textAppearance="?android:attr/textAppearanceLarge"
        android_text="Name"
        android_id="@+id/nameTxt"
        android_padding="10dp"
        android_textColor="@color/colorAccent"
        android_textStyle="bold"
        android_layout_alignParentLeft="true"
        />
    <TextView
        android_layout_width="match_parent"
        android_layout_height="wrap_content"
        android_textAppearance="?android:attr/textAppearanceLarge"
        android_text="Country"
        android_id="@+id/countryTxt"
        android_padding="10dp"
        android_textColor="@color/colorPrimary"
        android_textStyle="bold"
        android_layout_alignParentLeft="true"
        />
</LinearLayout>
</android.support.v7.widget.CardView>
```

##### (g). Download

GitHub : [Source](https://github.com/Oclemy/RecyclerView_and_Objects)

### 4\. Android RecyclerView CardView and OnItemClick

Hello android recyclerview onItemClick here, this is what we cover :

1. LinearLayout RecyclerView with cardview view items.
2. ViewHolder to hold our views.
3. Adapter where we inflate our layouts and bind data to views.
4. Handle ItemClicks for our RecyclerView,in which case we show a simple Toast message.

##### (a). Our MainActivity.

- Launcher activity.
- Setup RecyclerView with its LayoutManager and adapter
- Get data

```java
public class MainActivity extends AppCompatActivity {

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);

        //SET UP RECYCLERVIEW
        RecyclerView rv= (RecyclerView) findViewById(R.id.rv);
        rv.setLayoutManager(new LinearLayoutManager(this));

        //ADAPTER
        MyAdapter adapter=new MyAdapter(this,getData());
        rv.setAdapter(adapter);

    }

    //FILL DATA
    private ArrayList<String> getData()
    {
        ArrayList<String> languages=new ArrayList<>();
        languages.clear();

        //FILL
        languages.add("Java");
        languages.add("C#");
        languages.add("VB.NET");
        languages.add("PHP");
        languages.add("Python");
        languages.add("Ruby");
        languages.add("C");
        languages.add("C++");
        languages.add("Fortran");
        languages.add("Cobol");
        languages.add("Perl");
        languages.add("Prolog");

        return languages;
    }
}
```

##### (b). Our ViewHolder class.

Holds our views for recycling. Listen for View onClick events.

```java

public class MyViewHolder extends RecyclerView.ViewHolder implements View.OnClickListener {

    TextView nameTxt;
    ItemClickListener itemClickListener;

    public MyViewHolder(View itemView) {
        super(itemView);

        nameTxt= (TextView) itemView.findViewById(R.id.nameTxt);

        itemView.setOnClickListener(this);
    }

    public void setItemClickListener(ItemClickListener itemClickListener)
    {
        this.itemClickListener=itemClickListener;
    }

    @Override
    public void onClick(View view) {
        this.itemClickListener.onItemClick(this.getLayoutPosition());
    }
}
```

##### (c). Our Adapter class.

We inflate our layout. Then bind data to views.

```java

public class MyAdapter extends RecyclerView.Adapter<MyViewHolder> {

    Context c;
    ArrayList<String> languages;

    public MyAdapter(Context c, ArrayList<String> languages) {
        this.c = c;
        this.languages = languages;
    }

    @Override
    public MyViewHolder onCreateViewHolder(ViewGroup parent, int viewType) {
        View v= LayoutInflater.from(c).inflate(R.layout.model,parent,false);
        return new MyViewHolder(v);
    }

    @Override
    public void onBindViewHolder(MyViewHolder holder, int position) {

        //BIND DATA
        holder.nameTxt.setText(languages.get(position));

        //ITEM CLICK
        holder.setItemClickListener(new ItemClickListener() {
            @Override
            public void onItemClick(int pos) {
                Toast.makeText(c, languages.get(pos), Toast.LENGTH_SHORT).show();
            }
        });

    }

    @Override
    public int getItemCount() {
        return languages.size();
    }
}
```

##### (d). Our ItemClickListener Interface.

```java
public interface ItemClickListener {

    void onItemClick(int pos);

}
```

##### (e). Model.xml

- Our model layout.

```xml
<?xml version="1.0" encoding="utf-8"?>
<android.support.v7.widget.CardView
    android_orientation="horizontal" android_layout_width="match_parent"

    android_layout_margin="10dp"
    card_view_cardCornerRadius="5dp"
    card_view_cardElevation="5dp"
    android_layout_height="200dp">
            <TextView
                android_layout_width="match_parent"
                android_layout_height="wrap_content"
                android_textAppearance="?android:attr/textAppearanceLarge"
                android_text="Name"
                android_id="@+id/nameTxt"
                android_padding="10dp"
                android_textColor="@color/colorAccent"
                android_textStyle="bold"
                android_layout_alignParentLeft="true"
                />
</android.support.v7.widget.CardView>
```

##### Download

Download code below:

GitHub : **[Source](https://github.com/Oclemy/Simple_RecyclerView)**

## Example: Android RecyclerView- Images, Text and OnLongClick/OnLongPress

_Android RecyclerView Images and Text OnLongClickListener example._

How to show images and text and handle Longclick events in recyclerview in android. We first render text and images in cardview. The cardview then is the item view for the recyclerview. User long clicks to show a Toast message.

#### What is LongClick?

In PC world we are used to two types of events when working with your Microsoft Windows or Apple Macintosh Operating systesm. These are either clicking or right-clicking. Clicking is simply tapping. You click to open or initiate an action. On the other hand we right-click to show a context menu that normally has several options. Then the user can select the action whether is is opening or deleting document or any other file or starting a program.

Mobile devices these days even in the developing world are smartphones. These include samsung, infinix, iPhone, F7, Tecno, Oppo, HTC etc. These have a touch screen and no physical keyboard or mouse. Hence you cannot right click. Instead you can long click. Long click involves tapping but holding it longer than clicks.

Long clicking also most of the time get used to show a context menu. These types of menus normally allow us perform an action related to a given widget. You can also long click to select an item.

#### How to Work with a RecyclerView

To work with a RecyclerView, normally you start by adding a `RecyclerView` element in your layout:

```xml
    <android.support.v7.widget.RecyclerView
        android_layout_width="match_parent"
        android_layout_height="match_parent"
        android_id="@+id/mRecycler" />
```

In fact even before this, you want to make sure you had added a support library dependency in your app level `build.gradle`:

```gradle
    implementation 'com.android.support:design:23.2.1'
```

In your RecyclerView you will represent the views to be listed as view holder objects. These objects are instances of a class you define by extending RecyclerView.ViewHolder. Each view holder is in charge of displaying a single item with a view.

The view holder objects are managed by an adapter, which you create by extending RecyclerView.Adapter. The adapter creates view holders as needed. The adapter also binds the view holders to their data

The RecyclerView fills itself with views provided by a layout manager that you provide.

#### An Example

Let's write a simple RecyclerView example. This recyclerview will comprise cardviews.

- Android RecyclerView with CardViews.
- LongClick a cardview and show a simple toast with data item in that card.
- CardViews shall consist of image and text.
- We handle onLongPress or onLongClick events and get the OnClick position.
- We are able to get recyclerview adapter position and show clicked item in a Toast message.

Let's start.

#### Section 1 : Build.Gradle

No special dpendencies are used in this project.

#### Section 1 : Movie Class

Then we come to our data object. This is our POJO class and represents a single Movie.

The Movie will have properties like name and image.

```java

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

We've created a public class called `Movie`. That class has two fields or properties: `name` and `image`. Those fields are private hence cannot be accessed by outside classes. So then how do we assign them values, or even get their values? Well that's where our public constructor and getter accessor methods come in.

Instantiating the `Movie` class will cause the instantiater to pass us the name and image via constructor. Then the getter methods can return us the name and image.

#### Section 1 : ItemLongClickListener Interface

We will now come and create a simple interface that will act as the signature for our LongClickListener. Remember we are interested in listening to long click events for our RecyclerView.

The `onItemLongClick` will be taking a View object and an integer, the position of the clicked item. That method is an abstract one, meaning it doesn't have a body yet. Hence the implementer of the interface will have to provide their implementations.

```java
public interface ItemLongClickListener {

    void onItemLongClick(View v,int pos);

}
```

#### Section 2 : ViewHolder class

Here's our Viewholder class. This class will

- Holds our View Items for Recycling.
- Implements View.OnClickListener.

```java

public class MyHolder extends RecyclerView.ViewHolder implements View.OnLongClickListener {

    ImageView img;
    TextView nameTxt;
    ItemLongClickListener itemLongClickListener;

    public MyHolder(View itemView) {
        super(itemView);

        img= (ImageView) itemView.findViewById(R.id.movieImage);
        nameTxt= (TextView) itemView.findViewById(R.id.nameTxt);

        itemView.setOnLongClickListener(this);

    }

    public void setItemLongClickListener(ItemLongClickListener ic)
    {
        this.itemLongClickListener=ic;
    }

    @Override
    public boolean onLongClick(View v) {
        this.itemLongClickListener.onItemLongClick(v,getLayoutPosition());
        return false;
    }
}
```

You can see our `MyHolder` class is extending the `RecycerView.ViewHolder` class. This will make our class a view holder class. A view holder class is a class responsible for temporarily holding widgets for the adapter to recycle those views. This dramatically improves performance as inflation then occurs only once. Then subsequently the widgets are recycled. Deriving from that class has forced us to provide a constructor that takes a View object and passing it to the `super` class.

We've made our `MyHolder` class implement our `View.OnLongClickListener` interface. That is the interface that normally has to be implemented suppose you want ti listen to long click events of any view. So we are listening to our `MyHolder`'s long click events.

#### Section 3 : Adapter class

Then we have our Adapter class as well. As our RecycerView adapter class, this class has to derive from `RecyclerView.Adapter<T>`.

Moreover it will perform the following tasks:

- Inflates our Layout.
- Binds our dataset.

```java

public class MyAdapter extends RecyclerView.Adapter<MyHolder> {

    Context c;
    ArrayList<Movie> movies;

    public MyAdapter(Context c, ArrayList<Movie> movies) {
        this.c = c;
        this.movies = movies;
    }

    //INITIALIZE PUR HOLDER
    @Override
    public MyHolder onCreateViewHolder(ViewGroup parent, int viewType) {
        View v= LayoutInflater.from(parent.getContext()).inflate(R.layout.model,parent,false);
        MyHolder holder=new MyHolder(v);
        return holder;
    }

    //BIND DATA TO VIEWS
    @Override
    public void onBindViewHolder(MyHolder holder, int position) {
        holder.nameTxt.setText(movies.get(position).getName());
        holder.img.setImageResource(movies.get(position).getImage());

        holder.setItemLongClickListener(new ItemLongClickListener() {
            @Override
            public void onItemLongClick(View v, int pos) {
                Toast.makeText(c,movies.get(pos).getName(),Toast.LENGTH_SHORT).show();
            }
        });
    }

    @Override
    public int getItemCount() {
        return movies.size();
    }
}
```

Our `MyAdapter` class is our adapter class. In this case we specifically use the `RecyclerView.Adapter<MyHolder>` as we are working with recyclerview. Deriving from that class will force us to override several methods as we've done. Those method include the `getCount()` which will return the number of movies to be displayed in our recyclerview. Then `onCreateViewHolder` is where we inflate our `model` layout into a view object. To inflate we've used the usual culprit, the LayoutInflater class. The inflater view has then been passed to the `MyHolder`, Eventually that method returns the `MyHolder` instance.

Then `onBindViewHolder` is where we bind data. First our View holder is passed to us to allow us to reference the various widgets it is holding. In our case those widgets are an imageview and a textview. Then we've also set the lonclick listener to our `MyHolder`, then provided the event handler. In our case we simply show a toast message when our recyclerview item is long clicked.

#### Section 1 : MainActivity

Then we come to our MainActivity. This class is deriving from our `AppCompatActivity`.

This class is our launcher activity. We will set our RecyclerView layout manager here as well as the RecyclerView adapter.

Moreover we generate our data set.

```java

public class MainActivity extends AppCompatActivity {

    RecyclerView rv;
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

        rv= (RecyclerView) findViewById(R.id.mRecycler);
        adapter=new MyAdapter(this,getMovies());

        //SET RV PROPERTIES
        rv.setLayoutManager(new LinearLayoutManager(this));
        rv.setItemAnimator(new DefaultItemAnimator());

        //ADAPTER
        rv.setAdapter(adapter);

    }

    private ArrayList<Movie> getMovies() {
        //COLECTION OF MOVIES
        ArrayList<Movie> movies=new ArrayList<>();

        Movie movie=new Movie("BlackList",R.drawable.red);

        //ADD ITR TO COLLECTION
        movies.add(movie);

        movie=new Movie("Ghost Rider",R.drawable.rider);
        movies.add(movie);

        movie=new Movie("Fruts",R.drawable.fruits);
        movies.add(movie);

        movie=new Movie("Breaking Bad",R.drawable.breaking);
        movies.add(movie);

        movie=new Movie("Crisis",R.drawable.crisis);
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

Our main activity has inherited from the AppCompatActivity. That has then turned it into an [activity](https://camposha.info/android/activity). Hence you have to make sure that it is registered in the android manifest. In our main activity we've maintained a recyclerview as well as an adapter. Then we have two methods, the `onCreate()` and the `getMovies()`. `onCreate()` is a callback method for activity class. It gets raised when the activity is being created. In it we will first set our content view, which basically involves passing our layout to the `setContentView` method. Then we've referenced our ToolBar via `findViewById` then used it as our action bar. We've also referenced the Floating Action Button.

Not only that but we've referenced our recyclerview from our layout file, then set it's adapter. That adapter is the instance of `MyAdapter` class. We've also set the layout manager as well as the item animator to our recyclerview.

Then the `getMovies()` is responsible for populating an arraylist with some movies and tv shows that can be watched. That arraylist will then be the data source for our recyclerview.

#### Section 1 : ContentMain.xml

Our `content_main.xml` layout. We add our RecyclerView here. We'll wrap it with a [RelativeLayout](https://camposha.info/android/relativelayout). Make sure you assign the recyclerview an id. That id is it's identifier and will be used to reference our recycler in the java code.

- Holds our RecyclerView.

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
    tools_context="com.tutorials.hp.recyclerlongclick.MainActivity"
    tools_showIn="@layout/activity_main">

    <android.support.v7.widget.RecyclerView
        android_layout_width="match_parent"
        android_layout_height="match_parent"
        android_id="@+id/mRecycler" />
</RelativeLayout>
```

#### Section 2 : Model Layout

This layout will define the view to be inflated in our RecylerView.Adapter subclass.

Basically this view will be a CardView in our case.

- To be inflated to a view item.
- CardView with image and text.

At the root we have a cardview with card corner radius as well as card elevation set. Inside it we will have an imageview, textviews and checkbox.

```xml
<?xml version="1.0" encoding="utf-8"?>
<android.support.v7.widget.CardView
    android_id="@+id/mCard"
    android_orientation="horizontal"
    android_layout_width="match_parent"

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

## Example: Android RecyclerView - Images Text - Handle ItemClicks

Hey guys.In this tutorial we look at how to display images and text in a RecyclerView then handle ItemClicks.

- First we populate images and text from an arraylist to our RecyclerView.
- We'll have a few classes : MyHolder tha extends RecyclerView.ViewHolder class.Its going to hold our imageview and textview for recycling.
- Our MyAdapter class is going to derive from RecyclerView.Adapter and its going to adapt our data to our views.
- The full source code is above for download.

![Android RecyclerView Images Text](https://image.ibb.co/eOHzaa/Recycler_View_Images_Text.png)

## How to Run

- Download the project above.
- You'll get a zipped file,extract it.
- Open the Android Studio.
- Now close, already open project
- From the Menu bar click on **File >New> Import Project**
- Now Choose a Destination Folder, from where you want to import project.
- Choose an Android Project.
- Now Click on “**OK**“.
- Done, your done importing the project,now edit it.

### Our Layouts

#### ActivityMain.xml

- To hold our ContentMain xml layout.

```xml
<?xml version="1.0" encoding="utf-8"?>
<android.support.design.widget.CoordinatorLayout

    android_layout_width="match_parent"
    android_layout_height="match_parent"
    android_fitsSystemWindows="true"
    tools_context="com.tutorials.hp.recylcerviewclick.MainActivity">

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

#### ContentMain.xml

- Our Activity's Content Layout.
- Shall have our RecyclerView.

```xml
<?xml version="1.0" encoding="utf-8"?>
<RelativeLayout

    android:layout_width="match_parent"
    android:layout_height="match_parent"
    android:paddingBottom="@dimen/activity_vertical_margin"
    android:paddingLeft="@dimen/activity_horizontal_margin"
    android:paddingRight="@dimen/activity_horizontal_margin"
    android:paddingTop="@dimen/activity_vertical_margin"
    app:layout_behavior="@string/appbar_scrolling_view_behavior"
    tools:context="com.tutorials.hp.recylcerviewclick.MainActivity"
    tools:showIn="@layout/activity_main">
    <android.support.v7.widget.RecyclerView
        android:id="@+id/myRecycler"
        android:layout_width="wrap_content"
        android:layout_height="wrap_content"
        class="android.support.v7.widget.RecyclerView" />
</RelativeLayout>
```

#### Model.xml

- Our model layout.
- We inflate this to our RecyclerView viewitems.
- At the root we have a CardView.

```xml
<?xml version="1.0" encoding="utf-8"?>
<android.support.v7.widget.CardView
    android:orientation="horizontal" android:layout_width="match_parent"

    android:layout_margin="5dp"
    card_view:cardCornerRadius="10dp"
    card_view:cardElevation="5dp"
    android_layout_height="match_parent">
    <RelativeLayout
        android:layout_width="match_parent"
        android:layout_height="match_parent">
        <ImageView
            android:layout_width="wrap_content"
            android:layout_height="wrap_content"
            android:id="@+id/playerImage"
            android:padding="10dp"
            android:src="@drawable/herera" />
        <TextView
            android:layout_width="wrap_content"
            android:layout_height="wrap_content"
            android:textAppearance="?android:attr/textAppearanceLarge"
            android:text="Name"
            android:id="@+id/nameTxt"
            android:padding="10dp"
            android:layout_alignParentTop="true"
            android:layout_toRightOf="@+id/playerImage" />
        <TextView
            android:layout_width="wrap_content"
            android:layout_height="wrap_content"
            android:textAppearance="?android:attr/textAppearanceMedium"
            android:text="Position"
            android:id="@+id/posTxt"
            android:padding="10dp"
            android:layout_alignBottom="@+id/playerImage"
            android:layout_alignParentRight="true" />
    </RelativeLayout>
</android.support.v7.widget.CardView>
```

### Our Classes

We have these classes and interfaces :

#### ItemClickListener Interface

ItemClick Listener interface. Contains one abstract method method onItemClick().

```java

import android.view.View;
public interface ItemClickListener {
    void onItemClick(View v,int pos);
}
```

#### MyHolder

Our ViewHolder class. Extends RecyclerView.ViewHolder.Shall hold our TextView and ImageView.Implements View.OnClickListener.

```java
/**
 * OUR HOLDER CLASS
 */
public class MyHolder extends RecyclerView.ViewHolder implements View.OnClickListener {
    //VIEWS
    ImageView img;
    TextView nameTxt;
    TextView posTxt;
    ItemClickListener itemClickListener;
    public MyHolder(View itemView) {
        super(itemView);
        //ASSIGNING VIEWS
        img= (ImageView) itemView.findViewById(R.id.playerImage);
        nameTxt= (TextView) itemView.findViewById(R.id.nameTxt);
        posTxt= (TextView) itemView.findViewById(R.id.posTxt);
        itemView.setOnClickListener(this);
    }
    //WHEN CLICKED
    @Override
    public void onClick(View v) {
        this.itemClickListener.onItemClick(v,getLayoutPosition());
    }

    //SHALL BE CALLED OUTSIDE
    public void serItemClickListener(ItemClickListener ic)

    {
        this.itemClickListener=ic;
    }
}
```

#### MyAdapter

To adapt our dataset to the corresponding views. We inflate our Model.xml layout here.

```java
public class MyAdapter extends RecyclerView.Adapter<MyHolder> {
    //PROPERTIES
    Context c;
    String[] players;
    String[] positions;
    int[] imgs;

    //CONSTRUCTOR
    public MyAdapter(Context ctx,String[] names,String[] positions,int[] images)

    {
        //ASSIGN THEM AFTER BEING PASSED IN
        this.c=ctx;
        this.players=names;
        this.positions=positions;
        this.imgs=images;
    }

    //WHEN VIEWHOLDER IS BEING CREATED
    @Override
    public MyHolder onCreateViewHolder(ViewGroup parent, int viewType) {
        //INFLATE XML AND HOLD IN VIEW
        View v= LayoutInflater.from(parent.getContext()).inflate(R.layout.model,null);
        //HOLDER
        MyHolder holder=new MyHolder(v);
        return holder;
    }

    //DATA IS BOUND TO VIEWS
    @Override
    public void onBindViewHolder(MyHolder holder, final int position) {
        holder.img.setImageResource(imgs[position]);
        holder.nameTxt.setText(players[position]);
        holder.posTxt.setText(positions[position]);
        //SET THE ITEM CLICK LISTENER
        holder.serItemClickListener(new ItemClickListener() {
            @Override
            public void onItemClick(View v, int pos) {
                Snackbar.make(v,players[position]+" : "+positions[position],Snackbar.LENGTH_SHORT).show();
            }

        });

    }
    //TOTAL NUM OF ITEMS
    @Override
    public int getItemCount() {
        return players.length;
    }
}
```

#### MainActivity

Our launcher activity. We have a simple array that acts as our data source. We reference our RecyclerView from xml layout by its id. We then set its layout manager as well as its adapter.

```java

public class MainActivity extends AppCompatActivity {
    //DATA SOURCE
    String[] names={"Ander Herera","David De Gea","Michael Carrick","Juan Mata","Diego Costa","Oscar"};
    String[] positions={"Midfielder","GoalKeeper", "Midfielder","Playmaker","Striker","Playmaker"};
    int[] images={R.drawable.herera,R.drawable.degea,R.drawable.carrick,R.drawable.mata,R.drawable.costa,R.drawable.oscar};

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);
        Toolbar toolbar = (Toolbar) findViewById(R.id.toolbar);
        setSupportActionBar(toolbar);

        FloatingActionButton fab = (FloatingActionButton) findViewById(R.id.fab);
        fab.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View view) {
                Snackbar.make(view, "Replace with your own action", Snackbar.LENGTH_LONG)
                        .setAction("Action", null).show();
            }
        });

        //GET RECYCLER
        RecyclerView rv= (RecyclerView) findViewById(R.id.myRecycler);
        //SET LAYOUT
        rv.setLayoutManager(new LinearLayoutManager(this));
        rv.setItemAnimator(new DefaultItemAnimator());
        //ADAPTER
        MyAdapter adapter=new MyAdapter(this,names,positions,images);
        rv.setAdapter(adapter);
    }
    @Override
    public boolean onCreateOptionsMenu(Menu menu) {
        // Inflate the menu; this adds items to the action bar if it is present.
        getMenuInflater().inflate(R.menu.menu_main, menu);
        return true;
    }

    @Override
    public boolean onOptionsItemSelected(MenuItem item) {
        // Handle action bar item clicks here. The action bar will
        // automatically handle clicks on the Home/Up button, so long
        // as you specify a parent activity in AndroidManifest.xml.
        int id = item.getItemId();
        //noinspection SimplifiableIfStatement
        if (id == R.id.action_settings) {
            return true;
        }
        return super.onOptionsItemSelected(item);
    }
}
```

- Visit our [channel](https://www.youtube.com/channel/UCpdkWp2zh5Qv1ZWlnqswdCw) for more examples like these.
- Lets share tips and ideas in our [Facebook Page.](https://web.facebook.com/oclemmy/)

Oclemy,Cheers.

## Example: Android RecyclerView – StaggeredGrid With Images and Text

_This is an android recyclerview staggered grid example with images and text._

RecyclerView normally is quite flexible when it comes to how it positions views it is rendering.

There are three in-built layouts it uses to position data:

1. LinearLayout.
2. GridLayout.
3. StaggeredGridLayout.

Let's see how to use the StaggeredGridLayout.

#### 1\. Create Basic Activity Project

1. First create an empty project in android studio. Go to File --> New Project.
2. Type the application name and choose the company name.
3. Choose minimum SDK.
4. Choose Basic activity.
5. Click Finish.

#### 2\. Add Dependencies

No special depedencies are needed for this project

#### 3\. Create User Interface

User interfaces are typically created in android using XML layouts as opposed by direct java coding.

Here are our layouts for this project:

##### (a). activity_main.xml

This layout gets inflated to MainActivity user interface.It includes the content_main.xml.

```xml
<?xml version="1.0" encoding="utf-8"?>
<android.support.design.widget.CoordinatorLayout

    android_layout_width="match_parent"
    android_layout_height="match_parent"
    android_fitsSystemWindows="true"
    tools_context="com.tutorials.hp.staggeredgridrecycler.MainActivity">

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

This layout gets included in your activity_main.xml. Add a RecyclerView here.

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
    tools_context="com.tutorials.hp.staggeredgridrecycler.MainActivity"
    tools_showIn="@layout/activity_main">

    <android.support.v7.widget.RecyclerView
        android_id="@+id/myRecycler"
        android_layout_width="wrap_content"
        android_layout_height="wrap_content"
        class="android.support.v7.widget.RecyclerView" />
</RelativeLayout>
```

##### model.xml

RecyclerView Staggered Grid model.

```xml
<?xml version="1.0" encoding="utf-8"?>
<android.support.v7.widget.CardView
    android_orientation="horizontal" android_layout_width="match_parent"

    android_layout_margin="5dp"
    card_view_cardCornerRadius="10dp"
    card_view_cardElevation="5dp"

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
            android_layout_below="@+id/movieImage"
            android_layout_alignParentLeft="true"
             />

        <TextView
            android_layout_width="wrap_content"
            android_layout_height="wrap_content"
            android_textAppearance="?android:attr/textAppearanceLarge"
            android_text=" John Doe a former FBI Agent and now Physics teacher .is wrongly accussed of murdering an innocent child.He makes it his business to find the bad guys who did taht.
            He's convinces hacker Aram to join him.....
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

    </RelativeLayout>
</android.support.v7.widget.CardView>
```

#### 4\. Java Classes

##### (a). TVShow.java

Our data object.

```java

public class TVShow {

    private String name,description;
    private int image;

    public TVShow(String name, String description, int image) {
        this.name = name;
        this.description = description;
        this.image = image;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public int getImage() {
        return image;
    }

    public void setImage(int image) {
        this.image = image;
    }
}
```

##### (b). ItemClickListener.java

Our ItenClick listener interface.

```java
package com.tutorials.hp.staggeredgridrecycler;

import android.view.View;

public interface ItemClickListener {

    void onItemClick(View v,int pos);
}
```

##### (c). MyHolder.java

Our RecyclerView.ViewHolder class.

```java
public class MyHolder extends RecyclerView.ViewHolder implements View.OnClickListener {

    ImageView img;
    TextView nameTxt,desc;
    ItemClickListener itemClickListener;

    public MyHolder(View itemView) {
        super(itemView);

        nameTxt= (TextView) itemView.findViewById(R.id.nameTxt);
        desc= (TextView) itemView.findViewById(R.id.descTxt);
        img= (ImageView) itemView.findViewById(R.id.movieImage);

        itemView.setOnClickListener(this);
    }

    public void setItemClickListener(ItemClickListener ic)
    {
        this.itemClickListener=ic;
    }

    @Override
    public void onClick(View v) {
        this.itemClickListener.onItemClick(v,getLayoutPosition());
    }
}
```

##### (d). MyAdapter.java

Our RecyclerView.Adapter class.

```java
public class MyAdpter extends RecyclerView.Adapter<MyHolder> {

    Context c;
    ArrayList<TVShow> tvShows;

    public MyAdpter(Context c, ArrayList<TVShow> tvShows) {
        this.c = c;
        this.tvShows = tvShows;
    }

    //INITIALIZING OUR HOLDER
    @Override
    public MyHolder onCreateViewHolder(ViewGroup parent, int viewType) {
        View v= LayoutInflater.from(parent.getContext()).inflate(R.layout.model,null);
        MyHolder holder=new MyHolder(v);
        return holder;
    }

    //BIND DATA TO VIEWS
    @Override
    public void onBindViewHolder(MyHolder holder, int position) {
        holder.nameTxt.setText(tvShows.get(position).getName());
        holder.desc.setText(tvShows.get(position).getDescription());
        holder.img.setImageResource(tvShows.get(position).getImage());

        holder.setItemClickListener(new ItemClickListener() {
            @Override
            public void onItemClick(View v, int pos) {
                Snackbar.make(v,tvShows.get(pos).getName(),Snackbar.LENGTH_SHORT).show();
            }
        });

    }

    //TOTAL NUM OF MOVIES
    @Override
    public int getItemCount() {
        return tvShows.size();
    }
}
```

##### (e). MainActivity.java

Our Main Activity.

```java

public class MainActivity extends AppCompatActivity {

    RecyclerView rv;
    MyAdpter adapter;

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

        rv= (RecyclerView) findViewById(R.id.myRecycler);

        //SET LAYOUT
        rv.setLayoutManager(new StaggeredGridLayoutManager(2,1));
        rv.setItemAnimator(new DefaultItemAnimator());

        //ADAPTER
        adapter=new MyAdpter(this,getTVShows());
        rv.setAdapter(adapter);

    }
    private ArrayList<TVShow> getTVShows() {
        ArrayList<TVShow> tvShows=new ArrayList<>();
        String desc=" John Doe a former FBI Agent and now Physics teacher .is wrongly accussed of murdering an innocent child.....";
        TVShow tv=new TVShow("BLACKLIST",desc,R.drawable.blacklist);
        tvShows.add(tv);

        desc=" Jack Gruller Doe a former FBI Agent and now Physics teacher .is wrongly accussed of murdering an innocent child.He makes it his business to find the bad guys who did taht.After having eveaded the officers for more than a decade,he finds himself again in trouble.He has to do everthing to confirm himesl as clean. He's convinces hacker Aram to join him.....";
        tv=new TVShow("Breaking Bad",desc,R.drawable.breaking);
        tvShows.add(tv);

        desc=" Joe Spike a former FBI Agent and now Physics teacher .is wrongly accussed of murdering an innocent child.He makes it his business to find the bad guys who did taht. He's convinces hacker Aram to join him.....";
        tv=new TVShow("Ghost Rider",desc,R.drawable.ghost);
        tvShows.add(tv);

        desc=" John Mo a former FBI Agent and now Physics teacher .is wrongly accussed of murdering an innocent child.He makes it his business to find the bad guys who did taht. He's convinces hacker Aram to join him.....";
        tv=new TVShow("Game Of Thrones",desc,R.drawable.thrones);
        tvShows.add(tv);

        desc=" Curt Foe a former FBI Agent and now Physics teacher .is wrongly accussed of murdering an innocent child.He makes it his business to find the bad guys who did taht. He's convinces hacker Aram to join him.....";
        tv=new TVShow("Men In Black",desc,R.drawable.meninblack);
        tvShows.add(tv);

        return tvShows;
    }
}
```

## Example: Android Master Detail RecyclerView Images Text

Android Master Detail Example with RecyclerView.The RecyclerView shall comprise CardViews with images and text.We work with two activities.

#### Intro

We are going to have two views or activities,the Master View and the Detail View. The Master View shall be the Master Activity. It shall be responsible for displaying a List of data.

The component of choice is recyclerView. The data shall be images and text. When clicked,we open the Detail Activity and pass the data via intents. We display those data in the detail activity.

We have a video tutorial for this example below.You can also view the demo over there. We've used Android Studio as our IDE. The full source code is above for download.The instructions for importing to your android studio is below.

#### Tools Used

- IDE : Android Studio
- OS : Windows 8

#### How to Run

- Download the project above.
- You'll get a zipped file,extract it.
- Open the Android Studio.
- Now close, already open project
- From the Menu bar click on **File >New> Import Project**
- Now Choose a Destination Folder, from where you want to import project.
- Choose an Android Project.
- Now Click on “**OK**“.
- Done, your done importing the project,now edit it.

The full source code reference is available above for download.If you prefer a step by step tutorial then watch our video tutorial at the bottom of this page.

![RecyclerView Master View](https://github.com/Oclemy/MasterDetailRecyclerView/raw/master/demos/RecyclerView.PNG)

#### 1\. Build.Gradle(App)

No special depdendencies are needed.

#### 2\. DetailActivity

Then here's our detail activity.It shall receive data passed via intent object. It shall then display that data :

```java

public class DetailActivity extends AppCompatActivity {

    TextView nameTxt;
    ImageView img;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_detail);
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

        //INITIALIZE VIEWS
        nameTxt= (TextView) findViewById(R.id.nameTxtDetail);
        img= (ImageView) findViewById(R.id.spacecraftImageDetail);

        //RECEIVE DATA
        Intent i=this.getIntent();
        String name=i.getExtras().getString("NAME_KEY");
        int image=i.getExtras().getInt("IMAGE_KEY");

        //BIND DATA
        nameTxt.setText(name);
        img.setImageResource(image);
    }

}
```

#### 3\. RecyclerView Adapter

- We are suing recyclerView as our component of choice,here's our RecyclerView adapter.
- It derives from RecyclerView.Adapter.
- We pass it a Context and ArrayList as our parameters.
- We override three methods : onCreateViewHolder,onBindViewHolder and getItemCount.

```java
public class MyAdapter extends RecyclerView.Adapter<MyHolder> {

    Context c;
    ArrayList<SpaceCraft> spaceCrafts;

    public MyAdapter(Context c, ArrayList<SpaceCraft> spaceCrafts) {
        this.c = c;
        this.spaceCrafts = spaceCrafts;
    }

    @Override
    public MyHolder onCreateViewHolder(ViewGroup parent, int viewType) {
        View v= LayoutInflater.from(parent.getContext()).inflate(R.layout.model,parent,false);
        return new MyHolder(v);
    }

    @Override
    public void onBindViewHolder(MyHolder holder, int position) {
        final String name=spaceCrafts.get(position).getName();
        final int image=spaceCrafts.get(position).getImage();

        //BIND DATA
        holder.nameTxt.setText(name);
        holder.img.setImageResource(image);

        holder.setItemClickListener(new ItemClickListener() {
            @Override
            public void onItemClick(int pos) {
                openDetailActivity(name,image);
                Toast.makeText(c,name,Toast.LENGTH_SHORT).show();
            }
        });

    }

    @Override
    public int getItemCount() {
        return spaceCrafts.size();
    }

    private void openDetailActivity(String name,int image)
    {
        Intent i=new Intent(c, DetailActivity.class);

        //PACK DATA TO SEND
        i.putExtra("NAME_KEY",name);
        i.putExtra("IMAGE_KEY",image);

        //open activity
        c.startActivity(i);

    }
}
```

#### 4\. MainActivity

- Here's our MainActivity class,our launcher activity in this case.
- We reference our RecyclerView by its id from our xml layout.
- We instantiate our adapter.
- We set the layoutmanager to the recyclerview and set its adapter.

```java
public class MainActivity extends AppCompatActivity {

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);
        Toolbar toolbar = (Toolbar) findViewById(R.id.toolbar);
        setSupportActionBar(toolbar);

        RecyclerView rv= (RecyclerView) findViewById(R.id.rv);
        rv.setLayoutManager(new LinearLayoutManager(this));

        MyAdapter adapter=new MyAdapter(this, SpaceCraftsCollection.getSpaceCrafts());
        rv.setAdapter(adapter);
    }

}
```

#### How To Run

1. Download the project.
2. You'll get a zipped file,extract it.
3. Open the Android Studio.
4. Now close, already open project.
5. From the Menu bar click on File >New> Import Project.
6. Now Choose a Destination Folder, from where you want to import project.
7. Choose an Android Project.
8. Now Click on “OK“.
9. Done, your done importing the project,now edit it.

#### More Resources

| Resource | Link |
| --- | --- |
| GitHub Browse | [Browse](https://github.com/Oclemy/MasterDetailRecyclerView) |
| GitHub Download Link | [Download](https://github.com/Oclemy/MasterDetailRecyclerView/archive/master.zip) |

Good day.
