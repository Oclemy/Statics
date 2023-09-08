# BottomNavigation Examples


The Android Bottom Navigation is a navigation bar that appears at the bottom of the screen. It can be used as a replacement for the traditional navigation bar that appears at the top of the screen.

The Bottom Navigation is generally used in apps with multiple screens, where it acts as a way to switch between different screens. 

Welcome to today's tutorial. In this piece we want to look at some options for inducing  a bottom bar in your application. Mostly we will be looking at how to work with the botttom navigation bar component.


### What You Will Learn

Here are the concepts you will learn in this tutorial:

1. What is a Bottom Navigation bar
2. Best design practices for BottomNavigationBar usage.
3. How to use a bottom navigation view - simple example.
4. How to create swipeable bottom bar.
5. How to use BottomNavigationView with Fragments and Viewpager.
6. How to create animated bottomnavigationview with shimmer effect.


### What is a Bottom Navigation Bar?

According to android's [official documentation](https://developer.android.com/reference/com/google/android/material/bottomnavigation/BottomNavigationView?hl=en):

> It represents a standard bottom navigation bar for application. It is an implementation of material design bottom navigation.

Bottom navigation bars make it easy for users to explore and switch between top-level views in a single tap. They should be used when an application has three to five top-level destinations.

The bar can disappear on scroll, based on `HideBottomViewOnScrollBehavior`, when it is placed within a CoordinatorLayout and one of the children within the CoordinatorLayout is scrolled. This behavior is only set if the layout_behavior property is set to HideBottomViewOnScrollBehavior.

The bar contents can be populated by specifying a menu resource file. Each menu item title, icon and enabled state will be used for displaying bottom navigation bar items. Menu items can also be used for programmatically selecting which destination is currently active. It can be done using `MenuItem#setChecked(true)`.

### Advantages of BottomNavigation

Why should you use BottomNavigation over other navigation patterns?

Bottom navigation is a design feature that is becoming more popular in web and mobile apps. It offers an alternative to the traditional top-down navigation, which often requires scrolling to find what users need.

The bottom navigation offers a more convenient way for users to find what they need. They can tap on the menu button in the bottom left or right corner of their screen and go straight to whatever they want without having to scroll through different sections of the app.

The bottom navigation has been proven to be more efficient than top-down navigation methods because it encourages engagement with content and provides quick access to all features of an app. It also gives users an overview of all available options without them having to scroll through the entire application, which can be time consuming when navigating on a small screen.

### Android Bottom Navigation Design Patterns & Best Practices

A bottom navigation bar is a widget that is used in Android applications for providing a consistent and predictable navigation experience.

The bottom navigation bar typically appears at the bottom of the screen and contains the main navigational elements like app logo, menu items, and other options. It is usually hidden until tapped on or swiped up from the bottom edge of the screen.

The following guidelines should be followed to create an effective bottom navigation bar:

- The main content should not be placed below the bottom navigation bar.
- There should not be more than three levels of navigational hierarchy in a single view.
- The icon representing each item in the navigation bar should have clear visual weight and contrast with other icons in order to make it easy for users to identify it at a glance.


### Components for Implementing BottomNavigation

If you want to use BottomNavigation in your android app. You can use the following components or widgets:

1. BottomNavigationView - standard bottom navigation component for android.
2. Third party BottomNavigation components

In this tutorial we will look at `BottomNavigationView`.

### What is a Bottom Navigation View and What Problems does it Solve?

Bottom navigation is a way of navigating on Android devices. It solves some of the problems that exist with the other  Android navigation mechanisms.

It solves offers an alternative to the traditional top navigation bar. Not only is it now the more used navigation pattern in android, but also in Apple's iOS.The bottom navigation view replaces the top-level menu bar and provides a different approach to app navigation by placing all major app features at the bottom of the screen instead of at the top. Bottom nav improves usability by making it easier for users to find their favorite features and navigate between app screens.

Bottom nav is a navigation style in which the main menu bar and top-level features of an app are placed at the bottom of the screen, instead of at the top as in most other apps. As a result, users don't need to scroll through a long list of menus to find what they're looking for. It also encourages users to use the app more often by making it easier to find all of their favorite features more quickly.

### How to Use BottomNavigationView

Here are the steps followed in using a bottom navigation view:

### Step 1: Add to Layout

Add it to your Layout Resource as follows:

```xml
<com.google.android.material.bottomnavigation.BottomNavigationView
     xmlns:android="http://schemas.android.com/apk/res/android"
     xmlns:app="http://schema.android.com/apk/res/res-auto"
     android:id="@+id/navigation"
     android:layout_width="match_parent"
     android:layout_height="56dp"
     android:layout_gravity="start"
     app:menu="@menu/my_navigation_items" />
```

### Step 2: Create Navigation Items

Create Navigation Items menu resource file as follows:

```xml
 <menu xmlns:android="http://schemas.android.com/apk/res/android">
     <item android:id="@+id/action_search"
          android:title="@string/menu_search"
          android:icon="@drawable/ic_search" />
     <item android:id="@+id/action_settings"
          android:title="@string/menu_settings"
          android:icon="@drawable/ic_add" />
     <item android:id="@+id/action_navigation"
          android:title="@string/menu_navigation"
          android:icon="@drawable/ic_action_navigation_menu" />
 </menu>
```

### Step 3: Use it in Code

