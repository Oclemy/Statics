# Android MySQL Fast Networking Library - INSERT SELECT SHOW

In this tutorial we want to explore several beginner friendly fast Networking Library examples with MySQL database and several adapterveiws. These adapterviews include gridview and listview.

Here's what you will learn:

1. How to insert data from edittext, checkbox and spinner to mysql database from an android app,
2. How to select data from mysql database and show in gridview or listview .


We will cover these using full examples.

## Example 1: Android MySQL – Insert From EditText,CheckBox,Spinner

_Android PHP MySQL tutorial. How to Insert to MySQL From Editext, CheckBox and Spinner, then Select and show in ListView._

Today we want to explore how to save several data types into MySQL database from our android application.We want to save boolean and strings to mysql database.The components acting as our input views include edittext,spinner and checkbox .We have a fictional spacecraft with a String property name,String property propellant as well as boolean/integer property 'does technology exist';

![MySQL Insert From CheckBox,Spinner](http://res.cloudinary.com/oclemy/image/upload/v1477806689/MySQL/CheckBox%20Insert/MySQL_CheckBox_Insert_First_Demo.png)

#### What we do :

- User types into EditText,Selects from spinner and checks/unchecks the checkbox.
- We fetch this data and make a HTTP POST request to the server.
- Our MySQL database is hosted locally in localhost.
- The request happens in the background thread.
- We are returned a response depending on the success or failure of the operation.
- If successfull we reset our input views.
- We are using Android Networking library by Amit Shekhar.

#### Common Questions we answer :

- Save Boolean to MySQL database.
- Save Integers or String to MySQL database.
- Map Boolean to Integers.
- Save From Android to MySQL.
- HTTP POST method.
- Background thread Android Networking.
- Save.Insert from spinner,from checkbox,from editext.
- PHP MySQL JSON Android.
- Object Oriented PHP MySQL database.

#### What You'll do :

- Create a project in android studio.
- Give it a name and choose minimum and target SDKs.
- Add permission for internet connection in your android manifest.
- Add a dependency statement for a networking library we'll use.
- Create a MySQL table and write some PHP code.
- Run your project.
- I tested mine in bluestacks emulator.

#### Overview :

Classes

1. MainActivity class
2. Spacecraft class
3. MySQLClient class.

Layouts

1. ActivityMain.xml
2. ContentMain.xml

AndroidManifest.xml

1. Add Permission for Internet

Here is the code:

_This is the part 2 of android php mysql series. How to insert, select and retrieve both boolean and text values to and from mysql database_.

#### SECTION 1 : Our Dependencies and Manifest.xml

##### Build.Gradle

- Android Studio has added for us dependencies for AppCompat and Design support libraries.
- Note we are subclassing AppCompatActivity to make our MainActivity class an activity.
- We are using Android Networking library so we need to fetch it from the jcenter.
- Add the it in your build.gradle.

```groovy
apply plugin: 'com.android.application'

android {
    compileSdkVersion 24
    buildToolsVersion "24.0.1"

    defaultConfig {
        applicationId "com.tutorials.hp.mysql_datatypes_save"
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
    compile 'com.android.support:appcompat-v7:24.2.0'
    compile 'com.android.support:design:24.2.0'
    compile 'com.amitshekhar.android:android-networking:0.2.0'

}
```

**AndroidManifest.xml**

- Add Pernmission for making internet connection as we have added below in our manifest.

```xml
<?xml version="1.0" encoding="utf-8"?>
<manifest
    package="com.tutorials.hp.mysql_datatypes_save">

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

#### Our Layouts

**ActivityMain.xml Layout.**

- Inflated as our activity's view.
- Includes our content main layout.
- Contains support.v4 widgets like Cordinatorlayout, appbarlayout, toolbar and our floating action button view.

```xml
<?xml version="1.0" encoding="utf-8"?>
<android.support.design.widget.CoordinatorLayout

    android_layout_width="match_parent"
    android_layout_height="match_parent"
    android_fitsSystemWindows="true"
    tools_context="com.tutorials.hp.mysql_datatypes_save.MainActivity">

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

**ContentMain.xml Layout.**

- Lets all our spinner,editexts and checkbox as well as buttons here.

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
    tools_context="com.tutorials.hp.mysql_datatypes_save.MainActivity"
    tools_showIn="@layout/activity_main">

    <LinearLayout
        android_orientation="vertical"
        android_layout_width="match_parent"
        android_layout_height="wrap_content">

        <android.support.design.widget.TextInputEditText
            android_id="@+id/nameTxt"
            android_hint="Name"
            android_layout_width="match_parent"
            android_layout_height="wrap_content"
            android_textStyle="bold"
            android_textSize="25dp"
            android_enabled="true"
            android_focusable="true" />

    <LinearLayout
        android_orientation="horizontal"
        android_padding="5dp"
        android_layout_width="match_parent"
        android_layout_height="wrap_content">
        <TextView
            android_textSize="25dp"
            android_text="Propellant"
            android_textStyle="bold"
            android_layout_width="250dp"
            android_layout_height="wrap_content" />
        <Spinner
            android_id="@+id/sp"
            android_textSize="25dp"
            android_textStyle="bold"
            android_layout_width="wrap_content"
            android_layout_height="wrap_content" />
        </LinearLayout>

        <LinearLayout
        android_orientation="horizontal"
            android_padding="5dp"
            android_layout_width="match_parent"
        android_layout_height="wrap_content">
        <TextView
            android_textSize="25dp"
            android_text="Technology Exists ??"

            android:textStyle="bold"
            android:layout_width="250dp"
            android:layout_height="wrap_content" />

        <CheckBox
            android:layout_width="wrap_content"
            android:layout_height="wrap_content"
            android:textSize="25dp"
            android:id="@+id/techExists"
            android:checked="true" />
        </LinearLayout>

        <RelativeLayout
            android:orientation="horizontal"
            android:layout_width="match_parent"
            android:layout_height="wrap_content">

            <Button android:id="@+id/addBtn"
                android:layout_width="wrap_content"
                android:layout_height="60dp"
                android:text="Save"
                android:clickable="true"
                android:padding="5dp"
                android:background="#009968"
                android:textColor="@android:color/white"
                android:textStyle="bold"
                android:textSize="20dp" />

        </RelativeLayout>

    </LinearLayout>
</RelativeLayout>
```

#### SECTION 2 : Data Model

**Spacecraft class.**

Main Responsibility : HOLD INFORMATION OF A SINGLE SPACECRAFT

- Is our data object.
- Shall contain properties for a spacecraft.
- Exposes these through public getters and setters.

```java
package com.tutorials.hp.mysql_datatypes_save;

public class Spacecraft {

    /*
    INSTANCE FIELDS
     */
    private int id;
    private String name;
    private String propellant;
    private int technologyExists;

    /*
    GETTERS AND SETTERS
     */
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

    public String getPropellant() {
        return propellant;
    }

    public void setPropellant(String propellant) {
        this.propellant = propellant;
    }

    public int getTechnologyExists() {
        return technologyExists;
    }

    public void setTechnologyExists(int technologyExists) {
        this.technologyExists = technologyExists;
    }

    /*
    TOSTRING
     */
    @Override
    public String toString() {
        return name;
    }
}
```

#### SECTION 3 : HTTP Client

**MySQL Client class.**

Main Responsibility : TALKS TO OUR MYSQL VIA PHP

- Is our http client class.
- Shall make HTTP POST Requests.
- We shall attach the data from our views as body parameters to be sent to the server.
- Once we send data,we receive a response in terms of json array if success or error.
- Also specifies a static constant which is our api url.

```java
package com.tutorials.hp.mysql_datatypes_save;

import android.content.Context;
import android.view.View;
import android.widget.ArrayAdapter;
import android.widget.EditText;
import android.widget.Spinner;
import android.widget.Toast;

import com.androidnetworking.AndroidNetworking;
import com.androidnetworking.common.Priority;
import com.androidnetworking.error.ANError;
import com.androidnetworking.interfaces.JSONArrayRequestListener;

import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;

import java.util.ArrayList;

public class MySQLClient {

    //SAVE/RETRIEVE URLS
    private static final String DATA_INSERT_URL="http://10.0.2.2/android/Columbia/crud.php";

    //INSTANCE FIELDS
    private final Context c;

    public MySQLClient(Context c) {
        this.c = c;

    }
    /*
    SAVE/INSERT
     */
    public void add(Spacecraft s, final View...inputViews)
    {
        if(s==null)
        {
            Toast.makeText(c, "No Data To Save", Toast.LENGTH_SHORT).show();
        }
        else
        {
            AndroidNetworking.post(DATA_INSERT_URL)
                    .addBodyParameter("action","save")
                    .addBodyParameter("name",s.getName())
                    .addBodyParameter("propellant",s.getPropellant())
                    .addBodyParameter("technologyexists",String.valueOf(s.getTechnologyExists()))
                    .setTag("TAG_ADD")
                    .build()
                    .getAsJSONArray(new JSONArrayRequestListener() {
                        @Override
                        public void onResponse(JSONArray response) {

                            if(response != null)
                                try {
                                    //SHOW RESPONSE FROM SERVER
                                    String responseString = response.get(0).toString();
                                    Toast.makeText(c, "PHP SERVER RESPONSE : " + responseString, Toast.LENGTH_SHORT).show();

                                    if (responseString.equalsIgnoreCase("Success")) {
                                        //RESET VIEWS
                                        EditText nameTxt = (EditText) inputViews[0];
                                        Spinner spPropellant = (Spinner) inputViews[1];

                                        nameTxt.setText("");
                                        spPropellant.setSelection(0);
                                    }else
                                    {
                                        Toast.makeText(c, "PHP WASN'T SUCCESSFUL. ", Toast.LENGTH_SHORT).show();

                                    }

                                } catch (JSONException e) {
                                    e.printStackTrace();
                                    Toast.makeText(c, "GOOD RESPONSE BUT JAVA CAN'T PARSE JSON IT RECEIVED : "+e.getMessage(), Toast.LENGTH_SHORT).show();
                                }

                        }

                        //ERROR
                        @Override
                        public void onError(ANError anError) {
                            Toast.makeText(c, "UNSUCCESSFUL :  ERROR IS : "+anError.getMessage(), Toast.LENGTH_SHORT).show();
                        }

                    });

        }
    }

}
```

#### SECTION 4 : Our Activity

**MainActivity class.**

Main Responsibility : LAUNCH OUR APP.

- It extends AppcompatActivity hence is an activity.
- Activities are the entry point of android applications.This is no exception.
- It loads our activity layout.
- It handles all our inputs in this case.
- Add references to Spinner,EditText and CheckBox.
- Also add buttons and initialize them.

```java
package com.tutorials.hp.mysql_datatypes_save;

import android.os.Bundle;
import android.support.design.widget.FloatingActionButton;
import android.support.design.widget.Snackbar;
import android.support.design.widget.TextInputEditText;
import android.support.v7.app.AppCompatActivity;
import android.support.v7.widget.Toolbar;
import android.view.View;
import android.widget.ArrayAdapter;
import android.widget.Button;
import android.widget.CheckBox;
import android.widget.Spinner;
import android.widget.Toast;

public class MainActivity extends AppCompatActivity {

    //INSTANCE FIELDS
    private TextInputEditText txtName;
    private CheckBox chkTechnologyExists;
    private Spinner spPropellant;
    private Button btnAdd;

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
                Snackbar.make(view, "Replace with your own action", Snackbar.LENGTH_LONG)
                        .setAction("Action", null).show();
            }
        });

        //REFERENCE VIEWS
        this.initializeViews();

        populatePropellants();
        //HANDLE EVENTS
        this.handleClickEvents();

    }

    /*
    REFERENCE VIEWS
     */
    private void initializeViews()
    {

        txtName= (TextInputEditText) findViewById(R.id.nameTxt);
        chkTechnologyExists= (CheckBox) findViewById(R.id.techExists);
        spPropellant= (Spinner) findViewById(R.id.sp);

        btnAdd= (Button) findViewById(R.id.addBtn);

    }

    /*
    HANDLE CLICK EVENTS
     */
    private void handleClickEvents()
    {
        //EVENTS : ADD
        btnAdd.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View view) {

                //GET VALUES
                String name=txtName.getText().toString();
                String propellant=spPropellant.getSelectedItem().toString();
                Boolean technologyexists=chkTechnologyExists.isChecked();

                //BASIC CLIENT SIDE VALIDATION
                if((name.length()<1 || propellant.length()<1  ))
                {
                    Toast.makeText(MainActivity.this, "Please Enter all Fields", Toast.LENGTH_SHORT).show();
                }
                else
                {
                    //SAVE

                    Spacecraft s=new Spacecraft();
                    s.setName(name);
                    s.setPropellant(propellant);
                    s.setTechnologyExists(technologyexists ? 1 : 0);

                    new MySQLClient(MainActivity.this).add(s,txtName,spPropellant);
                }
            }
        });

    }

    private void populatePropellants()
    {
        ArrayAdapter<String> adapter=new ArrayAdapter<String>(this,android.R.layout.simple_spinner_dropdown_item);

        adapter.add("None");
        adapter.add("Chemical Energy");
        adapter.add("Nuclear Energy");
        adapter.add("Laser Beam");
        adapter.add("Anti-Matter");
        adapter.add("Plasma Ions");
        adapter.add("Warp Drive");

        spPropellant.setAdapter(adapter);
        spPropellant.setSelection(0);

    }

}
```

#### PHP Code

#### Constants.php Class

- Holds the database constants like database name,database password and host.
- We also define our select statement here.

```php
<?php

