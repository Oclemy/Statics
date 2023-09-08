# Android PHP MySQL ListView Examples

_Android PHP MySQL ListView Examples and Tutorials._

We want to learn how to work with MySQL database and ListView in android using HttpUrlConnection once and for all. Hence we will explore several complete examples.


Let's start.

## 1\. Android MySQL - Select and Show in ListView(HTTPURLConnection).

Previously we had seen how to connect to mysql and isnert data into database from android. Well that was a HTTP POST request we were making.

We can also retrieve data and show them into a ListView.

While fetching data we will show a progress dialog.

#### HttpURLConnection

Still we use the standard Android Networking API that is `java.net.HTTURLConnection`. Read more about HttpUrlConnection here.

#### Our MySQL Database

Here's our MySQL table structure:

We have the following fields:

1. Id(AutoIncremented) - Integer.
2. Name - String.
3. Position - String.

Read more about mysql here.

#### Project Structure

Here's the project structure:

Let's go.

#### 1\. Gradle Scripts

In our app level build.gradle we add some dependencies.

##### (a). Build.gradle

We add `android.support:appcompat-v7` and `android.support:design`.

```groovy
    dependencies {
        compile fileTree(dir: 'libs', include: ['*.jar'])
        testCompile 'junit:junit:4.12'
        compile 'com.android.support:appcompat-v7:23.2.1'
        compile 'com.android.support:design:23.2.1'
    }
```

#### 2\. Our PHP Script

Here's the PHP script that will connect to the MySQL database.

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

#### 3\. AndroidManifest.xml

Add the permission for internet in the androidmanifest.xml.

```xml
    <uses-permission android_name="android.permission.INTERNET"
```

#### 4\. Layouts

Let's create some layouts.

#### (a). activity_main.xml

Our MainActivity's primary layout. Will get inflated into MainActivity user interface. At the root we have `android.support.design.widget.CoordinatorLayout`.

| This layout has the following responsibilities: | No. | Responsibility |
| --- | --- | --- |
| 1. | Define the AppbarLayout using `android.support.design.widget.AppBarLayout` tag. |
| 2. | Define the ToolBar using the `android.support.v7.widget.Toolbar` tag. |
| 3. | Define the FloatingActionButton using the `android.support.design.widget.FloatingActionButton` tag. |
| 4. | Include the `content_main.xml` which will render our other views and widgets. |

```xml
    <?xml version="1.0" encoding="utf-8"?>
    <android.support.design.widget.CoordinatorLayout

        android_layout_width="match_parent"
        android_layout_height="match_parent"
        android_fitsSystemWindows="true"
        tools_context="com.tutorials.hp.mysqlselector.MainActivity">

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

#### (b). content_main.xml

Our content_main.xml layout. The root tag is `RelativeLayout`.

It has the following responsibilities:

| No. | Responsibility |
| --- | --- |
| 1. | Define/Hold the ListView that will display our data from MySQL database. |
| 2. | It will be included inside the `activity_main.xml` to form the MainActivity layout. |

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
        tools_context="com.tutorials.hp.mysqlselector.MainActivity"
        tools_showIn="@layout/activity_main">

        <TextView
            android_padding="5dp"
            android_id="@+id/textView"
            android_layout_width="wrap_content"
            android_layout_height="wrap_content"
            android_text="Players List!" />
        <ListView
            android_layout_width="wrap_content"
            android_layout_height="wrap_content"
            android_id="@+id/lv"
            android_layout_below="@+id/textView"
            android_layout_alignParentLeft="true"
            android_layout_alignParentStart="true" />
    </RelativeLayout>
```

#### 5\. Java Classes

We have three custom java classes.

##### (a). Downloader.java

Our `Downloader.java` class, a public class that will derive from `android.os.AsyncTask`. This provides us with easy to use threading capabilities.

The purposes of this class includes:

| No. | Responsibility |
| --- | --- |
| 1. | Receive an `android.content.Context` object, a URL address and a ListView widget from the MainActivity. |
| 2. | Instantiate,show and dismiss progress dialog. |
| 3. | Establish connection to the provided URL via the `java.net.HTTPURLConnection`. |
| 4. | Download data and return it as a string in the background thread. |
| 5. | Catch `IOException` and `MalformedURLException`. |
| 6. | Instantiate `Parser` object, pass Context, downloaded string and listview.And execute it. |

```java
    package com.tutorials.hp.mysqlselector;

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
    import java.net.MalformedURLException;
    import java.net.URL;

    public class Downloader extends AsyncTask<Void,Integer,String> {

        Context c;
        String address;
        ListView lv;

        ProgressDialog pd;

        public Downloader(Context c, String address, ListView lv) {
            this.c = c;
            this.address = address;
            this.lv = lv;
        }

        //B4 JOB STARTS
        @Override
        protected void onPreExecute() {
            super.onPreExecute();

            pd=new ProgressDialog(c);
            pd.setTitle("Fetch Data");
            pd.setMessage("Fetching Data...Please wait");
            pd.show();
        }

        @Override
        protected String doInBackground(Void... params) {
            String data=downloadData();
            return data;
        }

        @Override
        protected void onPostExecute(String s) {
            super.onPostExecute(s);

            pd.dismiss();;

            if(s != null)
            {
                Parser p=new Parser(c,s,lv);
                p.execute();

            }else
            {
                Toast.makeText(c,"Unable to download data",Toast.LENGTH_SHORT).show();
            }
        }

        private String downloadData()
        {
            //connect and get a stream
            InputStream is=null;
            String line =null;

            try {
                URL url=new URL(address);
                HttpURLConnection con= (HttpURLConnection) url.openConnection();
                is=new BufferedInputStream(con.getInputStream());

                BufferedReader br=new BufferedReader(new InputStreamReader(is));

                StringBuffer sb=new StringBuffer();

                if(br != null) {

                    while ((line=br.readLine()) != null) {
                        sb.append(line+"n");
                    }

                }else {
                    return null;
                }

                return sb.toString();

                } catch (MalformedURLException e) {
                e.printStackTrace();
            } catch (IOException e) {
                e.printStackTrace();
            }finally {
                if(is != null)
                {
                    try {
                        is.close();
                    } catch (IOException e) {
                        e.printStackTrace();
                    }
                }
            }
        return null;
        }
    }
```

##### (b). Parser.java

This is our custom `Parser` class. The class still extends `android.os.AsyncTask`.

This class will parse our JSON string and fill our listview.

It has the following roles:

