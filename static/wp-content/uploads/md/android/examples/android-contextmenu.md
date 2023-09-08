# ContextMenu Tutorial and Examples



ContextMenu support has been in android since API level 1. It's an extension of menu and implements Menu interface. It's actually an interface itself.

ContextMenus are usually shown when users long click view. It's shown by registering contextmenu using the `registerForContextMenu(view)` and then overriding `onCreateContextMenu()`.


In this tutorial you will learn through examples how to create and use context menu. Here are the examples we will cover:

1. Kotlin Contextmenu
2. ContextMenu with ListView
3. ContextMenu with RecyclerView
4. ContextMenu usage in a SQLite recyclerview CRUD app.

## Example 1: Kotlin Android Simple ContextMenu/Floating Menu

This is a simple step by step ContextMenu example, especially suitable for beginners. It is written in Kotlin.

Let's start.

### Step 1: Create Project

Start by creating an AndroidStudio project.

### Step 2: Dependencies

No third party dependecncies are needed.

### Step 3: Create Menu

Create a `menu` folder under the `res` directory. Under this `menu` folder create a `floating_context_menu.xml` file and add the following code:

**floating_context_menu.xml**

```xml
<?xml version="1.0" encoding="utf-8"?>
<menu xmlns:android="http://schemas.android.com/apk/res/android">

    <item
        android:id="@+id/item_1"
        android:title="item 1"/>

    <item
        android:id="@+id/item_2"
        android:title="item 2"/>

    <item
        android:id="@+id/item_3"
        android:title="item 3"/>

    <item
        android:id="@+id/item_4"
        android:title="item 4"/>

</menu>
```

### Step 4: Design Layout

Design a layout by placing a button inside a ConstraintLauout as fololows

**acvivity_main.xml**

```xml
<?xml version="1.0" encoding="utf-8"?>
<androidx.constraintlayout.widget.ConstraintLayout xmlns:android="http://schemas.android.com/apk/res/android"
    xmlns:app="http://schemas.android.com/apk/res-auto"
    xmlns:tools="http://schemas.android.com/tools"
    android:layout_width="match_parent"
    android:layout_height="match_parent"
    tools:context=".MainActivity">

    <Button
        android:id="@+id/button"
        android:layout_width="wrap_content"
        android:layout_height="wrap_content"
        android:text="Button"
        app:layout_constraintBottom_toBottomOf="parent"
        app:layout_constraintEnd_toEndOf="parent"
        app:layout_constraintStart_toStartOf="parent"
        app:layout_constraintTop_toTopOf="parent" />

</androidx.constraintlayout.widget.ConstraintLayout>
```

### Step 5: Write Code

Write your code as below:

**MainActivity.kt**

```kotlin
import androidx.appcompat.app.AppCompatActivity
import android.os.Bundle
import android.view.ContextMenu
import android.view.MenuItem
import android.view.View
import android.widget.Button
import android.widget.Toast

class MainActivity : AppCompatActivity() {

    lateinit var button : Button

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_main)

        Cast()

        registerForContextMenu(button)

    }

    private fun Cast(){

        button = findViewById(R.id.button)

    }

    override fun onCreateContextMenu(
        menu: ContextMenu?,
        v: View?,
        menuInfo: ContextMenu.ContextMenuInfo?
    ) {
        super.onCreateContextMenu(menu, v, menuInfo)
        menuInflater.inflate(R.menu.floting_context_menu,menu)
    }

    override fun onOptionsItemSelected(item: MenuItem): Boolean {

        when(item.itemId){
            R.id.item_1 -> Toast.makeText(this,"item 1",Toast.LENGTH_SHORT).show()
            R.id.item_2 -> Toast.makeText(this,"item 2",Toast.LENGTH_SHORT).show()
            R.id.item_3 -> Toast.makeText(this,"item 3",Toast.LENGTH_SHORT).show()
            R.id.item_4 -> Toast.makeText(this,"item 4",Toast.LENGTH_SHORT).show()
            else -> Toast.makeText(this,"else",Toast.LENGTH_SHORT).show()
        }

        return super.onOptionsItemSelected(item)
    }
}
```

### Step 6: Run

Copy the code into your project or download it below and run in AndroidStudio.

### Reference

Find reference links below:

