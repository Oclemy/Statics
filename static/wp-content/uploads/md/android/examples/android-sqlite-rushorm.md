# SQLite ListView CRUD with RushORM


_Android SQLite RushORM tutorial - INSERT SELECT UPDATE DELETE data._

SQLite database is one of the most popular cross platform Relational databases. Its small anc compact and can easily be packaged in various devices. In android SQLite is one the native C++ libraries that come prepackaged with android platform. In this case, we ant to see how to perform CRUD operations with SQLite database.


We'll see how to INSERT, SELECT, UPDATE and DELETE data to and from SQLite database. We'll show the retrieved data in a ListView component. Users will be able to edit via a material dialog that get show when user selects edit in a contextmenu that gets shown with various options. He can also choose to add new data/insert or delete data. We'll use RushORM which is a popular and easy to use Object Relational Mapper.

RushORM replaces the need for writing SQL as its an ORM. ORMs abstracts away SQL statements so you manipulate your database table via java code. This is easier when you want to make complex manipulations and is also less error prone.

### Screenshot

- Here's the screenshot of the project.

Android SQLite RushORM ListView CRUD : Master View.

![Android SQLite ListView Insert Data](https://github.com/Oclemy/SQliteRushORM/raw/master/Camposha/demos/RushORM-Save.PNG)

Android SQLite RushORM ListView CRUD: Detail View.

![Android SQLite ListView Edit Data ](https://github.com/Oclemy/SQliteRushORM/raw/master/Camposha/demos/RushORM-Edit.PNG)

Android SQLite RushORM ListView CRUD : Project Structure.

![Android ListView SQLite Project Structure](https://github.com/Oclemy/SQliteRushORM/raw/master/Camposha/demos/Project-Structure.PNG)

# Common Questions this example explores

- Android ListView SQLite example.
- Android ListView SQLite - INSERT SELECT UPDATE DELETE.
- Android RushORM SQLite example with ListView.
- How to use SQLite with ListView to perform CRUD full example.
- Android ORM example.
- Android ContextMenu with SQLite example.

# Tools Used

This example was written with the following tools:

- Windows 8
- AndroidStudio IDE
- Genymotion Emulator
- Language : Java
- Topic : ListView SQLite, RushORM SQLite, SQLite RushORM adapter, SQLite CRUD

# Libaries Used

- We use RushORM library [http://www.rushorm.co.uk/](http://www.rushorm.co.uk/)

# Source Code

AndroidManifest.xml

- We are using SQLite database with RushORM.
- Hence we use AndroidManifest.xml to define the meta data for our sqlite database.
- These include database name, database class package(where our database model belongs), database version etc.

```xml
<?xml version="1.0" encoding="utf-8"?>
<manifest
    package="com.tutorials.hp.sqliterushorm">

    <!--REGISTER MAIN APP BY ADDING NAME-->
    <application
        android_name=".MainApplication"
        android_allowBackup="true"
        android_icon="@mipmap/ic_launcher"
        android_label="@string/app_name"
        android_supportsRtl="true"
        android_theme="@style/AppTheme">
        <activity
            android_name=".MainActivity"
            android_label="@string/app_name"
            android_theme="@style/AppTheme.NoActionBar">
            <intent-filter>
                <action android_name="android.intent.action.MAIN" />
                <category android_name="android.intent.category.LAUNCHER" />
            </intent-filter>
        </activity>
<!--
- We are using SQLite database with RushORM.
- Hence we use AndroidManifest.xml to define the meta data for our sqlite database.
- These include database name, database class package(where our database model belongs), database version etc.
-->
        <!--THIS FIRST LINE IS COMPULSORY.ADD YOUR DATABASE PACKAGE-->
        <meta-data android_name="Rush_classes_package" android_value="com.tutorials.hp.sqliterushorm.mDB" />
        <!-- Updating this will cause a database upgrade -->
        <meta-data android_name="Rush_db_version" android_value="2" />

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

## Build.Gradle Project Level

- We specify the repository for fetching our RushORM.

```
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

## Build.Gradle App Level

- Our app level build.gradle file.
- We specify compilesdk,minimum sdk,target sdk and dependencies.
- Note that the minimum sdk for this project isn't that strict,it is much lower than that specified below.
- We also add dependencies using 'compile' statement.
- Our activity shall derive from the appCompatActivity to make it target earlier android versions.
- We also specify design support library as well as CardView.
- Finally we add the RushORM dependency, which is a third party library. We'll use it for sqlite database as it abstracts away sql statements.

```
apply plugin: 'com.android.application'

/*
- Our app level build.gradle file.
- We specify compilesdk,minimum sdk,target sdk and dependencies.
- Note that the minimum sdk for this project isn't that strict,it is much lower than that specified below.
- We also add dependencies using 'compile' statement.
- Our activity shall derive from the appCompatActivity to make it target earlier android versions.
- We also specify design support library as well as CardView.
- Finally we add the RushORM dependency, which is a third party library. We'll use it for sqlite database as it abstracts away sql statements.
 */

android {
    compileSdkVersion 24
    buildToolsVersion "25.0.1"

    defaultConfig {
        applicationId "com.tutorials.hp.sqliterushorm"
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
    compile 'com.android.support:appcompat-v7:24.2.1'
    compile 'com.android.support:design:24.2.1'
    compile 'com.android.support:cardview-v7:24.2.1'
    compile 'co.uk.rushorm:rushandroid:1.2.0'

}
```

## MyApplication.java

- MainApplication class.
- Extends android.app.Application.
- This is a gloabl class available to all classes within your project.
- We initialize our RushORM configuration here using the initialize() method.

```java
package com.tutorials.hp.sqliterushorm;

import android.app.Application;
import co.uk.rushorm.android.AndroidInitializeConfig;
import co.uk.rushorm.core.RushCore;

/**
 - MainApplication class.
 - Extends android.app.Application.
 - This is a gloabl class available to all classes within your project.
 - We initialize our RushORM configuration here using the initialize() method.
 */
public class MainApplication extends Application {

    /*
    when our app is created.
     */
    @Override
    public void onCreate() {
        super.onCreate();

        AndroidInitializeConfig config=new AndroidInitializeConfig(getApplicationContext());
        RushCore.initialize(config);
    }
}
```

## Spacecraft.java

- Our model class.
- Our data object.
- Take note it derives from co.uk.rushorm.core.RushObject.
- This makes it a special object that can be saved,retrieved,edited or deleted to and from sqlite database.
- It will be compiled to a sqlite database table.
- The instance fields will be mapped to database table rows.
- However, apart from deriving from RushObject, it must also define an empty constructor. If you have to pass other things via constructor then define a separate constructor for those.
- NB/= The package for the model class should be specified in AndroidManifest.xml. Have a look at the manifest to see how we defined. This is beacuse RushORM needs to know where to find the class that should be converted to a table.

```java
package com.tutorials.hp.sqliterushorm.mDB;

import co.uk.rushorm.core.RushObject;

/**
 - Our model class.
 - Our data object.
 - Take note it derives from co.uk.rushorm.core.RushObject.
 - This makes it a special object that can be saved,retrieved,edited or deleted to and from sqlite database.
 - It will be compiled to a sqlite database table.
 - The instance fields will be mapped to database table rows.
 - However, apart from deriving from RushObject, it must also define an empty constructor. If you have to pass other things
 via constructor then define a separate constructor for those.
 - NB/= The package for the model class should be specified in AndroidManifest.xml. Have a look at the manifest to see how we defined.
 This is beacuse RushORM needs to know where to find the class that should be converted to a table.
 */
public class Spacecraft extends RushObject {

    private String name,propellant;

    /*
    AN EMPTY CONSTRUCTOR
     */
    public Spacecraft() {
    }

    /*
    AN EMPTY CONSTRUCTOR.
     */
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

## MyLongClickListener.java

- MyLongClickListener interface.
- Defines onItemLongClick() signature.

```java
package com.tutorials.hp.sqliterushorm.mListView;

/**
 - MyLongClickListener interface.
 - Defines onItemLongClick() signature.
 */
public interface MyLongClickListener {

    /*
    Abstract method
     */
    void onItemLongClick();

}
```

## MyViewHolder.java

- ViewHolder class.
- This class will hold views to be recycled for each viewitem by our adapter.
- Methods: onLongClick(),setLongClickListener(),onCreateContextMenuListener().
- In this case we have two textviews.
- Our views shall be longClickable, hence showing ContextMenu.
- So we implement two interfaces: OnLongClickListener and OnCreateContextMenuListener, both belong to android.view.View.
- A view object shall be passed via constructor and we use it to reference our widgets using findViewById.

```java
package com.tutorials.hp.sqliterushorm.mListView;

import android.view.ContextMenu;
import android.view.View;
import android.widget.TextView;

import com.tutorials.hp.sqliterushorm.R;

/**
 - ViewHolder class.
 - This class will hold views to be recycled for each viewitem by our adapter.
 - Methods: onLongClick(),setLongClickListener(),onCreateContextMenuListener().
 - In this case we have two textviews.
 - Our views shall be longClickable, hence showing ContextMenu.
 - So we implement two interfaces: OnLongClickListener and OnCreateContextMenuListener, both belong to android.view.View.
 - A view object shall be passed via constructor and we use it to reference our widgets using findViewById.

 */
public class MyViewHolder implements View.OnLongClickListener,View.OnCreateContextMenuListener {

    TextView nameTxt,propTxt;
    MyLongClickListener longClickListener;

    /*
    Constructor
     */
    public MyViewHolder(View v) {
        nameTxt= (TextView) v.findViewById(R.id.nameTxt);
        propTxt= (TextView) v.findViewById(R.id.propellantTxt);

        v.setOnLongClickListener(this);
        v.setOnCreateContextMenuListener(this);
    }

    /*
    Call onItemLongClick() when onLongClick is raised.
     */
    @Override
    public boolean onLongClick(View v) {
        this.longClickListener.onItemLongClick();
        return false;
    }

    /*
    Pass us a MyLongClickListener object so that we set it to our local longClickListener instance field.
     */
    public void setLongClickListener(MyLongClickListener longClickListener)
    {
        this.longClickListener=longClickListener;
    }

    /*
    When ContextMenu is created, add menuitems for new,edit and delete.
     */
    @Override
    public void onCreateContextMenu(ContextMenu menu, View v, ContextMenu.ContextMenuInfo menuInfo) {
        menu.setHeaderTitle("Action : ");
        menu.add(0, 0, 0, "NEW");
        menu.add(0,1,0,"EDIT");
        menu.add(0,2,0,"DELETE");

    }
}
```

## CustomAdapter.java

- Our adapter class.
- Derives from android.widget.BaseAdapter.
- Here we: inflate our model xml layout to viewitems and recycle it, bind data to these viewitems.
- The data we bind is passed to us via constructor.
- Apart from the data being passed us, we are also passed a Context object that will help us getSystemService that we need for our inflation of model layout.
- Being that we derive from BaseAdapter, we override getCount() which returns total count of our data, getItem() which returns each data object,getItemId() which returns the object's id, and getView() to return us its view().

```java
package com.tutorials.hp.sqliterushorm.mListView;

import android.content.Context;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.BaseAdapter;
import android.widget.Toast;
import com.tutorials.hp.sqliterushorm.R;
import com.tutorials.hp.sqliterushorm.mDB.Spacecraft;
import java.util.List;

/**
 - Our adapter class.
 - Derives from android.widget.BaseAdapter.
 - Here we: inflate our model xml layout to viewitems and recycle it, bind data to these viewitems.
 - The data we bind is passed to us via constructor.
 - Apart from the data being passed us, we are also passed a Context object that will help us getSystemService that we  need for our
 inflation of model layout.
 - Being that we derive from BaseAdapter, we override getCount() which returns total count of our data, getItem() which returns each
 data object,getItemId() which returns the object's id, and getView() to return us its view()
 */
public class CustomAdapter extends BaseAdapter {

    Context c;
    List<Spacecraft> spacecrafts;
    LayoutInflater inflater;
    Spacecraft spacecraft;

    /*
    Constructor
     */
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

    /*
    Return inflated view object.
     */
    @Override
    public View getView(final int position, View convertView, ViewGroup parent) {
        //INFLATE VIEW
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
        holder.propTxt.setText(spacecrafts.get(position).getPropellant());

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

    /*
    Spacecraft selected
     */
    public Spacecraft getSelectedSpacecraft()
    {
        return spacecraft;
    }

}
```

## MainActivity.java

MAIN ACTIVITY CLASS

Methods: onCreate(),displayDialog(),onContextItemSelected()

1. Our MainActivity.Launcher Activity.
2. Inflates ContentMain.xml to show our ListView with sqlite data.
3. Displays our material input dialog when FAB button is clicked.

```java
package com.tutorials.hp.sqliterushorm;

/*
- IMPORTS
 */
import android.app.Dialog;
import android.os.Bundle;
import android.support.design.widget.FloatingActionButton;
import android.support.v7.app.AppCompatActivity;
import android.support.v7.widget.Toolbar;
import android.view.MenuItem;
import android.view.View;
import android.widget.Button;
import android.widget.EditText;
import android.widget.ListView;
import com.tutorials.hp.sqliterushorm.mDB.Spacecraft;
import com.tutorials.hp.sqliterushorm.mListView.CustomAdapter;
import java.util.ArrayList;
import java.util.List;
import co.uk.rushorm.core.RushSearch;
/*

MAIN ACTIVITY CLASS
Methods: onCreate(),displayDialog(),onContextItemSelected()
1. Our MainActivity.Launcher Activity.
2. Inflates ContentMain.xml to show our ListView with sqlite data.
3. Displays our material input dialog when FAB button is clicked.

 */
public class MainActivity extends AppCompatActivity {

    ListView lv;
    EditText nameEditText,propellantEditTxt;
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

        this.retrieve();

        FloatingActionButton fab = (FloatingActionButton) findViewById(R.id.fab);
        fab.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View view) {
                displayDialog(false);
            }
        });
    }

    /*
    - Display Input Dialog.
    - We can show dialog either for insert or update, so we pass a boolean to identify why we are showing it.
     */
    private void displayDialog(Boolean forUpdate)
    {
        Dialog d=new Dialog(this);
        d.setTitle("SQLITE DATA");
        d.setContentView(R.layout.dialog_layout);

        nameEditText= (EditText) d.findViewById(R.id.nameEditTxt);
        propellantEditTxt= (EditText) d.findViewById(R.id.propellantEditTxt);

        saveBtn= (Button) d.findViewById(R.id.saveBtn);
        retrieveBtn= (Button) d.findViewById(R.id.retrieveBtn);

        if(!forUpdate)
        {
            saveBtn.setOnClickListener(new View.OnClickListener() {
                @Override
                public void onClick(View v) {
                    Spacecraft s=new Spacecraft();
                    save(s);
                    nameEditText.setText("");
                    propellantEditTxt.setText("");
                }
            });
            retrieveBtn.setOnClickListener(new View.OnClickListener() {
                @Override
                public void onClick(View v) {
                    retrieve();
                }
            });
        }else {

            //SET SELECTED TEXT
            nameEditText.setText(adapter.getSelectedSpacecraft().getName());
            propellantEditTxt.setText(adapter.getSelectedSpacecraft().getPropellant());

             //UPDATE SQLITE DATA USING RUSHORM.
            saveBtn.setOnClickListener(new View.OnClickListener() {
                @Override
                public void onClick(View v) {
                    Spacecraft oldSpacecraft=adapter.getSelectedSpacecraft();
                    Spacecraft s=new RushSearch().whereId(oldSpacecraft.getId()).findSingle(Spacecraft.class);

                    save(s);

                }
            });
            retrieveBtn.setOnClickListener(new View.OnClickListener() {
                @Override
                public void onClick(View v) {
                  retrieve();

                }
            });
        }

        //SHOW OUR DIALOG.
        d.show();

    }

    /*
    - Retrieve SQLite data using the RushSearch().find() method.
    - This returns a list of spacecrafts.
    - We then bind it to our listview.
     */
    private void retrieve()
    {
        List<Spacecraft> spacecrafts=new RushSearch().find(Spacecraft.class);
        if(spacecrafts.size()>0)
        {
            adapter=new CustomAdapter(MainActivity.this,spacecrafts);
            lv.setAdapter(adapter);
        }

    }
    /*
    - Save Spacecraft to sqlite database by calling save() method.
     */
    private void save(Spacecraft s)
    {
        s.setName(nameEditText.getText().toString());
        s.setPropellant(propellantEditTxt.getText().toString());
        s.save();
        retrieve();

    }

    /*
    - We will be showing a cntextmenu when listview item is clicked.
    - Hence we override the onContextItemSelected() method, passing in a menuitem.
    - We then identify the clicked contextmenu item, be it new, edit or delete.
     */
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
            Spacecraft oldSpacecraft=adapter.getSelectedSpacecraft();
            Spacecraft s=new RushSearch().whereId(oldSpacecraft.getId()).findSingle(Spacecraft.class);
            s.delete();

            //TO REFRESH
            //retrieve();

        }
        return super.onContextItemSelected(item);
    }
}
```

## ActivityMain.xml

- ActivityMain.xml.
- This is a template layout for our MainActivity.
- Root layout tag is CoordinatorLayout.
- Inside our CordinatorLayout we add : AppBarLayout,FloatingActionButton and include content_main.xml.
- Inside the AppBarLayout we add our toolbar,which we give a blue color.
- We will add our widgets in our content_main.xml, not here as this is a template layout.

```xml
<?xml version="1.0" encoding="utf-8"?>
<android.support.design.widget.CoordinatorLayout

    android_layout_width="match_parent"
    android_layout_height="match_parent"
    android_fitsSystemWindows="true"
    tools_context="com.tutorials.hp.sqliterushorm.MainActivity">

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

