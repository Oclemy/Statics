# Cloudinary Image Manipulations examples


In this tutorial we will look at Cloudinary Examples, especially with regard to image editing and manipulation.


## Example 1: Android Cloudinary – Resize Image,Round Corners then Download

_This is an android tutorial that explores the usage of [Cloudinary](http://www.cloudinary.com), a cloud service to do the following:_

#### Uses of this Project

| No. | Task |
| --- | --- |
| 1. | Connect securely to Cloudinary web service using authentication tokens. |
| 2. | Transform an image into one with Round corners on the cloud. |
| 3. | Resize Image on the cloud. |
| 4. | Render the transformed Image using Picasso |

#### Project Summary

Here's the project summary:

| No. | File | Role |
| --- | --- | --- |
| 1. | Build.gradle | We add dependencies here. |
| 2. | AndroidManifest.xml | We add internet permission here. |
| 3. | activity_main.xml | MainActivity Layout |
| 4. | content_main.xml | We add our MainActivity widggets here. |
| 5. | MyConfiguration.java | Contains Cloudinary authentication configurations |
| 6. | CloudinaryClient.java | Resize and Transform Image on the cloud |
| 7. | PicassoClient.java | Dowload and render the transformed image into an imageview |
| 8. | MainActivity.java | Render the main screen for our application. |

#### 1\. Create Project

1. First create an empty project in android studio. Go to File --> New Project.
2. Type the application name and choose the company name.
3. Choose minimum SDK.
4. Choose Empty activity.
5. Click Finish.

Basic activity will have a toolbar and floating action button already added in the layout

Normally two layouts get generated with this option:

| No. | Name | Type | Description |
| --- | --- | --- | --- |
| 1. | activity_main.xml | XML Layout | Will get inflated into MainActivity Layout.Typically contains appbarlayout with toolbar.Also has a floatingactionbutton. |
| 2. | content_main.xml | XML Layout | Will be included into activity_main.xml.You add your views and widgets here. |
| 3. | MainActivity.java | Class | Main Activity. |

In this example I used a basic activity.

The activity will automatically be registered in the android_manifest.xml. Android Activities are components and normally need to be registered as an application component.

If you've created yours manually then register it inside the `<application>...<application>` as following, replacing the `MainActivity` with your activity name:

```xml

        <activity android_name=".MainActivity">

            <intent-filter>

                <action android_name="android.intent.action.MAIN" />

                <category android_name="android.intent.category.LAUNCHER" />

            </intent-filter>

        </activity>
```

You can see that one action and category are specified as intent filters. The category makes our MainActivity as launcher activity. Launcher activities get executed first when th android app is run.

#### 2\. Add dependencies

In our app level build.gradle:

```groovy
dependencies {
    compile fileTree(dir: 'libs', include: ['*.jar'])
    testCompile 'junit:junit:4.12'
    compile 'com.android.support:appcompat-v7:23.3.0'
    compile 'com.android.support:design:23.3.0'
    compile 'com.android.support:cardview-v7:23.3.0'
    compile 'com.cloudinary:cloudinary-core:1.4.1'
    compile 'com.cloudinary:cloudinary-android:1.4.1'
    compile 'com.squareup.picasso:picasso:2.5.2'
}
```

#### 3\. Create User Interface Layouts

These will be rendered into the user interface for our application.

######## activity_main.xml

- This layout gets inflated to MainActivity user interface.
- It includes the content_main.xml.

Here are some of the widgets, views and viewgroups that get employed"

| No. | View/ViewGroup | Package | Role |
| --- | --- | --- | --- |
| 1. | CordinatorLayout | `android.support.design.widget` | Super-powered framelayout that provides our application's top level decoration and is also specifies interactions and behavioros of all it's children. |
| 2. | AppBarLayout | `android.support.design.widget` | A LinearLayout child that arranges its children vertically and provides material design app bar concepts like scrolling gestures. |
| 3. | ToolBar | `<android.support.v7.widget` | A ViewGroup that can provide actionbar features yet still be used within application layouts. |
| 4. | FloatingActionButton | `android.support.design.widget` | An circular imageview floating above the UI that we can use as buttons. |

```xml
<?xml version="1.0" encoding="utf-8"?>
<android.support.design.widget.CoordinatorLayout

    android_layout_width="match_parent"
    android_layout_height="match_parent"
    android_fitsSystemWindows="true"
    tools_context="com.tutorials.hp.cloudinarystart.MainActivity">

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

######## content_main.xml This layout gets included in your activity_main.xml. You define your UI widgets right here.

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
    tools_context="com.tutorials.hp.cloudinarystart.MainActivity"
    tools_showIn="@layout/activity_main">

        <RelativeLayout
            android_layout_width="match_parent"
            android_layout_height="match_parent">

            <ImageView
                android_layout_width="wrap_content"
                android_layout_height="wrap_content"
                android_id="@+id/movieImage"
                android_padding="10dp"
                android_src="@drawable/placeholder" />

            <TextView
                android_layout_width="wrap_content"
                android_layout_height="wrap_content"
                android_textAppearance="?android:attr/textAppearanceLarge"
                android_text="Name"
                android_id="@+id/nameTxt"
                android_padding="10dp"
                android_textColor="@color/colorAccent"
                android_layout_below="@+id/movieImage"
                android_layout_alignParentLeft="true"
                />

        </RelativeLayout>

</RelativeLayout>
```

#### 3\. Java Classes

##### 1\. MyConfiguration.java

| ######## Roles of MyConfiguration.java | No. | Role |
| --- | --- | --- |
| 1. | Put configuration details into a HashMap and return that HashMap. |

First specify the package name:

```java
package com.tutorials.hp.cloudinarystart.mCloud;
```

The imports:

```java
import java.util.HashMap;
```

Then define the class:

```java
public class MyConfiguration {..}
```

Then create a static method `getMyConfigs()` that returns a HashMap of configuration details:

```java
    public static HashMap getMyConfigs(){}
```

Add the following code inside the method:

```java
        HashMap config=new HashMap();
        config.put("cloud_name","xxxxx");
        config.put("api_key","kkkkkk");
        config.put("api_secret","hhhhh");

        return config;
```

##### CloudinaryClient.java

This class the following roles:

| No. | Role | Method Responsible |
| --- | --- | --- |
| 1. | Round Image Corners in the cloud. | `getRoundedCorners()` |
| 2. | Resize image in the cloud | `resize()` |

First specify the package name of this class;

```java
package com.tutorials.hp.cloudinarystart.mCloud;
```

Then add two cloudinary imports:

```java
import com.cloudinary.Cloudinary;
import com.cloudinary.Transformation;
```

Then create our class:

```java
public class CloudinaryClient {..}
```

Then add the method to transform image into rounder corner images:

```java
    public static String getRoundedCorners()
    {
        Cloudinary cloud=new Cloudinary(MyConfiguration.getMyConfigs());

        //MANIPULATION
        Transformation t=new Transformation();
        t.radius(60);

        return cloud.url().transformation(t).generate("red_s9jrzj.jpg");
    }
```

Then the method to resize our image in the cloud:

```java
    public static String resize()
    {
        Cloudinary cloud=new Cloudinary(MyConfiguration.getMyConfigs());

        //MANIPULATION
        Transformation t=new Transformation();
        t.width(300);
        t.height(250);

        return cloud.url().transformation(t).generate("red_s9jrzj.jpg");
    }
```

#### PicassoClient.java

Here are the responsibilities of this class:

| No. | Major Responsibility |
| --- | --- |
| 1. | Download Image from the cloud. |
| 2. | Render the Image into an ImageView using Picasso |

First specify the package name of class:

```java
package com.tutorials.hp.cloudinarystart.mPicasso;
```

Then we add our imports:

```java
import android.content.Context;
import android.widget.ImageView;
import com.squareup.picasso.Picasso;
import com.tutorials.hp.cloudinarystart.R;
```

Create our class:

```java
public class PicassoClient {..}
```

We then create our method to download the image:

```java
    public static void downloadImage(Context c,String url,ImageView img)
    {
        if(url != null && url.length()>0)
        {
            Picasso.with(c).load(url).placeholder(R.drawable.placeholder).into(img);

        }else {
            Picasso.with(c).load(R.drawable.placeholder).into(img);
        }
    }
```

Here's how the above method works with respect to the parameters we pass it:

| No. | Parameter | Responsibility |
| --- | --- | --- |
| 1. | Context | To be passed to Picasso's `with` method. |
| 2. | String | The url from which we load the image |
| 3. | ImageView | To display our imageview |

#### MainActivity.java

Our main and only activity.

Here are the roles of this class:

| No. | Major Responsibility |
| --- | --- |
| 1. | It is our launcher activity. |
| 2. | Render our UI elements for users to interact with. |
| 3. | Provide interface for user to start downloading the image and render into the imageview. |

Our activity will reside in a package:

```java
package com.tutorials.hp.cloudinarystart;
```

We'll make use of the following imports:

```java
import android.os.Bundle;
import android.support.design.widget.FloatingActionButton;
import android.support.design.widget.Snackbar;
import android.support.v7.app.AppCompatActivity;
import android.support.v7.widget.CardView;
import android.support.v7.widget.Toolbar;
import android.view.View;
import android.view.Menu;
import android.view.MenuItem;
import android.widget.ImageView;

import com.tutorials.hp.cloudinarystart.mCloud.CloudinaryClient;
import com.tutorials.hp.cloudinarystart.mPicasso.PicassoClient;
```

Then create a class:

```java
public class MainActivity ..{}
```

And make it extend AppCompatActivity

```java
public class MainActivity extends AppCompatActivity {..}
```

We'll have one instance field inside our MainActivity. Add it inside the MainActivity:

```java
    Boolean resize=false;
```

We'll then override the `onCreate()` method of our Activity:

```java
    protected void onCreate(Bundle savedInstanceState) {
```

You must then invoke the super onCreate() method or the [Activity](https://camposha.info/android/activity) base class:

```language
        super.onCreate(savedInstanceState);
```

Then call the Activity's setContentView(layout), a method that will inflate our layout into a view:

```java
        setContentView(R.layout.activity_main);
```

Then reference our Toolbar from application's layout:

```java
        Toolbar toolbar = (Toolbar) findViewById(R.id.toolbar);
```

Then use the Toolbar as our ActionBar:

```java
        setSupportActionBar(toolbar);
```

Then reference our widgets:

```java
        FloatingActionButton fab = (FloatingActionButton) findViewById(R.id.fab);

        final ImageView img= (ImageView) findViewById(R.id.movieImage);
```

When the FloatingActionButton is clicked we either resize or get image with round corners:

```java
fab.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View view) {
               if(resize)
               {
                   PicassoClient.downloadImage(MainActivity.this, CloudinaryClient.resize(),img);
                   resize=false;
               }else
               {
                   PicassoClient.downloadImage(MainActivity.this, CloudinaryClient.getRoundedCorners(),img);
                   resize=true;
               }
            }
        });
    }
}
```

#### 4\. Add Internet Permission

Because we will be accessing internet.If you don't your app will never connect. Add it in your androidmanifest.xml just above the `<application>` tag.

```java
    <mainfest>
    ....
    <uses-permission android_name="android.permission.INTERNET"/>
    ....
    </manfiest>
```
