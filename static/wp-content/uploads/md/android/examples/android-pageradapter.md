# ViewPager and PagerAdapter Examples


_Android ViewPager Tutorial and Examples._

ViewPager is a Layout Manager that allows user to swipe through pages either left or right. In ViewPager each child view is a separate page (a separate tab) in the layout.

ViewPager is one of the most important navigation features of android as it powers most of those swiping you see in apps. Swiping is these days one of the most popular form of navigation and is quite unique when compared to forms of navigation commonly used in desktop and web apps.


Given that our smartphones have become our personal assistants, the ability to swipe is one of those features that have become so common that we forget how it revolutionized how we use our computers(called smartphones).

In majority of cases, `ViewPager` gets used alongside [Fragments](https://camposha.info/android/fragment) and with tabs.

Thus this provides conveniency in terms of suppling and managing the lifecycle of each page. Fragments remember, are subactivities, and activities represent a single screen. Fragments most oftenly get used as pages.

And it is these pages that we can swipe through via ViewPager.Normally you have to provide an implementation of a `PagerAdapter` to generate the pages that the view shows.

There are two common `PagerAdapter` subclasses that we use to generate the pages:

1. `FragmentPagerAdapter` - An implementation of `PagerAdapter` that represents each page as a Fragment that is persistently kept in the fragment manager as long as the user can return to the page. Best when navigating between sibling screens representing a fixed, small number of pages.
2. `FragmentStatePagerAdapter`\- Implementation of PagerAdapter that uses a Fragment to manage each page. This class also handles saving and restoring of fragment's state. Best for paging across a collection of objects for which the number of pages is undetermined. It destroys fragments as the user navigates to other pages, minimizing memory usage.

These are FragmentPagerAdapter and FragmentStatePagerAdapter; each of these classes have simple code showing how to build a full user interface with them.

Normally you can annotate your views with `ViewPager.DecorView` annotation. Then those views get treated as part of the view pagers 'decor'. You can manipulate a decor view's position via it's `android:layout_gravity` attribute.

For example:

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


#### Important ViewPager Methods

**1\. setAdapter()**

```java
setAdapter(PagerAdapter adapter)
```

This method will set a `PagerAdapter` that will supply views for this pager as needed.

**2\. setCurrentItem**

```java
setCurrentItem(int item)
```

This method will set the currently selected page.

```java
setCurrentItem(int item, boolean smoothScroll)
```

This second one will set the currently selected page, but allows you to specify whether to use smooth scroll or not.

#### Steps in Using ViewPager

**Step 1 - Create Project**

Create Your android project.

**Step 2 - Create Pages**

Mostly we use fragments as pages. So we create as many fragments as we want.

```java
public class NewsFragment extends Fragment {...}
public class SportsFragment extends Fragment {...}
public class PoliticsFragment extends Fragment {...}
```

Each [Fragment](https://camposha.info/android/fragment) is normally responsible for its own lifecycle management, we said that earlier.

So you will be overriding some methods inside those Fragments.

**Step 3 - Prepare PagerAdapter**

Those Fragments are nothing to our ViewPager without a PagerAdapter, whose subclass can can handle those Fragments for our ViewPager to work with.

Given that we are using Fragments we can subclass the FragmentPagerAdapter class, which if your remember we said is _an implementation of `PagerAdapter` that represents each page as a Fragment that is persistently kept in the fragment manager as long as the user can return to the page._

```java
public class MyPagerAdapter extends FragmentPagerAdapter {...}
```

Some methods will be overriden there.

**Step 4 - Add ViewPager in Layout**

Mostly in the main layout of your activity:

```xml
<android.support.design.widget.CoordinatorLayout>
    ..........

    <android.support.v4.view.ViewPager
        android_id="@+id/mViewpager_ID"
        android_layout_width="match_parent"
        android_layout_height="match_parent"
        app_layout_behavior="@string/appbar_scrolling_view_behavior"
        />

        ...............

</android.support.design.widget.CoordinatorLayout>
```

**Step 5 - Reference ViewPager Object**

Reference ViewPager, mostly in your activity, say inside your `onCreate()` method:

```java

        ViewPager vp= (ViewPager) findViewById(R.id.mViewpager_ID);
```

**Step 6 - Add Fragments/Pages to Your FragmentPagerAdapter**

Obvisoul first you instantiate the FragmentPagerAdapter implementation

```java
        MyPagerAdapter pagerAdapter=new MyPagerAdapter(this.getSupportFragmentManager());
```

In this case the `addFragment()` is just a custom method we created in our FragmentPagerAdapter implementation:

```java
        pagerAdapter.addFragment(new CrimeFragment());
        pagerAdapter.addFragment(new DramaFrgament());
        pagerAdapter.addFragment(new DocumentaryFragment());
```

**Step 7 - Set Your FragmentPagerAdapter to ViewPager**

We use the `setAdapter()` method. This met

```java
        vp.setAdapter(pagerAdapter);
```

**Step 8 - Use it**

Maybe with a Tablayout.

```java
    tabLayout.setupWithViewPager(vp);
```

## PagerAdapter

_Android PagerAdapter Tutorial and Examples_.

Normally you use PagerAdapters with ViewPager. ViewPager you know allows us swipe through pages.

Well PagerAdapter acts as the base class for providing the adapter to populate pages inside of that ViewPager.

Most of the time we don't use `pageradapter` directly but instead use it's implementations like:

1. `android.support.v4.app.FragmentPagerAdapter`.
2. `android.support.v4.app.FragmentStatePagerAdapte`.

There are 4 methods that are important to a PagerAdapter and have to be overriden:

1. instantiateItem(ViewGroup,int)
2. destroyItem(ViewGroup,int,Object)
3. getCount()
4. isViewFromObject(View,Object)

#### Common Methods

Here are some of the most commonly used methods of this class:

1. `getCount` : Return the number of views available.
2. `destroyItem` : Remove a page for the given position. The adapter is responsible for removing the view from its container, although it only must ensure this is done by the time it returns from `finishUpdate(ViewGroup)`.
3. `finishUpdate` : Called when the a change in the shown pages has been completed. At this point you must ensure that all of the pages have actually been added or removed from the container as appropriate.
4. `getPageTitle` : This method may be called by the ViewPager to obtain a title string to describe the specified page. This method may return null indicating no title for this page. The default implementation returns null.
5. `instantiateItem` : Create the page for the given position. The adapter is responsible for add

#### PagerAdapter Examples.

Here's an example scenario where we've used PagerAdapter, overriding it's methods.

```java

public class ItemPagerAdapter extends android.support.v4.view.PagerAdapter {

    Context mContext;
    LayoutInflater mLayoutInflater;
    final int[] mItems;

    public ItemPagerAdapter(Context context, int[] items) {
        this.mContext = context;
        this.mLayoutInflater = (LayoutInflater) mContext.getSystemService(Context.LAYOUT_INFLATER_SERVICE);
        this.mItems = items;
    }

    @Override
    public int getCount() {
        return mItems.length;
    }

    @Override
    public boolean isViewFromObject(View view, Object object) {
        return view == ((LinearLayout) object);
    }

    @Override
    public Object instantiateItem(ViewGroup container, int position) {
        View itemView = mLayoutInflater.inflate(R.layout.pager_item, container, false);
        ImageView imageView = (ImageView) itemView.findViewById(R.id.imageView);
        imageView.setImageResource(mItems[position]);
        container.addView(itemView);
        return itemView;
    }

    @Override
    public void destroyItem(ViewGroup container, int position, Object object) {
        container.removeView((LinearLayout) object);
    }
}
```

Find the full example here.

#### How to Use a Title Strip Instead of Tabs

Sometimes, instead of rendering the full action bar tab, you may want to provide scrollable tabs with shorter visual profile.

In that case you use `PagerTitleStrip` with your swipe views.

```xml
<android.support.v4.view.ViewPager

    android_id="@+id/pager"
    android_layout_width="match_parent"
    android_layout_height="match_parent">

    <android.support.v4.view.PagerTitleStrip
        android_id="@+id/pager_title_strip"
        android_layout_width="match_parent"
        android_layout_height="wrap_content"
        android_layout_gravity="top"
        android_background="#33b5e5"
        android_textColor="#fff"
        android_paddingTop="4dp"
        android_paddingBottom="4dp" />

</android.support.v4.view.ViewPager>
```

#### Quick ViewPager Examples and HowTo's

##### 1\. How to flip ViewPager to Next or Previous Page

```java
    // ViewPager flips to the next page, no need to worry about crossing the border
    public static void next(ViewPager viewPager) {
        int position = viewPager.getCurrentItem();
        goPosition(viewPager, position + 1);
    }

    // ViewPager flips to the previous page, no need to worry about crossing the border
    public static void last(ViewPager viewPager) {
        int position = viewPager.getCurrentItem();
        goPosition(viewPager, position - 1);
    }

    // ViewPager flips to the specified page, no need to worry about crossing the border (with page flip animation)
    public static void goPosition(ViewPager viewPager, int position) {
        goPosition(viewPager, position, true);
    }

    // ViewPager flips to the specified page, no need to worry about crossing the border
    // needAnim : Do you need to turn page animation?
    public static void goPosition(ViewPager viewPager, int position, boolean needAnim) {
        int count = viewPager.getAdapter().getCount();
        if (position >= 0 && position < count) {
            viewPager.setCurrentItem(position, needAnim);
        }
    }
```

# Full Examples

## Example 1: Kotlin Android Auto-Image Slider with PagerAdapter

In this example you will create a simple Image slider using PagerAdapter and viewPager. No fragment is used. The images are being slid automatically using Handler as well as manually using ViewPager swipe.

### Step 1: Create Project

Start by creating an empty `Android Studio` project.

### Step 2: Dependencies

No third party depdencies are needed for this project.

### Step 3: Create Indicator Dots

In your drawable folder create a file called `active_dot.xml` and add the following code:

**active_dots.xml**

```xml
<?xml version="1.0" encoding="utf-8"?>
<shape xmlns:android="http://schemas.android.com/apk/res/android"
    android:shape="oval"
    android:useLevel="true"
    android:dither="true">

    <size
        android:width="7dp"
        android:height="7dp"/>

    <solid
        android:color="@color/active_dot"/>

</shape>
```

### Step 4: Design Layouts

Design two layouts as follows:

**(a). swipe_fragment.xml**

Place an imageview in this layout:

```xml
<?xml version="1.0" encoding="utf-8"?>
<RelativeLayout xmlns:android="http://schemas.android.com/apk/res/android"
    android:layout_width="match_parent"
    android:layout_height="match_parent">

    <ImageView
        android:id="@+id/img"
        android:layout_width="match_parent"
        android:layout_height="250dp"
        android:scaleType="fitXY"/>

</RelativeLayout>
```

**(b). activity_main.xml**

Place a ViewPager in this layout:

```xml
<?xml version="1.0" encoding="utf-8"?>
<RelativeLayout xmlns:android="http://schemas.android.com/apk/res/android"
    xmlns:app="http://schemas.android.com/apk/res-auto"
    xmlns:tools="http://schemas.android.com/tools"
    android:layout_width="match_parent"
    android:layout_height="match_parent"
    android:background="#F44336"
    tools:context=".MainActivity">

    <androidx.appcompat.widget.Toolbar
        android:id="@+id/toolbar"
        android:layout_width="match_parent"
        android:layout_height="?attr/actionBarSize"
        android:background="@color/colorPrimary"/>

    <androidx.viewpager.widget.ViewPager
        android:id="@+id/pager"
        android:layout_below="@+id/toolbar"
        android:layout_width="wrap_content"
        android:layout_height="wrap_content">

    </androidx.viewpager.widget.ViewPager>

    <LinearLayout
        android:id="@+id/dotLayout"
        android:layout_width="match_parent"
        android:layout_height="30dp"
        android:layout_below="@id/toolbar"
        android:gravity="center"
        android:layout_marginTop="220dp"
        android:orientation="horizontal">

    </LinearLayout>

</RelativeLayout>
```

### Step 5: Create PagerAdapter

Create a class called `PagerView` and add the following code:

**PagerView.kt**

```kotlin
package com.example.autoimagesliderusingkotlin

import android.content.Context
import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import android.widget.ImageView
import android.widget.RelativeLayout
import androidx.viewpager.widget.PagerAdapter

class PagerView : PagerAdapter {

    lateinit var con : Context
    lateinit var path : IntArray
    lateinit var inflater: LayoutInflater

    constructor(con: Context, path: IntArray) : super() {
        this.con = con
        this.path = path
    }

    override fun isViewFromObject(view: View, `object`: Any): Boolean {

        return view == `object` as RelativeLayout
    }

    override fun getCount(): Int {

        return path.size

    }

    override fun instantiateItem(container: ViewGroup, position: Int): Any {
        var img : ImageView
        inflater = con.getSystemService(Context.LAYOUT_INFLATER_SERVICE) as LayoutInflater
        var rv : View = inflater.inflate(R.layout.swipe_fragment, container, false)
        img = rv.findViewById(R.id.img) as ImageView
        img.setImageResource(path[position])
        container.addView(rv)
        return rv
    }

    override fun destroyItem(container: ViewGroup, position: Int, `object`: Any) {
        container.removeView(`object` as RelativeLayout)
    }

}
```

### Step 6: Create MainActivity

Here's the full code:

**MainActivity.kt**

```kotlin
import androidx.appcompat.app.AppCompatActivity
import android.os.Bundle
import android.os.Handler
import android.view.ViewGroup
import android.widget.ImageView
import android.widget.LinearLayout
import androidx.appcompat.widget.Toolbar

import androidx.core.content.ContextCompat
import androidx.viewpager.widget.ViewPager
import java.util.*

class MainActivity : AppCompatActivity() {

    lateinit var dotLayout : LinearLayout
    lateinit var mPager : ViewPager
    lateinit var toolbar: Toolbar
    var path : IntArray = intArrayOf(R.drawable.ironman,R.drawable.captain_america,R.drawable.thor,R.drawable.hulk)
    lateinit var dots : Array<ImageView>
    lateinit var adapter : PagerView

    var currentPager : Int = 0
    lateinit var timer: Timer
    val DELAY_MS : Long = 1500
    val PERIOD_MS : Long = 1500

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_main)

        toolbar = findViewById(R.id.toolbar)
        setSupportActionBar(toolbar)
        mPager = findViewById(R.id.pager)
        adapter = PagerView(this, path)
        mPager.adapter = adapter
        dotLayout = findViewById(R.id.dotLayout)
        createDots(0)
        updatePager()
        mPager.addOnPageChangeListener(object : ViewPager.OnPageChangeListener{
            override fun onPageScrollStateChanged(state: Int) {

            }

            override fun onPageScrolled(position: Int, positionOffset: Float, positionOffsetPixels: Int) {

            }

            override fun onPageSelected(position: Int) {
                currentPager = position
                createDots(position)
            }
        })
    }

    fun updatePager()
    {
        var handler = Handler()
        val Update : Runnable = Runnable {
            if (currentPager == path.size)
            {
                currentPager = 0
            }
            mPager.setCurrentItem(currentPager++, true)
        }
        timer = Timer()
        timer.schedule(object : TimerTask(){
            override fun run() {
                handler.post(Update)
            }
        },DELAY_MS, PERIOD_MS)
    }

    fun createDots(position: Int)
    {
        if (dotLayout!=null)
        {
            dotLayout.removeAllViews()
        }
        dots = Array(path.size,{i -> ImageView(this)})

        for (i in 0..path.size - 1)
        {
            dots[i] = ImageView(this)
            if (i == position)
            {
                dots[i].setImageDrawable(ContextCompat.getDrawable(this, R.drawable.active_dots))
            }
            else
            {
                dots[i].setImageDrawable(ContextCompat.getDrawable(this, R.drawable.inactive_dots))
            }

            var params : LinearLayout.LayoutParams = LinearLayout.LayoutParams(ViewPager.LayoutParams.WRAP_CONTENT,
                ViewGroup.LayoutParams.WRAP_CONTENT)

            params.setMargins(4,0,4,0)
            dotLayout.addView(dots[i], params)
        }
    }
}
```

### Run

Copy the code or download it in the link below, build and run.

### Reference

Here are the reference links:

| Number | Link |
| --- | --- |
| 1. | [Download](https://github.com/Kiran-Bahalaskar/Auto-Image-Slider-Using-Kotlin/archive/refs/heads/master.zip) Example |
| 2. | [Follow](https://github.com/Kiran-Bahalaskar/) code author |
| 3. | Code: [Apache 2.0 License](http://www.apache.org/licenses/LICENSE-2.0.txt) |

## Example 2: Android Tablayout – Swipe Fragments With Images

Android material tablayout Swipe tabs with images tutorial.

Android material tablayout Swipe tabs tutorial.Whenever am looking at various apps in google play store,it doesn't always surpise me the number of apps based on Tabs.Tabs have gone some not so quiet evolution,from Tabhost,to actionbar tabs and now we are talking about Material Tablayout tabs.Most of these apps have fragments as their pages.In this tutorial we shall do the same.We shall display fragments when our tabs are clicked.Our fragments shall have images and a simple textview.

#### What we do :

- Show Material Tablayout tabs in our android app.
- The tabs shall be used for navigation by clicking.
- When clicked we show a fragment.
- We'll have three fragments in this tutorial.They'll contain simple imageviews.
- To use fragments as our pages we need FragmentPagerAdapter.
- It helps in binding our pages/fragments to our tabs.
- FragmentPageAdapter belongs to support.v4 libraries.

#### What You do :

- Create a project in android studio.
- Give it a name and choose minimum and target SDKs.
- Personally I used 15 and 23 as visible in my build.gradle below.
- Then choose basic activity as your template layout.
- All these are not requirements and you can choose whatever you like.

#### Screenshots

Tab 1:

![](https://image.prntscr.com/image/J_c8VGqISvWd8l0P8vG6jw.png)

Tab 2

![](https://image.prntscr.com/image/6gGa5u2sSXuxMN35laxLXg.png)

#### SECTION 1 : Our Dependencies

#### Build.Gradle

No third party library is needed.

####   Documentary Fragment

Main Responsibility : IS OUR DOCUMENTARY PAGE

- Shall get inflated from our documentary fragment layout.
- This shall represent documentary page in our app.
- We shall show a shuttle carrier plane image in this fragment.
- Shall be shown when Documentary Tab is clicked.
- Woops.In reality its science fiction page not documentary I see.

```java
public class ScienceFictionFragment extends Fragment {

    @Nullable
    @Override
    public View onCreateView(LayoutInflater inflater, ViewGroup container, Bundle savedInstanceState) {

        View rootView=inflater.inflate(R.layout.science_fragment,null);
        return rootView;
    }

    @Override
    public String toString() {
        return "Science";
    }
}
```

####   Drama Fragment

Main Responsibility : IS OUR DRAMA PAGE

- Shall get inflated from our drama fragment layout.
- This shall represent drama page in our app.
- We shall show a game of thrones character  image in this fragment.
- Shall be shown when Drama Tab is clicked.

```java

public class DramaFragment extends Fragment {

    @Nullable
    @Override
    public View onCreateView(LayoutInflater inflater, ViewGroup container, Bundle savedInstanceState) {
        View rootView=inflater.inflate(R.layout.drama_fragment,null);
        return rootView;
    }

    @Override
    public String toString() {
        return "Drama";
    }
}
```

#### SECTION 3 : Our Pager Adapter

#### FragmentPagerAdapter class.

Main Responsibility : BIND OUR FRAGMENTS TO OUR TABS.

- Our pages we said shall be our fragments.
- This class shall add them to our pages collection.
- It shall also return each page when a tab is clicked.
- We set the total count by returning the total number of fragments we have.
- We also set the tab titles here.

```java
public class MyPagerAdapter extends FragmentPagerAdapter {

    ArrayList<Fragment> pages=new ArrayList<>();

    public MyPagerAdapter(FragmentManager fm) {
        super(fm);
    }

    @Override
    public Fragment getItem(int position) {
        return pages.get(position);
    }

    @Override
    public int getCount() {
        return pages.size();
    }

    @Override
    public CharSequence getPageTitle(int position) {
        return pages.get(position).toString();
    }

    public void addPage(Fragment f)
    {
        pages.add(f);
    }
}
```

#### SECTION 4 : Our Activity

#### MainActivity class.

Main Responsibility : LAUNCH OUR APP.

- The leader of all our classes.
- It extends AppcompatActivity hence is an activity.
- Activities are the entry point of android applications.This is no exception.
- We shall reference the widgets like Tablayout here, and views like ViewPager,FloatingActionButton etc from our XML Layouts.
- We then can either implement OnTabSelectedListener here explicitly on our class or just using an annonymous class.
- We then set this listener to our tablayout.
- Moreover we set other tablayout properties like gravity.
- We also make sure that we instantiate our fragments and pass them to our adapter.Remember they are our pages we said.
- Inside our annonymous class,we override some methods.
- In this case we are only interested in OnTabSelected since we want to set the current item of our viewpager.

```java
public class MainActivity extends AppCompatActivity {

    private TabLayout tab;
    private ViewPager vp;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);
        Toolbar toolbar = (Toolbar) findViewById(R.id.toolbar);
        setSupportActionBar(toolbar);

        FloatingActionButton fab = (FloatingActionButton) findViewById(R.id.fab);
        fab.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View view) {
                Snackbar.make(view, "Replace with your own action", Snackbar.LENGTH_LONG)
                        .setAction("Action", null).show();
            }
        });

        vp= (ViewPager) findViewById(R.id.viewpager);
        addPages(vp);

        tab= (TabLayout) findViewById(R.id.tabs);
        tab.setTabGravity(TabLayout.GRAVITY_FILL);
        tab.setupWithViewPager(vp);
        tab.setOnTabSelectedListener(tabSelectedListener(vp));

    }

  private void addPages(ViewPager viewPager)
  {
     MyPagerAdapter myPagerAdapter=new MyPagerAdapter(getSupportFragmentManager());
      myPagerAdapter.addPage(new CrimeFragment());
      myPagerAdapter.addPage(new DramaFragment());
      myPagerAdapter.addPage(new ScienceFictionFragment());

      vp.setAdapter(myPagerAdapter);
  }

    private TabLayout.OnTabSelectedListener tabSelectedListener(final  ViewPager pager)
    {
        return  new TabLayout.OnTabSelectedListener() {
            @Override
            public void onTabSelected(TabLayout.Tab tab) {
                pager.setCurrentItem(tab.getPosition());
            }

            @Override
            public void onTabUnselected(TabLayout.Tab tab) {

            }

            @Override
            public void onTabReselected(TabLayout.Tab tab) {

            }
        };
    }

}
```

#### SECTION 5 : Our Layouts

#### ActivityMain.xml Layout.

- Inflated as our activity's view.
- Includes our content main layout.
- Contains support.v4 widgets like Cordinatorlayout, appbarlayout, toolbar and our floating action button view.
- We also add our ViewPager here.

```xml
<?xml version="1.0" encoding="utf-8"?>
<android.support.design.widget.CoordinatorLayout

    android_layout_width="match_parent"
    android_layout_height="match_parent"
    android_fitsSystemWindows="true"
    tools_context="com.tutorials.hp.fixedtabs.MainActivity">

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

        <android.support.design.widget.TabLayout
            android_id="@+id/tabs"
            android_layout_width="match_parent"
            android_layout_height="wrap_content"

           />

    </android.support.design.widget.AppBarLayout>

    <include layout="@layout/content_main" />

    <android.support.design.widget.FloatingActionButton
        android_id="@+id/fab"
        android_layout_width="wrap_content"
        android_layout_height="wrap_content"
        android_layout_gravity="bottom|end"
        android_layout_margin="@dimen/fab_margin"
        android_src="@android:drawable/ic_dialog_email" />

    <android.support.v4.view.ViewPager
        android_id="@+id/viewpager"
        android_layout_width="match_parent"
        android_layout_height="match_parent"
        app_layout_behavior="@string/appbar_scrolling_view_behavior"
        />

</android.support.design.widget.CoordinatorLayout>
```

#### ContentMain.xml Layout.

- Shall get replaced by our fragments layouts.

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
    tools_context="com.tutorials.hp.fixedtabs.MainActivity"
    tools_showIn="@layout/activity_main">

    <TextView
        android_layout_width="wrap_content"
        android_layout_height="wrap_content"
        android_text="Hello World!" />
</RelativeLayout>
```

#### CrimeFragment.xml Layout.

- Contains Crime fragment View hierarchy.
- Inflated to Crime fragment.

```xml
<?xml version="1.0" encoding="utf-8"?>
<LinearLayout
    android_orientation="vertical" android_layout_width="match_parent"
    android_layout_height="match_parent"
    android_background="@drawable/red"
    >

</LinearLayout>
```

#### DramaFragment.xml Layout.

- Contains Drama fragment View hierarchy.
- Inflated to Drama fragment.

```xml
<?xml version="1.0" encoding="utf-8"?>
<LinearLayout
    android_orientation="vertical" android_layout_width="match_parent"
    android_layout_height="match_parent"
    android_background="@drawable/breaking"
    >

</LinearLayout>
```

#### DocumentaryFragment.xml Layout.

- Contains Documentary fragment View hierarchy.
- Inflated to Documentary fragment.

```xml
<?xml version="1.0" encoding="utf-8"?>
<LinearLayout
    android_orientation="vertical" android_layout_width="match_parent"
    android_layout_height="match_parent"
    android_background="@drawable/thrones"
    >

</LinearLayout>
```

#### Video Tutorial/Demo

- We also have a video tutorial for this example explained in a step by step manner.
- Moreover you can view the project demo there.
- The full source code reference is of course in the link above.

[https://www.youtube.com/watch?v=WNd6oW2uUMA](https://www.youtube.com/watch?v=WNd6oW2uUMA)

## Example 3: Android ViewPager – Sliding Tabs With ListViews

Android ViewPager Sliding Tabs Tutorial. Swiping is cool,I have said it before.And there is one android support library class that makes it easy to implement in our apps,the ViewPager.

This class was added in Android 4.0 to android.support.v4 libraries.ViewPager itself is a view,but a unique one.For one you won't be interacting with viewpager as you do with widgets.Its purpose,togethher with its elder brother,the FragmentPagerAdapter and FragmentSupportPagerAdapter,are to help in paging,as the name Viewpager suggests

.Secondly,Viewpager isn't added via UI designer like widgets,perhaps because it was added later on and must be specified with full class name tag in XML layout specification. Here,we shall see how to swipe through fragments.We'll have a total of three fragments.

These fragments shall have their own view hierarchy.Hence we shall add ListView component in each of them.These ListViews shall be populated with different data sets.We shal then navigate through them either by swiping or by using material clickable tabs.

##### What we do :

- Show Material Tablayout tabs in our android app.
- The tabs shall be used for navigation by clicking.
- When clicked we show a fragment.
- We'll have three fragments in this tutorial.They'll contain simple imageviews.
- To use fragments as our pages we need FragmentPagerAdapter.
- It helps in binding our pages/fragments to our tabs.
- FragmentPageAdapter belongs to support.v4 libraries.

##### What You do :

- Create a project in android studio.
- Give it a name and choose minimum and target SDKs.

This is an android Swipe Tabs tutorial.We use Material desing toolbar and viewpager.Our fragments going to be therefore swipeable as well as clickable as a mode of navigation.The fragments going to have their individual layouts and shall contain their own unique view hierarchy.In this case we choose to show listviews ineach particular fragment.Our ListViews are custom with images and text. Cheers.

#### 1\. SETUP AND DATA OBJECT

##### (a). Our Build.Gradle

No third party library is used.

##### (b). Our Model Class

- Data Object.
- Represents a single TVShow object.
- Each objet shall fill a single viewItem in our custom ListView.
- Our data here represents a name and an image.

```java
package com.tutorials.hp.swipetabslistview.mData;

public class TVShow {

    String name;
    int image;

    public TVShow(String name, int image) {
        this.name = name;
        this.image = image;
    }

    public String getName() {
        return name;
    }

    public int getImage() {
        return image;
    }
}
```

#### 2\. Our Fragments and PagerAdapter

##### (a). CrimeFragment

Main Responsibility : IS OUR CRIME PAGE

- Shall get inflated from our crime fragment layout.
- This shall represent crime page in our app.
- We shall show a bad boy image in this fragment.
- Shall be shown when Crime Tab is clicked.

```java

public class CrimeFragment extends Fragment {

    @Nullable
    @Override
    public View onCreateView(LayoutInflater inflater, ViewGroup container, Bundle savedInstanceState) {

        View rootView=inflater.inflate(R.layout.crime_fragment,container,false);

        ListView lv= (ListView) rootView.findViewById(R.id.crimeListView);
        CustomAdapter adapter=new CustomAdapter(this.getActivity(),getCrimeMovies());
        lv.setAdapter(adapter);

        return rootView;
    }

    private ArrayList<TVShow> getCrimeMovies() {
        //COLECTION OF CRIME MOVIES
        ArrayList<TVShow> movies=new ArrayList<>();

        //SINGLE MOVIE
        TVShow tvShow=new TVShow("BLACKLIST",R.drawable.red);

        //ADD ITR TO COLLECTION
        movies.add(tvShow);

        tvShow=new TVShow("Breaking Bad",R.drawable.breaking);
        movies.add(tvShow);

        tvShow=new TVShow("Crisis",R.drawable.crisis);
        movies.add(tvShow);

        tvShow=new TVShow("BlackList",R.drawable.blacklist);
        movies.add(tvShow);

        tvShow=new TVShow("Men In Black",R.drawable.meninblack);
        movies.add(tvShow);

        return movies;
    }

    @Override
    public String toString() {
        String title="Crime";
        return title;
    }
}
```

##### (b). DramaFragment

Main Responsibility : IS OUR DRAMA PAGE

- Shall get inflated from our drama fragment layout.
- This shall represent drama page in our app.
- We shall show a game of thrones character  image in this fragment.
- Shall be shown when Drama Tab is clicked.

```java

public class DramaFrgament extends Fragment {
    @Nullable
    @Override
    public View onCreateView(LayoutInflater inflater, ViewGroup container, Bundle savedInstanceState) {

        View rootView=inflater.inflate(R.layout.drama_frgament,container,false);

        ListView lv= (ListView) rootView.findViewById(R.id.dramaListView);
        CustomAdapter adapter=new CustomAdapter(this.getActivity(),getDramaMovies());
        lv.setAdapter(adapter);

        return rootView;
    }

    private ArrayList<TVShow> getDramaMovies() {
        ArrayList<TVShow> movies=new ArrayList<>();
        TVShow tvShow=new TVShow("Star Wars",R.drawable.starwars);
        movies.add(tvShow);

        tvShow=new TVShow("Ghost Rider",R.drawable.rider);
        movies.add(tvShow);

        tvShow=new TVShow("Game Of Thrones",R.drawable.thrones);
        movies.add(tvShow);

        tvShow=new TVShow("Ghost",R.drawable.ghost);
        movies.add(tvShow);

        return movies;
    }

    @Override
    public String toString() {
        return "Drama";
    }
}
```

##### (c). DocumnetaryFragment

Main Responsibility : IS OUR DOCUMENTARY PAGE

- Shall get inflated from our documentary fragment layout.
- This shall represent documentary page in our app.
- We shall show a shuttle carrier plane image in this fragment.
- Shall be shown when Documentary Tab is clicked.

```java

public class DocumentaryFragment extends Fragment {
    @Nullable
    @Override
    public View onCreateView(LayoutInflater inflater, ViewGroup container, Bundle savedInstanceState) {

        View rootView=inflater.inflate(R.layout.documentary_fragment,container,false);

        ListView lv= (ListView) rootView.findViewById(R.id.docsListView);
        CustomAdapter adapter=new CustomAdapter(this.getActivity(),getDocumentaries());

        lv.setAdapter(adapter);
        return rootView;
    }
    private ArrayList<TVShow> getDocumentaries() {
        ArrayList<TVShow> movies=new ArrayList<>();
        TVShow movie=new TVShow("Columbia",R.drawable.shuttlecarrier);
        movies.add(movie);

        movie=new TVShow("How to Live to 100",R.drawable.fruits);
        movies.add(movie);

        movie=new TVShow("Death of The Sun",R.drawable.space);
        movies.add(movie);

        movie=new TVShow("Inventions That Changed The World",R.drawable.thrones);
        movies.add(movie);

        movie=new TVShow("The Super Jumbo ",R.drawable.moderncity);
        movies.add(movie);

        return movies;
    }

    @Override
    public String toString() {
        return "Documentary";
    }
}
```

##### (d). FragmentPagerAdapter

Main Responsibility : BIND OUR FRAGMENTS TO OUR TABS.

- Our pages we said shall be our fragments.
- This class shall add them to our pages collection.
- It shall also return each page when a tab is clicked.
- We set the total count by returning the total number of fragments we have.
- We also set the tab titles here.

```java

public class MyPagerAdapter extends FragmentPagerAdapter {

    ArrayList<Fragment> fragments=new ArrayList<>();

    public MyPagerAdapter(FragmentManager fm) {
        super(fm);
    }

    @Override
    public Fragment getItem(int position) {
        return fragments.get(position);
    }

    @Override
    public int getCount() {
        return fragments.size();
    }

    //ADD PAGE
    public void addFragment(Fragment f)
    {
        fragments.add(f);
    }

    //set title

    @Override
    public CharSequence getPageTitle(int position) {
        String title=fragments.get(position).toString();
        return title.toString();
    }
}
```

#### 2\. ListAdapter

##### (a). CustomAdapter class

- Bind our data set to our ListView.
- Our row model shall get inflated here and returned as a View object.
- We also handle our ListView Item click here.

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

        TextView nameTxt= (TextView) convertView.findViewById(R.id.nameTxt);
        ImageView img= (ImageView) convertView.findViewById(R.id.movieImage);

        final String name=tvShows.get(position).getName();
        int image=tvShows.get(position).getImage();

        nameTxt.setText(name);
        img.setImageResource(image);

        convertView.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                Toast.makeText(c,name,Toast.LENGTH_SHORT).show();
            }
        });

        return convertView;
    }
}
```

#### 3\. Main Activity

##### (a). MainActivity class

Main Responsibility : LAUNCH OUR APP.

- It extends AppcompatActivity hence is an activity.
- Activities are the entry point of android applications.This is no exception.
- It loads our activity layout.
- We shall reference the widgets like Tablayout here, and views like ViewPager,FloatingActionButton etc from our XML Layouts.
- We then can either implement OnTabSelectedListener here explicitly on our class or just using an annonymous class.
- We then set this listener to our tablayout.
- Moreover we set other tablayout properties like gravity.
- We also make sure that we instantiate our fragments and pass them to our adapter.Remember they are our pages we said.
- Inside our annonymous class,we override some methods.
- In this case we are only interested in OnTabSelected since we want to set the current item of our viewpager.

```java

public class MainActivity extends AppCompatActivity implements TabLayout.OnTabSelectedListener,ViewPager.OnPageChangeListener {

    ViewPager vp;
    TabLayout tabLayout;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);
        Toolbar toolbar = (Toolbar) findViewById(R.id.toolbar);
        setSupportActionBar(toolbar);

        FloatingActionButton fab = (FloatingActionButton) findViewById(R.id.fab);
        fab.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View view) {
                Snackbar.make(view, "Replace with your own action", Snackbar.LENGTH_LONG)
                        .setAction("Action", null).show();
            }
        });

        //VIEWPAGER
        vp= (ViewPager) findViewById(R.id.mViewpager_ID);
        this.addPages();

        //TABLAYOUT
        tabLayout= (TabLayout) findViewById(R.id.mTab_ID);
        tabLayout.setTabGravity(TabLayout.GRAVITY_FILL);
        tabLayout.setupWithViewPager(vp);
        tabLayout.setOnTabSelectedListener(this);

    }

    private void addPages()
    {
        MyPagerAdapter pagerAdapter=new MyPagerAdapter(this.getSupportFragmentManager());
        pagerAdapter.addFragment(new CrimeFragment());
        pagerAdapter.addFragment(new DramaFrgament());
        pagerAdapter.addFragment(new DocumentaryFragment());

        //SET ADAPTER TO VP
        vp.setAdapter(pagerAdapter);
    }

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

#### 4\. Layouts and Results

##### (a). ActivityMain.xml Layout.

- Inflated as our activity's view.
- Includes our content main layout.
- Contains support.v4 widgets like Cordinatorlayout, appbarlayout, toolbar and our floating action button view.
- We also add our ViewPager here.
- Our viewpager isn't in the android.widget package hence we qualify with the full class name of the element.

```xml
<?xml version="1.0" encoding="utf-8"?>
<android.support.design.widget.CoordinatorLayout

    android_layout_width="match_parent"
    android_layout_height="match_parent"
    android_fitsSystemWindows="true"
    tools_context="com.tutorials.hp.swipetabslistview.MainActivity">

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
        <android.support.design.widget.TabLayout
            android_id="@+id/mTab_ID"
            android_layout_width="match_parent"
            android_layout_height="wrap_content"

            />

    </android.support.design.widget.AppBarLayout>

    <include layout="@layout/content_main" />

    <android.support.design.widget.FloatingActionButton
        android_id="@+id/fab"
        android_layout_width="wrap_content"
        android_layout_height="wrap_content"
        android_layout_gravity="bottom|end"
        android_layout_margin="@dimen/fab_margin"
        android_src="@android:drawable/ic_dialog_email" />

    <android.support.v4.view.ViewPager
        android_id="@+id/mViewpager_ID"
        android_layout_width="match_parent"
        android_layout_height="match_parent"
        app_layout_behavior="@string/appbar_scrolling_view_behavior"
        />

</android.support.design.widget.CoordinatorLayout>
```

#####  (b) ContentMain.xml Layout

- Shall get replaced by our fragments layouts.

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
    tools_context="com.tutorials.hp.swipetabslistview.MainActivity"
    tools_showIn="@layout/activity_main">

</RelativeLayout>
```

##### (b). Model Layout

- The model for a single row item in our custom listview.
- Represents a single view item.
- Has images and text.

```xml
<?xml version="1.0" encoding="utf-8"?>
<android.support.v7.widget.CardView
    android_orientation="horizontal" android_layout_width="match_parent"

    android_layout_margin="10dp"
    card_view_cardCornerRadius="10dp"
    card_view_cardElevation="10dp"

    android_layout_height="wrap_content">

    <RelativeLayout
        android_layout_width="match_parent"
        android_layout_height="match_parent">

        <ImageView
            android_layout_width="wrap_content"
            android_layout_height="wrap_content"
            android_id="@+id/movieImage"
            android_padding="10dp"
            android_src="@drawable/ghost" />

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

        <TextView
            android_layout_width="wrap_content"
            android_layout_height="wrap_content"
            android_textAppearance="?android:attr/textAppearanceLarge"
            android_text=" John Doe a former FBI Agent and now Physics teacher .is wrongly accussed of murdering an innocent child.He makes it his business to find the bad guys who did taht.He convinces hacker Aram to join him.....
            "
            android_id="@+id/descTxt"
            android_padding="10dp"
            android_layout_below="@+id/nameTxt"
            android_layout_alignParentLeft="true"
            />

        <TextView
            android_layout_width="wrap_content"
            android_layout_height="wrap_content"
            android_textAppearance="?android:attr/textAppearanceMedium"
            android_text="TV Show"
            android_id="@+id/posTxt"
            android_padding="10dp"

            android_layout_below="@+id/movieImage"
            android_layout_alignParentRight="true" />

        <CheckBox
            android_layout_width="wrap_content"
            android_layout_height="wrap_content"
            android_id="@+id/chk"
            android_layout_alignParentRight="true"
            />

    </RelativeLayout>
</android.support.v7.widget.CardView>
```

##### (c). Crime Fragment Layout

- Contains Crime fragment View hierarchy.
- Inflated to Crime fragment.

```xml
<?xml version="1.0" encoding="utf-8"?>
<LinearLayout
    android_orientation="vertical" android_layout_width="match_parent"
    android_layout_height="match_parent">

    <ListView
        android_id="@+id/crimeListView"
        android_layout_width="wrap_content"
        android_layout_height="wrap_content"
         />

</LinearLayout>
```

##### (d). Docmentary Fragment Layout

- Contains Documentary fragment View hierarchy.
- Inflated to Documentary fragment.

```xml
<?xml version="1.0" encoding="utf-8"?>
<LinearLayout
    android_orientation="vertical" android_layout_width="match_parent"
    android_layout_height="match_parent">

    <ListView
        android_id="@+id/docsListView"
        android_layout_width="wrap_content"
        android_layout_height="wrap_content"
        />

</LinearLayout>
```

##### (e). Drama Fragment Layout

- Contains Drama fragment View hierarchy.
- Inflated to Drama fragment.

```xml
<?xml version="1.0" encoding="utf-8"?>
<LinearLayout
    android_orientation="vertical" android_layout_width="match_parent"
    android_layout_height="match_parent">

    <ListView
        android_id="@+id/dramaListView"
        android_layout_width="wrap_content"
        android_layout_height="wrap_content"
        />

</LinearLayout>
```

#### 5\. Download

Everything is in the source code reference. It is well commented and easy to understand and can be downloaded below.

Also check our video tutorial it's more detailed and explained in step by step.

| No. | Location | Link |
| --- | --- | --- |
| 1. | GitHub | [Direct Download](https://github.com/Oclemy/SwipeTabsListView/archive/master.zip) |
| 2. | GitHub | [Browse](https://github.com/Oclemy/SwipeTabsListView) |
| 3. | YouTube | [Our YouTube Channel](https://www.youtube.com/channel/UCpdkWp2zh5Qv1ZWlnqswdCw) |

## Example 4: Android Swipe Tabs SQLite – Fragments With ListView

_This is an android swipe tabs with ListView containing SQLite data._

In some of our tutorials we like combining several fundamental concepts so as to give a framework that can be used to build a real world app.

Like in this we want to utilize the following:

1. ViewPager - to achieve fragment swipeability.
2. TabLayout - To achieve tabbed navigation.
3. [Fragments](https://camposha.info/android/fragment) - To render our pages.
4. [SQLite](https://camposha.info/android/sqlite) - To store our data in the local device.

These are important since it can help you build a full application.

In the small app that we are going to build, we will have three fragments. All these fragments will be hosted by the same activity.

Each fragment will hold a ListView with each ListView containing some data.

These fragments will be swipeable so users can use swiping which is a popular and modern navigation mechanism.

![Android SQLite ListView Insert](https://github.com/Oclemy/Tabbed-SQLite-ListView/raw/master/demos/Add%20data.PNG)

![Android SQLite Swipeable Tabs ListView](https://github.com/Oclemy/Tabbed-SQLite-ListView/raw/master/demos/interplanetary%20fragment.PNG)

Also we will be able to use tabs to navigate our application.

The data inside our ListView will be saved in SQLite database. SQLite is a local file-based database written in C programming language and normally comes packaged already with android framework.

Of course before retrieving data from the SQLite database we will first need to insert that data in the first place. So we will be able to save data to SQLite via SQL INSERT statement, retrieve that data via SQL SELECT statement and bind the data in our ListViews.

Each ListView in each Fragment will basically comprise of a unique category of data. So we are categorizing our data in categories. Each category is stored in its fragment.

Here are some of the ideas that can be applied to this type of app:

1. Creating a Movie Listing app, with each movie listed according to it's own genre.
2. Creating an Ecommerce app with each product listed in its own tab according to product category.
3. Creating a Medical app with each disease showing prevention/treatment mechanism in a List.
4. Creating a News RSS app with each category listed in its own fragment with a List of News headlines.

#### Project Structure

It's important to view th project structure to see how application is organized and which classes and layouts we create and use.

Below is one for this project.

![Android Project Structure](https://github.com/Oclemy/Tabbed-SQLite-ListView/raw/master/demos/project%20structure.PNG)

#### 1\. Create Android Project

Fire up your android studio and create an android project.

Android Studio is the defacto android development IDE supported by both Google and Jetbrains company.

#### 2\. Build.gradle

We are not using any third party library.

#### 3\. Our Java Classes

We'll now come and explore java classes. Android is just a mobile development framework and operating system and the real programming language used to write android apps is java, a very powerful programming language.

Here are our classes:

| No. | Class | Description |
| --- | --- | --- |
| 1. | `Spacecrafts.java` | Is our model class. Defines us one spacecraft's properties. |
| 2. | `InterStellar.java` | Our Inter-stellar spacecrafts fragment. Spacecrafts here will travel from one star to another within our galaxy. |
| 3. | `InterPlanetary.java` | Our inter-planetary spacecrafts fragment. Spacececrafts here will travel from one planet to the other within our solar system. |
| 4. | `InterGalactic.java` | Our inter-galactic spacecrafts fragment. The spacecrafts listed here will travel from one galaxy to another within the universe. |
| 5. | `MyPagerAdapter.java` | Our FragmentPagerAdapter class. Will hold our fragments to be used for paging fragments by the ViewPager. |
| 6. | `Constants.java` | Our sqlite database constants class. Will hold our database constants. |
| 7. | `DBHelper.java` | Our sqlite database helper class. Will create and upgrade our database tables. |
| 8. | `DBAdapter.java` | Our SQLite database adapter class. We will perform our SQLite CRUD right here. |
| 9. | `MainActivity.java` | Our main and launcher activity.Will be responsible for hosting our fragments as well as our input dialog. |

Let's look at these classes one by one in great detail.

#### (a). Spacecraft.java

This class will represent for us a single spacecraft.

We need to create a class that will define us the properties of each fragment. In this case our spacecraft will have only two properties:

1. Name - Name of our spacecraft.
2. Category - Category of our spacecraft.First create a java file in your android studio.

Then add the a package. You may use different package identifiers than me:

```java
package com.tutorials.hp.tabbedsqlitelistview.mModel;
```

We will then create a public class. _Public_ is an accessibility modifer used to denote that a class will be visible to other classes in other packages.

```java
public class Spacecraft {..}
```

Inside the Spacecraft class we will add two instance fields to represent our spacecraft's properties:

```java
    private String name,category;
```

We then create the getter and setter methods for our two instance fields. Remember the instance fields are private so we need to create public getter and setter methods to expose them:

```java
    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getCategory() {
        return category;
    }

    public void setCategory(String category) {
        this.category = category;
    }
```

We will also override the `toString()` method, returning the spacecraft name:

```java
@Override
    public String toString() {
        return name;
    }
}
```

Here's the full source code for our this class:

```java
package com.tutorials.hp.tabbedsqlitelistview.mModel;

public class Spacecraft {
    private String name,category;

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getCategory() {
        return category;
    }

    public void setCategory(String category) {
        this.category = category;
    }

    @Override
    public String toString() {
        return name;
    }
}
```

#### (b). InterPlanetary.java

This is our fragment class. We'll have two other fragment classes.

Fragments are subactivities introduced in Android 3.0 to allow for easy composition of modular UI units.

This class will show our inter-planetary spacecrafts in a ListView. This means that we need to define that ListView in this fragment and bind data to it from SQLite right here.

Fragments are subactivities hence deal with User Interface. They therefore have the capability to be inflated from XML Layouts.

Let's go.

Our next step is to actually create the class:

```java
public class InterPlanetary..{}
```

To turn into a Fragment we have to derive from Fragment class.

Now there are two variations of fragments you can use:

1. `android.app.Fragment` - Framework Fragment
2. `android.support.v4.app.Fragment` - Supports Library Fragment.

We'll use the later since it allows us support devices prior to Android 3.0 when the fragment was introduced. This is unlike the first Fragment.

```java
public class InterPlanetary extends Fragment {..}
```

So with that `InterPlanetary` class is already a Fragment. An empty one.

So we are going to give it some content.

A Fragment is a class like any other class, so let's define it's instance fields:

```java
    ListView lv;
    Button refreshBtn;
    ArrayAdapter<Spacecraft> adapter;
```

We define a ListView object, Button object and ArrayAdapter as instance fields.

Then we come and create a static factory method for generating us this Fragment's instance:

```java
    public static InterPlanetary newInstance() {
        return new InterPlanetary();
    }
```

We will now create a private method for loading data from the SQLite database,passing it into our ArrayAdapter instance thens setting the adapter to our ListView:

```java
    private void loadData()
    {
        DBAdapter db=new DBAdapter(getActivity());
        adapter=new ArrayAdapter<Spacecraft>(getActivity(),android.R.layout.simple_list_item_1,db.retrieveSpacecrafts(this.toString()));
        lv.setAdapter(adapter);
    }
```

Then a method to initialize our views:

```java
private void initializeViews(View rootView)
    {
        lv= (ListView) rootView.findViewById(R.id.interplanetary_LV);
        refreshBtn= (Button) rootView.findViewById(R.id.interplanetaryRefresh);

        refreshBtn.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View view) {
                loadData();
            }
        });
    }
```

First you can see we reference the ListView and refresh button. Then set the button onclick's method and invoking the `loadData()` method.

We'll also override the Fragment's `toString()` method:

```java
@Override
    public String toString() {
        return "InterPlanetary";
    }
```

We'll also override the Fragment's `onCreateView()` method:

```java
@Nullable
    @Override
    public View onCreateView(LayoutInflater inflater, ViewGroup container, Bundle savedInstanceState) {

        View rootView = inflater.inflate(R.layout.interplanetary, null);

        initializeViews(rootView);
        loadData();

        return rootView;
    }
```

You can see first we inflate the `R.layout.interplanetary` xml layout and returning it as our root view for the fragment. We return it after initializing our views via the `initializeViews()` method and loaded data from SQlite database via `loadData()` method.

Here's the complete source code for this class:

```java
public class InterPlanetary extends Fragment {

    ListView lv;
    Button refreshBtn;
    ArrayAdapter<Spacecraft> adapter;

    public static InterPlanetary newInstance() {
        return new InterPlanetary();
    }

    @Nullable
    @Override
    public View onCreateView(LayoutInflater inflater, ViewGroup container, Bundle savedInstanceState) {

        View rootView = inflater.inflate(R.layout.interplanetary, null);

        initializeViews(rootView);
        loadData();

        return rootView;
    }

    /*
    INITIALIZE VIEWS
     */
    private void initializeViews(View rootView)
    {
        lv= (ListView) rootView.findViewById(R.id.interplanetary_LV);
        refreshBtn= (Button) rootView.findViewById(R.id.interplanetaryRefresh);

        refreshBtn.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View view) {
                loadData();
            }
        });
    }

    /*
    LOAD DATA
     */
    private void loadData()
    {
        DBAdapter db=new DBAdapter(getActivity());
        adapter=new ArrayAdapter<Spacecraft>(getActivity(),android.R.layout.simple_list_item_1,db.retrieveSpacecrafts(this.toString()));
        lv.setAdapter(adapter);
    }

    @Override
    public String toString() {
        return "InterPlanetary";
    }
}
```

#### (c). InterStellar.java

This is our inter-setllar fragment.

It will be inflated from `R.layout.interstellar` layout. It will contain a ListView with inter-stellar spacecrafts from our SQLite database.

Create the class making it derive from `Fragment` class.

```java
public class InterStellar extends Fragment {..}
```

Then define our instance fields:

```java
    ListView lv;
    Button refreshBtn;
    ArrayAdapter<Spacecraft> adapter;
```

We will then define our factory method to return us an inter-stellar fragment instance:

```java
    public static InterStellar newInstance() {
        return new InterStellar();
    }
```

Then define a method to load us data from SQLite database via the `DBAdapter` class that we will define later and bind the data to ListView.

```java
    private void loadData()
    {
        DBAdapter db=new DBAdapter(getActivity());
        adapter=new ArrayAdapter<Spacecraft>(getActivity(),android.R.layout.simple_list_item_1,db.retrieveSpacecrafts(this.toString()));
        lv.setAdapter(adapter);

    }
```

Then initialize our ListView and Button and invoke the `loadData()` when the refresh button is clicked:

```java
    private void initializeViews(View rootView)
    {
        lv= (ListView) rootView.findViewById(R.id.interstellar_LV);
        refreshBtn= (Button) rootView.findViewById(R.id.interstellarRefresh);

        refreshBtn.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View view) {
                loadData();
            }
        });
    }
```

We will override the `toString()` method which is always available to all Objects.

```java
    @Override
    public String toString() {
        return "InterStellar";
    }
```

Lastly for this fragment we will ovveride the Fragment's `onCreateView()` which gets invoked when the Fragment's View is created:

```java
@Nullable
    @Override
    public View onCreateView(LayoutInflater inflater, ViewGroup container, Bundle savedInstanceState) {

        View rootView = inflater.inflate(R.layout.interstellar, null);

        initializeViews(rootView);
        loadData();

        return rootView;
    }
```

Here's the complete source code:

```java
public class InterStellar extends Fragment {

    ListView lv;
    Button refreshBtn;
    ArrayAdapter<Spacecraft> adapter;

    public static InterStellar newInstance() {
        return new InterStellar();
    }

    @Nullable
    @Override
    public View onCreateView(LayoutInflater inflater, ViewGroup container, Bundle savedInstanceState) {

        View rootView = inflater.inflate(R.layout.interstellar, null);

        initializeViews(rootView);
        loadData();

        return rootView;
    }

    /*
    INITIALIZE VIEWS
     */
    private void initializeViews(View rootView)
    {
        lv= (ListView) rootView.findViewById(R.id.interstellar_LV);
        refreshBtn= (Button) rootView.findViewById(R.id.interstellarRefresh);

        refreshBtn.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View view) {
                loadData();
            }
        });
    }
    /*
    LOAD DATA
     */
    private void loadData()
    {
        DBAdapter db=new DBAdapter(getActivity());
        adapter=new ArrayAdapter<Spacecraft>(getActivity(),android.R.layout.simple_list_item_1,db.retrieveSpacecrafts(this.toString()));
        lv.setAdapter(adapter);

    }

    @Override
    public String toString() {
        return "InterStellar";
    }

}
```

#### (d). InterGalactic.java

Our inter-galactic fragment. This Fragment will contain our inter-glactic spacecrafts rendered in a ListView.

We create our Fragment:

```java
public class InterGalactic extends Fragment {..}
```

Inside it we define our instance fields:

```java
    ListView lv;
    Button refreshBtn;
    ArrayAdapter<Spacecraft> adapter;
```

Then our factory method for generating this Fragment's instance:

```java
    public static InterGalactic newInstance()
    {
        return new InterGalactic();
    }
```

Our `loadData()` method to load data from SQLite database:

```java
    private void loadData()
    {
        DBAdapter db=new DBAdapter(getActivity());
        adapter=new ArrayAdapter<Spacecraft>(getActivity(),android.R.layout.simple_list_item_1,db.retrieveSpacecrafts("InterGalactic"));
        lv.setAdapter(adapter);

    }
```

Then initialize our views:

```java
    private void initializeViews(View rootView)
    {
        lv= (ListView) rootView.findViewById(R.id.intergalactic_LV);
        refreshBtn= (Button) rootView.findViewById(R.id.intergalacticRefresh);

        refreshBtn.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View view) {
                loadData();
            }
        });
    }
```

And override `toString()` method:

```java
    @Override
    public String toString() {
        return "InterGalactic";
    }
```

We will then override the `onCreateView()` method of this Fragment:

```java
    @Nullable
    @Override
    public View onCreateView(LayoutInflater inflater, ViewGroup container, Bundle savedInstanceState) {

        View rootView=inflater.inflate(R.layout.intergalactic,null);

        initializeViews(rootView);
        loadData();

        return rootView;
    }
```

Let's put this class all together:

```java

public class InterGalactic extends Fragment {

    ListView lv;
    Button refreshBtn;
    ArrayAdapter<Spacecraft> adapter;

    public static InterGalactic newInstance()
    {
        return new InterGalactic();
    }
    @Nullable
    @Override
    public View onCreateView(LayoutInflater inflater, ViewGroup container, Bundle savedInstanceState) {

        View rootView=inflater.inflate(R.layout.intergalactic,null);

        initializeViews(rootView);
        loadData();

        return rootView;
    }
    /*
    INITIALIZE VIEWS
     */
    private void initializeViews(View rootView)
    {
        lv= (ListView) rootView.findViewById(R.id.intergalactic_LV);
        refreshBtn= (Button) rootView.findViewById(R.id.intergalacticRefresh);

        refreshBtn.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View view) {
                loadData();
            }
        });
    }
    /*
    LOAD DATA
     */
    private void loadData()
    {
        DBAdapter db=new DBAdapter(getActivity());
        adapter=new ArrayAdapter<Spacecraft>(getActivity(),android.R.layout.simple_list_item_1,db.retrieveSpacecrafts("InterGalactic"));
        lv.setAdapter(adapter);

    }

    @Override
    public String toString() {
        return "InterGalactic";
    }
}
```

#### (e). Constants.java

This is our Database constants. This class will hold all our SQLite database constants.

These constants include:

1. Database Row/Record-ID Column.
2. Database Name Column.
3. Database Category Column

It's a public class:

```java
public class Constants {..}
```

inside a package:

```java
package com.tutorials.hp.tabbedsqlitelistview.mDB;
```

Inside it we specify the columns we'll have in our database table:

```java
    static final String ROW_ID="id";
    static final String NAME="name";
    static final String CATEGORY="category";
```

Then database properties like:

1. Database Name.
2. Table Name.
3. Table Version.

```java
    static final String DB_NAME="lv_DB";
    static final String TB_NAME="lv_TB";
    static final int DB_VERSION=1;
```

Then a String SQL statement constant to create for us our table in SQLite database:

```java
    static final String CREATE_TB="CREATE TABLE lv_TB(id INTEGER PRIMARY KEY AUTOINCREMENT,"
            + "name TEXT NOT NULL,category TEXT NOT NULL);";
```

Lastly a String to contain SQL statement to drop or delete our database table:

```java
    static final String DROP_TB="DROP TABLE IF EXISTS "+TB_NAME;
```

Here's the full source code for this class:

```java
public class Constants {
    /*
  COLUMNS
   */
    static final String ROW_ID="id";
    static final String NAME="name";
    static final String CATEGORY="category";

    /*
    DB PROPERTIES
     */
    static final String DB_NAME="lv_DB";
    static final String TB_NAME="lv_TB";
    static final int DB_VERSION=1;

    /*
    TABLE CREATION STATEMENT
     */
    static final String CREATE_TB="CREATE TABLE lv_TB(id INTEGER PRIMARY KEY AUTOINCREMENT,"
            + "name TEXT NOT NULL,category TEXT NOT NULL);";

    /*
    TABLE DELETION STMT
     */
    static final String DROP_TB="DROP TABLE IF EXISTS "+TB_NAME;

}
```

#### (f). DBHelper.java

Our SQLite Database Helper class.

This class will be be responsible for mainly creating our SQLite database table and upgrading it.

This class will derive from `SQLiteOpenHelper` clas defined in the `android.database.sqlite.` package.

We create our `DBHelper` class:

```java
public class DBHelper..{..}
```

and make it derive from SQLiteOpenHelper:

```java
public class DBHelper extends SQLiteOpenHelper {..}
```

We'll define our constructor that takes in a Context object.

```java
    public DBHelper(Context context) {
        super(context, Constants.DB_NAME, null, Constants.DB_VERSION);
    }
```

We'll override the `onCreate()` method of our SQLiteOpenHelper class passing in a SQLiteDatabase object:

```java
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
```

Inside the `onCreate()` as you can see we are creating our database table by invoking the `execSQL()` method of our SQLiteDatabase class.

Then we also override the `onUpgrade()` method, passing in three parameters:

1. SQLiteDatabase.
2. Two integers : Old table version and new table version.

```java
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
```

Here's the full source code for this class:

```java
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

#### (g). DBAdapter.java

This is our database adapter class.

The main role of this class is to:

1. Open database connection.
2. Insert/Save data to database.
3. Retrieve data from table.
4. Close database connection.

Then create our `DBAdapter` class:

```java
public class DBAdapter {..}
```

Define three instance fields: a Context object, a SQLiteDatabase object and a DBHelper object:

```java
    Context c;
    SQLiteDatabase db;
    DBHelper helper;
```

Our constructor will take a Context object and will pass it to DBHelper constructor while we are instantiating the `DBHelper` class:

```java
    public DBAdapter(Context c) {
        this.c = c;
        helper = new DBHelper(c);
    }
```

We'll define a public method that will attempt to save data to SQLite database returning a boolean based on the success of this operation.

```java
    public boolean saveSpacecraft(Spacecraft spacecraft) {
        try {
            db = helper.getWritableDatabase();

            ContentValues cv = new ContentValues();
            cv.put(Constants.NAME, spacecraft.getName());
            cv.put(Constants.CATEGORY, spacecraft.getCategory());

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
```

We'll also define a method to retrieve data from SQLite database and populate and return an arraylist.

```java
    public ArrayList<Spacecraft> retrieveSpacecrafts(String category) {
        ArrayList<Spacecraft> spacecrafts=new ArrayList<>();

        try {
            db = helper.getWritableDatabase();

           Cursor c=db.rawQuery("SELECT * FROM "+Constants.TB_NAME+" WHERE "+Constants.CATEGORY+" = '"+category+"'",null);

            Spacecraft s;
            spacecrafts.clear();

            while (c.moveToNext())
            {
                String s_name=c.getString(1);
                String s_category=c.getString(2);

                s=new Spacecraft();
                s.setName(s_name);
                s.setCategory(s_category);

                spacecrafts.add(s);
            }

        } catch (SQLException e) {
            e.printStackTrace();
        } finally {
            helper.close();
        }

        return spacecrafts;
    }
```

In the above two method we are catching SQLException.

Here's the full source code:

```java
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
            cv.put(Constants.CATEGORY, spacecraft.getCategory());

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
    public ArrayList<Spacecraft> retrieveSpacecrafts(String category) {
        ArrayList<Spacecraft> spacecrafts=new ArrayList<>();

        try {
            db = helper.getWritableDatabase();

           Cursor c=db.rawQuery("SELECT * FROM "+Constants.TB_NAME+" WHERE "+Constants.CATEGORY+" = '"+category+"'",null);

            Spacecraft s;
            spacecrafts.clear();

            while (c.moveToNext())
            {
                String s_name=c.getString(1);
                String s_category=c.getString(2);

                s=new Spacecraft();
                s.setName(s_name);
                s.setCategory(s_category);

                spacecrafts.add(s);
            }

        } catch (SQLException e) {
            e.printStackTrace();
        } finally {
            helper.close();
        }

        return spacecrafts;
    }

}
```

#### (h). MyPagerAdapter.java

This class will derive from `FragmentPagerAdapter` .

This class wil hold our fragments that will be paged via the ViewPager.

Then create a class:

```java
public class MyPagerAdapter..{}
```

Let's turn that class into our FragmentPagetAdapter by deriving from `FragmentPagerAdapter`:

```java
public class MyPagerAdapter extends FragmentPagerAdapter {..}
```

We'll define an instance field which is an arraylist instance. This field will hold all our fragments:

```java
    ArrayList<Fragment> pages=new ArrayList<>();
```

Then our `MyPagerAdapter` constructor:

```java
    public MyPagerAdapter(FragmentManager fm) {
        super(fm);
    }
```

We'll override the `getItem()` method to return a Fragment instance:

```java
    @Override
    public Fragment getItem(int position) {
        return pages.get(position);
    }
```

Then `getCount()` method to return the total number of Fragments:

```java
    @Override
    public int getCount() {
        return pages.size();
    }
```

Then `getPageTitle()` will return a CharSequence which represents the title of a single Fragment or page:

```java
    @Override
    public CharSequence getPageTitle(int position) {
        return pages.get(position).toString();
    }
```

Lastly the `addPage()` is our custom method to insert a Fragment or Page into our Fragments' collection:

```java
    public void addPage(Fragment f)
    {
        pages.add(f);
    }
```

Here's the full source code:

```java

public class MyPagerAdapter extends FragmentPagerAdapter {

    /*
    PAGES
     */
    ArrayList<Fragment> pages=new ArrayList<>();

    public MyPagerAdapter(FragmentManager fm) {
        super(fm);
    }

    @Override
    public Fragment getItem(int position) {
        return pages.get(position);
    }

    @Override
    public int getCount() {
        return pages.size();
    }

    @Override
    public CharSequence getPageTitle(int position) {
        return pages.get(position).toString();
    }

    public void addPage(Fragment f)
    {
        pages.add(f);
    }
}
```

#### (i). MainActivity.java

This is our MainActivity. Activity is an android component representing a screen with which the user can interact with.

In this case our Activity will be responsible for the following:

1. Host our Fragments, ViewPager and TabLayout.
2. Host our input dialog.

Our MainActivity will derive from AppCompatActivity:

```java
public class MainActivity extends AppCompatActivity..{..}
```

then implement `TabLayout.OnTabSelectedListener` interface:

```java
public class MainActivity extends AppCompatActivity implements TabLayout.OnTabSelectedListener {
```

We'll have several instance fields: TabLayout , ViewPager, integer current position, EditText, Button and Spinner:

```java
    private TabLayout tab;
    private ViewPager vp;
    int currentPos=0;

    EditText nameEditText;
    Button saveBtn;
    Spinner sp;
```

We'll fill our MyPagerAdapter with our Fragments by calling `addPage()` and generating a Fragment instance:

```java
    //FILL TAB PAGES
    private void addPages()
    {
        MyPagerAdapter myPagerAdapter=new MyPagerAdapter(getSupportFragmentManager());
        myPagerAdapter.addPage(InterPlanetary.newInstance());
        myPagerAdapter.addPage(InterStellar.newInstance());
        myPagerAdapter.addPage(InterGalactic.newInstance());

        vp.setAdapter(myPagerAdapter);
    }
```

We'll also override several `TabLayout.OnTabSelectedListener` interface methods. We set the current item to our ViewPager inside the `onTabSelected()` method.

```java
    @Override
    public void onTabSelected(TabLayout.Tab tab) {
        vp.setCurrentItem(currentPos=tab.getPosition());
    }

    @Override
    public void onTabUnselected(TabLayout.Tab tab) {

    }

    @Override
    public void onTabReselected(TabLayout.Tab tab) {

    }
```

We'll create a method to create and display our input dialog. Through this dialog users will save data to SQLite database:

```java
    private void displayDialog()
    {
        Dialog d=new Dialog(this);
        d.setTitle("SQLITE DATA");
        d.setContentView(R.layout.dialog_layout);

        //INITIALIZE VIEWS
        nameEditText= (EditText) d.findViewById(R.id.nameEditTxt);
        saveBtn= (Button) d.findViewById(R.id.saveBtn);
        sp = (Spinner) d.findViewById(R.id.category_SP);

        //SPINNER ADAPTER
        String[] categories = {InterPlanetary.newInstance().toString(),
                InterStellar.newInstance().toString(),
                InterGalactic.newInstance().toString()};
        sp.setAdapter(new ArrayAdapter<String>(this, android.R.layout.simple_list_item_1, categories));

        //SAVE
        saveBtn.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {

                Spacecraft s = new Spacecraft();
                s.setName(nameEditText.getText().toString());
                s.setCategory(sp.getSelectedItem().toString());

                if (new DBAdapter(MainActivity.this).saveSpacecraft(s)) {
                    nameEditText.setText("");
                    sp.setSelection(0);
                } else {
                    Toast.makeText(MainActivity.this, "Not Saved", Toast.LENGTH_SHORT).show();
                }
            }
        });

        //SHOW DIALOG
        d.show();

    }
```

Then we override our `onCreate()` method. Here we:

1. Reference our ViewPager from our xml layout.
2. Setup the toolbar.
3. Add Fragments to our MyPagerAdapter.
4. Reference TabLayout.
5. Set Tab Gravity to `TabLayout.GRAVITY_FILL`.
6. Setup our Tab with ViewPager.
7. Set Tab Listener to this Activity.

```java
    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);
        Toolbar toolbar = (Toolbar) findViewById(R.id.toolbar);
        setSupportActionBar(toolbar);

        //VIEWPAGER AND TABS
        vp = (ViewPager) findViewById(R.id.viewpager);
        addPages();

        //SETUP TAB
        tab = (TabLayout) findViewById(R.id.tabs);
        tab.setTabGravity(TabLayout.GRAVITY_FILL);
        tab.setupWithViewPager(vp);
        tab.addOnTabSelectedListener(this);
    }
```

#### 4\. Layouts

#### (a). activity_main.xml

Our MainActivity layout.

```xml
<?xml version="1.0" encoding="utf-8"?>
<android.support.design.widget.CoordinatorLayout

    android_layout_width="match_parent"
    android_layout_height="match_parent"
    android_fitsSystemWindows="true"
    tools_context="com.tutorials.hp.tabbedsqlitelistview.MainActivity">

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

        <android.support.design.widget.TabLayout
            android_id="@+id/tabs"
            android_layout_width="match_parent"
            android_layout_height="wrap_content"
            />

    </android.support.design.widget.AppBarLayout>

    <include layout="@layout/content_main" />

    <android.support.v4.view.ViewPager
        android_id="@+id/viewpager"
        android_layout_width="match_parent"
        android_layout_height="match_parent"
        app_layout_behavior="@string/appbar_scrolling_view_behavior"
        />

</android.support.design.widget.CoordinatorLayout>
```

#### (b). content_main.xml

This layout will get interpolated into our `activity_main.xml`:

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
    tools_context="com.tutorials.hp.tabbedsqlitelistview.MainActivity"
    tools_showIn="@layout/activity_main">

</RelativeLayout>
```

#### (c). dialog_layout.xml

This is our input dialog layout:

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

        <Spinner
            android_id="@+id/category_SP"
            android_layout_width="match_parent"
            android_layout_height="wrap_content">
        </Spinner>

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

#### (d). inteplanetary.xml

Our `InterPlanetary` Fragment layout:

```xml
<?xml version="1.0" encoding="utf-8"?>
<LinearLayout
    android_orientation="vertical" android_layout_width="match_parent"
    android_layout_height="match_parent"

    >
    <android.support.v7.widget.CardView
        android_orientation="horizontal" android_layout_width="match_parent"

        android_layout_margin="10dp"
        card_view_cardCornerRadius="10dp"
        card_view_cardElevation="10dp"
        android_layout_height="wrap_content">

        <LinearLayout
            android_orientation="vertical"
            android_layout_width="match_parent"
            android_layout_height="match_parent">

            <TextView
                android_layout_width="wrap_content"
                android_layout_height="wrap_content"
                android_textAppearance="?android:attr/textAppearanceLarge"
                android_text="INETR-PLANETARY"
                android_id="@+id/nameTxt"
                android_padding="10dp"
                android_textColor="@color/colorAccent"
                android_layout_alignParentLeft="true"
                />

            <ListView
                android_id="@+id/interplanetary_LV"
                android_layout_width="match_parent"
                android_layout_height="wrap_content"
                />

            <Button
                android_text="Refresh"
                android_id="@+id/interplanetaryRefresh"
                android_background="#009968"
                android_layout_width="wrap_content"
                android_layout_height="wrap_content" />
        </LinearLayout>
    </android.support.v7.widget.CardView>
</LinearLayout>
```

#### (e). interstellar.xml

Our `InterStellar` Fragment layout.

```xml
<?xml version="1.0" encoding="utf-8"?>
<LinearLayout
    android_orientation="vertical" android_layout_width="match_parent"
    android_layout_height="match_parent"
    >
    <android.support.v7.widget.CardView
        android_orientation="horizontal" android_layout_width="match_parent"

        android_layout_margin="10dp"
        card_view_cardCornerRadius="10dp"
        card_view_cardElevation="10dp"
        android_layout_height="wrap_content">

           <LinearLayout
               android_orientation="vertical"
               android_layout_width="match_parent"
               android_layout_height="match_parent">

                <TextView
                android_layout_width="wrap_content"
                android_layout_height="wrap_content"
                android_textAppearance="?android:attr/textAppearanceLarge"
                android_text="INTER-STELLAR"
                android_id="@+id/nameTxt"
                android_padding="10dp"
                android_textColor="@color/colorAccent"
                android_layout_alignParentLeft="true"
                />

            <ListView
                android_id="@+id/interstellar_LV"
                android_layout_width="match_parent"
                android_layout_height="wrap_content"
                 />

            <Button
                android_text="Refresh"
                android_id="@+id/interstellarRefresh"
                android_layout_width="wrap_content"
                android_background="#009968"
                android_layout_height="wrap_content" />

           </LinearLayout>
    </android.support.v7.widget.CardView>
</LinearLayout>
```

#### (f). intergalactic.xml

Our `InterGalactic` Fragment layout.

```xml
<?xml version="1.0" encoding="utf-8"?>
<LinearLayout
    android_orientation="vertical" android_layout_width="match_parent"
    android_layout_height="match_parent"
    >
    <android.support.v7.widget.CardView
        android_orientation="horizontal" android_layout_width="match_parent"

        android_layout_margin="10dp"
        card_view_cardCornerRadius="10dp"
        card_view_cardElevation="10dp"
        android_layout_height="wrap_content">

        <LinearLayout
            android_orientation="vertical"
            android_layout_width="match_parent"
            android_layout_height="match_parent">

            <TextView
                android_layout_width="wrap_content"
                android_layout_height="wrap_content"
                android_textAppearance="?android:attr/textAppearanceLarge"
                android_text="INTER-GALACTIC"
                android_id="@+id/nameTxt"
                android_padding="10dp"
                android_textColor="@color/colorAccent"
                android_layout_alignParentLeft="true"
                />

            <ListView
                android_id="@+id/intergalactic_LV"
                android_layout_width="match_parent"
                android_layout_height="wrap_content"
                />

            <Button
                android_text="Refresh"
                android_id="@+id/intergalacticRefresh"
                android_background="#009968"
                android_layout_width="wrap_content"
                android_layout_height="wrap_content" />
        </LinearLayout>
    </android.support.v7.widget.CardView>
</LinearLayout>
```

#### More Resources:

| Resource | Link |
| --- | --- |
| GitHub Browse | [Browse](https://github.com/Oclemy/Tabbed-SQLite-ListView) |
| GitHub Download Link | [Download](https://github.com/Oclemy/Tabbed-SQLite-ListView/archive/master.zip) |

> Proceed to the next page to view more examples.

## Example 5: Kotlin Android ViewPager Example

This is an example about AndroidX ViewPager in Kotlin Android. Learn ViewPager usage with fragments. We create an app with two pages that can be swiped.

### Step 1: Create Project

Start by creating an empty `Android Studio` project.

### Step 2: Dependencies

Add Kotlin stdlib library since we are using Kotlin:

```groovy
    implementation"org.jetbrains.kotlin:kotlin-stdlib-jdk7:$kotlin_version"
```

Also add the typical AppCompat and ConstraintLayout:

```kotlin
    implementation "androidx.appcompat:appcompat:$buildToolsVer"
    implementation "androidx.constraintlayout:constraintlayout:$constraintLayoutVersion"
```

### Step 3: Design Three Layouts

We will need two layouts for our two fragments or pages and our MainActivity layout:

**(a). fragment_page1.xml**

This will be inflated into the first page or first fragment:

```xml
<LinearLayout xmlns:android="http://schemas.android.com/apk/res/android"
    xmlns:tools="http://schemas.android.com/tools"
    android:layout_width="match_parent"
    android:layout_height="match_parent"
    android:orientation="vertical"
    tools:context="com.developers.viewpager.Page1">

    <TextView
        android:layout_width="wrap_content"
        android:layout_height="wrap_content"
        android:layout_gravity="center"
        android:layout_margin="5dp"
        android:text="@string/page_one_fragment"
        android:textColor="@android:color/black"
        android:textSize="18sp"
        android:textStyle="bold" />

</LinearLayout>
```

**(b). fragment_page2.xml**

Layout for the second fragment:

```xml
<FrameLayout xmlns:android="http://schemas.android.com/apk/res/android"
    xmlns:tools="http://schemas.android.com/tools"
    android:layout_width="match_parent"
    android:layout_height="match_parent"
    tools:context="com.developers.viewpager.Page2">

    <TextView
        android:layout_width="match_parent"
        android:layout_height="match_parent"
        android:text="@string/page_two_fragment"
        android:textColor="@android:color/black"
        android:textSize="18sp"
        android:layout_margin="5dp"
        android:textStyle="bold" />

</FrameLayout>
```

**(c). activity_main.xml**

This is the layout for the MainActivity. Simply add the AndroidX ViewPager here:

```xml
<?xml version="1.0" encoding="utf-8"?>
<LinearLayout xmlns:android="http://schemas.android.com/apk/res/android"
    xmlns:tools="http://schemas.android.com/tools"
    android:layout_width="match_parent"
    android:layout_height="match_parent"
    tools:context="com.developers.viewpager.MainActivity">

    <androidx.viewpager.widget.ViewPager
        android:id="@+id/view_pager"
        android:layout_width="match_parent"
        android:layout_height="match_parent" />

</LinearLayout>
```

### Step 4: Create Fragments

We have two fragments:

**(a). Page1.kt**

This is the code for the first Fragment:

```kotlin
import android.os.Bundle
import androidx.fragment.app.Fragment
import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup

class Page1 : Fragment() {

    override fun onCreateView(inflater: LayoutInflater, container: ViewGroup?,
                              savedInstanceState: Bundle?): View? {
        // Inflate the layout for this fragment
        return inflater.inflate(R.layout.fragment_page1, container, false)
    }

}// Required empty public constructor
```

**(b). Page2.kt**

This is the code for the second fragment:

```kotlin
import android.os.Bundle
import androidx.fragment.app.Fragment
import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup

class Page2 : Fragment() {

    override fun onCreateView(inflater: LayoutInflater, container: ViewGroup?,
                              savedInstanceState: Bundle?): View? {
        // Inflate the layout for this fragment
        return inflater.inflate(R.layout.fragment_page2, container, false)
    }

}// Required empty public constructor
```

### Step 5: Create FragmentPagerAdapter

First create a file known as `MyFragmentPagerAdapter.kt` and add the following imports:

```kotlin
import androidx.fragment.app.Fragment
import androidx.fragment.app.FragmentManager
import androidx.fragment.app.FragmentPagerAdapter
```

Extend the `FragmentPagerAdapter` and pass the `FragmentManager` via the constructor as well as to the constructor of the super class:

```kotlin
class MyFragmentPagerAdapter(fm: FragmentManager) : FragmentPagerAdapter(fm) {
```

Override the `getItem()` and return the appropriate page based on the position we are receiving in this function:

```kotlin
    override fun getItem(position: Int): Fragment {
        if (position == 0) {
            return Page1()
        } else{
            return Page2()
        }
    }
```

Override the `getCount()` and return the number of swipeable fragments or pages:

```kotlin
    override fun getCount(): Int {
        return 2
    }

}
```

Here is the full code:

**MyFragmentPagerAdapter.kt**

```kotlin
import androidx.fragment.app.Fragment
import androidx.fragment.app.FragmentManager
import androidx.fragment.app.FragmentPagerAdapter

class MyFragmentPagerAdapter(fm: FragmentManager) : FragmentPagerAdapter(fm) {

    override fun getItem(position: Int): Fragment {
        if (position == 0) {
            return Page1()
        } else{
            return Page2()
        }
    }

    override fun getCount(): Int {
        return 2
    }

}
```

### Step 6: Write MainActivity code

In your `onCreate()` instantiate our FragmentPagerAdapter class and pass in the `supportFragmentManager`:

```kotlin
 adapter = MyFragmentPagerAdapter(supportFragmentManager)
```

Then attach the `FragmentPagerAdapter` instance to our ViewPager:

```kotlin
        view_pager.adapter = adapter
```

Here is the full code:

**MainActivity.kt**

```kotlin
package com.developers.viewpager

import androidx.appcompat.app.AppCompatActivity
import android.os.Bundle
import kotlinx.android.synthetic.main.activity_main.*

class MainActivity : AppCompatActivity() {

    lateinit var adapter: MyFragmentPagerAdapter

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_main)
        adapter = MyFragmentPagerAdapter(supportFragmentManager)
        view_pager.adapter = adapter
    }
}
```

### Run

Copy the code or download it in the link below, build and run.

### Reference

Here are the reference links:

| Number | Link |
| --- | --- |
| 1. | [Download](https://downgit.github.io/#/home?url=https://github.com/amanjeetsingh150/kotlin-android-examples/tree/master/) Example |
| 2. | [Follow](https://github.com/amanjeetsingh150/) code author |
| 3. | Code: [Apache 2.0 License](http://www.apache.org/licenses/LICENSE-2.0.txt) |
