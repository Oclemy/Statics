# SQLite Pagination Examples


Paging data is extremely important when it comes to android app development. This includes while using database. In fact databases like SQLite database can have hundreds of thousands of rows, even millions of rows. However our apps can't deal with that quantity of data easily since memory is a constraint resource in android devices.

Thus we have to page or paginate data. Through this we fetch data in chunks. In this tutorial we want to look at several pagination examples when it comes to sqlite database usage.


## Example 1: Android SQLite Pagination – ListView – Next/Previous ServerSide

_Android SQLite Pagination - ListView - Next/Previous ServerSide tutorials_.

In this class we see how to perform Next/Previous type of pagination with SQLite data with ListView as our adapterview.The user can add data dynamically with an input dialog and the padination will still work.If you are in the first page,the previous button is disabled while if you are in the last page the next button is enabled.

#### Intro

- We page/paginate data with next/previous type of pagination.
- The data we are paging/paginating is SQLite data.
- We are performing our pagination on the server side,that is at the database level.
- Our ListView comprises CardViews with textviews.
- Each page has five CardView with data from SQLite.
- We are using RushORM as our SQLite database Object Relational Mapper.
- We use ListViewas our component.
- We've used Android Studio as our IDE.
- The code is well commented for easier understanding.

#### Common Questions we answer

With this simple example we explore the following :

- How to page SQLite data in android.
- How to perform SQLite server side pagination.
- How to  page data in ListView.
- How to perform CRUD with SQLite database.
- How to insert,select data to and from SQLite database and ListView in android.
- Android ListView with CardViews.
- Display SQLite data in CardViews.
- How to use Android RushORM.
- Using Android with SQLite database and ListView.

#### Tools Used

- IDE : Android Studio
- OS : Windows 8.1
- PLATFORM : Android
- LANGUAGE : Java
- TOPIC : SQLite,Pagination,ListView,CardView,RushORM

#### **Source Code**

#### Build.Gradle(Project)

- This is our first build.gradle,at the project level.
- Here we specify the maven repository from which we shall fetch our RushORM

```groovy
allprojects {
    repositories {
        maven {
            url "http://maven.rushorm.com"
        }
        jcenter()
    }
}
```

#### Build.Gradle(App)

- Here's our app level build.gradle.
- We use RushORM for our SQLite database, hence we need to specify the dependency right here in the build.gradle app level.
- We also user CardViews so lets add CardView support library dependency.

```groovy
dependencies {
    compile fileTree(dir: 'libs', include: ['*.jar'])
    testCompile 'junit:junit:4.12'
    compile 'com.android.support:appcompat-v7:25.2.0'
    compile 'com.android.support:design:25.2.0'
    compile 'com.android.support:cardview-v7:25.2.0'
    compile 'co.uk.rushorm:rushandroid:1.2.0'
}
```

#### Android Manifest

- To use RusORM we need to specify some meta data in our AndroidMainfets.xml file.
- These meta data shall assist RushORM in generating our database and table from our Model classes.
- You'll need for instance to provide the path of your model class,like for me its : `com.tutorials.hp.sqlitelistviewpagination.mDB` that host my Spacecraft model class.This assists RushORM generate my table appropriately.

```xml
<?xml version="1.0" encoding="utf-8"?>
<manifest
    package="com.tutorials.hp.sqlitelistviewpagination">

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

        <!--META DATAS FOR OUR DATABASE-->
        <!--THIS FIRST LINE IS COMPULSORY.ADD YOUR DATABASE PACKAGE-->
        <meta-data android_name="Rush_classes_package" android_value="com.tutorials.hp.sqlitelistviewpagination.mDB" />
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

#### MainApplication Class

- This class derives from Application class.
- Its a global class and we initialize our RushORM here.

```java
package com.tutorials.hp.sqlitelistviewpagination;

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

#### MainActivity Class

- Our MainActivity,launcher activity.
- First we reference views here : ListView,and next and previous buttons.
- We have a variable counter called currentPage that shall be tracking the current page as the user navigates by clicking either next or previous buttons.
- We have a method toggleButtons that toggle the state of the next and previous buttons appropriately.
- We instantiate and call Paginator class that simply returns us the current page that we bind to our ListView.
- If you click the floating action button,we display the input dialog where the user enters new data.
- Calling save method save data to SQLite database.

