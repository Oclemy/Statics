# Android Retrofit Search/Filter Examples



Searching data is of paramount significance to android app development. In this tutorial we will explore several search/filter examples based on Retrofit and MySQL database. PHP is the used server side programming language.


## Example 1: Android Retrofit MySQL ClientSide Multi-Column Search/Filter ListView

A_ndroid Retrofit MySQL ClientSide Multi-Column Search/Filter ListView Lesson._

How to perform a multi-column search filter on MySQL database using Retrofit as our HTTP Client, SearchView as our search view, and [ListView](https://camposha.info/android/listview) as our adapterview.

##### Introduction

In this tutorial we want to see how to perform a search filter against mysql database. Normally there are two techniques to perform a search operation:

1. Client Side Search - Fetch all data and perform search locally. This is also called a disconnected search as you can search your data even after the server is disconnected.
2. Server Side Search - Involves performing the search filter on the server in mysql database itself. The search is done using SQL queries. Also called a Connected search.

In this class we will cover the first approach, then in the next class we will cover the server side approach.

##### Why Search?

Well Searching is of paramount importance to applications. These days we are in the informage age and the big data age. There is so much data out there that we can incorporate into our applications. Infact it's too much for us to properly digest on our ourselves. So that's why alot of research is taking place currently to come up with machine learning techniques that can allow us use machines to process these data efficiently.

However in our mobile apps, we also need to work with third party data or data from webservices. That means that we still need to provide users with the ability to show users only small chunks of data relevant to them. We can't just render large data sets and leave user to scroll through the data item by item.

Instead we can implement search filter mechanisms. These allow user to search or filter data in realtime and get the appropriate results. Hence the fast computers can do the harder job of going through the items item by item and us we can get the final result.

##### What is MySQL?

MySQL is probably the most popular database server currently. Only one other RDBMS database may be more popular, that is SQLite. However SQLite is a file-based database and is not meant to be used in high performant environments.

MySQL powers plenty of web applications and is fairly easy to use with PHP. In this example we will use bothe technologies, MySQL as our database server while PHP as our server side programming language.

MySQL will be responsible for storing our data. PHP will be responsible for manipulating MySQL and returning us our data in JSON format.

##### What is PHP?

PHP is the most popular server side programming language. It powers majority of the websites and web applications. If you heavily use internet then probabibly you are interacting with PHP everyday.

PHP is popular because of two main reasons: Ease of use as well as Power. Once you have a PHP server like Apache, you can start working with PHP without special tools or editors or even librraries.

Yet it still gives us speed and power and allow us write usable apps with very small quantity of code.

##### What is SearchView?

SearchView is the widget we use to search or filter data in android. It is basiaccaly an EditText with a search icon. However it also provides us with special callback methods that we can react to thus searching our data.

You can read more about SearchView here.

##### What is ListView?

ListView is an android adapterview that allows us render lists of data. It's an alternative to [reclyclerview](https://camposha.info/android/recyclerview) that is easier to use and it has existed since the dawn of android.

In our case we will render both images and text from PHP MySQL to our ListView. The ListView shall comprise of beautiful CardViews. Each CardView will have an ImageView to render images, TextViews to render text and CheckBox to render boolean data.

Then when a single cardview is clicked we will open a new [activity](https://camposha.info/android/activity), a details activity. That activity will show our details for that particular clicked item.

Let's now come look at the app.

##### Tools Used

1. Android Studio - as our IDE.
2. Java as our programming language.
3. XAMPP -as our localhost server.

##### What is XAMPP?

XAMPP is a server for PHP and MySQL. It contains among other modules Apache Server and MySQL database server. That allow us to easily write web apps using those two technologies and test them write within our computer.

Normally you create your database and tables using a tool called PHPMyAdmin that is packaged by XAMPP. Then you can write PHP code and place in the **htdocs** directory in the XAMPP installation.

##### Demo

Here's the demo of the application:

![Android Retrofit MySQL Clientside Search Filter](https://camposha.info/wp-content/uploads/2019/04/demo1-21.gif)

Android Retrofit MySQL Clientside Search Filter

##### Video Tutorial

Here's the video tutorial:

#### 1\. PHP

We need to start by looking at the PHP side. We said we write our code in PHP programming language.

However first proceed over and create your database. You can use PHPMyAdmin.

I have created a folder inside my httdocs called `PHP`, then inside it I have a folder called `spacecrafts`. This folder is my project so I have placed my `index.php` file inside it.

![](https://camposha.info/wp-content/uploads/2019/04/demo3-7.png)

Here's our table structure.

![](https://camposha.info/wp-content/uploads/2019/04/table_structure.png)

Meanwhile we have images inside the `/images` folder.

![](https://camposha.info/wp-content/uploads/2019/04/demo4-3.png)

Then here's our `index.php` file:

**index.php**

```php
<?php

class Constants
{
    //DATABASE DETAILS
    static $DB_SERVER="localhost";
    static $DB_NAME="spacecraftsDB";
    static $USERNAME="root";
    static $PASSWORD="";

    //STATEMENTS
    static $SQL_SELECT_ALL="SELECT * FROM spacecraftsTB";

}

class Spacecrafts
{
    /*******************************************************************************************************************************************/
    /*
       1.CONNECT TO DATABASE.
       2. RETURN CONNECTION OBJECT
    */
    public function connect()
    {
        $con=new mysqli(Constants::$DB_SERVER,Constants::$USERNAME,Constants::$PASSWORD,Constants::$DB_NAME);
        if($con->connect_error)
        {
            // echo "Unable To Connect"; - For debug
            return null;
        }else
        {
            //echo "Connected"; - For debug
            return $con;
        }
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
            $result=$con->query(Constants::$SQL_SELECT_ALL);
            if($result->num_rows>0)
            {
                $spacecrafts=array();
                while($row=$result->fetch_array())
                {
                    array_push($spacecrafts, array("id"=>$row['id'],"name"=>$row['name'],
                    "propellant"=>$row['propellant'],"destination"=>$row['destination'],
                    "image_url"=>$row['image_url'],"technology_exists"=>$row['technology_exists']));
                }
                print(json_encode(array_reverse($spacecrafts)));
            }else
            {
                print(json_encode(array("PHP EXCEPTION : CAN'T RETRIEVE FROM MYSQL. ")));
            }
            $con->close();

        }else{
            print(json_encode(array("PHP EXCEPTION : CAN'T CONNECT TO MYSQL. NULL CONNECTION.")));
        }
    }
}
$spacecrafts=new Spacecrafts();
$spacecrafts->select();

//end
```

#### Setup

We are interested in setting up in two files:

1. build.gradle(app) - We add our dependencies here.
2. AndroidManifest.xml - We add internet connectivity permission here.

##### (a). build.gradle

Let's go over to dependencies closure and add dependencies

```groovy
dependencies {
    implementation fileTree(dir: 'libs', include: ['*.jar'])
    testImplementation 'junit:junit:4.12'
    implementation 'com.android.support:appcompat-v7:28.0.0'
    implementation 'com.android.support.constraint:constraint-layout:1.0.2'
    implementation "com.android.support:cardview-v7:28.0.0"
    implementation 'com.squareup.retrofit2:retrofit:2.4.0'
    implementation 'com.squareup.retrofit2:converter-gson:2.4.0'
    implementation 'com.squareup.picasso:picasso:2.71828'
}
```

##### (b). AndroidManifest.xml

Add internet connectivity permission here. Also register our `DetailsActivity`.

```xml
 <uses-permission android_name="android.permission.INTERNET"/>

    <application>
        <activity android_name=".MainActivity">
           ..
        </activity>
        <activity android_name=".DetailsActivity" android_parentActivityName=".MainActivity"/>
    </application>
```

#### Our Classes

We have only two files:

1. MainActivity.java
2. DetailsActivity.java

##### (a). MainActivity.java

Our main activity.

```java
package info.camposha.retrofitclientsidesearch;

import android.content.Context;
import android.content.Intent;
import android.os.Bundle;
import android.support.v7.app.AppCompatActivity;
import android.support.v7.widget.SearchView;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.BaseAdapter;
import android.widget.CheckBox;
import android.widget.Filter;
import android.widget.Filterable;
import android.widget.ImageView;
import android.widget.ListView;
import android.widget.ProgressBar;
import android.widget.TextView;
import android.widget.Toast;

import com.google.gson.annotations.SerializedName;
import com.squareup.picasso.Picasso;

import java.util.ArrayList;
import java.util.List;

import retrofit2.Call;
import retrofit2.Callback;
import retrofit2.Response;
import retrofit2.Retrofit;
import retrofit2.converter.gson.GsonConverterFactory;
import retrofit2.http.GET;

public class MainActivity extends AppCompatActivity {
    //private static final String BASE_URL = "http://10.0.2.2";
    private static final String BASE_URL = "http://192.168.12.2";
    private static final String FULL_URL = BASE_URL+"/PHP/spacecrafts/";
    class Spacecraft {
        @SerializedName("id")
        private int id;
        @SerializedName("name")
        private String name;
        @SerializedName("propellant")
        private String propellant;
        @SerializedName("destination")
        private String destination;
        @SerializedName("image_url")
        private String imageURL;
        @SerializedName("technology_exists")
        private int technologyExists;

        public Spacecraft(int id, String name, String propellant,String destination, String imageURL, int technologyExists) {
            this.id = id;
            this.name = name;
            this.propellant = propellant;
            this.destination=destination;
            this.imageURL = imageURL;
            this.technologyExists = technologyExists;
        }

        /*
         *GETTERS AND SETTERS
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
        public String getPropellant() {
            return propellant;
        }
        public String getDestination() {
            return destination;
        }
        public String getImageURL() {
            return imageURL;
        }
        public int getTechnologyExists() {
            return technologyExists;
        }
        @Override
        public String toString() {
            return name;
        }
    }

    interface MyAPIService {

        @GET("/PHP/spacecrafts")
        Call<List<Spacecraft>> getSpacecrafts();
    }

    static class RetrofitClientInstance {
        private static Retrofit retrofit;

        public static Retrofit getRetrofitInstance() {
            if (retrofit == null) {
                retrofit = new Retrofit.Builder()
                        .baseUrl(BASE_URL)
                        .addConverterFactory(GsonConverterFactory.create())
                        .build();
            }
            return retrofit;
        }
    }

    class FilterHelper extends Filter {
        private List<Spacecraft> currentList;
        private ListViewAdapter adapter;
        private Context c;

        public FilterHelper(List<Spacecraft> currentList, ListViewAdapter adapter, Context c) {
            this.currentList = currentList;
            this.adapter = adapter;
            this.c=c;
        }
        /*
        - Perform actual filtering.
         */
        @Override
        protected FilterResults performFiltering(CharSequence constraint) {
            FilterResults filterResults=new FilterResults();

            if(constraint != null && constraint.length()>0)
            {
                //CHANGE TO UPPER
                constraint=constraint.toString().toUpperCase();

                //HOLD FILTERS WE FIND
                ArrayList<Spacecraft> foundFilters=new ArrayList<>();

                Spacecraft spacecraft=null;

                //ITERATE CURRENT LIST
                for (int i=0;i<currentList.size();i++)
                {
                    spacecraft= currentList.get(i);

                    //SEARCH
                    if(spacecraft.getName().toUpperCase().contains(constraint) )
                    {
                        //ADD IF FOUND
                        foundFilters.add(spacecraft);
                    }
                }

                //SET RESULTS TO FILTER LIST
                filterResults.count=foundFilters.size();
                filterResults.values=foundFilters;
            }else
            {
                //NO ITEM FOUND.LIST REMAINS INTACT
                filterResults.count=currentList.size();
                filterResults.values=currentList;
            }

            //RETURN RESULTS
            return filterResults;
        }

        @Override
        protected void publishResults(CharSequence charSequence, FilterResults filterResults) {
            adapter.setSpacecrafts((ArrayList<Spacecraft>) filterResults.values);
            adapter.refresh();
        }
    }

    class ListViewAdapter extends BaseAdapter implements Filterable {

        private List<Spacecraft> spacecrafts;
        private Context context;
        private List<Spacecraft> currentList;
        private FilterHelper filterHelper;

        public ListViewAdapter(Context context,List<Spacecraft> spacecrafts){
            this.context = context;
            this.spacecrafts = spacecrafts;
            this.currentList=spacecrafts;
        }

        @Override
        public int getCount() {
            return spacecrafts.size();
        }

        @Override
        public Object getItem(int pos) {
            return spacecrafts.get(pos);
        }

        @Override
        public long getItemId(int pos) {
            return pos;
        }

        @Override
        public View getView(int position, View view, ViewGroup viewGroup) {
            if(view==null)
            {
                view=LayoutInflater.from(context).inflate(R.layout.model,viewGroup,false);
            }

            TextView nameTxt = view.findViewById(R.id.nameTextView);
            TextView txtPropellant = view.findViewById(R.id.propellantTextView);
            CheckBox chkTechExists = view.findViewById(R.id.myCheckBox);
            ImageView spacecraftImageView = view.findViewById(R.id.spacecraftImageView);

            final Spacecraft thisSpacecraft= spacecrafts.get(position);

            nameTxt.setText(thisSpacecraft.getName());
            txtPropellant.setText(thisSpacecraft.getPropellant());
            chkTechExists.setChecked( thisSpacecraft.getTechnologyExists()== 1);
            chkTechExists.setEnabled(false);

            if(thisSpacecraft.getImageURL() != null && thisSpacecraft.getImageURL().length()>0)
            {
                Picasso.get().load(FULL_URL+"/images/"+thisSpacecraft.getImageURL()).placeholder(R.drawable.placeholder).into(spacecraftImageView);
            }else {
                Toast.makeText(context, "Empty Image URL", Toast.LENGTH_LONG).show();
                Picasso.get().load(R.drawable.placeholder).into(spacecraftImageView);
            }

            view.setOnClickListener(new View.OnClickListener() {
                @Override
                public void onClick(View view) {
                    Toast.makeText(context, thisSpacecraft.getName(), Toast.LENGTH_SHORT).show();
                    String techExists="";
                    if(thisSpacecraft.getTechnologyExists()==1){
                        techExists="YES";
                    }else{
                        techExists="NO";
                    }
                    String[] spacecrafts = {
                            thisSpacecraft.getName(),
                            thisSpacecraft.getPropellant(),
                            thisSpacecraft.getDestination(),
                            techExists,
                            FULL_URL+"/images/"+thisSpacecraft.getImageURL()
                    };
                    openDetailActivity(spacecrafts);
                }
            });

            return view;
        }
        private void openDetailActivity(String[] data) {
            Intent intent = new Intent(MainActivity.this, DetailsActivity.class);
            intent.putExtra("NAME_KEY", data[0]);
            intent.putExtra("PROPELLANT_KEY", data[1]);
            intent.putExtra("DESTINATION_KEY", data[2]);
            intent.putExtra("TECHNOLOGY_EXISTS_KEY", data[3]);
            intent.putExtra("IMAGE_KEY", data[4]);
            startActivity(intent);
        }

        public void setSpacecrafts(ArrayList<Spacecraft> filteredSpacecrafts)
        {
            this.spacecrafts=filteredSpacecrafts;
        }
        @Override
        public Filter getFilter() {
            if(filterHelper==null)
            {
                filterHelper=new FilterHelper(currentList,this,context);
            }
            return filterHelper;
        }
        public void refresh(){
            notifyDataSetChanged();
        }
    }

    private ListViewAdapter adapter;
    private ListView mListView;
    private ProgressBar mProgressBar;
    private SearchView mSearchView;

    private void initializeWidgets(){
        mListView = findViewById(R.id.mListView);
        mProgressBar= findViewById(R.id.mProgressBar);
        mProgressBar.setIndeterminate(true);
        mProgressBar.setVisibility(View.VISIBLE);
        mSearchView=findViewById(R.id.mSearchView);
        mSearchView.setIconified(true);
    }

    private void populateListView(List<Spacecraft> spacecraftList) {
        adapter = new ListViewAdapter(this,spacecraftList);
        mListView.setAdapter(adapter);
    }

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);

        this.initializeWidgets();

        /*Create handle for the RetrofitInstance interface*/
        MyAPIService myAPIService = RetrofitClientInstance.getRetrofitInstance().create(MyAPIService.class);

        Call<List<Spacecraft>> call = myAPIService.getSpacecrafts();
        call.enqueue(new Callback<List<Spacecraft>>() {

            @Override
            public void onResponse(Call<List<Spacecraft>> call, Response<List<Spacecraft>> response) {
                mProgressBar.setVisibility(View.GONE);
                populateListView(response.body());
            }
            @Override
            public void onFailure(Call<List<Spacecraft>> call, Throwable throwable) {
                mProgressBar.setVisibility(View.GONE);
                Toast.makeText(MainActivity.this, throwable.getMessage(), Toast.LENGTH_LONG).show();
            }
        });

        mSearchView.setOnQueryTextListener(new SearchView.OnQueryTextListener() {
            @Override
            public boolean onQueryTextSubmit(String s) {
                adapter.getFilter().filter(s);
                return false;
            }
            @Override
            public boolean onQueryTextChange(String query) {
                adapter.getFilter().filter(query);
                return false;
            }
        });
    }
}
```

##### (b). DetailsActivity.java

Our details activity.

```java
package info.camposha.retrofitclientsidesearch;

import android.content.Intent;
import android.os.Bundle;
import android.support.v7.app.AppCompatActivity;
import android.widget.CheckBox;
import android.widget.ImageView;
import android.widget.TextView;

import com.squareup.picasso.Picasso;

import java.text.DateFormat;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.Random;

public class DetailsActivity extends AppCompatActivity {

    TextView nameDetailTextView,propellantDetailTextView,dateDetailTextView,destinationDetailTextView;
    CheckBox techExistsDetailCheckBox;
    ImageView teacherDetailImageView;

    private void initializeWidgets(){
        nameDetailTextView= findViewById(R.id.nameDetailTextView);
        propellantDetailTextView= findViewById(R.id.propellantDetailTextView);
        dateDetailTextView= findViewById(R.id.dateDetailTextView);
        destinationDetailTextView=findViewById(R.id.destinationDetailTextView);
        techExistsDetailCheckBox= findViewById(R.id.techExistsDetailCheckBox);
        teacherDetailImageView=findViewById(R.id.teacherDetailImageView);
    }
    private String getDateToday(){
        DateFormat dateFormat=new SimpleDateFormat("yyyy/MM/dd");
        Date date=new Date();
        String today= dateFormat.format(date);
        return today;
    }
    private String getRandomDestination(){
        String[] destinations={"VV Sephei","KY Cygni","Polaris","Betelgeuse","Aldebaran"};
        Random random=new Random();
        int index=random.nextInt(destinations.length-1);
        return destinations[index];
    }

    private void receiveAndShowData(){
        //RECEIVE DATA FROM ITEMS ACTIVITY VIA INTENT
        Intent i=this.getIntent();
        String name=i.getExtras().getString("NAME_KEY");
        String propellant=i.getExtras().getString("PROPELLANT_KEY");
        String destination=i.getExtras().getString("DESTINATION_KEY");
        String technologyExists=i.getExtras().getString("TECHNOLOGY_EXISTS_KEY");
        String imageURL=i.getExtras().getString("IMAGE_KEY");

        //SET RECEIVED DATA TO TEXTVIEWS AND IMAGEVIEWS
        nameDetailTextView.setText(name);
        propellantDetailTextView.setText(propellant);
        dateDetailTextView.setText(getDateToday());
        destinationDetailTextView.setText(destination);
        techExistsDetailCheckBox.setChecked(technologyExists.equalsIgnoreCase("YES"));
        techExistsDetailCheckBox.setEnabled(false);
        Picasso.get().load(imageURL).placeholder(R.drawable.placeholder).into(teacherDetailImageView);

    }
    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_detail);

        initializeWidgets();
        receiveAndShowData();
    }
}
```

#### Our Layouts

We have these layout files:

1. activity_main.xml
2. activity_detail.xml
3. model

##### (a). activity_main.xml

This is the layout for the main activity.

```xml
<?xml version="1.0" encoding="utf-8"?>
<LinearLayout

    android_layout_width="match_parent"
    android_layout_height="match_parent"

    android_orientation="vertical"
    tools_context=".MainActivity">

    <TextView
        android_id="@+id/headerTxt"
        android_layout_width="match_parent"
        android_layout_height="wrap_content"
        android_text="Retrofit MySQL ClientSide Search"
        android_padding="5dp"
        android_textAlignment="center"
        android_textStyle="bold"
        android_textAppearance="@style/TextAppearance.AppCompat.Large"
        android_textColor="@color/colorAccent" />

    <ProgressBar
        android_id="@+id/mProgressBar"
        style="?android:attr/progressBarStyleHorizontal"
        android_layout_width="match_parent"
        android_layout_height="wrap_content"
        android_indeterminate="true"
        android_indeterminateBehavior="cycle"
        android_visibility="gone" />

    <android.support.v7.widget.SearchView
        android_id="@+id/mSearchView"
        app_queryHint="Filter.."
        android_layout_width="match_parent"
        android_layout_height="wrap_content" />

    <ListView
        android_id="@+id/mListView"
        android_layout_weight="0.5"
        android_numColumns="auto_fit"
        android_layout_width="match_parent"
        android_layout_height="wrap_content" />
</LinearLayout>
```

##### (b). activity_detail.xml

This is the layout for the detail activity.

```xml
<?xml version="1.0" encoding="utf-8"?>
<RelativeLayout

    android_layout_width="match_parent"
    android_layout_height="match_parent"
    android_background="#009688"
    tools_context=".DetailsActivity"
    tools_showIn="@layout/activity_detail">

    <android.support.v7.widget.CardView
        android_layout_width="match_parent"
        android_layout_height="match_parent"
        android_layout_margin="3dp"
        card_view_cardCornerRadius="3dp"
        card_view_cardElevation="5dp">

        <ScrollView
            android_layout_width="match_parent"
            android_layout_height="match_parent">

            <LinearLayout
                android_layout_width="match_parent"
                android_layout_height="match_parent"
                android_orientation="vertical">

                <ImageView
                    android_id="@+id/teacherDetailImageView"
                    android_layout_width="match_parent"
                    android_layout_height="250dp"
                    android_layout_alignParentTop="true"
                    android_padding="5dp"
                    android_scaleType="fitXY"
                    android_src="@drawable/placeholder" />

                <LinearLayout
                    android_layout_width="match_parent"
                    android_layout_height="wrap_content"
                    android_orientation="vertical">

                    <LinearLayout
                        android_layout_width="match_parent"
                        android_layout_height="wrap_content"
                        android_orientation="horizontal">

                        <TextView
                            android_id="@+id/nameLabel"
                            android_layout_width="wrap_content"
                            android_layout_height="wrap_content"
                            android_maxLines="1"
                            android_padding="5dp"
                            android_text="NAME : "
                            android_textAppearance="?android:attr/textAppearanceLarge"
                            android_textStyle="bold" />

                        <TextView
                            android_id="@+id/nameDetailTextView"
                            android_layout_width="wrap_content"
                            android_layout_height="wrap_content"
                            android_maxLines="1"
                            android_padding="5dp"
                            android_text="Voyager"
                            android_textAppearance="?android:attr/textAppearanceLarge"/>
                    </LinearLayout>

                    <LinearLayout
                        android_layout_width="match_parent"
                        android_layout_height="wrap_content"
                        android_orientation="horizontal">

                        <TextView
                            android_id="@+id/dateLabel"
                            android_layout_width="wrap_content"
                            android_layout_height="wrap_content"
                            android_maxLines="1"
                            android_padding="5dp"
                            android_text="DATE : "
                            android_textAppearance="?android:attr/textAppearanceLarge"
                            android_textStyle="bold" />

                        <TextView
                            android_id="@+id/dateDetailTextView"
                            android_layout_width="wrap_content"
                            android_layout_height="wrap_content"
                            android_maxLines="1"
                            android_padding="5dp"
                            android_text="Today"
                            android_textAppearance="?android:attr/textAppearanceLarge"/>
                    </LinearLayout>

                    <LinearLayout
                        android_layout_width="match_parent"
                        android_layout_height="wrap_content"
                        android_orientation="horizontal">

                        <TextView
                            android_id="@+id/destinationLabel"
                            android_layout_width="wrap_content"
                            android_layout_height="wrap_content"
                            android_maxLines="1"
                            android_padding="5dp"
                            android_text="DESTINATION : "
                            android_textAppearance="?android:attr/textAppearanceLarge"
                            android_textStyle="bold" />

                        <TextView
                            android_id="@+id/destinationDetailTextView"
                            android_layout_width="wrap_content"
                            android_layout_height="wrap_content"
                            android_maxLines="1"
                            android_padding="5dp"
                            android_text="KY Cygni"
                            android_textAppearance="?android:attr/textAppearanceLarge"/>
                    </LinearLayout>
                    <LinearLayout
                        android_layout_width="match_parent"
                        android_layout_height="wrap_content"
                        android_orientation="horizontal">

                        <TextView
                            android_id="@+id/propellantLabel"
                            android_layout_width="wrap_content"
                            android_layout_height="wrap_content"
                            android_maxLines="1"
                            android_padding="5dp"
                            android_text="PROPELLANT : "
                            android_textAppearance="?android:attr/textAppearanceLarge"
                            android_textStyle="bold" />

                        <TextView
                            android_id="@+id/propellantDetailTextView"
                            android_layout_width="wrap_content"
                            android_layout_height="wrap_content"
                            android_maxLines="1"
                            android_padding="5dp"
                            android_text="Chemical"
                            android_textAppearance="?android:attr/textAppearanceLarge"/>
                    </LinearLayout>

                    <LinearLayout
                        android_layout_width="match_parent"
                        android_layout_height="wrap_content"
                        android_orientation="horizontal">

                        <TextView
                            android_id="@+id/techExistsLabel"
                            android_layout_width="wrap_content"
                            android_layout_height="wrap_content"
                            android_maxLines="1"
                            android_padding="5dp"
                            android_text="TECH EXISTS? : "
                            android_textAppearance="?android:attr/textAppearanceLarge"
                            android_textStyle="bold" />

                        <CheckBox
                            android_id="@+id/techExistsDetailCheckBox"
                            android_layout_width="wrap_content"
                            android_layout_height="wrap_content"
                            android_padding="5dp"/>
                    </LinearLayout>

                </LinearLayout>
            </LinearLayout>
        </ScrollView>
    </android.support.v7.widget.CardView>
</RelativeLayout>
```

##### (b). model.xml

Our row model layout.

```xml
<?xml version="1.0" encoding="utf-8"?>
<android.support.v7.widget.CardView
    android_orientation="horizontal" android_layout_width="match_parent"

    android_layout_margin="5dp"
    card_view_cardCornerRadius="10dp"
    card_view_cardElevation="5dp"
    android_layout_height="match_parent">

    <RelativeLayout
        android_layout_width="match_parent"
        android_layout_height="match_parent">
        <ImageView
            android_layout_width="150dp"
            android_layout_height="150dp"
            android_id="@+id/spacecraftImageView"
            android_padding="5dp"
            android_scaleType="fitXY"
            android_src="@drawable/placeholder" />

        <TextView
            android_layout_width="wrap_content"
            android_layout_height="wrap_content"
            android_textAppearance="?android:attr/textAppearanceLarge"
            android_text="Spacecraft Name"
            android_id="@+id/nameTextView"
            android_padding="5dp"
            android_textColor="@color/colorAccent"
            android_layout_alignParentTop="true"
            android_layout_toRightOf="@+id/spacecraftImageView" />

        <TextView
            android_layout_width="wrap_content"
            android_layout_height="wrap_content"
            android_textAppearance="?android:attr/textAppearanceMedium"
            android_text="Propellant"
            android_textStyle="italic"
            android_id="@+id/propellantTextView"
            android_padding="5dp"
            android_layout_alignBottom="@+id/spacecraftImageView"
            android_layout_toRightOf="@+id/spacecraftImageView" />
        <CheckBox
            android_layout_width="wrap_content"
            android_layout_height="wrap_content"
            android_id="@+id/myCheckBox"
            android_text="Tech Exists?"
            android_layout_alignParentRight="true" />

    </RelativeLayout>
</android.support.v7.widget.CardView>
```

##### Download

Register as a member to download code. I will support members as soon as possible when they encounter problems. If you are already registered, just login to download code from any lesson.

[Direct Download](https://github.com/Oclemy/RetrofitClientSideSearch/archive/master.zip)

## Example 2: Android Retrofit MySQL ServerSide Multi-Column Search/Filter ListView

_Android Retrofit MySQL Serverside Multi-Column Search/Filter ListView Tutorial_

In this class we see how to perform a multi-column search filter against mysql database from our android app. We use Java to write our app and [Retrofit](https://camposha.info/android/retrofit) as our HTTP Client. Furthermore we use [ListView](https://camposha.info/android/listview) as our AdapterView. MySQL is our database while PHP is our serverside programming language.

##### Demo

Here's the demo of the application:

![Android Retrofit ServerSide Search Filter](https://camposha.info/wp-content/uploads/2019/04/demo1-22.gif)

Android Retrofit ServerSide Search Filter

##### Video Tutorial

We have a fast growing [ProgrammingWizards TV YouTube Channel](http://www.youtube.com/c/programmingwizards) with tutorials like this. Here is this tutorial in video format:

#### 1\. PHP

First we need to write PHP code that will:

1. Connect to mysql database using `mysqli` class.
2. Perform a multi-column search against mysql using SQL statements.
3. Return results to a PHP array.
4. JSON-encode that array and print it to the caller.

We use Object Oriented paradigm to code our PHP. We have only one file:

**index.php**

```php
<?php

class Constants
{
    //DATABASE DETAILS
    static $DB_SERVER="localhost";
    static $DB_NAME="spacecraftsDB";
    static $USERNAME="root";
    static $PASSWORD="";

    //STATEMENTS
    static $SQL_SELECT_ALL="SELECT * FROM spacecraftsTB";
}

class Spacecrafts
{
    /*******************************************************************************************************************************************/
    /*
       1.CONNECT TO DATABASE.
       1. RETURN CONNECTION OBJECT
    */
    public function connect()
    {
        $con=new mysqli(Constants::$DB_SERVER,Constants::$USERNAME,Constants::$PASSWORD,Constants::$DB_NAME);
        if($con->connect_error)
        {
            return null;
        }else
        {
            return $con;
        }
    }
    /*******************************************************************************************************************************************/
    /*
       1.SELECT FROM DATABASE.
    */
    public function search($query)
    {

        $sql="SELECT * FROM spacecraftsTB WHERE name LIKE '%$query%' OR propellant LIKE '%$query%' OR destination LIKE '%$query%' ";
         //$sql="SELECT * FROM spacecraftsTB WHERE name LIKE '%$query%' ";

        $con=$this->connect();
        if($con != null)
        {
            $result=$con->query($sql);
            if($result->num_rows > 0)
            {
                $spacecrafts=array();
                while($row=$result->fetch_array())
                {
                    array_push($spacecrafts, array("id"=>$row['id'],"name"=>$row['name'],"propellant"=>$row['propellant'],"destination"=>$row['destination'],"image_url"=>$row['image_url'],"technology_exists"=>$row['technology_exists']));
                }
                print(json_encode(array_reverse($spacecrafts)));
            }else
            {
                print(json_encode(array("No item Found that matches the query: ".$query)));
            }
            $con->close();

        }else{
            print(json_encode(array("PHP EXCEPTION : CAN'T CONNECT TO MYSQL. NULL CONNECTION.")));
        }
    }
    public function handleRequest() {
        if($_SERVER['REQUEST_METHOD'] == 'POST'){
            $query=$_POST['query'];
            $this->search($query);
        } else{
            $this->search("");
        }

    }
}
$spacecrafts=new Spacecrafts();
$spacecrafts->handleRequest();
//end
```

#### Setup

We are interested in setting up in two files:

1. build.gradle(app) - We add our dependencies here.
2. AndroidManifest.xml - We add internet connectivity permission here.

##### (a). build.gradle

Let's go over to dependencies closure and add dependencies

```groovy
dependencies {
    implementation fileTree(dir: 'libs', include: ['*.jar'])
    testImplementation 'junit:junit:4.12'
    implementation 'com.android.support:appcompat-v7:28.0.0'
    implementation 'com.android.support.constraint:constraint-layout:1.0.2'
    implementation "com.android.support:cardview-v7:28.0.0"
    implementation 'com.squareup.retrofit2:retrofit:2.4.0'
    implementation 'com.squareup.retrofit2:converter-gson:2.4.0'
    implementation 'com.squareup.picasso:picasso:2.71828'
}
```

##### (b). AndroidManifest.xml

Add internet connectivity permission here. Also register our `DetailsActivity`.

```xml
 <uses-permission android_name="android.permission.INTERNET"/>

    <application>
        <activity android_name=".MainActivity">
           ..
        </activity>
        <activity android_name=".DetailsActivity" android_parentActivityName=".MainActivity"/>
    </application>
```

#### Our Classes

We have only two files:

1. MainActivity.java
2. DetailsActivity.java

##### (a). MainActivity.java

Our main activity.

```java
package info.camposha.retrofitserversidesearch;

import android.content.Context;
import android.content.Intent;
import android.os.Bundle;
import android.support.v7.app.AppCompatActivity;
import android.support.v7.widget.SearchView;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.BaseAdapter;
import android.widget.CheckBox;
import android.widget.Filter;
import android.widget.Filterable;
import android.widget.ImageView;
import android.widget.ListView;
import android.widget.ProgressBar;
import android.widget.TextView;
import android.widget.Toast;

import com.google.gson.annotations.SerializedName;
import com.squareup.picasso.Picasso;

import java.util.ArrayList;
import java.util.List;

import retrofit2.Call;
import retrofit2.Callback;
import retrofit2.Response;
import retrofit2.Retrofit;
import retrofit2.converter.gson.GsonConverterFactory;
import retrofit2.http.Body;
import retrofit2.http.Field;
import retrofit2.http.GET;
import retrofit2.http.POST;
import retrofit2.http.FormUrlEncoded;

public class MainActivity extends AppCompatActivity {
    //private static final String BASE_URL = "http://10.0.2.2"; or "http://10.0.3.2" or your computers ip address
    private static final String BASE_URL = "http://192.168.12.2";//replace this wih the ip address for your computer
    private static final String FULL_URL = BASE_URL+"/PHP/spaceship/";
    class Spacecraft {
        @SerializedName("id")
        private int id;
        @SerializedName("name")
        private String name;
        @SerializedName("propellant")
        private String propellant;
        @SerializedName("destination")
        private String destination;
        @SerializedName("image_url")
        private String imageURL;
        @SerializedName("technology_exists")
        private int technologyExists;

        public Spacecraft(String name){
            this.name=name;
        }
        public Spacecraft(int id, String name, String propellant,String destination, String imageURL, int technologyExists) {
            this.id = id;
            this.name = name;
            this.propellant = propellant;
            this.destination=destination;
            this.imageURL = imageURL;
            this.technologyExists = technologyExists;
        }

        /*
         *GETTERS AND SETTERS
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
        public String getPropellant() {
            return propellant;
        }
        public String getDestination() {
            return destination;
        }
        public String getImageURL() {
            return imageURL;
        }
        public int getTechnologyExists() {
            return technologyExists;
        }
        @Override
        public String toString() {
            return name;
        }
    }

    interface MyAPIService {

        @GET("/PHP/spaceship")
        Call<List<Spacecraft>> getSpacecrafts();
        @FormUrlEncoded
        @POST("/PHP/spaceship/index.php")
        Call<List<Spacecraft>> searchSpacecraft(@Field("query") String query);
    }

    static class RetrofitClientInstance {
        private static Retrofit retrofit;

        public static Retrofit getRetrofitInstance() {
            if (retrofit == null) {
                retrofit = new Retrofit.Builder()
                        .baseUrl(BASE_URL)
                        .addConverterFactory(GsonConverterFactory.create())
                        .build();
            }
            return retrofit;
        }
    }
    class ListViewAdapter extends BaseAdapter {

        private List<Spacecraft> spacecrafts;
        private Context context;

        public ListViewAdapter(Context context, List<Spacecraft> spacecrafts) {
            this.context = context;
            this.spacecrafts = spacecrafts;
        }

        @Override
        public int getCount() {
            return spacecrafts.size();
        }

        @Override
        public Object getItem(int pos) {
            return spacecrafts.get(pos);
        }

        @Override
        public long getItemId(int pos) {
            return pos;
        }

        @Override
        public View getView(int position, View view, ViewGroup viewGroup) {
            if (view == null) {
                view = LayoutInflater.from(context).inflate(R.layout.model, viewGroup, false);
            }

            TextView nameTxt = view.findViewById(R.id.nameTextView);
            TextView txtPropellant = view.findViewById(R.id.propellantTextView);
            CheckBox chkTechExists = view.findViewById(R.id.myCheckBox);
            ImageView spacecraftImageView = view.findViewById(R.id.spacecraftImageView);

            final Spacecraft thisSpacecraft = spacecrafts.get(position);

            nameTxt.setText(thisSpacecraft.getName());
            txtPropellant.setText(thisSpacecraft.getPropellant());
            chkTechExists.setChecked(thisSpacecraft.getTechnologyExists() == 1);
            chkTechExists.setEnabled(false);

            if (thisSpacecraft.getImageURL() != null && thisSpacecraft.getImageURL().length() > 0) {
                Picasso.get().load(FULL_URL + "/images/" + thisSpacecraft.getImageURL()).placeholder(R.drawable.placeholder).into(spacecraftImageView);
            } else {
                Toast.makeText(context, "Empty Image URL", Toast.LENGTH_LONG).show();
                Picasso.get().load(R.drawable.placeholder).into(spacecraftImageView);
            }

            view.setOnClickListener(new View.OnClickListener() {
                @Override
                public void onClick(View view) {
                    Toast.makeText(context, thisSpacecraft.getName(), Toast.LENGTH_SHORT).show();
                    String techExists = "";
                    if (thisSpacecraft.getTechnologyExists() == 1) {
                        techExists = "YES";
                    } else {
                        techExists = "NO";
                    }
                    String[] spacecrafts = {
                            thisSpacecraft.getName(),
                            thisSpacecraft.getPropellant(),
                            thisSpacecraft.getDestination(),
                            techExists,
                            FULL_URL + "/images/" + thisSpacecraft.getImageURL()
                    };
                    openDetailActivity(spacecrafts);
                }
            });

            return view;
        }

        private void openDetailActivity(String[] data) {
            Intent intent = new Intent(MainActivity.this, DetailsActivity.class);
            intent.putExtra("NAME_KEY", data[0]);
            intent.putExtra("PROPELLANT_KEY", data[1]);
            intent.putExtra("DESTINATION_KEY", data[2]);
            intent.putExtra("TECHNOLOGY_EXISTS_KEY", data[3]);
            intent.putExtra("IMAGE_KEY", data[4]);
            startActivity(intent);
        }
    }
    private ListViewAdapter adapter;
    private ListView mListView;
    private ProgressBar mProgressBar;
    private SearchView mSearchView;

    private void initializeWidgets(){
        mListView = findViewById(R.id.mListView);
        mProgressBar= findViewById(R.id.mProgressBar);
        mProgressBar.setIndeterminate(true);
        mProgressBar.setVisibility(View.VISIBLE);
        mSearchView=findViewById(R.id.mSearchView);
        mSearchView.setIconified(true);
    }

    private void populateListView(List<Spacecraft> spacecraftList) {
        adapter = new ListViewAdapter(this,spacecraftList);
        mListView.setAdapter(adapter);
    }

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);

        this.initializeWidgets();

        /*Create handle for the RetrofitInstance interface*/
        final MyAPIService myAPIService = RetrofitClientInstance.getRetrofitInstance().create(MyAPIService.class);

        //Call<List<Spacecraft>> call = myAPIService.getSpacecrafts();
        final Call<List<Spacecraft>> call = myAPIService.searchSpacecraft("");
        call.enqueue(new Callback<List<Spacecraft>>() {

            @Override
            public void onResponse(Call<List<Spacecraft>> call, Response<List<Spacecraft>> response) {
                mProgressBar.setVisibility(View.GONE);
                populateListView(response.body());
            }
            @Override
            public void onFailure(Call<List<Spacecraft>> call, Throwable throwable) {
                mProgressBar.setVisibility(View.GONE);
                Toast.makeText(MainActivity.this, throwable.getMessage(), Toast.LENGTH_LONG).show();
            }
        });

        mSearchView.setOnQueryTextListener(new SearchView.OnQueryTextListener() {
            @Override
            public boolean onQueryTextSubmit(String query) {
                return false;
            }
            @Override
            public boolean onQueryTextChange(String query) {
                final Call<List<Spacecraft>> call = myAPIService.searchSpacecraft(query);
                call.enqueue(new Callback<List<Spacecraft>>() {

                    @Override
                    public void onResponse(Call<List<Spacecraft>> call, Response<List<Spacecraft>> response) {
                        mProgressBar.setVisibility(View.GONE);
                        populateListView(response.body());
                    }
                    @Override
                    public void onFailure(Call<List<Spacecraft>> call, Throwable throwable) {
                        populateListView(new ArrayList<Spacecraft>());
                        mProgressBar.setVisibility(View.GONE);
                        Toast.makeText(MainActivity.this, "ERROR: "+throwable.getMessage(), Toast.LENGTH_LONG).show();
                    }
                });
                return false;
            }
        });
    }
}
//end
```

##### (b). DetailsActivity.java

Our details activity.

```java
package info.camposha.retrofitserversidesearch;

import android.content.Intent;
import android.os.Bundle;
import android.support.v7.app.AppCompatActivity;
import android.widget.CheckBox;
import android.widget.ImageView;
import android.widget.TextView;

import com.squareup.picasso.Picasso;

import java.text.DateFormat;
import java.text.SimpleDateFormat;
import java.util.Date;

public class DetailsActivity extends AppCompatActivity {

    TextView nameDetailTextView,propellantDetailTextView,dateDetailTextView,destinationDetailTextView;
    CheckBox techExistsDetailCheckBox;
    ImageView teacherDetailImageView;

    private void initializeWidgets(){
        nameDetailTextView= findViewById(R.id.nameDetailTextView);
        propellantDetailTextView= findViewById(R.id.propellantDetailTextView);
        dateDetailTextView= findViewById(R.id.dateDetailTextView);
        destinationDetailTextView=findViewById(R.id.destinationDetailTextView);
        techExistsDetailCheckBox= findViewById(R.id.techExistsDetailCheckBox);
        teacherDetailImageView=findViewById(R.id.teacherDetailImageView);
    }
    private String getDateToday(){
        DateFormat dateFormat=new SimpleDateFormat("yyyy/MM/dd");
        Date date=new Date();
        String today= dateFormat.format(date);
        return today;
    }
    private void receiveAndShowData(){
        //RECEIVE DATA FROM ITEMS ACTIVITY VIA INTENT
        Intent i=this.getIntent();
        String name=i.getExtras().getString("NAME_KEY");
        String propellant=i.getExtras().getString("PROPELLANT_KEY");
        String destination=i.getExtras().getString("DESTINATION_KEY");
        String technologyExists=i.getExtras().getString("TECHNOLOGY_EXISTS_KEY");
        String imageURL=i.getExtras().getString("IMAGE_KEY");

        //SET RECEIVED DATA TO TEXTVIEWS AND IMAGEVIEWS
        nameDetailTextView.setText(name);
        propellantDetailTextView.setText(propellant);
        dateDetailTextView.setText(getDateToday());
        destinationDetailTextView.setText(destination);
        techExistsDetailCheckBox.setChecked(technologyExists.equalsIgnoreCase("YES"));
        techExistsDetailCheckBox.setEnabled(false);
        Picasso.get().load(imageURL).placeholder(R.drawable.placeholder).into(teacherDetailImageView);

    }
    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_detail);

        initializeWidgets();
        receiveAndShowData();
    }
}
```

#### Our Layouts

We have these layout files:

1. activity_main.xml
2. activity_detail.xml
3. model

##### (a). activity_main.xml

This is the layout for the main activity.

```xml
<?xml version="1.0" encoding="utf-8"?>
<LinearLayout

    android_layout_width="match_parent"
    android_layout_height="match_parent"

    android_orientation="vertical"
    tools_context=".MainActivity">

    <TextView
        android_id="@+id/headerTxt"
        android_layout_width="match_parent"
        android_layout_height="wrap_content"
        android_text="Retrofit MySQL Serverside Search"
        android_padding="5dp"
        android_textAlignment="center"
        android_textStyle="bold"
        android_textAppearance="@style/TextAppearance.AppCompat.Large"
        android_textColor="@color/colorAccent" />

    <ProgressBar
        android_id="@+id/mProgressBar"
        style="?android:attr/progressBarStyleHorizontal"
        android_layout_width="match_parent"
        android_layout_height="wrap_content"
        android_indeterminate="true"
        android_indeterminateBehavior="cycle"
        android_visibility="gone" />

    <android.support.v7.widget.SearchView
        android_id="@+id/mSearchView"
        app_queryHint="Search.."
        android_layout_width="match_parent"
        android_layout_height="wrap_content" />

    <ListView
        android_id="@+id/mListView"
        android_layout_weight="0.5"
        android_numColumns="auto_fit"
        android_layout_width="match_parent"
        android_layout_height="wrap_content" />
</LinearLayout>
```

##### (b). activity_detail.xml

This is the layout for the detail activity.

```xml
<?xml version="1.0" encoding="utf-8"?>
<RelativeLayout

    android_layout_width="match_parent"
    android_layout_height="match_parent"
    android_background="#009688"
    tools_context=".DetailsActivity"
    tools_showIn="@layout/activity_detail">

    <android.support.v7.widget.CardView
        android_layout_width="match_parent"
        android_layout_height="match_parent"
        android_layout_margin="3dp"
        card_view_cardCornerRadius="3dp"
        card_view_cardElevation="5dp">

        <ScrollView
            android_layout_width="match_parent"
            android_layout_height="match_parent">

            <LinearLayout
                android_layout_width="match_parent"
                android_layout_height="match_parent"
                android_orientation="vertical">

                <ImageView
                    android_id="@+id/teacherDetailImageView"
                    android_layout_width="match_parent"
                    android_layout_height="250dp"
                    android_layout_alignParentTop="true"
                    android_padding="5dp"
                    android_scaleType="fitXY"
                    android_src="@drawable/placeholder" />

                <LinearLayout
                    android_layout_width="match_parent"
                    android_layout_height="wrap_content"
                    android_orientation="vertical">

                    <LinearLayout
                        android_layout_width="match_parent"
                        android_layout_height="wrap_content"
                        android_orientation="horizontal">

                        <TextView
                            android_id="@+id/nameLabel"
                            android_layout_width="wrap_content"
                            android_layout_height="wrap_content"
                            android_maxLines="1"
                            android_padding="5dp"
                            android_text="NAME : "
                            android_textAppearance="?android:attr/textAppearanceLarge"
                            android_textStyle="bold" />

                        <TextView
                            android_id="@+id/nameDetailTextView"
                            android_layout_width="wrap_content"
                            android_layout_height="wrap_content"
                            android_maxLines="1"
                            android_padding="5dp"
                            android_text="Voyager"
                            android_textAppearance="?android:attr/textAppearanceLarge"/>
                    </LinearLayout>

                    <LinearLayout
                        android_layout_width="match_parent"
                        android_layout_height="wrap_content"
                        android_orientation="horizontal">

                        <TextView
                            android_id="@+id/dateLabel"
                            android_layout_width="wrap_content"
                            android_layout_height="wrap_content"
                            android_maxLines="1"
                            android_padding="5dp"
                            android_text="DATE : "
                            android_textAppearance="?android:attr/textAppearanceLarge"
                            android_textStyle="bold" />

                        <TextView
                            android_id="@+id/dateDetailTextView"
                            android_layout_width="wrap_content"
                            android_layout_height="wrap_content"
                            android_maxLines="1"
                            android_padding="5dp"
                            android_text="Today"
                            android_textAppearance="?android:attr/textAppearanceLarge"/>
                    </LinearLayout>

                    <LinearLayout
                        android_layout_width="match_parent"
                        android_layout_height="wrap_content"
                        android_orientation="horizontal">

                        <TextView
                            android_id="@+id/destinationLabel"
                            android_layout_width="wrap_content"
                            android_layout_height="wrap_content"
                            android_maxLines="1"
                            android_padding="5dp"
                            android_text="DESTINATION : "
                            android_textAppearance="?android:attr/textAppearanceLarge"
                            android_textStyle="bold" />

                        <TextView
                            android_id="@+id/destinationDetailTextView"
                            android_layout_width="wrap_content"
                            android_layout_height="wrap_content"
                            android_maxLines="1"
                            android_padding="5dp"
                            android_text="KY Cygni"
                            android_textAppearance="?android:attr/textAppearanceLarge"/>
                    </LinearLayout>
                    <LinearLayout
                        android_layout_width="match_parent"
                        android_layout_height="wrap_content"
                        android_orientation="horizontal">

                        <TextView
                            android_id="@+id/propellantLabel"
                            android_layout_width="wrap_content"
                            android_layout_height="wrap_content"
                            android_maxLines="1"
                            android_padding="5dp"
                            android_text="PROPELLANT : "
                            android_textAppearance="?android:attr/textAppearanceLarge"
                            android_textStyle="bold" />

                        <TextView
                            android_id="@+id/propellantDetailTextView"
                            android_layout_width="wrap_content"
                            android_layout_height="wrap_content"
                            android_maxLines="1"
                            android_padding="5dp"
                            android_text="Chemical"
                            android_textAppearance="?android:attr/textAppearanceLarge"/>
                    </LinearLayout>

                    <LinearLayout
                        android_layout_width="match_parent"
                        android_layout_height="wrap_content"
                        android_orientation="horizontal">

                        <TextView
                            android_id="@+id/techExistsLabel"
                            android_layout_width="wrap_content"
                            android_layout_height="wrap_content"
                            android_maxLines="1"
                            android_padding="5dp"
                            android_text="TECH EXISTS? : "
                            android_textAppearance="?android:attr/textAppearanceLarge"
                            android_textStyle="bold" />

                        <CheckBox
                            android_id="@+id/techExistsDetailCheckBox"
                            android_layout_width="wrap_content"
                            android_layout_height="wrap_content"
                            android_padding="5dp"/>
                    </LinearLayout>

                </LinearLayout>
            </LinearLayout>
        </ScrollView>
    </android.support.v7.widget.CardView>
</RelativeLayout>
```

##### (b). model.xml

Our row model layout.

```xml
<?xml version="1.0" encoding="utf-8"?>
<android.support.v7.widget.CardView
    android_orientation="horizontal" android_layout_width="match_parent"

    android_layout_margin="5dp"
    card_view_cardCornerRadius="10dp"
    card_view_cardElevation="5dp"
    android_layout_height="match_parent">

    <RelativeLayout
        android_layout_width="match_parent"
        android_layout_height="match_parent">
        <ImageView
            android_layout_width="150dp"
            android_layout_height="150dp"
            android_id="@+id/spacecraftImageView"
            android_padding="5dp"
            android_scaleType="fitXY"
            android_src="@drawable/placeholder" />

        <TextView
            android_layout_width="wrap_content"
            android_layout_height="wrap_content"
            android_textAppearance="?android:attr/textAppearanceLarge"
            android_text="Spacecraft Name"
            android_id="@+id/nameTextView"
            android_padding="5dp"
            android_textColor="@color/colorAccent"
            android_layout_alignParentTop="true"
            android_layout_toRightOf="@+id/spacecraftImageView" />

        <TextView
            android_layout_width="wrap_content"
            android_layout_height="wrap_content"
            android_textAppearance="?android:attr/textAppearanceMedium"
            android_text="Propellant"
            android_textStyle="italic"
            android_id="@+id/propellantTextView"
            android_padding="5dp"
            android_layout_alignBottom="@+id/spacecraftImageView"
            android_layout_toRightOf="@+id/spacecraftImageView" />
        <CheckBox
            android_layout_width="wrap_content"
            android_layout_height="wrap_content"
            android_id="@+id/myCheckBox"
            android_text="Tech Exists?"
            android_layout_alignParentRight="true" />

    </RelativeLayout>
</android.support.v7.widget.CardView>
```

##### Download

Download code [here]()

## Example 3: Android Retrofit MySQL Filter Based On Categories with RadioButtons

_Android Retrofit MySQL Serverside Filter Based on Categories via RadioButtons_

How to filter mysql data via categories with radiobuttons. We use Retrofit and ListView.

##### Demo

Here's the demo of the application:

![Android Retrofit MySQL RadioButtons Search Filter](https://camposha.info/wp-content/uploads/2019/04/demo1-23.gif)

Android Retrofit MySQL RadioButtons Search Filter

##### Video Tutorial

We have a fast growing [ProgrammingWizards TV YouTube Channel](http://www.youtube.com/c/programmingwizards) with tutorials like this. Here is this tutorial in video format:

#### 1\. PHP

First we need to write PHP code that will:

1. Connect to mysql database using `mysqli` class.
2. Perform a multi-column search against mysql using SQL statements.
3. Return results to a PHP array.
4. JSON-encode that array and print it to the caller.

We use Object Oriented paradigm to code our PHP. We have only one file:

**index.php**

```php
<?php

/**
 * I will work with PHP in Obect Oriented manner which is more familiar to
 * my subscribers who are java/c#/dart/python people.
 * We start by creating a Constants class to hold our database constants
 */
class Constants
{
    //DATABASE DETAILS
    static $DB_SERVER="localhost";
    static $DB_NAME="spacecraftsDB";
    static $USERNAME="root";
    static $PASSWORD="";

    //STATEMENTS
    static $SQL_SELECT_ALL="SELECT * FROM spacecraftsTB";
}

class Spacecrafts
{
    /*Let's create a connect method, It has the following roles:
       1.CONNECT TO DATABASE.
       2. RETURN CONNECTION OBJECT
    */
    public function connect()
    {
        //mysqli is a class that Represents a connection between PHP and a MySQL database.
        $con=new mysqli(Constants::$DB_SERVER,Constants::$USERNAME,Constants::$PASSWORD,
        Constants::$DB_NAME);
        if($con->connect_error)
        {
            return null;
        }else
        {
            return $con;
        }
    }
    /*
    Let's create a seach method. It will
       1.SELECT FROM DATABASE based on a category
    */
    public function search($query)
    {
        //Am filtering using multiple columns
        $sql="SELECT * FROM spacecraftsTB WHERE name LIKE '%$query%' OR
        propellant LIKE '%$query%' OR destination LIKE '%$query%' ";

        //To fileter using a single column:
         //$sql="SELECT * FROM spacecraftsTB WHERE name LIKE '%$query%' ";

        $con=$this->connect();
        if($con != null)
        {
            $result=$con->query($sql);
            if($result->num_rows > 0)
            {
                $spacecrafts=array();
                while($row=$result->fetch_array())
                {
                    //array_push Pushes one or more elements onto the end of array
                    array_push($spacecrafts, array("id"=>$row['id'],"name"=>$row['name'],
                    "propellant"=>$row['propellant'],"destination"=>$row['destination'],
                    "image_url"=>$row['image_url'],"technology_exists"=>$row['technology_exists']));
                }
                //json_encode Returns the JSON representation of a value
                print(json_encode(array_reverse($spacecrafts)));
            }else
            {
                print(json_encode(array("No item Found that matches the query: ".$query)));
            }
            $con->close();

        }else{
            print(json_encode(array("PHP EXCEPTION : CAN'T CONNECT TO MYSQL. NULL CONNECTION.")));
        }
    }
    /**
     * Let's create a method to handle incoming requests
     */
    public function handleRequest() {
        if($_SERVER['REQUEST_METHOD'] == 'POST'){
            //get category
            $query=$_POST['query'];
            //return data based on that category
            $this->search($query);
        } else{
            //return all categories
            $this->search("");
        }

    }
}
$spacecrafts=new Spacecrafts();
$spacecrafts->handleRequest();
//end
```

#### Setup

We are interested in setting up in two files:

1. build.gradle(app) - We add our dependencies here.
2. AndroidManifest.xml - We add internet connectivity permission here.

##### (a). build.gradle

Let's go over to dependencies closure and add dependencies

```groovy
dependencies {
    implementation fileTree(dir: 'libs', include: ['*.jar'])
    testImplementation 'junit:junit:4.12'
    implementation 'com.android.support:appcompat-v7:28.0.0'
    implementation 'com.android.support.constraint:constraint-layout:1.0.2'
    implementation "com.android.support:cardview-v7:28.0.0"
    implementation 'com.squareup.retrofit2:retrofit:2.4.0'
    implementation 'com.squareup.retrofit2:converter-gson:2.4.0'
    implementation 'com.squareup.picasso:picasso:2.71828'
}
```

##### (b). AndroidManifest.xml

Add internet connectivity permission here. Also register our `DetailsActivity`.

```xml
 <uses-permission android_name="android.permission.INTERNET"/>

    <application>
        <activity android_name=".MainActivity">
           ..
        </activity>
        <activity android_name=".DetailsActivity" android_parentActivityName=".MainActivity"/>
    </application>
```

#### Our Classes

We have only two files:

1. MainActivity.java
2. DetailsActivity.java

##### (a). MainActivity.java

Our main activity.

```java
package info.camposha.retrofitmysqlradiobuttonsfilter;

import android.content.Context;
import android.content.Intent;
import android.os.Bundle;
import android.support.v7.app.AppCompatActivity;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.BaseAdapter;
import android.widget.CheckBox;
import android.widget.ImageView;
import android.widget.ListView;
import android.widget.ProgressBar;
import android.widget.RadioButton;
import android.widget.RadioGroup;
import android.widget.TextView;
import android.widget.Toast;

import com.google.gson.annotations.SerializedName;
import com.squareup.picasso.Picasso;

import java.util.ArrayList;
import java.util.List;

import retrofit2.Call;
import retrofit2.Callback;
import retrofit2.Response;
import retrofit2.Retrofit;
import retrofit2.converter.gson.GsonConverterFactory;
import retrofit2.http.Field;
import retrofit2.http.FormUrlEncoded;
import retrofit2.http.GET;
import retrofit2.http.POST;

public class MainActivity extends AppCompatActivity {

/**
   * STEP 1. PREPARATION OF URLS
   * I will use my ip address as my base url. This is because am using
    emulator as my testing device. You can obtain yours via cmd.
   */
  private static final String BASE_URL = "http://192.168.12.2";//This is my ip address.
  // "http://10.0.2.2"; or "http://10.0.3.2"; can also be used in some emulators.
  private static final String FULL_URL = BASE_URL + "/PHP/spaceship/";

  /**
   * STEP 2. PREPARATION OF DATA OBJECT
   * The serialized names must correspond to your json keys.
   */
  class Spacecraft {
    @SerializedName("id")
    private int id;
    @SerializedName("name")
    private String name;
    @SerializedName("propellant")
    private String propellant;
    @SerializedName("destination")
    private String destination;
    @SerializedName("image_url")
    private String imageURL;
    @SerializedName("technology_exists")
    private int technologyExists;

//FIRST constructor
 public Spacecraft(String name) {
  this.name = name;
 }

 //SECOND CONSTRUCTOR. This is the one we will mainly use
 public Spacecraft(int id, String name, String propellant, String destination,
 String imageURL,
    int technologyExists) {
  this.id = id;
  this.name = name;
  this.propellant = propellant;
  this.destination = destination;
  this.imageURL = imageURL;
  this.technologyExists = technologyExists;
 }

    /*
     * I WILL GENERATE GETTERS AND SETTERS
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

    public String getPropellant() {
      return propellant;
    }

    public String getDestination() {
      return destination;
    }

    public String getImageURL() {
      return imageURL;
    }

    public int getTechnologyExists() {
      return technologyExists;
    }

    @Override
    public String toString() {
      return name;
    }
  }

  /**
   * PREPARATION OF HTTP CLIENT INTERFACE
   * This will contain methods to be mapped to our api.
   * We make a HTTP GET and POST requests.
   */
  interface MyAPIService {

    //HTTP GET request to retrieve all spaceship
    @GET("/PHP/spaceship")
    Call<List<Spacecraft>> getSpacecrafts();

    //HTTP POST request to search our php mysql server
    @FormUrlEncoded
    @POST("/PHP/spaceship/index.php")
    Call<List<Spacecraft>> searchSpacecraft(@Field("query") String query);
  }

  /**
   *Our factory class.
   RESPONSIBILITY: Generate a Retrofit instance we can re-use easily.
   */
  static class RetrofitClientInstance {
    private static Retrofit retrofit;

    public static Retrofit getRetrofitInstance() {
      if (retrofit == null) {
        retrofit = new Retrofit.Builder().baseUrl(BASE_URL).addConverterFactory(
          GsonConverterFactory.create()).build();
      }
      return retrofit;
    }
  }

  /**
   *Our ListView adapter class.
   RESPONSIBILITY: Inflate our custom layouts into view items then adapt data to them
   */
  class ListViewAdapter extends BaseAdapter {

    private List<Spacecraft> spacecrafts;
    private Context context;

    //Let's receive a context and list of spacecrafts
    public ListViewAdapter(Context context, List<Spacecraft> spacecrafts) {
      this.context = context;
      this.spacecrafts = spacecrafts;
    }

    //I will implement abstract methods defined in the BaseAdapter class
    @Override
    public int getCount() {
      return spacecrafts.size();
    }

    @Override
    public Object getItem(int pos) {
      return spacecrafts.get(pos);
    }

    @Override
    public long getItemId(int pos) {
      return pos;
    }

    @Override
    public View getView(int position, View view, ViewGroup viewGroup) {
      //I will only inflate our model layout if it's null
      if (view == null) {
        view = LayoutInflater.from(context).inflate(R.layout.model, viewGroup, false);
      }

      //I will reference the widgets contained in that inflated layout
      TextView nameTxt = view.findViewById(R.id.nameTextView);
      TextView txtPropellant = view.findViewById(R.id.propellantTextView);
      CheckBox chkTechExists = view.findViewById(R.id.myCheckBox);
      ImageView spacecraftImageView = view.findViewById(R.id.spacecraftImageView);

      final Spacecraft thisSpacecraft = spacecrafts.get(position);

      //Am setting values into their respective views
      nameTxt.setText(thisSpacecraft.getName());
      txtPropellant.setText(thisSpacecraft.getPropellant());
      chkTechExists.setChecked(thisSpacecraft.getTechnologyExists() == 1);
      chkTechExists.setEnabled(false);

      //Am loading an image from url via Picasso
      if (thisSpacecraft.getImageURL() != null && thisSpacecraft.getImageURL().length() > 0) {
        Picasso.get().load(FULL_URL + "/images/" + thisSpacecraft.getImageURL()).placeholder
        (R.drawable.placeholder)
            .into(spacecraftImageView);
      } else {
        Toast.makeText(context, "Empty Image URL", Toast.LENGTH_LONG).show();
        Picasso.get().load(R.drawable.placeholder).into(spacecraftImageView);
      }

      //when our itemview for our ListView is clicked we will open a new activity
      view.setOnClickListener(new View.OnClickListener() {
        @Override
        public void onClick(View view) {
          Toast.makeText(context, thisSpacecraft.getName(), Toast.LENGTH_SHORT).show();
          String techExists = "";
          if (thisSpacecraft.getTechnologyExists() == 1) {
            techExists = "YES";
          } else {
            techExists = "NO";
          }
          String[] spacecrafts = { thisSpacecraft.getName(), thisSpacecraft.getPropellant(),
              thisSpacecraft.getDestination(), techExists, FULL_URL + "/images/" +
              thisSpacecraft.getImageURL() };
          openDetailActivity(spacecrafts);
        }
      });

      return view;
    }

    //Am creating a method to Open our detail activity passing the spacecraft details.
    private void openDetailActivity(String[] data) {
      Intent intent = new Intent(MainActivity.this, DetailsActivity.class);
      intent.putExtra("NAME_KEY", data[0]);
      intent.putExtra("PROPELLANT_KEY", data[1]);
      intent.putExtra("DESTINATION_KEY", data[2]);
      intent.putExtra("TECHNOLOGY_EXISTS_KEY", data[3]);
      intent.putExtra("IMAGE_KEY", data[4]);
      startActivity(intent);
    }
  }

  //MainActivity instance fields. Add them within the context of main activity.
  private ListViewAdapter adapter;
  private ListView mListView;
  private ProgressBar mProgressBar;
  private RadioGroup mRadioGroup;
  private RadioButton nuclearRadioButton, plasmaRadioButton, allRadioButton,
  laserRadioButton, warpRadioButton;
  private Call<List<Spacecraft>> call;

  //I will then create a method to Initialize several views we are using
  private void initializeWidgets() {
    mListView = findViewById(R.id.mListView);
    mProgressBar = findViewById(R.id.mProgressBar);
    mProgressBar.setIndeterminate(true);
    mProgressBar.setVisibility(View.VISIBLE);
    //reference the widgets
    mRadioGroup = findViewById(R.id.mRadioGroup);
    nuclearRadioButton = findViewById(R.id.nuclearRadioButton);
    plasmaRadioButton = findViewById(R.id.plasmaRadioButton);
    laserRadioButton = findViewById(R.id.laserRadioButton);
    warpRadioButton = findViewById(R.id.warpRadioButton);
    allRadioButton = findViewById(R.id.allRadioButton);

  }

  //Am creating a method to help Populate our ListView with data
  private void populateListView(List<Spacecraft> spacecraftList) {
    adapter = new ListViewAdapter(this, spacecraftList);
    mListView.setAdapter(adapter);
  }

  //Our onCreate callback
  @Override
  protected void onCreate(Bundle savedInstanceState) {
    super.onCreate(savedInstanceState);
    setContentView(R.layout.activity_main);

    this.initializeWidgets();

    /*Create handle for the RetrofitInstance interface*/
    final MyAPIService myAPIService = RetrofitClientInstance.getRetrofitInstance().
    create(MyAPIService.class);

    //Call<List<Spacecraft>> call = myAPIService.getSpacecrafts();
    call = myAPIService.searchSpacecraft("");
    call.enqueue(new Callback<List<Spacecraft>>() {
      //Am now going to handle successful response. Am showing progress bar and populating
      //listview
      @Override
      public void onResponse(Call<List<Spacecraft>> call, Response<List<Spacecraft>>
      response) {
        mProgressBar.setVisibility(View.GONE);
        populateListView(response.body());
      }

      @Override
      public void onFailure(Call<List<Spacecraft>> call, Throwable throwable) {
        mProgressBar.setVisibility(View.GONE);
        Toast.makeText(MainActivity.this, throwable.getMessage(), Toast.LENGTH_LONG).show();
      }
    });

    //when any radiobutton in our radiogroup is checked, I will show its value
    mRadioGroup.setOnCheckedChangeListener(new RadioGroup.OnCheckedChangeListener() {
      @Override
      public void onCheckedChanged(RadioGroup radioGroup, int i) {
        //I will then get my checked radiobutton from the radiogroup
        int checkedItemId = mRadioGroup.getCheckedRadioButtonId();
        RadioButton checkedRadioButton = findViewById(checkedItemId);
        String category = checkedRadioButton.getText().toString();
        Toast.makeText(MainActivity.this, category, Toast.LENGTH_SHORT).show();

        //I will check the category.
        if (category.equalsIgnoreCase("All")) {
          //then I return all categories
          call = myAPIService.searchSpacecraft("");
        } else {
          //otherwis I return a specific category
          call = myAPIService.searchSpacecraft(category);
        }

        //I will use `Enqueue` to queue our HTTP call in a background thread where it will be
        //called
        call.enqueue(new Callback<List<Spacecraft>>() {
          //If I get a successful response
          @Override
          public void onResponse(Call<List<Spacecraft>> call, Response<List<Spacecraft>>
           response) {
            mProgressBar.setVisibility(View.GONE);
            populateListView(response.body());
          }

          //If I fail, I will show my error in a toast message.
          @Override
          public void onFailure(Call<List<Spacecraft>> call, Throwable throwable) {
            populateListView(new ArrayList<Spacecraft>());
            mProgressBar.setVisibility(View.GONE);
            Toast.makeText(MainActivity.this, "ERROR: " + throwable.getMessage(),
            Toast.LENGTH_LONG).show();
          }
        });
      }
    });

  }
}
//end
```

##### (b). DetailsActivity.java

Our details activity.

```java
package info.camposha.retrofitmysqlradiobuttonsfilter;

import android.content.Intent;
import android.os.Bundle;
import android.support.v7.app.AppCompatActivity;
import android.widget.CheckBox;
import android.widget.ImageView;
import android.widget.TextView;

import com.squareup.picasso.Picasso;

import java.text.DateFormat;
import java.text.SimpleDateFormat;
import java.util.Date;

public class DetailsActivity extends AppCompatActivity {

  TextView nameDetailTextView, propellantDetailTextView, dateDetailTextView,
  destinationDetailTextView;
  CheckBox techExistsDetailCheckBox;
  ImageView teacherDetailImageView;

  //We start by initializing our widgets.
  private void initializeWidgets() {
    nameDetailTextView = findViewById(R.id.nameDetailTextView);
    propellantDetailTextView = findViewById(R.id.propellantDetailTextView);
    dateDetailTextView = findViewById(R.id.dateDetailTextView);
    destinationDetailTextView = findViewById(R.id.destinationDetailTextView);
    techExistsDetailCheckBox = findViewById(R.id.techExistsDetailCheckBox);
    teacherDetailImageView = findViewById(R.id.teacherDetailImageView);
  }

  //This method will get todays date and return it as a string
  private String getDateToday() {
    DateFormat dateFormat = new SimpleDateFormat("yyyy/MM/dd");
    Date date = new Date();
    String today = dateFormat.format(date);
    return today;
  }

  //I'll create a method to receive and show data.
  private void receiveAndShowData() {
    //RECEIVE DATA FROM ITEMS ACTIVITY VIA INTENT
    Intent i = this.getIntent();
    String name = i.getExtras().getString("NAME_KEY");
    String propellant = i.getExtras().getString("PROPELLANT_KEY");
    String destination = i.getExtras().getString("DESTINATION_KEY");
    String technologyExists = i.getExtras().getString("TECHNOLOGY_EXISTS_KEY");
    String imageURL = i.getExtras().getString("IMAGE_KEY");

    //SET RECEIVED DATA TO TEXTVIEWS AND IMAGEVIEWS
    nameDetailTextView.setText(name);
    propellantDetailTextView.setText(propellant);
    dateDetailTextView.setText(getDateToday());
    destinationDetailTextView.setText(destination);
    techExistsDetailCheckBox.setChecked(technologyExists.equalsIgnoreCase("YES"));
    techExistsDetailCheckBox.setEnabled(false);
    Picasso.get().load(imageURL).placeholder(R.drawable.placeholder)
    .into(teacherDetailImageView);

  }

  //Let's come to the onCreate callback
  @Override
  protected void onCreate(Bundle savedInstanceState) {
    super.onCreate(savedInstanceState);
    setContentView(R.layout.activity_detail);

    initializeWidgets();
    receiveAndShowData();
  }

}
```

#### Our Layouts

We have these layout files:

1. activity_main.xml
2. activity_detail.xml
3. model.xml

##### (a). activity_main.xml

This is the layout for the main activity.

```xml
<?xml version="1.0" encoding="utf-8"?>
<LinearLayout

    android_layout_width="match_parent"
    android_layout_height="match_parent"

    android_orientation="vertical"
    tools_context=".MainActivity">

    <TextView
        android_id="@+id/headerTxt"
        android_layout_width="match_parent"
        android_layout_height="wrap_content"
        android_text="Retrofit MySQL Category Filter"
        android_padding="5dp"
        android_textAlignment="center"
        android_textStyle="bold"
        android_textAppearance="@style/TextAppearance.AppCompat.Large"
        android_textColor="@color/colorAccent" />

    <ProgressBar
        android_id="@+id/mProgressBar"
        style="?android:attr/progressBarStyleHorizontal"
        android_layout_width="match_parent"
        android_layout_height="wrap_content"
        android_indeterminate="true"
        android_indeterminateBehavior="cycle"
        android_visibility="gone" />

    <TextView
        android_layout_width="match_parent"
        android_layout_height="wrap_content"
        android_text="Select Category To Filter:"
        android_padding="5dp"
        android_textStyle="italic"
        android_textAppearance="@style/TextAppearance.AppCompat.Medium" />

        <RadioGroup
            android_id="@+id/mRadioGroup"
            android_orientation="horizontal"
             android_padding="5dp"
            android_layout_width="match_parent"
            android_layout_height="wrap_content">

            <RadioButton
                android_id="@+id/nuclearRadioButton"
                android_layout_width="wrap_content"
                android_layout_height="wrap_content"
                android_text="Nuclear"
                android_padding="2dp" />
            <RadioButton
                android_id="@+id/plasmaRadioButton"
                android_layout_width="wrap_content"
                android_layout_height="wrap_content"
                android_text="Plasma"
                android_padding="2dp" />
            <RadioButton
                android_id="@+id/laserRadioButton"
                android_layout_width="wrap_content"
                android_layout_height="wrap_content"
                android_text="Laser"
                android_padding="2dp" />
            <RadioButton
                android_id="@+id/warpRadioButton"
                android_layout_width="wrap_content"
                android_layout_height="wrap_content"
                android_text="Warp"
                android_padding="2dp" />
            <RadioButton
                android_id="@+id/allRadioButton"
                android_layout_width="wrap_content"
                android_layout_height="wrap_content"
                android_text="All"
                android_padding="2dp" />

        </RadioGroup>

    <TextView
        android_layout_width="match_parent"
        android_layout_height="wrap_content"
        android_text="Filter Results"
        android_padding="5dp"
        android_textStyle="italic"
        android_textAppearance="@style/TextAppearance.AppCompat.Medium" />

    <ListView
        android_id="@+id/mListView"
        android_layout_weight="0.5"
        android_numColumns="auto_fit"
        android_layout_width="match_parent"
        android_layout_height="wrap_content" />
</LinearLayout>
```

##### (b). activity_detail.xml

This is the layout for the detail activity.

```xml
<?xml version="1.0" encoding="utf-8"?>
<RelativeLayout

    android_layout_width="match_parent"
    android_layout_height="match_parent"
    android_background="#009688"
    tools_context=".DetailsActivity"
    tools_showIn="@layout/activity_detail">

    <android.support.v7.widget.CardView
        android_layout_width="match_parent"
        android_layout_height="match_parent"
        android_layout_margin="3dp"
        card_view_cardCornerRadius="3dp"
        card_view_cardElevation="5dp">

        <ScrollView
            android_layout_width="match_parent"
            android_layout_height="match_parent">

            <LinearLayout
                android_layout_width="match_parent"
                android_layout_height="match_parent"
                android_orientation="vertical">

                <ImageView
                    android_id="@+id/teacherDetailImageView"
                    android_layout_width="match_parent"
                    android_layout_height="250dp"
                    android_layout_alignParentTop="true"
                    android_padding="5dp"
                    android_scaleType="fitXY"
                    android_src="@drawable/placeholder" />

                <LinearLayout
                    android_layout_width="match_parent"
                    android_layout_height="wrap_content"
                    android_orientation="vertical">

                    <LinearLayout
                        android_layout_width="match_parent"
                        android_layout_height="wrap_content"
                        android_orientation="horizontal">

                        <TextView
                            android_id="@+id/nameLabel"
                            android_layout_width="wrap_content"
                            android_layout_height="wrap_content"
                            android_maxLines="1"
                            android_padding="5dp"
                            android_text="NAME : "
                            android_textAppearance="?android:attr/textAppearanceLarge"
                            android_textStyle="bold" />

                        <TextView
                            android_id="@+id/nameDetailTextView"
                            android_layout_width="wrap_content"
                            android_layout_height="wrap_content"
                            android_maxLines="1"
                            android_padding="5dp"
                            android_text="Voyager"
                            android_textAppearance="?android:attr/textAppearanceLarge"/>
                    </LinearLayout>

                    <LinearLayout
                        android_layout_width="match_parent"
                        android_layout_height="wrap_content"
                        android_orientation="horizontal">

                        <TextView
                            android_id="@+id/dateLabel"
                            android_layout_width="wrap_content"
                            android_layout_height="wrap_content"
                            android_maxLines="1"
                            android_padding="5dp"
                            android_text="DATE : "
                            android_textAppearance="?android:attr/textAppearanceLarge"
                            android_textStyle="bold" />

                        <TextView
                            android_id="@+id/dateDetailTextView"
                            android_layout_width="wrap_content"
                            android_layout_height="wrap_content"
                            android_maxLines="1"
                            android_padding="5dp"
                            android_text="Today"
                            android_textAppearance="?android:attr/textAppearanceLarge"/>
                    </LinearLayout>

                    <LinearLayout
                        android_layout_width="match_parent"
                        android_layout_height="wrap_content"
                        android_orientation="horizontal">

                        <TextView
                            android_id="@+id/destinationLabel"
                            android_layout_width="wrap_content"
                            android_layout_height="wrap_content"
                            android_maxLines="1"
                            android_padding="5dp"
                            android_text="DESTINATION : "
                            android_textAppearance="?android:attr/textAppearanceLarge"
                            android_textStyle="bold" />

                        <TextView
                            android_id="@+id/destinationDetailTextView"
                            android_layout_width="wrap_content"
                            android_layout_height="wrap_content"
                            android_maxLines="1"
                            android_padding="5dp"
                            android_text="KY Cygni"
                            android_textAppearance="?android:attr/textAppearanceLarge"/>
                    </LinearLayout>
                    <LinearLayout
                        android_layout_width="match_parent"
                        android_layout_height="wrap_content"
                        android_orientation="horizontal">

                        <TextView
                            android_id="@+id/propellantLabel"
                            android_layout_width="wrap_content"
                            android_layout_height="wrap_content"
                            android_maxLines="1"
                            android_padding="5dp"
                            android_text="PROPELLANT : "
                            android_textAppearance="?android:attr/textAppearanceLarge"
                            android_textStyle="bold" />

                        <TextView
                            android_id="@+id/propellantDetailTextView"
                            android_layout_width="wrap_content"
                            android_layout_height="wrap_content"
                            android_maxLines="1"
                            android_padding="5dp"
                            android_text="Chemical"
                            android_textAppearance="?android:attr/textAppearanceLarge"/>
                    </LinearLayout>

                    <LinearLayout
                        android_layout_width="match_parent"
                        android_layout_height="wrap_content"
                        android_orientation="horizontal">

                        <TextView
                            android_id="@+id/techExistsLabel"
                            android_layout_width="wrap_content"
                            android_layout_height="wrap_content"
                            android_maxLines="1"
                            android_padding="5dp"
                            android_text="TECH EXISTS? : "
                            android_textAppearance="?android:attr/textAppearanceLarge"
                            android_textStyle="bold" />

                        <CheckBox
                            android_id="@+id/techExistsDetailCheckBox"
                            android_layout_width="wrap_content"
                            android_layout_height="wrap_content"
                            android_padding="5dp"/>
                    </LinearLayout>

                </LinearLayout>
            </LinearLayout>
        </ScrollView>
    </android.support.v7.widget.CardView>
</RelativeLayout>
```

##### (b). model.xml

Our row model layout.

```xml
<?xml version="1.0" encoding="utf-8"?>
<android.support.v7.widget.CardView
    android_orientation="horizontal" android_layout_width="match_parent"

    android_layout_margin="5dp"
    card_view_cardCornerRadius="10dp"
    card_view_cardElevation="5dp"
    android_layout_height="match_parent">

    <RelativeLayout
        android_layout_width="match_parent"
        android_layout_height="match_parent">
        <ImageView
            android_layout_width="150dp"
            android_layout_height="150dp"
            android_id="@+id/spacecraftImageView"
            android_padding="5dp"
            android_scaleType="fitXY"
            android_src="@drawable/placeholder" />

        <TextView
            android_layout_width="wrap_content"
            android_layout_height="wrap_content"
            android_textAppearance="?android:attr/textAppearanceLarge"
            android_text="Spacecraft Name"
            android_id="@+id/nameTextView"
            android_padding="5dp"
            android_textColor="@color/colorAccent"
            android_layout_alignParentTop="true"
            android_layout_toRightOf="@+id/spacecraftImageView" />

        <TextView
            android_layout_width="wrap_content"
            android_layout_height="wrap_content"
            android_textAppearance="?android:attr/textAppearanceMedium"
            android_text="Propellant"
            android_textStyle="italic"
            android_id="@+id/propellantTextView"
            android_padding="5dp"
            android_layout_alignBottom="@+id/spacecraftImageView"
            android_layout_toRightOf="@+id/spacecraftImageView" />
        <CheckBox
            android_layout_width="wrap_content"
            android_layout_height="wrap_content"
            android_id="@+id/myCheckBox"
            android_text="Tech Exists?"
            android_layout_alignParentRight="true" />

    </RelativeLayout>
</android.support.v7.widget.CardView>
```

##### Download

Download code [here]()
