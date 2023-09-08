# Android PHP MySQL Full CRUD - INSERT SELECT UPDATE DELETE SEARCH with Pagination


This is an android PHP MySQL Full CRUD - INSERT SELECT UPDATE DELETE SEARCH with Pagination tutorial.


## Create Android Studio Project,Adding Gradle Dependencies

### Introduction

Gradle is android's defacto build system. As well as building our app, we can add dependencies into our app through Gradle. Dependencies are just libraries or re-usable code written by other developers that allow us incorporate some feature into our app. By using libraries you avoid wasting time re-inventing the wheel. However it must be said that you need to careful with libraries you add into your project as some are not well written and tested and may break your app. Moreover they can add unnecessary bloat into your app.

In this lesson we will add some dependencies into our app. All these are quality libraries however some of them may be ommitted as per your wish.

### Step 1

Go over to your app level build.gradle. That is the `build.gradle` file located in the app folder of your project.

Then add the following code in your dependencies closure:

```groovy
    implementation 'com.android.support:appcompat-v7:28.0.0'

    implementation 'com.android.support:cardview-v7:28.0.0'
    implementation 'com.android.support:design:28.0.0'

    implementation 'com.squareup.retrofit2:retrofit:2.4.0'
    implementation 'com.squareup.retrofit2:converter-gson:2.4.0'

    implementation 'com.squareup.picasso:picasso:2.71828'
    implementation 'com.github.ivbaranov:materiallettericon:0.2.3'
    implementation "android.helper:datetimepickeredittext:1.0.0"
    implementation 'io.github.inflationx:calligraphy3:3.1.0'
    implementation 'io.github.inflationx:viewpump:1.0.0'
    implementation 'com.yarolegovich:lovely-dialog:1.1.0'
```

### Explanations

#### 1\. AppcompatActivity

```groovy
   implementation 'com.android.support:appcompat-v7:28.0.0'
```

We are using the `implementation` statement to add `appcompat` into our project. Through this package we will get access to `AppcompatActivity` which will be the super class of all our activities. Read more about AppcompatActivity here.

#### 2\. CardView

```groovy
    implementation 'com.android.support:cardview-v7:28.0.0'
```

The second dependency is CardView, a support library that will allow us create cards.

#### 3\. Design Support

```groovy
    implementation 'com.android.support:design:28.0.0'
```

