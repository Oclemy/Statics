# Android Realm Database Simple CRUD Examples



_Android Realm Tutorial and examples._

In this piece we explore Realm database, looking at it's introduction as well as several examples.


#### What is Realm database?

_It is a relatively new,fast, open source embedded database._

Hence this makes realm an alternative to [SQLite](https://camposha.info/computer-science/sqlite) and Core Data.

It's is one of those file-based databases that is quick rising in alternative. This is especially due to the current explosion in mobile apps and app development.

Realm database supports several platforms like:

1. Android OS
2. iOS
3. Xamarin.
4. React Native
5. Desktop applications etc.

It is licensed under [Apache license](https://en.wikipedia.org/wiki/Apache_License).

Realm was created by Alexander Stigsen together with Bjarne Christiansen under the name **TightDB** in 2010. They formed a company in 2011 in [Y Combinator](https://en.wikipedia.org/wiki/Y_Combinator_(company)).

in 2014, they renamed it to **Realm**. In March 2015, Realm was funded to the tune of about $20 million.

The first version was announced in June 2016.

#### Why Realm Database?

Realm is a [NoSQL](https://en.wikipedia.org/wiki/NoSQL) soultion. This means it does allow data storage and retrieval that is different from the common tabular relations used in SQL databases. Such databases have become popular for their usage in big data and realtime environments.

Realm has configurable durability. It also allows us to share the same groups of data across multiple processes, but also even multiple devices and clusters.

According to their official website, Realm's zero-copy design makes it much faster than an ORM(Object Relational Mapper), and often even faster than raw SQLite.

Let's look at some examples.

## Example 1: Android Realm - GridView - Write,Read,Show

In this tutorial we shall see how to first write data into a Realm database from an edittext.

We show a Material Dialog with EditText and button.User clicks the save button after typing into the edittext and we save the data into Realm database.

Then when the user clicks retrieve button we read data from Real database and fill an arraylist.This arraylist we shall then bind to our GridView.

![Android GridView Realm Project Structure](https://github.com/Oclemy/GridViewRealm/raw/master/demos/Project-Structure.PNG)

First we need to add the Realm dependency in our build.gradle :

```groovy
dependencies {
    compile fileTree(dir: 'libs', include: ['*.jar'])
    testCompile 'junit:junit:4.12'
    compile 'com.android.support:appcompat-v7:23.3.0'
    compile 'com.android.support:design:23.3.0'
    compile 'io.realm:realm-android:0.82.1'
}
```

Once we have our dependency,we shall create our data object class :

```java
package com.tutorials.hp.gridviewrealm.m_Realm;

import io.realm.RealmObject;

public class Spacecraft extends RealmObject{

    private String name;

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }
}
```

Thats our Spacecraft model class with two properties.The next thing is we shall craft a simple RealHelper class to assist us in performing our Real CRUD operations.Saving/Writing to Realm,Reading/Retrieving then filling our arraylist. Here's the RealHelper CRUD class :

```java
package com.tutorials.hp.gridviewrealm.m_Realm;

import java.util.ArrayList;

import io.realm.Realm;
import io.realm.RealmResults;

public class RealmHelper {

    Realm realm;

    public RealmHelper(Realm realm) {
        this.realm = realm;
    }

    //SAVE OR WRITE
    public void save(final Spacecraft spacecraft)
    {
        realm.executeTransaction(new Realm.Transaction() {
            @Override
            public void execute(Realm realm) {

                Spacecraft s=realm.copyToRealm(spacecraft);

            }
        });
    }

    //RETRIEVE OR READ
    public ArrayList<String> retrieve()
    {
        ArrayList<String> spacecraftNames=new ArrayList<>();
        RealmResults<Spacecraft> spacecrafts=realm.where(Spacecraft.class).findAll();

        for(Spacecraft s:spacecrafts)
        {
            spacecraftNames.add(s.getName());
        }

        return spacecraftNames;
    }
}
```

![Android Save To Realm ](https://github.com/Oclemy/GridViewRealm/raw/master/demos/Save-To-Realm.PNG)

Finally we shall have our MainActivity class.The class shall display our input dialog to the user whenever he clicks the FloatingActionButton.He types then we pass the typed data into RealHelper class for it to be inserted to Realm database.We shall also bind our data to GridView via an adapter in this class.

```java
package com.tutorials.hp.gridviewrealm;

import android.app.Dialog;
import android.os.Bundle;
import android.support.design.widget.FloatingActionButton;
import android.support.design.widget.Snackbar;
import android.support.v7.app.AppCompatActivity;
import android.support.v7.widget.Toolbar;
import android.view.View;
import android.view.Menu;
import android.view.MenuItem;
import android.widget.AdapterView;
import android.widget.ArrayAdapter;
import android.widget.Button;
import android.widget.EditText;
import android.widget.GridView;
import android.widget.Toast;

import com.tutorials.hp.gridviewrealm.m_Realm.RealmHelper;
import com.tutorials.hp.gridviewrealm.m_Realm.Spacecraft;

import java.util.ArrayList;

import io.realm.Realm;
import io.realm.RealmConfiguration;

public class MainActivity extends AppCompatActivity {

    Realm realm;
    ArrayList<String> spacecrafts;
    ArrayAdapter adapter;
    GridView gv;
    EditText nameEditText;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);
        Toolbar toolbar = (Toolbar) findViewById(R.id.toolbar);
        setSupportActionBar(toolbar);
        FloatingActionButton fab = (FloatingActionButton) findViewById(R.id.fab);

        gv= (GridView) findViewById(R.id.gv);

        //SETUP REALM
        RealmConfiguration config=new RealmConfiguration.Builder(this).build();
        realm=Realm.getInstance(config);

        //RETRIEVE
        RealmHelper helper=new RealmHelper(realm);
        spacecrafts=helper.retrieve();

        //BIND
        adapter=new ArrayAdapter(this,android.R.layout.simple_list_item_1,spacecrafts);
        gv.setAdapter(adapter);

        //ITEMCLICKS
        gv.setOnItemClickListener(new AdapterView.OnItemClickListener() {
            @Override
            public void onItemClick(AdapterView<?> parent, View view, int position, long id) {
                Toast.makeText(MainActivity.this,spacecrafts.get(position),Toast.LENGTH_SHORT).show();
            }
        });

        fab.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View view) {
                displayInputDialog();
            }
        });
    }

    //DISPLAY INPUT DIALOG
    private void displayInputDialog()
    {
        Dialog d=new Dialog(this);
        d.setTitle("Save to Realm");
        d.setContentView(R.layout.input_dialog);

        nameEditText= (EditText) d.findViewById(R.id.nameEditText);
        Button saveBtn= (Button) d.findViewById(R.id.saveBtn);

        saveBtn.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {

                //GET DATA AND SAVE
                String name=nameEditText.getText().toString();
                Spacecraft s=new Spacecraft();
                s.setName(name);

                RealmHelper helper=new RealmHelper(realm);
                helper.save(s);
                nameEditText.setText("");

                //RERIEVE OR REFRESH
                spacecrafts=helper.retrieve();
                adapter=new ArrayAdapter(MainActivity.this,android.R.layout.simple_list_item_1,spacecrafts);
                gv.setAdapter(adapter);

            }
        });

        d.show();
    }

}
```

![Android GridView Realm database](https://github.com/Oclemy/GridViewRealm/raw/master/demos/GridView-Realm.PNG)

#### Conclusion

Look,we  have seen how to work with Realm data in our android app.First we've seen how to save data to Realm,then retrieve that data on button click,filling an arraylist.Which of course we bind to our GridView to be displayed.The source code is above for download.

Download it,extract and import to your android studio.You can change the Realm version in our dependencies. If you prefer video tutorial and step by step explanation with demo then watch one here : [https://www.youtube.com/watch?v=BrGO9eXsAH8](https://www.youtube.com/watch?v=BrGO9eXsAH8)

#### Download

| No. | Location | Link |
| --- | --- | --- |
| 1. | GitHub | [Direct Download](https://github.com/Oclemy/GridViewRealm/archive/master.zip) |
| 2. | GitHub | [Browse](https://github.com/Oclemy/GridViewRealm) |
| 3. | YouTube | [Video Tutorial](http://www.youtube.com/watch?v=BrGO9eXsAH8) |
| 4. | YouTube | [Our YouTube Channel](https://www.youtube.com/channel/UCpdkWp2zh5Qv1ZWlnqswdCw) |

## Example 2: Android Realm - ListView -Read,Write,Show

In this tutorial,we shall explore how to work with Realm database.The component of choice is ListView of course.Realm is a fast alternative database to SQLite written in C++.We shall use it to store our data locally. in our device.

First we write or save data to Realm from a material edittext.We the retrieve this data and fill to an array list which we in turn bind to a ListView component.

#### Source Code

![Android Realm ListView Project Structure](https://github.com/Oclemy/ListViewRealm/raw/master/demos/Project-Structure.PNG)

First we shall need to add the dependency for our Realm database in our build.gradle.You can check the latest version of Realm and add in your project of course.

```groovy
dependencies {
    compile fileTree(dir: 'libs', include: ['*.jar'])
    testCompile 'junit:junit:4.12'
    compile 'com.android.support:appcompat-v7:23.3.0'
    compile 'com.android.support:design:23.3.0'
    compile 'io.realm:realm-android:0.82.1'
}
```

Then we have our Spacecraft class here.This is our POJO class.We specify the Spacecraft properties.Each property shall correspond to a Column in the database. Of course you can see we derive from RealmObject.This class therefore shall correspond to our Realm database table.

```java
package com.tutorials.hp.listviewrealm.m_Realm;

import io.realm.RealmObject;

public class Spacecraft extends RealmObject {

    private String name;

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }
}
```

We'll need a class to help us in performing our CRUD activities.Lets create the RealHelper class to help us in saving,retrieving data to and from our Realm database.

```java
package com.tutorials.hp.listviewrealm.m_Realm;

import java.util.ArrayList;

import io.realm.Realm;
import io.realm.RealmResults;

public class RealmHelper {

    Realm realm;

    public RealmHelper(Realm realm) {
        this.realm = realm;
    }

    //WRITE
    public void save(final Spacecraft spacecraft)
    {
        realm.executeTransaction(new Realm.Transaction() {
            @Override
            public void execute(Realm realm) {

                Spacecraft s=realm.copyToRealm(spacecraft);

            }
        });
    }

    //READ
    public ArrayList<String> retrieve()
    {
        ArrayList<String> spacecraftNames=new ArrayList<>();
        RealmResults<Spacecraft> spacecrafts= realm.where(Spacecraft.class).findAll();

        for(Spacecraft s:spacecrafts)
        {
            spacecraftNames.add(s.getName());
        }

        return spacecraftNames;
    }
}
```

![Android Save To Realm Database](https://github.com/Oclemy/ListViewRealm/raw/master/demos/Save-To-Realm.PNG) Android Save To Realm Database[/caption]

Finally we have our MainActivity.Here we shall first create and display our Input Dialog with editexts and buttons.The inputted data shall get passed to our RealHelper class to be saved  to database.Moreover we shall bind data to our GridView via an adapter right here.

```java
package com.tutorials.hp.listviewrealm;

import android.app.Dialog;
import android.os.Bundle;
import android.support.design.widget.FloatingActionButton;
import android.support.design.widget.Snackbar;
import android.support.v7.app.AppCompatActivity;
import android.support.v7.widget.Toolbar;
import android.view.View;
import android.view.Menu;
import android.view.MenuItem;
import android.widget.AdapterView;
import android.widget.ArrayAdapter;
import android.widget.Button;
import android.widget.EditText;
import android.widget.ListView;
import android.widget.Space;
import android.widget.Toast;

import com.tutorials.hp.listviewrealm.m_Realm.RealmHelper;
import com.tutorials.hp.listviewrealm.m_Realm.Spacecraft;

import java.util.ArrayList;

import io.realm.Realm;
import io.realm.RealmConfiguration;

public class MainActivity extends AppCompatActivity {

    Realm realm;
    ArrayList<String> spacecrafts;
    ArrayAdapter adapter;
    ListView lv;
    EditText nameeditTxt;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);
        Toolbar toolbar = (Toolbar) findViewById(R.id.toolbar);
        setSupportActionBar(toolbar);
        FloatingActionButton fab = (FloatingActionButton) findViewById(R.id.fab);

        lv= (ListView) findViewById(R.id.lv);

        //SETUP REALM
        RealmConfiguration config=new RealmConfiguration.Builder(this).build();
        realm=Realm.getInstance(config);

        //RETRIEVE
        RealmHelper helper=new RealmHelper(realm);
        spacecrafts=helper.retrieve();

        //BIND
        adapter=new ArrayAdapter(this,android.R.layout.simple_list_item_1,spacecrafts);
        lv.setAdapter(adapter);

        //ITEM CLICKS
        lv.setOnItemClickListener(new AdapterView.OnItemClickListener() {
            @Override
            public void onItemClick(AdapterView<?> parent, View view, int position, long id) {
                Toast.makeText(MainActivity.this,spacecrafts.get(position),Toast.LENGTH_SHORT).show();
            }
        });

        fab.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View view) {
                   displayInputDialog();
            }
        });
    }

    //DISPLAY INPUT DIALOG
    private void displayInputDialog()
    {
        Dialog d=new Dialog(this);
        d.setTitle("Save to Realm");
        d.setContentView(R.layout.input_dialog);

        nameeditTxt= (EditText) d.findViewById(R.id.nameEditText);
        Button saveBtn= (Button) d.findViewById(R.id.saveBtn);

        saveBtn.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {

                //GET DATA
                Spacecraft s=new Spacecraft();
                s.setName(nameeditTxt.getText().toString());

                //SAVE
                RealmHelper helper=new RealmHelper(realm);
                helper.save(s);
                nameeditTxt.setText("");

                //RETRIEVE
                spacecrafts=helper.retrieve();
                adapter=new ArrayAdapter(MainActivity.this,android.R.layout.simple_list_item_1,spacecrafts);
                lv.setAdapter(adapter);

            }
        });

        d.show();
    }
}
```

![Android Realm ListView](https://github.com/Oclemy/ListViewRealm/raw/master/demos/ListView-Realm.PNG)

#### Conclusion

We have seen how to save data,retrieve data from Realm database and bind the data to a ListView.Thats our Realm ListView tutorial.You can find the complete source code to check for stuff like layouts above.

Just download it,extract and import to your android studio. Moreover,the youtube version of this tutorial for more explanations and demo is below.Subscribe over there as we do post videos regularly. [https://www.youtube.com/watch?v=m4MA-Kd_h0E](https://www.youtube.com/watch?v=m4MA-Kd_h0E)

#### Download

| No. | Location | Link |
| --- | --- | --- |
| 1. | GitHub | [Direct Download](https://github.com/Oclemy/ListViewRealm/archive/master.zip) |
| 2. | GitHub | [Browse](https://github.com/Oclemy/ListViewRealm) |
| 3. | YouTube | [Video Tutorial](https://www.youtube.com/watch?v=m4MA-Kd_h0E) |
| 4. | YouTube | [Our YouTube Channel](https://www.youtube.com/channel/UCpdkWp2zh5Qv1ZWlnqswdCw) |

## Example 3: Android Realm - RecyclerView - Save,Retrieve,Show

Today we look at how to work with Realm database alongside a RecyclerView component with CardView.The fisrt thing we do is save/write data to Realm database in our android application.We do this from an edittext.We display to the user a material edittexts inside an input dialog.

He enters the data,clicks save and then we save the data. We also retrieve data from the Realm database and fill an arraylist.This arraylist we then pass t our RecyclerView adapter and bind it as our dataset to the RecyclerView.The RecyclerView consists of CardViews.

#### OverView

- Save Data to Realm database.
- Retrieve data from Realm database
- Bind Realm data to RecyclerView.

![Android realm RecyclerView Project Structure](https://github.com/Oclemy/RecyclerViewRealm/raw/master/demos/Project-Structure.PNG)

#### Source Code

The first thing is to add our Realm dependency via our build.gradle,app level.You may want to make sure you have a later version than I used here .

```groovy
dependencies {
    compile fileTree(dir: 'libs', include: ['*.jar'])
    testCompile 'junit:junit:4.12'
    compile 'com.android.support:appcompat-v7:23.3.0'
    compile 'com.android.support:design:23.3.0'
    compile 'com.android.support:cardview-v7:23.3.0'
    compile 'io.realm:realm-android:0.82.1'
}
```

Then we can define our data object,our model class as below :

```java
package com.tutorials.hp.recyclerviewrealm.m_Realm;

import io.realm.RealmObject;

public class Spacecraft extends RealmObject {

    private String name;

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }
}
```

Now you can see that we derive from RealmObject.This model class shall correspond to our database table.

Lets see our RealmHelper,the class that shall be responsible for all CRUD operations in our project.Here we save to Realm database,retrieve data and fill an arraylist.

```java
package com.tutorials.hp.recyclerviewrealm.m_Realm;

import java.util.ArrayList;

import io.realm.Realm;
import io.realm.RealmResults;

public class RealmHelper {

    Realm realm;

    public RealmHelper(Realm realm) {
        this.realm = realm;
    }

    //WRITE
    public void save(final Spacecraft spacecraft)
    {
        realm.executeTransaction(new Realm.Transaction() {
            @Override
            public void execute(Realm realm) {

                Spacecraft s=realm.copyToRealm(spacecraft);

            }
        });

    }

    //READ
    public ArrayList<String> retrieve()
    {
        ArrayList<String> spacecraftNames=new ArrayList<>();
        RealmResults<Spacecraft> spacecrafts=realm.where(Spacecraft.class).findAll();

        for(Spacecraft s:spacecrafts)
        {
            spacecraftNames.add(s.getName());
        }

        return spacecraftNames;
    }
}
```

![Android Realm save data](https://github.com/Oclemy/RecyclerViewRealm/raw/master/demos/Save-To-Realm.PNG) A

Next we are using a RecyclerView so we need an adapter :

```java
package com.tutorials.hp.recyclerviewrealm.m_UI;

import android.content.Context;
import android.support.v7.widget.RecyclerView;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;

import com.tutorials.hp.recyclerviewrealm.R;

import java.util.ArrayList;

public class MyAdapter extends RecyclerView.Adapter<MyViewHolder> {

    Context c;
    ArrayList<String> spacecrafts;

    public MyAdapter(Context c, ArrayList<String> spacecrafts) {
        this.c = c;
        this.spacecrafts = spacecrafts;
    }

    @Override
    public MyViewHolder onCreateViewHolder(ViewGroup parent, int viewType) {
        View v= LayoutInflater.from(c).inflate(R.layout.model,parent,false);
        return new MyViewHolder(v);
    }

    @Override
    public void onBindViewHolder(MyViewHolder holder, int position) {
        holder.nameTxt.setText(spacecrafts.get(position));

    }

    @Override
    public int getItemCount() {
        return spacecrafts.size();
    }
}
```

The purpose of our Adapter class is to receive a List of data and bind it to our RecyclerView.We have a recyclerView.ViewHolder subclass that you can view in the full source code reference download at the top of this page.

Lets have a look at our MainActivity class.First we are going to show our input dialog that has the edittexts to input data and button to save.

We shall pass the typed data to our RealmHelper class for it to be saved to database. We are also going to bind our data to our RecyclerView via an adapter.

```java
package com.tutorials.hp.recyclerviewrealm;

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

import com.tutorials.hp.recyclerviewrealm.m_Realm.RealmHelper;
import com.tutorials.hp.recyclerviewrealm.m_Realm.Spacecraft;
import com.tutorials.hp.recyclerviewrealm.m_UI.MyAdapter;

import java.util.ArrayList;

import io.realm.Realm;
import io.realm.RealmConfiguration;

public class MainActivity extends AppCompatActivity {

    Realm realm;
    ArrayList<String> spacecrafts;
    MyAdapter adapter;
    RecyclerView rv;
    EditText nameEditTxt;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);
        Toolbar toolbar = (Toolbar) findViewById(R.id.toolbar);
        setSupportActionBar(toolbar);
        FloatingActionButton fab = (FloatingActionButton) findViewById(R.id.fab);

        //SETUP RECYCLERVIEW
        rv= (RecyclerView) findViewById(R.id.rv);
        rv.setLayoutManager(new LinearLayoutManager(this));

        //SETUP REEALM
        RealmConfiguration config=new RealmConfiguration.Builder(this).build();
        realm=Realm.getInstance(config);

        //RETRIEVE
        RealmHelper helper=new RealmHelper(realm);
        spacecrafts=helper.retrieve();

        //BIND
        adapter=new MyAdapter(this,spacecrafts);
        rv.setAdapter(adapter);

        fab.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View view) {

                displayInputDialog();
            }
        });
    }

    //SHOW DIALOG
    private void displayInputDialog()
    {
        Dialog d=new Dialog(this);
        d.setTitle("Save To Realm");
        d.setContentView(R.layout.input_dialog);

        nameEditTxt= (EditText) d.findViewById(R.id.nameEditText);
        Button saveBtn= (Button) d.findViewById(R.id.saveBtn);

        saveBtn.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {

                //GET DATA
                Spacecraft s=new Spacecraft();
                s.setName(nameEditTxt.getText().toString());

                //SAVE
                RealmHelper helper=new RealmHelper(realm);
                helper.save(s);
                nameEditTxt.setText("");

                //REFRESH
                spacecrafts=helper.retrieve();
                adapter=new MyAdapter(MainActivity.this,spacecrafts);
                rv.setAdapter(adapter);

            }
        });

        d.show();
    }
}
```

![Android Realm RecyclerView](https://github.com/Oclemy/RecyclerViewRealm/raw/master/demos/RecyclerView-Realm.PNG)

#### Conclusion

Look we've looked at how to save data to Realm database,read that data and bind to a recyclerView.That's it for today.The full source code can be downloaded above.Download it,extract it and import to your android studio. Cheers.

#### Video

If you prefer more step by step explanations then you can check the video tutorial below.Or watch the demo [here](https://www.youtube.com/watch?v=RrXXHE80jxQ).

#### Download

| No. | Location | Link |
| --- | --- | --- |
| 1. | GitHub | [Direct Download](https://github.com/Oclemy/RecyclerViewRealm/archive/master.zip) |
| 2. | GitHub | [Browse](https://github.com/Oclemy/RecyclerViewRealm) |
| 3. | YouTube | [Video Tutorial](https://www.youtube.com/watch?v=RrXXHE80jxQ) |
| 4. | YouTube | [Our YouTube Channel](https://www.youtube.com/channel/UCpdkWp2zh5Qv1ZWlnqswdCw) |

## 4\. Android Realm CRUD - Spinner - Save,Retrieve,Show

Hello this is a simple realm tutorial to perform basic CRUD.We  first write data to Realm database from a simple dialog with edittext,then read that data and show in a simple spinner. Here's the thing :

- Save/Write data to realm database from a simple edittext on button click.
- Our EditText and Button are hosted in a dialog that gets shown on floating action button is clicked.
- Retrieve.Read data From Realm database filling  a simple arraylist.
- Bind the arraylist in a simple spinner.

_Realm is a fast mobile database that allows us to write database code in pure Java._

This gives us type safety and provides for greater flexibility than writing SQL code.

Type safety allows us easily catch errors at compile time.

This is a realm database tutorial with spinner.

Spinner is an android adapterview that allows us display items in a dropdown manner.

In this tutorial we save data to Realm database, retrieve data and show in a Spinner.

Let's go.

#### 1\. Create Basic Activity Project

1. First create an empty project in android studio. Go to File --> New Project.

#### 3\. Create User Interface

User interfaces are typically created in android using XML layouts as opposed by direct java coding.

This is an example fo declarative programming.

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
    tools_context="com.tutorials.hp.spinnerrealm.MainActivity">

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

This layout gets included in your activity_main.xml. The adapterview we use is a spinner so add spinner in your layout.

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
    tools_context="com.tutorials.hp.spinnerrealm.MainActivity"
    tools_showIn="@layout/activity_main">

    <Spinner
        android_id="@+id/sp"
        android_layout_width="match_parent"
        android_layout_height="wrap_content"
         />
</RelativeLayout>
```

##### (c). input_dialog.xml

This is our input dialog.

This dialog will be shown as our entry form.

Users will enter save data to realm database via this dialog.

It basically comprises edittext and button.

```xml
<?xml version="1.0" encoding="utf-8"?>
<LinearLayout
    android_orientation="vertical" android_layout_width="match_parent"
    android_layout_height="match_parent">

    <LinearLayout
        android_layout_width="fill_parent"
        android_layout_height="match_parent"
        android_layout_marginTop="?attr/actionBarSize"
        android_orientation="vertical"
        android_paddingLeft="15dp"
        android_paddingRight="15dp"
        android_paddingTop="50dp">

        <android.support.design.widget.TextInputLayout
            android_id="@+id/nameLayout"
            android_layout_width="match_parent"
            android_layout_height="wrap_content">

            <EditText
                android_id="@+id/nameEditText"
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
</LinearLayout>
```

#### Java Classes

Let's now come to our Java classes.

##### Our Realm classes

Here are our Realm database classes.

##### (a). Spacecraft.java

This class is both our model class as well as our Realm model class.

This means that Realm will create a table for this class.

For that to happen we have to derive from `RealmObject` class.

```java
package com.tutorials.hp.spinnerrealm.m_Realm;

import io.realm.RealmObject;

public class Spacecraft extends RealmObject {

    private String name;

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }
}
```

##### (b). RealmHelper.java

This is like our CRUD class.

It's here that we actually save data to realm database and retrieve data as well.

```java
package com.tutorials.hp.spinnerrealm.m_Realm;

import java.util.ArrayList;

import io.realm.Realm;
import io.realm.RealmResults;

public class RealmHelper {

    Realm realm;

    public RealmHelper(Realm realm) {
        this.realm = realm;
    }

    //WRITE
    public void save(final Spacecraft spacecraft)
    {
        realm.executeTransaction(new Realm.Transaction() {
            @Override
            public void execute(Realm realm) {

                Spacecraft s=realm.copyToRealm(spacecraft);

            }
        });
    }

    //READ/RETRIEVE
    public ArrayList<String> retrieve()
    {
        ArrayList<String> spacecraftNames=new ArrayList<>();
        RealmResults<Spacecraft> spacecrafts=realm.where(Spacecraft.class).findAll();

        for(Spacecraft s: spacecrafts)
        {
            spacecraftNames.add(s.getName());
        }

        return spacecraftNames;
    }
}
```

##### Our Activity class

##### (a). MainActivity.java

This is our Activity class.

Activity is an android component representing User interface.

Our activity will host a spinner and a dialog that acts as our input form.

```java
package com.tutorials.hp.spinnerrealm;

import android.app.Dialog;
import android.os.Bundle;
import android.support.design.widget.FloatingActionButton;
import android.support.design.widget.Snackbar;
import android.support.v7.app.AppCompatActivity;
import android.support.v7.widget.Toolbar;
import android.view.View;
import android.view.Menu;
import android.view.MenuItem;
import android.widget.AdapterView;
import android.widget.ArrayAdapter;
import android.widget.Button;
import android.widget.EditText;
import android.widget.Spinner;
import android.widget.Toast;

import com.tutorials.hp.spinnerrealm.m_Realm.RealmHelper;
import com.tutorials.hp.spinnerrealm.m_Realm.Spacecraft;

import java.util.ArrayList;

import io.realm.Realm;
import io.realm.RealmConfiguration;

public class MainActivity extends AppCompatActivity {

    Realm realm;
    ArrayList<String> spacecrafts;
    ArrayAdapter adapter;
    Spinner sp;
    EditText nameEdiText;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);
        Toolbar toolbar = (Toolbar) findViewById(R.id.toolbar);
        setSupportActionBar(toolbar);
        FloatingActionButton fab = (FloatingActionButton) findViewById(R.id.fab);

        sp= (Spinner) findViewById(R.id.sp);

        //REALM CONFIGURATION
        RealmConfiguration config=new RealmConfiguration.Builder(this).build();
        realm=Realm.getInstance(config);

        //retrieve
        RealmHelper helper=new RealmHelper(realm);
        spacecrafts=helper.retrieve();

        adapter=new ArrayAdapter(this,android.R.layout.simple_list_item_1,spacecrafts);
        sp.setAdapter(adapter);

        //ONCLICK
        sp.setOnItemSelectedListener(new AdapterView.OnItemSelectedListener() {
            @Override
            public void onItemSelected(AdapterView<?> parent, View view, int position, long id) {
                Toast.makeText(MainActivity.this,spacecrafts.get(position),Toast.LENGTH_SHORT).show();
            }

            @Override
            public void onNothingSelected(AdapterView<?> parent) {

            }
        });

        fab.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View view) {
                 displayInputDialog();
            }
        });
    }

    private void displayInputDialog()

    {
        Dialog d=new Dialog(this);
        d.setTitle("save To Realm");
        d.setContentView(R.layout.input_dialog);

        nameEdiText= (EditText) d.findViewById(R.id.nameEditText);
        Button saveBtn= (Button) d.findViewById(R.id.saveBtn);

        saveBtn.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {

                Spacecraft s=new Spacecraft();
                s.setName(nameEdiText.getText().toString());

                //save
                RealmHelper helper=new RealmHelper(realm);
                helper.save(s);

                nameEdiText.setText("");
                //RETRIEVE
                spacecrafts=helper.retrieve();
                adapter=new ArrayAdapter(MainActivity.this,android.R.layout.simple_list_item_1,spacecrafts);

                sp.setAdapter(adapter);

            }
        });

        d.show();

    }

}
```

#### Download

| No. | Location | Link |
| --- | --- | --- |
| 1. | GitHub | [Direct Download](https://github.com/Oclemy/SpinnerRealm/archive/master.zip)) |
| 2. | GitHub | [Browse](https://github.com/Oclemy/SpinnerRealm) |
| 3. | YouTube | [Video Tutorial](https://www.youtube.com/watch?v=Mi8vWpKQ5EY) |
| 4. | YouTube | [Our YouTube Channel](https://www.youtube.com/channel/UCpdkWp2zh5Qv1ZWlnqswdCw) |
