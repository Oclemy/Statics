# Kotlin Android BottomSheet Libraries and Examples

In this tutorial we want to explore the Bottomsheet component. How to use it in our app step by step via several third party solutions and libraries.


## (a). SuperBottomSheet

> Android native BottomSheet on steroids.

This BottomSheet library allows you to display the bottom sheets in your application with the bonus of animating the color of the status bar and the upper rounded corners while scrolling.

Here'sa demo of a project we will create making use of this library:

![SuperBottomSheet Example](https://github.com/andrefrsousa/SuperBottomSheet/raw/master/raw/example.gif)

Here's how you use this library:

### Step 1: Install it

The library is hosted in jitpack, so start by registering it in your root-level `build.gradle` as follows:

```groovy
allprojects {
    repositories {
        ...
        maven { url 'https://jitpack.io' }
    }
}
```

Then in your app-level `build.gradle` declare the library as a dependency:

```groovy
implementation 'com.github.andrefrsousa:SuperBottomSheet:2.0.0'
```

Then sync to install it.

### Step 2: Use it

To use it simply extend the `SuperBottomSheetFragment` as follows:

```kotlin
class MySheetFragment : SuperBottomSheetFragment() {

    override fun onCreateView(inflater: LayoutInflater, container: ViewGroup?, savedInstanceState: Bundle?): View? {
        super.onCreateView(inflater, container, savedInstanceState)
        return inflater.inflate(R.layout.fragment_demo_sheet, container, false)
    }
}
```

**Customizations**

If you want to customize properties of a single bottomsheet you override any of this methods:

```kotlin
fun getPeekHeight(): Int {
    // Your code goes here
}

fun getDim(): Float {
    // Your code goes here
}

fun getBackgroundColor(): Int {
   // Your code goes here
}

fun getStatusBarColor(): Int {
    // Your code goes here
}

fun getCornerRadius(): Float {
    // Your code goes here
}

fun isSheetAlwaysExpanded(): Boolean {
    // Your code goes here
}

fun isSheetCancelableOnTouchOutside(): Boolean {
    // Your code goes here
}

fun isSheetCancelable(): Boolean {
    // Your code goes here
}

fun animateCornerRadius(): Boolean {
    // Your code goes here
}

fun animateStatusBar(): Boolean {
    // Your code goes here
}

fun getExpandedHeight(): Int {
    // Your code goes here
}
```

### Full Example

1. Create Android Studio or Download it from below.
2. Install the library as has been discussed above.
3. Design Layouts

Here are our two layouts:

**(a). fragment_demo_sheet.xml**

Include a simple textview in our BottomSheet:

```xml
<?xml version="1.0" encoding="utf-8"?>
<androidx.coordinatorlayout.widget.CoordinatorLayout
    xmlns:android="http://schemas.android.com/apk/res/android"
    xmlns:app="http://schemas.android.com/apk/res-auto"
    android:layout_width="match_parent"
    android:layout_height="wrap_content">

    <TextView
        android:id="@+id/show_sheet"
        android:layout_width="wrap_content"
        android:layout_height="1000dp"
        android:text="Hello World!"
        app:layout_constraintBottom_toBottomOf="parent"
        app:layout_constraintLeft_toLeftOf="parent"
        app:layout_constraintRight_toRightOf="parent"
        app:layout_constraintTop_toTopOf="parent" />

</androidx.coordinatorlayout.widget.CoordinatorLayout>
```

**(b). activity_demo.xml**

Include a button in our main activity layout;

```xml
<?xml version="1.0" encoding="utf-8"?>
<androidx.constraintlayout.widget.ConstraintLayout
    xmlns:android="http://schemas.android.com/apk/res/android"
    xmlns:app="http://schemas.android.com/apk/res-auto"
    android:layout_width="match_parent"
    android:layout_height="match_parent">

    <Button
        android:id="@+id/show_sheet"
        android:layout_width="wrap_content"
        android:layout_height="wrap_content"
        android:text="Show Sheet"
        app:layout_constraintBottom_toBottomOf="parent"
        app:layout_constraintLeft_toLeftOf="parent"
        app:layout_constraintRight_toRightOf="parent"
        app:layout_constraintTop_toTopOf="parent" />

</androidx.constraintlayout.widget.ConstraintLayout>
```

4. Write Kotlin Code

Here's our main and only activity in the project:

**DemoActivity.kt**

```kotlin
import android.graphics.Color
import android.os.Bundle
import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import androidx.appcompat.app.AppCompatActivity
import com.andrefrsousa.superbottomsheet.SuperBottomSheetFragment
import kotlinx.android.synthetic.main.activity_demo.*

class DemoActivity : AppCompatActivity() {

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_demo)

        show_sheet.setOnClickListener {
            val sheet = DemoBottomSheetFragment()
            sheet.show(supportFragmentManager, "DemoBottomSheetFragment")
        }
    }
}

class DemoBottomSheetFragment : SuperBottomSheetFragment() {

    override fun onCreateView(inflater: LayoutInflater, container: ViewGroup?, savedInstanceState: Bundle?): View? {
        super.onCreateView(inflater, container, savedInstanceState)
        return inflater.inflate(R.layout.fragment_demo_sheet, container, false)
    }

    override fun getCornerRadius() = context!!.resources.getDimension(R.dimen.demo_sheet_rounded_corner)

    override fun getStatusBarColor() = Color.RED
}
```

### Run

Copy the code or download it in the link below, build and run.

### Reference

Here are the reference links:

| Number | Link |
| --- | --- |
| 1. | [Download](https://downgit.github.io/#/home?url=https://github.com/andrefrsousa/SuperBottomSheet/tree/master/demo) Example |
| 3. | [Read](https://github.com/andrefrsousa/SuperBottomSheet/) more |
| 2. | [Follow](https://github.com/andrefrsousa/) code author |

## (b). BottomSheetMenu

> BottomSheetMenu style dialogs for Android.

Here are its features:

- Both list and grid style
- Light and Dark theme as well as custom themeing options
- XML style support
- Tablet support
- Share Intent Picker
- API 19+
- Kotlin support

Here is a demo:

![](https://github.com/Kennyc1012/BottomSheetMenu/raw/master/art/grid.png)

Let's see how to use it.

### Step 1: Install it

You need to start by installing this library. Go to your root-level `build.gradle` and register jitpack under the `allProjects{}` closure as follows:

```groovy
allprojects {
    repositories {
        ...
        maven { url "https://jitpack.io" }
    }
}
```

Then in your app-level `build.gradle` declare the library as a dependency:

```groovy
     implementation "com.github.Kennyc1012:BottomSheetMenu:3.3.0
```

Sync.

### Step 2: Create BottomSheetMenu

You need to create BottomSheetMenu as an XML file. Do this in the `res/menu` folder. Create that folder if it doesn't exist.

For example here's our menu resource file with menu items:

```xml
<?xml version="1.0" encoding="utf-8"?>
<menu xmlns:android="http://schemas.android.com/apk/res/android">

    <item
        android:id="@+id/share"
        android:icon="@drawable/ic_share_grey_600_24dp"
        android:title="Share" />

    <item
        android:id="@+id/upload"
        android:icon="@drawable/ic_cloud_upload_grey_600_24dp"
        android:title="Upload" />

    <item
        android:id="@+id/copy"
        android:icon="@drawable/ic_content_copy_grey_600_24dp"
        android:title="Copy" />

    <item
        android:id="@+id/print"
        android:icon="@drawable/ic_print_grey_600_24dp"
        android:title="Print" />

</menu>
```

### Step 3: Wite Code

In your code you can build a `BottomSheetMenuDialogFragment` and show it. Here is how you build and show it in Java:

```java
new BottomSheetMenuDialogFragment.Builder(getActivity())
  .setSheet(R.menu.bottom_sheet)
  .setTitle(R.string.options)
  .setListener(myListener)
  .setObject(myObject)
  .show(getSupportFragmentManager());
```

And here's how you build and show it in Kotlin:

```kotlin
BottomSheetMenuDialogFragment.Builder(context = this,
      sheet = R.menu.bottom_sheet,
      listener = myListener,
      title = R.string.options,
      `object` = myObject)
      .show(supportFragmentManager)
```

### Full Example

Let's now look at a full BottomSheetMenu example in Kotlin.

1. Start by creating a project in android studio, or download the sample project below.
2. Install the library as has been discussed in this article.
3. Create Three Menus in the `res/menu` folder:

**(a). grid_sheet.xml**

```xml
<?xml version="1.0" encoding="utf-8"?>
<menu xmlns:android="http://schemas.android.com/apk/res/android">

    <item
        android:id="@+id/edit"
        android:icon="@drawable/ic_edit_grey_600_48dp"
        android:title="Edit" />

    <item
        android:id="@+id/copy"
        android:icon="@drawable/ic_content_copy_grey_600_48dp"
        android:title="Copy" />

    <item
        android:id="@+id/save"
        android:icon="@drawable/ic_save_grey_600_48dp"
        android:title="Save" />

    <item
        android:id="@+id/mail"
        android:icon="@drawable/ic_mail_grey_600_48dp"
        android:title="Mail" />

    <item
        android:id="@+id/delete"
        android:icon="@drawable/ic_delete_grey_600_48dp"
        android:title="Delete" />

    <item
        android:id="@+id/cancel"
        android:icon="@drawable/ic_close_grey_600_48dp"
        android:title="Cancel" />

</menu>
```

**(b). list_sheet.xml**

```xml
<?xml version="1.0" encoding="utf-8"?>
<menu xmlns:android="http://schemas.android.com/apk/res/android">

    <item
        android:id="@+id/share"
        android:icon="@drawable/ic_share_grey_600_24dp"
        android:title="Share" />

    <item
        android:id="@+id/upload"
        android:icon="@drawable/ic_cloud_upload_grey_600_24dp"
        android:title="Upload" />

    <item
        android:id="@+id/copy"
        android:icon="@drawable/ic_content_copy_grey_600_24dp"
        android:title="Copy" />

    <item
        android:id="@+id/print"
        android:icon="@drawable/ic_print_grey_600_24dp"
        android:title="Print" />

</menu>
```

**(c). main.xml**

```xml
<?xml version="1.0" encoding="utf-8"?>
<menu xmlns:android="http://schemas.android.com/apk/res/android"
    xmlns:app="http://schemas.android.com/apk/res-auto">
    <item
        android:id="@+id/share"
        android:icon="@drawable/ic_share_grey_600_24dp"
        android:title="Share"
        app:showAsAction="always" />

</menu>
```

4. Create main activity layout:

**activity_main.xml**

Add several buttons in this layout:

```xml
<ScrollView xmlns:android="http://schemas.android.com/apk/res/android"
    android:layout_width="match_parent"
    android:layout_height="match_parent">

    <LinearLayout
        android:layout_width="match_parent"
        android:layout_height="wrap_content"
        android:orientation="vertical"
        android:paddingLeft="@dimen/activity_horizontal_margin"
        android:paddingTop="@dimen/activity_vertical_margin"
        android:paddingRight="@dimen/activity_horizontal_margin"
        android:paddingBottom="@dimen/activity_vertical_margin">

        <Button
            android:id="@+id/listBottomSheet"
            android:layout_width="match_parent"
            android:layout_height="wrap_content"
            android:text="Show Bottom sheet" />

        <Button
            android:id="@+id/gridBottomSheet"
            android:layout_width="match_parent"
            android:layout_height="wrap_content"
            android:text="Show Grid Bottom sheet" />

        <Button
            android:id="@+id/darkBottomSheet"
            android:layout_width="match_parent"
            android:layout_height="wrap_content"
            android:text="Show Dark Bottom sheet" />

        <Button
            android:id="@+id/darkGridBottomSheet"
            android:layout_width="match_parent"
            android:layout_height="wrap_content"
            android:text="Show Dark Grid Bottom sheet" />

        <Button
            android:id="@+id/customBottomSheet"
            android:layout_width="match_parent"
            android:layout_height="wrap_content"
            android:text="Show Custom Bottom sheet" />

        <Button
            android:id="@+id/customGridBottomSheet"
            android:layout_width="match_parent"
            android:layout_height="wrap_content"
            android:text="Show custom Grid Bottom sheet" />

        <Button
            android:id="@+id/dynamicBottomSheet"
            android:layout_width="match_parent"
            android:layout_height="wrap_content"
            android:text="Show Dynamic Bottom sheet" />
    </LinearLayout>
</ScrollView>
```

5. Write Kotlin Code

Here's the `MainActivity` code:

**MainActivity.kt**

```kotlin
import android.content.Intent
import android.os.Bundle
import android.util.Log
import android.view.Menu
import android.view.MenuItem
import android.view.View
import android.widget.Button
import android.widget.Toast
import androidx.appcompat.app.AppCompatActivity
import com.kennyc.bottomsheet.BottomSheetListener
import com.kennyc.bottomsheet.BottomSheetMenuDialogFragment
import com.kennyc.bottomsheet.menu.BottomSheetMenu
import kotlin.random.Random

class MainActivity : AppCompatActivity(), View.OnClickListener, BottomSheetListener {

    private val TAG = MainActivity::class.java.simpleName

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_main)
        findViewById<Button>(R.id.gridBottomSheet).setOnClickListener(this)
        findViewById<Button>(R.id.listBottomSheet).setOnClickListener(this)
        findViewById<Button>(R.id.darkBottomSheet).setOnClickListener(this)
        findViewById<Button>(R.id.darkGridBottomSheet).setOnClickListener(this)
        findViewById<Button>(R.id.customBottomSheet).setOnClickListener(this)
        findViewById<Button>(R.id.customGridBottomSheet).setOnClickListener(this)
        findViewById<Button>(R.id.dynamicBottomSheet).setOnClickListener(this)
    }

    override fun onClick(v: View) {
        when (v.id) {
            R.id.listBottomSheet -> BottomSheetMenuDialogFragment.Builder(context = this,
                    listener = this,
                    `object` = "some object",
                    sheet = R.menu.list_sheet)
                    .show(supportFragmentManager)

            R.id.gridBottomSheet -> BottomSheetMenuDialogFragment.Builder(context = this,
                    sheet = R.menu.grid_sheet,
                    isGrid = true,
                    title = "Options",
                    listener = this,
                    `object` = "some object")
                    .show(supportFragmentManager)

            R.id.darkBottomSheet -> BottomSheetMenuDialogFragment.Builder(context = this,
                    sheet = R.menu.list_sheet,
                    listener = this,
                    `object` = "some object")
                    .dark()
                    .show(supportFragmentManager)

            R.id.darkGridBottomSheet -> BottomSheetMenuDialogFragment.Builder(context = this,
                    sheet = R.menu.grid_sheet,
                    isGrid = true,
                    title = "Options",
                    listener = this,
                    `object` = "some object")
                    .dark()
                    .show(supportFragmentManager)

            R.id.customBottomSheet -> BottomSheetMenuDialogFragment.Builder(context = this,
                    style = R.style.Theme_BottomSheetMenuDialog_Custom,
                    sheet = R.menu.list_sheet,
                    listener = this,
                    `object` = "some object")
                    .show(supportFragmentManager)

            R.id.customGridBottomSheet -> BottomSheetMenuDialogFragment.Builder(context = this,
                    style = R.style.Theme_BottomSheetMenuDialog_Custom,
                    sheet = R.menu.grid_sheet,
                    isGrid = true,
                    title = "Options",
                    listener = this,
                    `object` = "some object")
                    .show(supportFragmentManager)

            R.id.dynamicBottomSheet -> {
                val random = Random(50)
                val items = mutableListOf<MenuItem>()

                for (i in 1..5) {
                    val menuItem = BottomSheetMenu.MenuItemBuilder(applicationContext, i, random.nextInt().toString())
                            .build()
                    items.add(menuItem)
                }

                BottomSheetMenuDialogFragment.Builder(context = this,
                        listener = this,
                        `object` = "some object",
                        menuItems = items)
                        .show(supportFragmentManager)
            }
        }
    }

    override fun onCreateOptionsMenu(menu: Menu?): Boolean {
        menuInflater.inflate(R.menu.main, menu)
        return super.onCreateOptionsMenu(menu)
    }

    override fun onOptionsItemSelected(item: MenuItem): Boolean {
        return when (item.itemId) {
            R.id.share -> {
                val intent = Intent(Intent.ACTION_SEND)
                intent.type = "text/*"
                intent.putExtra(Intent.EXTRA_TEXT, "Hey, check out the BottomSheet library https://github.com/Kennyc1012/BottomSheet")
                BottomSheetMenuDialogFragment.createShareBottomSheet(applicationContext, intent, "Share")?.show(supportFragmentManager, null)
                true
            }

            else -> super.onOptionsItemSelected(item)
        }
    }

    override fun onSheetShown(bottomSheet: BottomSheetMenuDialogFragment, `object`: Any?) {
        Log.v(TAG, "onSheetShown with Object " + `object`!!)
    }

    override fun onSheetItemSelected(bottomSheet: BottomSheetMenuDialogFragment, item: MenuItem, `object`: Any?) {
        Toast.makeText(applicationContext, item.title.toString() + " Clicked", Toast.LENGTH_SHORT).show()
    }

    override fun onSheetDismissed(bottomSheet: BottomSheetMenuDialogFragment, `object`: Any?, dismissEvent: Int) {
        Log.v(TAG, "onSheetDismissed $dismissEvent")
    }
}
```

### Run

Copy the code or download it in the link below, build and run.

### Reference

Here are the reference links:

| Number | Link |
| --- | --- |
| 1. | [Download](https://downgit.github.io/#/home?url=https://github.com/Kennyc1012/BottomSheetMenu/tree/master/sample) Example |
| 2. | [Read](https://github.com/Kennyc1012/BottomSheetMenu/) more |
| 3. | [Follow](https://github.com/Kennyc1012/) code author |

## (c). BottomSheetBuilder

> A simple library that creates BottomSheets according to the Material Design specs.

The library is Available from API 14.

Here's a screenshot of the example we will write using this library:

![](https://github.com/rubensousa/BottomSheetBuilder/raw/master/screens/normal_demo.gif)

### Step 1: Install

Install the library using the following implementation statement:

```groovy
  implementation 'com.github.rubensousa:bottomsheetbuilder:1.6.1'
```

### Step 2: Write Code

Here is how you create a BottomSheet as a View object;

```java
View bottomSheet = new BottomSheetBuilder(context, coordinatorLayout)
        .setMode(BottomSheetBuilder.MODE_GRID)
        .setBackgroundColor(android.R.color.white)
        .setMenu(R.menu.menu_bottom_grid_sheet)
        .setItemClickListener(this)
        .createView();
```

And here is how you create a BottomSheet as a Menu Dialog:

```java
BottomSheetMenuDialog dialog = new BottomSheetBuilder(context, R.style.AppTheme_BottomSheetDialog)
              .setMode(BottomSheetBuilder.MODE_LIST)
              .setMenu(R.menu.menu_bottom_simple_sheet)
              .setItemClickListener(new BottomSheetItemClickListener() {
                        @Override
                        public void onBottomSheetItemClick(MenuItem item) {

                        }
                })
              .createDialog();

dialog.show();
```

If you have a long view, you should consider adding the AppBarLayout to the builder so that the dialog doesn't overlap with it:

```java
BottomSheetMenuDialog dialog = new BottomSheetBuilder(context, R.style.AppTheme_BottomSheetDialog)
              .setAppBarLayout(appbar)
              ...
```

f you want to expand the dialog automatically:

```java
BottomSheetMenuDialog dialog = new BottomSheetBuilder(context, R.style.AppTheme_BottomSheetDialog)
              .expandOnStart(true)
              ...
```

If you want to tint the menu icons:

```java
BottomSheetMenuDialog dialog = new BottomSheetBuilder(context, R.style.AppTheme_BottomSheetDialog)
              .setIconTintColorResource(R.color.colorPrimary)
              ...
```

**Customization Methods**

```java
setItemTextColor(@ColorInt int color)
setTitleTextColor(@ColorInt int color)
setItemTextColorResource(@ColorRes int color)
setTitleTextColorResource(@ColorRes int color)
setIconTintColorResource(@ColorRes int color)
setIconTintColor(int color)
setBackground(@DrawableRes int background)
setBackgroundColorResource(@ColorRes int background)
setBackgroundColor(@ColorInt int background)
setDividerBackground(@DrawableRes int background)
setItemBackground(@DrawableRes int background)
setAppBarLayout(AppBarLayout appbar) -> To avoid overlapping
expandOnStart(boolean expand) -> Defaults to false
```

### Full Example

Let's look at a full example using this library:

1. Create Android Studio or Download it from below.
2. Install the library as has been discussed above.
3. Create Menus. You will find menus in the source code download.
4. Design Layouts. You will find layouts in the source code download.
5. Write Code

Here's our main and only activity and class:

**MainActivity.java**

```java

public class MainActivity extends AppCompatActivity implements BottomSheetItemClickListener {

    public static final String STATE_SIMPLE = "state_simple";
    public static final String STATE_HEADER = "state_header";
    public static final String STATE_GRID = "state_grid";
    public static final String STATE_LONG = "state_long";

    private BottomSheetMenuDialog mBottomSheetDialog;
    private BottomSheetBehavior mBehavior;

    @BindView(R.id.fab)
    FloatingActionButton fab;

    @BindView(R.id.appbar)
    AppBarLayout appBarLayout;

    @BindView(R.id.toolbar)
    Toolbar toolbar;

    @BindView(R.id.coordinatorLayout)
    CoordinatorLayout coordinatorLayout;

    private boolean mShowingSimpleDialog;
    private boolean mShowingHeaderDialog;
    private boolean mShowingGridDialog;
    private boolean mShowingLongDialog;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);
        ButterKnife.bind(this);
        setSupportActionBar(toolbar);

        View bottomSheet = new BottomSheetBuilder(this, coordinatorLayout)
                .setMode(BottomSheetBuilder.MODE_GRID)
                .setBackgroundColorResource(android.R.color.white)
                .setMenu(R.menu.menu_bottom_grid_sheet)
                .setItemClickListener(this)
                .createView();

        mBehavior = BottomSheetBehavior.from(bottomSheet);
        mBehavior.setBottomSheetCallback(new BottomSheetBehavior.BottomSheetCallback() {
            @Override
            public void onStateChanged(@NonNull View bottomSheet, int newState) {
                if (newState == BottomSheetBehavior.STATE_COLLAPSED) {
                    fab.show();
                }
            }

            @Override
            public void onSlide(@NonNull View bottomSheet, float slideOffset) {

            }
        });
    }

    @Override
    public void onSaveInstanceState(Bundle outState) {
        super.onSaveInstanceState(outState);
        BottomSheetBuilderUtils.saveState(outState, mBehavior);
        outState.putBoolean(STATE_SIMPLE, mShowingSimpleDialog);
        outState.putBoolean(STATE_GRID, mShowingGridDialog);
        outState.putBoolean(STATE_HEADER, mShowingHeaderDialog);
        outState.putBoolean(STATE_LONG, mShowingLongDialog);
    }

    @Override
    protected void onRestoreInstanceState(Bundle savedInstanceState) {
        super.onRestoreInstanceState(savedInstanceState);
        BottomSheetBuilderUtils.restoreState(savedInstanceState, mBehavior);
        if (savedInstanceState.getBoolean(STATE_GRID)) onShowDialogGridClick();

        if (savedInstanceState.getBoolean(STATE_HEADER)) onShowDialogHeadersClick();

        if (savedInstanceState.getBoolean(STATE_SIMPLE)) onShowDialogClick();

        if (savedInstanceState.getBoolean(STATE_LONG)) onShowLongDialogClick();
    }

    @Override
    protected void onDestroy() {
        // Avoid leaked windows
        if (mBottomSheetDialog != null) {
            mBottomSheetDialog.dismiss();
        }
        super.onDestroy();
    }

    @SuppressWarnings("unused")
    @OnClick(R.id.fab)
    public void onFabClick() {
        mBehavior.setState(BottomSheetBehavior.STATE_EXPANDED);
        fab.hide();
    }

    @SuppressWarnings("unused")
    @OnClick(R.id.showViewBtn)
    public void onShowViewClick() {
        mBehavior.setState(BottomSheetBehavior.STATE_EXPANDED);
    }

    @SuppressWarnings("unused")
    @OnClick(R.id.showDialogBtn)
    public void onShowDialogClick() {
        if (mBottomSheetDialog != null) {
            mBottomSheetDialog.dismiss();
        }

        mShowingSimpleDialog = true;
        mBottomSheetDialog = new BottomSheetBuilder(this)
                .setMode(BottomSheetBuilder.MODE_LIST)
                .setAppBarLayout(appBarLayout)
                .addTitleItem("Custom title")
                .addItem(0, "Preview", R.drawable.ic_preview_24dp)
                .addItem(1, "Share", R.drawable.ic_share_24dp)
                .addDividerItem()
                .addItem(2, "Get link", R.drawable.ic_link_24dp)
                .addItem(3, "Make a copy", R.drawable.ic_content_copy_24dp)
                .expandOnStart(true)
                .setItemClickListener(new BottomSheetItemClickListener() {
                    @Override
                    public void onBottomSheetItemClick(MenuItem item) {
                        Log.d("Item click", item.getTitle() + "");
                        mShowingSimpleDialog = false;
                    }
                })
                .createDialog();
        mBottomSheetDialog.setOnCancelListener(new DialogInterface.OnCancelListener() {
            @Override
            public void onCancel(DialogInterface dialog) {
                mShowingSimpleDialog = false;
            }
        });
        mBottomSheetDialog.show();
    }

    @SuppressWarnings("unused")
    @OnClick(R.id.showDialogHeadersBtn)
    public void onShowDialogHeadersClick() {
        if (mBottomSheetDialog != null) {
            mBottomSheetDialog.dismiss();
        }
        mShowingHeaderDialog = true;
        mBottomSheetDialog = new BottomSheetBuilder(this, R.style.AppTheme_BottomSheetDialog_Custom)
                .setMode(BottomSheetBuilder.MODE_LIST)
                .setAppBarLayout(appBarLayout)
                .setMenu(R.menu.menu_bottom_headers_sheet)
                .expandOnStart(true)
                .setItemClickListener(new BottomSheetItemClickListener() {
                    @Override
                    public void onBottomSheetItemClick(MenuItem item) {
                        Log.d("Item click", item.getTitle() + "");
                        mShowingHeaderDialog = false;
                    }
                })
                .createDialog();
        mBottomSheetDialog.setOnCancelListener(new DialogInterface.OnCancelListener() {
            @Override
            public void onCancel(DialogInterface dialog) {
                mShowingHeaderDialog = false;
            }
        });
        mBottomSheetDialog.show();
    }

    @SuppressWarnings("unused")
    @OnClick(R.id.showDialogGridBtn)
    public void onShowDialogGridClick() {
        if (mBottomSheetDialog != null) {
            mBottomSheetDialog.dismiss();
        }
        mShowingGridDialog = true;
        mBottomSheetDialog = new BottomSheetBuilder(this, R.style.AppTheme_BottomSheetDialog)
                .setMode(BottomSheetBuilder.MODE_GRID)
                .setAppBarLayout(appBarLayout)
                .setMenu(getResources().getBoolean(R.bool.tablet_landscape)
                        ? R.menu.menu_bottom_grid_tablet_sheet : R.menu.menu_bottom_grid_sheet)
                .expandOnStart(true)
                .setItemClickListener(new BottomSheetItemClickListener() {
                    @Override
                    public void onBottomSheetItemClick(MenuItem item) {
                        Log.d("Item click", item.getTitle() + "");
                        mShowingGridDialog = false;
                    }
                })
                .createDialog();

        mBottomSheetDialog.setOnCancelListener(new DialogInterface.OnCancelListener() {
            @Override
            public void onCancel(DialogInterface dialog) {
                mShowingGridDialog = false;
            }
        });
        mBottomSheetDialog.show();
    }

    @SuppressWarnings("unused")
    @OnClick(R.id.showDialogLongBtn)
    public void onShowLongDialogClick() {
        if (mBottomSheetDialog != null) {
            mBottomSheetDialog.dismiss();
        }
        mShowingLongDialog = true;
        mBottomSheetDialog = new BottomSheetBuilder(this, R.style.AppTheme_BottomSheetDialog_Custom)
                .setMode(BottomSheetBuilder.MODE_LIST)
                .setAppBarLayout(appBarLayout)
                .setMenu(R.menu.menu_bottom_list_sheet)
                .setItemClickListener(new BottomSheetItemClickListener() {
                    @Override
                    public void onBottomSheetItemClick(MenuItem item) {
                        Log.d("Item click", item.getTitle() + "");
                        mShowingLongDialog = false;
                    }
                })
                .createDialog();

        mBottomSheetDialog.setOnCancelListener(new DialogInterface.OnCancelListener() {
            @Override
            public void onCancel(DialogInterface dialog) {
                mShowingLongDialog = false;
            }
        });
        mBottomSheetDialog.show();
    }

    @Override
    public void onBottomSheetItemClick(MenuItem item) {
        mBehavior.setState(BottomSheetBehavior.STATE_COLLAPSED);
    }
}
```

### Run

Copy the code or download it in the link below, build and run.

### Reference

Here are the reference links:

| Number | Link |
| --- | --- |
| 1. | [Download](https://downgit.github.io/#/home?url=https://github.com/rubensousa/BottomSheetBuilder/tree/master/sample) Example |
| 2. | [Read](https://github.com/rubensousa/BottomSheetBuilder/) more |
| 3. | [Follow](https://github.com/rubensousa/) code author |
