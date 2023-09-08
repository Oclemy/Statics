# WebView Tutorial and Examples

This is an android WebView tutorial and Examples. A WebView is an android SDK view that is capable of rendering web pages.


#### What is a WebView?

> A WebView, as we've said, is a WebView is a view that displays web pages.

It is represented by the `WebView` class. This class is much more powerful than you might think. Yet it is very easy and straighforward to use and provides you abstractions you build upon.

It is this class that is the basis upon which you can create your own web browser or simply display some online content within your Activity. WebView makes use of the **WebKit** rendering engine to display web pages and includes methods t:

1. navigate forward and backward through a history
2. zoom in and out.
3. perform text searches and more.

WebView is very powerful as it provides you with a way to write applications in languages like Javascript and the HTML markup. There are so many frameworks that make use of this capability, thus allowing you write your app in HTML5 technologies. You can even turn your website, like say a wordpress website into an android app.

#### WebView API Definition

`WebView` is a concrete class residing in the `android.webkit` package. It derives from the `android.widget.AbsoluteLayout` class and implements several interfaces as shown below:

```java
public class WebView extends AbsoluteLayout implements ViewTreeObserver.OnGlobalFocusChangeListener, ViewGroup.OnHierarchyChangeListener
```

Here's it's inheritance hierarchy:

```java
java.lang.Object
   ↳    android.view.View
       ↳    android.view.ViewGroup
           ↳    android.widget.AbsoluteLayout
               ↳    android.webkit.WebView
```

#### Why Webview?

WebView is probably one of the most practical, easy to use yet underused classes in android. This is because it basically allows you to create an android app using HTML, CSS and Javascript. I would understand if it wasn't used so much if it couldn't execute Javascript or render CSS. However it does all those.

This then provides with powerful capabilities as HTML, CSS and Javascript are easy to use, popular technologies powering the user interfaces of almost every web app or website you have ever visited. Moreover there are hundreds of frameworks/libraries for these technologies that provide powerful widgets and abstractions. These include jQuery, Vue.js, Angular, React.js, Bootstrap, materializecss, UIKit etc.

You can easiliy create a simple client-side web app that can interact with server side technologies like Node.js and PHP then place in your assets folder. Then use WebView to load it. You have to ensure Javascript is enabled however. This, I understand is not as powerful as having a full Java application written in Java or Kotlin or C#, however, for beginners, you would quickly bootstrap your first app that you can show friends as you continue your education.

### Using WebView

