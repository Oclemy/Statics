# MaterialNavigationView-Android

>  Android Library to implement Rich, Beautiful, Stylish Material Navigation View for your project with Material Design Guidelines. Easy to use.

Here is a demo of `NavigationView` implemented using this library:

![NavigationView Libraries Tutorial](https://github.com/PatilShreyas/MaterialNavigationView-Android/raw/master/Images/GitHub.png)


### Step 1: Requirements

Make sure you have the following enabled in your project:

- AndroidX
- Minimum SDK API 19
- Theme - Material Components

### Step 2: Add Dependency

In `Build.gradle` of app module, include these dependencies.

```groovy
dependencies {

    // Material Navigation View Library
    implementation 'com.shreyaspatil:MaterialNavigationView:1.2'

    // Material Design Library
    implementation 'com.google.android.material:material:1.0.0'
}
```


### Step 3: Set up Material Theme

In your `styles.xml` setup a Material theme as follows:

```xml
<resources>
    <style name="AppTheme" parent="Theme.MaterialComponents.Light">
        <!-- Customize your theme here. -->
        <item name="colorPrimary">@color/colorPrimary</item>
        <item name="colorPrimaryDark">@color/colorPrimaryDark</item>
        <item name="colorAccent">@color/colorAccent</item>
        
        <!-- colorSecondary will be applied to Menu item of NavigationView -->
        <item name="colorSecondary">@color/colorPrimary</item>
        ...
    </style>
</resources>
```

These are required prerequisites to implement Material Navigation View library.

### Step 4: Create Activity XML

Then add the `DrawerLayout` in your xml layout:

```xml
<androidx.drawerlayout.widget.DrawerLayout xmlns:android="http://schemas.android.com/apk/res/android"
    xmlns:app="http://schemas.android.com/apk/res-auto"
    xmlns:tools="http://schemas.android.com/tools"
    android:id="@+id/drawer_layout"
    android:layout_width="match_parent"
    android:layout_height="match_parent"
    android:fitsSystemWindows="true"
    tools:openDrawer="start">

    <!-- Other Stuff here -->

    <com.shreyaspatil.material.navigationview.MaterialNavigationView
        android:id="@+id/nav_view"
        android:theme="@style/Widget.NavigationView.RippleEffect"
        android:layout_width="wrap_content"
        android:layout_height="match_parent"
        app:itemStyle="rounded_right"
        app:menu="@menu/activity_main_drawer"/>

</androidx.drawerlayout.widget.DrawerLayout>
```


#### Available Flags

![NavigationView Libraries Tutorial](https://github.com/PatilShreyas/MaterialNavigationView-Android/raw/master/Images/DefaultStyle.png)

![NavigationView Libraries Tutorial](https://github.com/PatilShreyas/MaterialNavigationView-Android/raw/master/Images/RoundRightFull.png)

![NavigationView Libraries Tutorial](https://github.com/PatilShreyas/MaterialNavigationView-Android/raw/master/Images/RoundRectFull.png)

Example as follows:

```xml
<com.shreyaspatil.material.navigationview.MaterialNavigationView
        ...
        app:itemStyle="rounded_right"/>
```

Thus, we have successfully implemented design styles of Menu items.

### Step 5: Create Activity Code (Java/Kotlin)

Here is a demo of `MaterialNavigationView` in which we will switch item style of `NavigationView` after selecting menu:

```kotlin
class MainActivity : AppCompatActivity() {
    private lateinit var navView: MaterialNavigationView

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_main)
        ...
        navView = findViewById(R.id.nav_view)
        ...
    }

    override fun onOptionsItemSelected(item: MenuItem): Boolean {
        when (item.itemId) {
            R.id.action_default -> {
                navView.setItemStyle(MaterialNavigationView.ITEM_STYLE_DEFAULT)
            }
            R.id.action_round_rect -> {
                navView.setItemStyle(MaterialNavigationView.ITEM_STYLE_ROUND_RECTANGLE)
            }
            R.id.action_round_right -> {
                navView.setItemStyle(MaterialNavigationView.ITEM_STYLE_ROUND_RIGHT)
            }
        }
        return false
    }
}
```

### Migrating from NavigationView

- Change in layout file - Just change package of component from `com.google.android.material.navigation.NavigationView` to `com.shreyaspatil.material.navigationview.MaterialNavigationView` wherever you used it.
- Change in Activity Code - Just change `NavigationView` class to Material`NavigationView` and import appropriate package.
🔥 Hurrah! you are done and successfully migrated to `MaterialNavigationView`. Now just run your app and see magic.

### Reference

|2.|Read more [here](https://github.com/PatilShreyas/MaterialNavigationView-Android).|
|3.|Follow code author [here](https://github.com/PatilShreyas).|
