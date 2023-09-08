# Android TextView Tutorial, Variations and Customizations


_Android TextView Tutorial and Examples_

Let's discuss one of the most simple and commonly used android widgets, the `TextView` class.

Android TextView is a User interface widget that displays basic texts.


In almost every Graphical User Interface toolkit out there, a component or control for displaying text is there. Be it the `Label` in `Windows Forms` or the `JLabel` in `Swing`.

This is because we mostly communicate via texts and these texts have to be rendered. Well the textview renders them in Android.

TextViews and labels are normally considered basic and are easy to work with.

In android textviews are actually editable though by default this is disabled. Instead it's subclass the `EditText` on the other hand allows for editing.

TextView as a class resides in the `android.widget` package.

```java
package android.widget;
```

TextView derives from `android.view.View` class and implements `import android.view.ViewTreeObserver.OnPreDrawListener`.

```java
public class TextView extends View implements OnPreDrawListener {}
```

TextViews can be created either programmatically or via inflation of XML. Here are the constructors to create a TextView object programmatically.

| No. | Constructor |
| --- | --- |
| 1. | `public TextView(Context context)` |
| 2. | `public TextView(Context context, AttributeSet attrs)` |
| 3. | `public TextView(Context context, AttributeSet attrs, int defStyleAttr)` |
| 4. | `public TextView(Context context, AttributeSet attrs, int defStyleAttr, int defStyleRes)` |

Let's look at various TextView examples:

#### Creating TextView From XML Definition

Most of the time we define textviews via xml and inflate them in our activity. Here's a typical definition of android textview;

```xml
<TextView
    android_id="@+id/greetingsTxt"
    android_layout_width="wrap_content"
    android_layout_height="wrap_content"
    android_text="Hello World!"
/>
```

- First we specify a unique id for the textview using`android:id=""` attribute that will be used to reference the textview from C# code.
- We then define the layout width(`android:layout_width=""`) and height(`android:layout_height=""`) of the textview.
- Next we specify the text via the `android:text=""` attribute.

We then come to our `MainActivity`'s `OnCreate()` method. `OnCreate()` method is a lifecycle callback that gets called when the activity in android has been created.

Normally we make view initializations here since the activity has been created.

But first we make sure that the following method has been invoked:

````java
setContentView(R.layout.activity_main);
```language
````

The above method will inflate our \`activity_main.axml\` layout and set it as the layout of our activity. This layout has to be inflated first since it contains our \`TextView\`.

Then we come reference our \`TextView\`:

```java
TextView greetingsTxt= (TextView) findViewById(R.id.greetingsTxt);
```

This will give us a textview reference which we can use to set text:

```java
 greetingsTxt.setText("Hello World Over there");
```

If we run the project we get:

Here's the full source code: activity_main.axml:

```xml


    android_layout_width="match_parent"
    android_layout_height="match_parent"
    tools_context="com.tutorials.hp.textviewapp.MainActivity">

    
```

MainActivity.java

```java
package com.tutorials.hp.textviewapp;

import android.support.v7.app.AppCompatActivity;
import android.os.Bundle;
import android.widget.TextView;

public class MainActivity extends AppCompatActivity {

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);

        TextView greetingsTxt= (TextView) findViewById(R.id.greetingsTxt);
        greetingsTxt.setText("Hello World Over there");
    }
}
```

#### Creating TextView Programmatically as the ContentView of an Activity

It's not mandatory that you set a layout as the content view of an activity.

You can use a view instead of inflating a layout. If anything the layouts do get inflated into a view object.

However this is only suitable for simple interfaces. if you need a complex interface with nested widgets, then you use the layout as it's easier to write such declaratively.

First we instantiate a TextView programmatically, passing in the \`Context\` object:

```java
TextView greetingsTxt=new TextView(this);
```

Let's then set the textview's background color programmatically:

```java
greetingsTxt.setBackgroundColor(Color.GREEN);
```

Then set the text:

```java
greetingsTxt.setBackgroundColor(Color.GREEN);
```

And finally set the content view:

```java
setContentView(greetingsTxt);
```

Here's the full code. Note we don't need an xml layout:

```java
package com.tutorials.hp.textviewapp;

