# PHP MySQL - Beginners Examples


In this tutorial we will look at basic Android PHP MySQL Examples. We will cover in a practical manner concepts like Saving/Posting to MySQL database from an android app, retrieving data and rendering in a listview, also searching and filtering mysql database.


Let's start.

## Example 1: Android PHP MySQL Save – HTTP POST [HttpURLConnection]

_Android MySQL HttpURLConnection HTTP POST tutorial._

PHP MySQL Save - HTTP POST tutorial here. In this tutorial we are covering how to save data to MySql database via PHP using HttpUrlConnection. If you prefer video tutorial check below at the bottom of this page.

#### Video Tutorial(ProgrammingWizards TV Channel)

Well we have a video tutorial as an alternative to this. If you prefer tutorials like this one then it would be good you [subscribe to our YouTube channel](https://www.youtube.com/channel/UCpdkWp2zh5Qv1ZWlnqswdCw).

Basically we have a TV for programming where do daily tutorials especially android.

#### Full Code

This android php mysql save save tutorial.We are using HttpURLConnection to make a HTTP POST request.

#### 1\. PHP Code

Here's our php code:

```php
<?php

$host='127.0.0.1';
$username='root';
$pwd='';
$db="soccerDB";

$con=mysqli_connect($host,$username,$pwd,$db) or die('Unable to connect');

if(mysqli_connect_error($con))
{
    echo "Failed to Connect to Database ".mysqli_connect_error();
}

$name=$_POST['Name'];
$pos=$_POST['Position'];
$team=$_POST['Team'];

$sql="INSERT INTO soccerTB(Name,Position,Team) VALUES('$name','$pos','$team')";

$result=mysqli_query($con,$sql);

if($result)
{
    echo ('Successfully Saved');
}else
{
    echo('Not saved Successfully');
}
mysqli_close($con);

?>
```

#### 2\. Java Code.

Android apps can be mainly written in Java or Kotlin. These days however there are many frameworks like Flutter also which use languages like Dart.

In this class we are using Java programming language.

We will have these classes in our project.

##### (a). Our Connector Class

- Has a static connect method that takes a URL Address string and returns a HttpURLConnection object.
- Simply establishes connection to our server.
- We set connction properties like Request method which is "POST",as we are making a HTTP POST request.

```java
package com.tutorials.hp.mysqlinsert;

import java.io.IOException;
import java.net.HttpURLConnection;
import java.net.MalformedURLException;
import java.net.URL;

public class Connector {

    /*
    1.SHALL HELP US ESTABLISH A CONNECTION TO THE NETWORK
    1. WE ARE MAKING A POST REQUEST
    */
    public static HttpURLConnection connect(String urlAddress) {

        try
        {
            URL url=new URL(urlAddress);
            HttpURLConnection con= (HttpURLConnection) url.openConnection();

            //SET PROPERTIES
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

##### (b). Our DataPackager Class

- Basically,we package our data here for sending.
- First we add them to aJSON Object.
- Then we encode them into UTF-8 format using URLEncorder class.
- Then we return it as a string ready to be written over the network.

```java
package com.tutorials.hp.mysqlinsert;

import org.json.JSONException;
import org.json.JSONObject;

import java.io.UnsupportedEncodingException;
import java.net.URLEncoder;
import java.util.Iterator;

/**
 * 1.BASICALLY PACKS DATA WE WANNA SEND
 */
public class DataPackager {

    String name,position,team;

    /*
    SECTION 1.RECEIVE ALL DATA WE WANNA SEND
     */
    public DataPackager(String name, String position, String team) {
        this.name = name;
        this.position = position;
        this.team = team;
    }

    /*
   SECTION 2
   1.PACK THEM INTO A JSON OBJECT
   1. READ ALL THIS DATA AND ENCODE IT INTO A FROMAT THAT CAN BE SENT VIA NETWORK
    */
    public String packData()
    {
        JSONObject jo=new JSONObject();
        StringBuffer packedData=new StringBuffer();

        try
        {
            jo.put("Name",name);
            jo.put("Position",position);
            jo.put("Team",team);

            Boolean firstValue=true;

            Iterator it=jo.keys();

            do {
                String key=it.next().toString();
                String value=jo.get(key).toString();

                if(firstValue)
                {
                    firstValue=false;
                }else
                {
                    packedData.append("&");
                }

                packedData.append(URLEncoder.encode(key,"UTF-8"));
                packedData.append("=");
                packedData.append(URLEncoder.encode(value,"UTF-8"));

            }while (it.hasNext());

            return packedData.toString();

        } catch (JSONException e) {
            e.printStackTrace();
        } catch (UnsupportedEncodingException e) {
            e.printStackTrace();
        }

        return null;
    }

}
```

##### (c). Our Sender Class

- Yes,its our Sender class.To send us our data.
- We send our data in a background thread using AsyncTask,the super class of this sender class.
- While sending data in background,we show our Progressdialog,starting it in onPreExcecute() and dismissing immediately onPostExecute() is called.
- We establish an outputStream,write to it using OutputStreamWriter().
- The OutputStreamWriter() instance,we pass to BufferedWriter() instance.
- The bufferedWriter() instance writes our data.
- We then read the server response using bufferedreader instance.

```java
package com.tutorials.hp.mysqlinsert;

import android.app.ProgressDialog;
import android.content.Context;
import android.os.AsyncTask;
import android.widget.EditText;
import android.widget.Toast;

import java.io.BufferedReader;
import java.io.BufferedWriter;
import java.io.IOException;
import java.io.InputStreamReader;
import java.io.OutputStream;
import java.io.OutputStreamWriter;
import java.net.HttpURLConnection;

/**
 * 1.SEND DATA FROM EDITTEXT OVER THE NETWORK
 * 2.DO IT IN BACKGROUND THREAD
 * 3.READ RESPONSE FROM A SERVER
 */
public class Sender extends AsyncTask<Void,Void,String> {

    Context c;
    String urlAddress;
    EditText nameTxt,posTxt,teamTxt;

    String name,pos,team;

    ProgressDialog pd;

    /*
            1.OUR CONSTRUCTOR
    2.RECEIVE CONTEXT,URL ADDRESS AND EDITTEXTS FROM OUR MAINACTIVITY
    */
    public Sender(Context c, String urlAddress,EditText...editTexts) {
        this.c = c;
        this.urlAddress = urlAddress;

        //INPUT EDITTEXTS
        this.nameTxt=editTexts[0];
        this.posTxt=editTexts[1];
        this.teamTxt=editTexts[2];

        //GET TEXTS FROM EDITEXTS
        name=nameTxt.getText().toString();
        pos=posTxt.getText().toString();
        team=teamTxt.getText().toString();

    }
    /*
   1.SHOW PROGRESS DIALOG WHILE DOWNLOADING DATA
    */
    @Override
    protected void onPreExecute() {
        super.onPreExecute();

        pd=new ProgressDialog(c);
        pd.setTitle("Send");
        pd.setMessage("Sending..Please wait");
        pd.show();
    }

    /*
    1.WHERE WE SEND DATA TO NETWORK
    2.RETURNS FOR US A STRING
     */
    @Override
    protected String doInBackground(Void... params) {
        return this.send();
    }

    /*
  1. CALLED WHEN JOB IS OVER
  2. WE DISMISS OUR PD
  3.RECEIVE A STRING FROM DOINBACKGROUND
   */
    @Override
    protected void onPostExecute(String response) {
        super.onPostExecute(response);

        pd.dismiss();

        if(response != null)
        {
            //SUCCESS
            Toast.makeText(c,response,Toast.LENGTH_LONG).show();

            nameTxt.setText("");
            posTxt.setText("");
            teamTxt.setText("");
        }else
        {
            //NO SUCCESS
            Toast.makeText(c,"Unsuccessful "+response,Toast.LENGTH_LONG).show();
        }
    }

/*
SEND DATA OVER THE NETWORK
RECEIVE AND RETURN A RESPONSE
 */
    private String send()
    {
        //CONNECT
        HttpURLConnection con=Connector.connect(urlAddress);

        if(con==null)
        {
            return null;
        }

        try
        {
            OutputStream os=con.getOutputStream();

            //WRITE
            BufferedWriter bw=new BufferedWriter(new OutputStreamWriter(os,"UTF-8"));
            bw.write(new DataPackager(name,pos,team).packData());

            bw.flush();

            //RELEASE RES
            bw.close();
            os.close();

            //HAS IT BEEN SUCCESSFUL?
            int responseCode=con.getResponseCode();

            if(responseCode==con.HTTP_OK)
            {
                //GET EXACT RESPONSE
                BufferedReader br=new BufferedReader(new InputStreamReader(con.getInputStream()));
                StringBuffer response=new StringBuffer();

                String line;

                //READ LINE BY LINE
                while ((line=br.readLine()) != null)
                {
                    response.append(line);
                }

                //RELEASE RES
                br.close();

                return response.toString();

            }else
            {

            }

        } catch (IOException e) {
            e.printStackTrace();
        }

        return null;
    }

}
```

##### (d). Our MainActivity

- Launcher activity.
- Initialize UI like EditTexts.
- Starts the sender Asynctask on button click,passing on urladdress and edittext.

```java
package com.tutorials.hp.mysqlinsert;

import android.os.Bundle;
import android.support.v7.app.AppCompatActivity;
import android.support.v7.widget.Toolbar;
import android.view.View;
import android.widget.Button;
import android.widget.EditText;

/*
1.OUR LAUNCHER ACTIVITY
2.INITIALIZE SOME UI STUFF
3.WE START SENDER ON BUTTON CLICK
 */
public class MainActivity extends AppCompatActivity {

    String urlAddress="http://10.0.2.2/android/poster.php";
    EditText nameTxt,posTxt,teamTxt;
    Button saveBtn;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);
        Toolbar toolbar = (Toolbar) findViewById(R.id.toolbar);
        setSupportActionBar(toolbar);

        //INITIALIZE UI FIELDS
        nameTxt= (EditText) findViewById(R.id.nameEditTxt);
        posTxt= (EditText) findViewById(R.id.posEditTxt);
        teamTxt= (EditText) findViewById(R.id.teamEditTxt);
        saveBtn= (Button) findViewById(R.id.saveBtn);

        saveBtn.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {

                //START ASYNC TASK
                Sender s=new Sender(MainActivity.this,urlAddress,nameTxt,posTxt,teamTxt);
                s.execute();
            }
        });

    }

}
```

#### 3\. Resoources.

[Android](https://camposha.info/android/introduction) platform provides a powerful and flexible way of adding static content as a resource.

These static content will also be packaged into the APK file. The static content will be stored either as a resource or as an asset.

Resources belong to a given type. These types can be:

1. Drawable.
2. Layout.
3. Value.

Let's start by looking at the layout resources

##### (a). activity_main.xml

This layout will get inflated into the main activity's user interface. This will happen via the Activity's `setContentView()` method which will require us to pass it the layout.

We will do so inside the `onCreate()` method of [Activity](https://camposha.info/android/activity).

```xml
<?xml version="1.0" encoding="utf-8"?>
<android.support.design.widget.CoordinatorLayout

    android_layout_width="match_parent"
    android_layout_height="match_parent"
    android_fitsSystemWindows="true"
    tools_context="com.tutorials.hp.mysqlinsert.MainActivity">

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

