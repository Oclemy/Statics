# Android Firebase Realtime Database ListView CRUD simple examples

_Android Firebase Realtime Database - 3 ListView Examples_

This is an android Firebase Realtime Database with ListView examples. We see how to add and retrieve data and show in ListViews.


## 1\. Android Firebase - ListView - Save,Retrieve,Show

_So lets cover android firebase listview example.How to save from edittext,retrieve that particular data and of course show in a simple listview._

[ListView](https://camposha.info/android/listview) is one of the most popular adapterviews while Firebase is probably the most popular database backend service currently in the market.

These two are easy to use and provides us with powerful opportunities to create amazing apps.

#### The Plan

This android firebase listview tutorial.This is what we do :

- Save from edittext to google firebase database using methods `setValue()` and `push()`;
- Fetch that particular data by attaching a childEventListener to a databaseReference instance.
- Read the children of a dataSnapshot.
- Fill Simple ArrayList
- Bind the arraylist to ListView

#### 1\. Setup

##### (a). Create Basic Activity Project

1. First create a new project in android studio. Go to File --> New Project.

##### (b). Create Firebase and Download Configuration File

Head over to Firebase Console, create a Firebase App, Register your app id and download the `google-services.json` file. Add it to your app folder.

##### (c). Add Google services classpath and maven url

Add `classpath 'com.google.gms:google-services:3.1.0'`. This you do in the project level build.gradle. You may use later versions.

Also add the google maven url in you respositories. Firebase will be fetched from that url.

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

##### (c). Add Firebase Dependencies

Add FirebaseDatabase dependencies in your app level build.gradle. You may use later versions than me. Then sync the project to download them and add them as part of your project.

```groovy
dependencies {
    compile fileTree(dir: 'libs', include: ['*.jar'])
    testCompile 'junit:junit:4.12'
    compile 'com.android.support:appcompat-v7:23.3.0'
    compile 'com.android.support:design:23.3.0'

    compile 'com.google.firebase:firebase-core:11.8.0'
    compile 'com.google.firebase:firebase-database:11.8.0'
}
apply plugin: 'com.google.gms.google-services'
```

Make sure you `apply plugin: 'com.google.gms.google-services'` as above.

##### (d). AndroidManifest.xml

- Add this to your androidmainfest.xml file. This because to access Firebase we need internet connection hence we have to specify a permission. Add it under the `<manifest>..</manifest>` tag.

```xml
<manifest>
...
    <uses-permission android_name="android.permission.INTERNET"/>
 ...
 </manifest>
```

#### 5\. Create User Interface

User interfaces are typically created in android using XML layouts as opposed by direct java coding.

##### (a). activity_main.xml

- This layout gets inflated to MainActivity user interface.
- It includes the content_main.xml.

```xml
<?xml version="1.0" encoding="utf-8"?>
<android.support.design.widget.CoordinatorLayout

    android_layout_width="match_parent"
    android_layout_height="match_parent"
    android_fitsSystemWindows="true"
    tools_context="com.tutorials.hp.firebasesimplelistview.MainActivity">

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

This layout will get interpolated into our `activity_main.xml`.

Here are the roles of this layout:

| No. | Responsibility |
| --- | --- |
| 1. | Define a ListView identified by a unique id. That ListView is our adapterview and will render our realtime data from Firebase. |

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
    tools_context="com.tutorials.hp.firebasesimplelistview.MainActivity"
    tools_showIn="@layout/activity_main">

    <ListView
        android_id="@+id/lv"
        android_layout_width="match_parent"
        android_layout_height="wrap_content"
        />
</RelativeLayout>
```

##### (c). input_dialog.xml

- InputDialog.xml

This is our input form layout.

Here are it's roles:

| No. | Responsibility |
| --- | --- |
| 1. | Define an EditText for writing data to firebase. Wrap that edittext in a TextInputLayout to give it a material design feel. |
| 2. | Define a Button to be used as our action button to for saving data to firebase. |
| 3. | Align all these widgets in a vertical manner with the help of a LinearLayout. |

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
            android_layout_marginTop="20dp"
            android_textColor="@android:color/white"/>

    </LinearLayout>

</LinearLayout>
```

#### Our Java Classes

##### (a). Our Model Class : Spacecarft.java

- Data object
- Represents a single spacecraft and its properties.

It has the following responsibilities:

| No. | Responsibility |
| --- | --- |
| 1. | Define one private field which will be the sole property of our spacecraft. That is : `name` property. |
| 2. | Define one empty constructor which is require by Firebase. |
| 3. | Expose our instance field for modification or data retrieval via setter and getter methods respectively. |

```java
package com.tutorials.hp.firebasesimplelistview.m_Model;

public class Spacecraft {

    String name;

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

#### (b). Our FirebaseHelper class

- Perform basic Write to Firebase database
- Read from Firebase database.
- Fill simple arraylist

Here are the major responsibilities of this class:

| No. | Responsibility |
| --- | --- |
| 1. | Maintain three instance fields: a `DatabaseReference`, a `Boolean` and an `ArrayList`. |
| 2. | Obtain a DatabaseReference via the parameter from outside and assign it to the one we maintain locally. |
| 3. | Define a public method `save()` that receives a `Spacecraft` object, then attempt to save it to Firebase and return either true or false based on the success. To save data we use `db.child("Spacecraft").push().setValue(spacecraft)`. |
| 4. | Define a private helper method called `fetchData()` that receives a `com.google.firebase.database.DataSnapshot` object. Then loop through the children of this DataSnapshot getting the value of each DataSnapshot child via `datasnapshotChild.getValue(Spacecraft.class)`. Add these values into our private ArrayList. |
| 5. | Define a method `retrieve()`. Add child event listeners to our private DatabaseReference we had maintained. When any DataSnapshot child changes or gets added, call our `fetchData()` passing in that DataSnapshot as a parameter. This is how fetch data. Then return the filled arraylist. |

```java
package com.tutorials.hp.firebasesimplelistview.m_FireBase;

import com.google.firebase.database.ChildEventListener;
import com.google.firebase.database.DataSnapshot;
import com.google.firebase.database.DatabaseError;
import com.google.firebase.database.DatabaseException;
import com.google.firebase.database.DatabaseReference;
import com.tutorials.hp.firebasesimplelistview.m_Model.Spacecraft;

import java.util.ArrayList;

public class FirebaseHelper {

    DatabaseReference db;
    Boolean saved=null;
    ArrayList<String> spacecrafts=new ArrayList<>();

    public FirebaseHelper(DatabaseReference db) {
        this.db = db;
    }

    //WRITE
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

##### (c). Our MainActivity class

- Launcher activity
- Where we bind to listview to our data using arrayadapter
- Initialize DatabaseReference
- Show input dialog

It derives from `android.support.v7.app.AppCompatActivity`.

Here are it's major responsibilities:

| No. | Responsibility |
| --- | --- |
| 1. | Allow itself to become an android [activity](https://camposha.info/android/activity) component by deriving from `android.support.v7.app.AppCompatActivity`. |
| 2. | Listen to activity creation callback by overrding the `onCreate()` method. |
| 3. | Invoke the `onCreate()` method of the parent [Activity](https://camposha.info/android/activity) class and tell it of a [Bundle](https://camposha.info/android/activity) we've received. |
| 4. | Inflate the `activity_main.xml` into a View object and set it as the content view of this activity. |
| 5. | Search for a toolbar by it's id and set it as our actionbar. |
| 6. | Host an input dialog that will be used to save data into Firebase Realtime database. |
| 7. | Search for the EditText and Button from our layout and return them as view objects.These widgets will help users perform this data insertion. This by saving data from these EditTexts when the save button is clicked. |
| 8. | Find ListView by its id from our layouts. |
| 9. | Obtain a `com.google.firebase.database.FirebaseDatabase` instance then obtain a DatabaseReference from that instance then assign it to our local DatabaseReference private field. |
| 10. | Instantiate our CustomAdapter, pass it our data then set the adapter to our ListView. |
| 11. | Reference our FloatingActionButton from our `activity_main.xml`, then listen to its onClick events, then when it's clicked display our input Dialog. |

```java
package com.tutorials.hp.firebasesimplelistview;

import android.app.Dialog;
import android.os.Bundle;
import android.support.design.widget.FloatingActionButton;
import android.support.v7.app.AppCompatActivity;
import android.support.v7.widget.Toolbar;
import android.view.View;
import android.widget.AdapterView;
import android.widget.ArrayAdapter;
import android.widget.Button;
import android.widget.EditText;
import android.widget.ListView;
import android.widget.Toast;

import com.google.firebase.database.DatabaseReference;
import com.google.firebase.database.FirebaseDatabase;
import com.tutorials.hp.firebasesimplelistview.m_FireBase.FirebaseHelper;
import com.tutorials.hp.firebasesimplelistview.m_Model.Spacecraft;

public class MainActivity extends AppCompatActivity {

    ListView lv;
    ArrayAdapter<String> adapter;
    DatabaseReference db;
    FirebaseHelper helper;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);
        Toolbar toolbar = (Toolbar) findViewById(R.id.toolbar);
        setSupportActionBar(toolbar);

        lv= (ListView) findViewById(R.id.lv);

        //SETUP FIREBASE
        db= FirebaseDatabase.getInstance().getReference();
        helper=new FirebaseHelper(db);

        //ADAPTER
        adapter=new ArrayAdapter<String>(this,android.R.layout.simple_list_item_1,helper.retrieve());
        lv.setAdapter(adapter);

        lv.setOnItemClickListener(new AdapterView.OnItemClickListener() {
            @Override
            public void onItemClick(AdapterView<?> parent, View view, int position, long id) {
                Toast.makeText(MainActivity.this, helper.retrieve().get(position), Toast.LENGTH_SHORT).show();
            }
        });

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

        final EditText nameEditTxt= (EditText) d.findViewById(R.id.nameEditText);
        Button saveBtn= (Button) d.findViewById(R.id.saveBtn);

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
                        adapter=new ArrayAdapter<String>(MainActivity.this,android.R.layout.simple_list_item_1,helper.retrieve());
                        lv.setAdapter(adapter);

                    }
                }else
                {
                    Toast.makeText(MainActivity.this, "Name cannot be empty", Toast.LENGTH_SHORT).show();
                }

            }
        });

        d.show();
    }

}
```

#### Download

| Resource | Link |
| --- | --- |
| GitHub Browse | [Browse](https://github.com/Oclemy/FireBaseSimpleListView) |
| GitHub Download Link | [Download](https://github.com/Oclemy/FireBaseSimpleListView/archive/master.zip) |

### 2\. Android Firebase - ListView Multiple Fields - Save,Retrieve then Show

[center]_Android Firebase Database ListView Tutorial._[/center]

This is an android firebase ListView tutorial. We see how to save data to firebase,retrieve then show that data in a custom ListView.

- Save data from edittext to google firebase database.
- Retrieve the data by attaching events to a DatabaseReference instance.
- Bind the data to a custom gridview using Subclass.

##### (a). Create Basic Activity Project

1. First create a new project in android studio. Go to File --> New Project.

##### (b) Create Firebase App

Go to Firbese Console and create a Firebase App. Then register add your android application ID into that app and download the `google-services.json` file.

There is a wizard that will guide you through this process inside the Firebase Console dashboard.

##### (c). Add Google services classpath and maven url

Add `classpath 'com.google.gms:google-services:3.1.0'`. This you do in the project level `build.gradle`. You may use later versions.

Also add the google maven url in you respositories. Firebase will be fetched from that url.

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

Add FirebaseDatabase dependencies in your app level build.gradle. You may use later versions than me. Then sync the project to download them and add them as part of your project.

```groovy
apply plugin: 'com.android.application'

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

