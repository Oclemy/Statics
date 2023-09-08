# Android Firebase Realtime Database with RecyclerView

_Android Firebase Realtime Database with RecyclerView Tutorial_

In this piece we want to look at several RecyclerView and Firebase Realtime database examples. Basically how to perform several CRUD operations like adding, retrieving and showing in recyclerview.


#### What Is Firebase Realtime Database?

Firebase Realtime Database is one of the services provided Firebase Platform which is owned by Google.

Basically it's what we call a Database BAAS, or a Database Backend As A Service. It's hosted in the Cloud.

#### Why Firebase Realtime Database?

It differs from many databases you may already know in the many ways. These ways are what gives Firebase Realtime Database it's advantages.

1. It's hosted in the Cloud while the others like [SQLite](https://camposha.info/android/sqlite) and Realm are hosted locally. This makes Firebase Realtime Database to be accessible to many apps. Databases like SQLite and Realm are localised within a single app. Firebase Realtime Database is accessible to many applications.
2. It is Realtime. This is the biggest difference. That means you save data and automatically the data in all connected apps get updated instantly. This makes it quite applicable to many types of apps like chat and messaging apps, apps that require instant synchronization.
3. It stores data in json format unlike tables in sqlite. This makes Firebase Realtime Database quite scalable.
4. It has both Free and Paid plans. This is the best case scenarion since then you can use it for both learning and commercial purposes.

#### What is RecyclerView

