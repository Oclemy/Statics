# Android SQLite RecyclerView CRUD Examples


SQLite is the defacto local data storage option for android. In this tutorial we will explore several full examples of how to use SQLite database with Recyclerview and mostly perform CRUD operations.


## Example 1: Android SQLite – RecyclerView – INSERT,SELECT and Show.

_Android SQLite - RecyclerView - INSERT,SELECT and Show Tutorial_

How to perform CRUD Operations against SQLite Database. We use RecyclerView to render data.

SQLite is the most popular database engine. This is due to it's serverless, zero-configuration nature yet still reasonably performant. SQLite simply exists a single file and runs in a single process. This makes it efficient hence can easily be used in resource-constrained devices like android and iOS environments. It's also free and actively maintaied since it's inception in the year 2000. Read more about [SQLite history here](https://camposha.info/computer-science/sqlite).

RecyclerView on the other hand is an adapterview that allows us render large datasets. Especially data coming from databases like sqlite and webservices qualify as good for being rendered in recyclerview. RecyclerViews are popular because of their flexibility and ease of use. Once we've retrieved our data from sqlite we will show this data in recyclerview. Learn more about [RecyclerViews here](https://camposha.info/android/recyclerview).

Our recyclerview will comprise of Cardviews. Each CardView will correspond to a single data object.

#### Build.Gradle

Our Dependencies. Here's our build.gradle(Module:app). We are not using any third party libraries.

```groovy
dependencies {
    compile fileTree(dir: 'libs', include: ['*.jar'])
    testCompile 'junit:junit:4.12'
    compile 'com.android.support:appcompat-v7:23.2.1'
    compile 'com.android.support:design:23.2.1'
    compile 'com.android.support:cardview-v7:23.2.1'

}
```

#### Player.java

 **Our Model Class**

- Our data object class.
- Represents a single “Player” with all his/her properties.

```java
package com.tutorials.hp.recyclerinsetselectshow;

public class Player {

    private int id;
    private String name,position;
    private int image;

    public Player(int id, String name, String position, int image) {
        this.id = id;
        this.name = name;
        this.position = position;
        this.image = image;
    }

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

    public String getPosition() {
        return position;
    }

    public void setPosition(String position) {
        this.position = position;
    }

    public int getImage() {
        return image;
    }

    public void setImage(int image) {
        this.image = image;
    }
}
```

#### MainActivity.java

**Our MainActivity Class**

- Launcher activity.
- Initialize RecyclerView and set its adapter and layout manager.
- Handles data input.
- Call database classes to persist.

```java
package com.tutorials.hp.recyclerinsetselectshow;

import android.app.Dialog;
import android.database.Cursor;
import android.os.Bundle;
import android.support.design.widget.FloatingActionButton;
import android.support.design.widget.Snackbar;
import android.support.v7.app.AppCompatActivity;
import android.support.v7.widget.DefaultItemAnimator;
import android.support.v7.widget.LinearLayoutManager;
import android.support.v7.widget.RecyclerView;
import android.support.v7.widget.Toolbar;
import android.view.View;
import android.view.Window;
import android.widget.Button;
import android.widget.EditText;

import java.util.ArrayList;

public class MainActivity extends AppCompatActivity {

    EditText nameTxt,posTxt;
    RecyclerView rv;
    MyAdapter adapter;
    ArrayList<Player> players=new ArrayList<>();

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
                //SHOW INPUT DIALOG
                showDialog();
            }
        });

        //recycler
       rv= (RecyclerView) findViewById(R.id.mRecycler);

        //SET PROPS
        rv.setLayoutManager(new LinearLayoutManager(this));

        rv.setItemAnimator(new DefaultItemAnimator());

        //ADAPTER
        adapter=new MyAdapter(this,players);

        //RETRIEVE
        retrieve();

    }

    //SHOW INSERT DIALOG
    private void showDialog()
    {
        Dialog d=new Dialog(this);

        //NO TITLE
        d.requestWindowFeature(Window.FEATURE_NO_TITLE);

        d.setContentView(R.layout.custom_layout);

        nameTxt= (EditText) d.findViewById(R.id.nameEditTxt);
        posTxt= (EditText) d.findViewById(R.id.posEditTxt);
        Button saveBtn= (Button) d.findViewById(R.id.saveBtn);
        final Button retrievebtn= (Button) d.findViewById(R.id.retrieveBtn);

        saveBtn.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                save(nameTxt.getText().toString(),posTxt.getText().toString());
            }
        });

        retrievebtn.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                 retrieve();
            }
        });

        d.show();

    }

    private void save(String name,String pos)
    {
        DBAdapter db=new DBAdapter(this);

        //OPEN DB
        db.openDB();

        //COMMIT
        long result=db.add(name,pos);

        if(result>0)
        {
            nameTxt.setText("");
            posTxt.setText("");
        }else
        {
            Snackbar.make(nameTxt,"Unable To Save",Snackbar.LENGTH_SHORT).show();
        }

        db.closeDB();

        //REFRESH
        retrieve();
    }

    //RETREIEV
    private void retrieve()
    {
        players.clear();

        DBAdapter db=new DBAdapter(this);
        db.openDB();

        //RETRIEVE
        Cursor c=db.getAllPlayers();

        //LOOP AND ADD TO ARRAYLIST
        while (c.moveToNext())
        {
            int id=c.getInt(0);
            String name=c.getString(1);
            String pos=c.getString(2);

            Player p=new Player(id,name,pos,R.id.playerImage);

            //ADD TO ARRAYLIS
            players.add(p);
        }

        //CHECK IF ARRAYLIST ISNT EMPTY
        if(!(players.size()<1))
        {
            rv.setAdapter(adapter);
        }

        db.closeDB();;

    }

}
```

