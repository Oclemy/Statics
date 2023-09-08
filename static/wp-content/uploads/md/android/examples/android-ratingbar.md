# Kotlin Android RatingBar Examples


How If you plan to provide rating capability in your app then you are in luck. Android SDK already includes a widget you can use. It is the aim of this tutorial to teach you how you can use this widget via step by step practical examples.


## Example 1: Kotlin Android Rating Bar Example

The first example introduces you to how to use a ratingbar in android. This example is written in kotlin

Here is the demo of what is built:

![Kotlin Android RatingBar Example](https://github.com/alirezabashi98/test-RatingBar/raw/master/scr001.png)

### Step 1: Create Project

Start by creating an android project using android studio.

### Step 2: Dependencies

No external dependency is needed.

### Step 3: Add RatingBar

Now add a ratingbar to your main activity layout as follows:

```xml
<?xml version="1.0" encoding="utf-8"?>
<LinearLayout xmlns:android="http://schemas.android.com/apk/res/android"
    xmlns:app="http://schemas.android.com/apk/res-auto"
    xmlns:tools="http://schemas.android.com/tools"
    android:layout_width="match_parent"
    android:layout_height="match_parent"
    tools:context=".MainActivity"
    android:orientation="vertical"
    android:layout_gravity="center"
    android:gravity="center">

    <RatingBar
        android:id="@+id/ratingBar"
        android:layout_width="wrap_content"
        android:layout_height="wrap_content"
        android:rating="5"
        android:numStars="5"/>

    <Button
        android:id="@+id/btn"
        android:layout_width="match_parent"
        android:layout_height="wrap_content"
        android:text="Number of selected"/>

</LinearLayout>
```

### Step 4: Write Code

The next step is to write the main activity code. The code is written in kotlin. Basically the user clicks a button to get the number of selected stars in the ratingbar. You are basically getting the rating:

```kotlin
import androidx.appcompat.app.AppCompatActivity
import android.os.Bundle
import android.widget.Toast
import kotlinx.android.synthetic.main.activity_main.*

class MainActivity : AppCompatActivity() {

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_main)

        btn.setOnClickListener {
            Toast.makeText(applicationContext,"${ratingBar.rating} stars selected",Toast.LENGTH_SHORT).show()
        }
    }
}
```

### Run

Lastly run the project.

### References

The links are below:

| No. | Link |
| --- | --- |
| 1. | [Download](https://github.com/alirezabashi98/test-RatingBar/archive/refs/heads/master.zip) code. |
| 1. | [Browse](https://github.com/alirezabashi98/test-RatingBar/) code. |
| 1. | [Follow](https://github.com/alirezabashi98/test-RatingBar/archive/refs/heads/master.zip) code author. |

# Examples using Libraries

We've seen how to use ratingbar without third party libraries. However if the provided standard sdk ratingbar does not meet your needs then you may look at third party solutions.

For example you may need animated ratingbar, you may need to use custom drawables, change ratingbar sizes etc. In this section we will look at some of those.

## Example 1: Kotlin Android RatingBar with Animations Example

This example will show you how to implement a ratingbar with animations. Check the demo of what is created below:

![Kotlin Android RatingBar with Animations](https://github.com/damanpreetsb/RatingBar/raw/master/preview/demo.gif?raw=true)

### Step 1: Install Library

Your first task is to install the necessary library as below:

```groovy
dependencies {
            implementation 'com.github.damanpreetsb:RatingBar:v1.0'
    }
```

Make sure you specify jitpack as maven repository in your project-level build.gradle:

```groovy
allprojects {
        repositories {
            ...
            maven { url "https://jitpack.io" }
        }
    }
```

### Step 2: Add RatingBar to layout

In your layout add the following:

```xml
 <com.daman.library.SimpleRatingBar
        android:layout_width="wrap_content"
        android:layout_height="wrap_content"
        app:total_stars="3"
        app:animation="alpha" />
```

You can use custom drawables:

```xml
 <com.daman.library.SimpleRatingBar
        android:layout_width="wrap_content"
        android:layout_height="wrap_content"
        app:total_stars="3"
        app:animation="alpha"
        app:drawable_empty="@drawable/ic_favorite_border_black_24dp"
        app:drawable_filled="@drawable/ic_favorite_black_24dp"  />
```

You can see how the animations are being applied declaratively. Here are the animations included:

- `alpha`
- `rotation`
- `scale`
- `ring`
- `flip`

Here's the full layout code with different animations:

```xml
<?xml version="1.0" encoding="utf-8"?>
<LinearLayout
    xmlns:android="http://schemas.android.com/apk/res/android"
    xmlns:tools="http://schemas.android.com/tools"
    xmlns:app="http://schemas.android.com/apk/res-auto"
    android:layout_width="match_parent"
    android:layout_height="match_parent"
    android:orientation="vertical"
    tools:context=".MainActivity">

    <com.daman.library.SimpleRatingBar
        android:layout_width="wrap_content"
        android:layout_height="wrap_content"
        app:total_stars="3"/>

    <com.daman.library.SimpleRatingBar
        android:layout_width="wrap_content"
        android:layout_height="wrap_content"
        app:total_stars="3"
        app:animation="alpha"/>

    <com.daman.library.SimpleRatingBar
        android:layout_width="wrap_content"
        android:layout_height="wrap_content"
        app:total_stars="4"
        app:animation="rotation"/>

    <com.daman.library.SimpleRatingBar
        android:layout_width="wrap_content"
        android:layout_height="wrap_content"
        app:total_stars="5"
        app:animation="scale"/>

    <com.daman.library.SimpleRatingBar
        android:layout_width="wrap_content"
        android:layout_height="wrap_content"
        app:total_stars="6"
        app:animation="ring"/>

    <com.daman.library.SimpleRatingBar
        android:layout_width="wrap_content"
        android:layout_height="wrap_content"
        app:total_stars="6"
        app:animation="flip"
        app:drawable_empty="@drawable/ic_favorite_border_black_24dp"
        app:drawable_filled="@drawable/ic_favorite_black_24dp"/>

</LinearLayout>
```

### Step 3: Write Code

In this case we have a bare activity but you can reference the ratingbar and get it's values:

```kotlin
class MainActivity : AppCompatActivity() {

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_main)
    }
}
```

### Run

Lastly run the project.

### Reference

Find links below:

| No. | Link |
| --- | --- |
| 1. | [Download](https://github.com/damanpreetsb/RatingBar/archive/refs/heads/master.zip) code |
| 2. | [Browse](https://github.com/damanpreetsb/RatingBar) code |
| 3. | [Follow](https://github.com/damanpreetsb/RatingBar/archive/refs/heads/master.zip) code author |

## Example 2: Kolin Android - Sync ProgressBar with RatingBar

The concept is to use a ratingbar value, which can be changed at runtime to update the progressbar.

Check the demo below:

![Kolin Android - Sync ProgressBar with RatingBar](https://github.com/kaju2525/RatingBar-and-ProgressBar/blob/master/images/rating%20and%20progress%20bar.png?raw=true)

### Step 1: Install RatingBars

A third party ratinbar is used but you can use the native one. Also a roundcorner progressbar has been used. They are installed using the following implementation statements:

```groovy
    implementation 'com.akexorcist:RoundCornerProgressBar:2.0.3'
    implementation 'me.zhanghai.android.materialratingbar:library:1.0.2'
```

### Design Layout

Teh following code will give the layout you've sen in the demo:

```xml
<?xml version="1.0" encoding="utf-8"?>
<LinearLayout
    xmlns:android="http://schemas.android.com/apk/res/android"
    xmlns:app="http://schemas.android.com/apk/res-auto"
    xmlns:tools="http://schemas.android.com/tools"
    android:layout_width="match_parent"
    android:layout_height="match_parent"
    android:padding="10dp"
    android:orientation="vertical">

    <ScrollView
        android:scrollbars="none"
        android:layout_width="match_parent"
        android:layout_height="wrap_content">

   <LinearLayout
       android:layout_marginBottom="20dp"
       android:orientation="vertical"
       android:layout_width="match_parent"
       android:layout_height="wrap_content">
    <android.support.v7.widget.CardView
        app:cardElevation="5dp"
        android:layout_width="match_parent"
        android:layout_height="wrap_content">

        <ImageView
            android:scaleType="fitXY"
            android:layout_width="match_parent"
            android:layout_height="200dp"
            android:src="@drawable/icon"
            />

    </android.support.v7.widget.CardView>

    <android.support.v7.widget.CardView
        android:layout_marginTop="20dp"
        app:cardElevation="5dp"
        android:layout_width="match_parent"
        android:layout_height="wrap_content">

        <LinearLayout
            android:layout_width="match_parent"
            android:layout_height="match_parent"
            android:padding="10dp"
            android:layout_marginBottom="10dp"
            android:orientation="vertical">

            <TextView
                android:layout_gravity="center_horizontal"
                android:layout_width="wrap_content"
                android:layout_height="wrap_content"
                android:layout_marginTop="10dp"
                android:text="Averge Rating 4.0"
                android:textSize="21sp"
                android:textAppearance="?android:attr/textAppearanceLarge"
                android:textColor="?android:attr/textColorPrimary" />

            <me.zhanghai.android.materialratingbar.MaterialRatingBar
                android:id="@+id/ratingbar"
                android:layout_marginTop="10dp"
                android:layout_width="wrap_content"
                android:layout_gravity="center_horizontal"
                android:layout_height="40dp"
                android:minHeight="192dp"
                android:maxHeight="192dp"
                app:mrb_progressBackgroundTint="@color/p5"
                app:mrb_progressTint="@color/p2"
                app:mrb_secondaryProgressTint="@color/p2"
                android:numStars="5"
                android:rating="2.5"
                android:stepSize="0.1" />

    <LinearLayout
    android:layout_marginTop="15dp"
    android:weightSum="4"
    android:orientation="horizontal"
    android:layout_width="match_parent"
    android:layout_height="wrap_content">

    <TextView
        android:layout_weight="0.1"
        android:text="1"
        android:textSize="15sp"
        android:layout_width="0dp"
        android:layout_height="wrap_content" />

    <ImageView
        android:layout_weight="0.6"
        android:layout_width="0dp"
        android:layout_height="wrap_content"
        android:gravity="center"
        android:src="@android:drawable/star_off"
        />

    <com.akexorcist.roundcornerprogressbar.RoundCornerProgressBar
        android:layout_weight="3"
        android:id="@+id/progress_1"
        android:layout_width="0dp"
        android:layout_height="25dp"
        app:rcBackgroundColor="#bfbfbf" />

      <TextView
          android:gravity="center"
          android:layout_marginLeft="5dp"
          android:layout_weight=".3"
          android:id="@+id/val"
          android:layout_width="0dp"
          android:layout_height="wrap_content"
          android:text="20"
          />

</LinearLayout>
    <LinearLayout
        android:layout_marginTop="10dp"
        android:weightSum="4"
        android:orientation="horizontal"
        android:layout_width="match_parent"
        android:layout_height="wrap_content">

        <TextView
            android:layout_weight="0.1"
            android:text="2"
            android:textSize="15sp"
            android:layout_width="0dp"
            android:layout_height="wrap_content" />

        <ImageView
            android:layout_weight="0.6"
            android:layout_width="0dp"
            android:layout_height="wrap_content"
            android:gravity="center"
            android:src="@android:drawable/star_off"
            />

        <com.akexorcist.roundcornerprogressbar.RoundCornerProgressBar
            android:layout_weight="3"
            android:id="@+id/progress_2"
            android:layout_width="0dp"
            android:layout_height="25dp"
            app:rcBackgroundColor="#bfbfbf" />

        <TextView
            android:gravity="center"
            android:layout_marginLeft="5dp"
            android:layout_weight=".3"
            android:id="@+id/val2"
            android:layout_width="0dp"
            android:layout_height="wrap_content"
            android:text="73"
            />

    </LinearLayout>
    <LinearLayout
        android:layout_marginTop="10dp"
        android:weightSum="4"
        android:orientation="horizontal"
        android:layout_width="match_parent"
        android:layout_height="wrap_content">

        <TextView
            android:layout_weight="0.1"
            android:text="3"
            android:textSize="15sp"
            android:layout_width="0dp"
            android:layout_height="wrap_content" />

        <ImageView
            android:layout_weight="0.6"
            android:layout_width="0dp"
            android:layout_height="wrap_content"
            android:gravity="center"
            android:src="@android:drawable/star_off"
            />

        <com.akexorcist.roundcornerprogressbar.RoundCornerProgressBar
            android:layout_weight="3"
            android:id="@+id/progress_3"
            android:layout_width="0dp"
            android:layout_height="25dp"
            app:rcBackgroundColor="#bfbfbf" />

        <TextView
            android:gravity="center"
            android:layout_marginLeft="5dp"
            android:layout_weight=".3"
            android:id="@+id/val3"
            android:layout_width="0dp"
            android:layout_height="wrap_content"
            android:text="57"
            />

    </LinearLayout>
    <LinearLayout
        android:layout_marginTop="10dp"
        android:weightSum="4"
        android:orientation="horizontal"
        android:layout_width="match_parent"
        android:layout_height="wrap_content">

        <TextView
            android:layout_weight="0.1"
            android:text="4"
            android:textSize="15sp"
            android:layout_width="0dp"
            android:layout_height="wrap_content" />

        <ImageView
            android:layout_weight="0.6"
            android:layout_width="0dp"
            android:layout_height="wrap_content"
            android:gravity="center"
            android:src="@android:drawable/star_off"
            />

        <com.akexorcist.roundcornerprogressbar.RoundCornerProgressBar
            android:layout_weight="3"
            android:id="@+id/progress_4"
            android:layout_width="0dp"
            android:layout_height="25dp"
            app:rcBackgroundColor="#bfbfbf" />

        <TextView
            android:gravity="center"
            android:layout_marginLeft="5dp"
            android:layout_weight=".3"
            android:id="@+id/val4"
            android:layout_width="0dp"
            android:layout_height="wrap_content"
            android:text="70"
            />

    </LinearLayout>
    <LinearLayout
        android:layout_marginTop="10dp"
        android:weightSum="4"
        android:orientation="horizontal"
        android:layout_width="match_parent"
        android:layout_height="wrap_content">

        <TextView
            android:layout_weight="0.1"
            android:text="5"
            android:textSize="15sp"
            android:layout_width="0dp"
            android:layout_height="wrap_content" />

        <ImageView
            android:layout_weight="0.6"
            android:layout_width="0dp"
            android:layout_height="wrap_content"
            android:gravity="center"
            android:src="@android:drawable/star_off"
            />

        <com.akexorcist.roundcornerprogressbar.RoundCornerProgressBar
            android:layout_weight="3"
            android:id="@+id/progress_5"
            android:layout_width="0dp"
            android:layout_height="25dp"
            app:rcBackgroundColor="#bfbfbf" />

        <TextView
            android:gravity="center"
            android:layout_marginLeft="5dp"
            android:layout_weight=".3"
            android:id="@+id/val5"
            android:layout_width="0dp"
            android:layout_height="wrap_content"
            android:text="90"
            />

    </LinearLayout>

        </LinearLayout>
    </android.support.v7.widget.CardView>

   </LinearLayout>

    </ScrollView>

</LinearLayout>
```

### Step 3: Write Code

Here is the code for the main activity:

**MainActivity.kt**

```kotlin
class MainActivity : AppCompatActivity() {

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_main)

      /*  <color name="p1">#FF4081</color>
        <color name="p2">#0ece1b</color>
        <color name="p3">#1f08cf</color>
        <color name="p4">#ffea2d</color>
        <color name="p5">#0bd4c3</color>
        compile 'com.akexorcist:RoundCornerProgressBar:2.0.3'
        compile 'me.zhanghai.android.materialratingbar:library:1.0.2'
        compile 'com.android.support:cardview-v7:26.0.1'
*/

     ratingbar.setOnRatingChangeListener { ratingBar, rating ->
      Toast.makeText(applicationContext,"Your rate : $rating",Toast.LENGTH_SHORT).show()
     }

        progress_1.setProgressColor(ContextCompat.getColor(this,R.color.p1));
        progress_1.setProgressBackgroundColor(Color.parseColor("#808080"));
        progress_1.setMax(100.0f);
        progress_1.setProgress(20.0f);

        progress_2.setProgressColor(ContextCompat.getColor(this,R.color.p2));
        progress_2.setProgressBackgroundColor(Color.parseColor("#808080"));
        progress_2.setMax(100.0f);
        progress_2.setProgress(73.0f);

        progress_3.setProgressColor(ContextCompat.getColor(this,R.color.p3));
        progress_3.setProgressBackgroundColor(Color.parseColor("#808080"));
        progress_3.setMax(100.0f);
        progress_3.setProgress(57.0f);

        progress_4.setProgressColor(ContextCompat.getColor(this,R.color.p4));
        progress_4.setProgressBackgroundColor(Color.parseColor("#808080"));
        progress_4.setMax(100.0f);
        progress_4.setProgress(70.0f);

        progress_5.setProgressColor(ContextCompat.getColor(this,R.color.p5));
        progress_5.setProgressBackgroundColor(Color.parseColor("#808080"));
        progress_5.setMax(100.0f);
        progress_5.setProgress(90.0f);

    }
}

/*
RoundCornerProgressBar progress1 = (RoundCornerProgressBar) findViewById(R.id.progress_1);
progress1.setProgressColor(Color.parseColor("#ed3b27"));
progress1.setProgressBackgroundColor(Color.parseColor("#808080"));
progress1.setMax(70);
progress1.setProgress(15);
int progressColor1 = progress1.getProgressColor();
int backgroundColor1 = progress1.getProgressBackgroundColor();
int max1 = progress1.getMax();
int progress1 = progress1.getProgress();
RoundCornerProgressBar progress2 = (RoundCornerProgressBar) findViewById(R.id.progress_1);
progress2.setProgressColor(Color.parseColor("#56d2c2"));
progress2.setProgressBackgroundColor(Color.parseColor("#757575"));
progress2.setIconBackgroundColor(Color.parseColor("#38c0ae"));
progress2.setMax(550);
progress2.setProgress(147);
progress2.setIconImageResource(imageResource);
int progressColor2 = progress2.getProgressColor();
int backgroundColor2 = progress2.getProgressBackgroundColor();
int headerColor2 = progress2.getColorIconBackground();
int max2 = progress2.getMax();
int progress2 = progress2.getProgress();*/
```

### Run

Run the project.

### Reference

Here are the download links:

| No. | Link |
| --- | --- |
| 1. | [Download](https://github.com/kaju2525/RatingBar-and-ProgressBar/archive/refs/heads/master.zip) code. |
| 2. | [Browse](https://github.com/kaju2525/RatingBar-and-ProgressBar/) code. |
| 3. | [Follow](https://github.com/kaju2525/) code author. |

## Example 3: Android RecyclerView - With RatingBar,Images and Text

Ratingbars help us rate content and products. They are especially common in the web where content is plentiful.

Ratingbars help influence others opinions of the quality of content or product. Android also has a ratingbar widget that can help to easily rate anything imaginable.

So here we look at Android RecylerView with RatingBar. The RecyclerView shall comprise CardViews that have image,text and ratingbar. Users can then rate a single card and its contents.

We shall be setting the RatingBar values in our java code. We have a maximum of five stars but you can specify the quantity you desire in your XML code. We are using SimpleRatingBar library.

### STEP 1 : Create Project

The first step is to create our project in android studio. We've chosen the basic activity as our template in android studio.

### Step 2 : Our Build.Gradle

We then add our SimpleRatingBar as well as our CardView dependencies in our build.gradle.

```groovy
dependencies {
    implementation 'com.iarcuschin:simpleratingbar:0.1.3'

}
```

### Step 3 : Add Images

We also add images to our drawable folder from our computer.Am using Spacecraft images.

### Step 4 : ActivityMain Layout

Heres our activity main.xml. It was generated by android studio when we chose the basic activity.

```xml
<?xml version="1.0" encoding="utf-8"?>
<android.support.design.widget.CoordinatorLayout

    android_layout_width="match_parent"
    android_layout_height="match_parent"
    android_fitsSystemWindows="true"
    tools_context="com.tutorials.hp.recyclerviewratingbar.MainActivity">

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

### Step 5 : ContentMain Layout

- We add the RecyclerView in our ContentMain.xml.
- Give it an id.

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
    tools_context="com.tutorials.hp.recyclerviewratingbar.MainActivity"
    tools_showIn="@layout/activity_main">

    <android.support.v7.widget.RecyclerView
        android_id="@+id/rv"
        android_layout_width="match_parent"
        android_layout_height="wrap_content"
        />
</RelativeLayout>
```

### Step 4 : Model Layout

- Our model.xml layout shall get inflated into our RecyclerView viewitmes.
- We have CardView as our root layout.
- Each card then contains RatingBar,image and textview.

```xml
<?xml version="1.0" encoding="utf-8"?>
<android.support.v7.widget.CardView

    android_orientation="horizontal"
    android_layout_width="match_parent"

    android_layout_margin="5dp"
    card_view_cardCornerRadius="10dp"
    card_view_cardElevation="5dp"
    android_layout_height="300dp">

    <LinearLayout
        android_orientation="vertical"
        android_layout_width="match_parent"
        android_layout_height="match_parent">

        <ImageView
            android_layout_width="wrap_content"
            android_layout_height="220dp"
            android_id="@+id/spacecraftImage"
            android_padding="5dp"
            android_src="@drawable/enterprise" />

    <LinearLayout
        android_orientation="horizontal"
        android_layout_width="match_parent"
        android_layout_height="wrap_content"
        android_layout_weight="2">
        <TextView
            android_layout_width="wrap_content"
            android_layout_height="wrap_content"
            android_textAppearance="?android:attr/textAppearanceLarge"
            android_text="Name"
            android_id="@+id/nameTxt"
            android_padding="5dp"
            android_layout_weight="1" />

        <com.iarcuschin.simpleratingbar.SimpleRatingBar
            android_id="@+id/ratingBarID"
            android_layout_width="wrap_content"
            android_layout_height="wrap_content"
            android_padding="5dp"
            app_srb_starSize="40dp"
            app_srb_numberOfStars="5"
            app_srb_rating="3"
            app_srb_stepSize="1"
            app_srb_borderColor="@color/colorPrimaryDark"
            app_srb_fillColor="@color/colorPrimary"
            android_layout_alignBottom="@+id/spacecraftImage"
            android_layout_alignParentRight="true"
            />
        </LinearLayout>

    </LinearLayout>
</android.support.v7.widget.CardView>
```

### Step 7 : Spaceship class

- This is our model class.

```java
package com.tutorials.hp.recyclerviewratingbar.mData;

public class Spaceship {

    /*
    SPACESHIP PROPERTIES
     */
    private int rating;
    private String name;
    private int image;

    /*
    GETTERS AND SETTERTS
     */
    public float getRating() {
        return rating;
    }

    public void setRating(int rating) {
        this.rating = rating;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public int getImage() {
        return image;
    }

    public void setImage(int image) {
        this.image = image;
    }
}
```

### Step 8 : SpaceshipsCollections

- This class contians a static method that shall return as an arraylist of spacecrafts.

```java
public class SpaceshipsCollection{
    /*
    1.CREATE SPACESHIP OBJECTS AND ASSIGN THEM PROPERTIES
    2.RETURN LIST OF THESE SPACESHIP OBJECTS
     */
    public static ArrayList<Spaceship> getSpaceships()
    {
        ArrayList<Spaceship> spaceships=new ArrayList<>();

        Spaceship s=new Spaceship();
        s.setName("Spitzer");
        s.setRating(4);
        s.setImage(R.drawable.spitzer);
        spaceships.add(s);

        s=new Spaceship();
        s.setName("Enterpise");
        s.setRating(3);
        s.setImage(R.drawable.enterprise);
        spaceships.add(s);

        s=new Spaceship();
        s.setName("Voyager");
        s.setRating(5);
        s.setImage(R.drawable.voyager);
        spaceships.add(s);

        s=new Spaceship();
        s.setName("Opportunity");
        s.setRating(3);
        s.setImage(R.drawable.opportunity);
        spaceships.add(s);

        s=new Spaceship();
        s.setName("Pioneer");
        s.setRating(2);
        s.setImage(R.drawable.pioneer);
        spaceships.add(s);

        s=new Spaceship();
        s.setName("WMAP");
        s.setRating(4);
        s.setImage(R.drawable.wmap);
        spaceships.add(s);

        s=new Spaceship();
        s.setName("Rosetter");
        s.setRating(1);
        s.setImage(R.drawable.rosetta);
        spaceships.add(s);

        s=new Spaceship();
        s.setName("Hubble");
        s.setRating(5);
        s.setImage(R.drawable.hubble);
        spaceships.add(s);

        return spaceships;
    }

}
```

### Step 9 : RecyclerView Adapter

- Here's our RecyclerView Adapter.
- It has an inner MyHolder class that extends RecyclerView.ViewHolder.

```java
public class RecyclerAdapter extends RecyclerView.Adapter<RecyclerAdapter.MyHolder> {

    private ArrayList<Spaceship> spaceships;
    private Context c;

    public RecyclerAdapter(Context c,ArrayList<Spaceship> spaceships) {
        this.spaceships = spaceships;
        this.c = c;
    }

    /*
    INITIALIZE VIEWHOLDER
     */

    @Override
    public MyHolder onCreateViewHolder(ViewGroup parent, int viewType) {
        View v= LayoutInflater.from(c).inflate(R.layout.model,parent,false);
        return new MyHolder(v);
    }

    /*
    BIND
     */
    @Override
    public void onBindViewHolder(MyHolder holder, int position) {
        Spaceship s=spaceships.get(position);

        holder.nameTxt.setText(s.getName());
        holder.img.setImageResource(s.getImage());
        holder.ratingBar.setRating(s.getRating());
    }

    /*
    TOTAL SPACECRAFTS NUM
     */
    @Override
    public int getItemCount() {
        return spaceships.size();
    }

    /*
    VIEW HOLDER CLASS
     */
    class MyHolder extends RecyclerView.ViewHolder
    {

        TextView nameTxt;
        ImageView img;
        SimpleRatingBar ratingBar;

        public MyHolder(View itemView) {
            super(itemView);

            nameTxt= (TextView) itemView.findViewById(R.id.nameTxt);
            img= (ImageView) itemView.findViewById(R.id.spacecraftImage);
            ratingBar= (SimpleRatingBar) itemView.findViewById(R.id.ratingBarID);

        }
    }
}
```

### Step  11 : MainActivity

- Finally our MainActivity is here.
- Initialize RecyclerView then sets its LayoutManager.
- Also set its adapter.

```java

public class MainActivity extends AppCompatActivity {

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);
        Toolbar toolbar = (Toolbar) findViewById(R.id.toolbar);
        setSupportActionBar(toolbar);

        RecyclerView rv= (RecyclerView) findViewById(R.id.rv);
        rv.setLayoutManager(new LinearLayoutManager(this));
        rv.setAdapter(new RecyclerAdapter(this, SpaceshipsCollection.getSpaceships()));

        FloatingActionButton fab = (FloatingActionButton) findViewById(R.id.fab);
        fab.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View view) {
                Snackbar.make(view, "Replace with your own action", Snackbar.LENGTH_LONG)
                        .setAction("Action", null).show();
            }
        });
    }

}
```

## Android ListView – With RatingBar, Images and Text

_Android ListView - With RatingBar, Images and Text Tutorial and Example._

Lets see how to work with a Custom ListView with RatingBar.

Moreover, the ListView shall hava images and text. We shall be using five stars in our ratingbar, and set their values programmatically in java code.

When the user clicks a single ListView viewitem, we display the value of the associated card.Our viewitems shall be cardviews. We are using SimpleRatingBar library. We shall set the ratingbar properties in xml code, e.g number of stars, step size, star size etc.

##### **STEP 1 : Build.Gradle.**

- Add Dependency for CardView and SimpleRatingBar.
- Then sync.SimpleRatingBar is fetched from online.

```groovy
dependencies {
    implementation 'com.iarcuschin:simpleratingbar:0.1.3'

}
```

##### **STEP 2 : Add Images**

- Just add images to your drawable folder.Our recyclerview shall be displaying images.

##### **STEP 3 : ActivityMain.xml**

- This is a layout that gets generated by android studio in case you chose Basic Activity as template during project creation.

```xml
<?xml version="1.0" encoding="utf-8"?>
<android.support.design.widget.CoordinatorLayout

    android_layout_width="match_parent"
    android_layout_height="match_parent"
    android_fitsSystemWindows="true"
    tools_context="com.tutorials.hp.listviewratingbar.MainActivity">

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

##### **STEP 4 : ContentMain.xml**

-  Add the ListView here.

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
    tools_context="com.tutorials.hp.listviewratingbar.MainActivity"
    tools_showIn="@layout/activity_main">

    <ListView
        android_id="@+id/lv"
        android_layout_width="match_parent"
        android_layout_height="wrap_content"
        />
</RelativeLayout>
```

##### **STEP 5 : Model.xml**

- Our model layout.
- We add imageview,textview and ratingbar.
- Set the ratingbar properties like number of stars and step size here.Also the colors.

```xml
<?xml version="1.0" encoding="utf-8"?>
<android.support.v7.widget.CardView

    android_orientation="horizontal"
    android_layout_width="match_parent"

    android_layout_margin="5dp"
    card_view_cardCornerRadius="10dp"
    card_view_cardElevation="5dp"
    android_layout_height="300dp">

    <LinearLayout
        android_orientation="vertical"
        android_layout_width="match_parent"
        android_layout_height="match_parent">

        <ImageView
            android_layout_width="wrap_content"
            android_layout_height="220dp"
            android_id="@+id/spacecraftImage"
            android_padding="5dp"
            android_src="@drawable/enterprise" />

        <LinearLayout
            android_orientation="horizontal"
            android_layout_width="match_parent"
            android_layout_height="wrap_content"
            android_layout_weight="2">
            <TextView
                android_layout_width="wrap_content"
                android_layout_height="wrap_content"
                android_textAppearance="?android:attr/textAppearanceLarge"
                android_text="Name"
                android_id="@+id/nameTxt"
                android_padding="5dp"
                android_layout_weight="1" />

            <com.iarcuschin.simpleratingbar.SimpleRatingBar
                android_id="@+id/ratingBarID"
                android_layout_width="wrap_content"
                android_layout_height="wrap_content"
                android_padding="5dp"
                app_srb_starSize="40dp"
                app_srb_numberOfStars="5"
                app_srb_rating="3"
                app_srb_stepSize="1"
                app_srb_borderColor="@color/colorPrimaryDark"
                app_srb_fillColor="@color/colorPrimary"
                android_layout_alignBottom="@+id/spacecraftImage"
                android_layout_alignParentRight="true"
                />
        </LinearLayout>

    </LinearLayout>
</android.support.v7.widget.CardView>
```

##### **STEP 6  : Spaceship class**

- This is our data object class.

```java
package com.tutorials.hp.listviewratingbar.mData;

public class Spaceship {

    /*
    SPACESHIP PROPERTIES
     */
    private int rating;
    private String name;
    private int image;

    /*
    GETTERS AND SETTERTS
     */
    public float getRating() {
        return rating;
    }

    public void setRating(int rating) {
        this.rating = rating;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public int getImage() {
        return image;
    }

    public void setImage(int image) {
        this.image = image;
    }
}
```

##### **STEP 7 : SpaceshipCollection class**

- Exposes a static method that acts as our data source.

```java
package com.tutorials.hp.listviewratingbar.mData;

import com.tutorials.hp.listviewratingbar.R;

import java.util.ArrayList;

public class SpaceshipsCollection{

    /*
    1.CREATE SPACESHIP OBJECTS AND ASSIGN THEM PROPERTIES
    2.RETURN LIST OF THESE SPACESHIP OBJECTS
     */

    public static ArrayList<Spaceship> getSpaceships()
    {
        ArrayList<Spaceship> spaceships=new ArrayList<>();

        Spaceship s=new Spaceship();
        s.setName("Spitzer");
        s.setRating(4);
        s.setImage(R.drawable.spitzer);
        spaceships.add(s);

        s=new Spaceship();
        s.setName("Enterpise");
        s.setRating(3);
        s.setImage(R.drawable.enterprise);
        spaceships.add(s);

        s=new Spaceship();
        s.setName("Voyager");
        s.setRating(5);
        s.setImage(R.drawable.voyager);
        spaceships.add(s);

        s=new Spaceship();
        s.setName("Opportunity");
        s.setRating(3);
        s.setImage(R.drawable.opportunity);
        spaceships.add(s);

        s=new Spaceship();
        s.setName("Pioneer");
        s.setRating(2);
        s.setImage(R.drawable.pioneer);
        spaceships.add(s);

        s=new Spaceship();
        s.setName("WMAP");
        s.setRating(4);
        s.setImage(R.drawable.wmap);
        spaceships.add(s);

        s=new Spaceship();
        s.setName("Rosetter");
        s.setRating(1);
        s.setImage(R.drawable.rosetta);
        spaceships.add(s);

        s=new Spaceship();
        s.setName("Hubble");
        s.setRating(5);
        s.setImage(R.drawable.hubble);
        spaceships.add(s);

        return spaceships;
    }

}
```

##### **STEP 8  : CustomAdapter class**

- Our adapter class.
- Binds our dataset to our listview.
- Inflates the model layout to viewitem.

```java
package com.tutorials.hp.listviewratingbar.mAdapterView;

import android.content.Context;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.BaseAdapter;
import android.widget.ImageView;
import android.widget.TextView;
import android.widget.Toast;

import com.iarcuschin.simpleratingbar.SimpleRatingBar;
import com.tutorials.hp.listviewratingbar.R;
import com.tutorials.hp.listviewratingbar.mData.Spaceship;

import java.util.ArrayList;

public class CustomAdapter extends BaseAdapter {

    private ArrayList<Spaceship> spaceships;
    private Context c;

    public CustomAdapter(Context c,ArrayList<Spaceship> spaceships) {
        this.spaceships = spaceships;
        this.c = c;
    }

    @Override
    public int getCount() {
        return spaceships.size();
    }

    @Override
    public Object getItem(int i) {
        return spaceships.get(i);
    }

    @Override
    public long getItemId(int i) {
        return i;
    }

    /*
    INFLATE XML LAYOUT TO VIEW
     */
    @Override
    public View getView(int pos, View view, ViewGroup viewGroup) {
        if(view==null)
        {
            view= LayoutInflater.from(c).inflate(R.layout.model,viewGroup,false);
        }

        TextView nameTxt= (TextView) view.findViewById(R.id.nameTxt);
        ImageView img= (ImageView) view.findViewById(R.id.spacecraftImage);
        SimpleRatingBar ratingBar= (SimpleRatingBar) view.findViewById(R.id.ratingBarID);

        final Spaceship s= (Spaceship) this.getItem(pos);

        nameTxt.setText(s.getName());
        ratingBar.setRating(s.getRating());
        img.setImageResource(s.getImage());

        view.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View view) {
                Toast.makeText(c, s.getName()+ " Rating : "+String.valueOf(s.getRating()), Toast.LENGTH_SHORT).show();
            }
        });
        return view;
    }
}
```

##### **STEP 9 : MainActivity**

- Initialize ListView, set its adapter.

```java
package com.tutorials.hp.listviewratingbar;

import android.os.Bundle;
import android.support.design.widget.FloatingActionButton;
import android.support.design.widget.Snackbar;
import android.support.v7.app.AppCompatActivity;
import android.support.v7.widget.Toolbar;
import android.view.View;
import android.widget.ListView;

import com.tutorials.hp.listviewratingbar.mAdapterView.CustomAdapter;
import com.tutorials.hp.listviewratingbar.mData.SpaceshipsCollection;

public class MainActivity extends AppCompatActivity {

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);
        Toolbar toolbar = (Toolbar) findViewById(R.id.toolbar);
        setSupportActionBar(toolbar);

        ListView lv= (ListView) findViewById(R.id.lv);
        lv.setAdapter(new CustomAdapter(this, SpaceshipsCollection.getSpaceships()));

        FloatingActionButton fab = (FloatingActionButton) findViewById(R.id.fab);
        fab.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View view) {
                Snackbar.make(view, "Replace with your own action", Snackbar.LENGTH_LONG)
                        .setAction("Action", null).show();
            }
        });
    }

}
```

##### **How To Run**

1. Download the project.
2. You'll get a zipped file,extract it.
3. Open the Android Studio.
4. Now close, already open project.
5. From the Menu bar click on File >New> Import Project.
6. Now Choose a Destination Folder, from where you want to import project.
7. Choose an Android Project.
8. Now Click on “OK“.
9. Done, your done importing the project,now edit it.

##### **More Resources**

| Resource | Link |
| --- | --- |
| GitHub Browse | [Browse](https://github.com/Oclemy/ListViewRatingBar) |
| GitHub Download Link | [Download](https://github.com/Oclemy/ListViewRatingBar/archive/master.zip) |

Good day.