RecyclerView is an android adapterview that allows us render large data sets efficiently. Normally to render lists data in android you need an adapterview and an adapter. The adapterview is the list widget and examples include [ListView](https://camposha.info/android/listview), Gridview, Spinner and of course RecyclerView.

Then the adapter is normally responsible for connecting the adapterview to the data source. And in fact you normally can use custom layouts to present a single list item. That layout is also inflated inside the adapter.

Read more [about the RecyclerView here](https://camposha.info/android/recyclerview).

#### Why RecyclerView?

Well we've said several adapterviews can be used for data presentation in android. There is ListView, GridView, Spinner etc. ListView used to be the most popular until the introduction of RecyclerView.

These days recyclerview is the most commonly used adapterview due to it's flexibility and performance. RecyclerView can be used to build almost any type of view, from a list view, to a grid/staggered view, to a table view, to a calender etc.

This fact it makes it quite special and usable in many scenarios. Yet even it's not much more difficult than the other adapterviews.

#### Tools Used

This example was written with the following tools:

- Microsoft Windows 8.1 - This is my operating system.
- Android Studio - This is my IDE(Integerated Develpment Kit) by Jetbrains and Google.
- Genymotion Emulator - This we use to test our appilcations.
- Language : Java - Java is the most popular programming language.

### 1\. Android Firebase => Simple RecyclerView - Save,Retrieve then Show

[center]_Android Firebase Realtime Database recyclerView Tutorial_[/center]

This is an android firebase RecyclerView tutorial. How to save data to firebase,retrieve then show that data in a simple Recyclerview. We just use a single fields of data.

#### General Concepts You Learn From this Example.

Here are some of the concepts you can learn from this tutorial:

- What is Firebase and What is [RecyclerView](https://camposha.info/android/recyclerview) and Why use them.
- How to Save data from edittext to google Firebase Realtime Database.
- How to Get or Retriev or Read Data From Firebase Database by attaching events to a `DatabaseReference` instance and then populating a java arraylist
- How to Bind the data retrieved to an instance of `RecyclerView.Adapter` subclass.
- How to create and operate on database in Firebase.
- Firebase example apps with recyclerview.
- Firebase Database Synchronization

#### Specific Concepts You will Learn

- How to use Firebase Database Reference.
- How to add child to Firebase Database Reference

#### Demo

Here's the project demo for this tutorial:

#### Setup and Configuration

##### (a). Create Basic Activity Project

1. First create a new project in android studio.

##### (b). Create Firebase and Download Configuration File

Head over to Firebase Console, create a Firebase App, Register your app id and download the `google-services.json` file. Add it to your app folder.

##### (c). Specify Maven repository URL

Head over to project level(project folder) `build.gradle` and

1. Add Google services classpath as below
2. Add maven repository url

```groovy
// Top-level build file where you can add configuration options common to all sub-projects/modules.

buildscript {
    repositories {
        jcenter()
    }
    dependencies {
        classpath 'com.android.tools.build:gradle:2.3.3'
        classpath 'com.google.gms:google-services:3.1.0'

        // NOTE: Do not place your application dependencies here; they belong
        // in the individual module build.gradle files
    }
}

allprojects {
    repositories {
        jcenter()
        maven {
            url "https://maven.google.com" // Google's Maven repository
        }
    }
}

task clean(type: Delete) {
    delete rootProject.buildDir
}
```

This will allow us to fetch our Firebase from `maven.google com`. Firebase is a third party library and has to be downloaded for us to use it in our project.

##### (d). Add Firebase Dependencies

Add them in you app level(app folder) build.gradle we need to add several dependencies. We have added support libraries like `appcompat`, `design` and `cardview`. AppCompat will give us AppCompatActivity, the class from which our `MainActivity` will be deriving. We add them using the `implementation` statement.

The `design` support will give us the recyclerveiew which is our list widget. It's what we will be populating with data we query from our Firebase. The `cardview` on the other hand will allow us work with cardviews as our item views. The recyclerview shall comprise cardviews.

Then the we've added the Firebase Core as well as Firebase Database. Firebase remember is a platform while the Firebase Database is the database we store our data. You may use later versions. However don't forget to apply the google services as we've done.

```groovy
dependencies {
    compile fileTree(dir: 'libs', include: ['*.jar'])

    testImplementation 'junit:junit:4.12'
    implementation 'com.android.support:appcompat-v7:23.3.0'
    implementation 'com.android.support:design:23.3.0'
    implementation 'com.android.support:cardview-v7:23.3.0'

    implementation 'com.google.firebase:firebase-core:11.8.0'
    implementation 'com.google.firebase:firebase-database:11.8.0'
}
apply plugin: 'com.google.gms.google-services'
```

Make sure you `apply plugin: 'com.google.gms.google-services'` as above.

#### 2\. Our Java Code

We write this example using Java Programming Language. So we'll decouple various parts of our app into several classes.

##### (a). Our Model Class

- Is our Data Object class
- Must Have an empty constructor.
- You can create,pass data to and use other constructors

As model or data objexct class basically represents a class that will model our data. When you are working with any form of data, it's always a good idea to represent the data in a concrete simple class. The object of that class can then be queried around as needed. Normally these types of classes have what we call accessor methods. Those methods are always public hence providing a way to expose the properties of the class, which are always private.

In our case we've created a class called `Spacecraft`. That class, will have a single property, just a name to hold the name for that spacecraft. Then we provide our class with a public default constructor. This is a feature normally needed by database engines that rely on reading the data object to automatically generate the database schema. Firebase Database definitely does that just as Realm, a local database for java and android.

Then we provide our class with a `getName` and `setName` accessor methods.

```java
package com.tutorials.hp.firebasesimplerecyclerview.m_Model;

public class Spacecraft {

    String name;

    //EMPTY CONSTR
    public Spacecraft() {
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }
}
```

##### (b). Our FirebaseHelper Class

- Basically,our CRUD class.
- Here we perform reads and writes to Firebase database.
- To persist data we use setValue().
- Prior to calling setValue() method,we call push() to ensure we append data to database,not replace.
- We fill a simple arraylist.

We have created this class, `FirebaseHelper` class to to allow us save as well as query or read data from Firebase. We start by defining the package to host our class. Then add our imports including several classes from `com.google.firebase.database`.

We have defined several instance fields including:

1. DatabaseReference -- Our database reference.
2. Boolean value - to determine if we've successfully saved or not.
3. ArrayList - To hold our data fetched from Firebase.

We start by receiving a Database Reference via the constructor. We then assign the database reference to the local instance field we had maintained.

**Saving Data To FirebaseDatabase**

We then define a method to save data to Firebase Database. That method will receive a Spacecraft object as a parameter. Given we are receiving the `Spacecraft` object from the outside world, it woudld be ideal to first check it out for null.

To save data to Firebase

```java
    db.child("Spacecraft").push().setValue(spacecraft);
```

In that case `db` is our `DatabaseReference`. We obtain it's child node via the `child()` method. Then pass the name of our "table". Then we use the `push()` method to push data to Firebase. However we have to set the value that we are pushing. We use the `setValue` method to set our `spacecraft` object. And that's how we save data to our Firebase Database. Note that we have used a try catch block to catch a `DatabaseException`.

**Retrieving Data From Firebase Database**

We will receive data from Firebase Realtime Database and populate an ArrayList. Then later that ArrayList will used as the data source for our recyclerview adapter.

To read data from firebase, we need to attach a `ChildEventListener` to our database reference. That will then listen to changes in the data nodes. For example when a child node is added, modified, removed, or cancelled, we get callback methods containing our data snapshot. We can then read data from those data snapshots.

Then from each iteration you can invoke the `getValue` method of the data snapshot child to obtain the object. Reading data from a DataSnapshot object is easy. You simply loop through it's children:

```java
 for (DataSnapshot ds : dataSnapshot.getChildren())
        {
            String name=ds.getValue(Spacecraft.class).getName();
            spacecrafts.add(name);
        }
```

Here's the full code:

```java
package com.tutorials.hp.firebasesimplerecyclerview.m_FireBase;

import com.google.firebase.database.ChildEventListener;
import com.google.firebase.database.DataSnapshot;
import com.google.firebase.database.DatabaseError;
import com.google.firebase.database.DatabaseException;
import com.google.firebase.database.DatabaseReference;
import com.tutorials.hp.firebasesimplerecyclerview.m_Model.Spacecraft;

import java.util.ArrayList;

public class FirebaseHelper {

    DatabaseReference db;
    Boolean saved=null;
    ArrayList<String> spacecrafts=new ArrayList<>();

    public FirebaseHelper(DatabaseReference db) {
        this.db = db;
    }

    //SAVE
    public Boolean save(Spacecraft spacecraft)
    {
        if(spacecraft==null)
        {
            saved=false;
        }else {

            try
            {
                db.child("Spacecraft").push().setValue(spacecraft);
                saved=true;
            }catch (DatabaseException e)
            {
                e.printStackTrace();
                saved=false;
            }

        }

        return saved;
    }

    //READ
    public ArrayList<String> retrieve()
    {
        db.addChildEventListener(new ChildEventListener() {
            @Override
            public void onChildAdded(DataSnapshot dataSnapshot, String s) {
                fetchData(dataSnapshot);
            }

            @Override
            public void onChildChanged(DataSnapshot dataSnapshot, String s) {
                fetchData(dataSnapshot);

            }

            @Override
            public void onChildRemoved(DataSnapshot dataSnapshot) {

            }

            @Override
            public void onChildMoved(DataSnapshot dataSnapshot, String s) {

            }

            @Override
            public void onCancelled(DatabaseError databaseError) {

            }
        });

        return spacecrafts;
    }

    private void fetchData(DataSnapshot dataSnapshot)
    {
        spacecrafts.clear();
        for (DataSnapshot ds : dataSnapshot.getChildren())
        {
            String name=ds.getValue(Spacecraft.class).getName();
            spacecrafts.add(name);
        }
    }

}
```

##### (c). Our MyViewHolder class

- Yes,its our viewholder class.
- Holds views for use ready for recycling

```java
package com.tutorials.hp.firebasesimplerecyclerview.m_UI;

import android.support.v7.widget.RecyclerView;
import android.view.View;
import android.widget.TextView;

import com.tutorials.hp.firebasesimplerecyclerview.R;

public class MyViewHolder extends RecyclerView.ViewHolder  {

    TextView nameTxt;

    public MyViewHolder(View itemView) {
        super(itemView);

        nameTxt=(TextView) itemView.findViewById(R.id.nameTxt);
    }
}
```

That `MyViewHolder` is our ViewHolder class. These always needed for the sake of recycling of views by the recyclerview. However to turn a class into a recyclerview viewholder we have to derive from `Recyclerview.ViewHolder` class as you've seen above. We had started by imprortng several classes including the `RecyclerView` itself.

In our class we've maintained a TextView called `nameTxt`. Then our `MyViewHolder` contstructorhas taken a View object. That View object has then been passed over to the super class which is the `Recyclerview.ViewHolder`.

Then we've referenced the `nameTxt` from its layout specification.

##### 9\. Our MyAdapter class

- Responsible for Layout Inflation.
- Also for data binding to views.

```java
package com.tutorials.hp.firebasesimplerecyclerview.m_UI;

import android.content.Context;
import android.support.v7.widget.RecyclerView;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;

import com.tutorials.hp.firebasesimplerecyclerview.R;

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
        View v=LayoutInflater.from(c).inflate(R.layout.model,parent,false);
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

Adapters are important in the way android works with collection of data. Mobile devices be it HTC, Samsung, F7, Apple iOS, Infinix etc, all of them all heavily apps that need to render lists of data. That is just by nature of mobile devices. The screen is always tiny and therefore it's appropriate to display items that can be scrolled.

And RecyclerView is the number one adapterview for displaying large data sets. These data sets may come from the cloud like Firebase. And in fact our data in this case is coming from Firebase Realtime database. So we've populated an ArrayList so far with the data we have already collected. Now it's time to bind that data. However that needs an Adapter.

Adapters:

1. Allow us Bind data to our adapterviews.
2. Help us in inflating custom layouts into views so that we design custom adapterviews.

You make a recyclerview adapter by deriving from `RecyclerView.Adapter<MyViewHolder>`. The generic parameter is the ViewHolder. Deriving from that class will force us to override three methods:

1. `getItemCount` - To return the number of items to be rendered in the recyclerview.
2. `onCreateViewHolder` - This is where the inflation occurs. We useLayoutInflater for the inflation.
3. `onBindViewHolder` - This is where we bind data to the widgets we defined in the ViewHolder class.

Meanwhile our constructor has taken a Context object as well as the arraylist of our data.

##### (d). Our MainActivity

- Launcher activity.
- Reference RecyclerView and sets its layoutManager as well as its adapter.
- Shows Input Dialog on FAB button click.
- Sets up our Firebase's by initializeing the DatabaseReference.

```java
package com.tutorials.hp.firebasesimplerecyclerview;

import android.app.Dialog;
import android.os.Bundle;
import android.support.design.widget.FloatingActionButton;
import android.support.v7.app.AppCompatActivity;
import android.support.v7.widget.LinearLayoutManager;
import android.support.v7.widget.RecyclerView;
import android.support.v7.widget.Toolbar;
import android.view.View;
import android.widget.Button;
import android.widget.EditText;
import android.widget.Toast;

import com.google.firebase.database.DatabaseReference;
import com.google.firebase.database.FirebaseDatabase;
import com.tutorials.hp.firebasesimplerecyclerview.m_FireBase.FirebaseHelper;
import com.tutorials.hp.firebasesimplerecyclerview.m_Model.Spacecraft;
import com.tutorials.hp.firebasesimplerecyclerview.m_UI.MyAdapter;

public class MainActivity extends AppCompatActivity {

    DatabaseReference db;
    FirebaseHelper helper;
    RecyclerView rv;
    EditText nameEditTxt;
    MyAdapter adapter;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);
        Toolbar toolbar = (Toolbar) findViewById(R.id.toolbar);
        setSupportActionBar(toolbar);

        //SETUP RV
        rv= (RecyclerView) findViewById(R.id.rv);
        rv.setLayoutManager(new LinearLayoutManager(this));

        //SETUP FB
        db=FirebaseDatabase.getInstance().getReference();
        helper=new FirebaseHelper(db);

        //ADAPTER
        adapter=new MyAdapter(this,helper.retrieve());
        rv.setAdapter(adapter);

        FloatingActionButton fab = (FloatingActionButton) findViewById(R.id.fab);
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
        d.setTitle("Save To Firebase");
        d.setContentView(R.layout.input_dialog);

        nameEditTxt= (EditText) d.findViewById(R.id.nameEditText);
        Button saveBtn= (Button) d.findViewById(R.id.saveBtn);

        //SAVE
        saveBtn.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {

                //GET DATA
                String name=nameEditTxt.getText().toString();

                //SET DATA
                Spacecraft s=new Spacecraft();
                s.setName(name);

                //VALIDATE
                if(name.length()>0 && name != null)
                {
                    if(helper.save(s))
                    {
                        nameEditTxt.setText("");
                         adapter=new MyAdapter(MainActivity.this,helper.retrieve());
                        rv.setAdapter(adapter);
                    }
                }else
                {
                    Toast.makeText(MainActivity.this, "Name Cannot Be Empty", Toast.LENGTH_SHORT).show();
                }
            }
        });

        d.show();
    }

}
```

#### 11\. Our Layouts

##### (a). activity_main.xml

This is our main [activity](https://camposha.info/android/activity) layout.

```xml
<?xml version="1.0" encoding="utf-8"?>
<android.support.design.widget.CoordinatorLayout

    android_layout_width="match_parent"
    android_layout_height="match_parent"
    android_fitsSystemWindows="true"
    tools_context="com.tutorials.hp.firebasesimplerecyclerview.MainActivity">

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