```java
package com.tutorials.hp.sqlitelistviewpagination;

import android.app.Dialog;
import android.os.Bundle;
import android.support.design.widget.FloatingActionButton;
import android.support.design.widget.Snackbar;
import android.support.v7.app.AppCompatActivity;
import android.support.v7.widget.Toolbar;
import android.view.View;
import android.view.Menu;
import android.view.MenuItem;
import android.widget.Button;
import android.widget.EditText;
import android.widget.ListView;

import com.tutorials.hp.sqlitelistviewpagination.mAdapterView.CustomAdapter;
import com.tutorials.hp.sqlitelistviewpagination.mAdapterView.Paginator;
import com.tutorials.hp.sqlitelistviewpagination.mDB.Spacecraft;

import co.uk.rushorm.core.RushCallback;

public class MainActivity extends AppCompatActivity {

    ListView lv;
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
        lv= (ListView) findViewById(R.id.lv);
        nextBtn= (Button) findViewById(R.id.nextBn);
        prevBtn= (Button) findViewById(R.id.prevBtn);
        FloatingActionButton fab = (FloatingActionButton) findViewById(R.id.fab);

        prevBtn.setEnabled(false);

        //FIRST PAGE WHEN LOADED
        if(new Paginator().getCurrentSpacecrafts(currentPage).size()>0)
        {
            lv.setAdapter(new CustomAdapter(MainActivity.this,new Paginator().getCurrentSpacecrafts(currentPage)));

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
                lv.setAdapter(new CustomAdapter(MainActivity.this,new Paginator().getCurrentSpacecrafts(currentPage)));
                toggleButtons();
            }
        });

        //PREVIOUS BUTTON CLICKED
        prevBtn.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View view) {
                currentPage-=1;
                lv.setAdapter(new CustomAdapter(MainActivity.this,new Paginator().getCurrentSpacecrafts(currentPage)));
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
                lv.setAdapter(new CustomAdapter(MainActivity.this,new Paginator().getCurrentSpacecrafts(currentPage)));
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
        lv.setAdapter(new CustomAdapter(MainActivity.this,new Paginator().getCurrentSpacecrafts(currentPage)));
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

#### Paginator Class

- Paginator class responsible for pagination of our SQlite data.
- The class has a method getCurrentSpacecrafts() that simply returns the current paged data to the caller.
- It updates the total items count in the database via the constructor.

```java
package com.tutorials.hp.sqlitelistviewpagination.mAdapterView;

import com.tutorials.hp.sqlitelistviewpagination.mDB.Spacecraft;

import java.util.ArrayList;
import java.util.List;

import co.uk.rushorm.core.RushSearch;

public class Paginator {

    private int TOTAL_NUM_ITEMS=0;
    private int ITEMS_PER_PAGE=0;

