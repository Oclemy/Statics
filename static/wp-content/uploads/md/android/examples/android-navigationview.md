# NavigationDrawer Examples


One of the most popular navigation patterns in mobile app development, be it via native or hybrid means, is the side navigation. You typically click an icon at the top left of the screen and sidebar pops up with the navigation items.

Such a component is known as a NavigationView or a NavigationDrawer. In this tutorial we want to look at several practical step by step examples of how to use a navigationview or a navigation drawer especially with fragments.


## Example 1: Kotlin Android NavigationView Example with Fragments

With the first example you learn how to create a navigationdrawer/navigationview using Kotlin as the primary language. The UI is designed in XML.

Here is what is created:

![Kotlin Android NavigationView Example](https://github.com/alirezabashi98/Navigation-Drawer/raw/master/scr001.png)

### Step 1: Dependencies

We do no need any third party dependency. However some androidx API's will be used so add the following as dependencies:

```groovy
    implementation 'com.google.android.material:material:1.1.0'
    implementation 'androidx.constraintlayout:constraintlayout:1.1.3'
    implementation 'androidx.navigation:navigation-fragment:2.0.0'
    implementation 'androidx.navigation:navigation-ui:2.0.0'
    implementation 'androidx.lifecycle:lifecycle-extensions:2.0.0'
    implementation 'androidx.navigation:navigation-fragment-ktx:2.0.0'
    implementation 'androidx.navigation:navigation-ui-ktx:2.0.0'
```

### Step 2: Create Menu

The next step is to create menu. You do this inside the menu folder in the resources directory:

**/res/menu/activity_main_drawer.xml**

```xml
<?xml version="1.0" encoding="utf-8"?>
<menu xmlns:android="http://schemas.android.com/apk/res/android"
    xmlns:tools="http://schemas.android.com/tools"
    tools:showIn="navigation_view">

    <group android:checkableBehavior="single">
        <item
            android:id="@+id/nav_home"
            android:icon="@drawable/ic_menu_camera"
            android:title="@string/menu_home" />
        <item
            android:id="@+id/nav_gallery"
            android:icon="@drawable/ic_menu_gallery"
            android:title="@string/menu_gallery" />
        <item
            android:id="@+id/nav_slideshow"
            android:icon="@drawable/ic_menu_slideshow"
            android:title="@string/menu_slideshow" />
    </group>
</menu>
```

### Step 3: Create Layouts

There are two types of layouts you need to create:

1. NavigationDrawer Layouts
2. Your other layouts e.g fragments layouts, activity layouts etc.

Let's explore the navigationdrawer layoust. As for the other layouts you'll find them in the source code download.

#### (a). Add NavigationView to Layout

Start by adding navigationview to your activity layout as follows;

**activity_main.xml**

```xml
<?xml version="1.0" encoding="utf-8"?>
<androidx.drawerlayout.widget.DrawerLayout xmlns:android="http://schemas.android.com/apk/res/android"
    xmlns:app="http://schemas.android.com/apk/res-auto"
    xmlns:tools="http://schemas.android.com/tools"
    android:id="@+id/drawer_layout"
    android:layout_width="match_parent"
    android:layout_height="match_parent"
    android:fitsSystemWindows="true"
    tools:openDrawer="start">

    <include
        layout="@layout/app_bar_main"
        android:layout_width="match_parent"
        android:layout_height="match_parent" />

    <com.google.android.material.navigation.NavigationView
        android:id="@+id/nav_view"
        android:layout_width="wrap_content"
        android:layout_height="match_parent"
        android:layout_gravity="start"
        android:fitsSystemWindows="true"
        app:headerLayout="@layout/nav_header_main"
        app:menu="@menu/activity_main_drawer" />

</androidx.drawerlayout.widget.DrawerLayout>
```

#### (b). Design NavigationView Header

You can customize the navigationview header as you wish:

**nav_header_main.xml**

```xml
<?xml version="1.0" encoding="utf-8"?>
<LinearLayout xmlns:android="http://schemas.android.com/apk/res/android"
    xmlns:app="http://schemas.android.com/apk/res-auto"
    android:layout_width="match_parent"
    android:layout_height="@dimen/nav_header_height"
    android:background="#2a2a2a"
    android:gravity="bottom"
    android:orientation="vertical"
    android:paddingLeft="@dimen/activity_horizontal_margin"
    android:paddingTop="@dimen/activity_vertical_margin"
    android:paddingRight="@dimen/activity_horizontal_margin"
    android:paddingBottom="@dimen/activity_vertical_margin"
    android:theme="@style/ThemeOverlay.AppCompat.Dark">

    <ImageView
        android:id="@+id/imageView"
        android:layout_width="100dp"
        android:layout_height="100dp"
        android:contentDescription="@string/nav_header_desc"
        android:paddingTop="@dimen/nav_header_vertical_spacing"
        app:srcCompat="@drawable/a" />

    <TextView
        android:layout_width="match_parent"
        android:layout_height="wrap_content"
        android:paddingTop="@dimen/nav_header_vertical_spacing"
        android:text="@string/nav_header_title"
        android:textAppearance="@style/TextAppearance.AppCompat.Body1" />

    <TextView
        android:id="@+id/textView"
        android:layout_width="wrap_content"
        android:layout_height="wrap_content"
        android:text="@string/nav_header_subtitle" />

</LinearLayout>
```

#### (c). Wrap Toolbar inside AppBar

The toolbar is wrapped inside the appbar. Then the `content_main.xml` is included.

**appbar_main.xml**

```xml
<?xml version="1.0" encoding="utf-8"?>
<androidx.coordinatorlayout.widget.CoordinatorLayout xmlns:android="http://schemas.android.com/apk/res/android"
    xmlns:app="http://schemas.android.com/apk/res-auto"
    xmlns:tools="http://schemas.android.com/tools"
    android:layout_width="match_parent"
    android:layout_height="match_parent"
    tools:context=".MainActivity">

    <com.google.android.material.appbar.AppBarLayout
        android:layout_width="match_parent"
        android:layout_height="wrap_content"
        android:theme="@style/AppTheme.AppBarOverlay">

        <androidx.appcompat.widget.Toolbar
            android:id="@+id/toolbar"
            android:layout_width="match_parent"
            android:layout_height="?attr/actionBarSize"
            android:background="?attr/colorPrimary"
            app:popupTheme="@style/AppTheme.PopupOverlay" />

    </com.google.android.material.appbar.AppBarLayout>

    <include layout="@layout/content_main" />

</androidx.coordinatorlayout.widget.CoordinatorLayout>
```

#### (d). Include host Fragment

The next step is to include the host fragment in your `content_main.xml`:

```xml
<?xml version="1.0" encoding="utf-8"?>
<androidx.constraintlayout.widget.ConstraintLayout xmlns:android="http://schemas.android.com/apk/res/android"
    xmlns:app="http://schemas.android.com/apk/res-auto"
    xmlns:tools="http://schemas.android.com/tools"
    android:layout_width="match_parent"
    android:layout_height="match_parent"
    app:layout_behavior="@string/appbar_scrolling_view_behavior"
    tools:showIn="@layout/app_bar_main">

    <fragment
        android:id="@+id/nav_host_fragment"
        android:name="androidx.navigation.fragment.NavHostFragment"
        android:layout_width="match_parent"
        android:layout_height="match_parent"
        app:defaultNavHost="true"
        app:layout_constraintLeft_toLeftOf="parent"
        app:layout_constraintRight_toRightOf="parent"
        app:layout_constraintTop_toTopOf="parent"
        app:navGraph="@navigation/mobile_navigation" />
</androidx.constraintlayout.widget.ConstraintLayout>
```

#### (e). Design Fragment Layouts

Lastly you will design fragment layouts. Here are the fragment layouts code you will find in the project:

1. fragment_gallery.xml
2. fragment_home.xml

### Step 4: Write Kotlin Code

The next step is to write code that deals with the following sections:

#### (a). Gallery

This section will contain two classes;

1. GalleryFragment
2. GalleryViewmodel

**GalleryViewModel.kt**

This contains the data for galleryFragment. That data is exposed via the observable MutableLivedata:

```kotlin
import androidx.lifecycle.LiveData
import androidx.lifecycle.MutableLiveData
import androidx.lifecycle.ViewModel

class GalleryViewModel : ViewModel() {

    private val _text = MutableLiveData<String>().apply {
        value = "im alirezabashi"
    }
    val text: LiveData<String> = _text
}
```

**GalleryFragment.kt**

In the fragment there are 3 main roles needed to be performed;

1. inflate this fragment's layout.
2. Initialize the ViewModel.
3. Access data from viewmodel and set it to UI.

```kotlin
import android.os.Bundle
import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import android.widget.TextView
import androidx.fragment.app.Fragment
import androidx.lifecycle.Observer
import androidx.lifecycle.ViewModelProviders
import arb.test.navigation.drawer.activity.R

class GalleryFragment : Fragment() {

    private lateinit var galleryViewModel: GalleryViewModel

    override fun onCreateView(
            inflater: LayoutInflater,
            container: ViewGroup?,
            savedInstanceState: Bundle?
    ): View? {
        galleryViewModel =
                ViewModelProviders.of(this).get(GalleryViewModel::class.java)
        val root = inflater.inflate(R.layout.fragment_gallery, container, false)
        val textView: TextView = root.findViewById(R.id.text_gallery)
        galleryViewModel.text.observe(viewLifecycleOwner, Observer {
            textView.text = it
        })
        return root
    }
}
```

#### (b). Home

This relates to home fragment and has the following two classes:

1. HomeViewModel
2. HomeFragment

**HomeViewModel.kt**

This will hold and expose the data needed by the HomeFragment:

```kotlin
import androidx.lifecycle.LiveData
import androidx.lifecycle.MutableLiveData
import androidx.lifecycle.ViewModel

class HomeViewModel : ViewModel() {

    private val _text = MutableLiveData<String>().apply {
        value = "This is home Fragment"
    }
    val text: LiveData<String> = _text
}
```

**HomeFragment.kt**

The homeFragment will oberve and render data provided by the homeviewmodel:

```kotlin
import android.os.Bundle
import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import android.widget.TextView
import androidx.fragment.app.Fragment
import androidx.lifecycle.Observer
import androidx.lifecycle.ViewModelProviders
import arb.test.navigation.drawer.activity.R

class HomeFragment : Fragment() {

    private lateinit var homeViewModel: HomeViewModel

    override fun onCreateView(
            inflater: LayoutInflater,
            container: ViewGroup?,
            savedInstanceState: Bundle?
    ): View? {
        homeViewModel =
                ViewModelProviders.of(this).get(HomeViewModel::class.java)
        val root = inflater.inflate(R.layout.fragment_home, container, false)
        val textView: TextView = root.findViewById(R.id.text_home)
        homeViewModel.text.observe(viewLifecycleOwner, Observer {
            textView.text = it
        })
        return root
    }
}
```

#### (c). Slideshow

The last section is the slideshow:

**SlideshowViewModel**

The view model for the slideshow fragment:

```kotlin
import androidx.lifecycle.LiveData
import androidx.lifecycle.MutableLiveData
import androidx.lifecycle.ViewModel

class SlideshowViewModel : ViewModel() {

    private val _text = MutableLiveData<String>().apply {
        value = "GitHub.com/alirezsbashi"
    }
    val text: LiveData<String> = _text
}
```

**SlideshowFragment.kt**

```kotlin
import android.os.Bundle
import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import android.widget.TextView
import androidx.fragment.app.Fragment
import androidx.lifecycle.Observer
import androidx.lifecycle.ViewModelProviders
import arb.test.navigation.drawer.activity.R

class SlideshowFragment : Fragment() {

    private lateinit var slideshowViewModel: SlideshowViewModel

    override fun onCreateView(
            inflater: LayoutInflater,
            container: ViewGroup?,
            savedInstanceState: Bundle?
    ): View? {
        slideshowViewModel =
                ViewModelProviders.of(this).get(SlideshowViewModel::class.java)
        val root = inflater.inflate(R.layout.fragment_slideshow, container, false)
        val textView: TextView = root.findViewById(R.id.text_slideshow)
        slideshowViewModel.text.observe(viewLifecycleOwner, Observer {
            textView.text = it
        })
        return root
    }
}
```

### Step 5: Create Activity

The last step is to create the main activity. This is where all the fragments are hosted.

**MainActivity.kt**

```kotlin
import android.os.Bundle
import android.view.Menu
import android.view.MenuItem
import android.widget.Toast
import com.google.android.material.floatingactionbutton.FloatingActionButton
import com.google.android.material.snackbar.Snackbar
import com.google.android.material.navigation.NavigationView
import androidx.navigation.findNavController
import androidx.navigation.ui.AppBarConfiguration
import androidx.navigation.ui.navigateUp
import androidx.navigation.ui.setupActionBarWithNavController
import androidx.navigation.ui.setupWithNavController
import androidx.drawerlayout.widget.DrawerLayout
import androidx.appcompat.app.AppCompatActivity
import androidx.appcompat.widget.Toolbar

class MainActivity : AppCompatActivity() {

    private lateinit var appBarConfiguration: AppBarConfiguration

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_main)
        val toolbar: Toolbar = findViewById(R.id.toolbar)
        setSupportActionBar(toolbar)

        val drawerLayout: DrawerLayout = findViewById(R.id.drawer_layout)
        val navView: NavigationView = findViewById(R.id.nav_view)
        val navController = findNavController(R.id.nav_host_fragment)
        // Passing each menu ID as a set of Ids because each
        // menu should be considered as top level destinations.
        appBarConfiguration = AppBarConfiguration(setOf(
                R.id.nav_home, R.id.nav_gallery, R.id.nav_slideshow), drawerLayout)
        setupActionBarWithNavController(navController, appBarConfiguration)
        navView.setupWithNavController(navController)
    }

    override fun onCreateOptionsMenu(menu: Menu): Boolean {
        // Inflate the menu; this adds items to the action bar if it is present.
        menuInflater.inflate(R.menu.main, menu)
        return true
    }

    override fun onSupportNavigateUp(): Boolean {
        val navController = findNavController(R.id.nav_host_fragment)
        return navController.navigateUp(appBarConfiguration) || super.onSupportNavigateUp()
    }
}
```

### Run

Finally run the project.

### Reference

Find complete code below:

| No. | Link |
| --- | --- |
| 1. | [Download](https://github.com/alirezabashi98/Navigation-Drawer/archive/refs/heads/master.zip) code |
| 2. | [Browse](https://github.com/alirezabashi98/Navigation-Drawer/) code |
| 3. | [Follow](https://github.com/alirezabashi98/) code author |

## Example 2: Android NavigationView Master Detail Example with Swipe tabs and Fragments

In this example, a master detail workflow is created. In the master view, items are listed in the recyclerview. When an item clicked the detail view is opened.

Moreover swipe tabs are implemented alongside the navigation drawer.

Here is the demo screenshot:

![Android NavigationView with Swipe Tabs](https://github.com/kaju2525/NavigationMenu-Fragment/blob/master/Images/navigation%20bar.png?raw=true)

![Android NavigationView Detail Activity](https://github.com/kaju2525/NavigationMenu-Fragment/blob/master/Images/navigation%20bar%202.png?raw=true)

### Step 1: Dependencies

The navigation drawer is a standard androidx component. Howeve for easy and custom image loading, add the following dependencies in your gardle file:

```groovy
    implementation 'com.github.bumptech.glide:glide:3.7.0'
    implementation 'de.hdodenhof:circleimageview:1.3.0'
```

### Step 2: Create Layout

Create the menu that will be shown in the navigation drawer, specifying the menu items:

```xml
<menu xmlns:android="http://schemas.android.com/apk/res/android">

    <group android:checkableBehavior="single">
        <item
            android:id="@+id/nav_home"
            android:icon="@drawable/ic_dashboard"
            android:title="Home" />
        <item
            android:id="@+id/nav_messages"
            android:icon="@drawable/ic_event"
            android:title="Messages" />
        <item
            android:id="@+id/nav_friends"
            android:icon="@drawable/ic_headset"
            android:title="Friends" />
        <item
            android:id="@+id/nav_discussion"
            android:icon="@drawable/ic_forum"
            android:title="Discussion" />
    </group>

    <item android:title="Sub items">
        <menu>
            <item
                android:icon="@drawable/ic_dashboard"
                android:title="Sub item 1" />
            <item
                android:icon="@drawable/ic_forum"
                android:title="Sub item 2" />
        </menu>
    </item>

</menu>
```

### Step 3: Create Layouts

Now go aheader and create necessary layouts. This process had been discussed in the first example.However in this example a viewpager and tabs are also included since they are used. For example here is the layout defining them:

```xml
<?xml version="1.0" encoding="utf-8"?>
<android.support.design.widget.CoordinatorLayout xmlns:android="http://schemas.android.com/apk/res/android"
    xmlns:app="http://schemas.android.com/apk/res-auto"
    android:id="@+id/main_content"
    android:layout_width="match_parent"
    android:layout_height="match_parent">

    <android.support.design.widget.AppBarLayout
        android:id="@+id/appbar"
        android:layout_width="match_parent"
        android:layout_height="wrap_content"
        android:theme="@style/ThemeOverlay.AppCompat.Dark.ActionBar">

        <android.support.v7.widget.Toolbar
            android:id="@+id/toolbar"
            android:layout_width="match_parent"
            android:layout_height="?attr/actionBarSize"
            android:background="?attr/colorPrimary"
            app:popupTheme="@style/ThemeOverlay.AppCompat.Light"
            app:layout_scrollFlags="scroll|enterAlways" />

        <android.support.design.widget.TabLayout
            android:id="@+id/tabs"
            android:layout_width="match_parent"
            android:layout_height="wrap_content" />

    </android.support.design.widget.AppBarLayout>

    <android.support.v4.view.ViewPager
        android:id="@+id/viewpager"
        android:layout_width="match_parent"
        android:layout_height="match_parent"
        app:layout_behavior="@string/appbar_scrolling_view_behavior" />

    <android.support.design.widget.FloatingActionButton
        android:id="@+id/fab"
        android:layout_width="wrap_content"
        android:layout_height="wrap_content"
        android:layout_gravity="end|bottom"
        android:layout_margin="@dimen/fab_margin"
        android:src="@drawable/ic_done" />

</android.support.design.widget.CoordinatorLayout>
```

Don't worry, you will find the layouts in the source code download.

### Step 4: Write Code

Next you will need to create the following classes:

#### (a). Create Model class

Hereis the model class also containing the data to be used for demo purposes:

**Cheeses.java**

```java
import java.util.Random;

public class Cheeses {

    private static final Random RANDOM = new Random();

    public static int getRandomCheeseDrawable() {
        switch (RANDOM.nextInt(5)) {
            default:
            case 0:
                return R.drawable.cheese_1;
            case 1:
                return R.drawable.cheese_2;
            case 2:
                return R.drawable.cheese_3;
            case 3:
                return R.drawable.cheese_4;
            case 4:
                return R.drawable.cheese_5;
        }
    }

    public static final String[] sCheeseStrings = {
    "Abbaye de Belloc", "Abbaye du Mont des Cats", "Abertam"};

}
```

#### (b). Create Detail Activity

The detail activity to show cheese details.

**CheeseDetailActvity.java**

```java
public class CheeseDetailActivity extends AppCompatActivity {

    public static final String EXTRA_NAME = "cheese_name";

    @Override
    public void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_detail);

        Intent intent = getIntent();
        final String cheeseName = intent.getStringExtra(EXTRA_NAME);

        final Toolbar toolbar = (Toolbar) findViewById(R.id.toolbar);
        setSupportActionBar(toolbar);
        getSupportActionBar().setDisplayHomeAsUpEnabled(true);

        CollapsingToolbarLayout collapsingToolbar =
                (CollapsingToolbarLayout) findViewById(R.id.collapsing_toolbar);
        collapsingToolbar.setTitle(cheeseName);

        FloatingActionButton fab = (FloatingActionButton) findViewById(R.id.fab);
        fab.setAlpha(0f);
        fab.setVisibility(View.GONE);

        loadBackdrop();
    }

    private void loadBackdrop() {
        final ImageView imageView = (ImageView) findViewById(R.id.backdrop);
        Glide.with(this).load(Cheeses.getRandomCheeseDrawable()).centerCrop().into(imageView);
    }

    @Override
    public boolean onCreateOptionsMenu(Menu menu) {
        getMenuInflater().inflate(R.menu.sample_actions, menu);
        return true;
    }
}
```

#### (b). Create List Fragment

This is the fragment that will list the cheeses:

**CheeseListFragment.java**

> Find code in the download

#### (d). The Host the Fragments

Lastly the main activity that will host the fragments is needed. Both Swipe Tabs with the helpof Viewpager as well as NavigationView are used for navigation:

**MainActivity.java**

```java
public class MainActivity extends AppCompatActivity {

    private DrawerLayout mDrawerLayout;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);

        Toolbar toolbar = (Toolbar) findViewById(R.id.toolbar);
        setSupportActionBar(toolbar);

        final ActionBar ab = getSupportActionBar();
        ab.setHomeAsUpIndicator(R.drawable.ic_menu);
        ab.setDisplayHomeAsUpEnabled(true);

        mDrawerLayout = (DrawerLayout) findViewById(R.id.drawer_layout);

        NavigationView navigationView = (NavigationView) findViewById(R.id.nav_view);
        if (navigationView != null) {
            setupDrawerContent(navigationView);
        }

        ViewPager viewPager = (ViewPager) findViewById(R.id.viewpager);
        if (viewPager != null) {
            setupViewPager(viewPager);
        }

        FloatingActionButton fab = (FloatingActionButton) findViewById(R.id.fab);
        fab.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View view) {
                Snackbar.make(view, "Here's a Snackbar", Snackbar.LENGTH_LONG)
                        .setAction("Action", null).show();
            }
        });

        TabLayout tabLayout = (TabLayout) findViewById(R.id.tabs);
        tabLayout.setupWithViewPager(viewPager);
    }

    @Override
    public boolean onCreateOptionsMenu(Menu menu) {
        getMenuInflater().inflate(R.menu.sample_actions, menu);
        return true;
    }

    @Override
    public boolean onOptionsItemSelected(MenuItem item) {
        switch (item.getItemId()) {
            case android.R.id.home:
                mDrawerLayout.openDrawer(GravityCompat.START);
                return true;
        }
        return super.onOptionsItemSelected(item);
    }

    private void setupViewPager(ViewPager viewPager) {
        Adapter adapter = new Adapter(getSupportFragmentManager());
        adapter.addFragment(new CheeseListFragment(), "Category 1");
        adapter.addFragment(new CheeseListFragment(), "Category 2");
        adapter.addFragment(new CheeseListFragment(), "Category 3");
        viewPager.setAdapter(adapter);
    }

    private void setupDrawerContent(NavigationView navigationView) {
        navigationView.setNavigationItemSelectedListener(
                new NavigationView.OnNavigationItemSelectedListener() {
            @Override
            public boolean onNavigationItemSelected(MenuItem menuItem) {
                menuItem.setChecked(true);
                mDrawerLayout.closeDrawers();
                return true;
            }
        });
    }

    static class Adapter extends FragmentPagerAdapter {
        private final List<Fragment> mFragments = new ArrayList<>();
        private final List<String> mFragmentTitles = new ArrayList<>();

        public Adapter(FragmentManager fm) {
            super(fm);
        }

        public void addFragment(Fragment fragment, String title) {
            mFragments.add(fragment);
            mFragmentTitles.add(title);
        }

        @Override
        public Fragment getItem(int position) {
            return mFragments.get(position);
        }

        @Override
        public int getCount() {
            return mFragments.size();
        }

        @Override
        public CharSequence getPageTitle(int position) {
            return mFragmentTitles.get(position);
        }
    }
}
```

### Run

Lastly run the project in android studio.

### Reference

Here are the download links:

| No. | Link |
| --- | --- |
| 1. | [Download](https://github.com/kaju2525/NavigationMenu-Fragment/archive/refs/heads/master.zip) code |
| 2. | [Browse](https://github.com/kaju2525/NavigationMenu-Fragment/) code |
| 3. | [Follow](https://github.com/kaju2525/) code author |

## Example 3: Kotlin Android Grouped NavigationView with Fragments

> Another NavigationView or NavigationDrawer example written in Kotlin.

We will have the following:

1. 1 Activity.
2. 6 Fragments.

The menu items in the NavigationView will be grouped.

### Step 1: Create Project

Start by creating an empty `Android Studio` project.

### Step 2: Dependencies

No external dependencies are needed for this project.

### Step 3: Create Nav Menu

You now need to create the menu xml resource for our NavigationView:

**menu/nav_nmen.xml**

```xml
<?xml version="1.0" encoding="utf-8"?>
<menu xmlns:android="http://schemas.android.com/apk/res/android">

    <group
        android:id="@+id/group_1"
        android:checkableBehavior="single">

        <item
            android:id="@+id/nav_home"
            android:icon="@drawable/ic_home_black_24dp"
            android:checked="true"
            android:title="Home" />

        <item
            android:id="@+id/nav_profile"
            android:icon="@drawable/ic_profile_black_24dp"
            android:title="Profile" />

        <item
            android:id="@+id/nav_notification"
            android:icon="@drawable/ic_notifications_black_24dp"
            android:title="Notification" />

        <item
            android:id="@+id/nav_location"
            android:icon="@drawable/ic_location_black_24dp"
            android:title="Location" />

        <item
            android:id="@+id/nav_settings"
            android:icon="@drawable/ic_settings_black_24dp"
            android:title="Settings" />

    </group>

    <group
        android:id="@+id/group_2"
        android:checkableBehavior="single">

        <item
            android:id="@+id/nav_rate_me"
            android:icon="@drawable/ic_star_black_24dp"
            android:title="Rate Me"/>

        <item
            android:id="@+id/nav_share"
            android:icon="@drawable/ic_share_black_24dp"
            android:title="Share"/>

        <item
            android:id="@+id/nav_about"
            android:icon="@drawable/ic_about_us_black_24dp"
            android:title="About Us"/>

    </group>

</menu>
```

### Step 4: Layouts

We will have various layouts and we will not display all the code here. Here are the layouts:

1. activity_main.xml - Layout for MainActivity
2. fragment_about.xml - Layout for About Us Fragment.
3. fragment_home.xml - Layout for Home Fragment.
4. fragment_location.xml - Layout for Location Fragment.
5. fragment_notification.xml - Layout for Notification Fragment.
6. fragment_profile.xml - Layout for Profile Fragment.
7. fragment_settings.xml - Layout for Settings Fragment.
8. menu_header.xml - Layout for NavigationView Header.

**menu_header.xml**

Here is for example the `menu_header.xml`:

```xml
<?xml version="1.0" encoding="utf-8"?>
<LinearLayout xmlns:android="http://schemas.android.com/apk/res/android"
    style="@style/ThemeOverlay.AppCompat.Dark"
    android:layout_width="match_parent"
    android:layout_height="172dp"
    android:background="@color/colorPrimaryDark"
    android:orientation="vertical"
    android:padding="25dp">

    <ImageView
        android:layout_marginTop="10dp"
        android:layout_width="80dp"
        android:layout_height="80dp"
        android:src="@drawable/logo"
        android:layout_marginLeft="10dp"/>

    <TextView
        android:layout_marginTop="5dp"
        android:layout_width="wrap_content"
        android:layout_height="wrap_content"
        android:layout_marginLeft="10dp"
        android:text="Kiran Bahalaskar"
        android:textColor="@android:color/white"
        android:textSize="17sp"
        style="@style/TextAppearance.AppCompat.Body1"/>

</LinearLayout>
```

> You will find more layout code in the download.

### Step 5: Create Fragments

Now you need to create Fragments:

- The Fragments shall inherit from `androidx.fragment.app.Fragment`.
- We simply inflate the fragment layout in each fragment inside the `onCreateView()` method.

**(a). About_Fragment.kt**

```kotlin
import android.os.Bundle
import androidx.fragment.app.Fragment
import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup

import com.example.navigationdrawerusingkotlin.R

class About_Fragment : Fragment() {

    override fun onCreateView(
        inflater: LayoutInflater, container: ViewGroup?,
        savedInstanceState: Bundle?
    ): View? {
        // Inflate the layout for this fragment
        return inflater.inflate(R.layout.fragment_about_, container, false)
    }

}
```

**(b). Home_Fragment.kt**

The Fragment for the Home page:

```kotlin

class Home_Fragment : Fragment() {

    override fun onCreateView(
        inflater: LayoutInflater, container: ViewGroup?,
        savedInstanceState: Bundle?
    ): View? {
        // Inflate the layout for this fragment
        return inflater.inflate(R.layout.fragment_home_, container, false)
    }

}
```

**(c). Location_Fragment.kt**

The Fragment for the Location page:

```kotlin
class Location_Fragment : Fragment() {

    override fun onCreateView(
        inflater: LayoutInflater, container: ViewGroup?,
        savedInstanceState: Bundle?
    ): View? {
        // Inflate the layout for this fragment
        return inflater.inflate(R.layout.fragment_location_, container, false)
    }

}
```

**(d). Notification_Fragment.kt**

The Fragment for the Notification page:

```kotlin
class Notification_Fragment : Fragment() {

    override fun onCreateView(
        inflater: LayoutInflater, container: ViewGroup?,
        savedInstanceState: Bundle?
    ): View? {
        // Inflate the layout for this fragment
        return inflater.inflate(R.layout.fragment_notification_, container, false)
    }

}
```

**(d). Profile_Fragment.kt**

The Fragment for the Profile page:

```kotlin
class Profile_Fragment : Fragment() {

    override fun onCreateView(
        inflater: LayoutInflater, container: ViewGroup?,
        savedInstanceState: Bundle?
    ): View? {
        // Inflate the layout for this fragment
        return inflater.inflate(R.layout.fragment_profile_, container, false)
    }

}
```

**(f). Settings_Fragment.kt**

The Fragment for the Settings page:

```kotlin
class Settings_Fragment : Fragment() {

    override fun onCreateView(
        inflater: LayoutInflater, container: ViewGroup?,
        savedInstanceState: Bundle?
    ): View? {
        // Inflate the layout for this fragment
        return inflater.inflate(R.layout.fragment_settings_, container, false)
    }

}
```

### Step 6: Create MainActivity

This is the activity that will host all our fragments. Not only that but it will also coordinate navigation to those fragments via the NavigationView.

Here is the full code:

**MainActivity.kt**

```kotlin
import androidx.appcompat.app.AppCompatActivity
import android.os.Bundle
import androidx.appcompat.app.ActionBarDrawerToggle
import androidx.fragment.app.FragmentTransaction
import com.example.navigationdrawerusingkotlin.Fragment.*
import kotlinx.android.synthetic.main.activity_main.*

class MainActivity : AppCompatActivity() {

    lateinit var homeFragment: Home_Fragment
    lateinit var profileFragment: Profile_Fragment
    lateinit var notificationFragment: Notification_Fragment
    lateinit var locationFragment: Location_Fragment
    lateinit var settingsFragment: Settings_Fragment
    lateinit var aboutFragment: About_Fragment

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_main)

        setSupportActionBar(toolbar)
        val toggle = ActionBarDrawerToggle(this, drawerLayout, toolbar, 0, 0)
        drawerLayout.addDrawerListener(toggle)
        toggle.syncState()

        homeFragment = Home_Fragment()
        supportFragmentManager
            .beginTransaction()
            .replace(R.id.frame_layout, homeFragment)
            .setTransition(FragmentTransaction.TRANSIT_FRAGMENT_OPEN)
            .commit()

        navigation_view.setNavigationItemSelectedListener { menuItem ->

            menuItem.isChecked = false
            drawerLayout.closeDrawers()

            when (menuItem.itemId) {

                R.id.nav_home -> {
                    homeFragment = Home_Fragment()
                    supportFragmentManager
                        .beginTransaction()
                        .replace(R.id.frame_layout, homeFragment)
                        .setTransition(FragmentTransaction.TRANSIT_FRAGMENT_OPEN)
                        .commit()
                }

                R.id.nav_profile -> {
                    profileFragment = Profile_Fragment()
                    supportFragmentManager
                        .beginTransaction()
                        .replace(R.id.frame_layout, profileFragment)
                        .setTransition(FragmentTransaction.TRANSIT_FRAGMENT_OPEN)
                        .commit()
                }

                R.id.nav_notification -> {
                    notificationFragment = Notification_Fragment()
                    supportFragmentManager
                        .beginTransaction()
                        .replace(R.id.frame_layout, notificationFragment)
                        .setTransition(FragmentTransaction.TRANSIT_FRAGMENT_OPEN)
                        .commit()
                }

                R.id.nav_location -> {
                    locationFragment = Location_Fragment()
                    supportFragmentManager
                        .beginTransaction()
                        .replace(R.id.frame_layout, locationFragment)
                        .setTransition(FragmentTransaction.TRANSIT_FRAGMENT_OPEN)
                        .commit()
                }

                R.id.nav_settings -> {
                    settingsFragment = Settings_Fragment()
                    supportFragmentManager
                        .beginTransaction()
                        .replace(R.id.frame_layout, settingsFragment)
                        .setTransition(FragmentTransaction.TRANSIT_FRAGMENT_OPEN)
                        .commit()
                }

                R.id.nav_about -> {
                    aboutFragment = About_Fragment()
                    supportFragmentManager
                        .beginTransaction()
                        .replace(R.id.frame_layout, aboutFragment)
                        .setTransition(FragmentTransaction.TRANSIT_FRAGMENT_OPEN)
                        .commit()
                }

            }
            true
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
| 1. | [Download](https://github.com/Kiran-Bahalaskar/Navigation-Drawer-Using-Kotlin/archive/refs/heads/master.zip) Example |
| 2. | [Follow](https://github.com/Kiran-Bahalaskar/) code author |
| 3. | Code: [Apache 2.0 License](http://www.apache.org/licenses/LICENSE-2.0.txt) |

## Example 4: Android NavigationView - Fragments With RecyclerView

This is a navigationview with fragments tutorial except that the fragments contain recyclerview with data.

- We want to switch through our fragments using a NavigationView.
- If you click a NavigationItem,we take you to the corresponding fragment.
- Each fragment has a recyclerview.
- Each RecyclerView will have its own unique dataset.

The full source code is available for download above.You can also have a look at the video at the bottom of this page for complete step by step explanation.

#### Project Structure

Here's teh project structure.

![Android NavigationView Recyclerview Structure](https://github.com/Oclemy/NavViewRecyclerView/raw/master/demos/ProjectStructure.PNG)

#### Our Fragments

We will be having 4 fragments:

1. InterGalactic
2. InterPlanetary
3. InterStellar
4. InterUniverse

This is one of the fragments we are using.All other fragments exist in this format :

```java
public class InterGalactic extends Fragment {

    private RecyclerView rv;
    private static String[] spacecrafts={"Pioneer","Voyager","Casini","Spirit","Challenger"};

    public static InterGalactic newInstance()
    {
        return new InterGalactic();
    }
    @Nullable
    @Override
    public View onCreateView(LayoutInflater inflater, ViewGroup container, Bundle savedInstanceState) {

        View rootView=inflater.inflate(R.layout.intergalactic,null);

        //REFERENCE
        rv= (RecyclerView) rootView.findViewById(R.id.intergalactic_RV);

        //LAYOUT MANAGER
        rv.setLayoutManager(new LinearLayoutManager(getActivity()));

        //ADAPTER
        rv.setAdapter(new MyAdapter(getActivity(),spacecrafts));

        return rootView;
    }

    @Override
    public String toString() {
        return "InterGalactic";
    }
}
```

![RecyclerView](https://github.com/Oclemy/NavViewRecyclerView/raw/master/demos/RecyclerView.PNG)

#### MyAdapter

Then we have our recyclerView adapter as below :

```java
public class MyAdapter extends RecyclerView.Adapter<MyAdapter.RecyclerVH> {

    Context c;
    String[] spacecrafts;

    public MyAdapter(Context c, String[] spacecrafts) {
        this.c = c;
        this.spacecrafts = spacecrafts;
    }

    @Override
    public RecyclerVH onCreateViewHolder(ViewGroup parent, int viewType) {
        View v= LayoutInflater.from(c).inflate(R.layout.model,parent,false);
        return new RecyclerVH(v);
    }

    @Override
    public void onBindViewHolder(RecyclerVH holder, int position) {
         holder.nameTxt.setText(spacecrafts[position]);
    }

    @Override
    public int getItemCount() {
        return spacecrafts.length;
    }

    /*
    VIEWHOLDER CLASS
     */
    public class RecyclerVH extends RecyclerView.ViewHolder
    {
        TextView nameTxt;

        public RecyclerVH(View itemView) {
            super(itemView);

            nameTxt= (TextView) itemView.findViewById(R.id.nameTxt);
        }
    }
}
```

#### MainActivity.java

We have our MainActivity class :

```java
public class MainActivity extends AppCompatActivity
        implements NavigationView.OnNavigationItemSelectedListener {

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

        //REFERENCE DRAWER,TOGGLE ITS INDICATOR
        DrawerLayout drawer = (DrawerLayout) findViewById(R.id.drawer_layout);
        ActionBarDrawerToggle toggle = new ActionBarDrawerToggle(
                this, drawer, toolbar, R.string.navigation_drawer_open, R.string.navigation_drawer_close);
        drawer.addDrawerListener(toggle);
        toggle.syncState();

        //REFERNCE NAV VIEW AND ATTACH ITS ITEM SELECTION LISTENER
        NavigationView navigationView = (NavigationView) findViewById(R.id.nav_view);
        navigationView.setNavigationItemSelectedListener(this);
    }

    //CLOSE DRAWER WHEN BACK BTN IS CLICKED,IF OPEN
    @Override
    public void onBackPressed() {
        DrawerLayout drawer = (DrawerLayout) findViewById(R.id.drawer_layout);
        if (drawer.isDrawerOpen(GravityCompat.START)) {
            drawer.closeDrawer(GravityCompat.START);
        } else {
            super.onBackPressed();
        }
    }

    //RAISED WHEN NAV VIEW ITEM IS SELECTED
    @SuppressWarnings("StatementWithEmptyBody")
    @Override
    public boolean onNavigationItemSelected(MenuItem item) {
        // Handle navigation view item clicks here.
        int id = item.getItemId();

        //OPEN APPROPRIATE FRAGMENT WHEN NAV ITEM IS SELECTED
        if (id == R.id.interplanetary) {
            //PERFORM TRANSACTION TO REPLACE CONTAINER WITH FRAGMENT
            MainActivity.this.getSupportFragmentManager().beginTransaction().replace(R.id.containerID, InterPlanetary.newInstance()).commit();

        } else if (id == R.id.interstellar) {
            MainActivity.this.getSupportFragmentManager().beginTransaction().replace(R.id.containerID, InterStellar.newInstance()).commit();

        } else if (id == R.id.intergalactic) {
            MainActivity.this.getSupportFragmentManager().beginTransaction().replace(R.id.containerID, InterGalactic.newInstance()).commit();

        } else if (id == R.id.interuniverse) {
            MainActivity.this.getSupportFragmentManager().beginTransaction().replace(R.id.containerID, InterUniverse.newInstance()).commit();

        } else if (id == R.id.nav_share) {

        } else if (id == R.id.nav_send) {

        }

        //REFERENCE AND CLOSE DRAWER LAYOUT
        DrawerLayout drawer = (DrawerLayout) findViewById(R.id.drawer_layout);
        drawer.closeDrawer(GravityCompat.START);
        return true;
    }
}
```

#### Code Download

Download the code here:

| Resource | Link |
| --- | --- |
| GitHub | [Download](https://github.com/Oclemy/NavViewRecyclerView/archive/master.zip) |
| YouTube | [Watch](https://www.youtube.com/watch?v=CUWUBVdbDUA) |
