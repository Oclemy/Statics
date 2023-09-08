# RecyclerView -  How to Sort Data  Examples


In a previous lesson we had looked at how to sort data but with simpler adapterviews like listview, gridview and spinner. In this tutorial you will learn how to sort data while working with recyclerview.


But first let's introduce some terms.

#### Data Sorting

Generally data sorting refers to the process of arranging data in a particular manner for several uses. These uses include ease of analysis and efficiency. Sorted data are easier to read and analyze which is good for us humans. However they are also good for computers as it makes processing of data much more efficient. The main reason for these is that we or the computers can ignore some data and jump to specific location.

It's why for example binary search is much faster and efficient than many other searches including linear searching. This is because that algorithm involves splitting data into two and ignoring one half. On the other hand with linear search the data is normally not sorted hence you have to search against all items.

Imagine if in your contacts application in your mobile device, if the contacts were not sorted. If you wanted to find a given contact, yet the contact was listed the last in the list, you would have to scroll through all contacts. You would be checking the contacts one by one. However for sorted data that is easy as you simply scroll to the appropriate letter. For example, if the contact's name is Zak, then you would certainly scroll to the last item directly.

#### RecyclerView

RecyclerView is a list component that allows us render large data sets efficiently. These days it is the most commonly used adapterview. This courtesy of it's felxibility, power and ease of use. Like other adapterviews, recyclerviews need adapter. It is the adapter that maintains the data source on behalf of recyclerview.

Given the large use scenarios of recyclerviews, it makes sense to be able to sort them.

## Example 1: Kotlin Android – RecyclerView Sort Ascending/Descending