import android.graphics.Color;
import android.support.v7.app.AppCompatActivity;
import android.os.Bundle;
import android.widget.TextView;

public class MainActivity extends AppCompatActivity {

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);

        TextView greetingsTxt=new TextView(this);
        greetingsTxt.setBackgroundColor(Color.GREEN);
        setContentView(greetingsTxt);
    }
}
```

Here's what we get:

Here's another example of building a textview programmatically with several attributes being set:

```java
private TextView buildTextView(Context context, CharSequence text) {
    TextView textView = new TextView(context);
    LinearLayout.LayoutParams params = new LinearLayout.LayoutParams(0, ViewGroup.LayoutParams.MATCH_PARENT, 1);
    textView.setLayoutParams(params);
    textView.setTextColor(mTextColor);
    textView.setText(text);
    textView.setTextSize(TypedValue.COMPLEX_UNIT_SP, mTextSize);
    textView.setMaxLines(3);
    textView.setEllipsize(TextUtils.TruncateAt.END);
    textView.setGravity(Gravity.CENTER);
    textView.setPadding(mPaddingHorizontal, mPaddingVertical, mPaddingHorizontal, mPaddingVertical);
    return textView;
}
```

#### Hiding a TextView

What about if you want to hide a textview. Well it's a view so we can simply set it's visibility to \`View.GONE\`:

```java
public void hideTextView()
{
    TextView positive = (TextView) findViewById(R.id.action_positive);
    positive.setVisibility(View.GONE);
    TextView negative = (TextView) findViewById(R.id.action_negative);
    negative.setVisibility(View.GONE);
}
```

#### Using TextView in a Fragment

Well just override the \`onCreateView()\` method of your [Fragment](https://camposha.info/android/fragment), then first make sure the Fragment layout is inflated into a View object.

Then find the textview from that inflated view:

```java
  TextView tv = (TextView) view.findViewById(R.id.text);
```

Then of course you can set it's text property as you wish:

```java
@Nullable @Override
public View onCreateView(LayoutInflater inflater, @Nullable ViewGroup container,
    @Nullable Bundle savedInstanceState) {

  View view = inflater.inflate(R.layout.fragment_child, container, false);
  TextView tv = (TextView) view.findViewById(R.id.text);
  tv.setText(toString());

  return view;
}
```

#### Common TextView Methods and examples

##### 1\. setText()

To set text to a textview you simply use the \`setText()\` method.

```java
TextView nameTxt = (TextView) findViewById(R.id.nameTxt);
nameTxt.setText(msg);
```

What about if you want to set text that has been sent from another [activity](https://camposha.info/android/activity):

```java
@Override
protected void onCreate(Bundle savedInstanceState) {
    super.onCreate(savedInstanceState);
    setContentView(R.layout.activity_counter);

    TextView courseTxt = (TextView) findViewById(R.id.textView3);
    courseTxt.setText(getIntent().getStringExtra("course_id"));
    courseTxt.setTextColor(Color.WHITE);
}
```

##### 2\. setTextColor()

Let's say we have the color in defined in the colors.xml resource, so we load the color from there using \`getResources().getColor()\` invokation.

```java
nameTxt.setTextColor(mContext.getResources().getColor(R.color.text_black));
```

You can also set color literal in hexadecimal notation(using the characters '0x' followed by the hexadecimal number) like this;

```java
nameTxt.setTextColor(0xFF000000);
```

This is the Opaque black color we've used.

However we can also set the color from the \`android.Graphics.Color\` class as follows:

```java
nameTxt.setTextColor(Color.BLACK);
nameTxt.setTextColor(Color.WHITE);
```

##### 3\. setBackgroundColor()

Well we are also capable of setting the background color of a textview:

```java
nameTxt.setBackgroundColor(getResources().getColor(R.color.color_yellow_fcf3cd));
```

##### 5\. setGravity()

```java
nameTxt.setGravity(Gravity.CENTER);
```

##### 6\. setTextSize()

```java
nameTxt.setTextSize(TypedValue.COMPLEX_UNIT_DIP, 13);
```

##### 7\. setSingleLine()

```java
nameTxt.setSingleLine();
```

##### 8\. setTypeface()

```java
Typeface font = FontManager.getInstance().getFont(FontManager.Font.ROBOTO_LIGHT);
nameTxt.setTypeface(font);
```

##### 9\. setId()

```java
nameTxt.setId((int) getItemId(position));
```

##### 10\. setLayoutParams()

```java
nameTxt.setLayoutParams(new RelativeLayout.LayoutParams(-1, -1));
```

##### 11\. How to add and Cancel Strike Through to TextView

These two methods show us how to add or cancel a strike through in a textview widget.

You just pass that textView as a parameter and we invoke the \`setPaintFlags()\` with the appropriate parameters. We utilize the \`Paint\` class, which normally holds the style and color information about how to draw geometries, text and bitmaps.

```java
    // Set the strikethrough
    public static void addStrikeThrough(TextView textView) {
        textView.setPaintFlags(textView.getPaintFlags() | Paint.STRIKE_THRU_TEXT_FLAG);
    }

    // Cancel the strikethrough
    public static void removeStrikeThrough(TextView textView) {
        textView.setPaintFlags(textView.getPaintFlags() & (~Paint.STRIKE_THRU_TEXT_FLAG));
    }