This support library will give us access to several classes like [RecyclerView](https://camposha.info/android/recyclerview) and ToolBar.

#### 4\. Retrofit

```groovy
    implementation 'com.squareup.retrofit2:retrofit:2.4.0'
```

Retrofit is a third party HTTP client library for android.It will allow us talk to our REST API. Read more about [Retrofit here](https://camposha.info/android/retrofit)

#### 5\. Converter GSON

```groovy
    implementation 'com.squareup.retrofit2:converter-gson:2.4.0'
```

This will work together with Retrofit. It will map our domain objects to JSON Objects.

### Live Video Lesson

<iframe width="788" height="443" src="https://www.youtube.com/embed/yTvSCPzxBd8" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>

#### 6\. Picasso

```groovy
    implementation 'com.squareup.picasso:picasso:2.71828'
```

Picasso is a popular image loading library.

#### 7\. MaterialLetterIcon

```groovy
    implementation 'com.github.ivbaranov:materiallettericon:0.2.3'
```

This is a letter icon library. We can give it a letter or a digit and then it converts it to a beautiful icon which we can show instead of an image.

#### 8\. DatePickerEditText

```groovy
    implementation "android.helper:datetimepickeredittext:1.0.0"
```

In our demo app you noticed we could enter a date using an edittext. This is because of this simple library. Obviously you can implement such a functionality from scratch. However this library will save us some time. You click an edittext then a date picker gets shown.

#### 9\. Calligraphy

```groovy
    implementation 'io.github.inflationx:calligraphy3:3.1.0'
```

Well this library allows us use custom fonts in our application. You can download any font like Roboto and use them easily in our android via this library.

#### 10\. Viewpump

```groovy
    implementation 'io.github.inflationx:viewpump:1.0.0'
```

This library is a requirement of Calligraphy.

#### 11\. LovelyDialogs

```groovy
    implementation 'com.yarolegovich:lovely-dialog:1.1.0'
```

This library is one of the best android material dialog libraries.

### What we've Learnt

In this lesson we have learnt how to add dependencies into our build.gradle. We've said those dependencies are just libraries which are just modules of code we can re-use. We've then looked at the individual libraries and listed what they will do to our app.

## Creating MySQL Database and Tables using PHPMYAdmin

In this lesson we will use PHPMyAdmin to:

1. Create Database.
2. Create Tables

<iframe width="788" height="443" src="https://www.youtube.com/embed/yTvSCPzxBd8" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>

## Creating a Professional Splash screen

### (a). activity_splash.xml

In your `res/layout` folder, create a layout called `activity_splash.xml` and add the following code:

```xml
<?xml version="1.0" encoding="utf-8"?>
<LinearLayout xmlns:android="http://schemas.android.com/apk/res/android"
    xmlns:tools="http://schemas.android.com/tools"
    android:layout_width="match_parent"
    android:layout_height="match_parent"
    android:background="@drawable/m_splash_screen_bg"
    android:gravity="center"
    android:orientation="vertical"
    tools:context=".Views.SplashActivity">

    <ImageView
        android:id="@+id/mLogo"
        android:layout_width="120dp"
        android:layout_height="120dp"
        android:src="@drawable/campo" />

    <TextView
        android:id="@+id/mainTitle"
        android:layout_width="match_parent"
        android:layout_height="wrap_content"
        android:layout_marginTop="20dp"
        android:text="ProgrammingWizards TV"
        android:textAlignment="center"
        android:textColor="@color/colorTitleColor"
        android:textSize="24sp"
        android:textStyle="bold" />

    <TextView
        android:id="@+id/subTitle"
        android:layout_width="match_parent"
        android:layout_height="wrap_content"
        android:text="Watch Great Courses in YouTube in HD"
        android:textAlignment="center"
        android:textColor="@color/colorTitleColor"
        android:textSize="18sp" />

</LinearLayout>
```

### (b). SplashActivity.java

#### Step 1 : Add Imports

Now come create a classs called SplashActivity.java.

First add imports below:

```java
import android.content.Context;
import android.os.Bundle;
import android.support.v7.app.AppCompatActivity;
import android.view.animation.Animation;
import android.view.animation.AnimationUtils;
import android.widget.ImageView;
import android.widget.TextView;

import info.camposha.retrofitmysqlcrud.Helpers.Utils;
import info.camposha.retrofitmysqlcrud.R;
import io.github.inflationx.viewpump.ViewPumpContextWrapper;
```

#### Step 2: Inherit From AppCompatActivity

Now below the imports we will create a class called `SplashActivity`. Make it an [activity](https://camposha.info/android/activity) by deriving from `AppCompatActivity`:

```java
public class SplashActivity extends AppCompatActivity {
```

#### Step 3 : Specify Instance Fields

Add the following code inside the class:

```java
    //our splash screen views
    private ImageView mLogo;
    private TextView mainTitle, subTitle;
```

The ImageView is our logo. The two textviews will be our main title and subtitle.

#### Live Video Lesson

<iframe width="788" height="443" src="https://www.youtube.com/embed/BIqNCVTTjHY" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>

#### Step 4 : Initialize Our wigets

Then add the following code:

```java
    private void initializeWidgets() {
        mLogo = findViewById(R.id.mLogo);
        mainTitle = findViewById(R.id.mainTitle);
        subTitle = findViewById(R.id.subTitle);
    }
```

In the avove code we are just initializing or referencing our imageview and textviews.

#### Step 5 : Showing our Splash Screen

Add the following code:

```java
    private void showSplashAnimation() {
        Animation animation = AnimationUtils.loadAnimation(this, R.anim.top_to_bottom);
        mLogo.startAnimation(animation);

        Animation fadeIn = AnimationUtils.loadAnimation(this, R.anim.fade_in);
        mainTitle.startAnimation(fadeIn);
        subTitle.startAnimation(fadeIn);
    }
```

We've created the method that will be invoked to show our splash screen. In the first line we are loading our `top_to_bottom` animation. As you can see we are using the `AnimationUtils` class. The we start the animation using the `startAnimation` class.

Then we also load our fade in animation. We start them for both our main title and sub title textviews.

#### Step 6 : Moving to our Dashboard

```java
    private void goToDashboard() {
        Thread t = new Thread() {
            @Override
            public void run() {
                try {
                    sleep(2000);
                    Utils.openActivity(SplashActivity.this, DashboardActivity.class);
                    finish();
                    super.run();
                } catch (InterruptedException e) {
                    e.printStackTrace();
                }
            }
        };
        t.start();
    }
```

Well after our splash animation has finished playing in our Splash screen, we need to navigate to the next activity, our dashboard activity.

So we've created a thread and implemented it's `run()` method. We will sleep it for 2000 miliseconds(2 seconds). Then open the dashboard activity and finish the current activity.

NB/= Finishing the current activity explicitly is important so that if the user clicks the back button while in Dashboard activity we don't show the spash screen again.

#### Full Code

Here is the full code:

```java
package info.camposha.retrofitmysqlcrud.Views;

import android.content.Context;
import android.os.Bundle;
import android.support.v7.app.AppCompatActivity;
import android.view.animation.Animation;
import android.view.animation.AnimationUtils;
import android.widget.ImageView;
import android.widget.TextView;

import info.camposha.retrofitmysqlcrud.Helpers.Utils;
import info.camposha.retrofitmysqlcrud.R;
import io.github.inflationx.viewpump.ViewPumpContextWrapper;

public class SplashActivity extends AppCompatActivity {

    //our splash screen views
    private ImageView mLogo;
    private TextView mainTitle, subTitle;

    /**
     * Let's initialize our widgets.
     */
    private void initializeWidgets() {
        mLogo = findViewById(R.id.mLogo);
        mainTitle = findViewById(R.id.mainTitle);
        subTitle = findViewById(R.id.subTitle);
    }

    /**
     * Let's show our Splash animation using Animation class. We fade in our widgets.
     */
    private void showSplashAnimation() {
        Animation animation = AnimationUtils.loadAnimation(this, R.anim.top_to_bottom);
        mLogo.startAnimation(animation);

        Animation fadeIn = AnimationUtils.loadAnimation(this, R.anim.fade_in);
        mainTitle.startAnimation(fadeIn);
        subTitle.startAnimation(fadeIn);
    }
    /**
     * Let's go to our DashBoard after 2 seconds
     */
    private void goToDashboard() {
        Thread t = new Thread() {
            @Override
            public void run() {
                try {
                    sleep(2000);
                    Utils.openActivity(SplashActivity.this, DashboardActivity.class);
                    finish();
                    super.run();
                } catch (InterruptedException e) {
                    e.printStackTrace();
                }
            }
        };
        t.start();
    }

    /**
     * Let's Override attachBaseContext method
     */
    @Override
    protected void attachBaseContext(Context newBase) {
        super.attachBaseContext(ViewPumpContextWrapper.wrap(newBase));
    }

    /**
     * Let's create our onCreate method
     */
    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_splash);

        this.initializeWidgets();
        this.showSplashAnimation();
        this.goToDashboard();
    }

}
//end
```

## Creating a Beautiful Dashboard

### (a). activity_dashboard.xml

The first step is to design our dashboard layout. You can use android studio designer or just write the XML code.

Start by adding a CoordinatorLayout as your root element:

```xml
<?xml version="1.0" encoding="utf-8"?>
<android.support.design.widget.CoordinatorLayout xmlns:android="http://schemas.android.com/apk/res/android"
    xmlns:app="http://schemas.android.com/apk/res-auto"
    xmlns:tools="http://schemas.android.com/tools"
    android:layout_width="match_parent"
    android:layout_height="match_parent"
    android:background="#009968"
    tools:context=".Views.DashboardActivity">

    ....

</android.support.design.widget.CoordinatorLayout>
```

You can see we have supplied a greenish background in our dashboard.

Inside the CoordinatorLayout add the AppBarLayout:

```xml
    <android.support.design.widget.AppBarLayout
        android:id="@+id/appbar"
        android:layout_width="match_parent"
        android:layout_height="300dp"
        android:theme="@style/ThemeOverlay.AppCompat.Dark.ActionBar">

        ....

    </android.support.design.widget.AppBarLayout>
```

Inside the AppBarlayout add the CollapsingToolBar:

```xml
        <android.support.design.widget.CollapsingToolbarLayout
            android:id="@+id/colapsingtoolbar"
            android:layout_width="match_parent"
            android:layout_height="wrap_content"
            android:background="@drawable/m_waterfall"
            app:contentScrim="@color/colorPrimary"
            app:expandedTitleMarginEnd="64dp"
            app:expandedTitleMarginStart="48dp"
            app:layout_scrollFlags="exitUntilCollapsed|scroll"
            app:title="Retrofit CRUD">

            .....

        </android.support.design.widget.CollapsingToolbarLayout>
```

You cam see above that we have supplied the title of the CollapsingToolBar. You can change this title dynamically in your java code. You'll have to reference the CollapsingToolBar to do so, hence make sure you assign it an id.

Now come inside the CollapsingToolBar and add a toolbar:

```xml
            <android.support.v7.widget.Toolbar
                android:id="@+id/toolbarid"
                android:layout_width="match_parent"
                android:layout_height="?attr/actionBarSize"
                app:layout_collapseMode="pin"
                app:popupTheme="@style/AlertDialog.AppCompat.Light" />
```

Then outside the AppBarLayout but inside the CoordinatorLayout, add a Nested ScrollView. It is inside that NestedScrollView where we will add our content comprising of various CardViews with images and textviews.

## Live Video Lesson

<iframe width="788" height="443" src="https://www.youtube.com/embed/MU0rFQJ87uI" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>

Here's the full code:

```xml
<?xml version="1.0" encoding="utf-8"?>
<android.support.design.widget.CoordinatorLayout xmlns:android="http://schemas.android.com/apk/res/android"
    xmlns:app="http://schemas.android.com/apk/res-auto"
    xmlns:tools="http://schemas.android.com/tools"
    android:layout_width="match_parent"
    android:layout_height="match_parent"
    android:background="#009968"
    tools:context=".Views.DashboardActivity">

    <android.support.design.widget.AppBarLayout
        android:id="@+id/appbar"
        android:layout_width="match_parent"
        android:layout_height="300dp"
        android:theme="@style/ThemeOverlay.AppCompat.Dark.ActionBar">

        <android.support.design.widget.CollapsingToolbarLayout
            android:id="@+id/colapsingtoolbar"
            android:layout_width="match_parent"
            android:layout_height="wrap_content"
            android:background="@drawable/m_waterfall"
            app:contentScrim="@color/colorPrimary"
            app:expandedTitleMarginEnd="64dp"
            app:expandedTitleMarginStart="48dp"
            app:layout_scrollFlags="exitUntilCollapsed|scroll"
            app:title="Retrofit CRUD">

            <android.support.v7.widget.Toolbar
                android:id="@+id/toolbarid"
                android:layout_width="match_parent"
                android:layout_height="?attr/actionBarSize"
                app:layout_collapseMode="pin"
                app:popupTheme="@style/AlertDialog.AppCompat.Light" />

        </android.support.design.widget.CollapsingToolbarLayout>

    </android.support.design.widget.AppBarLayout>

    <android.support.v4.widget.NestedScrollView
        android:layout_width="match_parent"
        android:layout_height="match_parent"
        app:layout_behavior="@string/appbar_scrolling_view_behavior">

        <LinearLayout
            android:layout_width="match_parent"
            android:layout_height="match_parent"
            android:background="@color/lightgray"
            android:gravity="center"
            android:orientation="vertical"
            android:padding="10dp">

            <LinearLayout
                android:layout_width="match_parent"
                android:layout_height="wrap_content"
                android:clipToPadding="false"
                android:gravity="center">

                <android.support.v7.widget.CardView
                    android:layout_width="160dp"
                    android:layout_height="190dp"
                    android:layout_margin="10dp"
                    android:clickable="true"
                    android:foreground="?android:attr/selectableItemBackground">

                    <LinearLayout
                        android:id="@+id/viewScientistsCard"
                        android:layout_width="match_parent"
                        android:layout_height="match_parent"
                        android:gravity="center"
                        android:orientation="vertical">

                        <ImageView
                            android:layout_width="64dp"
                            android:layout_height="64dp"
                            android:background="@drawable/m_circle_bg_purple"
                            android:padding="10dp"
                            android:src="@drawable/m_list" />

                        <TextView
                            android:layout_width="wrap_content"
                            android:layout_height="wrap_content"
                            android:layout_marginTop="10dp"
                            android:text="View All"
                            android:textStyle="bold" />

                        <TextView
                            android:layout_width="wrap_content"
                            android:layout_height="wrap_content"
                            android:gravity="center"
                            android:padding="5dp"
                            android:text="View all Scientists"
                            android:textColor="@android:color/darker_gray" />

                    </LinearLayout>

                </android.support.v7.widget.CardView>

                <android.support.v7.widget.CardView
                    android:layout_width="160dp"
                    android:layout_height="190dp"
                    android:layout_margin="10dp"
                    android:clickable="true"
                    android:foreground="?android:attr/selectableItemBackground">

                    <LinearLayout
                        android:id="@+id/addScientistCard"
                        android:layout_width="match_parent"
                        android:layout_height="match_parent"
                        android:gravity="center"
                        android:orientation="vertical">

                        <ImageView
                            android:layout_width="64dp"
                            android:layout_height="64dp"
                            android:background="@drawable/m_circle_bg_pink"
                            android:padding="10dp"
                            android:src="@drawable/m_add" />

                        <TextView
                            android:layout_width="wrap_content"
                            android:layout_height="wrap_content"
                            android:layout_marginTop="10dp"
                            android:text="Add"
                            android:textStyle="bold" />

                        <TextView
                            android:layout_width="wrap_content"
                            android:layout_height="wrap_content"
                            android:gravity="center"
                            android:padding="5dp"
                            android:text="Add New Scientist to the Database"
                            android:textColor="@android:color/darker_gray" />

                    </LinearLayout>

                </android.support.v7.widget.CardView>
            </LinearLayout>

            <LinearLayout
                android:layout_width="match_parent"
                android:layout_height="wrap_content"
                android:clipToPadding="false"
                android:gravity="center"
                android:orientation="horizontal">

                <android.support.v7.widget.CardView
                    android:layout_width="160dp"
                    android:layout_height="190dp"
                    android:layout_margin="10dp"
                    android:clickable="true"
                    android:foreground="?android:attr/selectableItemBackground">

                    <LinearLayout
                        android:id="@+id/third"
                        android:layout_width="match_parent"
                        android:layout_height="match_parent"
                        android:gravity="center"
                        android:orientation="vertical">

                        <ImageView
                            android:layout_width="64dp"
                            android:layout_height="64dp"
                            android:background="@drawable/m_circle_bg_green"
                            android:padding="10dp"
                            android:src="@drawable/m_cloud_circle_black" />

                        <TextView
                            android:layout_width="wrap_content"
                            android:layout_height="wrap_content"
                            android:layout_marginTop="10dp"
                            android:text="Another Item"
                            android:textStyle="bold" />

                        <TextView
                            android:layout_width="wrap_content"
                            android:layout_height="wrap_content"
                            android:gravity="center"
                            android:padding="5dp"
                            android:text="You can connect another page here."
                            android:textColor="@android:color/darker_gray" />

                    </LinearLayout>

                </android.support.v7.widget.CardView>

                <android.support.v7.widget.CardView
                    android:layout_width="160dp"
                    android:layout_height="190dp"
                    android:layout_margin="10dp"
                    android:clickable="true"
                    android:foreground="?android:attr/selectableItemBackground">

                    <LinearLayout
                        android:id="@+id/closeCard"
                        android:layout_width="match_parent"
                        android:layout_height="match_parent"
                        android:gravity="center"
                        android:orientation="vertical">

                        <ImageView
                            android:layout_width="64dp"
                            android:layout_height="64dp"
                            android:background="@drawable/m_circle_bg_yello"
                            android:padding="10dp"
                            android:src="@drawable/m_icon_logout" />

                        <TextView
                            android:layout_width="wrap_content"
                            android:layout_height="wrap_content"
                            android:layout_marginTop="10dp"
                            android:text="Exit"
                            android:textStyle="bold" />

                        <TextView
                            android:layout_width="wrap_content"
                            android:layout_height="wrap_content"
                            android:gravity="center"
                            android:padding="5dp"
                            android:text="Exit the App. "
                            android:textColor="@android:color/darker_gray" />

                    </LinearLayout>

                </android.support.v7.widget.CardView>
            </LinearLayout>

        </LinearLayout>

    </android.support.v4.widget.NestedScrollView>

</android.support.design.widget.CoordinatorLayout>
```

### (b). DashboardActivity.java

Here's the full code for Dashboard activity

```java
package info.camposha.retrofitmysqlcrud.Views;

import android.content.Context;
import android.os.Bundle;
import android.support.v7.app.AppCompatActivity;
import android.view.View;
import android.widget.LinearLayout;

import info.camposha.retrofitmysqlcrud.Helpers.Utils;
import info.camposha.retrofitmysqlcrud.R;
import io.github.inflationx.viewpump.ViewPumpContextWrapper;

public class DashboardActivity extends AppCompatActivity {

    //We have 4 cards in the dashboard
    LinearLayout viewScientistsCard;
    LinearLayout addScientistCard;
    LinearLayout third;
    LinearLayout closeCard;
    /**
     * Let's initialize our cards  and listen to their click events
     */
    private void initializeWidgets(){
        viewScientistsCard = findViewById(R.id.viewScientistsCard);
        addScientistCard = findViewById(R.id.addScientistCard);
        third = findViewById(R.id.third);
        closeCard = findViewById(R.id.closeCard);

        viewScientistsCard.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                Utils.openActivity(DashboardActivity.this,ScientistsActivity.class);

            }
        });
        addScientistCard.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                Utils.openActivity(DashboardActivity.this,CRUDActivity.class);

            }
        });
        third.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {

                Utils.showInfoDialog(DashboardActivity.this, "YEEES",
                "Hey You can Display another page when this is clicked");

            }
        });
        closeCard.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                finish();

            }
        });
    }
    /**
     * Let's override the attachBaseContext() method
     */
    @Override
    protected void attachBaseContext(Context newBase) {
        super.attachBaseContext(ViewPumpContextWrapper.wrap(newBase));
    }

    /**
     * When the back button is pressed finish this activity
     */
    @Override
    public void onBackPressed() {
        super.onBackPressed();
        this.finish();
    }

    /**
     * Let's override the onCreate() and call our initializeWidgets()
     */
    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_dashboard);

        this.initializeWidgets();
    }
}
//end
```

## Creating a Beautiful Details Page

In this lesson we will learn how to design and create a detail activity. We will also learn how to receive data and set them on this detail activity. This is part of the android live courses series season 1. In season 1 we are creating a full scientists app based on mysql crud. In the app we can register scientists and view their details in a beautiful app.

## Video Lesson

<iframe width="788" height="443" src="https://www.youtube.com/embed/xFFnOayfMaA" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>

### (a). activity_detail.xml and detal_content.xml

Here's the full detail activity layout:

#### (I). activity_detail.xml

```xml
<?xml version="1.0" encoding="utf-8"?>
<android.support.design.widget.CoordinatorLayout xmlns:android="http://schemas.android.com/apk/res/android"
    xmlns:app="http://schemas.android.com/apk/res-auto"
    xmlns:tools="http://schemas.android.com/tools"
    android:layout_width="match_parent"
    android:layout_height="match_parent"
    android:fitsSystemWindows="true"
    tools:context=".Views.DetailActivity">

    <android.support.design.widget.AppBarLayout
        android:layout_width="match_parent"
        android:layout_height="wrap_content">

        <android.support.design.widget.CollapsingToolbarLayout
            android:id="@+id/mCollapsingToolbarLayout"
            android:layout_width="match_parent"
            android:layout_height="256dp"
            android:fitsSystemWindows="true"
            app:contentScrim="?attr/colorPrimary"
            app:expandedTitleMarginEnd="64dp"
            app:expandedTitleMarginStart="48dp"
            app:layout_scrollFlags="scroll|exitUntilCollapsed">

            <ImageView
                android:id="@+id/scientistImg"
                android:layout_width="match_parent"
                android:layout_height="match_parent"
                android:fitsSystemWindows="true"
                android:scaleType="fitXY"
                android:src="@drawable/m_cactus"
                app:layout_collapseMode="parallax" />

            <android.support.v7.widget.Toolbar
                android:id="@+id/toolbar"
                android:layout_width="match_parent"
                android:layout_height="?attr/actionBarSize"
                android:background="@android:color/transparent"
                app:layout_collapseMode="pin"
                app:popupTheme="@style/ThemeOverlay.AppCompat.Light" />
        </android.support.design.widget.CollapsingToolbarLayout>

    </android.support.design.widget.AppBarLayout>

    <android.support.v4.widget.NestedScrollView
        android:layout_width="match_parent"
        android:layout_height="match_parent"
        app:layout_behavior="@string/appbar_scrolling_view_behavior">

        <LinearLayout
            android:layout_width="match_parent"
            android:layout_height="wrap_content"
            android:orientation="vertical">

            <include layout="@layout/detail_content" />

            <android.support.design.widget.FloatingActionButton
                android:id="@+id/editFAB"
                android:layout_width="wrap_content"
                android:layout_height="wrap_content"
                android:layout_gravity="bottom|end"
                android:layout_margin="16dp"
                android:src="@android:drawable/ic_menu_edit"
                android:tint="@android:color/white" />

        </LinearLayout>

    </android.support.v4.widget.NestedScrollView>
</android.support.design.widget.CoordinatorLayout>
```

#### (II). detail_content

```xml
<?xml version="1.0" encoding="utf-8"?>
<android.support.v7.widget.CardView xmlns:android="http://schemas.android.com/apk/res/android"
    android:layout_width="match_parent"
    android:layout_height="match_parent"
    android:layout_margin="16dp">

    <ScrollView
        android:layout_width="match_parent"
        android:layout_height="match_parent">

        <LinearLayout
            android:layout_width="match_parent"
            android:layout_height="match_parent"
            android:orientation="vertical">

            <LinearLayout
                android:layout_width="match_parent"
                android:layout_height="wrap_content"
                android:orientation="vertical">

                <TextView
                    android:layout_width="match_parent"
                    android:layout_height="wrap_content"
                    android:padding="5dp"
                    android:text="Personal Details"
                    android:textAlignment="center"
                    android:textAppearance="@style/TextAppearance.AppCompat.Large"
                    android:textColor="@color/niceGreenish"
                    android:textStyle="italic" />

                <android.support.v7.widget.CardView
                    android:layout_width="match_parent"
                    android:layout_height="wrap_content"
                    android:layout_margin="@dimen/card_margin">

                    <LinearLayout
                        android:layout_width="match_parent"
                        android:layout_height="wrap_content"
                        android:orientation="vertical">

                        <TextView
                            android:layout_width="match_parent"
                            android:layout_height="wrap_content"
                            android:padding="@dimen/text_padding"
                            android:text="NAME"
                            android:textAppearance="@style/TextAppearance.AppCompat.Title"
                            android:textColor="@color/colorAccent" />

                        <TextView
                            android:id="@+id/nameTV"
                            android:layout_width="match_parent"
                            android:layout_height="wrap_content"
                            android:padding="@dimen/text_padding"
                            android:text="ALBERT EINSTEIN" />

                    </LinearLayout>

                </android.support.v7.widget.CardView>

                <android.support.v7.widget.CardView
                    android:layout_width="match_parent"
                    android:layout_height="wrap_content"
                    android:layout_margin="@dimen/card_margin">

                    <LinearLayout
                        android:layout_width="match_parent"
                        android:layout_height="wrap_content"
                        android:orientation="vertical">

                        <TextView
                            android:layout_width="match_parent"
                            android:layout_height="wrap_content"
                            android:padding="@dimen/text_padding"
                            android:text="DESCRIPTION"
                            android:textAppearance="@style/TextAppearance.AppCompat.Title"
                            android:textColor="@color/colorAccent" />

                        <TextView
                            android:id="@+id/descriptionTV"
                            android:layout_width="match_parent"
                            android:layout_height="wrap_content"
                            android:padding="@dimen/text_padding"
                            android:text="This is the description." />

                    </LinearLayout>

                </android.support.v7.widget.CardView>

                <TextView
                    android:layout_width="match_parent"
                    android:layout_height="wrap_content"
                    android:padding="5dp"
                    android:text="Residency"
                    android:textAlignment="center"
                    android:textAppearance="@style/TextAppearance.AppCompat.Large"
                    android:textColor="@color/niceGreenish"
                    android:textStyle="italic" />

                <android.support.v7.widget.CardView
                    android:layout_width="match_parent"
                    android:layout_height="wrap_content"
                    android:layout_margin="@dimen/card_margin">

                    <LinearLayout
                        android:layout_width="match_parent"
                        android:layout_height="wrap_content"
                        android:orientation="vertical">

                        <TextView
                            android:layout_width="match_parent"
                            android:layout_height="wrap_content"
                            android:padding="@dimen/text_padding"
                            android:text="GALAXY"
                            android:textAppearance="@style/TextAppearance.AppCompat.Title"
                            android:textColor="@color/colorAccent" />

                        <TextView
                            android:id="@+id/galaxyTV"
                            android:layout_width="match_parent"
                            android:layout_height="wrap_content"
                            android:padding="@dimen/text_padding"
                            android:text="Galaxy" />

                        <TextView
                            android:layout_width="match_parent"
                            android:layout_height="wrap_content"
                            android:padding="@dimen/text_padding"
                            android:text="STAR"
                            android:textAppearance="@style/TextAppearance.AppCompat.Title"
                            android:textColor="@color/colorAccent" />

                        <TextView
                            android:id="@+id/starTV"
                            android:layout_width="match_parent"
                            android:layout_height="wrap_content"
                            android:padding="@dimen/text_padding"
                            android:text="Star" />

                    </LinearLayout>

                </android.support.v7.widget.CardView>

                <TextView
                    android:layout_width="match_parent"
                    android:layout_height="wrap_content"
                    android:padding="5dp"
                    android:text="Period"
                    android:textAlignment="center"
                    android:textAppearance="@style/TextAppearance.AppCompat.Large"
                    android:textColor="@color/niceGreenish"
                    android:textStyle="italic" />

                <android.support.v7.widget.CardView
                    android:layout_width="match_parent"
                    android:layout_height="wrap_content"
                    android:layout_margin="@dimen/card_margin">

                    <LinearLayout
                        android:layout_width="match_parent"
                        android:layout_height="wrap_content"
                        android:orientation="vertical">

                        <TextView
                            android:layout_width="match_parent"
                            android:layout_height="wrap_content"
                            android:padding="@dimen/text_padding"
                            android:text="Date Of Birth"
                            android:textAppearance="@style/TextAppearance.AppCompat.Title"
                            android:textColor="@color/colorAccent" />

                        <TextView
                            android:id="@+id/dobTV"
                            android:layout_width="match_parent"
                            android:layout_height="wrap_content"
                            android:padding="@dimen/text_padding"
                            android:text="Galaxy" />

                    </LinearLayout>

                </android.support.v7.widget.CardView>

                <android.support.v7.widget.CardView
                    android:layout_width="match_parent"
                    android:layout_height="wrap_content"
                    android:layout_margin="@dimen/card_margin">

                    <LinearLayout
                        android:layout_width="match_parent"
                        android:layout_height="wrap_content"
                        android:orientation="vertical">

                        <TextView
                            android:layout_width="match_parent"
                            android:layout_height="wrap_content"
                            android:padding="@dimen/text_padding"
                            android:text="Date Of Death"
                            android:textAppearance="@style/TextAppearance.AppCompat.Title"
                            android:textColor="@color/colorAccent" />

                        <TextView
                            android:id="@+id/diedTV"
                            android:layout_width="match_parent"
                            android:layout_height="wrap_content"
                            android:padding="@dimen/text_padding"
                            android:text="Date of Death" />

                    </LinearLayout>

                </android.support.v7.widget.CardView>

                <android.support.v7.widget.CardView
                    android:layout_width="match_parent"
                    android:layout_height="wrap_content"
                    android:layout_margin="@dimen/card_margin">

                    <LinearLayout
                        android:layout_width="match_parent"
                        android:layout_height="wrap_content"
                        android:orientation="vertical">

                        <TextView
                            android:layout_width="match_parent"
                            android:layout_height="wrap_content"
                            android:padding="@dimen/text_padding"
                            android:text="CONTRIBUTIONS"
                            android:textAppearance="@style/TextAppearance.AppCompat.Title"
                            android:textColor="@color/colorAccent" />

                        <TextView
                            android:id="@+id/contributionTV"
                            android:layout_width="match_parent"
                            android:layout_height="wrap_content"
                            android:padding="@dimen/text_padding"
                            android:text="This Scientist is included in this list because of the huge contributions he made to Science." />

                    </LinearLayout>

                </android.support.v7.widget.CardView>

            </LinearLayout>
        </LinearLayout>
    </ScrollView>

</android.support.v7.widget.CardView>
```

### (b). DetailActivity.java

Here's the full code for the detial activity:

```java
package info.camposha.retrofitmysqlcrud.Views;

import android.content.Context;
import android.os.Bundle;
import android.support.design.widget.CollapsingToolbarLayout;
import android.support.design.widget.FloatingActionButton;
import android.support.v4.app.NavUtils;
import android.support.v7.app.AppCompatActivity;
import android.view.Menu;
import android.view.MenuItem;
import android.view.View;
import android.widget.TextView;

import info.camposha.retrofitmysqlcrud.Helpers.Utils;
import info.camposha.retrofitmysqlcrud.R;
import info.camposha.retrofitmysqlcrud.Retrofit.Scientist;
import io.github.inflationx.viewpump.ViewPumpContextWrapper;

public class DetailActivity extends AppCompatActivity implements View.OnClickListener {

    //Let's define our instance fields
    private TextView nameTV,descriptionTV,galaxyTV,starTV,dobTV,diedTV;
    private FloatingActionButton editFAB;
    private Scientist receivedScientist;
    private CollapsingToolbarLayout mCollapsingToolbarLayout;

    /**
     * Let's initialize our widgets
     */
    private void initializeWidgets(){
        nameTV= findViewById(R.id.nameTV);
        descriptionTV= findViewById(R.id.descriptionTV);
        galaxyTV= findViewById(R.id.galaxyTV);
        starTV= findViewById(R.id.starTV);
        dobTV= findViewById(R.id.dobTV);
        diedTV= findViewById(R.id.diedTV);
        editFAB=findViewById(R.id.editFAB);
        editFAB.setOnClickListener(this);
        mCollapsingToolbarLayout=findViewById(R.id.mCollapsingToolbarLayout);
    }

    /**
     * We will now receive and show our data to their appropriate views.
     */
    private void receiveAndShowData(){
         receivedScientist= Utils.receiveScientist(getIntent(),DetailActivity.this);

         if(receivedScientist != null){
             nameTV.setText(receivedScientist.getName());
             descriptionTV.setText(receivedScientist.getDescription());
             galaxyTV.setText(receivedScientist.getGalaxy());
             starTV.setText(receivedScientist.getStar());
             dobTV.setText(receivedScientist.getDob());
             diedTV.setText(receivedScientist.getDied());

             mCollapsingToolbarLayout.setTitle(receivedScientist.getName());
             mCollapsingToolbarLayout.setExpandedTitleColor(getResources().
             getColor(R.color.white));
         }
    }
    /**
     * Let's inflate our menu for the detail page
     */
    @Override
    public boolean onCreateOptionsMenu(Menu menu) {
        getMenuInflater().inflate(R.menu.detail_page_menu, menu);
        return true;
    }

    /**
     * When a menu item is selected we want to navigate to the appropriate page
     */
    @Override
    public boolean onOptionsItemSelected(MenuItem item) {
        switch (item.getItemId()) {
            case R.id.action_edit:
                Utils.sendScientistToActivity(this,receivedScientist,CRUDActivity.class);
                finish();
                return true;
            case android.R.id.home:
                NavUtils.navigateUpFromSameTask(this);
                finish();
                return true;
        }
        return super.onOptionsItemSelected(item);
    }
    /**
     * When FAB button is clicked we want to go to the editing page
     */
    @Override
    public void onClick(View v) {
        int id =v.getId();
        if(id == R.id.editFAB){
            Utils.sendScientistToActivity(this,receivedScientist,CRUDActivity.class);
            finish();
        }
    }
    /**
     * Let's once again override the attachBaseContext. We do this for our
     * Calligraphy library
     */
    @Override
    protected void attachBaseContext(Context newBase) {
        super.attachBaseContext(ViewPumpContextWrapper.wrap(newBase));
    }

    /**
     * Let's finish the current activity when back button is pressed
     */
    @Override
    public void onBackPressed() {
        super.onBackPressed();
        this.finish();
    }
    /**
     * Our onCreate method
     */
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

Let's move to the next lesson.

### Demo

![](https://camposha.info/wp-content/uploads/2019/06/detail.gif)

## Creating Model and ResponseModel Classes

In this lesson we will define the model classes we will need for this project. Remember this is part of Android Live Courses Season 1 - Creating a Scientists App based on MySQL CRUD series. In this lesson we create two model classes:

#### (a). Scientist.java

This is our data object. It will represent our Scientist object. The scientist will have properties, defined by instance fields.

Start by creating a class called `Scientist` in `Scientit.java` file:

```java
import com.google.gson.annotations.SerializedName;
import java.io.Serializable;

 /**
 * Let's Create our Scientist class to represent a single Scientist.
 * It will implement java.io.Serializable interface, a marker interface that will allow
 *  our
 * class to support serialization and deserialization.
 */
public class Scientist implements Serializable {
```

As you can we have made it serializable by implementing the `java.io.Serializable` interface. Thus we will be able to pass it across activities easily then deserialize it.

Then go ahead and define our instance fields:

```java
    /**
     * Let' now come define instance fields for this class. We decorate them with
     * @SerializedName
     * attribute. Through this we are specifying the keys in our json data.
     */
    @SerializedName("id")
    private String mId;
    @SerializedName("name")
    private String name;
    @SerializedName("description")
    private String description;
    @SerializedName("galaxy")
    private String galaxy;
    @SerializedName("star")
    private String star;
    @SerializedName("dob")
    private String dob;
    @SerializedName("died")
    private String died;
```

As you can see we have annotated the various fields via the `@SerializedName` attribute. There we pass our JSON data's keys. Remember Retrofit will be using GSON to map this model class into our JSON Objects. Thus we need to specify the json keys to be mapped to specific fields.

Then we add our getters and setters:

```java
    /**
     * Let's now come define our getter and setter methods.
     */
    public String getId() {
        return mId;
    }

    public void setId(String id) {
        mId = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public String getStar() {
        return star;
    }

    public void setStar(String star) {
        this.star = star;
    }

    public String getGalaxy() {
        return galaxy;
    }

    public void setGalaxy(String galaxy) {
        this.galaxy = galaxy;
    }

    public String getDob() {
        return dob;
    }

    public void setDob(String dob) {
        this.dob = dob;
    }

    public String getDied() {
        return died;
    }

    public void setDied(String died) {
        this.died = died;
    }

    @Override
    public String toString() {
        return getName();
    }
}
//end
```

#### Video Lesson

<iframe width="788" height="443" src="https://www.youtube.com/embed/vsKKp6pBP0E" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>

#### (b). ResponseModel

This will represent our response model. We are defining a class to represent the data we will be getting from the server. That data will comprise the following:

| No. | Name | Description | Example |
| --- | --- | --- | --- |
| 1. | Code | The response Code. | `1` |
| 2. | Message | The response message | `SUCCESS` |
| 3. | List | The List of scientist objects | `List<Scientist> scientists` |

Here's the full code:

```java
package info.camposha.retrofitmysqlcrud.Retrofit;

import com.google.gson.annotations.SerializedName;
import java.util.List;

/**
 * Our json response will be mapped to this class.
 */
public class ResponseModel {
    /**
     * Our ResponseModel attributes
     */
    @SerializedName("result")
    List<Scientist> scientists;
    @SerializedName("code")
    private String code;
    @SerializedName("message")
    private String message;

    /**
     * Generate Getter and Setters
     */
    public List<Scientist> getResult() {
        return scientists;
    }

    public void setResult(List<Scientist> scientists) {
        this.scientists = scientists;
    }

    public String getCode() {
        return code;
    }

    public void setCode(String code) {
        this.code = code;
    }

    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message;
    }
}
//end
```

## Creating a REST API Interface

We will be making HTTP Calls to our server via our HTTP Client. That HTTP Client is [Retrofit](https://camposha.info/android/retrofit) in this case. Retrofit is the perfect fit for our project because it's both fast, convenient to use and well documented. It's convenient since it saves us from having to manually parse our JSON data when we download it, or encode our Form data to be sent to the server.

Through Retrofit, we only need to:

1. Create an interface to map to our API methods.
2. Instantiate Retrofit.
3. Enqueue a Call.

In this lesson we will do the first: creating an interface with methods that map to our server side API methods.

The second part, the instantiation of retrofit, occurs in the Utils class while the last part, the enqueing of our Calls will take place in our `ScientistsActivity` class and the `CRUDActivity` class.

Let's start.

### Video Tutorial

<iframe width="788" height="443" src="https://www.youtube.com/embed/Nz8DVOPVgsk" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>

First create a java file called `RestApi.java`.

Then add our imports:

```java
import retrofit2.Call;
import retrofit2.http.Field;
import retrofit2.http.FormUrlEncoded;
import retrofit2.http.GET;
import retrofit2.http.POST;
```

Then define our interfce:

```java
public interface RestApi {
```

### (a). Making a HTTP GET Request

Let's start by defining our first API method. Add it inside the interface:

```java
    @GET("index.php")
    Call<ResponseModel> retrieve();
```

You can see above we've defined an abstract method called `retrieve()`. The method doesn't take any parameters. It instead returns a `retrofit2.Call` object of generic parameter `ResponseModel`. It is also decorated with the `@GET` attribute. We specify the target URL in that attribute. In this case we've defined `index.php`, which is a just a path. Remember we had defined the base part of the URL in the `Utils` class. THe above method will make a HTTP call to the server and download all our scientists.

### (b). Inserting Data

Go ahead and add the following:

```java
    @FormUrlEncoded
    @POST("index.php")
    Call<ResponseModel> insertData(@Field("action") String action,
                                   @Field("name") String name,
                                   @Field("description") String description,
                                   @Field("galaxy") String galaxy,
                                   @Field("star") String star,
                                   @Field("dob") String dob,
                                   @Field("died") String died);
```

Above we've defined a method called `insertData()`. That method is taking several parameters include one we've called `action`. The above parameters, apart from the `action` will be inserted into our mysql database. The action is just a string to identify our action, like in this case we are telling our server that this HTTP POST request is supposed to insert data to the database.

Again the response will be mapped to the `ResponseModel` class. Note that the method is actually returning a a `retrofit2.Call` object which will then be enqueued for us to asynchronously receieve a response.

You can also see that we have supplied two attributes: `@FormUrlEncoded` and `@POST`. In short we will be encoding our fields then making a HTTP POST request to the server.

### (c). Updating Data

Now add the following method:

```java
    @FormUrlEncoded
    @POST("index.php")
    Call<ResponseModel> updateData(@Field("action") String action,
                                   @Field("id") String id,
                                   @Field("name") String name,
                                   @Field("description") String description,
                                   @Field("galaxy") String galaxy,
                                   @Field("star") String star,
                                   @Field("dob") String dob,
                                   @Field("died") String died);
```

Again we are making a HTTP POST request. We've again decorated our method with the `@FormUrlEncoded` and `@POST` attributes. And again we will be receiving a response of type `ResponseModel`.The method is actually returning a `Call` object. The action in the parameters will identify this method's action to the server. The `id` will specify the row we want to update.

### (d). Searching MySQL Data

Now add the following code:

```java
    @FormUrlEncoded
    @POST("index.php")
    Call<ResponseModel> search(@Field("action") String action,
                               @Field("query") String query,
                               @Field("start") String start,
                               @Field("limit") String limit);
```

Again we are making a HTTP POST request. This time our intention is to search data.The action parameter will specify that intention. The `query` will specify our search term. Our search filter will be supporting pagination. The `start` parameter will hence define our offset while the `limit` will specify the number of rows to be returned.

### (e). Deleting Data

Lastly add the following:

```java
    @FormUrlEncoded
    @POST("index.php")
    Call<ResponseModel> remove(@Field("action") String action, @Field("id") String id);
}
```

The above method will allow us delete our data from our mysql database. We onlu need to specify the action as well as the id. The id will identify the row we intend to remove.

### Full Code

Here's the full code:

```java
package info.camposha.retrofitmysqlcrud.Retrofit;

/**
 * Let's define our imports
 */
import retrofit2.Call;
import retrofit2.http.Field;
import retrofit2.http.FormUrlEncoded;
import retrofit2.http.GET;
import retrofit2.http.POST;

/**
 * Let's Create an interface
 */
public interface RestApi {

    /**
     * This method will allow us perform a HTTP GET request to the specified url
     * .The response will be a ResponseModel object.
     */
    @GET("index.php")
    Call<ResponseModel> retrieve();

    /**
     * This method will allow us perform a HTTP POST request to the specified url.In the process
     * we will insert data to mysql and return a ResponseModel object
     */
    @FormUrlEncoded
    @POST("index.php")
    Call<ResponseModel> insertData(@Field("action") String action,
                                   @Field("name") String name,
                                   @Field("description") String description,
                                   @Field("galaxy") String galaxy,
                                   @Field("star") String star,
                                   @Field("dob") String dob,
                                   @Field("died") String died);

    /**
     * This method will allow us update our mysql data by making a HTTP POST request.
     * After that
     * we will receive a ResponseModel model object
     */
    @FormUrlEncoded
    @POST("index.php")
    Call<ResponseModel> updateData(@Field("action") String action,
                                   @Field("id") String id,
                                   @Field("name") String name,
                                   @Field("description") String description,
                                   @Field("galaxy") String galaxy,
                                   @Field("star") String star,
                                   @Field("dob") String dob,
                                   @Field("died") String died);

    /**
     * This method will allow us to search our data while paginating the search results. We
     * specify the search and pagination parameters as fields.
     */
    @FormUrlEncoded
    @POST("index.php")
    Call<ResponseModel> search(@Field("action") String action,
                               @Field("query") String query,
                               @Field("start") String start,
                               @Field("limit") String limit);

    /**
     * This method will aloow us to remove or delete from database the row with the
     *  specified
     * id.
     */
    @FormUrlEncoded
    @POST("index.php")
    Call<ResponseModel> remove(@Field("action") String action, @Field("id") String id);
}
//end
```

## Listing Scientists in a RecyclerView with Loadmore Pagination

We are creating a full android mysql crud app. Some of the functionalities of the app include listing scientists in a [recyclerview](https://camposha.info/android/recyclerview). We will however be paging/paginating our data. This pagination will occur at the server side. We will also add a search functionality.

### Concepts You will Learn

By the end of this lesson you will have learnt the following:

1. How to render data on a recyclerview.
2. How to perform a Load more pagination on a recyclerview.
3. How to perform a search filter on mysql data.

NB/= Pagination and Search will occur at the server side. We'll had looked at that in a PHP class earlier.

### Step 1.

Create a file called ScientistsActivity.java and add the following code imports:

```java
package info.camposha.retrofitmysqlcrud.Views;

import android.content.Context;
import android.os.Bundle;
import android.support.v7.app.AppCompatActivity;
import android.support.v7.widget.LinearLayoutManager;
import android.support.v7.widget.RecyclerView;
import android.support.v7.widget.RecyclerView.OnScrollListener;
import android.support.v7.widget.SearchView;
import android.util.Log;
import android.view.Menu;
import android.view.MenuInflater;
import android.view.MenuItem;
import android.widget.AbsListView;
import android.widget.ProgressBar;

import java.util.ArrayList;
import java.util.List;

import info.camposha.retrofitmysqlcrud.Helpers.MyAdapter;
import info.camposha.retrofitmysqlcrud.Helpers.Utils;
import info.camposha.retrofitmysqlcrud.R;
import info.camposha.retrofitmysqlcrud.Retrofit.ResponseModel;
import info.camposha.retrofitmysqlcrud.Retrofit.RestApi;
import info.camposha.retrofitmysqlcrud.Retrofit.Scientist;
import io.github.inflationx.viewpump.ViewPumpContextWrapper;
import retrofit2.Call;
import retrofit2.Callback;
import retrofit2.Response;
```

Then create class below those imports:

```java
public class ScientistsActivity extends AppCompatActivity
```

Make it implement the following interfaces:

```java
public class ScientistsActivity extends AppCompatActivity
        implements SearchView.OnQueryTextListener,MenuItem.OnActionExpandListener{
```

We've just created a class extending AppCompatActivity. We've then made it implement two interfaces:

1. `OnQueryTextListener` - To listen to text change events of our serachview.
2. `OnActionExpandListener` - Raised when a menu item is expanded.

Then define our instance fields:

```java
     //We define our instance fields
    private RecyclerView rv;
    private MyAdapter mAdapter;
    private LinearLayoutManager layoutManager;
    public ArrayList<Scientist> allPagesScientists = new ArrayList();
    private List<Scientist> currentPageScientists;
    private Boolean isScrolling = false;
    private int currentScientists, totalScientists, scrolledOutScientists;
    private ProgressBar mProgressBar;
```

You can see we've declared Recyclerview which is our adapterview. The `MyAdapter` is our RecyclerView adapter. `LinearLayoutManager` will allow us position items in our recyclerview. `allPagesArrayList` will hold all the scientists that have been downloaded so far.

`currentPageScientists` will hold the current scientists as we paginate our data. For example if we are in page 3, then this arraylist will hold data for page alone while `allPagesScientsits` will hold data for pages 1,2 and 3.

`isScrolling` will tell us when the user is scrolling the recyclerview. By default we set it to false.

`currentScientists` tell us the current page.It's an intger as are `totalScientists` and `scrolledOutScientists`.

Our ProgressBar will be shown while we are downloading our data.

Add this method after the declarations above:

```java
    private void initializeViews() {
        mProgressBar = findViewById(R.id.mProgressBarLoad);
        mProgressBar.setIndeterminate(true);
        Utils.showProgressBar(mProgressBar);
        rv = findViewById(R.id.mRecyclerView);
    }
```

The above method is just referencing our views like progress bar and recyclerview.

Then add the following code:

```java
    /**
     * This method will setup oir RecyclerView
     */
    private void setupRecyclerView() {
        layoutManager = new LinearLayoutManager(this);
        mAdapter = new MyAdapter(this, allPagesScientists);
        rv.setAdapter(mAdapter);
        rv.setLayoutManager(layoutManager);
    }
```

The above method is setting up our recyclerview. First we instantiate our LinearLayoutManager,then our adapter and set them to our recyclerview.

Then create a method like below:

```java
    /**
     * This method will download for us data from php mysql based on supplied query string
     * as well as pagination parameters. We are basiclally searching or selecting data
     * without seaching. However all the arriving data is paginated at the server level.
     */
    private void retrieveAndFillRecyclerView(final String action, String queryString,
     final String start, String limit) {
```

That method, as the name suggests will fetch our data from mysql and populate our recyclerview. However alot of things will happen in this method. You can see we are passing 4 strings.

They include:

1. `action` - The action we want to perform. Whether it's downloading all data or downloading paged data. The above method is capable of both.
2. `queryString` - We said we will be searching against MySQL. Well this is the query or search term that we pass over to be sent to the server.
3. `start` - Where we are starting our pagination. it's also called **offset**. For example, are we starting pagination at row number 5, row number 10 or what. That is the offset.
4. `limit` - The number of rows we are fetching.

Then add the following code in the method:

```java
        mAdapter.searchString = queryString;
        RestApi api = Utils.getClient().create(RestApi.class);
        Call<ResponseModel> retrievedData;
```

We have set our search string to a variable in our adapter. There it will be highlighted as we search. Then we have instantiated our RestApi using the `create()` method. Then we've defined a Retrofit2.Call object.

Then add the following code:

```java
        if (action.equalsIgnoreCase("GET_PAGINATED")) {
            retrievedData = api.search("GET_PAGINATED", queryString, start, limit);
            Utils.showProgressBar(mProgressBar);
        } else if (action.equalsIgnoreCase("GET_PAGINATED_SEARCH")) {
            Utils.showProgressBar(mProgressBar);
            retrievedData = api.search("GET_PAGINATED_SEARCH", queryString, start, limit);
        } else {
            Utils.showProgressBar(mProgressBar);
            retrievedData = api.retrieve();
        }
```

The `GET_PAGINATED` is an action string we will send to the server if we want to download paginated data, but without applying a search constraint. The `GET_PAGINATED_SEARCH` will be sent if we want to paginate a search result.

`api.search()` will perform a search against our database.However note that the `GET_PAGINATED` will search with an empty constraint, thus returning all records. Otherwise the `GET_PAGINATED_SEARCH` will send a search term typed the user.

`api.retrieve()` will perform a HTTP GET request, SELECTING all rows.

Now add the following code:

```java
        retrievedData.enqueue(new Callback<ResponseModel>() {
```

We are invoking the `enqueue` method which will enqueue our HTTP Call. That call will be maded asynchronously. Thus we need to rely on callback methods for response.

Let's then come and handle those responses, starting with a positive response:

```java
            @Override
            public void onResponse(Call<ResponseModel> call, Response<ResponseModel>
             response) {
                Log.d("RETROFIT", "CODE : " + response.body().getCode());
                Log.d("RETROFIT", "MESSAGE : " + response.body().getMessage());
                Log.d("RETROFIT", "RESPONSE : " + response.body().getResult());
                currentPageScientists = response.body().getResult();

                if (currentPageScientists != null && currentPageScientists.size() > 0) {
                    if (action.equalsIgnoreCase("GET_PAGINATED_SEARCH")) {
                        allPagesScientists.clear();
                    }
                    for (int i = 0; i < currentPageScientists.size(); i++) {
                        allPagesScientists.add(currentPageScientists.get(i));
                    }

                } else {
                    if (action.equalsIgnoreCase("GET_PAGINATED_SEARCH")) {
                        allPagesScientists.clear();
                    }
                }
                mAdapter.notifyDataSetChanged();
                Utils.hideProgressBar(mProgressBar);
            }
```

Take a look at those parameters in our `onResponse()`: `Call<ResponseModel> call` and `Response<ResponseModel> response`. Clearly you see the generic type is a `ResponseModel` object. That ResponseModel will contain our message, our message code and our list of scientists.

That's why we are logging them out as you you can see above.

We assign the list of scientists we have just downlaoded into the `currentPageScientists` arraylist. If the user was searching then we will clear the `allPagesScientists`. We then add the current page scientists into our `allPagesScientists`.

If the `currentPageScientists` list is empty, that is if we receive an empty list from the server, we check if the user was searching. If that is the case, then we clear `allPagesScientists`.Why? Well because the user has typed a search term which hits not match in the server therefore we clear our list to indicate there is no search item.

## Live Video Lesson(Recommended)

[https://www.youtube.com/watch?v=ZEfYnfww434](https://www.youtube.com/watch?v=ZEfYnfww434)

Then we refresh our adapter and hide the progressbar:

```java
                mAdapter.notifyDataSetChanged();
                Utils.hideProgressBar(mProgressBar);
```

Then we handle the failure response:

```java
            @Override
            public void onFailure(Call<ResponseModel> call, Throwable t) {
                Utils.hideProgressBar(mProgressBar);
                Log.d("RETROFIT", "ERROR: " + t.getMessage());
                Utils.showInfoDialog(ScientistsActivity.this, "ERROR", t.getMessage());
            }
        });
    }
```

Well that's the end of that method.

Let's now come and listen to recyclerview scroll events. This method will allow us implement our load more pagination. Add the following code:

```java
    /**
     * We will listen to scroll events. This is important as we are implementing scroll to
     * load more data pagination technique
     */
    private void listenToRecyclerViewScroll() {
        rv.addOnScrollListener(new OnScrollListener() {
            @Override
            public void onScrollStateChanged(RecyclerView rv, int newState) {
                //when scrolling starts
                super.onScrollStateChanged(rv, newState);
                //check for scroll state
                if (newState == AbsListView.OnScrollListener.SCROLL_STATE_TOUCH_SCROLL) {
                    isScrolling = true;
                }
            }
            @Override
            public void onScrolled(RecyclerView rv, int dx, int dy) {
                // When the scrolling has stopped
                super.onScrolled(rv, dx, dy);
                currentScientists = layoutManager.getChildCount();
                totalScientists = layoutManager.getItemCount();
                scrolledOutScientists = ((LinearLayoutManager) rv.getLayoutManager()).
                findFirstVisibleItemPosition();

                if (isScrolling && (currentScientists + scrolledOutScientists ==
                 totalScientists)) {
                    isScrolling = false;

                    if (dy > 0) {
                        // Scrolling up
                        retrieveAndFillRecyclerView("GET_PAGINATED",
                         mAdapter.searchString,
                         String.valueOf(totalScientists), "5");

                    } else {
                        // Scrolling down
                    }
                }
            }
        });
    }
```

We've started by invoking the `addOnScrollListener()` method. Use this method as the `setOnScrollListener` has since been deprecated. We pass an annonymous class, `OnScrollListener` to our `addOnScrollListener` method.

This forces us to override or implement two methods:

1. `onScrollStateChanged()` and
2. `onScrolled`

The first will be raised when our scroll state changes. If the newState equals `AbsListView.OnScrollListener.SCROLL_STATE_TOUCH_SCROLL)`, then the user is actually scrolling. Thus we set the `isScrolling` property to true.

The second callback method, the `onScrolled()` will be invoked when the scrolling has stopped. Thus we get the current page and load data for that page.

Let's proceed.

Add the following code to finish this activity:

```java

 /**
     * We inflate our menu. We show SearchView inside the toolbar
     */
    @Override
    public boolean onCreateOptionsMenu(Menu menu) {
        MenuInflater inflater = getMenuInflater();
        inflater.inflate(R.menu.scientists_page_menu, menu);
        MenuItem searchItem = menu.findItem(R.id.action_search);
        SearchView searchView = (SearchView) searchItem.getActionView();
        searchView.setOnQueryTextListener(this);
        searchView.setIconified(true);
        searchView.setQueryHint("Search");
        return true;
    }

    @Override
    public boolean onOptionsItemSelected(MenuItem item) {
        switch (item.getItemId()) {
            case R.id.action_new:
                Utils.openActivity(this, CRUDActivity.class);
                finish();
                return true;
        }
        return super.onOptionsItemSelected(item);
    }

    @Override
    public boolean onQueryTextSubmit(String query) {
        return false;
    }

    @Override
    public boolean onQueryTextChange(String query) {
        retrieveAndFillRecyclerView("GET_PAGINATED_SEARCH", query, "0", "5");
        return false;
    }

    @Override
    public boolean onMenuItemActionExpand(MenuItem item) {
        return false;
    }

    @Override
    public boolean onMenuItemActionCollapse(MenuItem item) {
        return false;
    }

    @Override
    protected void attachBaseContext(Context newBase) {
        super.attachBaseContext(ViewPumpContextWrapper.wrap(newBase));
    }

    @Override
    public void onBackPressed() {
        super.onBackPressed();
        this.finish();
    }

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_scientists);

        initializeViews();
        this.listenToRecyclerViewScroll();
        setupRecyclerView();
        retrieveAndFillRecyclerView("GET_PAGINATED", "", "0", "5");
    }
}

