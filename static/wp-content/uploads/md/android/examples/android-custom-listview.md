# ListView Customization Examples


In this article we will look at listview customization examples. Chances are that if you are going to be extensively using a listview in your app you will need to place some custom widgets on it. These widgets may include:

1. Images
2. CheckBoxes
3. Radiobuttons
4. Another view, maybe in header or footer.

This is what we refer to listview customization. In this tutorial we will look at examples related to this.


### What is a ListView?

A ListView is a control that displays a list of items vertically.

It is one of the most commonly used widgets in android. This is because most mobile applications involve dispaying list of items. Mostly these items are images and texts.

In a ListView, if we have a list of items that need to be viewed and the number exceeds the beyond the currently visible viewport,users can scroll to see the rest of items.

You can use a ListView in two ways:

1. Creating an Activity that extends the `android.app.ListActivity`. With a ListView is added to you implicitly.
2. Adding a ListView explicitly via XML layout.

Alot of people prefer the second approach as it's most flexible since we get to design our own UI.

**ListView API definition**

ListView is concrete class that resides in the `android.widget` package. So it's a widget.

```java
package android.widget;
```

It derives from `android.widget.AbsListView`:

```java
public class ListView extends AbsListView{..}
```

Here's the clas hierarchy:

```java
java.lang.Object
   ↳    android.view.View
       ↳    android.view.ViewGroup
           ↳    android.widget.AdapterView<android.widget.ListAdapter>
               ↳    android.widget.AbsListView
                   ↳    android.widget.ListView
```

ListView was added in API level 1 and still stands as one of the most widely used AdapterView, even with the introduction of the RecyclerView.

### Adapter

We said ListViews are views that show items in a vertically scrolling list.

Normally these items have to come from somewhere, some data source. Well the bridge between that data source and the ListView(or any AdapterView) is the **Adapter**.

It is the Adapter that provides the access to the underlying data. The Adapter is also responsible for making a view for each item in the data set.

Normally there are several adapters like:

1. ArrayAdapter.
2. CursorAdapter.
3. SimpleCursorAdapter.
4. BaseAdapter.

In this class we use the BaseAdapter.

## Example 1: Kotlin Android – Custom ListView – CardViews with Images and Text

In this class we see how to work with ListView, CardView in android. We want to create a simple app to show zen quotes. So we will have a custom listview with text and images. These will be inside a ListView and we will listen to click events of these cardviews and show the quote in a Toast message.

Our programming language is Kotlin.

### Step 1: Add ListView in Layout

First add a ListView in your XML layout. Assign the ListView an ID for identification from our Kotlin code.

```xml
    <ListView
        android:id="@+id/myListView"
        android:layout_width="match_parent"
        android:layout_height="wrap_content" />
```

Here's the full code:

**activity_main.xml**

```xml
<?xml version="1.0" encoding="utf-8"?>
<LinearLayout xmlns:android="http://schemas.android.com/apk/res/android"
    xmlns:app="http://schemas.android.com/apk/res-auto"
    xmlns:tools="http://schemas.android.com/tools"
    android:layout_width="match_parent"
    android:layout_height="match_parent"
    android:orientation="vertical"
    tools:context="info.camposha.kotlinlistviewcardviews.MainActivity">

    <TextView
        android:id="@+id/textView"
        android:layout_width="match_parent"
        android:layout_height="wrap_content"
        android:text="Zen Quotes App"
        android:textAlignment="center"
        android:textAppearance="@style/TextAppearance.AppCompat.Large"
        android:textColor="@color/colorAccent" />

    <ListView
        android:id="@+id/myListView"
        android:layout_width="match_parent"
        android:layout_height="wrap_content" />

</LinearLayout>
```

### STep : Write Code

Let's write our Kotlin code:

**Specify Imports**

We then add our import statements on top of our Kotlin class.

```kotlin
import android.content.Context
import android.support.v7.app.AppCompatActivity
import android.os.Bundle
import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import android.widget.*
import java.util.ArrayList
```

**Turn our class into an Activity**

We do this by deriving from `Activity` or `AppCompatActivity`.

```kotlin
class MainActivity : AppCompatActivity() {..}
```

**Create our Data Object**

We will be showing a List of quotes so we need to create a Kotlin data object class to represent a single quote.

```kotlin
    class Quote(private var quote:String, private var author: String, private var image: Int) {

        fun getQuote(): String { return quote  }
        fun getAuthor(): String { return author }
        fun getImage(): Int { return image  }
    }
```

