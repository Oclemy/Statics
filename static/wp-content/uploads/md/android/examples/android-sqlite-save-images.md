# SQLite - Save Images



In this tutorial we will be learning how to work with SQLite database when it comes to images. Basically how to save images in sqlite database. This can be done in two ways:

1. Saving image path/url instead of actual image data. This is the better approach.
2. Saving actual image data or blob in sqlite database.


Let's look at some examples:

## Example 1: Android SQLite Database – ListView Web Images – Save Text,Image URLs,Load

_Android SQLite Database - ListView Web Images - Save Text,Image URLs,Load_.

Working with SQLite and images from the web.

Now people we discuss Android SQLite database and Internet images .Our purpose is simple : get image urls from the web and maybe some text,save them in SQlite database,Load the images from the internet,of course URLs from SQlite database. Basically this is what we do here :

1. Download Images From the Web,in an image hosting site in my case, or anywhere for you.
2. Save the image URLs and some text that we type in beautiful Material EditTexts. 3. Save these to our database : name and image url.Our SQLite database.
3. Retrieve them from our database,our name and image url.
4. Show them in our custom ListView: images and text. 6.We use the nice Picasso library to download and cache images automatically,both in memory and disk.

#### What You Will Leanr From This Tutorial

1. How to save both text and web image urls in SQLite database.
2. How to retrieve text and image urls from sqlite database and render them in custom listview with text and images.
3. Custom ListView with CardViews filled from SQLite.
4. How to use SQLiteDatabase and SQLiteOpenHelper classes.
5. How to use Picasso to load and cache images with urls coming from SQLite.

