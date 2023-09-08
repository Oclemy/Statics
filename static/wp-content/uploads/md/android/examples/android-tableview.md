# TableView Tutorial and Examples


_Android TableView Tutorial._

TableView is an android library that allows us create and work with Tables in android.

It contains a simple TableView and an advanced SortableTableView.


#### Requirements of a TableView

TableView requires Android Minimum SDK version of 11 and Compule SDK Version of 25.

#### Installing TableView

TableView can be installed by adding the following implementation statement in your app leve build.gradle:

```groovy
implementation 'de.codecrafters.tableview:tableview:2.8.0'
```

#### Working with TableView

This involves two processes:

1. Addding the TableView Element in Your Layout:

```xml
<de.codecrafters.tableview.TableView

    android_id="@+id/tableView"
    android_layout_width="match_parent"
    android_layout_height="match_parent"
    table_tableView_columnCount="4" />
```

You can modify the number of columns you want your android table to have.

1. Referencing the TableView: Then you reference the TableView in your Java code:
    
    ```java
    TableView tableView = (TableView) findViewById(R.id.tableView);
    ```
    
    Here you can also modify the number of columns you want:
    
    ```java
    tableView.setColumnCount(4);
    ```
    

#### Handling Column Widths

TableView allows you modify the column widths in various manners:

1. Absolutely Using `TableColumnDpWidthModel` or `TableColumnPxWidthModel` Here's an example with `TableColumnDpWidthModel`:
    
    ```java
    TableColumnDpWidthModel columnModel = new TableColumnDpWidthModel(context, 4, 200);
    columnModel.setColumnWidth(1, 300);
    columnModel.setColumnWidth(2, 250);
    tableView.setColumnModel(columnModel);
    ```
    
    And here's one with `TableColumnPxWidthModel`:
    
    ```java
    TableColumnPxWidthModel columnModel = new TableColumnPxWidthModel(4, 350);
    columnModel.setColumnWidth(1, 500);
    columnModel.setColumnWidth(2, 600);
    tableView.setColumnModel(columnModel);
    ```
    
2. Relatively with the TableColumnWeightModel The defauly column weight is 1.
    
    ```java
    TableColumnWeightModel columnModel = new TableColumnWeightModel(4);
    columnModel.setColumnWeight(1, 2);
    columnModel.setColumnWeight(2, 2);
    tableView.setColumnModel(columnModel);
    ```
    

#### Showing Data

Data can be shown easily in TableView with help of `SimpleTableDataAdapter` class.

This allows us easily render two-dimensional string array in a tabular format.

This adapter will turn the strings you supply into TextViews and display them inside TableView at the same position as previous in the 2D-String-Array.

Here's an example:

```java
public class MainActivity extends AppCompatActivity {

    private static final String[][] DATA_TO_SHOW = { { "This", "is", "a", "test" },
                                                     { "and", "a", "second", "test" } };

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);

        TableView<String[]> tableView = (TableView<String[]>) findViewById(R.id.tableView);
        tableView.setDataAdapter(new SimpleTableDataAdapter(this, DATA_TO_SHOW));
    }
}
```

## Example 1: Android TableView – Fill From Array – With Headers and RowClick

Android has a couple of inbuilt adapterviews like ListView,GridView,RecyclerView and Spinner that are used as the core of most modern apps.And thats pretty good cause most apps consist of Lists of data.

The above generally display lists of data.However,there are situations where you want to use the old fashioned table,with rows and columns.Infact in desktop and web development,with programming languages like Java and C# the tableviews are the most popular.Think components like JTable and DataGridView.

Today we use TableView library by Codecrafters and craft a table with header,rows and columns.Moreover,we handle ItemClicks,showing a toast message.

#### We are Building a Vibrant YouTube Community