| No. | Responsibility |
| --- | --- |
| 1. | Receive Context object,ListView and the downloaded data from `Downloaded` class. |
| 2. | Define an arraylist to hold the downloaded data. |
| 3. | Instantiate, show and dismiss the progress dialog. |
| 4. | Parse the json string and populate our ArrayList. We do this in the background thread inside the `doInbackground()` method. |
| 5. | Bind our arraylist to our ListView. |

```java
    package com.tutorials.hp.mysqlselector;

    import android.app.ProgressDialog;
    import android.content.Context;
    import android.os.AsyncTask;
    import android.support.design.widget.Snackbar;
    import android.view.View;
    import android.widget.AdapterView;
    import android.widget.ArrayAdapter;
    import android.widget.ListView;
    import android.widget.Toast;

    import org.json.JSONArray;
    import org.json.JSONException;
    import org.json.JSONObject;

    import java.util.ArrayList;
    import java.util.List;

    public class Parser extends AsyncTask<Void,Integer,Integer> {

        Context c;
        ListView lv;
        String data;

        ArrayList<String> players=new ArrayList<>();
        ProgressDialog pd;

        public Parser(Context c, String data, ListView lv) {
            this.c = c;
            this.data = data;
            this.lv = lv;
        }

        @Override
        protected void onPreExecute() {
            super.onPreExecute();

            pd=new ProgressDialog(c);
            pd.setTitle("Parser");
            pd.setMessage("Parsing ....Please wait");
            pd.show();
        }

        @Override
        protected Integer doInBackground(Void... params) {

            return this.parse();
        }

        @Override
        protected void onPostExecute(Integer integer) {
            super.onPostExecute(integer);

            if(integer == 1)
            {
                //ADAPTER
                ArrayAdapter<String> adapter=new ArrayAdapter<String>(c,android.R.layout.simple_list_item_1,players);

                //ADAPT TO LISTVIEW
                lv.setAdapter(adapter);

                //LISTENET
                lv.setOnItemClickListener(new AdapterView.OnItemClickListener() {
                    @Override
                    public void onItemClick(AdapterView<?> parent, View view, int position, long id) {
                        Snackbar.make(view,players.get(position),Snackbar.LENGTH_SHORT).show();;
                    }
                });

            }else
            {
                Toast.makeText(c,"Unable to Parse",Toast.LENGTH_SHORT).show();
            }

            pd.dismiss();
        }

        //PARSE RECEIVED DATA
        private int parse()
        {
            try
            {
                //ADD THAT DATA TO JSON ARRAY FIRST
                JSONArray ja=new JSONArray(data);

                //CREATE JO OBJ TO HOLD A SINGLE ITEM
                JSONObject jo=null;

                players.clear();

                //LOOP THRU ARRAY
                for(int i=0;i<ja.length();i++)
                {
                    jo=ja.getJSONObject(i);

                    //RETRIOEVE NAME
                    String name=jo.getString("Name");

                    //ADD IT TO OUR ARRAYLIST
                    players.add(name);
                }

                return 1;

            } catch (JSONException e) {
                e.printStackTrace();
            }

            return 0;
        }
    }
```

##### (c). MainActivity.java

Our public class that will be the launcher activity. It will derive from `android.support.v7.app.AppCompatActivity`.

This class the following responsibilities:

| No. | Responsibility |
| --- | --- |
| 1. | Allow itself to become an android [activity](https://camposha.info/android/activity) component by |

deriving from `android.support.v7.app.AppCompatActivity`.| |2.|Listen to activity creation callbacks by overrding the `onCreate()` method.| |3.|Invoke the `onCreate()` method of the parent [Activity](https://camposha.info/android/activity)

class and tell it of a [Bundle](https://camposha.info/android/activity) we've received. | |4.|Inflate the `activity_main.xml` into a View object and set

it as the content view of this activity.| |5.| Define our URL address. This URL address leads to ou PHP script| |6.| Reference the `android.support.v7.widget.Toolbar` and set it to the SupportActionBar.| |7.| Reference ListView from layout.| |8.| Instantiate `Downloader` class. Pass in the URL addtess, ListView and Context.| |9.| Execute the download operation.|

```java
    package com.tutorials.hp.mysqlselector;

    import android.os.Bundle;
    import android.support.design.widget.FloatingActionButton;
    import android.support.design.widget.Snackbar;
    import android.support.v7.app.AppCompatActivity;
    import android.support.v7.widget.Toolbar;
    import android.view.View;
    import android.view.Menu;
    import android.view.MenuItem;
    import android.widget.ListView;

    public class MainActivity extends AppCompatActivity {

        String url="http://10.0.2.2/android/players.php";

        @Override
        protected void onCreate(Bundle savedInstanceState) {
            super.onCreate(savedInstanceState);
            setContentView(R.layout.activity_main);
            Toolbar toolbar = (Toolbar) findViewById(R.id.toolbar);
            setSupportActionBar(toolbar);

            final ListView lv= (ListView) findViewById(R.id.lv);
            final Downloader d=new Downloader(this,url,lv);

            FloatingActionButton fab = (FloatingActionButton) findViewById(R.id.fab);
            fab.setOnClickListener(new View.OnClickListener() {
                @Override
                public void onClick(View view) {
                    //EXECUTE DOWNLOAD
                    d.execute();
                }
            });
        }
    }
```

#### Download

You can download the code [here](http://github.com/Oclemy/AndroidMySQLandListView/archives/master.zip).

* * *

## 2\. Android MySQL - Select Multiple Columns and Fill Custom ListView

[center]_Android MySQL - Select Multiple Columns and Fill Custom ListView Tutorial_[/center]

How to select multiple columns from mysql database and populate a custom listview with multiple textviews.

#### Overview

Welcome. In this class we are going to look at MySQL database. How to connect to MySQL, retrieve multiple columns and rows from a given database table and bind them to a custom ListView.

That ListView will have several fields, each representing a given record column from our mysql database table.

These fields will include:

- ID.
- Name.
- Propellant.
- Description.

Our application will have the following classes:

| No. | Class | Description |
| --- | --- | --- |
| 1. | `Spacecraft.java` | Will represent our data object. We will be selecting spacecrafts from our mysql database. |
| 2. | `CustomAdapter.java` | This is the adapter needed to adapt our data to our custom listview. It will also inflate the custom layout which will make up the ListView view items. |
| 3. | `Connector.java` | This is the class responsibe for setting up our connection and returning a `HttpURLConnection` object. |
| 4. | `DataParser.java` | This is the class responsible for parsing our JSON data and returning an ArrayList containing our data. |
| 5. | `Downloader.java` | This is the class responsible for actually downloading our json data in a background thread via AsyncTask. The networking class used for this download is our HttpURLConnection. |
| 6. | `MainActivity.java` | This is our main [activity](https://camposha.info/android/activity). It represents the overall user interface or screen. |

#### Tools Used

These are the tools we used to create the project:

1. Language : Java.
2. Platform : Android.
3. IDE : Android Studio.
4. OS : Windows 8.1

Let's go.

#### 1\. PHP Code

Here's our PHP Code to select multiple columns data from our mysql database and return it in json format. Am using Wamp: `C:wampwwwandroidspacecraft_select.php`.

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
        $flag[]=$row;
    }

    print(json_encode($flag));

}

mysqli_close($con);

?>
```

#### 2\. Setup

##### (a). Create Basic Activity Project

1. First create a new project in android studio. Go to File --> New Project.

##### (b). Project Structure

Here's our project structure:

##### (c). Build.Gradle

Our app level(app folder) build.gradle.

AndroidStudio allows us to add our application dependencies right here using `compile` statements.

So we add our dependencies here. You may use later versions of the dependencies.

```groovy
dependencies {
    compile fileTree(dir: 'libs', include: ['*.jar'])
    testCompile 'junit:junit:4.12'
    compile 'com.android.support:appcompat-v7:26.+'
    compile 'com.android.support:design:26.+'
    compile 'com.android.support:cardview-v7:26.+'

}
```

##### (d). AndroidManifest.xml

We add internet permission here.

```xml
<?xml version="1.0" encoding="utf-8"?>
<manifest
    package="com.tutorials.hp.mdmysqlselect">

    <uses-permission android_name="android.permission.INTERNET"/>
    ...
</manifest>
```

#### 3\. Create User Interface

User interfaces are typically created in android using XML layouts as opposed to direct java coding.

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
    tools_context="com.tutorials.hp.mdmysqlselect.MainActivity">

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

This layout gets included in your activity_main.xml. We define our UI widgets here.

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
    tools_context="com.tutorials.hp.mdmysqlselect.MainActivity"
    tools_showIn="@layout/activity_main">

    <ListView
        android_id="@+id/lv"
        android_layout_width="match_parent"
        android_layout_height="wrap_content"
         />
</RelativeLayout>
```

##### (c). model.xml

This is our custom row layout. Our model layout.

```xml
<?xml version="1.0" encoding="utf-8"?>
<android.support.v7.widget.CardView
    android_orientation="horizontal" android_layout_width="match_parent"

    android_layout_margin="10dp"
    card_view_cardCornerRadius="5dp"
    card_view_cardElevation="5dp"

    android_layout_height="150dp">

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
            android_textColor="@color/colorAccent"

            android_layout_alignParentLeft="true"
             />

        <TextView
            android_layout_width="wrap_content"
            android_layout_height="wrap_content"
            android_textAppearance="?android:attr/textAppearanceLarge"
            android_text="Description....................."
            android_id="@+id/descTxt"
            android_padding="10dp"
            android_layout_below="@+id/nameTxt"
            android_layout_alignParentLeft="true"

            />

        <TextView
            android_layout_width="wrap_content"
            android_layout_height="wrap_content"
            android_textAppearance="?android:attr/textAppearanceLarge"
            android_text="Propellant"
            android_id="@+id/propellantTxt"
            android_textColor="@color/colorPrimary"
            android_padding="10dp"
            android_layout_alignParentRight="true"
            />

    </RelativeLayout>
</android.support.v7.widget.CardView>
```

#### 4\. Java Code

##### (a). Spacecraft.java

Android is normally written in Java programming language. Java classes are normally organized in packages. This class will have the `com.tutorials.hp.mdmysqlselect.mDataObject` package.

This class is a public class and represents a single spacecraft for us.

The class will have the following instance fields:

1. Id - spacecraft id.
2. Name - spacecraft name.
3. Propellant - spacecraft propellant.
4. description - spacecraft description.

We create the getters and setters of these instance fields.

```java
package com.tutorials.hp.mdmysqlselect.mDataObject;

public class Spacecraft {
    int id;
    String name,propellant,description;

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

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }
}
```

##### (b). CustomAdapter.java

This class will be deriving from `android.widget.BaseAdapter`. This class is public class.

This class will maintain a couple of instance fields:

```java
    Context c;
    ArrayList<Spacecraft> spacecrafts;
    LayoutInflater inflater;
```

1. Context object - Will assist in inflation of our model layout.
2. ArrayList of generic type Spacecraft class.
3. LayoutInflater object to inflate our `model.xml` layout.

The constructor of this class will take in a Context object and an ArrayList of spacecrafts objects.

Then inside the Constructor we assign those objects to their respective class instance fields that we had defined.

```java
this.c = c;
this.spacecrafts = spacecrafts;
```

We then initialiaze our LayoutInflater class: `inflater= (LayoutInflater) c.getSystemService(Context.LAYOUT_INFLATER_SERVICE)` assigning to LayoutInflater class.

LayoutInflater instance will later allow us inflate our XML layout into view object.

After deriving from baseadapter, we will be forced to implement a couple of abstract methods. These include :

1. `getCount()` - return the number of spacecrafts to bind to our ListView.
2. `getItem()`\- get a single spacecraft object.
3. `getView()` - inflate the `model.xml` layout and return it as a view object.

```java
package com.tutorials.hp.mdmysqlselect.mListView;

import android.content.Context;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.BaseAdapter;
import android.widget.TextView;
import android.widget.Toast;

import com.tutorials.hp.mdmysqlselect.R;
import com.tutorials.hp.mdmysqlselect.mDataObject.Spacecraft;

import java.util.ArrayList;

public class CustomAdapter extends BaseAdapter {

    Context c;
    ArrayList<Spacecraft> spacecrafts;
    LayoutInflater inflater;

    public CustomAdapter(Context c, ArrayList<Spacecraft> spacecrafts) {
        this.c = c;
        this.spacecrafts = spacecrafts;

        //INITIALIE
        inflater= (LayoutInflater) c.getSystemService(Context.LAYOUT_INFLATER_SERVICE);
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
        return spacecrafts.get(position).getId();
    }

    @Override
    public View getView(final int position, View convertView, ViewGroup parent) {
        if(convertView==null)
        {
            convertView=inflater.inflate(R.layout.model,parent,false);
        }

        TextView nameTxt= (TextView) convertView.findViewById(R.id.nameTxt);
        TextView propellantTxt= (TextView) convertView.findViewById(R.id.propellantTxt);
        TextView descTxt= (TextView) convertView.findViewById(R.id.descTxt);

        nameTxt.setText(spacecrafts.get(position).getName());
        propellantTxt.setText(spacecrafts.get(position).getPropellant());
        descTxt.setText(spacecrafts.get(position).getDescription());

        //ITEM CLICKS
        convertView.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                Toast.makeText(c,spacecrafts.get(position).getName(),Toast.LENGTH_SHORT).show();
            }
        });

        return convertView;
    }
}
```

##### (c). Connector.java

Next we come to our `Connector.java` class.

This class is a public class with one static method.

This method is our `connect(..)` method. This method will take a string object we are calling `urlAddress` to represent the URL string to our server side PHP script that will allow us fetch data from mysql database.

This method will return us a `java.net.HttpURLConnection`.

We'll have a try-catch block, catching two exceptions :

1. `java.net.MalformedURLException` - Raised when a malformed URL is encountered.
2. `java.io.IOException` - Raised when an IO(Input Output) error has occured.

First we attempt to instantiate a `java.net.URL` passing in our URL address. URL stands for Uniform Resouce Locator and points to a Resource in a the World Wide Web. In this case that resource will be our php script.

`url.openConnection()` will return us a URLConnection object which represents the connection to the remote object referred to by the URL.

We cast that `URLConnection` to HttpURLConnection. HttpURLConnection is a url connection which supports HTTP specific features. It works with the HTTP protocol.

`con.setRequestMethod()` will set the HTTP Request method that we support. These can be :

1. GET.
2. POST.
3. PUT.
4. DELETE.
5. HEAD.
6. OPTIONS.

We use `GET` since we are fetching data.

`con.setReadTimeout()` will specify the timeout for reading our resouce while `con.setConnectTimeout()` indicates the timeout for our connection.

`con.setDoInput()` indicates that our connection supports input of data.

```java
package com.tutorials.hp.mdmysqlselect.mMySQL;

import java.io.IOException;
import java.net.HttpURLConnection;
import java.net.MalformedURLException;
import java.net.URL;

public class Connector {

    public static HttpURLConnection connect(String urlAddress)
    {
        try {
            URL url=new URL(urlAddress);
            HttpURLConnection con= (HttpURLConnection) url.openConnection();

            //SET PROPS
            con.setRequestMethod("GET");
            con.setConnectTimeout(20000);
            con.setReadTimeout(20000);
            con.setDoInput(true);

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

##### (d). DataParser.java

This is our Data Parser class.

```java
package com.tutorials.hp.mdmysqlselect.mMySQL;

import android.app.ProgressDialog;
import android.content.Context;
import android.os.AsyncTask;
import android.widget.ListView;
import android.widget.Toast;

import com.tutorials.hp.mdmysqlselect.mDataObject.Spacecraft;
import com.tutorials.hp.mdmysqlselect.mListView.CustomAdapter;

import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;

import java.util.ArrayList;

public class DataParser  extends AsyncTask<Void,Void,Integer>{

    Context c;
    ListView lv;
    String jsonData;

    ProgressDialog pd;
    ArrayList<Spacecraft> spacecrafts=new ArrayList<>();

    public DataParser(Context c, ListView lv, String jsonData) {
        this.c = c;
        this.lv = lv;
        this.jsonData = jsonData;
    }

    @Override
    protected void onPreExecute() {
        super.onPreExecute();

        pd=new ProgressDialog(c);
        pd.setTitle("Parse");
        pd.setMessage("Parsing...Please wait");
        pd.show();
    }

    @Override
    protected Integer doInBackground(Void... params) {
        return this.parseData();
    }

    @Override
    protected void onPostExecute(Integer result) {
        super.onPostExecute(result);

        pd.dismiss();
        if(result==0)
        {
            Toast.makeText(c,"Unable to parse",Toast.LENGTH_SHORT).show();
        }else {
            //CALL ADAPTER TO BIND DATA
            CustomAdapter adapter=new CustomAdapter(c,spacecrafts);
            lv.setAdapter(adapter);
        }
    }

    private int parseData()
    {
        try {
            JSONArray ja=new JSONArray(jsonData);
            JSONObject jo=null;

            spacecrafts.clear();
            Spacecraft s=null;

            for(int i=0;i<ja.length();i++)
            {
                jo=ja.getJSONObject(i);

                int id=jo.getInt("id");
                String name=jo.getString("name");
                String propellant=jo.getString("propellant");
                String description=jo.getString("description");

                s=new Spacecraft();
                s.setId(id);
                s.setName(name);
                s.setPropellant(propellant);
                s.setDescription(description);

                spacecrafts.add(s);

            }

            return 1;

        } catch (JSONException e) {
            e.printStackTrace();
        }

        return 0;
    }
}
```

##### (e). Downloader.java

```java
package com.tutorials.hp.mdmysqlselect.mMySQL;

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

public class Downloader extends AsyncTask<Void,Void,String> {

    Context c;
    String urlAddress;
    ListView lv;

    ProgressDialog pd;

    public Downloader(Context c, String urlAddress, ListView lv) {
        this.c = c;
        this.urlAddress = urlAddress;
        this.lv = lv;
    }

    @Override
    protected void onPreExecute() {
        super.onPreExecute();

        pd=new ProgressDialog(c);
        pd.setTitle("Fetch");
        pd.setMessage("Fetching....Please wait");
        pd.show();
    }

    @Override
    protected String doInBackground(Void... params) {
        return this.downloadData();
    }

    @Override
    protected void onPostExecute(String s) {
        super.onPostExecute(s);

        pd.dismiss();

        if(s==null)
        {
            Toast.makeText(c,"Unsuccessfull,Null returned",Toast.LENGTH_SHORT).show();
        }else
        {
            //CALL DATA PARSER TO PARSE
            DataParser parser=new DataParser(c,lv,s);
            parser.execute();

        }

    }

    private String downloadData()
    {
        HttpURLConnection con=Connector.connect(urlAddress);
        if(con==null)
        {
            return null;
        }

        InputStream is=null;
        try {

            is=new BufferedInputStream(con.getInputStream());
            BufferedReader br=new BufferedReader(new InputStreamReader(is));

            String line=null;
            StringBuffer response=new StringBuffer();

            if(br != null)
            {
                while ((line=br.readLine()) != null)
                {
                    response.append(line+"n");
                }

                br.close();

            }else
            {
                return null;
            }

            return response.toString();

        } catch (IOException e) {
            e.printStackTrace();
        }finally {
            if(is != null)
            {
                try {
                    is.close();
                } catch (IOException e) {
                    e.printStackTrace();
                }
            }
        }

        return null;
    }
}
```

##### (f). MainActivity.java

```java
package com.tutorials.hp.mdmysqlselect;

import android.os.Bundle;
import android.support.design.widget.FloatingActionButton;
import android.support.design.widget.Snackbar;
import android.support.v7.app.AppCompatActivity;
import android.support.v7.widget.Toolbar;
import android.view.View;
import android.view.Menu;
import android.view.MenuItem;
import android.widget.ListView;

import com.tutorials.hp.mdmysqlselect.mMySQL.Downloader;

public class MainActivity extends AppCompatActivity {

    //spacecraft_select.php is our pho code. It is contained in
    //a folder called `android`. : `C://wamp/www/android/spacecraft_select.php`
    String urlAddress="http://10.0.2.2/android/spacecraft_select.php";

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
                Downloader d=new Downloader(MainActivity.this,urlAddress,lv);
                d.execute();
            }
        });
    }

}
```

## 3\. Android PHP MySQL – Images and Text – Select then Fill ListView

_Android_ PHP MySQL - Images and Text - Select then Fill ListView

Android MySQL images text listview Tutorial. We see how to select images and text from mysql databse and show in a ListView.

#### Part 1 - Introduction

Applications are many that show lists of data in google play.Most of the time these images aren't stored locally.That would be a disaster in terms of the amount of storage these applications utilize as well as the overall performance of the application.

These images usually have to be in some ways dynamic.Image manipulations when done locally can be quite resource intensive,hence the resizing and manipulations can be done in the server side.Anyway today we want to see how to retrieve images from a  MySQL database and show them in our ListView.

We only retrieve the image urls from the database and render the images using `Picasso`.This ensures we can lazily load the images and can even resize them without any considerable performance penalty.We show text alongside the images.

##### What we do :

- Fetch images urls and text from MySQL database.
- Of course via PHP.
- We make a HTTP GET Request hence receiving a blob of json data.
- This data,the json array,we parse it using JSONArray and JSONObject classes in our java android.
- We render the images using Picasso ImageLoader library.
- The ListView consists of images and text.
- We are using AsyncTask to perform this GET request.
- This ensures our Main Thread remains responsive.
- To show user progress we use ProgressDialog.
- Both parsing and downloading data,we abstract them in separate classes.
- We also do both in background thread.

##### Common Questions we answer :

- Images and Text MySQL database.
- Image URLs MySQL database.
- Android MySQL Select data.
- Fill ListView From MySQL.
- Custom ListView with Images and Text.
- AsyncTask threading.
- PHP MySQL android select data.
- Download JSON AsyncTask.
- parse JSON AsyncTask.
- Show progress asynctask.
- Making HTTP GET Request.
- Picasso Imageloader to load images to ListView.

##### What You'll do :

- Create a project in android studio.
- Give it a name and choose minimum and target SDKs.
- Add permission for internet connection in your android manifest.
- Add a dependency statement for a Picasso library we'll use.
- Create a MySQL table and write some PHP code.
- Run your project.
- I tested mine in bluestacks emulator.

##### Overview :

**Classes**

1. MainActivity class
2. Spacecraft class
3. Connector class.
4. Downloader class.
5. DataParser class.
6. CustomAdapter class

**Layouts**

1. ActivityMain.xml
2. ContentMain.xml
3. Model.xml

**AndroidManifest.xml**

1. Add Permission for Internet

**Project Structure**

![Project Structure Image](http://res.cloudinary.com/oclemy/image/upload/v1477572991/MySQL/ListViewImagesText/Android_MySQL_ListView_Images_Text_Structure.png)

**Expected results**

![Android MySQL ListView](http://res.cloudinary.com/oclemy/image/upload/v1477572999/MySQL/ListViewImagesText/Android_MySQL_ListView_Images_Text.png)]([https://camposha.info](https://camposha.info)) Android MySQL ListView[/caption]

#### Part 2 - PHP Script

Below is our PHP script we used in this tutorial.You need to use your own database credentials.

- The script selects data from mysql database.
- It then encodes it into JSON format.
- When we make a GET request we end up with the JSON array.

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

Test your script on the browser after creating database and adding data.If right you should see JSON like below :

![JSON](http://res.cloudinary.com/oclemy/image/upload/v1477573013/MySQL/ListViewImagesText/Android_MySQL_Test_JSON_In_Browser.png)

#### Part 3 - Layouts

We chose Basic activity so two layouts are auto created by android studio.ActivityMain.xml and ContentMain.xml. We then go ahead and create Model.xml.

![Android MySQL ListView](http://res.cloudinary.com/oclemy/image/upload/v1477572999/MySQL/ListViewImagesText/Android_MySQL_ListView_Images_Text.png)

##### (a). activity_main.xml

- Inflated as our activity’s view.
- Includes our content main layout.
- Contains support.v4 widgets like Cordinatorlayout, appbarlayout, toolbar and our floating action button view.

```xml
<?xml version="1.0" encoding="utf-8"?>
<android.support.design.widget.CoordinatorLayout

    android_layout_width="match_parent"
    android_layout_height="match_parent"
    android_fitsSystemWindows="true"
    tools_context="com.tutorials.hp.mysqllistviewimages.MainActivity">

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