| Number | Link |
| --- | --- |
| 1. | [Download](https://github.com/alirezabashi98/Floating-Menu-android-kotlin/archive/refs/heads/master.zip) code |
| 2. | [Follow](https://github.com/alirezabashi98/) code author |

## Example 2: Android ListView ContextMenu – LongPress,Handle Events

In this example we look at showing a contextmenu when user long clicks/presses a listview item. We also see how to handle contextmenu items action events, in this case only showing a toast message when user selects a context menuitem.

You can find more details about ContextMenu [here](https://developer.android.com/reference/android/view/ContextMenu.html).

#### Screenshot

- Here's the screenshot of the project.

Android Contextmenu ListView example.

![Android ContextMenu ](https://image.prntscr.com/image/55YFGajwSpKN3t4Yl2f5NA.png)

#### Common Questions this example explores

- How to use ContextMenu with Example.
- What is ContextMenu?
- Show ContextMenu onLongClick.
- Show ContextMenu on ListView.
- ContextMenu items action events.
- Get selected contextmenu item.

#### Tools Used

This example was written with the following tools:

- Windows 8
- AndroidStudio IDE
- Genymotion Emulator

Let's go.

Lets jump directly to the source code.

#### 1\. Build.Gradle

- Normally in android projects, there are two build.gradle files. One is the app level build.gradle, the other is project level build.gradle. The app level belongs inside the app folder and its where we normally add our dependencies and specify the compile and target sdks.
- Also Add dependencies for AppCompat and Design support libraries.
- Our MainActivity shall derive from AppCompatActivity while we shall also use Floating action button from design support libraries.
- We also add CardView. Our ListView shall comprise cardviews with images and text.

```groovy
apply plugin: 'com.android.application'

android {
    compileSdkVersion 23
    buildToolsVersion "23.0.2"

    defaultConfig {
        applicationId "com.tutorials.hp.listviewcontextmenu"
        minSdkVersion 15
        targetSdkVersion 23
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
    compile 'com.android.support:appcompat-v7:23.2.1'
    compile 'com.android.support:design:23.2.1'
    compile 'com.android.support:cardview-v7:23.2.1'
}
```

#### 2\. Movie.java

- Data Object.
- Represents a single movie with its properties like name and image.

```java
package com.tutorials.hp.listviewcontextmenu;

public class Movie {

    private String name;
    private int image;

    public Movie(String name, int image) {
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

#### LongClickListener.java

- An interface.
- Defines the signature on onLongClick() method.

```java
package com.tutorials.hp.listviewcontextmenu;

public interface LongClickListener {

    void onItemLongClick();

}
```

#### 3\. MyViewHolder.java

- Our ViewHolder class.
- Will hold imageview and textview for recycling.
- Implements LongClicklistener.

```java
package com.tutorials.hp.listviewcontextmenu;

import android.view.ContextMenu;
import android.view.View;
import android.widget.ImageView;
import android.widget.TextView;

public class MyViewHolder implements View.OnLongClickListener,View.OnCreateContextMenuListener {

    ImageView img;
    TextView nameTxt;
    LongClickListener longClickListener;

    public MyViewHolder(View v) {
        img= (ImageView) v.findViewById(R.id.movieImage);
        nameTxt= (TextView) v.findViewById(R.id.nameTxt);

        v.setOnLongClickListener(this);
        v.setOnCreateContextMenuListener(this);
    }

    public void setLongClickListener(LongClickListener lc)
    {
        this.longClickListener=lc;
    }

    @Override
    public boolean onLongClick(View v) {
        this.longClickListener.onItemLongClick();
        return false;
    }

    @Override
    public void onCreateContextMenu(ContextMenu menu, View v, ContextMenu.ContextMenuInfo menuInfo) {
        menu.add(0,0,0,"Share");
        menu.add(0,1,0,"Rate");
        menu.add(0,2,0,"Watch");
    }
}
```

#### 4\. CustomAdapter.java

- Our Adapter class.
- Derives from BaseAdapter.
- Adapt our movies collection to our views for display.

```java
package com.tutorials.hp.listviewcontextmenu;

import android.content.Context;
import android.view.LayoutInflater;
import android.view.MenuItem;
import android.view.View;
import android.view.ViewGroup;
import android.widget.BaseAdapter;
import android.widget.Toast;

import java.util.ArrayList;

public class CustomAdapter extends BaseAdapter {
    Context c;
    ArrayList<Movie> movies;
    LayoutInflater inflater;
    String name;

    public CustomAdapter(Context c, ArrayList<Movie> movies) {
        this.c = c;
        this.movies = movies;
    }

    @Override
    public int getCount() {
        return movies.size();
    }

    @Override
    public Object getItem(int position) {
        return movies.get(position);
    }

    @Override
    public long getItemId(int position) {
        return position;
    }

    @Override
    public View getView(final int position, View convertView, ViewGroup parent) {

        if(inflater==null)
        {
            inflater= (LayoutInflater) c.getSystemService(Context.LAYOUT_INFLATER_SERVICE);
        }

        if(convertView==null)
        {
            convertView=inflater.inflate(R.layout.model,parent,false);
        }

        //BIND DATA TO VIEWS
        MyViewHolder holder=new MyViewHolder(convertView);
        holder.nameTxt.setText(movies.get(position).getName());
        holder.img.setImageResource(movies.get(position).getImage());

        holder.setLongClickListener(new LongClickListener() {
            @Override
            public void onItemLongClick() {
                name=movies.get(position).getName();
                Toast.makeText(c,name,Toast.LENGTH_SHORT).show();
            }
        });

        return convertView;
    }

    public void getSelecetedItem(MenuItem item)
    {
        Toast.makeText(c,name+" "+item.getTitle(),Toast.LENGTH_SHORT).show();
    }

}
```

#### 5\. MainActivity.java

- Launcher activity.
- ActivityMain.xml inflated as the contentview for this activity.
- We initialize views and widgets inside this activity.

```java
package com.tutorials.hp.listviewcontextmenu;

import android.os.Bundle;
import android.support.design.widget.FloatingActionButton;
import android.support.design.widget.Snackbar;
import android.support.v7.app.AppCompatActivity;
import android.support.v7.widget.RecyclerView;
import android.support.v7.widget.Toolbar;
import android.view.View;
import android.view.Menu;
import android.view.MenuItem;
import android.widget.AdapterView;
import android.widget.ListView;

import java.util.ArrayList;

public class MainActivity extends AppCompatActivity {

   ListView lv;
    CustomAdapter adapter;

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

        lv= (ListView) findViewById(R.id.lv);
        adapter=new CustomAdapter(this,getMovies());

        lv.setAdapter(adapter);

    }

    @Override
    public boolean onContextItemSelected(MenuItem item) {

         adapter.getSelecetedItem(item);
        return super.onContextItemSelected(item);
    }

    private ArrayList<Movie> getMovies() {
        //COLECTION OF CRIME MOVIES
        ArrayList<Movie> movies=new ArrayList<>();

        Movie movie=new Movie("Shuttle Carrier",R.drawable.shuttlecarrier);

        //ADD ITR TO COLLECTION
        movies.add(movie);

        movie=new Movie("Fruits",R.drawable.fruits);
        movies.add(movie);

        movie=new Movie("Breaking Bad",R.drawable.breaking);
        movies.add(movie);

        movie=new Movie("Crisis",R.drawable.crisis);
        movies.add(movie);

        movie=new Movie("Ghost Rider",R.drawable.rider);
        movies.add(movie);

        movie=new Movie("Star Wars",R.drawable.starwars);
        movies.add(movie);

        movie=new Movie("BlackList",R.drawable.red);
        movies.add(movie);

        movie=new Movie("Men In Black",R.drawable.meninblack);
        movies.add(movie);

        movie=new Movie("Game Of Thrones",R.drawable.thrones);
        movies.add(movie);

        return movies;

    }
}
```

#### 6\. ActivityMain.xml

- Template layout.
- Contains our ContentMain.xml.
- Also defines the appbarlayout, toolbar as well as floatingaction buttton.

```xml
<?xml version="1.0" encoding="utf-8"?>
<android.support.design.widget.CoordinatorLayout

    android_layout_width="match_parent"
    android_layout_height="match_parent"
    android_fitsSystemWindows="true"
    tools_context="com.tutorials.hp.listviewcontextmenu.MainActivity">

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

#### 7\. ContentMain.xml

- Content Layout.
- Defines the views and widgets to be displayed inside the MainActivity.
- Will contain our ListView in this case.

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
    tools_context="com.tutorials.hp.listviewcontextmenu.MainActivity"
    tools_showIn="@layout/activity_main">

    <ListView
        android_layout_width="wrap_content"
        android_layout_height="wrap_content"
        android_id="@+id/lv"

        android_layout_alignParentLeft="true"
        android_layout_alignParentStart="true" />
</RelativeLayout>
```

#### 8\. Model.xml

- Definition of a single movie cardview for our listview.

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

#### Conclusion.

We saw a simple android ContextMenu Example with a Custom ListView with Images and Text. User long presses a listview item and contextmenu is shown. We also see how to handle the ContextMenu items action events, that is what the user actually chooses from the context menu.

#### How To Run

1. Download the project.
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
| GitHub Browse | Browse |
| GitHub Download Link | [Download](https://github.com/Oclemy/ListView-ContextMenu/archive/master.zip) |

Good day.

## Example 3 - ListView with ContextMenu example

Let's start with our main [activity](https://camposha.info/android/activity).

```java
import android.os.Bundle;
import android.support.v7.app.AppCompatActivity;
import android.view.ContextMenu;
import android.view.MenuInflater;
import android.view.MenuItem;
import android.view.View;
import android.widget.ArrayAdapter;
import android.widget.ListView;
import android.widget.Toast;

import java.util.ArrayList;

public class MainActivity extends AppCompatActivity {

    /**
     * Construct the returned data
     * @return
     */
    private ArrayList<String> getData(){
        ArrayList<String> list = new ArrayList<String>();
        for (int i=0;i<6;i++){
            list.add("File"+(i+1));
        }
        return list;
    }
    /**
    * Our onCreate method
    */
    @Override
    protected void onCreate(BundlesavedInstanceState){
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);
        showListView ();
    }

    /**
     * Set the display content of the listView
     */
    private void showListView(){
        ListView listView = (ListView) findViewById(R.id.listview);
        ArrayAdapter<String> adapter = new ArrayAdapter<String>(this,android.R.layout.simple_list_item_1,getData());
        listView.setAdapter(adapter);
        this.registerForContextMenu ( listView ); //register the context menu
    }

    /**
     * Create context menu
     * @param menu - Our context menu
     * @param v - Our View object
     * @param menuInfo  - Our ContextMenuInfo object
     */
    @Override
    public void onCreateContextMenu(ContextMenu menu, View v, ContextMenu.ContextMenuInfo menuInfo) {
        super.onCreateContextMenu(menu, v, menuInfo);
        // Set the content displayed by menu
        menu.setHeaderTitle ( "File operation" );
        menu.setHeaderIcon(R.mipmap.ic_launcher);
        MenuInflater inflater = getMenuInflater();
        inflater.inflate(R.menu.menu_main,menu);

    }

    /**
     * Set the click event of the menu item
     */
    @Override
    public boolean onContextItemSelected ( MenuItem item ) {

        switch (item.getItemId()){
            case 1 :
                Toast.makeText(this , "Selected copy" , Toast.LENGTH_SHORT).show();
                break;
            case 2:
                Toast.makeText(this,"Selected sticky", Toast.LENGTH_SHORT).show();
                break;
            case 3 :
                Toast.makeText(this,"Choose Cut" , Toast.LENGTH_SHORT).show();
                break;
            case 4 :
                Toast.makeText(this,"Selected Rename",Toast.LENGTH_SHORT. show();
                break;
            case 5 :
                Toast.makeText(this , "Selected Delete",Toast.LENGTH_SHORT).show();
                break;
            case 6 :
                break;
        }

        return super.onContextItemSelected(item);
    }

}
```

**(b) activity_main.xml**

This is the activity_main layout. We will render a ListView right here. At the root we have a [RelativeLayout](https://camposha.info/android/relativelayout). Inside the RelativeLayout we have a [ListView](https://camposha.info/android/listview).

```xml
<RelativeLayout
     android_layout_width="match_parent"
    android_layout_height="match_parent" android_paddingLeft="@dimen/activity_horizontal_margin"
    android_paddingRight="@dimen/activity_horizontal_margin"
    android_paddingTop="@dimen/activity_vertical_margin"
    android_paddingBottom="@dimen/activity_vertical_margin" tools_context=".MainActivity">

    <ListView
        android_layout_width="fill_parent"
        android_id="@+id/listview"
        android_layout_height="fill_parent">

    </ListView>
```

**(c). menu.xml**

Then we have also a menu with menu items.

```xml
<menu

     tools_context=".MainActivity">
    <item android_id="@+id/context_menu_item1"
        android_title="Copy"
        android_orderInCategory="100"
        app_showAsAction="never" />
    <item android_id="@+id/context_menu_item2"
        android_title="sticky"
        android_orderInCategory="100"
        app_showAsAction="never" />
    <item android_id="@+id/context_menu_item3"
        android_title="Cut"
        android_orderInCategory="100"
        app_showAsAction="never" />

</menu>
```

## Example 4. ListView ContextMenu Open New Activity

In this full example we want to see how to show context menu in ListView. Then when a Contextmenu item is selected we show open a new activity.

**MainActivity.java**

This is the main activity.

```java
package com.example.ankitkumar.menuintent;

import android.support.v7.app.AppCompatActivity;
import android.os.Bundle;

public class MainActivity extends AppCompatActivity {

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);
    }
}
```

**ListView2Activity.java**

Our `ListView2Activity` class.

```java
package com.example.ankitkumar.menuintent;

import android.app.Activity;
import android.content.Intent;
import android.net.Uri;
import android.os.Bundle;
import android.view.ContextMenu;
import android.view.ContextMenu.ContextMenuInfo;
import android.view.MenuItem;
import android.view.View;
import android.widget.AdapterView;
import android.widget.AdapterView.OnItemClickListener;
import android.widget.ListView;
import android.widget.Toast;

public class ListView2Activity extends Activity implements OnItemClickListener
{
    /** Called when the activity is first created. */

    ListView lview;
    ListViewAdapter lviewAdapter;

    private final static String name[] = {"Pushpa","Latha","Arjun","Kiran","Arnav",
            };

    private final static String number[] = {"9988778877", "9988778874","9988778844",
            "7988778877","9968778877"};

    @Override
    public void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);

        lview = (ListView) findViewById(R.id.listView2);
        lviewAdapter = new ListViewAdapter(this, name, number);

        System.out.println("adapter => "+lviewAdapter.getCount());

        lview.setAdapter(lviewAdapter);

        lview.setOnItemClickListener(this);

        registerForContextMenu(lview);
    }

    public void onItemClick(AdapterView<?> arg0, View arg1, int position, long id) {
        // TODO Auto-generated method stub
        Toast.makeText(this,"Title => "+name[position]+"=> n Description"+number[position], Toast.LENGTH_SHORT).show();
    }

    @Override
    public void onCreateContextMenu(ContextMenu menu, View v, ContextMenuInfo menuInfo) {
        super.onCreateContextMenu(menu, v, menuInfo);
        menu.setHeaderTitle("Select The Action");
        menu.add(0, v.getId(), 0, "Call");
        menu.add(0, v.getId(), 0, "Send SMS");

    }

    @Override
    public boolean onContextItemSelected(MenuItem item) {

        AdapterView.AdapterContextMenuInfo info = (AdapterView.AdapterContextMenuInfo) item.getMenuInfo();
        String number1;

        try {
            number1 = number[info.position];

            if (item.getTitle() == "Call") {

                Intent callIntent = new Intent(Intent.ACTION_CALL);
                callIntent.setData(Uri.parse("tel:" + number1));
                startActivity(callIntent);

            } else if (item.getTitle() == "Send SMS") {
                Intent smsIntent = new Intent(Intent.ACTION_VIEW);
                smsIntent.setType("vnd.android-dir/mms-sms");
                smsIntent.putExtra("address", number1);
                startActivity(smsIntent);

            } else {
                return false;
            }
            return true;
        } catch (Exception e) {
            return true;
        }
    }
}
```

**ListViewAdapter.java**

Our `ListViewAdapter` class.

```java
package com.example.ankitkumar.menuintent;

