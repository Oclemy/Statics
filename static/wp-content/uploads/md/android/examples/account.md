# Android Account and AccountManager Examples

Let us look at a Android `Account` and `AccountManager` examples.


## Example 1: Account & AccountManager

This example will help you learn the following concepts:

1. How to initialize the AccountManager in Android
2. How to get an array of all accounts in an android device
3. How to get accounts and show them in a ListView in Android.

This example will comprise the following files:

- `ListItem.java`
- `ListItemAdapter.java`
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

    <ListView android:id="@+id/listview1"
        android:layout_width="fill_parent"
        android:layout_height="wrap_content" />
    
</LinearLayout>
```
***(b). `list_item.xml`**

Create a file named `list_item.xml` and design it as follows:

```xml
<?xml version="1.0" encoding="utf-8"?>
<LinearLayout xmlns:android="http://schemas.android.com/apk/res/android"
    android:layout_width="match_parent"
    android:layout_height="match_parent"
    android:orientation="vertical" >
    
    <TextView android:id="@+id/list_item_name"
        android:layout_width="fill_parent"
        android:layout_height="wrap_content" />
    
    <TextView android:id="@+id/list_item_type"
        android:layout_width="fill_parent"
        android:layout_height="wrap_content" />

</LinearLayout>
```

### Step 4: Write Code

Write Code as follows:

***(a). `ListItem.java`**

Create a file named `ListItem.java`

 Create a class to represent a List item

```java
public class ListItem {	
```

Add ListItem properties

```java
	public String name;
	public String type;
```


Here is the full code

```java
package com.bgstation0.android.sample.account_;

public class ListItem {	
	//end
	public String name;
	public String type;
	//end
}
```

***(b). `ListItemAdapter.java`**

Create a file named `ListItemAdapter.java`

 Create an adapter class by extending the `ArrayAdapter`

```java
public class ListItemAdapter extends ArrayAdapter<ListItem> {
```

Initialize a LayoutInflater to null

```java
	LayoutInflater mInflater = null;	// mInflaternullŏ.
```

Take a `Context`, Integer, and `ListItem` objects as parameters via the constructor

```java
	public ListItemAdapter(Context context, int resource, ListItem[] objects){
```

Pass them to the constructor of the super class

```java
		super(context, resource, objects);	
```

 Initialize the LayoutInflater using the `context.getSystemService()`. Pass in the `LAYOUT_INFLATER_SERVICE`

```java
		mInflater = (LayoutInflater)context.getSystemService(context.LAYOUT_INFLATER_SERVICE);
```

Override the `getView()` function

```java
	@Override
	public View getView(int position, View convertView, ViewGroup parent){
```

Check if the `View` object is null. Only then shall we inflate:

```java
		if (convertView == null){
			convertView = mInflater.inflate(R.layout.list_item, null);	// nullȂ琶.
		}
```

Reference widgets and set their values:

```java
		TextView tvName = (TextView)convertView.findViewById(R.id.list_item_name);	// tvName.
		tvName.setText(getItem(position).name);	// name
		TextView tvType = (TextView)convertView.findViewById(R.id.list_item_type);	// tvType.
		tvType.setText(getItem(position).type);	// type
```


Here is the full code

```java
package com.bgstation0.android.sample.account_;

import android.content.Context;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.ArrayAdapter;
import android.widget.TextView;

public class ListItemAdapter extends ArrayAdapter<ListItem> {
//end
	LayoutInflater mInflater = null;	// mInflaternullŏ.
	//end
	public ListItemAdapter(Context context, int resource, ListItem[] objects){
		//end
		super(context, resource, objects);	
		//end
		mInflater = (LayoutInflater)context.getSystemService(context.LAYOUT_INFLATER_SERVICE);
		//end
	}
	
	@Override
	public View getView(int position, View convertView, ViewGroup parent){
		//end
		if (convertView == null){
			convertView = mInflater.inflate(R.layout.list_item, null);	// nullȂ琶.
		}
		//end
		TextView tvName = (TextView)convertView.findViewById(R.id.list_item_name);	// tvName.
		tvName.setText(getItem(position).name);	// name
		TextView tvType = (TextView)convertView.findViewById(R.id.list_item_type);	// tvType.
		tvType.setText(getItem(position).type);	// type
		//end
		return convertView;	// convertView.
	}
	
}
```

***(c). `MainActivity.java`**

Create a file named `MainActivity.java`

Add our imports including the ` android.accounts.Account` and ` android.accounts.AccountManager` classes.

```java
import java.util.ArrayList;
import android.accounts.Account;
import android.accounts.AccountManager;
import android.app.Activity;
import android.os.Bundle;
import android.view.Menu;
import android.view.MenuItem;
import android.widget.ListView;
```

Create our `MainActivity`. Extend the `Activity` class:

```java
public class MainActivity extends Activity {
```

Override the `onCreaet()` function:

```java
    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);
```

Initialize the `AccountManager`by invoking the `get()` method and passing the `Context`:

```java
        AccountManager accountManager = AccountManager.get(this);	// accountManager
```

Create an ArrayList of `ListItem` objects

```java
        ArrayList<ListItem> list = new ArrayList<ListItem>();
```

 Invoke the `getAccounts()` to get all the accounts in the device.

```java
        Account[] accounts = accountManager.getAccounts();
```

Add all the accounts to our List.

```java
        for (Account account : accounts){
        	ListItem item = new ListItem();
        	item.name = account.name;
        	item.type = account.type;	
        	list.add(item);	
        }
```

Reference a ListView

```java
        ListView listView1 = (ListView)findViewById(R.id.listview1);
```

Set the adapter

```java
        ListItem[] array = new ListItem[list.size()];	// array𐶐
        ListItemAdapter listItemAdapter = new ListItemAdapter(this, R.layout.list_item, list.toArray(array));	// arrayAdapter𐶐.
        listView1.setAdapter(listItemAdapter);	// listItemAdapter
```


Here is the full code

```java
package com.bgstation0.android.sample.account_;
import java.util.ArrayList;
import android.accounts.Account;
import android.accounts.AccountManager;
import android.app.Activity;
import android.os.Bundle;
import android.view.Menu;
import android.view.MenuItem;
import android.widget.ListView;
//end
public class MainActivity extends Activity {
//end
    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);
        //end
        AccountManager accountManager = AccountManager.get(this);	// accountManager
        //end
        
        ArrayList<ListItem> list = new ArrayList<ListItem>();
        //end
        Account[] accounts = accountManager.getAccounts();
        //end
        for (Account account : accounts){
        	ListItem item = new ListItem();
        	item.name = account.name;
        	item.type = account.type;	
        	list.add(item);	
        }
        //end
        ListView listView1 = (ListView)findViewById(R.id.listview1);
        //end
        
        ListItem[] array = new ListItem[list.size()];	// array𐶐
        ListItemAdapter listItemAdapter = new ListItemAdapter(this, R.layout.list_item, list.toArray(array));	// arrayAdapter𐶐.
        listView1.setAdapter(listItemAdapter);	// listItemAdapter
        //end
        
    }
    
}
```

### Run

Simply copy the source code into your Android Project,Build and Run. 


## Example 2: Initialize AccountManager

This tutorial will help you learn the following concepts:

1. How to get the AccountManager

This example will comprise the following files:

- `MainActivity.java`

### Step 1: Create Project

1. Open your `AndroidStudio` IDE.
2. Go to `File-->New-->Project` to create a new project.

### Step 2: Dependencies

No dependencies are needed.

### Step 3: Design Layouts


***(a). `activity_main.xml`**

Create a file named `activity_main.xml` and design it as follows:

```xml
<RelativeLayout xmlns:android="http://schemas.android.com/apk/res/android"
    xmlns:tools="http://schemas.android.com/tools"
    android:layout_width="match_parent"
    android:layout_height="match_parent"
    tools:context="${relativePackage}.${activityClass}" >

