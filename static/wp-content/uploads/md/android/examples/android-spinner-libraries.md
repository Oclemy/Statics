# Best Android Spinner Libraries with Examples - 2021


_Top Android MaterialSpinner Examples in 2021_. In this top-list tutorial, we explore some of the top material spinner libraries that you can easily use in your project. These are open source libraries have several advantages that we will explore in a short while.


Let's start by answering some basic questions:

### What is a Spinner?

A Spinner is an adapterview that displays items in a dropdown fashion, allowing the user to pick one at a time. Spinners reside in the `android.widget` package and is a class deriving from the abstract AbsSpinner class.

Here's a demo of a spinner:

Learn more about :

- Spinner here
- AbsSpinner here

> NB/= The libraries are all great and are simply ordered based on the date they wer discovered. Don't place too much emphasis on their order.

## (a). Nice spinner

> NiceSpinner is a re-implementation of the default Android's spinner, with a nice arrow animation and a different way to display its content.

It follows the material design guidelines, and it is compatible starting from Api 14.

Here is the demo that will be created shortly with Nice Spinner:

![Android Nice Spinner](https://github.com/arcadefire/nice-spinner/raw/master/nice-spinner.gif)

Let's look at Nice Spinner Example.

### Install it

Start by registering jitpack in your project level build.grade file, under the allprojects closure as follows:

```groovy
allprojects {
    repositories {
        ...
        maven { url "https://jitpack.io" }
    }
}
```

Now move to your app level gradle file, under the dependencies closure and add the following implementation statement:

```groovy
implementation 'com.github.arcadefire:nice-spinner:1.4.4'
```

### Step 2: Add to Layout

Go to your xml layout for the main activity and add the following:

```xml
 <org.angmarch.views.NiceSpinner
   android:id="@+id/nice_spinner"
   android:layout_width="wrap_content"
   android:layout_height="wrap_content"
   android:layout_margin="16dp"/>
```

### Step 3: Write Code

Using it is as easy as it gets, no need for an adapter. Simply reference it:

```kotlin
 NiceSpinner niceSpinner = (NiceSpinner) findViewById(R.id.nice_spinner);
```

Then attach your data source:

```kotlin
 List<String> dataset = new LinkedList<>(Arrays.asList("One", "Two", "Three", "Four", "Five"));
 niceSpinner.attachDataSource(dataset);
```

Here is how you listen to data selection events:

```kotlin
spinner.setOnSpinnerItemSelectedListener(new OnSpinnerItemSelectedListener() {
    @Override
    public void onItemSelected(NiceSpinner parent, View view, int position, long id) {
        // This example uses String, but your type can be any
        String item = parent.getItemAtPosition(position);
        ...
    }
});
```

### Full Example

Let's look at full nice spinner example.

1. Create an empty android studio project.
    
2. Start by installing the library as has been discussed above.
    
3. Add the following code to your main activity layout:
    

**activity_main.xml**

```xml
<?xml version="1.0" encoding="utf-8"?>
<android.support.constraint.ConstraintLayout xmlns:android="http://schemas.android.com/apk/res/android"
    xmlns:app="http://schemas.android.com/apk/res-auto"
    xmlns:tools="http://schemas.android.com/tools"
    android:layout_width="match_parent"
    android:layout_height="match_parent"
    tools:context=".MainActivity">

    <org.angmarch.views.NiceSpinner
        android:id="@+id/nice_spinner"
        android:layout_width="0dp"
        android:layout_height="wrap_content"
        android:layout_marginLeft="16dp"
        android:layout_marginTop="8dp"
        android:layout_marginRight="16dp"
        app:layout_constraintBottom_toBottomOf="parent"
        app:layout_constraintLeft_toLeftOf="parent"
        app:layout_constraintRight_toRightOf="parent"
        app:layout_constraintTop_toBottomOf="@+id/textView"
        app:layout_constraintVertical_bias="0.0" />

    <org.angmarch.views.NiceSpinner
        android:id="@+id/niceSpinnerXml"
        android:layout_width="0dp"
        android:layout_height="wrap_content"
        android:layout_marginLeft="16dp"
        android:layout_marginTop="8dp"
        android:layout_marginRight="16dp"
        app:entries="@array/courses"
        app:layout_constraintBottom_toBottomOf="parent"
        app:layout_constraintLeft_toLeftOf="parent"
        app:layout_constraintRight_toRightOf="parent"
        app:layout_constraintTop_toBottomOf="@+id/textView3"
        app:layout_constraintVertical_bias="0.0" />

    <org.angmarch.views.NiceSpinner
        android:id="@+id/tinted_nice_spinner"
        android:layout_width="0dp"
        android:layout_height="wrap_content"
        android:layout_marginStart="16dp"
        android:layout_marginLeft="16dp"
        android:layout_marginTop="8dp"
        android:layout_marginEnd="16dp"
        android:layout_marginRight="16dp"
        app:arrowTint="@color/colorPrimary"
        app:backgroundSelector="@drawable/background_selector"
        app:layout_constraintBottom_toBottomOf="parent"
        app:layout_constraintEnd_toEndOf="parent"
        app:layout_constraintStart_toStartOf="parent"
        app:layout_constraintTop_toBottomOf="@+id/textView2"
        app:layout_constraintVertical_bias="0.0"
        app:textTint="@color/colorPrimary" />

    <TextView
        android:id="@+id/textView"
        android:layout_width="wrap_content"
        android:layout_height="wrap_content"
        android:layout_marginStart="16dp"
        android:layout_marginLeft="16dp"
        android:layout_marginTop="8dp"
        android:text="Default"
        app:layout_constraintEnd_toEndOf="parent"
        app:layout_constraintHorizontal_bias="0.0"
        app:layout_constraintStart_toStartOf="parent"
        app:layout_constraintTop_toTopOf="parent" />

    <TextView
        android:id="@+id/textView2"
        android:layout_width="wrap_content"
        android:layout_height="wrap_content"
        android:layout_marginStart="16dp"
        android:layout_marginLeft="16dp"
        android:layout_marginTop="8dp"
        android:text="Tinted with custom class"
        app:layout_constraintEnd_toEndOf="parent"
        app:layout_constraintHorizontal_bias="0.0"
        app:layout_constraintStart_toStartOf="parent"
        app:layout_constraintTop_toBottomOf="@+id/nice_spinner" />

    <TextView
        android:id="@+id/textView3"
        android:layout_width="wrap_content"
        android:layout_height="wrap_content"
        android:layout_marginStart="16dp"
        android:layout_marginLeft="16dp"
        android:layout_marginTop="8dp"
        android:text="Default with data defined in XML"
        app:layout_constraintEnd_toEndOf="parent"
        app:layout_constraintHorizontal_bias="0.0"
        app:layout_constraintStart_toStartOf="parent"
        app:layout_constraintTop_toBottomOf="@+id/tinted_nice_spinner" />

</android.support.constraint.ConstraintLayout>
```

Replace your main activity code with the following:

**MainAcivity.java**

```java
public class MainActivity extends AppCompatActivity {

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);
        setupDefault();
        setupTintedWithCustomClass();
        setupXml();
    }

    private void setupXml() {
        NiceSpinner spinner = findViewById(R.id.niceSpinnerXml);
        spinner.setOnSpinnerItemSelectedListener(new OnSpinnerItemSelectedListener() {
            @Override
            public void onItemSelected(NiceSpinner parent, View view, int position, long id) {
                String item = parent.getItemAtPosition(position).toString();
                Toast.makeText(MainActivity.this, "Selected: " + item, Toast.LENGTH_SHORT).show();
            }
        });
    }

    private void setupTintedWithCustomClass() {
        final NiceSpinner spinner = findViewById(R.id.tinted_nice_spinner);
        List<Person> people = new ArrayList<>();

        people.add(new Person("Tony", "Stark"));
        people.add(new Person("Steve", "Rogers"));
        people.add(new Person("Bruce", "Banner"));

        SpinnerTextFormatter textFormatter = new SpinnerTextFormatter<Person>() {
            @Override
            public Spannable format(Person person) {
                return new SpannableString(person.getName() + " " + person.getSurname());
            }
        };

        spinner.setSpinnerTextFormatter(textFormatter);
        spinner.setSelectedTextFormatter(textFormatter);
        spinner.setOnSpinnerItemSelectedListener(new OnSpinnerItemSelectedListener() {
            @Override
            public void onItemSelected(NiceSpinner parent, View view, int position, long id) {
                Person person = (Person) spinner.getSelectedItem();
                Toast.makeText(MainActivity.this, "Selected: " + person.toString(), Toast.LENGTH_SHORT).show();
            }
        });
        spinner.attachDataSource(people);
    }

    private void setupDefault() {
        NiceSpinner spinner = findViewById(R.id.nice_spinner);
        List<String> dataset = new LinkedList<>(Arrays.asList("One", "Two", "Three", "Four", "Five"));
        spinner.attachDataSource(dataset);
        spinner.setOnSpinnerItemSelectedListener(new OnSpinnerItemSelectedListener() {
            @Override
            public void onItemSelected(NiceSpinner parent, View view, int position, long id) {
                String item = parent.getItemAtPosition(position).toString();
                Toast.makeText(MainActivity.this, "Selected: " + item, Toast.LENGTH_SHORT).show();
            }
        });
    }
}

class Person {

    private String name;
    private String surname;

    Person(String name, String surname) {
        this.name = name;
        this.surname = surname;
    }

    String getName() {
        return name;
    }

    String getSurname() {
        return surname;
    }

    @Override
    public String toString() {
        return name + " " + surname;
    }
}
```

Then run the project.

### Reference

Find the reference links below:

| No. | Link |
| --- | --- |
| 1. | [Browse](https://github.com/arcadefire/nice-spinner/tree/master/app) Example code |
| 2. | [Direct Download](https://github.com/arcadefire/nice-spinner/archive/refs/heads/master.zip) Example code |
| 3. | [Read More](https://github.com/arcadefire/nice-spinner/) |
| 4. | [Follow](https://github.com/arcadefire/) Library author |

## (b). MaterialSpinner

MaterialSpinner is a spinner view for Android. This library was first created by [Jared Rummler](https://github.com/jaredrummler) in `2016` and has been receiving several updated. It's very clean in design and is created from a textView.

```java
public class MaterialSpinner extends TextView {..}
```

MaterialSpinner requires Android API 14 and above. It is hosted in [Maven Central](https://maven-badges.herokuapp.com/maven-central/com.jaredrummler/material-spinner). The current version is version `1.2.5`. This libray has around `197` methods. It also has more than `770` stars and is released under Apache license.

#### Installation

This library can be installed in three ways depending on your build system and preferences:

1. Direct download of the [Android Archive file](https://repo1.maven.org/maven2/com/jaredrummler/material-spinner/1.2.5/material-spinner-1.2.5.aar).
    
2. Grabbing via Gradle:
    
    ```groovy
    compile 'com.jaredrummler:material-spinner:1.2.5'
    ```
    
3. Grab via Maven:
    
    ```xml
    
    com.jaredrummler
    material-spinner
    1.2.5
    aar
    ```
    

#### Usage

Here's a simple taste of this library:

```xml
<com.jaredrummler.materialspinner.MaterialSpinner
    android_id="@+id/spinner"
    android_layout_width="match_parent"
    android_layout_height="wrap_content"/>
```

That is in the layout. Then in java code:

```java
MaterialSpinner spinner = (MaterialSpinner) findViewById(R.id.spinner);
spinner.setItems("Ice Cream Sandwich", "Jelly Bean", "KitKat", "Lollipop", "Marshmallow");
spinner.setOnItemSelectedListener(new MaterialSpinner.OnItemSelectedListener<String>() {

  @Override public void onItemSelected(MaterialSpinner view, int position, long id, String item) {
    Snackbar.make(view, "Clicked " + item, Snackbar.LENGTH_LONG).show();
  }
});
```

Read more about MaterialSpinner here.

#### Full Example

Here's the full example project.

**MainActivity.java**

This is the main activity and the only class.

```java

import android.content.ActivityNotFoundException;
import android.content.Intent;
import android.net.Uri;
import android.os.Bundle;
import android.support.design.widget.FloatingActionButton;
import android.support.design.widget.Snackbar;
import android.support.v7.app.AppCompatActivity;
import android.support.v7.widget.Toolbar;
import android.view.View;
import com.jaredrummler.materialspinner.MaterialSpinner;

public class MainActivity extends AppCompatActivity {

  private static final String[] ANDROID_VERSIONS = {
      "Cupcake",
      "Donut",
      "Eclair",
      "Froyo",
      "Gingerbread",
      "Honeycomb",
      "Ice Cream Sandwich",
      "Jelly Bean",
      "KitKat",
      "Lollipop",
      "Marshmallow",
      "Nougat",
      "Oreo"
  };

  @Override protected void onCreate(Bundle savedInstanceState) {
    super.onCreate(savedInstanceState);
    setContentView(R.layout.activity_main);
    Toolbar toolbar = (Toolbar) findViewById(R.id.toolbar);
    setSupportActionBar(toolbar);

    FloatingActionButton fab = (FloatingActionButton) findViewById(R.id.fab);
    fab.setOnClickListener(new View.OnClickListener() {

      @Override public void onClick(View view) {
        try {
          startActivity(new Intent(Intent.ACTION_VIEW, Uri.parse("https://github.com/jaredrummler/MaterialSpinner")));
        } catch (ActivityNotFoundException ignored) {
        }
      }
    });

    MaterialSpinner spinner = (MaterialSpinner) findViewById(R.id.spinner);
    spinner.setItems(ANDROID_VERSIONS);
    spinner.setOnItemSelectedListener(new MaterialSpinner.OnItemSelectedListener<String>() {

      @Override public void onItemSelected(MaterialSpinner view, int position, long id, String item) {
        Snackbar.make(view, "Clicked " + item, Snackbar.LENGTH_LONG).show();
      }
    });
    spinner.setOnNothingSelectedListener(new MaterialSpinner.OnNothingSelectedListener() {

      @Override public void onNothingSelected(MaterialSpinner spinner) {
        Snackbar.make(spinner, "Nothing selected", Snackbar.LENGTH_LONG).show();
      }
    });
  }

}
```

**activity_main.xml**

This is the main layout of the main activity. We add MaterialSpinner here.

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
    tools_context=".MainActivity"
    tools_showIn="@layout/activity_main">

  <com.jaredrummler.materialspinner.MaterialSpinner
      android_id="@+id/spinner"
      app_ms_dropdown_max_height="350dp"
      app_ms_dropdown_height="wrap_content"
      android_layout_width="match_parent"
      android_layout_height="wrap_content"/>

</RelativeLayout>
```

#### Download

| No. | Location | Link |
| --- | --- | --- |
| 1. | GitHub | [Direct Download](https://github.com/jaredrummler/MaterialSpinner/archive/master.zip) |
| 2. | GitHub | [Browse](https://github.com/jaredrummler/MaterialSpinner/tree/master/demo) |
| 3. | Original Creator | [Jared Rumler](https://github.com/jaredrummler) |

## (c). MaterialSpinner(by Ganfra)

This is yet another Spinner with Material Design. This library supports Android API 14+. It's created by [@ganfra](https://github.com/ganfra). This library has more than 840 stars.

MaterialSpinner will provide your Spinner with the Material Design feel. Usage is just like any regular Spinner. You can add floating label text, hint and error messages to provide you with a very modern spinner.

![Android Material Spinner](https://github.com/ganfra/MaterialSpinner/raw/master/screenshots/screenshot.gif)

This library is created from `AppCompatSpinner`:

```java
public class MaterialSpinner extends AppCompatSpinner implements ValueAnimator.AnimatorUpdateListener {..}
```

#### Installation

Here's how you install materialspinner:

```groovy
implementation 'com.github.ganfra:material-spinner:2.0.0'
```

If you use other libraries requiring appcompat-v7 like MaterialEditText make sure to exclude them if you have issue at compile time :

```groovy
implementation ('com.github.ganfra:material-spinner:2.0.0'){
        exclude group: 'com.android.support', module: 'appcompat-v7'
}
```

#### Usage

In your XML you can use it like this:

```xml
<fr.ganfra.materialspinner.MaterialSpinner
        android_id="@+id/spinner"
        android_layout_width="match_parent"
        android_layout_height="wrap_content"
        app_ms_multiline="false"
        app_ms_dropDownHintView="@layout/my_custom_dropdown_hint_item_layout"
        app_ms_hintView="@layout/my_custom_hint_item_layout"
        app_ms_hint="hint"
        app_ms_enableFloatingLabel="false"
        app_ms_enableErrorLabel="false"
        app_ms_floatingLabelText="floating label"
        app_ms_baseColor="@color/base"
        app_ms_highlightColor="@color/highlight"
        app_ms_errorColor="@color/error"
        app_ms_typeface="typeface.ttf"
        app_ms_thickness="2dp"
        app_ms_hintColor="@color/hint"
        app_ms_arrowColor="@color/arrow"
        app_ms_arrowSize="16dp"
        app_ms_alignLabels="false"
        app_ms_floatingLabelColor="@color/floating_label"/>
```

Then in your code:

```java
 String[] ITEMS = {"Item 1", "Item 2", "Item 3", "Item 4", "Item 5", "Item 6"};
 ArrayAdapter<String> adapter = new ArrayAdapter<String>(this, android.R.layout.simple_spinner_item, ITEMS);
 adapter.setDropDownViewResource(android.R.layout.simple_spinner_dropdown_item);
 spinner = (MaterialSpinner) findViewById(R.id.spinner);
 spinner.setAdapter(adapter);
```

#### Full Example

Here's the full example of our MaterialSpinner:

**MainActivity.java**

```java

import android.os.Bundle;
import android.support.v7.app.AppCompatActivity;
import android.view.View;
import android.widget.ArrayAdapter;

import fr.ganfra.materialspinner.MaterialSpinner;

public class MainActivity extends AppCompatActivity {

    private static final String ERROR_MSG = "Very very very long error message to get scrolling or multiline animation when the error button is clicked";
    private static final String[] ITEMS = {"Item 1", "Item 2", "Item 3", "Item 4", "Item 5", "Item 6"};

    private ArrayAdapter<String> adapter;

    MaterialSpinner spinner1;
    MaterialSpinner spinner2;
    MaterialSpinner spinner3;
    MaterialSpinner spinner4;
    MaterialSpinner spinner5;
    MaterialSpinner spinner6;
    MaterialSpinner spinner7;

    private boolean shown = false;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);

        adapter = new ArrayAdapter<>(this, android.R.layout.simple_spinner_item, ITEMS);
        adapter.setDropDownViewResource(android.R.layout.simple_spinner_dropdown_item);

        initSpinnerHintAndFloatingLabel();
        initSpinnerOnlyHint();
        initSpinnerNoHintNoFloatingLabel();
        initSpinnerMultiline();
        initSpinnerScrolling();
        initSpinnerHintAndCustomHintView();
        initEmptyArray();

    }

    private void initSpinnerHintAndCustomHintView() {
        spinner6 = findViewById(R.id.spinner6);
        spinner6.setAdapter(adapter);
        spinner4.setHint("Select an item");
    }

    private void initSpinnerHintAndFloatingLabel() {
        spinner1 = findViewById(R.id.spinner1);
        spinner1.setAdapter(adapter);
        spinner1.setPaddingSafe(0, 0, 0, 0);
    }

    private void initSpinnerOnlyHint() {
        spinner2 = findViewById(R.id.spinner2);
    }

    private void initSpinnerNoHintNoFloatingLabel() {
        spinner3 = findViewById(R.id.spinner3);
        spinner3.setAdapter(adapter);
    }

    private void initSpinnerMultiline() {
        spinner4 = findViewById(R.id.spinner4);
        spinner4.setAdapter(adapter);
        spinner4.setHint("Select an item");
    }

    private void initSpinnerScrolling() {
        spinner5 = findViewById(R.id.spinner5);
        spinner5.setAdapter(adapter);
        spinner5.setHint("Select an item");
    }

    private void initEmptyArray() {
        String[] emptyArray = {};
        spinner7 = findViewById(R.id.spinner7);
        spinner7.setAdapter(new ArrayAdapter<>(this, android.R.layout.simple_spinner_item, emptyArray));
    }

    public void activateError(View view) {
        if (!shown) {
            spinner4.setError(ERROR_MSG);
            spinner5.setError(ERROR_MSG);
        } else {
            spinner4.setError(null);
            spinner5.setError(null);
        }
        shown = !shown;

    }

}
```

**activity_main.xml**

```xml
<ScrollView

    android_layout_width="match_parent"
    android_layout_height="match_parent">

    <LinearLayout
        android_layout_width="match_parent"
        android_layout_height="wrap_content"
        android_orientation="vertical"
        android_paddingBottom="@dimen/activity_vertical_margin"
        android_paddingLeft="@dimen/activity_horizontal_margin"
        android_paddingRight="@dimen/activity_horizontal_margin">

        <fr.ganfra.materialspinner.MaterialSpinner
            android_id="@+id/spinner1"
            android_layout_width="match_parent"
            android_layout_height="wrap_content"
            app_ms_arrowColor="#0000FF"
            app_ms_arrowSize="16dp"
            app_ms_floatingLabelColor="#00FF00"
            app_ms_floatingLabelText="floating label"
            app_ms_hint="hint"
            app_ms_multiline="true" />

        <fr.ganfra.materialspinner.MaterialSpinner
            android_id="@+id/spinner2"
            android_layout_width="match_parent"
            android_layout_height="wrap_content"
            app_ms_enableErrorLabel="false"
            app_ms_enableFloatingLabel="false"
            app_ms_hint="hint"
            app_ms_hintColor="#0000FF" />

        <fr.ganfra.materialspinner.MaterialSpinner
            android_id="@+id/spinner3"
            android_layout_width="match_parent"
            android_layout_height="wrap_content"
            app_ms_enableErrorLabel="false"
            app_ms_enableFloatingLabel="false" />

        <fr.ganfra.materialspinner.MaterialSpinner
            android_id="@+id/spinner4"
            android_layout_width="match_parent"
            android_layout_height="wrap_content"
            app_ms_alignLabels="false"
            app_ms_baseColor="@color/spinner_base_color"
            app_ms_multiline="false" />

        <fr.ganfra.materialspinner.MaterialSpinner
            android_id="@+id/spinner5"
            android_layout_width="match_parent"
            android_layout_height="wrap_content" />

        <fr.ganfra.materialspinner.MaterialSpinner
            android_id="@+id/spinner6"
            android_layout_width="match_parent"
            android_layout_height="wrap_content"
            app_ms_enableErrorLabel="false"
            app_ms_enableFloatingLabel="false"
            app_ms_dropDownHintView="@layout/dropdown_hint_item"
            app_ms_hintView="@layout/hint_item"
            app_ms_hint="hint"
            app_ms_hintColor="#0000FF" />

        <fr.ganfra.materialspinner.MaterialSpinner
            android_id="@+id/spinner7"
            android_layout_width="match_parent"
            android_layout_height="wrap_content" />

        <Button
            android_layout_width="match_parent"
            android_layout_height="wrap_content"
            android_hint="Show/hide error"
            android_onClick="activateError" />

    </LinearLayout>
</ScrollView>
```

#### Download

| No. | Location | Link |
| --- | --- | --- |
| 1. | GitHub | [Direct Download](https://github.com/ganfra/MaterialSpinner/archive/master.zip) |
| 2. | GitHub | [Browse](https://github.com/ganfra/MaterialSpinner/tree/master/sample) |
| 3. | Original Creator | [@Ganfra](https://github.com/ganfra) |

## (d). Rtl Material Spinner

This is a library inspired by @Ganfra's MaterialSpinner. It provides RTL(Right To Left) alignment of items in our Material Spinner. So in a sense it's an extension of MaterialSpinner we looked at above.

RtlMaterialSpinner, like Ganfra's MaterialSpinner is created from `AppCompatSpinner`:

```java
public class RtlMaterialSpinner extends AppCompatSpinner implements ValueAnimator.AnimatorUpdateListener {..}
```

This library is created by [Ali Abdollahi](https://github.com/aliab) and is released under Apache 2.0 license.

#### Installation

This library is hosted in jitpack. Hence to install we have to register jitpack as a repository in our root level build.gradle:

```groovy
allprojects {
        repositories {
            ...
            maven { url "https://jitpack.io" }
        }
    }
```

Then we can add our implementation statement:

```groovy
dependencies {
    implementation 'com.github.aliab:RTLMaterialSpinner:V1.0.1'
}
```

#### Usages

In your XML you add:

```xml
<ir.hamsaa.RtlMaterialSpinner
        android_id="@+id/spinner"
        android_layout_width="fill_parent"
        android_layout_height="wrap_content"
        app_ms_hint="hint"
        app_ms_enableFloatingLabel="false"
        app_ms_enableErrorLabel="false"
        app_ms_floatingLabelText="floating label"
        app_ms_baseColor="@color/base"
        app_ms_highlightColor="@color/highlight"
        app_ms_errorColor="@color/error"
        app_ms_typeface="typeface.ttf"
        app_ms_thickness="2dp"
        app_ms_hintColor="@color/hint"
        app_ms_arrowColor="@color/arrow"
        app_ms_arrowSize="16dp"
        app_ms_alignLabels="false"
        app_ms_floatingLabelColor="@color/floating_label"/>
```

And in your java code you can use it this way:

```java
 String[] ITEMS = {"Item 1", "Item 2", "Item 3", "Item 4", "Item 5", "Item 6"};
 ArrayAdapter<String> adapter = new ArrayAdapter<String>(this, android.R.layout.simple_spinner_item, ITEMS);
 adapter.setDropDownViewResource(android.R.layout.simple_spinner_dropdown_item);
 spinner = (RtlMaterialSpinner) findViewById(R.id.spinner);
 spinner.setAdapter(adapter);
```

#### Full Example

Here's a full RTLMaterialSpinner example:

**MainActivity.java**

```java
package ir.hamsaa.rtlmaterialspinner.sample;

import android.os.Bundle;
import android.support.v7.app.AppCompatActivity;
import android.view.View;
import android.widget.ArrayAdapter;

import fr.hamsaa.materialspinner.sample.R;
import ir.hamsaa.RtlMaterialSpinner;

public class MainActivity extends AppCompatActivity {

    private static final String ERROR_MSG = "یک خطا خیلی خیلی خیلی طولانی که برای نمایش قابلیت اسکرول ایجاد شده است و بسیار خوب است!";
    private static final String[] ITEMS = {"ایتم اول", "ایتم دوم", "ایتم سوم", "ایتم چهارم", "ایتم پنجم", "ایتم ششم"};

    private ArrayAdapter<String> adapter;

    RtlMaterialSpinner spinner1;
    RtlMaterialSpinner spinner3;
    RtlMaterialSpinner spinner4;
    RtlMaterialSpinner spinner5;

    private boolean shown = false;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);

        adapter = new ArrayAdapter<>(this, android.R.layout.simple_spinner_item, ITEMS);
        initSpinnerHintAndFloatingLabel();
        initSpinnerNoHintNoFloatingLabel();
        initSpinnerMultiline();
        initSpinnerScrolling();

    }

    private void initSpinnerHintAndFloatingLabel() {
        spinner1 = (RtlMaterialSpinner) findViewById(R.id.spinner1);
        spinner1.setAdapter(adapter);
        spinner1.setPaddingSafe(0, 0, 0, 0);
    }

    private void initSpinnerNoHintNoFloatingLabel() {
        spinner3 = (RtlMaterialSpinner) findViewById(R.id.spinner3);
        spinner3.setAdapter(adapter);
    }

    private void initSpinnerMultiline() {
        spinner4 = (RtlMaterialSpinner) findViewById(R.id.spinner4);
        spinner4.setAdapter(adapter);
        spinner4.setHint("یک ایتم را انتخاب کنید");
    }

    private void initSpinnerScrolling() {
        spinner5 = (RtlMaterialSpinner) findViewById(R.id.spinner5);
        spinner5.setAdapter(adapter);
        spinner5.setHint("یک ایتم را انتخاب کنید");
    }

    public void activateError(View view) {
        if (!shown) {
            spinner4.setError(ERROR_MSG);
            spinner5.setError(ERROR_MSG);
        } else {
            spinner4.setError(null);
            spinner5.setError(null);
        }
        shown = !shown;

    }

}
```

#### activity_main.xml

```xml
<ScrollView

    android_layout_width="match_parent"
    android_layout_height="match_parent">

    <LinearLayout
        android_layout_width="match_parent"
        android_layout_height="wrap_content"
        android_orientation="vertical"
        android_paddingBottom="@dimen/activity_vertical_margin"
        android_paddingLeft="@dimen/activity_horizontal_margin"
        android_paddingRight="@dimen/activity_horizontal_margin">

        <ir.hamsaa.RtlMaterialSpinner
            android_id="@+id/spinner1"
            android_layout_width="fill_parent"
            android_layout_height="wrap_content"
            app_ms_arrowColor="#0000FF"
            app_ms_arrowSize="16dp"
            app_ms_floatingLabelColor="#00FF00"
            app_ms_floatingLabelText="floating label"
            app_ms_hint="یکی از ایتم ها را انتخاب کنید"
            app_ms_isRtl="true"
            app_ms_typeface="Shabnam-Light-FD.ttf" />

        <ir.hamsaa.RtlMaterialSpinner
            android_id="@+id/spinner3"
            android_layout_width="fill_parent"
            android_layout_height="wrap_content"
            app_ms_enableErrorLabel="false"
            app_ms_enableFloatingLabel="false"
            app_ms_isRtl="true"
            app_ms_typeface="Shabnam-Light-FD.ttf" />

        <ir.hamsaa.RtlMaterialSpinner
            android_id="@+id/spinner4"
            android_layout_width="fill_parent"
            android_layout_height="wrap_content"
            app_ms_alignLabels="false"
            app_ms_baseColor="@color/spinner_base_color"
            app_ms_isRtl="true"
            app_ms_typeface="Shabnam-Light-FD.ttf" />

        <ir.hamsaa.RtlMaterialSpinner
            android_id="@+id/spinner5"
            android_layout_width="fill_parent"
            android_layout_height="wrap_content"
            app_ms_isRtl="true"
            app_ms_typeface="Shabnam-Light-FD.ttf" />

        <Button
            android_layout_width="fill_parent"
            android_layout_height="wrap_content"
            android_hint="@string/show_hide_error"
            android_onClick="activateError" />

    </LinearLayout>
</ScrollView>
```

#### Download

| No. | Location | Link |
| --- | --- | --- |
| 1. | GitHub | [Direct Download](https://github.com/aliab/RTLMaterialSpinner/archive/master.zip) |
| 2. | GitHub | [Browse](https://github.com/aliab/RTLMaterialSpinner/tree/master/sample) |
| 3. | Original Creator | [@aliab](https://github.com/aliab) |
