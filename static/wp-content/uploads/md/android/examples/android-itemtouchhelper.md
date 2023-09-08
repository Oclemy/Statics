# ItemTouchHelper Examples


In this piece we will look at ItemTouchHelper examples, mostly usage with recyclerview, including with SQLite database.


## Example 1: Android Swipe To Dismiss – RecyclerView – Remove Items [ItemTouchHelper]

Great.Now guys today we are at Java Android again.Discussing Drag/Swipe to Dismiss in our Custom RecyclerView.We are implementing it using ItemTouchHelper class,so no third party libraries.In short this is what we do :

- Custom RecyclerView with images and text,with help of our Adapter and ViewHolder subclasses.
- Implement Swipeability of our Custom Views with help of Simple callbacks.
- Remove an item`onSwiped()`, that is when swiped,from our adapter.
- We then call `notifyItemRemoved(adapterPosition)`, to refresh our RecyclerView and Adapter.

![RecyclerView Swipe To Dismiss Cards](https://github.com/Oclemy/RecyclerSwipeToDismiss/raw/master/demos/swipe%20to%20dismiss.PNG)

![RecyclerView Swipe To Dismiss Project Structure](https://github.com/Oclemy/RecyclerSwipeToDismiss/raw/master/demos/project%20structure.PNG)

First we have our Adapter class a below.Of course it inherits from RecyclerView.Adapter base class.

```java
package com.tutorials.hp.recyclerswipetodismiss.mRecycler;

import android.content.Context;
import android.support.v7.widget.RecyclerView;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;

import com.tutorials.hp.recyclerswipetodismiss.R;
import com.tutorials.hp.recyclerswipetodismiss.mDataObject.TVShow;

import java.util.ArrayList;

public class MyAdapter extends RecyclerView.Adapter<MyHolder> {

    Context c;
    ArrayList<TVShow> tvShows;

    public MyAdapter(Context c, ArrayList<TVShow> tvShows) {
        this.c = c;
        this.tvShows = tvShows;
    }

    //INITIALIE VH
    @Override
    public MyHolder onCreateViewHolder(ViewGroup parent, int viewType) {
        View v= LayoutInflater.from(parent.getContext()).inflate(R.layout.model,parent,false);
        MyHolder holder=new MyHolder(v);
        return holder;
    }

    //BIND DATA
    @Override
    public void onBindViewHolder(MyHolder holder, int position) {
        holder.nametxt.setText(tvShows.get(position).getName());
        holder.img.setImageResource(tvShows.get(position).getImg());

    }

    @Override
    public int getItemCount() {
        return tvShows.size();
    }

    //DISMISS
    public void dismissTVShow(int pos)
    {
        tvShows.remove(pos);
        this.notifyItemRemoved(pos);
    }
}
```

Here's our ViewHolder class.

```java
package com.tutorials.hp.recyclerswipetodismiss.mRecycler;

import android.support.v7.widget.RecyclerView;
import android.view.View;
import android.widget.ImageView;
import android.widget.TextView;

import com.tutorials.hp.recyclerswipetodismiss.R;

public class MyHolder extends RecyclerView.ViewHolder {

    TextView nametxt;
    ImageView img;

    public MyHolder(View itemView) {
        super(itemView);

        this.nametxt= (TextView) itemView.findViewById(R.id.nameTxt);
        this.img= (ImageView) itemView.findViewById(R.id.movieImage);

    }
}
```

![RecyclerView CardViews with Images and Text](https://github.com/Oclemy/RecyclerSwipeToDismiss/raw/master/demos/recyclerview%20swipe%20to%20remove.PNG)

We have our SwipeHelper class below.It derives from ItemTouchHelper.SimpleCallback.Take note we have two constructors,one of them,our custom constructor,is going to take our adapter reference.Hence giving us access to the dimsissTV show method that we define in our RecyclerView.Adapter subclass.

```java
package com.tutorials.hp.recyclerswipetodismiss.mSwiper;

import android.support.v7.widget.RecyclerView;
import android.support.v7.widget.helper.ItemTouchHelper;

import com.tutorials.hp.recyclerswipetodismiss.mRecycler.MyAdapter;

public class SwipeHelper extends ItemTouchHelper.SimpleCallback {

    MyAdapter adapter;

    public SwipeHelper(int dragDirs, int swipeDirs) {
        super(dragDirs, swipeDirs);
    }

    public SwipeHelper(MyAdapter adapter) {
        super(ItemTouchHelper.UP | ItemTouchHelper.DOWN,ItemTouchHelper.LEFT);
        this.adapter = adapter;
    }

    @Override
    public boolean onMove(RecyclerView recyclerView, RecyclerView.ViewHolder viewHolder, RecyclerView.ViewHolder target) {
        return false;
    }

    @Override
    public void onSwiped(RecyclerView.ViewHolder viewHolder, int direction) {
        adapter.dismissTVShow(viewHolder.getAdapterPosition());
    }
}
```

We finally have our MainActivity class :

```java
package com.tutorials.hp.recyclerswipetodismiss;

import android.os.Bundle;
import android.support.design.widget.FloatingActionButton;
import android.support.design.widget.Snackbar;
import android.support.v7.app.AppCompatActivity;
import android.support.v7.widget.LinearLayoutManager;
import android.support.v7.widget.RecyclerView;
import android.support.v7.widget.Toolbar;
import android.support.v7.widget.helper.ItemTouchHelper;
import android.view.View;
import android.view.Menu;
import android.view.MenuItem;

import com.tutorials.hp.recyclerswipetodismiss.mDataObject.TVShow;
import com.tutorials.hp.recyclerswipetodismiss.mDataObject.TVShowsCollection;
import com.tutorials.hp.recyclerswipetodismiss.mRecycler.MyAdapter;
import com.tutorials.hp.recyclerswipetodismiss.mSwiper.SwipeHelper;

import java.util.ArrayList;

public class MainActivity extends AppCompatActivity {

    RecyclerView rv;
    MyAdapter adapter;
    ArrayList<TVShow> tvShows;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);
        Toolbar toolbar = (Toolbar) findViewById(R.id.toolbar);
        setSupportActionBar(toolbar);
        FloatingActionButton fab = (FloatingActionButton) findViewById(R.id.fab);

        //RECYCLER
        rv= (RecyclerView) findViewById(R.id.mRecycler);
        rv.setLayoutManager(new LinearLayoutManager(this));

        //DATA
        tvShows= TVShowsCollection.getTVShows();

        //ADAPTER
        adapter=new MyAdapter(this,tvShows);
        rv.setAdapter(adapter);

        fab.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View view) {
                Snackbar.make(view, String.valueOf(tvShows.size()), Snackbar.LENGTH_LONG)
                        .setAction("Action", null).show();
            }
        });

        ItemTouchHelper.Callback callback=new SwipeHelper(adapter);
        ItemTouchHelper helper=new ItemTouchHelper(callback);
        helper.attachToRecyclerView(rv);

    }
}
```

Look for more please the full source code is attached above.   For more explanations and demo please check the video tutorial below : [http://www.youtube.com/watch?v=3Lxd7pw1lbw](http://www.youtube.com/watch?v=3Lxd7pw1lbw)

## Example 2: Android SQLite – RecyclerView – CRUD then Swipe To Delete Data

_Android SQLite RecyclerView - CRUD then Swipe To Delete Data Tutorial._

We want to see how we can implement a ItemTouchHelper with a RecyclerView filled from SQLite database.

Thus if the user swipes away a RecyclerView item, that item is deleted automatically from the database.

But first we see how to insert into mysql database , then retrieve that data and show in a RecyclerView. Then user can delete by swiping away.

Our mission at ProgrammingWizards Youtube Channel  is to provide practical realworld examples.There is alot of theory on the web.But then its always easier to learn by doing.So we aim to fill that gap by providing quality examples,that you can easily extend and use in your app. Today we talk about Swipe To Delete,of course from Swipe to Dismiss.We use ItemTouchHelper class,no third party library.We shall do these:

-  INSERT,SELECT and DELETE to and from SQLite database.
- To delete we shall use the Swipe to dismiss technique,in this case swipe to delete from database.
- We then refresh our adapter for instant change notifications.

![RecyclerView Swipe To Delete](https://github.com/Oclemy/SQLiteSwipeToDelete/raw/master/demos/RecyclerViewSwipe.PNG)

![SQLite Swipe Delete Project Structure](https://github.com/Oclemy/SQLiteSwipeToDelete/raw/master/demos/ProjectStructure.PNG)

#### 1\. Create Basic Activity Project

Let's start by creating a basic project in android studio. You can see how to do so [here](https://camposha.info/android/create_basic_project).

#### 2\. Add Gradle Dependencies

We add support library dependencies via the build.gradle.

```groovy
dependencies {
    compile fileTree(dir: 'libs', include: ['*.jar'])
    testCompile 'junit:junit:4.12'
    compile 'com.android.support:appcompat-v7:23.3.0'
    compile 'com.android.support:design:23.3.0'
    compile 'com.android.support:cardview-v7:23.3.0'

}
```

### 4\. Java Classes

Here are our java classes:

#### Our data object

##### (a). Planet.java

This is our POJO class. Also called our bean class or our data object. Every row in our database will comprise of this class's object.

It represents a single planet with name and id.

```java
package com.tutorials.hp.sqliteswipetodelete.mDataObject;

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

##### (a). Constants.java

This `Constants` class will contain or hold our SQLite database constants.

These include SQLite table Column names, database name, table name, database verions, SQLite table creation statement and sqlite table dropping statement.

We just define them as string constants using the `static final` modifier.

```java
package com.tutorials.hp.sqliteswipetodelete.mDataBase;

public class Constants {

    //COLUMNS
    static final String ROW_ID="id";
    static final String NAME="name";

    //DB PROPS
    static final String DB_NAME="ee_DB";
    static final String TB_NAME="ee_TB";
    static final int DB_VERSION=1;

    //CREATE TABLE
    static final String CREATE_TB="CREATE TABLE ee_TB(id INTEGER PRIMARY KEY AUTOINCREMENT,"
            + "name TEXT NOT NULL);";

    //DROP TB
    static final String DROP_TB="DRP TABLE IF EXISTS "+TB_NAME;

}
```

##### (b). DBHelper.java

Our `SQLiteOpenHelper` class.

To help us create the SQLite table and drop it as well. We start by making it extend the `SQLiteOpenHelper` class. Then we define one public constructor which will take a Context object.

We will override the `onCreate()` and the `onUpgrade()` methods. The database table will be created and updated in the two methods respectively.

```java
package com.tutorials.hp.sqliteswipetodelete.mDataBase;

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
        try {
            db.execSQL(Constants.CREATE_TB);
        } catch (SQLException e) {
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

##### (c). DBAdapter.java

This is our CRUD class. It is where we perform our SQLite CRUD operations.

Here we will open database connection, then save our data to sqlite, select them and close our connection.

Basically all our CRUD SQLite operations,inserting data,selecting and updating we do inside this class :

```java
package com.tutorials.hp.sqliteswipetodelete.mDataBase;

import android.content.ContentValues;
import android.content.Context;
import android.database.Cursor;
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
        try {
            db=helper.getWritableDatabase();
        } catch (Exception e) {
            e.printStackTrace();
        }
    }
    //CLOSE DB
    public void closeDB()
    {
        try {
           helper.close();
        } catch (Exception e) {
            e.printStackTrace();
        }
    }

    //INSERT/SAVE
    public boolean add(String name)
    {
        try {
        ContentValues cv=new ContentValues();
        cv.put(Constants.NAME, name);

         db.insert(Constants.TB_NAME, Constants.ROW_ID, cv);
        return true;

        } catch (Exception e) {
            e.printStackTrace();
        }
        return false;
    }

    //SELECT/RETRIEVE
    public Cursor retrieve()
    {
        String[] columns={Constants.ROW_ID,Constants.NAME};

        return db.query(Constants.TB_NAME,columns,null,null,null,null,null);
    }

    //DELETE/REMOVE
    public boolean delete(int id)
    {
        try {
            int result=db.delete(Constants.TB_NAME,Constants.ROW_ID+" =?",new String[]{String.valueOf(id)});
            if(result>0) {
                return true;
            }

          } catch (Exception e) {
            e.printStackTrace();
        }
        return false;
    }

}
```

#### Our ItemTouchHelper Class

##### (a). SwipeHelper.java

This is our `ItemTouchHelper.SimpleCallback` class.

We are creating a swipe helper class that's going to derive from `ItemTouchHelper.SimpleCallback`.Its going to take our Adapter reference and invoke the method for deleting data inside the onSwiped method :

This class will allow us delete a planet from our RecyclerView when user swipes that item in the RecyclerView.

```java
package com.tutorials.hp.sqliteswipetodelete.mSwiper;

import android.support.v7.widget.RecyclerView;
import android.support.v7.widget.helper.ItemTouchHelper;

import com.tutorials.hp.sqliteswipetodelete.mRecycler.MyAdapter;

public class SwipeHelper extends ItemTouchHelper.SimpleCallback {

   MyAdapter adapter;

    public SwipeHelper(int dragDirs, int swipeDirs) {
        super(dragDirs, swipeDirs);
    }

    public SwipeHelper( MyAdapter adapter) {
        super(ItemTouchHelper.UP | ItemTouchHelper.DOWN,ItemTouchHelper.LEFT);
        this.adapter = adapter;
    }

    @Override
    public boolean onMove(RecyclerView recyclerView, RecyclerView.ViewHolder viewHolder, RecyclerView.ViewHolder target) {
        return false;
    }

    @Override
    public void onSwiped(RecyclerView.ViewHolder viewHolder, int direction) {
         adapter.deletePlanet(viewHolder.getAdapterPosition());
    }
}
```

#### Our RecyclerView Classes

##### (a). MyHolder.java

Our RecyclerView ViewHolder class. Will simply hold our TextView for recycling.

```java
package com.tutorials.hp.sqliteswipetodelete.mRecycler;

import android.support.v7.widget.RecyclerView;
import android.view.View;
import android.widget.TextView;

import com.tutorials.hp.sqliteswipetodelete.R;

public class MyHolder extends RecyclerView.ViewHolder {

    TextView nametxt;

    public MyHolder(View itemView) {
        super(itemView);

        this.nametxt= (TextView) itemView.findViewById(R.id.nameTxt);
    }
}
```

![SQLite Swipe To Delete Insert Data Material Dialog](https://github.com/Oclemy/SQLiteSwipeToDelete/raw/master/demos/SaveData.PNG)

##### (b). MyAdapter.java

Our RecyclerView Adapter class. It has to extend the `RecyclerView.Adapter<MyHolder>` class. The `MyHolder` generic parameter is our Recyclreview ViewHolder class.

Our RecyclerView shall have this adapter class so that it binds our data to inflated views. That inflation will also take place here.

Our constructor will take a context and an arraylist of planet objects. Those planet objects are what will populate our Recyclerview. The Context object shall be needed for inflation of the `model.xml` layout to occur.

```java
package com.tutorials.hp.sqliteswipetodelete.mRecycler;

import android.content.Context;
import android.support.v7.widget.RecyclerView;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.Toast;

import com.tutorials.hp.sqliteswipetodelete.R;
import com.tutorials.hp.sqliteswipetodelete.mDataBase.DBAdapter;
import com.tutorials.hp.sqliteswipetodelete.mDataObject.Planet;

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
         holder.nametxt.setText(planets.get(position).getName());
    }

    @Override
    public int getItemCount() {
        return planets.size();
    }

    public void deletePlanet(int pos)
    {
        //GET ID
        Planet p=planets.get(pos);
        int id=p.getId();

        //DELETE FROM DB
        DBAdapter db=new DBAdapter(c);
        db.openDB();
        if(db.delete(id))
        {
            planets.remove(pos);
        }else
        {
            Toast.makeText(c,"Unable To Delete",Toast.LENGTH_SHORT).show();
        }

        db.closeDB();

        this.notifyItemRemoved(pos);

    }
}
```

#### Our Activity Class

##### (a). MainActivity.java

Our MainActivity class. This class represents our user interface. This is where we will render our user interface widgets like RecyclerView. We will also be able to show an input dialog. That is the dialog used to type data that should be saved in sqlite database. So that dialog also in fact gets hosted by this activity.

```java
package com.tutorials.hp.sqliteswipetodelete;

import android.app.Dialog;
import android.database.Cursor;
import android.os.Bundle;
import android.support.design.widget.FloatingActionButton;
import android.support.design.widget.Snackbar;
import android.support.v7.app.AppCompatActivity;
import android.support.v7.widget.LinearLayoutManager;
import android.support.v7.widget.RecyclerView;
import android.support.v7.widget.Toolbar;
import android.support.v7.widget.helper.ItemTouchHelper;
import android.view.View;
import android.view.Menu;
import android.view.MenuItem;
import android.widget.Button;
import android.widget.EditText;
import android.widget.Toast;

import com.tutorials.hp.sqliteswipetodelete.mDataBase.DBAdapter;
import com.tutorials.hp.sqliteswipetodelete.mDataObject.Planet;
import com.tutorials.hp.sqliteswipetodelete.mRecycler.MyAdapter;
import com.tutorials.hp.sqliteswipetodelete.mSwiper.SwipeHelper;

import java.util.ArrayList;

public class MainActivity extends AppCompatActivity {

    RecyclerView rv;
    MyAdapter adapter;
    EditText nameEditText;
    Button saveBtn,retrieveBtn;
    ArrayList<Planet> planets=new ArrayList<>();

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);
        Toolbar toolbar = (Toolbar) findViewById(R.id.toolbar);
        setSupportActionBar(toolbar);
        FloatingActionButton fab = (FloatingActionButton) findViewById(R.id.fab);

        rv= (RecyclerView) findViewById(R.id.rv);
        rv.setLayoutManager(new LinearLayoutManager(this));

        adapter=new MyAdapter(this,planets);

        fab.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                displayDialog();
            }
        });

        ItemTouchHelper.Callback callback=new SwipeHelper(adapter);
        ItemTouchHelper helper=new ItemTouchHelper(callback);
        helper.attachToRecyclerView(rv);

    }

    private void displayDialog()
    {
        Dialog d=new Dialog(this);
        d.setTitle("SQLite database");
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
                getPlanets();
            }
        });

        //SHOW DIALOG
        d.show();

    }

    //SAVE
    private void save(String name)
    {
        DBAdapter db=new DBAdapter(this);
        db.openDB();
        if(db.add(name))
        {
            nameEditText.setText("");
        }else
        {
            Toast.makeText(this,"Unable to save",Toast.LENGTH_SHORT).show();
        }

        db.closeDB();
    }

    //RETRIEVE
    private void getPlanets()
    {
        planets.clear();

        DBAdapter db=new DBAdapter(this);
        db.openDB();
        Cursor c=db.retrieve();

        while (c.moveToNext())
        {
            int id=c.getInt(0);
            String name=c.getString(1);

            Planet p=new Planet();
            p.setName(name);
            p.setId(id);

            planets.add(p);
        }
        db.closeDB();

        if(planets.size()>0)
        {
            rv.setAdapter(adapter);
        }
    }

}
```

#### Download

Download code below.

If you prefer more explanations or want to see the demo then the video tutorial is [here](http://www.youtube.com/watch?v=QJv4z5jyFnM).

| No. | Location | Link |
| --- | --- | --- |
| 1. | GitHub | [Direct Download](https://github.com/Oclemy/SQLiteSwipeToDelete/archive/master.zip)) |
| 2. | GitHub | [Browse](https://github.com/Oclemy/SQLiteSwipeToDelete) |
| 3. | YouTube | [Video Tutorial](https://www.youtube.com/watch?v=QJv4z5jyFnM) |
| 4. | YouTube | [Our YouTube Channel](https://www.youtube.com/channel/UCpdkWp2zh5Qv1ZWlnqswdCw) |
