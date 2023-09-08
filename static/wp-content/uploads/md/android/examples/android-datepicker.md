# Kotlin Android Datepicker Example

While as programmers we can easily obtain dates and time using the Calender class or methods available at `java.util.package`, our users can't. We have to provide them with a datetimepicker widget which they can use to pick dates or time.

In this tutorial we will look at examples of how to use datetimepicker to choose date and time. These are beginner examples and self explanatory.


## Example 1: Kotlin Android DatePicker Example

This example utilizes the standard SDK datepicker. You pick date and it gets show in a textview.

**Demo**

Here is the demo of the project created:

![Kotlin Android DatePicker Example](https://github.com/alirezabashi98/DatePicker-/raw/master/scr001.png)

### Step 1: Dependencies

No special dependencies are needed for this project.

### Step 2: Create Layout

You now need to add the DatePicker in your xml layout. Additionally add a textiew which will show the selected date:

```xml
<?xml version="1.0" encoding="utf-8"?>
<LinearLayout xmlns:android="http://schemas.android.com/apk/res/android"
    xmlns:app="http://schemas.android.com/apk/res-auto"
    xmlns:tools="http://schemas.android.com/tools"
    android:layout_width="match_parent"
    android:layout_height="match_parent"
    tools:context=".MainActivity"
    android:orientation="vertical">

    <DatePicker
        android:id="@+id/datePicker"
        android:layout_gravity="center"
        android:layout_width="wrap_content"
        android:layout_height="wrap_content"/>

    <Button
        android:id="@+id/btn"
        android:layout_width="match_parent"
        android:layout_height="wrap_content"
        android:layout_gravity="center"
        android:gravity="center"
        android:text="show"/>

    <TextView
        android:id="@+id/tv"
        android:layout_width="match_parent"
        android:layout_height="wrap_content"
        android:layout_gravity="center"
        android:gravity="center"
        android:textSize="20dp"
        android:textColor="#101010"/>

</LinearLayout>
```

### Step 3: Write Kotlin Code

Basically when a button is clicked you get the selected date in the datepicker and show it in both a textview and toast message:

**MainActivity.kt**

```kotlin
import android.annotation.SuppressLint
import androidx.appcompat.app.AppCompatActivity
import android.os.Bundle
import android.provider.ContactsContract
import android.widget.Toast
import kotlinx.android.synthetic.main.activity_main.*

class MainActivity : AppCompatActivity() {

    @SuppressLint("SetTextI18n")
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_main)
        btn.setOnClickListener {
            Toast.makeText(this,"${datePicker.year} / ${datePicker.month} / ${datePicker.dayOfMonth}",Toast.LENGTH_LONG).show()
            tv.text = "${datePicker.year} / ${datePicker.month} / ${datePicker.dayOfMonth}"
        }
    }
}
```

### Run

Run the project.

### Reference

Download the project below:

| No. | Link |
| --- | --- |
| 1. | [Download](https://github.com/alirezabashi98/DatePicker-/archive/refs/heads/master.zip) Code |
| 2. | [Browse](https://github.com/alirezabashi98/DatePicker-) Code |
| 3. | [Follow](https://github.com/alirezabashi98) Code author |
