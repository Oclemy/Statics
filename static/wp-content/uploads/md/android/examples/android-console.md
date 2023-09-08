# How to programmatically create a Console View in your Android App


What if, for logging purposes or for whatever usage scenario you have in mind, you want to include a console or terminal view in your app. Well with just a few lines of code you can have this capability in your app. Let's examine our options in this tutorial.


## (a) Use Console

> An Android console view, which allows you to log text using static calls, to easily debug your application, whilst avoiding memory leaks.

Here's a demo: ![](https://github.com/jraska/Console/raw/master/images/sample_screen.png)

### Step 1: How to Install

Install it from maven central:

```groovy
implementation 'com.jraska:console:1.1.0'
```

### Step 2: How to Use

To use it is very simple. First add in your layout:

```xml
<com.jraska.console.Console
        android:layout_width="match_parent"
        android:layout_height="match_parent" />
```

Then in your kotlin/java code you can easily write or clear text in the console:

```kotlin
// Writing to console
Console.write("This is cool")
Console.writeLine("More cool")
// Clear it
Console.clear()
```

**Usage with Timber** Timber is a logger with a small, extensible API which provides utility on top of Android's normal Log class. It's one of the most popular logging app for android.

You can use it with Console, but obviously first you have to install it's adapter:

```groovy
implementation 'com.jraska:console-timber-tree:1.1.0'
```

Then use it:

```kotlin
// In your Application or wherever you register your trees
Timber.plant(ConsoleTree())

// This will be written to your in-app console view
Timber.d("Hello Console")

// In case you want to customize
val consoleTree = ConsoleTree.Builder()
        .debugColor(Color.GRAY)
        // ...
        .build()
Timber.plant(consoleTree)
```

### Step 3: Example

Here's our Console activity:

Download code: https://android.camposha.info/en/console

```kotlin
package com.jraska.console.sample

import android.os.Bundle
import android.view.Menu
import android.view.MenuItem
import androidx.appcompat.app.AppCompatActivity
import com.jraska.console.Console
import kotlinx.android.synthetic.main.activity_main.fab
import kotlinx.android.synthetic.main.activity_main.toolbar
import timber.log.Timber
import java.text.DateFormat
import java.util.Date

class ConsoleActivity : AppCompatActivity() {

  override fun onCreate(savedInstanceState: Bundle?) {
    super.onCreate(savedInstanceState)
    setContentView(R.layout.activity_main)

    setSupportActionBar(toolbar)
    fab.setOnClickListener { _ -> addSampleRecord() }

    Console.writeLine("Hello Console!")
    Console.writeLine()

    Timber.d("Debugging: onCreate(%s)", savedInstanceState)
    Timber.w("Warning makes me nervous...")
    Timber.e("Some horrible ERROR!")
    Timber.wtf("WTF*!?!")
  }

  override fun onStart() {
    super.onStart()

    Timber.i("Important information")
  }

  override fun onResume() {
    super.onResume()

    Timber.v("I'm so talkative")
    Timber.v("Blah blah blah...")
  }

  override fun onCreateOptionsMenu(menu: Menu): Boolean {
    menuInflater.inflate(R.menu.menu_main, menu)
    return true
  }

  override fun onOptionsItemSelected(item: MenuItem): Boolean {
    val id = item.itemId

    if (id == R.id.action_console_clear) {
      Console.clear()
      return true
    }

    if (id == R.id.action_console_async) {
      onAsyncClicked()
      return true
    }

    return super.onOptionsItemSelected(item)
  }

  private fun addSampleRecord() {
    Console.writeLine("Sample console record at " + currentTime())
  }

  private fun currentTime(): String {
    return DATE_FORMAT.format(Date())
  }

  private fun onAsyncClicked() {
    val chattyAsync = ChattyAsync(1000L)
    chattyAsync.execute()
  }

  companion object {
    val DATE_FORMAT: DateFormat = DateFormat.getTimeInstance(DateFormat.MEDIUM)
  }
}
```

Find full source code [here](https://github.com/jraska/Console/tree/master/console-sample).

### Step 4: Reference

Find complete reference [here](https://github.com/jraska/Console).
