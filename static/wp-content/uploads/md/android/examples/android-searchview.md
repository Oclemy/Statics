# SearchView Tutorial and Examples


Hi guys. In this tutorial we will look at how to search filter data in android. We use primarily a searchview widget. We render data in various adapterviews like listview and recyclerview. We look at various examples.

Languages used:

1. Kotlin
2. Java


# Concept 1: Android SearchView Tutorial and Examples

## Example 1: Android Simple ListView – Search/Filter

_Android Simple ListView Search/Filter Tutorial and Example._

How to search or filter a simple ListView in android.

Google search engine is the most visited website in the whole world. This tells us something about us humans and our need to always search and filter through information.

The worldwide web is really vast, and we cannot be able to use it conveniently by just remembering website urls or going through portals to find the content we want.

Instead we simply search. Now today we are not developing another search engine. Instead we look at a simple example in android, how to search through a list using searchview. Call it search or filter, but we find the information we want by typing it in the searchview. SearchView is a widget that was added to android in API 11.

It provides s imple edittext where user can enter a query and submit it to the search provider. For us we simply search through a simple listview using searchview.

![](https://image.prntscr.com/image/giA4o_JLQIWHQn_85dbCSw.png)

#### Common Questions this example explores

- Android SearchView example.
- How to search a simple listview in android.
- Android SearchView arrayadapter example.
- How to search/filter in android.

This example was written with the following tools:

- Windows 8.1
- Eclipse IDE
- Java Language
- Bluestacks Emulator

Lets have a look at the source code.

#### MainActivity.java

**Our MainActivity Class**

Purpose :

1. Reference our ListView and SearchView from xml
2. Bind our data to ListView using ArrayAdapter.
3. Handle our SearchView's onQueryTextChangeListener.
4. Filter or Search dynamically

```java
package com.tutorials.simplelistviewfilter;

import android.os.Bundle;
import android.app.Activity;
import android.view.Menu;
import android.widget.ArrayAdapter;
import android.widget.ListView;
import android.widget.SearchView;
import android.widget.SearchView.OnQueryTextListener;

public class MainActivity extends Activity {

  ListView lv;
  SearchView sv;

    String[] teams={"Man Utd","Man City","Chelsea","Arsenal","Liverpool","Totenham"};
  ArrayAdapter<String> adapter;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);

        lv=(ListView) findViewById(R.id.listView1);
        sv=(SearchView) findViewById(R.id.searchView1);

        adapter=new ArrayAdapter<String>(this, android.R.layout.simple_list_item_1,teams);
        lv.setAdapter(adapter);

        sv.setOnQueryTextListener(new OnQueryTextListener() {

      @Override
      public boolean onQueryTextSubmit(String text) {
        // TODO Auto-generated method stub
        return false;
      }

      @Override
      public boolean onQueryTextChange(String text) {

               adapter.getFilter().filter(text);

        return false;
      }
    });
    }

    @Override
    public boolean onCreateOptionsMenu(Menu menu) {
        // Inflate the menu; this adds items to the action bar if it is present.
        getMenuInflater().inflate(R.menu.main, menu);
        return true;
    }

}
```

#### ActivityMain.xml

**Our ActivityMain layout**

Purpose

1. Basically display whatever widgets we want to use,in this case ListView and SearchView.

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
        android_layout_width="match_parent"
        android_layout_height="wrap_content"
        android_layout_alignParentLeft="true"
        android_layout_alignParentTop="true"
        android_queryHint="Search.."
         >

    </SearchView>

    <ListView
        android_id="@+id/listView1"
        android_layout_width="match_parent"
        android_layout_height="wrap_content"
        android_layout_alignParentLeft="true"
        android_layout_below="@+id/searchView1"
        android_layout_marginTop="22dp" >
    </ListView>

</RelativeLayout>
```

#### Video/Demo

[YouTube Video](https://www.youtube.com/watch?v=c9yC8XGaSv4)

#### How To Run

1. This project was created by Eclipse.
2. Therefore just copy the code and use in your project in android studio, it's still android anyway and expandableListview is the same regardless of the IDE. So copy paste the code to your android studio project.

## Example 2: Android Custom RecyclerView with Images and Text Search/Filter

_Android Custom RecyclerView with Images and Text Search/Filter._

This is an android tutorial to explore how to search or filter a recyclerview with images and text.

The RecyclerView will comprise CardViews so it is the CardViews that we will be filtering.

We use SearchView to input our search terms thus allowing us search in realtime.

Let's go.

#### 1\. Create Basic Activity Project

1. First create a new project in android studio. Go to File --> New Project.
2. Type the application name and choose the company name. ![New Project Dialog](https://camposha.info/wp-content/uploads/android/new_project.png)
3. Choose minimum SDK. ![Choose minimum SDK](https://camposha.info/wp-content/uploads/android/choose_minimum_sdk.png)
4. Choose Basic activity. ![Choose Empty Activity](https://camposha.info/wp-content/uploads/android/basic_activity.png)
5. Click Finish. ![Finish](https://camposha.info/wp-content/uploads/android/finish.png)

Basic activity will have a toolbar and floating action button already added in the layout

Normally two layouts get generated with this option:

| No. | Name | Type | Description |
| --- | --- | --- | --- |
| 1. | activity_main.xml | XML Layout | Will get inflated into MainActivity Layout.Typically contains appbarlayout with toolbar.Also has a floatingactionbutton. |
| 2. | content_main.xml | XML Layout | Will be included into activity_main.xml.You add your views and widgets here. |
| 3. | MainActivity.java | Class | Main Activity. |

#### 2\. Build.Gradle(App level)

We are not sung any special library.

#### 3\. Create User Interface

Here are our layouts for this project:

##### (a). activity_main.xml

- This layout gets inflated to MainActivity user interface.
- It includes the content_main.xml.

Here are some of the widgets, views and viewgroups that get employed"

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

#### 4\. Player.java

This is our data object. Our POJO class.

This class represents a single Player.

```java
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

#### 5\. ItemClickListener.java

This an interface to define for us our event handler signature.

```java
public interface ItemClickListener {

    void onItemClick(View v,int pos);
}
```

#### 6\. MyHolder.java

This is a ViewHolder class.

It will hold our inflated `model.xml` as a view object for recycling. This View will be used by the `MyAdapter` class.

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

This class will derive from `android.widget.Filter` class.

This is the class that will search our data.

```java
package com.tutorials.hp.customrecyclerfiltering;

import android.widget.Filter;

import java.util.ArrayList;

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

This is our main activity. It derives from `android.app.Activity`.

This activity will use the inflated `activity_main.xml` as the UI view.

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

#### Download

| Resource | Link |
| --- | --- |
| GitHub Browse | [Browse](https://github.com/Oclemy/CustomRecyclerViewFiltering) |

## ToolBar SearchBar

There are two ways in which you can achieve a toolbar search. First you can simply place a searchview in your toolbar layout. Then reference the searchview and use it as normal.

Second you can use a variety of searchview libraries like the Material SearchBar Library. We will see this in the next example.

## Example 3: Kotlin Android – Search/Filter ListView with SearchView

_This is a Kotlin android SearchView and ListView example. We see how to search/filter a simple ListView._

Users can simply type the search word or term and we search filter a listview.

We are using Kotlin as our programming language. We hold our data in a simple array.

But first let's introduce some terms.

#### What is a MaterialSearchBar?

MaterialSearchBar is a beautiful and easy to use library will help to add Lollipop Material Design SearchView in your project.

#### Full Example

Let's look at Code

#### How the App Works.

First we will have a [ListView](https://camposha.info/android/listview) and MaterialSearchBar in our layouts. Then we will reference them in our java code using the `findViewById` function.

```kotlin
    val lv = findViewById(R.id.mListView) as ListView
    val searchBar = findViewById(R.id.searchBar) as MaterialSearchBar
```

Normally `findViewById` returns a view object which we can then cast to the specific widget using the `as` keyword.

Then we will create a simple array using the `arrayOf()` function. This will act as our data store or source.

```kotlin
        var galaxies = arrayOf("Sombrero", "Cartwheel", ....)
```

Then will prepare an adapter. In this case we use an arrayadapter as we are working with a simple array as the data source we will be searching.

```kotlin
        val adapter = ArrayAdapter<String>(this, android.R.layout.simple_list_item_1, galaxies)
        lv.setAdapter(adapter)
```

We will search our listview by listening to `TextChange` events on our searchbar. First we `addTextChangeListener`, then handle our events using three callback methods:

1. `beforeTextChanged`
2. `onTextChanged` - This is where we filter our adapter.
3. `afterTextChanged`

```kotlin
            searchBar.addTextChangeListener(object : TextWatcher {
            override fun beforeTextChanged(charSequence: CharSequence, i: Int, i1: Int, i2: Int) {

            }

            override fun onTextChanged(charSequence: CharSequence, i: Int, i1: Int, i2: Int) {
                //SEARCH FILTER
                adapter.getFilter().filter(charSequence)
            }

            override fun afterTextChanged(editable: Editable) {

            }
        })
```

We will finally listen to listview click events after searching:

```kotlin
           lv.setOnItemClickListener(object : AdapterView.OnItemClickListener {
            override fun onItemClick(adapterView: AdapterView<*>, view: View, i: Int, l: Long) {
                Toast.makeText(this@MainActivity, adapter.getItem(i)!!.toString(), Toast.LENGTH_SHORT).show()
            }
        })
```

Let's start coding.

#### 1\. Gradle Scripts

##### (a). build.gradle(app)

We will add MaterialSearchBar(`com.github.mancj:MaterialSearchBar:0.7.1`) as an implementation statement in our app level `build.gradle`.

Take note we are using kotlin so we will apply the `kotlin-android` plugin as well as the `com.android.application`.

```groovy
apply plugin: 'com.android.application'

apply plugin: 'kotlin-android'

apply plugin: 'kotlin-android-extensions'

android {
    compileSdkVersion 28
    defaultConfig {
        applicationId "com.devosha.kotlinlistviewsearchbar"
        minSdkVersion 16
        targetSdkVersion 28
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
    implementation 'com.android.support:appcompat-v7:28.0.0-alpha3'
    implementation 'com.android.support.constraint:constraint-layout:1.1.2'
    testImplementation 'junit:junit:4.12'
    implementation 'com.android.support:design:28.0.0-alpha3'
    implementation 'com.github.mancj:MaterialSearchBar:0.7.1'
}
```

#### 2\. Layouts

##### (a). `activity_main.xml`

Let's add a MaterialSearchBar xml element and a [ListView](https://camposha.info/android/listview).

We are wrapping them in a LinearLayout with a vertical orientation.

```xml
<?xml version="1.0" encoding="utf-8"?>
<LinearLayout

    android_layout_width="match_parent"
    android_layout_height="match_parent"
    android_orientation="vertical"
    tools_context=".MainActivity">

    <com.mancj.materialsearchbar.MaterialSearchBar
        app_mt_speechMode="true"
        app_mt_hint="Custom hint"
        app_theme="@style/AppTheme.PopupOverlay"
        app_mt_maxSuggestionsCount="5"
        android_layout_width="match_parent"
        android_layout_height="wrap_content"
        android_id="@+id/searchBar" />
    <ListView
        android_id="@+id/mListView"
        android_layout_width="match_parent"
        android_layout_height="match_parent">
    </ListView>

</LinearLayout>
```

#### 3\. Kotlin Code

We write our code in Kotlin programming language.

##### (a). `MainActivity.kt`

Let's look at our main [activity](https://camposha.info/android/activity).

```kotlin
package com.devosha.kotlinlistviewsearchbar

import android.support.v7.app.AppCompatActivity
import android.os.Bundle
import android.support.v7.widget.Toolbar
import android.widget.Toast
import android.widget.AdapterView
import android.text.Editable
import android.text.TextWatcher
import android.view.View
import android.widget.ArrayAdapter
import android.widget.ListView
import com.mancj.materialsearchbar.MaterialSearchBar

class MainActivity : AppCompatActivity() {

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_main)

        //REFERENCE MATERIALSEARCHBAR AND LISTVIEW
        val lv = findViewById(R.id.mListView) as ListView
        val searchBar = findViewById(R.id.searchBar) as MaterialSearchBar
        searchBar.setHint("Search..")
        searchBar.setSpeechMode(true)

        var galaxies = arrayOf("Sombrero", "Cartwheel", "Pinwheel", "StarBust", "Whirlpool", "Ring Nebular", "Own Nebular", "Centaurus A", "Virgo Stellar Stream", "Canis Majos Overdensity", "Mayall's Object", "Leo", "Milky Way", "IC 1011", "Messier 81", "Andromeda", "Messier 87")

        //ADAPTER
        val adapter = ArrayAdapter<String>(this, android.R.layout.simple_list_item_1, galaxies)
        lv.setAdapter(adapter)

        //SEARCHBAR TEXT CHANGE LISTENER
        searchBar.addTextChangeListener(object : TextWatcher {
            override fun beforeTextChanged(charSequence: CharSequence, i: Int, i1: Int, i2: Int) {

            }

            override fun onTextChanged(charSequence: CharSequence, i: Int, i1: Int, i2: Int) {
                //SEARCH FILTER
                adapter.getFilter().filter(charSequence)
            }

            override fun afterTextChanged(editable: Editable) {

            }
        })

        //LISTVIEW ITEM CLICKED
        lv.setOnItemClickListener(object : AdapterView.OnItemClickListener {
            override fun onItemClick(adapterView: AdapterView<*>, view: View, i: Int, l: Long) {
                Toast.makeText(this@MainActivity, adapter.getItem(i)!!.toString(), Toast.LENGTH_SHORT).show()
            }
        })

        //end

    }
}
```

Here are our results:

![](https://camposha.info/wp-content/uploads/source/searchview/kotlin-searchview-listview1-188x300.png) ![](https://camposha.info/wp-content/uploads/source/searchview/kotlin-searchview-listview2-187x300.png)

# Search History

Let's see how to show search history using a beautiful material searchview library.

## Android Material SearchView and History

_Android Material SearchView and History Tutorial and Example._

- Here the purpose is to programmatically open search,close and show search suggestions while searching.
- The search occurs in a nice fragment.
- We use a Material SearchView library.

#### Build.gradle

First we add the Material SearchView library.

```groovy
apply plugin: 'com.android.application'

