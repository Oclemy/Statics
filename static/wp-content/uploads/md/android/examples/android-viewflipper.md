# ViewFlipper Tutorial and Examples



In this tutorial we will explore the ViewFlipper widget by looking at simple examples in a step by step manner. The code will be written in Kotlin.


## Example 1: Kotlin Android ViewFlipper Animations

This example Shows how to use the four different animations available for a ViewFlipper: "Push up", "Push left", "Cross fade", and "Hyperspace". A ViewFlipper is a simple `ViewAnimator` that will animate between two or more views that have been added to it. Only one child is shown at a time. If requested, it can automatically flip between each child at a regular interval.

### Step 1: Create Project

Start by creating an empty `Android Studio` project.

### Step 2: Dependencies

No third party dependency is needed for this project.

### Step 3: Create animations

Let's create the various animations we will be using:

**(a). push_up_in.xml**

```xml
<?xml version="1.0" encoding="utf-8"?>

<set xmlns:android="http://schemas.android.com/apk/res/android">
    <translate android:fromYDelta="100%p" android:toYDelta="0" android:duration="300"/>
    <alpha android:fromAlpha="0.0" android:toAlpha="1.0" android:duration="300" />
</set>
```

**(b). push_up_out.xml**

```xml
<?xml version="1.0" encoding="utf-8"?>
<set xmlns:android="http://schemas.android.com/apk/res/android">
    <translate android:fromYDelta="0" android:toYDelta="-100%p" android:duration="300"/>
    <alpha android:fromAlpha="1.0" android:toAlpha="0.0" android:duration="300" />
</set>
```

**(c). push_left_in.xml**

```xml
<?xml version="1.0" encoding="utf-8"?>

<set xmlns:android="http://schemas.android.com/apk/res/android">
    <translate android:fromXDelta="100%p" android:toXDelta="0" android:duration="300"/>
    <alpha android:fromAlpha="0.0" android:toAlpha="1.0" android:duration="300" />
</set>
```

**(d). push_left_out.xml**

```xml
<?xml version="1.0" encoding="utf-8"?>

<set xmlns:android="http://schemas.android.com/apk/res/android">
    <translate android:fromXDelta="0" android:toXDelta="-100%p" android:duration="300"/>
    <alpha android:fromAlpha="1.0" android:toAlpha="0.0" android:duration="300" />
</set>
```

**(e). hyperspace_in.xml**

```xml
<?xml version="1.0" encoding="utf-8"?>
<alpha xmlns:android="http://schemas.android.com/apk/res/android"
    android:duration="300"
    android:fromAlpha="0.0"
    android:startOffset="1200"
    android:toAlpha="1.0" />
```

**(f). hyperspace_out.xml**

```xml
<?xml version="1.0" encoding="utf-8"?>

<set xmlns:android="http://schemas.android.com/apk/res/android" android:shareInterpolator="false">

    <scale
        android:interpolator="@android:anim/accelerate_decelerate_interpolator"
        android:fromXScale="1.0"
        android:toXScale="1.4"
        android:fromYScale="1.0"
        android:toYScale="0.6"
        android:pivotX="50%"
        android:pivotY="50%"
        android:fillEnabled="true"
        android:fillAfter="false"
        android:duration="700" />

    <set android:interpolator="@android:anim/accelerate_interpolator">

        <scale
            android:fromXScale="1.4"
            android:toXScale="0.0"
            android:fromYScale="0.6"
            android:toYScale="0.0"
            android:pivotX="50%"
            android:pivotY="50%"
            android:fillEnabled="true"
            android:fillBefore="false"
            android:fillAfter="true"
            android:startOffset="700"
            android:duration="400" />

        <rotate
            android:fromDegrees="0"
            android:toDegrees="-45"
            android:toYScale="0.0"
            android:pivotX="50%"
            android:pivotY="50%"
            android:fillEnabled="true"
            android:fillBefore="false"
            android:fillAfter="true"
            android:startOffset="700"
            android:duration="400" />
    </set>

</set>
```

### Step 4: Design Layout

Add a ViewFlipper and inside it several TextViews. Also add a spinner and another TextView outside the `ViewFlipper`:

**animation_2.xml**

```xml
<?xml version="1.0" encoding="utf-8"?>

<LinearLayout xmlns:android="http://schemas.android.com/apk/res/android"
    android:layout_width="match_parent"
    android:layout_height="wrap_content"
    android:orientation="vertical"
    android:padding="10dip">

    <ViewFlipper
        android:id="@+id/flipper"
        android:layout_width="match_parent"
        android:layout_height="wrap_content"
        android:layout_marginBottom="20dip"
        android:flipInterval="2000">

        <TextView
            android:layout_width="match_parent"
            android:layout_height="wrap_content"
            android:gravity="center_horizontal"
            android:text="@string/animation_2_text_1"
            android:textSize="26sp" />

        <TextView
            android:layout_width="match_parent"
            android:layout_height="wrap_content"
            android:gravity="center_horizontal"
            android:text="@string/animation_2_text_2"
            android:textSize="26sp" />

        <TextView
            android:layout_width="match_parent"
            android:layout_height="wrap_content"
            android:gravity="center_horizontal"
            android:text="@string/animation_2_text_3"
            android:textSize="26sp" />

        <TextView
            android:layout_width="match_parent"
            android:layout_height="wrap_content"
            android:gravity="center_horizontal"
            android:text="@string/animation_2_text_4"
            android:textSize="26sp" />
    </ViewFlipper>

    <TextView
        android:layout_width="match_parent"
        android:layout_height="wrap_content"
        android:layout_marginBottom="5dip"
        android:text="@string/animation_2_instructions" />

    <Spinner
        android:id="@+id/spinner"
        android:layout_width="match_parent"
        android:layout_height="wrap_content" />

</LinearLayout>
```

### Step 5: Write Code

Start by creating a file called `Animation2.kt` and declare the following imports:

```kotlin
import android.os.Bundle
import android.view.View
import android.view.animation.Animation
import android.view.animation.AnimationUtils
import android.widget.AdapterView
import android.widget.AdapterView.OnItemSelectedListener
import android.widget.ArrayAdapter
import android.widget.Spinner
import android.widget.ViewFlipper
import androidx.appcompat.app.AppCompatActivity
import com.example.android.apis.R
```

Then extend the `AppCompatActivity` and implement the `OnItemSelectedListener` interface:

```kotlin
class Animation2 : AppCompatActivity(), OnItemSelectedListener {
```

The `ViewFlipper` in our layout with ID `R.id.flipper`:

```kotlin
    private var mFlipper: ViewFlipper? = null
```

Define the Strings used for the `Adapter` used by the Spinner with ID `R.id.spinner`:

```kotlin
    private val mStrings = arrayOf(
            "Push up", "Push left", "Cross fade", "Hyperspace"
    )
```

Our `onCreate()` will be Called when the activity is starting. We set our content view to our layout file `R.layout.animation_2`. We initialize our `ViewFlipper` field `mFlipper` by locating the `ViewFlipper` with ID `R.id.flipper` in our layout file, and instruct it to "start flipping" (starts a timer for it to cycle through its child views).

Next we set Spinner `val s` by locating the view with ID `R.id.spinner`, and we create `ArrayAdapter<String>` `val adapter` from our array of String's field `mStrings` using the `android.R.layout.simple_spinner_item` as the resource ID for a layout file containing a `TextView` to use when instantiating views, and set android.R.layout.simple_spinner_dropdown_item as the layout resource defining the drop down views.

We then set `adapter` as the `Adapter` for [Spinner] `s`, and set "this" as the `OnItemSelectedListener` for `s`.

```kotlin
    public override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.animation_2)
        mFlipper = findViewById(R.id.flipper)
        mFlipper!!.startFlipping()
        val s = findViewById<Spinner>(R.id.spinner)
        val adapter = ArrayAdapter(this,
                android.R.layout.simple_spinner_item, mStrings)
        adapter.setDropDownViewResource(android.R.layout.simple_spinner_dropdown_item)
        s.adapter = adapter
        s.onItemSelectedListener = this
    }
```

Our Callback method to be invoked when an item in the Spinner with ID `R.id.spinner` has been selected. We switch base on the value of our parameter `position`:

- 0 - "Push up" we set the "in" animation of [ViewFlipper] field [mFlipper] to the [Animation] loaded from R.anim.push_left_in, and its "out" animation to one loaded from R.anim.push_left_out
    
- 1 - "Push left" we set the "in" animation of [ViewFlipper] field [mFlipper] to the [Animation] loaded from R.anim.push_up_in, and its "out"" animation to one loaded from R.anim.push_up_out
    
- 2 - "Cross fade" we set the "in"" animation of [ViewFlipper] field [mFlipper] to the [Animation] loaded from `android.R.anim.fade_in`, and its "out" animation to one loaded from `android.R.anim.fade_out`
    
- default - "Hyperspace" we set the "in" animation of [ViewFlipper] field [mFlipper] to the [Animation] loaded from `R.anim.hyperspace_in`, and its "out" animation to one loaded from `R.anim.hyperspace_out`
    

The eight different animation resource files contain XML elements for performing the animations:

- `R.anim.push_up_in` - contains a `<translate>` for y from 100p to 0p with a duration of 300 milliseconds, and an `<alpha>` from 0.0 to 1.0 also with a duration of 300 milliseconds.
    
- `R.anim.push_up_out` - contains a `<translate>` for y from 0p to -100p with a duration of 300 milliseconds, and an `<alpha>` from 1.0 to 0.0 also with a duration of 300 milliseconds.
    
- `R.anim.push_left_in` - contains a `<translate>` for x from 100p to 0p with a duration of 300 milliseconds, and an `<alpha>` from 0.0 to 1.0 also with a duration of 300 milliseconds.
    
- `R.anim.push_left_out` - contains a `<translate>` for x from 0p to -100p with a duration of 300 milliseconds, and an `<alpha>` from 1.0 to 0.0 also with a duration of 300 milliseconds.
    
- `android.R.anim.fade_in` - contains an `<alpha>` from 0.0 to 1.0 using an interpolator of android:interpolator="@interpolator/decelerate_quad", and a duration of config_longAnimTime (500 milliseconds).
    
- `android.R.anim.fade_out` - contains an `<alpha>` from 1.0 to 0.0 using an interpolator of android:interpolator="@interpolator/accelerate_quad", and a duration of config_mediumAnimTime (400 milliseconds).
    
- `R.anim.hyperspace_in` - contains an `<alpha>` from 0.0 to 1.0, with a duration of 300 milliseconds and an start offset of 1200 milliseconds
    
- `R.anim.hyperspace_out` - contains a `<scale>` that scales x from 1.0 to 1.4, y from 1.0 to 0.6, android:pivotX="50%", android:pivotY="50%", android:fillEnabled="true", android:fillAfter="false" and a duration of 700 milliseconds. This is followed by a `<set>` which contains a `<scale>` and a `<rotate>`, both with a start offset of 700 milliseconds. The `<set>` uses accelerate_interpolator as its interpolator, the `<scale>` scales x from 1.4 to 0.0, y from 0.6 to 0, android:pivotX="50%", android:pivotY="50%", android:fillEnabled="true", android:fillBefore="false", android:fillAfter="true" and a duration of 400 milliseconds, the `<rotate>` rotates from 0 degrees to -45 degrees, with android:toYScale="0.0", android:pivotX="50%", android:pivotY="50%", android:fillEnabled="true", android:fillBefore="false", android:fillAfter="true" and a duration of 400 milliseconds.
    
- `@param parent` - The [AdapterView] where the selection happened
    
- `@param v` - The [View] within the AdapterView that was clicked
    
- `@param position` - The position of the view in the adapter
    
- `@param id` - The row id of the item that is selected
    

