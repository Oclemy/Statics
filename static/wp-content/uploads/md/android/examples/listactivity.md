# Kotlin Android ListActivity Example


This tutorial will teach you about `ListActivity`, how to use it to create a Listing screen easily. You will learn how to use alongside a custom `ListAdapter`.



### Main Concepts You will Learn

Here's what you will learn from this tutorial

1. What a ListActivity is.
2. How to render Images, Text and CheckBoxes in a ListActivity.

### What is a ListActivity?

> It is an activity that displays a list of items by binding to a data source such as an array or Cursor, and exposes event handlers when the user selects an item.

By default it contains a `ListView` object. This can be bound to a data source, for example an array or a cursor holding results of a query.

ListActivity has a default layout that consists of a single, full-screen list in the center of the screen. However, if you desire, you can customize the screen layout by setting your own view layout with `setContentView()` in `onCreate()`. To do this, your own view **MUST** contain a ListView object with the id `@android:id/list` (or `android.R.id#list` if it's in code)

Let's look at an example.

## Example 1: Kotlin Android ListActivity with Texts and CheckBoxes

Here's a simple ListActivity example with text and checkboxes. Because this a custom list we will implement our own custom adapter using the `BaseAdapter` as our super class.

### Step 1: Dependencies

No special or third party dependency is needed for this project.

### Step 2: Design Layouts

We need two layouts for this project:

**(a). tasklist_row.xml**

This is the row for a single item in our ListActivity. Our code will comprise a TextView next to a checkbox, both placed inside a LinearLayout with a horizontal orientation. Here's the code:

```xml
<?xml version="1.0" encoding="utf-8"?>
<LinearLayout
    xmlns:android="http://schemas.android.com/apk/res/android"
    android:orientation="horizontal"
    android:layout_width="match_parent"
    android:layout_height="match_parent"
    android:weightSum="1"
    android:baselineAligned="false">

    <TextView android:id="@+id/tasklist_label"
        android:textSize="20sp"
        android:textStyle="bold"
        android:layout_height="48dp"
        android:layout_width="300dip"
     />

    <CheckBox android:id="@+id/tasklist_finished"
        android:checked="false" android:layout_height="48dp"
        android:layout_weight=".25"
        android:layout_width="0dp" />

</LinearLayout>
```

**(b). tasklistmain.xml**

The layout for the `TaskListActivity`:

```xml
<?xml version="1.0" encoding="utf-8"?>

<LinearLayout xmlns:android="http://schemas.android.com/apk/res/android"
    xmlns:tools="http://schemas.android.com/tools"
    android:layout_width="fill_parent"
    android:layout_height="fill_parent"
    android:orientation="vertical">

    <TextView
        android:layout_width="wrap_content"
        android:layout_height="wrap_content"
        android:text="@string/accessibility_query_window_instructions" />

    <com.example.android.apis.accessibility.TaskListView
        android:id="@android:id/list"
        android:layout_width="match_parent"
        android:layout_height="match_parent"
        android:layout_marginBottom="50dip"
        android:layout_marginTop="50dip"
        android:layout_weight="1"
        android:drawSelectorOnTop="false"
        tools:ignore="InefficientWeight" />

    <ImageButton
        android:id="@+id/button"
        android:layout_width="32dip"
        android:layout_height="32dip"
        android:layout_gravity="center"
        android:layout_marginTop="50dip"
        android:adjustViewBounds="true"
        android:background="@drawable/ic_launcher_settings"
        android:scaleType="fitCenter"
        android:contentDescription="@string/settings_icon" />

</LinearLayout>
```

### Step 3: Create Tasks Adapter

Then we w need to create a List Adapter for our tasks. This class Adds Accessibility information to individual child views of rows in the list.

Start by adding imports:

```kotlin
import android.content.Context
import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import android.widget.BaseAdapter
import android.widget.CheckBox
import android.widget.TextView

import com.example.android.apis.R
```

Create our adapter class:

```kotlin
class TaskAdapter
```

Our constructor. First we call our super's constructor, then we save our parameters `Context context` in our field `Context mContext`, `String[] labels` in our field `String[] mLabels` and `boolean[] checkboxes` in our field `boolean[] mCheckboxes`.

- `@param context` - `Context` to use to access resources
- `@param labels` - labels to use for our checkboxes
- `@param checkboxes` - initial state of our checkboxes

Also extend the `BaseAdapter`

```kotlin
(context: Context, labels: Array<String>, checkboxes: BooleanArray) : BaseAdapter() {
```

Then as instance fields define Labels to use for our checkboxes, set by our constructor

```kotlin
    private var mLabels: Array<String>? = null
```

Current state of our checkboxes (true if checked, false if unchecked)

```kotlin
    private var mCheckboxes: BooleanArray? = null
```

Then a `Context` passed to our constructor ("this" in the `onCreate` method of `TaskListActivity`)

```kotlin
    private var mContext: Context? = null
```

Here's our init block:

```kotlin
    init {
        mContext = context
        mLabels = labels
        mCheckboxes = checkboxes
    }
```

How many items are in the data set represented by this Adapter. We just return the length of our field `String[] mLabels`.

- @return Count of items.

```kotlin
    override fun getCount(): Int {
        return mLabels!!.size
    }
```

Get a [View] that displays the data at the specified position in the data set. Expands the views for individual list entries, and sets content descriptions for use by the `TaskBackAccessibilityService`.

If our parameter `View convertView` is null we initialize `LayoutInflater inflater` with the LayoutInflater from context `mContext` and use it to inflate the layout file `R.layout.tasklist_row` into a view to use to set `convertView`. We initialize our variable `CheckBox checkbox` by finding the view in `convertView` with id R.id.tasklist_finished and set its checked state to the value stored in `mCheckboxes[position]`. We initialize `TextView label` by finding the view in `convertView` with id R.id.tasklist_label and set its text to the contents of `mLabels[position]`. We initialize our variable `String contentDescription` to the string formed by concatenating the string R.string.task_name ("Task") to a space followed by the contents of `mLabels[position]`, and use it to set the content description of `label`. We then set the tag of `convertView` to `position` and return `convertView` to the caller.

- `@param position` - The position of the item within the adapter's data set whose view we want.
- `@param convertView` - The old view to reuse, if possible.
- `@param parent` - The parent that this view will eventually be attached to
- `@return` - A View corresponding to the data at the specified position.

```kotlin
    override fun getView(position: Int, convertView: View?, parent: ViewGroup): View {
        var convertViewLocal = convertView
        if (convertViewLocal == null) {
            val inflater = LayoutInflater.from(mContext)
            convertViewLocal = inflater.inflate(R.layout.tasklist_row, parent, false)
        }

        val checkbox = convertViewLocal!!.findViewById<CheckBox>(R.id.tasklist_finished)
        checkbox.isChecked = mCheckboxes!![position]

        val label = convertViewLocal.findViewById<TextView>(R.id.tasklist_label)
        label.text = mLabels!![position]

        val contentDescription = StringBuilder()
                .append(mContext!!.getString(R.string.task_name))
                .append(' ')
                .append(mLabels!![position]).toString()
        label.contentDescription = contentDescription

        convertViewLocal.tag = position

        return convertViewLocal
    }
```

Get the data item associated with the specified position in the data set. We return the contents of `mLabels[position]` to the caller.

- `@param position` - Position of the item whose data we want
- `@return` - The data at the specified position.

```kotlin
    override fun getItem(position: Int): Any {
        return mLabels!![position]
    }
```

Get the row id associated with the specified position in the list. We just return our parameter `position` to the caller.

- `@param position` The position of the item within the data set whose row id we want.
- `@return` - The id of the item at the specified position.

```kotlin
    override fun getItemId(position: Int): Long {
        return position.toLong()
    }
}
```

Heres the full code:

```kotlin
import android.content.Context
import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import android.widget.BaseAdapter
import android.widget.CheckBox
import android.widget.TextView
import com.example.android.apis.R
`

class TaskAdapter

(context: Context, labels: Array<String>, checkboxes: BooleanArray) : BaseAdapter() {

    private var mLabels: Array<String>? = null

    private var mCheckboxes: BooleanArray? = null

    private var mContext: Context? = null

    init {
        mContext = context
        mLabels = labels
        mCheckboxes = checkboxes
    }

    override fun getCount(): Int {
        return mLabels!!.size
    }

    override fun getView(position: Int, convertView: View?, parent: ViewGroup): View {
        var convertViewLocal = convertView
        if (convertViewLocal == null) {
            val inflater = LayoutInflater.from(mContext)
            convertViewLocal = inflater.inflate(R.layout.tasklist_row, parent, false)
        }

        val checkbox = convertViewLocal!!.findViewById<CheckBox>(R.id.tasklist_finished)
        checkbox.isChecked = mCheckboxes!![position]

        val label = convertViewLocal.findViewById<TextView>(R.id.tasklist_label)
        label.text = mLabels!![position]

        val contentDescription = StringBuilder()
                .append(mContext!!.getString(R.string.task_name))
                .append(' ')
                .append(mLabels!![position]).toString()
        label.contentDescription = contentDescription

        convertViewLocal.tag = position

        return convertViewLocal
    }

    override fun getItem(position: Int): Any {
        return mLabels!![position]
    }

    override fun getItemId(position: Int): Long {
        return position.toLong()
    }
}
```

### Step 4: Create TaskListView

Acts as a go-between for all AccessibilityEvents sent from items in the ListView, providing the option of sending more context to an AccessibilityService by adding more AccessibilityRecords to an event.

Start by adding imports:

```kotlin
package com.example.android.apis.accessibility

import android.annotation.TargetApi
import android.content.Context
import android.os.Build
import android.util.AttributeSet
import android.view.View
import android.view.accessibility.AccessibilityEvent
import android.widget.ListView
```

Create the widget:

```kotlin
class TaskListView
```

Perform inflation from XML. We just call our super's constructor.

- `@param context` - The Context the view is running in, through which it can access the current theme, resources, etc.
- `@param attributeSet` - The attributes of the XML tag that is inflating the view.

```kotlin
(context: Context, attributeSet: AttributeSet) : ListView(context, attributeSet) {
```

This method will fire whenever a child event wants to send an AccessibilityEvent. As a result, it's a great place to add more AccessibilityRecords, if you want. In this case, the code is grabbing the position of the item in the list, and assuming that to be the priority for the task.

We initialize our variable `AccessibilityEvent record` by retrieving a cached instance if available or a new instance if not. We then pass `record` to our super's method `onInitializeAccessibilityEvent` which will initialize it with information about the View which is the event source. We retrieve the tag of our parameter `View child` to initialize our variable `int priority` then append its string value to the string "Priority: " to initialize `String priorityStr`. We set the content description of `record` to `priorityStr` and append `record` to our parameter `event`.

Finally we return true so that the event will be sent.

- @param child The child which requests sending the event.
- @param event The event to be sent.
- @return True if the event should be sent.

```kotlin
    override fun onRequestSendAccessibilityEvent(child: View, event: AccessibilityEvent): Boolean {
        // Add a record for ourselves as well.
        val record = AccessibilityEvent.obtain()
        super.onInitializeAccessibilityEvent(record)

        val priority = child.tag as Int
        val priorityStr = "Priority: $priority"
        record.contentDescription = priorityStr

        event.appendRecord(record)
        return true
    }
}
```

Here's the full code:

**TaskListView.kt**

```kotlin
import android.annotation.TargetApi
import android.content.Context
import android.os.Build
import android.util.AttributeSet
import android.view.View
import android.view.accessibility.AccessibilityEvent
import android.widget.ListView

class TaskListView

(context: Context, attributeSet: AttributeSet) : ListView(context, attributeSet) {
    @TargetApi(Build.VERSION_CODES.ICE_CREAM_SANDWICH)
    override fun onRequestSendAccessibilityEvent(child: View, event: AccessibilityEvent): Boolean {
        // Add a record for ourselves as well.
        val record = AccessibilityEvent.obtain()
        super.onInitializeAccessibilityEvent(record)

        val priority = child.tag as Int
        val priorityStr = "Priority: $priority"
        record.contentDescription = priorityStr

        event.appendRecord(record)
        return true
    }
}
```

### Step 5: Create ListActivity

Finally you create a `ListActivity` by extending the `android.app.ListActivity` class:

Add imports:

```kotlin
import android.app.ListActivity
import android.content.Intent
import android.os.Bundle
import android.provider.Settings
import android.widget.ImageButton
import com.example.android.apis.R
```

Create the ListActivity:

```kotlin
class TaskListActivity : ListActivity() {
```

Called when the activity is starting. First we call through to our super's implementation of `onCreate`, then we set our content view to our layout file R.layout.tasklist_main. Then we initialize `boolean[] checkboxes` with initial values for the `TaskAdapter` to apply to its checkboxes, and `String[] labels` to the labels it should use. We then ask the `TaskAdapter` constructor to construct an adapter from `labels` and `checkboxes` to initialize our variable `TaskAdapter myAdapter` which we then set as our list adapter.

We initialize our variable `ImageButton button` by finding the view in our layout with the id `R.id.button` and set its `OnClickListener` to an anonymous class which starts the activity specified by our field `Intent sSettingsIntent` (an intent for launching the system settings).

- `@param savedInstanceState` - we do not override `onSaveInstanceState` so do not use.

```kotlin
    public override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.tasklist_main)

        val checkboxes = booleanArrayOf(true, true, false, true, false, false, false)
        val labels = arrayOf("Take out Trash", "Do Laundry", "Conquer World", "Nap",
                "Do Taxes", "Abolish IRS", "Tea with Aunt Sharon")

        val myAdapter = TaskAdapter(this, labels, checkboxes)
        this.listAdapter = myAdapter

        // Add a shortcut to the accessibility settings.
        val button = findViewById<ImageButton>(R.id.button)
        button.setOnClickListener {
            startActivity(sSettingsIntent)
        }
    }

    companion object {

        /**
         * An intent for launching the system settings.
         */
        private val sSettingsIntent = Intent(Settings.ACTION_ACCESSIBILITY_SETTINGS)
    }
}
```

Here's the full code:

**TaskListActivity.kt**

```kotlin
import android.app.ListActivity
import android.content.Intent
import android.os.Bundle
import android.provider.Settings
import android.widget.ImageButton
import com.example.android.apis.R

class TaskListActivity : ListActivity() {

    public override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.tasklist_main)

        // Hard-coded hand-waving here.
        val checkboxes = booleanArrayOf(true, true, false, true, false, false, false)
        val labels = arrayOf("Take out Trash", "Do Laundry", "Conquer World", "Nap",
                "Do Taxes", "Abolish IRS", "Tea with Aunt Sharon")

        val myAdapter = TaskAdapter(this, labels, checkboxes)
        this.listAdapter = myAdapter

        // Add a shortcut to the accessibility settings.
        val button = findViewById<ImageButton>(R.id.button)
        button.setOnClickListener {
            startActivity(sSettingsIntent)
        }
    }

    companion object {

        /**
         * An intent for launching the system settings.
         */
        private val sSettingsIntent = Intent(Settings.ACTION_ACCESSIBILITY_SETTINGS)
    }
}
```

### Step 6: Run

1. Copy the project into your android studio
2. Build and run.