#### Constants.java

 **Our Constants Class**

- Constants defining database properties.
- Also contains our SQL statement for creating table.

```java
package com.tutorials.hp.recyclerinsetselectshow;

public class Constants {
    //COLUMNS
    static final String ROW_ID="id";
    static final String NAME = "name";
    static final String POSITION = "position";

    //DB PROPERTIES
    static final String DB_NAME="d_DB";
    static final String TB_NAME="d_TB";
    static final int DB_VERSION='1';

    static final String CREATE_TB="CREATE TABLE d_TB(id INTEGER PRIMARY KEY AUTOINCREMENT,"
            + "name TEXT NOT NULL,position TEXT NOT NULL);";
}
```

#### DBHelper.java

**Our DBHelper Class**

- Creates database table.
- Handles sqlite database table versioning and upgrade.

```java
package com.tutorials.hp.recyclerinsetselectshow;

import android.content.Context;
import android.database.sqlite.SQLiteDatabase;
import android.database.sqlite.SQLiteOpenHelper;

public class DBHelper extends SQLiteOpenHelper {

    public DBHelper(Context context) {
        super(context, Constants.DB_NAME, null, Constants.DB_VERSION);
    }

    //TABLE CREATION
    @Override
    public void onCreate(SQLiteDatabase db) {
        try
        {
            db.execSQL(Constants.CREATE_TB);

        }catch (Exception ex)
        {
            ex.printStackTrace();
        }

    }

    //TABLE UPGRADE
    @Override
    public void onUpgrade(SQLiteDatabase db, int oldVersion, int newVersion) {
        db.execSQL("DROP TABLE IF EXISTS "+Constants.TB_NAME);
        onCreate(db);

    }
}
```

#### DBAdapter.java"

**DBAdapter Class**

- Handles CRUD operations.
- Saves and retrieves data to and from sqlite database.

```java
package com.tutorials.hp.recyclerinsetselectshow;

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

    //OPEN DATABASE
    public DBAdapter openDB()
    {
        try {
            db=helper.getWritableDatabase();

        }catch (SQLException e)
        {
            e.printStackTrace();
        }

        return this;
    }

    //CLOSE DATABASE
    public void closeDB()
    {
        try {
          helper.close();

        }catch (SQLException e)
        {
            e.printStackTrace();
        }

    }

    //INSERT
    public long add(String name,String pos)
    {
        try
        {
            ContentValues cv=new ContentValues();
            cv.put(Constants.NAME,name);
            cv.put(Constants.POSITION, pos);

            return db.insert(Constants.TB_NAME,Constants.ROW_ID,cv);
        }catch (SQLException e)
        {
            e.printStackTrace();
        }

        return 0;
    }

    //RETRIEVE
    public Cursor getAllPlayers()
    {
        String[] columns={Constants.ROW_ID,Constants.NAME,Constants.POSITION};

        return db.query(Constants.TB_NAME,columns,null,null,null,null,null);

    }
}
```

#### ItemClickListener.java

**Our ItemClickListener Interface**

- Defines our onItemClick() method signature.

```java
package com.tutorials.hp.recyclerinsetselectshow;

import android.view.View;

public interface ItemClickListener {

    void onItemClick(View v,int pos);
}
```

#### MyHolder.java

**Our ViewHolder Class.**

- Holds our views to be recycled.
- Implements View.OnItemClick Listener

```java
package com.tutorials.hp.recyclerinsetselectshow;

import android.support.v7.widget.RecyclerView;
import android.view.View;
import android.widget.ImageView;
import android.widget.TextView;

public class MyHolder extends RecyclerView.ViewHolder implements View.OnClickListener {

    ImageView img;
    TextView nametxt,posTxt;
    ItemClickListener itemClickListener;

    public MyHolder(View itemView) {
        super(itemView);

        nametxt= (TextView) itemView.findViewById(R.id.nameTxt);
        posTxt= (TextView) itemView.findViewById(R.id.posTxt);
        img= (ImageView) itemView.findViewById(R.id.playerImage);

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

#### MyAdapter.java

**Our Adapter Class**

- Handles Layout Inflation.
- Binds our dataset to our views.

```java
package com.tutorials.hp.recyclerinsetselectshow;

import android.content.Context;
import android.support.design.widget.Snackbar;
import android.support.v7.widget.RecyclerView;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;

import java.util.ArrayList;

public class MyAdapter extends RecyclerView.Adapter<MyHolder> {
    Context c;
    ArrayList<Player> players;

    public MyAdapter(Context c, ArrayList<Player> players) {
        this.c = c;
        this.players = players;
    }

    //INITIALIZE VIEWHODER
    @Override
    public MyHolder onCreateViewHolder(ViewGroup parent, int viewType) {
        //VIEW OBJ
        View v= LayoutInflater.from(parent.getContext()).inflate(R.layout.model,null);

        //HOLDER
        MyHolder holder=new MyHolder(v);

        return holder;
    }

