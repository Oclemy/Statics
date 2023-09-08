# RecyclerView Pagination Examples



In this tutorial we will explore various recyclerview pagination examples. Through pagination, you split your content into smaller chunks which can easily be digested by users especially since mobile devices have limited screen sizes.


## Example 1: Android RecyclerView Pagination – Next/Previous Pagination

_Android RecyclerView Pagination - Next/Previous Pagination_

In this class we see how to page/paginate data which is very important especially with RecyclerView which are meant to show large datasets.

The type of pagination we do here is the next/previous pagination. The user can navigate pages via the next/previous buttons.

If we reach the last page the next button gets disabled automatically while if we are at the first page the previous button gets disabled. In between both buttons are enabled.

![Page 1](https://github.com/Oclemy/RecyclerPagination/blob/master/demos/RecyclerPagination2.png?raw=true)

![Page 2](https://github.com/Oclemy/RecyclerPagination/blob/master/demos/RecyclerPagination2.png?raw=true)

#### Why Pagination?

Pagination is vital for not only ease of use by the user but also for smooth perfomance of the device. Users need permission because we human beings are not very good at processing huge data sets. It overwhelms when we have to scroll through a large list of data and identify an item out of it. Instead our brain is good ta getting the gist of things. Just a snapshot so that we have the big picture.

It's why I always encourage through my tutorials adding of search as well as pagination to lists of data. Pagination allows user to break data into chunks. Users can then view a small amount at a time. Maybe 5 or 10 items.

Pagination also improves the loading time of data. Especially when data is coming from a data source like a database or cloud solutions like firebase. This is important because the android OS is very strict with resource usages in applications. So when your app has a large data set that it' loading and this takes time, the android OS may shut down you activity due to too much memory usage. This lead to bad reputation and negative reviews in the play store and online review sites.

Paging data enables user move along the workflow quickly and efficiently.

#### Next/Previous Pagination

There are several pagination types like load more, 1,2,3... and endless pagination. However next/previous is the oldest of these and applies to most systems and frameworks. You basically have two buttons, one is next and the other is previous. Next allows you navigate to the next page while previous allows you navigate to previous page.

Let's go.

##### 1\. Create Basic Activity Project

1. First create a new project in android studio. Go to File --> New Project.

Here's our project struecture.

![Project Structures](https://github.com/Oclemy/RecyclerPagination/blob/master/demos/ProjectStructure.png?raw=true)

##### 2\. Build.gradle

Let's come to our app level(app folder) build.gradle:

```groovy

dependencies {
    implementation fileTree(dir: 'libs', include: ['*.jar'])
    testImplementation 'junit:junit:4.12'
    implementation 'com.android.support:appcompat-v7:24.2.0'
    implementation 'com.android.support:design:24.2.0'
    implementation 'com.android.support:cardview-v7:24.2.0'

}
```

You can see from our `build.gradle` that we aren't using any third party libraries. Instead we have appcompat, design and cardview support libraries. We are interested in the design support as it has the recyclerview which is the list component we use. The appcompat on the other had will give us the AppCompatActivity which is our `MainActivity's` super class. Our recyclerview will be showing cardviews.

#### 3\. Create User Interface

User interfaces are typically created in android using XML layouts as opposed to direct java coding.

Here are our layouts for this project:

##### (a). activity_main.xml

- This layout gets inflated to MainActivity user interface.
- It includes the content_main.xml.

```xml
<?xml version="1.0" encoding="utf-8"?>
<android.support.design.widget.CoordinatorLayout

    android_layout_width="match_parent"
    android_layout_height="match_parent"
    android_fitsSystemWindows="true"
    tools_context="com.tutorials.hp.recyclerpagination.MainActivity">

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

### (b). content_main.xml

This layout gets included in your activity_main.xml. We define our UI widgets here.

In this case we add a RecyclerView and two buttons(next/previous). At the root we have defined a [RelativeLayout](https://camposha.info/android/relativelayout).

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
    tools_context="com.tutorials.hp.recyclerpagination.MainActivity"
    tools_showIn="@layout/activity_main">

    <LinearLayout
        android_orientation="vertical"
        android_layout_width="match_parent"
        android_layout_height="wrap_content">

        <android.support.v7.widget.RecyclerView
            android_id="@+id/rv"
            android_layout_width="match_parent"
            android_layout_height="wrap_content"
            />

        <LinearLayout
            android_orientation="horizontal"
            android_layout_width="wrap_content"
            android_layout_height="wrap_content">
            <Button
                android_text="Previous"
                android_id="@+id/prevBtn"
                android_layout_width="wrap_content"
                android_layout_height="wrap_content" />
            <Button
                android_text="Next"
                android_id="@+id/nextBtn"
                android_layout_width="wrap_content"
                android_layout_height="wrap_content" />
        </LinearLayout>

    </LinearLayout>
</RelativeLayout>
```

We have two [LinearLayouts](https://camposha.info/android/linearlayout). The second one will render our next and previous buttons next to each other horizontally. That's why it's orientation is `horizontal`. The first one will place our recyclerview above the two buttons, that's why we've set the orientation to vertical.

### (c). model.xml

This is the layout that defines the model of a single CardView in our RecyclerView. So we start by defining the CardView as the root view. We've given it several properties like the Card corner radius and card elevation. We have a TextView inside it. That textview will be used to render our data.

```xml
<?xml version="1.0" encoding="utf-8"?>
<android.support.v7.widget.CardView
    android_orientation="horizontal" android_layout_width="match_parent"

    android_layout_margin="5dp"
    card_view_cardCornerRadius="5dp"
    card_view_cardElevation="2dp"
    android_layout_height="130dp">

    <RelativeLayout
        android_layout_width="match_parent"
        android_layout_height="match_parent">

        <TextView
            android_layout_width="wrap_content"
            android_layout_height="wrap_content"
            android_textAppearance="?android:attr/textAppearanceLarge"
            android_text="Name"
            android_id="@+id/nameTxt"
            android_padding="10dp"
            android_layout_alignParentLeft="true"
             />
    </RelativeLayout>
</android.support.v7.widget.CardView>
```

Lets now come to classes:

## 4\. MyViewHolder.java

This is our RecyclerView.ViewHolder class:

This class in our RecyclerView.ViewHolder class.

It derives from `android.support.v7.widget.RecyclerView.View` thus forcing us to create a constructor `public MyHolder(View itemView)` that takes a View object as a parameter and pass it over the base clas by a call to `super(itemView)`.

Here are the roles of this class

| No. | Role |
| --- | --- |
| 1. | Hold a View object already inflated from XML layout for recycling. This avoids re-inflation of the same layout which is an expensive process. Thus this improves the performance of list items rendering for recyclerview. The inflated View is received via the constructor |
| 2. | Searches for individual widgets by their id from the inflated View and defines instance fields them. This ensures that those widgets can easily be retrieved as instance fields and their values set especially inside our RecyclerView.Adapter sub-class. |
| 3. | Can also be used implement onClick event listener which can be handled by other classes especially the adapter class. |

Here's the ViewHolder code.

```java
package com.tutorials.hp.recyclerpagination.mRecycler;

import android.support.v7.widget.RecyclerView;
import android.view.View;
import android.widget.TextView;

import com.tutorials.hp.recyclerpagination.R;

public class MyViewHolder extends RecyclerView.ViewHolder {

        TextView nametxt;

        public MyViewHolder(View itemView) {
            super(itemView);
            nametxt= (TextView) itemView.findViewById(R.id.nameTxt);
        }
}
```

## 4\. MyAdapter.java

This is our RecyclerView.Adapter class.

This is our RecyclerView.Adapter class.

It derives from `android.support.v7.widget.RecyclerView.Adapter<RecyclerView.ViewHolder myHolder>` class.

Deriving from Recylcerview.Adapter will force us to either make our adapter class abstract or go ahead and override a couple of methods. We choose the latter, overriding `onCreateViewHolder(ViewGroup parent, int viewType)` and `onBindViewHolder(MyHolder holder, final int position)`.

This class will adapt our data set to our RecyclerView which we use an adapterview adapterview.

Here are the main responsibilities of this class:

| No. | Responsibility |
| --- | --- |
| 1. | This class will be responsible for inflating our custom model layout to a View object to be used as our RecyclerView itemView. |
| 2. | A RecyclerView.ViewHolder instance will then be created with the View object passed to it. All these we do inside the `onCreateVewHolder()` method. |
| 3. | We'll then bind data to our view widgets inside the `onBindViewHolder()`. |
| 4. | Handling of click events for our inflated View item. |
| 5. | Returning the total item Count to be used when rendering our view items. |

```java
package com.tutorials.hp.recyclerpagination.mRecycler;

import android.content.Context;
import android.support.v7.widget.RecyclerView;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.Toast;

import com.tutorials.hp.recyclerpagination.R;

import java.util.ArrayList;

public class MyAdapter extends RecyclerView.Adapter<MyViewHolder>  {
    Context c;
    ArrayList<String> spacecrafts;
    public MyAdapter(Context c, ArrayList<String> spacecrafts) {
        this.c = c;
        this.spacecrafts = spacecrafts;
    }

    //INITIALIZE VH
    @Override
    public MyViewHolder onCreateViewHolder(ViewGroup parent, int viewType) {
        View v= LayoutInflater.from(parent.getContext()).inflate(R.layout.model,parent,false);
        return new MyViewHolder(v);
    }
    @Override
    public void onBindViewHolder(MyViewHolder holder, int position) {
        //BIND DATA
        holder.nametxt.setText(spacecrafts.get(position));
    }
    //TOTAL NUM
    @Override
    public int getItemCount() {
        return spacecrafts.size();
    }
}
```

## 6\. Paginator.java

This is the class that will page/paginate our RecyclerView data.

```java
package com.tutorials.hp.recyclerpagination.mPager;

import java.util.ArrayList;

public class Paginator {
    public static final int TOTAL_NUM_ITEMS=52;
    public static final int ITEMS_PER_PAGE=7;
    public static final int ITEMS_REMAINING=TOTAL_NUM_ITEMS % ITEMS_PER_PAGE;
    public static final int LAST_PAGE=TOTAL_NUM_ITEMS/ITEMS_PER_PAGE;

    public ArrayList<String> generatePage(int currentPage)
    {
        int startItem=currentPage*ITEMS_PER_PAGE+1;
        int numOfData=ITEMS_PER_PAGE;
        ArrayList<String> pageData=new ArrayList<>();

        if (currentPage==LAST_PAGE && ITEMS_REMAINING>0)
        {
            for (int i=startItem;i<startItem+ITEMS_REMAINING;i++)
            {
                pageData.add("Number "+i);
            }
        }else
        {
            for (int i=startItem;i<startItem+numOfData;i++)
            {
                pageData.add("Number "+i);
            }
        }
        return pageData;
    }
}
```

# 7\. MainActivity.java

So this is our main [activity](https://camposha.info/android/activity). It derives from `AppCompatActivity`.

Here are it's major responsibilities:

| No. | Responsibility |
| --- | --- |
| 1. | Allow itself to become an android [activity](https://camposha.info/android/activity) component by deriving from `android.app.activity`. |
| 2. | Listen to activity creation callbacks by overrding the `onCreate()` method. |
| 3. | Invoke the `onCreate()` method of the parent [Activity](https://camposha.info/android/activity) class and tell it of a [Bundle](https://camposha.info/android/activity) we've received. |
| 4. | Inflate the `activity_main.xml` into a View object and set it as the content view of this activity. |

```java
package com.tutorials.hp.recyclerpagination;

import android.os.Bundle;
import android.support.v7.app.AppCompatActivity;
import android.support.v7.widget.LinearLayoutManager;
import android.support.v7.widget.RecyclerView;
import android.support.v7.widget.Toolbar;
import android.view.View;
import android.widget.Button;

import com.tutorials.hp.recyclerpagination.mPager.Paginator;
import com.tutorials.hp.recyclerpagination.mRecycler.MyAdapter;

public class MainActivity extends AppCompatActivity {

    RecyclerView rv;
    Button nextBtn, prevBtn;
    Paginator p = new Paginator();
    private int totalPages = Paginator.TOTAL_NUM_ITEMS / Paginator.ITEMS_PER_PAGE;
    private int currentPage = 0;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);
        Toolbar toolbar = (Toolbar) findViewById(R.id.toolbar);
        setSupportActionBar(toolbar);

        //RFERENCE VIEWS
        rv = (RecyclerView) findViewById(R.id.rv);
        nextBtn = (Button) findViewById(R.id.nextBtn);
        prevBtn = (Button) findViewById(R.id.prevBtn);
        prevBtn.setEnabled(false);

        //RECYCLER PROPERTIES
        rv.setLayoutManager(new LinearLayoutManager(this));

        //ADAPTER
        rv.setAdapter(new MyAdapter(MainActivity.this, p.generatePage(currentPage)));

        //NAVIGATE
        nextBtn.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View view) {

                currentPage += 1;
                // enableDisableButtons();
                rv.setAdapter(new MyAdapter(MainActivity.this, p.generatePage(currentPage)));
                toggleButtons();

            }
        });
        prevBtn.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View view) {
                currentPage -= 1;

                rv.setAdapter(new MyAdapter(MainActivity.this, p.generatePage(currentPage)));

                toggleButtons();
            }
        });
    }

    private void toggleButtons() {
        if (currentPage == totalPages) {
            nextBtn.setEnabled(false);
            prevBtn.setEnabled(true);
        } else if (currentPage == 0) {
            prevBtn.setEnabled(false);
            nextBtn.setEnabled(true);
        } else if (currentPage >= 1 && currentPage <= totalPages) {
            nextBtn.setEnabled(true);
            prevBtn.setEnabled(true);
        }
    }
}
```

## More Resources

| Resource | Link |
| --- | --- |
| GitHub Browse | [Browse](https://github.com/Oclemy/RecyclerPagination) |
| GitHub Download Link | [Download](https://github.com/Oclemy/RecyclerPagination/archive/master.zip) |

## Example 2: Android RecyclerView – Endless Pagination [Infinite Scroll]

_An infinite/endless pagination example with a RecyclerView._

If we reach the end of a given page,the next page gets automatically loaded.While its being loaded we display a progressbar.We are autogenerating data using handles to simulate download of fresh data.

**Overview**

- Infinite/Endless pagination in a RecyclerView.
- RecyclerView consists of CardViews with text.
- If we reach the end of a page,we automatically load more data.
- While loading data we display a progressbar.
- We simulate downloading of data using handlers.
- We also implement Swipe to refresh.
- When we refresh we are taken back to the first page.
- The next page gets loaded in advance.
- We are using PullLoadView library.

#### **Classes**

**STEP 1 : Our Build.Gradle**

- Lets fetch the library pulltoloadview from jcenter.
- Moreover we are using a RecyclerView and CardView,so add design support libraries as well as cardview dependency.

```groovy
apply plugin: 'com.android.application'

