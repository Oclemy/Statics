# AHBottomNavigation Examples


_Android AHBottomNavigation Tutorial and Examples_

AHBottomNavigation is a library allowing us reproduce the behavior of the Bottom Navigation guidelines from Material Design. In this tutorial we want to examine this important library and how to use it in android.


#### What is Bottom Navigation?

Bottom Navigation is a type of navigation within applications implemented by BottomNavigationBars.

These bottom navigation bars make it easy to explore and switch between top-level views just within a single tap.

You just tap a bottom navigation icon and there you go directly to the associated view. If you are already in that view then it just gets refreshed.

Bottom navigation is mainly used on mobile devices as with desktops it's normally preferable to use side navigation.

#### We are Building a Vibrant YouTube Community

We have a fast rising YouTube Channel of friends. So far we've accumulated more than 2.6 million agreggate views and more than 10,000 subscribeers. Here's the Channel: [ProgrammingWizards TV](https://www.youtube.com/c/programmingwizards).

Please go ahead subscribe(free obviously) as well. If you have a question or a comment you can post there instead of in this site.People are suggesting us tutorials to do there so you can too.

#### When to use Bottom Navigation.

1. Three to Five top-level destinations. If your to-leve navigation has more than six destinations, then you can provide access to destinations not covered in the bottom navigation through alternative locations like NavigationDrawer.
2. Destinations requiring direct access.

More bottom navigation guidelines can be found at [Material.io](https://material.io/guidelines/components/bottom-navigation.html)

#### What is AHBottomNavigation?

AHBottomNavigation is a library to reproduce the behavior or Bottom navigation guidelines.

This library is open source and freely available [here](https://github.com/aurelhubert/ahbottomnavigation) in github.

#### Features of AHBottomNavigation

1. It does implement the material guidlines defined for bottom navigation.
2. It allows you to add 3-5 items( with title,color and icon).
3. Styles are choosable, classic or colored.
4. You can listen to `OnTabSelection` events so as to detect tab selection.
5. Supports icon font color.
6. You can manage notifications individually for bottom navigation items.
7. It allows you to enable or disable state.

#### How is AHBottomNavigation installed?

Well AHBottomNavigation can be installed into a project via Gradle:

You just add the implementation statement in your dependencies inside the app level build.gradle:

```groovy
implementation 'com.aurelhubert:ahbottomnavigation:2.1.0'
```

Please make sure to check the latest version [here](https://github.com/aurelhubert/ahbottomnavigation#how-to).

#### Which Layouts do we add?

It depends on the project template you chose in your android studio.

#### 1\. Empty Activity

This activity normally has one layout: `activity_main.xml`. Add this code:

```xml
<com.aurelhubert.ahbottomnavigation.AHBottomNavigation
        android_id="@+id/bottom_navigation"
        android_layout_width="match_parent"
        android_layout_height="wrap_content"/>
```

#### 2\. Basic Activity

If you chose the layout that has an appbar with a toolbar. It normally has two layoust: `activity_main.xml` and `content_main.xml`.

Inside the `activity_main.xml` add code in the following manner:

```xml
<android.support.design.widget.CoordinatorLayout

    android_layout_width="match_parent"
    android_layout_height="match_parent">

    ...

    <com.aurelhubert.ahbottomnavigation.AHBottomNavigation
        android_id="@+id/bottom_navigation"
        android_layout_width="match_parent"
        android_layout_height="wrap_content"
        android_layout_gravity="bottom" />

</android.support.design.widget.CoordinatorLayout>
```

#### Creating Items

Then inside you fragment or activity you can create navigation items:

```java
AHBottomNavigation bottomNavigation = (AHBottomNavigation) findViewById(R.id.bottom_navigation);

// Create items
AHBottomNavigationItem item1 = new AHBottomNavigationItem(R.string.tab_1, R.drawable.ic_maps_place, R.color.color_tab_1);
AHBottomNavigationItem item2 = new AHBottomNavigationItem(R.string.tab_2, R.drawable.ic_maps_local_bar, R.color.color_tab_2);
AHBottomNavigationItem item3 = new AHBottomNavigationItem(R.string.tab_3, R.drawable.ic_maps_local_restaurant, R.color.color_tab_3);

// Add items
bottomNavigation.addItem(item1);
bottomNavigation.addItem(item2);
bottomNavigation.addItem(item3);
```

You can listen to tab selection events:

```java
// Set listeners
bottomNavigation.setOnTabSelectedListener(new AHBottomNavigation.OnTabSelectedListener() {
    @Override
    public boolean onTabSelected(int position, boolean wasSelected) {
        // Do something cool here...
        return true;
    }
});
```

### AHBottomNavigation Full Examples

Here's a full example.

#### Simple AHBottomNavigation Tabs Example

```java
package info.camposha.ahbotttomnavigater;

import android.app.Activity;
import android.graphics.Color;
import android.os.Bundle;
import android.widget.Toast;
import android.widget.TextView;
import com.aurelhubert.ahbottomnavigation.AHBottomNavigation;
import com.aurelhubert.ahbottomnavigation.AHBottomNavigationItem;
/*
Our Main Activity
*/
public class MainActivity extends Activity {

    AHBottomNavigation bottomNavigation;
    TextView headerTxt;
    /*
    when activity is created
    */
    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);

        this.initializeViews();
        this.createNavigationItems();
    }
    /*
    Initialize views
    */
    private void initializeViews()
    {
        bottomNavigation=findViewById(R.id.bottom_navigation);
        headerTxt=findViewById(R.id.headerLabel);
    }
    /*
    Create AHNavigationItems
    */
    private void createNavigationItems()
    {
        // Create AHNavigationItems
        AHBottomNavigationItem item1 = new AHBottomNavigationItem(R.string.tab1, R.drawable.ic_maps_place, R.color.color_tab_1);
        AHBottomNavigationItem item2 = new AHBottomNavigationItem(R.string.tab2, R.drawable.ic_maps_local_bar, R.color.color_tab_2);
        AHBottomNavigationItem item3 = new AHBottomNavigationItem(R.string.tab3, R.drawable.ic_maps_local_restaurant, R.color.color_tab_3);

        // Add AHNavigationItems
        bottomNavigation.addItem(item1);
        bottomNavigation.addItem(item2);
        bottomNavigation.addItem(item3);

        // Set default background color for AHBottomNavigation
        bottomNavigation.setDefaultBackgroundColor(Color.parseColor("#FEFEFE"));

        // Change colors for AHBottomNavigation
        bottomNavigation.setAccentColor(Color.parseColor("#F63D2B"));
        bottomNavigation.setInactiveColor(Color.parseColor("#747474"));

       // Force to tint the drawable (useful for font with icon for example)
        bottomNavigation.setForceTint(true);

        // Manage titles for AHBottomNavigation
        //bottomNavigation.setTitleState(AHBottomNavigation.TitleState.SHOW_WHEN_ACTIVE);
        bottomNavigation.setTitleState(AHBottomNavigation.TitleState.ALWAYS_SHOW);
        //bottomNavigation.setTitleState(AHBottomNavigation.TitleState.ALWAYS_HIDE);

        // Use colored navigation with circle reveal effect
        bottomNavigation.setColored(true);

        // Set current item programmatically
       bottomNavigation.setCurrentItem(1);

        // set On TabSelectedListener
        bottomNavigation.setOnTabSelectedListener(new AHBottomNavigation.OnTabSelectedListener() {
            @Override
            public boolean onTabSelected(int position, boolean wasSelected) {
                switch (position) {
                    case 0:
                        headerTxt.setText("Planets");
                        break;
                    case 1:
                         headerTxt.setText("Stars");
                        break;
                    case 2:
                        headerTxt.setText("Galaxies");
                        break;
                    default:
                        break;
                }
                return true;
            }
        });
    }
}
```

![](https://camposha.info/wp-content/uploads/2019/04/demo1-25.gif)

* * *

### 2\. AHBottomNavigation - Bottom Tabs and Fragments

Hello friends,am sharing the source for a Android Bottom Navigation tutorial we did in our YouTube channel.The simple examples consists of three navigation items at the bottom section. You select a single item and it takes you to the corresponding fragment.

#### Bottom Navigation Bar

- They make it easy to explore and switch between top-level views with one single tap.
- You simply tap an icon and it takes you directly to the corresponding views.
- If it was the current view then it refreshes.
- They are primarily for mobile devices.
- They should be used with three to five top level destinations. As long as they require direct access.

For more details check the Google Material Design Specifications . In this tutorial we are using an example with the help of a third party library written by [Aurel Hubert](https://github.com/aurelhubert), [AHBottomNavigation](https://github.com/aurelhubert/ahbottomnavigation).

He describes the library as A library to reproduce the behavior of the Bottom Navigation guidelines from Material Design. Please for demo and step by setp ,you can have a look at our video tutorial we covered this here :  [http://www.youtube.com/watch?v=cOVwg3zitwg](http://www.youtube.com/watch?v=cOVwg3zitwg) Leave us a big like there.

#### SECTION 1 : Our MainActivity

- Reference AHBottomNavigation from our layout.
- Create navigation items using AHBottomNavigationItem class,passing in text and drawable to be shown.
- Implement OnTabSelectedListener Interface,hence overriding onTabSelected() method.
- Inside this method we check for the selected navigation item using the position passed to as as a parameter.
- We show appropriate Fragment.

```java
package com.tutorials.hp.bottomnav;

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

import com.aurelhubert.ahbottomnavigation.AHBottomNavigation;
import com.aurelhubert.ahbottomnavigation.AHBottomNavigationItem;
import com.tutorials.hp.bottomnav.mFragments.CrimeFragment;
import com.tutorials.hp.bottomnav.mFragments.DocumentaryFragment;
import com.tutorials.hp.bottomnav.mFragments.DramaFragment;

public class MainActivity extends AppCompatActivity implements AHBottomNavigation.OnTabSelectedListener{

   AHBottomNavigation bottomNavigation;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);
        Toolbar toolbar = (Toolbar) findViewById(R.id.toolbar);
        setSupportActionBar(toolbar);

        bottomNavigation= (AHBottomNavigation) findViewById(R.id.myBottomNavigation_ID);
        bottomNavigation.setOnTabSelectedListener(this);
        this.createNavItems();
    }

    private void createNavItems()
    {
        //CREATE ITEMS
        AHBottomNavigationItem crimeItem=new AHBottomNavigationItem("Crime",R.drawable.cr);
        AHBottomNavigationItem dramaItem=new AHBottomNavigationItem("Drama",R.drawable.ac);
        AHBottomNavigationItem docstem=new AHBottomNavigationItem("Crime",R.drawable.dr);

        //ADD THEM to bar
        bottomNavigation.addItem(crimeItem);
        bottomNavigation.addItem(dramaItem);
        bottomNavigation.addItem(docstem);

        //set properties
        bottomNavigation.setDefaultBackgroundColor(Color.parseColor("#FEFEFE"));

        //set current item
        bottomNavigation.setCurrentItem(0);

    }

    @Override
    public void onTabSelected(int position, boolean wasSelected) {
        //show fragment
        if (position==0)
        {
            CrimeFragment crimeFragment=new CrimeFragment();
            getSupportFragmentManager().beginTransaction().replace(R.id.content_id,crimeFragment).commit();
        }else  if (position==1)
        {
            DramaFragment dramaFragment=new DramaFragment();
            getSupportFragmentManager().beginTransaction().replace(R.id.content_id,dramaFragment).commit();
        }else  if (position==2)
        {
            DocumentaryFragment documentaryFragment=new DocumentaryFragment();
            getSupportFragmentManager().beginTransaction().replace(R.id.content_id,documentaryFragment).commit();
        }
    }
}
```

#### SECTION 2 : OUR FRAGMENTS

Fragments that shall be shown when our navigation items are clicked.

#### (a) Crime Fragment

- We inflate and show crime fragment when crime navigation item is clicked.

```java
package com.tutorials.hp.bottomnav.mFragments;

import android.os.Bundle;
import android.support.annotation.Nullable;
import android.support.v4.app.Fragment;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;

import com.tutorials.hp.bottomnav.R;

public class CrimeFragment extends Fragment {
    @Nullable
    @Override
    public View onCreateView(LayoutInflater inflater, ViewGroup container, Bundle savedInstanceState) {
        View rootView=inflater.inflate(R.layout.crime_fragment,container,false);

        return rootView;
    }
}
```

#### (b) Drama Fragment

- We inflate and show drama fragment when drama navigation item is clicked.

```java
package com.tutorials.hp.bottomnav.mFragments;

import android.os.Bundle;
import android.support.annotation.Nullable;
import android.support.v4.app.Fragment;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;

import com.tutorials.hp.bottomnav.R;

public class DramaFragment extends Fragment {
    @Nullable
    @Override
    public View onCreateView(LayoutInflater inflater, ViewGroup container, Bundle savedInstanceState) {

        View rootView=inflater.inflate(R.layout.drama_frgament,container,false);

        return rootView;
    }
}
```

#### (c) Documentary Fragment

- We inflate and show documentary fragment when documentary navigation item is clicked.

```java
package com.tutorials.hp.bottomnav.mFragments;

import android.os.Bundle;
import android.support.annotation.Nullable;
import android.support.v4.app.Fragment;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;

import com.tutorials.hp.bottomnav.R;

public class DocumentaryFragment extends Fragment {

    @Nullable
    @Override
    public View onCreateView(LayoutInflater inflater, ViewGroup container, Bundle savedInstanceState) {
        View rootView=inflater.inflate(R.layout.documentary_fragment,container,false);

        return rootView;
    }
}
```

#### SECTION 3 : OUR LAYOUTS

Add this to your ActivityMain.xml layout

```xml
<com.aurelhubert.ahbottomnavigation.AHBottomNavigation
        android_id="@+id/myBottomNavigation_ID"
        android_layout_width="match_parent"
        android_layout_height="wrap_content"
android_layout_gravity="bottom" />
```

#### (a) ActivityMain.xml

```xml
<?xml version="1.0" encoding="utf-8"?>
<android.support.design.widget.CoordinatorLayout

    android_layout_width="match_parent"
    android_layout_height="match_parent"
    android_fitsSystemWindows="true"
    tools_context="com.tutorials.hp.bottomnav.MainActivity">

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

    <com.aurelhubert.ahbottomnavigation.AHBottomNavigation
        android_id="@+id/myBottomNavigation_ID"
        android_layout_width="match_parent"
        android_layout_height="wrap_content"
        android_layout_gravity="bottom" />

</android.support.design.widget.CoordinatorLayout>
```

#### (b) ContentMain.xml

```xml
<?xml version="1.0" encoding="utf-8"?>
<RelativeLayout

    android_layout_width="match_parent"
    android_layout_height="match_parent"
    android_paddingBottom="@dimen/activity_vertical_margin"
    android_paddingLeft="2dp"
    android_paddingRight="2dp"
    android_paddingTop="2dp"
    app_layout_behavior="@string/appbar_scrolling_view_behavior"
    tools_context="com.tutorials.hp.bottomnav.MainActivity"
    android_id="@+id/content_id"
    tools_showIn="@layout/activity_main">

    <TextView
        android_layout_width="wrap_content"
        android_layout_height="wrap_content"
        android_text="Hello World!" />
</RelativeLayout>
```

#### (c) DramaFragment.xml

- Drama Fragment Layout

```xml
<?xml version="1.0" encoding="utf-8"?>
<LinearLayout
    android_orientation="vertical" android_layout_width="match_parent"
    android_background="#c36188"
    android_layout_height="match_parent">
    <TextView
        android_text="Drama"
        android_layout_width="wrap_content"
        android_layout_height="wrap_content" />

</LinearLayout>
```

#### (d) CrimeFragment.xml

- Crime Fragment Layout

```xml
<?xml version="1.0" encoding="utf-8"?>
<LinearLayout
    android_orientation="vertical" android_layout_width="match_parent"
    android_background="#009688"
    android_layout_height="match_parent">
    <TextView
        android_text="Crime"
        android_layout_width="wrap_content"
        android_layout_height="wrap_content" />

</LinearLayout>
```

#### (e) DocumentaryFragment.xml

- Documentary Fragment Layout.

```xml
<?xml version="1.0" encoding="utf-8"?>
<LinearLayout
    android_orientation="vertical" android_layout_width="match_parent"
    android_background="#2f9bc1"
    android_layout_height="match_parent">
    <TextView
        android_text="Documentary"
        android_layout_width="wrap_content"
        android_layout_height="wrap_content" />

</LinearLayout></pre>
```

Otherwise just design your layouts as you wish. Or check the complete source above.

![AHBottom Navigation Bar](https://camposha.info/wp-content/uploads/2019/04/bottom_navigation_fragments.gif)

AHBottom Navigation Bar

### Download

[sociallocker id="8131"]

[Download code](https://github.com/Oclemy/BottomNav/archive/master.zip)

[/sociallocker]

### 3\. Android AHBottomNavigation Bar - Tabs with GridViews

In this tutorial we switch through various tabs in our AHBottottomNavigation. Each Tab will show a GridView with different set of data.

AHBottom Navigation Bar ListViewAHBottomNavigationBar allows us to implement material design bottom navigation features in an easy manner.

A GridView on the other hand allows us display items in a scrollable 2 dimensional manner.

Our data will exist in different categories and the users will be able to switch through that data via the AHBottomNavigation Tabs.

These tabs will have icons and text and different colors.

#### 1\. Build.gradle

We'll need to fetch AHBottomNavigation via gradle so add the following in your app level build.gradle under dependencies closure.

```java
implementation 'com.aurelhubert:ahbottomnavigation:2.1.0'
```

#### 2\. Colors.xml

We'll use some colors in our tabs so lets define them in colors.xml

```xml
<?xml version="1.0" encoding="utf-8"?>
<resources>
    <color name="colorPrimary">#3F51B5</color>
    <color name="colorPrimaryDark">#303F9F</color>
    <color name="colorAccent">#FF4081</color>

    <color name="color_tab_1">#455C65</color>
    <color name="color_tab_2">#00886A</color>
    <color name="color_tab_3">#8B6B62</color>
    <color name="color_tab_4">#6C4A42</color>
    <color name="color_tab_5">#F63D2B</color>
</resources>
```

#### 3\. strings.xml

We'll have our bottom navigation items or tabs titles in strings.xml resource file.

```xml
<resources>
    <string name="app_name">AHBottomNavigation GridView</string>
    <string name="tab1">Planets</string>
    <string name="tab2">Stars</string>
    <string name="tab3">Galaxies</string>
</resources>
```

#### 4\. activity_main.xml

We add our ahbottomnavigation and align it to the bottom of the screen. On top of it we add a GridView.

```xml
<?xml version="1.0" encoding="utf-8"?>
<RelativeLayout

    android_layout_width="match_parent"
    android_layout_height="match_parent"
    tools_context="info.camposha.ahbottomnavigationgridview.MainActivity">

    <TextView
        android_id="@+id/headerLabel"
        android_layout_width="wrap_content"
        android_layout_height="wrap_content"
        android_layout_alignParentTop="true"
        android_layout_centerHorizontal="true"
        android_fontFamily="casual"
        android_text="Cosmic Bodies"
        android_textAllCaps="true"
        android_textSize="24sp"
        android_textStyle="bold" />
    <GridView
        android_id="@+id/myGridview"

        android_padding="5dp"
        android_layout_below="@id/headerLabel"
        android_numColumns="auto_fit"
        android_layout_width="match_parent"
        android_layout_height="wrap_content" />

    <com.aurelhubert.ahbottomnavigation.AHBottomNavigation
        android_id="@+id/bottom_navigation"
        android_layout_width="match_parent"
        android_layout_height="wrap_content"
        android_layout_alignParentBottom="true"/>

</RelativeLayout>
```

#### 5\. MainActivity.java

Here's our main activity code.

```java
package info.camposha.ahbottomnavigationgridview;

import android.app.Activity;
import android.graphics.Color;
import android.os.Bundle;
import android.view.View;
import android.widget.AdapterView;
import android.widget.ArrayAdapter;
import android.widget.GridView;
import android.widget.TextView;
import android.widget.Toast;

import com.aurelhubert.ahbottomnavigation.AHBottomNavigation;
import com.aurelhubert.ahbottomnavigation.AHBottomNavigationItem;

import java.util.ArrayList;

public class MainActivity extends Activity {

    /*
    Instance Fields
     */
    AHBottomNavigation bottomNavigation;
    TextView headerTxt;
    GridView myGridView;
    ArrayAdapter<String> adapter;
    private int cosmicCategory = 0;

    /*
    when activity is created, setContentView, initializeViews and create navigationitems
    */
    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);

        this.initializeViews();
        this.createNavigationItems();
    }
    /*
    Initialize AHBottomNavigation, TextView and Spinner
    */
    private void initializeViews()
    {
        bottomNavigation=findViewById(R.id.bottom_navigation);
        headerTxt=findViewById(R.id.headerLabel);
        myGridView=findViewById(R.id.myGridview);

        //gridview item selection events
        myGridView.setOnItemClickListener(new AdapterView.OnItemClickListener() {
            @Override
            public void onItemClick(AdapterView<?> adapterView, View view, int position, long id) {
                Toast.makeText(MainActivity.this, getCosmicBodies().get(position), Toast.LENGTH_SHORT).show();
            }
        });

    }
    /*
    Bind data to spinner using an ArrayAdapter
     */
    private void bindData()
    {
        adapter= new ArrayAdapter<>(this, android.R.layout.simple_list_item_1, getCosmicBodies());
        myGridView.setAdapter(adapter);
    }
    /*
    Populate an arraylist that will act as our data source.
     */
    private ArrayList<String> getCosmicBodies()
    {
        ArrayList<String> data=new ArrayList<>();
        data.clear();
        switch (cosmicCategory) {
            case 0:
                headerTxt.setText("Planets");
                data.add("Mercury");
                data.add("Venus");
                data.add("Earth");
                data.add("Mars");
                data.add("Jupiter");
                data.add("Saturn");
                data.add("Uranus");
                data.add("Neptune");
                break;
            case 1:
                headerTxt.setText("Stars");
                data.add("VY Canis Majos");
                data.add("UY Scuti");
                data.add("Beattleguse");
                data.add("Aldebaran");
                data.add("Epsilon Canis Majos");
                data.add("Dhube");
                data.add("Sun");
                data.add("Alpha Centauri");
                break;
            case 2:
                headerTxt.setText("Galaxies");
                data.add("IC 1011");
                data.add("Andromeda");
                data.add("Large Magellonic Cloud");
                data.add("Centaurus A");
                data.add("StarBust");
                data.add("Whirlpool");
                data.add("Cartwheel");
                data.add("Sombrero");
                break;
            default:
                break;

        }
        return data;
    }
    /*
    Create AHBottonNavigationItems, add them to BottomNavigation, setBackgroundColor, Listen to tab events
    */
    private void createNavigationItems()
    {
        // Create AHNavigationItems
        AHBottomNavigationItem item1 = new AHBottomNavigationItem(R.string.tab1, R.drawable.ic_maps_place, R.color.color_tab_1);
        AHBottomNavigationItem item2 = new AHBottomNavigationItem(R.string.tab2, R.drawable.ic_maps_local_bar, R.color.color_tab_2);
        AHBottomNavigationItem item3 = new AHBottomNavigationItem(R.string.tab3, R.drawable.ic_maps_local_restaurant, R.color.color_tab_3);

        // Add AHNavigationItems
        bottomNavigation.addItem(item1);
        bottomNavigation.addItem(item2);
        bottomNavigation.addItem(item3);

        // Set default background color for AHBottomNavigation
        bottomNavigation.setDefaultBackgroundColor(Color.parseColor("#FEFEFE"));

        // Change colors for AHBottomNavigation
        bottomNavigation.setAccentColor(Color.parseColor("#F63D2B"));
        bottomNavigation.setInactiveColor(Color.parseColor("#747474"));

        // Force to tint the drawable (useful for font with icon for example)
        bottomNavigation.setForceTint(true);

        // Manage titles for AHBottomNavigation
        //bottomNavigation.setTitleState(AHBottomNavigation.TitleState.SHOW_WHEN_ACTIVE);
        bottomNavigation.setTitleState(AHBottomNavigation.TitleState.ALWAYS_SHOW);
        //bottomNavigation.setTitleState(AHBottomNavigation.TitleState.ALWAYS_HIDE);

        // Use colored navigation with circle reveal effect
        bottomNavigation.setColored(true);

        // Set current item programmatically
        bottomNavigation.setCurrentItem(0);
    bindData();

        // set On TabSelectedListener
        bottomNavigation.setOnTabSelectedListener(new AHBottomNavigation.OnTabSelectedListener() {
            @Override
            public boolean onTabSelected(int position, boolean wasSelected) {
                cosmicCategory = position;
                bindData();
                return true;
            }
        });
    }
}
```

#### Result

* * *

### 4\. Android Java AHBottomNavigationBar - Tabs with ListView

In this tutorial we want to see how to switch through data in ListViews via BottomNavigationItems.

We specifically use AHBottomNavigation library to create flexible tabs that are awesome and easy to customize and work with.

When user clicks a Tab or BottomNavigation Item we show different set of category of data in ListView.

Here this tutorial in video version:

#### Project Structure

Kotlin Bottom NavigationBar ListView

#### Build.gradle

Our app level build.gradle.

We add AHBottomNavigation implementation statement:

```groovy
dependencies {
    implementation fileTree(dir: 'libs', include: ['*.jar'])
    testImplementation 'junit:junit:4.12'
    implementation 'com.aurelhubert:ahbottomnavigation:2.1.0'
}
```

#### activity_main.xml

Our xml layout. It will contain a ListView and AHBottomNavigation xml view at the bottom of our layout.

First we specify a RelativeLayout as our root tag.

The add a textview as our header label. We will be switching the data in this TextView as the selected tab changes.

We also add a ListView, which will render a given category that is selected in our bottom navigation tabs.

Lastly we will add the `AHBottomNavigation` element and align it to the bottom of the parent. In this case the parent is the RelativeLayout.

```xml
<?xml version="1.0" encoding="utf-8"?>
<RelativeLayout

    android_layout_width="match_parent"
    android_layout_height="match_parent"
    tools_context="info.camposha.javabottomnavigationlistview.MainActivity">

    <TextView
        android_id="@+id/headerLabel"
        android_layout_width="wrap_content"
        android_layout_height="wrap_content"
        android_layout_alignParentTop="true"
        android_layout_centerHorizontal="true"
        android_fontFamily="casual"
        android_text="Cosmic Bodies"
        android_textAllCaps="true"
        android_textSize="24sp"
        android_textStyle="bold" />
    <ListView
        android_id="@+id/myListView"
        android_padding="5dp"
        android_layout_below="@id/headerLabel"
        android_layout_width="match_parent"
        android_layout_height="wrap_content" />

    <com.aurelhubert.ahbottomnavigation.AHBottomNavigation
        android_id="@+id/bottom_navigation"
        android_layout_width="match_parent"
        android_layout_height="wrap_content"
        android_layout_alignParentBottom="true"/>
</RelativeLayout>
```

#### strings.xml

In the `strings.xml` resource, under the resource specify our three bottom navigation items or tabs add the following:

```xml
<resources>
    ....
    <string name="tab1">Planets</string>
    <string name="tab2">Stars</string>
    <string name="tab3">Galaxies</string>
    ....
</resources>
```

Those strings will represent our bottom navigation tab titles.Placing them in strings.xml allows us for their easy translation to other languages as well.

#### colors.xml

We also need some custom colors so add the below colors under the resource in your `colors.xml`:

```xml
<resources>
    ....
    <color name="color_tab_1">#455C65</color>
    <color name="color_tab_2">#00886A</color>
    <color name="color_tab_3">#8B6B62</color>
    <color name="color_tab_4">#6C4A42</color>
    <color name="color_tab_5">#F63D2B</color>
    ....
</resources>
```

These colors will be used to color our bottom navigation tabs.

#### MainActivity.java

Our main and only activity. Our launcher activity as well.

#### 1\. Specify Imports

We specify the package name then add our imports:

```java
package info.camposha.javabottomnavigationlistview;

import android.app.Activity;
import android.graphics.Color;
import android.os.Bundle;
import android.view.View;
import android.widget.AdapterView;
import android.widget.ArrayAdapter;
import android.widget.ListView;
import android.widget.TextView;
import android.widget.Toast;

import com.aurelhubert.ahbottomnavigation.AHBottomNavigation;
import com.aurelhubert.ahbottomnavigation.AHBottomNavigationItem;

import java.util.ArrayList;
```

Among our imports include our adapterview `ListView`, our adapter `ArrayAdapter`, our `AHBottomNavigation` which represents our bottom navigation bar, then our `AHBottomNavigationItem` which represents our bottom navigation tab.

#### 2\. Create our Class

The class is MainActivity and inherits from `android.app.Activity`, and has probably been added to you by android studio.

```java
public class MainActivity extends Activity {..}
```

#### 3\. Define Instance Fields

These instance fields include AHBottomNavigation, a TextView, a ListView, an ArrayAdapter and an integer that reprsents a cosmicCategory:

```java
    AHBottomNavigation bottomNavigation;
    TextView headerTxt;
    ListView myListView;
    ArrayAdapter<String> adapter;
    private int cosmicCategory = 0;
```

#### 4\. Define and Return a Given Category Data

Our data in this case is cosmic bodies. We will be swicthing through various categories and populating an arraylist based on the current category.

That arraylist will later be used to populate a ListView via an adapter.

```java
    private ArrayList<String> getCosmicBodies()
    {
        ArrayList<String> data=new ArrayList<>();
        data.clear();
        switch (cosmicCategory) {
            case 0:
                headerTxt.setText("Planets");
                data.add("Mercury");
                data.add("Venus");
                data.add("Earth");
                data.add("Mars");
                data.add("Jupiter");
                data.add("Saturn");
                data.add("Uranus");
                data.add("Neptune");
                break;
            case 1:
                headerTxt.setText("Stars");
                data.add("VY Canis Majos");
                data.add("UY Scuti");
                data.add("Beattleguse");
                data.add("Aldebaran");
                data.add("Epsilon Canis Majos");
                data.add("Dhube");
                data.add("Sun");
                data.add("Alpha Centauri");
                break;
            case 2:
                headerTxt.setText("Galaxies");
                data.add("IC 1011");
                data.add("Andromeda");
                data.add("Large Magellonic Cloud");
                data.add("Centaurus A");
                data.add("StarBust");
                data.add("Whirlpool");
                data.add("Cartwheel");
                data.add("Sombrero");
                break;
            default:
                break;

        }
        return data;
    }
```

#### 5\. Bind Data

First we instantiate an ArrayAdapter, which is our adapter. Then we set it to our ListView via the `setAdapter()` method.

```java
    private void bindData()
    {
        adapter= new ArrayAdapter<>(this, android.R.layout.simple_list_item_1, getCosmicBodies());
        myListView.setAdapter(adapter);
    }
```

#### 6\. Create BottonNavigation Items

We instantiate them passing in the tab title reference from the `strings.xml`, then the drawable image resource and color resource as well. In this case our bottom navigation tabs will show titles, drawable images and also have custom colors.

```java
        AHBottomNavigationItem item1 = new AHBottomNavigationItem(R.string.tab1, R.drawable.ic_maps_place, R.color.color_tab_1);
        AHBottomNavigationItem item2 = new AHBottomNavigationItem(R.string.tab2, R.drawable.ic_maps_local_bar, R.color.color_tab_2);
        AHBottomNavigationItem item3 = new AHBottomNavigationItem(R.string.tab3, R.drawable.ic_maps_local_restaurant, R.color.color_tab_3);
```

#### 7\. Add BottomNavigation Items

We add our bottom navigation items to our bottomNavigation bar.

```java
        bottomNavigation.addItem(item1);
        bottomNavigation.addItem(item2);
        bottomNavigation.addItem(item3);
```

#### Listen to Bottom Navigation Tab Selection events

When a bottom navigation item or tab is selected, we will assign the value of the position of that tab as our category.

Then we bind the data via the `bindData()` method.

```java
        bottomNavigation.setOnTabSelectedListener(new AHBottomNavigation.OnTabSelectedListener() {
            @Override
            public boolean onTabSelected(int position, boolean wasSelected) {
                cosmicCategory = position;
                bindData();
                return true;
            }
        });
```

Here's the full code.

#### Full Code

Our main activity java code:

```java
package info.camposha.javabottomnavigationlistview;

import android.app.Activity;
import android.graphics.Color;
import android.os.Bundle;
import android.view.View;
import android.widget.AdapterView;
import android.widget.ArrayAdapter;
import android.widget.ListView;
import android.widget.TextView;
import android.widget.Toast;

import com.aurelhubert.ahbottomnavigation.AHBottomNavigation;
import com.aurelhubert.ahbottomnavigation.AHBottomNavigationItem;

import java.util.ArrayList;

public class MainActivity extends Activity {

    /*
    Instance Fields
     */
    AHBottomNavigation bottomNavigation;
    TextView headerTxt;
    ListView myListView;
    ArrayAdapter<String> adapter;
    private int cosmicCategory = 0;

    /*
    when activity is created, setContentView, initializeViews and create navigationitems
    */
    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);

        this.initializeViews();
        this.createNavigationItems();
    }
    /*
    Initialize AHBottomNavigation, TextView and Spinner
    */
    private void initializeViews()
    {
        bottomNavigation=findViewById(R.id.bottom_navigation);
        headerTxt=findViewById(R.id.headerLabel);
        myListView=findViewById(R.id.myListView);

        //gridview item selection events
        myListView.setOnItemClickListener(new AdapterView.OnItemClickListener() {
            @Override
            public void onItemClick(AdapterView<?> adapterView, View view, int position, long id) {
                Toast.makeText(MainActivity.this, getCosmicBodies().get(position), Toast.LENGTH_SHORT).show();
            }
        });

    }
    /*
    Bind data to spinner using an ArrayAdapter
     */
    private void bindData()
    {
        adapter= new ArrayAdapter<>(this, android.R.layout.simple_list_item_1, getCosmicBodies());
        myListView.setAdapter(adapter);
    }
    /*
    Populate an arraylist that will act as our data source.
     */
    private ArrayList<String> getCosmicBodies()
    {
        ArrayList<String> data=new ArrayList<>();
        data.clear();
        switch (cosmicCategory) {
            case 0:
                headerTxt.setText("Planets");
                data.add("Mercury");
                data.add("Venus");
                data.add("Earth");
                data.add("Mars");
                data.add("Jupiter");
                data.add("Saturn");
                data.add("Uranus");
                data.add("Neptune");
                break;
            case 1:
                headerTxt.setText("Stars");
                data.add("VY Canis Majos");
                data.add("UY Scuti");
                data.add("Beattleguse");
                data.add("Aldebaran");
                data.add("Epsilon Canis Majos");
                data.add("Dhube");
                data.add("Sun");
                data.add("Alpha Centauri");
                break;
            case 2:
                headerTxt.setText("Galaxies");
                data.add("IC 1011");
                data.add("Andromeda");
                data.add("Large Magellonic Cloud");
                data.add("Centaurus A");
                data.add("StarBust");
                data.add("Whirlpool");
                data.add("Cartwheel");
                data.add("Sombrero");
                break;
            default:
                break;

        }
        return data;
    }
    /*
    Create AHBottonNavigationItems, add them to BottomNavigation, setBackgroundColor, Listen to tab events
    */
    private void createNavigationItems()
    {
        // Create AHNavigationItems
        AHBottomNavigationItem item1 = new AHBottomNavigationItem(R.string.tab1, R.drawable.ic_maps_place, R.color.color_tab_1);
        AHBottomNavigationItem item2 = new AHBottomNavigationItem(R.string.tab2, R.drawable.ic_maps_local_bar, R.color.color_tab_2);
        AHBottomNavigationItem item3 = new AHBottomNavigationItem(R.string.tab3, R.drawable.ic_maps_local_restaurant, R.color.color_tab_3);

        // Add AHNavigationItems
        bottomNavigation.addItem(item1);
        bottomNavigation.addItem(item2);
        bottomNavigation.addItem(item3);

        // Set default background color for AHBottomNavigation
        bottomNavigation.setDefaultBackgroundColor(Color.parseColor("#FEFEFE"));

        // Change colors for AHBottomNavigation
        bottomNavigation.setAccentColor(Color.parseColor("#F63D2B"));
        bottomNavigation.setInactiveColor(Color.parseColor("#747474"));

        // Force to tint the drawable (useful for font with icon for example)
        bottomNavigation.setForceTint(true);

        // Manage titles for AHBottomNavigation
        //bottomNavigation.setTitleState(AHBottomNavigation.TitleState.SHOW_WHEN_ACTIVE);
        bottomNavigation.setTitleState(AHBottomNavigation.TitleState.ALWAYS_SHOW);
        //bottomNavigation.setTitleState(AHBottomNavigation.TitleState.ALWAYS_HIDE);

        // Use colored navigation with circle reveal effect
        bottomNavigation.setColored(true);

        // Set current item programmatically
        bottomNavigation.setCurrentItem(0);
        bindData();

        // set On TabSelectedListener
        bottomNavigation.setOnTabSelectedListener(new AHBottomNavigation.OnTabSelectedListener() {
            @Override
            public boolean onTabSelected(int position, boolean wasSelected) {
                cosmicCategory = position;
                bindData();
                return true;
            }
        });
    }
}
```

![](https://camposha.info/wp-content/uploads/2019/04/demo1-24.png)

## Kotlin Android BottomNavigation – Tabs with ListViews

In this class we will look at the BottomNavigation and how to implement it using the AHBottomNavigation libray by Aurel Herbert. We want to look at it in Kotlin programming language.

Basically we will be switching through listviews with different categories depending on the tab that is clicked. We have three tabs:

- Planets tab
- Stars Tab
- Galaxies tab.

Switching any tabs basically binds some static data to the ListView. We are not using any fragments as we can achieve this type of categorization app without them.

Let's start.

#### Project Structure

![](https://camposha.info/wp-content/uploads/2019/04/project_structure-1.png)

#### build.gradle

App level build.gradle. We add the AHBottomNavigation as a dependency:

```groovy
dependencies {
    implementation fileTree(dir: 'libs', include: ['*.jar'])
    implementation"org.jetbrains.kotlin:kotlin-stdlib-jre7:$kotlin_version"
    testImplementation 'junit:junit:4.12'
    implementation 'com.aurelhubert:ahbottomnavigation:2.1.0'
}
```

#### strings.xml

We need the tabs names held in a strings.xml. However you can hardcode them if you like but it's better having them in a `strings.xml` file for translation purposes.

```xml
<resources>
    ...
    <string name="tab1">Planets</string>
    <string name="tab2">Stars</string>
    <string name="tab3">Galaxies</string>
    ...
</resources>
```

#### colors.xml

We will use some custom colors, so add these in your`colors.xml`:

```xml
<?xml version="1.0" encoding="utf-8"?>
<resources>
    ...
    <color name="color_tab_1">#455C65</color>
    <color name="color_tab_2">#00886A</color>
    <color name="color_tab_3">#8B6B62</color>
    <color name="color_tab_4">#6C4A42</color>
    <color name="color_tab_5">#F63D2B</color>
    ...
</resources>
```

#### activity_main.xml

Our Main activity layout. We will add a ListView and our AHBottomNavigation here.

We place the bottomnavigation at the bottom of our layout.

```xml
<?xml version="1.0" encoding="utf-8"?>
<RelativeLayout xmlns:android="http://schemas.android.com/apk/res/android"
    xmlns:app="http://schemas.android.com/apk/res-auto"
    xmlns:tools="http://schemas.android.com/tools"
    android:layout_width="match_parent"
    android:layout_height="match_parent"
    tools:context="info.camposha.ahbottomnavigationlistview.MainActivity">

    <TextView
        android:id="@+id/headerLabel"
        android:layout_width="wrap_content"
        android:layout_height="wrap_content"
        android:layout_alignParentTop="true"
        android:layout_centerHorizontal="true"
        android:fontFamily="casual"
        android:text="Cosmic Bodies"
        android:textAllCaps="true"
        android:textSize="24sp"
        android:textStyle="bold" />
    <ListView
        android:id="@+id/myListView"
        android:padding="5dp"
        android:layout_below="@id/headerLabel"
        android:layout_width="match_parent"
        android:layout_height="wrap_content" />

    <com.aurelhubert.ahbottomnavigation.AHBottomNavigation
        android:id="@+id/bottom_navigation"
        android:layout_width="match_parent"
        android:layout_height="wrap_content"
        android:layout_alignParentBottom="true"/>

</RelativeLayout>
```

#### MainActivity.kt

Our MainActivity Kotlin class. This is the only class we are working with.

```kotlin
package info.camposha.ahbottomnavigationlistview

import android.app.Activity
import android.graphics.Color
import android.os.Bundle
import android.widget.*

import com.aurelhubert.ahbottomnavigation.AHBottomNavigation
import com.aurelhubert.ahbottomnavigation.AHBottomNavigationItem

import java.util.ArrayList

class MainActivity : Activity() {

    /*
    Instance Fields
     */
    internal lateinit var bottomNavigation: AHBottomNavigation
    internal lateinit var headerTxt: TextView
    internal lateinit var myListView: ListView
    internal lateinit var adapter: ArrayAdapter<String>
    private var cosmicCategory = 0
    /*
    Populate an arraylist that will act as our data source.
     */
    private val cosmicBodies: ArrayList<String>
        get() {
            val data = ArrayList<String>()
            data.clear()
            when (cosmicCategory) {
                0 -> {
                    headerTxt.text = "Planets"
                    data.add("Mercury")
                    data.add("Venus")
                    data.add("Earth")
                    data.add("Mars")
                    data.add("Jupiter")
                    data.add("Saturn")
                    data.add("Uranus")
                    data.add("Neptune")
                }
                1 -> {
                    headerTxt.text = "Stars"
                    data.add("VY Canis Majos")
                    data.add("UY Scuti")
                    data.add("Beattleguse")
                    data.add("Aldebaran")
                    data.add("Epsilon Canis Majos")
                    data.add("Dhube")
                    data.add("Sun")
                    data.add("Alpha Centauri")
                }
                2 -> {
                    headerTxt.text = "Galaxies"
                    data.add("IC 1011")
                    data.add("Andromeda")
                    data.add("Large Magellonic Cloud")
                    data.add("Centaurus A")
                    data.add("StarBust")
                    data.add("Whirlpool")
                    data.add("Cartwheel")
                    data.add("Sombrero")
                }
                else -> {
                }
            }
            return data
        }

    /*
    when activity is created, setContentView, initializeViews and create navigationitems
    */
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_main)

        this.initializeViews()
        this.createNavigationItems()
    }

    /*
    Initialize AHBottomNavigation, TextView and Spinner
    */
    private fun initializeViews() {
        bottomNavigation = findViewById(R.id.bottom_navigation)
        headerTxt = findViewById(R.id.headerLabel)
        myListView = findViewById(R.id.myListView)

        //gridview item selection events
        myListView.onItemClickListener = AdapterView.OnItemClickListener { adapterView, view, position, id -> Toast.makeText(this@MainActivity, cosmicBodies[position], Toast.LENGTH_SHORT).show() }

    }

    /*
    Bind data to spinner using an ArrayAdapter
     */
    private fun bindData() {
        adapter = ArrayAdapter(this, android.R.layout.simple_list_item_1, cosmicBodies)
        myListView.adapter = adapter
    }

    /*
    Create AHBottonNavigationItems, add them to BottomNavigation, setBackgroundColor, Listen to tab events
    */
    private fun createNavigationItems() {
        // Create AHNavigationItems
        val item1 = AHBottomNavigationItem(R.string.tab1, R.drawable.ic_maps_place, R.color.color_tab_1)
        val item2 = AHBottomNavigationItem(R.string.tab2, R.drawable.ic_maps_local_bar, R.color.color_tab_2)
        val item3 = AHBottomNavigationItem(R.string.tab3, R.drawable.ic_maps_local_restaurant, R.color.color_tab_3)

        // Add AHNavigationItems
        bottomNavigation.addItem(item1)
        bottomNavigation.addItem(item2)
        bottomNavigation.addItem(item3)

        // Set default background color for AHBottomNavigation
        bottomNavigation.defaultBackgroundColor = Color.parseColor("#FEFEFE")

        // Change colors for AHBottomNavigation
        bottomNavigation.accentColor = Color.parseColor("#F63D2B")
        bottomNavigation.inactiveColor = Color.parseColor("#747474")

        // Force to tint the drawable (useful for font with icon for example)
        bottomNavigation.isForceTint = true

        // Manage titles for AHBottomNavigation
        //bottomNavigation.setTitleState(AHBottomNavigation.TitleState.SHOW_WHEN_ACTIVE);
        bottomNavigation.titleState = AHBottomNavigation.TitleState.ALWAYS_SHOW
        //bottomNavigation.setTitleState(AHBottomNavigation.TitleState.ALWAYS_HIDE);

        // Use colored navigation with circle reveal effect
        bottomNavigation.isColored = true

        // Set current item programmatically
        bottomNavigation.currentItem = 0
        bindData()

        // set On TabSelectedListener
        bottomNavigation.setOnTabSelectedListener { position, wasSelected ->
            cosmicCategory = position
            bindData()
            true
        }
    }
}
```

#### Result

![AHBottomNavigation with ListView](https://camposha.info/wp-content/uploads/2019/04/demo1-11.png)

AHBottomNavigation with ListView

![AHBottomNavigation with ListView](https://camposha.info/wp-content/uploads/2019/04/demo2-5.png)

AHBottomNavigation with ListView

![AHBottomNavigation with ListView](https://camposha.info/wp-content/uploads/2019/04/demo3-3.png)

AHBottomNavigation with ListView

Cheers.
