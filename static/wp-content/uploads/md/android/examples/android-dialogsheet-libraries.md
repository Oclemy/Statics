# Best Android DialogSheet Libraries - 2021

If you plan to implement dialog sheets in your app then this tutorial is for you. We want to examine with examples and snippets the best dialog sheet options for android development.


## (a). DialogSheet

> An Android library to create fully material designed bottom dialogs similar to the Android Pay app.

Here are example screenshots:

![](https://raw.githubusercontent.com/marcoscgdev/DialogSheet/master/screenshots/sc_1.png)

![](https://raw.githubusercontent.com/marcoscgdev/DialogSheet/master/screenshots/sc_2.png)    ![](https://raw.githubusercontent.com/marcoscgdev/DialogSheet/master/screenshots/sc_4.png)

![](https://raw.githubusercontent.com/marcoscgdev/DialogSheet/master/screenshots/sc_3.png)

### How to Install DialogSheet

Add this to your root _build.gradle_ file:

```groovy
allprojects {
    repositories {
        ...
        maven { url 'https://jitpack.io' }
    }
}
```

Now add the dependency to your app build.gradle file:

```groovy
implementation 'com.github.marcoscgdev:DialogSheet:2.1.2'
```

### How to Use DialogSheet

Here's a complete snippet of creating a dialog sheet in kotlin:

```kotlin
val dialogSheet = DialogSheet(this)
    .setTitle(R.string.app_name)
    .setMessage(R.string.lorem)
    .setColoredNavigationBar(true)
    .setTitleTextSize(20) // In SP
    .setCancelable(false)
    .setPositiveButton(android.R.string.ok) {
        // Your action
    }
    .setNegativeButton(android.R.string.cancel) {
        // Your action
    }
    .setNeutralButton("Neutral")
    .setRoundedCorners(false) // Default value is true
    .setBackgroundColor(Color.BLACK) // Your custom background color
    .setButtonsColorRes(R.color.colorAccent) // You can use dialogSheetAccent style attribute instead
    .setNeutralButtonColor(Color.WHITE)
    .show()
```

### Example

Here's a complete example in Kotlin:

**MainActivity.kt**

```kotlin
package com.marcoscg.dialogsheetsample

import android.content.Intent
import android.net.Uri
import android.os.Bundle
import android.view.Menu
import android.view.MenuItem
import android.view.View
import android.widget.Button
import android.widget.Toast
import androidx.appcompat.app.AppCompatActivity
import com.marcoscg.dialogsheet.DialogSheet
import kotlinx.android.synthetic.main.activity_main.*

class MainActivity : AppCompatActivity() {

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_main)

        button.setOnClickListener {
            createAndShowDialog()
        }
    }

    private fun createAndShowDialog() {
        val useNewDialogStyle = newStyleCheckBox.isChecked

        val dialogSheet = DialogSheet(this@MainActivity, useNewDialogStyle) // you can also use DialogSheet2 if you want the new style
                //.setNewDialogStyle() // You can also set new style by this method, but put it on the first line
                .setTitle(R.string.app_name)
                .setMessage(R.string.lorem)
                .setSingleLineTitle(true)
                .setColoredNavigationBar(true)
                //.setButtonsColorRes(R.color.colorAccent) // You can use dialogSheetAccent style attribute instead
                .setPositiveButton(android.R.string.ok) {
                    Toast.makeText(this@MainActivity, "Positive button clicked!", Toast.LENGTH_SHORT).show()
                }
                .setNegativeButton(android.R.string.cancel)
                .setNeutralButton("Neutral")
                //.setNeutralButtonColor(Color.BLACK)

        if (customViewCheckBox.isChecked) {
            dialogSheet.setView(R.layout.custom_dialog_view)

            // Access dialog custom inflated view
            val inflatedView = dialogSheet.inflatedView
            val button = inflatedView?.findViewById<Button>(R.id.customButton)
            button?.setOnClickListener {
                Toast.makeText(this@MainActivity, "I'm a custom button", Toast.LENGTH_SHORT).show()
            }
        }

        if (!cornersCheckBox.isChecked)
            dialogSheet.setRoundedCorners(false)

        if (iconCheckBox.isChecked)
            dialogSheet.setIconResource(R.mipmap.ic_launcher)

        dialogSheet.show()
    }

    override fun onCreateOptionsMenu(menu: Menu): Boolean {
        menuInflater.inflate(R.menu.main, menu)
        return true
    }

    override fun onOptionsItemSelected(item: MenuItem): Boolean {
        if (item.itemId == R.id.action_github) {
            startActivity(Intent(Intent.ACTION_VIEW, Uri.parse("https://github.com/marcoscgdev/DialogSheet")))
            return true
        }

        return super.onOptionsItemSelected(item)
    }
}
```

You can find the source code [here](https://github.com/marcoscgdev/DialogSheet/tree/master/app)

### Reference

Find complete reference and documentation [here](https://github.com/marcoscgdev/DialogSheet).