- Our nice layout

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
    tools_context="com.tutorials.hp.mysqlinsert.MainActivity"
    tools_showIn="@layout/activity_main">

    <TextView
        android_layout_width="wrap_content"
        android_layout_height="wrap_content"
        android_text="Hello World!" />
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
                android_id="@+id/nameEditTxt"
                android_layout_width="match_parent"
                android_layout_height="wrap_content"
                android_singleLine="true"
                android_hint= "Name" />
        </android.support.design.widget.TextInputLayout>

        <android.support.design.widget.TextInputLayout
            android_id="@+id/teamLayout"
            android_layout_width="match_parent"
            android_layout_height="wrap_content">

            <EditText
                android_id="@+id/teamEditTxt"
                android_layout_width="match_parent"
                android_layout_height="wrap_content"

                android_hint="Description" />
        </android.support.design.widget.TextInputLayout>

        <android.support.design.widget.TextInputLayout
            android_id="@+id/posLayout"
            android_layout_width="match_parent"
            android_layout_height="wrap_content">

            <EditText
                android_id="@+id/posEditTxt"
                android_layout_width="match_parent"
                android_layout_height="wrap_content"

                android_hint="Position" />
            <!--android:inputType="textPassword"-->
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

</RelativeLayout>
```

#### 4\. AndroidManifest.xml

Remember to add permission for internet in your manifest file.

```xml
<?xml version="1.0" encoding="utf-8"?>
<manifest
    package="com.tutorials.hp.mysqlinsert">

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

