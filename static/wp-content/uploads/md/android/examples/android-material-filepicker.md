# Material FilePicker Examples



Mobile phones are nowadays quite powerful and an important part of our day to day lives. Be it in keeping our todo lists, sending some emails or taking selfies, we pretty much find it difficult to leave our phones behind. One common usage of phones of course is taking selfies via the camera.


These images get stored in the external storage of our devices. What about if we want to use these images in our app? What about enabling dear users select images in an easy way? Yes, that’s the purpose of this session, to allow users easily select images from the external storage of their devices to a listview. We make use of a FilePicker library by droidninja.

Users will be able to select images and show them alongside the images name in a ListView with cardviews or gridview.

In this tutorial we will look at how to use a widget known as Material Filepicker to pick images from the android device. After picking the images we will render them in various adapterviews like gridview and listview.

## Example 1: Android FilePicker - Pickimages and show in GridView

In this example our aim is simple: To load images from our File System and into our GridView.Maybe we can do that via a loop but we want control.We want to select images we load,not just loop through and load all images,though we have such a tutorial as well.

So we shall be using a FilePicker,a material filepicker third party library to help us choose images with a nice material interface.Moreover we can define the total number of images users can choose at a go. We then display these images in a GridView.

Our images exist in the external storage in the device's filesystem You can find more details about External Storage [here](https://developer.android.com/guide/topics/data/data-storage.html#filesExternal).

## Common Questions this example explores

- Android FilePicker example.
- Android Pick images From SD Card to GridView.
- Android Material Filepicker Gridview
- Retrieving images from external storage.
- Get image from filesystem to an GridView
- Android Filesystem example.

## Tools Used

This example was written with the following tools:

- Windows 8
- AndroidStudio IDE
- BlueStacks Emulator

So the first thing is to add the dependency in our build.gradle app level,as in : `compile 'com.droidninja:filepicker:1.0.0'`   We shall have something like this,simply overriding our onActivityResult() method in our MainActivity.We have a model class we called spacecraft,we simply then assign it properties depending on what we receive from the files we are loading.  :

```java
    @Override
    protected void onActivityResult(int requestCode, int resultCode, Intent data) {
        super.onActivityResult(requestCode, resultCode, data);

        switch (requestCode)
        {
            case FilePickerConst.REQUEST_CODE:

                if(resultCode==RESULT_OK && data!=null)
                {
                    filePaths = data.getStringArrayListExtra(FilePickerConst.KEY_SELECTED_PHOTOS);
                    Spacecraft s;
                    ArrayList<Spacecraft> spacecrafts=new ArrayList<>();

                    try
                    {
                        for (String path:filePaths) {
                            s=new Spacecraft();
                            s.setName(path.substring(path.lastIndexOf("/")+1));

                            s.setUri(Uri.fromFile(new File(path)));
                            spacecrafts.add(s);
                        }

                        gv.setAdapter(new CustomAdapter(this,spacecrafts));
                        Toast.makeText(MainActivity.this, "Total = "+String.valueOf(spacecrafts.size()), Toast.LENGTH_SHORT).show();
                    }catch (Exception e)
                    {
                        e.printStackTrace();
                    }
                }
        }

}
```

## Let's go

Lets have a look at the source code.

## **1\. Build.Gradle**

- This is our app level build.gradle. It’s located inside the app directory.
- We sepcify any dependencies required by the project here.
- Our dependencies can either be SDK-based e.g appcompat and design support libraries or be fetched from third party repository via internet.
- In this case we fetch Picasso(com.squareup.picasso:picasso) and FilePicker(com.droidninja:filepicker) from external repository.

```groovy
apply plugin: 'com.android.application'

android {
    compileSdkVersion 24
    buildToolsVersion "24.0.1"

    defaultConfig {
        applicationId "com.tutorials.hp.filepickergridview"
        minSdkVersion 15
        targetSdkVersion 24
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
    compile 'com.android.support:appcompat-v7:24.1.1'
    compile 'com.android.support:design:24.1.1'
    compile 'com.android.support:cardview-v7:24.1.1'
    compile 'com.droidninja:filepicker:1.0.0'
    compile 'com.squareup.picasso:picasso:2.5.2'
}
```

## **2\. ActivityMain.xml**

