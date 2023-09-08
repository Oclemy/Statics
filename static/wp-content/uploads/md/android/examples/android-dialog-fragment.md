# Kotlin Android DialogFragment Examples

The most flexible way to create a dialog is not by using `andorid.app.Dialog` class but by using `DialogFragment` class. Through this you get full fragment capability including the ability to observe the dialog lifecycle as well as utilize ViewModels.


#### What is a DialogFragment?

A DialogFragment is a fragment that displays a dialog window, floating on top of its activity's window. This fragment contains a Dialog object, which it displays as appropriate based on the fragment's state.

In this class we use the support dialogfragment since the framework `android.app.dialogFragment` was deprecated in API level 28.

Our implementation will override this class and implement the` onCreateView(LayoutInflater, ViewGroup, Bundle)` to supply the content of the dialog. Alternatively, we can override `onCreateDialog(Bundle)` to create an entirely custom dialog, such as an `AlertDialog`, with its own content.

In this article we will be learning the following:

1. Creating a dialog with ListView in kotlin.
2. Using DialogFragment to create dialog with custom layoutt such as alertdialogs, input dialogs etc.
3. Creating popup menus

## (a). Kotlin Android DialogFragment with ListView

_Kotlin Android DialogFragment with [ListView](https://camposha.info/android/listview) tutorial._

We want to see how to open a DialogFragment when a simple button is clicked. The dialogFragment will comprise of a title and a listview.

We infact inflate it via the LayoutInflater class from an xml layout specification.

When the user clicks a ListView item we show it in a Toast. When the user clicks outside the DialogFragment, we dismiss it(the DialogFragment).

Let's go.

#### Kotlin Android DialogFragment with Simple ListView

Let's look at a complete example.

#### Tools

1. IDE: [Android Studio](https://camposha.info/android/android-studio) - android's offical android IDE supported by Jetbrains and Google.
2. Language : Kotlin -Statically Typed Language first developed by Jetbrains.
3. Emulator : Nox Player - An emulator fast enough for my slow machine.

#### Gradle Scripts

We start by exploring our gradle scripts.

##### (a). build.gradle(App)

Here's our **app level** `build.gradle` file. We have the dependencies DSL where we add our dependencies.

This file is called app level `build.gradle` since it's located in the app folder of the project.

If you are using Android Studio version 3 and above use `implementation` keyword while if you are using a version less than 3 then still use the `compile` keyword.

Once you've modified this `build.gradle` file you have to sync your project. Android Studio will indeed prompt you to do so.

```groovy
apply plugin: 'com.android.application'

apply plugin: 'kotlin-android'

apply plugin: 'kotlin-android-extensions'

android {
    compileSdkVersion 28
    defaultConfig {
        applicationId "info.camposha.kotlindialogfragment"
        minSdkVersion 15
        targetSdkVersion 28
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
    implementation fileTree(dir: 'libs', include: ['*.jar'])
    implementation"org.jetbrains.kotlin:kotlin-stdlib-jre7:$kotlin_version"
    implementation 'com.android.support:appcompat-v7:28.0.0-rc01'
}
```

You can also see that we have started by applying two kotlin-specific plugins in our build.gradle file:

```groovy
apply plugin: 'kotlin-android'
apply plugin: 'kotlin-android-extensions'
```

that is `kotlin-android` and `kotlin-android-extensions`.

#### Kotlin Code

Android apps can be mainly written in Java or Kotlin. These days however there are many frameworks like Flutter also which use languages like Dart.

In this class we are using Kotlin programming language.

We will have these classes in our project.

#### (a). PioneersFragment.kt

Represents our FragmentDialog and will infact derive from it.

**1\. Creating a DialogFragment**

We start by creating a Kotlin class that derives from `android.support.v4.app.DialogFragment`. We use the support library fragment since `android.app.DialogFragment` is deprecated.

```kotlin
class PioneersFragment : DialogFragment() {..}
```

Note that the above statement has included a default empty constructor for our `DialogFragment`. We do this using the brackets(`()`) in Kotlin.

**2\. Overriding DialogFragment's OnCreateView()**

We will then override the `onCreateView()` method of the [Fragment](https://camposha.info/android/fragment) class.

```kotlin
 override fun onCreateView(inflater: LayoutInflater, container: ViewGroup?, savedInstanceState: Bundle?): View? {..}
```

We've passed three parameters:

1. LayoutInflater object.
2. ViewGroup object.
3. Bundle object.

**3\. Inflating a Layout into a DialogFragment**

Inside the method first we inflate the `R.layout.fraglayout` layout via the `inflate` method, using the `LayoutInflater` instance.

```kotlin
        val rootView = inflater.inflate(R.layout.fraglayout, container)
```

**4\. Creating a Kotlin Array**

Then create a Kotlin array using the `arrayOf()` method. This will act as our data source to host pioneers. This is what we will bind to the [ListView](https://camposha.info/android/listview) which we will show in our DialogFragment.

```kotlin
var pioneers = arrayOf("Dennis Ritchie", "Rodney Brooks", "Sergey Brin", "Larry Page", "Cynthia Breazeal", "Jeffrey Bezos", "Berners-Lee Tim", "Centaurus A", "Virgo Stellar Stream")
```

**5\. Binding a ListView to Kotlin Array using ArrayAdapter**

We then reference our [ListView](https://camposha.info/android/listview) and set it's adapter. We will use arrayadapter.

```kotlin
        val myListView = rootView.findViewById(R.id.myListView) as ListView
        myListView!!.adapter = ArrayAdapter<String>(activity, android.R.layout.simple_list_item_1, pioneers)
```

**6\. Setting a DialogFragment Title**

We set the DialogFragment's title using the `setTitle()` method, you pass a String to this method.

```kotlin
        this.dialog.setTitle("Tech Pioneers")
```

**7\. Listening to ListView's Click events in Kotlin**

Let's say we want to show a Toast message when a ListView is clicked, showing the clicked item:

```kotlin
        myListView.setOnItemClickListener {
            adapterView,
            view,
            position,
            l
            -> Toast.makeText(activity, pioneers[position], Toast.LENGTH_SHORT).show()
        }
```

Here's the full code of `PioneersFragment` class:

```kotlin
package info.camposha.kotlindialogfragment

import android.os.Bundle
import android.support.v4.app.DialogFragment
import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import android.widget.ArrayAdapter
import android.widget.ListView
import android.widget.Toast

class PioneersFragment : DialogFragment() {

    override fun onCreateView(inflater: LayoutInflater, container: ViewGroup?, savedInstanceState: Bundle?): View? {
        val rootView = inflater.inflate(R.layout.fraglayout, container)
        var pioneers = arrayOf("Dennis Ritchie", "Rodney Brooks", "Sergey Brin", "Larry Page", "Cynthia Breazeal", "Jeffrey Bezos", "Berners-Lee Tim", "Centaurus A", "Virgo Stellar Stream")

        val myListView = rootView.findViewById(R.id.myListView) as ListView
        //with arrayadapter you have to pass a textview as a resource, and that is simple_list_item_1
        myListView!!.adapter = ArrayAdapter<String>(activity, android.R.layout.simple_list_item_1, pioneers)

        this.dialog.setTitle("Tech Pioneers")

        myListView.setOnItemClickListener {
            adapterView,
            view,
            position,
            l
            -> Toast.makeText(activity, pioneers[position], Toast.LENGTH_SHORT).show()
        }

        return rootView
    }
}
```

##### (c). MainActivity.kt

This is our MainActivity. It will contain a button that when clicked will show or open our DialogFragment.

**1\. Create an Activity in Kotlin**

You just create a class, give it an identifier then make it derive from `android.support.v7.app.AppCompatActivity`:

```kotlin
class MainActivity : AppCompatActivity() {..}
```

**2\. Override the Activity's onCreate() method**

The `onCreate()` is a method that gets raised when our [activity's](https://camposha.info/android/activity) being created.

Here we call the `onCreate()` method of the `super class`. Then we use the `setContentView()` method to inflate our `activity_main.xml`:

```
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_main)
```

**3\. Referencing Widgets in Kotlin**

You can reference widgets from their respective layout using the `findViewById()` method of the [activity](https://camposha.info/android/activity).

Like we do with our button.

```kotlin
        val openFragmentBtn = findViewById(R.id.openFragmentID) as Button
```

**4\. Obtain an Activity's FragmentManager**

[Fragments](https://camposha.info/android/fragment) get hosted by [Activities](https://camposha.info/android/activity). Hence an activity maintains a `supportFragmentManager` as a property.

We can obtain it this way:

```kotlin
        val fm = supportFragmentManager
```

**5\. Open/Show a Fragment**

We can open a Fragment or show it. But first we have to instantiate that Fragment:

```kotlin
        val pioneersFragment = PioneersFragment()
```

Then we can open it when the user clicks a button by invoking the `show()` method of the `Fragment` class:

```kotlin

        openFragmentBtn.setOnClickListener(object : View.OnClickListener {
            override fun onClick(view: View) {
                pioneersFragment.show(fm, "PioneersFragment_tag")
            }
        })
```

Here's the full code of the `MainActivity`:

```kotlin
package info.camposha.kotlindialogfragment

import android.support.v7.app.AppCompatActivity
import android.os.Bundle
import android.view.View
import android.widget.Button

class MainActivity : AppCompatActivity() {

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_main)

        val openFragmentBtn = findViewById(R.id.openFragmentID) as Button

        val fm = supportFragmentManager
        val pioneersFragment = PioneersFragment()

        openFragmentBtn.setOnClickListener(object : View.OnClickListener {
            override fun onClick(view: View) {
                pioneersFragment.show(fm, "PioneersFragment_tag")
            }
        })
    }
}
//end
```

#### Layout Resources

##### (a). activity_main.xml

This is our main activity's layout. It will contain our Button which when clicked will open our DialogFragment.

This layout will get inflated into the main activity's user interface. This will happen via the Activity's `setContentView()` method which will require us to pass it the layout.

We will do so inside the `onCreate()` method of [Activity](https://camposha.info/android/activity).

We use the following elements:

1. [RelativeLayout](https://camposha.info/android/relativelayout)
2. Button

```xml
<?xml version="1.0" encoding="utf-8"?>
<RelativeLayout

    android_layout_width="match_parent"
    android_layout_height="match_parent"
    tools_context=".MainActivity">

    <Button
        android_id="@+id/openFragmentID"
        android_text="Open Fragment"
        android_background="@color/colorAccent"
        android_layout_centerInParent="true"
        android_layout_width="wrap_content"
        android_layout_height="wrap_content" />

</RelativeLayout>
```

##### (b). fraglayout.xml

Our DialogFragment layout. This layout be inflated into the user interface for our Dialog Fragment.

It will contain a simple ListView.

```xml
<?xml version="1.0" encoding="utf-8"?>
<LinearLayout
    android_orientation="vertical" android_layout_width="match_parent"
    android_layout_height="match_parent">

    <ListView
        android_id="@+id/myListView"
        android_layout_width="match_parent"
        android_layout_height="wrap_content"/>

</LinearLayout>
```

#### Value Resources

##### (a). colors.xml

Our material design colors:

```xml
<?xml version="1.0" encoding="utf-8"?>
<resources>
    <color name="colorPrimary">#3F51B5</color>
    <color name="colorPrimaryDark">#303F9F</color>
    <color name="colorAccent">#FF4081</color>
    <color name="material_amber_700">#ffffa000</color>
    <color name="material_amber_800">#ffff8f00</color>
    <color name="material_amber_900">#ffff6f00</color>
    <color name="material_amber_A100">#ffffe57f</color>
    <color name="material_amber_A200">#ffffd740</color>
    <color name="material_amber_A400">#ffffc400</color>

</resources>
```

##### (b). styles.xml

Our application's style.

```xml
<resources>

    <!-- Base application theme. -->
    <style name="AppTheme" parent="Theme.AppCompat.Light.DarkActionBar">
        <!-- Customize your theme here. -->
        <item name="colorPrimary">@color/material_amber_A400</item>
        <item name="colorPrimaryDark">@color/material_amber_900</item>
        <item name="colorAccent">@color/colorAccent</item>
    </style>

</resources>
```

## (b). Android DialogFragment - Show RecyclerView

_This example will show a recyclerview in diaogfragment._

When the user clicks a show button we open a dialogfragment, displaying a RecyclerView on it.

#### Project Summary

| No. | File | Major Responsibility |
| --- | --- | --- |
| 1. | MyHolder.java | RecyclerView ViewHolder class. |
| 2. | MyAdapter.java | RecyclerView data adapter class |
| 3. | TVShowFragment.java | DialogFragment class |
| 4. | MainActivity.java | Activity class |
| 5. | activity_layout.xml | To be inflated to MainActivity |
| 6. | content_main.xml | To be included inside the activity_main.xml.We add our veiws and widgets here. |
| 7. | fraglayout.xml | The layout to be inflated to our custom dialog fragment. |
| 8. | model.xml | To model how each recyclerview item will appear |

#### 1\. Create Basic Activity Project

1. First create an empty project in android studio. Go to File --> New Project.
2. Type the application name and choose the company name.
3. Choose minimum SDK.
4. Choose Basic activity.
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

#### 3\. Create User Interface

Here are our layouts for this project:

**activity_main.xml**

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
    tools_context="com.tutorials.hp.dialogfragmentrecyclerview.MainActivity">

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

**content_main.xml**

This layout gets included in your activity_main.xml. You define your UI widgets right here.

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
    tools_context="com.tutorials.hp.dialogfragmentrecyclerview.MainActivity"
    tools_showIn="@layout/activity_main">

    <TextView
        android_layout_width="wrap_content"
        android_layout_height="wrap_content"
        android_text="Hello World!" />
</RelativeLayout>
```

##### fraglayout.xml

This layout will be inflated to our dialog fragment.

It will contain our RecyclerView as our adapterview:

```xml
<?xml version="1.0" encoding="utf-8"?>
<LinearLayout
    android_orientation="vertical" android_layout_width="match_parent"
    android_layout_height="match_parent">

    <android.support.v7.widget.RecyclerView
        android_id="@+id/mRecyerID"
        android_layout_width="match_parent"
        android_layout_height="wrap_content"></android.support.v7.widget.RecyclerView>

</LinearLayout>
```

##### model.xml

This will layout will be inflated into the View items for our RecyclerView.

Basically a CardView for each recyclerview item.

Contains a simple TextView:

```xml
<?xml version="1.0" encoding="utf-8"?>
<android.support.v7.widget.CardView
    android_id="@+id/mCard"
    android_orientation="horizontal"
    android_layout_width="match_parent"

    android_layout_margin="10dp"
    card_view_cardCornerRadius="10dp"
    card_view_cardElevation="10dp"

    android_layout_height="wrap_content">

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

#### 4\. Create Java Classes

Android apps are written in Java programming language so lets create some classes.

##### 1\. MyHolder.java

Our ViewHolder class.

```java
package com.tutorials.hp.dialogfragmentrecyclerview.mRecycler;

import android.support.v7.widget.RecyclerView;
import android.view.View;
import android.widget.TextView;
import com.tutorials.hp.dialogfragmentrecyclerview.R;

public class MyHolder extends RecyclerView.ViewHolder {

    TextView nameTxt;

    public MyHolder(View itemView) {
        super(itemView);
        nameTxt= (TextView) itemView.findViewById(R.id.nameTxt);
    }
}
```

##### 2\. MyAdapter.java

Our recyclerview adapter class:

```java
package com.tutorials.hp.dialogfragmentrecyclerview.mRecycler;

import android.content.Context;
import android.support.v7.widget.RecyclerView;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;

import com.tutorials.hp.dialogfragmentrecyclerview.R;

public class MyAdapter extends RecyclerView.Adapter<MyHolder> {

    Context c;
    String[] tvshows;

    public MyAdapter(Context c, String[] tvshows) {
        this.c = c;
        this.tvshows = tvshows;
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
       holder.nameTxt.setText(tvshows[position]);
    }

    @Override
    public int getItemCount() {
        return tvshows.length;
    }
}
```

##### TVShowFragment.java

This is our DialogFragment. It derives from android.app.DiloagFragment.

This class will show our RecyclerView:

```java
package com.tutorials.hp.dialogfragmentrecyclerview;

import android.app.DialogFragment;
import android.os.Bundle;
import android.support.annotation.Nullable;
import android.support.v7.widget.LinearLayoutManager;
import android.support.v7.widget.RecyclerView;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;

import com.tutorials.hp.dialogfragmentrecyclerview.mRecycler.MyAdapter;

public class TVShowFragment extends DialogFragment {

    String[] tvshows={"Crisis","Blindspot","BlackList","Game of Thrones","Gotham","Banshee"};
    RecyclerView rv;
    MyAdapter adapter;

    @Nullable
    @Override
    public View onCreateView(LayoutInflater inflater, ViewGroup container, Bundle savedInstanceState) {

        View rootView=inflater.inflate(R.layout.fraglayout,container);

        //RECYCER
        rv= (RecyclerView) rootView.findViewById(R.id.mRecyerID);
        rv.setLayoutManager(new LinearLayoutManager(this.getActivity()));

        //ADAPTER
        adapter=new MyAdapter(this.getActivity(),tvshows);
        rv.setAdapter(adapter);

        this.getDialog().setTitle("TV Shows");

        return rootView;
    }
}
```

### 4\. MainActivity.java

Our MainActivity. It will contain a button that when clicked will show our DialogFragment:

```java
package com.tutorials.hp.dialogfragmentrecyclerview;

import android.app.FragmentManager;
import android.os.Bundle;
import android.support.design.widget.FloatingActionButton;
import android.support.design.widget.Snackbar;
import android.support.v7.app.AppCompatActivity;
import android.support.v7.widget.Toolbar;
import android.view.View;
import android.view.Menu;
import android.view.MenuItem;

public class MainActivity extends AppCompatActivity {

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);
        Toolbar toolbar = (Toolbar) findViewById(R.id.toolbar);
        setSupportActionBar(toolbar);
        FloatingActionButton fab = (FloatingActionButton) findViewById(R.id.fab);

         final FragmentManager fm=getFragmentManager();
        final  TVShowFragment tv=new TVShowFragment();

        fab.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View view) {
              tv.show(fm,"TV_tag");
            }
        });
    }

}
```

## Example 2 - Android DialogFragment - ListView Search/Filter

The idea of dialogs is great because we can pop them out from nowhere. The user can then perform his thing then dismiss the dialog.

In this example we create a dialogfragment that gets displayed when a simple button is clicked from our main [activity](https://camposha.info/android/activity).

Our dialogfragment will contain a simple ListView and a SearchView. The ListView will contain a List of players.

The searchview can then be used to search the players from the list.

## **1\. Our MainActivity Class**

This is our main activity.

As a class it's an [activity](https://camposha.info/android/activity) since it derives from `android.app.Activity`.

| No. | Responsibility |
| --- | --- |
| 1. | It is our launcher and only activity. |
| 2. | It will contain a button which when clicked we show a dialogfragment. |
| 3. | It maintains a FragmentManager which helps in showing of our dialogfragment. |

```java
package com.tutorials.dialogfragmenter;

import android.app.Activity;
import android.app.FragmentManager;
import android.os.Bundle;
import android.view.Menu;
import android.view.View;
import android.view.View.OnClickListener;
import android.widget.Button;

public class MainActivity extends Activity {

  Button btn;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);

        final FragmentManager fm=getFragmentManager();
        final PlayersFragment p=new PlayersFragment();

        btn=(Button) findViewById(R.id.button1);
        btn.setOnClickListener(new OnClickListener() {

      @Override
      public void onClick(View arg0) {
        // TODO Auto-generated method stub
        p.show(fm, "Best Players");
      }
    });
    }

    @Override
    public boolean onCreateOptionsMenu(Menu menu) {
        // Inflate the menu; this adds items to the action bar if it is present.
        getMenuInflater().inflate(R.menu.main, menu);
        return true;
    }

}
```

## **2\. Our PlayerFragment class.**

This is our PlayerFragment class.

| No. | Responsibility |
| --- | --- |
| 1. | Derives from `android.app.DialogFragment` hence making it a DialogFragment. |
| 2. | We'll reference a ListView and SearchView here. ListView will be our adapterview while we'll use a searchview for inputting our search terms. |
| 3. | We'll dismiss our dialogfragment when the dismiss button is clicked. |

```java
package com.tutorials.dialogfragmenter;

import android.app.DialogFragment;
import android.os.Bundle;
import android.view.LayoutInflater;
import android.view.View;
import android.view.View.OnClickListener;
import android.view.ViewGroup;
import android.widget.ArrayAdapter;
import android.widget.Button;
import android.widget.ListView;
import android.widget.SearchView;
import android.widget.SearchView.OnQueryTextListener;

public class PlayersFragment extends DialogFragment {

  Button btn;
  ListView lv;
  SearchView sv;
  ArrayAdapter<String> adapter;
  String[] players={"Lionel Messi","Christiano Ronaldo","Neymar","Gareth Bale"};

  @Override
  public View onCreateView(LayoutInflater inflater, ViewGroup container,
      Bundle savedInstanceState) {
    // TODO Auto-generated method stub
    View rootView=inflater.inflate(R.layout.sports, null);

    //SET TITLE DIALOG TITLE
    getDialog().setTitle("Best Players In The World");

    //BUTTON,LISTVIEW,SEARCHVIEW INITIALIZATIONS
    lv=(ListView) rootView.findViewById(R.id.listView1);
    sv=(SearchView) rootView.findViewById(R.id.searchView1);
    btn=(Button) rootView.findViewById(R.id.dismiss);

    //CREATE AND SET ADAPTER TO LISTVIEW
    adapter=new ArrayAdapter<String>(getActivity(), android.R.layout.simple_list_item_1,players);
    lv.setAdapter(adapter);

    //SEARCH
    sv.setQueryHint("Search..");
    sv.setOnQueryTextListener(new OnQueryTextListener() {

      @Override
      public boolean onQueryTextSubmit(String txt) {
        // TODO Auto-generated method stub
        return false;
      }

      @Override
      public boolean onQueryTextChange(String txt) {
        // TODO Auto-generated method stub

        adapter.getFilter().filter(txt);
        return false;
      }
    });

    //BUTTON
    btn.setOnClickListener(new OnClickListener() {

      @Override
      public void onClick(View arg0) {
        // TODO Auto-generated method stub
        dismiss();
      }
    });

    return rootView;
  }

}
```

## **3\. Our MainActivity Layout**

This is our main activity layout.

| No. | Responsibility |
| --- | --- |
| 1. | Contains a button that when clicked will open our dialogfragment. |

```xml
<RelativeLayout

    android_layout_width="match_parent"
    android_layout_height="match_parent"
    android_paddingBottom="@dimen/activity_vertical_margin"
    android_paddingLeft="@dimen/activity_horizontal_margin"
    android_paddingRight="@dimen/activity_horizontal_margin"
    android_paddingTop="@dimen/activity_vertical_margin"
    tools_context=".MainActivity" >

    <Button
        android_id="@+id/button1"
        android_layout_width="wrap_content"
        android_layout_height="wrap_content"
        android_layout_alignParentLeft="true"
        android_layout_alignParentTop="true"
        android_layout_marginLeft="97dp"
        android_layout_marginTop="163dp"
        android_text="Show" />

</RelativeLayout>
```

## **4\. OUR PlayerFragment Layout**

This is our dialog fragment's layout.

Here are it's roles:

| No. | Responsibility |
| --- | --- |
| 1. | Define a ListView which will display of list of items. |
| 2. | Define a SearchView for searching/filtering our data. |
| 3. | Define a button for dismissing our dialogfragment. |

```xml
<?xml version="1.0" encoding="utf-8"?>
<LinearLayout
    android_layout_width="match_parent"
    android_layout_height="match_parent"
    android_orientation="vertical" >

    <SearchView
        android_id="@+id/searchView1"
        android_layout_width="match_parent"
        android_layout_height="wrap_content" >
    </SearchView>

    <ListView
        android_id="@+id/listView1"
        android_layout_width="match_parent"
        android_layout_height="326dp" >
    </ListView>

    <Button
        android_id="@+id/dismiss"
        android_layout_width="match_parent"
        android_layout_height="wrap_content"
        android_text="Dismiss" />

</LinearLayout>
```

## **Our Manifest**

Our android manifest.xml. Our activity is registered here.

```xml
<?xml version="1.0" encoding="utf-8"?>
<manifest
    package="com.tutorials.dialogfragmenter"
    android_versionCode="1"
    android_versionName="1.0" >

    <uses-sdk
        android_minSdkVersion="19"
        android_targetSdkVersion="19" />

    <application
        android_allowBackup="true"
        android_icon="@drawable/ic_launcher"
        android_label="@string/app_name"
        android_theme="@style/AppTheme" >
        <activity
            android_name="com.tutorials.dialogfragmenter.MainActivity"
            android_label="@string/app_name" >
            <intent-filter>
                <action android_name="android.intent.action.MAIN" />

                <category android_name="android.intent.category.LAUNCHER" />
            </intent-filter>
        </activity>
    </application>

</manifest>
```
