String resources
================

> On this page You will learn:
- String resources
  - String
  - String array
  - Quantity strings (plurals)
  - Format and style
    - Handle special characters
    - Formatting strings
    - Styling with HTML markup
  - Styling with spannables
  - Styling with annotations
    - Example - adding a custom typeface
    - Annotation spans and text parceling

A string resource provides text strings for your application with optional text styling and formatting. There are three types of resources that can provide your application with strings:

String XML resource that provides a single string. String Array XML resource that provides an array of strings. Quantity Strings (Plurals) XML resource that carries different strings for pluralization.

All strings are capable of applying some styling markup and formatting arguments. For information about styling and formatting strings, see the section about Formatting and Styling.

String
------

A single string that can be referenced from the application or from other resource files (such as an XML layout).

> **Note:** A string is a simple resource that is referenced using the value provided in the `name` attribute (not the name of the XML file). So, you can combine string resources with other simple resources in the one XML file, under one `<resources>` element.

file location: `res/values/_filename_.xml`
The filename is arbitrary. The `<string>` element's `name` is used as the resource ID. compiled resource datatype: Resource pointer to a `String`. resource reference: In Java: `R.string._string_name_`
In XML:`@string/_string_name_` syntax:

```xml
<?xml version="1.0" encoding="utf-8"?>
<resources\>
  <string
    name="_string\_name_"
    >_text\_string_</string>
</resources>
```

elements: `<resources>` **Required.** This must be the root node.

No attributes.

`<string>` A string, which can include styling tags. Beware that you must escape apostrophes and quotation marks. For more information about how to properly style and format your strings see Formatting and Styling, below.

attributes:

`name` _String_. A name for the string. This name is used as the resource ID. example: XML file saved at `res/values/strings.xml`:

```xml
<?xml version="1.0" encoding="utf-8"?>
<resources>
  <string name="hello">Hello!</string>
</resources>
```

This layout XML applies a string to a View:

```xml
<TextView
  android:layout\_width="fill\_parent"
  android:layout\_height="wrap\_content"
  **android:text="@string/hello"** />
```

This application code retrieves a string:

**Kotlin**

```kotlin
val string: String = `getString)`(R.string.hello)
```

**Java**

```java
String string = `getString)`(R.string.hello);
```

You can use either `getString(int))` or `getText(int))` to retrieve a string. `getText(int))` retains any rich text styling applied to the string.

String array
------------

An array of strings that can be referenced from the application.

**Note:** A string array is a simple resource that is referenced using the value provided in the `name` attribute (not the name of the XML file). As such, you can combine string array resources with other simple resources in the one XML file, under one `<resources>` element.

file location: `res/values/_filename_.xml`
The filename is arbitrary. The `<string-array>` element's `name` is used as the resource ID. compiled resource datatype: Resource pointer to an array of `String`s. resource reference: In Java: `R.array._string_array_name_`
In XML: `@[_package_:]array/_string_array_name_` syntax:

```xml
<?xml version="1.0" encoding="utf-8"?>
<resources\>
  <string-array
    name="_string\_array\_name_">
    <item
      >_text\_string_</item>
  </string-array>
</resources>
```

elements: `<resources>` **Required.** This must be the root node.

No attributes.

`<string-array>` Defines an array of strings. Contains one or more `<item>` elements.

attributes:

`name` _String_. A name for the array. This name is used as the resource ID to reference the array. `<item>` A string, which can include styling tags. The value can be a reference to another string resource. Must be a child of a `<string-array>` element. Beware that you must escape apostrophes and quotation marks. See Formatting and Styling, below, for information about to properly style and format your strings.

No attributes.

example: XML file saved at `res/values/strings.xml`:

```xml
<?xml version="1.0" encoding="utf-8"?>
<resources>
  <string-array name="planets\_array">
    <item>Mercury</item>
    <item>Venus</item>
    <item>Earth</item>
    <item>Mars</item>
  </string-array>
</resources>
```

This application code retrieves a string array:

**Kotlin**

```kotlin
val array: Array = `resources)`.`getStringArray)`(R.array.planets\_array)
```

**Java**

```java
Resources res = `getResources())`;
String\[\] planets = res.`getStringArray)`(R.array.planets\_array);
```

Quantity strings (plurals)
--------------------------

Different languages have different rules for grammatical agreement with quantity. In English, for example, the quantity 1 is a special case. We write "1 book", but for any other quantity we'd write "_n_ books". This distinction between singular and plural is very common, but other languages make finer distinctions. The full set supported by Android is `zero`, `one`, `two`, `few`, `many`, and `other`.