##### (b). ContentMain.xml Layout.

- Lets add our ListView here.

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
    tools_context="com.tutorials.hp.mysqllistviewimages.MainActivity"
    tools_showIn="@layout/activity_main">

    <ListView
        android_id="@+id/lv"
        android_layout_width="wrap_content"
        android_layout_height="wrap_content"
         />
</RelativeLayout>
```

##### (c). Model.xml Layout.

- This shall get inflated to a single view item in our ListView.

```xml
<?xml version="1.0" encoding="utf-8"?>
<android.support.v7.widget.CardView
    android_orientation="horizontal" android_layout_width="match_parent"

    android_layout_margin="10dp"
    card_view_cardCornerRadius="5dp"
    card_view_cardElevation="5dp"
    android_layout_height="150dp">

    <LinearLayout
        android_orientation="horizontal"
        android_layout_width="match_parent"
        android_layout_height="match_parent">

        <ImageView
            android_layout_width="250dp"
            android_layout_height="wrap_content"
            android_id="@+id/movieImage"
            android_padding="10dp"
            android_src="@drawable/fruits" />

        <TextView
            android_layout_width="wrap_content"
            android_layout_height="wrap_content"
            android_textAppearance="?android:attr/textAppearanceLarge"
            android_text="Name"
            android_id="@+id/nameTxt"
            android_padding="10dp"
            android_textColor="@color/colorAccent"
            android_layout_alignParentLeft="true"
             />

    </LinearLayout>
