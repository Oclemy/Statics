# Android Firebase Database with Spinnner Simple CRUD

_Android Firebase Realtime Database Spinner Examples._

This is an android Firebase realtime database with Spinner tutorial.


### 1\. Android Firebase - Spinner - Save,Retrieve then Show

_Hello guys.Here is the source for our android firebase spinner tutorial._

This is what we do :

- Save to Firebase from edittext in android.
- Retrieve data.
- Show in a spinner

### Setup

#### (a). Create Basic Activity Project

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

##### (e). AndroidManifest.xml

#### Java Classes

##### (a). Our Model class : Spacecraft.java

Our model class. Represents a single spacecraft with a `name` property.

```java
package com.tutorials.hp.firebasespinner.m_Model;

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

##### (b). Our FirebaseHelper class

- Basic CRUD class.
- We perform Reads and Writes to Firebase
- We return an arraylist

```java
package com.tutorials.hp.firebasespinner.m_FireBase;

import com.google.firebase.database.ChildEventListener;
import com.google.firebase.database.DataSnapshot;
import com.google.firebase.database.DatabaseError;
import com.google.firebase.database.DatabaseException;
import com.google.firebase.database.DatabaseReference;
import com.tutorials.hp.firebasespinner.m_Model.Spacecraft;

import java.util.ArrayList;

public class FirebaseHelper {

    DatabaseReference db;
    Boolean saved=null;

    public FirebaseHelper(DatabaseReference db) {
        this.db = db;
    }

    //SAVE
    public  Boolean save(Spacecraft spacecraft)
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
        final ArrayList<String> spacecrafts=new ArrayList<>();

        db.addChildEventListener(new ChildEventListener() {
            @Override
            public void onChildAdded(DataSnapshot dataSnapshot, String s) {
                fetchData(dataSnapshot,spacecrafts);
            }

            @Override
            public void onChildChanged(DataSnapshot dataSnapshot, String s) {
                fetchData(dataSnapshot,spacecrafts);

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

    private void fetchData(DataSnapshot snapshot,ArrayList<String> spacecrafts)
    {
        spacecrafts.clear();
        for (DataSnapshot ds:snapshot.getChildren())
        {
            String name=ds.getValue(Spacecraft.class).getName();
            spacecrafts.add(name);
        }

    }
}
```

##### (d). Our MainActivity class

- Our launcher activity
- Show Input Dialog
- Initialize UI views

```java
package com.tutorials.hp.firebasespinner;

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

import com.google.firebase.database.DatabaseReference;
import com.google.firebase.database.FirebaseDatabase;
import com.tutorials.hp.firebasespinner.m_FireBase.FirebaseHelper;
import com.tutorials.hp.firebasespinner.m_Model.Spacecraft;

import java.util.ArrayList;

public class MainActivity extends AppCompatActivity {

    DatabaseReference db;
    FirebaseHelper helper;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);
        Toolbar toolbar = (Toolbar) findViewById(R.id.toolbar);
        setSupportActionBar(toolbar);

        Spinner sp= (Spinner) findViewById(R.id.sp);

        //SETUP FB
        db=FirebaseDatabase.getInstance().getReference();
        helper=new FirebaseHelper(db);

        sp.setAdapter(new ArrayAdapter<String>(this,android.R.layout.simple_list_item_1,helper.retrieve()));

        FloatingActionButton fab = (FloatingActionButton) findViewById(R.id.fab);
        fab.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View view) {
                 displayInputDialog();
            }
        });
    }

    //DISPLAY INPUT DILAOG
     private void displayInputDialog()
     {
         Dialog d=new Dialog(this);
         d.setTitle("Firebase database");
         d.setContentView(R.layout.input_dialog);

         final EditText nameTxt= (EditText) d.findViewById(R.id.nameEditText);
         Button saveBtn= (Button) d.findViewById(R.id.saveBtn);

         //SAVE
         saveBtn.setOnClickListener(new View.OnClickListener() {
             @Override
             public void onClick(View v) {
                 //GET DATA
                 String name=nameTxt.getText().toString();

                 //set data
                 Spacecraft s=new Spacecraft();
                 s.setName(name);

                 //SAVE
                 if(name != null && name.length()>0)
                 {
                     if(helper.save(s))
                     {
                         nameTxt.setText("");
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

#### 9\. Our Layouts

#### (a).activity_main.xml

This layout is generated by android studio. We don't have to modify it.

```xml
 <?xml version="1.0" encoding="utf-8"?>
<android.support.design.widget.CoordinatorLayout

    android_layout_width="match_parent"
    android_layout_height="match_parent"
    android_fitsSystemWindows="true"
    tools_context="com.tutorials.hp.firebasespinner.MainActivity">

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

#### (b).content_main.xml

This is where we add our widgets. In this case we are using spinner as our adapterview so we add it here:

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
    tools_context="com.tutorials.hp.firebasespinner.MainActivity"
    tools_showIn="@layout/activity_main">

    <Spinner
        android_id="@+id/sp"
        android_layout_width="match_parent"
        android_layout_height="wrap_content"
         />
</RelativeLayout>
```

#### (c).input_dialog.xml

- Layout for our Input Dialog.
- Acts as our input form for users to enter data and save to Firebase.

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

#### More Resources

| Resource | Link |
| --- | --- |
| GitHub Browse | [Browse](https://github.com/Oclemy/FirebaseSpinner) |
| GitHub Download Link | [Download](https://github.com/Oclemy/FirebaseSpinner/archive/master.zip) |

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