Then lastly reference and use it in your java/kotlin code. Proceed to check our examples.


## Bottom Navigation Example in Java

### Step 1: Create Activity

**MainActivity.java**

Here is our main activity file. This is the only java we write in this example.

```java
public class MainActivity extends AppCompatActivity {
    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);

        final TextView newsTextView = findViewById(R.id.newsTextView);
        final TextView techTextView = findViewById(R.id.techTextView);
        final TextView entertainmentTextView = findViewById(R.id.entertainmentTextView);

        BottomNavigationView bottomNavigationView = findViewById(R.id.bottom_navigation);

        bottomNavigationView.setOnNavigationItemSelectedListener(
                new BottomNavigationView.OnNavigationItemSelectedListener() {
                    @Override
                    public boolean onNavigationItemSelected(@NonNull MenuItem item) {
                        switch (item.getItemId()) {
                            case R.id.action_news:
                                newsTextView.setVisibility(View.VISIBLE);
                                techTextView.setVisibility(View.GONE);
                                entertainmentTextView.setVisibility(View.GONE);
                                break;
                            case R.id.action_tech:
                                newsTextView.setVisibility(View.GONE);
                                techTextView.setVisibility(View.VISIBLE);
                                entertainmentTextView.setVisibility(View.GONE);
                                break;
                            case R.id.action_entertainment:
                                newsTextView.setVisibility(View.GONE);
                                techTextView.setVisibility(View.GONE);
                                entertainmentTextView.setVisibility(View.VISIBLE);
                                break;
                        }
                        return false;
                    }
                });
    }
}
```

### Step 2: Create Layout Resource

**activity_main.xml**

Here's our main activity's layout.

```xml
<?xml version="1.0" encoding="utf-8"?>
<RelativeLayout

    android_layout_width="match_parent"
    android_layout_height="match_parent">

    <TextView
        android_id="@+id/newsTextView"
        android_layout_width="wrap_content"
        android_layout_height="wrap_content"
        android_layout_centerInParent="true"
        android_text="@string/txt_news" />

    <TextView
        android_id="@+id/techTextView"
        android_layout_width="wrap_content"
        android_layout_height="wrap_content"
        android_layout_centerInParent="true"
        android_text="@string/txt_tech"
        android_visibility="gone" />

    <TextView
        android_id="@+id/entertainmentTextView"
        android_layout_width="wrap_content"
        android_layout_height="wrap_content"
        android_layout_centerInParent="true"
        android_text="@string/txt_entertainment"
        android_visibility="gone" />

    <android.support.design.widget.BottomNavigationView
        android_id="@+id/bottom_navigation"
        android_layout_width="match_parent"
        android_layout_height="wrap_content"
        android_layout_alignParentBottom="true"
        app_itemBackground="@color/colorPrimary"
        app_itemIconTint="@color/white"
        app_itemTextColor="@color/white"
        app_menu="@menu/bottom_navigation_main" />

</RelativeLayout>
```

### Step 3: Create Menu Resource file

**bottom_navigation_main.xml**

This is our menu. Place it under the `menu` resource directory.

```xml
<?xml version="1.0" encoding="utf-8"?>
<menu
    >
    <item
        android_id="@+id/action_news"
        android_enabled="true"
        android_icon="@drawable/ic_favorite_white_24dp"
        android_title="@string/txt_news"
        app_showAsAction="ifRoom" />
    <item
        android_id="@+id/action_tech"
        android_enabled="true"
        android_icon="@drawable/ic_access_time_white_24dp"
        android_title="@string/txt_tech"
        app_showAsAction="ifRoom" />
    <item
        android_id="@+id/action_entertainment"
        android_enabled="true"
        android_icon="@drawable/ic_audiotrack_white_24dp"
        android_title="@string/txt_entertainment"
        app_showAsAction="ifRoom" />
</menu>
```

Let's look at some more downloadable bottomnavigationview examples.

## Example 1: Kotlin Android Simple BottomNavigationView with Fragments Example

This is a simple bottom navigationview example written in Kotlin. In this example you will be able to switch through 3 fragments by clicking the corresponding bottom navigation ba item.

The fragments simply contain a textview with some text. Check the demo below:

![Kotlin Android Bottom navigation example](https://github.com/alirezabashi98/Bottom-Navigation/raw/master/scr001.png)

### Step 1: Dependencies

No special or third party dependency is needed.

### Step 2: Design Layouts

There will be 4 layouts:

1. 3 Fragment layouts
2. 1 main activity layout.

**Fragment Layouts**

The general design of the fragment layouts is similar. All have a textview at the center that will display the text fro te chosen fragment:

```xml
<?xml version="1.0" encoding="utf-8"?>
<androidx.constraintlayout.widget.ConstraintLayout
    xmlns:android="http://schemas.android.com/apk/res/android" android:layout_width="match_parent"
    android:layout_height="match_parent">

    <TextView
        android:layout_width="match_parent"
        android:layout_height="match_parent"
        android:text="Learn"
        android:textSize="35dp"
        android:gravity="center"/>

</androidx.constraintlayout.widget.ConstraintLayout>
```

**MainActivity Layout**

On the other hand the main activity layout will contain a framelayout as well as the bottomnavigationview:

```xml
<?xml version="1.0" encoding="utf-8"?>
<LinearLayout xmlns:android="http://schemas.android.com/apk/res/android"
    xmlns:app="http://schemas.android.com/apk/res-auto"
    xmlns:tools="http://schemas.android.com/tools"
    android:layout_width="match_parent"
    android:layout_height="match_parent"
    android:orientation="vertical"
    tools:context=".MainActivity">

    <FrameLayout
        android:id="@+id/fragment"
        android:layout_width="match_parent"
        android:layout_height="match_parent"
        android:layout_weight="0.9"/>

    <com.google.android.material.bottomnavigation.BottomNavigationView
        android:id="@+id/bottomNav"
        android:layout_width="match_parent"
        android:layout_height="wrap_content"
        app:menu="@menu/menu_bottom_navigation"
        android:layout_weight="0.1"/>

</LinearLayout>
```

### Step 3: Create Fragments

There will be 3 fragments:

**(a). fra1.kt**

The first fragment:

```kotlin
import android.os.Bundle
import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import androidx.fragment.app.Fragment

class frag1 : Fragment() {

    override fun onCreateView(inflater: LayoutInflater,container: ViewGroup?,savedInstanceState: Bundle?): View? {
        return inflater.inflate(R.layout.fragment_1 , container , false)
    }

}
```

**(b). frag2.kt**

The code for the second fragment:

```kotlin
import android.os.Bundle
import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import androidx.fragment.app.Fragment

class frag2 : Fragment() {

    override fun onCreateView(inflater: LayoutInflater,container: ViewGroup?,savedInstanceState: Bundle?): View? {
        return inflater.inflate(R.layout.fragment_2 , container , false)
    }

}
```

**(c). frag3.kt**

The code for the third fragment:

```kotlin
import android.os.Bundle
import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import androidx.fragment.app.Fragment

class frag3 : Fragment() {

    override fun onCreateView(inflater: LayoutInflater,container: ViewGroup?,savedInstanceState: Bundle?): View? {
        return inflater.inflate(R.layout.fragment_3 , container , false)
    }

}
```

### Step 4: Create Activity

Finally you need to create an activity that will host the fragments. The major thing here is that you will have a function that will be setting a fragment to the activity via fragment transaction as follows;

```kotlin
    fun setFragment(fr : Fragment){
        val frag = supportFragmentManager.beginTransaction()
        frag.replace(R.id.fragment,fr)
        frag.commit()
    }
```

So you willb basically be invoking this method and passing in the appropriate fragment based on the bottom navigation view item selected:

```kotlin
bottomNav.setOnNavigationItemSelectedListener {menu ->

            when(menu.itemId){

                R.id.btn1 -> {
                    setFragment(frag1())
                    true
                }

                R.id.btn2 -> {
                    setFragment(frag2())
                    true
                }

                R.id.btn3 -> {
                    setFragment(frag3())
                    true
                }

                else -> false
            }
        }

    }
```

Here is the full code;

**MainActivity.kt**

```kotlin
import androidx.appcompat.app.AppCompatActivity
import android.os.Bundle
import androidx.fragment.app.Fragment
import kotlinx.android.synthetic.main.activity_main.*

class MainActivity : AppCompatActivity() {

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_main)

        bottomNav.menu.getItem(0).isCheckable = true
        setFragment(frag1())

        bottomNav.setOnNavigationItemSelectedListener {menu ->

            when(menu.itemId){

                R.id.btn1 -> {
                    setFragment(frag1())
                    true
                }

                R.id.btn2 -> {
                    setFragment(frag2())
                    true
                }

                R.id.btn3 -> {
                    setFragment(frag3())
                    true
                }

                else -> false
            }
        }

    }

    fun setFragment(fr : Fragment){
        val frag = supportFragmentManager.beginTransaction()
        frag.replace(R.id.fragment,fr)
        frag.commit()
    }

}
```

### Reference

Find the code reference links below:

| No. | Link |
| --- | --- |
| 1. | [Download](https://github.com/alirezabashi98/Bottom-Navigation/archive/refs/heads/master.zip) code |
| 2. | [Browse](https://github.com/alirezabashi98/Bottom-Navigation/) code |
| 3. | [Follow](https://github.com/alirezabashi98/) code author |

## Example 2 - BottomNavigationView with Fragments

In this lesson we want to explore BottomNavigationView examples. We want to look at as many examples as we can. Be aware that some examples may be using older support libraries, however you can easily update the code to androidx using android studio.

This example is written in Java. It teaches how to show bottom navigation with icons and connect each tab with Fragments.

When a tab is selected, its corresponding fragment is rendered as well.

### Step 1: Create Favorites Fragment

**(a). FavoritesFragmemt**

Create a Favorites Fragment:

```java
public class FavouriteFragment extends Fragment {

    public FavouriteFragment() {
    }

    @Override
    public View onCreateView(LayoutInflater inflater, ViewGroup container, Bundle savedInstanceState) {
        return inflater.inflate(R.layout.fragment_favourite, container, false);
    }
}
```

### Step 2: Create a Video Fragment

**(b). VideoFragmemt**

The Videos Fragment:

```java
public class VideoFragment extends Fragment {

    public VideoFragment() {
    }

    @Override
    public View onCreateView(LayoutInflater inflater, ViewGroup container, Bundle savedInstanceState) {
        return inflater.inflate(R.layout.fragment_video, container, false);
    }
}
```

### Step 3: Create a Music Fragment

**(c). MusicFragmemt**

The Music Fragment:

```java
public class MusicFragment extends Fragment {

    public MusicFragment() {
    }

    @Override
    public View onCreateView(LayoutInflater inflater, ViewGroup container, Bundle savedInstanceState) {
        return inflater.inflate(R.layout.fragment_music, container, false);
    }
}
```

### Step 4: Create Main Activity

**(d). MainActivity**

The activity that will host all these fragments:

```java
public class MainActivity extends AppCompatActivity {

    private Fragment fragment;
    private FragmentManager fragmentManager;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);

        fragmentManager = getSupportFragmentManager();
        fragment = new FavouriteFragment();
        final FragmentTransaction transaction = fragmentManager.beginTransaction();
        transaction.add(R.id.main_container, fragment).commit();

        BottomNavigationView bottomNavigationView = (BottomNavigationView)
                findViewById(R.id.bottom_navigation);

        bottomNavigationView.setOnNavigationItemSelectedListener(
                new BottomNavigationView.OnNavigationItemSelectedListener() {
                    @Override
                    public boolean onNavigationItemSelected(MenuItem item) {
                        switch (item.getItemId()) {
                            case R.id.action_favorites:
                                fragment = new FavouriteFragment();
                                break;
                            case R.id.action_video:
                                fragment = new VideoFragment();
                                break;
                            case R.id.action_music:
                                fragment = new MusicFragment();
                                break;
                        }
                        final FragmentTransaction transaction = fragmentManager.beginTransaction();
                        transaction.replace(R.id.main_container, fragment).commit();
                        return true;
                    }
                });
    }
}
```

### Run

If you run the project you will get the following:

![BottomNavigationview Example](https://github.com/1priyank1/BottomNavigation-Demo/raw/master/Screenshot_BottomNavigationDemo.png "BottomNavigationview Example")

### Download

| No | Link |
| --- | --- |
| 1. | [Direct Download](https://github.com/1priyank1/BottomNavigation-Demo/archive/refs/heads/master.zip) |

[Follow Project Author](https://github.com/1priyank1)

## Example 3 - BottomNavigationview with Shimmer Effect

The difference with the first example is shown in the below image:

![Bottom Navigation with Shimmer](https://camo.githubusercontent.com/e7913f4c3cdde178a01f160b25a8c61f077423620d703720237089725af4dca3/687474703a2f2f692e696d6775722e636f6d2f514e6f663951592e676966)

Lets go.

It only works if you set white color for background `android:background="@android:color/white"`

**Note** that ripple effect will disappear if you use `app:itemBackground` property.

**_Handling enabled/disabled state:_**

You need to create selector file:

```xml
<?xml version="1.0" encoding="utf-8"?>
<selector xmlns:android="http://schemas.android.com/apk/res/android">
    <item android:state_checked="true" android:color="@color/colorPrimary" />
    <item android:color="@android:color/darker_gray"  />
</selector>
```

If you want change standard grey ripple effect, change colorControlHighlight property in AppTheme so it looks like following:

```xml
<style name="AppTheme" parent="Theme.AppCompat.Light.DarkActionBar">
    <!-- Customize your theme here. -->
    <item name="colorPrimary">@color/colorPrimary</item>
    <item name="colorPrimaryDark">@color/colorPrimaryDark</item>
    <item name="colorAccent">@color/colorAccent</item>
    <item name="colorControlHighlight">@color/colorPrimaryRipple</item>
</style>
```

Use 26% alpha for colored ripples.

```xml
<color name="colorPrimary">#3F51B5</color>
<color name="colorPrimaryRipple">#423F51B5</color>
```

**MainActivity**

Here is the code:

```java

public class MainActivity extends AppCompatActivity {

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);

        BottomNavigationView bottomNavigationView = (BottomNavigationView)
                findViewById(R.id.bottom_navigation);

        final TextView textView = (TextView) findViewById(R.id.textView);

        bottomNavigationView.setOnNavigationItemSelectedListener(
                new BottomNavigationView.OnNavigationItemSelectedListener() {
                    @Override
                    public boolean onNavigationItemSelected(@NonNull MenuItem item) {
                        switch (item.getItemId()) {
                            case R.id.action_chat:
                                textView.setText(getResources().getString(R.string.text_chat));
                                break;
                            case R.id.action_offers:
                                textView.setText(getResources().getString(R.string.text_offers));
                                break;
                            case R.id.action_notifications:
                                textView.setText(getResources().getString(R.string.text_notifications));
                                break;
                        }
                        return true;
                    }
                });
    }
}
```

### Download Code

Direct [Download](https://github.com/luksha/BottomNavigationBarDemo/archive/refs/heads/master.zip)

### Credit

This code has been shared by [@Luksha](https://github.com/luksha)

## Example 4 - BottomNavigationView with Swipeable fragments

This example improves on the other examples by adding the ability to swipe from one fragment to the other. This swipe capability is added via ViewPager.

**(a). FirstFragment**

The FirstFragment code:

```java

public class FirstFragment extends Fragment {

    @Nullable
    @Override
    public View onCreateView(LayoutInflater inflater, @Nullable ViewGroup container, @Nullable Bundle savedInstanceState) {
        return inflater.inflate(R.layout.fragment_first, container, false);
    }

}
```

**(b). SecondFragment**

The SecondFragment code:

```java

public class SecondFragment extends Fragment {

    @Nullable
    @Override
    public View onCreateView(LayoutInflater inflater, @Nullable ViewGroup container, @Nullable Bundle savedInstanceState) {
        return inflater.inflate(R.layout.fragment_second, container, false);
    }
}
```

**(c). ThirdFragment**

The ThirdFragment code:

```java
public class ThirdFragment extends Fragment {

    @Nullable
    @Override
    public View onCreateView(LayoutInflater inflater, @Nullable ViewGroup container, @Nullable Bundle savedInstanceState) {
        return inflater.inflate(R.layout.fragment_third, container, false);
    }
}
```

**(d). OnPageChangeAdapter**

The OnPageChangeAdapter code:

```java

public abstract class OnPageChangeAdapter implements ViewPager.OnPageChangeListener {

    private int mFirstPosition = 0;

    public OnPageChangeAdapter(int firstPosition){
        mFirstPosition = firstPosition;
    }

    @Override
    public void onPageScrolled(int position, float positionOffset, int positionOffsetPixels) {

    }

    @Override
    public void onPageSelected(int position) {
        onPageSelected(mFirstPosition, position);
        mFirstPosition = position;
    }

    @Override
    public void onPageScrollStateChanged(int state) {

    }

    public abstract void onPageSelected(int lastposition, int position);
}
```

**(e). MainActivity**

The MainActivity code:

```java
public class MainActivity extends AppCompatActivity {

    private BottomNavigationView mNavigationMenuView;
    private ViewPager mViewPage;

    private ArrayList<Fragment> data = new ArrayList<>();

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);
        this.mViewPage = (ViewPager) findViewById(R.id.view_page);
        this.mNavigationMenuView = (BottomNavigationView) findViewById(R.id.demo_navigation);

        data.add(new FirstFragment());
        data.add(new SecondFragment());
        data.add(new ThirdFragment());

        mViewPage.setAdapter(new FragmentPagerAdapter(getSupportFragmentManager()) {
            @Override
            public Fragment getItem(int position) {
                return data.get(position);
            }

            @Override
            public int getCount() {
                return data.size();
            }
        });

        mViewPage.addOnPageChangeListener(new OnPageChangeAdapter(0) {

            @Override
            public void onPageSelected(int lastposition, int position) {
                mNavigationMenuView.getMenu().getItem(position).setChecked(true);
                mNavigationMenuView.getMenu().getItem(lastposition).setChecked(false);
            }
        });

        mNavigationMenuView.setOnNavigationItemSelectedListener(new BottomNavigationView.OnNavigationItemSelectedListener() {
            @Override
            public boolean onNavigationItemSelected(@NonNull MenuItem item) {
                switch (item.getItemId()) {
                    case R.id.action_recent:
                        mViewPage.setCurrentItem(0);
                        break;
                    case R.id.action_favorite:
                        mViewPage.setCurrentItem(1);
                        break;
                    case R.id.action_nearby:
                        mViewPage.setCurrentItem(2);
                        break;
                }
                return true;
            }
        });
    }
}
```

### Download Code

Download code below:

| No. | Link |
| --- | --- |
| 1. | [Download code](https://github.com/Yellow5A5/BottomNavigationViewDemo/archive/refs/heads/master.zip) |
| 2. | [Follow Project Author](https://github.com/Yellow5A5) |

## Example 5: Kotlin BottomNavigationView with Fragments

A `BottomNavigationView` Represents a standard bottom navigation bar for application. It is an implementation of material design bottom navigation.

Bottom navigation bars make it easy for users to explore and switch between top-level views in a single tap. They should be used when an application has three to five top-level destinations.

The bar contents can be populated by specifying a menu resource file. Each menu item title, icon and enabled state will be used for displaying bottom navigation bar items. Menu items can also be used for programmatically selecting which destination is currently active. It can be done using `MenuItem#setChecked(true)`.

Here is the demo image:

![Kotlin Android BottomNavigation Example](https://camposha.info/android-examples/wp-content/uploads/sites/9/2021/03/bottomNavigationExample.gif)

### Step 1: Create Project

Start by creating an empty `Android Studio` project.

### Step 2: Dependencies

No External dependencies are needed for this project.

### Step : Fragments

Here are our fragments:

**FragmentDashboard.kt**

```kotlin
import android.os.Bundle
import androidx.fragment.app.Fragment
import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup

class FragmentDashboard : Fragment() {

    override fun onCreateView(inflater: LayoutInflater, container: ViewGroup?, savedInstanceState: Bundle?): View? {
        return inflater!!.inflate(R.layout.fragment_dashboard, container, false)
    }

}
```

**FragmentNotification.kt**

```kotlin
import android.os.Bundle
import androidx.fragment.app.Fragment
import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup

class FragmentNotification : Fragment() {

    override fun onCreateView(inflater: LayoutInflater, container: ViewGroup?, savedInstanceState: Bundle?): View? {
        return inflater!!.inflate(R.layout.fragment_notification, container, false)
    }
}
```

**FragmentHome.kt**

```kotlin
import android.os.Bundle
import androidx.fragment.app.Fragment
import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup

class FragmentHome : Fragment() {

    /**
     * Initialize newInstance for passing parameters
     */
    companion object {
        fun newInstance(): FragmentHome {
            val fragmentHome = FragmentHome()
            val args = Bundle()
            fragmentHome.arguments = args
            return fragmentHome
        }

    }

    override fun onCreateView(inflater: LayoutInflater, container: ViewGroup?, savedInstanceState: Bundle?): View? {
        return inflater!!.inflate(R.layout.fragment_home, container, false)
    }
}
```

### Step :

**MainActivity.kt**

```kotlin
import android.os.Bundle
import com.google.android.material.bottomnavigation.BottomNavigationView
import androidx.fragment.app.Fragment
import androidx.appcompat.app.AppCompatActivity
import android.widget.FrameLayout

class MainActivity : AppCompatActivity() {

    private var content: FrameLayout? = null

    private val mOnNavigationItemSelectedListener = BottomNavigationView.OnNavigationItemSelectedListener { item ->
        when (item.itemId) {
            R.id.navigation_home -> {

                val fragment = FragmentHome.Companion.newInstance()
                addFragment(fragment)

                return@OnNavigationItemSelectedListener true
            }
            R.id.navigation_dashboard -> {
                val fragment = FragmentDashboard()
                addFragment(fragment)
                return@OnNavigationItemSelectedListener true
            }
            R.id.navigation_notifications -> {
                val fragment = FragmentNotification()
                addFragment(fragment)
                return@OnNavigationItemSelectedListener true
            }
        }
        false
    }

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_main)

        content = findViewById(R.id.content)
        val navigation = findViewById<BottomNavigationView>(R.id.navigation)
        navigation.setOnNavigationItemSelectedListener(mOnNavigationItemSelectedListener)

        val fragment = FragmentHome.Companion.newInstance()
        addFragment(fragment)
    }

    /**
     * add/replace fragment in container [FrameLayout]
     */
    private fun addFragment(fragment: Fragment) {
        supportFragmentManager
                .beginTransaction()
                .setCustomAnimations(R.anim.design_bottom_sheet_slide_in, R.anim.design_bottom_sheet_slide_out)
                .replace(R.id.content, fragment, fragment.javaClass.simpleName)
                .commit()
    }
}
```

### Run

Copy the code or download it in the link below, build and run.

### Reference

Here are the reference links:

| Number | Link |
| --- | --- |
| 1. | [Download](https://downgit.github.io/#/home?url=https://github.com/amanjeetsingh150/kotlin-android-examples/tree/master/BottomNavigationView) Example |
| 2. | [Follow](https://github.com/amanjeetsingh150/) code author |
| 3. | Code: [Apache 2.0 License](http://www.apache.org/licenses/LICENSE-2.0.txt) |

# Best Android Bottom Navigation Libraries 2022

A Bottom navigation bar is a navigation component that allows movement between primary destinations in an app. They typically display three to five destinations at the bottom of a screen. Each destination is represented by an icon and an optional text label. When a bottom navigation icon is tapped, the user is taken to the top-level navigation destination associated with that icon.

According to [material Bottom Navigation guidelines](https://material.io/components/bottom-navigation) the following  are the principals of bottom navigation:

1. Ergonomic - The bottom navigation bar should be easy to reach on a handheld mobile device.
2. Consistent - The bottom navigation bar should appear at the bottom of every screen.
3. Related - Bottom navigation bar destinations should be of equal importance.

In this blog post we explore some of the best android bottom navigation libraries. I have used some of these libraries in my projects and I plan to use some of them. These libraries are listed randomly on a first discovered, first listed manner.

### (a). BottomNavigation

_This Library helps users to use Bottom Navigation Bar (A new pattern from google) with ease and allows ton of customizations._

Here is a gif demo of this library in use:

![](https://raw.githubusercontent.com/Ashok-Varma/BottomNavigation/master/all.gif)

Here are the features of this library:

- This library is very customizale. You can attest to that by looking at the gif demo above.
- It adheres to Google's [bottom navigation bar guidelines.](https://www.google.com/design/spec/components/bottom-navigation.html)
- It allows you to select your own background and tab mode.
- You can assign each tab a seperate color
- You can render badges in the tabs. The badges can be customized.

**Installation**

Install the library using the following statement:

```groovy
implementation 'com.ashokvarma.android:bottom-navigation-bar:2.2.0'
```

**How to use**

First add the following in your xml layout:

```xml
<com.ashokvarma.bottomnavigation.BottomNavigationBar
        android:layout_gravity\="bottom"
        android:id\="@+id/bottom_navigation_bar"
        android:layout_width\="match_parent"
        android:layout_height\="wrap_content"/>
```

Then in your code, add bottom navigation items:

```java
BottomNavigationBar bottomNavigationBar = (BottomNavigationBar) findViewById(R.id.bottom_navigation_bar);

bottomNavigationBar
                .addItem(new BottomNavigationItem(R.drawable.ic_home_white_24dp, "Home"))
                .addItem(new BottomNavigationItem(R.drawable.ic_book_white_24dp, "Books"))
                .addItem(new BottomNavigationItem(R.drawable.ic_music_note_white_24dp, "Music"))
                .addItem(new BottomNavigationItem(R.drawable.ic_tv_white_24dp, "Movies & TV"))
                .addItem(new BottomNavigationItem(R.drawable.ic_videogame_asset_white_24dp, "Games"))
                .setFirstSelectedPosition(0)
                .initialise();
```

And listen to tab selection events:

```java
        bottomNavigationBar.setTabSelectedListener(new BottomNavigationBar.OnTabSelectedListener(){
            @Override
            public void onTabSelected(int position) {
            }
            @Override
            public void onTabUnselected(int position) {
            }
            @Override
            public void onTabReselected(int position) {
            }
        });
```

Read more [here](https://github.com/Ashok-Varma/BottomNavigation). Find full example [here](https://github.com/Ashok-Varma/BottomNavigation/tree/master/sample). Follow the author [here](https://github.com/Ashok-Varma/).

## (b). BottomNavigationViewEx

> An enhancement of BottomNavigationView.

This library supports API 9 and above. ![](https://camo.githubusercontent.com/15f826da582580f6b88a368b2f1ad065314177df/68747470733a2f2f696d672e736869656c64732e696f2f62616467652f4150492d392532422d677265656e2e737667)

This library supports many styles.

![](https://camposha.info/wp-content/uploads/2020/01/bottomnavigationview_styles.png) ![](https://camposha.info/wp-content/uploads/2020/01/bottomnavigationview_styles2.png)

![](https://camposha.info/wp-content/uploads/2020/01/bottomnavigationview_styles3.png)

You can use this library with ViewPager:

![](https://github.com/ittianyu/BottomNavigationViewEx/raw/master/read_me_images/with_view_pager.gif)

It also supports badges:

![](https://github.com/ittianyu/BottomNavigationViewEx/raw/master/read_me_images/view_badger.gif)

This library also supports centering a floating action button on the bottom navigation bar:

![](https://github.com/ittianyu/BottomNavigationViewEx/raw/master/read_me_images/center_fab.jpg)

**Installation**

To install this library your compile sdk version must be 25 and above:

`compileSdkVersion` >= 25

Go to your root level build.gradle and add the following:

```groovy
allprojects {
    repositories {
        ...
        maven { url "https://jitpack.io" }
        maven { url "https://maven.google.com" }
    }
}
```

Then add your implementation statement in the app level build.gradle:

```groovy
implementation 'com.github.ittianyu:BottomNavigationViewEx:2.0.4'
implementation "com.android.support:design:28.0.0"
```

**How to use it**

To use this library, first go to your xml layout and add the following:

```xml
<com.ittianyu.bottomnavigationviewex.BottomNavigationViewEx
    android:id\="@+id/bnve"
    android:layout_width\="match_parent"
    android:layout_height\="wrap_content"
    android:layout_alignParentBottom\="true"
    android:background\="@color/colorPrimary"
    app:itemIconTint\="@color/selector_item_color"
    app:itemTextColor\="@color/selector_item_color"
    app:menu\="@menu/menu_navigation_with_view_pager" />
```

Then in your java/kotlin code reference the view:

```java
BottomNavigationViewEx bnve = (BottomNavigationViewEx) findViewById(R.id.bnve);
```

If you want to disable animation:

```java
bnve.enableAnimation(false);
bnve.enableShiftingMode(false);
bnve.enableItemShiftingMode(false);
```

If you want to change text and icon size:

```java
bnve.setIconSize(widthDp, heightDp);
bnve.setTextSize(sp);
```

To connect this bottom navigation view with viewpager:

```java
// set adapter
adapter = new VpAdapter(getSupportFragmentManager(), fragments);
bind.vp.setAdapter(adapter);

// binding with ViewPager
bind.bnve.setupWithViewPager(bind.vp);
```

If you want to use a badge, then first install the badgeview:

```groovy
implementtion 'q.rorbin:badgeview:1.1.0'
```

Then:

```java
// add badge
addBadgeAt(2, 1);

private Badge addBadgeAt(int position, int number) {
    // add badge
    return new QBadgeView(this)
            .setBadgeNumber(number)
            .setGravityOffset(12, 2, true)
            .bindTarget(bind.bnve.getBottomNavigationItemView(position))
            .setOnDragStateChangedListener(new Badge.OnDragStateChangedListener() {
                @Override
                public void onDragStateChanged(int dragState, Badge badge, View targetView) {
                    if (Badge.OnDragStateChangedListener.STATE_SUCCEED == dragState)
                        Toast.makeText(BadgeViewActivity.this, R.string.tips_badge_removed, Toast.LENGTH_SHORT).show();
                }
            });
}
```

NB/= Other usages with this library are the same as the official [BottomNavigationView](https://developer.android.com/reference/android/support/design/widget/BottomNavigationView.html).

Read more [here](https://github.com/ittianyu/BottomNavigationViewEx). Find full example [here](https://github.com/ittianyu/BottomNavigationViewEx/tree/master/app). Follow the author [here](https://github.com/ittianyu).

## (c). Material-BottomNavigation

> Bottom Navigation widget component inspired by the Google Material Design Guidelines at [Design Specs](https://www.google.com/design/spec/components/bottom-navigation.html).

Here is the demo:

![Material-BottomNavigation Library](https://github.com/sephiroth74/Material-BottomNavigation/raw/master/art/animated_video.gif)

### Step 1: Install it

To use it you start by installing it:

```groovy
implementation 'it.sephiroth.android.library.bottomnavigation:bottom-navigation:3.0.0'
```

### Step 2: Create Menu

Next create a menu resource file to contain bottomnavigation items:

```xml
<?xml version="1.0" encoding="utf-8"?>
<menu xmlns:android="http://schemas.android.com/apk/res/android"
    xmlns:app="http://schemas.android.com/apk/res-auto"
    android:background="@android:color/black"
    app:bbn_badgeColor="#FFFF0000"
    app:bbn_rippleColor="#33ffffff">
    <item
        android:id="@+id/bbn_item1"
        android:color="@color/colorPrimary"
        android:icon="@drawable/ic_cloud_off_white_24dp"
        android:title="Cloud Sync" />
    <item
        android:id="@+id/bbn_item2"
        android:color="@android:color/holo_green_dark"
        android:icon="@drawable/ic_cast_connected_white_24dp"
        android:title="Chromecast" />
    <item
        android:id="@+id/bbn_item3"
        android:color="@android:color/holo_orange_dark"
        android:icon="@drawable/ic_mail_white_24dp"
        android:title="Mail" />
    <item
        android:id="@+id/action4"
        android:color="#FF5252"
        android:icon="@drawable/ic_format_list_numbered_white_24dp"
        android:title="List" />
</menu>
```

### Step 3: Add to Layout

The next step is to add the bottomnavigation to your xml layout:

```xml
<?xml version="1.0" encoding="utf-8"?>
<androidx.coordinatorlayout.widget.CoordinatorLayout android:id="@+id/CoordinatorLayout01"
    xmlns:android="http://schemas.android.com/apk/res/android"
    xmlns:app="http://schemas.android.com/apk/res-auto"
    android:layout_width="match_parent"
    android:layout_height="match_parent"
    android:fitsSystemWindows="true">

    ...your content...

    <it.sephiroth.android.library.bottomnavigation.BottomNavigation
        android:id="@+id/BottomNavigation"
        android:layout_width="match_parent"
        android:layout_height="wrap_content"
        android:layout_gravity="bottom"
        app:bbn_entries="@menu/bottombar_menu_4items"
        app:bbn_scrollEnabled="true"
        app:bbn_badgeProvider="@string/bbn_badgeProvider"
        app:layout_behavior="@string/bbn_phone_view_behavior" />
</androidx.coordinatorlayout.widget.CoordinatorLayout>
```

### Step 4: Write Code

next you can simply reference the bottomnavigation view in your code and use it.

### Adding Badges

We can also add badges in bottomnavigation items as follows:

![](https://raw.githubusercontent.com/sephiroth74/Material-BottomNavigation/master/art/badges1.png)

Here's the code to do it:

```java
    final BadgeProvider provider = bottomNavigationView.getBadgeProvider();
    provider.show(R.id.bbn_item3);
```

To remove the badge use the following code:

```java
  bottomNavigation.getBadgeProvider().remove(R.id.bbn_item3);
```

### Reference

Here are the links:

| No. | Link |
| --- | --- |
| 1. | [Read more](https://github.com/sephiroth74/Material-BottomNavigation/) |
| 2. | [Examples](https://github.com/sephiroth74/Material-BottomNavigation/tree/master/app) |

# Other Bottom Navigation Libraries

## (a). BottomBar (Deprecated)

> A custom view component that mimics the new Material Design Bottom Navigation pattern.

Here is the demo of bottombar:

![BottomBar](https://raw.githubusercontent.com/roughike/BottomBar/master/graphics/shifting-demo.gif)

### Step 1: Install it

You start by installing it as below:

### Step 2: Create menu

You then create the menu resource file:

```xml
<tabs>
    <tab
        id="@+id/tab_favorites"
        icon="@drawable/ic_favorites"
        title="Favorites" />
    <tab
        id="@+id/tab_nearby"
        icon="@drawable/ic_nearby"
        title="Nearby" />
    <tab
        id="@+id/tab_friends"
        icon="@drawable/ic_friends"
        title="Friends" />
</tabs>
```

### Step 3: Add to Layout

Next you add it to your XML layout:

```xml
<RelativeLayout xmlns:android="http://schemas.android.com/apk/res/android"
    android:layout_width="match_parent"
    android:layout_height="match_parent"
    xmlns:app="http://schemas.android.com/apk/res-auto">

    <!-- This could be your fragment container, or something -->
    <FrameLayout
        android:id="@+id/contentContainer"
        android:layout_width="match_parent"
        android:layout_height="match_parent"
        android:layout_above="@+id/bottomBar" />

    <com.roughike.bottombar.BottomBar
        android:id="@+id/bottomBar"
        android:layout_width="match_parent"
        android:layout_height="60dp"
        android:layout_alignParentBottom="true"
        app:bb_tabXmlResource="@xml/bottombar_tabs" />

</RelativeLayout>
```

### Step 4: Write Code

Then you write code, for example listen to selection events of the bottombar items:

```java
public class MainActivity extends Activity {
    @Override
    protected void onCreate(@Nullable Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);

        BottomBar bottomBar = (BottomBar) findViewById(R.id.bottomBar);
        bottomBar.setOnTabSelectListener(new OnTabSelectListener() {
            @Override
            public void onTabSelected(@IdRes int tabId) {
                if (tabId == R.id.tab_favorites) {
                    // The tab with id R.id.tab_favorites was selected,
                    // change your content accordingly.
                }
            }
        });
    }
}
```

### Reference

Here are the links:

| No. | Link |
| --- | --- |
| 1. | [Read more](https://github.com/roughike/BottomBar/) |
| 2. | [Examples](https://github.com/roughike/BottomBar/tree/master/app) |

### Conclusion

> Bottom Navigation Makes it Easier for Users to Find What They Need.

In this tutorial we've looked at an extensive list of android examples that teach us how to use bottomnavigation. We've also looked at that is BottomNavigationBar and it's usage's best practices. We've then seen its advantages.


