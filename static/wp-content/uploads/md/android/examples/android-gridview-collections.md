# GridView with Collections Examples


In this tutorial we want to look at several gridview examples related to collections like arrays, arraylist etc.

_Android GridView Tutorial_

_A gridview is an adapterview that shows items in a two-dimensional grid._

In this tutorial we cover GridView extensively then look at various usage examples.

These grids are scrollable. GridView is an adapterview because it works with adapters. Adapters can then bind data to the gridview.


This is important because then it means that the gridview is decoupled from it's data source. So you can customize the gridview as you like without interfering with the data source. You can also work on the data source without affecting the visual appearance of the gridview.

GridView derives from `AbsListview`.

```java
public class GridView extends android.widget.AbsListView{}
```

Both reside in the `android.widget` packages.

`AbsListview` is an abstract class and you won't use in directly. You'll use it in case you want to implement your own custom view with unique properties.

Even the sister of `GridView` which is `ListView` also directly derives from `AbsListview`. So `AbsListview` is a base class. It's used to implement virtualized list of items. Given it's virtualized you can implement it to show lists in various forms:

- Lists -vertical and horizontal
- Grids
- Carousel
- Stack

And so on.

So in our case the gridview uses it to display items in a grid. And we call the implementation the `Gridview`.

Some of the typical uses of gridview include:

- Showing image gallery.
- Showing list of movies.
- Showing list of products etc.

Like other views and widgets, gridview are first defined in the xml layout. This is because android views and widgets are normally defined using XML, a markup language. Though it's also possible to create the views and widgets using raw java. However, XML has several advanatges:

1. It's easier compared to having to remember the various APIs for creating views programmatically.
2. It's more flexible and customizable.
3. It decouples the user interface from the application logic. This leads to maintenable code.
4. It's more reusable. You can easily copy paste XML code from online and reuse as opposed to java code.
5. We can use the designer to generate the XML code.

To work with XML, first we add the gridview xml definition inside our layout:

```xml
    <?xml version="1.0" encoding="utf-8"?>
    <GridView 
        android_id="@+id/gridview"
        android_layout_width="match_parent"
        android_layout_height="match_parent"
        android_columnWidth="90dp"
        android_numColumns="auto_fit"
        android_verticalSpacing="10dp"
        android_horizontalSpacing="10dp"
        android_stretchMode="columnWidth"
        android_gravity="center"
    />
```

Then we can move to our java code and reference the gridview and set its adapter:

```java
    public void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.main);

        GridView gridview = (GridView) findViewById(R.id.gridview);
        gridview.setAdapter(new MyAdapter(this));

        gridview.setOnItemClickListener(new OnItemClickListener() {
            public void onItemClick(AdapterView<?> parent, View v,
                    int position, long id) {
                Toast.makeText(HelloGridView.this, "" + position,
                        Toast.LENGTH_SHORT).show();
            }
        });
    }
```

### 1\. Populate GridView From String Array

Let's put a GridView into practice by filling it with an array of strings. We are using GridView as it is without applying a custom layout. This means that a default textview will be used to render the view items in a grid.

For that we just need an arrayadapter to allow us bind data to our gridview. Adapters are important because they act as the bridge to the data source. In our case that data source is a simple string array.

##### (a). activity_main.xml

- This layout gets inflated to MainActivity user interface.

We add a GridView here. We've placed a header label using a TextView. We've wrapped them with a [relativelayout](/android/relativelayout).

Here's the full layout:

```xml
<?xml version="1.0" encoding="utf-8"?>
<RelativeLayout 

    android_layout_width="match_parent"
    android_layout_height="match_parent"
    tools_context="info.tutorialsloop.hp.stringarraygridview.MainActivity">

    <TextView
        android_id="@+id/headerLabel"
        android_layout_width="wrap_content"
        android_layout_height="wrap_content"
        android_layout_alignParentTop="true"
        android_layout_centerHorizontal="true"
        android_fontFamily="casual"
        android_text="String[] GridView"
        android_textAllCaps="true"
        android_textSize="24sp"
        android_textStyle="bold" />

    <GridView
        android_id="@+id/myGridView"
        android_layout_width="match_parent"
        android_layout_height="match_parent"
        android_layout_alignParentEnd="true"
        android_layout_alignParentRight="true"
        android_numColumns="auto_fit"
        android_layout_below="@+id/headerLabel"
        android_layout_marginTop="33dp" />

</RelativeLayout>
```

You can see we've assigned our GridView an id using the `android:id` attribute. All views require an id for identification purposes. Assigning our gridview an id as we've done above means that from our `MainActivity.java` we will be able to reference it via the `findViewById()` method.

We've also used the `android:numColumns` attribute, assigning it the value `auto_fit`. That will make our GridView flexible to adapt to the screen size and display the best number of columns based on the screen size.

#### 4\. MainActivity.java

In our `MainActivity` we start by adding several import statements:

Among them include:

1. `android.app.Activity` - This is because our `MainActivity` class will inherit from the [Activity](/android/activity) class.
2. `android.widget.ArrayAdapter` - This is because our gridview needs an adapter for it to work.Why? Well because it is the adapter that will supply it with data.
3. `android.widget.GridView` - Our GridView. This is our adapterview. It will render our data.

We then prepared the data source, in this case our array of galaxies.

```java
    private String[] galaxies={"Sombrero", "Cartwheel", "Pinwheel", "StarBust","Whirlpool","Ring Nebular", "Own Nebular","Centaurus A", "Virgo Stellar Stream", "Canis Majos Overdensity"
            , "Mayall's Object", "Leo","Small Magellonic Cloud", "Large Magellonic Cloud","Milky Way","Whirlpool","Black Eye Galaxy","IC 1011","Messier 81", "Andromeda", "Messier 87"};
```

**How to Reference a GridView**

We then reference our GridView, as we said, using the `findViewById` method.:

```java
    GridView gv= findViewById(R.id.myGridView);
```

The `myGridView` is an id we had specified for the GridView in our XML Layout.

**How to Set an Adapter to Our GridView**

Well GridView itself as a class provides us the `setAdapter()` method. That method is supposed to take a `ListAdapter` object. That `ListAdapter` will be responsible for providing the grid's data.

```java
void setAdapter (ListAdapter adapter)
```

It's role is to Set the data behind this GridView.

Here's an example:

```java
gv.setAdapter(new ArrayAdapter<>(this,android.R.layout.simple_list_item_1,galaxies));
```

In our case we've passed our string array of galaxies as our data source. Moreover we've passed a Context object as well as the type of layout to use. `android.R.layout.simple_list_item_1` will be used, which basically as a simple textview.

**How to Listen To GridView Click Events.**

Listening to grid click events is very important as it allows users to react to individual items in our gridview. For example user can click a gridview item then navigate to a different activity or show a Toast message.

To handle click events we use the `setOnItemClickListener` method.

```java

        gv.setOnItemClickListener(new AdapterView.OnItemClickListener() {
            @Override
            public void onItemClick(AdapterView<?> adapterView, View view, int i, long l) {
                Toast.makeText(MainActivity.this, galaxies[i], Toast.LENGTH_SHORT).show();
            }
        });
```

