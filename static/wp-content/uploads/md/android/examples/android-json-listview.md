# Android JSON ListView Examples


_Android JSON, ListView and HttpURLConnection Tutorial and Examples_

In this article we want to look at several examples of how to use three technologies:

- JSON
- HttpURLConnection
- AsyncTask
- ListView
  

##### What is JSON

_JSON in full is JavaScript Object Notation. It is a language-independent data format that expresses JSON objects as human-readable lists of properties(name-value pairs)._

JSON is very easy to read, lightweight and fast.

Learn more about JSON here

##### What we do with Our JSON.

In this example we will download and parse json data. To download we will use HttpURLConnection as well as AsyncTask. Then to parse we will use the JSONObject and JSONArray classes.

##### What is HttpUrlConnection?

_HttpUrlconnection is a UrlConnection for HTTP used to send as well receive data over the web._ These data may be of any type and length.

This is the class that enables us make HTTP calls over the web from our android app. In this case our HTTP calls will result in us downloading a blob of JSON string from online. Then we parse that JSON data.

Learn more about HttpURLConnection here.

##### AsyncTask?

_**AsyncTask** is a helper class for performing easy threading and created around Thread._

AsyncTask will allow us to create smoothly working applications even though we are doing a time-consuming task like downloading data from online. This is because we will offload that task to the background thread via AsyncTask.

Learn more about AsyncTask here.

##### What is ListView?

_A gridview is an adapterview that shows items in a scrollabe list._

Once we've parsed our data we will bind them to a ListView