![SQLite Images Project Structure](https://github.com/Oclemy/ListViewSQLiteImages/raw/master/demos/ProjectStructure.PNG)

Obviously we are loading images from online so we need to add internet permission in our androidmanifest.xml :   `<uses-permission android_name="android.permission.INTERNET"/>`

#### PicassoClient

We shall be using Picasso to download our images,so lets write a basic Picasso client :

```java
package com.tutorials.hp.listviewsqliteimages.mPicasso;

import android.content.Context;
import android.widget.ImageView;

import com.squareup.picasso.Picasso;
import com.tutorials.hp.listviewsqliteimages.R;

public class PicassoClient {

    public static void loadImage(Context c,String url,ImageView img)
    {
        if(url != null && url.length()>0)
        {
            Picasso.with(c).load(url).placeholder(R.drawable.placeholder).into(img);
        }else
        {
            Picasso.with(c).load(R.drawable.placeholder).into(img);
        }
    }

}
```

#### Constants

We have three database classes,Constants,DBHelper and DBAdapter. Constants to hold SQLite database constants.DBHelperr to upgrade our SQLite database table and DBAdapter to perform CRUD SQlite operations. Here's our Constants :

```java
package com.tutorials.hp.listviewsqliteimages.mDatabase;

public class Constants {

    //COLUMNS
    static final String ROW_ID="id";
    static final String NAME="name";
    static final String URL="url";

    //DB PROPERTIES
    static final String DB_NAME="dd_DB";
    static final String TB_NAME="dd_TB";
    static final int DB_VERSION=1;

    //CREATE TABLE STMT
    static final String CREATE_TB="CREATE TABLE dd_TB(id INTEGER PRIMARY KEY AUTOINCREMENT,"
            + "name TEXT NOT NULL,url TEXT NOT NULL);";

     //UPGRADE TB STMT
    static final String DROP_TB="DROP TABLE IF EXISTS "+TB_NAME;

}
```

![Cloudinary Image Source](https://github.com/Oclemy/ListViewSQLiteImages/raw/master/demos/CloudinaryImages.PNG)

#### DBAdapter

Then here's our DBAdapter :

```java
package com.tutorials.hp.listviewsqliteimages.mDatabase;

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
    public DBAdapter openDB()
    {
        try {
            db=helper.getWritableDatabase();
        } catch (SQLException e) {
            e.printStackTrace();
        }

        return this;
    }

    //CLOSE DB
    public void closeDB()
    {
        try {
            helper.close();
        } catch (SQLException e) {
            e.printStackTrace();
        }
    }

    //SAVE
    public long add(String name,String url)
    {
        try {
            ContentValues cv=new ContentValues();
            cv.put(Constants.NAME,name);
            cv.put(Constants.URL, url);

            db.insert(Constants.TB_NAME, Constants.ROW_ID, cv);
            return 1;

        } catch (Exception e) {
            e.printStackTrace();
        }
        return 0;
    }

    //RETRIEVE
    public Cursor getTVShows()
    {
        String[] columns={Constants.ROW_ID,Constants.NAME,Constants.URL};

        return db.query(Constants.TB_NAME,columns,null,null,null,null,null);
    }
}
```

![Material Dialog Insert Data](https://github.com/Oclemy/ListViewSQLiteImages/raw/master/demos/InsertData.PNG)

#### CustomAdapter

We have our CustomAdapter class that will bind data to ListView :

```java
package com.tutorials.hp.listviewsqliteimages.mListView;

import android.content.Context;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.BaseAdapter;

import com.tutorials.hp.listviewsqliteimages.R;
import com.tutorials.hp.listviewsqliteimages.mDataObject.TVShow;
import com.tutorials.hp.listviewsqliteimages.mPicasso.PicassoClient;

import java.util.ArrayList;

public class CustomAdapter extends BaseAdapter {

    Context c;
    ArrayList<TVShow> tvShows;
    LayoutInflater inflater;

    public CustomAdapter(Context c, ArrayList<TVShow> tvShows) {
        this.c = c;
        this.tvShows = tvShows;
    }

    @Override
    public int getCount() {
        return tvShows.size();
    }

    @Override
    public Object getItem(int position) {
        return tvShows.get(position);
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

        //BIND DATA
        MyHolder holder=new MyHolder(convertView);
        holder.nameTxt.setText(tvShows.get(position).getName());
        PicassoClient.loadImage(c,tvShows.get(position).getImageUrl(),holder.img);

        return convertView;
    }
}
```

#### MainActivity

Here's our MainActivity class :

```java
package com.tutorials.hp.listviewsqliteimages;

import android.app.Dialog;
import android.database.Cursor;
import android.os.Bundle;
import android.support.design.widget.FloatingActionButton;
import android.support.design.widget.Snackbar;
import android.support.v7.app.AppCompatActivity;
import android.support.v7.widget.DefaultItemAnimator;
import android.support.v7.widget.LinearLayoutManager;
import android.support.v7.widget.Toolbar;
import android.view.View;
import android.view.Menu;
import android.view.MenuItem;
import android.widget.Button;
import android.widget.EditText;
import android.widget.ListView;

import com.tutorials.hp.listviewsqliteimages.mDataObject.TVShow;
import com.tutorials.hp.listviewsqliteimages.mDatabase.DBAdapter;
import com.tutorials.hp.listviewsqliteimages.mListView.CustomAdapter;

import java.util.ArrayList;

public class MainActivity extends AppCompatActivity {

    ListView lv;
    CustomAdapter adapter;
    EditText nameEditText,urlEditText;
    ArrayList<TVShow> tvShows=new ArrayList<>();

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);
        Toolbar toolbar = (Toolbar) findViewById(R.id.toolbar);
        setSupportActionBar(toolbar);

        FloatingActionButton fab = (FloatingActionButton) findViewById(R.id.fab);

        lv= (ListView) findViewById(R.id.lv);
        adapter=new CustomAdapter(this,tvShows);

        //lv.setAdapter(adapter);

        fab.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View view) {
                displayDialog();
            }
        });
    }

    private void displayDialog()
    {
        Dialog d=new Dialog(this);
        d.setTitle("Save To DB");
        d.setContentView(R.layout.dialog_layout);

        nameEditText= (EditText) d.findViewById(R.id.nameEditTxt);
        urlEditText= (EditText) d.findViewById(R.id.urlEditTxt);
        Button saveBtn= (Button) d.findViewById(R.id.saveBtn);
        Button retrieveBtn= (Button) d.findViewById(R.id.retrieveBtn);

        saveBtn.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                save(nameEditText.getText().toString(),urlEditText.getText().toString());
            }
        });
        retrieveBtn.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                 retrieve();
            }
        });

        d.show();
    }

    private void save(String name,String url)
    {
        DBAdapter db=new DBAdapter(this);
        db.openDB();
        long result=db.add(name,url);

        if(result==1)
        {
            nameEditText.setText("");
            urlEditText.setText("");
        }else {
            Snackbar.make(nameEditText,"Unable To Save",Snackbar.LENGTH_SHORT).show();
        }

        //REFRESH
        retrieve();
    }

    private void retrieve()
    {
        tvShows.clear();
        DBAdapter db=new DBAdapter(this);
        db.openDB();

        Cursor c=db.getTVShows();
        while (c.moveToNext())
        {
            String name=c.getString(1);
            String url=c.getString(2);

            TVShow tv=new TVShow();
            tv.setName(name);
            tv.setImageUrl(url);

            tvShows.add(tv);
        }

        db.closeDB();
        if(tvShows.size()>0)
        {
            lv.setAdapter(adapter);
        }

    }

}
```

![SQLite ListView CardView Images and Text](https://github.com/Oclemy/ListViewSQLiteImages/raw/master/demos/ListViewCardViews.PNG)

Hey,look,everything is in the Source code download above.Some classes like ViewHolder,TVShow,DBHelper are there.Just download it and import to your android studio.

If you prefer more explanations as well as well as demo please check the below video tutorial.Please don't mind the audio quality. [http://www.youtube.com/watch?v=7zipXNhcV-o](http://www.youtube.com/watch?v=7zipXNhcV-o)

#### Download

Also check our video tutorial it's more detailed and explained in step by step and will guide you through how setup our free Cloudinary account where we store images. However note that it is not mandatory to use Cloud services to store images. Your images can come from anywhere,

| No. | Location | Link |
| --- | --- | --- |
| 1. | GitHub | [Direct Download](https://github.com/Oclemy/ListViewSQLiteImages/archive/master.zip)) |
| 2. | GitHub | [Browse](https://github.com/Oclemy/ListViewSQLiteImages) |
| 3. | YouTube | [Video Tutorial](http://www.youtube.com/watch?v=7zipXNhcV-o) |
| 4. | YouTube | [Our YouTube Channel](https://www.youtube.com/channel/UCpdkWp2zh5Qv1ZWlnqswdCw) |

## Example 2: Android SQLite – RecyclerView Web Images – Save Text ,Image URLs ,Retrieve

_Android SQLite - RecyclerView Web Images - Save Text ,Image URLs ,Retrieve Tutorial._

Hello friends,today we basically discuss the following,in a practical was as we always do obviously:

1. Download Images From the Web,in an image hosting site in my case, or anywhere for you.
2. Save the image URLs and some text that we type in beautiful Material EditTexts. 3. Save these to our database : name and image url.Our SQLite database.
3. Retrieve them from our database,our name and image url.
4. Show them in our custom RecyclerView : images and text.
5. We use the nice Picasso library to download and cache images automatically,both in memory and disk.

![RecyclerView SQlite Images Project Structure](https://github.com/Oclemy/RecyclerSQLiteImagesText/raw/master/demos/ProjectStructure.PNG) RecyclerView SQlite Images Project Structure

First make sure you add the internet permission as we shall be fetching images from online.Actually in this case I used Cloudinary to store my image. `<uses-permission android_name="android.permission.INTERNET"/>`

We shall be using Picasso library to fetch our images from the cloud.So lets add its dependency in our build.gradle :

```groovy
dependencies {
    compile fileTree(dir: 'libs', include: ['*.jar'])
    testCompile 'junit:junit:4.12'
    compile 'com.android.support:appcompat-v7:23.3.0'
    compile 'com.android.support:design:23.3.0'
    compile 'com.android.support:cardview-v7:23.3.0'
    compile 'com.squareup.picasso:picasso:2.5.2'
}
```

#### PicassoClient.java

Then write a simple Picasso Client to fetch image given a url :

```java
package com.tutorials.hp.recyclersqliteimagestext.mPicasso;

import android.content.Context;
import android.widget.ImageView;

import com.squareup.picasso.Picasso;
import com.tutorials.hp.recyclersqliteimagestext.R;

public class PicassoClient {

    //DOWNLOAD AND CACHE IMG
    public static void loadImage(Context c,String url,ImageView img)
    {
        if(url != null && url.length()>0)
        {
            Picasso.with(c).load(url).placeholder(R.drawable.placeholder).into(img);
        }else {
            Picasso.with(c).load(R.drawable.placeholder).into(img);
        }
    }

}
```

![Cloudinay.com Image Storage](https://github.com/Oclemy/RecyclerSQLiteImagesText/raw/master/demos/CloudinaryImageSource.PNG)

#### Constants.java

Lets have all our SQLite database constants in one place.This makes them easy to reuse and in case we change something it gets reflected al over.

```java
package com.tutorials.hp.recyclersqliteimagestext.mDatabase;

public class Constants {
    //COLUMNS
    static final String ROW_ID="id";
    static final String NAME="name";
    static final String URL="url";

    //DB PROPERTIES
    static final String DB_NAME="cc_DB";
    static final String TB_NAME="cc_TB";
    static final int DB_VERSION=1;

    //CREATE TABLE STMT
    static final String CREATE_TB="CREATE TABLE cc_TB(id INTEGER PRIMARY KEY AUTOINCREMENT,"
            + "name TEXT NOT NULL,url TEXT NOT NULL);";

    //UPGRADE TB
    static final String DROP_TB="DROP TABLE IF EXISTS "+TB_NAME;

}
```

#### DBAdapter.java

Then here's our DBAdapter class that shall be responsible for SQlite CRUD :

```java
package com.tutorials.hp.recyclersqliteimagestext.mDatabase;

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
    //OPEN
    public DBAdapter openDB()
    {
        try {
            db=helper.getWritableDatabase();
        } catch (Exception e) {
            e.printStackTrace();
        }
        return this;
    }

    //CLOSE
    public void closeDB()
    {
        try {
            helper.close();
        } catch (Exception e) {
            e.printStackTrace();
        }
    }

    //SAVE
    public long add(String name,String url)
    {
        try {
            ContentValues cv=new ContentValues();
            cv.put(Constants.NAME,name);
            cv.put(Constants.URL, url);

            db.insert(Constants.TB_NAME, Constants.ROW_ID, cv);

            return 1;

        } catch (Exception e) {
            e.printStackTrace();
        }

        return 0;
    }

    //RETRIEVE
    public Cursor getTVShows()
    {
        String[] columns={Constants.ROW_ID,Constants.NAME,Constants.URL};

        return db.query(Constants.TB_NAME,columns,null,null,null,null,null);
    }
}
```

![Material Dialog Insert SQLite data](https://github.com/Oclemy/RecyclerSQLiteImagesText/raw/master/demos/AddImages.PNG)

#### MyAdapter.java

We also have our RecyclerView adapter class to bind our dataset to RecyclerView.The class is a child of RecyclerView.Adapter :

```java
package com.tutorials.hp.recyclersqliteimagestext.mRecycler;

import android.content.Context;
import android.support.v7.widget.RecyclerView;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;

import com.tutorials.hp.recyclersqliteimagestext.R;
import com.tutorials.hp.recyclersqliteimagestext.mDataObject.TVShow;
import com.tutorials.hp.recyclersqliteimagestext.mPicasso.PicassoClient;

import java.util.ArrayList;

public class MyAdapter  extends RecyclerView.Adapter<MyHolder> {

   Context c;
    ArrayList<TVShow> tvShows;

    public MyAdapter(Context c, ArrayList<TVShow> tvShows) {
        this.c = c;
        this.tvShows = tvShows;
    }

    //INITIALIZE VH
    @Override
    public MyHolder onCreateViewHolder(ViewGroup parent, int viewType) {
        View v= LayoutInflater.from(parent.getContext()).inflate(R.layout.model,parent,false);
        MyHolder holder=new MyHolder(v);

        return holder;
    }

    //BIND DATA
    @Override
    public void onBindViewHolder(MyHolder holder, int position) {
         holder.nameTxt.setText(tvShows.get(position).getName());
        PicassoClient.loadImage(c,tvShows.get(position).getImageUrl(),holder.img);
    }

    //TOTAL NUM TVSHOWS
    @Override
    public int getItemCount() {
        return tvShows.size();
    }
}
```

#### MainActivity.java

Here's our MainActivity class :

```java
package com.tutorials.hp.recyclersqliteimagestext;

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
import android.view.Menu;
import android.view.MenuItem;
import android.view.Window;
import android.widget.Button;
import android.widget.EditText;
import android.widget.Toast;

import com.tutorials.hp.recyclersqliteimagestext.mDataObject.TVShow;
import com.tutorials.hp.recyclersqliteimagestext.mDatabase.DBAdapter;
import com.tutorials.hp.recyclersqliteimagestext.mRecycler.MyAdapter;

import java.util.ArrayList;

public class MainActivity extends AppCompatActivity {

    RecyclerView rv;
    MyAdapter adapter;
    EditText nameEditText,urlEditText;
    ArrayList<TVShow> tvShows=new ArrayList<>();

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);
        Toolbar toolbar = (Toolbar) findViewById(R.id.toolbar);
        setSupportActionBar(toolbar);

        FloatingActionButton fab = (FloatingActionButton) findViewById(R.id.fab);

        //RECYCLERVIEW
        rv= (RecyclerView) findViewById(R.id.myRecyclerID);
        rv.setLayoutManager(new LinearLayoutManager(this));
        rv.setItemAnimator(new DefaultItemAnimator());

        //ADAPTER
        adapter=new MyAdapter(this,tvShows);

//        rv.setAdapter(adapter);

        fab.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View view) {
                displayDialog();
            }
        });
    }

    private void displayDialog()
    {
        Dialog d=new Dialog(this);
        d.setTitle("Save To DB");
        d.setContentView(R.layout.dialog_layout);

        nameEditText= (EditText) d.findViewById(R.id.nameEditTxt);
        urlEditText= (EditText) d.findViewById(R.id.urlEditTxt);
        Button saveBtn= (Button) d.findViewById(R.id.saveBtn);
        Button retrieveBtn= (Button) d.findViewById(R.id.retrieveBtn);

        saveBtn.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                save(nameEditText.getText().toString(),urlEditText.getText().toString());
            }
        });
        retrieveBtn.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                 retrieve();
            }
        });

        d.show();

    }

    private void save(String name,String url)
    {
        DBAdapter db=new DBAdapter(this);
        db.openDB();
        long result=db.add(name,url);
        if(result==1)
        {
            nameEditText.setText("");
            urlEditText.setText("");

        }else
        {
            Snackbar.make(nameEditText,"Unable to save",Snackbar.LENGTH_SHORT).show();
        }

        db.closeDB();
    }

    private void retrieve()
    {
        tvShows.clear();
        DBAdapter db=new DBAdapter(this);
        db.openDB();
        Cursor c=db.getTVShows();
        while (c.moveToNext())
        {
            String name=c.getString(1);
            String url=c.getString(2);

            TVShow tv=new TVShow();
            tv.setName(name);
            tv.setImageUrl(url);

            tvShows.add(tv);
        }

        if(tvShows.size()>0)
        {
            rv.setAdapter(adapter);
        }

        db.closeDB();
    }

}
```

![RecyclerView CardViews SQLite Images and Text](https://github.com/Oclemy/RecyclerSQLiteImagesText/raw/master/demos/RecyclerViewSQLiteImages.PNG)

#### Download

Look all the source code is above just a download away.There some classes we have not included here but are in the source code.Download it,extract and import to your android studio.

Below is the video tutorial.If you prefer more explanations and demo visit it.

| No. | Location | Link |
| --- | --- | --- |
| 1. | GitHub | [Direct Download](https://github.com/Oclemy/RecyclerSQLiteImagesText/archive/master.zip)) |
| 2. | GitHub | [Browse](https://github.com/Oclemy/RecyclerSQLiteImagesText) |
| 3. | YouTube | [Video Tutorial](http://www.youtube.com/watch?v=hAwkXAAHB-0) |
| 4. | YouTube | [Our YouTube Channel](https://www.youtube.com/channel/UCpdkWp2zh5Qv1ZWlnqswdCw) |
