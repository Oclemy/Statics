# Sectioned Recyclerview Examples


With RecyclerView being so flexible, there are very many customizations and variations you can utilize. One of those is a customization that allows you split your data into sections or groups. Such type of a recyclerview can be called a SectionRecyclerView.

In this tutorial we will look at examples related to creating recyclerview with sections. This is a step by step tutorial thus very good for beginners.


## Example 1: Kotlin Android RecyclerView with Sections and Horizontal Orientation

In this example we will look at how to create a recyclerview with sections/groups. Each of those groups or sections will contain a header as well as a content section.

Our header will be a TextView while our the items in the content section will be oriented horizontally and this will be scrollable in that manner.

**Demo**

Here is what will be built:

![Kotlin Android Sectioned Recyclerview Examples](https://github.com/kiwsan/android-recycle-view-sample/raw/master/screenshot_1567937278.png)

### Step 1: Add RecyclerView as a dependency

We are using androix in this project so add the following androidx versions of recyclerview as well as cardview. The recyclerview will contain cardviews. The cardviews will contain imageviews and textviews.

We will also be using glide to load images from Pixabay:

```groovy
    implementation 'androidx.recyclerview:recyclerview:1.1.0-beta03'
    implementation 'androidx.cardview:cardview:1.0.0'
    implementation 'com.github.bumptech.glide:glide:4.9.0'
```

### Step 2: Create Layouts.

We will nedd three layouts:

1. Single Content Item layout.
2. Single Section Header layout.
3. Main layout.

**(a). item_todo.xml**

This will represent a single todo item. It will have an imageview and a textview.

```xml
<?xml version="1.0" encoding="utf-8"?>
<androidx.cardview.widget.CardView xmlns:android="http://schemas.android.com/apk/res/android"
    xmlns:app="http://schemas.android.com/apk/res-auto"
    android:layout_width="match_parent"
    android:layout_height="wrap_content"
    android:orientation="horizontal"
    app:cardCornerRadius="5dp"
    app:cardUseCompatPadding="true">

    <LinearLayout
        android:layout_width="match_parent"
        android:layout_height="wrap_content"
        android:background="?android:selectableItemBackground"
        android:orientation="vertical"
        android:padding="0dp">

        <ImageView
            android:id="@+id/todoImage"
            android:layout_width="100dp"
            android:layout_height="100dp"
            android:layout_gravity="center_horizontal"
            android:scaleType="fitCenter"
            android:src="@android:drawable/ic_menu_report_image" />

        <TextView
            android:id="@+id/todoTitle"
            android:layout_width="match_parent"
            android:layout_height="wrap_content"
            android:layout_below="@id/todoImage"
            android:gravity="center"
            android:padding="5dp"
            android:text="Sample title"
            android:textColor="@android:color/black"
            android:textSize="18sp" />

    </LinearLayout>

</androidx.cardview.widget.CardView>
```

**(b). item_section.xml**

This will define the section header of the recyclerview:

```xml
<?xml version="1.0" encoding="utf-8"?>
<LinearLayout xmlns:android="http://schemas.android.com/apk/res/android"
    android:layout_width="match_parent"
    android:layout_height="match_parent"
    android:orientation="vertical">

    <RelativeLayout
        android:layout_width="match_parent"
        android:layout_height="wrap_content"
        android:padding="2dp">

        <TextView
            android:id="@+id/title"
            android:layout_width="wrap_content"
            android:layout_height="wrap_content"
            android:layout_alignParentStart="true"
            android:layout_alignParentLeft="true"
            android:layout_centerVertical="true"
            android:layout_gravity="center_vertical"
            android:layout_toLeftOf="@+id/btnMore"
            android:text="Sample title"
            android:textColor="@android:color/black"
            android:textSize="18sp" />

        <Button
            android:id="@+id/btnMore"
            android:layout_width="wrap_content"
            android:layout_height="42dp"
            android:layout_alignParentEnd="true"
            android:layout_alignParentRight="true"
            android:layout_centerVertical="true"
            android:text="more"
            android:textColor="#FFF" />
    </RelativeLayout>

    <androidx.recyclerview.widget.RecyclerView
        android:id="@+id/recyclerViewTodo"
        android:layout_width="match_parent"
        android:layout_height="160dp"
        android:layout_gravity="center_vertical"
        android:orientation="horizontal" />

</LinearLayout>
```

**(c). activity_main.xml**

The main activity layout. It will contain a recyclerview:

```xml
<?xml version="1.0" encoding="utf-8"?>
<androidx.constraintlayout.widget.ConstraintLayout xmlns:android="http://schemas.android.com/apk/res/android"
    xmlns:app="http://schemas.android.com/apk/res-auto"
    xmlns:tools="http://schemas.android.com/tools"
    android:layout_width="match_parent"
    android:layout_height="match_parent"
    tools:context=".MainActivity">

    <androidx.recyclerview.widget.RecyclerView
        android:id="@+id/recyclerView"
        android:layout_width="match_parent"
        android:layout_height="match_parent"
        android:scrollbars="none" />

</androidx.constraintlayout.widget.ConstraintLayout>
```

### Step 3: Write Kotlin Code

The next step is to write code. The code is written in kotlin in this case. We will have several classes:

#### (a). Create Model classes

Create a model class to represent a single todo item.

```kotlin
class TodoModel {
    var title: String? = null
    var imageUrl: String? = null
}
```

Then create another model class to represent a single recyclerview section:

```kotlin
class TodoSectionModel {
    var title: String = ""
    var items: ArrayList<TodoModel> = ArrayList()
}
```

#### (b). Create Adapter Classes

The next step is to create adapter classes.We need two such adapters one for the ToDo item while the other for a section.

Here is the adapter for the ToDo item:

**TodoAdapter**

```kotlin
import android.content.Context
import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import android.widget.ImageView
import android.widget.TextView
import androidx.recyclerview.widget.RecyclerView
import com.bumptech.glide.Glide
import com.bumptech.glide.load.engine.DiskCacheStrategy

class TodoAdapter(context: Context, items: ArrayList<TodoModel>?) :
    RecyclerView.Adapter<TodoAdapter.TodoViewHolder>() {

    private val items: ArrayList<TodoModel>?
    private val context: Context

    init {
        this.items = items
        this.context = context
    }

    override fun onCreateViewHolder(parent: ViewGroup, viewType: Int): TodoViewHolder {
        val view = LayoutInflater.from(parent.getContext()).inflate(R.layout.item_todo, null)

        return TodoViewHolder(view)
    }

    override fun getItemCount(): Int {
        if (items != null) {
            return items.count()
        }

        return 0
    }

    override fun onBindViewHolder(holder: TodoViewHolder, position: Int) {
        val title = items?.get(position)?.title
        val imageUrl = items?.get(position)?.imageUrl

        holder.todoTitle.text = title

        Glide.with(context)
            .load(imageUrl)
            .diskCacheStrategy(DiskCacheStrategy.ALL)
            .centerCrop()
            .error(android.R.drawable.ic_menu_report_image)
            .into(holder.todoImage)
    }

    inner class TodoViewHolder(view: View) : RecyclerView.ViewHolder(view) {
        var todoTitle: TextView
        var todoImage: ImageView

        init {
            this.todoTitle = view.findViewById(R.id.todoTitle) as TextView
            this.todoImage = view.findViewById(R.id.todoImage) as ImageView
        }
    }

}
```

**TodoSectionAdapter.kt**

Then here is the adapter for the todo section:

```kotlin
import android.content.Context
import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import android.widget.Button
import android.widget.TextView
import android.widget.Toast
import androidx.recyclerview.widget.LinearLayoutManager
import androidx.recyclerview.widget.RecyclerView

class TodoSectionAdapter(context: Context, items: ArrayList<TodoSectionModel>?) :
    RecyclerView.Adapter<TodoSectionAdapter.TodoSectionViewHolder>() {

    private val items: ArrayList<TodoSectionModel>?
    private val context: Context

    init {
        this.items = items
        this.context = context
    }

    override fun onCreateViewHolder(parent: ViewGroup, viewType: Int): TodoSectionViewHolder {
        val view = LayoutInflater.from(parent.getContext()).inflate(R.layout.item_section, null)

        return TodoSectionViewHolder(view)
    }

    override fun getItemCount(): Int {
        if (items != null) {
            return items.count()
        }

        return 0
    }

    override fun onBindViewHolder(holder: TodoSectionViewHolder, position: Int) {
        val name = items?.get(position)?.title
        val sections = items?.get(position)?.items

        val adapter = TodoAdapter(context, sections)

        holder.recyclerView.setHasFixedSize(true)
        holder.recyclerView.layoutManager = LinearLayoutManager(context, LinearLayoutManager.HORIZONTAL, false)
        holder.recyclerView.adapter = adapter

        holder.title.text = name
        holder.btnMore.setOnClickListener {
            Toast.makeText(context, name, Toast.LENGTH_SHORT).show()
        }
    }

    inner class TodoSectionViewHolder(view: View) : RecyclerView.ViewHolder(view) {
        var title: TextView
        var recyclerView: RecyclerView
        var btnMore: Button

        init {
            this.title = view.findViewById(R.id.title) as TextView
            this.recyclerView = view.findViewById(R.id.recyclerViewTodo) as RecyclerView
            this.btnMore = view.findViewById(R.id.btnMore) as Button
        }
    }

}
```

#### (c). Create Activity

Now put everything together inside the main activity:

**Mainactivity.kt**

```kotlin
import androidx.appcompat.app.AppCompatActivity
import android.os.Bundle
import androidx.recyclerview.widget.LinearLayoutManager
import kotlinx.android.synthetic.main.activity_main.*

class MainActivity : AppCompatActivity() {

    private val items: ArrayList<TodoSectionModel>? = ArrayList()

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_main)

        items?.addAll(getItems())

        val adapter = TodoSectionAdapter(this, items)

        recyclerView?.setHasFixedSize(true)
        recyclerView?.layoutManager = LinearLayoutManager(this)
        recyclerView?.adapter = adapter
    }

    private fun getItems(): ArrayList<TodoSectionModel> {
        val items = ArrayList<TodoSectionModel>()
        val todos = ArrayList<TodoModel>()

        val todo1 = TodoModel()
        todo1.title = "Todo 1"
        todo1.imageUrl = "https://cdn.pixabay.com/photo/2016/03/09/15/30/girl-1246690_960_720.jpg"

        todos.add(todo1)

        val todo2 = TodoModel()
        todo2.title = "Todo 2"
        todo2.imageUrl = "https://cdn.pixabay.com/photo/2016/03/09/16/48/street-1246852_960_720.jpg"

        todos.add(todo2)

        val todo3 = TodoModel()
        todo3.title = "Todo 3"
        todo3.imageUrl = "https://cdn.pixabay.com/photo/2016/03/09/16/49/medieval-1246853_960_720.jpg"

        todos.add(todo3)

        val todo4 = TodoModel()
        todo4.title = "Todo 4"
        todo4.imageUrl = "https://cdn.pixabay.com/photo/2016/03/09/16/47/tattoo-1246840_960_720.jpg"

        todos.add(todo4)

        val item1 = TodoSectionModel()
        item1.title = "Free-Photos from pixabay.com"
        item1.items.addAll(todos)

        items.add(item1)

        val item2 = TodoSectionModel()
        item2.title = "Free-Photos from pixabay.com"
        item2.items.addAll(todos)

        items.add(item2)

        return items
    }
}
```

### Run

Then run the project. Scroll above at the beginning of this example to view the screenshot.

### Reference

Here are the links:

| No. | Link |
| --- | --- |
| 1. | [Download](https://github.com/kiwsan/android-recycle-view-sample/archive/refs/heads/master.zip) the Project |
| 2. | [Browse](https://github.com/kiwsan/android-recycle-view-sample) the Project |
| 3. | [Follow](https://github.com/kiwsan) the project author |

## Example 2: How to Create a Lettered Sectioned RecyclerView

Let's say you want to sort and group a list of countries with letters, well this example is for you. The example is written in Java and android studio.

**Demo**

Here is the demoof the project:

![Sectioned RecyclerView with Letters](https://github.com/sayanmanna/LetterSectionedRecyclerView/blob/master/images/Screenshot_1504705038.png?raw=true)

### Step 1: Add ReyclerView

Start by adding recyclerview to dependencies. You can use the latest versions of recyclerview.

### Step 2: Create Layouts

We will have three layouts:

1. Item Layout.
2. Header Layout.
3. Main Layout.

**item_name.xml**

This is the layout for a single country or recyclerview item:

```xml
<?xml version="1.0" encoding="utf-8"?>
<LinearLayout xmlns:android="http://schemas.android.com/apk/res/android"
    android:layout_width="match_parent"
    android:layout_height="wrap_content"
    android:orientation="vertical">

    <TextView
        android:id="@+id/nameTextview"
        android:layout_width="match_parent"
        android:layout_height="34dp"
        android:gravity="left|center"
        android:text="CountryName"
        android:paddingLeft="20dp"
        android:textSize="15dp" />
</LinearLayout>
```

**item_header_title.xml**

This is the layout for the section header which will contain the alphabet:

```xml
<?xml version="1.0" encoding="utf-8"?>
<LinearLayout xmlns:android="http://schemas.android.com/apk/res/android"
    android:layout_width="match_parent"
    android:layout_height="wrap_content"
    android:background="@color/colorPrimary"
    android:orientation="vertical"
    android:padding="5dp">

    <TextView
        android:id="@+id/headerTitleTextview"
        android:layout_width="match_parent"
        android:layout_height="wrap_content"
        android:textSize="20dp"
        android:textStyle="bold"
        android:paddingLeft="10dp"
        android:text="S"
        android:textColor="@color/colorAccent"/>

</LinearLayout>
```

**activity_main.xml**

Lastly there is the main layout:

```xml
<?xml version="1.0" encoding="utf-8"?>
<LinearLayout xmlns:android="http://schemas.android.com/apk/res/android"
    android:layout_width="match_parent"
    android:layout_height="match_parent"
    android:orientation="vertical">

    <androidx.recyclerview.widget.RecyclerView
        android:id="@+id/recyclerView"
        android:layout_width="match_parent"
        android:layout_height="wrap_content"
        android:clipToPadding="false"/>

</LinearLayout>
```

### Step 3: Write Code

Next we write our code. In this case we are using Java. We will have three classes:

#### (a). Creaet Model class

You start by creating a model class. This class will define a single country:

```java
public class CountriesModel {
    public String name;
    public boolean isSection;

    public CountriesModel(String name, boolean isSection) {
        this.name = name;
        this.isSection = isSection;
    }
}
```

#### (b). Create Adapter class

The next step is to create an adapter class for the recyclerview. This class will bind data to the inflated widgets:

```java
public class CountriesAdapter extends RecyclerView.Adapter<RecyclerView.ViewHolder> {

    public static final int SECTION_VIEW = 0;
    public static final int CONTENT_VIEW = 1;

    ArrayList<CountriesModel> mCountriesModelList;
    WeakReference<Context> mContextWeakReference;

    public CountriesAdapter(ArrayList<CountriesModel> mCountriesModelList, Context context) {

        this.mCountriesModelList = mCountriesModelList;
        this.mContextWeakReference = new WeakReference<Context>(context);
    }

    @Override
    public RecyclerView.ViewHolder onCreateViewHolder(ViewGroup parent, int viewType) {

        Context context = mContextWeakReference.get();
        if (viewType == SECTION_VIEW) {
            return new SectionHeaderViewHolder(LayoutInflater.from(parent.getContext()).inflate(R.layout.item_header_title, parent, false));
        }
        return new ItemViewHolder(LayoutInflater.from(parent.getContext()).inflate(R.layout.item_name, parent, false), context);
    }

    @Override
    public int getItemViewType(int position) {
        if (mCountriesModelList.get(position).isSection) {
            return SECTION_VIEW;
        } else {
            return CONTENT_VIEW;
        }
    }

    @Override
    public void onBindViewHolder(final RecyclerView.ViewHolder holder, int position) {

        Context context = mContextWeakReference.get();
        if (context == null) {
            return;
        }
        if (SECTION_VIEW == getItemViewType(position)) {

            SectionHeaderViewHolder sectionHeaderViewHolder = (SectionHeaderViewHolder) holder;
            CountriesModel sectionItem = mCountriesModelList.get(position);
            sectionHeaderViewHolder.headerTitleTextview.setText(sectionItem.name);
            return;
        }

        ItemViewHolder itemViewHolder = (ItemViewHolder) holder;
        CountriesModel currentUser = ((CountriesModel) mCountriesModelList.get(position));
        itemViewHolder.nameTextview.setText(currentUser.name);

    }

    @Override
    public int getItemCount() {
        return mCountriesModelList.size();
    }

    public static class ItemViewHolder extends RecyclerView.ViewHolder {

        public TextView nameTextview;

        public ItemViewHolder(View itemView, final Context context) {
            super(itemView);
            nameTextview = (TextView) itemView.findViewById(R.id.nameTextview);
        }
    }

    public class SectionHeaderViewHolder extends RecyclerView.ViewHolder {
        TextView headerTitleTextview;

        public SectionHeaderViewHolder(View itemView) {
            super(itemView);
            headerTitleTextview = (TextView) itemView.findViewById(R.id.headerTitleTextview);
        }
    }
}
```

#### (c). Create Activity

Last but not least we need to put everything together inside the main activity:

```java
public class MainActivity extends AppCompatActivity {

    private CountriesAdapter mAdapter;
    private ArrayList<CountriesModel> mSectionList;
    private String[] mCountries;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);

        mCountries = getApplicationContext().getResources().getStringArray(R.array.countries);
        ArrayList<CountriesModel> countriesModels = new ArrayList<>();
        for (int j = 0; j < mCountries.length ; j++) {
            countriesModels.add(new CountriesModel(mCountries[j].toString(),false));
        }

        mSectionList = new ArrayList<>();
        getHeaderListLatter(countriesModels);
        RecyclerView recyclerView = (RecyclerView) findViewById(R.id.recyclerView);
        recyclerView.setHasFixedSize(true);
        final LinearLayoutManager mLayoutManager = new LinearLayoutManager(this);
        recyclerView.setLayoutManager(mLayoutManager);
        mAdapter = new CountriesAdapter(mSectionList, this);
        recyclerView.setAdapter(mAdapter);

    }

    private void getHeaderListLatter(ArrayList<CountriesModel> usersList) {

        Collections.sort(usersList, new Comparator<CountriesModel>() {
            @Override
            public int compare(CountriesModel user1, CountriesModel user2) {
                return String.valueOf(user1.name.charAt(0)).toUpperCase().compareTo(String.valueOf(user2.name.charAt(0)).toUpperCase());
            }
        });

        String lastHeader = "";

        int size = usersList.size();

        for (int i = 0; i < size; i++) {

            CountriesModel user = usersList.get(i);
            String header = String.valueOf(user.name.charAt(0)).toUpperCase();

            if (!TextUtils.equals(lastHeader, header)) {
                lastHeader = header;
                mSectionList.add(new CountriesModel(header,true));
            }

            mSectionList.add(user);
        }
    }
}
```

### Run

Run the project. Check the demo by scrolling at the beginning of this example.

### Reference

Find the source code reference below:

| No. | Link |
| --- | --- |
| 1. | [Download](https://github.com/sayanmanna/LetterSectionedRecyclerView/archive/refs/heads/master.zip) Code |
| 2. | [Browse](https://github.com/sayanmanna/LetterSectionedRecyclerView) Code |
| 3. | [Follow](https://github.com/sayanmanna/) Code author |

## Example 3: Android Sectioned RecyclerView with Date Headers

This is a sectioned recycleview example where you want to group sections based on dates. This is a very practical type of scenario which you can encounter when creating many types of apps.

For example when creating a blog app you may need to organize articles based on the dates they were created. In that type of scenario this example is very applicable.

**Demo**

Here is the demo of the project we are creating:

![Android Sectioned RecyclerView with Date Headers](https://github.com/sayanmanna/DateSectionRecyclerView/blob/master/images/Screenshot_1504705147.png?raw=true)

### Step 1: Add Recyclerview

We are not using any third party library. However you need to add androidx recyclerview in your dependencies.

### Step 2: Create Layouts

The next step is to create layouts. We have three such layouts:

1. Item Layout
2. Header Layout
3. Main Layout.

**(a). item_name.xml**

Add a textview to this layout:

```xml
<?xml version="1.0" encoding="utf-8"?>
<LinearLayout xmlns:android="http://schemas.android.com/apk/res/android"
    android:layout_width="match_parent"
    android:layout_height="wrap_content"
    android:orientation="vertical">

    <TextView
        android:id="@+id/nameTextview"
        android:layout_width="match_parent"
        android:layout_height="34dp"
        android:gravity="left|center"
        android:text="CountryName"
        android:paddingLeft="20dp"
        android:textSize="15dp" />

</LinearLayout>
```

**(b). item_header_title.xml**

Also add a textview to be used to show header title:

```xml
<?xml version="1.0" encoding="utf-8"?>
<LinearLayout xmlns:android="http://schemas.android.com/apk/res/android"
    android:layout_width="match_parent"
    android:layout_height="wrap_content"
    android:background="@color/colorPrimary"
    android:orientation="vertical"
    android:padding="5dp">

    <TextView
        android:id="@+id/headerTitleTextview"
        android:layout_width="match_parent"
        android:layout_height="wrap_content"
        android:textSize="20dp"
        android:textStyle="bold"
        android:paddingLeft="10dp"
        android:text="S"
        android:textColor="@color/colorAccent"/>

</LinearLayout>
```

**(c). activity_main.xml**

Next add a recyclerview in your main activity layout;

```xml
<?xml version="1.0" encoding="utf-8"?>
<LinearLayout xmlns:android="http://schemas.android.com/apk/res/android"
    android:layout_width="match_parent"
    android:layout_height="match_parent"
    android:orientation="vertical">

    <androidx.recyclerview.widget.RecyclerView
        android:id="@+id/recyclerView"
        android:layout_width="match_parent"
        android:layout_height="wrap_content"
        android:clipToPadding="false"/>

</LinearLayout>
```

### Step3: Write Java Code

The next step is to write code. We will need three classes: model class, adapter class and the activity.

#### (a). Create a Model class

Create a model class to represent a single recyclerview item:

```java
public class CountriesModel {
    public String name;
    public boolean isSection;

    public CountriesModel(String name, boolean isSection) {
        this.name = name;
        this.isSection = isSection;
    }
}
```

#### (b). Create an Adapter class

The next step is to create an adapter class. Two integers will be used to represent a section header and section content.

```java
public class CountriesAdapter extends RecyclerView.Adapter<RecyclerView.ViewHolder> {

    public static final int SECTION_VIEW = 0;
    public static final int CONTENT_VIEW = 1;

    ArrayList<CountriesModel> mCountriesModelList;
    WeakReference<Context> mContextWeakReference;

    public CountriesAdapter(ArrayList<CountriesModel> mCountriesModelList, Context context) {

        this.mCountriesModelList = mCountriesModelList;
        this.mContextWeakReference = new WeakReference<Context>(context);
    }

    @Override
    public RecyclerView.ViewHolder onCreateViewHolder(ViewGroup parent, int viewType) {

        Context context = mContextWeakReference.get();
        if (viewType == SECTION_VIEW) {
            return new SectionHeaderViewHolder(LayoutInflater.from(parent.getContext()).inflate(R.layout.item_header_title, parent, false));
        }
        return new ItemViewHolder(LayoutInflater.from(parent.getContext()).inflate(R.layout.item_name, parent, false), context);
    }

    @Override
    public int getItemViewType(int position) {
        if (mCountriesModelList.get(position).isSection) {
            return SECTION_VIEW;
        } else {
            return CONTENT_VIEW;
        }
    }

    @Override
    public void onBindViewHolder(final RecyclerView.ViewHolder holder, int position) {

        Context context = mContextWeakReference.get();
        if (context == null) {
            return;
        }
        if (SECTION_VIEW == getItemViewType(position)) {

            SectionHeaderViewHolder sectionHeaderViewHolder = (SectionHeaderViewHolder) holder;
            CountriesModel sectionItem = mCountriesModelList.get(position);
            sectionHeaderViewHolder.headerTitleTextview.setText(sectionItem.name);
            return;
        }

        ItemViewHolder itemViewHolder = (ItemViewHolder) holder;
        CountriesModel currentUser = ((CountriesModel) mCountriesModelList.get(position));
        itemViewHolder.nameTextview.setText(currentUser.name);

    }

    @Override
    public int getItemCount() {
        return mCountriesModelList.size();
    }

    public static class ItemViewHolder extends RecyclerView.ViewHolder {

        public TextView nameTextview;

        public ItemViewHolder(View itemView, final Context context) {
            super(itemView);
            nameTextview = (TextView) itemView.findViewById(R.id.nameTextview);
        }
    }

    public class SectionHeaderViewHolder extends RecyclerView.ViewHolder {
        TextView headerTitleTextview;

        public SectionHeaderViewHolder(View itemView) {
            super(itemView);
            headerTitleTextview = (TextView) itemView.findViewById(R.id.headerTitleTextview);
        }
    }
}
```

#### (c). Create an Activity

Lastly there will be our main activity;

```java
public class MainActivity extends AppCompatActivity {

    private CountriesAdapter mAdapter;
    private ArrayList<CountriesModel> mSectionList;
    private String[] mCountries;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);

        mCountries = getApplicationContext().getResources().getStringArray(R.array.countries);
        ArrayList<CountriesModel> countriesModels = new ArrayList<>();
        for (int j = 0; j < mCountries.length ; j++) {
            countriesModels.add(new CountriesModel(mCountries[j].toString(),false));
        }

        mSectionList = new ArrayList<>();
        getHeaderListLatter(countriesModels);
        RecyclerView recyclerView = (RecyclerView) findViewById(R.id.recyclerView);
        recyclerView.setHasFixedSize(true);
        final LinearLayoutManager mLayoutManager = new LinearLayoutManager(this);
        recyclerView.setLayoutManager(mLayoutManager);
        mAdapter = new CountriesAdapter(mSectionList, this);
        recyclerView.setAdapter(mAdapter);

    }

    private void getHeaderListLatter(ArrayList<CountriesModel> usersList) {

        Collections.sort(usersList, new Comparator<CountriesModel>() {
            @Override
            public int compare(CountriesModel user1, CountriesModel user2) {
                return String.valueOf(user1.name.charAt(0)).toUpperCase().compareTo(String.valueOf(user2.name.charAt(0)).toUpperCase());
            }
        });

        String lastHeader = "";

        int size = usersList.size();

        for (int i = 0; i < size; i++) {

            CountriesModel user = usersList.get(i);
            String header = String.valueOf(user.name.charAt(0)).toUpperCase();

            if (!TextUtils.equals(lastHeader, header)) {
                lastHeader = header;
                mSectionList.add(new CountriesModel(header,true));
            }

            mSectionList.add(user);
        }
    }
}
```

### Run

Run the code.

### Reference

Here are the reference links:

| No. | Link |
| --- | --- |
| 1. | [Download](https://github.com/sayanmanna/DateSectionRecyclerView/archive/refs/heads/master.zip) Code |
| 2. | [Browse](https://github.com/sayanmanna/DateSectionRecyclerView/) Project |
| 3. | [Follow](https://github.com/sayanmanna/) code author |

## Example 4: Beautiful Sectioned RecyclerView Example

Let's look at our example four of sectioned recycelrview. this example will be written in Java and it displays a list of dishes grouped according to dish type.

**Demo**

Here is the demo of this project:

![Sectioned RecyclerView](https://github.com/manojgm/GitSectionedRecyclerView/raw/master/app/screenshots/app_screenshot.png)

### Step 1: Add RecylerView

Start by adding recyclerview as well as cardview in the gradele dependecnies section. Also add Picasso which will be used to load images:

### step 2: Create Layouts

Proceed and create our three layouts:

**(a). recylerview_item.xl**

Design your recyclerview row item as follows:

```xml
<?xml version="1.0" encoding="utf-8"?>
<android.support.design.widget.CoordinatorLayout xmlns:android="http://schemas.android.com/apk/res/android"
    android:layout_width="match_parent"
    android:layout_height="wrap_content"
    >

    <RelativeLayout
        android:layout_width="wrap_content"
        android:layout_height="match_parent"
        android:id="@+id/restaurant_dish_relative_layout">

        <TextView
            android:id="@+id/food_name"
            android:layout_width="wrap_content"
            android:layout_height="wrap_content"
            android:layout_margin="8dp"
            android:text="@string/restaurant_dish_name"
            android:layout_toEndOf="@id/food_image"
            android:textColor="@color/colorPrimaryText"
            android:textSize="15sp"
            android:textStyle="bold"/>

        <ImageView
            android:id="@+id/food_image"
            android:layout_width="100dp"
            android:layout_height="100dp"
            android:layout_margin="8dp"
            android:scaleType="centerCrop"
            android:contentDescription="@string/veg_only" />
        <TextView
            android:id="@+id/menu_item_description"
            android:layout_width="wrap_content"
            android:layout_height="wrap_content"
            android:layout_margin="8dp"
            android:layout_toEndOf="@id/food_image"
            android:layout_below="@id/food_name"
            android:text="@string/description_text"
            android:textColor="@color/colorPrimaryText"
            android:textSize="12sp"
            android:fontFamily="sans-serif-light"
             />

        <TextView
            android:id="@+id/menu_item_price"
            android:layout_width="wrap_content"
            android:layout_height="wrap_content"
            android:layout_alignParentEnd="true"
            android:layout_margin="8dp"
            android:text="@string/dummy_dish_price"
            android:textColor="@color/colorPrimaryText"
            android:textSize="15sp"
            android:textStyle="bold" />

    </RelativeLayout>

    <View
        android:layout_width="match_parent"
        android:layout_height="2dp"
        android:background="#1FFFFFFF" />

</android.support.design.widget.CoordinatorLayout>
```

**(b). category_recyclerview.xml**

Now add a layout to represent our section header:

```xml
<?xml version="1.0" encoding="utf-8"?>
<RelativeLayout xmlns:android="http://schemas.android.com/apk/res/android"
    android:layout_width="match_parent"
    android:layout_height="wrap_content"
    xmlns:app="http://schemas.android.com/apk/res-auto"
    android:animateLayoutChanges="true"
    android:layout_margin="8dp"
    android:elevation="0dp">
    <RelativeLayout
        android:layout_width="match_parent"
        android:layout_height="wrap_content"
        android:id="@+id/category_card"
        android:layout_margin="4dp">
        <TextView
            android:id="@+id/restaurant_dish_category"
            android:layout_width="wrap_content"
            android:layout_height="wrap_content"
            android:text="@string/restaurant_food_category"
            android:textColor="@color/colorPrimaryText"
            android:textSize="15sp"
            android:textStyle="bold"
            android:fontFamily="sans-serif"
            />

        <TextView
            android:layout_width="wrap_content"
            android:layout_height="wrap_content"
            android:id="@+id/item_count"
            android:textSize="12sp"
            android:fontFamily="sans-serif-light"
            android:textStyle="bold"
            android:layout_below="@id/restaurant_dish_category"/>
        <ImageButton
            android:layout_width="wrap_content"
            android:layout_height="wrap_content"
            android:src="@drawable/ic_keyboard_arrow_down"
            android:background="@android:color/transparent"
            android:layout_alignParentEnd="true"
            android:id="@+id/down_arrow"
            android:layout_alignEnd="@id/item_count"
            android:layout_below="@id/restaurant_dish_category"
            android:contentDescription="@string/show_button"
            />
        <View
            android:id="@+id/down_line"
            android:layout_width="match_parent"
            android:layout_height="1dp"
            android:layout_below="@id/down_arrow"
            android:background="@drawable/dotted_line" />
    </RelativeLayout>

    <android.support.v7.widget.RecyclerView
        android:id="@+id/food_item_recycler_view"
        android:layout_width="match_parent"
        android:layout_height="wrap_content"
        android:orientation="vertical"
        app:layout_anchor="@id/category_card"
        app:layout_anchorGravity="bottom"
        android:layout_margin="4dp"
        android:layout_below="@id/category_card"
        />

    <View
        android:layout_width="match_parent"
        android:layout_height="2dp"
        android:background="#1FFFFFFF"
        android:layout_gravity="bottom"/>
</RelativeLayout>
```

**(c). activity_main.xml**

Add a recycelrview to your main activity layout:

```xml
<?xml version="1.0" encoding="utf-8"?>
<android.support.design.widget.CoordinatorLayout xmlns:android="http://schemas.android.com/apk/res/android"
    xmlns:app="http://schemas.android.com/apk/res-auto"
    xmlns:tools="http://schemas.android.com/tools"
    android:layout_width="match_parent"
    android:layout_height="match_parent"
    tools:context=".MainActivity">

<android.support.v7.widget.Toolbar
    android:layout_width="match_parent"
    android:layout_height="?attr/actionBarSize"
    android:text="@string/section_recycler_view"
    android:layout_marginBottom="8dp"
    android:background="@color/colorPrimary"
    app:titleTextAppearance="@style/AppTheme.GenericToolbarTextStyle"
    android:id="@+id/toolbar"/>

    <android.support.v7.widget.RecyclerView
        android:id="@+id/category_recyler_view"
        android:layout_width="match_parent"
        android:layout_height="wrap_content"
        android:layout_marginTop="?attr/actionBarSize"
        android:nestedScrollingEnabled="false"
        android:orientation="vertical"
        />

</android.support.design.widget.CoordinatorLayout>
```

### Step 3: Create Model classes

**(a). FoodItemModel.java**

Create a model class to represent a single food item:

```java
class FoodItemModel {

    String foodName;
    String foodDescription;
    String foodPrice;
    String foodImage;

    public FoodItemModel(String foodName, String foodDescription, String foodPrice, String foodImage) {
        this.foodName = foodName;
        this.foodDescription = foodDescription;
        this.foodPrice = foodPrice;
        this.foodImage = foodImage;
    }

    public String getFoodName() {
        return foodName;
    }

    public void setFoodName(String foodName) {
        this.foodName = foodName;
    }

    public String getFoodDescription() {
        return foodDescription;
    }

    public void setFoodDescription(String foodDescription) {
        this.foodDescription = foodDescription;
    }

    public String getFoodPrice() {
        return foodPrice;
    }

    public void setFoodPrice(String foodPrice) {
        this.foodPrice = foodPrice;
    }

    public String getFoodImage() {
        return foodImage;
    }

    public void setFoodImage(String foodImage) {
        this.foodImage = foodImage;
    }
}
```

**(b). CategoryModel.java**

Now create a model class to represent a single category:

```java
import java.util.ArrayList;

class CategoryModel {

    String categoryName;
    ArrayList<FoodItemModel> foodItemModels;

    public CategoryModel(String categoryName, ArrayList<FoodItemModel> foodItemModels) {
        this.categoryName = categoryName;
        this.foodItemModels = foodItemModels;
    }

    public CategoryModel() {

    }

    public String getCategoryName() {
        return categoryName;
    }

    public void setCategoryName(String categoryName) {
        this.categoryName = categoryName;
    }

    public ArrayList<FoodItemModel> getFoodItemModels() {
        return foodItemModels;
    }

    public void setFoodItemModels(ArrayList<FoodItemModel> foodItemModels) {
        this.foodItemModels = foodItemModels;
    }
}
```

### Step 5: Create Adapter classes

The adapter classes will be responsible for binding both our section contents as well as section headers. We will have two such classes:

**(a).ItemAdapter.java**

This adapter will bind the section contents:

```java
public class ItemAdapter extends RecyclerView.Adapter<ItemAdapter.ViewHolder> {

    Context context;
    ArrayList<FoodItemModel> foodItemModels;

    public ItemAdapter(Context context, ArrayList<FoodItemModel> foodItemModel) {
        this.context = context;
        this.foodItemModels = foodItemModel;
    }

    @NonNull
    @Override
    public ViewHolder onCreateViewHolder(@NonNull ViewGroup viewGroup, int i) {
        View view = LayoutInflater.from(context).
                inflate(R.layout.recylerview_item, viewGroup, false);
        return new ViewHolder(view);
    }

    @Override
    public void onBindViewHolder(@NonNull ViewHolder viewHolder, int i) {
        FoodItemModel foodItemModel = foodItemModels.get(i);
        viewHolder.foodNameTextView.setText(foodItemModel.getFoodName());
        viewHolder.descriptionTextView.setText(foodItemModel.getFoodDescription());
        viewHolder.priceTextView.setText(foodItemModel.getFoodPrice());
        Picasso.with(context).load(foodItemModel.getFoodImage()).into(viewHolder.foodImageView);

    }

    @Override
    public int getItemCount() {
        return foodItemModels.size();
    }

    public class ViewHolder extends RecyclerView.ViewHolder {
        TextView descriptionTextView;
        TextView foodNameTextView;
        ImageView foodImageView;
        TextView priceTextView;

        public ViewHolder(@NonNull View itemView) {
            super(itemView);
            priceTextView = itemView.findViewById(R.id.menu_item_price);
            descriptionTextView = itemView.findViewById(R.id.menu_item_description);
            foodImageView = itemView.findViewById(R.id.food_image);
            foodNameTextView = itemView.findViewById(R.id.food_name);
        }
    }
}
```

**(b). CategoryAdapter**

This class will be responsible for bindng section headers:

```java
public class CategoryAdapter extends RecyclerView.Adapter<CategoryAdapter.ViewHolder> {

    Context context;

    ArrayList<CategoryModel> categoryModels;

    public CategoryAdapter(Context context, ArrayList<CategoryModel> categoryModel) {
        this.context = context;
        this.categoryModels = categoryModel;
    }

    @NonNull
    @Override
    public ViewHolder onCreateViewHolder(@NonNull ViewGroup viewGroup, int i) {
        View  view = LayoutInflater.from(context).inflate(R.layout.category_recylerview,viewGroup,false);
        return new ViewHolder(view);
    }

    @Override
    public void onBindViewHolder(@NonNull ViewHolder viewHolder, int i) {

        CategoryModel categoryModel = categoryModels.get(i);

        ArrayList<FoodItemModel> foodItemModels = categoryModel.getFoodItemModels();

        ItemAdapter itemAdapter = new ItemAdapter(context,foodItemModels);

        viewHolder.categoryTextView.setText(categoryModel.getCategoryName());
        viewHolder.foodItemsRecyclerView.setLayoutManager(new LinearLayoutManager(context,
                LinearLayoutManager.VERTICAL, false));
        viewHolder.foodItemsRecyclerView.setAdapter(itemAdapter);
        viewHolder.foodItemsRecyclerView.setHasFixedSize(true);
        itemAdapter.notifyDataSetChanged();

    }

    @Override
    public int getItemCount() {
        return categoryModels.size();
    }

    public class ViewHolder extends RecyclerView.ViewHolder{

        TextView categoryTextView;
        RecyclerView foodItemsRecyclerView;

        public ViewHolder(@NonNull View itemView) {
            super(itemView);

            categoryTextView = itemView.findViewById(R.id.restaurant_dish_category);
            foodItemsRecyclerView = itemView.findViewById(R.id.food_item_recycler_view);
        }
    }
}
```

### Step 6: Create main activity

Then finally wrap everything under mian activity like below:

```java
public class MainActivity extends AppCompatActivity {

    Toolbar toolbar;
    RecyclerView categoryRecyclerView;
    CategoryAdapter categoryAdapter;
    ArrayList<CategoryModel> categoryModels = new ArrayList<>();

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);
        toolbar = findViewById(R.id.toolbar);
        categoryRecyclerView = findViewById(R.id.category_recyler_view);
        setSupportActionBar(toolbar);
        toolbar.setTitle(R.string.section_recycler_view);

        categoryRecyclerView.setHasFixedSize(true);
        categoryRecyclerView.setLayoutManager(new LinearLayoutManager(this, LinearLayout.VERTICAL, false));
        setUpAdapter();

    }

    private void setUpAdapter() {

        ArrayList<FoodItemModel> foodItemModels;

        for (int j = 0; j < 3; j++) {
            foodItemModels = new ArrayList<>();
            CategoryModel categoryModel = new CategoryModel();
            for (int i = 0; i < 2; i++) {
                FoodItemModel foodItemModel = new FoodItemModel("Butter Chicken",
                        "Butter chicken or murgh makhani is a dish, originating in India, of chicken in a mildly spiced tomato sauce.",
                        "₹ 240", "https://www.wellplated.com/wp-content/uploads/2018/07/Healthy-Instant-Pot-Butter-Chicken-500x673@2x.jpg");
                foodItemModels.add(foodItemModel);
            }
            categoryModel.setCategoryName("Chicken Dishes");
            categoryModel.setFoodItemModels(foodItemModels);
            categoryModels.add(categoryModel);
        }

        categoryAdapter = new CategoryAdapter(this,categoryModels);
        categoryRecyclerView.setAdapter(categoryAdapter);
        categoryAdapter.notifyDataSetChanged();
    }
}
```

### Run

Run the project.

### Reference

Download the project below:

| No. | Link |
| --- | --- |
| 1. | [Download](https://github.com/manoj-mili/sectioned-recyclerview/archive/refs/heads/master.zip) Code |
| 2. | [Browse](https://github.com/manoj-mili/sectioned-recyclerview/) Code |
| 3. | [Follow](https://github.com/manoj-mili/) Code author |

## Example 5: Kotlin Android Retrofit + MVVM + Sectioned RecyclerView - Fetch and render JSON data

So let's say you've looked at all the above examples and you now want to download data from the server and render it on the sectioned recycerlview. If that's the case then this example is for you.

**Demo**

Here is the demo of the app created in this example:

![Kotlin Android Sectioned RecyclerView with Retrofit](https://github.com/Afsar7977/Android-Section-RecyclerView-Demo/raw/master/Screenshots/SectionRecycler.png)

### Step 1: Add Dependencies

This is a more advanced example so lots of libraries are used. However the sectioned feature is implemented natively without using any library. Most of the libraries applied are to suport the networking capability of the app.

```groovy
    implementation "org.jetbrains.kotlin:kotlin-stdlib:$kotlin_version"
    implementation 'androidx.core:core-ktx:1.3.1'
    implementation 'androidx.appcompat:appcompat:1.2.0'
    implementation 'androidx.constraintlayout:constraintlayout:2.0.1'
    implementation 'com.squareup.picasso:picasso:2.71828'
    implementation "androidx.cardview:cardview:1.0.0"
    implementation 'de.hdodenhof:circleimageview:3.1.0'
    implementation 'com.github.bumptech.glide:glide:4.11.0'
    implementation "android.arch.lifecycle:viewmodel:1.1.1"
    implementation "androidx.lifecycle:lifecycle-common:2.2.0"
    implementation "androidx.lifecycle:lifecycle-runtime:2.2.0"
    implementation "androidx.lifecycle:lifecycle-extensions:2.2.0"
    implementation "android.arch.lifecycle:extensions:$lifecycle"
    implementation "androidx.lifecycle:lifecycle-livedata-ktx:$lifecycle"
    implementation 'org.jetbrains.kotlinx:kotlinx-coroutines-android:1.3.0'
    // Preferences DataStore
    implementation "androidx.datastore:datastore-preferences:1.0.0-alpha01"
    implementation "com.squareup.retrofit2:retrofit:2.8.1"
    implementation "com.squareup.retrofit2:converter-gson:2.8.1"
    implementation 'androidx.recyclerview:recyclerview:1.1.0'
```

Sync for the projects to be downloaded.

### Step 2: Add Necessary Permissions

Add the following permissions in your android manifest file:

```xml
    <uses-permission android:name="android.permission.INTERNET" />
    <uses-permission android:name="android.permission.ACCESS_WIFI_STATE" />
    <uses-permission android:name="android.permission.ACCESS_NETWORK_STATE" />
    <uses-permission android:name="android.permission.WRITE_CALENDAR" />
    <uses-permission android:name="android.permission.READ_CALENDAR" />
```

### Step 3: Create Layouts

Create the following three layouts:

1. Item Layout
2. Header Layout
3. Main Layout

**(a).list_item.xml**

Here is the code for the beautiful single row in the recyclerview:

```xml
<?xml version="1.0" encoding="utf-8"?>
<LinearLayout xmlns:android="http://schemas.android.com/apk/res/android"
    xmlns:app="http://schemas.android.com/apk/res-auto"
    xmlns:tools="http://schemas.android.com/tools"
    android:id="@+id/live_body"
    android:layout_width="match_parent"
    android:layout_height="wrap_content"
    android:layout_marginTop="15dp"
    android:layout_marginBottom="10dp"
    android:background="@color/background"
    android:orientation="vertical"
    android:padding="4dp">

    <LinearLayout
        android:layout_width="match_parent"
        android:layout_height="wrap_content"
        android:orientation="horizontal"
        tools:ignore="UselessParent">

        <de.hdodenhof.circleimageview.CircleImageView
            android:id="@+id/circular_image"
            android:layout_width="470dp"
            android:layout_height="match_parent"
            android:layout_gravity="center"
            android:layout_weight="0.8"
            android:src="@drawable/b1"
            app:civ_border_color="@color/accent_yellow"
            app:civ_border_width="2dp" />

        <LinearLayout
            android:layout_width="match_parent"
            android:layout_height="wrap_content"
            android:layout_weight="0.2"
            android:orientation="vertical">

            <TextView
                android:id="@+id/head_title"
                android:layout_width="match_parent"
                android:layout_height="wrap_content"
                android:layout_marginTop="2dp"
                android:text="SUBJECT"
                android:textColor="@color/text_dark_white"
                android:textSize="14sp"
                android:textStyle="bold"
                tools:ignore="HardcodedText,SmallSp" />

            <LinearLayout
                android:layout_width="match_parent"
                android:layout_height="wrap_content"
                android:orientation="vertical">

                <TextView
                    android:id="@+id/sub_title"
                    android:layout_width="match_parent"
                    android:layout_height="wrap_content"
                    android:layout_marginTop="2dp"
                    android:layout_marginBottom="5dp"
                    android:text="Title"
                    android:textColor="@color/black"
                    android:textSize="13sp"
                    android:textStyle="bold"
                    tools:ignore="HardcodedText,SmallSp" />

                <TextView
                    android:id="@+id/sub_title1"
                    android:layout_width="wrap_content"
                    android:layout_height="wrap_content"
                    android:layout_marginTop="2dp"
                    android:layout_marginBottom="5dp"
                    android:text="By Sneha Sharma"
                    android:textColor="@color/black"
                    android:textSize="13sp"
                    android:textStyle="normal"
                    tools:ignore="HardcodedText,SmallSp" />
            </LinearLayout>
        </LinearLayout>
    </LinearLayout>
</LinearLayout>
```

**(b). list_header.xml**

Here is the code for the header item:

```xml
<?xml version="1.0" encoding="utf-8"?>
<RelativeLayout xmlns:android="http://schemas.android.com/apk/res/android"
    xmlns:tools="http://schemas.android.com/tools"
    android:id="@+id/task_header_body"
    android:layout_width="match_parent"
    android:layout_height="wrap_content"
    android:layout_marginTop="10dp"
    android:layout_marginStart="10dp"
    android:layout_marginEnd="10dp">

    <TextView
        android:id="@+id/text1_task"
        android:layout_width="match_parent"
        android:layout_height="wrap_content"
        android:text="TODAYS"
        android:textColor="@color/accent_black"
        android:textSize="16sp"
        android:textStyle="bold"
        tools:ignore="HardcodedText" />

    <TextView
        android:id="@+id/text2_task"
        android:layout_width="match_parent"
        android:layout_height="4dp"
        android:layout_marginTop="10dp"
        android:layout_below="@id/text1_task"
        android:background="@color/accent_black"
        tools:ignore="HardcodedText" />

    <androidx.recyclerview.widget.RecyclerView
        android:id="@+id/child_recycler_view"
        android:layout_below="@id/text2_task"
        android:layout_width="match_parent"
        android:layout_height="wrap_content"
        android:layout_marginTop="10sp" />

</RelativeLayout>
```

**(c). activity_main.xml**

Then here is the code for the main activity layout:

```xml
<?xml version="1.0" encoding="utf-8"?>
<RelativeLayout xmlns:android="http://schemas.android.com/apk/res/android"
    xmlns:tools="http://schemas.android.com/tools"
    android:layout_width="match_parent"
    android:layout_height="match_parent"
    android:background="@color/background"
    tools:context=".MainActivity">

    <LinearLayout
        android:layout_width="match_parent"
        android:layout_height="wrap_content"
        android:layout_margin="10dp"
        android:orientation="vertical"
        tools:ignore="UselessParent">

        <TextView
            android:layout_width="match_parent"
            android:layout_height="wrap_content"
            android:layout_marginStart="5dp"
            android:layout_marginLeft="5dp"
            android:fontFamily="@font/opensans_regular"
            android:text="SECTION RECYCLER"
            android:textColor="@color/black"
            android:textSize="25sp"
            android:textStyle="bold"
            tools:ignore="HardcodedText" />

        <androidx.recyclerview.widget.RecyclerView
            android:id="@+id/section_recycler_view"
            android:layout_width="match_parent"
            android:layout_height="wrap_content"
            android:layout_marginTop="10sp" />
    </LinearLayout>

</RelativeLayout>
```

### Step 4: Create Model Classes

The next step is to create the model

**(a). DResponse.kt**

This class will represent a single item out of the items being fetched server response:

```kotlin

import com.google.gson.annotations.Expose
import com.google.gson.annotations.SerializedName

data class DResponse(
    @SerializedName("vthumb")
    @Expose
    var thumb: String,
    @SerializedName("vid_teacher")
    @Expose
    var teacher: String,
    @SerializedName("vdesc")
    @Expose
    var desc: String,
    @SerializedName("vid_id")
    @Expose
    var vidid: String,
    @SerializedName("sub_start_at")
    @Expose
    var substart: String,
    @SerializedName("subject_name")
    @Expose
    var subjName: String,
    @SerializedName("t_name")
    @Expose
    var tName: String,
    @SerializedName("vtitle")
    @Expose
    var title: String,
    @SerializedName("sub_end_at")
    @Expose
    var subend: String
)
```

**(b.) SectionResponse**

This will represent a single section being fechted from the server:

```kotlin
data class SectionResponse(
    var headers: List<CharSequence>,
    var dResponse: List<DResponse>
)
```

### Step 5: Create Network Classes

Next you need to create retrofit related classes.

**(a). ApiReponse.kt**

A data class to represent the API response:

```kotlin
data class ApiResponse<out T>(val status: Status, val data: T?, val message: String?) {
    companion object {
        fun <T> success(data: T): ApiResponse<T> =
            ApiResponse(status = Status.SUCCESS, data = data, message = null)

        fun <T> error(data: T?, message: String): ApiResponse<T> =
            ApiResponse(status = Status.ERROR, data = data, message = message)

        fun <T> loading(data: T?): ApiResponse<T> =
            ApiResponse(status = Status.LOADING, data = data, message = null)
    }
}
```

**(b). Status.kt**

An enum class to represent network operation status:

```kotlin
enum class Status {
    SUCCESS,
    ERROR,
    LOADING
}
```

**(c). Utils.kt**

This is an open helper class where you can write functions related to retrofit howto's:

```kotlin

import retrofit2.Retrofit
import retrofit2.converter.gson.GsonConverterFactory

open class Utils {
    companion object {
        private var BASE_URL: String = "https://www.json-generator.com/api/json/get/"
        var retrofit: Retrofit = Retrofit.Builder()
            .baseUrl(BASE_URL)
            .addConverterFactory(GsonConverterFactory.create())
            .build()
    }
}
```

**(d). WebApi.kt**

This is an interface that will contain methods related to the web api:

```kotlin
import com.afsar.sectionrecycler.Modal.DResponse
import retrofit2.Response
import retrofit2.http.GET
import retrofit2.http.Query

interface WebApi {

    @GET("cekLyuihNK?")
    suspend fun getResponse(
        @Query("indent") indent: String
    ): Response<List<DResponse>>
}
```

### Step 6: Create a ViewModel

This app follows the MVVM pattern. Here is the videmodel class:

```kotlin
import android.content.Context
import androidx.lifecycle.ViewModel
import androidx.lifecycle.liveData
import com.afsar.sectionrecycler.Network.ApiResponse
import com.afsar.sectionrecycler.Network.Utils
import com.afsar.sectionrecycler.Network.WebApi
import kotlinx.coroutines.Dispatchers

class VModel : ViewModel() {
    private lateinit var context: Context
    private val service = Utils.retrofit.create(WebApi::class.java)

    fun getDataResponse() = liveData(Dispatchers.IO) {
        emit(ApiResponse.loading(data = null))
        try {
            emit(ApiResponse.success(data = fetchData()))
        } catch (exception: Exception) {
            emit(ApiResponse.error(data = null, message = exception.message ?: "Error Occurred"))
        }
    }

    private suspend fun fetchData() = service.getResponse(
        "2"
    )
}
```

### Step 7: Create an Activity

Lastly, here is the main activity of this project. This is a single activity project.

```kotlin
class MainActivity : AppCompatActivity() {

    private lateinit var recyclerView: RecyclerView
    private lateinit var vModel: VModel
    private lateinit var sadapter: CustomAdapter
    private var responseList: ArrayList<DResponse> = ArrayList()
    private var TAG = "MainActivity"

    @RequiresApi(Build.VERSION_CODES.M)
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_main)
        window.decorView.systemUiVisibility = View.SYSTEM_UI_FLAG_LIGHT_STATUS_BAR
        vModel = ViewModelProviders.of(this).get(VModel::class.java)
        recyclerView = findViewById(R.id.section_recycler_view)

        try {
            loadRecyclerData()
        } catch (e: Exception) {
            e.printStackTrace()
        }

        recyclerView.apply {
            val layoutManager =
                LinearLayoutManager(applicationContext, LinearLayoutManager.VERTICAL, false)
            recyclerView.layoutManager = layoutManager
            sadapter = CustomAdapter(sectionResponse, applicationContext)
            recyclerView.adapter = sadapter
            sadapter.notifyDataSetChanged()
        }
    }

    @Suppress("PrivatePropertyName")
    inner class CustomAdapter(
        private val sList: ArrayList<SectionResponse>,
        private val vContext: Context
    ) :
        RecyclerView.Adapter<CustomAdapter.ViewHolder1>() {

        var newList: ArrayList<DResponse> = ArrayList()
        private var viewPool = RecyclerView.RecycledViewPool()

        override fun onCreateViewHolder(
            parent: ViewGroup,
            viewType: Int
        ): ViewHolder1 {
            val inflater = LayoutInflater.from(parent.context)
            val v = inflater.inflate(R.layout.list_header, parent, false)
            return ViewHolder1(v)
        }

        @SuppressLint("SimpleDateFormat", "SetTextI18n")
        override fun onBindViewHolder(holder: ViewHolder1, position: Int) {
            val parentItem = sList[position]
            val dateString =
                parentItem.headers[position].toString()
            val mydate: Date = SimpleDateFormat("yyyy-M-d").parse(dateString)!!
            val c = Calendar.getInstance()
            c.time = mydate
            when (c[Calendar.DAY_OF_WEEK]) {
                1
                -> {
                    holder.text1.text = "Sunday"
                }
                2 -> {
                    holder.text1.text = "Monday"
                }
                3 -> {
                    holder.text1.text = "Tuesday"
                }
                4 -> {
                    holder.text1.text = "Wednesday"
                }
                5 -> {
                    holder.text1.text = "Thursday"
                }
                6 -> {
                    holder.text1.text = "Friday"
                }
                7 -> {
                    holder.text1.text = "Saturday"
                }
            }
            val sessionList: ArrayList<DResponse> = ArrayList(parentItem.dResponse)
            val layoutManager = LinearLayoutManager(
                holder
                    .childRecyclerView
                    .context,
                LinearLayoutManager.VERTICAL,
                false
            )
            layoutManager.initialPrefetchItemCount = parentItem.dResponse.size
            val childAdapter =
                ChildAdapter(sessionList, vContext)
            holder.childRecyclerView.layoutManager = layoutManager
            holder
                .childRecyclerView
                .setRecycledViewPool(viewPool)
            holder.childRecyclerView.adapter = childAdapter
        }

        override fun getItemCount(): Int {
            return sList.size
        }

        inner class ViewHolder1(itemView: View) : RecyclerView.ViewHolder(itemView) {
            val text1 = itemView.findViewById<TextView>(R.id.text1_task)
            val text2 = itemView.findViewById<TextView>(R.id.text2_task)
            val childRecyclerView =
                itemView.findViewById<RecyclerView>(R.id.child_recycler_view)
        }
    }

    inner class ChildAdapter(private val childList: ArrayList<DResponse>, val vContext: Context) :
        RecyclerView.Adapter<ChildAdapter.ViewHolder>() {
        override fun getItemCount(): Int {
            return childList.size
        }

        override fun onBindViewHolder(holder: ViewHolder, position: Int) {
            holder.bindItems(childList[position])
        }

        override fun onCreateViewHolder(parent: ViewGroup, viewType: Int): ViewHolder {
            val inflater = LayoutInflater.from(parent.context)
            val v = inflater.inflate(R.layout.list_item, parent, false)
            return ViewHolder(v)
        }

        inner class ViewHolder(itemView: View) : RecyclerView.ViewHolder(itemView) {
            @SuppressLint("SetTextI18n", "SimpleDateFormat")
            fun bindItems(sdata: DResponse) {
                val cimage = itemView.findViewById<CircleImageView>(R.id.circular_image)
                val htitle = itemView.findViewById<TextView>(R.id.head_title)
                val title = itemView.findViewById<TextView>(R.id.sub_title)
                val name = itemView.findViewById<TextView>(R.id.sub_title1)
                Glide.with(vContext)
                    .asBitmap()
                    .fitCenter()
                    .load(sdata.thumb)
                    .error(R.drawable.b1)
                    .into(cimage)
                val dateFormatter = SimpleDateFormat("yyyy-MM-dd HH:mm:ss")
                val date = dateFormatter.parse(sdata.substart)!!
                val timeFormatter = SimpleDateFormat("h:mm a")
                val displayValue = timeFormatter.format(date)
                htitle.text = "$displayValue at ${sdata.substart.subSequence(0, 10)}"
                title.text = sdata.title
                name.text = "By ${sdata.tName} on ${sdata.subjName}"
            }
        }
    }

    private fun loadRecyclerData() {
        try {
            vModel.getDataResponse().observe(this, {
                it?.let { apiResponse ->
                    try {
                        when (apiResponse.status) {
                            Status.LOADING -> {
                                Log.d(TAG, "loadRecyclerData:Loading")
                            }
                            Status.SUCCESS -> {
                                Log.d(TAG, "loadRecyclerData:${it.data?.body()}")
                                populateData(it.data!!.body()!!)
                            }
                            Status.ERROR -> {
                                Log.d(TAG, "loadRecyclerData:Error")
                            }
                        }
                    } catch (e: Exception) {
                        e.printStackTrace()
                    }
                }
            })
        } catch (e: Exception) {
            e.printStackTrace()
        }
    }

    private fun populateData(list: List<DResponse>) {
        try {
            responseList.clear()
            sectionResponse.clear()
            responseList.addAll(list)
            val dateList = responseList.groupBy { it.substart.subSequence(0, 10) }
            val distinct = dateList.keys.distinct().toList()
            val dValues = dateList.values
            for (i in dValues.indices) {
                sectionResponse.add(
                    SectionResponse(
                        distinct,
                        dValues.elementAt(i)
                    )
                )
            }
            sadapter.notifyDataSetChanged()
        } catch (e: Exception) {
            e.printStackTrace()
        }
    }

    companion object {
        private var sectionResponse: ArrayList<SectionResponse> = ArrayList()
        private var dumpList: ArrayList<DResponse> = ArrayList()
    }

}
```

### Run

Run the project and you will get result specified in the screenshot at the start of this example.

### Reference

Find full source code below:

| No. | Link |
| --- | --- |
| 1. | [Download](https://github.com/Afsar7977/Android-Section-RecyclerView-Demo/archive/refs/heads/master.zip) Full Project |
| 2. | [Browse](https://github.com/Afsar7977/Android-Section-RecyclerView-Demo/) code |
| 3. | [Follow](https://github.com/Afsar7977) code author |

## Example 5: Android Sectioned RecyclerView with Sticky Headers

You can easily show headers in your recyclerview and have a sectioned recyclerview Headers can help you categorize your lists of data into groups. This is very important especially if you have grouped data. Say you have a list of players and their teams.

You can organize the players per team. Or say, like we did in this example, alist of galaxies. The galaxies belong to different categories like irregular, elliptical and spiral. So first we have to apply a custom sort to our list of data so that wgroup the galaxies according to category or type. We will use java.

In this class we see how to show grouped items in a recyclerview with sticky headers. We have a list of galaxy objects. These galaxy objects we will have name, description, image and category objects. We use the categories to apply a custom sort to our recyclerview list of data.

We will be using the SimpleRecyclerView library available at github.

### Screenshot

- Here's the screenshot of the project.

Android Sectioned RecyclerView example. : Project Structure.

![Android Sectioned RecyclerViewProject Structure](https://github.com/Oclemy/SQliteRushORM/raw/master/Camposha/demos/Project-Structure.PNG)

## Common Questions this example explores

- Android Sectioned Recycleview with StickyHeaders.
- Android RecyclerView with Headers.
- Android SimpleRecyclerView library.
- Android ReccylerView with images and text.
- Android custom sorting and grouping according to categories.

## Tools Used

This example was written with the following tools:

- Windows 8
- AndroidStudio IDE
- Genymotion Emulator
- Language : Java
- Topic : RecyclerView Events, Android SimpleRecyclerView

## Libaries Used

- We use Android SimpleRecyclerView library.

## Source Code

Lets jump directly to the source code.

## Build.Gradle Project Level

- Our project level build.gradle.
- We add repositories for fetching our dependencies here.
- The dafult,jccenter() is already specified.
- However, we add the maven and specify the url we'll use to fetch our third part library here.

```groovy
// Top-level build file where you can add configuration options common to all sub-projects/modules.

buildscript {
    repositories {
        jcenter()
    }
    dependencies {
        classpath 'com.android.tools.build:gradle:2.3.3'

        // NOTE: Do not place your application dependencies here; they belong
        // in the individual module build.gradle files
    }
}
//Specify maven jitpack.io as a repository.
allprojects {
    repositories {
        jcenter()
        maven { url "https://jitpack.io" }
        maven { url "https://maven.google.com" }
    }
}

task clean(type: Delete) {
    delete rootProject.buildDir
}
```

## Build.Gradle App Level

- Our app level build.gradle file.
- We specify compilesdk,minimum sdk,target sdk and dependencies.
- Note that the minimum sdk for this project isn't that strict,it is much lower than that specified below.
- We also add dependencies using 'compile' statement.
- Our activity shall derive from the appCompatActivity to make it target earlier android versions.
- We also specify design support library as well as CardView.
- Add dependencies including com.github.jaychang0917:SimpleRecyclerView.
- This is the recyclerview we will use in our project.

```groovy
// Top-level build file where you can add configuration options common to all sub-projects/modules.

buildscript {
    repositories {
        jcenter()
    }
    dependencies {
        classpath 'com.android.tools.build:gradle:2.3.3'

        // NOTE: Do not place your application dependencies here; they belong
        // in the individual module build.gradle files
    }
}
//Specify maven jitpack.io as a repository.
allprojects {
    repositories {
        jcenter()
        maven { url "https://jitpack.io" }
        maven { url "https://maven.google.com" }
    }
}

task clean(type: Delete) {
    delete rootProject.buildDir
}
```

## Category.java

- Our Category class.
- A category object
- A category has an id and name.
- We will sort our RecyclerView using this category class.

```java
package com.tutorials.hp.recyclerstickyheaders;

public class Category {
    int id;
    String name;

    public Category(int id, String name) {
        this.id = id;
        this.name = name;
    }
    public int getId() {
        return id;
    }
    public String getName() {
        return name;
    }
}
```

## Galaxy.java

- Our data object
- We pass it data via constructor.
- We retrieve its data via getters.

```java
package com.tutorials.hp.recyclerstickyheaders;

public class Galaxy {

    private String name,description;
    private int image;
    private Category category;

    public Galaxy(String name, String description, int image,Category category) {
        this.name = name;
        this.description = description;
        this.image = image;
        this.category = category;
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

    public int getCategoryId() {
        return category.getId();
    }

    public String getCategoryName() {
        return category.getName();
    }
}
```

## GalaxyCell.java

- Our galaxy cell object.
- Derives from SimpleCell.
- ViewItem layout is inflated here.
- Data is also bound to views here.
- Represents a single viewitem that will get inflated from our model layout.
- Will comprise an inner static ViewHolder class.
- Think of this class as the equivalence of our RecyclerView.Adapter class.

```java
package com.tutorials.hp.recyclerstickyheaders;

import android.content.Context;
import android.support.annotation.NonNull;
import android.view.View;
import android.view.ViewGroup;
import android.widget.ImageView;
import android.widget.TextView;

import com.jaychang.srv.SimpleCell;
import com.jaychang.srv.SimpleViewHolder;
/*
- Our galaxy cell object.
- Derives from SimpleCell
- Represents a single viewitem that will get inflated from our model layout.
 */
public class GalaxyCell extends SimpleCell<Galaxy,GalaxyCell.ViewHolder>  {

    public GalaxyCell(@NonNull Galaxy item) {
        super(item);
    }

    @Override
    protected int getLayoutRes() {
        return R.layout.model;
    }

    /*
    - Return a ViewHolder instance
     */
    @NonNull
    @Override
    protected ViewHolder onCreateViewHolder(ViewGroup parent, View cellView) {
        return new ViewHolder(cellView);
    }

    /*
    - Bind data to widgets in our viewholder.
     */
    @Override
    protected void onBindViewHolder(@NonNull ViewHolder viewHolder, int i, @NonNull Context context, Object o) {
        viewHolder.titleTxt.setText(getItem().getName());
        viewHolder.descTxt.setText(getItem().getDescription());
        viewHolder.img.setImageResource(getItem().getImage());
    }
    /**
     - Our ViewHolder class.
     - Inner static class.
     * Define your view holder, which must extend SimpleViewHolder.
     * */
    static class ViewHolder extends SimpleViewHolder {
        TextView titleTxt,descTxt;
        ImageView img;

        ViewHolder(View itemView) {
            super(itemView);
            titleTxt=itemView.findViewById(R.id.nameTxt);
            descTxt=itemView.findViewById(R.id.descTxt);
            img=itemView.findViewById(R.id.galaxyImageview);

        }
    }
}
```

## MainActivity.java

- Our MainActivity class.
- Derives from AppCompatActivity which is a Base class for activities that use the support library action bar features.
- Methods: onCreate(),addRecyclerHeaders(),bindData(),getData().
- Inflated From activity_main.xml using the setContentView() method.
- The views we use are SimpleRecyclerView.
- Reference RecyclerView from our layout specification using findViewById().
- Call addRecyclerHeaders() to add RecyclerView sticky headers.
- Call bindData() to bind data to RecyclerView.
- getData() will be our data source.
- We will also implement a custom sort using Collections.sort(), we sort our recyclerview using categories.

```java
package com.tutorials.hp.recyclerstickyheaders;

import android.support.annotation.NonNull;
import android.support.v7.app.AppCompatActivity;
import android.os.Bundle;
import android.view.LayoutInflater;
import android.view.View;
import android.widget.TextView;
import android.widget.Toast;
import com.jaychang.srv.SimpleCell;
import com.jaychang.srv.SimpleRecyclerView;
import com.jaychang.srv.decoration.SectionHeaderProvider;
import com.jaychang.srv.decoration.SimpleSectionHeaderProvider;
import java.util.ArrayList;
import java.util.Collections;
import java.util.Comparator;
import java.util.List;

public class MainActivity extends AppCompatActivity {

    SimpleRecyclerView simpleRecyclerView;

    /*
    - When activity is created.
     */
    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);

        simpleRecyclerView=findViewById(R.id.recyclerView);
        this.addRecyclerHeaders();
        this.bindData();
    }
    /*
    - Create RecyclerViewHeaders
     */
    private void addRecyclerHeaders()
    {
        SectionHeaderProvider<Galaxy> sh=new SimpleSectionHeaderProvider<Galaxy>() {
            @NonNull
            @Override
            public View getSectionHeaderView(@NonNull Galaxy Galaxy, int i) {
                View view = LayoutInflater.from(MainActivity.this).inflate(R.layout.header, null, false);
                TextView textView =  view.findViewById(R.id.headerTxt);
                textView.setText(Galaxy.getCategoryName());
                return view;
            }

            @Override
            public boolean isSameSection(@NonNull Galaxy Galaxy, @NonNull Galaxy nextGalaxy) {
                return Galaxy.getCategoryId() == nextGalaxy.getCategoryId();
            }
            // Optional, whether the header is sticky, default false
            @Override
            public boolean isSticky() {
                return true;
            }
        };
        simpleRecyclerView.setSectionHeader(sh);
    }

    /*
    - Bind data to our RecyclerView
     */
    private void bindData()
    {
        List<Galaxy> Galaxys = getData();
        //CUSTOM SORT ACCORDING TO CATEGORIES
        Collections.sort(Galaxys, new Comparator<Galaxy>(){
            public int compare(Galaxy Galaxy, Galaxy nextGalaxy) {
                return Galaxy.getCategoryId() - nextGalaxy.getCategoryId();
            }
        });
        List<GalaxyCell> cells = new ArrayList<>();

        //LOOP THROUGH GALAXIES INSTANTIATING THEIR CELLS AND ADDING TO CELLS COLLECTION
        for (Galaxy galaxy : Galaxys) {
            GalaxyCell cell = new GalaxyCell(galaxy);
            // There are two default cell listeners: OnCellClickListener<CELL, VH, T> and OnCellLongClickListener<CELL, VH, T>
            cell.setOnCellClickListener2(new SimpleCell.OnCellClickListener2<GalaxyCell, GalaxyCell.ViewHolder, Galaxy>() {
                @Override
                public void onCellClicked(GalaxyCell GalaxyCell, GalaxyCell.ViewHolder viewHolder, Galaxy item) {
                    Toast.makeText(MainActivity.this, item.getName(), Toast.LENGTH_SHORT).show();
                }
            });
            cell.setOnCellLongClickListener2(new SimpleCell.OnCellLongClickListener2<GalaxyCell, GalaxyCell.ViewHolder, Galaxy>() {
                @Override
                public void onCellLongClicked(GalaxyCell GalaxyCell, GalaxyCell.ViewHolder viewHolder, Galaxy item) {
                    Toast.makeText(MainActivity.this, item.getDescription(), Toast.LENGTH_SHORT).show();

                }
            });
            cells.add(cell);
        }
        simpleRecyclerView.addCells(cells);
    }

    /*
    - Data Source
    - Returns an arraylist of galaxies.
     */
    private ArrayList<Galaxy> getData()
    {
        ArrayList<Galaxy> galaxies=new ArrayList<>();

        //CREATE CATEGORIES
        Category elliptical=new Category(0,"Elliptical");
        Category irregular=new Category(1,"Irregular");
        Category spiral=new Category(2,"Spiral");

        //INSTANTIATE GALAXY OBJECTS AND ADD THEM TO GALAXY LIST
        Galaxy g=new Galaxy("Whirlpool",
                "The Whirlpool Galaxy, also known as Messier 51a, M51a, and NGC 5194, is an interacting grand-design spiral Galaxy with a Seyfert 2 active galactic nucleus in the constellation Canes Venatici.",
                R.drawable.whirlpool,spiral);
        galaxies.add(g);

        g=new Galaxy("Ring Nebular",
                "The Ring Nebula is a planetary nebula in the northern constellation of Lyra. Such objects are formed when a shell of ionized gas is expelled into the surrounding interstellar medium by a red giant star.",
                R.drawable.ringnebular,elliptical);
        galaxies.add(g);

        g=new Galaxy("IC 1011",
                "C 1011 is a compact elliptical galaxy with apparent magnitude of 14.7, and with a redshift of z=0.02564 or 0.025703, yielding a distance of 100 to 120 Megaparsecs. Its light has taken 349.5 million years to travel to Earth.",
                R.drawable.ic1011,elliptical);
        galaxies.add(g);

        g=new Galaxy("Cartwheel",
                "The Cartwheel Galaxy is a lenticular galaxy and ring galaxy about 500 million light-years away in the constellation Sculptor. It is an estimated 150,000 light-years diameter, and a mass of about 2.9–4.8 × 10⁹ solar masses; it rotates at 217 km/s.",
                R.drawable.cartwheel,irregular);
        galaxies.add(g);

        g=new Galaxy("Triangulumn",
                "The Triangulum Galaxy is a spiral Galaxy approximately 3 million light-years from Earth in the constellation Triangulum",
                R.drawable.triangulum,spiral);
        galaxies.add(g);

        g=new Galaxy("Small Magellonic Cloud",
                "The Small Magellanic Cloud, or Nubecula Minor, is a dwarf galaxy near the Milky Way. It is classified as a dwarf irregular galaxy.",
                R.drawable.smallamgellonic,irregular);
        galaxies.add(g);

        g=new Galaxy("Centaurus A",
                " Centaurus A or NGC 5128 is a galaxy in the constellation of Centaurus. It was discovered in 1826 by Scottish astronomer James Dunlop from his home in Parramatta, in New South Wales, Australia.",
                R.drawable.centaurusa,elliptical);
        galaxies.add(g);

        g=new Galaxy("Ursa Minor",
                "The Milky Way is the Galaxy that contains our Solar System." +
                        " The descriptive milky is derived from the appearance from Earth of the Galaxy – a band of light seen in the night sky formed from stars",
                R.drawable.ursaminor,irregular);
        galaxies.add(g);

        g=new Galaxy("Large Magellonic Cloud",
                " The Large Magellanic Cloud is a satellite galaxy of the Milky Way. At a distance of 50 kiloparsecs, the LMC is the third-closest galaxy to the Milky Way, after the Sagittarius Dwarf Spheroidal and the.",
                R.drawable.largemagellonic,irregular);
        galaxies.add(g);

        g=new Galaxy("Milky Way",
                "The Milky Way is the Galaxy that contains our Solar System." +
                        " The descriptive milky is derived from the appearance from Earth of the Galaxy – a band of light seen in the night sky formed from stars",
                R.drawable.milkyway,spiral);
        galaxies.add(g);

        g=new Galaxy("Andromeda",
                "The Andromeda Galaxy, also known as Messier 31, M31, or NGC 224, is a spiral Galaxy approximately 780 kiloparsecs from Earth. It is the nearest major Galaxy to the Milky Way and was often referred to as the Great Andromeda Nebula in older texts.",
                R.drawable.andromeda,irregular);
        galaxies.add(g);

        g=new Galaxy("Messier 81",
                "Messier 81 is a spiral Galaxy about 12 million light-years away in the constellation Ursa Major. Due to its proximity to Earth, large size and active galactic nucleus, Messier 81 has been studied extensively by professional astronomers.",
                R.drawable.messier81,elliptical);
        galaxies.add(g);

        g=new Galaxy("Own Nebular",
                " The Owl Nebula is a planetary nebula located approximately 2,030 light years away in the constellation Ursa Major. It was discovered by French astronomer Pierre Méchain on February 16, 1781",
                R.drawable.ownnebular,elliptical);
        galaxies.add(g);

        g=new Galaxy("Messier 87",
                "Messier 87 is a supergiant elliptical galaxy in the constellation Virgo. One of the most massive galaxies in the local universe, it is notable for its large population of globular clusters—M87 contains",
                R.drawable.messier87,elliptical);
        galaxies.add(g);

        g=new Galaxy("Cosmos Redshift",
                "Cosmos Redshift 7 is a high-redshift Lyman-alpha emitter Galaxy, in the constellation Sextans, about 12.9 billion light travel distance years from Earth, reported to contain the first stars —formed ",
                R.drawable.cosmosredshift,irregular);
        galaxies.add(g);

        g=new Galaxy("StarBust",
                "A starburst Galaxy is a Galaxy undergoing an exceptionally high rate of star formation, as compared to the long-term average rate of star formation in the Galaxy or the star formation rate observed in most other galaxies. ",
                R.drawable.starbust,irregular);
        galaxies.add(g);

        g=new Galaxy("Sombrero",
                "Sombrero Galaxy is an unbarred spiral galaxy in the constellation Virgo located 31 million light-years from Earth. The galaxy has a diameter of approximately 50,000 light-years, 30% the size of the Milky Way.",
                R.drawable.sombrero,spiral);
        galaxies.add(g);

        g=new Galaxy("Pinwheel",
                "The Pinwheel Galaxy is a face-on spiral galaxy distanced 21 million light-years away from earth in the constellation Ursa Major. ",
                R.drawable.pinwheel,spiral);
        galaxies.add(g);

        g=new Galaxy("Canis Majos Overdensity",
                "The Canis Major Dwarf Galaxy or Canis Major Overdensity is a disputed dwarf irregular galaxy in the Local Group, located in the same part of the sky as the constellation Canis Major. ",
                R.drawable.canismajoroverdensity,irregular);
        galaxies.add(g);

        g=new Galaxy("Virgo Stella Stream",
                " Group, located in the same part of the sky as the constellation Canis Major. ",
                R.drawable.virgostellarstream,spiral);
        galaxies.add(g);

        return galaxies;
    }

}
```

## ActivityMain.xml

- Our activitymain.xml.
- Contains a SimpleRecyclerView.
- Will get inflated to MainActivity.

```xml
<?xml version="1.0" encoding="utf-8"?>
<android.support.constraint.ConstraintLayout

    android_layout_width="match_parent"
    android_layout_height="match_parent"
    tools_context="com.tutorials.hp.recyclerstickyheaders.MainActivity">
    <com.jaychang.srv.SimpleRecyclerView
        android_id="@+id/recyclerView"
        android_layout_width="match_parent"
        android_layout_height="match_parent"
        app_srv_layoutMode="linearVertical"
        app_srv_showDivider="true"
        app_srv_showLastDivider="true"
        app_srv_dividerOrientation="both"
        app_srv_dividerColor="@color/colorAccent"
        app_srv_dividerPaddingLeft="5dp"
        app_srv_dividerPaddingRight="5dp"
        app_srv_dividerPaddingTop="5dp"
        app_srv_dividerPaddingBottom="5dp" />

</android.support.constraint.ConstraintLayout>
```

## header.xml

- Our header.xml file.
- Defines the layout specification for our RecyclerView headers.

```xml
<?xml version="1.0" encoding="utf-8"?>
<LinearLayout
    android_orientation="vertical" android_layout_width="match_parent"
  android_background="#009968"
    android_layout_height="match_parent">
        <TextView
            android_layout_width="wrap_content"
            android_layout_height="wrap_content"
            android_textAppearance="?android:attr/textAppearanceLarge"
            android_textSize="30dp"
            android_textStyle="bold|italic"
            android_text="Header"
            android_id="@+id/headerTxt"
            android_gravity="center"
            android_padding="10dp"
            android_layout_gravity="center"
            android_layout_alignParentTop="true"/>
</LinearLayout>
```

## Model.xml

- As the name suggests, this layout models our viewitem.
- We define how each Card shall appear in our List.
- So at the root level we have a CardView widget.
- We can also customize our CardView by specifying cardCornerRadius,cardElevation,width,height etc.
- Each Card shall comprise textviews and images.

```xml
<?xml version="1.0" encoding="utf-8"?>
<android.support.v7.widget.CardView
    android_orientation="horizontal" android_layout_width="match_parent"

    android_layout_margin="5dp"
    card_view_cardCornerRadius="15dp"
    card_view_cardElevation="10dp"
    android_layout_height="200dp">

    <LinearLayout
       android_orientation="vertical"
        android_layout_width="match_parent"
        android_layout_height="match_parent">

        <TextView
            android_layout_width="wrap_content"
            android_layout_height="wrap_content"
            android_textAppearance="?android:attr/textAppearanceLarge"
            android_text="Galaxy"
            android_id="@+id/nameTxt"
            android_padding="10dp"
      android_textColor="@color/abc_btn_colored_borderless_text_material"
            android_layout_alignParentTop="true"/>
        <LinearLayout
            android_orientation="horizontal"
            android_layout_width="match_parent"
            android_layout_height="wrap_content">
            <ImageView
                android_id="@+id/galaxyImageview"
                android_layout_width="wrap_content"
                android_layout_height="wrap_content"
                android_layout_alignParentLeft="true"
                android_layout_alignParentTop="true"
                android_layout_marginLeft="24dp"
                android_src="@drawable/andromeda" />
            <TextView
                android_layout_width="wrap_content"
                android_layout_height="wrap_content"
                android_textAppearance="?android:attr/textAppearanceLarge"
                android_text="Description"
                android_id="@+id/descTxt"
                android_padding="10dp"/>
        </LinearLayout>

    </LinearLayout>
</android.support.v7.widget.CardView>
```

## Video/Preview

- We have a [YouTube channel](https://www.youtube.com/c/ProgrammingWizards) with almost a thousand tutorials, this one below being one of them.

[https://youtu.be/u3yBxm4xOPQ](https://youtu.be/u3yBxm4xOPQ)

## Download

- You can Download the full Project below. Source code is well commented.

[Download](https://github.com/Oclemy/RecyclerStickyHeaders/archive/master.zip)

## How To Run

1. Download the project above.
2. You'll get a zipped file,extract it.
3. Open the Android Studio.
4. Now close, already open project.
5. From the Menu bar click on File >New> Import Project.
6. Now Choose a Destination Folder, from where you want to import project.
7. Choose an Android Project.
8. Now Click on “OK“.
9. Done, your done importing the project,now edit it. ]([https://web.facebook.com/oclemmy/](https://web.facebook.com/oclemmy/)).