The rules for deciding which case to use for a given language and quantity can be very complex, so Android provides you with methods such as `getQuantityString())` to select the appropriate resource for you.

Although historically called "quantity strings" (and still called that in API), quantity strings should _only_ be used for plurals. It would be a mistake to use quantity strings to implement something like Gmail's "Inbox" versus "Inbox (12)" when there are unread messages, for example. It might seem convenient to use quantity strings instead of an `if` statement, but it's important to note that some languages (such as Chinese) don't make these grammatical distinctions at all, so you'll always get the `other` string.

The selection of which string to use is made solely based on grammatical _necessity_. In English, a string for `zero` is ignored even if the quantity is 0, because 0 isn't grammatically different from 2, or any other number except 1 ("zero books", "one book", "two books", and so on). Conversely, in Korean _only_ the `other` string is ever used.

Don't be misled either by the fact that, say, `two` sounds like it could only apply to the quantity 2: a language may require that 2, 12, 102 (and so on) are all treated like one another but differently to other quantities. Rely on your translator to know what distinctions their language actually insists upon.

If your message doesn't contain the quantity number, it is probably not a good candidate for a plural. For example, in Latvian the singular form is used for both 1 and 101, so "1 book" is translated as "1 knyga", and "101 books" is translated as "101 knyga". Meanwhile "a book" is "knyga" and "many books" is "daug knygų". If an English plural message contains "a book" (singular) and "many books" (plural) without the actual number, it can be translated as "knyga" (a book)/"daug knygų" (many books), but with Latvian rules, it will show "knyga" (a single book), when the number happens to be 101.

It's often possible to avoid quantity strings by using quantity-neutral formulations such as "Books: 1". This makes your life and your translators' lives easier, if it's an acceptable style for your application.

On API 24+ you can use the much more powerful ICU `MessageFormat` class instead.

**Note:** A plurals collection is a simple resource that is referenced using the value provided in the `name` attribute (not the name of the XML file). As such, you can combine plurals resources with other simple resources in the one XML file, under one `<resources>` element.

file location: `res/values/_filename_.xml`
The filename is arbitrary. The `<plurals>` element's `name` is used as the resource ID. resource reference: In Java: `R.plurals._plural_name_` syntax:

```xml
<?xml version="1.0" encoding="utf-8"?>
<resources\>
  <plurals
    name="_plural\_name_">
    <item
      quantity=\["zero" | "one" | "two" | "few" | "many" | "other"\]
      >_text\_string_</item>
  </plurals>
</resources>
```

elements: `<resources>` **Required.** This must be the root node.

No attributes.

`<plurals>` A collection of strings, of which, one string is provided depending on the amount of something. Contains one or more `<item>` elements.

attributes:

`name` _String_. A name for the pair of strings. This name is used as the resource ID. `<item>` A plural or singular string. The value can be a reference to another string resource. Must be a child of a `<plurals>` element. Beware that you must escape apostrophes and quotation marks. See Formatting and Styling, below, for information about to properly style and format your strings.

attributes:

`quantity` _Keyword_. A value indicating when this string should be used. Valid values, with non-exhaustive examples in parentheses:

| Value | Description |
| --- | --- |
| `zero` | When the language requires special treatment of the number 0 (as in Arabic). |
| `one` | When the language requires special treatment of numbers like one (as with the number 1 in English and most other languages; in Russian, any number ending in 1 but not ending in 11 is in this class). |
| `two` | When the language requires special treatment of numbers like two (as with 2 in Welsh, or 102 in Slovenian). |
| `few` | When the language requires special treatment of "small" numbers (as with 2, 3, and 4 in Czech; or numbers ending 2, 3, or 4 but not 12, 13, or 14 in Polish). |
| `many` | When the language requires special treatment of "large" numbers (as with numbers ending 11-99 in Maltese). |
| `other` | When the language does not require special treatment of the given quantity (as with all numbers in Chinese, or 42 in English). |

example: XML file saved at `res/values/strings.xml`:

```xml
<?xml version="1.0" encoding="utf-8"?>
<resources>
  <plurals name="numberOfSongsAvailable">
    <!--
      As a developer, you should always supply "one" and "other"
      strings. Your translators will know which strings are actually
      needed for their language. Always include %d in "one" because
      translators will need to use %d for languages where "one"
      doesn't mean 1 (as explained above).
     -->
    <item quantity="one">%d song found.</item>
    <item quantity="other">%d songs found.</item>
  </plurals>
</resources>
```