```java
package info.tutorialsloop.hp.stringarraygridview;

import android.app.Activity;
import android.os.Bundle;
import android.view.View;
import android.widget.AdapterView;
import android.widget.ArrayAdapter;
import android.widget.GridView;
import android.widget.Toast;

public class MainActivity extends Activity {

    GridView gv;
    private String[] galaxies={"Sombrero", "Cartwheel", "Pinwheel", "StarBust","Whirlpool","Ring Nebular", "Own Nebular","Centaurus A", "Virgo Stellar Stream", "Canis Majos Overdensity"
            , "Mayall's Object", "Leo","Small Magellonic Cloud", "Large Magellonic Cloud","Milky Way","Whirlpool","Black Eye Galaxy","IC 1011","Messier 81", "Andromeda", "Messier 87"};

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);

        initializeGridView();

    }
    private void initializeGridView()
    {
        gv= findViewById(R.id.myGridView);
        gv.setAdapter(new ArrayAdapter<>(this,android.R.layout.simple_list_item_1,galaxies));

        gv.setOnItemClickListener(new AdapterView.OnItemClickListener() {
            @Override
            public void onItemClick(AdapterView<?> adapterView, View view, int i, long l) {
                Toast.makeText(MainActivity.this, galaxies[i], Toast.LENGTH_SHORT).show();
            }
        });
    }
}
```

#### Download

