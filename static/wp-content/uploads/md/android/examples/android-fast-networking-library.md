# Android Fast Networking Library Tutorial and Examples

Fast Android Networking Library Tutorial and Examples.

In this tutorial we want to look at Fast Android Networking Library, how to install, use it then finally some full examples.


#### What is Fast Android Networking Library?

_[Fast Android Networking Library](https://github.com/amitshekhariitbhu/Fast-Android-Networking) is a Complete Android Networking Library that also supports HTTP/2 created by [Amit Shekhar](https://github.com/amitshekhariitbhu), a popular open source contributor._

It provides us with powerful networking capabilities yet in an elegant manner. It's a mature library and is currently one of the most popular networking library.

Fast Android Networking Library allows us perform any type of networking in Android applications.

It's a library built on top of OkHttp Networking Layer.

Fast Android Networking Library does alot of work for you in the background, such that you only make your request and listen for the response.

\\===

#### Top Reasons to start using Fast Android Networking ?

Here are some of the reasons why you need to consider using this library for networking needs in android.

1. Android Framework Engineers in the recent years got rid of `HttpClient`, that is in Android Marshmallow(Android M). Because of this alot of networking libraries like Volley became obsolete.
2. Fast Android Networking does allows you do these things easier than any other library:
    1. Making HTTP requests.
    2. Downloading any type of file.
    3. Uploading files.
    4. Loading image from network into ImageView, etc.
3. Fast Networking Library provides a simple interface for doing all types of things in networking like setting priority, cancelling, etc.
4. Fast Networking Library uses Okio hence no more GC overhead in android applications. Okio is made to handle GC overhead while allocating memory. Okio does some clever things to save CPU and memory.
5. Fast Networking Library is built on top of the proven OkHttp.
6. Fast Networking Libary supports HTTP/2.

#### Requirements

Fast Android Networking Library is generous with it's requirements.

To use it you need:

1. Android 2.3 (Gingerbread) and later.

#### Fast Networking Libary Installation

To insall Fast Networking Library, head over to your app level and add it as a dependency:

```groovy
implementation 'com.amitshekhar.android:android-networking:1.0.2'
```

Then in your android manifest don't forget to add permission:

```xml
<uses-permission android_name="android.permission.INTERNET" />
```

#### Using it in Java

Well once you've installed it you can head over to your java code and initialize it first:

```java
AndroidNetworking.initialize(getApplicationContext());
```

##### 1\. How to make a HTTP GET Request in Fast Networking Library

You invoke the `AndroidNetworking.get()` method:

```java
AndroidNetworking.get("https://fierce-cove-29863.herokuapp.com/getAllUsers/{pageNumber}")
                 .addPathParameter("pageNumber", "0")
                 .addQueryParameter("limit", "3")
                 .addHeaders("token", "1234")
                 .setTag("test")
                 .setPriority(Priority.LOW)
                 .build()
                 .getAsJSONArray(new JSONArrayRequestListener() {
                    @Override
                    public void onResponse(JSONArray response) {
                      // do anything with response
                    }
                    @Override
                    public void onError(ANError error) {
                      // handle error
                    }
                });
```

##### 2\. How to make a HTTP PSOT Request in Fast Networking Library

You invoke the `AndroidNetworking.post()` method:

```java
AndroidNetworking.post("https://fierce-cove-29863.herokuapp.com/createAnUser")
                 .addBodyParameter("firstname", "Amit")
                 .addBodyParameter("lastname", "Shekhar")
                 .setTag("test")
                 .setPriority(Priority.MEDIUM)
                 .build()
                 .getAsJSONObject(new JSONObjectRequestListener() {
                    @Override
                    public void onResponse(JSONObject response) {
                      // do anything with response
                    }
                    @Override
                    public void onError(ANError error) {
                      // handle error
                    }
                });
```

##### 3\. How to Download a File in Fast Networking Library

You invoke the `AndroidNetworking.download()` method:

```java
AndroidNetworking.download(url,dirPath,fileName)
                 .setTag("downloadTest")
                 .setPriority(Priority.MEDIUM)
                 .build()
                 .setDownloadProgressListener(new DownloadProgressListener() {
                    @Override
                    public void onProgress(long bytesDownloaded, long totalBytes) {
                      // do anything with progress
                    }
                 })
                 .startDownload(new DownloadListener() {
                    @Override
                    public void onDownloadComplete() {
                      // do anything after completion
                    }
                    @Override
                    public void onError(ANError error) {
                      // handle error
                    }
                });
```

##### 4\. How to Upload a File to Server in Fast Networking Library

You invoke the `AndroidNetworking.upload()` method:

```java
AndroidNetworking.upload(url)
                 .addMultipartFile("image",file)
                 .addMultipartParameter("key","value")
                 .setTag("uploadTest")
                 .setPriority(Priority.HIGH)
                 .build()
                 .setUploadProgressListener(new UploadProgressListener() {
                    @Override
                    public void onProgress(long bytesUploaded, long totalBytes) {
                      // do anything with progress
                    }
                 })
                 .getAsJSONObject(new JSONObjectRequestListener() {
                    @Override
                    public void onResponse(JSONObject response) {
                      // do anything with response
                    }
                    @Override
                    public void onError(ANError error) {
                      // handle error
                    }
                 });
```

## Example: Download JSON with Images Text and populate GridView

_How to populate custom gridview with json data containing images and text._

In this tutorial we want to se how to download some JSON data from online asynchronously, parse that data and bind to a custom gridview with cardviews.

We are fetching images and text in our gridview. So our custom gridview will have cardviews that render for us images and text in a nice way.

We will be using the Fast Networking library which is built on top OkHttp. This will provide us with a fast and easy to work networking capability.

We are making a HTTP GET request. As our data is downloaded, we will show an indeterminate progressbar will be hidden automatically when the data download is finish.

This allows us to show user the download progress. In case of any error, we will show a Toast message containing details about the error so that you can view it at runtime, which is very important for newbies.

Let's start.

#### What You Learn

1. Handling JSON data containing images and text in android.
2. Using Fast Networking Library with JSON and GridView.
3. How to create custom gridview with cardviews containing images and text.
4. Loading JSON data asynchronousl with progress bar.

#### Project structure

#### Build.gradle

Given we will be using Fast Android Networking Library, we have to add its dependency.

```groovy
dependencies {
    implementation fileTree(dir: 'libs', include: ['*.jar'])
    testImplementation 'junit:junit:4.12'
    implementation 'com.android.support:appcompat-v7:26.+'
    implementation 'com.android.support:cardview-v7:26.+'
    implementation 'com.android.support:design:26.+'
    implementation 'com.amitshekhar.android:android-networking:1.0.1'
    implementation 'com.squareup.picasso:picasso:2.71828'
}
```

#### AndroidManifest.xml

We will be fetching our json data from online so we have to add internet permission in our android manifest.

```xml
<?xml version="1.0" encoding="utf-8"?>
<manifest
    package="info.camposha.jsoncardviewsgridview">
...
    <uses-permission android_name="android.permission.INTERNET"/>
....
</manifest>
```

##### (b). build.gradle(project)

This is our **project level** **build.gradle** file. It's sometimes called root level `build.gradle` file since it's located at the project's root folder.

Most of the time we modify this file if we want to register another repository where probably one of our dependencies will be downloaded.

We normally register under the allProject's DSL.

#### Resources.

[Android](https://camposha.info/android/introduction) platform provides a powerful and flexible way of adding static content as a resource.

These static content will also be packaged into the APK file. The static content will be stored either as a resource or as an asset.

Resources belong to a given type. These types can be:

1. Drawable.
2. Layout.
3. Value.

Let's start by looking at the layout resources

##### (a). activity_main.xml

This layout will get inflated into the main activity's user interface. This will happen via the Activity's `setContentView()` method which will require us to pass it the layout.

We will do so inside the `onCreate()` method of [Activity](https://camposha.info/android/activity).

```xml
<?xml version="1.0" encoding="utf-8"?>
<LinearLayout

    android_layout_width="match_parent"
    android_layout_height="match_parent"
    android_orientation="vertical"
    tools_context="info.camposha.jsoncardviewsgridview.MainActivity">
    <TextView
        android_id="@+id/textView"
        android_layout_width="match_parent"
        android_layout_height="wrap_content"
        android_text="Spacecrafts App"
        android_textAlignment="center"
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

    <GridView
        android_id="@+id/myGridView"
        android_layout_weight="0.5"
        android_numColumns="auto_fit"
        android_layout_width="match_parent"
        android_layout_height="wrap_content" />
    <Button
        android_id="@+id/downloadBtn"
        android_layout_width="match_parent"
        android_layout_height="wrap_content"
        android_background="@color/colorAccent"
        android_text="Download" />
</LinearLayout>
```

##### (b). row_model.xml

This will define our custom cardview which will be our grid item for our GridView.

```xml
<?xml version="1.0" encoding="utf-8"?>
<android.support.v7.widget.CardView

    android_layout_width="match_parent"

    android_layout_margin="5dp"
    card_view_cardCornerRadius="5dp"
    card_view_cardElevation="10dp"
    android_layout_height="300dp">

    <RelativeLayout
        android_layout_width="match_parent"
        android_layout_height="match_parent">

        <ImageView
            android_id="@+id/imageView"
            android_layout_width="match_parent"
            android_layout_height="150dp"
            android_padding="10dp"
            android_src="@drawable/placeholder"
             />

            <TextView
                android_layout_width="wrap_content"
                android_layout_height="wrap_content"
                android_textAppearance="?android:attr/textAppearanceSmall"
                android_text="Quote"
                android_id="@+id/quoteTxt"
                android_padding="5dp"
                android_layout_below="@+id/imageView"
                android_layout_alignParentLeft="true"
                />
            <TextView
                android_layout_width="wrap_content"
                android_layout_height="wrap_content"
                android_textAppearance="?android:attr/textAppearanceSmall"
                android_text=" Author --------------------"
                android_id="@+id/authorTxt"
                android_textColor="@color/colorAccent"
                android_padding="5dp"
                android_layout_below="@+id/quoteTxt"
                android_layout_alignParentLeft="true"
                />

        <CheckBox
            android_id="@+id/chkTechExists"
            android_layout_width="wrap_content"
            android_layout_height="wrap_content"
            android_layout_alignParentBottom="true"
            android_layout_alignParentEnd="true"
            android_layout_alignParentRight="true"
            android_layout_marginBottom="13dp"
            android_layout_marginEnd="13dp"
            android_layout_marginRight="13dp"
            android_checked="true"
            android_text="Technology Exists?" />

    </RelativeLayout>

</android.support.v7.widget.CardView>
```

#### Java Code.

Android apps can be mainly written in Java or Kotlin. These days however there are many frameworks like Flutter also which use languages like Dart.

In this class we are using Java programming language.

We will have these classes in our project.

##### (a). MainActivity.java

This is our launcher activity as the name suggests. This means it will be the main entry point to our app in that when the user clicks the icon for our app, this activity will get rendered first.

We override a method called `onCreate()`. Here we will start by inflating our main layout via the `setContentView()` method.

Our main activity is actually an [activity](https://camposha.info/android/activity) since it's deriving from the AppCompatActivity.

```java
package info.camposha.jsoncardviewsgridview;

import android.content.Context;
import android.os.Bundle;
import android.support.v7.app.AppCompatActivity;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.BaseAdapter;
import android.widget.Button;
import android.widget.CheckBox;
import android.widget.GridView;
import android.widget.ImageView;
import android.widget.ProgressBar;
import android.widget.TextView;
import android.widget.Toast;

import com.androidnetworking.AndroidNetworking;
import com.androidnetworking.common.Priority;
import com.androidnetworking.error.ANError;
import com.androidnetworking.interfaces.JSONArrayRequestListener;
import com.squareup.picasso.Picasso;

import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;

import java.util.ArrayList;

public class MainActivity extends AppCompatActivity {

    /*
    Our data object
     */
    public class Spacecraft {
        /*
        INSTANCE FIELDS
         */
        private int id;
        private String name;
        private String propellant;
        private String imageURL;
        private int technologyExists;
        /*
        GETTERS AND SETTERS
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
        public void setEmail(String propellant) {
            this.propellant = propellant;
        }
        public String getImageURL() {
            return imageURL;
        }
        public void setImageURL(String imageURL) {
            this.imageURL = imageURL;
        }
        public int getTechnologyExists() {
            return technologyExists;
        }
        public void setTechnologyExists(int technologyExists) {
            this.technologyExists = technologyExists;
        }
        /*
        TOSTRING
         */
        @Override
        public String toString() {
            return name;
        }
    }
    /*
    Our custom adapter class
     */
    public class GridViewAdapter extends BaseAdapter {

        Context c;
        ArrayList<Spacecraft> spacecrafts;

        public GridViewAdapter(Context c, ArrayList<Spacecraft> spacecrafts) {
            this.c = c;
            this.spacecrafts = spacecrafts;
        }
        @Override
        public int getCount() {
            return spacecrafts.size();
        }
        @Override
        public Object getItem(int i) {
            return spacecrafts.get(i);
        }
        @Override
        public long getItemId(int i) {
            return i;
        }
        @Override
        public View getView(int i, View view, ViewGroup viewGroup) {
            if(view==null)
            {
                view= LayoutInflater.from(c).inflate(R.layout.row_model,viewGroup,false);
            }

            TextView txtName = view.findViewById(R.id.quoteTxt);
            TextView txtPropellant = view.findViewById(R.id.authorTxt);
            CheckBox chkTechExists = view.findViewById(R.id.chkTechExists);
            ImageView spacecraftImageView = view.findViewById(R.id.imageView);

            final Spacecraft s= (Spacecraft) this.getItem(i);

            txtName.setText(s.getName());
            txtPropellant.setText(s.getPropellant());
            chkTechExists.setEnabled(true);
            chkTechExists.setChecked( s.getTechnologyExists()==1);
            chkTechExists.setEnabled(false);

            if(s.getImageURL() != null && s.getImageURL().length()>0)
            {
                Picasso.get().load(s.getImageURL()).placeholder(R.drawable.placeholder).into(spacecraftImageView);
            }else {
                Toast.makeText(c, "Empty Image URL", Toast.LENGTH_LONG).show();
                Picasso.get().load(R.drawable.placeholder).into(spacecraftImageView);
            }
            view.setOnClickListener(new View.OnClickListener() {
                @Override
                public void onClick(View view) {
                    Toast.makeText(c, s.getName(), Toast.LENGTH_SHORT).show();
                }
            });

            return view;
        }
    }

    /*
    Our HTTP Client
     */
    public class JSONDownloader {

        //SAVE/RETRIEVE URLS
        private static final String JSON_DATA_URL="https://cdn.rawgit.com/Oclemy/SampleJSON/338d9585/spacecrafts.json";
        //INSTANCE FIELDS
        private final Context c;
        private GridViewAdapter adapter ;

        public JSONDownloader(Context c) {
            this.c = c;
        }
        /*
        RETRIEVE/SELECT/REFRESH
         */
        public void retrieve(final GridView gv, final ProgressBar myProgressBar)
        {
            final ArrayList<Spacecraft> spacecrafts = new ArrayList<>();

            myProgressBar.setIndeterminate(true);
            myProgressBar.setVisibility(View.VISIBLE);

            AndroidNetworking.get(JSON_DATA_URL)
                    .setPriority(Priority.HIGH)
                    .build()
                    .getAsJSONArray(new JSONArrayRequestListener() {
                        @Override
                        public void onResponse(JSONArray response) {
                            JSONObject jo;
                            Spacecraft s;
                            try
                            {
                                for(int i=0;i<response.length();i++)
                                {
                                    jo=response.getJSONObject(i);

                                    int id=jo.getInt("id");
                                    String name=jo.getString("name");
                                    String propellant=jo.getString("propellant");
                                    String techExists=jo.getString("technologyexists");
                                    String imageURL=jo.getString("imageurl");

                                    s=new Spacecraft();
                                    s.setId(id);
                                    s.setName(name);
                                    s.setEmail(propellant);
                                    s.setImageURL(imageURL);
                                    s.setTechnologyExists(techExists.equalsIgnoreCase("1") ? 1 : 0);

                                    spacecrafts.add(s);
                                }

                                //SET TO SPINNER
                                adapter =new GridViewAdapter(c,spacecrafts);
                                gv.setAdapter(adapter);
                                myProgressBar.setVisibility(View.GONE);

                            }catch (JSONException e)
                            {
                                myProgressBar.setVisibility(View.GONE);
                                Toast.makeText(c, "GOOD RESPONSE BUT JAVA CAN'T PARSE JSON IT RECEIEVED. "+e.getMessage(), Toast.LENGTH_LONG).show();
                            }
                        }
                        //ERROR
                        @Override
                        public void onError(ANError anError) {
                            anError.printStackTrace();
                            myProgressBar.setVisibility(View.GONE);
                            Toast.makeText(c, "UNSUCCESSFUL :  ERROR IS : "+anError.getMessage(), Toast.LENGTH_LONG).show();
                        }
                    });
        }
    }

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);

        final GridView myGridView= findViewById(R.id.myGridView);
        Button btnRetrieve= findViewById(R.id.downloadBtn);
        final ProgressBar myProgressBar= findViewById(R.id.myProgressBar);

        //EVENTS : RETRIEVE
        btnRetrieve.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View view) {
                new JSONDownloader(MainActivity.this).retrieve(myGridView,myProgressBar);

            }
        });
    }
}
```
