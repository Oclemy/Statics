# ExpandableListView Examples


_Android ExpandableListView Tutorial and Examples._

An ExpandableListView is a view that shows items in a vertically scrolling two-level list. You can imagine it's a form of a ListView given the name or the fact that it derives from it, however `ExpandableListView` is obviously more complex in that it's view items can be expanded and collapsed.

It allows two levels:

1. groups which can individually be expanded
2. children shown when the groups are expanded.

Powering `ExpandableListView` is the `ExpandableListAdapter`. It is this adapter that supplies items to populate our `ExpandableListView`.


#### ExpandableListView API Definition.

ExpandableListView isn't young, even if alot of developers haven't used it yet. It has existed since the beginning of android, API level 1.

As a class it derives from [ListView](/android/listview:

```java
public class ExpandableListView extends ListView
```

Both reside in the `android.widget` package.

Here's `ExpandableListView`'s inheritance hierarchy:

```java
java.lang.Object
   ↳    android.view.View
       ↳    android.view.ViewGroup
           ↳    android.widget.AdapterView<android.widget.ListAdapter>
               ↳    android.widget.AbsListView
                   ↳    android.widget.ListView
                       ↳    android.widget.ExpandableListView
```

#### States and Indicators

Beside the item views in your ExpandableListView normally you see an indicator. This visually notifies you that you need to either expand to see more content or close the child. They tell you the current state of the expandable listview.

These states can be:

1. Expanded group.
2. Collapsed group
3. Child
4. Last child).

These indicators can be set using the `setChildIndicator(Drawable)` or `setGroupIndicator(Drawable)` (or the corresponding XML attributes).

The default style for an `ExpandableListView` provides indicators which will be shown next to Views given to the ExpandableListView.

The layouts `android.R.layout.simple_expandable_list_item_1` and `android.R.layout.simple_expandable_list_item_2` (which should be used with `SimpleCursorTreeAdapter`) contain the preferred position information for indicators.