class Constants
{
    //DATABASE DETAILS
    static $DB_SERVER="localhost";
    static $DB_NAME="galileoDB";
    static $USERNAME="root";
    static $PASSWORD="";
    const TB_NAME="galileoTB";

    //STATEMENTS
    static $SQL_SELECT_ALL="SELECT * FROM galileoTB";

}
```

**DBAdapter Class**

- Performs all CRUD operations.
- Inserts data to MySQL Database.

```php
<?php

require_once("/Constants.php");

class DBAdapter
{
/*******************************************************************************************************************************************/
/*
   1.CONNECT TO DATABASE.
   2. RETURN CONNECTION OBJECT
*/
    public function connect()
    {

       $con=mysqli_connect(Constants::$DB_SERVER,Constants::$USERNAME,Constants::$PASSWORD,Constants::$DB_NAME);

        if(mysqli_connect_error(!$con))
        {
           // echo "Unable To Connect";
            return null;
        }else
        {

            return $con;
        }
    }
  /*******************************************************************************************************************************************/
/*
   1.INSERT SPACECRAFT INTO DATABASE
 */
    public function insert($s)
    {
        // INSERT
        $con=$this->connect();

        if($con != null)
        {
            $sql="INSERT INTO galileoTB(name,propellant,technologyexists) VALUES('$s[0]','$s[1]','$s[2]')";

            try
            {
                $result=mysqli_query($con,$sql);

                if($result)
                {
                    print(json_encode(array("Success")));
                }else
                {
                    print(json_encode(array("Unsuccessfull")));
                }
            }catch (Exception $e)
            {
               print(json_encode(array("PHP EXCEPTION : CAN'T SAVE TO MYSQL. "+$e->getMessage())));
            }

        }else{
            print(json_encode(array("PHP EXCEPTION : CAN'T CONNECT TO MYSQL. NULL CONNECTION.")));
        }

        mysqli_close($con);
    }
/*******************************************************************************************************************************************/
/*
   1.SELECT FROM DATABASE.
*/
    public function select()
    {
       $con=$this->connect();

        if($con != null)
        {
            $retrieved=mysqli_query($con,Constants::$SQL_SELECT_ALL);
            if($retrieved)
            {
                while($row=mysqli_fetch_array($retrieved))
                {

                   // echo $row["name"] ,"    t | ",$row["propellant"],"</br>";
           $spacecrafts[]=$row;
                }
        print(json_encode($spacecrafts));
            }else
            {
                 print(json_encode(array("PHP EXCEPTION : CAN'T RETRIEVE FROM MYSQL. ")));
            }
        }else{
            print(json_encode(array("PHP EXCEPTION : CAN'T CONNECT TO MYSQL. NULL CONNECTION.")));
        }

        mysqli_close($con);
    }
/*******************************************************************************************************************************************/
/*
   1.UPDATE  DATABASE.

*/
    public function update($id, $s)
    {
        // UPDATE

        $con=$this->connect();

        if($con != null)
        {

            $sql="UPDATE galileoTB SET name='$s[0]',propellant='$s[1]',technologyexists='$s[2]' WHERE id='$id'";

            try
            {
                $result=mysqli_query($con,$sql);

                if($result)
                {
                    print(json_encode(array("Successfully Updated")));
                }else
                {
                    print(json_encode(array("Not Successfully Updated")));
                }
            }catch (Exception $e)
            {
                 print(json_encode(array("PHP EXCEPTION : CAN'T UPDATE INTO MYSQL. "+$e->getMessage())));
            }

        }else{
            print(json_encode(array("PHP EXCEPTION : CAN'T CONNECT TO MYSQL. NULL CONNECTION.")));
        }

        mysqli_close($con);
    }
/*******************************************************************************************************************************************/
/*
   1.DELETE SPACECRAFT FROM DATABASE.

*/
    public function delete($id)
    {
        $con=$this->connect();

        if($con != null)
        {

//            $name=$_POST['Name'];
//            $pos=$_POST['Position'];
//            $team=$_POST['Team'];

            $sql="DELETE FROM galileoTB WHERE id='$id'";

            try
            {
                $result=mysqli_query($con,$sql);

                if($result)
                {
                    print(json_encode(array("Successfully Deleted")));
                }else
                {
                    print(json_encode(array("Not Successfully Deleted")));
                }
            }catch (Exception $e)
            {
                print(json_encode(array("PHP EXCEPTION : CAN'T DELETE FROM MYSQL. "+$e->getMessage())));
            }

        }else{
            print(json_encode(array("PHP EXCEPTION : CAN'T CONNECT TO MYSQL. NULL CONNECTION.")));
        }

        mysqli_close($con);
    }

}
p
```

**CRUD.php Class**

- Receives the HTTP request from the client,in this case android.
- It then determines the action to take,whether to call save method or whatever.

```php
<?php

