# Android PHP MySQL CRUD - Spinner Examples

_Android PHP MySQL Spinner Examples and Tutorials._

How to work with mysql database and spinner widget in android. We select data from mysql database and show in spinner.


## 1\. Android PHP MySQL - Spinner - Retrieve data and show

_Android MySQL : Spinner - Retrieve data and show_

How to fetch data from mysql database and render them in a Spinner.

MySQL is a fast open source relational database management system.

Android on the other hand is a software platform for a variety of devices most notable mobile.

This tutorial explores how to connect both via the HTTP.

You cannot directly connect Android and MySQL database as mysql runs on servers and desktops while android runs on mobile devices. To connect them we need the help of a server side programming language.

Then we can connect the two over the HTTP protocol. Android is written in Java while PHP is a popular server side language we can comfortable use.

Both languages define us simple APIs we can use for this task. Most notably is the HttpURLConnection on Java.

HttpURLConnection is the standard java networking class. It's an abstract class that derives from URLConnection.

To work achieve this we'll also need an AsyncTask class. AsyncTask is an abstract threading class that allows us to make these types of apps without renderring our UIs unresponsive.

We'll also use JSONObject and JSONArray to parse or process JSON. Our data will be sent over the HTTP as JSON string.

Both Java and PHP understand JSON so that's why we use it.

Let's go.

#### 1\. Create Basic Activity Project

1. First create an empty project in android studio. Go to File --> New Project.

#### 2\. Dependencies

We don't need any special dependency for this project. All our classes are standard Java/Android classes.

```groovy
dependencies {
    compile fileTree(dir: 'libs', include: ['*.jar'])
    testCompile 'junit:junit:4.12'
    compile 'com.android.support:appcompat-v7:23.2.1'
    compile 'com.android.support:design:23.2.1'
}
```

#### 3\. Create User Interface

User interfaces are typically created in android using XML layouts as opposed by direct java coding.

```xml
<?xml version="1.0" encoding="utf-8"?>
<android.support.design.widget.CoordinatorLayout

    android_layout_width="match_parent"
    android_layout_height="match_parent"
    android_fitsSystemWindows="true"
    tools_context="com.tutorials.hp.spinnermysql.MainActivity">

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

This layout gets included in your activity_main.xml. We define our UI widgets here. In this case it's a simple spinner.

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
    tools_context="com.tutorials.hp.spinnermysql.MainActivity"
    tools_showIn="@layout/activity_main">

    <Spinner
        android_id="@+id/sp"
        android_layout_width="wrap_content"
        android_layout_height="wrap_content" />
</RelativeLayout>
```

#### 4\. Java Classes

Here are our Java classes

##### Our MySQL classes

##### (a). Connector.java

As the name suggests this is our Connection class. It's role is to establish a connection to network and return a HttpURLConnection instance.

It does this by first obtaining the connection url, passing it to a java.net.URL constructor and using the resulting java.net.URL instance to open a connection, then casting that connection from URLConnection to HttpURLConnection.

```java
package com.tutorials.hp.spinnermysql.MySQL;

import java.io.IOException;
import java.net.HttpURLConnection;
import java.net.MalformedURLException;
import java.net.URL;

public class Connector {

    public static HttpURLConnection connect(String urlAddress)
    {
        try
        {
            URL url=new URL(urlAddress);
            HttpURLConnection con= (HttpURLConnection) url.openConnection();

            //PROPERTIES
            con.setRequestMethod("POST");
            con.setConnectTimeout(20000);
            con.setReadTimeout(20000);
            con.setDoInput(true);
            con.setDoOutput(true);

            //RETURN
            return con;

        } catch (MalformedURLException e) {
            e.printStackTrace();
        } catch (IOException e) {
            e.printStackTrace();
        }

        return null;
    }

}
```

##### (b). Downloader.java

As the name suggests this class is responsible for downloading data from the networking.

We do this download in the background thread as this class derives from AsyncTask.

Meanhwile we show a progress dialog and dismiss automatically when the download is over.

The downloaded json string is then sent to `Parser` class to parsed and rendered in a spinner widget.

