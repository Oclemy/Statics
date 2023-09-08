# Retrofit JSON Examples


In this tutorial we will learn how to download JSON data from online and bind to adapterviews like gridview, listview and recyclerview. We will be using Retrofit as our HTTP Client. We will look at several full examples.


## Example 1: Android Retrofit – JSON GridView Images and Text

_Android Retrofit JSON GridView Example and Tutorial._

In this tutorial we want to see how to download JSON data from online, then parse that data using Google GSON and then bind the data to a custom GridView. The data will comprise images and text and we render them in custom cardviews. We use Retrofit, a modern and fast http client for android.

Let's start.

#### Video Tutorial

#### Demo

Here is the demo of this project.

![Android Retrofit GridView JSON](https://camposha.info/wp-content/uploads/2019/04/demo1-20.gif)

Android Retrofit GridView JSON

#### Build.gradle

This is where we add our dependencies. These dependencies in our case include:

1. AppCompat - a support library giving us access to the AppCompatActivity which we'll use as our `MainActivity`'s base class.
2. ConstraintLayout - Our constraint layout.
3. CardView - to give us the CardView class which will be the root element of our GridView.
4. [Retrofit](https://camposha.info/android/retrofit) - our http client.
5. Gson Converter - To map our JSON data to java classes.
6. Picasso - To load our images from online.

You add these in your app level `build.gradle` file.

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

#### MainActivity.java

##### Retrofit Classes We use

We will start by adding several import statements. These are for the several API's we'll use. And these include first the Retrofit2 classes like the:

1. `Call` - This is an interface that represents a HTTP call we make. Or a HTTP Request. In this case we will be making a HTTP GET request.
2. `Callback` - Represents the Callback that we receive. This can be a success callback or a failure callback. If it's a success callback then we get a response. Then we can parse that response or map to a [list](https://camposha.info/java/list) of our data objects. Then that list can then be bound to the gridview.
3. `Response` - Response the response we receive. That response will have our data.

##### Widget and View Related Classes We use

Not only will we use retrofit classes but we'll also have widgets and views. This is because the JSON data we download has to be rendered to the user. We use a widgets to successful render that complex data. Here are some classes we need.

1. BaseAdapter - Our json data we download is a complex data. Even after parsing it using the `GsonConverterFactory` we can't just render it without adapting it to our views. So we need a custom BaseAdapter class to allow that adaptation.
2. LayoutInflater - We have to create a custom gridview to handle our data. In fact not a custom gridview but gridview with custom view items. It means the gridview will have custom views. To create that custom views we need a custom layout. However for that layout to be converted to a View object it has to undergo a process called Layout Inflation. Basically parsing an xml layout into a view object. That needs the LayoutInflater class.
3. ProgressBar - To show progress of our download as we download data asynchronously.
4. ImageView - To render images from the web.
5. TextView - To render texts.
6. Toast - To show short messages when a given cardview in our gridview is clicked.

##### ImageLoading Classes

We will also be able to load our images from json. For that we can use one of the most popular imageloading libraries out there, Picasso, named after spanish Painter Pablo Picasso.

#### Marking Class Fields with Attributes

Firs we will be creating a data object class. This is a class representing our data object, in this case a Spacecraft. So basically our JSON data is a JSONArray comprising Spacecraft JSONObjects. We will be using Gson library to map our java data object to our json objects.

For that we need to flower our instance fields with attributes starting with `@SerializedName()`, where we pass the key of the JSON Object fields in that attribute.

```java
    class Spacecraft {
        /*
        INSTANCE FIELDS
         */
        @SerializedName("id")
        private int id;
        @SerializedName("name")
        private String name;
        @SerializedName("propellant")
        private String propellant;
        @SerializedName("imageurl")
        private String imageURL;
        @SerializedName("technologyexists")
        private int technologyExists;

        .....
```

##### Creating a Retrofit API interface

Retrofit is a type safe HTTP Client that's unique in that it allows you to represent your APIs using interface. For example in our project we are downloading json data from online. So we will be making a HTTP GET request. We can use represent that with an interface which then we can work with throughout our code.

Here's the interface we use in this example.

```java

    interface MyAPIService {

        @GET("/Oclemy/SampleJSON/338d9585/spacecrafts.json")
        Call<List<Spacecraft>> getSpacecrafts();
    }
```

##### Creating a Retrofit Factory class

That is a class responsible for hosting our factory or generator method. That is a method responsible for giving us one instance of Retrofit we can always be using. This prevents us from polluting our code with multiple instances of Retrofit which will make us make HTTP requests we don't intend.

Here's the class:

```java
    static class RetrofitClientInstance {

        private static Retrofit retrofit;
        private static final String BASE_URL = "https://raw.githubusercontent.com/";

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
```

You can see we've also supplied the Base url. Then we've checked if retrofit is null before obtaining it's instance.

##### Downloading JSON via Retrofit

This means making our HTTP GET call. But first we have to create our API service

```java
        MyAPIService myAPIService = RetrofitClientInstance.getRetrofitInstance().create(MyAPIService.class);
```

Then reference our `Call` object. We said the `Call` is an interface representing a HTTP Call. As a generic type we pass a List of spacecrafts. Then we invoke the method that will actually make the call.

```java
        Call<List<Spacecraft>> call = myAPIService.getSpacecrafts();
```

To actually make the call we have to invoke either `execute()` or `enqueue()`. We use the latter as it allows us make an asynchronous call, a call that is executed in the background thread. Thus we are able to not freeze our user interface.

Here's how we make the call and handle the response.

```java
        call.enqueue(new Callback<List<Spacecraft>>() {

            @Override
            public void onResponse(Call<List<Spacecraft>> call, Response<List<Spacecraft>> response) {
                myProgressBar.setVisibility(View.GONE);
                populateGridView(response.body());
            }
            @Override
            public void onFailure(Call<List<Spacecraft>> call, Throwable throwable) {
                myProgressBar.setVisibility(View.GONE);
                Toast.makeText(MainActivity.this, throwable.getMessage(), Toast.LENGTH_LONG).show();
            }
        });
```

Okay here's the complete code:

```java
package info.camposha.retrofitgridviewimages;

import android.content.Context;
import android.os.Bundle;
import android.support.v7.app.AppCompatActivity;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.BaseAdapter;
import android.widget.CheckBox;
import android.widget.ImageView;
import android.widget.GridView;
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

    class Spacecraft {
        /*
        INSTANCE FIELDS
         */
        @SerializedName("id")
        private int id;
        @SerializedName("name")
        private String name;
        @SerializedName("propellant")
        private String propellant;
        @SerializedName("imageurl")
        private String imageURL;
        @SerializedName("technologyexists")
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

        /*
        TOSTRING
         */
        @Override
        public String toString() {
            return name;
        }
    }

    interface MyAPIService {

        @GET("/Oclemy/SampleJSON/338d9585/spacecrafts.json")
        Call<List<Spacecraft>> getSpacecrafts();
    }

    static class RetrofitClientInstance {

        private static Retrofit retrofit;
        private static final String BASE_URL = "https://raw.githubusercontent.com/";

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

    class GridViewAdapter extends BaseAdapter{

        private List<Spacecraft> spacecrafts;
        private Context context;

        public GridViewAdapter(Context context,List<Spacecraft> spacecrafts){
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
            chkTechExists.setChecked( thisSpacecraft.getTechnologyExists()==1);
            chkTechExists.setEnabled(false);

            if(thisSpacecraft.getImageURL() != null && thisSpacecraft.getImageURL().length()>0)
            {
                Picasso.get().load(thisSpacecraft.getImageURL()).placeholder(R.drawable.placeholder).into(spacecraftImageView);
            }else {
                Toast.makeText(context, "Empty Image URL", Toast.LENGTH_LONG).show();
                Picasso.get().load(R.drawable.placeholder).into(spacecraftImageView);
            }

            view.setOnClickListener(new View.OnClickListener() {
                @Override
                public void onClick(View view) {
                    Toast.makeText(context, thisSpacecraft.getName(), Toast.LENGTH_SHORT).show();
                }
            });

            return view;
        }
    }

    private GridViewAdapter adapter;
    private GridView mGridView;
    ProgressBar myProgressBar;

    private void populateGridView(List<Spacecraft> spacecraftList) {
        mGridView = findViewById(R.id.mGridView);
        adapter = new GridViewAdapter(this,spacecraftList);
        mGridView.setAdapter(adapter);
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
                populateGridView(response.body());
            }
            @Override
            public void onFailure(Call<List<Spacecraft>> call, Throwable throwable) {
                myProgressBar.setVisibility(View.GONE);
                Toast.makeText(MainActivity.this, throwable.getMessage(), Toast.LENGTH_LONG).show();
            }
        });
    }
}
//end
```

#### activity_main.xml

This is the layout that will contain our main activity's layout. At the root we will be having a [LinearLayout](https://camposha.info/android/linearlayout), a class that arranges our items linearly. Inside it we have a TextView, a class that allows us render texts. Then we also have a Progressbar. The latter will allow us show progress as we download data in the background thread.

Finally we have a GridView, an adapterview that allows us render data in grids.

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
        android_text="Retrofit GridView JSON"
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

    <GridView
        android_id="@+id/mGridView"
        android_layout_weight="0.5"
        android_numColumns="auto_fit"
        android_layout_width="match_parent"
        android_layout_height="wrap_content" />
</LinearLayout>
```

#### model.xml

This layout will be inflated into a single item view for our GridView. At the root we have a CardView. This then allows our gridview to comprise of awesome cards. Inside the CardView we will have an imageview to render images. Also we have textviews and checkbox.

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
            android_id="@+id/spacecraftImageView"
            android_layout_width="match_parent"
            android_layout_height="150dp"
            android_padding="10dp"
            android_src="@drawable/placeholder"  />

        <TextView
            android_layout_width="wrap_content"
            android_layout_height="wrap_content"
            android_textAppearance="?android:attr/textAppearanceSmall"
            android_text="Name"
            android_id="@+id/nameTextView"
            android_padding="5dp"
            android_textColor="@color/colorAccent"
            android_layout_below="@+id/spacecraftImageView"
            android_layout_alignParentLeft="true"
            />
        <TextView
            android_layout_width="wrap_content"
            android_layout_height="wrap_content"
            android_textAppearance="?android:attr/textAppearanceSmall"
            android_text=" Propellant"
            android_textStyle="italic"
            android_id="@+id/propellantTextView"
            android_padding="5dp"
            android_layout_below="@+id/nameTextView"
            android_layout_alignParentLeft="true"
            />

        <CheckBox
            android_layout_width="wrap_content"
            android_layout_height="wrap_content"
            android_id="@+id/myCheckBox"
            android_text="Tech Exists?"
            android_layout_alignParentBottom="true"
            android_layout_alignParentRight="true" />

    </RelativeLayout>
</android.support.v7.widget.CardView>
```

#### AndroidManifest.xml

In your android manifest you have to add permission for internet connectivity. Read more about permissions here. If you don't add this permission then you application won't be able to access the internet.

```xml
    <uses-permission android_name="android.permission.INTERNET"/>
```

##### Download

Download the code [here]()

## Example 2: Android Retrofit – JSON ListView Images and Text

_Android Retrofit : JSON - Fill ListView with Images and Text._

In this tutorial we want to see how to download json data from online and using retrofit bind that data to a custom listview with images and text.

The json data represents a list of spacecrafts. We will use the GSON library to map that every jsonobject in our jsonarray into a `Spacecraft`.

Our custom listview will comprise image, checkbox and text. Every cardview will represent a single spacecraft.

So at the end of day we look into these:

1. [Retrofit](https://camposha.info/android/retrofit) - Our HTTP Client.
2. JSON - Our data format.We download them from online.
3. GSON - a JSON binding library.
4. [ListView](https://camposha.info/android/listview) - Will render our data.
5. Picasso - Will load our images from the web.

Let's start.

#### Video Tutorial(ProgrammingWizards TV Channel)

Well we have a video tutorial as an alternative to this. If you prefer tutorials like this one then it would be good you [subscribe to our YouTube channel](https://www.youtube.com/channel/UCpdkWp2zh5Qv1ZWlnqswdCw). Basically we have a TV for programming where do daily tutorials especially android.

#### **Android Retrofit JSON ListView Example**

Let's look at our example.

Here's the demo:

![Android Retrofit ListView JSON](https://camposha.info/wp-content/uploads/2019/04/demo1-19.gif)

Android Retrofit ListView JSON

#### 1\. Our Web Service

Well we have hosted some JSON data in GitHub to act as our web service.

The JSON comprises an array of JSON Objects. Each JSON Object comprises properties of our Spacecraft.

View the [JSON data here](https://raw.githubusercontent.com/Oclemy/SampleJSON/338d9585/spacecrafts.json).

#### 2\. Gradle Scripts

Here are our gradle scripts in our `build.gradle` file(s).

##### (a). build.gradle(app)

Here's our **app level** `build.gradle` file. We have the dependencies DSL where we add our dependencies.

This file is called app level `build.gradle` since it's located in the app folder of the project.

If you are using Android Studio version 3 and above use `implementation` keyword while if you are using a version less than 3 then still use the `compile` keyword.

Once you've modified this `build.gradle` file you have to sync your project. Android Studio will indeed prompt you to do so.

```groovy
dependencies {
    implementation fileTree(dir: 'libs', include: ['*.jar'])
    testImplementation 'junit:junit:4.12'
    implementation 'com.android.support:appcompat-v7:28.0.0-rc02'
    implementation 'com.android.support.constraint:constraint-layout:1.1.3'
    implementation "com.android.support:cardview-v7:28.0.0-rc02"
    implementation 'com.squareup.retrofit2:retrofit:2.4.0'
    implementation 'com.squareup.retrofit2:converter-gson:2.4.0'
    implementation 'com.squareup.picasso:picasso:2.71828'
}
```

#### 3\. Resoources.

[Android](https://camposha.info/android/introduction) platform provides a powerful and flexible way of adding static content as a resource.

These static content will also be packaged into the APK file. The static content will be stored either as a resource or as an asset.

Resources belong to a given type. These types can be:

1. Drawable.
2. Layout.
3. Value.

Let's start by looking at the layout resources

##### (a). model.xml

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

##### (b). activity_main.xml

This layout will get inflated into the main activity's user interface. This will happen via the Activity's `setContentView()` method which will require us to pass it the layout.

We will do so inside the `onCreate()` method of [Activity](https://camposha.info/android/activity).

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
        android_text="Retrofit ListView JSON"
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

#### 4\. Java Code.

Android apps can be mainly written in Java or Kotlin. These days however there are many frameworks like Flutter also which use languages like Dart.

In this class we are using Java programming language.

We will have these classes in our project.

##### (a). MainActivity.java

This is our launcher activity as the name suggests. This means it will be the main entry point to our app in that when the user clicks the icon for our app, this activity will get rendered first.

We override a method called `onCreate()`. Here we will start by inflating our main layout via the `setContentView()` method.

Our main activity is actually an [activity](https://camposha.info/android/activity) since it's deriving from the AppCompatActivity.

```java
package info.camposha.retrofitlistviewjson;

import android.content.Context;
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

    class Spacecraft {
        /*
        INSTANCE FIELDS
         */
        @SerializedName("id")
        private int id;
        @SerializedName("name")
        private String name;
        @SerializedName("propellant")
        private String propellant;
        @SerializedName("imageurl")
        private String imageURL;
        @SerializedName("technologyexists")
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

        /*
        TOSTRING
         */
        @Override
        public String toString() {
            return name;
        }
    }

    interface MyAPIService {

        @GET("/Oclemy/SampleJSON/338d9585/spacecrafts.json")
        Call<List<Spacecraft>> getSpacecrafts();
    }

    static class RetrofitClientInstance {

        private static Retrofit retrofit;
        private static final String BASE_URL = "https://raw.githubusercontent.com/";

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
            chkTechExists.setChecked( thisSpacecraft.getTechnologyExists()==1);
            chkTechExists.setEnabled(false);

            if(thisSpacecraft.getImageURL() != null && thisSpacecraft.getImageURL().length()>0)
            {
                Picasso.get().load(thisSpacecraft.getImageURL()).placeholder(R.drawable.placeholder).into(spacecraftImageView);
            }else {
                Toast.makeText(context, "Empty Image URL", Toast.LENGTH_LONG).show();
                Picasso.get().load(R.drawable.placeholder).into(spacecraftImageView);
            }

            view.setOnClickListener(new View.OnClickListener() {
                @Override
                public void onClick(View view) {
                    Toast.makeText(context, thisSpacecraft.getName(), Toast.LENGTH_SHORT).show();
                }
            });

            return view;
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

#### 5\. AndroidManifest.xml

We will need to add internet permission in our android manifest file using the `<uses-permission />` element:

```xml
<?xml version="1.0" encoding="utf-8"?>
<manifest
    package="info.camposha.retrofitlistviewjson">

    <uses-permission android_name="android.permission.INTERNET"/>

    <application
        android_allowBackup="true"
        android_icon="@mipmap/ic_launcher"
        android_label="@string/app_name"
        android_roundIcon="@mipmap/ic_launcher_round"
        android_supportsRtl="true"
        android_theme="@style/MyCustomMaterialTheme">
        <activity android_name=".MainActivity">
            <intent-filter>
                <action android_name="android.intent.action.MAIN" />

                <category android_name="android.intent.category.LAUNCHER" />
            </intent-filter>
        </activity>
    </application>

</manifest>
```

##### Download

[Direct Download](https://github.com/Oclemy/RetrofitListViewJSON/archive/master.zip)