</android.support.v7.widget.CardView>
```

#### Part 3 - Java Code

In this part we are going to write some java code.We prefer to break down our work into one class one responsibility so we may use many classes.

![Classes](http://res.cloudinary.com/oclemy/image/upload/v1477572991/MySQL/ListViewImagesText/Android_MySQL_ListView_Images_Text_Structure.png)

#### (a). Build.Gradle

- We are using Picasso library to load our images,so we need its dependency.
- We are using CardViews within our custom ListView.

```groovy
dependencies {
    compile fileTree(dir: 'libs', include: ['*.jar'])
    testCompile 'junit:junit:4.12'
    compile 'com.android.support:appcompat-v7:23.3.0'
    compile 'com.android.support:design:23.3.0'
    compile 'com.android.support:cardview-v7:23.3.0'
    //compile project(':picasso-2.5.2')
     compile 'com.squareup.picasso:picasso:2.5.2'

}
```

##### (b). AndroidManifest.xml

- Add Internet permission cause we are downloading the images via their urls from our mysql database via php code.

```xml
<?xml version="1.0" encoding="utf-8"?>
<manifest
    package="com.tutorials.hp.mysqllistviewimages">

    <uses-permission android_name="android.permission.INTERNET"/>
    ....

</manifest>
```

##### (c). Spacecraft.java

- Represents a singe data object.

```java
package com.tutorials.hp.mysqllistviewimages.m_DataObject;

