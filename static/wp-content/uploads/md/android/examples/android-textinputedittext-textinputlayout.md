# TextInputEditText and TextInputLayout Example


This is an android TextInputEditText tutorial and example.


### TextInputEditText

> TextInputEditText is a special sub-class of EditText designed for use as a child of TextInputLayout.

Using it allows us to display a hint in the IME when in 'extract' mode and provides accessibility support for TextInputLayout.

### TextInputLayout

> TextInputLayout is a layout that wraps a TextInputEditText, `EditText`, or descendant to show a floating label when the hint is hidden while the user inputs text.

It also supports:

- Showing an error via `setErrorEnabled(boolean)` and `[setError(CharSequence)`, along with showing an error icon via `setErrorIconDrawable(Drawable)`
    
- Showing helper text via `setHelperTextEnabled(boolean)` and `setHelperText(CharSequence)`
    
- Showing placeholder text via `setPlaceholderText(CharSequence)`
    
- Showing prefix text via `setPrefixText(CharSequence)`
    
- Showing suffix text via `setSuffixText(CharSequence)`
    
- Showing a character counter via `setCounterEnabled(boolean)` and `setCounterMaxLength(int)`
    
- Password visibility toggling via `setEndIconMode(int)` API and related attribute. If set, a button is displayed to toggle between the password being displayed as plain-text or disguised, when your EditText is set to display a password.
    
- Clearing text functionality via `setEndIconMode(int)` API and related attribute. If set, a button is displayed when text is present and clicking it clears the EditText field.
    
- Showing a custom icon specified via `setEndIconMode(int)` API and related attribute. You should specify a drawable and content description for the icon. Optionally, you can also specify an `View.OnClickListener`, an `TextInputLayout.OnEditTextAttachedListener` and an `TextInputLayout.OnEndIconChangedListener`.
    
- Showing a start icon via `setStartIconDrawable(Drawable)` API and related attribute. You should specify a content description for the icon. Optionally, you can also specify an `View.OnClickListener` for it.
    
- Showing a button that when clicked displays a dropdown menu. The selected option is displayed above the dropdown. You need to use an `AutoCompleteTextView` instead of a `TextInputEditText` as the input text child, and a Widget.MaterialComponents.TextInputLayout.(...).ExposedDropdownMenu style.
    

Let us look at a full example

## Kotlin Android TextInputEditText and TextInputLayout Example

Here is what we create:

![Kotlin Android TextInputEditText Example](https://github.com/alirezabashi98/Test-TextInputEditText/raw/master/scr001.png)

### Step 1: Create Project

Start by creating an empty project in android studio.

### Step 2: Dependencies

To use `TextInputEditText` we need to add the following dependency in our `app/build.gradle` file:

```groovy
    implementation 'com.google.android.material:material:1.1.0'
```

We will also be using a circular imageview so we add the following:

```groovy
//        circle image view
    implementation 'de.hdodenhof:circleimageview:3.1.0'
```

### Step 3: Design Layout

Create the following layout for our `MainActivity` and add the widgets as specified:

**activity_main.xml**

```xml
<?xml version="1.0" encoding="utf-8"?>
<LinearLayout xmlns:android="http://schemas.android.com/apk/res/android"
    xmlns:app="http://schemas.android.com/apk/res-auto"
    xmlns:tools="http://schemas.android.com/tools"
    android:layout_width="match_parent"
    android:layout_height="match_parent"
    tools:context=".MainActivity"
    android:orientation="vertical"
    android:layout_gravity="center"
    android:gravity="center">

    <de.hdodenhof.circleimageview.CircleImageView
        android:id="@+id/profile_image"
        android:layout_width="200dp"
        android:layout_height="200dp"
        android:src="@drawable/users"
        app:civ_border_width="2dp"
        app:civ_border_color="#F44336"
        android:layout_margin="20dp"/>

    <com.google.android.material.textfield.TextInputLayout
        android:id="@+id/tip_main_user"
        android:layout_width="match_parent"
        android:layout_height="wrap_content"
        app:counterEnabled="true"
        app:errorEnabled="true"
        app:counterMaxLength="30"
        android:layout_marginRight="20dp"
        android:layout_marginLeft="20dp">

        <com.google.android.material.textfield.TextInputEditText
            android:inputType="text"
            android:layout_width="match_parent"
            android:layout_height="wrap_content"
            android:hint="UserName" />

    </com.google.android.material.textfield.TextInputLayout>

    <com.google.android.material.textfield.TextInputLayout
        android:id="@+id/tip_main_password"
        android:layout_width="match_parent"
        android:layout_height="wrap_content"
        app:passwordToggleEnabled="true"
        android:layout_marginRight="20dp"
        android:layout_marginLeft="20dp"
        app:counterEnabled="true"
        app:errorEnabled="true"
        app:counterMaxLength="15">

        <com.google.android.material.textfield.TextInputEditText
            android:inputType="textPassword"
            android:layout_width="match_parent"
            android:layout_height="wrap_content"
            android:hint="Password"
            android:maxLength="15"/>

    </com.google.android.material.textfield.TextInputLayout>

    <Button
        android:id="@+id/btn"
        android:layout_width="match_parent"
        android:layout_height="wrap_content"
        android:layout_marginRight="20dp"
        android:layout_marginLeft="20dp"
        android:text="Login"/>

</LinearLayout>
```

### Step 4: Write Code

Below is the code for the `MainActivity`:

**MainActivity.kt**

```kotlin
package arb.test.text.input.layout

import androidx.appcompat.app.AppCompatActivity
import android.os.Bundle
import android.widget.Toast
import kotlinx.android.synthetic.main.activity_main.*

class MainActivity : AppCompatActivity() {

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_main)

        btn.setOnClickListener {

            if(!user() || !pas())
                return@setOnClickListener

            Toast.makeText(applicationContext,"Welcome",Toast.LENGTH_SHORT).show()

        }

    }

    fun user() : Boolean{

        var username = tip_main_user.editText?.text.toString().trim()

        return when {

            username.isEmpty() -> {
                tip_main_user.error = "This field cannot be empty"
                false
            }
            username.length > 30 -> {
                tip_main_user.error = "The number of characters entered is more than allowed"
                false
            }
            else -> {
                tip_main_user.error = null
                true
            }
        }
    }

    fun pas() : Boolean{

        var Password = tip_main_password.editText?.text.toString().trim()

        return when {

            Password.isEmpty() -> {
                tip_main_password.error = "This field cannot be empty"
                false
            }
            Password.length < 4 && Password.length != null -> {
                tip_main_password.error = "Enter at least 4 characters"
                false
            }
            else -> {
                tip_main_password.error = null
                true
            }
        }
    }
}
```

### Step 5: Run

Copy the code into your project or download it below and run in AndroidStudio.

### Reference

Below are the reference links:

| Number | Link |
| --- | --- |
| 1. | [Download](https://github.com/alirezabashi98/Test-TextInputEditText/archive/refs/heads/master.zip) Example |
| 2. | [Follow](https://github.com/alirezabashi98/) Example author |
| 3. | [TextInputEditText](https://developer.android.com/reference/com/google/android/material/textfield/TextInputEditText) |
| 4. | [TextInputLayout](https://developer.android.com/reference/com/google/android/material/textfield/TextInputLayout) |
