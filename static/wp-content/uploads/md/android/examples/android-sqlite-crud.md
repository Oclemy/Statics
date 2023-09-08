# SQLite CRUD Examples



_Kotlin Android SQLite database simple CRUD example tutorial_

This is an SQLite tutorial for android using Kotlin programming language. We see how to perforom operations like inserting, updating, reading and deleting data.


## Example 1: Kotlin Android Beginners SQLite CRUD

This tutorial is really suitable for newbies who just want to learn how to perform operations against SQLite database. We are seeing how to add data to sqlite from edittexts on button click.

The user also utilizes the same edittexts for updating data. However for this to happen you have to supply the ud. The id isn't necessary while inserting data. This is because it gets auto generated and autoincremented by SQLite datbase itself.

To delete you also have to supply the id. This identifies the row to be deleted.

##### Demo

Here's the gif demo of the project:

![KotlinAndroid SQLite CRUD Example](https://camposha.info/kotlin-android-sqlite-simple-crud-insert-select-update-delete/demo1.gif)

#### Layouts

We have only a single layout:

##### (a). activitt_main.xml

Our mainactivity's layout. It will contained several edittexts and buttons which will allow user to perform CRUD operations.

```xml
<?xml version="1.0" encoding="utf-8"?>
<LinearLayout

    android_orientation="vertical"
    android_layout_width="match_parent"
    android_layout_height="match_parent"
    tools_context=".MainActivity">

    <LinearLayout
        android_layout_width="match_parent"
        android_layout_height="wrap_content"
        android_orientation="horizontal">

        <TextView
            android_id="@+id/nameLabel"
            android_layout_width="0dp"
            android_layout_weight="1"
            android_layout_height="wrap_content"
            android_maxLines="1"
            android_padding="5dp"
            android_text="ID"
            android_textColor="@color/colorAccent"
            android_textAppearance="?android:attr/textAppearanceSmall"
            android_textStyle="bold" />

        <EditText
            android_id="@+id/idTxt"
            android_layout_width="0dp"
            android_layout_weight="2"
            android_layout_height="wrap_content"
            android_ems="10"
            android_inputType="number"
            android_hint="ID" />
    </LinearLayout>

    <LinearLayout
        android_layout_width="match_parent"
        android_layout_height="wrap_content"
        android_orientation="horizontal">

        <TextView
            android_layout_width="0dp"
            android_layout_weight="1"
            android_layout_height="wrap_content"
            android_maxLines="1"
            android_padding="5dp"
            android_text="NAME: "
            android_textColor="@color/colorAccent"
            android_textAppearance="?android:attr/textAppearanceSmall"
            android_textStyle="bold" />

        <EditText
            android_id="@+id/nameTxt"
            android_layout_width="0dp"
            android_layout_weight="2"
            android_layout_height="wrap_content"
            android_ems="10"
            android_inputType="textPersonName"
            android_hint="NAME" />
    </LinearLayout>

    <LinearLayout
        android_layout_width="match_parent"
        android_layout_height="wrap_content"
        android_orientation="horizontal">

        <TextView
            android_layout_width="0dp"
            android_layout_weight="1"
            android_layout_height="wrap_content"
            android_maxLines="1"
            android_padding="5dp"
            android_text="GALAXY: "
            android_textColor="@color/colorAccent"
            android_textAppearance="?android:attr/textAppearanceSmall"
            android_textStyle="bold" />

        <EditText
            android_id="@+id/galaxyTxt"
            android_layout_width="0dp"
            android_layout_weight="2"
            android_layout_height="wrap_content"
            android_ems="10"
            android_inputType="textPersonName"
            android_hint="GALAXY" />
    </LinearLayout>

    <LinearLayout
        android_layout_width="match_parent"
        android_layout_height="wrap_content"
        android_orientation="horizontal">

        <TextView
            android_layout_width="0dp"
            android_layout_weight="1"
            android_layout_height="wrap_content"
            android_maxLines="1"
            android_padding="5dp"
            android_text="TYPE: "
            android_textColor="@color/colorAccent"
            android_textAppearance="?android:attr/textAppearanceSmall"
            android_textStyle="bold" />

        <EditText
            android_id="@+id/typeTxt"
            android_layout_width="0dp"
            android_layout_weight="2"
            android_layout_height="wrap_content"
            android_ems="10"
            android_inputType="textCapWords"
            android_hint="STAR TYPE" />
    </LinearLayout>

    <LinearLayout
        android_layout_width="match_parent"
        android_layout_height="wrap_content"
        android_orientation="horizontal">

        <Button
            android_id="@+id/insertBtn"
            android_layout_width="0dp"
            android_layout_weight="1"
            android_layout_height="wrap_content"
            android_text="INSERT" />

        <Button
            android_id="@+id/updateBtn"
            android_layout_width="0dp"
            android_layout_weight="1"
            android_layout_height="wrap_content"
            android_text="UPDATE" />
    </LinearLayout>

    <LinearLayout
        android_layout_width="match_parent"
        android_layout_height="wrap_content"
        android_orientation="horizontal">

        <Button
            android_id="@+id/deleteBtn"
            android_layout_width="0dp"
            android_layout_weight="1"
            android_layout_height="wrap_content"
            android_text="DELETE" />

        <Button
            android_id="@+id/viewBtn"
            android_layout_width="0dp"
            android_layout_weight="1"
            android_layout_height="wrap_content"
            android_text="VIEW ALL" />
    </LinearLayout>

</LinearLayout>
```

#### Kotlin Code

We have two classes:

##### (a). DatabaseHelper.java

This class will allow us work with SQLite easily, allowing us to perform CRUD operations like adding, deleting, updating and deleting data.

```kotlin
package info.camposha.kotlinsqlite

import android.content.Context
import android.database.sqlite.SQLiteOpenHelper
import android.content.ContentValues
import android.database.Cursor
import android.database.sqlite.SQLiteDatabase

/**
 * Let's start by creating our database CRUD helper class
 * based on the SQLiteHelper.
 */
class DatabaseHelper(context: Context) :
        SQLiteOpenHelper(context, DATABASE_NAME, null, 1) {

    /**
     * Our onCreate() method.
     * Called when the database is created for the first time. This is
     * where the creation of tables and the initial population of the tables
     * should happen.
     */
    override fun onCreate(db: SQLiteDatabase) {
        db.execSQL("CREATE TABLE $TABLE_NAME (ID INTEGER PRIMARY KEY " +
                "AUTOINCREMENT,NAME TEXT,GALAXY TEXT,TYPE TEXT)")
    }

    /**
     * Let's create Our onUpgrade method
     * Called when the database needs to be upgraded. The implementation should
     * use this method to drop tables, add tables, or do anything else it needs
     * to upgrade to the new schema version.
     */
    override fun onUpgrade(db: SQLiteDatabase, oldVersion: Int, newVersion: Int) {
        db.execSQL("DROP TABLE IF EXISTS " + TABLE_NAME)
        onCreate(db)
    }

    /**
     * Let's create our insertData() method.
     * It Will insert data to SQLIte database.
     */
    fun insertData(name: String, surname: String, marks: String) {
        val db = this.writableDatabase
        val contentValues = ContentValues()
        contentValues.put(COL_2, name)
        contentValues.put(COL_3, surname)
        contentValues.put(COL_4, marks)
        db.insert(TABLE_NAME, null, contentValues)
    }

    /**
     * Let's create  a method to update a row with new field values.
     */
    fun updateData(id: String, name: String, surname: String, marks: String):
            Boolean {
        val db = this.writableDatabase
        val contentValues = ContentValues()
        contentValues.put(COL_1, id)
        contentValues.put(COL_2, name)
        contentValues.put(COL_3, surname)
        contentValues.put(COL_4, marks)
        db.update(TABLE_NAME, contentValues, "ID = ?", arrayOf(id))
        return true
    }

    /**
     * Let's create a function to delete a given row based on the id.
     */
    fun deleteData(id : String) : Int {
        val db = this.writableDatabase
        return db.delete(TABLE_NAME,"ID = ?", arrayOf(id))
    }

    /**
     * The below getter property will return a Cursor containing our dataset.
     */
    val allData : Cursor
        get() {
            val db = this.writableDatabase
            val res = db.rawQuery("SELECT * FROM " + TABLE_NAME, null)
            return res
        }

    /**
     * Let's create a companion object to hold our static fields.
     * A Companion object is an object that is common to all instances of a given
     * class.
     */
    companion object {
        val DATABASE_NAME = "stars.db"
        val TABLE_NAME = "star_table"
        val COL_1 = "ID"
        val COL_2 = "NAME"
        val COL_3 = "GALAXY"
        val COL_4 = "TYPE"
    }
}
//end
```

##### (b). MainActivity.java

The main activity is the entry point to our Kotlin app. We have cleanly commented the code for inline explanations.

```kotlin
package info.camposha.kotlinsqlite

import android.app.AlertDialog
import android.os.Bundle
import android.support.v7.app.AppCompatActivity
import android.view.View
import android.widget.Toast
import kotlinx.android.synthetic.main.activity_main.*

class MainActivity : AppCompatActivity() {

    //In Kotlin `var` is used to declare a mutable variable. On the other hand
    //`internal` means a variable is visible within a given module.
    internal var dbHelper = DatabaseHelper(this)

    /**
     * Let's create a function to show Toast message
     */
    fun showToast(text: String){
        Toast.makeText(this@MainActivity, text, Toast.LENGTH_LONG).show()
    }

    /**
     * Let's create a function to show an alert dialog with data dialog.
     */
    fun showDialog(title : String,Message : String){
        val builder = AlertDialog.Builder(this)
        builder.setCancelable(true)
        builder.setTitle(title)
        builder.setMessage(Message)
        builder.show()
    }

    /**
     * Let's create a method to clear our edittexts
     */
    fun clearEditTexts(){
        nameTxt.setText("")
        galaxyTxt.setText("")
        typeTxt.setText("")
        idTxt.setText("")
    }

    /**
     * Let's override our onCreate method.
     */
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_main)

        handleInserts()
        handleUpdates()
        handleDeletes()
        handleViewing()
    }

    /**
     * When our handleInserts button is clicked.
     */
    fun handleInserts() {
        insertBtn.setOnClickListener {
            try {
                dbHelper.insertData(nameTxt.text.toString(),galaxyTxt.text.toString(),
                        typeTxt.text.toString())
                clearEditTexts()
            }catch (e: Exception){
                e.printStackTrace()
                showToast(e.message.toString())
            }
        }
    }

    /**
     * When our handleUpdates data button is clicked
     */
    fun handleUpdates() {
        updateBtn.setOnClickListener {
            try {
                val isUpdate = dbHelper.updateData(idTxt.text.toString(),
                        nameTxt.text.toString(),
                        galaxyTxt.text.toString(), typeTxt.text.toString())
                if (isUpdate == true)
                    showToast("Data Updated Successfully")
                else
                    showToast("Data Not Updated")
            }catch (e: Exception){
                e.printStackTrace()
                showToast(e.message.toString())
            }
        }
    }

    /**
     * When our handleDeletes button is clicked
     */
    fun handleDeletes(){
        deleteBtn.setOnClickListener {
            try {
                dbHelper.deleteData(idTxt.text.toString())
                clearEditTexts()
            }catch (e: Exception){
                e.printStackTrace()
                showToast(e.message.toString())
            }
        }
    }

    /**
     * When our View All is clicked
     */
    fun handleViewing() {
        viewBtn.setOnClickListener(
                View.OnClickListener {
                    val res = dbHelper.allData
                    if (res.count == 0) {
                        showDialog("Error", "No Data Found")
                        return@OnClickListener
                    }

                    val buffer = StringBuffer()
                    while (res.moveToNext()) {
                        buffer.append("ID :" + res.getString(0) + "n")
                        buffer.append("NAME :" + res.getString(1) + "n")
                        buffer.append("GALAXY :" + res.getString(2) + "n")
                        buffer.append("TYPE :" + res.getString(3) + "nn")
                    }
                    showDialog("Data Listing", buffer.toString())
                }
        )
    }
}
//end
```

##### Download

You can download the full source code below or watch the video from the link provided.

| No. | Location | Link |
| --- | --- | --- |
| 1. | GitHub | [Direct Download](https://github.com/Oclemy/Kotlin-SQLite/archive/master.zip) |
| 2. | GitHub | [Browse](https://github.com/Oclemy/Kotlin-SQLite) |
| 3. | YouTube | [Video Tutorial](https://www.youtube.com/watch?v=uLG-FLodBks) |
| 4. | YouTube | [ProgrammingWizards TV Channel](http://www.youtube.com/c/programmingwizards) |

## Example 2: Kotlin Notepad App - SQLite CRUD, Search, Sort

> Learn how to create a full Notepad app by implementing CRUD operations in SQLite database.

### Step 1: Create Project

Start by creating an empty `Android Studio` project.

### Step 2: Dependencies

No external library is needed for this project.

### Step 3: Create Menu

We will be performing some of the actions from the menu. This let's create menu inside our `res/menu` folder. If you do not have the `menu` folder then create it inside the `res` directory:

**menu/main_menu.xml**

```xml
<?xml version="1.0" encoding="utf-8"?>
<menu xmlns:android="http://schemas.android.com/apk/res/android"
    xmlns:app="http://schemas.android.com/apk/res-auto">

    <item
        android:id="@+id/action_sort"
        android:title="Sort"/>

    <item
        android:id="@+id/app_bar_search"
        android:icon="@drawable/ic_search_black_24dp"
        app:showAsAction="always"
        android:title="Search"
        app:actionViewClass="android.widget.SearchView" />

    <item
        android:id="@+id/addNote"
        android:title="Add Note"
        android:icon="@drawable/ic_note_add_black_24dp"
        app:showAsAction="always"/>

</menu>
```

### Step 4: Design Layouts

We will have the following layouts

**(a). row.xml**

A row for our listview:

```xml
<?xml version="1.0" encoding="utf-8"?>
<androidx.cardview.widget.CardView xmlns:android="http://schemas.android.com/apk/res/android"
    xmlns:app="http://schemas.android.com/apk/res-auto"
    android:layout_width="match_parent"
    android:layout_height="wrap_content"
    app:cardBackgroundColor="@color/white"
    app:cardCornerRadius="3dp"
    app:cardElevation="3dp"
    app:cardUseCompatPadding="true">

    <LinearLayout
        android:layout_width="match_parent"
        android:layout_height="wrap_content"
        android:layout_margin="5dp"
        android:gravity="end|bottom"
        android:orientation="vertical">

        <TextView
            android:id="@+id/titleTv"
            android:layout_width="match_parent"
            android:layout_height="wrap_content"
            android:text="Title"
            android:textColor="@color/colorPrimary"
            android:textSize="18sp"
            android:textStyle="bold" />

        <TextView
            android:id="@+id/descTv"
            android:layout_width="match_parent"
            android:layout_height="wrap_content"
            android:text="There may be a very long description of the note" />

        <View
            android:layout_width="match_parent"
            android:layout_height="1dp"
            android:layout_marginTop="2dp"
            android:layout_marginBottom="3dp"
            android:background="@color/colorPrimaryDark" />

        <LinearLayout
            android:layout_width="match_parent"
            android:layout_height="wrap_content"
            android:gravity="end"
            android:orientation="horizontal">

            <ImageButton
                android:id="@+id/deleteBtn"
                android:layout_width="25dp"
                android:layout_height="25dp"
                android:layout_marginEnd="5dp"
                android:layout_marginRight="5dp"
                android:background="@null"
                android:scaleType="fitXY"
                android:src="@drawable/ic_delete_black_24dp" />

            <ImageButton
                android:id="@+id/editBtn"
                android:layout_width="25dp"
                android:layout_height="25dp"
                android:layout_marginEnd="5dp"
                android:layout_marginRight="5dp"
                android:background="@null"
                android:scaleType="fitXY"
                android:src="@drawable/ic_edit_black_24dp" />

            <ImageButton
                android:id="@+id/copyBtn"
                android:layout_width="25dp"
                android:layout_height="25dp"
                android:layout_marginEnd="5dp"
                android:layout_marginRight="5dp"
                android:background="@null"
                android:scaleType="fitXY"
                android:src="@drawable/ic_content_copy_black_24dp" />

            <ImageButton
                android:id="@+id/shareBtn"
                android:layout_width="25dp"
                android:layout_height="25dp"
                android:layout_marginEnd="5dp"
                android:layout_marginRight="5dp"
                android:background="@null"
                android:scaleType="fitXY"
                android:src="@drawable/ic_share_black_24dp" />

        </LinearLayout>

    </LinearLayout>

</androidx.cardview.widget.CardView>
```

**(b). activity_add_note.xml**

The xml layout for the activity for adding our notes:

```xml
<?xml version="1.0" encoding="utf-8"?>
<ScrollView xmlns:android="http://schemas.android.com/apk/res/android"
    xmlns:app="http://schemas.android.com/apk/res-auto"
    xmlns:tools="http://schemas.android.com/tools"
    android:layout_width="match_parent"
    android:layout_height="match_parent"
    tools:context=".AddNoteActivity">

    <LinearLayout
        android:layout_width="match_parent"
        android:layout_height="wrap_content"
        android:orientation="vertical">

        <androidx.cardview.widget.CardView
            android:layout_width="match_parent"
            android:layout_height="wrap_content"
            app:cardCornerRadius="3dp"
            app:cardElevation="3dp"
            android:layout_margin="5dp"
            app:cardBackgroundColor="@color/white">

            <LinearLayout
                android:layout_width="match_parent"
                android:layout_height="wrap_content"
                android:orientation="vertical">

                <EditText
                    android:id="@+id/titleEt"
                    android:background="@null"
                    android:hint="Enter Title"
                    android:singleLine="true"
                    android:padding="10dp"
                    android:inputType="textCapSentences"
                    android:textStyle="bold"
                    android:layout_width="match_parent"
                    android:layout_height="wrap_content"/>

                <EditText
                    android:id="@+id/descEt"
                    android:background="@null"
                    android:gravity="top"
                    android:hint="Enter Description..."
                    android:minHeight="100dp"
                    android:padding="10dp"
                    android:inputType="textCapSentences|textImeMultiLine"
                    android:layout_width="match_parent"
                    android:layout_height="wrap_content"/>

            </LinearLayout>

        </androidx.cardview.widget.CardView>

        <Button
            android:id="@+id/addBtn"
            style="@style/Base.Widget.AppCompat.Button.Colored"
            android:text="Add"
            android:layout_gravity="end"
            android:layout_marginEnd="5dp"
            android:layout_marginRight="5dp"
            android:layout_width="wrap_content"
            android:layout_height="wrap_content"
            android:onClick="addFunc"/>

    </LinearLayout>

</ScrollView>
```

**(c). activity_main.xml**

The layout for listing our notes. We include a listview:

```xml
<?xml version="1.0" encoding="utf-8"?>
<LinearLayout xmlns:android="http://schemas.android.com/apk/res/android"
    xmlns:app="http://schemas.android.com/apk/res-auto"
    xmlns:tools="http://schemas.android.com/tools"
    android:layout_width="match_parent"
    android:layout_height="match_parent"
    android:orientation="vertical"
    android:background="@color/gray"
    tools:context=".MainActivity">

    <ListView
        android:id="@+id/noteLv"
        android:layout_width="match_parent"
        android:layout_height="match_parent"
        android:divider="@null"
        android:dividerHeight="1dp"/>

</LinearLayout>
```

### Step 5: Create Model class

Create our `Note` model class as follows:

**Note.kt**

```kotlin
class Note(noteID: Int, noteName: String, noteDes: String)
{
    var noteID : Int? = noteID
    var noteName : String? = noteName
    var noteDes : String? = noteDes
}
```

### Step 6: Create Database Manager

Create a class to manage our database:

**DbManager.kt**

This is the class that will contain our CRUD operations.

```kotlin

import android.app.DownloadManager
import android.content.ContentValues
import android.content.Context
import android.database.Cursor
import android.database.sqlite.SQLiteDatabase
import android.database.sqlite.SQLiteOpenHelper
import android.database.sqlite.SQLiteQueryBuilder
import android.widget.Toast

class DbManager {

    //database name
    var dbName = "MyNotes"

    //table name
    var dbTable = "Notes"

    //columns
    var colID = "ID"
    var colTitle = "Title"
    var colDes = "Description"

    //database version
    var dbVersion = 1

    //CREATE TABLE IF NOT EXISTS MyNotes (ID INTEGER PRIMARY KEY, title TEXT, Description TEXT)
    val sqlCreateTable =
        "CREATE TABLE IF NOT EXISTS "+dbTable+" ("+colID+" INTEGER PRIMARY KEY,"+ colTitle +" TEXT, "+colDes+" TEXT)"

    var sqlDB: SQLiteDatabase? = null

    constructor(context: Context)
    {
        var db = DatabaseHelperNotes(context)
        sqlDB = db.writableDatabase
    }

    inner class DatabaseHelperNotes : SQLiteOpenHelper {
        var context: Context? = null

        constructor(context: Context) : super(context, dbName, null, dbVersion) {
            this.context = context
        }

        override fun onCreate(db: SQLiteDatabase?) {
            db!!.execSQL(sqlCreateTable)
            Toast.makeText(this.context, "database created...", Toast.LENGTH_SHORT).show()
        }

        override fun onUpgrade(db: SQLiteDatabase?, oldVersion: Int, newVersion: Int) {
            db!!.execSQL("Drop table if Exists" + dbTable)
        }

    }

    fun insert(values : ContentValues) : Long
    {
        val ID = sqlDB!!.insert(dbTable,"", values)
        return ID
    }

    fun Query(projection : Array<String>, selection : String, selectionArgs : Array<String>, sorOrder : String) : Cursor
    {
        val qb = SQLiteQueryBuilder()
        qb.tables = dbTable
        val cursor = qb.query(sqlDB, projection, selection, selectionArgs, null, null, sorOrder)
        return cursor
    }

    fun delete(selection: String, selectionArgs: Array<String>) : Int
    {
        val count = sqlDB!!.delete(dbTable, selection, selectionArgs)
        return count
    }

    fun update(values: ContentValues, selection: String, selectionArgs: Array<String>) : Int
    {
        val count = sqlDB!!.update(dbTable, values, selection, selectionArgs)
        return count
    }
}
```

### Step 7: Create Activities

Create the following two activities:

**(a). AddNoteActivity.kt**

> A class for adding notes

```kotlin
import android.content.ContentValues
import androidx.appcompat.app.AppCompatActivity
import android.os.Bundle
import android.view.View
import android.widget.Toast
import com.example.notepadusingkotlin.DataBase.DbManager
import kotlinx.android.synthetic.main.activity_add_note.*
import kotlinx.android.synthetic.main.row.*
import java.lang.Exception

class AddNoteActivity : AppCompatActivity() {

    val dbTable = "Notes"
    var id = 0

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_add_note)

        try {
            val bundle : Bundle? = intent.extras
            id = bundle!!.getInt("ID", 0)
            if (id!=0)
            {
                //update note
                //change actionbar title
                supportActionBar!!.title = "Update Note"
                //change button text
                addBtn.text = "Update"
                titleEt.setText(bundle.getString("name"))
                descEt.setText(bundle.getString("des"))
            }
        }catch (ex : Exception){

        }

    }

    fun addFunc(view: View)
    {
        var dbManager = DbManager(this)

        var values = ContentValues()
        values.put("Title", titleEt.text.toString())
        values.put("Description", descEt.text.toString())

        if (id == 0)
        {
            val ID = dbManager.insert(values)
            if (ID>0)
            {

                Toast.makeText(this, "Note is added", Toast.LENGTH_SHORT).show()
                finish()
            }
            else
            {
                Toast.makeText(this, "Error adding note...", Toast.LENGTH_SHORT).show()
            }
        }
        else
        {
            var selectionArgs = arrayOf(id.toString())
            val ID = dbManager.update(values, "ID=?", selectionArgs)
            if (ID>0)
            {
                Toast.makeText(this, "Note is updated", Toast.LENGTH_SHORT).show()
                finish()
            }
            else
            {
                Toast.makeText(this, "Error updating note...", Toast.LENGTH_SHORT).show()
            }
        }
    }
}
```

**(b). MainActivity.kt**

> The MainActivity class.

Will also render or list our notes:

```kotlin
import android.app.AlertDialog
import android.app.SearchManager
import android.content.Context
import android.content.DialogInterface
import android.content.Intent
import android.content.SharedPreferences
import androidx.appcompat.app.AppCompatActivity
import android.os.Bundle
import android.text.ClipboardManager
import android.view.*
import android.widget.BaseAdapter
import android.widget.SearchView
import android.widget.Toast
import com.example.notepadusingkotlin.DataBase.DbManager
import com.example.notepadusingkotlin.Model.Note
import kotlinx.android.synthetic.main.activity_main.*
import kotlinx.android.synthetic.main.row.view.*

class MainActivity : AppCompatActivity() {

    var listNotes = ArrayList<Note>()

    //shared preference
    var mSharedPref : SharedPreferences? = null

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_main)

        mSharedPref = this.getSharedPreferences("My_Data", Context.MODE_PRIVATE)

        //load sorting technique as selected before, default setting will be newest
        val mSorting = mSharedPref!!.getString("Sort", "newest")
        when(mSorting)
        {
            "newest" -> LoadQueryNewest("%")
            "oldest" -> LoadQueryOldest("%")
            "ascending" -> LoadQueryAscending("%")
            "descending" -> LoadQueryDescending("%")
        }

    }

    override fun onResume() {
        super.onResume()
        //load sorting technique as selected before, default setting will be newest
        val mSorting = mSharedPref!!.getString("Sort", "newest")
        when(mSorting)
        {
            "newest" -> LoadQueryNewest("%")
            "oldest" -> LoadQueryOldest("%")
            "ascending" -> LoadQueryAscending("%")
            "descending" -> LoadQueryDescending("%")
        }
    }

    private fun LoadQueryAscending(title: String) {
        var dbManager = DbManager(this)
        val projections = arrayOf("ID", "Title", "Description")
        val selectionArgs = arrayOf(title)
        //sort by title
        val cursor = dbManager.Query(projections, "Title like ?", selectionArgs, "Title")
        listNotes.clear()
        //ascending
        if (cursor.moveToFirst()) {
            do {
                val ID = cursor.getInt(cursor.getColumnIndex("ID"))
                val Title = cursor.getString(cursor.getColumnIndex("Title"))
                val Description = cursor.getString(cursor.getColumnIndex("Description"))

                listNotes.add(Note(ID, Title, Description))

            } while (cursor.moveToNext())
        }

        //adapter
        var myNotesAdapter = MyNotesAdapter(this, listNotes)
        //set adapter
        noteLv.adapter = myNotesAdapter

        //get total number of tasks from List
        val total = noteLv.count
        //actionbar
        val mActionBar = supportActionBar
        if (mActionBar != null)
        {
            //set to actionbar as subtitle of actionbar
            mActionBar.subtitle = "You have $total note(s) in list..."
        }
    }

    private fun LoadQueryDescending(title: String) {
        var dbManager = DbManager(this)
        val projections = arrayOf("ID", "Title", "Description")
        val selectionArgs = arrayOf(title)
        //sort by title
        val cursor = dbManager.Query(projections, "Title like ?", selectionArgs, "Title")
        listNotes.clear()
        //descending
        if (cursor.moveToLast()) {
            do {
                val ID = cursor.getInt(cursor.getColumnIndex("ID"))
                val Title = cursor.getString(cursor.getColumnIndex("Title"))
                val Description = cursor.getString(cursor.getColumnIndex("Description"))

                listNotes.add(Note(ID, Title, Description))

            } while (cursor.moveToPrevious())
        }

        //adapter
        var myNotesAdapter = MyNotesAdapter(this, listNotes)
        //set adapter
        noteLv.adapter = myNotesAdapter

        //get total number of tasks from List
        val total = noteLv.count
        //actionbar
        val mActionBar = supportActionBar
        if (mActionBar != null)
        {
            //set to actionbar as subtitle of actionbar
            mActionBar.subtitle = "You have $total note(s) in list..."
        }
    }

    private fun LoadQueryNewest(title: String) {
        var dbManager = DbManager(this)
        val projections = arrayOf("ID", "Title", "Description")
        val selectionArgs = arrayOf(title)
        //sort by ID
        val cursor = dbManager.Query(projections, "ID like ?", selectionArgs, "ID")
        listNotes.clear()

        //Newest first(the record will be entered at the bottom of previous records and has larger ID then previous records)

        if (cursor.moveToLast()) {
            do {
                val ID = cursor.getInt(cursor.getColumnIndex("ID"))
                val Title = cursor.getString(cursor.getColumnIndex("Title"))
                val Description = cursor.getString(cursor.getColumnIndex("Description"))

                listNotes.add(Note(ID, Title, Description))

            } while (cursor.moveToPrevious())
        }

        //adapter
        var myNotesAdapter = MyNotesAdapter(this, listNotes)
        //set adapter
        noteLv.adapter = myNotesAdapter

        //get total number of tasks from List
        val total = noteLv.count
        //actionbar
        val mActionBar = supportActionBar
        if (mActionBar != null)
        {
            //set to actionbar as subtitle of actionbar
            mActionBar.subtitle = "You have $total note(s) in list..."
        }
    }

    private fun LoadQueryOldest(title: String) {
        var dbManager = DbManager(this)
        val projections = arrayOf("ID", "Title", "Description")
        val selectionArgs = arrayOf(title)
        //sort by ID
        val cursor = dbManager.Query(projections, "ID like ?", selectionArgs, "ID")
        listNotes.clear()

        //oldest first(the record will be entered at the bottom of previous records and has larger ID then previous records, so lesser the ID is the oldest the record is)

        if (cursor.moveToFirst()) {
            do {
                val ID = cursor.getInt(cursor.getColumnIndex("ID"))
                val Title = cursor.getString(cursor.getColumnIndex("Title"))
                val Description = cursor.getString(cursor.getColumnIndex("Description"))

                listNotes.add(Note(ID, Title, Description))

            } while (cursor.moveToNext())
        }

        //adapter
        var myNotesAdapter = MyNotesAdapter(this, listNotes)
        //set adapter
        noteLv.adapter = myNotesAdapter

        //get total number of tasks from List
        val total = noteLv.count
        //actionbar
        val mActionBar = supportActionBar
        if (mActionBar != null)
        {
            //set to actionbar as subtitle of actionbar
            mActionBar.subtitle = "You have $total note(s) in list..."
        }
    }

    override fun onCreateOptionsMenu(menu: Menu?): Boolean {
        menuInflater.inflate(R.menu.main_menu, menu)

        val sv:SearchView = menu!!.findItem(R.id.app_bar_search).actionView as SearchView

        val sm = getSystemService(Context.SEARCH_SERVICE) as SearchManager
        sv.setSearchableInfo(sm.getSearchableInfo(componentName))
        sv.setOnQueryTextListener(object : SearchView.OnQueryTextListener{
            override fun onQueryTextSubmit(query: String?): Boolean {
                LoadQueryAscending("%"+query+"%")
                return false
            }

            override fun onQueryTextChange(newText: String?): Boolean {
                LoadQueryAscending("%"+newText+"%")
                return false
            }
        })
        return super.onCreateOptionsMenu(menu)
    }

    override fun onOptionsItemSelected(item: MenuItem): Boolean {
        if (item != null)
        {
            when(item.itemId)
            {
                R.id.addNote ->
                {
                    startActivity(Intent(this, AddNoteActivity::class.java))
                }
                R.id.action_sort ->
                {
                    //show sorting dialog
                    showSortDialog()
                }
            }
        }
        return super.onOptionsItemSelected(item)
    }

    private fun showSortDialog() {
        val sortOption = arrayOf("Newest", "Older", "Title(Ascending)", "Title(Descending)")
        val mBuilder = AlertDialog.Builder(this)
        mBuilder.setTitle("Sort by")
        mBuilder.setIcon(R.drawable.ic_sort_black_24dp)
        mBuilder.setSingleChoiceItems(sortOption, -1)
        {
            dialogInterface, i ->
            if (i==0)
            {
                //newest first
                Toast.makeText(this,"Newest",Toast.LENGTH_SHORT).show()
                val editor = mSharedPref!!.edit()
                editor.putString("Sort", "newest")
                editor.apply()
                LoadQueryNewest("%")

            }
            if (i==1)
            {
                //older first
                Toast.makeText(this,"Oldest",Toast.LENGTH_SHORT).show()
                val editor = mSharedPref!!.edit()
                editor.putString("Sort", "oldest")
                editor.apply()
                LoadQueryOldest("%")
            }
            if (i==2)
            {
                //title ascending
                Toast.makeText(this,"Title(Ascending)",Toast.LENGTH_SHORT).show()
                val editor = mSharedPref!!.edit()
                editor.putString("Sort", "ascending")
                editor.apply()
                LoadQueryAscending("%")
            }
            if (i==3)
            {
                //title descending
                Toast.makeText(this,"Title(Descending)",Toast.LENGTH_SHORT).show()
                val editor = mSharedPref!!.edit()
                editor.putString("Sort", "Descending")
                editor.apply()
                LoadQueryDescending("%")
            }
            dialogInterface.dismiss()
        }

        val mDialog = mBuilder.create()
        mDialog.show()
    }

    inner class MyNotesAdapter : BaseAdapter {
        var listNotesAdapter = ArrayList<Note>()
        var context: Context? = null

        constructor(context: Context, listNotesAdapter: ArrayList<Note>) : super() {
            this.listNotesAdapter = listNotesAdapter
            this.context = context
        }

        override fun getView(position: Int, convertView: View?, parent: ViewGroup?): View {
            //inflate layout row.xml
            var myView = layoutInflater.inflate(R.layout.row, null)
            val myNote = listNotesAdapter[position]
            myView.titleTv.text = myNote.noteName
            myView.descTv.text = myNote.noteDes
            //delete btn click
            myView.deleteBtn.setOnClickListener {
                var dbManager = DbManager(this.context!!)
                val selectionArgs = arrayOf(myNote.noteID.toString())
                dbManager.delete("ID=?", selectionArgs)
                LoadQueryAscending("%")
            }
            //edit//update button click
            myView.editBtn.setOnClickListener {
                GoToUpdateFun(myNote)
            }
            //copy btn click
            myView.copyBtn.setOnClickListener {
                //get title
                val title = myView.titleTv.text.toString()
                //get description
                val desc = myView.descTv.text.toString()
                //concatinate
                val s = title + "\n" + desc
                val cb = getSystemService(Context.CLIPBOARD_SERVICE) as ClipboardManager
                cb.text = s // add to clipboard
                Toast.makeText(this@MainActivity, "Copied...", Toast.LENGTH_SHORT).show()
            }
            //share btn click
            myView.shareBtn.setOnClickListener {

                //get title
                val title = myView.titleTv.text.toString()
                //get description
                val desc = myView.descTv.text.toString()
                //concatinate
                val s = title + "\n" + desc
                //share intent
                val shareIntent = Intent()
                shareIntent.action = Intent.ACTION_SEND
                shareIntent.type = "text/plain"
                shareIntent.putExtra(Intent.EXTRA_TEXT, s)
                startActivity(Intent.createChooser(shareIntent, s))

            }

            return myView
        }

        override fun getItem(position: Int): Any {
            return listNotesAdapter[position]
        }

        override fun getItemId(position: Int): Long {
            return position.toLong()
        }

        override fun getCount(): Int {
            return listNotesAdapter.size
        }

    }

    private fun GoToUpdateFun(myNote: Note) {
        val intent = Intent(this, AddNoteActivity::class.java)
        intent.putExtra("ID", myNote.noteID)
        intent.putExtra("name", myNote.noteName)
        intent.putExtra("des", myNote.noteDes)
        startActivity(intent)
    }
}
```

### Run

Copy the code or download it in the link below, build and run.

### Reference

Here are the reference links:

| Number | Link |
| --- | --- |
| 1. | [Download](https://github.com/Kiran-Bahalaskar/Note-Pad-Using-SQlite-Database-in-Kotlin/archive/refs/heads/master.zip) Example |
| 2. | [Follow](https://github.com/Kiran-Bahalaskar/) code author |
| 3. | Code: [Apache 2.0 License](http://www.apache.org/licenses/LICENSE-2.0.txt) |