import android.app.Activity;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.BaseAdapter;
import android.widget.TextView;

public class ListViewAdapter extends BaseAdapter
{
    Activity context;
    String title[];
    String description[];

    public ListViewAdapter(Activity context, String[] title, String[] description) {
        super();
        this.context = context;
        this.title = title;
        this.description = description;
    }

    public ListViewAdapter(ListView2Activity listView2Activity) {

    }

    public int getCount() {
        // TODO Auto-generated method stub
        return title.length;
    }

    public Object getItem(int position) {
        // TODO Auto-generated method stub
        return null;
    }

    public long getItemId(int position) {
        // TODO Auto-generated method stub
        return 0;
    }

    private class ViewHolder {
        TextView txtViewTitle;
        TextView txtViewDescription;
    }

    public View getView(int position, View convertView, ViewGroup parent)
    {
        // TODO Auto-generated method stub
        ViewHolder holder;
        LayoutInflater inflater =  context.getLayoutInflater();

        if (convertView == null)
        {
            convertView = inflater.inflate(R.layout.row, null);
            holder = new ViewHolder();
            holder.txtViewTitle = (TextView) convertView.findViewById(R.id.textView1);
            holder.txtViewDescription = (TextView) convertView.findViewById(R.id.textView2);
            convertView.setTag(holder);
        }
        else
        {
            holder = (ViewHolder) convertView.getTag();
        }

        holder.txtViewTitle.setText(title[position]);
        holder.txtViewDescription.setText(description[position]);

        return convertView;
    }

}
```

**activity_main.xml**

This is the layout for the main activity. It will contain a [ListView](https://camposha.info/android/listview) wrapped in a [LinearLayout](https://camposha.info/android/linearlayout).

```xml
<?xml version="1.0" encoding="utf-8"?>
<LinearLayout
              android_orientation="vertical"
              android_layout_width="fill_parent"
              android_layout_height="fill_parent">

    <ListView
        android_layout_height="wrap_content"
        android_id="@+id/listView2"
        android_layout_width="match_parent">
    </ListView>

