# Android Simple PDFViewer Examples


In this tutorial we will look at how to implement simple PDF Readers using ListView, GridView and recyclerview. We scan the device for a list of all the PDF documents in the device then list them in the adapterview. When the user clicks a single PDF Document, we render it in a new activity.


## Example 1: Android GridView PDF View – List,Render,Page,Zoom

_This is an android view pdf document programmitically tutorial and example._

We use pdf view android library called barteksc/AndroidPdfViewer, an open source pdf viewer library that is avaialble for free in android studio.

We create our project using android studio and we have the source available for download at the end of the tutorial.

Everybody knows PDFs, Portable Document Format. Am probably everybody has or uses them.Alot of information is rendered in PDFs and since android devices are the most popular devices around,we need a way of rendering these PDFs in our device.

Okay, there are PDF readers like Adobe and Foxit, but why not make yours as a side project while learning android development.Hey,with the wealth of libraries android has, its easier than you may think. You may make a quality PDF reader for yourself.

This is an example to introduce us by giving us a way to load PDFs into a GridView and render them. Then you can swipe through the pages,scroll, zoom a page etc. Here's a summary of what we do :

- Read all PDF files from our SDCard and display in our GridView.
- We shall display PDF icons alongside the PDF name.
- We display these in a nice CardView in our custom gridview.
- When the user clicks a single PDF from our gridview, we open the corresponding PDF and view it in a new activity.
- There the user can scroll to read all the pages, or swipe side by side to move to next page.
- Moreover he can zoom in and out.

