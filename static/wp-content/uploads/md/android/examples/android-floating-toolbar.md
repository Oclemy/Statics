# Android FloatingToolBar Example

In this tutorial you will learn how to create a floating toolbar in your android apps using various open source solutions in a step by step manner.


## Solution 1: Use FloatingToolbar Library

> FloatingToolbar is a toolbar that morphs from a FloatingActionButton.

It is available for API 14+.

Here's the demo of the project we will write:

![FloatingToolbar Example](https://github.com/rubensousa/FloatingToolbar/raw/master/screenshots/demo.gif)

### Step 1: Install the Library

Install the library by declaring the following statement in your `app/build.gradle`:

```groovy
implementation 'com.github.rubensousa:floatingtoolbar:1.5.1'
```

### Step 2: Add to Layout

In your layout, add FloatingToolbar as a direct child of CoordinatorLayout and before the FloatingActionButton:

```xml
<android.support.design.widget.CoordinatorLayout
    xmlns:android="http://schemas.android.com/apk/res/android"
    xmlns:app="http://schemas.android.com/apk/res-auto"
    android:id="@+id/coordinatorLayout"
    android:layout_width="match_parent"
    android:layout_height="match_parent"
    android:fitsSystemWindows="true">

    <!-- Appbar -->

    <com.github.rubensousa.floatingtoolbar.FloatingToolbar
        android:id="@+id/floatingToolbar"
        android:layout_width="match_parent"
        android:layout_height="?attr/actionBarSize"
        android:layout_gravity="bottom"
        app:floatingMenu="@menu/main" />

    <android.support.design.widget.FloatingActionButton
        android:id="@+id/fab"
        android:layout_width="wrap_content"
        android:layout_height="wrap_content"
        android:layout_gravity="bottom|end"
        android:layout_margin="@dimen/fab_margin"
        android:src="@drawable/ic_share_black_24dp" />

</android.support.design.widget.CoordinatorLayout>
```

### Step 3: Reference Menu

Specify a menu resource file or custom layout with `app:floatingMenu` or `app:floatingCustomView`

You can also build a menu programmatically using FloatingToolbarMenuBuilder:

```java
 mFloatingToolbar.setMenu(new FloatingToolbarMenuBuilder(this)
                .addItem(R.id.action_unread, R.drawable.ic_markunread_black_24dp, "Mark unread")
                .addItem(R.id.action_copy, R.drawable.ic_content_copy_black_24dp, "Copy")
                .addItem(R.id.action_google, R.drawable.ic_google_plus_box, "Google+")
                .addItem(R.id.action_facebook, R.drawable.ic_facebook_box, "Facebook")
                .addItem(R.id.action_twitter, R.drawable.ic_twitter_box, "Twitter")
                .build());
```

### Step 4: Attach FAB

Then attach the FAB to the FloatingToolbar to automatically start the transition on click event:

```java
mFloatingToolbar.attachFab(fab);
```

### Step 5: Set a click listener

```java
mFloatingToolbar.setClickListener(new FloatingToolbar.ItemClickListener() {
            @Override
            public void onItemClick(MenuItem item) {

            }

            @Override
            public void onItemLongClick(MenuItem item) {

            }
        });
```

### More Options

If you want to show a snackbar in the same layout as the FloatingToolbar, please use:

```java
mFloatingToolbar.showSnackBar(snackbar);
```

You can also attach a RecyclerView to hide the FloatingToolbar on scroll:

```java
mFloatingToolbar.attachRecyclerView(recyclerView);
```

You can also use `show()` and `hide()` to trigger the transition anytime:

```java
mFloatingToolbar.show();
mFloatingToolbar.hide();
```

You can also add a MorphListener to listen to morph animation events

```java
mFloatingToolbar.addMorphListener(new FloatingToolbar.MorphListener() {
    @Override
    public void onMorphEnd() {

    }

    @Override
    public void onMorphStart() {

    }

    @Override
    public void onUnmorphStart() {

    }

    @Override
    public void onUnmorphEnd() {

    }
});
```

### Full Example

#### Step 1: Create Project

Create android studio project or download the one provided.

#### Step 2: Install Library

Install the library as has been discussed.

#### Step 3: Modify style

Replace your `styles.xml` with the following;

```xml
<resources>

    <!-- Base application theme. -->
    <style name="AppTheme" parent="Theme.AppCompat.Light.DarkActionBar">
        <!-- Customize your theme here. -->
        <item name="colorPrimary">@color/colorPrimary</item>
        <item name="colorPrimaryDark">@color/colorPrimaryDark</item>
        <item name="colorAccent">@color/colorAccent</item>
    </style>

    <style name="AppTheme.NoActionBar">
        <item name="windowActionBar">false</item>
        <item name="windowNoTitle">true</item>
    </style>

    <style name="AppTheme.AppBarOverlay" parent="ThemeOverlay.AppCompat.Dark.ActionBar" />

    <style name="AppTheme.PopupOverlay" parent="ThemeOverlay.AppCompat.Light" />

</resources>
```

#### Step 4: Create Menu

Create a menu under the `res/menu`:

**menu_toolbar.xml**

```xml
<?xml version="1.0" encoding="utf-8"?>
<menu xmlns:android="http://schemas.android.com/apk/res/android"
    xmlns:app="http://schemas.android.com/apk/res-auto">

    <item
        android:id="@+id/action_snackbar"
        android:title="snackbar"
        app:showAsAction="ifRoom" />

</menu>
```

#### Step 5: Design Layouts

Design XML layouts:

1. activity_main.xml
2. adapter.xml
3. custom.xml
4. detail_activity.xml

**activity_main.xml**

```xml
<?xml version="1.0" encoding="utf-8"?>
<android.support.design.widget.CoordinatorLayout xmlns:android="http://schemas.android.com/apk/res/android"
    xmlns:app="http://schemas.android.com/apk/res-auto"
    android:id="@+id/coordinatorLayout"
    android:layout_width="match_parent"
    android:layout_height="match_parent"
    android:fitsSystemWindows="true">

    <android.support.v7.widget.RecyclerView
        android:id="@+id/recyclerView"
        android:layout_width="match_parent"
        android:layout_height="match_parent"
        app:layout_behavior="@string/appbar_scrolling_view_behavior" />

    <android.support.design.widget.AppBarLayout
        android:layout_width="match_parent"
        android:layout_height="wrap_content"
        android:theme="@style/AppTheme.AppBarOverlay">

        <android.support.v7.widget.Toolbar
            android:id="@+id/toolbar"
            android:layout_width="match_parent"
            android:layout_height="?attr/actionBarSize"
            android:background="?attr/colorPrimary"
            app:popupTheme="@style/AppTheme.PopupOverlay" />

    </android.support.design.widget.AppBarLayout>

    <com.github.rubensousa.floatingtoolbar.FloatingToolbar
        android:id="@+id/floatingToolbar"
        android:layout_width="match_parent"
        android:layout_height="?attr/actionBarSize"
        android:layout_gravity="bottom"
        app:floatingMenu="@menu/main" />

    <android.support.design.widget.FloatingActionButton
        android:id="@+id/fab"
        android:layout_width="wrap_content"
        android:layout_height="wrap_content"
        android:layout_gravity="bottom|end"
        android:layout_margin="@dimen/fab_margin"
        android:src="@drawable/ic_share_black_24dp" />

</android.support.design.widget.CoordinatorLayout>
```

> NB/= You can use androidx. You will also find the other layouts in the source code download.

#### Step 6: Create Adapter

Create the recyclerview adapter for our list:

**CustomAdapter.java**

```java
public class CustomAdapter extends RecyclerView.Adapter<CustomAdapter.ViewHolder> {

    private ClickListener mListener;
    private List<MenuItem> mItems;

    public CustomAdapter(ClickListener listener) {
        mItems = new ArrayList<>();
        mListener = listener;
    }

    public void setClickListener(ClickListener listener) {
        mListener = listener;
    }

    public void addItem(MenuItem item) {
        mItems.add(item);
        notifyItemInserted(mItems.size() - 1);
    }

    @Override
    public ViewHolder onCreateViewHolder(ViewGroup parent, int viewType) {
        return new ViewHolder(LayoutInflater.from(parent.getContext())
                .inflate(R.layout.adapter, parent, false));
    }

    @Override
    public void onBindViewHolder(ViewHolder holder, int position) {
        holder.setData(mItems.get(position));
    }

    @Override
    public int getItemCount() {
        return mItems.size();
    }

    public class ViewHolder extends RecyclerView.ViewHolder implements View.OnClickListener {

        public MenuItem item;
        public TextView textView;

        public ViewHolder(View itemView) {
            super(itemView);
            itemView.setOnClickListener(this);
            textView = (TextView) itemView.findViewById(R.id.textView);
        }

        public void setData(MenuItem item) {
            this.item = item;
            textView.setText(item.getTitle());
        }

        @Override
        public void onClick(View v) {
            if (mListener != null) {
                mListener.onAdapterItemClick(item);
            }
        }
    }

    public interface ClickListener {
        void onAdapterItemClick(MenuItem item);
    }
}
```

#### Step 7: Create Detail Activity

Here's the code for the detail activity:

**DetailActivity.java**

```java
public class DetailActivity extends AppCompatActivity implements FloatingToolbar.MorphListener {

    private FloatingActionButton mFabAppBar;
    private FloatingActionButton mFab;
    private AppBarLayout mAppBar;
    private FloatingToolbar mFloatingToolbar;
    private boolean mShowingFromAppBar;
    private boolean mShowingFromNormal;

    // 808100900

    @Override
    protected void onCreate(@Nullable Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.detail_activity);

        mAppBar = (AppBarLayout) findViewById(R.id.appbar);
        mFloatingToolbar = (FloatingToolbar) findViewById(R.id.floatingToolbar);
        mFabAppBar = (FloatingActionButton) findViewById(R.id.fab);
        mFab = (FloatingActionButton) findViewById(R.id.fab2);

        // Don't handle fab click since we'll have 2 of them
        mFloatingToolbar.handleFabClick(false);
        mFloatingToolbar.addMorphListener(this);

        mFab.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View view) {
                mAppBar.setExpanded(false, true);
                mFloatingToolbar.attachFab(mFab);
                mFloatingToolbar.show();
                mShowingFromNormal = true;
            }
        });

        mFabAppBar.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View view) {
                if (!mFloatingToolbar.isShowing()) {
                    mFab.hide();
                    mFloatingToolbar.attachAppBarLayout(mAppBar);
                    mFloatingToolbar.attachFab(mFabAppBar);
                    mFloatingToolbar.show();
                    mShowingFromAppBar = true;
                }
            }
        });
    }

    @Override
    protected void onDestroy() {
        super.onDestroy();
        mFloatingToolbar.removeMorphListener(this);
    }

    @Override
    public void onMorphEnd() {

    }

    @Override
    public void onMorphStart() {

    }

    @Override
    public void onUnmorphEnd() {
        if (mShowingFromAppBar) {
            mFab.show();
        }

        if (mShowingFromNormal) {
            mAppBar.setExpanded(true, true);
        }

        mShowingFromAppBar = false;
        mShowingFromNormal = false;
    }

    @Override
    public void onUnmorphStart() {

    }
}
```

#### Step 8: Create MainActiviy

Here's the code for the MainActivity:

**MainActivity.java**

```java
public class MainActivity extends AppCompatActivity implements FloatingToolbar.ItemClickListener,
        Toolbar.OnMenuItemClickListener, CustomAdapter.ClickListener, FloatingToolbar.MorphListener {

    private Toolbar mToolbar;
    private FloatingToolbar mFloatingToolbar;
    private CustomAdapter mAdapter;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);
        mToolbar = findViewById(R.id.toolbar);
        FloatingActionButton fab = findViewById(R.id.fab);
        RecyclerView recyclerView = findViewById(R.id.recyclerView);
        mFloatingToolbar = findViewById(R.id.floatingToolbar);

        mToolbar.setTitle(R.string.app_name);
        mToolbar.inflateMenu(R.menu.menu_toolbar);
        mToolbar.setOnMenuItemClickListener(this);

        mAdapter = new CustomAdapter(this);
        recyclerView.setHasFixedSize(true);
        recyclerView.setLayoutManager(new LinearLayoutManager(this));
        recyclerView.setAdapter(mAdapter);

        mFloatingToolbar.setClickListener(this);
        mFloatingToolbar.attachFab(fab);
        mFloatingToolbar.attachRecyclerView(recyclerView);
        mFloatingToolbar.addMorphListener(this);

        //Create a custom menu
        mFloatingToolbar.setMenu(new FloatingToolbarMenuBuilder(this)
                .addItem(R.id.action_unread, R.drawable.ic_markunread_black_24dp, "Mark unread")
                .addItem(R.id.action_copy, R.drawable.ic_content_copy_black_24dp, "Copy")
                .addItem(R.id.action_google, R.drawable.ic_google_plus_box, "Google+")
                .addItem(R.id.action_facebook, R.drawable.ic_facebook_box, "Facebook")
                .addItem(R.id.action_twitter, R.drawable.ic_twitter_box, "Twitter")
                .build());

        // Usage with custom view
        /*View customView = mFloatingToolbar.getCustomView();
        if (customView != null) {
            customView.setOnClickListener(new View.OnClickListener() {
                @Override
                public void onClick(View v) {
                    mFloatingToolbar.hide();
                }
            });
        }*/

        // How to edit current menu
        // Menu menu = mFloatingToolbar.getMenu();
        // menu.findItem(R.id.action_copy).setVisible(false);
        // mFloatingToolbar.setMenu(menu);
    }

    @Override
    protected void onDestroy() {
        super.onDestroy();
        mFloatingToolbar.removeMorphListener(this);
    }

    @Override
    public void onItemClick(MenuItem item) {
        mAdapter.addItem(item);
    }

    @Override
    public void onItemLongClick(MenuItem item) {

    }

    @Override
    public void onAdapterItemClick(MenuItem item) {
        Intent intent = new Intent(this, DetailActivity.class);
        startActivityForResult(intent, 0);
    }

    @Override
    public boolean onMenuItemClick(MenuItem item) {
        if (item.getItemId() == R.id.action_snackbar) {
            Snackbar snackbar = Snackbar.make(mToolbar, "Here's a SnackBar",
                    Snackbar.LENGTH_INDEFINITE);
            mFloatingToolbar.showSnackBar(snackbar);
            return true;
        }
        return false;
    }

    @Override
    public void onMorphEnd() {

    }

    @Override
    public void onMorphStart() {

    }

    @Override
    public void onUnmorphStart() {

    }

    @Override
    public void onUnmorphEnd() {

    }
}
```

### Reference

Here are the reference links:

| Number | Link |
| --- | --- |
| 1. | [Download](https://downgit.github.io/#/home?url=https://github.com/rubensousa/FloatingToolbar/tree/master/sample) Example |
| 2. | [Read](https://github.com/rubensousa/FloatingToolbar/) more |
| 3. | [Follow](https://github.com/rubensousa/) library author |