require_once("/DBAdapter.php");

if($_POST['action']=="save"){

         $dbAdapter=new DBAdapter();
         $name=$_POST['name'];
         $propellant=$_POST['propellant'];
         $technologyexists=$_POST['technologyexists'];

        $dbAdapter->insert(array($name,$propellant,$technologyexists));
}
else if($_POST['action']=="update")
{
       $dbAdapter=new DBAdapter();
     $id=$_POST['id'];
         $name=$_POST['name'];
         $propellant=$_POST['propellant'];
         $technologyexists=$_POST['technologyexists'];

        $dbAdapter->update($id,array($name,$propellant,$technologyexists));

}
else if($_POST['action']=="delete")
{
       $dbAdapter=new DBAdapter();
         $id=$_POST['id'];

        $dbAdapter->delete($id);
}
?>
```

**Index.php File**

- Executes the retrieve/select function to retrieve data from database.

```php
<?php

require_once("/DBAdapter.php");

  $dbAdapter=new DBAdapter();
  $dbAdapter->select();

?>
```

### Download

[Direct Download](https://github.com/Oclemy/MySQL-DataTypes-Save/archive/master.zip)

## Example 2: Android MySQL – GridView CheckBox – INSERT,SELECT,SHOW

_This is an android mysql gridview with checkboxes tutorial. We see how to insert, select and show in a gridview._

- Look the aim is to see how to work with Boolean values with MySQL database.
- We want to insert data to MySQL database first.
- We are inserting from an edittext,from a spinner as well as from a checkbox.
- The user checks/unchecks the checkbox if the technology for our fictional spacecraft exists.
- He selects the propellant from a spinner and enters the spacecraft name in a material checkbox.
- We then select our data from database.It is strings and booleans.
- The gridview is custom to hold textviews and checkboxes.
- In actuality,MySQL doesn't natively support boolean data types.So we shall use a simple integer to represent boolean values to be bound to checkbox.
- 1 to represent true and 0 to false.The integer is nullable.

#### Video Tutorial(ProgrammingWizards TV Channel)

Well we have a video tutorial as an alternative to this. If you prefer tutorials like this one then it would be good you [subscribe to our YouTube channel](https://www.youtube.com/channel/UCpdkWp2zh5Qv1ZWlnqswdCw).

Basically we have a TV for programming where do daily tutorials especially android.

#### Android MySQL GridView CheckBoxes Insert, Select Show Example

Let's look at our example:

![Android MySQL GridView](https://github.com/Oclemy/MySQL-GridView-Boolean/raw/master/demos/MySQLGridView.PNG)

#### MySQL Table

Here's our mysql table structure:

![Table Structure](https://github.com/Oclemy/MySQL-GridView-Boolean/raw/master/demos/TableStructure.PNG)

#### Project Structure

Here's our project structure.

![Project Structure](https://github.com/Oclemy/MySQL-GridView-Boolean/raw/master/demos/ProjectStructure.PNG)

#### 1\. PHP Code

Here are our php code. Place them in the same folder.

##### (a) Constants.php

```php
<?php

class Constants
{
    //DATABASE DETAILS
    static $DB_SERVER="localhost";
    static $DB_NAME="galileoDB";
    static $USERNAME="root";
    static $PASSWORD="";
    const TB_NAME="galileoTB";
    //STATEMENTS
    static $SQL_SELECT_ALL="SELECT * FROM galileoTB";
}
```

##### (b) CRUD.php

```php
<?php

require_once("/DBAdapter.php");
if($_POST['action']=="save"){

         $dbAdapter=new DBAdapter();
         $name=$_POST['name'];
         $propellant=$_POST['propellant'];
         $technologyexists=$_POST['technologyexists'];
        $dbAdapter->insert(array($name,$propellant,$technologyexists));
}
else if($_POST['action']=="update")
{
         $dbAdapter=new DBAdapter();
         $id=$_POST['id'];
         $name=$_POST['name'];
         $propellant=$_POST['propellant'];
         $technologyexists=$_POST['technologyexists'];
        $dbAdapter->update($id,array($name,$propellant,$technologyexists));

}
else if($_POST['action']=="delete")
{
         $dbAdapter=new DBAdapter();
         $id=$_POST['id'];

        $dbAdapter->delete($id);
}
?>
```

##### (c) DBAdapter.php

```php
<?php

require_once("/Constants.php");
class DBAdapter
{
/*******************************************************************************************************************************************/
/*
   1.CONNECT TO DATABASE.
   2. RETURN CONNECTION OBJECT
*/
    public function connect()
    {

       $con=mysqli_connect(Constants::$DB_SERVER,Constants::$USERNAME,Constants::$PASSWORD,Constants::$DB_NAME);
        if(mysqli_connect_error(!$con))
        {
           // echo "Unable To Connect";
            return null;
        }else
        {

            return $con;
        }
    }
    /*******************************************************************************************************************************************/
/*
   1.INSERT SPACECRAFT INTO DATABASE
 */
    public function insert($s)
    {
        // INSERT
        $con=$this->connect();

        if($con != null)
        {
            $sql="INSERT INTO galileoTB(name,propellant,technologyexists) VALUES('$s[0]','$s[1]','$s[2]')";
            try
            {
                $result=mysqli_query($con,$sql);
                if($result)
                {
                    print(json_encode(array("Success")));
                }else
                {
                    print(json_encode(array("Unsuccessfull")));
                }
            }catch (Exception $e)
            {
               print(json_encode(array("PHP EXCEPTION : CAN'T SAVE TO MYSQL. "+$e->getMessage())));
            }
        }else{
            print(json_encode(array("PHP EXCEPTION : CAN'T CONNECT TO MYSQL. NULL CONNECTION.")));
        }
        mysqli_close($con);
    }
/*******************************************************************************************************************************************/
/*
   1.SELECT FROM DATABASE.
*/
    public function select()
    {
       $con=$this->connect();
        if($con != null)
        {
            $retrieved=mysqli_query($con,Constants::$SQL_SELECT_ALL);
            if($retrieved)
            {
                while($row=mysqli_fetch_array($retrieved))
                {

                   // echo $row["name"] ,"    t | ",$row["propellant"],"</br>";
                   $spacecrafts[]=$row;
                }
                print(json_encode($spacecrafts));
            }else
            {
                 print(json_encode(array("PHP EXCEPTION : CAN'T RETRIEVE FROM MYSQL. ")));
            }
        }else{
            print(json_encode(array("PHP EXCEPTION : CAN'T CONNECT TO MYSQL. NULL CONNECTION.")));
        }
        mysqli_close($con);
    }
/*******************************************************************************************************************************************/
/*
   1.UPDATE  DATABASE.

*/
    public function update($id, $s)
    {
        // UPDATE
        $con=$this->connect();

        if($con != null)
        {
            $sql="UPDATE galileoTB SET name='$s[0]',propellant='$s[1]',technologyexists='$s[2]' WHERE id='$id'";
            try
            {
                $result=mysqli_query($con,$sql);
                if($result)
                {
                    print(json_encode(array("Successfully Updated")));
                }else
                {
                    print(json_encode(array("Not Successfully Updated")));
                }
            }catch (Exception $e)
            {
                 print(json_encode(array("PHP EXCEPTION : CAN'T UPDATE INTO MYSQL. "+$e->getMessage())));
            }
        }else{
            print(json_encode(array("PHP EXCEPTION : CAN'T CONNECT TO MYSQL. NULL CONNECTION.")));
        }
        mysqli_close($con);
    }
/*******************************************************************************************************************************************/
/*
   1.DELETE SPACECRAFT FROM DATABASE.

*/
    public function delete($id)
    {
        $con=$this->connect();

        if($con != null)
        {
//            $name=$_POST['Name'];
//            $pos=$_POST['Position'];
//            $team=$_POST['Team'];
            $sql="DELETE FROM galileoTB WHERE id='$id'";
            try
            {
                $result=mysqli_query($con,$sql);
                if($result)
                {
                    print(json_encode(array("Successfully Deleted")));
                }else
                {
                    print(json_encode(array("Not Successfully Deleted")));
                }
            }catch (Exception $e)
            {
                print(json_encode(array("PHP EXCEPTION : CAN'T DELETE FROM MYSQL. "+$e->getMessage())));
            }
        }else{
            print(json_encode(array("PHP EXCEPTION : CAN'T CONNECT TO MYSQL. NULL CONNECTION.")));
        }
        mysqli_close($con);
    }

}
```

##### (d) Index.php

```php
<?php