//end
```

## Activity for INSERTING, UPDATING and DELETING from MySQL

This lesson will involve us creating a class to perform our INSERT, UPDATE and DELETION to and from our MySQL database. This part of our Android MySQL CRUD - Creating a Scientists App series. In the series we are creating a full app and we've covered some parts already. In this part we are creating one of our most important classes, the class to perform the inserting, updating and deleting of the data.

This activity we will be creting will be re-used for both inserting and updating of data. It can be opened in two modes. When opened with a Scientist object being passed via intent, then we know we are opening for editing or deleting. In that case the Scientist's attributes will be rendered in our edittexts. Thus the user can edit and just click an update/save method which will inflated in the toolbar.

However when it's opened with the scientist object being null. Then we know it's being opened for the sake of adding a new Scientist. In that case only the `insert/save` button will rendered in our toolbar. Thus when the user clicks it we will insert to mysql.

Note that our toolbar menus will be inflated dynamically based on what the activity is opened for.

Let's start.

### Video Tutorial

<iframe width="788" height="443" src="https://www.youtube.com/embed/HxpO4pp2Mbw" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>

### (a). Add imports,Define Class, Specify Instance Fields

We start by add by adding our imports:

```java
import android.content.Context;
import android.helper.DateTimePickerEditText;
import android.os.Bundle;
import android.support.v4.app.NavUtils;
import android.support.v7.app.AppCompatActivity;
import android.util.Log;
import android.view.Menu;
import android.view.MenuItem;
import android.view.View;
import android.widget.EditText;
import android.widget.ProgressBar;
import android.widget.TextView;

