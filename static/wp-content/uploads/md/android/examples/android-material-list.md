# MaterialList Examples


There is an old but beautiful library known as MaterialList which you can easily use to create a list of items containing text, images and buttons. Even though old, it's still quite usable and works and is actually built on top of recyclerview. We use this library as option for you if you want a simple way to render items in a list without creating an adapter.


## Example 1: Android Material List – With Texts,Images and Action Buttons

_Android Material List Example - Title,Description, Images and action buttons_

In this class,we see how to work with [Material List](https://github.com/dexafree/MaterialList), an Android library aimed to get the beautiful CardViews that Google shows at its official design specifications.

We are going to fill it with an array of objects. In this example we use Galaxy object. Each galaxy has a title, a description, an image and two action buttons. We then see how to handle the click events for these CardView action buttons, hence shoing a toast message. This library is built on top of RecyclerView, hence its very flexible.

It's very easy to create a list of cards, you don't need any boilerplate adapter code. You can just instantiate a Card object and using builder style append a title,subtitle,description,image etc.

### Screenshot

- Here's the screenshot of the project.

Android Material List Button One Click:

![Android Material List Button One Click](https://github.com/Oclemy/MaterialCardsArray/blob/master/demos/MaterialArray1.png?raw=true)

Android Material List Button Two Click:

![Android Material List Button Two Click](https://github.com/Oclemy/MaterialCardsArray/blob/master/demos/MaterialArray2.png?raw=true)

Android Material List : Project Structure.

![Android Material List Example Project Structure](https://github.com/Oclemy/MaterialCardsArray/blob/master/demos/ProjectStructure.png?raw=true)

### Common Questions this example explores

- Android Material List Example.
- Android Material List with text, images and action buttons.
- CardViews with images and action buttons.

### Tools Used

This example was written with the following tools:

- Windows 8
- AndroidStudio IDE
- Genymotion Emulator
- Language : Java
- Topic : Material List, Material ListView, RecyclerView, Cards

### Libaries Used

- We use Material List library [https://github.com/dexafree/MaterialList](https://github.com/dexafree/MaterialList)

### Source Code

Lets jump directly to the source code.

#### Build.Gradle App Level

- Our app level build.gradle file.
- We specify compilesdk,minimum sdk,target sdk and dependencies.
- Note that the minimum sdk for this project isn't that strict,it is much lower than that specified below.
- We also add dependencies using 'compile' statement.
- Our activity shall derive from the appCompatActivity to make it target earlier android versions.
- We also specify constraint-library as our activity_main.xml will use it as the root tag.
- Finally we add the com.github.dexafree:materiallist which which is a third party library built on top of Recycleriew. We'll use it to create amazing Cards.

```groovy
apply plugin: 'com.android.application'

android {
    compileSdkVersion 26
    buildToolsVersion "26.0.0"
    defaultConfig {
        applicationId "com.tutorials.hp.materialarray"
        minSdkVersion 15
        targetSdkVersion 26
        versionCode 1
        versionName "1.0"
        testInstrumentationRunner "android.support.test.runner.AndroidJUnitRunner"
    }
    buildTypes {
        release {
            minifyEnabled false
            proguardFiles getDefaultProguardFile('proguard-android.txt'), 'proguard-rules.pro'
        }
    }
}

dependencies {
    compile fileTree(dir: 'libs', include: ['*.jar'])
    compile 'com.android.support:appcompat-v7:26.+'
    compile 'com.android.support:design:26.+'

    compile 'com.android.support.constraint:constraint-layout:1.0.0-alpha7'
    compile 'com.github.dexafree:materiallist:3.2.1'

}
```

#### Galaxy.java

- Our data object class
- Represents a single galaxy with name,description and image.
- Takes in property values via Constructor.
- Exposes them via getter methods.

```java
package com.tutorials.hp.materialarray;

public class Galaxy {
    private String name,description;
    private int image;

    public Galaxy(String name, String description, int image) {
        this.name = name;
        this.description = description;
        this.image = image;
    }

    public String getName() {
        return name;
    }

    public String getDescription() {
        return description;
    }

    public int getImage() {
        return image;
    }

}
```

#### MainActivity.java

- Our MainActivity.
- Derives from AppCompatActivity, which is a Base class for activities that use the support library action bar features.
- Inflates ActivityMain.xml layout using setContentView() method.
- Views shown include a GridView.
- Methods: onCreate(),initialViews(),createCard(),getData().
- The purpose of this activity is to create an Array of Cards with title,description,images and action button and add them to material list.

```java
package com.tutorials.hp.materialarray;

import android.support.annotation.NonNull;
import android.support.v7.app.AppCompatActivity;
import android.os.Bundle;
import android.view.Gravity;
import android.view.View;
import android.widget.Toast;
import com.dexafree.materialList.card.Card;
import com.dexafree.materialList.card.CardProvider;
import com.dexafree.materialList.card.OnActionClickListener;
import com.dexafree.materialList.card.action.TextViewAction;
import com.dexafree.materialList.view.MaterialListView;
import com.squareup.picasso.RequestCreator;

public class MainActivity extends AppCompatActivity {

    MaterialListView materialListView;

    /*
    - When activity is created
     */
    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);

        this.initializeViews();
        this.bindData();
    }

    /*
    - Initialize Material ListView.
     */
    private void initializeViews()
    {
        materialListView= (MaterialListView) findViewById(R.id.material_listview);
    }

    /*
    - Bind data to Material ListView.
     */
    private void bindData() {
        for (Galaxy g : getData()) {
            this.createCard(g);
        }
    }
    /*
    - Create a CardView with title,description, image and image.
     */
    private void createCard(final Galaxy g){
        Card card = new Card.Builder(this)
                .withProvider(new CardProvider())
                .setLayout(R.layout.material_basic_image_buttons_card_layout)
                .setTitle(g.getName())
                .setTitleGravity(Gravity.END)
                .setDescription(g.getDescription())
                .setDescriptionGravity(Gravity.END)
                .setDrawable(g.getImage())
                .setDrawableConfiguration(new CardProvider.OnImageConfigListener() {
                    @Override
                    public void onImageConfigure(@NonNull RequestCreator requestCreator) {
                        //requestCreator.fit();
                        requestCreator.resize(121,121);
                    }
                })
                .addAction(R.id.left_text_button, new TextViewAction(this)
                        .setText("Button 1")
                        .setTextResourceColor(R.color.colorAccent)
                        .setListener(new OnActionClickListener() {
                            @Override
                            public void onActionClicked(View view, Card card) {
                                Toast.makeText(getApplicationContext(), "Right button on card " +g.getName(), Toast.LENGTH_SHORT).show();
                            }
                        }))
                .addAction(R.id.right_text_button, new TextViewAction(this)
                        .setText("Button 2")
                        .setTextResourceColor(R.color.orange_button)
                        .setListener(new OnActionClickListener() {
                            @Override
                            public void onActionClicked(View view, Card card) {
                                Toast.makeText(getApplication(), "Right button on card " + card.getProvider().getDescription(), Toast.LENGTH_SHORT).show();
                            }
                        }))
                .endConfig()
                .build();

        // Add Card to ListView
        materialListView.getAdapter().add(card);
    }

    /*
    - Our data source
     */
    private Galaxy[] getData()
    {
        Galaxy[] galaxies = new Galaxy[10];

        Galaxy g=new Galaxy("Whirlpool",
                "The Whirlpool Galaxy, also known as Messier 51a, M51a, and NGC 5194, is an interacting grand-design spiral galaxy with a Seyfert 2 active galactic nucleus in the constellation Canes Venatici.",
                R.drawable.whirlpool);
        galaxies[0]=g;

        g=new Galaxy("Triangulumn",
                "The Triangulum Galaxy is a spiral galaxy approximately 3 million light-years from Earth in the constellation Triangulum",
                R.drawable.triangulum);
        galaxies[1]=g;

        g=new Galaxy("Milky Way",
                "The Milky Way is the galaxy that contains our Solar System." +
                " The descriptive milky is derived from the appearance from Earth of the galaxy – a band of light seen in the night sky formed from stars",
                R.drawable.milkyway);
        galaxies[2]=g;

        g=new Galaxy("Andromeda",
                "The Andromeda Galaxy, also known as Messier 31, M31, or NGC 224, is a spiral galaxy approximately 780 kiloparsecs from Earth. It is the nearest major galaxy to the Milky Way and was often referred to as the Great Andromeda Nebula in older texts.",
                R.drawable.andromeda);
        galaxies[3]=g;

        g=new Galaxy("StarBust",
                "A starburst galaxy is a galaxy undergoing an exceptionally high rate of star formation, as compared to the long-term average rate of star formation in the galaxy or the star formation rate observed in most other galaxies. ",
                R.drawable.starbust);
        galaxies[4]=g;

        g=new Galaxy("Messier 81",
                "Messier 81 is a spiral galaxy about 12 million light-years away in the constellation Ursa Major. Due to its proximity to Earth, large size and active galactic nucleus, Messier 81 has been studied extensively by professional astronomers.",
                R.drawable.messier81);
        galaxies[5]=g;

        g=new Galaxy("Sombrero",
                "Sombrero Galaxy is an unbarred spiral galaxy in the constellation Virgo located 31 million light-years from Earth. The galaxy has a diameter of approximately 50,000 light-years, 30% the size of the Milky Way.",
                R.drawable.sombrero);
        galaxies[6]=g;

        g=new Galaxy("Pinwheel",
                "The Pinwheel Galaxy is a face-on spiral galaxy distanced 21 million light-years away from earth in the constellation Ursa Major. ",
                R.drawable.pinwheel);
        galaxies[7]=g;

        g=new Galaxy("Canis Majos Overdensity",
                "The Canis Major Dwarf Galaxy or Canis Major Overdensity is a disputed dwarf irregular galaxy in the Local Group, located in the same part of the sky as the constellation Canis Major. ",
                R.drawable.canismajoroverdensity);
        galaxies[8]=g;

        g=new Galaxy("Cosmos Redshift",
                "Cosmos Redshift 7 is a high-redshift Lyman-alpha emitter galaxy, in the constellation Sextans, about 12.9 billion light travel distance years from Earth, reported to contain the first stars —formed ",
                R.drawable.cosmosredshift);
        galaxies[9]=g;

        return galaxies;
    }
}
```

#### ActivityMain.xml

- ActivityMain.xml layout.
- Our MainActivity Layout.
- Root tag is ConstraintLayout ViewGroup.
- We then add MaterialListView, which is a child of RecyclerView.

```xml
<?xml version="1.0" encoding="utf-8"?>

<android.support.constraint.ConstraintLayout

    android_layout_width="match_parent"
    android_layout_height="match_parent"
    tools_context="com.tutorials.hp.materialarray.MainActivity">

    <com.dexafree.materialList.view.MaterialListView
        android_layout_width="fill_parent"
        android_layout_height="fill_parent"
        android_id="@+id/material_listview"/>

</android.support.constraint.ConstraintLayout>
```

#### Video/Preview

- We have a [YouTube channel](https://www.youtube.com/c/ProgrammingWizards) with almost a thousand tutorials, this one below being one of them.

[https://www.youtube.com/watch?v=Mcr4hmWQcQ8](https://www.youtube.com/watch?v=Mcr4hmWQcQ8)

#### Download

- You can Download the full Project below. Source code is well commented.

[Download](https://github.com/Oclemy/MaterialCardsArray/archive/master.zip)

**How To Run**

1. Download the project above.
2. You'll get a zipped file,extract it.
3. Open the Android Studio.
4. Now close, already open project.
5. From the Menu bar click on File >New> Import Project.
6. Now Choose a Destination Folder, from where you want to import project.
7. Choose an Android Project.
8. Now Click on “OK“.
9. Done, your done importing the project,now edit it.

### YouTube

- Visit our [channel](https://www.youtube.com/c/ProgrammingWizards) for more examples like these.

### Facebook

- Lets share tips and ideas in our [Facebook Page](https://web.facebook.com/oclemmy/).

## Example 2: Android Material List – Master Detail CRUD – ADD,UPDATE,DELETE

_Android Material Design Master detail example with Material ListView and Cards - ADD, UPDATE AND DELETE DATA_

Android Master detail CRUD example with material listview right here. We see how to add ,edit and delete data to and from our material list from our crud activity.

Each material Card in our list has two buttons new and edit. When new is clicked we open crud activity for adding new data. When edit is clicked we open the same activity for editing selected data.

To edit we pass a serialized object to Crud activity. Users can not only edit that passed data but also delete it. We use a class with a static arraylist as our data source. We will buiding our input forms programmatically using [Form-Master](https://github.com/adib2149/FormMaster) library, alibrary that enables you build bigger forms with headers easily programmatically.

**Common Questions this example explores**

- Android Material List CRUD master detail example.
- Android Material ListView add update delete with Cards.
- Android open activity and pass serialized object.

**Tools Used**

This example was written with the following tools:

- Windows 8
- AndroidStudio IDE
- Genymotion Emulator
- Language : Java
- Topic : Material List CRUD, Material List Master Detail, Activity master detail

**Libaries Used**

- We use Material List library [https://github.com/dexafree/MaterialList](https://github.com/dexafree/MaterialList) and form-master library [https://github.com/adib2149/FormMaster](https://github.com/adib2149/FormMaster) for building our CRUD form.

Lets jump directly to the source code.

**1\. Build.Gradle App Level**

- Our app level build.gradle file.
- Our minimum sdk version is API level 16 as we are using the FormMaster library to build input forms.
- We also add material list library.

```groovy
apply plugin: 'com.android.application'

android {
    compileSdkVersion 26
    buildToolsVersion "26.0.0"
    defaultConfig {
        applicationId "com.tutorials.hp.materiallistviewmasterdetail"
        minSdkVersion 16
        targetSdkVersion 26
        versionCode 1
        versionName "1.0"
        testInstrumentationRunner "android.support.test.runner.AndroidJUnitRunner"
    }
    buildTypes {
        release {
            minifyEnabled false
            proguardFiles getDefaultProguardFile('proguard-android.txt'), 'proguard-rules.pro'
        }
    }
}

dependencies {
    compile fileTree(dir: 'libs', include: ['*.jar'])

    compile 'com.android.support:appcompat-v7:26.+'
    compile 'com.android.support:design:26.+'
    compile 'com.android.support.constraint:constraint-layout:1.0.0-alpha7'
    compile 'com.github.dexafree:materiallist:3.2.1'
    compile 'me.riddhimanadib.form-master:form-master:1.0.2'
}
```

**2\. Galaxy.java**

- Our Galaxy class.
- Our data object. Properties are name,description and image.
- Implements Serializable class.

```java
package com.tutorials.hp.materiallistviewmasterdetail.mData;

import java.io.Serializable;

public class Galaxy implements Serializable{

    private String name,description;
    private int id,image;
    /*
    - Constructor
     */
    public Galaxy(String name, String description, int id, int image) {
        this.name = name;
        this.description = description;
        this.id = id;
        this.image = image;
    }
    /*
    - Getters
     */
    public String getName() {
        return name;
    }
    public String getDescription() {
        return description;
    }
    public int getId() {
        return id;
    }
    public int getImage() {
        return image;
    }
}
```

**3\. DataHolder.java**

- Our data holder class
- Contains a static arraylist that acts as our data source.

```java
package com.tutorials.hp.materiallistviewmasterdetail.mData;

import com.tutorials.hp.materiallistviewmasterdetail.R;
import java.util.ArrayList;

public class DataHolder {

    public static ArrayList<Galaxy> galaxies=new ArrayList<>();
    /*
    - Return galaxies with initial data.
     */
    public static ArrayList<Galaxy> getData()
    {
        if(galaxies.size() == 0)
        {
            Galaxy g=new Galaxy("Galaxy Title","This is the description...",galaxies.size(), R.drawable.cartwheel);
            galaxies.add(g);
        }
        return galaxies;
    }
}
```

**4\. MainActivity.java**

- Our MainActivity class.
- Derives from AppCompatActivity.
- Methods: onCreate(),initializeViews(),bindData(),createCard(),onResume().
- We use MaterializeListView as our adapterview to display cards.
- We create material cards using createCard() method.
- We bind data to our cards using bindData() method.
- When new button in card is clicked we open crud activity for adding new data.
- When edit button is clicked we open crud activity for editing data.

```java
package com.tutorials.hp.materiallistviewmasterdetail;

import android.content.Context;
import android.content.Intent;
import android.os.Bundle;
import android.support.annotation.NonNull;
import android.support.v7.app.AppCompatActivity;
import android.view.Gravity;
import android.view.View;

import com.dexafree.materialList.card.Card;
import com.dexafree.materialList.card.CardProvider;
import com.dexafree.materialList.card.OnActionClickListener;
import com.dexafree.materialList.card.action.TextViewAction;
import com.dexafree.materialList.view.MaterialListView;
import com.squareup.picasso.RequestCreator;
import com.tutorials.hp.materiallistviewmasterdetail.mData.DataHolder;
import com.tutorials.hp.materiallistviewmasterdetail.mData.Galaxy;

public class MainActivity extends AppCompatActivity {

    MaterialListView materialListView;
    /*
    - When activity is created
     */
    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);

        this.initializeViews();
    }

    /*
    - Initial Material ListView.
     */
    private void initializeViews() {
        materialListView = (MaterialListView) findViewById(R.id.material_listview);
    }

    /*
    - Bind data to Material ListView.
     */
    private void bindData() {
    materialListView.getAdapter().clearAll();
        for (Galaxy g : DataHolder.getData()) {
            this.createCard(g);
        }
    }
    /*
    - Create Card.
    - Set its title,description and image.
    - Handle action button click events.
    - Set card to adapter.
    - Set adapter to listview.
     */
    private void createCard(final Galaxy g) {
        Card card = new Card.Builder(this)
                .withProvider(new CardProvider())
               .setLayout(R.layout.material_basic_image_buttons_card_layout)
                //.setLayout(R.layout.material_image_with_buttons_card)
                //.setLayout(R.layout.material_basic_buttons_card)
                //.setLayout(R.layout.material_welcome_card_layout)
                //.setLayout(R.layout.material_small_image_card)
               //.setLayout(R.layout.material_big_image_card_layout)
                .setTitle(g.getName())
                .setTitleGravity(Gravity.CENTER_HORIZONTAL)
                .setDescription(g.getDescription())
                .setDescriptionGravity(Gravity.CENTER_HORIZONTAL)
                .setDrawable(g.getImage())
                .setDrawableConfiguration(new CardProvider.OnImageConfigListener() {
                    @Override
                    public void onImageConfigure(@NonNull RequestCreator requestCreator) {
                        //requestCreator.fit();
                        requestCreator.resize(121,121);
                    }
                })
                .addAction(R.id.left_text_button, new TextViewAction(this)
                        .setText("New")
                        .setTextResourceColor(R.color.colorPrimary)
                        .setListener(new OnActionClickListener() {
                            @Override
                            public void onActionClicked(View view, Card card) {
                                Intent i = new Intent(MainActivity.this, CrudActivity.class);
                                Context c = MainActivity.this;
                                c.startActivity(i);
                            }
                        }))
                .addAction(R.id.right_text_button, new TextViewAction(this)
                        .setText("Edit")
                        .setTextResourceColor(R.color.orange_button)
                        .setListener(new OnActionClickListener() {
                            @Override
                            public void onActionClicked(View view, Card card) {
                                Intent i = new Intent(MainActivity.this, CrudActivity.class);
                                i.putExtra("KEY_GALAXY", g);
                                Context c = MainActivity.this;
                                c.startActivity(i);
                            }
                        }))
                .endConfig()
                .build();

        //Add Card to Adapter and set the adapter to material listview.
        materialListView.getAdapter().add(card);
    }

    /*
    - When activity is resumed, bind data
     */
    @Override
    protected void onResume() {
        super.onResume();
    this.bindData();
    }
}
```

**5\. CrudActivity.java**

- CRUD activity.
- Derives from appcompatactivity.
- Receive data from MainActivity.
- Add/Edit/Delete data.
- We receive serialized data from mainactivity and deserialize it to get Galaxy object to update.
- Otherwise if its null then the activity has been opened or adding new data.

```java
package com.tutorials.hp.materiallistviewmasterdetail;

import android.content.Intent;
import android.os.Bundle;
import android.support.v7.app.AppCompatActivity;
import android.support.v7.widget.RecyclerView;
import android.view.View;
import android.widget.Button;
import android.widget.Toast;
import com.tutorials.hp.materiallistviewmasterdetail.mData.DataHolder;
import com.tutorials.hp.materiallistviewmasterdetail.mData.Galaxy;
import java.util.ArrayList;
import java.util.List;
import me.riddhimanadib.formmaster.helper.FormBuildHelper;
import me.riddhimanadib.formmaster.model.FormElement;
import me.riddhimanadib.formmaster.model.FormHeader;
import me.riddhimanadib.formmaster.model.FormObject;

public class CrudActivity extends AppCompatActivity {

    RecyclerView recyclerviewForm;
    FormBuildHelper mFormBuilder;
    Button saveBtn,deleteBtn;
    Galaxy galaxy;
    Boolean isForUpdate = true;
    /*
    - When activity is created.
     */
    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_crud);

        this.receiveData();
        this.initializeViews();
    }
    /*
    - Initial Views.
    - Create Form Elements.
    - Add/Edit/Delete data.
     */
    private void initializeViews() {
        // Views
        recyclerviewForm = (RecyclerView) findViewById(R.id.recyclerviewForm);
        saveBtn = (Button) findViewById(R.id.saveBtn);
        deleteBtn = (Button) findViewById(R.id.deleteBtn);
        deleteBtn.setEnabled(isForUpdate);

        mFormBuilder = new FormBuildHelper(this, recyclerviewForm);

        //CREATE FORM ELEMENTS
        FormHeader header = FormHeader.createInstance().setTitle("Galaxy Info");
        final FormElement nameEditText = FormElement.createInstance().setType(FormElement.TYPE_EDITTEXT_TEXT_SINGLELINE).setTitle("Galaxy").setHint("galaxy");
        final FormElement descEditText = FormElement.createInstance().setType(FormElement.TYPE_EDITTEXT_TEXT_MULTILINE).setTitle("Description");

        if (isForUpdate) {
            //UPDATE EDITTEXTS WITH GALAXY VALUES
            nameEditText.setValue(galaxy.getName());
            descEditText.setValue(galaxy.getDescription());
        }
        // ADD FORM ELEMENTS TO LIST
        List<FormObject> formItems = new ArrayList<>();
        formItems.add(header);
        formItems.add(nameEditText);
        formItems.add(descEditText);

        // BUILD AND DISPLAY FORM
        mFormBuilder.addFormElements(formItems);
        mFormBuilder.refreshView();

        //SAVE EITHER AFTER EDITING OR FOR NEW ITEM
        saveBtn.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View view) {

                if (!isForUpdate) {
                    //ADD NEW GALAXY
                    int id = DataHolder.galaxies.size();
                    Galaxy galaxy = new Galaxy(nameEditText.getValue(), descEditText.getValue(), id, R.drawable.cartwheel);
                    DataHolder.galaxies.add(galaxy);

                    //RESET UI
                    nameEditText.setValue("");
                    descEditText.setValue("");
                    mFormBuilder.refreshView();

                    Toast.makeText(getApplicationContext(), "Successfully Saved Data", Toast.LENGTH_SHORT).show();

                } else {

                    if (galaxy != null) {
                        //UPDATE EXISTING DATA
                        int position = galaxy.getId();
                        DataHolder.galaxies.remove(position);
                        Galaxy newGalaxy = new Galaxy(nameEditText.getValue(), descEditText.getValue(), position, R.drawable.canismajoroverdensity);
                        DataHolder.galaxies.add(position, newGalaxy);

                        Toast.makeText(getApplicationContext(), "Successfully Updated Item", Toast.LENGTH_SHORT).show();
                    }
                    else
                    {
                        Toast.makeText(getApplicationContext(), "Galaxy is null.", Toast.LENGTH_SHORT).show();
                    }
                }
            }
        });

        //DELETE DATA
        deleteBtn.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View view) {
                if(isForUpdate)
                {
                    if (galaxy != null)
                    {
                        //GET ITEM POSITION AND DELETE
                        int position = galaxy.getId();
                        DataHolder.galaxies.remove(position);

                        //RESET UI
                        nameEditText.setValue("");
                        descEditText.setValue("");
                        mFormBuilder.refreshView();
                        deleteBtn.setEnabled(isForUpdate=false);
                        saveBtn.setEnabled(false);

                        Toast.makeText(getApplicationContext(), "Deleted Successfully.", Toast.LENGTH_SHORT).show();
                    }
                }
            }
        });
    }

    //RECEIVE SERIALIZED OBJECT FROM MAINACTIVITY
    private void receiveData() {
        try {
            //DESERIALIZE DATA FROM MAINACTIVITY
            Intent i = this.getIntent();
            galaxy = (Galaxy) i.getSerializableExtra("KEY_GALAXY");

            if (galaxy == null) {
                isForUpdate = false;
            }

        } catch (Exception e) {
            e.printStackTrace();
        }
    }
}
```

**6\. ActivityMain.xml**

- ActivityMain.xml.
- This is a template layout for our MainActivity.

```xml
<?xml version="1.0" encoding="utf-8"?>

<android.support.constraint.ConstraintLayout

    android_layout_width="match_parent"
    android_layout_height="match_parent"
    tools_context="com.tutorials.hp.materiallistviewmasterdetail.MainActivity">

        <com.dexafree.materialList.view.MaterialListView
            android_layout_width="fill_parent"
            android_layout_height="fill_parent"
            android_id="@+id/material_listview"/>

</android.support.constraint.ConstraintLayout>
```

**7\. activity_crud.xml**

- Our activity_crud.xml layout.
- Root tag is constraintlayout.
- Contains a RecyclerView and two buttons.
- We will use the RecyclerView to build our input forms using the Form-Master library.
- Delete button will delete data. Save button will both add new data and update existing data.

```xml
<?xml version="1.0" encoding="utf-8"?>

<android.support.constraint.ConstraintLayout

    android_layout_width="match_parent"
    android_layout_height="match_parent"
    tools_context="com.tutorials.hp.materiallistviewmasterdetail.CrudActivity">

    <LinearLayout
        android_orientation="vertical"
        android_layout_width="match_parent"
        android_layout_height="match_parent">
        <android.support.v7.widget.RecyclerView
            android_layout_width="match_parent"
            android_layout_height="wrap_content"
            android_orientation="vertical"
            android_id="@+id/recyclerviewForm"
            android_descendantFocusability="beforeDescendants" />
    <LinearLayout
        android_orientation="horizontal"
        android_layout_width="match_parent"
        android_layout_height="wrap_content">
        <Button
            android_id="@+id/saveBtn"
            android_text="Save"
            android_background="@color/colorPrimary"
            android_layout_width="wrap_content"
            android_layout_height="wrap_content" />
        <Button
            android_id="@+id/deleteBtn"
            android_text="Delete"
            android_background="@color/colorAccent"
            android_layout_width="wrap_content"
            android_layout_height="wrap_content" />
        </LinearLayout>
    </LinearLayout>

</android.support.constraint.ConstraintLayout>
```

#### **How To Run**

1. Download the project.
2. You'll get a zipped file,extract it.
3. Open the Android Studio.
4. Now close, already open project.
5. From the Menu bar click on File >New> Import Project.
6. Now Choose a Destination Folder, from where you want to import project.
7. Choose an Android Project.
8. Now Click on “OK“.
9. Done, your done importing the project,now edit it.

#### **More Resources**

| Resource | Link |
| --- | --- |
| GitHub Browse | [Browse](https://github.com/Oclemy/MaterialListViewMasterDetail) |
| GitHub Download Link | [Download](https://github.com/Oclemy/MaterialListViewMasterDetail/archive/master.zip) |

## Databse Example: Android Material List – SQLite – ADD RETRIEVE UPDATE DELETE – Master Detail

_Android Material List Master Detail SQlite tutorial right here. How to ADD UPDATE DELETE RETRIEVE data to and from SQLite database._

#### Introduction

In the previous tutorials, we've been looking at using material list to construct nice cards easily. We had previously seen how to bind a simple array with images and text to our material list. We then saw how to construct master detail example with master view showing our material list and the detail view for performing our CRUD operations.

So in this example we'll see how to use a database. We insert data to sqlite database from our crud activity.When the onResume of the master activity is called we refresh data. We also see how to edit existing data by opeing crud activity and also how to delete data.

We will buiding our input forms programmatically using [Form-Master](https://github.com/adib2149/FormMaster) library, alibrary that enables you build bigger forms with headers easily programmatically. We'll furthermore use masterial list to display nice cardviews and rushorm to manipulate our database easily.

\\===

#### Common Questions this example explores

- Android Material List CRUD master detail example with SQLite database.
- How to INSERT SELECT UPDATE DELETE data to and from sqite data to a list.
- How to build froms programmatically using FormMaster and input sqlite data.
- Android SQlite example with multiple activities.
- How to insert datetime from datetimepicker to sqlite database in android

#### Tools Used

This example was written with the following tools:

- Windows 8
- AndroidStudio IDE
- Genymotion Emulator
- Language : Java
- Topic : Material List CRUD, Material List Master Detail, Activity master detail

#### Libaries Used

- We use Material List library [https://github.com/dexafree/MaterialList](https://github.com/dexafree/MaterialList) and form-master library [https://github.com/adib2149/FormMaster](https://github.com/adib2149/FormMaster) for building our CRUD form.
- We've also use RushORM library [http://www.rushorm.co.uk/](http://www.rushorm.co.uk/) for interacting with sqlite data.

Lets jump directly to the source code.

#### 1\. AndroidManifest.xml

- We are using SQLite database with RushORM.
- Hence we use AndroidManifest.xml to define the meta data for our sqlite database.
- These include database name, database class package(where our database model belongs), database version etc.
- Take note that we have registered our MainApplication.java class in the name attribute of element, as shown below. So don't forget that since its at the MainApplication where we will initialize our RushORM configurations.

```xml
<?xml version="1.0" encoding="utf-8"?>
<manifest
    package="com.tutorials.hp.materialsqlite">

    <application
        android_name=".MainApplication"
        android_allowBackup="true"
        android_icon="@mipmap/ic_launcher"
        android_label="@string/app_name"
        android_roundIcon="@mipmap/ic_launcher_round"
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
        <activity android_name=".CrudActivity"></activity>
        <!--
     - We are using SQLite database with RushORM.
     - Hence we use AndroidManifest.xml to define the meta data for our sqlite database.
     - These include database name, database class package(where our database model belongs), database version etc.
     -->
        <!-- Updating this will cause a database upgrade -->
        <meta-data android_name="Rush_db_version" android_value="3" />

        <!-- Database name -->
        <meta-data android_name="Rush_db_name" android_value="GalaxiesDB.db" />

        <!-- Setting this to true will cause a migration to happen every launch,
        this is very handy during development although could cause data loss -->
        <meta-data android_name="Rush_debug" android_value="false" />

        <!-- Setting this to true mean that tables will only be created of classes that
        extend RushObject and are annotated with @RushTableAnnotation -->
        <meta-data android_name="Rush_requires_table_annotation" android_value="false" />

        <!-- Turning on logging can be done by settings this value to true -->
        <meta-data android_name="Rush_log" android_value="false" />

</application>

</manifest>
```

#### 2\. Build.Gradle App Level

- Our app level build.gradle file.
- We specify compilesdk,minimum sdk,target sdk and dependencies.
- Note that the minimum sdk for this project isn't that strict,it is much lower than that specified below.
- We also add dependencies using 'compile' statement.
- Our activity shall derive from the appCompatActivity to make it target earlier android versions.
- We specify material list which will allows us easily build awesome cards.
- We also add FormMaster that will allow us build forms easily via java instead of xml.Note that FormMaster requires a minimum of API 16 as the minimum sdk version so specify it as below.
- Finally we add the RushORM dependency, which is a third party library. We'll use it for sqlite database as it abstracts away sql statements.

```groovy
apply plugin: 'com.android.application'

android {
    compileSdkVersion 26
    buildToolsVersion "26.0.0"
    defaultConfig {
        applicationId "com.tutorials.hp.materialsqlite"
        minSdkVersion 16
        targetSdkVersion 26
        versionCode 1
        versionName "1.0"
        testInstrumentationRunner "android.support.test.runner.AndroidJUnitRunner"
    }
    buildTypes {
        release {
            minifyEnabled false
            proguardFiles getDefaultProguardFile('proguard-android.txt'), 'proguard-rules.pro'
        }
    }
}

dependencies {
    compile fileTree(dir: 'libs', include: ['*.jar'])
    compile 'com.android.support:appcompat-v7:26.+'
    compile 'com.android.support.constraint:constraint-layout:1.0.0-alpha7'
    compile 'com.android.support:design:26.+'
    compile 'com.github.dexafree:materiallist:3.2.1'
    compile 'me.riddhimanadib.form-master:form-master:1.0.2'
    compile 'co.uk.rushorm:rushandroid:1.3.0'

}
```

#### 3\. MainApplication.java

- MainApplication class.
- Extends android.app.Application.
- This is a global class available to all classes within your project.
- We initialize our RushORM configuration here using the initialize() method.

```java
package com.tutorials.hp.materialsqlite;

import android.app.Application;
import com.tutorials.hp.materialsqlite.mData.Galaxy;
import java.util.ArrayList;
import java.util.List;
import co.uk.rushorm.android.AndroidInitializeConfig;
import co.uk.rushorm.core.Rush;
import co.uk.rushorm.core.RushCore;

public class MainApplication extends Application {
    /*
    when our app is created.
     */
    @Override
    public void onCreate() {
        super.onCreate();
        // Rush is initialized asynchronously to recieve a callback after it initialized
        // set an InitializeListener on the config object
        // All classes that extend RushObject or implement Rush must be added to the config
        List<Class<? extends Rush>> rushClasses = new ArrayList<>();
        rushClasses.add(Galaxy.class);

        //CONFIGURE AND INITIALIZE RUSHORM
        AndroidInitializeConfig config=new AndroidInitializeConfig(getApplicationContext(),rushClasses);
        RushCore.initialize(config);
    }
}
```

#### 4\. Galaxy.java

- Our Galaxy class.
- Is our data object.
- Derives from RushObject. This makes it special in that our ORM will translate it to a sqlite database table.
- It will inherit methods like save,delete,update,select etc and fields like id.

```java
package com.tutorials.hp.materialsqlite.mData;

import java.util.Date;

import co.uk.rushorm.core.RushObject;

public class Galaxy extends RushObject {

    private String name,description;
    private String date;

    public Galaxy(){}

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
    public String getDate() {
        return date;
    }
    public void setDate(String date) {
        this.date = date;
    }

}
```

#### 5\. MyDataManager.java

- Our MyDataManager class.
- We perfom all our SQLite CRUD operations here.
- We INSERT,SELECT,UPDATE,DELETE and FIND.
- We are using RushORM as our Object Relational Mapper.

```java
package com.tutorials.hp.materialsqlite.mData;
import java.util.ArrayList;
import java.util.List;

import co.uk.rushorm.core.RushSearch;

public class MyDataManager {

    /*
  - Retrieve SQLite data using the RushSearch().find() method.
  - This returns a list of Galaxies.
   */
    public static ArrayList<Galaxy> getGalaxies() {
        List<Galaxy> galaxies = new RushSearch().find(Galaxy.class);
        return (ArrayList<Galaxy>) galaxies;
    }
    /*
    - Save Galaxy to sqlite database by calling save() method.
     */
    public static boolean add(Galaxy g) {
        try {
            g.save();
            return true;
        }catch (Exception e)
        {
            e.printStackTrace();
            return false;
        }
    }

    /*
    - UPDATE SQLITE DATA GIVEN OLD GALAXY ID AND NEW GALAXY
     */
    public static boolean update(String id,Galaxy newGalaxy)
    {
        try
        {
            Galaxy g = new RushSearch().whereId(id).findSingle(Galaxy.class);
            g.setName(newGalaxy.getName());
            g.setDescription(newGalaxy.getDescription());
            g.save();

            return true;
        }catch (Exception e)
        {
            e.printStackTrace();
            return false;
        }

    }
    /*
    - FIND SINGLE GALAXY FROM SQLITE GIVEN ID
     */
    public static Galaxy find(String id)
    {
        try
        {
            Galaxy g = new RushSearch().whereId(id).findSingle(Galaxy.class);
            return g;
        }catch (Exception e)
        {
            e.printStackTrace();
            return null;
        }
    }

    /*
    - DELETE FROM SQLITE GIVEN THE GALAXY
     */
    public static boolean delete(Galaxy galaxy)
    {
        try
        {
            Galaxy g = new RushSearch().whereId(galaxy.getId()).findSingle(Galaxy.class);
            g.delete();
            return true;
        }catch (Exception e)
        {
            e.printStackTrace();
            return false;
        }
    }
}
```

#### 6\. MainActivity.java

- Our Mainactivity class.
- Derives from appcompatactivity.
- Will be our master view. It will contain a material listview to display our list of cards.
- Each card will comprise image,texts and two action buttons.
- New will be for opening crud activity for adding new data while edit will be for opening it for editing existing data.
- If it's for editing, we pass the id of the selected object to the crud activity.

```java
package com.tutorials.hp.materialsqlite;

import android.content.Context;
import android.content.Intent;
import android.os.Bundle;
import android.support.annotation.NonNull;
import android.support.design.widget.FloatingActionButton;
import android.support.v7.app.AppCompatActivity;
import android.view.Gravity;
import android.view.View;
import com.dexafree.materialList.card.Card;
import com.dexafree.materialList.card.CardProvider;
import com.dexafree.materialList.card.OnActionClickListener;
import com.dexafree.materialList.card.action.TextViewAction;
import com.dexafree.materialList.view.MaterialListView;
import com.squareup.picasso.RequestCreator;
import com.tutorials.hp.materialsqlite.mData.Galaxy;
import com.tutorials.hp.materialsqlite.mData.MyDataManager;
import java.util.Random;

public class MainActivity extends AppCompatActivity {
    MaterialListView materialListView;
    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);

        this.initializeViews();
    FloatingActionButton fab = (FloatingActionButton) findViewById(R.id.fab);
        fab.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View view) {
                Intent i = new Intent(MainActivity.this, CrudActivity.class);
                Context c = MainActivity.this;
                c.startActivity(i);
            }
        });
    }

    /*
    - Initialize Material ListView
     */
    private void initializeViews() {
        materialListView = (MaterialListView) findViewById(R.id.material_listview);
    }

    /*
    - Bind data from database to Material ListView
     */
    private void bindData() {
        materialListView.getAdapter().clearAll();
        if(MyDataManager.getGalaxies().size()>0)
        {
            for (Galaxy g : MyDataManager.getGalaxies()) {
                this.createCard(g);
            }
        }

    }

    /*
    - Get random image to show in list from drawables
     */
    private int getRandomImage()
    {
        int[] images={R.drawable.andromeda,R.drawable.cartwheel,R.drawable.canismajoroverdensity,R.drawable.centaurusa};
        int image=new Random().nextInt(images.length);
        return images[image];
    }

    /*
    - Create a Card and add to Material List.
    - Pass the galaxy to display
     */
    private void createCard(final Galaxy g) {
        Card card = new Card.Builder(this)
                .withProvider(new CardProvider())
                .setLayout(R.layout.material_basic_image_buttons_card_layout)
                //.setLayout(R.layout.material_image_with_buttons_card)
                //.setLayout(R.layout.material_basic_buttons_card)
                //.setLayout(R.layout.material_welcome_card_layout)
                //.setLayout(R.layout.material_small_image_card)
                //.setLayout(R.layout.material_big_image_card_layout)
                .setTitle(g.getName())
                .setTitleGravity(Gravity.CENTER_HORIZONTAL)
                .setSubtitle(g.getDate())
                .setDescription(g.getDescription())
                .setDescriptionGravity(Gravity.CENTER_HORIZONTAL)
                .setDrawable(getRandomImage())
                .setDrawableConfiguration(new CardProvider.OnImageConfigListener() {
                    @Override
                    public void onImageConfigure(@NonNull RequestCreator requestCreator) {
                        //requestCreator.fit();
                        requestCreator.resize(121,121);
                    }
                })
                .addAction(R.id.left_text_button, new TextViewAction(this)
                        .setText("New")
                        .setTextResourceColor(R.color.colorPrimary)
                        .setListener(new OnActionClickListener() {
                            @Override
                            public void onActionClicked(View view, Card card) {
                                Intent i = new Intent(MainActivity.this, CrudActivity.class);
                                Context c = MainActivity.this;
                                c.startActivity(i);
                            }
                        }))
                .addAction(R.id.right_text_button, new TextViewAction(this)
                        .setText("Edit")
                        .setTextResourceColor(R.color.orange_button)
                        .setListener(new OnActionClickListener() {
                            @Override
                            public void onActionClicked(View view, Card card) {
                                Intent i = new Intent(MainActivity.this, CrudActivity.class);
                                i.putExtra("KEY_GALAXY", g.getId());
                                Context c = MainActivity.this;
                                c.startActivity(i);
                            }
                        }))
                .endConfig()
                .build();

        materialListView.getAdapter().add(card);
    }

    /*
    - When activity is resumed
     */
    @Override
    protected void onResume() {
        super.onResume();
        this.bindData();
    }
}
```

#### 7\. CrudActivity.java

- Our CrudActivity class.
- We perform our UI crud operation here. That is we get data from our forms and talk to MyDataManager to interact with db.
- This activity is special in that we use it for both adding new data and editing existing data. Also we use it for deleting.
- This is easy in that we only need to what the user clicked in the master activity and render our forms appropriately.
- Hence a boolean is passed to us from mainactivity showing whether it is for adding or editing.

```java
package com.tutorials.hp.materialsqlite;

import android.content.Intent;
import android.support.v7.app.AppCompatActivity;
import android.os.Bundle;
import android.support.v7.widget.RecyclerView;
import android.view.View;
import android.widget.Button;
import android.widget.Toast;
import com.tutorials.hp.materialsqlite.mData.Galaxy;
import com.tutorials.hp.materialsqlite.mData.MyDataManager;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import me.riddhimanadib.formmaster.helper.FormBuildHelper;
import me.riddhimanadib.formmaster.model.FormElement;
import me.riddhimanadib.formmaster.model.FormHeader;
import me.riddhimanadib.formmaster.model.FormObject;

public class CrudActivity extends AppCompatActivity {

    RecyclerView mRecyclerView;
    FormBuildHelper mFormBuilder;
    Button saveBtn,deleteBtn;
    Galaxy galaxy;
    String id=null;
    Boolean isForUpdate = true;

    /*
    - When activity is created
     */
    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_crud);

        this.receiveData();
        this.initializeViews();
    }

    private void initializeViews() {
        // initialize variables
        mRecyclerView = (RecyclerView) findViewById(R.id.newRecyclerView);
        saveBtn = (Button) findViewById(R.id.newBtn);
        deleteBtn = (Button) findViewById(R.id.deleteBtn);

        deleteBtn.setEnabled(isForUpdate);

        mFormBuilder = new FormBuildHelper(this, mRecyclerView);

        // declare form elements
        FormHeader header = FormHeader.createInstance().setTitle("Galaxy Info");
        final FormElement nameEditText = FormElement.createInstance().setType(FormElement.TYPE_EDITTEXT_TEXT_SINGLELINE).setTitle("Galaxy").setHint("Galaxy Name....");
        final FormElement descEditText = FormElement.createInstance().setType(FormElement.TYPE_EDITTEXT_TEXT_MULTILINE).setTitle("Description").setHint("Galaxy Description....");
        final FormElement publishDate = FormElement.createInstance().setType(FormElement.TYPE_PICKER_DATE).setTitle("Date");

        if (isForUpdate) {
            nameEditText.setValue(galaxy.getName());
            descEditText.setValue(galaxy.getDescription());
            publishDate.setValue(galaxy.getDate());
        }
        // add them in a list
        List<FormObject> formItems = new ArrayList<>();
        formItems.add(header);
        formItems.add(nameEditText);
        formItems.add(descEditText);
    formItems.add(publishDate);

        // build and display the form
        mFormBuilder.addFormElements(formItems);
        mFormBuilder.refreshView();

        //INSERT DATA OR UPDATE EXISTING DATA
        saveBtn.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View view) {
                if (!isForUpdate) {
                    //INSERT NEW DATA
                    Galaxy galaxy = new Galaxy();
                    galaxy.setName(nameEditText.getValue());
                    galaxy.setDescription(descEditText.getValue());
                    galaxy.setDate(publishDate.getValue());
                    if(MyDataManager.add(galaxy))
                    {
                        nameEditText.setValue("");
                        descEditText.setValue("");
            publishDate.setValue("");
                        mFormBuilder.refreshView();
                        Toast.makeText(getApplicationContext(), "Successfully Saved Data", Toast.LENGTH_SHORT).show();

                    }else {
                        Toast.makeText(getApplicationContext(), "Unable To Insert data", Toast.LENGTH_SHORT).show();
                    }

                } else {

                    if (galaxy != null) {
                        //UPDATE EXISTING DATA
                        Galaxy newGalaxy=new Galaxy();
                        newGalaxy.setName(nameEditText.getValue());
                        newGalaxy.setDescription(descEditText.getValue());
                        newGalaxy.setDate(publishDate.getValue());
                        if(MyDataManager.update(galaxy.getId(),newGalaxy))
                        {
                            Toast.makeText(getApplicationContext(), "Updated Successfully", Toast.LENGTH_SHORT).show();

                        }else {
                            Toast.makeText(getApplicationContext(), "Unable To Update", Toast.LENGTH_SHORT).show();

                        }

                    } else {
                        Toast.makeText(getApplicationContext(), "Galaxy is null.", Toast.LENGTH_SHORT).show();
                    }
                }
            }
        });
        //DELETE DATA FROMSQLITE DATABASE
        deleteBtn.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View view) {
                if(isForUpdate)
                {
                    if (galaxy != null)
                    {
                        if(MyDataManager.delete(galaxy))
                        {
                            nameEditText.setValue("");
                            descEditText.setValue("");
              publishDate.setValue("");
                            mFormBuilder.refreshView();

                            deleteBtn.setEnabled(isForUpdate=false);
                            saveBtn.setEnabled(false);
                            Toast.makeText(getApplicationContext(), "Deleted Successfully.", Toast.LENGTH_SHORT).show();
                        }else {
                            Toast.makeText(getApplicationContext(), "Unable To Delete", Toast.LENGTH_SHORT).show();

                        }

                    }
                }
            }
        });
    }

    /*
    - Receive data from MainActivity
     */
    private void receiveData() {
        try {
            Intent i = this.getIntent();
            id=i.getStringExtra("KEY_GALAXY");
            if(id == null)
            {
                isForUpdate=false;
            }else
            {
                galaxy=MyDataManager.find(id);
            }

        } catch (Exception e) {
            e.printStackTrace();
        }
    }
}
```

#### 8\. ActivityMain.xml

- ActivityMain.xml.
- This is a template layout for our MainActivity.

```xml
<?xml version="1.0" encoding="utf-8"?>
<android.support.design.widget.CoordinatorLayout

    android_layout_width="match_parent"
    android_layout_height="match_parent"
    tools_context="com.tutorials.hp.materialsqlite.MainActivity">

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
        app_srcCompat="@drawable/add_green" />

</android.support.design.widget.CoordinatorLayout>
```

#### 9\. ContentMain.xml

- ContenMain.xml.
- Contains our Material ListView which shall display our list of cards.

```xml
<?xml version="1.0" encoding="utf-8"?>
<android.support.constraint.ConstraintLayout

    android_layout_width="match_parent"
    android_layout_height="match_parent"
    app_layout_behavior="@string/appbar_scrolling_view_behavior"
    tools_context="com.tutorials.hp.materialsqlite.MainActivity"
    tools_showIn="@layout/activity_main">

        <com.dexafree.materialList.view.MaterialListView
            android_layout_width="fill_parent"
            android_layout_height="fill_parent"
            android_id="@+id/material_listview"/>

</android.support.constraint.ConstraintLayout>
```

#### 10\. activity_crud.xml

- Our activity_crud.xml layout.
- Root tag is constraintlayout.
- Contains a RecyclerView and two buttons.
- We will use the RecyclerView to build our input forms using the Form-Master library.
- Delete button will delete data. Save button will both add new data and update existing data.

```xml
<?xml version="1.0" encoding="utf-8"?>
<android.support.constraint.ConstraintLayout

    android_layout_width="match_parent"
    android_layout_height="match_parent"
    tools_context="com.tutorials.hp.materialsqlite.CrudActivity">
    <LinearLayout
        android_orientation="vertical"
        android_layout_width="match_parent"
        android_layout_height="match_parent">
        <android.support.v7.widget.RecyclerView
            android_layout_width="match_parent"
            android_layout_height="wrap_content"
            android_orientation="vertical"
            android_id="@+id/newRecyclerView"
            android_descendantFocusability="beforeDescendants" />
        <LinearLayout
            android_orientation="horizontal"
            android_layout_width="match_parent"
            android_layout_height="wrap_content">
            <Button
                android_id="@+id/newBtn"
                android_text="Save"
                android_background="@color/colorPrimary"
                android_layout_width="wrap_content"
                android_layout_height="wrap_content" />
            <Button
                android_id="@+id/deleteBtn"
                android_text="Delete"
                android_background="@color/colorAccent"
                android_layout_width="wrap_content"
                android_layout_height="wrap_content" />
        </LinearLayout>
    </LinearLayout>
</android.support.constraint.ConstraintLayout>
```

#### How To Run

1. Download the project.
2. You'll get a zipped file,extract it.
3. Open the Android Studio.
4. Now close, already open project.
5. From the Menu bar click on File >New> Import Project.
6. Now Choose a Destination Folder, from where you want to import project.
7. Choose an Android Project.
8. Now Click on “OK“.
9. Done, your done importing the project,now edit it.

#### More Resources

| Resource | Link |
| --- | --- |
| GitHub Browse | [Browse](https://github.com/MaterialSQLite) |
| GitHub Download Link | [Download](https://github.com/Oclemy/MaterialSQLite/archive/master.zip) |