```

##### 11\. postDelayed()

```java
@Override
protected void onCreate(Bundle savedInstanceState) {
    super.onCreate(savedInstanceState);
    setContentView(R.layout.activity_main);
    place = (TextView) findViewById(R.id.tv_placeholder);
    textView = (TextView) findViewById(R.id.tv_info);
    textView.postDelayed(new Runnable() {
        @Override
        public void run() {
            place.setVisibility(View.GONE);
            if (EmulatorDetector.getDefault().isEmulator()) {
                textView.setText("This device is emulatorn" + EmulatorDetector.getDefault().getEmulatorName());
            } else {
                textView.setText("This device is not emulatorn");
            }
        }
    }, 1000L);
}
```

##### 12\. How to create a Gradient TextView

```java
import android.content.Context;
import android.graphics.Canvas;
import android.graphics.LinearGradient;
import android.graphics.Paint;
import android.graphics.Shader;
import android.os.Build;
import android.text.TextUtils;
import android.util.AttributeSet;
import android.widget.TextView;

public class GradientTextView extends TextView {

    public GradientTextView(Context context) {
        super(context);
    }

    public GradientTextView(Context context, AttributeSet attrs) {
        super(context, attrs);
    }

    public GradientTextView(Context context, AttributeSet attrs, int defStyleAttr) {
        super(context, attrs, defStyleAttr);
    }