- This is the container layout of our mainactivity.
- It specifies the appbar layout, toolbar and floating action button.
- It also includes the contentmain.xml layout where we actually add our widgets.

```xml
<?xml version="1.0" encoding="utf-8"?>
<android.support.design.widget.CoordinatorLayout

    android_layout_width="match_parent"
    android_layout_height="match_parent"
    android_fitsSystemWindows="true"
    tools_context="com.tutorials.hp.filepickergridview.MainActivity">

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

## **3\. ContentMain.xml**

- This is where we add our widgets and views for our mainactivity.
- In this case we have a gridview.

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
    tools_context="com.tutorials.hp.filepickergridview.MainActivity"
    tools_showIn="@layout/activity_main">

    <GridView
        android_id="@+id/gv"
        android_layout_width="wrap_content"
        android_layout_height="wrap_content"
        android_numColumns="2" />
</RelativeLayout>
```

## **4\. Model.xml**

- This layout gets inflated to a single viewitem in our gridview.

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
                android_id="@+id/spacecraftImg"
                android_src="@drawable/placeholder"
                android_layout_width="150dp"
                android_paddingLeft="10dp"
                android_layout_height="wrap_content" />

            <LinearLayout
                android_orientation="vertical"
                android_layout_width="wrap_content"
                android_layout_height="wrap_content">

                <TextView
                    android_layout_width="wrap_content"
                    android_layout_height="wrap_content"
                    android_textAppearance="?android:attr/textAppearanceLarge"
                    android_text="Name"
                    android_id="@+id/nameTxt"
                    android_padding="10dp"
                    android_textColor="@color/colorAccent"
                    android_textStyle="bold"
                    android_layout_alignParentLeft="true"
                    />

            </LinearLayout>

            </LinearLayout>

</android.support.v7.widget.CardView>
```

## **5\. Spacecraft.java**

- This is the definition of a spaceraft object.
- It specifies it’s properties like name and filesystem image uri.

```java
package com.tutorials.hp.filepickergridview;

import android.net.Uri;

public class Spacecraft {
    String name;
    Uri uri;

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public Uri getUri() {
        return uri;
    }

    public void setUri(Uri uri) {
        this.uri = uri;
    }
}
```

## **6\. CustomAdapter.java**

- This is our adapter class. It adapts our data to our views.
- It inherits from BaseAdapter.

```java
package com.tutorials.hp.filepickergridview;

import android.content.Context;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.BaseAdapter;
import android.widget.ImageView;
import android.widget.TextView;
import android.widget.Toast;

import com.squareup.picasso.Picasso;

import java.util.ArrayList;

public class CustomAdapter extends BaseAdapter {

    Context c;
    ArrayList<Spacecraft> spacecrafts;

    public CustomAdapter(Context c, ArrayList<Spacecraft> spacecrafts) {
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
        if (view == null) {
            //INFLATE CUSTOM LAYOUT
            view = LayoutInflater.from(c).inflate(R.layout.model, viewGroup, false);
        }

        final Spacecraft s = (Spacecraft) this.getItem(i);

        TextView nameTxt = (TextView) view.findViewById(R.id.nameTxt);
        ImageView img = (ImageView) view.findViewById(R.id.spacecraftImg);

        //BIND DATA
        nameTxt.setText(s.getName());
        Picasso.with(c).load(s.getUri()).placeholder(R.drawable.placeholder).into(img);

        //VIEW ITEM CLICK
        view.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View view) {
                Toast.makeText(c, s.getName(), Toast.LENGTH_SHORT).show();
            }
        });
        return view;
    }
}
```

## **7\. MainActivity.java**

- Here's our mainactivity.

```java
package com.tutorials.hp.filepickergridview;

import android.content.Intent;
import android.net.Uri;
import android.os.Bundle;
import android.support.design.widget.FloatingActionButton;
import android.support.v7.app.AppCompatActivity;
import android.support.v7.widget.Toolbar;
import android.view.View;
import android.widget.GridView;
import android.widget.Toast;

import java.io.File;
import java.util.ArrayList;

import droidninja.filepicker.FilePickerBuilder;
import droidninja.filepicker.FilePickerConst;

public class MainActivity extends AppCompatActivity {