android {
    compileSdkVersion 24
    buildToolsVersion "24.0.1"

    defaultConfig {
        applicationId "com.tutorials.hp.materialsearchgridview"
        minSdkVersion 15
        targetSdkVersion 24
        versionCode 1
        versionName "1.0"
    }
    buildTypes {
        release {
            minifyEnabled false
            proguardFiles getDefaultProguardFile('proguard-android.txt'), 'proguard-rules.pro'
        }
    }
}

dependencies {
    compile fileTree(dir: 'libs', include: ['*.jar'])
    testCompile 'junit:junit:4.12'
    compile 'com.android.support:appcompat-v7:24.1.1'
    compile 'com.android.support:design:24.1.1'
    compile 'br.com.mauker.materialsearchview:materialsearchview:1.1.0'
}
```

Second we create a package called br.com.mauker as below and the following class :

```java
package br.com.mauker;

public class MsvAuthority {
    public static final String CONTENT_AUTHORITY = "br.com.mauker.materialsearchview.searchhistorydatabase";
}
```

#### MainActivity.java

Here's our MainActivity class :

```java
package com.tutorials.hp.materialsearchgridview;

import android.os.Bundle;
import android.support.design.widget.FloatingActionButton;
import android.support.v7.app.AppCompatActivity;
import android.support.v7.widget.Toolbar;
import android.view.View;

import br.com.mauker.materialsearchview.MaterialSearchView;

public class MainActivity extends AppCompatActivity {

   MaterialSearchView msv;
    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);
        Toolbar toolbar = (Toolbar) findViewById(R.id.toolbar);
        setSupportActionBar(toolbar);
        FloatingActionButton fab = (FloatingActionButton) findViewById(R.id.fab);

        msv= (MaterialSearchView) findViewById(R.id.msv);
        msv.addSuggestions(new String[]{"Casini","Andromeda","Europa","Voyager","Spitzer","Hubble"});

        fab.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View view) {
                msv.openSearch();

            }
        });
    }

    @Override
    public void onBackPressed() {
       if(msv.isOpen())
       {
           msv.closeSearch();
       }else
       {
           super.onBackPressed();
       }
    }
}
```

#### activity_main.xml

Then in our layout we add Material searchView as below :

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
    tools_context="com.tutorials.hp.materialsearchgridview.MainActivity"
    tools_showIn="@layout/activity_main">

    <br.com.mauker.materialsearchview.MaterialSearchView
        android_id="@+id/msv"
        android_layout_width="match_parent"
        android_layout_height="match_parent"/>
</RelativeLayout>
```