    <TextView
        android:layout_width="wrap_content"
        android:layout_height="wrap_content"
        android:text="@string/hello_world" />

</RelativeLayout>
```

### Step 4: Write Code

Write Code as follows:

***(a). `MainActivity.java`**

Create a file named `MainActivity.java`

Simply use the the `get()` method and pass in the context

```java
        AccountManager accountManager = AccountManager.get(this);
```

Then you can cast it to string and show it:

```java
        Toast.makeText(this, "accountManager = " + accountManager.toString(), Toast.LENGTH_LONG).show();	// accountManagero.
```


Here is the full code

```java
package com.bgstation0.android.sample.accountmanager_;

import android.accounts.AccountManager;
import android.app.Activity;
import android.os.Bundle;
import android.view.Menu;
import android.view.MenuItem;
import android.widget.Toast;

public class MainActivity extends Activity {

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);
        
        AccountManager accountManager = AccountManager.get(this);
        //end
        Toast.makeText(this, "accountManager = " + accountManager.toString(), Toast.LENGTH_LONG).show();	// accountManagero.
        //end
    }
    
}
```

### Run

Simply copy the source code into your Android Project,Build and Run. 

## Example 3: Get AccountManager and Show it

This tutorial will help you learn the following concepts:

1. How to get the AccountManager and show it in a `Toast` message

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
<RelativeLayout xmlns:android="http://schemas.android.com/apk/res/android"
    xmlns:tools="http://schemas.android.com/tools"
    android:layout_width="match_parent"
    android:layout_height="match_parent"
    tools:context="${relativePackage}.${activityClass}" >

    <TextView
        android:layout_width="wrap_content"
        android:layout_height="wrap_content"
        android:text="@string/hello_world" />

</RelativeLayout>
```