    @Override
    protected void onDraw(Canvas canvas) {
        CharSequence text = getText();
        if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.JELLY_BEAN) {
            if(!TextUtils.isEmpty(text)&&text.length()
```

``

### 2. Android TextView - Fill From StringBuilder

_Android TextView and StringBuilder Example Tutorial._

How to populate a textview from a stringbuilder.

`android.widget.TextView` is a class used to render texts.

`java.lang.StringBuilder` on the other hand allows for creation of modifiable string of characters. StringBuilder is the replacemnet for `StringBuffer` class for non-concurrent use.

In this example we'll see how to:

- Create a StringBuilder with multiple items.
- Render the StringBuilder items in a TextView line by line.

For this example we don't need any XML layout. Instead we create and set an `android.view.View` object as our contentView for our activity.

Let's go.

Classes in Java are normally grouped into packages. So we first specify the package for our MainActivity class.

```java
package com.tutorials.hp.textviewstringbuilder;
```

We then define the class:

```java
public class MainActivity{}
```

We'll then add several imports above the class:

```java
import android.support.v7.app.AppCompatActivity;
import android.os.Bundle;
import android.widget.TextView;
```

Then make the class derive from `AppCompatActivity`.

```java
public class MainActivity extends AppCompatActivity {}
```

AppCompatActivity makes your activity backword compatible with older devices. To use it your app level build.gradle dependencies section must contain the following support library. Note the version can differ:

```groovy
compile 'com.android.support:appcompat-v7:26.+'
```

We then override the `onCreate()` method inside our class. This is a lifecycle callback for android that gets raised when the activity is created. We'll do our stuff right here.

```java
protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
   }
```

Note that we have to call the super class onCreate() method as above and pass it the savedInstanceState.

Then we instantiate the StringBuilder class:

```java
StringBuilder sb=new StringBuilder();
```

All these we do inside the `onCreate()` method.

Then append our data using method chaining. This is possible since each `append()` method returns an instance of the `StringBuilder`.

```java
sb.append("Mercury n").append("Venus n").append("Earth n").append("Mars n").append("Jupiter n").append("Saturn n").append("Neptunen").append("Uranus n");
```

Then instantiate our TextView, passing in our Context object.

```java
TextView planetsTxt=new TextView(this);
```

Then convert our StringBuilder to String using the `toString()` method so that we can display it in the TextView.

```java
planetsTxt.setText(sb.toString());
```

Lastly we call the `setContentView()` method of the AppCompatActivity class. This method will set our TextView as the main view of our activity.

```java
setContentView(planetsTxt);
```

Here's the full source code. Note we don't need an XML for this example.

```java
package com.tutorials.hp.textviewstringbuilder;

import android.support.v7.app.AppCompatActivity;
import android.os.Bundle;
import android.widget.TextView;

public class MainActivity extends AppCompatActivity {

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);

        StringBuilder sb=new StringBuilder();
        sb.append("Mercury n").append("Venus n").append("Earth n").append("Mars n")
        .append("Jupiter n").append("Saturn n").append("Neptune n").append("Uranus n");

        TextView planetsTxt=new TextView(this);
        planetsTxt.setText(sb.toString());
        setContentView(planetsTxt);
    }
}
```

### Android AppCompatTextView

_AppCompatTextView is basically a TextView which provides support to older version of the android platform with compatible features of a TextView._

Whenever you use a TextView, android may automatically use the AppCompatTextView.

This is if your project has the necessary support library dependencies.

AppCompatTextView resides in the `android.support.v7.widget` package.

```java
package android.support.v7.widget;
```

This class derives from TextView:

```java
public class AppCompatTextView extends TextView{}
```

Given that it derives from `android.widget.TextView`, this class inherits TextView's XML attributes. Some of these attributes are inherited by TextView itself from the base View class.

#### Creating AppCompatTextView.

Not only can you create AppCompatTextView via the XML specifications, but you can also create them programmatically.

To do so you can use the provided public constructors.

Android does provide us three of those:

| No. | Constructor |
| --- | --- |
| 1. | AppCompatTextView(Context context) |
| 2. | AppCompatTextView(Context context, AttributeSet attrs) |
| 3. | AppCompatTextView(Context context, AttributeSet attrs, int defStyleAttr) |

As for the methods this class does inherit them from other classes like TextView, View and Object.

### How to detect links,hashtags,mention, phones etc in TextViews

We mostly render labels and text data using textviews in android. By default textviews are pretty basic and usually you have to manually parse the text to detect hashtags, links, phone numbers, emails and mentions.

However there are a couple of solutions you can use for this capability.

## (a). AutoLinkTextViewV2

AutoLinkTextViewV2 is the new version of the [AutoLinkTextView](https://github.com/armcha/AutoLinkTextView).

**The main differences between the old and new version are**

- Fully migration to Kotlin
- Added several new features
- Some improvements and fixes

**It supports automatic detection and click handling for**

- Hashtags (#)
- Mentions (@)
- URLs (http://)
- Phone Numbers
- Emails
- Custom Regex

### Features

- Default support for **Hashtag, Mention, Link, Phone number and Email**
- Support for **custom types** via regex
- Transform url to short clickable text
- Ability to apply **multiple spans** to any mode
- Ability to set specific text color
- Ability to set pressed state color

**Step 1: Installation**

This library is hosted in jcenter. The minimum API supported is API level 16.

To install it:

```groovy
implementation 'com.github.armcha:AutoLinkTextViewV2:2.1.1'
```

**Step 2: Layout**

Then in the layout add:

<io.github.armcha.autolink.AutoLinkTextView android:id\="@+id/autolinkTextView" android:layout_width\="wrap_content" android:layout_height\="wrap_content" />

**Step 3: Code**

Then in the code

```kotlin
val autoLinkTextView = findViewById(R.id.autolinkTextView);
```

Add one or multiple:

```kotlin
autoLinkTextView.addAutoLinkMode(
                MODE_HASHTAG,
                MODE_URL)
