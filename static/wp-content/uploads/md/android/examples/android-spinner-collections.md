# Kotlin Android Spinner Examples


Spinner is a view that displays items in a dropdown fashion, allowing user to pick one at a time.

Spinner is an AdapterView. This means that it relies on an Adapter for its data.Adapters act as the bridge between adapterviews and the underlying data source.

This makes Spinner like other adapterviews decoupled from data source. Hence we can customize the views shown in the spinner without affecting data.


Spinner is a concrete public class residing in the `android.widget` package.

```java
package android.widget;
```

Spinner is a public class that's why we can access and use it.

```java
public class
Spinner{}
```

Public classes are visible even from other packages apart from those they've been defined.

Spinner class inherits from an abstract class called AbsSpinner. This class also resides in the `android.widget` package.

AbsSpinner provides to Spinner much of the capabilities it has. For example, Spinner is an adapterview since it derives from the AbsSpinner. This allows Spinner to set and return a SpinnerAdapter.

Spinner is a view that displays items in a dropdown fashion, allowing user to pick one at a time. Spinner is an AdapterView. This means that it relies on an Adapter for its data.

Adapters act as the bridge between adapterviews and the underlying data source. This makes Spinner like other adapterviews decoupled from data source. Hence we can customize the views shown in the spinner without affecting data.

Spinner is a concrete public class residing in the `android.widget` package.

```java
package android.widget;
```

Spinner is a public class that's why we can access and use it.

```java
public class Spinner{}
```

Public classes are visible even from other packages apart from those they've been defined.

Spinner class inherits from an abstract class called AbsSpinner. This class also resides in the `android.widget` package.

AbsSpinner provides to Spinner much of the capabilities it has. For example, Spinner is an adapterview since it derives from the AbsSpinner. This allows Spinner to set and return a SpinnerAdapter.

#### How to Define Spinner in Layout

We can use the `Spinner` object to specify the spinner in an xml Layout. This pattern of specifyng an Object in the Layout resource then referencing from the Java/Kotlin code is common in android as a platform and is also the one recommended.

```xml
<Spinner
    android_id="@+id/mySpinner"
    android_layout_width="fill_parent"
    android_layout_height="wrap_content" />
```

#### How to Populate Spinner

Then in our java code we can first reference the Spinner from our Layout specification using the `findViewById()` method our activity class.

```java
Spinner spinner = (Spinner) findViewById(R.id.mySpinner);
```

We can then instantiate a SpinnerAdapter(e.g ArrayAdapter). We use the default spinner Layout(`android.R.layout.simple_spinner_item`).

We are using a static method called createFromResource(). This method is provided by the ArrayAdapter class and it returns us an ArrayAdapter instance from the external resource we provide it as our data source.

```java
ArrayAdapter<CharSequence> adapter = ArrayAdapter.createFromResource(this,
        R.array.galaxies_array, android.R.layout.simple_spinner_item);
```

You have to make sure you've added string array into your strings.xml file:

```xml
<?xml version="1.0" encoding="utf-8"?>
<resources>
    <string-array name="galaxies_array">
        <item>Milky Way</item>
        <item>Andromeda</item>
        <item>Whirlpool</item>
        <item>Sombrero</item>
        <item>Cartwheel</item>
        <item>StarBust</item>
        <item>Pinwheel</item>
        <item>Leo</item>
    </string-array>
</resources>
```

ArrayAdapter provides us the createFromResource() method which gives us an instance of the ArrayAdapter from the string array we provided.

After that:

```java
adapter.setDropDownViewResource(android.R.layout.simple_spinner_dropdown_item);
```

This method allows us specify the Layout the adapter will use to display the list of spinner choices. We use the one provided by the Android Platform.

Finally we set the adapter:

```java
spinner.setAdapter(adapter);
```

Let us now look at some full examples.

## Example 1: Kotlin Android Spinner - Get selected item

> Learn how to use spinner with this simple step by step example written in Kotlin.

We bind an aray to a spinner. Then when the user selects a single item in our spinner we show that selected item in a textview.

