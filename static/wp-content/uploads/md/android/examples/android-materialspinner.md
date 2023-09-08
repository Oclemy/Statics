# Material Spinner Example



A spinner is an android widget that basically displays items in dropdown. Thus allowing ussers to select only one item at a time.

The parent class of the inbuilt android spinner is the AbsSpinner, a an abstract adapterview.However, sometimes we are not so much attracted to the inbuilt or default spinner, due to functionality limitations or we just want something nicer.


In that case we can look at GitHub and obtain a third party library. [Material Spinner](https://github.com/jaredrummler/MaterialSpinner) is such library. It was first created by [Jared Rumler](https://github.com/jaredrummler) more than 2 years ago. Since then it’s been receiving updates.

This library provides us an awesome spinner view for android. Here is the demo that will be created shortly:

![Material SPinner example](https://github.com/jaredrummler/MaterialSpinner/raw/master/demo.gif)

#### MaterialSpinner Definition

MaterialSpinner is not built from the Spinner widget provided by android. Instead it’s a custom Spinner built from TextView.

First it belongs to the following package:

```java
package com.jaredrummler.materialspinner;
```

It’s a public class deriving from TextView:

```java
public class MaterialSpinner extends TextView {}
```

#### Creating Material Spinner

MaterialSpinner provides three public contructors for programmatic creation:

| No. | Contsructor |
| --- | --- |
| 1. | `public MaterialSpinner(Context context) {}` |
| 2. | `public MaterialSpinner(Context context, AttributeSet attrs) {}` |
| 3. | `public MaterialSpinner(Context context, AttributeSet attrs, int defStyleAttr) {}` |

Internally, these contructors call a method called `init()` where they pass their parameters to that method. It is the `init()` method which then retrieves the default properties to be used from the resources. These properties include

- TextColor
- BackgroundColor
- HintColor
- PopupWindow Height dimensions etc

Furthermore a [ListView](https://camposha.info/android/listview) gets instantiated inside this init() method among other things. It is this [ListView](https://camposha.info/android/listview) that will be used to render the dropdown list of items.

##### Creation Via XML

You can also set the MaterialSpinner via XML layout:

```xml
<com.jaredrummler.materialspinner.MaterialSpinner
    android_id="@+id/spinner"
    android_layout_width="match_parent"
    android_layout_height="wrap_content"/>
```

then reference it from the Code:

```java
MaterialSpinner mySpinner = (MaterialSpinner) findViewById(R.id.spinner);
```

#### Populating the MaterialSpinner

MaterialSpinner, even though it derives from TextView, is a spinner, a custom one. Hence it renders collection of items in a dropdown list.

Normally with the default android spinner, you create an adapter explicitly to bind to your adapter.

However, MaterialSpinner is easier to use and saves you from this.

It internally maintains an adapter for you, a custom adapter called MaterialSpinnerAdapter.

That adapter is a child of BaseAdapter.

MaterialSpinner provides us with a public method called `setItems()` which we overload with different parameter types.

| No. | Method | Description |
| --- | --- | --- |
| 1. | public void setItems(@NonNull T… items) | Internally it calls the other setItems() method converting our passed array to a list and passing it as a parameter |
| 2. | public void setItems(@NonNull List items) | Passes this List to a MaterialSpinnerAdapter constructor. Then sets the adapter instance internally to the MaterialSpinner. |

##### Usage Example

Here’s an example:

```java
mySpinner.setItems("Casini", "Galileo", "James Web", "Hubble", "Chandra");
```

_Note you haven’t set any adapter explicitly_.

##### Via Adapter

You can also use an adapter.

This can be a custom adapter by passing in a ListAdapter reference:

```java
 public void setAdapter(@NonNull ListAdapter adapter) {}
```

This will instantiate a MaterialSpinnerAdapterWrapper class, passing in your ListAdapter object. Then moving the MaterialSpinnerAdapterWrapper instance into `setAdapterInternal` private method.

Or by passing a MaterialSpinnerAdapter instance into the setAdapter() method:

```java
 public <T> void setAdapter(MaterialSpinnerAdapter<T> adapter) {}
```

This will also pass that adapter into the `setAdapterInternal()` method. The `setAdapterInternal()` is a private method residing in the MaterialSpinner class with the following responsibilities:

1. Set the the MaterialSpinnerAdapter instance it receieves as the adapter for our [ListView](https://camposha.info/android/listview). Note that the MaterialSpinnerAdapter itself is a child of BaseAdapter, so [ListView](https://camposha.info/android/listview) can accept it.
2. Check if the passed adapter has items in it. Then set the hint text, hint color and text color.

#### Listening To Selection Change Events

We can listen to selection change events for our spinner in a very easy manner:

```java
mySpinner.setOnItemSelectedListener(new MaterialSpinner.OnItemSelectedListener<String>() {

  @Override public void onItemSelected(MaterialSpinner view, int position, long id, String item) {
    Snackbar.make(view, "Clicked " + item, Snackbar.LENGTH_LONG).show();
  }
});
```

#### Installing MaterialSpinner

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
    

#### Material Spinner Example

Let’s now look at a material spinner example.

##### Questions this Example Answers

1. Android Material Spinner Library and example.
2. How to populate material spinner with an array of data.
3. How to listen to selection events of material spinner.

##### Gradle Scripts

##### (a)Build.gradle

First we need to install Material Spinner by adding the following implementation statement in our app level build.gradle:

```groovy
implementation 'com.jaredrummler:material-spinner:1.2.5'
```

##### Resources

We will have two XML Layouts:

##### (a). activity_main.xml

Here’s our activity_main.xml. At the root we have a CoordinatorLayout.

Take note we are including the `content_main.xml`:

```xml
<?xml version="1.0" encoding="utf-8"?>
<android.support.design.widget.CoordinatorLayout

    android_layout_width="match_parent"
    android_layout_height="match_parent"
    android_fitsSystemWindows="true"
    tools_context=".MainActivity">

  <android.support.design.widget.AppBarLayout
      android_layout_width="match_parent"
      android_layout_height="wrap_content"
      android_theme="@style/AppTheme.AppBarOverlay">

    <android.support.v7.widget.Toolbar
        android_id="@+id/toolbar"
        android_layout_width="match_parent"
        android_layout_height="?attr/actionBarSize"
        android_background="?attr/colorPrimary"
        app_popupTheme="@style/AppTheme.PopupOverlay"/>

  </android.support.design.widget.AppBarLayout>

  <include layout="@layout/content_main"/>

  <android.support.design.widget.FloatingActionButton
      android_id="@+id/fab"
      android_layout_width="wrap_content"
      android_layout_height="wrap_content"
      android_layout_gravity="bottom|end"
      android_layout_margin="@dimen/fab_margin"
      android_src="@drawable/ic_github_white_24dp"/>

</android.support.design.widget.CoordinatorLayout>
```

##### (b) content_main.xml

This is where we add our MaterialSpinner. At the root we have a [RelativeLayout](https://camposha.info/android/relativelayout).

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

#### Java Code

##### (a). MainActivity.java

This is our launcher and only activity. We will populate our MaterialSpinner with an array of strings.

First we are referencing our material spinner from our layout using `findViewById()` method of the [Activity](https://camposha.info/android/activity) class:

```java
    MaterialSpinner spinner = (MaterialSpinner) findViewById(R.id.spinner);
```

To fill our materialspinner with data we simply use the `setItems()` method:

```java
    spinner.setItems(ANDROID_VERSIONS);
```

Then we also listen to the item selection events our Spinner:

```java
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
```

Here’s the full code:

```java

package com.jaredrummler.materialspinner.example;

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

#### Download

Also check our video tutorial it’s more detailed and explained in step by step.

| No. | Location | Link |
| --- | --- | --- |
| 1. | GitHub | [Direct Download](https://github.com/jaredrummler/MaterialSpinner/archive/master.zip) |
| 2. | GitHub | [Browse](https://github.com/jaredrummler/MaterialSpinner/tree/master/demo) |

Credit to the Original Creator [Jared Rumler](https://github.com/jaredrummler)

## Example 2: Android MaterialSpinner with Floating Labels

_Android MaterialSpinner Library and Example._

We will use a library created by [@Ganfra](https://github.com/ganfra) called MaterialSpinner.

This is differnt from Jared Rumler’s MaterialSpinner.

MaterialSpinner(Ganfra’s) will provides us a Spinner with the Material style. You can use it like any regular Spinner.

It allows you to:

1. Add floating label text
2. Add hint and
3. Add error messages.

#### Demo

Here’s the example demo we explore to learn how to use MaterialSpinner library.

![Android Material Spinner](https://github.com/ganfra/MaterialSpinner/raw/master/screenshots/screenshot.gif)

#### Requirements

MaterialSpinner is used with android projects and requires at least API 14.

#### Installation

[Android Studio](https://camposha.info/android/android-studio) uses the gradle as it’s build system.

Therefore we normally write gradle scripts to do several tasks related to our project. Such a task can be fetching a library as a dependency and adding it to our project.

So to add MaterialSpinner into your project, navigate over to the app-level(located in app folder of your project) and add the following under the dependencies closure:

```groovy
implementation 'com.github.ganfra:material-spinner:2.0.0'
```

[notice] If you use other libraries requiring appcompat-v7 like MaterialEditText make sure to exclude them if you have issue at compile time. [/notice. Check below.]

```groovy
compile ('com.github.ganfra:material-spinner:2.0.0'){
        exclude group: 'com.android.support', module: 'appcompat-v7'
}
```

#### How to use it

First you need to add it in your xml layout where you want it rendered:

You can see there are various options:

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

MaterialSpinner allows you to set a hint and a floating label text so that suppose no floating label text is provided, the hint gets displayed.

Then in your java code you use it like a regular spinner with an adapter like ArrayAdapter:

```java
 String[] ITEMS = {"Item 1", "Item 2", "Item 3", "Item 4", "Item 5", "Item 6"};
 ArrayAdapter<String> adapter = new ArrayAdapter<String>(this, android.R.layout.simple_spinner_item, ITEMS);
 adapter.setDropDownViewResource(android.R.layout.simple_spinner_dropdown_item);
 spinner = (MaterialSpinner) findViewById(R.id.spinner);
 spinner.setAdapter(adapter);
```

You can activate the error mode or deactivate:

```java
 //Activate
 spinner.setError("Error");
 //Desactivate
 spinner.setError(null);
```

#### Full MaterialSpinner Example

Let’s now look at a full material spinner example.

##### (a) hint_item.xml

We have a TextView as our root element.

```xml
<?xml version="1.0" encoding="utf-8"?>
<TextView
    android_id="@android:id/text1"
    style="?android:attr/spinnerItemStyle"
    android_paddingLeft="0dp"
    android_background="@color/spinner_hint_text_color"
    android_singleLine="true"
    android_layout_width="match_parent"
    android_layout_height="wrap_content"
    android_ellipsize="marquee"
    android_textAlignment="inherit"/>
```

##### (b) dropdown_hint_item.xml

Also a TextView .

```xml
<?xml version="1.0" encoding="utf-8"?>
<TextView
    android_layout_width="match_parent"
    android_layout_height="match_parent"
    android_paddingLeft="40dp"
    android_background="@android:color/darker_gray"
    android_orientation="vertical" />
```

##### (c) activity_main.xml

This layout will be inflated into the main [activity](https://camposha.info/android/activity).

At the root we have a ScrollView. Inside it are several MaterialSpinner widgets arranged linearly and vertically and a button at the bottom.

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

##### (b) MainActivity.java

This is the main activity and as class constants we have an error message as well as string array of items.

Then an ArrayAdapter and our spinner widgets as instance fields.

We will instantiate the ArrayAdapter and set invoke it’s `setDropDownViewResource` method, passing in our dropdown view resource as `android.R.layout.simple_spinner_dropdown_item`. `setDropDownViewResource()` is a method responsible for Setting the layout resource to create the drop down views.

We then create several methods, each responsible for referencing a given MaterialSpinner and setting it’s adapter.

Here’s the full code:

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

#### Download

Also check our video tutorial it’s more detailed and explained in step by step.

| No. | Location | Link |
| --- | --- | --- |
| 1. | GitHub | [Direct Download](https://github.com/ganfra/MaterialSpinner/archive/master.zip) |
| 2. | GitHub | [Browse](https://github.com/ganfra/MaterialSpinner/tree/master/sample) |

Credit to the Original Creator [Ganfra](https://github.com/ganfra)

#### How to Run

1. Download the project.
2. Go over to sample folder and edit import it to your android studio.Alternatively you can just copy paste the classes as well as the layouts and maybe other resources into your already created project.
3. Then edit the app level build/gradle to add our dependency.