</LinearLayout>
```

**row.xml**

This is the layout for a single item in the listview. It will be inflated into a View in the `ListViewAdapter` class.

```xml
<?xml version="1.0" encoding="utf-8"?>
<LinearLayout

    android_orientation="vertical"
    android_layout_width="match_parent"
    android_layout_height="match_parent">

    <TextView
        android_id="@+id/textView1"
        android_text="TextView"
        android_layout_height="wrap_content"
        android_layout_width="fill_parent"
        android_textAppearance="?android:attr/textAppearanceLarge">
    </TextView>

    <TextView
        android_text="TextView"
        android_id="@+id/textView2"
        android_layout_width="fill_parent"
        android_layout_height="wrap_content">
    </TextView>

</LinearLayout>
```

| No. | Location | Link |
| --- | --- | --- |
| 1. | GitHub | [Download](https://github.com/AnkitKumar111/Android_Assignment9.3/tree/master/sample/archive/master.zip) |
| 2. | GitHub | [Browse](https://github.com/AnkitKumar111/Android_Assignment9.3) |
| 2. | GitHub | [Original Creator: @AnkitKumar111](https://github.com/AnkitKumar111) |

## Example 5: Android SQLite CRUD – RecyclerView ContextMenu- INSERT SELECT, DELETE

_Android SQLite CRUD - RecyclerView ContextMenu- INSERT SELECT, DELETE Tutorial_

This is an android tutorial of how to work with SQLite datbase and RecyclerView with ContextMenu.

Today we see how to insert data to sqlite database from an input dialog,select that data and show it in a RecyclerView. We shall also see how to delete.Now for deleting we shall use a ContextMenu. User longclicks/long presses a RecyclerView card,then selects the action to perform. In short :

We perform the following:

1. Insert Data to SQLite Database
2. Retrieve Data from SQLite Database and render in a RecyclerView
3. Long press the recyclerview to show a contextmenu.
4. When uses longpresses,he gets presented with a ContextMenu to select the action to perform.
5. If he selects "New" we show an input dialog.While if he selects "Delete",we delete the data from our database.
6. Choose Delete to Delete data from SQLite database.

SQLite RecyclerView ContextMenu

SQLite RecyclerView ContextMenu

SQLite RecyclerView ContextMenu

Let's go.

#### 1\. Create Basic [Activity](https://camposha.info/android/activity) Project

Start by creating an empty project in android studio. Go to File --> New Project.

#### 2\. Add Dependencies

Let's add build.gradle dependencies. These are basically support library dependencies and no special third party library

```groovy
dependencies {
    compile fileTree(dir: 'libs', include: ['*.jar'])
    testCompile 'junit:junit:4.12'
    compile 'com.android.support:appcompat-v7:23.3.0'
    compile 'com.android.support:design:23.3.0'
    compile 'com.android.support:cardview-v7:23.3.0'
}
```

Here are our layouts for this project:

#### (a). activity_main.xml

- This layout gets inflated to MainActivity user interface.
- It includes the content_main.xml.

```xml
<?xml version="1.0" encoding="utf-8"?>
<android.support.design.widget.CoordinatorLayout

    android_layout_width="match_parent"
    android_layout_height="match_parent"
    android_fitsSystemWindows="true"
    tools_context="com.tutorials.hp.sqlitecontextmenudelete.MainActivity">

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