For more details and demo,check the video tutorial below : [https://www.youtube.com/watch?v=fspKA0xWHxc](https://www.youtube.com/watch?v=fspKA0xWHxc)

# Concept 2: Android Material SearchBar Tutorial and Examples

**Concept 2: Android Material SearchBar Tutorial and Examples**

_[MaterialSearchBar](https://github.com/mancj/MaterialSearchBar) is a beautiful and easy to use library will help to add Lollipop Material Design SearchView in your project._

Let's look at the installation.

#### Installation

Add this code to the the project level `build.gradle` file. We are registering the `jitpack.io` as our repository under the repositories DSL.

```groovy
allprojects {
    repositories {
        ...
        maven { url "https://jitpack.io" }
    }
}
```

Then add the dependency to the the app level build.gradle file

```groovy
    implementation 'com.github.mancj:MaterialSearchBar:0.7.6'
```

Then in your layout add:

```xml
<com.mancj.materialsearchbar.MaterialSearchBar
        style="@style/MaterialSearchBarLight"
        app_mt_speechMode="true"
        app_mt_hint="Custom hint"
        app_mt_maxSuggestionsCount="10"
        android_layout_width="match_parent"
        android_layout_height="wrap_content"
        android_id="@+id/searchBar" />
```

Here's a simple example:

```java
private List<String> lastSearches;
private MaterialSearchBar searchBar;

@Override
protected void onCreate(Bundle savedInstanceState) {
    super.onCreate(savedInstanceState);
    setContentView(R.layout.activity_main);

    searchBar = (MaterialSearchBar) findViewById(R.id.searchBar);
    searchBar.setHint("Custom hint");
    searchBar.setSpeechMode(true);
    //enable searchbar callbacks
    searchBar.setOnSearchActionListener(this);
    //restore last queries from disk
    lastSearches = loadSearchSuggestionFromDisk();
    searchBar.setLastSuggestions(list);
    //Inflate menu and setup OnMenuItemClickListener
    searchBar.inflateMenu(R.menu.main);
    searchBar.getMenu().setOnMenuItemClickListener(this);
}

@Override
protected void onDestroy() {
    super.onDestroy();
    //save last queries to disk
    saveSearchSuggestionToDisk(searchBar.getLastSuggestions());
}

@Override
public void onSearchStateChanged(boolean enabled) {
    String s = enabled ? "enabled" : "disabled";
    Toast.makeText(MainActivity.this, "Search " + s, Toast.LENGTH_SHORT).show();
}

@Override
public void onSearchConfirmed(CharSequence text) {
    startSearch(text.toString(), true, null, true);
}

@Override
public void onButtonClicked(int buttonCode) {
    switch (buttonCode){
        case MaterialSearchBar.BUTTON_NAVIGATION:
            drawer.openDrawer(Gravity.LEFT);
            break;
        case MaterialSearchBar.BUTTON_SPEECH:
            openVoiceRecognizer();
    }
}
```

You can find more examples [here](https://github.com/mancj/MaterialSearchBar/tree/master/app/src/main/java/com/mancj/example).

#### **How MaterialSearchBar Works**

Let's examine in detail the internal details of MaterialSearchBar.

Internally MaterialSearchBar library has 4 public classes:

| No. | Class | Role |
| --- | --- | --- |
| 1. | SuggestionsAdapter.java | A base class adapter for MaterialSearchBar.Can be used to customize the suggestionslist of MaterialSearchBar. |
| 2. | DefaultSuggestionsAdapter.java | Default adapter for suggestions. |
| 3. | SimpleOnSearchActionListener.java | Listens to Search state,search confirmation and search button click events |
| 4. | MaterialSearchBar.java | Used to search/filter. |

##### 1\. SuggestionsAdapter - How it Works

Here's the role of this class:

| No. | Role |
| --- | --- |
| 1. | We use this class to customize the suggestion list of MaterialSearchBar. |

This class is defined in the `com.mancj.materialsearchbar.adapter` package:

```java
package com.mancj.materialsearchbar.adapter;
```

This class is an abstract class:

```java
public abstract class SuggestionsAdapter<S, V extends RecyclerView.ViewHolder>..{}
```

And derives from `RecyclerView.Adapter`:

```java
public abstract class SuggestionsAdapter<S, V extends RecyclerView.ViewHolder> extends RecyclerView.Adapter<V>{}
```

In the above generic parameters, `S` is the parameter type of your suggestions model while `V` is the ViewHolder.

First and foremost, the `SuggestionsAdapter` defines three internal fields:

1. The first is an ArrayList for holding suggestions.This ArrayList is privately instantiated.
2. The second is a private declaration of Layout Inflater class. This LayoutInflater object will hold a LayoutInflater instance that will be passed as a parameter via the Constructor.
3. The last is a protected Integer which sets the maximum suggestions count to `5`.

######## Creating SuggestionsAdapter. The SuggestionsAdapter is an abstract class and can be created by inheriting from it and passing a LayoutInflater instance via the super call.

```java
public class MySuggestionsAdapter extends SuggestionsAdapter<String, MySuggestionsAdapter.SuggestionHolder> {
    public MySuggestionsAdapter(LayoutInflater inflater) {
            super(inflater);
        }
    ....
    }
```

#### SuggestionsAdapter Mutation methods.

These are methods for manipulating suggestions like adding, setting, deleting and clearing.

| No. | Method | Responsibility |
| --- | --- | --- |
| 1. | `addSuggestion(S r)` | Where `S` is the type of suggestion model.This method will add the Suggestion into Suggestions list and call `notifyDatasetChanged()`. |
| 2. | `setSuggestions(List<S> suggestions)` | This method will set the passed list as our Suggestions List and call `notifyDatasetChanged()`. |
| 3. | `deleteSuggestion(int postion, S r)` | This method will delete the passed suggestion and call `notifyItemRemoved(postion)`. |
| 4. | `clearSuggestions()` | This method will clear all the suggestions and call `notifyDataSetChanged()`. |

##### SuggestionsAdapter Configuration Methods.

| No. | Method | Responsibility |
| --- | --- | --- |
| 1. | `setMaxSuggestionsCount(int maxSuggestionsCount)` | Sets the maximum suggestions integer to our private `maxSggestionsCount` variable. |
| 2. | `int getMaxSuggestionsCount()` | Retrieves the `maxSggestionsCount` value. |
| 3. | `LayoutInflater getLayoutInflater()` | Protected method to retrieve the LayoutInflater field. |
| 4. | `int getSingleViewHeight()` | An abstract method to return the height of a single view item in the list.All view items must have same height. |
| 5. | `int getListHeight()` | This method calculates the total height of the lists displayed: `getItemCount() * getSingleViewHeight()` |

##### SuggestionsAdapter click events

SuggestionsAdapter remember is basically RecyclerView.Adapter and takes a RecyclerView.ViewHolder as a generic parameter.

It therefore internally first override recyclerview.adapter methods.

Then defines an interface to hold our Click event signatures:

| No. | Method |
| --- | --- |
| 1. | `OnItemClickListener(int position,View v)` |
| 2. | `OnItemDeleteListener(int position,View v)` |

#### **2\. DefaultSuggestionAdapter**

This is also defined in the adapter package:

```java
package com.mancj.materialsearchbar.adapter;
```

This is a class concrete class:

```java
public class DefaultSuggestionsAdapter..{}
```

That is basically a child of the SuggestionsAdapter:

```java
public class DefaultSuggestionsAdapter extends SuggestionsAdapter<String, DefaultSuggestionsAdapter.SuggestionHolder> {
}
```

##### Creating DefaultSuggestionsAdapter

We create this class by instantiating and passing in a LayoutInflater object, then invoke the super contructor method of the parent SuggestionsAdapter class:

```java
public DefaultSuggestionsAdapter(LayoutInflater inflater) {
        super(inflater);
    }
```

#### Mutation and Configuration Methods

This class basically inherits the Mutation anc Configuration methods defined in the parent SuggestionsAdapter class.

#### SuggestionsHolder

DefaultSuggestionsAdapter defines an inner `SuggestionsHolder` class which is basically a Recycler.ViewHolder class.

The SuggestionsHolder contains a TextView and an ImageView for deleting the text.

It then listens to the TextView click and Delete ImageView click events.

#### 3\. SimpleOnSearchActionListener

This class is defined in the package `com.mancj.materialsearchbar`:

```java
package com.mancj.materialsearchbar;
```

It is an abstract class;

```java
public abstract class SimpleOnSearchActionListener..{}
```

That implements `MaterialSearchBar.OnSearchActionListener` interface:

```java
public abstract class SimpleOnSearchActionListener implements MaterialSearchBar.OnSearchActionListener {}
```

This class overrides three methods:

```java
@Override
    public void onSearchStateChanged(boolean enabled) {

    }

    @Override
    public void onSearchConfirmed(CharSequence text) {

    }

    @Override
    public void onButtonClicked(int buttonCode) {

    }
```

#### **4\. MaterialSearchBar class**

MaterialSearchBar is a class that derives from [RelativeLayout](https://camposha.info/android/relativelayout).

```java
public class MaterialSearchBar extends RelativeLayout..{}
```

MaterialSearchBar implements several interfaces:

```java
public class MaterialSearchBar extends RelativeLayout implements View.OnClickListener,
        Animation.AnimationListener, SuggestionsAdapter.OnItemViewClickListener,
        View.OnFocusChangeListener, TextView.OnEditorActionListener {}
```

#### Creating MaterialSearchBar

MaterialSearchBar defines three public constructor methods for it's creation:

| No. | Method | Responsibility |
| --- | --- | --- |
| 1. | `MaterialSearchBar(Context context, AttributeSet attrs)` |
| 2. | `MaterialSearchBar(Context context, AttributeSet attrs, int defStyleAttr)` |
| 3. | `MaterialSearchBar(Context context, AttributeSet attrs, int defStyleAttr, int defStyleRes)` For use in LOLLIPOP and above. |

All these contructor methods internally call the super class constructor.

They then call an internal `init()` method which does several functions among the following:

| No. | Role |
| --- | --- |
| 1. | First Inflate the searchbar layout. |
| 2. | Create a TypedArray that using the Context obtains MaterialSearchBar styles. |
| 3. | Then obtain the various attributes from that TypedArray and assign them to instance fields like searchIcon Resource ID,navIcon Resource ID, hint String,placeholder Text,maxSuggestionsCount int,speechMode boolean, hint color,text color and navButtonEnabled boolean. |
| 4. | It will then check if the SuggestionsAdapter is null and if so instantiate the DefaultSuggetionsAdapter. |
| 5. | It will set the Click Listener of this adapter to the instance of this class. |
| 6. | It will then set the maximum suggestions count to what was obtained from the resource. |
| 7. | It will create an internal RecyclerView and set our defaultSuggestionsAdapter as its adapter and LinearLayoutManager as the LayoutManager. |
| 8. | Then several widgets used by the MaterialSearchBar will be referenced by their IDs. These include the searchIcon ImageView, arrowIcon Imagevoew, searchEdit editText, placeHolder textView, inputContainer LinearLayout and navIcon n ImageView. |
| 9. | OnClick Listeners will then be set to the arrowIcon, navIcon and searchIcon as `this`. |
| 10. | Then FocusChangeListener and EditorActionListener will be set on searchEditText. |

#### MaterialSearchBar Menus

MaterialSearchBars can have menus. The `MaterialSearchBar` class defines a public method that allows us simply pass the menu resource to be inflated.

```java
void inflateMenu(int menuResource)
```

What happens internally is that if the menu resource is found, first we'll reference a menuIcon imageview, set it's parameters and set it as visible.

Then an onClickListner event listener will be attached to it.

If clicked we'll instantiate a PopupMenu, passing in the Context and menuIcon, inflate the popupMenu from menuResource and set it to `Gravity.Right`.

To get the menu you simply call `getMenu()` which returns the PopupMenu.

#### Enabling and Disabling Search

MaterialSearchBar allows us enable and disable search.

These can simply be done by calls to methods:

1. `enableSearch()` - To enable search.
2. `disableSearch()` - To disable search.

Let's see how these work under the hood:

##### Enabling Search

Enabling Search basically means showing search input edittext and close arrow icon.

The first thing that happens when the `enableSearch()` is invoked is that `adapter.NotifyDataSetChanged()` is called to refresh the SuggestionsAdapter.

Then a `searchEnabled` instance private variable is set to `true`. This is important because that variable is used by several methods to determine whether search is enabled or not.

Then two animations are loaded, fade in left and fade out left.And an AnimationListener event is set to fade in left animation.

The placeHolder is then hidden and instead the inputContainer is set visible. The fade in left animation is set to the inputContainer.

#### Disabling Search.

Disabling search is hiding the search input and closing the arrow.

For disabling search we do the roughly the opposite of the `enableSearch`.

First we set `searchEnabled` to false. Load the two animations.

Then set the AnimationLister on fade out left.

Then set the searchIcon to visible.

Set the fade out animation to the inputContainer.

#### Showing, Hiding and Clearing Suggestions Lists.

| No. | Method | Description |
| --- | --- | --- |
| 1. | `showSuggestionsList()` | Shows suggestions list with animations. |
| 2. | `hideSuggestionsList()` | Shows suggestions list with animations. |
| 2. | `clearSuggestions()` | Clears suggestions with animations.Also clears them in the SuggestionsAdapter. |

#### Public Methods

Here are some public methods for MaterialSearchBar:

1. addTextChangeListener(TextWatcher textWatcher)
2. clearSuggestions()
3. disableSearch()
4. enableSearch()
5. getLastSuggestions()
6. getMenu()
7. getText()
8. hideSuggestionList()
9. inflateMenu(int menuResource)
10. inflateMenu(int menuResource, int icon)
11. isSearchEnabled()
12. isSpeechModeEnabled()
13. isSuggestionsVisible()
14. setArrowIcon(int arrowIconResId)
15. setArrowIconTint(int arrowIconTint)
16. setCardViewElevation(int elevation)
17. setClearIcon(int clearIconResId)
18. setClearIconTint(int clearIconTint)
19. setCustomSuggestionAdapter(SuggestionsAdapter suggestionAdapter)
20. setDividerColor(int dividerColor)
21. setHint(CharSequence hintText)
22. setIconRippleStyle(boolean borderlessRippleEnabled)
23. setLastSuggestions(List suggestions)
24. setMaxSuggestionCount(int maxSuggestionsCount)
25. setMenuDividerEnabled(boolean menuDividerEnabled)
26. setMenuIcon(int menuIconResId)
27. setMenuIconTint(int menuIconTint)
28. setNavButtonEnabled(boolean navButtonEnabled)
29. setNavIconTint(int navIconTint)
30. setOnSearchActionListener(OnSearchActionListener 31.
31. onSearchActionListener)
32. setPlaceHolder(CharSequence placeholder)
33. setPlaceHolderColor(int placeholderColor)
34. setRoundedSearchBarEnabled(boolean roundedSearchBarEnabled)
35. setSearchIcon(int searchIconResId)
36. setSearchIconTint(int searchIconTint)
37. setSpeechModeEnabled(boolean speechMode)
38. setSuggestionsClickListener(SuggestionsAdapter.OnItemViewClickListener listener)
39. setText(String text)
40. setTextColor(int textColor)
41. setTextHighlightColor(int highlightedTextColor)
42. setTextHintColor(int hintColor)
43. showSuggestions()
44. updateLastSuggestions(List suggestions)

## Example 1: MaterialSearchBar SImple Example

_Android Material SearchBar Tutorial and Example._

- How to use a Material SearchView inside a Searchbar and show search history.
- The user can select search history as suggestions instead of typing again.
- In this case we stored the search history in a simple arraylist.

#### Build.gradle

First we need Material SearchView library :

```groovy
dependencies {
    compile fileTree(dir: 'libs', include: ['*.jar'])
    testCompile 'junit:junit:4.12'
    compile 'com.android.support:appcompat-v7:24.2.0'
    compile 'com.android.support:design:24.2.0'
    compile 'com.github.mancj:MaterialSearchBar:0.3.1'
}
```

#### activity_main.xml

We also add the material searchbar in our layout :

```xml
<?xml version="1.0" encoding="utf-8"?>
<android.support.design.widget.CoordinatorLayout

    android_layout_width="match_parent"
    android_layout_height="match_parent"
    android_fitsSystemWindows="true"
    tools_context="com.tutorials.hp.materialsearch.MainActivity">

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
        <com.mancj.materialsearchbar.MaterialSearchBar
            app_speechMode="true"
            app_hint="Search hint"
            app_theme="@style/AppTheme.PopupOverlay"
            app_maxSuggestionsCount="10"
            android_layout_width="match_parent"
            android_layout_height="wrap_content"
            android_id="@+id/searchBar" />

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

#### MainActivity.java

Here's our MainActivity class :

```java

public class MainActivity extends AppCompatActivity implements MaterialSearchBar.OnSearchActionListener {

    private MaterialSearchBar searchBar;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);
        Toolbar toolbar = (Toolbar) findViewById(R.id.toolbar);
        setSupportActionBar(toolbar);

        searchBar = (MaterialSearchBar) findViewById(R.id.searchBar);
        searchBar.setHint("Custom hint");
        searchBar.setSpeechMode(true);
        searchBar.setOnSearchActionListener(this);

    }

    @Override
    public void onSearchStateChanged(boolean b) {
        String state = b ? "enabled" : "disabled";
        Toast.makeText(MainActivity.this, "Search " + state, Toast.LENGTH_SHORT).show();
    }

    @Override
    public void onSearchConfirmed(CharSequence charSequence) {
        Toast.makeText(this,"Searching "+ charSequence.toString()+" ......",Toast.LENGTH_SHORT).show();
    }

    @Override
    public void onButtonClicked(int i) {
        switch (i){
            case MaterialSearchBar.BUTTON_NAVIGATION:
                Toast.makeText(MainActivity.this, "Button Nav " , Toast.LENGTH_SHORT).show();
                break;
            case MaterialSearchBar.BUTTON_SPEECH:
                Toast.makeText(MainActivity.this, "Speech " , Toast.LENGTH_SHORT).show();
        }
    }
}
```

For more details,The Youtube tutorial is below : [https://www.youtube.com/watch?v=pZVQVsfWVg8](https://www.youtube.com/watch?v=pZVQVsfWVg8)

## Example 2: Android Material ToolBar SearchBar – Filter/Search GridView

_Android Material ToolBar SearchBar/SearchView Example - How to filter search a simple GridView._

It's true we have looked at several searchview examples previously. However, we have been using the ordinary searchview that we normally display in our content section.

A more popular approach is using a searchview/searchbar placed in the toolbar or appbar of our activity. It's what we look at in this example. We use a toolbar searchbar to search/filter our simple GridView.

### Screenshot

- Here's the screenshot of the project.

Android ToolBar SearchBar

![Android ToolBar SearchBar](https://github.com/Oclemy/SearchBarGridView/blob/master/demos/SearchBarGridView.png?raw=true) Android ToolBar Material SearchBar Project Structure ![Android ToolBar Material SearchBar](https://github.com/Oclemy/SearchBarGridView/blob/master/demos/ProjectStructure.png?raw=true)

# Common Questions this example explores

- Android Material ToolBar SearchBar example.
- Android Filter Search a GridView.

# Tools Used

This example was written with the following tools:

- Windows 8
- AndroidStudio IDE
- Genymotion Emulator
- Language : Java
- Topic : Material SearchBar, ToolBar SearchBar, GridView Search Filter

# Libaries Used

- We use Material SearchBar library [https://github.com/mancj/MaterialSearchBar](https://github.com/mancj/MaterialSearchBar) by Mansur.

## Source Code

Lets jump directly to the source code.

### Build.Gradle Project Level

- Our project level build.gradle.
- We add repositories for fetching our dependencies here.
- The dafult,jccenter() is already specified.
- However, we add the maven and specify the url we'll use to fetch our Material SearchBar here.

```groovy
// Top-level build file where you can add configuration options common to all sub-projects/modules.

buildscript {
    repositories {
        jcenter()
    }
    dependencies {
        classpath 'com.android.tools.build:gradle:2.3.3'

        // NOTE: Do not place your application dependencies here; they belong
        // in the individual module build.gradle files
    }
}

allprojects {
    repositories {
        jcenter()
        maven { url "https://jitpack.io" }

    }
}

task clean(type: Delete) {
    delete rootProject.buildDir
}
```

### Build.Gradle App Level

- Our app level build.gradle file.
- We specify compilesdk,minimum sdk,target sdk and dependencies.
- Note that the minimum sdk must be API level 16 Jelly bean for us to use the Material Searchbar library that we use here.
- We also add dependencies using 'compile' statement.
- Our activity shall derive from the appCompatActivity to make it target earlier android versions.
- We also specify design support library.
- Finally we add the com.github.mancj:MaterialSearchBar which is a third party library we'll use to display Material Searchbar.
- You then sync the project.

```groovy
apply plugin: 'com.android.application'

android {
    compileSdkVersion 26
    buildToolsVersion "26.0.0"
    defaultConfig {
        applicationId "com.tutorials.hp.searchbargridview"
        minSdkVersion 16
        targetSdkVersion 25
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
    compile fileTree(dir: 'libs', include: ['*.jar'])
    compile 'com.android.support:appcompat-v7:25.3.1'
    compile 'com.android.support.constraint:constraint-layout:1.0.0-alpha7'
    compile 'com.android.support:design:25.3.1'
    compile 'com.github.mancj:MaterialSearchBar:0.7.1'
}
```

### MainActivity.java

- Our MainActivity class.
- Derives from AppCompatActivity which is a Base class for activities that use the support library action bar features.
- Methods: onCreate().
- Inflated From activity_main.xml using the setContentView() method.
- This method is responsible for filtering/searching a gridview via a material serahcbar displayed inside a toolbar.
- The views we use are Material Searchbar for searching and GridView to be searched.
- Reference MaterialSearchBar and GridView from our layout specification using findViewById().
- Instantiate adapter and set it to GridView.
- Add TextChangeListener to MaterialSearchBar and use arrayadapter instance to filter data.

```java
public class MainActivity extends AppCompatActivity {

    /*
    - When activity is created.
     */
    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);
        Toolbar toolbar = (Toolbar) findViewById(R.id.toolbar);
        setSupportActionBar(toolbar);

        //INITIALIZE GRIDVIEW AND MATERIAL SEARCHBAR
        GridView gv= (GridView) findViewById(R.id.mGridView);
        MaterialSearchBar searchBar = (MaterialSearchBar) findViewById(R.id.searchBar);
        searchBar.setHint("Search..");
        searchBar.setSpeechMode(true);

        List<String> galaxies=new ArrayList<>();
        galaxies.add("Cartwheel");
        galaxies.add("Whirlpool");
        galaxies.add("Andromeda I");
        galaxies.add("Andromeda II");
        galaxies.add("Sombrero");
        galaxies.add("Messier 81");
        galaxies.add("Messier 87");
        galaxies.add("Canis Majos Over-density");
        galaxies.add("Messier 92");
        galaxies.add("Black Eye");
        galaxies.add("Centaurus A");
        galaxies.add("Centaurus B");
        galaxies.add("Milky Way");
        galaxies.add("IC 1011");
        galaxies.add("Star Bust");
        galaxies.add("Hoag's Object");
        galaxies.add("Pinwheel");
        galaxies.add("Triangulum");
        galaxies.add("Cosmos Redshift");
        galaxies.add("Ursa Minor");
        galaxies.add("Virgo Stellar-Stream");

        //ADAPTER
        final ArrayAdapter adapter=new ArrayAdapter<String>(this,android.R.layout.simple_list_item_1,galaxies);
        gv.setAdapter(adapter);

        //TEXT CHANGE LISTENER
        searchBar.addTextChangeListener(new TextWatcher() {
            @Override
            public void beforeTextChanged(CharSequence charSequence, int i, int i1, int i2) {

            }
            @Override
            public void onTextChanged(CharSequence charSequence, int i, int i1, int i2) {
                //SEARCH FILTER
                adapter.getFilter().filter(charSequence);
            }
            @Override
            public void afterTextChanged(Editable editable) {

            }
        });

        //HANDLE GRIDVIEW ITEM CLICK
        gv.setOnItemClickListener(new AdapterView.OnItemClickListener() {
            @Override
            public void onItemClick(AdapterView<?> adapterView, View view, int i, long l) {
                Toast.makeText(MainActivity.this, adapter.getItem(i).toString(), Toast.LENGTH_SHORT).show();
            }
        });

    }
}
```

## ActivityMain.xml

- ActivityMain.xml.
- This is a template layout for our MainActivity.
- Root layout tag is CoordinatorLayout from design support library.
- CordinatorLayout is viewgroup that is a superpowered on framelayout.
- CoordinatorLayout is intended for two primary use cases: As a top-level application decor or chrome layout As a container for a specific interaction with one or more child views
- Inside our CordinatorLayout we add : AppBarLayout,FloatingActionButton and include content_main.xml.
- AppBarLayout is vertical LinearLayout that implements scrolling features of material design concept.
- It should be a direct child of CordinatorLayout, otherwise alot of features won't work.
- Inside the AppBarLayout we add our toolbar,which we give a blue color.
- Next we add our Material SearchBar which will give us the searchbar.
- We can specify attributes like style and hint.
- We will add our widgets in our content_main.xml, not here as this is a template layout.
- Finally we have a FloatingActionButton, a class that derives from android.support.design.widget.VisibilityAwareImageButton. Its the round button you see in our user interface.

```xml
<?xml version="1.0" encoding="utf-8"?>

<android.support.design.widget.CoordinatorLayout

    android_layout_width="match_parent"
    android_layout_height="match_parent"
    tools_context="com.tutorials.hp.searchbargridview.MainActivity">

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
        <com.mancj.materialsearchbar.MaterialSearchBar
            app_mt_speechMode="true"
            app_mt_hint="Custom hint"
            app_theme="@style/AppTheme.PopupOverlay"
            app_mt_maxSuggestionsCount="5"
            android_layout_width="match_parent"
            android_layout_height="wrap_content"
            android_id="@+id/searchBar" />
    </android.support.design.widget.AppBarLayout>

    <include layout="@layout/content_main" />

    <android.support.design.widget.FloatingActionButton
        android_id="@+id/fab"
        android_layout_width="wrap_content"
        android_layout_height="wrap_content"
        android_layout_gravity="bottom|end"
        android_layout_margin="@dimen/fab_margin"
        app_srcCompat="@android:drawable/ic_dialog_email" />

</android.support.design.widget.CoordinatorLayout>
```

## ContentMain.xml

- Our ContentMain.xml file.
- Shall get inflated to MainActivity.
- Root tag is relativeLayout.
- Contains GridView with two columns.
- It is this gridview that we shall be searching.

```xml
<?xml version="1.0" encoding="utf-8"?>

<android.support.constraint.ConstraintLayout

    android_layout_width="match_parent"
    android_layout_height="match_parent"
    app_layout_behavior="@string/appbar_scrolling_view_behavior"
    tools_context="com.tutorials.hp.searchbargridview.MainActivity"
    tools_showIn="@layout/activity_main">

    <GridView
        android_id="@+id/mGridView"
        android_numColumns="2"
        android_layout_width="match_parent"
        android_layout_height="match_parent">
    </GridView>

</android.support.constraint.ConstraintLayout>
```

## Video/Preview

- We have a [YouTube channel](https://www.youtube.com/c/ProgrammingWizards) with almost a thousand tutorials, this one below being one of them.

[https://www.youtube.com/watch?v=JjwwrCS8Xmc](https://www.youtube.com/watch?v=JjwwrCS8Xmc)

## Download

- You can Download the full Project below. Source code is well commented.

[Download](https://github.com/Oclemy/SearchBarGridView/archive/master.zip)

## Example 3: Android Material ToolBar SearchBar – Search/Filter ListView

_Android Material ToolBar SearchBar/SearchView Example - How to filter search a simple ListView and handle onclicks._

So let's see how to filter/search a simple ListView from the toolbar using a material design searchbar. We'll place our searchbar/searchview in the appbar and filter our listview in realtime as the user types data in the searchbar.

We use ArrayAdapter to populate our ListView from a simple arraylist. This then helps us in filtering as the arrayadpter instance gives us a Filter object that helps us easily implement a basic filter.

### Screenshot

- Here's the screenshot of the project.

Android ToolBar SearchBar ListView

![Android ToolBar SearchBar ListView](https://github.com/Oclemy/SearchBarListView/blob/master/demos/SearchBarListView.png?raw=true)

Android ToolBar Material SearchBar ListView Project Structure

![Android ToolBar Material SearchBar](https://github.com/Oclemy/SearchBarListView/blob/master/demos/ProjectStructure.png?raw=true)

# Common Questions this example explores

- Android Material ToolBar SearchBar ListView example.
- Android Filter or Search a ListView.
- Realtime search listview using searchview.

# Tools Used

This example was written with the following tools:

- Windows 8
- AndroidStudio IDE
- Genymotion Emulator
- Language : Java
- Topic : Material SearchBar, ToolBar SearchBar, ListView Search Filter

# Libaries Used

- We use Material SearchBar library [https://github.com/mancj/MaterialSearchBar](https://github.com/mancj/MaterialSearchBar) by Mansur.

# Source Code

Lets jump directly to the source code.

- Our project level build.gradle.
- We add repositories for fetching our dependencies here.
- The dafult,jccenter() is already specified.
- However, we add the maven and specify the url we'll use to fetch our Material SearchBar here.

```groovy
// Top-level build file where you can add configuration options common to all sub-projects/modules.

buildscript {
    repositories {
        jcenter()
    }
    dependencies {
        classpath 'com.android.tools.build:gradle:2.3.3'

        // NOTE: Do not place your application dependencies here; they belong
        // in the individual module build.gradle files
    }
}

allprojects {
    repositories {
        jcenter()
        maven { url "https://jitpack.io" }

    }
}

task clean(type: Delete) {
    delete rootProject.buildDir
}
```

### Build.Gradle App Level

- Our app level build.gradle file.
- We specify compilesdk,minimum sdk,target sdk and dependencies.
- Note that the minimum sdk must be API level 16 Jelly bean for us to use the Material Searchbar library that we use here.
- We also add dependencies using 'compile' statement.
- Our activity shall derive from the appCompatActivity to make it target earlier android versions.
- We also specify design support library.
- Finally we add the com.github.mancj:MaterialSearchBar which is a third party library we'll use to display Material Searchbar.
- You then sync the project.

```groovy
apply plugin: 'com.android.application'

android {
    compileSdkVersion 26
    buildToolsVersion "26.0.0"
    defaultConfig {
        applicationId "com.tutorials.hp.searchbarlistview"
        minSdkVersion 16
        targetSdkVersion 25
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

    implementation 'com.android.support.constraint:constraint-layout:1.0.0-alpha7'
    implementation 'com.android.support:design:25.3.1'
    implementation 'com.github.mancj:MaterialSearchBar:0.7.1'
}
```

## MainActivity.java

- Our MainActivity class.
- Derives from AppCompatActivity which is a Base class for activities that use the support library action bar features.
- Methods: onCreate().
- Inflated From activity_main.xml using the setContentView() method.
- This method is responsible for filtering/searching a gridview via a material serahcbar displayed inside a toolbar.
- The views we use are Material Searchbar for searching and GridView to be searched.
- Reference MaterialSearchBar and GridView from our layout specification using findViewById().
- Instantiate adapter and set it to GridView.
- Add TextChangeListener to MaterialSearchBar and use arrayadapter instance to filter data.

```java

public class MainActivity extends AppCompatActivity {

    /*
    - When activity is created.
     */
    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);
        Toolbar toolbar = (Toolbar) findViewById(R.id.toolbar);
        setSupportActionBar(toolbar);

        //REFERENCE MATERIALSEARCHBAR AND LISTVIEW
        ListView lv= (ListView) findViewById(R.id.mListView);
        MaterialSearchBar searchBar = (MaterialSearchBar) findViewById(R.id.searchBar);
        searchBar.setHint("Search..");
        searchBar.setSpeechMode(true);

        List<String> galaxies=new ArrayList<>();
        galaxies.add("Cartwheel");
        galaxies.add("Whirlpool");
        galaxies.add("Andromeda I");
        galaxies.add("Andromeda II");
        galaxies.add("Sombrero");
        galaxies.add("Messier 81");
        galaxies.add("Messier 87");
        galaxies.add("Canis Majos Over-density");
        galaxies.add("Messier 92");
        galaxies.add("Black Eye");
        galaxies.add("Centaurus A");
        galaxies.add("Centaurus B");
        galaxies.add("Milky Way");
        galaxies.add("IC 1011");
        galaxies.add("Star Bust");
        galaxies.add("Hoag's Object");
        galaxies.add("Pinwheel");
        galaxies.add("Triangulum");
        galaxies.add("Cosmos Redshift");
        galaxies.add("Ursa Minor");
        galaxies.add("Virgo Stellar-Stream");

        //ADAPTER
        final ArrayAdapter adapter=new ArrayAdapter<String>(this,android.R.layout.simple_list_item_1,galaxies);
        lv.setAdapter(adapter);

        //SEARCHBAR TEXT CHANGE LISTENER
        searchBar.addTextChangeListener(new TextWatcher() {
            @Override
            public void beforeTextChanged(CharSequence charSequence, int i, int i1, int i2) {

            }

            @Override
            public void onTextChanged(CharSequence charSequence, int i, int i1, int i2) {
                //SEARCH FILTER
                adapter.getFilter().filter(charSequence);
            }

            @Override
            public void afterTextChanged(Editable editable) {

            }
        });

        //LISTVIEW ITEM CLICKED
        lv.setOnItemClickListener(new AdapterView.OnItemClickListener() {
            @Override
            public void onItemClick(AdapterView<?> adapterView, View view, int i, long l) {
                Toast.makeText(MainActivity.this, adapter.getItem(i).toString(), Toast.LENGTH_SHORT).show();
            }
        });

    }

}
```

## ActivityMain.xml

- ActivityMain.xml.
- This is a template layout for our MainActivity.
- Root layout tag is CoordinatorLayout from design support library.
- CordinatorLayout is viewgroup that is a superpowered on framelayout.
- CoordinatorLayout is intended for two primary use cases: As a top-level application decor or chrome layout As a container for a specific interaction with one or more child views
- Inside our CordinatorLayout we add : AppBarLayout,FloatingActionButton and include content_main.xml.
- AppBarLayout is vertical LinearLayout that implements scrolling features of material design concept.
- It should be a direct child of CordinatorLayout, otherwise alot of features won't work.
- Inside the AppBarLayout we add our toolbar,which we give a blue color.
- Next we add our Material SearchBar which will give us the searchbar.
- We can specify attributes like style and hint.
- We will add our widgets in our content_main.xml, not here as this is a template layout.
- Finally we have a FloatingActionButton, a class that derives from android.support.design.widget.VisibilityAwareImageButton. Its the round button you see in our user interface.

```xml
<?xml version="1.0" encoding="utf-8"?>