```java
package com.tutorials.hp.spinnermysql.MySQL;

import android.app.ProgressDialog;
import android.content.Context;
import android.os.AsyncTask;
import android.widget.ArrayAdapter;
import android.widget.Spinner;
import android.widget.Toast;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.net.HttpURLConnection;

public class Downloader extends AsyncTask<Void,Void,String> {

    Context c;
    String urlAddress;
    Spinner sp;
    ProgressDialog pd;

    public Downloader(Context c, String urlAddress, Spinner sp) {
        this.c = c;
        this.urlAddress = urlAddress;
        this.sp = sp;
    }

    @Override
    protected void onPreExecute() {
        super.onPreExecute();

        pd=new ProgressDialog(c);
        pd.setTitle("Downloading..");
        pd.setMessage("Retrieving data...Please wait");
        pd.show();
    }

    @Override
    protected String doInBackground(Void... params) {
        return this.retrieveData();
    }

    @Override
    protected void onPostExecute(String s) {
        super.onPostExecute(s);

        pd.dismiss();

        sp.setAdapter(null);

        if(s != null)
        {
            Parser p=new Parser(c,s,sp);
            p.execute();

        }else {
            Toast.makeText(c,"No data retrieved",Toast.LENGTH_SHORT).show();
        }
    }

    private String retrieveData()
    {
        HttpURLConnection con=Connector.connect(urlAddress);
        if(con==null)
        {
            return null;
        }
        try
        {
            InputStream is=con.getInputStream();

            BufferedReader br=new BufferedReader(new InputStreamReader(is));
            String line;
            StringBuffer receivedData=new StringBuffer();

            while ((line=br.readLine()) != null)
            {
                receivedData.append(line+"n");
            }

            br.close();
            is.close();

            return receivedData.toString();

        } catch (IOException e) {
            e.printStackTrace();
        }
        return null;
    }
}
```

##### (c). Parser.java

This class is responsible for data parsing. That is processing a JSON string to retrieve the contents and display in a Spinner.

Parsing JSON can also be pretty intense if you are working with a huge blob of data so we do this in a background thread as well.

We still use AsyncTask.

We are using native Java classes JSONArray and JSONObject to parse our data.

```java
package com.tutorials.hp.spinnermysql.MySQL;

import android.content.Context;
import android.os.AsyncTask;
import android.widget.ArrayAdapter;
import android.widget.Spinner;
import android.widget.Toast;

import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;

import java.util.ArrayList;

public class Parser extends AsyncTask<Void,Void,Integer> {

    Context c;
    String data;
    ArrayList names=new ArrayList();
    Spinner sp;

    public Parser(Context c, String data,Spinner sp) {
        this.c = c;
        this.data = data;
        this.sp=sp;
    }

    @Override
    protected Integer doInBackground(Void... params) {
        return this.parse();
    }

    @Override
    protected void onPostExecute(Integer integer) {
        super.onPostExecute(integer);

        if(integer==1)
        {
            ArrayAdapter adapter=new ArrayAdapter(c,android.R.layout.simple_list_item_1,names);
            sp.setAdapter(adapter);

        }else {
            Toast.makeText(c,"Unable To Parse",Toast.LENGTH_SHORT).show();
        }
    }

    private int parse()
    {
        try
        {
            JSONArray ja=new JSONArray(data);
            JSONObject jo=null;

            for (int i=0;i<ja.length();i++)
            {
                jo=ja.getJSONObject(i);
                String name=jo.getString("Name");
                names.add(name);
            }

            return 1;

        } catch (JSONException e) {
            e.printStackTrace();
        }

        return 0;
    }
}
```

##### Our Activity

##### MainActivity.java

This is our Main activity, our launcher activity.

Launcher activities launch android applications when the individual application is run. In that it's the first activity to be invoked once the application component has been started.

Our activity will have a spinner to render our data from mysql database.

```java
package com.tutorials.hp.spinnermysql;

import android.os.Bundle;
import android.support.design.widget.FloatingActionButton;
import android.support.design.widget.Snackbar;
import android.support.v7.app.AppCompatActivity;
import android.support.v7.widget.Toolbar;
import android.view.View;
import android.view.Menu;
import android.view.MenuItem;
import android.widget.Spinner;

import com.tutorials.hp.spinnermysql.MySQL.Downloader;

public class MainActivity extends AppCompatActivity {

    Spinner sp;
    static String urlAddress="http://10.0.2.2/android/players.php";

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);
        Toolbar toolbar = (Toolbar) findViewById(R.id.toolbar);
        setSupportActionBar(toolbar);

        sp= (Spinner) findViewById(R.id.sp);

        FloatingActionButton fab = (FloatingActionButton) findViewById(R.id.fab);
        fab.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View view) {
               Downloader d=new Downloader(MainActivity.this,urlAddress,sp);
                d.execute();
            }
        });

    }

}
```