Most of the time you will want to render online content in your webview. So in order for your [Activity](https://camposha.info/android/activity) to access the Internet and load web pages in a WebView, you must add the `INTERNET` permissions to your Android Manifest file:

```xml
<uses-permission android_name="android.permission.INTERNET" />
```

Then in your layout add a `<WebView>` in your layout, or set the entire Activity window as a WebView during onCreate():

```java
 WebView webview = new WebView(this);
 setContentView(webview);
```

Once you've done that then you can load you webpage via the `loadUrl()` method:

```java
 // Simplest usage: note that an exception will NOT be thrown
 // if there is an error loading this page (see below).
 webview.loadUrl("https://camposha.info/");
```

`loadurl()` will load our website from the url we supply. This is the most commonly used way.

You can also load from an HTML string:

```java
 String summary = "<html><body>You scored <b>192</b> points.</body></html>";
 webview.loadData(summary, "text/html", null);
 // ... although note that there are restrictions on what this HTML can do.
 // See the JavaDocs for loadData() and loadDataWithBaseURL() for more info.
```

This basically means you write your HTML code inside a string. Then load it via the `loadData()` method. This is suitable for loading websites with simple DOM(Document Object Model) structure.

## Example 1: Kotlin Android WebView Example

A simple webview example written in Kotlin.

### Step 1: Create Project

Start by creating an empty `Android Studio` project.

### Step 2: Dependencies

No third party dependencies are needed for this project.

### Step 3: Add Permission

Go to your `AndroidManifest.xml` and add the following internet permission:

```xml
    <uses-permission android:name="android.permission.INTERNET"/>
```

That permission allows us to be able to utilize the network to render a webpage.

### Step 4: Design Layout

In your `activity_main.xml` add a WebView as a widget as follows:

**activity_main.xml**

```xml
<?xml version="1.0" encoding="utf-8"?>
<LinearLayout xmlns:android="http://schemas.android.com/apk/res/android"
    xmlns:app="http://schemas.android.com/apk/res-auto"
    xmlns:tools="http://schemas.android.com/tools"
    android:layout_width="match_parent"
    android:layout_height="match_parent"
    tools:context=".MainActivity">

    <WebView
        android:id="@+id/web_view"
        android:layout_width="match_parent"
        android:layout_height="match_parent"/>

</LinearLayout>
```

### Step 4: Load Webpage

Here's how you load webpage onto a webview:

```kotlin
        webview.loadUrl("https://www.google.com/")
```

If you want to enable JavaScript you enable it as a `webview.settings` property:

```kotlin
       val webSettings = webview.settings
        webSettings.javaScriptEnabled = true
```

Here's the full code:

**MainActivity.kt**

```kotlin
import androidx.appcompat.app.AppCompatActivity
import android.os.Bundle
import android.view.KeyEvent
import android.view.MotionEvent
import android.view.View
import android.webkit.WebResourceRequest
import android.webkit.WebView
import android.webkit.WebViewClient

class MainActivity : AppCompatActivity() {

    lateinit var webview: WebView

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_main)

        webview = findViewById(R.id.web_view)
        webview.loadUrl("https://www.alphadeveloperteam.com/")

        val webSettings = webview.settings
        webSettings.javaScriptEnabled = true

        webview.webViewClient = WebViewClient()

        webview.canGoBack()
        webview.setOnKeyListener(View.OnKeyListener { v, keyCode, event ->
            if (keyCode == KeyEvent.KEYCODE_BACK
                    && event.action == MotionEvent.ACTION_UP
                    && webview.canGoBack()){
                    webview.goBack()
                    return@OnKeyListener true
            }
            false
        })
    }
}
```

### Run

Copy the code or download it in the link below, build and run.

### Reference

Here are the reference links:

| Number | Link |
| --- | --- |
| 1. | [Download](https://github.com/Kiran-Bahalaskar/WebView-Using-Kotlin/archive/refs/heads/master.zip) Example |
| 2. | [Follow](https://github.com/Kiran-Bahalaskar/) code author |
| 3. | Code: [Apache 2.0 License](http://www.apache.org/licenses/LICENSE-2.0.txt) |

## Example 2: Android WebView - Load From URL, Strings and Asset Folder

> _Android WebView - Load From URL, Strings and Asset Folder_

WebView is actually one of those classes that have existed in android since the beginning.

Added in API level 1, it resides in android.webkit package. It is used to display web content right within the activity. This makes it very powerful and can be used to build even a basic browser that works. It is still a view so we can simply drag it over from the pallete to our layout. It renders web pages using webkit rendering engine. In this example we use a webview to render web content from :

- URL online.
- Local Assets folder.
- String within java code.

To load from url, you must android internet permission in the androidmanifest.xml. You can find more details about WebView [here](https://developer.android.com/reference/android/webkit/WebView.html).

##### Screenshot

- Here's the screenshot of the project.

![](https://camposha.info/android-examples/wp-content/uploads/sites/9/2021/05/webview.gif)

##### Common Questions this example explores

- What is WebView?
- How to load website from url in webview.
- How to load html from assets frolder in webview.
- How to load html string in webview.
- How to use webview in android activity.

##### Tools Used

This example was written with the following tools:

- Windows 8
- AndroidStudio IDE
- Genymotion Emulator
- Language : Java

No third party library was used in this project.

Lets jump directly to the source code.

##### AndroidManifest.xml

- Android Manifest File.
- Add Internet permission as we shall fetch a webpage also from url.

```xml
<?xml version="1.0" encoding="utf-8"?>
<manifest
    package="com.tutorials.hp.webviewer">

    <uses-permission android_name="android.permission.INTERNET"/>
    ...
</manifest>
```

##### Build.Gradle

- Normally in android projects, there are two build.gradle files. One is the app level build.gradle, the other is project level build.gradle. The app level belongs inside the app folder and its where we normally add our dependencies and specify the compile and target sdks.
- Also Add dependencies for AppCompat and Design support libraries.
- Our MainActivity shall derive from AppCompatActivity while we shall also use Floating action button from design support libraries.

```groovy
dependencies {
    implementation 'com.android.support:appcompat-v7:26.+'
    implementation 'com.android.support.constraint:constraint-layout:1.0.0-alpha7'
    implementation 'com.android.support:design:26.+'
    testImplementation 'junit:junit:4.12'
}
```

##### MainActivity.java

- Launcher activity.
- ActivityMain.xml inflated as the contentview for this activity.
- We initialize views and widgets inside this activity.
- We switch through menu items in our toolbar, selecting to load from url,assets or string.

```java
public class MainActivity extends AppCompatActivity {

    WebView webView;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);
        Toolbar toolbar = (Toolbar) findViewById(R.id.toolbar);
        setSupportActionBar(toolbar);

        webView= (WebView) findViewById(R.id.myWebview);

        FloatingActionButton fab = (FloatingActionButton) findViewById(R.id.fab);
        fab.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View view) {

            }
        });
    }

    /*
    LOAD WEBSITE
     */

    @Override
    public boolean onCreateOptionsMenu(Menu menu) {
        // Inflate the menu; this adds items to the action bar if it is present.
        getMenuInflater().inflate(R.menu.menu_main, menu);
        return true;
    }

    @Override
    public boolean onOptionsItemSelected(MenuItem item) {
        // Handle action bar item clicks here. The action bar will
        // automatically handle clicks on the Home/Up button, so long
        // as you specify a parent activity in AndroidManifest.xml.
        int id = item.getItemId();

        //noinspection SimplifiableIfStatement
        if (id == R.id.urlID) {
            //LOAD FROM URL
            webView.loadUrl("https://camposha.info");

            return true;
        }else if (id == R.id.assetsID) {

            //LOAD FROM ASSETS
            webView.loadUrl("file:///android_asset/Campo.html");

            return true;
        }else if (id == R.id.stringID) {

            //LOAD FROM STRING
            String html="<html><title></title><body>" +
                    "<h1><u>Programming Languages</u></h1>" +
                    "Below are some languages check them out: " +
                    "<ol>" +
                    "<li>Java</li><li>C#</li><li>C++</li><li>Python</li><li>PHP</li><li>Perl</li>" +
                    "</ol>" +
                    "</body></html>";
            webView.loadData(html,"text/html","UTF-8");

            return true;
        }

        return super.onOptionsItemSelected(item);
    }
}
```

##### ActivityMain.xml

- Template layout.
- Contains our ContentMain.xml.
- Also defines the appbarlayout, toolbar as well as floatingaction buttton.

```xml
<?xml version="1.0" encoding="utf-8"?>
<android.support.design.widget.CoordinatorLayout

    android_layout_width="match_parent"
    android_layout_height="match_parent"
    tools_context="com.tutorials.hp.webviewer.MainActivity">

    <android.support.design.widget.AppBarLayout
        android_layout_width="match_parent"
        android_layout_height="wrap_content"
        android_theme="@style/AppTheme.AppBarOverlay">

        <android.support.v7.widget.Toolbar
            android_id="@+id/toolbar"
            android_layout_width="match_parent"
            android_layout_height="?attr/actionBarSize"
            android_background="?attr/colorPrimary"
            app_popupTheme="@style/AppTheme.PopupOverlay" />

    </android.support.design.widget.AppBarLayout>

    <include layout="@layout/content_main" />

    <android.support.design.widget.FloatingActionButton
        android_id="@+id/fab"
        android_layout_width="wrap_content"
        android_layout_height="wrap_content"
        android_layout_gravity="bottom|end"
        android_layout_margin="@dimen/fab_margin"
        app_srcCompat="@android:drawable/ic_dialog_email" />

</android.support.design.widget.CoordinatorLayout>
```

##### ContentMain.xml

- Content Layout.
- Defines the views and widgets to be displayed inside the MainActivity.
- In this case its a simple webview.

```xml
<?xml version="1.0" encoding="utf-8"?>
<android.support.constraint.ConstraintLayout

    android_layout_width="match_parent"
    android_layout_height="match_parent"
    app_layout_behavior="@string/appbar_scrolling_view_behavior"
    tools_context="com.tutorials.hp.webviewer.MainActivity"
    tools_showIn="@layout/activity_main">

    <WebView
        android_id="@+id/myWebview"
        android_layout_width="match_parent"
        android_layout_height="match_parent"
        android_layout_centerHorizontal="true"
        />

</android.support.constraint.ConstraintLayout>
```

##### menu_main.xml"

- We shall be switching through menu items in our toolbar.
- Let's define this in menu_main.xml inside the menu's directory.

```xml
<menu

    tools_context="com.tutorials.hp.webviewer.MainActivity">
    <item
        android_id="@+id/action_settings"
        android_orderInCategory="100"
        android_title="@string/action_settings"
        app_showAsAction="never" />
    <item
        android_id="@+id/urlID"
        android_title="URL"
        app_showAsAction="never" />

    <item
        android_id="@+id/assetsID"
        android_title="Assets"
        app_showAsAction="never" />

    <item
        android_id="@+id/stringID"
        android_title="String"
        app_showAsAction="never" />
</menu>
```

##### Download

- Download the Project below:

| No. | Location | Link |
| --- | --- | --- |
| 1. | GitHub | [Direct Download](https://github.com/Oclemy/First-WebView/archive/master.zip) |
| 2. | GitHub | [Browse](https://github.com/Oclemy/First-WebView) |

##### Conclusion.

We saw a simple android webview example. How to load webpages from online via url, from assets folder and from string data.

## Quick WebView Examples and HowTo's

Let's look at quick howTos for our webview class. Then later on we will see how to write a full app.

#### 1\. Commonly used WebView settings

Here are some comminly used WebView settings. Let's encapsulate them in a simple static method that we can then easily re-use.

```java
    // Commonly used WebViewSetting
    public static void initWebSetting(WebView webView) {
        WebSettings setting = webView.getSettings();
        setting.setJavaScriptEnabled(true);
        setting.setAllowFileAccess(true);
        setting.setAllowFileAccessFromFileURLs(true);
        setting.setAllowUniversalAccessFromFileURLs(true);
        setting.setAppCacheEnabled(true);
        setting.setDatabaseEnabled(true);
        setting.setDomStorageEnabled(true);
        setting.setCacheMode(WebSettings.LOAD_DEFAULT);
        setting.setAppCachePath(webView.getContext().getCacheDir().getAbsolutePath());
        setting.setUseWideViewPort(true);
        setting.setLoadWithOverviewMode(true);
        setting.setLayoutAlgorithm(WebSettings.LayoutAlgorithm.SINGLE_COLUMN);
        if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.JELLY_BEAN) {
            setting.setAllowFileAccessFromFileURLs(true);
        }
    }
```

That method is taking a `WebView` object. We first obtain the webview settings via the `getSettings` method of the `WebView` class. Then we enable javascript via the `setJavaScriptEnabled()` method. Most of these settings methods take in a boolean value to either enable or disable various settings.

#### 2\. How to Create a Custom WebView

We want to create a custom webview that can be used in a NestedScrollView.

```java
import android.content.Context;
import android.support.v4.view.MotionEventCompat;
import android.util.AttributeSet;
import android.view.MotionEvent;
import android.webkit.WebView;

public class MyWebView extends WebView {

    public MyWebView(Context context) {
        super(context);
    }

    public MyWebView(Context context, AttributeSet attrs) {
        super(context, attrs);
    }

    public MyWebView(Context context, AttributeSet attrs, int defStyle) {
        super(context, attrs, defStyle);
    }

    @Override
    public boolean onTouchEvent(MotionEvent event) {

        //Check pointer index to avoid -1 (error)
        if (MotionEventCompat.findPointerIndex(event, 0) == -1) {
            return super.onTouchEvent(event);
        }

        if (event.getPointerCount() >= 1) {
            requestDisallowInterceptTouchEvent(true);
        } else {
            requestDisallowInterceptTouchEvent(false);
        }

        return super.onTouchEvent(event);
    }

    @Override
    protected void onOverScrolled(int scrollX, int scrollY, boolean clampedX, boolean clampedY) {
        super.onOverScrolled(scrollX, scrollY, clampedX, clampedY);
        requestDisallowInterceptTouchEvent(true);
    }
}
```

## How to Inject CSS into a WebView

You may want to manipulate a page you don't own using CSS. For example say that a webpage loads and then you apply your own styling in CSS.

This is possible in android webview. Here are the steps:

### Step 1: Import Base64

Add the following import:

```kotlin
import android.util.Base64
```

### Step 2: Create a function to inject css

This function will inject css via Javascript:

```kotlin
private fun injectCSS() {
            try {
                val inputStream = assets.open("style.css")
                val buffer = ByteArray(inputStream.available())
                inputStream.read(buffer)
                inputStream.close()
                val encoded = Base64.encodeToString(buffer , Base64.NO_WRAP)
                webframe.loadUrl(
                    "javascript:(function() {" +
                            "var parent = document.getElementsByTagName('head').item(0);" +
                            "var style = document.createElement('style');" +
                            "style.type = 'text/css';" +
                            // Tell the browser to BASE64-decode the string into your script !!!
                            "style.innerHTML = window.atob('" + encoded + "');" +
                            "parent.appendChild(style)" +
                            "})()"
                )
            } catch (e: Exception) {
                e.printStackTrace()
            }

        }
```

### Step 3: Override onPageFinished

The next step is to override the onpage finished event which gets called once webview has finished loading content.

```kotlin
 override fun onPageFinished(view: WebView?, url: String?) {
                injectCSS()
}
```

That's it.