XML file saved at `res/values-pl/strings.xml`:

```xml
<?xml version="1.0" encoding="utf-8"?>
<resources>
  <plurals name="numberOfSongsAvailable">
    <item quantity="one">Znaleziono %d piosenkę.</item>
    <item quantity="few">Znaleziono %d piosenki.</item>
    <item quantity="other">Znaleziono %d piosenek.</item>
  </plurals>
</resources>
```

Usage:

**Kotlin**

```kotlin
val count = getNumberOfSongsAvailable()
val songsFound = resources.`getQuantityString)`(R.plurals.numberOfSongsAvailable, count, count)
```

**Java**

```java
int count = getNumberOfSongsAvailable();
Resources res = `getResources())`;
String songsFound = res.`getQuantityString)`(R.plurals.numberOfSongsAvailable, count, count);
```

When using the `getQuantityString())` method, you need to pass the `count` twice if your string includes string formatting with a number. For example, for the string `%d songs found`, the first `count` parameter selects the appropriate plural string and the second `count` parameter is inserted into the `%d` placeholder. If your plural strings do not include string formatting, you don't need to pass the third parameter to `getQuantityString)`.

Format and style
----------------

Here are a few important things you should know about how to properly format and style your string resources.

### Handle special characters

When a string contains characters that have special usage in XML, you must escape the characters according to the standard XML/HTML escaping rules. If you need to escape a character that has special meaning in Android you should use a preceding backslash.

By default Android will collapse sequences of whitespace characters into a single space. You can avoid this by enclosing the relevant part of your string in double quotes. In this case all whitespace characters (including new lines) will get preserved within the quoted region. Double quotes will allow you to use regular single unescaped quotes as well.

| Character | Escaped form(s) |
| --- | --- |
| @ | `\@` |
| ? | `\?` |
| New line | `\n` |
| Tab | `\t` |
| U+XXXX Unicode character | `\uXXXX` |
| Single quote (`'`) |
Any of the following:

*   `\'`
*   Enclose the entire string in double quotes (`"This'll work"`, for example)

 |
| Double quote (`"`) | `\"`

Note that surrounding the string with single quotes does not work.

 |

Whitespace collapsing and Android escaping happens after your resource file gets parsed as XML. This means that `<string> &#32; &#8200; &#8195;</string>` (space, punctuation space, Unicode Em space) all collapse to a single space (`""`), because they are all Unicode spaces after the file is parsed as an XML. To preserve those spaces as they are, you can either quote them (`<string>" &#32; &#8200; &#8195;"</string>`) or use Android escaping (`<string> \u0032 \u8200 \u8195</string>`).

**Note:** From XML parser's perspective, there is no difference between `<string>"Test this"</string>` and `<string>&quot;Test this&quot;</string>` whatsoever. Both forms will not show any quotes but trigger Android whitespace-preserving quoting (that will have no practical effect in this case).

### Formatting strings

If you need to format your strings, then you can do so by putting your format arguments in the string resource, as demonstrated by the following example resource.

```xml
<string name="welcome\_messages">Hello, %1$s! You have %2$d new messages.</string>
```

In this example, the format string has two arguments: `%1$s` is a string and `%2$d` is a decimal number. Then, format the string by calling `getString(int, Object...))`. For example:

**Kotlin**

```kotlin
var text = getString(R.string.welcome\_messages, username, mailCount)
```

**Java**

```java
String text = getString(R.string.welcome\_messages, username, mailCount);
```

### Styling with HTML markup

You can add styling to your strings with HTML markup. For example:

```xml
<?xml version="1.0" encoding="utf-8"?>
<resources>
  <string name="welcome">Welcome to <b>Android</b>!</string>
</resources>
```

The following HTML elements are supported:

*   Bold: `<b>, <em>`
*   Italic: `<i>, <cite>, <dfn>`
*   25% larger text: `<big>`
*   20% smaller text: `<small>`
*   Setting font properties: `<font face=”font\_family“ color=”hex\_color”>`. Examples of possible font families include `monospace`, `serif`, and `sans_serif`.
*   Setting a monospace font family: `<tt>`
*   Strikethrough: `<s>, <strike>, <del>`
*   Underline: `<u>`
*   Superscript: `<sup>`
*   Subscript: `<sub>`
*   Bullet points:` <ul>, <li>`
*   Line breaks: `<br>`
*   Division: `<div>`
*   CSS style: `<span style=”color|background\_color|text-decoration”>`
*   Paragraphs: `<p dir=”rtl | ltr” style=”…”>`