#### (b). content_main.xml

This layout gets included in your activity_main.xml. You define your UI widgets right here. In this case we add a RecyclerView as our AdapterView.

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
    tools_context="com.tutorials.hp.sqlitecontextmenudelete.MainActivity"
    tools_showIn="@layout/activity_main">

    <android.support.v7.widget.RecyclerView
        android_id="@+id/rv"
        android_layout_width="match_parent"
        android_layout_height="wrap_content"></android.support.v7.widget.RecyclerView>
</RelativeLayout>
```

### (c). dialog_layout.xml

This is our input dialog layout.

This layout will inflate to an input dialog that will be used as the data entry form.

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

        <Button android_id="@+id/saveBtn"
            android_layout_width="fill_parent"
            android_layout_height="wrap_content"
            android_text="Save"
            android_clickable="true"
            android_background="@color/colorAccent"
            android_layout_marginTop="40dp"
            android_textColor="@android:color/white"/>
        <Button android_id="@+id/retrieveBtn"
            android_layout_width="fill_parent"
            android_layout_height="wrap_content"
            android_text="Retrieve"
            android_clickable="true"
            android_background="@color/colorAccent"
            android_layout_marginTop="40dp"
            android_textColor="@android:color/white"/>

</LinearLayout>
</android.support.v7.widget.CardView>
```