### Step 4: Write Code

Write Code as follows:

***(a). `MainActivity.java`**

Create a file named `MainActivity.java`

Import AccountManager among other imports:

```java
import android.accounts.AccountManager;
import android.app.Activity;
import android.os.Bundle;
import android.view.Menu;
import android.view.MenuItem;
import android.widget.Toast;
```

Create a MainActivity

```java
public class MainActivity extends Activity {
```

Override the onCreate:

```java
    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);
```

Invoke the `AccountManager.get()`, passing in the context and cast it to string then show in a `Toast` message

```java
        Toast.makeText(this, AccountManager.get(this).toString(), Toast.LENGTH_LONG).show();	// AccountManager.get(this)g[Xg\.
```


Here is the full code

```java
package com.bgstation0.android.sample.accountmanager_;
import android.accounts.AccountManager;
import android.app.Activity;
import android.os.Bundle;
import android.view.Menu;
import android.view.MenuItem;
import android.widget.Toast;
//end
public class MainActivity extends Activity {
//end
    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);
        //end
        Toast.makeText(this, AccountManager.get(this).toString(), Toast.LENGTH_LONG).show();	// AccountManager.get(this)g[Xg\.
        //end
    }
    
}
```

### Run

Simply copy the source code into your Android Project,Build and Run. 

## Example 4: List All Accounts

This example will comprise the following files:

- `ListItem.java`
- `ListItemAdapter.java`
- `MainActivity.java`

### Step 1: Create Project

1. Open your `AndroidStudio` IDE.
2. Go to `File-->New-->Project` to create a new project.

### Step 2: Dependencies

No dependencies are needed.

### Step 3: Design Layouts

***(a). `activity_main.xml`**

Create a file named `activity_main.xml` and design it as follows:

```xml
<LinearLayout xmlns:android="http://schemas.android.com/apk/res/android"
    android:layout_width="match_parent"
    android:layout_height="match_parent"
    android:orientation="vertical" >

    <ListView android:id="@+id/listview1"
        android:layout_width="fill_parent"
        android:layout_height="wrap_content" />
    
</LinearLayout>
```
***(b). `list_item.xml`**

Create a file named `list_item.xml` and design it as follows:

```xml
<?xml version="1.0" encoding="utf-8"?>
<LinearLayout xmlns:android="http://schemas.android.com/apk/res/android"
    android:layout_width="match_parent"
    android:layout_height="match_parent"
    android:orientation="vertical" >
    
    <TextView android:id="@+id/list_item_name"
        android:layout_width="fill_parent"
        android:layout_height="wrap_content" />

</LinearLayout>
```

### Step 4: Write Code

Write Code as follows:

***(a). `ListItem.java`**

Create a file named `ListItem.java`


Here is the full code

```java
package com.bgstation0.android.sample.accountmanager_;

// XgACeNXListItem
public class ListItem {	// ListItem̒`.
	public String name;	// O.
}
```

***(b). `ListItemAdapter.java`**

Create a file named `ListItemAdapter.java`


Here is the full code

```java
package com.bgstation0.android.sample.accountmanager_;

import android.content.Context;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.ArrayAdapter;
import android.widget.TextView;

// ListItempA_v^[ListItemAdapter
public class ListItemAdapter extends ArrayAdapter<ListItem> {

	// otB[h̒`.
	LayoutInflater mInflater = null;	// mInflaternullŏ.
	
	// RXgN^
	public ListItemAdapter(Context context, int resource, ListItem[] objects){
		super(context, resource, objects);	// eRXgN^.
		mInflater = (LayoutInflater)context.getSystemService(context.LAYOUT_INFLATER_SERVICE);	// mInflater̎擾.
	}
	
