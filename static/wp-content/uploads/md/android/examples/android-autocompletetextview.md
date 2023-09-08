# Kotlin Android AutoCompleteTextView Examples


In this tutorial you will learn about AutoCompleteTextView via various simple step by step examples.


## Example 1: Kotlin Android AutoCompleteTextView with DropDown List

This is a simple autocompletetextview examples to show countries suggestions as you type.It Shows how to use an AutoCompleteTextView to provide suggestions as a user types. The AutoCompleteTextView is located at the top of the screen, so the suggestions appear in a drop down list.

### Step 1: Create Project

Start by creating an empty `Android Studio` project.

### Step 2: Dependencies

No special dependencies are needed for this project.

### Step 3: Design Layout

In your xml layout add AutoCompleteTextView as follows:

**automcomplete_1.xml**

```xml
<?xml version="1.0" encoding="utf-8"?>
<LinearLayout xmlns:android="http://schemas.android.com/apk/res/android"
    android:orientation="vertical"
    android:layout_width="match_parent"
    android:layout_height="wrap_content">

    <TextView
        android:layout_width="wrap_content"
        android:layout_height="wrap_content"
        android:text="@string/autocomplete_1_instructions" />

    <LinearLayout
        android:orientation="horizontal"
        android:layout_width="match_parent"
        android:layout_height="wrap_content">

        <TextView
            android:layout_width="wrap_content"
            android:layout_height="wrap_content"
            android:text="@string/autocomplete_1_country" />

        <AutoCompleteTextView android:id="@+id/edit"
            android:layout_width="match_parent"
            android:layout_height="wrap_content"/>

    </LinearLayout>

    <Button
        android:layout_width="wrap_content"
        android:layout_height="wrap_content"
        android:text="@string/autocomplete_1_focus" />

</LinearLayout>
```

### Step 4: Write Code

Start by creating a file named `AutoComplete1.kt` and add the following imports:

```kotlin
import android.os.Bundle
import android.widget.ArrayAdapter
import android.widget.AutoCompleteTextView
import android.widget.TextView
import androidx.appcompat.app.AppCompatActivity
```

Then extend the `AppCompatActivity`:

```kotlin
class AutoComplete1 : AppCompatActivity() {
```

Then override our `onCreate()` function. We set our content view to our layout file `R.layout.autocomplete_1`. We create `ArrayAdapter<String>` `val adapter` using our array `COUNTRIES` as the data and `android.R.layout.simple_dropdown_item_1` line as the resource ID for the layout file which contains a [TextView] to use when instantiating views. We set our AutoCompleteTextView `val textView` by finding the view with ID R.id.edit, and set its adapter to `adapter`.

```kotlin
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.autocomplete_1)
        val adapter = ArrayAdapter(
                this,
                android.R.layout.simple_dropdown_item_1line,
                COUNTRIES
        )
        val textView = findViewById<AutoCompleteTextView>(R.id.edit)
        textView.setAdapter(adapter)
    }
```

We define our data source inside a companion object:

```kotlin
    companion object {
        @JvmField
        val COUNTRIES = arrayOf(
                "Afghanistan", "Albania", "Algeria", "American Samoa", "Andorra",
                "Angola", "Anguilla", "Antarctica", "Antigua and Barbuda", "Argentina",
                "Armenia", "Aruba", "Australia", "Austria", "Azerbaijan",
                "Bahrain", "Bangladesh", "Barbados", "Belarus", "Belgium",
                "Belize", "Benin", "Bermuda", "Bhutan", "Bolivia",
                "Bolivia Marching Powder Confederated Anarchic Socialist Communes and Rest Homes",
                "Bosnia and Herzegovina", "Botswana", "Bouvet Island", "Brazil", "British Indian Ocean Territory",
                "British Virgin Islands", "Brunei", "Bulgaria", "Burkina Faso", "Burundi",
                "Cote d'Ivoire", "Cambodia", "Cameroon", "Canada", "Cape Verde",
                "Cayman Islands", "Central African Republic", "Chad", "Chile", "China",
                "Christmas Island", "Cocos (Keeling) Islands", "Colombia", "Comoros", "Congo",
                "Cook Islands", "Costa Rica", "Croatia", "Cuba", "Cyprus", "Czech Republic",
                "Democratic Republic of the Congo", "Denmark", "Djibouti", "Dominica", "Dominican Republic",
                "East Timor", "Ecuador", "Egypt", "El Salvador", "Equatorial Guinea", "Eritrea",
                "Estonia", "Ethiopia", "Faeroe Islands", "Falkland Islands", "Fiji", "Finland",
                "Former Yugoslav Republic of Macedonia", "France", "French Guiana", "French Polynesia",
                "French Southern Territories", "Gabon", "Georgia", "Germany", "Ghana", "Gibraltar",
                "Greece", "Greenland", "Grenada", "Guadeloupe", "Guam", "Guatemala", "Guinea", "Guinea-Bissau",
                "Guyana", "Haiti", "Heard Island and McDonald Islands", "Honduras", "Hong Kong", "Hungary",
                "Iceland", "India", "Indonesia", "Iran", "Iraq", "Ireland", "Israel", "Italy", "Jamaica",
                "Japan", "Jordan", "Kazakhstan", "Kenya", "Kiribati", "Kuwait", "Kyrgyzstan", "Laos",
                "Latvia", "Lebanon", "Lesotho", "Liberia", "Libya", "Liechtenstein", "Lithuania", "Luxembourg",
                "Macau", "Madagascar", "Malawi", "Malaysia", "Maldives", "Mali", "Malta", "Marshall Islands",
                "Martinique", "Mauritania", "Mauritius", "Mayotte", "Mexico", "Micronesia", "Moldova",
                "Monaco", "Mongolia", "Montserrat", "Morocco", "Mozambique", "Myanmar", "Namibia",
                "Nauru", "Nepal", "Netherlands", "Netherlands Antilles", "New Caledonia", "New Zealand",
                "Nicaragua", "Niger", "Nigeria", "Niue", "Norfolk Island", "North Korea", "Northern Marianas",
                "Norway", "Oman", "Pakistan", "Palau", "Panama", "Papua New Guinea", "Paraguay", "Peru",
                "Philippines", "Pitcairn Islands", "Poland", "Portugal", "Puerto Rico", "Qatar",
                "Reunion", "Romania", "Russia", "Rwanda", "Sqo Tome and Principe", "Saint Helena",
                "Saint Kitts and Nevis", "Saint Lucia", "Saint Pierre and Miquelon",
                "Saint Vincent and the Grenadines", "Samoa", "San Marino", "Saudi Arabia", "Senegal",
                "Seychelles", "Sierra Leone", "Singapore", "Slovakia", "Slovenia", "Solomon Islands",
                "Somalia", "South Africa", "South Georgia and the South Sandwich Islands", "South Korea",
                "Spain", "Sri Lanka", "Sudan", "Suriname", "Svalbard and Jan Mayen", "Swaziland", "Sweden",
                "Switzerland", "Syria", "Taiwan", "Tajikistan", "Tanzania", "Thailand", "The Bahamas",
                "The Gambia", "Togo", "Tokelau", "Tonga", "Trinidad and Tobago", "Tunisia", "Turkey",
                "Turkmenistan", "Turks and Caicos Islands", "Tuvalu", "Virgin Islands", "Uganda",
                "Ukraine", "United Arab Emirates", "United Kingdom",
                "United States", "United States Minor Outlying Islands", "Uruguay", "Uzbekistan",
                "Vanuatu", "Vatican City", "Venezuela", "Vietnam", "Wallis and Futuna", "Western Sahara",
                "Yemen", "Yugoslavia", "Zambia", "Zimbabwe"
        )
    }
```

Here is the full code:

**AutoComplete1.kt**

