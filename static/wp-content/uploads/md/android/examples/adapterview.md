# AdapterView - How to get the selected item

> In this tutorial you will learn about the `getSelectedItem` method which you can use to get the selected item in an `AdapterView` in Android.

This tutorial will help you learn the following concepts:

1. How to bind data to `Spinner` widget.
2. How to set the `DropdownView` resource.
3. How to get the selected item from a `Spinner`.


## Example 1: Android AdapterView getSelectedItem Example.

> Learn how to get the selected item from a `Spinner` using the `getSelectedItem()` method in Android.

This example will comprise the following files:

- `MainActivity.java`

### Step 1: Create Project

1. Open your `AndroidStudio` IDE.
2. Go to `File-->New-->Project` to create a new project.

### Step 2: Add Dependencies


### Step 3: Design Layouts


***(a). `activity_main.xml`**

Create a file named `activity_main.xml` and design it as follows:

```xml
<LinearLayout xmlns:android="http://schemas.android.com/apk/res/android"
    android:layout_width="match_parent"
    android:layout_height="match_parent"
    android:orientation="vertical" >
	
    <Button android:id="@+id/button1"
        android:layout_width="wrap_content"
        android:layout_height="wrap_content"
        android:text="@string/button1_text"/>
    "
    <Spinner android:id="@+id/spinner"
        android:layout_width="match_parent"
        android:layout_height="wrap_content" />

</LinearLayout>
```

### Step 4: Write Code

Write Code as follows:

***(a). `MainActivity.java`**

Create a file named `MainActivity.java`

Add imports

```java
import android.app.Activity;
import android.content.Context;
import android.os.Bundle;
import android.view.Menu;
import android.view.MenuItem;
import android.view.View;
import android.widget.ArrayAdapter;
import android.widget.Button;
import android.widget.Spinner;
import android.widget.Toast;
```

Extend the `Activity` class to create our `Activity`:

```java
public class MainActivity extends Activity {
```

Prepare a Context as an instance field:

```java
	Context mContext;
```

Override the `onCreate`

```java
    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);
```

Assign the Context to this:

```java
        mContext = this;
```

Instantiate an ArrayAdapter:

```java
        ArrayAdapter<String> adapter = new ArrayAdapter<String>(this, android.R.layout.simple_spinner_item);
```

Because we are using the `Spinner` widget. set the DropdownView resource to `android.R.layout.simple_spinner_dropdown_item`:

```java
        adapter.setDropDownViewResource(android.R.layout.simple_spinner_dropdown_item);
```

Add items to the adapter

```java
        adapter.add("Item1");
        adapter.add("item2");
        adapter.add("Item3"); 
```

```

Set the adapter to the `Spinner`:

```java
        spinner.setAdapter(adapter);
```

Reference our button1:

```java
        Button button1 = (Button)findViewById(R.id.button1);