If you aren't applying formatting, you can set TextView text directly by calling `setText(java.lang.CharSequence))`. In some cases, however, you may want to create a styled text resource that is also used as a format string. Normally, this doesn't work because the `format(String, Object...))` and `getString(int, Object...))` methods strip all the style information from the string. The work-around to this is to write the HTML tags with escaped entities, which are then recovered with `fromHtml(String))`, after the formatting takes place. For example:

1.  Store your styled text resource as an HTML-escaped string:

```xml
    <resources>
     <string name="welcome\_messages">Hello, %1$s! You have &lt;b>%2$d new messages&lt;/b>.</string>
    </resources>
```

    In this formatted string, a `<b>` element is added. Notice that the opening bracket is HTML-escaped, using the `&lt;` notation.

2.  Then format the string as usual, but also call `fromHtml(String))` to convert the HTML text into styled text:

** Kotlin**

```kotlin
    val text: String = getString(R.string.welcome\_messages, username, mailCount)
    val styledText: Spanned = Html.fromHtml(text, FROM\_HTML\_MODE\_LEGACY)
```

**Java**

```java
    String text = getString(R.string.welcome\_messages, username, mailCount);
    Spanned styledText = Html.fromHtml(text, FROM\_HTML\_MODE\_LEGACY);
```

Because the `fromHtml(String))` method formats all HTML entities, be sure to escape any possible HTML characters in the strings you use with the formatted text, using `htmlEncode(String))`. For instance, if you are formatting a string that contains characters such as "<" or "&", then they must be escaped before formatting, so that when the formatted string is passed through `fromHtml(String))`, the characters come out the way they were originally written. For example:

**Kotlin**

```kotlin
val escapedUsername: String = TextUtils.`htmlEncode)`(username)

val text: String = getString(R.string.welcome\_messages, escapedUsername, mailCount)
val styledText: Spanned = Html.fromHtml(text, FROM\_HTML\_MODE\_LEGACY)
```

**Java**

```java
String escapedUsername = TextUtils.`htmlEncode)`(username);

String text = getString(R.string.welcome\_messages, escapedUsername, mailCount);
Spanned styledText = Html.fromHtml(text);
```

Styling with spannables
-----------------------

A `Spannable` is a text object that you can style with typeface properties such as color and font weight. You use `SpannableStringBuilder` to build your text and then apply styles defined in the `android.text.style` package to the text.

You can use the following helper methods to set up much of the work of creating spannable text:

**Kotlin**

```kotlin
/\*\*
\* Returns a CharSequence that concatenates the specified array of CharSequence
\* objects and then applies a list of zero or more tags to the entire range.
\*
\* @param content an array of character sequences to apply a style to
\* @param tags the styled span objects to apply to the content
\*    such as android.text.style.StyleSpan
\*/
private fun apply(content: Array<out CharSequence>, vararg tags: Any): CharSequence {
  return SpannableStringBuilder().apply {
    openTags(tags)
    content.forEach { charSequence ->
      append(charSequence)
    }
    closeTags(tags)
  }
}

/\*\*
\* Iterates over an array of tags and applies them to the beginning of the specified
\* Spannable object so that future text appended to the text will have the styling
\* applied to it. Do not call this method directly.
\*/
private fun Spannable.openTags(tags: Array<out Any>) {
  tags.forEach { tag ->
    setSpan(tag, 0, 0, Spannable.SPAN\_MARK\_MARK)
  }
}

/\*\*
\* "Closes" the specified tags on a Spannable by updating the spans to be
\* endpoint-exclusive so that future text appended to the end will not take
\* on the same styling. Do not call this method directly.
\*/
private fun Spannable.closeTags(tags: Array<out Any>) {
  tags.forEach { tag ->
  if (length > 0) {
      setSpan(tag, 0, length, Spanned.SPAN\_EXCLUSIVE\_EXCLUSIVE)
    } else {
      removeSpan(tag)
    }
  }
}
```

**Java**

