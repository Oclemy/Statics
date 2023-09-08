# Best Android MarkdownView Libraries - 2021

If you are thinking or displaying long content in your app, for example a blog post, then you need to think and plan for how this content will be rendered. Even though it's possible to use a textview, you will have a hard time customizing to account for features like links, colors, headings etc. TextView isn't a very good route to go. That leaves us with two options: webview or markdown.

In this post we will look at markdown. Note that most Markdown libraries are actually built from WebView.


## (a). tiagohm/MarkdownView

> Android library to display markdown text.

This library uses [Flexmark](https://github.com/vsch/flexmark-java) and some of its extensions.

The library can:

- render markdown from string.
- Render markdown from assets.
- render markdown from a URL.

In cases of URL it uses AsyncTask to download the markdown so your app won't freeze. In all those cases all you need is pass the appropriate string, be it a URL, markdown text or file path.

### Step 1: Install It

It's hosted in jitpack, so you will need to add jitpack as a maven url in under allProjects closure in your root-level build.gradle file:

```groovy
maven { url 'https://jitpack.io' }
```

Then add the dependency in your app-level build.gradle file:

```groovy
implementation 'com.github.tiagohm.MarkdownView:library:0.19.0'
```

Then sync your project.

### Step 2: Add MarkdownView to Layout

The next step is to go to your layout and add the `MarkdownView` there:

```xml
<br.tiagohm.markdownview.MarkdownView
    android:id="@+id/markdown_view"
    app:escapeHtml="false"
    android:layout_width="match_parent"
    android:layout_height="match_parent"/>
```

### Step 3: Load Markdown

If you are using Java, start by referencing the MarkdownView:

```java
mMarkdownView = (MarkdownView)findViewById(R.id.markdown_view);
```

If you are using Kotlin, no need to do that since you can import the view using Kotlin synthetics or even better by ViewBinding.

Then in either case we proceed. You can use the default CSS:

```java
mMarkdownView.addStyleSheet(new Github());
```

or load an external css located in the assets:

```kotlin
mMarkdownView.addStyleSheet(ExternalStyleSheet.fromAsset("my_css.css", null))
```

Then load string markdown:

```java
mMarkdownView.loadMarkdown("**MarkdownView**");
```

Or load markdown from assets:

```java
mMarkdownView.loadMarkdownFromAsset("markdown1.md");
```

Or load markdown as a file object. This file for example can be loaded from the file system:

```java
mMarkdownView.loadMarkdownFromFile(new File());
```

Or you can load the markdown from online:

```java
mMarkdownView.loadMarkdownFromUrl("url");
```

That's it.

### Step 3: Additional Features

You can use custom css. Either build the CSS programmatically via Java/Kotlin:

```java
//InternalStyleSheet css = new InternalStyleSheet();
InternalStyleSheet css = new Github();
css.addFontFace("MyFont", "condensed", "italic", "bold", "url('myfont.ttf')");
css.addMedia("screen and (min-width: 1281px)");
css.addRule("h1", "color: orange");
css.endMedia();
css.addRule("h1", "color: green", "font-family: MyFont");
mMarkdownView.addStyleSheet(css);
```

Or load the CSS from an external file:

```java
mMarkdownView.addStyleSheet(ExternalStyleSheet.fromAsset("github.css", null);
mMarkdownView.addStyleSheet(ExternalStyleSheet.fromAsset("github2.css", "screen and (min-width: 1281px)");
```

You can also load an external Javascript file:

```java
JavaScript js = new ExternalJavaScript(url, async, defer);
mMarkdownView.addJavascript(js);
```

This is a feature rich library. Here are it's features:

- [x] Bold `**Text**` or `__Text__`
- [x] Italic `*Text*` or `_Text_`
- [x] Strikethrough `~~Text~~`
- [x] Horizontal Rules `---`
- [x] Headings `#`
- [x] Links `[alt](url)`
- [x] Images `![alt](url)`
- [x] Code
- [x] Blockquote
- [x] Nested Blockquote
- [x] Lists
- [x] Tables
- [x] TaskList
- [x] AutoLink
- [x] Abbreviation
- [x] Mark `==Text==`
- [x] Subscript `H~2~O`
- [x] Superscript `10^-10^`
- [x] Keystroke `@ctrl+alt+del@`
- [x] MathJax Inline `$x = {-b \pm \sqrt{b^2-4ac} \over 2a}$`
- [x] MathJax `$$x = {-b \pm \sqrt{b^2-4ac} \over 2a}$$`
- [x] Footnotes
- [x] Image Resizing `![alt](url@100px|auto)`
- [x] Syntax Highlighting (using [Highlight.js](https://highlightjs.org/))
- [x] Emoji ([EmojiOne v2](http://emojione.com)) `:smile:`
- [x] Custom CSS
- [x] Youtube `@[youtube](fM-J08X6l_Q)`
- [x] Twitter
- [x] JavaScripts
- [x] Label `--DEFAULT--` `---SUCCESS---` `----WARNING----` `-----DANGER-----`
- [x] Bean `{{fieldName}}`
- [x] Custom Attributes `{ #id .class name=value name='value'}`
- [x] Text Align, Text Size and Text Colors using Custom Attributes

[![](https://raw.githubusercontent.com/tiagohm/MarkdownView/master/1.png)](https://raw.githubusercontent.com/tiagohm/MarkdownView/master/1.png)

### Example

Here's a MarkdownView Example using this library:

**activity_main.xml**

We start by creating the layout:

```xml
<?xml version="1.0" encoding="utf-8"?>
<LinearLayout xmlns:android="http://schemas.android.com/apk/res/android"
    xmlns:app="http://schemas.android.com/apk/res-auto"
    xmlns:tools="http://schemas.android.com/tools"
    android:id="@+id/activity_main"
    android:layout_width="match_parent"
    android:layout_height="match_parent"
    android:orientation="vertical"
    tools:context="br.tiagohm.markdownview.app.MainActivity">

    <br.tiagohm.markdownview.MarkdownView
        android:id="@+id/mark_view"
        android:layout_width="match_parent"
        android:layout_height="match_parent"
        app:escapeHtml="false" />
</LinearLayout>
```

**MainActivity.java**

Then we write our code, either in kotlin or java:

```java
package br.tiagohm.markdownview.app;

import android.os.Bundle;
import android.support.v7.app.AppCompatActivity;
import android.view.Menu;
import android.view.MenuItem;

import br.tiagohm.markdownview.MarkdownView;
import br.tiagohm.markdownview.css.InternalStyleSheet;
import br.tiagohm.markdownview.css.styles.Github;

public class MainActivity extends AppCompatActivity {

    private MarkdownView mMarkdownView;
    private InternalStyleSheet mStyle = new Github();

    @Override
    public boolean onCreateOptionsMenu(Menu menu) {
        getMenuInflater().inflate(R.menu.menu_main, menu);
        return true;
    }

    @Override
    public boolean onOptionsItemSelected(MenuItem item) {
        switch (item.getItemId()) {
            case R.id.change_theme_action:
                break;
        }

        return true;
    }

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);

        //Cria o bean.
        MyBean myBean = new MyBean();
        myBean.setHello("Olá");
        myBean.setDiasDaSemana(MyBean.DiasDaSemana.DOMINGO);

        mMarkdownView = findViewById(R.id.mark_view);
        mMarkdownView.addStyleSheet(mStyle);
        //http://stackoverflow.com/questions/6370690/media-queries-how-to-target-desktop-tablet-and-mobile
        mStyle.addMedia("screen and (min-width: 320px)");
        mStyle.addRule("h1", "color: green");
        mStyle.endMedia();
        mStyle.addMedia("screen and (min-width: 481px)");
        mStyle.addRule("h1", "color: red");
        mStyle.endMedia();
        mStyle.addMedia("screen and (min-width: 641px)");
        mStyle.addRule("h1", "color: blue");
        mStyle.endMedia();
        mStyle.addMedia("screen and (min-width: 961px)");
        mStyle.addRule("h1", "color: yellow");
        mStyle.endMedia();
        mStyle.addMedia("screen and (min-width: 1025px)");
        mStyle.addRule("h1", "color: gray");
        mStyle.endMedia();
        mStyle.addMedia("screen and (min-width: 1281px)");
        mStyle.addRule("h1", "color: orange");
        mStyle.endMedia();
        mMarkdownView.setBean(myBean);
        mMarkdownView.loadMarkdownFromAsset("markdown1.md");
    }

    public static class MyBean {

        public enum DiasDaSemana {
            DOMINGO,
            SEGUNDA,
            TERCA,
            QUARTA,
            QUINTA,
            SEXTA,
            SABADO
        }

        private String hello;
        private DiasDaSemana diasDaSemana;

        public String getHello() {
            return hello;
        }

        public void setHello(String hello) {
            this.hello = hello;
        }

        public DiasDaSemana getDiasDaSemana() {
            return diasDaSemana;
        }

        public void setDiasDaSemana(DiasDaSemana diasDaSemana) {
            this.diasDaSemana = diasDaSemana;
        }
    }
}
```

[Here](https://github.com/tiagohm/MarkdownView/tree/master/app) is the source code reference.

### Reference

Read more about this library [here](https://github.com/tiagohm/MarkdownView)

## (b). falnatsheh/MarkdownView

> MarkdownView is an Android webview with the capablity of loading Markdown text or file and display it as HTML, it uses MarkdownJ and extends Android webview.

MarkdownView (Markdown For Android) is an Android library that helps you display Markdown text or files (local/remote) as formatted HTML, and style the output using CSS.

The MarkdownView itself extends Android Webview and adds the necessary logic to parse Markdown (using MarkdownJ) and display the output HTML on the view.

### Step 1: Installation

Install MarkdownView from jcenter:

```groovy
implementation 'us.feras.mdv:markdownview:1.1.0'
```

### Step 2: Add to Layout

Add MarkdownView to your XML layout:

```xml
   <us.feras.mdv.MarkdownView
        android:layout_width="match_parent"
        android:layout_height="match_parent"
        android:id="@+id/markdownView" />
```

### Step 3: Write Code

If you are using Java reference the MarkdownView from our layout:

```java
MarkdownView markdownView = (MarkdownView) findViewById(R.id.markdownView);
markdownView.loadMarkdown("## Hello Markdown"); 
```

You can also use view Binding or data binding whether your are using java or kotlin. If you are using Kotlin you can use Kotlin Synthetics.

You can also create MarkdownView programmatically:

```java
  MarkdownView markdownView = new MarkdownView(this);
  setContentView(markdownView);
  markdownView.loadMarkdown("## Hello Markdown"); 
```

### Example

Let's now look at a full example of how to use MarkdownView library to load markdown locally:

**MainActivity.java**

```java
import us.feras.mdv.MarkdownView;
import android.app.Activity;
import android.os.Bundle;
import android.support.v7.app.AppCompatActivity;
import android.view.Window;

public class LocalMarkdownActivity extends AppCompatActivity {
    @Override
    public void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        MarkdownView webView = new MarkdownView(this);
        setContentView(webView);
        webView.loadMarkdownFile("file:///android_asset/hello.md");
    }
}
```

**How to Apply themes to MarkdownView**

Let's say you have themes and you want to display theme. User chooses a theme from a spinner and we apply that theme to markdownview:

```java
import us.feras.mdv.MarkdownView;
import android.app.Activity;
import android.os.Bundle;
import android.support.v7.app.AppCompatActivity;
import android.view.View;
import android.widget.AdapterView;
import android.widget.AdapterView.OnItemSelectedListener;
import android.widget.ArrayAdapter;
import android.widget.Spinner;

public class MarkdownThemesActivity extends AppCompatActivity implements
        OnItemSelectedListener {
    @Override
    public void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.markdown_themes);
        Spinner themesSpinner = (Spinner) findViewById(R.id.themes_spinner);
        ArrayAdapter<CharSequence> adapter = ArrayAdapter.createFromResource(
                this, R.array.md_themes, android.R.layout.simple_spinner_item);
        adapter.setDropDownViewResource(android.R.layout.simple_spinner_dropdown_item);
        themesSpinner.setAdapter(adapter);
        themesSpinner.setSelection(0);
        themesSpinner.setOnItemSelectedListener(this);
    }

    @Override
    public void onItemSelected(AdapterView<?> parent, View view, int pos,
            long id) {
        MarkdownView mdv = (MarkdownView) findViewById(R.id.markdownView);
        mdv.loadMarkdownFile("file:///android_asset/hello.md",
                "file:///android_asset/markdown_css_themes/"
                        + parent.getItemAtPosition(pos).toString() + ".css");
    }

    @Override
    public void onNothingSelected(AdapterView<?> parent) {
        // no-op
    }
}
```

**How to Load Markdown from a string**

If you ahev your markdown in memory as a string, this example shows how you can load it:

```java
public class MarkdownDataActivity extends AppCompatActivity {

    private EditText markdownEditText;
    private MarkdownView markdownView;

    @Override
    public void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.markdown_view);
        markdownEditText = (EditText) findViewById(R.id.markdownText);
        markdownView = (MarkdownView) findViewById(R.id.markdownView);
        String text = getResources().getString(R.string.md_sample_data);
        markdownEditText.setText(text);
        updateMarkdownView();

        markdownEditText.addTextChangedListener(new TextWatcher() {

            @Override
            public void afterTextChanged(Editable s) {}

            @Override
            public void beforeTextChanged(CharSequence s, int start, int count, int after) {}

            @Override
            public void onTextChanged(CharSequence s, int start, int before, int count) {
                updateMarkdownView();
            }
        });

    }

    private void updateMarkdownView() {
        markdownView.loadMarkdown(markdownEditText.getText().toString());
    }
}
```

**How to Render Markdowb from online**

If you ahev the markdown file hosted remotely and you want to download and render it, here's how you do that:

```java
public class RemoteMarkdownActivity extends AppCompatActivity {
    @Override 
    public void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        MarkdownView markdownView = new MarkdownView(this); 
        setContentView(markdownView);
        markdownView.loadMarkdownFile("https://raw.github.com/falnatsheh/MarkdownView/master/README.md");
    }
}
```

Access this examples [here](https://github.com/falnatsheh/MarkdownView/tree/master/MarkdownView/app)

### Demo

Here's demo:

![](https://camo.githubusercontent.com/7b4b5be1b2bc787a4d567da7772099924643aac6acad9a7b41f239052acbc57b/687474703a2f2f692e696d6775722e636f6d2f6759386558616a2e6a7067)

### Reference

Find complete reference [here](https://github.com/falnatsheh/MarkdownView)

## (c). mukeshsolanki/MarkdownView-Android

> MarkdownView is a simple library that helps you display Markdown text or files on Android as a html page just like Github.

![](https://raw.githubusercontent.com/mukeshsolanki/MarkdownView-Android/master/Screenshots/demo.gif)

### Step 1: Installation

Add jitpack in your root level build.gradle file:

```groovy
maven { url "https://jitpack.io" }
```

Then install the library;

```groovy
implementation 'com.github.mukeshsolanki:MarkdownView-Android:1.1.1'
```

### Step 2: Add Layout

Next you need to add MarkdowView to you layout:

```xml
<com.mukesh.MarkdownView
    android:id="@+id/markdown_view"
    android:layout_width="match_parent"
    android:layout_height="match_parent"
/>
```

### Step 3: Code

Then write java or kotlin code:

Reference the MarkdownView:

```java
MarkdownView markdownView = (MarkdownView) findViewById(R.id.markdown_view);
```

Here's how you set Markdowb from a string:

```java
markdownView.setMarkDownText("# Hello World\nThis is a simple markdown"); //Displays markdown text
...
```

Here's howyou load markdown from assets:

```java
markdownView.loadMarkdownFromAssets("README.md"); //Loads the markdown file from the assets folder
...
```

And here's how you load markdown from file system or path:

```java
File markdownFile=new File("filePath");
markdownView.loadMarkdownFromFile(markdownFile); //Loads the markdown file.
```

### Example

Here's a complete example:

**MainActivity.java**

```java
package com.mukesh.markdownview.example;

import android.os.Bundle;
import android.support.v7.app.AppCompatActivity;
import com.mukesh.MarkdownView;

public class MainActivity extends AppCompatActivity {

  @Override protected void onCreate(Bundle savedInstanceState) {
    super.onCreate(savedInstanceState);
    setContentView(R.layout.activity_main);
    MarkdownView markdownView = (MarkdownView) findViewById(R.id.markdown_view);
    markdownView.setMarkDownText("# Hello World\nThis is a simple markdown\n"
        + "https://github.com/mukeshsolanki/MarkdownView-Android/");
    //markdownView.loadMarkdownFromAssets("README.md");
    markdownView.setOpenUrlInBrowser(true); // default false

  }
}
```

Find source code [here](https://github.com/mukeshsolanki/MarkdownView-Android/tree/master/app).

### Reference

Find complete reference [here](mukeshsolanki/MarkdownView-Android).