```

Listen to its click event:

```java
        button1.setOnClickListener(new View.OnClickListener() {
			@Override
			public void onClick(View v) {
```

Get the selected item from a `Spinner` using the `getSelectedItem()` method:

```java
				String itemStr = (String)spinner.getSelectedItem();
```

You can then show it in a `Toast` message

```java
				Toast.makeText(mContext, itemStr, Toast.LENGTH_LONG).show();
```


Here is the full code

```java
package com.bgstation0.android.sample.adapterview_;
import android.app.Activity;
import android.content.Context;
import android.os.Bundle;
import android.view.Menu;
import android.view.MenuItem;
import android.view.View;
import android.widget.ArrayAdapter;
import android.widget.Button;
import android.widget.Spinner;
import android.widget.Toast;
//end
public class MainActivity extends Activity {
//end
	Context mContext;
    //end
    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);
        //end
        mContext = this;
        //end
        
        ArrayAdapter<String> adapter = new ArrayAdapter<String>(this, android.R.layout.simple_spinner_item);
        //end
        adapter.setDropDownViewResource(android.R.layout.simple_spinner_dropdown_item);
        //end
        adapter.add("Item1");
        adapter.add("item2");
        adapter.add("Item3"); 
        //end
        // -Reference the `Spinner`:
        final Spinner spinner = (Spinner)findViewById(R.id.spinner);
        //end
        spinner.setAdapter(adapter);
        //end
        Button button1 = (Button)findViewById(R.id.button1);
        //end
        button1.setOnClickListener(new View.OnClickListener() {
			@Override
			public void onClick(View v) {
				//end
				String itemStr = (String)spinner.getSelectedItem();
                //end
				Toast.makeText(mContext, itemStr, Toast.LENGTH_LONG).show();
                //end
			}
			
        });
        
    }
    
}
```

### Run

Simply copy the source code into your Android Project,Build and Run. 

## Example 2: Set and Get Selected Item

This tutorial will help you learn the following concepts:

1. How to set the selected item listener on a spinner.
2. How to get the selected item on a spinner.

This example will comprise the following files:

- `MainActivity.java`

### Step 1: Create Project

1. Open your `AndroidStudio` IDE.
2. Go to `File-->New-->Project` to create a new project.

### Step 2: Dependencies

No special dependencies are needed.

### Step 3: Design Layouts


***(a). `activity_main.xml`**

Create a file named `activity_main.xml` and design it as follows:

```xml
<LinearLayout xmlns:android="http://schemas.android.com/apk/res/android"
    android:layout_width="match_parent"
    android:layout_height="match_parent"
    android:orientation="vertical" >
	
    <Button android:id="@+id/button1"
        android:layout_width="wrap_content"
        android:layout_height="wrap_content"
        android:text="@string/button1_text"/>
    "
    <Spinner android:id="@+id/spinner"
        android:layout_width="match_parent"
        android:layout_height="wrap_content" />

</LinearLayout>
```

### Step 4: Write Code

Write Code as follows:

***(a). `MainActivity.java`**

Create a file named `MainActivity.java`

Create our Activity

```java
public class MainActivity extends Activity {
```

Define a `Context` as our instance field:

```java
	Context mContext;
```

Override the `onCreate()` function:

```java
    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);
        mContext = this;
```

Create an ArrayAdapter and set its layout

```java
        ArrayAdapter<String> adapter = new ArrayAdapter<String>(this, android.R.layout.simple_spinner_item);	// android.R.layout.simple_spinner_itemŃA_v^쐬.
        adapter.setDropDownViewResource(android.R.layout.simple_spinner_dropdown_item);	// hbv_EXg\̃r[͊android.R.layout.simple_spinner_dropdown_itemZbg.
```

Add items to the adapter

```java
        adapter.add("Item1");
        adapter.add("item2");
        adapter.add("Item3");
```

Reference the spinner and set its adapter

```java
        final Spinner spinner = (Spinner)findViewById(R.id.spinner);
        spinner.setAdapter(adapter);
```

Reference a button and set its click listener:

```java
        Button button1 = (Button)findViewById(R.id.button1);
        button1.setOnClickListener(new View.OnClickListener() {
			@Override
			public void onClick(View v) {
```

Get and show the selected item

```java
				String itemStr = (String)spinner.getSelectedItem();	// AdapterView.getSelectedItemőIꂽACeitemStr擾.
				Toast.makeText(mContext, itemStr, Toast.LENGTH_LONG).show();	// itemStr
```

Invoke the `setOnItemSelectedListener` on our `Spinner`. This will allow us listen to selection events.

```java
        spinner.setOnItemSelectedListener(new AdapterView.OnItemSelectedListener() {
```

Override the `onItemSelected`:

```java
             @Override
        	 public void onItemSelected(AdapterView<?> parent, View view, int position, long id) {
```

Get the parent spinner:

```java
        		 Spinner spnr = (Spinner)parent;
```

then get the selected item using the `getSelectedItem()`function and show it in a message:

```java
        		 String itemStr = (String)spnr.getSelectedItem();
        		 Toast.makeText(mContext, itemStr, Toast.LENGTH_LONG).show();	// itemStr\.
```

You can also override the `onNothingSelected()` selected callback

```java
        	 @Override
             public void onNothingSelected(AdapterView<?> arg0) {
             
        	 }
```


Here is the full code

```java
package com.bgstation0.android.sample.adapterview_;

import android.app.Activity;
import android.content.Context;
import android.os.Bundle;
import android.view.Menu;
import android.view.MenuItem;
import android.view.View;
import android.widget.AdapterView;
import android.widget.ArrayAdapter;
import android.widget.Button;
import android.widget.Spinner;
import android.widget.Toast;
public class MainActivity extends Activity {
//end
	Context mContext;
    //end
    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);
        mContext = this;
        //end
        
        ArrayAdapter<String> adapter = new ArrayAdapter<String>(this, android.R.layout.simple_spinner_item);	// android.R.layout.simple_spinner_itemŃA_v^쐬.
        adapter.setDropDownViewResource(android.R.layout.simple_spinner_dropdown_item);	// hbv_EXg\̃r[͊android.R.layout.simple_spinner_dropdown_itemZbg.
        //end
        adapter.add("Item1");
        adapter.add("item2");
        adapter.add("Item3");
        //end
        final Spinner spinner = (Spinner)findViewById(R.id.spinner);
        spinner.setAdapter(adapter);
        //end
        Button button1 = (Button)findViewById(R.id.button1);
        button1.setOnClickListener(new View.OnClickListener() {
			@Override
			public void onClick(View v) {
				//end
				String itemStr = (String)spinner.getSelectedItem();	// AdapterView.getSelectedItemőIꂽACeitemStr擾.
				Toast.makeText(mContext, itemStr, Toast.LENGTH_LONG).show();	// itemStr
                //end
			}
			
        });
        spinner.setOnItemSelectedListener(new AdapterView.OnItemSelectedListener() {
        	 //end
             @Override
        	 public void onItemSelected(AdapterView<?> parent, View view, int position, long id) {
        		 //end
        		 Spinner spnr = (Spinner)parent;
                 //end
        		 String itemStr = (String)spnr.getSelectedItem();
        		 Toast.makeText(mContext, itemStr, Toast.LENGTH_LONG).show();	// itemStr\.
        		 //end
        	 }
        	 @Override
             public void onNothingSelected(AdapterView<?> arg0) {
             
        	 }
             //end
        	 
        });
        
    }
    
}
```

### Run

Simply copy the source code into your Android Project, Build and Run. 


