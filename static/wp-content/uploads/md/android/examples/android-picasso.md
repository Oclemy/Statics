# Kotlin Android Picasso ImageLoader Examples

In Android Ecosystem, `Picasso` is the grandfather of image loaders. In recent years newer libraries like [`Glide`](https://android.camposha.info/en/glide) and [`Coil`](https://android.camposha.info/en/picasso) have come to offer alternatives but Picasso still goes strong. This is courtesy of it's ease of use as well as reliability.

The library still gets maintained by Square and is truly one of the best android libraries out there. In this tutorial we will look at simple Picasso [ImageLoader](https://android.camposha.info/en/category/imageloader/) examples, with both Kotlin and Java as our programming languages.


## How to install Picasso

Download the latest AAR from [Maven Central](https://search.maven.org/search?q=g:com.squareup.picasso%20AND%20a:picasso) or grab via Gradle:

```groovy
implementation 'com.squareup.picasso:picasso:2.8'
```

or Maven:

```xml
<dependency>
  <groupId>com.squareup.picasso</groupId>
  <artifactId>picasso</artifactId>
  <version>2.8</version>
</dependency>
```

Snapshots of the development version are available in [Sonatype's `snapshots` repository](https://s01.oss.sonatype.org/content/repositories/snapshots/).

> Picasso requires at minimum Java 8 and API 21.

## Example 1: Kotlin Android Simple Gallery with Picasso

In this example we will look at how to use Picasso to create a simple gallery based on recyclerview. The user opens the app and images are loaded onto the recyclerview using Picasso.

If the user clicks a single image, a full screen activity is opened and the image is still rendered onto the imageview via Picasso.

Here is the demos of what is created. First a recyclerview lists the images:

![Kotlin ANdroid RecyclerView Picasso](https://github.com/alirezabashi98/RecyclerView-v2-and-Picasso/raw/master/scr001.png)

And here is the full screen activity rendering the image: ![Kotlin Android Picasso Full Screen](https://github.com/alirezabashi98/RecyclerView-v2-and-Picasso/raw/master/scr002.png)

### Step 1: Install Picasso

You start by adding dependencies. We need a recyclerview as well as Picasso. Picasso is a third party library. Add these in your build.gradle file:

```groovy
    implementation 'androidx.recyclerview:recyclerview:1.1.0'
    implementation 'com.squareup.picasso:picasso:2.71828'
```

### Step 2: Add Internet Permission

You need internet permission to be able to download images from online. Thus add the following permission in yur android manifest file:

```xml
    <uses-permission android:name="android.permission.INTERNET"/>
```

### Step 3: Create a Full Screen Style

Because this is a basic gallery app, it is more appropriate to show the detail image in a full screen, a screen without appbar. Thus we will create a style for that, and add it alongside our default style:

```xml
    <style name="AppTheme" parent="Theme.AppCompat.Light.DarkActionBar">
        <!-- Customize your theme here. -->
        <item name="colorPrimary">@color/colorPrimary</item>
        <item name="colorPrimaryDark">@color/colorPrimaryDark</item>
        <item name="colorAccent">@color/colorAccent</item>
    </style>

    <style name="AppTheme2" parent="Theme.AppCompat.Light.NoActionBar">
    </style>
```

You then need to assign the AppTheme2 theme to the full screen activity inside the android manifest:

```xml
activity android:name=".FullScreen"
            android:theme="@style/AppTheme2">

        </activity>
```

### Step 4: Create Layouts

Layouts define the user interface for components and pages in android. Here are the layouts used in this project:

1. custom.xml
2. activity_full.xml
3. activity_main.xml

**custom.xml**

This is the layout for a single row or image in the recyclerview. It can also be called a model or item layout:

```xml
<?xml version="1.0" encoding="utf-8"?>
<LinearLayout
    xmlns:android="http://schemas.android.com/apk/res/android"
    android:layout_width="150dp"
    android:layout_height="250dp"
    android:padding="5dp"
    android:layout_margin="5dp"
    android:id="@+id/custom_layout">

    <ImageView
        android:id="@+id/custom_img"
        android:layout_width="match_parent"
        android:layout_height="match_parent"
        android:scaleType="fitXY"/>

</LinearLayout>
```

**activity_fullscreen.xml**

This is the layout for the full screen activity. It will basically render the image in the full screen:

```xml
<?xml version="1.0" encoding="utf-8"?>
<LinearLayout xmlns:android="http://schemas.android.com/apk/res/android"
    xmlns:app="http://schemas.android.com/apk/res-auto"
    xmlns:tools="http://schemas.android.com/tools"
    android:layout_width="match_parent"
    android:layout_height="match_parent"
    tools:context=".FullScreen">

    <ImageView
        android:id="@+id/full_img"
        android:layout_width="match_parent"
        android:layout_height="match_parent"
        android:scaleType="fitXY"/>

</LinearLayout>
```

**activity_main.xml**

This is the layout for the main activity. It will contain a recyclerview to render images in a grid:

```xml
<?xml version="1.0" encoding="utf-8"?>
<LinearLayout xmlns:android="http://schemas.android.com/apk/res/android"
    xmlns:app="http://schemas.android.com/apk/res-auto"
    xmlns:tools="http://schemas.android.com/tools"
    android:layout_width="match_parent"
    android:layout_height="match_parent"
    tools:context=".MainActivity"
    android:layout_gravity="center|top"
    android:gravity="center|top">

    <androidx.recyclerview.widget.RecyclerView
        android:id="@+id/recyclerView"
        android:layout_width="wrap_content"
        android:layout_height="match_parent"
        android:layout_gravity="center|top" />

</LinearLayout>
```

### Step 5: Create a Reyclerview Adapter

The adapter will inflate the `custom.xml` layouts into view objects that will be rendered in the recyclerview, then recycle them appropriately:

```kotlin
import android.content.Context
import android.content.Intent
import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import android.widget.ImageView
import android.widget.LinearLayout
import androidx.recyclerview.widget.RecyclerView
import com.squareup.picasso.Picasso

class RecyclerAdapter(private val data:List<String>, private val context:Context): RecyclerView.Adapter<arb.test.recyclerview.v2.and.picasso.RecyclerAdapter.CustomViewHolder>() {
    private val picasso = Picasso.get()

    inner class CustomViewHolder(parent:View):RecyclerView.ViewHolder(parent){
        val img = parent.findViewById<ImageView>(R.id.custom_img)
        val layout = parent.findViewById<LinearLayout>(R.id.custom_layout)
    }

    override fun onCreateViewHolder(parent: ViewGroup, viewType: Int): CustomViewHolder {
        return CustomViewHolder(LayoutInflater.from(parent.context).inflate(R.layout.custom,parent,false))
    }

    override fun getItemCount(): Int = data.size

    override fun onBindViewHolder(holder: CustomViewHolder, position: Int) {

        picasso.load(data[position]).into(holder.img)

        holder.layout.setOnClickListener {
            val intent = Intent(context,FullScreen::class.java)
            intent.putExtra("imgID",data[position])
            context.startActivity(intent)
        }

    }
}
```

### Step 6: Create FullScreen Activity

This is the activity that will be responsible for rending the passed image in the full scrren of the device. The image is loaded via Picasso

```kotlin
import androidx.appcompat.app.AppCompatActivity
import android.os.Bundle
import android.view.WindowManager
import com.squareup.picasso.Picasso
import kotlinx.android.synthetic.main.activity_full_screen.*

class FullScreen : AppCompatActivity() {

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        window.setFlags(WindowManager.LayoutParams.FLAG_FULLSCREEN,WindowManager.LayoutParams.FLAG_FULLSCREEN)
        setContentView(R.layout.activity_full_screen)

            val picasso = Picasso.get()
        picasso.load(intent.getStringExtra("imgID")).into(full_img)
    }
}
```

### Step 7: Create MainActivity

The launcher activity is the main activity. This activity will have a recyclerview onto which an adapter will be attached. A list of images will first be bound to the adapter:

```kotlin
import android.annotation.SuppressLint
import androidx.appcompat.app.AppCompatActivity
import android.os.Bundle
import android.widget.LinearLayout
import androidx.recyclerview.widget.GridLayoutManager
import androidx.recyclerview.widget.RecyclerView
import kotlinx.android.synthetic.main.activity_main.*

class MainActivity : AppCompatActivity() {

    val data = listOf(
            "https://wallpaperplay.com/walls/full/c/5/3/34778.jpg" ,
            "https://wallpaperplay.com/walls/full/a/e/4/34784.jpg" ,
            "https://wallpaperplay.com/walls/full/6/8/8/294.jpg" ,
            "https://wallpaperplay.com/walls/full/9/c/8/291.jpg" ,
            "https://wallpaperplay.com/board/mandalorian-hd-wallpapers" ,
            "https://wallpaperplay.com/walls/full/c/5/3/34778.jpg" ,
            "https://wallpaperplay.com/walls/full/a/e/4/34784.jpg" ,
            "https://wallpaperplay.com/walls/full/6/8/8/294.jpg" ,
            "https://wallpaperplay.com/walls/full/9/c/8/291.jpg" ,
            "https://wallpaperplay.com/board/mandalorian-hd-wallpapers" ,
            "https://wallpaperplay.com/walls/full/c/5/3/34778.jpg" ,
            "https://wallpaperplay.com/walls/full/a/e/4/34784.jpg" ,
            "https://wallpaperplay.com/walls/full/6/8/8/294.jpg" ,
            "https://wallpaperplay.com/walls/full/9/c/8/291.jpg" ,
            "https://wallpaperplay.com/board/mandalorian-hd-wallpapers" ,
            "https://wallpaperplay.com/walls/full/c/5/3/34778.jpg" ,
            "https://wallpaperplay.com/walls/full/a/e/4/34784.jpg" ,
            "https://wallpaperplay.com/walls/full/6/8/8/294.jpg" ,
            "https://wallpaperplay.com/walls/full/9/c/8/291.jpg" ,
            "https://wallpaperplay.com/board/mandalorian-hd-wallpapers"
    )

    @SuppressLint("WrongConstant")
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_main)

        recyclerView.layoutManager = GridLayoutManager(this,2,LinearLayout.VERTICAL,false)
        recyclerView.adapter = RecyclerAdapter(data,this)
    }
}
```

### Run

Finally run the project.

### Reference

Find the download links below:

| No. | Link |
| --- | --- |
| 1. | [Download](https://github.com/alirezabashi98/RecyclerView-v2-and-Picasso/archive/refs/heads/master.zip) code |
| 2. | [Follow](https://github.com/alirezabashi98/) code author |

## Example 2: Create an Image Slider with Picasso

This tutorial teaches you how to create an imageslider with some third parties involved, but with Picasso being the imaege loader. In this way you see how to use Picasso in another context, inside an image slider with viewpager indicators.

Here are the demo images of what is built:

![Kotlin Android Picasso imageSlider](https://github.com/alirezabashi98/Image-Slider/raw/master/scr002.png)

![Kotlin android picasso image slider example](https://github.com/alirezabashi98/Image-Slider/raw/master/scr001.png)

### Step 1: Install Dependencies

Picasso will be the image loader but to easen the process of creating this slider some other third party libraries will be included:

```groovy
    implementation 'com.squareup.picasso:picasso:2.3.2'
    implementation 'com.nineoldandroids:library:2.4.0'
    implementation 'com.daimajia.slider:library:1.1.5@aar'
```

### Step 2: Add Permissions

Yeah some permissions may be required. For example images are serverd from online or can be read from external storage, so you need these permissions:

```xml
    <uses-permission android:name="android.permission.INTERNET" />
    <uses-permission android:name="android.permission.READ_EXTERNAL_STORAGE" />
```

### Step 3: Create Layout

In your activity layout add a slider as follows:

**activity_main.xml**

```xml
<?xml version="1.0" encoding="utf-8"?>
<LinearLayout xmlns:android="http://schemas.android.com/apk/res/android"
    xmlns:app="http://schemas.android.com/apk/res-auto"
    xmlns:tools="http://schemas.android.com/tools"
    android:layout_width="match_parent"
    android:layout_height="match_parent"
    tools:context=".MainActivity">

    <com.daimajia.slider.library.SliderLayout
        android:id="@+id/slider"
        android:layout_width="match_parent"
        android:layout_height="350dp"/>

</LinearLayout>
```

### Step 4: Write Code

First start by creating your main activity by extending the `AppCompatActivity` and implementing the following interfaces relevant to our slider:

```kotlin
class MainActivity : AppCompatActivity() ,BaseSliderView.OnSliderClickListener,ViewPagerEx.OnPageChangeListener {
```

Now define a list of images to be flipped in our slider:

```kotlin
    val img = listOf(
            "https://wallpaperplay.com/walls/full/c/5/3/34778.jpg" ,
            "https://wallpaperplay.com/walls/full/a/e/4/34784.jpg" ,
            "https://wallpaperplay.com/walls/full/6/8/8/294.jpg" ,
            "https://wallpaperplay.com/walls/full/9/c/8/291.jpg"
    )
```

Create a function that initializes the slider and attaches images and text onto it:

```kotlin
    private fun getSlider() {
        for (item in 0 until img.count()){

            val textSliderView = TextSliderView(this).apply {
                description("Test")
                image(img[item])
                setOnSliderClickListener(this@MainActivity)
                scaleType = BaseSliderView.ScaleType.FitCenterCrop
            }

            slider.addSlider(textSliderView)
        }
    }
```

Override slider callbacks:

```kotlin
    override fun onSliderClick(slider: BaseSliderView?) {
       Toast.makeText(this,"test",Toast.LENGTH_SHORT).show()
    }

    override fun onPageScrollStateChanged(state: Int) {
        }

    override fun onPageScrolled(position: Int, positionOffset: Float, positionOffsetPixels: Int) {
    }

    override fun onPageSelected(position: Int) {

    }
```

When the activity is stopped, release the slider from memory:

```kotlin
    override fun onStop() {
        slider.stopAutoCycle()
        super.onStop()
    }
```

Here is the full code:

**MainActivity.kt**

```kotlin
import android.content.Intent
import androidx.appcompat.app.AppCompatActivity
import android.os.Bundle
import android.widget.Toast
import com.daimajia.slider.library.SliderTypes.BaseSliderView
import com.daimajia.slider.library.SliderTypes.TextSliderView
import com.daimajia.slider.library.Tricks.ViewPagerEx
import kotlinx.android.synthetic.main.activity_main.*
import kotlin.contracts.Returns

class MainActivity : AppCompatActivity() ,BaseSliderView.OnSliderClickListener,ViewPagerEx.OnPageChangeListener {

    val img = listOf(
            "https://wallpaperplay.com/walls/full/c/5/3/34778.jpg" ,
            "https://wallpaperplay.com/walls/full/a/e/4/34784.jpg" ,
            "https://wallpaperplay.com/walls/full/6/8/8/294.jpg" ,
            "https://wallpaperplay.com/walls/full/9/c/8/291.jpg"
    )

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_main)

        getSlider()

    }

    private fun getSlider() {
        for (item in 0 until img.count()){

            val textSliderView = TextSliderView(this).apply {
                description("Test")
                image(img[item])
                setOnSliderClickListener(this@MainActivity)
                scaleType = BaseSliderView.ScaleType.FitCenterCrop
            }

            slider.addSlider(textSliderView)
        }
    }

    override fun onStop() {
        slider.stopAutoCycle()
        super.onStop()
    }

    override fun onSliderClick(slider: BaseSliderView?) {
       Toast.makeText(this,"test",Toast.LENGTH_SHORT).show()
    }

    override fun onPageScrollStateChanged(state: Int) {
        }

    override fun onPageScrolled(position: Int, positionOffset: Float, positionOffsetPixels: Int) {
    }

    override fun onPageSelected(position: Int) {

    }
}
```

### Run

After following the above steps run the project.

### Reference

Find download links below:

| No. | Link |
| --- | --- |
| 1. | [Download](https://github.com/alirezabashi98/Image-Slider/archive/refs/heads/master.zip) code |
| 2. | [Follow](https://github.com/alirezabashi98/) code author |

## Example 3: Android Picasso – ListView – Load Images From Online

Hello.Lets see how to load images from  online to our android application.

The adapterview we use is ListView. We are further going to be using Picasso imageloader to load our images asynchronously and cache them.Our ListView shall display images and text. Here's the deal :

- We are fetching our images from [Cloudinary.com.](http://cloudinary.com)
- The site is something of an image and video hosting site, and they have a free package thats more than enough for use.
- Anyway your images can come from anywhere,the only thing we need is a url.
- We fetch them using Picasso library.
- While its being downloaded,we display to the user a placeholder image.
- We are using ListView with BaseAdapter as our base adapter class.

Direct [Download](https://github.com/Oclemy/PicassoImagesListView/archive/master.zip)

#### STEP 1 : Our TVShow class

This is our data object, our model class. It Represents a TV Show with properties like name;

```java

public class TVShow {

    String name;
    String url;

    public TVShow() {
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getUrl() {
        return url;
    }

    public void setUrl(String url) {
        this.url = url;
    }
}
```

#### STEP 2 : Our TVShowsCollection class

This will return us the collection of all tvshows.It Acts as our data source.

```java
import java.util.ArrayList;

public class TVShowsCollection {

    public static ArrayList<TVShow> getTVShows()
    {
        ArrayList<TVShow> tvshows=new ArrayList<>();

        TVShow tv=new TVShow();

        //ADDING DATA
        tv.setName("BlackList");
        tv.setUrl("http://res.cloudinary.com/oclemy/image/upload/v1460355636/red_s9jrzj.jpg");
        tvshows.add(tv);

        tv=new TVShow();
        tv.setName("Breaking Bad");
        tv.setUrl("http://res.cloudinary.com/oclemy/image/upload/v1460355582/breaking_wbxtzb.jpg");
        tvshows.add(tv);

        tv=new TVShow();
        tv.setName("Fruits");
        tv.setUrl("http://res.cloudinary.com/oclemy/image/upload/v1460355636/fruits_xapn76.jpg");
        tvshows.add(tv);

        tv=new TVShow();
        tv.setName("Crisis");
        tv.setUrl("http://res.cloudinary.com/oclemy/image/upload/v1460355640/crisis_m1btcv.jpg");
        tvshows.add(tv);

        tv=new TVShow();
        tv.setName("Ghost Rider");
        tv.setUrl("http://res.cloudinary.com/oclemy/image/upload/v1460355639/rider_ehhjol.jpg");
        tvshows.add(tv);

        tv=new TVShow();
        tv.setName("Game of Thrones");
        tv.setUrl("http://res.cloudinary.com/oclemy/image/upload/v1460355638/thrones_noxbhq.jpg");
        tvshows.add(tv);

        tv=new TVShow();
        tv.setName("Shuttle Carrier");
        tv.setUrl(" http://res.cloudinary.com/oclemy/image/upload/v1460355638/shuttle_carrier_nwvr5v.jpg");
        tvshows.add(tv);

        return tvshows;
    }

}
```

#### STEP 3 : Our PicassoClient class

Simply loads an image into an imageview from any given image url. We use Picasso library.

```java
public class PicassoClient {

    public static void downloadImage(Context c,String url,ImageView img)
    {
        if(url != null && url.length()>0)
        {
            Picasso.with(c).load(url).placeholder(R.drawable.placeholder).into(img);
        }else
        {
            Picasso.with(c).load(R.drawable.placeholder).into(img);
        }
    }

}
```

#### STEP 4 : Our MyHolder class

To hold our textviews and imageviews for recycling.

```java
public class MyHolder {

    TextView nameTxt;
    ImageView img;

    public MyHolder(View v) {

        nameTxt= (TextView) v.findViewById(R.id.nameTxt);
        img= (ImageView) v.findViewById(R.id.movieImage);

    }
}
```

#### STEP 5 : Our CustomAdapter class

Inflates our model layout into a listview viewitem. Binds our dataset into our listview.

```java
public class CustomAdapter extends BaseAdapter {

    Context c;
    ArrayList<TVShow> tvShows;
    LayoutInflater inflater;

    public CustomAdapter(Context c, ArrayList<TVShow> tvShows) {
        this.c = c;
        this.tvShows = tvShows;
    }

    @Override
    public int getCount() {
        return tvShows.size();
    }

    @Override
    public Object getItem(int position) {
        return tvShows.get(position);
    }

    @Override
    public long getItemId(int position) {
        return position;
    }

    @Override
    public View getView(int position, View convertView, ViewGroup parent) {
        if(inflater==null)
        {
            inflater= (LayoutInflater) c.getSystemService(Context.LAYOUT_INFLATER_SERVICE);
        }

        if(convertView==null)
        {
            convertView=inflater.inflate(R.layout.model,parent,false);

        }

        //BIND DATA
        MyHolder holder=new MyHolder(convertView);
        holder.nameTxt.setText(tvShows.get(position).getName());
        PicassoClient.downloadImage(c,tvShows.get(position).getUrl(),holder.img);

        return convertView;
    }
}
```

#### STEP 6 : Our MainActivity

- Instantiates our adapter and sets it to our listview.
- Initializes our views.

```java

public class MainActivity extends AppCompatActivity {

    ListView lv;
    CustomAdapter adapter;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);
        Toolbar toolbar = (Toolbar) findViewById(R.id.toolbar);
        setSupportActionBar(toolbar);
        FloatingActionButton fab = (FloatingActionButton) findViewById(R.id.fab);

        lv= (ListView) findViewById(R.id.lv);
        adapter=new CustomAdapter(this, TVShowsCollection.getTVShows());

        fab.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View view) {
               lv.setAdapter(adapter);
            }
        });
    }

}
```

#### STEP 7 : Our AndroidManifest.xml

- Add internet permission as we shall be fetching our images from online.

`<uses-permission android_name="android.permission.INTERNET"/>`

## Example 4: Android Picasso – RecyclerView – Load Images From Online

Displaying images in adapterviews is quite common. Especially ListView, GridView and RecyclerView. In this example we see how to fetch images from the web and into a RecyclerView.

#### What We Do

- Fetch images from [Cloudinary.](http://cloudinary.com)
- Use Picasso ImageLoader library to load the images.
- Load these images into a RecyclerView.
- Use CardViews in our RecyclerView to display the images and text.
- We use android studio and java programming language.

#### Common Questions this example answers

- How do we fetch images from the web?
- How do we use Picasso to load and display images from internet.
- How do we show images in a RecyclerView.
- How do we show images in cardviews.
- How do we fetch images from cloudinary.com

Technologies Used include:

- Java
- Android Studio

#### Source Code

Below is the full source code for this project.

#### AndroidManifest.xml

- This is where we add any permissions if necessary.
- In this case we add the permission for internet connectivity.

```xml
<?xml version="1.0" encoding="utf-8"?>
<manifest
    package="com.tutorials.hp.picassoimagesrecyclerview">

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

#### ActivityMain.xml

- This is our container layout.
- We include contentmain.xml here.

```xml
<?xml version="1.0" encoding="utf-8"?>
<android.support.design.widget.CoordinatorLayout

    android_layout_width="match_parent"
    android_layout_height="match_parent"
    android_fitsSystemWindows="true"
    tools_context="com.tutorials.hp.picassoimagesrecyclerview.MainActivity">

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

#### ContentMain.xml

- This is the layout where we specify our widgets and views to be inflated in our MainActivity.
- We add our RecyclerView here.

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
    tools_context="com.tutorials.hp.picassoimagesrecyclerview.MainActivity"
    tools_showIn="@layout/activity_main">

   <android.support.v7.widget.RecyclerView
       android_id="@+id/rv"
       android_layout_width="match_parent"
       android_layout_height="wrap_content">
   </android.support.v7.widget.RecyclerView>

</RelativeLayout>
```

#### TVShow.java

1. This is our data object representing a single TVShow object with its properties.

```java
package com.tutorials.hp.picassoimagesrecyclerview.mData;

public class TVShow {

    String name;
    String url;

    public TVShow() {
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getUrl() {
        return url;
    }

    public void setUrl(String url) {
        this.url = url;
    }
}
```

#### TVShowsCollection.java

1. Contains a static method that returns all our TVShows.

```java
package com.tutorials.hp.picassoimagesrecyclerview.mData;

import java.util.ArrayList;

public class TVShowsCollection {

    public static ArrayList<TVShow> getTVShows()
    {
        ArrayList<TVShow> tvshows=new ArrayList<>();
        TVShow tv=new TVShow();

        //ADD DATA
        tv.setName("BlackList");
        tv.setUrl("http://res.cloudinary.com/oclemy/image/upload/v1460355636/red_s9jrzj.jpg");
        tvshows.add(tv);

        tv=new TVShow();
        tv.setName("Breaking Bad");
        tv.setUrl("http://res.cloudinary.com/oclemy/image/upload/v1460355582/breaking_wbxtzb.jpg");
        tvshows.add(tv);

        tv=new TVShow();
        tv.setName("Fruits");
        tv.setUrl("http://res.cloudinary.com/oclemy/image/upload/v1460355636/fruits_xapn76.jpg");
        tvshows.add(tv);

        tv=new TVShow();
        tv.setName("Crisis");
        tv.setUrl("http://res.cloudinary.com/oclemy/image/upload/v1460355640/crisis_m1btcv.jpg");
        tvshows.add(tv);

        tv=new TVShow();
        tv.setName("Ghost Rider");
        tv.setUrl("http://res.cloudinary.com/oclemy/image/upload/v1460355639/rider_ehhjol.jpg");
        tvshows.add(tv);

        tv=new TVShow();
        tv.setName("Game of Thrones");
        tv.setUrl("http://res.cloudinary.com/oclemy/image/upload/v1460355638/thrones_noxbhq.jpg");
        tvshows.add(tv);

        tv=new TVShow();
        tv.setName("Shuttle Carrier");
        tv.setUrl(" http://res.cloudinary.com/oclemy/image/upload/v1460355638/shuttle_carrier_nwvr5v.jpg");
        tvshows.add(tv);

        return tvshows;

    }

}
```

#### PicassoClient.java

1. Contains a method that validates a URL before downloading an image into an imageview using Picasso.

```java

package com.tutorials.hp.picassoimagesrecyclerview.mPicasso;

import android.content.Context;
import android.widget.ImageView;

import com.squareup.picasso.Picasso;
import com.tutorials.hp.picassoimagesrecyclerview.R;

public class PicassoClient {

    public static void downloadImage(Context c,String url,ImageView img)
    {
        if(url != null && url.length()>0)
        {
            Picasso.with(c).load(url).placeholder(R.drawable.placeholder).into(img);

        }else {
            Picasso.with(c).load(R.drawable.placeholder).into(img);
        }
    }

}
```

#### MyHolder.java

1. Our recyclerView viewholder class.
2. Derives from RecyclerView.ViewHolder.

```java
package com.tutorials.hp.picassoimagesrecyclerview.mRecycler;

public class MyHolder extends RecyclerView.ViewHolder {

    TextView nameTxt;
    ImageView img;

    public MyHolder(View itemView) {
        super(itemView);

        nameTxt= (TextView) itemView.findViewById(R.id.nameTxt);
        img= (ImageView) itemView.findViewById(R.id.movieImage);
    }
}
```

#### MyAdapter.java

1. This class inherits from RecyclerView.Adapter class.
2. It adapts data to our views.

```java
package com.tutorials.hp.picassoimagesrecyclerview.mRecycler;

public class MyAdapter extends RecyclerView.Adapter<MyHolder> {

    Context c;
    ArrayList<TVShow> tvShows;

    public MyAdapter(Context c, ArrayList<TVShow> tvShows) {
        this.c = c;
        this.tvShows = tvShows;
    }

    @Override
    public MyHolder onCreateViewHolder(ViewGroup parent, int viewType) {
        View v= LayoutInflater.from(parent.getContext()).inflate(R.layout.model,parent,false);
        MyHolder holder=new MyHolder(v);
        return holder;
    }

    @Override
    public void onBindViewHolder(MyHolder holder, int position) {
         //BIND DATA
        holder.nameTxt.setText(tvShows.get(position).getName());

        //IMAGE
        PicassoClient.downloadImage(c,tvShows.get(position).getUrl(),holder.img);
    }

    @Override
    public int getItemCount() {
        return tvShows.size();
    }
}
```

#### MainActivity.java

1. Derives from AppCompatActivity.
2. Sets our adapter to RecyclerView.

```java
package com.tutorials.hp.picassoimagesrecyclerview;

public class MainActivity extends AppCompatActivity {

    RecyclerView rv;
    MyAdapter adapter;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);
        Toolbar toolbar = (Toolbar) findViewById(R.id.toolbar);
        setSupportActionBar(toolbar);
        FloatingActionButton fab = (FloatingActionButton) findViewById(R.id.fab);

       rv= (RecyclerView) findViewById(R.id.rv);
        rv.setLayoutManager(new LinearLayoutManager(this));

        adapter=new MyAdapter(this, TVShowsCollection.getTVShows());

        fab.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View view) {
                     rv.setAdapter(adapter);
            }
        });
    }

}
```

#### How To Run

1. Download the project above.
2. You'll get a zipped file,extract it.
3. Open the Android Studio.
4. Now close, already open project
5. From the Menu bar click on File >New> Import Project
6. Now Choose a Destination Folder, from where you want to import project.
7. Choose an Android Project.
8. Now Click on “OK“.
9. Done, your done importing the project,now edit it.

## More Picasso Extensions and Examples

Let us look at libraries and examples related to enhancing an Picasso. These add more functionalities to Picasso:

[loop type=post taxonomy=chapter term=picasso orderby=date order=asc]

<h3>[loop-count]. [field chapter]</h3>

[field chapter_description]

<a href="[field url]">Read More.</a>


[/loop]

### Picasso Alternatives

Here are some cool alternatives to this library:

[loop type=post taxonomy=category term=imageloader orderby=date order=asc]
<h2>[loop-count]. [field title-link] </h2>
[content more=true link=false]
<a href="[field url]">Read More.</a>
[/loop]
[else]
[/if]

