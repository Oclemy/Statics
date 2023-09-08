# SQLite with GridView Examples


_Android SQLite GridView Tutorials and Examples_.

In this piece we will look at how to work with SQLite and GridView. [SQLite](https://camposha.info/computer-science/sqlite) is definitely the database engine for android while GridView is an adapterview that renders items in a two-dimensional format, in grids.


### 1\. Android SQLite Database - GridView - INSERT from EditText,SELECT,Show

An android sqlite database tutorial here.We see how save data to sqlite database from edittext,retrieve that data and show it in a simple gridview.

#### Section 1 : Database Adapter Class

- We perform CRUD here.
- We save and retrieve data to SQLite database.
- We have DBHelper class that helps in handling database table upgrade and creation.

```java
package com.tutorials.dbgridview;

import android.content.ContentValues;
import android.content.Context;
import android.database.Cursor;
import android.database.SQLException;
import android.database.sqlite.SQLiteDatabase;
import android.database.sqlite.SQLiteOpenHelper;
import android.util.Log;

public class DBAdapter {

  //COLUMNS
  static final String ROWID="id";
  static final String NAME="name";
   static final String POSITION = "position";

   static final String TAG = "DBAdapter";

  //DB PROPERTIES
   static final String DBNAME="g_DB";
   static final String TBNAME="g_TB";
   static final int DBVERSION='1';

   static final String CREATE_TB="CREATE TABLE g_TB(id INTEGER PRIMARY KEY AUTOINCREMENT,"
              + "name TEXT NOT NULL,position TEXT NOT NULL);";

   final Context c;
   SQLiteDatabase db;
   DBHelper helper;

   public DBAdapter(Context c) {
    // TODO Auto-generated constructor stub

     this.c=c;
     helper=new DBHelper(c);
  }

  // INNER HELPER DB CLASS
   private static class DBHelper extends SQLiteOpenHelper
   {

    public DBHelper(Context context) {
      super(context, DBNAME, null, DBVERSION);
      // TODO Auto-generated constructor stub
    }

    @Override
    public void onCreate(SQLiteDatabase db) {

      try
      {
        db.execSQL(CREATE_TB);
      } catch (SQLException e) {
                e.printStackTrace();
            }

    }

    @Override
    public void onUpgrade(SQLiteDatabase db, int oldVersion, int newVersion) {
      // TODO Auto-generated method stub

      Log.w(TAG, "upgrading DB");

      db.execSQL("DROP TABLE IF EXISTS g_TB");
      onCreate(db);

    }

   }

   // OPEN THE DB
   public DBAdapter openDB()
   {
     try
     {
       db=helper.getWritableDatabase();

     } catch (SQLException e) {
             e.printStackTrace();
         }

     return this;

   }

   //CLOSE THE DB
   public void close()
   {
     helper.close();
   }

   //INSERT INTO TABLE
   public long add(String name,String pos)
   {
     try
     {

       ContentValues cv=new ContentValues();
       cv.put(NAME, name);
       cv.put(POSITION, pos);

       return db.insert(TBNAME, ROWID, cv);
     }catch (SQLException e) {
             e.printStackTrace();
         }

     return 0;
   }

    //GET ALL VALUES
   public Cursor getAllValues()
   {
     String[] columns={ROWID,NAME,POSITION};

     return db.query(TBNAME, columns, null, null, null, null, null);
   }

}
```

#### Section 2 : MainActivity

- We save data from edittext to SQLite using our database adapter class object.
- We retrieve our sqlite data and bind to our gridview.

```java
package com.tutorials.dbgridview;

import java.util.ArrayList;

import android.app.Activity;
import android.database.Cursor;
import android.os.Bundle;
import android.view.View;
import android.view.View.OnClickListener;
import android.widget.AdapterView;
import android.widget.AdapterView.OnItemClickListener;
import android.widget.ArrayAdapter;
import android.widget.Button;
import android.widget.EditText;
import android.widget.GridView;
import android.widget.Toast;

public class MainActivity extends Activity {

  GridView gv;
  EditText nameTxt,posTxt;
  Button saveBtn,retrieveBtn;

  ArrayList<String> players=new ArrayList<String>();
  ArrayAdapter<String> adapter;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);

        //INITALZE
        gv=(GridView) findViewById(R.id.gridView1);
        nameTxt=(EditText) findViewById(R.id.nameTxt);
        posTxt=(EditText) findViewById(R.id.posTxt);

        saveBtn=(Button) findViewById(R.id.saveBtn);
        retrieveBtn=(Button) findViewById(R.id.retrievebtn);

        adapter=new ArrayAdapter<String>(this, android.R.layout.simple_list_item_1,players);

        //DB
        final DBAdapter db=new DBAdapter(this);

        //EVENTS
        saveBtn.setOnClickListener(new OnClickListener() {

      @Override
      public void onClick(View v) {
        // TODO Auto-generated method stub

        //OPEN
        db.openDB();

        //INSERT
        long result=db.add(nameTxt.getText().toString(), posTxt.getText().toString());

        if(result != 0)
        {
          nameTxt.setText("");
                    posTxt.setText("");
        }else
        {
           Toast.makeText(getApplicationContext(), "Failure", Toast.LENGTH_SHORT).show();
        }

        //CLOSE
        db.close();

      }
    });

        //RETRIVE
        retrieveBtn.setOnClickListener(new OnClickListener() {

      @Override
      public void onClick(View v) {

        players.clear();

        //OPEN
        db.openDB();

        //RETRIEVE
        Cursor c=db.getAllValues();

        while(c.moveToNext())
        {
          String name=c.getString(1);
          players.add(name);
        }

        db.close();

        gv.setAdapter(adapter);

      }
    });

        gv.setOnItemClickListener(new OnItemClickListener() {

      @Override
      public void onItemClick(AdapterView<?> arg0, View arg1, int pos,
          long arg3) {
        // TODO Auto-generated method stub

        Toast.makeText(getApplicationContext(), players.get(pos), Toast.LENGTH_SHORT).show();

      }
    });

    }
}
```

#### Section 3 : Layout

- Contains edittext,buttons and GridView.

Definitely the edittext is for entering data to be saved in the SQLite database. The button is for listening to the click events that can initiate either saving or retrieving data from sqlite database. The GridView is for rendering the data fetched from SQLite database.

```xml
<RelativeLayout

    android_layout_width="match_parent"
    android_layout_height="match_parent"
    android_paddingBottom="@dimen/activity_vertical_margin"
    android_paddingLeft="@dimen/activity_horizontal_margin"
    android_paddingRight="@dimen/activity_horizontal_margin"
    android_paddingTop="@dimen/activity_vertical_margin"
    tools_context=".MainActivity" >

    <Button
        android_id="@+id/saveBtn"
        android_layout_width="wrap_content"
        android_layout_height="wrap_content"
        android_layout_below="@+id/posTxt"
        android_layout_marginTop="34dp"
        android_text="Save" />

    <EditText
        android_id="@+id/nameTxt"
        android_layout_width="wrap_content"
        android_layout_height="wrap_content"
        android_layout_alignParentTop="true"
        android_layout_marginTop="20dp"
        android_layout_toRightOf="@+id/saveBtn"
        android_ems="10" />

    <EditText
        android_id="@+id/posTxt"
        android_layout_width="wrap_content"
        android_layout_height="wrap_content"
        android_layout_alignLeft="@+id/nameTxt"
        android_layout_below="@+id/nameTxt"
        android_ems="10" >

        <requestFocus
            android_layout_width="wrap_content"
            android_layout_height="wrap_content" />

    </EditText>

    <Button
        android_id="@+id/retrievebtn"
        android_layout_width="wrap_content"
        android_layout_height="wrap_content"
        android_layout_alignBaseline="@+id/saveBtn"
        android_layout_alignBottom="@+id/saveBtn"
        android_layout_alignRight="@+id/posTxt"
        android_text="Retrieve" />

    <TextView
        android_id="@+id/textView1"
        android_layout_width="wrap_content"
        android_layout_height="wrap_content"
        android_layout_above="@+id/posTxt"
        android_layout_alignParentLeft="true"
        android_text="Name"
        android_textAppearance="?android:attr/textAppearanceSmall" />

    <TextView
        android_id="@+id/textView2"
        android_layout_width="wrap_content"
        android_layout_height="wrap_content"
        android_layout_alignBottom="@+id/posTxt"
        android_layout_alignParentLeft="true"
        android_text="Position"
        android_textAppearance="?android:attr/textAppearanceSmall" />

    <LinearLayout
        android_id="@+id/linearLayout1"
        android_layout_width="match_parent"
        android_layout_height="wrap_content"
        android_layout_below="@+id/saveBtn"
        android_layout_marginRight="16dp"
        android_orientation="vertical" >

    <TextView
        android_id="@+id/textView3"
        android_layout_width="wrap_content"
        android_layout_height="wrap_content"
        android_layout_above="@+id/gridView1"
         android_text="DATABASE VALUES GRIDVIEW"
        android_textAppearance="?android:attr/textAppearanceLarge"
        />

        <GridView
        android_id="@+id/gridView1"
        android_layout_width="match_parent"
        android_layout_height="wrap_content"
        android_numColumns="3">
        </GridView>
    </LinearLayout>
</RelativeLayout>
```

* * *

### 2.Android SQLite Database - ServerSide Pagination - GridView - Next/Previous

_Android SQLite Database - ServerSide Pagination - GridView - Next/Previous Tutorial._

Hey good people. Society is now in an error of big data. There is alot of data out there and normally there are tools to manipulate it and store it.But when it comes to display, there is only one way of making it easy to process by users : showing it in chunks,otherwise known as pagination.

Thats exactly the purpose of this lesson,only that we use SQLite database and our platform is android.For SQlite we shall use RushORM, which is an amazing android SQlite database Object relational Mapper. The purpose is this :

- INSERT/SAVE SQLite data into SQLite database from edittexts.
- RETRIEVE/SELECT paged data.We do pur pagination in the server side hence it being relatively fast as SQlite queries are heavily optimized.
- Show data page by page,each page containing five items.
- You can continue adding more data and our GridView automatically gets updated.
- We use Next/Previous pagination.If you are in the first page,we disable obviously previous button, if you are in the last page,we disable next button.
- We are using RushORM.
- Our GridView is custom and has CardViews as viewitems.

![Project Demo](https://camposha.info/demos/source/sqlitegridviewpagination/demo1.gif)

[Direct Download](https://github.com/Oclemy/SQLiteGridViewPagination/archive/master.zip)

STEP 1 : Our Build.Gradles

#### Build.Gradle(Project)

- First add RushORM Maven repository.
- Have a look at the allprojects closure below.

```groovy
// Top-level build file where you can add configuration options common to all sub-projects/modules.

allprojects {
    repositories {
        maven {
            url "http://maven.rushorm.com"
        }
        jcenter()
    }
}

task clean(type: Delete) {
    delete rootProject.buildDir
}
```

#### Build.Gradle(App)

- Then add RushORM and CardView dependencies.
- Sync your project to download RushORM.

```groovy
dependencies {
    compile fileTree(dir: 'libs', include: ['*.jar'])
    testCompile 'junit:junit:4.12'
    compile 'com.android.support:appcompat-v7:24.2.1'
    compile 'com.android.support:design:24.2.1'
    compile 'com.android.support:cardview-v7:24.2.1'
    compile 'co.uk.rushorm:rushandroid:1.2.0'

}
```

#### STEP 2 :  Application subclass.

- Create a global application subclass.
- We initialize and setup the RushORM configuration right here.

```java
package com.tutorials.hp.sqlitegridviewpagination;

import android.app.Application;

import co.uk.rushorm.android.AndroidInitializeConfig;
import co.uk.rushorm.core.RushCore;

public class MainApplication extends Application {
    @Override
    public void onCreate() {
        super.onCreate();

        AndroidInitializeConfig config=new AndroidInitializeConfig(getApplicationContext());
        RushCore.initialize(config);
    }
}
```

#### STEP 3 : Our Model class

- Make it derive from RushORM.
- Its our data object and shall get translated to our SQLite table.
- Take note of the package name,in fact copy it.

```java
package com.tutorials.hp.sqlitegridviewpagination.mDB;

import co.uk.rushorm.core.RushObject;

public class Spacecraft extends RushObject {

    private String name,propellant;
    //AN EMPTY CONSTRUCTOR
    public Spacecraft() {
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
}
```

#### STEP 4 : Our AndroidManifest.xml

- Add meta data of our RushORM into your Manifest as below.
- Now paste the package name of your Model class in the Rush_classes meta tag as below.

```xml
<?xml version="1.0" encoding="utf-8"?>
<manifest
    package="com.tutorials.hp.sqlitegridviewpagination">

    <application
        android_name=".MainApplication"
        android_allowBackup="true"
        android_icon="@mipmap/ic_launcher"
        android_label="@string/app_name"
        android_supportsRtl="true"
        android_theme="@style/AppTheme">
        <activity
            android_name=".MainActivity"
            android_label="SQLite GridView Pagination"
            android_theme="@style/AppTheme.NoActionBar">
            <intent-filter>
                <action android_name="android.intent.action.MAIN" />

                <category android_name="android.intent.category.LAUNCHER" />
            </intent-filter>
        </activity>

        <!--META DATAS FOR OUR DATABASE-->
        <!--THIS FIRST LINE IS COMPULSORY.ADD YOUR DATABASE PACKAGE-->
        <meta-data android_name="Rush_classes_package" android_value="com.tutorials.hp.sqlitegridviewpagination.mDB" />
        <!-- Updating this will cause a database upgrade -->
        <meta-data android_name="Rush_db_version" android_value="1" />

        <!-- Database name -->
        <meta-data android_name="Rush_db_name" android_value="SpacecraftsDB.db" />

        <!-- Setting this to true will cause a migration to happen every launch,
        this is very handy during development although could cause data loss -->
        <meta-data android_name="Rush_debug" android_value="false" />

        <!-- Setting this to true mean that tables will only be created of classes that
        extend RushObject and are annotated with @RushTableAnnotation -->
        <meta-data android_name="Rush_requires_table_annotation" android_value="false" />

        <!-- Turning on logging can be done by settings this value to true -->
        <meta-data android_name="Rush_log" android_value="false" />

    </application>

</manifest>
```

#### STEP 5 : Our CustomAdapter

- We are using CardViews as the Viewitems of our GridView.
- Our model.xml shall get translated into a CardView.

```java
package com.tutorials.hp.sqlitegridviewpagination.mAdapterView;

import android.content.Context;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.BaseAdapter;
import android.widget.TextView;
import android.widget.Toast;

import com.tutorials.hp.sqlitegridviewpagination.R;
import com.tutorials.hp.sqlitegridviewpagination.mDB.Spacecraft;

import java.util.List;

public class CustomAdapter extends BaseAdapter {

    Context c;
    List<Spacecraft> spacecrafts;
    LayoutInflater inflater;

    public CustomAdapter(Context c, List<Spacecraft> spacecrafts) {
        this.c = c;
        this.spacecrafts = spacecrafts;
    }

    @Override
    public int getCount() {
        return spacecrafts.size();
    }

    @Override
    public Object getItem(int position) {
        return spacecrafts.get(position);
    }

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
        if(convertView==null)
        {
            convertView=inflater.inflate(R.layout.model,parent,false);
        }

        TextView nameTxt= (TextView) convertView.findViewById(R.id.nameTxt);
        TextView propTxt= (TextView) convertView.findViewById(R.id.propellantTxt);

        //BIND DATA

        nameTxt.setText(spacecrafts.get(position).getName());
        propTxt.setText(spacecrafts.get(position).getPropellant());

        //SET CLICK
        convertView.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                Toast.makeText(c, spacecrafts.get(position).getName(), Toast.LENGTH_SHORT).show();
            }
        });

        return convertView;
    }

}
```

#### STEP 6 : Our Paginator class

- Yes the purpose of this class is to page our data.
- We are using next/previous type of pagination.

```java
package com.tutorials.hp.sqlitegridviewpagination.mAdapterView;

import com.tutorials.hp.sqlitegridviewpagination.mDB.Spacecraft;

import java.util.ArrayList;
import java.util.List;

import co.uk.rushorm.core.RushSearch;

public class Paginator {

    private int TOTAL_NUM_ITEMS;
    private int ITEMS_PER_PAGE;

    public Paginator() {
         TOTAL_NUM_ITEMS= (int) new RushSearch().count(Spacecraft.class);
         ITEMS_PER_PAGE=5;
    }
    /*
    TOTAL NUMBER OF PAGES
     */
    public int getTotalPages()
    {
        return TOTAL_NUM_ITEMS/ITEMS_PER_PAGE;
    }

    /*
    CURRENT PAGE SPACECRAFTS LIST
     */
    public List<Spacecraft> getCurrentSpacecrafts(int currentPage)
    {
        int startItem=currentPage*ITEMS_PER_PAGE;
        List<Spacecraft> currentSpacecrafts=new ArrayList<>();
        try
        {
            currentSpacecrafts=new RushSearch().limit(ITEMS_PER_PAGE).offset(startItem).find(Spacecraft.class);

        }catch (Exception e)
        {
            e.printStackTrace();
        }
        return currentSpacecrafts;
    }

}
```

#### STEP 8 : Our MainActivity.

- Lets initialize all our views,including gridview,edittexts,dialog and buttons right here.
- We also set adapter to our gridview.

```java
package com.tutorials.hp.sqlitegridviewpagination;

import android.app.Dialog;
import android.os.Bundle;
import android.support.design.widget.FloatingActionButton;
import android.support.v7.app.AppCompatActivity;
import android.support.v7.widget.Toolbar;
import android.view.View;
import android.widget.Button;
import android.widget.EditText;
import android.widget.GridView;

import com.tutorials.hp.sqlitegridviewpagination.mAdapterView.CustomAdapter;
import com.tutorials.hp.sqlitegridviewpagination.mAdapterView.Paginator;
import com.tutorials.hp.sqlitegridviewpagination.mDB.Spacecraft;

public class MainActivity extends AppCompatActivity {

    GridView gv;
    EditText nameEditText,propellantEditTxt;
    Button saveBtn,retrieveBtn,nextBtn,prevBtn;

    private int currentPage=0;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);
        Toolbar toolbar = (Toolbar) findViewById(R.id.toolbar);
        setSupportActionBar(toolbar);

        //INITIALIZE VIEWS
        gv= (GridView) findViewById(R.id.gv);
        nextBtn= (Button) findViewById(R.id.nextBn);
        prevBtn= (Button) findViewById(R.id.prevBtn);
        FloatingActionButton fab = (FloatingActionButton) findViewById(R.id.fab);

        prevBtn.setEnabled(false);

        //FIRST PAGE WHEN LOADED
        if(new Paginator().getCurrentSpacecrafts(currentPage).size()>0)
        {
            gv.setAdapter(new CustomAdapter(MainActivity.this,new Paginator().getCurrentSpacecrafts(currentPage)));

        }else
        {
            nextBtn.setEnabled(false);
        }

        //DISPLAY DIALOG
        fab.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View view) {
                displayDialog();
            }
        });

        //NEXT BUTTON CLICKED
        nextBtn.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View view) {
                currentPage+=1;
                gv.setAdapter(new CustomAdapter(MainActivity.this,new Paginator().getCurrentSpacecrafts(currentPage)));
                toggleButtons();
            }
        });

        //PREVIOUS BUTTON CLICKED
        prevBtn.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View view) {
                currentPage-=1;
                gv.setAdapter(new CustomAdapter(MainActivity.this,new Paginator().getCurrentSpacecrafts(currentPage)));
                toggleButtons();
            }
        });

    }

    /*
    DISPLAY INPUT DIALOG
     */
    private void displayDialog()
    {
        final Dialog d=new Dialog(this);
        d.setTitle("SQLITE DATA");
        d.setContentView(R.layout.dialog_layout);

        nameEditText= (EditText) d.findViewById(R.id.nameEditTxt);
        propellantEditTxt= (EditText) d.findViewById(R.id.propellantEditTxt);

        saveBtn= (Button) d.findViewById(R.id.saveBtn);
        retrieveBtn= (Button) d.findViewById(R.id.retrieveBtn);

            saveBtn.setOnClickListener(new View.OnClickListener() {
                @Override
                public void onClick(View v) {
                    Spacecraft s=new Spacecraft();
                    save(s);
                    nameEditText.setText("");
                    propellantEditTxt.setText("");
                    toggleButtons();

                }
            });
            retrieveBtn.setOnClickListener(new View.OnClickListener() {
                @Override
                public void onClick(View v) {
                    gv.setAdapter(new CustomAdapter(MainActivity.this,new Paginator().getCurrentSpacecrafts(currentPage)));
                    toggleButtons();

                }
            });
       d.show();

    }

    /*
    INSERT DATA
     */
    private void save(Spacecraft s)
    {
        s.setName(nameEditText.getText().toString());
        s.setPropellant(propellantEditTxt.getText().toString());
        s.save();
        gv.setAdapter(new CustomAdapter(MainActivity.this,new Paginator().getCurrentSpacecrafts(currentPage)));
        toggleButtons();
    }

    /*
    TOGGLE PREVIOUS AND NEXT BUTTONS
     */
    private void toggleButtons()
    {
        if(currentPage==new Paginator().getTotalPages())
        {
            nextBtn.setEnabled(false);
            prevBtn.setEnabled(true);
        }else
        if(currentPage==0)
        {
            prevBtn.setEnabled(false);
            nextBtn.setEnabled(true);
        }else
        if(currentPage>=1 && currentPage < new Paginator().getTotalPages())
        {
            nextBtn.setEnabled(true);
            prevBtn.setEnabled(true);
        }
    }
}
```

#### How To Download and Run

- Download the project above.
- You'll get a zipped file,extract it.
- Open the Android Studio.
- Now close, already open project
- From the Menu bar click on File >New> Import Project
- Now Choose a Destination Folder, from where you want to import project.
- Choose an Android Project.
- Now Click on “OK“.
- Done, your Project importing start.

### 3\. Android Swipe Tabbed SQLite - Fragments With GridView

_Android Swipe Tabbed SQLite - Fragments With GridView Tutorial and Example._

- Here we see how to categorize SQLite data in swipeable tabs.
- Each fragment shall have a unique dataset bound on a GridView.
- The tabs and fragments are clickable and swipeable respectively.
- We shall display a dialog to insert data.
- The data shall be categorized according to categories.
- The categories as well as data shall be fetched from the database.
- The component of choice is GridView.

![Android Project Structure](https://github.com/Oclemy/Tabbed-SQlite-GridView/raw/master/demos/Project%20Structure.PNG)

Below are some of our important classes.Take note its important you view the full source code to know how to use the following classes :

### Constants

- Hold database tabel column constants.
- Define table creation as well deletion statement.

```java
package com.tutorials.hp.tabbedsqlite.mDB;

public class Constants {
    /*
  COLUMNS
   */
    static final String ROW_ID="id";
    static final String NAME="name";
    static final String CATEGORY="category";

    /*
    DB PROPERTIES
     */
    static final String DB_NAME="spg_DB";
    static final String TB_NAME="spg_TB";
    static final int DB_VERSION=1;

    /*
    TABLE CREATION STATEMENT
     */
    static final String CREATE_TB="CREATE TABLE spg_TB(id INTEGER PRIMARY KEY AUTOINCREMENT,"
            + "name TEXT NOT NULL,category TEXT NOT NULL);";

    /*
    TABLE DELETION STMT
     */
    static final String DROP_TB="DROP TABLE IF EXISTS "+TB_NAME;

}
```

####  DBAdapter class

- Perform CRUD operations.
- OPen connection,Insert data,Retrieve data according to selected category,close connection.

```java
package com.tutorials.hp.tabbedsqlite.mDB;

import android.content.ContentValues;
import android.content.Context;
import android.database.Cursor;
import android.database.SQLException;
import android.database.sqlite.SQLiteDatabase;
import android.widget.Space;

import com.tutorials.hp.tabbedsqlite.mModel.Spacecraft;

import java.util.ArrayList;

public class DBAdapter {

    Context c;
    SQLiteDatabase db;
    DBHelper helper;

    /*
    1. INITIALIZE DB HELPER AND PASS IT A CONTEXT

     */
    public DBAdapter(Context c) {
        this.c = c;
        helper = new DBHelper(c);
    }

    /*
    SAVE DATA TO DB
     */
    public boolean saveSpacecraft(Spacecraft spacecraft) {
        try {
            db = helper.getWritableDatabase();

            ContentValues cv = new ContentValues();
            cv.put(Constants.NAME, spacecraft.getName());
            cv.put(Constants.CATEGORY, spacecraft.getCategory());

            long result = db.insert(Constants.TB_NAME, Constants.ROW_ID, cv);
            if (result > 0) {
                return true;
            }

        } catch (SQLException e) {
            e.printStackTrace();
        } finally {
            helper.close();
        }

        return false;
    }

    /*
     1. RETRIEVE SPACECRAFTS FROM DB AND POPULATE ARRAYLIST
     2. RETURN THE LIST
     */
    public ArrayList<Spacecraft> retrieveSpacecrafts(String category) {
        ArrayList<Spacecraft> spacecrafts=new ArrayList<>();

        try {
            db = helper.getWritableDatabase();

           Cursor c=db.rawQuery("SELECT * FROM "+Constants.TB_NAME+" WHERE "+Constants.CATEGORY+" = '"+category+"'",null);

            Spacecraft s;
            spacecrafts.clear();

            while (c.moveToNext())
            {
                String s_name=c.getString(1);
                String s_category=c.getString(2);

                s=new Spacecraft();
                s.setName(s_name);
                s.setCategory(s_category);

                spacecrafts.add(s);
            }

        } catch (SQLException e) {
            e.printStackTrace();
        } finally {
            helper.close();
        }

        return spacecrafts;
    }

}
```

![INSERT DATA SQLITE](https://github.com/Oclemy/Tabbed-SQlite-GridView/raw/master/demos/Tabbed%20SQlite%20Save%20Data.PNG)

#### MainActivity

```java
package com.tutorials.hp.tabbedsqlite;

import android.app.Dialog;
import android.os.Bundle;
import android.support.design.widget.FloatingActionButton;
import android.support.design.widget.TabLayout;
import android.support.v4.view.ViewPager;
import android.support.v7.app.AppCompatActivity;
import android.support.v7.widget.Toolbar;
import android.view.Menu;
import android.view.MenuItem;
import android.view.View;
import android.widget.ArrayAdapter;
import android.widget.Button;
import android.widget.EditText;
import android.widget.Spinner;
import android.widget.Toast;

import com.tutorials.hp.tabbedsqlite.mAdapter.MyPagerAdapter;
import com.tutorials.hp.tabbedsqlite.mDB.DBAdapter;
import com.tutorials.hp.tabbedsqlite.mFragments.InterGalactic;
import com.tutorials.hp.tabbedsqlite.mFragments.InterPlanetary;
import com.tutorials.hp.tabbedsqlite.mFragments.InterStellar;
import com.tutorials.hp.tabbedsqlite.mModel.Spacecraft;

public class MainActivity extends AppCompatActivity implements TabLayout.OnTabSelectedListener {

    private TabLayout tab;
    private ViewPager vp;
    int currentPos=0;

    EditText nameEditText;
    Button saveBtn;
    Spinner sp;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);
        Toolbar toolbar = (Toolbar) findViewById(R.id.toolbar);
        setSupportActionBar(toolbar);

        //VIEWS
        FloatingActionButton fab = (FloatingActionButton) findViewById(R.id.fab);

        //VIEWPAGER AND TABS
        vp = (ViewPager) findViewById(R.id.viewpager);
        addPages();

        //SETUP TAB
        tab = (TabLayout) findViewById(R.id.tabs);
        tab.setTabGravity(TabLayout.GRAVITY_FILL);
        tab.setupWithViewPager(vp);
        tab.addOnTabSelectedListener(this);
    }

    /*
    DISPLAY INPUT DIALOG
    SAVE
     */
    private void displayDialog()
    {
        Dialog d=new Dialog(this);
        d.setTitle("SQLITE DATA");
        d.setContentView(R.layout.dialog_layout);

        //INITIALIZE VIEWS
        nameEditText= (EditText) d.findViewById(R.id.nameEditTxt);
        saveBtn= (Button) d.findViewById(R.id.saveBtn);
        sp = (Spinner) d.findViewById(R.id.category_SP);

        //SPINNER ADAPTER
        String[] categories = {InterPlanetary.newInstance().toString(),
                InterStellar.newInstance().toString(),
                InterGalactic.newInstance().toString()};
        sp.setAdapter(new ArrayAdapter<String>(this, android.R.layout.simple_list_item_1, categories));

       //SAVE
        saveBtn.setOnClickListener(new View.OnClickListener() {
                                       @Override
                                       public void onClick(View v) {

                                           Spacecraft s = new Spacecraft();
                                           s.setName(nameEditText.getText().toString());
                                           s.setCategory(sp.getSelectedItem().toString());

                                           if (new DBAdapter(MainActivity.this).saveSpacecraft(s)) {
                                               nameEditText.setText("");
                                               sp.setSelection(0);
                                           } else {
                                               Toast.makeText(MainActivity.this, "Not Saved", Toast.LENGTH_SHORT).show();
                                           }
                                       }
                                   });

          //SHOW DIALOG
            d.show();

    }

    //FILL TAB PAGES
    private void addPages()
    {
        MyPagerAdapter myPagerAdapter=new MyPagerAdapter(getSupportFragmentManager());
        myPagerAdapter.addPage(InterPlanetary.newInstance());
        myPagerAdapter.addPage(InterStellar.newInstance());
        myPagerAdapter.addPage(InterGalactic.newInstance());

        vp.setAdapter(myPagerAdapter);
    }

    @Override
    public void onTabSelected(TabLayout.Tab tab) {
        vp.setCurrentItem(currentPos=tab.getPosition());
    }

    @Override
    public void onTabUnselected(TabLayout.Tab tab) {

    }

    @Override
    public void onTabReselected(TabLayout.Tab tab) {

    }

    @Override
    public boolean onCreateOptionsMenu(Menu menu) {
        // Inflate the menu; this adds items to the action bar if it is present.
        getMenuInflater().inflate(R.menu.menu_main, menu);

        return true;
    }
    @Override
    public boolean onOptionsItemSelected(MenuItem item) {

        int id = item.getItemId();

        if (id == R.id.addMenu) {
            displayDialog();
            return true;
        }

        return super.onOptionsItemSelected(item);
    }
}
```