    public Paginator() {
        try
        {
            TOTAL_NUM_ITEMS= (int) new RushSearch().count(Spacecraft.class);
            ITEMS_PER_PAGE=5;
        }catch (Exception e)
        {

        }

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

#### Spacecraft Model class

- Is our model class.
- This class shall be mapped to our table by RushORM.
- The class derives from RushORM.

```java
package com.tutorials.hp.sqlitelistviewpagination.mDB;

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

#### CustomAdapter class

- Remember we are using a Custom ListView with CardViews hence we need an adapter class to adapt our data to custom itemviews.
- The class derives from BaseAdapter.

```java
package com.tutorials.hp.sqlitelistviewpagination.mAdapterView;

import android.content.Context;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.BaseAdapter;
import android.widget.TextView;
import android.widget.Toast;

import com.tutorials.hp.sqlitelistviewpagination.R;
import com.tutorials.hp.sqlitelistviewpagination.mDB.Spacecraft;

import java.util.List;

public class CustomAdapter extends BaseAdapter {

    Context c;
    List<Spacecraft> spacecrafts;
    LayoutInflater inflater;

    /*
    GET CONTEXT AS WELL AS LIST OF SPACECRAFTS
     */
    public CustomAdapter(Context c, List<Spacecraft> spacecrafts) {
        this.c = c;
        this.spacecrafts = spacecrafts;
    }

    /*
    TOTAL NUM OF SPACECRAFTS TO BIND
     */
    @Override
    public int getCount() {
        return spacecrafts.size();
    }

    /*
    GET SPACECRAFT
     */
    @Override
    public Object getItem(int position) {
        return spacecrafts.get(position);
    }

    /*
    SPACECRAFT ID
     */
    @Override
    public long getItemId(int position) {
        return position;
    }

    /*
    RETURN VIEW ITEM TO BE RENDERED IN LISTVIEW
     */
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

#### ActivityMain Layout

- Is our activitymain.xml.
- Contains our contentmain.xml.

```xml
<?xml version="1.0" encoding="utf-8"?>
<android.support.design.widget.CoordinatorLayout

    android_layout_width="match_parent"
    android_layout_height="match_parent"
    android_fitsSystemWindows="true"
    tools_context="com.tutorials.hp.sqlitelistviewpagination.MainActivity">

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

#### ContentMain Layout

- Main Layout.
- We specify Views and widgets xml code here.
- This layout shall get inflated into our MainActivity interface.
- Our views comprise ListView and next and previous buttons.

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
    tools_context="com.tutorials.hp.sqlitelistviewpagination.MainActivity"
    tools_showIn="@layout/activity_main">

    <LinearLayout
        android_orientation="vertical"
        android_layout_width="match_parent"
        android_layout_height="match_parent">
        <ListView
            android_id="@+id/lv"
            android_layout_width="match_parent"
            android_layout_height="wrap_content"
             />

        <LinearLayout
            android_layout_weight="2"
            android_orientation="horizontal"
            android_layout_width="match_parent"
            android_layout_height="100dp">
            <Button
                android_id="@+id/prevBtn"
                android_text="Previous"
                android_background="@color/colorAccent"
                android_padding="10dp"
                android_layout_width="wrap_content"
                android_layout_height="wrap_content" />
            <Button
                android_id="@+id/nextBn"
                android_text="Next"
                android_background="#009968"
                android_padding="10dp"
                android_layout_width="wrap_content"
                android_layout_height="wrap_content" />
        </LinearLayout>
    </LinearLayout>

</RelativeLayout>
```

#### Model Layout

- Shall essentially get inflated to our ListView viewitems.
- The rootView is a CardView
    
    ```xml
    
    
    android_layout_margin="5dp"
    card_view_cardCornerRadius="10dp"
    card_view_cardElevation="5dp"
    
    android_layout_height="200dp">
    
    
    
        
    
        
    
    
    ```
    

#### Input Dialog Layout

- This is SQLite and we are performing data entry so we need input dialog with edittexts and save button.
- Shall get displayed when floating action button is clicked.

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

        <android.support.design.widget.TextInputLayout
            android_id="@+id/propellantLayout"
            android_layout_width="match_parent"
            android_layout_height="wrap_content">

            <EditText
                android_id="@+id/propellantEditTxt"
                android_layout_width="match_parent"
                android_layout_height="wrap_content"
                android_singleLine="true"
                android_hint= "Propeant" />
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
            android_text="Reload"
            android_clickable="true"
            android_background="@color/colorAccent"
            android_layout_marginTop="40dp"
            android_textColor="@android:color/white"/>

</LinearLayout>

</android.support.v7.widget.CardView>
```

#### Download

Here are the resources related to this tutorial.

| No. | Location | Link |
| --- | --- | --- |
| 1. | GitHub | [Direct Download](https://github.com/Oclemy/SQLiteListViewPagination/archive/master.zip) |
| 2. | GitHub | [Browse](https://github.com/Oclemy/SQLiteListViewPagination) |
| 3. | YouTube | [Video Tutorial](https://www.youtube.com/watch?v=raPraKa6O-I) |
| 4. | YouTube | [Our YouTube Channel](https://www.youtube.com/channel/UCpdkWp2zh5Qv1ZWlnqswdCw) |

#### How To Run

- Download the project above.
- You'll get a zipped file,extract it.
- Open the Android Studio.
- Now close, already open project
- From the Menu bar click on **File >New> Import Project**
- Now Choose a Destination Folder, from where you want to import project.
- Choose an Android Project.
- Now Click on “**OK**“.
- Done, your done importing the project,now edit it.

## Example 2: Android SQLite – RecyclerView – Infinite/Endless Pagination,Load More [ServerSide]

_Android SQLite - RecyclerView - Infinite/Endless Pagination,Load More [ServerSide] Tutorial._

How to page/paginate data from SQLite and in RecyclerView using he Load More technique.

In this tutorial we continue looking at the SQlite Pagination. How to page/paginate data endlessly. We use the Load More technique. The user scrolls the RecyclerView,when he reaches the end of the list,we load more data from SQlite database.

We are performing our SQlite pagination at the server side. While loading our data using the endless scroll,we shall be displaying a ProgressBar as the data loads. Our RecyclerView comprises cardviews.

We first insert/save data into SQlite database via a dialog, then select the data and bind to our RecyclerView. We also see how to swipe/pull to refresh our data.

If you pull down.swipe down our recyclerView,we refresh our dataset and take us back to the first page of our data.We are suing the pullLoadView library.Here's what we do in short :

- First Insert/Save data to SQlite database from a dialog with edittexts.
- If the app is run,it tries to select/retrieve the first page of our dataset.
- The first page comprises 5 items each displayed in a cardView.
- We eager load the second page when you are in the first page.
- When you scroll to the second page,we eager load the third page,then fourth when you are in the third page and so on.
- While laoding more data,we show a progress bar at the bottom of our [RecyclerView](https://camposha.info/android/recyclerview).
- SQlite is fast compared to loading of data from a server. We shall load the data in the background thread using handlers.Now we are going to show our progressbar for three seconds even though our SQlite queries of fetching the five items in a page will be much faster than the 3 seconds.The purpose is to teach infinite scroll,so the three seconds shall make our progressbar visible and simulate a real world fetching of data from the server. Take note though that we are fetching data from an actual database in SQLite.
- We are using RushORM for our SQLite database stuff.RushORM is a relational object mapper an shall map our model class into sqlite table without us writing sql statements.Moreover,our queries we shall perform in Java not SQL.

#### Our Gradle Scripts

There are two build.gradle files in our android studio project :

##### (a). Build.Gradle (Project)

This is Our project level build.gradle, here we add the repository url for our RushORM.We fetch it from maven.

```groovy
// Top-level build file where you can add configuration options common to all sub-projects/modules.

buildscript {
    repositories {
        jcenter()
    }
    dependencies {
        classpath 'com.android.tools.build:gradle:2.1.3'

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

##### (b). Build.Gradle (App)

- Here we add some of the dependencies we shallbe using,including third part dependencies.
- RushORM and PullLoadVeiw are third party libraries.
- RushORM is for our SQlite database while PullLoadView enables us implement Pull to Load More in our RecyclerView.

```groovy
dependencies {
    compile fileTree(dir: 'libs', include: ['*.jar'])
    testCompile 'junit:junit:4.12'
    compile 'com.android.support:appcompat-v7:24.2.1'
    compile 'com.android.support:design:24.2.1'
    compile 'com.android.support:cardview-v7:24.2.1'
    compile 'co.uk.rushorm:rushandroid:1.2.0'
    compile 'com.github.tosslife:pullloadview:1.1.0'
}
```

#### Our Layouts

##### (a). ContentMain.xml

- Our Activity's Content Layout.

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
    tools_context="com.tutorials.hp.sqliteinfinitepager.MainActivity"
    tools_showIn="@layout/activity_main">

    <com.srx.widget.PullToLoadView
    android_id="@+id/pullToLoadView"
    android_layout_width="match_parent"
    android_layout_height="match_parent"
    />
</RelativeLayout>
```

##### (b). Model.xml

- Our model layout.
- We inflate this to our RecyclerView viewitems.
- At the root we have a CardView.

```xml
<?xml version="1.0" encoding="utf-8"?>
<android.support.v7.widget.CardView
    android_orientation="horizontal" android_layout_width="match_parent"

    android_layout_margin="10dp"
    card_view_cardCornerRadius="10dp"
    card_view_cardElevation="10dp"
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
            android_layout_alignParentLeft="true"
            />
    </RelativeLayout>
</android.support.v7.widget.CardView>
```

##### (c). DialogLayout.xml

- We are performing SQLite CRUD,so we need an input dialog with edittext and button.

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

    </LinearLayout>

</android.support.v7.widget.CardView>
```

#### Our Classes

We have a total of 5 classes :

##### (a). MainApplication

- Extends our Application class.
- Given its global,we take advantage and initialize our RushORM here.

```java
package com.tutorials.hp.sqliteinfinitepager;

import android.app.Application;

import co.uk.rushorm.android.AndroidInitializeConfig;
import co.uk.rushorm.core.RushCore;

public class MainApplication extends Application {

    @Override
    public void onCreate() {
        super.onCreate();

        //INITIALIZE RUSHCORE CONFIGURATION
        AndroidInitializeConfig config=new AndroidInitializeConfig(getApplicationContext());
        RushCore.initialize(config);
    }
}
```

##### (b). Spaceship

- Is our model class, to represent a spaceship with properties like name.
- We'll map it to RushORM by supplying an empty constructor and deriving from RushObject.

```java
package com.tutorials.hp.sqliteinfinitepager.mData;

import co.uk.rushorm.core.RushObject;

public class Spaceship extends RushObject {
    private String name;

    public Spaceship() {
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }
}
```

##### (c). MyAdapter

- To adapt our dataset to the corresponding views.
- We inflate our Model.xml layout here.
- We also have an inner viewholder class.

```java
package com.tutorials.hp.sqliteinfinitepager.mRecycler;

import android.content.Context;
import android.support.v7.widget.RecyclerView;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.TextView;

import com.tutorials.hp.sqliteinfinitepager.R;
import com.tutorials.hp.sqliteinfinitepager.mData.Spaceship;

import java.util.List;

public class MyAdapter extends RecyclerView.Adapter<MyAdapter.MyHolder> {

    Context c;
    List<Spaceship> spaceships;

    /*
    CONSTRUCTOR
     */
    public MyAdapter(Context c, List<Spaceship> spaceships) {
        this.c = c;
        this.spaceships = spaceships;
    }

    //INITIALIE VH
    @Override
    public MyHolder onCreateViewHolder(ViewGroup parent, int viewType) {
        View v = LayoutInflater.from(parent.getContext()).inflate(R.layout.model, parent, false);
        MyHolder holder = new MyHolder(v);
        return holder;
    }

    //BIND DATA
    @Override
    public void onBindViewHolder(MyHolder holder, int position) {
        holder.nametxt.setText(spaceships.get(position).getName());

    }

    /*
    TOTAL ITEMS
     */
    @Override
    public int getItemCount() {
        return spaceships.size();

    }

    /*
    ADD DATA TO ADAPTER
     */
    public void add(Spaceship s) {
        spaceships.add(s);
        notifyDataSetChanged();
    }

    /*
    CLEAR DATA FROM ADAPTER
     */
    public void clear() {
        spaceships.clear();
        notifyDataSetChanged();
    }

    /*
    VIEW HOLDER CLASS
     */
    class MyHolder extends RecyclerView.ViewHolder {

        TextView nametxt;

        public MyHolder(View itemView) {
            super(itemView);

            this.nametxt = (TextView) itemView.findViewById(R.id.nameTxt);

        }
    }

}
```

##### (d). Paginator

- This class shall page for us our SQLite data.
- This is where we retrieve our SQlite data.We said we are performing server side pagination.
- With RushORM we can use the limit() and offset() methods to set our limit and offset values.
- We then set itour RecyclerView's adapter.

```java
package com.tutorials.hp.sqliteinfinitepager.mData;

import android.content.Context;
import android.os.Handler;
import android.support.v7.widget.LinearLayoutManager;
import android.support.v7.widget.RecyclerView;
import android.widget.Toast;

import com.srx.widget.PullCallback;
import com.srx.widget.PullToLoadView;
import com.tutorials.hp.sqliteinfinitepager.mRecycler.MyAdapter;

import java.util.ArrayList;
import java.util.List;

import co.uk.rushorm.core.RushSearch;

public class Paginator {

    Context c;
    private PullToLoadView pullToLoadView;
    RecyclerView rv;
    private MyAdapter adapter;
    private boolean isLoading = false;
    private boolean hasLoadedAll = false;
    private int nextPage;

    private int ITEMS_PER_PAGE;

   /*
   CONSTRUCTOR
    */
    public Paginator(Context c, PullToLoadView pullToLoadView,RecyclerView rv) {
        this.c = c;
        this.pullToLoadView = pullToLoadView;
        this.rv=rv;

        ITEMS_PER_PAGE=5;

        adapter = new MyAdapter(c, new ArrayList<Spaceship>());
        rv.setAdapter(adapter);

        initializePaginator();
    }

    /*
    PAGE DATA
     */
    public void initializePaginator() {
        pullToLoadView.isLoadMoreEnabled(true);
        pullToLoadView.setPullCallback(new PullCallback() {

            //LOAD MORE DATA
            @Override
            public void onLoadMore() {
                loadData(nextPage);
                Toast.makeText(c, "Load More", Toast.LENGTH_SHORT).show();
            }

            //REFRESH AND TAKE US TO FIRST PAGE
            @Override
            public void onRefresh() {
                adapter.clear();
                hasLoadedAll = false;
                loadData(0);
            }

            //IS LOADING
            @Override
            public boolean isLoading() {
                return isLoading;
            }

            //CURRENT PAGE LOADED
            @Override
            public boolean hasLoadedAllItems() {
                return hasLoadedAll;
            }
        });

        pullToLoadView.initLoad();
    }

    /*
    LOAD DATA.PASS CURRENT PAGE
     */
    public void loadData(final int page) {
        isLoading = true;
        new Handler().postDelayed(new Runnable() {
            @Override
            public void run() {

                //ADD CURRENT PAGE TO OUR ADAPTER
                for(Spaceship spaceship : getCurrentSpacecrafts(page))
                {
                    adapter.add(spaceship);
                }
                //UPDATE PROPETIES
                pullToLoadView.setComplete();
                isLoading = false;
                nextPage = page + 1;
            }

        }, 3000);
    }

    /*
    CURRENT PAGE SPACECRAFTS LIST
     */
    public List<Spaceship> getCurrentSpacecrafts(int currentPage)
    {
        int startItem=currentPage*ITEMS_PER_PAGE;
        List<Spaceship> currentSpacecrafts=new ArrayList<>();
        try
        {
            //PAGE AT SERVER SIDE
            currentSpacecrafts=new RushSearch().limit(ITEMS_PER_PAGE).offset(startItem).find(Spaceship.class);

        }catch (Exception e)
        {
            e.printStackTrace();
        }
        return currentSpacecrafts;
    }

}
```

##### (f). MainActivity

- Our launcher activity.
- We show initialize our dialog here and show it when user clicks the Floating Action Button.
- WE then save to SQlite database with help of RushORM when user clicks the save button from edittext.
- We initialize our PullLoadView here and use it to obtain a RecyclerView.

```java
package com.tutorials.hp.sqliteinfinitepager;

import android.app.Dialog;
import android.os.Bundle;
import android.support.design.widget.FloatingActionButton;
import android.support.design.widget.Snackbar;
import android.support.v7.app.AppCompatActivity;
import android.support.v7.widget.LinearLayoutManager;
import android.support.v7.widget.RecyclerView;
import android.support.v7.widget.Toolbar;
import android.view.View;
import android.view.Menu;
import android.view.MenuItem;
import android.widget.Button;
import android.widget.EditText;

import com.srx.widget.PullToLoadView;
import com.tutorials.hp.sqliteinfinitepager.mData.Paginator;
import com.tutorials.hp.sqliteinfinitepager.mData.Spaceship;
import com.tutorials.hp.sqliteinfinitepager.mRecycler.MyAdapter;

public class MainActivity extends AppCompatActivity {

    EditText nameEditText;
    Button saveBtn;
    RecyclerView rv;
    PullToLoadView pullToLoadView;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);
        Toolbar toolbar = (Toolbar) findViewById(R.id.toolbar);
        setSupportActionBar(toolbar);

        pullToLoadView= (PullToLoadView) findViewById(R.id.pullToLoadView);

        //RECYCLERVIEW
        rv = pullToLoadView.getRecyclerView();
        rv.setLayoutManager(new LinearLayoutManager(this, LinearLayoutManager.VERTICAL, false));

        new Paginator(this,pullToLoadView,rv).initializePaginator();

        FloatingActionButton fab = (FloatingActionButton) findViewById(R.id.fab);
        fab.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View view) {
                displayDialog();
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
        saveBtn= (Button) d.findViewById(R.id.saveBtn);

        saveBtn.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                Spaceship s=new Spaceship();
                save(s);
                nameEditText.setText("");

            }
        });

        d.show();

    }

    /*
    INSERT DATA
     */
    private void save(Spaceship s)
    {
        s.setName(nameEditText.getText().toString());
        s.save();
    }

}
```

#### AndroidManiefst.xml

- Given that we are using RusORM,lets complete our setup.You need to add metadata that RushORM shall use to  know you datavse meta information like database name.
    
- But the most important thing is to make sure you specify the path to your model class by specifying the package name in the Rush_classes_package meta.For instance our model class is Spaceship so we add the package of our spaceship class.e.g
    
- Also regisetr you MainApplication by specifying the name in our `<application>`tag. e. g
    

`android:name=".MainApplication"`.

```xml
<?xml version="1.0" encoding="utf-8"?>
<manifest
    package="com.tutorials.hp.sqliteinfinitepager">

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

        <!--META DATAS FOR OUR DATABASE-->
        <!--THIS FIRST LINE IS COMPULSORY.ADD YOUR DATABASE PACKAGE-->
        <meta-data android_name="Rush_classes_package" android_value="com.tutorials.hp.sqliteinfinitepager.mData" />
        <!-- Updating this will cause a database upgrade -->
        <meta-data android_name="Rush_db_version" android_value="1" />

        <!-- Database name -->
        <meta-data android_name="Rush_db_name" android_value="SpaceshipDB.db" />

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