You can find more documentation about ExpandableListView [here](https://developer.android.com/reference/android/widget/ExpandableListView).

## Example 1: Android ExpandableListView with Images and Text

_Android ExpandableListView tutorial with images and text tutorial._

Everyone knows and loves android listviews.However, listviews have a more powerful sister known as `ExpandableListeView`. These are views that show items in a vertically scrolling two-level list.

This is powerful when you want to group items in a list. The items groups can be expanded to show their children, which are also lists themselves. ExpandableListViews should not be confused with accordions.

They are lists inside list items. ExpandableListView items come from ExpandableListAdapter. ExpandableListViews do derive from ListViews, hence having the flexibility and capability of Listviews themselves.

They are simply ListViews nested inside ListView Items. They were added to android in API Level 1, so have actually been around for along time even though most people are obsessed with ListViews and RecyclerViews.

#### What is ExpandableListView?

An ExpandableListView is a view that shows items in a vertically scrolling two-level list. You can imagine it's a form of a ListView given the name or the fact that it derives from it, however `ExpandableListView` is obviously more complex in that it's view items can be expanded and collapsed.

It allows two levels:

1. groups which can individually be expanded
2. children shown when the groups are expanded.

Powering `ExpandableListView` is the `ExpandableListAdapter`. It is this adapter that supplies items to populate our `ExpandableListView`.

In this tutorial, we look at ExpandableListView with images and text. You can find more details about ExpandableListViews [here](https://developer.android.com/reference/android/widget/ExpandableListView.html).

##### Screenshot

- Here’s the screenshot of the project.

ExpandableListView Android

![Android ExpandableListView ](https://image.prntscr.com/image/R1j5cuqiQxe73HzwiMlZ5w.png)

- Android ExpandableListView example.
- Show expandableListView with images and text in android.
- Android Eclipse tutorial.
- Group items with expandableListView.

#### Tools Used

This example was written with the following tools:

1. Operating System : Windows 7
2. IDE : Eclipse IDE
3. Language : Java

#### Advantages of ExpandableListViews

| No. | Advantage |
| --- | --- |
| 1. | It is the easiest way to show grouped items in android development. |
| 2. | It is an inbuilt adapterview hence no need for third party libraries.ExpandableListViews have existed since the very first version of Android. |
| 3. | It's as customizable and as powerful as ListViews since it's actually the latter's child. |

#### 1\. Create User Interface

User interfaces are typically created in android using XML layouts as opposed by direct java coding.

This is an example fo declarative programming.

##### Advantages of Using XML over Java

| No. | Advantage |
| --- | --- |
| 1. | Declarative creation of widgets and views allows us to use a declarative language XML which makes is easier. |
| 2. | It's easily maintanable as the user interface is decoupled from your Java logic. |
| 3. | It's easier to share or download code and safely test them before runtime. |
| 4. | You can use XML generated tools to generate XML |

Here are our layouts for this project:

##### (a). activity_main.xml

- This layout gets inflated to MainActivity user interface.
- It includes the content_main.xml.
- We add our ExpandableListView here.

Here are the roles of this layout:

| No. | Responsibility |
| --- | --- |
| 1. | Hold an ExpandableListeView which is our adapterview. |
| 2. | Be ready to be for inflation of into a view object. Then that view object gets set as the contentview of the Main [activity](https://camposha.info/android/activity). |

```xml
<RelativeLayout

    android_layout_width="match_parent"
    android_layout_height="match_parent"
    android_paddingBottom="@dimen/activity_vertical_margin"
    android_paddingLeft="@dimen/activity_horizontal_margin"
    android_paddingRight="@dimen/activity_horizontal_margin"
    android_paddingTop="@dimen/activity_vertical_margin"
    tools_context=".MainActivity" >

    <ExpandableListView
        android_id="@+id/expandableListView1"
        android_layout_width="match_parent"
        android_layout_height="wrap_content"
        android_layout_alignParentLeft="true"
        android_layout_alignParentTop="true" >
    </ExpandableListView>

</RelativeLayout>
```

##### (b). team.xml

This layout represents a single team.

Here are the roles of this layout.

| No. | Role |
| --- | --- |
| 1. | Define an ImageView and TextView that will be show alongside each other to provide both the team flag and name respectively. |
| 2. | Align them horizontally using a LinearLayout. |

```xml
<?xml version="1.0" encoding="utf-8"?>
<LinearLayout
    android_layout_width="match_parent"
    android_layout_height="match_parent"
    android_orientation="horizontal" >

    <ImageView
        android_id="@+id/imageView1"
        android_layout_width="56dp"
        android_layout_height="56dp"
        android_src="@drawable/arrow" />

    <TextView
        android_id="@+id/textView1"
        android_layout_width="wrap_content"
        android_layout_height="wrap_content"
        android_text="Team"
        android_textAppearance="?android:attr/textAppearanceMedium" />

</LinearLayout>
```

#### (c). Our Player XML(player.xml)

- The xml definition of player which is our child in the expandableListView.

Here the roles of `player.xml` layout:

| No. | Responsibility |
| --- | --- |
| 1. | Specify an imageview and textview to be used to present a single soccer player object. |
| 2. | Be ready to be inflated into children in the ExpandableListView. |

```xml
<?xml version="1.0" encoding="utf-8"?>
<RelativeLayout
    android_layout_width="match_parent"
    android_layout_height="match_parent"
    android_orientation="horizontal" >

    <ImageView
        android_id="@+id/imageView1"
        android_layout_width="wrap_content"
        android_layout_height="wrap_content"
        android_layout_alignParentLeft="true"
        android_layout_alignParentTop="true"
        android_layout_marginLeft="24dp"
        android_src="@drawable/mata" />

    <TextView
        android_id="@+id/textView1"
        android_layout_width="wrap_content"
        android_layout_height="wrap_content"
        android_layout_alignParentTop="true"
        android_layout_marginLeft="14dp"
        android_layout_marginTop="21dp"
        android_layout_toRightOf="@+id/imageView1"
        android_text="player"
        android_textAppearance="?android:attr/textAppearanceMedium" />

</RelativeLayout>
```

#### 2\. Team.java

-  This is the definition of a team object.
- It specifies the teams' properties.

Here are the roles of this class:

| No. | Responsibility |
| --- | --- |
| 1. | Act as the data object class for teams to be shown in our ExpandableListView. |
| 2. | Define 3 public properties of each team: a name, an image and the player names in that team. |

```java
package com.tutorials.expandable_view;

import java.util.ArrayList;

public class Team {

  //PROPERTIES OF A SINGLE TEAM
    public String Name;
    public String Image;
    public ArrayList<String> players=new ArrayList<String>();

    public Team(String Name)
    {
      this.Name=Name;
    }

    @Override
    public String toString() {
      // TODO Auto-generated method stub
      return Name;
    }
}
```

#### 3\. CustomAdapter.java

This is our ExpandableListAdapter class. It derives from `android.widget.BaseExpandableListAdapter`.

Here are the main responsibilities of this class:

| No. | Responsibility |
| --- | --- |
| 1. | Maintain three private instance fields, a Context, an ArrayList to hold teams, and a LayoutInflater object to assist in the inflation of our `player.xml` and `team.xml` layouts. |
| 2. | Receive a Context object and an ArrayList and assign them to our private instance fields. |
| 3. | Override the `getChild()` of our ExpandableListAdapter and return a single player object from a particular team. |
| 4. | Override the `getChildId()` of our ExpandableListAdapter and return an integer to be used as child ID. |
| 5. | Override the `getChildView()` of our ExpandableListAdapter, inflate our `player.xml` inside it and return a view object. |
| 6. | Override the `getChildrenCount()` of our ExpandableListAdapter and return the total number of children in a given team. |
| 7. | Override the `getGroup()` of our ExpandableListAdapter and return a single team object where a particular player plays for. |
| 8. | Override the `getGroupCount()` of our ExpandableListAdapter and return the total number of groups to be rendered in our ExpandableListView. |
| 9. | Override the `getGroupView()` of our ExpandableListAdapter, inflate our `team.xml` inside it and return the resultant view object. |
| 10. | Tell our ExpandableListAdapter that our IDs are not stable and that we want to want our ExpandableListView children to be selectable. |

```java
package com.tutorials.expandable_view;

import java.util.ArrayList;

import android.content.Context;
import android.graphics.Color;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.BaseExpandableListAdapter;
import android.widget.ImageView;
import android.widget.TextView;

public class CustomAdapter extends BaseExpandableListAdapter {

  private Context c;
  private ArrayList<Team> team;
  private LayoutInflater inflater;

  public CustomAdapter(Context c,ArrayList<Team> team)
  {
    this.c=c;
    this.team=team;
    inflater=(LayoutInflater) c.getSystemService(Context.LAYOUT_INFLATER_SERVICE);
  }

  //GET A SINGLE PLAYER
  @Override
  public Object getChild(int groupPos, int childPos) {
    // TODO Auto-generated method stub
    return team.get(groupPos).players.get(childPos);
  }

  //GET PLAYER ID
  @Override
  public long getChildId(int arg0, int arg1) {
    // TODO Auto-generated method stub
    return 0;
  }

  //GET PLAYER ROW
  @Override
  public View getChildView(int groupPos, int childPos, boolean isLastChild, View convertView,
      ViewGroup parent) {

    //ONLY INFLATER XML ROW LAYOUT IF ITS NOT PRESENT,OTHERWISE REUSE IT

    if(convertView==null)
    {
      convertView=inflater.inflate(R.layout.player, null);
    }

    //GET CHILD/PLAYER NAME
    String  child=(String) getChild(groupPos, childPos);

    //SET CHILD NAME
    TextView nameTv=(TextView) convertView.findViewById(R.id.textView1);
    ImageView img=(ImageView) convertView.findViewById(R.id.imageView1);

    nameTv.setText(child);

    //GET TEAM NAME
    String teamName= getGroup(groupPos).toString();

    //ASSIGN IMAGES TO PLAYERS ACCORDING TO THEIR NAMES AN TEAMS
    if(teamName=="Man Utd")
    {
      if(child=="Wayne Rooney")
      {
        img.setImageResource(R.drawable.rooney) ;
      }else if(child=="Ander Herera")
      {
        img.setImageResource(R.drawable.herera) ;
      }else if(child=="Van Persie")
      {
        img.setImageResource(R.drawable.vanpersie)  ;
      }else if(child=="Juan Mata")
      {
        img.setImageResource(R.drawable.mata)   ;
      }
    }else if(teamName=="Chelsea")
    {
      if(child=="John Terry")
      {
        img.setImageResource(R.drawable.terry)  ;
      }else if(child=="Eden Hazard")
      {
        img.setImageResource(R.drawable.hazard) ;
      }else if(child=="Oscar")
      {
        img.setImageResource(R.drawable.oscar)  ;
      }else if(child=="Diego Costa")
      {
        img.setImageResource(R.drawable.costa)  ;
      }
    }else if(teamName=="Arsenal")
    {
      if(child=="Jack Wilshere")
      {
        img.setImageResource(R.drawable.wilshere)   ;
      }else if(child=="Alexis Sanchez")
      {
        img.setImageResource(R.drawable.sanchez)    ;
      }else if(child=="Aaron Ramsey")
      {
        img.setImageResource(R.drawable.ramsey) ;
      }else if(child=="Mesut Ozil")
      {
        img.setImageResource(R.drawable.ozil)   ;
      }
    }

    return convertView;
  }

  //GET NUMBER OF PLAYERS
  @Override
  public int getChildrenCount(int groupPosw) {
    // TODO Auto-generated method stub
    return team.get(groupPosw).players.size();
  }

  //GET TEAM
  @Override
  public Object getGroup(int groupPos) {
    // TODO Auto-generated method stub
    return team.get(groupPos);
  }

  //GET NUMBER OF TEAMS
  @Override
  public int getGroupCount() {
    // TODO Auto-generated method stub
    return team.size();
  }

  //GET TEAM ID
  @Override
  public long getGroupId(int arg0) {
    // TODO Auto-generated method stub
    return 0;
  }

  //GET TEAM ROW
  @Override
  public View getGroupView(int groupPosition, boolean isExpanded, View convertView, ViewGroup parent) {

    //ONLY INFLATE XML TEAM ROW MODEL IF ITS NOT PRESENT,OTHERWISE REUSE IT
        if(convertView == null)
        {
          convertView=inflater.inflate(R.layout.teams, null);
        }

        //GET GROUP/TEAM ITEM
        Team t=(Team) getGroup(groupPosition);

        //SET GROUP NAME
        TextView nameTv=(TextView) convertView.findViewById(R.id.textView1);
        ImageView img=(ImageView) convertView.findViewById(R.id.imageView1);

        String name=t.Name;
        nameTv.setText(name);

        //ASSIGN TEAM IMAGES ACCORDING TO TEAM NAME

        if(name=="Man Utd")
        {
          img.setImageResource(R.drawable.manutd);
        }else if(name=="Chelsea")
        {
          img.setImageResource(R.drawable.chelsea);
        }else if(name=="Arsenal")
        {
          img.setImageResource(R.drawable.arsenal);
        }

        //SET TEAM ROW BACKGROUND COLOR
        convertView.setBackgroundColor(Color.LTGRAY);

    return convertView;
  }

  @Override
  public boolean hasStableIds() {
    // TODO Auto-generated method stub
    return false;
  }

  @Override
  public boolean isChildSelectable(int arg0, int arg1) {
    // TODO Auto-generated method stub
    return true;
  }

}
```

#### 4\. MainActivity.java

So this is our main [activity](https://camposha.info/android/activity). It derives from `android.app.Activity`.

Here are it's major responsibilities:

| No. | Responsibility |
| --- | --- |
| 1. | Allow itself to become an android [activity](https://camposha.info/android/activity) component by deriving from `android.app.activity`. |
| 2. | Listen to activity creation callbacks by overrding the `onCreate()` method. |
| 3. | Invoke the `onCreate()` method of the parent [Activity](https://camposha.info/android/activity) class and tell it of a [Bundle](https://camposha.info/android/activity) we've received. |
| 4. | Inflate the `activity_main.xml` into a View object and set it as the content view of this activity. |
| 5. | Search for our ExpandableListView by it's id from our layouts. |
| 6. | Create an java and fill it with some data. This acts as our data source. |
| 7. | Instantiate our `CustomAdapter` class and pass it that data source as well as our Activity's context. |
| 8. | Set that adapter into our ExpandableListView. |
| 9. | Listen to ExpandableListView children' click events and show a Toast message. |

```java
package com.tutorials.expandable_view;

import java.util.ArrayList;

import android.os.Bundle;
import android.app.Activity;
import android.view.Menu;
import android.view.View;
import android.widget.ExpandableListView;
import android.widget.ExpandableListView.OnChildClickListener;
import android.widget.Toast;

public class MainActivity extends Activity {

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);

        //THE EXPANDABLE
        ExpandableListView elv=(ExpandableListView) findViewById(R.id.expandableListView1);

        final ArrayList<Team> team=getData();

        //CREATE AND BIND TO ADAPTER
        CustomAdapter adapter=new CustomAdapter(this, team);
        elv.setAdapter(adapter);

        //SET ONCLICK LISTENER
        elv.setOnChildClickListener(new OnChildClickListener() {

      @Override
      public boolean onChildClick(ExpandableListView parent, View v, int groupPos,
          int childPos, long id) {

                   Toast.makeText(getApplicationContext(), team.get(groupPos).players.get(childPos), Toast.LENGTH_SHORT).show();

        return false;
      }
    });
    }

    //ADD AND GET DATA

    private ArrayList<Team> getData()
    {

        Team t1=new Team("Man Utd");
        t1.players.add("Wayne Rooney");
        t1.players.add("Van Persie");
        t1.players.add("Ander Herera");
        t1.players.add("Juan Mata");

        Team t2=new Team("Arsenal");
        t2.players.add("Aaron Ramsey");
        t2.players.add("Mesut Ozil");
        t2.players.add("Jack Wilshere");
        t2.players.add("Alexis Sanchez");

        Team t3=new Team("Chelsea");
        t3.players.add("John Terry");
        t3.players.add("Eden Hazard");
        t3.players.add("Diego Costa");
        t3.players.add("Oscar");

        ArrayList<Team> allTeams=new ArrayList<Team>();
        allTeams.add(t1);
        allTeams.add(t2);
        allTeams.add(t3);

        return allTeams;
    }

}
```

#### Our Manifest

This is our application manifest. Note that the `minSDKVersion` and `targetSDKVersion` aren't strict, you can set them much lower or higher.

```xml
<?xml version="1.0" encoding="utf-8"?>
<manifest
    package="com.tutorials.expandable_view"
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
            android_name="com.tutorials.expandable_view.MainActivity"
            android_label="@string/app_name" >
            <intent-filter>
                <action android_name="android.intent.action.MAIN" />

                <category android_name="android.intent.category.LAUNCHER" />
            </intent-filter>
        </activity>
    </application>

</manifest>
```

#### How To Run

1. This project was created by Eclipse.
2. Therefore just copy the code and use in your project in android studio, it's still android anyway and expandableListview is the same regardless of the IDE. So copy paste the code to your android studio project.

#### Resources

| No. | Resource | Direct Links |
| --- | --- | --- |
| 1. | YouTube | [YouTube Channel](https://www.youtube.com/c/ProgrammingWizards) |

### Example 3: Kotlin Android ExpandableListView Tutorial

All the other examples we've been looking at have all been written in Java. However these days Kotlin is the defacto programming language for android development. Let's therefore look at an example written in Kotlin

Here's what is created:

![Kotlin Android ExpandableListView Example](https://user-images.githubusercontent.com/22006238/100978561-c606b300-356c-11eb-91ed-8f499729867f.png)

### Step 1: Gradle files

No third party library dependency is required. Hwoever we are using Kotlin programming language.

### Step 2: Create Layouts

We will have three layouts:

1. list_item.xml
2. list_group.xml
3. activity_main.xml

**(a). list_item.xml**

The xml layout for a single item in the expandable listview children rows.

```xml
<?xml version="1.0" encoding="utf-8"?>
<LinearLayout
    xmlns:android="http://schemas.android.com/apk/res/android"
    android:layout_width="match_parent"
    android:layout_height="wrap_content"
    android:orientation="vertical">

    <TextView
        android:id="@+id/expandedListItem"
        android:layout_width="match_parent"
        android:layout_height="wrap_content"
        android:paddingBottom="10dp"
        android:paddingLeft="?android:attr/expandableListPreferredChildPaddingLeft"
        android:paddingTop="10dp"/>

</LinearLayout>
```

**(a). list_group.xml**

The xml layout for a single group item.

```xml
<?xml version="1.0" encoding="utf-8"?>
<LinearLayout
    xmlns:android="http://schemas.android.com/apk/res/android"
    android:layout_width="match_parent"
    android:layout_height="match_parent"
    android:orientation="vertical">

    <TextView
        android:id="@+id/listTitle"
        android:layout_width="match_parent"
        android:layout_height="wrap_content"
        android:paddingBottom="10dp"
        android:paddingLeft="?android:attr/expandableListPreferredItemPaddingLeft"
        android:paddingTop="10dp"
        android:textColor="@android:color/black"/>

</LinearLayout>
```

**(c). activity_main.xml**

The main activity layout. We will add the expandablelistview here.

```xml
<?xml version="1.0" encoding="utf-8"?>
<androidx.constraintlayout.widget.ConstraintLayout xmlns:android="http://schemas.android.com/apk/res/android"
    xmlns:app="http://schemas.android.com/apk/res-auto"
    xmlns:tools="http://schemas.android.com/tools"
    android:layout_width="match_parent"
    android:layout_height="match_parent"
    tools:context=".MainActivity">

    <ExpandableListView
        android:id="@+id/expandableListView"
        android:layout_width="match_parent"
        android:layout_height="match_parent"
        android:dividerHeight="0.5dp"
        app:layout_constraintBottom_toBottomOf="parent"
        app:layout_constraintEnd_toEndOf="parent"
        app:layout_constraintStart_toStartOf="parent"
        app:layout_constraintTop_toTopOf="parent" />

</androidx.constraintlayout.widget.ConstraintLayout>
```

### Step 3: Write Kotlin Code

The next step ist write kotlin code. This involves creating the expandablelistview adapter as well as the main activity.

**(a). CustomExpandableListAdapter.kt** The adapter for expandable listview:

```kotlin
package com.coxtunes.expandablelistview

import android.content.Context
import android.graphics.Typeface
import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import android.widget.BaseExpandableListAdapter
import android.widget.TextView

class CustomExpandableListAdapter internal constructor(
    private val context: Context,
    private val titleList: List<String>,
    private val dataList: HashMap<String, List<String>>) : BaseExpandableListAdapter() {

    override fun getChild(listPosition: Int, expandedListPosition: Int): Any {
        return this.dataList[this.titleList[listPosition]]!![expandedListPosition]
    }

    override fun getChildId(listPosition: Int, expandedListPosition: Int): Long {
        return expandedListPosition.toLong()
    }

    override fun getChildView(listPosition: Int, expandedListPosition: Int, isLastChild: Boolean, convertView: View?, parent: ViewGroup): View {
        var convertView = convertView
        val expandedListText = getChild(listPosition, expandedListPosition) as String
        if (convertView == null)
        {
            val layoutInflater = this.context.getSystemService(Context.LAYOUT_INFLATER_SERVICE) as LayoutInflater
            convertView = layoutInflater.inflate(R.layout.list_item, null)
        }

        val expandedListTextView = convertView!!.findViewById<TextView>(R.id.expandedListItem)
        expandedListTextView.text = expandedListText

        return convertView
    }

    override fun getChildrenCount(listPosition: Int): Int {
        return this.dataList[this.titleList[listPosition]]!!.size
    }

    override fun getGroup(listPosition: Int): Any {
        return this.titleList[listPosition]
    }

    override fun getGroupCount(): Int {
        return this.titleList.size
    }

    override fun getGroupId(listPosition: Int): Long {
        return listPosition.toLong()
    }

    override fun getGroupView(listPosition: Int, isExpanded: Boolean, convertView: View?, parent: ViewGroup): View {
        var convertView = convertView
        val listTitle = getGroup(listPosition) as String
        if (convertView == null)
        {
            val layoutInflater = this.context.getSystemService(Context.LAYOUT_INFLATER_SERVICE) as LayoutInflater
            convertView = layoutInflater.inflate(R.layout.list_group, null)
        }

        val listTitleTextView = convertView!!.findViewById<TextView>(R.id.listTitle)
        listTitleTextView.setTypeface(null, Typeface.BOLD)
        listTitleTextView.text = listTitle

        return convertView
    }

    override fun hasStableIds(): Boolean {
        return false
    }

    override fun isChildSelectable(listPosition: Int, expandedListPosition: Int): Boolean {
        return true
    }
}
```

**(b). MainActivity.kt**

Next is the main activity:

```kotlin
package com.coxtunes.expandablelistview

import android.os.Bundle
import android.widget.ExpandableListAdapter
import android.widget.ExpandableListView
import android.widget.Toast
import androidx.appcompat.app.AppCompatActivity

class MainActivity : AppCompatActivity() {

    internal var expandableListView: ExpandableListView? = null
    internal var adapter: ExpandableListAdapter? = null
    internal var titleList: List<String>? = null

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_main)

        expandableListView = findViewById(R.id.expandableListView)
        if (expandableListView != null) {
            val listData = data
            titleList = ArrayList(listData.keys)
            adapter = CustomExpandableListAdapter(this, titleList as ArrayList<String>, listData)
            expandableListView!!.setAdapter(adapter)

            expandableListView!!.setOnGroupExpandListener { groupPosition ->
                Toast.makeText(applicationContext, (titleList as ArrayList<String>)[groupPosition] + " List Expanded.", Toast.LENGTH_SHORT).show()
            }

            expandableListView!!.setOnGroupCollapseListener { groupPosition ->
                Toast.makeText(applicationContext, (titleList as ArrayList<String>)[groupPosition] + " List Collapsed.", Toast.LENGTH_SHORT).show()
            }

            expandableListView!!.setOnChildClickListener { parent, v, groupPosition, childPosition, id ->
                Toast.makeText(applicationContext, "Clicked: " + (titleList as ArrayList<String>)[groupPosition] + " -> " + listData[(titleList as ArrayList<String>)[groupPosition]]!!.get(childPosition), Toast.LENGTH_SHORT).show()
                // For get child position
                // Toast.makeText(applicationContext, groupPosition.toString(), Toast.LENGTH_SHORT).show()
                false
            }
        }

    }

    val data: HashMap<String, List<String>>
        get() {
            val listData = HashMap<String, List<String>>()

            val redmiMobiles = ArrayList<String>()
            redmiMobiles.add("Redmi Y2")
            redmiMobiles.add("Redmi S2")
            redmiMobiles.add("Redmi Note 5 Pro")
            redmiMobiles.add("Redmi Note 5")
            redmiMobiles.add("Redmi 5 Plus")
            redmiMobiles.add("Redmi Y1")
            redmiMobiles.add("Redmi 3S Plus")

            val micromaxMobiles = ArrayList<String>()
            micromaxMobiles.add("Micromax Bharat Go")
            micromaxMobiles.add("Micromax Bharat 5 Pro")
            micromaxMobiles.add("Micromax Bharat 5")
            micromaxMobiles.add("Micromax Canvas 1")
            micromaxMobiles.add("Micromax Dual 5")

            val appleMobiles = ArrayList<String>()
            appleMobiles.add("iPhone 8")
            appleMobiles.add("iPhone 8 Plus")
            appleMobiles.add("iPhone X")
            appleMobiles.add("iPhone 7 Plus")
            appleMobiles.add("iPhone 7")
            appleMobiles.add("iPhone 6 Plus")

            val samsungMobiles = ArrayList<String>()
            samsungMobiles.add("Samsung Galaxy S9+")
            samsungMobiles.add("Samsung Galaxy Note 7")
            samsungMobiles.add("Samsung Galaxy Note 5 Dual")
            samsungMobiles.add("Samsung Galaxy S8")
            samsungMobiles.add("Samsung Galaxy A8")
            samsungMobiles.add("Samsung Galaxy Note 4")

            // set multiple list to header title position
            listData["Redmi"] = redmiMobiles
            listData["Micromax"] = micromaxMobiles
            listData["Apple"] = appleMobiles
            listData["Samsung"] = samsungMobiles

            return listData
        }

}
```

### Download

Download the full code [here](https://github.com/abircse/ExpandableListView/archive/refs/heads/master.zip). The code is written by [@abircse](https://github.com/abircse)
