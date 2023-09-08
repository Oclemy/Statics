# Android Firebase Storage + Firebase Realtime Database Tutorial

_Android Firebase Storage + Firebase Realtime Database Tutoriral._

How to upload images and text to Firebase Database and Storage, then retrieve them and show them in a custom recyclerview, then show or delete them. We create a simple app in master detail mode allowing us to upload teacher details to Firebase, show them, view details for single teacher then delete them.


##### Concepts You will Learn

Here are some of the important concepts we are interested in learning in this tutorial:

1. How to combine both Firebase Storage and Firebase Realtime database.
2. How to upload images to Firebase Storage, save text to Firebase Realtime Database, Read them, then delete them.
3. How to perform CRUD against Firebase Realtime database and Firebase Storage.
4. Firebase Realtime Database and Storage Master Detail example with RecyclerView with images and text.

##### 1-minute Summary

Here's a simple summary of this tutorial:

1. User starts the app. He choses either 'View All' data or 'Add New' data.
2. If he choses 'Add New', a new data entry activity is opened, allowing user to input the name, description, choose image via image picker, then click upload to send data to server.
3. If he chooses 'View All', a new activity is opened. There data is downloaded from Firebase realtime database and firebase storage then bound to the custom recyclerview. We show name, description, date and image.
4. The user can click the RecyclerView CardViews to show a ContextMenu. The ContextMenu contains two options, either 'Show' or 'Delete'. If the user chooses 'Show', a new Details Activity gets opened with the details for that particular user. If he chooses 'Delete', the item is deleted from Firebase, that is the texts are deleted from Firebase realtime database while the image from Firebase Storage.
5. The Custom RecyclerView will be have CardViews with images and text from firebase. The images will be downloaded using Picasso library. When a single cardview is clicked we open a new [activity](https://camposha.info/android/activity).

![Android Firebase recyclerView Images Upload Download](https://camposha.info/wp-content/uploads/2019/04/demo1-24.gif)

Android Firebase recyclerView Images Upload Download

##### Video Tutorial

If you prefer a video tutorial, well we have one detailing every step below:

##### Important Links

Here are some important links and references.

1. Learn about Firebase Realtime database here. The Realtime database is what will store our text data.
2. Learn about ListViews [here](https://camposha.info/android/recyclerview). RecyclerView is our adapterview.
3. Learn about Activities [here](https://camposha.info/android/activity).

Let's start.

#### 1\. Setting Up

##### (a). Create Android Studio Project

Start by creating your project in android studio. I choose a minimum sdk of 15 and empty activity as my template. We arre using java as our programming language.

In either your android manifest or build.gradle, take note of the package name and copy it. We will need.

##### 2\. Create Firebase Project

In your Firebase Dashboard(you need only a gmail account to create Firebase account), we need to create a new project.

1. You will see a button `+` or 'add' for adding a new Firebase App, click it.
    
2. Then choose Android as our platform. There are other options like iOS and Web however we are developing for android.
    

![](https://camposha.info/wp-content/uploads/2019/04/choose_android.png)

1. Register App. We need to do this by adding the package name of our app. You can get the package name from android studio, either in your app level build.gradle or your android manifest.

![](https://camposha.info/wp-content/uploads/2019/04/add_package_name.png)

Then Click 'Register App'.

1. Download `google-services.json` file. This file is what contains our configuration details for our Firebase. We will copy it later on to our app folder.
2. Navigate over to the app folder of your android studio project. Then copy the downloaded `google-services.json` file there.

![](https://camposha.info/wp-content/uploads/2019/04/add_config_file.png)

#### 2\. Gradle Scripts and Manifest

Here are the `build.gradle` files:

##### (a). build.gradle(Project)

Navigate over to the root level or project level `build.gradle` file.

Go over to the dependencies closure under the `buildscript` and specify `com.google.gms:google-services` as follows:

```gradle
buildscript {

    repositories {
        google()
        jcenter()
    }
    dependencies {
        classpath 'com.android.tools.build:gradle:3.1.3'
        classpath 'com.google.gms:google-services:3.2.0'

        // NOTE: Do not place your application dependencies here; they belong
        // in the individual module build.gradle files
    }
}
...
```

##### (b). build.gradle(App)

There are two things to do. First we need to add dependencies under the dependencies closure, then after we've at the bottom we apply the `com.google.gms.google-services` plugin.

Here's it:

```groovy
dependencies {
    implementation fileTree(dir: 'libs', include: ['*.jar'])
    testImplementation 'junit:junit:4.12'
    implementation 'com.android.support:appcompat-v7:28.0.0'
    implementation 'com.android.support.constraint:constraint-layout:1.1.3'
    implementation 'com.android.support:cardview-v7:28.0.0'
    implementation 'com.android.support:recyclerview-v7:28.0.0'
    implementation 'com.squareup.picasso:picasso:2.5.2'
    implementation 'com.android.support:design:28.0.0'
    implementation 'com.android.support:support-v4:28.0.0'
    implementation 'com.android.support:support-vector-drawable:28.0.0'

    implementation 'com.google.firebase:firebase-database:11.8.0'
    implementation 'com.google.firebase:firebase-storage:11.8.0'

}

apply plugin: 'com.google.gms.google-services'
```

Here are some of the dependencies we've added:

| No. | Name | Role |
| --- | --- | --- |
| 1. | `appcompat` | A support library to give us AppCompatActivity from which our activities will be deriving. |
| 2. | `cardview` | A CardView which will wrap our TextViews and ImageView into Cards to be rendered in our RecyclerView |
| 3. | `recyclerview` | This is our adapterview that will render our data. |
| 4. | `picasso` | A third party library that will load our images from Firebase into an imageview. |
| 5. | `firebase-database` | Will give us Firebase Realtime Database APIs and classes. |
| 6. | `firebase-storage` | Will give us Firebase Storage APIs and Classes. |

##### (c). AndroidManifest.xml

Go over to your android manifest and add permission for internet connectivity.

```xml
 <uses-permission android_name="android.permission.INTERNET"/>
```

This is because Firebase is an online service and we need internet connectivity to connect to any Firebase service.

We will also be creating several actitivies, you will want to make sure they are all registered here since activities are components that need registeration for them to be accessed and viewed.

#### 3\. Layouts

We now need to come to layouts.

##### (a). activity_main.xml

Here's the layout:

```xml
<?xml version="1.0" encoding="utf-8"?>
<RelativeLayout

    android_layout_width="match_parent"
    android_layout_height="match_parent"
    android_background="#009688"
    tools_context=".View.MainActivity">

    <TextView
        android_id="@+id/headerTxt"
        android_layout_width="match_parent"
        android_layout_height="wrap_content"
        android_text="Spiritual Teachers App"
        android_textAlignment="center"
        android_fontFamily="casual"
        android_textStyle="bold"
        android_textAppearance="@style/TextAppearance.AppCompat.Large"
        android_textColor="@color/white" />

    <ImageView
        android_layout_width="wrap_content"
        android_layout_height="wrap_content"
        android_layout_above="@+id/button_zone"
        android_layout_centerHorizontal="true"
        android_src="@drawable/logo"
        android_contentDescription="@string/app_name"/>

    <LinearLayout
        android_id="@+id/button_zone"
        android_layout_width="match_parent"
        android_layout_height="wrap_content"
        android_orientation="horizontal"
        android_layout_centerInParent="true">

        <Button
            android_id="@+id/openTeachersActivityBtn"
            style="?android:attr/button"
            android_layout_width="0dp"
            android_layout_height="wrap_content"
            android_layout_weight="1"
            android_text="View All"
            android_textColor="@color/dark"/>

        <Button
            android_id="@+id/openUploadActivityBtn"
            style="?android:attr/button"
            android_layout_width="0dp"
            android_layout_height="wrap_content"
            android_layout_weight="1"
            android_clickable="true"
            android_text="Add New"
            android_textColor="@color/dark"/>

    </LinearLayout>

</RelativeLayout>
```

##### (b). activity_items.xml

Here's our `activity_items.xml` layout.

```xml
<?xml version="1.0" encoding="utf-8"?>
<LinearLayout

    android_layout_width="match_parent"
    android_layout_height="match_parent"
    android_orientation="vertical"
    tools_context=".View.ItemsActivity">

    <TextView
        android_id="@+id/textView"
        android_layout_width="match_parent"
        android_layout_height="wrap_content"
        android_text="Spiritual Teachers List"
        android_textAlignment="center"
        android_textStyle="bold"
        android_textAppearance="@style/TextAppearance.AppCompat.Large"
        android_textColor="@color/colorAccent" />
    <ProgressBar
        android_id="@+id/myDataLoaderProgressBar"
        style="?android:attr/progressBarStyleHorizontal"
        android_layout_width="match_parent"
        android_layout_height="wrap_content"
        android_indeterminate="true"
        android_indeterminateBehavior="cycle"
        android_visibility="gone" />
    <android.support.v7.widget.RecyclerView
        android_id="@+id/mRecyclerView"
        android_layout_weight="0.5"
        android_layout_width="match_parent"
        android_layout_height="wrap_content" />

</LinearLayout>
```

##### (c). activity_detail.xml

Here's our `activity_detail.xml` layout.

```xml
<?xml version="1.0" encoding="utf-8"?>
<RelativeLayout

    android_layout_width="match_parent"
    android_layout_height="match_parent"
    tools_context=".View.DetailsActivity"
    android_background="#009688"
    tools_showIn="@layout/activity_detail">

    <android.support.v7.widget.CardView
        android_layout_width="match_parent"

        android_layout_margin="3dp"
        card_view_cardCornerRadius="3dp"
        card_view_cardElevation="5dp"
        android_layout_height="match_parent">

        <ScrollView
            android_layout_width="match_parent"
            android_layout_height="match_parent">

        <LinearLayout
            android_orientation="vertical"
            android_layout_width="match_parent"
            android_layout_height="match_parent">

            <ImageView
                android_id="@+id/teacherDetailImageView"
                android_layout_width="match_parent"
                android_layout_height="150dp"
                android_padding="5dp"
                android_layout_alignParentTop="true"
                android_scaleType="centerCrop"
                android_src="@drawable/ic_action_account_circle_40" />

            <LinearLayout
                android_orientation="vertical"
                android_layout_width="match_parent"
                android_layout_height="wrap_content">

                <TextView
                    android_id="@+id/nameDetailTextView"
                    android_layout_width="wrap_content"
                    android_layout_height="wrap_content"
                    android_textAppearance="?android:attr/textAppearanceLarge"
                    android_padding="5dp"
                    android_maxLines="1"
                    android_textStyle="bold"
                    android_textColor="@color/colorAccent"
                    android_text="Teacher Name" />
                <TextView
                    android_id="@+id/dateDetailTextView"
                    android_layout_width="wrap_content"
                    android_layout_height="wrap_content"
                    android_textAppearance="?android:attr/textAppearanceSmall"
                    android_padding="5dp"
                    android_maxLines="1"
                    android_text="DATE" />

                <TextView
                    android_id="@+id/categoryDetailTextView"
                    android_layout_width="wrap_content"
                    android_layout_height="wrap_content"
                    android_textAppearance="?android:attr/textAppearanceMedium"
                    android_padding="5dp"
                    android_textStyle="italic"
                    android_text="Category : Zen Quotes" />

                    <TextView
                        android_id="@+id/descriptionDetailTextView"
                        android_layout_width="wrap_content"
                        android_layout_height="wrap_content"
                        android_textAppearance="?android:attr/textAppearanceSmall"
                        android_padding="5dp"
                        android_textColor="#0f0f0f"
                        android_minLines="4"
                        android_text="Teacher Description Here........." />

            </LinearLayout>
        </LinearLayout>
        </ScrollView>
    </android.support.v7.widget.CardView>
</RelativeLayout>
```

##### (d). activity_upload.xml

Here's our `activity_upload.xml` layout.

```xml
<?xml version="1.0" encoding="utf-8"?>
<LinearLayout

    android_layout_width="match_parent"
    android_layout_height="match_parent"
    android_orientation="vertical"
    tools_context=".View.UploadActivity">

    <ScrollView
        android_layout_width="match_parent"
        android_layout_height="match_parent">
        <LinearLayout
            android_layout_width="match_parent"
            android_layout_height="wrap_content"
            android_layout_alignParentStart="true"
            android_layout_alignParentTop="true"
            android_orientation="vertical"
            android_layout_alignParentLeft="true">

            <ProgressBar
                android_id="@+id/progress_bar"
                style="@style/Widget.AppCompat.ProgressBar.Horizontal"
                android_layout_width="match_parent"
                android_layout_height="52dp" />

            <TextView
                android_id="@+id/headerTextView"
                android_layout_width="match_parent"
                android_layout_height="wrap_content"
                android_gravity="center"
                android_textStyle="bold"
                android_text="Enter Teacher Details"
                android_textSize="20dp" />

            <EditText
                android_id="@+id/nameEditText"
                android_layout_width="match_parent"
                android_layout_height="wrap_content"
                android_layout_marginStart="16dp"
                android_inputType="text"
                android_hint="Name"
                android_layout_marginLeft="16dp" />

            <EditText
                android_id="@+id/descriptionEditText"
                android_layout_width="match_parent"
                android_layout_height="wrap_content"
                android_layout_marginStart="16dp"
                android_minLines="3"
                android_inputType="text"
                android_hint="Description"
                android_layout_marginLeft="16dp" />

            <LinearLayout
                android_orientation="horizontal"
                android_layout_width="wrap_content"
                android_layout_height="wrap_content">
                <Button
                    android_id="@+id/button_choose_image"
                    android_layout_width="wrap_content"
                    android_layout_height="wrap_content"
                    android_layout_marginStart="16dp"
                    android_textColor="@color/white"
                    android_background="@color/colorPrimary"
                    android_text="Choose Image"
                    android_layout_marginLeft="16dp" />
                <ImageView
                    android_id="@+id/chosenImageView"
                    android_layout_width="match_parent"
                    android_layout_height="180dp" />
            </LinearLayout>
            <Button
                android_id="@+id/uploadBtn"
                android_layout_width="match_parent"
                android_layout_height="wrap_content"
                android_layout_marginStart="16dp"
                android_layout_gravity="center"
                android_background="@color/colorPrimary"
                android_textColor="@color/white"
                android_gravity="center"
                android_text="Upload"
                android_layout_marginLeft="16dp" />
        </LinearLayout>

    </ScrollView>

</LinearLayout>
```

##### (e). row_model.xml

Here's our `row_model.xml` layout.

```xml
<?xml version="1.0" encoding="utf-8"?>
<android.support.v7.widget.CardView

    android_layout_width="match_parent"

    android_layout_margin="5dp"
    card_view_cardCornerRadius="5dp"
    card_view_cardElevation="10dp"
    android_layout_height="200dp">

    <LinearLayout
        android_orientation="horizontal"
        android_layout_width="match_parent"
        android_layout_height="match_parent">
        <ImageView
            android_layout_width="150dp"
            android_layout_height="150dp"
            android_id="@+id/teacherImageView"
            android_padding="5dp"
            android_src="@drawable/placeholder" />

    <LinearLayout
        android_orientation="vertical"
        android_layout_width="wrap_content"
        android_layout_height="match_parent">
        <TextView
            android_layout_width="wrap_content"
            android_layout_height="wrap_content"
            android_textAppearance="?android:attr/textAppearanceSmall"
            android_text="Teacher Name"
            android_id="@+id/nameTextView"
            android_padding="5dp"
            android_textColor="@color/colorAccent" />
        <TextView
            android_layout_width="wrap_content"
            android_layout_height="wrap_content"
            android_textAppearance="?android:attr/textAppearanceSmall"
            android_text="Date"
            android_id="@+id/dateTextView"
            android_padding="5dp"
            android_textStyle="italic"/>

        <TextView
            android_layout_width="wrap_content"
            android_layout_height="wrap_content"
            android_textAppearance="?android:attr/textAppearanceSmall"
            android_text="Description"
            android_minLines="2"
            android_textStyle="italic"
            android_id="@+id/descriptionTextView"
            android_padding="5dp"/>

    </LinearLayout>
    </LinearLayout>

</android.support.v7.widget.CardView>
```

#### 4\. Java Classes

Here are our java classes.

##### (a). Teacher.java

Here's the `Teacher.java` class:

```java
package info.camposha.firebaserecyclerimagesuploaddownload.Model;

import com.google.firebase.database.Exclude;

public class Teacher {
    private String name;
    private String imageURL;
    private String key;
    private String description;
    private int position;

    public Teacher() {
        //empty constructor needed
    }
    public Teacher (int position){
        this.position = position;
    }
    public Teacher(String name, String imageUrl ,String Des) {
        if (name.trim().equals("")) {
            name = "No Name";
        }
        this.name = name;
        this.imageURL = imageUrl;
        this.description = Des;
    }
    public String getDescription() {
        return description;
    }
    public void setDescription(String description) {
        this.description = description;
    }

    public String getName() {
        return name;
    }
    public void setName(String name) {
        this.name = name;
    }
    public String getImageUrl() {
        return imageURL;
    }
    public void setImageUrl(String imageUrl) {
        this.imageURL = imageUrl;
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
```

This is what we call a POJO class. POJO stands for Plain Old Java Object. It's a class that represents an entity. It doesn't attempt to do any fancy stuff. Instead it just represents a data object. For example this class just represents a `Teacher` object. That Teacher has properties like `name`,`photo`,`description` etc. So we create or generate public getter and setter methods. These types of methods are simple and provide access to the private fields of a data object. `Setters` allow us to set properties to our POJO while `Getters` return the properties.

##### (b). RecyclerAdapter.java

Here's the `RecyclerAdapter.java` class:

```java
package info.camposha.firebaserecyclerimagesuploaddownload.Adapter;

import android.content.Context;
import android.support.v7.widget.RecyclerView;
import android.view.ContextMenu;
import android.view.LayoutInflater;
import android.view.Menu;
import android.view.MenuItem;
import android.view.View;
import android.view.ViewGroup;
import android.widget.ImageView;
import android.widget.TextView;

import com.squareup.picasso.Picasso;

import java.text.DateFormat;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.List;

import info.camposha.firebaserecyclerimagesuploaddownload.Model.Teacher;
import info.camposha.firebaserecyclerimagesuploaddownload.R;

public  class RecyclerAdapter extends RecyclerView.Adapter<RecyclerAdapter.RecyclerViewHolder>{
    private Context mContext;
    private List<Teacher> teachers;
    private OnItemClickListener mListener;

    public RecyclerAdapter(Context context, List<Teacher> uploads) {
        mContext = context;
        teachers = uploads;
    }

    @Override
    public RecyclerViewHolder onCreateViewHolder(ViewGroup parent, int viewType) {
        View v = LayoutInflater.from(mContext).inflate(R.layout.row_model, parent, false);
        return new RecyclerViewHolder(v);
    }

    @Override
    public void onBindViewHolder(RecyclerViewHolder holder, int position) {
        Teacher currentTeacher = teachers.get(position);
        holder.nameTextView.setText(currentTeacher.getName());
        holder.descriptionTextView.setText(currentTeacher.getDescription());
        holder.dateTextView.setText(getDateToday());
        Picasso.with(mContext)
                .load(currentTeacher.getImageUrl())
                .placeholder(R.drawable.placeholder)
                .fit()
                .centerCrop()
                .into(holder.teacherImageView);
    }

    @Override
    public int getItemCount() {
        return teachers.size();
    }

    public class RecyclerViewHolder extends RecyclerView.ViewHolder implements View.OnClickListener,
            View.OnCreateContextMenuListener, MenuItem.OnMenuItemClickListener {

        public TextView nameTextView,descriptionTextView,dateTextView;
        public ImageView teacherImageView;

        public RecyclerViewHolder(View itemView) {
            super(itemView);
            nameTextView =itemView.findViewById ( R.id.nameTextView );
            descriptionTextView = itemView.findViewById(R.id.descriptionTextView);
            dateTextView = itemView.findViewById(R.id.dateTextView);
            teacherImageView = itemView.findViewById(R.id.teacherImageView);

            itemView.setOnClickListener(this);
            itemView.setOnCreateContextMenuListener(this);
        }

        @Override
        public void onClick(View v) {
            if (mListener != null) {
                int position = getAdapterPosition();
                if (position != RecyclerView.NO_POSITION) {
                    mListener.onItemClick(position);
                }
            }
        }

        @Override
        public void onCreateContextMenu(ContextMenu menu, View v, ContextMenu.ContextMenuInfo menuInfo) {
            menu.setHeaderTitle("Select Action");
            MenuItem showItem = menu.add( Menu.NONE, 1, 1, "Show");
            MenuItem deleteItem = menu.add(Menu.NONE, 2, 2, "Delete");

            showItem.setOnMenuItemClickListener(this);
            deleteItem.setOnMenuItemClickListener(this);
        }

        @Override
        public boolean onMenuItemClick(MenuItem item) {
            if (mListener != null) {
                int position = getAdapterPosition();
                if (position != RecyclerView.NO_POSITION) {

                    switch (item.getItemId()) {
                        case 1:
                            mListener.onShowItemClick(position);
                            return true;
                        case 2:
                            mListener.onDeleteItemClick(position);
                            return true;
                    }
                }
            }
            return false;
        }
    }

    public interface OnItemClickListener {
        void onItemClick(int position);
        void onShowItemClick(int position);
        void onDeleteItemClick(int position);
    }

    public void setOnItemClickListener(OnItemClickListener listener) {
        mListener = listener;
    }
    private String getDateToday(){
        DateFormat dateFormat=new SimpleDateFormat("yyyy/MM/dd");
        Date date=new Date();
        String today= dateFormat.format(date);
        return today;
    }
}
```

One of the important and unique concepts in android development is the use of adapters when developing listing applications. Whenever we plan on working with data, we use adapters as the bridge between that data and the adapterview. This fact decouples our user interface from our data source. Thus this allows us develop apps that can easily be maintained or extended.

Hence we've created the above `RecyclerAdapter` to act as our adapter. It is promoted to an adapter by having it extend the `RecyclerView.Adapter` class. We do several things in the above class. First we have defined an innner `RecyclerViewHolder` class. That is needed as our adapter's role is not only to bind our recyclerview to our firebase data but also to inflate the layout which will make our custom itemviews.

The `RecyclerViewHolder` class will hold the widgets that will be defined in that layout. By holding them temporarily we are able to provide them to the adapter to be re-used. Thus this provides dramatic performance improvements as the inflation of layouts into views is too expensive to be performed for every item in our list. Those widgets to be held include TextViews and ImageView.

However, we've made our `RecyclerViewHolder` to implement three interfaces:

1. `View.OnClickListener` - So that we can react to our recyclerview itemviews being clicked.
2. `View.OnCreateContextMenuListener` - We will need this as we will want to create ContextMenu.
3. `MenuItem.OnMenuItemClickListener` - We will need this as we will want to react to the click events of the menu items in the contextmenu.

In the `RecyclerAdapter` class we've defined an interface with three abstract methods: 1.`onItemClick(int position)` - To be overriden to react to click events for the recyclerview itemviews.

1. `onShowItemClick(int position)` - To be overriden so as to show detail activity when a single recclerview cardview is clicked.
2. `onDeleteItemClick(int position)` - To be overriden so as to delete a single cardview or item from the recyclerview as well as from firebase database and firebase storage.

Remember in our `RecyclerAdapter` we had two main responsibilities. To inflate the custom `row_model.xml` layout and to bind data to the recyclerview. Well we overrrode two methods from `RecyclerView.Adapter` class to perform those functions. The `onCreateViewHolder` will be responsible for inflating the `row_model.xml` layout using the LayoutInflater class. On the other hand the `onBindViewHolder` will bind data to the widgets that will be rendered in the itemViews in the recyclerview. For example for the textviews we will simply use the `setText()` to bind the text data. As for the images we will use `Picasso` to load the images.

We also had defined the `getDateToday()` method to allow us get, format and return today's date.

##### (c). MainActivity.java

Here's the `MainActivity.java` class:

```java
package info.camposha.firebaserecyclerimagesuploaddownload.View;
import android.content.Intent;
import android.support.v7.app.AppCompatActivity;
import android.os.Bundle;
import android.view.View;
import android.widget.Button;

import info.camposha.firebaserecyclerimagesuploaddownload.R;

public class MainActivity extends AppCompatActivity {
    private Button openTeachersActivityBtn,openUploadActivityBtn;
    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate ( savedInstanceState );
        setContentView ( R.layout.activity_main );

        openTeachersActivityBtn = findViewById ( R.id.openTeachersActivityBtn );
        openUploadActivityBtn = findViewById ( R.id.openUploadActivityBtn );

        openTeachersActivityBtn.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View view) {
                Intent i = new Intent(MainActivity.this, ItemsActivity.class);
                startActivity(i);
            }
        });
        openUploadActivityBtn.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View view) {
                Intent i = new Intent(MainActivity.this, UploadActivity.class);
                startActivity(i);
            }
        });

    }

}
```

The role of the `MainActivity` was rather simple here. It was our home page and provided buttons to navigate us to other more useful activities. When the `openTeachersActivityBtn` is clicked we use open the `ItemsActivity`. That is the activity that will show our recyclerview with our text and images from the recyclerview. On the hand when the `openUploadActivityBtn` is clicked, we open the `UploadActivity`. That is the activity that will allow us to upload images to Firebase Storage while at the same time saving associated text in Firebase Realtime Database.

##### (d). UploadActivity.java

Here's the `UploadActivity.java` class:

```java
package info.camposha.firebaserecyclerimagesuploaddownload.View;

import android.content.ContentResolver;
import android.content.Intent;
import android.net.Uri;
import android.os.Handler;
import android.support.annotation.NonNull;
import android.support.v7.app.AppCompatActivity;
import android.os.Bundle;
import android.view.View;
import android.webkit.MimeTypeMap;
import android.widget.Button;
import android.widget.EditText;
import android.widget.ImageView;
import android.widget.ProgressBar;
import android.widget.Toast;

import com.google.android.gms.tasks.OnFailureListener;
import com.google.android.gms.tasks.OnSuccessListener;
import com.google.firebase.database.DatabaseReference;
import com.google.firebase.database.FirebaseDatabase;
import com.google.firebase.storage.FirebaseStorage;
import com.google.firebase.storage.OnProgressListener;
import com.google.firebase.storage.StorageReference;
import com.google.firebase.storage.StorageTask;
import com.google.firebase.storage.UploadTask;
import com.squareup.picasso.Picasso;

import info.camposha.firebaserecyclerimagesuploaddownload.Model.Teacher;
import info.camposha.firebaserecyclerimagesuploaddownload.R;

public class UploadActivity extends AppCompatActivity{

    private static final int PICK_IMAGE_REQUEST = 1;

    private Button chooseImageBtn;
    private Button uploadBtn;
    private EditText nameEditText;
    private EditText descriptionEditText;
    private ImageView chosenImageView;
    private ProgressBar uploadProgressBar;

    private Uri mImageUri;

    private StorageReference mStorageRef;
    private DatabaseReference mDatabaseRef;

    private StorageTask mUploadTask;
    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate ( savedInstanceState );
        setContentView ( R.layout.activity_upload );

        chooseImageBtn = findViewById(R.id.button_choose_image);
        uploadBtn = findViewById(R.id.uploadBtn);
        nameEditText = findViewById(R.id.nameEditText);
        descriptionEditText = findViewById ( R.id.descriptionEditText );
        chosenImageView = findViewById(R.id.chosenImageView);
        uploadProgressBar = findViewById(R.id.progress_bar);

        mStorageRef = FirebaseStorage.getInstance().getReference("teachers_uploads");
        mDatabaseRef = FirebaseDatabase.getInstance().getReference("teachers_uploads");

        chooseImageBtn.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                openFileChooser();
            }
        });

        uploadBtn.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                if (mUploadTask != null && mUploadTask.isInProgress()) {
                    Toast.makeText(UploadActivity.this, "An Upload is Still in Progress", Toast.LENGTH_SHORT).show();
                } else {
                    uploadFile();
                }
            }
        });
    }
    private void openFileChooser() {
        Intent intent = new Intent();
        intent.setType("image/*");
        intent.setAction(Intent.ACTION_GET_CONTENT);
        startActivityForResult(intent, PICK_IMAGE_REQUEST);
    }

    @Override
    protected void onActivityResult(int requestCode, int resultCode, Intent data) {
        super.onActivityResult(requestCode, resultCode, data);

        if (requestCode == PICK_IMAGE_REQUEST && resultCode == RESULT_OK
                && data != null && data.getData() != null) {
            mImageUri = data.getData();

            Picasso.with(this).load(mImageUri).into(chosenImageView);
        }
    }

    private String getFileExtension(Uri uri) {
        ContentResolver cR = getContentResolver();
        MimeTypeMap mime = MimeTypeMap.getSingleton();
        return mime.getExtensionFromMimeType(cR.getType(uri));
    }

    private void uploadFile() {
        if (mImageUri != null) {
            StorageReference fileReference = mStorageRef.child(System.currentTimeMillis()
                    + "." + getFileExtension(mImageUri));

            uploadProgressBar.setVisibility(View.VISIBLE);
            uploadProgressBar.setIndeterminate(true);

            mUploadTask = fileReference.putFile(mImageUri)
                    .addOnSuccessListener(new OnSuccessListener<UploadTask.TaskSnapshot> () {
                        @Override
                        public void onSuccess(UploadTask.TaskSnapshot taskSnapshot) {
                            Handler handler = new Handler();
                            handler.postDelayed(new Runnable() {
                                @Override
                                public void run() {
                                    uploadProgressBar.setVisibility(View.VISIBLE);
                                    uploadProgressBar.setIndeterminate(false);
                                    uploadProgressBar.setProgress(0);
                                }
                            }, 500);

                            Toast.makeText(UploadActivity.this, "Teacher  Upload successful", Toast.LENGTH_LONG).show();
                            Teacher upload = new Teacher(nameEditText.getText().toString().trim(),
                                    taskSnapshot.getDownloadUrl().toString(),
                                    descriptionEditText.getText ().toString ());

                            String uploadId = mDatabaseRef.push().getKey();
                            mDatabaseRef.child(uploadId).setValue(upload);

                            uploadProgressBar.setVisibility(View.INVISIBLE);
                            openImagesActivity ();

                        }
                    })
                    .addOnFailureListener(new OnFailureListener () {
                        @Override
                        public void onFailure(@NonNull Exception e) {
                            uploadProgressBar.setVisibility(View.INVISIBLE);
                            Toast.makeText(UploadActivity.this, e.getMessage(), Toast.LENGTH_SHORT).show();
                        }
                    })
                    .addOnProgressListener(new OnProgressListener<UploadTask.TaskSnapshot> () {
                        @Override
                        public void onProgress(UploadTask.TaskSnapshot taskSnapshot) {
                            double progress = (100.0 * taskSnapshot.getBytesTransferred() / taskSnapshot.getTotalByteCount());
                            uploadProgressBar.setProgress((int) progress);
                        }
                    });
        } else {
            Toast.makeText(this, "You haven't Selected Any file selected", Toast.LENGTH_SHORT).show();
        }
    }
    private void openImagesActivity(){
        Intent intent = new Intent(this, MainActivity.class);
        startActivity(intent);
    }
}
```

The `UploadActivity` will allow us to post data, both text and images to Firebase. It does this by first uploading the image in Firebase Storage. Then it retrieves the uploaded image's id and saves it along other text in Firebase Realtime Database.

We will start by preparing an associated layout for this activity. Conventionally, we've called that ayout `activity_upload.xml`. Here we've defined several widgets like EditTexts for typing text and a button that allows us invoke the system Filepicker. Then the user can visually pick a single image and that image will be rendered in an imageview just as a visual feedback to the user. We will also have a ProgressBar to be shown as we upload our data. That upload will start the moment the user clicks the upload button.

Apart from the UI widgets, we had also defined some objects as instance fields. They include:

1. `mImageUri` - A `Uri` object. This will hold the Uri of the image the user will pick.
2. `mStorageRef` - A `StorageReference` object. This will hold the Firebase Storage reference.
3. `mDatabaseRef` - A `DatabaseReference` object. This will hold the Firebase Realtime database reference.
4. `UploadTask` - A `StorageTask` object. We will check this one to know if our upload task is still in progress or not. If it is in progress, then we will notify the user to wait for the upload to finish, otherwise we proceed with the upload.

##### (e). ItemsActivity.java

Here's the `ItemsActivity.java` class:

```java
package info.camposha.firebaserecyclerimagesuploaddownload.View;

import android.content.Intent;
import android.support.v7.app.AppCompatActivity;
import android.os.Bundle;
import android.support.v7.widget.LinearLayoutManager;
import android.support.v7.widget.RecyclerView;
import android.view.View;
import android.widget.ProgressBar;
import android.widget.Toast;
import com.google.android.gms.tasks.OnSuccessListener;
import com.google.firebase.database.DataSnapshot;
import com.google.firebase.database.DatabaseError;
import com.google.firebase.database.DatabaseReference;
import com.google.firebase.database.FirebaseDatabase;
import com.google.firebase.database.ValueEventListener;
import com.google.firebase.storage.FirebaseStorage;
import com.google.firebase.storage.StorageReference;

import java.util.ArrayList;
import java.util.List;

import info.camposha.firebaserecyclerimagesuploaddownload.Adapter.RecyclerAdapter;
import info.camposha.firebaserecyclerimagesuploaddownload.Model.Teacher;
import info.camposha.firebaserecyclerimagesuploaddownload.R;

public class ItemsActivity extends AppCompatActivity implements RecyclerAdapter.OnItemClickListener{

    private RecyclerView mRecyclerView;
    private RecyclerAdapter mAdapter;
    private ProgressBar mProgressBar;
    private FirebaseStorage mStorage;
    private DatabaseReference mDatabaseRef;
    private ValueEventListener mDBListener;
    private List<Teacher> mTeachers;

    private void openDetailActivity(String[] data){
        Intent intent = new Intent(this, DetailsActivity.class);
        intent.putExtra("NAME_KEY",data[0]);
        intent.putExtra("DESCRIPTION_KEY",data[1]);
        intent.putExtra("IMAGE_KEY",data[2]);
        startActivity(intent);
    }
    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate ( savedInstanceState );
        setContentView ( R.layout.activity_items );

        mRecyclerView = findViewById(R.id.mRecyclerView);
        mRecyclerView.setHasFixedSize(true);
        mRecyclerView.setLayoutManager(new LinearLayoutManager (this));

        mProgressBar = findViewById(R.id.myDataLoaderProgressBar);
        mProgressBar.setVisibility(View.VISIBLE);

        mTeachers = new ArrayList<> ();
        mAdapter = new RecyclerAdapter (ItemsActivity.this, mTeachers);
        mRecyclerView.setAdapter(mAdapter);
        mAdapter.setOnItemClickListener(ItemsActivity.this);

        mStorage = FirebaseStorage.getInstance();
        mDatabaseRef = FirebaseDatabase.getInstance().getReference("teachers_uploads");

        mDBListener = mDatabaseRef.addValueEventListener(new ValueEventListener() {
            @Override
            public void onDataChange(DataSnapshot dataSnapshot) {

                mTeachers.clear();

                for (DataSnapshot teacherSnapshot : dataSnapshot.getChildren()) {
                    Teacher upload = teacherSnapshot.getValue(Teacher.class);
                    upload.setKey(teacherSnapshot.getKey());
                    mTeachers.add(upload);
                }
                mAdapter.notifyDataSetChanged();
                mProgressBar.setVisibility(View.GONE);
            }

            @Override
            public void onCancelled(DatabaseError databaseError) {
                Toast.makeText(ItemsActivity.this, databaseError.getMessage(), Toast.LENGTH_SHORT).show();
                mProgressBar.setVisibility(View.INVISIBLE);
            }
        });

    }
    public void onItemClick(int position) {
        Teacher clickedTeacher=mTeachers.get(position);
        String[] teacherData={clickedTeacher.getName(),clickedTeacher.getDescription(),clickedTeacher.getImageUrl()};
        openDetailActivity(teacherData);
    }

    @Override
    public void onShowItemClick(int position) {
        Teacher clickedTeacher=mTeachers.get(position);
        String[] teacherData={clickedTeacher.getName(),clickedTeacher.getDescription(),clickedTeacher.getImageUrl()};
        openDetailActivity(teacherData);
    }

    @Override
    public void onDeleteItemClick(int position) {
        Teacher selectedItem = mTeachers.get(position);
        final String selectedKey = selectedItem.getKey();

        StorageReference imageRef = mStorage.getReferenceFromUrl(selectedItem.getImageUrl());
        imageRef.delete().addOnSuccessListener(new OnSuccessListener<Void> () {
            @Override
            public void onSuccess(Void aVoid) {
                mDatabaseRef.child(selectedKey).removeValue();
                Toast.makeText(ItemsActivity.this, "Item deleted", Toast.LENGTH_SHORT).show();
            }
        });

    }
    protected void onDestroy() {
        super.onDestroy();
        mDatabaseRef.removeEventListener(mDBListener);
    }

}
```

##### (f). DetailsActivity.java

Here's the `DetailsActivity.java` class:

```java
package info.camposha.firebaserecyclerimagesuploaddownload.View;

import android.content.Intent;
import android.os.Bundle;
import android.support.v7.app.AppCompatActivity;
import android.widget.ImageView;
import android.widget.TextView;

import com.squareup.picasso.Picasso;

import java.text.DateFormat;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.Random;

import info.camposha.firebaserecyclerimagesuploaddownload.R;

public class DetailsActivity extends AppCompatActivity {

    TextView nameDetailTextView,descriptionDetailTextView,dateDetailTextView,categoryDetailTextView;
    ImageView teacherDetailImageView;

    private void initializeWidgets(){
        nameDetailTextView= findViewById(R.id.nameDetailTextView);
        descriptionDetailTextView= findViewById(R.id.descriptionDetailTextView);
        dateDetailTextView= findViewById(R.id.dateDetailTextView);
        categoryDetailTextView= findViewById(R.id.categoryDetailTextView);
        teacherDetailImageView=findViewById(R.id.teacherDetailImageView);
    }
    private String getDateToday(){
        DateFormat dateFormat=new SimpleDateFormat("yyyy/MM/dd");
        Date date=new Date();
        String today= dateFormat.format(date);
        return today;
    }
    private String getRandomCategory(){
        String[] categories={"ZEN","BUDHIST","YOGA"};
        Random random=new Random();
        int index=random.nextInt(categories.length-1);
        return categories[index];
    }

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_detail);

        initializeWidgets();

        //RECEIVE DATA FROM ITEMSACTIVITY VIA INTENT
        Intent i=this.getIntent();
        String name=i.getExtras().getString("NAME_KEY");
        String description=i.getExtras().getString("DESCRIPTION_KEY");
        String imageURL=i.getExtras().getString("IMAGE_KEY");

        //SET RECEIVED DATA TO TEXTVIEWS AND IMAGEVIEWS
        nameDetailTextView.setText(name);
        descriptionDetailTextView.setText(description);
        dateDetailTextView.setText("#post_date: "+getDateToday());
        categoryDetailTextView.setText("CATEGORY: "+getRandomCategory());
        Picasso.with(this)
                .load(imageURL)
                .placeholder(R.drawable.placeholder)
                .fit()
                .centerCrop()
                .into(teacherDetailImageView);

    }

}
```

##### Download