```

You can add URL transformations to transform URL into clickable texts:

```kotlin
autoLinkTextView.addUrlTransformations(
                "https://google.com" to "Google",
                "https://en.wikipedia.org/wiki/Wear_OS" to "Wear OS")
```

Or attach a URL processor:

```kotlin
autoLinkTextView.attachUrlProcessor { originalUrl: String ->
    when {
        originalUrl.startsWith("https://en.wikipedia") -> "Wiki"
        originalUrl.contains("android") -> "Android"
        else -> originalUrl
    }
}
```

You can style the transformations:

```kotlin
autoLinkTextView.addSpan(MODE_URL, StyleSpan(Typeface.ITALIC), UnderlineSpan())
autoLinkTextView.addSpan(MODE_HASHTAG, UnderlineSpan(), TypefaceSpan("monospace"))
```

You can listen to the link click event:

```kotlin
autoLinkTextView.onAutoLinkClick { item: AutoLinkItem ->
}
```

Setting text by the way is easy:

```kotlin
autoLinkTextView.text = getString(R.string.android_text)
```

![](https://github.com/armcha/AutoLinkTextViewV2/raw/master/screens/static.png)

Read more or find full example [here](https://github.com/armcha/AutoLinkTextViewV2).

### How to copy TextView content into Clipboard

In this short piece we want to look at several easy ways to copy textview content into the clipboard. For example, suppose you want to copy TextView content into an edittext for saving.

### (a). Use CopyButton

CopyButton is a simple library created for just that purpose. It is free from boilerplate code and can be attached to a textview. For example you can listen to double click or long click events in a textview, then react by copying the text content of that textview.

**Step 1: Installation** 

Install it from jitpack:

```groovy
allprojects {
    repositories {
        ...
        maven { url 'https://jitpack.io' }
    }
}

dependencies {
     implementation 'com.github.hajiyevelnur92:Copy-button:1.0'
}
```

**Step 2: Code**

Then in the code:

```java
import codehive.copybuttonlibrary.CopyButtonLibrary;
...

CopyButtonLibrary copyButtonLibrary = new CopyButtonLibrary(getApplicationContext(),textView);
copyButtonLibrary.init();
```

**Links**

1. Download the code [here](https://github.com/hajiyevelnur92/Copy-button) and follow the author [here](https://github.com/hajiyevelnur92/).

### Creating an EmailValidator

_Android AutoCompleteTextView Tutorial and Example_

#### Validating Email Address using Regex

```java
import android.text.util.Rfc822Tokenizer;
import android.widget.AutoCompleteTextView.Validator;

import java.util.regex.Pattern;

public class EmailAddressValidator implements Validator {
    private static final Pattern EMAIL_ADDRESS_PATTERN = Pattern.compile(
          "[a-zA-Z0-9+._%-]{1,256}" +
          "@" +
          "[a-zA-Z0-9][a-zA-Z0-9-]{0,64}" +
          "(" +
          "." +
          "[a-zA-Z0-9][a-zA-Z0-9-]{0,25}" +
          ")+"
      );

    public CharSequence fixText(CharSequence invalidText) {
        return "";
    }

    public boolean isValid(CharSequence text) {
        return Rfc822Tokenizer.tokenize(text).length > 0;
    }

    public boolean isValidAddressOnly(CharSequence text) {
        return EMAIL_ADDRESS_PATTERN.matcher(text).matches();
    }
}
```

``
