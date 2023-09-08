# AppWidgetManager Example


In this step by step example you will learn how to create a sample widget using the `AppWidgetManager`.


Hello. We will learn about App Widget Manager via a simple Example right this moment. Welcome. We utilize Kotlin programming language. This is a mobile app development tutorial via android.

### What is AppWidgetManager?

It is an open class defined in the `android.appwidget` package that Updates AppWidget state; gets information about installed AppWidget providers and other AppWidget related state.

You can see it's API reference [here](https://developer.android.com/reference/kotlin/android/appwidget/AppWidgetManager).

### What is AppWidgetProvider?

It is a convenience class to aid in implementing an `AppWidget` provider. Everything you can do with `AppWidgetProvider`, you can do with a regular `BroadcastReceiver`. `AppWidgetProvider` merely parses the relevant fields out of the Intent that is received in `onReceive(Context,Intent)`, and calls hook methods with the received extras.

Extend this class and override one or more of the `onUpdate`, `onDeleted`, `onEnabled` or `onDisabled` methods to implement your own `AppWidget` functionality.

### Demo

Here is the demo GIF of the example we will create:

![](https://camposha.info/android-examples/wp-content/uploads/sites/9/2022/01/AppWidgetManager.gif)

### Step 1: Create Project

Start by creating an empty `Android Studio` project.

### Step 2: Dependencies

Because we are using Kotlin we will add the `kotlin-stdlib-jdk` dependency:

```groovy
    implementation "org.jetbrains.kotlin:kotlin-stdlib-jdk7:$kotlin_version"
```
Then the usual AppCompat and ConstraintLayout:

```groovy
    implementation "androidx.appcompat:appcompat:$buildToolsVer"
    implementation "androidx.constraintlayout:constraintlayout:$constraintLayoutVersion"
```

### Step 3: Create Sample Widget XML

Our third step is to Create a Sample Widget XML.  First, create a folder in your `res` directory known as: `XML`,  and add the following file: `sample_widget_info.xml`.

 You can see that its root element is app widget provider. We define various properties like minimum height and width of our widget, it's preview image, update period, widget category and initial layout.
**sample_widget_info.xml**

```xml
<?xml version="1.0" encoding="utf-8"?>
<appwidget-provider xmlns:android="http://schemas.android.com/apk/res/android"
    android:initialKeyguardLayout="@layout/sample_widget"
    android:initialLayout="@layout/sample_widget"
    android:minHeight="110dp"
    android:minWidth="110dp"
    android:previewImage="@mipmap/ic_launcher"
    android:resizeMode="horizontal|vertical"
    android:updatePeriodMillis="86400000"
    android:widgetCategory="home_screen|keyguard"></appwidget-provider>
```

### Step 4: Design the Layouts

We will need two layouts:

**(a). sample_widget.xml**

Add the code containing the UI elements for your custom widget here:

```xml
<LinearLayout xmlns:android="http://schemas.android.com/apk/res/android"
    android:layout_width="match_parent"
    android:layout_height="match_parent"
    android:padding="@dimen/widget_margin"
    android:orientation="vertical">

    <TextView
        android:id="@+id/appwidget_text"
        android:layout_width="wrap_content"
        android:layout_height="wrap_content"
        android:layout_gravity="center"
        android:layout_margin="8dp"
        android:contentDescription="@string/appwidget_text"
        android:text="This is widget example"
        android:textSize="24sp"
        android:textStyle="bold|italic" />

    <Button
        android:layout_width="wrap_content"
        android:layout_height="wrap_content"
        android:layout_gravity="center"
        android:text="HIT ME"
        android:id="@+id/widget_button"/>

    <Button
        android:layout_width="wrap_content"
        android:layout_height="wrap_content"
        android:layout_gravity="center"
        android:text="OPEN GOOGLE PLEASE"
        android:id="@+id/google_button"/>

</LinearLayout>
```

**(b). activity_main.xml**

Then design the MainActivity layout:

```xml
<?xml version="1.0" encoding="utf-8"?>
<LinearLayout xmlns:android="http://schemas.android.com/apk/res/android"
    xmlns:app="http://schemas.android.com/apk/res-auto"
    xmlns:tools="http://schemas.android.com/tools"
    android:layout_width="match_parent"
    android:layout_height="match_parent"
    android:orientation="vertical">

<EditText
    android:layout_width="match_parent"
    android:layout_height="wrap_content"
    android:id="@+id/edit_text"/>

    <Button
        android:layout_width="wrap_content"
        android:layout_height="wrap_content"
        android:id="@+id/button"
        android:text="press"/>

</LinearLayout>
```

### Step 5: Write Widget Code

Start by creating the `SampleWidget.kt` file and add the following imports including the `android.appwidget.AppWidgetManager` and `android.appwidget.AppWidgetProvider`:

```kotlin
import android.appwidget.AppWidgetManager
import android.appwidget.AppWidgetProvider
import android.content.Context
import android.util.Log
import android.widget.RemoteViews
import android.app.PendingIntent
import android.content.Intent
import android.net.Uri
import android.content.ComponentName
```

Create a class that extends the `AppWidgetProvider`:
```kotlin
class SampleWidget : AppWidgetProvider() {
```

Define two strings:

```kotlin
    private val ACTION_SIMPLEAPPWIDGET = "ACTION_BROADCASTWIDGETSAMPLE"
    private val WIDGET_TAG = "SAMPLE_WIDGET_TAG"
```

Override the `onUpdate()`function.Onto it we will pass the context, the app widget manager and an Integer array of app widget IDs.

```kotlin
    override fun onUpdate(context: Context, appWidgetManager: AppWidgetManager, appWidgetIds: IntArray) {
```

There may be multiple widgets active, so  we loop through them and update all of them. To update we call the `updateAppWidget` function.

```kotlin
        for (appWidgetId in appWidgetIds) {
            Log.d(WIDGET_TAG,"update")
            updateAppWidget(context, appWidgetManager, appWidgetId)
        }
    }
```

We will also Override the `onEnabled` and `onDisabled` functions:

```kotlin
    override fun onEnabled(context: Context) {
        // Enter relevant functionality for when the first widget is created
        Log.d(WIDGET_TAG,"enabled")
    }

    override fun onDisabled(context: Context) {
        // Enter relevant functionality for when the last widget is disabled
        Log.d(WIDGET_TAG,"disabled")
    }
```
Now override the `onReceive()` callback:

```kotlin
    override fun onReceive(context: Context, intent: Intent) {
        super.onReceive(context, intent)
```
Write code that will be called when the button is clicked:

```kotlin
        if ((intent.action.equals(ACTION_SIMPLEAPPWIDGET))) {
            val views = RemoteViews(context.packageName, R.layout.sample_widget)
            views.setTextViewText(R.id.widget_button, "HIT ME AGAIN!")
            val appWidget = ComponentName(context, SampleWidget::class.java!!)
            val appWidgetManager = AppWidgetManager.getInstance(context)

            appWidgetManager.updateAppWidget(appWidget, views)
        }
```

Also write code that will be called broadcast inside the activity:

```kotlin
        else if ((intent.action.equals("ACTIVITY_ACTION"))) {
            val views = RemoteViews(context.packageName, R.layout.sample_widget)

            val text = intent.getStringExtra("name")

            views.setTextViewText(R.id.widget_button, text)
            val appWidget = ComponentName(context, SampleWidget::class.java!!)
            val appWidgetManager = AppWidgetManager.getInstance(context)

            appWidgetManager.updateAppWidget(appWidget, views)
        }
    }
```

Finally create the `updateAppWidget()` function:

```kotlin
    private fun updateAppWidget(context: Context, appWidgetManager: AppWidgetManager, appWidgetId: Int) {

        // Construct the RemoteViews object
        val views = RemoteViews(context.packageName, R.layout.sample_widget)
        views.setTextViewText(R.id.appwidget_text, "WIDGET INITIALIZED")

        //Sample intent for action example
        val intent = Intent(Intent.ACTION_VIEW, Uri.parse("http://www.google.com"))
        val pendingIntent = PendingIntent.getActivity(context, 0, intent, 0)
        views.setOnClickPendingIntent(R.id.widget_button, pendingIntent)

        // Construct an Intent which is pointing this class.
        val intentTwo = Intent(context, SampleWidget::class.java)
        intentTwo.action = ACTION_SIMPLEAPPWIDGET
        val pendingIntentTwo = PendingIntent.getBroadcast(context, 0, intentTwo, PendingIntent.FLAG_UPDATE_CURRENT)

        views.setOnClickPendingIntent(R.id.google_button, pendingIntent)
        views.setOnClickPendingIntent(R.id.widget_button, pendingIntentTwo)

        // Instruct the widget manager to update the widget
        appWidgetManager.updateAppWidget(appWidgetId, views)
    }
}


```

Here is the full code:

**SampleWidget.kt**

```kotlin
package pramonow.com.widgetexample

import android.appwidget.AppWidgetManager
import android.appwidget.AppWidgetProvider
import android.content.Context
import android.util.Log
import android.widget.RemoteViews
import android.app.PendingIntent
import android.content.Intent
import android.net.Uri
import android.content.ComponentName

/**
 * Implementation of App Widget functionality.
 */

class SampleWidget : AppWidgetProvider() {

    private val ACTION_SIMPLEAPPWIDGET = "ACTION_BROADCASTWIDGETSAMPLE"
    private val WIDGET_TAG = "SAMPLE_WIDGET_TAG"

    override fun onUpdate(context: Context, appWidgetManager: AppWidgetManager, appWidgetIds: IntArray) {
        // There may be multiple widgets active, so update all of them
        for (appWidgetId in appWidgetIds) {
            Log.d(WIDGET_TAG,"update")
            updateAppWidget(context, appWidgetManager, appWidgetId)
        }
    }

    override fun onEnabled(context: Context) {
        // Enter relevant functionality for when the first widget is created
        Log.d(WIDGET_TAG,"enabled")
    }

    override fun onDisabled(context: Context) {
        // Enter relevant functionality for when the last widget is disabled
        Log.d(WIDGET_TAG,"disabled")
    }

    override fun onReceive(context: Context, intent: Intent) {
        super.onReceive(context, intent)

        //This will be called when the button is clicked
        if ((intent.action.equals(ACTION_SIMPLEAPPWIDGET))) {
            val views = RemoteViews(context.packageName, R.layout.sample_widget)
            views.setTextViewText(R.id.widget_button, "HIT ME AGAIN!")
            val appWidget = ComponentName(context, SampleWidget::class.java!!)
            val appWidgetManager = AppWidgetManager.getInstance(context)

            appWidgetManager.updateAppWidget(appWidget, views)
        }
        //This will be called by broadcast inside the activity
        else if ((intent.action.equals("ACTIVITY_ACTION"))) {
            val views = RemoteViews(context.packageName, R.layout.sample_widget)

            val text = intent.getStringExtra("name")

            views.setTextViewText(R.id.widget_button, text)
            val appWidget = ComponentName(context, SampleWidget::class.java!!)
            val appWidgetManager = AppWidgetManager.getInstance(context)

            appWidgetManager.updateAppWidget(appWidget, views)
        }
    }

    private fun updateAppWidget(context: Context, appWidgetManager: AppWidgetManager, appWidgetId: Int) {

        // Construct the RemoteViews object
        val views = RemoteViews(context.packageName, R.layout.sample_widget)
        views.setTextViewText(R.id.appwidget_text, "WIDGET INITIALIZED")

        //Sample intent for action example
        val intent = Intent(Intent.ACTION_VIEW, Uri.parse("http://www.google.com"))
        val pendingIntent = PendingIntent.getActivity(context, 0, intent, 0)
        views.setOnClickPendingIntent(R.id.widget_button, pendingIntent)

        // Construct an Intent which is pointing this class.
        val intentTwo = Intent(context, SampleWidget::class.java)
        intentTwo.action = ACTION_SIMPLEAPPWIDGET
        val pendingIntentTwo = PendingIntent.getBroadcast(context, 0, intentTwo, PendingIntent.FLAG_UPDATE_CURRENT)

        views.setOnClickPendingIntent(R.id.google_button, pendingIntent)
        views.setOnClickPendingIntent(R.id.widget_button, pendingIntentTwo)

        // Instruct the widget manager to update the widget
        appWidgetManager.updateAppWidget(appWidgetId, views)
    }
}


```

### Step 6: Write MainActivity code

Go to `MainActivity.kt` and add imports:

```kotlin
import android.os.Bundle
import com.google.android.material.floatingactionbutton.FloatingActionButton
import com.google.android.material.snackbar.Snackbar
import androidx.appcompat.app.AppCompatActivity
import androidx.appcompat.widget.Toolbar
import android.view.View
import android.appwidget.AppWidgetManager
import android.content.ComponentName
import androidx.core.view.accessibility.AccessibilityEventCompat.setAction
import android.content.Intent
import android.widget.Button
import android.widget.EditText
```

Extend the `AppCompatActivity` and override the `onCreate()`:

```kotlin
class MainActivity : AppCompatActivity() {

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_main)
```

Reference the editText and button:

```kotlin
        var editText = findViewById<EditText>(R.id.edit_text)
        var button = findViewById<Button>(R.id.button)
```
Create an intent:

```kotlin
        val intent = Intent(this, SampleWidget::class.java)
        intent.action = "ACTIVITY_ACTION"
```
Create a button that when clicked will send broadcast to update the widget:

```kotlin
        button.setOnClickListener { _ ->
            AppWidgetManager.getInstance(application).getAppWidgetIds(ComponentName(application,SampleWidget::class.java))
            intent.putExtra("name", editText.text.toString())
            sendBroadcast(intent)}

    }
}

```

Here is the full code:

**MainActivity.kt**

```kotlin
import android.os.Bundle
import com.google.android.material.floatingactionbutton.FloatingActionButton
import com.google.android.material.snackbar.Snackbar
import androidx.appcompat.app.AppCompatActivity
import androidx.appcompat.widget.Toolbar
import android.view.View
import android.appwidget.AppWidgetManager
import android.content.ComponentName
import androidx.core.view.accessibility.AccessibilityEventCompat.setAction
import android.content.Intent
import android.widget.Button
import android.widget.EditText

class MainActivity : AppCompatActivity() {

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_main)

        var editText = findViewById<EditText>(R.id.edit_text)
        var button = findViewById<Button>(R.id.button)

        val intent = Intent(this, SampleWidget::class.java)
        intent.action = "ACTIVITY_ACTION"

        //This action will send broadcast to update the widget
        button.setOnClickListener { _ ->
            AppWidgetManager.getInstance(application).getAppWidgetIds(ComponentName(application,SampleWidget::class.java))
            intent.putExtra("name", editText.text.toString())
            sendBroadcast(intent)}

    }
}

```

### Step 7: Register Components

Go to your `AndroidManifest.xml`

And register your `MainActivity` as your launcher activity:

```xml
        <activity
            android:name=".MainActivity"
            android:label="@string/title_activity_main">
            <intent-filter>
                <action android:name="android.intent.action.MAIN"/>
                <category android:name="android.intent.category.LAUNCHER"/>
            </intent-filter>
        </activity>
```

Then register our AppWidget:
```xml
        <receiver android:name=".SampleWidget">
            <intent-filter>
                <action android:name="android.appwidget.action.APPWIDGET_UPDATE" />
            </intent-filter>

            <meta-data
                android:name="android.appwidget.provider"
                android:resource="@xml/sample_widget_info" />
        </receiver>
```

### Run

Copy the code or download it in the link below, build and run.

### Reference

Here are the reference links:

|Number|Link|
|-----|---|
|1.|[Download](https://downgit.github.io/#/home?url=https://github.com/amanjeetsingh150/kotlin-android-examples/tree/master/WidgetExample) Example|
|2.|[Follow](https://github.com/amanjeetsingh150/) code author|
|3.|Code: [Apache 2.0 License](http://www.apache.org/licenses/LICENSE-2.0.txt)|