    ArrayList<String> filePaths=new ArrayList<String>();
    GridView gv;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);
        Toolbar toolbar = (Toolbar) findViewById(R.id.toolbar);
        setSupportActionBar(toolbar);

        gv= (GridView) findViewById(R.id.gv);

        FloatingActionButton fab = (FloatingActionButton) findViewById(R.id.fab);
        fab.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View view) {

                filePaths.clear();

                FilePickerBuilder.getInstance().setMaxCount(5)
                        .setSelectedFiles(filePaths)
                        .setActivityTheme(R.style.AppTheme)
                        .pickPhoto(MainActivity.this);
            }
        });
    }

    @Override
    protected void onActivityResult(int requestCode, int resultCode, Intent data) {
        super.onActivityResult(requestCode, resultCode, data);

        switch (requestCode)
        {
            case FilePickerConst.REQUEST_CODE:

                if(resultCode==RESULT_OK && data!=null)
                {
                    filePaths = data.getStringArrayListExtra(FilePickerConst.KEY_SELECTED_PHOTOS);
                    Spacecraft s;
                    ArrayList<Spacecraft> spacecrafts=new ArrayList<>();

                    try
                    {
                        for (String path:filePaths) {
                            s=new Spacecraft();
                            s.setName(path.substring(path.lastIndexOf("/")+1));

                            s.setUri(Uri.fromFile(new File(path)));
                            spacecrafts.add(s);
                        }

                        gv.setAdapter(new CustomAdapter(this,spacecrafts));
                        Toast.makeText(MainActivity.this, "Total = "+String.valueOf(spacecrafts.size()), Toast.LENGTH_SHORT).show();
                    }catch (Exception e)
                    {
                        e.printStackTrace();
                    }
                }
        }
    }
}
```

## **How To Run**

- Download the project.
- You'll get a zipped file,extract it.
- Open the Android Studio.
- Now close, already open project
- From the Menu bar click on **File >New> Import Project**
- Now Choose a Destination Folder, from where you want to import project.
- Choose an Android Project.
- Now Click on “**OK**“.
- Done, your done importing the project,now edit it.

## **More Resources**

| Resource | Link |
| --- | --- |
| GitHub Browse | [Browse](https://github.com/Oclemy/FilePickerGridView) |
| GitHub Download Link | [Download](https://github.com/Oclemy/FilePickerGridView/archive/master.zip) |

## Example 2: Android FilePicker – Images From External Storage To ListView

Here are our classes:

#### **Spacecraft.java**

- This is the definition of a spaceraft object.
- It specifies it’s properties like name and filesystem image uri.

```java
package com.tutorials.hp.listviewimagessdcard;

import android.net.Uri;

public class Spacecraft {
    private String name;
    private Uri uri;

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public Uri getUri() {
        return uri;
    }

    public void setUri(Uri uri) {
        this.uri = uri;
    }
}
```

#### **CustomAdapter.java**

- This is our adapter class. It adapts our data to our views.
- It inherits from BaseAdapter.

```java
package com.tutorials.hp.listviewimagessdcard;

import android.content.Context;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.BaseAdapter;
import android.widget.ImageView;
import android.widget.TextView;
import android.widget.Toast;

import com.squareup.picasso.Picasso;

import java.util.ArrayList;

public class CustomAdapter extends BaseAdapter {

    Context c;
    ArrayList<Spacecraft> spacecrafts;

    public CustomAdapter(Context c, ArrayList<Spacecraft> spacecrafts) {
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
            //INFLATE CUSTOM LAYOUT
            view= LayoutInflater.from(c).inflate(R.layout.model,viewGroup,false);
        }

        final Spacecraft s= (Spacecraft) this.getItem(i);

        TextView nameTxt= (TextView) view.findViewById(R.id.nameTxt);
        ImageView img= (ImageView) view.findViewById(R.id.spacecraftImg);

        //BIND DATA
        nameTxt.setText(s.getName());
        Picasso.with(c).load(s.getUri()).placeholder(R.drawable.placeholder).into(img);

        //VIEW ITEM CLICK
        view.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View view) {
                Toast.makeText(c, s.getName(), Toast.LENGTH_SHORT).show();
            }
        });
        return view;
    }
}
```

#### **MainActivity.java**

Our MainActivity.

```java
package com.tutorials.hp.listviewimagessdcard;