#### Download

Hey,everything is in source code reference that is well commented and easy to understand and can be downloaded below.

Also check our video tutorial it's more detailed and explained in step by step.

| No. | Location | Link |
| --- | --- | --- |
| 1. | GitHub | [Direct Download](https://github.com/Oclemy/MySQLInsert/archive/master.zip) |
| 2. | GitHub | [Browse](https://github.com/Oclemy/MySQLInsert) |
| 3. | YouTube | [Video Tutorial](https://www.youtube.com/watch?v=VwfWoK-SNp0) |

## Example 2: Android PHP MySQL – HTTP GET – Fill ListView

_This is an Android PHP MySQL HTTP GET Tutorial with HttpURLConnection and [ListView](https://camposha.info/android/listview)._

Android PHP MySQL Retrieve- HTTP GET tutorial here. In this tutorial we are covering how to retrieve data from MySql database via PHP using HttpUrlConnection.Then we show the data in a simple ListView.

#### Video Tutorial(ProgrammingWizards TV Channel)

Well we have a video tutorial as an alternative to this. If you prefer tutorials like this one then it would be good you [subscribe to our YouTube channel](https://www.youtube.com/channel/UCpdkWp2zh5Qv1ZWlnqswdCw).

Basically we have a TV for programming where do daily tutorials especially android.

#### Full Code

This android php mysql listview tutorial.We are using HttpURLConnection to make a HTTP GET request.

#### 1\. PHP Code

Here's our php code:

```php
<?php

$host='127.0.0.1';
$username='root';
$pwd='';
$db="spacecraftDB";

$con=mysqli_connect($host,$username,$pwd,$db) or die('Unable to connect');

if(mysqli_connect_error($con))
{
    echo "Failed to Connect to Database ".mysqli_connect_error();
}

$sql="SELECT * FROM spacecraftTB";

$result=mysqli_query($con,$sql);
if($result)
{
    while($row=mysqli_fetch_array($result))
    {
        $data[]=$row;
    }

    print(json_encode($data));
}

mysqli_close($con);

?>
```

#### 2\. Java Code.

Android apps can be mainly written in Java or Kotlin. These days however there are many frameworks like Flutter also which use languages like Dart.

In this class we are using Java programming language.

We will have these classes in our project.

##### (a). Our Connector Class

- Has a static connect method that takes a URL Address string and returns a HttpURLConnection object.
- Simply establishes connection to our server.
- We set connection properties like Request method which is "GET",as we are making a HTTP GET request.

```java
package com.tutorials.hp.mysqlhttpgetlistview.m_MySQL;

import java.io.IOException;
import java.net.HttpURLConnection;
import java.net.MalformedURLException;
import java.net.URL;

/**
 * ROLE : ESTABLISH CONNECTION TO SERVER
 */
public class Connector {

    public static Object connect(String urlAddress)
    {
        try
        {
            URL url=new URL(urlAddress);
            HttpURLConnection con= (HttpURLConnection) url.openConnection();

            //SET CON PROPERTIES
            con.setRequestMethod("GET");
            con.setConnectTimeout(15000);
            con.setReadTimeout(15000);
            con.setDoInput(true);

            return con;

        } catch (MalformedURLException e) {
            e.printStackTrace();
            return "Error "+e.getMessage();

        } catch (IOException e) {
            e.printStackTrace();
            return "Error "+e.getMessage();

        }
    }

}
```

##### (b). Our Downloader Class

- Basically,we download data here.
- We do this in AsyncTask.
- Through a BufferedInputStream.
- Then read using a BufferedReader.
- We then call DataParser class to parse our data.

```java
package com.tutorials.hp.mysqlhttpgetlistview.m_MySQL;

import android.app.ProgressDialog;
import android.content.Context;
import android.os.AsyncTask;
import android.widget.ListView;
import android.widget.Toast;

import java.io.BufferedInputStream;
import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.net.HttpURLConnection;

public class Downloader extends AsyncTask<Void,Void,String>{
    Context c;
    String urlAddess;
    ListView lv;

    ProgressDialog pd;

    public Downloader(Context c, String urlAddess, ListView lv) {
        this.c = c;
        this.urlAddess = urlAddess;
        this.lv = lv;
    }

    @Override
    protected void onPreExecute() {
        super.onPreExecute();

        pd=new ProgressDialog(c);
        pd.setTitle("Retrieve");
        pd.setMessage("Retrieving..Please wait");
        pd.show();
    }

    @Override
    protected String doInBackground(Void... params) {
        return this.downloadData();
    }

    @Override
    protected void onPostExecute(String jsonData) {
        super.onPostExecute(jsonData);

        pd.dismiss();
        if(jsonData.startsWith("Error"))
        {
            Toast.makeText(c,"Unsuccessful "+jsonData,Toast.LENGTH_SHORT).show();
        }else
        {
            //PARSE
            new DataParser(c,jsonData,lv).execute();
        }

    }

    private String downloadData()
    {
        Object connection=Connector.connect(urlAddess);
        if(connection.toString().startsWith("Error"))
        {
            return connection.toString();
        }

        try {
            HttpURLConnection con= (HttpURLConnection) connection;

            InputStream is=new BufferedInputStream(con.getInputStream());
            BufferedReader br=new BufferedReader(new InputStreamReader(is));

            String line;
            StringBuffer jsonData=new StringBuffer();

            while ((line=br.readLine()) != null)
            {
                jsonData.append(line+"n");

            }

            br.close();
            is.close();

            return jsonData.toString();

        } catch (IOException e) {
            e.printStackTrace();
            return "Error "+e.getMessage();
        }

    }
}
```

#### (c). Our DataParser Class

- Yes,its DataParser class.
- To parse our data.
- We use the native org.JSON classes to parse.Using JSONArray and JSONObect.
- We then fill a simple ArrayList with data we have parsed.
- Then pass the arraylist to our ArrayAdapter.
- And bind the adapter to the ListView.
- Then simple ItemClickListener.

```java
package com.tutorials.hp.mysqlhttpgetlistview.m_MySQL;

import android.app.ProgressDialog;
import android.content.Context;
import android.os.AsyncTask;
import android.view.View;
import android.widget.AdapterView;
import android.widget.ArrayAdapter;
import android.widget.ListView;
import android.widget.Toast;

import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;

import java.util.ArrayList;

public class DataParser extends AsyncTask<Void,Void,Boolean> {

    Context c;
    String jsonData;
    ListView lv;

    ProgressDialog pd;
    ArrayList<String> spacecrafts=new ArrayList<>();

    public DataParser(Context c, String jsonData, ListView lv) {
        this.c = c;
        this.jsonData = jsonData;
        this.lv = lv;
    }

    @Override
    protected void onPreExecute() {
        super.onPreExecute();

        pd=new ProgressDialog(c);
        pd.setTitle("Parse");
        pd.setMessage("Pasring..Please wait");
        pd.show();
    }

    @Override
    protected Boolean doInBackground(Void... params) {
        return this.parseData();
    }

    @Override
    protected void onPostExecute(Boolean result) {
        super.onPostExecute(result);

        pd.dismiss();
        if(result)
        {
            ArrayAdapter adapter=new ArrayAdapter(c,android.R.layout.simple_list_item_1,spacecrafts);
            lv.setAdapter(adapter);

            lv.setOnItemClickListener(new AdapterView.OnItemClickListener() {
                @Override
                public void onItemClick(AdapterView<?> parent, View view, int position, long id) {
                    Toast.makeText(c, spacecrafts.get(position), Toast.LENGTH_SHORT).show();
                }
            });
        }
    }

    private Boolean parseData()
    {
        try
        {
            JSONArray ja = new JSONArray(jsonData);
            JSONObject jo;

            spacecrafts.clear();

            for (int i = 0; i < ja.length(); i++) {

                jo = ja.getJSONObject(i);

                String name = jo.getString("name");

                spacecrafts.add(name);
            }

            return true;

        } catch (JSONException e) {
            e.printStackTrace();
        }
        return false;
    }
}
```

#### (d). Our MainActivity

- Launcher [activity](https://camposha.info/android/activity).
- Initialize UI like [ListView](https://camposha.info/android/listview).
- Executes the sender AsyncTask on button click,passing on ListView,Context and URL.

```java
package com.tutorials.hp.mysqlhttpgetlistview;

import android.os.Bundle;
import android.support.design.widget.FloatingActionButton;
import android.support.design.widget.Snackbar;
import android.support.v7.app.AppCompatActivity;
import android.support.v7.widget.Toolbar;
import android.view.View;
import android.view.Menu;
import android.view.MenuItem;
import android.widget.ListView;

import com.tutorials.hp.mysqlhttpgetlistview.m_MySQL.Downloader;

public class MainActivity extends AppCompatActivity {

    final static String urlAddress="http://10.0.2.2/android/spacecraft_select_images.php";

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);
        Toolbar toolbar = (Toolbar) findViewById(R.id.toolbar);
        setSupportActionBar(toolbar);

        final ListView lv= (ListView) findViewById(R.id.lv);

        FloatingActionButton fab = (FloatingActionButton) findViewById(R.id.fab);
        fab.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View view) {
                new Downloader(MainActivity.this,urlAddress,lv).execute();
            }
        });
    }

}
```

#### 3\. Our Layouts

##### (a) activity_main.xml

Our main [activity](https://camposha.info/android/activity) layout.

```xml
<?xml version="1.0" encoding="utf-8"?>
<android.support.design.widget.CoordinatorLayout

    android_layout_width="match_parent"
    android_layout_height="match_parent"
    android_fitsSystemWindows="true"
    tools_context="com.tutorials.hp.mysqlhttpgetlistview.MainActivity">

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

##### (b) ContentMain.xml

- With a simple ListView which will render our data.

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
    tools_context="com.tutorials.hp.mysqlhttpgetlistview.MainActivity"
    tools_showIn="@layout/activity_main">

    <ListView
        android_id="@+id/lv"
        android_layout_width="match_parent"
        android_layout_height="wrap_content"
         />
</RelativeLayout>
```

#### Section 7 : AndroidManifest.xml

- Remember to add permission for internet in your manifest file.

```xml
<?xml version="1.0" encoding="utf-8"?>
<manifest
    package="com.tutorials.hp.mysqlhttpgetlistview">

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

#### Download

Hey,everything is in source code reference that is well commented and easy to understand and can be downloaded below.

Also check our video tutorial it's more detailed and explained in step by step.

| No. | Location | Link |
| --- | --- | --- |
| 1. | GitHub | [Direct Download](https://github.com/Oclemy/MySQL-HTTP-GET-ListView/archive/master.zip) |
| 2. | GitHub | [Browse](https://github.com/Oclemy/MySQL-HTTP-GET-ListView) |
| 3. | YouTube | [Video Tutorial](https://www.youtube.com/watch?v=q5OhmWmXtwE) |