import info.camposha.retrofitmysqlcrud.Helpers.Utils;
import info.camposha.retrofitmysqlcrud.R;
import info.camposha.retrofitmysqlcrud.Retrofit.ResponseModel;
import info.camposha.retrofitmysqlcrud.Retrofit.RestApi;
import info.camposha.retrofitmysqlcrud.Retrofit.Scientist;
import io.github.inflationx.viewpump.ViewPumpContextWrapper;
import retrofit2.Call;
import retrofit2.Callback;
import retrofit2.Response;
```

Then we create our class, making it derive from `AppCompatActivity`:

```java
public class CRUDActivity extends AppCompatActivity {
```

Next we specify our instance fields:

```java
    //we'll have several instance fields
    private EditText nameTxt, descriptionTxt, galaxyTxt, starTxt;
    private TextView headerTxt;
    private DateTimePickerEditText dobTxt, dodTxt;
    private ProgressBar mProgressBar;
    private String id = null;
    private Scientist receivedScientist;
    private Context c = CRUDActivity.this;
```

You can see we have specified the following widgets as our instance fields:

1. EditTexts - These will be used to enter the scientist's attributes.
2. TextView - This will be used render the header of the page.
3. DateTimePickerEditText - This will be used to select date via a wheel dialog that will be shown.
4. ProgressBar - This will be used to show progress as we send data to the server.

We've also initialized an id as well as Context object.

### (b). Initializing Widgets

Next we need to initialize our widgets:

```java
    private void initializeWidgets() {
        mProgressBar = findViewById(R.id.mProgressBarSave);
        mProgressBar.setIndeterminate(true);
        mProgressBar.setVisibility(View.GONE);

        headerTxt = findViewById(R.id.headerTxt);
        nameTxt = findViewById(R.id.nameTxt);
        descriptionTxt = findViewById(R.id.descriptionTxt);
        galaxyTxt = findViewById(R.id.galaxyTxt);
        starTxt = findViewById(R.id.starTxt);

        dobTxt = findViewById(R.id.dobTxt);
        dobTxt.setFormat(Utils.DATE_FORMAT);
        dodTxt = findViewById(R.id.dodTxt);
        dodTxt.setFormat(Utils.DATE_FORMAT);
    }
```

The above are basically findViewById calls. We are simply referencing our views.

### (c). Performing Insert

The next method allows us to actually perform our insert call. Add the following method:

```java
    private void insertData() {
        String name, description, galaxy, star, dob, died;
        if (Utils.validate(nameTxt, descriptionTxt, galaxyTxt)) {
            name = nameTxt.getText().toString();
            description = descriptionTxt.getText().toString();
            galaxy = galaxyTxt.getText().toString();
            star = starTxt.getText().toString();

            if (dobTxt.getDate() != null) {
                dob = dobTxt.getDate().toString();
            } else {
                dobTxt.setError("Invalid Date");
                dobTxt.requestFocus();
                return;
            }
            if (dodTxt.getDate() != null) {
                died = dodTxt.getDate().toString();
            } else {
                dodTxt.setError("Invalid Date");
                dodTxt.requestFocus();
                return;
            }
            RestApi api = Utils.getClient().create(RestApi.class);
            Call<ResponseModel> insertData = api.insertData("INSERT", name,
             description, galaxy,
             star, dob, died);

            Utils.showProgressBar(mProgressBar);

            insertData.enqueue(new Callback<ResponseModel>() {
                @Override
                public void onResponse(Call<ResponseModel> call,
                 Response<ResponseModel> response) {

                    Log.d("RETROFIT", "response : " + response.body().toString());
                    String myResponseCode = response.body().getCode();

                    if (myResponseCode.equals("1")) {
                        Utils.show(c, "SUCCESS: n 1. Data Inserted Successfully. n 2. ResponseCode: "
                         + myResponseCode);
                        Utils.openActivity(c, ScientistsActivity.class);
                    } else if (myResponseCode.equalsIgnoreCase("2")) {
                        Utils.showInfoDialog(CRUDActivity.this, "UNSUCCESSFUL",
                        "However Good Response. n 1. CONNECTION TO SERVER WAS SUCCESSFUL n 2. WE"+
                        " ATTEMPTED POSTING DATA BUT ENCOUNTERED ResponseCode: "+myResponseCode+
                        " n 3. Most probably the problem is with your PHP Code.");
                    }else if (myResponseCode.equalsIgnoreCase("3")) {
                        Utils.showInfoDialog(CRUDActivity.this, "NO MYSQL CONNECTION",+
                         " Your PHP Code"+
                        " is unable to connect to mysql database. Make sure you have supplied correct"+
                        " database credentials.");
                    }
                    Utils.hideProgressBar(mProgressBar);
                }
                @Override
                public void onFailure(Call<ResponseModel> call, Throwable t) {
                    Log.d("RETROFIT", "ERROR: " + t.getMessage());
                    Utils.hideProgressBar(mProgressBar);
                    Utils.showInfoDialog(CRUDActivity.this, "FAILURE",
                     "FAILURE THROWN DURING INSERT."+
                    " ERROR Message: " + t.getMessage());
                }
            });
        }
    }
```

The above seems long. However it will allow us safely insert our data. In case of any error,like when there is not connection, our app won't crash. Instead we will safely handle that error. It also allows us identify what exactly failed and output the right message. For example the failure can be a no connectivity situation, in case which we will simply handle the `onFailure` callback.

It can also be a positive response from the server that indicates the situation is on the server side and not on the client. For example maybe our app could connect to the server but couldn't connect to mysql due to incorrect database credentials. In such cases we simply rely on the response code to identify the exact situation. Our server will be sending as part of the response the following:

1. Response Message
2. Response Code
3. List of scientists(Optional)

The above are represented in our `ResponseModel` class.

### (d). Performing Update

The below method will allow us update our mysql table:

```java
    private void updateData() {
        String name, description, galaxy, star, dob, died;
        if (Utils.validate(nameTxt, descriptionTxt, galaxyTxt)) {
            name = nameTxt.getText().toString();
            description = descriptionTxt.getText().toString();
            galaxy = galaxyTxt.getText().toString();
            star = starTxt.getText().toString();

            if (dobTxt.getDate() != null) {
                dob = dobTxt.getFormat().format(dobTxt.getDate());
            } else {
                dobTxt.setError("Invalid Date");
                dobTxt.requestFocus();
                return;
            }
            if (dodTxt.getDate() != null) {
                died = dodTxt.getFormat().format(dodTxt.getDate());
            } else {
                dodTxt.setError("Invalid Date");
                dodTxt.requestFocus();
                return;
            }
            Utils.showProgressBar(mProgressBar);
            RestApi api = Utils.getClient().create(RestApi.class);
            Call<ResponseModel> update = api.updateData("UPDATE", id, name, description, galaxy,
             star,
             dob, died);
            update.enqueue(new Callback<ResponseModel>() {
                @Override
                public void onResponse(Call<ResponseModel> call, Response<ResponseModel> response) {
                    Log.d("RETROFIT", "Response: " + response.body().getResult());

                    Utils.hideProgressBar(mProgressBar);
                    String myResponseCode = response.body().getCode();

                    if (myResponseCode.equalsIgnoreCase("1")) {
                        Utils.show(c, response.body().getMessage());
                        Utils.openActivity(c, ScientistsActivity.class);
                        finish();
                    } else if (myResponseCode.equalsIgnoreCase("2")) {
                        Utils.showInfoDialog(CRUDActivity.this, "UNSUCCESSFUL",
                        "Good Response From PHP,"+
                        "WE ATTEMPTED UPDATING DATA BUT ENCOUNTERED ResponseCode: "+myResponseCode+
                        " n 3. Most probably the problem is with your PHP Code.");
                    } else if (myResponseCode.equalsIgnoreCase("3")) {
                        Utils.showInfoDialog(CRUDActivity.this, "NO MYSQL CONNECTION",
                        " Your PHP Code"+
                        " is unable to connect to mysql database. Make sure you have supplied correct"+
                        " database credentials.");
                    }
                }
                @Override
                public void onFailure(Call<ResponseModel> call, Throwable t) {
                    Log.d("RETROFIT", "ERROR THROWN DURING UP#post_date: " + t.getMessage());
                    Utils.hideProgressBar(mProgressBar);
                    Utils.showInfoDialog(CRUDActivity.this, "FAILURE THROWN", "ERROR DURING UPDATE.Here"+
                    " is the Error: " + t.getMessage());
                }
            });
        }
    }
```

It's faily similar to the `insertData` method. However it's performing an entirely different function, updating an existing data. That means that it will be called when the activity ws opened in the context of updating existing data. In that case the id for the scientist to be updated would be available.

It is also invoking the `updateData` defined in our `RestApi` class. That method required us to pass it an `id` which we do. That id will allow us identify the row that is to be updated. We will receive it from the receievedScientist object.

Again we will have two callback methods returned by our enqueue method:

1. onResponse - Successful connection to the server.
2. onFailure - Failed connection to the server.

If your connection fails then you need to check your URL and make sure you can connect to it in the emulator browser.

Beware that the onResponse() doesn't necessarily imply that we have updated our data. It can be that we connected to the server, attempted to insert data but that attempt fails because of some reason like mismatched data types. In that case still the onResponse will be called. Becuase of that in our PHP code we made sure that we handled our exceptions correctly. And as part of the response will include a response code. That code will tell us what really happened.

### Full Code - CRUDActivity.java

Here is the full code:

```java
package info.camposha.retrofitmysqlcrud.Views;

import android.content.Context;
import android.helper.DateTimePickerEditText;
import android.os.Bundle;
import android.support.v4.app.NavUtils;
import android.support.v7.app.AppCompatActivity;
import android.util.Log;
import android.view.Menu;
import android.view.MenuItem;
import android.view.View;
import android.widget.EditText;
import android.widget.ProgressBar;
import android.widget.TextView;

import info.camposha.retrofitmysqlcrud.Helpers.Utils;
import info.camposha.retrofitmysqlcrud.R;
import info.camposha.retrofitmysqlcrud.Retrofit.ResponseModel;
import info.camposha.retrofitmysqlcrud.Retrofit.RestApi;
import info.camposha.retrofitmysqlcrud.Retrofit.Scientist;
import io.github.inflationx.viewpump.ViewPumpContextWrapper;
import retrofit2.Call;
import retrofit2.Callback;
import retrofit2.Response;

public class CRUDActivity extends AppCompatActivity {
    //we'll have several instance fields
    private EditText nameTxt, descriptionTxt, galaxyTxt, starTxt;
    private TextView headerTxt;
    private DateTimePickerEditText dobTxt, dodTxt;
    private ProgressBar mProgressBar;
    private String id = null;
    private Scientist receivedScientist;
    private Context c = CRUDActivity.this;