This is where we add our adapterview in this case a recyclerview.

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
    tools_context="com.tutorials.hp.firebasesimplerecyclerview.MainActivity"
    tools_showIn="@layout/activity_main">

    <android.support.v7.widget.RecyclerView
        android_id="@+id/rv"
        android_layout_width="match_parent"
        android_layout_height="wrap_content"
         />
</RelativeLayout>
```

##### (c). input_dialog.xml

- defines our input dialogs layout

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
        android_paddingTop="10dp">

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
            android_layout_marginTop="10dp"
            android_textColor="@android:color/white"/>

    </LinearLayout>

</LinearLayout>
```

##### (d). model.xml

This is our RecyclerView row model. This layout will be inflated in adapter class.

```xml
<?xml version="1.0" encoding="utf-8"?>
<android.support.v7.widget.CardView
    android_orientation="horizontal" android_layout_width="match_parent"

    android_layout_margin="10dp"
    card_view_cardCornerRadius="5dp"
    card_view_cardElevation="5dp"
    android_layout_height="200dp">

        <LinearLayout
            android_orientation="vertical"
            android_layout_width="match_parent"
            android_layout_height="match_parent">

            <TextView
                android_layout_width="match_parent"
                android_layout_height="wrap_content"
                android_textAppearance="?android:attr/textAppearanceLarge"
                android_text="Name"
                android_id="@+id/nameTxt"
                android_padding="10dp"
                android_textColor="@color/colorAccent"
                android_textStyle="bold"
                android_layout_alignParentLeft="true"
                />

    </LinearLayout>

</android.support.v7.widget.CardView>
```

##### 12\. AndroidManifest.xml

- Remember to add permission for internet in your manifest file.

`<uses-permission android_name="android.permission.INTERNET"/>`

##### Download