	// ACe\̃JX^}CY.
	@Override
	public View getView(int position, View convertView, ViewGroup parent){
		// convertViewnull̎.
		if (convertView == null){
			convertView = mInflater.inflate(R.layout.list_item, null);	// nullȂ琶.
		}
		TextView tvName = (TextView)convertView.findViewById(R.id.list_item_name);	// tvName擾.
		tvName.setText(getItem(position).name);	// nameZbg.
		return convertView;	// convertViewԂ.
	}
	
}
```

***(c). `MainActivity.java`**

Create a file named `MainActivity.java`


Here is the full code

```java
package com.bgstation0.android.sample.accountmanager_;

import java.util.ArrayList;

import android.accounts.Account;
import android.accounts.AccountManager;
import android.app.Activity;
import android.os.Bundle;
import android.view.Menu;
import android.view.MenuItem;
import android.widget.ArrayAdapter;
import android.widget.ListView;
import android.widget.Toast;

public class MainActivity extends Activity {

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);
        
        // AccountManagerIuWFNg擾, \.
        AccountManager accountManager = AccountManager.get(this);	// accountManagerɊi[.
        
        // AJEgXg̎擾.
        ArrayList<ListItem> list = new ArrayList<ListItem>();	// list𐶐.
        Account[] accounts = accountManager.getAccounts();	// accountManager.getAccountsaccounts擾.
        for (Account account : accounts){	// accountsaccountôvfJԂ.
        	ListItem item = new ListItem();	// item𐶐.
        	item.name = account.name;	// item.nameaccount.nameZbg.
        	list.add(item);	// list.additemǉ.
        }
        
        // listView1̎擾.
        ListView listView1 = (ListView)findViewById(R.id.listview1);	// listView1擾.
        
        // ListItemAdapter̐.
        ListItem[] array = new ListItem[list.size()];	// array𐶐.
        ListItemAdapter listItemAdapter = new ListItemAdapter(this, R.layout.list_item, list.toArray(array));	// arrayAdapter𐶐.
        listView1.setAdapter(listItemAdapter);	// listItemAdapterZbg.
        
    }
    
}
```

### Run

Simply copy the source code into your Android Project,Build and Run. 



## Example 5: Get Accounts By Type

This tutorial will help you learn the following concepts:

1. How to get Accounts by Type in an Android Device

This example will comprise the following files:

- `ListItem.java`
- `ListItemAdapter.java`
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

    <ListView android:id="@+id/listview1"
        android:layout_width="fill_parent"
        android:layout_height="wrap_content" />
    
</LinearLayout>
```
***(b). `list_item.xml`**

Create a file named `list_item.xml` and design it as follows:

```xml
<?xml version="1.0" encoding="utf-8"?>
<LinearLayout xmlns:android="http://schemas.android.com/apk/res/android"
    android:layout_width="match_parent"
    android:layout_height="match_parent"
    android:orientation="vertical" >
    
    <TextView android:id="@+id/list_item_name"
        android:layout_width="fill_parent"
        android:layout_height="wrap_content" />

    <TextView android:id="@+id/list_item_type"
        android:layout_width="fill_parent"
        android:layout_height="wrap_content" />
    
</LinearLayout>
```

### Step 4: Write Code

Write Code as follows:

***(a). `ListItem.java`**

Create a file named `ListItem.java`

Create a simple model class

```java
public class ListItem {
	public String name;
	public String type;	
}
```


Here is the full code

```java
package com.bgstation0.android.sample.accountmanager_;

public class ListItem {
	public String name;
	public String type;	
}
//end
```

***(b). `ListItemAdapter.java`**

Create a file named `ListItemAdapter.java`

Extend the `ArrayAdapter`

```java
public class ListItemAdapter extends ArrayAdapter<ListItem> {
```

```

Create the constructor

```java
	public ListItemAdapter(Context context, int resource, ListItem[] objects){
		super(context, resource, objects);
		mInflater = (LayoutInflater)context.getSystemService(context.LAYOUT_INFLATER_SERVICE);
	}
```

Override the `getView()` method. We inflate our `list_item` layout here:

```java
	@Override
	public View getView(int position, View convertView, ViewGroup parent){
		// convertViewnull̎.
		if (convertView == null){
			convertView = mInflater.inflate(R.layout.list_item, null);
		}
		TextView tvName = (TextView)convertView.findViewById(R.id.list_item_name);	// tvName.
		tvName.setText(getItem(position).name);	// name.
		TextView tvType = (TextView)convertView.findViewById(R.id.list_item_type);	// tvType.
		tvType.setText(getItem(position).type);	// type.
		return convertView;	// convertViewԂ.
	}