import android.net.Uri;
import android.os.Bundle;
import android.os.Environment;
import android.support.design.widget.FloatingActionButton;
import android.support.design.widget.Snackbar;
import android.support.v7.app.AppCompatActivity;
import android.support.v7.widget.Toolbar;
import android.view.View;
import android.view.Menu;
import android.view.MenuItem;
import android.widget.ListView;

import java.io.File;
import java.util.ArrayList;

public class MainActivity extends AppCompatActivity {

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);
        Toolbar toolbar = (Toolbar) findViewById(R.id.toolbar);
        setSupportActionBar(toolbar);

        final ListView lv= (ListView) findViewById(R.id.lv);

        FloatingActionButton fab = (FloatingActionButton) findViewById(R.id.fab);
        fab.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View view) {
                lv.setAdapter(new CustomAdapter(MainActivity.this,getData()));

            }
        });
    }

    private ArrayList<Spacecraft> getData()
    {
        ArrayList<Spacecraft> spacecrafts=new ArrayList<>();
        //TARGET FOLDER
        File downloadsFolder= Environment.getExternalStoragePublicDirectory(Environment.DIRECTORY_DOWNLOADS);

        Spacecraft s;

        if(downloadsFolder.exists())
        {
            //GET ALL FILES IN DOWNLOAD FOLDER
            File[] files=downloadsFolder.listFiles();

            //LOOP THRU THOSE FILES GETTING NAME AND URI
            for (int i=0;i<files.length;i++)
            {
                File file=files[i];

                s=new Spacecraft();
                s.setName(file.getName());
                s.setUri(Uri.fromFile(file));

                spacecrafts.add(s);
            }
        }
        return spacecrafts;
    }
}
```

**More Resources**

| Resource | Link |
| --- | --- |
| GitHub Browse | [Browse](https://github.com/Oclemy/ListViewImagesSDCard) |
| GitHub Download Link | [Download](https://github.com/Oclemy/ListViewImagesSDCard/archive/master.zip) |

## Android Material FilePicker tutorial – Pick Multiple images and show in a RecyclerView

_Android Material FilePicker tutorial - Pick Multiple images and show in a RecyclerView._

#### Introduction

Android FilePicker tutorial. We show how to pick multiple images using Material FilePicker and show them in a RecyclerView. Please watch the video tutorial step by step for explanations.

![](https://camposha.info/wp-content/uploads/source/filepickerrecyclerview/demo1.gif)

#### Tools Used

This example was written with the following tools:

- Windows 8
- AndroidStudio IDE
- Genymotion Emulator
- Language : Java

Lets start.

#### 1\. Build.Gradle App Level

```groovy
apply plugin: 'com.android.application'