```kotlin
import android.os.Bundle
import android.widget.ArrayAdapter
import android.widget.AutoCompleteTextView
import android.widget.TextView
import androidx.appcompat.app.AppCompatActivity
import com.example.android.apis.R

class AutoComplete1 : AppCompatActivity() {

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.autocomplete_1)
        val adapter = ArrayAdapter(
                this,
                android.R.layout.simple_dropdown_item_1line,
                COUNTRIES
        )
        val textView = findViewById<AutoCompleteTextView>(R.id.edit)
        textView.setAdapter(adapter)
    }

    companion object {
        @JvmField
        val COUNTRIES = arrayOf(
                "Afghanistan", "Albania", "Algeria", "American Samoa", "Andorra",
                "Angola", "Anguilla", "Antarctica", "Antigua and Barbuda", "Argentina",
                "Armenia", "Aruba", "Australia", "Austria", "Azerbaijan",
                "Bahrain", "Bangladesh", "Barbados", "Belarus", "Belgium",
                "Belize", "Benin", "Bermuda", "Bhutan", "Bolivia",
                "Bolivia Marching Powder Confederated Anarchic Socialist Communes and Rest Homes",
                "Bosnia and Herzegovina", "Botswana", "Bouvet Island", "Brazil", "British Indian Ocean Territory",
                "British Virgin Islands", "Brunei", "Bulgaria", "Burkina Faso", "Burundi",
                "Cote d'Ivoire", "Cambodia", "Cameroon", "Canada", "Cape Verde",
                "Cayman Islands", "Central African Republic", "Chad", "Chile", "China",
                "Christmas Island", "Cocos (Keeling) Islands", "Colombia", "Comoros", "Congo",
                "Cook Islands", "Costa Rica", "Croatia", "Cuba", "Cyprus", "Czech Republic",
                "Democratic Republic of the Congo", "Denmark", "Djibouti", "Dominica", "Dominican Republic",
                "East Timor", "Ecuador", "Egypt", "El Salvador", "Equatorial Guinea", "Eritrea",
                "Estonia", "Ethiopia", "Faeroe Islands", "Falkland Islands", "Fiji", "Finland",
                "Former Yugoslav Republic of Macedonia", "France", "French Guiana", "French Polynesia",
                "French Southern Territories", "Gabon", "Georgia", "Germany", "Ghana", "Gibraltar",
                "Greece", "Greenland", "Grenada", "Guadeloupe", "Guam", "Guatemala", "Guinea", "Guinea-Bissau",
                "Guyana", "Haiti", "Heard Island and McDonald Islands", "Honduras", "Hong Kong", "Hungary",
                "Iceland", "India", "Indonesia", "Iran", "Iraq", "Ireland", "Israel", "Italy", "Jamaica",
                "Japan", "Jordan", "Kazakhstan", "Kenya", "Kiribati", "Kuwait", "Kyrgyzstan", "Laos",
                "Latvia", "Lebanon", "Lesotho", "Liberia", "Libya", "Liechtenstein", "Lithuania", "Luxembourg",
                "Macau", "Madagascar", "Malawi", "Malaysia", "Maldives", "Mali", "Malta", "Marshall Islands",
                "Martinique", "Mauritania", "Mauritius", "Mayotte", "Mexico", "Micronesia", "Moldova",
                "Monaco", "Mongolia", "Montserrat", "Morocco", "Mozambique", "Myanmar", "Namibia",
                "Nauru", "Nepal", "Netherlands", "Netherlands Antilles", "New Caledonia", "New Zealand",
                "Nicaragua", "Niger", "Nigeria", "Niue", "Norfolk Island", "North Korea", "Northern Marianas",
                "Norway", "Oman", "Pakistan", "Palau", "Panama", "Papua New Guinea", "Paraguay", "Peru",
                "Philippines", "Pitcairn Islands", "Poland", "Portugal", "Puerto Rico", "Qatar",
                "Reunion", "Romania", "Russia", "Rwanda", "Sqo Tome and Principe", "Saint Helena",
                "Saint Kitts and Nevis", "Saint Lucia", "Saint Pierre and Miquelon",
                "Saint Vincent and the Grenadines", "Samoa", "San Marino", "Saudi Arabia", "Senegal",
                "Seychelles", "Sierra Leone", "Singapore", "Slovakia", "Slovenia", "Solomon Islands",
                "Somalia", "South Africa", "South Georgia and the South Sandwich Islands", "South Korea",
                "Spain", "Sri Lanka", "Sudan", "Suriname", "Svalbard and Jan Mayen", "Swaziland", "Sweden",
                "Switzerland", "Syria", "Taiwan", "Tajikistan", "Tanzania", "Thailand", "The Bahamas",
                "The Gambia", "Togo", "Tokelau", "Tonga", "Trinidad and Tobago", "Tunisia", "Turkey",
                "Turkmenistan", "Turks and Caicos Islands", "Tuvalu", "Virgin Islands", "Uganda",
                "Ukraine", "United Arab Emirates", "United Kingdom",
                "United States", "United States Minor Outlying Islands", "Uruguay", "Uzbekistan",
                "Vanuatu", "Vatican City", "Venezuela", "Vietnam", "Wallis and Futuna", "Western Sahara",
                "Yemen", "Yugoslavia", "Zambia", "Zimbabwe"
        )
    }
}
```

### Run

Copy the code above, build and run.

## Example 2: Kotlin Android AutoCompleteTextView with Popup List

This second example shows how to use an AutoCompleteTextView to provide suggestions as a user types. The AutoCompleteTextView is located at the bottom of the screen, so the suggestions appear in a pop-up list.

### Step 1: Create Project