    /**
     * Let's reference our widgets
     */
    private void initializeWidgets() {
        mProgressBar = findViewById(R.id.mProgressBarSave);
        mProgressBar.setIndeterminate(true);
        mProgressBar.setVisibility(View.GONE);

        headerTxt = findViewById(R.id.headerTxt);
        nameTxt = findViewById(R.id.nameTxt);
        descriptionTxt = findViewById(R.id.descriptionTxt);
        galaxyTxt = findViewById(R.id.galaxyTxt);
        starTxt = findViewById(R.id.starTxt);

        dobTxt = findViewById(R.id.dobTxt);
        dobTxt.setFormat(Utils.DATE_FORMAT);
        dodTxt = findViewById(R.id.dodTxt);
        dodTxt.setFormat(Utils.DATE_FORMAT);
    }
    /**
     * The following method will allow us insert data typed in this page into th
     * e database
     */
    private void insertData() {
        String name, description, galaxy, star, dob, died;
        if (Utils.validate(nameTxt, descriptionTxt, galaxyTxt)) {
            name = nameTxt.getText().toString();
            description = descriptionTxt.getText().toString();
            galaxy = galaxyTxt.getText().toString();
            star = starTxt.getText().toString();

            if (dobTxt.getDate() != null) {
                dob = dobTxt.getDate().toString();
            } else {
                dobTxt.setError("Invalid Date");
                dobTxt.requestFocus();
                return;
            }
            if (dodTxt.getDate() != null) {
                died = dodTxt.getDate().toString();
            } else {
                dodTxt.setError("Invalid Date");
                dodTxt.requestFocus();
                return;
            }
            RestApi api = Utils.getClient().create(RestApi.class);
            Call<ResponseModel> insertData = api.insertData("INSERT", name,
             description, galaxy,
             star, dob, died);

            Utils.showProgressBar(mProgressBar);

            insertData.enqueue(new Callback<ResponseModel>() {
                @Override
                public void onResponse(Call<ResponseModel> call,
                 Response<ResponseModel> response) {

                    Log.d("RETROFIT", "response : " + response.body().toString());
                    String myResponseCode = response.body().getCode();

                    if (myResponseCode.equals("1")) {
                        Utils.show(c, "SUCCESS: n 1. Data Inserted Successfully. n 2. ResponseCode: "
                         + myResponseCode);
                        Utils.openActivity(c, ScientistsActivity.class);
                    } else if (myResponseCode.equalsIgnoreCase("2")) {
                        Utils.showInfoDialog(CRUDActivity.this, "UNSUCCESSFUL",
                        "However Good Response. n 1. CONNECTION TO SERVER WAS SUCCESSFUL n 2. WE"+
                        " ATTEMPTED POSTING DATA BUT ENCOUNTERED ResponseCode: "+myResponseCode+
                        " n 3. Most probably the problem is with your PHP Code.");
                    }else if (myResponseCode.equalsIgnoreCase("3")) {
                        Utils.showInfoDialog(CRUDActivity.this, "NO MYSQL CONNECTION",+
                         " Your PHP Code"+
                        " is unable to connect to mysql database. Make sure you have supplied correct"+
                        " database credentials.");
                    }
                    Utils.hideProgressBar(mProgressBar);
                }
                @Override
                public void onFailure(Call<ResponseModel> call, Throwable t) {
                    Log.d("RETROFIT", "ERROR: " + t.getMessage());
                    Utils.hideProgressBar(mProgressBar);
                    Utils.showInfoDialog(CRUDActivity.this, "FAILURE",
                     "FAILURE THROWN DURING INSERT."+
                    " ERROR Message: " + t.getMessage());
                }
            });
        }
    }
    /**
     * The following method will allow us update the current scientist's data in the database
     */
    private void updateData() {
        String name, description, galaxy, star, dob, died;
        if (Utils.validate(nameTxt, descriptionTxt, galaxyTxt)) {
            name = nameTxt.getText().toString();
            description = descriptionTxt.getText().toString();
            galaxy = galaxyTxt.getText().toString();
            star = starTxt.getText().toString();

            if (dobTxt.getDate() != null) {
                dob = dobTxt.getFormat().format(dobTxt.getDate());
            } else {
                dobTxt.setError("Invalid Date");
                dobTxt.requestFocus();
                return;
            }
            if (dodTxt.getDate() != null) {
                died = dodTxt.getFormat().format(dodTxt.getDate());
            } else {
                dodTxt.setError("Invalid Date");
                dodTxt.requestFocus();
                return;
            }
            Utils.showProgressBar(mProgressBar);
            RestApi api = Utils.getClient().create(RestApi.class);
            Call<ResponseModel> update = api.updateData("UPDATE", id, name, description, galaxy,
             star,
             dob, died);
            update.enqueue(new Callback<ResponseModel>() {
                @Override
                public void onResponse(Call<ResponseModel> call, Response<ResponseModel> response) {
                    Log.d("RETROFIT", "Response: " + response.body().getResult());

                    Utils.hideProgressBar(mProgressBar);
                    String myResponseCode = response.body().getCode();

                    if (myResponseCode.equalsIgnoreCase("1")) {
                        Utils.show(c, response.body().getMessage());
                        Utils.openActivity(c, ScientistsActivity.class);
                        finish();
                    } else if (myResponseCode.equalsIgnoreCase("2")) {
                        Utils.showInfoDialog(CRUDActivity.this, "UNSUCCESSFUL",
                        "Good Response From PHP,"+
                        "WE ATTEMPTED UPDATING DATA BUT ENCOUNTERED ResponseCode: "+myResponseCode+
                        " n 3. Most probably the problem is with your PHP Code.");
                    } else if (myResponseCode.equalsIgnoreCase("3")) {
                        Utils.showInfoDialog(CRUDActivity.this, "NO MYSQL CONNECTION",
                        " Your PHP Code"+
                        " is unable to connect to mysql database. Make sure you have supplied correct"+
                        " database credentials.");
                    }
                }
                @Override
                public void onFailure(Call<ResponseModel> call, Throwable t) {
                    Log.d("RETROFIT", "ERROR THROWN DURING UP#post_date: " + t.getMessage());
                    Utils.hideProgressBar(mProgressBar);
                    Utils.showInfoDialog(CRUDActivity.this, "FAILURE THROWN", "ERROR DURING UPDATE.Here"+
                    " is the Error: " + t.getMessage());
                }
            });
        }
    }
    /**
     * The following method will allow us delete data from database
     */
    private void deleteData() {
        RestApi api = Utils.getClient().create(RestApi.class);
        Call<ResponseModel> del = api.remove("DELETE", id);

        Utils.showProgressBar(mProgressBar);
        del.enqueue(new Callback<ResponseModel>() {
            @Override
            public void onResponse(Call<ResponseModel> call, Response<ResponseModel> response) {
                Log.d("RETROFIT", "DELETE RESPONSE: " + response.body());
                Utils.hideProgressBar(mProgressBar);
                String myResponseCode = response.body().getCode();

                if (myResponseCode.equalsIgnoreCase("1")) {
                    Utils.show(c, response.body().getMessage());
                    Utils.openActivity(c, ScientistsActivity.class);
                    finish();
                } else if (myResponseCode.equalsIgnoreCase("2")) {
                    Utils.showInfoDialog(CRUDActivity.this, "UNSUCCESSFUL",
                     "However Good Response. n 1. CONNECTION TO SERVER WAS SUCCESSFUL"+
                     " n 2. WE ATTEMPTED POSTING DATA BUT ENCOUNTERED ResponseCode: "+
                     myResponseCode+ " n 3. Most probably the problem is with your PHP Code.");
                }else if (myResponseCode.equalsIgnoreCase("3")) {
                    Utils.showInfoDialog(CRUDActivity.this, "NO MYSQL CONNECTION",
                    " Your PHP Code is unable to connect to mysql database. Make sure you have supplied correct database credentials.");
                }
            }
            @Override
            public void onFailure(Call<ResponseModel> call, Throwable t) {
                Utils.hideProgressBar(mProgressBar);
                Log.d("RETROFIT", "ERROR: " + t.getMessage());
                Utils.showInfoDialog(CRUDActivity.this, "FAILURE THROWN", "ERROR during DELETE attempt. Message: " + t.getMessage());
            }
        });
    }
    /**
     * Show selected star in our edittext
     */
    private void showSelectedStarInEditText() {
        starTxt.setOnClickListener(v -> Utils.selectStar(c, starTxt));
    }
    /**
     * When our back button is pressed
     */
    @Override
    public void onBackPressed() {
        Utils.showInfoDialog(this, "Warning", "Are you sure you want to exit?");
    }
    /**
     * Let's inflate our menu based on the role this page has been opened for.
     */
    @Override
    public boolean onCreateOptionsMenu(Menu menu) {
        if (receivedScientist == null) {
            getMenuInflater().inflate(R.menu.new_item_menu, menu);
            headerTxt.setText("Add New Scientist");
        } else {
            getMenuInflater().inflate(R.menu.edit_item_menu, menu);
            headerTxt.setText("Edit Existing Scientist");
        }
        return true;
    }
    /**
     * Let's listen to menu action events and perform appropriate function
     */
    @Override
    public boolean onOptionsItemSelected(MenuItem item) {
        switch (item.getItemId()) {
            case R.id.insertMenuItem:
                insertData();
                return true;
            case R.id.editMenuItem:
                if (receivedScientist != null) {
                    updateData();
                } else {
                    Utils.show(this, "EDIT ONLY WORKS IN EDITING MODE");
                }
                return true;
            case R.id.deleteMenuItem:
                if (receivedScientist != null) {
                    deleteData();
                } else {
                    Utils.show(this, "DELETE ONLY WORKS IN EDITING MODE");
                }
                return true;
            case R.id.viewAllMenuItem:
                Utils.openActivity(this, ScientistsActivity.class);
                finish();
                return true;
            case android.R.id.home:
                NavUtils.navigateUpFromSameTask(this);
                finish();
                return true;
        }
        return super.onOptionsItemSelected(item);
    }