- Remember to add permission for internet in your manifest file. This is because Firebase is cloud based and we need internet connection permission to access internet in android.

```xml
<?xml version="1.0" encoding="utf-8"?>
<manifest
    package="com.tutorials.hp.firebaselistviewmulti_items">

    <uses-permission android_name="android.permission.INTERNET"/>
    ...
</manifest>
```

#### 2\. XML Layouts

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
    tools_context="com.tutorials.hp.firebaselistviewmulti_items.MainActivity">

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

##### (b). ContenMain.xml

This is alayout that will get included as part of our `activity_main.xml` layout.

Here are the roles of this layout:

| No. | Responsibility |
| --- | --- |
| 1. | Define a ListView identified by a unique id. That ListView is our adapterview and will render our realtime data from Firebase. |

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
    tools_context="com.tutorials.hp.firebaselistviewmulti_items.MainActivity"
    tools_showIn="@layout/activity_main">

    <ListView
        android_id="@+id/lv"
        android_layout_width="match_parent"
        android_layout_height="wrap_content"
         />
</RelativeLayout>
```

##### (c). InputDialog.xml

This is our input form layout.

Here are it's roles:

| No. | Responsibility |
| --- | --- |
| 1. | Define three EditTexts for writing data to firebase. Wrap those edittexts in a TextInputLayout to give them a material design feel. |
| 2. | Define a Button to be used as our action button to for saving data to firebase. |
| 3. | Align all these widgets in a vertical manner with the help of a LinearLayout. |

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

This is our ListView row model layout.

It has the following responsibilities:

| No. | Responsibility |
| --- | --- |
| 1. | Define three TextViews for displaying each spacecraft's details. |
| 2. | Align those TextViews vertically using a LinearLayout. |
| 3. | Define a root CardView to wrap all these under one roof. |

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

#### Java Classes

##### (a). Spacecraft.java

- This is our Data Object class
- Note that it Must Have an empty constructor.
- You can create,pass data to and use other constructors

This is our ListView row model layout.

It has the following responsibilities:

| No. | Responsibility |
| --- | --- |
| 1. | Define three private fields which will act as the properties of this spacecraft. These include: `name`,`propellant` and `description`. |
| 2. | Define one empty constructor which is requireb by Firebase. |
| 3. | Expose our instance fields for modifications or data retrieval via setters and getters respectively. |

```java
package com.tutorials.hp.firebaselistviewmulti_items.m_Model;

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

Here are the major responsibilities of this class:

| No. | Responsibility |
| --- | --- |
| 1. | Maintain three instance fields: a `DatabaseReference`, a `Boolean` and an `ArrayList`. |
| 2. | Obtain a DatabaseReference via the parameter from outside and assign it to the one we maintain locally. |
| 3. | Define a public method `save()` that receives a `Spacecraft` object, then attempt to save it to Firebase and return either true or false based on the success. To save data we use `db.child("Spacecraft").push().setValue(spacecraft)`. |
| 4. | Define a private helper method called `fetchData()` that receives a `com.google.firebase.database.DataSnapshot` object. Then loop through the children of this DataSnapshot getting the value of each DataSnapshot child via `datasnapshotChild.getValue(Spacecraft.class)`. Add these values into our private ArrayList. |
| 5. | Define a method `retrieve()`. Add child event listeners to our private DatabaseReference we had maintained. When any DataSnapshot child changes or gets added, call our `fetchData()` passing in that DataSnapshot as a parameter. This is how fetch data. Then return the filled arraylist. |

```java
package com.tutorials.hp.firebaselistviewmulti_items.m_FireBase;

import com.google.firebase.database.ChildEventListener;
import com.google.firebase.database.DataSnapshot;
import com.google.firebase.database.DatabaseError;
import com.google.firebase.database.DatabaseException;
import com.google.firebase.database.DatabaseReference;
import com.tutorials.hp.firebaselistviewmulti_items.m_Model.Spacecraft;

import java.util.ArrayList;

/*
 * 1.SAVE DATA TO FIREBASE
 * 2. RETRIEVE
 * 3.RETURN AN ARRAYLIST
 */
public class FirebaseHelper {

    DatabaseReference db;
    Boolean saved;
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

    //RETRIEVE
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

##### (c). : Our CustomAdapter class

Our adaoter class.

- Responsible for Layout Inflation.
- Also for data binding to views.
- Handling ItemClicks as well
- This class subclasses BaseAdapter

Here are it's roles:

| No. | Responsibility |
| --- | --- |
| 1. | Accept the responsibilities of an adapter by deriving from the `android.widget.BaseAdapter`. |
| 2. | Maintain private Context and ArrayList instance fields. |
| 3. | Receive a Context and an ArrayList from outside and assign them to the ones we maintain locally. |
| 4. | Return the count of items to be rendered by our adapter. We do this using the `getCount()` method. |
| 5. | Return a particular spacecraft from via the `getItem()` method as long as you pass us it's position. |
| 6. | Use individual spacecraft's positions in the adapter as their unique ids. |
| 7. | Inflate our `model.xml` using the LayoutInflater class and return the resultant view object. All these are done inside the `getView()` method. |
| 8. | Listen to each inflated view's row click events thus showing a Toast message. |

```java
package com.tutorials.hp.firebaselistviewmulti_items.m_UI;

import android.content.Context;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.BaseAdapter;
import android.widget.TextView;
import android.widget.Toast;

import com.tutorials.hp.firebaselistviewmulti_items.R;
import com.tutorials.hp.firebaselistviewmulti_items.m_Model.Spacecraft;

import java.util.ArrayList;

/*
 * 1. where WE INFLATE OUR MODEL LAYOUT INTO VIEW ITEM
 * 2. THEN BIND DATA
 */