We have a fast rising YouTube Channel of friends. So far we've accumulated almost 3 million agreggate views and more than 10,000 subscribers as of the time of writing this. Here's the Channel: [ProgrammingWizards TV](https://www.youtube.com/c/programmingwizards).

Please go ahead subscribe(free obviously) as well. If you have a question or a comment you can post there instead of in this site.People are suggesting us tutorials to do there so you can too.

Before we get into our example, we need to introduce the few classes that we will be using.

#### What is a String?

Well you know android is coded in java. Java is the primary programming language for android development as of yet.

In our example we will be looking at binding a two-dimensional string array into our TableView. In the process we have a simple TableView with headers, columns and rows.

Java doesn't have a primitive type for strings. However, there is a class called `String` that can be used to store and process strings of characters.

Here's an example of displaying a string literal:

```java
System.out.println("Hello Camposha.");
```

And here's how to declare a string in java:

```java
String name;
```

Then we can assign it in the following manner:

```java
name = "Oclemy";
```

Or we can have it in a single statement:

```java
String name = "Oclemy"
```

#### What is an Array?

An array is a data structure that behaves like a list of variables with a uniform naming mechanism that can be declared in a single line of simple code.

You use an array to store a sequence of similar data type values. You can for instance have an array of strings or an array of integers.

You can create an array in the following manner:

```java
double[] scores = new double[10];
```

You can get the length of an array using the `length` property:

```java
System.out.println("Enter " + score.length + " scores:");
```

You can initialize an array in the following manner:

```java
int[] age = {20, 42, 19,35};
```

#### What is TableView?

TableView is an android library that allows us create and work with Tables in android.

It contains a simple TableView and an advanced SortableTableView.

There is both a free and a premium version of tableView.

#### Requirements of a TableView

TableView requires Android Minimum SDK version of 11 and Compule SDK Version of 25.

#### Installing TableView

TableView can be installed by adding the following implementation statement in your app leve build.gradle:

```groovy
implementation 'de.codecrafters.tableview:tableview:2.8.0'
```

#### Working with TableView

This involves two processes:

1. Addding the TableView Element in Your Layout:

```xml
<de.codecrafters.tableview.TableView

    android_id="@+id/tableView"
    android_layout_width="match_parent"
    android_layout_height="match_parent"
    table_tableView_columnCount="4" />
```

You can modify the number of columns you want your android table to have.

1. Referencing the TableView: Then you reference the TableView in your Java code:
    
    ```java
    TableView tableView = (TableView) findViewById(R.id.tableView);
    ```
    
    Here you can also modify the number of columns you want:
    
    ```java
    tableView.setColumnCount(4);
    ```
    

#### Handling Column Widths

TableView allows you modify the column widths in various manners:

1. Absolutely Using `TableColumnDpWidthModel` or `TableColumnPxWidthModel` Here's an example with `TableColumnDpWidthModel`:
    
    ```java
    TableColumnDpWidthModel columnModel = new TableColumnDpWidthModel(context, 4, 200);
    columnModel.setColumnWidth(1, 300);
    columnModel.setColumnWidth(2, 250);
    tableView.setColumnModel(columnModel);
    ```
    
    And here's one with `TableColumnPxWidthModel`:
    
    ```java
    TableColumnPxWidthModel columnModel = new TableColumnPxWidthModel(4, 350);
    columnModel.setColumnWidth(1, 500);
    columnModel.setColumnWidth(2, 600);
    tableView.setColumnModel(columnModel);
    ```
    
2. Relatively with the TableColumnWeightModel The defauly column weight is 1.
    
    ```java
    TableColumnWeightModel columnModel = new TableColumnWeightModel(4);
    columnModel.setColumnWeight(1, 2);
    columnModel.setColumnWeight(2, 2);
    tableView.setColumnModel(columnModel);
    ```
    

#### Showing Data

Data can be shown easily in TableView with help of `SimpleTableDataAdapter` class.

This allows us easily render two-dimensional string array in a tabular format.

This adapter will turn the strings you supply into TextViews and display them inside TableView at the same position as previous in the 2D-String-Array.

Here's an example:

```java
public class MainActivity extends AppCompatActivity {

    private static final String[][] SPACESHIPS = { { "Casini", "Chemical", "NASA", "Jupiter" },
                                                     { "Spitzer", "Nuclear", "NASA", "Alpha Centauri" } };

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);

        TableView<String[]> tableView = (TableView<String[]>) findViewById(R.id.tableView);
        tableView.setDataAdapter(new SimpleTableDataAdapter(this, SPACESHIPS));
    }
}
```

Let's look at a full example.

# What we do :

- Show a tableview.
- Populate its column headers with data.The header has its own adapter using SimpleTableHeaderAdapter.
- Populate rows with data .It has its own adapter using SimpleTableDataAdapter.
- Change header background color and set its column count.
- Handle ItemClicks for our rows.
- When a row is clicked show a toast with clicked data.

##### Screenshot

- Here's the screenshot of the project.

![](https://github.com/Oclemy/SimpleTable/blob/master/demos/SimpleTable1.png?raw=true)

![](https://github.com/Oclemy/SimpleTable/blob/master/demos/TatbleStructure.png?raw=true)

# Tools Used

This example was written with the following tools:

- Windows 8
- AndroidStudio IDE
- Genymotion Emulator
- Language : Java

# Source Code

Lets jump directly to the source code.

#### Build.Gradle App Level

- Android Studio has added for us dependencies for AppCompat and Design support libraries.
- Now lets add dependencies for TableView.
- It shall be fetched from online so be connected fro the first time you are adding.

```groovy
apply plugin: 'com.android.application'

android {
    compileSdkVersion 24
    buildToolsVersion "24.0.1"

    defaultConfig {
        applicationId "com.tutorials.hp.simpletable"
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
    compile 'de.codecrafters.tableview:tableview:2.2.0'
}
```

#### MainActivity.java

Main Responsibility : LAUNCH OUR APP.

- We shall reference the views like TableView  here,from our XML Layouts.
- We then initialize our SimpleTableHeaderAdapter and SimpleTableDataAdapters.
- Then pass our data aray to it.
- Header shall take a single dimensional array while the data shall take a multidimensional array.
- Then set them to our tableview.
- Then hande our itemclicks.

```java
package com.tutorials.hp.simpletable;

import android.graphics.Color;
import android.os.Bundle;
import android.support.design.widget.FloatingActionButton;
import android.support.design.widget.Snackbar;
import android.support.v7.app.AppCompatActivity;
import android.support.v7.widget.Toolbar;
import android.view.View;
import android.view.Menu;
import android.view.MenuItem;
import android.widget.Toast;

import java.util.ArrayList;

import de.codecrafters.tableview.TableView;
import de.codecrafters.tableview.listeners.TableDataClickListener;
import de.codecrafters.tableview.toolkit.SimpleTableDataAdapter;
import de.codecrafters.tableview.toolkit.SimpleTableHeaderAdapter;

public class MainActivity extends AppCompatActivity {

    static String[][] spaceProbes={
            {"1","Pioneer","Chemical","Jupiter"},
            {"2","Voyager","Plasma","Andromeda"},
            {"3","Casini","Solar","Saturn"},
            {"4","Spitzer","Anti-Matter","Andromeda"},
            {"5","Apollo","Chemical","Moon"},
            {"6","Curiosity","Solar","Mars"},

    };
    static String[] spaceProbeHeaders={"No","Name","Propellant","Destination"};

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);
        Toolbar toolbar = (Toolbar) findViewById(R.id.toolbar);
        setSupportActionBar(toolbar);
        FloatingActionButton fab = (FloatingActionButton) findViewById(R.id.fab);

        final TableView<String[]> tableView = (TableView<String[]>) findViewById(R.id.tableView);

        //SET PROP
        tableView.setHeaderBackgroundColor(Color.parseColor("#2ecc71"));
        tableView.setHeaderAdapter(new SimpleTableHeaderAdapter(this,spaceProbeHeaders));
        tableView.setColumnCount(4);

        fab.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View view) {
                tableView.setDataAdapter(new SimpleTableDataAdapter(MainActivity.this, spaceProbes));

            }
        });

        tableView.addDataClickListener(new TableDataClickListener() {
            @Override
            public void onDataClicked(int rowIndex, Object clickedData) {
                Toast.makeText(MainActivity.this, ((String[])clickedData)[1], Toast.LENGTH_SHORT).show();
            }
        });

    }

}
```

#### ActivityMain.xml

- Inflated as our activity's view.
- Includes our content main.

```xml
<?xml version="1.0" encoding="utf-8"?>
<android.support.design.widget.CoordinatorLayout

    android_layout_width="match_parent"
    android_layout_height="match_parent"
    android_fitsSystemWindows="true"
    tools_context="com.tutorials.hp.simpletable.MainActivity">

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

- Defines our view hierarchy.
- In this case shall hold our tableview.So please add the below tableview tag with its appropriate properties.

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
    tools_context="com.tutorials.hp.simpletable.MainActivity"
    tools_showIn="@layout/activity_main">

    <de.codecrafters.tableview.TableView
        android_id="@+id/tableView"
        android_layout_width="wrap_content"
        android_layout_height="wrap_content"
         />
</RelativeLayout>
```

#### Video/Preview

- We have a [YouTube channel](https://www.youtube.com/c/ProgrammingWizards) with almost a thousand tutorials, this one below being one of them.

#### How To Run

1. Download the project above.
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
| Source Code | [Download](https://github.com/Oclemy/SimpleTable/archive/master.zip) |
| Video Tutorial | [YouTube Video](https://youtu.be/pq4AXt24Y4Q) |

## Example 2: Android TableView – Fill With List of Objects – With Headers and RowClick

Android has a couple of inbuilt adapterviews like ListView,GridView,RecyclerView and Spinner that are used as the core of most modern apps.And thats pretty good cause most apps consist of Lists of data.The above generally display lists of data.

However,there are situations where you want to use the old fashioned table,with rows and columns.Infact in desktop and web development,with programming languages like Java and C# the tableviews are the most popular.Think components like JTable and DataGridView.

Today we use TableView library by Codecrafters and craft a table with header,rows and columns.Moreover,we handle ItemClicks,showing a toast message.

#### We are Building a Vibrant YouTube Community

We have a fast rising YouTube Channel of friends. So far we've accumulated almost 3 million agreggate views and more than 10,000 subscribers as of the time of writing this. Here's the Channel: [ProgrammingWizards TV](https://www.youtube.com/c/programmingwizards).

Please go ahead subscribe(free obviously) as well. If you have a question or a comment you can post there instead of in this site.People are suggesting us tutorials to do there so you can too.

Before we get into our example, we need to introduce the few classes that we will be using.

#### What is TableView?

TableView is an android library that allows us create and work with Tables in android.

It contains a simple TableView and an advanced SortableTableView.

There is both a free and a premium version of tableView.

#### Requirements of a TableView

TableView requires Android Minimum SDK version of 11 and Compule SDK Version of 25.

#### Installing TableView

TableView can be installed by adding the following implementation statement in your app leve build.gradle:

```groovy
implementation 'de.codecrafters.tableview:tableview:2.8.0'
```

#### Working with TableView

This involves two processes:

1. Addding the TableView Element in Your Layout:

```xml
<de.codecrafters.tableview.TableView

    android_id="@+id/tableView"
    android_layout_width="match_parent"
    android_layout_height="match_parent"
    table_tableView_columnCount="4" />
```

You can modify the number of columns you want your android table to have.

1. Referencing the TableView: Then you reference the TableView in your Java code:
    
    ```java
    TableView tableView = (TableView) findViewById(R.id.tableView);
    ```
    
    Here you can also modify the number of columns you want:
    
    ```java
    tableView.setColumnCount(4);
    ```
    

#### Handling Column Widths

TableView allows you modify the column widths in various manners:

1. Absolutely Using `TableColumnDpWidthModel` or `TableColumnPxWidthModel` Here's an example with `TableColumnDpWidthModel`:
    
    ```java
    TableColumnDpWidthModel columnModel = new TableColumnDpWidthModel(context, 4, 200);
    columnModel.setColumnWidth(1, 300);
    columnModel.setColumnWidth(2, 250);
    tableView.setColumnModel(columnModel);
    ```
    
    And here's one with `TableColumnPxWidthModel`:
    
    ```java
    TableColumnPxWidthModel columnModel = new TableColumnPxWidthModel(4, 350);
    columnModel.setColumnWidth(1, 500);
    columnModel.setColumnWidth(2, 600);
    tableView.setColumnModel(columnModel);
    ```
    
2. Relatively with the TableColumnWeightModel The defauly column weight is 1.
    
    ```java
    TableColumnWeightModel columnModel = new TableColumnWeightModel(4);
    columnModel.setColumnWeight(1, 2);
    columnModel.setColumnWeight(2, 2);
    tableView.setColumnModel(columnModel);
    ```
    

#### Showing Data

Data can be shown easily in TableView with help of `SimpleTableDataAdapter` class.

This allows us easily render two-dimensional string array in a tabular format.

This adapter will turn the strings you supply into TextViews and display them inside TableView at the same position as previous in the 2D-String-Array.

Here's an example:

```java
public class MainActivity extends AppCompatActivity {

    private static final String[][] SPACESHIPS = { "Casini", "Chemical", "NASA", "Jupiter" },
                                                     { "Spitzer", "Nuclear", "NASA", "Alpha Centauri" } };

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);

        TableView<String[]> tableView = (TableView<String[]>) findViewById(R.id.tableView);
        tableView.setDataAdapter(new SimpleTableDataAdapter(this, SPACESHIPS));
    }
}
```

Let's look at a full example.

# What we do :

- Show a tableview.
- Populate its column headers with data.The header has its own adapter using SimpleTableHeaderAdapter.
- Populate rows with data .It has its own adapter using SimpleTableDataAdapter.
- Change header background color and set its column count.
- Handle ItemClicks for our rows.
- When a row is clicked show a toast with clicked data.

## SECTION 1 : Our Dependencies

Build.Gradle

- Android Studio has added for us dependencies for AppCompat library for our AppCompatActivity.
- Now lets add dependencies for TableView.
- It shall be fetched from online so be connected fro the first time you are adding.

```groovy
apply plugin: 'com.android.application'

android {
    compileSdkVersion 24
    buildToolsVersion "24.0.1"

    defaultConfig {
        applicationId "com.tutorials.hp.tablelistobjects"
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
    compile 'de.codecrafters.tableview:tableview:2.2.0'
}
```

## SECTION 2 : Our Data Object

Spacecraft.java

- Represents a single object.Here I'll use Spacecraft.
- The object shall have various properties like name,title,date etc.
- Each object shall occupy a specific row.
- Its corresponding properties then occupy the cells.

```java
package com.tutorials.hp.tablelistobjects;

public class Spaceprobe {

    String id,name,propellant,destination;

    public String getId() {
        return id;
    }

    public void setId(String id) {
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

    public void setPropellant(String propellant) {
        this.propellant = propellant;
    }

    public String getDestination() {
        return destination;
    }

    public void setDestination(String destination) {
        this.destination = destination;
    }
}
```

## SECTION 3 : Our Activity

MainActivity class.

Main Responsibility : LAUNCH OUR APP.

- We shall reference the views like TableView  here,from our XML Layouts.
- We then initialize our SimpleTableHeaderAdapter and SimpleTableDataAdapters.
- Then pass our data aray to it.
- Header shall take a single dimensional array while the data shall take a multidimensional array.
- Then set them to our tableview.
- Then hande our itemclicks.

```java
package com.tutorials.hp.tablelistobjects;

import android.graphics.Color;
import android.os.Bundle;
import android.support.v7.app.AppCompatActivity;
import android.widget.Toast;

import java.util.ArrayList;

import de.codecrafters.tableview.TableView;
import de.codecrafters.tableview.listeners.TableDataClickListener;
import de.codecrafters.tableview.toolkit.SimpleTableDataAdapter;
import de.codecrafters.tableview.toolkit.SimpleTableHeaderAdapter;

public class MainActivity extends AppCompatActivity {

    String[] spaceProbeHeaders={"ID","Name","Propellant","Destination"};
    String[][] spaceProbes;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);

        final TableView<String[]> tb = (TableView<String[]>) findViewById(R.id.tableView);
        tb.setColumnCount(4);
        tb.setHeaderBackgroundColor(Color.parseColor("#2ecc71"));

        //POPULATE
        populateData();

         //ADAPTERS
        tb.setHeaderAdapter(new SimpleTableHeaderAdapter(this,spaceProbeHeaders));
        tb.setDataAdapter(new SimpleTableDataAdapter(this, spaceProbes));

        tb.addDataClickListener(new TableDataClickListener() {
            @Override
            public void onDataClicked(int rowIndex, Object clickedData) {
                Toast.makeText(MainActivity.this, ((String[])clickedData)[1], Toast.LENGTH_SHORT).show();
            }
        });

    }
    private void populateData()
    {
        Spaceprobe spaceprobe=new Spaceprobe();
        ArrayList<Spaceprobe> spaceprobeList=new ArrayList<>();

        spaceprobe.setId("1");
        spaceprobe.setName("Pioneer");
        spaceprobe.setPropellant("Solar");
        spaceprobe.setDestination("Venus");
        spaceprobeList.add(spaceprobe);

        spaceprobe=new Spaceprobe();
        spaceprobe.setId("2");
        spaceprobe.setName("Casini");
        spaceprobe.setPropellant("Nuclear");
        spaceprobe.setDestination("Jupiter");
        spaceprobeList.add(spaceprobe);

        spaceprobe=new Spaceprobe();
        spaceprobe.setId("3");
        spaceprobe.setName("Apollo");
        spaceprobe.setPropellant("Chemical");
        spaceprobe.setDestination("Moon");
        spaceprobeList.add(spaceprobe);

        spaceprobe=new Spaceprobe();
        spaceprobe.setId("4");
        spaceprobe.setName("Enterpise");
        spaceprobe.setPropellant("Anti-Matter");
        spaceprobe.setDestination("Andromeda");
        spaceprobeList.add(spaceprobe);

        spaceProbes= new String[spaceprobeList.size()][4];
        // spaceProbes= new String[][]{{}};

        for (int i=0;i<spaceprobeList.size();i++) {

            Spaceprobe s=spaceprobeList.get(i);

            spaceProbes[i][0]=s.getId();
            spaceProbes[i][1]=s.getName();
            spaceProbes[i][2]=s.getPropellant();
            spaceProbes[i][3]=s.getDestination();

        }
    }

}
```

## SECTION 5 : Our Layouts

ActivityMain.xml Layout.

- Inflated as our activity's view.
- Includes our content main.
- In this case shall hold our tableview.So please add the below tableview tag with its appropriate properties.

```xml
<?xml version="1.0" encoding="utf-8"?>
<RelativeLayout

    android_layout_width="match_parent"
    android_layout_height="match_parent"
    android_paddingBottom="@dimen/activity_vertical_margin"
    android_paddingLeft="@dimen/activity_horizontal_margin"
    android_paddingRight="@dimen/activity_horizontal_margin"
    android_paddingTop="@dimen/activity_vertical_margin"
    tools_context="com.tutorials.hp.tablelistobjects.MainActivity">

    <de.codecrafters.tableview.TableView
        android_id="@+id/tableView"
        android_layout_width="wrap_content"
        android_layout_height="wrap_content"
        />
</RelativeLayout>
```

## Example 3: Android TableView – Fill With HashTable of Objects – With Headers and RowClick

Android has a couple of inbuilt adapterviews like ListView,GridView,RecyclerView and Spinner that are used as the core of most modern apps.And thats pretty good cause most apps consist of Lists of data.

The above generally display lists of data.However,there are situations where you want to use the old fashioned table,with rows and columns.Infact in desktop and web development,with programming languages like Java and C# the tableviews are the most popular.

Think components like JTable and DataGridView. Today we use TableView library by Codecrafters and craft a table with header,rows and columns.Moreover,we handle ItemClicks,showing a toast message.

## What we do :

- Show a tableview.
- Populate its column headers with data.The header has its own adapter using SimpleTableHeaderAdapter.
- Populate rows with data .It has its own adapter using SimpleTableDataAdapter.
- Change header background color and set its column count.
- Handle ItemClicks for our rows.
- When a row is clicked show a toast with clicked data.

## SECTION 1 : Our Dependencies

**Build.Gradle**

- Android Studio has added for us dependencies for AppCompat and Design support libraries.
- Note we are using AppCompatActivity.
- Design support libraries are for cordinatorlayout,appbar layout,toolbar and floating action button.All contained in our ActivityMain.xml layout specification.
- Now lets add dependencies for TableView.
- It shall be fetched from online so be connected fro the first time you are adding.

```groovy
apply plugin: 'com.android.application'

android {
    compileSdkVersion 24
    buildToolsVersion "24.0.1"

    defaultConfig {
        applicationId "com.tutorials.hp.tableviewhashtable"
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
    compile 'com.android.support:appcompat-v7:24.2.0'
    compile 'com.android.support:design:24.2.0'
    compile 'de.codecrafters.tableview:tableview:2.2.0'
}
```

## SECTION 2 : Our Data Object

**Spacecraft.java**

Main Responsibility : IS A SINGLE DATA OBJECT

- Represents a single object.Here I'll use Spacecraft.
- The object shall have various properties like name,title,date etc.
- Each object shall occupy a specific row.
- Its corresponding properties then occupy the cells.

```java
package com.tutorials.hp.tableviewhashtable;

public class Spaceprobe {

    String id,name,propellant,destination;

    public String getId() {
        return id;
    }

    public void setId(String id) {
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

    public void setPropellant(String propellant) {
        this.propellant = propellant;
    }

    public String getDestination() {
        return destination;
    }

    public void setDestination(String destination) {
        this.destination = destination;
    }
}
```

## SECTION 3 : Our Activity

**MainActivity class.**

Main Responsibility : LAUNCH OUR APP.

- We shall reference the views like TableView  here,from our XML Layouts.
- We then initialize our SimpleTableHeaderAdapter and SimpleTableDataAdapters.
- Our data source shall be a hashtable filled with our data objects.
- We read from our hashtable and fill an array.
- Then pass our data array to it.
- Header shall take a single dimensional array while the data shall take a multidimensional array.
- Then set them to our tableview.
- Then hande our itemclicks.

```java
package com.tutorials.hp.tableviewhashtable;

import android.graphics.Color;
import android.os.Bundle;
import android.support.design.widget.FloatingActionButton;
import android.support.design.widget.Snackbar;
import android.support.v7.app.AppCompatActivity;
import android.support.v7.widget.Toolbar;
import android.view.View;
import android.view.Menu;
import android.view.MenuItem;
import android.widget.Toast;

import java.util.Hashtable;

import de.codecrafters.tableview.TableView;
import de.codecrafters.tableview.listeners.TableDataClickListener;
import de.codecrafters.tableview.toolkit.SimpleTableDataAdapter;
import de.codecrafters.tableview.toolkit.SimpleTableHeaderAdapter;

public class MainActivity extends AppCompatActivity {

    String[] spaceProbeHeaders={"ID","Name","Propellant","Destination"};
    String[][] spaceProbes;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);

        final TableView<String[]> tb = (TableView<String[]>) findViewById(R.id.tableView);
        tb.setColumnCount(4);
        tb.setHeaderBackgroundColor(Color.parseColor("#2ecc71"));

        //POPULATE
        populateData();

        //ADAPTERS
        tb.setHeaderAdapter(new SimpleTableHeaderAdapter(this,spaceProbeHeaders));
        tb.setDataAdapter(new SimpleTableDataAdapter(this, spaceProbes));

        tb.addDataClickListener(new TableDataClickListener() {
            @Override
            public void onDataClicked(int rowIndex, Object clickedData) {
                Toast.makeText(MainActivity.this, ((String[])clickedData)[1], Toast.LENGTH_SHORT).show();
            }
        });

    }
    private void populateData()
    {
        Spaceprobe spaceprobe=new Spaceprobe();
        Hashtable<String,Spaceprobe> spaceprobeList=new Hashtable<>();

        spaceprobe.setId("1");
        spaceprobe.setName("Pioneer");
        spaceprobe.setPropellant("Solar");
        spaceprobe.setDestination("Venus");
        spaceprobeList.put(spaceprobe.getId(),spaceprobe);

        spaceprobe=new Spaceprobe();
        spaceprobe.setId("2");
        spaceprobe.setName("Casini");
        spaceprobe.setPropellant("Nuclear");
        spaceprobe.setDestination("Jupiter");
        spaceprobeList.put(spaceprobe.getId(),spaceprobe);

        spaceprobe=new Spaceprobe();
        spaceprobe.setId("3");
        spaceprobe.setName("Apollo");
        spaceprobe.setPropellant("Chemical");
        spaceprobe.setDestination("Moon");
        spaceprobeList.put(spaceprobe.getId(),spaceprobe);

        spaceprobe=new Spaceprobe();
        spaceprobe.setId("4");
        spaceprobe.setName("Enterpise");
        spaceprobe.setPropellant("Anti-Matter");
        spaceprobe.setDestination("Andromeda");
        spaceprobeList.put(spaceprobe.getId(),spaceprobe);

        spaceProbes= new String[spaceprobeList.size()][4];

        for (int i=0;i<spaceprobeList.size();i++) {

            Spaceprobe s=spaceprobeList.get(i);

            spaceProbes[i][0]=s.getId();
            spaceProbes[i][1]=s.getName();
            spaceProbes[i][2]=s.getPropellant();
            spaceProbes[i][3]=s.getDestination();
        }
    }
}
```

## SECTION 4 : Our Layouts

**ActivityMain.xml Layout.**

- Inflated as our activity's view.
- Includes our content main.

```xml
<?xml version="1.0" encoding="utf-8"?>
<android.support.design.widget.CoordinatorLayout

    android_layout_width="match_parent"
    android_layout_height="match_parent"
    android_fitsSystemWindows="true"
    tools_context="com.tutorials.hp.tableviewhashtable.MainActivity">

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
- In this case shall hold our tableview.So please add the below tableview tag with its appropriate properties.

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
    tools_context="com.tutorials.hp.tableviewhashtable.MainActivity"
    tools_showIn="@layout/activity_main">

    <de.codecrafters.tableview.TableView
        android_id="@+id/tableView"
        android_layout_width="wrap_content"
        android_layout_height="wrap_content"
        />

</RelativeLayout>
```

## Example 4: Android Swipe Tabs With TableView

_This is a practical tutorial meant to allow us work with both Fragments and TableViews. We will also be working TabLayouts and ViewPager._

In the process we make an application that has swipe fragments each containing its own TableView. The user can swipe through the tabs or fragments and have different set of data displayed in their TableViews in each fragment.

Here's a brief aim of this tutorial:

- The aim is simple and clear.
- We want fragments with TableViews.
- Each tableview has its own unique dataset.
- Now the user can swipe through the fragments or click the tabs.
- We use TabLayout for our material tabs.
- For swiping the general is Viewpager of course.

But first we need understand various terminologies.

#### What is Android?

Android is a platform that is carefully crafted for mobile devices including smartphones, and tablets.

It is a combination of an operating system, companion native libraries, application runtime, and an application framework.

Android relies on various open source technologies to provide a solid mobile .platform that can satisfy mobile needs. The platform architecture can be best described as a series of five main layers that handle different core operations.

#### We are Building a Vibrant YouTube Community

We have a fast rising YouTube Channel of friends. So far we've accumulated almost 3 million agreggate views and more than 10,000 subscribers as of the time of writing this. Here's the Channel: [ProgrammingWizards TV](https://www.youtube.com/c/programmingwizards).

Please go ahead subscribe(free obviously) as well. If you have a question or a comment you can post there instead of in this site.People are suggesting us tutorials to do there so you can too.

#### What is a Fragment?

A Fragment is a piece of an application's user interface or behavior that can be placed in an Activity.

Interaction with fragments is done through FragmentManager, which can be obtained via `Activity.getFragmentManager()` and `Fragment.getFragmentManager()`.

The `Fragment` class resides in the `android.app` package.

The main purpose of a Fragment is to represent a particular operation or interface that is running within a larger Activity.

A Fragment can either be defined as part of a layout or created programmatically.

Here's an example Fragment as part of a layout:

```xml
<FrameLayout
    android_layout_width="match_parent" android_layout_height="match_parent">
    <fragment class="com.example.android.apis.app.FragmentLayout$TitlesFragment"
            android_id="@+id/titles"
            android_layout_width="match_parent" android_layout_height="match_parent" />
</FrameLayout>
```

Then that layout can be installed into the MainActivity via java code through inflation:

```java
@Override
protected void onCreate(Bundle savedInstanceState) {
    super.onCreate(savedInstanceState);

    setContentView(R.layout.fragment_layout);
}
```

#### What is TabLayout?

TabLayout provides a horizontal layout to display tabs.

Then you can fill the tabs to display through `TabLayout.Tab` instances.

The `newTab()` method allows us create new Tab instances.

Then you can change the tab's label using the `setText(int)` method. On the other hand you can change the Tabs Icon via the `setIcon(int)` method.

```java
 TabLayout tabLayout = ...;
 tabLayout.addTab(tabLayout.newTab().setText("Tab 1"));
 tabLayout.addTab(tabLayout.newTab().setText("Tab 2"));
 tabLayout.addTab(tabLayout.newTab().setText("Tab 3"));
```

#### What is ViewPager?

ViewPager is a layout manager that allows the user to flip left and right through pages of data.

You supply an implementation of a PagerAdapter to generate the pages that the view shows.

ViewPager is quite common in applications and normally allows us to implement the popular `swipable tabs` design.

ViewPager normally has to be defined in the layout:

```xml
 <android.support.v4.view.ViewPager
     android_layout_width="match_parent"
     android_layout_height="match_parent">

     <android.support.v4.view.PagerTitleStrip
         android_layout_width="match_parent"
         android_layout_height="wrap_content"
         android_layout_gravity="top" />

 </android.support.v4.view.ViewPager>
```

#### What is TableView?

TableView is an android library that allows us create and work with Tables in android.

It contains a simple TableView and an advanced SortableTableView.

There is both a free and a premium version of tableView.

#### Requirements of a TableView

TableView requires Android Minimum SDK version of 11 and Compule SDK Version of 25.

#### Installing TableView

TableView can be installed by adding the following implementation statement in your app leve build.gradle:

```groovy
implementation 'de.codecrafters.tableview:tableview:2.8.0'
```

#### Working with TableView

This involves two processes:

1. Addding the TableView Element in Your Layout:

```xml
<de.codecrafters.tableview.TableView

    android_id="@+id/tableView"
    android_layout_width="match_parent"
    android_layout_height="match_parent"
    table_tableView_columnCount="4" />
```

You can modify the number of columns you want your android table to have.

1. Referencing the TableView: Then you reference the TableView in your Java code:
    
    ```java
    TableView tableView = (TableView) findViewById(R.id.tableView);
    ```
    
    Here you can also modify the number of columns you want:
    
    ```java
    tableView.setColumnCount(4);
    ```
    

#### Handling Column Widths

TableView allows you modify the column widths in various manners:

1. Absolutely Using `TableColumnDpWidthModel` or `TableColumnPxWidthModel` Here's an example with `TableColumnDpWidthModel`:
    
    ```java
    TableColumnDpWidthModel columnModel = new TableColumnDpWidthModel(context, 4, 200);
    columnModel.setColumnWidth(1, 300);
    columnModel.setColumnWidth(2, 250);
    tableView.setColumnModel(columnModel);
    ```
    
    And here's one with `TableColumnPxWidthModel`:
    
    ```java
    TableColumnPxWidthModel columnModel = new TableColumnPxWidthModel(4, 350);
    columnModel.setColumnWidth(1, 500);
    columnModel.setColumnWidth(2, 600);
    tableView.setColumnModel(columnModel);
    ```
    
2. Relatively with the TableColumnWeightModel The defauly column weight is 1.
    
    ```java
    TableColumnWeightModel columnModel = new TableColumnWeightModel(4);
    columnModel.setColumnWeight(1, 2);
    columnModel.setColumnWeight(2, 2);
    tableView.setColumnModel(columnModel);
    ```
    

#### Showing Data

Data can be shown easily in TableView with help of `SimpleTableDataAdapter` class.

This allows us easily render two-dimensional string array in a tabular format.

This adapter will turn the strings you supply into TextViews and display them inside TableView at the same position as previous in the 2D-String-Array.

Here's an example:

```java
public class MainActivity extends AppCompatActivity {

    private static final String[][] SPACESHIPS = { "Casini", "Chemical", "NASA", "Jupiter" },
                                                     { "Spitzer", "Nuclear", "NASA", "Alpha Centauri" } };

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);

        TableView<String[]> tableView = (TableView<String[]>) findViewById(R.id.tableView);
        tableView.setDataAdapter(new SimpleTableDataAdapter(this, SPACESHIPS));
    }
}
```

#### Project Structure

Here's our project structure:

![Project Structure](https://github.com/Oclemy/TabsTableView/raw/master/demos/ProjectStructure.PNG)

First we use TableView library,fetch it by adding the following in your build.gradle app level  :

```groovy
dependencies {
    compile fileTree(dir: 'libs', include: ['*.jar'])
    testCompile 'junit:junit:4.12'
    compile 'com.android.support:appcompat-v7:24.2.0'
    compile 'com.android.support:design:24.2.0'
    compile 'com.android.support:cardview-v7:24.2.0'
    compile 'de.codecrafters.tableview:tableview:2.2.0'

}
```

Below is an example of fragment :

```java
package com.tutorials.hp.tabstableview.mFragments;

import android.graphics.Color;
import android.os.Bundle;
import android.support.annotation.Nullable;
import android.support.v4.app.Fragment;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.Toast;

import com.tutorials.hp.tabstableview.R;

import de.codecrafters.tableview.TableView;
import de.codecrafters.tableview.listeners.TableDataClickListener;
import de.codecrafters.tableview.toolkit.SimpleTableDataAdapter;
import de.codecrafters.tableview.toolkit.SimpleTableHeaderAdapter;

public class InterStellar  extends Fragment {

    //ROWS DATA SOURCE
    static String[][] spaceProbes={
            {"1","WMAP","Laser Beam","Uranus"},
            {"2","Juno","Nuclear","Asteroid Belt"},
            {"3","Casini","Solar","Saturn"},
            {"4","Kepler","Laser","Jupiter"},
            {"5","Chandra","Chemical","Saturn"},
            {"6","Curiosity","Solar","Mars"},

    };
    //HEADER DATA SOURCE
    static String[] spaceProbeHeaders={"No","Name","Propellant","Destination"};

    public static InterStellar newInstance() {
        return new InterStellar();
    }

    @Nullable
    @Override
    public View onCreateView(LayoutInflater inflater, ViewGroup container, Bundle savedInstanceState) {

        View rootView = inflater.inflate(R.layout.interstellar, null);

        final TableView<String[]> tableView = (TableView<String[]>) rootView.findViewById(R.id.interStellar_TB);

        //SET TABLE PROPERTIES
        tableView.setHeaderBackgroundColor(Color.parseColor("#03a9f4"));
        tableView.setHeaderAdapter(new SimpleTableHeaderAdapter(getActivity(),spaceProbeHeaders));
        tableView.setColumnCount(4);

        //ADAPTER
        tableView.setDataAdapter(new SimpleTableDataAdapter(getActivity(), spaceProbes));

        //ROW CLICK LISTENER
        tableView.addDataClickListener(new TableDataClickListener() {
            @Override
            public void onDataClicked(int rowIndex, Object clickedData) {
                Toast.makeText(getActivity(), ((String[])clickedData)[1], Toast.LENGTH_SHORT).show();
            }
        });

        return rootView;
    }

    @Override
    public String toString() {
        return "Inter-Stellar";
    }
}
```

![Fragment With tableView](https://github.com/Oclemy/TabsTableView/raw/master/demos/TabsTableView.PNG)

Then we have our MainActivity as below :

```java
package com.tutorials.hp.tabstableview;

import android.os.Bundle;
import android.support.design.widget.TabLayout;
import android.support.v4.view.ViewPager;
import android.support.v7.app.AppCompatActivity;
import android.support.v7.widget.Toolbar;

import com.tutorials.hp.tabstableview.mFragments.InterGalactic;
import com.tutorials.hp.tabstableview.mFragments.InterPlanetary;
import com.tutorials.hp.tabstableview.mFragments.InterStellar;

public class MainActivity extends AppCompatActivity implements TabLayout.OnTabSelectedListener {

    private TabLayout tab;
    private ViewPager vp;

       @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);
        Toolbar toolbar = (Toolbar) findViewById(R.id.toolbar);
        setSupportActionBar(toolbar);

        //VIEWPAGER AND TABS
        vp = (ViewPager) findViewById(R.id.viewpager);
        addPages();

        tab = (TabLayout) findViewById(R.id.tabs);
        tab.setTabGravity(TabLayout.GRAVITY_FILL);
        tab.setupWithViewPager(vp);
        tab.addOnTabSelectedListener(this);
    }
    private void addPages()
    {
        MyPagerAdapter myPagerAdapter=new MyPagerAdapter(getSupportFragmentManager());
        myPagerAdapter.addPage(InterPlanetary.newInstance());
        myPagerAdapter.addPage(InterStellar.newInstance());
        myPagerAdapter.addPage(InterGalactic.newInstance());

        vp.setAdapter(myPagerAdapter);
    }

    @Override
    public void onTabSelected(TabLayout.Tab tab) {
        vp.setCurrentItem(tab.getPosition());
    }

    @Override
    public void onTabUnselected(TabLayout.Tab tab) {

    }

    @Override
    public void onTabReselected(TabLayout.Tab tab) {

    }
}
```

Hey the whole tutorial and demo is here : [https://www.youtube.com/watch?v=zRmSeeU2-m0](https://www.youtube.com/watch?v=zRmSeeU2-m0)

| Resouces | Link |
| --- | --- |
| Source Code | [GitHub Download](https://github.com/Oclemy/TabsTableView) |
| Video Tutorial | [YouTube Tutorial](https://www.youtube.com/watch?v=zRmSeeU2-m0) |

## Example 5: Android SQLite TableView

_Android SQLite TableView Tutorials and Examples._

How to perform SQLite Database CRUD operations with our adapterview being the TableView.

### Android SQLite - TableView - INSERT,SELECT,SHOW

_Android SQLite - TableView - INSERT,SELECT,SHOW Tutorial._

This is an android tableview tutorial with SQLite as our database. A tableview renders data into tables: columns and rows. In this tutorial we see how to take advantage of this and use it alongside SQLite database.

SQLite is a local database inbuilt into android devices and persist our data. We shall explore how to INSERT,SELECT and SHOW data to and from the database. The source is provide and its self explanatory and we have video for more explanations.

#### Screenshot

- Here's the screenshot of the project.

Android TableView SQLite Example

![Android SQlite TableView Example](https://raw.githubusercontent.com/Oclemy/SQLiteTableView/master/Camposha/demos/InputDialog.PNG) Android SQlite TableView Example[/caption]

####  TableView Landscape Mode

![Android tableView SQLite Landscape](https://github.com/Oclemy/SQLiteTableView/raw/master/Camposha/demos/SQlite-TableView-Landscape.PNG)

#### Project Structure

Here's the project structure:

![](https://image.prntscr.com/image/ip3q6duBQ9yxe41yGDbsTg.png)

#### Common Questions this example explores

- Android SQLite Example.
- Android TableView Example.
- How to render data into table in android.
- Table with headers and columns/rows in adroid.
- How to insert into seqlite and retrieve data.

#### Tools Used

This example was written with the following tools:

- Windows 8
- AndroidStudio IDE
- Genymotion Emulator
- Language : Java
- Topic : TableView, Table Adapter, SQLite CRUD

#### Libaries Used

- We use codecrafters.tableview.TableView library.

Lets jump directly to the source code.

#### Build.Gradle

- Normally in android projects, there are two build.gradle files. One is the app level build.gradle, the other is project level build.gradle. The app level belongs inside the app folder and its where we normally add our dependencies and specify the compile and target sdks.
- Also Add dependencies for AppCompat and Design support libraries.
- Our MainActivity shall derive from AppCompatActivity while we shall also use Floating action button from design support libraries.
- We also add our tableview here.

```groovy
apply plugin: 'com.android.application'

android {
    compileSdkVersion 24
    buildToolsVersion "25.0.1"

    defaultConfig {
        applicationId "com.tutorials.hp.sqlitetableview"
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
    compile 'com.android.support:appcompat-v7:24.2.1'
    compile 'com.android.support:design:24.2.1'
    compile 'com.android.support:cardview-v7:24.2.1'
    compile 'de.codecrafters.tableview:tableview:2.2.0'

}
```

#### MainActivity.java

- Launcher activity.
- ActivityMain.xml inflated as the contentview for this activity.
- We initialize views and widgets inside this activity.
- We use TableView as our adapterview and SimpleTableAdapter as our adapter.

```java
package com.tutorials.hp.sqlitetableview;

import android.app.Dialog;
import android.graphics.Color;
import android.os.Bundle;
import android.support.design.widget.FloatingActionButton;
import android.support.v7.app.AppCompatActivity;
import android.support.v7.widget.Toolbar;
import android.view.View;
import android.widget.Button;
import android.widget.EditText;
import android.widget.Toast;

import com.tutorials.hp.sqlitetableview.mDB.DBAdapter;
import com.tutorials.hp.sqlitetableview.mModel.Spacecraft;

import de.codecrafters.tableview.TableView;
import de.codecrafters.tableview.listeners.TableDataClickListener;
import de.codecrafters.tableview.toolkit.SimpleTableDataAdapter;
import de.codecrafters.tableview.toolkit.SimpleTableHeaderAdapter;

public class MainActivity extends AppCompatActivity {

    EditText nameEditText,propellantEditTxt,destEditTxt;
    Button saveBtn;
    TableView<String[]>  tb;
    TableHelper tableHelper;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);
        Toolbar toolbar = (Toolbar) findViewById(R.id.toolbar);
        setSupportActionBar(toolbar);

        //TABLEVIEW
         tableHelper=new TableHelper(this);
        tb = (TableView<String[]>) findViewById(R.id.tableView);
        tb.setColumnCount(3);
        tb.setHeaderBackgroundColor(Color.parseColor("#2ecc71"));
        tb.setHeaderAdapter(new SimpleTableHeaderAdapter(this,tableHelper.getSpaceProbeHeaders()));
        tb.setDataAdapter(new SimpleTableDataAdapter(this, tableHelper.getSpaceProbes()));

        //TABLE CLICK
        tb.addDataClickListener(new TableDataClickListener() {
            @Override
            public void onDataClicked(int rowIndex, Object clickedData) {
                Toast.makeText(MainActivity.this, ((String[])clickedData)[1], Toast.LENGTH_SHORT).show();
            }
        });

        FloatingActionButton fab = (FloatingActionButton) findViewById(R.id.fab);
        fab.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View view) {
                displayDialog();
            }
        });
    }

    /*
    DISPLAY INPUT DIALOG
    SAVE
     */
    private void displayDialog()
    {
        Dialog d=new Dialog(this);
        d.setTitle("SQLITE DATA");
        d.setContentView(R.layout.dialog_layout);

        //INITIALIZE VIEWS
        nameEditText= (EditText) d.findViewById(R.id.nameEditTxt);
        propellantEditTxt= (EditText) d.findViewById(R.id.propEditTxt);
        destEditTxt= (EditText) d.findViewById(R.id.destEditTxt);

        saveBtn= (Button) d.findViewById(R.id.saveBtn);

        //SAVE
        saveBtn.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {

                Spacecraft s = new Spacecraft();
                s.setName(nameEditText.getText().toString());
                s.setPropellant(propellantEditTxt.getText().toString());
                s.setDestination(destEditTxt.getText().toString());

                if (new DBAdapter(MainActivity.this).saveSpacecraft(s)) {
                    nameEditText.setText("");
                    propellantEditTxt.setText("");
                    destEditTxt.setText("");

                    tb.setDataAdapter(new SimpleTableDataAdapter(MainActivity.this, tableHelper.getSpaceProbes()));

                } else {
                    Toast.makeText(MainActivity.this, "Not Saved", Toast.LENGTH_SHORT).show();
                }
            }
        });

        //SHOW DIALOG
        d.show();

    }

}
```

#### Spacecraft.java

- Our data object class.
- Represents a single spacecraft object.

```java
package com.tutorials.hp.sqlitetableview.mModel;

public class Spacecraft {
    private String name,propellant,destination;

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getPropellant() {
        return propellant;
    }

    public void setPropellant(String propellant) {
        this.propellant = propellant;
    }

    public String getDestination() {
        return destination;
    }

    public void setDestination(String destination) {
        this.destination = destination;
    }
}
```

#### Constants.java

- We hold our SQLite constants right here in this class like table name,database name,rows etc.

```java
package com.tutorials.hp.sqlitetableview.mDB;

public class Constants {
    /*
  COLUMNS
   */
    static final String ROW_ID="id";
    static final String NAME="name";
    static final String PROPELLANT="propellant";
    static final String DESTINATION="destination";

    /*
    DB PROPERTIES
     */
    static final String DB_NAME="tv_DB";
    static final String TB_NAME="tv_TB";
    static final int DB_VERSION=1;

    /*
    TABLE CREATION STATEMENT
     */
    static final String CREATE_TB="CREATE TABLE tv_TB(id INTEGER PRIMARY KEY AUTOINCREMENT,"
            + "name TEXT NOT NULL,propellant TEXT NOT NULL,destination TEXT NOT NULL);";

    /*
    TABLE DELETION STMT
     */
    static final String DROP_TB="DROP TABLE IF EXISTS "+TB_NAME;

}
```

#### DBHelper.java

- Our database helper class.
- Ectends SQliteOpenHelper.
- We create database table and upgrade it here.

```java
package com.tutorials.hp.sqlitetableview.mDB;

import android.content.Context;
import android.database.SQLException;
import android.database.sqlite.SQLiteDatabase;
import android.database.sqlite.SQLiteOpenHelper;

public class DBHelper extends SQLiteOpenHelper {
    public DBHelper(Context context) {
        super(context, Constants.DB_NAME, null, Constants.DB_VERSION);
    }
    /*
    CREATE TABLE
     */
    @Override
    public void onCreate(SQLiteDatabase db) {
        try
        {
            db.execSQL(Constants.CREATE_TB);
        }catch (SQLException e)
        {
            e.printStackTrace();
        }
    }
    /*
    UPGRADE TABLE
     */
    @Override
    public void onUpgrade(SQLiteDatabase db, int i, int i1) {
        try {
            db.execSQL(Constants.DROP_TB);
            db.execSQL(Constants.CREATE_TB);

        }catch (SQLException e)
        {
            e.printStackTrace();
        }
    }
}
```

#### DBAdapter.java

- Our database adapter class.
- Here's where we insert,select and return an arraylist of our data.

```java
package com.tutorials.hp.sqlitetableview.mDB;

import android.content.ContentUris;
import android.content.ContentValues;
import android.content.Context;
import android.database.Cursor;
import android.database.SQLException;
import android.database.sqlite.SQLiteDatabase;
import android.widget.Space;

import com.tutorials.hp.sqlitetableview.mModel.Spacecraft;

import java.util.ArrayList;

public class DBAdapter {

    Context c;
    SQLiteDatabase db;
    DBHelper helper;

    /*
    1. INITIALIZE DB HELPER AND PASS IT A CONTEXT

     */
    public DBAdapter(Context c) {
        this.c = c;
        helper = new DBHelper(c);
    }

    /*
    SAVE DATA TO DB
     */
    public boolean saveSpacecraft(Spacecraft spacecraft) {
        try {
            db = helper.getWritableDatabase();

            ContentValues cv = new ContentValues();
            cv.put(Constants.NAME, spacecraft.getName());
            cv.put(Constants.PROPELLANT, spacecraft.getPropellant());
            cv.put(Constants.DESTINATION, spacecraft.getDestination());

            long result = db.insert(Constants.TB_NAME, Constants.ROW_ID, cv);
            if (result > 0) {
                return true;
            }

        } catch (SQLException e) {
            e.printStackTrace();
        } finally {
            helper.close();
        }

        return false;
    }

    /*
     1. RETRIEVE SPACECRAFTS FROM DB AND POPULATE ARRAYLIST
     2. RETURN THE LIST
     */

    public ArrayList<Spacecraft> retrieveSpacecrafts()
    {
        ArrayList<Spacecraft> spacecrafts=new ArrayList<>();

        String[] columns={Constants.ROW_ID,Constants.NAME,Constants.PROPELLANT,Constants.DESTINATION};

        try
        {
            db = helper.getWritableDatabase();
            Cursor c=db.query(Constants.TB_NAME,columns,null,null,null,null,null);

            Spacecraft s;

            if(c != null)
            {
                while (c.moveToNext())
                {
                    String s_name=c.getString(1);
                    String s_propellant=c.getString(2);
                    String s_destination=c.getString(3);

                    s=new Spacecraft();
                    s.setName(s_name);
                    s.setPropellant(s_propellant);
                    s.setDestination(s_destination);

                    spacecrafts.add(s);
                }
            }

        }catch (SQLException e)
        {
            e.printStackTrace();
        }

        return spacecrafts;
    }

}
```

#### TableHelper.java

- Binds our arraylist to our tableView.

```java
package com.tutorials.hp.sqlitetableview;

import android.content.Context;
import android.widget.Toast;

import com.tutorials.hp.sqlitetableview.mDB.DBAdapter;
import com.tutorials.hp.sqlitetableview.mModel.Spacecraft;

import java.util.ArrayList;

import de.codecrafters.tableview.TableView;
import de.codecrafters.tableview.listeners.TableDataClickListener;
import de.codecrafters.tableview.toolkit.SimpleTableDataAdapter;
import de.codecrafters.tableview.toolkit.SimpleTableHeaderAdapter;

public class TableHelper {

    Context c;

    private String[] spaceProbeHeaders={"Name","Propellant","Destination"};
    private String[][] spaceProbes;

    public TableHelper(Context c) {
        this.c = c;
    }

    public String[] getSpaceProbeHeaders()
    {
        return spaceProbeHeaders;
    }

    public  String[][] getSpaceProbes()
    {
        ArrayList<Spacecraft> spacecrafts=new DBAdapter(c).retrieveSpacecrafts();
        Spacecraft s;

        spaceProbes= new String[spacecrafts.size()][3];

        for (int i=0;i<spacecrafts.size();i++) {

             s=spacecrafts.get(i);

            spaceProbes[i][0]=s.getName();
            spaceProbes[i][1]=s.getPropellant();
            spaceProbes[i][2]=s.getDestination();
        }
        return spaceProbes;
    }
}
```

#### ActivityMain.xml

- Template layout.
- Contains our ContentMain.xml.
- Also defines the appbarlayout, toolbar as well as floatingaction buttton.

```xml
<?xml version="1.0" encoding="utf-8"?>
<android.support.design.widget.CoordinatorLayout

    android_layout_width="match_parent"
    android_layout_height="match_parent"
    android_fitsSystemWindows="true"
    tools_context="com.tutorials.hp.sqlitetableview.MainActivity">

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

- Content Layout.
- Defines the views and widgets to be displayed inside the MainActivity.
- In this case its a simple tableview.

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
    tools_context="com.tutorials.hp.sqlitetableview.MainActivity"
    tools_showIn="@layout/activity_main">

    <de.codecrafters.tableview.TableView
        android_id="@+id/tableView"
        android_layout_width="wrap_content"
        android_layout_height="wrap_content"
        />
</RelativeLayout>
```

#### dialog_layout.xml

- This will be inflated into our nice material input dialog for inserting data to sqlite.

```xml
<?xml version="1.0" encoding="utf-8"?>

    <android.support.v7.widget.CardView
        android_orientation="horizontal" android_layout_width="500dp"

        android_layout_margin="1dp"
        card_view_cardCornerRadius="10dp"
        card_view_cardElevation="5dp"

        android_layout_height="match_parent">

    <LinearLayout
            android_layout_width="match_parent"
            android_orientation="vertical"
            android_layout_height="match_parent">

        <!--INPUT VIEWS-->
        <android.support.design.widget.TextInputLayout
            android_id="@+id/nameLayout"
            android_layout_width="match_parent"
            android_layout_height="wrap_content">

            <EditText
                android_id="@+id/nameEditTxt"
                android_layout_width="match_parent"
                android_layout_height="wrap_content"
                android_singleLine="true"
                android_hint= "Name" />
        </android.support.design.widget.TextInputLayout>

        <android.support.design.widget.TextInputLayout
            android_id="@+id/propLayout"
            android_layout_width="match_parent"
            android_layout_height="wrap_content">

            <EditText
                android_id="@+id/propEditTxt"
                android_layout_width="match_parent"
                android_layout_height="wrap_content"
                android_singleLine="true"
                android_hint= "Propellant" />
        </android.support.design.widget.TextInputLayout>

        <android.support.design.widget.TextInputLayout
            android_id="@+id/destLayout"
            android_layout_width="match_parent"
            android_layout_height="wrap_content">

            <EditText
                android_id="@+id/destEditTxt"
                android_layout_width="match_parent"
                android_layout_height="wrap_content"
                android_singleLine="true"
                android_hint= "Destination" />
        </android.support.design.widget.TextInputLayout>

        <!--BUTTON-->
        <Button android_id="@+id/saveBtn"
            android_layout_width="fill_parent"
            android_layout_height="wrap_content"
            android_text="Save"
            android_clickable="true"
            android_background="@color/colorAccent"
            android_layout_marginTop="40dp"/>

</LinearLayout>

    </android.support.v7.widget.CardView>
```

#### Video/Preview

- Video version of this tutorial [here](https://www.youtube.com/watch?v=5W5Er2FCXrQ&lc=z235gbcoarqbzpgpf04t1aokgrztfehzt1na2rpjnvuurk0h00410)

#### Download

- Download the Project below:

[Download](https://github.com/Oclemy/SQLiteTableView/archive/master.zip)
