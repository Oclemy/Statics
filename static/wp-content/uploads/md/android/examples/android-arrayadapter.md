# ArrayAdapter Examples


_ArrayAdapter is concrete class that derives from the BaseAdapter and is backed by an array of arbitrary objects._

ArrayAdapter requires us to pass a single TextView as a resource as the layout. This is for simple layouts where you don't have to create a custom adapter.

For complex layouts you can create your own adapter that derives from this class.

ArrayAdapter can take as the data source as Lists, String Arrays or Arrays of custom objects.

If you use an Array of custom objects then be sure to override the toString() method so as to customize the string that will get displayed in the adapterview.

#### ArrayAdapter Definition

ArrayAdapter resides in the `android.widget` package:

```java
package android.widget;
```

It derives from BaseAdapter:

```java
public class ArrayAdapter extends BaseAdapter..{}
```

And implements Filterable and ThemedSpinnerAdapter interfaces:

```java
public class ArrayAdapter extends BaseAdapter implements Filterable ThemedSpinnerAdapter{}
```

#### Creating ArrayAdapter Instance

ArrayAdapter provides several constructors for its creation. All these constructors must take at least a Context object and resource integer.

| No. | Constructor |
| --- | --- |
| 1. | `ArrayAdapter(Context context, int resource)` |
| 2. | `ArrayAdapter(Context context, int resource, int textViewResourceId)` |
| 3. | `ArrayAdapter(Context context, int resource, T[] objects)` |
| 4. | `ArrayAdapter(Context context, int resource, int textViewResourceId, T[] objects)` |
| 5. | `ArrayAdapter(Context context, int resource, List<T> objects)` |
| 6. | `ArrayAdapter(Context context, int resource, int textViewResourceId, List<T> objects)` |

#### Creating ArrayAdapter From Resource

Not only can arrayadapter be creating using constructors but it can also be created from an external resource.

Android provides a createfromresource() method which is static. This method returns us an ArrayAdapter instance.

#### Binding Lists and Arrays into an ArrayAdapter

You can bind a list of objects or an array into an ArrayAdapter via the constructor. For array:

```java
ArrayAdapter(Context context, int resource, T[] objects)
```

For List:

```java
ArrayAdapter(Context context, int resource, List<T> objects)
```

EXAMPLE:

```java
ArrayAdapter myArrayAdapter = new ArrayAdapter(MainActivity.this,android.R.layout.simple_list_item_1,galaxiesList)
```

#### Adding Individual Elements into an ArrayAdapter

Or you can add items individually to an already existing ArrayAdapter or a collection of elements into an existing ArrayAdapter.

To add an object:

```java
myArrayAdapter.add(T object)
```

This will add the specified object to the end of our arrayadapter.

To add a collection:

```java
myArrayAdapter.addAll(Collection<? extends T> collection)
```

This will add a Collection to the end of our adapter.

Or add a list that is not necessarily a collection, like say an array:

```java
myArrayAdapter.addAll(T... items)
```

where T is an Object.

#### Clearing the ArrayAdapter

This will remove everything from the adapter:

```java
myArrayAdapter.clear()
```

#### Getting the total number of items in the ArrayAdapter

We can get the count of items in the arrayadapter using the `getCount()` method:

```java
int total = myArrayAdapter.getCount();
```

#### Getting a particular item from an ArrayAdapter

You can obtain item from an ArrayAdapter:

```java
Object myItem = myArrayAdapter.getItem(position);
```

You pass the position, an integer.

#### Getting the Position of a Known Object

Sometimes you don't know the position of an object, but you know the object. So you can get the position by passing the item to the `getPosition()` method.

```java
int itemPosition = myArrayAdapter.getPosition(item);
```

### ArrayAdapter Examples

#### 1\. Android ArrayAdapter - ListView and ArrayList

_Android ArrayAdapter - ListView and ArrayList tutorial._

Adapters like ArrayAdapter help bridge the gap between model data and the adapterview,two very different stuff with different responsibilities.Our model data represents our data source.