_This is an android tutorial of how to sort in both ascending and descending manner in [recyclerview](https://camposha.info/android/recyclerview) using Kotlin programming language._

You click a button to toggle between ascending and descending manner.

Let's look at Code

#### 1\. Gradle Scripts

##### (a). build.gradle(app)

This is our app level build.gradle.

Our programming language is Kotlin hence we will apply the `kotlin-android` plugin, alongside the `com.android.application` plugin.

We will also add the design support as well as the cardview under the dependencies DSL.

```groovy
dependencies {
    implementation fileTree(dir: 'libs', include: ['*.jar'])
    implementation"org.jetbrains.kotlin:kotlin-stdlib-jre7:$kotlin_version"
    testImplementation 'junit:junit:4.12'
    implementation 'com.android.support:appcompat-v7:28.0.0-beta01'
    implementation 'com.android.support:design:28.0.0-alpha3'
    implementation 'com.android.support:cardview-v7:28.0.0-alpha3'

}
```

We've added the appcompat, cardview and design support libraries. Recyclerview is contained in the design support.

#### 2\. Layouts

##### (a). `activity_main.xml`

We have a button on top of a recyclerview. The recyclerview will display our data.

When the button is clicked, we toggle the sort between ascending and descending manner.

We wrap these two widgets in a [relativelayout](https://camposha.info/android/relativelayout).

```xml
<?xml version="1.0" encoding="utf-8"?>
<RelativeLayout

    android_layout_width="match_parent"
    android_layout_height="match_parent"
    tools_context=".MainActivity">
     <Button
        android_text="Toggle Sort"
        android_layout_width="match_parent"
        android_layout_height="wrap_content"
        android_background="@color/colorAccent"
        android_padding="5dp"
        android_id="@+id/sortBtn"
        android_layout_marginRight="5.0dp" />

    <android.support.v7.widget.RecyclerView
        android_id="@+id/rv"
        android_layout_marginTop="40dp"
        android_layout_width="match_parent"
        android_layout_height="wrap_content" />

</RelativeLayout>
```

You can see you declare recyclerview using the `android.support.v7.widget.RecyclerView` class. Then we've assigned it an id which will be used to identify it.

##### (b). `model.xml`

At the root view of this layout we have a cardview.

Our CardView will have only a simple textview.

```xml
<?xml version="1.0" encoding="utf-8"?>
<android.support.v7.widget.CardView
    android_orientation="horizontal" android_layout_width="match_parent"

    android_layout_margin="10dp"
    card_view_cardCornerRadius="5dp"
    card_view_cardElevation="5dp"
    android_layout_height="200dp">

            <TextView
                android_layout_width="match_parent"
                android_layout_height="wrap_content"
                android_textAppearance="?android:attr/textAppearanceLarge"
                android_text="Name"
                android_id="@+id/nameTxt"
                android_padding="10dp"
                android_textColor="@color/colorAccent"
                android_textStyle="bold"
                android_layout_alignParentLeft="true"
                />

</android.support.v7.widget.CardView>
```

#### 3\. Kotlin Code

##### (a). `MainActivity.kt`

Then we have our MainActivity. The class obviously derives from appcompatactivity.

```kotlin
package com.devosha.kotlin_recyclerview_sort

import android.os.Bundle
import android.support.v7.app.AppCompatActivity
import android.support.v7.widget.LinearLayoutManager
import android.support.v7.widget.RecyclerView
import android.widget.Button
import java.util.*

class MainActivity : AppCompatActivity() {

    internal lateinit var rv: RecyclerView
    internal lateinit var sortBtn: Button
    internal lateinit var adapter: MyAdapter
    private var ascending = true
    companion object {
        private val spacecrafts = ArrayList<String>()
    }

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_main)

        this.initializeViews()
        this.fillSpacecrafts()
    }

    private fun initializeViews() {
        rv = findViewById(R.id.rv)
        rv.setLayoutManager(LinearLayoutManager(this))
        sortBtn = findViewById(R.id.sortBtn)
        sortBtn.setOnClickListener {
            sortData(ascending)
            ascending = !ascending
        }
    }

    private fun sortData(asc: Boolean) {
        //SORT ARRAY ASCENDING AND DESCENDING
        if (asc) {
            spacecrafts.sort()
        } else {
            spacecrafts.reverse()
        }
        adapter = MyAdapter(this, spacecrafts)
        rv.adapter = adapter
    }

    private fun fillSpacecrafts() {

        spacecrafts.clear()
        spacecrafts.add("Kepler")
        spacecrafts.add("Casini")
        spacecrafts.add("Voyager")
        spacecrafts.add("New Horizon")
        spacecrafts.add("James Web")
        spacecrafts.add("Apollo 15")
        spacecrafts.add("WMAP")
        spacecrafts.add("Enterprise")
        spacecrafts.add("Spitzer")
        spacecrafts.add("Galileo")
        spacecrafts.add("Challenger")
        spacecrafts.add("Atlantis")
        spacecrafts.add("Apollo 19")
        spacecrafts.add("Huygens")
        spacecrafts.add("Hubble")
        spacecrafts.add("Juno")
        spacecrafts.add("Aries")
        spacecrafts.add("Columbia")

        //ADAPTER
        adapter = MyAdapter(this, spacecrafts)
        rv.setAdapter(adapter)
    }

}

//end
```

We've started by declaring several variables as instance fields. The y include:

1. Button - Will be clicked so as to sort.
2. [RecyclerView](https://camposha.info/android/recyclerview) - Will render our data.
3. Adapter - Our recyclerview adapter.
4. Boolean - Will allow us to maintain the status of the sort. For example true means the data is the sorted in ascending while false means the data is either unsorted or sorted in descendng manner.

##### (b). `MyAdapter.kt`

Here's our adapter class.

Because we use a recyclerview, our adapter is RecyclerView.Adapter with VH being our ViewHolder class.

```kotlin
package com.devosha.kotlin_recyclerview_sort

import android.content.Context
import android.support.v7.widget.RecyclerView
import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup

import java.util.ArrayList

import android.view.View.inflate
import android.widget.TextView

/**
 * class MyAdapter.
 * This class is our MyAdapter class.
 * It will ReyclerView.Adapter class. Via the constructor we will pass a Context,
 * and an ArrayList of spacecrafts.
 */
class MyAdapter(internal var c: Context, internal var spacecrafts: ArrayList<String>) : RecyclerView.Adapter<MyAdapter.MyViewHolder>() {
    /*
    class: MyViewHolder
    This is our View Holder class.
   */
    class MyViewHolder(itemView: View) : RecyclerView.ViewHolder(itemView) {
        internal var nameTxt: TextView = itemView.findViewById(R.id.nameTxt)
    }

    override fun getItemCount(): Int {
        return spacecrafts.size
    }

    override fun onCreateViewHolder(parent: ViewGroup, viewType: Int): MyViewHolder {
        val v = LayoutInflater.from(c).inflate(R.layout.model, parent, false)
        return MyViewHolder(v)
    }

    override fun onBindViewHolder(holder: MyViewHolder, position: Int) {
        //BIND DATA
        holder.nameTxt.text = spacecrafts[position]
    }
}
//end
```

#### Download

You can download full source code below.

| No. | Location | Link |
| --- | --- | --- |
| 1. | GitHub | [Direct Download](https://github.com/Oclemy/KotlinRecyclerViewSort/archive/master.zip) |
| 2. | GitHub | [Browse](https://github.com/Oclemy/KotlinRecyclerViewSort) |

### Learn Android Retrofit

## Example 2: Android RecyclerView – Sort Ascending/Descending

RecyclerView is one of those views that you wouldn't believe haven't been in android for a long time. It's so popular and heavily used since it's introduction in API level 22.

RecyclerView class resides in android.view.ViewGroup. Android describes it as a flexible view for providing a limited window into a large dataset. Well for us, we are interested in this dataset: how to sort it.

Sorting data is important especially in components like recyclerview wihich can display massive amounts of data. No user would like the problem of having to read through each of the list of items just to find a specific data. he can simply sort and reach it quicker.

\\===

This example uses Collections API to sort data in ascending and descending order.User clicks sort button to toggle between sorting ascending and descending. You can find more details about WebView [here](https://developer.android.com/reference/android/support/v7widget/RecyclerView.html).

### Screenshot

- Here's the screenshot of the project.

Android RecyclerView Sort Example

# Common Questions this example explores

- How to sort data in RecyclerView.
- Sorting Collections in android java.
- RecyclerView with CardViews. Sort CardViews
- Sort RecyclerView in ascending and descending manner.

# Tools Used

This example was written with the following tools:

- OS: Windows 8.1
- IDE : AndroidStudio
- Emulator : Genymotion
- Language : Java

## Libaries Used

- No third party library was used in this project.

## Source Code

Lets jump directly to the source code.

## Build.Gradle

- Normally in android projects, there are two build.gradle files. One is the app level build.gradle, the other is project level build.gradle. The app level belongs inside the app folder and its where we normally add our dependencies and specify the compile and target sdks.
- Also Add dependencies for AppCompat and Design support libraries.
- Our MainActivity shall derive from AppCompatActivity while we shall also use Floating action button from design support libraries.

```groovy
apply plugin: 'com.android.application'

android {
    compileSdkVersion 26
    buildToolsVersion "26.0.0"
    defaultConfig {
        applicationId "com.tutorials.hp.recyclerviewsort"
        minSdkVersion 15
        targetSdkVersion 26
        versionCode 1
        versionName "1.0"
        testInstrumentationRunner "android.support.test.runner.AndroidJUnitRunner"
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

    compile 'com.android.support:appcompat-v7:26.+'
    compile 'com.android.support.constraint:constraint-layout:1.0.0-alpha7'
    compile 'com.android.support:design:26.+'
    compile 'com.android.support:cardview-v7:26.+'

}
```

## MyViewHolder.java

- Our ViewHolder class.
- Derives from RecyclerView.ViewHolder.
- Holds our view for Recycling.

```java
package com.tutorials.hp.recyclerviewsort;

import android.support.v7.widget.RecyclerView;
import android.view.View;
import android.widget.TextView;

public class MyViewHolder extends RecyclerView.ViewHolder {
    TextView nameTxt;

    public MyViewHolder(View itemView) {
        super(itemView);

        nameTxt = (TextView) itemView.findViewById(R.id.nameTxt);

    }

}
```

## MyAdapter.java

- Our Adapter class.
- Derives from RecyclerView.ViewHolder.
- Inflates our model layout into RecyclerView ViewItems.
- Adapts our data to RecyclerView ViewItems.

```java
package com.tutorials.hp.recyclerviewsort;

import android.content.Context;
import android.support.v7.widget.RecyclerView;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;

import java.util.ArrayList;

public class MyAdapter extends RecyclerView.Adapter<MyViewHolder> {

    Context c;
    ArrayList<String> spacecrafts;

    public MyAdapter(Context c, ArrayList<String> spacecrafts) {
        this.c = c;
        this.spacecrafts = spacecrafts;
    }

    @Override
    public MyViewHolder onCreateViewHolder(ViewGroup parent, int viewType) {
        View v = LayoutInflater.from(c).inflate(R.layout.model, parent, false);
        return new MyViewHolder(v);
    }

    @Override
    public void onBindViewHolder(MyViewHolder holder, int position) {

        //BIND DATA
        holder.nameTxt.setText(spacecrafts.get(position));

    }

    @Override
    public int getItemCount() {
        return spacecrafts.size();
    }

}
```

## MainActivity.java

- Launcher activity.
- Derives from AppCompatActivity.
- ActivityMain.xml inflated as the contentview for this activity.
- We initialize views and widgets inside this activity.
- We fill an arraylist,sort it, pass it to our adapter and set that adapter to our RecyclerView.

```java
package com.tutorials.hp.recyclerviewsort;

import android.os.Bundle;
import android.support.v7.app.AppCompatActivity;
import android.support.v7.widget.LinearLayoutManager;
import android.support.v7.widget.RecyclerView;
import android.view.View;
import android.widget.Button;

import java.util.ArrayList;
import java.util.Collections;

public class MainActivity extends AppCompatActivity {

    RecyclerView rv;
    Button sortBtn;
    MyAdapter adapter;
   // String[] spacecrafts={"Juno","Hubble","Casini","WMAP","Spitzer","Pioneer","Columbia","Challenger","Apollo","Curiosity"};

    //DATA
    private static ArrayList<String> spacecrafts =new ArrayList<>();
    private boolean ascending = true;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);

        this.initializeViews();
        this.fillSpacecrafts();

    }

    //INITIALIZE VIEWS
    private void initializeViews()
    {
        rv = (RecyclerView) findViewById(R.id.rv);
        rv.setLayoutManager(new LinearLayoutManager(this));

        sortBtn = (Button) findViewById(R.id.sortBtn);

        sortBtn.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View view) {
                sortData(ascending);
                ascending = !ascending;
            }
        });
    }

    /*
     * SORT
     */
    private void sortData(boolean asc)
    {
        //SORT ARRAY ASCENDING AND DESCENDING
        if (asc)
        {
            Collections.sort(spacecrafts);
        }
        else
        {
            Collections.reverse(spacecrafts);
        }

 //ADAPTER
        adapter = new MyAdapter(this, spacecrafts);
        rv.setAdapter(adapter);

    }

    /*
    FILL SPACECRAFTS DATA
     */
    private void fillSpacecrafts() {

        spacecrafts.clear();
        spacecrafts.add("Kepler");
        spacecrafts.add("Casini");
        spacecrafts.add("Voyager");
        spacecrafts.add("New Horizon");
        spacecrafts.add("James Web");
        spacecrafts.add("Apollo 15");
        spacecrafts.add("WMAP");
        spacecrafts.add("Enterprise");
        spacecrafts.add("Spitzer");
        spacecrafts.add("Galileo");
        spacecrafts.add("Challenger");
        spacecrafts.add("Atlantis");
        spacecrafts.add("Apollo 19");
        spacecrafts.add("Huygens");
        spacecrafts.add("Hubble");
        spacecrafts.add("Juno");
        spacecrafts.add("Aries");
        spacecrafts.add("Columbia");

        //ADAPTER
        adapter = new MyAdapter(this, spacecrafts);
        rv.setAdapter(adapter);

    }

}
```

## ActivityMain.xml

- Template layout.
- Contains our ContentMain.xml.
- Also defines the appbarlayout, toolbar as well as floatingaction buttton.

```xml
<?xml version="1.0" encoding="utf-8"?>
<android.support.design.widget.CoordinatorLayout

    android_layout_width="match_parent"
    android_layout_height="match_parent"
    tools_context="com.tutorials.hp.recyclerviewsort.MainActivity">

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
        app_srcCompat="@android:drawable/ic_dialog_email" />

</android.support.design.widget.CoordinatorLayout>
```

## ContentMain.xml

- Content Layout.
- Defines the views and widgets to be displayed inside the MainActivity.
- In this case its a simple webview.

```xml
<?xml version="1.0" encoding="utf-8"?>
<android.support.constraint.ConstraintLayout

    android_layout_width="match_parent"
    android_layout_height="match_parent"
    app_layout_behavior="@string/appbar_scrolling_view_behavior"
    tools_context="com.tutorials.hp.recyclerviewsort.MainActivity"
    tools_showIn="@layout/activity_main">

    <LinearLayout
        android_orientation="vertical"
        android_layout_width="match_parent"
        android_layout_height="match_parent">
<Button
            android_text="Sort"
            android_layout_centerInParent="true"
            android_layout_width="match_parent"
            android_layout_height="70dp"
            android_background="@color/colorAccent"
            android_padding="10dp"
            android_id="@+id/sortBtn"
            android_layout_marginRight="5.0dp" />

       <android.support.v7.widget.RecyclerView
        android_id="@+id/rv"
        android_layout_width="match_parent"
        android_layout_height="wrap_content"
         />
    </LinearLayout>
</android.support.constraint.ConstraintLayout>
```

## Model.xml

- ViewItem Layout.
- Root layout is CardView.
- Defines the views and widgets to be inflated as our viewitems.
- In this case its a cardview with textview.

```xml
<?xml version="1.0" encoding="utf-8"?>
<android.support.v7.widget.CardView
    android_orientation="horizontal" android_layout_width="match_parent"

    android_layout_margin="10dp"
    card_view_cardCornerRadius="5dp"
    card_view_cardElevation="5dp"
    android_layout_height="200dp">

            <TextView
                android_layout_width="match_parent"
                android_layout_height="wrap_content"
                android_textAppearance="?android:attr/textAppearanceLarge"
                android_text="Name"
                android_id="@+id/nameTxt"
                android_padding="10dp"
                android_textColor="@color/colorAccent"
                android_textStyle="bold"
                android_layout_alignParentLeft="true"
                />
</android.support.v7.widget.CardView>
```

## Video/Preview

- Video version of this tutorial. Coming soon...

## Download

- Download the Project below:

[Download](https://github.com/Oclemy/RecyclerViewSort/archive/master.zip)

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

## Android SortedList – Sort Multiple Data Types recyclerView

### Introduction to SortedList

Android SDK provides a class called SortedList that provides us an easy way to sort data. SortedList is able to respect the order of items added to it and notify of changes to that order.

It was added in android version 22.1.0 and belongs to the `android.support.v7.util` package. As a class it's concrete and only extends the `java.lang.Object` class:

```java
java.lang.Object
   ↳    android.support.v7.util.SortedList<T>
```

To order items it uses the `compare(Object,Object)` method. That method uses binary search to fetch the items to be ordered.

The order of items and change notifications can be controlled via the SortedList.Callback parameter.

SortedList has two inner classes:

| No. | Class | Function |
| --- | --- | --- |
| 1. | `SortedList.Callback<T2>` | A callback implementation that can batch notify events dispatched by the SortedList. |
| 2. | `SortedList.BatchedCallback<T2>` | The class that controls the behavior of the SortedList. |

### Example - RecyclerView Sort based on different types/field using SortedList

Let's come create an example to allow us sort a recyclerview based on different fields. The app will list stars. Each star will have a name, comments, favorites and views. Users can then sort for based on number of comments, favorites, view count and name. They can do it both in ascending and descending manner of the above properties.

### Video Tutorial

Watch the video tutorial below for more details.Please remember to like and subscribe.

#### Gradle Scripts

Start by adding the following dependencies in your app level build.gradle file:

```groovy
    implementation 'androidx.appcompat:appcompat:1.0.2'
    implementation 'androidx.constraintlayout:constraintlayout:1.1.3'
    implementation 'androidx.cardview:cardview:1.0.0'
    implementation 'com.google.android.material:material:1.0.0'
    implementation 'androidx.recyclerview:recyclerview:1.0.0'

}
```

You can see there is no special library or dependency we are using, just common androidx components.

#### Layouts

We will have three layoust:

| No. | Layout | Role |
| --- | --- | --- |
| 1. | `activity_main.xml` | Is our main activity's layout. |
| 2. | `model.xml` | Will be inflated into our recyclerview items when sorting in ascending manner. |
| 3. | `model_grid.xml` | Will be inflated into our recyclerview items when sorting in descending manner. |

##### (a). activity_main.xml

In your activity_main.xml file add the following code:

```xml
<?xml version="1.0" encoding="utf-8"?>
<RelativeLayout xmlns:android="http://schemas.android.com/apk/res/android"
    xmlns:app="http://schemas.android.com/apk/res-auto"
    xmlns:tools="http://schemas.android.com/tools"
    android:layout_width="match_parent"
    android:layout_height="match_parent"
    android:orientation="vertical"
    tools:context=".MainActivity">

    <LinearLayout
        android:id="@+id/outerLayout"
        android:orientation="vertical"
        android:layout_width="match_parent"
        android:layout_height="wrap_content">
    <LinearLayout
            android:orientation="horizontal"
            android:layout_width="match_parent"
            android:layout_height="wrap_content">
        <Button
                android:id="@+id/ascendigBtn"
                android:background="@color/colorAccent"
                android:layout_weight="0.25"
                android:layout_width="0dp"
                android:layout_height="wrap_content"
                android:textColor="@android:color/white"
                android:textStyle="bold"
                android:text="ASC"
            android:drawableEnd="@drawable/ic_keyboard_arrow_up_white_24dp"
            android:drawableRight="@drawable/ic_keyboard_arrow_up_white_24dp" />
        <Button
            android:id="@+id/sortByCommentsBtn"
            android:background="@android:color/holo_red_light"
            android:layout_weight="0.25"
            android:layout_width="0dp"
            android:layout_height="wrap_content"
            android:textColor="@android:color/white"
            android:textStyle="bold"
            android:text="DESC"
            android:drawableEnd="@drawable/ic_keyboard_arrow_down_white_24dp"
            android:drawableRight="@drawable/ic_keyboard_arrow_down_white_24dp" />
        <RelativeLayout
            android:background="@android:color/darker_gray"
            android:layout_weight="0.5"
            android:layout_width="0dp"
            android:layout_height="match_parent">
            <Spinner
                android:id="@+id/propertySpinner"
                android:layout_width="wrap_content"
                android:layout_height="match_parent"/>
        </RelativeLayout>

    </LinearLayout>

    <androidx.recyclerview.widget.RecyclerView
        android:id="@+id/myRecyclerView"
        android:layout_width="match_parent"
        android:layout_height="wrap_content" />

    </LinearLayout>
    <Button
        android:text="SortedList Tutorial"
        android:background="@color/colorPrimary"
        android:textColor="@android:color/white"
        android:layout_alignParentBottom="true"
        android:layout_width="match_parent"
        android:layout_height="wrap_content" />
</RelativeLayout>
```

You can see we have the following components used above:

1. [RecyclerView](https://camposha.info/android/recyclerview) - To render our data.
2. Buttons - To sort in ascending/descending manner.
3. Spinner - To choose the field to sort with e.g comments,views,favorites.

##### (b). model.xml

To model a single item to be rendered as part of the list of items in our recyclerview. Will be inflated when we are using LinearLayouManager.

```xml
<?xml version="1.0" encoding="utf-8"?>
<LinearLayout xmlns:android="http://schemas.android.com/apk/res/android"
    android:orientation="vertical"
    android:layout_width="match_parent"
    android:layout_height="wrap_content"
    android:background="@color/colorAccent"
    android:padding="10dp"
    android:layout_marginTop="10dp"
    android:layout_marginLeft="10dp"
    android:layout_marginRight="10dp"
    android:id="@+id/layoutQuestion_item"
    android:clickable="true">

    <TextView
        android:id="@+id/nameTxt"
        android:layout_width="match_parent"
        android:layout_height="wrap_content"
        android:textColor="@android:color/white"
        android:text="#UI #UX #Psychology"
        android:textSize="17dp"
        android:maxLines="3"
        android:ellipsize="end"/>

    <TextView
        android:layout_width="match_parent"
        android:layout_height="wrap_content"
        android:text="This star is one of the largest stars ever discovered in the observable universe. Amazing stuff. "
        android:layout_marginTop="1dp"
        android:textColor="#77FFFFFF"
        android:textSize="15dp"/>

    <LinearLayout
        android:layout_width="match_parent"
        android:layout_height="wrap_content"
        android:orientation="horizontal"
        android:layout_marginTop="10dp">

        <TextView
            android:id="@+id/commentsTxt"
            android:layout_width="wrap_content"
            android:layout_height="wrap_content"
            android:text="102"
            android:gravity="center_vertical"
            android:drawableLeft="@drawable/ic_chat_black_24dp"
            android:drawablePadding="7dp"
            android:drawableTint="@android:color/white"
            android:textColor="@android:color/white"
            android:textSize="15dp"
            />

        <TextView
            android:id="@+id/favoritesTxt"
            android:layout_width="wrap_content"
            android:layout_height="wrap_content"
            android:text="12K"
            android:gravity="center_vertical"
            android:drawableLeft="@drawable/ic_favorite_black_24dp"
            android:drawablePadding="7dp"
            android:drawableTint="@android:color/white"
            android:textColor="@android:color/white"
            android:textSize="15dp"
            android:layout_marginLeft="25dp"
            />

        <TextView
            android:id="@+id/viewsTxt"
            android:layout_width="wrap_content"
            android:layout_height="wrap_content"
            android:text="30K"
            android:gravity="center_vertical"
            android:drawableLeft="@drawable/ic_visibility_black_24dp"
            android:drawablePadding="7dp"
            android:drawableTint="@android:color/white"
            android:textColor="@android:color/white"
            android:textSize="15dp"
            android:layout_marginLeft="25dp"
            />

    </LinearLayout>

</LinearLayout>
```

##### (c). model_grid.xml

To model a single item to be rendered as part of the list of items in our recyclerview. Will be inflated when we are using GridLayoutManager.

```xml
<?xml version="1.0" encoding="utf-8"?>
<LinearLayout xmlns:android="http://schemas.android.com/apk/res/android"
    android:orientation="vertical"
    android:layout_width="match_parent"
    android:layout_height="wrap_content"
    android:background="@color/colorAccent"
    android:transitionName="questionTransition"
    android:padding="10dp"
    android:layout_marginTop="10dp"
    android:layout_marginLeft="10dp"
    android:layout_marginRight="10dp"
    android:id="@+id/layoutQuestion_item"
    android:clickable="true">

    <TextView
        android:id="@+id/nameTxt"
        android:layout_width="match_parent"
        android:layout_height="wrap_content"
        android:textColor="@android:color/white"
        android:text="NAME"
        android:textSize="17dp"
        android:maxLines="3"
        android:ellipsize="end"/>

    <TextView
        android:layout_width="match_parent"
        android:layout_height="wrap_content"
        android:text="This star is one of the largest stars ever discovered in the observable universe. Amazing stuff. "
        android:layout_marginTop="1dp"
        android:textColor="#77FFFFFF"
        android:textSize="12dp"/>

    <LinearLayout
        android:layout_width="match_parent"
        android:layout_height="wrap_content"
        android:orientation="horizontal"
        android:layout_marginTop="10dp">

        <TextView
            android:id="@+id/commentsTxt"
            android:layout_width="wrap_content"
            android:layout_height="wrap_content"
            android:text="82"
            android:gravity="center_vertical"
            android:drawableLeft="@drawable/ic_chat_black_24dp"
            android:drawablePadding="2dp"
            android:drawableTint="@android:color/white"
            android:textColor="@android:color/white"
            android:textSize="9dp"
            />

        <TextView
            android:id="@+id/favoritesTxt"
            android:layout_width="wrap_content"
            android:layout_height="wrap_content"
            android:text="2K"
            android:gravity="center_vertical"
            android:drawableLeft="@drawable/ic_favorite_black_24dp"
            android:drawablePadding="2dp"
            android:drawableTint="@android:color/white"
            android:textColor="@android:color/white"
            android:textSize="9dp"
            android:layout_marginLeft="2dp"
            />

        <TextView
            android:id="@+id/viewsTxt"
            android:layout_width="wrap_content"
            android:layout_height="wrap_content"
            android:text="10K"
            android:gravity="center_vertical"
            android:drawableLeft="@drawable/ic_visibility_black_24dp"
            android:drawablePadding="2dp"
            android:drawableTint="@android:color/white"
            android:textColor="@android:color/white"
            android:textSize="9dp"
            android:layout_marginLeft="2dp"
            />

    </LinearLayout>

</LinearLayout>
```

#### Our Classes

Start by creating the following three classes:

1. Star.java
2. MainActivity.java
3. SortedListAdapter.java

##### (a). Star.java

This class will represent our data object. We will be showing lists of stars in our recyclerview.

Make sure you have our Star class:

```java
public class Star {
    //...
}
```

In the Star class add the following:

```java
    String name;
    int comments,favorites,views;

    public Star(String name,int comments,int favorites,int views) {
        this.name = name;
        this.comments=comments;
        this.favorites=favorites;
        this.views=views;
    }
```

You can see in the above we have defined one string and three integers. Those will be the properties of our `Star` object. We will sort based on those properties. We have also created a constructor to receive those properties.

Then add our gettes and setters:

```java
public String getName() {
        return name;
    }
    public void setName(String name) {
        this.name = name;
    }

    public int getComments() {
        return comments;
    }

    public void setComments(int comments) {
        this.comments = comments;
    }

    public int getFavorites() {
        return favorites;
    }

    public void setFavorites(int favorites) {
        this.favorites = favorites;
    }

    public int getViews() {
        return views;
    }

    public void setViews(int views) {
        this.views = views;
    }
```

##### (b). SortedListAdapter.java

Make the SortedListAdapter class extend the RecyclerView.Adapter class:

```java
public class SortedListAdapter extends RecyclerView.Adapter<SortedListAdapter.ViewHolder> {
```

Then add the following:

```java
    SortedList<Star> stars;
    private int LAYOUT = R.layout.model;

    public SortedListAdapter(int layout) {
        this.LAYOUT = layout;
        sort(true,"NAME");
    }
```

You can see we've defined a `SortedList` class to contain our stars. Then an integer to hold the layout we will be inflating.

The constructor is receiving the layout and assigning it to the local variable. Then we are invoking a method known as sort(), well we wil be defining that method shortly.

Let's go ahead and define that sort method:

```java
    public void sort(final Boolean ascending, final String property){
        stars = new SortedList<>(Star.class, new SortedList.Callback<Star>() {
            @Override
            public int compare(Star star1, Star star2) {
                if(ascending){
                    if(property.equalsIgnoreCase("COMMENTS")){
                        return String.valueOf(star1.getComments()).compareTo(String.valueOf(star2.getComments()));
                    }else if(property.equalsIgnoreCase("FAVORITES")){
                        return String.valueOf(star1.getFavorites()).compareTo(String.valueOf(star2.getFavorites()));
                    }else if(property.equalsIgnoreCase("VIEWS")){
                        return String.valueOf(star1.getViews()).compareTo(String.valueOf(star2.getViews()));
                    }
                    return star1.getName().compareTo(star2.getName());
                }else{
                    if(property.equalsIgnoreCase("COMMENTS")){
                        return String.valueOf(star2.getComments()).compareTo(String.valueOf(star1.getComments()));
                    }else if(property.equalsIgnoreCase("FAVORITES")){
                        return String.valueOf(star2.getFavorites()).compareTo(String.valueOf(star1.getFavorites()));
                    }else if(property.equalsIgnoreCase("VIEWS")){
                        return String.valueOf(star2.getViews()).compareTo(String.valueOf(star1.getViews()));
                    }
                    return star2.getName().compareTo(star1.getName());
                }
            }

            @Override
            public void onChanged(int position, int count) {
                notifyItemRangeChanged(position, count);
            }

            @Override
            public boolean areContentsTheSame(Star star1, Star star2) {
                return star1.getName().equals(star2.getName());
            }

            @Override
            public boolean areItemsTheSame(Star star1, Star star2) {
                return star1.getName().equals(star2.getName());
            }

            @Override
            public void onInserted(int position, int count) {
                notifyItemRangeInserted(position, count);
            }

            @Override
            public void onRemoved(int position, int count) {
                notifyItemRangeRemoved(position, count);
            }

            @Override
            public void onMoved(int fromPosition, int toPosition) {
                notifyItemMoved(fromPosition, toPosition);
            }
        });

    }
```

You can see it's receiving two parameters:

1. boolean value - The sort direction(ascending/descending)
2. property - Property or field to sort.

You can also we have overrided a couple of methods that allow us react to changes to our sort order.

We will then create a method to add data to our SortedList:

```java
    public void addAll(List<Star> starList) {
        stars.beginBatchedUpdates();
        for (int i = 0; i < starList.size(); i++) {
            stars.add(starList.get(i));
        }
        stars.endBatchedUpdates();
    }
```

We also have methods to get as well clear that SortedList:

```java
    public Star get(int position) {
        return stars.get(position);
    }

    public void clear() {
        stars.beginBatchedUpdates();
        //remove items at end, to avoid unnecessary array shifting
        while (stars.size() > 0) {
            stars.removeItemAt(stars.size() - 1);
        }
        stars.endBatchedUpdates();
    }
```

**FULL CODE: SortedListAdapter.java**

```java
package info.camposha.mrsortedlist;

import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.TextView;

import androidx.recyclerview.widget.RecyclerView;
import androidx.recyclerview.widget.SortedList;

import java.util.List;

public class SortedListAdapter extends RecyclerView.Adapter<SortedListAdapter.ViewHolder> {

    SortedList<Star> stars;
    private int LAYOUT = R.layout.model;

    public SortedListAdapter(int layout) {
        this.LAYOUT = layout;
        sort(true,"NAME");
    }

    public void sort(final Boolean ascending, final String property){
        stars = new SortedList<>(Star.class, new SortedList.Callback<Star>() {
            @Override
            public int compare(Star star1, Star star2) {
                if(ascending){
                    if(property.equalsIgnoreCase("COMMENTS")){
                        return String.valueOf(star1.getComments()).compareTo(String.valueOf(star2.getComments()));
                    }else if(property.equalsIgnoreCase("FAVORITES")){
                        return String.valueOf(star1.getFavorites()).compareTo(String.valueOf(star2.getFavorites()));
                    }else if(property.equalsIgnoreCase("VIEWS")){
                        return String.valueOf(star1.getViews()).compareTo(String.valueOf(star2.getViews()));
                    }
                    return star1.getName().compareTo(star2.getName());
                }else{
                    if(property.equalsIgnoreCase("COMMENTS")){
                        return String.valueOf(star2.getComments()).compareTo(String.valueOf(star1.getComments()));
                    }else if(property.equalsIgnoreCase("FAVORITES")){
                        return String.valueOf(star2.getFavorites()).compareTo(String.valueOf(star1.getFavorites()));
                    }else if(property.equalsIgnoreCase("VIEWS")){
                        return String.valueOf(star2.getViews()).compareTo(String.valueOf(star1.getViews()));
                    }
                    return star2.getName().compareTo(star1.getName());
                }
            }

            @Override
            public void onChanged(int position, int count) {
                notifyItemRangeChanged(position, count);
            }

            @Override
            public boolean areContentsTheSame(Star star1, Star star2) {
                return star1.getName().equals(star2.getName());
            }

            @Override
            public boolean areItemsTheSame(Star star1, Star star2) {
                return star1.getName().equals(star2.getName());
            }

            @Override
            public void onInserted(int position, int count) {
                notifyItemRangeInserted(position, count);
            }

            @Override
            public void onRemoved(int position, int count) {
                notifyItemRangeRemoved(position, count);
            }

            @Override
            public void onMoved(int fromPosition, int toPosition) {
                notifyItemMoved(fromPosition, toPosition);
            }
        });

    }

    public void addAll(List<Star> starList) {
        stars.beginBatchedUpdates();
        for (int i = 0; i < starList.size(); i++) {
            stars.add(starList.get(i));
        }
        stars.endBatchedUpdates();
    }

    public Star get(int position) {
        return stars.get(position);
    }

    public void clear() {
        stars.beginBatchedUpdates();
        //remove items at end, to avoid unnecessary array shifting
        while (stars.size() > 0) {
            stars.removeItemAt(stars.size() - 1);
        }
        stars.endBatchedUpdates();
    }

    @Override
    public ViewHolder onCreateViewHolder(ViewGroup parent, int viewType) {
        View itemView = LayoutInflater.from(parent.getContext()).inflate(LAYOUT, parent, false);
        return new ViewHolder(itemView);
    }

    @Override
    public void onBindViewHolder(ViewHolder holder, int position) {
        Star star = stars.get(position);
        holder.nameTxt.setText(star.getName());
        holder.commentsTxt.setText(String.valueOf(star.getComments()));
        holder.favoritesTxt.setText(String.valueOf(star.getFavorites()));
        holder.viewsTxt.setText(String.valueOf((int)(Math.ceil(star.getViews()/1000)))+"K");
    }

    @Override
    public int getItemCount() {
        return stars.size();
    }

    class ViewHolder extends RecyclerView.ViewHolder {

        TextView nameTxt,commentsTxt,favoritesTxt,viewsTxt;

        public ViewHolder(View itemView) {
            super(itemView);
            nameTxt = itemView.findViewById(R.id.nameTxt);
            commentsTxt = itemView.findViewById(R.id.commentsTxt);
            favoritesTxt = itemView.findViewById(R.id.favoritesTxt);
            viewsTxt = itemView.findViewById(R.id.viewsTxt);

        }

    }

}
//end
```

##### (c). MainActivity.java

Finally we can put everything together in our MainActivity class:

```java
package info.camposha.mrsortedlist;

import android.os.Bundle;
import android.view.View;
import android.widget.AdapterView;
import android.widget.ArrayAdapter;
import android.widget.Button;
import android.widget.Spinner;

import androidx.appcompat.app.AppCompatActivity;
import androidx.recyclerview.widget.GridLayoutManager;
import androidx.recyclerview.widget.LinearLayoutManager;
import androidx.recyclerview.widget.RecyclerView;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

public class MainActivity extends AppCompatActivity {

    RecyclerView recyclerView;
    SortedListAdapter adapter;
    private Boolean ASC = true;
    Spinner sp;
    String SELECTED_PROPERTY = "NAME";

    private List<Star> generateData(){
        List<Star> starList = new ArrayList<>();
        Star s=new Star("Rigel",98,92,9800);
        starList.add(s);
        s=new Star("Arcturus",73,83,7803);
        starList.add(s);
        s=new Star("Deneb",27,37,4283);
        starList.add(s);
        s=new Star("Wezen",36,39,3703);
        starList.add(s);
        s=new Star("Betelgeuse",89,85,9734);
        starList.add(s);
        s=new Star("Eta Carina",84,91,9242);
        starList.add(s);
        s=new Star("Aldebaran",87,83,8604);
        starList.add(s);
        s=new Star("Canopus",83,72,7937);
        starList.add(s);
        s=new Star("Regulus",75,72,6704);
        starList.add(s);
        s=new Star("Sirius",49,57,5294);
        starList.add(s);
        s=new Star("Trappist A",48,46,4635);
        starList.add(s);
        s=new Star("Proxima Centauri",94,92,9252);
        starList.add(s);
        s=new Star("Tau Ceti",15,25,2573);
        starList.add(s);
        s=new Star("Chara",24,28,3108);
        starList.add(s);
        s=new Star("Vega",46,58,5863);
        starList.add(s);
        s=new Star("Alpha Pegasi",57,62,6348);
        starList.add(s);
        s=new Star("Bellatrix",24,35,3628);
        starList.add(s);
        s=new Star("Naos",31,34,1635);
        starList.add(s);
        s=new Star("Hamal",11,14,1023);
        starList.add(s);
        s=new Star("Polaris",63,68,4592);
        starList.add(s);
        s=new Star("Enif",25,23,1292);
        starList.add(s);
        s=new Star("VY Canis Majoris",93,97,9262);
        starList.add(s);
        s=new Star("UY Scuti",76,91,8924);
        starList.add(s);
        s=new Star("Pollux",15,17,1364);
        starList.add(s);
        s=new Star("Archernar",25,24,2734);
        starList.add(s);
        return starList;

    }

    private void prepareSpinner(){
        final String[] properties = {"NAME","COMMENTS","FAVORITES","VIEWS"};
        sp=findViewById(R.id.propertySpinner);
        sp.setAdapter(new ArrayAdapter<String>(this,android.R.layout.simple_dropdown_item_1line,
                properties));
        sp.setOnItemSelectedListener(new AdapterView.OnItemSelectedListener() {
            @Override
            public void onItemSelected(AdapterView<?> parent, View view, int position, long id) {
                SELECTED_PROPERTY=properties[position];
                adapter.sort(ASC,SELECTED_PROPERTY);
                adapter.addAll(generateData());
                adapter.notifyDataSetChanged();
            }

            @Override
            public void onNothingSelected(AdapterView<?> parent) {

            }
        });

    }

    private void toggleButtons(){
        final Button ascBtn = findViewById(R.id.ascendigBtn);
        final Button descBtn = findViewById(R.id.sortByCommentsBtn);

        ascBtn.setBackgroundColor(getResources().getColor(android.R.color.holo_red_light));
        descBtn.setBackgroundColor(getResources().getColor(R.color.colorAccent));

        ascBtn.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                ASC = true;
                ascBtn.setBackgroundColor(getResources().getColor(android.R.color.holo_red_light));
                descBtn.setBackgroundColor(getResources().getColor(R.color.colorAccent));

                recyclerView.setLayoutManager(new LinearLayoutManager(MainActivity.this));

                adapter = new SortedListAdapter(R.layout.model);
                recyclerView.setAdapter(adapter);

                adapter.sort(true,SELECTED_PROPERTY);
                adapter.addAll(generateData());
                adapter.notifyDataSetChanged();
            }
        });
        descBtn.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                ASC = false;
                ascBtn.setBackgroundColor(getResources().getColor(R.color.colorAccent));
                descBtn.setBackgroundColor(getResources().getColor(android.R.color.holo_red_light));

                recyclerView.setLayoutManager(new GridLayoutManager(MainActivity.this,2));
                adapter = new SortedListAdapter(R.layout.model_grid);
                recyclerView.setAdapter(adapter);

                adapter.sort(false,SELECTED_PROPERTY);
                adapter.addAll(generateData());
                adapter.notifyDataSetChanged();

            }
        });

    }

    private void bindData(){
        recyclerView = findViewById(R.id.myRecyclerView);
        recyclerView.setLayoutManager(new LinearLayoutManager(this));

        adapter = new SortedListAdapter(R.layout.model);
        recyclerView.setAdapter(adapter);

        adapter.addAll(generateData());

    }
    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);

        bindData();
        prepareSpinner();
        toggleButtons();
    }
}
//end
```

#### Resources

| No. | Site | Action |
| --- | --- | --- |
| 1. | Github | [Browse](https://github.com/Oclemy/MrSortedList) |
| 2. | Github | [Download](https://github.com/Oclemy/MrSortedList/archive/master.zip) |
| 3. | YouTube | [Watch](https://youtu.be/NUWyVmQO_qk) |
| 4. | Android Documentation | [Reference](https://developer.android.com/reference/android/support/v7/util/SortedList.html) |


