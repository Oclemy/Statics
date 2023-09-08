# Android JSON GridView Examples


_Android JSON, JSONArray, JSONOBject, GridView and HttpURLConnection Tutorial and Examples._

In this article we want to look at several examples of how to use three technologies:

- JSON
- JSONArray
- JSONObject
- HttpURLConnection
- AsyncTask
- GridView


#### What is JSON

_JSON stands for JavaScript Object Notation and is a language-independent data format that expresses JSON objects as human-readable lists of properties(name-value pairs)._

It is a data format derived from the literals of the JavaScript programming language.

Learn more about JSON here

#### What We do With JSON

Well we will parse or process JSON data to obtain our data. JSON has to be parsed and we will use the native JSONArray and JSONObject classes. These two alongside an AsyncTask allow us parse or process json data thus filling an ArrayList.

#### What is HttpUrlConnection?

_HttpUrlconnection is a UrlConnection for HTTP used to send as well receive data over the web._ These data may be of any type and length.

Basically it is a networking class that allows us make HTTP calls. HTTP stands for Hyper Text Transfer Protocol and allows data transfer over the web.

Thus our android app also needs a way to transfer data to and from the web. Thus it has to make HTTP calls. And it is this `HttpUrlConnection` that powers that.

Learn more about HttpURLConnection here.

#### What is AsyncTask?

_**AsyncTask** is a helper class for performing easy threading and created around Thread._

It allows us to perform our HTTP calls safely in a background thread. This is very important as doing them in the main thread can cause the user interface to freeze.

#### What is GridView?

_A gridview is an adapterview that shows items in a two-dimensional grid._

GridView allows us render our items in a grid like manner. It is an alternative to using a ListView.

Learn more about GridView here.

### JSONArray

_Android JSONArray Tutorial and Examples_

JSONArray is a class representing a dense indexed sequence of values.

For these mapping names have to be unique and non-null strings.

On the hand values may be any mix of :

1. JSONObjects
2. JSONArrays
3. Strings
4. Booleans
5. Integers
6. Longs
7. Doubles
8. NULL
9. null.

Values may not be `NaNs`, `infinities`, or of any type not listed above.

Null and null, beware are different.

[notice] Instances of JSONArray class are not thread safe. Moreover, JSONArray should not be subclassed as it was not designed for inheritance. [/notice]

Let's start by introdution to JSON

#### Quick JSONArray Examples

##### 1\. How to load JSON From Assets Folder into a List

We will load the JSON from our assets folder into an `InputStream`, which we read into a `byte[]` and then close.

Then later we turn that `byte array` into a string and return it.

```java
  private String loadJSONFromAsset() {
    String json;
    try {
      InputStream is = getAssets().open("quotes.json");
      int size = is.available();
      byte[] buffer = new byte[size];
      //noinspection ResultOfMethodCallIgnored
      is.read(buffer);
      is.close();
      json = new String(buffer, "UTF-8");
    } catch (IOException ex) {
      Log.e(TAG, "loadJSONFromAsset", ex);
      return null;
    }
    return json;
  }
```