public class CustomAdapter extends BaseAdapter{
    Context c;
    ArrayList<Spacecraft> spacecrafts;

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
    public View getView(int position, View convertView, ViewGroup parent) {
        if(convertView==null)
        {
            convertView= LayoutInflater.from(c).inflate(R.layout.model,parent,false);
        }

        TextView nameTxt= (TextView) convertView.findViewById(R.id.nameTxt);
        TextView propTxt= (TextView) convertView.findViewById(R.id.propellantTxt);
        TextView descTxt= (TextView) convertView.findViewById(R.id.descTxt);

        final Spacecraft s= (Spacecraft) this.getItem(position);

        nameTxt.setText(s.getName());
        propTxt.setText(s.getPropellant());
        descTxt.setText(s.getDescription());

        //ONITECLICK
        convertView.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                Toast.makeText(c,s.getName(),Toast.LENGTH_SHORT).show();
            }
        });
        return convertView;
    }
}
```

##### (d). Our MainActivity

- Launcher activity.
- Reference ListView and set its adapter.
- Shows Input Dialog on FAB button click.
- Sets up our Firebase's by initializing the DatabaseReference.

It derives from `android.support.v7.app.AppCompatActivity`.

Here are it's major responsibilities:

| No. | Responsibility |
| --- | --- |
| 1. | Allow itself to become an android [activity](https://camposha.info/android/activity) component by deriving from `android.support.v7.app.AppCompatActivity`. |
| 2. | Listen to activity creation callback by overrding the `onCreate()` method. |
| 3. | Invoke the `onCreate()` method of the parent [Activity](https://camposha.info/android/activity) class and tell it of a [Bundle](https://camposha.info/android/activity) we've received. |
| 4. | Inflate the `activity_main.xml` into a View object and set it as the content view of this activity. |
| 5. | Search for a toolbar by it's id and set it as our actionbar. |
| 6. | Host an input dialog that will be used to save data into Firebase Realtime database. |
| 7. | Search for the various EditTexts and Buttons from our layout and return them as view objects.These widgets will help users perform this data insertion. Then save data from these EditTexts when the save button is clicked. |
| 8. | Find ListView by its id from our layouts. |
| 9. | Obtain a `com.google.firebase.database.FirebaseDatabase` instance then obtain a DatabaseReference from that instance then assign it to our local DatabaseReference private field. |
| 10. | Instantiate our CustomAdapter, pass it our data then set the adapter to our ListView. |
| 11. | Reference our FloatingActionButton from our `activity_main.xml`, then listen to its onClick events, then when it's clicked display our input Dialog. |

```java
package com.tutorials.hp.firebaselistviewmulti_items;

import android.app.Dialog;
import android.os.Bundle;
import android.support.design.widget.FloatingActionButton;
import android.support.v7.app.AppCompatActivity;
import android.support.v7.widget.Toolbar;
import android.view.View;
import android.widget.Button;
import android.widget.EditText;
import android.widget.ListView;
import android.widget.Toast;

import com.google.firebase.database.DatabaseReference;
import com.google.firebase.database.FirebaseDatabase;
import com.tutorials.hp.firebaselistviewmulti_items.m_FireBase.FirebaseHelper;
import com.tutorials.hp.firebaselistviewmulti_items.m_Model.Spacecraft;
import com.tutorials.hp.firebaselistviewmulti_items.m_UI.CustomAdapter;

/*
1.INITIALIZE FIREBASE DB
2.INITIALIZE UI
3.DATA INPUT
 */
public class MainActivity extends AppCompatActivity {

    DatabaseReference db;
    FirebaseHelper helper;
    CustomAdapter adapter;
    ListView lv;
    EditText nameEditTxt, propTxt, descTxt;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);
        Toolbar toolbar = (Toolbar) findViewById(R.id.toolbar);
        setSupportActionBar(toolbar);

        lv = (ListView) findViewById(R.id.lv);

        //INITIALIZE FIREBASE DB
        db = FirebaseDatabase.getInstance().getReference();
        helper = new FirebaseHelper(db);

        //ADAPTER
        adapter = new CustomAdapter(this, helper.retrieve());
        lv.setAdapter(adapter);

        FloatingActionButton fab = (FloatingActionButton) findViewById(R.id.fab);
        fab.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View view) {
                displayInputDialog();
            }
        });
    }

    //DISPLAY INPUT DIALOG
    private void displayInputDialog() {
        Dialog d = new Dialog(this);
        d.setTitle("Save To Firebase");
        d.setContentView(R.layout.input_dialog);

        nameEditTxt = (EditText) d.findViewById(R.id.nameEditText);
        propTxt = (EditText) d.findViewById(R.id.propellantEditText);
        descTxt = (EditText) d.findViewById(R.id.descEditText);
        Button saveBtn = (Button) d.findViewById(R.id.saveBtn);

        //SAVE
        saveBtn.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {

                //GET DATA
                String name = nameEditTxt.getText().toString();
                String propellant = propTxt.getText().toString();
                String desc = descTxt.getText().toString();

                //SET DATA
                Spacecraft s = new Spacecraft();
                s.setName(name);
                s.setPropellant(propellant);
                s.setDescription(desc);

                //SIMPLE VALIDATION
                if (name != null && name.length() > 0) {
                    //THEN SAVE
                    if (helper.save(s)) {
                        //IF SAVED CLEAR EDITXT
                        nameEditTxt.setText("");
                        propTxt.setText("");
                        descTxt.setText("");

                        adapter = new CustomAdapter(MainActivity.this, helper.retrieve());
                        lv.setAdapter(adapter);

                    }
                } else {
                    Toast.makeText(MainActivity.this, "Name Must Not Be Empty", Toast.LENGTH_SHORT).show();
                }

            }
        });

        d.show();
    }
}
```

#### 10\. Reminders

- Remember to add permission for internet in your manifest file. This is because Firebase is cloud based and we need internet connection permission to access internet in android.

```xml
<?xml version="1.0" encoding="utf-8"?>
<manifest
    package="com.tutorials.hp.firebaselistviewmulti_items">

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
    </application>

</manifest>
```

#### 4\. Download

| Resource | Link |
| --- | --- |
| GitHub Browse | [Browse](https://github.com/Oclemy/FireBase-ListView-Multi-Items) |
| GitHub Download Link | [Download](https://github.com/Oclemy/FireBase-ListView-Multi-Items/archive/master.zip) |

### 3\. Android Firebase - ListView Master Detail - Save,Retrieve,Show [Open Activity]

[center]_Android Firebase ListView Master Detail  Tutorial._[/center]

\*his is an Android Firebase ListView Master Detail tutorial. We see how to save to Firebase from our android app, retrieve data, and show in a ListView.

The ListView will be rendered in our Master View.

Then when a ListView item is clicked we open a new activity, our detail activity. Our ListView will comprise a List of Spacecraft objects.

So in the detail view we show the details of the clicked Spacecraft.

- Save data from edittext to google firebase database.
- Retrieve the data by attaching events to a DatabaseReference instance.
- Bind the data to a custom ListView using a BaseAdapter subclass.
- Handle the ListView's itemClicks.
- Open new Activity when a grid item is clicked.
- Pass data to that new activity

#### Project Summary

Here's the Project Summary

| No. | File | Major Responsibility |
| --- | --- | --- |
| 1. | Spacecraft.java | Represents a single Spacecraft and it's properties like name,propellant and description. |
| 2. | FirebaseHelper.java | This class has allows us perform Firebase CRUD operations. |
| 3. | CustomAdapter.java | Our adapter class |
| 4. | DetailActivity.java | Our Detail Activity to show a single spacecraft's details. |
| 5. | MainActivity.java | Our Master Activity. It shows the list of Spacecrafts |
| 6. | activity_main.xml | Our Master Activity's layout. |
| 7. | content_main.xml | Our Master Activity's content detail. |
| 8. | activity_detail.xml | Our Detail Activity's main layout. |
| 9. | content_detail.xml | Our Detail Activity's content layout. |
| 10. | input_dialog.xml | Our input dialog layout. |
| 11. | model.xml | Each ListView's grid model. |

#### Setting Up

##### (a). Create Basic Activity Project

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

##### (c). Add Firebase Dependencies

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

##### (d). AndroidManifest.xml

- Remember to add permission for internet in your manifest file.

```xml
<manifest>
....
    <uses-permission android_name="android.permission.INTERNET" />
....
</manifest>
```

Here's mine in full:

```xml
<?xml version="1.0" encoding="utf-8"?>
<manifest
    package="com.tutorials.hp.firebaselistviewmdetail">

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
            android_theme="@style/AppTheme.NoActionBar"></activity>
    </application>

</manifest>
```

### Our Classes.

So now we look at the Java classes. Basically we have 5 classes; one data object, one adapter class, one FirebaseHelper class and two activities.

#### (a). Spacecraft.java

This is our data object class. It represents a single Spacecraft. It's our POJO class. Here's its responsibilities:

| No. | Responsibility |
| --- | --- |
| 1. | Represents a Single Spacecraft |
| 2. | Set Spacecraft properties: name,propellant and description. |
| 3. | Get Spacecraft properties: name,propellant and description. |

- Is our Data Object class
- Must Have an empty constructor.
- You can create,pass data to and use other constructors

```java
package com.tutorials.hp.firebaselistviewmdetail.m_Model;

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
- We fill an arraylist with spacecraft objects.

This class allows us perform save and retrieve data to Firebase Realtime database.

