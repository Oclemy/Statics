# SQLite ListView CRUD Examples


In this tutorial we want to learn SQLite usage in depth using easy to understand examples, especially how to perform CRUD operations whileusing Listview.


## Example 1: Android SQLite Full – ListView – INSERT,SELECT,UPDATE, DELETE with ContextMenu

_Android SQLite Full - ListView - INSERT,SELECT,UPDATE, DELETE with ContextMenu Tutorial._

Basically we see how to perform all CRUD(Create Read Update Delete) Operations against a SQLite database. We use [ListView](https://camposha.info/android/listview) as our adapterview. We provide options via ContextMenu.

Nowadays most apps need or require to store content or data in some form.

There is the cloud but it isn’t a replacement for local storage.Neither will it be in the near future.Storing data locally is important because its easily retrievable,doesn’t require internet connection and is fast. Good old SQLite is still the way to go.

Together with Realm database,they are two ways that are now common in local data storage.The package we shall be using is **_android.database.sqlite_**. This package was added in Android API 1. This implies it has existed since the very inception of android. That package contains classes and apis which we can use when manipulating our database. Android does ship with SQLite database.

**_Android.database.sqlite.SQliteDatabase_** class is defined in the package we talked about above. It inherits from `android.database.SQLite.SQLiteCloseable`. `SQliteDatabase` will give use the methods we need to perform our SQLite CRUD operations. It can also allow us execute SQL statements directly if so we desire.

A database has to be unique for each single application, within that application. Now today we look at ListView and SQLite database.The two are normally commonly used so we try to leave no stone untouched.Nevertheless we have covered full CRUD operations previously but with RecyclerView.Today we look at with ListView.

In short this is what we do here:

1. INSERT/SAVE to SQLite database.
2. SELECT/RETRIEVE data to ListView.
3. UPDATE/EDIT data and refresh.
4. DELETE/REMOVE data on ContextMenu Item selected.
5. We are using Context Menu,material EditTexts and ListView with cards.

![Project Demo](https://camposha.info/demos/source/listviewsqlite/demo1.gif)

The first thing we want to do is create a roof that will contain the SQlite database constants that we desire to use in our project.This makes it easy to reuse and maintain our database classes.

#### Constants.java

This is the Constants class. It will hold all our database constants. Those constants include the column names, database name, table name, database version, table creation statement as well as table droppiing/deleting statement.

```java
package com.tutorials.hp.listviewsqlite.mDataBase;

public class Constants {
    //COLUMNS
    static final String ROW_ID="id";
    static final String NAME="name";

    //DB PROPERTIES
    static final String DB_NAME="hh_DB";
    static final String TB_NAME="hh_TB";
    static final int DB_VERSION=1;

    //CREATE TB STMT
    static final String CREATE_TB="CREATE TABLE hh_TB(id INTEGER PRIMARY KEY AUTOINCREMENT,"
            + "name TEXT NOT NULL);";

    //DROP TB STMT
    static final String DROP_TB="DROP TABLE IF EXISTS "+TB_NAME;
}
```

Apart from the Constants class,we have two more database classes : DBHelper and DBAdapter.

#### DBHelper.java

DBHelper shall create our database table as well as upgrade it.It derives from SQliteOpenHelper class.

```java
package com.tutorials.hp.listviewsqlite.mDataBase;

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

#### DBAdapter.java

DBAdapter below is responsible for all our CRUD operations,saving/inserting data.Then rerieving/selecting that data.We shall also edit/update our SQlite database data as well as deleting. Here's where we define methods to perform those :

```java
package com.tutorials.hp.listviewsqlite.mDataBase;

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

    //OPEN CON
    public void openDB()
    {
        try
        {
            db=helper.getWritableDatabase();
        }catch (SQLException e)
        {

        }
    }
    //CLOSE DB
    public void closeDB()
    {
        try
        {
            helper.close();
        }catch (SQLException e)
        {

        }
    }

    //SAVE
    public boolean add(String name)
    {
        try
        {
            ContentValues cv=new ContentValues();
            cv.put(Constants.NAME,name);

            long result=db.insert(Constants.TB_NAME,Constants.ROW_ID,cv);
            if(result>0)
            {
                return true;
            }
        }catch (SQLException e)
        {
            e.printStackTrace();
        }

        return false;
    }

    //SELECT
    public Cursor retrieve()
    {
        String[] columns={Constants.ROW_ID,Constants.NAME};

        Cursor c=db.query(Constants.TB_NAME,columns,null,null,null,null,null);
        return c;
    }

    //UPDATE/edit
    public boolean update(String newName,int id)
    {
        try
        {
            ContentValues cv=new ContentValues();
            cv.put(Constants.NAME,newName);

            int result=db.update(Constants.TB_NAME,cv, Constants.ROW_ID + " =?", new String[]{String.valueOf(id)});
            if(result>0)
            {
                return true;
            }
        }catch (SQLException e)
        {
             e.printStackTrace();
        }

        return false;

    }

    //DELETE/REMOVE
    public boolean delete(int id)
    {
        try
        {
            int result=db.delete(Constants.TB_NAME,Constants.ROW_ID+" =?",new String[]{String.valueOf(id)});
            if(result>0)
            {
                return true;
            }

        }catch (SQLException e)
        {
            e.printStackTrace();
        }

        return false;
    }

}
```

#### MyLongClickListener.java

Now we shall be displaying the actions to be performed like add,edit,delete data via the ContextMenu.The user longclicks the ListView and we display the ContextMenu. First lets define the signature for our LongClickListner :

```java
package com.tutorials.hp.listviewsqlite.mListView;

public interface MyLongClickListener {

    void onItemLongClick();

}
```

#### MyViewHolder.java

Then we shall have a ViewHolder class for our ListView that shall implement the above interface.We also take note,implement the OnCreateContextMenuListener where we create our menu that shall be our ContextMenu.We add our menu items :

```java
package com.tutorials.hp.listviewsqlite.mListView;

import android.view.ContextMenu;
import android.view.View;
import android.widget.TextView;

import com.tutorials.hp.listviewsqlite.R;

public class MyViewHolder implements View.OnLongClickListener,View.OnCreateContextMenuListener {

    TextView nameTxt;
    MyLongClickListener longClickListener;

    public MyViewHolder(View v) {
        nameTxt= (TextView) v.findViewById(R.id.nameTxt);

        v.setOnLongClickListener(this);
        v.setOnCreateContextMenuListener(this);
    }

    @Override
    public boolean onLongClick(View v) {
        this.longClickListener.onItemLongClick();
        return false;
    }

    public void setLongClickListener(MyLongClickListener longClickListener)
    {
        this.longClickListener=longClickListener;
    }

    @Override
    public void onCreateContextMenu(ContextMenu menu, View v, ContextMenu.ContextMenuInfo menuInfo) {
        menu.setHeaderTitle("Action : ");
        menu.add(0, 0, 0, "NEW");
        menu.add(0,1,0,"EDIT");
        menu.add(0,2,0,"DELETE");

    }
}
```

#### CustomAdapter.java

Our CustomAdapter class is below :

```java
package com.tutorials.hp.listviewsqlite.mListView;

import android.content.Context;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.BaseAdapter;
import android.widget.Toast;

import com.tutorials.hp.listviewsqlite.R;
import com.tutorials.hp.listviewsqlite.mDataObject.Spacecraft;

import java.util.ArrayList;

public class CustomAdapter extends BaseAdapter {

    Context c;
    ArrayList<Spacecraft> spacecrafts;
    LayoutInflater inflater;
    Spacecraft spacecraft;

    public CustomAdapter(Context c, ArrayList<Spacecraft> spacecrafts) {
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

        //BIND DATA
        MyViewHolder holder=new MyViewHolder(convertView);
        holder.nameTxt.setText(spacecrafts.get(position).getName());

        convertView.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                Toast.makeText(c, spacecrafts.get(position).getName(), Toast.LENGTH_SHORT).show();
            }
        });

        holder.setLongClickListener(new MyLongClickListener() {
            @Override
            public void onItemLongClick() {
                spacecraft= (Spacecraft) getItem(position);
            }
        });

        return convertView;
    }

    //EXPOSE NAME AND ID
    public int getSelectedItemID()
    {
        return spacecraft.getId();
    }
    public String getSelectedItemName()
    {
        return spacecraft.getName();
    }

}
```

#### MainActivity.java

Finally we have our MainActivity below :

```java
package com.tutorials.hp.listviewsqlite;

