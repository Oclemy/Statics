# RecyclerView with RadioButton or CheckBox - Examples


In this tutorial we will look at creating and using a custom recyclerview with checkboxes or radiobuttons and how to handle their states.



### Concepts you will Learn

This tutorial, via examples, aims to help you learn the following:

1. How to create recyclerview with checkboxes or radiobuttons and appropriately handle their states.
2. How to render data from mysql database, including boolean data, in a recyclerview with checkboxes.
3. How to search/filter recyclerview with checkboxes while maintainning their checked/unchecked states.

### Demos

Here are the some of the demos that will be created:

**CheckBox Demo**

![Kotlin RecyclerView CheckBox Example](https://camposha.info/android-examples/wp-content/uploads/sites/9/2021/05/demo1-1.png)

**RadioButton Demo**

![Android RecyclerView RadioButton Example](https://camposha.info/android-examples/wp-content/uploads/sites/9/2021/05/demo1.png)

## Example 1: Android RecyclerView CheckBoxes – Maintain Checked States

This is an android recyclerview checkboxes tutorial. We want to see how to first render checkboxes, images and text in a custom recyclerview with cardviews. Then get the selected or checked cardviews and show n a Toast message. We work with multiple checkboxes so we can multi-select or single-select items in our RecyclerView.

This will teach us how to properly retain checked states of our checkboxes in our recyclerview despite the recycling of our cardviews with checkboxes.

Then the user can click a floating action button to get the selected items and show in a Toast message.

#### We are Building a Vibrant YouTube Community

Here's this tutorial in Video Format.

<iframe width="788" height="443" src="https://www.youtube.com/embed/nzOQb05vITg" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>

### Step 1: Dependencies

We do not need any special dependency for this project. All we use are the standard androidx dependencies like recyclerview and cardview.

### Step 2: Create Main Activity Layout

#### activity_main.xml

This will be our main activity layout and we write in XML. XML is a markup language that is not only used to create user interfaces but also exchnage data.In this case we use to create our android user interface.

This layout will be inflated into our main activity. At the root we will have a RelativeLayout.

We have a TextView which is our headerTextView to display the heading our android application.

Then we have a RecyclerView which in this case is our adapterview. This RecyclerView will render images, text and checkboxes.

Below the RecyclerView we will have a FloatingActionButton. When users click this FAB button, we will show the items that have been selected in the recyclerview. Remember our recyclerview will be comprising cardviews that have images, text and checkboxes.

```xml
<?xml version="1.0" encoding="utf-8"?>
<RelativeLayout

    android_layout_width="match_parent"
    android_layout_height="match_parent"
    tools_context="info.camposha.checkablerecyclerviews.MainActivity">

    <TextView
        android_id="@+id/headerTextView"
        android_layout_width="match_parent"
        android_layout_height="wrap_content"
        android_text="Spiritual Teachers"
        android_textAlignment="center"
        android_textAppearance="@style/TextAppearance.AppCompat.Large"
        android_textColor="@color/colorAccent" />

    <androidx.recyclerview.widget.RecyclerView
        android_id="@+id/myRecycler"
        android_layout_width="match_parent"
        android_layout_height="wrap_content"
        android_layout_alignParentLeft="true"
        android_layout_alignParentStart="true"
        android_layout_below="@+id/headerTextView"
        android_layout_marginTop="30dp" />

    <android.support.design.widget.FloatingActionButton
        android_id="@+id/fab"
        android_layout_width="wrap_content"
        android_layout_height="wrap_content"
        android_layout_alignParentBottom="true"
        android_layout_alignParentEnd="true"
        android_layout_alignParentRight="true"
        android_layout_gravity="bottom|end"
        android_src="@android:drawable/ic_dialog_email" />

</RelativeLayout>
```

### Step 3: Create a RecyclerView Item

#### model.xml

This layout will model a single cardview to be rendered among other cards in our recyclerview.

This layout will model all these cardviews. At the root we have the CardView as our element. CardView resides in the `android.support.v7.widget` namespace.

I have set the Card elevation to `5dp` and card cornder radius to `10dp`.

Inside it I have a RelativeLayout to organize my widgets relative to each other.

First we have the ImageView to render our Image. Then TextViews to render our texts.

To the far right of our CardView we will have a CheckBox that will hold the selection property of each cardview. The CheckBoxes can be checked or unchecked.

```xml
<?xml version="1.0" encoding="utf-8"?>
<androidx.cardview.widget.CardView
    android_orientation="horizontal" android_layout_width="match_parent"

    android_layout_margin="5dp"
    card_view_cardCornerRadius="10dp"
    card_view_cardElevation="5dp"
    android_layout_height="match_parent">

    <RelativeLayout
        android_layout_width="match_parent"
        android_layout_height="match_parent">
        <ImageView
            android_layout_width="150dp"
            android_layout_height="150dp"
            android_id="@+id/teacherImageView"
            android_padding="5dp"
            android_src="@drawable/cle" />

        <TextView
            android_layout_width="wrap_content"
            android_layout_height="wrap_content"
            android_textAppearance="?android:attr/textAppearanceLarge"
            android_text="Teacher Name"
            android_id="@+id/nameTextView"
            android_padding="5dp"
            android_textColor="@color/colorAccent"
            android_layout_alignParentTop="true"
            android_layout_toRightOf="@+id/teacherImageView" />

        <TextView
            android_layout_width="wrap_content"
            android_layout_height="wrap_content"
            android_textAppearance="?android:attr/textAppearanceMedium"
            android_text="Teacher Description..."
            android_id="@+id/descritionTextView"
            android_padding="5dp"
            android_layout_alignBottom="@+id/teacherImageView"
            android_layout_toRightOf="@+id/teacherImageView" />

        <CheckBox
            android_layout_width="wrap_content"
            android_layout_height="wrap_content"
            android_id="@+id/myCheckBox"
            android_layout_alignParentRight="true"
            />

    </RelativeLayout>
</androidx.cardview.widget.CardView>
```

### Step 4: MainActivity.java

#### Specify Package and add Imports

Our java class will reside in a package, so we specify one and add the appropriate imports.

These include our RecyclerView from the `android.support.v7.widget` package and CheckBox from `android.widget` package.

```java
package info.camposha.checkablerecyclerviews;

import android.content.Context;
import android.support.design.widget.FloatingActionButton;
import androidx.appcompat.app.AppCompatActivity;
import android.os.Bundle;
import android.support.v7.widget.DefaultItemAnimator;
import android.support.v7.widget.LinearLayoutManager;
import androidx.recyclerview.widget.RecyclerView;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.CheckBox;
import android.widget.ImageView;
import android.widget.TextView;
import android.widget.Toast;

import java.util.ArrayList;
```

##### Create Activity

An activity is an android component that representing a user interface.

To turn our ordinary class into an activity, we will make it derive from `AppCompatActivity`:

```java
public class MainActivity extends AppCompatActivity {..}
```

##### Create our POJO

Then we will create a POJO class, Plain OLd Java Object. This will represents a single Teacher object.

Each SpiritualTecaher will have several properties. Each object will be rendered in it's own CardView in our RecyclerView.

```java
    public class SpiritualTeacher {
        //our properties.
    }
```

One of those properties will be the `isSelected` property, a boolean value that will hold for us the checked state of our CardView.

##### Create our View Holder

We will create our RecyclerView ViewHolder class by deriving from the `RecyclerView.ViewHolder` class.

Also the class will be implementing the `View.OnClickListener` interface. This will allow us to capture click events of our each CardView.

```java
    static class MyHolder extends RecyclerView.ViewHolder implements View.OnClickListener{...}
```

##### Create RecyclerView Adapter

Then we come create our RecyclerView.Adapter class, the class that will be our adapter class.

```java
    static class MyAdapter extends RecyclerView.Adapter<MyAdapter.MyHolder> {..}
```

As an adapter class this class has two primary roles:

1. Inflate our Custom Model Layout into a View Object.
2. Bind data set to o our inflate views.

The data to be bound will be coming from a custom array, in this case an array of SpiritualTeachers:

```java
        public MyAdapter(Context c, SpiritualTeacher[] teachers) {
            this.c = c;
            this.teachers = teachers;
        }
```

This class will also maintain an arraylist that will hold our checkeed items.

```java
        ArrayList<SpiritualTeacher> checkedTeachers=new ArrayList<>();
```

Users will check the recyclerview items and we hold those checked items in this arraylist. Then later on we can display these checked items in a Toast message.

##### Inflate Layout into View

This will take place in our RecyclerView adapter, as we agreed. We need a `LayoutInflater` class to do this.

```java
        @Override
        public MyHolder onCreateViewHolder(ViewGroup parent, int viewType) {
            View v= LayoutInflater.from(parent.getContext()).inflate(R.layout.model,null);
            MyHolder holder=new MyHolder(v);
            return holder;
        }
```

Then as you can see we've passed the inflate view object into our RecyclerView ViewHolder constructor. Then returned the `View Holder` instance.

##### Binding Data

We bind data inside the `onBindViewHolder` method:

```java
        @Override
        public void onBindViewHolder(MyHolder holder, int position) {
            final SpiritualTeacher teacher=teachers[position];
            holder.nameTxt.setText(teacher.getName());
            holder.posTxt.setText(teacher.getQuote());
            holder.myCheckBox.setChecked(teacher.isSelected());
            holder.img.setImageResource(teacher.getImage());
            ...
        }
```

First we've received the position of the item in our recyclerview and used it to get the current teacher from our array.

Then set TextView, imageView and CheckBox widgets with values from that object.

##### Maintain Checked and UnChecked Items

We then listen to click events of our CardView. Obviously clicking the CheckBox will change the state of that checkbox.

We check for these changes. If the checkbox is clicked, we will add the item in our arraylist.

If it's unchecked we remove the item from the arraylist.

```java
            holder.setItemClickListener(new MyHolder.ItemClickListener() {
                @Override
                public void onItemClick(View v, int pos) {
                    CheckBox myCheckBox= (CheckBox) v;
                    SpiritualTeacher currentTeacher=teachers[pos];

                    if(myCheckBox.isChecked()) {
                        currentTeacher.setSelected(true);
                        checkedTeachers.add(currentTeacher);
                    }
                    else if(!myCheckBox.isChecked()) {
                        currentTeacher.setSelected(false);
                        checkedTeachers.remove(currentTeacher);
                    }
                }
            });
```

Let's look at the full source code.

#### Full Code

Here's the full MainActivity code.

```java
package info.camposha.checkablerecyclerviews;

import android.content.Context;
import android.support.design.widget.FloatingActionButton;
import androidx.appcompat.app.AppCompatActivity;
import android.os.Bundle;
import android.support.v7.widget.DefaultItemAnimator;
import android.support.v7.widget.LinearLayoutManager;
import androidx.recyclerview.widget.RecyclerView;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.CheckBox;
import android.widget.ImageView;
import android.widget.TextView;
import android.widget.Toast;

import java.util.ArrayList;

public class MainActivity extends AppCompatActivity {

    public class SpiritualTeacher {
        private String name,quote;
        private int image;
        private boolean isSelected;

        public SpiritualTeacher(String name, String quote, int image) {
            this.name = name;
            this.quote = quote;
            this.image = image;
        }
        public String getName() {
            return name;
        }
        public void setName(String name) {
            this.name = name;
        }
        public String getQuote() {
            return quote;
        }
        public int getImage() {
            return image;
        }

        public boolean isSelected() {
            return isSelected;
        }

        public void setSelected(boolean selected) {
            isSelected = selected;
        }
    }
    static class MyHolder extends RecyclerView.ViewHolder implements View.OnClickListener{

            ImageView img;
            TextView nameTxt,posTxt;
            CheckBox myCheckBox;

            ItemClickListener itemClickListener;

            public MyHolder(View itemView) {
                super(itemView);

                nameTxt= itemView.findViewById(R.id.nameTextView);
                posTxt= itemView.findViewById(R.id.descritionTextView);
                img= itemView.findViewById(R.id.teacherImageView);
                myCheckBox= itemView.findViewById(R.id.myCheckBox);

                myCheckBox.setOnClickListener(this);
            }
            public void setItemClickListener(ItemClickListener ic)
            {
                this.itemClickListener=ic;
            }
            @Override
            public void onClick(View v) {
                this.itemClickListener.onItemClick(v,getLayoutPosition());
            }
            interface ItemClickListener {

                void onItemClick(View v,int pos);
            }
        }
    static class MyAdapter extends RecyclerView.Adapter<MyAdapter.MyHolder> {

        Context c;
        SpiritualTeacher[] teachers;
        ArrayList<SpiritualTeacher> checkedTeachers=new ArrayList<>();

        public MyAdapter(Context c, SpiritualTeacher[] teachers) {
            this.c = c;
            this.teachers = teachers;
        }

        //VIEWHOLDER IS INITIALIZED
        @Override
        public MyHolder onCreateViewHolder(ViewGroup parent, int viewType) {
            View v= LayoutInflater.from(parent.getContext()).inflate(R.layout.model,null);
            MyHolder holder=new MyHolder(v);
            return holder;
        }

        //DATA IS BOUND TO VIEWS
        @Override
        public void onBindViewHolder(MyHolder holder, int position) {
            final SpiritualTeacher teacher=teachers[position];
            holder.nameTxt.setText(teacher.getName());
            holder.posTxt.setText(teacher.getQuote());
            holder.myCheckBox.setChecked(teacher.isSelected());
            holder.img.setImageResource(teacher.getImage());

            holder.setItemClickListener(new MyHolder.ItemClickListener() {
                @Override
                public void onItemClick(View v, int pos) {
                    CheckBox myCheckBox= (CheckBox) v;
                    SpiritualTeacher currentTeacher=teachers[pos];

                    if(myCheckBox.isChecked()) {
                        currentTeacher.setSelected(true);
                        checkedTeachers.add(currentTeacher);
                    }
                    else if(!myCheckBox.isChecked()) {
                        currentTeacher.setSelected(false);
                        checkedTeachers.remove(currentTeacher);
                    }
                }
            });
        }

        @Override
        public int getItemCount() {
            return teachers.length;
        }

    }
    private SpiritualTeacher[] getTeachers() {
        SpiritualTeacher[] spiritualTeachers={
                new SpiritualTeacher("Rumi","Out beyond ideas of wrongdoing and rightdoing there is a field.I'll meet you there.",R.drawable.rumi),
                new SpiritualTeacher("Anthony De Mello","Don't Carry Over Experiences from the past",R.drawable.anthony_de_mello),
                new SpiritualTeacher("Eckhart Tolle","Walk as if you are kissing the Earth with your feet.",R.drawable.eckhart_tolle),
                new SpiritualTeacher("Meister Eckhart","Man suffers only because he takes seriously what the gods made for fun.",R.drawable.meister_eckhart),
                new SpiritualTeacher("Mooji","I have lived with several Zen masters -- all of them cats.",R.drawable.mooji),
                new SpiritualTeacher("Confucius","I'm simply saying that there is a way to be sane. I'm saying that you ",R.drawable.confucius),
                new SpiritualTeacher("Francis Lucille","The way out is through the door. Why is it that no one will use this method?",R.drawable.francis_lucille),
                new SpiritualTeacher("Thich Nhat Hanh","t is the power of the mind to be unconquerable.",R.drawable.thich),
                new SpiritualTeacher("Dalai Lama","It's like you took a bottle of ink and you threw it at a wall. Smash! ",R.drawable.dalai_lama),
                new SpiritualTeacher("Jiddu Krishnamurti","A student, filled with emotion and crying, implored, 'Why is there so much suffering?",R.drawable.jiddu_krishnamurti),
                new SpiritualTeacher("Osho","Only the hand that erases can write the true thing.",R.drawable.osho),
                new SpiritualTeacher("Sedata","Many have died; you also will die. The drum of death is being beaten.",R.drawable.sedata),
                new SpiritualTeacher("Allan Watts","Where there are humans, You'll find flies,And Buddhas.",R.drawable.allant_watts),
                new SpiritualTeacher("Leo Gura","Silence is the language of Om. We need silence to be able to reach our Self.",R.drawable.sadhguru),
                new SpiritualTeacher("Rupert Spira","One day in my shoes and a day for me in your shoes, the beauty of travel lies ",R.drawable.rupert_spira),
                new SpiritualTeacher("Sadhguru","Like vanishing dew,a passing apparition or the sudden flashnof lightning",R.drawable.sadhguru)
        };

        return spiritualTeachers;
    }
    StringBuilder sb=null;
    MyAdapter adapter;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);

        adapter=new MyAdapter(this,getTeachers());

        FloatingActionButton fab = (FloatingActionButton) findViewById(R.id.fab);
        fab.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View view) {
                sb=new StringBuilder();

                int i=0;
                do {
                    SpiritualTeacher spiritualTeacher=adapter.checkedTeachers.get(i);
                    sb.append(spiritualTeacher.getName());
                    if(i != adapter.checkedTeachers.size()-1){
                        sb.append("n");
                    }
                    i++;

                }while (i < adapter.checkedTeachers.size());

                if(adapter.checkedTeachers.size()>0)
                {
                    Toast.makeText(MainActivity.this,sb.toString(),Toast.LENGTH_SHORT).show();
                }else
                {
                    Toast.makeText(MainActivity.this,"Please Check An Item First", Toast.LENGTH_SHORT).show();
                }
            }
        });

        //RECYCLER
        RecyclerView rv= (RecyclerView) findViewById(R.id.myRecycler);
        rv.setLayoutManager(new LinearLayoutManager(this));
        rv.setItemAnimator(new DefaultItemAnimator());

        //SET ADAPTER
        rv.setAdapter(adapter);

    }

}
```

## Example 2: SingleChoice RecyclerView – with RadioButtons

_Android SingleChoice RecyclerView Tutorial_

In this tutorial we want to see how to create a single choice recyclerview. That is a recyclerview with radiobuttons. User can select a single item and we open the item's detail activity thus showing it's data.

##### Why SingleChoice RecyclerView?

Well the alternative is multi-choice recyclerview, that is recyclerview with checkboxes. However in some cases you just want the user to be able to select a single item from the recyclerview. This is where radiobuttons come in.

However, in our case we will open a detail activity when the user selects a given radiobutton. Then we use intents to pass data to the detail activity.

###### What do we show?

Well we show images, text and radiobuttons. Normally images get rendered in imageview. The text will be rendered in textview. On the other hand the radiobuttons will show for us a compound state, basically checked or not.

### Step 1: Gradle Scripts

##### (a) Build.gradle

No special dependency is required. We add CardView and recyclerview as our dependencies.

The CardView will hold our Galaxy objects. The RecyclerView will hold multiple cardviews. AppCompat will give us the AppCompatActivity from which our MainActivity extends.

### Step 2: Create Layouts

We have three layouts

#### 1\. activity_main.xml

This layout will get inflated into MainActivity. It simply contains our RecyclerView. I have given mine a custom background color.

```xml
<?xml version="1.0" encoding="utf-8"?>
<RelativeLayout
    android_layout_width="match_parent"
    android_background="#009968"
    android_layout_height="match_parent">

    <androidx.recyclerview.widget.RecyclerView
        android_id="@+id/mRecylcerview"
        android_layout_width="match_parent"
        android_layout_height="match_parent" />
</RelativeLayout>
```

#### 2\. activity_detail.xml

The Layout for our Detail activity. Contains imageview and textviews.to show our data.

```xml
<?xml version="1.0" encoding="utf-8"?>
<RelativeLayout

    android_layout_width="match_parent"
    android_layout_height="match_parent"
    android_background="#009688"
    tools_context=".DetailsActivity"
    tools_showIn="@layout/activity_detail">

    <androidx.cardview.widget.CardView
        android_layout_width="match_parent"
        android_layout_height="match_parent"
        android_layout_margin="3dp"
        card_view_cardCornerRadius="3dp"
        card_view_cardElevation="5dp">

        <ScrollView
            android_layout_width="match_parent"
            android_layout_height="match_parent">

            <LinearLayout
                android_layout_width="match_parent"
                android_layout_height="match_parent"
                android_orientation="vertical">

                <ImageView
                    android_id="@+id/galaxyImg"
                    android_layout_width="match_parent"
                    android_layout_height="200dp"
                    android_layout_alignParentTop="true"
                    android_padding="5dp"
                    android_scaleType="fitXY"
                    android_src="@drawable/placeholder" />

                <LinearLayout
                    android_layout_width="match_parent"
                    android_layout_height="wrap_content"
                    android_orientation="vertical">

                    <LinearLayout
                        android_layout_width="match_parent"
                        android_layout_height="wrap_content"
                        android_orientation="horizontal">

                        <TextView
                            android_id="@+id/nameLabel"
                            android_layout_width="0dp"
                            android_layout_weight="1"
                            android_layout_height="wrap_content"
                            android_maxLines="1"
                            android_padding="5dp"
                            android_text="NAME"
                            android_textColor="@color/colorAccent"
                            android_textAppearance="?android:attr/textAppearanceSmall"
                            android_textStyle="bold" />

                        <TextView
                            android_id="@+id/nameTxt"
                            android_layout_width="0dp"
                            android_layout_weight="2"
                            android_layout_height="wrap_content"
                            android_maxLines="1"
                            android_padding="5dp"
                            android_text="Milky Way"
                            android_textAppearance="?android:attr/textAppearanceSmall"/>
                    </LinearLayout>

                    <LinearLayout
                        android_layout_width="match_parent"
                        android_layout_height="wrap_content"
                        android_orientation="horizontal">

                        <TextView
                            android_id="@+id/dateLabel"
                            android_layout_width="0dp"
                            android_layout_weight="1"
                            android_layout_height="wrap_content"
                            android_maxLines="1"
                            android_textColor="@color/colorAccent"
                            android_padding="5dp"
                            android_text="DATE"
                            android_textAppearance="?android:attr/textAppearanceSmall"
                            android_textStyle="bold" />

                        <TextView
                            android_id="@+id/dateDetailTextView"
                            android_layout_width="0dp"
                            android_layout_weight="2"
                            android_layout_height="wrap_content"
                            android_maxLines="1"
                            android_padding="5dp"
                            android_text="Today"
                            android_textAppearance="?android:attr/textAppearanceSmall"/>
                    </LinearLayout>

                    <LinearLayout
                        android_layout_width="match_parent"
                        android_layout_height="wrap_content"
                        android_orientation="horizontal">

                        <TextView
                            android_id="@+id/descLabel"
                            android_layout_width="0dp"
                            android_layout_weight="1"
                            android_layout_height="wrap_content"
                            android_maxLines="1"
                            android_textColor="@color/colorAccent"
                            android_padding="5dp"
                            android_text="DESCRIPTION : "
                            android_textAppearance="?android:attr/textAppearanceSmall"
                            android_textStyle="bold" />

                        <TextView
                            android_id="@+id/descTxt"
                            android_layout_width="0dp"
                            android_layout_weight="2"
                            android_layout_height="wrap_content"
                            android_maxLines="10"
                            android_padding="5dp"
                            android_text="Description..."
                            android_textAppearance="?android:attr/textAppearanceSmall"/>
                    </LinearLayout>

                </LinearLayout>
            </LinearLayout>
        </ScrollView>
    </androidx.cardview.widget.CardView>
</RelativeLayout>
```

#### 3\. model.xml

This is our item view layout. It will get inflated into our recyclerview view items. This will be done by our RecyclerView adapter.

```xml
<?xml version="1.0" encoding="utf-8"?>
<androidx.cardview.widget.CardView
    android_orientation="horizontal" android_layout_width="match_parent"

    android_layout_margin="1dp"
    card_view_cardCornerRadius="1dp"
    card_view_cardElevation="5dp"
    android_layout_height="135dp">

        <RelativeLayout
            android_layout_width="wrap_content"
            android_layout_height="match_parent">

        <ImageView
            android_layout_width="120dp"
            android_layout_height="120dp"
            android_id="@+id/mGalaxyImageView"
            android_padding="5dp"
            android_scaleType="fitXY"
            android_src="@drawable/placeholder" />

        <TextView
            android_layout_width="wrap_content"
            android_layout_height="wrap_content"
            android_textAppearance="?android:attr/textAppearanceSmall"
            android_text="Name"
            android_id="@+id/mNameTxt"
            android_padding="5dp"
            android_textColor="@color/colorAccent"
            android_layout_alignParentTop="true"
            android_layout_toRightOf="@+id/mGalaxyImageView" />

        <TextView
            android_layout_width="wrap_content"
            android_layout_height="wrap_content"
            android_textAppearance="?android:attr/textAppearanceSmall"
            android_text="Description"
            android_textStyle="italic"
            android_maxLines="3"
            android_id="@+id/mDescTxt"
            android_padding="5dp"
            android_layout_alignBottom="@+id/mGalaxyImageView"
            android_layout_toRightOf="@+id/mGalaxyImageView" />

            <RadioButton
                android_id="@+id/mRadioButton"
                android_layout_width="wrap_content"
                android_layout_height="wrap_content"
                android_layout_alignParentRight="true" />

        </RelativeLayout>
</androidx.cardview.widget.CardView>
```

### Step 4: Write Java Code.

We have the following java classes for this project:

1. Galaxy.java
2. RecyclerAdapter.java
3. DetailsActivity.java
4. MainActivity.java

##### (a).Galaxy.java

This will represent our data object. It is our model class and represents a galaxy with properties like:

1. Name.
2. Description
3. Image.

Here's the full code.

```java
package info.camposha.singlechoicerecyclerview_vela;

import java.io.Serializable;

/**
 * Please take note that our data object will implement Serializable.This
 * will allow us to pass this serialized object to DetailsActivity,
 */
public class Galaxy implements Serializable{
    private String name,description;
    private int image;

    public Galaxy(String name, String description,int image) {
        this.name = name;
        this.description = description;
        this.image=image;
    }

    public String getName() {return name;}
    public String getDescription() {return description;}
    public int getImage() {return image;}

}
```

You can see that we've implemented the Serializable interface. This allows us to serialize our data object so that it can be transported to the DetailsActivity activity as a whole via intent.

##### (b). RecyclerAdapter.java

This is our adapter class. It will inflate our model layout into a view object that can be rendered by the recyclerview. It will also bind data to those inflated view objects.

```java
package info.camposha.singlechoicerecyclerview_vela;

import android.content.Context;
import androidx.recyclerview.widget.RecyclerView;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.AdapterView;
import android.widget.ImageView;
import android.widget.RadioButton;
import android.widget.TextView;

import java.util.List;

public class RecyclerAdapter extends RecyclerView.Adapter<
RecyclerAdapter.RecyclerViewHolder> {

    /**
     * Let's start by defining our instance fields
     */
    private int selectedStarPosition = -1;
    private List<Galaxy> galaxies;
    private Context c;
    private AdapterView.OnItemClickListener onItemClickListener;

    /**
     * Let's create our constructor
     * @param context
     * @param mGalaxies
     */
    public RecyclerAdapter(Context context, List<Galaxy> mGalaxies) {
        this.c = context;
        this.galaxies = mGalaxies;
    }

    /**
     * OnCreateViewHolder - here is where we inflate our model layout
     * @param viewGroup
     * @param i
     * @return
     */
    @Override
    public RecyclerViewHolder onCreateViewHolder(ViewGroup viewGroup, int i) {
        final View v = LayoutInflater.from(c).inflate(R.layout.model, viewGroup, false);
        return new RecyclerViewHolder(v, this);
    }

    /**
     * OnBindViewHolder - Here's where we bind our data
     * @param viewHolder
     * @param position
     */
    @Override
    public void onBindViewHolder(RecyclerViewHolder viewHolder, final int position) {
        Galaxy galaxy = galaxies.get(position);
        try {
            viewHolder.bindData(galaxy, position);
        } catch (Exception e) {
            e.printStackTrace();
        }
    }
    /**
     * Let's return the number of items to be bound to our adapter.
     * @return
     */
    @Override
    public int getItemCount() {
        return galaxies.size();
    }

    /**
     * Let's receive our onItemClickListener and assign it to our local one.
     * @param onItemClickListener
     */
    public void setOnItemClickListener(AdapterView.OnItemClickListener
     onItemClickListener) {
        this.onItemClickListener = onItemClickListener;
    }

    /**
     * When user clicks our itemView, we still invoke the onItemClick
     * @param holder
     */
    public void onItemHolderClick(RecyclerViewHolder holder) {
        if (onItemClickListener != null)
            onItemClickListener.onItemClick(null, holder.itemView,
             holder.getAdapterPosition(), holder.getItemId());
    }

    /**
     * Let's come create our ViewHolder class.
     */
    class RecyclerViewHolder extends RecyclerView.ViewHolder implements
     View.OnClickListener {

        private RecyclerAdapter mAdapter;
        private RadioButton mRadioButton;
        private TextView mNameTxt,mDescTxt;
        private ImageView mGalaxyImg;

        /**
         * In our constructor, we reference our itemView widgets.
         * @param itemView
         * @param mAdapter
         */
        public RecyclerViewHolder(View itemView, final RecyclerAdapter mAdapter) {
            super(itemView);
            this.mAdapter = mAdapter;

            mNameTxt = itemView.findViewById(R.id.mNameTxt);
            mDescTxt = itemView.findViewById(R.id.mDescTxt);
            mRadioButton = itemView.findViewById(R.id.mRadioButton);
            mGalaxyImg=itemView.findViewById(R.id.mGalaxyImageView);
            itemView.setOnClickListener(this);
            mRadioButton.setOnClickListener(this);
        }

        /**
         * Let's create a method that allows us bind our data.
         * @param galaxy
         * @param position
         */
        public void bindData(Galaxy galaxy, int position) {
            mRadioButton.setChecked(position == selectedStarPosition);
            mNameTxt.setText(galaxy.getName());
            mDescTxt.setText(galaxy.getDescription());
            mGalaxyImg.setImageResource(galaxy.getImage());
        }

        /**
         * Let's override our OnClick method.
         * @param v
         */
        @Override
        public void onClick(View v) {
            selectedStarPosition = getAdapterPosition();
            notifyItemRangeChanged(0, galaxies.size());
            mAdapter.onItemHolderClick(RecyclerViewHolder.this);
        }
    }
}
//end
```

##### (c). DetailsActivity.java

Our detail activity class. This will show the details of the clicked galaxy.

```java
package info.camposha.singlechoicerecyclerview_vela;

import android.content.Intent;
import android.os.Bundle;
import androidx.appcompat.app.AppCompatActivity;
import android.widget.ImageView;
import android.widget.TextView;

import java.text.DateFormat;
import java.text.SimpleDateFormat;
import java.util.Date;

public class DetailsActivity extends AppCompatActivity {

  TextView nameTxt, descTxt, dateDetailTextView;
  ImageView galaxyImg;

  //We start by initializing our widgets.
  private void initializeWidgets() {
    nameTxt = findViewById(R.id.nameTxt);
    descTxt = findViewById(R.id.descTxt);
    dateDetailTextView = findViewById(R.id.dateDetailTextView);
    descTxt = findViewById(R.id.descTxt);
    galaxyImg = findViewById(R.id.galaxyImg);
  }

  //This method will get todays date and return it as a string
  private String getDateToday() {
    DateFormat dateFormat = new SimpleDateFormat("yyyy/MM/dd");
    Date date = new Date();
    String today = dateFormat.format(date);
    return today;
  }

  //I'll create a method to receive and show data.
  private void receiveAndShowData() {
    //RECEIVE DATA FROM ITEMS ACTIVITY VIA INTENT
    Intent i = this.getIntent();
    Galaxy g= (Galaxy) i.getSerializableExtra("GALAXY_KEY");

    //SET RECEIVED DATA TO TEXTVIEWS AND IMAGEVIEWS
    nameTxt.setText(g.getName());
    descTxt.setText(g.getDescription());
    dateDetailTextView.setText(getDateToday());
    galaxyImg.setImageResource(g.getImage());
  }

  @Override
  protected void onCreate(Bundle savedInstanceState) {
    super.onCreate(savedInstanceState);
    setContentView(R.layout.activity_detail);

    initializeWidgets();
    receiveAndShowData();
  }
}
//end
```

##### (d). MainActivity.java

Our main activity class. This is where we reference our recyclerview and define our data source.

```java
package info.camposha.singlechoicerecyclerview_vela;

import android.content.Intent;
import android.os.Bundle;
import androidx.appcompat.app.AppCompatActivity;
import android.support.v7.widget.LinearLayoutManager;
import androidx.recyclerview.widget.RecyclerView;
import android.view.View;
import android.widget.AdapterView;
import android.widget.Toast;

import java.util.ArrayList;

public class MainActivity extends AppCompatActivity implements AdapterView.OnItemClickListener {

    RecyclerView mRecyclerView;
    private RecyclerAdapter mAdapter;
    /**
     * Let's start by defining our data source.
     * @return
     */
    private ArrayList<Galaxy> getData()
    {
        ArrayList<Galaxy> galaxies=new ArrayList<>();
        Galaxy g=new Galaxy("Whirlpool",
                "The Whirlpool Galaxy, also known as Messier 51a, M51a, and NGC 5194, is an interacting grand-design spiral Galaxy with a Seyfert 2 active galactic nucleus in the constellation Canes Venatici.",
                R.drawable.whirlpool);
        galaxies.add(g);

        g=new Galaxy("Ring Nebular",
                "The Ring Nebula is a planetary nebula in the northern constellation of Lyra. Such objects are formed when a shell of ionized gas is expelled into the surrounding interstellar medium by a red giant star.",
                R.drawable.ringnebular);
        galaxies.add(g);

        g=new Galaxy("IC 1011",
                "C 1011 is a compact elliptical galaxy with apparent magnitude of 14.7, and with a redshift of z=0.02564 or 0.025703, yielding a distance of 100 to 120 Megaparsecs. Its light has taken 349.5 million years to travel to Earth.",
                R.drawable.ic1011);
        galaxies.add(g);

        g=new Galaxy("Cartwheel",
                "The Cartwheel Galaxy is a lenticular galaxy and ring galaxy about 500 million light-years away in the constellation Sculptor. It is an estimated 150,000 light-years diameter, and a mass of about 2.9–4.8 × 10⁹ solar masses; it rotates at 217 km/s.",
                R.drawable.cartwheel);
        galaxies.add(g);

        g=new Galaxy("Triangulumn",
                "The Triangulum Galaxy is a spiral Galaxy approximately 3 million light-years from Earth in the constellation Triangulum",
                R.drawable.triangulum);
        galaxies.add(g);

        g=new Galaxy("Small Magellonic Cloud",
                "The Small Magellanic Cloud, or Nubecula Minor, is a dwarf galaxy near the Milky Way. It is classified as a dwarf irregular galaxy.",
                R.drawable.smallamgellonic);
        galaxies.add(g);

        g=new Galaxy("Centaurus A",
                " Centaurus A or NGC 5128 is a galaxy in the constellation of Centaurus. It was discovered in 1826 by Scottish astronomer James Dunlop from his home in Parramatta, in New South Wales, Australia.",
                R.drawable.centaurusa);
        galaxies.add(g);

        g=new Galaxy("Ursa Minor",
                "The Milky Way is the Galaxy that contains our Solar System." +
                        " The descriptive milky is derived from the appearance from Earth of the Galaxy – a band of light seen in the night sky formed from stars",
                R.drawable.ursaminor);
        galaxies.add(g);

        g=new Galaxy("Large Magellonic Cloud",
                " The Large Magellanic Cloud is a satellite galaxy of the Milky Way. At a distance of 50 kiloparsecs, the LMC is the third-closest galaxy to the Milky Way, after the Sagittarius Dwarf Spheroidal and the.",
                R.drawable.largemagellonic);
        galaxies.add(g);

        g=new Galaxy("Milky Way",
                "The Milky Way is the Galaxy that contains our Solar System." +
                        " The descriptive milky is derived from the appearance from Earth of the Galaxy – a band of light seen in the night sky formed from stars",
                R.drawable.milkyway);
        galaxies.add(g);

        g=new Galaxy("Andromeda",
                "The Andromeda Galaxy, also known as Messier 31, M31, or NGC 224, is a spiral Galaxy approximately 780 kiloparsecs from Earth. It is the nearest major Galaxy to the Milky Way and was often referred to as the Great Andromeda Nebula in older texts.",
                R.drawable.andromeda);
        galaxies.add(g);

        g=new Galaxy("Messier 81",
                "Messier 81 is a spiral Galaxy about 12 million light-years away in the constellation Ursa Major. Due to its proximity to Earth, large size and active galactic nucleus, Messier 81 has been studied extensively by professional astronomers.",
                R.drawable.messier81);
        galaxies.add(g);

        g=new Galaxy("Own Nebular",
                " The Owl Nebula is a planetary nebula located approximately 2,030 light years away in the constellation Ursa Major. It was discovered by French astronomer Pierre Méchain on February 16, 1781",
                R.drawable.ownnebular);
        galaxies.add(g);

        g=new Galaxy("Messier 87",
                "Messier 87 is a supergiant elliptical galaxy in the constellation Virgo. One of the most massive galaxies in the local universe, it is notable for its large population of globular clusters—M87 contains",
                R.drawable.messier87);
        galaxies.add(g);

        g=new Galaxy("Cosmos Redshift",
                "Cosmos Redshift 7 is a high-redshift Lyman-alpha emitter Galaxy, in the constellation Sextans, about 12.9 billion light travel distance years from Earth, reported to contain the first stars —formed ",
                R.drawable.cosmosredshift);
        galaxies.add(g);

        g=new Galaxy("StarBust",
                "A starburst Galaxy is a Galaxy undergoing an exceptionally high rate of star formation, as compared to the long-term average rate of star formation in the Galaxy or the star formation rate observed in most other galaxies. ",
                R.drawable.starbust);
        galaxies.add(g);

        g=new Galaxy("Sombrero",
                "Sombrero Galaxy is an unbarred spiral galaxy in the constellation Virgo located 31 million light-years from Earth. The galaxy has a diameter of approximately 50,000 light-years, 30% the size of the Milky Way.",
                R.drawable.sombrero);
        galaxies.add(g);

        g=new Galaxy("Pinwheel",
                "The Pinwheel Galaxy is a face-on spiral galaxy distanced 21 million light-years away from earth in the constellation Ursa Major. ",
                R.drawable.pinwheel);
        galaxies.add(g);

        g=new Galaxy("Canis Majos Overdensity",
                "The Canis Major Dwarf Galaxy or Canis Major Overdensity is a disputed dwarf irregular galaxy in the Local Group, located in the same part of the sky as the constellation Canis Major. ",
                R.drawable.canismajoroverdensity);
        galaxies.add(g);

        g=new Galaxy("Virgo Stella Stream",
                " Group, located in the same part of the sky as the constellation Canis Major. ",
                R.drawable.virgostellarstream);
        galaxies.add(g);

        return galaxies;
    }

    /**
     * Let's create a method to open our detail activity and pass our object.
     * @param galaxy
     */
    private void openDetailActivity(Galaxy galaxy)
    {
        Intent i=new Intent(this,DetailsActivity.class);
        i.putExtra("GALAXY_KEY",galaxy);
        startActivity(i);
    }

    /**
     * Let's implemenent our onItemClick method
     * @param parent
     * @param view
     * @param position
     * @param id
     */
    @Override
    public void onItemClick(AdapterView<?> parent, View view, int position, long id) {
        Galaxy g=getData().get(position);
        Toast.makeText(MainActivity.this,String.valueOf(position)+". "+ g.getName()+" Chosen.", Toast.LENGTH_SHORT).show();
        openDetailActivity(g);
    }

    /**
     * Let's override our onCreate callback
     * @param savedInstanceState
     */
    @Override
    public void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);

        mRecyclerView=findViewById(R.id.mRecylcerview);

        mAdapter = new RecyclerAdapter(this, getData());
        mRecyclerView.setLayoutManager(new LinearLayoutManager(this));
        mRecyclerView.setAdapter(mAdapter);
        mAdapter.setOnItemClickListener(this);
    }
}
```

##### Download

You can download the full source code below or watch the video from the link provided.

| No. | Location | Link |
| --- | --- | --- |
| 1. | GitHub | [Direct Download](https://github.com/Oclemy/SingleChoiceRecyclerViewRadioButtons/archive/master.zip) |
| 2. | GitHub | [Browse](https://github.com/Oclemy/SingleChoiceRecyclerViewRadioButtons) |
| 3. | YouTube | [Video Tutorial](https://www.youtube.com/watch?v=L_rHFdlvf6o) |
| 4. | YouTube | [ProgrammingWizards TV Channel](http://www.youtube.com/c/programmingwizards) |

## Example 3: Kotlin Android RecyclerView – CardView with CheckBox,Images,Text and ItemClick

_Kotlin Android RecyclerView with CheckBoxes, Images, text and ItemClick supports Tutorial and Example._

I want to show you how you can work with the recyclerview in this tutorial and do common things like using it with checkboxes, images, textview and also supporting click events. All these we do in a single `MainActivity.kt` file.

#### Video Tutorial

If you prefer a video tutorial then check here:

#### What You Learn

Here are the concepts you learn:

1. How to use Recyclerview in android with Kotlin Programming Language.
2. How to use CheckBox with recyclerview and handle the checkbox states appropriately.
3. How to create a recyclerview with images and text.
4. How to support item click event in recyclerview.

#### Tools Used

Here are the tools I used for this project:

1. Programming Language : Kotlin
2. Framework - Android
3. IDE - Android Studio.
4. Emulator - Nox Player
5. OS : Windows 8.1

Let's start.

#### Demo

Here are the demo for this project:

![Kotlin RecyclerView CheckBox](https://camposha.info/android-examples/wp-content/uploads/sites/9/2021/05/demo2.png)

#### (a). Build.gradle

Our app level `build.gradle`. This is where we add our dependencies. Especially we are interested in three main of those:

1. AppCompat - To give us the AppCompatActivity from which our `MainActivity` will derive.
2. Design Support - To give us the [RecyclerView](https://camposha.info/android/recyclerview).
3. CardView - To give us Cardview.

#### (b). activity_main.xml

This is our main [activity's](https://camposha.info/android/activity) layout. Here are the components we use:

1. [RelativeLayout](https://camposha.info/android/relativelayout) - To arrange our other widgets relative to each other.
2. TextView - To render header text.
3. [RecyclerView](https://camposha.info/android/recyclerview) - To render our data.
4. Floating Action Button - To show the checked items when clicked.

```xml
<?xml version="1.0" encoding="utf-8"?>
<RelativeLayout

    android_layout_width="match_parent"
    android_layout_height="match_parent"
    tools_context="com.devosha.kotlin_recyclerview_checkbox.MainActivity">

    <TextView
        android_id="@+id/headerTextView"
        android_layout_width="match_parent"
        android_layout_height="wrap_content"
        android_text="Spiritual Teachers"
        android_textAlignment="center"
        android_textAppearance="@style/TextAppearance.AppCompat.Large"
        android_textColor="@color/colorAccent" />

    <androidx.recyclerview.widget.RecyclerView
        android_id="@+id/myRecycler"
        class="androidx.recyclerview.widget.RecyclerView"
        android_layout_width="match_parent"
        android_layout_height="wrap_content"
        android_layout_alignParentLeft="true"
        android_layout_alignParentStart="true"
        android_layout_below="@+id/headerTextView"
        android_layout_marginTop="30dp" />

    <android.support.design.widget.FloatingActionButton
        android_id="@+id/fab"
        android_layout_width="wrap_content"
        android_layout_height="wrap_content"
        android_layout_alignParentBottom="true"
        android_layout_alignParentEnd="true"
        android_layout_alignParentRight="true"
        android_layout_gravity="bottom|end"
        android_src="@android:drawable/ic_dialog_email" />

</RelativeLayout>
```

#### (c). model.xml

This layout will define our item views for our recyclerview, it will model them. Basically it will be rendering data for a single `SpiritualTeacher` object. At the root we have a CardView. Then we also have:

1. ImageView - To render image for the `SpiritualTeacher` object.
2. TextVIew - To render his name as well as description.
3. CheckBox - To allow us select and unselect the CardViews.

```xml
<?xml version="1.0" encoding="utf-8"?>
<androidx.cardview.widget.CardView
    android_orientation="horizontal" android_layout_width="match_parent"

    android_layout_margin="5dp"
    card_view_cardCornerRadius="10dp"
    card_view_cardElevation="5dp"
    android_layout_height="match_parent">

    <RelativeLayout
        android_layout_width="match_parent"
        android_layout_height="match_parent">
        <ImageView
            android_layout_width="150dp"
            android_layout_height="150dp"
            android_id="@+id/teacherImageView"
            android_padding="5dp"
            android_src="@drawable/cle" />

        <TextView
            android_layout_width="wrap_content"
            android_layout_height="wrap_content"
            android_textAppearance="?android:attr/textAppearanceLarge"
            android_text="Teacher Name"
            android_id="@+id/nameTextView"
            android_padding="5dp"
            android_textColor="@color/colorAccent"
            android_layout_alignParentTop="true"
            android_layout_toRightOf="@+id/teacherImageView" />

        <TextView
            android_layout_width="wrap_content"
            android_layout_height="wrap_content"
            android_textAppearance="?android:attr/textAppearanceMedium"
            android_text="Teacher Description..."
            android_id="@+id/descritionTextView"
            android_padding="5dp"
            android_layout_alignBottom="@+id/teacherImageView"
            android_layout_toRightOf="@+id/teacherImageView" />

        <CheckBox
            android_layout_width="wrap_content"
            android_layout_height="wrap_content"
            android_id="@+id/myCheckBox"
            android_layout_alignParentRight="true"
            />

    </RelativeLayout>
</androidx.cardview.widget.CardView>
```

#### (d). MainActivity.kt

This is our main [activity](https://camposha.info/android/activity). This is our only file and we will define several inner kotlin classes here. This class will be deriving from the AppCompatActivity.

##### Create Data Object

We will start by defining an inner class called `SpiritualTeacher`:

```kotlin
   inner class SpiritualTeacher(var name: String?, val quote: String, val image: Int) {
        var isSelected: Boolean = false
    }
```

That class is our data object. It will receive it's parameters via the constructor. Moreover we are maintaining a simple boolean as you can see that will hold for us the selection state of the CardViews. In fact this is the magic to allow us select and unselect our items in our recyclerview. Thus our recyclerview will not lose the state even as we scroll and the recyclerview items get recycled. This is because we are holding them as data in our object and they are not affected by the recycling.

##### Create RecyclerVew Adapter class

Normally the Adapter has two main roles. First to inflate our custom layouts and secondly to bind data to the resultant widgets. However recyclerview always goes further by allowing us to recycle items. This saves memory consumption as inflation is an expensive process and would impact negatively on our app if we were to do it for every item in the recyclerview.

So we will create an adapter:

```kotlin
    internal class MyAdapter(var c: Context, var teachers: Array<SpiritualTeacher>) : RecyclerView.Adapter<MyAdapter.MyHolder>() {..}
```

We've made it derive from the `RecyclerView.Adapter` class.

Inside the adapter first we will create an arraylist that will hold for us the `teachers` that have been checked:

```kotlin
        var checkedTeachers = ArrayList<SpiritualTeacher>()
```

It is inside the `onCreateViewHolder()` method where we will be inflating our `model.xml` into a View object. For that we use the LayoutInflater class.

```kotlin
        override fun onCreateViewHolder(parent: ViewGroup, viewType: Int): MyHolder {
            val v = LayoutInflater.from(parent.context).inflate(R.layout.model, null)
            return MyHolder(v)
        }
```

Here's the full source code.

```kotlin
package com.devosha.kotlin_recyclerview_checkbox

import android.content.Context
import android.os.Bundle
import android.support.design.widget.FloatingActionButton
import androidx.appcompat.app.AppCompatActivity
import android.support.v7.widget.DefaultItemAnimator
import android.support.v7.widget.LinearLayoutManager
import androidx.recyclerview.widget.RecyclerView
import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import android.widget.CheckBox
import android.widget.ImageView
import android.widget.TextView
import android.widget.Toast

import java.util.ArrayList

/**
 * class: MainActivity
 * This class is deriving from `androidx.appcompat.app.AppCompatActivity`.
 */
class MainActivity : AppCompatActivity() {

    private val teachers: Array<SpiritualTeacher>
        get() =
            arrayOf(SpiritualTeacher("Rumi", "Out beyond ideas of wrongdoing and rightdoing there is a field.I'll meet you there.", R.drawable.rumi),
                    SpiritualTeacher("Anthony De Mello", "Don't Carry Over Experiences from the past", R.drawable.anthony_de_mello),
                    SpiritualTeacher("Eckhart Tolle", "Walk as if you are kissing the Earth with your feet.", R.drawable.eckhart_tolle),
                    SpiritualTeacher("Meister Eckhart", "Man suffers only because he takes seriously what the gods made for fun.", R.drawable.meister_eckhart),
                    SpiritualTeacher("Mooji", "I have lived with several Zen masters -- all of them cats.", R.drawable.mooji),
                    SpiritualTeacher("Confucius", "I'm simply saying that there is a way to be sane. I'm saying that you ", R.drawable.confucius),
                    SpiritualTeacher("Francis Lucille", "The way out is through the door. Why is it that no one will use this method?", R.drawable.francis_lucille),
                    SpiritualTeacher("Thich Nhat Hanh", "t is the power of the mind to be unconquerable.", R.drawable.thich),
                    SpiritualTeacher("Dalai Lama", "It's like you took a bottle of ink and you threw it at a wall. Smash! ", R.drawable.dalai_lama),
                    SpiritualTeacher("Jiddu Krishnamurti", "A student, filled with emotion and crying, implored, 'Why is there so much suffering?", R.drawable.jiddu_krishnamurti),
                    SpiritualTeacher("Osho", "Only the hand that erases can write the true thing.", R.drawable.osho),
                    SpiritualTeacher("Sedata", "Many have died; you also will die. The drum of death is being beaten.", R.drawable.sedata),
                    SpiritualTeacher("Allan Watts", "Where there are humans, You'll find flies,And Buddhas.", R.drawable.allant_watts),
                    SpiritualTeacher("Leo Gura", "Silence is the language of Om. We need silence to be able to reach our Self.", R.drawable.sadhguru),
                    SpiritualTeacher("Rupert Spira", "One day in my shoes and a day for me in your shoes, the beauty of travel lies ", R.drawable.rupert_spira),
                    SpiritualTeacher("Sadhguru", "Like vanishing dew,a passing apparition or the sudden flashnof lightning", R.drawable.sadhguru))
    internal var sb: StringBuilder? = null
    internal lateinit var adapter: MyAdapter

    inner class SpiritualTeacher(var name: String?, val quote: String, val image: Int) {
        var isSelected: Boolean = false
    }

    internal class MyAdapter(var c: Context, var teachers: Array<SpiritualTeacher>) : RecyclerView.Adapter<MyAdapter.MyHolder>() {
        var checkedTeachers = ArrayList<SpiritualTeacher>()

        //VIEWHOLDER IS INITIALIZED
        override fun onCreateViewHolder(parent: ViewGroup, viewType: Int): MyHolder {
            val v = LayoutInflater.from(parent.context).inflate(R.layout.model, null)
            return MyHolder(v)
        }

        //DATA IS BOUND TO VIEWS
        override fun onBindViewHolder(holder: MyHolder, position: Int) {
            val teacher = teachers[position]
            holder.nameTxt.text = teacher.name
            holder.posTxt.text = teacher.quote
            holder.myCheckBox.isChecked = teacher.isSelected
            holder.img.setImageResource(teacher.image)

            holder.setItemClickListener(object : MyHolder.ItemClickListener {
                override fun onItemClick(v: View, pos: Int) {
                    val myCheckBox = v as CheckBox
                    val currentTeacher = teachers[pos]

                    if (myCheckBox.isChecked) {
                        currentTeacher.isSelected = true
                        checkedTeachers.add(currentTeacher)
                    } else if (!myCheckBox.isChecked) {
                        currentTeacher.isSelected = false
                        checkedTeachers.remove(currentTeacher)
                    }
                }
            })
        }

        override fun getItemCount(): Int {
            return teachers.size
        }

        internal class MyHolder(itemView: View) : RecyclerView.ViewHolder(itemView), View.OnClickListener {

            var img: ImageView
            var nameTxt: TextView
            var posTxt: TextView
            var myCheckBox: CheckBox

            lateinit var myItemClickListener: ItemClickListener

            init {

                nameTxt = itemView.findViewById(R.id.nameTextView)
                posTxt = itemView.findViewById(R.id.descritionTextView)
                img = itemView.findViewById(R.id.teacherImageView)
                myCheckBox = itemView.findViewById(R.id.myCheckBox)

                myCheckBox.setOnClickListener(this)
            }

            fun setItemClickListener(ic: ItemClickListener) {
                this.myItemClickListener = ic
            }

            override fun onClick(v: View) {
                this.myItemClickListener.onItemClick(v, layoutPosition)
            }

            internal interface ItemClickListener {

                fun onItemClick(v: View, pos: Int)
            }
        }
    }

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_main)

        adapter = MyAdapter(this, teachers)

        val fab = findViewById(R.id.fab) as FloatingActionButton
        fab.setOnClickListener {
            sb = StringBuilder()

            var i = 0
            while (i < adapter.checkedTeachers.size) {
                val spiritualTeacher = adapter.checkedTeachers[i]
                sb!!.append(spiritualTeacher.name)
                if (i != adapter.checkedTeachers.size - 1) {
                    sb!!.append("n")
                }
                i++

            }

            if (adapter.checkedTeachers.size > 0) {
                Toast.makeText(this@MainActivity, sb!!.toString(), Toast.LENGTH_SHORT).show()
            } else {
                Toast.makeText(this@MainActivity, "Please Check An Item First", Toast.LENGTH_SHORT).show()
            }
        }

        //RECYCLER
        val rv = findViewById(R.id.myRecycler) as RecyclerView
        rv.layoutManager = LinearLayoutManager(this)
        rv.itemAnimator = DefaultItemAnimator()

        //SET ADAPTER
        rv.adapter = adapter

    }
// end
}
```

## Example 4: Android MySQL – RecyclerView CheckBoxes – INSERT,SELECT,SHOW

_This is an android mysql recyclerview with checkboxes tutorial. We see how to work with both text and boolean values with our mysql database._

- Today we explore how to work with Boolean and text values with MySQL and RecyclerView.
- First we insert data to MySQL database.
- The components we use as input views include chcekbox,spinner and material edittext.
- The user types his favorite spacecraft's name in the edittext,then selects that spaccecraft's propellant in a spinner.
- He then checks/unchecks a checkbox whether that technology exists now or not.
- We save that data to MySQL on button click.
- On retrieve' button click,we select data from MySQL and bind this text and boolean to our Checked RecyclerView,RecyclerView with CheckBoxes.

First let me say that we have the full,well commented source code above for download as a full reference.We have included the PHP file that we used.You'll place it in your server's root directory and modify things like username,table name etc.

#### Video Tutorial(ProgrammingWizards TV Channel)

Well we have a video tutorial as an alternative to this. If you prefer tutorials like this one then it would be good you [subscribe to our YouTube channel](https://www.youtube.com/channel/UCpdkWp2zh5Qv1ZWlnqswdCw).

Basically we have a TV for programming where do daily tutorials especially android.

#### Android MySQL RecyclerView CheckBoxes Insert, Select Show Example

Let's look at our example:

![Android MySQL RecyclerView](https://github.com/Oclemy/MySQL-Recycler-Boolean/raw/master/demos/MySQLRecyclerView.PNG)

#### MySQL Table

Here's our mysql table structure:

![Table Structure](https://github.com/Oclemy/MySQL-Recycler-Boolean/raw/master/demos/TableStructure.PNG)

#### Project Structure

Here's our project structure.

![Project Structure](https://github.com/Oclemy/MySQL-Recycler-Boolean/raw/master/demos/ProjectStructure.PNG)

#### 1\. PHP Code

Here are our php code:

##### (a) Constants.php

Our PHP class to hold database constants like server name, database name, username and password. These credentials will be required for us to be able to connect to MySQL database.

```php
<?php

class Constants
{
    //DATABASE DETAILS
    static $DB_SERVER="localhost";
    static $DB_NAME="galileoDB";
    static $USERNAME="root";
    static $PASSWORD="";
    const TB_NAME="galileoTB";
    //STATEMENTS
    static $SQL_SELECT_ALL="SELECT * FROM galileoTB";
}
```

##### (b) CRUD.php

This PHP file will allow us receive data from HTTP client by listening to and handling requests. We handle those requests by initiating the CRUD actions defined in our `DBAdapater.php` class.

```php
<?php

require_once("/DBAdapter.php");
if($_POST['action']=="save"){

         $dbAdapter=new DBAdapter();
         $name=$_POST['name'];
         $propellant=$_POST['propellant'];
         $technologyexists=$_POST['technologyexists'];
        $dbAdapter->insert(array($name,$propellant,$technologyexists));
}
else if($_POST['action']=="update")
{
         $dbAdapter=new DBAdapter();
         $id=$_POST['id'];
         $name=$_POST['name'];
         $propellant=$_POST['propellant'];
         $technologyexists=$_POST['technologyexists'];
        $dbAdapter->update($id,array($name,$propellant,$technologyexists));

}
else if($_POST['action']=="delete")
{
         $dbAdapter=new DBAdapter();
         $id=$_POST['id'];

        $dbAdapter->delete($id);
}
?>
```

##### (c) DBAdapter.php

This PHP file will contain functions that allow us perform CRUD operations on our MySQL database. Such actions include inserting and retrieving data to and from the database.

```php
<?php

require_once("/Constants.php");
class DBAdapter
{
/*******************************************************************************************************************************************/
/*
   1.CONNECT TO DATABASE.
   2. RETURN CONNECTION OBJECT
*/
    public function connect()
    {

       $con=mysqli_connect(Constants::$DB_SERVER,Constants::$USERNAME,Constants::$PASSWORD,Constants::$DB_NAME);
        if(mysqli_connect_error(!$con))
        {
           // echo "Unable To Connect";
            return null;
        }else
        {

            return $con;
        }
    }
    /*******************************************************************************************************************************************/
/*
   1.INSERT SPACECRAFT INTO DATABASE
 */
    public function insert($s)
    {
        // INSERT
        $con=$this->connect();

        if($con != null)
        {
            $sql="INSERT INTO galileoTB(name,propellant,technologyexists) VALUES('$s[0]','$s[1]','$s[2]')";
            try
            {
                $result=mysqli_query($con,$sql);
                if($result)
                {
                    print(json_encode(array("Success")));
                }else
                {
                    print(json_encode(array("Unsuccessfull")));
                }
            }catch (Exception $e)
            {
               print(json_encode(array("PHP EXCEPTION : CAN'T SAVE TO MYSQL. "+$e->getMessage())));
            }
        }else{
            print(json_encode(array("PHP EXCEPTION : CAN'T CONNECT TO MYSQL. NULL CONNECTION.")));
        }
        mysqli_close($con);
    }
/*******************************************************************************************************************************************/
/*
   1.SELECT FROM DATABASE.
*/
    public function select()
    {
       $con=$this->connect();
        if($con != null)
        {
            $retrieved=mysqli_query($con,Constants::$SQL_SELECT_ALL);
            if($retrieved)
            {
                while($row=mysqli_fetch_array($retrieved))
                {

                   // echo $row["name"] ,"    t | ",$row["propellant"],"</br>";
                   $spacecrafts[]=$row;
                }
                print(json_encode($spacecrafts));
            }else
            {
                 print(json_encode(array("PHP EXCEPTION : CAN'T RETRIEVE FROM MYSQL. ")));
            }
        }else{
            print(json_encode(array("PHP EXCEPTION : CAN'T CONNECT TO MYSQL. NULL CONNECTION.")));
        }
        mysqli_close($con);
    }
/*******************************************************************************************************************************************/
/*
   1.UPDATE  DATABASE.

*/
    public function update($id, $s)
    {
        // UPDATE
        $con=$this->connect();

        if($con != null)
        {
            $sql="UPDATE galileoTB SET name='$s[0]',propellant='$s[1]',technologyexists='$s[2]' WHERE id='$id'";
            try
            {
                $result=mysqli_query($con,$sql);
                if($result)
                {
                    print(json_encode(array("Successfully Updated")));
                }else
                {
                    print(json_encode(array("Not Successfully Updated")));
                }
            }catch (Exception $e)
            {
                 print(json_encode(array("PHP EXCEPTION : CAN'T UPDATE INTO MYSQL. "+$e->getMessage())));
            }
        }else{
            print(json_encode(array("PHP EXCEPTION : CAN'T CONNECT TO MYSQL. NULL CONNECTION.")));
        }
        mysqli_close($con);
    }
/*******************************************************************************************************************************************/
/*
   1.DELETE SPACECRAFT FROM DATABASE.

*/
    public function delete($id)
    {
        $con=$this->connect();

        if($con != null)
        {
//            $name=$_POST['Name'];
//            $pos=$_POST['Position'];
//            $team=$_POST['Team'];
            $sql="DELETE FROM galileoTB WHERE id='$id'";
            try
            {
                $result=mysqli_query($con,$sql);
                if($result)
                {
                    print(json_encode(array("Successfully Deleted")));
                }else
                {
                    print(json_encode(array("Not Successfully Deleted")));
                }
            }catch (Exception $e)
            {
                print(json_encode(array("PHP EXCEPTION : CAN'T DELETE FROM MYSQL. "+$e->getMessage())));
            }
        }else{
            print(json_encode(array("PHP EXCEPTION : CAN'T CONNECT TO MYSQL. NULL CONNECTION.")));
        }
        mysqli_close($con);
    }

}
```

##### (d) Index.php

```php
<?php

require_once("/DBAdapter.php");
    $dbAdapter=new DBAdapter();
    $dbAdapter->select();
?>
```

#### 2\. Gradle Scripts

Here are our gradle scripts in our build.gradle file(s).

##### (a). build.gradle(app)

Here's our **app level** `build.gradle` file. We have the dependencies DSL where we add our dependencies.

This file is called app level `build.gradle` since it's located in the app folder of the project.

If you are using Android Studio version 3 and above use `implementation` keyword while if you are using a version less than 3 then still use the `compile` keyword.

Once you've modified this `build.gradle` file you have to sync your project. Android Studio will indeed prompt you to do so.

```groovy
dependencies {
    implementation fileTree(dir: 'libs', include: ['*.jar'])
    testImplementation 'junit:junit:4.12'
    implementation 'com.android.support:appcompat-v7:24.2.0'
    implementation 'com.android.support:design:24.2.0'
    implementation 'com.android.support:cardview-v7:24.2.0'
    implementation 'com.amitshekhar.android:android-networking:0.2.0'
}
```

> We are using Fast Android Networking Library as our HTTP Client. You may use newer versions.

#### 3\. Resoources

[Android](https://camposha.info/android/introduction) platform provides a powerful and flexible way of adding static content as a resource.

These static content will also be packaged into the APK file. The static content will be stored either as a resource or as an asset.

Resources belong to a given type. These types can be:

1. Drawable.
2. Layout.
3. Value.

Let's start by looking at the layout resources

##### (a). model.xml

Our row model layout.

```xml
<?xml version="1.0" encoding="utf-8"?>
<androidx.cardview.widget.CardView
    android_orientation="horizontal" android_layout_width="match_parent"

    android_layout_margin="10dp"
    card_view_cardCornerRadius="5dp"
    card_view_cardElevation="5dp"
    android_layout_height="200dp">

        <LinearLayout
            android_orientation="vertical"
            android_layout_width="match_parent"
            android_layout_height="match_parent">

            <TextView
                android_layout_width="match_parent"
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
                android_id="@+id/txtPropellant"
                android_padding="10dp"
                android_layout_alignParentLeft="true"
                />
            <CheckBox
                android_layout_width="wrap_content"
                android_layout_height="wrap_content"
                android_textSize="25dp"
                android_id="@+id/chkTechExists"
                android_checked="true" />

    </LinearLayout>

</androidx.cardview.widget.CardView>
```

##### (b). content_main.xml

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
    tools_context="com.tutorials.hp.mysqlrecyclerbool.MainActivity"
    tools_showIn="@layout/activity_main">
<!--INPUT VIEWS-->
    <LinearLayout
        android_orientation="vertical"
        android_layout_width="match_parent"
        android_layout_height="wrap_content">

        <android.support.design.widget.TextInputEditText
            android_id="@+id/nameTxt"
            android_hint="Name"
            android_layout_width="match_parent"
            android_layout_height="wrap_content"
            android_textStyle="bold"
            android_textSize="25dp"
            android_enabled="true"
            android_focusable="true" />

        <LinearLayout
            android_orientation="horizontal"
            android_padding="5dp"
            android_layout_width="match_parent"
            android_layout_height="wrap_content">
            <TextView
                android_textSize="25dp"
                android_text="Propellant"
                android_textStyle="bold"
                android_layout_width="250dp"
                android_layout_height="wrap_content" />
            <Spinner
                android_id="@+id/sp"
                android_textSize="25dp"
                android_textStyle="bold"
                android_layout_width="wrap_content"
                android_layout_height="wrap_content" />
        </LinearLayout>

        <LinearLayout
            android_orientation="horizontal"
            android_padding="5dp"
            android_layout_width="match_parent"
            android_layout_height="wrap_content">
            <TextView
                android_textSize="25dp"
                android_text="Technology Exists ??"
                android_textStyle="bold"
                android_layout_width="250dp"
                android_layout_height="wrap_content" />
            <CheckBox
                android_layout_width="wrap_content"
                android_layout_height="wrap_content"
                android_textSize="25dp"
                android_id="@+id/techExists"
                android_checked="true" />
        </LinearLayout>
<!--BUTTONS-->
        <RelativeLayout
            android_orientation="horizontal"
            android_layout_width="match_parent"
            android_layout_height="wrap_content">

            <Button android_id="@+id/addBtn"
                android_layout_width="wrap_content"
                android_layout_height="60dp"
                android_text="Save"
                android_clickable="true"
                android_padding="5dp"
                android_background="#009968"
                android_textColor="@android:color/white"
                android_textStyle="bold"
                android_textSize="20dp" />

            <Button android_id="@+id/refreshBtn"
                android_layout_width="wrap_content"
                android_layout_height="60dp"
                android_text="Retrieve"
                android_padding="5dp"
                android_clickable="true"
                android_background="#f38630"
                android_textColor="@android:color/white"
                android_layout_alignParentTop="true"
                android_layout_alignParentRight="true"
                android_layout_alignParentEnd="true"
                android_textStyle="bold"
                android_textSize="20dp" />

        </RelativeLayout>
<!--RECYCLERVIEW-->
        <androidx.recyclerview.widget.RecyclerView
            android_id="@+id/rv"
            android_layout_width="match_parent"
            android_layout_height="wrap_content">

        </androidx.recyclerview.widget.RecyclerView>

    </LinearLayout>
</RelativeLayout>
```

##### (c). activity_main.xml

This layout will get inflated into the main activity's user interface. This will happen via the Activity's `setContentView()` method which will require us to pass it the layout.

We will do so inside the `onCreate()` method of [Activity](https://camposha.info/android/activity).

```xml
<?xml version="1.0" encoding="utf-8"?>
<android.support.design.widget.CoordinatorLayout

    android_layout_width="match_parent"
    android_layout_height="match_parent"
    android_fitsSystemWindows="true"
    tools_context="com.tutorials.hp.mysqlrecyclerbool.MainActivity">

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

#### 3\. Java Code.

Android apps can be mainly written in Java or Kotlin. These days however there are many frameworks like Flutter also which use languages like Dart.

In this class we are using Java programming language.

We will have these classes in our project.

##### (a). Spacecraft.java

First lets define our fictional spacecraft's properties :

```java
package com.tutorials.hp.mysqlrecyclerbool.mModel;

public class Spacecraft {

    /*
    INSTANCE FIELDS
     */
    private int id;
    private String name;
    private String propellant;
    private int technologyExists;

    /*
    GETTERS AND SETTERS
     */
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

    public String getPropellant() {
        return propellant;
    }

    public void setPropellant(String propellant) {
        this.propellant = propellant;
    }

    public int getTechnologyExists() {
        return technologyExists;
    }

    public void setTechnologyExists(int technologyExists) {
        this.technologyExists = technologyExists;
    }

    /*
    TOSTRING
     */
    @Override
    public String toString() {
        return name;
    }
}
```

![MySQL Table Structure](https://github.com/Oclemy/MySQL-Recycler-Boolean/raw/master/demos/TableStructure.PNG)

##### (b). MySQLClient.java

We are using Android Networking Library for our network calls.It does it in the background thread and is easy to use and fast.It shall be returning us JSOn responses that we can easily parse.Below is our MySQL client.

```java
package com.tutorials.hp.mysqlrecyclerbool.mMySQL;

import android.content.Context;
import androidx.recyclerview.widget.RecyclerView;
import android.view.View;
import android.widget.EditText;
import android.widget.Spinner;
import android.widget.Toast;

import com.androidnetworking.AndroidNetworking;
import com.androidnetworking.common.Priority;
import com.androidnetworking.error.ANError;
import com.androidnetworking.interfaces.JSONArrayRequestListener;
import com.tutorials.hp.mysqlrecyclerbool.mAdapter.MyAdapter;
import com.tutorials.hp.mysqlrecyclerbool.mModel.Spacecraft;

import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;

import java.util.ArrayList;

public class MySQLClient {

    //SAVE/RETRIEVE URLS
    private static final String DATA_INSERT_URL="http://10.0.2.2/android/Aristotle/crud.php";
    private static final String DATA_RETRIEVE_URL="http://10.0.2.2/android/Aristotle/index.php";

    //INSTANCE FIELDS
    private final Context c;
    private MyAdapter adapter ;

    public MySQLClient(Context c) {
        this.c = c;

    }
    /*
   SAVE/INSERT
    */
    public void add(Spacecraft s, final View...inputViews)
    {
        if(s==null)
        {
            Toast.makeText(c, "No Data To Save", Toast.LENGTH_SHORT).show();
        }
        else
        {
            AndroidNetworking.post(DATA_INSERT_URL)

                    .addBodyParameter("action","save")
                    .addBodyParameter("name",s.getName())
                    .addBodyParameter("propellant",s.getPropellant())
                    .addBodyParameter("technologyexists",String.valueOf(s.getTechnologyExists()))
                    .setTag("TAG_ADD")
                    .build()
                    .getAsJSONArray(new JSONArrayRequestListener() {
                        @Override
                        public void onResponse(JSONArray response) {

                            if(response != null)
                                try {
                                    //SHOW RESPONSE FROM SERVER
                                    String responseString = response.get(0).toString();
                                    Toast.makeText(c, "PHP SERVER RESPONSE : " + responseString, Toast.LENGTH_SHORT).show();

                                    if (responseString.equalsIgnoreCase("Success")) {
                                        //RESET VIEWS
                                        EditText nameTxt = (EditText) inputViews[0];
                                        Spinner spPropellant = (Spinner) inputViews[1];

                                        nameTxt.setText("");
                                        spPropellant.setSelection(0);
                                    }else
                                    {
                                        Toast.makeText(c, "PHP WASN'T SUCCESSFUL. ", Toast.LENGTH_SHORT).show();

                                    }

                                } catch (JSONException e) {
                                    e.printStackTrace();
                                    Toast.makeText(c, "GOOD RESPONSE BUT JAVA CAN'T PARSE JSON IT RECEIVED : "+e.getMessage(), Toast.LENGTH_SHORT).show();
                                }

                        }

                        //ERROR
                        @Override
                        public void onError(ANError anError) {
                            Toast.makeText(c, "UNSUCCESSFUL :  ERROR IS : "+anError.getMessage(), Toast.LENGTH_SHORT).show();
                        }

                    });

        }
    }

    /*
    RETRIEVE/SELECT/REFRESH
     */
    public void retrieve(final RecyclerView rv)
    {
        final ArrayList<Spacecraft> spacecrafts = new ArrayList<>();

        AndroidNetworking.get(DATA_RETRIEVE_URL)
                .setPriority(Priority.HIGH)
                .build()
                .getAsJSONArray(new JSONArrayRequestListener() {
                    @Override
                    public void onResponse(JSONArray response) {
                        JSONObject jo;
                        Spacecraft s;
                        try
                        {
                            for(int i=0;i<response.length();i++)
                            {
                                jo=response.getJSONObject(i);

                                int id=jo.getInt("id");
                                String name=jo.getString("name");
                                String propellant=jo.getString("propellant");
                                String techExists=jo.getString("technologyexists");

                                s=new Spacecraft();
                                s.setId(id);
                                s.setName(name);
                                s.setPropellant(propellant);
                                s.setTechnologyExists(techExists.equalsIgnoreCase("1") ? 1 : 0);

                                spacecrafts.add(s);
                            }

                            //SET TO RECYCLERVIEW
                            adapter =new MyAdapter(c,spacecrafts);
                            rv.setAdapter(adapter);

                        }catch (JSONException e)
                        {
                            Toast.makeText(c, "GOOD RESPONSE BUT JAVA CAN'T PARSE JSON IT RECEIEVED. "+e.getMessage(), Toast.LENGTH_LONG).show();

                        }

                    }

                    //ERROR
                    @Override
                    public void onError(ANError anError) {
                        anError.printStackTrace();
                        Toast.makeText(c, "UNSUCCESSFUL :  ERROR IS : "+anError.getMessage(), Toast.LENGTH_LONG).show();

                    }

                });

    }

}
```

##### (c). MyViewHolder.java

Our ViewHolder class.

```java
package com.tutorials.hp.mysqlrecyclerbool.mAdapter;

import androidx.recyclerview.widget.RecyclerView;
import android.view.View;
import android.widget.CheckBox;
import android.widget.TextView;

import com.tutorials.hp.mysqlrecyclerbool.R;

public class MyViewHolder extends RecyclerView.ViewHolder {

    TextView txtName,txtPropellant;
    CheckBox chkTechExists;
    public MyViewHolder(View view) {
        super(view);

         txtName = (TextView) view.findViewById(R.id.nameTxt);
         txtPropellant = (TextView) view.findViewById(R.id.txtPropellant);

         chkTechExists = (CheckBox) view.findViewById(R.id.chkTechExists);
    }
}
```

##### (d). MyAdapter.java

Below is our RecyclerView.Adapter class.Given that MySQL doesn't have a native boolean data type.We shall be mapping our boolean checkbox values to nullable integers.

```java
package com.tutorials.hp.mysqlrecyclerbool.mAdapter;

import android.content.Context;
import androidx.recyclerview.widget.RecyclerView;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;

import com.tutorials.hp.mysqlrecyclerbool.R;
import com.tutorials.hp.mysqlrecyclerbool.mModel.Spacecraft;

import java.util.ArrayList;

public class MyAdapter extends RecyclerView.Adapter<MyViewHolder> {
    /*
    INSTANCE FIELDS
     */
    private Context c;
    private ArrayList<Spacecraft> spacecrafts;

    /*
    CONSTRUCTOR
     */
    public MyAdapter(Context c, ArrayList<Spacecraft> spacecrafts) {
        this.c = c;
        this.spacecrafts = spacecrafts;
    }

    /*
    INITIALIZE VIEWHOLDER
     */
    @Override
    public MyViewHolder onCreateViewHolder(ViewGroup parent, int viewType) {
        View v= LayoutInflater.from(c).inflate(R.layout.model,parent,false);
        return new MyViewHolder(v);
    }

    /*
    BIND DATA
     */
    @Override
    public void onBindViewHolder(MyViewHolder holder, int position) {

        Spacecraft s=spacecrafts.get(position);

        holder.txtName.setText(s.getName());
        holder.txtPropellant.setText(s.getPropellant());
        holder.chkTechExists.setChecked(s.getTechnologyExists()==1);
    }

    /*
    TOTAL NUM OF SPACECRAFTS
     */
    @Override
    public int getItemCount() {
        return spacecrafts.size();
    }
}
```

##### (d). MainActivity.java

This is our launcher activity as the name suggests. This means it will be the main entry point to our app in that when the user clicks the icon for our app, this activity will get rendered first.

We override a method called `onCreate()`. Here we will start by inflating our main layout via the `setContentView()` method.

Our main activity is actually an [activity](https://camposha.info/android/activity) since it's deriving from the AppCompatActivity.

```java
package com.tutorials.hp.mysqlrecyclerbool;

import android.os.Bundle;
import android.support.design.widget.FloatingActionButton;
import android.support.design.widget.TextInputEditText;
import androidx.appcompat.app.AppCompatActivity;
import android.support.v7.widget.LinearLayoutManager;
import androidx.recyclerview.widget.RecyclerView;
import android.support.v7.widget.Toolbar;
import android.view.View;
import android.widget.ArrayAdapter;
import android.widget.Button;
import android.widget.CheckBox;
import android.widget.Spinner;
import android.widget.Toast;

import com.tutorials.hp.mysqlrecyclerbool.mAdapter.MyAdapter;
import com.tutorials.hp.mysqlrecyclerbool.mModel.Spacecraft;
import com.tutorials.hp.mysqlrecyclerbool.mMySQL.MySQLClient;

import java.util.ArrayList;

public class MainActivity extends AppCompatActivity {

    //INSTANCE FIELDS
    private TextInputEditText txtName;
    private CheckBox chkTechnologyExists;
    private Spinner spPropellant;
    private RecyclerView rv;
    private Button btnAdd,btnRetrieve;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);
        Toolbar toolbar = (Toolbar) findViewById(R.id.toolbar);
        setSupportActionBar(toolbar);

        //REFERENCE VIEWS
        this.initializeViews();

        populatePropellants();

        //HANDLE EVENTS
        this.handleClickEvents();

        FloatingActionButton fab = (FloatingActionButton) findViewById(R.id.fab);
        fab.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View view) {
                rv.setAdapter(new MyAdapter(MainActivity.this,new ArrayList<Spacecraft>()));
            }
        });

    }

    /*
    REFERENCE VIEWS
     */
    private void initializeViews()
    {

        txtName= (TextInputEditText) findViewById(R.id.nameTxt);
        chkTechnologyExists= (CheckBox) findViewById(R.id.techExists);
        spPropellant= (Spinner) findViewById(R.id.sp);
        rv= (RecyclerView) findViewById(R.id.rv);

        btnAdd= (Button) findViewById(R.id.addBtn);
        btnRetrieve= (Button) findViewById(R.id.refreshBtn);

        rv.setLayoutManager(new LinearLayoutManager(MainActivity.this));

    }

    /*
    HANDLE CLICK EVENTS
     */
    private void handleClickEvents()
    {
        //EVENTS : ADD
        btnAdd.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View view) {

                //GET VALUES
                String name=txtName.getText().toString();
                String propellant=spPropellant.getSelectedItem().toString();
                Boolean technologyexists=chkTechnologyExists.isChecked();

                //BASIC CLIENT SIDE VALIDATION
                if((name.length()<1 || propellant.length()<1  ))
                {
                    Toast.makeText(MainActivity.this, "Please Enter all Fields", Toast.LENGTH_SHORT).show();
                }
                else
                {
                    //SAVE

                    Spacecraft s=new Spacecraft();
                    s.setName(name);
                    s.setPropellant(propellant);
                    s.setTechnologyExists(technologyexists ? 1 : 0);

                    new MySQLClient(MainActivity.this).add(s,txtName,spPropellant);
                }
            }
        });

        //EVENTS : RETRIEVE
        btnRetrieve.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View view) {
                new MySQLClient(MainActivity.this).retrieve(rv);

            }
        });

    }

    private void populatePropellants()
    {
        ArrayAdapter<String> adapter=new ArrayAdapter<String>(this,android.R.layout.simple_spinner_dropdown_item);

        adapter.add("None");
        adapter.add("Chemical Energy");
        adapter.add("Nuclear Energy");
        adapter.add("Laser Beam");
        adapter.add("Anti-Matter");
        adapter.add("Plasma Ions");
        adapter.add("Warp Drive");

        spPropellant.setAdapter(adapter);
        spPropellant.setSelection(0);

    }
}
```

#### AndroidManifest.xml

Make sure you add permission for internet connectivity.

```xml
<?xml version="1.0" encoding="utf-8"?>
<manifest
    package="com.tutorials.hp.mysqlrecyclerbool">

    <uses-permission android_name="android.permission.INTERNET"/>

    <application
        android_allowBackup="true"
        android_icon="@mipmap/ic_launcher"
        android_label="@string/app_name"
        android_supportsRtl="true"
        android_theme="@style/AppTheme">
        <activity
            android_name=".MainActivity"
            android_label="@string/app_name"
            android_theme="@style/AppTheme.NoActionBar">
            <intent-filter>
                <action android_name="android.intent.action.MAIN" />

                <category android_name="android.intent.category.LAUNCHER" />
            </intent-filter>
        </activity>
    </application>

</manifest>
```

#### Download

Hey,everything is in source code reference that is well commented and easy to understand and can be downloaded below.

Also check our video tutorial it's more detailed and explained in step by step.

| No. | Location | Link |
| --- | --- | --- |
| 1. | GitHub | [Direct Download](https://github.com/Oclemy/MySQL-Recycler-Boolean/archive/master.zip) |
| 2. | GitHub | [Browse](https://github.com/Oclemy/MySQL-Recycler-Boolean) |
| 3. | YouTube | [Video Tutorial](https://www.youtube.com/watch?v=ExTedrLWupE) |
