# TimeLineView


>  A simple Timeline View that demonstrates the power of ConstraintLayout and RecyclerView. No drawing, just plug in and play..

Android Timeline View Library demonstrate the the power of `ConstraintnLayout` and `RecyclerView`.


Here is the demo:

![TimeLineView Tutorial](https://github.com/jerryOkafor/TimeLineView/raw/master/sc/sc1.png)

![TimeLineView Tutorial](https://github.com/jerryOkafor/TimeLineView/raw/master/sc/sc2.png)

![TimeLineView Tutorial](https://github.com/jerryOkafor/TimeLineView/raw/master/sc/sc3.png)

Follow these steps to use it:

### Step 1. Include library

**Using Gradle:**

TimelineView is currently available in on Jitpack so add the following line before every other thing if you have not done that already.

```kotlin
allprojects {
  repositories {
    ...
    maven { url 'https://jitpack.io' }
  }
}
```

Then add the following line

```groovy
dependencies {
  implementation 'com.github.po10cio:TimeLineView:1.0.2'
}
```

**Using Maven**

Also add the following lines before adding the maven dependency

```kotlin
<repositories>
  <repository>
    <id>jitpack.io</id>
    <url>https://jitpack.io</url>
  </repository>
</repositories>
```

Then add the dependency

```xml
<dependency>
  <groupId>com.github.po10cio</groupId>
  <artifactId>TimeLineView</artifactId>
  <version>1.0.2</version>
</dependency>
```


### Step 2. Add to Layout

In your XML layout include the `TimelineView` as follows:

```xml
<me.jerryhanks.stepview.TimeLineView
  android:id="@+id/timelineView"
  android:layout_width="match_parent"
  android:layout_height="match_parent"
  android:layout_marginBottom="8dp"
  android:layout_marginLeft="8dp"
  android:layout_marginRight="8dp"
  android:layout_marginTop="16dp">
```

### Step 3: Write Code

Then in your Kotlin code, do the following:
Create a class that extends TimeLine

```kotlin
class MyTimeLine(status: Status, var title: String?, var content: String?) : TimeLine(status) {
  override fun equals(other: Any?): Boolean {
    if (this === other) return true
    if (javaClass != other?.javaClass) return false
        other as MyTimeLine
    
    if (title != other.title) return false
    if (content != other.content) return false

    return true
  }
  
  override fun hashCode(): Int {
    var result = if (title != null) title!!.hashCode() else 0
    result = 31 * result + if (content != null) content!!.hashCode() else 0
    
    return result
  }

  override fun toString(): String {
    return "MyTimeLine{" +
      "title='" + title + '\'' +
      ", content='" + content + '\'' +
      '}'
  }
}
```

TimeLine has three Statuses:

- Status.COMPLETED
- Status.UN_COMPLETED
- Status.ATTENTION
You can choose from any of the statuses depending on the status of the item you want to represent.
Create an Array of your TimeLine

```kotlin
val timeLines = mutableListOf<MyTimeLine>()
  .apply {
    add(MyTimeLine(Status.COMPLETED, getString(R.string.s_title_1), getString(R.string.s_content_1)))
    add(MyTimeLine(Status.COMPLETED, getString(R.string.s_title_2), getString(R.string.s_content_2)))
    add(MyTimeLine(Status.COMPLETED, getString(R.string.s_title_3), getString(R.string.s_content_3)))
    add(MyTimeLine(Status.COMPLETED, getString(R.string.s_title_4), getString(R.string.s_content_4)))
    add(MyTimeLine(Status.COMPLETED, getString(R.string.s_title_5), getString(R.string.s_content_5)))
    add(MyTimeLine(Status.COMPLETED, getString(R.string.s_title_6), getString(R.string.s_content_6)))
    add(MyTimeLine(Status.COMPLETED, getString(R.string.s_title_7), getString(R.string.s_content_7)))
  }
```

Create the IndicatorAdapter and add it to the TimeLineView

```kotlin
val adapter = IndicatorAdapter(mutableListOf(), this, object : TimeLineViewCallback<MyTimeLine> {
  override fun onBindView(model: MyTimeLine, container: FrameLayout, position: Int): View {
    val view = layoutInflater
      .inflate(R.layout.sample_time_line,
      container, false)
      
    (view.findViewById<TextView>(R.id.tv_title)).text = model.title
    (view.findViewById<TextView>(R.id.tv_content)).text = model.content
   
    return view
  }
})

timelineView.setIndicatorAdapter(adapter)
adapter.swapItems(timeLines)
```


- Swaps the old items with the new items

```kotlin
fun swapItems(timeLines: List<T>)
```


- Update a single item given the index

```kotlin
fun updateItem(timeline: T, position: Int)
```


- Adds a list of items to the list starting from the given index

```kotlin
fun addItems(vararg items: T, index: Int = itemCount)
```


### Full Example

Let us look at a full `TimeLineView` Example based on this library:

#### Step 1. Design Layouts

For this project let's create the following layouts:

**(a). `activity_main.xml`**

> Our `activity_main` layout.

This layout will represent our Main Activity's layout. Specify [`android.support.constraint.ConstraintLayout`](https://android.camposha.info/en/constraintlayout) as it's root element then inside it place the following [widgets](https://android.camposha.info/en/view):

1. [`TextView`](https://android.camposha.info/en/textview)
2. [`Button`](https://android.camposha.info/en/button)
3. [`TimeLineView`](https://android.camposha.info/en/timelineview)

```xml
<?xml version="1.0" encoding="utf-8"?>
<android.support.constraint.ConstraintLayout xmlns:android="http://schemas.android.com/apk/res/android"
    xmlns:app="http://schemas.android.com/apk/res-auto"
    xmlns:tools="http://schemas.android.com/tools"
    android:layout_width="match_parent"
    android:layout_height="match_parent"
    tools:context="me.jerryhanks.demo.MainActivity">

    <TextView
        android:id="@+id/caption"
        android:layout_width="wrap_content"
        android:layout_height="wrap_content"
        android:layout_alignParentLeft="true"
        android:layout_alignParentStart="true"
        android:layout_alignParentTop="true"
        android:layout_marginEnd="8dp"
        android:layout_marginStart="8dp"
        android:layout_marginTop="8dp"
        android:textAppearance="@style/TextAppearance.AppCompat.Light.SearchResult.Title"
        app:layout_constraintEnd_toEndOf="parent"
        app:layout_constraintStart_toStartOf="parent"
        app:layout_constraintTop_toTopOf="parent"
        tools:text="@string/delivery_status" />

    <Button
        android:id="@+id/btnAddToTop"
        android:layout_width="wrap_content"
        android:layout_height="wrap_content"
        android:onClick="addToTop"
        android:text="@string/add_to_top"
        android:textAllCaps="false" />

    <Button
        android:id="@+id/btnAddToBottom"
        android:layout_width="wrap_content"
        android:layout_height="wrap_content"
        android:onClick="addToBottom"
        android:text="@string/add_to_bottom"
        android:textAllCaps="false"
        app:layout_constraintEnd_toEndOf="parent" />

    <me.jerryhanks.timelineview.TimeLineView
        android:id="@+id/timelineView"
        android:layout_width="0dp"
        android:layout_height="0dp"
        android:layout_marginBottom="8dp"
        android:layout_marginLeft="8dp"
        android:layout_marginRight="8dp"
        android:layout_marginTop="16dp"
        app:layout_constraintBottom_toBottomOf="parent"
        app:layout_constraintLeft_toLeftOf="parent"
        app:layout_constraintRight_toRightOf="parent"
        app:layout_constraintTop_toBottomOf="@+id/caption"
        app:layout_constraintVertical_bias="0.0" />

</android.support.constraint.ConstraintLayout>

```

#### Step 2. Write Code

Finally we need to write our code as follows:

**(a). `MyTimeLine.kt`**

> Our `MyTimeLine` class.

Create a Kotlin file named `MyTimeLine.kt` .

Then extend the `TimeLine(status)` and add its contents as follows:

First override these callbacks: 

1. `equals(other: Any?): Boolean `.
2. `hashCode(): Int `.
3. `toString(): String `.

Here is the full code:

```kotlin
package replace_with_your_package_name

import me.jerryhanks.timelineview.model.Status
import me.jerryhanks.timelineview.model.TimeLine

/**
 * @author <@Po10cio> on 10/18/17 for StepViewApp
 */

 class MyTimeLine(status: Status, var title: String?, var content: String?) : TimeLine(status) {


    override fun equals(other: Any?): Boolean {
        if (this === other) return true
        if (javaClass != other?.javaClass) return false

        other as MyTimeLine

        if (title != other.title) return false
        if (content != other.content) return false

        return true
    }


    override fun hashCode(): Int {
        var result = if (title != null) title!!.hashCode() else 0
        result = 31 * result + if (content != null) content!!.hashCode() else 0
        return result
    }

    override fun toString(): String {
        return "MyTimeLine{" +
                "title='" + title + '\'' +
                ", content='" + content + '\'' +
                '}'
    }


}


```

**(b). `MainActivity.kt`**

> Our `MainActivity` class.

Create a Kotlin file named `MainActivity.kt` and then extend the `AppCompatActivity` and add its contents as follows:

First override these callbacks: 

1. `onCreate(savedInstanceState: Bundle?) `.
2. `onBindView(model: MyTimeLine, container: FrameLayout, position: Int): View `.

Then we will be creating the following functions:

1. `addToTop() `.
2. `addToBottom() `.

**(a). Our `addToBottom()` function**

Write the `addToBottom()` function as follows:

```kotlin
    fun addToBottom() {
        val timeLine = MyTimeLine(Status.ATTENTION, "New Bottom One", "hahahaha")
        adapter.addItems(timeLine)
        timelineView.scrollToBottom()
    }
```

**(b). Our `addToTop()` function**

Write the `addToTop()` function as follows:

```kotlin
    fun addToTop() {
        val timeLine = MyTimeLine(Status.ATTENTION, "New Top One", "heiheihei")
        adapter.addItems(timeLine, index = 2)
        timelineView.scrollToTop()
    }
```

Here is the full code:

```kotlin
package replace_with_your_package_name

import android.os.Bundle
import android.support.v7.app.AppCompatActivity
import android.view.View
import android.widget.FrameLayout
import android.widget.TextView
import kotlinx.android.synthetic.main.activity_main.*
import me.jerryhanks.timelineview.IndicatorAdapter
import me.jerryhanks.timelineview.interfaces.TimeLineViewCallback
import me.jerryhanks.timelineview.model.Status

class MainActivity : AppCompatActivity() {

    private lateinit var adapter: IndicatorAdapter<MyTimeLine>

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_main)

        val timeLines = mutableListOf<MyTimeLine>()
                .apply {
                    add(MyTimeLine(Status.COMPLETED, getString(R.string.s_title_1), getString(R.string.s_content_1)))
                    add(MyTimeLine(Status.COMPLETED, getString(R.string.s_title_2), getString(R.string.s_content_2)))
                    add(MyTimeLine(Status.COMPLETED, getString(R.string.s_title_3), getString(R.string.s_content_3)))
                    add(MyTimeLine(Status.COMPLETED, getString(R.string.s_title_4), getString(R.string.s_content_4)))
                    add(MyTimeLine(Status.COMPLETED, getString(R.string.s_title_5), getString(R.string.s_content_5)))
                    add(MyTimeLine(Status.COMPLETED, getString(R.string.s_title_6), getString(R.string.s_content_6)))
                    add(MyTimeLine(Status.COMPLETED, getString(R.string.s_title_7), getString(R.string.s_content_7)))

                    // more data
                    add(MyTimeLine(Status.COMPLETED, getString(R.string.s_title_8), getString(R.string.s_content_8)))
                    add(MyTimeLine(Status.COMPLETED, getString(R.string.s_title_9), getString(R.string.s_content_9)))
                    add(MyTimeLine(Status.COMPLETED, getString(R.string.s_title_10), getString(R.string.s_content_10)))
                    add(MyTimeLine(Status.COMPLETED, getString(R.string.s_title_11), getString(R.string.s_content_11)))
                    add(MyTimeLine(Status.COMPLETED, getString(R.string.s_title_12), getString(R.string.s_content_12)))
                }


        adapter = IndicatorAdapter(mutableListOf(), this, object : TimeLineViewCallback<MyTimeLine> {
            override fun onBindView(model: MyTimeLine, container: FrameLayout, position: Int): View {
                val view = layoutInflater
                        .inflate(R.layout.sample_time_line,
                                container, false)

                (view.findViewById<TextView>(R.id.tv_title)).text = model.title
                (view.findViewById<TextView>(R.id.tv_content)).text = model.content

                return view
            }
        })
        timelineView.setIndicatorAdapter(adapter)
        adapter.swapItems(timeLines)

        //set the title
//        caption.text = getString(R.string.timeline_of_world_war_i)
        caption.text = getString(R.string.delivery_status)

        //set add buttons onclick lsisteners
        btnAddToTop.setOnClickListener({ addToTop() })
        btnAddToBottom.setOnClickListener({ addToBottom() })

    }

    /**
     * Adds an item to the top of the list and scroll to the top
     */
    fun addToTop() {
        val timeLine = MyTimeLine(Status.ATTENTION, "New Top One", "heiheihei")
        adapter.addItems(timeLine, index = 2)
        timelineView.scrollToTop()
    }

    /**
     * Add an item to the bottom of the list and scroll to the bottom
     */
    fun addToBottom() {
        val timeLine = MyTimeLine(Status.ATTENTION, "New Bottom One", "hahahaha")
        adapter.addItems(timeLine)
        timelineView.scrollToBottom()
    }
}


```

### Reference

Download the code below:

|No.|Link|
|--|---|
|1.|[Download Full Code](https://github.com/jerryOkafor/TimeLineView/archive/refs/heads/master.zip)|
|2.|Read more [here](https://github.com/jerryOkafor/TimeLineView).|
|3.|Follow code author [here](https://github.com/jerryOkafor).|