<android.support.design.widget.CoordinatorLayout

    android_layout_width="match_parent"
    android_layout_height="match_parent"
    tools_context="com.tutorials.hp.searchbarlistview.MainActivity">

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
        <com.mancj.materialsearchbar.MaterialSearchBar
            app_mt_speechMode="true"
            app_mt_hint="Custom hint"
            app_theme="@style/AppTheme.PopupOverlay"
            app_mt_maxSuggestionsCount="5"
            android_layout_width="match_parent"
            android_layout_height="wrap_content"
            android_id="@+id/searchBar" />
    </android.support.design.widget.AppBarLayout>

    <include layout="@layout/content_main" />

    <android.support.design.widget.FloatingActionButton
        android_id="@+id/fab"
        android_layout_width="wrap_content"
        android_layout_height="wrap_content"
        android_layout_gravity="bottom|end"
        android_layout_margin="@dimen/fab_margin"
        app_srcCompat="@android:drawable/ic_dialog_email" />

</android.support.design.widget.CoordinatorLayout>
```

## ContentMain.xml

- Our ContentMain.xml file.
- Shall get inflated to MainActivity.
- Root tag is relativeLayout.
- Contains ListView with two columns.
- It is this ListView that we shall be searching.

```xml
<?xml version="1.0" encoding="utf-8"?>

