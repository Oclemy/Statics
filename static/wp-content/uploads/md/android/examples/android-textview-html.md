# Render HTML in TextView


The TextView is capable of rendering more than simple text. In fact you can render HTML in a textview but first you need to convert it to Spannable. That is done using the `fromHtml()` method of the `android.text.Html` class. However that method doesn't stipulate the tags supported, so especially if you are getting your HTML from an outside source, you may want to consider alternatives.

This tutorial explores some alternatives, the best android libraries that allow us render HTML in a textview. Such libraries typically specify the tags they support, so you know what yoy are getting.


Here are the solutions to consider:

## (a). HtmDsl

> This solution builds valid HTML for Android TextView.

Below are the HTML tags supported by HtmlDsl:

- `<a href="...">`
- `<b>`
- `<big>`
- `<blockquote>`
- `<br>`
- `<cite>`
- `<dfn>`
- `<div align="...">`
- `<em>`
- `<font color="..." face="...">`
- `<h1>`
- `<h2>`
- `<h3>`
- `<h4>`
- `<h5>`
- `<h6>`
- `<i>`
- `<img src="...">`
- `<p>`
- `<small>`
- `<strike>`
- `<strong>`
- `<sub>`
- `<sup>`
- `<tt>`
- `<u>`
- `<ul>`
- `<li>`

Here is the project demo that will be created shortly using this library:

![HtmDsl Example](https://github.com/jaredrummler/HtmlDsl/raw/main/.github/demo-med.png)

Let's look at how to use it.

### Step 1: Install it

There are two ways of installing HtmlDsl. First using the gradle method. Add the following implementation statement in your build.gradle file:

```kotlin
implementation("com.jaredrummler:html-dsl:1.0.0")
```

The second way is via AAR(Android Archive). You can download it [here](https://repo1.maven.org/maven2/com/jaredrummler/html-dsl/1.0.0/html-dsl-1.0.0.aar).

### Step 2: Write code

For example let's say you want to programmatically create a html string with header and strong tags:

```kotlin
HTML.create {
        h1("HTML DSL")
        strong("Provides a DSL to build HTML for Android TextView")
}
```

What if you want to create and render html with header, strong, list of items and links:

```kotlin
textView.setHtml {
    h1("HTML DSL").br()
    strong("Build valid HTML for Android TextView.").br().br()
    h3("Android Versions:")
    ul {
        li {
            a(href = "https://developer.android.com/about/versions/12/get") {
                +"Android 12 Beta"
            }
        }
        li("Android 11")
        li("Android 10")
        li("Pie")
        li("Oreo")
        li("Nougat")
        li("Marshmallow")
        li("Lollipop")
        // ...
    }

    small {
        sub {
            +"by "
            a {
                href = "https://github.com/jaredrummler"
                text = "Jared Rummler"
            }
        }
    }
}
```

If you want to create HTML and assign it to a string for later use:

```kotlin
val htmlString = HTML.create {
    p {
        font(face = "monospace", color = "#3ddc84") {
            unsafe {
                +"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."
            }
        }
    }
}.render(prettyPrint = true)
```

Or you want to create html programmatically and save it to a file:

```kotlin
HtmlRenderer<FileWriter>(HTML.create {
    small {
        sub {
            +"by "
            a {
                href = "https://github.com/jaredrummler"
                text = "Jared Rummler"
            }
        }
    }
}, FileWriter("output.html"), true)
```

### Example

It's time to look at a full example. Start by going through the installation steps as has been discussed earlier.

Add internet permission in your android manifest:

```xml
    <uses-permission android:name="android.permission.INTERNET" />
    <uses-permission android:name="android.permission.ACCESS_NETWORK_STATE" />
```

Then proceed to create a layout for your main activity and add the following code;

**activity_demo.xml**

```xml
<?xml version="1.0" encoding="utf-8"?>

<LinearLayout xmlns:android="http://schemas.android.com/apk/res/android"
    xmlns:app="http://schemas.android.com/apk/res-auto"
    android:id="@+id/scroll_view"
    android:layout_width="match_parent"
    android:layout_height="match_parent"
    android:orientation="vertical">

    <com.ogaclejapan.smarttablayout.SmartTabLayout
        android:id="@+id/viewpagertab"
        android:layout_width="match_parent"
        android:layout_height="48dp"
        android:background="@color/white"
        app:stl_clickable="true"
        app:stl_defaultTabBackground="?attr/selectableItemBackground"
        app:stl_defaultTabTextAllCaps="true"
        app:stl_defaultTabTextColor="@color/black"
        app:stl_defaultTabTextHorizontalPadding="16dp"
        app:stl_defaultTabTextMinWidth="0dp"
        app:stl_defaultTabTextSize="12sp"
        app:stl_distributeEvenly="false"
        app:stl_dividerColor="#4D000000"
        app:stl_dividerThickness="1dp"
        app:stl_drawDecorationAfterTab="false"
        app:stl_indicatorAlwaysInCenter="false"
        app:stl_indicatorColor="@color/android_blue"
        app:stl_indicatorCornerRadius="2dp"
        app:stl_indicatorGravity="bottom"
        app:stl_indicatorInFront="false"
        app:stl_indicatorInterpolation="smart"
        app:stl_indicatorThickness="4dp"
        app:stl_indicatorWidth="auto"
        app:stl_indicatorWithoutPadding="false"
        app:stl_overlineColor="#4D000000"
        app:stl_overlineThickness="0dp"
        app:stl_titleOffset="24dp"
        app:stl_underlineColor="#4D000000"
        app:stl_underlineThickness="1dp" />

    <androidx.viewpager.widget.ViewPager
        android:id="@+id/viewpager"
        android:layout_width="match_parent"
        android:layout_height="match_parent" />

</LinearLayout>
```

Here is the code for DemoActivity:

**DemoActivity.kt**

```kotlin
class DemoActivity : AppCompatActivity() {

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_demo)
        val viewPager = findViewById<ViewPager>(R.id.viewpager)
        val viewPagerTab = findViewById<SmartTabLayout>(R.id.viewpagertab)
        viewPager.adapter = FragmentPagerItemAdapter(
            supportFragmentManager, FragmentPagerItems.with(this).apply {
                for (preview in HtmlPreview.values()) {
                    add(preview.name, PreviewFragment::class.java)
                }
            }.create()
        )
        viewPagerTab.setViewPager(viewPager)
    }
}
```

Find full sample code [here](https://github.com/jaredrummler/HtmlDsl/tree/main/demo)

### Reference

Find the reference links below:

| No. | Link |
| --- | --- |
| 1. | [Download](https://github.com/jaredrummler/HtmlDsl/archive/refs/heads/main.zip) code |
| 2. | [Read](https://github.com/jaredrummler/HtmlDsl/) more |
| 3. | [Follow](https://github.com/jaredrummler/) code author |

## (b). HtmlTextView

> HtmlTextView is a library for display html content in android.

This library also provides a dark mode option. Here are the features currently supported:

It currently supports tags </>:

- `<iframe>`
- `<a href="...">`
- `<b>`
- `<big>`
- `<blockquote>`
- `<br>`
- `<cite>`
- `<dfn>`
- `<div align="...">`
- `<em>`
- `<font size="..." color="..." face="...">`
- `<i>`
- `<img src="...">`
- `<p>`
- `<small>`
- `<strike>`
- `<strong>`
- `<sub>`
- `<sup>`
- `<tt>`
- `<u>`

### Step 1: Dependency

Start by registering jitpack as a mavem repository in your project folder's `build.gradle`:

```groovy
allprojects {
        repositories {
            ...
            maven { url 'https://jitpack.io' }
        }
    }
```

Then in your app folder's `build.gradle`:

```groovy
implementation 'com.github.SakaGamer:html-textview:1.0.8'
```

Then sync.

### Step 2: Add to Layout

Then add the html-textview to your layout:

```xml
<com.saka.android.htmltextview.HtmlTextView
    android:id="@+id/htmlTextView"
    android:layout_width="match_parent"
    android:layout_height="match_parent"
    android:padding="16dp" />
```

### Step 3: Set HTML

Now in your kotlin code you can simply set the html code in your textview:

```kotlin
htmlTextView.setText(html)
```

### Full Example

Start by installing the library as has been discussed.

Then replace your main activity layout with the following code:

**activity_main.xml**

```xml
<?xml version="1.0" encoding="utf-8"?>
<androidx.constraintlayout.widget.ConstraintLayout xmlns:android="http://schemas.android.com/apk/res/android"
    xmlns:app="http://schemas.android.com/apk/res-auto"
    xmlns:tools="http://schemas.android.com/tools"
    android:layout_width="match_parent"
    android:layout_height="match_parent"
    tools:context=".MainActivity">

    <androidx.core.widget.NestedScrollView
        android:layout_width="0dp"
        android:layout_height="0dp"
        app:layout_constraintBottom_toBottomOf="parent"
        app:layout_constraintLeft_toLeftOf="parent"
        app:layout_constraintRight_toRightOf="parent"
        app:layout_constraintTop_toTopOf="parent">

        <com.saka.android.htmltextview.HtmlTextView
            android:id="@+id/htmlTextView"
            android:layout_width="match_parent"
            android:layout_height="match_parent"
            android:padding="16dp" />

    </androidx.core.widget.NestedScrollView>

</androidx.constraintlayout.widget.ConstraintLayout>
```

Then create a model class:

**Content.kt**

```kotlin
import android.content.Context
import com.google.gson.Gson
import java.io.BufferedReader
import java.io.IOException
import java.io.InputStream
import java.io.InputStreamReader

class Content {

    val content: String = ""

    companion object {

        @JvmStatic
        fun deserialize(context: Context): Content? {
            try {
                val jsonString = parseResource(context, R.raw.content)
                return Gson().fromJson(jsonString, Content::class.java)
            } catch (e: IOException) {
                e.printStackTrace()
            }
            return null
        }

        @Throws(IOException::class)
        fun parseResource(context: Context, resource: Int): String {
            val inputStream: InputStream = context.resources.openRawResource(resource)
            val sb = StringBuilder()
            val br = BufferedReader(InputStreamReader(inputStream))
            var read = br.readLine()
            while (read != null) {
                sb.append(read)
                read = br.readLine()
            }
            return sb.toString()
        }
    }
}
```

Then the main activity:

**MainActivity.kt**

```kotlin
package com.saka.android.htmltextview

import androidx.appcompat.app.AppCompatActivity
import android.os.Bundle

class MainActivity : AppCompatActivity() {

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_main)

        val content = Content.deserialize(this)
        findViewById<HtmlTextView>(R.id.htmlTextView).setText(content?.content)
    }

}
```

### Reference

Find the reference links below:

| No. | Link |
| --- | --- |
| 1. | [Download](https://github.com/sakacyber/html-textview/archive/refs/heads/main.zip) code |
| 2. | [Read](https://github.com/sakacyber/html-textview) more |
| 3. | [Follow](https://github.com/sakacyber/) code author |
