# Best Android NavigationDrawer and NavigationView Libraries


One of the most intuitive navigation UI component in android is the navigation drawer. First there is the standard NavigationView which is great and customizable. However there are other arguably more flexible options available as third party libraries. Lets look at them.


### (a). MaterialDrawer

A flexible, easy to use, all in one drawer library for your Android project.

![](https://camposha.info/wp-content/uploads/2020/12/mikepenz_MaterialDrawer.jpg)

**Features**

- _the easiest possible integration_
- _uses the androidX support libraries_
- compatible down to _API Level 16_
- includes an _AccountSwitcher_
- quick and simple api
- follows the _NEW Google Material Design Guidelines_
- use _vector_ (.svg) icons and _icon fonts_ via the [Android-Iconics](https://github.com/mikepenz/Android-Iconics) integration
    - _Google Material Design Icons_, Google _Material Community_ Design Icons, FontAwesome and more
- comes with various _themes_ which help to get your own themes clean
- modify the colors on the go
- comes with multiple default drawer items
- based on a _RecyclerView_
- _RTL_ support
- Gmail like _MiniDrawer_
- expandable items
- _badge_ support
- define custom drawer items
- tested and _stable_
- sticky footer or headers
- _absolutely NO limits_
- NavController support by @petretiandrea

**Step 1: Installation**

```gradle
implementation "com.mikepenz:materialdrawer:${lastestMaterialDrawerRelease}"

//required support lib modules
implementation "androidx.appcompat:appcompat:${versions.appcompat}"
implementation "androidx.recyclerview:recyclerview:${versions.recyclerView}"
implementation "androidx.annotation:annotation:${versions.annotation}"
implementation "com.google.android.material:material:${versions.material}"
implementation "androidx.constraintlayout:constraintlayout:${versions.constraintLayout}"

// Add for NavController support
implementation "com.mikepenz:materialdrawer-nav:${lastestMaterialDrawerRelease}"

// Add for Android-Iconics support
implementation "com.mikepenz:materialdrawer-iconics:${lastestMaterialDrawerRelease}"
```

You can find dependency versions and all library releases on [MVN Repository](https://mvnrepository.com/artifact/com.mikepenz/materialdrawer).

**Step 2: Add the `Drawer` into the XML**

The `MaterialDrawerSliderView` has to be provided as child of the `DrawerLayout` and will as such act as the slider

```kotlin
<androidx.drawerlayout.widget.DrawerLayout xmlns:android="http://schemas.android.com/apk/res/android"
    xmlns:app="http://schemas.android.com/apk/res-auto"
    android:id="@+id/root"
    android:layout_width="match_parent"
    android:layout_height="match_parent"
    android:fitsSystemWindows="true">

    ... your content ...

    <com.mikepenz.materialdrawer.widget.MaterialDrawerSliderView
        android:id="@+id/slider"
        android:layout_width="wrap_content"
        android:layout_height="match_parent"
        android:layout_gravity="start"
        android:fitsSystemWindows="true" />
</androidx.drawerlayout.widget.DrawerLayout>
```

**Step 3: Add the `DrawerStyle` to your theme**

```xml
<style name="SampleApp.DayNight" parent="Theme.MaterialComponents.DayNight.NoActionBar">
    ...
    <item name="materialDrawerStyle">@style/Widget.MaterialDrawerStyle</item>
    <item name="materialDrawerHeaderStyle">@style/Widget.MaterialDrawerHeaderStyle</item>
    ...
</style>
```

Great. Your drawer is now ready to use.

**Additional Setup**

**Add items and adding some functionality**

```kotlin
//if you want to update the items at a later time it is recommended to keep it in a variable
val item1 = PrimaryDrawerItem().withIdentifier(1).withName(R.string.drawer_item_home)
val item2 = SecondaryDrawerItem().withIdentifier(2).withName(R.string.drawer_item_settings)

// get the reference to the slider and add the items
slider.itemAdapter.add(
        item1,
        DividerDrawerItem(),
        item2,
        SecondaryDrawerItem().withName(R.string.drawer_item_settings)
)

// specify a click listener
slider.onDrawerItemClickListener = { v, drawerItem, position ->
    // do something with the clicked item :D
    false
}
```

**Selecting an item**

```kotlin
//set the selection to the item with the identifier 1
slider.setSelection(1)
//set the selection to the item with the identifier 2
slider.setSelection(item2)
//set the selection and also fire the `onItemClick`-listener
slider.setSelection(1, true)
```

By default, when a drawer item is clicked, it becomes the new selected item. If this isn't the expected behavior, you can disable it for this item using `withSelectable(false)`:

```kotlin
SecondaryDrawerItem().withName(R.string.drawer_item_dialog).withSelectable(false)
```

**Modify items or the drawer**

```kotlin
//modify an item of the drawer
item1.withName("A new name for this drawerItem").withBadge("19").withBadgeStyle(new BadgeStyle().withTextColor(Color.WHITE).withColorRes(R.color.md_red_700))
//notify the drawer about the updated element. it will take care about everything else
slider.updateItem(item1)

//to update only the name, badge, icon you can also use one of the quick methods
slider.updateName(1, "A new name")

//the result object also allows you to add new items, remove items, add footer, sticky footer, ..
slider.addItem(DividerDrawerItem())
slider.addStickyFooterItem(PrimaryDrawerItem().withName("StickyFooterItem"))

//remove items with an identifier
slider.removeItem(2)

//open / close the drawer
slider.drawerLayout?.openDrawer(slider)
slider.drawerLayout?.closeDrawer(slider)

//get the reference to the `DrawerLayout` itself
slider.drawerLayout
```

**Add profiles and an AccountHeader**

```kotlin
// Create the AccountHeader
headerView = AccountHeaderView(this).apply {
    attachToSliderView(slider) // attach to the slider
    addProfiles(
        ProfileDrawerItem().withName("Mike Penz").withEmail("mikepenz@gmail.com").withIcon(getResources().getDrawable(R.drawable.profile))
    )
    onAccountHeaderListener = { view, profile, current ->
        // react to profile changes
        false
    }
    withSavedInstance(savedInstanceState)
}
```

**Android-Iconics support**

The MaterialDrawer provides an extension for the [Android-Iconics](https://github.com/mikepenz/Android-Iconics) library. This allows you to create your `DrawerItems` with an icon from any font.

Choose the fonts you need. [Available Fonts](https://github.com/mikepenz/Android-Iconics#2-choose-your-desired-fonts)

```gradle
// Add for Android-Iconics support
implementation "com.mikepenz:materialdrawer-iconics:${lastestMaterialDrawerRelease}"

// fonts
implementation 'com.mikepenz:google-material-typeface:x.y.z@aar' //Google Material Icons
implementation 'com.mikepenz:fontawesome-typeface:x.y.z@aar'     //FontAwesome
```

```kotlin
//now you can simply use any icon of the Google Material Icons font
PrimaryDrawerItem().withIcon(GoogleMaterial.Icon.gmd_wb_sunny)
//Or an icon from FontAwesome
SecondaryDrawerItem().withIcon(FontAwesome.Icon.faw_github)
```

**Advanced Setup**

For advanced usecases. Please have a look at the provided sample activities.

**Load images via url**

The MaterialDrawer supports fetching images from URLs and setting them for the Profile icons. As the MaterialDrawer does not contain an ImageLoading library the dev can choose his own implementation (Picasso, Glide, ...). This has to be done, before the first image should be loaded via URL. (Should be done in the Application, but any other spot before loading the first image is working too)

- SAMPLE using [PICASSO](https://github.com/square/picasso)
- [SAMPLE](https://github.com/mikepenz/MaterialDrawer/blob/develop/app/src/main/java/com/mikepenz/materialdrawer/app/CustomApplication.java) using [GLIDE](https://github.com/bumptech/glide)

```kotlin
//initialize and create the image loader logic
DrawerImageLoader.init(object : AbstractDrawerImageLoader() {
    override fun set(imageView: ImageView, uri: Uri, placeholder: Drawable) {
        Picasso.get().load(uri).placeholder(placeholder).into(imageView)
    }

    override fun cancel(imageView: ImageView) {
        Picasso.get().cancelRequest(imageView)
    }

    /*
    override fun set(imageView: ImageView, uri: Uri, placeholder: Drawable, tag: String?) {
        super.set(imageView, uri, placeholder, tag)
    }

    override fun placeholder(ctx: Context): Drawable {
        return super.placeholder(ctx)
    }

    override fun placeholder(ctx: Context, tag: String?): Drawable {
        return super.placeholder(ctx, tag)
    }
    */
})
```

An implementation with [GLIDE v4](https://github.com/mikepenz/MaterialDrawer/blob/develop/app/src/main/java/com/mikepenz/materialdrawer/app/CustomApplication.java#L42) (See tag v6.1.1 for glide v3 sample) can be found in the sample application

**JVM Target 1.8**

```
// Since 8.1.0 the drawer includes core ktx 1.3.0 which requires jvm 1.8
kotlinOptions {
    jvmTarget = "1.8"
}
```

**Download**

1. Download code or read more [here](https://github.com/mikepenz/MaterialDrawer).
2. Follow library author [here](https://github.com/mikepenz).

## (b). Floating NavigationView

> A simple Floating Action Button that shows an anchored Navigation View.

You can use this library to achieve a floating navigation drawer. Here's it's demo:

![Android Floating NavigationView](https://raw.githubusercontent.com/andremion/Floating-Navigation-View/master/art/sample.gif)

### Step 1: Install Floating NavigationView

First install this library from jcenter by adding the following into your dependencies closure:

```groovy
implementation 'com.github.andremion:floatingnavigationview:1.3.0'
```

### Step 2: Add to Layout

The next step is to add it to your layout:

```xml
<?xml version="1.0" encoding="utf-8"?>
<androidx.coordinatorlayout.widget.CoordinatorLayout
    xmlns:android="http://schemas.android.com/apk/res/android"
    xmlns:app="http://schemas.android.com/apk/res-auto"
    android:layout_width="match_parent"
    android:layout_height="match_parent">

    <com.google.android.material.appbar.AppBarLayout
        android:layout_width="match_parent"
        android:layout_height="wrap_content"
        android:fitsSystemWindows="true">

    ...

    <com.andremion.floatingnavigationview.FloatingNavigationView
        android:id="@+id/floating_navigation_view"
        android:layout_width="wrap_content"
        android:layout_height="wrap_content"
        android:layout_margin="@dimen/fab_margin"
        android:theme="@style/AppTheme.AppBarOverlay"
        app:layout_anchor="@id/toolbar"
        app:layout_anchorGravity="bottom|end"
        app:drawMenuBelowFab="true"
        app:headerLayout="@layout/navigation_view_header"
        app:menu="@menu/menu_navigation_view" />

</androidx.coordinatorlayout.widget.CoordinatorLayout>
```

### Example

Here's an example of handling click events with this floating navigation view:

```java
public class MainActivity extends AppCompatActivity {

    private FloatingNavigationView mFloatingNavigationView;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);
        Toolbar toolbar = (Toolbar) findViewById(R.id.toolbar);
        setSupportActionBar(toolbar);

        mFloatingNavigationView = (FloatingNavigationView) findViewById(R.id.floating_navigation_view);
        mFloatingNavigationView.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View view) {
                mFloatingNavigationView.open();
            }
        });
        mFloatingNavigationView.setNavigationItemSelectedListener(new NavigationView.OnNavigationItemSelectedListener() {
            @Override
            public boolean onNavigationItemSelected(MenuItem item) {
                Snackbar.make((View) mFloatingNavigationView.getParent(), item.getTitle() + " Selected!", Snackbar.LENGTH_SHORT).show();
                mFloatingNavigationView.close();
                return true;
            }
        });
    }

    @Override
    public void onBackPressed() {
        if (mFloatingNavigationView.isOpened()) {
            mFloatingNavigationView.close();
        } else {
            super.onBackPressed();
        }
    }

}
```

You can find the layouts [here](https://github.com/andremion/Floating-Navigation-View/tree/master/sample/src/main/res/layout).

### Reference

Find complete source code reference [here](https://github.com/andremion/Floating-Navigation-View).