Learn more [about ListView here](https://camposha.info/android/listview).

##### Examples We Look At.

Well we look at three examples:

1. Android JSON - Simple ListView - Download,Parse and Show
2. Android JSON - ListView Multiple Fields - Download,Parse then Show
3. Android JSON - ListView Master Detail - Download,Parse,Show

* * *

### 1\. Android JSON - Simple ListView - Download,Parse and Show

[center]_Android Native JSON - Simple ListView - Download,Parse and Show tutorial_. [/center]

Here's the project demo:

### Java Classes

##### (a). Our Connector Class

- Establish connection for us.
- Set connection properties.

```java
package com.tutorials.hp.jsonlistview.m_JSON;

import java.io.IOException;
import java.net.HttpURLConnection;
import java.net.MalformedURLException;
import java.net.URL;

public class Connector {

    public static Object connect(String jsonURL)
    {
        try
        {
            URL url=new URL(jsonURL);
            HttpURLConnection con= (HttpURLConnection) url.openConnection();

            //CON PROPS
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

##### (b). Our JSON Downloader Class

- Where we download our json data from network.
- We do this in background thread using AsyncTask.
- Meanwhile we show a progress dialog.
- After this, we pass our json data to JSONParser class to be parsed.

```java
package com.tutorials.hp.jsonlistview.m_JSON;

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

public class JSONDownloader extends AsyncTask<Void,Void,String> {

    Context c;
    String jsonURL;
    ListView lv;

    ProgressDialog pd;

    public JSONDownloader(Context c, String jsonURL, ListView lv) {
        this.c = c;
        this.jsonURL = jsonURL;
        this.lv = lv;
    }

    @Override
    protected void onPreExecute() {
        super.onPreExecute();
        pd=new ProgressDialog(c);
        pd.setTitle("Download JSON");
        pd.setMessage("Downloading...Please wait");
        pd.show();
    }

    @Override
    protected String doInBackground(Void... voids) {
        return this.download();
    }

    @Override
    protected void onPostExecute(String jsonData) {
        super.onPostExecute(jsonData);

        pd.dismiss();
        if(jsonData.startsWith("Error"))
        {
            Toast.makeText(c, jsonData, Toast.LENGTH_SHORT).show();
        }else {
            //PARSE
            new JSONParser(c,jsonData, lv).execute();

        }

    }
    private String download()
    {
        Object connection=Connector.connect(jsonURL);
        if(connection.toString().startsWith("Error"))
        {
            return connection.toString();
        }

        try
        {
            //ESTABLISH CONNECTION
            HttpURLConnection con= (HttpURLConnection) connection;
            if(con.getResponseCode()==con.HTTP_OK)
            {
                //GET INPUT FROM STREAM
                InputStream is=new BufferedInputStream(con.getInputStream());
                BufferedReader br=new BufferedReader(new InputStreamReader(is));

                String line;
                StringBuffer jsonData=new StringBuffer();

                //READ
                while ((line=br.readLine()) != null)
                {
                    jsonData.append(line+"n");
                }

                //CLOSE RESOURCES
                br.close();
                is.close();

                //RETURN JSON
                return jsonData.toString();

            }else
            {
                return "Error "+con.getResponseMessage();
            }
        } catch (IOException e) {
            e.printStackTrace();
            return "Error "+e.getMessage();
        }
    }
}
```

##### (c). Our JSON Parser Class

- Receives the JSON string we downloaded.
- So we parse this particular json,filling an arraylist.
- Then we bind our arraylist of data our view component via an adapter.

```java
package com.tutorials.hp.jsonlistview.m_JSON;

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

public class JSONParser extends AsyncTask<Void,Void,Boolean>{

    Context c;
    String jsonData;
    ListView lv;

    ProgressDialog pd;
    ArrayList<String> users=new ArrayList<>();

    public JSONParser(Context c, String jsonData, ListView lv) {
        this.c = c;
        this.jsonData = jsonData;
        this.lv = lv;
    }

    @Override
    protected void onPreExecute() {
        super.onPreExecute();
        pd=new ProgressDialog(c);
        pd.setTitle("Parse JSON");
        pd.setMessage("Parsing...Please wait");
        pd.show();
    }

    @Override
    protected Boolean doInBackground(Void... voids) {
        return this.parse();
    }

    @Override
    protected void onPostExecute(Boolean isParsed) {
        super.onPostExecute(isParsed);

        pd.dismiss();
        if(isParsed)
        {
            //BIND
            ArrayAdapter<String> adapter=new ArrayAdapter<String>(c,android.R.layout.simple_list_item_1,users);
            lv.setAdapter(adapter);

            lv.setOnItemClickListener(new AdapterView.OnItemClickListener() {
                @Override
                public void onItemClick(AdapterView<?> adapterView, View view, int i, long l) {
                    Toast.makeText(c, users.get(i), Toast.LENGTH_SHORT).show();
                }
            });

        }else
        {
            Toast.makeText(c, "Unable To Parse,Check Your Log output", Toast.LENGTH_SHORT).show();
        }

    }

    private Boolean parse()
    {
        try
        {
            JSONArray ja=new JSONArray(jsonData);
            JSONObject jo;

            users.clear();
            for (int i=0;i<ja.length();i++)
            {
                jo=ja.getJSONObject(i);

                String name=jo.getString("name");
                users.add(name);
            }

            return true;

        } catch (JSONException e) {
            e.printStackTrace();
            return false;
        }
    }
}
```

##### (d). Our MainActivity Class

- Our launcher activity.
- We start our downloader, passing in URL as well as other parameters.

```java
package com.tutorials.hp.jsonlistview;

import android.os.Bundle;
import android.support.design.widget.FloatingActionButton;
import android.support.v7.app.AppCompatActivity;
import android.support.v7.widget.Toolbar;
import android.view.View;
import android.widget.ListView;

import com.tutorials.hp.jsonlistview.m_JSON.JSONDownloader;

public class MainActivity extends AppCompatActivity {

    String jsonURL="http://jsonplaceholder.typicode.com/users";
    ListView lv;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);
        Toolbar toolbar = (Toolbar) findViewById(R.id.toolbar);
        setSupportActionBar(toolbar);

        lv= (ListView) findViewById(R.id.lv);

        FloatingActionButton fab = (FloatingActionButton) findViewById(R.id.fab);
        fab.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View view) {
                new JSONDownloader(MainActivity.this,jsonURL,lv).execute();
            }
        });
    }
}
```

#### Our Layout

##### (a). activity_main.xml

```xml
<?xml version="1.0" encoding="utf-8"?>
<android.support.design.widget.CoordinatorLayout

    android_layout_width="match_parent"
    android_layout_height="match_parent"
    android_fitsSystemWindows="true"
    tools_context="com.tutorials.hp.jsonlistview.MainActivity">

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

- Displays our view

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
    tools_context="com.tutorials.hp.jsonlistview.MainActivity"
    tools_showIn="@layout/activity_main">

    <ListView
        android_id="@+id/lv"
        android_layout_width="match_parent"
        android_layout_height="wrap_content"
         />