```


Here is the full code

```java
package com.bgstation0.android.sample.accountmanager_;

import android.content.Context;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.ArrayAdapter;
import android.widget.TextView;

public class ListItemAdapter extends ArrayAdapter<ListItem> {
//end
	//Initialize the `LayoutInflater` to null
	LayoutInflater mInflater = null;
	//end
	public ListItemAdapter(Context context, int resource, ListItem[] objects){
		super(context, resource, objects);
		mInflater = (LayoutInflater)context.getSystemService(context.LAYOUT_INFLATER_SERVICE);
	}
	//end
	
	@Override
	public View getView(int position, View convertView, ViewGroup parent){
		// convertViewnull̎.
		if (convertView == null){
			convertView = mInflater.inflate(R.layout.list_item, null);
		}
		TextView tvName = (TextView)convertView.findViewById(R.id.list_item_name);	// tvName.
		tvName.setText(getItem(position).name);	// name.
		TextView tvType = (TextView)convertView.findViewById(R.id.list_item_type);	// tvType.
		tvType.setText(getItem(position).type);	// type.
		return convertView;	// convertViewԂ.
	}
		//end
	
}
```

***(c). `MainActivity.java`**

Create a file named `MainActivity.java`

Add your imports

```java
import java.util.ArrayList;
import android.accounts.Account;
import android.accounts.AccountManager;
import android.app.Activity;
import android.os.Bundle;
import android.view.Menu;
import android.view.MenuItem;
import android.widget.ArrayAdapter;
import android.widget.ListView;
import android.widget.Toast;
```

Extend the `Activity` class:

```java
public class MainActivity extends Activity {
```

```

Get the AccountManager instance:

```java
        AccountManager accountManager = AccountManager.get(this);
```

Create an arraylist of ListItem objects

```java
        ArrayList<ListItem> list = new ArrayList<ListItem>();
```

If you want to get Accounts use the `getAccounts()` method

```java
        //Account[] accounts = accountManager.getAccounts();	// accountManager.getAccounts()
```

 To get the accounts  by type use the `getAccountsByType()` method as shown below:

```java
        Account[] accounts = accountManager.getAccountsByType("com.google");
```

Now loop through the accounts and add them to our List

```java
        for (Account account : accounts){
        	ListItem item = new ListItem();
        	item.name = account.name;
        	item.type = account.type;
        	list.add(item);
        }
```

Prepare a ListView

```java
        ListView listView1 = (ListView)findViewById(R.id.listview1);
```

Bind the accounts to our adapter and then the adapter to the ListView:

```java
        ListItem[] array = new ListItem[list.size()];	// array𐶐.
        ListItemAdapter listItemAdapter = new ListItemAdapter(this, R.layout.list_item, list.toArray(array));	// arrayAdapter𐶐.
        listView1.setAdapter(listItemAdapter);	
```


Here is the full code

```java
package com.bgstation0.android.sample.accountmanager_;

import java.util.ArrayList;
import android.accounts.Account;
import android.accounts.AccountManager;
import android.app.Activity;
import android.os.Bundle;
import android.view.Menu;
import android.view.MenuItem;
import android.widget.ArrayAdapter;
import android.widget.ListView;
import android.widget.Toast;
//end
public class MainActivity extends Activity {
//end
//Override the `onCreate()`:
    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);
        //end
        
        AccountManager accountManager = AccountManager.get(this);
        //end
        
        ArrayList<ListItem> list = new ArrayList<ListItem>();
        //end
        //Account[] accounts = accountManager.getAccounts();	// accountManager.getAccounts()
        //end
        Account[] accounts = accountManager.getAccountsByType("com.google");
        //end
        for (Account account : accounts){
        	ListItem item = new ListItem();
        	item.name = account.name;
        	item.type = account.type;
        	list.add(item);
        }
        //end
        
        ListView listView1 = (ListView)findViewById(R.id.listview1);
        //end
        
        ListItem[] array = new ListItem[list.size()];	// array𐶐.
        ListItemAdapter listItemAdapter = new ListItemAdapter(this, R.layout.list_item, list.toArray(array));	// arrayAdapter𐶐.
        listView1.setAdapter(listItemAdapter);	
        //end
        
    }
    
}
```

### Run

Simply copy the source code into your Android Project,Build and Run. 


[if exists]
# More Concepts and Examples

Here are some more 

[loop type=post taxonomy=chapter term=coil orderby=date order=asc]
<h2>[field title-link] </h2>
[content more=true link=false]
<a href="[field url]">Read More.</a>
[/loop]

[else]
  
[/if]

