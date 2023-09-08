# Android CodeView - Examples and Libraries

If you are creating a tutorial's app or a sort of app that teaches coding, then you would do with a native widget able to not only render code but also higlight it. Such a widget is what we call codeview and that's what we cover in this tutorial. We look at several codeview libraries and examples.


### Introduction

> How to Render Code, in an Android App.

In this quick tutorial, we will see how you can easily render code in an android app. This type of scenario can be useful if you are creating, let's say a tutorial app that teaches coding. Well your users will need to see some code samples, won't they. 

Well here are the solutions to use:

## (a). CodeView

> Code Highlighter widget.

Here are the features of this widget:

- Powered by Highlight.js
- 176 languages and 79 styles
- Wrap Line
- Language Detection
- Zoom (Pinch gesture)
- Line Number
- Line Count
- Highlight current line (by click/tap)
- Highlight line
- Tap event of lines (get line number and your content)

Here's simple demo:

![](https://raw.githubusercontent.com/tiagohm/CodeView/master/1.png)

### Step 1: Install CodeView

This library is hosted in jitpack so you need to register jitpack as a maven url under the all projects closure in your project-level build.gradle:

```groovy
 maven { url "https://jitpack.io" }
```

Then add dependency in the app-level build.gradle:

```groovy
implementation 'com.github.tiagohm:CodeView:0.4.0'
```

Now sync to download and install the library.

### Step 2: Add CodeView to Layout

Go to the xml layout where you want to render the codeview then add the following:

```xml
<br.tiagohm.codeview.CodeView
        android:id="@+id/codeView"
        android:layout_width="match_parent"
        android:layout_height="match_parent"
        app:cv_font_size="14"
        app:cv_highlight_line_number="36"
        app:cv_show_line_number="true"
        app:cv_start_line_number="0"
        app:cv_wrap_line="true"
        app:cv_zoom_enable="true">
    </br.tiagohm.codeview.CodeView>
```

### Step 3: Write Code

Now go and write code. If you are using java you may for example reference the codeview as follows;

```java
mCodeView = (CodeView)findViewById(R.id.codeView);
```

Or you may use data binding or view binding whether you are using java or kotlin. You can also use kotlin synthetics if you are using kotlin.

Then set the highlight listener, theme, code, language and other settings like font size and zoom properties as follows:

```
mCodeView.setOnHighlightListener(this)
      .setOnHighlightListener(this)
      .setTheme(Theme.AGATE)
      .setCode(JAVA_CODE)
      .setLanguage(Language.JAVA)
      .setWrapLine(true)
      .setFontSize(14)
      .setZoomEnabled(true)
      .setShowLineNumber(true)
      .setStartLineNumber(9000)
      .apply();
```

Here are some other methods:

```java
mCodeView.highlightLineNumber(10);
mCodeView.toggleLineNumber();
mCodeView.getLineCount();
```

### Example

Let's now look at a full codeview example:

**(a). activity_main.xml**

Create the layout for our main activity and codeview to it:

```xml
<?xml version="1.0" encoding="utf-8"?>
<LinearLayout
    xmlns:android="http://schemas.android.com/apk/res/android"
    xmlns:app="http://schemas.android.com/apk/res-auto"
    xmlns:tools="http://schemas.android.com/tools"
    android:id="@+id/activity_main"
    android:layout_width="match_parent"
    android:layout_height="match_parent"
    android:orientation="vertical"
    tools:context="br.tiagohm.codeview.app.MainActivity">

    <br.tiagohm.codeview.CodeView
        android:id="@+id/code_view"
        android:layout_width="match_parent"
        android:layout_height="0dp"
        android:layout_weight="1"
        app:cv_font_size="14"
        app:cv_highlight_line_number="36"
        app:cv_show_line_number="true"
        app:cv_start_line_number="0"
        app:cv_wrap_line="true"
        app:cv_zoom_enable="true">
    </br.tiagohm.codeview.CodeView>

</LinearLayout>
```

**(b). MainActivity.java**

Our only activity:

```java
package br.tiagohm.codeview.app;

import android.app.ProgressDialog;
import android.os.Bundle;
import android.support.v7.app.AppCompatActivity;
import android.util.Log;
import android.view.Menu;
import android.view.MenuItem;
import android.widget.Toast;

import br.tiagohm.codeview.CodeView;
import br.tiagohm.codeview.Language;
import br.tiagohm.codeview.Theme;

public class MainActivity extends AppCompatActivity implements CodeView.OnHighlightListener {

    private static final String JAVA_CODE = "package com.example.android.bluetoothchat;\n" +
            "\n" +
            "import android.os.Bundle;\n" +
            "import android.support.v4.app.FragmentTransaction;\n" +
            "import android.view.Menu;\n" +
            "import android.view.MenuItem;\n" +
            "import android.widget.ViewAnimator;\n" +
            "\n" +
            "import com.example.android.common.activities.SampleActivityBase;\n" +
            "import com.example.android.common.logger.Log;\n" +
            "import com.example.android.common.logger.LogFragment;\n" +
            "import com.example.android.common.logger.LogWrapper;\n" +
            "import com.example.android.common.logger.MessageOnlyLogFilter;\n" +
            "\n" +
            "/**\n" +
            " * A simple launcher activity containing a summary sample description, sample log and a custom\n" +
            " * {@link android.support.v4.app.Fragment} which can display a view.\n" +
            " * <p>\n" +
            " * For devices with displays with a width of 720dp or greater, the sample log is always visible,\n" +
            " * on other devices it's visibility is controlled by an item on the Action Bar.\n" +
            " */\n" +
            "public class MainActivity extends SampleActivityBase {\n" +
            "\n" +
            "    public static final String TAG = \"MainActivity\";\n" +
            "\n" +
            "    // Whether the Log Fragment is currently shown\n" +
            "    private boolean mLogShown;\n" +
            "\n" +
            "    @Override\n" +
            "    protected void onCreate(Bundle savedInstanceState) {\n" +
            "        super.onCreate(savedInstanceState);\n" +
            "        setContentView(R.layout.activity_main);\n" +
            "\n" +
            "        if (savedInstanceState == null) {\n" +
            "            FragmentTransaction transaction = getSupportFragmentManager().beginTransaction();\n" +
            "            BluetoothChatFragment fragment = new BluetoothChatFragment();\n" +
            "            transaction.replace(R.id.sample_content_fragment, fragment);\n" +
            "            transaction.commit();\n" +
            "        }\n" +
            "    }\n" +
            "\n" +
            "    @Override\n" +
            "    public boolean onCreateOptionsMenu(Menu menu) {\n" +
            "        getMenuInflater().inflate(R.menu.main, menu);\n" +
            "        return true;\n" +
            "    }\n" +
            "\n" +
            "    @Override\n" +
            "    public boolean onPrepareOptionsMenu(Menu menu) {\n" +
            "        MenuItem logToggle = menu.findItem(R.id.menu_toggle_log);\n" +
            "        logToggle.setVisible(findViewById(R.id.sample_output) instanceof ViewAnimator);\n" +
            "        logToggle.setTitle(mLogShown ? R.string.sample_hide_log : R.string.sample_show_log);\n" +
            "\n" +
            "        return super.onPrepareOptionsMenu(menu);\n" +
            "    }\n" +
            "\n" +
            "    @Override\n" +
            "    public boolean onPrepareOptionsMenu(Menu menu) {\n" +
            "        MenuItem logToggle = menu.findItem(R.id.menu_toggle_log);\n" +
            "        logToggle.setVisible(findViewById(R.id.sample_output) instanceof ViewAnimator);\n" +
            "        logToggle.setTitle(mLogShown ? R.string.sample_hide_log : R.string.sample_show_log);\n" +
            "\n" +
            "        return super.onPrepareOptionsMenu(menu);\n" +
            "    }\n" +
            "\n" +
            "    @Override\n" +
            "    public boolean onPrepareOptionsMenu(Menu menu) {\n" +
            "        MenuItem logToggle = menu.findItem(R.id.menu_toggle_log);\n" +
            "        logToggle.setVisible(findViewById(R.id.sample_output) instanceof ViewAnimator);\n" +
            "        logToggle.setTitle(mLogShown ? R.string.sample_hide_log : R.string.sample_show_log);\n" +
            "\n" +
            "        return super.onPrepareOptionsMenu(menu);\n" +
            "    }\n" +
            "\n" +
            "    @Override\n" +
            "    public boolean onOptionsItemSelected(MenuItem item) {\n" +
            "        switch(item.getItemId()) {\n" +
            "            case R.id.menu_toggle_log:\n" +
            "                mLogShown = !mLogShown;\n" +
            "                ViewAnimator output = (ViewAnimator) findViewById(R.id.sample_output);\n" +
            "                if (mLogShown) {\n" +
            "                    output.setDisplayedChild(1);\n" +
            "                } else {\n" +
            "                    output.setDisplayedChild(0);\n" +
            "                }\n" +
            "                supportInvalidateOptionsMenu();\n" +
            "                return true;\n" +
            "        }\n" +
            "        return super.onOptionsItemSelected(item);\n" +
            "    }\n" +
            "\n" +
            "    /** Create a chain of targets that will receive log data */\n" +
            "    @Override\n" +
            "    public void initializeLogging() {\n" +
            "        // Wraps Android's native log framework.\n" +
            "        LogWrapper logWrapper = new LogWrapper();\n" +
            "        // Using Log, front-end to the logging chain, emulates android.util.log method signatures.\n" +
            "        Log.setLogNode(logWrapper);\n" +
            "\n" +
            "        // Filter strips out everything except the message text.\n" +
            "        MessageOnlyLogFilter msgFilter = new MessageOnlyLogFilter();\n" +
            "        logWrapper.setNext(msgFilter);\n" +
            "\n" +
            "        // On screen logging via a fragment with a TextView.\n" +
            "        LogFragment logFragment = (LogFragment) getSupportFragmentManager()\n" +
            "                .findFragmentById(R.id.log_fragment);\n" +
            "        msgFilter.setNext(logFragment.getLogView());\n" +
            "\n" +
            "        Log.i(TAG, \"Ready\");\n" +
            "    }\n" +
            "}";

    CodeView mCodeView;
    private ProgressDialog mProgressDialog;
    private int themePos = 0;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);

        mCodeView = (CodeView) findViewById(R.id.code_view);

        mCodeView.setOnHighlightListener(this)
                .setOnHighlightListener(this)
                .setTheme(Theme.ARDUINO_LIGHT)
                .setCode(JAVA_CODE)
                .setLanguage(Language.AUTO)
                .setWrapLine(true)
                .setFontSize(14)
                .setZoomEnabled(true)
                .setShowLineNumber(true)
                .setStartLineNumber(1)
                .apply();
    }

    @Override
    public boolean onCreateOptionsMenu(Menu menu) {
        getMenuInflater().inflate(R.menu.menu_main, menu);
        return true;
    }

    @Override
    public boolean onOptionsItemSelected(MenuItem item) {
        switch (item.getItemId()) {
            case R.id.change_theme_action:
                setHighlightTheme(++themePos);
                return true;
            case R.id.show_line_number_action:
                mCodeView.toggleLineNumber();
                break;
        }
        return super.onOptionsItemSelected(item);
    }

    @Override
    public void onStartCodeHighlight() {
        mProgressDialog = ProgressDialog.show(this, null, "Carregando...", true);
    }

    @Override
    public void onFinishCodeHighlight() {
        if (mProgressDialog != null) {
            mProgressDialog.dismiss();
        }
        Toast.makeText(this, "line count: " + mCodeView.getLineCount(), Toast.LENGTH_SHORT).show();
    }

    @Override
    public void onLanguageDetected(Language language, int relevance) {
        Toast.makeText(this, "language: " + language + " relevance: " + relevance, Toast.LENGTH_SHORT).show();
    }

    @Override
    public void onFontSizeChanged(int sizeInPx) {
        Log.d("TAG", "font-size: " + sizeInPx + "px");
    }

    @Override
    public void onLineClicked(int lineNumber, String content) {
        Toast.makeText(this, "line: " + lineNumber + " html: " + content, Toast.LENGTH_SHORT).show();
    }

    private void setHighlightTheme(int pos) {
        mCodeView.setTheme(Theme.ALL.get(pos)).apply();
        Toast.makeText(this, Theme.ALL.get(pos).getName(), Toast.LENGTH_SHORT).show();
    }
}
```

Find source code [here](https://github.com/tiagohm/CodeView/tree/master/app).

### Reference

Find source code reference [here](https://github.com/tiagohm/CodeView).

## (b). CodeView-Android

> Display code with syntax highlighting sparkles in native way.

**CodeView** contains 3 core parts to implement necessary logic:

1. **CodeView** & related abstract adapter to provide options & customization (see below).
    
2. For highlighting it uses **CodeHighlighter**, it highlights your code & returns formatted content. It's based on [Google Prettify](https://github.com/google/code-prettify) and their Java implementation & [fork](https://github.com/google/code-prettify).
    
3. **CodeClassifier** is trying to define what language is presented in the code snippet. It's built using [Naive Bayes classifier](https://en.wikipedia.org/wiki/Naive_Bayes_classifier) upon found open-source [implementation](https://github.com/ptnplanet/Java-Naive-Bayes-Classifier), which I rewrote in Kotlin. There is no need to work with this class directly & you must just follow instructions below. (Experimental module, may not work properly!)
    

![Android CodeView Example](https://camo.githubusercontent.com/3b9c6f7f340450572dc88c8ed2519dba00f1a8e12084a4cf3d5d737349bbbbfb/68747470733a2f2f707265766965772e6962622e636f2f6461447177382f53637265656e5f53686f745f323031385f30375f31395f61745f31395f32355f30302e706e67)

### Step 1: Install it

This library is also hosted in jitpack so you add jitpack in your root level gradle file:

```groovy
 maven { url "https://jitpack.io" }
```

Then install it:

```groovy
implementation 'com.github.kbiakov:CodeView-Android:1.3.2'
```

### Step 2: Add CodeView Layout

Add codeview to your xml layout:

```xml
<io.github.kbiakov.codeview.CodeView
    android:id="@+id/code_view"
    android:layout_width="wrap_content"
    android:layout_height="wrap_content" />
```

### Step 3: Write Code

**Tranin Code Classifier**

If you want to use code classifier to auto language recognizing just add to your Application.java:

```java
// train classifier on app start
CodeProcessor.init(this);
```

**Reference CodeView**

That is if you are still using the old findViewById style:

```java
CodeView codeView = (CodeView) findViewById(R.id.code_view);
```

**Set Code**

Youcan now set code onto your codeview with auto-language detection:

```java
// auto language recognition
codeView.setCode(getString(R.string.listing_js));
```

You can also explicitly specify the language:

```java
// will work faster!
codeView.setCode(getString(R.string.listing_py), "py");
```

**Change Theme**

You can change theme as follows:

```java
codeView.getOptions().setTheme(ColorTheme.SOLARIZED_LIGHT);
```

More customizations:

```java
codeView.setOptions(Options.Default.get(this)
    .withLanguage("python")
    .withCode(R.string.listing_py)
    .withTheme(ColorTheme.MONOKAI));
```

And

```java
ColorThemeData myTheme = ColorTheme.SOLARIZED_LIGHT.theme()
    .withBgContent(android.R.color.black)
    .withNoteColor(android.R.color.white);

codeView.getOptions().setTheme(myTheme);
```

**Setting Font**

You can set your own font:

```java
codeView.getOptions().withFont(Font.Consolas);
```

### Example

Find comlete example [here](https://github.com/kbiakov/CodeView-Android/tree/master/example)

### Reference

Find more documentation [here](https://github.com/kbiakov/CodeView-Android)
