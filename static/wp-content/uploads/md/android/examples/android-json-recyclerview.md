# Android JSON RecyclerView Examples

_Android JSON, RecyclerView, AsyncTask and HttpURLConnection Tutorial and Examples_

In this article we want to look at several examples of how to use three technologies:

- JSON
- HttpURLConnection
- AsyncTask
- RecyclerView


##### JSON

_JSON in full is JavaScript Object Notation. It is a language-independent data format that expresses JSON objects as human-readable lists of properties(name-value pairs)._

JSON is currently the most popular data inter-change format. This is because it's much more lightweight yet easier so faster than XML. It is a derivation of Javascript Programming Language. This makes it's syntax quite readable and easy to understand.

However JSON is not limited to any Programming Language. It is supported by probably all the major languages.

Learn more about JSON here

##### What we do with Our JSON.

We will be downloading json data from an online source. This is basically dummy json data goving us a list of user objects, or user JSONObjects. The whole data will be represented by a JSONArray.

Thus all we need is JSONArray amd JSONObject classes to parse our JSON data.

Once we've parse that data we will bind the result into our recyclerview.

##### What is HttpUrlConnection?

_HttpUrlconnection is a UrlConnection for HTTP used to send as well receive data over the web._ These data may be of any type and length.

We said we will be downloading JSON data. Well that is an example of making of a HTTP Call or Request. In this case we perform a HTTP GET request.

Now for that to happen we must have a networking class. That class will then provide the apropriate methods for making the HTTP request. Well in android the standard networking class is called **HttpURLConnection**.

Learn more about HttpURLConnection here.

##### AsyncTask?

_**AsyncTask** is a helper class for performing easy threading and iscreated around Thread class._

Remember we've talked about making a HTTP call via `HttpURLConnection`. Well for that process to smooth and not freeze or 'hang' our app, we have to perform that call in what we call a background thread, rather than the UI or Main thread.

This is needed since making such requests are time-consuming.

Learn more about AsyncTask here.

##### What is RecyclerView?

_A recyclerview is an adapterview that allows us efficiently, with great flexibility render large datasets._

Having downloaded and parsed the json data, we will now bind the result to our RecyclerView.

