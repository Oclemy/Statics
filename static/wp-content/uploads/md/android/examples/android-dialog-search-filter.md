# Android Dialog Search Filter Solutions


One of the most convenient ways of searching data in android apps is via a Search Dialog. Typically it comprises of searchview and recyclerview placed inside a modal. This type of design is highly suitable for searching since it doesn't interfere with your activity/fragment design.

Users can easily invoke the dialog via a button click, then search data and close the dialog.

In this tutorial we will look at solutions regarding how to implement this type of configuration in our app. We will look at the best android dialog search libraries and look at examples of how to use them be it in Kotlin or java.


## (a). Search-Dialog

> This is an easy to use, yet very customizable search dialog.

It provides you with an awesome and customizable search dialog with built-in search options.

Here is a demo:

![Android Search Dialog](https://cloud.githubusercontent.com/assets/8886687/26755439/869f9e6c-48a2-11e7-9e6c-829b573e7730.jpg)

Let's look at how to use it.

### Step 1: Install it

The first step is to install. In your root-level build.gradle specify jitpack as a maven repository:

```groovy
allprojects {
    repositories {
        ...
        maven { url "https://jitpack.io" }
    }
}
```

Then in the app-level build.gradle specify the dependency as follows:

```groovy
implementation 'com.github.mirrajabi:search-dialog:1.2.4'
```

Now sync to download the library.

### Step 2: Write Code

The second step is to write your code. The first thing here is to implement the `Searchable` interface in your model class:

```java
public class SampleSearchModel implements Searchable {
    private String mTitle;

    public SampleSearchModel(String title) {
        mTitle = title;
    }

    @Override
    public String getTitle() {
        return mTitle;
    }

    public SampleSearchModel setTitle(String title) {
        mTitle = title;
        return this;
    }
}
```

You then prepare the data that will be searched:

```java
    private ArrayList<SampleSearchModel> createSampleData(){
        ArrayList<SampleSearchModel> items = new ArrayList<>();
        items.add(new SampleSearchModel("First item"));
        items.add(new SampleSearchModel("Second item"));
        items.add(new SampleSearchModel("Third item"));
        items.add(new SampleSearchModel("The ultimate item"));
        items.add(new SampleSearchModel("Last item"));
        items.add(new SampleSearchModel("Lorem ipsum"));
        items.add(new SampleSearchModel("Dolor sit"));
        items.add(new SampleSearchModel("Some random word"));
        items.add(new SampleSearchModel("guess who's back"));
        return items;
    }
```

Then you create and show the search dialog as follows:

```java
new SimpleSearchDialogCompat(MainActivity.this, "Search...",
                        "What are you looking for...?", null, createSampleData(),
                        new SearchResultListener<SampleSearchModel>() {
                            @Override
                            public void onSelected(BaseSearchDialogCompat dialog,
                                                   SampleSearchModel item, int position) {
                                // If filtering is enabled, [position] is the index of the item in the filtered result, not in the unfiltered source
                                Toast.makeText(MainActivity.this, item.getTitle(),
                                        Toast.LENGTH_SHORT).show();
                                dialog.dismiss();
                            }
                        }).show();
```

### Example

If you want a full example that includes usage of a customadapter then find it [here](https://github.com/mirrajabi/search-dialog/tree/master/app)

### Reference

Here is the reference:

| No. | Link |
| --- | --- |
| 1. | [Reference](https://github.com/mirrajabi/search-dialog) |
| 2. | [Example](https://github.com/mirrajabi/search-dialog/tree/master/app) |

## (b). Search Dialog

> Android Search Dialog Library.

Here is the demo image:

![Android Search Dialog](https://camo.githubusercontent.com/732c170ea8563f38ce672c6c810eb5a16e404fbafdde2721143f89e87b7f7565/68747470733a2f2f692e696d6775722e636f6d2f343749487451482e706e67)

Let's see how to create a search dialog with this solution.

### Step 1: Install it

The first step is to install it. Add jitapck as follows:

```groovy
    allprojects {
        repositories {
            ...
            maven { url 'https://jitpack.io' }
        }
    }
```

Then add the implementation statement in your build.gradle file:

```groovy
implementation 'com.github.ajithvgiri:search-dialog:v1.5'
```

Now sync it.

### Step 2: Write Code

The second step is to initialize the search dialog. Here is how you do it in kotlin:

```kotlin
 val searchableDialog = SearchableDialog(this, searchListItems, getString(R.string.country))
    searchableDialog.setOnItemSelected(this) // implement 'OnSearchItemSelected'in your Activity
```

And in java:

```java
      List<SearchListItem> searchListItems = new ArrayList<>();
      SearchableDialog  searchableDialog = new SearchableDialog(this, searchListItems, "Title");
```

In both cases we are assuming that your model contains id and title.

Now to show the dialog simply invoke the `show()` method:

```java
        searchableDialog.show();
```

To get the selected item from the dialog in Kotlin:

```kotlin
         @Override
         public void onClick(int position, SearchListItem searchListItem) {
                searchableDialog.dismiss();
               // searchListItem.getId(); returns id
              // searchListItem.getTitle(); returns title
         }
```

And in java:

```java
         @Override
         public void onClick(int position, SearchListItem searchListItem) {
                searchableDialog.dismiss();
               // searchListItem.getId(); returns id
              // searchListItem.getTitle(); returns title
         }
```

### Example

Let's now look at a full search dialog example in kotlin using this solution.

Start by following the installation steps we'd covered.

Then replace your main activity with the following code:

```kotlin
import android.os.Bundle
import androidx.appcompat.app.AppCompatActivity
import com.ajithvgiri.searchdialog.OnSearchItemSelected
import com.ajithvgiri.searchdialog.SearchListItem
import com.ajithvgiri.searchdialog.SearchableDialog
import com.google.android.material.textfield.TextInputEditText
import kotlinx.android.synthetic.main.country_details.*

class MainActivity : AppCompatActivity(), OnSearchItemSelected {

    lateinit var searchableDialog: SearchableDialog
    var searchListItems: ArrayList<SearchListItem> = ArrayList()
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_main)
        for (i in 0..9) {
            val searchListItem = SearchListItem(i, "Country $i")
            searchListItems.add(searchListItem)
        }

        searchableDialog = SearchableDialog(this, searchListItems, getString(R.string.country))
        searchableDialog.setOnItemSelected(this)

        val countryTextInputEditText = findViewById<TextInputEditText>(R.id.countryTextInputEditText)
        countryTextInputEditText.setOnClickListener { searchableDialog.show() }

    }

    override fun onClick(position: Int, searchListItem: SearchListItem) {
        searchableDialog.dismiss()
        countryCodeTextView.text = searchListItem.id.toString()
        countryNameTextView.text = searchListItem.title
    }
}
```

That's it. You can find the code [here](https://github.com/ajithvgiri/search-dialog/tree/master/app).

### Reference

Find complete reference below:

| No. | Link |
| --- | --- |
| 1. | [Example](https://github.com/ajithvgiri/search-dialog/tree/master/app) |
| 2. | [Reference](https://github.com/ajithvgiri/search-dialog/) |

## (c). Android-Multi-Select-Dialog

> A multi choice select dialog with Search and Text highlighting.

The solutions we've looked so far allows you to search and only click a single item. However sometimes you may need to search and select multiple search results. This is what this solution offers you.

Here are its features:

- Provides Multi selection Dialog
- Search through list
- Highlighted the search text

Here is a demo:

![Android search and multichoice](https://github.com/abumoallim/Android-Multi-Select-Dialog/raw/master/ezgif.com-video-to-gif.gif)

### Step 1: Install it

1. **Add the JitPack repository to your build file**

Add it in your root build.gradle at the end of repositories:

```groovy
    allprojects {
        repositories {
            ...
            maven { url 'https://jitpack.io' }
        }
    }
```

2. **Add the dependency**

```groovy
    dependencies {
             compile 'com.github.abumoallim:Android-Multi-Select-Dialog:v1.9'
    }
```

Then sync.

### Step 2: Write Code

Then you instantiate the multichoice dialog and set its properties:

```java
 //MultiSelectModel
        MultiSelectDialog multiSelectDialog = new MultiSelectDialog()
                .title(getResources().getString(R.string.multi_select_dialog_title)) //setting title for dialog
                .titleSize(25)
                .positiveText("Done")
                .negativeText("Cancel")
        .setMinSelectionLimit(1) //you can set minimum checkbox selection limit (Optional)
        .setMaxSelectionLimit(listOfCountries.size()) //you can set maximum checkbox selection limit (Optional)
                .preSelectIDsList(alreadySelectedCountries) //List of ids that you need to be selected
                .multiSelectList(listOfCountries) // the multi select model list with ids and name
                .onSubmit(new MultiSelectDialog.SubmitCallbackListener() {
                    @Override
                    public void onSelected(ArrayList<Integer> selectedIds, ArrayList<String> selectedNames, String dataString) {
                        //will return list of selected IDS
                        for (int i = 0; i < selectedIds.size(); i++) {
                            Toast.makeText(MainActivity.this, "Selected Ids : " + selectedIds.get(i) + "\n" +
                                    "Selected Names : " + selectedNames.get(i) + "\n" +
                                    "DataString : " + dataString, Toast.LENGTH_SHORT).show();
                        }

                    }

                    @Override
                    public void onCancel() {
                        Log.d(TAG,"Dialog cancelled");
                    }

                });
```

Finally you show it:

```java

multiSelectDialog.show(getSupportFragmentManager(), "multiSelectDialog");
```

### Example

Let's look at a search dialog with multichoice option using this library:

Install the library as we had discussed:

Then replace you main activity with the following code:

**MainActivity.java**

```java
import android.os.Bundle;
import android.support.v7.app.AppCompatActivity;
import android.util.Log;
import android.view.View;
import android.widget.Button;
import android.widget.Toast;

import com.abdeveloper.library.MultiSelectDialog;
import com.abdeveloper.library.MultiSelectModel;

import java.util.ArrayList;

public class MainActivity extends AppCompatActivity implements View.OnClickListener {

    private String TAG = "Cancel";

    Button show_dialog_btn;

    MultiSelectDialog multiSelectDialog;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.main_activity);

        show_dialog_btn = findViewById(R.id.show_dialog);
        show_dialog_btn.setOnClickListener(this);

        //preselected Ids of Country List
        final ArrayList<Integer> alreadySelectedCountries = new ArrayList<>();
        alreadySelectedCountries.add(1);
        alreadySelectedCountries.add(3);
        alreadySelectedCountries.add(4);
        alreadySelectedCountries.add(7);

        //List of Countries with Name and Id
        ArrayList<MultiSelectModel> listOfCountries= new ArrayList<>();
        listOfCountries.add(new MultiSelectModel(1,"INDIA"));
        listOfCountries.add(new MultiSelectModel(2,"USA"));
        listOfCountries.add(new MultiSelectModel(3,"UK"));
        listOfCountries.add(new MultiSelectModel(4,"UAE"));
        listOfCountries.add(new MultiSelectModel(5,"JAPAN"));
        listOfCountries.add(new MultiSelectModel(6,"SINGAPORE"));
        listOfCountries.add(new MultiSelectModel(7,"CHINA"));
        listOfCountries.add(new MultiSelectModel(8,"RUSSIA"));
        listOfCountries.add(new MultiSelectModel(9,"BANGLADESH"));
        listOfCountries.add(new MultiSelectModel(10,"BELGIUM"));
        listOfCountries.add(new MultiSelectModel(11,"DENMARK"));
        listOfCountries.add(new MultiSelectModel(12,"GERMANY"));
        listOfCountries.add(new MultiSelectModel(13,"HONG KONG"));
        listOfCountries.add(new MultiSelectModel(14,"INDONESIA"));
        listOfCountries.add(new MultiSelectModel(15,"NETHERLAND"));
        listOfCountries.add(new MultiSelectModel(16,"NEW ZEALAND"));
        listOfCountries.add(new MultiSelectModel(17,"PORTUGAL"));
        listOfCountries.add(new MultiSelectModel(18,"KUWAIT"));
        listOfCountries.add(new MultiSelectModel(19,"QATAR"));
        listOfCountries.add(new MultiSelectModel(20,"SAUDI ARABIA"));
        listOfCountries.add(new MultiSelectModel(21,"SRI LANKA"));
        listOfCountries.add(new MultiSelectModel(130,"CANADA"));

        //MultiSelectModel
        multiSelectDialog = new MultiSelectDialog()
                .title(getResources().getString(R.string.multi_select_dialog_title)) //setting title for dialog
                .titleSize(25)
                .positiveText("Done")
                .negativeText("Cancel")
                .setMinSelectionLimit(0)
                .setMaxSelectionLimit(listOfCountries.size())
                .preSelectIDsList(alreadySelectedCountries) //List of ids that you need to be selected
                .multiSelectList(listOfCountries) // the multi select model list with ids and name
                .onSubmit(new MultiSelectDialog.SubmitCallbackListener() {
                    @Override
                    public void onSelected(ArrayList<Integer> selectedIds, ArrayList<String> selectedNames, String dataString) {
                        //will return list of selected IDS
                        for (int i = 0; i < selectedIds.size(); i++) {
                            Toast.makeText(MainActivity.this, "Selected Ids : " + selectedIds.get(i) + "\n" +
                                    "Selected Names : " + selectedNames.get(i) + "\n" +
                                    "DataString : " + dataString, Toast.LENGTH_SHORT).show();
                        }

                    }

                    @Override
                    public void onCancel() {
                        Log.d(TAG,"Dialog cancelled");

                    }
                });

    }

    @Override
    public void onClick(View view) {
        multiSelectDialog.show(getSupportFragmentManager(), "multiSelectDialog");
    }
}
```

### Reference

Here is the reference:

| No. | Link |
| --- | --- |
| 1. | [Example](https://github.com/abumoallim/Android-Multi-Select-Dialog/tree/master/app) |
| 2. | [Reference](https://github.com/abumoallim/Android-Multi-Select-Dialog) |
