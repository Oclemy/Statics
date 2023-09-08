# Android Common Intent Examples

In this tutorial we will be exploring some common Intents you can use to make use of different ready-made functionalities in your android device.


## Example 1: Google Search EditText Value

This example will teach you how to invoke Google Search and search edittext values. The user types values in an edittext and when a button is clicked we open the Google Search engine in a browser and search the values the user had typed.

Check the demo screenshot below:

### Step 1: Create Project

Start by creating an empty `Android Studio` project.

### Step 2: Dependencies

No special or third party dependency is needed for this project.

### Step 3: Design Layout

We will have a simple layout with a button and edittext where the user will enter the search parameter:

**activity_main.xml**

```xml
<?xml version="1.0" encoding="utf-8"?>
<LinearLayout xmlns:android="http://schemas.android.com/apk/res/android"
              android:orientation="vertical"
              android:layout_width="match_parent"
              android:layout_height="match_parent">

    <EditText
        android:layout_width="match_parent"
        android:layout_height="wrap_content"
        android:id="@+id/textEntered"
        android:layout_gravity="center_horizontal"
        android:hint="Enter word to search..."/>
    <Button
        android:layout_width="wrap_content"
        android:layout_height="wrap_content"
        android:text="Search"
        android:id="@+id/btnSearch" android:layout_gravity="center_horizontal"/>
</LinearLayout>
```

### Step 4: Write Code

Here is how you invoke the Google search engine with a word to search via Intent:

```java
                Intent intent=new Intent(Intent.ACTION_VIEW,Uri.parse("http://www.google.com?q="+data));
                startActivity(intent);
```

Here's the full code:

**MainActivity.java**

```java

import android.app.Activity;
import android.content.Intent;
import android.net.Uri;
import android.os.Bundle;
import android.view.View;
import android.view.View.OnClickListener;
import android.widget.Button;
import android.widget.EditText;

public class MainActivity extends Activity {

    EditText textSearch;
    Button btnSearch;
    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);

        textSearch=(EditText)findViewById(R.id.textEntered);
        btnSearch=(Button)findViewById(R.id.btnSearch);

        btnSearch.setOnClickListener(new OnClickListener() {
            @Override
            public void onClick(View view) {

                String data=textSearch.getText().toString();

                Intent intent=new Intent(Intent.ACTION_VIEW,Uri.parse("http://www.google.com?q="+data));
                startActivity(intent);
            }
        });
    }
}
```

### Run

Copy the code or download it in the link below, build and run.

### Reference

Here are the reference links:

| Number | Link |
| --- | --- |
| 1. | [Download](https://github.com/AnkitKumar111/Android_Assignment7.1/archive/refs/heads/master.zip) Example |
| 2. | [Follow](https://github.com/AnkitKumar111/) code author |

## Example 2: How to Programmatically Open Contacts Page

This example teaches you how you can programmatically open the Contacts Page in your Android device where you can view or create contacts. We do this via Intent.

Below is the demo screenshot:

### Step 1: Create Project

Start by creating an empty `Android Studio` project.

### Step 2: Dependencies

No external or special dependency is needed for this project.

### Step 3: Design Layout

Simple add a button to your layout. When that button is clicked we will open the Contacts Page:

**activity_main.xml**

```xml
<RelativeLayout xmlns:android="http://schemas.android.com/apk/res/android"
                xmlns:tools="http://schemas.android.com/tools"
                android:layout_width="match_parent"
                android:layout_height="match_parent"
                android:paddingLeft="@dimen/activity_horizontal_margin"
                android:paddingRight="@dimen/activity_horizontal_margin"
                android:paddingTop="@dimen/activity_vertical_margin"
                android:paddingBottom="@dimen/activity_vertical_margin"
                tools:context=".MainActivity">

    <Button
        android:layout_width="wrap_content"
        android:layout_height="wrap_content"
        android:text="Open Contacts Page"
        android:id="@+id/btnContact" android:layout_alignParentTop="true"
        android:layout_alignParentLeft="true" android:layout_alignParentStart="true"
        android:layout_alignParentRight="true" android:layout_alignParentEnd="true"/>
</RelativeLayout>
```

### Step 4: Write Code

Here is how we open the Contacts App in our Phone via Intent:

```java
                Intent intent = new Intent(Intent.ACTION_VIEW,
                        Uri.parse("content://contacts/people/"));
                startActivity(intent);
```

Here is the full code:

**MainActivity.java**

```java
import android.app.Activity;
import android.content.Intent;
import android.net.Uri;
import android.os.Bundle;
import android.view.View;
import android.view.View.OnClickListener;
import android.widget.Button;

public class MainActivity extends Activity {

    Button btnContact;
    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);

        btnContact=(Button)findViewById(R.id.btnContact);
        btnContact.setOnClickListener(new OnClickListener() {
            @Override
            public void onClick(View view) {

                Intent intent = new Intent(Intent.ACTION_VIEW,
                        Uri.parse("content://contacts/people/"));
                startActivity(intent);
            }
        });

    }
}
```

### Run

Copy the code or download it in the link below, build and run.

### Reference

Here are the reference links:

| Number | Link |
| --- | --- |
| 1. | [Download](https://github.com/AnkitKumar111/Android_Assignment7.2/archive/refs/heads/master.zip) Example |
| 2. | [Follow](https://github.com/AnkitKumar111/) code author |
