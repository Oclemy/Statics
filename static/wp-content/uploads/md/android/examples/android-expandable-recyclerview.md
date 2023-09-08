# Expandable RecyclerView Examples


In this tutorial we will look at several options of achieving an expandablerecyclerview. We know that there is a standard ExpandableListView in android sdk. However due to the nature of a recyclerview being more of a framework than a concrete widget, we have to implement our own logic to achieve an ExpandableRecyclerView.


In this article you will learn:

1. How to create a custom expandable recyclerview - WITHOUT or WITH a library

We use the following languages:

1. Kotlin
2. Java

> NB/= This article is broken down into several pages. Each page teaches a unique concept. Here are the taught concepts: [Page 1](https://camposha.info/android-examples/android-expandable-recyclerview/): Implement a custom Expandable Reyclerview without a third party library. [Page 2](https://camposha.info/android-examples/android-expandable-recyclerview/2/): Implement an expandable recyclerview using RecyclerView and Expandable layouts.


# Concept 1: Expandable RecyclerViews WITHOUT third-party libraries

In the first page or section you will learn how to implement an expandable recyclerview without any third party library.

## Example 1: Sectioned Expandable Grid RecyclerView example

In this example you will learn how to create a sectioned expandable recyclerview grid. This is perfect as a template to use if you want to categorize or group items in your recyclerview.

The section headers are expandable/collapsible and can thus reveal and hide the child items. This example is written in Java.

**Demo**

Here is the demo:

![Android Sectioned Expandable Grid recylerview example](https://github.com/bpncool/SectionedExpandableGridRecyclerView/raw/master/segrv.gif)

### Step 1: Add RecyclerView

We are not using any third party library to achieve this. However you need to add recyclerview as well as cardview in your dependencies closure.

### Step 2: Create Layouts

We will need these layouts in our project:

1. Item layout.
2. Expandable Header layout.
3. Main Activity layout.

Please feel free touse androidx cardviews and recyclerviews.

**(a). layout_item.xml**

Add a cardview and textview. Feel free to use androidx cardview.

```xml
<?xml version="1.0" encoding="utf-8"?>
<android.support.v7.widget.CardView
    xmlns:android="http://schemas.android.com/apk/res/android"
    android:orientation="vertical"
    xmlns:app="http://schemas.android.com/apk/res-auto"
    app:elevation="5dp"
    android:layout_margin="@dimen/item_margin"
    android:layout_width="wrap_content"
    android:layout_height="@dimen/item_height">

    <TextView
        android:layout_width="wrap_content"
        android:layout_height="match_parent"
        android:id="@+id/text_item"
        android:gravity="center"
        android:layout_gravity="center" />

</android.support.v7.widget.CardView>
```

**(b). layout_header.xml**

This layout will represent a single header. Add a textview to render title and also a togglebutton to be used to toggle expandable state.

```xml
<?xml version="1.0" encoding="utf-8"?>
<android.support.v7.widget.CardView
    xmlns:android="http://schemas.android.com/apk/res/android"
    xmlns:app="http://schemas.android.com/apk/res-auto"
    android:layout_width="match_parent"
    app:elevation="5dp"
    android:layout_marginTop="7dp"
    android:layout_height="wrap_content">

   <LinearLayout
       android:layout_width="match_parent"
       android:layout_height="wrap_content"
       android:background="#26A69A"
       android:orientation="horizontal">

       <TextView
           android:layout_width="match_parent"
           android:layout_height="wrap_content"
           android:paddingTop="@dimen/section_padding"
           android:paddingBottom="@dimen/section_padding"
           android:paddingStart="@dimen/section_text_padding_left"
           android:background="@drawable/theme_color"
           android:textColor="@color/default_text_color"
           android:textSize="@dimen/section_text_size"
           android:id="@+id/text_section"
           android:layout_weight="0.12"/>

       <ToggleButton
           android:layout_width="match_parent"
           android:layout_height="match_parent"
           android:id="@+id/toggle_button_section"
           android:contentDescription="@string/image_button_content_description"
           android:background="@drawable/selector_section_toggle"
           android:padding="@dimen/section_padding"
           android:textOn=""
           android:textOff=""
           android:layout_weight="0.88"/>

   </LinearLayout>

</android.support.v7.widget.CardView>
```

**(c). activity_main.xml**

This is the main activity layout:

```xml
<RelativeLayout xmlns:android="http://schemas.android.com/apk/res/android"
    xmlns:tools="http://schemas.android.com/tools" android:layout_width="match_parent"
    android:layout_height="match_parent" android:paddingLeft="@dimen/activity_horizontal_margin"
    android:paddingRight="@dimen/activity_horizontal_margin"
    android:paddingTop="@dimen/activity_vertical_margin"
    android:background="#E0F2F1"
    android:paddingBottom="@dimen/activity_vertical_margin" tools:context=".MainActivity">

    <android.support.v7.widget.RecyclerView
        android:layout_width="match_parent"
        android:layout_height="match_parent"
        android:id="@+id/recycler_view"/>

</RelativeLayout>
```

### Step 3: Create Model Classes

Start by creating model classes:

**(a). Item.java**

This is the data object for a single item:

```java
public class Item {

    private final String name;
    private final int id;

    public Item(String name, int id) {
        this.name = name;
        this.id = id;
    }

    public int getId() {
        return id;
    }

    public String getName() {
        return name;
    }
}
```

**(a). Section.java**

This modelclass will represe a single section in our recyclerview:

```java
public class Section {

    private final String name;

    public boolean isExpanded;

    public Section(String name) {
        this.name = name;
        isExpanded = true;
    }

    public String getName() {
        return name;
    }
}
```

### Step 4: Create Event Listeners

Create the following listeners as interfaces:

**(a). ItemClickListener.java**

This interface will define two event handlers as abstract methods: `itemClicked()` for both our item and section:

```java
public interface ItemClickListener {
    void itemClicked(Item item);
    void itemClicked(Section section);
}
```

**(b). SectionStateChangeListener.java**

These are the state change event handlers for our expandable recycerlview:

```java
public interface SectionStateChangeListener {
    void onSectionStateChanged(Section section, boolean isOpen);
}
```

### Step 5: Create Adapters and Helpers

**(a). SectionedExpandableGridAdapter.java**

Create our expandable grid adapter:

```java
public class SectionedExpandableGridAdapter extends RecyclerView.Adapter<SectionedExpandableGridAdapter.ViewHolder> {

    //data array
    private ArrayList<Object> mDataArrayList;

    //context
    private final Context mContext;

    //listeners
    private final ItemClickListener mItemClickListener;
    private final SectionStateChangeListener mSectionStateChangeListener;

    //view type
    private static final int VIEW_TYPE_SECTION = R.layout.layout_section;
    private static final int VIEW_TYPE_ITEM = R.layout.layout_item; //TODO : change this

    public SectionedExpandableGridAdapter(Context context, ArrayList<Object> dataArrayList,
                                          final GridLayoutManager gridLayoutManager, ItemClickListener itemClickListener,
                                          SectionStateChangeListener sectionStateChangeListener) {
        mContext = context;
        mItemClickListener = itemClickListener;
        mSectionStateChangeListener = sectionStateChangeListener;
        mDataArrayList = dataArrayList;

        gridLayoutManager.setSpanSizeLookup(new GridLayoutManager.SpanSizeLookup() {
            @Override
            public int getSpanSize(int position) {
                return isSection(position)?gridLayoutManager.getSpanCount():1;
            }
        });
    }

    private boolean isSection(int position) {
        return mDataArrayList.get(position) instanceof Section;
    }

    @Override
    public ViewHolder onCreateViewHolder(ViewGroup parent, int viewType) {
        return new ViewHolder(LayoutInflater.from(mContext).inflate(viewType, parent, false), viewType);
    }

    @Override
    public void onBindViewHolder(ViewHolder holder, int position) {
        switch (holder.viewType) {
            case VIEW_TYPE_ITEM :
                final Item item = (Item) mDataArrayList.get(position);
                holder.itemTextView.setText(item.getName());
                holder.view.setOnClickListener(new View.OnClickListener() {
                    @Override
                    public void onClick(View v) {
                        mItemClickListener.itemClicked(item);
                    }
                });
                break;
            case VIEW_TYPE_SECTION :
                final Section section = (Section) mDataArrayList.get(position);
                holder.sectionTextView.setText(section.getName());
                holder.sectionTextView.setOnClickListener(new View.OnClickListener() {
                    @Override
                    public void onClick(View v) {
                        mItemClickListener.itemClicked(section);
                    }
                });
                holder.sectionToggleButton.setChecked(section.isExpanded);
                holder.sectionToggleButton.setOnCheckedChangeListener(new CompoundButton.OnCheckedChangeListener() {
                    @Override
                    public void onCheckedChanged(CompoundButton buttonView, boolean isChecked) {
                        mSectionStateChangeListener.onSectionStateChanged(section, isChecked);
                    }
                });
                break;
        }
    }

    @Override
    public int getItemCount() {
        return mDataArrayList.size();
    }

    @Override
    public int getItemViewType(int position) {
        if (isSection(position))
            return VIEW_TYPE_SECTION;
        else return VIEW_TYPE_ITEM;
    }

    protected static class ViewHolder extends RecyclerView.ViewHolder {

        //common
        View view;
        int viewType;

        //for section
        TextView sectionTextView;
        ToggleButton sectionToggleButton;

        //for item
        TextView itemTextView;

        public ViewHolder(View view, int viewType) {
            super(view);
            this.viewType = viewType;
            this.view = view;
            if (viewType == VIEW_TYPE_ITEM) {
                itemTextView = (TextView) view.findViewById(R.id.text_item);
            } else {
                sectionTextView = (TextView) view.findViewById(R.id.text_section);
                sectionToggleButton = (ToggleButton) view.findViewById(R.id.toggle_button_section);
            }
        }
    }
}
```

**(b). .java**

Create our layout helper which will be used to add data to the recyclerview:

```java
public class SectionedExpandableLayoutHelper implements SectionStateChangeListener {

    //data list
    private LinkedHashMap<Section, ArrayList<Item>> mSectionDataMap = new LinkedHashMap<Section, ArrayList<Item>>();
    private ArrayList<Object> mDataArrayList = new ArrayList<Object>();

    //section map
    //TODO : look for a way to avoid this
    private HashMap<String, Section> mSectionMap = new HashMap<String, Section>();

    //adapter
    private SectionedExpandableGridAdapter mSectionedExpandableGridAdapter;

    //recycler view
    RecyclerView mRecyclerView;

    public SectionedExpandableLayoutHelper(Context context, RecyclerView recyclerView, ItemClickListener itemClickListener,
                                           int gridSpanCount) {

        //setting the recycler view
        GridLayoutManager gridLayoutManager = new GridLayoutManager(context, gridSpanCount);
        recyclerView.setLayoutManager(gridLayoutManager);
        mSectionedExpandableGridAdapter = new SectionedExpandableGridAdapter(context, mDataArrayList,
                gridLayoutManager, itemClickListener, this);
        recyclerView.setAdapter(mSectionedExpandableGridAdapter);

        mRecyclerView = recyclerView;
    }

    public void notifyDataSetChanged() {
        //TODO : handle this condition such that these functions won't be called if the recycler view is on scroll
        generateDataList();
        mSectionedExpandableGridAdapter.notifyDataSetChanged();
    }

    public void addSection(String section, ArrayList<Item> items) {
        Section newSection;
        mSectionMap.put(section, (newSection = new Section(section)));
        mSectionDataMap.put(newSection, items);
    }

    public void addItem(String section, Item item) {
        mSectionDataMap.get(mSectionMap.get(section)).add(item);
    }

    public void removeItem(String section, Item item) {
        mSectionDataMap.get(mSectionMap.get(section)).remove(item);
    }

    public void removeSection(String section) {
        mSectionDataMap.remove(mSectionMap.get(section));
        mSectionMap.remove(section);
    }

    private void generateDataList () {
        mDataArrayList.clear();
        for (Map.Entry<Section, ArrayList<Item>> entry : mSectionDataMap.entrySet()) {
            Section key;
            mDataArrayList.add((key = entry.getKey()));
            if (key.isExpanded)
                mDataArrayList.addAll(entry.getValue());
        }
    }

    @Override
    public void onSectionStateChanged(Section section, boolean isOpen) {
        if (!mRecyclerView.isComputingLayout()) {
            section.isExpanded = isOpen;
            notifyDataSetChanged();
        }
    }
}
```

### Run

Lastly run the project and you will get a result similar to the one shown in the screenshot above.

### Reference

Find the full code below.

| No. | Link |
| --- | --- |
| 1. | [Download](https://github.com/bpncool/SectionedExpandableGridRecyclerView/archive/refs/heads/master.zip) code |
| 2. | [Browse](https://github.com/bpncool/SectionedExpandableGridRecyclerView/) code |
| 3. | [Follow Code Author](https://github.com/bpncool) |

## Example 2: Kotlin Android ExpandableRecyclerView

This second example is a written in Kotlin. This is also a much simpler one since we do have sections, just expandable items.

Here is the screenshot of what we will create:

![ Kotlin Android ExpandableRecyclerView Example](https://github.com/lcdsmao/ExpandableRecyclerViewDemo/raw/master/screenshot.gif)

### Step 1: Create Project

Start by creating an empty `Android Studio` project.

### Step 2: Dependencies

We will be using butterknife to reference views. This is OPTIONAL.

```kotlin
    implementation 'com.jakewharton:butterknife:8.8.1'
    annotationProcessor 'com.jakewharton:butterknife-compiler:8.8.1'
```

### Step 3: Design Layouts

Design two layouts:

**(a).list_item.xml**

This will represent a single item in the recyclerview. It encompases both header and content.

```xml
<?xml version="1.0" encoding="utf-8"?>
<LinearLayout
    xmlns:android="http://schemas.android.com/apk/res/android"
    xmlns:tools="http://schemas.android.com/tools"
    android:layout_width="match_parent"
    android:layout_height="wrap_content"
    android:orientation="vertical"
    android:stateListAnimator="@animator/translate_z"
    android:background="@android:color/white">

    <TextView
        android:id="@+id/headerView"
        android:layout_width="match_parent"
        android:layout_height="wrap_content"
        android:paddingStart="16dp"
        android:paddingEnd="16dp"
        android:paddingTop="16dp"
        android:paddingBottom="16dp"
        android:textAppearance="@style/TextAppearance.AppCompat.Title"
        tools:text="Header"/>

    <TextView
        android:id="@+id/contentView"
        android:layout_width="match_parent"
        android:layout_height="wrap_content"
        android:paddingStart="16dp"
        android:paddingEnd="16dp"
        android:paddingBottom="16dp"
        android:textAppearance="@style/TextAppearance.AppCompat.Medium"
        tools:text="Content" />

</LinearLayout>
```

**(b).activity_main.xml**

In this layout we will have a recyclerview:

```xml
<?xml version="1.0" encoding="utf-8"?>
<FrameLayout xmlns:android="http://schemas.android.com/apk/res/android"
    xmlns:tools="http://schemas.android.com/tools"
    android:layout_width="match_parent"
    android:layout_height="match_parent"
    tools:context="com.paranoid.mao.expandablerecyclerviewdemo.MainActivity">

    <android.support.v7.widget.RecyclerView
        android:id="@+id/expandableRecycleView"
        android:layout_width="match_parent"
        android:layout_height="match_parent" />

</FrameLayout>
```

### Step 4: Create Model class

We create our data class:

**DummyData.kt**

```kotlin
data class DummyData(val header: String, val content: String)
```

### Step 5: Create a custom Animator

Extend the DefaultAnimator and override the `animateMove()` to create a DefaultAnimator:

```kotlin
class Animator(): DefaultItemAnimator() {
    // Invalid recycler view moves items which causes flash when expanding or collapsing
    override fun animateMove(holder: RecyclerView.ViewHolder?, fromX: Int, fromY: Int, toX: Int, toY: Int): Boolean {
        return false
    }
}
```

### Step 6: Create an Expandable Adapter

Create an Expandable Adapter class:

**ExpandableAdapter.kt**

```kotlin
class ExpandableAdapter(private var dataList: List<DummyData>, private val parent: RecyclerView): RecyclerView.Adapter<ExpandableAdapter.ViewHolder>() {

    companion object {
        const val EXPAND_COLLAPSE = "EXPAND_COLLAPSE"
    }

    private var expandedPosition = RecyclerView.NO_POSITION
    private val transition = AutoTransition().apply { duration = 100 }

    override fun onCreateViewHolder(parent: ViewGroup, viewType: Int): ViewHolder {
        return ViewHolder(LayoutInflater.from(parent.context).inflate(R.layout.list_item, parent, false))
    }

    override fun onBindViewHolder(holder: ViewHolder, position: Int, payloads: MutableList<Any>?) {
        if (payloads?.contains(EXPAND_COLLAPSE) == true) {
            setExpanded(holder, expandedPosition == position)
        } else {
            onBindViewHolder(holder, position)
        }
    }

    override fun onBindViewHolder(holder: ViewHolder, position: Int) {
        holder.apply {
            bind(dataList[position])
            itemView.setOnClickListener {
                TransitionManager.beginDelayedTransition(parent, transition)
                // collapse currently expanded items
                if (RecyclerView.NO_POSITION != expandedPosition) {
                    notifyItemChanged(expandedPosition, EXPAND_COLLAPSE)
                }

                // expand this item
                if (expandedPosition != adapterPosition) {
                    expandedPosition = adapterPosition
                    notifyItemChanged(adapterPosition, EXPAND_COLLAPSE)
                } else {
                    expandedPosition = RecyclerView.NO_POSITION
                }
            }
            setExpanded(this, expandedPosition == position)
        }
    }

    private fun setExpanded(holder: ViewHolder, isExpanded: Boolean) {
        val visibility = if (isExpanded) View.VISIBLE else View.GONE
        holder.itemView.apply {
            isActivated = isExpanded
            contentView.visibility = visibility
        }
    }

    override fun getItemCount(): Int = dataList.size

    inner class ViewHolder(itemView: View): RecyclerView.ViewHolder(itemView) {
        fun bind(data: DummyData) = with(itemView) {
            headerView.text = data.header
            contentView.text = data.content
        }
    }
}
```

### Step 7: Create MainActivity

Finally create your MainActivity as follows:

**MainActivity.kt**

```kotlin
class MainActivity : AppCompatActivity() {

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_main)

        val dataList = List(26, { i ->
            DummyData("Header ${'A' + i}", "Content ${i + 1}")
        })

        expandableRecycleView.apply {
            val manager = LinearLayoutManager(this@MainActivity)
            layoutManager = manager
            adapter = ExpandableAdapter(dataList, this)
            itemAnimator = Animator()
            addItemDecoration(DividerItemDecoration(this@MainActivity, manager.orientation))
        }

    }
}
```

### Run

Copy the code or download it in the link below, build and run.

### Reference

Here are the reference links:

| Number | Link |
| --- | --- |
| 1. | [Download](https://github.com/lcdsmao/ExpandableRecyclerViewDemo/archive/refs/heads/master.zip) Example |
| 2. | [Follow](https://github.com/lcdsmao/) code author |

# Concpet 2: ExpandableRecyclerViews with ExpandableLayouts

Proceed to next page to learn RecyclerView + Expandable layouts to create an expandable recyclerview.

# Concpet 2: ExpandableRecyclerViews with ExpandableLayouts


> This page involves creating expandable recyclerviews using expandable layouts.

## Example 1: Android Expandable ReyclerView with Expandable panels

> How to create an expandbale recyclerview using the Expandable Panels plus RecyclerView.

Here is the demo of what is created:

![Kotlin Android Expandable ReyclerView with Expandable panels](https://github.com/robertlevonyan/material-expansion-panel/raw/master/Images/process.gif)

### Step 1: Create Project

Start by creating an empty Kotlin `Android Studio` project.

### Step 2: Dependencies

In your project-level build.gradle register MavenCentral as a repository;

```groovy
  repositories {
    mavenCentral()
  }
```

Then in your app-level build.gradle declare the dependency:

```groovy
    implementation 'com.robertlevonyan.view:MaterialExpansionPanel:2.1.4'
```

### Step 3: Learn How to Use it

Here are some code snippets to help you learn how to use the expandable panel:

First you would need to add it your xml layout:

```xml
<com.robertlevonyan.views.expandable.Expandable
        android:id="@+id/expandable"
        android:layout_width="match_parent"
        android:layout_height="wrap_content">

        <include
            android:id="@+id/header"
            layout="@layout/header_view" />

        <include
            android:id="@+id/content"
            layout="@layout/content_view" />
</com.robertlevonyan.views.expandable.Expandable>
```

Here are two expandable panels in collapsed and expanded states:

![alt text](https://github.com/robertlevonyan/material-expansion-panel/raw/master/Images/collapsed.jpg)

![alt text](https://github.com/robertlevonyan/material-expansion-panel/raw/master/Images/expanded.jpg)

Then reference it:

```kotlin
    val expandable = findViewById(R.id.expandable);
```

Then expand:

```kotlin
    expandable.expand()
```

With listeners:

```kotlin
    expandable.doOnExpand {
        //some stuff on expand
    }

    expandable.doOnCollapse {
        //some stuff on collapse
    }
```

You can customize it:

```kotlin
    expandable.icon = myIconDrawable // Icon for Expandable Header
    expandable.iconStyle = ExpandableIconStyles.SQUARE // Set style for header icon: square, circle or roundedSquare
    expandable.animateExpand = true // Animate layout expanding
    expandable.backgroundColor = myBackgroundColor // Set a custom background color for layout
    expandable.expandIndicator = myExpandDrawable // Select custom drawable for expand indicator
```

Let us now proceed with our full example.

### Step 4: Design Layouts

In this case we will design 4 layouts:

**(a). header_view.xml**

```xml
<?xml version="1.0" encoding="utf-8"?>
<LinearLayout xmlns:android="http://schemas.android.com/apk/res/android"
    android:id="@+id/header"
    android:layout_width="match_parent"
    android:layout_height="match_parent"
    android:orientation="vertical"
    android:padding="10dp">

    <TextView
        android:id="@+id/header_text"
        android:layout_width="wrap_content"
        android:layout_height="wrap_content"
        android:layout_gravity="center"
        android:gravity="center"
        android:textColor="@color/colorDark"
        android:textSize="16sp"
        android:textStyle="bold" />

    <TextView
        android:id="@+id/header_subtext"
        android:layout_width="wrap_content"
        android:layout_height="wrap_content"
        android:layout_gravity="center"
        android:alpha="0.7"
        android:gravity="center"
        android:textColor="@color/colorDark"
        android:textSize="12sp" />
</LinearLayout>
```

**(b). content_view.xml**

```xml
<?xml version="1.0" encoding="utf-8"?>
<FrameLayout xmlns:android="http://schemas.android.com/apk/res/android"
    android:id="@+id/content"
    android:layout_width="match_parent"
    android:layout_height="wrap_content"
    android:padding="10dp">

    <TextView
        android:id="@+id/content_text"
        android:layout_width="match_parent"
        android:textColor="@color/colorPrimaryDark"
        android:layout_height="wrap_content" />

</FrameLayout>
```

**(c). item_expandable.xml**

```xml
<?xml version="1.0" encoding="utf-8"?>
<androidx.cardview.widget.CardView xmlns:android="http://schemas.android.com/apk/res/android"
    xmlns:app="http://schemas.android.com/apk/res-auto"
    android:layout_width="match_parent"
    android:layout_height="wrap_content"
    android:layout_marginStart="8dp"
    android:layout_marginTop="4dp"
    android:layout_marginEnd="8dp"
    android:layout_marginBottom="4dp"
    app:cardCornerRadius="8dp"
    app:cardElevation="0dp">

    <com.robertlevonyan.views.expandable.Expandable
        android:id="@+id/expandable"
        android:layout_width="match_parent"
        android:layout_height="wrap_content"
        app:exp_expandIndicator="@drawable/ic_down">

        <include
            android:id="@+id/header"
            layout="@layout/header_view" />

        <include
            android:id="@+id/content"
            layout="@layout/content_view" />
    </com.robertlevonyan.views.expandable.Expandable>
</androidx.cardview.widget.CardView>
```

**(d). activity_main.xml**

```xml
<?xml version="1.0" encoding="utf-8"?>
<androidx.constraintlayout.widget.ConstraintLayout xmlns:android="http://schemas.android.com/apk/res/android"
    xmlns:app="http://schemas.android.com/apk/res-auto"
    xmlns:tools="http://schemas.android.com/tools"
    android:layout_width="match_parent"
    android:layout_height="match_parent"
    tools:context="com.robertlevonyan.views.expandablesample.MainActivity">

    <TextView
        android:id="@+id/title"
        android:layout_width="wrap_content"
        android:layout_height="wrap_content"
        android:layout_margin="16dp"
        android:text="@string/app_name"
        android:textColor="@color/colorDark"
        android:textSize="28sp"
        android:textStyle="bold"
        app:layout_constraintStart_toStartOf="parent"
        app:layout_constraintTop_toTopOf="parent" />

    <com.robertlevonyan.views.expandable.Expandable
        android:id="@+id/expandable"
        android:layout_width="0dp"
        android:layout_height="wrap_content"
        android:visibility="gone"
        app:exp_animateExpand="true"
        app:layout_constraintEnd_toEndOf="parent"
        app:layout_constraintStart_toStartOf="parent"
        app:layout_constraintTop_toTopOf="parent">

        <include
            android:id="@+id/header"
            layout="@layout/header_view" />

        <include
            android:id="@+id/content"
            layout="@layout/content_view" />
    </com.robertlevonyan.views.expandable.Expandable>

    <androidx.recyclerview.widget.RecyclerView
        android:id="@+id/list"
        android:layout_width="0dp"
        android:layout_height="0dp"
        android:clipToPadding="false"
        android:paddingTop="16dp"
        app:layout_constraintBottom_toBottomOf="parent"
        app:layout_constraintEnd_toEndOf="parent"
        app:layout_constraintStart_toStartOf="parent"
        app:layout_constraintTop_toBottomOf="@id/title" />
</androidx.constraintlayout.widget.ConstraintLayout>
```

### Step 5: Create Model

Now create a model class;

**ExpandableModel.java**

```java

public class ExpandableModel {

    private String headerText;
    private String headerSubText;
    private String contentText;

    public ExpandableModel() {
    }

    public ExpandableModel(String headerText, String contentText) {
        this.headerText = headerText;
        this.contentText = contentText;
    }

    public String getHeaderText() {
        return headerText;
    }

    public void setHeaderText(String headerText) {
        this.headerText = headerText;
    }

    public String getHeaderSubText() {
        return headerSubText;
    }

    public void setHeaderSubText(String headerSubText) {
        this.headerSubText = headerSubText;
    }

    public String getContentText() {
        return contentText;
    }

    public void setContentText(String contentText) {
        this.contentText = contentText;
    }

    @Override
    public String toString() {
        return "ExpandableModel{" +
                "headerText='" + headerText + '\'' +
                ", headerSubText='" + headerSubText + '\'' +
                ", contentText='" + contentText + '\'' +
                '}';
    }
}
```

### Step 6: Create ViewHolder and Adapter

You now need to create an Expandable ViewHolder as well as our ExpandableAdapter:

**(a). ExpandableViewHolder.java**

```java
public class ExpandableViewHolder extends RecyclerView.ViewHolder {
    private Expandable expandable;
    private LinearLayout header;
    private FrameLayout content;
    private TextView headerText;
    private TextView headerSubText;
    private TextView contentText;

    ExpandableViewHolder(View itemView) {
        super(itemView);
        expandable = itemView.findViewById(R.id.expandable);
        header = itemView.findViewById(R.id.header);
        content = itemView.findViewById(R.id.content);
        headerText = itemView.findViewById(R.id.header_text);
        headerSubText = itemView.findViewById(R.id.header_subtext);
        contentText = itemView.findViewById(R.id.content_text);
    }

    public Expandable getExpandable() {
        return expandable;
    }

    public LinearLayout getHeader() {
        return header;
    }

    public FrameLayout getContent() {
        return content;
    }

    public TextView getHeaderText() {
        return headerText;
    }

    public TextView getHeaderSubText() {
        return headerSubText;
    }

    public TextView getContentText() {
        return contentText;
    }
}
```

**(b). ExpandableAdapter.java**

```java
public class ExpandableAdapter extends RecyclerView.Adapter<ExpandableViewHolder> {
    private final Context context;
    private final ArrayList<ExpandableModel> models;
    private final ArrayList<Pair<Integer, Integer>> colors;

    public ExpandableAdapter(Context context, ArrayList<ExpandableModel> models, ArrayList<Pair<Integer, Integer>>  colors) {
        this.context = context;
        this.models = models;
        this.colors = colors;
    }

    @NonNull
    @Override
    public ExpandableViewHolder onCreateViewHolder(@NonNull ViewGroup parent, int viewType) {
        View v = LayoutInflater.from(context).inflate(R.layout.item_expandable, parent, false);
        return new ExpandableViewHolder(v);
    }

    @Override
    public void onBindViewHolder(ExpandableViewHolder holder, int position) {
        ExpandableModel expandableModel = models.get(holder.getAbsoluteAdapterPosition());
        Expandable expandable = holder.getExpandable();
        LinearLayout header = holder.getHeader();
        FrameLayout content = holder.getContent();
        TextView headerText = holder.getHeaderText();
        TextView headerSubText = holder.getHeaderSubText();
        TextView contentText = holder.getContentText();

        Pair<Integer, Integer> color = colors.get(holder.getAbsoluteAdapterPosition());

        expandable.setExpandingListener(new Expandable.ExpandingListener() {
            @Override
            public void onExpanded() {
                Log.e("View", "Expanded");
            }

            @Override
            public void onCollapsed() {
                Log.e("View", "Collapsed");
            }
        });

        expandable.setAnimateExpand(true);
        header.setBackgroundColor(color.first);
        content.setBackgroundColor(color.second);
        headerText.setText(expandableModel.getHeaderText());
        headerSubText.setText(expandableModel.getHeaderSubText());
        contentText.setText(expandableModel.getContentText());
    }

    @Override
    public int getItemCount() {
        return models.size();
    }

    @Override
    public int getItemViewType(int position) {
        return position;
    }
}
```

### Step 7: Create MainActivity

Here is the MainActivity code:

**MainActivity.java**

```java
public class MainActivity extends AppCompatActivity {

  @Override
  protected void onCreate(Bundle savedInstanceState) {
    super.onCreate(savedInstanceState);
    setContentView(R.layout.activity_main);
    light();

    RecyclerView list = findViewById(R.id.list);
    list.setLayoutManager(new LinearLayoutManager(this));
    list.setAdapter(new ExpandableAdapter(this, getModels(), getColors()));
  }

  private ArrayList<Pair<Integer, Integer>> getColors() {
    ArrayList<Pair<Integer, Integer>> colors = new ArrayList<>();

    colors.add(Pair.create(ContextCompat.getColor(this, R.color.colorRed1), ContextCompat.getColor(this, R.color.colorRed2)));
    colors.add(Pair.create(ContextCompat.getColor(this, R.color.colorPurple1), ContextCompat.getColor(this, R.color.colorPurple2)));
    colors.add(Pair.create(ContextCompat.getColor(this, R.color.colorIndigo1), ContextCompat.getColor(this, R.color.colorIndigo2)));
    colors.add(Pair.create(ContextCompat.getColor(this, R.color.colorBlue1), ContextCompat.getColor(this, R.color.colorBlue2)));
    colors.add(Pair.create(ContextCompat.getColor(this, R.color.colorCyan1), ContextCompat.getColor(this, R.color.colorCyan2)));
    colors.add(Pair.create(ContextCompat.getColor(this, R.color.colorTeal1), ContextCompat.getColor(this, R.color.colorTeal2)));
    colors.add(Pair.create(ContextCompat.getColor(this, R.color.colorGreen1), ContextCompat.getColor(this, R.color.colorGreen2)));
    colors.add(Pair.create(ContextCompat.getColor(this, R.color.colorLime1), ContextCompat.getColor(this, R.color.colorLime2)));
    colors.add(Pair.create(ContextCompat.getColor(this, R.color.colorAmber1), ContextCompat.getColor(this, R.color.colorAmber2)));
    colors.add(Pair.create(ContextCompat.getColor(this, R.color.colorOrange1), ContextCompat.getColor(this, R.color.colorOrange2)));
    colors.add(Pair.create(ContextCompat.getColor(this, R.color.colorBrown1), ContextCompat.getColor(this, R.color.colorBrown2)));
    colors.add(Pair.create(ContextCompat.getColor(this, R.color.colorRed1), ContextCompat.getColor(this, R.color.colorRed2)));
    colors.add(Pair.create(ContextCompat.getColor(this, R.color.colorPurple1), ContextCompat.getColor(this, R.color.colorPurple2)));
    colors.add(Pair.create(ContextCompat.getColor(this, R.color.colorIndigo1), ContextCompat.getColor(this, R.color.colorIndigo2)));
    colors.add(Pair.create(ContextCompat.getColor(this, R.color.colorBlue1), ContextCompat.getColor(this, R.color.colorBlue2)));
    colors.add(Pair.create(ContextCompat.getColor(this, R.color.colorCyan1), ContextCompat.getColor(this, R.color.colorCyan2)));
    colors.add(Pair.create(ContextCompat.getColor(this, R.color.colorTeal1), ContextCompat.getColor(this, R.color.colorTeal2)));
    colors.add(Pair.create(ContextCompat.getColor(this, R.color.colorGreen1), ContextCompat.getColor(this, R.color.colorGreen2)));
    colors.add(Pair.create(ContextCompat.getColor(this, R.color.colorLime1), ContextCompat.getColor(this, R.color.colorLime2)));
    colors.add(Pair.create(ContextCompat.getColor(this, R.color.colorAmber1), ContextCompat.getColor(this, R.color.colorAmber2)));
    colors.add(Pair.create(ContextCompat.getColor(this, R.color.colorOrange1), ContextCompat.getColor(this, R.color.colorOrange2)));
    colors.add(Pair.create(ContextCompat.getColor(this, R.color.colorBrown1), ContextCompat.getColor(this, R.color.colorBrown2)));

    return colors;
  }

  private ArrayList<ExpandableModel> getModels() {
    String[] header = getResources().getStringArray(R.array.headers);
    String[] subHeaders = getResources().getStringArray(R.array.sub_headers);
    String[] contents = getResources().getStringArray(R.array.contents);
    ArrayList<ExpandableModel> expandableModels = new ArrayList<>();
    for (int i = 0; i < header.length; i++) {
      ExpandableModel model = new ExpandableModel();

      model.setHeaderText(header[i]);
      model.setHeaderSubText(subHeaders[i]);
      model.setContentText(contents[i]);

      expandableModels.add(model);
    }
    return expandableModels;
  }

  private void light() {
    if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.O) {
      getWindow().getDecorView().getRootView().setSystemUiVisibility(
          View.SYSTEM_UI_FLAG_LIGHT_NAVIGATION_BAR | View.SYSTEM_UI_FLAG_LIGHT_STATUS_BAR
      );
      getWindow().setNavigationBarColor(ContextCompat.getColor(this, R.color.colorPrimaryDark23));
    }
  }
}
```

### Run

Copy the code or download it in the link below, build and run.

### Reference

Here are the reference links:

| Number | Link |
| --- | --- |
| 1. | [Download](https://downgit.github.io/#/home?url=https://github.com/robertlevonyan/material-expansion-panel/tree/master/demo) Example |
| 2. | [Follow](https://github.com/robertlevonyan/) code author |
| 3. | Code: [Apache 2.0 License](http://www.apache.org/licenses/LICENSE-2.0.txt) |

## Example 2: Android Expandable RecyclerView – with ExpandableLayout

> _A Custom RecyclerView with ExpandableLayout_

In this class we see how to turn a recyclerview into an ExpandableRecyclerView with expandablelayout. We have complete control over the look of our expandablelayout as it's not some black box just an ordinary recyclerview with an expandablelayout.

This implies that we use the normal`RecyclerView.Adapter` and `RecyclerView.ViewHolder` classes.

We will maintain our expandstates in a `SparseBooleanArray`, a data structure that maps integers into boolean values.

In this case both the title of the expandable textview will be a simple textview. The description will also be a textview however we will wrap it in an expandablelayout.

#### Gradle Scripts

##### (a). build.gradle(App)

Here's our **app level** `build.gradle` file. We have the dependencies DSL where we add our dependencies.

This file is called app level `build.gradle` since it's located in the app folder of the project.

If you are using Android Studio version 3 and above use `implementation` keyword while if you are using a version less than 3 then still use the `compile` keyword.

Once you've modified this `build.gradle` file you have to sync your project. Android Studio will indeed prompt you to do so.

```groovy
dependencies {
    implementation fileTree(dir: 'libs', include: ['*.jar'])
    testImplementation 'junit:junit:4.12'
    implementation 'com.android.support:appcompat-v7:28.0.0-rc01'
    implementation 'com.android.support.constraint:constraint-layout:1.1.2'
    implementation 'com.github.aakira:expandable-layout:1.6.0@aar'
    implementation 'com.android.support:recyclerview-v7:28.0.0-rc01'
}
```

#### Java Code

Android apps can be mainly written in Java or Kotlin. These days however there are many frameworks like Flutter also which use languages like Dart.

In this class we are using Java programming language.

We will have these classes in our project.

##### (a). Pioneer.java

This is our Pioneers class, basically a data object to represent a single computer Pioneer.

This Pioneer has a name and a description. We will receive those two properties via the constructor and set them to our public fields which can then be accessed to retrieve them.

```java
package info.camposha.mrexpandable;

public class Pioneer {
    public final String name ;
    public final String description;

    public Pioneer(String name , String description) {
        this.name = name  ;
        this.description = description;
    }
}
```

##### (b). MyRecyclerViewAdapter.java

This is our RecyclerView.Adapter class.

```java
package info.camposha.mrexpandable;

import android.animation.ObjectAnimator;
import android.content.Context;
import android.support.v4.content.ContextCompat;
import android.support.v7.widget.RecyclerView;
import android.util.SparseBooleanArray;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.RelativeLayout;
import android.widget.TextView;

import com.github.aakira.expandablelayout.ExpandableLayout;
import com.github.aakira.expandablelayout.ExpandableLayoutListenerAdapter;
import com.github.aakira.expandablelayout.ExpandableLinearLayout;
import com.github.aakira.expandablelayout.Utils;

import java.util.List;

public class MyRecyclerAdapter  extends RecyclerView.Adapter<MyRecyclerAdapter.ViewHolder> {

    private final List<Pioneer> pioneers;
    private Context context;
    //SparseBooleanArrays map integers to booleans.
    private SparseBooleanArray expandStates = new SparseBooleanArray();

    /**
     * Our ViewHolder class extends RecyclerView.ViewHolder
     */
    public static class ViewHolder extends RecyclerView.ViewHolder {
        public TextView txtTitle, txtDescription;
        public RelativeLayout buttonLayout;
        /**
         * You must use the ExpandableLinearLayout in the recycler view.
         * The ExpandableRelativeLayout doesn't work.
         */
        public ExpandableLinearLayout expandableLayout;

        public ViewHolder(View v) {
            super(v);
            txtTitle = v.findViewById(R.id.txt_title);
            txtDescription = v.findViewById(R.id.txt_description);
            buttonLayout = v.findViewById(R.id.button);
            expandableLayout = v.findViewById(R.id.expandableLayout);
        }
    }

    /**
     * Toggle our ExpandableLayout state when clicked.
     * @param expandableLayout
     */
    private void onClickButton(final ExpandableLayout expandableLayout) {
        expandableLayout.toggle();
    }

    /**
     * Create Animation for our ExpandableLayout.
     * We use ObjectAnimator,a subclass of ValueAnimator that will provide us support for
     * animating properties on target objects.
     * @param target
     * @param from
     * @param to
     * @return
     */
    public ObjectAnimator createRotateAnimator(final View target, final float from, final float to) {
        ObjectAnimator animator = ObjectAnimator.ofFloat(target, "rotation", from, to);
        animator.setDuration(300);
        animator.setInterpolator(Utils.createInterpolator(Utils.LINEAR_INTERPOLATOR));
        return animator;
    }

    /**
     * Our Adapter's constructor
     * @param pioneers - list of Pioneer objects
     */
    public MyRecyclerAdapter(final List<Pioneer> pioneers) {
        this.pioneers = pioneers;
        for (int i = 0; i < pioneers.size(); i++) {
            expandStates.append(i, false);
        }
    }

    /**
     * Inflate our Layout, pass the resultant view to our ViewHolder constructor
     * and return the ViewHolder instance
     * @param parent
     * @param viewType
     * @return
     */
    @Override
    public MyRecyclerAdapter.ViewHolder onCreateViewHolder(final ViewGroup parent, final int viewType) {
        this.context = parent.getContext();
        return new ViewHolder(LayoutInflater.from(context)
                .inflate(R.layout.recycler_view_list, parent, false));
    }

    /**
     * Bind our data
     * @param holder
     * @param position
     */
    @Override
    public void onBindViewHolder(final MyRecyclerAdapter.ViewHolder holder, final int position) {
        final Pioneer pioneer = pioneers.get(position);
        holder.setIsRecyclable(false);
        holder.txtTitle.setText(pioneer.name);
        holder.txtDescription.setText(pioneer.description);
        holder.itemView.setBackgroundColor(ContextCompat.getColor(context, R.color.material_teal_500));
        holder.expandableLayout.setInRecyclerView(true);
        holder.expandableLayout.setBackgroundColor(ContextCompat.getColor(context, R.color.gray_light));
        holder.expandableLayout.setInterpolator(Utils.createInterpolator(Utils.BOUNCE_INTERPOLATOR));
        holder.expandableLayout.setExpanded(expandStates.get(position));
        holder.expandableLayout.setListener(new ExpandableLayoutListenerAdapter() {
            @Override
            public void onPreOpen() {
                //pass target view, and two foating points
                createRotateAnimator(holder.buttonLayout, 0f, 180f).start();
                expandStates.put(position, true);
            }

            @Override
            public void onPreClose() {
                createRotateAnimator(holder.buttonLayout, 180f, 0f).start();
                expandStates.put(position, false);
            }
        });

        holder.buttonLayout.setRotation(expandStates.get(position) ? 180f : 0f);
        holder.buttonLayout.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(final View v) {
                onClickButton(holder.expandableLayout);
            }
        });
    }
    /**
     * Return total items in our adapter
     * @return
     */
    @Override
    public int getItemCount() {
        return pioneers.size();
    }

}
```

##### (c). MainActivity.java

```java
package info.camposha.mrexpandable;

import android.os.Bundle;
import android.support.v7.app.AppCompatActivity;
import android.support.v7.widget.DividerItemDecoration;
import android.support.v7.widget.LinearLayoutManager;
import android.support.v7.widget.RecyclerView;

import java.util.ArrayList;
import java.util.List;
public class MainActivity extends AppCompatActivity {

    /**
     * Our onCreate method.
     * - @param savedInstanceState - a Bundle object to hold our Object state
     */
    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);
        getSupportActionBar().setTitle(MainActivity.class.getSimpleName());

        final RecyclerView recyclerView = findViewById(R.id.recyclerView);
        recyclerView.addItemDecoration(new DividerItemDecoration(this,0));
        recyclerView.setLayoutManager(new LinearLayoutManager(this));

        final List<Pioneer> pioneers = new ArrayList<>();
        pioneers.add(new Pioneer("0 Atanasoff John Vincent",
                "John V. Atanasoff is considered by many historians to be" +
                        "the inventor of the modern electronic computer. He was" +
                        "born October 4, 1903, in Hamilton, New York. As a young" +
                        "man, Atanasoff showed considerable interest in and a talent" +
                        "for electronics. His academic background (B.S. in electrical" +
                        "engineering, Florida State University, 1925; m.S. in mathematics, Iowa State College, 1926; and Ph.D. in experimental" +
                        "physics, University of Wisconsin, 1930) well equipped him" +
                        "for the design of computing devices.  "));
        pioneers.add(new Pioneer("1 Andreessen Marc",
                " marc Andreessen brought the World Wide Web and its" +
                        "wealth of information, graphics, and services to the desktop, setting the stage for the first “e-commerce” revolution" +
                        "of the later 1990s. As founder of Netscape, Andreessen also"));
        pioneers.add(new Pioneer("2 Amdahl Gene Myron",
                "gene Amdahl played a major role in designing and developing the mainframe computer that dominated data processing through the 1970s (see mainfRame). Amdahl was born" +
                        "on November 16, 1922, in Flandreau, South Dakota. After" +
                        "having his education interrupted by World War II, Amdahl" +
                        "received a B.S. from South Dakota State University in 1948" +
                        "and a Ph.D. in physics at the University of Wisconsin in" +
                        "1952. "));
        pioneers.add(new Pioneer("3 Aiken Howard",
                " Howard Hathaway Aiken was a pioneer in the development" +
                        "of automatic calculating machines. Born on march 8, 1900," +
                        "in Hoboken, New Jersey, he grew up in Indianapolis, Indiana, where he pursued his interest in electrical engineering" +
                        "by working at a utility company while in high school. He" +
                        "earned a B.A. in electrical engineering in 1923 at the University of Wisconsin. "));
        pioneers.add(new Pioneer("4 Babbage Charles",
                " Charles Babbage made wide-ranging applications of mathematics to a variety of fields including economics, social" +
                "statistics, and the operation of railroads and lighthouses." +
                "Babbage is best known, however, for having conceptualized" +
                "the key elements of the general-purpose computer about a" +
                "century before the dawn of electronic digital computing."));
        pioneers.add(new Pioneer("5 Bell, C. Gordon",
                "Chester gordon Bell (also known as gordon Bennet Bell)" +
                        "was born August 19, 1934, in Kirksville, missouri. As a" +
                        "young boy Bell worked in his father’s electrical contracting" +
                        "business, learning to repair appliances and wire circuits." +
                        "This work led naturally to an interest in electronics, and" +
                        "Bell studied electrical engineering at mIT, earning a B.S. in" +
                        "1956 and an m.S. in 1957. After graduation and a year spent" +
                        "as a Fulbright Scholar in Australia, Bell worked in the mIT" +
                        "Speech Computation Laboratory (see speech Recognition" +
                        "and synthesis). In 1960 he was invited to join the Digital" +
                        "Equipment Corporation (DEC) by founders Ken Olsen and" +
                        "Harlan Anderson. "));
        pioneers.add(new Pioneer("6 Berners-Lee Tim",
                "A graduate of Oxford University, Tim Berners-Lee created" +
                        "what would become the World Wide Web in 1989 while" +
                        "working at CERN, the giant European physics research" +
                        "institute. At CERN, he struggled with organizing the dozens of incompatible computer systems and software thatn" +
                        "had been brought to the labs by thousands of scientists" +
                        "from around the world. With existing systems each requiring a specialized access procedure, researchers had littlen" +
                        "hope of finding out what their colleagues were doing or of" +
                        "learning about existing software tools that might solve their" +
                        "problems.  "));
        pioneers.add(new Pioneer("7 Bezos, Jeffrey P.",
                " With its ability to display extensive information and interact" +
                        "with users, the World Wide Web of the mid-1990s clearly" +
                        "had commercial possibilities. But it was far from clear how" +
                        "traditional merchandising could be adapted to the online" +
                        "world, and how the strengths of the new medium could be" +
                        "translated into business advantages. In creating Amazon." +
                        "com, “the world’s largest bookstore,” Jeff Bezos would show" +
                        "how the Web could be used to deliver books and other merchandise to millions of consumers. "));
        recyclerView.setAdapter(new MyRecyclerAdapter(pioneers));
    }
}
```

#### Layout Resources

##### (a). activity_main.xml

This is our main activity's layout. It will contain our [RecyclerView](https://camposha.info/android/recyclerview).

This layout will get inflated into the main activity's user interface. This will happen via the Activity's `setContentView()` method which will require us to pass it the layout.

We will do so inside the `onCreate()` method of [Activity](https://camposha.info/android/activity).

```xml
<?xml version="1.0" encoding="utf-8"?>
<LinearLayout

    android_layout_width="match_parent"
    android_layout_height="match_parent"
    tools_context="info.camposha.mrexpandable.MainActivity">

    <android.support.v7.widget.RecyclerView

        android_id="@+id/recyclerView"
        android_layout_width="match_parent"
        android_layout_height="match_parent"
        android_scrollbars="vertical" />

</LinearLayout>
```

##### (b). recycler_view_list.xml

Our model layout. This layout will represent a single expandable item.

Our expandable item will have a textview as well as a description.

```xml
<?xml version="1.0" encoding="utf-8"?>
<RelativeLayout

    android_layout_width="match_parent"
    android_layout_height="wrap_content"
    >

    <RelativeLayout
        android_id="@+id/button"
        android_layout_width="48dp"
        android_layout_height="48dp"
        android_layout_alignParentRight="true"
        android_layout_alignParentTop="true"
        android_gravity="center"
        >

        <View
            android_layout_width="12dp"
            android_layout_height="12dp"
            android_background="@drawable/triangle"
            />
    </RelativeLayout>

    <TextView
        android_id="@+id/txt_title"
        android_layout_width="match_parent"
        android_layout_height="48dp"
        android_layout_alignParentTop="true"
        android_layout_toLeftOf="@id/button"
        android_gravity="left|fill_horizontal"
        android_padding="8dp"
        android_textColor="@color/white"
        android_textSize="30sp" />

    <com.github.aakira.expandablelayout.ExpandableLinearLayout
        android_id="@+id/expandableLayout"
        android_layout_width="match_parent"
        android_layout_height="120dp"
        android_layout_below="@id/txt_title"
        android_orientation="vertical"
        app_ael_duration="400"
        app_ael_expanded="false"
        >

        <TextView
            android_id="@+id/txt_description"
            android_layout_width="match_parent"
            android_layout_height="wrap_content"
            android_layout_centerInParent="true"
            android_gravity="left|fill_horizontal"
            android_padding="@dimen/margin_normal"
            android_text=" Let's have the description for each pioneer here."
            android_textColor="@color/dark"
            android_textSize="20sp" />
    </com.github.aakira.expandablelayout.ExpandableLinearLayout>
</RelativeLayout>
```

#### Value Resources

##### (a). styles.xml

Our application's style.

```xml
<resources>

    <!-- Base application theme. -->
    <style name="AppTheme" parent="Theme.AppCompat.Light.DarkActionBar">
        <!-- Customize your theme here. -->
        <item name="colorPrimary">@color/material_amber_A700</item>
        <item name="colorPrimaryDark">@color/material_amber_800</item>
        <item name="colorAccent">@color/colorAccent</item>
    </style>

</resources>
```

##### (b). dimens.xml

Our dimensions.

```xml
<?xml version="1.0" encoding="utf-8"?>
<resources>
    <dimen name="margin_normal">5dp</dimen>
</resources>
```

#### Download

You can download full source code below.

| No. | Location | Link |
| --- | --- | --- |
| 1. | GitHub | [Browse](https://github.com/Oclemy/MrExpandableRecyclerView) |