import android.app.Dialog;
import android.database.Cursor;
import android.os.Bundle;
import android.support.design.widget.FloatingActionButton;
import android.support.design.widget.Snackbar;
import android.support.v7.app.AppCompatActivity;
import android.support.v7.widget.Toolbar;
import android.view.View;
import android.view.MenuItem;
import android.widget.Button;
import android.widget.EditText;
import android.widget.ListView;
import android.widget.Toast;

import com.tutorials.hp.listviewsqlite.mDataBase.DBAdapter;
import com.tutorials.hp.listviewsqlite.mDataObject.Spacecraft;
import com.tutorials.hp.listviewsqlite.mListView.CustomAdapter;

import java.util.ArrayList;

public class MainActivity extends AppCompatActivity {

    ListView lv;
    EditText nameEditText;
    Button saveBtn,retrieveBtn;
    ArrayList<Spacecraft> spacecrafts=new ArrayList<>();
    CustomAdapter adapter;
    final Boolean forUpdate=true;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);
        Toolbar toolbar = (Toolbar) findViewById(R.id.toolbar);
        setSupportActionBar(toolbar);

        lv= (ListView) findViewById(R.id.lv);
        adapter=new CustomAdapter(this,spacecrafts);

        this.getSpacecrafts();
       // lv.setAdapter(adapter);

        FloatingActionButton fab = (FloatingActionButton) findViewById(R.id.fab);
        fab.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View view) {
                displayDialog(false);
            }
        });
    }

    private void displayDialog(Boolean forUpdate)
    {
        Dialog d=new Dialog(this);
        d.setTitle("SQLITE DATA");
        d.setContentView(R.layout.dialog_layout);

        nameEditText= (EditText) d.findViewById(R.id.nameEditTxt);
        saveBtn= (Button) d.findViewById(R.id.saveBtn);
        retrieveBtn= (Button) d.findViewById(R.id.retrieveBtn);

        if(!forUpdate)
        {
            saveBtn.setOnClickListener(new View.OnClickListener() {
                @Override
                public void onClick(View v) {
                    save(nameEditText.getText().toString());
                }
            });
            retrieveBtn.setOnClickListener(new View.OnClickListener() {
                @Override
                public void onClick(View v) {
                    getSpacecrafts();
                }
            });
        }else {

            //SET SELECTED TEXT
            nameEditText.setText(adapter.getSelectedItemName());

            saveBtn.setOnClickListener(new View.OnClickListener() {
                @Override
                public void onClick(View v) {
                     update(nameEditText.getText().toString());
                }
            });
            retrieveBtn.setOnClickListener(new View.OnClickListener() {
                @Override
                public void onClick(View v) {
                     getSpacecrafts();
                }
            });
        }

        d.show();

    }

    //SAVE
    private void save(String name)
    {
        DBAdapter db=new DBAdapter(this);
        db.openDB();
        boolean saved=db.add(name);

        if(saved)
        {
            nameEditText.setText("");
            getSpacecrafts();
        }else {
            Toast.makeText(this,"Unable To Save",Toast.LENGTH_SHORT).show();
        }
    }

    //RETRIEVE OR GETSPACECRAFTS
    private void getSpacecrafts()
    {
        spacecrafts.clear();
        DBAdapter db=new DBAdapter(this);
        db.openDB();
        Cursor c=db.retrieve();
        Spacecraft spacecraft=null;

        while (c.moveToNext())
        {
            int id=c.getInt(0);
            String name=c.getString(1);

            spacecraft=new Spacecraft();
            spacecraft.setId(id);
            spacecraft.setName(name);

            spacecrafts.add(spacecraft);
        }

        db.closeDB();
        lv.setAdapter(adapter);
    }

    //UPDATE OR EDIT
    private void update(String newName)
    {
        //GET ID OF SPACECRAFT
        int id=adapter.getSelectedItemID();

        //UPDATE IN DB
        DBAdapter db=new DBAdapter(this);
        db.openDB();
        boolean updated=db.update(newName,id);
        db.closeDB();

        if(updated)
        {
            nameEditText.setText(newName);
            getSpacecrafts();
        }else {
            Toast.makeText(this,"Unable To Update",Toast.LENGTH_SHORT).show();
        }

    }

    private void delete()
    {
        //GET ID
        int id=adapter.getSelectedItemID();

        //DELETE FROM DB
        DBAdapter db=new DBAdapter(this);
        db.openDB();
        boolean deleted=db.delete(id);
        db.closeDB();

        if(deleted)
        {
            getSpacecrafts();
        }else {
            Toast.makeText(this,"Unable To Delete",Toast.LENGTH_SHORT).show();
        }
    }

    @Override
    public boolean onContextItemSelected(MenuItem item) {
        CharSequence title=item.getTitle();
        if(title=="NEW")
        {
           displayDialog(!forUpdate);

        }else  if(title=="EDIT")
        {
            displayDialog(forUpdate);

        }else  if(title=="DELETE")
        {
            delete();
        }

        return super.onContextItemSelected(item);
    }
}
```

#### Download

Look,the full source code reference is above for download.Just download it,extract and import to you android studio.

The video tutorial is below.Its complete and explained step by step. Here are the resources related to this project.

| No. | Location | Link |
| --- | --- | --- |
| 1. | GitHub | [Direct Download](https://github.com/Oclemy/ListViewSQLIte/archive/master.zip)) |
| 2. | GitHub | [Browse](https://github.com/Oclemy/ListViewSQLIte) |
| 3. | YouTube | [Video Tutorial](http://www.youtube.com/watch?v=W0UHXTqlwMc) |
| 4. | YouTube | [Our YouTube Channel](https://www.youtube.com/channel/UCpdkWp2zh5Qv1ZWlnqswdCw) |
