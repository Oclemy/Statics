# Android Firebase Full CRUD Course – INSERT SELECT UPDATE DELETE SEARCH

A course on CRUD operations in Firebase.


## Lesson 1: Creating and Adding Firebase App

In this lesson we will see how to create our android studio as well as firebase app. Then we will add the firebase app to android studio. We will see two techniques of creating and adding the firebase app to android studio. Then we will also see the libraries we will use in the app we are building.

Note that this lesson is part of an Android Firebase Realtime Database CRUD course we are currently covering. In the course we are creating a full Android app, powered by Firebase realtime database that supports:

1. Adding Data to Firebase Realtime database.
2. Retrieving Data from Firebase
3. Updating Existing firebase data.
4. Deleting data from firebase data.

### Objectives of this Lesson

After this lesson, you will be able to:

1. Create Android Studio Project and Add Firebase to it in two ways.
2. Use several cool libraries in your project.

This lesson as we've said is part of a multi-episode course series.

### Video Lesson

Watch video lesson [here](https://www.youtube.com/watch?v=5NkEcY8xETQ)

### Step 1: Create Android Studio Project

1. Start your android studio.
2. Invoke the New project dialog.
3. Type your project name and choose its location.
4. Check boxes that ask us if our app supports androidx and instant app features.

You should have a brand new project in your android studio.

### Step 2: Add Firebase To your android studio

There are two ways:

1. Using Android studio firebase assistant.
2. Directly Creating firebase app in firebase console then downloading google-services.json and adding to app folder.

PLEASE WATCH THE VIDEO IF YOU ARE NOT SURE HOW TO DO ANY OF THE ABOVE.

### Step 3: Add Gradle dependencies

Here are our gradle dependencies:

```groovy
dependencies {
    implementation fileTree(dir: 'libs', include: ['*.jar'])
    testImplementation 'junit:junit:4.12'
    implementation 'androidx.appcompat:appcompat:1.0.2'
    implementation 'androidx.constraintlayout:constraintlayout:1.1.3'

    implementation 'androidx.recyclerview:recyclerview:1.0.0'
    implementation 'com.google.android.material:material:1.0.0'
    implementation 'androidx.cardview:cardview:1.0.0'

    implementation 'com.google.firebase:firebase-database:18.0.0'

    implementation 'com.squareup.picasso:picasso:2.71828'
    implementation 'com.github.ivbaranov:materiallettericon:0.2.3'
    implementation "android.helper:datetimepickeredittext:1.0.0"
    implementation 'io.github.inflationx:calligraphy3:3.1.0'
    implementation 'io.github.inflationx:viewpump:1.0.0'
    implementation 'com.yarolegovich:lovely-dialog:1.1.0'
}
```

Here are some of the dependencies we've added:

| No. | Name | Role |
| --- | --- | --- |
| 1. | AppCompat | Our main androidx appcompat library which will give us access to appcompatactivity as well as other classes. |
| 2. | RecyclerView | Androidx recyclerview to give us the adapterview we will use to render our Firebase data. |
| 3. | CardView | To represent a single recyclerview row or item.The recyclerview will thus comprise several cardviews. Moreover we use cardviews in our dashboard screen, in our detail activity and in our crud activity. |
| 4. | Firebase Database | Well our Firebase realtime database. |
| 5. | MaterialLetterIcon | To show name initials icons in our recyclerview rather than images. |
| 6. | DateTimePickerEditText | We use it to pick dates that will be saved in Firebase database. |
| 7. | Calligraphy and ViewPump | To allow us load custom fonts for our app. |
| 8. | LoveLyDialog | To allow us use lovely standard as well as choice dialogs. |

### Full Code

Here is the full code for this lesson:

#### (a). build.gradle (app)

The app level build.gradle:

```groovy
apply plugin: 'com.android.application'

android {
    compileSdkVersion 28
    defaultConfig {
        applicationId "info.camposha.firebasedatabasecrud"
        minSdkVersion 15
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
    testImplementation 'junit:junit:4.12'
    implementation 'androidx.appcompat:appcompat:1.0.2'
    implementation 'androidx.constraintlayout:constraintlayout:1.1.3'

    implementation 'androidx.recyclerview:recyclerview:1.0.0'
    implementation 'com.google.android.material:material:1.0.0'
    implementation 'androidx.cardview:cardview:1.0.0'

    implementation 'com.google.firebase:firebase-database:18.0.0'

    implementation 'com.squareup.picasso:picasso:2.71828'
    implementation 'com.github.ivbaranov:materiallettericon:0.2.3'
    implementation "android.helper:datetimepickeredittext:1.0.0"
    implementation 'io.github.inflationx:calligraphy3:3.1.0'
    implementation 'io.github.inflationx:viewpump:1.0.0'
    implementation 'com.yarolegovich:lovely-dialog:1.1.0'
}

apply plugin: 'com.google.gms.google-services'
```

#### (a). build.gradle (project)

The project level build.gradle:

```groovy
// Top-level build file where you can add configuration options common to all sub-projects/modules.

buildscript {
    repositories {
        google()
        jcenter()

    }
    dependencies {
        classpath 'com.android.tools.build:gradle:3.4.0'
        classpath 'com.google.gms:google-services:3.2.0'

        // NOTE: Do not place your application dependencies here; they belong
        // in the individual module build.gradle files
    }
}

allprojects {
    repositories {
        google()
        jcenter()

    }
}

task clean(type: Delete) {
    delete rootProject.buildDir
}
```

Above you can see we have added our google-services classpath. Please don't forget it. You may use later versions of it.

## Lesson 2: Model Class

A Model class is a data object or business object class. It defines the entity we want to work with as the core of what our application is about. For example in this case we are creating Scientists CRUD App. This means we will adding,updating, reading and deleting Scientist objects to and from our Firebase Realtime Database. Thus our model class will `Scientist` class.

NOTE/= This class is part of a multi-episode course on Firebase CRUD. In the course we are developing a full android application with full CRUD capability.

That class will define properties for a single Scientist. And we obtain that single scientist by instantiating that class. The only requirement of our model class for it to be readable by Firebase is that it should have atleats an empty constructor. By readable by Firebase we mean that we will pass that class's instance to Firebase's `setValue()` method to save our data.

For example consider the below example:

```java
mDatabaseRef.child("Scientists").push().setValue(scientist)
```

In the above code we are passing a whole Scientist object to the `setValue()` method to be persisted in Firebase . The class defining that `scientist` must have an empty constructor.

### Video Lesson

Watch video lesson [here](https://www.youtube.com/watch?v=2K9cYMq6KAc)

### Step 1: Create Scientist Class

```java
import com.google.firebase.database.Exclude;

import java.io.Serializable;

public class Scientist
```

Then make it implement the `java.io.Serializable` interface:

```java
public class Scientist  implements Serializable {
```

That interface is called a marker interface, thus we don't need to implement any method. Serializable interface will allow the instance of our Scientist class to be serializable and deseriable. We will need to do serialize it so that we can pass a whole object across activities. Then in the target activity we can deserialize it and render its fields.

### Step 2: Define instance fields

Let's now define our instance fields. These fields represent the properties of our Scientist:

```java
    private String mId;
    private String name;
    private String description;
    private String galaxy;
    private String star;
    private String dob;
    private String dod;
    private String key;
```

### Step 3: Create An Empty Constructor

```java
    public Scientist() {
        //empty constructor needed
    }
```

As we had said earlier , you need to provide an empty construcor to our model class. If you needed to make injections into your class via the constructor then you can create a seperate constructor to do that. See for example how we've created one:

```java
    public Scientist(String name,String description,String galaxy,String star, String dob,
                String dod ) {
        if (name.trim().equals("")) {
            name = "Scientist NoName";
        }
        this.name = name;
        this.description = description;
        this.galaxy = galaxy;
        this.star = star;
        this.dob = dob;
        this.dod = dod;
    }
```

### Step 4: Generate Accessor methods

We now come to generate our accessor methods. These are simply getters and setters. However there are two special ones we will talk about in a short while:

```java
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
    public String getGalaxy() {
        return galaxy;
    }
    public void setGalaxy(String galaxy) {
        this.galaxy = galaxy;
    }

    public String getStar() {
        return star;
    }

    public void setStar(String star) {
        this.star = star;
    }

    public String getDob() {
        return dob;
    }

    public void setDob(String dob) {
        this.dob = dob;
    }

    public String getDod() {
        return dod;
    }

    public void setDod(String dod) {
        this.dod = dod;
    }
```

Well there is nothing special about the above accessor methods. Now add the below two:

```java
    @Exclude
    public String getKey() {
        return key;
    }
    @Exclude
    public void setKey(String key) {
        this.key = key;
    }
```

The special thing about them is the `@Exclude` annotation. This annotation is provided to us by the `com.google.firebase.database` annotation we had included in our imports. It is telling Firebase to ignore generating the `key` node while persisting our data. We have to do this because Firebase will be generating that key automatically. In fact we'll simply use the two methods to get and set that key locally but we won't be persisting it.

### FULL CODE

Here is the full code:

```java
package info.camposha.firebasedatabasecrud.Data;

import com.google.firebase.database.Exclude;

import java.io.Serializable;

public class Scientist  implements Serializable {

    private String mId;
    private String name;
    private String description;
    private String galaxy;
    private String star;
    private String dob;
    private String dod;
    private String key;

    public Scientist() {
        //empty constructor needed
    }
    public Scientist(String name,String description,String galaxy,String star, String dob,
                String dod ) {
        if (name.trim().equals("")) {
            name = "Scientist NoName";
        }
        this.name = name;
        this.description = description;
        this.galaxy = galaxy;
        this.star = star;
        this.dob = dob;
        this.dod = dod;
    }

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
    public String getGalaxy() {
        return galaxy;
    }
    public void setGalaxy(String galaxy) {
        this.galaxy = galaxy;
    }

    public String getStar() {
        return star;
    }

    public void setStar(String star) {
        this.star = star;
    }

    public String getDob() {
        return dob;
    }

    public void setDob(String dob) {
        this.dob = dob;
    }

    public String getDod() {
        return dod;
    }

    public void setDod(String dod) {
        this.dod = dod;
    }

    @Override
    public String toString() {
        return getName();
    }
    @Exclude
    public String getKey() {
        return key;
    }
    @Exclude
    public void setKey(String key) {
        this.key = key;
    }
}
//end
```

### Conclusion

We have created our model class. This simple class is at the center of our application because it defines the central entity we are working with. It is this class's instance that will be persisted, read and deleted. We've talked about constructors for the class, the fields as well as public accessor methods.

Now move over to the next class.

## Lesson 3 : Utility Methods and App Class

In this lesson we are creating two important methods. The first method is our app class. The second is the Utils class. This lesson is part of the android firebase realtime database crud full app development course we are currently covering. In the course we see how to create a full project from scratch based on Firebase Realtime database and supporting all CRUD operations.

### Objectives of this Lesson

Here are the objectives of this lesson:

1. Create utility methods that will be needed throughout the project.
2. Load a custom font into our android app across all activities.

### (a). App.java

The role of this class is simple: Load custom font into our app. We will use a library we had earlier on added in our dependecies: Calligraphy.

#### Step 1: Add Imports:

```java
import android.app.Application;

import io.github.inflationx.calligraphy3.CalligraphyConfig;
import io.github.inflationx.calligraphy3.CalligraphyInterceptor;
import io.github.inflationx.viewpump.ViewPump;
```

You can see among our imports include the [Application](https://camposha.info/android/application) class. Well this is an android component and from it we will derive.

#### Step 2: Create Class

Our class will derive from `Application` class:

```java
public class App extends Application {
```

#### Step 3: Initialize Calligraphy

We now need to initialize our Calligraphy. The best place to that is in the `onCreate()` of our application class:

```java
    @Override
    public void onCreate() {
        super.onCreate();
        ViewPump.init(ViewPump.builder()
                .addInterceptor(new CalligraphyInterceptor(
                        new CalligraphyConfig.Builder()
                                .setDefaultFontPath("fonts/Verdana.ttf")
                                .setFontAttrId(R.attr.fontPath)
                                .build()))
                .build());
    }
```

#### FULL CODE:

Here is the full code of App.java

```java
package info.camposha.firebasedatabasecrud;

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
                                .setDefaultFontPath("fonts/Verdana.ttf")
                                .setFontAttrId(R.attr.fontPath)
                                .build()))
                .build());
    }
}
//end
```

### (b). Utils.java

This class as we said is to contain our utility methods. It is best practice ton confine methods usable across the whole app in one simple class from which they can be called. Such methods are normally made static so that we don't need to every now and then instantiate them to invoke our methods.

#### Step 1: Create the Class

```java
public class Utils {
```

#### Step 2: Show Toast message

This method will allow us show toast messages throughout various activities.

```java
    public static void show(Context c,String message){
        Toast.makeText(c, message, Toast.LENGTH_SHORT).show();
    }
```

#### Step 3: Validate Edittexts

Suppose we want a simple method that can validate us any number of edittexts. We just need to pass that method a param of edittexts:

```java
    public static boolean validate(EditText... editTexts){
        EditText nameTxt = editTexts[0];
        EditText descriptionTxt = editTexts[1];
        EditText galaxyTxt = editTexts[2];

        if(nameTxt.getText() == null || nameTxt.getText().toString().isEmpty()){
            nameTxt.setError("Name is Required Please!");
            return false;
        }
        if(descriptionTxt.getText() == null || descriptionTxt.getText().toString().isEmpty()){
            descriptionTxt.setError("Description is Required Please!");
            return false;
        }
        if(galaxyTxt.getText() == null || galaxyTxt.getText().toString().isEmpty()){
            galaxyTxt.setError("Galaxy is Required Please!");
            return false;
        }
        return true;

    }
```

In our case three edittexts must not be empty for the validation to pass.

#### Step 4: Opening a new activity

```java
     public static void openActivity(Context c,Class clazz){
        Intent intent = new Intent(c, clazz);
        c.startActivity(intent);
    }
```

#### Step 5: Showing InfoDialog

```java
    public static void showInfoDialog(final AppCompatActivity activity, String title,
                                      String message) {
        new LovelyStandardDialog(activity, LovelyStandardDialog.ButtonLayout.HORIZONTAL)
                .setTopColorRes(R.color.indigo)
                .setButtonsColorRes(R.color.darkDeepOrange)
                .setIcon(R.drawable.m_info)
                .setTitle(title)
                .setMessage(message)
                .setPositiveButton("Relax", v -> {})
                .setNeutralButton("Go Home", v -> openActivity(activity, DashboardActivity.class))
                .setNegativeButton("Go Back", v -> activity.finish())
                .show();
    }
```

#### Step 6: Showing SingleChoice Dialog

```java
    public static void selectStar(Context c,final EditText starTxt){
        String[] stars ={"Rigel","Aldebaran","Arcturus","Betelgeuse","Antares","Deneb",
                "Wezen","VY Canis Majoris","Sirius","Alpha Pegasi","Vega","Saiph","Polaris",
                "Canopus","KY Cygni","VV Cephei","Uy Scuti","Bellatrix","Naos","Pollux",
                "Achernar","Other"};
        ArrayAdapter<String> adapter = new ArrayAdapter<>(c,
                android.R.layout.simple_list_item_1,
                stars);
        new LovelyChoiceDialog(c)
                .setTopColorRes(R.color.darkGreen)
                .setTitle("Stars Picker")
                .setTitleGravity(Gravity.CENTER_HORIZONTAL)
                .setIcon(R.drawable.m_star)
                .setMessage("Select the Star where the Scientist was born.")
                .setMessageGravity(Gravity.CENTER_HORIZONTAL)
                .setItems(adapter, (position, item) -> starTxt.setText(item))
                .show();
    }
```

#### Step 7: Converting String to Date

```java
    public static Date giveMeDate(String stringDate){
        try {
            SimpleDateFormat sdf=new SimpleDateFormat(DATE_FORMAT);
            return sdf.parse(stringDate);
        }catch (ParseException e){
            e.printStackTrace();
            return null;
        }
    }
```

#### Step 8: Sending Serialized Object to another activity

Well first make sure that object's class is implementing the Serializable interface.

Then:

```java
    public static void sendScientistToActivity(Context c, Scientist scientist,
                                               Class clazz){
        Intent i=new Intent(c,clazz);
        i.putExtra("SCIENTIST_KEY",scientist);
        c.startActivity(i);
    }
```

Take note of the key we have passed we will need it in the next method when receiving that object.

#### Step 9: Receiving a Serialized Object then deserializing it.

Well the method above had serialized our object. Now this method will deserialize it.

```java
    public  static Scientist receiveScientist(Intent intent, Context c){
        try {
            return (Scientist) intent.getSerializableExtra("SCIENTIST_KEY");
        }catch (Exception e){
            e.printStackTrace();
            show(c,"RECEIVING-SCIENTIST ERROR: "+e.getMessage());
        }
        return null;
    }
```

You can see we've used the `getSerializableExtra()`, passing in the key we had supplied earlier on.

#### Step 10: Showing and Hiding a ProgressBar

Well you simply use the `setVisibility()` method, passing in the appropriate constants.

```java
    public static void showProgressBar(ProgressBar pb){
        pb.setVisibility(View.VISIBLE);
    }
    public static void hideProgressBar(ProgressBar pb){
        pb.setVisibility(View.GONE);
    }
```

#### Step 11: Getting a Firebase Database reference

```java
    public static DatabaseReference getDatabaseRefence() {
        return FirebaseDatabase.getInstance().getReference();
    }
```

#### FULL CODE

Here is the full code for Utils.java:

```java
package info.camposha.firebasedatabasecrud.Helpers;

import android.content.Context;
import android.content.Intent;
import android.view.Gravity;
import android.view.View;
import android.widget.ArrayAdapter;
import android.widget.EditText;
import android.widget.ProgressBar;
import android.widget.Toast;

import androidx.appcompat.app.AppCompatActivity;

import com.google.firebase.database.DatabaseReference;
import com.google.firebase.database.FirebaseDatabase;
import com.yarolegovich.lovelydialog.LovelyChoiceDialog;
import com.yarolegovich.lovelydialog.LovelyStandardDialog;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

import info.camposha.firebasedatabasecrud.Data.Scientist;
import info.camposha.firebasedatabasecrud.R;
import info.camposha.firebasedatabasecrud.Views.DashboardActivity;

public class Utils {

    public static final String DATE_FORMAT = "yyyy-MM-dd";
    public static List<Scientist> DataCache =new ArrayList<>();

    public static String searchString = "";

    public static void show(Context c,String message){
        Toast.makeText(c, message, Toast.LENGTH_SHORT).show();
    }
    public static boolean validate(EditText... editTexts){
        EditText nameTxt = editTexts[0];
        EditText descriptionTxt = editTexts[1];
        EditText galaxyTxt = editTexts[2];

        if(nameTxt.getText() == null || nameTxt.getText().toString().isEmpty()){
            nameTxt.setError("Name is Required Please!");
            return false;
        }
        if(descriptionTxt.getText() == null || descriptionTxt.getText().toString().isEmpty()){
            descriptionTxt.setError("Description is Required Please!");
            return false;
        }
        if(galaxyTxt.getText() == null || galaxyTxt.getText().toString().isEmpty()){
            galaxyTxt.setError("Galaxy is Required Please!");
            return false;
        }
        return true;

    }
    public static void openActivity(Context c,Class clazz){
        Intent intent = new Intent(c, clazz);
        c.startActivity(intent);
    }
    /**
     * This method will allow us show an Info dialog anywhere in our app.
     */
    public static void showInfoDialog(final AppCompatActivity activity, String title,
                                      String message) {
        new LovelyStandardDialog(activity, LovelyStandardDialog.ButtonLayout.HORIZONTAL)
                .setTopColorRes(R.color.indigo)
                .setButtonsColorRes(R.color.darkDeepOrange)
                .setIcon(R.drawable.m_info)
                .setTitle(title)
                .setMessage(message)
                .setPositiveButton("Relax", v -> {})
                .setNeutralButton("Go Home", v -> openActivity(activity, DashboardActivity.class))
                .setNegativeButton("Go Back", v -> activity.finish())
                .show();
    }

    /**
     * This method will allow us show a single select dialog where we can select and return a
     * star to an edittext.
     */
    public static void selectStar(Context c,final EditText starTxt){
        String[] stars ={"Rigel","Aldebaran","Arcturus","Betelgeuse","Antares","Deneb",
                "Wezen","VY Canis Majoris","Sirius","Alpha Pegasi","Vega","Saiph","Polaris",
                "Canopus","KY Cygni","VV Cephei","Uy Scuti","Bellatrix","Naos","Pollux",
                "Achernar","Other"};
        ArrayAdapter<String> adapter = new ArrayAdapter<>(c,
                android.R.layout.simple_list_item_1,
                stars);
        new LovelyChoiceDialog(c)
                .setTopColorRes(R.color.darkGreen)
                .setTitle("Stars Picker")
                .setTitleGravity(Gravity.CENTER_HORIZONTAL)
                .setIcon(R.drawable.m_star)
                .setMessage("Select the Star where the Scientist was born.")
                .setMessageGravity(Gravity.CENTER_HORIZONTAL)
                .setItems(adapter, (position, item) -> starTxt.setText(item))
                .show();
    }

    /**
     * This method will allow us convert a string into a java.util.Date object and
     *  return it.
     */
    public static Date giveMeDate(String stringDate){
        try {
            SimpleDateFormat sdf=new SimpleDateFormat(DATE_FORMAT);
            return sdf.parse(stringDate);
        }catch (ParseException e){
            e.printStackTrace();
            return null;
        }
    }

    /**
     * This method will allow us send a serialized scientist objec  to a specified
     *  activity
     */
    public static void sendScientistToActivity(Context c, Scientist scientist,
                                               Class clazz){
        Intent i=new Intent(c,clazz);
        i.putExtra("SCIENTIST_KEY",scientist);
        c.startActivity(i);
    }

    /**
     * This method will allow us receive a serialized scientist, deserialize it and return it,.
     */
    public  static Scientist receiveScientist(Intent intent, Context c){
        try {
            return (Scientist) intent.getSerializableExtra("SCIENTIST_KEY");
        }catch (Exception e){
            e.printStackTrace();
            show(c,"RECEIVING-SCIENTIST ERROR: "+e.getMessage());
        }
        return null;
    }

    public static void showProgressBar(ProgressBar pb){
        pb.setVisibility(View.VISIBLE);
    }
    public static void hideProgressBar(ProgressBar pb){
        pb.setVisibility(View.GONE);
    }

    public static DatabaseReference getDatabaseRefence() {
        return FirebaseDatabase.getInstance().getReference();
    }

}
//end
```

Now move over to the next lesson.

## Lesson 4: ClientSide Search/Filter of Firebase Data

In this lesson we will learn how to filter Firebase data on the clientside. Clientside filtering is an in-memory search filter. This means we hold our data in a data structure like an arraylist and then filter from there.

NOTE/= This class is part of multi-series course we are doing right here at Camposha about FirebaseCRUD. See the course contents on the sidebar.

This is a very fast search because we don't need to make any connections to the database or online server. However this type of search is only suitable for small datasets. You don't want to be holding tens or thousands of rows of data statically throughout the lifetime of your app.

In that type of scenario you would need to perform a server side search.

### How our search will work.

1. We download Firebase Data once the first time the user visits our Listing page.
2. We hold the data statically. Rather than holding it as an instance field,we hold it as a class member. Thus the list is not garbage collected.
3. We search against that list.

### Components Required For our Search

Here are the components required to search:

| No. | Widget | Description |
| --- | --- | --- |
| 1\. SearchView | It makes sense since we need a widget for entering our search terms.SearchView is required since it allows us to hook up to various events like textChanged event. |
| 2. | [RecyclerView](https://camposha.info/android/recyclerview) | This is the widget that displays or lists all our data. It also displays the search results. |

### Other Required Classes

Because this is part of a full project, here are the classes directly needed for the code here to work

1. MyAdapter - Our adapter. Will be responsible for binding search results to the recyclerview. Will also highlight our search results.
2. ScientistsActivity - Responsible of referencing our recyclerview, setting its adapter, listening to searchview events and reacting to invoke the search.

Video Tutorial

[Here](https://youtu.be/KGuBq87zoWw) is the video tutorial:

### Steps 1 - Create a FilterHelper Class

Create a FilterHelper class that extends the `android.widget.Filter`:

```java
import android.widget.Filter;

import java.util.ArrayList;
import java.util.List;

import info.camposha.firebasedatabasecrud.Data.MyAdapter;
import info.camposha.firebasedatabasecrud.Data.Scientist;

public class FilterHelper extends Filter {
```

As you can see we have provided the necessary imports including our MyAdapter as well as our model class. The class is extending the `Filter` class, which is abstract. Thus we will be required to override two classes we will talk about in a short while.

### Step 2 : Define our Class members

```java
    static List<Scientist> currentList;
    static MyAdapter adapter;
```

We then create two class members:

1. currentList - The current list that should be filtered.
2. adapter - The adapter instance which will be used for two purposes. First to pass our search results back to the MyAdapter class and secondly to the MyAdapter classes of changes in our dataset.

### Step 3 : Perform our Actual Filtering

We now come and override the first of the two methods we promised. That method is the `performFiltering()` method. It will take one parameter:

1. constraint - A CharSequence representing our search term or constraint.

So overrie the method:

```java
    @Override
    protected FilterResults performFiltering(CharSequence constraint) {
```

Then instantiate the `FilterResults` class:

```java
        FilterResults filterResults=new FilterResults();
```

That class will hold our filter results.

Then ensure our Constraint is not null:

```java
        if(constraint != null && constraint.length()>0)
        {
```

Turn that constraint into an uppercase(or lowercase) to ensure consistency:

```java
            constraint=constraint.toString().toUpperCase();
```

Create an arraylist that will hold our found filters, or rather our search results:

```java
            ArrayList<Scientist> foundFilters=new ArrayList<>();
```

Then filter:

```java
            String galaxy,name,star,description;

            //ITERATE CURRENT LIST
            for (int i=0;i<currentList.size();i++)
            {
                galaxy= currentList.get(i).getGalaxy();
                name= currentList.get(i).getName();

                //SEARCH
                if(galaxy.toUpperCase().contains(constraint)){
                    foundFilters.add(currentList.get(i));
                }else if(name.toUpperCase().contains(constraint)){
                    foundFilters.add(currentList.get(i));
                }
            }
```

Now set our results to our filter list:

```java
//SET RESULTS TO FILTER LIST
            filterResults.count=foundFilters.size();
            filterResults.values=foundFilters;
```

Otherwise if no search hit was made:

```java
}else
        {
            //NO ITEM FOUND.LIST REMAINS INTACT
            filterResults.count=currentList.size();
            filterResults.values=currentList;
        }
```

Finally we return our results:

```java
        //RETURN RESULTS
        return filterResults;
    }
```

### Step : Publishing Search Results

The last step is to publish search results back to the adapter. It is the adapter responsibility to bind data to recyclerview thus we have to pass it our search results for them to be rendered:

```java
    @Override
    protected void publishResults(CharSequence charSequence, FilterResults filterResults) {

        adapter.scientists= (ArrayList<Scientist>) filterResults.values;
        adapter.notifyDataSetChanged();
    }
}
//end
```

### Full Code

#### /Helpers/FilterHelper.java

```java
package info.camposha.firebasedatabasecrud.Helpers;

import android.widget.Filter;

import java.util.ArrayList;
import java.util.List;

import info.camposha.firebasedatabasecrud.Data.MyAdapter;
import info.camposha.firebasedatabasecrud.Data.Scientist;

public class FilterHelper extends Filter {
    static List<Scientist> currentList;
    static MyAdapter adapter;
    public static FilterHelper newInstance(List<Scientist> currentList, MyAdapter adapter) {
        FilterHelper.adapter=adapter;
        FilterHelper.currentList=currentList;
        return new FilterHelper();
    }
    /*
    - Perform actual filtering.
     */
    @Override
    protected FilterResults performFiltering(CharSequence constraint) {
        FilterResults filterResults=new FilterResults();

        if(constraint != null && constraint.length()>0)
        {
            //CHANGE TO UPPER
            constraint=constraint.toString().toUpperCase();

            //HOLD FILTERS WE FIND
            ArrayList<Scientist> foundFilters=new ArrayList<>();

            String galaxy,name,star,description;

            //ITERATE CURRENT LIST
            for (int i=0;i<currentList.size();i++)
            {
                galaxy= currentList.get(i).getGalaxy();
                name= currentList.get(i).getName();

                //SEARCH
                if(galaxy.toUpperCase().contains(constraint)){
                    foundFilters.add(currentList.get(i));
                }else if(name.toUpperCase().contains(constraint)){
                    foundFilters.add(currentList.get(i));
                }
            }

            //SET RESULTS TO FILTER LIST
            filterResults.count=foundFilters.size();
            filterResults.values=foundFilters;
        }else
        {
            //NO ITEM FOUND.LIST REMAINS INTACT
            filterResults.count=currentList.size();
            filterResults.values=currentList;
        }

        //RETURN RESULTS
        return filterResults;
    }

    @Override
    protected void publishResults(CharSequence charSequence, FilterResults filterResults) {

        adapter.scientists= (ArrayList<Scientist>) filterResults.values;
        adapter.notifyDataSetChanged();
    }
}
//end
```

The lesson is part of a full project course. Please follow the course to see its usage, specifically our MyAdapter and ScientistsActivity classes.

### Conclusion

We have seen how to perform a search and filtering agains Firebase data. And we've said it is a client side search. This means we obtain all our data and hold statically and search against it. This means our search is fast but suitable for small datasets.

Now move over to the next lesson in this series.

## Lesson 5 : RecyclerView Adapter

Move to the next page to proceed with this course.

## Our RecyclerView Adapter

It is time to come create our adapter class. This class is important since it allows us inflate custom views and bind data to them once it is applied to our [recyclerview](https://camposha.info/android/recyclerview).

NOTE/= This lesson is part of a multi-episode on Firebase CRUD Full App Development Course. In the free course we are creating a full application with Firebase Realtime database backend.

This adapter will be used by the following classes:

1. FilterHelper - Class that allows us perform search and filtering of our firebase data.
2. ScientistActivity - The class where our recyclerview will be referenced and our adapter set.

### What our Adapter will do

This adapter class will have the following responsibilities.

1. Inflate our custom row model into view objects that recyclerview will recycle.
2. Receive a list of scientist objects and bind them to the inflated views.
3. Define a view holder class that will hold the widgets that have been inflated.
4. Return a `Filter` instance to allow us search our data.
5. Highlight our search results.

### Video Lesson

Watch video lesson [here](https://youtu.be/KGuBq87zoWw).

### Step 1: Create MyAdapter class

We start by adding our imports:

```java
import android.content.Context;
import android.content.res.Resources;
import android.graphics.Color;
import android.text.Spannable;
import android.text.style.ForegroundColorSpan;
import android.util.TypedValue;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.Filter;
import android.widget.Filterable;
import android.widget.TextView;

import androidx.annotation.NonNull;
import androidx.recyclerview.widget.RecyclerView;

import com.github.ivbaranov.mli.MaterialLetterIcon;

import java.util.ArrayList;
import java.util.List;
import java.util.Locale;
import java.util.Random;

import info.camposha.firebasedatabasecrud.Helpers.FilterHelper;
import info.camposha.firebasedatabasecrud.Helpers.Utils;
import info.camposha.firebasedatabasecrud.R;
import info.camposha.firebasedatabasecrud.Views.DetailActivity;

import static info.camposha.firebasedatabasecrud.Helpers.Utils.searchString;
```

Then create our class:

```java
public class MyAdapter extends RecyclerView.Adapter<MyAdapter.ViewHolder>
implements Filterable {
```

You can see the class is extending the `RecyclerView.Adapter`. The generic parameter is a `MyAdapter.ViewHolder`, meaning a `ViewHolder` class defined in this same `MyAdapter` class.

Then we have made it implement the `Filterable` instance. This will help with our filtering our recyclerview data.

### Step 2: Define Instance Fields

```java
    private final Context c;
    private final int mBackground;
    private final int[] mMaterialColors;
    public List<Scientist> scientists;
    private List<Scientist> filterList;
    private FilterHelper filterHelper;
```

You can see we are defining objects and data types that will allow us hold different values. The Context object will allow us hold the received Context object. The background will represent our material letter icon background while the `mMaterialColors` is an array that will hold for us the different material colors we will load from color resource file.

The scientists list will hold the list of all scientists received via the constructor. The `filterList` will hold the filter results that need to be displayed in our recyclerview.

### Step 3: Define our ItemClickListener

It's just an interface containing an abstract method that will be our event handler:

```java
    interface ItemClickListener {
        void onItemClick(int pos);
    }
```

### Step 4: Create our ViewHolder class.

We are creating it as an inner class, meaning it's contained in our MyAdapter class:

```java
    public class ViewHolder extends RecyclerView.ViewHolder implements
     View.OnClickListener {
```

You can see it's deriving from RecyclerView.ViewHolder class and implementing the `View.OnClickListener`. Thus there are some other things that we will need to do later on.

However first let's define the class's instance fields:

```java
        private final TextView nameTxt;
        private final TextView mDescriptionTxt;
        private final TextView galaxyTxt;
        private final MaterialLetterIcon mIcon;
        private ItemClickListener itemClickListener;
```

The first of those things we promised is supply a constructor that:

1. Receives a View object
2. Passes that received view to the super class

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

The second is to implement the `onClick` method:

```java
        @Override
        public void onClick(View view) {
            this.itemClickListener.onItemClick(this.getLayoutPosition());
        }
```

Then finish up that ViewHolder class:

```java
        void setItemClickListener(ItemClickListener itemClickListener) {
            this.itemClickListener = itemClickListener;
        }
    }
```

### Step 5: Create our MyAdapter Constructor

```java
    public MyAdapter(Context mContext, List<Scientist> scientists) {
        this.c = mContext;
        this.scientists = scientists;
        this.filterList = scientists;
        TypedValue mTypedValue = new TypedValue();
        c.getTheme().resolveAttribute(R.attr.selectableItemBackground,
         mTypedValue, true);
        mMaterialColors = c.getResources().getIntArray(R.array.colors);
        mBackground = mTypedValue.resourceId;
    }
```

### Step 6: Override our onCreateViewHolder

This is where we will inflate our custom row model:

```java
    @NonNull
    @Override
    public ViewHolder onCreateViewHolder(@NonNull ViewGroup parent, int viewType) {
        View view = LayoutInflater.from(c).inflate(R.layout.model, parent, false);
        view.setBackgroundResource(mBackground);
        return new ViewHolder(view);
    }
```

We've used the LayoutInflater class to inflate the model layout into a view object. We've then set the the background color of that view object using the `setBackgroundResource()` method, passing in our background integer. We've then returned that ViewHolder's instance, passing in the inflated view object to the constructor.

### Step 7: Override the onBindViewHolder

Add the following code:

```java
    @Override
    public void onBindViewHolder(@NonNull ViewHolder holder, int position) {
```

That onBindViewHolder is receiving two objects, a ViewHolder instance as well as an integer representing the position of the item that needs to be bound.

First we need to use that position to obtain the current scienist:

```java
        //get current scientist
        final Scientist s = scientists.get(position);
```

Then bind data to our widgets:

```java
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
```

You can see above that we obtaining the properties of our scientist object and binding them to their respective textviews. As for the material letter icon we are setting it a random background color. The letter icons will be obtained from the name.

Now to set an alternating row background colors to our recyclerview all we need is the following code:

```java
        if(position % 2 == 0){
            holder.itemView.setBackgroundColor(Color.parseColor("#efefef"));
        }
```

We are checking if the position is divisible by 2 using the modulus operator. If so we set a light-greyish background color.

### Step 8: Highlighting Our Search Results

We said ouf Firebase App will be supporting search filter. Thus we first will be highlighting our search results.

In your onBindViewHolder add the followng code:

```java
        //get name and galaxy
        String name = s.getName().toLowerCase(Locale.getDefault());
        String galaxy = s.getGalaxy().toLowerCase(Locale.getDefault());
```

We've simply obtained our name and galaxy properties from our Scientist object and converted them to lowercase characters. Those are the two fields against which we will be searching.

Then add the following code:

```java
        //highlight name text while searching
        if (name.contains(searchString) && !(searchString.isEmpty())) {
            int startPos = name.indexOf(searchString);
            int endPos = startPos + searchString.length();

            Spannable spanString = Spannable.Factory.getInstance().
                    newSpannable(holder.nameTxt.getText());
            spanString.setSpan(new ForegroundColorSpan(Color.RED), startPos, endPos,
                    Spannable.SPAN_EXCLUSIVE_EXCLUSIVE);

            holder.nameTxt.setText(spanString);
        } else {
            //Utils.show(ctx, "Search string empty");
        }
```

We are checking if our name contains our search string. If so we are using Spannable class to set a foreground color.

Then we do the same thing to our Galaxy with the following code:

```java
        //highligh galaxy text while searching
        if (galaxy.contains(searchString) && !(searchString.isEmpty())) {

            int startPos = galaxy.indexOf(searchString);
            int endPos = startPos + searchString.length();

            Spannable spanString = Spannable.Factory.getInstance().
                    newSpannable(holder.galaxyTxt.getText());
            spanString.setSpan(new ForegroundColorSpan(Color.BLUE), startPos, endPos,
                    Spannable.SPAN_EXCLUSIVE_EXCLUSIVE);

            holder.galaxyTxt.setText(spanString);
        }
```

### Step 9: Listening to RecyclerView Click Events

Add the following code:

```java
        //open detailactivity when clicked
        holder.setItemClickListener(pos -> Utils.sendScientistToActivity(c, s,
         DetailActivity.class));
    }
```

The above code listens to click events for our recyclerview item and and invokes a method called `sendScientistToActivity()` from our `Utils` class. We are opening a detail activity, in the process passing along the clicked Scientist object. We've used lambda expression above which requires Java8 enabled.

Also, return the number of scientists that will be bound to the recyclerview:

```java
    @Override
    public int getItemCount() {
        return scientists.size();
    }
```

### Step 10: Return a Filter object

Add the following code to finish our adapter:

```java
    @Override
    public Filter getFilter() {
        if(filterHelper==null){
            filterHelper=FilterHelper.newInstance(filterList,this);
        }
        return filterHelper;
    }
}
//end
```

In the above code we are returning a Filter instance. Filter is an abstract class defined in the `android.widget` package that allows us perform filtering and publish results. The above method is being overriden since earlier on we had implemented the `Filterable` interface.

We are returning a `FilterHelper` instance since our FilterHelper class is inheriting from the `android.widget.Filter` class.

### FULL CODE

(a). /Data/MyAdapter.java Our MyAdapter class is contained in the Data package of our project. Here is the full code:

```java
package info.camposha.firebasedatabasecrud.Data;

import android.content.Context;
import android.content.res.Resources;
import android.graphics.Color;
import android.text.Spannable;
import android.text.style.ForegroundColorSpan;
import android.util.TypedValue;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.Filter;
import android.widget.Filterable;
import android.widget.TextView;

import androidx.annotation.NonNull;
import androidx.recyclerview.widget.RecyclerView;

import com.github.ivbaranov.mli.MaterialLetterIcon;

import java.util.ArrayList;
import java.util.List;
import java.util.Locale;
import java.util.Random;

import info.camposha.firebasedatabasecrud.Helpers.FilterHelper;
import info.camposha.firebasedatabasecrud.Helpers.Utils;
import info.camposha.firebasedatabasecrud.R;
import info.camposha.firebasedatabasecrud.Views.DetailActivity;

import static info.camposha.firebasedatabasecrud.Helpers.Utils.searchString;

public class MyAdapter extends RecyclerView.Adapter<MyAdapter.ViewHolder>
implements Filterable {

    private final Context c;
    private final int mBackground;
    private final int[] mMaterialColors;
    public List<Scientist> scientists;
    private List<Scientist> filterList;
    private FilterHelper filterHelper;

    interface ItemClickListener {
        void onItemClick(int pos);
    }

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
    public MyAdapter(Context mContext, List<Scientist> scientists) {
        this.c = mContext;
        this.scientists = scientists;
        this.filterList = scientists;
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

        if(position % 2 == 0){
            holder.itemView.setBackgroundColor(Color.parseColor("#efefef"));
        }

        //get name and galaxy
        String name = s.getName().toLowerCase(Locale.getDefault());
        String galaxy = s.getGalaxy().toLowerCase(Locale.getDefault());

        //highlight name text while searching
        if (name.contains(searchString) && !(searchString.isEmpty())) {
            int startPos = name.indexOf(searchString);
            int endPos = startPos + searchString.length();

            Spannable spanString = Spannable.Factory.getInstance().
                    newSpannable(holder.nameTxt.getText());
            spanString.setSpan(new ForegroundColorSpan(Color.RED), startPos, endPos,
                    Spannable.SPAN_EXCLUSIVE_EXCLUSIVE);

            holder.nameTxt.setText(spanString);
        } else {
            //Utils.show(ctx, "Search string empty");
        }

        //highligh galaxy text while searching
        if (galaxy.contains(searchString) && !(searchString.isEmpty())) {

            int startPos = galaxy.indexOf(searchString);
            int endPos = startPos + searchString.length();

            Spannable spanString = Spannable.Factory.getInstance().
                    newSpannable(holder.galaxyTxt.getText());
            spanString.setSpan(new ForegroundColorSpan(Color.BLUE), startPos, endPos,
                    Spannable.SPAN_EXCLUSIVE_EXCLUSIVE);

            holder.galaxyTxt.setText(spanString);
        }

        //open detailactivity when clicked
        holder.setItemClickListener(pos -> Utils.sendScientistToActivity(c, s,
         DetailActivity.class));
    }

    @Override
    public int getItemCount() {
        return scientists.size();
    }

    @Override
    public Filter getFilter() {
        if(filterHelper==null){
            filterHelper=FilterHelper.newInstance(filterList,this);
        }
        return filterHelper;
    }
}
//end
```

Now move over to the next lesson.

## Lesson 6 : CRUD Helper - ADD READ UPDATE DELETE

## ADD READ UPDATE DELETE

In this lesson we will write re-usable methods that will allow us to perform full CRUD operations against Firebase Realtime Database. Firebase Realtime Database we had said is a cloud-based realtime database by Google that allows us to store text content in json format.

The stored data can then be synced across different devices. To work with any database or storage service, you need to be able to perform CRUD. CRUD stands for:

1. C - Create or Insert.
2. R - Read or Select.
3. U - Update or Edit
4. D - Delete or Remove

These are the basic operations you need to work on any data. And normally these are the operations you need to create a full application like we are doing in this course.

NOTE/= This lesson is part of our Android Firebase Full CRUD course. We recommend you take the full course, it's free. However you can still follow and use the code here without taking the course.

### Why CRUD?

CRUD we have said stands for Create Read Update and Delete. We need to do these because they are what you need to create a full application. You will always need to persist your data in a database, read that data, update it when necessary and delete it when not required.

### Why Firebase Realtime Database

Firebase Realtime Database is Google's flagship cloud-based database. Firebase realtime database allows us save data in the cloud and sync the data across a variety of devices, no matter the platform.

It also offers offline capability, persisting data on the disk thus we don't haven't to connected at all times to view our data.

### What We are doing

In this lesson we will write instance methods that will allow us perform CRUD operations. The methods once defined can be called from anywhere within our app. The only requirement is that we pass the appropriate parameters.

Writing methods in a seperate class provides us with re-usability thus avoiding duplications throughout our app.

### Video Lesson(recommended)

[https://www.youtube.com/watch?v=Eavy17jZGdY](https://www.youtube.com/watch?v=Eavy17jZGdY)

### Step 1 : Create FirebaseCRUDHelper class

Start by adding imports in our `/Helpers/FirebaseCRUDHelper.java`:

```java
import android.os.Handler;
import android.util.Log;
import android.widget.ProgressBar;

import androidx.annotation.NonNull;
import androidx.appcompat.app.AppCompatActivity;
import androidx.recyclerview.widget.RecyclerView;

import com.google.android.gms.tasks.OnCompleteListener;
import com.google.android.gms.tasks.Task;
import com.google.firebase.database.DataSnapshot;
import com.google.firebase.database.DatabaseError;
import com.google.firebase.database.DatabaseReference;
import com.google.firebase.database.Query;
import com.google.firebase.database.ValueEventListener;

import info.camposha.firebasedatabasecrud.Data.MyAdapter;
import info.camposha.firebasedatabasecrud.Data.Scientist;
import info.camposha.firebasedatabasecrud.Views.ScientistsActivity;

import static info.camposha.firebasedatabasecrud.Helpers.Utils.DataCache;
```

Then define the class:

```java
public class FirebaseCRUDHelper {
```

### Step 2: How to add/insert into Firebase

Let's create a method that allows us to insert or add data to Firebase, let's call the method `insert()`:

```java
    public void insert(final AppCompatActivity a,
                          final DatabaseReference mDatabaseRef,
                          final ProgressBar pb, final Scientist scientist) {
```

You can see we are providing the following parameters:

| No. | Parameter | Role |
| --- | --- | --- |
| 1. | AppCompatActivity | We will use this to provide our context. Context is required when showing our info dialog and opening another [activity](https://camposha.info/android/activity). |
| 2. | DatabaseReference | This is the pointer to our Firebase Realtime Database.It points us to the json node representing our database. |
| 3. | ProgressBar | This will allow us to show user progress feedback as we post our data to Firebase. |
| 4. | Scientist | This is the data object we want to post to Firebase Database. |

The first step is to validate our data object:

```java
        if (scientist == null) {
            Utils.showInfoDialog(a,"VALIDATION FAILED","Scientist is null");
            return;
        }
```

As you can see if the scientist is null then we show an error dialog then exit.

Otherwise we start by showing our progressbar:

```java
                Utils.showProgressBar(pb);
```

Then:

```java
            mDatabaseRef.child("Scientists").push().setValue(scientist).
                addOnCompleteListener(new OnCompleteListener<Void>() {
                    @Override
                    public void onComplete(@NonNull Task<Void> task) {
                        Utils.hideProgressBar(pb);

                        if(task.isSuccessful()){
                            Utils.openActivity(a, ScientistsActivity.class);
                            Utils.show(a,"Congrats! INSERT SUCCESSFUL");
                        }else{
                            Utils.showInfoDialog(a,"UNSUCCESSFUL",task.getException().
                            getMessage());
                        }
                    }

                });
```

We have invoked the `child()` method of our FirebaseDatabase instance. In that method we have passed `Scientists`, think of this as the name of the json node that will store our scientists. Or think of it as our table name. Then we invoke the `push()` method which is responsible for pushing our data and returning a key. We have also invoked the`setValue()`. Thie is the method that sets the data that we want to push to Firebase Realtime database. We have passed a full object. The only requirement for that object to be processed by Firebase is to have an empty constructor. Firebase will generate fields based on the properties of the data object.

Obviously we need to follow the progress of the operation. Thus we add a completion listener event handler. This will tell us when the operation is complete so that we can react to our result. In this case we hide our progressbar. Then we check if the task was successful using the `isSuccessful()` method. if we were successful we open a listing activity where our data will be loaded. If we encountered a failure we will show a dialog with the exception message. That exception we get it from the `getException()` of our `Task` class. We show it's message by invoking the `getMessage()` method.

### Step 2: How to read/select/retrieve From Firebase

In the second step we see how to read or select data from Firebase Realtime database. So we define the method:

```java
    public void select(final AppCompatActivity a, DatabaseReference db,
                                         final ProgressBar pb,
                                         final RecyclerView rv,MyAdapter adapter) {
```

This time round we have two new parameters being passed into the method:

| No. | Parameter | Role |
| --- | --- | --- |
| 1. | [RecyclerView](https://camposha.info/android/recyclerview) | Our adapterview. Will be used to render our Firebase data. |
| 2. | MyAdapter | Our recyclerview adapter. Will be used to inflate custom recyclerview layouts and bind data to them. |

We start by showing our progressbar:

```java
        Utils.showProgressBar(pb);
```

We use our database reference to invoke the child method, passing our data location:

```java
        db.child("Scientists")
```

Then attach the ValueEventListener:

```java
 db.child("Scientists").addValueEventListener(new ValueEventListener() {
        @Override
            public void onDataChange(DataSnapshot dataSnapshot) {
                //.....proceed here
```

You can see we are passing in an annonymous class to our ValueEventListener. Then we override the `onDataChange` which gets raised when our data changes. The onDataChange method takes in a DataSnapshot object which gives us a snapshot of our data. Now all we need to do is to work with that DataSnapshot.

However first we are going to clear our memory cache:

```java
            DataCache.clear();
```

That DataCache object will be our memory cache. Basically it will cache our data in memory throughout the lifetime of our application. Thus we don't need to make calls to our Firebase realtime database every now and then unless we want for example when we make an edit. However be aware that Firebase Realtime database also provides a simple caching of our data offline. However we have no control of that cache. For example we are not able to search it without making calls to the cloud. That's why we have our DataCache. All our searches will be against this DataCache, which is simply an ArrayList object.

Once our cache has been cleared we will check if we have any data in our DataSnapshot:

```java
                if (dataSnapshot.exists() && dataSnapshot.getChildrenCount() > 0) {
                    //...continue
```

You can see we use the `exists()` method to check if our DataSnapshot actually exists. Then we've counted it's children using the `getChildrenCount()` method and then compared it to zero.

If the above comparison returns true: we proceed to process our data:

```java
                    for (DataSnapshot ds : dataSnapshot.getChildren()) {
                        //Now get Scientist Objects and populate our arraylist.
                        Scientist scientist = ds.getValue(Scientist.class);
                        scientist.setKey(ds.getKey());
                        DataCache.add(scientist);
                    }
```

We've looped through our DataSnapshot's children, obtaining the current DataSnapshot object. We've then proceeded and obtained the `Scientist` object using the `getValue()` method.

Then obtained the key for that DataSnapshot and assigned it to our `Scientist` object.

Then we've added the scientist to our DataCache.

Then we notify our adapter that it's data source has changed:

```java
                    adapter.notifyDataSetChanged();
```

Then we hide our progressbar and smoothscroll our recyclerview to the last added Firebase data:

```java
                    new Handler().post(new Runnable() {
                        @Override
                        public void run() {
                            Utils.hideProgressBar(pb);
                            rv.smoothScrollToPosition(DataCache.size());
                        }
                    });
```

When the onCancelled method is raised as we attempt to fetch our data, we will show the exception message in a dialog:

```java
@Override
            public void onCancelled(DatabaseError databaseError) {
                Log.d("FIREBASE CRUD", databaseError.getMessage());
                Utils.hideProgressBar(pb);
                Utils.showInfoDialog(a,"CANCELLED",databaseError.getMessage());
            }
```

### Step 3: How to Update/Edit Firebase Data

Let's now come and see how we can update Firebase Realtime Database data. Update means you already have an existing data and you want to make changes. The important part for you to be able to update is to have the key for the node you want to update. Say you want to update a Scientist object, well you need to have the key for that scientist. Well but how do get that key?

You need to retrieve that key when fetching/reading/selecting your data. If you go back to the previous step where we were selecting data you will see that we were getting our key from our DataSnaptsshot object. Here's how we did it:

```java
                    for (DataSnapshot ds : dataSnapshot.getChildren()) {
                        //Now get Scientist Objects and populate our arraylist.
                        Scientist scientist = ds.getValue(Scientist.class);
                        scientist.setKey(ds.getKey());
                        DataCache.add(scientist);
                    }
```

You can see the `ds.getKey()` which is giving us a key object that then we attach to our Scientist object. So when designing your model class you need to accomodate a key field. However in your accessor methods you make sure you exclude it from being sent to Firebase:

```java
public class Scientist{
    //more fields
    private String key;

     @Exclude
    public String getKey() {
        return key;
    }
    @Exclude
    public void setKey(String key) {
        this.key = key;
    }
}
```

You exclude it using the `exclude` annotation defined in `com.google.firebase.database` package.

Now let's proceed and create the update method:

```java
    public void update(final AppCompatActivity a,
                       final DatabaseReference mDatabaseRef,
                       final ProgressBar pb,
                       final Scientist oldScientist,
                       final Scientist newScientist) {
```

You can see that now we are passing two Scientist objects:

1. oldScientist - Scientist before being updated.
2. newScientist - Scientist after updating.

It is the same same object we pass those two so that we can obtain old and new data easily.

We start by checking if we have an object to update in the first place:

```java
            if(oldScientist == null){
                Utils.showInfoDialog(a,"VALIDATION FAILED","Old Scientist is null");
                return;
            }
```

Then as usual show our progressbar:

```java
        Utils.showProgressBar(pb);
```

Then:

```java
            mDatabaseRef.child("Scientists").child(oldScientist.getKey()).setValue(
                newScientist)
                    .addOnCompleteListener(new OnCompleteListener<Void>() {
                        @Override
                        public void onComplete(@NonNull Task<Void> task) {
                            Utils.hideProgressBar(pb);

                            if(task.isSuccessful()){
                                Utils.show(a, oldScientist.getName() + " Update Successful.");
                                Utils.openActivity(a, ScientistsActivity.class);
                            }else {
                                Utils.showInfoDialog(a,"UNSUCCESSFUL",task.getException().
                                getMessage());
                            }
                        }
                    });
```

Look at what we've done. First we've referenced the node to be updated which is our Scientists node. This will contain a list of scientists. Then we've invoked another `child()` method. This now gives us a particular scientist provided we supply the key as we've done. Then we simply invoke the setValue() method,passing in the updated scientist object.

As usual we are listening to completion then checking for success of the task using the `isSuccessful()` method.

That's it we've updated our data.

### Step 4: How to delete/remove Firebase Data

Let's now come and see how to delete Firebase Realtime data. Deleting is important because it allows you to free up space for more objects. Again, the most important step in deletion is to have a key for the scientist you intend to delete. Without that key you won't know which node to delete.

The key was set when retrieving our data.

First let's create the method to delete:

```java
    public void delete(final AppCompatActivity a, final DatabaseReference mDatabaseRef,
                       final ProgressBar pb, final Scientist selectedScientist) {
```

That method, among other parameters is taking a scientist object we've called selectedScientist. It is the data object you want to delete from Firebase.

We start by showing a progressbar:

```java
        Utils.showProgressBar(pb);
```

Then we obtain the key for that scientist:

```java
        final String selectedScientistKey = selectedScientist.getKey();
```

Here's how you delete from Firebase:

```java
    mDatabaseRef.child("Scientists").child(selectedScientistKey).removeValue().
        addOnCompleteListener(new OnCompleteListener<Void>() {
            @Override
            public void onComplete(@NonNull Task<Void> task) {
                Utils.hideProgressBar(pb);

                if(task.isSuccessful()){
                    Utils.show(a, selectedScientist.getName() + " Successfully Deleted.");
                    Utils.openActivity(a, ScientistsActivity.class);
                }else{
                    Utils.showInfoDialog(a,"UNSUCCESSFUL",task.getException().getMessage());
                }
            }
        });
```

We've referenced our root node containing all our Scientists. Then passed the key to identify the one we want to delete. To delete it we simply call the `removeValue()` method. We then listen to completion events and react to them appropriately.

### FULL CODE

#### (a). /Helpers/FirebaseCRUDHelper.java

```java
package info.camposha.firebasedatabasecrud.Helpers;

import android.os.Handler;
import android.util.Log;
import android.widget.ProgressBar;

import androidx.annotation.NonNull;
import androidx.appcompat.app.AppCompatActivity;
import androidx.recyclerview.widget.RecyclerView;

import com.google.android.gms.tasks.OnCompleteListener;
import com.google.android.gms.tasks.Task;
import com.google.firebase.database.DataSnapshot;
import com.google.firebase.database.DatabaseError;
import com.google.firebase.database.DatabaseReference;
import com.google.firebase.database.Query;
import com.google.firebase.database.ValueEventListener;

import info.camposha.firebasedatabasecrud.Data.MyAdapter;
import info.camposha.firebasedatabasecrud.Data.Scientist;
import info.camposha.firebasedatabasecrud.Views.ScientistsActivity;

import static info.camposha.firebasedatabasecrud.Helpers.Utils.DataCache;

public class FirebaseCRUDHelper {

    public void insert(final AppCompatActivity a,
                          final DatabaseReference mDatabaseRef,
                          final ProgressBar pb, final Scientist scientist) {
        //check if they have passed us a valid scientist. If so then return false.
        if (scientist == null) {
            Utils.showInfoDialog(a,"VALIDATION FAILED","Scientist is null");
            return;
        } else {
            //otherwise try to push data to firebase database.
                Utils.showProgressBar(pb);
                //push data to FirebaseDatabase. Table or Child called Scientist will be
                // created.
                mDatabaseRef.child("Scientists").push().setValue(scientist).
                addOnCompleteListener(new OnCompleteListener<Void>() {
                    @Override
                    public void onComplete(@NonNull Task<Void> task) {
                        Utils.hideProgressBar(pb);

                        if(task.isSuccessful()){
                            Utils.openActivity(a, ScientistsActivity.class);
                            Utils.show(a,"Congrats! INSERT SUCCESSFUL");
                        }else{
                            Utils.showInfoDialog(a,"UNSUCCESSFUL",task.getException().
                            getMessage());
                        }
                    }

                });
        }
    }

    public void select(final AppCompatActivity a, DatabaseReference db,
                                         final ProgressBar pb,
                                         final RecyclerView rv,MyAdapter adapter) {
        Utils.showProgressBar(pb);

        db.child("Scientists").addValueEventListener(new ValueEventListener() {
        @Override
            public void onDataChange(DataSnapshot dataSnapshot) {
            DataCache.clear();
                if (dataSnapshot.exists() && dataSnapshot.getChildrenCount() > 0) {
                    for (DataSnapshot ds : dataSnapshot.getChildren()) {
                        //Now get Scientist Objects and populate our arraylist.
                        Scientist scientist = ds.getValue(Scientist.class);
                        scientist.setKey(ds.getKey());
                        DataCache.add(scientist);
                    }

                    adapter.notifyDataSetChanged();

                    new Handler().post(new Runnable() {
                        @Override
                        public void run() {
                            Utils.hideProgressBar(pb);
                            rv.smoothScrollToPosition(DataCache.size());
                        }
                    });
                }else {
                    Utils.show(a,"No more item found");
                }
            }
            @Override
            public void onCancelled(DatabaseError databaseError) {
                Log.d("FIREBASE CRUD", databaseError.getMessage());
                Utils.hideProgressBar(pb);
                Utils.showInfoDialog(a,"CANCELLED",databaseError.getMessage());
            }
        });
    }

    public void update(final AppCompatActivity a,
                       final DatabaseReference mDatabaseRef,
                       final ProgressBar pb,
                       final Scientist oldScientist,
                       final Scientist newScientist) {

            if(oldScientist == null){
                Utils.showInfoDialog(a,"VALIDATION FAILED","Old Scientist is null");
                return;
            }

        Utils.showProgressBar(pb);
            mDatabaseRef.child("Scientists").child(oldScientist.getKey()).setValue(
                newScientist)
                    .addOnCompleteListener(new OnCompleteListener<Void>() {
                        @Override
                        public void onComplete(@NonNull Task<Void> task) {
                            Utils.hideProgressBar(pb);

                            if(task.isSuccessful()){
                                Utils.show(a, oldScientist.getName() + " Update Successful.");
                                Utils.openActivity(a, ScientistsActivity.class);
                            }else {
                                Utils.showInfoDialog(a,"UNSUCCESSFUL",task.getException().
                                getMessage());
                            }
                        }
                    });
    }

    public void delete(final AppCompatActivity a, final DatabaseReference mDatabaseRef,
                       final ProgressBar pb, final Scientist selectedScientist) {
        Utils.showProgressBar(pb);
        final String selectedScientistKey = selectedScientist.getKey();
        mDatabaseRef.child("Scientists").child(selectedScientistKey).removeValue().
        addOnCompleteListener(new OnCompleteListener<Void>() {
            @Override
            public void onComplete(@NonNull Task<Void> task) {
                Utils.hideProgressBar(pb);

                if(task.isSuccessful()){
                    Utils.show(a, selectedScientist.getName() + " Successfully Deleted.");
                    Utils.openActivity(a, ScientistsActivity.class);
                }else{
                    Utils.showInfoDialog(a,"UNSUCCESSFUL",task.getException().getMessage());
                }
            }
        });

    }
}
//end
```

### Conclusion

We have seen how perform all the CRUD operations in Firebase Realtime Database. We've said the code has been written as part of a full app development free course that you can take. However we've also said that you can incorportate the above code easily in your code. All you need do is copy it into your project, then invoke the method you want and pass it the required parameters.

Now proceed to the next lesson.

## Lesson 7 : Splash and Dashboard Activities

In this lesson we want to create our splash and dashboard activities. These will represent two screens that make our application more professional. The splash screen will allow our us display our logo, title and subtitle for our application or company. You can change the time taken to display the splash screen or remove it entirely from the project. Splash screen is not all mandatory for this project.

On the other hadn our dashboard activity is vital for our project. It gives our application a centralized location from which we can navgate our app. It will contain cardviews that can lead us to other parts of the application.

NOTE/= This lesson is part of android firebase crud course we are currently covering. We advise that you take the full course to see how to properly apply this lesson in the whole app. The course is free.

### What We are Creating

We will create three files:

| No. | File | Role |
| --- | --- | --- |
| 1. | SplashActivity.java | Contain our java code for a splash screen. |
| 2. | DashboardActivity.java | Contain our java code for dashboard activity |
| 3. | activity_splash.xml | Contain XML Code for our Splash Screen. |
| 4. | activity_dashboard.xml | Contain XML Code for our Dashboard Screen . |
| 5. | top_to_bottom.xml | Will be contained in an anim folder. Will contain our animation code for moving a widget from a top position to sliightly lower position. |
| 6. | fade_in.xml | Will be contained in our anim folder. Will contain our animation code for fading in a widget. |

### How our Splash Screen Works

1. User clicks the app icon in his android device.
2. The application starts.
3. The launcher activity is our slash activity, thus it is started first.
4. We dop our logo imageview using the top_to_bottom animation.
5. Then we fade in our main title and sub title textviews.
6. We then sleep a thread for like 2 seconds.
7. Then we open our dashboard activity.
8. We kill the splash activity.

### How our Dashboard Screen works.

1. It is opened by the splash activity.
2. It makes us of a CollapsingToolbar and has an image set to it.
3. It contains 4 cardviews.
4. When the View All cardview is clicked we open the activity for viewing all our scientists in a recyclerview.
5. When the Add New cardview is clicked we open the activity for adding or registering a new scientist activity.
6. When the Another Item cardview is clicked we open a material lovely dialog.
7. When the exit button is clicked we finish the current activity, thus stopping our application.

## Video Lesson

Watch video lesson [here](https://youtu.be/zwbcZcXkFZc).

### Step 1: Create Splash Animations

#### (a). top_to_bottom.xml

This animation, as we had said earlier will drop our imageview from a higher position to a lower position.

1. Under your res directory, create a folder called `anim`. This anim will contain our animations.
2. Create an xml file called `top_to_bottom.xml`.
3. Add the following code:

```xml
<?xml version="1.0" encoding="utf-8"?>
<set xmlns:android="http://schemas.android.com/apk/res/android">
    <translate
        android:fromYDelta="-150%"
        android:toYDelta="0%"
        android:duration="500"
        android:repeatCount="0" />
</set>
```

#### (b). fade_in.xml

This animation will fade our two textviews, mainTitle and subTitle. It will be shown after the top to Bottom.

1. Under the `anim` folder we had created in the steps above, create a file named `fade_in.xml`.
2. Add the following code:

```xml
<?xml version="1.0" encoding="utf-8"?>
<set xmlns:android="http://schemas.android.com/apk/res/android">
    <alpha
        android:fromAlpha="0.0"
        android:toAlpha="1.0"
        android:duration="1500"
        />
</set>
```

### Step 2: Create Splash Screen Layout

#### (a). activity_splash.xml

Under the `/res/layouts` folder create a file called `activity_splash` if it doesn't exist.

Then add the following code:

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

In the above code we have defined a [LinearLayout](https://camposha.info/android/linearlayout) as our root element. Inside it we have arranged the following:

1. ImageView - To hold image used as our logo.
2. TextViews - To hold main title and subtitle of our app or company,

### Step 4: Write Splash Screen Code

#### (a). Create `SplashActivity` class

Start by specifying our import statements.

```java
import android.content.Context;
import android.os.Bundle;
import android.view.animation.Animation;
import android.view.animation.AnimationUtils;
import android.widget.ImageView;
import android.widget.TextView;

import androidx.appcompat.app.AppCompatActivity;

import info.camposha.firebasedatabasecrud.Helpers.Utils;
import info.camposha.firebasedatabasecrud.R;
import io.github.inflationx.viewpump.ViewPumpContextWrapper;
```

In the aboev you can see among others we have the following imports:

1. Animation - Our base animation class to represent the animations we load from XML.
2. AnimationUtils - Class to allow us load our XML defined animations into an `android.view.animation.Animation` object.

Then make the class extend AppCompatActivity:

```java
public class SplashActivity extends AppCompatActivity {
```

#### (b). Initialize widgets

Start by declaring the widgets as instance fields:

```java
    //our splash screen views
    private ImageView mLogo;
    private TextView mainTitle, subTitle;
```

Then we initialize them using the `findViewById()` method:

```java
    private void initializeWidgets() {
        mLogo = findViewById(R.id.mLogo);
        mainTitle = findViewById(R.id.mainTitle);
        subTitle = findViewById(R.id.subTitle);
    }
```

#### (c). Show Splash Animation

Start by creating a method to show us the splash animation.

```java
    private void showSplashAnimation() {
```

Then load our top_to_bottom animation using the AnimationUtils class:

```java
        Animation animation = AnimationUtils.loadAnimation(this,
         R.anim.top_to_bottom);
```

Then start the animation:

```java
        mLogo.startAnimation(animation);
```

Now come and load our fade_in animation:

```java
        Animation fadeIn = AnimationUtils.loadAnimation(this, R.anim.fade_in);
```

Now apply them to our two textviews and start them.

```java
        mainTitle.startAnimation(fadeIn);
        subTitle.startAnimation(fadeIn);
    }
```

#### (d). Open Dashboard

Start by creating the method:

```java
    private void goToDashboard() {
```

Now instantiate our [Thread Class](https://camposha.info/java/thread):

```java
        Thread t = new Thread() {
```

We need to overide the `run()` method:

```java
            @Override
            public void run() {
```

Then sleep our thread for 2 seconds:

```java
                try {
                    sleep(2000);
```

Now open our dashboard activity after those two seconds:

```java
                    Utils.openActivity(SplashActivity.this, DashboardActivity.class);
```

Then finish the splash activity. This ensures that user cannot navigate back to splash activity:

```java
                    finish();
                    super.run();
```

We will in the process catch any InterruptedExceptions:

```java
                } catch (InterruptedException e) {
                    e.printStackTrace();
                }
            }
        };
```

Don't forget to start our thread explicitly:

```java
        t.start();
    }
```

#### FULL CODE

##### (a). /Views/SplashActivity.java

```java
package info.camposha.firebasedatabasecrud.Views;

import android.content.Context;
import android.os.Bundle;
import android.view.animation.Animation;
import android.view.animation.AnimationUtils;
import android.widget.ImageView;
import android.widget.TextView;

import androidx.appcompat.app.AppCompatActivity;

import info.camposha.firebasedatabasecrud.Helpers.Utils;
import info.camposha.firebasedatabasecrud.R;
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

### Step 5 : Create Dashboard Layout

#### (a). activity_dashboard.xml

Here is the code for our dashboard layout:

```xml
<?xml version="1.0" encoding="utf-8"?>
<androidx.coordinatorlayout.widget.CoordinatorLayout xmlns:android="http://schemas.android.com/apk/res/android"
    xmlns:app="http://schemas.android.com/apk/res-auto"
    xmlns:tools="http://schemas.android.com/tools"
    android:layout_width="match_parent"
    android:layout_height="match_parent"
    android:background="@android:color/holo_red_light"
    tools:context=".Views.DashboardActivity">
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
            app:title="Firebase CRUD">

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

You can see we are taking advantage of several material design elements like AppBar, CordinatorLayout, CollapsingToolbar etc.

We also use NestedScrollView and CardViews.

The above layout will be inflated into our Dashboard activity.

### Step 6: Write Dashboard Code

#### (a). Create Dashboard Class

Start by adding imports:

```java
import android.content.Context;
import android.os.Bundle;
import android.widget.LinearLayout;

import androidx.appcompat.app.AppCompatActivity;

import info.camposha.firebasedatabasecrud.Helpers.Utils;
import info.camposha.firebasedatabasecrud.R;
import io.github.inflationx.viewpump.ViewPumpContextWrapper;
```

Then create the class, making it derive from AppCompatActivity:

```java
public class DashboardActivity extends AppCompatActivity {
```

#### (b). Prepare our Dashboard Cards

These are the cards that when clicked will take us to other activities:

```java
    //We have 4 cards in the dashboard
    private LinearLayout viewScientistsCard;
    private LinearLayout addScientistCard;
    private LinearLayout third;
    private LinearLayout closeCard;
```

The CardViews will be wrapped by LinearLayouts.

We then initialize them:

```java
    private void initializeWidgets(){
        viewScientistsCard = findViewById(R.id.viewScientistsCard);
        addScientistCard = findViewById(R.id.addScientistCard);
        third = findViewById(R.id.third);
        closeCard = findViewById(R.id.closeCard);
```

Then listen to their click events, thus opening other activities:

```java
        viewScientistsCard.setOnClickListener(v -> Utils.openActivity(DashboardActivity.this,
        ScientistsActivity.class));
        addScientistCard.setOnClickListener(v -> Utils.openActivity(DashboardActivity.this,
        CRUDActivity.class));
        third.setOnClickListener(v -> Utils.showInfoDialog(DashboardActivity.this, "YEEES",
        "Hey You can Display another page when this is clicked"));
        closeCard.setOnClickListener(v -> finish());
    }
```

#### FULL CODE

##### (a). /Views/DashboardActivity.java

```java

package info.camposha.firebasedatabasecrud.Views;

import android.content.Context;
import android.os.Bundle;
import android.widget.LinearLayout;

import androidx.appcompat.app.AppCompatActivity;

import info.camposha.firebasedatabasecrud.Helpers.Utils;
import info.camposha.firebasedatabasecrud.R;
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

![Firebase CRUD Dashboard](https://camposha.info/wp-content/uploads/2019/07/dashboard.png)

Firebase CRUD Dashboard

That's it. Now move over to the next lesson.

## Lesson 8 : Activity for Adding,Updating and Deleting

In this lesson we want to explore our CRUDActivity. This activity will be re-used for three purposes. First it will allow us register or post a new scientist to Firebase Realtime Database. Secondly it will allow us update existing scientist object. Thirdly it will allow us delete a scientist object.

NOTE /= This lesson is part of a multi-episode free course on perform CRUD operations against Firebase Realtime Database, in the process creating a full application.

This lesson involves us:

1. Creating our CRUD Activity as well as its corresponding activity_crud.xml.
2. Creating two menu resource files: first one shown when we open our CRUD Activity for the sake of adding a new scientist. Secondly shown when we open our CRUD activity for sake of editing or deleting Firebase data.
3. Invoke CRUD methods defined in the FirebaseCRUDHelper. Those methods will allow us to update as well delete our data.

### How our CRUD Activity Works

1. User clicks the 'Add New' card in the Dashboard or `Add New` menu item in the scientists activity.
2. The CRUD Activity is opened.
3. A null scientist object is passed in the process.
4. Because null is passed we inflate `add_new_item_menu.xml` as opposed to `edit_item_menu.xml` in our toolbar as a menu item.
5. The `add_new_item_menu.xml` will have a menu item that when clicked posts or inserts our data to Firebase Realtime database.
6. The data being inserted will be typed in the edittexts in the page.
7. The data will first be validated by a method we had earlier defined in the Utils class.
8. If data insert fails, an error message is shown to the user in a cardview within the same activity.
9. If the data insert succeeds, the CRUDActivity is closed, and the ScientistsActivity is opened where recyclerview is scrolled down to the last added item.
10. If the user clicks a recyclerview item, the detail page is opened.
11. If the user clicks the edit button or edit menu item, the CRUDActivity is opened.
12. This time the scientist whose details were being shown is passed along.
13. Because a scientist object is being passed, our CRUDActivity will know that it's opened for the sake of editing or deleting.
14. Thus the `edit_item_menu.xml` is inflated as the menu resource file as opposed to the `add_new_item_menu.xml`.
15. That `edit_item_menu.xml` will have menu items for updating as well as deleting, shown as icons.
16. The user types the data and clicks update button.
17. Our Firebase data is updated.
18. If an error occurs, the error is shown in a cardview within the same page.
19. If the update is successful, the CRUD Activity is finished, and the Scientists activity is opened.
20. If the user clicks, the delete button, data is deleted and the scientists activity is opened.

### Video Lesson

Watch video lesson [here](https://youtu.be/BQfOcYO-kHA).

### Step 1: Create New Item Menu

Under the res directory, create a folder called `menu`. Inside it create an xml file called: `new_item_menu`:

The `new_item_menu.xml` will provide menu items for:

1. Adding/Inserting data to Firebase
2. Viewing/Selecting data from Firebase

Add the following code:

```xml
<?xml version="1.0" encoding="utf-8"?>
<!-- Options menu for the CRUDActivity -->
<menu xmlns:android="http://schemas.android.com/apk/res/android"
    xmlns:app="http://schemas.android.com/apk/res-auto"
    xmlns:tools="http://schemas.android.com/tools"
    tools:context=".Views.CRUDActivity">

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

### Step 2: Create Edit Item Menu

Under our menu directory add an xml file called `edit_item_menu.xml`.

Add the following code:

```xml
<?xml version="1.0" encoding="utf-8"?>
<!-- Options menu for the CRUDActivity -->
<menu xmlns:android="http://schemas.android.com/apk/res/android"
    xmlns:app="http://schemas.android.com/apk/res-auto"
    xmlns:tools="http://schemas.android.com/tools"
    tools:context=".Views.CRUDActivity">

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

The save menu item will be used to update our firebase data while the delete menu wil be used to delete data from Firebase.

### Step 3: Create CRUD Activity Layout

#### (a). activity_crud.xml

This is our CRUD Activity layout. It will be inflated into our CRUD Activity.

Add the following code:

```xml
<?xml version="1.0" encoding="utf-8"?>
<LinearLayout xmlns:android="http://schemas.android.com/apk/res/android"
    xmlns:app="http://schemas.android.com/apk/res-auto"
    xmlns:tools="http://schemas.android.com/tools"
    android:layout_width="match_parent"
    android:layout_height="match_parent"
    android:orientation="vertical"
    android:background="@android:color/holo_red_light"
    tools:context=".Views.CRUDActivity">

    <ProgressBar
        android:id="@+id/mProgressBarSave"
        style="?android:attr/progressBarStyleHorizontal"
        android:layout_width="match_parent"
        android:layout_height="wrap_content"
        android:indeterminate="true"
        android:indeterminateBehavior="cycle"
        android:visibility="gone" />

    <ScrollView
        android:layout_width="match_parent"
        android:layout_height="wrap_content">

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
                <android.helper.DateTimePickerEditText
                    android:id="@+id/dodTxt"
                    android:layout_width="match_parent"
                    android:layout_height="wrap_content"
                    android:layout_margin="@dimen/text_padding"
                    android:hint="Date of Death"
                    tools:ignore="MissingPrefix" />
            </LinearLayout>

        </androidx.cardview.widget.CardView>

    </LinearLayout>
    </ScrollView>

</LinearLayout>
```

You can see from the layout we have used the following widgets:

| No. | Widget | Role |
| --- | --- | --- |
| 1. | LinearLayout | To align it's children linearly, either horizontally or vertically. |
| 2. | ScrollView | To allow for scrolling of our it's children. It provides a scrollbar if the elemens exceed the viewport.It should have only one direct child. |
| 3. | CardView | To group other widgets in beautiful cards. |
| 4. | TextView | To provide labels. |
| 5. | EditText | To provide an input widget for entering texts. |
| 6. | DateTimePickerEditText | To provide a wheelpicker for picking dates. |
| 7. | ProgressBar | To allow us show progress while posting to Firebase, updating Firebase or deleting from Firebase. |

### Step 4 : Create CRUD Activity

#### (a). CRUDActivity.java

This is the activity, as we said responsible for C, U and D in CRUD. That is we create our scientist, update it and delete it. The R or Read will be performed in the listing or Scientists Activity.

Start by adding our imports:

```java
import android.content.Context;
import android.helper.DateTimePickerEditText;
import android.os.Bundle;
import android.view.Menu;
import android.view.MenuItem;
import android.widget.EditText;
import android.widget.ProgressBar;
import android.widget.TextView;

import androidx.appcompat.app.AppCompatActivity;
import androidx.core.app.NavUtils;

import com.google.firebase.database.DatabaseReference;

import java.util.Date;

import info.camposha.firebasedatabasecrud.Data.Scientist;
import info.camposha.firebasedatabasecrud.Helpers.FirebaseCRUDHelper;
import info.camposha.firebasedatabasecrud.Helpers.Utils;
import info.camposha.firebasedatabasecrud.R;
import io.github.inflationx.viewpump.ViewPumpContextWrapper;
```

You can see that we are using androidx artifacts.

Then create the activity:

```java
public class CRUDActivity extends AppCompatActivity {
```

Then we defin our instance fields in the class:

```java
    private EditText nameTxt, descriptionTxt, galaxyTxt, starTxt;
    private TextView headerTxt;
    private DateTimePickerEditText dobTxt,dodTxt;
    private ProgressBar mProgressBar;

    private final Context c = CRUDActivity.this;
    private Scientist receivedScientist;
    private FirebaseCRUDHelper crudHelper=new FirebaseCRUDHelper();
    private DatabaseReference db= Utils.getDatabaseRefence();
```

Those instance fields include our edittexts and datetimepicker for entering our data, our progressbar for showing progress and texview for showing header title. Moreover we have a `Scientist` object which will hold the scientist that is passed along for editing. We also have a FirebaseCRUDHelper instance which will allow us to invoke methods that contain logic for performing CRUD. We also have a database reference which will be passed along.

Then we create a method to initialize the above widgets:

```java
    private void initializeWidgets() {
        mProgressBar = findViewById(R.id.mProgressBarSave);

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

Let's now create a method to insert:

```java
    private void insertData() {
```

We will be inserting the following fields as properties of our scientist object:

```java
        String name, description, galaxy, star, dob,dod;
```

Then we perform validation:

```java
        if (Utils.validate(nameTxt, descriptionTxt, galaxyTxt)) {
```

If validation passes, we obtain values of our edittexts:

```java
            name = nameTxt.getText().toString();
            description = descriptionTxt.getText().toString();
            galaxy = galaxyTxt.getText().toString();
            star = starTxt.getText().toString();
```

Then validate both our date of birth and date of death:

```java
            if (dobTxt.getDate() != null) {
                Date date=dobTxt.getDate();
                dob = dobTxt.getFormat().format(dobTxt.getDate());
            } else {
                dobTxt.setError("Invalid Date");
                dobTxt.requestFocus();
                return;
            }
            if (dodTxt.getDate() != null) {
                dod = dodTxt.getFormat().format(dodTxt.getDate());
            } else {
                dodTxt.setError("Invalid Date");
                dodTxt.requestFocus();
                return;
            }
```

Then instantiate the Scientist, passing along it's properties via the constructor:

```java
            Scientist newScientist=new Scientist(name,description,galaxy,star,dob,dod);
```

Then post/insert to Firebase:

```java
            crudHelper.insert(this,db,mProgressBar,newScientist);
        }
    }
```

Then we create our update method and follow the same process:

```java
    private void updateData() {
        String name, description, galaxy, star, dob,dod;
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
                dod = dodTxt.getFormat().format(dodTxt.getDate());
            } else {
                dodTxt.setError("Invalid Date");
                dodTxt.requestFocus();
                return;
            }

            Scientist newScientist=new Scientist(name,description,galaxy,star,dob,dod);
            crudHelper.update(this,db,mProgressBar,receivedScientist,newScientist);

        }
    }
```

To delete we do the following:

```java
    private void deleteData() {
        crudHelper.delete(this,db,mProgressBar,receivedScientist);
    }
```

#### FULL CODE

Here is the full code for `CRUDActiviy.java`:

```java
package info.camposha.firebasedatabasecrud.Views;

import android.content.Context;
import android.helper.DateTimePickerEditText;
import android.os.Bundle;
import android.view.Menu;
import android.view.MenuItem;
import android.widget.EditText;
import android.widget.ProgressBar;
import android.widget.TextView;

import androidx.appcompat.app.AppCompatActivity;
import androidx.core.app.NavUtils;

import com.google.firebase.database.DatabaseReference;

import java.util.Date;

import info.camposha.firebasedatabasecrud.Data.Scientist;
import info.camposha.firebasedatabasecrud.Helpers.FirebaseCRUDHelper;
import info.camposha.firebasedatabasecrud.Helpers.Utils;
import info.camposha.firebasedatabasecrud.R;
import io.github.inflationx.viewpump.ViewPumpContextWrapper;

public class CRUDActivity extends AppCompatActivity {

    //we'll have several instance fields
    private EditText nameTxt, descriptionTxt, galaxyTxt, starTxt;
    private TextView headerTxt;
    private DateTimePickerEditText dobTxt,dodTxt;
    private ProgressBar mProgressBar;

    private final Context c = CRUDActivity.this;
    private Scientist receivedScientist;
    private FirebaseCRUDHelper crudHelper=new FirebaseCRUDHelper();
    private DatabaseReference db= Utils.getDatabaseRefence();

    private void initializeWidgets() {
        mProgressBar = findViewById(R.id.mProgressBarSave);

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

    private void insertData() {
        String name, description, galaxy, star, dob,dod;
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
            if (dodTxt.getDate() != null) {
                dod = dodTxt.getFormat().format(dodTxt.getDate());
            } else {
                dodTxt.setError("Invalid Date");
                dodTxt.requestFocus();
                return;
            }

            Scientist newScientist=new Scientist(name,description,galaxy,star,dob,dod);
            crudHelper.insert(this,db,mProgressBar,newScientist);

        }
    }

    private void updateData() {
        String name, description, galaxy, star, dob,dod;
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
                dod = dodTxt.getFormat().format(dodTxt.getDate());
            } else {
                dodTxt.setError("Invalid Date");
                dodTxt.requestFocus();
                return;
            }

            Scientist newScientist=new Scientist(name,description,galaxy,star,dob,dod);
            crudHelper.update(this,db,mProgressBar,receivedScientist,newScientist);

        }
    }

    private void deleteData() {
        crudHelper.delete(this,db,mProgressBar,receivedScientist);
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
            Object dod = receivedScientist.getDod();
            if (dod != null) {
                dodTxt.setDate(Utils.giveMeDate(dod.toString()));
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

Now move over to the next lesson.

## Lesson 9 : Firebase RecyclerView and Detail Activities

In this lesson we will explore two important activities, listing or recyclerview activity as well as the Detail Activities. These are data rendering activities. They allow us show our Firebase data to the user. The recyclerview activity will render a list of firebase data using recyclerview. The detail activity will show the details for a single item. It will be shown when a single recyclerview item is clicked.

NOTE/= This lesson is part of a multi-series course we are currently covering on Firebase Realtime Database CRUD. In the course we are seing how to develop a full android application based on Firebase Realtime Database. The full app will support adding of data, fetching of data, updating of data as well as deleting data.

### How our RecyclerView Activity works.

We are working with `Scientist` as our data object. The RecyclerView activity is our listing activity. It will be called the `ScientistsActivity`. It's role is display data fetched from Firebase Realtime database in a recyclerview. The recyclerview will have alternating background colors.

The recyclerview will work with the adapter which is responsible for binding data to it as well as inflating our custom layout. The adapter will be set to the recyclerview using the `setAdapter()` method.

Every row in the recyclerview will comprise:

1. MaterialLetter Icon - To display letter icons extracted from name.
2. TextViews - To display name, description and galaxy of the scientist.

When a recyclerview row is clicked, we will open the detail activity, passing along the clicked scientist object.

The recyclerview shall be searchable via the toolbar. We will render a toolbar searchview which will allow our users to search filter our firebase data. The search and filter will be disconnected and offline.

### How the Detail Activity works

The detail activity is a static activity in that it doesn't do any processing or make any calls to Firebase. Instead it only renders the detail for our Scientist object. It is very important however because it provides us with a way of showing the user individual details of our scientist object without giving the user capability to edit.

However if the user intends to edit then he can click a button or menu item and move to the editing page.

The detail activity will be have some of the following components:

1. CollapsingToolBar
2. Floating ActionButton
3. CardViews
4. TextViews etc

### Video Lesson

Watch video lesson [here](https://youtu.be/UFQbj-6JXsY).

### Step 1: Create Detail Activity Layout

#### (a). activity_detail.xml

This is the layout that will be inflated into our Detail Activity. It will content another layout called `detail_content.xml`. Here is the code for the `activity_detail.xml`:

```xml
<?xml version="1.0" encoding="utf-8"?>
<androidx.coordinatorlayout.widget.CoordinatorLayout xmlns:android="http://schemas.android.com/apk/res/android"
    xmlns:app="http://schemas.android.com/apk/res-auto"
    xmlns:tools="http://schemas.android.com/tools"
    android:layout_width="match_parent"
    android:layout_height="match_parent"
    android:fitsSystemWindows="true"
    android:background="@color/colorPrimary"
    tools:context=".Views.DetailActivity">

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
                android:src="@drawable/m_cactus"
                app:layout_collapseMode="parallax" />

            <androidx.appcompat.widget.Toolbar
                android:id="@+id/toolbar"
                android:layout_width="match_parent"
                android:layout_height="?attr/actionBarSize"
                android:background="@android:color/transparent"
                app:layout_collapseMode="pin"
                app:popupTheme="@style/ThemeOverlay.AppCompat.Light" />
            <com.google.android.material.floatingactionbutton.FloatingActionButton
                android:id="@+id/editFAB"
                android:layout_width="wrap_content"
                android:layout_height="wrap_content"
                android:layout_gravity="top|end"
                android:layout_margin="16dp"
                android:src="@android:drawable/ic_menu_edit"
                android:tint="@android:color/white" />
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

        </LinearLayout>

    </androidx.core.widget.NestedScrollView>
</androidx.coordinatorlayout.widget.CoordinatorLayout>
```

You can see we have used several material layouts like:

1. CoordinatorLayout
2. NestedScrollView
3. AppBarLayout
4. ToolBar
5. CollapsingToolBar

#### (b). detail_content.xml

We had said earlier that the `activity_detail.xml` would contain the `detail_content.xml`. Well here is the code for the detail_content.xml :

```xml
<?xml version="1.0" encoding="utf-8"?>
<androidx.cardview.widget.CardView xmlns:android="http://schemas.android.com/apk/res/android"
    android:layout_width="match_parent"
    android:layout_height="match_parent"
    android:layout_margin="8dp">

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
                        <TextView
                            android:layout_width="match_parent"
                            android:layout_height="wrap_content"
                            android:padding="@dimen/text_padding"
                            android:text="Date Of Death"
                            android:textAppearance="@style/TextAppearance.AppCompat.Title"
                            android:textColor="@color/colorAccent" />

                        <TextView
                            android:id="@+id/dodTV"
                            android:layout_width="match_parent"
                            android:layout_height="wrap_content"
                            android:padding="@dimen/text_padding"
                            android:text="DOD" />

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

The detail content as you can see contains:

| No. | Element | Role |
| --- | --- | --- |
| 1. | CardView | To group our textviews. |
| 2. | TextView | To render our scientist properties. |
| 3. | LinearLayout | To align our cardviews and textviews vertically. |
| 4. | ScrollView | To provide scrolling capability in our page. |

### Step 2: Write Detail Activity Code

#### (a). DetailActivity.java

The main role of this class will be to render the details of our scientist.

First add your imports:

```java
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

import info.camposha.firebasedatabasecrud.Data.Scientist;
import info.camposha.firebasedatabasecrud.Helpers.Utils;
import info.camposha.firebasedatabasecrud.R;
import io.github.inflationx.viewpump.ViewPumpContextWrapper;
```

Then create the class, making it extend the AppCompatActivity:

```java
public class DetailActivity extends AppCompatActivity implements View.OnClickListener {
```

As you can see we've also implemented the `View.OnClickListener` interface. Thus we will override one method called `onClick` later on.

For now let's add our instance fields:

```java
    private TextView nameTV,descriptionTV,galaxyTV,starTV,dobTV,diedTV;
    private Scientist receivedScientist;
    private CollapsingToolbarLayout mCollapsingToolbarLayout;
    private FloatingActionButton editFAB;
```

Here are the roles of the above instance fields:

| No. | Object | Role |
| --- | --- | --- |
| 1. | TextViews | Will render properties of our scientist like name,description etc. |
| 2. | receievedScientist | Will hold the scientist object for which we are showing details. |
| 3. | mCollapsingToolbarLayout | We will show a custom title in our collapsingtoolbarlayout. |
| 4. | FloatingActionButton | When clicked, will open our editing page. |

Let's now proceed and initialize those widgets:

```java
    private void initializeWidgets(){
        nameTV= findViewById(R.id.nameTV);
        descriptionTV= findViewById(R.id.descriptionTV);
        galaxyTV= findViewById(R.id.galaxyTV);
        starTV= findViewById(R.id.starTV);
        dobTV= findViewById(R.id.dobTV);
        diedTV= findViewById(R.id.dodTV);
        editFAB=findViewById(R.id.editFAB);
        editFAB.setOnClickListener(this);
        mCollapsingToolbarLayout=findViewById(R.id.mCollapsingToolbarLayout);
        mCollapsingToolbarLayout.setExpandedTitleColor(getResources().
                getColor(R.color.white));
    }
```

After initializing the widgets we can now receive our scientist object:

```java
    private void receiveAndShowData(){
         receivedScientist= Utils.receiveScientist(getIntent(),DetailActivity.this);
```

Then show the properties in textviews:

```java
         if(receivedScientist != null){
             nameTV.setText(receivedScientist.getName());
             descriptionTV.setText(receivedScientist.getDescription());
             galaxyTV.setText(receivedScientist.getGalaxy());
             starTV.setText(receivedScientist.getStar());
             dobTV.setText(receivedScientist.getDob());
             diedTV.setText(receivedScientist.getDod());

             mCollapsingToolbarLayout.setTitle(receivedScientist.getName());
         }

    }
```

We will also override our onClick method as we had promised:

```java
    @Override
    public void onClick(View v) {
        int id =v.getId();
        if(id == R.id.editFAB){
            Utils.sendScientistToActivity(this,receivedScientist,CRUDActivity.class);
            finish();
        }
    }
```

#### FULL CODE

Here is the full code for detail activity:

```java
package info.camposha.firebasedatabasecrud.Views;

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

import info.camposha.firebasedatabasecrud.Data.Scientist;
import info.camposha.firebasedatabasecrud.Helpers.Utils;
import info.camposha.firebasedatabasecrud.R;
import io.github.inflationx.viewpump.ViewPumpContextWrapper;

public class DetailActivity extends AppCompatActivity implements View.OnClickListener {

    private TextView nameTV,descriptionTV,galaxyTV,starTV,dobTV,diedTV;
    private Scientist receivedScientist;
    private CollapsingToolbarLayout mCollapsingToolbarLayout;
    private FloatingActionButton editFAB;

    private void initializeWidgets(){
        nameTV= findViewById(R.id.nameTV);
        descriptionTV= findViewById(R.id.descriptionTV);
        galaxyTV= findViewById(R.id.galaxyTV);
        starTV= findViewById(R.id.starTV);
        dobTV= findViewById(R.id.dobTV);
        diedTV= findViewById(R.id.dodTV);
        editFAB=findViewById(R.id.editFAB);
        editFAB.setOnClickListener(this);
        mCollapsingToolbarLayout=findViewById(R.id.mCollapsingToolbarLayout);
        mCollapsingToolbarLayout.setExpandedTitleColor(getResources().
                getColor(R.color.white));
    }
    private void receiveAndShowData(){
         receivedScientist= Utils.receiveScientist(getIntent(),DetailActivity.this);

         if(receivedScientist != null){
             nameTV.setText(receivedScientist.getName());
             descriptionTV.setText(receivedScientist.getDescription());
             galaxyTV.setText(receivedScientist.getGalaxy());
             starTV.setText(receivedScientist.getStar());
             dobTV.setText(receivedScientist.getDob());
             diedTV.setText(receivedScientist.getDod());

             mCollapsingToolbarLayout.setTitle(receivedScientist.getName());
         }

    }

    @Override
    public void onClick(View v) {
        int id =v.getId();
        if(id == R.id.editFAB){
            Utils.sendScientistToActivity(this,receivedScientist,CRUDActivity.class);
            finish();
        }
    }

    @Override
    public boolean onCreateOptionsMenu(Menu menu) {
        getMenuInflater().inflate(R.menu.detail_page_menu, menu);
        return true;
    }

    @Override
    public boolean onOptionsItemSelected(MenuItem item) {
        // User clicked on a menu option in the app bar overflow menu
        switch (item.getItemId()) {
            case R.id.action_edit:
                Utils.sendScientistToActivity(this,receivedScientist,CRUDActivity.class);
                return true;
            // Respond to a click on the "Up" arrow button in the app bar
            case android.R.id.home:
                // Navigate back to parent activity
                NavUtils.navigateUpFromSameTask(this);
                return true;
        }
        return super.onOptionsItemSelected(item);
    }
    @Override
    protected void attachBaseContext(Context newBase) {
        super.attachBaseContext(ViewPumpContextWrapper.wrap(newBase));
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

### Step 3 : Create Listing Activity Layout.

#### activity_scientists.xml

This will be the layout for our ScientistsActivity which is our listing activity:

```xml
<?xml version="1.0" encoding="utf-8"?>
<LinearLayout xmlns:android="http://schemas.android.com/apk/res/android"
    xmlns:tools="http://schemas.android.com/tools"
    android:layout_width="match_parent"
    android:layout_height="match_parent"
    android:orientation="vertical"
    tools:context=".Views.ScientistsActivity">

    <ProgressBar
        android:id="@+id/mProgressBarLoad"
        style="?android:attr/progressBarStyleHorizontal"
        android:layout_width="match_parent"
        android:layout_height="wrap_content"
        android:indeterminate="true"
        android:indeterminateBehavior="cycle"
        android:visibility="gone" />

    <TextView
        android:id="@+id/mHeaderTxt"
        android:layout_width="match_parent"
        android:layout_height="wrap_content"
        android:padding="5dp"
        android:text="Pioneer Scientists"
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

Here are the widgets we've used abobe:

| No. | Widget | Role |
| --- | --- | --- |
| 1. | LinearLayout | To arrange its children vertically |
| 2. | TextView | To show our page header or title |
| 3. | RecyclerView. | Our most important widget in this layout. Will show render our list of data from Firebase. |

### Step 4: Listing Activity Code

#### (a). ScientistsActivity.java

This is our listing activity. Start by adding imports:

```java
import android.content.Context;
import android.os.Bundle;
import android.view.Menu;
import android.view.MenuItem;
import android.widget.ProgressBar;
import android.widget.SearchView;

import androidx.appcompat.app.AppCompatActivity;
import androidx.recyclerview.widget.DividerItemDecoration;
import androidx.recyclerview.widget.LinearLayoutManager;
import androidx.recyclerview.widget.RecyclerView;

import info.camposha.firebasedatabasecrud.Data.MyAdapter;
import info.camposha.firebasedatabasecrud.Helpers.FirebaseCRUDHelper;
import info.camposha.firebasedatabasecrud.Helpers.Utils;
import info.camposha.firebasedatabasecrud.R;
import io.github.inflationx.viewpump.ViewPumpContextWrapper;
```

Then create the class, making it implement some interfaces:

```java
public class ScientistsActivity extends AppCompatActivity  implements
SearchView.OnQueryTextListener,MenuItem.OnActionExpandListener {
```

Among the interfaces we've implemented include the `OnQueryTextListener` defined in the SearchView class. We will implement their methods later on.

For now let's define instance fields for this class:

```java
    private RecyclerView rv;
    public ProgressBar mProgressBar;
    private FirebaseCRUDHelper crudHelper=new FirebaseCRUDHelper();
    private LinearLayoutManager layoutManager;
    MyAdapter adapter;
```

Here are the roles of those instance fields:

| No. | Object | Role |
| --- | --- | --- |
| 1. | RecyclerView | Will render our firebase data in a list. |
| 2. | ProgressBar | Will show progress bar as we download our firebase data. |
| 3. | FirebaseCRUDHelper | It's instance will allow us invoke helper crud methods we had already defined, like the method for fetching firebase data. |
| 4. | LinearLayoutManager | It's instance will allow us position our recyclerview cardviews. |
| 5. | Adapter | It will bind data to our recyclerview |

We then proceed to initialize widgets as well as other objects:

```java
    private void initializeViews(){
        mProgressBar = findViewById(R.id.mProgressBarLoad);
        mProgressBar.setIndeterminate(true);
        Utils.showProgressBar(mProgressBar);
        rv = findViewById(R.id.mRecyclerView);
        layoutManager = new LinearLayoutManager(this);
        rv.setLayoutManager(layoutManager);
        DividerItemDecoration dividerItemDecoration = new DividerItemDecoration(rv.getContext(),
                layoutManager.getOrientation());
        rv.addItemDecoration(dividerItemDecoration);
        adapter=new MyAdapter(this,Utils.DataCache);
        rv.setAdapter(adapter);

    }
```

Among them as you can see above are LinearLayoutManager and DividerItemDecoration. We set the LinearLayoutManager to our recyclerview using the `setLayoutManager` method and DividerItemDecoration using the `addItemDecoration` method.

Then to download and bind downloaded data to our recyclerview all we need is the following method:

```java
    private void bindData(){
        crudHelper.select(this,Utils.getDatabaseRefence(),mProgressBar,rv,adapter);
    }
```

We will then override several methods. Among them is:

```java
    @Override
    public boolean onQueryTextChange(String query) {
        Utils.searchString=query;
        MyAdapter adapter=new MyAdapter(this,Utils.DataCache);
        adapter.getFilter().filter(query);
        rv.setLayoutManager(new LinearLayoutManager(this));
        rv.setAdapter(adapter);
        return false;
    }
```

The `onQueryTextChange`. The above callback is invoked when a user types in our searchview. The first thing we will do is set the query to a searchString variable. That allows us hold the query in a public variable that we will be able to invoke from anywhere including the `MyAdapter` class.

We then instantiate our MyAdapter passing in the Context as well as the DataCache. That DataCache is an arraylist that will cache our data in memory. We will be performing our search and filter against that arraylist.

Take note that we are also passing in the query to `filter` method. That query will find its way in our `FilterHelper` class where we are performing our actual filtering.

#### FULL CODE

Here is the full code for `ScientistsActivity.java`:

```java
package info.camposha.firebasedatabasecrud.Views;

import android.content.Context;
import android.os.Bundle;
import android.view.Menu;
import android.view.MenuItem;
import android.widget.ProgressBar;
import android.widget.SearchView;

import androidx.appcompat.app.AppCompatActivity;
import androidx.recyclerview.widget.DividerItemDecoration;
import androidx.recyclerview.widget.LinearLayoutManager;
import androidx.recyclerview.widget.RecyclerView;

import info.camposha.firebasedatabasecrud.Data.MyAdapter;
import info.camposha.firebasedatabasecrud.Helpers.FirebaseCRUDHelper;
import info.camposha.firebasedatabasecrud.Helpers.Utils;
import info.camposha.firebasedatabasecrud.R;
import io.github.inflationx.viewpump.ViewPumpContextWrapper;

public class ScientistsActivity extends AppCompatActivity  implements
SearchView.OnQueryTextListener,MenuItem.OnActionExpandListener {

    private RecyclerView rv;
    public ProgressBar mProgressBar;
    private FirebaseCRUDHelper crudHelper=new FirebaseCRUDHelper();
    private LinearLayoutManager layoutManager;
    MyAdapter adapter;

    private void initializeViews(){
        mProgressBar = findViewById(R.id.mProgressBarLoad);
        mProgressBar.setIndeterminate(true);
        Utils.showProgressBar(mProgressBar);
        rv = findViewById(R.id.mRecyclerView);
        layoutManager = new LinearLayoutManager(this);
        rv.setLayoutManager(layoutManager);
        DividerItemDecoration dividerItemDecoration = new DividerItemDecoration(rv.getContext(),
                layoutManager.getOrientation());
        rv.addItemDecoration(dividerItemDecoration);
        adapter=new MyAdapter(this,Utils.DataCache);
        rv.setAdapter(adapter);

    }

    private void bindData(){
        crudHelper.select(this,Utils.getDatabaseRefence(),mProgressBar,rv,adapter);
    }

    @Override
    public boolean onCreateOptionsMenu(Menu menu) {
        // Inflate the menu options from the res/menu/menu_editor.xml file.
        // This adds menu items to the app bar.
        getMenuInflater().inflate(R.menu.scientists_page_menu, menu);
        MenuItem searchItem = menu.findItem(R.id.action_search);
        SearchView searchView = (SearchView) searchItem.getActionView();
        searchView.setOnQueryTextListener(this);
        searchView.setIconified(true);
        searchView.setQueryHint("Search");
        return true;
    }

    @Override
    public boolean onOptionsItemSelected(MenuItem item) {
        // User clicked on a menu option in the app bar overflow menu
        switch (item.getItemId()) {
            case R.id.action_new:
                Utils.sendScientistToActivity(this,null,CRUDActivity.class);
                return true;

        }
        return super.onOptionsItemSelected(item);
    }

    @Override
    protected void attachBaseContext(Context newBase) {
        super.attachBaseContext(ViewPumpContextWrapper.wrap(newBase));
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
    public boolean onQueryTextSubmit(String query) {

        return false;
    }

    @Override
    public boolean onQueryTextChange(String query) {
        Utils.searchString=query;
        MyAdapter adapter=new MyAdapter(this,Utils.DataCache);
        adapter.getFilter().filter(query);
        rv.setLayoutManager(new LinearLayoutManager(this));
        rv.setAdapter(adapter);
        return false;
    }
    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_scientists);

        initializeViews();
        bindData();
    }

}
//end
```

That's it. Now proceed over to the next lesson.

## Finishig Up

Well we have finished the most important steps by this lesson. However we are yet to view our AndroidManifest. This file is important because we need to register our components right here as well as add the necessary permissions.

### AndroidManifest.xml

This file is mandatory to android development. It is autogenerated by android studio and normally if you don't add other activities in your project or require any special permission then you don't have to touch. By default android studio registers the generated MainActivity file.

However in our case we will need to modify this project.

#### (a). Add Internet Connectivity Permission

You need internet connectivity permission for your app to be able to access internet from the users device.

```xml
    <uses-permission android:name="android.permission.INTERNET"/>
```

#### (b). Register Activities

[Activities](https://camposha.info/android/activity) are android components and have to be registered like any other android component.

```xml
    <activity android:name=".Views.SplashActivity" android:theme="@style/SplashTheme">
            <intent-filter>
                <action android:name="android.intent.action.MAIN" />
                <category android:name="android.intent.category.LAUNCHER" />
            </intent-filter>
        </activity>
        <activity android:name=".Views.DashboardActivity" android:theme="@style/HomeTheme">
        </activity>
        <activity
            android:name=".Views.ScientistsActivity"
            android:label="Scientists "
            android:parentActivityName=".Views.DashboardActivity" />
        <activity
            android:name=".Views.CRUDActivity"
            android:theme="@style/CRUDTheme"
            android:label="CRUD Page "
            android:parentActivityName=".Views.DashboardActivity" />
        <activity
            android:name=".Views.DetailActivity"
            android:label="Details Page "
            android:parentActivityName=".Views.ScientistsActivity" />
```

### Full Code

#### AndroidManifest.xml

```xml
<?xml version="1.0" encoding="utf-8"?>
<manifest xmlns:android="http://schemas.android.com/apk/res/android"
    xmlns:dist="http://schemas.android.com/apk/distribution"
    package="info.camposha.firebasedatabasecrud">

    <uses-permission android:name="android.permission.INTERNET"/>
    <dist:module dist:instant="true" />

    <application
        android:name=".App"
        android:allowBackup="true"
        android:icon="@mipmap/ic_launcher"
        android:label="@string/app_name"
        android:roundIcon="@mipmap/ic_launcher_round"
        android:supportsRtl="true"
        android:theme="@style/AppTheme">
        <activity android:name=".Views.SplashActivity" android:theme="@style/SplashTheme">
            <intent-filter>
                <action android:name="android.intent.action.MAIN" />
                <category android:name="android.intent.category.LAUNCHER" />
            </intent-filter>
        </activity>
        <activity android:name=".Views.DashboardActivity" android:theme="@style/HomeTheme">
        </activity>
        <activity
            android:name=".Views.ScientistsActivity"
            android:label="Scientists "
            android:parentActivityName=".Views.DashboardActivity" />
        <activity
            android:name=".Views.CRUDActivity"
            android:theme="@style/CRUDTheme"
            android:label="CRUD Page "
            android:parentActivityName=".Views.DashboardActivity" />
        <activity
            android:name=".Views.DetailActivity"
            android:label="Details Page "
            android:parentActivityName=".Views.ScientistsActivity" />
    </application>

</manifest>
```

## Download Project

The below links includes:

1. FULL SOURCE CODE
2. DEMO APK
3. INSTRUCTIONS

Download below:

[Download](https://camposha.info/student-project/firebase-realtime-database-crud-project/)

If you encounter any problem feel free to contact me via my email: oclemmi@gmail.com or via this website. I will reply as soon as I receive.
