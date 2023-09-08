# SQLite CRUD and Search Filter


This tutorial is dedicated to looking at how to search or filter data in SQLite database. When we talk about server-side or database-level or connected search what we mean is that we search data at the database level using SQL statements rather than downloading data into an arraylist and then filtering the arraylist.


Many a times you need to filter or search data. That data may be contained in an SQLite database.

- Clientside Search/Filter - Retrieving everything from database,populating arraylist, then searching the arraylist.
- Serverside Search/Filter - Applying search/filter at the database level and returning only data matching the search term.

The second option is the faster one since we take advantage of the heavily optimized SQL databases.

We use the second approach in this tutorial. But first we need to insert data into database and populate the ListView. So we do all those.We use the SearchView as our search input widget.

## Example 1: Android SQLite Database – ListView – Filter/Search and CRUD

_Android SQLite Database - ListView - Filter/Search and CRUD Tutorial._

How to Perform Search and Filter againts SQLite Database. The data is rendered on a [ListView](https://camposha.info/android/listview). But first we have to insert data to SQLite so we perform basic CRUD to populate the sqlite database. We use SearchView to searc/filter.

In today's tutorial,we cover how to filter/search data from SQLite database.As we always do here at ProgrammingWizards,we start from scratch.So we first create our table programmatically,Insert data,select that data from database while applying a search.We are performing a server side filter if you like,at the database level. In short this is what we do :

- INSERT data to our SQlite database table.
- SELECT while performing a dynamic filter,using a searchterm specified in our SearchView.
- Handle ItemClicks of filtered items.

![SQLite ListView Search data Via SearchView](https://github.com/Oclemy/SQLiteFilterListView/raw/master/demos/SQLiteSearchData.PNG)

[Download](https://github.com/Oclemy/SQLiteFilterListView/archive/master.zip)

![SQlite ListView Search Project Structure](https://github.com/Oclemy/SQLiteFilterListView/raw/master/demos/ProjectStructure.PNG)

We want to search/filter SQLite database using a SearchView.Our component is ListView. First we will insert data to SQLite,then retrieve then filter in realtime as user searches via a SearchView. Lets jump straight in.

#### Constants.java

The first class is our Constants class which will hold all our SQlite database constants.

```java
package com.tutorials.hp.sqlitefilterlistview.mDataBase;

public class Constants {
    //COLUMNS
    static final String ROW_ID="id";
    static final String NAME="name";

    //DB
    static final String DB_NAME="ii_DB";
    static final String TB_NAME="ii_TB";
    static final int DB_VERSION=1;

    //CREATE TB
    static final String CREATE_TB="CREATE TABLE ii_TB(id INTEGER PRIMARY KEY AUTOINCREMENT,"
            + "name TEXT NOT NULL);";

    //DROP TB
    static final String DROP_TB="DROP TABLE IF EXISTS "+TB_NAME;

}
```

#### DBHelper.java

Our DBHelper class below is responsible for upgrading our SQlite database table :

```java
package com.tutorials.hp.sqlitefilterlistview.mDataBase;

import android.content.Context;
import android.database.SQLException;
import android.database.sqlite.SQLiteDatabase;
import android.database.sqlite.SQLiteOpenHelper;

public class DBHelper extends SQLiteOpenHelper {
    public DBHelper(Context context) {
        super(context, Constants.DB_NAME, null, Constants.DB_VERSION);
    }

    @Override
    public void onCreate(SQLiteDatabase db) {
        try
        {
           db.execSQL(Constants.CREATE_TB);
        }catch (SQLException e)
        {
            e.printStackTrace();
        }

    }

    @Override
    public void onUpgrade(SQLiteDatabase db, int oldVersion, int newVersion) {
       db.execSQL(Constants.DROP_TB);
        onCreate(db);
    }
}
```

![SQLite ListView Insert data](https://github.com/Oclemy/SQLiteFilterListView/raw/master/demos/ListViewSQLiteInsertData.PNG)

#### DBAdapter.java

Then the DBAdapter class here is responsible for all our CRUD operations including searching.Now for searching we search/filter our data at the server side,at the database level via our SQL statements.

```java
package com.tutorials.hp.sqlitefilterlistview.mDataBase;

import android.content.ContentValues;
import android.content.Context;
import android.database.Cursor;
import android.database.SQLException;
import android.database.sqlite.SQLiteDatabase;
import android.provider.SyncStateContract;

public class DBAdapter {

    Context c;
    SQLiteDatabase db;
    DBHelper helper;

    public DBAdapter(Context c) {
        this.c = c;
        helper=new DBHelper(c);
    }

    //OPEN DB
    public void openDB()
    {
        try
        {
           db=helper.getWritableDatabase();
        }catch (SQLException e)
        {
            e.printStackTrace();
        }
    }

    //CLOSE
    public void closeDB()
    {
        try
        {
            helper.close();
        }catch (SQLException e)
        {
            e.printStackTrace();
        }
    }

    //INSERT DATA
    public boolean add(String name)
    {
        try
        {
            ContentValues cv=new ContentValues();
            cv.put(Constants.NAME, name);

            db.insert(Constants.TB_NAME, Constants.ROW_ID, cv);

            return true;

        }catch (SQLException e)
        {
            e.printStackTrace();
        }
        return false;
    }

    //RETRIEVE DATA AND FILTER
    public Cursor retrieve(String searchTerm)
    {
        String[] columns={Constants.ROW_ID,Constants.NAME};
        Cursor c=null;

        if(searchTerm != null && searchTerm.length()>0)
        {
            String sql="SELECT * FROM "+Constants.TB_NAME+" WHERE "+Constants.NAME+" LIKE '%"+searchTerm+"%'";
            c=db.rawQuery(sql,null);
            return c;

        }

        c=db.query(Constants.TB_NAME,columns,null,null,null,null,null);
        return c;
    }
}
```

#### CustomAdapter.java

Our customAdapter class below shall be responsible for binding our filtered data to our ListView.

```java
package com.tutorials.hp.sqlitefilterlistview.mListView;

import android.content.Context;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.BaseAdapter;
import android.widget.TextView;
import android.widget.Toast;

import com.tutorials.hp.sqlitefilterlistview.R;
import com.tutorials.hp.sqlitefilterlistview.mDataObject.Planet;

import java.util.ArrayList;

public class CustomAdapter extends BaseAdapter {

    Context c;
    ArrayList<Planet> planets;
    LayoutInflater inflater;

    public CustomAdapter(Context c, ArrayList<Planet> planets) {
        this.c = c;
        this.planets = planets;
    }

    @Override
    public int getCount() {
        return planets.size();
    }

    @Override
    public Object getItem(int position) {
        return planets.get(position);
    }

    @Override
    public long getItemId(int position) {
        return position;
    }

    @Override
    public View getView(int position, View convertView, ViewGroup parent) {
        if(inflater==null)
        {
            inflater= (LayoutInflater) c.getSystemService(Context.LAYOUT_INFLATER_SERVICE);
        }
        if(convertView==null)
        {
            convertView=inflater.inflate(R.layout.model,parent,false);
        }

        TextView nameTxt= (TextView) convertView.findViewById(R.id.nameTxt);
        nameTxt.setText(planets.get(position).getName());

        final int pos=position;

        convertView.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                Toast.makeText(c,planets.get(pos).getName(),Toast.LENGTH_SHORT).show();
            }
        });

        return convertView;
    }
}
```

![SQlite ListView Data](https://github.com/Oclemy/SQLiteFilterListView/raw/master/demos/SQLiteListViewData.PNG)

#### MainActivity.java

Then finally we have our MainActivity class :

```java
package com.tutorials.hp.sqlitefilterlistview;

import android.app.Dialog;
import android.database.Cursor;
import android.os.Bundle;
import android.support.design.widget.FloatingActionButton;
import android.support.design.widget.Snackbar;
import android.support.v7.app.AppCompatActivity;
import android.support.v7.widget.LinearLayoutManager;
import android.support.v7.widget.RecyclerView;
import android.support.v7.widget.SearchView;
import android.support.v7.widget.Toolbar;
import android.view.View;
import android.view.Menu;
import android.view.MenuItem;
import android.widget.ArrayAdapter;
import android.widget.Button;
import android.widget.EditText;
import android.widget.ListView;
import android.widget.Toast;

import com.tutorials.hp.sqlitefilterlistview.mDataBase.DBAdapter;
import com.tutorials.hp.sqlitefilterlistview.mDataObject.Planet;
import com.tutorials.hp.sqlitefilterlistview.mListView.CustomAdapter;

import java.util.ArrayList;

public class MainActivity extends AppCompatActivity {

    ListView lv;
    SearchView sv;
    EditText nameEditText;
    Button saveBtn,retrieveBtn;
    CustomAdapter adapter;
    ArrayList<Planet> planets=new ArrayList<>();

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);
        Toolbar toolbar = (Toolbar) findViewById(R.id.toolbar);
        setSupportActionBar(toolbar);
        FloatingActionButton fab = (FloatingActionButton) findViewById(R.id.fab);

        lv= (ListView) findViewById(R.id.lv);
        sv= (SearchView) findViewById(R.id.sv);

        adapter=new CustomAdapter(this,planets);

        fab.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View view) {

                   displayDialog();
            }
        });

        sv.setOnQueryTextListener(new SearchView.OnQueryTextListener() {
            @Override
            public boolean onQueryTextSubmit(String query) {
                return false;
            }

            @Override
            public boolean onQueryTextChange(String newText) {
                getPlanets(newText);
                return false;
            }
        });

    }

    private void displayDialog()
    {
        Dialog d=new Dialog(this);
        d.setTitle("SQLite Database");
        d.setContentView(R.layout.dialog_layout);

        nameEditText= (EditText) d.findViewById(R.id.nameEditTxt);
        saveBtn= (Button) d.findViewById(R.id.saveBtn);
        retrieveBtn= (Button) d.findViewById(R.id.retrieveBtn);

        saveBtn.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                save(nameEditText.getText().toString());
            }
        });
        retrieveBtn.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                 getPlanets(null);
            }
        });

        d.show();
    }

    private void save(String name)
    {
        DBAdapter db=new DBAdapter(this);
        db.openDB();
        if(db.add(name))
        {
            nameEditText.setText("");
        }else {
            Toast.makeText(this,"Unable To Save",Toast.LENGTH_SHORT).show();
        }

        db.closeDB();

        this.getPlanets(null);
    }

    private void getPlanets(String searchTerm)
    {
        planets.clear();

        DBAdapter db=new DBAdapter(this);
        db.openDB();
        Planet p=null;
        Cursor c=db.retrieve(searchTerm);
        while (c.moveToNext())
        {
            int id=c.getInt(0);
            String name=c.getString(1);

            p=new Planet();
            p.setId(id);
            p.setName(name);

            planets.add(p);
        }

        db.closeDB();
        lv.setAdapter(adapter);
    }
}
```

#### Download

Here are the resources related to this project.

| No. | Location | Link |
| --- | --- | --- |
| 1. | GitHub | [Direct Download](https://github.com/Oclemy/SQLiteFilterListView/archive/master.zip) |
| 2. | GitHub | [Browse](https://github.com/Oclemy/SQLiteFilterListView) |
| 3. | YouTube | [Video Tutorial](http://www.youtube.com/watch?v=mqqzt-Yvtbo) |
| 4. | YouTube | [Our YouTube Channel](https://www.youtube.com/channel/UCpdkWp2zh5Qv1ZWlnqswdCw) |

## Example 2: Android SQLite CRUD – RecyclerView – Serverside Search/Filter

_Android SQLite CRUD - RecyclerView - Serverside Search/Filter_

This tutorial helps us explore Android SQLite database searching or filtering data.

We are covering how to search/filter data against our SQLite database.Take note we are filtering at the SQlite side,not in java but in SQL,at the server side if you like.Our widget today is RecyclerView.We of course start from scratch,inserting,then selecting while applying a search.

First we have to save data and retrieve data from that database.

We render the data in our RecyclerView.

We will be searching/filtering data at the sqlite server level as opposed to fetching all data and filtering via Java.

This is what we do short:

- INSERT data to our SQlite database.
- SELECT that particular data,while applying a dynamic filter.
- Our search term is dynamically entered by the user via a searchview.

Let's go.

![RecyclerView SQLite Search/Filter Project Structure](https://github.com/Oclemy/SQLiteServerSideFilterRecycler/raw/master/demos/ProjectStructure.PNG)

#### 1\. Create Basic Activity Project

1. First create a basic project in android studio. You can see how to do so [here](https://camposha.info/android/create_basic_project).

#### 2\. Add Dependencies

Lets add support library dependencies in our app level build.gradle:

```groovy
dependencies {
    compile fileTree(dir: 'libs', include: ['*.jar'])
    testCompile 'junit:junit:4.12'
    compile 'com.android.support:appcompat-v7:23.3.0'
    compile 'com.android.support:design:23.3.0'
    compile 'com.android.support:cardview-v7:23.3.0'

}
```

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
    tools_context="com.tutorials.hp.sqliteserversidefilter.MainActivity">

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

In this case we will have a SearchView right on top of a RecyclerView.

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
    tools_context="com.tutorials.hp.sqliteserversidefilter.MainActivity"
    tools_showIn="@layout/activity_main">

    <android.support.v7.widget.SearchView
        android_id="@+id/sv"
        android_layout_width="match_parent"
        android_layout_height="wrap_content"
        android_queryHint="Search.."
        ></android.support.v7.widget.SearchView>

    <android.support.v7.widget.RecyclerView
        android_id="@+id/rv"
        android_layout_below="@+id/sv"
        android_layout_width="match_parent"
        android_layout_height="wrap_content"
        ></android.support.v7.widget.RecyclerView>
</RelativeLayout>
```

##### (c). dialog_layout.xml

This is the input dialog layout.

We will need to insert to and retrieve data from SQlite database so we will use this dialog as our input form. At the root we have a CardView. Then a LinearLayout with vertical orientation. Inside the LinearLayout we have TextInputLayout, which wraps our EditText.

```xml
<?xml version="1.0" encoding="utf-8"?>

    <android.support.v7.widget.CardView
        android_orientation="horizontal" android_layout_width="500dp"

        android_layout_margin="1dp"
        card_view_cardCornerRadius="10dp"
        card_view_cardElevation="5dp"
        android_layout_height="match_parent">

    <LinearLayout
            android_layout_width="match_parent"
            android_orientation="vertical"
            android_layout_height="match_parent">

        <android.support.design.widget.TextInputLayout
            android_id="@+id/nameLayout"
            android_layout_width="match_parent"
            android_layout_height="wrap_content">

            <EditText
                android_id="@+id/nameEditTxt"
                android_layout_width="match_parent"
                android_layout_height="wrap_content"
                android_singleLine="true"
                android_hint= "Name" />
        </android.support.design.widget.TextInputLayout>

        <Button android_id="@+id/saveBtn"
            android_layout_width="fill_parent"
            android_layout_height="wrap_content"
            android_text="Save"
            android_clickable="true"
            android_background="@color/colorAccent"
            android_layout_marginTop="40dp"
            android_textColor="@android:color/white"/>
        <Button android_id="@+id/retrieveBtn"
            android_layout_width="fill_parent"
            android_layout_height="wrap_content"
            android_text="Retrieve"
            android_clickable="true"
            android_background="@color/colorAccent"
            android_layout_marginTop="40dp"
            android_textColor="@android:color/white"/>
</LinearLayout>
</android.support.v7.widget.CardView>
```

##### (d). model.xml

This will define the template for each RecyclerView Viewitem. This layout will get inflated in our recycleview adapter class.

At the root we have a CardView.

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
        <TextView
            android_layout_width="wrap_content"
            android_layout_height="wrap_content"
            android_textAppearance="?android:attr/textAppearanceLarge"
            android_text="Name"
            android_id="@+id/nameTxt"
            android_padding="10dp"
            android_layout_alignParentTop="true"
            />
    </RelativeLayout>
</android.support.v7.widget.CardView>
```

#### 4\. Java Classes

Here are our Java classes.

#### Our POJO

##### (a) Planet.java

Our data object.

Represents a single planet with several properties.

We will be saving planets in our SQLite database.

```java
package com.tutorials.hp.sqliteserversidefilter.mDataObject;

public class Planet {

    String name;
    int id;

    public Planet() {
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }
}
```

#### Our SQLite Classes

##### (a) Constants.java

First here's our Constants class that's going to hold all our SQlite database constants.

This class contains our SQLite database constants. These include: databse table name, database name, database version, column names, SQLite table creation and deletion statements.

```java
package com.tutorials.hp.sqliteserversidefilter.mDataBase;

public class Constants {
    //columns
    static final String ROW_ID="id";
    static final String NAME="name";

    //DB
    static final String DB_NAME="gg_DB";
    static final String TB_NAME="gg_TB";
    static final int DB_VERSION=1;

    //CREATE STMT
    static final String CREATE_TB="CREATE TABLE gg_TB(id INTEGER PRIMARY KEY AUTOINCREMENT,"
            + "name TEXT NOT NULL);";

    //DROP  TB STMT
     static final String DROP_TB="DRP TABLE IF EXISTS "+TB_NAME;

}
```

##### (b) DBHelper.java

This is our SQLiteHelper class. We call it DBHelper and it is the class that shall be responsible for upgrading and creating our database table. It Allows us to create table and upgrade it.

```java
package com.tutorials.hp.sqliteserversidefilter.mDataBase;

import android.content.Context;
import android.database.SQLException;
import android.database.sqlite.SQLiteDatabase;
import android.database.sqlite.SQLiteOpenHelper;

public class DBHelper extends SQLiteOpenHelper {
    public DBHelper(Context context) {
        super(context, Constants.DB_NAME, null, Constants.DB_VERSION);
    }

    @Override
    public void onCreate(SQLiteDatabase db) {
        try
        {
            db.execSQL(Constants.CREATE_TB);
        }catch (SQLException e)
        {
            e.printStackTrace();
        }

    }

    @Override
    public void onUpgrade(SQLiteDatabase db, int oldVersion, int newVersion) {
        db.execSQL(Constants.DROP_TB);
        onCreate(db);
    }
}
```

![RecyclerView SQLite Insert Data](https://github.com/Oclemy/SQLiteServerSideFilterRecycler/raw/master/demos/InsertData.PNG)

##### (c) DBAdapter.java

Our database adapter class.

Basically responsible for performing CRUD activities like inserting and selecting to and from SQLite database.

We also open and close the SQLite database.

We also search here as part our data retrieval from sqlite database using a searchTerm passed to us.

Our DBAdapter class below is responsible for performing our CRUD operations including searching our database.We said we do the search at the server side or database level instead of via Java code :

```java
package com.tutorials.hp.sqliteserversidefilter.mDataBase;

import android.content.ContentValues;
import android.content.Context;
import android.database.Cursor;
import android.database.SQLException;
import android.database.sqlite.SQLiteDatabase;

public class DBAdapter {
    Context c;
    SQLiteDatabase db;
    DBHelper helper;

    public DBAdapter(Context c) {
        this.c = c;
        helper=new DBHelper(c);
    }

    //OPEN DB
    public void openDB()
    {
        try
        {
            db=helper.getWritableDatabase();
        }catch (SQLException e)
        {
            e.printStackTrace();
        }
    }

    //CLOSE
    public void closeDB()
    {
        try
        {
            helper.close();
        }catch (SQLException e)
        {
            e.printStackTrace();
        }
    }

    //SAVE OR INSERT
    public boolean add(String name)
    {
        try
        {
            ContentValues cv=new ContentValues();
            cv.put(Constants.NAME, name);

            db.insert(Constants.TB_NAME, Constants.ROW_ID, cv);

            return true;

        }catch (SQLException e)
        {
            e.printStackTrace();
        }

        return false;
    }

    //RETRIEVE OR FILTERING
    public Cursor retrieve(String searchTerm)
    {
        String[] columns={Constants.ROW_ID,Constants.NAME};
        Cursor c=null;

        if(searchTerm != null && searchTerm.length()>0)
        {
            String sql="SELECT * FROM "+Constants.TB_NAME+" WHERE "+Constants.NAME+" LIKE '%"+searchTerm+"%'";
            c=db.rawQuery(sql,null);
            return c;
        }

        c=db.query(Constants.TB_NAME,columns,null,null,null,null,null);
        return c;

    }

}
```

#### Our RecyclerView Classes

##### (a) MyHolder.java

Our RecyclerView.ViewHolder class.

Holds a simple TextView.

```java
package com.tutorials.hp.sqliteserversidefilter.mRecycler;

import android.support.v7.widget.RecyclerView;
import android.view.View;
import android.widget.TextView;

import com.tutorials.hp.sqliteserversidefilter.R;

public class MyHolder extends RecyclerView.ViewHolder {

    TextView nameTxt;

    public MyHolder(View itemView) {
        super(itemView);

        this.nameTxt= (TextView) itemView.findViewById(R.id.nameTxt);
    }
}
```

[RecyclerView SQLite Database Data](https://github.com/Oclemy/SQLiteServerSideFilterRecycler/raw/master/demos/SQLiteDataRecyclerView.PNG)

##### (b) MyAdapter.java

Our RecyclerView.Adapter class.

Will inflate model.xml into a RecyclerView view item.

Will then bind data to those viewitems.

Below now is our RecyclerView adapter.It shall be bind our filtered data to the RecyclerView.

```java
package com.tutorials.hp.sqliteserversidefilter.mRecycler;

import android.content.Context;
import android.support.v7.widget.RecyclerView;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;

import com.tutorials.hp.sqliteserversidefilter.R;
import com.tutorials.hp.sqliteserversidefilter.mDataObject.Planet;

import java.util.ArrayList;

public class MyAdapter extends RecyclerView.Adapter<MyHolder> {

    Context c;
    ArrayList<Planet> planets;

    public MyAdapter(Context c, ArrayList<Planet> planets) {
        this.c = c;
        this.planets = planets;
    }

    @Override
    public MyHolder onCreateViewHolder(ViewGroup parent, int viewType) {
        View v= LayoutInflater.from(parent.getContext()).inflate(R.layout.model,parent,false);
        MyHolder holder=new MyHolder(v);
        return holder;
    }

    @Override
    public void onBindViewHolder(MyHolder holder, int position) {
        holder.nameTxt.setText(planets.get(position).getName());

    }

    @Override
    public int getItemCount() {
        return planets.size();
    }
}
```

#### Our Activity Class

##### (a) MainActivity.java

Our launcher and only activity.

Provides us with the UI for our application.

Shows a RecyclerView and searchview. Listens to searchview change events to filter.

Also defines us an input dialog for data entry.

```java
package com.tutorials.hp.sqliteserversidefilter;

import android.app.Dialog;
import android.database.Cursor;
import android.os.Bundle;
import android.support.design.widget.FloatingActionButton;
import android.support.design.widget.Snackbar;
import android.support.v7.app.AppCompatActivity;
import android.support.v7.widget.LinearLayoutManager;
import android.support.v7.widget.RecyclerView;
import android.support.v7.widget.SearchView;
import android.support.v7.widget.Toolbar;
import android.view.View;
import android.view.Menu;
import android.view.MenuItem;
import android.widget.Button;
import android.widget.EditText;
import android.widget.Toast;

import com.tutorials.hp.sqliteserversidefilter.mDataBase.DBAdapter;
import com.tutorials.hp.sqliteserversidefilter.mDataObject.Planet;
import com.tutorials.hp.sqliteserversidefilter.mRecycler.MyAdapter;

import java.util.ArrayList;

public class MainActivity extends AppCompatActivity {

    RecyclerView rv;
    SearchView sv;
    EditText nameTxt;
    Button saveBtn,retrieveBtn;
    ArrayList<Planet> planets=new ArrayList<>();
    MyAdapter adapter;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);
        Toolbar toolbar = (Toolbar) findViewById(R.id.toolbar);
        setSupportActionBar(toolbar);
        FloatingActionButton fab = (FloatingActionButton) findViewById(R.id.fab);

        rv= (RecyclerView) findViewById(R.id.rv);
        rv.setLayoutManager(new LinearLayoutManager(this));

        sv= (SearchView) findViewById(R.id.sv);
        adapter=new MyAdapter(this,planets);

        fab.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View view) {

                displayDialog();
            }
        });

        sv.setOnQueryTextListener(new SearchView.OnQueryTextListener() {
            @Override
            public boolean onQueryTextSubmit(String query) {
                return false;
            }

            @Override
            public boolean onQueryTextChange(String query) {
                getPlanets(query);
                return false;
            }
        });

    }

    private void displayDialog()
    {
        Dialog d=new Dialog(this);
        d.setTitle("SQLite Database");
        d.setContentView(R.layout.dialog_layout);

        nameTxt= (EditText) d.findViewById(R.id.nameEditTxt);
        saveBtn= (Button) d.findViewById(R.id.saveBtn);
        retrieveBtn= (Button) d.findViewById(R.id.retrieveBtn);

        saveBtn.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                save(nameTxt.getText().toString());
            }
        });
        retrieveBtn.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                getPlanets(null);
            }
        });

        //SHOW DIALOG
        d.show();

    }

    private void save(String name)
    {
        DBAdapter db=new DBAdapter(this);
        db.openDB();
        if(db.add(name))
        {
            nameTxt.setText("");
        }else {
            Toast.makeText(this,"Unable to Save",Toast.LENGTH_SHORT).show();
        }
        db.closeDB();

        getPlanets(null);

    }

    private void getPlanets(String searchTerm)
    {
        planets.clear();

        DBAdapter db=new DBAdapter(this);
        db.openDB();
        Planet p=null;
        Cursor c=db.retrieve(searchTerm);

        while (c.moveToNext())
        {
            int id=c.getInt(0);
            String name=c.getString(1);

            p=new Planet();
            p.setId(id);
            p.setName(name);

            planets.add(p);
        }
        db.closeDB();
        rv.setAdapter(adapter);
    }
}
```

![RecyclerView SQLite Search Via SearchView](https://github.com/Oclemy/SQLiteServerSideFilterRecycler/raw/master/demos/SearchSQLite.PNG)

#### Download

Download code below.

If you prefer more explanations or want to see the demo then the video tutorial is [here](http://www.youtube.com/watch?v=w4HOAwRvKhA).

| No. | Location | Link |
| --- | --- | --- |
| 1. | GitHub | [Direct Download](https://github.com/Oclemy/SQLiteServerSideFilterRecycler/archive/master.zip) |
| 2. | GitHub | [Browse](https://github.com/Oclemy/SQLiteServerSideFilterRecycler) |
| 3. | YouTube | [Video Tutorial](https://www.youtube.com/watch?v=w4HOAwRvKhA) |
| 4. | YouTube | [Our YouTube Channel](https://www.youtube.com/channel/UCpdkWp2zh5Qv1ZWlnqswdCw) |