It maybe from a database or a simple data collection,like say array or arraylist.The adapterview represents the visual representations.They are view children hence are concerned with showing data.

Adapterviews include ListViews,GridViews and spinner. Our adapter shall help link these two. ArrayAdapters work with an array or java.util.List instance.

It takes :

1. Context.
2. Resource ID of the view to be used in the adapterview.
3. List of data to be bound.

##### What we do :

- Fill our adapterview with data.
- Our adapterview in this case is a simple ListView.
- We use ArrayAdapter as our adapter.
- Our data source is an arraylist.
- So we instantiate and set to our listview using the setAdapter() method.
- While instantiating our adapter we need to pass a context,layout and data source.
- We handle our itemclicks and show a simple toast message.

##### What You do :

- Create a project in android studio.
- Give it a name and choose minimum and target SDKs.

**SECTION 1 : Our Dependencies**

#### Build.Gradle

- Android Studio has added for us dependencies for AppCompat and Design support libraries.
- Note we are subclassing AppCompatActivity to make our MainActivity class an activity.

```groovy
    dependencies {
        compile fileTree(dir: 'libs', include: ['*.jar'])
        testCompile 'junit:junit:4.12'
        compile 'com.android.support:appcompat-v7:24.2.0'

    }
```

##### Our MainActivity

Main Responsibility : LAUNCH OUR APP.

- It extends AppcompatActivity hence is an activity.
- Activities are the entry point of android applications.This is no exception.
- It loads our activity layout.
- Our activity layout has our ListView.
- We therefore reference that ListView and set its adapter.
- We first instantiate our arrayadapter,passing in context,layout and data source.
- Our arrayadapter is of generic type string.
- To set our adapter to listview we use the setAdapter() method.
- Our data source is a simple arraylist.

```java
    package com.tutorials.hp.listviewarraylist;

    import android.support.v7.app.AppCompatActivity;
    import android.os.Bundle;
    import android.view.View;
    import android.widget.AdapterView;
    import android.widget.ArrayAdapter;
    import android.widget.ListView;
    import android.widget.Toast;

    import java.util.ArrayList;

    public class MainActivity extends AppCompatActivity {

        ArrayList<String> numbers=new ArrayList<>();
        ListView lv;

        @Override
        protected void onCreate(Bundle savedInstanceState) {
            super.onCreate(savedInstanceState);
            setContentView(R.layout.activity_main);

            lv = (ListView) findViewById(R.id.lv);

            //FILL DATA
            fillData();

            //ADAPTER
            ArrayAdapter<String> adapter = new ArrayAdapter<String>(this, android.R.layout.simple_list_item_1, numbers);
            lv.setAdapter(adapter);

            //LISTENER
            lv.setOnItemClickListener(new AdapterView.OnItemClickListener() {
                @Override
                public void onItemClick(AdapterView<?> adapterView, View view, int i, long l) {
                    Toast.makeText(MainActivity.this, numbers.get(i), Toast.LENGTH_SHORT).show();
                }
            });
        }

        //FILL DATA
        private void fillData()
        {
            for (int i=0;i<10;i++)
            {
                numbers.add("Number "+String.valueOf(i));
            }
        }
    }
```

#### SECTION 3 : Our Layouts

##### ActivityMain.xml Layout.

- Inflated as our activity's view.
- Add ListView here.

```xml
    <?xml version="1.0" encoding="utf-8"?>
    <RelativeLayout 
        
        android:layout_width="match_parent"
        android:layout_height="match_parent"
        android:paddingBottom="@dimen/activity_vertical_margin"
        android:paddingLeft="@dimen/activity_horizontal_margin"
        android:paddingRight="@dimen/activity_horizontal_margin"
        android:paddingTop="@dimen/activity_vertical_margin"
        tools:context="com.tutorials.hp.listviewarraylist.MainActivity">

        <ListView
            android:id="@+id/lv"
            android:layout_width="match_parent"
            android:layout_height="wrap_content"
             />
    </RelativeLayout>
```