    //BIND VIEW TO DATA
    @Override
    public void onBindViewHolder(MyHolder holder, int position) {
        holder.img.setImageResource(R.drawable.marker);

        holder.nametxt.setText(players.get(position).getName());
        holder.posTxt.setText(players.get(position).getPosition());

        //CLICKED
        holder.setItemClickListener(new ItemClickListener() {
            @Override
            public void onItemClick(View v, int pos) {
                Snackbar.make(v,players.get(pos).getName(),Snackbar.LENGTH_SHORT).show();
            }
        });

    }

    @Override
    public int getItemCount() {
        return players.size();
    }
}
```

#### ContentMain.xml

**Our ContentMain XML**

- Holds our adapter view.

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
    tools_context="com.tutorials.hp.recyclerinsetselectshow.MainActivity"
    tools_showIn="@layout/activity_main">

   <android.support.v7.widget.RecyclerView
       android_layout_width="match_parent"
       android_layout_height="match_parent"
       android_id="@+id/mRecycler"
       ></android.support.v7.widget.RecyclerView>
</RelativeLayout>
```

#### Model.xml

Our Model XML

- Defines our RecyclerView View Item.

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
            android_src="@drawable/marker" />

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

#### InputDialog.xml"

**Our InputDialog XML**

- Provides ui for data input.

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

            <ImageView
                android_id="@+id/image"
                android_layout_width="190dp"
                android_layout_height="275dp"
                android_paddingLeft="15dp"
                android_scaleType="fitCenter"
                android_src="@drawable/marker"
                android_layout_alignParentLeft="true"
                android_layout_alignParentStart="true"
                android_layout_below="@+id/posEditTxt" />

            <TextView
                android_id="@+id/profile"
                android_layout_width="wrap_content"
                android_layout_height="wrap_content"
                android_textStyle="bold"
                android_textColor="@color/colorAccent"
                android_text="PLAYER PROFILE"
                android_textAppearance="?android:attr/textAppearanceLarge"
                android_layout_below="@+id/image"
                android_layout_alignParentLeft="true"
                android_layout_alignParentStart="true" />

            <EditText
                android_id="@+id/nameEditTxt"
                android_layout_width="wrap_content"
                android_layout_height="wrap_content"
                android_layout_alignParentLeft="true"
                android_paddingLeft="15dp"
                android_hint="Name"
                android_textAppearance="?android:attr/textAppearanceLarge"
                android_layout_below="@+id/profile" />

            <EditText
                android_id="@+id/posEditTxt"
                android_layout_width="wrap_content"
                android_layout_height="wrap_content"
                android_layout_alignParentLeft="true"
                android_layout_below="@+id/nameTxt"
                android_paddingLeft="15dp"
                android_layout_marginTop="24dp"
                android_hint="Position : "
                android_textAppearance="?android:attr/textAppearanceLarge" />

            <LinearLayout
                android_layout_width="match_parent"
                android_layout_height="52dp"
                android_gravity="center_vertical|end"
                android_orientation="horizontal"
                android_id="@+id/linear1"
                android_padding="8dp"
                android_layout_alignParentBottom="true"
                android_layout_alignParentLeft="true"
                android_layout_alignParentStart="true">

                <Button
                    android_layout_width="wrap_content"
                    android_layout_height="wrap_content"

                    android_padding="5dp"
                    android_textAppearance="?android:attr/textAppearanceMedium"
                    android_gravity="center_vertical|center_horizontal"
                    android_text="Save"

                    android_id="@+id/saveBtn" />
                <Button
                    android_layout_width="wrap_content"
                    android_layout_height="wrap_content"

                    android_padding="5dp"
                    android_textAppearance="?android:attr/textAppearanceMedium"
                    android_gravity="center_vertical|center_horizontal"
                    android_text="Retrieve"

                    android_id="@+id/retrieveBtn" />

            </LinearLayout>

</LinearLayout>

    </android.support.v7.widget.CardView>
