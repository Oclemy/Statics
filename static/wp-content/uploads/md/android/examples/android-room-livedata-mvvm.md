# Room LiveData MVVM Full CRUD - INSERT SELECT UPDATE DELETE


This is the lesson number one of a multi-lesson series where we are building a full app using Room, LiveData and MVVM technologies. The app we are building is a scientist's app. The app allows registration of scientists, listing their details, updating their details etc.

The app has several screens like:

1. Dashboard
2. Splash screen.
3. Details screen.
4. Listing Screen.
5. CRUD Screen.

### Video Tutorial

<iframe width="788" height="443" src="https://www.youtube.com/embed/BQRQ5xVcb4Q" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>

### Demo

Here is the demo of the project we create. You can watch it in full in the video above.

![Android Room LiveData CRUD](https://camposha.info/wp-content/uploads/2019/06/demo1-5.gif)

Android Room LiveData CRUD

### Next

Move to the next lesson to continue with the course.

## Create Android Studio Project,Add Libraries,Resources

In this class we will look at the various dependencies our Room LiveData CRUD Full App is going to need. We will aslo create our project in android studio. We are using androidx and the latest versions of architecture components as of the time of writing.

### Video Tutorial(Recommended)

[https://www.youtube.com/watch?v=L8hDK34E-LU](https://www.youtube.com/watch?v=L8hDK34E-LU)

### Build.gradle

Add dependencies in your app level build.gradle as below.

```groovy
apply plugin: 'com.android.application'

android {
    compileSdkVersion 28
    defaultConfig {
        applicationId "info.camposha.roomlivedatacrudapp"
        minSdkVersion 16
        targetSdkVersion 28
        versionCode 1
        versionName "1.0"
        testInstrumentationRunner "androidx.test.runner.AndroidJUnitRunner"
    }
    buildTypes {
        release {
            minifyEnabled false
            proguardFiles getDefaultProguardFile('proguard-android-optimize.txt'), 'proguard-rules.pro'
        }
    }
    compileOptions {
        targetCompatibility 1.8
        sourceCompatibility 1.8
    }
}

dependencies {
    implementation fileTree(dir: 'libs', include: ['*.jar'])
    implementation 'androidx.appcompat:appcompat:1.0.2'
    implementation 'androidx.constraintlayout:constraintlayout:1.1.3'
    implementation 'androidx.recyclerview:recyclerview:1.0.0'
    implementation 'com.google.android.material:material:1.0.0'
    implementation 'androidx.cardview:cardview:1.0.0'
    // Room components
    implementation 'androidx.room:room-runtime:2.0.0'
    annotationProcessor 'androidx.room:room-compiler:2.0.0'
    // Lifecycle components
    implementation 'androidx.lifecycle:lifecycle-extensions:2.0.0'
    annotationProcessor 'androidx.lifecycle:lifecycle-compiler:2.0.0'

    implementation 'com.github.ivbaranov:materiallettericon:0.2.3'
    implementation "android.helper:datetimepickeredittext:1.0.0"
    implementation 'io.github.inflationx:calligraphy3:3.1.0'
    implementation 'io.github.inflationx:viewpump:1.0.0'
    implementation 'com.yarolegovich:lovely-dialog:1.1.0'
}
```

## Creating Splash and Dashboard Screens

To make a full app you will probably need a splash screen and a dashboard, especially the dashboard. The dashboard gives your users a centralized location from which they can navigate your app. It normally contains buttons or cards that link you to other parts.

Websites and Web applications all have dashboard almost as a default. This is because of their importance and role in easy user navigation.

### Video Tutorial

<iframe width="788" height="443" src="https://www.youtube.com/embed/bRqyRm3RRIM" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>

### Step 1: Creating a Splash Screen

#### (a). activity_splash.xml

```xml
<?xml version="1.0" encoding="utf-8"?>
<LinearLayout xmlns:android="http://schemas.android.com/apk/res/android"
    xmlns:tools="http://schemas.android.com/tools"
    android:layout_width="match_parent"
    android:layout_height="match_parent"
    android:background="@drawable/m_splash_screen_bg"
    android:gravity="center"
    android:orientation="vertical"
    tools:context=".view.ui.SplashActivity">

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

#### (b). SpashActivity.java

```java
package info.camposha.roomlivedatacrudapp.view.ui;

import android.content.Context;
import android.os.Bundle;
import android.view.animation.Animation;
import android.view.animation.AnimationUtils;
import android.widget.ImageView;
import android.widget.TextView;

import androidx.appcompat.app.AppCompatActivity;

import info.camposha.roomlivedatacrudapp.R;
import info.camposha.roomlivedatacrudapp.common.Utils;
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
        Animation animation = AnimationUtils.loadAnimation(this,
         R.anim.top_to_bottom);
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

![](https://camposha.info/wp-content/uploads/2019/07/splash.gif)

### Step 2: Creating a Dashboard Screen

#### (a). activity_dashboard.xml

```xml
<?xml version="1.0" encoding="utf-8"?>
<androidx.coordinatorlayout.widget.CoordinatorLayout xmlns:android="http://schemas.android.com/apk/res/android"
    xmlns:app="http://schemas.android.com/apk/res-auto"
    xmlns:tools="http://schemas.android.com/tools"
    android:layout_width="match_parent"
    android:layout_height="match_parent"
    android:background="@android:color/holo_red_light"
    tools:context=".view.ui.DashboardActivity">

    <com.google.android.material.appbar.AppBarLayout
        android:id="@+id/appbar"
        android:layout_width="match_parent"
        android:layout_height="220dp"
        android:theme="@style/ThemeOverlay.AppCompat.Dark.ActionBar">

        <com.google.android.material.appbar.CollapsingToolbarLayout
            android:id="@+id/colapsingtoolbar"
            android:layout_width="match_parent"
            android:layout_height="wrap_content"
            android:background="@drawable/cascaded_waterfall"
            app:contentScrim="@color/colorPrimary"
            app:expandedTitleMarginEnd="32dp"
            app:expandedTitleMarginStart="24dp"
            app:layout_scrollFlags="exitUntilCollapsed|scroll"
            app:title="Room LiveData CRUD">

            <androidx.appcompat.widget.Toolbar
                android:id="@+id/toolbarid"
                android:layout_width="match_parent"
                android:layout_height="?attr/actionBarSize"
                app:layout_collapseMode="pin"
                app:popupTheme="@style/AlertDialog.AppCompat.Light" />

        </com.google.android.material.appbar.CollapsingToolbarLayout>

    </com.google.android.material.appbar.AppBarLayout>

    <androidx.core.widget.NestedScrollView
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

                <androidx.cardview.widget.CardView
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

                </androidx.cardview.widget.CardView>

                <androidx.cardview.widget.CardView
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

                </androidx.cardview.widget.CardView>
            </LinearLayout>

            <LinearLayout
                android:layout_width="match_parent"
                android:layout_height="wrap_content"
                android:clipToPadding="false"
                android:gravity="center"
                android:orientation="horizontal">

                <androidx.cardview.widget.CardView
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

                </androidx.cardview.widget.CardView>

                <androidx.cardview.widget.CardView
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
                </androidx.cardview.widget.CardView>
            </LinearLayout>
        </LinearLayout>
    </androidx.core.widget.NestedScrollView>
</androidx.coordinatorlayout.widget.CoordinatorLayout>
```

#### (b). DashboardActivity.java

```java
package info.camposha.roomlivedatacrudapp.view.ui;

import android.content.Context;
import android.os.Bundle;
import android.widget.LinearLayout;

import androidx.appcompat.app.AppCompatActivity;

import info.camposha.roomlivedatacrudapp.R;
import info.camposha.roomlivedatacrudapp.common.Utils;
import io.github.inflationx.viewpump.ViewPumpContextWrapper;

public class DashboardActivity extends AppCompatActivity {

    //We have 4 cards in the dashboard
    private LinearLayout viewScientistsCard;
    private LinearLayout addScientistCard;
    private LinearLayout third;
    private LinearLayout closeCard;

    /**
     * Let's initialize our cards  and listen to their click events
     */
    private void initializeWidgets(){
        viewScientistsCard = findViewById(R.id.viewScientistsCard);
        addScientistCard = findViewById(R.id.addScientistCard);
        third = findViewById(R.id.third);
        closeCard = findViewById(R.id.closeCard);

        viewScientistsCard.setOnClickListener(v -> Utils.openActivity(DashboardActivity.this,
        ScientistsActivity.class));
        addScientistCard.setOnClickListener(v -> Utils.openActivity(DashboardActivity.this,
        CRUDActivity.class));
        third.setOnClickListener(v -> Utils.showInfoDialog(DashboardActivity.this, "YEEES",
        "Hey You can Display another page when this is clicked"));
        closeCard.setOnClickListener(v -> finish());
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

### ![](https://camposha.info/wp-content/uploads/2019/07/dashboard.gif)

Now move over to the next lesson.

## Room Model Class

In this lesson we create our model class. This lesson is part of our android mvvm livedata CRUD course with Room. This model class we will create will have the following functionalities and characteristics:

1. It will represent our data object, our Scientist object.
2. From it Room will generate our Table Schema.
3. It will be serializable thus we will be able to pass it around across activities.

Furthermore it will have the following fields:

1. ID
2. Name
3. Galaxy
4. Star
5. DOB

### Video Lesson

<iframe width="788" height="443" src="https://www.youtube.com/embed/STYpvHfMe-Q" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>

### Full Code

Here is the full code:

```java
package info.camposha.roomlivedatacrudapp.data.model;

import androidx.annotation.NonNull;
import androidx.room.ColumnInfo;
import androidx.room.Entity;
import androidx.room.PrimaryKey;

import java.io.Serializable;

@Entity(tableName = "ScientistTB")
public class Scientist implements Serializable {

    @NonNull
    @PrimaryKey
    @ColumnInfo(name = "id")
    private String id;
    @ColumnInfo(name = "name")
    private String name;
    @ColumnInfo(name = "description")
    private String description;
    @ColumnInfo(name = "galaxy")
    private String galaxy;
    @ColumnInfo(name = "star")
    private String star;
    @ColumnInfo(name = "dob")
    private String dob;

    public String getId() {
        return id;
    }
    public void setId(String id) {
        this.id = id;
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
    @Override
    public String toString() {
        return getName();
    }
}
//end
```

## RoomDatabase and DAO interface

In this lesson we will create our RoomDatabase as well as our DAO interface.This lesson is part of Android MVVM LiveData Room CRUD course.

### (a). ScientistsDAO.java

DAO stands for Data Access Object. Thus the object of this interface will allow us access our data via methods we are going to define. This is an interface hence the methods will be abstract.

However they will be decorated with special annotations which Room will use to infer our intentions.

For example:

```java
    @Insert
    long  insert(Scientist scientist);
```

tells Room we want to insert a scientist object. Room understands that annotation. It also understands the Scientist object because it was defined as our entity.

Thus with Room we have the advantage of not having to write raw SQL statements.

### Video Lesson

<iframe width="788" height="443" src="https://www.youtube.com/embed/A-YB_p46Izo" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>

#### Step 1: Add imports

Create an interface known as ScientistsDAO and add the following import statements:

```java
import androidx.lifecycle.LiveData;
import androidx.room.Dao;
import androidx.room.Delete;
import androidx.room.Insert;
import androidx.room.Query;
import androidx.room.Update;

import java.util.List;
```

#### Step 2. Define our DAO interface

Then define an interface annotated with `@Dao` to mark it as our Data Access Object:

```java
@Dao
public interface ScientistDAO {
```

#### Step 3: Insert

Methods annotated with @Insert can return either void, long, Long, long[],Long[] or List.

```java

    @Insert
    long  insert(Scientist scientist);
```

The above method will allow us insert a Scientist object to our SQLite database.

#### Step 4: Update

Update methods must either return void or return int (the number of updated rows).

```java
    @Update
    int update(Scientist scientist);
```

The int returned above is the number of rows updated after calling the above method.

#### Step 5: Delete

Deletion methods must either return void or return int (the number of deleted rows).

```java
    @Delete
    int  delete(Scientist scientist);
```

The method above allows us delete a scientist object via Rooom.

To delete all rows from SQLite via Room:

```java
    @Query("delete from ScientistTB")
    int deleteAll();
```

#### Step 6: Select

Below is our method for selecting data:

```java
    @Query("select * from ScientistTB")
    LiveData<List<Scientist>> selectAll();
```

We have supplied a '@Query' annotated with our SQL statement for selecting all data from ScientistsTB. You can see we are returning LiveData object with a generic list of scientists as the generic parameter. Observers will then be able to observe that LiveData for changes.

#### FULL CODE

Here is the full code for the `ScientistsDAO.java`:

```java
package info.camposha.roomlivedatacrudapp.data.dao;

import androidx.lifecycle.LiveData;
import androidx.room.Dao;
import androidx.room.Delete;
import androidx.room.Insert;
import androidx.room.Query;
import androidx.room.Update;

import java.util.List;
import info.camposha.roomlivedatacrudapp.data.model.Scientist;

@Dao
public interface ScientistDAO {
    //NB= Methods annotated with @Insert can return either void, long, Long, long[],
    // Long[] or List<Long>.
    @Insert
    long  insert(Scientist scientist);
    //Update methods must either return void or return int (the number of updated rows).
    @Update
    int update(Scientist scientist);
    //Deletion methods must either return void or return int (the number of deleted rows).
    @Delete
    int  delete(Scientist scientist);
    @Query("select * from ScientistTB")
    LiveData<List<Scientist>> selectAll();
    //NB= Deletion methods must either return void or return int (the number of deleted
    // rows).
    @Query("delete from ScientistTB")
    int deleteAll();
}
//end
```

### (b). MyRoomDB.java

This abstract class will:

1. Represent our Room Database.
2. It will also define our database entities or tables.
3. It will also define our database version.

#### Step 1. Add Imports

Start by adding imports:

```java
import android.content.Context;

import androidx.room.Database;
import androidx.room.Room;
import androidx.room.RoomDatabase;

import info.camposha.roomlivedatacrudapp.data.dao.ScientistDAO;
import info.camposha.roomlivedatacrudapp.data.model.Scientist;
```

#### Step 2: Create a RoomDatabase class

Create an abstract class and make it extend `androidx.room.RoomDatabase`:

```java
public abstract class MyRoomDB extends RoomDatabase {
```

#### Step 3: Annotate it with @Database

Then annotated with `@Database` decoration:

```java
@Database(entities = {Scientist.class}, version = 2, exportSchema = false)
```

In the above we have specified our entities, database version and whether to export schema.

#### Step 4: Create Factory Method

```java
public abstract ScientistDAO scientistsDAO();

    private static MyRoomDB instance;

    public static MyRoomDB getInstance(Context con) {
        if (instance == null) {
            instance = Room.databaseBuilder(con, MyRoomDB.class,
                    "MyRoomDB")
                    .fallbackToDestructiveMigration()
                    .build();
        }
        return instance;
    }
```

### Full Code

Here is the full code:

```java
package info.camposha.roomlivedatacrudapp.database;

import android.content.Context;

import androidx.room.Database;
import androidx.room.Room;
import androidx.room.RoomDatabase;

import info.camposha.roomlivedatacrudapp.data.dao.ScientistDAO;
import info.camposha.roomlivedatacrudapp.data.model.Scientist;

@Database(entities = {Scientist.class}, version = 2, exportSchema = false)
public abstract class MyRoomDB extends RoomDatabase {

    public abstract ScientistDAO scientistsDAO();

    private static MyRoomDB instance;

    public static MyRoomDB getInstance(Context con) {
        if (instance == null) {
            instance = Room.databaseBuilder(con, MyRoomDB.class,
                    "MyRoomDB")
                    .fallbackToDestructiveMigration()
                    .build();
        }
        return instance;
    }
}
//end
```

## CRUD Activity

This is the activity for :

1. Creating a New Scientist.
2. Updating an Existing Scientit.
3. Deleting an Existing scientist.

We are re-using the same activity intelligently for doing all those. This will save us from alot of repetitive coding. All we need do is inflate our menu resources based on the intended purpose of the activity.

For example if the activity is opened with a null object being passed along, then we know the activity is opened for adding a new scientist. Thus we inflate the `new_item_menu.xml` from our menu resources.

On the other hand if the activity is opened with a Scientist object being passed along, then we know the activity is opened for the sake of editing or deleting that scientist. Thus we inflate the `edit_item_menu.xml`. All the various widgets remain the same.

### Video Lesson

<iframe width="788" height="443" src="https://www.youtube.com/embed/IeQGBGQTCjY" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>

### Steps

### Step 1: Create menus

Create a menu folder under the resources if you haven't created one.Call it menu.

#### (a). new_tem_menu.xml

Create a menu file called `new_item_menu.xml` and add the following code:

```xml
<?xml version="1.0" encoding="utf-8"?>
<!-- Options menu for the CRUDActivity -->
<menu xmlns:android="http://schemas.android.com/apk/res/android"
    xmlns:app="http://schemas.android.com/apk/res-auto"
    xmlns:tools="http://schemas.android.com/tools"
    tools:context=".views.ui.CRUDActivity">

    <item
        android:id="@+id/insertMenuItem"
        android:title="SAVE"
        android:icon="@drawable/m_add"
        app:showAsAction="always" />
    <item
        android:id="@+id/viewAllMenuItem"
        android:title="VIEW ALL"
        android:icon="@drawable/m_list"
        app:showAsAction="always" />
</menu>
```

#### (b). edit_item_menu.xml

Create a file called `edit_item_menu.xml` and add the following code:

```xml
<?xml version="1.0" encoding="utf-8"?>
<!-- Options menu for the CRUDActivity -->
<menu xmlns:android="http://schemas.android.com/apk/res/android"
    xmlns:app="http://schemas.android.com/apk/res-auto"
    xmlns:tools="http://schemas.android.com/tools"
    tools:context=".views.ui.CRUDActivity">

    <item
        android:id="@+id/editMenuItem"
        android:title="SAVE"
        android:icon="@drawable/m_done"
        app:showAsAction="always" />
    <item
        android:id="@+id/deleteMenuItem"
        android:title="DELETE"
        android:icon="@drawable/m_delete"
        app:showAsAction="always" />
    <item
        android:id="@+id/viewAllMenuItem"
        android:title="VIEW ALL"
        android:icon="@drawable/m_list"
        app:showAsAction="ifRoom" />
</menu>
```

### Step 2: Create XML Layout.

Go under the layout folder in your resources and add the following code in a file called `activity_crud.xml`.

#### (a). activity_crud.xml

```xml
<?xml version="1.0" encoding="utf-8"?>
<ScrollView xmlns:android="http://schemas.android.com/apk/res/android"
    xmlns:app="http://schemas.android.com/apk/res-auto"
    xmlns:tools="http://schemas.android.com/tools"
    android:layout_width="match_parent"
    android:layout_height="match_parent"
    android:background="@android:color/holo_red_light"
    tools:context=".view.ui.CRUDActivity">

    <LinearLayout
        android:layout_width="match_parent"
        android:layout_height="wrap_content"
        android:orientation="vertical"
        android:paddingBottom="5dp"
        android:paddingLeft="5dp"
        android:paddingRight="5dp"
        android:paddingTop="5dp">

        <TextView
            android:id="@+id/headerTxt"
            fontPath="fonts/Roboto-Bold.ttf"
            android:layout_width="match_parent"
            android:layout_height="wrap_content"
            android:padding="5dp"
            android:text="Scientists Editing Page"
            android:textAlignment="center"
            android:textAppearance="@style/TextAppearance.AppCompat.Large"
            android:textColor="@color/white"
            tools:ignore="MissingPrefix" />

        <androidx.cardview.widget.CardView
            android:layout_width="match_parent"
            android:layout_height="wrap_content"
            android:layout_margin="@dimen/card_margin"
            app:cardBackgroundColor="@color/white">

            <LinearLayout
                android:layout_width="match_parent"
                android:layout_height="wrap_content"
                android:orientation="vertical">

                <TextView
                    android:layout_width="match_parent"
                    android:layout_height="wrap_content"
                    android:padding="@dimen/text_padding"
                    android:text="INSTRUCTIONS"
                    android:textAppearance="@style/TextAppearance.AppCompat.Title"
                    android:textColor="@color/skyblue" />

                <TextView
                    android:id="@+id/instructionsTV"
                    android:layout_width="match_parent"
                    android:layout_height="wrap_content"
                    android:padding="@dimen/text_padding"
                    android:text="Provide the Scientist details in the edittext then click the save button in the toolbar. Some fields like name and galaxy must be provided." />

            </LinearLayout>

        </androidx.cardview.widget.CardView>

        <androidx.cardview.widget.CardView
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
                    android:text="Personal Details"
                    android:textAppearance="@style/TextAppearance.AppCompat.Title"
                    android:textColor="@color/niceGreenish"
                    tools:ignore="MissingPrefix" />

                <EditText
                    android:id="@+id/nameTxt"
                    android:layout_width="match_parent"
                    android:layout_height="wrap_content"
                    android:layout_marginBottom="16dp"
                    android:layout_marginTop="16dp"
                    android:hint="Name"
                    tools:ignore="MissingPrefix" />

                <EditText
                    android:id="@+id/descriptionTxt"
                    android:layout_width="match_parent"
                    android:layout_height="wrap_content"
                    android:layout_marginBottom="16dp"
                    android:layout_marginTop="16dp"
                    android:hint="Description"
                    android:minLines="3"
                    tools:ignore="MissingPrefix" />

            </LinearLayout>

        </androidx.cardview.widget.CardView>

        <androidx.cardview.widget.CardView
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
                    android:text="Residence Details"
                    android:textAppearance="@style/TextAppearance.AppCompat.Title"
                    android:textColor="@color/niceGreenish" />

                <EditText
                    android:id="@+id/galaxyTxt"
                    android:layout_width="match_parent"
                    android:layout_height="wrap_content"
                    android:layout_marginBottom="16dp"
                    android:layout_marginTop="16dp"
                    android:hint="Galaxy"
                    tools:ignore="MissingPrefix" />

                <EditText
                    android:id="@+id/starTxt"
                    android:layout_width="match_parent"
                    android:layout_height="wrap_content"
                    android:layout_marginBottom="16dp"
                    android:layout_marginTop="16dp"
                    android:hint="Star"
                    tools:ignore="MissingPrefix" />
            </LinearLayout>

        </androidx.cardview.widget.CardView>

        <androidx.cardview.widget.CardView
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
                    android:text="TimeLine Details"
                    android:textAppearance="@style/TextAppearance.AppCompat.Title"
                    android:textColor="@color/niceGreenish" />

                <android.helper.DateTimePickerEditText
                    android:id="@+id/dobTxt"
                    android:layout_width="match_parent"
                    android:layout_height="wrap_content"
                    android:layout_margin="@dimen/text_padding"
                    android:hint="Date of Birth"
                    tools:ignore="MissingPrefix" />
            </LinearLayout>

        </androidx.cardview.widget.CardView>

    </LinearLayout>

</ScrollView>
```

### Step 3: Java Code

Now create a class called `CRUDActivity.java` under the Views package.

#### (a). CRUDActivity.java

```java
package info.camposha.roomlivedatacrudapp.view.ui;

import android.content.Context;
import android.helper.DateTimePickerEditText;
import android.os.Bundle;
import android.view.Menu;
import android.view.MenuItem;
import android.widget.EditText;
import android.widget.TextView;

import androidx.appcompat.app.AppCompatActivity;
import androidx.core.app.NavUtils;
import androidx.lifecycle.ViewModelProviders;

import java.text.DateFormat;
import java.text.SimpleDateFormat;
import java.util.Calendar;
import java.util.Date;

import info.camposha.roomlivedatacrudapp.R;
import info.camposha.roomlivedatacrudapp.data.model.Scientist;
import info.camposha.roomlivedatacrudapp.common.Utils;
import info.camposha.roomlivedatacrudapp.viewmodel.ScientistViewModel;
import io.github.inflationx.viewpump.ViewPumpContextWrapper;

public class CRUDActivity extends AppCompatActivity {
    //we'll have several instance fields
    private EditText nameTxt, descriptionTxt, galaxyTxt, starTxt;
    private TextView headerTxt;
    private DateTimePickerEditText dobTxt;
    private final Context c = CRUDActivity.this;
    private ScientistViewModel scientistViewModel;
    private Scientist receivedScientist;

    private void insertScientist(String name, String description, String galaxy,
                                 String star, String dob) {
        Scientist scientist = new Scientist();
        scientist.setId(String.valueOf(System.currentTimeMillis()));
        scientist.setName(name);
        scientist.setDescription(description);
        scientist.setGalaxy(galaxy);
        scientist.setStar(star);
        scientist.setDob(dob);

        Long result = scientistViewModel.insert(scientist);
        if (result != null) {
            if (result > -1) {
                Utils.clearEditTexts(nameTxt, descriptionTxt, galaxyTxt, starTxt, dobTxt);
                Utils.show(this, "INSERT SUCCESSFUL");
            } else {
                Utils.show(this, "INSERT UNSUCCESSFUL");
            }
        } else {
            Utils.show(this, "UNSUCCESSFUL. ERRORED OCCURED");
        }

    }

    private void updateScientist(String name, String description, String galaxy,
                                 String star, String dob) {
        receivedScientist.setName(name);
        receivedScientist.setDescription(description);
        receivedScientist.setGalaxy(galaxy);
        receivedScientist.setStar(star);
        receivedScientist.setDob(dob);
        Integer result = scientistViewModel.update(receivedScientist);
        if (result != null) {
            if (result > 0) {
                Utils.show(this, "UPDATE SUCCESSFUL");
            } else {
                Utils.show(this, "UPDATE UNSUCCESSFUL");
            }
        } else {
            Utils.show(this, "UNSUCCESSFUL. ERRORED OCCURED");
        }
    }

    private void initializeWidgets() {
        headerTxt = findViewById(R.id.headerTxt);
        nameTxt = findViewById(R.id.nameTxt);
        descriptionTxt = findViewById(R.id.descriptionTxt);
        galaxyTxt = findViewById(R.id.galaxyTxt);
        starTxt = findViewById(R.id.starTxt);

        dobTxt = findViewById(R.id.dobTxt);
        dobTxt.setFormat(Utils.DATE_FORMAT);
    }

    private void insertData() {
        String name, description, galaxy, star, dob;
        if (Utils.validate(nameTxt, descriptionTxt, galaxyTxt)) {
            name = nameTxt.getText().toString();
            description = descriptionTxt.getText().toString();
            galaxy = galaxyTxt.getText().toString();
            star = starTxt.getText().toString();

            if (dobTxt.getDate() != null) {
                Date date=dobTxt.getDate();
                dob = dobTxt.getFormat().format(dobTxt.getDate());
            } else {
                dobTxt.setError("Invalid Date");
                dobTxt.requestFocus();
                return;
            }

            insertScientist(name, description, galaxy, star, dob);

        }
    }
    private void updateData() {
        String name, description, galaxy, star, dob;
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

            updateScientist(name, description, galaxy, star, dob);

        }
    }
    private void deleteData() {
        Integer result = scientistViewModel.delete(receivedScientist);
        if (result != null) {
            if (result > 0) {
                Utils.show(this, "DELETE SUCCESSFUL");
            } else {
                Utils.show(this, "DELETE UNSUCCESSFUL");
            }
        } else {
            Utils.show(this, "UNSUCCESSFUL. ERRORED OCCURED");
        }
    }
    private void showSelectedStarInEditText() {
        starTxt.setOnClickListener(v -> Utils.selectStar(c, starTxt));
    }

    @Override
    public void onBackPressed() {
        Utils.showInfoDialog(this, "Warning", "Are you sure you want to exit?");
    }

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
        Scientist o = Utils.receiveScientist(getIntent(), c);
        if (o != null) {
            receivedScientist = o;
            nameTxt.setText(receivedScientist.getName());
            descriptionTxt.setText(receivedScientist.getDescription());
            galaxyTxt.setText(receivedScientist.getGalaxy());
            starTxt.setText(receivedScientist.getStar());
            Object dob = receivedScientist.getDob();
            if (dob != null) {
                dobTxt.setDate(Utils.giveMeDate(dob.toString()));
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

        scientistViewModel = ViewModelProviders.of(this).get(ScientistViewModel.class);

        this.initializeWidgets();
        this.showSelectedStarInEditText();
    }
}
//end
```

### Demo

![Room LiveData CRUD](https://camposha.info/wp-content/uploads/2019/07/crud.gif)

## RecyclerView Adapter

This is the class where we create our recyclerview adapter. This class is part of the Android Room LiveData CRUD Full App Course series. In the series we are creating a full android app using Room, LiveData and ViewModel, and basing our app design on MVVM design pattern.

### Roles of Our Adapter Class

This adapter class we will create will be responsible for the following roles:

1. Inflate our model layout into a View object.
2. Bind data to the inflated view widgets.
3. Hold inflated views for recycling using an inner RecyclerView.ViewHolder class.

Thus it's mandatory for us since our next lesson involve us loading data to the recyclerview.

### Video Lesson

<iframe width="788" height="443" src="https://www.youtube.com/embed/08na2e7Oh8s" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>

### Step 1: Create a Layout File

#### (a). model.xml

This layout file will be inflated into custom View objects using the LayoutInflater class:

```java
        View view = LayoutInflater.from(c).inflate(R.layout.model, parent, false);
```

That view will then be passed to the ViewHolder from where it will be used to reference widgets that were defined in the layout:

```java
            nameTxt = itemView.findViewById(R.id.mNameTxt);
```

Add the following XML code in the `model.xml` file:

```xml
<?xml version="1.0" encoding="utf-8"?>
<androidx.cardview.widget.CardView xmlns:android="http://schemas.android.com/apk/res/android"
    xmlns:card_view="http://schemas.android.com/apk/res-auto"
    android:layout_width="match_parent"
    android:layout_height="140dp"
    xmlns:tools="http://schemas.android.com/tools"
    android:layout_margin="5dp"
    android:orientation="horizontal"
    card_view:cardCornerRadius="5dp"
    card_view:cardElevation="5dp">

    <RelativeLayout
        android:layout_width="match_parent"
        android:layout_height="match_parent">

        <com.github.ivbaranov.mli.MaterialLetterIcon
            android:id="@+id/mMaterialLetterIcon"
            android:layout_width="@dimen/list_item_avatar_size"
            android:layout_height="@dimen/list_item_avatar_size"
            android:layout_marginRight="8dp" />

        <TextView
            android:id="@+id/mNameTxt"
            android:layout_width="wrap_content"
            android:layout_height="wrap_content"
            android:layout_alignParentTop="true"
            android:layout_toRightOf="@+id/mMaterialLetterIcon"
            android:padding="3dp"
            android:text="Scientist's Name"
            android:textAppearance="?android:attr/textAppearanceMedium"
            android:textColor="#009968" />

        <TextView
            android:id="@+id/mDescriptionTxt"
            android:layout_width="wrap_content"
            android:layout_height="wrap_content"
            android:layout_toRightOf="@+id/mMaterialLetterIcon"
            android:maxLines="2"
            android:layout_below="@id/mNameTxt"
            android:text="Scientists Description"
            android:textAppearance="?android:attr/textAppearanceSmall"
            android:textStyle="italic" />

        <TextView
            android:id="@+id/mGalaxyTxt"
            android:layout_width="wrap_content"
            android:layout_height="wrap_content"
            android:layout_alignParentRight="true"
            android:text="Galaxy"
            android:textColor="@color/colorAccent"
            android:textStyle="italic"
            fontPath="fonts/RobotoCondensed-Regular.ttf"
            android:textAppearance="?android:attr/textAppearanceSmall"
            tools:ignore="MissingPrefix"/>

    </RelativeLayout>
</androidx.cardview.widget.CardView>
```

### Step 2: Create Adapter Class

#### (a). MyAdapter.java

This is the adapter class we have talked about.

Start by creating a file called `MyAdapter.java`, then adding the imports:

```java
package info.camposha.roomlivedatacrudapp.view.adapter;

import android.content.Context;
import android.util.TypedValue;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.TextView;

import androidx.annotation.NonNull;
import androidx.recyclerview.widget.RecyclerView;

import com.github.ivbaranov.mli.MaterialLetterIcon;

import java.util.ArrayList;
import java.util.List;
import java.util.Random;

import info.camposha.roomlivedatacrudapp.R;
import info.camposha.roomlivedatacrudapp.data.model.Scientist;
import info.camposha.roomlivedatacrudapp.common.Utils;
import info.camposha.roomlivedatacrudapp.view.ui.DetailActivity;
```

Then define the class, making it derive from RecyclerView.Adapter:

```java
public class MyAdapter extends RecyclerView.Adapter<MyAdapter.ViewHolder> {
```

Then add our final instance fields:

```java
    private final Context c;
    private final int mBackground;
    private final int[] mMaterialColors;
    private final List<Scientist> scientists;
```

Then create an inner ViewHolder class:

```java
    public class ViewHolder extends RecyclerView.ViewHolder implements
     View.OnClickListener {
        private final TextView nameTxt;
        private final TextView mDescriptionTxt;
        private final TextView galaxyTxt;
        private final MaterialLetterIcon mIcon;
        private ItemClickListener itemClickListener;
```

The ViewHolder class as you can see defines final instance fields which will be used to hold our View objects. This saves our app from having to re-inflate the same layout over and over for different rows. This leads to massive performance gains.

Then initialize those widgets:

```java
        ViewHolder(View itemView) {
            super(itemView);
            mIcon = itemView.findViewById(R.id.mMaterialLetterIcon);
            nameTxt = itemView.findViewById(R.id.mNameTxt);
            mDescriptionTxt = itemView.findViewById(R.id.mDescriptionTxt);
            galaxyTxt = itemView.findViewById(R.id.mGalaxyTxt);
            itemView.setOnClickListener(this);
        }
```

As you can see we've referenced them inside the constructor using the passed View object.

Then code for our onClicks:

```java
        @Override
        public void onClick(View view) {
            this.itemClickListener.onItemClick(this.getLayoutPosition());
        }

        void setItemClickListener(ItemClickListener itemClickListener) {
            this.itemClickListener = itemClickListener;
        }
    }
```

### Full Code

```java
package info.camposha.roomlivedatacrudapp.view.adapter;

import android.content.Context;
import android.util.TypedValue;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.TextView;

import androidx.annotation.NonNull;
import androidx.recyclerview.widget.RecyclerView;

import com.github.ivbaranov.mli.MaterialLetterIcon;

import java.util.ArrayList;
import java.util.List;
import java.util.Random;

import info.camposha.roomlivedatacrudapp.R;
import info.camposha.roomlivedatacrudapp.data.model.Scientist;
import info.camposha.roomlivedatacrudapp.common.Utils;
import info.camposha.roomlivedatacrudapp.view.ui.DetailActivity;

public class MyAdapter extends RecyclerView.Adapter<MyAdapter.ViewHolder> {
    private final Context c;
    private final int mBackground;
    private final int[] mMaterialColors;
    private final List<Scientist> scientists;

    public class ViewHolder extends RecyclerView.ViewHolder implements
     View.OnClickListener {
        private final TextView nameTxt;
        private final TextView mDescriptionTxt;
        private final TextView galaxyTxt;
        private final MaterialLetterIcon mIcon;
        private ItemClickListener itemClickListener;

        ViewHolder(View itemView) {
            super(itemView);
            mIcon = itemView.findViewById(R.id.mMaterialLetterIcon);
            nameTxt = itemView.findViewById(R.id.mNameTxt);
            mDescriptionTxt = itemView.findViewById(R.id.mDescriptionTxt);
            galaxyTxt = itemView.findViewById(R.id.mGalaxyTxt);
            itemView.setOnClickListener(this);
        }
        @Override
        public void onClick(View view) {
            this.itemClickListener.onItemClick(this.getLayoutPosition());
        }

        void setItemClickListener(ItemClickListener itemClickListener) {
            this.itemClickListener = itemClickListener;
        }
    }
    public MyAdapter(Context mContext, ArrayList<Scientist> scientists) {
        this.c = mContext;
        this.scientists = scientists;
        TypedValue mTypedValue = new TypedValue();
        c.getTheme().resolveAttribute(R.attr.selectableItemBackground,
         mTypedValue, true);
        mMaterialColors = c.getResources().getIntArray(R.array.colors);
        mBackground = mTypedValue.resourceId;
    }

    @NonNull
    @Override
    public ViewHolder onCreateViewHolder(@NonNull ViewGroup parent, int viewType) {
        View view = LayoutInflater.from(c).inflate(R.layout.model, parent, false);
        view.setBackgroundResource(mBackground);
        return new ViewHolder(view);
    }

    @Override
    public void onBindViewHolder(@NonNull ViewHolder holder, int position) {
        //get current scientist
        final Scientist s = scientists.get(position);

        //bind data to widgets
        holder.nameTxt.setText(s.getName());
        holder.mDescriptionTxt.setText(s.getDescription());
        holder.galaxyTxt.setText(s.getGalaxy());
        holder.mIcon.setInitials(true);
        holder.mIcon.setInitialsNumber(2);
        holder.mIcon.setLetterSize(25);
        holder.mIcon.setShapeColor(mMaterialColors[new Random().nextInt(
            mMaterialColors.length)]);
        holder.mIcon.setLetter(s.getName());

        //open detailactivity when clicked
        holder.setItemClickListener(pos -> Utils.sendScientistToActivity(c, s,
         DetailActivity.class));
    }
    @Override
    public int getItemCount() {
        return scientists.size();
    }
    interface ItemClickListener {
        void onItemClick(int pos);
    }
}
//end
```

## Loading Room Data to RecyclerView and Showing Details

This lesson involves us loading and binding our Room SQLite data onto the recyclerview. **This lesson is part of the Android Room LiveData CRUD MVVVM course** we are covering.

In this class we have a recyclerview inside a layout. The layout gets inflated into our Activity. When the activity is created we load our data from SQlite using Room. We then listen to click events in the recyclerview and show the details of the clicked scientist in a beautiful detail activity.

However this will be done in an MVVM way by making use of:

1. Room
2. LiveData
3. Repository class
4. ViewModel

### Video Lesson

## Part 1 - Scientists Activity

### Step 1: Create Layout

#### (a). activity_scientists.xml

Add the following code in the `activity_scientists.xml`:

```xml
<?xml version="1.0" encoding="utf-8"?>
<LinearLayout xmlns:android="http://schemas.android.com/apk/res/android"
    xmlns:tools="http://schemas.android.com/tools"
    android:layout_width="match_parent"
    android:layout_height="match_parent"
    android:orientation="vertical"
    android:weightSum="1">

    <TextView
        android:id="@+id/mHeaderTxt"
        android:layout_width="match_parent"
        android:layout_height="wrap_content"
        android:padding="5dp"
        android:text="Freak Scientists"
        android:textAlignment="center"
        android:textAppearance="@style/TextAppearance.AppCompat.Large"
        android:textColor="@color/colorAccent"
        android:textStyle="bold"
        tools:ignore="MissingPrefix" />

        <androidx.recyclerview.widget.RecyclerView
            android:id="@+id/mRecyclerView"
            android:layout_width="match_parent"
            android:layout_height="wrap_content" />

</LinearLayout>
```

### Step 2: Create our Activity

#### (a). ScientistsActivity.java

```java
package info.camposha.roomlivedatacrudapp.view.ui;

import android.content.Context;
import android.os.Bundle;
import android.view.Menu;
import android.view.MenuInflater;
import android.view.MenuItem;

import androidx.appcompat.app.AppCompatActivity;
import androidx.appcompat.widget.SearchView;
import androidx.lifecycle.ViewModelProviders;
import androidx.recyclerview.widget.LinearLayoutManager;
import androidx.recyclerview.widget.RecyclerView;

import java.util.ArrayList;

import info.camposha.roomlivedatacrudapp.R;
import info.camposha.roomlivedatacrudapp.data.model.Scientist;
import info.camposha.roomlivedatacrudapp.common.Utils;
import info.camposha.roomlivedatacrudapp.view.adapter.MyAdapter;
import info.camposha.roomlivedatacrudapp.viewmodel.ScientistViewModel;
import io.github.inflationx.viewpump.ViewPumpContextWrapper;

public class ScientistsActivity extends AppCompatActivity
        implements SearchView.OnQueryTextListener,MenuItem.OnActionExpandListener{

     //We define our instance fields
    private RecyclerView rv;
    /**
     * We initialize our widgets
     */
    private void initializeViews() {
        rv = findViewById(R.id.mRecyclerView);
    }
    private void setupRecyclerView() {
        ScientistViewModel scientistViewModel = ViewModelProviders.of(this).get(
            ScientistViewModel.class);
        scientistViewModel.getScientistsLiveData().observe(this, scientists -> {
            rv.setLayoutManager(new LinearLayoutManager(this));
            rv.setAdapter(new MyAdapter(this, (ArrayList<Scientist>) scientists));
        });

    }

    @Override
    public boolean onCreateOptionsMenu(Menu menu) {
        MenuInflater inflater = getMenuInflater();
        inflater.inflate(R.menu.scientists_page_menu, menu);
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
        setupRecyclerView();
    }
}

//end
```

## Part 2 - Detail Activity

This activity will show the details of the clicked scientist. These details will be passed to this activity from the ScientistsActivity via intent. The Scientist will be serialized, then passed and deserialized back into an object. Then from the object we obtain the attributes to show in our various textviews in the detail activity.

Here are the views we will use:

1. CollapsingToolBar
2. CardViews
3. TextViews

Here are the propertiesof the scientist that will be shown:

1. Name
2. Description
3. Galaxy
4. Star
5. Date of Birth

### Step 1. Create Layouts

We will have two layouts:

#### (a). activity_detail.xml

```xml
<?xml version="1.0" encoding="utf-8"?>
<androidx.coordinatorlayout.widget.CoordinatorLayout xmlns:android="http://schemas.android.com/apk/res/android"
    xmlns:app="http://schemas.android.com/apk/res-auto"
    xmlns:tools="http://schemas.android.com/tools"
    android:layout_width="match_parent"
    android:layout_height="match_parent"
    android:fitsSystemWindows="true"
    tools:context=".view.ui.DetailActivity">

    <com.google.android.material.appbar.AppBarLayout
        android:layout_width="match_parent"
        android:layout_height="wrap_content">

        <com.google.android.material.appbar.CollapsingToolbarLayout
            android:id="@+id/mCollapsingToolbarLayout"
            android:layout_width="match_parent"
            android:layout_height="200dp"
            android:fitsSystemWindows="true"
            app:contentScrim="?attr/colorPrimary"
            app:expandedTitleMarginEnd="32dp"
            app:expandedTitleMarginStart="24dp"
            app:layout_scrollFlags="scroll|exitUntilCollapsed">

            <ImageView
                android:id="@+id/scientistImg"
                android:layout_width="match_parent"
                android:layout_height="match_parent"
                android:fitsSystemWindows="true"
                android:scaleType="fitXY"
                android:src="@drawable/flowers_sky"
                app:layout_collapseMode="parallax" />

            <androidx.appcompat.widget.Toolbar
                android:id="@+id/toolbar"
                android:layout_width="match_parent"
                android:layout_height="?attr/actionBarSize"
                android:background="@android:color/transparent"
                app:layout_collapseMode="pin"
                app:popupTheme="@style/ThemeOverlay.AppCompat.Light" />
        </com.google.android.material.appbar.CollapsingToolbarLayout>

    </com.google.android.material.appbar.AppBarLayout>

    <androidx.core.widget.NestedScrollView
        android:layout_width="match_parent"
        android:layout_height="match_parent"
        app:layout_behavior="@string/appbar_scrolling_view_behavior">

        <LinearLayout
            android:layout_width="match_parent"
            android:layout_height="wrap_content"
            android:orientation="vertical">

            <include layout="@layout/detail_content" />

            <com.google.android.material.floatingactionbutton.FloatingActionButton
                android:id="@+id/editFAB"
                android:layout_width="wrap_content"
                android:layout_height="wrap_content"
                android:layout_gravity="bottom|end"
                android:layout_margin="16dp"
                android:src="@android:drawable/ic_menu_edit"
                android:tint="@android:color/white" />

        </LinearLayout>

    </androidx.core.widget.NestedScrollView>
</androidx.coordinatorlayout.widget.CoordinatorLayout>
```

#### (b). detail_content.xml

```xml
<?xml version="1.0" encoding="utf-8"?>
<androidx.cardview.widget.CardView xmlns:android="http://schemas.android.com/apk/res/android"
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

                <androidx.cardview.widget.CardView
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

                </androidx.cardview.widget.CardView>

                <androidx.cardview.widget.CardView
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

                </androidx.cardview.widget.CardView>

                <TextView
                    android:layout_width="match_parent"
                    android:layout_height="wrap_content"
                    android:padding="5dp"
                    android:text="Residency"
                    android:textAlignment="center"
                    android:textAppearance="@style/TextAppearance.AppCompat.Large"
                    android:textColor="@color/niceGreenish"
                    android:textStyle="italic" />

                <androidx.cardview.widget.CardView
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

                </androidx.cardview.widget.CardView>

                <TextView
                    android:layout_width="match_parent"
                    android:layout_height="wrap_content"
                    android:padding="5dp"
                    android:text="Period"
                    android:textAlignment="center"
                    android:textAppearance="@style/TextAppearance.AppCompat.Large"
                    android:textColor="@color/niceGreenish"
                    android:textStyle="italic" />

                <androidx.cardview.widget.CardView
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
                            android:text="DOB" />

                    </LinearLayout>

                </androidx.cardview.widget.CardView>

                <androidx.cardview.widget.CardView
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

                </androidx.cardview.widget.CardView>

            </LinearLayout>
        </LinearLayout>
    </ScrollView>

</androidx.cardview.widget.CardView>
```

### Step 2. Create Detail Activity

#### (a). DetailActivity.java

```java
package info.camposha.roomlivedatacrudapp.view.ui;

import android.content.Context;
import android.os.Bundle;
import android.view.Menu;
import android.view.MenuItem;
import android.view.View;
import android.widget.TextView;

import androidx.appcompat.app.AppCompatActivity;
import androidx.core.app.NavUtils;

import com.google.android.material.appbar.CollapsingToolbarLayout;
import com.google.android.material.floatingactionbutton.FloatingActionButton;

import info.camposha.roomlivedatacrudapp.R;
import info.camposha.roomlivedatacrudapp.data.model.Scientist;
import info.camposha.roomlivedatacrudapp.common.Utils;
import io.github.inflationx.viewpump.ViewPumpContextWrapper;

public class DetailActivity extends AppCompatActivity implements View.OnClickListener {

    //Let's define our instance fields
    private TextView nameTV;
    private TextView descriptionTV;
    private TextView galaxyTV;
    private TextView starTV;
    private TextView dobTV;
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

![](https://camposha.info/wp-content/uploads/2019/07/listing.gif)

## Download

Download the code [here](https://camposha.info/student-project/scientific-gamechangers-app/)