require_once("/DBAdapter.php");
    $dbAdapter=new DBAdapter();
    $dbAdapter->select();
?>
```

#### 2\. Gradle Scripts

Here are our gradle scripts in our build.gradle file(s).

##### (a). build.gradle(app)

Here's our **app level** `build.gradle` file. We have the dependencies DSL where we add our dependencies.

This file is called app level `build.gradle` since it's located in the app folder of the project.

If you are using Android Studio version 3 and above use `implementation` keyword while if you are using a version less than 3 then still use the `compile` keyword.

Once you've modified this `build.gradle` file you have to sync your project. Android Studio will indeed prompt you to do so.

```groovy
dependencies {
    compile fileTree(dir: 'libs', include: ['*.jar'])
    testCompile 'junit:junit:4.12'
    compile 'com.android.support:appcompat-v7:24.2.0'
    compile 'com.android.support:design:24.2.0'
    compile 'com.android.support:cardview-v7:24.2.0'
    compile 'com.amitshekhar.android:android-networking:0.2.0'
}
```

[notice] We are using Fast Android Networking Library as our HTTP Client. You may use newer versions. [/notice]

#### 3\. Resoources.

[Android](https://camposha.info/android/introduction) platform provides a powerful and flexible way of adding static content as a resource.

These static content will also be packaged into the APK file. The static content will be stored either as a resource or as an asset.

Resources belong to a given type. These types can be:

1. Drawable.
2. Layout.
3. Value.

Let's start by looking at the layout resources

##### (a). model.xml

Our row model layout.

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
                android_text="Propellant....................."
                android_id="@+id/txtPropellant"
                android_padding="10dp"
                android_layout_alignParentLeft="true"
                />
            <CheckBox
                android_layout_width="wrap_content"
                android_layout_height="wrap_content"
                android_textSize="25dp"
                android_id="@+id/chkTechExists"
                android_checked="true" />

    </LinearLayout>

</android.support.v7.widget.CardView>
```

##### (b). content_main.xml

Our `content_main` layout. This layout is being inserted into our `activity_main.xml`.

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
    tools_context="com.tutorials.hp.mysqlgridviewbool.MainActivity"
    tools_showIn="@layout/activity_main">

    <LinearLayout
        android_orientation="vertical"
        android_layout_width="match_parent"
        android_layout_height="wrap_content">

        <android.support.design.widget.TextInputEditText
            android_id="@+id/nameTxt"
            android_hint="Name"
            android_layout_width="match_parent"
            android_layout_height="wrap_content"
            android_textStyle="bold"
            android_textSize="25dp"
            android_enabled="true"
            android_focusable="true" />

        <LinearLayout
            android_orientation="horizontal"
            android_padding="5dp"
            android_layout_width="match_parent"
            android_layout_height="wrap_content">
            <TextView
                android_textSize="25dp"
                android_text="Propellant"
                android_textStyle="bold"
                android_layout_width="250dp"
                android_layout_height="wrap_content" />
            <Spinner
                android_id="@+id/sp"
                android_textSize="25dp"
                android_textStyle="bold"
                android_layout_width="wrap_content"
                android_layout_height="wrap_content" />
        </LinearLayout>

        <LinearLayout
            android_orientation="horizontal"
            android_padding="5dp"
            android_layout_width="match_parent"
            android_layout_height="wrap_content">
            <TextView
                android_textSize="25dp"
                android_text="Technology Exists ??"
                android_textStyle="bold"
                android_layout_width="250dp"
                android_layout_height="wrap_content" />
            <CheckBox
                android_layout_width="wrap_content"
                android_layout_height="wrap_content"
                android_textSize="25dp"
                android_id="@+id/techExists"
                android_checked="true" />
        </LinearLayout>

        <RelativeLayout
            android_orientation="horizontal"
            android_layout_width="match_parent"
            android_layout_height="wrap_content">

            <Button android_id="@+id/addBtn"
                android_layout_width="wrap_content"
                android_layout_height="60dp"
                android_text="Save"
                android_clickable="true"
                android_padding="5dp"
                android_background="#009968"
                android_textColor="@android:color/white"
                android_textStyle="bold"
                android_textSize="20dp" />

            <Button android_id="@+id/refreshBtn"
                android_layout_width="wrap_content"
                android_layout_height="60dp"
                android_text="Retrieve"
                android_padding="5dp"
                android_clickable="true"
                android_background="#f38630"
                android_textColor="@android:color/white"
                android_layout_alignParentTop="true"
                android_layout_alignParentRight="true"
                android_layout_alignParentEnd="true"
                android_textStyle="bold"
                android_textSize="20dp" />

        </RelativeLayout>

        <GridView
            android_id="@+id/gv"
            android_numColumns="2"
            android_layout_width="match_parent"
            android_layout_height="wrap_content">

        </GridView>

    </LinearLayout>
</RelativeLayout>
```

##### (c). activity_main.xml

This is the layout for our MainActivity class.

```xml
<?xml version="1.0" encoding="utf-8"?>
<android.support.design.widget.CoordinatorLayout

    android_layout_width="match_parent"
    android_layout_height="match_parent"
    android_fitsSystemWindows="true"
    tools_context="com.tutorials.hp.mysqlgridviewbool.MainActivity">

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

##### (a) Spacecraft.java

Our data object.

```java
package com.tutorials.hp.mysqlgridviewbool.mModel;

public class Spacecraft {

    /*
    INSTANCE FIELDS
     */
    private int id;
    private String name;
    private String propellant;
    private int technologyExists;

    /*
    GETTERS AND SETTERS
     */
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

    public String getPropellant() {
        return propellant;
    }

    public void setPropellant(String propellant) {
        this.propellant = propellant;
    }

    public int getTechnologyExists() {
        return technologyExists;
    }

    public void setTechnologyExists(int technologyExists) {
        this.technologyExists = technologyExists;
    }
    /*
    TOSTRING
     */
    @Override
    public String toString() {
        return name;
    }
}
```

##### (b) MySQLClient.java

We are using Android Networking Library by Ahmed Shekhar to perform our network calls.These shall happen in the background thread and return us responses in JSON format.The library is fast and easy to use.

First take note that the full source code reference is above,download it including the PHP we used. Here's our MySQL client class,our most important class.

