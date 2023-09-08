# Realm MVVVM Notes App

>  📘 A Mini Notes App Powered by Realm DB as Backend.

![Mini-Notes-App-Realm Example Tutorial](https://github.com/Spikeysanju/Mini-Notes-App-Realm/raw/master/Screenshots/minifig.png?raw=true)


📘 A Mini Notes App Powered by Realm DB as Backend

Let us look at the full Realm MVVVM Notes App Example.

#### Step 1. Dependencies

We need to add some dependencies in our `app/build.gradle` file as shown below:


**(a). `build.gradle`**

> Our app-level `build.gradle`.

We Prepare our dependencies as shown below. You may use later versions.

At the top of our `app/build.gradle` we will apply the following 5 plugins:

1. Our `com.android.application` plugin.
2. Our `kotlin-android` plugin.
3. Our `kotlin-android-extensions` plugin.
4. Our `kotlin-kapt` plugin.
5. Our `realm-android` plugin.

We then declare our app dependencies under the `dependencies` closure, using the `implementation` statement. We will need the following 7 dependencies:

1. Our `Kotlin-stdlib-jdk7` library.
2. `Appcompat` - Allows us access to new APIs on older API versions of the platform (many using Material Design).
3. `Core-ktx` - With this we can target the latest platform features and APIs while also supporting older devices.
4. `Constraintlayout` - This allows us to Position and size widgets in a flexible way with relative positioning.
5. `Cardview` - This allows us to Implement the Material Design card pattern with round corners and drop shadows.
6. `Recyclerview` - Provides us a [RecyclerView](https://android.camposha.info/en/recyclerview) onto which we can display large sets of data in your UI while minimizing memory usage.
7. `Material` - Collection of Modular and customizable Material Design UI components for Android.

Here is our full `app/build.gradle`:

```groovy
apply plugin: 'com.android.application'
apply plugin: 'kotlin-android'
apply plugin: 'kotlin-android-extensions'
apply plugin: 'kotlin-kapt'
apply plugin: 'realm-android'

android {
    compileSdkVersion 29
    buildToolsVersion "29.0.2"
    defaultConfig {
        applicationId "www.sanju.todonotes"
        minSdkVersion 21
        targetSdkVersion 29
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
}

dependencies {
    implementation fileTree(dir: 'libs', include: ['*.jar'])
    implementation "org.jetbrains.kotlin:kotlin-stdlib-jdk7:$kotlin_version"
    implementation 'androidx.appcompat:appcompat:1.1.0'
    implementation 'androidx.core:core-ktx:1.1.0'
    implementation 'androidx.constraintlayout:constraintlayout:1.1.3'
    testImplementation 'junit:junit:4.12'
    androidTestImplementation 'androidx.test.ext:junit:1.1.1'
    androidTestImplementation 'androidx.test.espresso:espresso-core:3.2.0'


    // library
    implementation 'androidx.cardview:cardview:1.0.0'
    implementation 'androidx.recyclerview:recyclerview:1.1.0'
    implementation 'com.google.android.material:material:1.0.0'
}

```

#### Step 2. Design Layouts

For this project let's create the following layouts:


**(a). `activity_add_notes.xml`**

> Our `activity_add_notes` layout.

This layout will represent our Notes Add Activity's layout. Specify [`LinearLayout`](https://android.examples.directory/linearlayout) as it's root element, then add the following [widgets](https://android.examples.directory/view):

1. [`EditText`](https://android.examples.directory/edittext)
2. [`Button`](https://android.examples.directory/button)

```xml
<?xml version="1.0" encoding="utf-8"?>
<LinearLayout xmlns:android="http://schemas.android.com/apk/res/android"
    xmlns:app="http://schemas.android.com/apk/res-auto"
    xmlns:tools="http://schemas.android.com/tools"
    android:layout_width="match_parent"
    android:orientation="vertical"
    android:layout_gravity="center"
    android:gravity="center"
    android:layout_height="match_parent"
    tools:context=".Activity.AddNotesActivity">


    <EditText
        android:id="@+id/titleET"
        android:layout_width="300dp"
        android:layout_height="50dp"
        android:layout_margin="10dp"
        android:hint="Title"
        android:text="Avengers"
        android:padding="10dp"
        />

    <EditText
        android:id="@+id/descET"
        android:layout_width="300dp"
        android:layout_height="50dp"
        android:layout_margin="10dp"
        android:text="One billion box of collection for avengers in 2019!"
        android:hint="Description"
        android:padding="10dp"
        />

    <Button
        android:id="@+id/saveBtn"
        android:layout_width="300dp"
        android:layout_height="wrap_content"
        android:backgroundTint="@color/colorPrimary"
        android:text="Save"
        android:textColor="@android:color/white"
        android:fontFamily="@font/futuraheavy"
        android:background="@drawable/button_shape"
        android:layout_margin="20dp"/>



</LinearLayout>
```

**(b). `todo_staggered_rv.xml`**

> Our `todo_staggered_rv` layout.

This layout will represent our Rv Staggered Todo's layout. Specify [`androidx.cardview.widget.CardView`](https://android.examples.directory/cardview) as it's root element then inside it place the following [widgets](https://android.examples.directory/view):

1. [`ConstraintLayout`](https://android.examples.directory/constraintlayout)
2. [`TextView`](https://android.examples.directory/textview)

```xml
<?xml version="1.0" encoding="utf-8"?>
<androidx.cardview.widget.CardView xmlns:android="http://schemas.android.com/apk/res/android"
    xmlns:tools="http://schemas.android.com/tools"
    xmlns:app="http://schemas.android.com/apk/res-auto"
    android:orientation="vertical"
    app:cardCornerRadius="12dp"
    app:cardElevation="2dp"
    android:layout_margin="5dp"
    android:layout_width="185dp"
    android:layout_height="wrap_content">

    <androidx.constraintlayout.widget.ConstraintLayout
        android:layout_width="match_parent"
        android:layout_height="match_parent">


        <TextView
            android:id="@+id/stag_id"
            android:layout_width="wrap_content"
            android:layout_height="wrap_content"
            android:layout_marginTop="37dp"
            android:layout_marginEnd="23dp"
            android:layout_marginBottom="1dp"
            android:fontFamily="@font/futurabold"
            android:text="1"
            android:textColor="@color/colorAccent"
            android:textSize="28sp"
            app:layout_constraintBottom_toTopOf="@+id/stag_desc"
            app:layout_constraintEnd_toEndOf="parent"
            app:layout_constraintStart_toEndOf="@+id/stag_Title"
            app:layout_constraintTop_toTopOf="parent" />

        <TextView
            android:id="@+id/stag_Title"
            android:layout_width="0dp"
            android:layout_marginTop="5dp"
            android:layout_height="wrap_content"
            android:layout_marginStart="16dp"
            android:layout_marginEnd="18dp"
            android:fontFamily="@font/futuraheavy"
            android:text="Shortflim Script"
            android:textColor="@android:color/black"
            android:textSize="20sp"
            app:layout_constraintBottom_toTopOf="@+id/stag_desc"
            app:layout_constraintEnd_toStartOf="@+id/stag_id"
            app:layout_constraintStart_toStartOf="parent" />

        <TextView
            android:id="@+id/stag_desc"
            android:layout_width="wrap_content"
            android:layout_height="wrap_content"
            android:layout_marginBottom="8dp"
            android:fontFamily="@font/futurabook"
            android:padding="15dp"
            android:text="Hello all its me insane developer here. In this tutorial we gonna see Hello all its me insane developer here. In this tutorial we gonna see"
            android:textColor="@android:color/black"
            android:textSize="18sp"
            app:layout_constraintBottom_toBottomOf="parent"
            app:layout_constraintStart_toStartOf="parent"
            app:layout_constraintTop_toBottomOf="@+id/stag_id" />


    </androidx.constraintlayout.widget.ConstraintLayout>






</androidx.cardview.widget.CardView>
```

**(c). `todo_rv_layout.xml`**

> Our `todo_rv_layout` layout.

This layout will represent our Layout Rv Todo's layout. Specify [`androidx.cardview.widget.CardView`](https://android.examples.directory/cardview) as it's root element then inside it place the following [widgets](https://android.examples.directory/view):

1. [`ConstraintLayout`](https://android.examples.directory/constraintlayout)
2. [`TextView`](https://android.examples.directory/textview)

```xml
<?xml version="1.0" encoding="utf-8"?>
<androidx.cardview.widget.CardView
    xmlns:android="http://schemas.android.com/apk/res/android"
    xmlns:app="http://schemas.android.com/apk/res-auto"
    xmlns:tools="http://schemas.android.com/tools"
    android:orientation="vertical"
    app:cardElevation="5dp"
    app:cardCornerRadius="12dp"
    android:layout_margin="10dp"
    android:layout_width="match_parent"
    android:layout_height="180dp">

    <androidx.constraintlayout.widget.ConstraintLayout
        android:layout_width="match_parent"
        android:layout_height="match_parent"
        app:layout_constraintBottom_toTopOf="@+id/descTV"
        app:layout_constraintTop_toTopOf="@+id/descTV">


        <TextView
            android:id="@+id/idNumber"
            android:layout_width="wrap_content"
            android:layout_height="wrap_content"
            android:layout_marginTop="27dp"
            android:layout_marginEnd="35dp"
            android:text="1"
            android:textColor="@android:color/holo_red_light"
            android:textSize="26sp"
            android:textStyle="bold"
            app:layout_constraintEnd_toEndOf="parent"
            app:layout_constraintTop_toTopOf="parent" />


        <TextView
            android:id="@+id/titleTV"
            android:layout_width="wrap_content"
            android:layout_height="wrap_content"
            android:layout_marginStart="33dp"
            android:layout_marginTop="27dp"
            android:text="Todays Task"
            android:textColor="@android:color/black"
            android:textSize="24sp"
            android:textStyle="bold"
            app:layout_constraintStart_toStartOf="parent"
            app:layout_constraintTop_toTopOf="parent" />

        <TextView
            android:id="@+id/descTV"
            android:layout_width="wrap_content"
            android:layout_height="wrap_content"
            android:layout_marginStart="33dp"
            android:layout_marginBottom="66dp"
            android:text="Todays Task"
            android:textColor="@android:color/darker_gray"
            android:textSize="18sp"
            app:layout_constraintBottom_toBottomOf="parent"
            app:layout_constraintStart_toStartOf="parent" />

    </androidx.constraintlayout.widget.ConstraintLayout>



</androidx.cardview.widget.CardView>
```

**(d). `activity_main.xml`**

> Our `activity_main` layout.

This layout will represent our Main Activity's layout. Specify [`androidx.constraintlayout.widget.ConstraintLayout`](https://android.examples.directory/constraintlayout) as it's root element then inside it place the following [widgets](https://android.examples.directory/view):

1. [`RecyclerView`](https://android.examples.directory/recyclerview)
2. [`FloatingActionButton`](https://android.examples.directory/floatingactionbutton)

```xml
<?xml version="1.0" encoding="utf-8"?>
<androidx.constraintlayout.widget.ConstraintLayout xmlns:android="http://schemas.android.com/apk/res/android"
    xmlns:app="http://schemas.android.com/apk/res-auto"
    xmlns:tools="http://schemas.android.com/tools"
    android:layout_width="match_parent"
    android:layout_height="match_parent"
    tools:context=".MainActivity">


    <androidx.recyclerview.widget.RecyclerView
        android:id="@+id/todoRV"
        android:layout_width="0dp"
        android:layout_height="0dp"
        android:layout_margin="10dp"
        app:layout_constraintBottom_toBottomOf="parent"
        app:layout_constraintEnd_toEndOf="parent"
        app:layout_constraintStart_toStartOf="parent"
        app:layout_constraintTop_toTopOf="parent" />

    <com.google.android.material.floatingactionbutton.FloatingActionButton
        android:id="@+id/addNotes"
        android:layout_width="wrap_content"
        android:layout_height="wrap_content"
        android:layout_marginEnd="24dp"
        android:layout_marginBottom="45dp"
        android:src="@drawable/ic_add_black_24dp"
        app:layout_constraintBottom_toBottomOf="parent"
        app:layout_constraintEnd_toEndOf="parent" />


</androidx.constraintlayout.widget.ConstraintLayout>
```
#### Step 3. Write Code

Finally we need to write our code as follows:


**(a). `Todo.kt`**

> Our `Todo` class.

Create a Kotlin file named `Todo.kt` .

Here is the full code:

```kotlin
package replace_with_your_package_name

import io.realm.RealmObject
import io.realm.annotations.PrimaryKey

open class Todo(

    @PrimaryKey
    var id:Int?=null,
    var title: String?= null,
    var description: String?= null
) : RealmObject()

```


**(b). `TodoModel.kt`**

> Our `TodoModel` class.

Create a Kotlin file named `TodoModel.kt` .

First override these callbacks: 

1. `addTodo(realm: Realm, todo: Todo): Boolean `.
2. `deleteTodo(realm: Realm, int: Int): Boolean `.
3. `updateTodo(realm: Realm, todo: Todo): Boolean `.

Here is the full code:

```kotlin
package replace_with_your_package_name

import io.realm.Realm
import www.sanju.todonotes.Model.Todo


class TodoModel :TodoInterface{



    override fun addTodo(realm: Realm, todo: Todo): Boolean {

        return try {
            realm.beginTransaction()

            val currentIdNum: Number? = realm.where(Todo::class.java).max("id")

            val nextId: Int

            nextId = if (currentIdNum == null) {
                1
            } else {
                currentIdNum.toInt() + 1
            }

            todo.id = nextId

            realm.copyToRealmOrUpdate(todo)

            realm.commitTransaction()

            true
        } catch (e: Exception) {
            println(e)
            false
        }

    }

    override fun deleteTodo(realm: Realm, int: Int): Boolean {

        try {
            realm.beginTransaction()
            realm.where(Todo :: class.java).equalTo("id",int).findFirst()?.deleteFromRealm()
            realm.commitTransaction()
            return true
        } catch (e: Exception) {
            println(e)
            return false
        }
    }

    override fun updateTodo(realm: Realm, todo: Todo): Boolean {
        TODO("not implemented") //To change body of created functions use File | Settings | File Templates.
    }


}






```


**(c). `TodoInterface.kt`**

> Our `TodoInterface` class.

Create a Kotlin file named `TodoInterface.kt` .

Then we will be creating the following functions:



Here is the full code:

```kotlin
package replace_with_your_package_name

import io.realm.Realm
import io.realm.RealmResults
import www.sanju.todonotes.Model.Todo

interface TodoInterface {

    fun addTodo(realm: Realm, todo: Todo):Boolean
    fun deleteTodo(realm: Realm,id: Int):Boolean
    fun updateTodo(realm: Realm, todo: Todo):Boolean


}

```


**(d). `TodoAdapter.kt`**

> Our `TodoAdapter` class.

Create a Kotlin file named `TodoAdapter.kt` and add the necessary imports. Here are some of the imports we will be using:
1. `TextView` from the `android.widget` package.
2. `Toast` from the `android.widget` package.
3. `RecyclerView` from the `androidx.recyclerview.widget` package.
4. `*` from the `kotlinx.android.synthetic.main.todo_rv_layout.view` package.
5. `*` from the `kotlinx.android.synthetic.main.todo_staggered_rv.view` package.

Then extend the `RecyclerView.ViewHolder(v!!),` and add its contents as follows:

First override these callbacks: 

1. `onBindViewHolder(holder: RecyclerView.ViewHolder, position: Int) `.
2. `onCreateViewHolder(parent: ViewGroup, viewType: Int): RecyclerView.ViewHolder `.
3. `getItemCount(): Int `.
4. `onClick(v: View?) `.

Here is the full code:

```kotlin
package replace_with_your_package_name

import android.content.Context
import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import android.widget.TextView
import android.widget.Toast
import androidx.recyclerview.widget.RecyclerView
import io.realm.RealmResults
import kotlinx.android.synthetic.main.todo_rv_layout.view.*
import kotlinx.android.synthetic.main.todo_staggered_rv.view.*
import www.sanju.todonotes.Model.Todo
import www.sanju.todonotes.R

class TodoAdapter(val context: Context?, private val todoList: RealmResults<Todo>): RecyclerView.Adapter<RecyclerView.ViewHolder>() {


    override fun onBindViewHolder(holder: RecyclerView.ViewHolder, position: Int) {


        holder.itemView.stag_Title.text = todoList[position]!!.title
        holder.itemView.stag_desc.text = todoList[position]!!.description
        holder.itemView.stag_id.text = todoList[position]!!.id.toString()




    }





    override fun onCreateViewHolder(parent: ViewGroup, viewType: Int): RecyclerView.ViewHolder {
        val v = LayoutInflater.from(parent.context).inflate(R.layout.todo_staggered_rv, parent, false)
        return ViewHolder(v)


    }

    override fun getItemCount(): Int {
        return todoList.size
    }

}

class ViewHolder(v: View?) : RecyclerView.ViewHolder(v!!), View.OnClickListener {
    override fun onClick(v: View?) {


    }

    init {
        itemView.setOnClickListener(this)
    }


    val title = itemView.findViewById<TextView>(R.id.titleTV)
    val desc = itemView.findViewById<TextView>(R.id.descTV)
    val id = itemView.findViewById<TextView>(R.id.idNumber)






}

```


**(e). `Application.kt`**

> Our `Application` class.

Create a Kotlin file named `Application.kt` and add the necessary imports. Here are some of the imports we will be using:
1. `Application` from the `android.app` package.

Then extend the `Application` and add its contents as follows:

First override these callbacks: 

1. `onCreate() `.

Here is the full code:

```kotlin
package replace_with_your_package_name

import android.app.Application
import io.realm.Realm
import io.realm.RealmConfiguration


class MyApp : Application() {
    override fun onCreate() {
        super.onCreate()

        // init realm
        Realm.init(this)
        val configuration = RealmConfiguration.Builder()
            .name("Todo.db")
            .deleteRealmIfMigrationNeeded()
            .schemaVersion(0)
            .build()

        Realm.setDefaultConfiguration(configuration)
    }
}


```


**(f). `AddNotesActivity.kt`**

> Our `AddNotesActivity` class.

Create a Kotlin file named `AddNotesActivity.kt` and add the necessary imports. Here are some of the imports we will be using:
1. `AppCompatActivity` from the `androidx.appcompat.app` package.
2. `Bundle` from the `android.os` package.
3. `Button` from the `android.widget` package.
4. `EditText` from the `android.widget` package.
5. `Toast` from the `android.widget` package.

Then extend the `AppCompatActivity` and add its contents as follows:

First override these callbacks: 

1. `onCreate(savedInstanceState: Bundle?) `.

Then we will be creating the following functions:

1. `saveData() `.

**(a). Our `saveData()` function.**

A function to save data:

```kotlin
    private fun saveData() {


        try {


            helper = TodoModel()
            val task = Todo()
            task.title = titleET.text.toString()
            task.description = descET.text.toString()

            //saving to Database
            helper.addTodo(realm,task)
            Toast.makeText(this,"Success",Toast.LENGTH_SHORT).show()

            startActivity(Intent(this,MainActivity::class.java))
            finish()



        } catch (e:Exception){

            Toast.makeText(this,"Failure",Toast.LENGTH_SHORT).show()

        }

    }
```


Here is the full code:

```kotlin
package replace_with_your_package_name

import android.content.Intent
import androidx.appcompat.app.AppCompatActivity
import android.os.Bundle
import android.widget.Button
import android.widget.EditText
import android.widget.Toast
import io.realm.Realm
import www.sanju.todonotes.Interface.TodoModel
import www.sanju.todonotes.MainActivity
import www.sanju.todonotes.Model.Todo
import www.sanju.todonotes.R

class AddNotesActivity : AppCompatActivity() {

    private lateinit var titleET:EditText
    private lateinit var descET:EditText
    private lateinit var saveBtn:Button
    private lateinit var realm: Realm
    private lateinit var helper:TodoModel



    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_add_notes)


        realm = Realm.getDefaultInstance()

        //init views

        titleET = findViewById(R.id.titleET)
        descET = findViewById(R.id.descET)
        saveBtn = findViewById(R.id.saveBtn)

        saveBtn.setOnClickListener {

            saveData()
        }

    }

    private fun saveData() {


        try {


            helper = TodoModel()
            val task = Todo()
            task.title = titleET.text.toString()
            task.description = descET.text.toString()

            //saving to Database
            helper.addTodo(realm,task)
            Toast.makeText(this,"Success",Toast.LENGTH_SHORT).show()

            startActivity(Intent(this,MainActivity::class.java))
            finish()



        } catch (e:Exception){

            Toast.makeText(this,"Failure",Toast.LENGTH_SHORT).show()

        }

    }
}


```


**(g). `MainActivity.kt`**

> Our `MainActivity` class.

Create a Kotlin file named `MainActivity.kt` and add the necessary imports. Here are some of the imports we will be using:
1. `AppCompatActivity` from the `androidx.appcompat.app` package.
2. `LinearLayoutManager` from the `androidx.recyclerview.widget` package.
3. `RecyclerView` from the `androidx.recyclerview.widget` package.
4. `StaggeredGridLayoutManager` from the `androidx.recyclerview.widget` package.
5. `*` from the `kotlinx.android.synthetic.main.activity_main` package.

Then extend the `AppCompatActivity` and add its contents as follows:

First override these callbacks: 

1. `onCreate(savedInstanceState: Bundle?) `.

Then we will be creating the following functions:

1. `getAllTodo() `.

**(a). Our `getAllTodo()` function.**

A function to get all todo:

```kotlin
    private fun getAllTodo() {


        todolist = ArrayList()

        val results: RealmResults<Todo> = realm.where<Todo>(
            Todo::class.java
        ).findAll()


        todoRV.adapter = TodoAdapter(this, results)





    }
```


Here is the full code:

```kotlin
package replace_with_your_package_name

import android.annotation.SuppressLint
import android.content.Intent
import android.os.Bundle
import android.widget.LinearLayout
import androidx.appcompat.app.AppCompatActivity
import androidx.recyclerview.widget.LinearLayoutManager
import androidx.recyclerview.widget.RecyclerView
import androidx.recyclerview.widget.StaggeredGridLayoutManager
import com.google.android.material.floatingactionbutton.FloatingActionButton
import io.realm.Realm
import io.realm.RealmResults
import kotlinx.android.synthetic.main.activity_main.*
import www.sanju.todonotes.Activity.AddNotesActivity
import www.sanju.todonotes.Adapter.TodoAdapter
import www.sanju.todonotes.Model.Todo


class MainActivity : AppCompatActivity() {

    private lateinit var realm: Realm
    private  var todolist = ArrayList<Todo>()
    private lateinit var addNotes: FloatingActionButton



    @SuppressLint("WrongConstant")
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_main)

        //init realm
        realm = Realm.getDefaultInstance()


        //init views
        val  todoRV = findViewById<RecyclerView>(R.id.todoRV)
        addNotes = findViewById(R.id.addNotes)

//        // layout manager
//        todoRV.layoutManager = LinearLayoutManager(
//            this,
//            LinearLayout.VERTICAL, false
//        )

        todoRV.layoutManager = StaggeredGridLayoutManager(2,LinearLayoutManager.VERTICAL)


        addNotes.setOnClickListener {

            startActivity(Intent(this,AddNotesActivity::class.java))
        }

        getAllTodo()

        addNotes.setOnLongClickListener {



                realm.beginTransaction()
                realm.deleteAll()
                realm.commitTransaction()

            getAllTodo()

            return@setOnLongClickListener true

        }


    }


    private fun getAllTodo() {


        todolist = ArrayList()

        val results: RealmResults<Todo> = realm.where<Todo>(
            Todo::class.java
        ).findAll()


        todoRV.adapter = TodoAdapter(this, results)





    }

}



```


<!--more-->

### Reference

Download the code below:

|No.|Link|
|--|---|
|1.|[Download Full Code](https://github.com/Spikeysanju/Mini-Notes-App-Realm/archive/refs/heads/master.zip)|
|2.|Read more [here](https://github.com/Spikeysanju/Mini-Notes-App-Realm).|
|3.|Follow code author [here](https://github.com/Spikeysanju).|