### Step 1: Create Project

Start by creating an empty `Android Studio` project.

### Step 2: Dependencies

No external dependencies are necessary.

### Step 3: Design Layout

Add a spinner and a textview in your xml layout as follows. The textview will be used to render the selected spinner item:

**activity_main.xml**

```xml
<?xml version="1.0" encoding="utf-8"?>
<LinearLayout xmlns:android="http://schemas.android.com/apk/res/android"
    xmlns:app="http://schemas.android.com/apk/res-auto"
    xmlns:tools="http://schemas.android.com/tools"
    android:layout_width="match_parent"
    android:layout_height="match_parent"
    android:orientation="vertical"
    tools:context=".MainActivity">

    <Spinner
        android:id="@+id/sp_option"
        android:layout_width="match_parent"
        android:layout_height="wrap_content"
        android:padding="20dp"/>

    <TextView
        android:id="@+id/tv_result"
        android:layout_width="match_parent"
        android:layout_height="match_parent"
        android:gravity="center"/>

</LinearLayout>
```

### Step 4: Write Code

In your MainActivity declare our TextView and Spinner:

```kotlin
    lateinit var option : Spinner
    lateinit var result : TextView
```

Create an array of items to be bound to our spinner:

```kotlin
        val options = arrayOf("Option 1", "Option 2", "Option 3")
```

Pass those optionns to our ArrayAdapter then bind the adapter to the spinner:

```kotlin
        option.adapter = ArrayAdapter<String>(this, android.R.layout.simple_list_item_1, options)
```

The get the selected spinner item as follows, and display the selected item in the textview:

```kotlin
        option.onItemSelectedListener = object : AdapterView.OnItemSelectedListener{
            @SuppressLint("SetTextI18n")
            override fun onNothingSelected(parent: AdapterView<*>?)
            {
                result.text = "please select an option"
            }

            override fun onItemSelected(parent: AdapterView<*>?, view: View?, position: Int, id: Long)
            {
                result.text = options.get(position)
            }
        }
```

Here is the full code:

**MainActivity.kt**

```kotlin
import android.annotation.SuppressLint
import androidx.appcompat.app.AppCompatActivity
import android.os.Bundle
import android.view.View
import android.widget.AdapterView
import android.widget.ArrayAdapter
import android.widget.Spinner
import android.widget.TextView

class MainActivity : AppCompatActivity() {

    lateinit var option : Spinner
    lateinit var result : TextView

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_main)

        option = findViewById(R.id.sp_option)
        result = findViewById(R.id.tv_result)

        val options = arrayOf("Option 1", "Option 2", "Option 3")
        option.adapter = ArrayAdapter<String>(this, android.R.layout.simple_list_item_1, options)

        option.onItemSelectedListener = object : AdapterView.OnItemSelectedListener{
            @SuppressLint("SetTextI18n")
            override fun onNothingSelected(parent: AdapterView<*>?)
            {
                result.text = "please select an option"
            }

            override fun onItemSelected(parent: AdapterView<*>?, view: View?, position: Int, id: Long)
            {
                result.text = options.get(position)
            }
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
| 1. | [Download](https://github.com/Kiran-Bahalaskar/Spinner-Using-Kotlin/archive/refs/heads/master.zip) Example |
| 2. | [Follow](https://github.com/Kiran-Bahalaskar/) code author |
| 3. | Code: [Apache 2.0 License](http://www.apache.org/licenses/LICENSE-2.0.txt) |

## Example 2: Android Simple Spinner and OnItemSelected

We have a look at android simple Spinner and see how to load data from a simple arraylist with help of arrayadapter.We also see how to handle ItemSelected events.

##### (a). Spinner - a DropDown Widget

**2\. How to Import Spinner** We use the import keyword:

```java
import android.widget.Spinner;
```

**2\. How to Reference Spinner** We reference spinner using the `findViewById()` method.

```java
        Spinner sp= (Spinner) findViewById(R.id.sp);
