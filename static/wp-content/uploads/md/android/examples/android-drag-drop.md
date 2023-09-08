# Kotlin Android DragEvent Examples


In this tutorial you will learn about a `DragEvent` using several Drag and Drop step by examples.


### What is DragEvent?

The system transmits a `DragEvent` when a drag and drop operation is performed. This dragEvent is a data structure that contains several pieces of information about the operation and the data that is being moved.

An object receiving a drag event calls the `getAction()` method, which then returns the state of the drag and drop operation. By doing this, a `View` object can change its appearance or perform other actions when its state changes. For example, a `View` can react to the `ACTION_DRAG_ENTERED` action type by by changing one or more colors in its displayed image.

This image is called a drag shadow. Several action types reflect the position of the drag shadow relative to the View receiving the event when a user drags and drops an image.


## Examples

Let's assume you are creating some cool notes app and you want to give users the ability to drag and drop the individual notes item and save their final positions let's say in a database. Well the first step in that is understanding how to drag drop items in an adapterview, e.g listview, gridview, recyclerview.

In this example you will learn:

1. How to drag and drop items in a grid.
2. How to get the items final position.

We use the following languages:

1. Kotlin
2. Java

> NB/= This article is broken down into several pages. Each page teaches a unique concept. Here are the taught concepts:
> 
> 1. Drag Drop in a Grid
> 2. Drag Drop in a RecyclerView



## Example 1: Drap Drop Items in a GridView

Let us see how to drag drop items in a GridView. This is a simple example.

### Step 1: Dependencies

We use no third party dependencies.

### Step 2: Code

We write our code in Java.

We have two classes, a fragment hosted inside an activity:

**MainFragment.java**

```java
package info.camposha.dragdropexample;

import android.content.ClipData;
import android.graphics.Color;
import android.os.Bundle;
import android.view.DragEvent;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.TextView;
import android.widget.Toast;

import androidx.fragment.app.Fragment;

public class MainFragment extends Fragment {

    private View[] views;

    @Override
    public View onCreateView(LayoutInflater inflater, ViewGroup container,
                             Bundle savedInstanceState) {
        ViewGroup rootView = (ViewGroup) inflater.inflate(R.layout.fragment_main, container, false);
        views = new View[rootView.getChildCount()];
        for (int i = 0; i < rootView.getChildCount(); i++) {
            final TextView view = (TextView) rootView.getChildAt(i);
            initView(view);
            views[i] = view;
        }
        return rootView;
    }

    private void initView(final TextView view) {
        view.setOnDragListener((v, event) -> {
            switch(event.getAction()) {
                case DragEvent.ACTION_DRAG_STARTED:
                    return true;

                case DragEvent.ACTION_DRAG_ENTERED:
                    v.setBackgroundColor(Color.LTGRAY);
                    return true;

                case DragEvent.ACTION_DRAG_LOCATION:
                    return true;

                case DragEvent.ACTION_DRAG_EXITED:
                    v.setBackgroundColor(Color.TRANSPARENT);
                    return true;

                case DragEvent.ACTION_DROP:
                    v.setBackgroundColor(Color.TRANSPARENT);
                    int dragVal = Integer.parseInt(event.getClipData().getItemAt(0).getText().toString());
                    int viewVal = Integer.parseInt(((TextView) v).getText().toString());
                    ((TextView) v).setText("" + (dragVal + viewVal));
                    Toast.makeText(getContext(), "Added", Toast.LENGTH_SHORT).show();
                    return true;

                case DragEvent.ACTION_DRAG_ENDED:
                    return true;

                default:
                    break;
            }
            return false;
        });

        view.setOnLongClickListener(v -> {
            ClipData data = ClipData.newPlainText("value", view.getText());
            view.startDrag(data, new View.DragShadowBuilder(v), null, 0);
            return true;
        });
    }

}
```

**MainActivity**

To host our fragment:

```java
package info.camposha.dragdropexample;

import androidx.appcompat.app.AppCompatActivity;

import android.os.Bundle;

public class MainActivity extends AppCompatActivity {

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);
    }
}
```

### Step 3: Layouts

Copy the layout from the source code.

### Step 4: Run

If your run the project you'll get the following:

![](https://github.com/Oclemy/DragDropExample/raw/master/DragDropExample.gif)

### Step 5: Download

Download the full source code [here](https://github.com/Oclemy).

## Example 2: Kotlin Android Drag Drop

This is a simple example showing howto implement drag and drop in Kotlin.

### Step 1: Create Project

Start by creating an empty `Android Studio` project.

### Step 2: Dependencies

No third party library is needed for our implementation of Drag Drop.

### Step 3: Create a Drag and Drop Container

You need to create a custom Drag and drop layout. This layout is based on the FrameLayout and will be used in our layout:

**DragAndDropContainer.kt**

```kotlin
package supahsoftware.androidexampledragdrop

import android.content.ClipData
import android.content.ClipDescription
import android.content.Context
import android.os.Build
import android.util.AttributeSet
import android.view.View
import android.widget.FrameLayout

class DragAndDropContainer(
    context: Context,
    attrs: AttributeSet?
) : FrameLayout(context, attrs) {

    private val dragAndDropListener by lazy { DragAndDropListener() }
    private var content: View? = null

    init {
        setOnDragListener(dragAndDropListener)
    }

    override fun onLayout(changed: Boolean, left: Int, top: Int, right: Int, bottom: Int) {
        super.onLayout(changed, left, top, right, bottom)
        updateChild()
    }

    fun setContent(view: View) {
        removeAllViews()
        addView(view)
        updateChild()
    }

    fun removeContent(view: View) {
        view.setOnLongClickListener(null)
        removeView(view)
        updateChild()
    }

    private fun updateChild() {
        validateChildCount()
        content = getFirstChild()
        content?.setOnLongClickListener { startDrag() }
    }

    private fun getFirstChild() = if (childCount == 1) getChildAt(0) else null

    private fun validateChildCount() = check(childCount <= 1) {
        "There should be a maximum of 1 child inside of a DragAndDropContainer, but there were $childCount"
    }

    private fun startDrag(): Boolean {
        content?.let {
            val tag = it.tag as? CharSequence
            val item = ClipData.Item(tag)
            val data = ClipData(tag, arrayOf(ClipDescription.MIMETYPE_TEXT_PLAIN), item)
            val shadow = DragShadowBuilder(it)

            if (Build.VERSION.SDK_INT >= 24) {
                it.startDragAndDrop(data, shadow, it, 0)
            } else {
                it.startDrag(data, shadow, it, 0)
            }
            return true
        } ?: return false
    }
}
```

### Step 4: Design Layout

Design your MainActivity's layout as follows:

**activity_main.xml**

```xml
<?xml version="1.0" encoding="utf-8"?>
<androidx.constraintlayout.widget.ConstraintLayout xmlns:android="http://schemas.android.com/apk/res/android"
    xmlns:app="http://schemas.android.com/apk/res-auto"
    xmlns:tools="http://schemas.android.com/tools"
    android:layout_width="match_parent"
    android:layout_height="match_parent"
    tools:context=".MainActivity">

    <supahsoftware.androidexampledragdrop.DragAndDropContainer
        android:id="@+id/container_1"
        android:layout_width="match_parent"
        android:layout_height="120dp"
        android:layout_marginStart="8dp"
        android:layout_marginTop="8dp"
        android:layout_marginEnd="8dp"
        android:background="@drawable/outline_gray_solid"
        app:layout_constraintTop_toTopOf="parent">

        <FrameLayout
            android:layout_width="match_parent"
            android:layout_height="match_parent">

            <ImageView
                android:id="@+id/content_image"
                android:layout_width="match_parent"
                android:layout_height="match_parent"
                android:src="@drawable/banner"
                android:scaleType="center" />

        </FrameLayout>

    </supahsoftware.androidexampledragdrop.DragAndDropContainer>

    <supahsoftware.androidexampledragdrop.DragAndDropContainer
        android:id="@+id/container_2"
        android:layout_width="match_parent"
        android:layout_height="120dp"
        android:layout_marginStart="8dp"
        android:layout_marginTop="8dp"
        android:layout_marginEnd="8dp"
        android:background="@drawable/outline_gray_solid"
        app:layout_constraintTop_toBottomOf="@id/container_1" />

    <supahsoftware.androidexampledragdrop.DragAndDropContainer
        android:id="@+id/container_3"
        android:layout_width="match_parent"
        android:layout_height="120dp"
        android:layout_marginStart="8dp"
        android:layout_marginTop="8dp"
        android:layout_marginEnd="8dp"
        android:background="@drawable/outline_gray_solid"
        app:layout_constraintTop_toBottomOf="@id/container_2" />

    <supahsoftware.androidexampledragdrop.DragAndDropContainer
        android:id="@+id/container_4"
        android:layout_width="match_parent"
        android:layout_height="120dp"
        android:layout_marginStart="8dp"
        android:layout_marginTop="8dp"
        android:layout_marginEnd="8dp"
        android:background="@drawable/outline_gray_solid"
        app:layout_constraintTop_toBottomOf="@id/container_3" />

</androidx.constraintlayout.widget.ConstraintLayout>
```

### Step 5: Create a Drag and Drop Listener

As follows:

**DragAndDropListener.kt**

```kotlin
package supahsoftware.androidexampledragdrop

import android.content.ClipDescription
import android.view.DragEvent
import android.view.View
import androidx.core.content.ContextCompat

class DragAndDropListener : View.OnDragListener {
    override fun onDrag(view: View, event: DragEvent): Boolean {
        return when (event.action) {
            DragEvent.ACTION_DRAG_ENTERED -> {
                view.setDashedOutline(); true
            }
            DragEvent.ACTION_DRAG_EXITED -> {
                view.setSolidOutline(); true
            }
            DragEvent.ACTION_DROP -> {
                val draggingView = event.localState as View
                val draggingViewParent = draggingView.parent as DragAndDropContainer
                draggingViewParent.removeContent(draggingView)

                val landingContainer = view as DragAndDropContainer
                landingContainer.setContent(draggingView)
                landingContainer.setSolidOutline()
                true
            }
            DragEvent.ACTION_DRAG_STARTED -> event.clipDescription.hasMimeType(ClipDescription.MIMETYPE_TEXT_PLAIN)
            else -> true
        }
    }

    private fun View.setSolidOutline() {
        background = ContextCompat.getDrawable(context, R.drawable.outline_gray_solid)
    }

    private fun View.setDashedOutline() {
        background = ContextCompat.getDrawable(context, R.drawable.outline_gray_dashed)
    }
}
```

### Step 6: Create MainActivity

Create MainActivity as follows:

**MainActivity.kt**

```kotlin
package supahsoftware.androidexampledragdrop

import android.os.Bundle
import androidx.appcompat.app.AppCompatActivity

class MainActivity : AppCompatActivity() {
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_main)
    }
}
```

### Run

Copy the code or download it in the link below, build and run.

### Reference

Here are the reference links:

| Number | Link |
| --- | --- |
| 1. | [Download](https://github.com/SupahSoftware/AndroidExampleDragDrop/archive/refs/heads/master.zip) Example |
| 2. | [Follow](https://github.com/AndroidExampleDragDrop/) code author |
| 3. | Code: [Apache 2.0 License](http://www.apache.org/licenses/LICENSE-2.0.txt) |



## Example 1: Implement Drag and Drop in Recyclerview

In this section we will look at Drag and Drop implementation in a RecyclerView.

Here we see a Words and sentence app that teaches implementation of Drag and drop in a recyclerview.

Here is the demo of the project:

![RecyclerView Drag and Drop Example](https://github.com/robertlevonyan/drag-and-drop-demo/raw/master/media/appflow.gif)

### Step 1: Create Project

Start by creating an empty `Android Studio` project.

### Step 2: Dependencies

Add dependencies as follows:

```groovy
dependencies {
  kotlin("stdlib")
  implementation("com.google.android.material:material:1.4.0")
  implementation("androidx.appcompat:appcompat:1.3.1")
  implementation("androidx.constraintlayout:constraintlayout:2.1.0")
  implementation("com.google.android:flexbox:2.0.1")
}
```

### Step 3: Design Layouts

Design two layouts as follows:

**(a). item_word.xml**

Layout for a single word:

```xml
<?xml version="1.0" encoding="utf-8"?>
<TextView xmlns:android="http://schemas.android.com/apk/res/android"
  xmlns:tools="http://schemas.android.com/tools"
  android:id="@+id/tvWord"
  android:layout_width="wrap_content"
  android:layout_height="wrap_content"
  android:layout_margin="8dp"
  android:background="@drawable/bg_word"
  android:elevation="4dp"
  android:padding="12dp"
  android:textColor="@android:color/black"
  tools:text="Drag and Drop" />
```

**(b). activity_main.xml**

Will contain two recyclerviews. Item will be dragged from one recyclerview and dropped onto another:

```xml
<?xml version="1.0" encoding="utf-8"?>
<androidx.constraintlayout.widget.ConstraintLayout xmlns:android="http://schemas.android.com/apk/res/android"
  xmlns:app="http://schemas.android.com/apk/res-auto"
  xmlns:tools="http://schemas.android.com/tools"
  android:layout_width="match_parent"
  android:layout_height="match_parent"
  android:background="@drawable/bg_gradient"
  tools:context=".MainActivity">

  <androidx.cardview.widget.CardView
    android:id="@+id/rvSentenceCard"
    android:layout_width="0dp"
    android:layout_height="0dp"
    android:layout_margin="16dp"
    app:cardBackgroundColor="@android:color/transparent"
    app:cardCornerRadius="8dp"
    app:cardElevation="0dp"
    app:layout_constraintBottom_toTopOf="@id/rvWords"
    app:layout_constraintEnd_toEndOf="parent"
    app:layout_constraintHeight_percent="0.5"
    app:layout_constraintStart_toStartOf="parent"
    app:layout_constraintTop_toTopOf="parent">

    <androidx.recyclerview.widget.RecyclerView
      android:id="@+id/rvSentence"
      android:layout_width="match_parent"
      android:layout_height="match_parent"
      android:overScrollMode="never" />
  </androidx.cardview.widget.CardView>

  <androidx.recyclerview.widget.RecyclerView
    android:id="@+id/rvWords"
    android:layout_width="0dp"
    android:layout_height="wrap_content"
    android:clipToPadding="false"
    android:overScrollMode="never"
    android:padding="16dp"
    app:layout_constraintBottom_toBottomOf="parent"
    app:layout_constraintEnd_toEndOf="parent"
    app:layout_constraintHeight_percent="0.5"
    app:layout_constraintStart_toStartOf="parent"
    app:layout_constraintTop_toBottomOf="@id/rvSentenceCard" />
</androidx.constraintlayout.widget.ConstraintLayout>
```

### Step 4: Create CallBacks

**(a). DragListener.kt**

A `DragListener` callback for the draggable view to update it's visibility:

```kotlin
class DragListener : View.OnDragListener {
  override fun onDrag(view: View, dragEvent: DragEvent): Boolean {
    when (dragEvent.action) {
      // hide view when drag has been started
      DragEvent.ACTION_DRAG_ENTERED -> view.visibility = View.INVISIBLE
      // show view when drag has been ended
      DragEvent.ACTION_DRAG_ENDED -> view.visibility = View.VISIBLE
    }

    return true
  }
}
```

**(a). DropListener.kt**

A `DropListener` Callback for the target view where dragged items will be dropped

```kotlin
class DropListener(private val onDrop: () -> Unit) : View.OnDragListener {
  override fun onDrag(view: View, dragEvent: DragEvent): Boolean {
    when (dragEvent.action) {
      // animate and highlight a background under the view to show the borders of the drop area
      DragEvent.ACTION_DRAG_ENTERED -> {
        val bgColor = ContextCompat.getColor(view.context, R.color.colorWhiteTransparent)
        if (view.background is ColorDrawable && (view.background as ColorDrawable).color == bgColor) return true

        ValueAnimator.ofArgb(Color.TRANSPARENT, bgColor).apply {
          addUpdateListener {
            val color = it.animatedValue as Int
            view.setBackgroundColor(color)
          }
          duration = 500
        }.start()
      }
      // animate and hide the highlight under the drop area
      DragEvent.ACTION_DRAG_ENDED -> {
        val bgColor = ContextCompat.getColor(view.context, R.color.colorWhiteTransparent)
        if (view.background is ColorDrawable && (view.background as ColorDrawable).color == Color.TRANSPARENT) return true

        ValueAnimator.ofArgb(bgColor, Color.TRANSPARENT).apply {
          addUpdateListener {
            val color = it.animatedValue as Int
            view.setBackgroundColor(color)
          }
          duration = 500
        }.start()
      }
      // when item has been dropped, notify about it
      DragEvent.ACTION_DROP -> onDrop()
    }

    return true
  }
}
```

**(c). WordsDiffCallback.kt**

This is a `DiffUtil.ItemCallback` for our adapters:

```kotlin
class WordsDiffCallback : DiffUtil.ItemCallback<String>() {
  override fun areItemsTheSame(oldItem: String, newItem: String): Boolean = oldItem == newItem

  override fun areContentsTheSame(oldItem: String, newItem: String): Boolean = oldItem == newItem
}
```

### Step 5: Create Adapters

**(a). WordsAdapter.kt**

A `androidx.recyclerview.widget.RecyclerView` adapter to show draggable items. The `@param onDragStarted` will provide the current draggable view value, String in this case:

```kotlin
class WordsAdapter(private val onDragStarted: (String) -> Unit) : ListAdapter<String, WordsAdapter.WordsViewHolder>(WordsDiffCallback()) {
  override fun onCreateViewHolder(parent: ViewGroup, viewType: Int): WordsViewHolder {
    val view = LayoutInflater.from(parent.context).inflate(R.layout.item_word, parent, false)
    return WordsViewHolder(view)
  }

  override fun onBindViewHolder(holder: WordsViewHolder, position: Int) {
    holder.bind(getItem(position))
  }

  fun removeItem(selectedWord: String) {
    val list = ArrayList(currentList)
    list.remove(selectedWord)
    submitList(list)
  }

  inner class WordsViewHolder(itemView: View) : RecyclerView.ViewHolder(itemView) {
    fun bind(word: String) = itemView.run {
      findViewById<TextView>(R.id.tvWord).text = word

      setOnLongClickListener { view ->
        // when user is long clicking on a view, drag process will start
        val data = ClipData.newPlainText("", word)
        val shadowBuilder = View.DragShadowBuilder(view)
        if (android.os.Build.VERSION.SDK_INT >= android.os.Build.VERSION_CODES.N) {
          view.startDragAndDrop(data, shadowBuilder, view, 0)
        } else {
          view.startDrag(data, shadowBuilder, view, 0)
        }
        onDragStarted(word)
        true
      }

      setOnDragListener(DragListener())
    }
  }
}
```

**(b). SentenceAdapter.kt**

A `androidx.recyclerview.widget.RecyclerView` adapter to show dropped items:

```kotlin
class SentenceAdapter : ListAdapter<String, SentenceAdapter.WordsViewHolder>(WordsDiffCallback()) {
  override fun onCreateViewHolder(parent: ViewGroup, viewType: Int): WordsViewHolder {
    val view = LayoutInflater.from(parent.context).inflate(R.layout.item_word, parent, false)
    return WordsViewHolder(view)
  }

  override fun onBindViewHolder(holder: WordsViewHolder, position: Int) {
    holder.bind(getItem(position))
  }

  fun addItem(selectedWord: String) {
    val list = ArrayList(currentList)
    list.add(selectedWord)
    submitList(list)
  }

  inner class WordsViewHolder(itemView: View) : RecyclerView.ViewHolder(itemView) {
    fun bind(word: String) {
      itemView.findViewById<TextView>(R.id.tvWord).text = word
    }
  }
}
```

### Step 6: Create MainActivity

Lastly create mainactivity as follows:

**MainActivity.kt**

```kotlin
class MainActivity : AppCompatActivity() {
  // values of the draggable views (usually this should come from a data source)
  private val words = mutableListOf("world", "a", "!", "What", "wonderful")
  // last selected word
  private var selectedWord = ""

  private val binding by lazy { ActivityMainBinding.inflate(layoutInflater) }

  override fun onCreate(savedInstanceState: Bundle?) {
    super.onCreate(savedInstanceState)
    setContentView(binding.root)

    val sentenceAdapter = SentenceAdapter()
    val wordsAdapter = WordsAdapter {
      selectedWord = it
    }.apply {
      submitList(words)
    }

    binding.rvSentence.layoutManager = LinearLayoutManager(this, LinearLayoutManager.HORIZONTAL, false)
    binding.rvSentence.adapter = sentenceAdapter

    binding.rvSentence.setOnDragListener(
        DropListener {
          wordsAdapter.removeItem(selectedWord)
          sentenceAdapter.addItem(selectedWord)
        }
    )

    binding.rvWords.layoutManager = FlexboxLayoutManager(this, FlexDirection.ROW, FlexWrap.WRAP).apply {
      justifyContent = JustifyContent.SPACE_EVENLY
      alignItems = AlignItems.CENTER
    }

    binding.rvWords.adapter = wordsAdapter
  }
}
```

### Run

Copy the code or download it in the link below, build and run.

### Reference

Here are the reference links:

| Number | Link |
| --- | --- |
| 1. | [Download](https://github.com/robertlevonyan/drag-and-drop-demo/archive/refs/heads/master.zip) Example |
| 2. | [Follow](https://github.com/robertlevonyan/) code author |
| 3. | Code: [Apache 2.0 License](http://www.apache.org/licenses/LICENSE-2.0.txt) |
