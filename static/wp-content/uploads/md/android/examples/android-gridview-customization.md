# GridView Customization Examples


GridView has existed in android sdk since the beginning of android. Through this widget you are able to show items in a grid and you have complete control over the number of columns shown. In this tutorial we will look at several android gridview customization examples.

## Example 1: Kotlin Android – Create a Gallery using GridView

In this example you will create a gallery using gridview. The gallery will list photos in a grid and when a photo is clicked you open a new activity to display the single photo as in a detail page.

Here is the demo of what is created:

![Kotlin Android Gallery Photo Example Gridview](https://github.com/alirezabashi98/GridView/raw/master/scr001.png)

![Photo Detail - gallery gridview example](https://github.com/alirezabashi98/GridView/raw/master/scr002.png)

### Step 1: Dependencies

No third party dependency is required for this project.

### Step 2: Design Layouts

We will need two layouts for this project:

1. activity_main.xml
2. activity_fullscreen.xml

**activity_main.xml**

This is our main activity layout. Simply add a gridview in it. The gridview will be used to render photos:

```xml
<?xml version="1.0" encoding="utf-8"?>
<LinearLayout xmlns:android="http://schemas.android.com/apk/res/android"
    xmlns:app="http://schemas.android.com/apk/res-auto"
    xmlns:tools="http://schemas.android.com/tools"
    android:layout_width="match_parent"
    android:layout_height="match_parent"
    tools:context=".MainActivity"
    android:orientation="vertical">

    <GridView
        android:id="@+id/gridView"
        android:layout_width="match_parent"
        android:layout_height="match_parent"
        android:numColumns="3"
        android:padding="5dp"
        android:verticalSpacing="5dp"
        android:horizontalSpacing="5dp"
        android:layout_gravity="center"
        android:gravity="center"/>

</LinearLayout>
```

**activity_fullscreen.xml**

This layout will be showing a single photo. In it add an imageview that has layout width andlayout height matching parent:

```xml
<?xml version="1.0" encoding="utf-8"?>
<LinearLayout xmlns:android="http://schemas.android.com/apk/res/android"
    xmlns:app="http://schemas.android.com/apk/res-auto"
    xmlns:tools="http://schemas.android.com/tools"
    android:layout_width="match_parent"
    android:layout_height="match_parent"
    tools:context=".Fullscreen">

    <ImageView
        android:id="@+id/img_full"
        android:layout_width="match_parent"
        android:layout_height="match_parent"
        android:scaleType="fitXY"/>

</LinearLayout>
```

### Step 3: Create a Grid Adapter

You need an adapter for you to be able to render custom data like images in a gridview. So you need to create a `GridAdapter.kt` and extend the baseadapter, then override methods as follows:

**GridAdapter.kt**

```kotlin
import android.content.Intent
import android.view.View
import android.view.ViewGroup
import android.widget.BaseAdapter
import android.widget.ImageView

class GridAdapter(private val list: List<Int>) : BaseAdapter() {
    override fun getView(position: Int, convertView: View?, parent: ViewGroup?): View {

        val img = ImageView(parent?.context)
        img.setImageResource(getItem(position))
        img.scaleType = ImageView.ScaleType.FIT_XY
        img.layoutParams = ViewGroup.LayoutParams(350,350)

        img.setOnClickListener {
            val intent = Intent(parent?.context,Fullscreen::class.java)
            intent.putExtra("imgID" , getItem(position))
            parent?.context?.startActivity(intent)
        }

        return img
    }

    override fun getItem(position: Int): Int = list[position]

    override fun getItemId(position: Int): Long = 0

    override fun getCount(): Int = list.size
}
```

### Step 4: Create a Full Screen Page

A Full screen page or the detail page we call it. This page will render the single photo that has been clicked from the gridview.

**Fullscreen.kt**

```kotlin
import androidx.appcompat.app.AppCompatActivity
import android.os.Bundle
import android.view.Window
import android.view.WindowManager
import kotlinx.android.synthetic.main.activity_fullscreen.*

class Fullscreen : AppCompatActivity() {

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        window.setFlags(WindowManager.LayoutParams.FLAG_FULLSCREEN,WindowManager.LayoutParams.FLAG_FULLSCREEN)
        setContentView(R.layout.activity_fullscreen)

        img_full.setImageResource(intent.getIntExtra("imgID" , R.drawable.test1))
    }
}
```

### Step 5: Create main activity

Next you create the main activity. You need to define your data source in this activity:

**MainActivity.kt**

```kotlin
import androidx.appcompat.app.AppCompatActivity
import android.os.Bundle
import kotlinx.android.synthetic.main.activity_main.*

class MainActivity : AppCompatActivity() {

    val list = listOf(
        R.drawable.test1 ,
        R.drawable.test2 ,
        R.drawable.test3 ,
        R.drawable.test4 ,
        R.drawable.test5 ,
        R.drawable.test1 ,
        R.drawable.test2 ,
        R.drawable.test3 ,
        R.drawable.test4 ,
        R.drawable.test5 ,
        R.drawable.test1 ,
        R.drawable.test2 ,
        R.drawable.test3 ,
        R.drawable.test4 ,
        R.drawable.test5 ,
        R.drawable.test1 ,
        R.drawable.test2 ,
        R.drawable.test3 ,
        R.drawable.test4 ,
        R.drawable.test5
    )

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_main)

        gridView.adapter = GridAdapter(list)
    }
}
```

### Run

Lastly you run the project.

### Reference

Find complete source code below:

| No. | Link |
| --- | --- |
| 1. | [Download](https://github.com/alirezabashi98/GridView/archive/refs/heads/master.zip) code |
| 2. | [Follow](https://github.com/alirezabashi98/) code author |

## Example 2: Android Custom GridView – CardView With Images and Text

_Android Custom GridView – CardView With Images and Text Tutrial_

How to create a custom gridview containing CardViews with text and images in android studio and listen to each CardView’s Click event. We do this for both Java and Kotlin.

#### The Plan

- Create a Custom GridView With CardViews as our ViewItems.
- Each cardview will be our viewitem hence shall have images and text.
- We then handle ItemClicks for the CardViews. When clicked we show a Toast message containing the clicked text.
- We are using BaseAdapter as our adapter of choice.

#### Demo

Here’s the demo for the Java Project:

![Android Custom GridView Example](https://camposha.info/wp-content/uploads/source/customgridviewcardviews/demo1.gif)

#### Tools Used

This example was written with the following tools:

- Windows 8.1
- [Android Studio](https://camposha.info/android/android-studio) IDE
- Genymotion Emulator
- Language : Java

Lets jump directly to the source code. Source code is well commented. Furthermore we have explained everything in the video tutorial.

#### (a). Build.Gradle

No special third party library is needed for this project

#### (b). Spacecraft.java

This is the class that will be our POJO class, otherwise known as bean class or data object. In this case we are using `Spacecraft` as our data object. Each Spacecraft has a `name`, `propellant` and an `image`,

```java
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

You can see we’ve supplied it with getter and setter methods.

#### (c). CustomAdapter.java

Whenever you are working with adapterviews like GridView, you always need an adapter. By design, android does not allow manual inserting of data into these adapterviews like say .NET Windows Forms and JavaFX. In android data is added to an adapter, the adapter is set to the adapterview.

This design decision provides a big advantage in terms of flexibility and decouplement of views from data. Thus this allows us write more quality while creating highly flexible applications. The role of the view is just to show data and listen to events. The adapter on the hand handles data as well as custom layouts as we see here.

There are several adapters as can be seen here. The most commonly used with gridview is the baseadapter. It is the one we use here.

We start by making several imports.

1. LayoutInflater – It is defined in the `android.view` package. It’s the class we use for inflating our custom layout:

```java
        if(view==null)
        {
            view= LayoutInflater.from(c).inflate(R.layout.model,viewGroup,false);
        }
```

This inflation is an expensive process. Inflating our XML layout for every data item in our data source can make our app noticeably slow and junky as the user scrolls. So normally we instead of inflating for every data item, we inflate for a single data item then reuse the inflated view for all the other data items. This leads to dramatic performance improvements since XML processing which is basically what the inflation involves has never been cheap. That’s why we’ve checked if the `view` was null as above.

1. BaseAdapter – defined in the `android.wideget` package. This is our adapter and it is an abstract class so we have to override several methods like the:

**(a). getCount**

To return us the number of spacecrafts to be used by the adapter.

```java
    @Override
    public int getCount() {
        return spacecrafts.size();
    }
```

**(b). getItem**

To return the current item in the list. We pass the position to get that item.

```java
    @Override
    public Object getItem(int i) {
        return spacecrafts.get(i);
    }
```

**(c). getItemId**

To return the id we are using for identification purposes.

```java
   @Override
    public long getItemId(int i) {
        return i;
    }
```

**(d). getView**

The one we modify the most. Remember the plan is that the GridView should be showing cardviews with images and text as the item views. It is inside this method where the work occurs. The first part of that work involves inflation which we’ve seen above.

Then getting the current spacecraft:

```java
        final Spacecraft s= (Spacecraft) this.getItem(i);
```

We’ve made it final as it will be called from an inner class.

Then referencing our the various widgets that will be rendered in our CardViews:

```java
        ImageView img= (ImageView) view.findViewById(R.id.spacecraftImg);
        TextView nameTxt= (TextView) view.findViewById(R.id.nameTxt);
        TextView propTxt= (TextView) view.findViewById(R.id.propellantTxt);
```

Make sure you reference them from the actual layout that shall be inflated by our LayoutInflater.

Then once the inflation and referencing has been done, we come to data binding:

```java
        nameTxt.setText(s.getName());
        propTxt.setText(s.getPropellant());
        img.setImageResource(s.getImage());
```

As you can see we’ve used the basic `setText()` methods for the TextViews and the `setImageResource()` for the ImageView.

What about handling itemClicks for our custom gridview? Well remember user will be clicking the CardViews. So we just listen to the click events for the inflated view.

```java
        view.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                Toast.makeText(c, s.getName(), Toast.LENGTH_SHORT).show();
            }
        });
```

In our case we’ve show a Toast message. In some cases you may need to open a new activity. In that case you just use Intent to do that inside the `onClick`.

Here’s this class as a whole:

```java

public class CustomAdapter extends BaseAdapter{
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

        //BIND
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

#### MainActivity.java

This is the main activity, mostly used as the launcher activity. You can read more about activities [here](https://camposha.info/android/activity) or more specifically appcompatactivity here.

But in this case among our imports you can see we have a GridView which is our adapterview. It will render our custom cardviews. Then when user clicks a single cardview a Toast message shall be shown.

We also have an ArrayList, which we use as our data source. Of course we add some data there first.

```java
public class MainActivity extends AppCompatActivity {

    CustomAdapter adapter;
    GridView gv;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);

        gv= (GridView) findViewById(R.id.gv);

        adapter=new CustomAdapter(this,getData());
        gv.setAdapter(adapter);

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

#### activity_main.xml

This is the layout that contains our GridView. We have wrapped it by a [relativelayout](https://camposha.info/android/relativelayout). Am using two columns because my images are abit larger.

```xml
<?xml version="1.0" encoding="utf-8"?>
<RelativeLayout

    android_layout_width="match_parent"
    android_layout_height="match_parent"
    android_paddingBottom="@dimen/activity_vertical_margin"
    android_paddingLeft="@dimen/activity_horizontal_margin"
    android_paddingRight="@dimen/activity_horizontal_margin"
    android_paddingTop="@dimen/activity_vertical_margin"
    tools_context="com.tutorials.hp.customgridviewcardviews.MainActivity">

    <GridView
        android_id="@+id/gv"
        android_layout_width="wrap_content"
        android_layout_height="wrap_content"
        android_numColumns="2"
         />
</RelativeLayout>
```

#### Model.xml

This is the custom layout that will define a single view item in our gridview. This layout will get inflated by the LayoutInflater as we discussed earlier. That inflation will take place inside our custom adapter.

At the root of our layout we’ve used a CardView, a support library that allows us display cards that can have several properties. Such properties include elevation and custom corner radius. CardViews allow us make modern apps.

Inside the CardView we will have ImageView to render image and TextViews to render text.

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
                android_src="@drawable/spitzer"
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

## 3\. Kotlin Android Custom GridView – CardViews with Images, Text and OnItemClick

_Kotlin Android Custom GridView – CardViews with Images, Text and OnItemClick Tutorial_

In this Kotlin Android tutorial, we see first how to populate a custom gridview with images and text. The images and text will bea rranged in custom view that has the CardView as the rootview.

We then listen to GridView item click events and show the selected item.

We are building a simple Quotes application to show a list of quotes, author names and author images.

Remember our programming language in this case is Kotlin.

Let’s go.

#### Video Tutorial(ProgrammingWizards TV Channel)

There is also a video tutorial by the way.

Well if you prefer tutorials like this one then it would be good you [subscribe to our YouTube channel](https://www.youtube.com/channel/UCpdkWp2zh5Qv1ZWlnqswdCw). Basically we have a TV for programming where do daily tutorials especially android.

<iframe width="560" height="315" src="https://www.youtube.com/embed/QvzhzFiBKDI" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>

#### Demo

Let’s now look at an example.

Let’s write some code.

#### Layouts

We have two layouts:

1. `activity_main.xml` – To be inflated into MainActivity’s UI.
2. `row_model.xml` – To model a single grid for our custom gridview. Has a CardView as the root XML element.

##### (a). activity_main.xml

This layout will get inflated into the main activity’s user interface. This will happen via the Activity’s `setContentView()` method which will require us to pass it the layout.

We will do so inside the `onCreate()` method of [Activity](https://camposha.info/android/activity).

We will be using three elements:

1. [LinearLayout](https://camposha.info/android/linearlayout) – a Viewgroup that organizes its children lineary.
2. TextView – To show our header text.
3. GridView – To show our data in scrollable grids.

Here’s the code:

```xml
<?xml version="1.0" encoding="utf-8"?>
<LinearLayout

    android_layout_width="match_parent"
    android_layout_height="match_parent"
    android_orientation="vertical"
    tools_context="info.camposha.kotlingridviewcardviews.MainActivity">

    <TextView
        android_id="@+id/textView"
        android_layout_width="match_parent"
        android_layout_height="wrap_content"
        android_text="Zen Quotes App"
        android_textAlignment="center"
        android_textAppearance="@style/TextAppearance.AppCompat.Large"
        android_textColor="@color/colorAccent" />

    <GridView
        android_id="@+id/myGridView"
        android_layout_width="match_parent"
        android_layout_height="wrap_content"
        android_numColumns="auto_fit" />

</LinearLayout>
```

##### (b). row_model.xml

This layout will be inflated inside our `CustomAdapter`‘s `getView()` method into a view item for our GridView.

Some of the widgets we use include:

1. TextView – To render text
2. ImageView – To render images.

Hence courtesy of this layout and our `CustomAdapter` class, our Gridview will have both images and text.

Here’s the full code:

```xml
<?xml version="1.0" encoding="utf-8"?>
<android.support.v7.widget.CardView

    android_layout_width="match_parent"

    android_layout_margin="5dp"
    card_view_cardCornerRadius="5dp"
    card_view_cardElevation="10dp"
    android_layout_height="300dp">

    <RelativeLayout
        android_layout_width="match_parent"
        android_layout_height="match_parent">

        <ImageView
            android_id="@+id/imageView"
            android_layout_width="match_parent"
            android_layout_height="150dp"
            android_padding="10dp"
            card_view_srcCompat="@android:color/holo_red_light" />

            <TextView
                android_layout_width="wrap_content"
                android_layout_height="wrap_content"
                android_textAppearance="?android:attr/textAppearanceSmall"
                android_text="Name"
                android_id="@+id/quoteTxt"
                android_padding="5dp"
                android_textColor="@color/colorAccent"
                android_layout_below="@+id/imageView"
                android_layout_alignParentLeft="true"
                />
            <TextView
                android_layout_width="wrap_content"
                android_layout_height="wrap_content"
                android_textAppearance="?android:attr/textAppearanceSmall"
                android_text=" Author --------------------"
                android_id="@+id/authorTxt"
                android_padding="5dp"
                android_layout_below="@+id/quoteTxt"
                android_layout_alignParentLeft="true"
                />

    </RelativeLayout>

</android.support.v7.widget.CardView>
```

#### Kotlin Code

Android apps can be mainly written in Java or Kotlin. These days however there are many frameworks like Flutter also which use languages like Dart.

In this class we are using Kotlin programming language.

We will have these classes in our project.

##### (a). MainActivity.kt

This is our main activity as the name suggests. This means it will be the main entry point to our app in that when the user clicks the icon for our app, this activity will get rendered first.

We override a method called `onCreate()`. Here we will start by inflating our main layout via the `setContentView()` method.

Our main activity is actually an [activity](https://camposha.info/android/activity) since it’s deriving from the AppCompatActivity.

Remember we are writing our code in Kotlin.

###### Top Questions our MainActivity.kt will Answer For us?

**1\. How to Create an Activity in Kotlin**

Well you do that by making an ordinary class derive from AppCompatActivity. Kotlin is a modern statically typed language that has full support for Object oriented capabilities including Inheritance which we utilize here:

```kotlin
class MainActivity : AppCompatActivity() {..}
```

**2\. How to Create a Data Object in Kotlin**

Well a data object, also sometimes called a model class or a business object is a popular pattern for data representation. It’s very easily understandable and is also an example of Kotlin’s Object orientation through Encapsulation.

Like in this case our data object encapsulates us a single a Quote with these properties:

1. Quote Author.
2. Quote Text.
3. Quote Author’s Image

```kotlin
    class Quote(private var quote:String, private var author: String, private var image: Int) {

        fun getQuote(): String { return quote  }
        fun getAuthor(): String { return author }
        fun getImage(): Int { return image  }
    }
```

**3\. How to Create an Adapter For a GridView in Kotlin**

Well you do that by deriving from any of the several Adapter sub-classes. In this case we will use the most commonly used one, the BaseAdapter.

Just have you class derive from the `BaseAdapter`:

```kotlin
    class CustomAdapter(private var c: Context, private var quotes: ArrayList<Quote>) : BaseAdapter() {...}
```

In our case we are also injecting several objects into our adapter class including:

1. Context – To be used during inflation.
2. ArrayList – To hold our quotes list. It is those quotes that we will be binding to our custom gridview.

**4\. How to set an adapter to a GridView**

Well first you just reference the gridview from he layout using the `findViewById()` method.

```kotlin
   gv = findViewById(R.id.myGridView) as GridView
```

Then instantiate the `CustomAdapter` and set it as the `adapter` property of our GridView.

```kotlin
        //instantiate and set adapter
        adapter = CustomAdapter(this, data)
        gv.adapter = adapter
```

Here’s the full code:

```java
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

            //handle itemclicks for the GridView
            view.setOnClickListener { Toast.makeText(c, quote.getQuote(), Toast.LENGTH_SHORT).show() }

            return view
        }
    }
    //Main Activity Instance Fields.
    private lateinit var adapter: CustomAdapter
    private lateinit var gv: GridView
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
    When activity is created, reference gridview and set its adapter
     */
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_main)

        gv = findViewById(R.id.myGridView) as GridView

        //instantiate and set adapter
        adapter = CustomAdapter(this, data)
        gv.adapter = adapter
    }
}
```