```java
package com.tutorials.hp.mysqlgridviewbool.mMySQL;

import android.content.Context;
import android.view.View;
import android.widget.ArrayAdapter;
import android.widget.EditText;
import android.widget.GridView;
import android.widget.Spinner;
import android.widget.Toast;

import com.androidnetworking.AndroidNetworking;
import com.androidnetworking.common.Priority;
import com.androidnetworking.error.ANError;
import com.androidnetworking.interfaces.JSONArrayRequestListener;
import com.tutorials.hp.mysqlgridviewbool.mAdapter.GridViewAdapter;
import com.tutorials.hp.mysqlgridviewbool.mModel.Spacecraft;

import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;

import java.util.ArrayList;

public class MySQLClient {

    //SAVE/RETRIEVE URLS
    private static final String DATA_INSERT_URL="http://10.0.2.2/android/Aristotle/crud.php";
    private static final String DATA_RETRIEVE_URL="http://10.0.2.2/android/Aristotle/index.php";

    //INSTANCE FIELDS
    private final Context c;
    private GridViewAdapter adapter ;

    public MySQLClient(Context c) {
        this.c = c;

    }
    /*
   SAVE/INSERT
    */
    public void add(Spacecraft s, final View...inputViews)
    {
        if(s==null)
        {
            Toast.makeText(c, "No Data To Save", Toast.LENGTH_SHORT).show();
        }
        else
        {
            AndroidNetworking.post(DATA_INSERT_URL)

                    .addBodyParameter("action","save")
                    .addBodyParameter("name",s.getName())
                    .addBodyParameter("propellant",s.getPropellant())
                    .addBodyParameter("technologyexists",String.valueOf(s.getTechnologyExists()))
                    .setTag("TAG_ADD")
                    .build()
                    .getAsJSONArray(new JSONArrayRequestListener() {
                        @Override
                        public void onResponse(JSONArray response) {

                            if(response != null)
                                try {
                                    //SHOW RESPONSE FROM SERVER
                                    String responseString = response.get(0).toString();
                                    Toast.makeText(c, "PHP SERVER RESPONSE : " + responseString, Toast.LENGTH_SHORT).show();

                                    if (responseString.equalsIgnoreCase("Success")) {
                                        //RESET VIEWS
                                        EditText nameTxt = (EditText) inputViews[0];
                                        Spinner spPropellant = (Spinner) inputViews[1];

                                        nameTxt.setText("");
                                        spPropellant.setSelection(0);
                                    }else
                                    {
                                        Toast.makeText(c, "PHP WASN'T SUCCESSFUL. ", Toast.LENGTH_SHORT).show();

                                    }

                                } catch (JSONException e) {
                                    e.printStackTrace();
                                    Toast.makeText(c, "GOOD RESPONSE BUT JAVA CAN'T PARSE JSON IT RECEIVED : "+e.getMessage(), Toast.LENGTH_SHORT).show();
                                }

                        }

                        //ERROR
                        @Override
                        public void onError(ANError anError) {
                            Toast.makeText(c, "UNSUCCESSFUL :  ERROR IS : "+anError.getMessage(), Toast.LENGTH_SHORT).show();
                        }

                    });

        }
    }

    /*
    RETRIEVE/SELECT/REFRESH
     */
    public void retrieve(final GridView gv)
    {
        final ArrayList<Spacecraft> spacecrafts = new ArrayList<>();

        AndroidNetworking.get(DATA_RETRIEVE_URL)
                .setPriority(Priority.HIGH)
                .build()
                .getAsJSONArray(new JSONArrayRequestListener() {
                    @Override
                    public void onResponse(JSONArray response) {
                        JSONObject jo;
                        Spacecraft s;
                        try
                        {
                            for(int i=0;i<response.length();i++)
                            {
                                jo=response.getJSONObject(i);

                                int id=jo.getInt("id");
                                String name=jo.getString("name");
                                String propellant=jo.getString("propellant");
                                String techExists=jo.getString("technologyexists");

                                s=new Spacecraft();
                                s.setId(id);
                                s.setName(name);
                                s.setPropellant(propellant);
                                s.setTechnologyExists(techExists.equalsIgnoreCase("1") ? 1 : 0);

                                spacecrafts.add(s);
                            }

                            //SET TO SPINNER
                            adapter =new GridViewAdapter(c,spacecrafts);
                            gv.setAdapter(adapter);

                        }catch (JSONException e)
                        {
                            Toast.makeText(c, "GOOD RESPONSE BUT JAVA CAN'T PARSE JSON IT RECEIEVED. "+e.getMessage(), Toast.LENGTH_LONG).show();

                        }

                    }

                    //ERROR
                    @Override
                    public void onError(ANError anError) {
                        anError.printStackTrace();
                        Toast.makeText(c, "UNSUCCESSFUL :  ERROR IS : "+anError.getMessage(), Toast.LENGTH_LONG).show();

                    }
                });
    }
}
```

##### (c). GridViewAdapter.java

Here's our GridView adapter class.The base class we are deriving from is baseadapter of course.We map our integers to boolean.

```java
package com.tutorials.hp.mysqlgridviewbool.mAdapter;

import android.content.Context;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.BaseAdapter;
import android.widget.CheckBox;
import android.widget.TextView;
import android.widget.Toast;

import com.tutorials.hp.mysqlgridviewbool.R;
import com.tutorials.hp.mysqlgridviewbool.mModel.Spacecraft;

import java.util.ArrayList;

public class GridViewAdapter extends BaseAdapter {

    Context c;
    ArrayList<Spacecraft> spacecrafts;

    public GridViewAdapter(Context c, ArrayList<Spacecraft> spacecrafts) {
        this.c = c;
        this.spacecrafts = spacecrafts;
    }

    @Override
    public int getCount() {
        return spacecrafts.size();
    }

    @Override
    public Object getItem(int i) {
        return spacecrafts.get(i);
    }

    @Override
    public long getItemId(int i) {
        return i;
    }

    @Override
    public View getView(int i, View view, ViewGroup viewGroup) {
        if(view==null)
        {
            view= LayoutInflater.from(c).inflate(R.layout.model,viewGroup,false);
        }

        TextView txtName = (TextView) view.findViewById(R.id.nameTxt);
        TextView txtPropellant = (TextView) view.findViewById(R.id.txtPropellant);

        CheckBox chkTechExists = (CheckBox) view.findViewById(R.id.chkTechExists);

        final Spacecraft s= (Spacecraft) this.getItem(i);

        txtName.setText(s.getName());
        txtPropellant.setText(s.getPropellant());
        chkTechExists.setChecked( s.getTechnologyExists()==1);

        view.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View view) {
                Toast.makeText(c, s.getName(), Toast.LENGTH_SHORT).show();
            }
        });

        return view;
    }
}
```

##### (d). MainActivity.java