</RelativeLayout>
```

#### Section 6 : Our Manifest

- Make sure you add permission for accessing internet.

```xml
<?xml version="1.0" encoding="utf-8"?>
<manifest
    package="com.tutorials.hp.jsonlistview">

    <uses-permission android_name="android.permission.INTERNET"/>
    ...

</manifest>
```

#### Download

You can download the full project here.

| No. | Resource | Direct Links |
| --- | --- | --- |
| 1. | GitHub Source Code | [Browse](https://github.com/Oclemy/JSON-ListView) |
| 2. | Source Code | [Download](https://github.com/Oclemy/JSON-ListView/archive/master.zip) |
| 3. | YouTube | [Channel](https://www.youtube.com/c/ProgrammingWizards) |
| 4. | YouTube | [Video Tutorial](http://www.youtube.com/watch?v=9yLBM0u-pkw) |

* * *

### 2\. Android Native JSON - ListView Multiple Fields - Download,Parse then Show

[center]_Android Native JSON - ListView Multiple Fields - Download,Parse then Show Tutorial._[/center]

#### Java Code

##### (a). Our Connector Class

- Establish connection for us.
- Set connection properties.

```java
package com.tutorials.hp.jsonlistviewmulti_items.m_JSON;

import java.io.IOException;
import java.net.HttpURLConnection;
import java.net.MalformedURLException;
import java.net.URL;

/*
 * -------------------ROLES-----------------------
 * 1.SET CONNECTION PROPRTIES
 * 2.ESTABLISH AND RETURN CONNECTION OBJ
 */
public class Connector {