```

#### Download

You can Download the full Project [here](https://github.com/Oclemy/RecyclerInsetSelectShow). Source code is well commented.

- We also have a video tutorial for this example explained in a step by step manner.
- Moreover you can view the project demo there.
- The full source code reference is of course in the link above.

Below is the video tutorial.If you prefer more explanations and demo visit it.

| No. | Location | Link |
| --- | --- | --- |
| 1. | GitHub | [Direct Download](https://github.com/Oclemy/RecyclerInsetSelectShow/archive/master.zip) |
| 2. | GitHub | [Browse](https://github.com/Oclemy/RecyclerInsetSelectShow) |
| 3. | YouTube | [Video Tutorial](http://www.youtube.com/watch?v=MN-InFRj6a0) |
| 4. | YouTube | [Our YouTube Channel](https://www.youtube.com/channel/UCpdkWp2zh5Qv1ZWlnqswdCw) |

## Example 2: RecyclerView SQLite – INSERT SELECT UPDATE DELETE

_Android RecyclerView SQLite Full CRUD tutorial._

How to perform all CRUD(Create Read Update Delete) operations against a SQLite database with RecyclerView as our adapterview. In short we see how to insert, select, update and delete data to and from SQLite database.

Nowadays most apps need or require to store content or data in some form.There is the cloud but it isn’t a replacement for local storage.Neither will it be in the near future.Storing data locally is important because its easily retrievable,doesn’t require internet connection and is fast.

Good old SQLite is still the way to go.Together with Realm database,they are two ways that are now common in data storage.The package we shall be using is **_android.database.sqlite_**

It Was added in API 1 and contains classes which your app can use when talking to and managing your database. Android does ship with SQLite database. As of now SQLite 3.4.0. One of those classes is **_Android.database.sqlite.SQliteDatabase_**

This class derives from android.database.SQLite.SQLiteCloseable and obviously,java.lang.Object. This class has methods that we can use to basically, manage our SQLite database.

It has methods for CRUD stuff. Also execute SQL statements. A database has to be unique for each single application, within that application. We shall cover Android RecyclerView SQLite CRUD Full.Its a full tutorial to cover and you can easily use it as a template for your application.

#### Tools Used

- IDE : Android Studio
- OS : Windows 8.1

### Code

#### Build.Gradle

**Purpose**

1. Our app level build.gradle.
2. Add support libaries  components to our application.Dependencies.

```groovy
dependencies {
    compile fileTree(dir: 'libs', include: ['*.jar'])
    testCompile 'junit:junit:4.12'
    compile 'com.android.support:appcompat-v7:23.2.1'
    compile 'com.android.support:design:23.2.1'
    compile 'com.android.support:cardview-v7:23.2.1'
  //  compile 'com.android.support:recyclerview-v7:23.2.1'
}
```

As you can see above we are not using any third party library. Instead we use bare support libraries. The design support library will contain our RecyclerView which will be our adapterview. The CardViews will make up a single view item in our recyclerview.

#### Player.java

Purpose :

1. Is our POJO.Plain Old Java Object
2. Holds values of a single player.

We will be working with soccer players as our model items. This simple class represents a single player. The player will the defined properties: id, name and playing position. Each row in our SQLite database will correspond to a single soccer player.

```java
package com.tutorials.hp.recyclersqlite;

public class Player {
    private String name,position;
    private int id;

    public Player(String name, String position, int id) {
        this.name = name;
        this.position = position;
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getPosition() {
        return position;
    }

    public void setPosition(String position) {
        this.position = position;
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }
}
```

#### MyHolder.java

Purpose :

1. Our ViewHolder class.
2. To hold views that we wanna display in our Custom RecyclerView.
3. Implement our OnItemClick interface,hence making our Views clickable

ViewHolder is responsible for the super efficient nature of RecyclerViews. This is because it holds views for the sake of re-use or recycling. Otherwise XML layout would have to be re-inflated for every item in the list. The View item will comprise of a textview and imageview.

To make it a ViewHolder we will derive from `RecyclerView.ViewHolder` class. We will also listen to click events of those RecyclerView view items.

```java
package com.tutorials.hp.recyclersqlite;

import android.support.v7.widget.RecyclerView;
import android.view.View;
import android.widget.ImageView;
import android.widget.TextView;

public class MyHolder extends RecyclerView.ViewHolder implements View.OnClickListener {

    ImageView img;
    TextView nameTxt,posTxt;
    ItemClickListener itemClickListener;

