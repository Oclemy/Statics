# ReadMoreTextView Example


Let us look at a Android ReadMoreTextView example.

This is a TextView that you can use if you prefer to collapse a long text.   It looks like facebook's feature .

![](https://github.com/PRNDcompany/ReadMoreTextView/raw/master/arts/facebook.png)
    
Here is demo screenshot:

![](https://github.com/PRNDcompany/ReadMoreTextView/raw/master/arts/sample1.gif) 

### Step 1: Install it

[![Maven Central](https://camo.githubusercontent.com/1c58d02359118876b16c60b0c06e15fb9ff328d8d958e4996f29f186f1fe0d24/68747470733a2f2f696d672e736869656c64732e696f2f6d6176656e2d63656e7472616c2f762f6b722e636f2e70726e642f726561646d6f72652d74657874766965772e7376673f6c6162656c3d4d6176656e25323043656e7472616c)](https://search.maven.org/search?q=g:%22kr.co.prnd%22%20AND%20a:%readmore-textview%22)

```groovy
dependencies {
    implementation 'kr.co.prnd:readmore-textview:x.x.x'
    //implementation 'kr.co.prnd:readmore-textview:1.0.0'    
}

```


### Step 2: Add to Layout
  
Add it to your xml layout:

```xml
<kr.co.prnd.readmore.ReadMoreTextView
    android:layout_width="match_parent"
    android:layout_height="wrap_content"
    android:text="@string/long_text"
    app:readMoreColor="@color/colorPrimary"
    app:readMoreMaxLine="4"
    app:readMoreText="…More" />
```

### Functions

Here are the functions you can use:

*   `toggle()`, `expand()`, `collapse()`: Change expand/collapse state dynamically
*   `isExpanded`, `isCollased`, `state`: Get state
*   ChangeListener: Observe state change using listener

## Example 1: ReadMoreTextView

Here is a full example. This example will comprise the following files:

- `MainActivity.kt`

### Step 1: Create Project

1. Open your `AndroidStudio` IDE.
2. Go to `File-->New-->Project` to create a new project.

### Step 2: Add Dependencies

Install it as has been described above.

### Step 3: Design Layouts

***(a). `activity_main.xml`**

Create a file named `activity_main.xml` and design it as follows:

```xml
<?xml version="1.0" encoding="utf-8"?>
<LinearLayout xmlns:android="http://schemas.android.com/apk/res/android"
    xmlns:app="http://schemas.android.com/apk/res-auto"
    xmlns:tools="http://schemas.android.com/tools"
    android:layout_width="match_parent"
    android:layout_height="match_parent"
    android:orientation="vertical"
    tools:context=".MainActivity">

    <kr.co.prnd.readmore.ReadMoreTextView
        android:id="@+id/readMoreTextView"
        android:layout_width="match_parent"
        android:layout_height="wrap_content"
        android:layout_margin="16dp"
        android:foreground="?attr/selectableItemBackground"
        android:text="@string/long_text"
        app:readMoreColor="@color/colorPrimary"
        app:readMoreMaxLine="4"
        app:readMoreText="…더보기" />

</LinearLayout>
```

### Step 4: Write Code

Write Code as follows:

**(a). `MainActivity.kt`**

Create a file named `MainActivity.kt`

 Add the ReadMoreTextView in your xml layout then reference

```kotlin
        val readMoreTextView: ReadMoreTextView = findViewById(R.id.readMoreTextView)
```

 Attach a Change Listener to it then override the `onStateChange()` callback

```kotlin
        readMoreTextView.changeListener = object : ReadMoreTextView.ChangeListener {
            override fun onStateChange(state: ReadMoreTextView.State) {
                Log.d("prnd", "state: $state")
            }
        }
```


Here is the full code

```kotlin
package kr.co.prnd.readmore.demo

import android.os.Bundle
import android.util.Log
import androidx.appcompat.app.AppCompatActivity
import kr.co.prnd.readmore.ReadMoreTextView

class MainActivity : AppCompatActivity() {
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_main)


        val readMoreTextView: ReadMoreTextView = findViewById(R.id.readMoreTextView)
        readMoreTextView.changeListener = object : ReadMoreTextView.ChangeListener {
            override fun onStateChange(state: ReadMoreTextView.State) {
                Log.d("prnd", "state: $state")
            }
        }

    }
}
```

### Run

Simply copy the source code into your Android Project,Build and Run. 

### Reference

1. [Download](https://github.com/PRNDcompany/ReadMoreTextView-master/archive/refs/heads/master.zip) code or Browse [here](https://github.com/PRNDcompany/ReadMoreTextView-master).
2. [Follow](https://github.com/PRNDcompany/) code author.