    /**
     * Attach Base Context
     */
    @Override
    protected void attachBaseContext(Context newBase) {
        super.attachBaseContext(ViewPumpContextWrapper.wrap(newBase));
    }
    /**
     * When our activity is resumed we will receive our data and set them to their editing
     * widgets.
     */
    @Override
    protected void onResume() {
        super.onResume();
        Object o = Utils.receiveScientist(getIntent(), c);
        if (o != null) {
            receivedScientist = (Scientist) o;
            id = receivedScientist.getId();
            nameTxt.setText(receivedScientist.getName());
            descriptionTxt.setText(receivedScientist.getDescription());
            galaxyTxt.setText(receivedScientist.getGalaxy());
            starTxt.setText(receivedScientist.getStar());
            Object dob = receivedScientist.getDob();
            if (dob != null) {
                String d = dob.toString();
                dobTxt.setDate(Utils.giveMeDate(d));
            }
            Object dod = receivedScientist.getDied();
            if (dod != null) {
                String d = dod.toString();
                dodTxt.setDate(Utils.giveMeDate(d));
            }
        } else {
            //Utils.show(c,"Received Scientist is Null");
        }
    }
    /**
     * Let's override our onCreate() method
     */
    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_crud);

        this.initializeWidgets();
        this.showSelectedStarInEditText();
    }
}
//end
```

## Creating App Class

This is part of the Android Live Courses Season 1 series. In this season one we are looking at how to perform crud operations against mysql database backed by retrofit. In the process we are creating a full scientists app.

In this lesson we want to initialize Calligraphy, our custom font library.

### App.java

Create a file called `App.java` in the root package of your project.

Add the following code:

```java
package info.camposha.retrofitmysqlcrud;

