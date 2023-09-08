# Retrofit MySQL ListView Examples


_Android Retrofit : MySQL - MasterDetail ListView with Images and Text._

We want to see how to connect android app to mysql database using Retrofit then download images and text saved in that database and render in our custom listview with cardviews. Then when the user clicks a single cardview, we will open a detail activity showing more details of the item.


However first we need to introduce some APIs, classes and concepts.

##### What is Retrofit.

Retrofit is a type safe HTTP Client for android and java. It allows us make HTTP requests from within our android application. Those HTTP requests then empower our android application to talk to other computers and exchange data over the HTTP protocol.

Don't underestimate this ability as it makes apps very powerful and with almost limitless capabilities. Imagine for example android apps without this capability. The apps would be complete offline and disconnected. That means you would be able to do the following tasks:

1. Update or even Install apps via playstore.
2. Browse internet even via browsers.
3. Chat via Whatsapp, facebook, google plus etc.
4. Watch YouTube and other online videos.
5. Perform online financial transactions via companies like Stripe and PayPal.
6. View and Download your bank's financial statements.
7. Purchase products from ecommerce giants like AliBaba, Jumia etc.

All the above and thousands and thousands more capabilities would not be happening had we not have the ability to communicate via HTTP from our android apps. However that communication is two-way. You need a client and server. The client performs a request and the server responds appropriately.

Most server code is written in PHP code and the popular database used is MySQL. However android side we use java and a wealth of HTTP Clients. Retrofit is probably in the top three of HTTP clients currently.