#### 5\. AndroidManifest.xml

Proceed to androidmanifest.xml and add the permission for internet connectovity.

```xml
<manifest>
....
        <uses-permission android_name="android.permission.INTERNET"/>
....
</manifest>
```

#### 6\. PHP Script

Here's a simple php script to retrieve data from mysql database. You place this script in the root directory of your server.

For instance in the `www` directory of Wamp or `htdocs` in Xampp.

But first you must have a database and replace your database credentials in this file:

```php
<?php

$host='127.0.0.1';
$username='root';
$pwd='';
$db="playersdb";

$con=mysqli_connect($host,$username,$pwd,$db) or die('Unable to connect');

if(mysqli_connect_error($con))
{
    echo "Failed to Connect to Database ".mysqli_connect_error();
}

$query=mysqli_query($con,"SELECT * FROM playerstb");

if($query)
{
    while($row=mysqli_fetch_array($query))
    {
        $flag[]=$row;
    }

    print(json_encode($flag));
}
mysqli_close($con);
?>
```

## Example 2: Android MySQL Spinner - Insert, Select, Show

_Android MySQL Tutorial with Spinner. How to Insert, Select then Show data From MySQL into Spinner widget._

- Lets see how to perform basic data entry and retrieval into MySQL database from our android app.
- First we insert multi-column data to MySQL from android.
- Then we retrieve this data and bind it to our spinner component.
- We are using Fast Networking Library to make our network calls.
- It shall be returning us JSON responses in form of JSON,hence we can easily parse this data bind to spinner.
- All network calls happen in the background thread as the library abstracts these for us.

#### Video Tutorial(ProgrammingWizards TV Channel)

Well we have a video tutorial as an alternative to this. If you prefer tutorials like this one then it would be good you [subscribe to our YouTube channel](https://www.youtube.com/channel/UCpdkWp2zh5Qv1ZWlnqswdCw).

Basically we have a TV for programming where do daily tutorials especially android.

#### Full Code - Android Spinner MySQL

Look,the full source code is available for download above.We have included the PHP code we used.Modfiy things like database name and table name of course and save the PHP in your server's root directory.

We shall then need the url to that PHP code as you shall see in our MySQL client class. Moreover,if you are stuck,check our video tutorial below.Its detailed and step by step everything. Lets see our data object,our POJO class.

#### Our MySQL Table Structure

Create a database table.

#### 1\. PHP Code

Here are our php code:

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
         $destination=$_POST['destination'];
        $dbAdapter->insert(array($name,$propellant,$destination));
}else if($_POST['action']=="update")
{
         $dbAdapter=new DBAdapter();
         $id=$_POST['id'];
         $name=$_POST['name'];
         $propellant=$_POST['propellant'];
         $destination=$_POST['destination'];
        $dbAdapter->update($id,array($name,$propellant,$destination));

}else if($_POST['action']=="delete")
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
            $sql="INSERT INTO galileoTB(name,propellant,destination) VALUES('$s[0]','$s[1]','$s[2]')";
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
            $sql="UPDATE galileoTB SET name='$s[0]',propellant='$s[1]',destination='$s[2]' WHERE id='$id'";
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
    compile 'com.amitshekhar.android:android-networking:0.2.0'
}
```

[notice] We are using Fast Android Networking Library as our HTTP Client. You may use newer versions. [/notice]

#### Java Code.

Android apps can be mainly written in Java or Kotlin. These days however there are many frameworks like Flutter also which use languages like Dart.

In this class we are using Java programming language.

We will have these classes in our project.

##### (a). Spacecraft.java

```java
package com.tutorials.hp.spinnermysql.mModel;

public class Spacecraft {

    /*
    INSTANCE FIELDS
     */
    private int id;
    private String name;
    private String propellant;
    private String destination;

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

    public String getDestination() {
        return destination;
    }