| Resource | Link |
| --- | --- |
| GitHub Browse | [Browse](https://github.com/Oclemy/Firebase-Simple-RecyclerView) |
| GitHub Download Link | [Download](https://github.com/Oclemy/Firebase-Simple-RecyclerView/archive/master.zip) |

### 2\. Android Firebase - RecyclerView Multiple Fields

_Android Firebase Database RecyclerView Tutorial_ This is an android firebase database RecyclerView tutorial. How to save data to firebase,retrieve then show that data in a custom RecyclerView.

This time around we use multiple fields as opposed to single field like we did in the previous example.

### 1\. Setting Up

##### (a). Create Basic Activity Project

1. First create a new project in android studio. Go to File --> New Project.

##### (b).Create Firebase and Download Configuration File

Head over to Firebase Console, create a Firebase App, Register your app id and download the `google-services.json` file. Add it to your app folder.

##### (c). Specify Maven repository URL

Head over to project level(project folder) `build.gradle` and

1. Add Google services classpath as below
2. Add maven repository url

```groovy
// Top-level build file where you can add configuration options common to all sub-projects/modules.

buildscript {
    repositories {
        jcenter()
    }
    dependencies {
        classpath 'com.android.tools.build:gradle:2.3.3'
        classpath 'com.google.gms:google-services:3.1.0'

        // NOTE: Do not place your application dependencies here; they belong
        // in the individual module build.gradle files
    }
}

allprojects {
    repositories {
        jcenter()
        maven {
            url "https://maven.google.com" // Google's Maven repository
        }
    }
}

task clean(type: Delete) {
    delete rootProject.buildDir
}
```

##### (d). Add Firebase Dependencies

Add them in you app level(app folder) `build.gradle`, then

```groovy
dependencies {
    compile fileTree(dir: 'libs', include: ['*.jar'])

    testCompile 'junit:junit:4.12'
    compile 'com.android.support:appcompat-v7:23.3.0'
    compile 'com.android.support:design:23.3.0'
    compile 'com.android.support:cardview-v7:23.3.0'

    compile 'com.google.firebase:firebase-core:11.8.0'
    compile 'com.google.firebase:firebase-database:11.8.0'
}
apply plugin: 'com.google.gms.google-services'
```

Make sure you `apply plugin: 'com.google.gms.google-services'` as above.

##### (e). AndroidManifest

- Remember to add permission for internet in your manifest file.

```xml
<?xml version="1.0" encoding="utf-8"?>
<manifest
    package="com.tutorials.hp.firebaserecyclermulti_items">

    <uses-permission android_name="android.permission.INTERNET"/>
    ....
</manifest>
```

#### 2\. Classes

##### (a). Our Model Class

- Is our Data Object class
- Must Have an empty constructor.
- You can create,pass data to and use other constructors

```java
package com.tutorials.hp.firebaserecyclermulti_items.m_Model;

/*
 * 1. OUR MODEL CLASS
 */
public class Spacecraft {
    String name,propellant,description;

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

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }
}
```

##### (b). Our FirebaseHelper Class

- Basically,our CRUD class.
- Here we perform reads and writes to Firebase database.
- To persist data we use setValue().
- Prior to calling setValue() method,we call push() to ensure we append data to database,not replace.
- We fill an arraylist with model objects.

```java
package com.tutorials.hp.firebaserecyclermulti_items.m_FireBase;

import com.google.firebase.database.ChildEventListener;
import com.google.firebase.database.DataSnapshot;
import com.google.firebase.database.DatabaseError;
import com.google.firebase.database.DatabaseException;
import com.google.firebase.database.DatabaseReference;
import com.tutorials.hp.firebaserecyclermulti_items.m_Model.Spacecraft;

import java.util.ArrayList;

/*
 * 1. RECEIVE DB REFERENCE
 * 2. SAVE
 * 3. RETRIEVE
 * 4. RETURN ARRAYLIST
 */
public class FirebaseHelper {
    DatabaseReference db;
    Boolean saved=null;
    ArrayList<Spacecraft> spacecrafts=new ArrayList<>();

    /*
     PASS DATABASE REFRENCE
     */
    public FirebaseHelper(DatabaseReference db) {
        this.db = db;
    }

    //WRITE IF NOT NULL
    public Boolean save(Spacecraft spacecraft)
    {
        if(spacecraft==null)
        {
            saved=false;

        }else
        {
            try
            {
                db.child("Spacecraft").push().setValue(spacecraft);
                saved=true;

            }catch (DatabaseException e)
            {
                e.printStackTrace();
                saved=false;
            }
        }

        return saved;
    }

    //IMPLEMENT FETCH DATA AND FILL ARRAYLIST
    private void fetchData(DataSnapshot dataSnapshot)
    {
        spacecrafts.clear();

        for (DataSnapshot ds : dataSnapshot.getChildren())
        {
            Spacecraft spacecraft=ds.getValue(Spacecraft.class);
            spacecrafts.add(spacecraft);
        }
    }

    //READ BY HOOKING ONTO DATABASE OPERATION CALLBACKS
    public ArrayList<Spacecraft> retrieve()
    {
        db.addChildEventListener(new ChildEventListener() {
            @Override
            public void onChildAdded(DataSnapshot dataSnapshot, String s) {
                fetchData(dataSnapshot);
            }

            @Override
            public void onChildChanged(DataSnapshot dataSnapshot, String s) {
                fetchData(dataSnapshot);

            }

            @Override
            public void onChildRemoved(DataSnapshot dataSnapshot) {

            }

            @Override
            public void onChildMoved(DataSnapshot dataSnapshot, String s) {

            }

            @Override
            public void onCancelled(DatabaseError databaseError) {

            }
        });

        return spacecrafts;
    }

}
```

##### (c). Our ViewHolder class

- Holds the views for us to recycle.
- Subclasses RecyclerView.ViewHolder

```java
package com.tutorials.hp.firebaserecyclermulti_items.m_UI;

import android.support.v7.widget.RecyclerView;
import android.view.View;
import android.widget.TextView;
import com.tutorials.hp.firebaserecyclermulti_items.R;

/*
 * 1. HOLD VIEWS
 */
public class MyViewHolder extends RecyclerView.ViewHolder {

    TextView nameTxt,propTxt,descTxt;

    public MyViewHolder(View itemView) {
        super(itemView);

        nameTxt=(TextView) itemView.findViewById(R.id.nameTxt);
        propTxt=(TextView) itemView.findViewById(R.id.propellantTxt);
        descTxt=(TextView) itemView.findViewById(R.id.descTxt);
    }
}
```

#### 9\. Our MyAdapter class

- Responsible for Layout Inflation.
- Also for data binding to views.
- This class subclasses RecyclerView.Adapter

```java
package com.tutorials.hp.firebaserecyclermulti_items.m_UI;

import android.content.Context;
import android.support.v7.widget.RecyclerView;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;

import com.tutorials.hp.firebaserecyclermulti_items.R;
import com.tutorials.hp.firebaserecyclermulti_items.m_Model.Spacecraft;

import java.util.ArrayList;

/
 * 1. LAYOUT INFLATION
 * 2. RECEIVE SPACECRAFTS
 * 3. PERFORM BINDING
 */
public class MyAdapter extends RecyclerView.Adapter<MyViewHolder> {
    Context c;
    ArrayList<Spacecraft> spacecrafts;

    public MyAdapter(Context c, ArrayList<Spacecraft> spacecrafts) {
        this.c = c;
        this.spacecrafts = spacecrafts;
    }

    @Override
    public MyViewHolder onCreateViewHolder(ViewGroup parent, int viewType) {
        View v=LayoutInflater.from(c).inflate(R.layout.model,parent,false);
        return new MyViewHolder(v);
    }

    @Override
    public void onBindViewHolder(MyViewHolder holder, int position) {
        holder.nameTxt.setText(spacecrafts.get(position).getName());
        holder.propTxt.setText(spacecrafts.get(position).getPropellant());
        holder.descTxt.setText(spacecrafts.get(position).getDescription());

    }

    @Override
    public int getItemCount() {
        return spacecrafts.size();
    }
}
```

##### (d). Our MainActivity

- Launcher activity.
- Reference RecyclerView and set its LayoutManager
- Set its adapter.
- Shows Input Dialog on FAB button click.
- Sets up our Firebase's by initializing the DatabaseReference.

```java
package com.tutorials.hp.firebaserecyclermulti_items;

import android.app.Dialog;
import android.os.Bundle;
import android.support.design.widget.FloatingActionButton;
import android.support.v7.app.AppCompatActivity;
import android.support.v7.widget.LinearLayoutManager;
import android.support.v7.widget.RecyclerView;
import android.support.v7.widget.Toolbar;
import android.view.View;
import android.widget.Button;
import android.widget.EditText;
import android.widget.Toast;

import com.google.firebase.database.DatabaseReference;
import com.google.firebase.database.FirebaseDatabase;
import com.tutorials.hp.firebaserecyclermulti_items.m_FireBase.FirebaseHelper;
import com.tutorials.hp.firebaserecyclermulti_items.m_Model.Spacecraft;
import com.tutorials.hp.firebaserecyclermulti_items.m_UI.MyAdapter;
/*
1.INITIALIZE FIREBASE DB
2.INITIALIZE UI
3.DATA*/
public class MainActivity extends AppCompatActivity {

    DatabaseReference db;
    FirebaseHelper helper;
    MyAdapter adapter;
    RecyclerView rv;
    EditText nameEditTxt,propTxt,descTxt;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);
        Toolbar toolbar = (Toolbar) findViewById(R.id.toolbar);
        setSupportActionBar(toolbar);

        //INITIALIZE RV
        rv= (RecyclerView) findViewById(R.id.rv);
        rv.setLayoutManager(new LinearLayoutManager(this));

        //INITIALIZE FB
        db= FirebaseDatabase.getInstance().getReference();

        helper=new FirebaseHelper(db);

        //ADAPTER
        adapter=new MyAdapter(this,helper.retrieve());
        rv.setAdapter(adapter);

        FloatingActionButton fab = (FloatingActionButton) findViewById(R.id.fab);
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
        //CREATE DIALOG
        Dialog d=new Dialog(this);
        d.setTitle("Save To Firebase");
        d.setContentView(R.layout.input_dialog);

        nameEditTxt= (EditText) d.findViewById(R.id.nameEditText);
        propTxt= (EditText) d.findViewById(R.id.propellantEditText);
        descTxt= (EditText) d.findViewById(R.id.descEditText);
        Button saveBtn= (Button) d.findViewById(R.id.saveBtn);

        //SAVE
        saveBtn.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {

                //GET DATA
                String name=nameEditTxt.getText().toString();
                String propellant=propTxt.getText().toString();
                String desc=descTxt.getText().toString();

                //SET DATA
                Spacecraft s=new Spacecraft();
                s.setName(name);
                s.setPropellant(propellant);
                s.setDescription(desc);

                //SAVE
                if(name != null && name.length()>0)
                {
                    if(helper.save(s))
                    {
                        nameEditTxt.setText("");
                        propTxt.setText("");
                        descTxt.setText("");

                        adapter=new MyAdapter(MainActivity.this,helper.retrieve());
                        rv.setAdapter(adapter);
                    }
                }else
                {
                    Toast.makeText(MainActivity.this, "Name Must Not Be Empty", Toast.LENGTH_SHORT).show();
                }

            }
        });

        d.show();
    }
}
```

#### 3\. Our Layouts

##### (a). InputDialog.xml

- defines our input dialogs layout

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

        <android.support.design.widget.TextInputLayout
            android_id="@+id/propLayout"
            android_layout_width="match_parent"
            android_layout_height="wrap_content">

            <EditText
                android_id="@+id/propellantEditText"
                android_layout_width="match_parent"
                android_layout_height="wrap_content"
                android_singleLine="true"
                android_hint= "Propellant" />

        <android.support.design.widget.TextInputLayout
            android_id="@+id/descLayout"
            android_layout_width="match_parent"
            android_layout_height="wrap_content">

            <EditText
                android_id="@+id/descEditText"
                android_layout_width="match_parent"
                android_layout_height="wrap_content"
                android_singleLine="true"
                android_hint= "Description" />
        </android.support.design.widget.TextInputLayout>

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

##### (b). Model.xml

- How each view item shall appear.

```xml
<?xml version="1.0" encoding="utf-8"?>
<android.support.v7.widget.CardView
    android_orientation="horizontal" android_layout_width="match_parent"

    android_layout_margin="10dp"
    card_view_cardCornerRadius="5dp"
    card_view_cardElevation="5dp"
    android_layout_height="200dp">

        <LinearLayout
            android_orientation="vertical"
            android_layout_width="match_parent"
            android_layout_height="match_parent">

            <TextView
                android_layout_width="match_parent"
                android_layout_height="wrap_content"
                android_textAppearance="?android:attr/textAppearanceLarge"
                android_text="Name"
                android_id="@+id/nameTxt"
                android_padding="10dp"
                android_textColor="@color/colorAccent"
                android_textStyle="bold"
                android_layout_alignParentLeft="true"
                />

            <TextView
                android_layout_width="wrap_content"
                android_layout_height="wrap_content"
                android_textAppearance="?android:attr/textAppearanceLarge"
                android_text="Description....................."
                android_lines="3"
                android_id="@+id/descTxt"
                android_padding="10dp"
                android_layout_alignParentLeft="true"
                />

            <TextView
                android_layout_width="wrap_content"
                android_layout_height="wrap_content"
                android_textAppearance="?android:attr/textAppearanceMedium"
                android_text="Propellant"
                android_textStyle="italic"
                android_id="@+id/propellantTxt" />

    </LinearLayout>

</android.support.v7.widget.CardView>
```

#### 4\. Download

| Resource | Link |
| --- | --- |
| GitHub Browse | [Browse](https://github.com/Oclemy/FireBase-Recycler-Multi-Items) |
| GitHub Download Link | [Download](https://github.com/Oclemy/Firebase-Recycler-Multi-Items/archive/master.zip) |

### 3\. Android Firebase - RecyclerView Master Detail [Open Activity]

Hi,welcome to our Android Firebase RecyclerView Master detail tutorial.

This is an android firebase recyclerview tutorial. How to save data to firebase,retrieve then show that data in a custom gridview.

- Save data from edittext to google firebase database.
- Retrieve the data by attaching events to a DatabaseReference instance.
- Bind the data to a csutom gridview using a BaseAdapter subclass.
- Handle the GridView's itemClicks.
- Open new Activity when a grid item is clicked.
- Pass data to that new activity

#### What Is Firebase Realtime Database?

Firebase Realtime database is a database backend as a service Cloud hosted solution that gives us the platform to build rich apps.Normally we are used to making HTTP requests to read or write data against our servers.But not in Firebase.It uses synchronization technology that allows it to be realtime,but still performant.

#### Main Feautures?

- Its realtime .
- Platfrom Independent.
- Easy Access Control.
- It’s a NoSQL solution and is heavily optimized for performance.
- Has Offline capability .
- Its User Friendly.

Video Tutorial  For more Explanations please check our video tutorial below.

#### Setup

##### (a) .Create Basic Activity Project

1. First create a new project in android studio. Go to File --> New Project.

##### (b). Create Firebase and Download Configuration File

Head over to Firebase Console, create a Firebase App, Register your app id and download the `google-services.json` file. Add it to your app folder.

##### (c). Specify Maven repository URL

Head over to project level(project folder) `build.gradle` and

1. Add Google services classpath as below
2. Add maven repository url

```groovy
// Top-level build file where you can add configuration options common to all sub-projects/modules.

buildscript {
    repositories {
        jcenter()
    }
    dependencies {
        classpath 'com.android.tools.build:gradle:2.3.3'
        classpath 'com.google.gms:google-services:3.1.0'

        // NOTE: Do not place your application dependencies here; they belong
        // in the individual module build.gradle files
    }
}

allprojects {
    repositories {
        jcenter()
        maven {
            url "https://maven.google.com" // Google's Maven repository
        }
    }
}

task clean(type: Delete) {
    delete rootProject.buildDir
}
```

##### (d). Add Firebase Dependencies

Add them in you app level(app folder) build.gradle, then

```groovy
dependencies {
    compile fileTree(dir: 'libs', include: ['*.jar'])

    testCompile 'junit:junit:4.12'
    compile 'com.android.support:appcompat-v7:23.3.0'
    compile 'com.android.support:design:23.3.0'
    compile 'com.android.support:cardview-v7:23.3.0'

    compile 'com.google.firebase:firebase-core:11.8.0'
    compile 'com.google.firebase:firebase-database:11.8.0'
}
apply plugin: 'com.google.gms.google-services'
```

Make sure you `apply plugin: 'com.google.gms.google-services'` as above.

##### (e). AndroidManifest.xml

- Remember to add permission for internet in your manifest file.

```xml
<?xml version="1.0" encoding="utf-8"?>
<manifest
    package="com.tutorials.hp.firebaserecyclermdetail">

    <uses-permission android_name="android.permission.INTERNET"/>

    <application
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
        <activity
            android_name=".DetailActivity"
            android_label="Detail View"
            android_theme="@style/AppTheme.NoActionBar">
        </activity>
    </application>

</manifest>
```

#### Java Classes

##### (a). Spacecraft.java

- Is our Data Object class
- Must Have an empty constructor.
- You can create,pass data to and use other constructors

```java
package com.tutorials.hp.firebaserecyclermdetail.m_Model;

/*
 * 1. OUR MODEL CLASS
 */
public class Spacecraft {

    String name,propellant,description;

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

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }
}
```

##### (b). FirebaseHelper.java

- Basically,our CRUD class.
- Here we perform reads and writes to Firebase database.
- To persist data we use setValue().
- Prior to calling setValue() method,we call push() to ensure we append data to database,not replace.
- We fill an arraylist with spacecraft objects.

```java
package com.tutorials.hp.firebaserecyclermdetail.m_FireBase;

import com.google.firebase.database.ChildEventListener;
import com.google.firebase.database.DataSnapshot;
import com.google.firebase.database.DatabaseError;
import com.google.firebase.database.DatabaseException;
import com.google.firebase.database.DatabaseReference;
import com.tutorials.hp.firebaserecyclermdetail.m_Model.Spacecraft;

import java.util.ArrayList;

/*
 * 1.SAVE DATA TO FIREBASE
 * 2. RETRIEVE
 * 3.RETURN AN ARRAYLIST
 */
public class FirebaseHelper {

    DatabaseReference db;
    Boolean saved=null;
    ArrayList<Spacecraft> spacecrafts=new ArrayList<>();

    public FirebaseHelper(DatabaseReference db) {
        this.db = db;
    }

    //WRITE IF NOT NULL
    public Boolean save(Spacecraft spacecraft)
    {
        if(spacecraft==null)
        {
            saved=false;
        }else
        {
            try
            {
                db.child("Spacecraft").push().setValue(spacecraft);
                saved=true;

            }catch (DatabaseException e)
            {
                e.printStackTrace();
                saved=false;
            }
        }

        return saved;
    }

    //IMPLEMENT FETCH DATA AND FILL ARRAYLIST
    private void fetchData(DataSnapshot dataSnapshot)
    {
        spacecrafts.clear();

        for (DataSnapshot ds : dataSnapshot.getChildren())
        {
            Spacecraft spacecraft=ds.getValue(Spacecraft.class);
            spacecrafts.add(spacecraft);
        }
    }

    //READ THEN RETURN ARRAYLIST
    public ArrayList<Spacecraft> retrieve() {
        db.addChildEventListener(new ChildEventListener() {
            @Override
            public void onChildAdded(DataSnapshot dataSnapshot, String s) {
                fetchData(dataSnapshot);
            }

            @Override
            public void onChildChanged(DataSnapshot dataSnapshot, String s) {
                fetchData(dataSnapshot);

            }

            @Override
            public void onChildRemoved(DataSnapshot dataSnapshot) {

            }

            @Override
            public void onChildMoved(DataSnapshot dataSnapshot, String s) {

            }

            @Override
            public void onCancelled(DatabaseError databaseError) {

            }
        });
        return spacecrafts;
    }
}
```

##### (c). MyViewHolder.java

- Is our viewholder class
- Holds the views to shown in our RecyclerView

```java
package com.tutorials.hp.firebaserecyclermdetail.m_UI;

import android.support.v7.widget.RecyclerView;
import android.view.View;
import android.widget.TextView;

import com.tutorials.hp.firebaserecyclermdetail.R;

public class MyViewHolder extends RecyclerView.ViewHolder implements View.OnClickListener{

    TextView nameTxt,propTxt,descTxt;
    ItemClickListener itemClickListener;

    public MyViewHolder(View itemView) {
        super(itemView);

        nameTxt= (TextView) itemView.findViewById(R.id.nameTxt);
        propTxt= (TextView) itemView.findViewById(R.id.propellantTxt);
        descTxt= (TextView) itemView.findViewById(R.id.descTxt);

        itemView.setOnClickListener(this);
    }

    public void setItemClickListener(ItemClickListener itemClickListener)
    {
        this.itemClickListener=itemClickListener;
    }

    @Override
    public void onClick(View view) {
        this.itemClickListener.onItemClick(this.getLayoutPosition());
    }
}
```

##### (d). MyAdapter.java

- Responsible for Layout Inflation.
- Also for data binding to views.
- Then opens new activity and passes data to it via android.Content.Intent.

```java
package com.tutorials.hp.firebaserecyclermdetail.m_UI;

import android.content.Context;
import android.content.Intent;
import android.support.v7.widget.RecyclerView;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;

import com.tutorials.hp.firebaserecyclermdetail.DetailActivity;
import com.tutorials.hp.firebaserecyclermdetail.R;
import com.tutorials.hp.firebaserecyclermdetail.m_Model.Spacecraft;

import java.util.ArrayList;

public class MyAdapter extends RecyclerView.Adapter<MyViewHolder> {

    Context c;
    ArrayList<Spacecraft> spacecrafts;

    public MyAdapter(Context c, ArrayList<Spacecraft> spacecrafts) {
        this.c = c;
        this.spacecrafts = spacecrafts;
    }

    @Override
    public MyViewHolder onCreateViewHolder(ViewGroup parent, int viewType) {
        View v=LayoutInflater.from(c).inflate(R.layout.model,parent,false);
        return new MyViewHolder(v);
    }

    @Override
    public void onBindViewHolder(MyViewHolder holder, int position) {
        final  Spacecraft s=spacecrafts.get(position);

        holder.nameTxt.setText(s.getName());
        holder.propTxt.setText(s.getPropellant());
        holder.descTxt.setText(s.getDescription());

        holder.setItemClickListener(new ItemClickListener() {
            @Override
            public void onItemClick(int pos) {
                //OPEN DETAI ACTIVITY
                openDetailActivity(s.getName(),s.getDescription(),s.getPropellant());
            }
        });
    }

    @Override
    public int getItemCount() {
        return spacecrafts.size();
    }

    //OPEN DETAIL ACTIVITY
    private void openDetailActivity(String...details)
    {
        Intent i=new Intent(c,DetailActivity.class);

        i.putExtra("NAME_KEY",details[0]);
        i.putExtra("DESC_KEY",details[1]);
        i.putExtra("PROP_KEY",details[2]);

        c.startActivity(i);
    }
}
```

##### (e). ItemClickListener.java

- Defines for us signature for our onItemClick() method.

```java
package com.tutorials.hp.firebaserecyclermdetail.m_UI;

public interface ItemClickListener {

    void onItemClick(int pos);
}
```

#### 12\. MainActivity.java

- Launcher activity.
- Reference RecyclerView, set its adapter.
- Shows Input Dialog on FAB button click.
- Sets up our Firebase's by initializing the DatabaseReference.

```java
package com.tutorials.hp.firebaserecyclermdetail;

import android.app.Dialog;
import android.os.Bundle;
import android.support.design.widget.FloatingActionButton;
import android.support.v7.app.AppCompatActivity;
import android.support.v7.widget.LinearLayoutManager;
import android.support.v7.widget.RecyclerView;
import android.support.v7.widget.Toolbar;
import android.view.View;
import android.widget.Button;
import android.widget.EditText;
import android.widget.Toast;

import com.google.firebase.database.DatabaseReference;
import com.google.firebase.database.FirebaseDatabase;
import com.tutorials.hp.firebaserecyclermdetail.m_FireBase.FirebaseHelper;
import com.tutorials.hp.firebaserecyclermdetail.m_Model.Spacecraft;
import com.tutorials.hp.firebaserecyclermdetail.m_UI.MyAdapter;

/*
1.INITIALIZE FIREBASE DB
2.INITIALIZE UI
3.DATA INPUT
 */
public class MainActivity extends AppCompatActivity {
    DatabaseReference db;
    FirebaseHelper helper;
    MyAdapter adapter;
    RecyclerView rv;
    EditText nameEditTxt,propTxt,descTxt;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);
        Toolbar toolbar = (Toolbar) findViewById(R.id.toolbar);
        setSupportActionBar(toolbar);

        //SETUP RECYCLER
        rv = (RecyclerView) findViewById(R.id.rv);
        rv.setLayoutManager(new LinearLayoutManager(this));

        //INITIALIZE FIREBASE DB
        db= FirebaseDatabase.getInstance().getReference();
        helper=new FirebaseHelper(db);

        //ADAPTER
        adapter=new MyAdapter(this,helper.retrieve());
        rv.setAdapter(adapter);

        FloatingActionButton fab = (FloatingActionButton) findViewById(R.id.fab);
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
        d.setTitle("Save To Firebase");
        d.setContentView(R.layout.input_dialog);

        nameEditTxt= (EditText) d.findViewById(R.id.nameEditText);
        propTxt= (EditText) d.findViewById(R.id.propellantEditText);
        descTxt= (EditText) d.findViewById(R.id.descEditText);
        Button saveBtn= (Button) d.findViewById(R.id.saveBtn);

        //SAVE
        saveBtn.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {

                //GET DATA
                String name=nameEditTxt.getText().toString();
                String propellant=propTxt.getText().toString();
                String desc=descTxt.getText().toString();

                //SET DATA
                Spacecraft s=new Spacecraft();
                s.setName(name);
                s.setPropellant(propellant);
                s.setDescription(desc);

                //SIMPLE VALIDATION
                if(name != null && name.length()>0)
                {
                    //THEN SAVE
                    if(helper.save(s))
                    {
                        //IF SAVED CLEAR EDITXT
                        nameEditTxt.setText("");
                        propTxt.setText("");
                        descTxt.setText("");

                        adapter=new MyAdapter(MainActivity.this,helper.retrieve());
                        rv.setAdapter(adapter);

                    }
                }else
                {
                    Toast.makeText(MainActivity.this, "Name Must Not Be Empty", Toast.LENGTH_SHORT).show();
                }

            }
        });

        d.show();
    }

}
```

##### (f). DetailActivity.java

- Yes,the detail activity here.To show our details.
- Receives data from MainActivity via Intent.
- Shows the data in TextViews.

```java
package com.tutorials.hp.firebaserecyclermdetail;

import android.content.Intent;
import android.os.Bundle;
import android.support.design.widget.FloatingActionButton;
import android.support.design.widget.Snackbar;
import android.support.v7.app.AppCompatActivity;
import android.support.v7.widget.Toolbar;
import android.view.View;
import android.widget.TextView;

public class DetailActivity extends AppCompatActivity {

    TextView nameTxt,descTxt, propTxt;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_detail);
        Toolbar toolbar = (Toolbar) findViewById(R.id.toolbar);
        setSupportActionBar(toolbar);
        FloatingActionButton fab = (FloatingActionButton) findViewById(R.id.fab);

        nameTxt = (TextView) findViewById(R.id.nameDetailTxt);
        descTxt= (TextView) findViewById(R.id.descDetailTxt);
        propTxt = (TextView) findViewById(R.id.propellantDetailTxt);

        //GET INTENT
        Intent i=this.getIntent();

        //RECEIVE DATA
        String name=i.getExtras().getString("NAME_KEY");
        String desc=i.getExtras().getString("DESC_KEY");
        String propellant=i.getExtras().getString("PROP_KEY");

        //BIND DATA
        nameTxt.setText(name);
        descTxt.setText(desc);
        propTxt.setText(propellant);

        fab.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View view) {
                Snackbar.make(view, "Replace with your own action", Snackbar.LENGTH_LONG)
                        .setAction("Action", null).show();
            }
        });
    }

}
```

#### Layouts

##### (a). ActivityMain.xml

- Contains our ContentMain.xml
- Defines our Floating ActionButton.

```xml
<?xml version="1.0" encoding="utf-8"?>
<android.support.design.widget.CoordinatorLayout

    android_layout_width="match_parent"
    android_layout_height="match_parent"
    android_fitsSystemWindows="true"
    tools_context="com.tutorials.hp.firebaserecyclermdetail.MainActivity">

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

##### (b). ContentMain.xml

- Our Master View

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
    tools_context="com.tutorials.hp.firebaserecyclermdetail.MainActivity"
    tools_showIn="@layout/activity_main">

    <android.support.v7.widget.RecyclerView
        android_id="@+id/rv"
        android_layout_width="match_parent"
        android_layout_height="wrap_content"
        />
</RelativeLayout>
```

##### (c). inputdialog.xml

- defines our input dialogs layout

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

        <android.support.design.widget.TextInputLayout
            android_id="@+id/propLayout"
            android_layout_width="match_parent"
            android_layout_height="wrap_content">

            <EditText
                android_id="@+id/propellantEditText"
                android_layout_width="match_parent"
                android_layout_height="wrap_content"
                android_singleLine="true"
                android_hint= "Propellant" />

        <android.support.design.widget.TextInputLayout
            android_id="@+id/descLayout"
            android_layout_width="match_parent"
            android_layout_height="wrap_content">

            <EditText
                android_id="@+id/descEditText"
                android_layout_width="match_parent"
                android_layout_height="wrap_content"
                android_singleLine="true"
                android_hint= "Description" />
        </android.support.design.widget.TextInputLayout>

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

##### (d). Model.xml

- defines our custom CardViews.

```xml
<?xml version="1.0" encoding="utf-8"?>
<android.support.v7.widget.CardView
    android_orientation="horizontal" android_layout_width="match_parent"

    android_layout_margin="10dp"
    card_view_cardCornerRadius="5dp"
    card_view_cardElevation="5dp"
    android_layout_height="200dp">

        <LinearLayout
            android_orientation="vertical"
            android_layout_width="match_parent"
            android_layout_height="match_parent">

            <TextView
                android_layout_width="match_parent"
                android_layout_height="wrap_content"
                android_textAppearance="?android:attr/textAppearanceLarge"
                android_text="Name"
                android_id="@+id/nameTxt"
                android_padding="10dp"
                android_textColor="@color/colorAccent"
                android_textStyle="bold"
                android_layout_alignParentLeft="true"
                />

            <TextView
                android_layout_width="wrap_content"
                android_layout_height="wrap_content"
                android_textAppearance="?android:attr/textAppearanceLarge"
                android_text="Description....................."
                android_lines="3"
                android_id="@+id/descTxt"
                android_padding="10dp"
                android_layout_alignParentLeft="true"
                />

            <TextView
                android_layout_width="wrap_content"
                android_layout_height="wrap_content"
                android_textAppearance="?android:attr/textAppearanceMedium"
                android_text="Propellant"
                android_textStyle="italic"
                android_id="@+id/propellantTxt" />

    </LinearLayout>

</android.support.v7.widget.CardView>
```

##### (f). activity_detail.xml

- Contains our ContentDetail.xml

```xml
<?xml version="1.0" encoding="utf-8"?>
<android.support.design.widget.CoordinatorLayout

    android_layout_width="match_parent"
    android_layout_height="match_parent"
    android_fitsSystemWindows="true"
    tools_context="com.tutorials.hp.firebaserecyclermdetail.DetailActivity">

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

##### (g). content_detail.xml

- Our Detail View.

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
    tools_context="com.tutorials.hp.firebaserecyclermdetail.DetailActivity"
    tools_showIn="@layout/activity_detail">

    <android.support.v7.widget.CardView
        android_orientation="horizontal" android_layout_width="match_parent"

        android_layout_margin="5dp"
        card_view_cardCornerRadius="10dp"
        card_view_cardElevation="5dp"

        android_layout_height="match_parent">

        <LinearLayout
            android_orientation="vertical"
            android_layout_width="match_parent"
            android_layout_height="match_parent"
            android_weightSum="1">

            <LinearLayout
                android_orientation="horizontal"
                android_layout_width="match_parent"
                android_layout_height="wrap_content">

                <ImageView
                    android_id="@+id/articleDetailImg"
                    android_layout_width="320dp"
                    android_layout_height="wrap_content"
                    android_paddingLeft="10dp"
                    android_layout_alignParentTop="true"
                    android_scaleType="centerCrop"
                    android_src="@drawable/spitzer" />

                <LinearLayout
                    android_orientation="vertical"
                    android_layout_width="match_parent"
                    android_layout_height="wrap_content">

                    <TextView
                        android_id="@+id/nameDetailTxt"
                        android_layout_width="wrap_content"
                        android_layout_height="wrap_content"
                        android_textAppearance="?android:attr/textAppearanceLarge"
                        android_padding="5dp"
                        android_minLines="1"
                        android_textStyle="bold"
                        android_textColor="@color/colorAccent"
                        android_text="Title" />

                </LinearLayout>
            </LinearLayout>

            <LinearLayout
                android_layout_width="fill_parent"
                android_layout_height="match_parent"
                android_layout_marginTop="?attr/actionBarSize"
                android_orientation="vertical"
                android_paddingLeft="5dp"
                android_paddingRight="5dp"
                android_paddingTop="5dp">

                <TextView
                    android_id="@+id/propellantDetailTxt"
                    android_layout_width="wrap_content"
                    android_layout_height="wrap_content"
                    android_textAppearance="?android:attr/textAppearanceLarge"
                    android_padding="5dp"
                    android_minLines="1"
                    android_text="DATE" />
                <TextView
                    android_id="@+id/descDetailTxt"
                    android_layout_width="wrap_content"
                    android_layout_height="wrap_content"
                    android_textAppearance="?android:attr/textAppearanceLarge"
                    android_padding="5dp"
                    android_textColor="#0f0f0f"
                    android_minLines="4"
                    android_text="Space craft details...." />

                <TextView
                    android_id="@+id/linkDetailTxt"
                    android_layout_width="wrap_content"
                    android_layout_height="wrap_content"
                    android_textAppearance="?android:attr/textAppearanceMedium"
                    android_padding="5dp"
                    android_textColor="@color/colorPrimaryDark"
                    android_textStyle="italic"
                    android_text="Link" />

            </LinearLayout>
        </LinearLayout>
    </android.support.v7.widget.CardView>

</RelativeLayout>
```

#### 4\. Download

| Resource | Link |
| --- | --- |
| GitHub Browse | [Browse](https://github.com/Oclemy/Firebase-Recycler-MDetail) |
| GitHub Download Link | [Download](https://github.com/Oclemy/Firebase-Recycler-MDetail/archive/master.zip) |
| Video | [Video tutorial](http://www.youtube.com/watch?v=IXzp1BDLlFE) |

#### How To Run

1. Download the project.
2. You'll get a zipped file,extract it.
3. Open the Android Studio.
4. Now close, already open project.
5. From the Menu bar click on File >New> Import Project.
6. Now Choose a Destination Folder, from where you want to import project.
7. Choose an Android Project.
8. Now Click on “OK“.
9. Done, your done importing the project,now edit it.
10. You'll need to head over to Firebase Console, create app, then download configuration file and add to your project in the app folder.
