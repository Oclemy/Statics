# Volley - Fill Spinner from JSON

Volley is a fast HTTP client for android. If you have some data online, for example say in JSON or XML, you will need a HTTP client to connect to the server and download that data. After that you can parse the data into usable objects and render it in your widgets.

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
