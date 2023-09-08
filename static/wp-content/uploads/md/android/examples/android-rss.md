# Android RSS Tutorial and Examples


This is an android RSS images recyclerview example with XmlPullParser,AsyncTask ,HttpURLConnection and RecyclerView. We shall download RSS Feeds from a local website and then parse the feed.We then show parsed images and text news in our RecyclerView.


What we do :

- Connect to Internet and make a HTTP GET request using HtttpURLConnection.
- Download our data in the background thread.
- WE use AsyncTask for our threading.
- WE parse the downloaded xml feeds.
- We shall be parsing using XmlPullParser.
- We show our results in a RecyclerView.
- Our results shall consist of images and text.
- The website we shall be parsing was hosted locally and it was a dummy wordpress site.

Let's dive in.

#### SECTION 1 : Our Dependencies and Manifest

**Build.Gradle [App Level]**

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
        applicationId "com.tutorials.hp.recyclerrssimagestext"
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
   // compile project(':picasso-2.5.2')
    compile 'com.squareup.picasso:picasso:2.5.2'
}
```

**AndroidManifest.xml**

- Remember we are downloading data from a network.
- Hence we need to add permission to access the internet.
- Or else Android won't accept our requests for connection.

```xml
<?xml version="1.0" encoding="utf-8"?>
<manifest
    package="com.tutorials.hp.recyclerrssimagestext">

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
    </application>

</manifest>
```

## SECTION 2 : Our Data Object

**Article.java**

- Represents a single article.
- The article shall have various properties like name,title,date etc.

```java
package com.tutorials.hp.recyclerrssimagestext.m_DataObject;

public class Article {

    String title,description,date,imageUrl;

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

    public String getImageUrl() {
        return imageUrl;
    }

    public void setImageUrl(String imageUrl) {
        this.imageUrl = imageUrl;
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
package com.tutorials.hp.recyclerrssimagestext.m_RSS;

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

            //set properties
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
package com.tutorials.hp.recyclerrssimagestext.m_RSS;

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
        pd.setTitle("Fetch Article");
        pd.setMessage("Fetching...Please wait");
        pd.show();
    }

    @Override
    protected Object doInBackground(Void... params) {
        return downloadData();
    }

