# DatePickerDialog Example


> Learn how to use DatePickerDialog to pick dates in android. Our programming language is Kotlin.


## Example 1: Pick Date using DatePickerDialog

> This is a simple example written in Kotlin which will show you how to easily pick dates via a simple dialog. We do not use any third party library.

We will create an app whereby when a button is clicked, a DatePickerDialog is shown. When the user chooses the date, the chosesn date is shown in the TextView.

### Step 1: Create Project

Start by creating an empty `Android Studio` project.

### Step 2: Dependencies

No external dependency is needed for this project.

### Step 3: Design Layout

Simply add a TextView and a Button in your MainActivity layout:

```xml
<?xml version="1.0" encoding="utf-8"?>
<LinearLayout xmlns:android="http://schemas.android.com/apk/res/android"
    xmlns:app="http://schemas.android.com/apk/res-auto"
    xmlns:tools="http://schemas.android.com/tools"
    android:layout_width="match_parent"
    android:layout_height="match_parent"
    android:orientation="vertical"
    android:gravity="center"
    tools:context=".MainActivity">

    <TextView
        android:id="@+id/dateTv"
        android:layout_width="wrap_content"
        android:layout_height="wrap_content"
        android:text="Date"
        android:textSize="20sp"
        android:textColor="@android:color/black"/>

    <Button
        android:id="@+id/pickerDateBtn"
        android:layout_marginTop="20dp"
        android:layout_width="wrap_content"
        android:layout_height="wrap_content"
        android:text="Pick Date"
        android:background="@color/colorPrimary"
        android:textColor="@android:color/white"/>

</LinearLayout>
```

### Step : Write Code

You start by instantiating the `Calender` class using the \`\` function:

```kotlin
        val cal = Calendar.getInstance()
```

Then obtain the year, month and day as follows:

```kotlin
        val year = cal.get(Calendar.YEAR)
        val month = cal.get(Calendar.MONTH)
        val day = cal.get(Calendar.DAY_OF_MONTH)
```

Here is how you show a DatePickerDialog when a button is clicked:

```kotlin
        pickerDateBtn.setOnClickListener {
            val datePickerDialog = DatePickerDialog(this, DatePickerDialog.OnDateSetListener { view, myear, mmonth, mdayOfMonth ->
                dateTv.setText(""+ mdayOfMonth +"/"+ mmonth +"/"+ myear)
            }, year, month, day)
            datePickerDialog.show()
        }
```

Here is the full code:

**MainActivity.kt**

```kotlin
import android.app.DatePickerDialog
import androidx.appcompat.app.AppCompatActivity
import android.os.Bundle
import kotlinx.android.synthetic.main.activity_main.*
import java.util.*

class MainActivity : AppCompatActivity() {

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_main)

        val cal = Calendar.getInstance()
        val year = cal.get(Calendar.YEAR)
        val month = cal.get(Calendar.MONTH)
        val day = cal.get(Calendar.DAY_OF_MONTH)

        pickerDateBtn.setOnClickListener {
            val datePickerDialog = DatePickerDialog(this, DatePickerDialog.OnDateSetListener { view, myear, mmonth, mdayOfMonth ->
                dateTv.setText(""+ mdayOfMonth +"/"+ mmonth +"/"+ myear)
            }, year, month, day)
            datePickerDialog.show()
        }
    }
}
```

### Run

Copy the code or download it in the link below, build and run.

### Reference

Here are the reference links:

| Number | Link |
| --- | --- |
| 1. | [Download](https://github.com/Kiran-Bahalaskar/Date-Picker-Using-Kotlin/archive/refs/heads/master.zip) Example |
| 2. | [Follow](https://github.com/Kiran-Bahalaskar/) code author |
| 3. | Code: [Apache 2.0 License](http://www.apache.org/licenses/LICENSE-2.0.txt) |