| No. | Responsibility |
| --- | --- |
| 1. | Keep hold of three Objects: DatabaseReference,a Boolean saved value, and an ArrayList of Spacecrafts. |
| 2. | Obtain a DatabaseReference object via the constructor and Assign it to our local db data member. |
| 3. | Take a Spacecraft object and save it to Firebase this returning a Boolean indicating success or failure. |
| 4. | Loop through DataSnapshot children nodes obtaining all the Spacecraft objects from Firebase and fill our local arraylist with those objects. |
| 5. | Listen to Firebase Children mutation events like when a DataSnapshot child has been added, moved, removed, changed or cancelled. This allows us to fetch data in realtime. |

```java
package com.tutorials.hp.firebaselistviewmdetail.m_FireBase;

import com.google.firebase.database.ChildEventListener;
import com.google.firebase.database.DataSnapshot;
import com.google.firebase.database.DatabaseError;
import com.google.firebase.database.DatabaseException;
import com.google.firebase.database.DatabaseReference;
import com.tutorials.hp.firebaselistviewmdetail.m_Model.Spacecraft;

import java.util.ArrayList;

/
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
    //READ BY HOOKING ONTO DATABASE OPERATION CALLBACKS
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

##### (c). Our CustomAdapter class

- Responsible for Layout Inflation.
- Also for data binding to views.
- Then opens new activity and passes data to it via android.Content.Intent.

This is our adapter class. It derives from BaseAdapter.

| No. | Responsibility |
| --- | --- |
| 1. | This class will maintain a Context object that will be used to during layout inflation. Furthermore we declare an ArrayList of Spacecrafts that will be bound to our [listview](https://camposha.info/android/listview). |
| 2. | Receive a Context and ArrayList of Spacecrafts from outside and assign them to our local instance fields. |
| 3. | Return data list count,Item and Item Identifier. |
| 4. | Inflate our `model.xml` layout and return it as a View when the `getView()` is called. |
| 5. | Listen to the inflated View click event and open our Master activity. |
| 6. | Pass the clicked spacecraft's details to the Detail Activity. |

```java
package com.tutorials.hp.firebaselistviewmdetail.m_UI;

import android.content.Context;
import android.content.Intent;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.BaseAdapter;
import android.widget.TextView;

import com.tutorials.hp.firebaselistviewmdetail.DetailActivity;
import com.tutorials.hp.firebaselistviewmdetail.R;
import com.tutorials.hp.firebaselistviewmdetail.m_Model.Spacecraft;

import java.util.ArrayList;

/*
 * 1. where WE INFLATE OUR MODEL LAYOUT INTO VIEW ITEM
 * 2. THEN BIND DATA
 */
public class CustomAdapter extends BaseAdapter {
    Context c;
    ArrayList<Spacecraft> spacecrafts;

    public CustomAdapter(Context c, ArrayList<Spacecraft> spacecrafts) {
        this.c = c;
        this.spacecrafts = spacecrafts;
    }

    @Override
    public int getCount() {
        return spacecrafts.size();
    }

    @Override
    public Object getItem(int pos) {
        return spacecrafts.get(pos);
    }

    @Override
    public long getItemId(int pos) {
        return pos;
    }

    @Override
    public View getView(int position, View convertView, ViewGroup viewGroup) {
        if(convertView==null)
        {
            convertView= LayoutInflater.from(c).inflate(R.layout.model,viewGroup,false);
        }

        TextView nameTxt= (TextView) convertView.findViewById(R.id.nameTxt);
        TextView propTxt= (TextView) convertView.findViewById(R.id.propellantTxt);
        TextView descTxt= (TextView) convertView.findViewById(R.id.descTxt);

        final Spacecraft s= (Spacecraft) this.getItem(position);

        nameTxt.setText(s.getName());
        propTxt.setText(s.getPropellant());
        descTxt.setText(s.getDescription());

        convertView.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                //OPEN DETAIL
                openDetailActivity(s.getName(),s.getDescription(),s.getPropellant());
            }
        });

        return convertView;
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

##### (d). Our MainActivity

This is our MainActivity. Our project has two activities and this is the main one. It will be the one launched when we launch our application.

It is also our Master View and will contain a list of Spacecraft objects.

- Launcher activity.
- Reference ListView set its adapter.
- Shows Input Dialog on FAB button click.
- Sets up our Firebase's by initializing the DatabaseReference.

| No. | Responsibility |
| --- | --- |
| 1. | It will maintain a couple of objects as instance fields including: DatabaseReference,FirebaseHelper,CustomAdapter, ListView and three EditTexts. |
| 2. | Define a method to instantiate our Dialog object, set it's title, set its ConteView and finally show it.This dialog is our input dialog with edittexts and save/retrieve buttons. |
| 3. | Search all the input widgets defined in `input_dialog.xml` and assign them to their respective instance objects.These include EditTexts and Buttons. |
| 4. | Listen to Save button click events, then obtain edittext values, assign those values to a Spacecraft object and with the help of FirebaseHelper instance send that object to Firebase realtime database. |
| 5. | Override the `onCreate()` method,call it's super equivalence. |
| 6. | Find Toolbar in our layout and use it as our actionbar. |
| 7. | Get FirebaseDatabase instance then it's reference and pass it to our FirebaseHelper constructor. |
| 8. | Instantiate `CustomAdapter`, find listview from our layout, then assign the adapter to the listview. |
| 9. | Listen to FAB button click event and show the input dialog. |

```java
package com.tutorials.hp.firebaselistviewmdetail;

import android.app.Dialog;
import android.os.Bundle;
import android.support.design.widget.FloatingActionButton;
import android.support.v7.app.AppCompatActivity;
import android.support.v7.widget.Toolbar;
import android.view.View;
import android.widget.Button;
import android.widget.EditText;
import android.widget.GridView;
import android.widget.ListView;
import android.widget.Toast;

import com.google.firebase.database.DatabaseReference;
import com.google.firebase.database.FirebaseDatabase;
import com.tutorials.hp.firebaselistviewmdetail.m_FireBase.FirebaseHelper;
import com.tutorials.hp.firebaselistviewmdetail.m_Model.Spacecraft;
import com.tutorials.hp.firebaselistviewmdetail.m_UI.CustomAdapter;

/*
1.INITIALIZE FIREBASE DB
2.INITIALIZE UI
3.DATA INPUT
 */
public class MainActivity extends AppCompatActivity {

    DatabaseReference db;
    FirebaseHelper helper;
    CustomAdapter adapter;
    ListView lv;
    EditText nameEditTxt,propTxt,descTxt;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);
        Toolbar toolbar = (Toolbar) findViewById(R.id.toolbar);
        setSupportActionBar(toolbar);

        lv = (ListView) findViewById(R.id.lv);

        //INITIALIZE FIREBASE DB
        db= FirebaseDatabase.getInstance().getReference();
        helper=new FirebaseHelper(db);

        //ADAPTER
        adapter=new CustomAdapter(this,helper.retrieve());
        lv.setAdapter(adapter);

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

                        adapter=new CustomAdapter(MainActivity.this,helper.retrieve());
                        lv.setAdapter(adapter);

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

##### (e). Our DetailActivity

Go ahead create a SecondActivity that will be used as the Detail View.

It will display selected Spacecraft details.

We'll look at its source later. However note that it will add two XML layouts: `activity_detail` and `content_detail` to our layout resources.

- The DetailActivity will show our details.
- Receives data from MainActivity via Intent.
- Shows the data in TextViews.

Here's it's responsibilities and how it works:

| No. | Responsibility |
| --- | --- |
| 1. | Maintain three TextView objects as private instance fields that will be used to show Spacecraft details. |
| 2. | Override the `onCreate()` method. Call the super class version of `onCreate()` as well. |
| 3. | Inflate the `activity_detail` via the `setContentView()` to a View object and set it as the detail Activity's main UI. |
| 4. | Find the toolbar from `activity_detail` and set it as the actionbar of our SecondActivity. |
| 5. | Find TextViews defined in the `content_detail.xml` and assign them to our local TextView objects. |
| 6. | Retrieve the Intent assoicated with our DetailActivity via the `getIntent()` call. |
| 7. | Obtain name, description and propellant of our Spacecraft via the `getExtras()` method calls of our Intent.Then set those values to our TextView objects. |

```java
package com.tutorials.hp.firebaselistviewmdetail;

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

#### 3\. Our Layouts

##### (a). activity_main.xml

- This layout gets inflated to MainActivity user interface.
- It includes the content_main.xml.
- MainActivity is our Master View.

```xml
<?xml version="1.0" encoding="utf-8"?>
<android.support.design.widget.CoordinatorLayout

    android_layout_width="match_parent"
    android_layout_height="match_parent"
    android_fitsSystemWindows="true"
    tools_context="com.tutorials.hp.firebaselistviewmdetail.MainActivity">

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

This layout gets included in your activity_main.xml. We define our [ListView](https://camposha.info/android/listview) here.

- Our Master View
- Holds our ListView

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
    tools_context="com.tutorials.hp.firebaselistviewmdetail.MainActivity"
    tools_showIn="@layout/activity_main">

    <ListView
        android_id="@+id/lv"
        android_layout_width="match_parent"
        android_layout_height="wrap_content"
         />
</RelativeLayout>
```