public class Spacecraft {

    int id;
    String name;
    String imageUrl;

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

    public String getImageUrl() {
        return imageUrl;
    }

    public void setImageUrl(String imageUrl) {
        this.imageUrl = imageUrl;
    }
}
```

##### (d). Connector Class

- Responsible for connection to network.
- We use HTTPUrlConnetion.
- We are making a HTTP GET request to server,

```java
package com.tutorials.hp.mysqllistviewimages.m_MySQL;

import java.io.IOException;
import java.net.HttpURLConnection;
import java.net.MalformedURLException;
import java.net.URI;
import java.net.URISyntaxException;
import java.net.URL;

public class Connector {

    public static HttpURLConnection connect(String urlAddress)
    {
        try {
            URL url=new URL(urlAddress);
            HttpURLConnection con= (HttpURLConnection) url.openConnection();

            //CON PROP
            con.setRequestMethod("GET");
            con.setConnectTimeout(20000);
            con.setReadTimeout(20000);
            con.setDoInput(true);

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

##### (e). Data Downloader Class

- Downloads data in the background thread via asynctask.
- Meanwhile we show a progress dialog
- The data is then parsed to Data parser class to be parsed.

```java
package com.tutorials.hp.mysqllistviewimages.m_MySQL;

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

public class Downloader extends AsyncTask<Void,Void,String> {

    Context c;
    String urlAddress;
    ListView lv;

    ProgressDialog pd;

    public Downloader(Context c, String urlAddress, ListView lv) {
        this.c = c;
        this.urlAddress = urlAddress;
        this.lv = lv;
    }

    @Override
    protected void onPreExecute() {
        super.onPreExecute();

        pd=new ProgressDialog(c);
        pd.setTitle("Retrieve");
        pd.setMessage("Retrieving...Please wait");
        pd.show();
    }

    @Override
    protected String doInBackground(Void... params) {
        return downloadData();
    }

    @Override
    protected void onPostExecute(String jsonData) {
    super.onPostExecute(jsonData);

        pd.dismiss();

        if(jsonData==null)
        {
            Toast.makeText(c,"Unsuccessful,No data Retrieved",Toast.LENGTH_SHORT).show();
        }else {
            //PARSE
            DataParser parser=new DataParser(c,jsonData,lv);
            parser.execute();

        }
    }

    private String downloadData()
    {
        HttpURLConnection con=Connector.connect(urlAddress);
        if(con==null)
        {
            return null;
        }

        try
        {
            InputStream is=new BufferedInputStream(con.getInputStream());
            BufferedReader br=new BufferedReader(new InputStreamReader(is));

            String line;
            StringBuffer jsonData=new StringBuffer();

            while ((line=br.readLine()) != null)
            {
                jsonData.append(line+"n");
            }

            br.close();
            is.close();

            return jsonData.toString();

        } catch (IOException e) {
            e.printStackTrace();
        }

        return null;
    }
}
```

##### (f). Data Parser Class

- Parses our downloaded json data natively.
- Then passes this data to CustomAdapter to be bound.

```java
package com.tutorials.hp.mysqllistviewimages.m_MySQL;

import android.app.ProgressDialog;
import android.content.Context;
import android.os.AsyncTask;
import android.widget.ListView;
import android.widget.Toast;

import com.tutorials.hp.mysqllistviewimages.m_DataObject.Spacecraft;
import com.tutorials.hp.mysqllistviewimages.m_UI.CustomAdapter;

import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;

import java.util.ArrayList;

public class DataParser extends AsyncTask<Void,Void,Integer> {

    Context c;
    String jsonData;
    ListView lv;

    ProgressDialog pd;
    ArrayList<Spacecraft> spacecrafts=new ArrayList<>();

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
        pd.setMessage("Parsing...Please wait");
        pd.show();
    }

    @Override
    protected Integer doInBackground(Void... params) {
        return this.parseData();
    }

    @Override
    protected void onPostExecute(Integer result) {
        super.onPostExecute(result);

        pd.dismiss();

        if(result==0)
        {
            Toast.makeText(c,"Unable To Parse",Toast.LENGTH_SHORT).show();
        }else {
            //BIND DATA TO LISTVIEW
            CustomAdapter adapter=new CustomAdapter(c,spacecrafts);
            lv.setAdapter(adapter);
        }
    }

    private int parseData()
    {
        try
        {
            JSONArray ja=new JSONArray(jsonData);
            JSONObject jo=null;

            spacecrafts.clear();
            Spacecraft spacecraft;

            for(int i=0;i<ja.length();i++)
            {
                jo=ja.getJSONObject(i);

                int id=jo.getInt("id");
                String name=jo.getString("name");
                String imageUrl=jo.getString("imageurl");

                spacecraft=new Spacecraft();

                spacecraft.setId(id);
                spacecraft.setName(name);
                spacecraft.setImageUrl(imageUrl);

                spacecrafts.add(spacecraft);
            }

            return 1;

        } catch (JSONException e) {
            e.printStackTrace();
        }

        return 0;
    }
}
```

##### (g). Picasso Client class

- Uses Picasso ImageLoader to download our image into an imageview.

```java
package com.tutorials.hp.mysqllistviewimages.m_UI;

import android.content.Context;
import android.widget.ImageView;

import com.squareup.picasso.Picasso;
import com.tutorials.hp.mysqllistviewimages.R;

public class PicassoClient {

    public static void downloadImage(Context c,String imageUrl,ImageView img)
    {
        if(imageUrl.length()>0 && imageUrl!=null)
        {
            Picasso.with(c).load(imageUrl).placeholder(R.drawable.placeholder).into(img);
        }else {
            Picasso.with(c).load(R.drawable.placeholder).into(img);
        }
    }

}
```

##### (h). Custom Adapter class

- Subclasses BaseAdapter.
- Inflates our custom layout.
- Binds our data into our adapterview.

```java
package com.tutorials.hp.mysqllistviewimages.m_UI;

import android.content.Context;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.BaseAdapter;
import android.widget.ImageView;
import android.widget.TextView;

import com.tutorials.hp.mysqllistviewimages.R;
import com.tutorials.hp.mysqllistviewimages.m_DataObject.Spacecraft;

import java.util.ArrayList;

public class CustomAdapter extends BaseAdapter {

    Context c;
    ArrayList<Spacecraft> spacecrafts;

    LayoutInflater inflater;

    public CustomAdapter(Context c, ArrayList<Spacecraft> spacecrafts) {
        this.c = c;
        this.spacecrafts = spacecrafts;

        inflater= (LayoutInflater) c.getSystemService(Context.LAYOUT_INFLATER_SERVICE);
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
    public View getView(int position, View convertView, ViewGroup parent) {
        if(convertView==null)
        {
            convertView=inflater.inflate(R.layout.model,parent,false);
        }

        TextView nametxt= (TextView) convertView.findViewById(R.id.nameTxt);
        ImageView img= (ImageView) convertView.findViewById(R.id.movieImage);

        //BIND DATA
        Spacecraft spacecraft=spacecrafts.get(position);

        nametxt.setText(spacecraft.getName());

        //IMG
        PicassoClient.downloadImage(c,spacecraft.getImageUrl(),img);

        return convertView;
    }
}
```

##### (i). MainActivity

- Launcher activity.
- Executes our Downloader Asynctask class to start downloading on floating action button click.

```java
package com.tutorials.hp.mysqllistviewimages;

import android.os.Bundle;
import android.support.design.widget.FloatingActionButton;
import android.support.design.widget.Snackbar;
import android.support.v7.app.AppCompatActivity;
import android.support.v7.widget.Toolbar;
import android.view.View;
import android.widget.ListView;

import com.tutorials.hp.mysqllistviewimages.m_MySQL.Downloader;

public class MainActivity extends AppCompatActivity {

    final static String urlAddress="http://10.0.2.2/android/spacecraft_select_images.php";

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);
        Toolbar toolbar = (Toolbar) findViewById(R.id.toolbar);
        setSupportActionBar(toolbar);

        FloatingActionButton fab = (FloatingActionButton) findViewById(R.id.fab);

        final ListView lv= (ListView) findViewById(R.id.lv);

        fab.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View view) {
                new Downloader(MainActivity.this,urlAddress,lv).execute();
            }
        });
    }

}
```

## 4\. Android PHP MySQL – ListView ServerSide Search/Filter

_Android PHP MySQL ListView Server Side Search and Filter Tutorial_

How to search and filter mysql data in the server database level from an android application. The widget we use is a simple ListView.

Hello guys,yes you can easily filter or search from an arraylist within your android application.But imagine a case where you have thousands of records in the server.Shall you download them all to an arraylist then filter them from there?? Doesn't sound so efficient,isn't it?

Relational Databases are tuned for performance by default and are much faster than filtering from Java code.So then today we discuss Android ListView MySQL - ServerSide Searh/Filter. In short we filter using our SQL statements and return the results back to the android. For more detailed explanations,please watch our video tutorial. Cheers.

NB/= For demo,setup and more explanations please have a look at our video tutorial [here](http://www.youtube.com/watch?v=YWe2s22f9hw).

#### Our MainActivity Class

```java
package com.tutorials.hp.listviewmysqlserversidesearch;

import android.os.Bundle;
import android.support.design.widget.FloatingActionButton;
import android.support.design.widget.Snackbar;
import android.support.v7.app.AppCompatActivity;
import android.support.v7.widget.SearchView;
import android.support.v7.widget.Toolbar;
import android.view.View;
import android.view.Menu;
import android.view.MenuItem;
import android.widget.ImageView;
import android.widget.ListView;

import com.tutorials.hp.listviewmysqlserversidesearch.MySQL.SenderReceiver;

public class MainActivity extends AppCompatActivity {

    String urlAddress="http://10.0.2.2/android/searcher.php";
    SearchView sv;
    ListView lv;
    ImageView noDataImg,noNetworkImg;

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

        lv= (ListView) findViewById(R.id.lv);
        sv= (SearchView) findViewById(R.id.sv);
        noDataImg= (ImageView) findViewById(R.id.nodataImg);
        noNetworkImg= (ImageView) findViewById(R.id.noserver);

        sv.setOnQueryTextListener(new SearchView.OnQueryTextListener() {
            @Override
            public boolean onQueryTextSubmit(String query) {
                SenderReceiver sr=new SenderReceiver(MainActivity.this,urlAddress,query,lv,noDataImg,noNetworkImg);
                sr.execute();
                return false;
            }

            @Override
            public boolean onQueryTextChange(String query) {
                SenderReceiver sr=new SenderReceiver(MainActivity.this,urlAddress,query,lv,noDataImg,noNetworkImg);
                sr.execute();

                return false;
            }
        });

    }

}
```

#### Our Connector Class

- Connects to our network,returning a HttpUrlConnection object.

```java
package com.tutorials.hp.listviewmysqlserversidesearch.MySQL;

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

#### Our SenderReceiver Class

- As the name suggests sends our search term to the server.
- Receives the response,our result from the PHP.

```java
package com.tutorials.hp.listviewmysqlserversidesearch.MySQL;

import android.app.ProgressDialog;
import android.content.Context;
import android.os.AsyncTask;
import android.view.View;
import android.widget.ImageView;
import android.widget.ListView;

import java.io.BufferedReader;
import java.io.BufferedWriter;
import java.io.IOException;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.io.OutputStream;
import java.io.OutputStreamWriter;
import java.net.HttpURLConnection;

public class SenderReceiver extends AsyncTask<Void,Void,String>{

    Context c;
    String urlAddress;
    String query;
    ListView lv;
    ImageView noDataImg,noNetworkImg;

    ProgressDialog pd;

    public SenderReceiver(Context c, String urlAddress, String query, ListView lv,ImageView...imageViews) {
        this.c = c;
        this.urlAddress = urlAddress;
        this.query = query;
        this.lv = lv;

        this.noDataImg=imageViews[0];
        this.noNetworkImg=imageViews[1];
    }

    @Override
    protected void onPreExecute() {
        super.onPreExecute();

        pd=new ProgressDialog(c);
        pd.setTitle("Search");
        pd.setMessage("Searching...Please wait");
        pd.show();
    }

    @Override
    protected String doInBackground(Void... params) {
        return this.sendAndReceive();
    }

    @Override
    protected void onPostExecute(String s) {
        super.onPostExecute(s);

        pd.dismiss();

        //RESET LISTVIEW
        lv.setAdapter(null);

        if(s != null)
        {
            if(!s.contains("null"))
            {
                Parser p=new Parser(c,s,lv);
                p.execute();

                noNetworkImg.setVisibility(View.INVISIBLE);
                noDataImg.setVisibility(View.INVISIBLE);

            }else
            {
                noNetworkImg.setVisibility(View.INVISIBLE);
                noDataImg.setVisibility(View.VISIBLE);
            }
        }else {
            noNetworkImg.setVisibility(View.VISIBLE);
            noDataImg.setVisibility(View.INVISIBLE);
        }

    }

    private String sendAndReceive()
    {
        HttpURLConnection con=Connector.connect(urlAddress);
        if(con==null)
        {
            return null;
        }

        try
        {
            OutputStream os=con.getOutputStream();

            BufferedWriter bw=new BufferedWriter(new OutputStreamWriter(os));
            bw.write(new DataPackager(query).packageData());

            bw.flush();

            //RELEASE RES
            bw.close();
            os.close();

            //SOME RESPONSE ????
            int responseCode=con.getResponseCode();

            //DECODE
            if(responseCode==con.HTTP_OK)
            {
                //RETURN SOME DATA stream
                InputStream is=con.getInputStream();

                //READ IT
                BufferedReader br=new BufferedReader(new InputStreamReader(is));
                String line;
                StringBuffer response=new StringBuffer();

                if(br != null)
                {
                    while ((line=br.readLine()) != null)
                    {
                        response.append(line+"n");
                    }

                }else {
                    return null;
                }

                return response.toString();

            }else {
                return String.valueOf(responseCode);
            }

        } catch (IOException e) {
            e.printStackTrace();
        }

        return null;
    }
}
```

#### Our DataPackager Class

```java
package com.tutorials.hp.listviewmysqlserversidesearch.MySQL;

import org.json.JSONException;
import org.json.JSONObject;

import java.io.UnsupportedEncodingException;
import java.net.URLEncoder;
import java.util.Iterator;

public class DataPackager {

    String query;

    public DataPackager(String query) {
        this.query = query;
    }

    public String packageData()
    {
        JSONObject jo=new JSONObject();
        StringBuffer queryString=new StringBuffer();

        try
        {
            jo.put("Query",query);

            Boolean firstValue=true;
            Iterator it=jo.keys();

            do {
                String key=it.next().toString();
                String value=jo.get(key).toString();

                if(firstValue)
                {
                    firstValue=false;
                }else {
                    queryString.append("&");
                }

                queryString.append(URLEncoder.encode(key,"UTF-8"));
                queryString.append("=");
                queryString.append(URLEncoder.encode(value,"UTF-8"));

            }while (it.hasNext());

            return queryString.toString();

        } catch (JSONException e) {
            e.printStackTrace();
        } catch (UnsupportedEncodingException e) {
            e.printStackTrace();
        }

        return null;

    }
}
```

#### Our Parser Class

- As the name suggests,it is passed a block of String from SenderReceiver class.It is this String that it parses.
- Displays "unable to parse" if its unable to parse the String its been given.

```java
package com.tutorials.hp.listviewmysqlserversidesearch.MySQL;

import android.content.Context;
import android.os.AsyncTask;
import android.widget.ArrayAdapter;
import android.widget.ListView;
import android.widget.Toast;

import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;

import java.util.ArrayList;

public class Parser extends AsyncTask<Void,Void,Integer> {

    Context c;
    String data;
    ListView lv;

    ArrayList<String> names=new ArrayList<>();

    public Parser(Context c, String data, ListView lv) {
        this.c = c;
        this.data = data;
        this.lv = lv;
    }

    @Override
    protected void onPreExecute() {
        super.onPreExecute();
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
            //BIND TO LISTVIEW
            ArrayAdapter adapter=new ArrayAdapter(c,android.R.layout.simple_list_item_1,names);
            lv.setAdapter(adapter);

        }else {
            Toast.makeText(c,"Unable to Parse",Toast.LENGTH_SHORT).show();
        }
    }

    private int parse()
    {
        try
        {
            JSONArray ja=new JSONArray(data);
            JSONObject jo=null;

            names.clear();

            for(int i=0;i<ja.length();i++)
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

#### Our Layouts

##### (a) . Our ActivityMain layout

```xml
<?xml version="1.0" encoding="utf-8"?>
<android.support.design.widget.CoordinatorLayout

    android_layout_width="match_parent"
    android_layout_height="match_parent"
    android_fitsSystemWindows="true"
    tools_context="com.tutorials.hp.listviewmysqlserversidesearch.MainActivity">

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

##### (b). Our ContentMain layout

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
    tools_context="com.tutorials.hp.listviewmysqlserversidesearch.MainActivity"
    tools_showIn="@layout/activity_main">

    <android.support.v7.widget.SearchView
        android_id="@+id/sv"
        android_layout_width="match_parent"
        android_layout_height="50dp"

        app_defaultQueryHint="Search.."></android.support.v7.widget.SearchView>
    <ListView
        android_id="@+id/lv"
        android_layout_width="match_parent"
        android_layout_below="@+id/sv"
        android_layout_height="match_parent"></ListView>
    <ImageView
        android_id="@+id/nodataImg"
        android_visibility="invisible"
        android_src="@drawable/nodata"

        android_layout_centerInParent="true"

        android_layout_centerVertical="true"
        android_layout_width="wrap_content"
        android_layout_height="wrap_content" />
    <ImageView
        android_id="@+id/noserver"
        android_visibility="invisible"
        android_src="@drawable/noserver"

        android_layout_centerInParent="true"

        android_layout_centerVertical="true"
        android_layout_width="wrap_content"
        android_layout_height="wrap_content" />

</RelativeLayout>
```

##### Our Manifest

- You must add permission for internet connection in manifest

```xml
<?xml version="1.0" encoding="utf-8"?>
<manifest
    package="com.tutorials.hp.listviewmysqlserversidesearch">

    <uses-permission android_name="android.permission.INTERNET"/>
    ...

</manifest>
```

#### Our PHP file

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

$name=$_POST['Query'];

$sql="SELECT * FROM soccerTB WHERE Name LIKE '%$name%'";

$query=mysqli_query($con,$sql);

if($query)
{
    while($row=mysqli_fetch_array($query))
  {
    $data[]=$row;
  }

    print(json_encode($data));

}else
{
  echo('Not Found ');
}
mysqli_close($con);

?>
```
