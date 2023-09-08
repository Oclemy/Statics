# Android Volley Examples

> Android Volley Tutorial and Examples.

Volley is a fast HTTP client for android. If you have some data online, for example say in JSON or XML, you will need a HTTP client to connect to the server and download that data. After that you can parse the data into usable objects and render it in your widgets.


Learn Volley using these simple examples.

## Example 1: HTTP Methods

### 1. How to make a HTTP GET and POST request in Volley

First you have to add Volley as an implementation statement in your app level build.gradle.

Please search for the latest version:

```groovy
implementation 'com.android.volley:volley:1.0.0'
```

**(a). MyApplication**

Let's start by creating an [Application](https://camposha.info/android/application) class. Here you can see we have the TAG as well as the `RequestQueue` defined as static fields.

Then in the `onCreate()` method we initialize our Volley using the `Volley.newRequestQueue()` method.

We have also defined a static method to retrieve the the `RequestQueue` instance.

```java
import android.app.Application;

import com.android.volley.RequestQueue;
import com.android.volley.toolbox.Volley;

public class MyApplication extends Application{
    private static final String TAG = "MyApplication";

    public static RequestQueue sRequestQueue;

    @Override
    public void onCreate() {
        super.onCreate();

        sRequestQueue = Volley.newRequestQueue(getApplicationContext());
    }

    public static RequestQueue getHttpQueues(){
        return sRequestQueue;
    }
}
```

**(b). Constants**

Then a class to have your constants:

```java
public class Constant {

    public static final String JUHE_URL_GET = "http://apis.juhe.cn/mobile/get?phone=13429667914&key=562609042fbd47baa063b1a2c4637758";
    public static final String JUHE_URL_POST = "http://apis.juhe.cn/mobile/get?";
    public static final String JUHE_API_KEY = "562609042fbd47baa063b1a2c4637758";
    public static final String VOLLEY_TAG = "volley_tag";
}
```

**(c). VolleyInterface**

Then we create an abstract method with several methods and our Listeners:

```java
import android.content.Context;

import com.android.volley.Response;
import com.android.volley.VolleyError;

public abstract class VolleyInterface {

    public Context mContext;
    public static Response.Listener sListener;
    public static Response.ErrorListener sErrorListener;

    public VolleyInterface(Context context, Response.Listener<String> listener, Response.ErrorListener errorListener) {
        this.mContext = context;
        this.sListener = listener;
        this.sErrorListener = errorListener;
    }
    public Response.Listener<String> loadingListener() {
        sListener = new Response.Listener() {
            @Override
            public void onResponse(Object response) {
                onMySuccess(response.toString());
            }
        };
        return sListener;
    }

    public Response.ErrorListener errorListener(){
        sErrorListener = new Response.ErrorListener() {
            @Override
            public void onErrorResponse(VolleyError error) {
                onMyError(error);
            }
        };
        return sErrorListener;
    }

    public abstract void onMySuccess(String result);
    public abstract void onMyError(VolleyError error);
}
```

**(d). VolleyRequest**

Then we can have our VolleyRequest class:

```java
import android.content.Context;

import com.android.volley.AuthFailureError;
import com.android.volley.Request;
import com.android.volley.toolbox.StringRequest;
import com.example.innf.volleydemo.VolleyInterface;
import com.example.innf.volleydemo.app.MyApplication;

import java.util.Map;

public class VolleyRequest {
    private static final String TAG = "VolleyRequest";

    public static StringRequest sStringRequest;

    public static Context sContext;

    public static void RequestGet(Context context, String url, String tag, VolleyInterface volleyInterface) {
        MyApplication.getHttpQueues().cancelAll(tag); /
        sStringRequest = new StringRequest(Request.Method.GET, url, volleyInterface.loadingListener(), volleyInterface.errorListener());
        sStringRequest.setTag(tag);
        MyApplication.getHttpQueues().add(sStringRequest);
        MyApplication.getHttpQueues().start();
    }
    public static void RequestPost(Context context, String url, String tag, Map<String, String> params, VolleyInterface volleyInterface) {
        MyApplication.getHttpQueues().cancelAll(tag);
        sStringRequest = new StringRequest(url, volleyInterface.loadingListener(), volleyInterface.errorListener()){
            @Override
            protected Map<String, String> getParams() throws AuthFailureError {
                return super.getParams();
            }
        };
        sStringRequest.setTag(tag);
        MyApplication.getHttpQueues().add(sStringRequest);
        MyApplication.getHttpQueues().start();
    }
}
```

