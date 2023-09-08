# Android PHP MySQL RecyclerView Examples

_Android PHP MySQL RecyclerView Examples and Tutorials_

In this piece we will be looking at android mysql with recyclerview as our components. Retrieving data from mysql database to populate a recyclerview.


## 1\. Android PHP MySQL - RecyclerView - Select and Fill

_Android PHP MySQL - RecyclerView - Select and Fill Tutroial_

Android PHP MySQL RecyclerView AsyncTask tutorial. How to select and show in a RecyclerView.

Hi.Here's what we do :

- Connect to Network via HttpURLConnection.
- Download data in a background thread via AsyncTask.
- We are using PHP and MySQL database.PHP retrieves the data from MySQL.Then encodes it to json and we download.
- We then parse this json data natively using jsonarray and jsonobject.
- We fill an arraylist and bind to our [RecyclerView](https://camposha.info/android/recyclerview).

#### 1\. SETUP

##### (a). PHP Code

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

##### (b). Build.Gradle

- Add dependencies for RecyclerView and CardViews

```groovy

dependencies {
    compile fileTree(dir: 'libs', include: ['*.jar'])
    testCompile 'junit:junit:4.12'
    compile 'com.android.support:appcompat-v7:23.2.1'
    compile 'com.android.support:design:23.2.1'
    compile 'com.android.support:cardview-v7:23.2.1'
}
```

##### (c). AndroidManifest.xml

- Add Internet connection permission.

```xml
<?xml version="1.0" encoding="utf-8"?>
<manifest
    package="com.tutorials.hp.recyclerviewmysql">

    <uses-permission android_name="android.permission.INTERNET"/>
    ....
</manifest>
```

#### 2\. Java Code

##### (a). Downloader class

- Connect to network via HttpURLConnection.
- Download data in background thread via AsyncTask.
- Show progress dialog while downloading.
- Send the json data to Parser class for native parsing.

```java
package com.tutorials.hp.recyclerviewmysql.MySQL;

import android.app.ProgressDialog;
import android.content.Context;
import android.os.AsyncTask;
import android.support.v7.widget.RecyclerView;
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
    String urlAddress;
    RecyclerView rv;

    ProgressDialog pd;

    public Downloader(Context c, String urlAddress, RecyclerView rv) {
        this.c = c;
        this.urlAddress = urlAddress;
        this.rv = rv;
    }

    @Override
    protected void onPreExecute() {
        super.onPreExecute();

        pd=new ProgressDialog(c);
        pd.setTitle("Download Data");
        pd.setMessage("Downloading...Pease wait!");
        pd.show();
    }

    @Override
    protected String doInBackground(Void... params) {
        String data=this.downloadData();
        return data;
    }
    @Override
    protected void onPostExecute(String data) {
        super.onPostExecute(data);

        pd.dismiss();

        if(data != null)
        {
            Parser p=new Parser(c,data,rv);
            p.execute();

        }else {
            Toast.makeText(c,"Unable to download",Toast.LENGTH_SHORT).show();
        }

    }

    private String downloadData()
    {
        InputStream is=null;
        String line=null;

        try
        {
            URL url=new URL(urlAddress);
            HttpURLConnection con= (HttpURLConnection) url.openConnection();
            is=new BufferedInputStream(con.getInputStream());

            BufferedReader br=new BufferedReader(new InputStreamReader(is));
            StringBuffer sb=new StringBuffer();

            if(br != null)
            {
                while ((line=br.readLine()) != null)
                {
                    sb.append(line+"n");
                }
            }else
            {
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

##### (b). JSON Parser class

- Receives json data from Downloader class.
- Parses this data in background thread using AsyncTask while showing a progress dialog.
- We parse natively using JSONArray and JSONObject.
- We the fill a simple arraylist and call Adapter class to bind the data.

```java
package com.tutorials.hp.recyclerviewmysql.MySQL;

import android.app.ProgressDialog;
import android.content.Context;
import android.os.AsyncTask;
import android.support.v7.widget.RecyclerView;
import android.widget.Toast;

import com.tutorials.hp.recyclerviewmysql.Recycler.MyAdapter;

import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;

import java.util.ArrayList;

public class Parser extends AsyncTask<Void,Integer,Integer> {

    Context c;
    String data;
    RecyclerView rv;

    ProgressDialog pd;
    ArrayList<String> players=new ArrayList<>();
    MyAdapter adapter;

    public Parser(Context c, String data, RecyclerView rv) {
        this.c = c;
        this.data = data;
        this.rv = rv;
    }

    @Override
    protected void onPreExecute() {
        super.onPreExecute();

        pd=new ProgressDialog(c);
        pd.setTitle("Parse Data");
        pd.setMessage("Parsing...Please Wait!");
        pd.show();
    }

    @Override
    protected Integer doInBackground(Void... params) {
        return this.parse();
    }

    @Override
    protected void onPostExecute(Integer integer) {
        super.onPostExecute(integer);

        pd.dismiss();

        if(integer==1)
        {
            adapter=new MyAdapter(c,players);
            rv.setAdapter(adapter);
        }else {
            Toast.makeText(c,"Unable to parse data",Toast.LENGTH_SHORT).show();
        }
    }

    private int parse()
    {
        try
        {
            JSONArray ja=new JSONArray(data);
            JSONObject jo=null;

            players.clear();

            for(int i=0;i<ja.length();i++)
            {
                jo=ja.getJSONObject(i);
                String name=jo.getString("Name");
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

##### (c). ItemClickListener

- ItemClick event signature.

```java
package com.tutorials.hp.recyclerviewmysql.Recycler;

public interface ItemClickListener {

    void onItemClick(int pos);

}
```

##### (d). ViewHolder Class

- Hold our textviews for recycling.

```java
package com.tutorials.hp.recyclerviewmysql.Recycler;

import android.support.v7.widget.RecyclerView;
import android.view.View;
import android.widget.TextView;

import com.tutorials.hp.recyclerviewmysql.R;

public class MyHolder extends RecyclerView.ViewHolder implements View.OnClickListener {

    TextView nameTxt;
    ItemClickListener itemClickListener;

    public MyHolder(View itemView) {
        super(itemView);

        nameTxt= (TextView) itemView.findViewById(R.id.nameTxt);

        itemView.setOnClickListener(this);
    }

    public  void setItemClickListener(ItemClickListener ic)
    {
        this.itemClickListener=ic;
    }

    @Override
    public void onClick(View v) {
        this.itemClickListener.onItemClick(getLayoutPosition());
    }
}
```

##### (e). Adapter class

- Bind data to recyclerview.
- Inflate custom layout.

```java
package com.tutorials.hp.recyclerviewmysql.Recycler;

import android.content.Context;
import android.support.v7.widget.RecyclerView;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.Toast;

import com.tutorials.hp.recyclerviewmysql.R;

import java.util.ArrayList;

public class MyAdapter extends RecyclerView.Adapter<MyHolder> {

    Context c;
    ArrayList<String> players;

    public MyAdapter(Context c, ArrayList<String> players) {
        this.c = c;
        this.players = players;
    }

    @Override
    public MyHolder onCreateViewHolder(ViewGroup parent, int viewType) {
        View v= LayoutInflater.from(parent.getContext()).inflate(R.layout.model,parent,false);
        MyHolder holder=new MyHolder(v);
        return holder;
    }

    @Override
    public void onBindViewHolder(MyHolder holder, int position) {
        holder.nameTxt.setText(players.get(position));

        holder.setItemClickListener(new ItemClickListener() {
            @Override
            public void onItemClick(int pos) {
                Toast.makeText(c,players.get(pos),Toast.LENGTH_SHORT).show();
            }
        });

    }

    @Override
    public int getItemCount() {
        return players.size();
    }
}
```

##### (f). MainActivity Class

- Start downloading of data when floating action bar is clicked.
- References views.
- Defines download url.

```java
package com.tutorials.hp.recyclerviewmysql;

import android.os.Bundle;
import android.support.design.widget.FloatingActionButton;
import android.support.design.widget.Snackbar;
import android.support.v7.app.AppCompatActivity;
import android.support.v7.widget.DefaultItemAnimator;
import android.support.v7.widget.LinearLayoutManager;
import android.support.v7.widget.RecyclerView;
import android.support.v7.widget.Toolbar;
import android.view.View;
import android.view.Menu;
import android.view.MenuItem;

import com.tutorials.hp.recyclerviewmysql.MySQL.Downloader;

public class MainActivity extends AppCompatActivity {

    String url="http://10.0.2.2/android/players.php";

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);
        Toolbar toolbar = (Toolbar) findViewById(R.id.toolbar);
        setSupportActionBar(toolbar);

        final RecyclerView rv= (RecyclerView) findViewById(R.id.mRecycler);
        rv.setLayoutManager(new LinearLayoutManager(this));
        rv.setItemAnimator(new DefaultItemAnimator());

        FloatingActionButton fab = (FloatingActionButton) findViewById(R.id.fab);
        fab.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View view) {
                Downloader d=new Downloader(MainActivity.this,url,rv);
                d.execute();
            }
        });
    }

}
```

#### 3\. XML Layouts

##### (a). activity_main.xml

```xml
<?xml version="1.0" encoding="utf-8"?>
<android.support.design.widget.CoordinatorLayout

    android_layout_width="match_parent"
    android_layout_height="match_parent"
    android_fitsSystemWindows="true"
    tools_context="com.tutorials.hp.recyclerviewmysql.MainActivity">

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

- Contains our RecyclerView.

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
    tools_context="com.tutorials.hp.recyclerviewmysql.MainActivity"
    tools_showIn="@layout/activity_main">

    <android.support.v7.widget.RecyclerView
        android_layout_width="match_parent"
        android_layout_height="match_parent"
        android_id="@+id/mRecycler"
        />
</RelativeLayout>
```

##### (c). Model.xml

- Shall be inflated to our viewitem.

```xml
<?xml version="1.0" encoding="utf-8"?>
<android.support.v7.widget.CardView
    android_id="@+id/mCard"
    android_orientation="horizontal"
    android_layout_width="match_parent"

    android_layout_margin="10dp"
    card_view_cardCornerRadius="10dp"
    card_view_cardElevation="10dp"

    android_layout_height="wrap_content">

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

## Android PHP MySQL RecyclerView – ServerSide Search/Filter

_Android PHP MySQL - Android MySQL RecyclerView - ServerSide Search/Filter Tutorial_

This is an Android MySQL Search tutorial. We are performing search on the server side against our MySQL database. Our widget is RecylerView.

The world we live in is indeed large.The data we have is in astonishing quantity.Even programming,atleast in most cases involve manipulating or reading some data.

This tutorial is no exception.Our aim is to see how to filter data from our MySQL database.Then we show our results in Realtime. We are performing a server-side search.Generally speaking,this is much faster than filtering at the client.Its faster than say,downloading your data to the device,then filling some sort of arraylist.

Then filtering the arraylist.What if am having 100,10000,1 million records etc.You get the point. You'll hog the users bandwidth.And it takes time.Writing optimized java code to search can be tricky itself.Now we can save ourselves some trouble.Perform the search on the big beefy servers.

Then download results.SQL is normally optimized for search/select performance.And we trust it better than ourselves. Anyway we use `java.net.HttpURLConnection` class,a subclass of `java.net.URLConnection`.

#### Demos

#### HttpURLConnection

- Basically,its a URLConnection for the web.HTTP,remember.
- Its used to send and receive data over the web.Clients to server and vice versa.
- Input and Output like we do in this tutorial.Using POST request method.We make a HTTP POST request.
- HTTP POST is supports both input and output of data.And basically that's what we need here as we are searching.
- While searching,you send a query via outputstream,then receive an inputstream through which you read query results.

Read about HttpURLConnection here.

**Sending Data**

- First the HttpUrlConnetions’s `setDoOutput(true)` to allow connection.
- HTTP POST allows sending data.

**Receiving Response**

- First the HttpUrlConnetions’s `setDoInput(true)` to allow connection.
- HTTP POST allows receiving data.

#### PHP Code

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

#### Java Code

##### Our Connector Class

- Has a static connect method that takes a URL Address string and returns a HttpURLConnection object.
- Simply establishes connection to our server.
- We set connction properties like Request method which is "POST",as we are making a HTTP POST request.

```java
package com.tutorials.hp.recyclermysqlserver_sidesearch.MySQL;

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

#### Our DataPackager Class

- Basically,we package our data here for sending.
- Obviously in this case our data is our query string
- First we add them to a JSON Object.
- Then we encode them into UTF-8 format using URLEncorder class.
- Then we return it as a string ready to be written over the network.

```java
package com.tutorials.hp.recyclermysqlserver_sidesearch.MySQL;

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

    public String packData()
    {
        JSONObject jo=new JSONObject();
        StringBuffer queryString=new StringBuffer();

        try {
            jo.put("Query",query);

            Boolean firstValue=true;

            Iterator it=jo.keys();

            do{
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

#### Section 3 : Our SenderReceiver Class

- Yes,its our SenderReceiver class.To send us our query.To receive a response.
- We send and receive our data in a background thread using AsyncTask,the super class of this `SenderReceiver` class.
- While sending query or receiving results in background,we show our Progressdialog,starting it in `onPreExcecute()` and dismissing immediately `onPostExecute()` is called.
- We establish an outputStream,write to it using `OutputStreamWriter`.
- Thats how we send.
- The `OutputStreamWriter` instance,we pass to`BufferedWriter` instance.
- The `bufferedWriter` instance writes our data.
- We then read the server response using `bufferedreader` instance.

```java
package com.tutorials.hp.recyclermysqlserver_sidesearch.MySQL;

import android.app.ProgressDialog;
import android.content.Context;
import android.os.AsyncTask;
import android.support.v7.widget.RecyclerView;
import android.view.View;
import android.widget.ImageView;

import java.io.BufferedReader;
import java.io.BufferedWriter;
import java.io.IOException;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.io.OutputStream;
import java.io.OutputStreamWriter;
import java.net.HttpURLConnection;

public class SenderReceiver extends AsyncTask<Void,Void,String> {

    Context c;
    String query;
    ProgressDialog pd;
    String urlAddress;
    RecyclerView rv;
    ImageView noDataImg,noNetworkImg;

    public SenderReceiver(Context c, String query, String urlAddress, RecyclerView rv,ImageView...imageViews) {
        this.c = c;
        this.query = query;
        this.urlAddress = urlAddress;
        this.rv = rv;

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
    protected void onPostExecute(String result) {
        super.onPostExecute(result);

        pd.dismiss();

        rv.setAdapter(null);

        if(result != null)
        {
            if(! result.contains("null"))
            {

                Parser p=new Parser(c,result,rv);
                p.execute();

                noNetworkImg.setVisibility(View.INVISIBLE);
                noDataImg.setVisibility(View.INVISIBLE);
            }else {
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
            bw.write(new DataPackager(query).packData());

            bw.flush();

            //RELEASE RES
            bw.close();
            os.close();

            //RESPONSE ???
            int responseCode=con.getResponseCode();
            StringBuffer response=new StringBuffer();

            if(responseCode==con.HTTP_OK)
            {
                InputStream is=con.getInputStream();

                BufferedReader br=new BufferedReader(new InputStreamReader(is));

                String line;

                if(br != null)
                {
                    while ((line=br.readLine()) != null)
                    {
                        response.append(line+"n");
                    }
                }else {
                    return null;
                }

                br.close();
                is.close();

                return response.toString();

            }else
            {
                return String.valueOf(responseCode);
            }

        } catch (IOException e) {
            e.printStackTrace();
        }

        return null;
    }
}
```

#### Section 4 : Our Parser

- Well we shall receive a JSON string
- And it needs to be parsed.So we parse it here.
- This may be time consuming hence blocking,depending on your data size.
- So we do it in background thread.Once more using AsyncTask.
- We don't use any thirdparty library in this tutorial.Not even when parsing.
- `JSONObject` and `JSONArray` are sufficient for us.So we use them.
- Thereafter,we fill an arraylist.And pass it to our MyAdapter class.
- So that it can be bound to RecyclerView.

```java
package com.tutorials.hp.recyclermysqlserver_sidesearch.MySQL;

import android.content.Context;
import android.os.AsyncTask;
import android.support.v7.widget.RecyclerView;
import android.widget.Toast;

import com.tutorials.hp.recyclermysqlserver_sidesearch.Recycler.MyAdapter;

import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;

import java.util.ArrayList;

public class Parser extends AsyncTask<Void,Void,Integer> {

    String data;
    RecyclerView rv;
    Context c;

    ArrayList<String> names=new ArrayList<>();

    public Parser(Context c, String data, RecyclerView rv) {
        this.c = c;
        this.data = data;
        this.rv = rv;
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
            rv.setAdapter(new MyAdapter(c,names));

        }else {
            Toast.makeText(c,"Unable to parse",Toast.LENGTH_SHORT).show();
        }
    }

    private int parse()
    {
        try {
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

#### Our Recycler Package

This is the package where we deal with RecyclerView stuff. It contains:

##### (a). Our MyHolder

- Our ViewHolder class
- Derives from RecyclerView.ViewHolder
- We only need one TextView,so this is the only view we shall be holding.

```java
package com.tutorials.hp.recyclermysqlserver_sidesearch.Recycler;

import android.support.v7.widget.RecyclerView;
import android.view.View;
import android.widget.TextView;

import com.tutorials.hp.recyclermysqlserver_sidesearch.R;

public class MyHolder  extends RecyclerView.ViewHolder {

    TextView nameTxt;

    public MyHolder(View itemView) {
        super(itemView);

        nameTxt= (TextView) itemView.findViewById(R.id.nameTxt);
    }
}
```

##### (b). Our MyAdapter

- Where we bind our views to our dataset.
- We receive a Context object as well as an arraylist.The latter acts as our dataset.
- So we first inflate our model layout using LayoutInflater class.

```java
package com.tutorials.hp.recyclermysqlserver_sidesearch.Recycler;

import android.content.Context;
import android.support.v7.widget.RecyclerView;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;

import com.tutorials.hp.recyclermysqlserver_sidesearch.R;

import java.util.ArrayList;

public class MyAdapter extends RecyclerView.Adapter<MyHolder> {

    Context c;
    ArrayList<String> names;

    public MyAdapter(Context c, ArrayList<String> names) {
        this.c = c;
        this.names = names;
    }

    @Override
    public MyHolder onCreateViewHolder(ViewGroup parent, int viewType) {
        View v= LayoutInflater.from(parent.getContext()).inflate(R.layout.model,parent,false);
        MyHolder holder=new MyHolder(v);
        return holder;
    }

    @Override
    public void onBindViewHolder(MyHolder holder, int position) {
        holder.nameTxt.setText(names.get(position));
    }

    @Override
    public int getItemCount() {
        return names.size();
    }
}
```

##### Our MainActivity

- Launcher activity.
- Initialize UI like SearchView.
- Handle SearchView's onQueryTextChangeListener();
- Starts the sender Asynctask on button click,passing on context, urladdress, query string as well as recyclerview.

```java
package com.tutorials.hp.recyclermysqlserver_sidesearch;

import android.os.Bundle;
import android.support.design.widget.FloatingActionButton;
import android.support.design.widget.Snackbar;
import android.support.v7.app.AppCompatActivity;
import android.support.v7.widget.LinearLayoutManager;
import android.support.v7.widget.RecyclerView;
import android.support.v7.widget.SearchView;
import android.support.v7.widget.Toolbar;
import android.view.View;
import android.widget.ImageView;

import com.tutorials.hp.recyclermysqlserver_sidesearch.MySQL.SenderReceiver;

public class MainActivity extends AppCompatActivity {

    RecyclerView rv;
    SearchView sv;
    ImageView noDataImg,noNetworkImg;

    String urlAddress="http://10.0.2.2/android/searcher.php";

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

        rv= (RecyclerView) findViewById(R.id.rv);
        rv.setLayoutManager(new LinearLayoutManager(this));
        sv= (SearchView) findViewById(R.id.sv);
        noDataImg= (ImageView) findViewById(R.id.nodataImg);
        noNetworkImg= (ImageView) findViewById(R.id.noserver);

        sv.setOnQueryTextListener(new SearchView.OnQueryTextListener() {
            @Override
            public boolean onQueryTextSubmit(String query) {
                SenderReceiver sr=new SenderReceiver(MainActivity.this,query,urlAddress,rv,noDataImg,noNetworkImg);
                sr.execute();

                return false;
            }

            @Override
            public boolean onQueryTextChange(String query) {

                SenderReceiver sr=new SenderReceiver(MainActivity.this,query,urlAddress,rv,noDataImg,noNetworkImg);
                sr.execute();

                return false;
            }
        });

    }

}
```

#### Our Layouts

##### (a). activity_main.xml

```xml
<?xml version="1.0" encoding="utf-8"?>
<android.support.design.widget.CoordinatorLayout

    android_layout_width="match_parent"
    android_layout_height="match_parent"
    android_fitsSystemWindows="true"
    tools_context="com.tutorials.hp.recyclermysqlserver_sidesearch.MainActivity">

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
    tools_context="com.tutorials.hp.recyclermysqlserver_sidesearch.MainActivity"
    tools_showIn="@layout/activity_main">

 <android.support.v7.widget.SearchView
     android_id="@+id/sv"
     android_layout_width="match_parent"
     android_layout_height="50dp"

     app_defaultQueryHint="Search.."></android.support.v7.widget.SearchView>
    <android.support.v7.widget.RecyclerView
        android_id="@+id/rv"
        android_layout_width="match_parent"
        android_layout_below="@+id/sv"
        android_layout_height="match_parent"></android.support.v7.widget.RecyclerView>
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

## **Section 7 : Reminders**

- Remember to add permission for internet in your manifest file.
- Under your tag

```xml
<uses-permission android_name="android.permission.INTERNET"/>
```
