# Kotlin Android Spek Example

Learn about Kotlin Spek API using this simple example.


![Kotlin Spek API](https://github.com/Oclemy/Assets/raw/main/android/spek-api.png)


### Step 1: Create Project

Start by creating an empty `Android Studio` project.

### Step 2: Dependencies

In your `app/build.gradle` add the following `testImplementation`:

```groovy
    //Spek
    testImplementation 'org.jetbrains.spek:spek-api:1.1.2'
    testImplementation 'org.jetbrains.spek:spek-junit-platform-engine:1.1.2'
    testImplementation 'org.junit.platform:junit-platform-runner:1.0.0-M4'
    testImplementation 'org.junit.jupiter:junit-jupiter-api:5.0.0-M4'
```

### Step 3: Design Layout

Design your layout as follows:

**activity_main.xml**

```xml
<?xml version="1.0" encoding="utf-8"?>
<LinearLayout xmlns:android="http://schemas.android.com/apk/res/android"
    xmlns:app="http://schemas.android.com/apk/res-auto"
    xmlns:tools="http://schemas.android.com/tools"
    android:layout_width="match_parent"
    android:layout_height="match_parent"
    android:orientation="vertical"
    tools:context="com.developers.spekexample.MainActivity">

    <EditText
        android:id="@+id/edit_text_email"
        android:layout_width="match_parent"
        android:layout_height="wrap_content"
        android:layout_margin="10dp"
        android:hint="@string/email_hint_text" />

    <Button
        android:id="@+id/validate_button"
        android:layout_width="match_parent"
        android:layout_height="wrap_content"
        android:layout_margin="10dp"
        android:text="@string/validate_button" />
</LinearLayout>

```

### Step : Create EmailValidator

**EmailValidator.kt**

```kotlin
import android.text.Editable
import android.text.TextWatcher
import java.util.regex.Pattern

class EmailValidator : TextWatcher {

    private val EMAIL_PATTERN = Pattern.compile(
            "[a-zA-Z0-9\\+\\.\\_\\%\\-\\+]{1,256}" +
                    "\\@" +
                    "[a-zA-Z0-9][a-zA-Z0-9\\-]{0,64}" +
                    "(" +
                    "\\." +
                    "[a-zA-Z0-9][a-zA-Z0-9\\-]{0,25}" +
                    ")+"
    )

    private var isValid = false

    fun isValid(): Boolean {
        return isValid
    }

    fun isValidEmail(email: CharSequence?): Boolean {
        return email != null && EMAIL_PATTERN.matcher(email).matches()
    }


    override fun afterTextChanged(editable: Editable?) {
        isValid = isValidEmail(editable)
    }

    override fun beforeTextChanged(s: CharSequence?, start: Int, count: Int, after: Int) {

    }

    override fun onTextChanged(p0: CharSequence?, start: Int, count: Int, after: Int) {

    }

}
```

### Step : Write Activity code

First create an extensions class:

**Extensions.kt**

```kotlin
import android.content.Context
import android.widget.Toast

fun Context.toast(msg: CharSequence, duration: Int) {
    Toast.makeText(applicationContext, msg, duration).show()
}
```

**MainActivity.kt**

```kotlin
import androidx.appcompat.app.AppCompatActivity
import android.os.Bundle
import android.widget.Toast
import kotlinx.android.synthetic.main.activity_main.*

class MainActivity : AppCompatActivity() {

    private lateinit var emailValidator: EmailValidator

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_main)
        emailValidator = EmailValidator()
        edit_text_email.addTextChangedListener(emailValidator)
        validate_button.setOnClickListener {
            if (emailValidator.isValid()) {
                toast("Valid Mail", Toast.LENGTH_SHORT)
            } else {
                toast("Access Denied. Invalid Mail!!", Toast.LENGTH_SHORT)
            }
        }

    }
}

```

### Run

Copy the code or download it in the link below, build and run.

### Reference

Here are the reference links:

|Number|Link|
|-----|---|
|1.|[Download](https://downgit.github.io/#/home?url=https://github.com/amanjeetsingh150/kotlin-android-examples/tree/master/SpekExample) Example|
|2.|[Follow](https://github.com/amanjeetsingh150/) code author|
|3.|Code: [Apache 2.0 License](http://www.apache.org/licenses/LICENSE-2.0.txt)|