## ContentMain.xml

- ContentMain.xml file.
- Shall get inflated to MainActivity
- Root tag is relativeLayout.
- Contains ListView.

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
    tools_context="com.tutorials.hp.sqliterushorm.MainActivity"
    tools_showIn="@layout/activity_main">

       <ListView
        android_id="@+id/lv"
        android_layout_width="match_parent"
        android_layout_height="wrap_content"
         />
</RelativeLayout>
```

## Model.xml

- As the name suggests, this layout models our viewitem.
- We define how each Card shall appear in our List.
- So at the root level we have a CardView widget.
- We can also customize our CardView by specifying cardCornerRadius,cardElevation,width,height etc.
- Each Card shall comprise textviews.

```xml
<?xml version="1.0" encoding="utf-8"?>
<!--
- As the name suggests, this layout models our viewitem.
- We define how each Card shall appear in our List.
- So at the root level we have a CardView widget.
- We can also customize our CardView by specifying cardCornerRadius,cardElevation,width,height etc.
- Each Card shall comprise textviews.
-->
<android.support.v7.widget.CardView
    android_orientation="horizontal" android_layout_width="match_parent"

    android_layout_margin="5dp"
    card_view_cardCornerRadius="10dp"
    card_view_cardElevation="5dp"
    android_layout_height="200dp">

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
        <TextView
            android_layout_width="wrap_content"
            android_layout_height="wrap_content"
            android_textAppearance="?android:attr/textAppearanceLarge"
            android_text="Propellant"
            android_id="@+id/propellantTxt"
            android_padding="10dp"
            android_layout_alignParentBottom="true"
            android_layout_alignParentRight="true"
            android_layout_alignParentEnd="true"
            android_textColor="@color/abc_btn_colored_borderless_text_material"
            android_textStyle="italic" />
    </RelativeLayout>