##### (c). InputDialog.xml

This is layout will get inflated into a Dialog.

The dialog will have a couple of EditTexts and a Button for saving data to Firebase.

Basically this will be our input dialog.

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

##### (c).Model.xml

This is the custom row model for our ListView. It basically defines how each ListViewItem will appear.

In our case we have multiple TextViews to display the properties of each Spacecraft. At the root we have a CardView:

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

#### (d). activity_detail.xml

This is the main layout for our SecondActivity.java which is our DetailActivity. This layout is basically similar to `activity_main.xml`.

```xml
<?xml version="1.0" encoding="utf-8"?>
<android.support.design.widget.CoordinatorLayout

    android_layout_width="match_parent"
    android_layout_height="match_parent"
    android_fitsSystemWindows="true"
    tools_context="com.tutorials.hp.firebaselistviewmdetail.DetailActivity">

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

##### (e).ContentDetail.xml

This layout will get included in the `activity_detail.xml`.

We add a CardView with a couple of TextViews here that will be used to render data from the Master [activity](https://camposha.info/android/activity).

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
    tools_context="com.tutorials.hp.firebaselistviewmdetail.DetailActivity"
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
| GitHub Browse | [Browse](https://github.com/Oclemy/Firebase-ListView-MDetail) |
| GitHub Download Link | [Download](https://github.com/Oclemy/Firebase-ListView-MDetail/archive/master.zip) |
| Video Tutorial | [Video](http://www.youtube.com/watch?v=AXmiZl03Rb4) |

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
10. You'll need to head over to Firebase Console, create app, then download configuration file and add to your project in the app folder.You also have to allow writes and reads from the FirebaseDatabase without authentication.

## Example 4: Android Firebase ListView – Write, Read, Scroll to Last Added Item

This is an android Firebase ListView Write, Read and Scroll to Last saved or added item position.

We insert or save data to firebase. After saving data, we automatically fetch or read data from the firebase.

Then populate a custom listview with cardviews. The CardViews have several textviews to display our data.

We then smooth scroll automatically to the last item in the listview.

This tutorial was requested by a community member in our Youtube Channel [ProgrammingWizards TV](https://www.youtube.com/c/programmingwizards).

## **We are Building a Vibrant YouTube Community**

We have a fast rising YouTube Channel of friends. So far we've accumulated more than 2.6 million agreggate views and more than 10,000 subscribers. Here's the Channel: [ProgrammingWizards TV](https://www.youtube.com/c/programmingwizards).

Please go ahead subscribe(free obviously) as well. If you have a question or a comment you can post there instead of in this site.People are suggesting us tutorials to do there so you can too.

Here's this tutorial in Video Format.

## **Firebase Pre-requisites**

To work with Firebase from android, you need the following:

1. An android device/emulator running Android 4.0(Ice Cream Sandwich) or newer and Google Play Services 15.0.0 or higher.
2. [Android Studio](http://developer.android.com/sdk?authuser=0). Prefer later versions.

## **1\. Create Android Studio Application**

Go over to android studio and create a project as usual. You can choose Empty Activity.

## **2\. Create Firebase App in Firebase Console**

Switch on your internet and go to Firebase Console in your browser. You'll need a Gmail account to login. First you need to create a Firebase App in the online [Firebae Console](https://console.firebase.google.com/?authuser=0).

Then Click Add Project.

Then Click Add App as below:

![](https://camposha.info/wp-content/uploads/source/firebase/firebase-listview-scroll/add_app-300x206.png)

Then choose Android as we are creating android app.

![](https://camposha.info/wp-content/uploads/source/firebase/firebase-listview-scroll/choose_android-300x126.png) .

## **3\. Register App**

After creating a Firebase App you need to associate it with your android application. We call this registering your android app.

![](https://camposha.info/wp-content/uploads/source/firebase/firebase-listview-scroll/register_app-300x264.png)

You need to type the Android application's package name. You can get this in your app level build.gradle.

Then click next.

## **4\. Download google-services.json**

Next we download a `google-services.json` file which will contain our configurations.

It will be generated automatically. Just click download to download it.

![](https://camposha.info/wp-content/uploads/source/firebase/firebase-listview-scroll/download_google_services_json-300x286.png)

.

Let's now move to Android Studio

## **5\. Copy google-services.json to Your App Folder**

In your project, there is an app folder. Copy the downloaded `google-services.json` there.

You can do this in two ways. First navigate over to project files and just copy paste the file as below:

![](https://camposha.info/wp-content/uploads/source/firebase/firebase-listview-scroll/copy_google_services_json-300x201.png)

.

Alternatively, just move over to the folder via File Explorer and paste the file.

![](https://camposha.info/wp-content/uploads/source/firebase/firebase-listview-scroll/app_folder-300x115.png) .

We now need to add Firebase SDK to our android application.

So let's proceed to writing simple gradle statements.

## **Build.Gradle(Project Level)**

### **(a). Add Google Services Class Path**

Go to your open project level or root level `build.gradle` and specify the class path of google-services plugin.

```groovy
buildscript {

    repositories {
        google()
        jcenter()
    }
    dependencies {
        classpath 'com.android.tools.build:gradle:3.0.1'
        classpath 'com.google.gms:google-services:3.1.0'

        // NOTE: Do not place your application dependencies here; they belong
        // in the individual module build.gradle files
    }
}
```

Please don't forget to register the class path for google-services. Failure to do so will lead to you getting `Default FirebaseApp is not initialized` illegal state exception at runtime.

### **(b). Register Google Maven's Repository**

This you do in your project level build.gradle as well under the allProjects repositories:

```gradle
        maven {
            url "https://maven.google.com" // Google's Maven repository
        }
```

So our project level build.gradle should like this:

```groovy
// Top-level build file where you can add configuration options common to all sub-projects/modules.

buildscript {

    repositories {
        google()
        jcenter()
    }
    dependencies {
        classpath 'com.android.tools.build:gradle:3.0.1'
        classpath 'com.google.gms:google-services:3.1.0'

        // NOTE: Do not place your application dependencies here; they belong
        // in the individual module build.gradle files
    }
}