```java
/\*\*
\* Returns a CharSequence that concatenates the specified array of CharSequence
\* objects and then applies a list of zero or more tags to the entire range.
\*
\* @param content an array of character sequences to apply a style to
\* @param tags the styled span objects to apply to the content
\*    such as android.text.style.StyleSpan
\*
\*/
private static CharSequence applyStyles(CharSequence\[\] content, Object\[\] tags) {
  SpannableStringBuilder text = new SpannableStringBuilder();
  openTags(text, tags);
  for (CharSequence item : content) {
    text.append(item);
  }
  closeTags(text, tags);
  return text;
}

/\*\*
\* Iterates over an array of tags and applies them to the beginning of the specified
\* Spannable object so that future text appended to the text will have the styling
\* applied to it. Do not call this method directly.
\*/
private static void openTags(Spannable text, Object\[\] tags) {
  for (Object tag : tags) {
    text.setSpan(tag, 0, 0, Spannable.SPAN\_MARK\_MARK);
  }
}

/\*\*
\* "Closes" the specified tags on a Spannable by updating the spans to be
\* endpoint-exclusive so that future text appended to the end will not take
\* on the same styling. Do not call this method directly.
\*/
private static void closeTags(Spannable text, Object\[\] tags) {
  int len = text.length();
  for (Object tag : tags) {
    if (len > 0) {
      text.setSpan(tag, 0, len, Spanned.SPAN\_EXCLUSIVE\_EXCLUSIVE);
    } else {
      text.removeSpan(tag);
    }
  }
}
```

The following `bold`, `italic`, and `color` methods wrap the helper methods above and demonstrate specific examples of applying styles defined in the `android.text.style` package. You can create similar methods to do other types of text styling.


**Kotlin**

```kotlin
/\*\*
\* Returns a CharSequence that applies boldface to the concatenation
\* of the specified CharSequence objects.
\*/
fun bold(vararg content: CharSequence): CharSequence = apply(content, StyleSpan(Typeface.BOLD))

/\*\*
\* Returns a CharSequence that applies italics to the concatenation
\* of the specified CharSequence objects.
\*/
fun italic(vararg content: CharSequence): CharSequence = apply(content, StyleSpan(Typeface.ITALIC))

/\*\*
\* Returns a CharSequence that applies a foreground color to the
\* concatenation of the specified CharSequence objects.
\*/
fun color(color: Int, vararg content: CharSequence): CharSequence =
    apply(content, ForegroundColorSpan(color))
```

**Java**

```java
/\*\*
\* Returns a CharSequence that applies boldface to the concatenation
\* of the specified CharSequence objects.
\*/
public static CharSequence bold(CharSequence... content) {
  return apply(content, new StyleSpan(Typeface.BOLD));
}

/\*\*
\* Returns a CharSequence that applies italics to the concatenation
\* of the specified CharSequence objects.
\*/
public static CharSequence italic(CharSequence... content) {
  return apply(content, new StyleSpan(Typeface.ITALIC));
}

/\*\*
\* Returns a CharSequence that applies a foreground color to the
\* concatenation of the specified CharSequence objects.
\*/
public static CharSequence color(int color, CharSequence... content) {
  return apply(content, new ForegroundColorSpan(color));
}
```

Here's an example of how to chain these methods together to apply various styles to individual words within a phrase:


**Kotlin**

```kotlin
// Create an italic "hello, " a red "world",
// and bold the entire sequence.
val text: CharSequence = bold(italic(getString(R.string.hello)),
    color(Color.RED, getString(R.string.world)))

// Create an italic "hello, " a red "world",
// and bold the entire sequence.
var text = bold(italic(getString(R.string.hello)),
 color(Color.RED, getString(R.string.world)))
```

**Java**

```java
// Create an italic "hello, " a red "world",
// and bold the entire sequence.
CharSequence text = bold(italic(getString(R.string.hello)),
  color(Color.RED, getString(R.string.world)));
```

The core-ktx Kotlin module also contains extension functions that make working with spans even easier. You can check out the android.text package documentation on GitHub to learn more.


Styling with annotations
------------------------

You can apply complex or custom styling by using the `Annotation` class along with the `<annotation>` tag in your strings.xml resource files. The annotation tag allows you to mark parts of the string for custom styling by defining custom key-value pairs in the XML that the framework then converts into `Annotation` spans. You can then retrieve these annotations and use the key and value to apply the styling.

When creating annotations, make sure you add the `<annotation>` tag to all translations of the string in every strings.xml file.


_Applying a custom typeface to the word “text” in all languages_

### Example - adding a custom typeface

1.  Add the `<annotation>` tag, and define the key-value pair. In this case, the key is _font_, and the value is the type of font we want to use: _title\_emphasis_

```xml
    // values/strings.xml
    <string name="title">Best practices for <annotation font="title\_emphasis">text</annotation> on Android</string>

    // values-es/strings.xml
    <string name="title"><annotation font="title\_emphasis">Texto</annotation> en Android: mejores prácticas</string>
```