**Create a Custom Adapter**

We will create another inner class that will be extending the `baseAdapter`. This is our adapter class and will adapt our data to our custom view.

It will also inflate our custom `row_model` layout into an a view object.

```kotlin
  class CustomAdapter(private var c: Context, private var quotes: ArrayList<Quote>) : BaseAdapter() {..}
```

**Create Data Source**

We will create an arraylist that will act as our data source. This arraylist will be passed to our CustomAdapter constructor:

```kotlin
    private val data: ArrayList<Quote>
        get() {
            val quotes = ArrayList<Quote>()
            ....
            return quotes;
        }
```

**Reference ListView and Set its Adapter**

This we do in the `onCreate()` method of our `MainActivity`:

```kotlin
        myListView = findViewById(R.id.myListView) as ListView

        //instantiate and set adapter
        adapter = CustomAdapter(this, data)
        myListView.adapter = adapter
```

Here's the full code:

**MainActivity.java**

```java
package info.camposha.kotlinlistviewcardviews

import android.content.Context
import android.support.v7.app.AppCompatActivity
import android.os.Bundle
import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import android.widget.*
import java.util.ArrayList

class MainActivity : AppCompatActivity() {
    /*
   Our data object class.
    */
    class Quote(private var quote:String, private var author: String, private var image: Int) {

        fun getQuote(): String { return quote  }
        fun getAuthor(): String { return author }
        fun getImage(): Int { return image  }
    }
    /*
    Our Custom Adapter class. Derives from BaseAdapter.
     */
    class CustomAdapter(private var c: Context, private var quotes: ArrayList<Quote>) : BaseAdapter() {

        override fun getCount(): Int   {  return quotes.size  }
        override fun getItem(i: Int): Any {  return quotes[i] }
        override fun getItemId(i: Int): Long { return i.toLong()}

        override fun getView(i: Int, view: View?, viewGroup: ViewGroup): View {
            var view = view
            if (view == null) {
                //inflate layout resource if its null
                view = LayoutInflater.from(c).inflate(R.layout.row_model, viewGroup, false)
            }

            //get current quote
            val quote = this.getItem(i) as Quote

            //reference textviews and imageviews from our layout
            val img = view!!.findViewById<ImageView>(R.id.imageView) as ImageView
            val nameTxt = view.findViewById<TextView>(R.id.quoteTxt) as TextView
            val propTxt = view.findViewById<TextView>(R.id.authorTxt) as TextView

            //BIND data to TextView and ImageVoew
            nameTxt.text = quote.getQuote()
            propTxt.text = quote.getAuthor()
            img.setImageResource(quote.getImage())

            //handle itemclicks for the ListView
            view.setOnClickListener { Toast.makeText(c, quote.getQuote(), Toast.LENGTH_SHORT).show() }

            return view
        }
    }
    //Main Activity Instance Fields.
    private lateinit var adapter: CustomAdapter
    private lateinit var myListView: ListView
    // our data source
    private val data: ArrayList<Quote>
        get() {
            val quotes = ArrayList<Quote>()

            var quote = Quote("Out beyond ideas of wrongdoing and rightdoing there is a field.I'll meet you there." +
                    "When the soul lies down in that grass the world is too full to talk about.","Rumi",R.drawable.rumi)
            quotes.add(quote)
            quote= Quote("Walk as if you are kissing the Earth with your feet.","Thich Nhat Hanh",R.drawable.thich)
            quotes.add(quote)
            quote= Quote("Man suffers only because he takes seriously what the gods made for fun.","Allan Watts",R.drawable.allan_watts)
            quotes.add(quote)
            quote= Quote("I have lived with several Zen masters -- all of them cats.","Eckhart Tolle",R.drawable.eckhart)
            quotes.add(quote)
            quote= Quote("I'm simply saying that there is a way to be sane. I'm saying that you can get rid of all this insanity created" +
                    " by the past in you. Just by being a simple witness of your thought processes.","Osho",R.drawable.osho)
            quotes.add(quote)
            quote= Quote("The way out is through the door. Why is it that no one will use this method?","Confucius",R.drawable.confucius)
            quotes.add(quote)
            quote= Quote("It is the power of the mind to be unconquerable.","Senecca",R.drawable.jiddu)
            quotes.add(quote)
            quote= Quote("It's like you took a bottle of ink and you threw it at a wall. Smash! And all that ink spread. And in " +
                    "the middle, it's dense, isn't it? ","Allan Watts",R.drawable.allan_watts)
            quotes.add(quote)
            quote= Quote("Only the hand that erases can write the true thing.","Meister Eckhart",R.drawable.allan_watts)
            quotes.add(quote)
            quote= Quote("Many have died; you also will die. The drum of death is being beaten. The world has fallen in love with a " +
                    "dream. Only sayings of the wise will remain."," Kabir",R.drawable.osho)
            quotes.add(quote)
            quote= Quote("Where there are humans, You'll find flies,And Buddhas.","Kobayashi Issa",R.drawable.eckhart)
            quotes.add(quote)
            quote= Quote("Silence is the language of Om. We need silence to be able to reach our Self. Both internal and external " +
                    "silence is very important to feel the presence of that supreme Love.","Amit Ray",R.drawable.jiddu)
            quotes.add(quote)
            quote= Quote("One day in my shoes and a day for me in your shoes, the beauty of travel lies in the ease and willingness " +
                    "to be more open.","Forrest Curran",R.drawable.confucius)
            quotes.add(quote)
            quote= Quote("Like vanishing dew,a passing apparition or the sudden flashnof lightning -- already gone -- thus should" +
                    " one regard one's self.","Ikyyu",R.drawable.thich)
            quotes.add(quote)
            quote= Quote("A student, filled with emotion and crying, implored, 'Why is there so much suffering? Suzuki Roshi " +
                    "replied, No reason.' ","Suzuki Roshi",R.drawable.rumi)
            quotes.add(quote)

            return quotes
        }
    /*
    When activity is created, reference ListView and set its adapter
     */
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_main)

        myListView = findViewById(R.id.myListView) as ListView

        //instantiate and set adapter
        adapter = CustomAdapter(this, data)
        myListView.adapter = adapter
    }
}
```