#### (d). model.xml

This is our model or template layout for each row in our recyclerview.

At the root we have a CardView.

```xml
<?xml version="1.0" encoding="utf-8"?>
<android.support.v7.widget.CardView
    android_orientation="horizontal" android_layout_width="match_parent"

    android_layout_margin="5dp"
    card_view_cardCornerRadius="10dp"
    card_view_cardElevation="5dp"
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
            android_layout_alignParentTop="true"
            />
    </RelativeLayout>
</android.support.v7.widget.CardView>
```

### 4\. Java Classes

Here are our Java classes:

#### Our Data Object

This is our POJO class. Our data object.

Represents a single Planet object with several properties.

```java
package com.tutorials.hp.sqlitecontextmenudelete.mDataObject;

public class Planet {

    String name;
    int id;

    public Planet() {
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }
}
```

#### Our SQLite classes

##### (a). Constants.java

This is a class that represents our SQLite database Constants. These include:

1. Database name
2. database version
3. Table Name
4. Column Names.
5. SQLite Table-Creation and Table-Deletion statement.

```java
package com.tutorials.hp.sqlitecontextmenudelete.mDataBase;

public class Constants {
    //COLUMNS
    static final String ROW_ID="id";
    static final String NAME="name";

    //DB PROPS
    static final String DB_NAME="ff_DB";
    static final String TB_NAME="ff_TB";
    static final int DB_VERSION=1;

    //CREATE TB
    static final String CREATE_TB="CREATE TABLE ff_TB(id INTEGER PRIMARY KEY AUTOINCREMENT,"
            + "name TEXT NOT NULL);";

    //TABLE DROP STMT
    static final String DROP_TB="DROP TABLE IF EXISTS "+TB_NAME;

}
```

##### (c). DBHelper.java

This is our SQlite database helper class.

This class derives from SQLiteOpenHelper class.

This class is responsible for two tasks:

1. Creating Database Table
2. Upgrading Database Table

```java
package com.tutorials.hp.sqlitecontextmenudelete.mDataBase;

import android.content.Context;
import android.database.SQLException;
import android.database.sqlite.SQLiteDatabase;
import android.database.sqlite.SQLiteOpenHelper;

public class DBHelper extends SQLiteOpenHelper {

    public DBHelper(Context context) {
        super(context, Constants.DB_NAME, null, Constants.DB_VERSION);
    }

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

    @Override
    public void onUpgrade(SQLiteDatabase db, int oldVersion, int newVersion) {
        db.execSQL(Constants.DROP_TB);
        onCreate(db);
    }
}
```

##### (c). DBAdapter.java

This is our SQLite database Adapter class.

This class is responsible for:

