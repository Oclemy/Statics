# Kotlin Android PopupMenu Example


In this tutorial you will learn how to create a popupmenu. This type of menu typically gets anchored on a view and gets shown below or above the view depending on the room available and the trigger event.


What is a popupmenu, according to [android's documentation](https://developer.android.com/reference/android/widget/PopupMenu).

> A PopupMenu displays a Menu in a modal popup window anchored to a View. The popup will appear below the anchor view if there is room, or above it if there is not. If the IME is visible the popup will not overlap it until it is touched. Touching outside of the popup will dismiss it.

## Example 1 - Kotlin Popupmenu Example

Here is a simple popupmenu in kotlin android. Follow the following steps to create and run the example.

### Step 1: Dependencies.

No special or third party dependency is needed.

### Step 2: Create Menu resource file

Create a folder called `menu` under the `res` directory and in it create a file called `popup_menu_button.xml`

**`popup_menu_button.xml`**

In this file create a menu and in it create the menu items as follows:

```xml
<?xml version="1.0" encoding="utf-8"?>
<menu xmlns:android="http://schemas.android.com/apk/res/android"
    xmlns:app="http://schemas.android.com/apk/res-auto">

    <item
        android:id="@+id/popMenu_Edit"
        android:icon="@drawable/ic_edit"
        android:title="Edite"/>

    <item
        android:id="@+id/popMenu_Delete"
        android:icon="@drawable/ic_delete"
        android:title="Delete"/>

    <item
        android:id="@+id/popMEnu_Shared"
        android:icon="@drawable/ic_share"
        android:title="Shared" />

</menu>
```

### Step 3: Create XML Layout

Add a `TextView` and a `Button` inside a `ConstraintLayout` as follows:

**`activity_main.xm`**

```xml
<?xml version="1.0" encoding="utf-8"?>
<androidx.constraintlayout.widget.ConstraintLayout xmlns:android="http://schemas.android.com/apk/res/android"
    xmlns:app="http://schemas.android.com/apk/res-auto"
    xmlns:tools="http://schemas.android.com/tools"
    android:layout_width="match_parent"
    android:layout_height="match_parent"
    tools:context=".activity.MainActivity">

    <TextView
        android:id="@+id/textView"
        android:layout_width="wrap_content"
        android:layout_height="wrap_content"
        android:text="Hello World!"
        app:layout_constraintBottom_toBottomOf="parent"
        app:layout_constraintLeft_toLeftOf="parent"
        app:layout_constraintRight_toRightOf="parent"
        app:layout_constraintTop_toTopOf="parent" />

    <Button
        android:id="@+id/button"
        android:layout_width="wrap_content"
        android:layout_height="wrap_content"
        android:layout_marginTop="32dp"
        android:text="Show popup Menu"
        android:textAllCaps="false"
        app:layout_constraintEnd_toEndOf="parent"
        app:layout_constraintStart_toStartOf="parent"
        app:layout_constraintTop_toBottomOf="@+id/textView" />

</androidx.constraintlayout.widget.ConstraintLayout>
```

### Step 4: Create a Popup

Create a class called `ShowPopupMenu.kt` and add the code to instantiate the PopupMenu and inflate the menu items and listen to their click events. Here is the full code:

**`ShowPopupMenu.kt`**

```kotlin
import android.content.Context
import android.view.View
import android.widget.PopupMenu
import android.widget.Toast
import com.example.simple.show.popmenu.R

class ShowPopupMenu {

     fun showPopMenu(context: Context, view: View) {

        val pop = PopupMenu(context, view)
        pop.inflate(R.menu.pop_menu_button)

        pop.setOnMenuItemClickListener {
            when (it!!.itemId) {
                R.id.popMenu_Edit -> {
                    Toast.makeText(context, "item Edite", Toast.LENGTH_SHORT).show()
                    true
                }
                R.id.popMenu_Delete -> {
                    Toast.makeText(context, "item Delete", Toast.LENGTH_SHORT).show()
                    true
                }
                R.id.popMEnu_Shared -> {
                    Toast.makeText(context, "item Shared", Toast.LENGTH_SHORT).show()
                    true
                }
                else -> false

            }
        }

         try {

             val fieldMpopup = PopupMenu::class.java.getDeclaredField("mPopup")
             fieldMpopup.isAccessible= true
             val mPopup = fieldMpopup.get(pop)
             mPopup.javaClass
                 .getDeclaredMethod("setFoeceShowIcon",Boolean::class.java)
                 .invoke(mPopup,true)

         }catch (e:Exception){

         }finally {
             pop.show()
         }

    }

}
```

### Step 5: Laucher Activity

Here is the code for the main activity:

**`MainActivity.kt`**

```kotlin
import android.os.Bundle
import android.widget.Button
import androidx.appcompat.app.AppCompatActivity
import com.example.simple.show.popmenu.R
import com.example.simple.show.popmenu.utility.ShowPopupMenu

class MainActivity : AppCompatActivity() {

    lateinit var buttonShowPopupMenu: Button
    val showPopMenu = ShowPopupMenu()

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_main)

        Cast()

        buttonShowPopupMenu.setOnClickListener {
            showPopMenu.showPopMenu(this, it)
        }

    }

    private fun Cast() {
        buttonShowPopupMenu = findViewById(R.id.button)
    }

}
```

### Step 6: Run

Finally run the project.

### Reference

Here are the code reference links:

| Number | Link |
| --- | --- |
| 1. | [Download code](https://github.com/alirezabashi98/simple-pop-menu/archive/refs/heads/master.zip) |
| 2. | [Follow code author](https://github.com/alirezabashi98/) |