![Kotlin Android Custom ListView Images text](https://camposha.info/wp-content/uploads/2019/04/demo1-12.png)

Kotlin Android Custom ListView Images text

Best regards.

## Example 2: Kotlin Android Custom ListView With Images and Text

Another simple example written in Kotlin. Render both images and multiple text in a listview.

### Step 1: Create Project

Start by creating an empty `Android Studio` project.

### Step 2: Dependencies

No external dependencies are needed for this project.

### Step 3: Design Layouts

Each row in our listview will comprise an imageview to the left and two textviews to it's right. Here's the xml code for that:

**row.xml**

```xml
<?xml version="1.0" encoding="utf-8"?>
<LinearLayout xmlns:android="http://schemas.android.com/apk/res/android"
    android:layout_width="match_parent"
    android:layout_height="match_parent"
    android:orientation="horizontal"
    android:padding="16dp">

    <ImageView
        android:id="@+id/image"
        android:layout_width="75dp"
        android:layout_height="75dp"
        android:src="@mipmap/ic_launcher"/>

    <LinearLayout
        android:layout_width="match_parent"
        android:layout_height="wrap_content"
        android:orientation="vertical">

        <TextView
            android:id="@+id/textView1"
            android:layout_width="wrap_content"
            android:layout_height="wrap_content"
            android:text="Main Text"
            android:textStyle="bold"
            android:textSize="20sp"
            android:layout_margin="5dp"
            android:textColor="@android:color/black"/>

        <TextView
            android:id="@+id/textView2"
            android:layout_width="wrap_content"
            android:layout_height="wrap_content"
            android:text="Sub Text"
            android:textSize="18sp"
            android:layout_margin="5dp"
            android:textColor="#a9a9a9"/>

    </LinearLayout>
</LinearLayout>
```

### Step 4: Create Model class

Each row in our listview represents a single item. Each item will be defined by a model class. Our model class will take a title, description and image as parameters: two strings and an integer.

**Model.kt**

```kotlin
class Model(val title: String, val description: String, val img: Int)
{

}
```

### Step 5: Create an Adapter class

Next create an adapter class. The adapter class will bind data to our listview. It will also inflate the `row.xml` into a View object:

**MyAdapter.kt**

```kotlin
import android.content.Context
import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import android.widget.ArrayAdapter
import android.widget.ImageView
import android.widget.TextView
import com.example.customlistviewusingkotlin.Model.Model
import com.example.customlistviewusingkotlin.R
import kotlinx.android.synthetic.main.row.view.*

class MyAdapter(var mCtxt: Context, var resource: Int, var items:List<Model>) : ArrayAdapter<Model>(mCtxt, resource, items)
{
    override fun getView(position: Int, convertView: View?, parent: ViewGroup): View {
        val layoutInflater : LayoutInflater = LayoutInflater.from(mCtxt)
        val view : View = layoutInflater.inflate(resource, null)

        val imageView : ImageView = view.findViewById(R.id.image)
        val titleTextView : TextView = view.findViewById(R.id.textView1)
        val descriptionTextView : TextView = view.findViewById(R.id.textView2)

        var mItem:Model = items[position]
        imageView.setImageDrawable(mCtxt.resources.getDrawable(mItem.img))
        titleTextView.text = mItem.title
        descriptionTextView.text = mItem.description

        return view
    }
}
```

### Step 6: Create MainActivity

Finally we come to our MainActivity. We will prepare our dummy data here and add them to our adapter. Then we will set the adapter to our listview:

**MainActivity.kt**

```kotlin
package com.example.customlistviewusingkotlin

import androidx.appcompat.app.AppCompatActivity
import android.os.Bundle
import android.view.View
import android.widget.AdapterView
import android.widget.ListView
import android.widget.Toast
import com.example.customlistviewusingkotlin.Adapter.MyAdapter
import com.example.customlistviewusingkotlin.Model.Model

class MainActivity : AppCompatActivity() {

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_main)

        var listview = findViewById<ListView>(R.id.listview)
        //here friends i will create a separate listview variable
        var list = mutableListOf<Model>()

        list.add(Model("Facebook", "facebook description....", R.drawable.facebook ))
        list.add(Model("What's app", "what's app description....", R.drawable.whats_app ))
        list.add(Model("Instagram", "instagram description....", R.drawable.instagram ))
        list.add(Model("Twitter", "twitter description....", R.drawable.twitter ))
        list.add(Model("YouTube", "youtube description....", R.drawable.youtube ))

        listview.adapter = MyAdapter(this, R.layout.row, list)

        listview.setOnItemClickListener { parent:AdapterView<*>, view:View, position:Int, id:Long ->
            if (position == 0)
            {
                Toast.makeText(this,"you click on facebook",Toast.LENGTH_SHORT).show()
            }
            if (position == 1)
            {
                Toast.makeText(this,"you click on Whats app",Toast.LENGTH_SHORT).show()
            }
            if (position == 2)
            {
                Toast.makeText(this,"you click on Instagram",Toast.LENGTH_SHORT).show()
            }
            if (position == 3)
            {
                Toast.makeText(this,"you click on Twitter",Toast.LENGTH_SHORT).show()
            }
            if (position == 4)
            {
                Toast.makeText(this,"you click on YouTube",Toast.LENGTH_SHORT).show()
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
| 1. | [Download](https://github.com/Kiran-Bahalaskar/Custom-ListView-Using-Kotlin/archive/refs/heads/master.zip) Example |
| 2. | [Follow](https://github.com/Kiran-Bahalaskar/) code author |
| 3. | Code: [Apache 2.0 License](http://www.apache.org/licenses/LICENSE-2.0.txt) |

## Example 3: Android Custom ListView - CardViews With Images and Text

This is a custom ListView with Images and Text.In fact we shall  be using CardViews with Images and Text as our View Items for our ListView.We shall define the cardview as our rootView in our Model.xml Layout.

Its this model layout that shall be inflated in our Custom adapter to a single view item.

We then see how to handle ItemClicks for our custom listview.

We are using BaseAdapter with arraylist spacecrafts objects that has name,propellant and image.

[caption id="attachment_8398" align="alignnone" width="604"] Android Custom ListView CardViews Images text[/caption]

#### Section 1 : Our Build.Gradle

* * *

```groovy
apply plugin: 'com.android.application'

android {
    compileSdkVersion 24
    buildToolsVersion "24.0.0"

    defaultConfig {
        applicationId "com.tutorials.hp.listviewcustomcardviews"
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
    compile fileTree(dir: 'libs', include: ['*.jar'])
    testCompile 'junit:junit:4.12'
    compile 'com.android.support:appcompat-v7:24.0.0'
    compile 'com.android.support:cardview-v7:24.0.0'

}
```

#### Section 2 : Our Model Class

```java
package com.tutorials.hp.listviewcustomcardviews;

public class Spacecraft {
    int image;
    String name,propellant;

    public int getImage() {
        return image;
    }

    public void setImage(int image) {
        this.image = image;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getPropellant() {
        return propellant;
    }

    public void setPropellant(String propellant) {
        this.propellant = propellant;
    }
}
```

#### Section 3 : CustomAdapter class

* * *

```java
package com.tutorials.hp.listviewcustomcardviews;

import android.content.Context;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.BaseAdapter;
import android.widget.ImageView;
import android.widget.TextView;
import android.widget.Toast;

import java.util.ArrayList;

public class CustomAdapter extends BaseAdapter {
    Context c;
    ArrayList<Spacecraft> spacecrafts;

    public CustomAdapter(Context c, ArrayList<Spacecraft> spacecrafts) {
        this.c = c;
        this.spacecrafts = spacecrafts;
    }

    @Override
    public int getCount() {
        return spacecrafts.size();
    }

    @Override
    public Object getItem(int i) {
        return spacecrafts.get(i);
    }

    @Override
    public long getItemId(int i) {
        return i;
    }

    @Override
    public View getView(int i, View view, ViewGroup viewGroup) {
        if(view==null)
        {
            view= LayoutInflater.from(c).inflate(R.layout.model,viewGroup,false);
        }

        final Spacecraft s= (Spacecraft) this.getItem(i);

        ImageView img= (ImageView) view.findViewById(R.id.spacecraftImg);
        TextView nameTxt= (TextView) view.findViewById(R.id.nameTxt);
        TextView propTxt= (TextView) view.findViewById(R.id.propellantTxt);

        nameTxt.setText(s.getName());
        propTxt.setText(s.getPropellant());
        img.setImageResource(s.getImage());

        view.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                Toast.makeText(c, s.getName(), Toast.LENGTH_SHORT).show();
            }
        });

        return view;
    }
}
```

#### Section 4 : MainActivity class

* * *

```java
package com.tutorials.hp.listviewcustomcardviews;