    public MyHolder(View itemView) {
        super(itemView);

        //ASSIGN
        img= (ImageView) itemView.findViewById(R.id.playerImage);
        nameTxt= (TextView) itemView.findViewById(R.id.nameTxt);
        posTxt= (TextView) itemView.findViewById(R.id.posTxt);

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

#### MyAdapter.java

**Purpose :**

1. Our adapter class.
2. Initialize our ViewHolder class
3. Bind our views to data.
4. Pack data to be sent to new activity
5. Open new activity and pass data to it on RecyclerView itemClick.

RecyclerView Adapters have to derive from `RecyclerView.Adapter<MyHolder>`. The `MyHolder` passed there is a generic parameter. An ArrayList of soccer players will be passed via the constructor. Also a Context object.

```java
package com.tutorials.hp.recyclersqlite;

import android.content.Context;
import android.content.Intent;
import android.support.v7.widget.RecyclerView;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;

import java.util.ArrayList;

public class MyAdapter extends RecyclerView.Adapter<MyHolder> {
    Context c;
    ArrayList<Player> players;

    public MyAdapter(Context ctx,ArrayList<Player> players)
    {
        //ASSIGN THEM LOCALLY
        this.c=ctx;
        this.players=players;
    }

    @Override
    public MyHolder onCreateViewHolder(ViewGroup parent, int viewType) {
        //VIEW OBJ FROM XML
        View v= LayoutInflater.from(parent.getContext()).inflate(R.layout.model,null);

        //holder
        MyHolder holder=new MyHolder(v);

        return holder;
    }

    //BIND DATA TO VIEWS
    @Override
    public void onBindViewHolder(MyHolder holder, int position) {
           holder.posTxt.setText(players.get(position).getPosition());
           holder.nameTxt.setText(players.get(position).getName());

        //HANDLE ITEMCLICKS
        holder.setItemClickListener(new ItemClickListener() {
            @Override
            public void onItemClick(View v, int pos) {
                //OPEN DETAIL ACTIVITY
                //PASS DATA

                //CREATE INTENT
                Intent i=new Intent(c,DetailActivity.class);

                //LOAD DATA
                i.putExtra("NAME",players.get(pos).getName());
                i.putExtra("POSITION",players.get(pos).getPosition());
                i.putExtra("ID",players.get(pos).getId());

                //START ACTIVITY
                c.startActivity(i);

            }
        });

    }

    @Override
    public int getItemCount() {
        return players.size();
    }
}
```

#### ItemClickListner.java

Our ItemClickListner interface.

**Purpose** :

1. Define for us the method to be overriden when the interface is overridden.
2. Helps us cleanly and easily implement our View itemClicks.

```java
package com.tutorials.hp.recyclersqlite;

import android.view.View;

public interface ItemClickListener {

    void onItemClick(View v,int pos);

}
```

#### Constants.java

**Our Constants class**

**Purpose** :

1. Helps us clean define static fields that we can easily and cleanly use with regards to our database,e.g columns,database,table names etc.
2. We change once ,we change everywhere.

```java
package com.tutorials.hp.recyclersqlite;

public class Contants {
    //COLUMNS
    static final String ROW_ID="id";
    static final String NAME = "name";
    static final String POSITION = "position";

    //DB PROPERTIES
    static final String DB_NAME="b_DB";
    static final String TB_NAME="b_TB";
    static final int DB_VERSION='1';

//CREATE TABLE
    static final String CREATE_TB="CREATE TABLE b_TB(id INTEGER PRIMARY KEY AUTOINCREMENT,"
            + "name TEXT NOT NULL,position TEXT NOT NULL);";
}
```

#### DBHelper.java

**Our DBHelper class**

**Purpose** :

1. Its a helper class.It helps us.To do what?? To create our tables and update them to new version.

As a database helper class it will derive from `SQLiteOpenHelper` defined in the `android.database.sqlite` package. A Context will be passed to its constructor. Well that Context has to be passed as it is required by the super class which we've said is the `SQLiteOpenHelper` class. The `onCreate()` method will create the database table. The `onUpgrade()` on the other hand will upgrade the database table.

```java
package com.tutorials.hp.recyclersqlite;

import android.content.Context;
import android.database.SQLException;
import android.database.sqlite.SQLiteDatabase;
import android.database.sqlite.SQLiteOpenHelper;

public class DBHelper extends SQLiteOpenHelper {

    public DBHelper(Context context) {
        super(context, Contants.DB_NAME, null, Contants.DB_VERSION);
    }

    //WHEN TB IS CREATED
    @Override
    public void onCreate(SQLiteDatabase db) {
        try
        {
            db.execSQL(Contants.CREATE_TB);

        }catch (SQLException e)
        {
            e.printStackTrace();
        }

    }

    //UPGRADE TB
    @Override
    public void onUpgrade(SQLiteDatabase db, int oldVersion, int newVersion) {
       db.execSQL("DROP TABLE IF EXISTS"+Contants.TB_NAME);
        onCreate(db);
    }
}
```

#### DBAdapter.java

**Our DBAdapter class.**

**Purpose :**

1. Its an adapter class.Our database adapter.
2. We will perform various insert,select,update and delete CRUD operations here
3.  It opens our database connection,inserts,selects,updates data,deletes data and finally close our database.It communicates with DBHelper class and is instantiated by our MainActivity class.

```java
package com.tutorials.hp.recyclersqlite;

import android.content.ContentValues;
import android.content.Context;
import android.database.Cursor;
import android.database.SQLException;
import android.database.sqlite.SQLiteDatabase;

public class DBAdapter {
    Context c;
    SQLiteDatabase db;
    DBHelper helper;

    public DBAdapter(Context ctx)
    {
        this.c=ctx;
        helper=new DBHelper(c);
    }

    //OPEN DB
    public DBAdapter openDB()
    {
        try
        {
            db=helper.getWritableDatabase();
        }catch (SQLException e)
        {
            e.printStackTrace();
        }

        return this;
    }

    //CLOSE
    public void close()
    {
        try
        {
            helper.close();
        }catch (SQLException e)
        {
            e.printStackTrace();
        }

    }

    //INSERT DATA TO DB
    public long add(String name,String pos)
    {
        try
        {
            ContentValues cv=new ContentValues();
            cv.put(Contants.NAME,name);
            cv.put(Contants.POSITION, pos);

            return db.insert(Contants.TB_NAME,Contants.ROW_ID,cv);

        }catch (SQLException e)
        {
            e.printStackTrace();
        }

        return 0;
    }

    //RETRIEVE ALL PLAYERS
    public Cursor getAllPlayers()
    {
        String[] columns={Contants.ROW_ID,Contants.NAME,Contants.POSITION};

        return db.query(Contants.TB_NAME,columns,null,null,null,null,null);
    }

    //UPDATE
    public long UPDATE(int id,String name,String pos)
    {
        try
        {
            ContentValues cv=new ContentValues();
            cv.put(Contants.NAME,name);
            cv.put(Contants.POSITION, pos);

            return db.update(Contants.TB_NAME,cv,Contants.ROW_ID+" =?",new String[]{String.valueOf(id)});

        }catch (SQLException e)
        {
            e.printStackTrace();
        }

        return 0;
    }

    //DELETE
    public long Delete(int id)
    {
        try
        {

            return db.delete(Contants.TB_NAME,Contants.ROW_ID+" =?",new String[]{String.valueOf(id)});

        }catch (SQLException e)
        {
            e.printStackTrace();
        }

        return 0;
    }

}
```

#### MainActivity.java

OUR MASTER/MAIN ACTIVITY.

**Purpose**:

1. Its our launcher activity.
2. Handle GUI saving of data,updateing,retrieveing/selecting and deleting of data.
3. It talks to our DBAdapter class to perform the details.

```java
package com.tutorials.hp.recyclersqlite;

import android.app.Dialog;
import android.content.SharedPreferences;
import android.database.Cursor;
import android.os.Bundle;
import android.os.Handler;
import android.os.Looper;
import android.support.design.widget.FloatingActionButton;
import android.support.design.widget.Snackbar;
import android.support.v7.app.AppCompatActivity;
import android.support.v7.widget.DefaultItemAnimator;
import android.support.v7.widget.LinearLayoutManager;
import android.support.v7.widget.RecyclerView;
import android.support.v7.widget.Toolbar;
import android.view.View;
import android.view.Menu;
import android.view.MenuItem;
import android.view.Window;
import android.widget.Button;
import android.widget.EditText;

import java.util.ArrayList;

public class MainActivity extends AppCompatActivity {

    EditText nameTxt,posTxt;
    RecyclerView rv;
    MyAdapter adapter;
    ArrayList<Player> players=new ArrayList<>();

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
                showDialog();
            }
        });

        //recycler
        rv= (RecyclerView) findViewById(R.id.myRecycler);

        //SET ITS PROPS
        rv.setLayoutManager(new LinearLayoutManager(this));
        rv.setItemAnimator(new DefaultItemAnimator());

        //ADAPTER
        adapter=new MyAdapter(this,players);

        retrieve();

    }

    private void showDialog()
    {
        Dialog d=new Dialog(this);

        //NO TITLE
        d.requestWindowFeature(Window.FEATURE_NO_TITLE);

        //layout of dialog
        d.setContentView(R.layout.custom_layout);

        nameTxt= (EditText) d.findViewById(R.id.nameEditTxt);
        posTxt= (EditText) d.findViewById(R.id.posEditTxt);
        Button savebtn= (Button) d.findViewById(R.id.saveBtn);
        Button retrieveBtn= (Button) d.findViewById(R.id.retrieveBtn);

        //ONCLICK LISTENERS
        savebtn.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
               save(nameTxt.getText().toString(),posTxt.getText().toString());
            }
        });

        retrieveBtn.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                retrieve();
            }
        });

        //SHOW DIALOG
        d.show();
    }

    //SAVE
    private void save(String name,String pos)
    {
        DBAdapter db=new DBAdapter(this);

        //OPEN
        db.openDB();

        //INSERT
        long result=db.add(name,pos);

        if(result>0)
        {
            nameTxt.setText("");
            posTxt.setText("");
        }else
        {
            Snackbar.make(nameTxt,"Unable To Insert",Snackbar.LENGTH_SHORT).show();
        }

        //CLOSE
        db.close();

        //refresh
        retrieve();

    }

    //RETRIEVE
    private void retrieve()
    {
        DBAdapter db=new DBAdapter(this);

        //OPEN
        db.openDB();

        players.clear();

        //SELECT
        Cursor c=db.getAllPlayers();

        //LOOP THRU THE DATA ADDING TO ARRAYLIST
        while (c.moveToNext())
        {
            int id=c.getInt(0);
            String name=c.getString(1);
            String pos=c.getString(2);

            //CREATE PLAYER
            Player p=new Player(name,pos,id);

            //ADD TO PLAYERS
            players.add(p);
        }

        //SET ADAPTER TO RV
        if(!(players.size()<1))
        {
            rv.setAdapter(adapter);
        }

    }

    @Override
    protected void onResume() {
        super.onResume();
        retrieve();
    }
}
```

#### ActivityMain.xml

Our Main Activity Layout.

**Purpose**:

1. Acts as our template layout.
2. Holds the ContentMain layout

```xml
<?xml version="1.0" encoding="utf-8"?>
<android.support.design.widget.CoordinatorLayout

    android_layout_width="match_parent"
    android_layout_height="match_parent"
    android_fitsSystemWindows="true"
    tools_context="com.tutorials.hp.recyclersqlite.MainActivity">

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

#### ContenMain.xml

1. Hold our RecyclerView.Which of course holds our data.

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
    tools_context="com.tutorials.hp.recyclersqlite.MainActivity"
    tools_showIn="@layout/activity_main">

    <android.support.v7.widget.RecyclerView
        android_id="@+id/myRecycler"
        android_layout_width="wrap_content"
        android_layout_height="wrap_content"
        class="android.support.v7.widget.RecyclerView" />

</RelativeLayout>
```

#### Model.xml

**Purpose** :

1. Yes its the model.It represents how each single view in our RecyclerView shall be represented.
2. Holds our child view e.g EditTexts,TextView and buttons.

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
            android_src="@drawable/g" />

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

#### InputDialog.xml

1. Is our Custom Input Dialog made from a CardView
2. Basically what contains buttons and EditTexts that we shall use for inputting data to database.Also contains button for data retrieval.

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

            <ImageView
                android_id="@+id/image"
                android_layout_width="190dp"
                android_layout_height="275dp"
                android_paddingLeft="15dp"
                android_scaleType="fitCenter"
                android_src="@drawable/g"
                android_layout_alignParentLeft="true"
                android_layout_alignParentStart="true"
                android_layout_below="@+id/posEditTxt" />

            <TextView
                android_id="@+id/profile"
                android_layout_width="wrap_content"
                android_layout_height="wrap_content"
                android_textStyle="bold"
                android_textColor="@color/colorAccent"
                android_text="PLAYER PROFILE"
                android_textAppearance="?android:attr/textAppearanceLarge"
                android_layout_below="@+id/image"
                android_layout_alignParentLeft="true"
                android_layout_alignParentStart="true" />

            <EditText
                android_id="@+id/nameEditTxt"
                android_layout_width="wrap_content"
                android_layout_height="wrap_content"
                android_layout_alignParentLeft="true"
                android_paddingLeft="15dp"
                android_hint="Name"
                android_textAppearance="?android:attr/textAppearanceLarge"
                android_layout_below="@+id/profile" />

            <EditText
                android_id="@+id/posEditTxt"
                android_layout_width="wrap_content"
                android_layout_height="wrap_content"
                android_layout_alignParentLeft="true"
                android_layout_below="@+id/nameTxt"
                android_paddingLeft="15dp"
                android_layout_marginTop="24dp"
                android_hint="Position : "
                android_textAppearance="?android:attr/textAppearanceLarge" />

            <LinearLayout
                android_layout_width="match_parent"
                android_layout_height="52dp"
                android_gravity="center_vertical|end"
                android_orientation="horizontal"
                android_id="@+id/linear1"
                android_padding="8dp"
                android_layout_alignParentBottom="true"
                android_layout_alignParentLeft="true"
                android_layout_alignParentStart="true">

                <Button
                    android_layout_width="wrap_content"
                    android_layout_height="wrap_content"

                    android_padding="5dp"
                    android_textAppearance="?android:attr/textAppearanceMedium"
                    android_gravity="center_vertical|center_horizontal"
                    android_text="Save"

                    android_id="@+id/saveBtn" />
                <Button
                    android_layout_width="wrap_content"
                    android_layout_height="wrap_content"

                    android_padding="5dp"
                    android_textAppearance="?android:attr/textAppearanceMedium"
                    android_gravity="center_vertical|center_horizontal"
                    android_text="Retrieve"

                    android_id="@+id/retrieveBtn" />

            </LinearLayout>

</LinearLayout>

    </android.support.v7.widget.CardView>
```

#### DetailActivity.java

OUR DETAIL ACTIVITY

**Purpose** :

1. Receives the details sent from the Master Activity using Intent object.
2. Displays those Details in Views.
3. Talks to DBAdapter class to help in performing Update and Delete from database.

```java
package com.tutorials.hp.recyclersqlite;

import android.content.Intent;
import android.os.Bundle;
import android.support.design.widget.FloatingActionButton;
import android.support.design.widget.Snackbar;
import android.support.v7.app.AppCompatActivity;
import android.support.v7.widget.Toolbar;
import android.view.View;
import android.widget.Button;
import android.widget.EditText;
import android.widget.ImageView;

public class DetailActivity extends AppCompatActivity {

    ImageView img;
    EditText nameTxt,posTxt;
    Button updateBtn,deleteBtn;

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

        //RECEIVE DATA FROM MAIN ACTIVITY
        Intent i=getIntent();

        final String name=i.getExtras().getString("NAME");
        final String pos=i.getExtras().getString("POSITION");
        final int id=i.getExtras().getInt("ID");

        updateBtn= (Button) findViewById(R.id.updateBtn);
        deleteBtn= (Button) findViewById(R.id.deleteBtn);
        nameTxt= (EditText) findViewById(R.id.nameEditTxt);
        posTxt= (EditText) findViewById(R.id.posEditTxt);

        //ASSIGN DATA TO THOSE VIEWS
        nameTxt.setText(name);
        posTxt.setText(pos);

        //update
        updateBtn.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                update(id,nameTxt.getText().toString(),posTxt.getText().toString());
            }
        });