import android.app.Application;

import io.github.inflationx.calligraphy3.CalligraphyConfig;
import io.github.inflationx.calligraphy3.CalligraphyInterceptor;
import io.github.inflationx.viewpump.ViewPump;

public class App extends Application {
    @Override
    public void onCreate() {
        super.onCreate();
        ViewPump.init(ViewPump.builder()
                .addInterceptor(new CalligraphyInterceptor(
                        new CalligraphyConfig.Builder()
                                .setDefaultFontPath("fonts/Roboto-Bold.ttf")
                                .setFontAttrId(R.attr.fontPath)
                                .build()))
                .build());
    }
}
//end
```

Let's move to the next lesson.

## Video Lesson

<iframe width="788" height="443" src="https://www.youtube.com/embed/p_xq_gfaAa0" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>

### Conclusion

Now we've looked at the app class. That class is our Application class in that it derives from \\`android.app.Application\`, which is an android component. It is this app class where we've loaded our custom fonts. We said we are using a library called Calligraphy as our font loading library.

## PHP MySQL – INSERT SELECT UPDATE DELETE SEARCH PAGINATION

PHP is the most popular web programming language, like it or not. It's powering WordPress which has itself become a dorminant platform. PHP is fast enough and beginner friendly. Web apps or platforms like Facebook and Wikipedia were written in PHP, at least originally.

PHP and MySQL seems to be made up for each other. MySQL is a powerful RDBMS database and is also dorminant in it's niche. However in recent years these two technologies have started facing stiff competition. Node.js has become a rising star. Nodejs allows writing of server code in Javascript and is also fast, taking advantage of the famous V8 engine. MySQL on the other hand is facing NoSQL database systems, especially MongoDB.

However, these two are still the go to technologies in the web arena. It's not that hard to write your first hello world with PHP and MySQL. In fact as long as you have interpreter installed, you can even write it in a notepad. There is no need to install third party modules. This can be regarded by some as one of the advantages of PHP, it's tight integration with MySQL. Frameworks like Nodejs and Python web frameworks do require installation of packages to work with database system like MySQL.

In this lesson you will learn how to write code in PHP that can:

1. INSERT
2. SELECT
3. UPDATE
4. DELETE
5. PAGINATE
6. SEARCH

Thus we will not only perform CRUD operations but also perform pagination and search. The output will be an API in pure PHP without REST libraries or frameworks. Thus our android app will be able to take advantage and send and receive data to and from mysql. PHP is the middle man here.

Let's start.

#### 1\. Create index.php file

Well first create a folder in your root folder called `php`. In that folder create another called `scientists`. In that create a file called `index.php`. This is where we will place all our PHP code.

If you are using XAMPP like we are then place it in `htdocs` folder. So your structure should be like this:

```shell
htdocs/php/scientists/index.php
```

We will write object oriented PHP code.

Start by specifying PHP opening tag:

```php
<?php

//Then our code here
```

The above tag will tell PHP interpretor of where our PHP code is beginning. There is no need to write the closing tag these days.

## Live Video Lesson(Recommended)

#### 2\. Create Constants Class

Well we will have a Constants class holding our database credentials.

First add the following code inside your `index.php` after your php tag you had specified earlier:

```php
class Constants{
    //DATABASE CREDENTIALS
    static $DB_SERVER="localhost";
    static $DB_NAME="scientistsDB";
    static $USERNAME="root";
    static $PASSWORD="";