import android.os.Bundle;
import android.support.v7.app.AppCompatActivity;
import android.widget.ListView;

import java.util.ArrayList;

public class MainActivity extends AppCompatActivity {

    CustomAdapter adapter;
    ListView lv;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);

        lv= (ListView) findViewById(R.id.lv);
        adapter=new CustomAdapter(this,getData());
        lv.setAdapter(adapter);

    }

    private ArrayList getData()
    {
        ArrayList<Spacecraft> spacecrafts=new ArrayList<>();

        Spacecraft s=new Spacecraft();
        s.setName("Pioneer");
        s.setPropellant("Chemical Energy");
        s.setImage(R.drawable.pioneer);
        spacecrafts.add(s);

        s=new Spacecraft();
        s.setName("Spitzer");
        s.setPropellant("Warp Drive");
        s.setImage(R.drawable.spitzer);
        spacecrafts.add(s);

        s=new Spacecraft();
        s.setName("Enterprise");
        s.setPropellant("Anti Matter");
        s.setImage(R.drawable.enterprise);
        spacecrafts.add(s);

        s=new Spacecraft();
        s.setName("Hubble");
        s.setPropellant("Laser Beam");
        s.setImage(R.drawable.herbal);
        spacecrafts.add(s);

        s=new Spacecraft();
        s.setName("Voyager");
        s.setPropellant("Solar Energy");
        s.setImage(R.drawable.voyager);
        spacecrafts.add(s);

        s=new Spacecraft();
        s.setName("Kepler");
        s.setPropellant("Solar Energy");
        s.setImage(R.drawable.kepler);
        spacecrafts.add(s);

        s=new Spacecraft();
        s.setName("Rosetter");
        s.setPropellant("Nuclear Energy");
        s.setImage(R.drawable.rosetta);
        spacecrafts.add(s);

        s=new Spacecraft();
        s.setName("WMAP");
        s.setPropellant("Nuclear Energy");
        s.setImage(R.drawable.wmap);
        spacecrafts.add(s);

        s=new Spacecraft();
        s.setName("Columbia");
        s.setPropellant("Chemical Energy");
        s.setImage(R.drawable.columbia);
        spacecrafts.add(s);

        return spacecrafts;
    }
}
```

#### Section 5 : Our XML Layouts

* * *

#### ActivityMain.xml

```xml
<?xml version="1.0" encoding="utf-8"?>
<RelativeLayout

    android_layout_width="match_parent"
    android_layout_height="match_parent"
    android_paddingBottom="@dimen/activity_vertical_margin"
    android_paddingLeft="@dimen/activity_horizontal_margin"
    android_paddingRight="@dimen/activity_horizontal_margin"
    android_paddingTop="@dimen/activity_vertical_margin"
    tools_context="com.tutorials.hp.listviewcustomcardviews.MainActivity">

    <ListView
        android_id="@+id/lv"
        android_layout_width="match_parent"
        android_layout_height="wrap_content"
         />
