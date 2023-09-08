# RealmDB Example


In this tutorial you will learn about Realm database, how to use it via simple step by step examples.



### What is Realm?

> Realm is a mobile database that runs directly inside phones, tablets or wearables.

It is a replacement for SQLite & ORMs. It allows you to database apps targeting:

1. Android
2. Wear OS
3. Android Automotive OS
4. Android TV
5. Android Things

Realm needs:

*   [Android Studio](https://developer.android.com/studio/index.html) version 1.5.1 or higher.
*   Java Development Kit (JDK) 9 or higher.
*   An emulated or hardware Android device for testing.
*   Android API Level 16 or higher (Android 4.1 and above).


> There are two flavors available:
1. [Realm Java](https://github.com/realm/realm-java) - Android
2. [Realm Kotlin ](https://github.com/realm/realm-kotlin) - Requires Multiplatform

### Features

-   **Mobile-first:** Realm is the first database built from the ground up to run directly inside phones, tablets, and wearables.
-   **Simple:** Data is directly exposed as objects and queryable by code, removing the need for ORM's riddled with performance & maintenance issues. Plus, we've worked hard to [keep our API down to very few classes](https://realm.io/docs/java/): most of our users pick it up intuitively, getting simple apps up & running in minutes.
-   **Modern:** Realm supports easy thread-safety, relationships & encryption.
-   **Fast:** Realm is faster than even raw SQLite on common operations while maintaining an extremely rich feature set.

### How to Install Realm

Study the following `app/build.gradle` file to see realm attributes added:

```groovy
apply plugin: 'com.android.application'
apply plugin: 'kotlin-android'
apply plugin: 'kotlin-kapt'
apply plugin: 'realm-android'

android {
   compileSdkVersion 29
   buildToolsVersion "29.0.2"

   defaultConfig {
      applicationId "com.mongodb.realmsnippets"
      minSdkVersion 21
      targetSdkVersion 29
   }

   buildFeatures {
       viewBinding = true
   }

   compileOptions {
      sourceCompatibility 1.8
      targetCompatibility 1.8
   }
}

realm {
   syncEnabled = true
}

dependencies {
   implementation fileTree(dir: 'libs', include: ['*.jar'])
   implementation "org.jetbrains.kotlin:kotlin-stdlib-jdk7:$kotlin_version"
   implementation "androidx.appcompat:appcompat:1.1.0"
   implementation "androidx.core:core-ktx:1.2.0"
}
```

In your project level `build.gradle` add Realm classpath:

```groovy
buildscript {
    apply from: '../dependencies.gradle'

    repositories {
        google()
        jcenter()
    }
    dependencies {
        classpath "com.android.tools.build:gradle:$androidPluginVer"
        classpath "org.jetbrains.kotlin:kotlin-gradle-plugin:$kotlin_version"
        classpath "io.realm:realm-gradle-plugin:$realmVersion"

        // NOTE: Do not place your application dependencies here; they belong
        // in the individual module build.gradle files
    }
}
```

Then sync.

## Example 1: Simple Android Java Realm example

Here is a simple realm example in Java. Here is the demo screenshot:

![Simple Android Realm example](https://camposha.info/android-examples/wp-content/uploads/sites/9/2022/03/realm.gif).

### Step 1: Create Project

Create an empty android studio project.

### Step 2: Install Realm

Install Realm as has been discussed above.

### Step 3: Design Layout

Design  a simple layout as shown:

**activity_realm_basic_example.xml**

```xml
<ScrollView
    xmlns:android="http://schemas.android.com/apk/res/android"
    xmlns:tools="http://schemas.android.com/tools"
    android:paddingLeft="@dimen/activity_horizontal_margin"
    android:paddingRight="@dimen/activity_horizontal_margin"
    android:paddingTop="@dimen/activity_vertical_margin"
    android:paddingBottom="@dimen/activity_vertical_margin"
    android:layout_width="match_parent"
    android:layout_height="match_parent">
    <LinearLayout
        android:orientation="vertical"
        android:layout_width="match_parent"
        android:layout_height="wrap_content">
        <TextView
            android:gravity="center_horizontal"
            android:text="@string/status_output"
            android:textStyle="bold"
            android:textSize="18sp"
            android:layout_width="match_parent"
            android:layout_height="wrap_content"/>
        <LinearLayout
            android:id="@+id/container"
            android:layout_width="match_parent"
            android:layout_height="match_parent"
            android:paddingTop="10sp"
            android:orientation="vertical"
            tools:context=".RealmIntroExample"/>
    </LinearLayout>
</ScrollView>

```

### Step 4: Create Model classes:

**(a). Cat.java**

```java

import io.realm.RealmObject;
import io.realm.RealmResults;
import io.realm.annotations.LinkingObjects;

public class Cat extends RealmObject {
    // It is possible to also use public fields, instead of getters/setters.
    public String name;

    // You can define inverse relationships.
    @LinkingObjects("cats")
    public final RealmResults<Person> owners = null;
}
```

**(b). Dog.java**

```java
import io.realm.RealmModel;
import io.realm.RealmResults;
import io.realm.annotations.LinkingObjects;
import io.realm.annotations.RealmClass;

// It is possible to use @RealmClass and implement RealmModel, instead of extending RealmObject.
@RealmClass
public class Dog implements RealmModel {
    // It is possible to also use public fields, instead of getters/setters.
    public String name;

    // You can define inverse relationships.
    @LinkingObjects("dog")
    public final RealmResults<Person> owners = null;
}
```

**(c). Person.java**

```java
import io.realm.RealmList;
import io.realm.RealmObject;
import io.realm.annotations.Ignore;
import io.realm.annotations.Index;
import io.realm.annotations.PrimaryKey;

// Your model just have to extend RealmObject.
// This will inherit an annotation which produces proxy getters and setters for all fields.
// It is also possible to use @RealmClass annotation, and implement RealmModel interface.
public class Person extends RealmObject {

    // All fields are by default persisted.
    private int age;

    // Adding an index makes queries execute faster on that field.
    @Index
    private String name;

    // Primary keys are optional, but it allows identifying a specific object
    // when Realm writes are instructed to update if the object already exists in the Realm
    @PrimaryKey
    private long id;

    // Other objects in a one-to-one relation must also implement RealmModel, or extend RealmObject
    private Dog dog;

    // One-to-many relations is simply a RealmList of the objects which also implements RealmModel
    private RealmList<Cat> cats;

    // It is also possible to have list of primitive types (long, String, Date, byte[], etc.)
    private RealmList<String> phoneNumbers;

    // You can instruct Realm to ignore a field and not persist it.
    @Ignore
    private int tempReference;

    // Let your IDE generate getters and setters for you!
    // Or if you like you can even have public fields and no accessors! See Dog.java and Cat.java
    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public int getAge() {
        return age;
    }

    public void setAge(int age) {
        this.age = age;
    }

    public long getId() {
        return id;
    }

    public void setId(long id) {
        this.id = id;
    }

    public Dog getDog() {
        return dog;
    }

    public void setDog(Dog dog) {
        this.dog = dog;
    }

    public RealmList<Cat> getCats() {
        return cats;
    }

    public void setCats(RealmList<Cat> cats) {
        this.cats = cats;
    }

    public int getTempReference() {
        return tempReference;
    }

    public void setTempReference(int tempReference) {
        this.tempReference = tempReference;
    }

    public RealmList<String> getPhoneNumbers() {
        return phoneNumbers;
    }

    public void setPhoneNumbers(RealmList<String> phoneNumbers) {
        this.phoneNumbers = phoneNumbers;
    }
}
```

### Step 5: Init Realm

Initialize Realm in your `Application` class:

**MyApplication**

```java
import android.app.Application;

import io.realm.Realm;

public class MyApplication extends Application {

    @Override
    public void onCreate() {
        super.onCreate();
        // Initialize Realm. Should only be done once when the application starts.
        Realm.init(this);

        // In this example, no default configuration is set,
        // so by default, `RealmConfiguration.Builder().build()` is used.
    }
}
```

### Step 6: Create Main Activity

**IntroExampleActivity**

```java
import android.app.Activity;
import android.os.AsyncTask;
import android.os.Bundle;
import android.util.Log;
import android.widget.LinearLayout;
import android.widget.TextView;

import java.lang.ref.WeakReference;
import java.util.Arrays;

import io.realm.OrderedRealmCollectionChangeListener;
import io.realm.Realm;
import io.realm.RealmResults;
import io.realm.Sort;
import io.realm.examples.intro.model.Cat;
import io.realm.examples.intro.model.Dog;
import io.realm.examples.intro.model.Person;

public class IntroExampleActivity extends Activity {
    public static final String TAG = "IntroExampleActivity";

    private LinearLayout rootLayout;

    private Realm realm;

    // Results obtained from a Realm are live, and can be observed on looper threads (like the UI thread).
    // Note that if you want to observe the RealmResults for a long time, then it should be a field reference.
    // Otherwise, the RealmResults can no longer be notified if the GC has cleared the reference to it.
    private RealmResults<Person> persons;

    // OrderedRealmCollectionChangeListener receives fine-grained changes - insertions, deletions, and changes.
    // If the change set isn't needed, then RealmChangeListener can also be used.
    private final OrderedRealmCollectionChangeListener<RealmResults<Person>> realmChangeListener = (people, changeSet) -> {
        String insertions = changeSet.getInsertions().length == 0 ? "" : "\n - Insertions: " + Arrays.toString(changeSet.getInsertions());
        String deletions = changeSet.getDeletions().length == 0 ? "" : "\n - Deletions: " + Arrays.toString(changeSet.getDeletions());
        String changes = changeSet.getChanges().length == 0 ? "" : "\n - Changes: " + Arrays.toString(changeSet.getChanges());
        showStatus("Person was loaded, or written to. " + insertions + deletions + changes);
    };

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_realm_basic_example);
        rootLayout = findViewById(R.id.container);
        rootLayout.removeAllViews();

        // Clear the Realm if the example was previously run.
        Realm.deleteRealm(Realm.getDefaultConfiguration());

        // Create the Realm instance
        realm = Realm.getDefaultInstance();

        // Asynchronous queries are evaluated on a background thread,
        // and passed to the registered change listener when it's done.
        // The change listener is also called on any future writes that change the result set.
        persons = realm.where(Person.class).findAllAsync();

        // The change listener will be notified when the data is loaded,
        // or the Realm is written to from any threads (and the result set is modified).
        persons.addChangeListener(realmChangeListener);

        // These operations are small enough that
        // we can generally safely run them on the UI thread.
        basicCRUD(realm);
        basicQuery(realm);
        basicLinkQuery(realm);

        // More complex operations can be executed on another thread.
        new ComplexBackgroundOperations(this).execute();
    }

    @Override
    protected void onDestroy() {
        super.onDestroy();
        persons.removeAllChangeListeners(); // Remove the change listener when no longer needed.
        realm.close(); // Remember to close Realm when done.
    }

    private void showStatus(String text) {
        Log.i(TAG, text);
        TextView textView = new TextView(this);
        textView.setText(text);
        rootLayout.addView(textView);
    }

    private void basicCRUD(Realm realm) {
        showStatus("Perform basic Create/Read/Update/Delete (CRUD) operations...");

        // All writes must be wrapped in a transaction to facilitate safe multi threading
        realm.executeTransaction(r -> {
            // Add a person.
            // RealmObjects with primary keys created with `createObject()` must specify the primary key value as an argument.
            Person person = r.createObject(Person.class, 1);
            person.setName("Young Person");
            person.setAge(14);

            // Even young people have at least one phone in this day and age.
            // Please note that this is a RealmList that contains primitive values.
            person.getPhoneNumbers().add("+1 123 4567");
        });

        // Find the first person (no query conditions) and read a field
        final Person person = realm.where(Person.class).findFirst();
        showStatus(person.getName() + ":" + person.getAge());

        // Update person in a transaction
        realm.executeTransaction(r -> {
            // Managed objects can be modified inside transactions.
            person.setName("Senior Person");
            person.setAge(99);
            showStatus(person.getName() + " got older: " + person.getAge());
        });

        // Delete all persons
        showStatus("Deleting all persons");
        realm.executeTransaction(r -> r.delete(Person.class));
    }

    private void basicQuery(Realm realm) {
        showStatus("\nPerforming basic Query operation...");

        // Let's add a person so that the query returns something.
        realm.executeTransaction(r -> {
            Person oldPerson = new Person();
            oldPerson.setId(99);
            oldPerson.setAge(99);
            oldPerson.setName("George");
            realm.insertOrUpdate(oldPerson);
        });

        showStatus("Number of persons: " + realm.where(Person.class).count());

        RealmResults<Person> results = realm.where(Person.class).equalTo("age", 99).findAll();

        showStatus("Size of result set: " + results.size());
    }

    private void basicLinkQuery(Realm realm) {
        showStatus("\nPerforming basic Link Query operation...");

        // Let's add a person with a cat so that the query returns something.
        realm.executeTransaction(r -> {
            Person catLady = realm.createObject(Person.class, 24);
            catLady.setAge(52);
            catLady.setName("Mary");

            Cat tiger = realm.createObject(Cat.class);
            tiger.name = "Tiger";
            catLady.getCats().add(tiger);
        });

        showStatus("Number of persons: " + realm.where(Person.class).count());

        RealmResults<Person> results = realm.where(Person.class).equalTo("cats.name", "Tiger").findAll();

        showStatus("Size of result set: " + results.size());
    }

    // This AsyncTask shows how to use Realm in background thread operations.
    //
    // AsyncTasks should be static inner classes to avoid memory leaks.
    // In this example, WeakReference is used for the sake of simplicity.
    private static class ComplexBackgroundOperations extends AsyncTask<Void, Void, String> {
        private WeakReference<IntroExampleActivity> weakReference;

        public ComplexBackgroundOperations(IntroExampleActivity introExampleActivity) {
            this.weakReference = new WeakReference<>(introExampleActivity);
        }

        @Override
        protected void onPreExecute() {
            IntroExampleActivity activity = weakReference.get();
            if (activity == null) {
                return;
            }
            activity.showStatus("\n\nBeginning complex operations on background thread.");
        }

        @Override
        protected String doInBackground(Void... voids) {
            IntroExampleActivity activity = weakReference.get();
            if (activity == null) {
                return "";
            }
            // Open the default realm. Uses `try-with-resources` to automatically close Realm when done.
            // All threads must use their own reference to the realm.
            // Realm instances, RealmResults, and managed RealmObjects can not be transferred across threads.
            try (Realm realm = Realm.getDefaultInstance()) {
                String info;
                info = activity.complexReadWrite(realm);
                info += activity.complexQuery(realm);
                return info;
            }
        }

        @Override
        protected void onPostExecute(String result) {
            IntroExampleActivity activity = weakReference.get();
            if (activity == null) {
                return;
            }
            activity.showStatus(result);
        }
    }

    private String complexReadWrite(Realm realm) {
        String status = "\nPerforming complex Read/Write operation...";

        // Add ten persons in one transaction
        realm.executeTransaction(r -> {
            Dog fido = r.createObject(Dog.class);
            fido.name = "fido";
            for (int i = 0; i < 10; i++) {
                Person person = r.createObject(Person.class, i);
                person.setName("Person no. " + i);
                person.setAge(i);
                person.setDog(fido);

                // The field tempReference is annotated with @Ignore.
                // This means setTempReference sets the Person tempReference
                // field directly. The tempReference is NOT saved as part of
                // the RealmObject:
                person.setTempReference(42);

                for (int j = 0; j < i; j++) {
                    Cat cat = r.createObject(Cat.class);
                    cat.name = "Cat_" + j;
                    person.getCats().add(cat);
                }
            }
        });

        // Implicit read transactions allow you to access your objects
        status += "\nNumber of persons: " + realm.where(Person.class).count();

        // Iterate over all objects, with an iterator
        for (Person person : realm.where(Person.class).findAll()) {
            String dogName;
            if (person.getDog() == null) {
                dogName = "None";
            } else {
                dogName = person.getDog().name;
            }
            status += "\n" + person.getName() + ":" + person.getAge() + " : " + dogName + " : " + person.getCats().size();
        }

        // Sorting
        RealmResults<Person> sortedPersons = realm.where(Person.class).sort("age", Sort.DESCENDING).findAll();
        status += "\nSorting " + sortedPersons.last().getName() + " == " + realm.where(Person.class).findFirst()
                .getName();

        return status;
    }

    private String complexQuery(Realm realm) {
        String status = "\n\nPerforming complex Query operation...";
        status += "\nNumber of persons: " + realm.where(Person.class).count();

        // Find all persons where age between 7 and 9 and name begins with "Person".
        RealmResults<Person> results = realm.where(Person.class)
                .between("age", 7, 9)       // Notice implicit "and" operation
                .beginsWith("name", "Person").findAll();

        status += "\nSize of result set: " + results.size();

        return status;
    }
}
```

### Run

Copy the code or download it in the link below, build and run.

### Reference

Here are the reference links:

|Number|Link|
|-----|---|
|1.|[Download](https://downgit.github.io/#/home?url=https://github.com/realm/realm-java/tree/master/examples/introExample) Example|
|2.|[Follow](https://github.com/realm/) code author|
|3.|Code: [Apache 2.0 License](http://www.apache.org/licenses/LICENSE-2.0.txt)|


## Example 2: Kotlin Android Realm DB example

Here is an example written in Kotlin.

### Step 1: Create Project

Start by creating an empty `Android Studio` project.

### Step 2: Dependencies

Base your `app/build.gradle` on the following:

```groovy
apply plugin: 'com.android.application'
apply plugin: 'kotlin-android'
apply plugin: 'kotlin-android-extensions'
apply plugin: 'kotlin-kapt'
apply plugin: 'realm-android'


android {
    compileSdkVersion compileSdkVer
    defaultConfig {
        applicationId "com.developers.realmdb"
        minSdkVersion minSdkVer
        targetSdkVersion targetSdkVer
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
    implementation fileTree(dir: 'libs', include: ['*.jar'])
    implementation "org.jetbrains.kotlin:kotlin-stdlib-jdk7:$kotlin_version"
    implementation "androidx.appcompat:appcompat:$buildToolsVer"
    implementation "androidx.constraintlayout:constraintlayout:$constraintLayoutVersion"
    testImplementation "junit:junit:$junitVer"
    androidTestImplementation "androidx.test:runner:$androidTestRunnerVer"
    androidTestImplementation "androidx.test.espresso:espresso-core:$espressoCoreVersion"
    implementation "com.google.android.material:material:$designVersion"
}

```

Then in your project-level `build.gradle` add Realm classpath as shown:

```groovy
buildscript {
    apply from: '../dependencies.gradle'

    repositories {
        google()
        jcenter()
    }
    dependencies {
        classpath "com.android.tools.build:gradle:$androidPluginVer"
        classpath "org.jetbrains.kotlin:kotlin-gradle-plugin:$kotlin_version"
        classpath "io.realm:realm-gradle-plugin:$realmVersion"

        // NOTE: Do not place your application dependencies here; they belong
        // in the individual module build.gradle files
    }
}
```

### Create Model class

**Pokemon.kt**

```kotlin
import io.realm.RealmObject

open class Pokemon : RealmObject() {

    var name: String? = null
    var type: String? = null
}
```

### Step : Initialize Realm

**InitApp.kt**

```kotlin
import android.app.Application
import io.realm.Realm
import io.realm.RealmConfiguration

class InitApp : Application() {

    override fun onCreate() {
        super.onCreate()
        Realm.init(this)
        val realmConfiguration = RealmConfiguration.Builder()
                .name("example.realm").build()
        Realm.setDefaultConfiguration(realmConfiguration)
    }
}
```

### Step : Perform CRUD

**MainActivity.kt**

```kotlin
import androidx.appcompat.app.AppCompatActivity
import android.os.Bundle
import com.google.android.material.snackbar.Snackbar
import io.realm.Realm
import io.realm.kotlin.createObject
import io.realm.kotlin.delete
import io.realm.kotlin.where
import kotlinx.android.synthetic.main.activity_main.*

class MainActivity : AppCompatActivity() {

    lateinit var realm: Realm
    lateinit var list: Sequence<Pokemon>

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_main)
        realm = Realm.getDefaultInstance()
        insert_button.setOnClickListener { view ->
            realm.beginTransaction()
            val pokemon = realm.createObject<Pokemon>()
            pokemon.name = pokemon_name_edittext.text.toString()
            pokemon.type = pokemon_type_edittext.text.toString()
            realm.commitTransaction()
            Snackbar.make(view, "Inserted", Snackbar.LENGTH_SHORT).show()
        }
        delete_all_button.setOnClickListener { view ->
            realm.beginTransaction()
            realm.delete<Pokemon>()
            realm.commitTransaction()
            Snackbar.make(view, getString(R.string.deleted_all), Snackbar.LENGTH_SHORT).show()
        }
        view_button.setOnClickListener {
            list = realm.where<Pokemon>()
                    .findAllAsync()
                    .asSequence()
            if (list.count() > 0) {
                for (pokemon in list) {
                    pokemon_text_view.append(pokemon.name + " is " + pokemon.type + " type.\n")
                }
            } else {
                pokemon_text_view.text = getString(R.string.no_value_string)
            }

        }
    }

    override fun onDestroy() {
        super.onDestroy()
        //Imp
        realm.close()
    }
}

```

### Run

Copy the code or download it in the link below, build and run.

### Reference

Here are the reference links:

|Number|Link|
|-----|---|
|1.|[Download](https://downgit.github.io/#/home?url=https://github.com/amanjeetsingh150/kotlin-android-examples/tree/master/) Example|
|2.|[Follow](https://github.com/amanjeetsingh150/) code author|
|3.|Code: [Apache 2.0 License](http://www.apache.org/licenses/LICENSE-2.0.txt)|



## More on Realm Database

Expand your usage of Realm using these tutorials:

[loop type=post taxonomy=chapter term=realm orderby=date order=asc]

<h3>[loop-count]. [field chapter]</h3>

[field chapter_description]

<a href="[field url]">Read More.</a>

[/loop]