    public void setDestination(String destination) {
        this.destination = destination;
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

Then we have our most important class,our MySQL Client class.Its where we make calls to our server and perform CRUD activities.Take note of the URLs pointing us to PHP code.

```java
package com.tutorials.hp.spinnermysql.mMySQL;

import android.content.Context;
import android.widget.ArrayAdapter;
import android.widget.EditText;
import android.widget.Spinner;
import android.widget.Toast;

import com.androidnetworking.AndroidNetworking;
import com.androidnetworking.common.Priority;
import com.androidnetworking.error.ANError;
import com.androidnetworking.interfaces.JSONArrayRequestListener;
import com.tutorials.hp.spinnermysql.mModel.Spacecraft;

import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;

import java.util.ArrayList;

public class MySQLClient {

    //SAVE/RETRIEVE URLS
    private static final String DATA_INSERT_URL="http://10.0.2.2/android/GalacticCity/crud.php";
    private static final String DATA_RETRIEVE_URL="http://10.0.2.2/android/GalacticCity/index.php";

    //INSTANCE FIELDS
    private final Context c;
    private ArrayAdapter<Spacecraft> adapter ;

    public MySQLClient(Context c) {
        this.c = c;

    }
    /*
    SAVE/INSERT
     */
    public void add(Spacecraft s, final EditText...editTexts)
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
                    .addBodyParameter("destination",s.getDestination())
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
                                        //CLEAR EDITXTS
                                        EditText nameTxt = editTexts[0];
                                        EditText propTxt = editTexts[1];
                                        EditText destTxt = editTexts[2];

                                        nameTxt.setText("");
                                        propTxt.setText("");
                                        destTxt.setText("");
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
    public void retrieve(final Spinner sp)
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
                                String destination=jo.getString("destination");

                                s=new Spacecraft();
                                s.setId(id);
                                s.setName(name);
                                s.setPropellant(propellant);
                                s.setDestination(destination);

                                spacecrafts.add(s);
                            }

                            //SET TO SPINNER
                            adapter =new ArrayAdapter(c,android.R.layout.simple_list_item_1,spacecrafts);
                            sp.setAdapter(adapter);

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

##### (d). MainActivity.java

This is our launcher activity as the name suggests. This means it will be the main entry point to our app in that when the user clicks the icon for our app, this activity will get rendered first.

We override a method called `onCreate()`. Here we will start by inflating our main layout via the `setContentView()` method.

Our main activity is actually an [activity](https://camposha.info/android/activity) since it's deriving from the AppCompatActivity.

Finally our MainActivity is here :

```java
package com.tutorials.hp.spinnermysql;

import android.os.Bundle;
import android.support.design.widget.TextInputEditText;
import android.support.v7.app.AppCompatActivity;
import android.support.v7.widget.Toolbar;
import android.view.View;
import android.widget.Button;
import android.widget.Spinner;
import android.widget.Toast;

import com.tutorials.hp.spinnermysql.mModel.Spacecraft;
import com.tutorials.hp.spinnermysql.mMySQL.MySQLClient;

public class MainActivity extends AppCompatActivity {

    //INSTANCE FIELDS
    private TextInputEditText txtName,txtPropellant,txtDestination;
    private Spinner sp;
    private Button btnAdd,btnRetrieve;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);
        Toolbar toolbar = (Toolbar) findViewById(R.id.toolbar);
        setSupportActionBar(toolbar);

        //REFERENCE VIEWS
        this.initializeViews();

        //HANDLE EVENTS
        this.handleClickEvents();

    }

    /*
    REFERENCE VIEWS
     */
    private void initializeViews()
    {

        txtName= (TextInputEditText) findViewById(R.id.nameTxt);
        txtPropellant= (TextInputEditText) findViewById(R.id.propellantTxt);
        txtDestination= (TextInputEditText) findViewById(R.id.destinationTxt);

        btnAdd= (Button) findViewById(R.id.addBtn);
        btnRetrieve= (Button) findViewById(R.id.refreshBtn);

        sp= (Spinner) findViewById(R.id.sp);

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
                String propellant=txtPropellant.getText().toString();
                String destination=txtDestination.getText().toString();

                //BASIC CLIENT SIDE VALIDATION
                if((name.length()<1 || propellant.length()<1 || destination.length()<1 ))
                {
                    Toast.makeText(MainActivity.this, "Please Enter all Fields", Toast.LENGTH_SHORT).show();
                }
                else
                {
                    //SAVE

                    Spacecraft s=new Spacecraft();
                    s.setName(name);
                    s.setPropellant(propellant);
                    s.setDestination(destination);

                    new MySQLClient(MainActivity.this).add(s,txtName,txtPropellant,txtDestination);
                }
            }
        });

        //EVENTS : RETRIEVE
        btnRetrieve.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View view) {
                new MySQLClient(MainActivity.this).retrieve(sp);

            }
        });

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
| 3. | YouTube | [Video Tutorial](https://www.youtube.com/watch?v=q5OhmWmXtwE) |