</RelativeLayout>
```

#### Model.xml

```xml
<?xml version="1.0" encoding="utf-8"?>
<android.support.v7.widget.CardView
    android_orientation="horizontal" android_layout_width="match_parent"

    android_layout_margin="10dp"
    card_view_cardCornerRadius="5dp"
    card_view_cardElevation="5dp"
    android_layout_height="200dp">

        <LinearLayout
            android_orientation="horizontal"
            android_layout_width="match_parent"
            android_layout_height="match_parent">

            <ImageView
                android_id="@+id/spacecraftImg"
                android_layout_width="150dp"
                android_layout_height="wrap_content" />

            <LinearLayout
                android_orientation="vertical"
                android_layout_width="wrap_content"
                android_layout_height="wrap_content">

                <TextView
                    android_layout_width="wrap_content"
                    android_layout_height="wrap_content"
                    android_textAppearance="?android:attr/textAppearanceLarge"
                    android_text="Name"
                    android_id="@+id/nameTxt"
                    android_padding="10dp"
                    android_textColor="@color/colorAccent"
                    android_textStyle="bold"
                    android_layout_alignParentLeft="true"
                    />

                <TextView
                    android_layout_width="wrap_content"
                    android_layout_height="wrap_content"
                    android_textAppearance="?android:attr/textAppearanceLarge"
                    android_text="Propellant....................."
                    android_lines="1"
                    android_id="@+id/propellantTxt"
                    android_padding="10dp"
                    android_layout_alignParentLeft="true"
                    />

            </LinearLayout>

            </LinearLayout>

