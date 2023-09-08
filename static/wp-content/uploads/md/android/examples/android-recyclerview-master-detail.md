# RecyclerView Master Detail


Android RecyclerView is a class defining us a flexible view that provides a limited window which can render vast datasets.

It resides in the android.view.ViewGroup class and implements ScrollingView and NestedScrollingChild2 interfaces. In most cases we do use it with a CardView, just as we shall do right here. In this example we make a simple Master detail example with two activities.


We'll have two views: the master view and the detail view. The master view shall comprise a recyclerview with cardviews.The cardviews will have images and text. The second view,the detail view is an activity that shows the details of a single activity.

You can find more details about RecyclerView [here](https://developer.android.com/reference/android/support/v7/widget/RecyclerView.html).

### Screenshot

- Here's the screenshot of the project.

Android RecyclerView MasterDetail : Master View.

![](https://image.prntscr.com/image/jVOnb3nRRkS_M9Y0gddAJA.png) Android RecyclerView MasterDetail : Detail View. Android RecyclerView MasterDetail : Project Structure. ![](https://image.prntscr.com/image/e3UmMXkmTwyiTvDNdbtNqA.png)

## Common Questions this example explores

- Android RecyclerView MasterDetail Example.
- Android RecyclerVeiw Images and Text.
- Android RecyclerView Adapter example.
- Android RecyclerView CardView Images Text.
- Android RecyclerView ItemClick to open activity and pass data.

## Tools Used

This example was written with the following tools:

- Windows 8
- AndroidStudio IDE
- Genymotion Emulator
- Language : Java
- Topic : RecyclerView, RecyclerView Adapter, RecyclerView Master Detail

## Libaries Used

- We don't use any third party library.

## Source Code

Lets jump directly to the source code.

## Build.Gradle

- Normally in android projects, there are two build.gradle files. One is the app level build.gradle, the other is project level build.gradle. The app level belongs inside the app folder and its where we normally add our dependencies and specify the compile and target sdks.
- Also Add dependencies for AppCompat and Design support libraries.
- Our MainActivity shall derive from AppCompatActivity while we shall also use Floating action button from design support libraries.

```groovy
apply plugin: 'com.android.application'

android {
    compileSdkVersion 23
    buildToolsVersion "23.0.2"

    defaultConfig {
        applicationId "com.tutorials.hp.recyclermasterdetail"
        minSdkVersion 15
        targetSdkVersion 23
        versionCode 1
        versionName "1.0"
    }
    buildTypes {
        release {
            minifyEnabled false
            proguardFiles getDefaultProguardFile('proguard-android.txt'), 'proguard-rules.pro'
        }
    }
}

dependencies {
    compile fileTree(dir: 'libs', include: ['*.jar'])
    testCompile 'junit:junit:4.12'
    compile 'com.android.support:appcompat-v7:23.2.1'
    compile 'com.android.support:design:23.2.1'
    compile 'com.android.support:cardview-v7:23.2.1'
    compile 'com.android.support:recyclerview-v7:23.2.1'
}
```

## MainActivity.java

- Launcher activity.
- ActivityMain.xml inflated as the contentview for this activity.
- We initialize views and widgets inside this activity.
- We use RecyclerView as our adapterview and RecyclerView.Adapter as our adapter.

```java
package com.tutorials.hp.recyclermasterdetail;

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

public class MainActivity extends AppCompatActivity {

    //DATA SOURCE
    String[] names={"Ander Herera","David De Gea","Michael Carrick","Juan Mata","Diego Costa","Oscar"};
    String[] positions={"Midfielder","GoalKeeper", "Midfielder","Playmaker","Striker","Playmaker"};
    int[] images={R.drawable.herera,R.drawable.degea,R.drawable.carrick,R.drawable.mata,R.drawable.costa,R.drawable.oscar};

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

        //REFERENCE RECYCLER
        RecyclerView rv= (RecyclerView) findViewById(R.id.myRecycler);

        //SET PROPERTIES
        rv.setLayoutManager(new LinearLayoutManager(this));
        rv.setItemAnimator(new DefaultItemAnimator());

        //ADAPTER
        MyAdapter adapter=new MyAdapter(this,names,positions,images);
        rv.setAdapter(adapter);

    }

    @Override
    public boolean onCreateOptionsMenu(Menu menu) {
        // Inflate the menu; this adds items to the action bar if it is present.
        getMenuInflater().inflate(R.menu.menu_main, menu);
        return true;
    }

    @Override
    public boolean onOptionsItemSelected(MenuItem item) {
        // Handle action bar item clicks here. The action bar will
        // automatically handle clicks on the Home/Up button, so long
        // as you specify a parent activity in AndroidManifest.xml.
        int id = item.getItemId();

        //noinspection SimplifiableIfStatement
        if (id == R.id.action_settings) {
            return true;
        }

        return super.onOptionsItemSelected(item);
    }
}
```

## MyHolder.java

- Our ViewHolder class.
- It derives from android.support.v7.widget.RecyclerView.ViewHolder class, which was added in android version 22.
- A viewholder describes an item view and metadata about its place within RecyclerView.
- This class will hold our views like TextViews and ImageView.

```java
package com.tutorials.hp.recyclermasterdetail;

import android.support.v7.widget.RecyclerView;
import android.view.View;
import android.widget.ImageView;
import android.widget.TextView;

public class MyHolder extends RecyclerView.ViewHolder implements View.OnClickListener {
    //OUR VIEWS
    ImageView img;
    TextView nameTxt;
    TextView posTxt;
    private ItemClickListener itemClickListener;

//our contructor
    public MyHolder(View itemView) {
        super(itemView);

        nameTxt= (TextView) itemView.findViewById(R.id.nameTxt);
        posTxt= (TextView) itemView.findViewById(R.id.posTxt);
        img= (ImageView) itemView.findViewById(R.id.playerImage);

        itemView.setOnClickListener(this);
    }

    @Override
    public void onClick(View v) {
        this.itemClickListener.onItemClick(v,getLayoutPosition());
    }

    public void setItemClickListener(ItemClickListener ic)
    {
        this.itemClickListener=ic;

    }
}
```

## MyAdapter.java

- Our Adapter class.
- This class will derive from android.support.v7.widget.RecyclerView.Adapter .
- Adapters provide a binding from an app-specific data set to views that are displayed within a RecyclerView.
- We send text and images to detailactivity when a single RecyclerView item is clicked.

```java
package com.tutorials.hp.recyclermasterdetail;

import android.content.Context;
import android.content.Intent;
import android.support.v7.widget.RecyclerView;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;

public class MyAdapter extends RecyclerView.Adapter<MyHolder>{

    //FIELDS TO STORE PASSED IN VALUES
    Context c;
    String[] players;
    String[] positions;
    int[] images;

    public MyAdapter(Context ctx,String[] players,String[] positions,int[] images)
    {
        //ASSIGN THEM
        this.c=ctx;
        this.players=players;
        this.positions=positions;
        this.images=images;

    }
    @Override
    public MyHolder onCreateViewHolder(ViewGroup parent, int viewType) {
        //INFLATE A VIEW FROM XML
        View v= LayoutInflater.from(parent.getContext()).inflate(R.layout.model,null);

        //HOLDER
        MyHolder holder=new MyHolder(v);

        return holder;
    }

    //DATA IS BEING BOUND TO VIEWS
    @Override
    public void onBindViewHolder(MyHolder holder, final int position) {

        //BIND DATA
        holder.nameTxt.setText(players[position]);
        holder.posTxt.setText(positions[position]);
        holder.img.setImageResource(images[position]);

        //WHEN ITEM IS CLICKED
        holder.setItemClickListener(new ItemClickListener() {
            @Override
            public void onItemClick(View v, int pos) {

                //INTENT OBJ
                Intent i=new Intent(c,DetailActivity.class);

                //ADD DATA TO OUR INTENT
                i.putExtra("Name",players[position]);
                i.putExtra("Position",positions[position]);
                i.putExtra("Image",images[position]);

                //START DETAIL ACTIVITY
                c.startActivity(i);

            }
        });

    }

    //TOTAL PLAYERS
    @Override
    public int getItemCount() {
        return players.length;
    }
}
```

## ItemClickListener.java

- Our ItemClick Listener interface.
- Defines signature for our ItemClick method.

```java
package com.tutorials.hp.recyclermasterdetail;

import android.view.View;

public interface ItemClickListener {

    void onItemClick(View v,int pos);
}
```

## DetailActivity.java

- Our Detail Activity.
- Will receive data from the MainActivity via Intent object.
- We then show these data in textviews and imageviews.

```java
package com.tutorials.hp.recyclermasterdetail;

import android.content.Intent;
import android.os.Bundle;
import android.support.design.widget.FloatingActionButton;
import android.support.design.widget.Snackbar;
import android.support.v7.app.AppCompatActivity;
import android.support.v7.widget.Toolbar;
import android.view.KeyEvent;
import android.view.View;
import android.widget.Button;
import android.widget.ImageView;
import android.widget.TextView;

public class DetailActivity extends AppCompatActivity {

    //VIEWS
    ImageView img;
    TextView nameTxt,posTxt;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_detail);
        Toolbar toolbar = (Toolbar) findViewById(R.id.toolbar);
        setSupportActionBar(toolbar);

        //RECEIVE OUR DATA
        Intent i=getIntent();

        final String name=i.getExtras().getString("Name");
        final String pos=i.getExtras().getString("Position");
        final int image=i.getExtras().getInt("Image");

        FloatingActionButton fab = (FloatingActionButton) findViewById(R.id.fab);
        fab.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View view) {
                Snackbar.make(view, name, Snackbar.LENGTH_LONG)
                        .setAction("Action", null).show();
            }
        });

        //REFERENCE VIEWS FROM XML
        img= (ImageView) findViewById(R.id.playerImage);
        nameTxt= (TextView) findViewById(R.id.nameTxt);
        posTxt= (TextView) findViewById(R.id.posTxt);

        //ASSIGN DATA TO THOSE VIEWS
        img.setImageResource(image);
        nameTxt.setText("NAME :   "+name);
        posTxt.setText("POSITION : "+pos);

    }

}
```

## ActivityMain.xml

- Template Layout for the MainActivity.
- Contains our ContentMain.xml.

```xml
<?xml version="1.0" encoding="utf-8"?>
<android.support.design.widget.CoordinatorLayout

    android_layout_width="match_parent"
    android_layout_height="match_parent"
    android_fitsSystemWindows="true"
    tools_context="com.tutorials.hp.recyclermasterdetail.MainActivity">

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

## ContentMain.xml

- Content Layout.
- Defines the views and widgets to be displayed inside the MainActivity.
- In this case its a RecyclerView.

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
    tools_context="com.tutorials.hp.recyclermasterdetail.MainActivity"
    tools_showIn="@layout/activity_main">

    <android.support.v7.widget.RecyclerView
        android_id="@+id/myRecycler"
        android_layout_width="wrap_content"
        android_layout_height="wrap_content"
        class="android.support.v7.widget.RecyclerView" />
</RelativeLayout>
```

## ActivityDetail.xml

- Template Layout for the Detail Activity.
- Contains our ContentDetail.xml.

```xml
<?xml version="1.0" encoding="utf-8"?>
<android.support.design.widget.CoordinatorLayout

    android_layout_width="match_parent"
    android_layout_height="match_parent"
    android_fitsSystemWindows="true"
    tools_context="com.tutorials.hp.recyclermasterdetail.DetailActivity">

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

    <include layout="@layout/content_detail" />

    <android.support.design.widget.FloatingActionButton
        android_id="@+id/fab"
        android_layout_width="wrap_content"
        android_layout_height="wrap_content"
        android_layout_gravity="bottom|end"
        android_layout_margin="@dimen/fab_margin"
        android_src="@android:drawable/ic_dialog_email" />

</android.support.design.widget.CoordinatorLayout>
```

## ContentDetail.xml

- Content Layout.
- Defines the views and widgets to be displayed inside the DetailActivity.

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
    tools_context="com.tutorials.hp.recyclermasterdetail.DetailActivity"
    tools_showIn="@layout/activity_detail">

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
                android_id="@+id/playerImage"
                android_layout_width="190dp"
                android_layout_height="275dp"
                android_paddingLeft="15dp"
                android_layout_alignParentTop="true"
                android_scaleType="fitCenter"
                android_src="@drawable/carrick" />

            <TextView
                android_id="@+id/posTxt"
                android_layout_width="wrap_content"
                android_layout_height="wrap_content"
                android_layout_alignParentLeft="true"
                android_layout_below="@+id/nameTxt"
                android_paddingLeft="15dp"
                android_layout_marginTop="24dp"
                android_text="Position : "
                android_textAppearance="?android:attr/textAppearanceLarge" />

            <TextView
                android_id="@+id/profile"
                android_layout_width="wrap_content"
                android_layout_height="wrap_content"
                android_layout_alignParentLeft="true"
                android_textStyle="bold"
                android_layout_below="@+id/playerImage"
                android_text="PLAYER PROFILE"
                android_textAppearance="?android:attr/textAppearanceLarge" />

            <TextView
                android_id="@+id/nameTxt"
                android_layout_width="wrap_content"
                android_layout_height="wrap_content"
                android_layout_alignParentLeft="true"
                android_paddingLeft="15dp"
                   android_layout_below="@+id/profile"
                android_layout_marginTop="17dp"
                android_text="Name"
                android_textAppearance="?android:attr/textAppearanceLarge" />

        </RelativeLayout>
    </android.support.v7.widget.CardView>

</RelativeLayout>
```

## Model.xml

- Single RecyclerView ItemView layout definition.
- We use CardView as our root layout.
- Our CardView will an imageview and textview.

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
            android_layout_width="wrap_content"
            android_layout_height="wrap_content"
            android_id="@+id/playerImage"
            android_padding="10dp"
            android_src="@drawable/herera" />

        <TextView
            android_layout_width="wrap_content"
            android_layout_height="wrap_content"
            android_textAppearance="?android:attr/textAppearanceLarge"
            android_text="Name"
            android_id="@+id/nameTxt"
            android_padding="10dp"
            android_layout_alignParentTop="true"
            android_layout_toRightOf="@+id/playerImage" />

        <TextView
            android_layout_width="wrap_content"
            android_layout_height="wrap_content"
            android_textAppearance="?android:attr/textAppearanceMedium"
            android_text="Position"
            android_id="@+id/posTxt"
            android_padding="10dp"
            android_layout_alignBottom="@+id/playerImage"
            android_layout_alignParentRight="true" />

    </RelativeLayout>
</android.support.v7.widget.CardView>
```

## Download

- Download the Project below:

[Download](https://github.com/Oclemy/RecyclerMasterDetail_NewActivity_Example/archive/master.zip)

## How To Run

1. Download the project above.
2. You'll get a zipped file,extract it.
3. Open the Android Studio.
4. Now close, already open project.
5. From the Menu bar click on File >New> Import Project.
6. Now Choose a Destination Folder, from where you want to import project.
7. Choose an Android Project.
8. Now Click on “OK“.
9. Done, your done importing the project,now edit it.

## Example 2 - Android RSS - RecyclerView Master Detail - Download,Parse,Show Headlines [Open Activity]

This is an android RSS Master detail example with XmlPullParser,AsyncTask ,HttpURLConnection and RecyclerView..We shall download RSS Feeds from a local website and then parse the feed.We then show parsed images and text news in our RecylerView. We shall handle ItemClicks for our RecyclerView's ViewItems and open the detail activity,passing in details over there.

#### What we do :

- Connect to Internet and make a HTTP GET request using HtttpURLConnection.
- Download our data in the background thread.
- WE use AsyncTask for our threading.
- WE parse the downloaded xml feeds.
- We shall be parsing using XmlPullParser.
- We show our results in a RecyclerView.
- Our results shall consist of images and text.
- This is our master view.It has our RecyclerView.
- When a single RecyclerView viewitem is clicked,we open detail activity.
- The detail view shall show details of a single news feed,like title,description,date etc.
- The website we shall be parsing was hosted locally and it was a dummy wordpress site.

Let's dive in at the deep end.

#### SECTION 1 : Our Dependencies and Manifest

**Build.Gradle**

- Studio has added for us dependencies for AppCompat and Design support libraries.
- Now lets add dependencies for CardView and Picasso library.
- Our AdapterView shall consist of CardViews as our ViewItems.
- Picasso ImageLoader shall load us images asynchronously and cache them.

```groovy
apply plugin: 'com.android.application'

android {
    compileSdkVersion 23
    buildToolsVersion "23.0.2"

    defaultConfig {
        applicationId "com.tutorials.hp.recyclerrssmdetail"
        minSdkVersion 15
        targetSdkVersion 23
        versionCode 1
        versionName "1.0"
    }
    buildTypes {
        release {
            minifyEnabled false
            proguardFiles getDefaultProguardFile('proguard-android.txt'), 'proguard-rules.pro'
        }
    }
}

dependencies {
    compile fileTree(dir: 'libs', include: ['*.jar'])
    testCompile 'junit:junit:4.12'
    compile 'com.android.support:appcompat-v7:23.3.0'
    compile 'com.android.support:design:23.3.0'
    compile 'com.android.support:cardview-v7:23.3.0'

}
```

**AndroidManifest.xml**

- Remember we are downloading data from a network.
- Hence we need to add permission to access the internet.
- Or else Android won't allow us establish connection.

```xml
<?xml version="1.0" encoding="utf-8"?>
<manifest
    package="com.tutorials.hp.recyclerrssmdetail">

    <uses-permission android_name="android.permission.INTERNET"/>

    <application
        android_allowBackup="true"
        android_icon="@mipmap/ic_launcher"
        android_label="@string/app_name"
        android_supportsRtl="true"
        android_theme="@style/AppTheme">
        <activity
            android_name=".MainActivity"
            android_label="@string/app_name"
            android_theme="@style/AppTheme.NoActionBar">
            <intent-filter>
                <action android_name="android.intent.action.MAIN" />

                <category android_name="android.intent.category.LAUNCHER" />
            </intent-filter>
        </activity>

        <activity android_name=".m_DetailActivity.DetailActivity"
            android_label="Article Detail"
            android_theme="@style/AppTheme.NoActionBar">

        </activity>

    </application>

</manifest>
```

## SECTION 2 : Our Data Object

**Article.java**

- Represents a single article.
- The article shall have various properties like name,title,description,date etc.

```java
package com.tutorials.hp.recyclerrssmdetail.m_DataObject;

public class Article {

    String title,description,date,guid,link;

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public String getDate() {
        return date;
    }

    public void setDate(String date) {
        this.date = date;
    }

    public String getGuid() {
        return guid;
    }

    public void setGuid(String guid) {
        this.guid = guid;
    }

    public String getLink() {
        return link;
    }

    public void setLink(String link) {
        this.link = link;
    }
}
```

## SECTION 3 : Our Networking and Parsing classes

**Connector class**

Main Responsibility : ESTABLISH CONNECTION.

- Establishes connection to our server for us.
- We then set up connection properties like Request method.
- In this case we are making a HTTP GET request to our server.
- We shall use HttpURLConnection so our only method shall return its instance .

```java
package com.tutorials.hp.recyclerrssmdetail.m_RSS;

import java.io.IOException;
import java.net.HttpURLConnection;
import java.net.MalformedURLException;
import java.net.URL;

public class Connector {

    public static Object connect(String urlAddress)
    {
        try
        {
            URL url=new URL(urlAddress);
            HttpURLConnection con= (HttpURLConnection) url.openConnection();

            //CON PROPERTIES
            con.setRequestMethod("GET");
            con.setConnectTimeout(15000);
            con.setReadTimeout(15000);
            con.setDoInput(true);

            return con;

        } catch (MalformedURLException e) {
            e.printStackTrace();
            return ErrorTracker.WRONG_URL_FORMAT;

        } catch (IOException e) {
            e.printStackTrace();
            return ErrorTracker.CONNECTION_ERROR;
        }
    }

}
```

**Downloader class**

Main Responsibility : DOWNLOAD XML FEEDS.

- We use our Connector class above to establish a connection.
- If we have a connection then we download data XML feeds from server.
- We download in background using AsyncTask to avoid freezing our user interface.
- Meanwhile we show progress dialog while downloading.
- We dismiss our progress dialog on completion.
- Then we send this downloaded xml feeds to our Data Parser class for it to be processed.

```java
package com.tutorials.hp.recyclerrssmdetail.m_RSS;

import android.app.ProgressDialog;
import android.content.Context;
import android.os.AsyncTask;
import android.support.v7.widget.RecyclerView;
import android.widget.Toast;

import java.io.BufferedInputStream;
import java.io.IOException;
import java.io.InputStream;
import java.net.HttpURLConnection;

public class Downloader extends AsyncTask<Void,Void,Object> {

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
        pd.setTitle("Fetch Latest Articles");
        pd.setMessage("Fetching Data...Please wait");
        pd.show();
    }

    @Override
    protected Object doInBackground(Void... params) {
        return this.downloadData();
    }

    @Override
    protected void onPostExecute(Object data) {
        super.onPostExecute(data);

        pd.dismiss();
        if(data.toString().startsWith("Error"))
        {
            Toast.makeText(c,data.toString(),Toast.LENGTH_SHORT).show();
        }else {
            //PARSE DATA
            new RSSParser(c, (InputStream) data,rv).execute();

        }

    }
    private Object downloadData()
    {
        Object connection=Connector.connect(urlAddress);
        if(connection.toString().startsWith("Error"))
        {
            return connection.toString();
        }

        try
        {
            HttpURLConnection con= (HttpURLConnection) connection;
            int responseCode=con.getResponseCode();

            if(responseCode==con.HTTP_OK)
            {
                InputStream is=new BufferedInputStream(con.getInputStream());
                return is;
            }

            return ErrorTracker.RESPONSE_EROR+con.getResponseMessage();

        } catch (IOException e) {
            e.printStackTrace();
            return ErrorTracker.IO_EROR;
        }

    }
}
```

**RSS Parser class**

Main Responsibility : DOWNLOAD XML FEEDS.

- It receives raw XML feeds from downloader class.
- It then processes/parses these feeds.
- We use XmlPullParser to parse the feeds.
- It then fills an arraylist of Article Objects with our results.
- It then sends this arraylist to adapter for binding purposes.

```java
package com.tutorials.hp.recyclerrssmdetail.m_RSS;

import android.app.ProgressDialog;
import android.content.Context;
import android.os.AsyncTask;
import android.support.v7.widget.RecyclerView;
import android.widget.Toast;

import com.tutorials.hp.recyclerrssmdetail.m_DataObject.Article;
import com.tutorials.hp.recyclerrssmdetail.m_UI.MyAdapter;

import org.xmlpull.v1.XmlPullParser;
import org.xmlpull.v1.XmlPullParserException;
import org.xmlpull.v1.XmlPullParserFactory;

import java.io.IOException;
import java.io.InputStream;
import java.util.ArrayList;

public class RSSParser extends AsyncTask<Void,Void,Boolean> {

    Context c;
    InputStream is;
    RecyclerView rv;

    ProgressDialog pd;
    ArrayList<Article> articles=new ArrayList<>();

    public RSSParser(Context c, InputStream is, RecyclerView rv) {
        this.c = c;
        this.is = is;
        this.rv = rv;
    }
    @Override
    protected void onPreExecute() {
        super.onPreExecute();
        pd=new ProgressDialog(c);
        pd.setTitle("Parse Articles");
        pd.setMessage("Parsing..Please wait");
        pd.show();
    }

    @Override
    protected Boolean doInBackground(Void... params) {
        return this.parseRSS();
    }

    @Override
    protected void onPostExecute(Boolean isParsed) {
        super.onPostExecute(isParsed);

        pd.dismiss();
        if(isParsed)
        {
            //BIND
            rv.setAdapter(new MyAdapter(c,articles));

        }else {
            Toast.makeText(c,"Unable To Parse",Toast.LENGTH_SHORT).show();
        }
    }

    private Boolean parseRSS()
    {
        try
        {
            XmlPullParserFactory factory=XmlPullParserFactory.newInstance();
            XmlPullParser parser=factory.newPullParser();

            parser.setInput(is,null);
            int event=parser.getEventType();

            String tagValue=null;
            Boolean isSiteMeta=true;

            articles.clear();
            Article article=new Article();

            do {

                String tagName=parser.getName();

                switch (event)
                {
                    case XmlPullParser.START_TAG:

                        if(tagName.equalsIgnoreCase("item"))
                        {
                            article=new Article();
                            isSiteMeta=false;
                        }

                        break;

                    case XmlPullParser.TEXT:
                        tagValue=parser.getText();
                        break;

                    case XmlPullParser.END_TAG:

                        if(!isSiteMeta)
                        {
                            if(tagName.equalsIgnoreCase("title"))
                            {
                                article.setTitle(tagValue);

                            }else  if(tagName.equalsIgnoreCase("description"))
                            {
                                article.setDescription(tagValue);

                            }else  if(tagName.equalsIgnoreCase("pubDate"))
                            {
                                article.setDate(tagValue);

                            }else  if(tagName.equalsIgnoreCase("guid"))
                            {
                                article.setGuid(tagValue);

                            }else  if(tagName.equalsIgnoreCase("link"))
                            {
                                article.setLink(tagValue);

                            }
                        }

                        if(tagName.equalsIgnoreCase("item"))
                        {
                            articles.add(article);
                            isSiteMeta=true;
                        }

                        break;

                }

                event=parser.next();

            }while (event != XmlPullParser.END_DOCUMENT);

            return true;

        } catch (XmlPullParserException e) {
            e.printStackTrace();
        } catch (IOException e) {
            e.printStackTrace();
        }

        return false;
    }
}
```

**Error Tracker class**

Main Responsibility : HELP US TRACK CONNECTION EXCEPTIONS AT RUNTIME

-  Consists of constants that we shall display when we encounter error at runtime.

```java
package com.tutorials.hp.recyclerrssmdetail.m_RSS;

public class ErrorTracker {

    public final static String WRONG_URL_FORMAT="Error : Wrong URL Format";
    public final static String CONNECTION_ERROR="Error : Unable To Establish Connection";
    public final static String IO_EROR="Error : Unable To Read";
    public final static String RESPONSE_EROR="Error : Bad Response - ";
}
```

## SECTION 3 : ReyclerView classes

**ItemClickListener Interface**

Main Responsibility : DEFINES SIGNATURE FOR OUR EVENT HANDLER

- Our method shall take the position of the clicked item as a parameter.

```java
package com.tutorials.hp.recyclerrssmdetail.m_UI;

public interface ItemClickListener {
    void onItemClick(int pos);
}
```

**View Holder class**

Main Responsibility : HOLD VIEWS FOR RECYCLING.

- In this case textviews.
- Subclasses RecyclerView.ViewHolder.

```java
package com.tutorials.hp.recyclerrssmdetail.m_UI;

import android.support.v7.widget.RecyclerView;
import android.view.View;
import android.widget.TextView;

import com.tutorials.hp.recyclerrssmdetail.R;

public class MyViewHolder extends RecyclerView.ViewHolder implements View.OnClickListener {

    TextView titleTxt,descTxt,dateTxt;
    ItemClickListener itemClickListener;

    public MyViewHolder(View itemView) {
        super(itemView);

        titleTxt=(TextView)itemView.findViewById(R.id.titleTxt);
        descTxt=(TextView)itemView.findViewById(R.id.descTxt);
        dateTxt=(TextView)itemView.findViewById(R.id.dateTxt);

        itemView.setOnClickListener(this);

    }
    public void setItemClickListener(ItemClickListener itemClickListener)
    {
        this.itemClickListener=itemClickListener;
    }

    @Override
    public void onClick(View v) {
        this.itemClickListener.onItemClick(this.getLayoutPosition());
    }
}
```

**Adapter class**

Main Responsibility : HELPS US BIND CUSTOM DATA TO RECYCLERVIEW.

- Subclasses RecyclerView.Adapter
- Binds our dataset to our views.
- Shall receive an arraylist and a context.

```java
package com.tutorials.hp.recyclerrssmdetail.m_UI;

import android.content.Context;
import android.content.Intent;
import android.support.v7.widget.RecyclerView;
import android.text.Html;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;

import com.tutorials.hp.recyclerrssmdetail.R;
import com.tutorials.hp.recyclerrssmdetail.m_DataObject.Article;
import com.tutorials.hp.recyclerrssmdetail.m_DetailActivity.DetailActivity;

import java.util.ArrayList;

public class MyAdapter extends RecyclerView.Adapter<MyViewHolder> {

    Context c;
    ArrayList<Article> articles;

    public MyAdapter(Context c, ArrayList<Article> articles) {
        this.c = c;
        this.articles = articles;
    }

    @Override
    public MyViewHolder onCreateViewHolder(ViewGroup parent, int viewType) {
        View v= LayoutInflater.from(c).inflate(R.layout.model,parent,false);
        return new MyViewHolder(v);
    }

    @Override
    public void onBindViewHolder(MyViewHolder holder, int position) {

        Article article=articles.get(position);

        final String title=article.getTitle();
        final String desc=article.getDescription();
        final String date=article.getDate();
        final String guid=article.getGuid();
        final String link=article.getLink();

        holder.titleTxt.setText(title);
        holder.descTxt.setText(Html.fromHtml(desc));
        holder.dateTxt.setText(date);

        holder.setItemClickListener(new ItemClickListener() {
            @Override
            public void onItemClick(int pos) {
                openDetailActivity(title,desc,date,guid,link);
            }
        });

    }

    @Override
    public int getItemCount() {
        return articles.size();
    }

    private void openDetailActivity(String...details)
    {
        Intent i=new Intent(c, DetailActivity.class);

        i.putExtra("TITLE_KEY",details[0]);
        i.putExtra("DESC_KEY",details[1]);
        i.putExtra("DATE_KEY",details[2]);
        i.putExtra("GUID_KEY",details[3]);
        i.putExtra("LINK_KEY",details[4]);

        c.startActivity(i);
    }

}
```

## SECTION 4 : Our Activities

**Detail Activity class.**

Main Responsibility : DISPLAY SINGLE NEWS ARTICLE DETAILS

- Data shall be passed via Bundle from MainActivity.
- So we simply unpack that data.
- Then show it in our views.

```java
package com.tutorials.hp.recyclerrssmdetail.m_DetailActivity;

import android.content.Intent;
import android.os.Bundle;
import android.support.design.widget.FloatingActionButton;
import android.support.design.widget.Snackbar;
import android.support.v7.app.AppCompatActivity;
import android.support.v7.widget.Toolbar;
import android.text.Html;
import android.view.View;
import android.widget.TextView;

import com.tutorials.hp.recyclerrssmdetail.R;

public class DetailActivity extends AppCompatActivity {

    TextView titleTxt,descTxt,dateTxt,guidTxt,linkTxt;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_detail);
        Toolbar toolbar = (Toolbar) findViewById(R.id.toolbar);
        setSupportActionBar(toolbar);
        FloatingActionButton fab = (FloatingActionButton) findViewById(R.id.fab);

        titleTxt= (TextView) findViewById(R.id.titleDetailTxt);
        descTxt= (TextView) findViewById(R.id.descDetailTxt);
        dateTxt= (TextView) findViewById(R.id.dateDetailTxt);
        guidTxt= (TextView) findViewById(R.id.guidDetailTxt);
        linkTxt= (TextView) findViewById(R.id.linkDetailTxt);

        Intent i=this.getIntent();

        String title=i.getExtras().getString("TITLE_KEY");
        String desc=i.getExtras().getString("DESC_KEY");
        String date=i.getExtras().getString("DATE_KEY");
        String guid=i.getExtras().getString("GUID_KEY");
        String link=i.getExtras().getString("LINK_KEY");

        titleTxt.setText(title);
        descTxt.setText(Html.fromHtml(desc));
        dateTxt.setText(date);
        guidTxt.setText(guid);
        linkTxt.setText(link);

        fab.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View view) {
                Snackbar.make(view, "Replace with your own action", Snackbar.LENGTH_LONG)
                        .setAction("Action", null).show();
            }
        });
    }

}
```

**MainActivity class.**

Main Responsibility : LAUNCH OUR APP.

- We shall reference the views like RecyclerView and Floating action button here,from our XML Layouts.
- We then execute our Downloader class when Floating action button is clicked.
- We shall also define here our feeds url and parse the data.

```java
package com.tutorials.hp.recyclerrssmdetail;

import android.os.Bundle;
import android.support.design.widget.FloatingActionButton;
import android.support.design.widget.Snackbar;
import android.support.v7.app.AppCompatActivity;
import android.support.v7.widget.LinearLayoutManager;
import android.support.v7.widget.RecyclerView;
import android.support.v7.widget.Toolbar;
import android.view.View;
import android.view.Menu;
import android.view.MenuItem;

import com.tutorials.hp.recyclerrssmdetail.m_RSS.Downloader;

public class MainActivity extends AppCompatActivity {

    final static String urlAddress="http://10.0.2.2/galacticnews/index.php/feed";

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);
        Toolbar toolbar = (Toolbar) findViewById(R.id.toolbar);
        setSupportActionBar(toolbar);
        FloatingActionButton fab = (FloatingActionButton) findViewById(R.id.fab);

        final RecyclerView rv= (RecyclerView) findViewById(R.id.rv);
        rv.setLayoutManager(new LinearLayoutManager(this));

        fab.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View view) {

                new Downloader(MainActivity.this,urlAddress,rv).execute();
            }
        });
    }

}
```

## SECTION 5 : Our Layouts

**MAINACTIVITY LAYOUTS**

**ActivityMain.xml Layout.**

- Inflated as our activity's view.
- Includes our content main.

```xml
<?xml version="1.0" encoding="utf-8"?>
<android.support.design.widget.CoordinatorLayout

    android_layout_width="match_parent"
    android_layout_height="match_parent"
    android_fitsSystemWindows="true"
    tools_context="com.tutorials.hp.recyclerrssmdetail.MainActivity">

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

**ContentMain.xml Layout.**

- Defines our view hierarchy.

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
    tools_context="com.tutorials.hp.recyclerrssmdetail.MainActivity"
    tools_showIn="@layout/activity_main">

    <android.support.v7.widget.RecyclerView
        android_id="@+id/rv"
        android_layout_width="wrap_content"
        android_layout_height="wrap_content"
        />
</RelativeLayout>
```

**Model.xml Layout.**

- Inflated as our RecyclerView's viewitems.

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
                android_text="Title"
                android_id="@+id/titleTxt"
                android_padding="10dp"
                android_textColor="@color/colorAccent"
                android_textStyle="bold"
                android_layout_alignParentLeft="true"
                />

            <TextView
                android_layout_width="wrap_content"
                android_layout_height="wrap_content"
                android_textAppearance="?android:attr/textAppearanceLarge"
                android_text="Description....................."
                android_lines="3"
                android_id="@+id/descTxt"
                android_padding="10dp"
                android_layout_alignParentLeft="true"
                />

            <TextView
                android_layout_width="wrap_content"
                android_layout_height="wrap_content"
                android_textAppearance="?android:attr/textAppearanceMedium"
                android_text="Date"
                android_textStyle="italic"
                android_id="@+id/dateTxt" />

    </LinearLayout>

</android.support.v7.widget.CardView>
```

**DETAILACTIVITY LAYOUTS**

**ActivityDetail.xml Layout.**

- Inflated as our  detail activity's view.
- Includes our content detail.

```
<?xml version="1.0" encoding="utf-8"?>
<android.support.design.widget.CoordinatorLayout

    android_layout_width="match_parent"
    android_layout_height="match_parent"
    android_fitsSystemWindows="true"
    tools_context="com.tutorials.hp.gridviewrssmdetail.m_DetailActivity.DetailActivity">

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

    <include layout="@layout/content_detail" />

    <android.support.design.widget.FloatingActionButton
        android_id="@+id/fab"
        android_layout_width="wrap_content"
        android_layout_height="wrap_content"
        android_layout_gravity="bottom|end"
        android_layout_margin="@dimen/fab_margin"
        android_src="@android:drawable/ic_dialog_email" />

</android.support.design.widget.CoordinatorLayout>
```

**ContentDetail.xml Layout.**

- Defines our detail view hierarchy.

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
    tools_context="com.tutorials.hp.gridviewrssmdetail.m_DetailActivity.DetailActivity"
    android_background="#009688"
    tools_showIn="@layout/activity_detail">

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
                    android_layout_width="320dp"
                    android_layout_height="wrap_content"
                    android_paddingLeft="10dp"
                    android_layout_alignParentTop="true"
                    android_scaleType="centerCrop"
                    android_src="@drawable/spitzer" />

                <LinearLayout
                    android_orientation="vertical"
                    android_layout_width="match_parent"
                    android_layout_height="wrap_content">

                <TextView
                    android_id="@+id/titleDetailTxt"
                    android_layout_width="wrap_content"
                    android_layout_height="wrap_content"
                    android_textAppearance="?android:attr/textAppearanceLarge"
                    android_padding="5dp"
                    android_minLines="1"
                    android_textStyle="bold"
                    android_textColor="@color/colorAccent"
                    android_text="Title" />
                <TextView
                    android_id="@+id/dateDetailTxt"
                    android_layout_width="wrap_content"
                    android_layout_height="wrap_content"
                    android_textAppearance="?android:attr/textAppearanceLarge"
                    android_padding="5dp"
                    android_minLines="1"
                    android_text="DATE" />

                   </LinearLayout>
            </LinearLayout>
            <TextView
                android_id="@+id/guidDetailTxt"
                android_layout_width="wrap_content"
                android_layout_height="wrap_content"
                android_textAppearance="?android:attr/textAppearanceMedium"
                android_padding="5dp"
                android_minLines="1"
                android_text="GUID" />
            <LinearLayout
                android_layout_width="fill_parent"
                android_layout_height="match_parent"
                android_layout_marginTop="?attr/actionBarSize"
                android_orientation="vertical"
                android_paddingLeft="5dp"
                android_paddingRight="5dp"
                android_paddingTop="5dp">

                <TextView
                    android_id="@+id/linkDetailTxt"
                    android_layout_width="wrap_content"
                    android_layout_height="wrap_content"
                    android_textAppearance="?android:attr/textAppearanceMedium"
                    android_padding="5dp"
                    android_textColor="@color/colorPrimaryDark"
                    android_textStyle="italic"
                    android_text="Link" />

                    <TextView
                        android_id="@+id/descDetailTxt"
                        android_layout_width="wrap_content"
                        android_layout_height="wrap_content"
                        android_textAppearance="?android:attr/textAppearanceLarge"
                        android_padding="5dp"
                        android_textColor="#0f0f0f"
                        android_minLines="4"
                        android_text="John Doe joined this company on January May 1995 beforesome of you were born.He's been with us through thick and thin.When he came for the first time,he was naive and nervous.Now he is an experienced talent...." />

            </LinearLayout>

        </LinearLayout>
    </android.support.v7.widget.CardView>

</RelativeLayout>
```

### L