    @Override
    protected void onPostExecute(Object data) {
        super.onPostExecute(data);

        pd.dismiss();

        if(data.toString().startsWith("Error"))
        {
            Toast.makeText(c, data.toString(), Toast.LENGTH_SHORT).show();
        }else {
            //PARSE

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
package com.tutorials.hp.recyclerrssimagestext.m_RSS;

import android.app.ProgressDialog;
import android.content.Context;
import android.os.AsyncTask;
import android.support.v7.widget.RecyclerView;
import android.widget.Toast;

import com.tutorials.hp.recyclerrssimagestext.m_DataObject.Article;
import com.tutorials.hp.recyclerrssimagestext.m_UI.MyAdapter;

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
        pd.setTitle("Parse");
        pd.setMessage("Parsing...Please wait");
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
                            }else if(tagName.equalsIgnoreCase("description"))
                            {
                                String desc=tagValue;
                                article.setDescription(desc.substring(desc.indexOf("/>")+2));

                                //EXTRACT IMAGE FROM DESC
                                String imageUrl=desc.substring(desc.indexOf("src=")+5,desc.indexOf("jpg")+3);
                                article.setImageUrl(imageUrl);

                            }else if(tagName.equalsIgnoreCase("pubDate"))
                            {
                                article.setDate(tagValue);
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
package com.tutorials.hp.recyclerrssimagestext.m_RSS;

public class ErrorTracker {

    public final static String WRONG_URL_FORMAT="Error : Wrong URL Format";
    public final static String CONNECTION_ERROR="Error : Unable To Establish Connection";
    public final static String IO_EROR="Error : Unable To Read";
    public final static String RESPONSE_EROR="Error : Bad Response - ";

}
```

## SECTION 3 : ReyclerView classes

**View Holder class** Main Responsibility : HOLD VIEWS FOR RECYCLING.

- In this case textviews and imageviews.
- Subclasses RecyclerView.ViewHolder.

```java
package com.tutorials.hp.recyclerrssimagestext.m_UI;

import android.support.v7.widget.RecyclerView;
import android.view.View;
import android.widget.ImageView;
import android.widget.TextView;

import com.tutorials.hp.recyclerrssimagestext.R;

public class MyViewHolder extends RecyclerView.ViewHolder {

    TextView titleTxt,desctxt,dateTxt;
    ImageView img;

    public MyViewHolder(View itemView) {
        super(itemView);

        titleTxt= (TextView) itemView.findViewById(R.id.titleTxt);
        desctxt= (TextView) itemView.findViewById(R.id.descTxt);
        dateTxt= (TextView) itemView.findViewById(R.id.dateTxt);
        img= (ImageView) itemView.findViewById(R.id.articleImage);
    }
}
```

**Adapter class**

Main Responsibility : HELPS US BIND CUSTOM DATA TO RECYCLERVIEW.

- Subclasses RecyclerView.Adapter
- Binds our dataset to our views.
- Shall receive an arraylist and a context.

```java
package com.tutorials.hp.recyclerrssimagestext.m_UI;

import android.content.Context;
import android.support.v7.widget.RecyclerView;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;

import com.tutorials.hp.recyclerrssimagestext.R;
import com.tutorials.hp.recyclerrssimagestext.m_DataObject.Article;

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

        String title=article.getTitle();
        String desc=article.getDescription();
        String date=article.getDate();
        String imageUrl=article.getImageUrl().replace("localhost","10.0.2.2");

        holder.titleTxt.setText(title);
        holder.desctxt.setText(desc.substring(0,130));
        holder.dateTxt.setText(date);
        PicassoClient.downloadImage(c,imageUrl,holder.img);

    }

    @Override
    public int getItemCount() {
        return articles.size();
    }
}
```

## SECTION 4 : Our Activity

**MainActivity class.**

Main Responsibility : LAUNCH OUR APP.

- We shall reference the views like ListView and Floating action button here,from our XML Layouts.
- We then execute our Downloader class when Floating action button is clicked.
- We shall also define here our feeds url and parse the data.

```java
package com.tutorials.hp.recyclerrssimagestext;

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

import com.tutorials.hp.recyclerrssimagestext.m_RSS.Downloader;

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

**ActivityMain.xml Layout.**

- Inflated as our activity's view.
- Includes our content main.

```xml
<?xml version="1.0" encoding="utf-8"?>
<android.support.design.widget.CoordinatorLayout

    android_layout_width="match_parent"
    android_layout_height="match_parent"
    android_fitsSystemWindows="true"
    tools_context="com.tutorials.hp.recyclerrssimagestext.MainActivity">

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
    tools_context="com.tutorials.hp.recyclerrssimagestext.MainActivity"
    tools_showIn="@layout/activity_main">

    <android.support.v7.widget.RecyclerView
        android_id="@+id/rv"
        android_layout_width="match_parent"
        android_layout_height="wrap_content"
         />
</RelativeLayout>
```

**Model.xml Layout.**

- Inflated as our AdapterView's viewitems.

```xml
<?xml version="1.0" encoding="utf-8"?>
<android.support.v7.widget.CardView
    android_orientation="horizontal" android_layout_width="match_parent"

    android_layout_margin="10dp"
    card_view_cardCornerRadius="5dp"
    card_view_cardElevation="5dp"
    android_layout_height="200dp">

    <LinearLayout
        android_orientation="horizontal"
        android_layout_width="match_parent"
        android_layout_height="match_parent">
        <ImageView
            android_layout_width="150dp"
            android_layout_height="wrap_content"
            android_id="@+id/articleImage"
            android_padding="10dp"
            android_src="@drawable/placeholder" />

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

    </LinearLayout>

</android.support.v7.widget.CardView>
```

Cheers.

### Download

Download Code below.

[Download/Browse code here.](https://github.com/Oclemy/RecyclerRSSImagesText)