</android.support.v7.widget.CardView>
```

#### Resources

| No. | Resource | Direct Links |
| --- | --- | --- |
| 1. | Facebook | [Page](https://web.facebook.com/oclemmy/) |
| 2. | YouTube | [Channel](https://www.youtube.com/c/programmingwizards) |

## Example 4 Android Custom ListView - With Headers and Footer

This is android listview customization tutorial.We see how to customize a listview to have grouped headers and footer and display our images and text.

[caption id="attachment_8402" align="alignnone" width="592"] Android Custom ListView with Header and Footer[/caption]

#### Section 1 : Model Class

This is our POJO class, our data object.

It represents a single Player object with name and image properties.

```java
package com.tutorials.listviewheaders;

public class Player {

  private String name;
  private int img;

   //CONSTRUCTOR
  public Player(String name,int img) {
    // TODO Auto-generated constructor stub
    this.img=img;
    this.name=name;
  }

  public String getName() {
    return name;
  }

  public void setName(String name) {
    this.name = name;
  }

  public int getImg() {
    return img;
  }

  public void setImg(int img) {
    this.img = img;
  }
}
```

#### Section 2 : Adapter Class

This is our Custom Adapter class.

This class derives from `android.widget.BaseAdapter` class.

```java
package com.tutorials.listviewheaders;

import java.util.ArrayList;

import android.content.Context;
import android.graphics.Color;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.BaseAdapter;
import android.widget.ImageView;
import android.widget.TextView;

public class Adapter extends BaseAdapter {

  ArrayList<Object> players;
  Context c;
  LayoutInflater inflater;
  static final int ROW=0;
  static final int HEADER=1;

  public Adapter(Context c,ArrayList<Object> players) {
    // TODO Auto-generated constructor stub
    this.c=c;
    this.players=players;
  }

   //GET TOTAL NUMBER OF ITEMS IN ARRAYLIST
  @Override
  public int getCount() {
    // TODO Auto-generated method stub
    return players.size();
  }

   //GET A SINGLE ITEM FROM THE ARRAYLIST
  @Override
  public Object getItem(int pos) {
    // TODO Auto-generated method stub
    return players.get(pos);
  }

    //GET ITEM IDENTIFIER
  @Override
  public long getItemId(int pos) {
    // TODO Auto-generated method stub
    return pos;
  }

