# ListView with Collections Examples


Android ListView simple examples based on working with collections and listening to various events.

> _A ListView is an android widget that allows us to render a list of scrollable items._

ListView is an adapterview like gridview and spinner. This means that it requires an adapter for it to insert its items. The adapter becomes responsible for pulling data from a content source.

This source can be an array or something more complex like database or from the network. Not only that but the adapter will also be responsible for converting each item result into a view that will be placed into the listview.

This is because as an adapterview the [ListView](/android/listview) does not know the details, such as type and contents, of the views it contains. So it will ask for the views on demand from a ListAdapter as needed. For instance it asks for these views as the user scrolls up or down.

Each of the views in the ListView is positioned immediately below the previous view in the list.



##### ListView API Definition

Here’s ListView’s API definition.

```java
java.lang.Object
   ↳    android.view.View
       ↳    android.view.ViewGroup
           ↳    android.widget.AdapterView<android.widget.ListAdapter>
               ↳    android.widget.AbsListView
                   ↳    android.widget.ListView
```

Clearly you can see ListView is residing in the `android.widget` package and deriving from the abstract AbsListView class.

##### How do we Display a ListView?

Well to display a ListView all you need is add the ListView in the XML layout.

```xml
<ListView
      android_id="@+id/list_view"
      android_layout_width="match_parent"
      android_layout_height="match_parent" />
```

1. `android:id="@+id/list_view"` – We are assigning the ListView an ID.
2. `android:layout_width="match_parent"` – We set the width of our ListView to match that of the Layout onto which the ListView is being rendered.
3. `android:layout_height="match_parent"` – We set the height of our ListView to match that of the Layout onto which the ListView is being rendered.

##### Setting ItemClicks to Simple ListView.

Here’s how we will listen to itemClicks for our ListView, thus showing a simple toast message.

We need to invoke the `setOnItemClickListener()` method of our ListView and pass into it an `AdapterView.OnItemClickListener()` annonymous class, and then override the `onItemClick()` method.

In this case `pos` is the position of the clicked item in the ListView.

```java
        myListView.setOnItemClickListener(new AdapterView.OnItemClickListener() {
            @Override
            public void onItemClick(AdapterView<?> adapterView, View view, int pos, long id) {
                Toast.makeText(MainActivity.this, languages.get(i), Toast.LENGTH_SHORT).show();
            }
        });
```

##### How do we create a Custom Adapter for ListView.

You can use several adapters, but the most commonly used is BaseAdapter.

```java
private class MyCustomAdapter extends BaseAdapter {

      // override other abstract methods here

      @Override
      public View getView(int position, View convertView, ViewGroup container) {
          if (convertView == null) {
              convertView = getLayoutInflater().inflate(R.layout.my_list_item, container, false);
          }

          ((TextView) convertView.findViewById(android.R.id.nameTxt))
                  .setText(getItem(position));
          return convertView;
      }
  }
```

#### How do we set an adapter to a ListView?

