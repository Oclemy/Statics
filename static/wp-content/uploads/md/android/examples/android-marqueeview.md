# MarqueeView Tutorial and Example


_MarqueeView is a custom slider view that can slide vertically and horizontally._


#### Installing MarqueeView

To install MarqueeView, add this in your dependencies DSL:

```groovy
implementation 'com.sunfusheng:marqueeview:<latest-version>'
```

#### MarqueeView Attributes

Here are some of the attributes of MarqueeView:

| Attribute | attribute | Description |
| --- | --- | --- |
| mvAnimDuration | One line of text animation execution time |
| mvInterval | Two lines of text turning time interval |
| mvTextSize | font size |
| mvTextColor | Text color |
| mvGravity | Text position: left, center, right |
| mvSingleLine | Single line setting |
| mvDirection | Animation scrolling direction: bottom_to_top, top_to_bottom, right_to_left, left_to_right |

#### Using in XML Layout

Here's how you can use MarqueeView in XML Layout:

```xml
<com.sunfusheng.marqueeview.MarqueeView
    android_id="@+id/marqueeView"
    android_layout_width="match_parent"
    android_layout_height="30dp"
    app_mvAnimDuration="1000"
    app_mvDirection="bottom_to_top"
    app_mvInterval="3000"
    app_mvTextColor="@color/white"
    app_mvTextSize="14sp"
    app_mvSingleLine="true"/>
```

#### MarqueeView Example Fragments and RecyclerView

Here's the app we will build.

Our app will have three tabs. The first Tab will show us Sayings, the second quotes and the third spaceships.

MarqueeView is easy to work with and can be included not only in top level UI like activity or fragment layout but also in adapterviews like RecyclerView or ListView.

Here's the video tutorial:

#### What we look at

We will look at an example that:

- Has 3 fragments that can be swiped and are accessible via tabs via TabLayout.
- The first two tabs will each show 5 MarqueeViews bound to text in strings.xml.
- The third tab or fragment will show a RecyclerView with either text or marqueeview.
- This marqueeview in the recyclerview will be bound to an arraylist.

#### Questions this Example helps answer?

- How do I use or install MarqueeView?
- How do I use MarqueeView in fragments?
- How do I use MarqueeView in recyclerview?
- Recyclerview with different view types.
- TabLayout with recyclerview.

#### Gradle Scripts

##### (a) Build.gradle

```groovy
dependencies {
    implementation fileTree(dir: 'libs', include: ['*.jar'])
    implementation 'com.android.support:appcompat-v7:28.0.0-alpha3'
    implementation 'com.android.support:design:28.0.0-alpha3'
    implementation 'com.android.support.constraint:constraint-layout:1.1.2'
    testImplementation 'junit:junit:4.12'
    implementation 'com.sunfusheng:marqueeview:1.3.3'
}
```

#### Layouts

Lets start by exploring the layouts in this project.

We have seven layouts:

##### 1\. activity_about.xml