**(e). MainActivity**

First you create your activity with some constants:

```java
public class MainActivity extends AppCompatActivity {

    private static final String TAG = "MainActivity";

    private static final String STRING_GET_TAG = "string_get";
    private static final String STRING_POST_TAG = "string_post";
    private static final String JSON_OBJECT_GET_TAG = "json_object_get";
    private static final String JSON_OBJECT_POST_TAG = "json_object_post";
    private String tag = "";
    .......
```

Then:

**1\. How to perform a HTTP GET String request**

You can see we are using the `StringRequest` class.

```java
    private String volleyGetStringRequest() {
        StringRequest request = new StringRequest(Request.Method.GET, Constant.JUHE_URL_GET,
                new Response.Listener<String>() {
            @Override
            public void onResponse(String response) {
                Toast.makeText(MainActivity.this, response, Toast.LENGTH_SHORT).show();
            }
        },
                new Response.ErrorListener() {
            @Override
            public void onErrorResponse(VolleyError error) {
                Toast.makeText(MainActivity.this, error.toString(), Toast.LENGTH_SHORT).show();
            }
        });
        request.setTag(STRING_GET_TAG);
        MyApplication.getHttpQueues().add(request);
        return request.getTag().toString();
    }
```

**2\. How to perform a HTTP GET Object request**

This time round we use the `JsonObjectRequest` class. We will show the response or error in the Toast message.

```java
    private String volleyGetJsonObjectRequest() {
        JsonObjectRequest request = new JsonObjectRequest(Request.Method.GET, Constant.JUHE_URL_GET, null,
                new Response.Listener<JSONObject>() {
                    @Override
                    public void onResponse(JSONObject response) {
                        Toast.makeText(MainActivity.this, response.toString(), Toast.LENGTH_SHORT).show();
                    }
        },
                new Response.ErrorListener() {
                    @Override
                    public void onErrorResponse(VolleyError error) {
                        Toast.makeText(MainActivity.this, error.toString(), Toast.LENGTH_SHORT).show();
                    }
            });
        request.setTag(JSON_OBJECT_GET_TAG);
        MyApplication.getHttpQueues().add(request);
        return request.getTag().toString();
    }
```

**3\. Making a Custom GET Request**

```java
    private void volleyRequestGetByCustom() {
        VolleyRequest.RequestGet(this, Constant.JUHE_URL_GET, STRING_GET_TAG, new VolleyInterface(this, VolleyInterface.sListener, VolleyInterface.sErrorListener) {
            @Override
            public void onMySuccess(String result) {
                Toast.makeText(MainActivity.this, result, Toast.LENGTH_SHORT).show();
                Log.i(TAG, result);
            }

            @Override
            public void onMyError(VolleyError error) {
                Toast.makeText(MainActivity.this, error.toString(), Toast.LENGTH_SHORT).show();
            }
        });
    }
```

**4\. How to make a HTTP String POST Request**

Let's make a HTTP POST request using the `StringRequest`:

```java
    private String volleyPostStringRequest() {
        StringRequest request = new StringRequest(Request.Method.POST, Constant.JUHE_URL_POST,
                new Response.Listener<String>() {
                    @Override
                    public void onResponse(String response) {
                        Toast.makeText(MainActivity.this, response, Toast.LENGTH_SHORT).show();
                    }
        },
                new Response.ErrorListener() {
                    @Override
                    public void onErrorResponse(VolleyError error) {
                        Toast.makeText(MainActivity.this, error.toString(), Toast.LENGTH_SHORT).show();
                    }
                }){

            @Override
            protected Map<String, String> getParams() throws AuthFailureError {
                Map<String, String> hashMap = new HashMap<>();
                hashMap.put("phone", "13429667914");
                hashMap.put("key", "562609042fbd47baa063b1a2c4637758");
                return hashMap;
            }
        };
        request.setTag(STRING_POST_TAG);
        MyApplication.getHttpQueues().add(request);
        return request.getTag().toString();
    }
```

**4\. How to make a custom HTTP JSONObject POST Request**