    public static Object connect(String jsonURL)
    {
        try
        {
            URL url=new URL(jsonURL);
            HttpURLConnection con= (HttpURLConnection) url.openConnection();

            //CON PROPS
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

##### (b). Our JSON Downloader Class

- Where we download our json data from network.
- We do this in background thread using AsyncTask.
- Meanwhile we show a progress dialog.
- After this, we pass our json data to JSONParser class to be parsed.

```java
package com.tutorials.hp.jsonlistviewmulti_items.m_JSON;

import android.app.ProgressDialog;
import android.content.Context;
import android.os.AsyncTask;
import android.widget.ListView;

import java.io.BufferedInputStream;
import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.net.HttpURLConnection;

/*
 * -----------------------ROLES-------------------------
 * 1.CONNECT TO NETWORK
 * 2.DOWNLOAD DATA IN BACKGROUND THREAD
 * 3.SEND THE DATA TO PARSER TO BE PARSED
 */
public class JSONDownloader extends AsyncTask<Void,Void,String> {

    Context c;
    String jsonURL;
    ListView lv;

    ProgressDialog pd;

    public JSONDownloader(Context c, String jsonURL, ListView lv) {
        this.c = c;
        this.jsonURL = jsonURL;
        this.lv = lv;
    }

    @Override
    protected void onPreExecute() {
        super.onPreExecute();

        pd=new ProgressDialog(c);
        pd.setTitle("Download JSON");
        pd.setMessage("Downloading...Please wait");
        pd.show();

    }

    @Override
    protected String doInBackground(Void... voids) {
        return downlaod();
    }

    @Override
    protected void onPostExecute(String jsonData) {
        super.onPostExecute(jsonData);

        pd.dismiss();
        if(jsonData.startsWith("Error"))
        {
            String error=jsonData;
        }else
        {
            //PARSE
            new JSONParser(c,jsonData,lv).execute();
        }

    }

    private String downlaod()
    {
        Object connection=Connector.connect(jsonURL);
        if(connection.toString().startsWith("Error"))
        {
            return connection.toString();
        }

        //DOWNLOAD
        try
        {
            HttpURLConnection con= (HttpURLConnection) connection;
            if(con.getResponseCode()==con.HTTP_OK)
            {
                //GET INPUT FROM STREAM
                InputStream is=new BufferedInputStream(con.getInputStream());
                BufferedReader br=new BufferedReader(new InputStreamReader(is));

                String line;
                StringBuffer jsonData=new StringBuffer();

                //READ
                while ((line=br.readLine()) != null)
                {
                    jsonData.append(line+"n");
                }

                //CLOSE RESOURCES
                br.close();
                is.close();

                //RETURN JSON
                return jsonData.toString();

            }else
            {
                return "Error "+con.getResponseMessage();
            }
        } catch (IOException e) {
            e.printStackTrace();
            return "Error "+e.getMessage();
        }
    }

}
```

##### (c). Our JSON Parser Class

- Receives the JSON string we downloaded.
- So we parse this particular json,filling an arraylist.
- Then we bind our arraylist of data our view component via an adapter.

```java
package com.tutorials.hp.jsonlistviewmulti_items.m_JSON;

import android.app.ProgressDialog;
import android.content.Context;
import android.os.AsyncTask;
import android.widget.ListView;
import android.widget.Toast;

import com.tutorials.hp.jsonlistviewmulti_items.m_Model.User;
import com.tutorials.hp.jsonlistviewmulti_items.m_UI.CustomAdapter;

import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;

import java.util.ArrayList;

/*
 * ----------------- ROLES -----------------------
 * 1.RECEIVE DOWNLOADED DATA
 * 2.PARSE IT
 * 3.CALL ADAPTER CLASS TO BIND IT TO CUSTOM GRIDVIEW
 */
public class JSONParser extends AsyncTask<Void,Void,Boolean>{

    Context c;
    String jsonData;
    ListView lv;

    ProgressDialog pd;
    ArrayList<User> users=new ArrayList<>();

    public JSONParser(Context c, String jsonData, ListView lv) {
        this.c = c;
        this.jsonData = jsonData;
        this.lv = lv;
    }

    @Override
    protected void onPreExecute() {
        super.onPreExecute();

        pd=new ProgressDialog(c);
        pd.setTitle("Parse JSON");
        pd.setMessage("Parsing...Please wait");
        pd.show();
    }

    @Override
    protected Boolean doInBackground(Void... voids) {
        return parse();
    }

    @Override
    protected void onPostExecute(Boolean isParsed) {
        super.onPostExecute(isParsed);

        pd.dismiss();
        if(isParsed)
        {
            //BIND
            lv.setAdapter(new CustomAdapter(c,users));
        }else
        {
            Toast.makeText(c, "Unable To Parse,Check Your Log output", Toast.LENGTH_SHORT).show();
        }

   }

    private Boolean parse()
    {
        try
        {
            JSONArray ja=new JSONArray(jsonData);
            JSONObject jo;

            users.clear();
            User user;

            for (int i=0;i<ja.length();i++)
            {
                jo=ja.getJSONObject(i);

                String name=jo.getString("name");
                String username=jo.getString("username");
                String email=jo.getString("email");

                user=new User();

                user.setName(name);
                user.setUsername(username);
                user.setEmail(email);

                users.add(user);
            }

            return true;

        } catch (JSONException e) {
            e.printStackTrace();
            return false;
        }
    }

}
```

##### (d). Our CustomAdapter Class

- Inflate our Custom Model into a View Item for our ListView.
- Bind data to our AdapterView.

```java
package com.tutorials.hp.jsonlistviewmulti_items.m_UI;

import android.content.Context;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.BaseAdapter;
import android.widget.TextView;

import com.tutorials.hp.jsonlistviewmulti_items.R;
import com.tutorials.hp.jsonlistviewmulti_items.m_Model.User;

import java.util.ArrayList;

/*
 * ---------------------------ROLES-------------------------------
 * | 1.INFLATE MODEL LAYOUT
 * | 2.BIND DATA TO GRIDVIEW
 * ----------------------------------------------------------------
 */
public class CustomAdapter extends BaseAdapter{

    Context c;
    ArrayList<User> users;

    public CustomAdapter(Context c, ArrayList<User> users) {
        this.c = c;
        this.users = users;
    }

    @Override
    public int getCount() {
        return users.size();
    }

    @Override
    public Object getItem(int i) {
        return users.get(i);
    }

    @Override
    public long getItemId(int i) {
        return i;
    }

    @Override
    public View getView(int i, View view, ViewGroup viewGroup) {
        if(view==null)
        {
            view=LayoutInflater.from(c).inflate(R.layout.model,viewGroup,false);
        }

        TextView nameTxt= (TextView) view.findViewById(R.id.nameTxt);
        TextView usernameTxt= (TextView) view.findViewById(R.id.usernameTxt);
        TextView emailTxt= (TextView) view.findViewById(R.id.emailTxt);

        User user= (User) this.getItem(i);

        nameTxt.setText(user.getName());
        emailTxt.setText(user.getEmail());
        usernameTxt.setText(user.getUsername());

        return view;
    }
}
```

##### (e). Our MainActivity Class

- Our launcher activity.
- We start our downloader, passing in URL as well as other parameters.

```java
package com.tutorials.hp.jsonlistviewmulti_items;

import android.os.Bundle;
import android.support.design.widget.FloatingActionButton;
import android.support.v7.app.AppCompatActivity;
import android.support.v7.widget.Toolbar;
import android.view.View;
import android.widget.ListView;

import com.tutorials.hp.jsonlistviewmulti_items.m_JSON.JSONDownloader;

public class MainActivity extends AppCompatActivity {

    String jsonURL="http://jsonplaceholder.typicode.com/users";
    ListView lv;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);
        Toolbar toolbar = (Toolbar) findViewById(R.id.toolbar);
        setSupportActionBar(toolbar);

        lv = (ListView) findViewById(R.id.lv);

        FloatingActionButton fab = (FloatingActionButton) findViewById(R.id.fab);
        fab.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View view) {
                new JSONDownloader(MainActivity.this,jsonURL, lv).execute();
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
    tools_context="com.tutorials.hp.jsonlistviewmulti_items.MainActivity">

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

- Displays our adapter view

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
    tools_context="com.tutorials.hp.jsonlistviewmulti_items.MainActivity"
    tools_showIn="@layout/activity_main">

    <ListView
        android_id="@+id/lv"
        android_layout_width="match_parent"
        android_layout_height="wrap_content"
         />
</RelativeLayout>
```

##### (c). model.xml

- Inflated into a single viewitem for our ListView.

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
                android_text="Email....................."
                android_lines="3"
                android_id="@+id/emailTxt"
                android_padding="10dp"
                android_layout_alignParentLeft="true"
                />

            <TextView
                android_layout_width="wrap_content"
                android_layout_height="wrap_content"
                android_textAppearance="?android:attr/textAppearanceMedium"
                android_text="Username"
                android_textStyle="italic"
                android_id="@+id/usernameTxt" />

    </LinearLayout>

</android.support.v7.widget.CardView>
```

#### Our Manifest

- Make sure you add permission for accessing internet.

```xml
<?xml version="1.0" encoding="utf-8"?>
<manifest
    package="com.tutorials.hp.jsonlistviewmulti_items">

    <uses-permission android_name="android.permission.INTERNET"/>
    ...

</manifest>
```

#### Download

You can download the full project here.

| No. | Resource | Direct Links |
| --- | --- | --- |
| 1. | GitHub Source Code | [Browse](https://github.com/Oclemy/JSON-ListView-Multi-Items) |
| 2. | Source Code | [Download](https://github.com/Oclemy/JSON-ListView-Multi-Items/archive/master.zip) |
| 3. | YouTube | [Channel](https://www.youtube.com/c/ProgrammingWizards) |

* * *

### 3\. Android Native JSON - ListView Master Detail - Download,Parse,Show

Here in this tutorial,we talk JSON and ListView.We download JSON data from online here : [http://jsonplaceholder.typicode.com/](http://jsonplaceholder.typicode.com/).

This json data we parse natively using org.json classes : JSONArray and JSONObject,no third party library.We then bind this data to our Custom ListView.This,our MainActivity, acts as our Master View. When a ListView item is clicked, we open detail activity passing data.

Here's the demo:

#### AndroidManifest.xml

Make sure to add permission for internet connectivity.

```xml
<?xml version="1.0" encoding="utf-8"?>
<manifest
    package="com.tutorials.hp.jsonlistviewmdetail">

    <uses-permission android_name="android.permission.INTERNET" />
    ...

</manifest>
```

#### Java Code

##### (a). Our Model Class

```java
package com.tutorials.hp.jsonlistviewmdetail.m_Model;

public class User {

    String username,name,email;

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }
}
```

##### (b). Our Connector Class

```java
package com.tutorials.hp.jsonlistviewmdetail.m_JSON;

import java.io.IOException;
import java.net.HttpURLConnection;
import java.net.MalformedURLException;
import java.net.URL;

/**
 * -------------------ROLES-----------------------
 * 1.SET CONNECTION PROPRTIES
 * 2.ESTABLISH AND RETURN CONNECTION OBJ
 */
public class Connector {

    public static Object connect(String jsonURL)
    {
        try
        {
            URL url=new URL(jsonURL);
            HttpURLConnection con= (HttpURLConnection) url.openConnection();

            //CON PROPS
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

##### (c). JSON Downloader Class

```java
package com.tutorials.hp.jsonlistviewmdetail.m_JSON;

import android.app.ProgressDialog;
import android.content.Context;
import android.os.AsyncTask;
import android.widget.GridView;
import android.widget.ListView;
import android.widget.Toast;

import java.io.BufferedInputStream;
import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.net.HttpURLConnection;

/**
 * -----------------------ROLES-------------------------
 * 1.CONNECT TO NETWORK
 * 2.DOWNLOAD DATA IN BACKGROUND THREAD
 * 3.SEND THE DATA TO PARSER TO BE PARSED
 */
public class JSONDownloader extends AsyncTask<Void,Void,String> {

    Context c;
    String jsonURL;
    ListView lv;

    ProgressDialog pd;

    public JSONDownloader(Context c, String jsonURL, ListView lv) {
        this.c = c;
        this.jsonURL = jsonURL;
        this.lv = lv;
    }

    @Override
    protected void onPreExecute() {
        super.onPreExecute();

        pd=new ProgressDialog(c);
        pd.setTitle("Download JSON");
        pd.setMessage("Downloading...Please wait");
        pd.show();

    }

    @Override
    protected String doInBackground(Void... voids) {
        return download();
    }

    @Override
    protected void onPostExecute(String jsonData) {
        super.onPostExecute(jsonData);

        pd.dismiss();

        if(jsonData.startsWith("Error"))
        {
            String error=jsonData;
            Toast.makeText(c, error, Toast.LENGTH_SHORT).show();
        }else
        {
            //PARSER
            new JSONParser(c,jsonData, lv).execute();
        }

    }

    //DOWNLOAD
    private String download()
    {
        Object connection=Connector.connect(jsonURL);
        if(connection.toString().startsWith("Error"))
        {
            return connection.toString();
        }

        try
        {
            HttpURLConnection con= (HttpURLConnection) connection;
            if(con.getResponseCode()==con.HTTP_OK)
            {
                //GET INPUT FROM STREAM
                InputStream is=new BufferedInputStream(con.getInputStream());
                BufferedReader br=new BufferedReader(new InputStreamReader(is));

                String line;
                StringBuffer jsonData=new StringBuffer();

                //READ
                while ((line=br.readLine()) != null)
                {
                    jsonData.append(line+"n");
                }

                //CLOSE RESOURCES
                br.close();
                is.close();

                //RETURN JSON
                return jsonData.toString();

            }else
            {
                return "Error "+con.getResponseMessage();
            }
        } catch (IOException e) {
            e.printStackTrace();
            return "Error "+e.getMessage();

        }

    }

}
```

##### (d). JSON Parser Class

```java
package com.tutorials.hp.jsonlistviewmdetail.m_JSON;

import android.app.ProgressDialog;
import android.content.Context;
import android.os.AsyncTask;
import android.widget.GridView;
import android.widget.ListView;
import android.widget.Toast;

import com.tutorials.hp.jsonlistviewmdetail.m_Model.User;
import com.tutorials.hp.jsonlistviewmdetail.m_UI.CustomAdapter;

import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;

import java.util.ArrayList;

/**
 * ----------------- ROLES -----------------------
 * 1.RECEIVE DOWNLOADED DATA
 * 2.PARSE IT
 * 3.CALL ADAPTER CLASS TO BIND IT TO CUSTOM gridview
 */
public class JSONParser extends AsyncTask<Void,Void,Boolean>{

    Context c;
    String jsonData;
    ListView lv;

    ProgressDialog pd;
    ArrayList<User> users=new ArrayList<>();

    public JSONParser(Context c, String jsonData, ListView lv) {
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
    protected Boolean doInBackground(Void... voids) {
        return parse();
    }

    @Override
    protected void onPostExecute(Boolean isParsed) {
        super.onPostExecute(isParsed);

        pd.dismiss();
        if(isParsed)
        {
            //BIND
            lv.setAdapter(new CustomAdapter(c,users));
        }else
        {
            Toast.makeText(c, "Unable To Parse,Check Your Log output", Toast.LENGTH_SHORT).show();
        }

    }

    private Boolean parse()
    {
        try
        {
            JSONArray ja=new JSONArray(jsonData);
            JSONObject jo;

            users.clear();
            User user;

            for (int i=0;i<ja.length();i++)
            {
                jo=ja.getJSONObject(i);

                String name=jo.getString("name");
                String username=jo.getString("username");
                String email=jo.getString("email");

                user=new User();

                user.setName(name);
                user.setUsername(username);
                user.setEmail(email);

                users.add(user);
            }

            return true;

        } catch (JSONException e) {
            e.printStackTrace();
            return false;
        }
    }
}
```

##### (e). CustomAdapter Class

```java
package com.tutorials.hp.jsonlistviewmdetail.m_UI;

import android.content.Context;
import android.content.Intent;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.BaseAdapter;
import android.widget.TextView;

import com.tutorials.hp.jsonlistviewmdetail.DetailActivity;
import com.tutorials.hp.jsonlistviewmdetail.R;
import com.tutorials.hp.jsonlistviewmdetail.m_Model.User;

import java.util.ArrayList;

public class CustomAdapter  extends BaseAdapter{

    Context c;
    ArrayList<User> users;

    public CustomAdapter(Context c, ArrayList<User> users) {
        this.c = c;
        this.users = users;
    }

    @Override
    public int getCount() {
        return users.size();
    }

    @Override
    public Object getItem(int i) {
        return users.get(i);
    }

    @Override
    public long getItemId(int i) {
        return i;
    }

    @Override
    public View getView(int i, View view, ViewGroup viewGroup) {

        if(view==null)
        {
            view=LayoutInflater.from(c).inflate(R.layout.model,viewGroup,false);
        }

        TextView nameTxt= (TextView) view.findViewById(R.id.nameTxt);
        TextView emailTxt= (TextView) view.findViewById(R.id.emailTxt);
        TextView usernameTxt= (TextView) view.findViewById(R.id.usernameTxt);

        User user= (User) this.getItem(i);

        final String name=user.getName();
        final String email=user.getEmail();
        final String username=user.getUsername();

        nameTxt.setText(name);
        emailTxt.setText(email);
        usernameTxt.setText(username);

        view.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View view) {
                //OPEN DETAIL ACTIVITY
               openDetailActivity(name,email,username);

            }
        });
        return view;
    }
    ////open activity
    private void openDetailActivity(String...details)
    {
        Intent i=new Intent(c,DetailActivity.class);
        i.putExtra("NAME_KEY",details[0]);
        i.putExtra("EMAIL_KEY",details[1]);
        i.putExtra("USERNAME_KEY",details[2]);

        c.startActivity(i);

    }

}
```

##### (f). Detail Activity Class

```java
package com.tutorials.hp.jsonlistviewmdetail;

import android.content.Intent;
import android.os.Bundle;
import android.support.v7.app.AppCompatActivity;
import android.widget.TextView;

public class DetailActivity extends AppCompatActivity {

    TextView nameTxt,emailTxt, usernameTxt;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_detail);

        nameTxt = (TextView) findViewById(R.id.nameDetailTxt);
        emailTxt= (TextView) findViewById(R.id.emailDetailTxt);
        usernameTxt = (TextView) findViewById(R.id.usernameDetailTxt);

        //GET INTENT
        Intent i=this.getIntent();

        //RECEIVE DATA
        String name=i.getExtras().getString("NAME_KEY");
        String email=i.getExtras().getString("EMAIL_KEY");
        String username=i.getExtras().getString("USERNAME_KEY");

        //BIND DATA
        nameTxt.setText(name);
        emailTxt.setText(email);
        usernameTxt.setText(username);
    }
}
```

##### (g). MainActivity Class

```java
package com.tutorials.hp.jsonlistviewmdetail;

import android.os.Bundle;
import android.support.design.widget.FloatingActionButton;
import android.support.v7.app.AppCompatActivity;
import android.support.v7.widget.Toolbar;
import android.view.View;
import android.widget.ListView;

import com.tutorials.hp.jsonlistviewmdetail.m_JSON.JSONDownloader;

public class MainActivity extends AppCompatActivity {

    String jsonURL="http://jsonplaceholder.typicode.com/users";
    ListView lv;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);
        Toolbar toolbar = (Toolbar) findViewById(R.id.toolbar);
        setSupportActionBar(toolbar);

        lv = (ListView) findViewById(R.id.lv);

        FloatingActionButton fab = (FloatingActionButton) findViewById(R.id.fab);
        fab.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View view) {
                new JSONDownloader(MainActivity.this,jsonURL, lv).execute();

            }
        });
    }
}
```

#### Layouts

##### (a). activity_main.xml

```xml
<?xml version="1.0" encoding="utf-8"?>
<android.support.design.widget.CoordinatorLayout

    android_layout_width="match_parent"
    android_layout_height="match_parent"
    android_fitsSystemWindows="true"
    tools_context="com.tutorials.hp.jsonlistviewmulti_items.MainActivity">

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
    tools_context="com.tutorials.hp.jsonlistviewmdetail.MainActivity"
    tools_showIn="@layout/activity_main">

    <ListView
        android_id="@+id/lv"
        android_layout_width="match_parent"
        android_layout_height="wrap_content"
         />
</RelativeLayout>
```

##### (c). model.xml

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
                android_text="Email....................."
                android_lines="3"
                android_id="@+id/emailTxt"
                android_padding="10dp"
                android_layout_alignParentLeft="true"
                />

            <TextView
                android_layout_width="wrap_content"
                android_layout_height="wrap_content"
                android_textAppearance="?android:attr/textAppearanceMedium"
                android_text="Username"
                android_textStyle="italic"
                android_id="@+id/usernameTxt" />
    </LinearLayout>
</android.support.v7.widget.CardView>
```

##### (d). activity_detail.xml

```xml
<?xml version="1.0" encoding="utf-8"?>
<RelativeLayout

    android_layout_width="match_parent"
    android_layout_height="match_parent"
    android_paddingBottom="@dimen/activity_vertical_margin"
    android_paddingLeft="@dimen/activity_horizontal_margin"
    android_paddingRight="@dimen/activity_horizontal_margin"
    android_paddingTop="@dimen/activity_vertical_margin"
    tools_context="com.tutorials.hp.jsonlistviewmdetail.DetailActivity">

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
                    android_layout_width="160dp"
                    android_layout_height="wrap_content"
                    android_paddingLeft="10dp"
                    android_paddingRight="10dp"
                    android_layout_alignParentTop="true"
                    android_scaleType="centerCrop"
                    android_src="@drawable/user" />

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
                    <TextView
                        android_id="@+id/usernameDetailTxt"
                        android_layout_width="wrap_content"
                        android_layout_height="wrap_content"
                        android_textAppearance="?android:attr/textAppearanceLarge"
                        android_padding="5dp"
                        android_minLines="1"
                        android_textStyle="bold"
                        android_text="Username" />
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
                    android_id="@+id/emailDetailTxt"
                    android_layout_width="wrap_content"
                    android_layout_height="wrap_content"
                    android_textAppearance="?android:attr/textAppearanceLarge"
                    android_padding="5dp"
                    android_textColor="@color/colorAccent"
                    android_text="DATE" />
                <TextView
                    android_id="@+id/descDetailTxt"
                    android_layout_width="wrap_content"
                    android_layout_height="wrap_content"
                    android_textAppearance="?android:attr/textAppearanceLarge"
                    android_padding="5dp"
                    android_textColor="#0f0f0f"
                    android_minLines="4"
                    android_text="This user has worked with our company for two years now.He has been dedicated and really a team player.The tasks we have assigned him have been executed expertly.He is a true professional..." />

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

#### Download

You can download the full project here.

| No. | Resource | Direct Links |
| --- | --- | --- |
| 1. | GitHub Source Code | [Browse](https://github.com/Oclemy/JSONListViewMDetail) |
| 2. | Source Code | [Download](https://github.com/Oclemy/JSONListViewMDetail/archive/master.zip) |
| 3. | YouTube | [Channel](https://www.youtube.com/c/ProgrammingWizards) |