Here we will add a [LinearLayout](https://camposha.info/android/linearlayout) as our root xml element.

Inside we will have a WebView. This will render our about page.

```xml
<?xml version="1.0" encoding="utf-8"?>
<LinearLayout

    android_layout_width="match_parent"
    android_layout_height="match_parent"
    android_orientation="vertical">

    <WebView
        android_id="@+id/webView"
        android_layout_width="match_parent"
        android_layout_height="match_parent"/>

</LinearLayout>
```

##### 2\. activity_main.xml

This is our main [activity's](https://camposha.info/android/activity) layout.

Here we have a tabLayout which will render our tabs. We will also have a ViewPager which allow us to swipe our [fragments](https://camposha.info/android/fragment).

```xml
<?xml version="1.0" encoding="utf-8"?>
<LinearLayout

    android_layout_width="match_parent"
    android_layout_height="match_parent"
    android_orientation="vertical">

    <android.support.design.widget.TabLayout
        android_id="@+id/tabLayout"
        android_layout_width="match_parent"
        android_layout_height="40dp"
        android_background="@color/orange"
        app_tabIndicatorColor="@color/white"
        app_tabSelectedTextColor="@color/white"
        app_tabTextColor="@color/half_transparent_white"/>

    <android.support.v4.view.ViewPager
        android_id="@+id/viewPager"
        android_layout_width="match_parent"
        android_layout_height="match_parent"/>
</LinearLayout>
```

##### 3\. divider_1px.xml

```xml
<?xml version="1.0" encoding="utf-8"?>
<View
    android_id="@+id/divider"

    android_layout_width="match_parent"
    android_layout_height="1px"
    android_background="@color/divider2"/>
```

##### 4\. divider_20dp.xml

```xml
<?xml version="1.0" encoding="utf-8"?>
<View
    android_id="@+id/divider"

    android_layout_width="match_parent"
    android_layout_height="20dp"
    android_background="@color/divider1"/>
```

##### 5\. fragment_tab.xml

```xml
<?xml version="1.0" encoding="utf-8"?>
<LinearLayout

    android_layout_width="match_parent"
    android_layout_height="match_parent"
    android_orientation="vertical">

    <com.sunfusheng.marqueeview.MarqueeView
        android_id="@+id/marqueeView"
        android_layout_width="match_parent"
        android_layout_height="30dp"
        android_background="@color/blue"
        android_paddingLeft="25dp"
        android_paddingRight="25dp"
        app_mvDirection="bottom_to_top"
        app_mvAnimDuration="1000"
        app_mvInterval="3000"
        app_mvSingleLine="true"/>

    <RelativeLayout
        android_layout_width="match_parent"
        android_layout_height="30dp"
        android_layout_marginLeft="20dp"
        android_layout_marginRight="20dp"
        android_layout_marginTop="20dp"
        android_background="@drawable/xml_oval_half_transparent_bg"
        android_paddingLeft="10dp"
        android_paddingRight="10dp">

        <ImageView
            android_id="@+id/iv_speaker1"
            android_layout_width="22dp"
            android_layout_height="22dp"
            android_layout_centerVertical="true"
            android_src="@mipmap/ic_loudspeaker"/>

        <com.sunfusheng.marqueeview.MarqueeView
            android_id="@+id/marqueeView1"
            android_layout_width="match_parent"
            android_layout_height="match_parent"
            android_layout_centerVertical="true"
            android_layout_marginLeft="8dp"
            android_layout_toRightOf="@+id/iv_speaker1"/>
    </RelativeLayout>

    <RelativeLayout
        android_layout_width="wrap_content"
        android_layout_height="30dp"
        android_layout_marginLeft="20dp"
        android_layout_marginTop="20dp"
        android_background="@drawable/xml_oval_half_transparent_bg"
        android_paddingLeft="10dp"
        android_paddingRight="10dp">

        <ImageView
            android_id="@+id/iv_speaker2"
            android_layout_width="22dp"
            android_layout_height="22dp"
            android_layout_centerVertical="true"
            android_src="@mipmap/ic_loudspeaker"/>

        <com.sunfusheng.marqueeview.MarqueeView
            android_id="@+id/marqueeView2"
            android_layout_width="100dp"
            android_layout_height="match_parent"
            android_layout_centerVertical="true"
            android_layout_marginLeft="8dp"
            android_layout_toRightOf="@+id/iv_speaker2"
            app_mvTextColor="@color/white"
            app_mvTextSize="14sp"/>
    </RelativeLayout>

    <RelativeLayout
        android_layout_width="wrap_content"
        android_layout_height="30dp"
        android_layout_marginLeft="20dp"
        android_layout_marginTop="20dp"
        android_background="@drawable/xml_oval_half_transparent_bg"
        android_paddingLeft="10dp"
        android_paddingRight="10dp">

        <ImageView
            android_id="@+id/iv_speaker3"
            android_layout_width="22dp"
            android_layout_height="22dp"
            android_layout_centerVertical="true"
            android_src="@mipmap/ic_red_loudspeaker"/>

        <com.sunfusheng.marqueeview.MarqueeView
            android_id="@+id/marqueeView3"
            android_layout_width="200dp"
            android_layout_height="match_parent"
            android_layout_centerVertical="true"
            android_layout_marginLeft="8dp"
            android_layout_toRightOf="@+id/iv_speaker3"
            app_mvDirection="right_to_left"
            app_mvGravity="left"
            app_mvTextColor="@color/red"/>
    </RelativeLayout>

    <RelativeLayout
        android_layout_width="wrap_content"
        android_layout_height="30dp"
        android_layout_marginLeft="20dp"
        android_layout_marginTop="20dp"
        android_background="@drawable/xml_oval_half_transparent_bg"
        android_paddingLeft="10dp"
        android_paddingRight="10dp">

        <ImageView
            android_id="@+id/iv_loudspeaker4"
            android_layout_width="22dp"
            android_layout_height="22dp"
            android_layout_centerVertical="true"
            android_src="@mipmap/ic_red_loudspeaker"/>

        <com.sunfusheng.marqueeview.MarqueeView
            android_id="@+id/marqueeView4"
            android_layout_width="200dp"
            android_layout_height="match_parent"
            android_layout_centerVertical="true"
            android_layout_marginLeft="8dp"
            android_layout_toRightOf="@+id/iv_loudspeaker4"
            app_mvDirection="left_to_right"
            app_mvGravity="right"
            app_mvTextColor="@color/red"/>
    </RelativeLayout>

</LinearLayout>
```

##### 6\. item_layout.xml

```xml
<?xml version="1.0" encoding="utf-8"?>
<LinearLayout

    android_layout_width="match_parent"
    android_layout_height="wrap_content"
    android_background="@drawable/drawable_list_item_selector"
    android_orientation="vertical">

    <LinearLayout
        android_layout_width="match_parent"
        android_layout_height="45dp"
        android_layout_marginLeft="16dp"
        android_orientation="horizontal">

        <TextView
            android_id="@+id/tv_title"
            android_layout_width="wrap_content"
            android_layout_height="wrap_content"
            android_layout_gravity="center_vertical"
            android_layout_marginRight="10dp"
            android_text="item"
            android_textColor="@color/font1"
            android_textSize="16sp"/>

        <com.sunfusheng.marqueeview.MarqueeView
            android_id="@+id/marqueeView"
            android_layout_width="wrap_content"
            android_layout_height="match_parent"
            app_mvDirection="bottom_to_top"
            app_mvGravity="left"
            app_mvTextColor="@color/orange"/>
    </LinearLayout>

    <include layout="@layout/divider_1px"/>
</LinearLayout>
```

##### 7\. layout_recyclerview.xml

```xml
<?xml version="1.0" encoding="utf-8"?>
<android.support.v7.widget.RecyclerView
    android_id="@+id/recycleView"

    android_layout_width="match_parent"
    android_layout_height="match_parent"/>
```

#### Java Code.

We have the following java classes for this project:

1. FragmentPagerItem.java
2. FragmentPagerItemAdapter.java
3. RecyclerViewFragment.java
4. CommonFragment.java
5. MainActivity.java
6. AboutActivity.java

##### 1\. FragmentPagerItem.java

- Our FragmentPagerItem class. represents a single FragmentPager item.

```java
package com.devosha.mrmarquee.fragment.adapter;

import android.content.Context;
import android.os.Bundle;
import android.support.annotation.NonNull;
import android.support.v4.app.Fragment;

public class FragmentPagerItem { // <1>

    //instance fields
    private String title;
    private Fragment fragment;
    private Class<? extends Fragment> clazz;
    private Bundle args;

    /*
    Protected constructor. receives the fragment and its title.
     */
    protected FragmentPagerItem(String title, @NonNull Fragment fragment) { //<2>
        this(title, fragment.getClass(), fragment.getArguments());
        this.fragment = fragment;
    }

    /*
    Second constructor variation
     */
    protected FragmentPagerItem(String title, Class<? extends Fragment> clazz, Bundle args) {
        this.title = title;
        this.clazz = clazz;
        this.args = args;
    }

    /*
    Factory method to create a FragmentPagerItem and return it
     */
    public static FragmentPagerItem create(String title, @NonNull Fragment fragment) {
        return new FragmentPagerItem(title, fragment);
    }

    /*
    Factory method to create a FragmentPagerItem and return it.Second Variation.
     */
    public static FragmentPagerItem create(String title, Class<? extends Fragment> clazz) {
        return create(title, clazz, null);
    }

    /*
    Factory method to create a FragmentPagerItem and return it. Third variation.
     */
    public static FragmentPagerItem create(String title, Class<? extends Fragment> clazz, Bundle args) {
        return new FragmentPagerItem(title, clazz, args);
    }

    /*
    Return FragmentPagerItem title
     */
    public String getPageTitle() {
        return title;
    }

    /*
    Return fragment
     */
    public Fragment getFragment() {
        return fragment;
    }

    /*
    Factory method for Fragment
     */
    public Fragment newInstance(Context context) {
        return Fragment.instantiate(context, clazz.getName(), args);
    }

    /*
    Return Bundle object
     */
    public Bundle getArgs() {
        return args;
    }

}
```

##### 2\. FragmentPagerItemAdapter.java

- FragmentPagerItemAdapter class.
- Deriving from FragmentPagerAdapter.

```java
package com.devosha.mrmarquee.fragment.adapter;

import android.content.Context;
import android.os.Bundle;
import android.support.annotation.NonNull;
import android.support.v4.app.Fragment;
import android.support.v4.app.FragmentManager;
import android.support.v4.app.FragmentPagerAdapter;
import android.util.SparseArray;
import android.view.ViewGroup;

import java.util.ArrayList;
import java.util.List;

public class FragmentPagerItemAdapter extends FragmentPagerAdapter {

    //instance fields.
    private Context context;
    private List<FragmentPagerItem> items;
    private SparseArray<Fragment> fragments = new SparseArray<>();
    private OnInstantiateFragmentListener listener;

    /*
    Our FragmentPagerItemAdapter constructor
     */
    private FragmentPagerItemAdapter(Context context, FragmentManager fragmentManager, List<FragmentPagerItem> items) {
        super(fragmentManager);
        this.context = context;
        this.items = items;
    }

    /*
    Instantiate a Fragment.
     */
    @NonNull
    @Override
    public Object instantiateItem(ViewGroup container, int position) {
        Fragment fragment = (Fragment) super.instantiateItem(container, position);
        fragments.put(position, fragment);
        if (listener != null) {
            listener.onInstantiate(position, fragment, items.get(position).getArgs());
        }
        return fragment;
    }

    /*
    Return current fragment based on position.
     */
    @Override
    public Fragment getItem(int position) {
        return items.get(position).newInstance(context);
    }

    /*
    Remove fragment from adapter
     */
    @Override
    public void destroyItem(ViewGroup container, int position, Object object) {
        super.destroyItem(container, position, object);
        fragments.remove(position);
    }

    /*
    Get number of fragments
     */
    @Override
    public int getCount() {
        return items.size();
    }

    /*
    Get a single fragment
     */
    public Fragment getFragment(int position) {
        return fragments.get(position);
    }

    /*
    Get Fragment title
     */
    @Override
    public String getPageTitle(int position) {
        return items.get(position).getPageTitle();
    }

    /*
    Attach a listener to when fragment is instantiated
     */
    public void setOnInstantiateFragmentListener(OnInstantiateFragmentListener listener) {
        this.listener = listener;
    }

    /*
    Our OnInstantiateFragmentListener interface
    - Defines onInstantiate() method.
     */
    public interface OnInstantiateFragmentListener {
        void onInstantiate(int position, Fragment fragment, Bundle args);
    }

    /*
    Builder class to add Fragments to our list of fragments.
    - First we receive a FragmentManager instance which we'll pass to our FragmentPager
    Item constructor.
     */
    public static class Builder {

        private Context context;
        private FragmentManager fragmentManager;
        private List<FragmentPagerItem> items = new ArrayList<>();

        public Builder(Context context, FragmentManager fragmentManager) {
            this.context = context;
            this.fragmentManager = fragmentManager;
        }

        public Builder add(FragmentPagerItem item) {
            items.add(item);
            return this;
        }

        public Builder add(int resId, Fragment fragment) {
            return add(context.getString(resId), fragment);
        }

        public Builder add(int resId, Class<? extends Fragment> clazz) {
            return add(context.getString(resId), clazz);
        }

        public Builder add(int resId, Class<? extends Fragment> clazz, Bundle args) {
            return add(context.getString(resId), clazz, args);
        }

        public Builder add(String title, Fragment fragment) {
            return add(FragmentPagerItem.create(title, fragment));
        }

        public Builder add(String title, Class<? extends Fragment> clazz) {
            return add(FragmentPagerItem.create(title, clazz));
        }

        public Builder add(String title, Class<? extends Fragment> clazz, Bundle args) {
            return add(FragmentPagerItem.create(title, clazz, args));
        }

        public FragmentPagerItemAdapter build() {
            return new FragmentPagerItemAdapter(context, fragmentManager, items);
        }
    }
}
```

##### 3\. RecyclerViewFragment.java

- RecyclerView Fragment with MarqueeView

```java
package com.devosha.mrmarquee.fragment;

import android.os.Bundle;
import android.support.annotation.NonNull;
import android.support.annotation.Nullable;
import android.support.v4.app.Fragment;
import android.support.v7.widget.LinearLayoutManager;
import android.support.v7.widget.RecyclerView;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.TextView;

import com.devosha.mrmarquee.R;
import com.sunfusheng.marqueeview.MarqueeView;

import java.util.ArrayList;
import java.util.List;

public class RecyclerViewFragment extends Fragment {

    static final String[] spacecrafts =("Atlantis Casini Spitzer Chandra Galileo Kepler Wise Apollo Saturn-5 Hubble Challenger" +
            " James-Web Huygens Enterprise New-Horizon Opportunity Pioneer Curiosity Spirit Orion Mars-Explorer WMAP Columbia Voyager Juno").split(" ");
    /*
    Static class to represent a single item.
     */
    public static class Item {
        public String title;
        public List<String> list;
        public boolean showList;
    }

    /*
    inflate Fragment layout containing our recyclerview.
     */
    @Nullable
    @Override
    public View onCreateView(@NonNull LayoutInflater inflater, @Nullable ViewGroup container, @Nullable Bundle savedInstanceState) {
        return inflater.inflate(R.layout.layout_recyclerview, container, false);
    }

    /*
    When view has been created:
    - Generate data to bind to our ListView.
    - Initialize our recyclerview.
    - Listen to recyclerview scroll events,
     */
    @Override
    public void onViewCreated(@NonNull View view, @Nullable Bundle savedInstanceState) {
        super.onViewCreated(view, savedInstanceState);

        List<Item> items = new ArrayList<>();
        int i=0;
        for (String spacecraft: spacecrafts) {
            Item item = new Item();
            item.title = spacecraft;
            if (i == 3 || i == 11) {
                List<String> list = new ArrayList<>();
                for (int j = 1; j <= 10; j++) {
                    list.add("MarqueeView Item " + i + "-" + j);
                }
                item.list = list;
                item.showList = true;
            }
            i++;
            items.add(item);
        }

        RecyclerView recyclerView = view.findViewById(R.id.recycleView);
        LinearLayoutManager layoutManager = new LinearLayoutManager(getContext());
        recyclerView.setLayoutManager(layoutManager);
        RecyclerViewAdapter adapter = new RecyclerViewAdapter(items);
        recyclerView.setAdapter(adapter);

        recyclerView.addOnScrollListener(new RecyclerView.OnScrollListener() {
            @Override
            public void onScrollStateChanged(RecyclerView recyclerView, int newState) {
                super.onScrollStateChanged(recyclerView, newState);
            }

            @Override
            public void onScrolled(RecyclerView recyclerView, int dx, int dy) {
                super.onScrolled(recyclerView, dx, dy);
            }
        });
    }

    /*
    Our recyclerview adapter class.
     */
    class RecyclerViewAdapter extends RecyclerView.Adapter<RecyclerViewAdapter.ViewHolder> {
        private List<Item> list;

        /*
        Recyclerview constructor receives a list of items.
         */
        RecyclerViewAdapter(List<Item> list) {
            this.list = list;
        }

        /*
        Inflate item layout and return it.
         */
        @Override
        public ViewHolder onCreateViewHolder(ViewGroup viewGroup, int viewType) {
            View view = LayoutInflater.from(viewGroup.getContext()).inflate(R.layout.item_layout, viewGroup, false);
            return new ViewHolder(view);
        }

        /*
        Bind data to the recyclerview.
         */
        @Override
        public void onBindViewHolder(ViewHolder viewHolder, int position) {
            Item item = list.get(position);

            viewHolder.tvTitle.setText(item.title);
            viewHolder.tvTitle.setVisibility(item.showList ? View.GONE : View.VISIBLE);
            viewHolder.marqueeView.setVisibility(item.showList ? View.VISIBLE : View.GONE);
            if (item.showList) {
                viewHolder.marqueeView.startWithList(item.list);
            }
        }

        /*
        return number of items in adapter
         */
        @Override
        public int getItemCount() {
            return list.size();
        }

        /*
        Our View Holder class
         */
        class ViewHolder extends RecyclerView.ViewHolder {
            TextView tvTitle;
            MarqueeView marqueeView;

            ViewHolder(View view) {
                super(view);
                tvTitle = view.findViewById(R.id.tv_title);
                marqueeView = view.findViewById(R.id.marqueeView);
            }
        }
    }
}
```

##### 4\. CommonFragment.java

- Just a simple fragment to demonstrate basic usage of MarqueeView.

```java
package com.devosha.mrmarquee.fragment;

import android.graphics.Color;
import android.os.Bundle;
import android.support.annotation.Nullable;
import android.support.v4.app.Fragment;
import android.text.SpannableString;
import android.text.Spanned;
import android.text.style.ForegroundColorSpan;
import android.text.style.URLSpan;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.Toast;

import com.devosha.mrmarquee.R;
import com.sunfusheng.marqueeview.MarqueeView;

import java.util.ArrayList;
import java.util.List;

public class CommonFragment extends Fragment {

    //several MarqueeView instances
    private MarqueeView marqueeView;
    private MarqueeView marqueeView1;
    private MarqueeView marqueeView2;
    private MarqueeView marqueeView3;
    private MarqueeView marqueeView4;

    /*
    1. When our Fragment View is created. First we'll need to reference our MarqueeViews.
    2. Then instantiate several Spannable strings setting their text and changing their
    foregroundcolor.
    1. We add the spannable strings to our list.
    2. Set MarqueeView list, Text and Itemclicklisteners.
     */
    @Nullable
    @Override
    public View onCreateView(LayoutInflater inflater, ViewGroup container, Bundle savedInstanceState) {
        View view = inflater.inflate(R.layout.fragment_tab, container, false);
        marqueeView = view.findViewById(R.id.marqueeView);
        marqueeView1 = view.findViewById(R.id.marqueeView1);
        marqueeView2 = view.findViewById(R.id.marqueeView2);
        marqueeView3 = view.findViewById(R.id.marqueeView3);
        marqueeView4 = view.findViewById(R.id.marqueeView4);

        List<CharSequence> list = new ArrayList<>();
        SpannableString ss1 = new SpannableString("1、MarqueeView");
        ss1.setSpan(new ForegroundColorSpan(Color.RED), 2, 13, Spanned.SPAN_EXCLUSIVE_EXCLUSIVE);
        list.add(ss1);
        SpannableString ss2 = new SpannableString("2、GitHub：sfsheng0322");
        ss2.setSpan(new ForegroundColorSpan(Color.GREEN), 9, 20, Spanned.SPAN_EXCLUSIVE_EXCLUSIVE);
        list.add(ss2);
        SpannableString ss3 = new SpannableString("3、Author site：sunfusheng.com");
        ss3.setSpan(new URLSpan("http://sunfusheng.com/"), 7, 21, Spanned.SPAN_EXCLUSIVE_EXCLUSIVE);
        list.add(ss3);
        list.add("4、Profession：Programmer");

        marqueeView.startWithList(list);
        marqueeView.setOnItemClickListener((position, textView) -> Toast.makeText(getContext(), textView.getText() + "", Toast.LENGTH_SHORT).show());

        marqueeView1.startWithText(getString(R.string.marquee_texts), R.anim.anim_top_in, R.anim.anim_bottom_out);
        marqueeView1.setOnItemClickListener((position, textView) -> Toast.makeText(getContext(), String.valueOf(marqueeView1.getPosition()) + ". " + textView.getText(), Toast.LENGTH_SHORT).show());

        marqueeView2.startWithText(getString(R.string.marquee_text));

        marqueeView3.startWithText(getString(R.string.marquee_texts));

        marqueeView4.startWithText(getString(R.string.marquee_texts));

        return view;
    }

}
```

##### 5\. MainActivity.java

- Our MainActivity.

```java
package com.devosha.mrmarquee;

import android.content.Intent;
import android.os.Bundle;
import android.support.design.widget.TabLayout;
import android.support.v4.view.ViewPager;
import android.support.v7.app.AppCompatActivity;
import android.view.Menu;
import android.view.MenuItem;

import com.devosha.mrmarquee.fragment.CommonFragment;
import com.devosha.mrmarquee.fragment.RecyclerViewFragment;
import com.devosha.mrmarquee.fragment.adapter.FragmentPagerItemAdapter;

public class MainActivity extends AppCompatActivity {

    //instance fields.
    private TabLayout tabLayout;
    private ViewPager viewPager;

    /*
    When activity is created:
    1. Reference tabLayout and ViewPager.
    2. Instantiate our FragmentPagerAdapter and add and build its fragments
    3. Ser ViewPager adapter.
    4. Setup TabLayout with ViewPager.
     */
    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);
        tabLayout = findViewById(R.id.tabLayout);
        viewPager = findViewById(R.id.viewPager);

        FragmentPagerItemAdapter adapter = new FragmentPagerItemAdapter.Builder(this, getSupportFragmentManager())
                .add("Sayings", new CommonFragment())
                .add("Quotes", new CommonFragment())
                .add("Spaceship", new RecyclerViewFragment())
                .build();
        viewPager.setAdapter(adapter);
        viewPager.setOffscreenPageLimit(1);
        tabLayout.setupWithViewPager(viewPager);
    }

    /*
    Inflate menu resource
     */
    @Override
    public boolean onCreateOptionsMenu(Menu menu) {
        getMenuInflater().inflate(R.menu.menu_main, menu);
        return true;
    }
    /*
    Handle menu item selection.
     */
    @Override
    public boolean onOptionsItemSelected(MenuItem item) {
        switch (item.getItemId()) {
            case R.id.item_menu_app:
                startActivity(new Intent(this, AboutActivity.class));
                return true;
            default:
                return super.onOptionsItemSelected(item);
        }
    }
}
```

##### 6\. AboutActivity.java

- Our AboutActivity

```java
package com.devosha.mrmarquee;

import android.annotation.SuppressLint;
import android.content.Context;
import android.content.pm.PackageInfo;
import android.content.pm.PackageManager;
import android.os.Build;
import android.os.Bundle;
import android.support.v7.app.AppCompatActivity;
import android.text.TextUtils;
import android.view.KeyEvent;
import android.view.Menu;
import android.view.MenuItem;
import android.view.View;
import android.webkit.WebSettings;
import android.webkit.WebView;
import android.webkit.WebViewClient;

public class AboutActivity extends AppCompatActivity {

    private WebView webView;
    private WebSettings settings;

    /*
    When AboutActivity is created invoke initView()
     */
    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_about);

        initView();
    }

    /*
    This method is responsible for:
    - referencing webview from layout.
    - setting webview settings.
     */
    @SuppressLint("NewApi")
    private void initView() {
        webView = (WebView) findViewById(R.id.webView);
        setTitle("Version" + getVersionName(this) + ")");

        settings = webView.getSettings();
        settings.setJavaScriptEnabled(true); //Enable Javascript for WebView
        settings.setJavaScriptCanOpenWindowsAutomatically(true);
        settings.setSupportZoom(true);
        settings.setBuiltInZoomControls(true);
        settings.setDisplayZoomControls(false);

        // >= 19(SDK4.4)
        if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.KITKAT) {
            webView.setLayerType(View.LAYER_TYPE_HARDWARE, null);
            settings.setLoadsImagesAutomatically(true);
        } else {
            webView.setLayerType(View.LAYER_TYPE_SOFTWARE, null);
            settings.setLoadsImagesAutomatically(false);
        }

        settings.setUseWideViewPort(true);
        settings.setLoadWithOverviewMode(true);
        settings.setDomStorageEnabled(true);
        settings.setSaveFormData(true);
        settings.setSupportMultipleWindows(true);
        settings.setAppCacheEnabled(true);
        settings.setCacheMode(WebSettings.LOAD_DEFAULT);

        webView.setHorizontalScrollbarOverlay(true);
        webView.setHorizontalScrollBarEnabled(false);
        webView.setOverScrollMode(View.OVER_SCROLL_NEVER);
        webView.setScrollBarStyle(View.SCROLLBARS_INSIDE_OVERLAY);
        webView.requestFocus();

        webView.loadUrl("file:///android_asset/about.html");
        webView.setWebViewClient(new WebViewClient() {
            @Override
            public boolean shouldOverrideUrlLoading(WebView view, String url) {
                view.loadUrl(url);
                return true;
            }
        });
    }

    /*
    This method is responsible for:
        1. Get package version via PackageManager
        2. Returning empty in case of exception
     */
    public static String getVersionName(Context context) {
        try {
            PackageManager packageManager = context.getPackageManager();
            PackageInfo packInfo = packageManager.getPackageInfo(context.getPackageName(), 0);
            String version = packInfo.versionName;
            if (!TextUtils.isEmpty(version)) {
                return version;
            }
        } catch (Exception e) {
            e.printStackTrace();
        }
        return "";
    }

    /*
    When options menu is created.
     */
    @Override
    public boolean onCreateOptionsMenu(Menu menu) {
        return super.onCreateOptionsMenu(menu);
    }

    /*
    When home is selected finish this activity and return to MainActivity
     */
    @Override
    public boolean onOptionsItemSelected(MenuItem item) {
        switch (item.getItemId()) {
            case android.R.id.home:
                finish();
                return true;
            default:
                return super.onOptionsItemSelected(item);
        }
    }

    /*
    When back key is clicked then go previous page in webview
     */
    @Override
    public boolean onKeyDown(int keyCode, KeyEvent event) {
        if (keyCode == KeyEvent.KEYCODE_BACK && webView.canGoBack()) {
            webView.goBack();
            return true;
        }
        return super.onKeyDown(keyCode, event);
    }

}
```