Start by creating an empty `Android Studio` project.

### Step 2: Dependencies

No special dependencies are needed.

### Step 3: Design Layout

Design your layout:

**autocomplete_2.xml**

```xml
<?xml version="1.0" encoding="utf-8"?>

<LinearLayout xmlns:android="http://schemas.android.com/apk/res/android"
    xmlns:tools="http://schemas.android.com/tools"
    android:layout_width="match_parent"
    android:layout_height="match_parent"
    android:gravity="bottom"
    android:orientation="vertical">

    <Button
        android:layout_width="wrap_content"
        android:layout_height="wrap_content"
        android:text="@string/autocomplete_2_focus" />

    <LinearLayout
        android:layout_width="match_parent"
        android:layout_height="wrap_content"
        android:orientation="horizontal">

        <TextView
            android:layout_width="wrap_content"
            android:layout_height="wrap_content"
            android:text="@string/autocomplete_2_country" />

        <AutoCompleteTextView
            android:id="@+id/edit"
            android:layout_width="match_parent"
            android:layout_height="wrap_content"
            tools:ignore="LabelFor" />

    </LinearLayout>

</LinearLayout>
```

### Step 4: Write Code

```kotlin
import android.os.Bundle
import android.widget.ArrayAdapter
import android.widget.AutoCompleteTextView
import androidx.appcompat.app.AppCompatActivity
import com.example.android.apis.R

class AutoComplete2 : AppCompatActivity() {
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.autocomplete_2)
        val adapter = ArrayAdapter(
                this,
                android.R.layout.simple_dropdown_item_1line,
                AutoComplete1.COUNTRIES
        )
        val textView = findViewById<AutoCompleteTextView>(R.id.edit)
        textView.setAdapter(adapter)
    }
}
```

### Run

Copy the code above into your project, build and run.

## Example 3: Android AutomCompleteTextView: Filter SQLite Data

Let's look at our third AutoCompleteTextView Example but this time with SQLite database data. The user will be searching or filtering data stored in SQLite database using the AutoCompleteTextView widget. As you type we autocomplete the related items in a dropdown via the AutoCompleteTextView component.

Check the below screenshot of the project:

![](https://camposha.info/android-examples/wp-content/uploads/sites/9/2021/10/Android-AutoCompletetextView-SQLite-database.png)

Let's start.

### Step 1: Create Project

Start by creating an empty `Android Studio` project.

### Step 2: Dependencies

No special or third party dependencies are needed.

### Step 3: Design Layouts

We will need the folowing layout:

**(a). main.xml**

Add a TextView and an AutoCompleteTextVie:

```xml
<?xml version="1.0" encoding="utf-8"?>

 <LinearLayout xmlns:android="http://schemas.android.com/apk/res/android"
    android:layout_width="fill_parent"
    android:layout_height="wrap_content"
    android:padding="5dp" android:orientation="vertical">

    <TextView
        android:layout_width="wrap_content"
        android:layout_height="wrap_content"
        android:text="@string/ITEM_SEARCH" />

    <AutoCompleteTextView android:id="@+id/autocompleteitem"
        android:layout_width="fill_parent"
        android:layout_height="wrap_content"
        android:layout_marginLeft="5dp"/>
</LinearLayout>
```

### Step 4: Insert, Select, Search SQLite Database

We need to write code responsible for opening our database, creating a database table, inserting data as well as searching the database content:

Here is the full code:

**SQLiteItemSearch.java**

```java
import android.content.ContentValues;
import android.content.Context;
import android.database.Cursor;
import android.database.SQLException;
import android.database.sqlite.SQLiteDatabase;
import android.database.sqlite.SQLiteOpenHelper;
import android.util.Log;

public class SQLiteItemSearch extends SQLiteOpenHelper {
    private static final String DB_NAME = "Products.db";
    private static final int DB_VERSION_NUMBER = 1;
    private static final String DB_TABLE_NAME = "itemsearch";
    private static final String DB_COLUMN_1_NAME = "item_name";

    private static final String DB_CREATE_SCRIPT = "create table "
            + DB_TABLE_NAME
            + " (_id integer primary key autoincrement, item_name text not null);)";

    private SQLiteDatabase sqliteDBInstance = null;

    public SQLiteItemSearch(Context context) {
        super(context, DB_NAME, null, DB_VERSION_NUMBER);
    }

    @Override
    public void onUpgrade(SQLiteDatabase db, int oldVersion, int newVersion) {
        // TODO: Implement onUpgrade
    }

    @Override
    public void onCreate(SQLiteDatabase sqliteDBInstance) {
        Log.i("onCreate", "Creating the database...");
        sqliteDBInstance.execSQL(DB_CREATE_SCRIPT);

        this.sqliteDBInstance=sqliteDBInstance;
        insertitemSearch("Color Monitor");
        insertitemSearch("Compact Disk");
        insertitemSearch("Computer");
        insertitemSearch("Hard Disk");
        insertitemSearch("HP Printer");
        insertitemSearch("HP Laser Printer");
        insertitemSearch("HP Injet Printer");
    }

    public void openDB() throws SQLException {
        Log.i("openDB", "Checking sqliteDBInstance...");
        if (this.sqliteDBInstance == null) {
            Log.i("openDB", "Creating sqliteDBInstance...");
            this.sqliteDBInstance = this.getWritableDatabase();
        }
    }

    public void closeDB() {
        if (this.sqliteDBInstance != null) {
            if (this.sqliteDBInstance.isOpen())
                this.sqliteDBInstance.close();
        }
    }

    public long insertitemSearch(String ItemBrandName) {
        ContentValues contentValues = new ContentValues();
        contentValues.put(DB_COLUMN_1_NAME, ItemBrandName);
        Log.i(this.toString() + " - insertitmSearch", "Inserting: "
                + ItemBrandName);
        return this.sqliteDBInstance.insert(DB_TABLE_NAME, null, contentValues);
    }

    public boolean removeitemSearch(String ItemBrandName) {
        int result = this.sqliteDBInstance.delete(DB_TABLE_NAME, "item_name='"
                + ItemBrandName + "'", null);

        if (result > 0)
            return true;
        else
            return false;
    }

    public long updateitmSearch(String oldItemBrandName, String newItemBrandName) {
        ContentValues contentValues = new ContentValues();
        contentValues.put(DB_COLUMN_1_NAME, newItemBrandName);
        return this.sqliteDBInstance.update(DB_TABLE_NAME, contentValues,
                "item_name='" + oldItemBrandName + "'", null);
    }

    public String[] getAllItemFilter() {
        Cursor cursor = this.sqliteDBInstance
                .query(DB_TABLE_NAME, new String[] { DB_COLUMN_1_NAME }, null,
                        null, null, null, null);

        if (cursor.getCount() > 0) {
            String[] str = new String[cursor.getCount()];
            int i = 0;

            while (cursor.moveToNext()) {
                str[i] = cursor.getString(cursor
                        .getColumnIndex(DB_COLUMN_1_NAME));
                i++;
            }
            return str;
        } else {
            return new String[] {};
        }
    }
}
```

### Step 5: Create Main Activity

Here is the full code:

**Home.java**

```java
import android.app.Activity;
import android.os.Bundle;
import android.util.Log;
import android.view.View;
import android.widget.AdapterView;
import android.widget.AdapterView.OnItemClickListener;
import android.widget.ArrayAdapter;
import android.widget.AutoCompleteTextView;

public class Home extends Activity {
    private SQLiteItemSearch sqllitebb;

    @Override
    public void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.main);

        final AutoCompleteTextView actv = (AutoCompleteTextView) findViewById(R.id.autocompleteitem);
        sqllitebb = new SQLiteItemSearch(Home.this);
        sqllitebb.openDB();
        // Insert a few Products that begin with "C" and "H"

        final String[] deal = sqllitebb.getAllItemFilter();

        // Print out the values to the log
        for (int i = 0; i < deal.length; i++) {
            Log.i(this.toString(), deal[i]);
        }

        ArrayAdapter<String> adapter = new ArrayAdapter<String>(this,
                android.R.layout.simple_dropdown_item_1line, deal);
        actv.setAdapter(adapter);
        actv.setThreshold(1);
        actv.setOnItemClickListener(new OnItemClickListener() {

            public void onItemClick(AdapterView<?> arg0, View arg1, int arg2,
                    long arg3) {
                arg0.getItemAtPosition(arg2);
                Log.i("SELECTED TEXT WAS--->", deal[arg2]);
            }
        });
    }

    public void onDestroy() {
        super.onDestroy();
        sqllitebb.close();
    }
}
```

### Run

Copy the code or download it in the link below, build and run.

### Reference

Here are the reference links:

| Number | Link |
| --- | --- |
| 1. | [Download](https://github.com/AnkitKumar111/Android_Assignment11.2/archive/refs/heads/master.zip) Example |
| 2. | [Follow](https://github.com/AnkitKumar111/) code author |
