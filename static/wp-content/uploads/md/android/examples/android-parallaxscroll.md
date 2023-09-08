# Android ParallaxScroll Tutorial and Examples


_Android Paralax Scroll Library Tutorial and Example._

ParallaxScroll is a library that provides us with Parallax ScrollView and ListView for Android.


ParallaxScroll enriches us with these special adapterviews:

1. ParallaxListView.
2. ParallaxExpandableListView.
3. ParallaxScrollView.

This library was created by [Nir Hartmann](https://github.com/nirhart).

The library has existed for more than 5 years and is still actively maintained. It also has examples which we will explore later on.

ParallaxScroll supports `Android 1.6` and above.

#### Demo

See the demo app at Google Play [here](https://play.google.com/store/apps/details?id=com.nirhart.parallaxscrollexample).

#### ParallaxScrollView internal Details

Let's explore the internal specifics of Parallax before jumping to usage examples. We want to see the several classes from which the library is built so that we can even extend.

##### (a). ParallaxScrollView

This is class that internally derives from ScrollView.

You all know that a scrollview is a Layout container for a view hierarchy that can be scrolled by the user, allowing it to be larger than the physical display.

Like most View resources, `ParallaxScrollView` exposes three public constructors:

```java
    public ParallaxScrollView(Context context, AttributeSet attrs, int defStyle) {
    }

    public ParallaxScrollView(Context context, AttributeSet attrs) {
    }

    public ParallaxScrollView(Context context) {
    }
```

##### (a). ParallaxListView

`ParallaxListView` derives from the [ListView](https://camposha.info/android/listview) class:

```java
public class ParallaxListView extends ListView {..}
```

It also has three constructors we can use to create it's instance:

```java
    public ParallaxListView(Context context, AttributeSet attrs, int defStyle) {
    }

    public ParallaxListView(Context context, AttributeSet attrs) {
    }

    protected void init(Context context, AttributeSet attrs) {
    }
```

It goes ahead and exposes us some methods we can use apart from the normall ListView methods:

```java
    @Override
    public void setOnScrollListener(OnScrollListener l);

    public void addParallaxedHeaderView(View v);
    public void addParallaxedHeaderView(View v, Object data, boolean isSelectable) ;
```

##### (c). ParallaxExpandableListView

`ParallaxExpandableListView` adds parallax scroll to an ExpandableListView from which it derives.

```java
public class ParallaxExpandableListView extends ExpandableListView {..}
```

This class provides us two constructors for object creation:

```java
    public ParallaxExpandableListView(Context context, AttributeSet attrs, int defStyle) {
    }

    public ParallaxExpandableListView(Context context, AttributeSet attrs) {

    }
```

Here are some of the methods we can use apart from those we derive from ExpandableListView.

```java
    @Override
    public void setOnScrollListener(OnScrollListener l) {
    }

    public void addParallaxedHeaderView(View v) {
        super.addHeaderView(v);
    }

    public void addParallaxedHeaderView(View v, Object data, boolean isSelectable) {
    }
```

#### Installing ParallaxScroll

You can install ParallaxScroll from it's maven repository via gradle.

All you need in android 1.6 and above. Then you add the following implementation statement in your app level build.gradle:

```groovy
implementation 'com.github.nirhart:parallaxscroll:1.0'
```

Then you sync the project to add the library files into your project.

#### Using ParallaxScroll

Let's say you want to use a `ScrollView`, then you can add the following in your layout.

```xml
<com.nirhart.parallaxscroll.views.ParallaxScrollView

    android_layout_width="match_parent"
    android_layout_height="match_parent"
    app_parallax_factor="1.9"
    tools_context=".MainActivity" >

    <LinearLayout
        android_layout_width="match_parent"
        android_layout_height="wrap_content"
        android_orientation="vertical" >

        <TextView
            android_layout_width="match_parent"
            android_layout_height="200dp"
            android_background="@drawable/item_background"
            android_gravity="center"
            android_text="PARALLAXED"
            android_textSize="50sp"
            tools_ignore="HardcodedText" />

        <TextView
            android_layout_width="match_parent"
            android_layout_height="wrap_content"
            android_text="Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.    Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
            android_textSize="26sp"
            android_background="@android:color/white"
            android_padding="5dp"
            tools_ignore="HardcodedText" />
    </LinearLayout>

</com.nirhart.parallaxscroll.views.ParallaxScrollView>
```

In that case we've used a `ParallaxScrollView` and placed inside it a [LinearLayout](https://camposha.info/android/linearlayout) with Text content that will be scrolled.

Well you can also add a `ParallaxListView` and `ParallaxExpandableListView` in your layout.

#### Full ParallaxScroll Examples.

Here's an example.

##### 1\. Single Parallax ListView example.

Let's start by looking at a our SingleParallaxListView example.

##### (a). CustomListAdapter.java

We start by writing our adapter class. It will derive from BaseAdapter.

```java
package com.nirhart.parallaxscrollexample;

import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.BaseAdapter;
import android.widget.TextView;

public class CustomListAdapter extends BaseAdapter {

    private LayoutInflater inflater;

    public CustomListAdapter(LayoutInflater inflater) {
        this.inflater = inflater;
    }

    @Override
    public int getCount() {
        return 20;
    }

    @Override
    public Object getItem(int position) {
        return null;
    }

    @Override
    public long getItemId(int position) {
        return 0;
    }

    @Override
    public View getView(int position, View convertView, ViewGroup parent) {
        TextView textView = (TextView) convertView;
        if (textView == null)
            textView = (TextView) inflater.inflate(R.layout.item, null);
        textView.setText("Item " + position);
        return textView;
    }
}
```

##### (b). SingleParallaxListView.java

This is our [activity](https://camposha.info/android/activity) class. This activity will contain our ParallaxListView.

```java
package com.nirhart.parallaxscrollexample;

import android.app.Activity;
import android.content.Intent;
import android.net.Uri;
import android.os.Bundle;
import android.view.Gravity;
import android.view.LayoutInflater;
import android.view.Menu;
import android.view.MenuInflater;
import android.view.MenuItem;
import android.widget.TextView;

import com.nirhart.parallaxscroll.views.ParallaxListView;

public class SingleParallaxListView extends Activity {

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.list_one_parallax);
        ParallaxListView listView = (ParallaxListView) findViewById(R.id.list_view);
        CustomListAdapter adapter = new CustomListAdapter(LayoutInflater.from(this));

        TextView v = new TextView(this);
        v.setText("PARALLAXED");
        v.setGravity(Gravity.CENTER);
        v.setTextSize(40);
        v.setHeight(200);
        v.setBackgroundResource(R.drawable.item_background);

        listView.addParallaxedHeaderView(v);
        listView.setAdapter(adapter);
    }

    @Override
    public boolean onCreateOptionsMenu(Menu menu) {
        MenuInflater inflater = getMenuInflater();
        inflater.inflate(R.menu.main, menu);
        return true;
    }

    @Override
    public boolean onOptionsItemSelected(MenuItem item) {
        if (item.getItemId() == R.id.action_github) {
            Intent browserIntent = new Intent(Intent.ACTION_VIEW, Uri.parse("https://github.com/nirhart/ParallaxScroll"));
            startActivity(browserIntent);
        }
        return true;
    }
}
```

##### (c). list_one_parallax.xml

You can see this is the layout that will be inflated into our `SingleParallaxListView`.

```xml
<com.nirhart.parallaxscroll.views.ParallaxListView

    android_id="@+id/list_view"
    android_layout_width="match_parent"
    android_layout_height="match_parent"
    app_parallax_factor="1.9"
    tools_context=".MainActivity" />
```

##### 2\. Multi Parallax ListView example.

We are using the `CustomListAdapter` we had already defined.

##### (a). MultipleParallaxListView.java

```java
package com.nirhart.parallaxscrollexample;

import android.app.Activity;
import android.content.Intent;
import android.net.Uri;
import android.os.Bundle;
import android.view.LayoutInflater;
import android.view.Menu;
import android.view.MenuInflater;
import android.view.MenuItem;

import com.nirhart.parallaxscroll.views.ParallaxListView;

public class MultipleParallaxListView extends Activity {

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.list_multiple_parallax);
        ParallaxListView listView = (ParallaxListView) findViewById(R.id.list_view);
        CustomListAdapter adapter = new CustomListAdapter(LayoutInflater.from(this));
        listView.setAdapter(adapter);
    }

    @Override
    public boolean onCreateOptionsMenu(Menu menu) {
        MenuInflater inflater = getMenuInflater();
        inflater.inflate(R.menu.main, menu);
        return true;
    }

    @Override
    public boolean onOptionsItemSelected(MenuItem item) {
        if (item.getItemId() == R.id.action_github) {
            Intent browserIntent = new Intent(Intent.ACTION_VIEW, Uri.parse("https://github.com/nirhart/ParallaxScroll"));
            startActivity(browserIntent);
        }
        return true;
    }
}
```

##### (b) list_multiple_parallax.xml

```xml
<com.nirhart.parallaxscroll.views.ParallaxListView

    android_id="@+id/list_view"
    android_layout_width="match_parent"
    android_layout_height="match_parent"
    app_parallax_factor="1.9"
    app_circular_parallax="true"
    tools_context=".MainActivity" />
```

#### Single Parallax ScrollView Example

Let's now look at single parallax scrollview example.

##### (a). SingleParallaxScrollView.java

```java
package com.nirhart.parallaxscrollexample;

import android.app.Activity;
import android.content.Intent;
import android.net.Uri;
import android.os.Bundle;
import android.view.Menu;
import android.view.MenuInflater;
import android.view.MenuItem;

public class SingleParallaxScrollView extends Activity {

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.scroll_one_parallax);
    }

    @Override
    public boolean onCreateOptionsMenu(Menu menu) {
        MenuInflater inflater = getMenuInflater();
        inflater.inflate(R.menu.main, menu);
        return true;
    }

    @Override
    public boolean onOptionsItemSelected(MenuItem item) {
        if (item.getItemId() == R.id.action_github) {
            Intent browserIntent = new Intent(Intent.ACTION_VIEW, Uri.parse("https://github.com/nirhart/ParallaxScroll"));
            startActivity(browserIntent);
        }
        return true;
    }
}
```

##### (b) scroll_one_parallax.xml

```xml
<com.nirhart.parallaxscroll.views.ParallaxScrollView

    android_layout_width="match_parent"
    android_layout_height="match_parent"
    app_parallax_factor="1.9"
    tools_context=".MainActivity" >

    <LinearLayout
        android_layout_width="match_parent"
        android_layout_height="wrap_content"
        android_orientation="vertical" >

        <TextView
            android_layout_width="match_parent"
            android_layout_height="200dp"
            android_background="@drawable/item_background"
            android_gravity="center"
            android_text="PARALLAXED"
            android_textSize="50sp"
            tools_ignore="HardcodedText" />

        <TextView
            android_layout_width="match_parent"
            android_layout_height="wrap_content"
            android_text="Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.    Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
            android_textSize="26sp"
            android_background="@android:color/white"
            android_padding="5dp"
            tools_ignore="HardcodedText" />
    </LinearLayout>

</com.nirhart.parallaxscroll.views.ParallaxScrollView>
```

#### 4\. SingleParallaxAlphaScrollView Example

##### (a) SingleParallaxAlphaScrollView.java

```java
package com.nirhart.parallaxscrollexample;

import android.app.Activity;
import android.content.Intent;
import android.net.Uri;
import android.os.Bundle;
import android.view.Menu;
import android.view.MenuInflater;
import android.view.MenuItem;

public class SingleParallaxAlphaScrollView extends Activity {

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.scroll_one_parallax_alpha);
    }

    @Override
    public boolean onCreateOptionsMenu(Menu menu) {
        MenuInflater inflater = getMenuInflater();
        inflater.inflate(R.menu.main, menu);
        return true;
    }

    @Override
    public boolean onOptionsItemSelected(MenuItem item) {
        if (item.getItemId() == R.id.action_github) {
            Intent browserIntent = new Intent(Intent.ACTION_VIEW, Uri.parse("https://github.com/nirhart/ParallaxScroll"));
            startActivity(browserIntent);
        }
        return true;
    }
}
```

##### (b) scroll_one_parallax_alpha.xml

```xml
<com.nirhart.parallaxscroll.views.ParallaxScrollView

    android_layout_width="match_parent"
    android_layout_height="match_parent"
    app_parallax_factor="1.9"
    app_alpha_factor="1.9"
    tools_context=".MainActivity" >

    <LinearLayout
        android_layout_width="match_parent"
        android_layout_height="wrap_content"
        android_orientation="vertical" >

        <TextView
            android_layout_width="match_parent"
            android_layout_height="200dp"
            android_background="@drawable/item_background"
            android_gravity="center"
            android_text="PARALLAXED"
            android_textSize="50sp"
            tools_ignore="HardcodedText" />

        <TextView
            android_layout_width="match_parent"
            android_layout_height="wrap_content"
            android_text="Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.    Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
            android_textSize="26sp"
            android_background="@android:color/white"
            android_padding="5dp"
            tools_ignore="HardcodedText" />
    </LinearLayout>

</com.nirhart.parallaxscroll.views.ParallaxScrollView>
```

#### SingleParallax ExpandableListView Example

##### (a) CustomExpandableListAdapter.java

```java
package com.nirhart.parallaxscrollexample;

import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.BaseExpandableListAdapter;
import android.widget.TextView;

public class CustomExpandableListAdapter extends BaseExpandableListAdapter {

    private LayoutInflater inflater;

    public CustomExpandableListAdapter(LayoutInflater inflater) {
        this.inflater = inflater;
    }

    @Override
    public String getChild(int groupPosition, int childPosition) {
        return "Group " + groupPosition + ", child " + childPosition;
    }

    @Override
    public long getChildId(int groupPosition, int childPosition) {
        return 0;
    }

    @Override
    public View getChildView(int groupPosition, int childPosition, boolean isLastChild, View convertView, ViewGroup parent) {
        TextView textView = (TextView) convertView;
        if (textView == null)
            textView = (TextView) inflater.inflate(R.layout.item_child, null);
        textView.setText(getChild(groupPosition, childPosition));
        return textView;
    }

    @Override
    public int getChildrenCount(int groupPosition) {
        return groupPosition*2+1;
    }

    @Override
    public String getGroup(int groupPosition) {
        return "Group " + groupPosition;
    }

    @Override
    public int getGroupCount() {
        return 20;
    }

    @Override
    public long getGroupId(int groupPosition) {
        return 0;
    }

    @Override
    public View getGroupView(int groupPosition, boolean isExpanded, View convertView, ViewGroup parent) {
        TextView textView = (TextView) convertView;
        if (textView == null)
            textView = (TextView) inflater.inflate(R.layout.item, null);
        textView.setText(getGroup(groupPosition));
        return textView;
    }

    @Override
    public boolean hasStableIds() {
        return false;
    }

    @Override
    public boolean isChildSelectable(int groupPosition, int childPosition) {
        return false;
    }
}
```

##### (b) SingleParallaxExpandableListView.java

```java
package com.nirhart.parallaxscrollexample;

import android.app.Activity;
import android.content.Intent;
import android.net.Uri;
import android.os.Bundle;
import android.view.Gravity;
import android.view.LayoutInflater;
import android.view.Menu;
import android.view.MenuInflater;
import android.view.MenuItem;
import android.widget.TextView;

import com.nirhart.parallaxscroll.views.ParallaxExpandableListView;

public class SingleParallaxExpandableListView extends Activity {

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.expand_list_one_parallax);
        ParallaxExpandableListView listView = (ParallaxExpandableListView) findViewById(R.id.list_view);

        TextView v = new TextView(this);
        v.setText("PARALLAXED");
        v.setGravity(Gravity.CENTER);
        v.setTextSize(40);
        v.setHeight(200);
        v.setBackgroundResource(R.drawable.item_background);

        listView.addParallaxedHeaderView(v);
        CustomExpandableListAdapter adapter = new CustomExpandableListAdapter(LayoutInflater.from(this));
        listView.setAdapter(adapter);
    }

    @Override
    public boolean onCreateOptionsMenu(Menu menu) {
        MenuInflater inflater = getMenuInflater();
        inflater.inflate(R.menu.main, menu);
        return true;
    }

    @Override
    public boolean onOptionsItemSelected(MenuItem item) {
        if (item.getItemId() == R.id.action_github) {
            Intent browserIntent = new Intent(Intent.ACTION_VIEW, Uri.parse("https://github.com/nirhart/ParallaxScroll"));
            startActivity(browserIntent);
        }
        return true;
    }
}
```

##### (c) expand_list_one_parallax.xml

```xml
<com.nirhart.parallaxscroll.views.ParallaxExpandableListView

    android_id="@+id/list_view"
    android_layout_width="match_parent"
    android_layout_height="match_parent"
    app_parallax_factor="1.9"
    tools_context=".MainActivity" />
```

You can get full source samples below:

#### Download

Also check our video tutorial it's more detailed and explained in step by step.

| No. | Location | Link |
| --- | --- | --- |
| 1. | GitHub | [Direct Download](https://github.com/nirhart/ParallaxScroll/tree/master/ParallaxScrollExample) |
| 2. | GitHub | [Library](https://github.com/nirhart/ParallaxScroll) |
| 3. | Google Play | [Demo App](https://play.google.com/store/apps/details?id=com.nirhart.parallaxscrollexample) |

Credit to the Original Creator [@nirhart](https://github.com/nirhart)

#### How to Run

1. Download the project.
2. Go over to sample folder and edit import it to your android studio.Alternatively you can just copy paste the classes as well as the layouts and maybe other resources into your already created project.
3. Then edit the app level build/gradle to add our dependency as we had stated during the installation.