We set an adapter to a ListView using the [setAdapter()](/android/listview#setAdapter) method. This method is as follows:

```java
public void setAdapter (ListAdapter adapter)
```

The `setAdapter()` method is responsible for binding our data to our ListView.

We need to pass an adapter to this method. This adapter may be wrapped by a [WrapperListAdapter](https://developer.android.com/reference/android/widget/WrapperListAdapter.html), depending on the ListView features currently in use. For instance, adding headers and/or footers will cause the adapter to be wrapped.

A WrapperListAdapter is a List adapter that wraps another list adapter.

|  |
| --- |
| Adapter | ListAdapter: The ListAdapter which is responsible for maintaining the data backing this list and for producing a view to represent an item in that data set. |

#### Which XML attributes are defined in the ListView class?

Majority of the XML attributes you will use are defined in the parent classes like AbsListView, which also inherits from other base classes like ViewGroup and View.

However `ListView` also has the following attributes defined:

|  |
| --- |
| 1. | `android:divider` | Drawable or color to draw between list items. |
| 2. | `android:divider` | Drawable or color to draw between list items. |
| 3. | `android:dividerHeight` | Height of the divider. |
| 4. | `android:entries` | Reference to an array resource that will populate the ListView. |
| 5. | `android:footerDividersEnabled` | When set to false, the ListView will not draw the divider before each footer view. |
| 6. | `android:headerDividersEnabled` | When set to false, the ListView will not draw the divider after each header view. |

#### Which types of Adapters can ListView be used with?

Here are some of the adapters that can be used with a ListView:

|  |
| --- |
| 1. | `BaseAdapter` | A super class of common implementations for an `android.widget.Adapter` interface.It implements both `ListAdapter` and `SpinnerAdapter` interfaces. |
| 2. | `ArrayAdapter` | A `BaseAdapter` child which uses an array of arbitrary objects as data source. |
| 3. | `CursorAdapter` | An abstract `BaseAdapter` child used to expose data from `android.database.Cursor` to a ListView. |

#### Simple ListView Example

Let’s look at a [simple ListView example](/source/android-simple-listview-onitemclick) that will handle display a list of programming languages.

When the user clicks a single item, the clicked language is shown in a Toast message.

## Example 1: Android ListView – Fill With Array

This is a simple ListView tutorial.Here is what we do:

- Fill [ListView](/android/listview) with data from a simple array.
- We use ArrayAdapter.
- Handle ItemClicks.\*
    
    Android ListView Array Demo #### Our MainActivity
    

This is our main [activity](/android/activity). This is our launcher activity. This class will be the entry point to our application.

First we define our package then import other packages via the `import` statements.

Then we make our class derive from AppCompatActivity.

We will maintain an array which will act as our data source:

```java
 String[] spacecrafts={"Juno","Hubble","Casini","WMAP","Spitzer","Pioneer","Columbia","Challenger","Apollo","Curiosity"};
```

We will pass this array into our arrayadapetr constructor and set its instance to our ListView:

```java
    ArrayAdapter<String> adapter=new ArrayAdapter<String>(this,android.R.layout.simple_list_item_1,spacecrafts);
    lv.setAdapter(adapter);
```

Let’s look at the full source code.

```java
public class MainActivity extends AppCompatActivity {

 ListView lv;
 String[] spacecrafts={"Juno","Hubble","Casini","WMAP","Spitzer","Pioneer","Columbia","Challenger","Apollo","Curiosity"};

 @Override
 protected void onCreate(Bundle savedInstanceState) {
    super.onCreate(savedInstanceState);
    setContentView(R.layout.activity_main);

    lv= (ListView) findViewById(R.id.lv);

    //ADAPTER
    ArrayAdapter<String> adapter=new ArrayAdapter<String>(this,android.R.layout.simple_list_item_1,spacecrafts);
    lv.setAdapter(adapter);

     //LISTENER
    lv.setOnItemClickListener(new AdapterView.OnItemClickListener() {
    @Override
    public void onItemClick(AdapterView<?> adapterView, View view, int i, long l) {
        Toast.makeText(MainActivity.this, spacecrafts[i], Toast.LENGTH_SHORT).show();
    }
    });

 }

}
```

#### Our XML Layout

This is our main activity’s layout. It is our `activity_main.xml` file.

We use the following elements:

1. [RelativeLayout](/android/relativelayout) – Our ViewGroup.
2. [ListView](/android/listview) – Our adapterview.

```xml
<?xml version="1.0" encoding="utf-8"?>
<RelativeLayout

    android_layout_width="match_parent"
    android_layout_height="match_parent"
    android_paddingBottom="@dimen/activity_vertical_margin"
    android_paddingLeft="@dimen/activity_horizontal_margin"
    android_paddingRight="@dimen/activity_horizontal_margin"
    android_paddingTop="@dimen/activity_vertical_margin"
    tools_context="com.tutorials.hp.listviewarray.MainActivity">

    <ListView
        android_id="@+id/lv"
        android_layout_width="match_parent"
        android_layout_height="wrap_content"
         />
</RelativeLayout>
```

#### How To Run

1. Download the project.
2. You’ll get a zipped file,extract it.
3. Open the Android Studio.
4. Now close, already open project.
5. From the Menu bar click on File >New> Import Project.
6. Now Choose a Destination Folder, from where you want to import project.
7. Choose an Android Project.
8. Now Click on “OK“.
9. Done, your done importing the project,now edit it.

#### More Resources

|  |
| --- |
| GitHub Browse | [Browse](https://github.com/Oclemy/ListViewArray) |
| GitHub Download Link | [Download](https://github.com/Oclemy/ListViewArray/archive/master.zip) |

## Example 2: How to Populate ListView from an ArrayList

This is a simple ListView tutorial.Here is what we do:

- Fill ListView with data from a simple ArrayList.
- We use ArrayAdapter.
- Handle ItemClicks.

#### Our MainActivity

This is our MainActivity class.

```java
public class MainActivity extends AppCompatActivity {

    ArrayList<String> numbers=new ArrayList<>();
    ListView lv;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);

        lv = (ListView) findViewById(R.id.lv);

        //FILL DATA
        fillData();

        //ADAPTER
        ArrayAdapter<String> adapter = new ArrayAdapter<String>(this, android.R.layout.simple_list_item_1, numbers);
        lv.setAdapter(adapter);

        //LISTENER
        lv.setOnItemClickListener(new AdapterView.OnItemClickListener() {
            @Override
            public void onItemClick(AdapterView<?> adapterView, View view, int i, long l) {
                Toast.makeText(MainActivity.this, numbers.get(i), Toast.LENGTH_SHORT).show();
            }
        });
    }

    //FILL DATA
    private void fillData()
    {
        for (int i=0;i<10;i++)
        {
            numbers.add("Number "+String.valueOf(i));
        }
    }
}
```

#### Our XML Layout

Our activity’s layout is here.

```xml
<?xml version="1.0" encoding="utf-8"?>
<RelativeLayout

    android_layout_width="match_parent"
    android_layout_height="match_parent"
    android_paddingBottom="@dimen/activity_vertical_margin"
    android_paddingLeft="@dimen/activity_horizontal_margin"
    android_paddingRight="@dimen/activity_horizontal_margin"
    android_paddingTop="@dimen/activity_vertical_margin"
    tools_context="com.tutorials.hp.listviewarraylist.MainActivity">

    <ListView
        android_id="@+id/lv"
        android_layout_width="match_parent"
        android_layout_height="wrap_content"
         />
</RelativeLayout>
```

Good day.

## Example 2: Android Simple ListView OnItemClick

This is a simple example of how to populate a [listview](/android/listview) with an arraylist of strings and handle our ListView itemClicks.

### Example

###### MainActivity.java

Here’s our main activity.

First we specify the package name, then add our import statements.

We then create our MainActivity class, making it derive from AppCompatActivity.

We will maintain a simple arraylist as an instance field, this will hold our data which we will render in our [listview](/android/listview).

We will be using ArrayAdapter as our adapter.

Here’s how we will be se

```java

public class MainActivity extends AppCompatActivity {

    ArrayList<String> languages=new ArrayList<>();

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);

        //LISTVIEW
        ListView lv= (ListView) findViewById(R.id.lv);

        //FILL DATA
        fillData();

        //ADAPTR
        ArrayAdapter<String> adapter=new ArrayAdapter<String>(this,android.R.layout.simple_list_item_1,languages);
        lv.setAdapter(adapter);

        lv.setOnItemClickListener(new AdapterView.OnItemClickListener() {
            @Override
            public void onItemClick(AdapterView<?> adapterView, View view, int i, long l) {
                Toast.makeText(MainActivity.this, languages.get(i), Toast.LENGTH_SHORT).show();
            }
        });
    }

    //FILL DATA
    private void fillData()
    {
        languages.clear();

        //FILL
        languages.add("Java");
        languages.add("C#");
        languages.add("VB.NET");
        languages.add("PHP");
        languages.add("Python");
        languages.add("Ruby");
        languages.add("C");
        languages.add("C++");
        languages.add("Fortran");
        languages.add("Cobol");
        languages.add("Perl");
        languages.add("Prolog");
    }

}
```

###### activity_main.xml

Here’s our main activity’s layout. We call it `activity_main.xml`.

We use the following elements:

1. [RelativeLayout](/android/relativelayout) – Our ViewGroup.
2. [ListView](/android/listview) – Our adapterview.

The ListView will be rendering our data.

```xml
<?xml version="1.0" encoding="utf-8"?>
<RelativeLayout

    android_layout_width="match_parent"
    android_layout_height="match_parent"
    android_paddingBottom="@dimen/activity_vertical_margin"
    android_paddingLeft="@dimen/activity_horizontal_margin"
    android_paddingRight="@dimen/activity_horizontal_margin"
    android_paddingTop="@dimen/activity_vertical_margin"
    tools_context="com.tutorials.hp.simplelistview.MainActivity">

    <ListView
        android_id="@+id/lv"
        android_layout_width="match_parent"
        android_layout_height="wrap_content"
         />
</RelativeLayout>
```

#### SECTION 2 : Source Code

Download soure code below.

|  |
| --- |
| GitHub Browse | [Browse](https://github.com/Oclemy/Simple_ListView) |
| GitHub Download Link | [Download](https://github.com/Oclemy/Simple_ListView/archive/master.zip) |

## Example 3: How to Poulate a listView from a list of POJO objects

> _How to populate a simple [ListView](/android/listview) with a java [List](/java/list) of POJOs._

In this tutorial we see how to fill a simple listview with "Person" objects.When clicked we show the Person’s name in a Toast message.

#### Concepts You will Learn from this Example

1. What is a [ListView](/android/listview)?
2. What is a [List](/java/list) Collection?
3. How to populate a ListView from a [List](/java/list) of POJO Objects data structure in [android studio](/android/android-studio).
4. How to simple click listener in a listview.
5. What is an ArrayAdapter?
6. How to use ArrayAdapter to bind a java list to a simple listview.

**How to Define ListView in XML Layout**

You use the `ListView` object as the element:

```xml
    <ListView
        android_id="@+id/lv"
        android_layout_width="match_parent"
        android_layout_height="wrap_content"
         />
```

**How To Reference a ListView in Java Code**

Here’s how you reference a ListView. You use the `findViewById()` method:

```java
ListView lv= (ListView) findViewById(R.id.lv);
```

**(a). Initializing a Java List**

Here’s how you can initialize a List. You cannot directly instantiate since as we said it’s an interface:

```java
    List<String> people=new ArrayList<>();
```

**(b). How to Clear a Java List**

You can remove all items in a java list using the `clear()` method:

```java
    people.clear();
```

**(c). Populating a Java List with Objects**

You can populate a java list using the `add()` method:

```java
    private void fillPeople()
    {
        Person p=new Person();
        p.setName("Mike");
        people.add(p.getName());

        p=new Person();
        p.setName("John");
        people.add(p.getName());
        .....
```

Read more about java list [here](/java/list).

#### What is an ArrayAdapter?

We need an adapter to work with a listview.

An adapter is a class that acts as a bridge between an adapterview and the underlying data source.

In this case we’ll use an ArrayAdapter.

You can read more about ArrayAdapter here.

#### 1\. Project Demo

Here’s the demo of the example:

#### 2\. Android Studio and Project Ceation

##### (a). What is Android Studio?

We will use Android Studio, the official IDE for android development. Android Studio is maintained by both Google and Jetbrains.

Android Studio comes bundled with the Android SDK Manager, which is a tool that allows us download the Android SDK components required to develop android applications.

To learn more about Android Studio go [here](/android/android-studio).

##### (b). How to Create an Empty Activity in Android Studio

1. First create an empty project in android studio. Go to File –> New Project.
2. Type the application name and choose the company name.
3. Choose minimum SDK.
4. Choose Empty activity.
5. Click Finish.

This will generate for us a project with the following:

|  |
| --- |
| 1. | `activity_main.xml` | XML Layout | Will get inflated into MainActivity View.You add your views and widgets here. |
| 2. | `MainActivity.java` | Class | Our Launcher [activity](android/activity) |

To learn more about how to create an android project in android studio go here.

##### (c). Generated Project Structure in Android Stduo

Android Studio will generate for you a project with default configurations via a set of files and directories.

#### 2\. Resources.

[Android](/android/introduction) platform provides a powerful and flexible way of adding static content as a resource.

These static content will also be packaged into the APK file. The static content will be stored either as a resource or as an asset.

Resources belong to a given type. These types can be:

1. Drawable.
2. Layout.
3. Value.

Let’s start by looking at the layout resources

##### (a). activity_main.xml

This layout will get inflated into the main activity’s user interface. This will happen via the Activity’s `setContentView()` method which will require us to pass it the layout.

We will do so inside the `onCreate()` method of [Activity](/android/activity).

```xml
<?xml version="1.0" encoding="utf-8"?>
<RelativeLayout

    android_layout_width="match_parent"
    android_layout_height="match_parent"
    android_paddingBottom="@dimen/activity_vertical_margin"
    android_paddingLeft="@dimen/activity_horizontal_margin"
    android_paddingRight="@dimen/activity_horizontal_margin"
    android_paddingTop="@dimen/activity_vertical_margin"
    tools_context="com.tutorials.hp.listviewandobjects.MainActivity">

    <ListView
        android_id="@+id/lv"
        android_layout_width="match_parent"
        android_layout_height="wrap_content"
         />
</RelativeLayout>
```

#### 3\. Java Code.

Android apps can be mainly written in Java or Kotlin. These days however there are many frameworks like Flutter also which use languages like Dart.

In this class we are using Java programming language.

We will have these classes in our project.

##### (a). Person.java

This is our data object. This class will represent a single person.

A single person will have these properties:

1. `id` – an Integer. The id of the person.
2. `name` – The name of the person. A String.

Then our list will comprise `Person` objects.

```java

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

##### (b). MainActivity.java

This is our launcher activity as the name suggests. This means it will be the main entry point to our app in that when the user clicks the icon for our app, this activity will get rendered first.

We override a method called `onCreate()`. Here we will start by inflating our main layout via the `setContentView()` method.

Our main activity is actually an [activity](/android/activity) since it’s deriving from the AppCompatActivity.

```java
public class MainActivity extends AppCompatActivity {

    List<String> people=new ArrayList<>();

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);

        //LISTVIEW
        ListView lv= (ListView) findViewById(R.id.lv);

        //FILL LIST
        fillPeople();

        //ADAPTER
        ArrayAdapter<String> adapter=new ArrayAdapter<String>(this,android.R.layout.simple_list_item_1,people);
        lv.setAdapter(adapter);

        lv.setOnItemClickListener(new AdapterView.OnItemClickListener() {
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

#### 4\. Download

Everything is in the source code reference. It is well commented and easy to understand and can be downloaded below.

Also check our video tutorial it’s more detailed and explained in step by step.

|  |
| --- |
| 1. | GitHub | [Direct Download](https://github.com/Oclemy/ListView_and_Objects/archive/master.zip) |
| 2. | GitHub | [Browse](https://github.com/Oclemy/ListView_and_Objects) |
| 3. | YouTube | [Our YouTube Channel](https://www.youtube.com/channel/UCpdkWp2zh5Qv1ZWlnqswdCw) |

## Example 4: ListView – How to listen LongClick events

This is an android tutorial to explore how to handle longclick events in a custom listview with images and text.

Let’s go.

#### 1\. Create Basic Activity Project

1. First create a new project in android studio. Go to File –> New Project.
2. Type the application name and choose the company name. ![New Project Dialog](/wp-content/uploads/android/new_project.png)
3. Choose minimum SDK. ![Choose minimum SDK](/wp-content/uploads/android/choose_minimum_sdk.png)
4. Choose Basic activity. ![Choose Empty Activity](/wp-content/uploads/android/basic_activity.png)
5. Click Finish. ![Finish](/wp-content/uploads/android/finish.png)

Basic activity will have a toolbar and floating action button already added in the layout

#### 2\. Dependencies

We really have no external dependencies. Instead we simply specify a couple of support library dependencies.

```groovy
dependencies {
    implementation fileTree(dir: 'libs', include: ['*.jar'])
    testImplementation 'junit:junit:4.12'
    implementation `com.android.support:appcompat-v7:23.2.1'
    implementation `com.android.support:design:23.2.1'
    implementation `com.android.support:cardview-v7:23.2.1'
}
```

#### 3\. Create User Interface

User interfaces are typically created in android using XML layouts as opposed by direct java coding.

##### (a). activity_main.xml

- This layout gets inflated to MainActivity user interface.
- It includes the content_main.xml.

```xml
<?xml version="1.0" encoding="utf-8"?>
<android.support.design.widget.CoordinatorLayout

    android_layout_width="match_parent"
    android_layout_height="match_parent"
    android_fitsSystemWindows="true"
    tools_context="com.tutorials.hp.listviewlongclick.MainActivity">

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

##### (b). content_main.xml

Let’s add our ListView here.

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
    tools_context="com.tutorials.hp.listviewlongclick.MainActivity"
    tools_showIn="@layout/activity_main">

    <ListView
        android_layout_width="wrap_content"
        android_layout_height="wrap_content"
        android_id="@+id/lv"
        android_layout_alignParentLeft="true"
        android_layout_alignParentStart="true" />
</RelativeLayout>
```

##### (c). model.xml

This layout will define the custom row model for our ListView.

In this case our ListView will have images and text.

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

Let’s now come to our Java classes:

#### 4\. Movie.java

Our data object. Will represent a single movie.

```java
package com.tutorials.hp.listviewlongclick;

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

#### 5\. ItemLongClickListener.java

Our long click listener interface.

```java

public interface ItemLongClickListener {

    void onLongItemClick(View v);

}
```

#### 6\. MyViewHolder.java

Will hold our widgets to be recycled.

```java

public class MyViewHolder implements View.OnLongClickListener {

    ImageView img;
    TextView nameTxt;
    ItemLongClickListener itemLongClickListener;

    public MyViewHolder(View v) {
        img= (ImageView) v.findViewById(R.id.movieImage);
        nameTxt= (TextView) v.findViewById(R.id.nameTxt);

        v.setOnLongClickListener(this);

    }

    public void setItemLongClickListener(ItemLongClickListener ic)
    {
        this.itemLongClickListener=ic;
    }

    @Override
    public boolean onLongClick(View v) {
        this.itemLongClickListener.onLongItemClick(v);
        return false;
    }
}
```

#### 7\. CustomAdapter.java

Will inflate our `model.xml` and bind data to resultant views.

```java
public class CustomAdapter extends BaseAdapter {

    Context c;
    ArrayList<Movie> movies;
    LayoutInflater inflater;

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

    //SHALL RETURN A ROW
    @Override
    public View getView(final int position, View convertView, ViewGroup parent) {

        if(inflater==null)
        {
            inflater= (LayoutInflater) c.getSystemService(Context.LAYOUT_INFLATER_SERVICE);
        }

        //CONVERT FROM XML TO JAVA
        if(convertView==null)
        {
            convertView=inflater.inflate(R.layout.model,parent,false);
        }

        //BIND DATA TO VIEWS
        MyViewHolder holder=new MyViewHolder(convertView);
        holder.nameTxt.setText(movies.get(position).getName());
        holder.img.setImageResource(movies.get(position).getImage());

        holder.setItemLongClickListener(new ItemLongClickListener() {
            @Override
            public void onLongItemClick(View v) {
                Toast.makeText(c,movies.get(position).getName(),Toast.LENGTH_SHORT).show();
            }
        });

        return convertView;
    }
}
```

#### 8\. MainActivity.java

Our Main activity.

```java
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

        //SET ADAPTER
        lv.setAdapter(adapter);

    }

    private ArrayList<Movie> getMovies() {

        //COLECTION OF CRIME MOVIES
        ArrayList<Movie> movies=new ArrayList<>();

        Movie movie=new Movie("Shuttle Carrier",R.drawable.shuttlecarrier);

        //ADD ITR TO COLLECTION
        movies.add(movie);

        movie=new Movie("Fruts",R.drawable.fruits);
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

#### Download Code

|  |
| --- |
| GitHub Browse | [Download](https://github.com/Oclemy/Android-ListViewLongClick) |

## Example 4: Android Custom ListView Master Detail [Open new Activity]

**Hello guys.Today we discuss about Android Custom ListView Master Detail interface.**

Our ListView shall have images and text.

#### SECTION 1 : Our MainActivity

This is our main [activity](/android/activity).

It is our master view.

The master view will display a ListView with Player objects.

```java
public class MainActivity extends Activity {

  ListView lv;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);

        lv=(ListView) findViewById(R.id.listView1);

        //ADAPTER
        CustomAdapter adapter=new CustomAdapter(this);
        lv.setAdapter(adapter);

        //EVENTS
        lv.setOnItemClickListener(new OnItemClickListener() {

      @Override
      public void onItemClick(AdapterView<?> arg0, View v, int pos,
          long id) {
        // TODO Auto-generated method stub

        Intent i=new Intent(getApplicationContext(), PlayerActivity.class);

        //PASS INDEX OR POS
        i.putExtra("Position", pos);
        startActivity(i);

      }
    });

    }
```

#### SECTION 2 : Our DetailActivity

This is our detail [activity](/android/activity).

This class will display the details of a single player object.

```java

public class PlayerActivity extends Activity {

  int pos=0;

  @Override
  protected void onCreate(Bundle savedInstanceState) {
    super.onCreate(savedInstanceState);
    setContentView(R.layout.activity_player);

    //GET PASSED DATA
    Intent i=getIntent();
    pos=i.getExtras().getInt("Position");

    //GET VIEWS
    final CustomAdapter adapter=new CustomAdapter(this);
    final ImageView img=(ImageView) findViewById(R.id.imageView1);
     final TextView nameTv=(TextView)findViewById(R.id.nameTxt);
     final TextView goalTv=(TextView) findViewById(R.id.goalTxt);

     //SET DATA
     img.setImageResource(adapter.images[pos]);
     nameTv.setText(adapter.names[pos]);
     goalTv.setText(adapter.goals[pos]);

     Button nextBtn=(Button) findViewById(R.id.button1);
     //NEXT CLICKED
     nextBtn.setOnClickListener(new OnClickListener() {

      @Override
      public void onClick(View arg0) {
        // TODO Auto-generated method stub

        int position=pos+1;

        //set data
        img.setImageResource(adapter.images[position]);
         nameTv.setText("Name: "+adapter.names[position]);
         goalTv.setText("Goals: "+adapter.goals[position]);

         if(!(position>=adapter.getCount()-1))
         {
           pos +=1;
         }else
         {
           pos = -1;
         }

      }
    });

  }

}
```

#### SECTION 3 : Our CustomAdapter:

This is our adapter class.

This class will derive from `android.widget.BaseAdapter` class.

As an adapter it will be responsible for first inflating our `model.xml` into a view object. Then it will bind data to that inflated view.

We will also listen to click events for that view then open the detail [activity](/android/activity).

```java
public class CustomAdapter extends BaseAdapter {

  private Context c;

  String[] names={"Michael Carrick","Diego Costa","Ander Herera","Juan Mata","Oscar","Aaron Ramsey","Wayne Rooney","Alexis Sanchez","Van Persie"};
    String[] goals={"3","25","9","11","9","11","14","18","13"};
    int[] images={R.drawable.carrick,R.drawable.costa,R.drawable.herera,R.drawable.mata,R.drawable.oscar,R.drawable.ramsey,R.drawable.rooney,R.drawable.sanchez,R.drawable.vanpersie};

;   public CustomAdapter(Context ctx) {
    // TODO Auto-generated constructor stub

    this.c=ctx;
  }

  @Override
  public int getCount() {
    // TODO Auto-generated method stub
    return names.length;
  }

  @Override
  public Object getItem(int pos) {
    // TODO Auto-generated method stub
    return names[pos];
  }

  @Override
  public long getItemId(int pos) {
    // TODO Auto-generated method stub
    return pos;
  }

  @Override
  public View getView(int pos, View convertView, ViewGroup parent) {
    // TODO Auto-generated method stub

    if(convertView==null)
    {
      LayoutInflater inflater=(LayoutInflater) c.getSystemService(Context.LAYOUT_INFLATER_SERVICE);
        convertView=inflater.inflate(R.layout.player, null);
    }

    //GET VIEWS
    TextView nameTxt=(TextView) convertView.findViewById(R.id.nameTv);
        TextView goalsTxt=(TextView) convertView.findViewById(R.id.goalsTv);
        ImageView img=(ImageView) convertView.findViewById(R.id.imageView1);

        //SET DATA
        nameTxt.setText(names[pos]);
        goalsTxt.setText(goals[pos]);
        img.setImageResource(images[pos]);

    return convertView;
  }

}
```

#### SECTION 4 : Our MainActivity Layout

This layout will be inflate into the UI for our Main activity.

This layout will contain a ListView.

```xml
<RelativeLayout

    android_layout_width="match_parent"
    android_layout_height="match_parent"
    android_paddingBottom="@dimen/activity_vertical_margin"
    android_paddingLeft="@dimen/activity_horizontal_margin"
    android_paddingRight="@dimen/activity_horizontal_margin"
    android_paddingTop="@dimen/activity_vertical_margin"
    tools_context=".MainActivity" >

    <ListView
        android_id="@+id/listView1"
        android_layout_width="match_parent"
        android_layout_height="wrap_content"
        android_layout_alignParentLeft="true"
        android_layout_alignParentTop="true" >

    </ListView>

</RelativeLayout>
```

#### SECTION 5 : Our DetailActivity Layout

This is our detail [activity](/android/activity) layout. It will contain an imageview, textview and button.

```xml
<RelativeLayout

    android_layout_width="match_parent"
    android_layout_height="match_parent"
    android_paddingBottom="@dimen/activity_vertical_margin"
    android_paddingLeft="@dimen/activity_horizontal_margin"
    android_paddingRight="@dimen/activity_horizontal_margin"
    android_paddingTop="@dimen/activity_vertical_margin"
    tools_context=".PlayerActivity" >

    <ImageView
        android_id="@+id/imageView1"
        android_layout_width="190dp"
        android_layout_height="275dp"
        android_layout_alignParentTop="true"
        android_scaleType="fitCenter"
        android_src="@drawable/carrick" />

    <Button
        android_id="@+id/button1"
        android_layout_width="wrap_content"
        android_layout_height="wrap_content"
        android_layout_alignParentBottom="true"
        android_layout_alignParentRight="true"
        android_text="Next" />

    <TextView
        android_id="@+id/goalTxt"
        android_layout_width="wrap_content"
        android_layout_height="wrap_content"
        android_layout_alignParentLeft="true"
        android_layout_below="@+id/nameTxt"
        android_layout_marginTop="24dp"
        android_text="Goals : "
        android_textAppearance="?android:attr/textAppearanceLarge" />

    <TextView
        android_id="@+id/textView1"
        android_layout_width="wrap_content"
        android_layout_height="wrap_content"
        android_layout_alignParentLeft="true"
        android_layout_below="@+id/imageView1"
        android_text="PLAYER PROFILE"
        android_textAppearance="?android:attr/textAppearanceLarge" />

    <TextView
        android_id="@+id/nameTxt"
        android_layout_width="wrap_content"
        android_layout_height="wrap_content"
        android_layout_alignParentLeft="true"
        android_layout_below="@+id/textView1"
        android_layout_marginTop="17dp"
        android_text="Name"
        android_textAppearance="?android:attr/textAppearanceLarge" />

</RelativeLayout>
```

#### SECTION 6: Our RowModel Layout

This is our custom listview row model. It defines how each Listview row will appear. In this case we have an imageview and two textviews.

```xml
<?xml version="1.0" encoding="utf-8"?>
<RelativeLayout
    android_layout_width="match_parent"
    android_layout_height="match_parent"
    android_orientation="horizontal" >

    <TextView
        android_id="@+id/nameTv"
        android_layout_width="wrap_content"
        android_layout_height="wrap_content"
        android_layout_alignParentTop="true"
        android_layout_marginLeft="28dp"
        android_layout_toRightOf="@+id/imageView1"
        android_text="Name"
        android_textAppearance="?android:attr/textAppearanceMedium" />

    <TextView
        android_id="@+id/goalsTv"
        android_layout_width="wrap_content"
        android_layout_height="wrap_content"
        android_layout_alignBottom="@+id/imageView1"
        android_layout_alignLeft="@+id/nameTv"
        android_layout_marginBottom="16dp"
        android_text="Goals"
        android_textAppearance="?android:attr/textAppearanceSmall" />

    <ImageView
        android_id="@+id/imageView1"
        android_layout_width="65dp"
        android_layout_height="71dp"
        android_layout_alignParentLeft="true"
        android_layout_alignParentTop="true"
        android_layout_marginLeft="26dp"
        android_padding="10dp"
        android_src="@drawable/herera" />

</RelativeLayout>
```

#### SECTION 7 : Our Manifest

This is our android mainfest. Just make sure both our two activities are registered.

```xml
<?xml version="1.0" encoding="utf-8"?>
<manifest
    package="com.example.listviewmasterdetail"
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
            android_name="com.example.listviewmasterdetail.MainActivity"
            android_label="@string/app_name" >
            <intent-filter>
                <action android_name="android.intent.action.MAIN" />

                <category android_name="android.intent.category.LAUNCHER" />
            </intent-filter>
        </activity>
        <activity
            android_name="com.example.listviewmasterdetail.PlayerActivity"
            android_label="@string/title_activity_player" >
        </activity>
    </application>

</manifest>
```

## Example 5: Android ListView – CRUD – ADD UPDATE DELETE.

Hello.We see how to perform basic CRUD operations against an arraylist and a ListView.

- Add Update and Delete against an ArrayList and a ListView.
    
- We work with ArrayAdapter.
    
- handle ItemClicks and input data from a dialog.
    
    Android ListView CRUD #### 1. Build.Gradle App Level
    
- Add dependencies for AppCompat and Design support libraries.
    
- Our MainActivity shall derive from AppCompatActivity while we shall also use Floating action button from design support libraries.
    

```groovy
apply plugin: 'com.android.application'

android {
    compileSdkVersion 24
    buildToolsVersion "24.0.1"

    defaultConfig {
        applicationId "com.tutorials.hp.listview_crud"
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
    implementation fileTree(dir: 'libs', include: ['*.jar'])
    testImplementation 'junit:junit:4.12'
    implementation `com.android.support:appcompat-v7:24.1.1'
    implementation `com.android.support:design:24.1.1'
}
```

#### 2\. CRUD.java

- Add Update Delete data. Responsible for performing CRUD operations.

```java

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

#### 3\. MainActivity.java

- Launcher activity.
- ActivityMain.xml inflated as the contentview for this activity.
- Reference our ListView.

```java
public class MainActivity extends AppCompatActivity {

    ListView lv;
    ArrayAdapter<String> adapter;
    CRUD crud=new CRUD();
    Dialog d;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);
        Toolbar toolbar = (Toolbar) findViewById(R.id.toolbar);
        setSupportActionBar(toolbar);

        lv= (ListView) findViewById(R.id.lv);

        lv.setOnItemClickListener(new AdapterView.OnItemClickListener() {
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

                displayInputDialog(-1);
            }
        });
    }
    private void displayInputDialog(final int pos)
    {
        d=new Dialog(this);
        d.setTitle("LISTVIEW CRUD");
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
                    lv.setAdapter(adapter);

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
                        lv.setAdapter(adapter);
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
                    lv.setAdapter(adapter);
                }
            }
        });

        d.show();
    }
}
```

#### 4\. ActivityMain.xml

- To contain our ContentMain.xml.

```xml
<?xml version="1.0" encoding="utf-8"?>
<android.support.design.widget.CoordinatorLayout

    android_layout_width="match_parent"
    android_layout_height="match_parent"
    android_fitsSystemWindows="true"
    tools_context="com.tutorials.hp.listview_crud.MainActivity">

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

#### 5\. ContentMain.xml

- To hold our ListView.

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
    tools_context="com.tutorials.hp.listview_crud.MainActivity"
    tools_showIn="@layout/activity_main">

    <ListView
        android_id="@+id/lv"
        android_layout_width="match_parent"
        android_layout_height="wrap_content"
         />
</RelativeLayout>
```

#### 6\. inputdialog.xml

- handles inputs.

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

#### How To Run

1. Download the project.
2. You’ll get a zipped file,extract it.
3. Open the Android Studio.
4. Now close, already open project.
5. From the Menu bar click on File >New> Import Project.
6. Now Choose a Destination Folder, from where you want to import project.
7. Choose an Android Project.
8. Now Click on “OK“.
9. Done, your done importing the project,now edit it.

#### More Resources

|  |
| --- |
| GitHub Browse | [Browse](https://github.com/Oclemy/ListView-CRUD) |
| GitHub Download Link | [Download](https://github.com/Oclemy/ListView-CRUD/archive/master.zip) |

Good day.

## Example: Android ListView – ContextMenu

_Android Custom [ListView](/android/listview) with Images Text and ContextMenu tutorial._

The [ListView](/android/listview) will have a List of items. The user can then right click a given item and a contextmenu gets displayed.

#### Concepts You will Learn from this Example

1. What is a ListView?
2. What is a ContextMenu?
3. How to create a custom listview with images, text and contextmenu in [android studio](/android/android-studio).
4. How to implement a longclick listener in a listview.
5. How to show contextmenu with menu items when a listview cardview is right-clicked.
6. How to create a custom adapter with baseadapter.

#### What is BaseAdapter?

We need an adapter to work with a listview.

An adapter is a class that acts as a bridge between an adapterview and the underlying data source.

In this case we’ll use BaseAdapter.

#### 1\. Gradle Files

First we add dependencies in the app level build.gradle file.

##### (a). Build.gradle

Let’s add some dependencies. Our ListView will comprise cardviews:

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
        implementation fileTree(dir: 'libs', include: ['*.jar'])
        testImplementation 'junit:junit:4.12'
        implementation `com.android.support:appcompat-v7:23.2.1'
        implementation `com.android.support:design:23.2.1'
        implementation `com.android.support:cardview-v7:23.2.1'
    }
```

#### 2\. Layout Files

Let’s see our layout files. We’ll have three of them:

1. activity_main.xml
2. content_main.xml
3. model.xml

##### (a). activity_main.xml

- Our template layout for main activity.
- It will get inflated to the view for mainactivity.
- It will contain the content_main.xml.

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

##### (b). content_main.xml

- This will hold our ListView.
- It will get included inside the `activity_main.xml`.

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

##### (c). model.xml

- Is our custom listview row layout.
- Will get inflated into a single row.
- Contains a cardview with images and text.

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

#### 3\. Java Classes

We are using java programming language.

We’ll have 5 classes:

##### (a). Movie.java

- Is our data object, a POJO class.
- Represents a single movie object with various properties.
- Each CardView will hold a movie.

```java
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

##### (b). LongClickListener

- Is an interface.
- Contains the signature for our LongClick listener.

```java
    public interface LongClickListener {
        void onItemLongClick();
    }
```

##### (c). MyViewHolder.java

- Our ViewHolder class.
- Will hold views to be recycled.
- Will implement View.OnLongClickListener and View.OnCreateContextMenuListener.

```java
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

##### (d). CustomAdapter.java

– Our adapter class. – Derives from `BaseAdapter`.

Will adapt our data to our custom views.

```java

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

##### (e). MainActivity.java

- Our MainActivity.
- References ListView from layout.
- Instantiates the CustomAdapter and sets it to our ListView.

```java
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

#### 4\. Download

Hey,everything is in source code reference that is well commented and easy to understand and can be downloaded below.

Also check our video tutorial it’s more detailed and explained in step by step.

|  |
| --- |
| 1. | GitHub | [Direct Download](https://github.com/Oclemy//Android-ListViewContextMenu/archive/master.zip) |
| 2. | GitHub | [Browse](https://github.com/Oclemy/Android-ListViewContextMenu) |
| 3. | YouTube | [YouTube Channel](https://www.youtube.com/channel/UCpdkWp2zh5Qv1ZWlnqswdCw) |