<android.support.constraint.ConstraintLayout

    android_layout_width="match_parent"
    android_layout_height="match_parent"
    app_layout_behavior="@string/appbar_scrolling_view_behavior"
    tools_context="com.tutorials.hp.searchbarlistview.MainActivity"
    tools_showIn="@layout/activity_main">

    <ListView
        android_id="@+id/mListView"
        android_layout_width="match_parent"
        android_layout_height="match_parent">
    </ListView>

</android.support.constraint.ConstraintLayout>
```

## Video/Preview

- We have a [YouTube channel](https://www.youtube.com/c/ProgrammingWizards) with almost a thousand tutorials, this one below being one of them.

[https://www.youtube.com/watch?v=BuEQ1m9nnQI](https://www.youtube.com/watch?v=BuEQ1m9nnQI)

## Download

- You can Download the full Project below. Source code is well commented.

[Download](https://github.com/Oclemy/SearchBarListView/archive/master.zip)

## Example 4: Android RecyclerView MaterialSearchBar Search Filter

_Android RecyclerView MaterialSearchBar Search Filter_

We had done a tutorial some months later about Search/Filter with recyclerView. However, that was with the searchview as our search form. Today we see how to search filter with material searchbar as the search component. User will perform realtime search filter. As they type we filter the cards based on the search term. Our recyclerview comprises of material cardviews. We populate our recyclerview via an arraylist of strings. Let's go.

#### Screenshot

- Here's the screenshot of the project.

Android RecyclerView Material Seatchbar Search Filter.

Android Material SearchBar RecyclerView example. : Project Structure.

![Project Structure](https://github.com/Oclemy/SearchBarRecyclerView/blob/master/demos/SearchBarRecylerview2.png?raw=true)

#### Common Questions this example explores

- Android RecyclerView Search/Filter with searchbar.
- Android toolbar search filter.
- Search filter recyclerview cardviews.
- Android material searchbar recyclerview.

#### Tools Used

This example was written with the following tools:

- Windows 8
- AndroidStudio IDE
- Genymotion Emulator
- Language : Java
- Topic : RecyclerView Events, Android SimpleRecyclerView

#### Libaries Used

- We use Android SimpleRecyclerView library.

#### Source Code

Lets jump directly to the source code.

#### Build.Gradle Project Level

- Our project level build.gradle.
- We add repositories for fetching our dependencies here.
- The dafult,jccenter() is already specified.
- However, we add the maven and specify the url we'll use to fetch our third part library here.

```groovy
// Top-level build file where you can add configuration options common to all sub-projects/modules.