```kotlin
    override fun onItemSelected(parent: AdapterView<*>?, v: View?, position: Int, id: Long) {
        when (position) {
            0 -> {
                mFlipper!!.inAnimation = AnimationUtils.loadAnimation(this, R.anim.push_up_in)
                mFlipper!!.outAnimation = AnimationUtils.loadAnimation(this, R.anim.push_up_out)
            }
            1 -> {
                mFlipper!!.inAnimation = AnimationUtils.loadAnimation(this, R.anim.push_left_in)
                mFlipper!!.outAnimation = AnimationUtils.loadAnimation(this, R.anim.push_left_out)
            }
            2 -> {
                mFlipper!!.inAnimation = AnimationUtils.loadAnimation(this, android.R.anim.fade_in)
                mFlipper!!.outAnimation = AnimationUtils.loadAnimation(this, android.R.anim.fade_out)
            }
            else -> {
                mFlipper!!.inAnimation = AnimationUtils.loadAnimation(this, R.anim.hyperspace_in)
                mFlipper!!.outAnimation = AnimationUtils.loadAnimation(this, R.anim.hyperspace_out)
            }
        }
    }
```

The Callback method to be invoked when the selection disappears from this [Spinner]. We ignore.

- `@param parent` - The AdapterView that now contains no selected item.

```kotlin
    override fun onNothingSelected(parent: AdapterView<*>?) {}
}
```

Here is the full code:

```kotlin
package com.example.android.apis.view

import android.os.Bundle
import android.view.View
import android.view.animation.Animation
import android.view.animation.AnimationUtils
import android.widget.AdapterView
import android.widget.AdapterView.OnItemSelectedListener
import android.widget.ArrayAdapter
import android.widget.Spinner
import android.widget.ViewFlipper
import androidx.appcompat.app.AppCompatActivity

import com.example.android.apis.R

class Animation2 : AppCompatActivity(), OnItemSelectedListener {
    private var mFlipper: ViewFlipper? = null
    private val mStrings = arrayOf(
            "Push up", "Push left", "Cross fade", "Hyperspace"
    )

    public override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.animation_2)
        mFlipper = findViewById(R.id.flipper)
        mFlipper!!.startFlipping()
        val s = findViewById<Spinner>(R.id.spinner)
        val adapter = ArrayAdapter(this,
                android.R.layout.simple_spinner_item, mStrings)
        adapter.setDropDownViewResource(android.R.layout.simple_spinner_dropdown_item)
        s.adapter = adapter
        s.onItemSelectedListener = this
    }

    override fun onItemSelected(parent: AdapterView<*>?, v: View?, position: Int, id: Long) {
        when (position) {
            0 -> {
                mFlipper!!.inAnimation = AnimationUtils.loadAnimation(this, R.anim.push_up_in)
                mFlipper!!.outAnimation = AnimationUtils.loadAnimation(this, R.anim.push_up_out)
            }
            1 -> {
                mFlipper!!.inAnimation = AnimationUtils.loadAnimation(this, R.anim.push_left_in)
                mFlipper!!.outAnimation = AnimationUtils.loadAnimation(this, R.anim.push_left_out)
            }
            2 -> {
                mFlipper!!.inAnimation = AnimationUtils.loadAnimation(this, android.R.anim.fade_in)
                mFlipper!!.outAnimation = AnimationUtils.loadAnimation(this, android.R.anim.fade_out)
            }
            else -> {
                mFlipper!!.inAnimation = AnimationUtils.loadAnimation(this, R.anim.hyperspace_in)
                mFlipper!!.outAnimation = AnimationUtils.loadAnimation(this, R.anim.hyperspace_out)
            }
        }
    }

    override fun onNothingSelected(parent: AdapterView<*>?) {}
}
```

### Run

Copy the code above, build and run.

## Example 2: Creating an AnnouncementView using ViewFlipper

A_ndroid AnnouncementView Creation Tutorial using ViewFlipper class_

How to create an announcemnet ticker view using ViewFlipper class. That announcementView flips the announcements at an interval you can set. You simply pass it an arraylist of announcements.

This type of view can be very useful if you want a whole of notices or announcements or anything really that you want to show at quick intervals but within a small space. You pass it an arraylist and it just flips them over and over.

##### Demo

Here's the gif demo of the project:

![AnnouncementsView](https://camposha.info/wp-content/uploads/2019/04/demo1-26.gif)

AnnouncementsView

#### Gradle Scripts

##### (a) Build.gradle

Nothing special. No third party dependency. As usual we only add appcompat support library.

```groovy
dependencies {
    implementation fileTree(dir: 'libs', include: ['*.jar'])
    testImplementation 'junit:junit:4.12'
    implementation 'com.android.support:appcompat-v7:28.0.0'
}
```

#### Layouts

Lets start by exploring the layouts in this project.

We have seven layouts:

##### (a). activity_main.xml

Here's our `activity_main` layout. At the root we have a [LinearLayout](https://camposha.info/android/linearlayout) with vertical orientation. Then a textview to show our header text.

At the center we have our `AnnouncementView` which will flip our announcements.

```xml
<?xml version="1.0" encoding="utf-8"?>
<LinearLayout

    android_id="@+id/activity_main"
    android_layout_width="match_parent"
    android_layout_height="match_parent"
    android_orientation="vertical"
    android_background="#009688"
    tools_context=".MainActivity">

    <TextView
        android_id="@+id/headerTxt"
        android_layout_width="match_parent"
        android_layout_height="wrap_content"
        android_text="Announcements View"
        android_textAlignment="center"
        android_fontFamily="casual"
        android_textStyle="bold"
        android_textAppearance="@style/TextAppearance.AppCompat.Large"
        android_textColor="@color/white" />

    <LinearLayout
        android_layout_width="match_parent"
        android_layout_height="56dp"
        android_layout_marginLeft="16dp"
        android_layout_marginRight="16dp"
        android_layout_marginTop="150dp"
        android_gravity="center_vertical">

        <info.camposha.mrannouncementview.AnnouncementView
            android_id="@+id/announcemnet_view"
            android_layout_width="match_parent"
            android_layout_height="wrap_content"/>

    </LinearLayout>

</LinearLayout>
```

#### Animations

We will jave two animations.

##### 1\. in.xml

This animation will flip our announcements in.

```xml
<?xml version="1.0" encoding="utf-8"?>
<set >
    <translate
        android_duration="@android:integer/config_mediumAnimTime"
        android_fromYDelta="50%p"
        android_toYDelta="0"/>
    <alpha
        android_duration="@android:integer/config_mediumAnimTime"
        android_fromAlpha="0.0"
        android_toAlpha="1.0"/>
</set>
```

##### 2\. out.xml

This animation will flip our announcements out.

```xml
<?xml version="1.0" encoding="utf-8"?>
<set >
    <translate
        android_duration="@android:integer/config_mediumAnimTime"
        android_fromYDelta="0"
        android_toYDelta="-50%p"/>
    <alpha
        android_duration="@android:integer/config_mediumAnimTime"
        android_fromAlpha="1.0"
        android_toAlpha="0.0"/>
</set>
```

#### Java Code.

We have the following java classes for this project:

1. AnnouncementView.java
2. MainActivity.java

##### (a). AnnouncementView.java

This is our custom view to show our announcements. We are extending the ViewFlipper class from the `android.widget` package. This announcement view will receive announcements as an arraylist and flip them.

```java
package info.camposha.mrannouncementview;

import android.content.Context;
import android.graphics.Color;
import android.text.TextUtils;
import android.util.AttributeSet;
import android.util.TypedValue;
import android.view.Gravity;
import android.view.View;
import android.view.animation.AnimationUtils;
import android.widget.TextView;
import android.widget.ViewFlipper;

import java.util.List;

/**
 * Let's extend the ViewFlipper class. This class normally animates between two
 * or more views that have been added to it.
 */
public class AnnouncementView extends ViewFlipper implements View.OnClickListener {

    private Context mContext;
    private List<String> mAnnouncements;

    /**
     * Let's supply two overrides of our constructor
     * @param context
     */
    public AnnouncementView(Context context) { super(context);}
    public AnnouncementView(Context context, AttributeSet attrs) {
        super(context, attrs);
        init(context);
    }

    /**
     * Let's receive context, set flip interval,padding then set in and
     * out animation
     * @param context
     */
    private void init(Context context) {
        mContext = context;
        setFlipInterval(3000);
        setPadding(dp2px(5f), dp2px(5f), dp2px(5f), dp2px(5f));
        setInAnimation(AnimationUtils.loadAnimation(mContext, R.anim.in));
        setOutAnimation(AnimationUtils.loadAnimation(mContext, R.anim.out));
    }

    /**
     * Next thing is for us to create a method that will first receive a list
     * of announcements then flip through them via our AnnouncementView.
     * @param announcements
     */
    public void addAnnouncement(List<String> announcements) {
        //let's remove all child views from the ViewGroup.
        removeAllViews();
        mAnnouncements = announcements;
        for (int i = 0; i < announcements.size(); i++) {
            String currentAnnouncement = announcements.get(i);
            // Let's Build a Tetview based on the content of the announcement
            TextView textView = new TextView(mContext);
            textView.setMaxLines(3);
            textView.setText(currentAnnouncement);
            textView.setTextSize(20f);
            textView.setEllipsize(TextUtils.TruncateAt.END);
            textView.setTextColor(Color.parseColor("#ffffff"));
            textView.setGravity(Gravity.CENTER_VERTICAL);
            // Let's set the location of the announcement to the textView tag.
            textView.setTag(i);
            textView.setOnClickListener(this);
            // Let's add the announcement to the ViewFlipper
            AnnouncementView.this.addView(textView, new LayoutParams(
                LayoutParams.MATCH_PARENT, LayoutParams.MATCH_PARENT));
        }
    }

    @Override
    public void onClick(View v) {
        int position = (int) v.getTag();
        String announcement = mAnnouncements.get(position);
        if (mOnAnnouncementClickListener != null) {
            mOnAnnouncementClickListener.onAnnouncementClick(position, announcement);
        }
    }

    /**
     * Notification click monitor interface
     */
    public interface OnAnnouncementClickListener {
        void onAnnouncementClick(int position, String announcement);
    }

    private OnAnnouncementClickListener mOnAnnouncementClickListener;

    /**
     * Set notification click listener
     *
     * @param onAnnouncementClickListener Notification click listener
     */
    public void setOnAnnouncementClickListener(OnAnnouncementClickListener
    onAnnouncementClickListener) {
        mOnAnnouncementClickListener = onAnnouncementClickListener;
    }

    private int dp2px(float dpValue) {
        return (int) TypedValue.applyDimension(TypedValue.COMPLEX_UNIT_DIP,
                dpValue,
                mContext.getResources().getDisplayMetrics());
    }
}
```

##### (b). MainActivity.java

Our main activity class. This is where we use our announcement view we created.

```java
package info.camposha.mrannouncementview;

import android.support.v7.app.AppCompatActivity;
import android.os.Bundle;
import android.widget.Toast;

import java.util.ArrayList;
import java.util.List;

public class MainActivity extends AppCompatActivity {

    AnnouncementView announcementView;

    /**
     * Let's add and return our announcements
     * @return
     */
    private List<String> getAnnouncements(){
        List<String> announcements = new ArrayList<>();
        announcements.add("First Years come with your ID cards please.");
        announcements.add("Law Students meet me at Dr Sagini Hall 8pm ");
        announcements.add("Good Doctor SN2 on in ABC.Don't miss it.");
        announcements.add("Free snacks for all at the Sadhguru event.");
        announcements.add("College site under maintenance till evening.");
        announcements.add("Betelguese goes supernova. Hey, joking");
        announcements.add("Free dental checkup sponsored by College.");
        announcements.add("One who tried hacking college site.Please STOP.");
        announcements.add("Python wins TIOBE language of Year. Java still top");

        return announcements;
    }

    /**
     * Let's now initialize our AnnouncementView
     */
    private void initializeAnnouncementView() {
        announcementView = findViewById(R.id.announcemnet_view);
        announcementView.addAnnouncement(getAnnouncements());
        announcementView.startFlipping();
    }

    private void handleAnnouncementClick(){
        announcementView.setOnAnnouncementClickListener(new AnnouncementView.OnAnnouncementClickListener() {
            @Override
            public void onAnnouncementClick(int position, String announcement) {
                Toast.makeText(MainActivity.this, announcement, Toast.LENGTH_SHORT).show();
            }
        });
    }

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);
        this.initializeAnnouncementView();
        this.handleAnnouncementClick();
    }
}
//end
```