We now make a HTTP POST request using the `JsonObjectRequest`:

```java
   private String volleyGetJsonObjectRequest() {
        JsonObjectRequest request = new JsonObjectRequest(Request.Method.GET, Constant.JUHE_URL_GET, null,
                new Response.Listener<JSONObject>() {
                    @Override
                    public void onResponse(JSONObject response) {
                        Toast.makeText(MainActivity.this, response.toString(), Toast.LENGTH_SHORT).show();
                    }
        },
                new Response.ErrorListener() {
                    @Override
                    public void onErrorResponse(VolleyError error) {
                        Toast.makeText(MainActivity.this, error.toString(), Toast.LENGTH_SHORT).show();
                    }
            });
        request.setTag(JSON_OBJECT_GET_TAG);
        MyApplication.getHttpQueues().add(request);
        return request.getTag().toString();
    }
```

Add all the above code in the main activity. Then add also your `onCreate()` and `onPost()` methods:

```java
   @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);
//        tag = volleyGetStringRequest();
//        tag = volleyGetJsonObjectRequest();
          tag = volleyPostStringRequest();
//        tag = volleyPostJsonObjectRequest();
//        volleyRequestGetByCustom();

    }
    @Override
    protected void onStop() {
        super.onStop();
        // cancelAll()
        MyApplication.getHttpQueues().cancelAll(tag);
    }
}
```
## Example 2: Android Volley - Fill `Spinner` from JSON"

In this case our widget is the Spinner, or rather the dropdown component. Data will be downloaded in JSON format, parsed and rendered in the spinner. Volley is used as the HTTP client.

### Step 1: Install Volley

You need to install Volley first.

### Step 2: Add Internet Permission

Include the internet permission in your android manifest, since you will need to use the internet to download the JSON data:

```xml
    <uses-permission android:name="android.permission.INTERNET"/>
```

### Step 3: Design Layout

Simply add a spinner, a textview and floating action button in your `activity_main.xml`. The spinner will be used to list the country names, the textview to show the selected country details while the floating action button to initiate the download operation.

### Step 4: Create Model class

In this case the model class is a country. Data that will be downloaded from the server will be a list of countries. Each country will properties like id, name, flag and states.

**Country.java**

```java
package com.spencerstudios.nullandvoid;

public class Country {

    private String cid;
    private String name;
    private String flag;
    private String states;

    public Country(String cid, String name, String flag, String states) {
        this.cid = cid;
        this.name = name;
        this.flag = flag;
        this.states = states;
    }

    public String getName() {
        return name;
    }

    public String getCid() {
        return cid;
    }

    public String getFlag() {
        return flag;
    }

    public String getStates() {
        return states;
    }

    @Override
    public String toString() {
        return this.name;
    }
}
```

### Step 5: Write Activity Code

Start by making imports, including importing Volley classes as well as classes to help us parse our JSON data:

```java
import com.android.volley.Request;
import com.android.volley.Response;
import com.android.volley.VolleyError;
import com.android.volley.toolbox.JsonArrayRequest;
import com.android.volley.toolbox.Volley;

import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;
```

Then create the activity by extending the AppCompatActivity:

```java
public class MainActivity extends AppCompatActivity {
```

Then we need to fetch data from the url, so create a method to do so:

```java
    private void fetchJsonDataFromUrl() {
```

Now instantiate the `JsonArrayRequest` passing in the request method, the url as well as a response callback. In this case we making a `HTTP GET` request:

```java
        JsonArrayRequest jsonArrayRequest = new JsonArrayRequest(Request.Method.GET, URL, null, new Response.Listener<JSONArray>() {
```

Now override the `onResponse()`, then also pass an error listener to our `JsonArrayRequest` constructor, then override the `onErrorResponse()`:

```java
            @Override
            public void onResponse(JSONArray response) {
                parseJson(response);
            }
        }, new Response.ErrorListener() {
            @Override
            public void onErrorResponse(VolleyError error) {
                error.printStackTrace();
            }
        });
```

Then add the `JsonArrayRequest` instance in your Volley request queue:

```java
Volley.newRequestQueue(this).add(jsonArrayRequest);
    }
```

Now that you;ve seen how to download JSON data using Volley, you need to parse that data and that is not the responsibility of Volley. So we create the following method which will receive a JSON response and parse it:

```java
    private void parseJson(JSONArray response) {

        List<Country> countries = new ArrayList<>();

        try {
            for (int i = 0; i < response.length(); i++) {
                JSONObject obj = response.getJSONObject(i);

                String cid = obj.getString("CID");
                String countryName = obj.getString("CName");
                String flag = obj.getString("Flag");
                String states = obj.getString("States");

                countries.add(new Country(cid, countryName, flag, states));
            }
            initSpinner(countries);
        } catch (JSONException e) {
            e.printStackTrace();
        }
    }
```

When the user selects an country in the spinner, we will render the country details in the textview. The following method will do that:

```java
    private void initSpinner(final List<Country> countries) {
        if (countries.size() > 0) {
            ArrayAdapter<Country> adapter = new ArrayAdapter<>(this, android.R.layout.simple_spinner_dropdown_item, countries);
            spinner.setAdapter(adapter);

            spinner.setOnItemSelectedListener(new AdapterView.OnItemSelectedListener() {
                @Override
                public void onItemSelected(AdapterView<?> parent, View view, int position, long id) {
                    Country country = countries.get(position);
                    String meta = "ID: " + country.getCid() + "\nNAME: " + country.getName() + "\nFLAG: " + country.getFlag() + "\nSTATES: " + country.getStates();
                    textView.setText(meta);
                }

                @Override
                public void onNothingSelected(AdapterView<?> parent) {
                }
            });
        }
    }
```

Here is the ful code for the main activity:

**MainActivity.java**

```java
public class MainActivity extends AppCompatActivity {

    /*
    because we need to access the internet, we'll need
    to add the internet permission, include the following
    line in the manifest file:
    <uses-permission android:name="android.permission.INTERNET"/>
    */

    private static final String URL = "http://app.visiontechme.com:85/MRMV10WSNEW/easymeeting.asmx/GetCountryNames";
    private Spinner spinner;
    private TextView textView;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);
        Toolbar toolbar = findViewById(R.id.toolbar);
        setSupportActionBar(toolbar);

        FloatingActionButton fab = findViewById(R.id.fab);
        spinner = findViewById(R.id.spinner);
        textView = findViewById(R.id.text_view);

        fab.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View view) {
                fetchJsonDataFromUrl();
            }
        });
    }

    private void fetchJsonDataFromUrl() {

        JsonArrayRequest jsonArrayRequest = new JsonArrayRequest(Request.Method.GET, URL, null, new Response.Listener<JSONArray>() {
            @Override
            public void onResponse(JSONArray response) {
                parseJson(response);
            }
        }, new Response.ErrorListener() {
            @Override
            public void onErrorResponse(VolleyError error) {
                error.printStackTrace();
            }
        });

        Volley.newRequestQueue(this).add(jsonArrayRequest);
    }

    private void parseJson(JSONArray response) {

        List<Country> countries = new ArrayList<>();

        try {
            for (int i = 0; i < response.length(); i++) {
                JSONObject obj = response.getJSONObject(i);

                String cid = obj.getString("CID");
                String countryName = obj.getString("CName");
                String flag = obj.getString("Flag");
                String states = obj.getString("States");

                countries.add(new Country(cid, countryName, flag, states));
            }
            initSpinner(countries);
        } catch (JSONException e) {
            e.printStackTrace();
        }
    }

    private void initSpinner(final List<Country> countries) {
        if (countries.size() > 0) {
            ArrayAdapter<Country> adapter = new ArrayAdapter<>(this, android.R.layout.simple_spinner_dropdown_item, countries);
            spinner.setAdapter(adapter);

            spinner.setOnItemSelectedListener(new AdapterView.OnItemSelectedListener() {
                @Override
                public void onItemSelected(AdapterView<?> parent, View view, int position, long id) {
                    Country country = countries.get(position);
                    String meta = "ID: " + country.getCid() + "\nNAME: " + country.getName() + "\nFLAG: " + country.getFlag() + "\nSTATES: " + country.getStates();
                    textView.setText(meta);
                }

                @Override
                public void onNothingSelected(AdapterView<?> parent) {
                }
            });
        }
    }
}
```

### Reference

Download the code [here](https://github.com/Binary-Finery/NullandVoid/archive/refs/heads/master.zip).