android {
    compileSdkVersion 24
    buildToolsVersion "25.0.1"

    defaultConfig {
        applicationId "com.tutorials.hp.rvinfinitepagination"
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
    compile 'com.github.tosslife:pullloadview:1.1.0'
}
```

**STEP 2.  Layout - ContentMainxml**

- Inside our ContentMain.xml we have the pullloadview layout.

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
    tools_context="com.tutorials.hp.rvinfinitepagination.MainActivity"
    tools_showIn="@layout/activity_main">

    <com.srx.widget.PullToLoadView
        android_id="@+id/pullToLoadView"
        android_layout_width="match_parent"
        android_layout_height="match_parent"
        />
</RelativeLayout>
```

**SETP 3 : Our Spacecraft class**

- Our model class,our data object.
- Spacecraft with properties like name and propellant.

```java
package com.tutorials.hp.rvinfinitepagination.mData;

public class Spaceship {
    private String name;

    public Spaceship(String name) {
        this.name = name;
    }

    @Override
    public String toString() {
        return name;
    }
}
```

**STEP 4 : Our RecyclerView Adapter and ViewHolder classes**

- Our ViewHolder class shall hold our views like TextView inside our CardView for recycliing.
- We shall inflate our model.xml layout in our recyclerview.adapter subclass.

```java
package com.tutorials.hp.rvinfinitepagination.mRecycler;

import android.content.Context;
import android.support.v7.widget.RecyclerView;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.TextView;

import com.tutorials.hp.rvinfinitepagination.R;
import com.tutorials.hp.rvinfinitepagination.mData.Spaceship;

import java.util.ArrayList;

public class MyAdapter extends RecyclerView.Adapter<MyAdapter.MyHolder> {

    Context c;
    ArrayList<Spaceship> spaceships;

    /*
    CONSTRUCTOR
     */
    public MyAdapter(Context c, ArrayList<Spaceship> spaceships) {
        this.c = c;
        this.spaceships = spaceships;
    }

    //INITIALIE VH
    @Override
    public MyHolder onCreateViewHolder(ViewGroup parent, int viewType) {
        View v= LayoutInflater.from(parent.getContext()).inflate(R.layout.model,parent,false);
        MyHolder holder=new MyHolder(v);
        return holder;
    }

    //BIND DATA
    @Override
    public void onBindViewHolder(MyHolder holder, int position) {
        holder.nametxt.setText(spaceships.get(position).toString());

    }

    /*
    TOTAL ITEMS
     */
    @Override
    public int getItemCount() {
        return spaceships.size();

    }

    /*
    ADD DATA TO ADAPTER
     */
    public void add(Spaceship s) {
        spaceships.add(s);
        notifyDataSetChanged();
    }

    /*
    CLEAR DATA FROM ADAPTER
     */
    public void clear() {
        spaceships.clear();
        notifyDataSetChanged();
    }

    /*
    VIEW HOLDER CLASS
     */
    class MyHolder extends RecyclerView.ViewHolder {

        TextView nametxt;

        public MyHolder(View itemView) {
            super(itemView);

            this.nametxt= (TextView) itemView.findViewById(R.id.nameTxt);

        }
    }

}
```

**STEP 5 : Our Paginator class**

- To page our data.
- We use Handlers to simulate downloading of data updates as the user scrolls.
- The user can scroll infinitely/endlessly as in this case we generate dummy data as he scrolls.
- We paging/paginating with five items per page.
- Our app is also supporting pull/swipe to refresh.
- If you pull down/swipe down,we refresh and take you to the first page.

```java
package com.tutorials.hp.rvinfinitepagination.mData;

import android.content.Context;
import android.os.Handler;
import android.support.v7.widget.LinearLayoutManager;
import android.support.v7.widget.RecyclerView;

import com.srx.widget.PullCallback;
import com.srx.widget.PullToLoadView;
import com.tutorials.hp.rvinfinitepagination.mRecycler.MyAdapter;

import java.util.ArrayList;

public class Paginator {

    Context c;
    private PullToLoadView pullToLoadView;
    RecyclerView rv;
    private MyAdapter adapter;
    private boolean isLoading = false;
    private boolean hasLoadedAll = false;
    private int nextPage;

    public Paginator(Context c, PullToLoadView pullToLoadView) {
        this.c = c;
        this.pullToLoadView = pullToLoadView;

        //RECYCLERVIEW
        RecyclerView rv=pullToLoadView.getRecyclerView();
        rv.setLayoutManager(new LinearLayoutManager(c, LinearLayoutManager.VERTICAL,false));

        adapter=new MyAdapter(c,new ArrayList<Spaceship>());
        rv.setAdapter(adapter);

        initializePaginator();
    }

/*
PAGE DATA
 */
    public void initializePaginator()
    {
        pullToLoadView.isLoadMoreEnabled(true);
        pullToLoadView.setPullCallback(new PullCallback() {

            //LOAD MORE DATA
            @Override
            public void onLoadMore() {
                loadData(nextPage);
            }

            //REFRESH AND TAKE US TO FIRST PAGE
            @Override
            public void onRefresh() {
                adapter.clear();
                hasLoadedAll=false;
                loadData(1);
            }

            //IS LOADING
            @Override
            public boolean isLoading() {
                return isLoading;
            }

            //CURRENT PAGE LOADED
            @Override
            public boolean hasLoadedAllItems() {
                return hasLoadedAll;
            }
        });

        pullToLoadView.initLoad();
    }

/*
 LOAD MORE DATA
 SIMULATE USING HANDLERS
 */
    public void loadData(final int page)
    {
       isLoading=true;
        new Handler().postDelayed(new Runnable() {
            @Override
            public void run() {

                //ADD CURRENT PAGE'S DATA
                for (int i=0;i<=5;i++)
                {
                    adapter.add(new Spaceship("Spaceship : "+String.valueOf(i)+" in Page : "+String.valueOf(page)));
                }

                //UPDATE PROPETIES
                pullToLoadView.setComplete();
                isLoading=false;
                nextPage=page+1;

            }
        },3000);
    }

}
```

**STEP 6 : Our MainActivity class**

- Why don't we initialize all our views like recyclerview here? Well lets do so.
- Then set its layout manager and adapter.

```java
package com.tutorials.hp.rvinfinitepagination;

import android.os.Bundle;
import android.support.design.widget.FloatingActionButton;
import android.support.design.widget.Snackbar;
import android.support.v7.app.AppCompatActivity;
import android.support.v7.widget.Toolbar;
import android.view.View;

import com.srx.widget.PullToLoadView;
import com.tutorials.hp.rvinfinitepagination.mData.Paginator;

public class MainActivity extends AppCompatActivity {

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);
        Toolbar toolbar = (Toolbar) findViewById(R.id.toolbar);
        setSupportActionBar(toolbar);

        PullToLoadView pullToLoadView= (PullToLoadView) findViewById(R.id.pullToLoadView);
        new Paginator(this,pullToLoadView).initializePaginator();

        FloatingActionButton fab = (FloatingActionButton) findViewById(R.id.fab);
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

#### **How to Download and  Run.**

- Download the project above.
- You'll get a zipped file,extract it.
- Open the Android Studio.
- Now close, already open project
- From the Menu bar click on **File >New> Import Project**
- Now Choose a Destination Folder, from where you want to import project.
- Choose an Android Project.
- Now Click on “**OK**“.
- Done, your Project importing start.

#### **More Resources**

| Resource | Link |
| --- | --- |
| GitHub Browse | [Browse](https://github.com/RecyclerView-InfinitePagination) |
| GitHub Download Link | [Download](https://github.com/Oclemy/RecyclerView-InfinitePagination/archive/master.zip) |

Best Regards, Oclemy.