    //SQL STATEMENT
    static $SQL_SELECT_ALL="SELECT * FROM scientistsTB";
}
```

Clearly you can see we have:

| No. | Credential | Explanation |
| --- | --- | --- |
| 1. | `DB_SERVER` | Our database server. Specify localhost if you are hosted locally |
| 2. | `DB_NAME` | Our database name. Specify the name of your database. |
| 3. | `USERNAME` | The database user.In production don't use root. |
| 4. | `PASSWORD` | The user password. Don't use empty password in prodction. |

#### 3\. Create a Scientists CRUD class

I have just called it `Scientists`. Just create inside the `index.php` file.

Then add the class definition as below:

```php
class Scientists{
    //...
```

#### 4\. Connect to MySQL

We said we would write object oriented code. Well we will also use `mysqli`, a class that allows us connect to mysql in an object oriented manner.

Start by adding the following code inside our `Scientists` class:

```php
    public function connect()
    {
        $con=new mysqli(Constants::$DB_SERVER,Constants::$USERNAME,Constants::$PASSWORD,
        Constants::$DB_NAME);
        if($con->connect_error) {
            return null;
        }else{
            return $con;
        }
    }
```

In the above code, we have created a function called `connect()`. Inside it we start by instantiating the `mysqli` class. In the `mysqli` constructor we are passing the database server, user as well as password and name.

Then we've used the `connect_error` property to check if our connection attempt is raising any errors. If so we simply return null. Otherwise we return the `mysqli` object.

#### 5\. Insert into MySQL

Let's now define a function to allow us INSERT into MySQL.

Start by adding the following code below the `connect()` function:

```php
    public function insert(){
        $name = $_POST['name'];
        $description = $_POST['description'];
        $galaxy = $_POST['galaxy'];
        $star = $_POST['star'];
        $dob = $_POST['dob'];
        $died = $_POST['died'];

        $con=$this->connect();
        if($con != null)
        {
            $sql = "INSERT INTO scientiststb (name, description, galaxy,star, dob, died) VALUES
            ('$name','$description','$galaxy','$star','$dob','$died')";
            $result = $con->query($sql);
            if($result == TRUE){
                 print(json_encode(array('code' =>1, 'message' => 'Data Successfully Inserted')));
            }else{
                print(json_encode(array('code' =>2,
                'message' => 'Unable to INSERT Data. However Connection was successful')));
            }
            $con->close();
        }else{
            print(json_encode(array('code' =>3,
            'message' => 'ERROR: PHP WAS UNABLE TO CONNECT TO MYSQL DUE TO NULL CONNECTION.')));
        }
    }
```

Well inside our `insert()` function, we start by retrieving the data contained in our HTTP request.

The `$_POST` is an _associative array of variables passed to the current script via the HTTP POST method._

Our android app will be making a HTTP POST request with data packed into it. Those data can be accessed in our PHP code via the `_POST` array in form of simple variables.

After which we establish our connection via our `connect()` function. If the connection fails we print out an encoded array containing our error code and error message.

Otherwise we define our `SQL` insert state. The `query()` method of our `mysqli` class will execute the SQL statement, returning a boolean value.

If that result equals `TRUE`, then we had success, thus we print a success message, otherwise we print out a failure message.

#### 5\. Update MySQL

The next step is to update our mysql update.

Start by adding the following code:

```php
    public function update(){
        $id = $_POST['id'];
        $name = $_POST['name'];
        $description = $_POST['description'];
        $galaxy = $_POST['galaxy'];
        $star = $_POST['star'];
        $dob = $_POST['dob'];
        $died = $_POST['died'];

        $con=$this->connect();
        if($con != null){
            $sql = "UPDATE  scientiststb SET name = '$name',description = '$description',
             galaxy = '$galaxy', star = '$star', dob = '$dob',died = '$died' WHERE id='$id'";

            $result = $con->query($sql);
            if($result == TRUE){
                print(json_encode(array('code' =>1, 'message' => 'Data Successfully Updated')));
            }else{
                print(json_encode(array('code' =>2,
                'message' => 'Unable to UPDATE Data. However Connection was successful')));
            }
            $con->close();
        }else{
            print(json_encode(array('code' =>3,
            'message' => 'ERROR: PHP WAS UNABLE TO CONNECT TO MYSQL DUE TO NULL CONNECTION.')));
        }
    }
```

Well it's pretty similar to our insert() function. However this time round take note of the `id` we are receiving from our HTTP POST request. Well it's important. It will help identify the row that is to be updated.

Then you can see after we have established connection and if it is successful we execute our `SQL UPDATE` statement.Well that statement is different from the `INSERT` statement. You can see how the id is helping us identify the target row.

#### 6\. Delete From MySQL

Well delete again. We'll use a HTTP POST request to send a delete request.

Write the following code:

```php
    public function delete(){
        $id = $_POST['id'];

        $con=$this->connect();
        if($con != null){
            $sql = "DELETE FROM scientiststb WHERE id ='$id'";
            $result = $con->query($sql);
            if($result == TRUE){
                print(json_encode(array('code' =>1, 'message' => 'Data Successfully Deleted')));
            }else{
                print(json_encode(array('code' =>2,
                'message' => 'Unable to DELETE Data. However Connection was successful')));
            }
            $con->close();

        }else{
            print(json_encode(array('code' =>3,
            'message' => 'ERROR: PHP WAS UNABLE TO CONNECT TO MYSQL DUE TO NULL CONNECTION.')));
        }
    }
```

We only need the `id` of the row to be deleted sent to us. Then we establish our connection and execute our `DELETE` stetment. We then return a response to the client.

#### 7\. Select All Rows

If you don't have so much data in the database, you can safely select all the data.

Here's a PHP function to select for us all the data:

```php
    public function select()
    {
        $con=$this->connect();
        if($con != null)
        {
            $result=$con->query(Constants::$SQL_SELECT_ALL);
            if($result->num_rows > 0)
            {
                $scientists = array();
                while($row=$result->fetch_array())
                {
                    array_push($scientists, array("id"=>$row['id'],"name"=>$row['name'],
                    "description"=>$row['description'],"galaxy"=>$row['galaxy'],"star"=>$row['star'],
                    "dob"=>$row['dob'],"died"=>$row['died']));
                }
                print(json_encode(array("code" => 1,"message"=>"Success", "result"=>$scientists)));
            }else{
                print(json_encode(array("code" => 0, "message"=>"Data Not Found")));
            }
            $con->close();

        }else{
            print(json_encode(array('code' =>3,
            'message' => 'ERROR: PHP WAS UNABLE TO CONNECT TO MYSQL DUE TO NULL CONNECTION.')));
        }
    }
```

You had seen that we had earlier on, in our Constants class, defined the `SELECT` all statement. Well we simply execute it using the `query()` function.

Then take note that we are looping through our result, pushing an array of individuals cells into an outer array. That outer then is json encoded and sent to the client.

#### 8\. Search and Paginate data

Well now we want to create a function to allow us perform search and pagination. These two are important because they put a restraint in the quantity of data we are sending to the client. It's not a good idea to be pushing thousands of rows of data to the client. It consumes alot of memory and the users bandwith. Moreover nobody can read through hundreds of rows at least in these times.

Add the following code:

```php
    public function search()
    {
        $query=$_POST['query'];
        $limit=$_POST['limit'];
        $start=$_POST['start'];

        $sql="SELECT * FROM scientistsTB WHERE name LIKE '%$query%' OR galaxy LIKE '%$query%'
         LIMIT
         $limit OFFSET $start ";

        $con=$this->connect();
        if($con != null)
        {
            $result=$con->query($sql);
            if($result->num_rows>0)
            {
                $scientists=array();
                while($row=$result->fetch_array())
                {
                    array_push($scientists, array("id"=>$row['id'],"name"=>$row['name'],
                    "description"=>$row['description'],"galaxy"=>$row['galaxy'],"star"=>$row['star'],
                    "dob"=>$row['dob'],"died"=>$row['died']));
                }
                print(json_encode(array("code" => 1, "message"=>"Success", "result"=>$scientists)));
            }else{
                print(json_encode(array("code" => 0, "message"=>"Data Not Found")));
            }
            $con->close();

        }else{
            print(json_encode(array('code' =>3,
            'message' => 'ERROR: PHP WAS UNABLE TO CONNECT TO MYSQL DUE TO NULL CONNECTION.')));
        }
    }
```

You can see we are receiving some interesting variables being passed us from the client. The first is the search term or `query`. Then we have the `limit` and the `start`. The query, as you can guess is the user's search constraint. The `limit` is the amount of data to be passed. The `start` is the also called the `offset`. It's where our retrieval starts. For example in page 2, we can have our retrieval starting at row number 6 or 11 based on whether our `limit` is `5` or `10`.

Then we perform a select query with those parameters specified.

#### 9\. Handle requests

We now need a sort of controller. We will create a function to listen to our HTTP requests and react by invoking the right methods.

Add the following code:

```php
    public function handleRequest() {

        if($_SERVER['REQUEST_METHOD'] == 'POST')
        {
            if (isset($_POST['action'])) {

                $action=$_POST['action'];

                if($action == 'INSERT'){
                    $this->insert();
                }else if($action == 'UPDATE'){
                    $this->update();
                }else if($action == 'DELETE'){
                    $this->delete();
                }else if($action == 'GET_PAGINATED'){
                    $this->search();
                }else if($action == 'GET_PAGINATED_SEARCH'){
                    $this->search();
                }else{
                    print(json_encode(array('code' =>4, 'message' => 'INVALID REQUEST.')));
                }
            } else{
                print(json_encode(array('code' =>5, 'message' => 'POST TYPE UNKNOWN.')));
            }

        }else{
            $this->select();
        }
    }
```

We have started by checking the request method. If it is not a HTTP POST request, we invoke the `select()`. Our app will only be making a HTTP POST and HTTP GET request.

If it is a HTTP POST request, we obtain the action string. This string will be explicitly specified in our client. It identifies for us the intended action. Then we react according to that action.

Now make sure you close the `Scientists` class:

```php
}
```

Then OUTSIDE the class:

```php
//Outside the class. Instantiate Scientist then invoke the handleRequest() to listen to our requests.
$s=new Scientists();
$s->handleRequest();

//end
```

#### FULL CODE:

Here is the full code:

```php
<?php

/**
 * Let's Create a class to hold our database constants.
 */
class Constants{
    //DATABASE CREDENTIALS
    static $DB_SERVER="localhost";
    static $DB_NAME="scientistsDB";
    static $USERNAME="root";
    static $PASSWORD="";

    //SQL STATEMENT
    static $SQL_SELECT_ALL="SELECT * FROM scientistsTB";
}

/**
 * This class will contain methods to receive our http requests, manipulate the
 *  database and send
 * result back to the client
 */
class Scientists{
    /**
     * 1. CONNECT TO DATABASE.
     * 2. RETURN CONNECTION OBJECT
     * 3. IF NO CONNECTION THEN RETURN NULL.
     */
    public function connect()
    {
        $con=new mysqli(Constants::$DB_SERVER,Constants::$USERNAME,Constants::$PASSWORD,
        Constants::$DB_NAME);
        if($con->connect_error) {
            return null;
        }else{
            return $con;
        }
    }

    /**
     * 1. Receieve data from our HTTP POST Request.
     * 2. Connect to mysql database.
     * 3. Save those data to mysql database.
     * 4. Return a response to the client.
     */
    public function insert(){
        $name = $_POST['name'];
        $description = $_POST['description'];
        $galaxy = $_POST['galaxy'];
        $star = $_POST['star'];
        $dob = $_POST['dob'];
        $died = $_POST['died'];

        $con=$this->connect();
        if($con != null)
        {
            $sql = "INSERT INTO scientiststb (name, description, galaxy,star, dob, died) VALUES
            ('$name','$description','$galaxy','$star','$dob','$died')";
            $result = $con->query($sql);
            if($result == TRUE){
                 print(json_encode(array('code' =>1, 'message' => 'Data Successfully Inserted')));
            }else{
                print(json_encode(array('code' =>2,
                'message' => 'Unable to INSERT Data. However Connection was successful')));
            }
            $con->close();
        }else{
            print(json_encode(array('code' =>3,
            'message' => 'ERROR: PHP WAS UNABLE TO CONNECT TO MYSQL DUE TO NULL CONNECTION.')));
        }
    }
    /**
     * This method will:
     * 1. Receiev data from the HTTP POST request of the client
     * 2. Connect to mysql and update the id specified.
     * 3. Return a response to the client.
     */
    public function update(){
        $id = $_POST['id'];
        $name = $_POST['name'];
        $description = $_POST['description'];
        $galaxy = $_POST['galaxy'];
        $star = $_POST['star'];
        $dob = $_POST['dob'];
        $died = $_POST['died'];

        $con=$this->connect();
        if($con != null){
            $sql = "UPDATE  scientiststb SET name = '$name',description = '$description',
             galaxy = '$galaxy', star = '$star', dob = '$dob',died = '$died' WHERE id='$id'";

            $result = $con->query($sql);
            if($result == TRUE){
                print(json_encode(array('code' =>1, 'message' => 'Data Successfully Updated')));
            }else{
                print(json_encode(array('code' =>2,
                'message' => 'Unable to UPDATE Data. However Connection was successful')));
            }
            $con->close();
        }else{
            print(json_encode(array('code' =>3,
            'message' => 'ERROR: PHP WAS UNABLE TO CONNECT TO MYSQL DUE TO NULL CONNECTION.')));
        }
    }
    /**
     * This method will delete the row with the specified id.
     * 1. Connect to MySQL.
     * 2. Receive the id from our HTTP request.
     * 3. Delete the row with that id.
     * 4. Return a response.
     */
    public function delete(){
        $id = $_POST['id'];

        $con=$this->connect();
        if($con != null){
            $sql = "DELETE FROM scientiststb WHERE id ='$id'";
            $result = $con->query($sql);
            if($result == TRUE){
                print(json_encode(array('code' =>1, 'message' => 'Data Successfully Deleted')));
            }else{
                print(json_encode(array('code' =>2,
                'message' => 'Unable to DELETE Data. However Connection was successful')));
            }
            $con->close();

        }else{
            print(json_encode(array('code' =>3,
            'message' => 'ERROR: PHP WAS UNABLE TO CONNECT TO MYSQL DUE TO NULL CONNECTION.')));
        }
    }
    /**
     * This method will:
     * 1. Connect to MySQL.
     * 2. Select all data from database.
     * 3. Return those data as a response.
     */
    public function select()
    {
        $con=$this->connect();
        if($con != null)
        {
            $result=$con->query(Constants::$SQL_SELECT_ALL);
            if($result->num_rows > 0)
            {
                $scientists = array();
                while($row=$result->fetch_array())
                {
                    array_push($scientists, array("id"=>$row['id'],"name"=>$row['name'],
                    "description"=>$row['description'],"galaxy"=>$row['galaxy'],"star"=>$row['star'],
                    "dob"=>$row['dob'],"died"=>$row['died']));
                }
                print(json_encode(array("code" => 1,"message"=>"Success", "result"=>$scientists)));
            }else{
                print(json_encode(array("code" => 0, "message"=>"Data Not Found")));
            }
            $con->close();

        }else{
            print(json_encode(array('code' =>3,
            'message' => 'ERROR: PHP WAS UNABLE TO CONNECT TO MYSQL DUE TO NULL CONNECTION.')));
        }
    }
    /**
     * This method will:
     * 1. Receive a HTTP POST request from a client.
     * 2. Get the query,limit and start data from that request.
     * 3. Perform a paginated search against our mysql database after connecting.
     * 4. Return a response with either data or error message.
     */
    public function search()
    {
        $query=$_POST['query'];
        $limit=$_POST['limit'];
        $start=$_POST['start'];

        $sql="SELECT * FROM scientistsTB WHERE name LIKE '%$query%' OR galaxy LIKE '%$query%'
         LIMIT
         $limit OFFSET $start ";

        $con=$this->connect();
        if($con != null)
        {
            $result=$con->query($sql);
            if($result->num_rows>0)
            {
                $scientists=array();
                while($row=$result->fetch_array())
                {
                    array_push($scientists, array("id"=>$row['id'],"name"=>$row['name'],
                    "description"=>$row['description'],"galaxy"=>$row['galaxy'],"star"=>$row['star'],
                    "dob"=>$row['dob'],"died"=>$row['died']));
                }
                print(json_encode(array("code" => 1, "message"=>"Success", "result"=>$scientists)));
            }else{
                print(json_encode(array("code" => 0, "message"=>"Data Not Found")));
            }
            $con->close();

        }else{
            print(json_encode(array('code' =>3,
            'message' => 'ERROR: PHP WAS UNABLE TO CONNECT TO MYSQL DUE TO NULL CONNECTION.')));
        }
    }
    /**
     * This method will handle our HTTP Requests.
     * Basically it checks the request type and then determines the method that needs to be
     * executed. It's kind of a controller.
     */
    public function handleRequest() {

        if($_SERVER['REQUEST_METHOD'] == 'POST')
        {
            if (isset($_POST['action'])) {

                $action=$_POST['action'];

                if($action == 'INSERT'){
                    $this->insert();
                }else if($action == 'UPDATE'){
                    $this->update();
                }else if($action == 'DELETE'){
                    $this->delete();
                }else if($action == 'GET_PAGINATED'){
                    $this->search();
                }else if($action == 'GET_PAGINATED_SEARCH'){
                    $this->search();
                }else{
                    print(json_encode(array('code' =>4, 'message' => 'INVALID REQUEST.')));
                }
            } else{
                print(json_encode(array('code' =>5, 'message' => 'POST TYPE UNKNOWN.')));
            }

        }else{
            $this->select();
        }
    }
}

//Outside the class. Instantiate Scientist then invoke the handleRequest() to listen to our requests.
$s=new Scientists();
$s->handleRequest();

//end
```

## Download

Download the code [here](https://camposha.info/student-project/retrofit-mysql-crud-app/)