        //DELETE
        //update
        deleteBtn.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
              delete(id);
            }
        });

    }

    private void update(int id,String newName,String newPos)
    {
        DBAdapter db=new DBAdapter(this);
        db.openDB();
        long result=db.UPDATE(id,newName,newPos);

        if(result>0)
        {
            nameTxt.setText(newName);
            nameTxt.setText(newPos);
            Snackbar.make(nameTxt,"Updated Sucesfully",Snackbar.LENGTH_SHORT).show();
        }else
        {
            Snackbar.make(nameTxt,"Unable to Update",Snackbar.LENGTH_SHORT).show();
        }

        db.close();
    }

    //DELETE
    private void delete(int id)
    {
        DBAdapter db=new DBAdapter(this);
        db.openDB();
        long result=db.Delete(id);

        if(result>0)
        {
            this.finish();
        }else
        {
            Snackbar.make(nameTxt,"Unable to Update",Snackbar.LENGTH_SHORT).show();
        }

        db.close();
    }

}
```

#### ActivityDetail.xml

**Purpose** :

1. Acts as template for our detailcontent layout.

```xml
<?xml version="1.0" encoding="utf-8"?>
<android.support.design.widget.CoordinatorLayout

    android_layout_width="match_parent"
    android_layout_height="match_parent"
    android_fitsSystemWindows="true"
    tools_context="com.tutorials.hp.recyclersqlite.DetailActivity">

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

    <include layout="@layout/content_detail" />

    <android.support.design.widget.FloatingActionButton
        android_id="@+id/fab"
        android_layout_width="wrap_content"
        android_layout_height="wrap_content"
        android_layout_gravity="bottom|end"
        android_layout_margin="@dimen/fab_margin"
        android_src="@android:drawable/ic_dialog_email" />