buildscript {
    repositories {
        jcenter()
    }
    dependencies {
        classpath 'com.android.tools.build:gradle:2.3.3'

        // NOTE: Do not place your application dependencies here; they belong
        // in the individual module build.gradle files
    }
}
//add maven jitpack.io for fetching our materialsearchbar library.
allprojects {
    repositories {
        jcenter()
        maven { url "https://jitpack.io" }
    }
}

task clean(type: Delete) {
    delete rootProject.buildDir
}
```

#### Build.Gradle App Level

- Our module level build.gradle file.
- We specify compilesdk,minimum sdk,target sdk and dependencies.
- Note that the minimum sdk for this project is API level 16 as the material serahbar library we use requires that.
- We also add dependencies using 'compile' statement.
- Our activity shall derive from the appCompatActivity to make it target earlier android versions.
- We also specify design support library as well as CardView.
- Add dependencies including com.github.mancj:MaterialSearchBar:0.7.1.
- This is the material searchbar we will use in our project.

```groovy
apply plugin: 'com.android.application'

android {
    compileSdkVersion 26
    buildToolsVersion "26.0.1"
    defaultConfig {
        applicationId "com.tutorials.hp.searchbarrecyclerview"
        minSdkVersion 16
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
//Add our dependencies including materialsearchbar
dependencies {
    compile fileTree(dir: 'libs', include: ['*.jar'])
    compile 'com.android.support:appcompat-v7:26.+'
    compile 'com.android.support:design:26.+'
    compile 'com.android.support.constraint:constraint-layout:1.0.0-alpha7'
    compile 'com.android.support:cardview-v7:26.+'
    compile 'com.github.mancj:MaterialSearchBar:0.7.1'
}
```

#### MyAdapter.java

- Our MyAdapter class.
- Derives from RecyclerView.Adapter.
- Implements android.widget.filterable interface.
- We include our MyViewHolder as an inner class.
- This adapter layout will be responsible inflating model layout and binding data to resulting views.

```java

public class MyAdapter extends RecyclerView.Adapter<MyAdapter.MyViewHolder> implements Filterable {
    ArrayList<String> galaxies;
    ArrayList<String> currentList;

    public MyAdapter(ArrayList<String> galaxies) {
        this.galaxies = galaxies;
        this.currentList=galaxies;
    }

    @Override
    public MyViewHolder onCreateViewHolder(ViewGroup parent, int viewType) {
        View v= LayoutInflater.from(parent.getContext()).inflate(R.layout.model,parent,false);
        return new MyViewHolder(v);
    }

    @Override
    public void onBindViewHolder(MyViewHolder holder, int position) {
        holder.nametxt.setText(galaxies.get(position));
    }
    @Override
    public int getItemCount() {
        return galaxies.size();
    }

    public void setGalaxies(ArrayList<String> filteredGalaxies)
    {
        this.galaxies=filteredGalaxies;
    }

    @Override
    public Filter getFilter() {
        return FilterHelper.newInstance(currentList,this);
    }

    /*
    - Our MyViewHolder class
     */
    class MyViewHolder extends RecyclerView.ViewHolder {

        TextView nametxt;
        public MyViewHolder(View itemView) {
            super(itemView);
            nametxt= itemView.findViewById(R.id.nameTxt);
        }
    }

}
```

#### FilterHelper.java

- Our FilterHelper class.
- Derives from android.widget.filter.
- We perform filtering here and publish results back to the adapter which is then refreshed.

```java
package com.tutorials.hp.searchbarrecyclerview;

import android.widget.Filter;

import java.util.ArrayList;
public class FilterHelper extends Filter {
    static ArrayList<String> currentList;
    static MyAdapter adapter;

    public static FilterHelper newInstance(ArrayList<String> currentList, MyAdapter adapter) {
        FilterHelper.adapter=adapter;
        FilterHelper.currentList=currentList;
        return new FilterHelper();
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
            ArrayList<String> foundFilters=new ArrayList<>();

            String galaxy;

            //ITERATE CURRENT LIST
            for (int i=0;i<currentList.size();i++)
            {
                galaxy= currentList.get(i);

                //SEARCH
                if(galaxy.toUpperCase().contains(constraint))
                {
                    //ADD IF FOUND
                    foundFilters.add(galaxy);
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

        adapter.setGalaxies((ArrayList<String>) filterResults.values);
        adapter.notifyDataSetChanged();
    }
}
```

#### MainActivity.java

- Our MainActivity class.
- Derives from AppCompatActivity which is a Base class for activities that use the support library action bar features.
- Methods: onCreate(),getData().
- Inflated From activity_main.xml using the setContentView() method.
- The views we use are RecyclerView.
- Reference RecyclerView from our layout specification using findViewById().
- getData() will be our data source.

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

        //RFERENCE VIEWS
        rv= (RecyclerView) findViewById(R.id.mRecyclerView);
        rv.setLayoutManager(new LinearLayoutManager(this));

        MaterialSearchBar searchBar = (MaterialSearchBar) findViewById(R.id.searchBar);
        searchBar.setHint("Search..");
        searchBar.setSpeechMode(true);

        //ADAPTER
        adapter=new MyAdapter(getGalaxies());
        rv.setAdapter(adapter);

        //SEARCHBAR TEXT CHANGE LISTENER
        searchBar.addTextChangeListener(new TextWatcher() {
            @Override
            public void beforeTextChanged(CharSequence charSequence, int i, int i1, int i2) {

            }

            @Override
            public void onTextChanged(CharSequence charSequence, int i, int i1, int i2) {
                //SEARCH FILTER
                adapter.getFilter().filter(charSequence);
            }

            @Override
            public void afterTextChanged(Editable editable) {

            }
        });
    }

    private ArrayList<String> getGalaxies()
    {
        ArrayList<String> galaxies=new ArrayList<>();
        galaxies.add("Cartwheel");
        galaxies.add("Whirlpool");
        galaxies.add("Andromeda I");
        galaxies.add("Andromeda II");
        galaxies.add("Sombrero");
        galaxies.add("Messier 81");
        galaxies.add("Messier 87");
        galaxies.add("Canis Majos Over-density");
        galaxies.add("Messier 92");
        galaxies.add("Black Eye");
        galaxies.add("Centaurus A");
        galaxies.add("Centaurus B");
        galaxies.add("Milky Way");
        galaxies.add("IC 1011");
        galaxies.add("Star Bust");
        galaxies.add("Hoag's Object");
        galaxies.add("Pinwheel");
        galaxies.add("Triangulum");
        galaxies.add("Cosmos Redshift");
        galaxies.add("Ursa Minor");
        galaxies.add("Virgo Stellar-Stream");

        return galaxies;
    }

}
```

#### ActivityMain.xml

- Our activity_main.xml layout
- Will be inflated to our mainactivity.
- Add MaterialSearchBar in the appbar.

```xml
<?xml version="1.0" encoding="utf-8"?>
<android.support.design.widget.CoordinatorLayout

    android_layout_width="match_parent"
    android_layout_height="match_parent"
    tools_context="com.tutorials.hp.searchbarrecyclerview.MainActivity">

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
        <com.mancj.materialsearchbar.MaterialSearchBar
            app_theme="@style/AppTheme.PopupOverlay"
            android_layout_width="match_parent"
            android_layout_height="wrap_content"
            android_id="@+id/searchBar" />
    </android.support.design.widget.AppBarLayout>

    <include layout="@layout/content_main" />

    <android.support.design.widget.FloatingActionButton
        android_id="@+id/fab"
        android_layout_width="wrap_content"
        android_layout_height="wrap_content"
        android_layout_gravity="bottom|end"
        android_layout_margin="@dimen/fab_margin"
        app_srcCompat="@android:drawable/ic_dialog_email" />

</android.support.design.widget.CoordinatorLayout>
```

#### ContentMain.xml

- Add recyclerview here.

```xml
<?xml version="1.0" encoding="utf-8"?>
<android.support.constraint.ConstraintLayout

    android_layout_width="match_parent"
    android_layout_height="match_parent"
    app_layout_behavior="@string/appbar_scrolling_view_behavior"
    tools_context="com.tutorials.hp.searchbarrecyclerview.MainActivity"
    tools_showIn="@layout/activity_main">

    <android.support.v7.widget.RecyclerView
        android_id="@+id/mRecyclerView"
        android_layout_width="match_parent"
        android_layout_height="match_parent">
    </android.support.v7.widget.RecyclerView>

</android.support.constraint.ConstraintLayout>
```

#### Model.xml

- As the name suggests, this layout models our viewitem.
- We define how each Card shall appear in our List.
- So at the root level we have a CardView widget.
- We can also customize our CardView by specifying cardCornerRadius,cardElevation,width,height etc.
- Each Card shall comprise a textview.

```xml
<?xml version="1.0" encoding="utf-8"?>
<android.support.v7.widget.CardView
    android_orientation="horizontal" android_layout_width="match_parent"

    android_layout_margin="5dp"
    card_view_cardCornerRadius="15dp"
    card_view_cardElevation="10dp"
    android_layout_height="150dp">

        <TextView
            android_layout_width="wrap_content"
            android_layout_height="wrap_content"
            android_textAppearance="?android:attr/textAppearanceLarge"
            android_text="Galaxy"
            android_id="@+id/nameTxt"
            android_padding="10dp"
      android_textColor="@color/abc_btn_colored_borderless_text_material"
            android_layout_alignParentLeft="true"/>

</android.support.v7.widget.CardView>
```

#### Video Tutorial

- We have a [YouTube channel](https://www.youtube.com/c/ProgrammingWizards) with almost a thousand tutorials, this one below being one of them.

[https://www.youtube.com/watch?v=CnDmhz9rmsI](https://www.youtube.com/watch?v=CnDmhz9rmsI)

#### Download

- You can Download the full Project below. Source code is well commented.

[Download](https://github.com/Oclemy/SearchBarRecyclerView/archive/master.zip)