```

##### (b). ArrayList - a collection

**2\. How to Instantiate an ArrayList**

Here's how, we use the `new` keyword:

```java
    ArrayList<String> languages=new ArrayList<>();
```

**3\. How to add items to an ArrayList** We use the `add()` method. First we are clearing it to avoid duplicates.

```java
        languages.clear();

        //FILL
        languages.add("Java");
        languages.add("C#");
        languages.add("VB.NET");
        languages.add("PHP");
        ....
```

####  MainActivity.java

- Our MainActivity

```java

public class MainActivity extends AppCompatActivity {
    ArrayList<String> languages=new ArrayList<>();

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);

        //SPINNER
        Spinner sp= (Spinner) findViewById(R.id.sp);

        //FILL DATA
        fillData();

        //ADAPTR
        ArrayAdapter<String> adapter=new ArrayAdapter<String>(this,android.R.layout.simple_list_item_1,languages);
        sp.setAdapter(adapter);

        sp.setOnItemSelectedListener(new AdapterView.OnItemSelectedListener() {
            @Override
            public void onItemSelected(AdapterView<?> adapterView, View view, int i, long l) {
                Toast.makeText(MainActivity.this, languages.get(i), Toast.LENGTH_SHORT).show();

            }

            @Override
            public void onNothingSelected(AdapterView<?> adapterView) {

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

#### SECTION 2 : Our Layout\*

- Contains our Spinner

```xml
<?xml version="1.0" encoding="utf-8"?>
<RelativeLayout

    android_layout_width="match_parent"
    android_layout_height="match_parent"
    android_paddingBottom="@dimen/activity_vertical_margin"
    android_paddingLeft="@dimen/activity_horizontal_margin"
    android_paddingRight="@dimen/activity_horizontal_margin"
    android_paddingTop="@dimen/activity_vertical_margin"
    tools_context="com.tutorials.hp.simplespinner.MainActivity">

    <Spinner
        android_id="@+id/sp"
        android_layout_width="match_parent"
        android_layout_height="wrap_content"
        />
</RelativeLayout>
```

[**SOURCE CODE REFERENCE**](https://github.com/Oclemy/Simple-Spinner)

## Example 3: Kotlin Android Spinner - Fill From Array and ItemSelectionListener

_This is a tutorial for population of spinner from a Kotlin Array and handling the spinner's itemSelection event._

Spinner is a widget, of course defined in the `android.widget` package and allows us render items in a dropdwon fashion.

In this tutorial we want to see how to set array of items in our spinner. Our programming language is Kotlin.

We also see how to retrieve the selected item and display them in a Toast.

Let's go.

#### Kotlin Simple Spinner Example

Here's our example.

Let's write some code.

#### Resoources.

[Android](https://camposha.info/android/introduction) platform provides a powerful and flexible way of adding static content as a resource.

These static content will also be packaged into the APK file. The static content will be stored either as a resource or as an asset.

Resources belong to a given type. These types can be:

1. Drawable.
2. Layout.
3. Value.

Let's start by looking at the layout resources

##### (a). activity_main.xml

This layout will get inflated into the main activity's user interface. This will happen via the Activity's `setContentView()` method which will require us to pass it the layout.

We will do so inside the `onCreate()` method of [Activity](https://camposha.info/android/activity).

In our case we will make use of the following widgets and viewgroups:

1. [LinearLayout](https://camposha.info/android/linearlayout) - Will arrange our TextView and Spinner linearly with TextView on top of Spinner.
2. TextView - Will display the header text of our app.
3. Spinner - Will render our data in dropdown fashion.

Here's the code:

```xml
<?xml version="1.0" encoding="utf-8"?>
<LinearLayout

    android_layout_width="match_parent"
    android_layout_height="match_parent"
    android_orientation="vertical"
    tools_context="info.camposha.kotlinspinner.MainActivity">

    <TextView
        android_id="@+id/textView"
        android_layout_width="match_parent"
        android_layout_height="wrap_content"
        android_text="Nebulas App"
        android_textAlignment="center"
        android_textAppearance="@style/TextAppearance.AppCompat.Large"
        android_textColor="@color/colorAccent" />

    <Spinner
        android_id="@+id/mySpinner"
        android_layout_width="match_parent"
        android_layout_height="wrap_content" />

</LinearLayout>
```

#### Kotlin Code.

Android apps can be mainly written in Java or Kotlin. These days however there are many frameworks like Flutter also which use languages like Dart.

In this class we are using Kotlin programming language.

We will have these classes in our project.

#### (a)MainActivity.kt

This is our launcher activity as the name suggests. This means it will be the main entry point to our app in that when the user clicks the icon for our app, this activity will get rendered first.

We override a method called `onCreate()`. Here we will start by inflating our main layout via the `setContentView()` method.

Our main activity is actually an [activity](https://camposha.info/android/activity) since it's deriving from the AppCompatActivity.

```kotlin

class MainActivity : AppCompatActivity() {

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_main)

        val nebulae = arrayOf<String>("Boomerang", "Orion", "Witch Head", "Ghost Head", "Black Widow", "Flame", "Cone","Pelican","Helix","Snake","Elephant's Trunk")

        val mySpinner = findViewById(R.id.mySpinner) as Spinner

        var adapter= ArrayAdapter(this,android.R.layout.simple_list_item_1,nebulae)
        mySpinner.adapter=adapter

        //LISTENER
        mySpinner.onItemSelectedListener = object : AdapterView.OnItemSelectedListener {
            override fun onItemSelected(adapterView: AdapterView<*>, view: View, i: Int, l: Long) {
                Toast.makeText(this@MainActivity, nebulae[i], Toast.LENGTH_SHORT).show()
            }
            override fun onNothingSelected(adapterView: AdapterView<*>) {
            }
        }
    }
}
```

Best regards, Oclemy.

## Example 4: Android Simple Spinner - Fill with List Of Objects

Hello guys.How do you do? This is what we do:

1. Populate ArrayList with Person objects.
2. Pass this ArrayList to our ArrayAdapter.
3. Set our adapter to our Spinner
4. Handle ItemSelection events,hence show a toast.

**2\. How to Import Spinner**

First we imported Spinner from it's `android.widget` pakage:

```java
import android.widget.Spinner;
```

**3\. How to Reference spinner from Layout**

Then referenced using the `findViewById()` of the [Activity](https://camposha.info/android/activity) class:

```java
Spinner sp= (Spinner) findViewById(R.id.sp);
```

##### (b). [List](https://camposha.info/java/list) - an Interface

**2\. How to use a java List**

We use it and it's implementer the ArrayList to hold our list of person Objects.

We've instantiated it and passed

```java
        List<String> people=new ArrayList<>();
```

Then cleared it:

```java
            people.clear();
```

and used the `add()` method to add `Person` objects:

```java
            Person p=new Person();
            p.setName("Mike");
            people.add(p.getName());
            p=new Person();
            p.setName("John");
           ....
```

##### (c). ArrayAdapter - an Adapter

We will use an ArrayAdapter instance to bind our data to our spinner.

**2\. How to Instantiate an ArrayAdapter**

You pass:

1. The Context
2. The Resource
3. The [List](https://camposha.info/java/list)

```java
        ArrayAdapter<String> adapter=new ArrayAdapter<String>(this,android.R.layout.simple_list_item_1,people);
```

**3\. How to Bind Set an ArrayAdapter to a Spinner**

You use the `setAdapter()` method.

```java
        sp.setAdapter(adapter);
```

#### Full Code

Let's now look at the full source code.

#### Our Person Class

- Is our data object.
- Represents a single person with his properties.

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

#### SECTION 2 : Our MainActivity

Our main activity class.

```java
public class MainActivity extends AppCompatActivity {
    List<String> people=new ArrayList<>();
    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);
        //SPINNER
        Spinner sp= (Spinner) findViewById(R.id.sp);
        //FILL LIST
        fillPeople();
        //ADAPTER
        ArrayAdapter<String> adapter=new ArrayAdapter<String>(this,android.R.layout.simple_list_item_1,people);
        sp.setAdapter(adapter);
        //item selected
        sp.setOnItemSelectedListener(new AdapterView.OnItemSelectedListener() { @Override
        public void onItemSelected(AdapterView<?> adapterView, View view, int i, long l) {
            Toast.makeText(MainActivity.this, people.get(i), Toast.LENGTH_SHORT).show(); }
             @Override
             public void onNothingSelected(AdapterView<?> adapterView) {

              }
            });
        }
        private void fillPeople() {
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

#### Resoources.

[Android](https://camposha.info/android/introduction) platform provides a powerful and flexible way of adding static content as a resource.

These static content will also be packaged into the APK file. The static content will be stored either as a resource or as an asset.

Resources belong to a given type. These types can be:

1. Drawable.
2. Layout.
3. Value.

Let's start by looking at the layout resources

##### (a). activity_main.xml

```xml
<?xml version="1.0" encoding="utf-8"?>
<RelativeLayout

    android_layout_width="match_parent"
    android_layout_height="match_parent"
    android_paddingBottom="@dimen/activity_vertical_margin"
    android_paddingLeft="@dimen/activity_horizontal_margin"
    android_paddingRight="@dimen/activity_horizontal_margin"
    android_paddingTop="@dimen/activity_vertical_margin"
    tools_context="com.tutorials.hp.simplespinner.MainActivity">

    <Spinner
        android_id="@+id/sp"
        android_layout_width="match_parent"
        android_layout_height="wrap_content"
        />
</RelativeLayout>
```

**SECTION 4 : Source Code Reference**

GitHub : **[Source](https://github.com/Oclemy/Spinner_and_Objects)**

Best Regards,

Oclemy.

## Example 5: Android Spinner CRUD - ADD UPDATE DELETE

_Android Simple Spinner CRUD tutorial._ Hello.This is what we do in this example:

- Perform basic crud operations for a Spinner.
- We are using an arraylist as our data source.
- We add,update and delete.

### Step 1 : Dependencies

No external dependencies are needed.

### Step 2 : Create Helper Class

#### CRUD Class

- Perform adding,updating and deleting.

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

### Step 3: MainActivity

- Launcher activity.
- ActivityMain.xml inflated as the contentview for this activity.
- Reference our adapterview,in this case our Spinner.
- Instantiate our ArrayAdapter and set it to our Spinner.

```java

public class MainActivity extends AppCompatActivity {

    Spinner sp;
    ArrayAdapter<String> adapter;
    CRUD crud=new CRUD();
    Dialog d;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);
        Toolbar toolbar = (Toolbar) findViewById(R.id.toolbar);
        setSupportActionBar(toolbar);

        sp= (Spinner) findViewById(R.id.sp);

        sp.setOnItemSelectedListener(new AdapterView.OnItemSelectedListener() {
            @Override
            public void onItemSelected(AdapterView<?> adapterView, View view, int i, long l) {

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

            @Override
            public void onNothingSelected(AdapterView<?> adapterView) {

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
        d.setTitle("Spinner CRUD");
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
                    sp.setAdapter(adapter);

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
                        sp.setAdapter(adapter);
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
                       sp.setAdapter(adapter);
                   }
            }
        });

        d.show();
    }
}
```

### Step 4: LAYOUTS

#### ActivityMain.xml

- To contain our ContentMain.xml.

```xml
<?xml version="1.0" encoding="utf-8"?>
<android.support.design.widget.CoordinatorLayout

    android_layout_width="match_parent"
    android_layout_height="match_parent"
    android_fitsSystemWindows="true"
    tools_context="com.tutorials.hp.spinner_crud.MainActivity">

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

#### ContentMain.xml

- To contain our spinner.

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
    tools_context="com.tutorials.hp.spinner_crud.MainActivity"
    tools_showIn="@layout/activity_main">

    <Spinner
        android_id="@+id/sp"
        android_layout_width="match_parent"
        android_layout_height="wrap_content"
        />
</RelativeLayout>
```

#### InputDialog.xml

- handles inputs

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
