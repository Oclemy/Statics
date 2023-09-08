# Kotlin Android Option Menu Examples


Menus have traditionally been the way to navigation. Nowadays more and more navigation facilities like Tabs, ViewPager and BottomNavigationBar are available.


#### Advantages of Menus

However, menus are probably still the easiet and most popular and advantageous. This is because of the following:

1. They are easy to use for users with respect to navigation.
2. Menus can confine more menu items in a small space compared to other navigation utilities like the navigationview, tabs and bottom bar.
3. Menus are typically easy to customize as we represent them via XML in many cases.
4. It's relatively easier to apply animations to menu items than other navigation components.

In this tutorial we will look at several examples of how to create menus.

## Example 1: Kotlin Options Menu Example

Let's start by looking at the most commonly used menu, the options or toolbar menu. This type of menu is especially suitable if you want to implement actions that have a global impact on the app such as settings and search. You can control how the menu items are shown based on the device.

**Demo**

Here is a demo:

![](https://github.com/alirezabashi98/Menu/raw/master/scr001.png)

![Options Menu Example Android](https://github.com/alirezabashi98/Menu/raw/master/scr002.png)

### Step 1: Dependencies

No special dependencies are needed for this project.

### Step 2: Create Menus

The next thing is to create a menu xml file inside a folder called `menu` and placed inside the `res` folder.

**menu_text.xml**

Inside it place the menu items:

```xml
<?xml version="1.0" encoding="utf-8"?>
<menu xmlns:android="http://schemas.android.com/apk/res/android"
    xmlns:app="http://schemas.android.com/apk/res-auto">

    <item
        android:id="@+id/kotlin"
        android:title="Kotloin"
        app:showAsAction="always"
        android:icon="@drawable/kotlin"/>

    <item
        android:id="@+id/info"
        android:title="info"
        android:icon="@drawable/kotlin"/>

    <item
        android:id="@+id/about"
        android:title="about us"
        android:icon="@drawable/kotlin"/>

</menu>
```

### Step 3: Create Style

Because we will be showing menus, we must make sure the theme we are using in our activity supports a toolbar. In such a case you cannot use a `NoActionBar` theme. Instead you can a theme like the one below:

**style.xml**

```xml
<resources>

    <!-- Base application theme. -->
    <style name="AppTheme" parent="Theme.AppCompat.Light.DarkActionBar">
        <!-- Customize your theme here. -->
        <item name="colorPrimary">@color/colorPrimary</item>
        <item name="colorPrimaryDark">@color/colorPrimaryDark</item>
        <item name="colorAccent">@color/colorAccent</item>
    </style>

</resources>
```

### Step 3: Handle Menu Selection Events

To do this start by overriding the two methods. Override the `onCreateOptionsMenu()` then inside it inflate the menu xml resource you had created.

```xml
    override fun onCreateOptionsMenu(menu: Menu?): Boolean {

        menuInflater.inflate(R.menu.menu_test , menu)

        return true
    }
```

Next override the `onOptionsItemSelected`:

```kotlin
    override fun onOptionsItemSelected(item: MenuItem): Boolean {
```

Here is the full code:

**MainActivity.kt**

```kotlin
import androidx.appcompat.app.AppCompatActivity
import android.os.Bundle
import android.view.Menu
import android.view.MenuItem
import android.widget.Toast

class MainActivity : AppCompatActivity() {

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_main)
    }

    override fun onCreateOptionsMenu(menu: Menu?): Boolean {

        menuInflater.inflate(R.menu.menu_test , menu)

        return true
    }

    override fun onOptionsItemSelected(item: MenuItem): Boolean {

        if (item != null)
            when(item.itemId){
                R.id.kotlin -> {
                    Toast.makeText(this,"What is Kotlin ?\n" +
                            "Kotlin is a statically-typed programming language for modern multi-platform applications.  Kotlin was developed by JetBrains, a company acclaimed for developing tools for professionals. The foremost goal of Kotlin is to provide a concise, productive and safer alternative to Java. The most common areas to use Kotlin are\n" +
                            "Building server-side code\n" +
                            "Building mobile applications that run on Android devices",Toast.LENGTH_LONG).show()
                }
                R.id.info -> {
                    Toast.makeText(this,"GitHub.com/alirezsbashi",Toast.LENGTH_SHORT).show()
                }
                R.id.about -> {
                    Toast.makeText(this,"im AlirezaBashi programming android",Toast.LENGTH_SHORT).show()
                }
            }

        return true
    }
}
```

### Run

Run the project.

### Reference

Find code links below:

| No. | Link |
| --- | --- |
| 1. | [Download](https://github.com/alirezabashi98/Menu/archive/refs/heads/master.zip) code |
| 2. | [Browse](https://github.com/alirezabashi98/Menu) code |
| 1. | [Follow](https://github.com/alirezabashi98) code author |

## Example 2: Kotlin Android Options Menu Example

> Learn how to create a toolbar options menu in this example.

### Step 1: Create Project

Start by creating an empty `Android Studio` project.

### Step 2: Dependencies

No third party libraries are needed or used.

### Step 3: Create Menu resource file

Create a folder known as `menu` under the `res` directory and inside it create `main_menu.xml`

**menu/main_menu.xml**

Add the menu items:

```xml
<?xml version="1.0" encoding="utf-8"?>
<menu xmlns:android="http://schemas.android.com/apk/res/android">

    <item
        android:id="@+id/menu_about"
        android:title="About Us" />

    <item
        android:id="@+id/menu_help"
        android:title="Help" />

    <group android:id="@+id/menu_items">

        <item
            android:id="@+id/item_1"
            android:title="Item 1"/>

        <item
            android:id="@+id/item_2"
            android:title="Item 2"/>

        <item
            android:id="@+id/item_3"
            android:title="Item 3"/>
    </group>

</menu>
```

### Step 4: Design Layout

Here is our layout:

**activity_main.xml**

```xml
<?xml version="1.0" encoding="utf-8"?>
<androidx.constraintlayout.widget.ConstraintLayout xmlns:android="http://schemas.android.com/apk/res/android"
    xmlns:app="http://schemas.android.com/apk/res-auto"
    xmlns:tools="http://schemas.android.com/tools"
    android:layout_width="match_parent"
    android:layout_height="match_parent"
    tools:context=".MainActivity">

    <TextView
        android:layout_width="wrap_content"
        android:layout_height="wrap_content"
        android:text="Hello World!"
        app:layout_constraintBottom_toBottomOf="parent"
        app:layout_constraintLeft_toLeftOf="parent"
        app:layout_constraintRight_toRightOf="parent"
        app:layout_constraintTop_toTopOf="parent" />

</androidx.constraintlayout.widget.ConstraintLayout>
```

### Step 5: Write Code

Inflate the `main_menu.xml` inside the `onCreateOptionsMenu()` callback:

```kotlin
    override fun onCreateOptionsMenu(menu: Menu?): Boolean {
        super.onCreateOptionsMenu(menu)
        menuInflater.inflate(R.menu.main_menu, menu)
        return true
    }
```

Then get the selected menu item as follows:

```kotlin
    override fun onOptionsItemSelected(item: MenuItem): Boolean {

        var selectedOption = ""

        when(item.itemId)
        {
            R.id.menu_about -> selectedOption = "About Us"
            R.id.menu_help -> selectedOption = "Help"
            R.id.item_1 -> selectedOption = "Item 1"
            R.id.item_2 -> selectedOption = "Item 2"
            R.id.item_3 -> selectedOption = "Item 3"
        }
        Toast.makeText(this,"Option : $selectedOption", Toast.LENGTH_SHORT).show()

        return super.onOptionsItemSelected(item)
    }
```

Here is the full code:

**MainActivity.kt**

```kotlin
import androidx.appcompat.app.AppCompatActivity
import android.os.Bundle
import android.view.Menu
import android.view.MenuItem
import android.widget.Toast

class MainActivity : AppCompatActivity() {

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_main)
    }

    override fun onCreateOptionsMenu(menu: Menu?): Boolean {
        super.onCreateOptionsMenu(menu)
        menuInflater.inflate(R.menu.main_menu, menu)
        return true
    }

    override fun onOptionsItemSelected(item: MenuItem): Boolean {

        var selectedOption = ""

        when(item.itemId)
        {
            R.id.menu_about -> selectedOption = "About Us"
            R.id.menu_help -> selectedOption = "Help"
            R.id.item_1 -> selectedOption = "Item 1"
            R.id.item_2 -> selectedOption = "Item 2"
            R.id.item_3 -> selectedOption = "Item 3"
        }
        Toast.makeText(this,"Option : $selectedOption", Toast.LENGTH_SHORT).show()

        return super.onOptionsItemSelected(item)
    }
}
```

### Run

Copy the code or download it in the link below, build and run.

### Reference

Here are the reference links:

| Number | Link |
| --- | --- |
| 1. | [Download](https://github.com/Kiran-Bahalaskar/Option-Menu-Using-Kotlin/archive/refs/heads/master.zip) Example |
| 2. | [Follow](https://github.com/Kiran-Bahalaskar/) code author |
| 3. | Code: [Apache 2.0 License](http://www.apache.org/licenses/LICENSE-2.0.txt) |

## Example 3: ActionBar DropDown Menu Example

_Android ActionBar Dropdown Navigation List_

This is an android actionbar dropdown menu example.Display a simple dropdown menu and handle its itemClicks.

#### Section 1 : MainActivity

```java
    package com.tutorials.dropdownnav;

    import android.app.ActionBar;
    import android.app.ActionBar.OnNavigationListener;
    import android.app.Activity;
    import android.os.Bundle;
    import android.widget.ArrayAdapter;
    import android.widget.Toast;

    public class MainActivity extends Activity {

      //DROPDOWN MENU ITEMS
      String[] actions={"Add","Save","Update","Delete","Copy"};
      ArrayAdapter<String> adapter;

        @Override
        protected void onCreate(Bundle savedInstanceState) {
            super.onCreate(savedInstanceState);
            setContentView(R.layout.activity_main);

            //ADAPTER INITIALIZATION
            adapter=new ArrayAdapter<String>(this, android.R.layout.simple_expandable_list_item_1, actions);

            //GET ACTIONBAR
            ActionBar ab=getActionBar();

            ab.setNavigationMode(ActionBar.NAVIGATION_MODE_LIST);

            //GET ACTIONBAR LISTENER
            ActionBar.OnNavigationListener listener=new OnNavigationListener() {

          @Override
          public boolean onNavigationItemSelected(int pos, long id) {
            // WE SHOW SIMPLE TOAST WHEN A DROPDOWN ITEM IS SELECTED
            Toast.makeText(getApplicationContext(), actions[pos], Toast.LENGTH_SHORT).show();
            return false;
          }
        };
        //SET ADAPTER AND LISTENER TO ACTION BAR
        ab.setListNavigationCallbacks(adapter, listener);

        }

    }
```

#### Layout

This is our layout. We include nothing of note.

```xml
    <RelativeLayout
        android_layout_width="match_parent"
        android_layout_height="match_parent"
        android_paddingBottom="@dimen/activity_vertical_margin"
        android_paddingLeft="@dimen/activity_horizontal_margin"
        android_paddingRight="@dimen/activity_horizontal_margin"
        android_paddingTop="@dimen/activity_vertical_margin"
        tools_context=".MainActivity" >

    </RelativeLayout>
```

Good day.

## Exampole 4: How to Create Options Menu Programmatically

What about if you want to create your Options Menu without touching XML. Well you can do it in pure Java or Kotlin, or rather create your Menu programmatically. This is what this example is about.

Here is the demo screenshot of the project we will create:

![Options menu Example](https://camposha.info/android-examples/wp-content/uploads/sites/9/2021/05/Options-menu-Example.png)

Let's start.

### Step 1: Create Project

Start by creating an empty `Android Studio` project.

### Step 2: Dependencies

No special or third party dependencies are needed for this example.

### Step 3: Layout

We just have a dummy layout for our MainActivity with a simple TextView.

**activity_main.xml**

```xml
<?xml version="1.0" encoding="utf-8"?>
<RelativeLayout xmlns:android="http://schemas.android.com/apk/res/android"
    xmlns:tools="http://schemas.android.com/tools"
    android:layout_width="match_parent"
    android:layout_height="match_parent"
    android:paddingBottom="@dimen/activity_vertical_margin"
    android:paddingLeft="@dimen/activity_horizontal_margin"
    android:paddingRight="@dimen/activity_horizontal_margin"
    android:paddingTop="@dimen/activity_vertical_margin"
    tools:context="com.example.ankitkumar.optionmenubycode.MainActivity">

    <TextView
        android:layout_width="wrap_content"
        android:layout_height="wrap_content"
        android:text="Hello World!" />
</RelativeLayout>
```

### Step 4: Write Code

To programmatically create the menu all you need to do is override the `onCreateOptionsMenu()` function then add menu items to the passed `Menu`object as follows:

```java

    @Override
    public boolean onCreateOptionsMenu(Menu menu) {

        menu.add(1, 1, 0, "Option1");

        menu.add(1, 2, 1, "Option2");

        menu.add(1, 3, 2, "Option3");
        return true;
    }
```

You can then handle the Selected Menu item events as follows:

```java
    @Override
    public boolean onOptionsItemSelected(MenuItem item) {

        switch (item.getItemId()){
            case 1:
                Toast.makeText(this, "Clicked on Option 1", Toast.LENGTH_SHORT).show();
                break;
            case 2:
                Toast.makeText(this, "Clicked on Option 2", Toast.LENGTH_SHORT).show();
                break;
            case 3:
                Toast.makeText(this, "Clicked on Option 3", Toast.LENGTH_SHORT).show();
                break;

        }
        return true;
    }
```

Here is the full code:

**MainActivity**

```java
public class MainActivity extends AppCompatActivity {

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);
    }

    @Override
    public boolean onCreateOptionsMenu(Menu menu) {

        menu.add(1, 1, 0, "Option1");

        menu.add(1, 2, 1, "Option2");

        menu.add(1, 3, 2, "Option3");
        return true;
    }

    @Override
    public boolean onOptionsItemSelected(MenuItem item) {

        switch (item.getItemId()){
            case 1:
                Toast.makeText(this, "Clicked on Option 1", Toast.LENGTH_SHORT).show();
                break;
            case 2:
                Toast.makeText(this, "Clicked on Option 2", Toast.LENGTH_SHORT).show();
                break;
            case 3:
                Toast.makeText(this, "Clicked on Option 3", Toast.LENGTH_SHORT).show();
                break;

        }
        return true;
    }
}
```

### Run

Copy the code or download it in the link below, build and run.

### Reference

Here are the reference links:

| Number | Link |
| --- | --- |
| 1. | [Download](https://github.com/AnkitKumar111/Android_Assignment9.2/archive/refs/heads/master.zip) Example |
| 2. | [Follow](https://github.com/AnkitKumar111/) code author |