2.  Load the string resource and find the annotations with the _font_ key. Then create a custom span and replace the existing span.

**Kotlin**

```kotlin

    // get the text as SpannedString so we can get the spans attached to the text
    val titleText = getText(R.string.title) as SpannedString

    // get all the annotation spans from the text
    val annotations = titleText.getSpans(0, titleText.length, Annotation::class.java)

    // create a copy of the title text as a SpannableString.
    // the constructor copies both the text and the spans. so we can add and remove spans
    val spannableString = SpannableString(titleText)

    // iterate through all the annotation spans
    for (annotation in annotations) {
     // look for the span with the key font
     if (annotation.key == "font") {
       val fontName = annotation.value
       // check the value associated to the annotation key
       if (fontName == "title\_emphasis") {
        // create the typeface
        val typeface = getFontCompat(R.font.permanent\_marker)
        // set the span at the same indices as the annotation
        spannableString.setSpan(CustomTypefaceSpan(typeface),
          titleText.getSpanStart(annotation),
          titleText.getSpanEnd(annotation),
          Spannable.SPAN\_EXCLUSIVE\_EXCLUSIVE)
       }
     }
    }
 ```

**Java**

 ```java
    // now, the spannableString contains both the annotation spans and the CustomTypefaceSpan
    styledText.text = spannableString

    // get the text as SpannedString so we can get the spans attached to the text
    SpannedString titleText = (SpannedString) getText(R.string.title);

    // get all the annotation spans from the text
    Annotation\[\] annotations = titleText.getSpans(0, titleText.length(), Annotation.class);

    // create a copy of the title text as a SpannableString.
    // the constructor copies both the text and the spans. so we can add and remove spans
    SpannableString spannableString = new SpannableString(titleText);

    // iterate through all the annotation spans
    for (Annotation annotation: annotations) {
     // look for the span with the key font
     if (annotation.getKey().equals("font")) {
      String fontName = annotation.getValue();
      // check the value associated to the annotation key
      if (fontName.equals("title\_emphasis")) {
      // create the typeface
      Typeface typeface = ResourcesCompat.getFont(this, R.font.roboto\_mono);
      // set the span at the same indices as the annotation
      spannableString.setSpan(new CustomTypefaceSpan(typeface),
       titleText.getSpanStart(annotation),
       titleText.getSpanEnd(annotation),
       Spannable.SPAN\_EXCLUSIVE\_EXCLUSIVE);
      }
     }
    }

    // now, the spannableString contains both the annotation spans and the CustomTypefaceSpan
    styledText.text = spannableString;
```

If you’re using the same text multiple times, you should construct the SpannableString object once and reuse it as needed to avoid potential performance and memory issues.


### Annotation spans and text parceling

Because `Annotation` spans are also `ParcelableSpans`, the key-value pairs are parceled and unparceled. As long as the receiver of the parcel knows how to interpret the annotations, you can use `Annotation` spans to apply custom styling to the parceled text.

To keep your custom styling when you pass the text to an Intent Bundle, you first need to add `Annotation` spans to your text. You can do this in the XML resources via the <annotation> tag, as shown in the example above, or in code by creating a new `Annotation` and setting it as a span, as shown below:

**Kotlin**

```kotlin
val spannableString = SpannableString("My spantastic text")
val annotation = Annotation("font", "title\_emphasis")
spannableString.setSpan(annotation, 3, 7, Spannable.SPAN\_EXCLUSIVE\_EXCLUSIVE)

// start Activity with text with spans
val intent = Intent(this, MainActivity::class.java)
intent.putExtra(TEXT\_EXTRA, spannableString)
startActivity(intent)
```

**Java**

```java
SpannableString spannableString = new SpannableString("My spantastic text");
Annotation annotation = new Annotation("font", "title\_emphasis");
spannableString.setSpan(annotation, 3, 7, 33);


// start Activity with text with spans
Intent intent = new Intent(this, MainActivity.class);
intent.putExtra(TEXT\_EXTRA, spannableString);
this.startActivity(intent);
```

Retrieve the text from the `Bundle` as a `SpannableString` and then parse the annotations attached, as shown in the example above.


```kotlin
// read text with Spans
val intentCharSequence = intent.getCharSequenceExtra(TEXT\_EXTRA) as SpannableString
```

**Java**

```java
// read text with Spans
SpannableString intentCharSequence = (SpannableString)intent.getCharSequenceExtra(TEXT\_EXTRA);
```