Our main and launcher [activity](https://camposha.info/android/activity).

```java
package com.tutorials.hp.mysqlgridviewbool;

import android.os.Bundle;
import android.support.design.widget.FloatingActionButton;
import android.support.design.widget.Snackbar;
import android.support.design.widget.TextInputEditText;
import android.support.v7.app.AppCompatActivity;
import android.support.v7.widget.Toolbar;
import android.view.View;
import android.view.Menu;
import android.view.MenuItem;
import android.widget.ArrayAdapter;
import android.widget.Button;
import android.widget.CheckBox;
import android.widget.GridView;
import android.widget.Spinner;
import android.widget.Toast;

import com.tutorials.hp.mysqlgridviewbool.mAdapter.GridViewAdapter;
import com.tutorials.hp.mysqlgridviewbool.mModel.Spacecraft;
import com.tutorials.hp.mysqlgridviewbool.mMySQL.MySQLClient;

import java.util.ArrayList;

public class MainActivity extends AppCompatActivity {

    //INSTANCE FIELDS
    private TextInputEditText txtName;
    private CheckBox chkTechnologyExists;
    private Spinner spPropellant;
    private GridView gv;
    private Button btnAdd,btnRetrieve;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);
        Toolbar toolbar = (Toolbar) findViewById(R.id.toolbar);
        setSupportActionBar(toolbar);

        //REFERENCE VIEWS
        this.initializeViews();

        populatePropellants();

        //HANDLE EVENTS
        this.handleClickEvents();

        FloatingActionButton fab = (FloatingActionButton) findViewById(R.id.fab);
        fab.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View view) {
               gv.setAdapter(new GridViewAdapter(MainActivity.this,new ArrayList<Spacecraft>()));
            }
        });

    }

    /*
    REFERENCE VIEWS
     */
    private void initializeViews()
    {

        txtName= (TextInputEditText) findViewById(R.id.nameTxt);
        chkTechnologyExists= (CheckBox) findViewById(R.id.techExists);
        spPropellant= (Spinner) findViewById(R.id.sp);
        gv= (GridView) findViewById(R.id.gv);

        btnAdd= (Button) findViewById(R.id.addBtn);
        btnRetrieve= (Button) findViewById(R.id.refreshBtn);

    }

    /*
    HANDLE CLICK EVENTS
     */
    private void handleClickEvents()
    {
        //EVENTS : ADD
        btnAdd.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View view) {

                //GET VALUES
                String name=txtName.getText().toString();
                String propellant=spPropellant.getSelectedItem().toString();
                Boolean technologyexists=chkTechnologyExists.isChecked();

                //BASIC CLIENT SIDE VALIDATION
                if((name.length()<1 || propellant.length()<1  ))
                {
                    Toast.makeText(MainActivity.this, "Please Enter all Fields", Toast.LENGTH_SHORT).show();
                }
                else
                {
                    //SAVE

                    Spacecraft s=new Spacecraft();
                    s.setName(name);
                    s.setPropellant(propellant);
                    s.setTechnologyExists(technologyexists ? 1 : 0);

                    new MySQLClient(MainActivity.this).add(s,txtName,spPropellant);
                }
            }
        });

        //EVENTS : RETRIEVE
        btnRetrieve.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View view) {
                new MySQLClient(MainActivity.this).retrieve(gv);

            }
        });

    }

    private void populatePropellants()
    {
        ArrayAdapter<String> adapter=new ArrayAdapter<String>(this,android.R.layout.simple_spinner_dropdown_item);

        adapter.add("None");
        adapter.add("Chemical Energy");
        adapter.add("Nuclear Energy");
        adapter.add("Laser Beam");
        adapter.add("Anti-Matter");
        adapter.add("Plasma Ions");
        adapter.add("Warp Drive");

        spPropellant.setAdapter(adapter);
        spPropellant.setSelection(0);

    }
}
```

#### Download

Hey,everything is in source code reference that is well commented and easy to understand and can be downloaded below.

Also check our video tutorial it's more detailed and explained in step by step.

| No. | Location | Link |
| --- | --- | --- |
| 1. | GitHub | [Direct Download](https://github.com/Oclemy/Spinner-MySQL/archive/master.zip) |
| 2. | GitHub | [Browse](https://github.com/Oclemy/Spinner-MySQL) |
| 3. | YouTube | [Video Tutorial](https://www.youtube.com/watch?v=2fIddOtC5HQ) |

## Example 2: Android MySQL – ListView CheckBoxes – INSERT,SELECT,SHOW

_This is an Android MySQ [ListView](https://camposha.info/android/listview) with CheckBoxes tutorial. We want to see how to work with boolean text values. We save them into mysql and also retrieve them._

- We want to see how to work with Android PHP MySQL and Boolean values and strings.
- First we want to insert data to MySQL database.
- The data shall be from a material edittext,a spinner and a checkbox.
- The user types his favorite spacecraft name in the edittext.Then selects the spacecraft's propellant from a spinner.
- He then selects if the technology exists yet or not in the checkbox.
- We shall actually be mapping integers to boolean and vice versa since MySQL doesn't have a native boolean data type.
- Our adapterview is ListView.It has checkboxes to hold boolean values from MySQL database.

#### Video Tutorial(ProgrammingWizards TV Channel)

Well we have a video tutorial as an alternative to this. If you prefer tutorials like this one then it would be good you [subscribe to our YouTube channel](https://www.youtube.com/channel/UCpdkWp2zh5Qv1ZWlnqswdCw).

Basically we have a TV for programming where do daily tutorials especially android.

#### Android MySQL ListView CheckBoxes Insert, Select Show Example

Let's look at our example:

![Android MySQL ListView](https://github.com/Oclemy/MySQL-ListView-Boolean/raw/master/demos/MySQLGridView.PNG)

#### MySQL Table

Here's our mysql table structure:

![Table Structure](https://github.com/Oclemy/MySQL-ListView-Boolean/raw/master/demos/TableStructure.PNG)

#### Project Structure

Here's our project structure.

![Project Structure](https://github.com/Oclemy/MySQL-ListView-Boolean/raw/master/demos/ProjectStructure.PNG)

#### 1\. PHP Code

Here are our php code. Place them in the same folder.

##### (a) Constants.php

```php
<?php

class Constants
{
    //DATABASE DETAILS
    static $DB_SERVER="localhost";
    static $DB_NAME="galileoDB";
    static $USERNAME="root";
    static $PASSWORD="";
    const TB_NAME="galileoTB";
    //STATEMENTS
    static $SQL_SELECT_ALL="SELECT * FROM galileoTB";
}
```

##### (b) CRUD.php

```php
<?php

require_once("/DBAdapter.php");
if($_POST['action']=="save"){

         $dbAdapter=new DBAdapter();
         $name=$_POST['name'];
         $propellant=$_POST['propellant'];
         $technologyexists=$_POST['technologyexists'];
        $dbAdapter->insert(array($name,$propellant,$technologyexists));
}
else if($_POST['action']=="update")
{
         $dbAdapter=new DBAdapter();
         $id=$_POST['id'];
         $name=$_POST['name'];
         $propellant=$_POST['propellant'];
         $technologyexists=$_POST['technologyexists'];
        $dbAdapter->update($id,array($name,$propellant,$technologyexists));

}
else if($_POST['action']=="delete")
{
         $dbAdapter=new DBAdapter();
         $id=$_POST['id'];

        $dbAdapter->delete($id);
}
?>
```

##### (c) DBAdapter.php

```php
<?php

require_once("/Constants.php");
class DBAdapter
{
/*******************************************************************************************************************************************/
/*
   1.CONNECT TO DATABASE.
   2. RETURN CONNECTION OBJECT
*/
    public function connect()
    {

       $con=mysqli_connect(Constants::$DB_SERVER,Constants::$USERNAME,Constants::$PASSWORD,Constants::$DB_NAME);
        if(mysqli_connect_error(!$con))
        {
           // echo "Unable To Connect";
            return null;
        }else
        {

            return $con;
        }
    }
    /*******************************************************************************************************************************************/
/*
   1.INSERT SPACECRAFT INTO DATABASE
 */
    public function insert($s)
    {
        // INSERT
        $con=$this->connect();

        if($con != null)
        {
            $sql="INSERT INTO galileoTB(name,propellant,technologyexists) VALUES('$s[0]','$s[1]','$s[2]')";
            try
            {
                $result=mysqli_query($con,$sql);
                if($result)
                {
                    print(json_encode(array("Success")));
                }else
                {
                    print(json_encode(array("Unsuccessfull")));
                }
            }catch (Exception $e)
            {
               print(json_encode(array("PHP EXCEPTION : CAN'T SAVE TO MYSQL. "+$e->getMessage())));
            }
        }else{
            print(json_encode(array("PHP EXCEPTION : CAN'T CONNECT TO MYSQL. NULL CONNECTION.")));
        }
        mysqli_close($con);
    }
/*******************************************************************************************************************************************/
/*
   1.SELECT FROM DATABASE.
*/
    public function select()
    {
       $con=$this->connect();
        if($con != null)
        {
            $retrieved=mysqli_query($con,Constants::$SQL_SELECT_ALL);
            if($retrieved)
            {
                while($row=mysqli_fetch_array($retrieved))
                {

                   // echo $row["name"] ,"    t | ",$row["propellant"],"</br>";
                   $spacecrafts[]=$row;
                }
                print(json_encode($spacecrafts));
            }else
            {
                 print(json_encode(array("PHP EXCEPTION : CAN'T RETRIEVE FROM MYSQL. ")));
            }
        }else{
            print(json_encode(array("PHP EXCEPTION : CAN'T CONNECT TO MYSQL. NULL CONNECTION.")));
        }
        mysqli_close($con);
    }
/*******************************************************************************************************************************************/
/*
   1.UPDATE  DATABASE.

*/
    public function update($id, $s)
    {
        // UPDATE
        $con=$this->connect();

        if($con != null)
        {
            $sql="UPDATE galileoTB SET name='$s[0]',propellant='$s[1]',technologyexists='$s[2]' WHERE id='$id'";
            try
            {
                $result=mysqli_query($con,$sql);
                if($result)
                {
                    print(json_encode(array("Successfully Updated")));
                }else
                {
                    print(json_encode(array("Not Successfully Updated")));
                }
            }catch (Exception $e)
            {
                 print(json_encode(array("PHP EXCEPTION : CAN'T UPDATE INTO MYSQL. "+$e->getMessage())));
            }
        }else{
            print(json_encode(array("PHP EXCEPTION : CAN'T CONNECT TO MYSQL. NULL CONNECTION.")));
        }
        mysqli_close($con);
    }
/*******************************************************************************************************************************************/
/*
   1.DELETE SPACECRAFT FROM DATABASE.

*/
    public function delete($id)
    {
        $con=$this->connect();

        if($con != null)
        {
//            $name=$_POST['Name'];
//            $pos=$_POST['Position'];
//            $team=$_POST['Team'];
            $sql="DELETE FROM galileoTB WHERE id='$id'";
            try
            {
                $result=mysqli_query($con,$sql);
                if($result)
                {
                    print(json_encode(array("Successfully Deleted")));
                }else
                {
                    print(json_encode(array("Not Successfully Deleted")));
                }
            }catch (Exception $e)
            {
                print(json_encode(array("PHP EXCEPTION : CAN'T DELETE FROM MYSQL. "+$e->getMessage())));
            }
        }else{
            print(json_encode(array("PHP EXCEPTION : CAN'T CONNECT TO MYSQL. NULL CONNECTION.")));
        }
        mysqli_close($con);
    }

}
```

##### (d) Index.php

```php
<?php

require_once("/DBAdapter.php");
    $dbAdapter=new DBAdapter();
    $dbAdapter->select();
?>
```

#### 2\. Gradle Scripts

Here are our gradle scripts in our build.gradle file(s).

##### (a). build.gradle(app)

Here's our **app level** `build.gradle` file. We have the dependencies DSL where we add our dependencies.

This file is called app level `build.gradle` since it's located in the app folder of the project.

If you are using Android Studio version 3 and above use `implementation` keyword while if you are using a version less than 3 then still use the `compile` keyword.

Once you've modified this `build.gradle` file you have to sync your project. Android Studio will indeed prompt you to do so.

```groovy
dependencies {
    compile fileTree(dir: 'libs', include: ['*.jar'])
    testCompile 'junit:junit:4.12'
    compile 'com.android.support:appcompat-v7:24.2.0'
    compile 'com.android.support:design:24.2.0'
    compile 'com.android.support:cardview-v7:24.2.0'
    compile 'com.amitshekhar.android:android-networking:0.2.0'
}
```

[notice] We are using Fast Android Networking Library as our HTTP Client. You may use newer versions. [/notice]

#### 3\. Resoources.

[Android](https://camposha.info/android/introduction) platform provides a powerful and flexible way of adding static content as a resource.

These static content will also be packaged into the APK file. The static content will be stored either as a resource or as an asset.

Resources belong to a given type. These types can be:

1. Drawable.
2. Layout.
3. Value.

Let's start by looking at the layout resources

##### (a). model.xml

Our row model layout.

```xml
?xml version="1.0" encoding="utf-8"?>
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
                android_text="Propellant....................."
                android_id="@+id/txtPropellant"
                android_padding="10dp"
                android_layout_alignParentLeft="true"
                />
            <CheckBox
                android_layout_width="wrap_content"
                android_layout_height="wrap_content"
                android_textSize="25dp"
                android_id="@+id/chkTechExists"
                android_checked="true" />

    </LinearLayout>

</android.support.v7.widget.CardView>
```

##### (b). content_main.xml

Our `content_main` layout. This layout is being inserted into our `activity_main.xml`.

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
    tools_context="com.tutorials.hp.mysqllistviewbool.MainActivity"
    tools_showIn="@layout/activity_main">
    <LinearLayout
        android_orientation="vertical"
        android_layout_width="match_parent"
        android_layout_height="wrap_content">

        <android.support.design.widget.TextInputEditText
            android_id="@+id/nameTxt"
            android_hint="Name"
            android_layout_width="match_parent"
            android_layout_height="wrap_content"
            android_textStyle="bold"
            android_textSize="25dp"
            android_enabled="true"
            android_focusable="true" />

        <LinearLayout
            android_orientation="horizontal"
            android_padding="5dp"
            android_layout_width="match_parent"
            android_layout_height="wrap_content">
            <TextView
                android_textSize="25dp"
                android_text="Propellant"
                android_textStyle="bold"
                android_layout_width="250dp"
                android_layout_height="wrap_content" />
            <Spinner
                android_id="@+id/sp"
                android_textSize="25dp"
                android_textStyle="bold"
                android_layout_width="wrap_content"
                android_layout_height="wrap_content" />
        </LinearLayout>

        <LinearLayout
            android_orientation="horizontal"
            android_padding="5dp"
            android_layout_width="match_parent"
            android_layout_height="wrap_content">
            <TextView
                android_textSize="25dp"
                android_text="Technology Exists ??"
                android_textStyle="bold"
                android_layout_width="250dp"
                android_layout_height="wrap_content" />
            <CheckBox
                android_layout_width="wrap_content"
                android_layout_height="wrap_content"
                android_textSize="25dp"
                android_id="@+id/techExists"
                android_checked="true" />
        </LinearLayout>

        <RelativeLayout
            android_orientation="horizontal"
            android_layout_width="match_parent"
            android_layout_height="wrap_content">

            <Button android_id="@+id/addBtn"
                android_layout_width="wrap_content"
                android_layout_height="60dp"
                android_text="Save"
                android_clickable="true"
                android_padding="5dp"
                android_background="#009968"
                android_textColor="@android:color/white"
                android_textStyle="bold"
                android_textSize="20dp" />

            <Button android_id="@+id/refreshBtn"
                android_layout_width="wrap_content"
                android_layout_height="60dp"
                android_text="Retrieve"
                android_padding="5dp"
                android_clickable="true"
                android_background="#f38630"
                android_textColor="@android:color/white"
                android_layout_alignParentTop="true"
                android_layout_alignParentRight="true"
                android_layout_alignParentEnd="true"
                android_textStyle="bold"
                android_textSize="20dp" />

        </RelativeLayout>

        <ListView
            android_id="@+id/lv"
            android_layout_width="match_parent"
            android_layout_height="wrap_content">

        </ListView>

    </LinearLayout>
</RelativeLayout>
```

##### (c). activity_main.xml

Our `activity_main` layout.

```xml
<?xml version="1.0" encoding="utf-8"?>
<android.support.design.widget.CoordinatorLayout

    android_layout_width="match_parent"
    android_layout_height="match_parent"
    android_fitsSystemWindows="true"
    tools_context="com.tutorials.hp.mysqllistviewbool.MainActivity">

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

##### (a). Spacecraft.java

First we have a data object POJO class as below.

```java
package com.tutorials.hp.mysqllistviewbool.mModel;

public class Spacecraft {
    /*
    INSTANCE FIELDS
     */
    private int id;
    private String name;
    private String propellant;
    private int technologyExists;

    /*
    GETTERS AND SETTERS
     */
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

    public String getPropellant() {
        return propellant;
    }

    public void setPropellant(String propellant) {
        this.propellant = propellant;
    }

    public int getTechnologyExists() {
        return technologyExists;
    }

    public void setTechnologyExists(int technologyExists) {
        this.technologyExists = technologyExists;
    }
    /*
    TOSTRING
     */
    @Override
    public String toString() {
        return name;
    }
}
```

##### (b). MySQLClient.java

Our most important class is our MySQL Client class.It is responsible fro bothh connecting,inserting and retrieving data and handling errors appropriately.We are using the easy to use yet efficient Android Networking Library.

```java
package com.tutorials.hp.mysqllistviewbool.mMySQL;

import android.content.Context;
import android.view.View;
import android.widget.EditText;
import android.widget.ListView;
import android.widget.Spinner;
import android.widget.Toast;

import com.androidnetworking.AndroidNetworking;
import com.androidnetworking.common.Priority;
import com.androidnetworking.error.ANError;
import com.androidnetworking.interfaces.JSONArrayRequestListener;
import com.tutorials.hp.mysqllistviewbool.mAdapter.ListViewAdapter;
import com.tutorials.hp.mysqllistviewbool.mModel.Spacecraft;

import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;

import java.util.ArrayList;

public class MySQLClient {

    //SAVE/RETRIEVE URLS
    private static final String DATA_INSERT_URL="http://10.0.2.2/android/Aristotle/crud.php";
    private static final String DATA_RETRIEVE_URL="http://10.0.2.2/android/Aristotle/index.php";

    //INSTANCE FIELDS
    private final Context c;
    private ListViewAdapter adapter ;

    public MySQLClient(Context c) {
        this.c = c;

    }
    /*
   SAVE/INSERT
    */
    public void add(Spacecraft s, final View...inputViews)
    {
        if(s==null)
        {
            Toast.makeText(c, "No Data To Save", Toast.LENGTH_SHORT).show();
        }
        else
        {
            AndroidNetworking.post(DATA_INSERT_URL)

                    .addBodyParameter("action","save")
                    .addBodyParameter("name",s.getName())
                    .addBodyParameter("propellant",s.getPropellant())
                    .addBodyParameter("technologyexists",String.valueOf(s.getTechnologyExists()))
                    .setTag("TAG_ADD")
                    .build()
                    .getAsJSONArray(new JSONArrayRequestListener() {
                        @Override
                        public void onResponse(JSONArray response) {

                            if(response != null)
                                try {
                                    //SHOW RESPONSE FROM SERVER
                                    String responseString = response.get(0).toString();
                                    Toast.makeText(c, "PHP SERVER RESPONSE : " + responseString, Toast.LENGTH_SHORT).show();

                                    if (responseString.equalsIgnoreCase("Success")) {
                                        //RESET VIEWS
                                        EditText nameTxt = (EditText) inputViews[0];
                                        Spinner spPropellant = (Spinner) inputViews[1];

                                        nameTxt.setText("");
                                        spPropellant.setSelection(0);
                                    }else
                                    {
                                        Toast.makeText(c, "PHP WASN'T SUCCESSFUL. ", Toast.LENGTH_SHORT).show();

                                    }

                                } catch (JSONException e) {
                                    e.printStackTrace();
                                    Toast.makeText(c, "GOOD RESPONSE BUT JAVA CAN'T PARSE JSON IT RECEIVED : "+e.getMessage(), Toast.LENGTH_SHORT).show();
                                }

                        }

                        //ERROR
                        @Override
                        public void onError(ANError anError) {
                            Toast.makeText(c, "UNSUCCESSFUL :  ERROR IS : "+anError.getMessage(), Toast.LENGTH_SHORT).show();
                        }

                    });

        }
    }

    /*
    RETRIEVE/SELECT/REFRESH
     */
    public void retrieve(final ListView lv)
    {
        final ArrayList<Spacecraft> spacecrafts = new ArrayList<>();

        AndroidNetworking.get(DATA_RETRIEVE_URL)
                .setPriority(Priority.HIGH)
                .build()
                .getAsJSONArray(new JSONArrayRequestListener() {
                    @Override
                    public void onResponse(JSONArray response) {
                        JSONObject jo;
                        Spacecraft s;
                        try
                        {
                            for(int i=0;i<response.length();i++)
                            {
                                jo=response.getJSONObject(i);

                                int id=jo.getInt("id");
                                String name=jo.getString("name");
                                String propellant=jo.getString("propellant");
                                String techExists=jo.getString("technologyexists");

                                s=new Spacecraft();
                                s.setId(id);
                                s.setName(name);
                                s.setPropellant(propellant);
                                s.setTechnologyExists(techExists.equalsIgnoreCase("1") ? 1 : 0);

                                spacecrafts.add(s);
                            }

                            //SET TO SPINNER
                            adapter =new ListViewAdapter(c,spacecrafts);
                            lv.setAdapter(adapter);

                        }catch (JSONException e)
                        {
                            Toast.makeText(c, "GOOD RESPONSE BUT JAVA CAN'T PARSE JSON IT RECEIEVED. "+e.getMessage(), Toast.LENGTH_LONG).show();

                        }

                    }

                    //ERROR
                    @Override
                    public void onError(ANError anError) {
                        anError.printStackTrace();
                        Toast.makeText(c, "UNSUCCESSFUL :  ERROR IS : "+anError.getMessage(), Toast.LENGTH_LONG).show();

                    }
                });
    }
}
```

##### (c). ListViewAdapter.java

We also have our ListView adapter to map our dataset to the adapterview.

```java
package com.tutorials.hp.mysqllistviewbool.mAdapter;

import android.content.Context;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.BaseAdapter;
import android.widget.CheckBox;
import android.widget.TextView;
import android.widget.Toast;

import com.tutorials.hp.mysqllistviewbool.R;
import com.tutorials.hp.mysqllistviewbool.mModel.Spacecraft;

import java.util.ArrayList;

public class ListViewAdapter extends BaseAdapter {

    Context c;
    ArrayList<Spacecraft> spacecrafts;

    public ListViewAdapter(Context c, ArrayList<Spacecraft> spacecrafts) {
        this.c = c;
        this.spacecrafts = spacecrafts;
    }

    @Override
    public int getCount() {
        return spacecrafts.size();
    }

    @Override
    public Object getItem(int i) {
        return spacecrafts.get(i);
    }

    @Override
    public long getItemId(int i) {
        return i;
    }

    @Override
    public View getView(int i, View view, ViewGroup viewGroup) {
        if(view==null)
        {
            view= LayoutInflater.from(c).inflate(R.layout.model,viewGroup,false);
        }

        TextView txtName = (TextView) view.findViewById(R.id.nameTxt);
        TextView txtPropellant = (TextView) view.findViewById(R.id.txtPropellant);

        CheckBox chkTechExists = (CheckBox) view.findViewById(R.id.chkTechExists);

        final Spacecraft s= (Spacecraft) this.getItem(i);

        txtName.setText(s.getName());
        txtPropellant.setText(s.getPropellant());
        chkTechExists.setChecked( s.getTechnologyExists()==1);

        view.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View view) {
                Toast.makeText(c, s.getName(), Toast.LENGTH_SHORT).show();
            }
        });

        return view;
    }
}
```

##### (d). MainActivity.java

The main [activity](https://camposha.info/android/activity).

```java
package com.tutorials.hp.mysqllistviewbool;

import android.os.Bundle;
import android.support.design.widget.FloatingActionButton;
import android.support.design.widget.TextInputEditText;
import android.support.v7.app.AppCompatActivity;
import android.support.v7.widget.Toolbar;
import android.view.View;
import android.widget.ArrayAdapter;
import android.widget.Button;
import android.widget.CheckBox;
import android.widget.ListView;
import android.widget.Spinner;
import android.widget.Toast;

import com.tutorials.hp.mysqllistviewbool.mAdapter.ListViewAdapter;
import com.tutorials.hp.mysqllistviewbool.mModel.Spacecraft;
import com.tutorials.hp.mysqllistviewbool.mMySQL.MySQLClient;

import java.util.ArrayList;

public class MainActivity extends AppCompatActivity {

    //INSTANCE FIELDS
    private TextInputEditText txtName;
    private CheckBox chkTechnologyExists;
    private Spinner spPropellant;
    private ListView lv;
    private Button btnAdd,btnRetrieve;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);
        Toolbar toolbar = (Toolbar) findViewById(R.id.toolbar);
        setSupportActionBar(toolbar);

        //REFERENCE VIEWS
        this.initializeViews();

        populatePropellants();

        //HANDLE EVENTS
        this.handleClickEvents();

        FloatingActionButton fab = (FloatingActionButton) findViewById(R.id.fab);
        fab.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View view) {
                lv.setAdapter(new ListViewAdapter(MainActivity.this,new ArrayList<Spacecraft>()));
            }
        });

    }

    /*
    REFERENCE VIEWS
     */
    private void initializeViews()
    {

        txtName= (TextInputEditText) findViewById(R.id.nameTxt);
        chkTechnologyExists= (CheckBox) findViewById(R.id.techExists);
        spPropellant= (Spinner) findViewById(R.id.sp);
        lv= (ListView) findViewById(R.id.lv);

        btnAdd= (Button) findViewById(R.id.addBtn);
        btnRetrieve= (Button) findViewById(R.id.refreshBtn);

    }

    /*
    HANDLE CLICK EVENTS
     */
    private void handleClickEvents()
    {
        //EVENTS : ADD
        btnAdd.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View view) {

                //GET VALUES
                String name=txtName.getText().toString();
                String propellant=spPropellant.getSelectedItem().toString();
                Boolean technologyexists=chkTechnologyExists.isChecked();

                //BASIC CLIENT SIDE VALIDATION
                if((name.length()<1 || propellant.length()<1  ))
                {
                    Toast.makeText(MainActivity.this, "Please Enter all Fields", Toast.LENGTH_SHORT).show();
                }
                else
                {
                    //SAVE

                    Spacecraft s=new Spacecraft();
                    s.setName(name);
                    s.setPropellant(propellant);
                    s.setTechnologyExists(technologyexists ? 1 : 0);

                    new MySQLClient(MainActivity.this).add(s,txtName,spPropellant);
                }
            }
        });

        //EVENTS : RETRIEVE
        btnRetrieve.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View view) {
                new MySQLClient(MainActivity.this).retrieve(lv);

            }
        });

    }

    private void populatePropellants()
    {
        ArrayAdapter<String> adapter=new ArrayAdapter<String>(this,android.R.layout.simple_spinner_dropdown_item);

        adapter.add("None");
        adapter.add("Chemical Energy");
        adapter.add("Nuclear Energy");
        adapter.add("Laser Beam");
        adapter.add("Anti-Matter");
        adapter.add("Plasma Ions");
        adapter.add("Warp Drive");

        spPropellant.setAdapter(adapter);
        spPropellant.setSelection(0);

    }
}
```

#### Download

Hey,everything is in source code reference that is well commented and easy to understand and can be downloaded below.

Also check our video tutorial it's more detailed and explained in step by step.

| No. | Location | Link |
| --- | --- | --- |
| 1. | GitHub | [Direct Download](https://github.com/Oclemy/MySQL-ListView-Boolean/archive/master.zip) |
| 2. | GitHub | [Browse](https://github.com/Oclemy/MySQL-ListView-Boolean) |
| 3. | YouTube | [Video Tutorial](https://www.youtube.com/watch?v=6BKNg99i8ko) |
