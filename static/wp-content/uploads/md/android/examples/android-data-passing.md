# Data Passing - Fragment to Activity, Activity to Fragment


Passing data between activities or fragments is one of the basic concepts you need to learn when you start doing android development. Even though activities and fragments are nothing but classes, they are considered special classes in android since they are fundamental to how android User interface works. Thus we don't just pass them data via constructors but in one of the following three ways:

1. Intent
2. Bundle
3. ViewModel

We will look at all these using practical examples in this lesson. Let's start.


## Example 1: Android Data Passing – Fragment To Activity Via Intent

Lets continue with our android data passing series we had started earlier on.We had looked at how to pass data from activity to fragment and how to pass both a list/object from activity to activity as well as simple primitive data types.

Today we look at how to pass simple data types from the fragment to activity.We pass data via Intent object.

#### What is a Fragment?

A fragment is a subactivity with it's own lifecycle. Fragments get hosted by activities. One activity can host multiple fragments.

#### Why Pass Data From Fragment To Activity

| No. | Reason |
| --- | --- |
| 1. | Fragments are subactivities and allow us have different screens without necessarily having to create many activities. Hence we need to know how to pass data from the fragment to an activity. |
| 2. | Fragments like [Activities](https://camposha.info/android/activity) are special UI classes representing a window and so we cannot pass data directly like we do with ordinary classes. |

#### Introduction

- We have two classes : one our `MainActivity` and another a `MyFragment` class.
- When we press the FAB(Floating Action Button) button,we open the MyFragment via Fragment Transaction,attaching it to a FrameLayout we shall define.
- The Fragment contains an edittext and a spinner.
- User types the spacecraft name and chooses the launch year in the spinner.
- We then pass both these data back to MainActivity.
- Then display the received data in textviews.
- We've used Android Studio as our IDE.
- The code is well commented for easier understanding.

#### Common Questions we answer

With this simple example we explore the following :

- How to pass data from fragment to an [activity](https://camposha.info/android/activity).
- How do I pass data between fragment and activity using intents.
- How do I perform FragmentTransaction.
- Override onResume() and receive data in android.
- How to work with both fragment and [activity](https://camposha.info/android/activity).

#### Tools Used

- IDE : Android Studio
- OS : Windows 8.1
- PLATFORM : Android
- LANGUAGE : Java
- TOPIC : Intent,Data Passing,Fragment

Let's go.

Lets have a look at the source code.

#### 1\. Build.Gradle

- No external dependencies needed.

#### 2\. MainActivity.java

- Our `MainActivity`,launcher [activity](https://camposha.info/android/activity).
- First we reference views here,in this case simple textviews to display our received data.
- We have a method : receiveData() thats responsible for receiving and unpacking the data we receive from the `MyFragment` class.
- We shall be receiving data in the onResume() method.
- Because the methods gets called not only when we resume from the fragment but also after the [activity](https://camposha.info/android/activity) has been created and started,we will need to identify the caller using a simple Sender string we shall be sending everytime we send data from the fragment.
- If the sender is `MyFragment` ,then we go ahead and unpack our data.

```java
public class MainActivity extends AppCompatActivity {

    private TextView nameTxt,yearTxt;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);
        Toolbar toolbar = (Toolbar) findViewById(R.id.toolbar);
        setSupportActionBar(toolbar);

    //REFERENCE VIEWS
        nameTxt= (TextView) findViewById(R.id.nameTxt);
        yearTxt= (TextView) findViewById(R.id.yearTxt);

        FloatingActionButton fab = (FloatingActionButton) findViewById(R.id.fab);
        fab.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View view) {
              openFragment();
            }
        });
    }
/*
WHEN ACTIVITY RESUMES
*/
    @Override
    protected void onResume() {
        super.onResume();

    //DETERMINE WHO STARTED THIS ACTIVITY
    final String sender=this.getIntent().getExtras().getString("SENDER_KEY");

    //IF ITS THE FRAGMENT THEN RECEIVE DATA
        if(sender != null)
        {
            this.receiveData();
            Toast.makeText(this, "Received", Toast.LENGTH_SHORT).show();

        }
    }

    /*
        OPEN FRAGMENT
         */
    private void openFragment()
    {
        //PASS OVER THE BUNDLE TO OUR FRAGMENT
        MyFragment myFragment = new MyFragment();
        //THEN NOW SHOW OUR FRAGMENT
        getSupportFragmentManager().beginTransaction().replace(R.id.container,myFragment).commit();
    }

    /*
    RECEIVE DATA FROM FRAGMENT
     */
    private void receiveData()
    {
        //RECEIVE DATA VIA INTENT
        Intent i = getIntent();
        String name = i.getStringExtra("NAME_KEY");
        int year = i.getIntExtra("YEAR_KEY",0);

        //SET DATA TO TEXTVIEWS
        nameTxt.setText(name);
        yearTxt.setText(String.valueOf(year));
    }
}
```

#### 3\. MyFragment.java

- Our Fragment class.
- We are using support libary Fragment so we Extend `android.support.v4.app.Fragment`.
- Here we have an edittext,a button and a spinner.
- User shall enter the spacecraft name in edittext,select launch year in the spinner and click send button to send that data to MainActivity.
- We send and pack data in an intent.
- We also send a variable we call sender to identify the sender of that data as this fragment.

```java
/
 * A simple Fragment subclass.
 */
public class MyFragment extends Fragment {

    private EditText nameFragTxt;
    private Spinner launchYearSpinner;
    private Button sendBtn;

    public MyFragment() {
        // Required empty public constructor
    }

    @Override
    public View onCreateView(LayoutInflater inflater, ViewGroup container,
                             Bundle savedInstanceState) {

        // Inflate the layout for this fragment
        View rootView=inflater.inflate(R.layout.fragment_my, container, false);

        //INITIALIZE VIEWS
        nameFragTxt = (EditText)rootView.findViewById(R.id.nameEditTxt);
        launchYearSpinner = (Spinner)rootView.findViewById(R.id.sp);
        sendBtn = (Button) rootView.findViewById(R.id.sendBtn);

        fillYears();

        sendBtn.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View view) {
                sendData();
            }
        });

        return rootView;
    }
    /*
    FILL YEARS IN OUR SPINNER
    */
    private void fillYears() {
        ArrayAdapter adapter = new ArrayAdapter(getActivity(), android.R.layout.simple_list_item_1);
        adapter.add("2017");
        adapter.add("2018");
        adapter.add("2019");
        adapter.add("2020");
        adapter.add("2021");
        adapter.add("2022");

        //SET ADAPTER INSTANCE TO OUR SPINNER
        launchYearSpinner.setAdapter(adapter);

    }

    private void sendData()
    {
        //INTENT OBJ
        Intent i = new Intent(getActivity().getBaseContext(),
                MainActivity.class);

        //PACK DATA
    i.putExtra("SENDER_KEY", "MyFragment");
        i.putExtra("NAME_KEY", nameFragTxt.getText().toString());
        i.putExtra("YEAR_KEY", Integer.valueOf(launchYearSpinner.getSelectedItem().toString()));

        //RESET WIDGETS
        nameFragTxt.setText("");
        launchYearSpinner.setSelection(0);

        //START ACTIVITY
        getActivity().startActivity(i);
    }
}
```

#### 4\. Create User Interfaces

User interfaces are typically created in android using XML layouts as opposed by direct java coding.

This is an example fo declarative programming.

##### Advantages of Using XML over Java

| No. | Advantage |
| --- | --- |
| 1. | Declarative creation of widgets and views allows us to use a declarative language XML which makes is easier. |
| 2. | It's easily maintanable as the user interface is decoupled from your Java logic. |
| 3. | It's easier to share or download code and safely test them before runtime. |
| 4. | You can use XML generated tools to generate XML |

Here are our layouts for this project:

##### (a). activity_main.xml

- This layout gets inflated to MainActivity user interface.
- It includes the content_main.xml.

```xml
<?xml version="1.0" encoding="utf-8"?>
<android.support.design.widget.CoordinatorLayout

    android_layout_width="match_parent"
    android_layout_height="match_parent"
    android_fitsSystemWindows="true"
    tools_context="com.tutorials.hp.datafragment_activity.MainActivity">

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
        app_srcCompat="@android:drawable/ic_dialog_email" />

</android.support.design.widget.CoordinatorLayout>
```

Here are some of the widgets, views and viewgroups that get employed"

| No. | View/ViewGroup | Package | Role |
| --- | --- | --- | --- |
| 1. | CordinatorLayout | `android.support.design.widget` | Super-powered framelayout that provides our application's top level decoration and is also specifies interactions and behavioros of all it's children. |
| 2. | AppBarLayout | `android.support.design.widget` | A LinearLayout child that arranges its children vertically and provides material design app bar concepts like scrolling gestures. |
| 3. | ToolBar | `<android.support.v7.widget` | A ViewGroup that can provide actionbar features yet still be used within application layouts. |
| 4. | FloatingActionButton | `android.support.design.widget` | An circular imageview floating above the UI that we can use as buttons. |

##### (b). content_main.xml

This layout gets included in your activity_main.xml. We define our UI widgets here.

- Main Layout.
- We specify Views and widgets xml code here.
- This layout shall get inflated into our MainActivity interface.
- Is the contentmain.xml layout in our project.

```xml
<?xml version="1.0" encoding="utf-8"?>
<RelativeLayout

    android_id="@+id/content_main"
    android_layout_width="match_parent"
    android_layout_height="match_parent"
    android_paddingBottom="@dimen/activity_vertical_margin"
    android_paddingLeft="@dimen/activity_horizontal_margin"
    android_paddingRight="@dimen/activity_horizontal_margin"
    android_paddingTop="@dimen/activity_vertical_margin"
    app_layout_behavior="@string/appbar_scrolling_view_behavior"
    tools_context="com.tutorials.hp.datafragment_activity.MainActivity"
    tools_showIn="@layout/activity_main">

    <LinearLayout
        android_layout_width="match_parent"
        android_orientation="vertical"
        android_layout_height="match_parent">

    <TextView
        android_layout_width="wrap_content"
        android_layout_height="wrap_content"
        android_textAppearance="?android:attr/textAppearanceLarge"
        android_text="Received Data"
        android_id="@+id/activityTitle"
        android_textStyle="bold"
        android_textColor="@color/colorAccent"
        android_layout_gravity="center_horizontal"
        android_padding="5dp"
        />

    <TextView
        android_layout_width="wrap_content"
        android_layout_height="wrap_content"
        android_textAppearance="?android:attr/textAppearanceLarge"
        android_text="Name"
        android_id="@+id/nameTxt"
        android_padding="5dp"
        />

    <TextView
        android_layout_width="wrap_content"
        android_layout_height="wrap_content"
        android_textAppearance="?android:attr/textAppearanceLarge"
        android_text="Year"
        android_id="@+id/yearTxt"
        android_padding="5dp"
        />

    <FrameLayout
        android_id="@+id/container"
        android_layout_width="match_parent"
        android_layout_height="wrap_content">

    </FrameLayout>

    </LinearLayout>
</RelativeLayout>
```

#### (c). MyFragment Layout

- Layout for our Fragment class.
- Contains a CardView with an edittext and a spinner.
- Is the fragment_my.xml layout in our project

```xml
<FrameLayout

    android_layout_width="match_parent"
    android_layout_height="match_parent"
    tools_context="com.tutorials.hp.datafragment_activity.MyFragment">
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
            <TextView
                android_layout_width="wrap_content"
                android_layout_height="wrap_content"
                android_textAppearance="?android:attr/textAppearanceLarge"
                android_text="FRAGMENT ONE"
                android_id="@+id/fragTitle"
                android_textStyle="bold"
                android_textColor="@color/colorAccent"
                android_layout_gravity="center_horizontal"
                android_padding="5dp"
                />

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

            <LinearLayout
                android_layout_width="match_parent"
                android_orientation="horizontal"
                android_layout_height="wrap_content">
                <TextView
                    android_text="LAUNCH YEAR : "
                    android_textColor="@color/colorAccent"
                    android_layout_width="wrap_content"
                    android_layout_height="wrap_content" />
                <Spinner
                    android_id="@+id/sp"
                    android_layout_width="match_parent"
                    android_layout_height="wrap_content"
                    />
            </LinearLayout>

            <Button
                android_id="@+id/sendBtn"
        android_text="Send"
                android_layout_width="wrap_content"
                android_layout_height="wrap_content"             />
        </LinearLayout>
    </android.support.v7.widget.CardView>
</FrameLayout>
```

#### How To Run

- Download the project above.
- You'll get a zipped file,extract it.
- Open the Android Studio.
- Now close, any already opened project
- From the Menu bar click on **File >New> Import Project**
- Now Choose a Destination Folder, from where you want to import project.
- Choose an Android Project.
- Now Click on “**OK**“.
- Done, your done importing the project,now edit it.

#### Result

Here is what you will get:

![How to pass data from fragment to activity](https://camposha.info/android-examples/wp-content/uploads/sites/9/2021/05/pass-data-fragment-to-activity.gif)

#### More Resources

| Resource | Link |
| --- | --- |
| GitHub Browse | Browse |
| GitHub Download Link | [Download](https://github.com/Oclemy/DataFragment-Activity/archive/master.zip) |

## Example 2: Android Data Passing – From Activity To Fragment via Bundle

When developing any application which isn't a Hello World, then chances are that you will need to have more than one Activity or Fragments.Fragments basically are subactivities.

Most newbies get confused with passing data between activities or between fragments.

Today we want to see how to pass data from an activity to a fragment. We'll use a Bundle object, pack data to it in our Activity, then unpack that data inside the onCreateView() method of our Fragment.

#### STEP 1 : Create Project

1. First create an new project in android studio. Go to File --> New Project.
2. Type the application name and choose the company name.
3. Choose minimum SDK.
4. Choose Empty or Basic activity.
5. Click Finish.

#### STEP 2 : Our Build.Gradle

- We shall be using a CardView in our Fragment. No external dependencies are needed.

#### STEP 3 : Our Fragment

- Shall be inflated from our fragment layout.
- We shall simply receive data sent from MainActivity and show them in our views inside our fragment.
- We unpack the data in our onCreateView() method.

```java
public class MyFragment extends Fragment {

    private TextView nameFragTxt,yearFragTxt;

    public MyFragment() {
        // Required empty public constructor
    }

    @Override
    public View onCreateView(LayoutInflater inflater, ViewGroup container,
                             Bundle savedInstanceState) {

        View rootView=inflater.inflate(R.layout.fragment_my, container, false);

        nameFragTxt= (TextView) rootView.findViewById(R.id.nameTxt);
        yearFragTxt= (TextView) rootView.findViewById(R.id.yearTxt);

        //UNPACK OUR DATA FROM OUR BUNDLE
        String name=this.getArguments().getString("NAME_KEY").toString();
        int year=this.getArguments().getInt("YEAR_KEY");

       nameFragTxt.setText("NAME : "+name);
       yearFragTxt.setText("YEAR : "+String.valueOf(year));

        return rootView;
    }

}
```

#### STEP 4 : Our MainActivity

- Shall be inflated from our contentmain.xml
- When user clicks the Floating Action Button we pack data typed by user in edittext and spinner in a Bundle object.
- We then perform our Fragment transaction, replacing our Framelayout container with  our inflated fragment.
- We send the bundle to the Fragment.

```java
package com.tutorials.hp.dataactivity_fragment;

import android.os.Bundle;
import android.support.design.widget.FloatingActionButton;
import android.support.v7.app.AppCompatActivity;
import android.support.v7.widget.Toolbar;
import android.view.View;
import android.widget.ArrayAdapter;
import android.widget.EditText;
import android.widget.Spinner;

public class MainActivity extends AppCompatActivity {
    private EditText nameTxt;
    private Spinner launchYearSpinner;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);
        Toolbar toolbar = (Toolbar) findViewById(R.id.toolbar);
        setSupportActionBar(toolbar);

        //INITIALIZE VIEWS
        nameTxt = (EditText) findViewById(R.id.nameEditTxt);
        launchYearSpinner = (Spinner) findViewById(R.id.sp);

        fillYears();

        FloatingActionButton fab = (FloatingActionButton) findViewById(R.id.fab);
        fab.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View view) {
                sendData();
            }
        });
    }

    /*
    SEND DATA TO FRAGMENT
     */
    private void sendData() {
        //PACK DATA IN A BUNDLE
        Bundle bundle = new Bundle();
        bundle.putString("NAME_KEY", nameTxt.getText().toString());
        bundle.putInt("YEAR_KEY", Integer.valueOf(launchYearSpinner.getSelectedItem().toString()));

        //PASS OVER THE BUNDLE TO OUR FRAGMENT
        MyFragment myFragment = new MyFragment();
        myFragment.setArguments(bundle);

        nameTxt.setText("");
        launchYearSpinner.setSelection(0);

        //THEN NOW SHOW OUR FRAGMENT
        getSupportFragmentManager().beginTransaction().replace(R.id.container,myFragment).commit();

    }

    /*
    FILL YEARS IN OUR SPINNER
     */
    private void fillYears() {
        ArrayAdapter adapter = new ArrayAdapter(this, android.R.layout.simple_list_item_1);
        adapter.add("2017");
        adapter.add("2018");
        adapter.add("2019");
        adapter.add("2020");
        adapter.add("2021");
        adapter.add("2022");

        //SET ADAPTER INSTANCE TO OUR SPINNER
        launchYearSpinner.setAdapter(adapter);
    }
}
```

#### STEP 5. Create Activity User Interface

We design our User Interfaces using XML

##### (a). activity_main.xml

- This layout gets inflated to MainActivity user interface.
- It includes the content_main.xml.

Here are some of the widgets, views and viewgroups that get employed"

| No. | View/ViewGroup | Package | Role |
| --- | --- | --- | --- |
| 1. | CordinatorLayout | `android.support.design.widget` | Super-powered framelayout that provides our application's top level decoration and is also specifies interactions and behavioros of all it's children. |
| 2. | AppBarLayout | `android.support.design.widget` | A LinearLayout child that arranges its children vertically and provides material design app bar concepts like scrolling gestures. |
| 3. | ToolBar | `<android.support.v7.widget` | A ViewGroup that can provide actionbar features yet still be used within application layouts. |
| 4. | FloatingActionButton | `android.support.design.widget` | An circular imageview floating above the UI that we can use as buttons. |

##### (b). content_main.xml

This layout gets included in your activity_main.xml. We define our UI widgets here.

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
    tools_context="com.tutorials.hp.dataactivity_fragment.MainActivity"
    tools_showIn="@layout/activity_main">

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

    <LinearLayout
        android_layout_width="match_parent"
        android_orientation="horizontal"
        android_layout_height="wrap_content">
        <TextView
            android_text="LAUNCH YEAR : "
            android_textColor="@color/colorAccent"
            android_layout_width="wrap_content"
            android_layout_height="wrap_content" />
        <Spinner
            android_id="@+id/sp"
            android_layout_width="match_parent"
            android_layout_height="wrap_content"
            />
        </LinearLayout>
        <FrameLayout
            android_id="@+id/container"
            android_layout_width="match_parent"
            android_layout_height="wrap_content">
        </FrameLayout>
    </LinearLayout>
</RelativeLayout>
```

#### STEP 6 : Our Fragment xml

- Our fragment layout.
- Shall contain a CardView with textviews.

```xml
<RelativeLayout

    android_layout_width="match_parent"
    android_layout_height="match_parent"
    tools_context="com.tutorials.hp.dataactivity_fragment.MyFragment">

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

            <TextView
                android_layout_width="wrap_content"
                android_layout_height="wrap_content"
                android_textAppearance="?android:attr/textAppearanceLarge"
                android_text="FRAGMENT ONE"
                android_id="@+id/fragTitle"
                android_textStyle="bold"
                android_textColor="@color/colorAccent"
                android_layout_gravity="center_horizontal"
                android_padding="5dp"
                 />

            <TextView
                android_layout_width="wrap_content"
                android_layout_height="wrap_content"
                android_textAppearance="?android:attr/textAppearanceLarge"
                android_text="Name"
                android_id="@+id/nameTxt"
                android_padding="5dp"
                />

            <TextView
                android_layout_width="wrap_content"
                android_layout_height="wrap_content"
                android_textAppearance="?android:attr/textAppearanceLarge"
                android_text="Year"
                android_id="@+id/yearTxt"
                android_padding="5dp"
                />

        </LinearLayout>
    </android.support.v7.widget.CardView>

</RelativeLayout>
```

#### STEP 7 : How To Run

- Download the project.
- You'll get a zipped file,extract it.
- Open the Android Studio.
- Now close, any already opened project
- From the Menu bar click on **File >New> Import Project**
- Now Choose a Destination Folder, from where you want to import project.
- Choose an Android Project.
- Now Click on “**OK**“.
- Done, now edit it..

#### Result

Here is what you get:

![How to Pass Data from Activity to Fragment](https://camposha.info/android-examples/wp-content/uploads/sites/9/2021/05/how-to-pass-data-activity-to-fragment.gif)

#### STEP 8 : More

| Resource | Link |
| --- | --- |
| GitHub Browse | [Browse](https://github.com/Oclemy/DataActivity-Fragment) |
| GitHub Download Link | [Download](https://github.com/Oclemy/DataActivity-Fragment/archive/master.zip) |

## Example 3: Pass Data from Login Activity to Welcome Activity via Bundle

This third example will also teach us how to pass data from one activity to another via Bundle. Basically there us a Login Screen. You type those login details and when you click Login we pass those details over to the Welcome Screen via a Bundle.

Here's the demo screenshot of the project:

![Pass Data across activities via Bundle in Android](https://camposha.info/android-examples/wp-content/uploads/sites/9/2021/05/Pass-Data-across-activities-via-Bundle-in-Android.png)

Let's go.

### Step 1: Create Project

Start by creating an empty `Android Studio` project.

### Step 2: Dependencies

No special or third party dependencies are needed for this project.

### Step 3: Design Layouts

We will have two layouts for our two activities:

**(a). welcome_screen.xml**

This will be the UI for the Welcome Screen. Just add a simple TextView that will render our welcome message:

```xml
<?xml version="1.0" encoding="utf-8"?>
<LinearLayout xmlns:android="http://schemas.android.com/apk/res/android"
              android:orientation="vertical"
              android:layout_width="match_parent"
              android:layout_height="match_parent">

    <TextView
        android:layout_width="342dp"
        android:layout_height="wrap_content"
        android:textAppearance="?android:attr/textAppearanceLarge"
        android:id="@+id/welcomeName"/>
</LinearLayout>
```

**(b). activity_main.xml**

This will be the UI for the MainActivity which will be our LoginActivity. Design the screen by adding TextViews, Button and EditTexts as shown below:

```xml
<?xml version="1.0" encoding="utf-8"?>
<LinearLayout xmlns:android="http://schemas.android.com/apk/res/android"
              android:layout_width="fill_parent"
              android:layout_height="fill_parent"
              android:background="@color/bg_login"
              android:gravity="center"
              android:orientation="vertical"
              android:padding="10dp" >

    <LinearLayout
        android:layout_width="fill_parent"
        android:layout_height="wrap_content"
        android:layout_gravity="center"
        android:orientation="vertical"
        android:paddingLeft="20dp"
        android:paddingRight="20dp" >

        <EditText
            android:id="@+id/email"
            android:layout_width="fill_parent"
            android:layout_height="wrap_content"
            android:layout_marginBottom="10dp"
            android:background="@color/white"
            android:hint="@string/hint_email"
            android:inputType="textEmailAddress"
            android:padding="10dp"
            android:singleLine="true"
            android:textColor="@color/input_login"
            android:textColorHint="@color/input_login_hint" />

        <EditText
            android:id="@+id/password"
            android:layout_width="fill_parent"
            android:layout_height="wrap_content"
            android:layout_marginBottom="10dp"
            android:background="@color/white"
            android:hint="@string/hint_password"
            android:inputType="textPassword"
            android:padding="10dp"
            android:singleLine="true"
            android:textColor="@color/input_login"
            android:textColorHint="@color/input_login_hint" />

        <!-- Login Button -->

        <Button
            android:id="@+id/btnLogin"
            android:layout_width="fill_parent"
            android:layout_height="wrap_content"
            android:layout_marginTop="20dip"
            android:background="@color/btn_login_bg"
            android:text="@string/btn_login"
            android:textColor="@color/btn_login" />

        <!-- Link to Login Screen -->

        <Button
            android:id="@+id/btnLinkToRegisterScreen"
            android:layout_width="fill_parent"
            android:layout_height="wrap_content"
            android:layout_marginTop="40dip"
            android:background="@null"
            android:text="@string/btn_link_to_register"
            android:textAllCaps="false"
            android:textColor="@color/white"
            android:textSize="15dp" />
    </LinearLayout>

</LinearLayout>
```

### Step 4: Create Welcome Screen

The welcome screen will receive items passed via Bundle. Here is how we receive these items via Bundle and render them on our textviews:

```java
    Bundle bundle=getIntent().getExtras();
        if(bundle!=null){
            welcomeMsg.setTextSize(25.00f);
            welcomeMsg.setText("Welcome "+bundle.getString(MainActivity.BUNDLE_KEY_NAME));
        }
```

Here is the full code:

**MainActivity.java**

```java
import android.app.Activity;
import android.os.Bundle;
import android.widget.TextView;

public class WelcomeScreen extends Activity {

    TextView   welcomeMsg;
    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.welcome_screen);

        welcomeMsg=(TextView)findViewById(R.id.welcomeName);

        Bundle bundle=getIntent().getExtras();
        if(bundle!=null){
            welcomeMsg.setTextSize(25.00f);
            welcomeMsg.setText("Welcome "+bundle.getString(MainActivity.BUNDLE_KEY_NAME));
        }
    }
}
```

### Step 5: Create Login Screen

This screen is also our MainActivity. The user will type the login details here and those will be passed to the Welcome Screen via Bundle.

To pass data via a Bundle, start by instantiating an Intent, passing in the Context as well as the target Activity as constructor parameters:

```java
    Intent intent = new Intent(MainActivity.this, WelcomeScreen.class);
```

Then instantiate a Bundle object:

```java
    Bundle bundle = new Bundle();
```

Then put your data into the Bundle via methods like `putString()` if you are passing a string. This method takes the Bundle key and the data to be passed:

```java
    bundle.putString(BUNDLE_KEY_NAME, inputEmail.getText().toString());
```

Now put the Bundle into the Intent

```java
    intent.putExtras(bundle);
```

Then start the Activity:

```java
    startActivity(intent);
```

Here is the full code:

**MainActivity.java**

```java
import android.app.Activity;
import android.content.Intent;
import android.os.Bundle;
import android.view.View;
import android.widget.Button;
import android.widget.EditText;
import android.widget.Toast;

public class MainActivity extends Activity {

    private Button btnLogin;
    private EditText inputEmail;
    private EditText inputPassword;

    static String BUNDLE_KEY_NAME="BUNDLE_KEY_NAME";

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);

        inputEmail = (EditText) findViewById(R.id.email);
        inputPassword = (EditText) findViewById(R.id.password);
        btnLogin = (Button) findViewById(R.id.btnLogin);

        // Login button Click Event
        btnLogin.setOnClickListener(new View.OnClickListener() {

            public void onClick(View view) {
                String email = inputEmail.getText().toString();
                String password = inputPassword.getText().toString();

                // Check for empty data in the form
                if (email.trim().isEmpty()) {
                    // login user
                    inputEmail.setError("Enter E-Mail...");
                }
                else if(password.trim().isEmpty()){
                    inputPassword.setError("Enter Password...");
                }
                else {
                    Toast.makeText(getApplicationContext(), "checking password", Toast.LENGTH_LONG).show();
                    if (email.equals("abc@gmail.com") && password.equals("abc")) {

                        Intent intent = new Intent(MainActivity.this, WelcomeScreen.class);

                        Bundle bundle = new Bundle();
                        bundle.putString(BUNDLE_KEY_NAME, inputEmail.getText().toString());

                        intent.putExtras(bundle);

                        startActivity(intent);
                    } else {
                        Toast.makeText(getApplicationContext(), "Wrong Credentials", Toast.LENGTH_LONG).show();
                    }

                }
            }

        });
    }

}
```

### Run

Copy the code or download it in the link below, build and run.

### Reference

Here are the reference links:

| Number | Link |
| --- | --- |
| 1. | [Download](https://github.com/AnkitKumar111/Android_Assignment7.4/archive/refs/heads/master.zip) Example |
| 2. | [Follow](https://github.com/AnkitKumar111/) code author |

## Example 4: Android Data Passing : ListView to ListView

Sometimes you may want to pass data from one listview in `Activity A` to ListView in say `Activity B`. Well that's the purpose of this tutorial.

We'll have two Activities, each with a ListView. We click a button and pass data from the first activity to the second activity, the first litsview to the second listview.

### Gradle Scripts

Let's come to our `build.gradle` file app level.

### 1\. Build.gradle

No sepcial dependency is needed for ths project

### LAYOUTS

We'll have three layouts:

#### 1\. activity_main.xml

- This layout will get inflated into the UI for our mainactivity.
- It will hold the `content_main.xml` layout.
- It contains our appbar and toolbar definitions.

```xml
    <?xml version="1.0" encoding="utf-8"?>
    <android.support.design.widget.CoordinatorLayout

        android_layout_width="match_parent"
        android_layout_height="match_parent"
        android_fitsSystemWindows="true"
        tools_context="com.tutorials.hp.listviewdatapassing.MainActivity">

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
            app_srcCompat="@android:drawable/ic_dialog_email" />

    </android.support.design.widget.CoordinatorLayout>
```

#### 2\. content_main.xml

- This will contain our First ListView.
- This layout gets included inside the `activity_main.xml`.

```xml
    <?xml version="1.0" encoding="utf-8"?>
    <RelativeLayout

        android_id="@+id/content_main"
        android_layout_width="match_parent"
        android_layout_height="match_parent"
        android_paddingBottom="@dimen/activity_vertical_margin"
        android_paddingLeft="@dimen/activity_horizontal_margin"
        android_paddingRight="@dimen/activity_horizontal_margin"
        android_paddingTop="@dimen/activity_vertical_margin"
        app_layout_behavior="@string/appbar_scrolling_view_behavior"
        tools_context="com.tutorials.hp.listviewdatapassing.MainActivity"
        tools_showIn="@layout/activity_main">

        <ListView
            android_id="@+id/firstLV"
            android_layout_width="match_parent"
            android_layout_height="wrap_content" />
    </RelativeLayout>
```

#### 3\. activity_second.xml

- This layout will be inflated into the UI for our second activity.
- It will hold the second activity.

```xml
    <?xml version="1.0" encoding="utf-8"?>
    <RelativeLayout

        android_id="@+id/activity_second"
        android_layout_width="match_parent"
        android_layout_height="match_parent"
        android_paddingBottom="@dimen/activity_vertical_margin"
        android_paddingLeft="@dimen/activity_horizontal_margin"
        android_paddingRight="@dimen/activity_horizontal_margin"
        android_paddingTop="@dimen/activity_vertical_margin"
        tools_context="com.tutorials.hp.listviewdatapassing.SecondActivity">
        <ListView
            android_id="@+id/secondLV"
            android_layout_width="match_parent"
            android_layout_height="wrap_content"
            />
    </RelativeLayout>
```

#### JAVA CLASSES

Here are our java classes:

**1\. SpacecraftsCollection**

- This is class that will help us in transfering our ArrayList from the first to the second activity. This class will be serialized, transfered then deserialized in the second activity

```java
    import java.io.Serializable;
    import java.util.ArrayList;

    public class SpacecraftsCollection implements Serializable {

        private ArrayList<String> spacecrafts;

        public ArrayList<String> getSpacecrafts() {
            return spacecrafts;
        }

        public void setSpacecrafts(ArrayList<String> spacecrafts) {
            this.spacecrafts = spacecrafts;
        }
    }
```

**2\. SecondActivity.java**

- This is our second activity class.
- It will receive a serialized arraylist containing our spacecrafts and deserialize it and display in the second listview.

```java
    public class SecondActivity extends AppCompatActivity {

        //SECOND LISTVIEW
        ListView lv;

        @Override
        protected void onCreate(Bundle savedInstanceState) {
            super.onCreate(savedInstanceState);
            setContentView(R.layout.activity_second);

            lv= (ListView) findViewById(R.id.secondLV);

            receiveData();
        }

        /*
        RECEIVE DATA FROM FIRST ACTIVITY
         */
        private void receiveData()
        {
            Intent i=this.getIntent();
            SpacecraftsCollection spacecraftsCollection= (SpacecraftsCollection) i.getSerializableExtra("SPACECRAFTS");

            lv.setAdapter(new ArrayAdapter<>(this,android.R.layout.simple_list_item_1,spacecraftsCollection.getSpacecrafts()));
        }
    }
```

**3\. MainActivity.java**

- Our MainActivity class.
- Our arraylist data will be transfered from here to the second activity when the floating action button is clicked.

```java
    public class MainActivity extends AppCompatActivity {

        //FIRST LISTVIEW
        ListView lv;
        ArrayList spacecrafts=new ArrayList();

        @Override
        protected void onCreate(Bundle savedInstanceState) {
            super.onCreate(savedInstanceState);
            setContentView(R.layout.activity_main);
            Toolbar toolbar = (Toolbar) findViewById(R.id.toolbar);
            setSupportActionBar(toolbar);

            lv= (ListView) findViewById(R.id.firstLV);
            populateData();
            lv.setAdapter(new ArrayAdapter<String>(this,android.R.layout.simple_list_item_1,spacecrafts));

            FloatingActionButton fab = (FloatingActionButton) findViewById(R.id.fab);
            fab.setOnClickListener(new View.OnClickListener() {
                @Override
                public void onClick(View view) {
                    lv.setAdapter(new ArrayAdapter<String>(MainActivity.this,android.R.layout.simple_list_item_1,new ArrayList<String>()));
                    sendData();
                }
            });
        }

        //POPULATE SPACECRAFTS ARRAYLIST
        private void populateData()
        {
            spacecrafts.add("Casini");
            spacecrafts.add("Enterprise");
            spacecrafts.add("Spitzer");
            spacecrafts.add("Huygens");
            spacecrafts.add("WMAP");
            spacecrafts.add("Juno");
            spacecrafts.add("Kepler");
            spacecrafts.add("Apollo 15");
            spacecrafts.add("Challenger");
            spacecrafts.add("Discovery");
        }

        /*
        SET ARRAYLIST TO SPACECRAFTS COLLECTION CLASS
         */
        private SpacecraftsCollection getData()
        {
            SpacecraftsCollection spacecraftsCollection=new SpacecraftsCollection();
            spacecraftsCollection.setSpacecrafts(spacecrafts);

            return spacecraftsCollection;
        }

        /*
        SEND DATA TO SECOND ACTIVITY
         */
        private void sendData()
        {
            Intent i=new Intent(this,SecondActivity.class);
            i.putExtra("SPACECRAFTS",this.getData());
            startActivity(i);
        }
    }
```

### Result

Here is what you get when you run the project:

![How to Pass Data From ListView to ListView](https://camposha.info/android-examples/wp-content/uploads/sites/9/2021/05/pass-data-from-listview-to-listview.gif)

### Download

Download code [here](http://github.com/Oclemy/Android-ListViewDataPassing).