android {
    compileSdkVersion 24
    buildToolsVersion "24.0.1"

    defaultConfig {
        applicationId "com.tutorials.hp.filepickerrecyclerview"
        minSdkVersion 15
        targetSdkVersion 24
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
    compile 'com.android.support:appcompat-v7:24.1.1'
    compile 'com.android.support:design:24.1.1'
    compile 'com.android.support:cardview-v7:24.1.1'
    compile 'com.droidninja:filepicker:1.0.0'
    compile 'com.squareup.picasso:picasso:2.5.2'
}
```

#### 2\. Spacecraft.java

```java
package com.tutorials.hp.filepickerrecyclerview;

import android.net.Uri;

/
public class Spacecraft {
    String name;
    Uri uri;

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public Uri getUri() {
        return uri;
    }

    public void setUri(Uri uri) {
        this.uri = uri;
    }
}
```

#### 3\. MyViewHolder.java

```java
package com.tutorials.hp.filepickerrecyclerview.mRecycler;

import android.support.v7.widget.RecyclerView;
import android.view.View;
import android.widget.ImageView;
import android.widget.TextView;

import com.tutorials.hp.filepickerrecyclerview.R;

public class MyViewHolder extends RecyclerView.ViewHolder {

    TextView nameTxt;
    ImageView img;

    public MyViewHolder(View itemView) {
        super(itemView);

        nameTxt= (TextView) itemView.findViewById(R.id.nameTxt);
        img= (ImageView) itemView.findViewById(R.id.spacecraftImg);

    }
}
```

\#### 4. MyAdapter.java

```java
package com.tutorials.hp.filepickerrecyclerview.mRecycler;

import android.content.Context;
import android.support.v7.widget.RecyclerView;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;

import com.squareup.picasso.Picasso;
import com.tutorials.hp.filepickerrecyclerview.R;
import com.tutorials.hp.filepickerrecyclerview.Spacecraft;

import java.util.ArrayList;

public class MyAdapter extends RecyclerView.Adapter<MyViewHolder> {

    Context c;
    ArrayList<Spacecraft> spacecrafts;

    public MyAdapter(Context c, ArrayList<Spacecraft> spacecrafts) {
        this.c = c;
        this.spacecrafts = spacecrafts;
    }

    @Override
    public MyViewHolder onCreateViewHolder(ViewGroup parent, int viewType) {
        View v= LayoutInflater.from(c).inflate(R.layout.model,parent,false);
        return new MyViewHolder(v);
    }

    @Override
    public void onBindViewHolder(MyViewHolder holder, int position) {

        Spacecraft s=spacecrafts.get(position);

        holder.nameTxt.setText(s.getName());
        Picasso.with(c).load(s.getUri()).placeholder(R.drawable.placeholder).into(holder.img);
    }

    @Override
    public int getItemCount() {
        return spacecrafts.size();
    }
}
```

#### 5\. MainActivity.java

```java
package com.tutorials.hp.filepickerrecyclerview;

import android.content.Intent;
import android.net.Uri;
import android.os.Bundle;
import android.support.design.widget.FloatingActionButton;
import android.support.v7.app.AppCompatActivity;
import android.support.v7.widget.LinearLayoutManager;
import android.support.v7.widget.RecyclerView;
import android.support.v7.widget.Toolbar;
import android.view.View;
import android.widget.Toast;

import com.tutorials.hp.filepickerrecyclerview.mRecycler.MyAdapter;

import java.io.File;
import java.util.ArrayList;

import droidninja.filepicker.FilePickerBuilder;
import droidninja.filepicker.FilePickerConst;

public class MainActivity extends AppCompatActivity {

    RecyclerView rv;
    ArrayList<String> filePaths=new ArrayList<String>();

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);
        Toolbar toolbar = (Toolbar) findViewById(R.id.toolbar);
        setSupportActionBar(toolbar);

        rv= (RecyclerView) findViewById(R.id.rv);
        rv.setLayoutManager(new LinearLayoutManager(this));

        FloatingActionButton fab = (FloatingActionButton) findViewById(R.id.fab);
        fab.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View view) {
                filePaths.clear();
                FilePickerBuilder.getInstance().setMaxCount(5)
                        .setSelectedFiles(filePaths)
                        .setActivityTheme(R.style.AppTheme)
                        .pickPhoto(MainActivity.this);
            }
        });
    }

    @Override
    protected void onActivityResult(int requestCode, int resultCode, Intent data) {
        super.onActivityResult(requestCode, resultCode, data);
        switch (requestCode)
        {
            case FilePickerConst.REQUEST_CODE:
                if(resultCode==RESULT_OK && data!=null)
                {
                    filePaths = data.getStringArrayListExtra(FilePickerConst.KEY_SELECTED_PHOTOS);
                    Spacecraft s;
                    ArrayList<Spacecraft> spacecrafts=new ArrayList<>();

                    try
                    {
                        for (String path:filePaths) {
                            s=new Spacecraft();
                            s.setName(path.substring(path.lastIndexOf("/")+1));

                            s.setUri(Uri.fromFile(new File(path)));
                            spacecrafts.add(s);
                        }

                        rv.setAdapter(new MyAdapter(this,spacecrafts));
                        Toast.makeText(MainActivity.this, "Total = "+String.valueOf(spacecrafts.size()), Toast.LENGTH_SHORT).show();
                    }catch (Exception e)
                    {
                        e.printStackTrace();
                    }

                }
        }
    }

}
```

#### 6\. ActivityMain.xml

```xml
<?xml version="1.0" encoding="utf-8"?>
<android.support.design.widget.CoordinatorLayout xmlns:android="http://schemas.android.com/apk/res/android"
    xmlns:app="http://schemas.android.com/apk/res-auto"
    xmlns:tools="http://schemas.android.com/tools"
    android:layout_width="match_parent"
    android:layout_height="match_parent"
    android:fitsSystemWindows="true"
    tools:context="com.tutorials.hp.filepickerrecyclerview.MainActivity">

    <android.support.design.widget.AppBarLayout
        android:layout_width="match_parent"
        android:layout_height="wrap_content"
        android:theme="@style/AppTheme.AppBarOverlay">

        <android.support.v7.widget.Toolbar
            android:id="@+id/toolbar"
            android:layout_width="match_parent"
            android:layout_height="?attr/actionBarSize"
            android:background="?attr/colorPrimary"
            app:popupTheme="@style/AppTheme.PopupOverlay" />

    </android.support.design.widget.AppBarLayout>

    <include layout="@layout/content_main" />

    <android.support.design.widget.FloatingActionButton
        android:id="@+id/fab"
        android:layout_width="wrap_content"
        android:layout_height="wrap_content"
        android:layout_gravity="bottom|end"
        android:layout_margin="@dimen/fab_margin"
        android:src="@android:drawable/ic_dialog_email" />