1. Opening Database Connection.
2. Closing Database Connection.
3. Inserting Data to SQLite Database.
4. Retrieving Data from SQlite database.
5. Deletion of data from SQLite Database.

```java
package com.tutorials.hp.sqlitecontextmenudelete.mDataBase;

import android.content.ContentValues;
import android.content.Context;
import android.database.Cursor;
import android.database.SQLException;
import android.database.sqlite.SQLiteDatabase;

public class DBAdapter {
    Context c;
    SQLiteDatabase db;
    DBHelper helper;

    public DBAdapter(Context c) {
        this.c = c;
        helper=new DBHelper(c);
    }

    //OPEN
    public void openDB()
    {
        try
        {
           db=helper.getWritableDatabase();
        }catch (SQLException e)
        {
            e.printStackTrace();
        }
    }

    //CLOSE DB
    public void closeDB()
    {
        try
        {
            helper.close();
        }catch (SQLException e)
        {
            e.printStackTrace();
        }
    }

    //INSERT/SAVE
    public boolean add(String name)
    {
        try
        {
            ContentValues cv=new ContentValues();
            cv.put(Constants.NAME, name);

            db.insert(Constants.TB_NAME, Constants.ROW_ID, cv);

           return true;

        }catch (SQLException e)
        {
            e.printStackTrace();
        }

        return false;
    }

    //RETRIEVE
    public Cursor retrieve()
    {
        String[] columns={Constants.ROW_ID,Constants.NAME};

        return db.query(Constants.TB_NAME,columns,null,null,null,null,null);
    }

    //DELETE/REMOVE
    public boolean delete(int id)
    {
        try
        {
            int result=db.delete(Constants.TB_NAME,Constants.ROW_ID+" =?",new String[]{String.valueOf(id)});

            if(result>0)
            {
                return true;
            }

        }catch (SQLException e)
        {
            e.printStackTrace();
        }

        return false;
    }
}
```

#### Our RecyclerView classes

##### (a). MyLongClickListener.java

Our RecyclerView viewitems long click listener interface. With contextmenu we simply mean you longclick and you are then presented with a menu where you can select a menu item.Therefore we need to implement the OnLongClickListener.But first lets define its signature :

```java
package com.tutorials.hp.sqlitecontextmenudelete.mRecycler;

public interface MyLongClickListener {

    void onLongClick(int pos);

}
```

##### (b). MyHolder.java

Our RecyclerView.ViewHolder class.The above LongClickListener interface shall get implemented by our ViewHolder class.Take note that also we implement the OnCreateContextMenuListener interface as well :

```java
package com.tutorials.hp.sqlitecontextmenudelete.mRecycler;

import android.support.v7.widget.RecyclerView;
import android.view.ContextMenu;
import android.view.View;
import android.widget.TextView;

import com.tutorials.hp.sqlitecontextmenudelete.R;

public class MyHolder extends RecyclerView.ViewHolder implements View.OnLongClickListener,View.OnCreateContextMenuListener {

    TextView nameTxt;
    MyLongClickListener longClickListener;

    public MyHolder(View itemView) {
        super(itemView);

        this.nameTxt= (TextView) itemView.findViewById(R.id.nameTxt);

        itemView.setOnLongClickListener(this);
        itemView.setOnCreateContextMenuListener(this);
    }

    public void setLongClickListener(MyLongClickListener longClickListener)
    {
        this.longClickListener=longClickListener;
    }

    @Override
    public boolean onLongClick(View v) {
        this.longClickListener.onLongClick(getLayoutPosition());
        return false;
    }

    @Override
    public void onCreateContextMenu(ContextMenu menu, View v, ContextMenu.ContextMenuInfo menuInfo) {

        //OUR CONTEXT MENU
        menu.setHeaderTitle("ACTION : ");
        menu.add(0,0,0,"New");
        menu.add(0,1,0,"Delete");

    }
}
```

##### (c). MyAdapter.java

Our RecyclerView Adapter class.Remember we shall be using using  a RecyclerView as our component,therefore here's our adapter class. It Will inflate our model.xml layout into a view objects and bind data from the sqlite database to them.

```java
package com.tutorials.hp.sqlitecontextmenudelete.mRecycler;

import android.content.Context;
import android.support.v7.widget.RecyclerView;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.Toast;

import com.tutorials.hp.sqlitecontextmenudelete.R;
import com.tutorials.hp.sqlitecontextmenudelete.mDataBase.DBAdapter;
import com.tutorials.hp.sqlitecontextmenudelete.mDataObject.Planet;

import java.util.ArrayList;

public class MyAdapter extends RecyclerView.Adapter<MyHolder> {

    Context c;
    ArrayList<Planet> planets;
    int selectedPos;

    public MyAdapter(Context c, ArrayList<Planet> planets) {
        this.c = c;
        this.planets = planets;
    }

    @Override
    public MyHolder onCreateViewHolder(ViewGroup parent, int viewType) {
        View v= LayoutInflater.from(parent.getContext()).inflate(R.layout.model,parent,false);
        MyHolder holder=new MyHolder(v);
        return holder;
    }

    @Override
    public void onBindViewHolder(MyHolder holder, int position) {
         holder.nameTxt.setText(planets.get(position).getName());

        holder.setLongClickListener(new MyLongClickListener() {
            @Override
            public void onLongClick(int pos) {
                selectedPos=pos;
            }
        });
    }

    @Override
    public int getItemCount() {
        return planets.size();
    }

    //DELETE PLANET
    public void deletePlanet()
    {
        //GET ID
        Planet p=planets.get(selectedPos);
        int id=p.getId();

        //DELETE IT FROM DB
        DBAdapter db=new DBAdapter(c);
        db.openDB();
        if(db.delete(id))
        {
            //DELETE ALSO FROM ARRAYLIST
            planets.remove(selectedPos);
        }else {
            Toast.makeText(c,"Unable To Delete",Toast.LENGTH_SHORT).show();
        }

        db.closeDB();

        this.notifyItemRemoved(selectedPos);
    }

}
```