Learn more [about RecyclerView here](https://camposha.info/android/recyclerview).

##### Examples We Look At.

Well we look at three examples:

1. Android JSON - RecyclerView - Download,Parse then Show
2. Android JSON - RecyclerView Master Detail - Download,Parse,Show

* * *

### 1\. Android JSON - RecyclerView - Download,Parse then Show

[center]_Android JSON - RecyclerView - Download,Parse then Show tutorial_.[/center]

Here's the demo:

#### Java Code

##### (a). Our Connector Class

- Establish connection for us.
- Set connection properties.

```java
package com.tutorials.hp.jsonrecyclerview.m_JSON;

import java.io.IOException;
import java.net.HttpURLConnection;
import java.net.MalformedURLException;
import java.net.URL;

/*
 * ----------------------ROLES----------------
 * 1.Establish connection
 * 2. Connection props
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
package com.tutorials.hp.jsonrecyclerview.m_JSON;

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

/*
 * --------------ROLES---------------
 * 1.DOWNLOAD DATA IN BG THREAD
 * 2.PASS IT TO PARSER CLASS
 */
public class JSONDownloader extends AsyncTask<Void,Void,String>  {

    Context c;
    String jsonURL;
    RecyclerView rv;

    ProgressDialog pd;

    public JSONDownloader(Context c, String jsonURL, RecyclerView rv) {
        this.c = c;
        this.jsonURL = jsonURL;
        this.rv = rv;
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
            new JSONParser(c,jsonData,rv).execute();

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
package com.tutorials.hp.jsonrecyclerview.m_JSON;

import android.app.ProgressDialog;
import android.content.Context;
import android.os.AsyncTask;
import android.support.v7.widget.RecyclerView;
import android.widget.Toast;

import com.tutorials.hp.jsonrecyclerview.m_Recycler.MyAdapter;

import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;

import java.util.ArrayList;

/*
 * ----------ROLESE-----------
 * 1.RECEIVE JSON DATA
 * 2.PARSE IT
 * 3.BIND IT TO RECYCLERVIEW
 */
public class JSONParser extends AsyncTask<Void,Void,Boolean>{

    Context c;
    String jsonData;
    RecyclerView rv;

    ProgressDialog pd;
    ArrayList<String> users=new ArrayList<>();

    public JSONParser(Context c, String jsonData, RecyclerView rv) {
        this.c = c;
        this.jsonData = jsonData;
        this.rv = rv;
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
            MyAdapter adapter=new MyAdapter(c,users);
            rv.setAdapter(adapter);

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

##### (d). Our ViewHolder Class

- Holds our View for Recycling.

```java
package com.tutorials.hp.jsonrecyclerview.m_Recycler;

import android.support.v7.widget.RecyclerView;
import android.view.View;
import android.widget.TextView;

import com.tutorials.hp.jsonrecyclerview.R;

public class MyViewHolder extends RecyclerView.ViewHolder {

    TextView nameTxt;

    public MyViewHolder(View itemView) {
        super(itemView);

        nameTxt= (TextView) itemView.findViewById(R.id.nameTxt);

    }
}
```

##### (e). Our MyAdapter Class

- Derives from RecyclerView.Adapter
- Responsible for Layout Inflation.
- Responsible for data binding to views

```java
package com.tutorials.hp.jsonrecyclerview.m_Recycler;

import android.content.Context;
import android.support.v7.widget.RecyclerView;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;

import com.tutorials.hp.jsonrecyclerview.R;

import java.util.ArrayList;

public class MyAdapter extends RecyclerView.Adapter<MyViewHolder> {

    Context c;
    ArrayList<String> users;

    public MyAdapter(Context c, ArrayList<String> users) {
        this.c = c;
        this.users = users;
    }

    @Override
    public MyViewHolder onCreateViewHolder(ViewGroup parent, int viewType) {
        View v=LayoutInflater.from(c).inflate(R.layout.model,parent,false);
        return new MyViewHolder(v);
    }

    @Override
    public void onBindViewHolder(MyViewHolder holder, int position) {

        //BIND
        holder.nameTxt.setText(users.get(position));

    }

    @Override
    public int getItemCount() {
        return users.size();
    }
}
```

##### (f). Our MainActivity Class

- Our launcher activity.
- We start our downloader, passing in URL as well as other parameters.

```java
package com.tutorials.hp.jsonrecyclerview;

import android.os.Bundle;
import android.support.design.widget.FloatingActionButton;
import android.support.v7.app.AppCompatActivity;
import android.support.v7.widget.LinearLayoutManager;
import android.support.v7.widget.RecyclerView;
import android.support.v7.widget.Toolbar;
import android.view.View;

import com.tutorials.hp.jsonrecyclerview.m_JSON.JSONDownloader;

public class MainActivity extends AppCompatActivity {

    String jsonURL="http://jsonplaceholder.typicode.com/users";
    RecyclerView rv;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);
        Toolbar toolbar = (Toolbar) findViewById(R.id.toolbar);
        setSupportActionBar(toolbar);

        rv = (RecyclerView) findViewById(R.id.rv);
        rv.setLayoutManager(new LinearLayoutManager(this));

        FloatingActionButton fab = (FloatingActionButton) findViewById(R.id.fab);
        fab.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View view) {
                new JSONDownloader(MainActivity.this,jsonURL, rv).execute();
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
    tools_context="com.tutorials.hp.jsonrecyclerview.MainActivity">

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

##### (b). content_main.xml__

- Displays our RecyclerView.

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
    tools_context="com.tutorials.hp.jsonrecyclerview.MainActivity"
    tools_showIn="@layout/activity_main">

    <android.support.v7.widget.RecyclerView
        android_id="@+id/rv"
        android_layout_width="match_parent"
        android_layout_height="wrap_content"
       />
</RelativeLayout>
```

##### (c). model.xml

- Defines RecyclerView View Item.
- We use a CardView.

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
    android_layout_height="wrap_content">
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

#### Our Manifest

- Make sure you add permission for accessing internet.

```xml
<?xml version="1.0" encoding="utf-8"?>
<manifest
    package="com.tutorials.hp.jsonrecyclerview">

    <uses-permission android_name="android.permission.INTERNET"/>
    ..

</manifest>
```

#### Download

You can download the full project here.

| No. | Resource | Direct Links |
| --- | --- | --- |
| 1. | GitHub Source Code | [Browse](https://github.com/Oclemy/JSON-RecyclerView) |
| 2. | Source Code | [Download](https://github.com/Oclemy/JSON-RecyclerView/archive/master.zip) |
| 3. | YouTube | [Channel](https://www.youtube.com/c/ProgrammingWizards) |

* * *

### 2\. Android RecyclerView - JSON Master Detail - Download,Parse,Show

[center]_Android RecyclerView - JSON Master Detail - Download,Parse,Show_[/center]

Android JSON Data Parsing tutorial - Download JSOn data from online, Parse it, and display in RecyclerView. Open New activity when RecyclerView is clicked.

Android JSON tutorial. Download JSON data from online using HTTPURLConnection class, parse that data and bind it to RecyclerView. Open New activity when recyclerview item is clicked.

Here's the project demo:

##### Tools Used

This example was written with the following tools:

- Windows 8
- AndroidStudio IDE
- Genymotion Emulator/Bluestacks
- Language : Java

#### AndroidManifest.xml

- Add internet permission in android manifest.

```xml
<?xml version="1.0" encoding="utf-8"?>
<manifest
    package="com.tutorials.hp.jsonrecyclerviewmdetail">

    <uses-permission android_name="android.permission.INTERNET"/>
    ...

</manifest>
```

#### Java Code

##### (a). User.java

- Represents a single user with properties like name and email.
- Our data object.

```java
package com.tutorials.hp.jsonrecyclerviewmdetail.m_Model;

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

##### (b). Connector.java

- Our Connector class.
- Will helps us establish connection to network, returning a HTTPURLConnection object.

```java
package com.tutorials.hp.jsonrecyclerviewmdetail.m_JSON;

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

##### (c). JSONDownloader.java

- Our Downloader class.
- Derives from AsyncTask.
- Will download JSON data in background thread with help or AsyncTask.

```java
package com.tutorials.hp.jsonrecyclerviewmdetail.m_JSON;

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

/**
 * -----------------------ROLES-------------------------
 * 1.CONNECT TO NETWORK
 * 2.DOWNLOAD DATA IN BACKGROUND THREAD
 * 3.SEND THE DATA TO PARSER TO BE PARSED
 */
public class JSONDownloader extends AsyncTask<Void,Void,String> {

    Context c;
    String jsonURL;
    RecyclerView rv;

    ProgressDialog pd;

    public JSONDownloader(Context c, String jsonURL, RecyclerView rv) {
        this.c = c;
        this.jsonURL = jsonURL;
        this.rv = rv;
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
        }else {

            //PARSER
            new JSONParser(c,jsonData,rv).execute();
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

##### (d). JSONParser.java

- Our JSONParser class.
- Extends AsyncTask.
- Will parse the downloaded JSON data and populate our ListView.

```java
package com.tutorials.hp.jsonrecyclerviewmdetail.m_JSON;

import android.app.ProgressDialog;
import android.content.Context;
import android.os.AsyncTask;
import android.support.v7.widget.RecyclerView;
import android.widget.GridView;
import android.widget.Toast;

import com.tutorials.hp.jsonrecyclerviewmdetail.m_Model.User;
import com.tutorials.hp.jsonrecyclerviewmdetail.m_UI.MyAdapter;

import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;

import java.util.ArrayList;

/**
 * ----------------- ROLES -----------------------
 * 1.RECEIVE DOWNLOADED DATA
 * 2.PARSE IT
 * 3.CALL ADAPTER CLASS TO BIND IT TO CUSTOM recyclerview
 */
public class JSONParser extends AsyncTask<Void,Void,Boolean>{

    Context c;
    String jsonData;
    RecyclerView rv;

    ProgressDialog pd;
    ArrayList<User> users=new ArrayList<>();

    public JSONParser(Context c, String jsonData, RecyclerView rv) {
        this.c = c;
        this.jsonData = jsonData;
        this.rv = rv;
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
            rv.setAdapter(new MyAdapter(c,users));

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

##### (e). ItemClickListener.java

- Our ItemClickListener interface.
- Contains the signature for our onItemClick() method.

```java
package com.tutorials.hp.jsonrecyclerviewmdetail.m_UI;

public interface ItemClickListener {

    void onItemClick(int pos);
}
```

##### (f). MyViewHolder.java

- Our MyViewHolder class.
- Derives from RecyclerView.ViewHolder.
- Implements View.OnClickListener interface.
- Will hold three textviews for recycling.

```java
package com.tutorials.hp.jsonrecyclerviewmdetail.m_UI;

import android.support.v7.widget.RecyclerView;
import android.view.View;
import android.widget.TextView;

import com.tutorials.hp.jsonrecyclerviewmdetail.R;

public class MyViewHolder extends RecyclerView.ViewHolder implements View.OnClickListener{

    TextView nameTxt,usernameTxt,emailTxt;
    ItemClickListener itemClickListener;

    public MyViewHolder(View itemView) {
        super(itemView);

        nameTxt= (TextView) itemView.findViewById(R.id.nameTxt);
        usernameTxt= (TextView) itemView.findViewById(R.id.usernameTxt);
        emailTxt= (TextView) itemView.findViewById(R.id.emailTxt);

        itemView.setOnClickListener(this);

    }

    @Override
    public void onClick(View view) {
        this.itemClickListener.onItemClick(this.getLayoutPosition());
    }
    public void setItemClickListener(ItemClickListener itemClickListener)
    {
        this.itemClickListener=itemClickListener;
    }
}
```

##### (g). MyAdapter.java

- Our MyAdapter class.
- Derives from RecyclerView.Adapter.
- Is our adapter class.
- Will bind data to our views as well as creating our viewholder.
- When recyclerview is clicked we'll open new activity here.

```java
package com.tutorials.hp.jsonrecyclerviewmdetail.m_UI;

import android.content.Context;
import android.content.Intent;
import android.support.v7.widget.RecyclerView;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;

import com.tutorials.hp.jsonrecyclerviewmdetail.DetailActivity;
import com.tutorials.hp.jsonrecyclerviewmdetail.R;
import com.tutorials.hp.jsonrecyclerviewmdetail.m_Model.User;

import java.util.ArrayList;

public class MyAdapter extends RecyclerView.Adapter<MyViewHolder> {

    Context c;
    ArrayList<User> users;

    public MyAdapter(Context c, ArrayList<User> users) {
        this.c = c;
        this.users = users;
    }

    @Override
    public MyViewHolder onCreateViewHolder(ViewGroup parent, int viewType) {
        View v= LayoutInflater.from(c).inflate(R.layout.model,parent,false);
        return new MyViewHolder(v);
    }

    @Override
    public void onBindViewHolder(MyViewHolder holder, int position) {

        User user= users.get(position);

        final String name=user.getName();
        final String email=user.getEmail();
        final String username=user.getUsername();

        //BIND
        holder.nameTxt.setText(name);
        holder.emailTxt.setText(email);
        holder.usernameTxt.setText(username);

        holder.setItemClickListener(new ItemClickListener() {
            @Override
            public void onItemClick(int pos) {
                openDetailActivity(name,email,username);
            }
        });

    }

    @Override
    public int getItemCount() {
        return users.size();
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

##### (h). DetailActivity.java

- Our DetailActivity class.
- Shows the details of a user.
- Will receive data from MainActivity via intent.

```java
package com.tutorials.hp.jsonrecyclerviewmdetail;

import android.content.Intent;
import android.support.v7.app.AppCompatActivity;
import android.os.Bundle;
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

##### (i). MainActivity.java

- Our MainActivity class.
- Will show our RecyclerView with data parsed from json.

```java
package com.tutorials.hp.jsonrecyclerviewmdetail;

import android.os.Bundle;
import android.support.design.widget.FloatingActionButton;
import android.support.v7.app.AppCompatActivity;
import android.support.v7.widget.LinearLayoutManager;
import android.support.v7.widget.RecyclerView;
import android.support.v7.widget.Toolbar;
import android.view.View;

import com.tutorials.hp.jsonrecyclerviewmdetail.m_JSON.JSONDownloader;

public class MainActivity extends AppCompatActivity {

    String jsonURL="http://jsonplaceholder.typicode.com/users";
    RecyclerView rv;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);
        Toolbar toolbar = (Toolbar) findViewById(R.id.toolbar);
        setSupportActionBar(toolbar);

        rv = (RecyclerView) findViewById(R.id.rv);
        rv.setLayoutManager(new LinearLayoutManager(this));

        FloatingActionButton fab = (FloatingActionButton) findViewById(R.id.fab);
        fab.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View view) {
                new JSONDownloader(MainActivity.this,jsonURL, rv).execute();

            }
        });
    }
}
```

#### Our Layouts

#### (a). activity_main.xml

- Our ActivityMain.xml layout.
- Template layout.
- Contains content_main.xml.

```xml
<?xml version="1.0" encoding="utf-8"?>
<android.support.design.widget.CoordinatorLayout

    android_layout_width="match_parent"
    android_layout_height="match_parent"
    android_fitsSystemWindows="true"
    tools_context="com.tutorials.hp.jsonrecyclerviewmdetail.MainActivity">

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