Then now we can use that `loadJSONFromAsset()` method. This time around our aim is to return a [List](https://camposha.info/java/list) of quotes.

We will first start by instantiating the `JSONArray`, passing in the `loadJSONFromAsset()` method, which will be returning a json string.

Then we will be looping through our JSONArray, obtaining `JSONObject`s in the process and extracting properties which we pass to our quote constructor as we instantiate the Quote.

We then fill our [List](https://camposha.info/java/list) collection. We are doing these for every iteration. Here's the full method:

```java
  private List<Quote> getQuotes() {
    try {
      JSONArray array = new JSONArray(loadJSONFromAsset());
      List<Quote> quotes = new ArrayList<>();
      for (int i = 0; i < array.length(); i++) {
        JSONObject branchObject = array.getJSONObject(i);
        String quote = branchObject.getString("quote");
        String author = branchObject.getString("author");
        quotes.add(new Quote(author, quote));
      }
      return quotes;
    } catch (JSONException e) {
      Log.e(TAG, "getJSONFromAsset", e);
    }
    return null;
  }
```

##### 2\. How to turn a JSONArray into a Collection

Let's say you are receiving a `JSONArray` from somewhere and you want it turned into a collection of objects.

Well we can create a `toCollection()` method. First we will instantiate that `Collection` as an ArrayList.

Then loop through the JSONArray. For every iteration we will check if the current entry is an instance of JSONObject. If so we add it to our collection.

On the other hand if it is a `JSONArray` we recursively call this `toCollection()` method.

If it is a primitive type on the other hand we simply add it to our collection.

```java
  public static Collection<Object> toCollection(JSONArray array) {
    Collection<Object> collection = new ArrayList<>();

    for (int i = 0; i < array.length(); i++) {
        Object entry = array.get(i);

        if (entry instanceof JSONObject) {
            collection.add(toMap((JSONObject) entry));
        } else if (entry instanceof JSONArray) {
            collection.add(toCollection((JSONArray) entry));
        } else {
            collection.add(entry);
        }
    }

    return collection;
}
```

### JSONObject

_Android JSONObject Tutorial and Examples_

JSONObject is a class representing a modifiable set of name/value mappings.

For these mapping names have to be unique and non-null strings.

On the hand values may be any mix of :

1. JSONObjects
2. JSONArrays
3. Strings
4. Booleans
5. Integers
6. Longs
7. Doubles or
8. NULL.

Values may not be `null`, `NaNs`, `infinities`, or of any type not listed above.

[notice] Take note that `NULL` is different from `null`. Continue reading to check difference. [/notice]

#### NULL vs null

`NULL` is an Object representing a sentinel value used to explicitly define a name with no value.

The difference with `null` is that values with `NULL`:

1. show up in the `names()` array.
2. show up in the `keys()` iterator
3. return `true` for `has(String)`
4. do not throw on `get(String)`
5. are included in the encoded JSON string.

This value violates the general contract of `equals(Object)` by returning `true` when compared to `null`. Its `toString()` method returns `null`.

#### Quick JSONObject Examples

Let's look at some quick JSON examples.

##### 1\. How to Generate JSON using JSONObject

`JSONObject` remember, we said is a class representing a modifiable set of name/value mappings.

Let's say we want to create a class responsing for creating us JSON data.

First step is to import the classes we want to use:

```java
import org.json.JSONException;
import org.json.JSONObject;
```

In this case we've imported `JSONObject` and `JSONException`, both from the `org.json` package.

Then as an instance field we instantiate the `JSONObject`:

```java
    private JSONObject object = new JSONObject();
```

Then creat a method that will receive a name String and a value object and put them in our `JSONObject` instance.

To put them we simply use the `put()` method. Then we you invoke the public `gen()` of the class instance we simply return you our `JSONObject` instance.

```java

import org.json.JSONException;
import org.json.JSONObject;

public class JsonGenerator {

    private JSONObject object = new JSONObject();

    public JsonGenerator put(String name, Object value){
        JSONObject tmpObj = object;
        try {
            object.put(name,value);
        } catch (JSONException e) {
            object = tmpObj;
        }
        return this;
    }

    public JSONObject gen() {
        return object;
    }
}
```

##### 2\. JSONObject Example

Here's another JSONObject example

```java
import org.json.JSONObject;

public class MrHelloWorld {

    public static void main(String[] args) {
        // convert Java to json
        JSONObject root = new JSONObject();
        root.put("message", "Hello");
        JSONObject place = new JSONObject();
        place.put("name", "World!");
        root.put("place", place);
        String json = root.toString();
        System.out.println(json);

        System.out.println();
        // convert json to Java
        JSONObject jsonObject = new JSONObject(json);
        String message = jsonObject.getString("message");
        String name = jsonObject.getJSONObject("place").getString("name");
        System.out.println(message + " " + name);
    }
}
```

#### Examples We Look At.

Well we look at three examples:

1. Android JSON - Simple GridView - Download,Parse and Show
2. Android Native JSON - GridView Multiple Fields - Download,Parse then Show
3. Android JSON - GridView Master Detail - Download,Parse,Show [Open Detail Activity]

* * *

### 1\. Android JSON - Simple GridView - Download,Parse and Show

[center]_Android JSON - Simple GridView - Download,Parse and Show tutorial_. [/center]

Here's the demo of what we create:

#### Java Code

##### (a). Our Connector Class

- Establish connection for us.
- Set connection properties.

```java
package com.tutorials.hp.jsongridview.m_JSON;

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
package com.tutorials.hp.jsongridview.m_JSON;

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

/*
 * --------------ROLES---------------
 * 1.DOWNLOAD DATA IN BG THREAD
 * 2.PASS IT TO PARSER CLASS
 */
public class JSONDownloader extends AsyncTask<Void,Void,String>  {

    Context c;
    String jsonURL;
    GridView gv;

    ProgressDialog pd;

    public JSONDownloader(Context c, String jsonURL, GridView gv) {
        this.c = c;
        this.jsonURL = jsonURL;
        this.gv = gv;
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
            //PARSE
            new JSONParser(c,jsonData,gv).execute();
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
package com.tutorials.hp.jsongridview.m_JSON;

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

/*
 * ----------ROLESE-----------
 * 1.RECEIVE JSON DATA
 * 2.PARSE IT
 * 3.BIND IT TO GRIDVIEW
 */
public class JSONParser extends AsyncTask<Void,Void,Boolean>{

    Context c;
    String jsonData;
    GridView gv;

    ProgressDialog pd;
    ArrayList<String> users=new ArrayList<>();

    public JSONParser(Context c, String jsonData, GridView gv) {
        this.c = c;
        this.jsonData = jsonData;
        this.gv = gv;
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
            //bind
            ArrayAdapter<String> adapter=new ArrayAdapter<String>(c,android.R.layout.simple_list_item_1,users);
            gv.setAdapter(adapter);

            gv.setOnItemClickListener(new AdapterView.OnItemClickListener() {
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
package com.tutorials.hp.jsongridview;

import android.os.Bundle;
import android.support.design.widget.FloatingActionButton;
import android.support.v7.app.AppCompatActivity;
import android.support.v7.widget.Toolbar;
import android.view.View;
import android.widget.GridView;

import com.tutorials.hp.jsongridview.m_JSON.JSONDownloader;

public class MainActivity extends AppCompatActivity {

    String jsonURL="http://jsonplaceholder.typicode.com/users";
    GridView gv;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);
        Toolbar toolbar = (Toolbar) findViewById(R.id.toolbar);
        setSupportActionBar(toolbar);

      gv= (GridView) findViewById(R.id.gv);

        FloatingActionButton fab = (FloatingActionButton) findViewById(R.id.fab);
        fab.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View view) {
                new JSONDownloader(MainActivity.this,jsonURL,gv).execute();
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
    tools_context="com.tutorials.hp.jsongridview.MainActivity">

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
    tools_context="com.tutorials.hp.jsongridview.MainActivity"
    tools_showIn="@layout/activity_main">

    <GridView
        android_id="@+id/gv"
        android_layout_width="match_parent"
        android_layout_height="wrap_content"
        android_numColumns="3"
         />
</RelativeLayout>
```

#### Our Manifest

- Make sure you add permission for accessing internet.

```xml
<?xml version="1.0" encoding="utf-8"?>
<manifest
    package="com.tutorials.hp.jsongridview">

    <uses-permission android_name="android.permission.INTERNET"/>

</manifest>
```

#### Download

You can download the full project here.

| No. | Resource | Direct Links |
| --- | --- | --- |
| 1. | GitHub Source Code | [Browse](https://github.com/Oclemy/JSON-GridView) |
| 2. | Source Code | [Download](https://github.com/Oclemy/JSON-GridView/archive/master.zip) |
| 3. | YouTube | [Channel](https://www.youtube.com/c/ProgrammingWizards) |

* * *

### 2\. Android Native JSON - GridView Multiple Fields - Download,Parse then Show

[center]_Android Native JSON - GridView Multiple Fields - Download,Parse then Show tutorial_.[/center]

In this tutorial we want to now see how to work with a custom gridview with multiple texts. We will be rendering multiple textviews in every single grid of our gridview.

Here's the demo project.

#### Java Code

##### (a). Our Connector Class

- Establish connection for us.
- Set connection properties.

```java
package com.tutorials.hp.jsongridviewmulti_items.m_JSON;

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
package com.tutorials.hp.jsongridviewmulti_items.m_JSON;

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

/*
 * -----------------------ROLES-------------------------
 * 1.CONNECT TO NETWORK
 * 2.DOWNLOAD DATA IN BACKGROUND THREAD
 * 3.SEND THE DATA TO PARSER TO BE PARSED
 */
public class JSONDownloader extends AsyncTask<Void,Void,String> {

    Context c;
    String jsonURL;
    GridView gv;

    ProgressDialog pd;

    public JSONDownloader(Context c, String jsonURL, GridView gv) {
        this.c = c;
        this.jsonURL = jsonURL;
        this.gv = gv;
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
            Toast.makeText(c,error, Toast.LENGTH_SHORT).show();
        }else
        {
            //PARSE
            new JSONParser(c,jsonData,gv).execute();
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
package com.tutorials.hp.jsongridviewmulti_items.m_JSON;

import android.app.ProgressDialog;
import android.content.Context;
import android.os.AsyncTask;
import android.widget.GridView;
import android.widget.Toast;

import com.tutorials.hp.jsongridviewmulti_items.m_Model.User;
import com.tutorials.hp.jsongridviewmulti_items.m_UI.CustomAdapter;

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
    GridView gv;

    ProgressDialog pd;
    ArrayList<User> users=new ArrayList<>();

    public JSONParser(Context c, String jsonData, GridView gv) {
        this.c = c;
        this.jsonData = jsonData;
        this.gv = gv;
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
            CustomAdapter adapter=new CustomAdapter(c,users);
            gv.setAdapter(adapter);
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

- Inflate our Custom Model into a View Item for our gridview.
- Bind data to our AdapterView.

```java
package com.tutorials.hp.jsongridviewmulti_items.m_UI;

import android.content.Context;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.BaseAdapter;
import android.widget.TextView;

import com.tutorials.hp.jsongridviewmulti_items.R;
import com.tutorials.hp.jsongridviewmulti_items.m_Model.User;

import java.util.ArrayList;

/*
 * ---------------------------ROLES-------------------------------
 * 1.INFLATE MODEL LAYOUT
 * 2.BIND DATA TO GRIDVIEW
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
package com.tutorials.hp.jsongridviewmulti_items;

import android.os.Bundle;
import android.support.design.widget.FloatingActionButton;
import android.support.v7.app.AppCompatActivity;
import android.support.v7.widget.Toolbar;
import android.view.View;
import android.widget.GridView;

import com.tutorials.hp.jsongridviewmulti_items.m_JSON.JSONDownloader;

public class MainActivity extends AppCompatActivity {

    String jsonURL="http://jsonplaceholder.typicode.com/users";
    GridView gv;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);
        Toolbar toolbar = (Toolbar) findViewById(R.id.toolbar);
        setSupportActionBar(toolbar);

        gv = (GridView) findViewById(R.id.gv);

        FloatingActionButton fab = (FloatingActionButton) findViewById(R.id.fab);
        fab.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View view) {
                new JSONDownloader(MainActivity.this,jsonURL, gv).execute();
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
    tools_context="com.tutorials.hp.jsongridviewmulti_items.MainActivity">

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
    tools_context="com.tutorials.hp.jsongridviewmulti_items.MainActivity"
    tools_showIn="@layout/activity_main">

    <GridView
        android_id="@+id/gv"
        android_layout_width="match_parent"
        android_layout_height="wrap_content"
        android_numColumns="2"
         />
</RelativeLayout>
```

##### (c). model.xml

- Inflated into a single viewitem for our gridview.

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

#### Our AndroidManifest.xml

- Make sure you add permission for accessing internet.

```xml
<?xml version="1.0" encoding="utf-8"?>
<manifest
    package="com.tutorials.hp.jsongridviewmulti_items">

    <uses-permission android_name="android.permission.INTERNET"/>
    ...

</manifest>
```

#### Download

You can download the full project here.

| No. | Resource | Direct Links |
| --- | --- | --- |
| 1. | GitHub Source Code | [Browse](https://github.com/Oclemy/JSON-GridView-Multi-Items) |
| 2. | Source Code | [Download](https://github.com/Oclemy/JSON-GridView-Multi-Items/archive/master.zip) |
| 3. | YouTube | [Channel](https://www.youtube.com/c/ProgrammingWizards) |

### 3\. Android JSON - GridView Master Detail - Download,Parse,Show [Open Detail Activity]

[center]_Android JSON - GridView Master Detail - Download,Parse,Show [Open Detail Activity]_[/center]

##### The Plan

1. Download json data from online url in background thread.
2. Parse this data using org.json classes,jsonObject and jsonArray.
3. Show it in Custom GridView.
4. Handle our gridview itemClicks and open detail activity.
5. Pass data to our detail activity

Here's the demo:

That's it lets get started.

### Java Code

#### (a). Our Connector Class

- Establish connection for us.
- Set connection properties.

```java
package com.tutorials.hp.jsongridviewmdetail.m_JSON;

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

##### (b). Our JSON Downloader Class

- Where we download our json data from network.
- We do this in background thread using AsyncTask.
- Meanwhile we show a progress dialog.
- After this, we pass our json data to JSONParser class to be parsed.

```java
package com.tutorials.hp.jsongridviewmdetail.m_JSON;

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

/**
 * -----------------------ROLES-------------------------
 * 1.CONNECT TO NETWORK
 * 2.DOWNLOAD DATA IN BACKGROUND THREAD
 * 3.SEND THE DATA TO PARSER TO BE PARSED
 */
public class JSONDownloader extends AsyncTask<Void,Void,String> {

    Context c;
    String jsonURL;
    GridView gv;

    ProgressDialog pd;

    public JSONDownloader(Context c, String jsonURL, GridView gv) {
        this.c = c;
        this.jsonURL = jsonURL;
        this.gv = gv;
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
            new JSONParser(c,jsonData,gv).execute();
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

##### (c). Our JSON Parser Class

- Receives the JSON string we downloaded.
- So we parse this particular json,filling an arraylist.
- Then we bind our arraylist of data our view component via an adapter.

```java
package com.tutorials.hp.jsongridviewmdetail.m_JSON;

import android.app.ProgressDialog;
import android.content.Context;
import android.os.AsyncTask;
import android.widget.GridView;
import android.widget.Toast;

import com.tutorials.hp.jsongridviewmdetail.m_Model.User;
import com.tutorials.hp.jsongridviewmdetail.m_UI.CustomAdapter;

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
    GridView gv;

    ProgressDialog pd;
    ArrayList<User> users=new ArrayList<>();

    public JSONParser(Context c, String jsonData, GridView gv) {
        this.c = c;
        this.jsonData = jsonData;
        this.gv = gv;
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
            gv.setAdapter(new CustomAdapter(c,users));
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

- Inflates our Custom View Item Layout
- Binds data to our views
- Starts and Sends data to our DetailActivity using Intent Object and **_StartActivity(intent)_**

```java
package com.tutorials.hp.jsongridviewmdetail.m_UI;

import android.content.Context;
import android.content.Intent;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.BaseAdapter;
import android.widget.TextView;

import com.tutorials.hp.jsongridviewmdetail.DetailActivity;
import com.tutorials.hp.jsongridviewmdetail.R;
import com.tutorials.hp.jsongridviewmdetail.m_Model.User;

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

##### (e). Our DetailActivity Class

- Our Detail activity.
- Receives data from our MainActivity via Intent.
- Binds this data in detail activity hosted views.

```java
package com.tutorials.hp.jsongridviewmdetail;

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
        String desc=i.getExtras().getString("EMAIL_KEY");
        String propellant=i.getExtras().getString("USERNAME_KEY");

        //BIND DATA
        nameTxt.setText(name);
        emailTxt.setText(desc);
        usernameTxt.setText(propellant);

    }
}
```

##### (f). Our MainActivity Class

- Our launcher activity.
- Our Master Activity
- We start our downloader, passing in URL as well as other parameters.

```java
package com.tutorials.hp.jsongridviewmdetail;

import android.os.Bundle;
import android.support.design.widget.FloatingActionButton;
import android.support.v7.app.AppCompatActivity;
import android.support.v7.widget.Toolbar;
import android.view.View;
import android.widget.GridView;

import com.tutorials.hp.jsongridviewmdetail.m_JSON.JSONDownloader;

public class MainActivity extends AppCompatActivity {

    String jsonURL="http://jsonplaceholder.typicode.com/users";
    GridView gv;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);
        Toolbar toolbar = (Toolbar) findViewById(R.id.toolbar);
        setSupportActionBar(toolbar);

        gv= (GridView) findViewById(R.id.gv);

        FloatingActionButton fab = (FloatingActionButton) findViewById(R.id.fab);
        fab.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View view) {
                new JSONDownloader(MainActivity.this,jsonURL,gv).execute();

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
    tools_context="com.tutorials.hp.jsongridviewmdetail.MainActivity">

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

- Displays our GridView

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
    tools_context="com.tutorials.hp.jsongridviewmdetail.MainActivity"
    tools_showIn="@layout/activity_main">

    <GridView
        android_id="@+id/gv"
        android_layout_width="match_parent"
        android_layout_height="wrap_content"
        android_numColumns="2" />
</RelativeLayout>
```

##### (c). model.xml

- Inflated into a single view item for our gridview.

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

- Detail Activity layout

```xml
<?xml version="1.0" encoding="utf-8"?>
<RelativeLayout

    android_layout_width="match_parent"
    android_layout_height="match_parent"
    android_paddingBottom="@dimen/activity_vertical_margin"
    android_paddingLeft="@dimen/activity_horizontal_margin"
    android_paddingRight="@dimen/activity_horizontal_margin"
    android_paddingTop="@dimen/activity_vertical_margin"
    tools_context="com.tutorials.hp.jsongridviewmdetail.DetailActivity">

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

#### Our Manifest

- Make sure you add permission for accessing internet.

```xml
<?xml version="1.0" encoding="utf-8"?>
<manifest
    package="com.tutorials.hp.jsongridviewmdetail">

    <uses-permission android_name="android.permission.INTERNET"/>
    ...

</manifest>
```

#### Download

You can download the full project here.

| No. | Resource | Direct Links |
| --- | --- | --- |
| 1. | GitHub Source Code | [Browse](https://github.com/Oclemy/JSON-GridView-MDetail) |
| 2. | Source Code | [Download](https://github.com/Oclemy/JSON-GridView-MDetail/archive/master.zip) |
| 3. | YouTube | [Channel](https://www.youtube.com/c/ProgrammingWizards) |