</android.support.design.widget.CoordinatorLayout>
```

#### ContenDetail.xml

**Purpose** :

1. Holds for us the views like Edittexts and TextViews form which the data shall be displayed or edited.

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
    tools_context="com.tutorials.hp.recyclersqlite.DetailActivity"
    tools_showIn="@layout/activity_detail">

    <android.support.v7.widget.CardView
        android_orientation="horizontal" android_layout_width="match_parent"

        android_layout_margin="5dp"
        card_view_cardCornerRadius="10dp"
        card_view_cardElevation="5dp"

        android_layout_height="match_parent">

        <LinearLayout
            android_layout_width="match_parent"
            android_orientation="vertical"
            android_layout_height="match_parent">

            <ImageView
                android_id="@+id/image"
                android_layout_width="190dp"
                android_layout_height="275dp"
                android_paddingLeft="15dp"
                android_scaleType="fitCenter"
                android_src="@drawable/yoda"
                android_layout_alignParentLeft="true"
                android_layout_alignParentStart="true"
                android_layout_below="@+id/playerImage" />

            <TextView
                android_id="@+id/profile"
                android_layout_width="wrap_content"
                android_layout_height="wrap_content"
                android_textStyle="bold"
                android_textColor="@color/colorAccent"
                android_text="PLAYER PROFILE"
                android_textAppearance="?android:attr/textAppearanceLarge"
                android_layout_below="@+id/image"
                android_layout_alignParentLeft="true"
                android_layout_alignParentStart="true" />

            <EditText
                android_id="@+id/nameEditTxt"
                android_layout_width="wrap_content"
                android_layout_height="wrap_content"
                android_layout_alignParentLeft="true"
                android_paddingLeft="15dp"
                android_hint="Name"
                android_textAppearance="?android:attr/textAppearanceLarge"
                android_layout_below="@+id/profile" />
            <EditText
                android_id="@+id/posEditTxt"
                android_layout_width="wrap_content"
                android_layout_height="wrap_content"
                android_layout_alignParentLeft="true"
                android_layout_below="@+id/nameTxt"
                android_paddingLeft="15dp"
                android_layout_marginTop="24dp"
                android_hint="Position : "
                android_textAppearance="?android:attr/textAppearanceLarge" />

            <LinearLayout
                android_layout_width="match_parent"
                android_layout_height="52dp"
                android_gravity="center_vertical|end"
                android_orientation="horizontal"
                android_id="@+id/linear1"
                android_padding="8dp"
                android_layout_alignParentBottom="true"
                android_layout_alignParentLeft="true"
                android_layout_alignParentStart="true">

                <Button
                    android_layout_width="wrap_content"
                    android_layout_height="wrap_content"
                    android_height="48dp"
                    android_clickable="true"
                    android_padding="5dp"
                    android_textAppearance="?android:attr/textAppearanceMedium"
                    android_gravity="center_vertical|center_horizontal"
                    android_text="Update"
                    android_textColor="@color/colorPrimary"
                    android_id="@+id/updateBtn" />

                <Button
                    android_layout_width="wrap_content"
                    android_layout_height="wrap_content"
                    android_height="48dp"
                    android_clickable="true"
                    android_padding="5dp"
                    android_textAppearance="?android:attr/textAppearanceMedium"
                    android_gravity="center_vertical|center_horizontal"
                    android_text="Delete"
                    android_textColor="@color/colorPrimary"
                    android_id="@+id/deleteBtn" />

            </LinearLayout>

            <TextView
                android_layout_width="match_parent"
                android_layout_height="match_parent"
                android_height="150dp"
                android_clickable="true"
                android_padding="5dp"

                android_textAppearance="?android:attr/textAppearanceMedium"
                android_gravity="center_vertical|center_horizontal"
                android_text="The player joined in the year 2006.
            He has won every trophy imaginable since joining.
            He works hard for the team and is a good example.
            "
                android_textColor="@color/colorPrimaryDark"
                android_id="@+id/info"
                android_layout_below="@+id/posEditTxt"
                android_layout_alignParentRight="true"
                android_layout_alignParentEnd="true"
                android_layout_toRightOf="@+id/image"
                android_layout_toEndOf="@+id/image"
                android_layout_alignBottom="@+id/image" />
        </LinearLayout>
    </android.support.v7.widget.CardView>
</RelativeLayout>
```

#### Download

- You can Download the full Project below. Source code is well commented. [Download](https://github.com/Oclemy/RecyclerSQLiteExample/archive/master.zip)
- We also have a video tutorial for this example explained in a step by step manner.
- Moreover you can view the project demo there.
- The full source code reference is of course in the link above.

| No. | Location | Link |
| --- | --- | --- |
| 1. | GitHub | [Direct Download](https://github.com/Oclemy/RecyclerSQLiteExample/archive/master.zip) |
| 2. | GitHub | [Browse](https://github.com/Oclemy/RecyclerSQLiteExample) |
| 3. | YouTube | [Video Tutorial](https://www.youtube.com/watch?v=MulLF56Vz1c) |
| 4. | YouTube | [Our YouTube Channel](https://www.youtube.com/channel/UCpdkWp2zh5Qv1ZWlnqswdCw) |