![](https://github.com/Oclemy/GridViewPDF/blob/master/demos/GridViewPDF1.png?raw=true)

#### ![](https://github.com/Oclemy/GridViewPDF/blob/master/demos/GridViewPDF2.png?raw=true)

#### STEP BY STEP

#### STEP 1 : Our Build.Gradle

We are using Android PDF Viewer library so we need to add it as a dependency in our app level build.gradle. Moreover our Custom GridView has CardViews as our viewitems so lets add the appropriate support libraries.

![](https://github.com/Oclemy/GridViewPDF/blob/master/demos/ProjectStructure.png?raw=true)

You may use the later versions of this library.

Our GridView will contain custom CardViews so we need to add the CardView dependency as well.

```groovy
apply plugin: 'com.android.application'

android {
    compileSdkVersion 24
    buildToolsVersion "24.0.1"

    defaultConfig {
        applicationId "com.tutorials.hp.gridviewpdf"
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
    compile 'com.github.barteksc:android-pdf-viewer:1.4.0'
}
```

#### STEP 2 : Our AndroidManifest.xml

Given that we shall be reading our PDF documents from our File System in android device/emulator,lets add the permission for reading from external storage.

`android.permission.READ_EXTERNAL_STORAGE` allows us read files from the device's external storage. Please make sure you add this as failure to do so will result in you being unable to read the external storage at runtime.

Moreover we will register two activities: one our main activity and the other the PDFViewer Activity.

```xml
<?xml version="1.0" encoding="utf-8"?>
<manifest
    package="com.tutorials.hp.gridviewpdf">

    <uses-permission android_name="android.permission.READ_EXTERNAL_STORAGE" />

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
        <activity android_name=".PDF_Activity"></activity>
    </application>

</manifest>
```

#### STEP 3 : Our PDFDoc class

What are we working with PDF Documents. Yes, so lets do that in an Object Oriented way.Lets create a POJO data object to represent a PDF document with its properties like name and file path.

This is a data object that represents a single PDF document. The PDF will have the name and path as it's properties.

We then generate their getters and setters.

```java
package com.tutorials.hp.gridviewpdf;

import android.net.Uri;

public class PDFDoc {
    String name,path;

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getPath() {
        return path;
    }

    public void setPath(String path) {
        this.path = path;
    }
}
```

#### STEP 4 : Our CustomAdapter class

Because we are working a custom gridview as our adapterview.It therefore needs its adapter. Therefore We will derive from baseadapter, an abstract class from which other adapters like `ArrayAdapter` do derive.

```java
public class CustomAdapter extends BaseAdapter {..}
```

This class shall inflate our model layout into CardView view items of our gridview. So basically this gridview will contain cardviews with PDF documents.

This adapter class is also responsible for adapting our dataset into those respective views. A single cardview is comprising of image and text.

First a Context object as well as an arraylist of PDF Documents is passed to us via the constructor:

```java
    public CustomAdapter(Context c, ArrayList<PDFDoc> pdfDocs) {
        this.c = c;
        this.pdfDocs = pdfDocs;
    }
```

We also open activity,pdf activity when an item is clicked. We will create a method to do that for us:

```java
    private void openPDFView(String path)
    {
        Intent i=new Intent(c,PDF_Activity.class);
        i.putExtra("PATH",path);
        c.startActivity(i);
    }
```

As you can see we are using an intent, first instantiating, passing in the context as well as the target class.

Then using the `putExtra()` we pass the `PATH` and start the activity to open it.

```java
package com.tutorials.hp.gridviewpdf;

import android.content.Context;
import android.content.Intent;
import android.net.Uri;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.BaseAdapter;
import android.widget.ImageView;
import android.widget.TextView;
import android.widget.Toast;

import java.util.ArrayList;

public class CustomAdapter extends BaseAdapter {

    Context c;
    ArrayList<PDFDoc> pdfDocs;

    public CustomAdapter(Context c, ArrayList<PDFDoc> pdfDocs) {
        this.c = c;
        this.pdfDocs = pdfDocs;
    }

    @Override
    public int getCount() {
        return pdfDocs.size();
    }

    @Override
    public Object getItem(int i) {
        return pdfDocs.get(i);
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

        final PDFDoc pdfDoc= (PDFDoc) this.getItem(i);

        TextView nameTxt= (TextView) view.findViewById(R.id.nameTxt);
        ImageView img= (ImageView) view.findViewById(R.id.pdfImage);

        //BIND DATA
        nameTxt.setText(pdfDoc.getName());
        img.setImageResource(R.drawable.pdf_icon);

        //VIEW ITEM CLICK
        view.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View view) {
               openPDFView(pdfDoc.getPath());
            }
        });
        return view;
    }

    //OPEN PDF VIEW
    private void openPDFView(String path)
    {
        Intent i=new Intent(c,PDF_Activity.class);
        i.putExtra("PATH",path);
        c.startActivity(i);
    }
}
```

#### STEP 5 : Our MainActivity

This is our main activity. It will be extending the `AppCompatActivity`.

```java
public class MainActivity extends AppCompatActivity {..}
```

This activity is responsible for listing our pdf documents in a list of gridview. The user can the scroll through those pdf documents.

We will start by referencing the gridview by its id:

```java
        final GridView gv= (GridView) findViewById(R.id.gv);
```

We are showing a gridview with cardviews with images and text. The images are the pdf icons while the textviews will show the pdf document name.

When the user clicks the pdf document, we render the document in a new activity.

We will also be retrieving our pdf documents from the device and hold them in an arraylist here.

We will have a method called `getPDFs()`. This method will read all PDF files from the Download's directory in our external storage. In that way we can get the PDF names and their paths and assign them to a PDFDoc instance. Then return an arraylist of PDFDocs.

To do this first we get the downlaod's folder:

```java
        File downloadsFolder= Environment.getExternalStoragePublicDirectory(Environment.DIRECTORY_DOWNLOADS);
```

Then ensure it actually exists:

```java
        if(downloadsFolder.exists())
        {
            ...
        }
```

Then read all the files inside it into a file array:

```java
            File[] files=downloadsFolder.listFiles();
```

We will use the `endsWith()` method to filter out PDF documents:

```java
                if(file.getPath().endsWith("pdf"))
                {
                    ...
                }
```

```java
package com.tutorials.hp.gridviewpdf;

import android.net.Uri;
import android.os.Bundle;
import android.os.Environment;
import android.support.design.widget.FloatingActionButton;
import android.support.v7.app.AppCompatActivity;
import android.support.v7.widget.Toolbar;
import android.view.View;
import android.widget.GridView;

import java.io.File;
import java.util.ArrayList;

public class MainActivity extends AppCompatActivity {

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);
        Toolbar toolbar = (Toolbar) findViewById(R.id.toolbar);
        setSupportActionBar(toolbar);

        final GridView gv= (GridView) findViewById(R.id.gv);

        FloatingActionButton fab = (FloatingActionButton) findViewById(R.id.fab);
        fab.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View view) {
                gv.setAdapter(new CustomAdapter(MainActivity.this,getPDFs()));

            }
        });
    }

    private ArrayList<PDFDoc> getPDFs()

    {
        ArrayList<PDFDoc> pdfDocs=new ArrayList<>();
        //TARGET FOLDER
        File downloadsFolder= Environment.getExternalStoragePublicDirectory(Environment.DIRECTORY_DOWNLOADS);

        PDFDoc pdfDoc;

        if(downloadsFolder.exists())
        {
            //GET ALL FILES IN DOWNLOAD FOLDER
            File[] files=downloadsFolder.listFiles();

            //LOOP THRU THOSE FILES GETTING NAME AND URI
            for (int i=0;i<files.length;i++)
            {
                File file=files[i];

                if(file.getPath().endsWith("pdf"))
                {
                    pdfDoc=new PDFDoc();
                    pdfDoc.setName(file.getName());
                    pdfDoc.setPath(file.getAbsolutePath());

                    pdfDocs.add(pdfDoc);
                }

            }
        }

        return pdfDocs;
    }

}
```

#### STEP 5 : Our PDF Activity

This is the activity that actually renders the pdf document. The PDFs will be loaded from the device external storage and this activity will display them for viewing.

The path of the PDF document will be passed from the main activity via intent.

Then we load the pdf document via the path.

- This activity renders our PDF document.
- It receives the path to the PDF from our MainActivity and renders it.

As an Activity this class will also derive from AppCompatActivity:

```java
public class PDF_Activity extends AppCompatActivity {...}
```

We will reference the PDFView from our layout:

```java
        PDFView pdfView= (PDFView) findViewById(R.id.pdfView);
```

Beware that newer versions of PDF don't require you to specify the ScrollBar as we did here.

We will unpack or retrieve data that was sent via `Intent` from our MainActivity then use the `getExtras()` to get the path that was passed.

```java
        Intent i=this.getIntent();
        String path=i.getExtras().getString("PATH");
```

We will create a file from that path:

```java
        File file=new File(path);
```

Then check if that file can be read:

```java
            if(file.canRead())
            {
                ...
            }
```

And load our PDF file into the PDFView:

```java
                pdfView.fromFile(file).defaultPage(1).onLoad(new OnLoadCompleteListener() {
                    @Override
                    public void loadComplete(int nbPages) {
                        Toast.makeText(PDF_Activity.this, String.valueOf(nbPages), Toast.LENGTH_LONG).show();
                    }
                }).load();
```

```java
package com.tutorials.hp.gridviewpdf;

import android.content.Intent;
import android.support.v7.app.AppCompatActivity;
import android.os.Bundle;
import android.widget.Toast;

import com.github.barteksc.pdfviewer.PDFView;
import com.github.barteksc.pdfviewer.ScrollBar;
import com.github.barteksc.pdfviewer.listener.OnLoadCompleteListener;

import java.io.File;

public class PDF_Activity extends AppCompatActivity {

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_pdf);

        //PDFVIEW SHALL DISPLAY OUR PDFS
        PDFView pdfView= (PDFView) findViewById(R.id.pdfView);
        //SCROLLBAR TO ENABLE SCROLLING
        ScrollBar scrollBar = (ScrollBar) findViewById(R.id.scrollBar);
        pdfView.setScrollBar(scrollBar);
        //VERTICAL SCROLLING
        scrollBar.setHorizontal(false);
        //SACRIFICE MEMORY FOR QUALITY
        //pdfView.useBestQuality(true)

        //UNPACK OUR DATA FROM INTENT
        Intent i=this.getIntent();
        String path=i.getExtras().getString("PATH");

        //GET THE PDF FILE
        File file=new File(path);

            if(file.canRead())
            {
                //LOAD IT
                pdfView.fromFile(file).defaultPage(1).onLoad(new OnLoadCompleteListener() {
                    @Override
                    public void loadComplete(int nbPages) {
                        Toast.makeText(PDF_Activity.this, String.valueOf(nbPages), Toast.LENGTH_LONG).show();
                    }
                }).load();

            }

    }
}
```

# STEP 6 : Our Layouts

Here's our PDF Activity layout. All XML Layouts and source code are in the link below so please download it and run.

We have a RelativeLayout as our root layout.

We then specify the `PDFView` element in our XML document. This will be responsible for rendering or viewing our pdf document.

```xml
<?xml version="1.0" encoding="utf-8"?>
<RelativeLayout

    android_layout_width="match_parent"
    android_layout_height="match_parent"
    android_paddingBottom="@dimen/activity_vertical_margin"
    android_paddingLeft="@dimen/activity_horizontal_margin"
    android_paddingRight="@dimen/activity_horizontal_margin"
    android_paddingTop="@dimen/activity_vertical_margin"
    tools_context="com.tutorials.hp.gridviewpdf.PDF_Activity">

    <com.github.barteksc.pdfviewer.PDFView
        android_id="@+id/pdfView"
        android_layout_width="match_parent"
        android_layout_height="match_parent"
        android_layout_toLeftOf="@+id/scrollBar"/>

    <com.github.barteksc.pdfviewer.ScrollBar
        android_id="@+id/scrollBar"
        android_layout_width="wrap_content"
        android_layout_height="match_parent"
        android_layout_alignParentRight="true"
        android_layout_alignParentEnd="true" />

</RelativeLayout>
```

#### How To Download and Run

- Download the project above.
- You'll get a zipped file,extract it.
- Open the Android Studio.
- Now close, already open project
- From the Menu bar click on File >New> Import Project
- Now Choose a Destination Folder, from where you want to import project.
- Choose an Android Project.
- Now Click on “OK“.
- Done, your importing Project.
- Obviously you must have the PDFs you wanna display.

## Example 2: Android PDF Reader with ListView.

This is a tutorial about implementing a basic PDF Reader using ListView and third party PDF Rendering library.

We will list PDF items from external storage into a ListView. When you click a PDF item, a new PDF Reader activity is opened and you can read the PDF with advanced capabilities like zooming, scrolling, swiping and pagination.

### **Gradle Scripts**

Given we are using a third party PDF Renderer, we need to add dependencies in the app level `build.gradle`.

## **1\. Build.gadle**

- Go over and dependencies. We are using `android-pdf-viewer` library.

```groovy
    apply plugin: 'com.android.application'

    android {
        compileSdkVersion 24
        buildToolsVersion "24.0.1"

        defaultConfig {
            applicationId "com.tutorials.hp.listviewpdf"
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
        compile 'com.github.barteksc:android-pdf-viewer:1.4.0'
    }
```

### **LAYOUTS**

We'll work with 4 layouts:

# **1\. activity_main.xml**

- Our MainActivity layout.
- Root layout is `CordinatorLayout`.
- This layout defines:
    1. appbar
    2. Toolbar
    3. FloatingActionButton.
- We also include our `content_main.xml` here.

```xml
    <?xml version="1.0" encoding="utf-8"?>
    <android.support.design.widget.CoordinatorLayout

        android_layout_width="match_parent"
        android_layout_height="match_parent"
        android_fitsSystemWindows="true"
        tools_context="com.tutorials.hp.listviewpdf.MainActivity">

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

## **2\. content_main.xml**

- Still part of our MainActivity layout.
- Root layout is `RelativeLayout`
- It gets included inside the `activity_main.xml`.
- Will hold our ListView onto which our PDFs will be displayed.

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
        tools_context="com.tutorials.hp.listviewpdf.MainActivity"
        tools_showIn="@layout/activity_main">

        <ListView
            android_id="@+id/lv"
            android_layout_width="match_parent"
            android_layout_height="wrap_content"
            />
    </RelativeLayout>
```

## **3\. model.xml**

- Will model our custom rows for our listview.
- The listview should contain images and text. The images will be an icon to indicate a PDF. Thus the user knows the list contains PDFs.
- At the root tag is a `android.support.v7.widget.CardView`.

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
                    android_id="@+id/pdfImage"
                    android_src="@drawable/pdf_icon"
                    android_layout_width="150dp"
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

## **4\. activity_pdf.xml**

- Now this layout will be our PDF render layout.
- It's our PDF Viewer layout.

```xml
    <?xml version="1.0" encoding="utf-8"?>
    <RelativeLayout

        android_layout_width="match_parent"
        android_layout_height="match_parent"
        android_paddingBottom="@dimen/activity_vertical_margin"
        android_paddingLeft="@dimen/activity_horizontal_margin"
        android_paddingRight="@dimen/activity_horizontal_margin"
        android_paddingTop="@dimen/activity_vertical_margin"
        tools_context="com.tutorials.hp.listviewpdf.PDFActivity">

        <com.github.barteksc.pdfviewer.PDFView
            android_id="@+id/pdfView"
            android_layout_width="match_parent"
            android_layout_height="match_parent"
            android_layout_toLeftOf="@+id/scrollBar"/>

        <com.github.barteksc.pdfviewer.ScrollBar
            android_id="@+id/scrollBar"
            android_layout_width="wrap_content"
            android_layout_height="match_parent"
            android_layout_alignParentRight="true"
            android_layout_alignParentEnd="true" />
    </RelativeLayout>
```

### **JAVA CLASSES**

Let's now look at our 4 Java classes.

## **1\. PDFDoc.java**

This is our data object. Our POJO class.

POJO stands for Plain Old Java Object. We use this class to represent our data entity. In this case a PDF document.

This class will hold the PDF's:

- name
- path

```java
    package com.tutorials.hp.listviewpdf;

    public class PDFDoc {
        String name,path;

        public String getName() {
            return name;
        }

        public void setName(String name) {
            this.name = name;
        }

        public String getPath() {
            return path;
        }

        public void setPath(String path) {
            this.path = path;
        }
    }
```

## **2\. CustomAdapter.java**

This is our adapter class. It will derive from `android.widget.BaseAdapter`. This is what makes the class an adapter.

Then we'll override a couple of methods given that `BaseAdapter` is an abstract class.

An adapter class basically adapts data to custom views. Like in our case we have a ListView with images and text. well that's a custom listview. So we need the adapter class to help in binding the data to this listview.

We also handle `OnClick` event for our ListView here. Hence opening the PDF Activity to view/read the PDF document.

```java
    package com.tutorials.hp.listviewpdf;

    import android.content.Context;
    import android.content.Intent;
    import android.view.LayoutInflater;
    import android.view.View;
    import android.view.ViewGroup;
    import android.widget.BaseAdapter;
    import android.widget.ImageView;
    import android.widget.TextView;

    import java.util.ArrayList;

    /**
     * Created by Oclemy on 7/28/2016 for ProgrammingWizards Channel and http://www.camposha.com.
     */
    public class CustomAdapter extends BaseAdapter {

        Context c;
        ArrayList<PDFDoc> pdfDocs;

        public CustomAdapter(Context c, ArrayList<PDFDoc> pdfDocs) {
            this.c = c;
            this.pdfDocs = pdfDocs;
        }

        @Override
        public int getCount() {
            return pdfDocs.size();
        }

        @Override
        public Object getItem(int i) {
            return pdfDocs.get(i);
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

            final PDFDoc pdfDoc= (PDFDoc) this.getItem(i);

            TextView nameTxt= (TextView) view.findViewById(R.id.nameTxt);
            ImageView img= (ImageView) view.findViewById(R.id.pdfImage);

            //BIND DATA
            nameTxt.setText(pdfDoc.getName());
            img.setImageResource(R.drawable.pdf_icon);

            //VIEW ITEM CLICK
            view.setOnClickListener(new View.OnClickListener() {
                @Override
                public void onClick(View view) {
                   openPDFView(pdfDoc.getPath());
                }
            });
            return view;
        }

        //OPEN PDF VIEW
        private void openPDFView(String path)
        {
            Intent i=new Intent(c,PDFActivity.class);
            i.putExtra("PATH",path);
            c.startActivity(i);
        }
    }
```

## **3\. PDFActivity.java**

This is class is an activity because we derive from `android.support.v7.app.AppCompatActivity`, which is a support version of `android.app.activity`.

This class is our PDF Renderer/PDF Viewer. Users will read PDF documents here.

The first activity(`MainActivity`) will be responsible for listing pdf documents. This activity, however, will be responsible or viewing them.

```java
    package com.tutorials.hp.listviewpdf;

    import android.content.Intent;
    import android.support.v7.app.AppCompatActivity;
    import android.os.Bundle;
    import android.widget.Toast;

    import com.github.barteksc.pdfviewer.PDFView;
    import com.github.barteksc.pdfviewer.ScrollBar;
    import com.github.barteksc.pdfviewer.listener.OnLoadCompleteListener;

    import java.io.File;

    public class PDFActivity extends AppCompatActivity {

        @Override
        protected void onCreate(Bundle savedInstanceState) {
            super.onCreate(savedInstanceState);
            setContentView(R.layout.activity_pdf);

            //PDFVIEW SHALL DISPLAY OUR PDFS
            PDFView pdfView= (PDFView) findViewById(R.id.pdfView);
            //SCROLLBAR TO ENABLE SCROLLING
            ScrollBar scrollBar = (ScrollBar) findViewById(R.id.scrollBar);
            pdfView.setScrollBar(scrollBar);
            //VERTICAL SCROLLING
            scrollBar.setHorizontal(false);
            //SACRIFICE MEMORY FOR QUALITY
            //pdfView.useBestQuality(true)

            //UNPACK OUR DATA FROM INTENT
            Intent i=this.getIntent();
            String path=i.getExtras().getString("PATH");

            //GET THE PDF FILE
            File file=new File(path);

            if(file.canRead())
            {
                //LOAD IT
                pdfView.fromFile(file).defaultPage(1).onLoad(new OnLoadCompleteListener() {
                    @Override
                    public void loadComplete(int nbPages) {
                        Toast.makeText(PDFActivity.this, String.valueOf(nbPages), Toast.LENGTH_LONG).show();
                    }
                }).load();

            }

        }
    }
```

## **4\. MainActivity.java**

This is our launcher activity. This means when the app is run it is this activity that gets executed by default.

This class derives from `android.support.v7.app.AppCompatActivity`.

We proceed and override the `OnCreate(0` method.

We will read our android external storage to obtain PDF documents from downloads directory here.

We will then list these pdf documents in the mainactivity.

```java
    package com.tutorials.hp.listviewpdf;

    import android.os.Bundle;
    import android.os.Environment;
    import android.support.design.widget.FloatingActionButton;
    import android.support.v7.app.AppCompatActivity;
    import android.support.v7.widget.Toolbar;
    import android.view.View;
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
                    lv.setAdapter(new CustomAdapter(MainActivity.this,getPDFs()));

                }
            });
        }

        private ArrayList<PDFDoc> getPDFs()

        {
            ArrayList<PDFDoc> pdfDocs=new ArrayList<>();
            //TARGET FOLDER
            File downloadsFolder= Environment.getExternalStoragePublicDirectory(Environment.DIRECTORY_DOWNLOADS);

            PDFDoc pdfDoc;

            if(downloadsFolder.exists())
            {
                //GET ALL FILES IN DOWNLOAD FOLDER
                File[] files=downloadsFolder.listFiles();

                //LOOP THRU THOSE FILES GETTING NAME AND URI
                for (int i=0;i<files.length;i++)
                {
                    File file=files[i];

                    if(file.getPath().endsWith("pdf"))
                    {
                        pdfDoc=new PDFDoc();
                        pdfDoc.setName(file.getName());
                        pdfDoc.setPath(file.getAbsolutePath());

                        pdfDocs.add(pdfDoc);
                    }

                }
            }

            return pdfDocs;
        }
    }
```

## **AndroidManifest.xml**

Add this permission in your androidmanifest:

```
<uses-permission android_name="android.permission.READ_EXTERNAL_STORAGE" />
```

### **Download**

Download code below.

Download the source code [here](http://github.com/Oclemy/Android-ListViewPDF).
