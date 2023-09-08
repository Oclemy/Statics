# SQLite Spinner CRUD


_Android SQLite Spinner Tutorials and Examples._

How to perform several SQLite Database CRUD operations in android with Spinner as the adapterview.


### Android SQLite - Spinner - INSERT,SELECT and Show

_Android SQLite - Spinner - INSERT,SELECT and Show Tutorial._

This is an android sqlite tutorial.We see how save data to sqlite database from edittext,retrieve that data and show it in a simple spinner.

Nowadays most apps need or require to store content or data in some form.There is the cloud but it isn’t a replacement for local storage.Neither will it be in the near future.

Storing data locally is important because its easily retrievable,doesn’t require internet connection and is fast. Good old SQLite is still the way to go.Together with Realm database,they are two ways that are now common in data storage.The package we shall be using is **_android.database.sqlite_**

It Was added in API 1 and contains classes which your app can use when talking to and managing your database. Android does ship with SQLite database. As of now SQLite 3.4.0. One of those classes is **_Android.database.sqlite.SQliteDatabase_** .

This class derives from android.database.SQLite.SQLiteCloseable and obviously,java.lang.Object. This class has methods that we can use to basically, manage our SQLite database. It has methods for CRUD stuff. Also execute SQL statements. A database has to be unique for each single application, within that application.

Android SQLite Spinner tutorial.Today we explore how to insert/save data into sqlite database,then retrieve that data and show it in a spinner.We shall be saving data from EditTexts on button click.

However if you prefer a video version of this tutorial with maybe more explanations,watch our tutorial [here](http://www.youtube.com/watch?v=su_gqbD3d0Y).

#### SECTION 1 : Our MainActivity

This is the launcher activity for the project. This will represent the user interface with which the user will interact with app. This means the user will have widgets to enter or save data to firebase. These widgets include:

1. EditText - This will be used to type or enter data to be saved in sqlite.
2. Button - This will initiate the manipulation of our database when clicked. Either we save or retrieve.
3. Spinner - This is the component or widget onto which we render our data retrieved from SQLite database.

- We save data from edittext to SQLite using our database adapter class object.
- We retrieve our sqlite data then bind the data to our spinner

```java
package com.tutorials.dbgridview;

import java.util.ArrayList;

import android.app.Activity;
import android.database.Cursor;
import android.os.Bundle;
import android.view.View;
import android.view.View.OnClickListener;
import android.widget.ArrayAdapter;
import android.widget.Button;
import android.widget.EditText;
import android.widget.Spinner;
import android.widget.Toast;

public class MainActivity extends Activity {

  Spinner sp;
  EditText nametxt,posTxt;
  Button saveBtn,retrievebtn;

  ArrayList<String> names=new ArrayList<String>();
  ArrayAdapter<String> adapter;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);

        sp=(Spinner) findViewById(R.id.spinner1);
        nametxt=(EditText) findViewById(R.id.nameTxt);
        posTxt=(EditText) findViewById(R.id.posTxt);

        saveBtn=(Button) findViewById(R.id.saveBtn);
        retrievebtn=(Button) findViewById(R.id.retrievebtn);

        //ADAPTER
        adapter=new ArrayAdapter<String>(this, android.R.layout.simple_list_item_1,names);

        final DBAdapter db=new DBAdapter(this);

        //EVENTS
        saveBtn.setOnClickListener(new OnClickListener() {

      @Override
      public void onClick(View v) {
        // TODO Auto-generated method stub

        //OPEN
        db.openDB();

        long result=db.add(nametxt.getText().toString(), posTxt.getText().toString());

        if( result != 0)
        {
           nametxt.setText("");
                      posTxt.setText("");

        }else
        {
            Toast.makeText(getApplicationContext(), "Failure", Toast.LENGTH_SHORT).show();
        }

        //CLOSE
        db.close();
      }
    });

        //RETERIEVE
        retrievebtn.setOnClickListener(new OnClickListener() {

      @Override
      public void onClick(View arg0) {
        // TODO Auto-generated method stub

        names.clear();

        //OPEN
        db.openDB();

        //RETRIEVE
        Cursor c=db.getAllValues();

        while(c.moveToNext())
        {
          String name=c.getString(1);
          names.add(name);
        }

        //CLOSE
        db.close();

        //SET IT TO SPINNER
        sp.setAdapter(adapter);
      }
    });

    }
}
```

#### SECTION 2 : Our SQLite database Adapter

- We perform CRUD here.
- We save and retrieve data to SQLite database.
- We have DBHelper class that helps in handling database table upgrade and creation.

This class as the name `DBAdapter` suggests, is going to adapt our data to SQLite database. In fact this is where we perform our basic CRUD.

We plan to:

1. Open Database Connection.
2. Save data typed in edittext.
3. CLose Database Connection.

and

1. Open Database Connection.
2. Retrieve data saved in SQLite database.
3. Close Connection.
4. Return an arraylist containing retrieved data

That ArrayList can then be bound to the spinner.

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

  static final String TAG = "DBSpinner";

  //DB PROPERTIES
  static final String DBNAME = "s_DB";
  static final String TBNAME = "s_TB";
  static final int DBVERSION = '1';

  //CREATE TB
  static final String CREATE_TB="CREATE TABLE s_TB(id INTEGER PRIMARY KEY AUTOINCREMENT,"
            + "name TEXT NOT NULL,position TEXT NOT NULL);";

  final Context c;
  SQLiteDatabase db;
  DBHelper helper;

  public DBAdapter(Context ctx)
  {
     this.c=ctx;
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
      // TODO Auto-generated method stub

      try
      {
        db.execSQL(CREATE_TB);
      }catch (SQLException e) {
                e.printStackTrace();
            }

    }

    @Override
    public void onUpgrade(SQLiteDatabase db, int oldeVersion, int newVersion) {
      // TODO Auto-generated method stub

      Log.w(TAG, "Upgrading DB");

      db.execSQL("DROP TABLE IF EXISTS s_TB");

      onCreate(db);
    }

  }

  // OPEN THE DB
  public DBAdapter openDB()
  {
    try
    {
      db=helper.getWritableDatabase();

    }catch (SQLException e) {
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

#### SECTION 3 : Our MainActivity Layout

This is the layout for our MainActivity. It uses [RelativeLayout](https://camposha.info/android/relativelayout) to organize widgets. A RelativeLayout is a type of View we call a ViewGroup. That is since it wraps and arranges other views. Some of those views it will be wrapping include a [button](https://camposha.info/android/relativelayout), EditTexts and spinner.

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

    </LinearLayout>

    <TextView
        android_id="@+id/textView3"
        android_layout_width="wrap_content"
        android_layout_height="wrap_content"
        android_layout_alignRight="@+id/retrievebtn"
        android_layout_below="@+id/saveBtn"
        android_layout_marginTop="36dp"
        android_text="DATABASE VALUES SPINNER :"
        android_textAppearance="?android:attr/textAppearanceLarge" />

    <Spinner
        android_id="@+id/spinner1"
        android_layout_width="wrap_content"
        android_layout_height="wrap_content"
        android_layout_alignLeft="@+id/textView3"
        android_layout_below="@+id/textView3"
        android_layout_marginTop="30dp" />

</RelativeLayout>
```