</android.support.design.widget.CoordinatorLayout>
```

\#### ContentMain.xml

```xml
<?xml version="1.0" encoding="utf-8"?>
<RelativeLayout xmlns:android="http://schemas.android.com/apk/res/android"
    xmlns:app="http://schemas.android.com/apk/res-auto"
    xmlns:tools="http://schemas.android.com/tools"
    android:layout_width="match_parent"
    android:layout_height="match_parent"
    android:paddingBottom="@dimen/activity_vertical_margin"
    android:paddingLeft="@dimen/activity_horizontal_margin"
    android:paddingRight="@dimen/activity_horizontal_margin"
    android:paddingTop="@dimen/activity_vertical_margin"
    app:layout_behavior="@string/appbar_scrolling_view_behavior"
    tools:context="com.tutorials.hp.filepickerrecyclerview.MainActivity"
    tools:showIn="@layout/activity_main">

    <android.support.v7.widget.RecyclerView
        android:id="@+id/rv"
        android:layout_width="match_parent"
        android:layout_height="match_parent"
         />
</RelativeLayout>
```

#### 7\. Model.xml

```xml

<?xml version="1.0" encoding="utf-8"?>
<android.support.v7.widget.CardView xmlns:android="http://schemas.android.com/apk/res/android"
    android:orientation="horizontal" android:layout_width="match_parent"
    xmlns:card_view="http://schemas.android.com/apk/res-auto"
    android:layout_margin="10dp"
    card_view:cardCornerRadius="5dp"
    card_view:cardElevation="5dp"
    android:layout_height="200dp">

        <LinearLayout
            android:orientation="horizontal"
            android:layout_width="match_parent"
            android:layout_height="match_parent">

            <ImageView
                android:id="@+id/spacecraftImg"
                android:src="@drawable/placeholder"
                android:layout_width="150dp"
                android:paddingLeft="10dp"
                android:layout_height="wrap_content" />

            <LinearLayout
                android:orientation="vertical"
                android:layout_width="wrap_content"
                android:layout_height="wrap_content">

                <TextView
                    android:layout_width="wrap_content"
                    android:layout_height="wrap_content"
                    android:textAppearance="?android:attr/textAppearanceLarge"
                    android:text="Name"
                    android:id="@+id/nameTxt"
                    android:padding="10dp"
                    android:textColor="@color/colorAccent"
                    android:textStyle="bold"
                    android:layout_alignParentLeft="true"
                    />

            </LinearLayout>

            </LinearLayout>

</android.support.v7.widget.CardView>
```

#### How To Run

1. Download the project.
2. You'll get a zipped file,extract it.
3. Open the Android Studio.
4. Now close, already open project.
5. From the Menu bar click on File >New> Import Project.
6. Now Choose a Destination Folder, from where you want to import project.
7. Choose an Android Project.
8. Now Click on “OK“.
9. Done, your done importing the project,now edit it.

#### More Resources

| Resource | Link |
| --- | --- |
| GitHub Browse | Browse |
| GitHub Download Link | [Download](https://github.com/Oclemy/FilePickerRecyclerView/archive/master.zip) |

Best Regards, Oclemy.