##### (b). conten_main.xml

- Our content_main.xml layout.
- Will hold our RecyclerView.

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
    tools_context="com.tutorials.hp.jsonrecyclerviewmdetail.MainActivity"
    tools_showIn="@layout/activity_main">

    <android.support.v7.widget.RecyclerView
        android_id="@+id/rv"
        android_layout_width="match_parent"
        android_layout_height="wrap_content"
         />
</RelativeLayout>
```

##### (c). activity _detail.xml

- Detail Activity layout.

```xml
<?xml version="1.0" encoding="utf-8"?>
<RelativeLayout

    android_layout_width="match_parent"
    android_layout_height="match_parent"
    android_paddingBottom="@dimen/activity_vertical_margin"
    android_paddingLeft="@dimen/activity_horizontal_margin"
    android_paddingRight="@dimen/activity_horizontal_margin"
    android_paddingTop="@dimen/activity_vertical_margin"
    tools_context="com.tutorials.hp.jsonrecyclerviewmdetail.DetailActivity">

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

##### (e). model.xml

- Our model.xml layout.
- Will get inflated to our RecyclerView viewitems.
- Each model has CardView as its root tag.

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

#### Download

You can download the full project here.

| No. | Resource | Direct Links |
| --- | --- | --- |
| 1. | GitHub Source Code | [Browse](https://github.com/Oclemy/JSONRecyclerviewMDetail) |
| 2. | Source Code | [Download](https://github.com/Oclemy/JSONRecyclerviewMDetail/archive/master.zip) |
| 3. | YouTube | [Channel](https://www.youtube.com/c/ProgrammingWizards) |
| 4. | YouTube | [Video Tutorial]([https://youtu.be/SRmjXr6Ui-I](https://youtu.be/SRmjXr6Ui-I) ) |
