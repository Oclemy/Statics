# Android Pagination Examples for ListView and GridView

Paging data is an important operation in software applications. It's importance is magnified even more with mobile devices. These devices normally have a smaller screen area. Thus users can only see a small amount of data per given viewport.


So we really need a way of paging data so as to give users the opportunity to view and work with even more data. There are various types of pagination that can be applied to mobile apps:

- Next/Previous Pagination
- Numbered Pagination.
- Infinite/Endless Pagination.

In this piece we want to explore all sorts of pagination examples for android.

## Example 1 - Android Custom ListView Pagination Next/Previous

Android ListView Next/Previous Pagination Tutorial

In this example we look at how to page/paginate data in a listview in android. Paging/Paginating data is important nowadays in most applications because the mobile screen is fairly small and can only show about 5-10 items per viewport.

##### Video Tutorial

We have a fast growing [ProgrammingWizards TV YouTube Channel](http://www.youtube.com/c/programmingwizards) with tutorials like this. Here is this tutorial in video format:

Let's start: Here's our full project structure:

![Project Structure](https://camposha.info/wp-content/uploads/ListViewPaging/Project_Structure.png)

##### Step 1 - Create Android Project

- In your android studio go to File -- New -- New Project.
- Type Project Name.
- Choose minimum sdk.
- From templates choose empty activity.

![Empty Activity Template](https://camposha.info/wp-content/uploads/Choose_Empty_Activity.png)

##### Step 2 - Add CardView Dependency.

The second step is to add CardView as a dependency in your build.gradle(Module:app). This is beacuse we will use CardViews as Viewitems in our ListView.

1. Under your Gradle scripts in your project choose build.gradle(Module:app). ![Choose build.gradle module app](https://camposha.info/wp-content/uploads/Choose_build_gradle_app.png)
2. Add our cardview as a dependency under the dependencies closure: `compile 'com.android.support:cardview-v7:26.+'`

##### Step 3. Prepare Drawable and Layout Resources.

We now need to add the images to use inside our ListView and also define the layouts for our activity as well as custom rows.

1. Under the drawable add images to be rendered alongside text in the custom listview.
2. We also need two layouts: activity_main.xml and model.xml.
3. The activity_main.xml may already have been generated to you by android studio.So let's just add a ListView with two buttons below it. The buttons are next/previous buttons:

Here's the component tree:

##### 4\. Add the following code in activity_main.xml:

```xml
    <ListView
                android_id="@+id/listview"
                android_layout_width="match_parent"
                android_layout_height="wrap_content"
                />
             <LinearLayout
                android_layout_weight="2"
                android_orientation="horizontal"
                android_layout_width="match_parent"
                android_layout_height="100dp">
                <Button
                    android_id="@+id/prevBtn"
                    android_text="Previous"
                    android_background="@color/colorAccent"
                    android_padding="10dp"
                    android_layout_width="wrap_content"
                    android_layout_height="wrap_content" />
                <Button
                    android_id="@+id/nextBtn"
                    android_text="Next"
                    android_background="#009968"
                    android_padding="10dp"
                    android_layout_width="wrap_content"
                    android_layout_height="wrap_content" />

            </LinearLayout>
```

##### 1\. We also need to prepare our custom row model.

Here's the model layout design in android studio pallete:

And here's its component tree:

Add the following code in you model.xml. If you haven't created it, go ahead and create it.

```xml
    <?xml version="1.0" encoding="utf-8"?>
    <android.support.v7.widget.CardView
        android_orientation="horizontal" android_layout_width="match_parent"

        android_layout_margin="5dp"
        card_view_cardCornerRadius="15dp"
        card_view_cardElevation="10dp"
        android_layout_height="200dp">

        <LinearLayout
             android_orientation="vertical"
            android_layout_width="match_parent"
            android_layout_height="match_parent">

            <TextView
                android_layout_width="wrap_content"
                android_layout_height="wrap_content"
                android_textAppearance="?android:attr/textAppearanceLarge"
                android_text="Galaxy"
                android_id="@+id/nameTxt"
                android_padding="10dp"
                android_textColor="@color/abc_btn_colored_borderless_text_material"
                android_layout_alignParentTop="true"/>
            <LinearLayout
                android_orientation="horizontal"
                android_layout_width="match_parent"
                android_layout_height="wrap_content">
                <ImageView
                    android_id="@+id/galaxyImageview"
                    android_layout_width="wrap_content"
                    android_layout_height="wrap_content"
                    android_layout_alignParentLeft="true"
                    android_layout_alignParentTop="true"
                    android_layout_marginLeft="24dp"
                    android_src="@drawable/andromeda" />
                <TextView
                    android_layout_width="wrap_content"
                    android_layout_height="wrap_content"
                    android_textAppearance="?android:attr/textAppearanceLarge"
                    android_text="Description"
                    android_id="@+id/descTxt"
                    android_padding="10dp"/>
                <TextView
                    android_layout_width="wrap_content"
                    android_layout_height="wrap_content"
                    android_textAppearance="?android:attr/textAppearanceLarge"
                    android_text="Category"
                    android_id="@+id/categoryTxt"
                    android_textStyle="italic"
                    android_textColor="@color/colorPrimary"
                    android_layout_gravity="bottom"
                    android_padding="10dp"/>
            </LinearLayout>

        </LinearLayout>
    </android.support.v7.widget.CardView>
```

##### Step 4 - Create a POJO class.

POJO stands for Plain Old Java Object. It's our data object class. The class that will define our business entity and it's properties. In this case that business entity is a galaxy. In that our ListView will hold a list of Galaxy objects. Our Galaxy will have the following properties:

- Name - String.
- Description - String.
- Category - String
- Image - int

Each galaxy object will be represented in a cardview. Here's how the class will appear:

```java
    public class Galaxy {

        private String name,description,category;
        private int image;
        /*
        - Our constructor.
         */
        public Galaxy(String name, String description, int image,String category) {
            this.name = name;
            this.description = description;
            this.image = image;
            this.category=category;
        }
        /*
        - Our getters and setters.
         */
        public String getName() {
            return name;
        }
        public String getDescription() {
            return description;
        }
        public int getImage() {
            return image;
        }
        public String getCategory() {
            return category;
        }
    }
```

##### Step 5 - Create a DataHolder class.

We now a need a class that will act for us as the data source of our project. This class can then be easily replaced with a database or some other data osurce. In this case we use an arraylist as the data source. The advantage of this is that you can easily obtain for example data from say database or from the cloud, populate this arraylist and our application will page it. However, it will be a client side pagination as opposed to a server side pagination.

##### 1\. Create a class :

```java
    public class DataHolder {
    }
```

##### 2\. Add imports:

```java
    import java.util.ArrayList;
    import java.util.List;
```

Our data source is going to be an arraylist.

##### 3\. Populate our data source with data.

We create a static method that where we populate our arraylist with data and return it. First we instantiate the individual Galaxy objects and pass in the name, description, image and category.

```java
     public static List<Galaxy> getGalaxies()
        {
            ArrayList<Galaxy> galaxies=new ArrayList<>();

            Galaxy g=new Galaxy("Whirlpool",
                    "The Whirlpool Galaxy, also known as Messier 51a, M51a, and NGC 5194, is an interacting grand-design spiral Galaxy with a Seyfert 2 active galactic nucleus in the constellation Canes Venatici.",
                    R.drawable.whirlpool,"spiral");
            galaxies.add(g);

            g=new Galaxy("Ring Nebular",
                    "The Ring Nebula is a planetary nebula in the northern constellation of Lyra. Such objects are formed when a shell of ionized gas is expelled into the surrounding interstellar medium by a red giant star.",
                    R.drawable.ringnebular,"elliptical");
            galaxies.add(g);

            g=new Galaxy("IC 1011",
                    "C 1011 is a compact elliptical galaxy with apparent magnitude of 14.7, and with a redshift of z=0.02564 or 0.025703, yielding a distance of 100 to 120 Megaparsecs. Its light has taken 349.5 million years to travel to Earth.",
                    R.drawable.ic1011,"elliptical");
            galaxies.add(g);

            g=new Galaxy("Cartwheel",
                    "The Cartwheel Galaxy is a lenticular galaxy and ring galaxy about 500 million light-years away in the constellation Sculptor. It is an estimated 150,000 light-years diameter, and a mass of about 2.9–4.8 × 10⁹ solar masses; it rotates at 217 km/s.",
                    R.drawable.cartwheel,"irregular");
            galaxies.add(g);

            g=new Galaxy("Triangulumn",
                    "The Triangulum Galaxy is a spiral Galaxy approximately 3 million light-years from Earth in the constellation Triangulum",
                    R.drawable.triangulum,"spiral");
            galaxies.add(g);

            g=new Galaxy("Small Magellonic Cloud",
                    "The Small Magellanic Cloud, or Nubecula Minor, is a dwarf galaxy near the Milky Way. It is classified as a dwarf irregular galaxy.",
                    R.drawable.smallamgellonic,"irregular");
            galaxies.add(g);

            g=new Galaxy("Centaurus A",
                    " Centaurus A or NGC 5128 is a galaxy in the constellation of Centaurus. It was discovered in 1826 by Scottish astronomer James Dunlop from his home in Parramatta, in New South Wales, Australia.",
                    R.drawable.centaurusa,"elliptical");
            galaxies.add(g);

            g=new Galaxy("Ursa Minor",
                    "The Milky Way is the Galaxy that contains our Solar System." +
                            " The descriptive milky is derived from the appearance from Earth of the Galaxy – a band of light seen in the night sky formed from stars",
                    R.drawable.ursaminor,"irregular");
            galaxies.add(g);

            g=new Galaxy("Large Magellonic Cloud",
                    " The Large Magellanic Cloud is a satellite galaxy of the Milky Way. At a distance of 50 kiloparsecs, the LMC is the third-closest galaxy to the Milky Way, after the Sagittarius Dwarf Spheroidal and the.",
                    R.drawable.largemagellonic,"irregular");
            galaxies.add(g);

            g=new Galaxy("Milky Way",
                    "The Milky Way is the Galaxy that contains our Solar System." +
                            " The descriptive milky is derived from the appearance from Earth of the Galaxy – a band of light seen in the night sky formed from stars",
                    R.drawable.milkyway,"spiral");
            galaxies.add(g);

            g=new Galaxy("Andromeda",
                    "The Andromeda Galaxy, also known as Messier 31, M31, or NGC 224, is a spiral Galaxy approximately 780 kiloparsecs from Earth. It is the nearest major Galaxy to the Milky Way and was often referred to as the Great Andromeda Nebula in older texts.",
                    R.drawable.andromeda,"irregular");
            galaxies.add(g);

            g=new Galaxy("Messier 81",
                    "Messier 81 is a spiral Galaxy about 12 million light-years away in the constellation Ursa Major. Due to its proximity to Earth, large size and active galactic nucleus, Messier 81 has been studied extensively by professional astronomers.",
                    R.drawable.messier81,"elliptical");
            galaxies.add(g);

            g=new Galaxy("Own Nebular",
                    " The Owl Nebula is a planetary nebula located approximately 2,030 light years away in the constellation Ursa Major. It was discovered by French astronomer Pierre Méchain on February 16, 1781",
                    R.drawable.ownnebular,"elliptical");
            galaxies.add(g);

            g=new Galaxy("Messier 87",
                    "Messier 87 is a supergiant elliptical galaxy in the constellation Virgo. One of the most massive galaxies in the local universe, it is notable for its large population of globular clusters—M87 contains",
                    R.drawable.messier87,"elliptical");
            galaxies.add(g);

            g=new Galaxy("Cosmos Redshift",
                    "Cosmos Redshift 7 is a high-redshift Lyman-alpha emitter Galaxy, in the constellation Sextans, about 12.9 billion light travel distance years from Earth, reported to contain the first stars —formed ",
                    R.drawable.cosmosredshift,"irregular");
            galaxies.add(g);

            g=new Galaxy("StarBust",
                    "A starburst Galaxy is a Galaxy undergoing an exceptionally high rate of star formation, as compared to the long-term average rate of star formation in the Galaxy or the star formation rate observed in most other galaxies. ",
                    R.drawable.starbust,"irregular");
            galaxies.add(g);

            g=new Galaxy("Sombrero",
                    "Sombrero Galaxy is an unbarred spiral galaxy in the constellation Virgo located 31 million light-years from Earth. The galaxy has a diameter of approximately 50,000 light-years, 30% the size of the Milky Way.",
                    R.drawable.sombrero,"spiral");
            galaxies.add(g);

            g=new Galaxy("Pinwheel",
                    "The Pinwheel Galaxy is a face-on spiral galaxy distanced 21 million light-years away from earth in the constellation Ursa Major. ",
                    R.drawable.pinwheel,"spiral");
            galaxies.add(g);

            g=new Galaxy("Canis Majos Overdensity",
                    "The Canis Major Dwarf Galaxy or Canis Major Overdensity is a disputed dwarf irregular galaxy in the Local Group, located in the same part of the sky as the constellation Canis Major. ",
                    R.drawable.canismajoroverdensity,"irregular");
            galaxies.add(g);

            g=new Galaxy("Virgo Stella Stream",
                    " Group, located in the same part of the sky as the constellation Canis Major. ",
                    R.drawable.virgostellarstream,"spiral");
            galaxies.add(g);

            return galaxies;
        }
```

##### Step 6 - Create and Adapter class.

So far we have defined our data object as well as our data source. So the data part is set to go. However, that's complex data we are working with in that it comprises multiple text and images. There is no way our ListView will be able to just render that complex data out of the blue. We need to help it. That's where the adapter class comes in. Adapter classes can adapt data to a adapterviews like listview. In this case we use the _BaseAdapter_ implementation.

##### 1\. Create a Custom Adapter class.

```java
    public class CustomAdapter{

    }
```

##### 2\. Import the following classes/packages at the top of your CustomAdapter class.

```java
    import android.content.Context;
    import android.view.LayoutInflater;
    import android.view.View;
    import android.view.ViewGroup;
    import android.widget.BaseAdapter;
    import android.widget.ImageView;
    import android.widget.TextView;
    import java.util.ArrayList;
```

##### 3\. Make our CustomAdapter class derive from BaseAdapter class.

```java
    public class CustomAdapter extends BaseAdapter {
    }
```

BaseAdapter class is an abstract class that resides in the android.widget package. It itself derives from java.lang.Object class and implements ListAdapter and SpinnerAdapter interfaces. Deriving from it is what makes our class an adapter. However, given that it's abstract, we have to implement a couple of methods, so proceed and add the following methods, constructor and fields as below:

```java
        Context c;
        ArrayList<Galaxy> galaxies;

        public CustomAdapter(Context c, ArrayList<Galaxy> galaxies) {
            this.c = c;
            this.galaxies = galaxies;
        }

        @Override
        public int getCount() {
            return galaxies.size();
        }

        @Override
        public Object getItem(int i) {
            return galaxies.get(i);
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
            //reference widgets
            TextView nameTxt=view.findViewById(R.id.nameTxt);
            TextView descTxt=view.findViewById(R.id.descTxt);
            TextView categoryTxt=view.findViewById(R.id.categoryTxt);
            ImageView galaxyImg=view.findViewById(R.id.galaxyImageview);

            //bind data to widgets
            Galaxy g= (Galaxy) getItem(i);
            nameTxt.setText(g.getName());
            descTxt.setText(g.getDescription());
            categoryTxt.setText(g.getCategory());
            galaxyImg.setImageResource(g.getImage());

            return view;
        }
```

##### Step 7 - Create a Paginator class.

So by this time our code knows how to create a data source and bind the resultant complex data to a custom listview. Thus it can render our data as a long list of items.

However, we desire to page.paginate that data. So that say we can only have like 5 or 6 items per page. Then the user can naviage using the next/previous buttons. So then we create a Paginator class that will be responsible for this pagination/paging of data. This class will work hand in hand with the mainactivity to perform paging of any arraylist of data. The MainActivity will be responsible for maintaining the state of the current page, while the Paginator class will be responsible for pagination.

##### 1\. First create a Paginator class.

```java
    public class Paginator {
    }
```

##### 2\. Add the following import:

```java
    import java.util.ArrayList;
```

This is because we will be returning an arraylist of the current page items.

##### 3\. Define Constants that will help us in paging/pagination of data.

For example we need to know the total number of items and items per page. Add the following code as fields in our class.

```java
     public static final int TOTAL_NUM_ITEMS = DataHolder.getGalaxies().size();
     public static final int ITEMS_PER_PAGE = 5;
```

##### 4\. Calculate the total number of pages.

We already know the total number of items in our list. We also know the items per page. Now we can use that to calculate the total number of pages we will have.

```java
      public int getTotalPages() {
            int remainingItems=TOTAL_NUM_ITEMS % ITEMS_PER_PAGE;
            if(remainingItems>0)
            {
                return TOTAL_NUM_ITEMS / ITEMS_PER_PAGE;
            }
            return (TOTAL_NUM_ITEMS / ITEMS_PER_PAGE)-1;

        }
```

##### 5\. Return current page's data dynamically.

So now we can obtain the current page's data and return it to the adapter so that it can be rendered. Hwoever, we need to know the current page. So this current page variable will be passed from the MainActivity and then we can use it to obtain that page's data.

```java
        /*
        CURRENT PAGE's GalaxieS LIST
         */
        public ArrayList<Galaxy> getCurrentGalaxys(int currentPage) {
            int startItem = currentPage * ITEMS_PER_PAGE;
            int lastItem = startItem + ITEMS_PER_PAGE;

            ArrayList<Galaxy> currentGalaxys = new ArrayList<>();

            //LOOP THRU LIST OF GALAXIES AND FILL CURRENTGALAXIES LIST
            try {
                for (int i = 0; i < DataHolder.getGalaxies().size(); i++) {

                    //ADD CURRENT PAGE'S DATA
                    if (i >= startItem && i < lastItem) {
                        currentGalaxys.add(DataHolder.getGalaxies().get(i));
                    }
                }
                return currentGalaxys;
            } catch (Exception e) {
                e.printStackTrace();
                return null;
            }
        }
```

##### Step 7 - Our MainActivity.

So far so good. We know how to define our data source. We know how to bind custom data from this data source to a custom listview. We even know to actually page data and return the current page's data. However, the truth is that we need to have a way of maintaing the state of the buttons and the current page counter. Therefore this is where our MainActivity comes. Thus not only will it maintain state for us, but it is also our launcher activity and where we actually bind our data to ListView. So this class responsibilities include:

- Launch our application.
- Maintain the current page's state in a counter variable.
- Maintain next/previous button's state according to current page.
- Reference our ListView and buttons from the activity_main.xml.
- Instantiate our CustomAdapter class and set it to our ListView.

##### 1\. Create the activity - if it's not been generated yet.

Most probably the mainactivity has been generated by android studio. Howver, if not yet, then create a class and call it MainActivity.

```java
    public class MainActivity{

    }
```

##### 2\. Add imports:

Add the follwoing imports at the top of your class.

```java
    import android.os.Bundle;
    import android.support.v7.app.AppCompatActivity;
    import android.view.View;
    import android.widget.Button;
    import android.widget.ListView;
```

##### 3\. Derive from AppCompatActivity

Extend the AppCompatActivity class to turn our simple class into an actual activity.

```java
    public class MainActivity extends AppCompatActivity {
    }
```

AppCompatActivity resides in the android.support.v7.app package. It itself derives from android.support.v4.app.FragmentActivity. It is a base class fr activities that use support library action bar features.

##### 4\. Add class fields.

Let's add the following class fields.

```java
        ListView listView;
        Button nextBtn, prevBtn;
        Paginator p = new Paginator();
        private int totalPages =p.getTotalPages();
        private int currentPage = 0;
        CustomAdapter adapter;
```

##### 5\. Initialize our views.

Let's define a method that initializes all our views(ListView and buttons).

```java
       /*
        - Initialize ListView.
         */
        private void initializeViews()
        {
            listView= (ListView) findViewById(R.id.listview);
            nextBtn = (Button) findViewById(R.id.nextBtn);
            prevBtn = (Button) findViewById(R.id.prevBtn);
        }
```

##### 6\. Set adapter to the ListView.

```java
       /*
        - Bind data to ListView.
         */
        private void bindData(int page) {
            adapter=new CustomAdapter(this,p.getCurrentGalaxys(page));
            listView.setAdapter(adapter);
        }
```

##### 7.Toggle Next/Previous Buttons' states.

Enable or disable next/previous buttons according to current page:

```java
       /*
        - Toggle button states
         */
        private void toggleButtons() {
            //SINGLE PAGE DATA
            if (totalPages <= 1) {
                nextBtn.setEnabled(false);
                prevBtn.setEnabled(false);
            }
            //LAST PAGE
            else if (currentPage == totalPages) {
                nextBtn.setEnabled(false);
                prevBtn.setEnabled(true);
            }
            //FIRST PAGE
            else if (currentPage == 0) {
                prevBtn.setEnabled(false);
                nextBtn.setEnabled(true);
            }
            //SOMEWHERE IN BETWEEN
            else if (currentPage >= 1 && currentPage <= totalPages) {
                nextBtn.setEnabled(true);
                prevBtn.setEnabled(true);
            }

        }
```

That's it.

##### Download

You can download the full source code below or watch the video from the link provided.

| No. | Location | Link |
| --- | --- | --- |
| 1. | GitHub | [download id="8185" template="pmpro_button"] |
| 2. | GitHub | [Browse](https://github.com/Oclemy/ListViewPaging) |
| 3. | YouTube | [Video Tutorial](https://www.youtube.com/watch?v=VI1J0nrN6zw) |
| 4. | YouTube | [ProgrammingWizards TV Channel](http://www.youtube.com/c/programmingwizards) |
| 5. | Camposha | [View All ListView Tutorials](https://camposha.info/android/listview) |

## Example 2 - Android Simple GridView - Next/Previous Pagination

_Android Simple GridView pagination. How to apply next/previous type of pagination to a simple GridView._

This tutorial explores how to apply a next/previous type of pagination to a simple GridView The gridview comprises autogenerated data. Please watch the video tutorial below.

How to page through given dataset example.

#### Overview

- We have an arraylist of data
- We'll split into pages
- Then use next/previous pagination to page through the data

#### Paginator class

Now we shall have a simple paginator class as below.It shall be responsible fr paging our data appropriately. It has a simpe method called generatePage() that takes page number and generates the page data.Of course in this case we are simply generating data dynamically at runtime.

```java
package com.tutorials.hp.gridviewpaginator;

import java.util.ArrayList;

public class Paginator {

    public static final int TOTAL_NUM_ITEMS=52;
    public static final int ITEMS_PER_PAGE=10;
    public static final int ITEMS_REMAINING=TOTAL_NUM_ITEMS % ITEMS_PER_PAGE;
    public static final int LAST_PAGE=TOTAL_NUM_ITEMS/ITEMS_PER_PAGE;

    public ArrayList<String> generatePage(int currentPage)
    {
        int startItem=currentPage*ITEMS_PER_PAGE+1;
        int numOfData=ITEMS_PER_PAGE;

        ArrayList<String> pageData=new ArrayList<>();

        if (currentPage==LAST_PAGE && ITEMS_REMAINING>0)
        {
            for (int i=startItem;i<startItem+ITEMS_REMAINING;i++)
            {
                pageData.add("Number "+i);
            }
        }else
        {
            for (int i=startItem;i<startItem+numOfData;i++)
            {
                pageData.add("Number "+i);
            }
        }

        return pageData;
    }
}
```

#### MainActivity

In the MainActivity our job is now simple.Simply to enable and disable the next and previous buttons.Of course we also keep track of the current page position.If we are in the first page we disable the previous button while in the last page we disable the next button.

```java
package com.tutorials.hp.gridviewpaginator;

import android.support.v7.app.AppCompatActivity;
import android.os.Bundle;
import android.view.View;
import android.widget.AdapterView;
import android.widget.ArrayAdapter;
import android.widget.Button;
import android.widget.GridView;
import android.widget.Toast;

public class MainActivity extends AppCompatActivity {

    GridView gv;
    Button nextBtn,prevBtn;
    Paginator p=new Paginator();
    private int totalPages=Paginator.TOTAL_NUM_ITEMS/Paginator.ITEMS_PER_PAGE;
    private int currentPage=0;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);

        gv= (GridView) findViewById(R.id.gv);
        nextBtn= (Button) findViewById(R.id.nextBtn);
        prevBtn= (Button) findViewById(R.id.prevBtn);
        prevBtn.setEnabled(false);

        gv.setOnItemClickListener(new AdapterView.OnItemClickListener() {
            @Override
            public void onItemClick(AdapterView<?> adapterView, View view, int i, long l) {
                Toast.makeText(MainActivity.this, p.generatePage(currentPage).get(i), Toast.LENGTH_SHORT).show();
            }
        });

        gv.setAdapter(new ArrayAdapter<String>(MainActivity.this,android.R.layout.simple_list_item_1,p.generatePage(currentPage)));

        nextBtn.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View view) {

                currentPage+=1;
               // enableDisableButtons();
                gv.setAdapter(new ArrayAdapter<String>(MainActivity.this,android.R.layout.simple_list_item_1,p.generatePage(currentPage)));
                toggleButtons();

            }
        });
        prevBtn.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View view) {
                currentPage-=1;

                gv.setAdapter(new ArrayAdapter<String>(MainActivity.this,android.R.layout.simple_list_item_1,p.generatePage(currentPage)));

                 toggleButtons();
            }
        });

    }

    private void toggleButtons()
    {
        if(currentPage==totalPages)
        {
            nextBtn.setEnabled(false);
            prevBtn.setEnabled(true);
        }else
        if(currentPage==0)
        {
            prevBtn.setEnabled(false);
            nextBtn.setEnabled(true);
        }else
        if(currentPage>=1 && currentPage<=5)
        {
            nextBtn.setEnabled(true);
            prevBtn.setEnabled(true);
        }

    }
}
```

#### Layout

In this case this is going to be our layout.Its this simple.We have a GridView on top pf two buttons,the next and previous buttons.

```xml
 <LinearLayout
        android_orientation="vertical"
        android_layout_width="match_parent"
        android_layout_height="match_parent">
        <GridView
            android_id="@+id/gv"
            android_layout_width="wrap_content"
            android_layout_height="wrap_content"
            android_numColumns="2" />

        <LinearLayout
            android_orientation="horizontal"
            android_layout_width="wrap_content"
            android_layout_height="wrap_content">
            <Button
                android_text="Previous"
                android_id="@+id/prevBtn"
                android_layout_width="wrap_content"
                android_layout_height="wrap_content" />
            <Button
                android_text="Next"
                android_id="@+id/nextBtn"
                android_layout_width="wrap_content"
                android_layout_height="wrap_content" />
        </LinearLayout>

    </LinearLayout>
```

#### Demo

Here's the demo;

![Project Demo](https://camposha.info/demos/source/gridviewpaginator/demo1.gif)

#### Tools Used

This example was written with the following tools:

- Windows 8
- [AndroidStudio](https://camposha.info/android/android-studio) IDE
- Genymotion Emulator
- Language : Java

Lets jump directly to the source code. Source code is well commented.

#### Video Tutorial

We have a [YouTube channel](https://www.youtube.com/c/ProgrammingWizards) with almost a thousand tutorials, [this one](https://youtu.be/EgMeyl3CJm0) below being one of them.

#### Download

You can download the full project here.

| No. | Resource | Direct Links |
| --- | --- | --- |
| 1. | GitHub Source Code | [Browse](https://github.com/Oclemy/GridViewPaginator) |
| 2. | Source Code | [Download](https://github.com/Oclemy/GridViewPaginator/archive/master.zip) |
| 3. | YouTube | [Video Tutorial](https://youtu.be/EgMeyl3CJm0) |
| 4. | Facebook | [Page](https://web.facebook.com/oclemmy/) |
| 5. | YouTube | [Channel](https://www.youtube.com/c/ProgrammingWizards) |

## Example 3 - Android CardView - Next/Previous Pagination

_This example examines how to perform a next/previous pagination in android._

We are going to page/paginate CardViews.

#### 1\. Create Project

1. First create an empty project in android studio. Go to File --> New Project.
2. Type the application name and choose the company name.
3. Choose minimum SDK.
4. Choose Empty activity.
5. Click Finish.

This will generate for us a project with the following:

| No. | Name | Type | Description |
| --- | --- | --- | --- |
| 1. | activity_main.xml | XML Layout | Will get inflated into MainActivity View.You add your views and widgets here. |
| 2. | MainActivity.java | Class | Your Launcher activity |

The activity will automatically be registered in the android_manifest.xml. Android Activities are components and normally need to be registered as an application component. If you've created yours manually then register it inside the `<application>...<application>` as following, replacing the `MainActivity` with your activity name:

```xml
        <activity android:name=".MainActivity">
            <intent-filter>
                <action android:name="android.intent.action.MAIN" />
                <category android:name="android.intent.category.LAUNCHER" />
            </intent-filter>
        </activity>
```

You can see that one action and category are specified as intent filters. The category makes our MainActivity as launcher activity. Launcher activities get executed first when th android app is run.

#### Modify Build.gradle

Add two dependencies in app level build.gradle.

- App level build.gradle.
- We specify dependeniceis here, in this case support libraries appcomat and cardview.
- Our MainActivity will derive from appcompatactivity while we'll be paginating CardViews instances.
    
    ```groovy
    dependencies {
    compile fileTree(dir: 'libs', include: ['*.jar'])
    testCompile 'junit:junit:4.12'
    compile 'com.android.support:appcompat-v7:24.2.0'
    compile 'com.android.support:cardview-v7:24.2.0'
    }
    ```
    

#### 3\. Create Layouts

##### activity_main.xml

- ActivityMain.xml.
- Our MainActivity layout.
- To hold our Cards and next/previous buttons.

```xml
<?xml version="1.0" encoding="utf-8"?>

<RelativeLayout xmlns:android="http://schemas.android.com/apk/res/android"
    xmlns:tools="http://schemas.android.com/tools"
    android:layout_width="match_parent"
    android:layout_height="match_parent"
    android:paddingBottom="@dimen/activity_vertical_margin"
    android:paddingLeft="@dimen/activity_horizontal_margin"
    android:paddingRight="@dimen/activity_horizontal_margin"
    android:paddingTop="@dimen/activity_vertical_margin"
    tools:context="com.tutorials.hp.cardspagination.MainActivity">

    <LinearLayout
        android:orientation="vertical"
        android:layout_height="wrap_content"
        android:layout_width="match_parent"
        >
        <LinearLayout
            android:orientation="vertical"
            android:id="@+id/content"
            android:layout_height="500dp"
            android:layout_width="match_parent"
            ></LinearLayout>

        <LinearLayout
            android:orientation="horizontal"
            android:layout_width="match_parent"
            android:layout_height="wrap_content">
            <Button
                android:id="@+id/prevBtn"
                android:layout_width="wrap_content"
                android:layout_height="wrap_content"
                android:text="Previous" />
            <Button
                android:id="@+id/nextBtn"
                android:layout_width="wrap_content"
                android:layout_height="wrap_content"
                android:text="Next" />

        </LinearLayout>
    </LinearLayout>
</RelativeLayout>
```

#### Java Classes

##### 1\. Card.java

- This class represents our custom CardView.
- It derives android.support.v7.widget.CardView.
- Our CardView shall have an imageview and a textview.
- We programmatically instantiate an imageview and textview and add them to our CardView depending on the page shown.

```java
package com.tutorials.hp.cardspagination;

import android.content.Context;
import android.graphics.Color;
import android.support.v7.widget.CardView;
import android.view.ViewGroup;
import android.widget.ImageView;
import android.widget.TextView;

public class Card extends CardView {

    public static Card newInstance(Context c,int pos)
    {
        //INSTANTIATE CARD
        Card card=new Card(c);
        card.setCardElevation(10);

        //INSTANTIATE TEXTVIEW
        TextView nameTxt=new TextView(c);
        nameTxt.setPadding(5,5,5,5);
        nameTxt.setTextSize(20);

        //INSTANTIATE IMAGEVIEW
        ImageView img=new ImageView(c);
        img.setPadding(5,5,5,5);
        img.setLayoutParams(new ViewGroup.LayoutParams(400,400));

        //SET WIDGETS TO CARDVIEW DEPENDING ON PAGE
        switch (pos)
        {
            case 0 :
                card.setLayoutParams(new ViewGroup.LayoutParams(ViewGroup.LayoutParams.MATCH_PARENT, ViewGroup.LayoutParams.MATCH_PARENT));
                card.setCardBackgroundColor(Color.parseColor("#009968"));
                nameTxt.setText("Card Page "+String.valueOf(pos));
                img.setImageResource(R.drawable.enterprise);
                card.addView(nameTxt);
                card.addView(img);

                break;
            case 1 :
                card.setLayoutParams(new ViewGroup.LayoutParams(ViewGroup.LayoutParams.MATCH_PARENT, ViewGroup.LayoutParams.MATCH_PARENT));
                card.setCardBackgroundColor(Color.parseColor("#0099e5"));
                nameTxt.setText("Card Page "+String.valueOf(pos));
                img.setImageResource(R.drawable.hubble);
                card.addView(nameTxt);
                card.addView(img);
                break;
            case 2 :
                card.setLayoutParams(new ViewGroup.LayoutParams(ViewGroup.LayoutParams.MATCH_PARENT, ViewGroup.LayoutParams.MATCH_PARENT));
                card.setCardBackgroundColor(Color.parseColor("#ee8600"));
                nameTxt.setText("Card Page "+String.valueOf(pos));
                img.setImageResource(R.drawable.kepler);
                card.addView(nameTxt);
                card.addView(img);
                break;
            case 3 :
                card.setLayoutParams(new ViewGroup.LayoutParams(ViewGroup.LayoutParams.MATCH_PARENT, ViewGroup.LayoutParams.MATCH_PARENT));
                card.setCardBackgroundColor(Color.parseColor("#4caf50"));
                nameTxt.setText("Card Page "+String.valueOf(pos));
                img.setImageResource(R.drawable.spitzer);
                card.addView(nameTxt);
                card.addView(img);
                break;
            case 4 :
                card.setLayoutParams(new ViewGroup.LayoutParams(ViewGroup.LayoutParams.MATCH_PARENT, ViewGroup.LayoutParams.MATCH_PARENT));
                card.setCardBackgroundColor(Color.parseColor("#03a9f4"));
                nameTxt.setText("Card Page "+String.valueOf(pos));
                img.setImageResource(R.drawable.voyager);
                card.addView(nameTxt);
                card.addView(img);
                break;
            default:
                card.setLayoutParams(new ViewGroup.LayoutParams(ViewGroup.LayoutParams.MATCH_PARENT, ViewGroup.LayoutParams.MATCH_PARENT));
                card.setCardBackgroundColor(Color.parseColor("#009968"));
                nameTxt.setText("Card Page "+String.valueOf(pos));
                img.setImageResource(R.drawable.enterprise);
                card.addView(nameTxt);
                card.addView(img);
        }

        return card;
    }

    public Card(Context context) {
        super(context);
    }
}
```

##### 2\. MainActivity.java

- Our MainActivity.
- It derives from AppCompatActivity.
- Inflated from activity_main.xml.
- Methods: onCreate()
- First we create our 5 Card instances here.
- We handle next/previous pagination of our CardViews here.

```java
package com.tutorials.hp.cardspagination;

import android.os.Bundle;
import android.support.v7.app.AppCompatActivity;
import android.view.View;
import android.widget.Button;
import android.widget.LinearLayout;
import java.util.ArrayList;

public class MainActivity extends AppCompatActivity {

    //DECLARATIONS.
    ArrayList<Card> cards=new ArrayList<>();
    Button prevBtn,nextBtn;
    LinearLayout layout;
    int i=0;

    //WHEN ACTIVITY IS CREATED.
    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);

        //INITIALIZE VIEWS
        layout= (LinearLayout) findViewById(R.id.content);
        prevBtn= (Button) findViewById(R.id.prevBtn);
        nextBtn= (Button) findViewById(R.id.nextBtn);
        prevBtn.setEnabled(false);

        //CREATE 5 CARDS
        for(int i=0;i<5;i++)
        {
            cards.add(Card.newInstance(this,i));
        }

        //ADD FIRST CARD TO OUR LAYOUT
        layout.addView(Card.newInstance(this,i));

        //NAVIGATE TO NEXT CARD
        nextBtn.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View view) {
                if(i<cards.size())
                {
                    i+=1;
                    layout.removeAllViews();
                    layout.addView(Card.newInstance(MainActivity.this,i));

                    //TOGGLE NEXT/PREVIOUS BUTTONS
                    if(i==cards.size())
                    {
                        nextBtn.setEnabled(false);
                        prevBtn.setEnabled(true);

                    }else
                    {
                        nextBtn.setEnabled(true);
                        prevBtn.setEnabled(true);

                    }
                }

            }
        });
        //NAVIGATE TO PREVIOUS CARD
        prevBtn.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View view) {
                if(i>0)
                {
                    i-=1;
                    layout.removeAllViews();
                    layout.addView(Card.newInstance(MainActivity.this,i));

                    //TOGGLE NEXT/PREVIOUS BUTTONS
                    if(i==0)
                    {
                        prevBtn.setEnabled(false);
                        nextBtn.setEnabled(true);

                    }else
                    {
                        prevBtn.setEnabled(true);
                        nextBtn.setEnabled(true);

                    }
                }
            }
        });
    }
}
```

## Example 4 - Android GridView Pagination - Next/Previous

Paging data is an important operation in software applications. It's importance is magnified even more with mobile devices. These devices normally have a smaller screen area. Thus users can only see a small amount of data per given viewport.

So we really need a way of paging data so as to give users the opportunity to view and work with even more data. There are various types of pagination that can be applied to mobile apps:

- Next/Previous Pagination
- Numbered Pagination.
- Infinite/Endless Pagination.

In this class I use the Next/Previous pagination. We'll have two buttons: next and previous. The user clicks the next button to navigate to the next page. And previous button to navigate to a previous page.

If we reach the last page the next button gets disabled automatically. Likewise if we are in the first page the previous button gets disabled.

## **Componets we use**

Here are some of the main components we use in our simple app:

### **1\. GridView**

GridView are columned lists. You use them to display data in grids. You can define the number of columns in the xml markup.

Like all views gridviews are declared first in the xml markup and then referenced from the java code.

GridView itself is a public class defined in `android.widget` package.

GridView derives from `android.widget.AbsListView`.

There are three ways of using a gridview:

1. Define its xml markup
2. Reference the gridview in java code.
3. Set an adapter to it.

### **2\. Buttons**

Buttons are components we are all familiar with. Since the inception of the moder computer with graphical user interfaces, buttons are some of the most used UI widgets in any program.

The magic of a button relies on its ability to listen to click events.

Our example will employ two buttons : next and previous. These, we use for page navigation.

Buttons do derive from `android.widget.TextView`.

### **3\. CardViews**

To render our items in the GridView in a modern way, we'll use CardViews. CardViews are framelayouts that have rounded corners and shadows. We can also set their elevation properties as well as other properties.

So our GridView will comprise of multiple cardviews. Each card will hold an image and text. Each cardview will represent a single `Galaxy` object for us.

CardView are defined inside the `android.support.v7.widget` package. They derive from `android.widget.FrameLayout`.

We'll define our cardviews inside an xml layout.

## **Page Structure**

Here's the project structure for our app.

## **1\. Let's create our project.**

Go to File -- New Project

Specify project name and sdk version.

Choose the empty activity in your android studio templates.

## **2\. Let's modify our build.gradle file.**

We are modifying our build.gradle(app) file. We want to add some dependencies including a cardview dependency.

Add the following dependencies inside you dependencies closure in your build.gradle(Module:app) file. Note that you may change the versions according to SDK version.

```
    compile 'com.android.support:appcompat-v7:26.+'
    compile 'com.android.support.constraint:constraint-layout:1.0.0-alpha7'
    compile 'com.android.support:cardview-v7:26.+'
```

## **3\. Let's prepare our resources.**

Well resources in two forms:

1. Drawables - add some images in your drawable folder. remember our gridview will display images and text.
2. Layouts - We'll have two layoust : `activity_main.xml` and `model.xml`.

The `activity_main.xml` is the layout definition of our activity. It will hold our gridview and two buttons below it in linearlayout.

Here's how we defined it:

```xml
    <?xml version="1.0" encoding="utf-8"?>
    <android.support.constraint.ConstraintLayout

        android_layout_width="match_parent"
        android_layout_height="match_parent"
        tools_context="com.tutorials.hp.gridviewpaging.MainActivity">

        <LinearLayout
            android_layout_width="368dp"
            android_layout_height="495dp"
            android_orientation="vertical"
            tools_layout_editor_absoluteY="8dp"
            tools_layout_editor_absoluteX="8dp">

            <GridView
                android_id="@+id/gridView"
                android_layout_width="match_parent"
                android_layout_height="wrap_content"
                android_numColumns="auto_fit" />

            <LinearLayout
                android_layout_width="match_parent"
                android_layout_height="100dp"
                android_layout_weight="2"
                android_orientation="horizontal">

                <Button
                    android_id="@+id/prevBtn"
                    android_layout_width="wrap_content"
                    android_layout_height="wrap_content"
                    android_background="@color/colorAccent"
                    android_padding="10dp"
                    android_text="Previous" />

                <Button
                    android_id="@+id/nextBtn"
                    android_layout_width="wrap_content"
                    android_layout_height="wrap_content"
                    android_background="#009968"
                    android_padding="10dp"
                    android_text="Next" />

            </LinearLayout>
        </LinearLayout>

    </android.support.constraint.ConstraintLayout>
```

Then the `model.xml` is a custom grid definition for our gridview. We wanted our gridview to render images and text. Thus we need to show it how using the XML markup language.

And in this case our gridview grids will be based on CardViews.

Here's its full definition:

```xml
    <?xml version="1.0" encoding="utf-8"?>
    <android.support.v7.widget.CardView
        android_orientation="horizontal" android_layout_width="match_parent"

        android_layout_margin="5dp"
        card_view_cardCornerRadius="15dp"
        card_view_cardElevation="10dp"
        android_layout_height="200dp">

        <LinearLayout
             android_orientation="vertical"
            android_layout_width="match_parent"
            android_layout_height="match_parent">

            <TextView
                android_layout_width="wrap_content"
                android_layout_height="wrap_content"
                android_textAppearance="?android:attr/textAppearanceLarge"
                android_text="Galaxy"
                android_id="@+id/nameTxt"
                android_padding="10dp"
                android_textColor="@color/abc_btn_colored_borderless_text_material"
                android_layout_alignParentTop="true"/>
            <LinearLayout
                android_orientation="horizontal"
                android_layout_width="match_parent"
                android_layout_height="wrap_content">
                <ImageView
                    android_id="@+id/galaxyImageview"
                    android_layout_width="wrap_content"
                    android_layout_height="wrap_content"
                    android_layout_alignParentLeft="true"
                    android_layout_alignParentTop="true"
                    android_layout_marginLeft="24dp"
                    android_src="@drawable/andromeda" />
                <TextView
                    android_layout_width="wrap_content"
                    android_layout_height="wrap_content"
                    android_textAppearance="?android:attr/textAppearanceLarge"
                    android_text="Description"
                    android_id="@+id/descTxt"
                    android_padding="10dp"/>
                <TextView
                    android_layout_width="wrap_content"
                    android_layout_height="wrap_content"
                    android_text="Category"
                    android_id="@+id/categoryTxt"
                    android_textStyle="italic"
                    android_layout_gravity="bottom"
                    android_padding="5dp"/>
            </LinearLayout>

        </LinearLayout>
    </android.support.v7.widget.CardView>
```

So those two are the layouts we work with.

## **4\. Let's create our data object.**

This is a POJO class. That is the custom business objects we are working with. Like in this case we are working with `Galaxy` objects. This app will display galaxies in a paginated gridview.

First create the class. It needs to be public as it will be used by other classes.

```java
    public class Galaxy {}
```

Secondly we define its instance fields:

```java
        private String name,description,category;
        private int image;
```

These are what make up the state of the Galaxy. It's data. So we can have several Galaxies with different `names`,`descriptions` and `images`. Hence different states.

Thirdly we create constructor and getter methods. Here's our constructor. A constructor is a special method that gets called everyttime a class is instantiated.

```java
        public Galaxy(String name, String description, int image,String category) {
            this.name = name;
            this.description = description;
            this.image = image;
            this.category=category;
        }
```

Here are the getter methods. These expose our data to other classes. They can get the name, description,category and image.

```java
        public String getName() {
            return name;
        }
        public String getDescription() {
            return description;
        }
        public int getImage() {
            return image;
        }
        public String getCategory() {
            return category;
        }
```

So that's it.

## **5\. Let's create our DataHolder class.**

A class to hold for us the data. This class acts as some sort of database. We just hold data in memory. A basic class that just returns an arraylist of galaxies.

First create the class

```java
    public class DataHolder {}
```

Secondly add the following imports on top of the class definition.

```java
    import java.util.ArrayList;
    import java.util.List;
```

Thirdly we create a static method to return an arraylist of galaxies. Remember we need some data to page. One option may be to get or obtain the data from external sources such as:

- Firebase
- SQlite
- MySQL
- Realm
- File System

Then page that data. Well here's what you can do. Obtain data from those sources then populate this arraylist. Then we will just page that data irrespective of the source. So you can easily use this tutorial to page data from firebase,mysql, sqlite or any other external database.

```java
     public static List<Galaxy> getGalaxies()
        {
            ArrayList<Galaxy> galaxies=new ArrayList<>();

            Galaxy g=new Galaxy("Whirlpool",
                    "The Whirlpool Galaxy, also known as Messier 51a, M51a, and NGC 5194, is an interacting grand-design spiral Galaxy with a Seyfert 2 active galactic nucleus in the constellation Canes Venatici.",
                    R.drawable.whirlpool,"spiral");
            galaxies.add(g);

            g=new Galaxy("Ring Nebular",
                    "The Ring Nebula is a planetary nebula in the northern constellation of Lyra. Such objects are formed when a shell of ionized gas is expelled into the surrounding interstellar medium by a red giant star.",
                    R.drawable.ringnebular,"elliptical");
            galaxies.add(g);

            g=new Galaxy("IC 1011",
                    "C 1011 is a compact elliptical galaxy with apparent magnitude of 14.7, and with a redshift of z=0.02564 or 0.025703, yielding a distance of 100 to 120 Megaparsecs. Its light has taken 349.5 million years to travel to Earth.",
                    R.drawable.ic1011,"elliptical");
            galaxies.add(g);

            g=new Galaxy("Cartwheel",
                    "The Cartwheel Galaxy is a lenticular galaxy and ring galaxy about 500 million light-years away in the constellation Sculptor. It is an estimated 150,000 light-years diameter, and a mass of about 2.9–4.8 × 10⁹ solar masses; it rotates at 217 km/s.",
                    R.drawable.cartwheel,"irregular");
            galaxies.add(g);

            g=new Galaxy("Triangulumn",
                    "The Triangulum Galaxy is a spiral Galaxy approximately 3 million light-years from Earth in the constellation Triangulum",
                    R.drawable.triangulum,"spiral");
            galaxies.add(g);

            g=new Galaxy("Small Magellonic Cloud",
                    "The Small Magellanic Cloud, or Nubecula Minor, is a dwarf galaxy near the Milky Way. It is classified as a dwarf irregular galaxy.",
                    R.drawable.smallamgellonic,"irregular");
            galaxies.add(g);

            g=new Galaxy("Centaurus A",
                    " Centaurus A or NGC 5128 is a galaxy in the constellation of Centaurus. It was discovered in 1826 by Scottish astronomer James Dunlop from his home in Parramatta, in New South Wales, Australia.",
                    R.drawable.centaurusa,"elliptical");
            galaxies.add(g);

            g=new Galaxy("Ursa Minor",
                    "The Milky Way is the Galaxy that contains our Solar System." +
                            " The descriptive milky is derived from the appearance from Earth of the Galaxy – a band of light seen in the night sky formed from stars",
                    R.drawable.ursaminor,"irregular");
            galaxies.add(g);

            g=new Galaxy("Large Magellonic Cloud",
                    " The Large Magellanic Cloud is a satellite galaxy of the Milky Way. At a distance of 50 kiloparsecs, the LMC is the third-closest galaxy to the Milky Way, after the Sagittarius Dwarf Spheroidal and the.",
                    R.drawable.largemagellonic,"irregular");
            galaxies.add(g);

            g=new Galaxy("Milky Way",
                    "The Milky Way is the Galaxy that contains our Solar System." +
                            " The descriptive milky is derived from the appearance from Earth of the Galaxy – a band of light seen in the night sky formed from stars",
                    R.drawable.milkyway,"spiral");
            galaxies.add(g);

            g=new Galaxy("Andromeda",
                    "The Andromeda Galaxy, also known as Messier 31, M31, or NGC 224, is a spiral Galaxy approximately 780 kiloparsecs from Earth. It is the nearest major Galaxy to the Milky Way and was often referred to as the Great Andromeda Nebula in older texts.",
                    R.drawable.andromeda,"irregular");
            galaxies.add(g);

            g=new Galaxy("Messier 81",
                    "Messier 81 is a spiral Galaxy about 12 million light-years away in the constellation Ursa Major. Due to its proximity to Earth, large size and active galactic nucleus, Messier 81 has been studied extensively by professional astronomers.",
                    R.drawable.messier81,"elliptical");
            galaxies.add(g);

            g=new Galaxy("Own Nebular",
                    " The Owl Nebula is a planetary nebula located approximately 2,030 light years away in the constellation Ursa Major. It was discovered by French astronomer Pierre Méchain on February 16, 1781",
                    R.drawable.ownnebular,"elliptical");
            galaxies.add(g);

            g=new Galaxy("Messier 87",
                    "Messier 87 is a supergiant elliptical galaxy in the constellation Virgo. One of the most massive galaxies in the local universe, it is notable for its large population of globular clusters—M87 contains",
                    R.drawable.messier87,"elliptical");
            galaxies.add(g);

            g=new Galaxy("Cosmos Redshift",
                    "Cosmos Redshift 7 is a high-redshift Lyman-alpha emitter Galaxy, in the constellation Sextans, about 12.9 billion light travel distance years from Earth, reported to contain the first stars —formed ",
                    R.drawable.cosmosredshift,"irregular");
            galaxies.add(g);

            g=new Galaxy("StarBust",
                    "A starburst Galaxy is a Galaxy undergoing an exceptionally high rate of star formation, as compared to the long-term average rate of star formation in the Galaxy or the star formation rate observed in most other galaxies. ",
                    R.drawable.starbust,"irregular");
            galaxies.add(g);

            g=new Galaxy("Sombrero",
                    "Sombrero Galaxy is an unbarred spiral galaxy in the constellation Virgo located 31 million light-years from Earth. The galaxy has a diameter of approximately 50,000 light-years, 30% the size of the Milky Way.",
                    R.drawable.sombrero,"spiral");
            galaxies.add(g);

            g=new Galaxy("Pinwheel",
                    "The Pinwheel Galaxy is a face-on spiral galaxy distanced 21 million light-years away from earth in the constellation Ursa Major. ",
                    R.drawable.pinwheel,"spiral");
            galaxies.add(g);

            g=new Galaxy("Canis Majos Overdensity",
                    "The Canis Major Dwarf Galaxy or Canis Major Overdensity is a disputed dwarf irregular galaxy in the Local Group, located in the same part of the sky as the constellation Canis Major. ",
                    R.drawable.canismajoroverdensity,"irregular");
            galaxies.add(g);

            g=new Galaxy("Virgo Stella Stream",
                    " Group, located in the same part of the sky as the constellation Canis Major. ",
                    R.drawable.virgostellarstream,"spiral");
            galaxies.add(g);

            return galaxies;
        }
```

Ok. Let's proceed.

## **6\. Let's create our custom adapter.**

Adapter classes normally adapt data to adapterview. In this case our adapterview is a _gridview_. And our adapter is a class we are creating called`CustomAdapter`.

To make it an adapter we derive from `android.widget.BaseAdapter`.

So first, create the class:

```java
    public class CustomAdapter{}
```

Secondly add these imports above the class:

```java
    import android.content.Context;
    import android.view.LayoutInflater;
    import android.view.View;
    import android.view.ViewGroup;
    import android.widget.BaseAdapter;
    import android.widget.ImageView;
    import android.widget.TextView;
    import java.util.ArrayList;
```

Thirdly make the class derive from `BaseAdapter`

```java
    public class CustomAdapter extends BaseAdapter {}
```

The moment we do the above it will ask us to override a couple of methods. Well before that let's add some instance fields:

```java
        Context c;
        ArrayList<Galaxy> galaxies;
```

Then we define our constructor to take an arraylist as well as context object:

```java
        public CustomAdapter(Context c, ArrayList<Galaxy> galaxies) {
            this.c = c;
            this.galaxies = galaxies;
        }
```

Then override the methods as follows:

```java
     @Override
        public int getCount() {
            return galaxies.size();
        }

        @Override
        public Object getItem(int i) {
            return galaxies.get(i);
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
            //reference widgets
            TextView nameTxt=view.findViewById(R.id.nameTxt);
            TextView descTxt=view.findViewById(R.id.descTxt);
            TextView categoryTxt=view.findViewById(R.id.categoryTxt);
            ImageView galaxyImg=view.findViewById(R.id.galaxyImageview);

            //bind data to widgets
            Galaxy g= (Galaxy) getItem(i);
            nameTxt.setText(g.getName());
            descTxt.setText(g.getDescription());
            categoryTxt.setText(g.getCategory());
            galaxyImg.setImageResource(g.getImage());

            return view;
        }
```

Clearly you can guess the actions of the methods from just their names:

1. `getCount()` - returns the total number of items to be rendered in the gridview per viewport.
2. `getItem()` - returns a single item object.
3. `getItemId()` - returns the item's id.
4. `getView()` - returns an inflated view. The view gets inflated from the xml model specification.

So yah that's it.

## **7\. Let's create our Paginator class.**

The class responsible for paging/paginating data. A very simple class that will work with the others to give us paginated data.

The workings of this class are rather simple.

We first create the class then add one import:

```java
    import java.util.ArrayList;
    public class Paginator {}
```

Secondly Define two constants inside the class:

```java
     public static final int TOTAL_NUM_ITEMS = DataHolder.getGalaxies().size();
     public static final int ITEMS_PER_PAGE = 6;
```

These will specify us explicitly the overall total number of items to be worked with and items per page.

Thirdly, we use the above constants to calculate the total number of our pages:

```java
        public int getTotalPages() {
            int remainingItems=TOTAL_NUM_ITEMS % ITEMS_PER_PAGE;
            if(remainingItems>0)
            {
                return TOTAL_NUM_ITEMS / ITEMS_PER_PAGE;
            }
            return (TOTAL_NUM_ITEMS / ITEMS_PER_PAGE)-1;

        }
```

Then lastly in this paginator class, we create a method to return us the items we want to show in the current page.

Well how do we know whether we are in page 1 or page 2? Well an integer representing the current page gets passed us from the mainactivity class.

```java
        public ArrayList<Galaxy> getCurrentGalaxys(int currentPage) {
            int startItem = currentPage * ITEMS_PER_PAGE;
            int lastItem = startItem + ITEMS_PER_PAGE;

            ArrayList<Galaxy> currentGalaxys = new ArrayList<>();

            //LOOP THRU LIST OF GALAXIES AND FILL CURRENTGALAXIES LIST
            try {
                for (int i = 0; i < DataHolder.getGalaxies().size(); i++) {

                    //ADD CURRENT PAGE'S DATA
                    if (i >= startItem && i < lastItem) {
                        currentGalaxys.add(DataHolder.getGalaxies().get(i));
                    }
                }
                return currentGalaxys;
            } catch (Exception e) {
                e.printStackTrace();
                return null;
            }
        }
```

Then our last class.

## **8\. Let's move to the MainActivity.java**

Our MainActivity. Activities represent a User interface screen and the data to work with on that screen.

Activities are a fundamental component in android. Other components comprise: BroadcastReceiver, Service and ContentProvider.

You become an activity by deriving from `android.app.Activity`. Or it's support variations like `AppCompatActivity`.

So let's create our activity and add imports:

```java
    import android.support.v7.app.AppCompatActivity;
    import android.os.Bundle;
    import android.view.View;
    import android.widget.Button;
    import android.widget.GridView;

    public class MainActivity extends AppCompatActivity {}
```

Then we add these instance fields:

```java
        GridView gridView;
        Button nextBtn, prevBtn;
        Paginator p = new Paginator();
        private int totalPages =p.getTotalPages();
        private int currentPage = 0;
        CustomAdapter adapter;
```

Then we reate a method to initialize our two widgets: gridview and buttons.

```java
       private void initializeViews()
        {
            gridView= (GridView) findViewById(R.id.gridView);
            nextBtn = (Button) findViewById(R.id.nextBtn);
            prevBtn = (Button) findViewById(R.id.prevBtn);
        }
```

Then a method to bind data to our gridview via our customadapter.

```java
        private void bindData(int page) {
            adapter=new CustomAdapter(this,p.getCurrentGalaxys(page));
            gridView.setAdapter(adapter);
        }
```

With pagination we need to maintain button states. When a button comes enabled or not. So we create a method called `toggleButtons()` to do so.

\\`\`language

```java
        private void toggleButtons() {
            //SINGLE PAGE DATA
            if (totalPages <= 1) {
                nextBtn.setEnabled(false);
                prevBtn.setEnabled(false);
            }
            //LAST PAGE
            else if (currentPage == totalPages) {
                nextBtn.setEnabled(false);
                prevBtn.setEnabled(true);
            }
            //FIRST PAGE
            else if (currentPage == 0) {
                prevBtn.setEnabled(false);
                nextBtn.setEnabled(true);
            }
            //SOMEWHERE IN BETWEEN
            else if (currentPage >= 1 && currentPage <= totalPages) {
                nextBtn.setEnabled(true);
                prevBtn.setEnabled(true);
            }
        }
```

Lastly we come and override our `onCreate()` method.

```java

        protected void onCreate(Bundle savedInstanceState) {
            super.onCreate(savedInstanceState);
            setContentView(R.layout.activity_main);

            this.initializeViews();
            this.bindData(currentPage);
            prevBtn.setEnabled(false);

            //NAVIGATE
            nextBtn.setOnClickListener(new View.OnClickListener() {
                @Override
                public void onClick(View view) {
                    currentPage += 1;
                    bindData(currentPage);
                    toggleButtons();
                }
            });
            prevBtn.setOnClickListener(new View.OnClickListener() {
                @Override
                public void onClick(View view) {
                    currentPage -= 1;
                    bindData(currentPage);
                    toggleButtons();
                }
            });
        }
```

So that's it. Pagination in gridview android.