allprojects {
    repositories {
        google()
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

## **Build.Gradle(App Level)**

## **(a). Add Firebase Dependencies**

Go over to app level build.gradle and add Firebase dependencies.

In this case we require two:

1. Firebase Core - The core classes for Firebase.
2. FirebaseDatabase - To allow us perform CRUD Firebase Operations.

```groovy
    implementation 'com.google.firebase:firebase-core:11.8.0'
    implementation 'com.google.firebase:firebase-database:11.8.0'
```

## **(b).Apply Google Services Plugin**

In the same app level build.gradle, apply the google services plugin just below the dependencies:

```groovy
apply plugin: 'com.google.gms.google-services'
```

Please don't forget to apply this plugin. Failure to do so will lead to you getting `Default FirebaseApp is not initialized` illegal state exception at runtime.

So it the app level build.gradle should look like this:

```groovy
apply plugin: 'com.android.application'

android {
    compileSdkVersion 26
    defaultConfig {
        applicationId "info.camposha.firebaselistviewscroller"
        minSdkVersion 14
        targetSdkVersion 26
        versionCode 1
        versionName "1.0"
        testInstrumentationRunner "android.support.test.runner.AndroidJUnitRunner"
    }
    buildTypes {
        release {
            minifyEnabled false
            proguardFiles getDefaultProguardFile('proguard-android.txt'), 'proguard-rules.pro'
        }
    }
}

dependencies {
    implementation fileTree(dir: 'libs', include: ['*.jar'])
    testImplementation 'junit:junit:4.12'
    implementation 'com.android.support:appcompat-v7:26.+'
    implementation 'com.android.support:design:26.+'
    implementation 'com.android.support:cardview-v7:26.+'
    implementation 'com.google.firebase:firebase-core:11.8.0'
    implementation 'com.google.firebase:firebase-database:11.8.0'
    testImplementation 'junit:junit:4.12'

}
apply plugin: 'com.google.gms.google-services'
```

## **RESOURCES**

## **colors.xml**

We are creating and using custom material theme or style to use with our application. Go check the demo or video to see it.

So we need some custom material colors.

Copy paste this code into colors.xml located in the `res/values` folder.

You can of course change the colors.

```xml
<?xml version="1.0" encoding="utf-8"?>
<resources>
    <!--<color name="colorPrimary">#3F51B5</color>-->
    <!--<color name="colorPrimaryDark">#303F9F</color>-->
    <color name="colorAccent">#FF4081</color>

    <color name="colorPrimary">#f39c12</color>
    <!--<color name="colorPrimaryDark">#125688</color>-->

    <color name="colorPrimaryDark">#FFC107</color>
    <color name="textColorPrimary">#FFFFFF</color>
    <color name="windowBackground">#FFFFFF</color>
    <color name="navigationBarColor">#000000</color>
    <!--<color name="colorAccent">#c8e8ff</color>-->
</resources>
```

## **styles.xml**

We come here and create a custom material design theme that we will be using.

Here's the code. You can just copy paste this.

```xml
<resources>

    <!-- Base application theme. -->
    <style name="AppTheme" parent="Theme.AppCompat.Light.DarkActionBar">
        <!-- Customize your theme here. -->
        <item name="colorPrimary">@color/colorPrimary</item>
        <item name="colorPrimaryDark">@color/colorPrimaryDark</item>
        <item name="colorAccent">@color/colorAccent</item>

    </style>

    <style name="MyMaterialTheme" parent="MyMaterialTheme.Base">

    </style>

    <style name="MyMaterialTheme.Base" parent="Theme.AppCompat.Light.DarkActionBar">
        <item name="windowNoTitle">false</item>
        <item name="windowActionBar">true</item>
        <item name="colorPrimary">@color/colorPrimary</item>
        <item name="colorPrimaryDark">@color/colorPrimaryDark</item>
        <item name="colorAccent">@color/colorAccent</item>
    </style>

</resources>
```

## **styles.xml(v21)**

Also create a secondary style in the `res/values` folder. Name it `styles-v21`.

This will be used for Android Lollipop.

```xml
<resources>

    <style name="MyMaterialTheme" parent="MyMaterialTheme.Base">
        <item name="android:windowContentTransitions">true</item>
        <item name="android:windowAllowEnterTransitionOverlap">true</item>
        <item name="android:windowAllowReturnTransitionOverlap">true</item>
        <item name="android:windowSharedElementEnterTransition">@android:transition/move</item>
        <item name="android:windowSharedElementExitTransition">@android:transition/move</item>
    </style>
</resources>
```

## **AndroidManifest.xml**

Those styles we created have to be supplied in our `application` element's theme attribute in our `AndroidManifest.xml` for them to be applied.

```xml
<application
    ...
    android_theme="@style/MyMaterialTheme"
    ...>
```

Also we need to add permission for internet connectivity.

```xml
    <uses-permission android_name="android.permission.INTERNET"/>
```

Here's the full code. If you copy paste this then change the package name to your package name.

```xml
<?xml version="1.0" encoding="utf-8"?>
<manifest
    package="info.camposha.firebaselistviewscroller">

    <uses-permission android_name="android.permission.INTERNET"/>

    <application
        android_allowBackup="true"
        android_icon="@mipmap/ic_launcher"
        android_label="@string/app_name"
        android_roundIcon="@mipmap/ic_launcher_round"
        android_supportsRtl="true"
        android_theme="@style/MyMaterialTheme">
        <!--android:theme="@style/AppTheme">-->
        <activity android_name=".MainActivity">
            <intent-filter>
                <action android_name="android.intent.action.MAIN" />

                <category android_name="android.intent.category.LAUNCHER" />
            </intent-filter>
        </activity>
    </application>

</manifest>
```

## **activity_main.xml**

In android user interfaces can be created either programmatically or via XML layouts.

The latter is the most common as its the most flexible yet the easiest way.

XML stands for eXtensible Markup Language. We can use it not only to create user interfaces, but also to exchange data.

We start by specifying our root element, in this case a RelativeLayout, which normally arranges items `relative` to each other.

Inside it at the top we have a TextView, which is a view mostly used to render static text. Think of something like a label. In this case we use it to show the header of our application.

Then we also add a `ListView` element. This ListView wiil display our data vertically, in a one dimensional manner. The ListView has to be assigned a unique id since it will be referenced from the java code.

We will place it below the header TextView by using the `android:layout_below`.

We will always be showing a `fastScroll`. Using this users can scroll through the data. It will be always visible, whether our data exceeds the viewport or not. This is optional.

```xml
    android_fastScrollAlwaysVisible="true"
```

Moreover the ListView will be aligned to the left and start of the parent.

Then to the bottom right of our parent, which in this case is the `RelativeLayout`, we will display a `FloatingActionButton`.

When this `FAB` button is clicked, an input form will be displayed for users to enter data to be sent to Firebase Realtime Database.

We set it's layout gravity to `bottom|end` to place it at the bottom of the screen.

```xml
<?xml version="1.0" encoding="utf-8"?>
<RelativeLayout

    android_layout_width="match_parent"
    android_layout_height="match_parent"
    tools_context="info.camposha.firebaselistviewscroller.MainActivity">

    <TextView
        android_id="@+id/headerTextView"
        android_layout_width="match_parent"
        android_layout_height="wrap_content"
        android_text="Zen Quotes App"
    android_textStyle="bold"
        android_textAlignment="center"
        android_textAppearance="@style/TextAppearance.AppCompat.Large"
        android_textColor="@color/colorAccent" />

    <ListView
        android_id="@+id/myListView"
        android_layout_width="match_parent"
        android_layout_height="wrap_content"
        android_layout_alignParentLeft="true"
        android_layout_alignParentStart="true"
        android_fastScrollAlwaysVisible="true"
        android_layout_below="@+id/headerTextView"
        android_layout_marginTop="30dp" />

    <android.support.design.widget.FloatingActionButton
        android_id="@+id/fab"
        android_layout_width="wrap_content"
        android_layout_height="wrap_content"
        android_layout_alignParentBottom="true"
        android_layout_alignParentEnd="true"
        android_layout_alignParentRight="true"
        android_layout_gravity="bottom|end"
        android_src="@android:drawable/ic_dialog_email" />

</RelativeLayout>
```

## **model.xml**

This is a layout that will define how each row in our listview will appear.

That's why we call it `model`. Our ListView is custom and will be rendering CardViews with multiple Texts. The data will be coming from Firebase Realtime database.

So we place a CardView as a root element of our layout. I have set my `cardCornerRadius` to `5p`, my `cardElevation` to `10dp` and the height to `200dp`.

I will use a LinearLayout to arrange items in a vertical manner. These items are basically TextViews.

They will display details of each `Teacher` object, like `name`,`quote` and `description`.

Here's the full source code:

```xml
<?xml version="1.0" encoding="utf-8"?>
<android.support.v7.widget.CardView

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
                android_id="@+id/nameTextView"
                android_padding="10dp"
                android_textColor="@color/colorAccent"
                android_textStyle="bold"
                android_layout_alignParentLeft="true" />

            <TextView
                android_layout_width="wrap_content"
                android_layout_height="wrap_content"
                android_textAppearance="?android:attr/textAppearanceLarge"
                android_text="Quote....................."
                android_lines="3"
                android_id="@+id/quoteTextView"
                android_padding="10dp"
                android_layout_alignParentLeft="true" />

            <TextView
                android_layout_width="wrap_content"
                android_layout_height="wrap_content"
                android_textAppearance="?android:attr/textAppearanceMedium"
                android_text="Description........."
                android_textStyle="italic"
                android_id="@+id/descriptionTextView" />

    </LinearLayout>

</android.support.v7.widget.CardView>
```

## **input_dialog.xml**

So I now create another layout file called `input_dialog.xml`.

This layout will define for us a Form, an input form we will use to save data to Firebase. User will type data and click `save` and then we send or write that data to Firebase.

Immediately data will be retrieved and our ListView will get populated. All this happens in realtime since we are using the powerful Firebase Realtime database.

In my Form I will TextViews, EditTexts ad a save button.

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
        android_paddingTop="30dp">

        <TextView
            android_id="@+id/headerTextView"
            android_layout_width="match_parent"
            android_layout_height="wrap_content"
            android_text="Enter Teacher Details"
            android_textAlignment="center"
            android_textAppearance="@style/TextAppearance.AppCompat.Large"
            android_textColor="@color/colorAccent" />

            <EditText
                android_id="@+id/nameEditText"
                android_layout_width="match_parent"
                android_layout_height="wrap_content"
                android_singleLine="true"
                android_hint= "Teacher's Name" />
            <EditText
                android_id="@+id/quoteEditText"
                android_layout_width="match_parent"
                android_layout_height="wrap_content"
                android_singleLine="true"
                android_hint= "Teacher's Quote" />

            <EditText
                android_id="@+id/descEditText"
                android_layout_width="match_parent"
                android_layout_height="wrap_content"
                android_singleLine="true"
                android_hint= "Teacher's Description" />

        <Button android_id="@+id/saveBtn"
            android_layout_width="match_parent"
            android_layout_height="wrap_content"
            android_text="Save"
            android_background="@color/colorAccent"
            android_layout_marginTop="20dp"
            android_textColor="@android:color/white"/>

    </LinearLayout>

</LinearLayout>
```

Let's now move to our java code.

## **Java Code**

We have multiple classes but only two files:

1. `Teacher.java` - Our model class.
2. `MainActivity.java` - To contain three inner clases.

Doing it this way makes it easy for beginners to copy paste the code and edit it without creating a bunch of java files.

Let's start.

## **Teacher.java**

This is our model class. It represents a single Teacher. It is our data object.

This class is very important in the way we are working with Firebase. This is because we are saving type safe classes to Firebase.

Then Firebase will automatically read this class and create a JSONObject based on our class names and properties.

You must supply an empty constructor for the class.

```java
package info.camposha.firebaselistviewscroller;

public class Teacher {
    String name, propellant, description;

    public Teacher() {
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

## **MainActivity.java**

Let's move line by line for our main activity.

### **1\. Create Class,Package and Add Imports**

Android projects are normally written in java and kotlin. In both classes are entities to encapsulate code and classes themselves are hosted in packages.

```java
package info.camposha.firebaselistviewscroller;
```

In both we add import statemments via the `import` keyword.

```java
...
import com.google.firebase.database.DataSnapshot;
import com.google.firebase.database.DatabaseError;
import com.google.firebase.database.DatabaseException;
import com.google.firebase.database.DatabaseReference;
import com.google.firebase.database.FirebaseDatabase;
import com.google.firebase.database.ValueEventListener;
...
```

A class is then created via the `class` keyword. And the accessibility modifier can be specified.

```java
public class MainActivity..{...}
```

Both being Object Oriented Programming languages, they support inheritance.

We are using java in this case. Class inheritance in java is achieved through use of the `extends` keyword:

```java
public class MainActivity extends AppCompatActivity {..}
```

That has now turned an ordinary class into a special class, an android component called [activity](https://camposha.info/android/activity).

## **3\. Create a Firebase Helper class**

A class that will be responsible for the following:

1. Writing/Saving data to Firebase From EditText.
2. Reading/Retrieving data from Firebase.
3. Setting Firebase Data to Adapter.
4. Binding the Adapter to ListView for viewability of the data.

Creating the class is easy, we do it inside the MainActivity as an inner class:

```java
public class MainActivity extends AppCompatActivity {
    public class FirebaseHelper {
        ...
    }
   ....
}
```

We will give this `FirebaseHelper` class some instance fields including:

1. DatabaseReference - Our Firebase realtime database reference, pointing us to the database.
2. Boolean field `saved` - To hold the state of our `save to firebase` attempt.
3. ArrayList `teachers` - To hold all the data we read or fetch from our firebase realtime database.
4. ListView `mListView`\- To hold a reference to the ListView which will display our data from the Firebase.
5. Context `c` - This will hold a reference that will be required while instantiating our custom adapter.

Add them inside the `FirebaseHelper` class:

```java
        DatabaseReference db;
        Boolean saved;
        ArrayList<Teacher> teachers = new ArrayList<>();
        ListView mListView;
        Context c;
```

## **Construct our FirebaseHelper**

We have our constructor, a special method that normally gets called when a class in instantiated.

In our case we will inject several dependencies to our class via the constructor.

These include the:

- Firebase DatabaseReference object.
- Context object.
- ListView object.

We will also invoke a method called `retrieve()` which will peform our firebase data retrieval.

```java
         public FirebaseHelper(DatabaseReference db, Context context, ListView mListView) {
            this.db = db;
            this.c = context;
            this.mListView = mListView;
            this.retrieve();
        }
```

## **How to Save Data to Firebase Database**

Saving data to Firebase database is very easy. This saving is sometimes called a `write` operation. Or `insert`.

We can easily save a custom object like say `User` or `Teacher` into firebase database. Then these will be stored in a JSONObject-like nodes.

To save data to Firebase from our app, first let's create a method called `save()` that takes in a custom POJO object like `Teacher`:

```java
        public Boolean save(Teacher teacher) {
            //save
        }
```

In this case the method is returing a Boolean value representing our success state.

Then we first check whether we have valid data. If null is passed to us we just ignore the process and return from execution without saving:

```java
            if (teacher == null) {
                saved = false;
            }
```

Otherwise we create a try-catch block to catch any runtime exceptions without crashing our app:

```java
            try {
                   //save here
                   saved=true;
                } catch (DatabaseException e) {
                    e.printStackTrace();
                    saved = false;
                }
```

In Firebase multiple users can save data at the same time by pushing the data via the `push()` method.

```java
...push()...
```

But first you need the Child node(like a Table) where we push that data. We can get it from our `DatabaseReference` object

```java
db.child("Teacher")...
```

We set the value we want to push or save to Firebase database via the `setValue()` method.

So this simple statement will push for us our data.

```java
                    db.child("Teacher").push().setValue(teacher);
```

## **How to Read/Retrieve Data From Firebase**

There are two main ways of reading data from Firebase database:

1. Using ChildEventListener - Read and Return data node by node.
2. Uisng ValueEventListener - Read all data at once and return it.

The most commonly used way is the `ChildEventListener` method. However, our app in this case massively suits us to do it the second way, using the `ValueEventListener`. Why?

Well remember we want to write and read data to firebase then scroll over to the last added item. So we need all the data so that we can only scroll at the end, to the last added item.

So first we create a method called `retrieve()`. This method will retrieve data and bind to our ListView.

It can also return that data if you want to use it somewhere.

```java
        public ArrayList<Teacher> retrieve() {..}
```

First we need to reference the child node in our database, where our data is stored like a Table:

```java
db.child("Teacher")
```

Then add `ValueEventListener` to it:

```java
db.child("Teacher").addValueEventListener(...)
```

Then pas it an annonymous class that contains our callbacks. These callbacks will handle our events.

The callbacks are:

1. `onDataChange()` - When our data changes, we can read or retrieve the whole list of data at once.
2. `onCancelled()` - When an error is encountered the read operation is cancelled.

```java
db.child("Teacher").addValueEventListener(new ValueEventListener() {
                @Override
                public void onDataChange(DataSnapshot dataSnapshot) {
                    //read data
                    }
                }
                @Override
                public void onCancelled(DatabaseError databaseError) {
                    //handle data
                }
            });
```

To read our data first we will clear the arraylist that will be containing that data:

```java
                    teachers.clear();
```

This avoids duplication.

Then we will check if our data snapshot actually exists and that it has some children. We don't want to be reading empty space.

```java
  if (dataSnapshot.exists() && dataSnapshot.getChildrenCount() > 0) {...}
```

Then get the children and actually loop through them:

```java
 for (DataSnapshot ds : dataSnapshot.getChildren()) {..}
```

Inside the loop, for each iteration we will actually read the individual data items via the `getValue()` method of our `DataSnapshot` object. Then we pass it the generic class so that it converts it to our POJO:

```java
Teacher teacher = ds.getValue(Teacher.class);
```

But we also have to populate the arraylist so that we have the data we will fill our ListView with:

```java
                            teachers.add(teacher);
```

Then outside the loop we will instantiate our adapter. ListView is an adapterview and needs an adapter, especially given we are working with complex data(POJOs).

```java
                        adapter = new CustomAdapter(c, teachers);
```

Then set the adapter to listview via the `setAdapter()`.

```java
                        mListView.setAdapter(adapter);
```

## **How to Smooth Scroll ListView to Recently Added Firebase Item**

To scroll to the last added item in our ListView, we will make our ListView only scroll to the specified adapter position only when the user interface thread is ready.

Othwerwise we risk the scroll not happening as we expect since the user interface is going to be doing alot at this time.

So we use a `Handler`, a class that residing in the `android.os` package which can allow us not only to schedule tasks but also enqueue them.

We are interested in this case in the latter, enqueueing. The Handler does this just within the same thread.

So our scroll task will be enqueued and performed only when the UI thread is ready.

```java
                        new Handler().post(new Runnable() {
                            @Override
                            public void run() {
                                mListView.smoothScrollToPosition(teachers.size());
                            }
                        });
```

## **How to Use BaseAdapter with Firebase Data**

Now that we've seen how to fetch firebase data, we need to see how to bind them to a custom listview.

For that we need an adapter. In android there are several adapter implementations.

The most popular and commonly used with Adapterviews like ListView and GridView is the `BaseAdapter`.

Alot of the other adapters like `ArrayAdapter` actually derive from this `baseadapter`.

To use it we extend it:

```java
    class CustomAdapter extends BaseAdapter {..}
```

However, since it's abstract we'll need to implement it's method:

```java
        @Override
        public int getCount() {
            return teachers.size();
        }

        @Override
        public Object getItem(int position) {
            return teachers.get(position);
        }

        @Override
        public long getItemId(int position) {
            return position;
        }

        @Override
        public View getView(int position, View convertView, ViewGroup parent) {
            ....
            return convertView
        }
```

We perform layout inflation and data binding inside the `getView()` method.

We also listen to our custom listview click events and show the clicked item in a Toast message.

Check the full source code below.

## **How to Create an Input Form in a Custom Dialog**

To actually save data to firebase, that data needs to be typed. Well we need a form where the user types the data.

One way would be to open a new activity to render the form. Another way would be fragment.

Or an even easier way would be to just create a custom dialog that has that form.The dialog can then be invoked or shown when the user clicks the Floating Action Button.

Creating a dialog is very east, you just instantiate the `android.app.Dialog` class:

```java
        Dialog d = new Dialog(this);
```

Then set the title:

```java
        d.setTitle("Save To Firebase");
```

Then what makes it a custom dialog is the fact that we are inflating a custom layout and using it as the content view of the dialog:

```java
        d.setContentView(R.layout.input_dialog);
```

Now we can come and listen to save button click events:

```java
        saveBtn.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                //validate
                //save
                //refresh listview
            }
```

After obtaining the values of the EditTexts, we can pass them to our POJO class, then perform basic validation:

```java
                if (name != null && name.length() > 0) {
                    //now save to firebase
                }
```

To actually save:

```java
                    if (helper.save(s)) {
                        //successfully saved
                        //now refresh listview
                    }
```

Then we refresh the ListView and move to the last saved item.

```java
                        ArrayList<Teacher> fetchedData = helper.retrieve();
                        adapter = new CustomAdapter(MainActivity.this, fetchedData);
                        mListView.setAdapter(adapter);
                        mListView.smoothScrollToPosition(fetchedData.size());
```

We agreed, remember that we move to a given adapter position in the ListView by invoking the `smoothScrollToPosition()` method,passing in the position.

Hey, here's the full source code of `MainActivity.java`:

## Full Code

```java
package info.camposha.firebaselistviewscroller;

import android.app.Dialog;
import android.content.Context;
import android.os.Bundle;
import android.os.Handler;
import android.support.design.widget.FloatingActionButton;
import android.support.v7.app.AppCompatActivity;
import android.util.Log;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.BaseAdapter;
import android.widget.Button;
import android.widget.EditText;
import android.widget.ListView;
import android.widget.TextView;
import android.widget.Toast;

import com.google.firebase.database.DataSnapshot;
import com.google.firebase.database.DatabaseError;
import com.google.firebase.database.DatabaseException;
import com.google.firebase.database.DatabaseReference;
import com.google.firebase.database.FirebaseDatabase;
import com.google.firebase.database.ValueEventListener;

import java.util.ArrayList;

public class MainActivity extends AppCompatActivity {
    /**********************************FIREBASE HELPER START************************/
    public class FirebaseHelper {

        DatabaseReference db;
        Boolean saved;
        ArrayList<Teacher> teachers = new ArrayList<>();
        ListView mListView;
        Context c;

        /*
       let's receive a reference to our FirebaseDatabase
       */
        public FirebaseHelper(DatabaseReference db, Context context, ListView mListView) {
            this.db = db;
            this.c = context;
            this.mListView = mListView;
            this.retrieve();
        }

        /*
        let's now write how to save a single Teacher to FirebaseDatabase
         */
        public Boolean save(Teacher teacher) {
            //check if they have passed us a valid teacher. If so then return false.
            if (teacher == null) {
                saved = false;
            } else {
                //otherwise try to push data to firebase database.
                try {
                    //push data to FirebaseDatabase. Table or Child called Teacher will be created.
                    db.child("Teacher").push().setValue(teacher);
                    saved = true;

                } catch (DatabaseException e) {
                    e.printStackTrace();
                    saved = false;
                }
            }
            //tell them of status of save.
            return saved;
        }

        /*
        Retrieve and Return them clean data in an arraylist so that they just bind it to ListView.
         */
        public ArrayList<Teacher> retrieve() {
            db.child("Teacher").addValueEventListener(new ValueEventListener() {
                @Override
                public void onDataChange(DataSnapshot dataSnapshot) {
                    teachers.clear();
                    if (dataSnapshot.exists() && dataSnapshot.getChildrenCount() > 0) {
                        for (DataSnapshot ds : dataSnapshot.getChildren()) {
                            //Now get Teacher Objects and populate our arraylist.
                            Teacher teacher = ds.getValue(Teacher.class);
                            teachers.add(teacher);
                        }
                        adapter = new CustomAdapter(c, teachers);
                        mListView.setAdapter(adapter);

                        new Handler().post(new Runnable() {
                            @Override
                            public void run() {
                                mListView.smoothScrollToPosition(teachers.size());
                            }
                        });
                    }
                }

                @Override
                public void onCancelled(DatabaseError databaseError) {
                    Log.d("mTAG", databaseError.getMessage());
                    Toast.makeText(c, "ERROR " + databaseError.getMessage(), Toast.LENGTH_LONG).show();

                }
            });

            return teachers;
        }

    }

    /**********************************CUSTOM ADAPTER START************************/
    class CustomAdapter extends BaseAdapter {
        Context c;
        ArrayList<Teacher> teachers;

        public CustomAdapter(Context c, ArrayList<Teacher> teachers) {
            this.c = c;
            this.teachers = teachers;
        }

        @Override
        public int getCount() {
            return teachers.size();
        }

        @Override
        public Object getItem(int position) {
            return teachers.get(position);
        }

        @Override
        public long getItemId(int position) {
            return position;
        }

        @Override
        public View getView(int position, View convertView, ViewGroup parent) {
            if (convertView == null) {
                convertView = LayoutInflater.from(c).inflate(R.layout.model, parent, false);
            }

            TextView nameTextView = convertView.findViewById(R.id.nameTextView);
            TextView quoteTextView = convertView.findViewById(R.id.quoteTextView);
            TextView descriptionTextView = convertView.findViewById(R.id.descriptionTextView);

            final Teacher s = (Teacher) this.getItem(position);

            nameTextView.setText(s.getName());
            quoteTextView.setText(s.getPropellant());
            descriptionTextView.setText(s.getDescription());

            //ONITECLICK
            convertView.setOnClickListener(new View.OnClickListener() {
                @Override
                public void onClick(View v) {
                    Toast.makeText(c, s.getName(), Toast.LENGTH_SHORT).show();
                }
            });
            return convertView;
        }
    }

    /**********************************MAIN ACTIVITY CONTINUATION************************/
    //instance fields
    DatabaseReference db;
    FirebaseHelper helper;
    CustomAdapter adapter;
    ListView mListView;
    EditText nameEditTxt, quoteEditText, descriptionEditText;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);

        mListView = (ListView) findViewById(R.id.myListView);
        //initialize firebase database
        db = FirebaseDatabase.getInstance().getReference();
        helper = new FirebaseHelper(db, this, mListView);

        FloatingActionButton fab = (FloatingActionButton) findViewById(R.id.fab);
        fab.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View view) {
                mListView.smoothScrollToPosition(4);
                displayInputDialog();
            }
        });
    }

    //DISPLAY INPUT DIALOG
    private void displayInputDialog() {
        //create input dialog
        Dialog d = new Dialog(this);
        d.setTitle("Save To Firebase");
        d.setContentView(R.layout.input_dialog);

        //find widgets
        nameEditTxt = d.findViewById(R.id.nameEditText);
        quoteEditText = d.findViewById(R.id.quoteEditText);
        descriptionEditText = d.findViewById(R.id.descEditText);
        Button saveBtn = d.findViewById(R.id.saveBtn);

        //save button clicked
        saveBtn.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {

                //get data from edittexts
                String name = nameEditTxt.getText().toString();
                String quote = quoteEditText.getText().toString();
                String description = descriptionEditText.getText().toString();

                //set data to POJO
                Teacher s = new Teacher();
                s.setName(name);
                s.setPropellant(quote);
                s.setDescription(description);

                //perform simple validation
                if (name != null && name.length() > 0) {
                    //save data to firebase
                    if (helper.save(s)) {
                        //clear edittexts
                        nameEditTxt.setText("");
                        quoteEditText.setText("");
                        descriptionEditText.setText("");

                        //refresh listview
                        ArrayList<Teacher> fetchedData = helper.retrieve();
                        adapter = new CustomAdapter(MainActivity.this, fetchedData);
                        mListView.setAdapter(adapter);
                        mListView.smoothScrollToPosition(fetchedData.size());
                    }
                } else {
                    Toast.makeText(MainActivity.this, "Name Must Not Be Empty Please", Toast.LENGTH_SHORT).show();
                }
            }
        });

        d.show();
    }

}
```

## **Result**

Here's our result, Firebase ListView with CardViews - Write/Save data and Read/Retrieve data and scroll to last saved item.

![](https://camposha.info/wp-content/uploads/source/firebase/firebase-listview-scroll/demo1.gif)

## **Issues to Keep in Mind**

1. If you are getting a java.lang.illegalStateException after following the above steps then it means you have missed a step. This error gets raised if you are trying to access the FirebaseDatabase without initialization.

The most common error is missing to apply the google services plugin or forgetting to register its class path in our app level and project level buil.gradle files respectively.

1. Your POJO class must be a standalone class and not an inner class. Otherwise you'll get errors at runtime that your POJO/Data Object class does not define an empty constructor, even uf it does.
2. You must add internet permission in your AndroidManifest.xml or else you cannot make Firebase API calls. Some emulators do not access internet by default, so open up a browser and ensure you can access internet first.

Best Regards.