Read more [about Retrofit here](https://camposha.info/android/retrofit).

##### What is MySQL

MySQL is a fast and open source RDBMS database system that uses SQL language. It's probably the most popular database server. We use it to store data in the server.

Mostly mysql is manipulated via SQL statements. However to use it in a real application we also need a general language. These languages include PHP, Python, Java, C#, Ruby, Kotlin etc.

In this tutorial we will use PHP.

##### What is PHP?

PHP is a server side programming language that is known to be fast yet beginner friendly. It is the most popular server side programming language.

This is no mean feat as remember it's beaten powerful general purpose languages like Java, C# and Python for that role. The main reason for that is the fact that PHP is one of the easiest languages to get started with. Moreover it can seamlessly be embedded in webpages in a way that is even more straight forward than Javascript.

However PHP is not a toy language. It is a powerful language that has advanced features like Object oriented capabilities. It's being used to power the most demanding of web applications like Facebook and Wikipedia.

We use PHP to write our server code. And yes we write clean object oriented code you will love.

##### What is ListView?

ListView is our adapterview. In other words it is our list component. We use it to display our lists of data. That list can then be easily scrolled. ListViews allow us display large data sets. An alternative to ListView is [recyclerView](https://camposha.info/android/recyclerview).

Most people love using listviews to display images and text. Those involve placing an imageview and textview in a cardview. Then using the cardview as the item view for the listview.

It's what we do here.

You can read more [about ListViews here](https://camposha.info/android/listview).

### 1\. Android Retrofit - MySQL MasterDetail - ListView Images and Text

_Android Retrofit : MySQL - MasterDetail ListView with Images and Text._

We want to see how to connect android app to mysql database using [Retrofit](https://camposha.info/android/retrofit) then download images and text saved in that database and render in our custom listview with cardviews. Then when the user clicks a single cardview, we will open a detail activity showing more details of the item.

Here's our video version of this tutorial:

In actuality, normally we store the images in the file system and the url as well as the text in the database. This is the more efficient approach. You don't want to be bloating your database with large blobs of data. Morever it's easier and efficient to update and even delete binary data from the file system than blobs in database.

Here's the demo.

Here's the landscape mode:

##### General App Structure

| No. | Name | Role |
| --- | --- | --- |
| 1. | MainActivity.java | Our main activity. It is also our master view ad will contain our listview |
| 2. | DetailsActivity.java | Our details activity. It is our detail view and will contain several widgets displaying the details. |
| 3. | activity_main.xml | Our main activity's layout. |
| 4. | activity_detail.xml | Our detail activity's layout. |
| 5. | build.gradle | We will add dependencies here. |
| 6. | AndroidManifest.xml | We will add intenet connectivity permission here. |

#### 1\. Setup

##### (a). PHP Code

First we need to prepare a database. I used XAMPP with PHPMyAdmin to create my database.

Here's my table structure:

Then in XAMPP or WAMP or whatever server you are using go to the root directory of your project and add php code and an image folders in a given directory. For example see mine here:

Then add images to the images folder:

In the `index.php` file we will write Object Oriented PHP code to talk to our database and return us data. We start by creating a class called `Constants` that will contain our database server name, database name, database user name and password.

[notice] `root` and `are the default username and password for XAMPP and WAMP. Use them only in learning. In production create a new user and give him/her a strong password. Then specify them in the`Constants `class. [/notice]`

\`\`

**How to Create a MySQL Database Table via SQL**

Here's the SQL code we used to create our database table:

```sql
CREATE TABLE spacecraftsdb.spacecraftstb ( id INT NOT NULL AUTO_INCREMENT , name VARCHAR(150) NOT NULL , propellant VARCHAR(150) NOT NULL , destination VARCHAR(150) NOT NULL , image_url VARCHAR(150) NOT NULL , technology_exists TINYINT NOT NULL , PRIMARY KEY (id) ) ENGINE = InnoDB;
```

**How to Insert Into MySQL Table**

You can then insert using a statement like this:

```sql
INSERT INTO spacecraftsdb.spacecraftstb (id, name, propellant, destination, image_url, technology_exists) VALUES (NULL, 'Voyager A', 'Warp Drive', 'Alpha Centauri A', 'voyager-a.jpg', '0'), (NULL, 'Voyager B', 'Plasma Ions', 'Proxima Centauri', 'voyager-b.jpg', '1')
```

This PHP Code will fetch us all our data in mysql database and print it out as json.

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

##### (b). Build.gradle

Normally we have two build.gradle scripts. We are interested in the one located in the app folder rather than the project folder of your application.

Here we can add dependencies we will be using. Android Studio employs Gradle as the build system. One of it's roles then is to manage dependencies.

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

We have added cardview as our listview will comprise cardviews. Then those cardviews will contain other widgets like imageviews and textviews.

`retrofit` on the other hand is our HTTP Client so we add it. Remember Retrofit even though it's very popular, it is a third party library. Hence it and alongside the other following dependencies will need internet connectivity.

`converter-gson` is our converter for retrofit. It will map our JSON Objects into type safe Java POJO classes. This allows us to avoid having to manually parse our JSON data. Instead they get mapped to model classes via the `converter-gson`.

`picasso` on the other hand is our image loader library. Loading images from internet, it turns out, can be a little bit involved. Hence it makes sense to avoid having to re-invent the wheel and use a proven battle tested library. Well Picasso is a top two image loader library and we use it here.

##### (b). AndroidManifest.xml

You need to add permission to your androd manifest file.

```xml
<uses-permission android_name="android.permission.INTERNET"/>
```

In this case we've added the internet connectivity permission as we are connecting to a network. Failure to do this will result in your application not being allowed to access network.

Also don't forget to register the `DetailsActivity` in your android manifest:

```xml
<application>
        <activity android_name=".MainActivity">
        </activity>
        <activity android_name=".DetailsActivity" android_parentActivityName=".MainActivity"/>
    </application>
```

If you don't register activity's then your app will crash if you attempt to open that activity.

#### 2\. Layouts

We have three layoust:

1. activity_main
2. activity_detail
3. model

##### (a). activity_main.xml

This is the main activity's layout:

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
        android_text="Retrofit ListView MySQL"
        android_padding="5dp"
        android_textAlignment="center"
        android_textStyle="bold"
        android_textAppearance="@style/TextAppearance.AppCompat.Large"
        android_textColor="@color/colorAccent" />

    <ProgressBar
        android_id="@+id/myProgressBar"
        style="?android:attr/progressBarStyleHorizontal"
        android_layout_width="match_parent"
        android_layout_height="wrap_content"
        android_indeterminate="true"
        android_indeterminateBehavior="cycle"
        android_visibility="gone" />

    <ListView
        android_id="@+id/mListView"
        android_layout_weight="0.5"
        android_numColumns="auto_fit"
        android_layout_width="match_parent"
        android_layout_height="wrap_content" />
</LinearLayout>
```

##### (b). activity_detail.xml

This is the detail activity's layout:

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

##### (c). model.xml

This layout will get inflated into the item view for our listview.

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

#### 3\. Java Code

We have three layoust:

1. MainActivity
2. DetailsActivity

##### (a). MainActivity.java

This is the main activity.

```java
package info.camposha.retrofitmysqllistview;

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
import android.widget.TextView;
import android.widget.Toast;

import com.google.gson.annotations.SerializedName;
import com.squareup.picasso.Picasso;

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
        @SerializedName("image_url")
        private String imageURL;
        @SerializedName("technology_exists")
        private int technologyExists;

        public Spacecraft(int id, String name, String propellant, String imageURL, int technologyExists) {
            this.id = id;
            this.name = name;
            this.propellant = propellant;
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
        public void setName(String name) {
            this.name = name;
        }
        public String getPropellant() {
            return propellant;
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

    class ListViewAdapter extends BaseAdapter{

        private List<Spacecraft> spacecrafts;
        private Context context;

        public ListViewAdapter(Context context,List<Spacecraft> spacecrafts){
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
            intent.putExtra("TECHNOLOGY_EXISTS_KEY", data[2]);
            intent.putExtra("IMAGE_KEY", data[3]);
            startActivity(intent);
        }
    }

    private ListViewAdapter adapter;
    private ListView mListView;
    ProgressBar myProgressBar;

    private void populateListView(List<Spacecraft> spacecraftList) {
        mListView = findViewById(R.id.mListView);
        adapter = new ListViewAdapter(this,spacecraftList);
        mListView.setAdapter(adapter);
    }

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);

        final ProgressBar myProgressBar= findViewById(R.id.myProgressBar);
        myProgressBar.setIndeterminate(true);
        myProgressBar.setVisibility(View.VISIBLE);

        /*Create handle for the RetrofitInstance interface*/
        MyAPIService myAPIService = RetrofitClientInstance.getRetrofitInstance().create(MyAPIService.class);

        Call<List<Spacecraft>> call = myAPIService.getSpacecrafts();
        call.enqueue(new Callback<List<Spacecraft>>() {

            @Override
            public void onResponse(Call<List<Spacecraft>> call, Response<List<Spacecraft>> response) {
                myProgressBar.setVisibility(View.GONE);
                populateListView(response.body());
            }
            @Override
            public void onFailure(Call<List<Spacecraft>> call, Throwable throwable) {
                myProgressBar.setVisibility(View.GONE);
                Toast.makeText(MainActivity.this, throwable.getMessage(), Toast.LENGTH_LONG).show();
            }
        });
    }
}
```

##### (b). DetailsActivity.java

This is the details activity.

```java
package info.camposha.retrofitmysqllistview;

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
        String technologyExists=i.getExtras().getString("TECHNOLOGY_EXISTS_KEY");
        String imageURL=i.getExtras().getString("IMAGE_KEY");

        //SET RECEIVED DATA TO TEXTVIEWS AND IMAGEVIEWS
        nameDetailTextView.setText(name);
        propellantDetailTextView.setText(propellant);
        dateDetailTextView.setText(getDateToday());
        destinationDetailTextView.setText(getRandomDestination());
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

##### Download

Here are reference resources:

| No. | Location | Link |
| --- | --- | --- |
| 1. | GitHub | [Direct Download](https://github.com/Oclemy/RetrofitMySQLListViewImagesText/archive/master.zip) |
| 2. | GitHub | [Browse](https://github.com/Oclemy/RetrofitMySQLListViewImagesText) |
| 3. | YouTube | [Video Tutorial](https://www.youtube.com/watch?v=P3T51mHZiJw) |
| 4. | YouTube | [ProgrammingWizards TV Channel](http://www.youtube.com/c/programmingwizards) |

\`\`