  @Override
  public int getItemViewType(int position) {

     //CHECK IF CURRENT ITEM IS PLAYER THEN RETURN ROW
    if(getItem(position) instanceof Player)
    {
      return ROW;
    }

     //OTHERWISE RETURN HEADER
    return HEADER;
  }

  @Override
  public int getViewTypeCount() {
    // TODO Auto-generated method stub
    return 2;
  }
  @Override
  public View getView(int pos, View convertView, ViewGroup parent) {
    // TODO Auto-generated method stub

      //TYPE OF VIEW
    int type=getItemViewType(pos);

    //IF THERE IS NO VIEW CREATE IT
    if(convertView==null)
    {
      inflater=(LayoutInflater) c.getSystemService(Context.LAYOUT_INFLATER_SERVICE);

      switch (type) {
      case ROW:
        convertView=inflater.inflate(R.layout.rowmodel, null);
        break;
       case HEADER:
              convertView=inflater.inflate(R.layout.headermodel,null);
      default:
        break;
      }
    }

     //OTHERWISE CHECK IF ITS ROW OR HEADER AND SET DATA ACCORDINGLY
    switch (type) {
    case ROW:
      Player p=(Player) getItem(pos);

        //INITIALIZE TEXTVIEW AND IMAGEVIEW
      TextView nameTv=(TextView) convertView.findViewById(R.id.nameTv);
       ImageView img=(ImageView)convertView.findViewById(R.id.imageView1);

       //SET TEXT AND IMAGE
       nameTv.setText(p.getName());
       img.setImageResource(p.getImg());

      break;
    case HEADER:
      String header=(String) getItem(pos);
      TextView headerTv=(TextView) convertView.findViewById(R.id.headerTv);

       //SET HEADER TEXT AND MAYBE BACKGROUND
      headerTv.setText(header);
      headerTv.setBackgroundColor(Color.parseColor("#33363c"));

    default:
      break;
    }

    return convertView;
  }

}
```

#### Section 3 : MainActivity Class

This is our Main activity class.

This class derives from `android.app.Activity`.

```java
package com.tutorials.listviewheaders;

import java.util.ArrayList;

import android.app.Activity;
import android.os.Bundle;
import android.widget.ListView;

public class MainActivity extends Activity {

  ListView lv;
  String[] players = { "Ander Herera", "Eden Hazard", "Aaron Ramsey",
      "Michael Carrick", "Juan Mata", "Van Persie", "Alexis Sanchez" };
  int[] images = { R.drawable.herera, R.drawable.hazard, R.drawable.ramsey,
      R.drawable.carrick, R.drawable.mata, R.drawable.vanpersie,
      R.drawable.sanchez };

  @Override
  protected void onCreate(Bundle savedInstanceState) {
    super.onCreate(savedInstanceState);
    setContentView(R.layout.activity_main);

    // INITIALIZE LISTVIEW
    lv = (ListView) findViewById(R.id.listView1);

    // CREATE ADAPTER,SET IT TO LISTVIEW
    Adapter adapter = new Adapter(this, getPlayers());
    lv.setAdapter(adapter);
  }

  // THIS METHOD SHALL RETURN AN ARRAYLIST CONTAINING PLAYERS AND HEADERS
  private ArrayList<Object> getPlayers() {
    // PLAYER OBJECTS
    Player p0 = new Player(players[0], images[0]);
    Player p1 = new Player(players[1], images[1]);
    Player p2 = new Player(players[2], images[2]);
    Player p3 = new Player(players[3], images[3]);
    Player p4 = new Player(players[4], images[4]);
    Player p5 = new Player(players[5], images[5]);
    Player p6 = new Player(players[6], images[6]);

    // ARRAYLIST TO HOLD ALL PALYER OBJECTS AND HEADERS
    ArrayList<Object> people = new ArrayList<Object>();

    // THIS IS THE FIRST HEADER
    people.add("                    Creative Midfielders ");

    // PLAYERS
    people.add(p0);
    people.add(p1);
    people.add(p2);

    // HEADER
    people.add("                     Midfield Dynamos   ");
    // MORE PLAYERS
    people.add(p3);
    people.add("                     Goal Poachers    ");
    people.add(p4);
    people.add(p5);
    people.add(p6);
    // FOOTER
    people.add(" @ 2016            FOOTER");

    return people;

  }

}
```
