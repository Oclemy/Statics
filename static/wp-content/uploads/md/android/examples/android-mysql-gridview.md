# Android MySQL GridView Examples


_Android PHP MySQL GridView Examples and Tutorials._

In this part we will look at working with MySQL databases together with GridView as our adapterview. It involves fetching data from mysql and rendering in a GridView.


Let's start.

### 1\. Android PHP MySQL Database - GridView - Select and Show

[center]_Android MySQL Database - GridView - Select and Show Tutorial_[/center]

This is a an android mysql tutorial. Our widget is the gridview. We see how to select data and show in a gridview.

\\===

1.  Create your MySQL database,table and columns in Wamp Server with PHPMyAdmin.
2.  Write small PHP scripts to fetch data from our MySQL database and encode it to JSON format..
3. Connect using HttpUrlConnection.
4. Fetch our JSON data and parse it.
5.  Show the items in GridView.

[Download](https://github.com/Oclemy/GridViewMySQL/archive/master.zip)

![Database Table Structure](https://github.com/Oclemy/GridViewMySQL/raw/master/demos/table%20structure.PNG) Database Table Structure[/caption]

First in your AndroidManifest.xml,make sure you add internet permission. `<uses-permission android_name="android.permission.INTERNET"/>`

##### Connector.java

Here's our Connector class.It shall help us in connecting to our network.We use HttpURLConnection.

```java
package com.tutorials.hp.gridviewmysql.mMySQL;

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

##### Downloader.java

Then our downloader,class which shall derive from abstract AsyncTask class is below.It shall download data while showing a progress dialog.

```java
package com.tutorials.hp.gridviewmysql.mMySQL;

import android.app.ProgressDialog;
import android.content.Context;
import android.os.AsyncTask;
import android.widget.GridView;
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
    GridView gv;

    ProgressDialog pd;

    public Downloader(Context c, String urlAddress, GridView gv) {
        this.c = c;
        this.urlAddress = urlAddress;
        this.gv = gv;
    }

    @Override
    protected void onPreExecute() {
        super.onPreExecute();
        pd=new ProgressDialog(c);
        pd.setTitle("Fetch");
        pd.setMessage("Fetching data....Please wait");
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
            Toast.makeText(c,"Unsuccessful,Null returned",Toast.LENGTH_SHORT).show();
        }else {
            //CALL DATA PARSER TO PARSE
            DataParser parser=new DataParser(c,gv,s);
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

            }else{
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

##### DataParser.java

Finally the data parser class to parse JSON data also in the background thread.We also parse data in the background  using AsyncTask.

```java
package com.tutorials.hp.gridviewmysql.mMySQL;

import android.app.ProgressDialog;
import android.content.Context;
import android.os.AsyncTask;
import android.view.View;
import android.widget.AdapterView;
import android.widget.ArrayAdapter;
import android.widget.GridView;
import android.widget.Toast;

import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;

import java.util.ArrayList;

public class DataParser extends AsyncTask<Void,Void,Integer> {

    Context c;
    GridView gv;
    String jsonData;

    ProgressDialog pd;
    ArrayList<String> spacecrafts=new ArrayList<>();

    public DataParser(Context c, GridView gv, String jsonData) {
        this.c = c;
        this.gv = gv;
        this.jsonData = jsonData;
    }

    @Override
    protected void onPreExecute() {
        super.onPreExecute();

        pd=new ProgressDialog(c);
        pd.setTitle("Parse");
        pd.setMessage("Parsing..Please Wait");
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
        }else
        {
            ArrayAdapter adapter=new ArrayAdapter(c,android.R.layout.simple_list_item_1,spacecrafts);
            gv.setAdapter(adapter);

            gv.setOnItemClickListener(new AdapterView.OnItemClickListener() {
                @Override
                public void onItemClick(AdapterView<?> parent, View view, int position, long id) {
                    Toast.makeText(c,spacecrafts.get(position),Toast.LENGTH_SHORT).show();

                }
            });
        }
    }

    private int parseData()
    {
        try {

            JSONArray ja=new JSONArray(jsonData);
            JSONObject jo=null;

            spacecrafts.clear();

            for(int i=0;i<ja.length();i++)
            {
                jo=ja.getJSONObject(i);

                String name=jo.getString("name");

                spacecrafts.add(name);
            }

            return 1;

        } catch (JSONException e) {
            e.printStackTrace();
        }

        return 0;
    }

}
```

##### MainActivity.java

Finally our MainActivity is here :

```java
package com.tutorials.hp.gridviewmysql;

import android.os.Bundle;
import android.support.design.widget.FloatingActionButton;
import android.support.design.widget.Snackbar;
import android.support.v7.app.AppCompatActivity;
import android.support.v7.widget.Toolbar;
import android.view.View;
import android.view.Menu;
import android.view.MenuItem;
import android.widget.GridView;

import com.tutorials.hp.gridviewmysql.mMySQL.Downloader;

public class MainActivity extends AppCompatActivity {

   final static String urlAddress="http://10.0.2.2/android/spacecraft_select.php";

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);
        Toolbar toolbar = (Toolbar) findViewById(R.id.toolbar);
        setSupportActionBar(toolbar);

        final GridView gv= (GridView) findViewById(R.id.gv);

        FloatingActionButton fab = (FloatingActionButton) findViewById(R.id.fab);
        fab.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View view) {

                new Downloader(MainActivity.this,urlAddress,gv).execute();
            }
        });
    }

}
```

![MySQL GridView](https://github.com/Oclemy/GridViewMySQL/raw/master/demos/MySQL%20GridView.PNG)

If you prefer video tutorial and for more explanations please check below :   [http://www.youtube.com/watch?v=UPd20D_HVBY](http://www.youtube.com/watch?v=UPd20D_HVBY)

## Example 2: Android PHP MySQL – GridView – Images and Text

Android MySQL images and Text tutorial with GridView. This is our continuation of Android MySQL series.

In this class we are going to store image URLs in MySQL database. Then when we load our data the URLs get retrieved as well, then get loaded by Picasso hence loading our images.

Storing image urls is more efficient than storing image blobs hence that's why we store them instead of actual images.

Moreover, we can easily add update or delete those image urls efficiently. Furthermore, Picasso ImageLoader will cache our images on the device hence we won't have to everytime be downloading the images hence saving the user the bandwith.

Let's go.

##### Project Structure

##### Tools Used

These are the tools we used to create the project:

1. Language : Java.
2. Platform : Android.
3. IDE : Android Studio.
4. OS : Windows 8.1

Let's go.

##### PHP Code

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

##### 1\. Create Basic Activity Project

1. First create a new project in android studio. Go to File --> New Project.

##### 2\. Build.Gradle

Our app level(app folder) build.gradle.

AndroidStudio allows us to add our application dependencies right here using `compile` statements.

So we add our dependencies here. You may use later versions of the dependencies.

```groovy
dependencies {
    compile fileTree(dir: 'libs', include: ['*.jar'])
    testCompile 'junit:junit:4.12'
    compile 'com.android.support:appcompat-v7:23.3.0'
    compile 'com.android.support:design:23.3.0'
    compile 'com.android.support:cardview-v7:23.3.0'
    compile 'com.squareup.picasso:picasso:2.5.2'
}
```

##### 3\. Create User Interface

User interfaces are typically created in android using XML layouts as opposed to direct java coding.

##### (a). activity_main.xml

- This layout gets inflated to MainActivity user interface.
- It includes the content_main.xml.

```xml
<?xml version="1.0" encoding="utf-8"?>
<android.support.design.widget.CoordinatorLayout

    android_layout_width="match_parent"
    android_layout_height="match_parent"
    android_fitsSystemWindows="true"
    tools_context="com.tutorials.hp.mysqlgridviewimages.MainActivity">

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

This layout gets included in your activity_main.xml. We define our GridView here.

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
    tools_context="com.tutorials.hp.mysqlgridviewimages.MainActivity"
    tools_showIn="@layout/activity_main">

    <GridView
        android_id="@+id/gv"
        android_layout_width="wrap_content"
        android_layout_height="wrap_content"
        android_numColumns="3"/>
</RelativeLayout>
```

##### (b). model.xml

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
            android_src="@drawable/placeholder" />

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

* * *

#### Java Code

##### 4\. Spacecraft.java

```java
package com.tutorials.hp.mysqlgridviewimages.m_DataObject;

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

##### 5\. PicassoClient.java

```java
package com.tutorials.hp.mysqlgridviewimages.m_GridView;

import android.content.Context;
import android.widget.ImageView;

import com.squareup.picasso.Picasso;
import com.tutorials.hp.mysqlgridviewimages.R;

public class PicassoClient {

    public static void downloadImage(Context c,String imageUrl,ImageView img)
    {
        if(imageUrl!=null && imageUrl.length()>0)
        {
            Picasso.with(c).load(imageUrl).placeholder(R.drawable.placeholder).into(img);
        }else {
            Picasso.with(c).load(R.drawable.placeholder).into(img);
        }
    }

}
```

##### 6\. CustomAdapter.java

```java
package com.tutorials.hp.mysqlgridviewimages.m_GridView;

import android.content.Context;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.BaseAdapter;
import android.widget.ImageView;
import android.widget.TextView;

import com.tutorials.hp.mysqlgridviewimages.R;
import com.tutorials.hp.mysqlgridviewimages.m_DataObject.Spacecraft;

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
    public View getView(int position, View convertView, ViewGroup parent) {

        if(convertView==null)
        {
            convertView=inflater.inflate(R.layout.model,parent,false);
        }

        TextView nameTxt= (TextView) convertView.findViewById(R.id.nameTxt);
        ImageView img= (ImageView) convertView.findViewById(R.id.movieImage);

        //BIND DATA

        Spacecraft spacecraft=spacecrafts.get(position);

        nameTxt.setText(spacecraft.getName());

        //IMG
        PicassoClient.downloadImage(c,spacecraft.getImageUrl(),img);

        return convertView;
    }
}
```

##### 7\. Connector.java

```java
package com.tutorials.hp.mysqlgridviewimages.m_MySQL;

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

            //CON PROPS
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

##### 8\. DataParser.java

```java
package com.tutorials.hp.mysqlgridviewimages.m_MySQL;

import android.app.ProgressDialog;
import android.content.Context;
import android.os.AsyncTask;
import android.widget.GridView;
import android.widget.Toast;

import com.tutorials.hp.mysqlgridviewimages.m_DataObject.Spacecraft;
import com.tutorials.hp.mysqlgridviewimages.m_GridView.CustomAdapter;

import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;

import java.util.ArrayList;

public class DataParser extends AsyncTask<Void,Void,Integer> {

    Context c;
    String jsonData;
    GridView gv;

    ProgressDialog pd;
    ArrayList<Spacecraft> spacecrafts=new ArrayList<>();

    public DataParser(Context c, String jsonData, GridView gv) {
        this.c = c;
        this.jsonData = jsonData;
        this.gv = gv;
    }

    @Override
    protected void onPreExecute() {
        super.onPreExecute();

        pd=new ProgressDialog(c);
        pd.setTitle("Parse");
        pd.setMessage("Parsing...Please Wait");
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
            Toast.makeText(c,"Unable To Parse",Toast.LENGTH_SHORT).show();
        }else {
            //BIND DATA TO GRIDVIEW
            CustomAdapter adapter=new CustomAdapter(c,spacecrafts);
            gv.setAdapter(adapter);
        }
    }

    private int parseData()
    {
        try
        {
            JSONArray ja=new JSONArray(jsonData);
            JSONObject jo=null;

            spacecrafts.clear();
            Spacecraft spacecraft;

            for(int i=0;i<ja.length();i++)
            {
                jo=ja.getJSONObject(i);

                int id=jo.getInt("id");
                String name=jo.getString("name");
                String imageUrl=jo.getString("imageurl");

                spacecraft=new Spacecraft();

                spacecraft.setId(id);
                spacecraft.setName(name);
                spacecraft.setImageUrl(imageUrl);

                spacecrafts.add(spacecraft);
            }

            return 1;

        } catch (JSONException e) {
            e.printStackTrace();
        }

        return 0;
    }
}
```

##### 9\. Downloader.java

```java
package com.tutorials.hp.mysqlgridviewimages.m_MySQL;

import android.app.ProgressDialog;
import android.content.Context;
import android.os.AsyncTask;
import android.widget.GridView;
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
    GridView gv;

    ProgressDialog pd;

    public Downloader(Context c, String urlAddress, GridView gv) {
        this.c = c;
        this.urlAddress = urlAddress;
        this.gv = gv;
    }

    @Override
    protected void onPreExecute() {
        super.onPreExecute();

        pd=new ProgressDialog(c);
        pd.setTitle("Retrieve");
        pd.setMessage("Retrieving...Please Wait");
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

        if(jsonData==null)
        {
            Toast.makeText(c,"Unsuccessful,No Data Retrieved",Toast.LENGTH_SHORT).show();
        }else {
            //Parse
            DataParser parser=new DataParser(c,jsonData,gv);
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

        try
        {
            InputStream is=new BufferedInputStream(con.getInputStream());
            BufferedReader br=new BufferedReader(new InputStreamReader(is));

            String line;
            StringBuffer jsonData=new StringBuffer();

            while ((line=br.readLine())!=null)
            {
                jsonData.append(line+"n");
            }

            br.close();
            is.close();

            return jsonData.toString();

        } catch (IOException e) {
            e.printStackTrace();
        }

        return null;
    }
}
```

##### 10\. MainActivity.java

```java
package com.tutorials.hp.mysqlgridviewimages;

import android.os.Bundle;
import android.support.design.widget.FloatingActionButton;
import android.support.design.widget.Snackbar;
import android.support.v7.app.AppCompatActivity;
import android.support.v7.widget.Toolbar;
import android.view.View;
import android.widget.GridView;

import com.tutorials.hp.mysqlgridviewimages.m_MySQL.Downloader;

public class MainActivity extends AppCompatActivity {

    final static String urlAddress="http://10.0.2.2/android/spacecraft_select_images.php";

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);
        Toolbar toolbar = (Toolbar) findViewById(R.id.toolbar);
        setSupportActionBar(toolbar);
        FloatingActionButton fab = (FloatingActionButton) findViewById(R.id.fab);

        final GridView gv= (GridView) findViewById(R.id.gv);

        fab.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View view) {
                new Downloader(MainActivity.this,urlAddress,gv).execute();
            }
        });
    }

}
```

##### 11\. AndroidManifest.xml

```xml
<?xml version="1.0" encoding="utf-8"?>
<manifest
    package="com.tutorials.hp.mysqlgridviewimages">

    <uses-permission android_name="android.permission.INTERNET"/>
    ...

</manifest>
```