#### Our [Activity](https://camposha.info/android/activity) class

##### MainActivity.java

This is our main activity. It represents our UI screen.

Our UI will comprise of a RecyclerView with data items from SQLite database.

It will also host a dialog which will act as our data entry form.

```java
package com.tutorials.hp.sqlitecontextmenudelete;

import android.app.Dialog;
import android.database.Cursor;
import android.os.Bundle;
import android.support.design.widget.FloatingActionButton;
import android.support.design.widget.Snackbar;
import android.support.v7.app.AppCompatActivity;
import android.support.v7.widget.LinearLayoutManager;
import android.support.v7.widget.RecyclerView;
import android.support.v7.widget.Toolbar;
import android.view.View;
import android.view.Menu;
import android.view.MenuItem;
import android.widget.Button;
import android.widget.EditText;
import android.widget.Toast;

import com.tutorials.hp.sqlitecontextmenudelete.mDataBase.DBAdapter;
import com.tutorials.hp.sqlitecontextmenudelete.mDataObject.Planet;
import com.tutorials.hp.sqlitecontextmenudelete.mRecycler.MyAdapter;

import java.util.ArrayList;

public class MainActivity extends AppCompatActivity {

    RecyclerView rv;
    MyAdapter adapter;
    EditText nameEditText;
    Button saveBtn,retrieveBtn;
    ArrayList<Planet> planets=new ArrayList<>();

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);
        Toolbar toolbar = (Toolbar) findViewById(R.id.toolbar);
        setSupportActionBar(toolbar);
        FloatingActionButton fab = (FloatingActionButton) findViewById(R.id.fab);

        rv= (RecyclerView) findViewById(R.id.rv);
        rv.setLayoutManager(new LinearLayoutManager(this));

        adapter=new MyAdapter(this,planets);

        fab.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View view) {

                displayDialog();
            }
        });
    }

    private void displayDialog()
    {
        Dialog d=new Dialog(this);
        d.setTitle("SQLite Database");
        d.setContentView(R.layout.dialog_layout);

        nameEditText= (EditText) d.findViewById(R.id.nameEditTxt);
        saveBtn= (Button) d.findViewById(R.id.saveBtn);
        retrieveBtn= (Button) d.findViewById(R.id.retrieveBtn);

        saveBtn.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
               save(nameEditText.getText().toString());
            }
        });
        retrieveBtn.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                getPlanets();
            }
        });

        d.show();
    }

    private void save(String name)
    {
        DBAdapter db=new DBAdapter(this);
        db.openDB();
        if(db.add(name))
        {
            nameEditText.setText("");
        }else
        {
            Toast.makeText(this,"Unable To Save",Toast.LENGTH_SHORT).show();
        }

        db.closeDB();

        //REFRESH
        getPlanets();
    }

    private void getPlanets()
    {
        planets.clear();

        DBAdapter db=new DBAdapter(this);
        db.openDB();
        Planet p=null;
        Cursor c=db.retrieve();

        while (c.moveToNext())
        {
            int id=c.getInt(0);
            String name=c.getString(1);

            p=new Planet();
            p.setId(id);
            p.setName(name);

            planets.add(p);
        }

        db.closeDB();

        if(planets.size()>0)
        {
            rv.setAdapter(adapter);
        }
    }

    @Override
    public boolean onContextItemSelected(MenuItem item) {
        if(item.getTitle()=="New")
        {
            displayDialog();
        }else if(item.getTitle()=="Delete")
        {
            adapter.deletePlanet();
        }
        return super.onContextItemSelected(item);
    }
}
```

#### Download

| No. | Location | Link |
| --- | --- | --- |
| 1. | GitHub | [Direct Download](https://github.com/Oclemy/SQLiteContextMenuDelete/archive/master.zip)) |
| 2. | GitHub | [Browse](https://github.com/Oclemy/SQLiteContextMenuDelete) |
| 3. | YouTube | [Video Tutorial](https://www.youtube.com/watch?v=acNwtlAKRmA) |
| 4. | YouTube | [Our YouTube Channel](https://www.youtube.com/channel/UCpdkWp2zh5Qv1ZWlnqswdCw) |