</android.support.v7.widget.CardView>
```

## DialogLayout.xml

- Our input dialog layout.
- Shall act as our form for enetring data to database..
- At the root we have a CardView widget.
- We then define a vertical LinearLayout inside our CardView.
- We can also customize our CardView by specifying cardCornerRadius,cardElevation,width,height etc.
- Inside our LinearLayout we have Material design edittexts and buttons.

## Video/Preview

- We have a [YouTube channel](https://www.youtube.com/c/ProgrammingWizards) with almost a thousand tutorials, this one below being one of them.

## Download

- You can Download the full Project below. Source code is well commented.

[Download](https://github.com/Oclemy/SQliteRushORM/archive/master.zip)

# How To Run

1. Download the project above.
2. You'll get a zipped file,extract it.
3. Open the Android Studio.
4. Now close, already open project.
5. From the Menu bar click on File >New> Import Project.
6. Now Choose a Destination Folder, from where you want to import project.
7. Choose an Android Project.
8. Now Click on “OK“.
9. Done, your done importing the project,now edit it.

# More

### YouTube

- Visit our [channel](https://www.youtube.com/c/ProgrammingWizards) for more examples like these.

### Facebook

- Lets share tips and ideas in our [Facebook Page](https://web.facebook.com/oclemmy/).

Oclemy,Cheers.