| Resource | Link |
| --- | --- |
| GitHub Browse | Browse |
| GitHub Download Link | [Download](https://github.com/Oclemy/GridViewArray/archive/master.zip) |

### 2\. Android Simple GridView - Fill With List of Objects

Hello friends.Today we see how to work with a simple gridview and objects.In short here is what we do:

1. Fill list of objects to an arraylist.
2. Bind the list to gridview via arrayadapter.
3. Handle ItemClick events.

#### Demo

#### SECTION 1 : OUR MODEL CLASS

- Represents a single "person" object.

```java
package com.tutorials.hp.gridviewandobjects;

public class Person {

    int id;
    String name;

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }
}
```

#### OUR MainActivity

```java
package com.tutorials.hp.gridviewandobjects;

import android.support.v7.app.AppCompatActivity;
import android.os.Bundle;
import android.view.View;
import android.widget.AdapterView;
import android.widget.ArrayAdapter;
import android.widget.GridView;
import android.widget.Toast;

import java.util.ArrayList;
import java.util.List;

public class MainActivity extends AppCompatActivity {

    List<String> people=new ArrayList<>();

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);

        //GRIDVIEW
        GridView gv= (GridView) findViewById(R.id.gv);

        //FILL LIST
        fillPeople();

        //ADAPTER
        ArrayAdapter<String> adapter=new ArrayAdapter<String>(this,android.R.layout.simple_list_item_1,people);
        gv.setAdapter(adapter);

        gv.setOnItemClickListener(new AdapterView.OnItemClickListener() {
            @Override
            public void onItemClick(AdapterView<?> adapterView, View view, int i, long l) {
                Toast.makeText(MainActivity.this, people.get(i), Toast.LENGTH_SHORT).show();

            }
        });
    }

    private void fillPeople()
    {
        people.clear();

        Person p=new Person();
        p.setName("Mike");
        people.add(p.getName());

        p=new Person();
        p.setName("John");
        people.add(p.getName());

        p=new Person();
        p.setName("Lucy");
        people.add(p.getName());

        p=new Person();
        p.setName("Rebecca");
        people.add(p.getName());

        p=new Person();
        p.setName("Kris");
        people.add(p.getName());

        p=new Person();
        p.setName("Kurt");
        people.add(p.getName());

        p=new Person();
        p.setName("Vin");
        people.add(p.getName());
    }
}
```

#### OUR LAYOUT

We add our GridView here.

```xml
<?xml version="1.0" encoding="utf-8"?>
<RelativeLayout 

    android_layout_width="match_parent"
    android_layout_height="match_parent"
    android_paddingBottom="@dimen/activity_vertical_margin"
    android_paddingLeft="@dimen/activity_horizontal_margin"
    android_paddingRight="@dimen/activity_horizontal_margin"
    android_paddingTop="@dimen/activity_vertical_margin"
    tools_context="com.tutorials.hp.gridviewandobjects.MainActivity">

    <GridView
        android_id="@+id/gv"
        android_layout_width="match_parent"
        android_layout_height="wrap_content"
        android_numColumns="3" />
</RelativeLayout>
```

#### Download

You can download the full project here.

| No. | Resource | Direct Links |
| --- | --- | --- |
| 1. | GitHub Source Code | [Browse](https://github.com/Oclemy/GridView_and_Objects) |
| 2. | Source Code | [Download](https://github.com/Oclemy/GridView_and_Objects/archive/master.zip) |
| 3. | YouTube | [Channel](https://www.youtube.com/c/ProgrammingWizards) |

## Example 1: Android GridView - CRUD - ADD UPDATE DELETE

 _GridView CRUD tutorial._

Hello.We see how to perform basic CRUD operations against GridView.

- We add,update and delete.
- Our basic data source is an arraylist.
- Our adapter is ArrayAdapter.

Let's start.

#### 1\. CRUD.java

Our aim is to learn how to perform CRUD(Create Read Update Delete) while using a GridView. Hence it is better to create a separate concrete class that will:

1. Maintain our data source. In this case we ise a simple ArrayList:
    
    ```java
    private ArrayList<String> names =new ArrayList<>();
    ```
    
    \*\*Save or Add data to GridView.\*\*
    
    We will use the ArrayList's `add()` method.
    
    ```java
    public void save(String name)
    {
       names.add(name);
    }
    ```
    
    \*\*Get or Retrieve all data\*\*
    
    ```java
        public ArrayList<String> getNames()
        {
    
            return names;
        }
    ```
    
    \*\*Update Data.\*\*
    
    Updating basically means removing the existing and replacing it with a new one.
    
    ```java
    
    public Boolean update(int position,String newName)
    {
       try {
           names.remove(position);
           names.add(position,newName);
    
           return true;
       }catch (Exception e)
       {
           e.printStackTrace();
          return false;
        }
    }
    ```
    
2. Delete Data Deleting implies removing an existing data without any replacement ocurring:
    
    ```java
    public Boolean delete(int position)
    {
        try {
            names.remove(position);
    
            return true;
        }catch (Exception e)
        {
            e.printStackTrace();
            return false;
    
        }
    }
    ```
    
    Here's the full class:
    
    ```java
    package com.tutorials.hp.gridview_crud;
    
    import java.util.ArrayList;
    
    public class CRUD {
    
        private ArrayList<String> names =new ArrayList<>();
    
        public void save(String name)
        {
           names.add(name);
        }
        public ArrayList<String> getNames()
        {
            return names;
        }
        public Boolean update(int position,String newName)
        {
           try {
               names.remove(position);
               names.add(position,newName);
    
               return true;
           }catch (Exception e)
           {
               e.printStackTrace();
              return false;
            }
        }
        public Boolean delete(int position)
        {
            try {
                names.remove(position);
    
                return true;
            }catch (Exception e)
            {
                e.printStackTrace();
                return false;
    
            }
        }
    }
    ```
    
    #### 2\. MainActivity.java
    
    Here's our main and only activity. Activity represent screens that the users act on. You can think of it as pages in an application. Your application can have several activities. However this is not a must. For example you can have an activity contain a fragment or a dialog.
    
    A [Fragment](/android/fragment) is a sub-activity that has to be hosted in a main activity. You can use it to display for example an input form. However the simplest way is to use a Dialog. Dialog don't require us to create separate java files nor deal with complex lifecycle callbacks.
    
    Instead we can just instantiate one and give it a layout. We will use a Dialog to display our input form. That form will just have some EditText and some buttons. The user will input data in the edittext and click any of those button depending on the action.
    
    For example our CRUD doesn't use any database for simplicity as our focus is GridView and not data source. So we will support:
    
    1. Adding Data typed in EditText to GridView.
    2. Updating that Data.
    3. Deleting the data from the GridView.
    
    ```java
    package com.tutorials.hp.gridview_crud;
    
    import android.app.Dialog;
    import android.os.Bundle;
    import android.support.design.widget.FloatingActionButton;
    import android.support.v7.app.AppCompatActivity;
    import android.support.v7.widget.Toolbar;
    import android.view.View;
    import android.widget.AdapterView;
    import android.widget.ArrayAdapter;
    import android.widget.Button;
    import android.widget.EditText;
    import android.widget.GridView;
    import android.widget.Toast;
    
    public class MainActivity extends AppCompatActivity {
    
        GridView gv;
        ArrayAdapter<String> adapter;
        CRUD crud=new CRUD();
        Dialog d;
    
        @Override
        protected void onCreate(Bundle savedInstanceState) {
            super.onCreate(savedInstanceState);
            setContentView(R.layout.activity_main);
            Toolbar toolbar = (Toolbar) findViewById(R.id.toolbar);
            setSupportActionBar(toolbar);
    
            gv= (GridView) findViewById(R.id.gv);
    
            gv.setOnItemClickListener(new AdapterView.OnItemClickListener() {
                @Override
                public void onItemClick(AdapterView<?> adapterView, View view, int i, long l) {
                    if(d != null) {
                        if(!d.isShowing())
                        {
                            displayInputDialog(i);
                        }else
                        {
                            d.dismiss();
                        }
                    }
                }
            });
    
            final FloatingActionButton fab = (FloatingActionButton) findViewById(R.id.fab);
            fab.setOnClickListener(new View.OnClickListener() {
                @Override
                public void onClick(View view) {
                 //DISPLAY DIALOG FOR NEW DATA
                    displayInputDialog(-1);
                }
            });
        }
        private void displayInputDialog(final int pos)
        {
            d=new Dialog(this);
            d.setTitle("GRIDVIEW CRUD");
            d.setContentView(R.layout.input_dialog);
    
            final EditText nameEditTxt= (EditText) d.findViewById(R.id.nameEditText);
            Button addBtn= (Button) d.findViewById(R.id.addBtn);
            Button updateBtn= (Button) d.findViewById(R.id.updateBtn);
            Button deleteBtn= (Button) d.findViewById(R.id.deleteBtn);
    
            if(pos== -1)
            {
                addBtn.setEnabled(true);
                updateBtn.setEnabled(false);
                deleteBtn.setEnabled(false);
            }else
            {
                addBtn.setEnabled(true);
                updateBtn.setEnabled(true);
                deleteBtn.setEnabled(true);
                nameEditTxt.setText(crud.getNames().get(pos));
            }
    
            addBtn.setOnClickListener(new View.OnClickListener() {
                @Override
                public void onClick(View v) {
                    //GET DATA
                    String name=nameEditTxt.getText().toString();
    
                    //VALIDATE
                    if(name.length()>0 && name != null)
                    {
                        //save
                        crud.save(name);
                        nameEditTxt.setText("");
                        adapter=new ArrayAdapter<String>(MainActivity.this,android.R.layout.simple_list_item_1,crud.getNames());
                        gv.setAdapter(adapter);
    
                    }else
                    {
                        Toast.makeText(MainActivity.this, "Name cannot be empty", Toast.LENGTH_SHORT).show();
                    }
                }
            });
            updateBtn.setOnClickListener(new View.OnClickListener() {
                @Override
                public void onClick(View v) {
                    //GET DATA
                    String newName=nameEditTxt.getText().toString();
    
                    //VALIDATE
                    if(newName.length()>0 && newName != null)
                    {
                        //save
                        if(crud.update(pos,newName))
                        {
                            nameEditTxt.setText(newName);
                            adapter=new ArrayAdapter<String>(MainActivity.this,android.R.layout.simple_list_item_1,crud.getNames());
                            gv.setAdapter(adapter);
                        }
    
                    }else
                    {
                        Toast.makeText(MainActivity.this, "Name cannot be empty", Toast.LENGTH_SHORT).show();
                    }
                }
            });
            deleteBtn.setOnClickListener(new View.OnClickListener() {
                @Override
                public void onClick(View v) {
    
                    //DELETE
                    if( crud.delete(pos))
                    {
                        nameEditTxt.setText("");
                        adapter=new ArrayAdapter<String>(MainActivity.this,android.R.layout.simple_list_item_1,crud.getNames());
                        gv.setAdapter(adapter);
                    }
                }
            });
    
            d.show();
        }
    }
    ```
    
    #### 3\. activity_main.xml
    
    This is the main layout for our `MainActivity.java`. This is also acting as our template layout in that it holds the general parts of our activity like ToolBar and AppBar.
    
    Then it includes the `content_main.xml` which will actually hold our `GridView`.
    
    ```xml
    <?xml version="1.0" encoding="utf-8"?>
    <android.support.design.widget.CoordinatorLayout 
    
        android_layout_width="match_parent"
        android_layout_height="match_parent"
        android_fitsSystemWindows="true"
        tools_context="com.tutorials.hp.gridview_crud.MainActivity">
    
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
    
    #### 4\. content_main.xml
    
    This is the content layout as the name suggests. It will hold contain our GridView. It is independent of other parts of the screen like the ToolBar and AppBar.
    
    All we need is come and add a GridView right here.
    
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
        tools_context="com.tutorials.hp.gridview_crud.MainActivity"
        tools_showIn="@layout/activity_main">
    
        <GridView
            android_id="@+id/gv"
            android_layout_width="wrap_content"
            android_layout_height="wrap_content"
            android_numColumns="3" />
    </RelativeLayout>
    ```
    
    #### 5\. input_dialog.xml
    
    Thisis our input view. Users will input data via this layut. We shall inflate from an XML layout into a dialog. This ensures we have another screen without having to create a fragment or a new activity.
    
    We have an EditText where users will type data. Then buttons for adding updating and deleting the items.
    
    ```xml
    <?xml version="1.0" encoding="utf-8"?>
    <LinearLayout 
        android_orientation="vertical" android_layout_width="match_parent"
        android_layout_height="match_parent">
    
        <LinearLayout
            android_layout_width="fill_parent"
            android_layout_height="match_parent"
            android_layout_marginTop="?attr/actionBarSize"
            android_orientation="vertical"
            android_paddingLeft="15dp"
            android_paddingRight="15dp"
            android_paddingTop="10dp">
    
            <android.support.design.widget.TextInputLayout
                android_id="@+id/nameLayout"
                android_layout_width="match_parent"
                android_layout_height="wrap_content">
    
                <EditText
                    android_id="@+id/nameEditText"
                    android_layout_width="match_parent"
                    android_layout_height="wrap_content"
                    android_singleLine="true"
                    android_hint= "Name" />
            </android.support.design.widget.TextInputLayout>
    
    <LinearLayout
        android_orientation="horizontal"
        android_layout_width="match_parent"
        android_layout_height="wrap_content">
        <Button android_id="@+id/addBtn"
            android_layout_width="wrap_content"
            android_layout_height="wrap_content"
            android_text="ADD"
            android_clickable="true"
            android_background="@color/colorAccent"
            android_layout_marginTop="20dp"
            android_textColor="@android:color/white"/>
    
        <Button android_id="@+id/updateBtn"
            android_layout_width="wrap_content"
            android_layout_height="wrap_content"
            android_text="UPDATE"
            android_clickable="true"
            android_background="#009968"
            android_layout_marginTop="20dp"
            android_textColor="@android:color/white"/>
    
        <Button android_id="@+id/deleteBtn"
            android_layout_width="wrap_content"
            android_layout_height="wrap_content"
            android_text="DELETE"
            android_clickable="true"
            android_background="#2fc1b9"
            android_layout_marginTop="20dp"
            android_textColor="@android:color/white"/>
    </LinearLayout>
             </LinearLayout>
    
    </LinearLayout>
    ```
    
    #### Download
    
    | Resource | Link |
    | --- | --- |
    | GitHub Browse | [Browse](https://github.com/GridView-CRUD) |
    | GitHub Download Link | [Download](https://github.com/Oclemy/GridView-CRUD/archive/master.zip) |
